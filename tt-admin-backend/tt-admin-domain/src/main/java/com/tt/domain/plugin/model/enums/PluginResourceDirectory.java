package com.tt.domain.plugin.model.enums;

import lombok.Getter;

import java.io.File;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 插件资源目录枚举
 */
@Getter
public enum PluginResourceDirectory {
    CODE_DIR("code"),
    LIB_DIR("lib"),
    CONFIG_FILE("plugin.yaml"),
    SETTING_FILE("setting.json"),
    CLASSES_DIR("classes"),
    UI_DIR("ui"),
    SQL_DIR("sql"),
    FRONTEND_FILE("frontend.yaml");
    private String path;
    PluginResourceDirectory(String path) {
        this.path = path;
    }

    // 添加路径到枚举的映射
    private static final Map<String, PluginResourceDirectory> PATH_TO_ENUM = Arrays.stream(values())
            .collect(Collectors.toMap(e -> e.path, e -> e));
    public static Optional<PluginResourceDirectory> fromPath(String path) {
        return Optional.ofNullable(PATH_TO_ENUM.get(path));
    }
}


