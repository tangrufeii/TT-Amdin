package com.tt.domain.extension.model.manifest.portal;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 门户导航标签贡献
 */
@Data
@NoArgsConstructor
public class PortalTabContribution {

    /**
     * 标签唯一键
     */
    private String key;

    /**
     * 标签标题
     */
    private String title;

    /**
     * 绑定路由名称
     */
    private String routeName;

    /**
     * 图标
     */
    private String icon;

    /**
     * 排序号
     */
    private Integer order;
}
