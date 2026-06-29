package com.tt.application.portal.dto;

import lombok.Data;

import java.util.List;

/**
 * 门户运行时 DTO
 * <p>
 * 给宿主前端返回当前启用的文件主题入口。
 * </p>
 */
@Data
public class PortalRuntimeDTO {

    /**
     * 当前参与渲染的主题
     */
    private PortalThemeCurrentDTO currentTheme;

    /**
     * 主题渲染器，文件化整站主题暂不使用。
     */
    private String renderer;

    /**
     * 当前主题可见的导航标签，文件化整站主题暂不使用。
     */
    private List<PortalRuntimeTabDTO> tabs;
}
