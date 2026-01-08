package com.tt.application.role.command;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "角色菜单授权")
public class RoleMenuAssignCommand {

    @NotNull(message = "角色ID不能为空")
    @Schema(description = "角色ID", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long roleId;

    @Schema(description = "菜单ID列表")
    private List<Long> menuIds;
}
