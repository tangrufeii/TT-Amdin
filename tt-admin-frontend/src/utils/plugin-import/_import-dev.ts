import type { PluginModuleInfo } from './types';

export default (moduleInfo: PluginModuleInfo, name: string) => {
  const timeout = 3000;
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Import timed out')), timeout)
  );

  let importPromise: Promise<any>;
  if (moduleInfo.pluginId && moduleInfo.pluginIsDev && moduleInfo.frontDevAddress) {
    importPromise = import(
      /* @vite-ignore */ `${moduleInfo.frontDevAddress}/plugin/${moduleInfo.pluginId}/src/modules/${name}/index.js`
    );
  } else if (moduleInfo.pluginId) {
    const version = moduleInfo.pluginVersion ? encodeURIComponent(moduleInfo.pluginVersion) : '';
    const suffix = version ? `?v=${version}` : '';
    importPromise = import(
      /* @vite-ignore */ `/api/plugin-static/${moduleInfo.pluginId}/modules/${name}/index.js${suffix}`
    );
  } else {
    importPromise = import(/* @vite-ignore */ `../modules/${name}/index.js`);
  }

  return Promise.race([importPromise, timeoutPromise]);
};
