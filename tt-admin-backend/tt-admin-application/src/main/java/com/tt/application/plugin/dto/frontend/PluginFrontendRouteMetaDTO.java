package com.tt.application.plugin.dto.frontend;

import lombok.Data;

/**
 * 插件前端路由 Meta DTO
 */
@Data
public class PluginFrontendRouteMetaDTO {

    private String title;

    private String i18nKey;

    private String icon;

    private Integer order;

    private Boolean hideInMenu;

    private Boolean keepAlive;

    private Boolean constant;

    private String activeMenu;

    private String layout;
}
