import type { PluginModuleInfo } from './types';

type HmrMode = 'host' | 'external' | 'static';

const localModuleMap = import.meta.glob('../modules/**/index.{ts,tsx,js,jsx}');
const resolveLocalModule = (name: string) => {
  const base = `../modules/${name}/index`;
  const candidates = [`${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.jsx`];
  for (const candidate of candidates) {
    const loader = localModuleMap[candidate] as (() => Promise<any>) | undefined;
    if (loader) return loader();
  }
  return Promise.reject(new Error(`Local module not found: ${name}`));
};

export default (moduleInfo: PluginModuleInfo, name: string) => {
  const timeout = 3000;
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Import timed out')), timeout)
  );

  const setHmrMode = (mode: HmrMode) => {
    if (typeof window !== 'undefined') {
      (window as any).__TT_PLUGIN_HMR_MODE__ = mode;
    }
  };

  const tryImport = (base: string, mode: HmrMode) =>
    import(/* @vite-ignore */ `${base}.ts`)
      .then(mod => {
        setHmrMode(mode);
        return mod;
      })
      .catch(() => import(/* @vite-ignore */ `${base}.tsx`).then(mod => {
        setHmrMode(mode);
        return mod;
      }))
      .catch(() => import(/* @vite-ignore */ `${base}.js`).then(mod => {
        setHmrMode(mode);
        return mod;
      }))
      .catch(() => import(/* @vite-ignore */ `${base}.jsx`).then(mod => {
        setHmrMode(mode);
        return mod;
      }));

  let importPromise: Promise<any>;
  if (moduleInfo.pluginId && moduleInfo.pluginIsDev) {
    // Prefer host Vite (plugin-dev) and fall back to external dev server or static assets.
    const localBase = `/plugin-dev/${moduleInfo.pluginId}/src/modules/${name}/index`;
    const remoteBaseWithPrefix = moduleInfo.frontDevAddress
      ? `${moduleInfo.frontDevAddress}/plugin/${moduleInfo.pluginId}/src/modules/${name}/index`
      : '';
    const remoteBase = moduleInfo.frontDevAddress ? `${moduleInfo.frontDevAddress}/src/modules/${name}/index` : '';

    importPromise = tryImport(localBase, 'host')
      .catch(() => (remoteBaseWithPrefix ? tryImport(remoteBaseWithPrefix, 'external') : Promise.reject()))
      .catch(() => (remoteBase ? tryImport(remoteBase, 'external') : Promise.reject()))
      .catch(() => {
        const version = moduleInfo.pluginVersion ? encodeURIComponent(moduleInfo.pluginVersion) : '';
        const suffix = version ? `?v=${version}` : '';
        setHmrMode('static');
        return import(
          /* @vite-ignore */ `/api/plugin-static/${moduleInfo.pluginId}/modules/${name}/index.js${suffix}`
        );
      });
  } else if (moduleInfo.pluginId) {
    // Production loads from backend static resources.
    const version = moduleInfo.pluginVersion ? encodeURIComponent(moduleInfo.pluginVersion) : '';
    const suffix = version ? `?v=${version}` : '';
    setHmrMode('static');
    importPromise = import(
      /* @vite-ignore */ `/api/plugin-static/${moduleInfo.pluginId}/modules/${name}/index.js${suffix}`
    );
  } else {
    setHmrMode('static');
    importPromise = resolveLocalModule(name);
  }

  return Promise.race([importPromise, timeoutPromise]);
};
