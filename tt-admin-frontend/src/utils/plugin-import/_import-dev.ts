import type { PluginModuleInfo } from './types';

export default (moduleInfo: PluginModuleInfo, name: string) => {
  const timeout = 3000;
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Import timed out')), timeout)
  );

  let importPromise: Promise<any>;
  if (moduleInfo.pluginId && moduleInfo.pluginIsDev && moduleInfo.frontDevAddress) {
    // 开发态优先从插件 dev 服务直连模块源码。
    // 有的插件挂载在 /plugin/<id>，有的直接从根路径提供，所以两种都尝试。
    const withBase = `${moduleInfo.frontDevAddress}/plugin/${moduleInfo.pluginId}/src/modules/${name}/index`;
    const withoutBase = `${moduleInfo.frontDevAddress}/src/modules/${name}/index`;
    const tryImport = (base: string) =>
      // 按优先级尝试常见入口扩展名。
      import(/* @vite-ignore */ `${base}.ts`)
        .catch(() => import(/* @vite-ignore */ `${base}.tsx`))
        .catch(() => import(/* @vite-ignore */ `${base}.js`))
        .catch(() => import(/* @vite-ignore */ `${base}.jsx`));
    importPromise = tryImport(withBase)
      .catch(() => tryImport(withoutBase))
      .catch(() => {
        // 最终兜底：使用后端静态资源的打包产物。
        const version = moduleInfo.pluginVersion ? encodeURIComponent(moduleInfo.pluginVersion) : '';
        const suffix = version ? `?v=${version}` : '';
        return import(
          /* @vite-ignore */ `/api/plugin-static/${moduleInfo.pluginId}/modules/${name}/index.js${suffix}`
        );
      });
  } else if (moduleInfo.pluginId) {
    // 生产态固定从打包产物加载。
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
