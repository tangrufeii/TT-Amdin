package com.tt.infrastructure.plugin.engine.manager;

import cn.hutool.core.io.FileUtil;
import com.tt.common.utils.VersionUtil;
import com.tt.domain.plugin.PluginManager;
import com.tt.domain.plugin.model.aggregate.Plugin;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.constant.PluginConstant;
import com.tt.infrastructure.plugin.engine.config.PluginConfigReader;
import com.tt.infrastructure.plugin.engine.context.PluginApplicationContextHolder;
import com.tt.infrastructure.plugin.engine.copier.PluginFileCopier;
import com.tt.infrastructure.plugin.engine.extractor.PluginExtractor;
import com.tt.infrastructure.plugin.engine.handler.PluginHandler;
import com.tt.infrastructure.plugin.engine.holder.PluginHolder;
import com.tt.infrastructure.plugin.engine.installer.PluginSqlExecutor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.plugin.PluginException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.sql.SQLException;
import java.util.Optional;

/**
 * 插件管理器实现
 * <p>
 * 提供插件的高级管理功能，包括插件的安装、卸载、启动、停止等操作。
 * 是插件系统对外的主要服务入口，负责协调各个组件完成插件的生命周期管理。
 * </p>
 *
 * @author trf
 * @date 2025/12/23
 */
@Component("pluginManagerImpl")
@Slf4j
@RequiredArgsConstructor
public class PluginManagerImpl implements PluginManager {

    /**
     * 插件处理器
     */
    private final PluginHandler pluginHandler;

    /**
     * 系统版本号
     */
    @Value("${version}")
    private String systemVersion;

    /**
     * 安装插件
     * <p>
     * 处理流程：
     * <ol>
     *     <li>验证插件文件</li>
     *     <li>解压插件包</li>
     *     <li>读取插件配置</li>
     *     <li>检查版本兼容性</li>
     *     <li>判断是安装还是更新</li>
     *     <li>拷贝文件到插件目录</li>
     *     <li>调用 PluginHandler.installPlugin() 创建类加载器和上下文</li>
     *     <li>执行SQL脚本</li>
     *     <li>调用插件生命周期回调</li>
     * </ol>
     * </p>
     *
     * @param pluginFile 插件文件(ZIP格式)
     * @return 插件配置对象
     * @throws Exception 安装过程中发生错误时抛出
     */
    @Override
    public PluginConfig installPlugin(File pluginFile) throws Exception {
        // 1. 验证插件文件
        if (pluginFile == null || !pluginFile.exists()) {
            throw new PluginException("Plugin file not found!");
        }

        // 2. 解压插件包
        File pluginTempDir = PluginExtractor.extractZip(pluginFile);
        FileUtil.del(pluginFile);

        // 3. 读取插件配置
        PluginConfig pluginConfig = PluginConfigReader.readConfig(pluginTempDir);
        if (pluginConfig == null) {
            FileUtil.del(pluginTempDir);
            throw new PluginException("Failed to parse plugin.yaml!");
        }

        // 4. 检查版本兼容性
        checkVersionCompatibility(pluginConfig, pluginTempDir);

        // 5. 判断是安装还是更新
        boolean isUpdate = isPluginUpdate(pluginConfig);

        // 6. 如果是更新，先停止插件
        if (isUpdate && PluginHolder.getPluginInfo(pluginConfig.getPlugin().getId()) != null) {
            pluginHandler.stopPlugin(pluginConfig.getPlugin().getId());
        }

        // 7. 拷贝文件到插件目录
        File pluginDir = PluginFileCopier.copyTempToPlugin(pluginTempDir, pluginConfig);
        FileUtil.del(pluginTempDir);

        // 8. 安装插件（创建类加载器和上下文）
        pluginHandler.installPlugin(pluginDir);

        // 9. 执行SQL和生命周期回调
        if (isUpdate) {
            handleUpdate(pluginDir, pluginConfig);
        } else {
            handleInstall(pluginDir, pluginConfig);
        }

        return pluginConfig;
    }

    /**
     * 启动插件
     *
     * @param pluginId 插件ID
     */
    @Override
    public void startPlugin(String pluginId) {
        try {
            pluginHandler.startPlugin(pluginId);
            log.info("Plugin started successfully: {}", pluginId);
        } catch (Exception e) {
            log.error("Failed to start plugin: {}", pluginId, e);
            throw new RuntimeException("Failed to start plugin: " + pluginId, e);
        }
    }

    /**
     * 停止插件
     *
     * @param pluginId 插件ID
     */
    @Override
    public void stopPlugin(String pluginId) {
        try {
            pluginHandler.stopPlugin(pluginId);
            log.info("Plugin stopped successfully: {}", pluginId);
        } catch (Exception e) {
            log.error("Failed to stop plugin: {}", pluginId, e);
        }
    }

