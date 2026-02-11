package com.tt.infrastructure.plugin.engine.handler;

import com.tt.domain.plugin.BasePluginRegistryHandler;
import com.tt.domain.plugin.model.aggregate.Plugin;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.progress.PluginProgress;
import com.tt.domain.plugin.progress.PluginProgressContext;
import com.tt.infrastructure.plugin.engine.config.PluginConfigReader;
import com.tt.infrastructure.plugin.engine.context.PluginApplicationContextHolder;
import com.tt.infrastructure.plugin.engine.holder.PluginHolder;
import com.tt.infrastructure.plugin.engine.loader.PluginClassLoader;
import com.tt.infrastructure.plugin.engine.scanner.PluginClassScanner;
import com.tt.infrastructure.plugin.engine.scanner.PluginClassMetadataCache;
import com.tt.infrastructure.plugin.engine.registry.ClassRegistry;
import com.tt.infrastructure.plugin.engine.registry.ControllerRegistry;
import com.tt.infrastructure.plugin.engine.registry.MapperRegistry;
import com.tt.infrastructure.plugin.engine.registry.WebSocketRegistry;
import com.tt.plugin.core.BasePluginLifecycle;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Service;

import java.io.File;
import java.net.URLClassLoader;
import java.util.List;
import java.util.Map;

/**
 * Plugin lifecycle handler.
 * Handles install/start/stop/uninstall and coordinates registry handlers.
 */
@Service
@Slf4j
public class PluginHandler implements ApplicationContextAware {

    private static final String ACTION_INSTALL = "INSTALL";
    private static final String ACTION_ENABLE = "ENABLE";
    private static final String ACTION_DISABLE = "DISABLE";
    private static final String ACTION_UNINSTALL = "UNINSTALL";

    /**
     * Spring ApplicationContext.
     */
    private ApplicationContext applicationContext;

    /**
     * Registry handlers keyed by bean name.
     */
    private final Map<String, BasePluginRegistryHandler> registryHandlers;

    // Controls whether class scan progress includes class names.
    @Value("${tt.plugin.progress.scan-detail:false}")
    private boolean scanDetailEnabled;

    @Value("${tt.plugin.scan.index-enabled:true}")
    private boolean scanIndexEnabled;

    @Value("${tt.plugin.scan.index-trust:true}")
    private boolean scanIndexTrustEnabled;

