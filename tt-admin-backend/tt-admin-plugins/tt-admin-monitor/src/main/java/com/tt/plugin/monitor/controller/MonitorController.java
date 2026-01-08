package com.tt.plugin.monitor.controller;

import com.tt.common.api.Result;
import com.tt.plugin.monitor.model.MonitorConfig;
import com.tt.plugin.monitor.model.MonitorMetrics;
import com.tt.plugin.monitor.service.MonitorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "系统监控插件", description = "系统监控插件相关接口")
@RequestMapping("/plugin/monitor")
@RequiredArgsConstructor
public class MonitorController {

    private final MonitorService monitorService;

    @GetMapping("/config")
    @Operation(summary = "获取监控配置")
    public Result<MonitorConfig> getConfig() {
        return Result.data(monitorService.getConfig());
    }

    @PutMapping("/config")
    @Operation(summary = "更新监控配置")
    public Result<MonitorConfig> updateConfig(@RequestBody MonitorConfig config) {
        return Result.data(monitorService.updateConfig(config));
    }

    @GetMapping("/metrics")
    @Operation(summary = "获取系统指标")
    public Result<MonitorMetrics> getMetrics() {
        return Result.data(monitorService.getMetrics());
    }
}
