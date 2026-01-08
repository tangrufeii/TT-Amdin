package com.tt.domain.plugin.progress;

public final class PluginProgressContext {

    private static final ThreadLocal<PluginProgressReporter> REPORTER = new ThreadLocal<>();

    private PluginProgressContext() {}

    public static void setReporter(PluginProgressReporter reporter) {
        REPORTER.set(reporter);
    }

    public static void clear() {
        REPORTER.remove();
    }

    public static void report(PluginProgress progress) {
        PluginProgressReporter reporter = REPORTER.get();
        if (reporter != null && progress != null) {
            reporter.report(progress);
        }
    }
}
