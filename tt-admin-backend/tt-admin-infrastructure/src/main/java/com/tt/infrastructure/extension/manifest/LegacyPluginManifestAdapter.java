package com.tt.infrastructure.extension.manifest;

import com.tt.domain.extension.model.manifest.ExtensionActivation;
import com.tt.domain.extension.model.manifest.ExtensionArtifacts;
import com.tt.domain.extension.model.manifest.ExtensionAuthor;
import com.tt.domain.extension.model.manifest.ExtensionCapability;
import com.tt.domain.extension.model.manifest.ExtensionCompatibility;
import com.tt.domain.extension.model.manifest.ExtensionContributes;
import com.tt.domain.extension.model.manifest.ExtensionDependencySet;
import com.tt.domain.extension.model.manifest.ExtensionHostCompatibility;
import com.tt.domain.extension.model.manifest.ExtensionManifest;
import com.tt.domain.extension.model.manifest.ExtensionMeta;
import com.tt.domain.extension.model.manifest.ExtensionRouteMeta;
import com.tt.domain.extension.model.manifest.admin.AdminContributes;
import com.tt.domain.extension.model.manifest.admin.AdminMenuContribution;
import com.tt.domain.extension.model.manifest.admin.AdminRouteContribution;
import com.tt.domain.plugin.model.aggregate.PluginAuthor;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.aggregate.PluginInfoConfig;
import com.tt.domain.plugin.model.frontend.PluginFrontendDefinition;
import com.tt.domain.plugin.model.frontend.PluginFrontendMenuDefinition;
import com.tt.domain.plugin.model.frontend.PluginFrontendModuleDefinition;
import com.tt.domain.plugin.model.frontend.PluginFrontendRouteDefinition;
import com.tt.domain.plugin.model.frontend.PluginFrontendRouteMeta;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.CollectionUtils;
import org.yaml.snakeyaml.Yaml;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * 旧插件 Manifest 适配器
 * <p>
 * 把 `plugin.yaml + frontend.yaml` 收拢成统一的 `ExtensionManifest`，
 * 这样后面安装器和运行时就不用继续拿两份配置互相拼了。
 */
@Slf4j
public final class LegacyPluginManifestAdapter {

    private static final int LEGACY_MANIFEST_VERSION = 1;
    private static final int DEFAULT_ENTRY_PRIORITY = 100;
    private static final String LEGACY_TYPE = "hybrid";
    private static final String DEFAULT_RENDERER = "web-component";

    private LegacyPluginManifestAdapter() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * 从旧插件目录构建统一 Manifest
     *
     * @param extensionRoot 插件根目录
     * @return 统一 Manifest，不满足旧格式时返回 null
     */
    public static ExtensionManifest adapt(File extensionRoot) {
        if (extensionRoot == null || !extensionRoot.exists()) {
            return null;
        }

        File pluginYaml = new File(extensionRoot, "plugin.yaml");
        if (!pluginYaml.exists()) {
            return null;
        }

        PluginConfig pluginConfig = readYaml(pluginYaml, PluginConfig.class);
        if (pluginConfig == null || pluginConfig.getPlugin() == null) {
            return null;
        }

        PluginFrontendDefinition frontendDefinition = null;
        File frontendYaml = new File(extensionRoot, "frontend.yaml");
        if (frontendYaml.exists()) {
            frontendDefinition = readYaml(frontendYaml, PluginFrontendDefinition.class);
        }

        return buildManifest(pluginConfig, frontendDefinition, extensionRoot);
    }

    private static ExtensionManifest buildManifest(PluginConfig pluginConfig,
                                                  PluginFrontendDefinition frontendDefinition,
                                                  File extensionRoot) {
        PluginInfoConfig plugin = pluginConfig.getPlugin();
        PluginAuthor pluginAuthor = pluginConfig.getAuthor();

        ExtensionManifest manifest = new ExtensionManifest();
        manifest.setManifestVersion(LEGACY_MANIFEST_VERSION);
        manifest.setExtension(buildMeta(plugin, pluginAuthor));
        manifest.setCompatibility(buildCompatibility(plugin));
        manifest.setActivation(buildActivation(pluginConfig));
        manifest.setDependencies(new ExtensionDependencySet());
        manifest.setCapabilities(buildCapabilities(frontendDefinition, extensionRoot));
        manifest.setArtifacts(buildArtifacts(extensionRoot));
        manifest.setContributes(buildContributes(frontendDefinition));
        return manifest;
    }

    private static ExtensionMeta buildMeta(PluginInfoConfig plugin, PluginAuthor pluginAuthor) {
        ExtensionMeta meta = new ExtensionMeta();
        meta.setId(plugin.getId());
        meta.setName(plugin.getName());
        meta.setVersion(plugin.getVersion());
        meta.setType(LEGACY_TYPE);
        meta.setDescription(plugin.getDescription());
        if (pluginAuthor != null) {
            ExtensionAuthor author = new ExtensionAuthor();
            author.setName(pluginAuthor.getName());
            author.setEmail(pluginAuthor.getEmail());
            author.setWebsite(pluginAuthor.getWebSite());
            meta.setAuthor(author);
        }
        return meta;
    }

    private static ExtensionCompatibility buildCompatibility(PluginInfoConfig plugin) {
        ExtensionHostCompatibility host = new ExtensionHostCompatibility();
        host.setMinVersion(plugin.getMinimalVersion());

        ExtensionCompatibility compatibility = new ExtensionCompatibility();
        compatibility.setHost(host);
        return compatibility;
    }

