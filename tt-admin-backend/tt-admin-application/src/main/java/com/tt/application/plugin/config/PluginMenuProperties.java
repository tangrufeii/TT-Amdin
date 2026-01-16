package com.tt.application.plugin.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "plugin.menu")
public class PluginMenuProperties {

    /**
     * 插件根菜单名称
     */
    private String rootName = "插件";

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
