package com.tt.server.plugin;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;
import com.tt.domain.plugin.PluginManager;
import com.tt.domain.plugin.model.aggregate.PluginManagement;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.aggregate.PluginInfoConfig;
import com.tt.domain.plugin.model.aggregate.PluginAuthor;
import com.tt.domain.plugin.event.PluginLifecycleEvent;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.model.valobj.PluginManagementStatus;
import com.tt.domain.plugin.repository.PluginManagementRepository;
import com.tt.common.domain.DomainEventPublisher;
import com.tt.infrastructure.plugin.engine.handler.PluginHandler;
import com.tt.infrastructure.plugin.engine.holder.PluginHolder;
import com.tt.infrastructure.plugin.engine.PluginUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.io.File;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

/**
 * Loads plugins on application startup.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class PluginStartupLoader {

    private static final String DEV_SOURCE_MARKER = ".dev-source";
    private static final String ACTION_ENABLE = "ENABLE";
    private static final String STATUS_SUCCESS = "SUCCESS";
    private static final String ACTION_SYSTEM_READY = "SYSTEM_READY";

    private final PluginManagementRepository pluginManagementRepository;
    private final PluginHandler pluginHandler;
    private final PluginManager pluginManager;
    private final DomainEventPublisher domainEventPublisher;

    @Value("${tt.plugin.dev.auto-register:false}")
    private boolean autoRegisterDevPlugins;

    @Value("${tt.plugin.dev.prefer-source:true}")
    private boolean preferSourcePlugins;

    @Value("${tt.plugin.dev.source-dir:}")
    private String sourceDirConfig;

    @EventListener(ApplicationReadyEvent.class)
    public void loadPluginsOnStartup() {
        if (autoRegisterDevPlugins || shouldFallbackDevSync()) {
            syncPluginsFromSource();
        }
        syncPluginRecordsFromDir();
        List<PluginManagement> plugins = pluginManagementRepository.findAll();
        if (CollectionUtils.isEmpty(plugins)) {
            publishSystemReadyEvent();
            return;
        }

        for (PluginManagement plugin : plugins) {
            String pluginId = plugin.getPluginId();
            if (pluginId == null || pluginId.isBlank()) {
                continue;
            }

            // 已加载过则跳过，避免重复安装
            if (PluginHolder.containsPlugin(pluginId)) {
                continue;
            }

            File pluginDir = new File(PluginDirectory.PLUGIN_DIRECTORY.getPath(), pluginId);
            if (!pluginDir.exists()) {
                // 目录不存在时，自动将启用状态下的插件标记为禁用，避免前端出现“启用但不可用”
                if (plugin.isEnabled()) {
                    plugin.disable();
                    pluginManagementRepository.save(plugin);
                    log.warn("Plugin directory missing, auto disabled: {}", pluginId);
                } else {
                    log.warn("Plugin directory missing: {}", pluginId);
                }
                continue;
            }

            long startedAt = System.currentTimeMillis();
            try {
                // 目录存在但插件在DB中为禁用，则清理目录，避免垃圾资源堆积
                if (!plugin.isEnabled()) {
                    if (!isDevSourcePluginDir(pluginDir)) {
                        FileUtil.del(pluginDir);
                        log.info("Plugin directory removed (disabled): {}", pluginId);
                    } else {
                        log.info("Plugin directory retained (dev source): {}", pluginId);
                    }
                    continue;
                }

                // 先安装（注册上下文、类加载器、元数据）
                pluginHandler.installPlugin(pluginDir);

                // 启用状态才启动（注册路由、菜单等）
                pluginManager.startPlugin(pluginId);
                publishStartupEvent(pluginId, startedAt);
                log.info("Plugin loaded on startup: {}", pluginId);
            } catch (Exception ex) {
                log.error("Failed to load plugin on startup: {}", pluginId, ex);
            }
        }

        publishSystemReadyEvent();
    }

    /**
     * 启动时扫描资源目录，将已存在但未入库的插件同步到数据库
     */
    private void syncPluginRecordsFromDir() {
        File pluginBaseDir = new File(PluginDirectory.PLUGIN_DIRECTORY.getPath());
        if (!pluginBaseDir.exists() || !pluginBaseDir.isDirectory()) {
            return;
        }

        File[] pluginDirs = pluginBaseDir.listFiles(File::isDirectory);
        if (pluginDirs == null || pluginDirs.length == 0) {
            return;
        }

        for (File pluginDir : pluginDirs) {
            PluginConfig config = PluginUtil.getPluginConfig(pluginDir);
            if (config == null) {
                continue;
            }
            PluginInfoConfig pluginInfo = config.getPlugin();
            if (pluginInfo == null || pluginInfo.getId() == null || pluginInfo.getId().isBlank()) {
                continue;
            }

            String pluginId = pluginInfo.getId();
            if (pluginManagementRepository.findByPluginId(pluginId).isPresent()) {
                continue;
            }

            PluginAuthor author = config.getAuthor();
            PluginManagement plugin = PluginManagement.create(
                    pluginId,
                    pluginInfo.getName(),
                    pluginInfo.getDescription(),
                    pluginInfo.getVersion(),
                    author != null ? author.getName() : null,
                    author != null ? author.getEmail() : null,
                    author != null ? author.getWebSite() : null
            );

            if (pluginInfo.getIsDev() != null || (pluginInfo.getFrontDevAddress() != null && !pluginInfo.getFrontDevAddress().isBlank())) {
                plugin.updateDevConfig(pluginInfo.getIsDev(), pluginInfo.getFrontDevAddress());
            }

            Integer status = config.getStatus();
            if (PluginManagementStatus.ENABLED.getCode().equals(status) || status == null) {
                plugin.enable();
            }

            pluginManagementRepository.save(plugin);
            log.info("Plugin record synced from directory: {}", pluginId);
        }
    }

    private void syncPluginsFromSource() {
        Optional<File> sourceRoot = resolveSourceRoot();
        if (sourceRoot.isEmpty()) {
            log.debug("Dev plugin source directory not found, skip sync.");
            return;
        }

        log.info("Dev plugin source directory: {}", sourceRoot.get().getAbsolutePath());

        List<File> moduleDirs = listModuleDirectories(sourceRoot.get());
        if (moduleDirs.isEmpty()) {
            return;
        }

        int synced = 0;
        int skipped = 0;
        for (File moduleDir : moduleDirs) {
            File resourceDir = new File(moduleDir, "src/main/resources");
            File pluginYaml = new File(resourceDir, "plugin.yaml");
            if (!pluginYaml.exists()) {
                skipped++;
                continue;
            }

            PluginConfig config = PluginUtil.getPluginConfig(resourceDir);
            if (config == null || config.getPlugin() == null || config.getPlugin().getId() == null) {
                continue;
            }

            String pluginId = config.getPlugin().getId();
            File targetClasses = new File(moduleDir, "target/classes");
            if (!targetClasses.exists()) {
                log.warn("Dev plugin skipped (missing target/classes): {}", moduleDir.getAbsolutePath());
                skipped++;
                continue;
            }

            File pluginDir = new File(PluginDirectory.PLUGIN_DIRECTORY.getPath(), pluginId);
            boolean pluginDirExists = pluginDir.exists();
            boolean devMarkerExists = isDevSourcePluginDir(pluginDir);

            if (pluginDirExists && !devMarkerExists && !preferSourcePlugins) {
                log.info("Dev plugin sync skipped (installed plugin exists): {}", pluginId);
                skipped++;
                continue;
            }

            if (pluginDirExists && !devMarkerExists && preferSourcePlugins) {
                FileUtil.del(pluginDir);
            }

            Properties markerProps = readDevMarker(new File(pluginDir, DEV_SOURCE_MARKER));
            long classesTs = lastModifiedOfDir(new File(moduleDir, "target/classes"));
            long libTs = lastModifiedOfDir(new File(moduleDir, "target/lib"));
            long uiTs = lastModifiedOfDir(new File(resourceDir, "ui"));
            long sqlTs = lastModifiedOfDir(new File(resourceDir, "sql"));
            long pluginYamlTs = lastModifiedOf(new File(resourceDir, "plugin.yaml"));
            long frontendYamlTs = lastModifiedOf(new File(resourceDir, "frontend.yaml"));
            long settingTs = lastModifiedOf(new File(resourceDir, "setting.json"));

            boolean classesChanged = !equalsTimestamp(markerProps, "classesTs", classesTs);
            boolean libChanged = !equalsTimestamp(markerProps, "libTs", libTs);
            boolean uiChanged = !equalsTimestamp(markerProps, "uiTs", uiTs);
            boolean sqlChanged = !equalsTimestamp(markerProps, "sqlTs", sqlTs);
            boolean pluginYamlChanged = !equalsTimestamp(markerProps, "pluginYamlTs", pluginYamlTs);
            boolean frontendYamlChanged = !equalsTimestamp(markerProps, "frontendYamlTs", frontendYamlTs);
            boolean settingChanged = !equalsTimestamp(markerProps, "settingTs", settingTs);

            if (pluginDirExists && devMarkerExists
                    && !classesChanged && !libChanged && !uiChanged && !sqlChanged
                    && !pluginYamlChanged && !frontendYamlChanged && !settingChanged) {
                log.debug("Dev plugin up-to-date, skip copy: {}", pluginId);
                synced++;
                continue;
            }

            FileUtil.mkdir(pluginDir);
            syncDevPluginFiles(resourceDir, targetClasses, moduleDir, pluginDir,
                    classesChanged, libChanged, uiChanged, sqlChanged,
                    pluginYamlChanged, frontendYamlChanged, settingChanged,
                    classesTs, libTs, uiTs, sqlTs, pluginYamlTs, frontendYamlTs, settingTs);
            log.info("Dev plugin synced from source: {}", pluginId);
            synced++;
        }

        log.info("Dev plugin sync completed, synced: {}, skipped: {}", synced, skipped);
    }

    private Optional<File> resolveSourceRoot() {
        List<File> candidates = new ArrayList<>();
        if (sourceDirConfig != null && !sourceDirConfig.isBlank()) {
            candidates.add(new File(sourceDirConfig));
        }

        File current = new File(System.getProperty("user.dir"));
        candidates.add(new File(current, "tt-admin-plugins"));

        if (current.getParentFile() != null) {
            candidates.add(new File(current.getParentFile(), "tt-admin-plugins"));
        }

        if (current.getParentFile() != null && current.getParentFile().getParentFile() != null) {
            candidates.add(new File(current.getParentFile().getParentFile(), "tt-admin-plugins"));
        }

        candidates.add(new File(current, "tt-admin-backend/tt-admin-plugins"));
        candidates.add(new File(current, "tt-amdin/tt-admin-backend/tt-admin-plugins"));
        if (current.getParentFile() != null) {
            candidates.add(new File(current.getParentFile(), "tt-admin-backend/tt-admin-plugins"));
            candidates.add(new File(current.getParentFile(), "tt-amdin/tt-admin-backend/tt-admin-plugins"));
        }

        for (File candidate : candidates) {
            if (candidate.exists() && candidate.isDirectory()) {
                return Optional.of(candidate);
            }
        }

        log.warn("Dev plugin source directory not found. user.dir={}, candidates={}",
                current.getAbsolutePath(),
                candidates.stream().map(File::getAbsolutePath).toList());
        return Optional.empty();
    }

    private List<File> listModuleDirectories(File sourceRoot) {
        File[] moduleDirs = sourceRoot.listFiles(File::isDirectory);
        if (moduleDirs == null || moduleDirs.length == 0) {
            return List.of();
        }
        List<File> results = new ArrayList<>();
        for (File moduleDir : moduleDirs) {
            results.add(moduleDir);
        }
        return results;
    }

    private void syncDevPluginFiles(File resourceDir,
                                    File targetClasses,
                                    File moduleDir,
                                    File pluginDir,
                                    boolean classesChanged,
                                    boolean libChanged,
                                    boolean uiChanged,
                                    boolean sqlChanged,
                                    boolean pluginYamlChanged,
                                    boolean frontendYamlChanged,
                                    boolean settingChanged,
                                    long classesTs,
                                    long libTs,
                                    long uiTs,
                                    long sqlTs,
                                    long pluginYamlTs,
                                    long frontendYamlTs,
                                    long settingTs) {
        File pluginYaml = new File(resourceDir, "plugin.yaml");
        File frontendYaml = new File(resourceDir, "frontend.yaml");
        File settingJson = new File(resourceDir, "setting.json");
        if (pluginYamlChanged || !new File(pluginDir, "plugin.yaml").exists()) {
            copyIfExists(pluginYaml, new File(pluginDir, "plugin.yaml"));
        }
        if (frontendYamlChanged || !new File(pluginDir, "frontend.yaml").exists()) {
            copyIfExists(frontendYaml, new File(pluginDir, "frontend.yaml"));
        }
        if (settingChanged || !new File(pluginDir, "setting.json").exists()) {
            copyIfExists(settingJson, new File(pluginDir, "setting.json"));
        }

        if (sqlChanged) {
            copyDirIfExists(new File(resourceDir, "sql"), new File(pluginDir, "sql"));
        }
        if (uiChanged) {
            copyDirIfExists(new File(resourceDir, "ui"), new File(pluginDir, "ui"));
        }
        if (libChanged) {
            copyLibContents(new File(moduleDir, "target/lib"), new File(pluginDir, "lib"));
        }

        if (classesChanged) {
            File codeDir = new File(pluginDir, "code");
            FileUtil.del(codeDir);
            FileUtil.mkdir(codeDir);
            File[] classEntries = targetClasses.listFiles();
            if (classEntries != null) {
                for (File entry : classEntries) {
                    FileUtil.copy(entry, codeDir, true);
                }
            }
        }

        writeDevMarker(pluginDir, moduleDir, resourceDir, moduleDir,
                classesTs, libTs, uiTs, sqlTs, pluginYamlTs, frontendYamlTs, settingTs);
    }

    private void copyIfExists(File source, File target) {
        if (source.exists()) {
            FileUtil.copy(source, target, true);
        }
    }

    private void copyDirIfExists(File sourceDir, File targetDir) {
        if (!sourceDir.exists() || !sourceDir.isDirectory()) {
            return;
        }
        FileUtil.del(targetDir);
        FileUtil.mkdir(targetDir);
        File[] files = sourceDir.listFiles();
        if (files == null) {
            return;
        }
        for (File file : files) {
            FileUtil.copy(file, targetDir, true);
        }
    }

    private void copyLibContents(File sourceDir, File targetDir) {
        if (!sourceDir.exists() || !sourceDir.isDirectory()) {
            return;
        }
        FileUtil.del(targetDir);
        FileUtil.mkdir(targetDir);
        File[] files = sourceDir.listFiles();
        if (files == null) {
            return;
        }
        for (File file : files) {
            FileUtil.copy(file, targetDir, true);
        }
    }

    private void writeDevMarker(File pluginDir,
                                File moduleDir,
                                File resourceDir,
                                File moduleRoot,
                                long classesTs,
                                long libTs,
                                long uiTs,
                                long sqlTs,
                                long pluginYamlTs,
                                long frontendYamlTs,
                                long settingTs) {
        File marker = new File(pluginDir, DEV_SOURCE_MARKER);
        String content = String.join("\n",
                "source=" + moduleDir.getAbsolutePath(),
                "classesTs=" + classesTs,
                "libTs=" + libTs,
                "uiTs=" + uiTs,
                "sqlTs=" + sqlTs,
                "pluginYamlTs=" + pluginYamlTs,
                "frontendYamlTs=" + frontendYamlTs,
                "settingTs=" + settingTs
        );
        FileUtil.writeString(content, marker, StandardCharsets.UTF_8);
    }

    private boolean isDevSourcePluginDir(File pluginDir) {
        return new File(pluginDir, DEV_SOURCE_MARKER).exists();
    }

    private boolean isDevPluginUpToDate(File moduleDir, File resourceDir, File pluginDir) {
        File marker = new File(pluginDir, DEV_SOURCE_MARKER);
        Properties props = readDevMarker(marker);
        if (props.isEmpty()) {
            return false;
        }
        String source = props.getProperty("source");
        if (source == null || !source.equals(moduleDir.getAbsolutePath())) {
            return false;
        }

        return equalsTimestamp(props, "classesTs", lastModifiedOfDir(new File(moduleDir, "target/classes")))
                && equalsTimestamp(props, "libTs", lastModifiedOfDir(new File(moduleDir, "target/lib")))
                && equalsTimestamp(props, "uiTs", lastModifiedOfDir(new File(resourceDir, "ui")))
                && equalsTimestamp(props, "sqlTs", lastModifiedOfDir(new File(resourceDir, "sql")))
                && equalsTimestamp(props, "pluginYamlTs", lastModifiedOf(new File(resourceDir, "plugin.yaml")))
                && equalsTimestamp(props, "frontendYamlTs", lastModifiedOf(new File(resourceDir, "frontend.yaml")))
                && equalsTimestamp(props, "settingTs", lastModifiedOf(new File(resourceDir, "setting.json")));
    }

    private Properties readDevMarker(File marker) {
        Properties props = new Properties();
        if (!marker.exists()) {
            return props;
        }
        try (InputStream inputStream = FileUtil.getInputStream(marker)) {
            props.load(IoUtil.toBuffered(inputStream));
        } catch (Exception ignored) {
        }
        return props;
    }

    private boolean equalsTimestamp(Properties props, String key, long actual) {
        String raw = props.getProperty(key);
        if (raw == null) {
            return false;
        }
        try {
            return Long.parseLong(raw) == actual;
        } catch (NumberFormatException ex) {
            return false;
        }
    }

    private long lastModifiedOf(File file) {
        return file.exists() ? file.lastModified() : 0L;
    }

    private long lastModifiedOfDir(File dir) {
        if (!dir.exists()) {
            return 0L;
        }
        long latest = dir.lastModified();
        if (dir.isFile()) {
            return latest;
        }
        List<File> files = FileUtil.loopFiles(dir);
        for (File file : files) {
            latest = Math.max(latest, file.lastModified());
        }
        return latest;
    }

    private void publishStartupEvent(String pluginId, long startedAt) {
        try {
            long elapsedMs = System.currentTimeMillis() - startedAt;
            domainEventPublisher.publishImmediately(new PluginLifecycleEvent(
                    pluginId,
                    ACTION_ENABLE,
                    STATUS_SUCCESS,
                    "Plugin started",
                    "complete",
                    100,
                    startedAt,
                    elapsedMs,
                    null
            ));
        } catch (Exception ex) {
            log.debug("Failed to publish plugin startup event: {}", pluginId, ex);
        }
    }

    private void publishSystemReadyEvent() {
        try {
            long startedAt = System.currentTimeMillis();
            domainEventPublisher.publishImmediately(new PluginLifecycleEvent(
                    null,
                    ACTION_SYSTEM_READY,
                    STATUS_SUCCESS,
                    "system_ready",
                    "system_ready",
                    100,
                    startedAt,
                    0L,
                    null
            ));
        } catch (Exception ex) {
            log.debug("Failed to publish system ready event", ex);
        }
    }

    private boolean shouldFallbackDevSync() {
        File pluginBaseDir = new File(PluginDirectory.PLUGIN_DIRECTORY.getPath());
        if (pluginBaseDir.exists() && pluginBaseDir.isDirectory()) {
            File[] pluginDirs = pluginBaseDir.listFiles(File::isDirectory);
            if (pluginDirs != null && pluginDirs.length > 0) {
                return false;
            }
        }

        Optional<File> sourceRoot = resolveSourceRoot();
        if (sourceRoot.isEmpty()) {
            return false;
        }

        log.info("No plugin directories found, fallback to dev source sync.");
        return true;
    }
}
