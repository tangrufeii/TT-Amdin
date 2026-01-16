import 'uno.css';
import '../../style.css';
const modules = import.meta.glob('./view/*.vue');

// 插件开发态热更新后，通知宿主刷新当前页面视图。
if (import.meta.hot) {
  import.meta.hot.on('vite:afterUpdate', () => {
    (window as any).__TT_PLUGIN_HMR_RELOAD__?.();
  });
}
export default () => {
  return {
    router: (menusRouter: any[], moduleName: string) => {
      const router: any[] = [];
      menusRouter.forEach(item => {
        if (item.path && item.component) {
          router.push({
            name: item.componentName || item.name,
            path: item.path,
            component: modules[`.${item.component}.vue`],
            meta: {
              moduleName,
              title: item.meta?.title || item.name,
              keepAlive: item.meta?.keepAlive ?? true,
              ...item.meta
            }
          });
        }
      });
      return router;
    }
  };
};
