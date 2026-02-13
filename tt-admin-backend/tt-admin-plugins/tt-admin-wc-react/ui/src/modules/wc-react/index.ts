import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../style.css';

type ReactComponentLike = React.ComponentType<any>;
type RuntimeStore = {
  // 视图模块路径 -> React 组件
  componentByModuleKey: Map<string, ReactComponentLike>;
  // 视图模块路径 -> 当前页面上挂载的所有 React Root 实例
  activeRootsByModuleKey: Map<string, Set<ReactDOM.Root>>;
};

const viewModules = import.meta.glob('./view/*.{ts,tsx,js,jsx}', { eager: true });
const viewModuleKeys = Object.keys(viewModules);

declare global {
  interface Window {
    __TT_PLUGIN_WC_REACT_RUNTIME__?: RuntimeStore;
  }
}

function getRuntimeStore(): RuntimeStore {
  /**
   * 关键点：
   * - Vite HMR 在当前插件结构下经常会把 view 的更新冒泡到 index.ts。
   * - 一旦 index.ts 被热替换，模块级变量会重建。
   * - 如果仍使用模块内局部 Map/Set，会丢失已挂载页面的 root 引用，导致“控制台有 hot updated，但页面不更新”。
   * - 把运行态挂到 window，可在模块热替换后复用旧状态，保持连续热更新能力。
   */
  if (!window.__TT_PLUGIN_WC_REACT_RUNTIME__) {
    window.__TT_PLUGIN_WC_REACT_RUNTIME__ = {
      componentByModuleKey: new Map<string, ReactComponentLike>(),
      activeRootsByModuleKey: new Map<string, Set<ReactDOM.Root>>()
    };
  }

  return window.__TT_PLUGIN_WC_REACT_RUNTIME__;
}

const runtimeStore = getRuntimeStore();
const { componentByModuleKey, activeRootsByModuleKey } = runtimeStore;
const moduleKeyByViewPath = new Map<string, string>();

function normalizePathForMatch(rawPath: string) {
  const cleaned = rawPath.trim().replace(/\\/g, '/').replace(/\?.*$/, '');
  if (!cleaned) {
    return '';
  }

  const withoutLeadingSlash = cleaned.replace(/^\/+/, '');
  const viewSegmentIndex = withoutLeadingSlash.lastIndexOf('/view/');
  const viewPath = viewSegmentIndex >= 0
    ? withoutLeadingSlash.slice(viewSegmentIndex + 1)
    : withoutLeadingSlash.startsWith('view/')
      ? withoutLeadingSlash
      : `view/${withoutLeadingSlash.replace(/^\.+\//, '')}`;

  return viewPath.replace(/\.[^/.]+$/, '');
}

function normalizeViewComponentPath(componentPath: string) {
  return normalizePathForMatch(componentPath);
}

function buildViewModuleKeys(componentPath: string) {
  const basePath = normalizeViewComponentPath(componentPath);
  if (!basePath) {
    return [] as string[];
  }

  return [`./${basePath}.ts`, `./${basePath}.tsx`, `./${basePath}.js`, `./${basePath}.jsx`];
}

function getModuleDefault(moduleValue: unknown) {
  return (moduleValue as { default?: ReactComponentLike } | undefined)?.default;
}

