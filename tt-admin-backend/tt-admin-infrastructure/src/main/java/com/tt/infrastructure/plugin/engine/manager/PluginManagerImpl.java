package com.tt.infrastructure.plugin.engine.manager;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IORuntimeException;
import com.tt.common.utils.VersionUtil;
import com.tt.domain.extension.model.manifest.ExtensionManifest;
import com.tt.domain.plugin.PluginManager;
import com.tt.domain.plugin.model.aggregate.Plugin;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.constant.PluginConstant;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.progress.PluginProgress;
import com.tt.domain.plugin.progress.PluginProgressContext;
import com.tt.infrastructure.plugin.engine.context.PluginApplicationContextHolder;
import com.tt.infrastructure.plugin.engine.copier.PluginFileCopier;
import com.tt.infrastructure.plugin.engine.extractor.PluginExtractor;
import com.tt.infrastructure.plugin.engine.handler.PluginHandler;
import com.tt.infrastructure.plugin.engine.holder.PluginHolder;
import com.tt.infrastructure.plugin.engine.installer.PluginSqlExecutor;
import com.tt.infrastructure.plugin.engine.scanner.PluginClassMetadataCache;
import com.tt.infrastructure.extension.manifest.ExtensionManifestCompatMapper;
import com.tt.infrastructure.extension.manifest.ExtensionManifestReader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.plugin.PluginException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.net.URLClassLoader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
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

        reportProgress(ACTION_INSTALL, null, "read_manifest", 25, "Reading extension manifest");
        ExtensionManifest manifest = ExtensionManifestReader.readManifest(pluginTempDir).orElse(null);
        if (manifest == null) {
            FileUtil.del(pluginTempDir);
            throw new PluginException("Failed to parse extension manifest!");
        }
        PluginConfig pluginConfig = ExtensionManifestCompatMapper.toPluginConfig(manifest);
        if (pluginConfig == null || pluginConfig.getPlugin() == null) {
            FileUtil.del(pluginTempDir);
            throw new PluginException("Failed to project plugin config from extension manifest!");
        }
        String pluginId = manifest.getExtension().getId();
        reportProgress(ACTION_INSTALL, pluginId, "read_manifest", 28, "Extension manifest loaded");

        ExtensionManifest installedManifest = null;
        boolean isUpdate = false;
        boolean oldRuntimeLoaded = false;
        boolean oldRuntimeReleased = false;
        boolean newRuntimeInstalled = false;
        File backupDir = null;
        File pluginDir = null;
        try {
            reportProgress(ACTION_INSTALL, pluginId, "check_version", 35, "Checking version compatibility");
            checkVersionCompatibility(manifest, pluginTempDir);

            installedManifest = ExtensionManifestReader.readInstalledManifest(pluginId).orElse(null);
            isUpdate = isPluginUpdate(manifest, installedManifest);
            oldRuntimeLoaded = isUpdate && PluginHolder.getPluginInfo(pluginId) != null;

            if (isUpdate) {
                backupDir = backupInstalledPlugin(pluginId);
            }

            if (oldRuntimeLoaded) {
                reportProgress(ACTION_INSTALL, pluginId, "stop_old", 45, "Stopping existing plugin");
                pluginHandler.stopPlugin(pluginId);
                reportProgress(ACTION_INSTALL, pluginId, "release_old", 50, "Releasing existing plugin runtime");
                releasePluginRuntime(pluginId);
                oldRuntimeReleased = true;
            }

            reportProgress(ACTION_INSTALL, pluginId, "copy_files", 55, "Copying plugin files");
            preparePluginDirectoryForCopy(pluginId, isUpdate);
            pluginDir = copyPluginFilesWithRetry(pluginTempDir, pluginConfig, isUpdate);
            if (pluginDir == null) {
                throw new PluginException("Failed to copy plugin files");
            }
            FileUtil.del(pluginTempDir);

            boolean lazyInstall = lazyInitOnInstall && !isUpdate;
            if (!lazyInstall) {
                reportProgress(ACTION_INSTALL, pluginId, "install_context", 70, "Installing plugin context");
                pluginHandler.installPlugin(pluginDir);
                newRuntimeInstalled = true;
            } else {
                reportProgress(ACTION_INSTALL, pluginId, "defer_context", 70, "Deferring plugin context initialization");
            }

            if (isUpdate) {
                reportProgress(ACTION_INSTALL, pluginId, "execute_sql", 85, "Executing update SQL");
                handleUpdate(pluginDir, pluginConfig, installedManifest);
            } else {
                reportProgress(ACTION_INSTALL, pluginId, "execute_sql", 85, "Executing install SQL");
                handleInstall(pluginDir, pluginConfig, !lazyInstall);
                if (lazyInstall) {
                    createInstallPendingMarker(pluginDir);
                }
            }
        } catch (Exception ex) {
            if (newRuntimeInstalled) {
                releasePluginRuntime(pluginId);
            }
            if (isUpdate) {
                restoreInstalledPlugin(pluginId, backupDir, oldRuntimeReleased);
            }
            try {
                FileUtil.del(pluginTempDir);
            } catch (Exception e) {
                log.warn("Failed to cleanup plugin temp directory after install error: {}", pluginId, e);
            }
            if (!isUpdate && pluginDir != null) {
                FileUtil.del(pluginDir);
            }
            throw ex;
        } finally {
            if (backupDir != null && backupDir.exists()) {
                FileUtil.del(backupDir);
            }
        }

        return pluginConfig;
    }

    /**
     * Retry file copy on Windows file-lock race during update.
     */
    private File copyPluginFilesWithRetry(File pluginTempDir, PluginConfig pluginConfig, boolean isUpdate) {
        int maxAttempts = isUpdate ? 3 : 1;
        IORuntimeException lastCopyError = null;

        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return PluginFileCopier.copyTempToPlugin(pluginTempDir, pluginConfig);
            } catch (IORuntimeException ex) {
                lastCopyError = ex;
                if (attempt >= maxAttempts) {
                    break;
                }
                log.warn("Plugin file copy failed, retrying... attempt={}/{}", attempt, maxAttempts, ex);
                try {
                    Thread.sleep(300L * attempt);
                } catch (InterruptedException interruptedException) {
                    Thread.currentThread().interrupt();
                    throw new PluginException("Interrupted while retrying plugin file copy", interruptedException);
                }
            }
        }

        if (lastCopyError != null) {
            throw lastCopyError;
        }
        return null;
    }

    /**
     * Release plugin runtime resources before file replacement or after a failed install.
     * This avoids jar file lock on Windows and does not execute uninstall SQL.
     */
    private void releasePluginRuntime(String pluginId) {
        Plugin plugin = PluginHolder.getPluginInfo(pluginId);
        if (plugin == null) {
            return;
        }

        URLClassLoader pluginClassLoader = plugin.getPluginClassLoader();
        PluginApplicationContextHolder.removePluginApplicationContext(pluginId);
        PluginHolder.removePluginInfo(pluginId);
        PluginClassMetadataCache.remove(pluginId);
        plugin.setPluginConfig(null);
        plugin.setExtensionManifest(null);
        plugin.setClassList(null);
        plugin.setClassNameList(null);
        plugin.setRuntimeCodeStamp(null);
        plugin.setPluginClassLoader(null);

        if (pluginClassLoader != null) {
            try {
                pluginClassLoader.close();
            } catch (Exception ex) {
                log.warn("Failed to close plugin classloader before update: {}", pluginId, ex);
            }
        }
    }

    @Override
    public void startPlugin(String pluginId) {
        try {
            reportProgress(ACTION_ENABLE, pluginId, "start", 10, "Starting plugin");
            File pluginDir = getPluginDirById(pluginId)
                    .orElseThrow(() -> new PluginException("Plugin directory not found: " + pluginId));
            if (isRuntimeExpired(pluginId, pluginDir)) {
                log.info("Plugin runtime expired, reloading plugin: {}", pluginId);
                releasePluginRuntime(pluginId);
            }
            if (!PluginHolder.containsPlugin(pluginId)) {
                reportProgress(ACTION_ENABLE, pluginId, "install_context", 20, "Preparing plugin context");
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

    private void checkVersionCompatibility(ExtensionManifest manifest, File pluginTempDir) {
        String minimalVersion = manifest.getCompatibility() != null && manifest.getCompatibility().getHost() != null
                ? manifest.getCompatibility().getHost().getMinVersion()
                : null;
        if (minimalVersion != null && VersionUtil.compareVersion(minimalVersion, systemVersion) > 0) {
            FileUtil.del(pluginTempDir);
            throw new PluginException("Plugin installation failed: This plugin requires TT-Admin version "
                    + minimalVersion + " or higher");
        }
    }

    private boolean isPluginUpdate(ExtensionManifest manifest, ExtensionManifest installedManifest) {
        if (installedManifest == null) {
            return false;
        }

        int versionCompare = VersionUtil.compareVersion(
                installedManifest.getExtension().getVersion(),
                manifest.getExtension().getVersion()
        );
        log.info("Plugin version check: pluginId={}, installedVersion={}, packageVersion={}",
                manifest.getExtension().getId(),
                installedManifest.getExtension().getVersion(),
                manifest.getExtension().getVersion());

        if (versionCompare == 0) {
            throw new PluginException("Plugin installation failed: This version is already installed");
        }

        if (versionCompare > 0) {
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

    private void handleUpdate(File pluginDir, PluginConfig pluginConfig, ExtensionManifest installedManifest) throws SQLException {
        if (installedManifest == null || installedManifest.getExtension() == null) {
            throw new PluginException("Installed manifest not found: " + pluginConfig.getPlugin().getId());
        }

        PluginSqlExecutor.executeUpdateSql(pluginDir,
                installedManifest.getExtension().getVersion(),
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
                installedManifest.getExtension().getVersion(),
                pluginConfig.getPlugin().getVersion());
    }

    private void preparePluginDirectoryForCopy(String pluginId, boolean isUpdate) {
        if (!isUpdate) {
            return;
        }
        getPluginDirById(pluginId)
                .filter(File::exists)
                .ifPresent(FileUtil::del);
    }

    private File backupInstalledPlugin(String pluginId) {
        Optional<File> pluginDir = getPluginDirById(pluginId);
        if (pluginDir.isEmpty()) {
            return null;
        }
        File backupDir = new File(
                PluginDirectory.TEMP_DIRECTORY.getPath(),
                ".plugin-backup-" + pluginId + "-" + System.currentTimeMillis()
        );
        try {
            copyDirectory(pluginDir.get().toPath(), backupDir.toPath());
            return backupDir;
        } catch (IOException ex) {
            FileUtil.del(backupDir);
            throw new PluginException("Failed to backup installed plugin before update: " + pluginId, ex);
        }
    }

    private void restoreInstalledPlugin(String pluginId, File backupDir, boolean restoreRuntime) {
        if (backupDir == null || !backupDir.exists()) {
            return;
        }
        File pluginDir = new File(
                PluginDirectory.PLUGIN_DIRECTORY.getPath()
                        + File.separator + pluginId
        );
        try {
            if (pluginDir.exists()) {
                FileUtil.del(pluginDir);
            }
            copyDirectory(backupDir.toPath(), pluginDir.toPath());
            if (restoreRuntime) {
                pluginHandler.installPlugin(pluginDir);
            }
            log.warn("Plugin update failed, restored previous files: {}", pluginId);
        } catch (Exception restoreEx) {
            log.error("Failed to restore previous plugin after update failure: {}", pluginId, restoreEx);
        }
    }

    private void copyDirectory(Path sourceDir, Path targetDir) throws IOException {
        try (var paths = Files.walk(sourceDir)) {
            for (Path source : paths.toList()) {
                Path target = targetDir.resolve(sourceDir.relativize(source));
                if (Files.isDirectory(source)) {
                    Files.createDirectories(target);
                } else {
                    Files.createDirectories(target.getParent());
                    Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
                }
            }
        }
    }

    private Optional<File> getPluginDirById(String pluginId) {
        File pluginDir = new File(
                com.tt.domain.plugin.model.enums.PluginDirectory.PLUGIN_DIRECTORY.getPath()
                        + File.separator + pluginId
        );

        return Optional.of(pluginDir).filter(File::exists);
    }

    private boolean isRuntimeExpired(String pluginId, File pluginDir) {
        Plugin plugin = PluginHolder.getPluginInfo(pluginId);
        if (plugin == null || pluginDir == null || !pluginDir.exists()) {
            return false;
        }
        long currentStamp = calculateRuntimeCodeStamp(pluginDir);
        Long runtimeStamp = plugin.getRuntimeCodeStamp();
        return runtimeStamp == null || runtimeStamp.longValue() != currentStamp;
    }

    private long calculateRuntimeCodeStamp(File pluginDir) {
        File codeDir = new File(pluginDir, "code");
        if (!codeDir.exists()) {
            return 0L;
        }
        long latest = codeDir.lastModified();
        var files = FileUtil.loopFiles(codeDir,
                file -> file.isFile() && (file.getName().endsWith(".class") || file.getName().endsWith(".jar")));
        for (File file : files) {
            latest = Math.max(latest, file.lastModified());
        }
        return latest;
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
