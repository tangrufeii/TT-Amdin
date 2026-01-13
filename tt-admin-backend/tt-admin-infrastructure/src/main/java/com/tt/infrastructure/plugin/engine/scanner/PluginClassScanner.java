package com.tt.infrastructure.plugin.engine.scanner;

import cn.hutool.core.io.FileUtil;
import com.tt.domain.plugin.model.enums.PluginResourceDirectory;
import com.tt.domain.plugin.progress.PluginProgress;
import com.tt.domain.plugin.progress.PluginProgressContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.core.type.classreading.CachingMetadataReaderFactory;
import org.springframework.core.type.classreading.MetadataReaderFactory;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.Enumeration;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/**
 * Scans plugin classes from the code directory.
 */
@Slf4j
public class PluginClassScanner {

    /**
     * CLASS文件扩展名
     */
    private static final String CLASS_EXTENSION = ".class";

    /**
     * 路径分隔符正则表达式，用于统一处理不同操作系统的路径分隔符
     */
    private static final String PATH_SEPARATOR_REGEX = "[\\\\/]";

    /**
     * 点号，用于包名分隔
     */
    private static final String DOT = ".";

    /**
     * 私有构造方法，防止实例化（工具类）
     */
    private PluginClassScanner() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * 扫描插件目录中的所有类文件并加载为Class对象
     * <p>
     * 该方法执行以下操作：
     * <ol>
     *     <li>定位插件的code目录</li>
     *     <li>递归扫描目录下所有.class文件</li>
     *     <li>将文件路径转换为全限定类名</li>
     *     <li>使用提供的ClassLoader加载类</li>
     * </ol>
     * </p>
     *
     * @param pluginDir   插件根目录
     * @param classLoader 用于加载类的类加载器
     * @return 加载成功的类对象列表，插件目录不存在时返回空列表
     * @throws RuntimeException 类加载失败时抛出
     * @apiNote 类名转换规则：文件路径去除code目录前缀 -> 统一路径分隔符为点 -> 去除.class后缀
     */
    public static List<Class<?>> scanClasses(File pluginDir, ClassLoader classLoader) {
        return scanClasses(pluginDir, classLoader, null, null, false, true);
    }

    public static List<Class<?>> scanClasses(File pluginDir, ClassLoader classLoader, String pluginId, String action) {
        return scanClasses(pluginDir, classLoader, pluginId, action, false, true);
    }

    public static List<Class<?>> scanClasses(File pluginDir,
                                             ClassLoader classLoader,
                                             String pluginId,
                                             String action,
                                             boolean detailEnabled,
                                             boolean indexEnabled) {
        List<Class<?>> classList = new ArrayList<>();

        if (pluginDir == null || !pluginDir.exists()) {
            log.warn("Plugin directory does not exist: {}", pluginDir);
            return classList;
        }

        File codeDir = getCodeDirectory(pluginDir);
        if (!codeDir.exists()) {
            log.warn("Plugin code directory does not exist: {}", codeDir.getAbsolutePath());
            return classList;
        }

        if (indexEnabled) {
            List<String> indexedClasses = readClassIndex(codeDir, false);
            if (!indexedClasses.isEmpty()) {
                reportScanHint(pluginId, action, "Loading plugin classes from index");
                loadClassesFromIndex(indexedClasses, classLoader, classList, pluginId, action, detailEnabled);
                return classList;
            }
        }

        log.debug("Scanning classes in directory: {}", codeDir.getAbsolutePath());

        List<File> classFiles = FileUtil.loopFiles(codeDir, PluginClassScanner::isClassFile);
        if (!classFiles.isEmpty()) {
            int total = classFiles.size();
            int reportStep = calculateReportStep(total, detailEnabled);
            int index = 0;
            for (File file : classFiles) {
                Class<?> clazz = loadClassFromFile(file, codeDir, classLoader);
                if (clazz != null) {
                    classList.add(clazz);
                }
                index++;
                if (shouldReport(index, total, reportStep)) {
                    reportScanProgress(pluginId, action, index, total, detailEnabled, clazz != null ? clazz.getName() : null);
                }
            }
            if (indexEnabled) {
                writeClassIndexFromClasses(codeDir, classList);
            }
        } else {
            List<File> jarFiles = FileUtil.loopFiles(codeDir, file -> file.isFile() && file.getName().endsWith(".jar"));
            // When detailEnabled or indexEnabled is true, skip pre-counting to avoid double jar scan latency.
            int total = 0;
            if (!detailEnabled && !indexEnabled) {
                reportScanHint(pluginId, action, "Counting plugin classes");
                total = countJarClasses(jarFiles, pluginId, action);
            }
            AtomicInteger index = new AtomicInteger(0);
            int reportStep = calculateReportStep(total, detailEnabled);
            for (File jarFile : jarFiles) {
                reportScanHint(pluginId, action, "Scanning plugin jar: " + jarFile.getName());
                scanClassesFromJar(jarFile, classLoader, classList, pluginId, action, detailEnabled, index, total, reportStep);
            }
            if (indexEnabled) {
                writeClassIndexFromClasses(codeDir, classList);
            }
        }

        log.debug("Scanned {} classes from plugin", classList.size());
        return classList;
    }

