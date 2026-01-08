package com.tt.plugin.backup.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "备份记录")
public class BackupRecord {
    @Schema(description = "记录ID")
    private Long id;

    @Schema(description = "配置ID")
    private Long configId;

    @Schema(description = "文件名")
    private String fileName;

    @Schema(description = "文件路径")
    private String filePath;

    @Schema(description = "文件大小(字节)")
    private Long fileSize;

    @Schema(description = "执行状态")
    private String status;

    @Schema(description = "执行信息")
    private String message;

    @Schema(description = "开始时间")
    private LocalDateTime startTime;

    @Schema(description = "结束时间")
    private LocalDateTime endTime;

    @Schema(description = "创建时间")
    private LocalDateTime createTime;
}
