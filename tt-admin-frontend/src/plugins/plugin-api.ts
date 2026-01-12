import type { CustomAxiosRequestConfig } from '@sa/axios';
import { BACKEND_ERROR_CODE, createAlovaRequest } from '@sa/alova';
import { request } from '@/service/request';
import { getServiceBaseURL } from '@/utils/service';
import { $t } from '@/locales';
import { useAuthStore } from '@/store/modules/auth';
import { getAuthorization, handleExpiredRequest, showErrorMsg } from '@/service/request/shared';
import type { RequestInstanceState } from '@/service/request/type';
import { useTable, useTableOperate } from '@/hooks/common/table';
import TableHeaderOperation from '@/components/advanced/table-header-operation.vue';

export type PluginApi = {
  request: typeof request;
  useTable: typeof useTable;
  useTableOperate: typeof useTableOperate;
  components: {
    TableHeaderOperation: typeof TableHeaderOperation;
  };
};

const pluginRequestState: RequestInstanceState = {
  errMsgStack: [],
  refreshTokenPromise: null
};

const jsonCache = new WeakMap<Response, any>();

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

function createPluginRequest() {
  const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
  const { baseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);

  const alova = createAlovaRequest(
    {
      baseURL
    },
    {
      onRequest: method => {
        const Authorization = getAuthorization();
        method.config = method.config || {};
        method.config.headers = {
          ...(method.config.headers || {}),
          Authorization
        };
      },
      isBackendSuccess: async response => {
        const payload = await readJson(response);
        return String(payload?.code) === import.meta.env.VITE_SERVICE_SUCCESS_CODE;
      },
      transformBackendResponse: async response => {
        const payload = await readJson(response);
        return payload?.data ?? payload;
      },
      tokenRefresher: {
        isExpired: async response => {
          const payload = await readJson(response);
          const expiredTokenCodes = import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(',') || [];
          return expiredTokenCodes.includes(String(payload?.code));
        },
        handler: async () => {
          await handleExpiredRequest(pluginRequestState);
        }
      },
      onError: async (error, response) => {
        if (error?.code === BACKEND_ERROR_CODE && response) {
          const payload = await readJson(response);
          const responseCode = String(payload?.code || '');
          const message = payload?.msg || error?.message || $t('common.error');
          const authStore = useAuthStore();

          function handleLogout() {
            authStore.resetStore();
          }

          const logoutCodes = import.meta.env.VITE_SERVICE_LOGOUT_CODES?.split(',') || [];
          if (logoutCodes.includes(responseCode)) {
            handleLogout();
            return;
          }

          const modalLogoutCodes = import.meta.env.VITE_SERVICE_MODAL_LOGOUT_CODES?.split(',') || [];
          if (modalLogoutCodes.includes(responseCode) && !pluginRequestState.errMsgStack?.includes(message)) {
            pluginRequestState.errMsgStack = [...(pluginRequestState.errMsgStack || []), message];

            window.addEventListener('beforeunload', handleLogout);

            window.$dialog?.error({
              title: $t('common.error'),
              content: message,
              positiveText: $t('common.confirm'),
              maskClosable: false,
              closeOnEsc: false,
              onPositiveClick() {
                handleLogout();
              },
              onClose() {
                handleLogout();
              }
            });
            return;
          }

          const expiredTokenCodes = import.meta.env.VITE_SERVICE_EXPIRED_TOKEN_CODES?.split(',') || [];
          if (expiredTokenCodes.includes(responseCode)) {
            await handleExpiredRequest(pluginRequestState);
            return;
          }

          showErrorMsg(pluginRequestState, message);
          return;
        }

        showErrorMsg(pluginRequestState, error?.message || $t('common.error'));
      }
    }
  );

  const pluginRequest = (async function pluginRequest<T>(config: CustomAxiosRequestConfig) {
    const method = (config.method || 'GET').toString().toUpperCase();
    const url = config.url || '';
    const params = config.params;
    const headers = config.headers as Record<string, any> | undefined;
    const data = config.data;

    let alovaMethod: any;
    if (method === 'POST') {
      alovaMethod = alova.Post(url, data ?? {}, { params, headers });
    } else if (method === 'PUT') {
      alovaMethod = alova.Put(url, data ?? {}, { params, headers });
    } else if (method === 'DELETE') {
      alovaMethod = alova.Delete(url, data ?? {}, { params, headers });
    } else {
      alovaMethod = alova.Get(url, { params, headers });
    }

    try {
      const payload = await alovaMethod.send();
      return { data: payload as T, error: null, response: null };
    } catch (err) {
      return { data: null, error: err, response: null };
    }
  }) as typeof request;

  pluginRequest.state = pluginRequestState;
  pluginRequest.cancelAllRequest = () => {};

  return pluginRequest;
}

export function setupPluginApi() {
  const globalWindow = window as Window & { __TT_PLUGIN_API__?: PluginApi };
  if (!globalWindow.__TT_PLUGIN_API__) {
    globalWindow.__TT_PLUGIN_API__ = {
      request: createPluginRequest(),
      useTable,
      useTableOperate,
      components: {
        TableHeaderOperation
      }
    };
  }
}
