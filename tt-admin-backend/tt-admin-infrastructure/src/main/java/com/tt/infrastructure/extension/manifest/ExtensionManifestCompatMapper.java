package com.tt.infrastructure.extension.manifest;

import com.tt.domain.extension.model.manifest.ExtensionActivation;
import com.tt.domain.extension.model.manifest.ExtensionAuthor;
import com.tt.domain.extension.model.manifest.ExtensionCapability;
import com.tt.domain.extension.model.manifest.ExtensionCompatibility;
import com.tt.domain.extension.model.manifest.ExtensionContributes;
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
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Manifest 兼容映射器
 * <p>
 * 这层只干兼容投影：
 * 1. 新 Manifest -> 旧 PluginConfig
 * 2. 新 Manifest -> 旧 PluginFrontendDefinition
 * 让现有安装器和前端模块接口在过渡期继续跑。
 */
public final class ExtensionManifestCompatMapper {

    private static final String DEFAULT_ADMIN_MODULE = "index";

    private ExtensionManifestCompatMapper() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * 将统一 Manifest 投影成旧插件配置
     *
     * @param manifest 统一 Manifest
     * @return 旧插件配置对象
     */
    public static PluginConfig toPluginConfig(ExtensionManifest manifest) {
        if (manifest == null || manifest.getExtension() == null) {
            return null;
        }

        ExtensionMeta extension = manifest.getExtension();
        ExtensionAuthor extensionAuthor = extension.getAuthor();
        ExtensionCompatibility compatibility = manifest.getCompatibility();
        ExtensionActivation activation = manifest.getActivation();

        PluginInfoConfig pluginInfo = new PluginInfoConfig();
        pluginInfo.setId(extension.getId());
        pluginInfo.setName(extension.getName());
        pluginInfo.setDescription(extension.getDescription());
        pluginInfo.setVersion(extension.getVersion());
        if (compatibility != null && compatibility.getHost() != null) {
            pluginInfo.setMinimalVersion(compatibility.getHost().getMinVersion());
        }

        PluginAuthor author = new PluginAuthor();
        if (extensionAuthor != null) {
            author.setName(extensionAuthor.getName());
            author.setEmail(extensionAuthor.getEmail());
            author.setWebSite(extensionAuthor.getWebsite());
        }

        PluginConfig pluginConfig = new PluginConfig();
        pluginConfig.setPlugin(pluginInfo);
        pluginConfig.setAuthor(author);
        pluginConfig.setStatus(resolveLegacyStatus(activation));
        return pluginConfig;
    }

    /**
     * 将统一 Manifest 投影成旧前端定义
     *
     * @param manifest 统一 Manifest
     * @return 旧前端定义，不存在后台贡献时返回 null
     */
    public static PluginFrontendDefinition toPluginFrontendDefinition(ExtensionManifest manifest) {
        if (manifest == null) {
            return null;
        }
        ExtensionContributes contributes = manifest.getContributes();
        if (contributes == null || contributes.getAdmin() == null) {
            return null;
        }

        AdminContributes adminContributes = contributes.getAdmin();
        boolean hasRoutes = !CollectionUtils.isEmpty(adminContributes.getRoutes());
        boolean hasMenus = !CollectionUtils.isEmpty(adminContributes.getMenus());
        if (!hasRoutes && !hasMenus) {
            return null;
        }

        PluginFrontendDefinition frontendDefinition = new PluginFrontendDefinition();
        frontendDefinition.setRenderer(adminContributes.getRenderer());
        frontendDefinition.setI18n(adminContributes.getI18n());
        frontendDefinition.setModules(convertModules(adminContributes.getRoutes()));
        frontendDefinition.setMenus(convertMenus(adminContributes.getMenus()));
        return frontendDefinition;
    }

    /**
     * 根据 Manifest 推导旧链路需要的能力信息
     *
     * @param manifest 统一 Manifest
     * @return 能力声明
     */
    public static ExtensionCapability normalizeCapabilities(ExtensionManifest manifest) {
        ExtensionCapability capabilities = manifest.getCapabilities();
        if (capabilities == null) {
            capabilities = new ExtensionCapability();
            manifest.setCapabilities(capabilities);
        }
        return capabilities;
    }

    private static Integer resolveLegacyStatus(ExtensionActivation activation) {
        return activation != null && Boolean.TRUE.equals(activation.getAutoEnable()) ? 1 : 0;
    }

    private static List<PluginFrontendModuleDefinition> convertModules(List<AdminRouteContribution> routes) {
        if (CollectionUtils.isEmpty(routes)) {
            return List.of();
        }

        Map<String, List<AdminRouteContribution>> routesByModule = new LinkedHashMap<>();
        for (AdminRouteContribution route : routes) {
            if (route == null || !StringUtils.hasText(route.getName())) {
                continue;
            }
            String moduleName = StringUtils.hasText(route.getModule()) ? route.getModule().trim() : DEFAULT_ADMIN_MODULE;
            routesByModule.computeIfAbsent(moduleName, key -> new ArrayList<>()).add(route);
        }

        List<PluginFrontendModuleDefinition> modules = new ArrayList<>();
        for (Map.Entry<String, List<AdminRouteContribution>> entry : routesByModule.entrySet()) {
            PluginFrontendModuleDefinition module = new PluginFrontendModuleDefinition();
            module.setModuleName(entry.getKey());
            module.setRoutes(entry.getValue().stream().map(ExtensionManifestCompatMapper::convertRoute).toList());
            modules.add(module);
        }
        return modules;
    }

    private static PluginFrontendRouteDefinition convertRoute(AdminRouteContribution route) {
        PluginFrontendRouteDefinition definition = new PluginFrontendRouteDefinition();
        definition.setName(route.getName());
        definition.setPath(route.getPath());
        definition.setComponent(route.getComponent());
        definition.setComponentName(route.getComponentName());
        definition.setMeta(convertRouteMeta(route.getMeta()));
        return definition;
    }

    private static PluginFrontendRouteMeta convertRouteMeta(ExtensionRouteMeta meta) {
        if (meta == null) {
            return null;
        }
        PluginFrontendRouteMeta routeMeta = new PluginFrontendRouteMeta();
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

    private static List<PluginFrontendMenuDefinition> convertMenus(List<AdminMenuContribution> menus) {
        if (CollectionUtils.isEmpty(menus)) {
            return List.of();
        }
        List<PluginFrontendMenuDefinition> results = new ArrayList<>();
        for (AdminMenuContribution menu : menus) {
            if (menu == null || !StringUtils.hasText(menu.getRouteName())) {
                continue;
            }
            PluginFrontendMenuDefinition definition = new PluginFrontendMenuDefinition();
            definition.setRouteName(menu.getRouteName());
            definition.setParent(menu.getParent());
            definition.setTitle(menu.getTitle());
            definition.setI18nKey(menu.getI18nKey());
            definition.setIcon(menu.getIcon());
            definition.setOrder(menu.getOrder());
            results.add(definition);
        }
        return results;
    }
}
