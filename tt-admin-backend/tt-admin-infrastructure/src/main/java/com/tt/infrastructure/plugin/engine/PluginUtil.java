package com.tt.infrastructure.plugin.engine;

import com.tt.domain.plugin.model.aggregate.Plugin;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.infrastructure.plugin.engine.config.PluginConfigReader;
import com.tt.infrastructure.plugin.engine.context.PluginApplicationContextHolder;
import com.tt.infrastructure.plugin.engine.copier.PluginFileCopier;
import com.tt.infrastructure.plugin.engine.extractor.PluginExtractor;
import com.tt.infrastructure.plugin.engine.holder.PluginHolder;
import com.tt.infrastructure.plugin.engine.installer.PluginSqlExecutor;
import com.tt.infrastructure.plugin.engine.scanner.PluginClassScanner;
import com.tt.infrastructure.plugin.engine.scanner.PluginMapperScanner;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

/**
 * 插件工具类（门面类）
 * <p>
 * 作为插件操作的门面入口，统一管理插件的读取、解压、扫描、安装等操作。
 * 内部委托给专门的处理类完成具体功能。
 * </p>
 *
 * <h3>功能模块</h3>
 * <ul>
 *     <li>{@link PluginConfigReader} - 配置读取</li>
 *     <li>{@link PluginExtractor} - 文件解压</li>
 *     <li>{@link PluginClassScanner} - 类扫描</li>
 *     <li>{@link PluginMapperScanner} - Mapper扫描</li>
 *     <li>{@link PluginSqlExecutor} - SQL执行</li>
 *     <li>{@link PluginFileCopier} - 文件拷贝</li>
 *     <li>{@link PluginHolder} - 运行时状态管理</li>
 *     <li>{@link PluginApplicationContextHolder} - Spring上下文管理</li>
 * </ul>
 *
 * @author trf
 * @date 2025/12/23
 */
@Slf4j
public class PluginUtil {

    /**
     * 私有构造方法，防止实例化
     */
    private PluginUtil() {
    }

    // ==================== 配置读取相关方法 ====================

    /**
     * 获取插件配置信息
     *
     * @param pluginSourceDir 插件资源目录
     * @return 插件配置对象
     * @see PluginConfigReader#readConfig(File)
     */
    public static PluginConfig getPluginConfig(File pluginSourceDir) {
        return PluginConfigReader.readConfig(pluginSourceDir);
    }

    /**
     * 根据插件ID获取已安装插件的配置
     *
     * @param pluginId 插件唯一标识符
     * @return 插件配置对象
     * @see PluginConfigReader#readInstalledConfig(String)
     */
    public static PluginConfig getInstalledPluginConfig(String pluginId) {
        return PluginConfigReader.readInstalledConfig(pluginId);
    }

    /**
     * 获取开发环境插件的配置
     *
     * @param pluginPath 开发环境插件路径
     * @return 插件配置对象
     * @see PluginConfigReader#readDevConfig(String)
     */
    public static PluginConfig getDevPluginConfig(String pluginPath) {
        return PluginConfigReader.readDevConfig(pluginPath);
    }

    // ==================== 文件解压相关方法 ====================

    /**
     * 解压JAR格式的插件
     *
     * @param srcJarFile 源JAR文件
     * @param destFile   目标目录
     * @throws Exception 解压过程中发生I/O错误时抛出
     * @see PluginExtractor#extractJar(File, File)
     */
    public static void extractJarPlugin(File srcJarFile, File destFile) throws Exception {
        PluginExtractor.extractJar(srcJarFile, destFile);
    }

    /**
     * 解压ZIP格式的插件包
     *
     * @param pluginFile ZIP格式的插件文件
     * @return 解压后的插件目录
     * @throws Exception 解压过程中发生I/O错误时抛出
     * @see PluginExtractor#extractZip(File)
     */
    public static File extractZipPlugin(File pluginFile) throws Exception {
        return PluginExtractor.extractZip(pluginFile);
    }

    // ==================== 类扫描相关方法 ====================

    /**
     * 获取插件中所有的Class集合
     *
     * @param pluginDir   插件目录
     * @param classLoader 插件类加载器
     * @return 加载的类对象列表
     * @see PluginClassScanner#scanClasses(File, ClassLoader)
     */
    public static List<Class<?>> getClassList(File pluginDir, ClassLoader classLoader) {
        return PluginClassScanner.scanClasses(pluginDir, classLoader);
    }

    // ==================== Mapper扫描相关方法 ====================

    /**
     * 获取插件中所有的Mapper XML文件
     *
     * @param pluginDir        插件目录
     * @param pluginBaseConfig 插件配置对象
     * @return 匹配的Mapper XML文件列表
     * @see PluginMapperScanner#scanMapperFiles(File, PluginConfig)
     */
    public static List<File> getMapperXml(File pluginDir, PluginConfig pluginBaseConfig) {
        return PluginMapperScanner.scanMapperFiles(pluginDir, pluginBaseConfig);
    }

