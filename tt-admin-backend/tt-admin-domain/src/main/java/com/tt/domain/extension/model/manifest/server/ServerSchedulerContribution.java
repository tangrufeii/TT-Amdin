package com.tt.domain.extension.model.manifest.server;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 服务端定时任务贡献
 */
@Data
@NoArgsConstructor
public class ServerSchedulerContribution {

    /**
     * 任务唯一键
     */
    private String key;

    /**
     * 任务标题
     */
    private String title;

    /**
     * Cron 表达式
     */
    private String cron;

    /**
     * 任务处理器标识
     */
    private String handler;
}