    public static List<String> scanClassNames(File pluginDir,
                                              ClassLoader classLoader,
                                              String pluginId,
                                              String action,
                                              boolean detailEnabled,
                                              boolean indexEnabled,
                                              boolean indexTrustEnabled) {
        List<String> classNames = new ArrayList<>();

        if (pluginDir == null || !pluginDir.exists()) {
            log.warn("Plugin directory does not exist: {}", pluginDir);
            return classNames;
        }

        File codeDir = getCodeDirectory(pluginDir);
        if (!codeDir.exists()) {
            log.warn("Plugin code directory does not exist: {}", codeDir.getAbsolutePath());
            return classNames;
        }

        if (indexEnabled) {
            List<String> indexedClasses = readClassIndex(codeDir, indexTrustEnabled);
            if (!indexedClasses.isEmpty()) {
                reportScanHint(pluginId, action, "Loading plugin classes from index");
                classNames.addAll(indexedClasses);
                cacheClassMetadata(pluginId, classLoader, classNames);
                return classNames;
            }
        }

        log.debug("Scanning classes in directory: {}", codeDir.getAbsolutePath());

        List<File> classFiles = FileUtil.loopFiles(codeDir, PluginClassScanner::isClassFile);
        if (!classFiles.isEmpty()) {
            int total = classFiles.size();
            int reportStep = calculateReportStep(total, detailEnabled);
            int index = 0;
            for (File file : classFiles) {
                String className = convertFileToClassName(file, codeDir);
                classNames.add(className);
                index++;
                if (shouldReport(index, total, reportStep)) {
                    reportScanProgress(pluginId, action, index, total, detailEnabled, className);
                }
            }
            if (indexEnabled) {
                writeClassIndexFromNames(codeDir, classNames);
            }
        } else {
            List<File> jarFiles = FileUtil.loopFiles(codeDir, file -> file.isFile() && file.getName().endsWith(".jar"));
            // When detailEnabled or indexEnabled is true, skip pre-counting to avoid double jar scan latency.
            int total = 0;
            if (!detailEnabled && !indexEnabled) {
                reportScanHint(pluginId, action, "Counting plugin classes");
                total = countJarClasses(jarFiles, pluginId, action);
            }
            AtomicInteger index = new AtomicInteger(0);
            int reportStep = calculateReportStep(total, detailEnabled);
            for (File jarFile : jarFiles) {
                reportScanHint(pluginId, action, "Scanning plugin jar: " + jarFile.getName());
                scanClassNamesFromJar(jarFile, classNames, pluginId, action, detailEnabled, index, total, reportStep);
            }
            if (indexEnabled) {
                writeClassIndexFromNames(codeDir, classNames);
            }
        }

        cacheClassMetadata(pluginId, classLoader, classNames);
        log.debug("Scanned {} class names from plugin", classNames.size());
        return classNames;
    }

