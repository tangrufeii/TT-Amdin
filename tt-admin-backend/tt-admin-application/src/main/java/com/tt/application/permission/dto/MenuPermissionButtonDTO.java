package com.tt.application.permission.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "Menu permission button dto")
public class MenuPermissionButtonDTO {

    private Long id;

    private String name;

    private String resource;
}
