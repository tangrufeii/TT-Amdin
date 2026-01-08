package com.tt.application.role.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "权限树节点")
public class PermissionTreeDTO {

    @Schema(description = "节点键")
    private String key;

    @Schema(description = "显示名称")
    private String label;

    @Schema(description = "是否禁用复选框")
    private Boolean checkboxDisabled;

    @Schema(description = "子节点")
    private List<PermissionTreeDTO> children;
}
