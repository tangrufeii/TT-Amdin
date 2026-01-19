<template>
  <n-layout class="ai-chat-app" has-sider>
    <!-- 侧边栏 -->
    <n-layout-sider
      class="ai-sider"
      collapse-mode="width"
      :collapsed="siderCollapsed"
      :collapsed-width="64"
      :width="280"
      :show-trigger="isDesktop ? 'arrow-circle' : false"
      bordered
      @update:collapsed="handleSiderCollapse"
    >
      <AiSider
        :grouped-sessions="groupedSessions"
        :active-session-id="activeSessionId"
        :collapsed="siderCollapsed"
        @create="createSession"
        @select="selectSession"
        @delete="removeSession"
        @search="handleSessionSearch"
      />
    </n-layout-sider>

    <!-- 主内容区 -->
    <n-layout content-style="display: flex; flex-direction: column;">
      <!-- 欢迎页模式 -->
      <template v-if="messages.length === 0">
        <n-layout-content content-style="display: flex; flex-direction: column; flex: 1;">
          <div class="ai-welcome-content">
            <AiWelcome @select="handleSuggestionSelect" />
          </div>
          <div class="ai-welcome-input">
            <AiInputArea
              v-model="inputMessage"
              :sending="sending"
              show-hint
              :min-rows="2"
              :max-rows="4"
              placeholder="给 AI 发送消息"
              @send="handleSend"
              @stop="handleStop"
            />
          </div>
        </n-layout-content>
      </template>

      <!-- 对话模式 -->
      <template v-else>
        <n-layout-header class="ai-content-header" bordered>
          <div class="ai-content-left">
            <button v-if="!isDesktop" class="ai-menu-btn" @click="openSider">☰</button>
            <div class="ai-content-title">{{ activeSessionTitle }}</div>
          </div>
          <div class="ai-content-actions">
            <n-checkbox v-model:checked="streaming">流式输出</n-checkbox>
            <n-button size="small" tertiary @click="openConfig">设置</n-button>
          </div>
        </n-layout-header>

        <n-layout-content class="ai-messages-wrapper">
          <n-scrollbar ref="messagesRef" class="ai-messages-scroll">
            <div class="ai-messages">
              <div v-if="!configForm.hasApiKey" class="ai-config-tip">
                API Key 未配置，请点击右上角"设置"完成初始化。
                <n-button size="tiny" secondary @click="openConfig">去配置</n-button>
              </div>

              <AiMessageBubble
                v-for="msg in messages"
                :key="msg.localId"
                :message="msg"
                :is-typing="isTypingMessage(msg)"
                :is-plain-text="shouldRenderPlain(msg)"
                @copy="handleCopyMessage"
                @regenerate="handleRegenerateMessage"
              />
            </div>
          </n-scrollbar>
        </n-layout-content>

        <n-layout-footer class="ai-input-footer" bordered>
          <AiInputArea
            v-model="inputMessage"
            :sending="sending"
            :min-rows="2"
            :max-rows="6"
            placeholder="给 AI 发送消息"
            @send="handleSend"
            @stop="handleStop"
          />
        </n-layout-footer>
      </template>
    </n-layout>
  </n-layout>

  <!-- 设置抽屉 -->
  <AiConfigDrawer
    v-model:show="showConfig"
    :config="configForm"
    @save="handleSaveConfig"
  />
</template>

<script setup lang="ts">
import { nextTick, onDeactivated, onMounted, onUnmounted, reactive, ref } from 'vue';
import {
  NButton,
  NCheckbox,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NLayoutSider,
  NScrollbar
} from 'naive-ui';
import '../styles/index.scss';
import { AiSider, AiWelcome, AiMessageBubble, AiInputArea, AiConfigDrawer } from '../components';
import { useSessions, useResponsive } from '../composables';
import {
  buildStreamUrl,
  createSession as createSessionRequest,
  deleteSession,
  fetchConfig,
  fetchMessages,
  fetchSessions,
  saveConfig as saveConfigRequest,
  sendMessage as sendMessageRequest
} from '../api';
import type { ChatMessage, ChatSession, ConfigForm } from '../api';

// ========== Composables ==========
const {
  sessions,
  activeSessionId,
  groupedSessions,
  activeSessionTitle,
  setSessions,
  addSession,
  removeSession: removeSessionFromList,
  setActiveSession,
  setSearchKeyword
} = useSessions();

const { siderCollapsed, isDesktop } = useResponsive();

function handleSiderCollapse(collapsed: boolean) {
  siderCollapsed.value = collapsed;
}

function openSider() {
  siderCollapsed.value = false;
}

// ========== State ==========
const messages = ref<ChatMessage[]>([]);
const inputMessage = ref('');
const showConfig = ref(false);
const sending = ref(false);
const streaming = ref(true);
const messagesRef = ref<any>(null);
const eventSourceRef = ref<EventSource | null>(null);
const typingMessageId = ref<string | null>(null);

