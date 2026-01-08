package com.tt.domain.plugin.model.frontend;

import lombok.Data;

/**
 * 插件前端路由元信息
 */
@Data
public class PluginFrontendRouteMeta {

    private String title;

    private String i18nKey;

    private String icon;

    private Integer order;

    private Boolean hideInMenu;

    private Boolean keepAlive;

    private Boolean constant;

    private String activeMenu;

    /**
     * 布局类型：base / blank
     */
    private String layout;
}
