import { createAlova } from 'alova';
import type { AlovaDefaultCacheAdapter, AlovaGenerics, AlovaGlobalCacheAdapter, AlovaRequestAdapter } from 'alova';
import VueHook from 'alova/vue';
import type { VueHookType } from 'alova/vue';
import adapterFetch from 'alova/fetch';
import { createServerTokenAuthentication } from 'alova/client';
import type { FetchRequestInit } from 'alova/fetch';
import { BACKEND_ERROR_CODE } from './constant';
import type { CustomAlovaConfig, RequestOptions } from './type';

async function readBackendPayload(response: any) {
  if (!response?.clone || !response?.json) {
    return null;
  }
  try {
    return await response.clone().json();
  } catch {
    return null;
  }
}

function resolveBackendMessage(payload: any) {
  return payload?.message || payload?.msg || payload?.error || '';
}

async function createBackendError(response: any) {
  const payload = await readBackendPayload(response);
  const message = resolveBackendMessage(payload) || 'the backend request error';
  const error: any = new Error(message);
  error.code = BACKEND_ERROR_CODE;
  error.backendCode = payload?.code;
  error.backendMessage = message;
  error.status = response?.status;
  error.statusText = response?.statusText;
  error.url = response?.url;
  return error;
}

export const createAlovaRequest = <
  RequestConfig = FetchRequestInit,
  ResponseType = Response,
  ResponseHeader = Headers,
  L1Cache extends AlovaGlobalCacheAdapter = AlovaDefaultCacheAdapter,
  L2Cache extends AlovaGlobalCacheAdapter = AlovaDefaultCacheAdapter
>(
  customConfig: CustomAlovaConfig<
    AlovaGenerics<any, any, RequestConfig, ResponseType, ResponseHeader, L1Cache, L2Cache, any>
  >,
  options: RequestOptions<AlovaGenerics<any, any, RequestConfig, ResponseType, ResponseHeader, L1Cache, L2Cache, any>>
) => {
  const { tokenRefresher } = options;
  const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<
    VueHookType,
    AlovaRequestAdapter<RequestConfig, ResponseType, ResponseHeader>
  >({
    refreshTokenOnSuccess: {
      isExpired: (response, method) => tokenRefresher?.isExpired(response, method) || false,
      handler: async (response, method) => tokenRefresher?.handler(response, method)
    },
    refreshTokenOnError: {
      isExpired: (response, method) => tokenRefresher?.isExpired(response, method) || false,
      handler: async (response, method) => tokenRefresher?.handler(response, method)
    }
  });

  const instance = createAlova({
    ...customConfig,
    timeout: customConfig.timeout ?? 10 * 1000,
    requestAdapter: (customConfig.requestAdapter as any) ?? adapterFetch(),
    statesHook: VueHook,
    beforeRequest: onAuthRequired(options.onRequest as any),
    responded: onResponseRefreshToken({
      onSuccess: async (response, method) => {
        // check if http status is success
        let error: any = null;
        let transformedData: any = null;
        try {
          if (await options.isBackendSuccess(response)) {
            transformedData = await options.transformBackendResponse(response);
          } else {
            error = await createBackendError(response);
          }
        } catch (err) {
          error = err;
        }

        if (error) {
          await options.onError?.(error, response, method);
          throw error;
        }

        return transformedData;
      },
      onComplete: options.onComplete,
      onError: (error, method) => options.onError?.(error, null, method)
    })
  });

  return instance;
};

export { BACKEND_ERROR_CODE };
export type * from './type';
export type * from 'alova';
