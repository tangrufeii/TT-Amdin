package com.tt.application.portal.dto;

import lombok.Data;

/**
 * 当前门户主题 DTO
 */
@Data
public class PortalThemeCurrentDTO {

    /**
     * 主题键
     */
    private String themeKey;

    /**
     * 主题标题
     */
    private String title;

    /**
     * 主题描述
     */
    private String description;

    /**
     * 当前主题门户入口地址
     */
    private String portalPageUrl;

    /**
     * 当前主题默认配置 JSON 地址
     */
    private String configUrl;
}
