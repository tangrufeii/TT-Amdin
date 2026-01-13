package com.tt.server.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tt.application.plugin.progress.PluginStatusSnapshotStore;
import com.tt.domain.plugin.event.PluginLifecycleEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class PluginLifecycleEventListener {

    private final ObjectMapper objectMapper;

    @EventListener
    public void onPluginLifecycleEvent(PluginLifecycleEvent event) {
        try {
            PluginStatusMessage message = PluginStatusMessage.from(event);
            String payload = objectMapper.writeValueAsString(message);
            PluginStatusWebSocket.broadcast(payload);
            String key = buildSnapshotKey(message);
            if (isTerminal(message)) {
                PluginStatusSnapshotStore.remove(key);
            } else {
                PluginStatusSnapshotStore.put(key, payload);
            }
            // Log progress for diagnostics and timeline analysis.
            log.info("plugin progress: pluginId={}, action={}, status={}, stage={}, progress={}%, stageElapsedMs={}, elapsedMs={}, message={}",
                    event.getPluginId(),
                    event.getAction(),
                    event.getStatus(),
                    event.getStage(),
                    event.getProgress(),
                    event.getStageElapsedMs(),
                    event.getElapsedMs(),
                    event.getMessage());
        } catch (JsonProcessingException e) {
            log.warn("Failed to serialize plugin lifecycle event", e);
        }
    }

    private String buildSnapshotKey(PluginStatusMessage message) {
        String pluginId = message.getPluginId() == null ? "unknown" : message.getPluginId();
        String action = message.getAction() == null ? "unknown" : message.getAction();
        return pluginId + "::" + action;
    }

    private boolean isTerminal(PluginStatusMessage message) {
        String status = message.getStatus();
        if (status == null) {
            return false;
        }
        String normalized = status.toUpperCase();
        return "SUCCESS".equals(normalized) || "FAILED".equals(normalized);
    }
}