    /**
     * 获取插件的代码目录
     * <p>
     * 代码目录固定为插件根目录下的 code 子目录
     * </p>
     *
     * @param pluginDir 插件根目录
     * @return 代码目录对象
     */
    private static File getCodeDirectory(File pluginDir) {
        return new File(pluginDir.getAbsolutePath() + File.separator + PluginResourceDirectory.CODE_DIR.getPath());
    }

    /**
     * 判断文件是否为CLASS文件
     * <p>
     * 通过文件名后缀判断
     * </p>
     *
     * @param file 待判断的文件
     * @return 是CLASS文件返回true，否则返回false
     */
    private static boolean isClassFile(File file) {
        return file.getName().endsWith(CLASS_EXTENSION);
    }

    /**
     * 从文件加载类
     * <p>
     * 将文件路径转换为全限定类名，然后使用ClassLoader加载
     * </p>
     *
     * @param classFile   CLASS文件
     * @param codeDir     代码目录（作为基准路径）
     * @param classLoader 类加载器
     * @return 加载的类对象，加载失败时返回null
     * @throws RuntimeException 类加载失败时抛出
     */
    private static Class<?> loadClassFromFile(File classFile, File codeDir, ClassLoader classLoader) {
        String className = convertFileToClassName(classFile, codeDir);

        try {
            Class<?> clazz = classLoader.loadClass(className);
            log.trace("Successfully loaded class: {}", className);
            return clazz;
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Failed to load class: " + className, e);
        }
    }

    /**
     * 将CLASS文件路径转换为全限定类名
     * <p>
     * 转换步骤：
     * <ol>
     *     <li>去除代码目录的基准路径</li>
     *     <li>将路径分隔符转换为点号</li>
     *     <li>去除开头的点号（如果有）</li>
     *     <li>去除.class后缀</li>
     * </ol>
     * </p>
     *
     * @param classFile CLASS文件
     * @param codeDir   代码目录（作为基准路径）
     * @return 全限定类名
     * @apiNote 示例：codeDir=/plugin/code, classFile=/plugin/code/com/example/MyClass.class
     * -> 转换结果：com.example.MyClass
     */
    private static String convertFileToClassName(File classFile, File codeDir) {
        // 获取相对于代码目录的路径
        String relativePath = classFile.getAbsolutePath()
                .replace(codeDir.getAbsolutePath(), "");

        // 统一路径分隔符为点号
        String className = relativePath.replaceAll(PATH_SEPARATOR_REGEX, DOT);

        // 去除开头的点号
        if (className.startsWith(DOT)) {
            className = className.substring(1);
        }

        // 去除.class后缀
        className = className.substring(0, className.length() - CLASS_EXTENSION.length());

        return className;
    }

