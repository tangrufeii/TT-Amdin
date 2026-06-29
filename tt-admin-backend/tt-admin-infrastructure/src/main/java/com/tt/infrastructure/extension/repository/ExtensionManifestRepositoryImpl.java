package com.tt.infrastructure.extension.repository;

import com.tt.domain.extension.model.manifest.ExtensionManifest;
import com.tt.domain.extension.repository.ExtensionManifestRepository;
import com.tt.infrastructure.extension.manifest.ExtensionManifestReader;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * 扩展 Manifest 仓储实现
 */
@Slf4j
@Repository
public class ExtensionManifestRepositoryImpl implements ExtensionManifestRepository {

    @Override
    public Optional<ExtensionManifest> loadInstalled(String extensionId) {
        return ExtensionManifestReader.readInstalledManifest(extensionId);
    }
}
