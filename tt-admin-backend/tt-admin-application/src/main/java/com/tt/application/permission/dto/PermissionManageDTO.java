package com.tt.application.permission.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "Permission manage dto")
public class PermissionManageDTO {

    private Long id;

    private Long menuId;

    private String name;

    private String code;

    private String resource;

    private Integer sort;

    private String description;

    private String status;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;
}
