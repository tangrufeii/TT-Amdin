package com.tt.webide.controller;

import com.tt.webide.controller.WebIdeEditorController.WebIdeFileNode;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class WebIdeEditorService {
    private static final Set<String> ALLOWED_EXTENSIONS = new HashSet<>(Arrays.asList(
            "ts", "tsx", "js", "jsx", "vue", "json", "yml", "yaml", "md", "txt", "css", "scss", "less",
            "java", "xml", "properties", "sql", "html"
    ));
    private static final Set<String> ALLOWED_ROOT_FILES = new HashSet<>(Arrays.asList(
            "package.json",
            "tsconfig.json",
            "tsconfig.node.json",
            "vite.config.ts",
            "vite.config.js",
            "uno.config.ts",
            "uno.config.js",
            "index.html",
            ".env",
            ".env.local",
            ".env.dev",
            ".env.prod"
    ));
    private static final long MAX_FILE_SIZE = 1024 * 1024;
    private static final List<String> IGNORE_DIRS = Arrays.asList(
            ".git", "node_modules", "target", "dist", "build", "out", ".idea", ".vscode"
    );

    private volatile Path pluginsRoot;
    private final Map<String, Path> pluginRootCache = new HashMap<>();

    public List<WebIdeFileNode> listChildren(String pluginId, String relativePath) {
        Path root = resolvePluginRoot(pluginId);
        Path dir = resolveDirectory(pluginId, relativePath);
        try (Stream<Path> stream = Files.list(dir)) {
            return stream
                    .filter(path -> !shouldIgnore(root, path))
                    .map(path -> {
                        Path relative = root.relativize(path);
                        String relPath = relative.toString().replace('\\', '/');
                        boolean isDir = Files.isDirectory(path);
                        if (isDir && !isAllowedDirectory(relPath)) {
                            return null;
                        }
                        if (!isDir && (!isAllowedRelativePath(relPath) || !isAllowedFile(path))) {
                            return null;
                        }
                        return new WebIdeFileNode(relPath, path.getFileName().toString(), isDir);
                    })
                    .filter(Objects::nonNull)
                    .sorted(Comparator.comparing(WebIdeFileNode::isDirectory).reversed()
                            .thenComparing(WebIdeFileNode::getPath))
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new IllegalStateException("读取文件列表失败: " + e.getMessage(), e);
        }
    }

    public String readFile(String pluginId, String relativePath) {
        if (!isAllowedRelativePath(relativePath)) {
            throw new IllegalArgumentException("不允许访问的路径: " + relativePath);
        }
        Path filePath = resolveSafePath(pluginId, relativePath);
        if (!Files.exists(filePath) || Files.isDirectory(filePath)) {
            throw new IllegalArgumentException("文件不存在: " + relativePath);
        }
        if (!isAllowedFile(filePath)) {
            throw new IllegalArgumentException("不支持的文件类型: " + relativePath);
        }
        try {
            long size = Files.size(filePath);
            if (size > MAX_FILE_SIZE) {
                throw new IllegalArgumentException("文件大小超过 1MB: " + relativePath);
            }
            byte[] bytes = Files.readAllBytes(filePath);
            if (looksBinary(bytes)) {
                throw new IllegalArgumentException("不支持的二进制文件: " + relativePath);
            }
            return new String(bytes, StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new IllegalStateException("读取文件失败: " + e.getMessage(), e);
        }
    }

    public void saveFile(String pluginId, String relativePath, String content) {
        if (!StringUtils.hasText(relativePath)) {
            throw new IllegalArgumentException("文件路径不能为空");
        }
        if (!isAllowedRelativePath(relativePath)) {
            throw new IllegalArgumentException("不允许访问的路径: " + relativePath);
        }
        Path filePath = resolveSafePath(pluginId, relativePath);
        if (Files.isDirectory(filePath)) {
            throw new IllegalArgumentException("目标是目录: " + relativePath);
        }
        if (!isAllowedFile(filePath)) {
            throw new IllegalArgumentException("不支持的文件类型: " + relativePath);
        }
        try {
            if (!Files.exists(filePath)) {
                Files.createDirectories(filePath.getParent());
                Files.createFile(filePath);
            }
            Files.write(filePath, content == null ? new byte[0] : content.getBytes(StandardCharsets.UTF_8),
                    StandardOpenOption.TRUNCATE_EXISTING, StandardOpenOption.WRITE);
        } catch (IOException e) {
            throw new IllegalStateException("保存文件失败: " + e.getMessage(), e);
        }
    }

    public void createFile(String pluginId, String relativeDir, String name) {
        String dirPath = normalizePath(relativeDir);
        if (!StringUtils.hasText(name)) {
            throw new IllegalArgumentException("文件名不能为空");
        }
        if (!isSafeName(name)) {
            throw new IllegalArgumentException("文件名不合法");
        }
        if (!isAllowedDirectory(dirPath) && StringUtils.hasText(dirPath)) {
            throw new IllegalArgumentException("目录不允许: " + dirPath);
        }
        Path root = resolvePluginRoot(pluginId);
        Path dir = StringUtils.hasText(dirPath) ? resolveSafePath(pluginId, dirPath) : root;
        Path target = dir.resolve(name).normalize();
        if (!target.startsWith(root)) {
            throw new IllegalArgumentException("非法路径");
        }
        if (!isAllowedRelativePath(root.relativize(target).toString().replace('\\', '/'))) {
            throw new IllegalArgumentException("不允许的文件路径");
        }
        try {
            if (!Files.exists(dir)) {
                Files.createDirectories(dir);
            }
            if (Files.exists(target)) {
                throw new IllegalArgumentException("文件已存在");
            }
            Files.createFile(target);
        } catch (IOException e) {
            throw new IllegalStateException("创建文件失败: " + e.getMessage(), e);
        }
    }

    public void createDirectory(String pluginId, String relativeDir, String name) {
        String dirPath = normalizePath(relativeDir);
        if (!StringUtils.hasText(name)) {
            throw new IllegalArgumentException("文件夹名不能为空");
        }
        if (!isSafeName(name)) {
            throw new IllegalArgumentException("文件夹名不合法");
        }
        Path root = resolvePluginRoot(pluginId);
        Path base = StringUtils.hasText(dirPath) ? resolveSafePath(pluginId, dirPath) : root;
        Path target = base.resolve(name).normalize();
        if (!target.startsWith(root)) {
            throw new IllegalArgumentException("非法路径");
        }
        String relPath = root.relativize(target).toString().replace('\\', '/');
        if (!isAllowedDirectory(relPath)) {
            throw new IllegalArgumentException("不允许的目录");
        }
        try {
            if (Files.exists(target)) {
                throw new IllegalArgumentException("文件夹已存在");
            }
            Files.createDirectories(target);
        } catch (IOException e) {
            throw new IllegalStateException("创建文件夹失败: " + e.getMessage(), e);
        }
    }

    public void rename(String pluginId, String relativePath, String newName) {
        if (!StringUtils.hasText(relativePath) || !StringUtils.hasText(newName)) {
            throw new IllegalArgumentException("路径或名称不能为空");
        }
        if (!isSafeName(newName)) {
            throw new IllegalArgumentException("名称不合法");
        }
        if (!isAllowedRelativePath(relativePath) && !isAllowedDirectory(relativePath)) {
            throw new IllegalArgumentException("不允许访问的路径: " + relativePath);
        }
        Path root = resolvePluginRoot(pluginId);
        Path target = resolveSafePath(pluginId, relativePath);
        if (!Files.exists(target)) {
            throw new IllegalArgumentException("目标不存在");
        }
        Path parent = target.getParent();
        Path renamed = parent.resolve(newName).normalize();
        if (!renamed.startsWith(root)) {
            throw new IllegalArgumentException("非法路径");
        }
        String relPath = root.relativize(renamed).toString().replace('\\', '/');
        if (Files.isDirectory(target)) {
            if (!isAllowedDirectory(relPath)) {
                throw new IllegalArgumentException("不允许的目录");
            }
        } else {
            if (!isAllowedRelativePath(relPath)) {
                throw new IllegalArgumentException("不允许的文件路径");
            }
        }
        try {
            Files.move(target, renamed, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new IllegalStateException("重命名失败: " + e.getMessage(), e);
        }
    }

    public void delete(String pluginId, String relativePath) {
        if (!StringUtils.hasText(relativePath)) {
            throw new IllegalArgumentException("路径不能为空");
        }
        if (!isAllowedRelativePath(relativePath) && !isAllowedDirectory(relativePath)) {
            throw new IllegalArgumentException("不允许访问的路径: " + relativePath);
        }
        Path target = resolveSafePath(pluginId, relativePath);
        if (!Files.exists(target)) {
            return;
        }
        try {
            if (Files.isDirectory(target)) {
                try (Stream<Path> stream = Files.walk(target)) {
                    stream.sorted(Comparator.reverseOrder()).forEach(path -> {
                        try {
                            Files.deleteIfExists(path);
                        } catch (IOException e) {
                            throw new IllegalStateException("删除失败: " + e.getMessage(), e);
                        }
                    });
                }
            } else {
                Files.deleteIfExists(target);
            }
        } catch (IOException e) {
            throw new IllegalStateException("删除失败: " + e.getMessage(), e);
        }
    }

    public String getRootPath(String pluginId) {
        return resolvePluginRoot(pluginId).toAbsolutePath().normalize().toString();
    }

    public List<WebIdePluginInfo> listPlugins() {
        Path root = resolvePluginsRoot();
        try (Stream<Path> stream = Files.list(root)) {
            return stream
                    .filter(Files::isDirectory)
                    .map(path -> {
                        String id = path.getFileName().toString();
                        Path uiDir = path.resolve("ui");
                        if (!Files.isDirectory(uiDir)) {
                            return null;
                        }
                        return new WebIdePluginInfo(id, id, uiDir.toString());
                    })
                    .filter(Objects::nonNull)
                    .sorted(Comparator.comparing(WebIdePluginInfo::getId))
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new IllegalStateException("读取插件列表失败: " + e.getMessage(), e);
        }
    }

    private Path resolvePluginsRoot() {
        if (pluginsRoot != null) return pluginsRoot;
        Path userDir = Paths.get(System.getProperty("user.dir")).toAbsolutePath().normalize();
        List<Path> candidates = Arrays.asList(
                userDir.resolve("tt-amdin/tt-admin-backend/tt-admin-plugins"),
                userDir.resolve("tt-admin-backend/tt-admin-plugins"),
                userDir.resolve("tt-admin-plugins")
        );
        for (Path candidate : candidates) {
            if (Files.exists(candidate) && Files.isDirectory(candidate)) {
                pluginsRoot = candidate;
                return pluginsRoot;
            }
        }
        throw new IllegalStateException("未找到插件根目录");
    }

    private Path resolvePluginRoot(String pluginId) {
        String targetId = StringUtils.hasText(pluginId) ? pluginId : "tt-admin-webide";
        Path cached = pluginRootCache.get(targetId);
        if (cached != null) return cached;
        Path pluginsBase = resolvePluginsRoot();
        Path pluginDir = pluginsBase.resolve(targetId).normalize();
        Path uiDir = pluginDir.resolve("ui").normalize();
        if (!uiDir.startsWith(pluginsBase) || !Files.isDirectory(uiDir)) {
            throw new IllegalArgumentException("插件不存在或未找到 UI 目录: " + targetId);
        }
        pluginRootCache.put(targetId, uiDir);
        return uiDir;
    }

    private Path resolveSafePath(String pluginId, String relativePath) {
        Path root = resolvePluginRoot(pluginId);
        Path normalized = root.resolve(relativePath).normalize();
        if (!normalized.startsWith(root)) {
            throw new IllegalArgumentException("非法路径: " + relativePath);
        }
        return normalized;
    }

    private Path resolveDirectory(String pluginId, String relativePath) {
        if (!StringUtils.hasText(relativePath)) {
            return resolvePluginRoot(pluginId);
        }
        String normalized = normalizePath(relativePath);
        if (!isAllowedDirectory(normalized) && !"".equals(normalized)) {
            throw new IllegalArgumentException("目录不允许: " + normalized);
        }
        Path dir = resolveSafePath(pluginId, normalized);
        if (!Files.exists(dir) || !Files.isDirectory(dir)) {
            throw new IllegalArgumentException("目录不存在: " + normalized);
        }
        return dir;
    }

    private boolean isAllowedFile(Path path) {
        String name = path.getFileName().toString();
        int idx = name.lastIndexOf('.');
        if (idx <= 0 || idx == name.length() - 1) {
            return false;
        }
        String ext = name.substring(idx + 1).toLowerCase(Locale.ROOT);
        return ALLOWED_EXTENSIONS.contains(ext);
    }

    private boolean looksBinary(byte[] bytes) {
        int limit = Math.min(bytes.length, 1024);
        for (int i = 0; i < limit; i++) {
            if (bytes[i] == 0) return true;
        }
        return false;
    }

    private boolean isAllowedRelativePath(String relativePath) {
        if (!StringUtils.hasText(relativePath)) return false;
        String normalized = relativePath.replace('\\', '/');
        if (normalized.startsWith("src/")) return true;
        if (normalized.startsWith("public/")) return true;
        if (normalized.startsWith("packages/")) return true;
        return ALLOWED_ROOT_FILES.contains(normalized);
    }

    private boolean isAllowedDirectory(String relativePath) {
        String normalized = relativePath.replace('\\', '/');
        return "src".equals(normalized) || normalized.startsWith("src/")
                || "public".equals(normalized) || normalized.startsWith("public/")
                || "packages".equals(normalized) || normalized.startsWith("packages/");
    }

    private boolean isSafeName(String name) {
        if (!StringUtils.hasText(name)) return false;
        return !name.contains("/") && !name.contains("\\") && !name.contains("..");
    }

    private String normalizePath(String path) {
        if (!StringUtils.hasText(path)) return "";
        return path.replace('\\', '/');
    }

    private boolean shouldIgnore(Path root, Path path) {
        Path relative = root.relativize(path);
        for (Path part : relative) {
            if (IGNORE_DIRS.contains(part.toString())) {
                return true;
            }
        }
        return false;
    }

    public static class WebIdePluginInfo {
        private String id;
        private String name;
        private String uiPath;

        public WebIdePluginInfo(String id, String name, String uiPath) {
            this.id = id;
            this.name = name;
            this.uiPath = uiPath;
        }

        public String getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public String getUiPath() {
            return uiPath;
        }
    }
}
