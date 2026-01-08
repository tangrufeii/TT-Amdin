const modules = import.meta.glob('./view/*.vue');

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
