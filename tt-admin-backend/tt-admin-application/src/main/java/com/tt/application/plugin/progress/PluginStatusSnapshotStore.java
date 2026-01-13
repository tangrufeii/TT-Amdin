package com.tt.application.plugin.progress;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * In-memory snapshot of the latest plugin status messages.
 */
public final class PluginStatusSnapshotStore {

    private static final long DEFAULT_TTL_MS = 120_000L;
    private static final Map<String, Snapshot> SNAPSHOT = new ConcurrentHashMap<>();

    private PluginStatusSnapshotStore() {
    }

    public static void put(String key, String payload) {
        if (key == null || payload == null) {
            return;
        }
        SNAPSHOT.put(key, new Snapshot(payload, System.currentTimeMillis()));
    }

    public static void remove(String key) {
        if (key == null) {
            return;
        }
        SNAPSHOT.remove(key);
    }

    public static Collection<String> values() {
        long now = System.currentTimeMillis();
        List<String> payloads = new ArrayList<>();
        Iterator<Map.Entry<String, Snapshot>> iterator = SNAPSHOT.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, Snapshot> entry = iterator.next();
            Snapshot snapshot = entry.getValue();
            if (snapshot == null || now - snapshot.updatedAt > DEFAULT_TTL_MS) {
                iterator.remove();
                continue;
            }
            payloads.add(snapshot.payload);
        }
        return payloads;
    }

    private record Snapshot(String payload, long updatedAt) {
    }
}
