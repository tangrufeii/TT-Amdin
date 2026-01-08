package com.tt.application.menu.dto;

import lombok.Data;

import java.util.List;

@Data
public class MenuDTO {
    private Long id;
    private Long parentId;
    private String type;
    private String name;
    private String code;
    private String i18nKey;
    private String routeName;
    private String routePath;
    private String component;
    private String icon;
    private String iconType;
    private String status;
    private String hide;
    private String href;
    private String iframeUrl;
    private String keepAlive;
    private Integer sort;
    private String multiTab;
    private Integer fixedIndexInTab;
    private List<MenuQueryDTO> query;
}
