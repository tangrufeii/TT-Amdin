const modules = import.meta.glob('./view/*.vue');

// 插件开发态热更新后，通知宿主刷新当前页面视图。
if (import.meta.hot) {
  import.meta.hot.on('vite:afterUpdate', () => {
    (window as any).__TT_PLUGIN_HMR_RELOAD__?.();
  });
}
export default () => {\n  return {\n    router: (menusRouter: any[], moduleName: string) => {\n      const router: any[] = [];\n      menusRouter.forEach(item => {\n        if (item.path && item.component) {\n          router.push({\n            name: item.componentName || item.name,\n            path: item.path,\n            component: modules[`.${item.component}.vue`],\n            meta: {\n              moduleName,\n              title: item.meta?.title || item.name,\n              keepAlive: item.meta?.keepAlive ?? true,\n              ...item.meta\n            }\n          });\n        }\n      });\n      return router;\n    }\n  };\n};\n