    /**
     * 卸载插件
     *
     * @param pluginId 插件ID
     * @throws Exception 卸载过程中发生错误时抛出
     */
    @Override
    public void uninstallPlugin(String pluginId) throws Exception {
        Optional<File> pluginDir = getPluginDirById(pluginId);

        // 调用 Handler 卸载插件（清理内存资源）
        pluginHandler.uninstallPlugin(pluginId);

        // 执行卸载SQL并删除文件
        pluginDir.ifPresent(dir -> {
            try {
                PluginSqlExecutor.executeUninstallSql(dir);
                FileUtil.del(dir);
                log.info("Plugin files deleted: {}", pluginId);
            } catch (SQLException e) {
                log.error("Failed to execute uninstall SQL for plugin: {}", pluginId, e);
            }
        });

        log.info("Plugin uninstalled successfully: {}", pluginId);
    }

    /**
     * 检查插件版本兼容性
     *
     * @param pluginConfig    插件配置
     * @param pluginTempDir 临时插件目录
     * @throws PluginException 版本不兼容时抛出
     */
    private void checkVersionCompatibility(PluginConfig pluginConfig, File pluginTempDir) {
        String minimalVersion = pluginConfig.getPlugin().getMinimalVersion();
        if (VersionUtil.versionToLong(minimalVersion) > VersionUtil.versionToLong(systemVersion)) {
            FileUtil.del(pluginTempDir);
            throw new PluginException("Plugin installation failed: This plugin requires TT-Admin version "
                    + minimalVersion + " or higher");
        }
    }

    /**
     * 判断是否为插件更新
     *
     * @param pluginConfig 插件配置
     * @return 是更新返回true，否则返回false
     * @throws PluginException 版本检查失败时抛出
     */
    private boolean isPluginUpdate(PluginConfig pluginConfig) {
        PluginConfig installedConfig = PluginConfigReader.readInstalledConfig(pluginConfig.getPlugin().getId());

        if (installedConfig == null) {
            return false;
        }

        long oldVersion = VersionUtil.versionToLong(installedConfig.getPlugin().getVersion());
        long newVersion = VersionUtil.versionToLong(pluginConfig.getPlugin().getVersion());

        if (oldVersion == newVersion) {
            throw new PluginException("Plugin installation failed: This version is already installed");
        }

        if (oldVersion > newVersion) {
            throw new PluginException("Plugin installation failed: A higher version is already installed");
        }

        return true;
    }

    /**
     * 处理插件安装
     *
     * @param pluginDir    插件目录
     * @param pluginConfig 插件配置
     * @throws SQLException SQL执行失败时抛出
     */
    private void handleInstall(File pluginDir, PluginConfig pluginConfig) throws SQLException {
        PluginSqlExecutor.executeInstallSql(pluginDir);

        // 调用插件的 onInstall 生命周期方法
        var lifecycleBean = PluginApplicationContextHolder.getPluginBean(
                pluginConfig.getPlugin().getId(), com.tt.plugin.core.BasePluginLifecycle.class);
        if (lifecycleBean != null) {
            lifecycleBean.onInstall();
        }

        pluginConfig.setStatus(PluginConstant.PLUGIN_STATUS_DISABLE);
        log.info("Plugin installed: {}", pluginConfig.getPlugin().getId());
    }

    /**
     * 处理插件更新
     *
     * @param pluginDir    插件目录
     * @param pluginConfig 插件配置
     * @throws SQLException SQL执行失败时抛出
     */
    private void handleUpdate(File pluginDir, PluginConfig pluginConfig) throws SQLException {
        PluginConfig installedConfig = PluginConfigReader.readInstalledConfig(pluginConfig.getPlugin().getId());

        PluginSqlExecutor.executeUpdateSql(pluginDir,
                installedConfig.getPlugin().getVersion(),
                pluginConfig.getPlugin().getVersion());

        // 调用插件的 onUpdate 生命周期方法
        var lifecycleBean = PluginApplicationContextHolder.getPluginBean(
                pluginConfig.getPlugin().getId(), com.tt.plugin.core.BasePluginLifecycle.class);
        if (lifecycleBean != null) {
            lifecycleBean.onUpdate();
        }

        pluginConfig.setStatus(PluginConstant.PLUGIN_STATUS_ENABLE);
        log.info("Plugin updated: {} from {} to {}",
                pluginConfig.getPlugin().getId(),
                installedConfig.getPlugin().getVersion(),
                pluginConfig.getPlugin().getVersion());
    }

    /**
     * 根据插件ID获取插件目录
     *
     * @param pluginId 插件ID
     * @return 插件目录的Optional包装
     */
    private Optional<File> getPluginDirById(String pluginId) {
        File pluginDir = new File(
                com.tt.domain.plugin.model.enums.PluginDirectory.PLUGIN_DIRECTORY.getPath()
                        + File.separator + pluginId
        );

        return Optional.of(pluginDir).filter(File::exists);
    }
}