import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import * as Pinia from 'pinia';
import axios from 'axios';
import * as VueUse from '@vueuse/core';
import './plugins/assets';
import { setupAppVersionNotification, setupDayjs, setupIconifyOffline, setupLoading, setupNProgress } from './plugins';
import { setupPluginMessageBridge } from './plugins/plugin-message';
import { setupStore } from './store';
import { setupRouter } from './router';
import { setupI18n } from './locales';
import App from './App.vue';
import { useAppStore } from '@/store/modules/app';
import { useRouteStore } from '@/store/modules/route';

const { createApp } = Vue;

type PluginHostWindow = typeof window & {
  Vue?: typeof Vue;
  VueRouter?: typeof VueRouter;
  Pinia?: typeof Pinia;
  axios?: typeof axios;
  VueUse?: typeof VueUse;
  __TT_PLUGIN_API_BASE__?: string;
};

function exposePluginGlobals() {
  const globalWindow = window as PluginHostWindow;
  if (!globalWindow.Vue) globalWindow.Vue = Vue;
  if (!globalWindow.VueRouter) globalWindow.VueRouter = VueRouter;
  if (!globalWindow.Pinia) globalWindow.Pinia = Pinia;
  if (!globalWindow.axios) globalWindow.axios = axios;
  if (!globalWindow.VueUse) globalWindow.VueUse = VueUse;
  if (!globalWindow.__TT_PLUGIN_API_BASE__) {
    globalWindow.__TT_PLUGIN_API_BASE__ = import.meta.env.DEV ? '/proxy-default' : '';
  }
}

exposePluginGlobals();

async function setupApp() {
  setupLoading();

  setupNProgress();

  setupIconifyOffline();

  setupDayjs();

  const app = createApp(App);

  setupStore(app);

  await setupRouter(app);

  setupI18n(app);

  setupAppVersionNotification();

  setupPluginMessageBridge();

  app.mount('#app');
}

setupApp();