    /**
     * Create handler with registry handlers.
     *
     * @param registryHandlers all registry handlers
     */
    public PluginHandler(Map<String, BasePluginRegistryHandler> registryHandlers) {
        this.registryHandlers = registryHandlers;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    /**
     * Install plugin.
     *
     * @param pluginDir plugin directory
     * @return installed plugin instance
     */
    public Plugin installPlugin(File pluginDir) {
        return installPlugin(pluginDir, ACTION_INSTALL);
    }

    public Plugin installPlugin(File pluginDir, String action) {
        String actionCode = action == null ? ACTION_INSTALL : action;
        // Read plugin configuration
        PluginConfig config = PluginConfigReader.readConfig(pluginDir);
        if (config == null) {
            throw new IllegalArgumentException("Failed to read plugin configuration from: " + pluginDir);
        }

        // Create plugin classloader
        reportProgress(actionCode, config.getPlugin().getId(), "create_classloader", 72, "Creating plugin classloader");
        PluginClassLoader pluginClassLoader = new PluginClassLoader(
                config.getPlugin().getId(),
                getClass().getClassLoader(),
                getClass().getClassLoader()
        );
        pluginClassLoader.addFile(pluginDir);

        // Scan plugin classes
        reportProgress(actionCode, config.getPlugin().getId(), "scan_classes", 75, "Scanning plugin classes");
        List<String> classNameList = PluginClassScanner.scanClassNames(
                pluginDir,
                pluginClassLoader,
                config.getPlugin().getId(),
                actionCode,
                scanDetailEnabled,
                scanIndexEnabled,
                scanIndexTrustEnabled
        );

        // Build runtime plugin model
        Plugin plugin = Plugin.builder()
                .pluginConfig(config)
                .pluginPath(pluginDir.getAbsolutePath())
                .pluginId(config.getPlugin().getId())
                .pluginClassLoader(pluginClassLoader)
                .classList(List.of())
                .classNameList(classNameList)
                .build();

        // Register plugin info
        PluginHolder.addPluginInfo(plugin.getPluginId(), plugin);

        // Create plugin ApplicationContext
        reportProgress(actionCode, config.getPlugin().getId(), "create_context", 78, "Creating plugin context");
        AnnotationConfigApplicationContext pluginContext = new AnnotationConfigApplicationContext();
        pluginContext.setParent(applicationContext);
        pluginContext.setClassLoader(pluginClassLoader);
        PluginApplicationContextHolder.addPluginApplicationContext(plugin.getPluginId(), pluginContext);

        // Initialize registry handlers
        reportProgress(actionCode, config.getPlugin().getId(), "init_handlers", 82, "Initializing registry handlers");
        int initTotal = registryHandlers.size();
        int initIndex = 0;
        for (Map.Entry<String, BasePluginRegistryHandler> entry : registryHandlers.entrySet()) {
            try {
                log.info("plugin handler init start: pluginId={}, handler={}, action={}",
                        config.getPlugin().getId(), entry.getKey(), actionCode);
                long handlerStartedAt = System.currentTimeMillis();
                entry.getValue().initialize();
                long handlerElapsedMs = System.currentTimeMillis() - handlerStartedAt;
                initIndex++;
                int progress = 82 + (int) Math.round((double) initIndex / Math.max(initTotal, 1) * 6);
                reportProgress(actionCode, config.getPlugin().getId(), "init_handlers", progress, "Initializing registry handlers");
                log.trace("Initialized registry handler: {}", entry.getKey());
                log.info("plugin handler init: handler={}, elapsedMs={}", entry.getKey(), handlerElapsedMs);
            } catch (Exception e) {
                log.error("Failed to initialize registry handler: {}", entry.getKey(), e);
                throw new RuntimeException("Failed to initialize registry handler: " + entry.getKey(), e);
            }
        }

        log.info("Plugin installed: {}", plugin);
        return plugin;
    }

    /**
     * Start plugin.
     *
     * @param pluginId plugin ID
     * @return started plugin instance
     */
    public Plugin startPlugin(String pluginId) {
        Plugin plugin = PluginHolder.getPluginInfo(pluginId);
        if (plugin == null) {
            throw new IllegalArgumentException("Plugin not found: " + pluginId);
        }

        log.info("Starting plugin: {}", pluginId);

        // Ensure a fresh refresh state when enabling again.
        PluginApplicationContextHolder.clearRefreshed(pluginId);

        // Execute registry handlers
        int registryTotal = registryHandlers.size();
        int registryIndex = 0;
        for (Map.Entry<String, BasePluginRegistryHandler> entry : registryHandlers.entrySet()) {
            try {
                int startProgress = 10 + (int) Math.round((double) registryIndex / Math.max(registryTotal, 1) * 70);
                String stage = resolveRegistryStage(entry.getValue());
                String message = resolveRegistryMessage(entry.getValue());
                reportProgress(ACTION_ENABLE, pluginId, stage, startProgress, message);
                long handlerStartedAt = System.currentTimeMillis();
                entry.getValue().registry(plugin);
                long handlerElapsedMs = System.currentTimeMillis() - handlerStartedAt;
                registryIndex++;
                int progress = 10 + (int) Math.round((double) registryIndex / Math.max(registryTotal, 1) * 70);
                reportProgress(ACTION_ENABLE, pluginId, stage, progress, message);
                log.trace("Executed registry handler: {}", entry.getKey());
                log.info("plugin handler registry: pluginId={}, handler={}, stage={}, elapsedMs={}",
                        pluginId, entry.getKey(), stage, handlerElapsedMs);
            } catch (Exception e) {
                log.error("Failed to execute registry handler: {}", entry.getKey(), e);
                throw new RuntimeException("Failed to execute registry handler: " + entry.getKey(), e);
            }
        }

        // Trigger plugin lifecycle onStart
        reportProgress(ACTION_ENABLE, pluginId, "lifecycle_start", 90, "Running start lifecycle");
        BasePluginLifecycle lifecycleBean = PluginApplicationContextHolder.getPluginBean(
                plugin.getPluginId(), BasePluginLifecycle.class);
        if (lifecycleBean != null) {
            lifecycleBean.onStart();
        }

        log.info("Plugin started: {}", plugin.getPluginId());
        return plugin;
    }

    /**
     * Stop plugin.
     * <p>
     * Unregister components and call lifecycle onStop. Metadata is retained to allow restart.
     * </p>
     *
     * @param pluginId plugin ID
     */
    public void stopPlugin(String pluginId) {
        Plugin plugin = PluginHolder.getPluginInfo(pluginId);
        if (plugin == null) {
            log.warn("Plugin not found for stopping: {}", pluginId);
            return;
        }

        log.info("Stopping plugin: {}", pluginId);

        // Trigger plugin lifecycle onStop
        reportProgress(ACTION_DISABLE, pluginId, "lifecycle_stop", 30, "Running stop lifecycle");
        BasePluginLifecycle lifecycleBean = PluginApplicationContextHolder.getPluginBean(
                plugin.getPluginId(), BasePluginLifecycle.class);
        if (lifecycleBean != null) {
            lifecycleBean.onStop();
        }

        // Unregister plugin components
        reportProgress(ACTION_DISABLE, pluginId, "unregistry", 30, "Unregistering plugin components");
        int unregistryTotal = registryHandlers.size();
        int unregistryIndex = 0;
        for (Map.Entry<String, BasePluginRegistryHandler> entry : registryHandlers.entrySet()) {
            try {
                long handlerStartedAt = System.currentTimeMillis();
                entry.getValue().unRegistry(plugin);
                long handlerElapsedMs = System.currentTimeMillis() - handlerStartedAt;
                unregistryIndex++;
                int progress = 30 + (int) Math.round((double) unregistryIndex / Math.max(unregistryTotal, 1) * 55);
                reportProgress(ACTION_DISABLE, pluginId, "unregistry", progress, "Unregistering plugin components");
                log.trace("Executed unregistry handler: {}", entry.getKey());
                log.info("plugin handler unregistry: pluginId={}, handler={}, elapsedMs={}",
                        pluginId, entry.getKey(), handlerElapsedMs);
            } catch (Exception e) {
                log.error("Failed to execute unregistry handler: {}", entry.getKey(), e);
            }
        }

        PluginApplicationContextHolder.clearRefreshed(pluginId);

        log.info("Plugin stopped (metadata retained, can be restarted): {}", pluginId);
    }

    /**
     * Uninstall plugin.
     * <p>
     * Execute lifecycle and unregister handlers, then remove context, classloader and metadata.
     * </p>
     *
     * @param pluginId plugin ID
     * @throws Exception error during uninstall
     */
    public void uninstallPlugin(String pluginId) throws Exception {
        Plugin plugin = PluginHolder.getPluginInfo(pluginId);
        if (plugin == null) {
            log.warn("Plugin not found for uninstalling: {}", pluginId);
            return;
        }

        log.info("Uninstalling plugin: {}", pluginId);

        // 1. Trigger plugin lifecycle onUnInstall
        reportProgress(ACTION_UNINSTALL, pluginId, "lifecycle_uninstall", 20, "Running uninstall lifecycle");
        BasePluginLifecycle lifecycleBean = PluginApplicationContextHolder.getPluginBean(
                plugin.getPluginId(), BasePluginLifecycle.class);
        if (lifecycleBean != null) {
            lifecycleBean.onUnInstall();
        }

        // 2. Unregister plugin components
        reportProgress(ACTION_UNINSTALL, pluginId, "unregistry", 45, "Unregistering plugin components");
        int uninstallTotal = registryHandlers.size();
        int uninstallIndex = 0;
        for (Map.Entry<String, BasePluginRegistryHandler> entry : registryHandlers.entrySet()) {
            try {
                long handlerStartedAt = System.currentTimeMillis();
                entry.getValue().unRegistry(plugin);
                long handlerElapsedMs = System.currentTimeMillis() - handlerStartedAt;
                uninstallIndex++;
                int progress = 45 + (int) Math.round((double) uninstallIndex / Math.max(uninstallTotal, 1) * 25);
                reportProgress(ACTION_UNINSTALL, pluginId, "unregistry", progress, "Unregistering plugin components");
                log.trace("Executed unregistry handler: {}", entry.getKey());
                log.info("plugin handler uninstall: pluginId={}, handler={}, elapsedMs={}",
                        pluginId, entry.getKey(), handlerElapsedMs);
            } catch (Exception e) {
                log.error("Failed to execute unregistry handler: {}", entry.getKey(), e);
            }
        }

        // 3. Remove plugin ApplicationContext
        reportProgress(ACTION_UNINSTALL, pluginId, "remove_context", 70, "Removing plugin context");
        PluginApplicationContextHolder.removePluginApplicationContext(pluginId);

        // 4. Close plugin classloader
        reportProgress(ACTION_UNINSTALL, pluginId, "close_classloader", 85, "Closing plugin classloader");
        URLClassLoader pluginClassLoader = plugin.getPluginClassLoader();
        PluginHolder.removePluginInfo(pluginId);
        plugin.setPluginClassLoader(null);
        if (pluginClassLoader != null) {
            pluginClassLoader.close();
        }

        // 5. Cleanup plugin metadata
        reportProgress(ACTION_UNINSTALL, pluginId, "cleanup", 90, "Cleaning plugin metadata");
        plugin.setPluginConfig(null);
        plugin.setClassList(null);
        plugin.setClassNameList(null);
        PluginClassMetadataCache.remove(pluginId);

        log.info("Plugin uninstalled: {}", pluginId);
        System.gc();
    }

    /**
     * Get all registry handlers.
     *
     * @return registry handlers
     */
    public Map<String, BasePluginRegistryHandler> getAllHandler() {
        return registryHandlers;
    }

    private String resolveRegistryStage(BasePluginRegistryHandler handler) {
        if (handler instanceof ClassRegistry) {
            return "registry_class";
        }
        if (handler instanceof MapperRegistry) {
            return "registry_mapper";
        }
        if (handler instanceof ControllerRegistry) {
            return "registry_controller";
        }
        if (handler instanceof WebSocketRegistry) {
            return "registry_websocket";
        }
        return "registry";
    }

    private String resolveRegistryMessage(BasePluginRegistryHandler handler) {
        if (handler instanceof ClassRegistry) {
            return "Registering plugin classes";
        }
        if (handler instanceof MapperRegistry) {
            return "Registering plugin mappers";
        }
        if (handler instanceof ControllerRegistry) {
            return "Registering plugin controllers";
        }
        if (handler instanceof WebSocketRegistry) {
            return "Registering plugin web sockets";
        }
        return "Registering plugin components";
    }

    private void reportProgress(String action, String pluginId, String stage, int progress, String message) {
        PluginProgressContext.report(new PluginProgress(pluginId, action, stage, progress, message));
    }
}
