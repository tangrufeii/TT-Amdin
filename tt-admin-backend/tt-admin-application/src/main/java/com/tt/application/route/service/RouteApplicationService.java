package com.tt.application.route.service;

import com.tt.application.route.dto.RouteDTO;
import com.tt.application.route.dto.RouteMetaDTO;
import com.tt.application.route.dto.RoutePropsDTO;
import com.tt.application.route.dto.RouteQueryDTO;
import com.tt.application.route.dto.UserRouteDTO;
import com.tt.domain.system.access.repository.SystemAccessRepository;
import com.tt.domain.system.access.service.SystemRouteDomainService;
import com.tt.domain.system.access.service.SystemRouteDomainService.SystemRouteMeta;
import com.tt.domain.system.access.service.SystemRouteDomainService.SystemRouteNode;
import com.tt.domain.system.access.service.SystemRouteDomainService.SystemRouteProps;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RouteApplicationService {

    private final SystemAccessRepository systemAccessRepository;
    private final SystemRouteDomainService systemRouteDomainService;

    public List<RouteDTO> getConstantRoutes() {
        List<RouteDTO> constantRoutes = new ArrayList<>();
        constantRoutes.add(createSimpleRoute("403", "/403", "layout.blank$view.403", "route.403"));
        constantRoutes.add(createSimpleRoute("404", "/404", "layout.blank$view.404", "route.404"));
        constantRoutes.add(createSimpleRoute("500", "/500", "layout.blank$view.500", "route.500"));
        constantRoutes.add(createSimpleRoute("login", "/login/:module(pwd-login|code-login|register|reset-pwd|bind-wechat)?",
                "layout.blank$view.login", "route.login"));
        constantRoutes.add(createSimpleRoute("iframe-page", "/iframe-page/:url", "layout.base$view.iframe-page", "route.iframe-page"));
        return constantRoutes;
    }

    public UserRouteDTO getUserRoutes(Long userId) {
        List<Long> roleIds = systemAccessRepository.findRoleIdsByUserId(userId);
        Map<Long, List<String>> permissionMap = systemAccessRepository.findPermissionResourcesByRoleIds(roleIds);
        var menus = systemAccessRepository.findMenusByRoleIds(roleIds);
        var routeNodes = systemRouteDomainService.buildRouteTree(menus, permissionMap);
        UserRouteDTO result = new UserRouteDTO();
        result.setHome("home");
        result.setRoutes(routeNodes.stream().map(this::convertRoute).toList());
        return result;
    }

    public boolean isRouteExist(String routeName) {
        return systemAccessRepository.existsRouteName(routeName);
    }

    private RouteDTO convertRoute(SystemRouteNode node) {
        RouteDTO dto = new RouteDTO();
        dto.setName(node.getName());
        dto.setPath(node.getPath());
        dto.setComponent(node.getComponent());
        dto.setMeta(convertMeta(node.getMeta()));
        dto.setProps(convertProps(node.getProps()));
        if (!CollectionUtils.isEmpty(node.getChildren())) {
            dto.setChildren(node.getChildren().stream().map(this::convertRoute).toList());
        }
        return dto;
    }

    private RouteMetaDTO convertMeta(SystemRouteMeta meta) {
        if (meta == null) {
            return null;
        }
        RouteMetaDTO dto = new RouteMetaDTO();
        dto.setTitle(meta.getTitle());
        dto.setI18nKey(meta.getI18nKey());
        dto.setIcon(meta.getIcon());
        dto.setLocalIcon(meta.getLocalIcon());
        dto.setOrder(meta.getOrder());
        dto.setKeepAlive(meta.isKeepAlive());
        dto.setHideInMenu(meta.isHideInMenu());
        dto.setMultiTab(meta.isMultiTab());
        dto.setFixedIndexInTab(meta.getFixedIndexInTab());
        dto.setHref(meta.getHref());
        if (!CollectionUtils.isEmpty(meta.getQuery())) {
            dto.setQuery(meta.getQuery().stream().map(query -> {
                RouteQueryDTO queryDTO = new RouteQueryDTO();
                queryDTO.setKey(query.getKey());
                queryDTO.setValue(query.getValue());
                return queryDTO;
            }).toList());
        }
        dto.setPermissions(meta.getPermissions());
        return dto;
    }

    private Object convertProps(SystemRouteProps props) {
        if (props == null) {
            return null;
        }
        if (props.getUrl() == null || props.getUrl().isBlank()) {
            return null;
        }
        RoutePropsDTO dto = new RoutePropsDTO();
        dto.setUrl(props.getUrl());
        return dto;
    }

    private RouteDTO createSimpleRoute(String name, String path, String component, String i18nKey) {
        RouteDTO route = new RouteDTO();
        route.setName(name);
        route.setPath(path);
        route.setComponent(component);
        RouteMetaDTO meta = new RouteMetaDTO();
        meta.setTitle(name);
        meta.setI18nKey(i18nKey);
        meta.setConstant(true);
        meta.setHideInMenu(true);
        route.setMeta(meta);
        if ("iframe-page".equals(name)) {
            route.setProps(Boolean.TRUE);
        }
        return route;
    }
}