// 打字机相关
let streamTypingTimer: number | null = null;
let streamBuffer = '';
let streamDone = false;
let typingRafId: number | null = null;
let typingLastTs = 0;
let typingPauseUntil = 0;
const typingSpeed = 70;

// 配置表单
const configForm = reactive<ConfigForm>({
  provider: 'openai',
  baseUrl: 'https://api.openai.com',
  apiKey: '',
  hasApiKey: false,
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  maxTokens: undefined,
  systemPrompt: '',
  azureDeployment: '',
  azureApiVersion: ''
});

// ========== 会话管理 ==========
async function loadSessions() {
  const list = await fetchSessions();
  setSessions(list);

  if (activeSessionId.value) {
    const active = list.find(item => item.id === activeSessionId.value);
    if (!active) {
      setActiveSession(null);
      messages.value = [];
    }
  }

  if (list.length && !activeSessionId.value) {
    selectSession(list[0]);
  }
}

async function selectSession(session: ChatSession) {
  setActiveSession(session.id);
  const data = await fetchMessages(session.id);
  messages.value = data.map((item, index) => ({
    localId: `${item.id || index}`,
    role: item.role,
    content: item.content,
    displayContent: item.content
  }));
  scrollToBottom();
}

async function createSession() {
  const session = await createSessionRequest();
  addSession(session);
  await selectSession(session);
}

async function removeSession(session: ChatSession) {
  if (!confirm('确认删除该会话吗？')) return;
  await deleteSession(session.id);
  removeSessionFromList(session.id);
  if (activeSessionId.value === session.id) {
    setActiveSession(null);
    messages.value = [];
  }
}

function handleSessionSearch(keyword: string) {
  setSearchKeyword(keyword);
}

// ========== 配置管理 ==========
async function loadConfig() {
  const data = await fetchConfig();
  configForm.provider = data.provider || 'openai';
  configForm.baseUrl = data.baseUrl || 'https://api.openai.com';
  configForm.apiKey = '';
  configForm.hasApiKey = data.hasApiKey;
  configForm.model = data.model || 'gpt-3.5-turbo';
  configForm.temperature = data.temperature ?? 0.7;
  configForm.maxTokens = data.maxTokens;
  configForm.systemPrompt = data.systemPrompt || '';
  configForm.azureDeployment = data.azureDeployment || '';
  configForm.azureApiVersion = data.azureApiVersion || '';
}

async function handleSaveConfig(config: ConfigForm) {
  const result = await saveConfigRequest(config);
  if (result.error) {
    throw result.error;
  }
  showConfig.value = false;
  await loadConfig();
}

function openConfig() {
  showConfig.value = true;
  loadConfig();
}

// ========== 消息发送 ==========
interface SendPayload {
  message: string;
  deepThink: boolean;
  webSearch: boolean;
}

async function handleSend(payload: SendPayload) {
  const { message, deepThink, webSearch } = payload;
  if (!message || sending.value) return;

  inputMessage.value = '';
  sending.value = true;

  const userMessage: ChatMessage = {
    localId: `u-${Date.now()}`,
    role: 'user',
    content: message,
    displayContent: message
  };

  const assistantMessage: ChatMessage = {
    localId: `a-${Date.now()}`,
    role: 'assistant',
    content: '',
    displayContent: ''
  };

  stopStreamTypewriter(true);
  messages.value.push(userMessage, assistantMessage);
  const assistantProxy = messages.value[messages.value.length - 1] as ChatMessage;
  scrollToBottom();

  try {
    if (streaming.value) {
      await streamSend(message, assistantProxy, deepThink, webSearch);
    } else {
      const data = await sendMessageRequest({
        sessionId: activeSessionId.value,
        message,
        deepThink,
        webSearch
      });
      startTypewriter(assistantProxy, data.content || '');
      if (data.sessionId && !activeSessionId.value) {
        setActiveSession(data.sessionId);
      }
    }
    await loadSessions();
  } catch (error) {
    console.error('send error', error);
    assistantMessage.content = '请求失败，请检查配置或网络。';
    assistantMessage.displayContent = assistantMessage.content;
  } finally {
    sending.value = false;
    scrollToBottom();
  }
}

async function streamSend(
  message: string,
  assistantMessage: ChatMessage,
  deepThink: boolean,
  webSearch: boolean
) {
  const url = buildStreamUrl({
    sessionId: activeSessionId.value,
    message,
    deepThink,
    webSearch
  });

  return new Promise<void>((resolve, reject) => {
    if (eventSourceRef.value) {
      eventSourceRef.value.close();
    }

    stopStreamTypewriter(true);
    typingMessageId.value = assistantMessage.localId;

    const eventSource = new EventSource(url, { withCredentials: true });
    eventSourceRef.value = eventSource;

    let settled = false;
    let hasChunk = false;

    eventSource.onmessage = event => {
      hasChunk = true;
      assistantMessage.content += event.data;
      assistantMessage.displayContent = assistantMessage.content;
      scrollToBottom();
    };

    eventSource.onerror = () => {
      if (eventSource.readyState === EventSource.CLOSED || hasChunk) {
        streamDone = true;
        typingMessageId.value = null;
        eventSource.close();
        if (!settled) {
          settled = true;
          resolve();
        }
        return;
      }
      eventSource.close();
      if (!settled) {
        settled = true;
        reject(new Error('stream failed'));
      }
    };
  });
}

