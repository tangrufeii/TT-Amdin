import process from 'node:process';
import { existsSync, readdirSync, statSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import type { HtmlTagDescriptor } from 'vite';
import { transform as esbuildTransform } from 'esbuild';
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

type PluginDevSourceMap = Record<string, string>;

function parseSimpleYaml(filePath: string) {
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const result: Record<string, Record<string, string>> = {};
  let currentSection: string | undefined;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    const isSection = !line.startsWith(' ') && trimmed.endsWith(':');
    if (isSection) {
      const sectionName = trimmed.slice(0, -1);
      currentSection = sectionName;
      result[currentSection] = {};
      return;
    }

    if (currentSection && trimmed.includes(':')) {
      const [key, ...rest] = trimmed.split(':');
      result[currentSection][key.trim()] = rest.join(':').trim();
    }
  });

  return result;
}

function collectPluginDevSources(pluginRoot = resolveProjectPath('../tt-admin-backend/tt-admin-plugins')): PluginDevSourceMap {
  if (!existsSync(pluginRoot)) return {};

  const entries = readdirSync(pluginRoot, { withFileTypes: true });
  const map: PluginDevSourceMap = {};

  entries.forEach(entry => {
    if (!entry.isDirectory()) return;
    const pluginDir = path.join(pluginRoot, entry.name);
    const pluginYamlPath = path.join(pluginDir, 'src/main/resources/plugin.yaml');
    const uiRoot = path.join(pluginDir, 'ui');

    if (!existsSync(pluginYamlPath) || !existsSync(uiRoot)) return;

    const yaml = parseSimpleYaml(pluginYamlPath);
    const pluginId = yaml.plugin?.id;
    if (pluginId) {
      map[pluginId] = uiRoot;
    }
  });

  return map;
}

function resolvePluginUiSourceById(pluginRoot: string, pluginId: string) {
  if (!pluginId || !existsSync(pluginRoot)) return '';

  const entries = readdirSync(pluginRoot, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const pluginDir = path.join(pluginRoot, entry.name);
    const pluginYamlPath = path.join(pluginDir, 'src/main/resources/plugin.yaml');
    const uiRoot = path.join(pluginDir, 'ui');

    if (!existsSync(pluginYamlPath) || !existsSync(uiRoot)) continue;

    const yaml = parseSimpleYaml(pluginYamlPath);
    if (yaml.plugin?.id === pluginId) {
      return uiRoot;
    }
  }

  return '';
}

function createPluginDevSourcePlugin(pluginSources: PluginDevSourceMap, pluginRoot: string) {
  const prefix = '/plugin-dev/';
  const sourceRoots = [pluginRoot, ...Object.values(pluginSources)].map(source => toPosixPath(source));

  return {
    name: 'plugin-dev-source',
    enforce: 'pre' as const,
    configResolved(config: any) {
      if (!config.server) return;
      const allowList = config.server.fs?.allow ?? [];
      const merged = [...allowList, ...sourceRoots].filter(Boolean);
      config.server.fs = { ...(config.server.fs || {}), allow: merged };
    },
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        const url = req.url || '';
        if (!url.startsWith(prefix)) return next();

        const [pathPart, queryPart] = url.split('?');
        const segments = pathPart.split('/').filter(Boolean);
        if (segments.length < 3) return next();

        const pluginId = segments[1];
        const relativePath = segments.slice(2).join('/');
        let sourceRoot = pluginSources[pluginId];
        if (!sourceRoot) {
          sourceRoot = resolvePluginUiSourceById(pluginRoot, pluginId);
          if (sourceRoot) {
            pluginSources[pluginId] = sourceRoot;
          }
        }

        if (!sourceRoot) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
          res.end(
            `throw new Error('[plugin-dev] Source for plugin ${pluginId} not found. Please check plugin.yaml id or restart host dev server.');`
          );
          return;
        }

        const fsPath = `/@fs/${toPosixPath(path.join(sourceRoot, relativePath))}`;
        req.url = queryPart ? `${fsPath}?${queryPart}` : fsPath;
        next();
      });
    }
  };
}

function createPluginDevReactEsbuildPlugin() {
  const reactTsxRE = /[\\/]tt-admin-backend[\\/]tt-admin-plugins[\\/].*react.*[\\/]ui[\\/]src[\\/]modules[\\/].*\.[jt]sx($|\?)/;

  return {
    name: 'plugin-dev-react-esbuild',
    async transform(code: string, id: string) {
      if (!reactTsxRE.test(id)) {
        return null;
      }

      const loader = id.includes('.tsx') ? 'tsx' : 'jsx';
      const result = await esbuildTransform(code, {
        loader,
        jsx: 'automatic',
        jsxImportSource: 'react',
        sourcefile: id,
        sourcemap: true,
        format: 'esm',
        target: 'es2020'
      });

      return {
        code: result.code,
        map: result.map
      };
    }
  };
}

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

  const enablePluginDevSource = configEnv.command === 'serve' && viteEnv.VITE_PLUGIN_DEV_SOURCE !== 'N';
  const pluginDevRoot = resolveProjectPath('../tt-admin-backend/tt-admin-plugins');
  const pluginDevSources =
    configEnv.command === 'serve' && enablePluginDevSource ? collectPluginDevSources(pluginDevRoot) : {};
  const pluginDevSourcePlugin =
    configEnv.command === 'serve' && enablePluginDevSource
      ? createPluginDevSourcePlugin(pluginDevSources, pluginDevRoot)
      : null;
  const pluginDevReactPlugin =
    configEnv.command === 'serve' && enablePluginDevSource ? createPluginDevReactEsbuildPlugin() : null;

  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue-demi': fileURLToPath(new URL('./src/shims/vue-demi.ts', import.meta.url)),
        vscode: fileURLToPath(new URL('./src/shims/vscode.ts', import.meta.url))
      }
    },
    optimizeDeps: {
      exclude: [
        'monaco-languageclient',
        'vscode-ws-jsonrpc',
        'vscode-jsonrpc',
        'vscode-languageclient'
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "@/styles/scss/global.scss" as *;`
        }
      }
    },
    plugins: [
      ...setupVitePlugins(viteEnv, buildTime, pluginOptions),
      ...(pluginDevSourcePlugin ? [pluginDevSourcePlugin] : []),
      ...(pluginDevReactPlugin ? [pluginDevReactPlugin] : [])
    ],
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
