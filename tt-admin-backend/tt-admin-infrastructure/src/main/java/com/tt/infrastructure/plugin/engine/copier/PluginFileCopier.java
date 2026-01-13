package com.tt.infrastructure.plugin.engine.copier;

import cn.hutool.core.io.FileUtil;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.model.enums.PluginResourceDirectory;
import com.tt.infrastructure.plugin.engine.config.PluginConfigReader;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.util.Optional;

/**
 * 插件文件拷贝器
 * <p>
 * 负责将插件文件从源目录拷贝到目标目录。
 * 支持以下场景：
 * <ul>
 *     <li>开发环境插件拷贝到正式插件目录</li>
 *     <li>临时解压目录拷贝到正式插件目录</li>
 * </ul>
 * </p>
 * <p>
 * 拷贝规则：
 * <ul>
 *     <li>classes目录下的特殊目录（ui、sql、setting.json）直接拷贝到插件根目录</li>
 *     <li>classes目录下的其他文件拷贝到code目录</li>
 *     <li>lib目录下的依赖拷贝到lib目录</li>
 * </ul>
 * </p>
 *
 * @author trf
 * @date 2025/12/25
 */
@Slf4j
public class PluginFileCopier {

    /**
     * 需要拷贝到插件根目录的资源类型
     * <p>
     * 这些资源不会放在code目录下，而是直接放在插件根目录
     * </p>
     */
    private static final PluginResourceDirectory[] ROOT_RESOURCES = {
            PluginResourceDirectory.UI_DIR,
            PluginResourceDirectory.SQL_DIR,
            PluginResourceDirectory.SETTING_FILE
    };

    /**
     * 私有构造方法，防止实例化（工具类）
     */
    private PluginFileCopier() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * 将开发环境的插件拷贝到插件目录
     * <p>
     * 开发环境的插件目录结构与正式环境不同，需要进行转换：
     * <ul>
     *     <li>读取开发插件配置获取插件ID</li>
     *     <li>清理目标目录（如果已存在）</li>
     *     <li>按规则拷贝classes目录内容</li>
     *     <li>拷贝lib目录依赖</li>
     * </ul>
     * </p>
     *
     * @param devPluginDir 开发环境插件目录
     * @param pluginBaseDir 插件基础目录（通常是插件根目录的父目录）
     * @return 拷贝后的插件目录，失败时返回null
     * @apiNote 开发目录结构：{devPluginDir}/classes/, {devPluginDir}/lib/
     */
    public static File copyDevPlugin(String devPluginDir, String pluginBaseDir) {
        File codeDirFile = new File(devPluginDir + File.separator + PluginResourceDirectory.CLASSES_DIR.getPath());
        PluginConfig pluginConfig = PluginConfigReader.readConfig(codeDirFile);
        if (pluginConfig == null) {
            log.error("Failed to read plugin configuration from dev directory: {}", devPluginDir);
            return null;
        }

        File pluginDir = new File(pluginBaseDir + File.separator + pluginConfig.getPlugin().getId());

        // 清理已存在的插件目录
        if (pluginDir.exists()) {
            FileUtil.clean(pluginDir.getAbsoluteFile());
            log.debug("Cleaned existing plugin directory: {}", pluginDir.getAbsolutePath());
        }

        // 拷贝classes目录内容
        if (!copyClassesDirectory(codeDirFile, pluginDir)) {
            return null;
        }

        // 拷贝lib目录依赖
        copyLibDirectory(devPluginDir, pluginDir);

        log.info("Copied dev plugin from {} to {}", devPluginDir, pluginDir.getAbsolutePath());
        return pluginDir;
    }

