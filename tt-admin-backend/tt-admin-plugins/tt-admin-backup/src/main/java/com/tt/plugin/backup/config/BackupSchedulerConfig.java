package com.tt.plugin.backup.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

@Configuration
public class BackupSchedulerConfig {

    @Bean(name = "backupTaskScheduler")
    public ThreadPoolTaskScheduler backupTaskScheduler() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(1);
        scheduler.setThreadNamePrefix("backup-scheduler-");
        scheduler.setRemoveOnCancelPolicy(true);
        return scheduler;
    }
}
