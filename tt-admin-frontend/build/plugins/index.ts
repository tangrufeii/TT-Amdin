import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import progress from 'vite-plugin-progress';
import { viteExternalsPlugin } from 'vite-plugin-externals';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { setupElegantRouter } from './router';
import { setupUnocss } from './unocss';
import { setupUnplugin } from './unplugin';
import { setupHtmlPlugin, type HtmlPluginInjectOptions } from './html';
import { setupDevtoolsPlugin } from './devtools';

interface ExtraPluginOptions {
  copyTargets?: { src: string; dest: string }[];
  htmlTags?: HtmlPluginInjectOptions['tags'];
  htmlData?: HtmlPluginInjectOptions['data'];
  externals?: Record<string, string>;
}

export function setupVitePlugins(viteEnv: Env.ImportMeta, buildTime: string, options?: ExtraPluginOptions) {
  const plugins: PluginOption = [
    vue(),
    vueJsx(),
    setupDevtoolsPlugin(viteEnv),
    setupElegantRouter(),
    setupUnocss(viteEnv),
    ...setupUnplugin(viteEnv),
    progress(),
    setupHtmlPlugin(buildTime, {
      tags: options?.htmlTags,
      data: options?.htmlData
    })
  ];

  if (options?.externals && Object.keys(options.externals).length > 0) {
    plugins.push(viteExternalsPlugin(options.externals));
  }

  if (options?.copyTargets?.length) {
    plugins.push(
      viteStaticCopy({
        targets: options.copyTargets
      })
    );
  }

  return plugins;
}
