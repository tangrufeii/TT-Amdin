package com.tt.infrastructure.plugin.engine.scanner;

import cn.hutool.core.io.FileUtil;
import com.tt.domain.plugin.model.enums.PluginResourceDirectory;
import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * 插件类扫描器
 * <p>
 * 负责扫描插件目录中的所有Java类文件，并将其加载为Class对象。
 * 扫描范围限定在插件的code目录下，通过递归遍历查找所有.class文件。
 * </p>
 *
 * @author trf
 * @date 2025/12/23
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

        log.debug("Scanning classes in directory: {}", codeDir.getAbsolutePath());

        List<File> files = FileUtil.loopFiles(codeDir);
        for (File file : files) {
            if (isClassFile(file)) {
                Class<?> clazz = loadClassFromFile(file, codeDir, classLoader);
                if (clazz != null) {
                    classList.add(clazz);
                }
            }
        }

        log.debug("Scanned {} classes from plugin", classList.size());
        return classList;
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
}
