import path from 'node:path';
import { defineConfig } from '@unocss/vite';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import presetWind3 from '@unocss/preset-wind3';
import type { Theme } from '@unocss/preset-uno';
import { presetSoybeanAdmin } from '@sa/uno-preset';
import { themeVars } from '../../../../tt-admin-frontend/src/theme/vars';

const pluginUiGlob = `${path.resolve(__dirname, '../../../../tt-admin-frontend/packages/plugin-ui/src')}/**/*.{vue,ts,tsx,js,jsx}`;
const pluginAppGlob = `${path.resolve(__dirname, './src')}/**/*.{vue,ts,tsx,js,jsx}`;

export default defineConfig<Theme>({
  content: {
    pipeline: {
      include: [pluginUiGlob, pluginAppGlob],
      exclude: ['node_modules', 'dist']
    }
  },
  theme: {
    ...themeVars,
    fontSize: {
      'icon-xs': '0.875rem',
      'icon-small': '1rem',
      icon: '1.125rem',
      'icon-large': '1.5rem',
      'icon-xl': '2rem'
    }
  },
  shortcuts: {
    'card-wrapper': 'rd-8px shadow-sm'
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
  presets: [presetWind3({ dark: 'class' }), presetSoybeanAdmin()]
});
