import '../../style.css';
import 'naive-ui/es/message/styles';
import 'naive-ui/es/notification/styles';

const modules = import.meta.glob('./view/*.vue');

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
          const componentKey = `.${item.component}.vue`;
          const component = modules[componentKey];
          if (!component) {
            console.warn('[webide] view component not found:', componentKey);
            return;
          }
          router.push({
            name: item.componentName || item.name,
            path: item.path,
            component,
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
