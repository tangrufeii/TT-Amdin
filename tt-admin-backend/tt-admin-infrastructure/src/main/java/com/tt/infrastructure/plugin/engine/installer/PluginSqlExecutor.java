package com.tt.infrastructure.plugin.engine.installer;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import com.tt.common.utils.SqlExecUtils;
import com.tt.common.utils.VersionUtil;
import com.tt.domain.plugin.model.enums.PluginResourceDirectory;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.sql.SQLException;
import java.util.List;

/**
 * 插件SQL执行器
 * <p>
 * 负责执行插件生命周期中涉及的SQL脚本，包括：
 * <ul>
 *     <li>安装SQL（install.sql / install-*.sql）</li>
 *     <li>更新SQL（update-*.sql）</li>
 *     <li>卸载SQL（uninstall.sql）</li>
 * </ul>
 * </p>
 * <p>
 * SQL文件命名规范：
 * <ul>
 *     <li>安装SQL：install.sql 或 install-{version}.sql</li>
 *     <li>更新SQL：update-{fromVersion}-{toVersion}.sql</li>
 *     <li>卸载SQL：uninstall.sql</li>
 * </ul>
 * </p>
 *
 * @author trf
 * @date 2025/12/24
 */
@Slf4j
public class PluginSqlExecutor {

    /**
     * SQL文件扩展名
     */
    private static final String SQL_EXTENSION = ".sql";

    /**
     * 安装SQL文件名前缀
     */
    private static final String INSTALL_PREFIX = "install";

    /**
     * 更新SQL文件名前缀
     */
    private static final String UPDATE_PREFIX = "update-";

    /**
     * 卸载SQL文件名
     */
    private static final String UNINSTALL_FILE_NAME = "uninstall.sql";

    /**
     * 私有构造方法，防止实例化（工具类）
     */
    private PluginSqlExecutor() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * 执行插件安装SQL脚本
     * <p>
     * 执行插件sql目录下所有以"install"开头的SQL文件。
     * 通常用于插件首次安装时初始化数据库表结构。
     * </p>
     *
     * @param pluginDir 插件根目录
     * @throws SQLException SQL执行失败时抛出
     * @apiNote SQL文件路径：{pluginDir}/sql/install*.sql
     */
    public static void executeInstallSql(File pluginDir) throws SQLException {
        if (!isValidPluginDirectory(pluginDir)) {
            return;
        }

        File sqlDir = getSqlDirectory(pluginDir);
        if (!sqlDir.exists()) {
            log.debug("SQL directory does not exist, skipping install SQL execution");
            return;
        }

        File[] sqlFiles = sqlDir.listFiles();
        if (sqlFiles == null) {
            return;
        }

        int executedCount = 0;
        for (File file : sqlFiles) {
            if (isInstallSqlFile(file)) {
                executeSqlFile(file);
                executedCount++;
            }
        }

        log.info("Executed {} install SQL files for plugin", executedCount);
    }

    /**
     * 执行插件更新SQL脚本
     * <p>
     * 根据版本范围执行对应的更新SQL文件。
     * 只有文件名中的版本号在指定范围内的SQL文件才会被执行。
     * </p>
     *
     * @param pluginDir  插件根目录
     * @param oldVersion 旧版本号
     * @param newVersion 新版本号
     * @throws SQLException SQL执行失败时抛出
     * @apiNote SQL文件命名格式：update-{fromVersion}-{toVersion}.sql
     * @see VersionUtil#isWithinVersionRange(File, String, String)
     */
    public static void executeUpdateSql(File pluginDir, String oldVersion, String newVersion) throws SQLException {
        if (!isValidPluginDirectory(pluginDir)) {
            return;
        }

        File sqlDir = getSqlDirectory(pluginDir);
        if (!sqlDir.exists()) {
            log.debug("SQL directory does not exist, skipping update SQL execution");
            return;
        }

        // 筛选出需要执行的更新SQL文件
        List<File> updateSqlFiles = FileUtil.loopFiles(sqlDir)
                .stream()
                .filter(PluginSqlExecutor::isUpdateSqlFile)
                .filter(file -> VersionUtil.isWithinVersionRange(file, oldVersion, newVersion))
                .toList();

        int executedCount = 0;
        for (File file : updateSqlFiles) {
            executeSqlFile(file);
            executedCount++;
        }

        log.info("Executed {} update SQL files for version range: {} -> {}", executedCount, oldVersion, newVersion);
    }

    /**
     * 执行插件卸载SQL脚本
     * <p>
     * 执行插件sql目录下的uninstall.sql文件（如果存在）。
     * 通常用于插件卸载时清理数据库数据。
     * </p>
     *
     * @param pluginDir 插件根目录
     * @throws SQLException SQL执行失败时抛出
     * @apiNote 卸载SQL文件路径：{pluginDir}/sql/uninstall.sql
     */
    public static void executeUninstallSql(File pluginDir) throws SQLException {
        if (!isValidPluginDirectory(pluginDir)) {
            return;
        }

        File uninstallSqlFile = new File(
                pluginDir.getAbsolutePath()
                        + File.separator
                        + PluginResourceDirectory.SQL_DIR.getPath()
                        + File.separator
                        + UNINSTALL_FILE_NAME
        );

        if (!uninstallSqlFile.exists()) {
            log.debug("Uninstall SQL file does not exist, skipping uninstall SQL execution");
            return;
        }

        executeSqlFile(uninstallSqlFile);
        log.info("Executed uninstall SQL for plugin");
    }

    /**
     * 验证插件目录是否有效
     *
     * @param pluginDir 插件目录
     * @return 有效返回true，否则返回false
     */
    private static boolean isValidPluginDirectory(File pluginDir) {
        return pluginDir != null && pluginDir.exists();
    }

    /**
     * 获取插件的SQL目录
     *
     * @param pluginDir 插件根目录
     * @return SQL目录对象
     */
    private static File getSqlDirectory(File pluginDir) {
        return new File(
                pluginDir.getAbsolutePath()
                        + File.separator
                        + PluginResourceDirectory.SQL_DIR.getPath()
        );
    }

    /**
     * 判断文件是否为安装SQL文件
     * <p>
     * 安装SQL文件以"install"开头，以".sql"结尾
     * </p>
     *
     * @param file 待判断的文件
     * @return 是安装SQL文件返回true，否则返回false
     */
    private static boolean isInstallSqlFile(File file) {
        return file.isFile()
                && file.getName().endsWith(SQL_EXTENSION)
                && file.getName().startsWith(INSTALL_PREFIX);
    }

    /**
     * 判断文件是否为更新SQL文件
     * <p>
     * 更新SQL文件以"update-"开头，以".sql"结尾
     * </p>
     *
     * @param file 待判断的文件
     * @return 是更新SQL文件返回true，否则返回false
     */
    private static boolean isUpdateSqlFile(File file) {
        return file.isFile()
                && file.getName().endsWith(SQL_EXTENSION)
                && StrUtil.startWith(file.getName(), UPDATE_PREFIX);
    }

    /**
     * 执行单个SQL文件
     *
     * @param sqlFile SQL文件
     * @throws SQLException SQL执行失败时抛出
     */
    private static void executeSqlFile(File sqlFile) throws SQLException {
        log.info("Executing SQL file: {}", sqlFile.getName());
        SqlExecUtils.execSqlFile(sqlFile);
    }
}