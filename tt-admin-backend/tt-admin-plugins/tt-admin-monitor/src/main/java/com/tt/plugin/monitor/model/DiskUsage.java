package com.tt.plugin.monitor.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "磁盘使用情况")
public class DiskUsage {
    @Schema(description = "磁盘路径")
    private String path;

    @Schema(description = "总容量(字节)")
    private long total;

    @Schema(description = "可用容量(字节)")
    private long free;

    @Schema(description = "已用容量(字节)")
    private long used;

    @Schema(description = "使用率(%)")
    private double usage;
}
