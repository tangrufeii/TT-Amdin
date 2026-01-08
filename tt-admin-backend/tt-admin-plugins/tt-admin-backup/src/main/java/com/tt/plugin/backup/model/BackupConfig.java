package com.tt.plugin.backup.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "备份配置")
public class BackupConfig {
    @Schema(description = "配置ID")
    private Long id;

    @Schema(description = "数据库类型")
    private String dbType;

    @Schema(description = "备份类型")
    private String backupType;

    @Schema(description = "自定义备份命令")
    private String customCommand;

    @Schema(description = "定时表达式")
    private String cron;

    @Schema(description = "是否启用")
    private String enabled;

    @Schema(description = "保留天数")
    private Integer retentionDays;

    @Schema(description = "备份目录")
    private String targetDir;

    @Schema(description = "上次执行时间")
    private LocalDateTime lastRunTime;
}
