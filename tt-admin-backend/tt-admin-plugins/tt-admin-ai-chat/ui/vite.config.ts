import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from '@unocss/vite';
import { viteExternalsPlugin } from 'vite-plugin-externals';

type SectionRecord = Record<string, string>;

interface SimpleYaml {
  plugin?: SectionRecord;
  author?: SectionRecord;
}

interface EntryMap {
  [key: string]: string;
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

// 构建模块入口映射，便于本地开发直接加载模块文件。
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
const pluginId = pluginSetting.plugin?.id || 'tt-plugin-ai-chat';
const devPort = resolveDevPort(pluginSetting.plugin?.frontDevAddress);
// 扫描模块入口以对齐宿主运行时的模块清单。
scanModuleEntries();
const sharedDeps = Object.keys(SHARED_EXTERNALS);

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://localhost:8080';
  const isStandalone = env.VITE_STANDALONE === 'Y';
  // 开发态不外部化，保证 Vite HMR 与 Vue 导出正常。
  const useExternals = !isStandalone && command !== 'serve';

  return {
    base: isStandalone ? '/' : `/plugin/${pluginId}`,
    plugins: [
      vue(),
      UnoCSS(),
      ...(useExternals ? [viteExternalsPlugin(SHARED_EXTERNALS)] : [])
    ],
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
      // 开发态允许宿主跨域拉取插件资源。
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
      // 避免预打包外部依赖，保证构建与开发行为一致。
      exclude: useExternals ? sharedDeps : []
    }
  };
});
