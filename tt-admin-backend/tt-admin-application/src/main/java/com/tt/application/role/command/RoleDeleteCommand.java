package com.tt.application.role.command;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "删除角色")
public class RoleDeleteCommand {

    @NotEmpty(message = "角色ID不能为空")
    @Schema(description = "角色ID列表", requiredMode = Schema.RequiredMode.REQUIRED)
    private List<Long> ids;
}