function registerViewComponent(moduleKey: string, moduleValue: unknown) {
  const component = getModuleDefault(moduleValue);
  if (!component) {
    return;
  }

  componentByModuleKey.set(moduleKey, component);

  const normalizedViewPath = normalizePathForMatch(moduleKey);
  if (!normalizedViewPath) {
    return;
  }

  moduleKeyByViewPath.set(normalizedViewPath, moduleKey);

  const shortPath = normalizedViewPath.replace(/^view\//, '');
  if (shortPath) {
    moduleKeyByViewPath.set(shortPath, moduleKey);
  }
}

function resolveModuleKeyAndComponent(componentPath: string) {
  const normalizedPath = normalizeViewComponentPath(componentPath);
  const matchedKey = moduleKeyByViewPath.get(normalizedPath);
  if (matchedKey) {
    const matchedComponent = componentByModuleKey.get(matchedKey);
    if (matchedComponent) {
      return { moduleKey: matchedKey, component: matchedComponent };
    }
  }

  const moduleKeys = buildViewModuleKeys(componentPath);

  for (const moduleKey of moduleKeys) {
    if (!componentByModuleKey.has(moduleKey)) {
      registerViewComponent(moduleKey, viewModules[moduleKey]);
    }

    const cached = componentByModuleKey.get(moduleKey);
    if (cached) {
      return { moduleKey, component: cached };
    }
  }

  if (normalizedPath) {
    const fuzzyMatchedKey = viewModuleKeys.find(key => normalizePathForMatch(key) === normalizedPath);
    if (fuzzyMatchedKey) {
      const fuzzyComponent = componentByModuleKey.get(fuzzyMatchedKey);
      if (fuzzyComponent) {
        return { moduleKey: fuzzyMatchedKey, component: fuzzyComponent };
      }
    }
  }

  return { moduleKey: '', component: null as ReactComponentLike | null };
}

function ensureRootSet(moduleKey: string) {
  if (!activeRootsByModuleKey.has(moduleKey)) {
    activeRootsByModuleKey.set(moduleKey, new Set<ReactDOM.Root>());
  }

  return activeRootsByModuleKey.get(moduleKey)!;
}

function renderReactView(moduleKey: string, root: ReactDOM.Root) {
  const view = componentByModuleKey.get(moduleKey);
  if (!view) {
    return;
  }

  root.render(React.createElement(view));
}

function rerenderRootsByModuleKey(moduleKey: string) {
  const roots = activeRootsByModuleKey.get(moduleKey);
  roots?.forEach(root => renderReactView(moduleKey, root));
}

function rerenderAllActiveRoots() {
  /**
   * 关键点：
   * - 当 index.ts 因为 HMR 被重新执行时，虽然状态保留了，但页面不会自动重绘。
   * - 这里主动遍历当前活跃 root，并用最新组件重渲染一次，保证“入口热更”场景也能立即看到变更。
   */
  activeRootsByModuleKey.forEach((roots, moduleKey) => {
    if (!roots.size) {
      return;
    }

    roots.forEach(root => renderReactView(moduleKey, root));
  });
}

function getVueRuntime() {
  const runtime = (window as any).Vue;
  if (!runtime) {
    throw new Error('Vue runtime not found on window. Please start host app first.');
  }

  return runtime;
}

function mountReactView(moduleKey: string) {
  const { defineComponent, h, onBeforeUnmount, onMounted, ref } = getVueRuntime();

  return defineComponent({
    name: 'PluginWcReactView',
    setup() {
      const containerRef = ref(null as HTMLDivElement | null);
      let reactRoot: ReactDOM.Root | null = null;

      onMounted(() => {
        if (containerRef.value && !reactRoot) {
          reactRoot = ReactDOM.createRoot(containerRef.value);
          ensureRootSet(moduleKey).add(reactRoot);
          renderReactView(moduleKey, reactRoot);
        }
      });

      onBeforeUnmount(() => {
        if (reactRoot) {
          ensureRootSet(moduleKey).delete(reactRoot);
        }

        reactRoot?.unmount();
        reactRoot = null;
      });

      return () => h('div', { ref: containerRef, style: { width: '100%' } });
    }
  });
}

viewModuleKeys.forEach(moduleKey => {
  registerViewComponent(moduleKey, viewModules[moduleKey]);
});

rerenderAllActiveRoots();

if (import.meta.hot) {
  /**
   * 关键点：
   * - self-accept 让 index.ts 自身成为 HMR 边界，避免继续向宿主层冒泡触发更大范围刷新。
   * - 空 accept 即可表达“当前模块可安全热替换”。
   */
  import.meta.hot.accept();

  /**
   * 关键点：
   * - 对每个 view 模块做精确 accept。
   * - 命中某个 view 更新后，仅替换对应 moduleKey 的组件并重渲染对应页面实例，不影响其他路由页面。
   */
  import.meta.hot.accept(viewModuleKeys, updatedModules => {
    updatedModules.forEach((updatedModule, index) => {
      const moduleKey = viewModuleKeys[index];
      if (!moduleKey) {
        return;
      }

      registerViewComponent(moduleKey, updatedModule);
      if (!componentByModuleKey.has(moduleKey)) {
        return;
      }

      rerenderRootsByModuleKey(moduleKey);
    });
  });
}

export default () => {
  return {
    router: (menusRouter: any[], moduleName: string) => {
      const router: any[] = [];

      (menusRouter || []).forEach(item => {
        const componentPath = item?.component || '';
        if (!item?.path || !componentPath) {
          return;
        }

        const { moduleKey, component } = resolveModuleKeyAndComponent(componentPath);
        if (!moduleKey || !component) {
          console.warn('[plugin] react view component not found:', componentPath);
          return;
        }

        router.push({
          name: item.componentName || item.name,
          path: item.path,
          component: mountReactView(moduleKey),
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
