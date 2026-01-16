import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from '@unocss/vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';

type SectionRecord = Record<string, string>;

interface SimpleYaml {
  plugin?: SectionRecord;
  author?: SectionRecord;
}

// 生产环境外部化这些共享依赖，复用宿主运行时。
const SHARED_EXTERNALS: Record<string, string> = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  pinia: 'Pinia',
  axios: 'axios',
  '@vueuse/core': 'VueUse'
};

const pluginYamlPath = path.resolve(__dirname, '../src/main/resources/plugin.yaml');

// 精简的 plugin.yaml 解析器（只关心 plugin 与 author 分段）。
function parseSimpleYaml(filePath: string): SimpleYaml {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const result: SimpleYaml = {};
  let currentSection: keyof SimpleYaml | undefined;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const isSection = !line.startsWith(' ') && trimmed.endsWith(':');
    if (isSection) {
      const sectionName = trimmed.substring(0, trimmed.length - 1);
      if (sectionName === 'plugin' || sectionName === 'author') {
        currentSection = sectionName;
        result[currentSection] = {};
      } else {
        currentSection = undefined;
      }
      return;
    }

    if (currentSection && trimmed.includes(':')) {
      const [key, ...rest] = trimmed.split(':');
      result[currentSection]![key.trim()] = rest.join(':').trim();
    }
  });

  return result;
}

// 从 frontDevAddress 推导 dev 端口，避免每个插件硬编码。
function resolveDevPort(devAddress?: string) {
  if (!devAddress) return undefined;
  try {
    const url = new URL(devAddress);
    return Number(url.port) || undefined;
  } catch {
    return undefined;
  }
}

const pluginSetting = parseSimpleYaml(pluginYamlPath);
const pluginId = pluginSetting.plugin?.id || 'tt-plugin-test';
const devPort = resolveDevPort(pluginSetting.plugin?.frontDevAddress);
const sharedDeps = Object.keys(SHARED_EXTERNALS);

export default defineConfig(({ command }) => {
  // 开发态不外部化，保证 Vite HMR 与 Vue 导出正常。
  const useExternals = command !== 'serve';
  const useVueBridge = command === 'serve';

  function createVueBridgePlugin(): Plugin {
    const bridgeId = 'virtual:plugin-vue-bridge';
    const resolvedBridgeId = `\0${bridgeId}`;
    const vueExports = [
      'EffectScope',
      'ReactiveEffect',
      'EffectScope',
      'customRef',
      'computed',
      'ref',
      'shallowRef',
      'reactive',
      'shallowReactive',
      'readonly',
      'shallowReadonly',
      'markRaw',
      'toRaw',
      'toRef',
      'toRefs',
      'unref',
      'isRef',
      'isReactive',
      'isReadonly',
      'isProxy',
      'isVNode',
      'watch',
      'watchEffect',
      'watchPostEffect',
      'watchSyncEffect',
      'effectScope',
      'onScopeDispose',
      'getCurrentInstance',
      'getCurrentScope',
      'provide',
      'inject',
      'nextTick',
      'queuePostFlushCb',
      'queuePreFlushCb',
      'queueJob',
      'h',
      'createVNode',
      'cloneVNode',
      'mergeProps',
      'createTextVNode',
      'createCommentVNode',
      'createStaticVNode',
      'openBlock',
      'createBlock',
      'createElementBlock',
      'createElementVNode',
      'createElementVNode',
      'createSlots',
      'renderList',
      'renderSlot',
      'render',
      'createRenderer',
      'resolveComponent',
      'resolveDynamicComponent',
      'resolveDirective',
      'withCtx',
      'withDirectives',
      'toDisplayString',
      'normalizeClass',
      'normalizeStyle',
      'normalizeProps',
      'guardReactiveProps',
      'camelize',
      'capitalize',
      'hyphenate',
      'toHandlerKey',
      'Fragment',
      'Text',
      'Comment',
      'Teleport',
      'Transition',
      'TransitionGroup',
      'KeepAlive',
      'Suspense',
      'vShow',
      'onMounted',
      'onBeforeMount',
      'onUpdated',
      'onBeforeUpdate',
      'onBeforeUnmount',
      'onUnmounted',
      'onActivated',
      'onDeactivated',
      'onErrorCaptured',
      'defineComponent',
      'defineAsyncComponent',
      'defineEmits',
      'defineProps',
      'defineExpose',
      'useModel',
      'mergeModels',
      'defineModel',
      'defineOptions',
      'withDefaults',
      'useCssModule',
      'useCssVars',
      'useSlots',
      'useAttrs',
      'createApp',
      'createSSRApp'
    ];
    const exportLines = vueExports
      .filter((name, index, list) => list.indexOf(name) === index)
      .map(name => `export const ${name} = Vue.${name};`)
      .join('\n');

    return {
      name: 'plugin-vue-bridge',
      enforce: 'pre',
      resolveId(id) {
        if (id === 'vue') return resolvedBridgeId;
        return null;
      },
      load(id) {
        if (id !== resolvedBridgeId) return null;
        return `
const Vue = window.Vue;
if (!Vue) {
  throw new Error('Vue runtime not found on window. Please start host app first.');
}
export default Vue;
${exportLines}
`;
      }
    };
  }

  return {
    base: `/plugin/${pluginId}`,
    plugins: [
      vue(),
      UnoCSS(),
      ...(useVueBridge ? [createVueBridgePlugin()] : []),
      ...(useExternals ? [viteExternalsPlugin(SHARED_EXTERNALS)] : [])
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@tt/plugin-ui': path.resolve(__dirname, '../../../../tt-admin-frontend/packages/plugin-ui/src'),
      },
      // 开发态强制去重，避免出现多个 Vue 运行时实例。
      dedupe: useVueBridge ? ['vue'] : []
    },
    server: {
      port: devPort ?? 4203,
      host: '0.0.0.0',
      cors: true,
      strictPort: true,
      // 开发态允许宿主跨域拉取插件资源。
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    optimizeDeps: {
      // 开发态禁用关键依赖预打包，确保它们走桥接的 Vue。
      exclude: useVueBridge ? ['vue', 'vue-i18n', 'naive-ui'] : (useExternals ? sharedDeps : [])
    }
  };
});
