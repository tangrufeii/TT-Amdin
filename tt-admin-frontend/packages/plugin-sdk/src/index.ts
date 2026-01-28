import type { Component } from 'vue';
import { BACKEND_ERROR_CODE, createAlovaRequest } from '@sa/alova';

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

export type PluginRequestResult<T> = { data: T; error: any; response?: Response };

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

const jsonCache = new WeakMap<Response, any>();

export function getPluginApi() {
  if (typeof window === 'undefined') return undefined;
  // eslint-disable-next-line no-underscore-dangle
  return (window as PluginWindow).__TT_PLUGIN_API__;
}

async function readJson(response: Response) {
  if (jsonCache.has(response)) {
    return jsonCache.get(response);
  }
  let payload: any = null;
  try {
    payload = await response.clone().json();
  } catch {
    payload = null;
  }
  jsonCache.set(response, payload);
  return payload;
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
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

export function withQuery(url: string, params?: Record<string, any>) {
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

let localRequest: (<T>(config: PluginRequestConfig) => Promise<PluginRequestResult<T>>) | null = null;

function createLocalRequest() {
  const baseURL = getPluginBaseURL();
  const successCode = (import.meta.env as any).VITE_SERVICE_SUCCESS_CODE || '200';

  const alova = createAlovaRequest(
    {
      baseURL
    },
    {
      onRequest: method => {
        const token = resolveToken();
        method.config = method.config || {};
        method.config.headers = {
          ...(method.config.headers || {}),
          ...(token ? { Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}` } : {})
        };
      },
      isBackendSuccess: async response => {
        const payload = await readJson(response);
        return String(payload?.code) === String(successCode);
      },
      transformBackendResponse: async response => {
        const payload = await readJson(response);
        return payload?.data ?? payload;
      },
      onError: async (error, response) => {
        if (error?.code === BACKEND_ERROR_CODE && response) {
          const payload = await readJson(response);
          const message = payload?.message || payload?.msg || error?.message || 'request failed';
          if (typeof window !== 'undefined') {
            (window as any).$message?.error(message);
          }
          return;
        }
        const message = error?.message || 'request failed';
        if (typeof window !== 'undefined') {
          (window as any).$message?.error(message);
        }
      }
    }
  );

  return async function localRequest<T>(config: PluginRequestConfig): Promise<PluginRequestResult<T>> {
    const method = (config.method || 'GET').toString().toUpperCase();
    const url = config.url || '';
    const params = config.params;
    const headers = config.headers as Record<string, any> | undefined;
    const credentials = config.credentials ?? 'include';
    const options = { params, headers, credentials } as any;

    let alovaMethod: any;
    if (method === 'POST') {
      alovaMethod = alova.Post(url, config.data ?? {}, options);
    } else if (method === 'PUT') {
      alovaMethod = alova.Put(url, config.data ?? {}, options);
    } else if (method === 'DELETE') {
      alovaMethod = alova.Delete(url, config.data ?? {}, options);
    } else {
      alovaMethod = alova.Get(url, options);
    }

    try {
      const payload = await alovaMethod.send();
      return { data: payload as T, error: null, response: null };
    } catch (err) {
      return { data: null as T, error: err, response: null };
    }
  };
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
