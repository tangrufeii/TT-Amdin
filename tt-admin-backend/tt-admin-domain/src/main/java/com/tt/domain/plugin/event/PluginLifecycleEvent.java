package com.tt.domain.plugin.event;

import com.tt.common.domain.DomainEvent;
import lombok.Getter;

/**
 * 插件生命周期事件
 */
@Getter
public class PluginLifecycleEvent extends DomainEvent {

    private final String pluginId;
    private final String action;
    private final String status;
    private final String message;
    private final String stage;
    private final Integer progress;
    private final Long startedAt;
    private final Long elapsedMs;
    /**
     * Stage-level elapsed time in milliseconds, measured from first update of the stage.
     */
    private final Long stageElapsedMs;

    public PluginLifecycleEvent(String pluginId, String action, String status, String message) {
        this(pluginId, action, status, message, null, null, null, null, null);
    }

    public PluginLifecycleEvent(String pluginId,
                                String action,
                                String status,
                                String message,
                                String stage,
                                Integer progress,
                                Long startedAt,
                                Long elapsedMs,
                                Long stageElapsedMs) {
        super(pluginId == null ? "unknown" : pluginId, "plugin");
        this.pluginId = pluginId;
        this.action = action;
        this.status = status;
        this.message = message;
        this.stage = stage;
        this.progress = progress;
        this.startedAt = startedAt;
        this.elapsedMs = elapsedMs;
        this.stageElapsedMs = stageElapsedMs;
    }
}
