package com.tt.plugin.monitor.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Schema(description = "系统监控指标")
public class MonitorMetrics {
    @Schema(description = "CPU 使用率(%)")
    private double cpuUsage;

    @Schema(description = "内存使用率(%)")
    private double memoryUsage;

    @Schema(description = "JVM 内存使用率(%)")
    private double jvmMemoryUsage;

    @Schema(description = "JVM 已使用内存(字节)")
    private long jvmMemoryUsed;

    @Schema(description = "JVM 总内存(字节)")
    private long jvmMemoryTotal;

    @Schema(description = "系统负载")
    private double loadAverage;

    @Schema(description = "线程数")
    private int threadCount;

    @Schema(description = "运行时长(毫秒)")
    private long uptime;

    @Schema(description = "时间戳")
    private long timestamp;

    @Schema(description = "磁盘指标列表")
    private List<DiskUsage> disks;

    @Schema(description = "告警状态")
    private Map<String, Boolean> alerts;
}
