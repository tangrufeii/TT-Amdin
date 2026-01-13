package com.tt.infrastructure.plugin.engine.scanner;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public final class PluginClassMetadataCache {

    private static final ConcurrentMap<String, PluginClassMetadata> CACHE = new ConcurrentHashMap<>();

    private PluginClassMetadataCache() {
    }

    public static void put(String pluginId, PluginClassMetadata metadata) {
        if (pluginId == null || metadata == null) {
            return;
        }
        CACHE.put(pluginId, metadata);
    }

    public static PluginClassMetadata get(String pluginId) {
        if (pluginId == null) {
            return null;
        }
        return CACHE.get(pluginId);
    }

    public static void remove(String pluginId) {
        if (pluginId == null) {
            return;
        }
        CACHE.remove(pluginId);
    }
}
