package com.tt.infrastructure.plugin.engine.config;

import cn.hutool.core.io.FileUtil;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.model.enums.PluginResourceDirectory;
import lombok.extern.slf4j.Slf4j;
import org.yaml.snakeyaml.Yaml;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

/**
 * 插件配置读取器
 * <p>
 * 负责从插件目录或配置文件中读取插件配置信息(plugin.yaml)。
 * 支持从已安装插件目录、开发环境目录等不同场景读取配置。
 * </p>
 *
 * @author trf
 * @date 2025/12/23
 */
@Slf4j
public class PluginConfigReader {

    /**
     * 配置文件名称
     */
    private static final String CONFIG_FILE_NAME = PluginResourceDirectory.CONFIG_FILE.getPath();

    /**
     * 私有构造方法，防止实例化（工具类）
     */
    private PluginConfigReader() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * 从指定的插件资源目录中读取插件配置信息
     * <p>
     * 该方法会从指定目录中查找 plugin.yaml 配置文件，并解析为 PluginConfig 对象。
     * 配置文件不存在或解析失败时返回 null。
     * </p>
     *
     * @param pluginSourceDir 插件资源目录，通常包含 plugin.yaml、classes、lib 等子目录
     * @return 解析后的插件配置对象，配置不存在或解析失败时返回 null
     * @apiNote 配置文件路径：{pluginSourceDir}/plugin.yaml
     */
    public static PluginConfig readConfig(File pluginSourceDir) {
        if (pluginSourceDir == null || !pluginSourceDir.exists()) {
            log.error("Plugin source directory does not exist: {}", pluginSourceDir);
            return null;
        }

        File configFile = buildConfigFilePath(pluginSourceDir);
        if (!configFile.exists()) {
            log.error("Plugin configuration file not found: {}", configFile.getAbsolutePath());
            return null;
        }

        return parseConfigFile(configFile);
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
     * 配置文件位于：{pluginPath}/classes/plugin.yaml
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

    /**
     * 构建配置文件的完整路径
     * <p>
     * 配置文件固定位于资源目录下的 plugin.yaml
     * </p>
     *
     * @param sourceDir 源目录
     * @return 配置文件对象
     */
    private static File buildConfigFilePath(File sourceDir) {
        String configPath = String.join(File.separator, sourceDir.getAbsolutePath(), CONFIG_FILE_NAME);
        return new File(configPath);
    }

    /**
     * 解析插件配置文件
     * <p>
     * 使用 SnakeYAML 解析 plugin.yaml 文件为 PluginConfig 对象
     * </p>
     *
     * @param configFile 配置文件
     * @return 解析后的配置对象，解析失败时返回 null
     */
    private static PluginConfig parseConfigFile(File configFile) {
        try (InputStream input = new FileInputStream(configFile)) {
            Yaml yaml = new Yaml();
            PluginConfig config = yaml.loadAs(input, PluginConfig.class);
            log.debug("Successfully parsed plugin configuration from: {}", configFile.getAbsolutePath());
            return config;
        } catch (Exception e) {
            log.error("Failed to parse plugin configuration file: {}", configFile.getAbsolutePath(), e);
            return null;
        }
    }
}