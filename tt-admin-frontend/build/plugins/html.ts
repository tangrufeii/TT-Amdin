
import type { HtmlTagDescriptor } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export interface HtmlPluginInjectOptions {
  tags?: HtmlTagDescriptor[];
  data?: Record<string, unknown>;
}

export function setupHtmlPlugin(buildTime: string, options?: HtmlPluginInjectOptions) {
  return createHtmlPlugin({
    minify: false,
    template: 'index.html',
    inject: {
      tags: [
        {
          injectTo: 'head',
          tag: 'meta',
          attrs: {
            name: 'buildTime',
            content: buildTime
          }
        },
        ...(options?.tags ?? [])
      ],
      data: {
        ...(options?.data ?? {})
      }
    }
  });
}
