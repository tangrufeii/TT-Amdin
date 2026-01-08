package com.tt.domain.plugin.progress;

import lombok.Getter;

@Getter
public class PluginProgress {

    private final String pluginId;
    private final String action;
    private final String stage;
    private final Integer progress;
    private final String message;

    public PluginProgress(String pluginId, String action, String stage, Integer progress, String message) {
        this.pluginId = pluginId;
        this.action = action;
        this.stage = stage;
        this.progress = progress;
        this.message = message;
    }
}
