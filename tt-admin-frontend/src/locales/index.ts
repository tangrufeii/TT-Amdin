import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import { localStg } from '@/utils/storage';
import messages from './locale';

const i18n = createI18n({
  locale: localStg.get('lang') || 'zh-CN',
  fallbackLocale: 'en',
  messages,
  legacy: false
});

/**
 * Setup plugin i18n
 *
 * @param app
 */
export function setupI18n(app: App) {
  app.use(i18n);
}

export const $t = i18n.global.t as App.I18n.$T;

export function setLocale(locale: App.I18n.LangType) {
  i18n.global.locale.value = locale;
}

export function mergeLocaleMessages(locale: string, messages: Record<string, any>) {
  if (!messages || typeof messages !== 'object') return;
  i18n.global.mergeLocaleMessage(locale as App.I18n.LangType, messages);
}

export function hasLocaleMessage(key: string, locale?: string) {
  if (!key) return false;
  return i18n.global.te(key as never, locale as never);
}
