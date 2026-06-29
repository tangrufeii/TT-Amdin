package com.tt.domain.extension.model.manifest.server;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 服务端权限贡献
 */
@Data
@NoArgsConstructor
public class ServerPermissionContribution {

    /**
     * 权限资源编码
     */
    private String resource;

    /**
     * 权限标题
     */
    private String title;

    /**
     * 权限描述
     */
    private String description;
}