    private static void scanClassesFromJar(File jarFile,
                                           ClassLoader classLoader,
                                           List<Class<?>> classList,
                                           String pluginId,
                                           String action,
                                           boolean detailEnabled,
                                           AtomicInteger index,
                                           int total,
                                           int reportStep) {
        log.debug("Scanning classes in jar: {}", jarFile.getAbsolutePath());
        long openStartedAt = System.currentTimeMillis();
        try (JarFile jar = new JarFile(jarFile, false)) {
            long openElapsedMs = System.currentTimeMillis() - openStartedAt;
            long iterateStartedAt = System.currentTimeMillis();
            long loadClassElapsedMs = 0L;
            int classCount = 0;
            int slowClassCount = 0;
            long slowestMs = 0L;
            String slowestClass = null;
            Enumeration<JarEntry> entries = jar.entries();
            while (entries.hasMoreElements()) {
                JarEntry entry = entries.nextElement();
                if (entry.isDirectory()) {
                    continue;
                }
                String name = entry.getName();
                if (!name.endsWith(CLASS_EXTENSION)) {
                    continue;
                }
                if (name.startsWith("META-INF/") || "module-info.class".equals(name)) {
                    continue;
                }
                String className = name.substring(0, name.length() - CLASS_EXTENSION.length())
                        .replace('/', '.');
                try {
                    long classLoadStart = System.currentTimeMillis();
                    Class<?> clazz = classLoader.loadClass(className);
                    long classLoadElapsed = System.currentTimeMillis() - classLoadStart;
                    loadClassElapsedMs += classLoadElapsed;
                    if (classLoadElapsed > 50) {
                        slowClassCount++;
                        if (classLoadElapsed > slowestMs) {
                            slowestMs = classLoadElapsed;
                            slowestClass = className;
                        }
                    }
                    classList.add(clazz);
                    classCount++;
                    int current = index.incrementAndGet();
                    if (shouldReport(current, total, reportStep)) {
                        reportScanProgress(pluginId, action, current, total, detailEnabled, className);
                    }
                } catch (ClassNotFoundException e) {
                    throw new RuntimeException("Failed to load class: " + className, e);
                }
            }
            long iterateElapsedMs = System.currentTimeMillis() - iterateStartedAt;
            log.info("plugin scan jar: file={}, openMs={}, iterateMs={}, loadClassMs={}, classes={}, slowClasses={}, slowestMs={}, slowestClass={}",
                    jarFile.getName(),
                    openElapsedMs,
                    iterateElapsedMs,
                    loadClassElapsedMs,
                    classCount,
                    slowClassCount,
                    slowestMs,
                    slowestClass);
        } catch (Exception e) {
            throw new RuntimeException("Failed to scan jar: " + jarFile.getAbsolutePath(), e);
        }
    }

