package com.tt.domain.system.access.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 系统菜单领域模型
 */
@Data
@Builder
public class SystemMenu {

    private Long id;

    private Long parentId;

    private String type;

    private String name;

    private String code;

    private String i18nKey;

    private String routeName;

    private String path;

    private String component;

    private String icon;

    private String iconType;

    private String permission;

    private String keepAlive;

    private String hide;

    private String multiTab;

    private Integer fixedIndexInTab;

    private String href;

    private Integer sort;

    private String iframeUrl;

    private String query;

    private String status;

    private String remark;

    private String sourceType;

    private String sourceId;

    private String originData;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}
