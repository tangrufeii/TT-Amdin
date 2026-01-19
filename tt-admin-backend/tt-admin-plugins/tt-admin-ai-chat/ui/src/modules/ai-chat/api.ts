import { getPluginBaseURL, request, requestData, resolveToken } from '@tt/plugin-sdk';

export interface ChatSession {
  /** 会话 ID */
  id: number;
  /** 会话标题 */
  title: string;
  /** 会话摘要 */
  summary?: string;
  /** 最后消息时间 */
  lastMessageTime?: string;
  /** 创建时间 */
  createTime?: string;
}

export interface ChatMessage {
  /** 本地消息 ID */
  localId: string;
  /** 角色（user/assistant/system） */
  role: 'user' | 'assistant' | 'system';
  /** 原始内容 */
  content: string;
  /** 展示内容（用于打字机效果） */
  displayContent?: string;
}

export interface ConfigForm {
  /** 模型提供方 */
  provider: string;
  /** Base URL */
  baseUrl: string;
  /** API Key */
  apiKey: string;
  /** 是否已保存 Key */
  hasApiKey: boolean;
  /** 模型名称 */
  model: string;
  /** 温度 */
  temperature: number;
  /** 最大 tokens */
  maxTokens?: number;
  /** 系统提示词 */
  systemPrompt?: string;
  /** Azure 部署名 */
  azureDeployment?: string;
  /** Azure API 版本 */
  azureApiVersion?: string;
}

export interface SendMessageRequest {
  /** 会话 ID */
  sessionId?: number | null;
  /** 用户消息 */
  message: string;
  /** 深度思考模式 */
  deepThink?: boolean;
  /** 联网搜索 */
  webSearch?: boolean;
}

export interface SendMessageResponse {
  /** 会话 ID */
  sessionId?: number;
  /** 回复内容 */
  content?: string;
}

export async function fetchConfig() {
  return await requestData<ConfigForm>({ url: '/plugin/ai-chat/config' });
}

export async function saveConfig(config: ConfigForm) {
  return await request<boolean>({
    url: '/plugin/ai-chat/config',
    method: 'PUT',
    data: {
      baseUrl: config.baseUrl,
      apiKey: config.apiKey,
      model: config.model,
      temperature: config.temperature,
      maxTokens: config.maxTokens,
      systemPrompt: config.systemPrompt,
      provider: config.provider,
      azureDeployment: config.azureDeployment,
      azureApiVersion: config.azureApiVersion
    }
  });
}

export async function fetchSessions() {
  return await requestData<ChatSession[]>({ url: '/plugin/ai-chat/sessions' });
}

export async function fetchMessages(sessionId: number) {
  return await requestData<any[]>({ url: `/plugin/ai-chat/messages/${sessionId}` });
}

export async function createSession() {
  return await requestData<ChatSession>({ url: '/plugin/ai-chat/sessions', method: 'POST' });
}

export async function deleteSession(sessionId: number) {
  return await requestData({ url: `/plugin/ai-chat/sessions/${sessionId}`, method: 'DELETE' });
}

export async function sendMessage(requestPayload: SendMessageRequest) {
  return await requestData<SendMessageResponse>({
    url: '/plugin/ai-chat/message',
    method: 'POST',
    data: requestPayload
  });
}

export function buildStreamUrl(requestPayload: SendMessageRequest) {
  const params = new URLSearchParams();
  if (requestPayload.sessionId) {
    params.set('sessionId', String(requestPayload.sessionId));
  }
  params.set('message', requestPayload.message);
  if (requestPayload.deepThink) {
    params.set('deepThink', 'true');
  }
  if (requestPayload.webSearch) {
    params.set('webSearch', 'true');
  }
  const token = resolveToken();
  if (token) {
    const rawToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    params.set('satoken', rawToken);
  }
  return `${getPluginBaseURL()}/plugin/ai-chat/message/stream?${params.toString()}`;
}
