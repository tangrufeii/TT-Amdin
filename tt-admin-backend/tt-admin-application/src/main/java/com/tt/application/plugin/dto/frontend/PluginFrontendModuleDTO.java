package com.tt.application.plugin.dto.frontend;

import lombok.Data;

import java.util.List;
import java.util.Map;

/**
 * 插件前端模块 DTO
 */
@Data
public class PluginFrontendModuleDTO {

    private String moduleName;

    private String pluginId;

    private String pluginName;

    private String pluginVersion;

    private Boolean pluginIsDev;

    private String frontDevAddress;

    private List<PluginFrontendRouteDTO> routes;

    private List<PluginFrontendMenuDTO> menus;

    private Map<String, String> i18n;
}
