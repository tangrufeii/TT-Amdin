package com.tt.plugin.monitor.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "系统监控配置")
public class MonitorConfig {
    @Schema(description = "配置ID")
    private Long id;

    @Schema(description = "CPU 告警阈值(%)")
    private Integer cpuThreshold;

    @Schema(description = "内存告警阈值(%)")
    private Integer memoryThreshold;

    @Schema(description = "磁盘告警阈值(%)")
    private Integer diskThreshold;

    @Schema(description = "是否启用")
    private String enabled;
}
