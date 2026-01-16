import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import UnoCSS from '@unocss/vite';
import yaml from 'js-yaml';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 鍏变韩渚濊禆鐢卞涓昏繍琛屾椂鎻愪緵锛屾瀯寤烘椂澶栭儴鍖栦互澶嶇敤瀹夸富銆?const SHARED_EXTERNALS = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  pinia: 'Pinia',
  axios: 'axios',
  '@vueuse/core': 'VueUse'
};

const pluginYamlPath = path.resolve(__dirname, '../src/main/resources/plugin.yaml');
const frontendYamlPath = path.resolve(__dirname, '../src/main/resources/frontend.yaml');

// 绮剧畝鐨?plugin.yaml 瑙ｆ瀽鍣紙鍙叧蹇?plugin 涓?author 鍒嗘锛夈€?function parseSimpleYaml(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const result = {};
  let currentSection;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const isSection = !line.startsWith(' ') && trimmed.endsWith(':');
    if (isSection) {
      const sectionName = trimmed.slice(0, -1);
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
      result[currentSection][key.trim()] = rest.join(':').trim();
    }
  });

  return result;
}

// 璇诲彇 frontend.yaml 鐢ㄤ簬闄愬畾鎵撳寘鐨勬ā鍧楀垪琛ㄣ€?function readFrontendModules() {
  if (!fs.existsSync(frontendYamlPath)) return [];
  const content = fs.readFileSync(frontendYamlPath, 'utf8');
  const data = yaml.load(content) || {};
  const modules = Array.isArray(data.modules) ? data.modules : [];
  return modules.map(module => module?.moduleName).filter(Boolean);
}

// 鎵弿妯″潡鐩綍骞惰В鏋愰涓尮閰嶇殑鍏ュ彛鏂囦欢銆?function scanModuleEntries(allowedModules = []) {
  const modulesDir = path.resolve(__dirname, 'src/modules');
  const entries = {};

  if (fs.existsSync(modulesDir)) {
    fs.readdirSync(modulesDir).forEach(moduleName => {
      if (allowedModules.length && !allowedModules.includes(moduleName)) return;
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

// 涓烘瘡涓ā鍧楃敓鎴愮嫭绔嬬殑 Vite 鏋勫缓閰嶇疆锛坙ib 妯″紡杈撳嚭锛夈€?function createModuleConfig(pluginId, moduleName, entryPath) {
  return defineConfig({
    configFile: false,
    envFile: false,
    define: {
      'process.env': '{}',
      'process.env.NODE_ENV': '"production"'
    },
    base: `/plugin/${r'${pluginId}'}`,
    plugins: [vue(), UnoCSS(), viteExternalsPlugin(SHARED_EXTERNALS), cssInjectedByJsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@tt/plugin-ui': path.resolve(__dirname, '../../../../tt-admin-frontend/packages/plugin-ui/src'),
      }
    },
    build: {
      outDir: path.resolve(__dirname, `../src/main/resources/ui/modules/${r'${moduleName}'}`),
      emptyOutDir: true,
      lib: {
        entry: entryPath,
        name: `_module_${r'${moduleName}'}`,
        formats: ['es'],
        fileName: () => 'index.js'
      },
      rollupOptions: {
        external: Object.keys(SHARED_EXTERNALS),
        output: {
          globals: SHARED_EXTERNALS,
          assetFileNames: 'assets/[name][extname]',
          chunkFileNames: 'lib/[name].js'
        }
      }
    }
  });
}

async function buildModules() {
  const pluginSetting = parseSimpleYaml(pluginYamlPath);
  const pluginId = pluginSetting.plugin?.id || 'tt-plugin';
  const allowedModules = readFrontendModules();
  const moduleEntries = scanModuleEntries(allowedModules);

  // 姣忔閲嶅缓妯″潡杈撳嚭锛岄伩鍏嶆畫鐣欐棫璧勬簮銆?  const outputModulesDir = path.resolve(__dirname, '../src/main/resources/ui/modules');
  fs.rmSync(outputModulesDir, { recursive: true, force: true });
  fs.mkdirSync(outputModulesDir, { recursive: true });

  for (const [moduleName, entryPath] of Object.entries(moduleEntries)) {
    console.info(`[plugin:build] Build module ${r'${moduleName}'} (${r'${entryPath}'})`);
    await build(createModuleConfig(pluginId, moduleName, entryPath));
  }
}

// 澶嶅埗 i18n JSON 鍒版墦鍖呰祫婧愮洰褰曚緵杩愯鏃跺姞杞姐€?function copyI18nAssets() {
  const sourceDir = path.resolve(__dirname, 'src/i18n');
  if (!fs.existsSync(sourceDir)) {
    return;
  }
  const targetDir = path.resolve(__dirname, '../src/main/resources/ui/i18n');
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.cpSync(sourceDir, targetDir, { recursive: true });
  console.info('[plugin:build] Copy i18n assets ->', targetDir);
}

async function run() {
  await buildModules();
  copyI18nAssets();
}

run().catch(error => {
  console.error('[plugin:build] Build failed:', error);
  process.exit(1);
});
