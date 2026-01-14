<template>
  <div class="ai-chat-app">
    <n-layout class="ai-layout" has-sider>
    <n-layout-sider class="ai-sider" width="280" bordered>
      <div class="ai-sider-header">
        <div class="ai-brand">deepseek</div>
        <n-button class="ai-new-session" tertiary @click="createSession">开启新对话</n-button>
      </div>
      <div class="ai-sider-sub">会话列表</div>
      <n-scrollbar class="ai-sessions">
        <div v-if="sessions.length === 0" class="ai-session-empty">暂无会话</div>
        <div v-for="group in groupedSessions" :key="group.key" class="ai-session-group">
          <div class="ai-session-group-title">{{ group.label }}</div>
          <div
            v-for="item in group.items"
            :key="item.id"
            class="ai-session-item"
            :class="{ active: item.id === activeSessionId }"
            @click="selectSession(item)"
          >
            <div class="ai-session-info">
              <div class="ai-session-title">{{ item.title }}</div>
              <div class="ai-session-meta">{{ formatTime(item.lastMessageTime || item.createTime) }}</div>
              <div v-if="item.summary" class="ai-session-meta">摘要：{{ item.summary }}</div>
            </div>
            <n-button text type="error" size="tiny" @click.stop="removeSession(item)">删除</n-button>
          </div>
        </div>
      </n-scrollbar>
    </n-layout-sider>

    <n-layout-content class="ai-content">
      <div v-if="messages.length > 0" class="ai-content-header">
        <div class="ai-content-title">{{ activeSessionTitle }}</div>
        <div class="ai-content-actions">
          <n-checkbox v-model:checked="streaming">流式输出</n-checkbox>
          <n-button size="small" tertiary @click="openConfig">设置</n-button>
        </div>
      </div>

      <div v-if="messages.length === 0" class="ai-empty">
        <div class="ai-empty-title">
          <span class="ai-empty-logo">✦</span>
          今天有什么可以帮到你？
        </div>
        <div class="ai-input ai-input--center">
          <div class="ai-input-panel">
            <n-input
              v-model:value="inputMessage"
              type="textarea"
              placeholder="给 deepseek 发送消息"
              :autosize="{ minRows: 2, maxRows: 4 }"
              @keydown.enter.exact.prevent="handleEnter"
              @keydown.shift.enter.stop
            />
            <div class="ai-input-actions">
              <div class="ai-input-tools">
                <n-button size="tiny" round secondary>深度思考</n-button>
                <n-button size="tiny" round secondary>联网搜索</n-button>
              </div>
              <n-button
                class="ai-send-btn"
                type="primary"
                circle
                :disabled="sending || !inputMessage.trim()"
                @click="sendMessage"
              >
                ↑
              </n-button>
            </div>
          </div>
        </div>
      </div>

      <n-scrollbar v-else class="ai-messages" ref="messagesRef">
        <div v-if="!configForm.hasApiKey" class="ai-config-tip">
          API Key 未配置，请点击右上角“设置”完成初始化。
          <n-button size="tiny" secondary @click="openConfig">去配置</n-button>
        </div>
        <div
          v-for="msg in messages"
          :key="msg.localId"
          class="ai-message-row"
          :class="`ai-message-row--${msg.role}`"
        >
          <div class="ai-message-avatar">{{ msg.role === 'user' ? '你' : 'AI' }}</div>
          <div class="ai-message-bubble">
            <div class="ai-message-toolbar" v-if="msg.role === 'assistant' && msg.displayContent">
              <n-button text size="tiny" @click="copyMessage(msg)">复制</n-button>
            </div>
            <div class="ai-message-content">
              <MdPreview
                class="ai-message-markdown"
                :editor-id="`ai-${msg.localId}`"
                :model-value="msg.displayContent ?? msg.content"
              />
              <span v-if="shouldShowCursor(msg)" class="ai-typing-cursor"></span>
            </div>
          </div>
        </div>
      </n-scrollbar>

      <div v-if="messages.length > 0" class="ai-input">
        <div class="ai-input-panel">
          <n-input
            v-model:value="inputMessage"
            type="textarea"
            placeholder="给 deepseek 发送消息"
            :autosize="{ minRows: 2, maxRows: 6 }"
            @keydown.enter.exact.prevent="handleEnter"
            @keydown.shift.enter.stop
          />
          <div class="ai-input-actions">
            <div class="ai-input-tools">
              <n-button size="tiny" round secondary>深度思考</n-button>
              <n-button size="tiny" round secondary>联网搜索</n-button>
            </div>
            <n-button
              class="ai-send-btn"
              type="primary"
              circle
              :disabled="sending || !inputMessage.trim()"
              @click="sendMessage"
            >
              ↑
            </n-button>
          </div>
        </div>
      </div>
    </n-layout-content>
    </n-layout>
  </div>

  <n-drawer v-model:show="showConfig" placement="right" :width="420">
    <n-drawer-content title="模型设置" closable>
      <div class="ai-config-tip" v-if="!configForm.hasApiKey">
        API Key 仅本地保存并加密，未配置将无法对话。
      </div>
      <n-form label-placement="top" size="small">
        <n-form-item label="Provider">
          <n-select v-model:value="configForm.provider" :options="providerOptions" @update:value="handleProviderChange" />
        </n-form-item>
        <n-form-item label="Base URL">
          <n-input v-model:value="configForm.baseUrl" placeholder="https://api.openai.com" />
        </n-form-item>
        <n-form-item label="API Key">
          <n-input v-model:value="configForm.apiKey" type="password" placeholder="sk-..." />
          <div v-if="configForm.hasApiKey" class="ai-form-hint">已保存旧 Key，留空则保持</div>
        </n-form-item>
        <n-form-item v-if="configForm.provider === 'azure'" label="Azure Deployment">
          <n-input v-model:value="configForm.azureDeployment" placeholder="gpt-35-turbo" />
        </n-form-item>
        <n-form-item v-if="configForm.provider === 'azure'" label="Azure API Version">
          <n-input v-model:value="configForm.azureApiVersion" placeholder="2024-05-01-preview" />
        </n-form-item>
        <n-form-item label="Model">
          <n-input v-model:value="configForm.model" placeholder="gpt-3.5-turbo" />
        </n-form-item>
        <n-form-item label="Temperature">
          <n-input v-model:value="configForm.temperature" type="number" min="0" max="2" step="0.1" />
        </n-form-item>
        <n-form-item label="Max Tokens">
          <n-input v-model:value="configForm.maxTokens" type="number" min="0" />
        </n-form-item>
        <n-form-item label="System Prompt">
          <n-input v-model:value="configForm.systemPrompt" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button secondary @click="closeConfig">取消</n-button>
          <n-button type="primary" @click="saveConfig">保存</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { computed, nextTick, onDeactivated, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {
  buildStreamUrl,
  createSession as createSessionRequest,
  deleteSession,
  fetchConfig,
  fetchMessages,
  fetchSessions,
  saveConfig as saveConfigRequest,
  sendMessage
} from '../api';
import type { ChatMessage, ChatSession, ConfigForm } from '../api';
import {
  NButton,
  NCheckbox,
  NDrawer,
  NDrawerContent,
  NForm,
  NFormItem,
  NInput,
  NLayout,
  NLayoutContent,
  NLayoutSider,
  NScrollbar,
  NSelect,
  NSpace
} from 'naive-ui';

const sessions = ref<ChatSession[]>([]);
const messages = ref<ChatMessage[]>([]);
const activeSessionId = ref<number | null>(null);
const activeSessionTitle = ref('AI Chat');
const inputMessage = ref('');
const showConfig = ref(false);
const sending = ref(false);
const streaming = ref(true);
const messagesRef = ref<any>(null);
const eventSourceRef = ref<EventSource | null>(null);
let streamTypingTimer: number | null = null;
let streamBuffer = '';
let streamDone = false;
const typingMessageId = ref<string | null>(null);
let typingRafId: number | null = null;
let typingLastTs = 0;
let typingPauseUntil = 0;
const typingSpeed = 70;

const providerOptions = [
  { label: 'OpenAI 兼容', value: 'openai' },
  { label: 'DeepSeek (OpenAI 兼容)', value: 'deepseek' },
  { label: 'Azure OpenAI', value: 'azure' }
];

const providerDefaults: Record<string, { baseUrl: string; model: string }> = {
  openai: { baseUrl: 'https://api.openai.com', model: 'gpt-3.5-turbo' },
  deepseek: { baseUrl: 'https://api.deepseek.com/v1', model: 'deepseek-chat' },
  azure: { baseUrl: '', model: '' }
};

const groupedSessions = computed(() => {
  const groups = [
    { key: 'today', label: '今天', items: [] as ChatSession[] },
    { key: 'week', label: '本周', items: [] as ChatSession[] },
    { key: 'earlier', label: '更早', items: [] as ChatSession[] }
  ];
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const day = (startToday.getDay() + 6) % 7;
  const startWeek = new Date(startToday);
  startWeek.setDate(startToday.getDate() - day);
  sessions.value.forEach(session => {
    const raw = session.lastMessageTime || session.createTime;
    const date = raw ? new Date(raw) : null;
    if (!date || Number.isNaN(date.getTime())) {
      groups[2].items.push(session);
      return;
    }
    if (date >= startToday) {
      groups[0].items.push(session);
    } else if (date >= startWeek) {
      groups[1].items.push(session);
    } else {
      groups[2].items.push(session);
    }
  });
  return groups.filter(group => group.items.length > 0);
});

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

function handleProviderChange(value: string) {
  configForm.provider = value;
  applyProviderDefaults(value, false);
}

function isDefaultValue(value: string, list: string[]) {
  return list.includes(value);
}

function applyProviderDefaults(provider: string, force: boolean) {
  const defaults = providerDefaults[provider];
  if (!defaults) return;
  const baseUrlDefaults = Object.values(providerDefaults)
    .map(item => item.baseUrl)
    .filter(Boolean);
  const modelDefaults = Object.values(providerDefaults)
    .map(item => item.model)
    .filter(Boolean);
  if (force || !configForm.baseUrl || isDefaultValue(configForm.baseUrl, baseUrlDefaults)) {
    configForm.baseUrl = defaults.baseUrl;
  }
  if (force || !configForm.model || isDefaultValue(configForm.model, modelDefaults)) {
    configForm.model = defaults.model;
  }
}

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
  applyProviderDefaults(configForm.provider, false);
}

