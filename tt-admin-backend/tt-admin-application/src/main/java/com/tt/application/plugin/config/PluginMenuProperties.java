package com.tt.application.plugin.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "plugin.menu")
public class PluginMenuProperties {

    /**
     * 是否把未声明父级的插件菜单收拢到统一插件根菜单
     */
    private Boolean rootEnabled = false;

    /**
     * 插件根菜单名称
     */
    private String rootName = "Plugin";

    /**
     * 插件根菜单 i18n key
     */
    private String rootI18nKey = "route.pluginRoot";

    /**
     * 插件根菜单图标
     */
    private String rootIcon = "mdi:puzzle-outline";

    /**
     * 插件根菜单父级ID（可选）
     */
    private Long rootParentId;

    /**
     * 插件根菜单父级路由名称（可选）
     */
    private String rootParentRouteName;
}
