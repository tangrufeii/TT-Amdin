package com.demo.controller;

import com.demo.controller.PluginEditorController.PluginFileNode;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class PluginEditorService {
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

    private volatile Path pluginRoot;

    public List<PluginFileNode> listChildren(String relativePath) {
        Path root = resolvePluginRoot();
        Path dir = resolveDirectory(relativePath);
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
                        return new PluginFileNode(relPath, path.getFileName().toString(), isDir);
                    })
                    .filter(Objects::nonNull)
                    .sorted(Comparator.comparing(PluginFileNode::isDirectory).reversed()
                            .thenComparing(PluginFileNode::getPath))
                    .collect(Collectors.toList());
        } catch (IOException e) {
            throw new IllegalStateException("读取插件文件失败: " + e.getMessage(), e);
        }
    }

    public String readFile(String relativePath) {
        if (!isAllowedRelativePath(relativePath)) {
            throw new IllegalArgumentException("不允许访问该路径: " + relativePath);
        }
        Path filePath = resolveSafePath(relativePath);
        if (!Files.exists(filePath) || Files.isDirectory(filePath)) {
            throw new IllegalArgumentException("文件不存在: " + relativePath);
        }
        if (!isAllowedFile(filePath)) {
            throw new IllegalArgumentException("不支持的文件类型: " + relativePath);
        }
        try {
            long size = Files.size(filePath);
            if (size > MAX_FILE_SIZE) {
                throw new IllegalArgumentException("文件过大，限制 1MB 内: " + relativePath);
            }
            byte[] bytes = Files.readAllBytes(filePath);
            if (looksBinary(bytes)) {
                throw new IllegalArgumentException("检测到二进制文件，禁止读取: " + relativePath);
            }
            return new String(bytes, StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new IllegalStateException("读取文件失败: " + e.getMessage(), e);
        }
    }

    public void saveFile(String relativePath, String content) {
        if (!StringUtils.hasText(relativePath)) {
            throw new IllegalArgumentException("文件路径不能为空");
        }
        if (!isAllowedRelativePath(relativePath)) {
            throw new IllegalArgumentException("不允许访问该路径: " + relativePath);
        }
        Path filePath = resolveSafePath(relativePath);
        if (Files.isDirectory(filePath)) {
            throw new IllegalArgumentException("不能写入目录: " + relativePath);
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

    public void createFile(String relativeDir, String name) {
        String dirPath = normalizePath(relativeDir);
        if (!StringUtils.hasText(name)) {
            throw new IllegalArgumentException("文件名不能为空");
        }
        if (!isSafeName(name)) {
            throw new IllegalArgumentException("非法文件名");
        }
        if (!isAllowedDirectory(dirPath) && StringUtils.hasText(dirPath)) {
            throw new IllegalArgumentException("不允许访问该目录: " + dirPath);
        }
        Path root = resolvePluginRoot();
        Path dir = StringUtils.hasText(dirPath) ? resolveSafePath(dirPath) : root;
        Path target = dir.resolve(name).normalize();
        if (!target.startsWith(root)) {
            throw new IllegalArgumentException("非法路径");
        }
        if (!isAllowedRelativePath(root.relativize(target).toString().replace('\\', '/'))) {
            throw new IllegalArgumentException("不允许创建该文件");
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

    public void createDirectory(String relativeDir, String name) {
        String dirPath = normalizePath(relativeDir);
        if (!StringUtils.hasText(name)) {
            throw new IllegalArgumentException("目录名不能为空");
        }
        if (!isSafeName(name)) {
            throw new IllegalArgumentException("非法目录名");
        }
        Path root = resolvePluginRoot();
        Path base = StringUtils.hasText(dirPath) ? resolveSafePath(dirPath) : root;
        Path target = base.resolve(name).normalize();
        if (!target.startsWith(root)) {
            throw new IllegalArgumentException("非法路径");
        }
        String relPath = root.relativize(target).toString().replace('\\', '/');
        if (!isAllowedDirectory(relPath)) {
            throw new IllegalArgumentException("不允许创建该目录");
        }
        try {
            if (Files.exists(target)) {
                throw new IllegalArgumentException("目录已存在");
            }
            Files.createDirectories(target);
        } catch (IOException e) {
            throw new IllegalStateException("创建目录失败: " + e.getMessage(), e);
        }
    }

    public void rename(String relativePath, String newName) {
        if (!StringUtils.hasText(relativePath) || !StringUtils.hasText(newName)) {
            throw new IllegalArgumentException("路径与新名称不能为空");
        }
        if (!isSafeName(newName)) {
            throw new IllegalArgumentException("非法名称");
        }
        if (!isAllowedRelativePath(relativePath) && !isAllowedDirectory(relativePath)) {
            throw new IllegalArgumentException("不允许访问该路径: " + relativePath);
        }
        Path root = resolvePluginRoot();
        Path target = resolveSafePath(relativePath);
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
                throw new IllegalArgumentException("不允许重命名为该目录");
            }
        } else {
            if (!isAllowedRelativePath(relPath)) {
                throw new IllegalArgumentException("不允许重命名为该文件");
            }
        }
        try {
            Files.move(target, renamed, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new IllegalStateException("重命名失败: " + e.getMessage(), e);
        }
    }

    public void delete(String relativePath) {
        if (!StringUtils.hasText(relativePath)) {
            throw new IllegalArgumentException("路径不能为空");
        }
        if (!isAllowedRelativePath(relativePath) && !isAllowedDirectory(relativePath)) {
            throw new IllegalArgumentException("不允许访问该路径: " + relativePath);
        }
        Path target = resolveSafePath(relativePath);
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

    public String getRootPath() {
        return resolvePluginRoot().toAbsolutePath().normalize().toString();
    }

    private Path resolvePluginRoot() {
        if (pluginRoot != null) return pluginRoot;
        Path userDir = Paths.get(System.getProperty("user.dir")).toAbsolutePath().normalize();
        List<Path> candidates = Arrays.asList(
                userDir.resolve("tt-amdin/tt-admin-backend/tt-admin-plugins/tt-admin-demo/ui"),
                userDir.resolve("tt-admin-backend/tt-admin-plugins/tt-admin-demo/ui"),
                userDir.resolve("tt-admin-plugins/tt-admin-demo/ui")
        );
        for (Path candidate : candidates) {
            if (Files.exists(candidate) && Files.isDirectory(candidate)) {
                pluginRoot = candidate;
                return pluginRoot;
            }
        }
        throw new IllegalStateException("未找到插件目录，请确认服务启动目录");
    }

    private Path resolveSafePath(String relativePath) {
        Path root = resolvePluginRoot();
        Path normalized = root.resolve(relativePath).normalize();
        if (!normalized.startsWith(root)) {
            throw new IllegalArgumentException("非法路径: " + relativePath);
        }
        return normalized;
    }

    private Path resolveDirectory(String relativePath) {
        if (!StringUtils.hasText(relativePath)) {
            return resolvePluginRoot();
        }
        String normalized = normalizePath(relativePath);
        if (!isAllowedDirectory(normalized) && !"".equals(normalized)) {
            throw new IllegalArgumentException("不允许访问该目录: " + normalized);
        }
        Path dir = resolveSafePath(normalized);
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
        return ALLOWED_ROOT_FILES.contains(normalized);
    }

    private boolean isAllowedDirectory(String relativePath) {
        String normalized = relativePath.replace('\\', '/');
        return "src".equals(normalized) || normalized.startsWith("src/");
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
}