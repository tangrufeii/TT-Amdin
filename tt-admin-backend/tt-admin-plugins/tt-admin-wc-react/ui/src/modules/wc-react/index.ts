import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../style.css';
import WcReactView from './view/WcReactView';

let currentView = WcReactView;
const activeRoots = new Set<ReactDOM.Root>();

function renderReactView(root: ReactDOM.Root) {
  root.render(React.createElement(currentView));
}

function getVueRuntime() {
  const runtime = (window as any).Vue;
  if (!runtime) {
    throw new Error('Vue runtime not found on window. Please start host app first.');
  }
  return runtime;
}

function mountReactView() {
  const { defineComponent, h, onBeforeUnmount, onMounted, ref } = getVueRuntime();

  return defineComponent({
    name: 'PluginWcReactView',
    setup() {
      const containerRef = ref(null as HTMLDivElement | null);
      let reactRoot: ReactDOM.Root | null = null;

      onMounted(() => {
        if (containerRef.value && !reactRoot) {
          reactRoot = ReactDOM.createRoot(containerRef.value);
          activeRoots.add(reactRoot);
          renderReactView(reactRoot);
        }
      });

      onBeforeUnmount(() => {
        if (reactRoot) {
          activeRoots.delete(reactRoot);
        }
        reactRoot?.unmount();
        reactRoot = null;
      });

      return () => h('div', { ref: containerRef, style: { width: '100%' } });
    }
  });
}

if (import.meta.hot) {
  import.meta.hot.accept('./view/WcReactView', newModule => {
    if (newModule?.default) {
      currentView = newModule.default;
      activeRoots.forEach(renderReactView);
    }
  });
}

export default () => {
  return {
    router: (menusRouter: any[], moduleName: string) => {
      const router: any[] = [];

      (menusRouter || []).forEach(item => {
        if (!item?.path) return;

        router.push({
          name: item.componentName || item.name,
          path: item.path,
          component: mountReactView(),
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
