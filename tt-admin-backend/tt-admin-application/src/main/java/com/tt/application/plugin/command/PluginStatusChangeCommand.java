package com.tt.application.plugin.command;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 插件状态变更命令
 * <p>
 * 用于启用或禁用插件
 *
 * @author tt
 * @date 2025/12/24
 */
@Data
@Schema(description = "插件状态变更命令")
public class PluginStatusChangeCommand {

    /**
     * 插件ID（主键ID）
     */
    @NotNull(message = "插件ID不能为空")
    @Schema(description = "插件主键ID", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long id;

    /**
     * 目标状态：0-禁用，1-启用
     */
    @NotNull(message = "状态不能为空")
    @Schema(description = "目标状态：0-禁用，1-启用", requiredMode = Schema.RequiredMode.REQUIRED)
    private Integer status;
}