package com.tt.infrastructure.plugin.engine.extractor;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.IdUtil;
import cn.hutool.core.util.ZipUtil;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.model.enums.PluginResourceDirectory;
import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.util.Enumeration;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/**
 * 插件解压器
 * <p>
 * 负责将插件包(JAR/ZIP格式)解压到指定目录。
 * 支持解压包含内嵌JAR文件的ZIP插件包。
 * </p>
 *
 * @author trf
 * @date 2025/12/25
 */
@Slf4j
public class PluginExtractor {

    /**
     * 缓冲区大小，用于文件读写
     */
    private static final int BUFFER_SIZE = 1024;

    /**
     * 代码目录名称
     */
    private static final String CODE_DIR_NAME = PluginResourceDirectory.CODE_DIR.getPath();

    /**
     * JAR文件扩展名
     */
    private static final String JAR_EXTENSION = ".jar";

    /**
     * 目录分隔符
     */
    private static final String PATH_SEPARATOR = "/";

    /**
     * 私有构造方法，防止实例化（工具类）
     */
    private PluginExtractor() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * 解压ZIP格式的插件包
     * <p>
     * ZIP插件包是标准的插件分发格式，解压后会在临时目录创建插件文件。
     * 如果代码目录中存在内嵌的JAR文件，会自动进行二次解压并删除原JAR文件。
     * </p>
     *
     * @param pluginFile ZIP格式的插件文件
     * @return 解压后的插件目录
     * @throws Exception 解压过程中发生I/O错误时抛出
     * @apiNote 解压目标目录：{TEMP_DIRECTORY}/{UUID}/
     */
    public static File extractZip(File pluginFile) throws Exception {
        if (pluginFile == null || !pluginFile.exists()) {
            throw new IllegalArgumentException("Plugin file does not exist: " + pluginFile);
        }

        // 创建唯一的临时解压目录
        File tempDir = new File(
                PluginDirectory.TEMP_DIRECTORY.getPath() + File.separator + IdUtil.fastSimpleUUID()
        ).getAbsoluteFile();

        log.info("Extracting ZIP plugin: {} to: {}", pluginFile.getName(), tempDir.getAbsolutePath());

        // 解压ZIP文件
        File unzipDir = ZipUtil.unzip(pluginFile, tempDir);

        // 处理代码目录中的内嵌JAR文件
        extractEmbeddedJars(unzipDir);

        return unzipDir;
    }

    /**
     * 解压JAR格式的插件文件
     * <p>
     * JAR文件通常作为ZIP插件包的一部分存在，需要解压到代码目录中。
     * 解压过程会保留JAR文件中的目录结构。
     * </p>
     *
     * @param srcJarFile 源JAR文件
     * @param destDir    目标解压目录
     * @throws Exception 解压过程中发生I/O错误时抛出
     * @apiNote 该方法会自动创建目标目录中不存在的子目录
     */
    public static void extractJar(File srcJarFile, File destDir) throws Exception {
        if (srcJarFile == null || !srcJarFile.exists()) {
            throw new IllegalArgumentException("JAR file does not exist: " + srcJarFile);
        }
        if (destDir == null) {
            throw new IllegalArgumentException("Destination directory cannot be null");
        }

        // 确保目标目录存在
        if (!destDir.exists()) {
            FileUtil.mkdir(destDir);
        }

        log.debug("Extracting JAR file: {} to: {}", srcJarFile.getName(), destDir.getAbsolutePath());

        try (JarFile jarFile = new JarFile(srcJarFile)) {
            Enumeration<JarEntry> jarEntries = jarFile.entries();

            while (jarEntries.hasMoreElements()) {
                JarEntry entry = jarEntries.nextElement();
                extractJarEntry(jarFile, entry, destDir);
            }
        }
    }

    /**
     * 解压JAR文件中的单个条目
     * <p>
     * 根据条目类型（目录或文件）进行不同的处理：
     * <ul>
     *     <li>目录条目：创建对应目录</li>
     *     <li>文件条目：写入文件内容</li>
     * </ul>
     * </p>
     *
     * @param jarFile JAR文件对象
     * @param entry   JAR条目
     * @param destDir 目标目录
     * @throws IOException 文件读写失败时抛出
     */
    private static void extractJarEntry(JarFile jarFile, JarEntry entry, File destDir) throws IOException {
        String entryName = entry.getName();

        // 目录条目 - 创建目录
        if (entryName.endsWith(PATH_SEPARATOR)) {
            File dirFile = new File(destDir + File.separator + entryName);
            FileUtil.mkdir(dirFile);
            return;
        }

        // 文件条目 - 写入文件内容
        File destFile = new File(destDir + File.separator + entryName);
        ensureParentDirectoryExists(destFile);

        copyStream(jarFile.getInputStream(entry), destFile);
    }

    /**
     * 解压代码目录中的内嵌JAR文件
     * <p>
     * 插件包的代码目录中可能包含依赖的JAR文件，这些文件需要被解压。
     * 解压完成后会删除原JAR文件以节省空间。
     * </p>
     *
     * @param unzipDir 已解压的插件根目录
     * @throws Exception 解压过程中发生错误时抛出
     */
    private static void extractEmbeddedJars(File unzipDir) throws Exception {
        File codeDir = new File(unzipDir.getAbsolutePath() + File.separator + CODE_DIR_NAME);

        if (!codeDir.exists()) {
            return;
        }

        File[] files = codeDir.listFiles();
        if (files == null) {
            return;
        }

        for (File file : files) {
            if (file.getName().endsWith(JAR_EXTENSION)) {
                log.debug("Found embedded JAR in code directory: {}", file.getName());
                extractJar(file, codeDir);
                FileUtil.del(file);
                log.debug("Removed embedded JAR after extraction: {}", file.getName());
            }
        }
    }

    /**
     * 确保文件的父目录存在
     * <p>
     * 如果父目录不存在，则创建完整的父目录路径
     * </p>
     *
     * @param file 文件对象
     */
    private static void ensureParentDirectoryExists(File file) {
        File parentDir = file.getParentFile();
        if (parentDir != null && !parentDir.exists()) {
            FileUtil.mkdir(parentDir);
        }
    }

    /**
     * 将输入流的内容复制到文件
     * <p>
     * 使用固定大小的缓冲区进行流复制，操作完成后关闭所有流
     * </p>
     *
     * @param inputStream 输入流
     * @param destFile    目标文件
     * @throws IOException 流操作失败时抛出
     */
    private static void copyStream(InputStream inputStream, File destFile) throws IOException {
        try (InputStream is = inputStream;
             OutputStream os = new FileOutputStream(destFile)) {

            byte[] buffer = new byte[BUFFER_SIZE];
            int bytesRead;
            while ((bytesRead = is.read(buffer)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
            os.flush();
        }
    }
}