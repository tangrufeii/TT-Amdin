package com.tt.application.plugin.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 插件管理DTO
 * <p>
 * 用于传输插件管理信息
 *
 * @author tt
 * @date 2025/12/24
 */
@Data
@Schema(description = "插件管理信息")
public class PluginManagementDTO {

    @Schema(description = "数据库主键ID")
    private Long id;

    @Schema(description = "插件ID（唯一标识）")
    private String pluginId;

    @Schema(description = "插件名称")
    private String name;

    @Schema(description = "插件描述")
    private String description;

    @Schema(description = "版本号")
    private String version;

    @Schema(description = "作者")
    private String author;

    @Schema(description = "官方网址")
    private String website;

    @Schema(description = "联系邮箱")
    private String email;

    @Schema(description = "是否为开发环境插件")
    private Boolean isDev;

    @Schema(description = "开发环境前端地址")
    private String frontDevAddress;

    @Schema(description = "插件状态：0-禁用，1-启用")
    private Integer status;

    @Schema(description = "状态描述")
    private String statusDesc;

    @Schema(description = "创建时间")
    private LocalDateTime createTime;

    @Schema(description = "更新时间")
    private LocalDateTime updateTime;

    @Schema(description = "创建人ID")
    private Long createUserId;

    @Schema(description = "更新人ID")
    private Long updateUserId;
}