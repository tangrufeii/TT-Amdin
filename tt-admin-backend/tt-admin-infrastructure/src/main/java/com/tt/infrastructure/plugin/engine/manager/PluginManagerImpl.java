package com.tt.infrastructure.plugin.engine.manager;

import cn.hutool.core.io.FileUtil;
import com.tt.common.utils.VersionUtil;
import com.tt.domain.plugin.PluginManager;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.constant.PluginConstant;
import com.tt.domain.plugin.progress.PluginProgress;
import com.tt.domain.plugin.progress.PluginProgressContext;
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

@Component("pluginManagerImpl")
@Slf4j
@RequiredArgsConstructor
public class PluginManagerImpl implements PluginManager {

    private static final String ACTION_INSTALL = "INSTALL";
    private static final String ACTION_ENABLE = "ENABLE";
    private static final String ACTION_DISABLE = "DISABLE";
    private static final String ACTION_UNINSTALL = "UNINSTALL";
    private static final String INSTALL_PENDING_MARKER = ".install-pending";

    private final PluginHandler pluginHandler;

    @Value("${version}")
    private String systemVersion;

    @Value("${tt.plugin.install.lazy-init:false}")
    private boolean lazyInitOnInstall;

    @Override
    public PluginConfig installPlugin(File pluginFile) throws Exception {
        reportProgress(ACTION_INSTALL, null, "validate", 5, "Validating plugin file");
        if (pluginFile == null || !pluginFile.exists()) {
            throw new PluginException("Plugin file not found!");
        }

        reportProgress(ACTION_INSTALL, null, "extract", 15, "Extracting plugin package");
        File pluginTempDir = PluginExtractor.extractZip(pluginFile);
        FileUtil.del(pluginFile);

        reportProgress(ACTION_INSTALL, null, "read_config", 25, "Reading plugin configuration");
        PluginConfig pluginConfig = PluginConfigReader.readConfig(pluginTempDir);
        if (pluginConfig == null) {
            FileUtil.del(pluginTempDir);
            throw new PluginException("Failed to parse plugin.yaml!");
        }
        String pluginId = pluginConfig.getPlugin().getId();
        reportProgress(ACTION_INSTALL, pluginId, "read_config", 28, "Plugin configuration loaded");

        reportProgress(ACTION_INSTALL, pluginId, "check_version", 35, "Checking version compatibility");
        checkVersionCompatibility(pluginConfig, pluginTempDir);

        boolean isUpdate = isPluginUpdate(pluginConfig);

        if (isUpdate && PluginHolder.getPluginInfo(pluginId) != null) {
            reportProgress(ACTION_INSTALL, pluginId, "stop_old", 45, "Stopping existing plugin");
            pluginHandler.stopPlugin(pluginId);
        }

        File pluginDir = null;
        try {
            reportProgress(ACTION_INSTALL, pluginId, "copy_files", 55, "Copying plugin files");
            pluginDir = PluginFileCopier.copyTempToPlugin(pluginTempDir, pluginConfig);
            FileUtil.del(pluginTempDir);

            boolean lazyInstall = lazyInitOnInstall && !isUpdate;
            if (!lazyInstall) {
                reportProgress(ACTION_INSTALL, pluginId, "install_context", 70, "Installing plugin context");
                pluginHandler.installPlugin(pluginDir);
            } else {
                reportProgress(ACTION_INSTALL, pluginId, "defer_context", 70, "Deferring plugin context initialization");
            }

            if (isUpdate) {
                reportProgress(ACTION_INSTALL, pluginId, "execute_sql", 85, "Executing update SQL");
                handleUpdate(pluginDir, pluginConfig);
            } else {
                reportProgress(ACTION_INSTALL, pluginId, "execute_sql", 85, "Executing install SQL");
                handleInstall(pluginDir, pluginConfig, !lazyInstall);
                if (lazyInstall) {
                    createInstallPendingMarker(pluginDir);
                }
            }
        } catch (Exception ex) {
            try {
                pluginHandler.uninstallPlugin(pluginId);
            } catch (Exception e) {
                log.warn("Failed to cleanup plugin context after install error: {}", pluginId, e);
            }
            if (!isUpdate && pluginDir != null) {
                FileUtil.del(pluginDir);
            }
            throw ex;
        }

        return pluginConfig;
    }

    @Override
    public void startPlugin(String pluginId) {
        try {
            reportProgress(ACTION_ENABLE, pluginId, "start", 10, "Starting plugin");
            if (!PluginHolder.containsPlugin(pluginId)) {
                reportProgress(ACTION_ENABLE, pluginId, "install_context", 20, "Preparing plugin context");
                File pluginDir = getPluginDirById(pluginId)
                        .orElseThrow(() -> new PluginException("Plugin directory not found: " + pluginId));
                pluginHandler.installPlugin(pluginDir, ACTION_ENABLE);
                runPendingInstallLifecycle(pluginId);
            }
            pluginHandler.startPlugin(pluginId);
            reportProgress(ACTION_ENABLE, pluginId, "complete", 100, "Plugin started");
            log.info("Plugin started successfully: {}", pluginId);
        } catch (Exception e) {
            log.error("Failed to start plugin: {}", pluginId, e);
            throw new RuntimeException("Failed to start plugin: " + pluginId, e);
        }
    }

