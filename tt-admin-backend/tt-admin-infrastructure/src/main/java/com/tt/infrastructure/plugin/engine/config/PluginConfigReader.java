package com.tt.infrastructure.plugin.engine.config;

import com.tt.domain.extension.model.manifest.ExtensionManifest;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.model.enums.PluginResourceDirectory;
import com.tt.infrastructure.extension.manifest.ExtensionManifestCompatMapper;
import com.tt.infrastructure.extension.manifest.ExtensionManifestReader;
import lombok.extern.slf4j.Slf4j;

import java.io.File;

/**
 * 插件配置读取器
 * <p>
 * 负责从插件目录中读取可供旧插件引擎消费的配置对象。
 * 兼容顺序如下：
 * 1. 优先读 extension.yaml，并投影成旧 PluginConfig
 * 2. 不存在时回退读 plugin.yaml/frontend.yaml 的 legacy 适配结果
 * </p>
 *
 * @author trf
 * @date 2025/12/23
 */
@Slf4j
public class PluginConfigReader {

    /**
     * 私有构造方法，防止实例化（工具类）
     */
    private PluginConfigReader() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * 从指定的插件资源目录中读取插件配置信息
     * <p>
     * 该方法会从指定目录中查找统一 Manifest，并投影成旧 PluginConfig。
     * 如果既没有 extension.yaml，也没有 legacy plugin.yaml，则返回 null。
     * </p>
     *
     * @param pluginSourceDir 插件资源目录，通常包含 extension.yaml 或 plugin.yaml
     * @return 解析后的插件配置对象，配置不存在或解析失败时返回 null
     */
    public static PluginConfig readConfig(File pluginSourceDir) {
        if (pluginSourceDir == null || !pluginSourceDir.exists()) {
            log.error("Plugin source directory does not exist: {}", pluginSourceDir);
            return null;
        }

        ExtensionManifest manifest = ExtensionManifestReader.readManifest(pluginSourceDir).orElse(null);
        if (manifest == null) {
            log.error("Plugin manifest file not found or invalid: {}", pluginSourceDir.getAbsolutePath());
            return null;
        }
        return ExtensionManifestCompatMapper.toPluginConfig(manifest);
    }

    /**
     * 根据插件ID获取已安装插件的配置信息
     * <p>
     * 用于查询系统中已安装插件的配置信息。
     * 插件目录结构：{PLUGIN_DIRECTORY}/{pluginId}/
     * </p>
     *
     * @param pluginId 插件唯一标识符
     * @return 插件配置对象，插件不存在或配置读取失败时返回 null
     * @apiNote 插件根目录由 {@link PluginDirectory#PLUGIN_DIRECTORY} 定义
     */
    public static PluginConfig readInstalledConfig(String pluginId) {
        if (pluginId == null || pluginId.trim().isEmpty()) {
            log.error("Plugin ID cannot be null or empty");
            return null;
        }

        File pluginDir = new File(PluginDirectory.PLUGIN_DIRECTORY.getPath() + File.separator + pluginId);
        if (!pluginDir.exists()) {
            log.warn("Installed plugin directory not found: {}", pluginDir.getAbsolutePath());
            return null;
        }

        return readConfig(pluginDir);
    }

    /**
     * 从开发环境目录中读取插件配置信息
     * <p>
     * 用于开发模式下读取插件配置，开发环境目录结构通常包含 classes 子目录。
     * 配置文件位于：{pluginPath}/classes/extension.yaml 或 plugin.yaml
     * </p>
     *
     * @param pluginPath 开发环境插件根目录路径
     * @return 插件配置对象，目录不存在或配置读取失败时返回 null
     * @apiNote 开发环境下的 classes 目录由 {@link PluginResourceDirectory#CLASSES_DIR} 定义
     */
    public static PluginConfig readDevConfig(String pluginPath) {
        if (pluginPath == null || pluginPath.trim().isEmpty()) {
            log.error("Plugin path cannot be null or empty");
            return null;
        }

        File classesDir = new File(pluginPath + File.separator + PluginResourceDirectory.CLASSES_DIR.getPath());
        if (!classesDir.exists()) {
            log.error("Development classes directory not found: {}", classesDir.getAbsolutePath());
            return null;
        }

        return readConfig(classesDir);
    }

}
