package com.tt.server.plugin;

import cn.hutool.core.io.FileUtil;
import com.tt.domain.plugin.PluginManager;
import com.tt.domain.plugin.model.aggregate.PluginManagement;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.aggregate.PluginInfoConfig;
import com.tt.domain.plugin.model.aggregate.PluginAuthor;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.model.valobj.PluginManagementStatus;
import com.tt.domain.plugin.repository.PluginManagementRepository;
import com.tt.infrastructure.plugin.engine.handler.PluginHandler;
import com.tt.infrastructure.plugin.engine.holder.PluginHolder;
import com.tt.infrastructure.plugin.engine.PluginUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.io.File;
import java.util.List;

/**
 * 插件启动加载器
 * <p>
 * 目标：后端重启时自动恢复插件运行状态，避免前端插件失效。
 * 规则：
 * 1) 读取数据库中全部插件记录
 * 2) 目录存在 -> 先安装（仅注册上下文与类加载器）
 * 3) 状态=启用 -> 再启动（注册路由/菜单/能力）
 * 4) 目录缺失 -> 自动禁用（仅对启用状态执行），保持状态一致
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class PluginStartupLoader {

    private final PluginManagementRepository pluginManagementRepository;
    private final PluginHandler pluginHandler;
    private final PluginManager pluginManager;

    @EventListener(ApplicationReadyEvent.class)
    public void loadPluginsOnStartup() {
        syncPluginRecordsFromDir();
        List<PluginManagement> plugins = pluginManagementRepository.findAll();
        if (CollectionUtils.isEmpty(plugins)) {
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

            try {
                // 目录存在但插件在DB中为禁用，则清理目录，避免垃圾资源堆积
                if (!plugin.isEnabled()) {
                    FileUtil.del(pluginDir);
                    log.info("Plugin directory removed (disabled): {}", pluginId);
                    continue;
                }

                // 先安装（注册上下文、类加载器、元数据）
                pluginHandler.installPlugin(pluginDir);

                // 启用状态才启动（注册路由、菜单等）
                pluginManager.startPlugin(pluginId);
                log.info("Plugin loaded on startup: {}", pluginId);
            } catch (Exception ex) {
                log.error("Failed to load plugin on startup: {}", pluginId, ex);
            }
        }
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
}
