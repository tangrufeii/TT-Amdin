package com.tt.infrastructure.plugin.persistence.repository;

import com.tt.domain.extension.model.manifest.ExtensionManifest;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.model.frontend.PluginFrontendDefinition;
import com.tt.domain.plugin.repository.PluginFrontendDefinitionRepository;
import com.tt.infrastructure.extension.manifest.ExtensionManifestCompatMapper;
import com.tt.infrastructure.extension.manifest.ExtensionManifestReader;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.util.Optional;

/**
 * 插件前端配置读取实现
 */
@Repository
@Slf4j
public class PluginFrontendDefinitionRepositoryImpl implements PluginFrontendDefinitionRepository {

    @Override
    public Optional<PluginFrontendDefinition> loadByPluginId(String pluginId) {
        if (pluginId == null || pluginId.isBlank()) {
            return Optional.empty();
        }

        File pluginDir = new File(PluginDirectory.PLUGIN_DIRECTORY.getPath(), pluginId);
        if (!pluginDir.exists()) {
            log.warn("Plugin directory not found when loading frontend config: {}", pluginId);
            return Optional.empty();
        }

        ExtensionManifest manifest = ExtensionManifestReader.readManifest(pluginDir).orElse(null);
        if (manifest == null) {
            log.debug("Plugin manifest not found when loading frontend definition: {}", pluginDir.getAbsolutePath());
            return Optional.empty();
        }

        return Optional.ofNullable(ExtensionManifestCompatMapper.toPluginFrontendDefinition(manifest));
    }
}
