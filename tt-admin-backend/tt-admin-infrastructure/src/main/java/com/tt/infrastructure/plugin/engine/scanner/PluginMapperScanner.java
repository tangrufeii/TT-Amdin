package com.tt.infrastructure.plugin.engine.scanner;

import cn.hutool.core.io.FileUtil;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.domain.plugin.model.enums.PluginResourceDirectory;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

/**
 * 插件Mapper扫描器
 * <p>
 * 负责扫描插件目录中的MyBatis Mapper XML文件。
 * 支持通过Ant风格的路径模式（如 **\/*.xml）进行匹配过滤。
 * </p>
 *
 * @author trf
 * @date 2025/12/23
 */
@Slf4j
public class PluginMapperScanner {

    /**
     * XML文件扩展名
     */
    private static final String XML_EXTENSION = ".xml";

    /**
     * 路径模式中的双星号通配符
     */
    private static final String DOUBLE_WILDCARD = "\\*\\*";

    /**
     * 路径模式中的单星号通配符
     */
    private static final String SINGLE_WILDCARD = "\\*";

    /**
     * 临时占位符，用于通配符转换
     */
    private static final String TEMP_PLACEHOLDER = "<>";

    /**
     * 正则表达式中的点号转义
     */
    private static final String REGEX_DOT = "\\.";

    /**
     * 正则表达式中的任意字符匹配
     */
    private static final String REGEX_ANY = ".*";

    /**
     * 反斜杠转义，用于正则表达式
     */
    private static final String REGEX_BACKSLASH = "\\\\";

    /**
     * 正斜杠，用于统一路径
     */
    private static final String FORWARD_SLASH = "/";

    /**
     * 私有构造方法，防止实例化（工具类）
     */
    private PluginMapperScanner() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * 扫描并获取匹配的Mapper XML文件对象
     * <p>
     * 根据插件配置中的mapperLocation属性扫描代码目录，
     * 返回所有匹配的Mapper XML文件对象列表。
     * </p>
     *
     * @param pluginDir 插件根目录
     * @param config    插件配置对象
     * @return 匹配的Mapper XML文件对象列表，未配置mapperLocation时返回空列表
     * @apiNote mapperLocation示例：mapper\/**\/*.xml 表示mapper目录及其子目录下的所有XML文件
     */
    public static List<File> scanMapperFiles(File pluginDir, PluginConfig config) {
        if (!isMapperLocationConfigured(config)) {
            return new ArrayList<>();
        }

        String locationPattern = config.getPlugin().getMapperLocation();
        Pattern regexPattern = buildLocationPattern(locationPattern);

        File codeDir = getCodeDirectory(pluginDir);
        List<File> mapperFiles = new ArrayList<>();

        List<File> allFiles = FileUtil.loopFiles(codeDir);
        for (File file : allFiles) {
            if (isMapperXmlFile(file, codeDir, regexPattern)) {
                mapperFiles.add(file);
            }
        }

        log.debug("Found {} mapper XML files for plugin", mapperFiles.size());
        return mapperFiles;
    }

    /**
     * 扫描并获取匹配的Mapper XML文件绝对路径
     * <p>
     * 与 {@link #scanMapperFiles(File, PluginConfig)} 功能相同，
     * 但返回文件路径字符串而非文件对象。
     * </p>
     *
     * @param pluginDir 插件根目录
     * @param config    插件配置对象
     * @return 匹配的Mapper XML文件绝对路径列表，未配置mapperLocation时返回空列表
     */
    public static List<String> scanMapperPaths(File pluginDir, PluginConfig config) {
        List<File> mapperFiles = scanMapperFiles(pluginDir, config);
        List<String> mapperPaths = new ArrayList<>(mapperFiles.size());

        for (File file : mapperFiles) {
            mapperPaths.add(file.getAbsolutePath());
        }

        return mapperPaths;
    }

    /**
     * 检查是否配置了Mapper位置
     *
     * @param config 插件配置对象
     * @return 已配置返回true，否则返回false
     */
    private static boolean isMapperLocationConfigured(PluginConfig config) {
        return config != null
                && config.getPlugin() != null
                && config.getPlugin().getMapperLocation() != null
                && StringUtils.isNotBlank(config.getPlugin().getMapperLocation());
    }

    /**
     * 获取插件的代码目录
     *
     * @param pluginDir 插件根目录
     * @return 代码目录对象
     */
    private static File getCodeDirectory(File pluginDir) {
        return new File(pluginDir.getAbsolutePath() + File.separator + PluginResourceDirectory.CODE_DIR.getPath());
    }

    /**
     * 将Ant风格的路径模式转换为正则表达式Pattern
     * <p>
     * 转换规则：
     * <ul>
     *     <li>** -> 匹配任意多级目录</li>
     *     <li>* -> 匹配单级目录或文件名</li>
     *     <li>. -> 转义为 \.</li>
     * </ul>
     * </p>
     *
     * @param locationPattern Ant风格的路径模式（如：mapper/**\/*.xml）
     * @return 编译后的正则表达式Pattern对象
     * @apiNote 示例转换：mapper\/**\/*.xml -> mapper/.*\.xml
     */
    private static Pattern buildLocationPattern(String locationPattern) {
        String regexPattern = locationPattern
                // 先替换双星号，避免被单星号替换影响
                .replaceAll(DOUBLE_WILDCARD, TEMP_PLACEHOLDER)
                // 替换单星号
                .replaceAll(SINGLE_WILDCARD, TEMP_PLACEHOLDER)
                // 转义点号
                .replaceAll(REGEX_DOT, REGEX_DOT)
                // 将占位符替换为正则表达式的任意字符匹配
                .replaceAll(TEMP_PLACEHOLDER, REGEX_ANY);

        return Pattern.compile(regexPattern);
    }

    /**
     * 判断文件是否为匹配的Mapper XML文件
     *
     * @param file         待判断的文件
     * @param codeDir      代码目录（作为基准路径）
     * @param regexPattern 匹配模式
     * @return 匹配返回true，否则返回false
     */
    private static boolean isMapperXmlFile(File file, File codeDir, Pattern regexPattern) {
        // 必须是XML文件
        if (!file.getName().endsWith(XML_EXTENSION)) {
            return false;
        }

        // 获取相对路径并统一分隔符
        String relativePath = getRelativePath(file, codeDir);

        // 正则匹配
        return Pattern.matches(regexPattern.toString(), relativePath);
    }

    /**
     * 获取文件相对于代码目录的相对路径
     * <p>
     * 将不同操作系统的路径分隔符统一为正斜杠
     * </p>
     *
     * @param file    文件对象
     * @param codeDir 代码目录
     * @return 相对路径字符串
     * @apiNote 示例：codeDir=/plugin/code, file=/plugin/code/mapper/UserMapper.xml
     * -> 返回：mapper/UserMapper.xml
     */
    private static String getRelativePath(File file, File codeDir) {
        return file.getAbsolutePath()
                .replace(codeDir.getAbsolutePath() + File.separator, "")
                .replaceAll(REGEX_BACKSLASH, FORWARD_SLASH);
    }
}
