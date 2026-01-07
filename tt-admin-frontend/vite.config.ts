import process from 'node:process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import type { HtmlTagDescriptor } from 'vite';
import { setupVitePlugins } from './build/plugins';
import { createViteProxy, getBuildTime } from './build/config';

const projectRoot = fileURLToPath(new URL('./', import.meta.url));

interface ExternalLibDefinition {
  importName?: string;
  globalName?: string;
  src: string;
  dest: string;
}

interface ExternalLibConfig {
  copyTargets: { src: string; dest: string }[];
  htmlTags: HtmlTagDescriptor[];
  externals: Record<string, string>;
}

const toPosixPath = (value: string) => value.replace(/\\/g, '/');

const resolveProjectPath = (relativePath: string) => path.resolve(projectRoot, relativePath);

function createLibExternalConfig(isProd: boolean): ExternalLibConfig {
  const suffix = isProd ? '.prod' : '';
  const libDefinitions: ExternalLibDefinition[] = [
    {
      importName: 'vue',
      globalName: 'Vue',
      src: `node_modules/vue/dist/vue.global${suffix}.js`,
      dest: 'assets/lib/vue'
    },
    {
      src: 'node_modules/@vueuse/shared/dist/index.iife.min.js',
      dest: 'assets/lib/vueuse/shared'
    },
    {
      importName: '@vueuse/core',
      globalName: 'VueUse',
      src: 'node_modules/@vueuse/core/dist/index.iife.min.js',
      dest: 'assets/lib/vueuse/core'
    },
    {
      importName: 'vue-router',
      globalName: 'VueRouter',
      src: `node_modules/vue-router/dist/vue-router.global${suffix}.js`,
      dest: 'assets/lib/vue-router'
    },
    {
      importName: 'pinia',
      globalName: 'Pinia',
      src: `node_modules/pinia/dist/pinia.iife${suffix}.js`,
      dest: 'assets/lib/pinia'
    },
    {
      importName: 'axios',
      globalName: 'axios',
      src: 'node_modules/axios/dist/axios.min.js',
      dest: 'assets/lib/axios'
    }
  ];

  const copyTargets: ExternalLibConfig['copyTargets'] = [];
  const htmlTags: ExternalLibConfig['htmlTags'] = [];
  const externals: ExternalLibConfig['externals'] = {};

  libDefinitions.forEach(lib => {
    const absSrc = resolveProjectPath(lib.src);
    if (!existsSync(absSrc)) return;

    const normalizedSrc = `./${toPosixPath(lib.src)}`;
    copyTargets.push({
      src: normalizedSrc,
      dest: lib.dest
    });

    const fileName = path.basename(lib.src);
    htmlTags.push({
      injectTo: 'head',
      tag: 'script',
      attrs: {
        src: `/${toPosixPath(`${lib.dest}/${fileName}`)}`,
        type: 'text/javascript'
      }
    });

    if (lib.importName && lib.globalName) {
      externals[lib.importName] = lib.globalName;
    }
  });

  const axiosMapPath = 'node_modules/axios/dist/axios.min.js.map';
  if (existsSync(resolveProjectPath(axiosMapPath))) {
    copyTargets.push({
      src: `./${toPosixPath(axiosMapPath)}`,
      dest: 'assets/lib/axios'
    });
  }

  return { copyTargets, htmlTags, externals };
}

export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as Env.ImportMeta;

  const buildTime = getBuildTime();

  const enableProxy = configEnv.command === 'serve' && !configEnv.isPreview;

  const isBuild = configEnv.command === 'build';
  const isProd = configEnv.command === 'build' || ['prod', 'production'].includes(configEnv.mode);

  const htmlData = {
    title: viteEnv.VITE_APP_TITLE
  };

  const pluginOptions: Parameters<typeof setupVitePlugins>[2] = {
    htmlData
  };

  if (isBuild) {
    const externalLibConfig = createLibExternalConfig(isProd);
    if (externalLibConfig.htmlTags.length) {
      pluginOptions.htmlTags = externalLibConfig.htmlTags;
    }
    if (externalLibConfig.copyTargets.length) {
      pluginOptions.copyTargets = externalLibConfig.copyTargets;
    }
    if (Object.keys(externalLibConfig.externals).length > 0) {
      pluginOptions.externals = externalLibConfig.externals;
    }
  }

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "@/styles/scss/global.scss" as *;`
        }
      }
    },
    plugins: setupVitePlugins(viteEnv, buildTime, pluginOptions),
    define: {
      BUILD_TIME: JSON.stringify(buildTime)
    },
    server: {
      host: '0.0.0.0',
      port: 9527,
      open: true,
      proxy: createViteProxy(viteEnv, enableProxy)
    },
    preview: {
      port: 9725
    },
    build: {
      reportCompressedSize: false,
      sourcemap: viteEnv.VITE_SOURCE_MAP === 'Y',
      commonjsOptions: {
        ignoreTryCatch: false
      }
    }
  };
});
