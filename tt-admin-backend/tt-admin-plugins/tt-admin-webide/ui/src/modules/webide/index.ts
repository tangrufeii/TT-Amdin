import '../../style.css';
import 'naive-ui/es/message/styles';
import 'naive-ui/es/notification/styles';

const modules = import.meta.glob('./view/*.vue');
const moduleEntries = Object.entries(modules) as Array<[string, () => Promise<any>]>;

function normalizeComponentPath(componentPath: string) {
  return componentPath.trim().replace(/\\/g, '/').replace(/\.[^/.]+$/, '');
}

function resolveComponent(componentPath: string) {
  const normalized = normalizeComponentPath(componentPath);
  if (!normalized) {
    return null;
  }

  const basePath = normalized.startsWith('/') ? normalized : `/${normalized}`;
  const candidates = new Set<string>([
    `.${basePath}.vue`,
    `./${basePath.replace(/^\//, '')}.vue`
  ]);

  for (const key of candidates) {
    const loader = modules[key];
    if (loader) {
      return { key, loader };
    }
  }

  const name = basePath.split('/').pop();
  if (name) {
    const fuzzy = moduleEntries.find(([key]) => key.endsWith(`/${name}.vue`));
    if (fuzzy) {
      return { key: fuzzy[0], loader: fuzzy[1] };
    }
  }

  return null;
}

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
          const resolved = resolveComponent(item.component);
          if (!resolved) {
            console.warn('[webide] view component not found:', item.component);
            return;
          }
          router.push({
            name: item.componentName || item.name,
            path: item.path,
            component: resolved.loader,
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
