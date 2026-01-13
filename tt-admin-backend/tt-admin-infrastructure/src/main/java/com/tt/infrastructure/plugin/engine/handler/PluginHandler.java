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
     * 涓荤▼搴廇pplicationContext
     */
    private ApplicationContext applicationContext;

    /**
     * 鎻掍欢娉ㄥ唽澶勭悊鍣ㄦ槧灏勮〃
     * <p>
     * Key: Bean鍚嶇О
     * Value: 娉ㄥ唽澶勭悊鍣ㄥ疄渚?
     * </p>
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
     * 鏋勯€犳彃浠跺鐞嗗櫒
     *
     * @param registryHandlers 鎵€鏈夋彃浠舵敞鍐屽鐞嗗櫒
     */
    public PluginHandler(Map<String, BasePluginRegistryHandler> registryHandlers) {
        this.registryHandlers = registryHandlers;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    /**
     * 瀹夎鎻掍欢
     * <p>
     * 鍒涘缓鎻掍欢鐨勭被鍔犺浇鍣ㄣ€佸簲鐢ㄤ笂涓嬫枃锛屽苟鎵弿鎻掍欢绫汇€?
     * </p>
     *
     * @param pluginDir 鎻掍欢鐩綍
     * @return 鎻掍欢杩愯鏃跺璞?
     */
    public Plugin installPlugin(File pluginDir) {
        // 璇诲彇鎻掍欢閰嶇疆
        PluginConfig config = PluginConfigReader.readConfig(pluginDir);
        if (config == null) {
            throw new IllegalArgumentException("Failed to read plugin configuration from: " + pluginDir);
        }

        // 鍒涘缓鎻掍欢绫诲姞杞藉櫒
        reportProgress(ACTION_INSTALL, config.getPlugin().getId(), "create_classloader", 72, "Creating plugin classloader");
        PluginClassLoader pluginClassLoader = new PluginClassLoader(
                config.getPlugin().getId(),
                getClass().getClassLoader(),
                getClass().getClassLoader()
        );
        pluginClassLoader.addFile(pluginDir);

        // Scan plugin classes
        reportProgress(ACTION_INSTALL, config.getPlugin().getId(), "scan_classes", 75, "Scanning plugin classes");
        List<String> classNameList = PluginClassScanner.scanClassNames(
                pluginDir,
                pluginClassLoader,
                config.getPlugin().getId(),
                ACTION_INSTALL,
                scanDetailEnabled,
                scanIndexEnabled,
                scanIndexTrustEnabled
        );

        // 鏋勫缓鎻掍欢杩愯鏃跺璞?
        Plugin plugin = Plugin.builder()
                .pluginConfig(config)
                .pluginPath(pluginDir.getAbsolutePath())
                .pluginId(config.getPlugin().getId())
                .pluginClassLoader(pluginClassLoader)
                .classList(List.of())
                .classNameList(classNameList)
                .build();

        // 娣诲姞鍒版彃浠舵敞鍐岃〃
        PluginHolder.addPluginInfo(plugin.getPluginId(), plugin);

        // 鍒涘缓鎻掍欢涓撳睘鐨凙pplicationContext
        reportProgress(ACTION_INSTALL, config.getPlugin().getId(), "create_context", 78, "Creating plugin context");
        AnnotationConfigApplicationContext pluginContext = new AnnotationConfigApplicationContext();
        pluginContext.setParent(applicationContext);
        pluginContext.setClassLoader(pluginClassLoader);
        PluginApplicationContextHolder.addPluginApplicationContext(plugin.getPluginId(), pluginContext);

        // 鍒濆鍖栨墍鏈夋敞鍐屽鐞嗗櫒
        reportProgress(ACTION_INSTALL, config.getPlugin().getId(), "init_handlers", 82, "Initializing registry handlers");
        int initTotal = registryHandlers.size();
        int initIndex = 0;
        for (Map.Entry<String, BasePluginRegistryHandler> entry : registryHandlers.entrySet()) {
            try {
                long handlerStartedAt = System.currentTimeMillis();
                entry.getValue().initialize();
                long handlerElapsedMs = System.currentTimeMillis() - handlerStartedAt;
                initIndex++;
                int progress = 82 + (int) Math.round((double) initIndex / Math.max(initTotal, 1) * 6);
                reportProgress(ACTION_INSTALL, config.getPlugin().getId(), "init_handlers", progress, "Initializing registry handlers");
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
     * 鍚姩鎻掍欢
     * <p>
     * 娉ㄥ唽鎵€鏈夌粍浠讹紝鍒锋柊瀹瑰櫒锛岃皟鐢ㄦ彃浠剁殑 onStart 鐢熷懡鍛ㄦ湡鏂规硶銆?
     * </p>
     *
     * @param pluginId 鎻掍欢ID
     * @return 鍚姩鍚庣殑鎻掍欢瀵硅薄
     */
    public Plugin startPlugin(String pluginId) {
        Plugin plugin = PluginHolder.getPluginInfo(pluginId);
        if (plugin == null) {
            throw new IllegalArgumentException("Plugin not found: " + pluginId);
        }

        log.info("Starting plugin: {}", pluginId);

        // 纭繚绂佺敤鍚庡啀娆″惎鐢ㄦ椂鑳介噸鏂?refresh
        PluginApplicationContextHolder.clearRefreshed(pluginId);

        // 鎵ц鎻掍欢缁勪欢娉ㄥ唽
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

        // 璋冪敤鎻掍欢鐨?onStart 鐢熷懡鍛ㄦ湡鏂规硶
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
     * 鍋滄鎻掍欢
     * <p>
     * 娉ㄩ攢缁勪欢锛岃皟鐢ㄦ彃浠剁殑 onStop 鐢熷懡鍛ㄦ湡鏂规硶銆?
     * </p>
     * <p>
     * <b>娉ㄦ剰锛?/b>姝ゆ搷浣滀繚鐣欐彃浠剁殑鍏冩暟鎹紙PluginHolder銆丄pplicationContextHolder銆丆lassLoader锛夛紝
     * 鍥犳鍙互閲嶆柊鍚姩鎻掍欢銆?
     * </p>
     *
     * @param pluginId 鎻掍欢ID
     */
    public void stopPlugin(String pluginId) {
        Plugin plugin = PluginHolder.getPluginInfo(pluginId);
        if (plugin == null) {
            log.warn("Plugin not found for stopping: {}", pluginId);
            return;
        }

        log.info("Stopping plugin: {}", pluginId);

        // 鍏堣皟鐢ㄦ彃浠剁殑 onStop 鐢熷懡鍛ㄦ湡鏂规硶
        reportProgress(ACTION_DISABLE, pluginId, "lifecycle_stop", 30, "Running stop lifecycle");
        BasePluginLifecycle lifecycleBean = PluginApplicationContextHolder.getPluginBean(
                plugin.getPluginId(), BasePluginLifecycle.class);
        if (lifecycleBean != null) {
            lifecycleBean.onStop();
        }

        // 鎵ц鎻掍欢缁勪欢娉ㄩ攢
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
     * 鍗歌浇鎻掍欢
     * <p>
     * 褰诲簳娓呯悊鎻掍欢鐨勬墍鏈夎祫婧愶紝鍖呮嫭锛?
     * <ul>
     *     <li>鍋滄鎻掍欢锛堝鏋滄鍦ㄨ繍琛岋級</li>
     *     <li>鍏抽棴ApplicationContext</li>
     *     <li>鍏抽棴ClassLoader</li>
     *     <li>娓呯悊PluginHolder涓殑鍏冩暟鎹?/li>
     * </ul>
     * </p>
     * <p>
     * <b>娉ㄦ剰锛?/b>鍗歌浇鍚庢彃浠舵棤娉曢噸鏂板惎鍔紝蹇呴』閲嶆柊瀹夎銆?
     * </p>
     *
     * @param pluginId 鎻掍欢ID
     * @throws Exception 鍗歌浇杩囩▼涓彂鐢熼敊璇椂鎶涘嚭
     */
    public void uninstallPlugin(String pluginId) throws Exception {
        Plugin plugin = PluginHolder.getPluginInfo(pluginId);
        if (plugin == null) {
            log.warn("Plugin not found for uninstalling: {}", pluginId);
            return;
        }

        log.info("Uninstalling plugin: {}", pluginId);

        // 1. 鍏堣皟鐢ㄦ彃浠剁殑 onUnInstall 鐢熷懡鍛ㄦ湡鏂规硶
        reportProgress(ACTION_UNINSTALL, pluginId, "lifecycle_uninstall", 20, "Running uninstall lifecycle");
        BasePluginLifecycle lifecycleBean = PluginApplicationContextHolder.getPluginBean(
                plugin.getPluginId(), BasePluginLifecycle.class);
        if (lifecycleBean != null) {
            lifecycleBean.onUnInstall();
        }

        // 2. 濡傛灉鎻掍欢姝ｅ湪杩愯锛屽厛鍋滄缁勪欢娉ㄥ唽
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

        // 3. 绉婚櫎骞跺叧闂瑼pplicationContext
        reportProgress(ACTION_UNINSTALL, pluginId, "remove_context", 70, "Removing plugin context");
        PluginApplicationContextHolder.removePluginApplicationContext(pluginId);

        // 4. 鍏抽棴绫诲姞杞藉櫒
        reportProgress(ACTION_UNINSTALL, pluginId, "close_classloader", 85, "Closing plugin classloader");
        URLClassLoader pluginClassLoader = plugin.getPluginClassLoader();
        PluginHolder.removePluginInfo(pluginId);
        plugin.setPluginClassLoader(null);
        if (pluginClassLoader != null) {
            pluginClassLoader.close();
        }

        // 5. 娓呯悊鎻掍欢瀵硅薄
        reportProgress(ACTION_UNINSTALL, pluginId, "cleanup", 90, "Cleaning plugin metadata");
        plugin.setPluginConfig(null);
        plugin.setClassList(null);
        plugin.setClassNameList(null);
        PluginClassMetadataCache.remove(pluginId);

        log.info("Plugin uninstalled: {}", pluginId);
        System.gc();
    }

    /**
     * 鑾峰彇鎵€鏈夋敞鍐屽鐞嗗櫒
     *
     * @return 娉ㄥ唽澶勭悊鍣ㄦ槧灏勮〃
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

