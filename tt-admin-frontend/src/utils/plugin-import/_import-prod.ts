import type { PluginModuleInfo } from './types';

export default (moduleInfo: PluginModuleInfo, name: string) => {
  if (moduleInfo.pluginId && moduleInfo.pluginIsDev && moduleInfo.frontDevAddress) {
    return import(
      /* @vite-ignore */ `${moduleInfo.frontDevAddress}/plugin/${moduleInfo.pluginId}/src/modules/${name}/index.js`
    );
  }
  if (moduleInfo.pluginId) {
    return import(
      /* @vite-ignore */ `/api/plugin-static/${moduleInfo.pluginId}/modules/${name}/index.js`
    );
  }
  return import(/* @vite-ignore */ `/modules/${name}/index.js`);
};