    private static void scanClassNamesFromJar(File jarFile,
                                              List<String> classNames,
                                              String pluginId,
                                              String action,
                                              boolean detailEnabled,
                                              AtomicInteger index,
                                              int total,
                                              int reportStep) {
        log.debug("Scanning classes in jar: {}", jarFile.getAbsolutePath());
        try (JarFile jar = new JarFile(jarFile, false)) {
            Enumeration<JarEntry> entries = jar.entries();
            while (entries.hasMoreElements()) {
                JarEntry entry = entries.nextElement();
                if (entry.isDirectory()) {
                    continue;
                }
                String name = entry.getName();
                if (!name.endsWith(CLASS_EXTENSION)) {
                    continue;
                }
                if (name.startsWith("META-INF/") || "module-info.class".equals(name)) {
                    continue;
                }
                String className = name.substring(0, name.length() - CLASS_EXTENSION.length())
                        .replace('/', '.');
                classNames.add(className);
                int current = index.incrementAndGet();
                if (shouldReport(current, total, reportStep)) {
                    reportScanProgress(pluginId, action, current, total, detailEnabled, className);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to scan jar: " + jarFile.getAbsolutePath(), e);
        }
    }

    private static int countJarClasses(List<File> jarFiles, String pluginId, String action) {
        int total = 0;
        int scanned = 0;
        for (File jarFile : jarFiles) {
            reportScanHint(pluginId, action, "Counting classes in jar: " + jarFile.getName());
            try (JarFile jar = new JarFile(jarFile)) {
                Enumeration<JarEntry> entries = jar.entries();
                while (entries.hasMoreElements()) {
                    JarEntry entry = entries.nextElement();
                    if (entry.isDirectory()) {
                        continue;
                    }
                    String name = entry.getName();
                    if (!name.endsWith(CLASS_EXTENSION)) {
                        continue;
                    }
                    if (name.startsWith("META-INF/") || "module-info.class".equals(name)) {
                        continue;
                    }
                    total++;
                    scanned++;
                    if (scanned % 200 == 0) {
                        reportScanHint(pluginId, action, "Counting plugin classes (" + scanned + ")");
                    }
                }
            } catch (Exception e) {
                log.debug("Failed to count classes in jar: {}", jarFile.getAbsolutePath(), e);
            }
        }
        return total;
    }

    private static int calculateReportStep(int total, boolean detailEnabled) {
        if (total <= 0) {
            return detailEnabled ? 1 : 50;
        }
        if (total <= 50) {
            return 1;
        }
        return Math.max(total / 20, 5);
    }

    private static boolean shouldReport(int index, int total, int step) {
        if (total <= 0) {
            return index % Math.max(step, 1) == 0;
        }
        return index == total || index % step == 0;
    }

    private static void reportScanProgress(String pluginId,
                                           String action,
                                           int current,
                                           int total,
                                           boolean detailEnabled,
                                           String className) {
        if (pluginId == null || action == null) {
            return;
        }
        int progress = 75;
        String message;
        if (total > 0) {
            progress = 75 + (int) Math.round((double) current / total * 2);
            message = "Scanning plugin classes (" + current + "/" + total + ")";
        } else {
            message = "Scanning plugin classes (" + current + ")";
        }
        if (detailEnabled && className != null && !className.isBlank()) {
            message += ": " + className;
        }
        PluginProgressContext.report(new PluginProgress(pluginId, action, "scan_classes", progress, message));
    }

    private static void reportScanHint(String pluginId, String action, String message) {
        if (pluginId == null || action == null) {
            return;
        }
        PluginProgressContext.report(new PluginProgress(pluginId, action, "scan_classes", 75, message));
    }

    private static void loadClassesFromIndex(List<String> classNames,
                                             ClassLoader classLoader,
                                             List<Class<?>> classList,
                                             String pluginId,
                                             String action,
                                             boolean detailEnabled) {
        int total = classNames.size();
        int reportStep = calculateReportStep(total, detailEnabled);
        int index = 0;
        for (String className : classNames) {
            try {
                Class<?> clazz = classLoader.loadClass(className);
                classList.add(clazz);
            } catch (ClassNotFoundException e) {
                throw new RuntimeException("Failed to load class: " + className, e);
            }
            index++;
            if (shouldReport(index, total, reportStep)) {
                reportScanProgress(pluginId, action, index, total, detailEnabled, className);
            }
        }
    }

    private static File resolveIndexFile(File codeDir) {
        return new File(codeDir, ".class-index");
    }

    private static List<String> readClassIndex(File codeDir, boolean indexTrustEnabled) {
        File indexFile = resolveIndexFile(codeDir);
        if (!indexFile.exists()) {
            return List.of();
        }
        try {
            List<String> lines = Files.readAllLines(indexFile.toPath(), StandardCharsets.UTF_8);
            if (lines.isEmpty()) {
                return List.of();
            }
            String header = lines.get(0);
            long expectedStamp = parseIndexStamp(header);
            long currentStamp = calculateCodeStamp(codeDir);
            if (expectedStamp != currentStamp) {
                if (!indexTrustEnabled) {
                    log.debug("Class index stamp mismatch: expected={}, current={}", expectedStamp, currentStamp);
                    return List.of();
                }
                log.info("Class index stamp mismatch but trust enabled: expected={}, current={}",
                        expectedStamp, currentStamp);
            }
            return lines.stream()
                    .skip(1)
                    .filter(line -> line != null && !line.isBlank())
                    .toList();
        } catch (Exception e) {
            log.debug("Failed to read class index", e);
            return List.of();
        }
    }

    private static void writeClassIndexFromClasses(File codeDir, List<Class<?>> classList) {
        if (classList == null || classList.isEmpty()) {
            return;
        }
        List<String> classNames = new ArrayList<>(classList.size());
        for (Class<?> clazz : classList) {
            if (clazz != null) {
                classNames.add(clazz.getName());
            }
        }
        writeClassIndexFromNames(codeDir, classNames);
    }

    private static void writeClassIndexFromNames(File codeDir, List<String> classNames) {
        if (classNames == null || classNames.isEmpty()) {
            return;
        }
        File indexFile = resolveIndexFile(codeDir);
        long stamp = calculateCodeStamp(codeDir);
        List<String> lines = new ArrayList<>(classNames.size() + 1);
        lines.add("ts=" + stamp);
        for (String className : classNames) {
            if (className != null && !className.isBlank()) {
                lines.add(className);
            }
        }
        try {
            Files.write(indexFile.toPath(), lines, StandardCharsets.UTF_8);
        } catch (Exception e) {
            log.debug("Failed to write class index", e);
        }
    }

    private static long parseIndexStamp(String header) {
        if (header == null || !header.startsWith("ts=")) {
            return -1L;
        }
        try {
            return Long.parseLong(header.substring(3));
        } catch (NumberFormatException e) {
            return -1L;
        }
    }

    private static long calculateCodeStamp(File codeDir) {
        long latest = codeDir.lastModified();
        List<File> files = FileUtil.loopFiles(codeDir, file -> file.isFile() && (file.getName().endsWith(".jar") || file.getName().endsWith(".class")));
        for (File file : files) {
            latest = Math.max(latest, file.lastModified());
        }
        return latest;
    }

    private static void cacheClassMetadata(String pluginId,
                                           ClassLoader classLoader,
                                           List<String> classNames) {
        if (pluginId == null || classLoader == null || classNames == null || classNames.isEmpty()) {
            return;
        }
        MetadataReaderFactory metadataReaderFactory = new CachingMetadataReaderFactory(classLoader);
        Set<String> componentClasses = new LinkedHashSet<>();
        Set<String> mapperClasses = new LinkedHashSet<>();
        Set<String> controllerClasses = new LinkedHashSet<>();
        Set<String> webSocketClasses = new LinkedHashSet<>();

        for (String className : classNames) {
            try {
                AnnotationMetadata metadata = metadataReaderFactory.getMetadataReader(className).getAnnotationMetadata();
                if (hasAnyAnnotation(metadata, List.of(
                        "org.springframework.stereotype.Controller",
                        "org.springframework.web.bind.annotation.RestController"))) {
                    controllerClasses.add(className);
                }
                if (hasAnyAnnotation(metadata, List.of("jakarta.websocket.server.ServerEndpoint"))) {
                    webSocketClasses.add(className);
                }
                if (hasAnyAnnotation(metadata, List.of("org.apache.ibatis.annotations.Mapper"))) {
                    mapperClasses.add(className);
                    continue;
                }
                if (hasAnyAnnotation(metadata, List.of(
                        "org.springframework.context.annotation.Configuration",
                        "org.springframework.stereotype.Component",
                        "org.springframework.stereotype.Service",
                        "org.springframework.stereotype.Repository",
                        "org.springframework.web.bind.annotation.RestController",
                        "org.springframework.stereotype.Controller",
                        "com.tt.plugin.core.annotation.InterceptPath"))) {
                    componentClasses.add(className);
                }
            } catch (Exception e) {
                log.debug("Failed to read class metadata: {}", className, e);
            }
        }

        PluginClassMetadata metadata = new PluginClassMetadata(
                List.copyOf(classNames),
                List.copyOf(componentClasses),
                List.copyOf(mapperClasses),
                List.copyOf(controllerClasses),
                List.copyOf(webSocketClasses)
        );
        PluginClassMetadataCache.put(pluginId, metadata);
    }

    private static boolean hasAnyAnnotation(AnnotationMetadata metadata, List<String> annotations) {
        for (String annotation : annotations) {
            if (metadata.hasAnnotation(annotation) || metadata.hasMetaAnnotation(annotation)) {
                return true;
            }
        }
        return false;
    }
}
