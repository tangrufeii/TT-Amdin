package com.tt.infrastructure.plugin.persistence.repository;

import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.model.enums.PluginResourceDirectory;
import com.tt.domain.plugin.model.frontend.PluginFrontendDefinition;
import com.tt.domain.plugin.repository.PluginFrontendDefinitionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.yaml.snakeyaml.Yaml;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
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

        File configFile = new File(pluginDir, PluginResourceDirectory.FRONTEND_FILE.getPath());
        if (!configFile.exists()) {
            log.debug("Plugin frontend config file not found: {}", configFile.getAbsolutePath());
            return Optional.empty();
        }

        try (InputStream inputStream = new FileInputStream(configFile)) {
            Yaml yaml = new Yaml();
            PluginFrontendDefinition definition = yaml.loadAs(inputStream, PluginFrontendDefinition.class);
            return Optional.ofNullable(definition);
        } catch (Exception e) {
            log.error("Failed to parse plugin frontend config: {}", configFile.getAbsolutePath(), e);
            return Optional.empty();
        }
    }
}
