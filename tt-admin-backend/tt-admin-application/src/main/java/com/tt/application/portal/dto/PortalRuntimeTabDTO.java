package com.tt.application.portal.dto;

import lombok.Data;

/**
 * 门户导航标签 DTO
 */
@Data
public class PortalRuntimeTabDTO {

    /**
     * 标签键
     */
    private String key;

    /**
     * 标签标题
     */
    private String title;

    /**
     * 标签绑定的路由名
     */
    private String routeName;

    /**
     * 标签图标
     */
    private String icon;

    /**
     * 标签排序值
     */
    private Integer order;
}
