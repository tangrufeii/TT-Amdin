package com.tt.application.permission.command;

import com.tt.common.page.PageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "Permission page query")
public class PermissionPageQueryCommand extends PageQuery {

    @Schema(description = "Menu id")
    private Long menuId;

    @Schema(description = "Permission name")
    private String name;

    @Schema(description = "Resource")
    private String resource;

    @Schema(description = "Status")
    private String status;
}
