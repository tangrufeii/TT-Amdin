package com.tt.domain.system.access.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tt.domain.system.access.model.SystemMenu;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 菜单路由构建领域服务
 */
@Component
@RequiredArgsConstructor
public class SystemRouteDomainService {

    private final ObjectMapper objectMapper;

    public List<SystemRouteNode> buildRouteTree(List<SystemMenu> menus, Map<Long, List<String>> menuPermissions) {
        Map<Long, List<SystemMenu>> menuGroup = menus.stream()
                .collect(Collectors.groupingBy(menu -> Optional.ofNullable(menu.getParentId()).orElse(0L)));
        return buildChildren(menuGroup, 0L, menuPermissions);
    }

    private List<SystemRouteNode> buildChildren(Map<Long, List<SystemMenu>> menuGroup,
                                                Long parentId,
                                                Map<Long, List<String>> menuPermissions) {
        List<SystemMenu> children = menuGroup.getOrDefault(parentId, Collections.emptyList());
        return children.stream()
                .sorted(Comparator.comparing(menu -> Optional.ofNullable(menu.getSort()).orElse(0)))
                .map(menu -> {
                    SystemRouteMeta meta = SystemRouteMeta.builder()
                            .title(menu.getName())
                            .i18nKey(menu.getI18nKey())
                            .icon(resolveIcon(menu))
                            .localIcon(resolveLocalIcon(menu))
                            .order(menu.getSort())
                            .keepAlive("Y".equalsIgnoreCase(menu.getKeepAlive()))
                            .hideInMenu("Y".equalsIgnoreCase(menu.getHide()))
                            .multiTab("Y".equalsIgnoreCase(menu.getMultiTab()))
                            .fixedIndexInTab(menu.getFixedIndexInTab())
                            .href(menu.getHref())
                            .query(parseQuery(menu.getQuery()))
                            .permissions(menuPermissions.getOrDefault(menu.getId(), Collections.emptyList()))
                            .build();
                    SystemRouteProps props = SystemRouteProps.builder()
                            .url(menu.getIframeUrl())
                            .build();
                    return SystemRouteNode.builder()
                            .name(menu.getRouteName())
                            .path(menu.getPath())
                            .component(menu.getComponent())
                            .meta(meta)
                            .props(props)
                            .children(buildChildren(menuGroup, menu.getId(), menuPermissions))
                            .build();
                })
                .collect(Collectors.toList());
    }

    private String resolveIcon(SystemMenu menu) {
        if ("2".equals(menu.getIconType())) {
            return null;
        }
        return menu.getIcon();
    }

    private String resolveLocalIcon(SystemMenu menu) {
        if ("2".equals(menu.getIconType())) {
            return menu.getIcon();
        }
        return null;
    }

    private List<SystemRouteMeta.RouteQuery> parseQuery(String query) {
        if (query == null || query.isBlank()) {
            return Collections.emptyList();
        }
        try {
            return objectMapper.readValue(query, new TypeReference<List<SystemRouteMeta.RouteQuery>>() {});
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    /**
     * 路由节点定义
     */
    @lombok.Data
    @lombok.Builder
    public static class SystemRouteNode {
        private String name;
        private String path;
        private String component;
        private SystemRouteMeta meta;
        private SystemRouteProps props;
        private List<SystemRouteNode> children;
    }

    /**
     * 路由属性
     */
    @lombok.Data
    @lombok.Builder
    public static class SystemRouteProps {
        private String url;
    }

    /**
     * 路由元信息
     */
    @lombok.Data
    @lombok.Builder
    public static class SystemRouteMeta {

        private String title;
        private String i18nKey;
        private String icon;
        private String localIcon;
        private Integer order;
        private boolean keepAlive;
        private boolean hideInMenu;
        private boolean multiTab;
        private Integer fixedIndexInTab;
        private String href;
        private List<RouteQuery> query;
        private List<String> permissions;

        @lombok.Data
        @lombok.Builder
        public static class RouteQuery {
            private String key;
            private String value;
        }
    }
}
