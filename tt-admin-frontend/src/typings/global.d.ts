export {};

declare global {
  export interface Window {
    /** NProgress instance */
    NProgress?: import('nprogress').NProgress;
    /** Loading bar instance */
    $loadingBar?: import('naive-ui').LoadingBarProviderInst;
    /** Dialog instance */
    $dialog?: import('naive-ui').DialogProviderInst;
    /** Message instance */
    $message?: import('naive-ui').MessageProviderInst;
    /** Notification instance */
    $notification?: import('naive-ui').NotificationProviderInst;
    /** Plugin API base url injected by host */
    __TT_PLUGIN_API_BASE__?: string;
    /** Plugin API injected by host */
    __TT_PLUGIN_API__?: {
      request: typeof import('@/service/request').request;
      useTable: typeof import('@/hooks/common/table').useTable;
      useTableOperate: typeof import('@/hooks/common/table').useTableOperate;
      components: {
        TableHeaderOperation: typeof import('@/components/advanced/table-header-operation.vue').default;
      };
    };
  }

  /** Build time of the project */
  export const BUILD_TIME: string;
}
