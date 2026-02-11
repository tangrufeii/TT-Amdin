import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
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
const pluginId = pluginSetting.plugin?.id || 'tt-plugin-webide';
const devPort = resolveDevPort(pluginSetting.plugin?.frontDevAddress);
const sharedDeps = Object.keys(SHARED_EXTERNALS);

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://localhost:8080';
  const useExternals = command !== 'serve';
  return {
    base: `/plugin/${pluginId}`,
    plugins: [vue(), ...(useExternals ? [viteExternalsPlugin(SHARED_EXTERNALS)] : [])],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@tt/plugin-ui': path.resolve(__dirname, '../../../../tt-admin-frontend/packages/plugin-ui/src')
      }
    },
    server: {
      port: devPort ?? 4303,
      host: '0.0.0.0',
      cors: true,
      strictPort: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      proxy: {
        '/proxy-default': {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: pathValue => pathValue.replace(/^\/proxy-default/, '')
        }
      }
    },
    optimizeDeps: {
      exclude: useExternals ? sharedDeps : []
    }
  };
});
