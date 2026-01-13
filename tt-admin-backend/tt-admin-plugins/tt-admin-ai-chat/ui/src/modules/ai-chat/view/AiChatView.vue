<template>
  <n-layout class="ai-layout" has-sider>
    <n-layout-sider class="ai-sider" width="280" bordered>
      <div class="ai-sider-header">
        <div class="ai-brand">AI 助手</div>
        <n-space size="small">
          <n-button size="small" secondary @click="openConfig">设置</n-button>
          <n-button size="small" type="primary" @click="createSession">新建</n-button>
        </n-space>
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
      <div class="ai-content-header">
        <div>
          <div class="ai-title">{{ activeSessionTitle }}</div>
          <div class="ai-subtitle">{{ activeSessionId ? '会话持续中' : '请先创建会话' }}</div>
        </div>
        <n-space size="small" align="center">
          <n-checkbox v-model:checked="streaming">流式输出</n-checkbox>
          <n-button size="small" secondary @click="openConfig">设置</n-button>
          <n-button size="small" type="primary" @click="createSession">新建</n-button>
        </n-space>
      </div>

      <n-scrollbar class="ai-messages" ref="messagesRef" @click="handleCodeCopy">
        <div v-if="!configForm.hasApiKey" class="ai-config-tip">
          API Key 未配置，请点击右上角“设置”完成初始化。
          <n-button size="tiny" secondary @click="openConfig">去配置</n-button>
        </div>
        <div v-if="messages.length === 0" class="ai-message-empty">暂无消息，输入内容开始对话。</div>
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
            <div v-html="renderMarkdown(msg.displayContent ?? msg.content)"></div>
          </div>
        </div>
      </n-scrollbar>

      <div class="ai-input">
        <n-input
          v-model:value="inputMessage"
          type="textarea"
          placeholder="输入你的问题..."
          :autosize="{ minRows: 2, maxRows: 6 }"
          @keydown.enter.exact.prevent="handleEnter"
          @keydown.shift.enter.stop
        />
        <div class="ai-input-actions">
          <div class="ai-hint">{{ sending ? '生成中...' : 'Shift + Enter 换行' }}</div>
          <n-button type="primary" :disabled="sending || !inputMessage.trim()" @click="sendMessage">发送</n-button>
        </div>
      </div>
    </n-layout-content>
  </n-layout>

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
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
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

interface ChatSession {
  id: number;
  title: string;
  summary?: string;
  lastMessageTime?: string;
  createTime?: string;
}

interface ChatMessage {
  localId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  displayContent?: string;
}

interface ConfigForm {
  provider: string;
  baseUrl: string;
  apiKey: string;
  hasApiKey: boolean;
  model: string;
  temperature: number;
  maxTokens?: number;
  systemPrompt?: string;
  azureDeployment?: string;
  azureApiVersion?: string;
}

type PluginRequestConfig = {
  url: string;
  method?: string;
  params?: Record<string, any>;
  data?: any;
};

type PluginApi = {
  request?: <T>(config: PluginRequestConfig) => Promise<{ data: T; error: any; response?: any }>;
};

const pluginApi = (window as any).__TT_PLUGIN_API__ as PluginApi | undefined;

const sessions = ref<ChatSession[]>([]);
const messages = ref<ChatMessage[]>([]);
const activeSessionId = ref<number | null>(null);
const activeSessionTitle = ref('AI Chat');
const inputMessage = ref('');
const showConfig = ref(false);
const sending = ref(false);
const streaming = ref(true);
const messagesRef = ref<any>(null);
let typingTimer: number | null = null;
let streamTypingTimer: number | null = null;
let streamBuffer = '';
let streamDone = false;

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

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
  const safeHref = href || '';
  const safeTitle = title ? ` title="${title}"` : '';
  return `<a href="${safeHref}"${safeTitle} target="_blank" rel="noreferrer">${text}</a>`;
};
renderer.code = (code, lang) => {
  const language = lang && hljs.getLanguage(lang) ? lang : '';
  const highlighted = language ? hljs.highlight(code, { language }).value : hljs.highlightAuto(code).value;
  const safeCode = encodeURIComponent(code);
  return `
    <pre class="ai-code-block">
      <button class="ai-code-copy" data-code="${safeCode}">复制</button>
      <code class="hljs ${language}">${highlighted}</code>
    </pre>
  `;
};

