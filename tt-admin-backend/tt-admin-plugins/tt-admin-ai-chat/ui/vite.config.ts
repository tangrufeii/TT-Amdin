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

interface EntryMap {
  [key: string]: string;
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

function scanModuleEntries(): EntryMap {
  const modulesDir = path.resolve(__dirname, 'src/modules');
  const entries: EntryMap = {};

  if (fs.existsSync(modulesDir)) {
    fs.readdirSync(modulesDir).forEach(moduleName => {
      const moduleDir = path.join(modulesDir, moduleName);
      if (!fs.statSync(moduleDir).isDirectory()) return;

      const candidates = ['index.ts', 'index.tsx', 'index.js', 'index.jsx', 'index.vue'];
      const entry = candidates
        .map(candidate => path.join(moduleDir, candidate))
        .find(candidate => fs.existsSync(candidate));

      if (entry) {
        entries[moduleName] = entry;
      }
    });
  }

  if (!Object.keys(entries).length) {
    entries.main = path.resolve(__dirname, 'src/main.ts');
  }

  return entries;
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
const pluginId = pluginSetting.plugin?.id || 'tt-plugin-ai-chat';
const devPort = resolveDevPort(pluginSetting.plugin?.frontDevAddress);
scanModuleEntries();
const sharedDeps = Object.keys(SHARED_EXTERNALS);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://localhost:8080';
  const isStandalone = env.VITE_STANDALONE === 'Y';

  return {
    base: isStandalone ? '/' : `/plugin/${pluginId}`,
    plugins: isStandalone
      ? [vue()]
      : [vue(), viteExternalsPlugin(SHARED_EXTERNALS, { disableInServe: true })],
    define: {
      'process.env': {},
      process: {
        env: {}
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      port: devPort ?? 4204,
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
      exclude: isStandalone ? [] : sharedDeps
    }
  };
});
