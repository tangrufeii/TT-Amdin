package com.tt.application.menu.service;

import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tt.application.menu.command.MenuCommand;
import com.tt.application.menu.command.MenuCreateCommand;
import com.tt.application.menu.command.MenuDeleteCommand;
import com.tt.application.menu.command.MenuQueryCommand;
import com.tt.application.menu.command.MenuUpdateCommand;
import com.tt.application.menu.dto.MenuDetailDTO;
import com.tt.application.menu.dto.MenuDTO;
import com.tt.application.menu.dto.MenuQueryDTO;
import com.tt.application.menu.dto.MenuTreeDTO;
import com.tt.common.domain.DomainException;
import com.tt.domain.system.access.model.SystemDict;
import com.tt.domain.system.access.model.SystemMenu;
import com.tt.domain.system.access.repository.SystemAccessRepository;
import com.tt.domain.system.menu.repository.SystemMenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.Deque;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenuApplicationService {

    private static final String FRONTEND_PAGE_DICT_CODE = "frontend_page";
    private static final String DEFAULT_STATUS = "1";
    private static final String DEFAULT_FEATURE = "N";
    private static final List<String> DEFAULT_ROLE_CODES = List.of("super_admin");

    private final SystemMenuRepository systemMenuRepository;
    private final SystemAccessRepository systemAccessRepository;
    private final ObjectMapper objectMapper;

    public List<MenuTreeDTO> getMenuTree() {
        List<SystemMenu> menus = systemMenuRepository.findAll();
        Map<Long, List<SystemMenu>> menuGroup = menus.stream()
                .collect(Collectors.groupingBy(menu -> Optional.ofNullable(menu.getParentId()).orElse(0L)));
        return buildChildren(menuGroup, 0L);
    }

    public MenuDetailDTO getMenuDetail(Long id) {
        SystemMenu menu = systemMenuRepository.findById(id)
                .orElseThrow(() -> new DomainException("菜单不存在"));
        MenuDetailDTO dto = new MenuDetailDTO();
        fillMenuDTO(dto, menu);
        dto.setRemark(menu.getRemark());
        return dto;
    }

    public void createMenu(MenuCreateCommand command) {
        validateParent(command.getParentId(), command.getType(), null);
        ensureUniqueRoute(command.getRouteName(), command.getRoutePath(), null);
        SystemMenu menu = buildSystemMenu(command, IdWorker.getId());
        systemMenuRepository.insert(menu);
        bindDefaultRoles(menu.getId());
    }

    public void updateMenu(MenuUpdateCommand command) {
        Long id = command.getId();
        SystemMenu existing = systemMenuRepository.findById(id)
                .orElseThrow(() -> new DomainException("菜单不存在"));
        validateParent(command.getParentId(), command.getType(), id);
        ensureUniqueRoute(command.getRouteName(), command.getRoutePath(), id);
        SystemMenu menu = buildSystemMenu(command, id);
        menu.setCreateTime(existing.getCreateTime());
        systemMenuRepository.update(menu);
    }

    public void deleteMenus(MenuDeleteCommand command) {
        List<Long> ids = command.getIds();
        if (CollectionUtils.isEmpty(ids)) {
            return;
        }
        List<SystemMenu> menus = systemMenuRepository.findAll();
        Map<Long, List<SystemMenu>> menuGroup = menus.stream()
                .collect(Collectors.groupingBy(menu -> Optional.ofNullable(menu.getParentId()).orElse(0L)));
        Set<Long> targetIds = collectWithChildren(ids, menuGroup);
        if (targetIds.isEmpty()) {
            return;
        }
        systemMenuRepository.deleteRoleMenuRelations(targetIds);
        List<Long> permissionIds = systemMenuRepository.findPermissionIdsByMenuIds(targetIds);
        if (!permissionIds.isEmpty()) {
            systemMenuRepository.deleteRolePermissionRelations(permissionIds);
            systemMenuRepository.deletePermissionsByIds(permissionIds);
        }
        systemMenuRepository.deleteByIds(targetIds);
    }

    public List<String> getAllPages() {
        return systemAccessRepository.findAllEnabledDicts().stream()
                .filter(dict -> FRONTEND_PAGE_DICT_CODE.equals(dict.getCode()))
                .findFirst()
                .map(SystemDict::getItems)
                .map(items -> items.stream().map(item -> item.getValue()).toList())
                .orElse(List.of());
    }

    private void validateParent(Long parentId, String type, Long selfId) {
        if (parentId == null || parentId == 0L) {
            return;
        }
        if (Objects.equals(parentId, selfId)) {
            throw new DomainException("父级菜单不能为自身");
        }
        SystemMenu parent = systemMenuRepository.findById(parentId)
                .orElseThrow(() -> new DomainException("父级菜单不存在"));
        if ("1".equals(type)) {
            return;
        }
        if (!"1".equals(parent.getType())) {
            throw new DomainException("只能在目录下创建菜单");
        }
    }

    private void ensureUniqueRoute(String routeName, String routePath, Long excludeId) {
        if (systemMenuRepository.existsRouteName(routeName, excludeId)) {
            throw new DomainException("路由名称已存在");
        }
        if (systemMenuRepository.existsPath(routePath, excludeId)) {
            throw new DomainException("路由路径已存在");
        }
    }

    private SystemMenu buildSystemMenu(MenuCommand command, Long id) {
        String routePath = normalizeRoutePath(command.getRoutePath());
        SystemMenu.SystemMenuBuilder builder = SystemMenu.builder()
                .id(id)
                .parentId(command.getParentId())
                .type(command.getType())
                .name(command.getName())
                .code(command.getCode())
                .i18nKey(resolveI18nKey(command.getI18nKey(), command.getRouteName()))
                .routeName(command.getRouteName())
                .path(routePath)
                .component(command.getComponent())
                .icon(command.getIcon())
                .iconType(StringUtils.hasText(command.getIconType()) ? command.getIconType() : "1")
                .keepAlive(defaultValue(command.getKeepAlive(), DEFAULT_FEATURE))
                .hide(defaultValue(command.getHide(), DEFAULT_FEATURE))
                .multiTab(defaultValue(command.getMultiTab(), DEFAULT_FEATURE))
                .fixedIndexInTab(command.getFixedIndexInTab())
                .href(command.getHref())
                .iframeUrl(command.getIframeUrl())
                .sort(Optional.ofNullable(command.getSort()).orElse(0))
                .status(defaultValue(command.getStatus(), DEFAULT_STATUS))
                .remark(command.getRemark())
                .query(serializeQuery(command.getQuery()));
        return builder.build();
    }

    private String resolveI18nKey(String i18nKey, String routeName) {
        if (StringUtils.hasText(i18nKey)) {
            return i18nKey;
        }
        return "route." + routeName;
    }

    private String normalizeRoutePath(String path) {
        if (!StringUtils.hasText(path)) {
            return path;
        }
        return path.startsWith("/") ? path : "/" + path;
    }

    private String serializeQuery(List<MenuQueryCommand> query) {
        if (CollectionUtils.isEmpty(query)) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(query.stream()
                    .filter(item -> StringUtils.hasText(item.getKey()))
                    .map(item -> {
                        MenuQueryDTO dto = new MenuQueryDTO();
                        dto.setKey(item.getKey());
                        dto.setValue(item.getValue());
                        return dto;
                    }).toList());
        } catch (JsonProcessingException e) {
            throw new DomainException("查询参数格式错误");
        }
    }

    private List<MenuTreeDTO> buildChildren(Map<Long, List<SystemMenu>> menuGroup, Long parentId) {
        List<SystemMenu> children = menuGroup.getOrDefault(parentId, List.of());
        Comparator<SystemMenu> comparator = Comparator
                .comparing((SystemMenu menu) -> Optional.ofNullable(menu.getSort()).orElse(0))
                .thenComparing(SystemMenu::getId);
        return children.stream()
                .sorted(comparator)
                .map(menu -> {
                    MenuTreeDTO dto = new MenuTreeDTO();
                    fillMenuDTO(dto, menu);
                    dto.setChildren(buildChildren(menuGroup, menu.getId()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    private void fillMenuDTO(MenuDTO dto, SystemMenu menu) {
        dto.setId(menu.getId());
        dto.setParentId(menu.getParentId());
        dto.setType(menu.getType());
        dto.setName(menu.getName());
        dto.setCode(menu.getCode());
        dto.setI18nKey(menu.getI18nKey());
        dto.setRouteName(menu.getRouteName());
        dto.setRoutePath(menu.getPath());
        dto.setComponent(menu.getComponent());
        dto.setIcon(menu.getIcon());
        dto.setIconType(menu.getIconType());
        dto.setStatus(menu.getStatus());
        dto.setHide(menu.getHide());
        dto.setHref(menu.getHref());
        dto.setIframeUrl(menu.getIframeUrl());
        dto.setKeepAlive(menu.getKeepAlive());
        dto.setSort(menu.getSort());
        dto.setMultiTab(menu.getMultiTab());
        dto.setFixedIndexInTab(menu.getFixedIndexInTab());
        dto.setQuery(parseQuery(menu.getQuery()));
    }

    private List<MenuQueryDTO> parseQuery(String query) {
        if (!StringUtils.hasText(query)) {
            return List.of();
        }
        try {
            return objectMapper.readValue(query, new TypeReference<List<MenuQueryDTO>>() {
            });
        } catch (Exception e) {
            return List.of();
        }
    }

    private Set<Long> collectWithChildren(List<Long> rootIds, Map<Long, List<SystemMenu>> menuGroup) {
        Deque<Long> stack = new ArrayDeque<>(rootIds);
        Set<Long> result = rootIds.stream().filter(Objects::nonNull).collect(Collectors.toSet());
        while (!stack.isEmpty()) {
            Long current = stack.pop();
            List<SystemMenu> children = menuGroup.getOrDefault(current, List.of());
            for (SystemMenu child : children) {
                if (result.add(child.getId())) {
                    stack.push(child.getId());
                }
            }
        }
        return result;
    }

    private void bindDefaultRoles(Long menuId) {
        List<Long> roleIds = systemAccessRepository.findRoleIdsByCodes(DEFAULT_ROLE_CODES);
        if (!roleIds.isEmpty()) {
            systemMenuRepository.bindMenuToRoles(menuId, roleIds);
        }
    }

    private String defaultValue(String value, String defaultValue) {
        return StringUtils.hasText(value) ? value : defaultValue;
    }
}
