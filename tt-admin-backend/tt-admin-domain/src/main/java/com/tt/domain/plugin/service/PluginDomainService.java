package com.tt.domain.plugin.service;

import com.tt.common.api.ResultCode;
import com.tt.common.domain.DomainException;
import com.tt.domain.extension.model.aggregate.ExtensionRecord;
import com.tt.domain.extension.model.manifest.ExtensionActivation;
import com.tt.domain.extension.model.manifest.ExtensionAuthor;
import com.tt.domain.extension.model.manifest.ExtensionCompatibility;
import com.tt.domain.extension.model.manifest.ExtensionManifest;
import com.tt.domain.extension.model.manifest.ExtensionMeta;
import com.tt.domain.extension.model.entity.ExtensionRecordInfo;
import com.tt.domain.extension.model.enums.ExtensionType;
import com.tt.domain.extension.repository.ExtensionManifestRepository;
import com.tt.domain.extension.repository.ExtensionRecordRepository;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.aggregate.PluginManagement;
import com.tt.domain.plugin.model.aggregate.PluginAuthor;
import com.tt.domain.plugin.model.aggregate.PluginInfoConfig;
import com.tt.domain.plugin.model.entity.PluginManagementInfo;
import com.tt.domain.plugin.repository.PluginManagementRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.Optional;

