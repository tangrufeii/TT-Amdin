package com.tt.application.plugin.command;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 创建插件命令
 * <p>
 * 用于创建新插件记录
 *
 * @author tt
 * @date 2025/12/24
 */
@Data
@Schema(description = "创建插件命令")
public class PluginCreateCommand {

    /**
     * 插件ID（唯一标识）
     */
    @NotBlank(message = "插件ID不能为空")
    @Size(max = 256, message = "插件ID长度不能超过256个字符")
    @Schema(description = "插件ID", requiredMode = Schema.RequiredMode.REQUIRED)
    private String pluginId;

    /**
     * 插件名称
     */
    @NotBlank(message = "插件名称不能为空")
    @Size(max = 256, message = "插件名称长度不能超过256个字符")
    @Schema(description = "插件名称", requiredMode = Schema.RequiredMode.REQUIRED)
    private String name;

    /**
     * 插件描述
     */
    @Size(max = 512, message = "插件描述长度不能超过512个字符")
    @Schema(description = "插件描述")
    private String description;

    /**
     * 版本号
     */
    @Size(max = 64, message = "版本号长度不能超过64个字符")
    @Schema(description = "版本号")
    private String version;

    /**
     * 作者
     */
    @Size(max = 64, message = "作者名称长度不能超过64个字符")
    @Schema(description = "作者")
    private String author;

    /**
     * 邮箱
     */
    @Size(max = 255, message = "邮箱长度不能超过255个字符")
    @Schema(description = "联系邮箱")
    private String email;

    /**
     * 官方网址
     */
    @Size(max = 255, message = "网址长度不能超过255个字符")
    @Schema(description = "官方网址")
    private String website;
}