async function saveConfig() {
  const saveResult = await saveConfigRequest(configForm);
  if (saveResult.error) {
    throw saveResult.error;
  }
  configForm.apiKey = '';
  showConfig.value = false;
  await loadConfig();
}

async function loadSessions() {
  sessions.value = await fetchSessions();
  if (activeSessionId.value) {
    const active = sessions.value.find(item => item.id === activeSessionId.value);
    if (active) {
      activeSessionTitle.value = active.title;
    }
  }
  if (sessions.value.length && !activeSessionId.value) {
    selectSession(sessions.value[0]);
  }
}

async function selectSession(session: ChatSession) {
  activeSessionId.value = session.id;
  activeSessionTitle.value = session.title;
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
  sessions.value = [session, ...sessions.value];
  await selectSession(session);
}

async function removeSession(session: ChatSession) {
  if (!confirm('确认删除该会话吗？')) return;
  await deleteSession(session.id);
  sessions.value = sessions.value.filter(item => item.id !== session.id);
  if (activeSessionId.value === session.id) {
    activeSessionId.value = null;
    activeSessionTitle.value = 'AI Chat';
    messages.value = [];
  }
}

async function sendMessage() {
  const text = inputMessage.value.trim();
  if (!text || sending.value) return;
  inputMessage.value = '';
  sending.value = true;

  const userMessage: ChatMessage = { localId: `u-${Date.now()}`, role: 'user', content: text, displayContent: text };
  const assistantMessage: ChatMessage = { localId: `a-${Date.now()}`, role: 'assistant', content: '', displayContent: '' };
  stopStreamTypewriter(true);
  messages.value.push(userMessage, assistantMessage);
  scrollToBottom();

  try {
    if (streaming.value) {
      await streamSend(text, assistantMessage);
    } else {
      const data = await sendMessage({ sessionId: activeSessionId.value, message: text });
      startTypewriter(assistantMessage, data.content || '');
      if (data.sessionId && !activeSessionId.value) {
        activeSessionId.value = data.sessionId;
      }
    }
    await loadSessions();
  } catch (error) {
    console.error('eror',error)
    assistantMessage.content = '请求失败，请检查配置或网络。';
    assistantMessage.displayContent = assistantMessage.content;
  } finally {
    sending.value = false;
    scrollToBottom();
  }
}

