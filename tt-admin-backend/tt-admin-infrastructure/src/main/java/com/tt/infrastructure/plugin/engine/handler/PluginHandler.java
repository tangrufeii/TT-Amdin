package com.tt.infrastructure.plugin.engine.handler;

import com.tt.domain.plugin.BasePluginRegistryHandler;
import com.tt.domain.plugin.model.aggregate.Plugin;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.infrastructure.plugin.engine.config.PluginConfigReader;
import com.tt.infrastructure.plugin.engine.context.PluginApplicationContextHolder;
import com.tt.infrastructure.plugin.engine.holder.PluginHolder;
import com.tt.infrastructure.plugin.engine.loader.PluginClassLoader;
import com.tt.infrastructure.plugin.engine.scanner.PluginClassScanner;
import com.tt.plugin.core.BasePluginLifecycle;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Service;

import java.io.File;
import java.net.URLClassLoader;
import java.util.List;
import java.util.Map;

/**
 * 插件处理器
 * <p>
 * 负责插件的安装、启动、停止、卸载等核心操作。
 * 协调各个注册处理器完成插件组件的注册和注销。
 * </p>
 *
 * <h3>操作说明</h3>
 * <ul>
 *     <li><b>install</b> - 安装插件，创建类加载器和应用上下文</li>
 *     <li><b>start</b> - 启动插件，注册组件并调用 onStart</li>
 *     <li><b>stop</b> - 停止插件，注销组件并调用 onStop（保留元数据，可重新启动）</li>
 *     <li><b>uninstall</b> - 卸载插件，彻底清理所有资源</li>
 * </ul>
 *
 * @author trf
 * @date 2025/12/25
 */
@Service
@Slf4j
public class PluginHandler implements ApplicationContextAware {

    /**
     * 主程序ApplicationContext
     */
    private ApplicationContext applicationContext;

    /**
     * 插件注册处理器映射表
     * <p>
     * Key: Bean名称
     * Value: 注册处理器实例
     * </p>
     */
    private final Map<String, BasePluginRegistryHandler> registryHandlers;

