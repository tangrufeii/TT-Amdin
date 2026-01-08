package com.tt.server.websocket;

import com.tt.domain.plugin.event.PluginLifecycleEvent;
import lombok.Data;

import java.time.LocalDateTime;

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
    private LocalDateTime occurredOn;

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
        message.setOccurredOn(event.getOccurredOn());
        return message;
    }
}
