package com.tt.application.route.dto;

import lombok.Data;

import java.util.List;

@Data
public class RouteMetaDTO {
    private String title;
    private String i18nKey;
    private String icon;
    private String localIcon;
    private Integer order;
    private Boolean keepAlive;
    private Boolean hideInMenu;
    private Boolean multiTab;
    private Integer fixedIndexInTab;
    private String href;
    private List<RouteQueryDTO> query;
    private List<String> permissions;
    private Boolean constant;
}