marked.setOptions({
  gfm: true,
  breaks: true,
  renderer,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }
});

function renderMarkdown(text: string) {
  const raw = marked.parse(text || '');
  return DOMPurify.sanitize(raw);
}

function getBaseApi() {
  return (window as any).__TT_PLUGIN_API_BASE__ || import.meta.env.VITE_API_BASE || '/proxy-default';
}

function resolveToken() {
  const keys = Object.keys(localStorage);
  const tokenKey = keys.find(key => /token$/i.test(key) && !/refresh/i.test(key));
  if (!tokenKey) return null;
  const raw = localStorage.getItem(tokenKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

function clearAuthTokens() {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (/token$/i.test(key)) {
      localStorage.removeItem(key);
    }
  });
}

function handleUnauthorized() {
  clearAuthTokens();
  const redirect = encodeURIComponent(location.pathname + location.search);
  window.location.href = `/login?redirect=${redirect}`;
}

function withQuery(url: string, params?: Record<string, any>) {
  if (!params) return url;
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (Array.isArray(value)) {
      value.forEach(item => {
        if (item !== undefined && item !== null && item !== '') {
          search.append(key, String(item));
        }
      });
      return;
    }
    search.append(key, String(value));
  });
  const query = search.toString();
  return query ? `${url}${url.includes('?') ? '&' : '?'}${query}` : url;
}

async function requestFallback<T>(config: PluginRequestConfig): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  const token = resolveToken();
  if (token) {
    headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }
  const url = withQuery(`${getBaseApi()}${config.url}`, config.params);
  const response = await fetch(url, {
    method: config.method || 'GET',
    headers,
    body: config.data ? JSON.stringify(config.data) : undefined
  });
  if (response.status === 401) {
    handleUnauthorized();
    throw new Error('unauthorized');
  }
  const payload = await response.json();
  if (payload?.code === 401 || payload?.code === 40101) {
    handleUnauthorized();
    throw new Error('unauthorized');
  }
  return payload.data ?? payload;
}

async function callApi<T>(config: PluginRequestConfig): Promise<T> {
  if (pluginApi?.request) {
    const result = await pluginApi.request<T>(config);
    if (result?.error) {
      throw result.error;
    }
    return result.data;
  }
  return requestFallback<T>(config);
}

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
  const data = await callApi<ConfigForm>({ url: '/plugin/ai-chat/config' });
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
  await callApi({
    url: '/plugin/ai-chat/config',
    method: 'PUT',
    data: {
      baseUrl: configForm.baseUrl,
      apiKey: configForm.apiKey,
      model: configForm.model,
      temperature: configForm.temperature,
      maxTokens: configForm.maxTokens,
      systemPrompt: configForm.systemPrompt,
      provider: configForm.provider,
      azureDeployment: configForm.azureDeployment,
      azureApiVersion: configForm.azureApiVersion
    }
  });
  configForm.apiKey = '';
  showConfig.value = false;
  await loadConfig();
}

async function loadSessions() {
  sessions.value = await callApi<ChatSession[]>({ url: '/plugin/ai-chat/sessions' });
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
  const data = await callApi<any[]>({ url: `/plugin/ai-chat/messages/${session.id}` });
  messages.value = data.map((item, index) => ({
    localId: `${item.id || index}`,
    role: item.role,
    content: item.content,
    displayContent: item.content
  }));
  scrollToBottom();
}

async function createSession() {
  const session = await callApi<ChatSession>({ url: '/plugin/ai-chat/sessions', method: 'POST' });
  sessions.value = [session, ...sessions.value];
  await selectSession(session);
}

