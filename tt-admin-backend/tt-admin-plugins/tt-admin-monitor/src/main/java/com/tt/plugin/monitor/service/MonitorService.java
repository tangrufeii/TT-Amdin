package com.tt.plugin.monitor.service;

import com.tt.common.domain.DomainException;
import com.tt.plugin.monitor.model.DiskUsage;
import com.tt.plugin.monitor.model.MonitorConfig;
import com.tt.plugin.monitor.model.MonitorMetrics;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import jakarta.annotation.PostConstruct;
import java.io.File;
import java.lang.management.ManagementFactory;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MonitorService {

    private static final int DEFAULT_THRESHOLD = 60;
    private static final String DEFAULT_ENABLED = "Y";

    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<MonitorConfig> configRowMapper = (rs, rowNum) -> {
        MonitorConfig config = new MonitorConfig();
        config.setId(rs.getLong("id"));
        config.setCpuThreshold(rs.getInt("cpu_threshold"));
        config.setMemoryThreshold(rs.getInt("memory_threshold"));
        config.setDiskThreshold(rs.getInt("disk_threshold"));
        config.setEnabled(rs.getString("enabled"));
        return config;
    };

    @PostConstruct
    public void init() {
        getConfig();
    }

    public MonitorConfig getConfig() {
        List<MonitorConfig> list = jdbcTemplate.query("SELECT * FROM sys_monitor_config ORDER BY id ASC LIMIT 1", configRowMapper);
        if (!list.isEmpty()) {
            return list.get(0);
        }
        MonitorConfig config = new MonitorConfig();
        config.setId(1L);
        config.setCpuThreshold(DEFAULT_THRESHOLD);
        config.setMemoryThreshold(DEFAULT_THRESHOLD);
        config.setDiskThreshold(DEFAULT_THRESHOLD);
        config.setEnabled(DEFAULT_ENABLED);
        jdbcTemplate.update(
                "INSERT INTO sys_monitor_config (id, cpu_threshold, memory_threshold, disk_threshold, enabled, update_time) VALUES (?,?,?,?,?,NOW())",
                config.getId(),
                config.getCpuThreshold(),
                config.getMemoryThreshold(),
                config.getDiskThreshold(),
                config.getEnabled()
        );
        return config;
    }

    public MonitorConfig updateConfig(MonitorConfig input) {
        if (input == null) {
            throw new DomainException("PLUGIN_MONITOR", "monitor config is required");
        }
        MonitorConfig current = getConfig();
        jdbcTemplate.update(
                "UPDATE sys_monitor_config SET cpu_threshold=?, memory_threshold=?, disk_threshold=?, enabled=?, update_time=NOW() WHERE id=?",
                input.getCpuThreshold() != null ? input.getCpuThreshold() : current.getCpuThreshold(),
                input.getMemoryThreshold() != null ? input.getMemoryThreshold() : current.getMemoryThreshold(),
                input.getDiskThreshold() != null ? input.getDiskThreshold() : current.getDiskThreshold(),
                StringUtils.hasText(input.getEnabled()) ? input.getEnabled() : current.getEnabled(),
                current.getId()
        );
        return getConfig();
    }

    public MonitorMetrics getMetrics() {
        MonitorConfig config = getConfig();
        if (!"Y".equalsIgnoreCase(config.getEnabled())) {
            return new MonitorMetrics();
        }

        com.sun.management.OperatingSystemMXBean osBean =
                (com.sun.management.OperatingSystemMXBean) ManagementFactory.getOperatingSystemMXBean();

        double cpuUsage = normalizeUsage(osBean.getSystemCpuLoad());
        long totalMemory = osBean.getTotalPhysicalMemorySize();
        long freeMemory = osBean.getFreePhysicalMemorySize();
        double memoryUsage = totalMemory > 0 ? (double) (totalMemory - freeMemory) / totalMemory * 100 : 0;

        Runtime runtime = Runtime.getRuntime();
        long jvmTotal = runtime.totalMemory();
        long jvmFree = runtime.freeMemory();
        long jvmUsed = jvmTotal - jvmFree;
        double jvmUsage = jvmTotal > 0 ? (double) jvmUsed / jvmTotal * 100 : 0;

        List<DiskUsage> disks = collectDiskUsage();

        MonitorMetrics metrics = new MonitorMetrics();
        metrics.setCpuUsage(round(cpuUsage));
        metrics.setMemoryUsage(round(memoryUsage));
        metrics.setJvmMemoryUsage(round(jvmUsage));
        metrics.setJvmMemoryUsed(jvmUsed);
        metrics.setJvmMemoryTotal(jvmTotal);
        metrics.setLoadAverage(osBean.getSystemLoadAverage());
        metrics.setThreadCount(ManagementFactory.getThreadMXBean().getThreadCount());
        metrics.setUptime(ManagementFactory.getRuntimeMXBean().getUptime());
        metrics.setTimestamp(System.currentTimeMillis());
        metrics.setDisks(disks);
        metrics.setAlerts(buildAlerts(metrics, config, disks));
        return metrics;
    }

    private List<DiskUsage> collectDiskUsage() {
        File[] roots = File.listRoots();
        if (roots == null) {
            return List.of();
        }
        return List.of(roots).stream().map(root -> {
            long total = root.getTotalSpace();
            long free = root.getUsableSpace();
            long used = total - free;
            double usage = total > 0 ? (double) used / total * 100 : 0;
            DiskUsage diskUsage = new DiskUsage();
            diskUsage.setPath(root.getAbsolutePath());
            diskUsage.setTotal(total);
            diskUsage.setFree(free);
            diskUsage.setUsed(used);
            diskUsage.setUsage(round(usage));
            return diskUsage;
        }).collect(Collectors.toList());
    }

    private Map<String, Boolean> buildAlerts(MonitorMetrics metrics, MonitorConfig config, List<DiskUsage> disks) {
        Map<String, Boolean> alerts = new HashMap<>();
        alerts.put("cpu", metrics.getCpuUsage() >= config.getCpuThreshold());
        alerts.put("memory", metrics.getMemoryUsage() >= config.getMemoryThreshold());
        boolean diskAlert = disks.stream().anyMatch(disk -> disk.getUsage() >= config.getDiskThreshold());
        alerts.put("disk", diskAlert);
        return alerts;
    }

    private double normalizeUsage(double value) {
        if (Double.isNaN(value) || value < 0) {
            return 0;
        }
        return value * 100;
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
