package com.tt.domain.plugin.model.frontend;

import lombok.Data;

/**
 * 插件前端菜单定义
 */
@Data
public class PluginFrontendMenuDefinition {

    /**
     * 绑定的路由名称
     */
    private String routeName;

    /**
     * 父级菜单 key
     */
    private String parent;

    /**
     * 菜单标题（可选，默认路由meta.title）
     */
    private String title;

    /**
     * 国际化 key（可选）
     */
    private String i18nKey;

    /**
     * 菜单 icon（可选）
     */
    private String icon;

    /**
     * 菜单排序（可选）
     */
    private Integer order;
}