    @Override
    public void stopPlugin(String pluginId) {
        try {
            reportProgress(ACTION_DISABLE, pluginId, "stop", 10, "Stopping plugin");
            pluginHandler.stopPlugin(pluginId);
            reportProgress(ACTION_DISABLE, pluginId, "complete", 100, "Plugin stopped");
            log.info("Plugin stopped successfully: {}", pluginId);
        } catch (Exception e) {
            log.error("Failed to stop plugin: {}", pluginId, e);
        }
    }

    @Override
    public void uninstallPlugin(String pluginId) throws Exception {
        Optional<File> pluginDir = getPluginDirById(pluginId);

        reportProgress(ACTION_UNINSTALL, pluginId, "uninstall", 20, "Uninstalling plugin");
        pluginHandler.uninstallPlugin(pluginId);

        pluginDir.ifPresent(dir -> {
            try {
                reportProgress(ACTION_UNINSTALL, pluginId, "execute_sql", 60, "Executing uninstall SQL");
                PluginSqlExecutor.executeUninstallSql(dir);
                FileUtil.del(dir);
                log.info("Plugin files deleted: {}", pluginId);
            } catch (SQLException e) {
                log.error("Failed to execute uninstall SQL for plugin: {}", pluginId, e);
            }
        });

        log.info("Plugin uninstalled successfully: {}", pluginId);
    }

    private void checkVersionCompatibility(PluginConfig pluginConfig, File pluginTempDir) {
        String minimalVersion = pluginConfig.getPlugin().getMinimalVersion();
        if (VersionUtil.versionToLong(minimalVersion) > VersionUtil.versionToLong(systemVersion)) {
            FileUtil.del(pluginTempDir);
            throw new PluginException("Plugin installation failed: This plugin requires TT-Admin version "
                    + minimalVersion + " or higher");
        }
    }

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

    private void handleInstall(File pluginDir, PluginConfig pluginConfig, boolean runLifecycle) throws SQLException {
        PluginSqlExecutor.executeInstallSql(pluginDir);

        if (runLifecycle) {
            reportProgress(ACTION_INSTALL, pluginConfig.getPlugin().getId(), "lifecycle", 95, "Running install lifecycle");
            var lifecycleBean = PluginApplicationContextHolder.getPluginBean(
                    pluginConfig.getPlugin().getId(), com.tt.plugin.core.BasePluginLifecycle.class);
            if (lifecycleBean != null) {
                lifecycleBean.onInstall();
            }
            clearInstallPendingMarker(pluginConfig.getPlugin().getId());
        }

        pluginConfig.setStatus(PluginConstant.PLUGIN_STATUS_DISABLE);
        log.info("Plugin installed: {}", pluginConfig.getPlugin().getId());
    }

    private void handleUpdate(File pluginDir, PluginConfig pluginConfig) throws SQLException {
        PluginConfig installedConfig = PluginConfigReader.readInstalledConfig(pluginConfig.getPlugin().getId());

        PluginSqlExecutor.executeUpdateSql(pluginDir,
                installedConfig.getPlugin().getVersion(),
                pluginConfig.getPlugin().getVersion());

        reportProgress(ACTION_INSTALL, pluginConfig.getPlugin().getId(), "lifecycle", 95, "Running update lifecycle");
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

    private Optional<File> getPluginDirById(String pluginId) {
        File pluginDir = new File(
                com.tt.domain.plugin.model.enums.PluginDirectory.PLUGIN_DIRECTORY.getPath()
                        + File.separator + pluginId
        );

        return Optional.of(pluginDir).filter(File::exists);
    }

    private void createInstallPendingMarker(File pluginDir) {
        if (pluginDir == null) {
            return;
        }
        File marker = new File(pluginDir, INSTALL_PENDING_MARKER);
        try {
            if (!marker.exists()) {
                FileUtil.touch(marker);
            }
        } catch (Exception e) {
            log.debug("Failed to create install pending marker", e);
        }
    }

    private boolean isInstallPending(String pluginId) {
        return getPluginDirById(pluginId)
                .map(dir -> new File(dir, INSTALL_PENDING_MARKER))
                .map(File::exists)
                .orElse(false);
    }

    private void clearInstallPendingMarker(String pluginId) {
        getPluginDirById(pluginId)
                .map(dir -> new File(dir, INSTALL_PENDING_MARKER))
                .filter(File::exists)
                .ifPresent(FileUtil::del);
    }

    private void runPendingInstallLifecycle(String pluginId) {
        if (!isInstallPending(pluginId)) {
            return;
        }
        reportProgress(ACTION_ENABLE, pluginId, "lifecycle_install", 35, "Running install lifecycle");
        var lifecycleBean = PluginApplicationContextHolder.getPluginBean(
                pluginId, com.tt.plugin.core.BasePluginLifecycle.class);
        if (lifecycleBean != null) {
            lifecycleBean.onInstall();
        }
        clearInstallPendingMarker(pluginId);
    }

    private void reportProgress(String action, String pluginId, String stage, int progress, String message) {
        PluginProgressContext.report(new PluginProgress(pluginId, action, stage, progress, message));
    }

    @Override
    public boolean isPluginStarted(String pluginId) {
        if (pluginId == null || pluginId.isBlank()) {
            return false;
        }
        return PluginHolder.containsPlugin(pluginId);
    }
}
