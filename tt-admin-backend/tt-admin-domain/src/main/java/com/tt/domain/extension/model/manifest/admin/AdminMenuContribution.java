package com.tt.domain.extension.model.manifest.admin;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 后台菜单贡献
 */
@Data
@NoArgsConstructor
public class AdminMenuContribution {

    /**
     * 菜单唯一键
     */
    private String key;

    /**
     * 菜单标题
     */
    private String title;

    /**
     * 绑定路由名称
     */
    private String routeName;

    /**
     * 父级菜单键
     */
    private String parent;

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
}