    private static ExtensionActivation buildActivation(PluginConfig pluginConfig) {
        ExtensionActivation activation = new ExtensionActivation();
        activation.setAutoEnable(pluginConfig.getStatus() != null && pluginConfig.getStatus() == 1);
        activation.setSingleton(Boolean.FALSE);
        activation.setEntryPriority(DEFAULT_ENTRY_PRIORITY);
        return activation;
    }

    private static ExtensionCapability buildCapabilities(PluginFrontendDefinition frontendDefinition, File extensionRoot) {
        ExtensionCapability capability = new ExtensionCapability();
        capability.setAdmin(frontendDefinition != null
                && (!CollectionUtils.isEmpty(frontendDefinition.getModules()) || !CollectionUtils.isEmpty(frontendDefinition.getMenus())));
        capability.setPortal(Boolean.FALSE);
        capability.setServerApi(hasServerArtifact(extensionRoot));
        capability.setMigration(new File(extensionRoot, "sql").exists());
        capability.setScheduler(Boolean.FALSE);
        return capability;
    }

    private static ExtensionArtifacts buildArtifacts(File extensionRoot) {
        ExtensionArtifacts artifacts = new ExtensionArtifacts();
        if (new File(extensionRoot, "ui").exists()) {
            artifacts.setAdminDist("ui");
        }
        if (new File(extensionRoot, "sql").exists()) {
            artifacts.setMigrationsDir("sql");
        }
        if (new File(extensionRoot, "code").exists()) {
            artifacts.setServerJar("code");
        } else if (new File(extensionRoot, "classes").exists()) {
            artifacts.setServerJar("classes");
        }
        return artifacts;
    }

    private static ExtensionContributes buildContributes(PluginFrontendDefinition frontendDefinition) {
        ExtensionContributes contributes = new ExtensionContributes();
        if (frontendDefinition == null) {
            return contributes;
        }

        AdminContributes adminContributes = new AdminContributes();
        adminContributes.setRenderer(frontendDefinition.getRenderer() == null
                ? DEFAULT_RENDERER
                : frontendDefinition.getRenderer());
        adminContributes.setI18n(frontendDefinition.getI18n());
        adminContributes.setRoutes(convertRoutes(frontendDefinition.getModules()));
        adminContributes.setMenus(convertMenus(frontendDefinition.getMenus()));
        contributes.setAdmin(adminContributes);
        return contributes;
    }

    private static List<AdminRouteContribution> convertRoutes(List<PluginFrontendModuleDefinition> modules) {
        if (CollectionUtils.isEmpty(modules)) {
            return List.of();
        }
        List<AdminRouteContribution> results = new ArrayList<>();
        for (PluginFrontendModuleDefinition module : modules) {
            if (module == null || CollectionUtils.isEmpty(module.getRoutes())) {
                continue;
            }
            for (PluginFrontendRouteDefinition route : module.getRoutes()) {
                if (route == null) {
                    continue;
                }
                AdminRouteContribution contribution = new AdminRouteContribution();
                contribution.setModule(module.getModuleName());
                contribution.setName(route.getName());
                contribution.setPath(route.getPath());
                contribution.setComponent(route.getComponent());
                contribution.setComponentName(route.getComponentName());
                contribution.setMeta(convertRouteMeta(route.getMeta()));
                results.add(contribution);
            }
        }
        return results;
    }

    private static ExtensionRouteMeta convertRouteMeta(PluginFrontendRouteMeta meta) {
        if (meta == null) {
            return null;
        }
        ExtensionRouteMeta routeMeta = new ExtensionRouteMeta();
        routeMeta.setTitle(meta.getTitle());
        routeMeta.setI18nKey(meta.getI18nKey());
        routeMeta.setIcon(meta.getIcon());
        routeMeta.setOrder(meta.getOrder());
        routeMeta.setHideInMenu(meta.getHideInMenu());
        routeMeta.setKeepAlive(meta.getKeepAlive());
        routeMeta.setConstant(meta.getConstant());
        routeMeta.setActiveMenu(meta.getActiveMenu());
        routeMeta.setLayout(meta.getLayout());
        return routeMeta;
    }

    private static List<AdminMenuContribution> convertMenus(List<PluginFrontendMenuDefinition> menus) {
        if (CollectionUtils.isEmpty(menus)) {
            return List.of();
        }
        List<AdminMenuContribution> results = new ArrayList<>();
        for (PluginFrontendMenuDefinition menu : menus) {
            if (menu == null) {
                continue;
            }
            AdminMenuContribution contribution = new AdminMenuContribution();
            contribution.setRouteName(menu.getRouteName());
            contribution.setParent(menu.getParent());
            contribution.setTitle(menu.getTitle());
            contribution.setI18nKey(menu.getI18nKey());
            contribution.setIcon(menu.getIcon());
            contribution.setOrder(menu.getOrder());
            results.add(contribution);
        }
        return results;
    }

    private static boolean hasServerArtifact(File extensionRoot) {
        return new File(extensionRoot, "code").exists()
                || new File(extensionRoot, "classes").exists()
                || new File(extensionRoot, "lib").exists()
                || new File(extensionRoot, "server").exists();
    }

    private static <T> T readYaml(File yamlFile, Class<T> type) {
        try (InputStream inputStream = new FileInputStream(yamlFile)) {
            return new Yaml().loadAs(inputStream, type);
        } catch (Exception ex) {
            log.error("Failed to parse legacy manifest file: {}", yamlFile.getAbsolutePath(), ex);
            return null;
        }
    }
}
