package com.tt.domain.plugin.model.frontend;

import lombok.Data;

/**
 * 插件前端路由定义
 */
@Data
public class PluginFrontendRouteDefinition {

    /**
     * 路由唯一名称
     */
    private String name;

    /**
     * 路由路径
     */
    private String path;

    /**
     * 对应模块中的组件路径（例如 /view/PluginDemoView）
     */
    private String component;

    /**
     * 组件名称（用于 keepAlive）
     */
    private String componentName;

    /**
     * 元信息
     */
    private PluginFrontendRouteMeta meta;
}
