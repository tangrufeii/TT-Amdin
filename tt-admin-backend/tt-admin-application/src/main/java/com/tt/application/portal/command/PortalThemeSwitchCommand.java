package com.tt.application.portal.command;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * 门户主题切换命令
 */
@Data
@Schema(description = "门户主题切换参数")
public class PortalThemeSwitchCommand {

    /**
     * 目标主题键
     */
    @NotBlank(message = "主题键不能为空")
    @Schema(description = "主题键", example = "blog")
    private String themeKey;
}