    /**
     * 将临时解压的插件目录拷贝到正式插件目录
     * <p>
     * 临时目录是插件解压后的目录，需要将其内容拷贝到正式插件目录。
     * 正式插件目录以插件ID命名。
     * </p>
     *
     * @param pluginTempDir 临时插件目录
     * @param pluginConfig  插件配置对象
     * @return 拷贝后的插件目录，失败时返回null
     * @apiNote 正式目录路径：{PLUGIN_DIRECTORY}/{pluginId}/
     */
    public static File copyTempToPlugin(File pluginTempDir, PluginConfig pluginConfig) {
        if (pluginTempDir == null || !pluginTempDir.exists()) {
            log.error("Temporary plugin directory does not exist");
            return null;
        }
        if (pluginConfig == null || pluginConfig.getPlugin() == null) {
            log.error("Plugin configuration is null or plugin info is missing");
            return null;
        }

        String pluginId = pluginConfig.getPlugin().getId();
        File pluginDir = new File(PluginDirectory.PLUGIN_DIRECTORY.getPath() + File.separator + pluginId);

        // 创建目标目录
        if (!pluginDir.exists()) {
            FileUtil.mkdir(pluginDir);
        }

        // 拷贝临时目录下所有文件
        File[] files = pluginTempDir.listFiles();
        if (files == null) {
            log.warn("No files found in temporary directory: {}", pluginTempDir.getAbsolutePath());
            return null;
        }

        for (File file : files) {
            FileUtil.copy(file, pluginDir, true);
        }

        File classIndex = new File(pluginDir, "code/.class-index");
        if (classIndex.exists()) {
            FileUtil.del(classIndex);
        }

        log.info("Copied plugin from temp directory {} to {}", pluginTempDir.getAbsolutePath(), pluginDir.getAbsolutePath());
        return pluginDir;
    }

    /**
     * 拷贝classes目录内容
     * <p>
     * 根据资源类型决定拷贝目标：
     * <ul>
     *     <li>UI资源 -> 拷贝到插件根目录</li>
     *     <li>SQL资源 -> 拷贝到插件根目录</li>
     *     <li>配置文件 -> 拷贝到插件根目录</li>
     *     <li>其他资源 -> 拷贝到code目录</li>
     * </ul>
     * </p>
     *
     * @param sourceDir 源classes目录
     * @param pluginDir 目标插件目录
     * @return 拷贝成功返回true，失败返回false
     */
    private static boolean copyClassesDirectory(File sourceDir, File pluginDir) {
        File[] codeFiles = sourceDir.listFiles();
        if (codeFiles == null) {
            return false;
        }

        // 创建code目标目录
        File codeDestDirFile = new File(pluginDir.getAbsolutePath() + File.separator + PluginResourceDirectory.CODE_DIR.getPath());
        if (!codeDestDirFile.exists()) {
            FileUtil.mkdir(codeDestDirFile);
        }

        for (File sourceFile : codeFiles) {
            // 判断资源类型
            Optional<PluginResourceDirectory> resourceType = PluginResourceDirectory.fromPath(sourceFile.getName());

            if (resourceType.isPresent() && isRootResource(resourceType.get())) {
                // 拷贝到插件根目录
                FileUtil.copy(sourceFile, pluginDir.getAbsoluteFile(), true);
                log.trace("Copied root resource: {} to plugin root", sourceFile.getName());
            } else {
                // 拷贝到code目录
                FileUtil.copy(sourceFile, codeDestDirFile, true);
                log.trace("Copied code resource: {} to code directory", sourceFile.getName());
            }
        }

        return true;
    }

    /**
     * 拷贝lib目录内容
     *
     * @param devPluginDir 开发环境插件目录
     * @param pluginDir   目标插件目录
     */
    private static void copyLibDirectory(String devPluginDir, File pluginDir) {
        File libDirFile = new File(devPluginDir + File.separator + PluginResourceDirectory.LIB_DIR.getPath());
        if (!libDirFile.exists()) {
            log.debug("Lib directory does not exist in dev plugin: {}", libDirFile.getAbsolutePath());
            return;
        }

        File[] libFiles = libDirFile.listFiles();
        if (libFiles == null) {
            return;
        }

        // 创建lib目标目录
        File libDestDirFile = new File(pluginDir.getAbsolutePath() + File.separator + PluginResourceDirectory.LIB_DIR.getPath());
        if (!libDestDirFile.exists()) {
            FileUtil.mkdir(libDestDirFile);
        }

        for (File libFile : libFiles) {
            FileUtil.copy(libFile, libDestDirFile, true);
        }

        log.trace("Copied {} library files to lib directory", libFiles.length);
    }

    /**
     * 判断资源是否应该放在插件根目录
     *
     * @param resourceType 资源类型
     * @return 是根目录资源返回true，否则返回false
     */
    private static boolean isRootResource(PluginResourceDirectory resourceType) {
        for (PluginResourceDirectory rootResource : ROOT_RESOURCES) {
            if (rootResource == resourceType) {
                return true;
            }
        }
        return false;
    }
}
