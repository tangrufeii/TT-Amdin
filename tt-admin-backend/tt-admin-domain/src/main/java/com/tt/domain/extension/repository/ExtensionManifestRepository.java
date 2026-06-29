package com.tt.domain.extension.repository;

import com.tt.domain.extension.model.manifest.ExtensionManifest;

import java.util.Optional;

/**
 * 扩展 Manifest 读取仓储
 * <p>
 * 负责从安装目录或开发目录读取统一扩展声明。
 * 领域层只关心“能拿到 Manifest”，不关心底层到底是 extension.yaml
 * 还是 legacy plugin.yaml/frontend.yaml 适配出来的。
 */
public interface ExtensionManifestRepository {

    /**
     * 根据扩展 ID 读取已安装扩展的 Manifest
     *
     * @param extensionId 扩展ID
     * @return Manifest，可为空
     */
    Optional<ExtensionManifest> loadInstalled(String extensionId);
}
