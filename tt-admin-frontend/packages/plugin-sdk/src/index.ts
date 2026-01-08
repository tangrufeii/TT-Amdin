import type { Component } from 'vue';

export interface PluginModuleHooks {
  onLoad?: () => void | Promise<void>;
  onUnload?: () => void | Promise<void>;
}

export interface DefinePluginModuleOptions {
  component: Component;
  hooks?: PluginModuleHooks;
}

export interface PluginModule {
  component: Component;
  hooks?: PluginModuleHooks;
  createComponent: () => Component;
}

export function definePluginModule(options: DefinePluginModuleOptions): PluginModule {
  return {
    component: options.component,
    hooks: options.hooks,
    createComponent: () => options.component
  };
}

export interface HostMessage<T = unknown> {
  pluginId: string;
  type: string;
  data?: T;
}

export function postHostMessage<T = unknown>(message: HostMessage<T>) {
  if (typeof window === 'undefined') return;
  const parentWindow = window.parent && window.parent !== window ? window.parent : window;
  parentWindow.postMessage(message, '*');
  if (window.top && window.top !== parentWindow) {
    window.top.postMessage(message, '*');
  }
}