    /**
     * 获取插件中所有的Mapper XML文件路径
     *
     * @param pluginDir        插件目录
     * @param pluginBaseConfig 插件配置对象
     * @return 匹配的Mapper XML文件绝对路径列表
     * @see PluginMapperScanner#scanMapperPaths(File, PluginConfig)
     */
    public static List<String> getMapperXmlPath(File pluginDir, PluginConfig pluginBaseConfig) {
        return PluginMapperScanner.scanMapperPaths(pluginDir, pluginBaseConfig);
    }

    // ==================== 文件拷贝相关方法 ====================

    /**
     * 将开发环境的插件拷贝到插件目录
     *
     * @param devPluginDir  开发环境插件目录
     * @param pluginBaseDir 插件基础目录
     * @return 拷贝后的插件目录
     * @see PluginFileCopier#copyDevPlugin(String, String)
     */
    public static File devCopyPluginToPluginDir(String devPluginDir, String pluginBaseDir) {
        return PluginFileCopier.copyDevPlugin(devPluginDir, pluginBaseDir);
    }

    /**
     * 将临时插件目录拷贝到正式插件目录
     *
     * @param pluginTempDir 临时插件目录
     * @param pluginConfig  插件配置对象
     * @return 拷贝后的插件目录
     * @see PluginFileCopier#copyTempToPlugin(File, PluginConfig)
     */
    public static File copyPluginTempToPlugin(File pluginTempDir, PluginConfig pluginConfig) {
        return PluginFileCopier.copyTempToPlugin(pluginTempDir, pluginConfig);
    }

    // ==================== SQL执行相关方法 ====================

    /**
     * 执行插件安装SQL脚本
     *
     * @param pluginDir 插件目录
     * @throws SQLException SQL执行失败时抛出
     * @see PluginSqlExecutor#executeInstallSql(File)
     */
    public static void execPluginInstallSql(File pluginDir) throws SQLException {
        PluginSqlExecutor.executeInstallSql(pluginDir);
    }

    /**
     * 执行插件更新SQL脚本
     *
     * @param pluginDir  插件目录
     * @param oldVersion 旧版本号
     * @param newVersion 新版本号
     * @throws SQLException SQL执行失败时抛出
     * @see PluginSqlExecutor#executeUpdateSql(File, String, String)
     */
    public static void execPluginUpdateSql(File pluginDir, String oldVersion, String newVersion) throws SQLException {
        PluginSqlExecutor.executeUpdateSql(pluginDir, oldVersion, newVersion);
    }

    /**
     * 执行插件卸载SQL脚本
     *
     * @param pluginDir 插件目录
     * @throws SQLException SQL执行失败时抛出
     * @see PluginSqlExecutor#executeUninstallSql(File)
     */
    public static void execPluginUnInstallSql(File pluginDir) throws SQLException {
        PluginSqlExecutor.executeUninstallSql(pluginDir);
    }

    // ==================== 插件运行时相关方法 ====================

    /**
     * 根据插件ID获取插件目录
     *
     * @param pluginId 插件ID
     * @return 插件目录的Optional包装
     */
    public static Optional<File> getPluginDirByID(String pluginId) {
        File pluginDirFile = new File(
                PluginDirectory.PLUGIN_DIRECTORY.getPath()
                        + File.separator
                        + pluginId
        );

        return Optional.of(pluginDirFile)
                .filter(File::exists)
                .filter(file -> PluginHolder.getPluginInfo(pluginId) != null)
                .or(() -> {
                    log.error("Plugin not found: {}", pluginId);
                    return Optional.empty();
                });
    }

    /**
     * 根据插件ID获取插件信息
     *
     * @param pluginId 插件ID
     * @return 插件信息的Optional包装
     */
    public static Optional<Plugin> getPluginInfoByID(String pluginId) {
        return PluginHolder.getPluginInfoByID(pluginId);
    }

    /**
     * 根据插件ID获取插件信息（直接返回）
     *
     * @param pluginId 插件ID
     * @return 插件信息，不存在时返回null
     */
    public static Plugin getPluginInfo(String pluginId) {
        return PluginHolder.getPluginInfo(pluginId);
    }

    /**
     * 检查插件是否已加载
     *
     * @param pluginId 插件ID
     * @return 已加载返回true，否则返回false
     */
    public static boolean isPluginLoaded(String pluginId) {
        return PluginHolder.containsPlugin(pluginId);
    }

    /**
     * 获取插件内的Bean
     *
     * @param pluginId 插件ID
     * @param clazz    Bean类型
     * @param <T>      Bean类型泛型
     * @return Bean实例
     */
    public static <T> T getPluginBean(String pluginId, Class<T> clazz) {
        return PluginApplicationContextHolder.getPluginBean(pluginId, clazz);
    }
}