package com.tt.server.websocket;

import com.tt.domain.plugin.event.PluginLifecycleEvent;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Data
public class PluginStatusMessage {

    private String pluginId;
    private String action;
    private String status;
    private String message;
    private String stage;
    private Integer progress;
    private Long startedAt;
    private Long elapsedMs;
    private Long stageElapsedMs;
    private LocalDateTime occurredOn;
    private Long occurredAt;

    public static PluginStatusMessage from(PluginLifecycleEvent event) {
        PluginStatusMessage message = new PluginStatusMessage();
        message.setPluginId(event.getPluginId());
        message.setAction(event.getAction());
        message.setStatus(event.getStatus());
        message.setMessage(event.getMessage());
        message.setStage(event.getStage());
        message.setProgress(event.getProgress());
        message.setStartedAt(event.getStartedAt());
        message.setElapsedMs(event.getElapsedMs());
        message.setStageElapsedMs(event.getStageElapsedMs());
        message.setOccurredOn(event.getOccurredOn());
        message.setOccurredAt(resolveOccurredAt(event.getOccurredOn()));
        return message;
    }

    private static Long resolveOccurredAt(LocalDateTime occurredOn) {
        if (occurredOn == null) {
            return null;
        }
        return occurredOn.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
    }
}
