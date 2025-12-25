package com.tt.application.plugin.command;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * 更新插件命令
 * <p>
 * 用于更新插件信息
 *
 * @author tt
 * @date 2025/12/24
 */
@Data
@Schema(description = "更新插件命令")
public class PluginUpdateCommand {

    /**
     * 主键ID
     */
    @NotNull(message = "插件ID不能为空")
    @Schema(description = "插件主键ID", requiredMode = Schema.RequiredMode.REQUIRED)
    private Long id;

    /**
     * 插件名称
     */
    @Size(max = 256, message = "插件名称长度不能超过256个字符")
    @Schema(description = "插件名称")
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

    /**
     * 是否为开发环境插件
     */
    @Schema(description = "是否为开发环境插件")
    private Boolean isDev;

    /**
     * 开发环境前端地址
     */
    @Size(max = 255, message = "前端开发地址长度不能超过255个字符")
    @Schema(description = "开发环境前端地址")
    private String frontDevAddress;
}