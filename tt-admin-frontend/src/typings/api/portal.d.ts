declare namespace Api {
  namespace Portal {
    interface PortalRuntime {
      currentTheme: PortalThemeCurrent;
      renderer?: string;
      tabs: PortalRuntimeTab[];
    }

    interface PortalRuntimeTab {
      key: string;
      title: string;
      routeName?: string;
      icon?: string;
      order: number;
    }

    interface PortalThemeCurrent {
      themeKey: string;
      title: string;
      description?: string;
      portalPageUrl?: string;
      configUrl?: string;
    }

    interface PortalThemeOption {
      themeKey: string;
      /** 插件管理记录ID，仅插件型主题存在，可用于停用或卸载。 */
      pluginRecordId?: number;
      /** 插件是否启用，仅插件型主题存在；启用状态需要先停用再卸载。 */
      pluginEnabled?: boolean;
      title: string;
      description?: string;
      active: boolean;
      portalPageUrl?: string;
    }

    interface FileThemeSummary {
      key: string;
      title: string;
      description?: string;
      active: boolean;
      order: number;
      pages: Record<string, string>;
    }

    interface FileThemeDefinition {
      id: string;
      title: string;
      description?: string;
      active?: boolean;
      order?: number;
      pages: Record<string, string>;
    }
  }
}
