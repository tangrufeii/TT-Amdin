package com.tt.application.plugin.service;

import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tt.domain.plugin.model.aggregate.PluginManagement;
import com.tt.domain.plugin.model.frontend.PluginFrontendDefinition;
import com.tt.domain.plugin.model.frontend.PluginFrontendMenuDefinition;
import com.tt.domain.plugin.model.frontend.PluginFrontendModuleDefinition;
import com.tt.domain.plugin.model.frontend.PluginFrontendRouteDefinition;
import com.tt.domain.plugin.model.frontend.PluginFrontendRouteMeta;
import com.tt.domain.plugin.repository.PluginFrontendDefinitionRepository;
import com.tt.domain.system.access.model.SystemMenu;
import com.tt.application.permission.command.PermissionCreateCommand;
import com.tt.application.permission.dto.PermissionManageDTO;
import com.tt.application.permission.repository.PermissionManagementRepository;
import com.tt.application.plugin.config.PluginMenuProperties;
import com.tt.domain.system.access.repository.SystemAccessRepository;
import com.tt.domain.system.menu.repository.SystemMenuRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PluginMenuSyncService {

    private static final String SOURCE_PLUGIN = "PLUGIN";
    private static final String DEFAULT_STATUS = "1";
    private static final String DEFAULT_FEATURE = "N";
    private static final String YES = "Y";
    private static final String NO = "N";
    private static final String DEFAULT_ICON_TYPE = "1";
    private static final String MENU_TYPE = "2";
    private static final String DIR_TYPE = "1";
    private static final String PLUGIN_ROOT_CODE = "plugin:root";
    private static final String PLUGIN_ROOT_ROUTE = "plugin-root";
    private static final String PLUGIN_ROOT_PATH = "/plugin-root";
    private static final String PLUGIN_ROOT_COMPONENT = "layout.base";
    private static final String PLUGIN_ROOT_NAME = "Plugin";
    private static final String PLUGIN_ROOT_I18N_KEY = "route.pluginRoot";
    private static final int MENU_CODE_MAX_LENGTH = 50;
    private static final int MENU_CODE_HASH_LENGTH = 10;
    private static final List<String> DEFAULT_ROLE_CODES = List.of("super_admin");

    private final PluginFrontendDefinitionRepository pluginFrontendDefinitionRepository;
    private final SystemMenuRepository systemMenuRepository;
    private final SystemAccessRepository systemAccessRepository;
    private final PermissionManagementRepository permissionManagementRepository;
    private final ObjectMapper objectMapper;
    private final PluginMenuProperties pluginMenuProperties;

    public void syncPluginMenus(PluginManagement plugin) {
        if (plugin == null || !StringUtils.hasText(plugin.getPluginId())) {
            return;
        }
        PluginFrontendDefinition definition = pluginFrontendDefinitionRepository
                .loadByPluginId(plugin.getPluginId())
                .orElse(null);
        if (definition == null) {
            return;
        }
        syncPluginMenus(plugin, definition);
    }

    public void removePluginMenus(String pluginId) {
        if (!StringUtils.hasText(pluginId)) {
            return;
        }
        List<SystemMenu> pluginMenus = systemMenuRepository.findBySource(SOURCE_PLUGIN, pluginId);
        if (pluginMenus.isEmpty()) {
            return;
        }
        List<Long> ids = pluginMenus.stream()
                .map(SystemMenu::getId)
                .filter(Objects::nonNull)
                .toList();
        if (ids.isEmpty()) {
            return;
        }
        systemMenuRepository.deleteRoleMenuRelations(ids);
        List<Long> permissionIds = systemMenuRepository.findPermissionIdsByMenuIds(ids);
        if (!permissionIds.isEmpty()) {
            systemMenuRepository.deleteRolePermissionRelations(permissionIds);
            systemMenuRepository.deletePermissionsByIds(permissionIds);
        }
        systemMenuRepository.deleteByIds(ids);
    }

    public void disablePluginMenus(String pluginId) {
        if (!StringUtils.hasText(pluginId)) {
            return;
        }
        List<SystemMenu> pluginMenus = systemMenuRepository.findBySource(SOURCE_PLUGIN, pluginId);
        if (pluginMenus.isEmpty()) {
            return;
        }
        pluginMenus.forEach(menu -> {
            menu.setStatus("0");
            systemMenuRepository.update(menu);
        });
    }

    private void syncPluginMenus(PluginManagement plugin, PluginFrontendDefinition definition) {
        List<PluginFrontendMenuDefinition> menuDefinitions = definition.getMenus();
        if (CollectionUtils.isEmpty(menuDefinitions)) {
            removePluginMenus(plugin.getPluginId());
            return;
        }

        SystemMenu pluginRoot = ensurePluginRoot();
        Map<String, PluginFrontendRouteDefinition> routeMap = buildRouteMap(definition.getModules());
        Map<Long, SystemMenu> menuById = systemMenuRepository.findAll().stream()
                .filter(menu -> menu.getId() != null)
                .collect(Collectors.toMap(SystemMenu::getId, menu -> menu, (a, b) -> a));
        Map<String, SystemMenu> menuByRouteName = menuById.values().stream()
                .filter(menu -> StringUtils.hasText(menu.getRouteName()))
                .collect(Collectors.toMap(SystemMenu::getRouteName, menu -> menu, (a, b) -> a));

        List<SystemMenu> existingMenus = systemMenuRepository.findBySource(SOURCE_PLUGIN, plugin.getPluginId());
        Map<String, SystemMenu> existingByRoute = existingMenus.stream()
                .filter(menu -> StringUtils.hasText(menu.getRouteName()))
                .collect(Collectors.toMap(SystemMenu::getRouteName, menu -> menu, (a, b) -> a));

        Map<String, SystemMenu> syncedMenus = new HashMap<>();
        for (PluginFrontendMenuDefinition menuDef : menuDefinitions) {
            if (menuDef == null || !StringUtils.hasText(menuDef.getRouteName())) {
                continue;
            }
            PluginFrontendRouteDefinition route = routeMap.get(menuDef.getRouteName());
            if (route == null) {
                continue;
            }
            SystemMenu existing = existingByRoute.get(menuDef.getRouteName());
            SystemMenu synced = upsertPluginMenu(plugin, pluginRoot, menuDef, route, existing, menuByRouteName);
            if (synced != null) {
                syncedMenus.put(synced.getRouteName(), synced);
                menuByRouteName.put(synced.getRouteName(), synced);
            }
        }

        cleanupRemovedMenus(existingMenus, syncedMenus.keySet());
    }

    private Map<String, PluginFrontendRouteDefinition> buildRouteMap(List<PluginFrontendModuleDefinition> modules) {
        if (CollectionUtils.isEmpty(modules)) {
            return Collections.emptyMap();
        }
        Map<String, PluginFrontendRouteDefinition> routeMap = new HashMap<>();
        for (PluginFrontendModuleDefinition module : modules) {
            if (module == null || CollectionUtils.isEmpty(module.getRoutes())) {
                continue;
            }
            for (PluginFrontendRouteDefinition route : module.getRoutes()) {
                if (route == null || !StringUtils.hasText(route.getName())) {
                    continue;
                }
                routeMap.put(route.getName(), route);
            }
        }
        return routeMap;
    }

    private SystemMenu upsertPluginMenu(PluginManagement plugin,
                                        SystemMenu pluginRoot,
                                        PluginFrontendMenuDefinition menuDef,
                                        PluginFrontendRouteDefinition route,
                                        SystemMenu existing,
                                        Map<String, SystemMenu> menuByRouteName) {
        PluginFrontendRouteMeta meta = Optional.ofNullable(route.getMeta()).orElse(new PluginFrontendRouteMeta());
        String name = resolveMenuName(menuDef, meta, route);
        String i18nKey = resolveI18nKey(menuDef, meta);
        String icon = resolveIcon(menuDef, meta);
        Integer sort = resolveOrder(menuDef, meta);
        String keepAlive = resolveKeepAlive(meta);
        String hide = resolveHide(meta);
        Long parentId = resolveParentId(menuDef, pluginRoot, menuByRouteName);

        MenuOrigin newOrigin = new MenuOrigin();
        newOrigin.setName(name);
        newOrigin.setI18nKey(i18nKey);
        newOrigin.setIcon(icon);
        newOrigin.setSort(sort);
        newOrigin.setKeepAlive(keepAlive);
        newOrigin.setHide(hide);
        newOrigin.setParentId(parentId);

        String component = buildComponent(plugin.getPluginId(), route.getComponent());
        String code = buildMenuCode(plugin.getPluginId(), route.getName());

        SystemMenu menu = existing != null ? existing : SystemMenu.builder().id(IdWorker.getId()).build();
        menu.setType(MENU_TYPE);
        menu.setRouteName(route.getName());
        menu.setPath(normalizeRoutePath(route.getPath()));
        menu.setComponent(component);
        menu.setSourceType(SOURCE_PLUGIN);
        menu.setSourceId(plugin.getPluginId());
        menu.setStatus(DEFAULT_STATUS);

        if (existing == null) {
            menu.setName(name);
            menu.setI18nKey(i18nKey);
            menu.setIcon(icon);
            menu.setIconType(DEFAULT_ICON_TYPE);
            menu.setSort(sort);
            menu.setKeepAlive(keepAlive);
            menu.setHide(hide);
            menu.setParentId(parentId);
            menu.setStatus(DEFAULT_STATUS);
            menu.setCode(code);
            menu.setOriginData(serializeOrigin(newOrigin));
            systemMenuRepository.insert(menu);
            bindDefaultRoles(menu.getId());
            ensureDefaultPermission(menu);
            return menu;
        }

        MenuOrigin origin = parseOrigin(existing.getOriginData());
        menu.setName(mergeField(existing.getName(), origin == null ? null : origin.getName(), name));
        menu.setI18nKey(mergeField(existing.getI18nKey(), origin == null ? null : origin.getI18nKey(), i18nKey));
        menu.setIcon(mergeField(existing.getIcon(), origin == null ? null : origin.getIcon(), icon));
        menu.setSort(mergeField(existing.getSort(), origin == null ? null : origin.getSort(), sort));
        menu.setKeepAlive(mergeField(existing.getKeepAlive(), origin == null ? null : origin.getKeepAlive(), keepAlive));
        menu.setHide(mergeField(existing.getHide(), origin == null ? null : origin.getHide(), hide));
        menu.setParentId(mergeField(existing.getParentId(), origin == null ? null : origin.getParentId(), parentId));
        menu.setIconType(StringUtils.hasText(existing.getIconType()) ? existing.getIconType() : DEFAULT_ICON_TYPE);
        menu.setStatus(StringUtils.hasText(existing.getStatus()) ? existing.getStatus() : DEFAULT_STATUS);
        menu.setCode(StringUtils.hasText(existing.getCode()) ? existing.getCode() : code);
        menu.setOriginData(serializeOrigin(newOrigin));
        systemMenuRepository.update(menu);
        ensureDefaultPermission(menu);
        return menu;
    }

    private void cleanupRemovedMenus(List<SystemMenu> existingMenus, Set<String> keepRouteNames) {
        if (CollectionUtils.isEmpty(existingMenus)) {
            return;
        }
        List<Long> toDelete = existingMenus.stream()
                .filter(menu -> !keepRouteNames.contains(menu.getRouteName()))
                .map(SystemMenu::getId)
                .filter(Objects::nonNull)
                .toList();
        if (toDelete.isEmpty()) {
            return;
        }
        systemMenuRepository.deleteRoleMenuRelations(toDelete);
        List<Long> permissionIds = systemMenuRepository.findPermissionIdsByMenuIds(toDelete);
        if (!permissionIds.isEmpty()) {
            systemMenuRepository.deleteRolePermissionRelations(permissionIds);
            systemMenuRepository.deletePermissionsByIds(permissionIds);
        }
        systemMenuRepository.deleteByIds(toDelete);
    }

    private SystemMenu ensurePluginRoot() {
        String rootName = Optional.ofNullable(pluginMenuProperties.getRootName())
                .filter(StringUtils::hasText)
                .orElse(PLUGIN_ROOT_NAME);
        String rootI18nKey = Optional.ofNullable(pluginMenuProperties.getRootI18nKey())
                .filter(StringUtils::hasText)
                .orElse(PLUGIN_ROOT_I18N_KEY);
        SystemMenu root = systemMenuRepository.findByCode(PLUGIN_ROOT_CODE).orElse(null);
        if (root != null) {
            boolean changed = false;
            if (!StringUtils.hasText(root.getName())) {
                root.setName(rootName);
                changed = true;
            }
            if (!StringUtils.hasText(root.getI18nKey())) {
                root.setI18nKey(rootI18nKey);
                changed = true;
            }
            if (changed) {
                systemMenuRepository.update(root);
            }
            return root;
        }
        Long parentId = resolveRootParentId();
        SystemMenu menu = SystemMenu.builder()
                .id(IdWorker.getId())
                .parentId(parentId)
                .type(DIR_TYPE)
                .name(rootName)
                .i18nKey(rootI18nKey)
                .code(PLUGIN_ROOT_CODE)
                .routeName(PLUGIN_ROOT_ROUTE)
                .path(PLUGIN_ROOT_PATH)
                .component(PLUGIN_ROOT_COMPONENT)
                .icon(Optional.ofNullable(pluginMenuProperties.getRootIcon()).orElse("mdi:puzzle-outline"))
                .iconType(DEFAULT_ICON_TYPE)
                .keepAlive(DEFAULT_FEATURE)
                .hide(DEFAULT_FEATURE)
                .multiTab(DEFAULT_FEATURE)
                .sort(0)
                .status(DEFAULT_STATUS)
                .build();
        systemMenuRepository.insert(menu);
        bindDefaultRoles(menu.getId());
        return menu;
    }

    private Long resolveRootParentId() {
        if (pluginMenuProperties.getRootParentId() != null) {
            return pluginMenuProperties.getRootParentId();
        }
        String parentRouteName = pluginMenuProperties.getRootParentRouteName();
        if (!StringUtils.hasText(parentRouteName)) {
            return 0L;
        }
        return systemMenuRepository.findByRouteName(parentRouteName)
                .map(SystemMenu::getId)
                .orElse(0L);
    }

    private void bindDefaultRoles(Long menuId) {
        List<Long> roleIds = systemAccessRepository.findRoleIdsByCodes(DEFAULT_ROLE_CODES);
        if (!roleIds.isEmpty()) {
            systemMenuRepository.bindMenuToRoles(menuId, roleIds);
        }
    }

    private void ensureDefaultPermission(SystemMenu menu) {
        if (menu == null || menu.getId() == null) {
            return;
        }
        if (!MENU_TYPE.equals(menu.getType())) {
            return;
        }
        List<PermissionManageDTO> permissions = permissionManagementRepository.listByMenuId(menu.getId());
        if (!permissions.isEmpty()) {
            return;
        }
        PermissionCreateCommand command = new PermissionCreateCommand();
        command.setMenuId(menu.getId());
        command.setName(menu.getName() + "访问");
        command.setResource(menu.getCode());
        command.setCode(menu.getCode());
        command.setSort(0);
        command.setDescription("插件自动生成");
        command.setStatus(DEFAULT_STATUS);
        permissionManagementRepository.create(command, java.time.LocalDateTime.now());
    }

    private String resolveMenuName(PluginFrontendMenuDefinition menuDef,
                                   PluginFrontendRouteMeta meta,
                                   PluginFrontendRouteDefinition route) {
        if (StringUtils.hasText(menuDef.getTitle())) {
            return menuDef.getTitle();
        }
        if (StringUtils.hasText(meta.getTitle())) {
            return meta.getTitle();
        }
        return route.getName();
    }

    private String resolveI18nKey(PluginFrontendMenuDefinition menuDef, PluginFrontendRouteMeta meta) {
        if (StringUtils.hasText(menuDef.getI18nKey())) {
            return menuDef.getI18nKey();
        }
        return meta.getI18nKey();
    }

    private String resolveIcon(PluginFrontendMenuDefinition menuDef, PluginFrontendRouteMeta meta) {
        if (StringUtils.hasText(menuDef.getIcon())) {
            return menuDef.getIcon();
        }
        return meta.getIcon();
    }

    private Integer resolveOrder(PluginFrontendMenuDefinition menuDef, PluginFrontendRouteMeta meta) {
        if (menuDef.getOrder() != null) {
            return menuDef.getOrder();
        }
        return meta.getOrder();
    }

    private String resolveKeepAlive(PluginFrontendRouteMeta meta) {
        if (meta.getKeepAlive() == null) {
            return DEFAULT_FEATURE;
        }
        return Boolean.TRUE.equals(meta.getKeepAlive()) ? YES : NO;
    }

    private String resolveHide(PluginFrontendRouteMeta meta) {
        if (meta.getHideInMenu() == null) {
            return DEFAULT_FEATURE;
        }
        return Boolean.TRUE.equals(meta.getHideInMenu()) ? YES : NO;
    }

    private Long resolveParentId(PluginFrontendMenuDefinition menuDef,
                                 SystemMenu pluginRoot,
                                 Map<String, SystemMenu> menuByRouteName) {
        if (menuDef != null && StringUtils.hasText(menuDef.getParent())) {
            SystemMenu parent = menuByRouteName.get(menuDef.getParent());
            if (parent != null) {
                return parent.getId();
            }
        }
        return pluginRoot != null ? pluginRoot.getId() : 0L;
    }

    private String buildComponent(String pluginId, String component) {
        if (!StringUtils.hasText(component)) {
            return null;
        }
        String normalized = component.startsWith("/") ? component.substring(1) : component;
        return "plugin:" + pluginId + "/" + normalized;
    }

    private String buildMenuCode(String pluginId, String routeName) {
        String normalizedPluginId = StringUtils.hasText(pluginId) ? pluginId.trim() : "unknown";
        String normalizedRouteName = StringUtils.hasText(routeName) ? routeName.trim() : "route";
        String rawCode = "plugin:" + normalizedPluginId + ":" + normalizedRouteName;
        if (rawCode.length() <= MENU_CODE_MAX_LENGTH) {
            return rawCode;
        }
        String hash = buildCodeHash(normalizedPluginId + ":" + normalizedRouteName);
        int readableLimit = MENU_CODE_MAX_LENGTH - "plugin::".length() - hash.length();
        if (readableLimit <= 0) {
            return "plugin:" + hash;
        }
        String readablePart = (normalizedPluginId + ":" + normalizedRouteName);
        if (readablePart.length() > readableLimit) {
            readablePart = readablePart.substring(0, readableLimit);
        }
        return "plugin:" + readablePart + ":" + hash;
    }

    private String buildCodeHash(String source) {
        String md5 = DigestUtils.md5DigestAsHex(source.getBytes(StandardCharsets.UTF_8));
        return md5.substring(0, Math.min(MENU_CODE_HASH_LENGTH, md5.length()));
    }

    private String normalizeRoutePath(String path) {
        if (!StringUtils.hasText(path)) {
            return path;
        }
        return path.startsWith("/") ? path : "/" + path;
    }

    private String serializeOrigin(MenuOrigin origin) {
        if (origin == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(origin);
        } catch (Exception e) {
            log.warn("Failed to serialize plugin menu origin", e);
            return null;
        }
    }

    private MenuOrigin parseOrigin(String originData) {
        if (!StringUtils.hasText(originData)) {
            return null;
        }
        try {
            return objectMapper.readValue(originData, MenuOrigin.class);
        } catch (Exception e) {
            log.warn("Failed to parse plugin menu origin", e);
            return null;
        }
    }

    private <T> T mergeField(T current, T origin, T latest) {
        if (origin == null) {
            return current;
        }
        return Objects.equals(current, origin) ? latest : current;
    }

    @Data
    private static class MenuOrigin {
        private String name;
        private String i18nKey;
        private String icon;
        private Integer sort;
        private String keepAlive;
        private String hide;
        private Long parentId;
    }
}