async function removeSession(session: ChatSession) {
  if (!confirm('确认删除该会话吗？')) return;
  await callApi({ url: `/plugin/ai-chat/sessions/${session.id}`, method: 'DELETE' });
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
      const data = await callApi<any>({
        url: '/plugin/ai-chat/message',
        method: 'POST',
        data: { sessionId: activeSessionId.value, message: text }
      });
      startTypewriter(assistantMessage, data.content || '');
      if (data.sessionId && !activeSessionId.value) {
        activeSessionId.value = data.sessionId;
      }
    }
    await loadSessions();
  } catch (error) {
    assistantMessage.content = '请求失败，请检查配置或网络。';
    assistantMessage.displayContent = assistantMessage.content;
  } finally {
    sending.value = false;
    scrollToBottom();
  }
}

async function streamSend(message: string, assistantMessage: ChatMessage) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = resolveToken();
  if (token) {
    headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }
  const response = await fetch(`${getBaseApi()}/plugin/ai-chat/message/stream`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ sessionId: activeSessionId.value, message })
  });

  if (response.status === 401) {
    handleUnauthorized();
    throw new Error('unauthorized');
  }

  if (!response.ok || !response.body) {
    throw new Error('stream failed');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split('\n\n');
    buffer = parts.pop() || '';
    for (const part of parts) {
      handleSseEvent(part, assistantMessage);
    }
  }
  if (buffer) {
    handleSseEvent(buffer, assistantMessage);
  }
}

function handleSseEvent(rawEvent: string, assistantMessage: ChatMessage) {
  const lines = rawEvent.split('\n').filter(Boolean);
  let eventType = 'message';
  let data = '';
  lines.forEach(line => {
    if (line.startsWith('event:')) {
      eventType = line.replace('event:', '').trim();
      return;
    }
    if (line.startsWith('data:')) {
      data += line.replace('data:', '').trim();
    }
  });

  if (!data) return;
  if (eventType === 'meta') {
    try {
      const payload = JSON.parse(data);
      if (payload.sessionId && !activeSessionId.value) {
        activeSessionId.value = payload.sessionId;
      }
    } catch {
      return;
    }
  } else if (eventType === 'message') {
    assistantMessage.content += data;
    enqueueStreamText(assistantMessage, data);
  } else if (eventType === 'done') {
    streamDone = true;
    finalizeStreamTyping(assistantMessage);
  }
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
  stopTypewriter();
  message.content = fullText || '';
  message.displayContent = '';
  const chars = Array.from(message.content);
  let index = 0;
  typingTimer = window.setInterval(() => {
    if (index >= chars.length) {
      stopTypewriter();
      message.displayContent = message.content;
      return;
    }
    message.displayContent += chars[index];
    index += 1;
    scrollToBottom();
  }, 12);
}

function stopTypewriter() {
  if (typingTimer) {
    window.clearInterval(typingTimer);
    typingTimer = null;
  }
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
  streamTypingTimer = window.setInterval(() => {
    if (!streamBuffer.length) {
      if (streamDone) {
        finalizeStreamTyping(message);
      }
      return;
    }
    const nextChar = streamBuffer[0];
    streamBuffer = streamBuffer.slice(1);
    message.displayContent += nextChar;
    scrollToBottom();
  }, 12);
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
  if (reset) {
    streamBuffer = '';
    streamDone = false;
  }
}

function copyMessage(message: ChatMessage) {
  const text = message.content || message.displayContent || '';
  copyToClipboard(text);
}

function handleCodeCopy(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  if (!target || !target.classList.contains('ai-code-copy')) return;
  const code = target.getAttribute('data-code') || '';
  copyToClipboard(decodeURIComponent(code));
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
</script>

<style scoped>
.ai-message-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 6px;
}

.ai-code-block {
  position: relative;
  margin: 10px 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: #0b1224;
  color: #e2e8f0;
  overflow: auto;
  font-size: 13px;
  line-height: 1.6;
}

.ai-code-copy {
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: #e2e8f0;
  border-radius: 6px;
  padding: 2px 6px;
  font-size: 12px;
  cursor: pointer;
}

.ai-code-copy:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
