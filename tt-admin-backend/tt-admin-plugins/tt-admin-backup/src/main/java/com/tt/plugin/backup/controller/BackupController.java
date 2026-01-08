package com.tt.plugin.backup.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.common.api.Result;
import com.tt.common.page.RPage;
import com.tt.plugin.backup.model.BackupConfig;
import com.tt.plugin.backup.model.BackupRecord;
import com.tt.plugin.backup.model.BackupRecordPageQuery;
import com.tt.plugin.backup.service.BackupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "数据库备份插件", description = "数据库备份插件相关接口")
@RequestMapping("/plugin/backup")
@RequiredArgsConstructor
public class BackupController {

    private final BackupService backupService;

    @GetMapping("/config")
    @Operation(summary = "获取备份配置")
    public Result<BackupConfig> getConfig() {
        return Result.data(backupService.getConfig());
    }

    @PutMapping("/config")
    @Operation(summary = "更新备份配置")
    public Result<BackupConfig> updateConfig(@RequestBody BackupConfig config) {
        return Result.data(backupService.updateConfig(config));
    }

    @PostMapping("/run")
    @Operation(summary = "立即备份")
    public Result<Void> runBackup() {
        backupService.runBackup(true);
        return Result.success();
    }

    @PostMapping("/records/page")
    @Operation(summary = "备份记录分页")
    public Result<RPage<BackupRecord>> pageRecords(@RequestBody BackupRecordPageQuery query) {
        IPage<BackupRecord> page = backupService.pageRecords(query);
        return Result.data(RPage.build(page, BackupRecord::new));
    }
}
