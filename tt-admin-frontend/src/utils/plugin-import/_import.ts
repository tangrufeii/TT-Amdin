import type { PluginModuleLoader, PluginModuleInfo } from './types';

export default async function importPluginModule(moduleInfo: PluginModuleInfo, moduleName: string) {
  if (import.meta.env.DEV) {
    const importer = await import('./_import-dev');
    const perfreeModule = await importer.default(moduleInfo, moduleName);
    return perfreeModule.default ? perfreeModule.default() : perfreeModule;
  }
  const importer = await import('./_import-prod');
  const perfreeModule = await importer.default(moduleInfo, moduleName);
  return perfreeModule.default ? perfreeModule.default() : perfreeModule;
}

export type { PluginModuleLoader, PluginModuleInfo } from './types';
