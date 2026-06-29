package com.tt.infrastructure.extension.manifest;

import com.tt.domain.extension.model.manifest.ExtensionActivation;
import com.tt.domain.extension.model.manifest.ExtensionCapability;
import com.tt.domain.extension.model.manifest.ExtensionContributes;
import com.tt.domain.extension.model.manifest.ExtensionManifest;
import com.tt.domain.extension.model.manifest.admin.AdminContributes;
import com.tt.domain.extension.model.manifest.portal.PortalContributes;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.model.enums.PluginResourceDirectory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
import org.yaml.snakeyaml.Yaml;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Optional;

/**
 * 统一 Manifest 读取器
 * <p>
 * 识别顺序固定如下：
 * 1. 优先读 `extension.yaml`
 * 2. 不存在时回退读 legacy `plugin.yaml + frontend.yaml`
 */
@Slf4j
public final class ExtensionManifestReader {

    private ExtensionManifestReader() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * 从扩展根目录读取 Manifest
     *
     * @param extensionRoot 扩展根目录
     * @return Manifest，可为空
     */
    public static Optional<ExtensionManifest> readManifest(File extensionRoot) {
        if (extensionRoot == null || !extensionRoot.exists()) {
            return Optional.empty();
        }

        File extensionYaml = new File(extensionRoot, PluginResourceDirectory.EXTENSION_FILE.getPath());
        if (extensionYaml.exists()) {
            ExtensionManifest manifest = readNewManifest(extensionYaml);
            return Optional.ofNullable(normalizeManifest(manifest));
        }

        return Optional.ofNullable(LegacyPluginManifestAdapter.adapt(extensionRoot))
                .map(ExtensionManifestReader::normalizeManifest);
    }

    /**
     * 读取已安装扩展的 Manifest
     *
     * @param extensionId 扩展ID
     * @return Manifest，可为空
     */
    public static Optional<ExtensionManifest> readInstalledManifest(String extensionId) {
        if (!StringUtils.hasText(extensionId)) {
            return Optional.empty();
        }
        File extensionDir = new File(PluginDirectory.PLUGIN_DIRECTORY.getPath(), extensionId);
        return readManifest(extensionDir);
    }

    /**
     * 读取开发目录下的 Manifest
     *
     * @param pluginPath 开发环境插件路径
     * @return Manifest，可为空
     */
    public static Optional<ExtensionManifest> readDevManifest(String pluginPath) {
        if (!StringUtils.hasText(pluginPath)) {
            return Optional.empty();
        }
        File classesDir = new File(pluginPath, PluginResourceDirectory.CLASSES_DIR.getPath());
        return readManifest(classesDir);
    }

    private static ExtensionManifest readNewManifest(File extensionYaml) {
        try (InputStream inputStream = new FileInputStream(extensionYaml)) {
            ExtensionManifest manifest = new Yaml().loadAs(inputStream, ExtensionManifest.class);
            if (manifest == null) {
                log.error("Extension manifest parsed to null: {}", extensionYaml.getAbsolutePath());
                return null;
            }
            log.debug("Successfully parsed extension manifest: {}", extensionYaml.getAbsolutePath());
            return manifest;
        } catch (Exception ex) {
            log.error("Failed to parse extension manifest: {}", extensionYaml.getAbsolutePath(), ex);
            return null;
        }
    }

    private static ExtensionManifest normalizeManifest(ExtensionManifest manifest) {
        if (manifest == null || manifest.getExtension() == null) {
            return null;
        }
        if (!StringUtils.hasText(manifest.getExtension().getId())
                || !StringUtils.hasText(manifest.getExtension().getName())
                || !StringUtils.hasText(manifest.getExtension().getVersion())
                || !StringUtils.hasText(manifest.getExtension().getType())) {
            log.error("Extension manifest missing required fields: extension.id/name/version/type");
            return null;
        }
        if (manifest.resolveType() == null) {
            log.error("Extension manifest has invalid extension.type: {}", manifest.getExtension().getType());
            return null;
        }

        if (manifest.getManifestVersion() == null) {
            manifest.setManifestVersion(2);
        }

        ExtensionActivation activation = manifest.getActivation();
        if (activation == null) {
            activation = new ExtensionActivation();
            manifest.setActivation(activation);
        }
        if (activation.getAutoEnable() == null) {
            activation.setAutoEnable(Boolean.FALSE);
        }
        if (activation.getSingleton() == null) {
            activation.setSingleton(Boolean.FALSE);
        }
        if (activation.getEntryPriority() == null) {
            activation.setEntryPriority(100);
        }

        if (manifest.isThemeExtension()) {
            activation.setSingleton(Boolean.TRUE);
        }

        ExtensionCapability capability = manifest.getCapabilities();
        if (capability == null) {
            capability = new ExtensionCapability();
            manifest.setCapabilities(capability);
        }

        ExtensionContributes contributes = manifest.getContributes();
        if (contributes == null) {
            contributes = new ExtensionContributes();
            manifest.setContributes(contributes);
        }
        if (contributes.getAdmin() == null) {
            contributes.setAdmin(new AdminContributes());
        }
        if (contributes.getPortal() == null) {
            contributes.setPortal(new PortalContributes());
        }

        return manifest;
    }
}
