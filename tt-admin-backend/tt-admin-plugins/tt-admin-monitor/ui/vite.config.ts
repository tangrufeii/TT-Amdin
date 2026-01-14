import fs from 'node:fs';
import path from 'node:path';
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
const pluginId = pluginSetting.plugin?.id || 'tt-plugin-monitor';
const devPort = resolveDevPort(pluginSetting.plugin?.frontDevAddress);
const sharedDeps = Object.keys(SHARED_EXTERNALS);

export default defineConfig(({ command }) => {
  // 开发态不外部化，保证 Vite HMR 与 Vue 导出正常。
  const useExternals = command !== 'serve';
  return {
    base: `/plugin/${pluginId}`,
    plugins: [
      vue(),
      UnoCSS(),
      ...(useExternals ? [viteExternalsPlugin(SHARED_EXTERNALS)] : [])
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
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
      // 避免预打包外部依赖，保证构建与开发行为一致。
      exclude: useExternals ? sharedDeps : []
    }
  };
});
