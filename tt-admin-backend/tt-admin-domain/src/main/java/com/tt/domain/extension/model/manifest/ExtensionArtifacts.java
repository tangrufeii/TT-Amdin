package com.tt.domain.extension.model.manifest;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 扩展构建产物路径声明
 */
@Data
@NoArgsConstructor
public class ExtensionArtifacts {

    /**
     * 门户前端构建产物目录
     */
    private String portalDist;

    /**
     * 后台前端构建产物目录
     */
    private String adminDist;

    /**
     * 服务端扩展产物路径
     */
    private String serverJar;

    /**
     * 数据迁移目录
     */
    private String migrationsDir;

    /**
     * 配置 Schema 路径
     */
    private String configSchema;

    /**
     * 默认配置路径
     */
    private String defaultConfig;
}
