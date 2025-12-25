package com.tt.application.plugin.command;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Schema(description = "插件安装命令")
@Data
public class PluginInstallCommand {
    @Schema(description = "插件文件", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "插件文件不能为空")
    private MultipartFile file;

}
