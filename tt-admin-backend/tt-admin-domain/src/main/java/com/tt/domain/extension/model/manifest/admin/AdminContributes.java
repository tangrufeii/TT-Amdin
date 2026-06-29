package com.tt.domain.extension.model.manifest.admin;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

/**
 * 后台挂载声明
 */
@Data
@NoArgsConstructor
public class AdminContributes {

    /**
     * 前端渲染模式，兼容旧 frontend.yaml 的 renderer
     */
    private String renderer;

    /**
     * 后台路由声明
     */
    private List<AdminRouteContribution> routes;

    /**
     * 后台菜单声明
     */
    private List<AdminMenuContribution> menus;

    /**
     * 后台页面级扩展位声明
     */
    private List<AdminPageContribution> pages;

    /**
     * 国际化资源映射，兼容旧 frontend.yaml 的 i18n
     */
    private Map<String, String> i18n;
}
