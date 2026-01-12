/**
 * 插件管理相关类型定义
 */
declare namespace Api {
  namespace Plugin {
    /**
     * 插件管理信息
     */
    interface PluginManagement {
      /** 主键ID */
      id: number;
      /** 插件ID（唯一标识） */
      pluginId: string;
      /** 插件名称 */
      name: string;
      /** 插件描述 */
      description: string;
      /** 版本号 */
      version: string;
      /** 作者 */
      author: string;
      /** 官方网址 */
      website: string;
      /** 联系邮箱 */
      email: string;
      /** 是否为开发环境插件 */
      isDev: boolean;
      /** 开发环境前端���址 */
      frontDevAddress: string;
      /** 插件状态：0-禁用，1-启用 */
      status: number;
      /** 状态描述 */
      statusDesc: string;
      /** 创建时间 */
      createTime: string;
      /** 更新时间 */
      updateTime: string;
      /** 创建人ID */
      createUserId: number;
      /** 更新人ID */
      updateUserId: number;
    }

    /**
     * 插件统计信息
     */
    interface PluginStatistics {
      /** 插件总数 */
      total: number;
      /** 启用数量 */
      enabledCount: number;
      /** 禁用数量 */
      disabledCount: number;
    }

    /**
     * 插件分页查询参数
     */
    interface PluginPageQuery {
      /** 当前页码 */
      page: number;
      /** 每页显示数量 */
      pageSize: number;
      /** 插件名称（模糊查询） */
      name?: string;
      /** 插件状���：0-禁用，1-启用 */
      status?: number;
    }

    /**
     * 插件分页查询结果
     */
    type PluginPageResult = Common.PaginatingQueryRecord<PluginManagement>;

    /**
     * 创建插件参数
     */
    interface PluginCreate {
      /** 插件ID（唯一标识） */
      pluginId: string;
      /** 插件名称 */
      name: string;
      /** 插件描述 */
      description?: string;
      /** 版本号 */
      version?: string;
      /** 作者 */
      author?: string;
      /** 联系邮箱 */
      email?: string;
      /** 官方网址 */
      website?: string;
    }

    /**
     * 更新插件参数
     */
    interface PluginUpdate {
      /** 插件主键ID */
      id: number;
      /** 插件名称 */
      name?: string;
      /** 插件描述 */
      description?: string;
      /** 版本号 */
      version?: string;
      /** 作者 */
      author?: string;
      /** 联系邮箱 */
      email?: string;
      /** 官方网址 */
      website?: string;
      /** 是否为开发环境插件 */
      isDev?: boolean;
      /** 开发环境前端地址 */
      frontDevAddress?: string;
    }

    /**
     * 插件状态变更参数
     */
    interface PluginFrontendRouteMeta {
      title?: string;
      i18nKey?: string;
      icon?: string;
      order?: number;
      hideInMenu?: boolean;
      keepAlive?: boolean;
      constant?: boolean;
      activeMenu?: string;
      layout?: string;
    }

    interface PluginFrontendRoute {
      name: string;
      path: string;
      component: string;
      componentName?: string;
      meta?: PluginFrontendRouteMeta;
    }

    interface PluginFrontendMenu {
      routeName: string;
      parent?: string;
      title?: string;
      i18nKey?: string;
      icon?: string;
      order?: number;
    }

    interface PluginFrontendModule {
      moduleName: string;
      pluginId: string;
      pluginName?: string;
      pluginVersion?: string;
      pluginIsDev?: boolean;
      frontDevAddress?: string;
      routes?: PluginFrontendRoute[];
      menus?: PluginFrontendMenu[];
      i18n?: Record<string, string>;
    }

    interface PluginStatusChange {
      /** 插件主键ID */
      id: number;
      /** 目标状态：0-禁用，1-启用 */
      status: number;
    }
  }
}
