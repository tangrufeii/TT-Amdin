package com.tt.application.plugin.dto.frontend;

import lombok.Data;

/**
 * 插件前端路由 DTO
 */
@Data
public class PluginFrontendRouteDTO {

    private String name;

    private String path;

    /**
     * 模块内组件路径（如 /view/PluginDemoView）
     */
    private String component;

    /**
     * 组件名称（用于 keepAlive 等）
     */
    private String componentName;

    private PluginFrontendRouteMetaDTO meta;
}