    /**
     * 构造插件处理器
     *
     * @param registryHandlers 所有插件注册处理器
     */
    public PluginHandler(Map<String, BasePluginRegistryHandler> registryHandlers) {
        this.registryHandlers = registryHandlers;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    /**
     * 安装插件
     * <p>
     * 创建插件的类加载器、应用上下文，并扫描插件类。
     * </p>
     *
     * @param pluginDir 插件目录
     * @return 插件运行时对象
     */
    public Plugin installPlugin(File pluginDir) {
        // 读取插件配置
        PluginConfig config = PluginConfigReader.readConfig(pluginDir);
        if (config == null) {
            throw new IllegalArgumentException("Failed to read plugin configuration from: " + pluginDir);
        }

        // 创建插件类加载器
        PluginClassLoader pluginClassLoader = new PluginClassLoader(
                config.getPlugin().getId(),
                getClass().getClassLoader(),
                getClass().getClassLoader()
        );
        pluginClassLoader.addFile(pluginDir);

        // 扫描插件类
        List<Class<?>> classList = PluginClassScanner.scanClasses(pluginDir, pluginClassLoader);

        // 构建插件运行时对象
        Plugin plugin = Plugin.builder()
                .pluginConfig(config)
                .pluginPath(pluginDir.getAbsolutePath())
                .pluginId(config.getPlugin().getId())
                .pluginClassLoader(pluginClassLoader)
                .classList(classList)
                .build();

        // 添加到插件注册表
        PluginHolder.addPluginInfo(plugin.getPluginId(), plugin);

        // 创建插件专属的ApplicationContext
        AnnotationConfigApplicationContext pluginContext = new AnnotationConfigApplicationContext();
        pluginContext.setParent(applicationContext);
        pluginContext.setClassLoader(pluginClassLoader);
        PluginApplicationContextHolder.addPluginApplicationContext(plugin.getPluginId(), pluginContext);

        // 初始化所有注册处理器
        for (Map.Entry<String, BasePluginRegistryHandler> entry : registryHandlers.entrySet()) {
            try {
                entry.getValue().initialize();
                log.trace("Initialized registry handler: {}", entry.getKey());
            } catch (Exception e) {
                log.error("Failed to initialize registry handler: {}", entry.getKey(), e);
                throw new RuntimeException("Failed to initialize registry handler: " + entry.getKey(), e);
            }
        }

        log.info("Plugin installed: {}", plugin);
        return plugin;
    }

    /**
     * 启动插件
     * <p>
     * 注册所有组件，刷新容器，调用插件的 onStart 生命周期方法。
     * </p>
     *
     * @param pluginId 插件ID
     * @return 启动后的插件对象
     */
    public Plugin startPlugin(String pluginId) {
        Plugin plugin = PluginHolder.getPluginInfo(pluginId);
        if (plugin == null) {
            throw new IllegalArgumentException("Plugin not found: " + pluginId);
        }

        log.info("Starting plugin: {}", pluginId);

        // 执行插件组件注册
        for (Map.Entry<String, BasePluginRegistryHandler> entry : registryHandlers.entrySet()) {
            try {
                entry.getValue().registry(plugin);
                log.trace("Executed registry handler: {}", entry.getKey());
            } catch (Exception e) {
                log.error("Failed to execute registry handler: {}", entry.getKey(), e);
                throw new RuntimeException("Failed to execute registry handler: " + entry.getKey(), e);
            }
        }

        // 调用插件的 onStart 生命周期方法
        BasePluginLifecycle lifecycleBean = PluginApplicationContextHolder.getPluginBean(
                plugin.getPluginId(), BasePluginLifecycle.class);
        if (lifecycleBean != null) {
            lifecycleBean.onStart();
        }

        log.info("Plugin started: {}", plugin.getPluginId());
        return plugin;
    }

    /**
     * 停止插件
     * <p>
     * 注销组件，调用插件的 onStop 生命周期方法。
     * </p>
     * <p>
     * <b>注意：</b>此操作保留插件的元数据（PluginHolder、ApplicationContextHolder、ClassLoader），
     * 因此可以重新启动插件。
     * </p>
     *
     * @param pluginId 插件ID
     */
    public void stopPlugin(String pluginId) {
        Plugin plugin = PluginHolder.getPluginInfo(pluginId);
        if (plugin == null) {
            log.warn("Plugin not found for stopping: {}", pluginId);
            return;
        }

        log.info("Stopping plugin: {}", pluginId);

        // 先调用插件的 onStop 生命周期方法
        BasePluginLifecycle lifecycleBean = PluginApplicationContextHolder.getPluginBean(
                plugin.getPluginId(), BasePluginLifecycle.class);
        if (lifecycleBean != null) {
            lifecycleBean.onStop();
        }

        // 执行插件组件注销
        for (Map.Entry<String, BasePluginRegistryHandler> entry : registryHandlers.entrySet()) {
            try {
                entry.getValue().unRegistry(plugin);
                log.trace("Executed unregistry handler: {}", entry.getKey());
            } catch (Exception e) {
                log.error("Failed to execute unregistry handler: {}", entry.getKey(), e);
            }
        }

        log.info("Plugin stopped (metadata retained, can be restarted): {}", pluginId);
    }

    /**
     * 卸载插件
     * <p>
     * 彻底清理插件的所有资源，包括：
     * <ul>
     *     <li>停止插件（如果正在运行）</li>
     *     <li>关闭ApplicationContext</li>
     *     <li>关闭ClassLoader</li>
     *     <li>清理PluginHolder中的元数据</li>
     * </ul>
     * </p>
     * <p>
     * <b>注意：</b>卸载后插件无法重新启动，必须重新安装。
     * </p>
     *
     * @param pluginId 插件ID
     * @throws Exception 卸载过程中发生错误时抛出
     */
    public void uninstallPlugin(String pluginId) throws Exception {
        Plugin plugin = PluginHolder.getPluginInfo(pluginId);
        if (plugin == null) {
            log.warn("Plugin not found for uninstalling: {}", pluginId);
            return;
        }

        log.info("Uninstalling plugin: {}", pluginId);

        // 1. 先调用插件的 onUnInstall 生命周期方法
        BasePluginLifecycle lifecycleBean = PluginApplicationContextHolder.getPluginBean(
                plugin.getPluginId(), BasePluginLifecycle.class);
        if (lifecycleBean != null) {
            lifecycleBean.onUnInstall();
        }

        // 2. 如果插件正在运行，先停止组件注册
        for (Map.Entry<String, BasePluginRegistryHandler> entry : registryHandlers.entrySet()) {
            try {
                entry.getValue().unRegistry(plugin);
                log.trace("Executed unregistry handler: {}", entry.getKey());
            } catch (Exception e) {
                log.error("Failed to execute unregistry handler: {}", entry.getKey(), e);
            }
        }

        // 3. 移除并关闭ApplicationContext
        PluginApplicationContextHolder.removePluginApplicationContext(pluginId);

        // 4. 关闭类加载器
        URLClassLoader pluginClassLoader = plugin.getPluginClassLoader();
        PluginHolder.removePluginInfo(pluginId);
        plugin.setPluginClassLoader(null);
        if (pluginClassLoader != null) {
            pluginClassLoader.close();
        }

        // 5. 清理插件对象
        plugin.setPluginConfig(null);
        plugin.setClassList(null);

        log.info("Plugin uninstalled: {}", pluginId);
        System.gc();
    }

    /**
     * 获取所有注册处理器
     *
     * @return 注册处理器映射表
     */
    public Map<String, BasePluginRegistryHandler> getAllHandler() {
        return registryHandlers;
    }
}
