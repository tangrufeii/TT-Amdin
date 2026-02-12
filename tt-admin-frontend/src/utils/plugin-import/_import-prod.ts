import type { PluginModuleInfo } from './types';

const pluginDevEnabled = import.meta.env.DEV && import.meta.env.VITE_PLUGIN_DEV_SOURCE === 'Y';

export default (moduleInfo: PluginModuleInfo, name: string) => {
  if (moduleInfo.pluginId && moduleInfo.pluginIsDev && pluginDevEnabled && moduleInfo.frontDevAddress) {
    return import(
      /* @vite-ignore */ `${moduleInfo.frontDevAddress}/plugin/${moduleInfo.pluginId}/src/modules/${name}/index.js`
    );
  }
  if (moduleInfo.pluginId) {
    const version = moduleInfo.pluginVersion ? encodeURIComponent(moduleInfo.pluginVersion) : '';
    const suffix = version ? `?v=${version}` : '';
    return import(
      /* @vite-ignore */ `/api/plugin-static/${moduleInfo.pluginId}/modules/${name}/index.js${suffix}`
    );
  }
  return import(/* @vite-ignore */ `/modules/${name}/index.js`);
};
