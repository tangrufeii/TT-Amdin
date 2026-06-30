import type { Component } from 'vue';

export interface PluginModuleHooks {
  onLoad?: () => void | Promise<void>;
  onUnload?: () => void | Promise<void>;
}

export interface DefinePluginModuleOptions {
  component: Component;
  hooks?: PluginModuleHooks;
}

export interface PluginModule {
  component: Component;
  hooks?: PluginModuleHooks;
  createComponent: () => Component;
}

export function definePluginModule(options: DefinePluginModuleOptions): PluginModule {
  return {
    component: options.component,
    hooks: options.hooks,
    createComponent: () => options.component
  };
}

export interface HostMessage<T = unknown> {
  pluginId: string;
  type: string;
  data?: T;
}

export function postHostMessage<T = unknown>(message: HostMessage<T>) {
  if (typeof window === 'undefined') return;
  const parentWindow = window.parent && window.parent !== window ? window.parent : window;
  parentWindow.postMessage(message, '*');
  if (window.top && window.top !== parentWindow) {
    window.top.postMessage(message, '*');
  }
}

export type PluginRequestConfig = {
  url: string;
  method?: string;
  params?: Record<string, any>;
  data?: any;
  headers?: Record<string, any>;
  credentials?: RequestCredentials;
};

export type PluginRequestResult<T> = { data: T; error: any; response?: Response | null };

export type PluginApi = {
  request?: <T>(config: PluginRequestConfig) => Promise<PluginRequestResult<T>>;
};

export interface SystemDictItem {
  /** 字典值 */
  value: string;
  /** 中文名称 */
  zhCn?: string;
  /** 英文名称 */
  enUs?: string;
  /** 排序值 */
  sort?: number;
}

export interface SystemDict {
  /** 字典编码 */
  code: string;
  /** 字典名称 */
  name: string;
  /** 字典类型 */
  type?: string;
  /** 字典项列表 */
  items?: SystemDictItem[];
}

export interface DictOption {
  /** 显示名称 */
  label: string;
  /** 实际值 */
  value: string;
}

type PluginWindow = typeof window & {
  __TT_PLUGIN_API__?: PluginApi;
  __TT_PLUGIN_API_BASE__?: string;
};

export function getPluginApi() {
  if (typeof window === 'undefined') return undefined;
  // eslint-disable-next-line no-underscore-dangle
  return (window as PluginWindow).__TT_PLUGIN_API__;
}

export function getPluginBaseURL() {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-underscore-dangle
    const globalBase = (window as PluginWindow).__TT_PLUGIN_API_BASE__;
    if (globalBase !== undefined && globalBase !== null) {
      return globalBase;
    }
  }
  const env = import.meta?.env as unknown as {
    DEV?: boolean;
    VITE_HTTP_PROXY?: string;
    VITE_SERVICE_BASE_URL?: string;
    VITE_API_BASE?: string;
  };
  if (env.VITE_SERVICE_BASE_URL) {
    return env.VITE_SERVICE_BASE_URL;
  }
  if (env.VITE_API_BASE) {
    return env.VITE_API_BASE;
  }
  const useProxy = Boolean(env.DEV) && env.VITE_HTTP_PROXY === 'Y';
  return useProxy ? '/proxy-default' : '';
}

export function resolveToken() {
  if (typeof window === 'undefined') return null;
  const keys = Object.keys(localStorage);
  const tokenKey = keys.find(key => /token$/i.test(key) && !/refresh/i.test(key));
  if (!tokenKey) return null;
  const raw = localStorage.getItem(tokenKey);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === 'string') return parsed;
    return parsed?.token || parsed?.accessToken || parsed?.access_token || raw;
  } catch {
    return raw;
  }
}

export function withQuery(url: string, params?: Record<string, any>) {
  if (!params) return url;
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      if (normalized === '' || normalized === 'null' || normalized === 'undefined') return;
    }
    if (Array.isArray(value)) {
      value.forEach(item => {
        if (item === undefined || item === null || item === '') return;
        if (typeof item === 'string') {
          const normalized = item.trim().toLowerCase();
          if (normalized === '' || normalized === 'null' || normalized === 'undefined') return;
        }
        if (typeof item === 'string') {
          search.append(key, item.trim());
        } else {
          search.append(key, String(item));
        }
      });
      return;
    }
    if (typeof value === 'string') {
      search.append(key, value.trim());
      return;
    }
    search.append(key, String(value));
  });
  const query = search.toString();
  return query ? `${url}${url.includes('?') ? '&' : '?'}${query}` : url;
}

let localRequest: (<T>(config: PluginRequestConfig) => Promise<PluginRequestResult<T>>) | null = null;

function resolveSuccessCode() {
  const env = import.meta?.env as unknown as {
    VITE_SERVICE_SUCCESS_CODE?: string;
  };
  return String(env.VITE_SERVICE_SUCCESS_CODE || '200');
}

function isPlainObject(value: unknown): value is Record<string, any> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

