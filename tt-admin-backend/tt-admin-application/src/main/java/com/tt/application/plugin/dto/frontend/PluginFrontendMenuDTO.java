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

    /**
     * 图标类型：1-iconify 2-local
     */
    private String iconType;

    private Integer order;
}
