package com.tt.infrastructure.plugin.engine.loader;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.io.IoUtil;
import com.tt.domain.plugin.model.enums.PluginDirectory;
import com.tt.domain.plugin.model.enums.PluginResourceDirectory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;

/**
 * 插件类加载器
 * <p>
 * 实现插件之间的类隔离，确保每个插件的类不会相互干扰。
 * 采用双亲委派模型的变体，优先从本地加载类，避免插件依赖冲突。
 * </p>
 *
 * @author trf
 * @date 2025/12/23
 */
public class PluginClassLoader extends URLClassLoader {

    private static final Logger LOGGER = LoggerFactory.getLogger(PluginClassLoader.class);

    /**
     * Java标准包前缀，需要特殊处理
     */
    private static final String JAVA_PACKAGE_PREFIX = "java.";

    /**
     * 父类加载器
     */
    private final ClassLoader parentClassLoader;

    /**
     * 系统类加载器
     */
    private final ClassLoader systemClassLoader;

    /**
     * 插件唯一标识符
     */
    private final String pluginId;

    /**
     * 构造插件类加载器
     *
     * @param pluginId 插件ID
     * @param parent   父类加载器
     * @param system   系统类加载器
     */
    public PluginClassLoader(String pluginId, ClassLoader parent, ClassLoader system) {
        super(new URL[0], parent);
        this.pluginId = pluginId;
        this.parentClassLoader = parent;
        this.systemClassLoader = system;
    }

    @Override
    public void close() throws IOException {
        try {
            super.close();
        } catch (IOException e) {
            LOGGER.error("Error closing class loader for plugin: {}", pluginId, e);
            throw e;
        }
    }

    /**
     * 添加JAR文件到类路径
     *
     * @param url JAR文件URL
     */
    public void addURL(URL url) {
        super.addURL(url);
    }

    /**
     * 添加插件目录到类路径
     * <p>
     * 将插件的lib目录下的所有JAR文件和code目录添加到类路径
     * </p>
     *
     * @param file 插件目录
     */
    public void addFile(File file) {
        try {
            // 添加lib目录下的所有JAR文件
            File libFile = new File(file.getAbsolutePath() + File.separator + PluginResourceDirectory.LIB_DIR);
            if (libFile.exists() && libFile.listFiles() != null) {
                File[] files = libFile.listFiles();
                if (files != null) {
                    for (File jarFile : files) {
                        addURL(jarFile.getCanonicalFile().toURI().toURL());
                    }
                }
            }
            // 添加code目录
            File codeFile = new File(file.getAbsolutePath() + File.separator + PluginResourceDirectory.CODE_DIR.getPath());
            addURL(codeFile.getCanonicalFile().toURI().toURL());
        } catch (IOException e) {
            LOGGER.error("PluginClassLoader addFile error for plugin: {}", pluginId, e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public Class<?> loadClass(String className) throws ClassNotFoundException {
        synchronized (getClassLoadingLock(className)) {
            return findClass(className);
        }
    }

    @Override
    protected Class<?> findClass(String className) throws ClassNotFoundException {
        // 1. 尝试从父类加载器加载
        Class<?> loadedClass = findClassFromParent(className);
        if (loadedClass != null) {
            return loadedClass;
        }

        // 2. 检查是否已加载
        loadedClass = findLoadedClass(className);
        if (loadedClass != null) {
            return loadedClass;
        }

        // 3. 尝试从本地加载
        loadedClass = findClassFromLocal(className);
        if (loadedClass != null) {
            return loadedClass;
        }

        // 4. 使用标准方式查找
        loadedClass = super.findClass(className);
        if (loadedClass != null) {
            return loadedClass;
        }

        // 5. 最后尝试系统类加载器
        loadedClass = systemClassLoader.loadClass(className);
        if (loadedClass != null) {
            return loadedClass;
        }

        throw new ClassNotFoundException("ClassLoader[" + pluginId + "]:" + className);
    }

    /**
     * 从父类加载器查找类
     *
     * @param className 类名
     * @return 加载的类，未找到返回null
     */
    protected Class<?> findClassFromParent(String className) {
        try {
            if (parentClassLoader != null) {
                return parentClassLoader.loadClass(className);
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 从本地插件目录加载类
     * <p>
     * 直接从插件的code目录读取class文件并定义类
     * </p>
     *
     * @param className 类名
     * @return 定义的类，未找到返回null
     */
    protected Class<?> findClassFromLocal(String className) {
        String formatClassName = formatClassName(className);
        File file = new File(PluginDirectory.PLUGIN_DIRECTORY.getPath()
                + File.separator + this.pluginId
                + File.separator + PluginResourceDirectory.CODE_DIR.getPath()
                + File.separator + formatClassName);
        if (file.exists()) {
            BufferedInputStream inputStream = FileUtil.getInputStream(file.getAbsoluteFile());
            byte[] bytes = IoUtil.readBytes(inputStream);
            return super.defineClass(className, bytes, 0, bytes.length);
        }
        return null;
    }

    /**
     * 将类名转换为文件路径格式
     *
     * @param className 全限定类名
     * @return 文件路径
     */
    private String formatClassName(String className) {
        className = className.replace('/', '~');
        className = className.replace('.', '/') + ".class";
        className = className.replace('~', '/');
        return className;
    }
}