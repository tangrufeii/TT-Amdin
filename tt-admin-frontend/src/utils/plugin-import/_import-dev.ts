import type { PluginModuleInfo } from './types';

export default (moduleInfo: PluginModuleInfo, name: string) => {
  const timeout = 3000;
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Import timed out')), timeout)
  );

  const tryImport = (base: string) =>
    import(/* @vite-ignore */ `${base}.ts`)
      .catch(() => import(/* @vite-ignore */ `${base}.tsx`))
      .catch(() => import(/* @vite-ignore */ `${base}.js`))
      .catch(() => import(/* @vite-ignore */ `${base}.jsx`));

  let importPromise: Promise<any>;
  if (moduleInfo.pluginId && moduleInfo.pluginIsDev) {
    // 优先从宿主 dev server 读取本地插件源码（/plugin-dev/<id>）。
    const localBase = `/plugin-dev/${moduleInfo.pluginId}/src/modules/${name}/index`;
    const remoteBaseWithPrefix = moduleInfo.frontDevAddress
      ? `${moduleInfo.frontDevAddress}/plugin/${moduleInfo.pluginId}/src/modules/${name}/index`
      : '';
    const remoteBase = moduleInfo.frontDevAddress ? `${moduleInfo.frontDevAddress}/src/modules/${name}/index` : '';

    importPromise = tryImport(localBase)
      .catch(() => (remoteBaseWithPrefix ? tryImport(remoteBaseWithPrefix) : Promise.reject()))
      .catch(() => (remoteBase ? tryImport(remoteBase) : Promise.reject()))
      .catch(() => {
        const version = moduleInfo.pluginVersion ? encodeURIComponent(moduleInfo.pluginVersion) : '';
        const suffix = version ? `?v=${version}` : '';
        return import(
          /* @vite-ignore */ `/api/plugin-static/${moduleInfo.pluginId}/modules/${name}/index.js${suffix}`
        );
      });
  } else if (moduleInfo.pluginId) {
    // 生产态固定从后端静态资源加载。
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
