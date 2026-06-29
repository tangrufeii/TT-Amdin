package com.tt.domain.extension.model.manifest;

import com.tt.domain.extension.model.manifest.admin.AdminContributes;
import com.tt.domain.extension.model.manifest.portal.PortalContributes;
import com.tt.domain.extension.model.manifest.server.ServerContributes;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 扩展贡献声明集合
 */
@Data
@NoArgsConstructor
public class ExtensionContributes {

    /**
     * 门户侧贡献
     */
    private PortalContributes portal;

    /**
     * 后台侧贡献
     */
    private AdminContributes admin;

    /**
     * 服务端贡献
     */
    private ServerContributes server;
}
