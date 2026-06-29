package com.tt.domain.extension.model.manifest;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 扩展路由元信息
 */
@Data
@NoArgsConstructor
public class ExtensionRouteMeta {

    /**
     * 标题
     */
    private String title;

    /**
     * 国际化键
     */
    private String i18nKey;

    /**
     * 图标
     */
    private String icon;

    /**
     * 排序号
     */
    private Integer order;

    /**
     * 是否在菜单中隐藏
     */
    private Boolean hideInMenu;

    /**
     * 是否启用 keepAlive
     */
    private Boolean keepAlive;

    /**
     * 是否常驻路由
     */
    private Boolean constant;

    /**
     * 激活菜单名
     */
    private String activeMenu;

    /**
     * 布局类型
     */
    private String layout;
}
