import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteExternalsPlugin } from 'vite-plugin-externals';

type SectionRecord = Record<string, string>;

interface SimpleYaml {
  plugin?: SectionRecord;
  author?: SectionRecord;
}

const SHARED_EXTERNALS: Record<string, string> = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  pinia: 'Pinia',
  axios: 'axios',
  '@vueuse/core': 'VueUse'
};

const pluginYamlPath = path.resolve(__dirname, '../src/main/resources/plugin.yaml');

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
const pluginId = pluginSetting.plugin?.id || 'tt-plugin-wc-vue';
const devPort = resolveDevPort(pluginSetting.plugin?.frontDevAddress);
const sharedDeps = Object.keys(SHARED_EXTERNALS);

export default defineConfig(({ command }) => {
  const useExternals = command !== 'serve';
  const useVueBridge = command === 'serve';

  function createVueBridgePlugin(): Plugin {
    const bridgeId = 'virtual:plugin-vue-bridge';
    const resolvedBridgeId = `\0${bridgeId}`;
    const vueExports = [
      'computed',
      'ref',
      'reactive',
      'watch',
      'watchEffect',
      'h',
      'defineComponent',
      'onMounted',
      'onUnmounted',
      'nextTick',
      'createApp',
      'toRef',
      'toRefs',
      'unref',
      'isRef',
      'isReactive',
      'resolveComponent',
      'openBlock',
      'createElementBlock',
      'createElementVNode',
      'toDisplayString'
    ];
    const exportLines = vueExports.map(name => `export const ${name} = Vue.${name};`).join('\n');

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
      ...(useVueBridge ? [createVueBridgePlugin()] : []),
      ...(useExternals ? [viteExternalsPlugin(SHARED_EXTERNALS)] : [])
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
      dedupe: useVueBridge ? ['vue'] : []
    },
    server: {
      port: devPort ?? 5176,
      host: '0.0.0.0',
      cors: true,
      strictPort: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    },
    optimizeDeps: {
      exclude: useVueBridge ? ['vue'] : (useExternals ? sharedDeps : [])
    }
  };
});
