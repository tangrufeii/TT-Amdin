package com.tt.domain.extension.model.manifest.server;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 服务端 API 贡献
 */
@Data
@NoArgsConstructor
public class ServerApiContribution {

    /**
     * API 分组名
     */
    private String group;

    /**
     * API 基础路径
     */
    private String basePath;
}
