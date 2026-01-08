package com.tt.domain.plugin.model.frontend;

import lombok.Data;

import java.util.List;

/**
 * 插件前端模块定义
 */
@Data
public class PluginFrontendModuleDefinition {

    /**
     * 模块名称（对应前端 modules 目录）
     */
    private String moduleName;

    /**
     * 模块内路由集合
     */
    private List<PluginFrontendRouteDefinition> routes;
}
