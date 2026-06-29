package com.tt.application.portal.dto;

import lombok.Data;

/**
 * 门户主题选项 DTO
 */
@Data
public class PortalThemeOptionDTO {

    /**
     * 主题键
     */
    private String themeKey;

    /**
     * 兼容旧主题接口的插件管理记录ID，文件化主题不再赋值。
     */
    private Long pluginRecordId;

    /**
     * 兼容旧主题接口的插件启用状态，文件化主题不再赋值。
     */
    private Boolean pluginEnabled;

    /**
     * 主题标题
     */
    private String title;

    /**
     * 主题描述
     */
    private String description;

    /**
     * 是否当前启用
     */
    private Boolean active;

    /**
     * 主题门户入口地址
     */
    private String portalPageUrl;
}
