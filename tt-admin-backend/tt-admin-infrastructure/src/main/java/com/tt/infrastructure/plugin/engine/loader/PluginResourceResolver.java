package com.tt.infrastructure.plugin.engine.loader;

import com.tt.domain.extension.model.manifest.ExtensionArtifacts;
import com.tt.domain.extension.model.manifest.ExtensionManifest;
import com.tt.domain.plugin.model.aggregate.Plugin;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.infrastructure.plugin.engine.config.PluginConfigReader;
import com.tt.infrastructure.plugin.engine.holder.PluginHolder;
import com.tt.infrastructure.extension.manifest.ExtensionManifestReader;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileUrlResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.resource.AbstractResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class PluginResourceResolver extends AbstractResourceResolver {

    private final static Logger LOGGER = LoggerFactory.getLogger(PluginResourceResolver.class);
    @Override
    protected Resource resolveResourceInternal(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {
        int startOffset = (requestPath.startsWith("/") ? 1 : 0);
        int endOffset = requestPath.indexOf('/', 1);
        if (endOffset != -1) {
            String pluginId = requestPath.substring(startOffset, endOffset);
            String partialPath = requestPath.substring(endOffset + 1);
            partialPath = normalizePartialPath(partialPath);
            if (partialPath == null) {
                LOGGER.warn("Blocked unsafe plugin static resource path: {}", requestPath);
                return null;
            }
            Plugin plugin = PluginHolder.getPluginInfo(pluginId);

            if (plugin != null) {
                // 从插件内置文件路径获取资源
                Resource resource = resolveClassPathFile(plugin, partialPath);
                if(resource != null){
                    return resource;
                }

                // 从外置文件路径获取资源
                resource = resolveFilePath(plugin, partialPath);
                if(resource != null){
                    return resource;
                }
            }

            // 主题预览和未启动扩展的静态资源也要能访问，不能卡死在“必须先启动”。
            return resolveInstalledPluginResource(pluginId, partialPath);

        }
        return chain.resolveResource(request, requestPath, locations);
    }

    @Override
    protected String resolveUrlPathInternal(String resourceUrlPath, List<? extends Resource> locations, ResourceResolverChain chain) {
        return null;
    }

    private String normalizePartialPath(String partialPath) {
        if (StringUtils.isBlank(partialPath)) {
            return null;
        }
        String normalized = partialPath.replace('\\', '/');
        while (normalized.startsWith("/")) {
            normalized = normalized.substring(1);
        }
        Path path = Paths.get(normalized).normalize();
        if (path.isAbsolute() || normalized.contains("\0")) {
            return null;
        }
        String safePath = path.toString().replace('\\', '/');
        if (StringUtils.isBlank(safePath) || ".".equals(safePath) || "..".equals(safePath) || safePath.startsWith("../")) {
            return null;
        }
        return safePath;
    }

    private Resource createSafeFileResource(Path basePath, String relativePath) {
        try {
            Path normalizedBase = basePath.toAbsolutePath().normalize();
            Path fullPath = normalizedBase.resolve(relativePath).normalize();
            if (!fullPath.startsWith(normalizedBase) || !Files.exists(fullPath) || !Files.isRegularFile(fullPath)) {
                return null;
            }
            FileUrlResource fileUrlResource = new FileUrlResource(fullPath.toString());
            return fileUrlResource.exists() ? fileUrlResource : null;
        } catch (Exception e) {
            LOGGER.debug("Get static resources of path '{}' error.", relativePath, e);
            return null;
        }
    }

    /**
     * 解决插件中配置的绝对文件路径的文件资源。也就是插件中定义的  file:D://xx/xx/ 配置
     * @param plugin 插件配置Bean
     * @param partialPath 部分路径
     * @return 资源。没有发现则返回null
     */
    private Resource resolveFilePath(Plugin plugin, String partialPath) {
        Set<String> filePaths = getStaticFileLocations(resolveLegacyStaticLocations(plugin));
        if(filePaths.isEmpty()){
            return null;
        }

        for (String filePath : filePaths) {
            Resource fileResource = createSafeFileResource(Paths.get(filePath), partialPath);
            if (fileResource != null) {
                return fileResource;
            }
        }
        return null;
    }

    private Resource resolveInstalledPluginResource(String pluginId, String partialPath) {
        if (StringUtils.isBlank(pluginId)) {
            return null;
        }

        File pluginDir = new File(PluginDirectory.PLUGIN_DIRECTORY.getPath(), pluginId);
        if (!pluginDir.exists()) {
            return null;
        }

        ExtensionManifest manifest = ExtensionManifestReader.readManifest(pluginDir).orElse(null);
        Set<String> relativeLocations = resolveClassPathLocations(manifest, null);
        Resource resource = resolveClassPathResource(pluginDir.getAbsolutePath(), relativeLocations, partialPath);
        if (resource != null) {
            return resource;
        }

        PluginConfig pluginConfig = PluginConfigReader.readConfig(pluginDir);
        Set<String> filePaths = getStaticFileLocations(resolveLegacyStaticLocations(pluginConfig));
        if (filePaths.isEmpty()) {
            return null;
        }

        for (String filePath : filePaths) {
            Resource fileResource = createSafeFileResource(Paths.get(filePath), partialPath);
            if (fileResource != null) {
                return fileResource;
            }
        }
        return null;
    }

    /**
     * @description 从pluginResources获取插件文件(classpath原文件已解压至pluginResources文件夹)

     */
    private Resource resolveClassPathFile(Plugin plugin, String partialPath) {
        return resolveClassPathResource(plugin.getPluginPath(), resolveClassPathLocations(plugin), partialPath);
    }

    private Set<String> getStaticFileLocations(String locations) {
        if (StringUtils.isBlank(locations)) {
            return new HashSet<>();
        }
        String[] staticLocations = locations.split(",");
        return new HashSet<>(Arrays.asList(staticLocations));
    }

    private Set<String> getStaticClassPathLocations(String locations) {
        Set<String> result = new HashSet<>();
        if (StringUtils.isBlank(locations)) {
            return result;
        }
        String[] staticLocations = locations.split(",");
        for (String staticLocation : staticLocations) {
            if (StringUtils.isNotBlank(staticLocation) && staticLocation.startsWith("/")){
                staticLocation = staticLocation.substring(1);
            }
            result.add(staticLocation);
        }
        return result;
    }

    /**
     * 优先从 Manifest 产物声明解析可访问的前端静态目录。
     * 当前主要支持 adminDist / portalDist 两类前端产物目录。
     *
     * @param plugin 运行时插件对象
     * @return 可访问的相对目录集合
     */
    private Set<String> resolveClassPathLocations(Plugin plugin) {
        return resolveClassPathLocations(plugin != null ? plugin.getExtensionManifest() : null, plugin);
    }

    private Set<String> resolveClassPathLocations(ExtensionManifest manifest, Plugin plugin) {
        Set<String> locations = new HashSet<>();
        if (manifest != null) {
            ExtensionArtifacts artifacts = manifest.getArtifacts();
            if (artifacts != null) {
                addRelativeLocation(locations, artifacts.getAdminDist());
                addRelativeLocation(locations, artifacts.getPortalDist());
            }
        }
        if (!locations.isEmpty()) {
            return locations;
        }
        return getStaticClassPathLocations(resolveLegacyStaticLocations(plugin));
    }

    private String resolveLegacyStaticLocations(Plugin plugin) {
        if (plugin == null || plugin.getPluginConfig() == null || plugin.getPluginConfig().getPlugin() == null) {
            return null;
        }
        return plugin.getPluginConfig().getPlugin().getStaticLocations();
    }

    private String resolveLegacyStaticLocations(PluginConfig pluginConfig) {
        if (pluginConfig == null || pluginConfig.getPlugin() == null) {
            return null;
        }
        return pluginConfig.getPlugin().getStaticLocations();
    }

    private void addRelativeLocation(Set<String> locations, String location) {
        if (StringUtils.isBlank(location)) {
            return;
        }
        String normalized = location.trim().replace("\\", "/");
        if (normalized.startsWith("file:")) {
            return;
        }
        while (normalized.startsWith("/")) {
            normalized = normalized.substring(1);
        }
        if (StringUtils.isNotBlank(normalized)) {
            locations.add(normalized.endsWith("/") ? normalized : normalized + "/");
        }
    }

    private Resource resolveClassPathResource(String pluginBasePath, Set<String> filePaths, String partialPath) {
        if(StringUtils.isBlank(pluginBasePath) || filePaths.isEmpty()){
            return null;
        }

        for (String filePath : filePaths) {
            Resource resource = createSafeFileResource(Paths.get(pluginBasePath).resolve(filePath), partialPath);
            if (resource != null) {
                return resource;
            }
        }
        return null;
    }
}