/**
 * 插件领域服务
 * <p>
 * 负责插件相关的业务逻辑处理。
 * </p>
 *
 * @author tt
 * @date 2025/12/25
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class PluginDomainService {

    private static final int LEGACY_MANIFEST_VERSION = 1;
    private static final int DEFAULT_ENTRY_PRIORITY = 100;
    private static final String LEGACY_SOURCE_FORMAT = "legacy-plugin";
    private static final String EXTENSION_SOURCE_FORMAT = "extension-yaml";

    private final PluginManagementRepository pluginManagementRepository;
    private final ExtensionRecordRepository extensionRecordRepository;
    private final ExtensionManifestRepository extensionManifestRepository;

    /**
     * 保存插件信息到数据库
     *
     * @param pluginConfig 插件配置
     */
    @Transactional(rollbackFor = Exception.class)
    public void savePluginInfo(PluginConfig pluginConfig) {
        if (pluginConfig == null || pluginConfig.getPlugin() == null) {
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "Plugin config is null");
        }
        PluginInfoConfig pluginInfoConfig = pluginConfig.getPlugin();
        PluginAuthor pluginAuthor = pluginConfig.getAuthor();
        ExtensionManifest manifest = extensionManifestRepository.loadInstalled(pluginInfoConfig.getId()).orElse(null);

        // 删除旧记录（如果是更新）
        pluginManagementRepository.deleteByPluginId(pluginInfoConfig.getId());

        // 创建新记录
        PluginManagement pluginManagement = PluginManagement.create(
                pluginInfoConfig.getId(),
                pluginInfoConfig.getName(),
                pluginInfoConfig.getDescription(),
                pluginInfoConfig.getVersion(),
                pluginAuthor != null ? pluginAuthor.getName() : null,
                pluginAuthor != null ? pluginAuthor.getEmail() : null,
                pluginAuthor != null ? pluginAuthor.getWebSite() : null
        );

        boolean pluginDevEnabled = Boolean.TRUE.equals(pluginInfoConfig.getIsDev());
        pluginManagement.updateDevConfig(pluginDevEnabled, pluginDevEnabled ? pluginInfoConfig.getFrontDevAddress() : "");
        if (pluginConfig.getStatus() == null || pluginConfig.getStatus() == 1) {
            pluginManagement.enable();
        }

        // 主题必须互斥。
        // 安装阶段若主题包自带 autoEnable=true，但系统里已经存在已启用主题，
        // 这里优先保住当前线上主题，避免“安装一个包就多出两个启用主题”的脏状态。
        if (pluginManagement.isEnabled() && manifest != null && manifest.isThemeExtension() && hasOtherEnabledTheme(pluginManagement.getPluginId())) {
            pluginManagement.disable();
            log.info("Theme install auto-enable skipped because another theme is already active: pluginId={}", pluginManagement.getPluginId());
        }

        pluginManagementRepository.save(pluginManagement);
        syncExtensionRecordFromPlugin(pluginManagement);
        log.info("Plugin info saved: pluginId={}", pluginConfig.getPlugin().getId());
    }

    /**
     * 从数据库删除插件信息
     *
     * @param pluginId 插件ID
     */
    @Transactional(rollbackFor = Exception.class)
    public void deletePluginInfo(String pluginId) {
        pluginManagementRepository.deleteByPluginId(pluginId);
        deleteExtensionRecord(pluginId);
        log.info("Plugin info deleted: pluginId={}", pluginId);
    }

    /**
     * 同步旧插件记录到扩展主表（兼容期双写）
     * <p>
     * 当前系统安装/状态管理仍以 plugin 链路为主，因此这里做一层 legacy 映射，
     * 保证 V2 的 sys_extension 持续有可用数据用于后续切换。
     *
     * @param pluginManagement 插件聚合根
     */
    @Transactional(rollbackFor = Exception.class)
    public void syncExtensionRecordFromPlugin(PluginManagement pluginManagement) {
        if (pluginManagement == null || !StringUtils.hasText(pluginManagement.getPluginId())) {
            return;
        }

        String pluginId = pluginManagement.getPluginId();
        PluginManagementInfo pluginInfo = pluginManagement.getPluginInfo();
        String pluginName = pluginInfo != null ? pluginInfo.getName() : pluginId;
        String pluginVersion = pluginInfo != null ? pluginInfo.getVersion() : null;

        try {
            ExtensionRecord extensionRecord = extensionRecordRepository.findByExtensionId(pluginId)
                    .orElseGet(() -> ExtensionRecord.create(pluginId, pluginName, ExtensionType.HYBRID, resolveVersion(pluginVersion)));

            ExtensionManifest manifest = extensionManifestRepository.loadInstalled(pluginId).orElse(null);
            if (manifest != null && manifest.getExtension() != null && manifest.resolveType() != null) {
                applyManifestMapping(extensionRecord, pluginManagement, manifest);
            } else {
                // 读取不到统一 Manifest 时，退回旧插件映射，避免兼容期链路断掉。
                applyLegacyMapping(extensionRecord, pluginManagement);
            }
            extensionRecordRepository.save(extensionRecord);
            log.debug("Extension record synced from plugin: pluginId={}", pluginId);
        } catch (Exception ex) {
            log.warn("Skip extension record sync, sys_extension is unavailable: pluginId={}", pluginId, ex);
        }
    }

    /**
     * 删除扩展主表中的 legacy 插件映射记录
     *
     * @param pluginId 插件ID
     */
    @Transactional(rollbackFor = Exception.class)
    public void deleteExtensionRecord(String pluginId) {
        if (!StringUtils.hasText(pluginId)) {
            return;
        }
        try {
            Optional<ExtensionRecord> recordOptional = extensionRecordRepository.findByExtensionId(pluginId);
            recordOptional.ifPresent(record -> extensionRecordRepository.deleteById(record.getDbId()));
        } catch (Exception ex) {
            log.warn("Skip extension record delete, sys_extension is unavailable: pluginId={}", pluginId, ex);
        }
    }

    private void applyLegacyMapping(ExtensionRecord extensionRecord, PluginManagement pluginManagement) {
        ExtensionRecordInfo extensionInfo = extensionRecord.getExtensionInfo();
        PluginManagementInfo pluginInfo = pluginManagement.getPluginInfo();

        extensionInfo.setType(ExtensionType.HYBRID);
        extensionInfo.setManifestVersion(LEGACY_MANIFEST_VERSION);
        extensionInfo.setSingletonFlag(Boolean.FALSE);
        extensionInfo.setAutoEnable(Boolean.FALSE);
        extensionInfo.setEntryPriority(DEFAULT_ENTRY_PRIORITY);
        extensionInfo.setSourceFormat(LEGACY_SOURCE_FORMAT);
        if (!StringUtils.hasText(extensionInfo.getInstallSource())) {
            extensionInfo.setInstallSource("upload");
        }

        if (pluginInfo != null) {
            extensionInfo.setName(pluginInfo.getName());
            extensionInfo.setDescription(pluginInfo.getDescription());
            extensionInfo.setVersion(resolveVersion(pluginInfo.getVersion()));
            extensionInfo.setAuthor(pluginInfo.getAuthor());
            extensionInfo.setEmail(pluginInfo.getEmail());
            extensionInfo.setWebsite(pluginInfo.getWebsite());
            extensionInfo.setIsDev(Boolean.TRUE.equals(pluginInfo.getIsDev()));
            extensionInfo.setFrontDevAddress(Boolean.TRUE.equals(pluginInfo.getIsDev()) ? pluginInfo.getFrontDevAddress() : "");
            extensionInfo.setCreateUserId(pluginInfo.getCreateUserId());
            extensionInfo.setUpdateUserId(pluginInfo.getUpdateUserId());
        }

        if (pluginManagement.isEnabled()) {
            extensionRecord.enable();
        } else {
            extensionRecord.disable();
        }
    }

    /**
     * 按统一 Manifest 回写扩展主表。
     * <p>
     * 这层是当前兼容期最关键的桥：外部不管装进来的是新扩展包还是旧插件包，
     * 只要运行目录里已经有统一 Manifest 视图，就优先把 `sys_extension`
     * 写成真实扩展语义，别再一律写死成 `hybrid`。
     * </p>
     *
     * @param extensionRecord 扩展记录
     * @param pluginManagement 插件记录
     * @param manifest 统一 Manifest
     */
    private void applyManifestMapping(ExtensionRecord extensionRecord,
                                      PluginManagement pluginManagement,
                                      ExtensionManifest manifest) {
        ExtensionRecordInfo extensionInfo = extensionRecord.getExtensionInfo();
        PluginManagementInfo pluginInfo = pluginManagement.getPluginInfo();
        ExtensionMeta meta = manifest.getExtension();
        ExtensionActivation activation = manifest.getActivation();
        ExtensionCompatibility compatibility = manifest.getCompatibility();
        ExtensionAuthor author = meta != null ? meta.getAuthor() : null;

        extensionInfo.setType(manifest.resolveType());
        extensionInfo.setManifestVersion(manifest.getManifestVersion() == null ? 2 : manifest.getManifestVersion());
        extensionInfo.setSingletonFlag(Boolean.TRUE.equals(manifest.isThemeExtension())
                || (activation != null && Boolean.TRUE.equals(activation.getSingleton())));
        extensionInfo.setAutoEnable(activation != null && Boolean.TRUE.equals(activation.getAutoEnable()));
        extensionInfo.setEntryPriority(activation != null && activation.getEntryPriority() != null
                ? activation.getEntryPriority()
                : DEFAULT_ENTRY_PRIORITY);
        extensionInfo.setSourceFormat(extensionInfo.getManifestVersion() <= LEGACY_MANIFEST_VERSION
                ? LEGACY_SOURCE_FORMAT
                : EXTENSION_SOURCE_FORMAT);
        if (!StringUtils.hasText(extensionInfo.getInstallSource())) {
            boolean isDev = pluginInfo != null && Boolean.TRUE.equals(pluginInfo.getIsDev());
            extensionInfo.setInstallSource(isDev ? "dev-sync" : "upload");
        }

        extensionInfo.setName(resolveText(meta != null ? meta.getName() : null, pluginInfo != null ? pluginInfo.getName() : null, extensionRecord.getExtensionId()));
        extensionInfo.setDescription(resolveText(meta != null ? meta.getDescription() : null, pluginInfo != null ? pluginInfo.getDescription() : null, ""));
        extensionInfo.setVersion(resolveVersion(meta != null ? meta.getVersion() : (pluginInfo != null ? pluginInfo.getVersion() : null)));
        extensionInfo.setAuthor(resolveText(author != null ? author.getName() : null, pluginInfo != null ? pluginInfo.getAuthor() : null, null));
        extensionInfo.setEmail(resolveText(author != null ? author.getEmail() : null, pluginInfo != null ? pluginInfo.getEmail() : null, null));
        extensionInfo.setWebsite(resolveText(author != null ? author.getWebsite() : null, pluginInfo != null ? pluginInfo.getWebsite() : null, null));
        extensionInfo.setHostMinVersion(compatibility != null && compatibility.getHost() != null ? compatibility.getHost().getMinVersion() : null);
        extensionInfo.setHostMaxVersion(compatibility != null && compatibility.getHost() != null ? compatibility.getHost().getMaxVersion() : null);
        extensionInfo.setIsDev(pluginInfo != null && Boolean.TRUE.equals(pluginInfo.getIsDev()));
        extensionInfo.setFrontDevAddress(pluginInfo != null && Boolean.TRUE.equals(pluginInfo.getIsDev())
                ? pluginInfo.getFrontDevAddress()
                : "");
        if (pluginInfo != null) {
            extensionInfo.setCreateUserId(pluginInfo.getCreateUserId());
            extensionInfo.setUpdateUserId(pluginInfo.getUpdateUserId());
        }

        if (pluginManagement.isEnabled()) {
            extensionRecord.enable();
        } else {
            extensionRecord.disable();
        }
    }

    private String resolveVersion(String version) {
        return StringUtils.hasText(version) ? version : "1.0.0";
    }

    private String resolveText(String preferred, String fallback, String defaultValue) {
        if (StringUtils.hasText(preferred)) {
            return preferred;
        }
        if (StringUtils.hasText(fallback)) {
            return fallback;
        }
        return defaultValue;
    }

    private boolean hasOtherEnabledTheme(String pluginId) {
        return pluginManagementRepository.findByStatus(1).stream()
                .filter(plugin -> plugin != null && StringUtils.hasText(plugin.getPluginId()))
                .filter(plugin -> !plugin.getPluginId().equals(pluginId))
                .anyMatch(plugin -> extensionManifestRepository.loadInstalled(plugin.getPluginId())
                        .map(ExtensionManifest::isThemeExtension)
                        .orElse(false));
    }
}