async function streamSend(message: string, assistantMessage: ChatMessage) {
  const url = buildStreamUrl({ sessionId: activeSessionId.value, message });
  return new Promise<void>((resolve, reject) => {
    if (eventSourceRef.value) {
      eventSourceRef.value.close();
    }
    const eventSource = new EventSource(url, { withCredentials: true });
    eventSourceRef.value = eventSource;
    let settled = false;
    let hasChunk = false;
    eventSource.onmessage = event => {
      console.error("event",event)
      hasChunk = true;
      assistantMessage.content += event.data;
      enqueueStreamText(assistantMessage, event.data);
    };
    eventSource.onerror = () => {
      if (eventSource.readyState === EventSource.CLOSED || hasChunk) {
        streamDone = true;
        finalizeStreamTyping(assistantMessage);
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

function openConfig() {
  showConfig.value = true;
  loadConfig();
}

function closeConfig() {
  showConfig.value = false;
}

function handleEnter() {
  if (sending.value) return;
  sendMessage();
}

function formatTime(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function scrollToBottom() {
  nextTick(() => {
    if (!messagesRef.value) return;
    messagesRef.value.scrollTo({ top: 999999 });
  });
}

function startTypewriter(message: ChatMessage, fullText: string) {
  stopStreamTypewriter(true);
  message.content = fullText || '';
  message.displayContent = '';
  streamBuffer = message.content;
  streamDone = true;
  startStreamTypewriter(message);
}

function enqueueStreamText(message: ChatMessage, text: string) {
  if (!text) return;
  streamBuffer += text;
  if (!streamTypingTimer) {
    startStreamTypewriter(message);
  }
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

function copyMessage(message: ChatMessage) {
  const text = message.content || message.displayContent || '';
  copyToClipboard(text);
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

function shouldShowCursor(message: ChatMessage) {
  if (message.role !== 'assistant') return false;
  return typingMessageId.value === message.localId;
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

watch(
  () => configForm.provider,
  value => {
    applyProviderDefaults(value, false);
  }
);

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

<style scoped>
.ai-chat-app {
  height: 100%;
  min-height: 100%;
  background:
    radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.08), transparent 45%),
    radial-gradient(circle at 85% 20%, rgba(14, 165, 233, 0.08), transparent 45%),
    #121212;
  color: #e5e7eb;
  padding: 16px;
  display: flex;
  flex-direction: column;
  font-family: 'HarmonyOS Sans', 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.ai-layout {
  height: 100%;
  background: #121212;
  color: #e5e7eb;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.ai-sider {
  background: #161616;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

.ai-sider-header {
  padding: 20px 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ai-brand {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #4c86ff;
}

.ai-new-session {
  width: 100%;
  border-radius: 999px;
  background: #2b2b2b;
  color: #e5e7eb;
}

.ai-sider-sub {
  padding: 0 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.ai-sessions {
  height: calc(100% - 92px);
  padding: 8px 8px 16px;
}

.ai-session-empty {
  padding: 12px 8px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
}

.ai-session-group {
  margin-top: 12px;
}

.ai-session-group-title {
  padding: 0 8px 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
}

.ai-session-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.ai-session-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.ai-session-item.active {
  background: rgba(76, 134, 255, 0.18);
}

.ai-session-title {
  font-size: 13px;
  color: #f3f4f6;
}

.ai-session-meta {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 4px;
}

.ai-content {
  background: radial-gradient(circle at top, #1b1b1b 0%, #121212 50%, #0f0f0f 100%);
  padding: 20px 28px 28px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ai-content-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 0 16px;
  color: rgba(255, 255, 255, 0.7);
}

.ai-content-title {
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}

.ai-content-actions {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ai-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.ai-empty-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 600;
  color: #e5e7eb;
}

.ai-empty-logo {
  color: #4c86ff;
  font-size: 22px;
}

.ai-messages {
  flex: 1;
  padding: 12px 8px 16px;
}

.ai-message-row {
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
}

.ai-message-row--user {
  justify-content: flex-end;
}

.ai-message-row--user .ai-message-avatar {
  background: #2f6bff;
}

.ai-message-row--user .ai-message-bubble {
  background: #1f2937;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.ai-message-row--assistant .ai-message-bubble {
  background: transparent;
  border: none;
  padding: 0;
}

.ai-message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: #2b2b2b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #fff;
  flex-shrink: 0;
}

.ai-message-bubble {
  max-width: 720px;
  border-radius: 16px;
  padding: 12px 14px;
}

.ai-message-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 6px;
}

.ai-message-content {
  display: inline;
}

.ai-message-markdown {
  background: transparent;
  color: #e5e7eb;
}

.ai-message-markdown :deep(.md-editor-preview) {
  background: transparent;
  color: #e5e7eb;
}

.ai-message-markdown :deep(.md-editor-preview-wrapper) {
  padding: 0;
}

.ai-input {
  padding-top: 16px;
  display: flex;
  justify-content: center;
}

.ai-input--center {
  width: min(760px, 90%);
}

.ai-input-panel {
  width: min(760px, 100%);
  background: #1b1b1b;
  border-radius: 18px;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.ai-input-panel :deep(textarea) {
  background: transparent;
  color: #e5e7eb;
}

.ai-input-panel :deep(.n-input__textarea) {
  padding: 0;
}

.ai-input-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
}

.ai-input-tools {
  display: flex;
  gap: 8px;
}

.ai-send-btn {
  background: #3b6cf4;
}

.ai-send-btn:disabled {
  background: #374151;
}

.ai-config-tip {
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
}

.ai-typing-cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  margin-left: 4px;
  background: #1f2937;
  border-radius: 2px;
  animation: ai-cursor-blink 1s steps(2, start) infinite;
  vertical-align: text-bottom;
}

@keyframes ai-cursor-blink {
  to {
    visibility: hidden;
  }
}
</style>
