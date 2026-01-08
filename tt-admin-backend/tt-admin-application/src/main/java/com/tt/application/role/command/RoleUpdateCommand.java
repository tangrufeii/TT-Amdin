package com.tt.application.role.command;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "更新角色")
public class RoleUpdateCommand {

    @NotNull(message = "角色ID不能为空")
    @Schema(description = "角色ID", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long id;

    @Schema(description = "角色名称")
    private String roleName;

    @Size(max = 50, message = "角色编码长度不能超过50个字符")
    @Schema(description = "角色编码")
    private String roleCode;

    @Schema(description = "排序")
    private Integer sort;

    @Schema(description = "状态")
    private String status;

    @Schema(description = "描述")
    private String description;
}