async function readResponsePayload(response: Response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function normalizeRequestHeaders(headers?: Record<string, any>, hasBody?: boolean) {
  const token = resolveToken();
  const authorization = token ? String(token) : '';
  const normalized: Record<string, any> = {
    ...(headers || {}),
    ...(authorization ? { Authorization: authorization.startsWith('Bearer ') ? authorization : `Bearer ${authorization}` } : {})
  };

  if (hasBody && !Object.keys(normalized).some(key => key.toLowerCase() === 'content-type')) {
    normalized['Content-Type'] = 'application/json';
  }

  return normalized;
}

function normalizeRequestBody(data: any, headers: Record<string, any>) {
  if (data === undefined || data === null) return undefined;
  if (typeof FormData !== 'undefined' && data instanceof FormData) {
    delete headers['Content-Type'];
    return data;
  }
  if (typeof URLSearchParams !== 'undefined' && data instanceof URLSearchParams) {
    return data;
  }
  if (typeof Blob !== 'undefined' && data instanceof Blob) {
    return data;
  }
  if (typeof data === 'string') {
    return data;
  }
  return JSON.stringify(data);
}

function resolveBackendData<T>(payload: any, successCode: string): T {
  if (isPlainObject(payload) && 'code' in payload) {
    if (String(payload.code) !== successCode) {
      const message = payload.message || payload.msg || 'request failed';
      throw new Error(message);
    }
    return (payload.data ?? payload) as T;
  }
  return payload as T;
}

function notifyRequestError(error: any) {
  const message = error?.message || 'request failed';
  if (typeof window !== 'undefined') {
    (window as any).$message?.error(message);
  }
}

function joinURL(baseURL: string, url: string) {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  if (!baseURL) {
    return url;
  }
  return `${baseURL.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;
}

function createLocalRequest(): <T>(config: PluginRequestConfig) => Promise<PluginRequestResult<T>> {
  const baseURL = getPluginBaseURL();
  const successCode = resolveSuccessCode();

  return async function localRequest<T>(config: PluginRequestConfig): Promise<PluginRequestResult<T>> {
    const method = (config.method || 'GET').toString().toUpperCase();
    const params = normalizeParams(config.params);
    const url = withQuery(joinURL(baseURL, config.url || ''), params);
    const credentials = config.credentials ?? 'include';
    const hasBody = method !== 'GET' && method !== 'HEAD' && config.data !== undefined;
    const headers = normalizeRequestHeaders(config.headers, hasBody);
    const body = hasBody ? normalizeRequestBody(config.data, headers) : undefined;

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
        credentials
      });
      const payload = await readResponsePayload(response);

      if (!response.ok) {
        const message = isPlainObject(payload) ? payload.message || payload.msg : null;
        throw new Error(message || response.statusText || 'request failed');
      }

      return { data: resolveBackendData<T>(payload, successCode), error: null, response };
    } catch (err) {
      notifyRequestError(err);
      return { data: null as T, error: err, response: null };
    }
  };
}

function normalizeParams(params?: Record<string, any>) {
  if (!params) return params;
  const normalized: Record<string, any> = {};
  Object.entries(params).forEach(([key, value]) => {
    const parsed = normalizeParamValue(value);
    if (parsed !== undefined) {
      normalized[key] = parsed;
    }
  });
  return normalized;
}

function normalizeParamValue(value: any): any {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'undefined') {
      return undefined;
    }
    return trimmed;
  }
  if (Array.isArray(value)) {
    const list = value.map(item => normalizeParamValue(item)).filter(item => item !== undefined);
    return list.length ? list : undefined;
  }
  return value;
}

export async function requestFallback<T>(config: PluginRequestConfig): Promise<PluginRequestResult<T>> {
  if (!localRequest) {
    localRequest = createLocalRequest();
  }
  return localRequest<T>(config);
}

export async function request<T>(config: PluginRequestConfig): Promise<PluginRequestResult<T>> {
  const pluginApi = getPluginApi();
  if (pluginApi?.request) {
    return pluginApi.request<T>(config);
  }
  return requestFallback<T>(config);
}

export async function requestData<T>(config: PluginRequestConfig): Promise<T> {
  const result = await request<T>(config);
  if (result?.error) {
    throw result.error;
  }
  return result.data;
}

function resolveLocale() {
  if (typeof window === 'undefined') return 'zh-cn';
  const lang = (navigator.language || '').toLowerCase();
  return lang || 'zh-cn';
}

function pickDictLabel(item: SystemDictItem, locale: string) {
  if (locale.startsWith('zh')) {
    return item.zhCn || item.enUs || item.value;
  }
  return item.enUs || item.zhCn || item.value;
}

/** 获取全部系统字典（含字典项） */
export async function fetchSystemDicts() {
  return await requestData<SystemDict[]>({ url: '/dict/all' });
}

/** 获取字典列表（用于下拉选择字典编码） */
export async function fetchSystemDictListOptions() {
  const dicts = await fetchSystemDicts();
  return dicts.map(dict => ({ label: dict.name, value: dict.code })) as DictOption[];
}

/** 获取指定字典编码的选项列表 */
export async function fetchSystemDictOptions(dictCode: string) {
  const dicts = await fetchSystemDicts();
  const target = dicts.find(item => item.code === dictCode);
  if (!target?.items?.length) return [] as DictOption[];
  const locale = resolveLocale();
  return target.items.map(item => ({
    label: pickDictLabel(item, locale),
    value: item.value
  })) as DictOption[];
}
