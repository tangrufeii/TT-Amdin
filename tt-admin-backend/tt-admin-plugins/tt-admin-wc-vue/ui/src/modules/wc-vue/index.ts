import '../../style.css';

const modules = import.meta.glob('./view/*.vue');
const viewModuleKeys = Object.keys(modules);

if (import.meta.hot) {
  import.meta.hot.accept(viewModuleKeys, () => {
    // 交给 Vue 组件自身 HMR 处理，避免宿主整页刷新
  });
}

export default () => {
  return {
    router: (menusRouter: any[], moduleName: string) => {
      const router: any[] = [];

      (menusRouter || []).forEach(item => {
        const componentPath = item?.component || '';
        if (!item?.path || !componentPath) return;

        const componentKey = `.${componentPath}.vue`;
        const component = modules[componentKey];
        if (!component) {
          console.warn('[plugin] view component not found:', componentKey);
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
      });

      return router;
    }
  };
};
