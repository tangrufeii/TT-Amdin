package com.tt.domain.extension.model.manifest.portal;

import com.tt.domain.extension.model.manifest.ExtensionRouteMeta;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 门户路由贡献
 */
@Data
@NoArgsConstructor
public class PortalRouteContribution {

    /**
     * 路由名称
     */
    private String name;

    /**
     * 路由路径
     */
    private String path;

    /**
     * 组件路径
     */
    private String component;

    /**
     * 组件名称
     */
    private String componentName;

    /**
     * 路由元信息
     */
    private ExtensionRouteMeta meta;
}
