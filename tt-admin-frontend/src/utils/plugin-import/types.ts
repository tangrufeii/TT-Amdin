import type { RouteRecordRaw } from 'vue-router';

export interface PluginModuleInfo {
  moduleName: string;
  pluginId?: string;
  pluginVersion?: string;
  pluginIsDev?: boolean;
  frontDevAddress?: string;
}

export interface PluginModuleLoader {
  router: (menusRouter: any[], moduleName: string) => RouteRecordRaw[];
}