function handleStop() {
  if (eventSourceRef.value) {
    eventSourceRef.value.close();
    eventSourceRef.value = null;
  }
  stopStreamTypewriter(true);
  sending.value = false;
}

function handleSuggestionSelect(prompt: string) {
  inputMessage.value = prompt;
}

function handleCopyMessage(message: ChatMessage) {
  const text = message.content || message.displayContent || '';
  copyToClipboard(text);
}

function handleRegenerateMessage(_message: ChatMessage) {
  // TODO: 实现重新生成功能
}

// ========== 打字机效果 ==========
function startTypewriter(message: ChatMessage, fullText: string) {
  stopStreamTypewriter(true);
  message.content = fullText || '';
  message.displayContent = '';
  streamBuffer = message.content;
  streamDone = true;
  startStreamTypewriter(message);
}

function startStreamTypewriter(message: ChatMessage) {
  if (streamTypingTimer) return;
  typingMessageId.value = message.localId;
  typingLastTs = 0;
  typingPauseUntil = 0;
  streamTypingTimer = window.setInterval(() => {
    if (!typingRafId) {
      typingRafId = window.requestAnimationFrame(ts => stepTyping(ts, message));
    }
  }, 16);
}

function stepTyping(timestamp: number, message: ChatMessage) {
  if (!typingLastTs) {
    typingLastTs = timestamp;
  }
  if (typingPauseUntil && timestamp < typingPauseUntil) {
    typingRafId = window.requestAnimationFrame(ts => stepTyping(ts, message));
    return;
  }
  const delta = timestamp - typingLastTs;
  typingLastTs = timestamp;
  let charsToFlush = Math.floor((delta / 1000) * typingSpeed);
  if (charsToFlush < 1) {
    typingRafId = window.requestAnimationFrame(ts => stepTyping(ts, message));
    return;
  }
  while (charsToFlush > 0 && streamBuffer.length) {
    const nextChar = streamBuffer[0];
    streamBuffer = streamBuffer.slice(1);
    message.displayContent += nextChar;
    charsToFlush -= 1;
    if (/[，。！？]/.test(nextChar)) {
      typingPauseUntil = timestamp + 160;
      break;
    }
    if (/[,.!?]/.test(nextChar)) {
      typingPauseUntil = timestamp + 90;
      break;
    }
  }
  scrollToBottom();
  if (streamBuffer.length || !streamDone) {
    typingRafId = window.requestAnimationFrame(ts => stepTyping(ts, message));
    return;
  }
  finalizeStreamTyping(message);
}

function finalizeStreamTyping(message: ChatMessage) {
  if (streamBuffer.length) return;
  message.displayContent = message.content;
  stopStreamTypewriter(false);
  scrollToBottom();
}

function stopStreamTypewriter(reset: boolean) {
  if (streamTypingTimer) {
    window.clearInterval(streamTypingTimer);
    streamTypingTimer = null;
  }
  if (typingRafId) {
    window.cancelAnimationFrame(typingRafId);
    typingRafId = null;
  }
  typingMessageId.value = null;
  if (reset) {
    streamBuffer = '';
    streamDone = false;
  }
}

// ========== 辅助函数 ==========
function isTypingMessage(message: ChatMessage) {
  return message.role === 'assistant' && typingMessageId.value === message.localId;
}

function shouldRenderPlain(message: ChatMessage) {
  if (!streaming.value) return false;
  if (message.role !== 'assistant') return false;
  return typingMessageId.value === message.localId;
}

function scrollToBottom() {
  nextTick(() => {
    if (!messagesRef.value) return;
    messagesRef.value.scrollTo({ top: 999999 });
  });
}

function copyToClipboard(text: string) {
  if (!text) return;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function cleanupGlobalOverlays() {
  const selectors = [
    '.medium-zoom-overlay',
    '.medium-zoom-image',
    '.medium-zoom-image--opened',
    '.md-editor-modal-mask',
    '.md-editor-modal',
    '.md-editor-modal-container'
  ];
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(node => node.parentElement?.removeChild(node));
  });
  document.body.classList.remove('medium-zoom--opened');
}

// ========== 生命周期 ==========
onMounted(() => {
  loadConfig();
  loadSessions();
});

onUnmounted(() => {
  if (eventSourceRef.value) {
    eventSourceRef.value.close();
    eventSourceRef.value = null;
  }
  showConfig.value = false;
  stopStreamTypewriter(true);
  cleanupGlobalOverlays();
});

onDeactivated(() => {
  showConfig.value = false;
  stopStreamTypewriter(true);
  cleanupGlobalOverlays();
});
</script>
