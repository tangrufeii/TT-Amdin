package com.tt.domain.system.access.model;

import lombok.Builder;
import lombok.Data;

/**
 * 系统按钮权限
 */
@Data
@Builder
public class SystemPermission {

    private Long id;

    private Long menuId;

    private String name;

    private String code;

    private String resource;

    private String status;
}
