package com.tt.domain.plugin.model.enums;

import lombok.Getter;

@Getter
public enum PluginDirectory {

    PLUGIN_DIRECTORY("resources/plugins"),
    TEMP_DIRECTORY("resources/temp");
    ;

    private String path;

    PluginDirectory(String path) {
        this.path = path;
    }
}
