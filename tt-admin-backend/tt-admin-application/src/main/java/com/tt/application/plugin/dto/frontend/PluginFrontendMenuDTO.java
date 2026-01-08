package com.tt.application.plugin.dto.frontend;

import lombok.Data;

/**
 * 插件前端菜单 DTO
 */
@Data
public class PluginFrontendMenuDTO {

    private String routeName;

    private String parent;

    private String title;

    private String i18nKey;

    private String icon;

    private Integer order;
}
