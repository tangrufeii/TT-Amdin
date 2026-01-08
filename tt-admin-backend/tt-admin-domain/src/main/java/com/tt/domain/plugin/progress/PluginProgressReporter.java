package com.tt.domain.plugin.progress;

@FunctionalInterface
public interface PluginProgressReporter {
    void report(PluginProgress progress);
}
