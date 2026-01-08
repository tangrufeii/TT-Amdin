package com.tt.domain.plugin.model.frontend;

import lombok.Data;

import java.util.List;
import java.util.Map;

/**
 * 插件前端渲染配置
 */
@Data
public class PluginFrontendDefinition {

    /**
     * 渲染模式：web-component / iframe
     */
    private String renderer;

    /**
     * 模块定义集合
     */
    private List<PluginFrontendModuleDefinition> modules;

    /**
     * 菜单定义集合
     */
    private List<PluginFrontendMenuDefinition> menus;

    /**
     * 语言配置，locale -> 对应资源路径
     */
    private Map<String, String> i18n;
}
