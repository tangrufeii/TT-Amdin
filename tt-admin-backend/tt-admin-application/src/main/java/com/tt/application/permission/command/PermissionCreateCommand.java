package com.tt.application.permission.command;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Schema(description = "Permission create")
public class PermissionCreateCommand {

    @NotNull
    @Schema(description = "Menu id")
    private Long menuId;

    @NotBlank
    @Schema(description = "Permission name")
    private String name;

    @Schema(description = "Permission code")
    private String code;

    @NotBlank
    @Schema(description = "Resource")
    private String resource;

    @Schema(description = "Sort")
    private Integer sort;

    @Schema(description = "Description")
    private String description;

    @Schema(description = "Status")
    private String status;
}
