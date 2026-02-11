import fs from 'node:fs';

import path from 'node:path';

import { fileURLToPath } from 'node:url';

import { build, defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import UnoCSS from '@unocss/vite';

import { viteExternalsPlugin } from 'vite-plugin-externals';

import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';



const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



const SHARED_EXTERNALS = {

  vue: 'Vue',

  'vue-router': 'VueRouter',

  pinia: 'Pinia',

  axios: 'axios',

  '@vueuse/core': 'VueUse'

};



const pluginYamlPath = path.resolve(__dirname, '../src/main/resources/plugin.yaml');



function parseSimpleYaml(filePath) {

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



function scanModuleEntries() {

  const modulesDir = path.resolve(__dirname, 'src/modules');

  const entries = {};



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



function createModuleConfig(pluginId, moduleName, entryPath) {

  return defineConfig({

    configFile: false,

    envFile: false,
    define: {
      'process.env': '{}',
      'process.env.NODE_ENV': '"production"'
    },
    base: `/plugin/${pluginId}`,

    plugins: [vue(), UnoCSS(), viteExternalsPlugin(SHARED_EXTERNALS), cssInjectedByJsPlugin()],

    resolve: {

      alias: {

        '@': path.resolve(__dirname, './src'),
        '@tt/plugin-ui': path.resolve(__dirname, '../../../../tt-admin-frontend/packages/plugin-ui/src'),
                
      }

    },

    build: {

      outDir: path.resolve(__dirname, `../src/main/resources/ui/modules/${moduleName}`),

      emptyOutDir: true,

      cssCodeSplit: true,

      modulePreload: false,

      lib: {

        entry: entryPath,

        name: `_module_${moduleName}`,

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

  const pluginId = pluginSetting.plugin?.id || 'tt-plugin-demo';

  const moduleEntries = scanModuleEntries();



  for (const [moduleName, entryPath] of Object.entries(moduleEntries)) {

    console.info(`[plugin:build] 构建模块 ${moduleName} (${entryPath})`);

    await build(createModuleConfig(pluginId, moduleName, entryPath));

  }

}



function copyI18nAssets() {

  const sourceDir = path.resolve(__dirname, 'src/i18n');

  if (!fs.existsSync(sourceDir)) {

    return;

  }

  const targetDir = path.resolve(__dirname, '../src/main/resources/ui/i18n');

  fs.rmSync(targetDir, { recursive: true, force: true });

  fs.cpSync(sourceDir, targetDir, { recursive: true });

  console.info('[plugin:build] 复制 i18n 资源 ->', targetDir);

}



async function run() {

  await buildModules();

  copyI18nAssets();

}



run().catch(error => {
  console.error('[plugin:build] 构建失败:', error);
  process.exit(1);
});
