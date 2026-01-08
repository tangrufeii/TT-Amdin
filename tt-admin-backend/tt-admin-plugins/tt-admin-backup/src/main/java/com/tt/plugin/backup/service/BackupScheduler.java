package com.tt.plugin.backup.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.time.ZoneId;
import java.util.concurrent.ScheduledFuture;

@Component
@RequiredArgsConstructor
public class BackupScheduler {

    private final TaskScheduler backupTaskScheduler;
    private ScheduledFuture<?> scheduledFuture;

    public synchronized void schedule(String cron, boolean enabled, Runnable task) {
        cancel();
        if (!enabled || !StringUtils.hasText(cron)) {
            return;
        }
        CronTrigger trigger = new CronTrigger(cron, ZoneId.systemDefault());
        scheduledFuture = backupTaskScheduler.schedule(task, trigger);
    }

    public synchronized void cancel() {
        if (scheduledFuture != null) {
            scheduledFuture.cancel(false);
            scheduledFuture = null;
        }
    }
}
