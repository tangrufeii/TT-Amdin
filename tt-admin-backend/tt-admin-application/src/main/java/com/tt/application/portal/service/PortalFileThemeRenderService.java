package com.tt.application.portal.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.tt.common.api.ResultCode;
import com.tt.common.domain.DomainException;
import com.tt.common.page.PageQuery;
import com.tt.domain.system.dict.model.SystemDict;
import com.tt.domain.system.dict.model.SystemDictItem;
import com.tt.domain.system.dict.repository.SystemDictRepository;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

/**
 * 文件化门户主题渲染服务。
 * <p>
 * 第一版只读取本地 `resources/themes` 目录，目标是跑通：
 * 主题 HTML 文件、整站切换、静态资源读取。
 * </p>
 */
@Service
@RequiredArgsConstructor
public class PortalFileThemeRenderService {
    private static final String DICT_CODE = "portal_theme";
    private static final String ENABLED_STATUS = "1";
    private static final String DISABLED_STATUS = "0";
    private static final String DEFAULT_DICT_TYPE = "1";

    /**
     * 主题根目录候选项
     */
    private static final List<Path> THEME_ROOT_CANDIDATES = List.of(
            Path.of("resources", "themes"),
            Path.of("..", "resources", "themes"),
            Path.of("..", "..", "resources", "themes"),
            Path.of("tt-amdin", "resources", "themes")
    );
    private static final List<Path> PLUGIN_ROOT_CANDIDATES = List.of(
            Path.of("resources", "plugins"),
            Path.of("..", "resources", "plugins"),
            Path.of("..", "..", "resources", "plugins"),
            Path.of("tt-amdin", "resources", "plugins")
    );
    private static final List<Path> DEV_PLUGIN_ROOT_CANDIDATES = List.of(
            Path.of("tt-admin-plugins"),
            Path.of("..", "tt-admin-plugins"),
            Path.of("tt-admin-backend", "tt-admin-plugins"),
            Path.of("tt-amdin", "tt-admin-backend", "tt-admin-plugins")
    );
    private static final String PLUGIN_PORTAL_THEME_DIR = "portal-theme";
    private static final String THEME_CONFIG_FILE = "theme.json";
    private static final String DEFAULT_THEME = "blog";
    private static final String DEFAULT_ROUTE = "/";
    private static final String DEFAULT_PAGE = "pages/index.html";

    private final ObjectMapper objectMapper;
    private final SystemDictRepository systemDictRepository;

    /**
     * 渲染文件化门户主题。
     *
     * @param themeKey 指定主题键；为空时使用当前启用主题
     * @param requestPath 请求路径；当前第一版主要支持 `/`
     * @return 完整 HTML
     */
    public String render(String themeKey, String requestPath) {
        List<ThemeSource> themeSources = resolveThemeSources();
        ThemeRuntime theme = loadTheme(themeSources, resolveThemeKey(themeSources, themeKey));
        String pagePath = resolvePagePath(theme.definition(), requestPath);
        String html = readUtf8(theme.resolve(pagePath));
        Document document = Jsoup.parse(html);
        document.outputSettings().prettyPrint(false);

        injectThemeMeta(document, theme.definition());
        injectRuntimeState(document, theme, requestPath);
        return document.outerHtml();
    }

    /**
     * 解析主题静态资源。
     *
     * @param themeKey 主题键
     * @param assetPath 主题内资源相对路径
     * @return 文件资源
     */
    public FileSystemResource resolveThemeAsset(String themeKey, String assetPath) {
        ThemeRuntime theme = loadTheme(resolveThemeSources(), themeKey);
        Path asset = theme.resolve(assetPath);
        if (!Files.isRegularFile(asset)) {
            throw new DomainException("主题资源不存在: " + assetPath);
        }
        return new FileSystemResource(asset);
    }

    /**
     * 列出文件系统中可用的门户主题。
     *
     * @return 主题摘要列表
     */
    public List<ThemeSummary> listThemes() {
        List<ThemeSource> themeSources = resolveThemeSources();
        if (themeSources.isEmpty()) {
            return List.of();
        }
        String activeThemeKey = resolveThemeKey(themeSources, null);
        return themeSources.stream()
                .map(themeSource -> loadThemeSummary(themeSource, activeThemeKey))
                .filter(Objects::nonNull)
                .sorted(Comparator.comparing(ThemeSummary::getOrder)
                        .thenComparing(ThemeSummary::getKey, String.CASE_INSENSITIVE_ORDER))
                .toList();
    }

    /**
     * 读取文件主题配置。
     *
     * @param themeKey 主题键
     * @return 主题配置
     */
    public ThemeDefinition getThemeDefinition(String themeKey) {
        List<ThemeSource> themeSources = resolveThemeSources();
        return loadTheme(themeSources, resolveThemeKey(themeSources, themeKey)).definition();
    }

    /**
     * 在线切换文件化门户主题。
     *
     * @param themeKey 主题键
     * @return 切换后的主题摘要
     */
    public ThemeSummary switchTheme(String themeKey) {
        List<ThemeSource> themeSources = resolveThemeSources();
        ThemeRuntime targetTheme = loadTheme(themeSources, themeKey);
        List<ThemeRuntime> themes = loadAllThemes(themeSources);
        SystemDict dict = ensurePortalThemeDict();
        ensureThemeDictItems(dict, themes);

        int sortSeed = 10;
        for (ThemeRuntime theme : themes.stream().sorted(themeComparator()).toList()) {
            Optional<SystemDictItem> itemOptional = findThemeItem(dict.getId(), theme.themeKey());
            if (itemOptional.isEmpty()) {
                continue;
            }

            boolean active = Objects.equals(theme.themeKey(), targetTheme.themeKey());
            SystemDictItem item = itemOptional.get();
            systemDictRepository.updateItem(SystemDictItem.builder()
                    .id(item.getId())
                    .dictId(item.getDictId())
                    .dictCode(item.getDictCode())
                    .value(item.getValue())
                    .zhCn(item.getZhCn())
                    .enUs(item.getEnUs())
                    .type(item.getType())
                    .sort(active ? 0 : sortSeed)
                    .description(item.getDescription())
                    .status(active ? ENABLED_STATUS : DISABLED_STATUS)
                    .remark(item.getRemark())
                    .build());
            if (!active) {
                sortSeed += 10;
            }
        }

        return loadThemeSummary(targetTheme.source(), targetTheme.themeKey());
    }

    private String resolveThemeKey(List<ThemeSource> themeSources, String themeKey) {
        if (StringUtils.hasText(themeKey)) {
            return themeKey.trim();
        }

        List<String> themeKeys = listThemeKeys(themeSources);
        Optional<String> activeFromState = resolveActiveThemeKeyFromState(themeKeys);
        if (activeFromState.isPresent()) {
            return activeFromState.get();
        }

        Optional<String> configuredTheme = themeKeys.stream()
                .map(theme -> loadTheme(themeSources, theme))
                .filter(theme -> Boolean.TRUE.equals(theme.definition().getActive()))
                .map(ThemeRuntime::themeKey)
                .findFirst();
        if (configuredTheme.isPresent()) {
            return configuredTheme.get();
        }

        return themeKeys.contains(DEFAULT_THEME) ? DEFAULT_THEME : themeKeys.stream().findFirst().orElse(DEFAULT_THEME);
    }

    private List<String> listThemeKeys(List<ThemeSource> themeSources) {
        return themeSources.stream()
                .map(ThemeSource::themeKey)
                .filter(StringUtils::hasText)
                .distinct()
                .toList();
    }

    private ThemeSummary loadThemeSummary(ThemeSource themeSource, String activeThemeKey) {
        return loadThemeSummary(themeSource, themeSource.themeKey(), activeThemeKey);
    }

    private ThemeSummary loadThemeSummary(ThemeSource themeSource, String themeKey, String activeThemeKey) {
        try {
            ThemeDefinition definition = loadTheme(themeSource).definition();
            ThemeSummary summary = new ThemeSummary();
            summary.setKey(themeKey);
            summary.setTitle(StringUtils.hasText(definition.getTitle()) ? definition.getTitle() : themeKey);
            summary.setDescription(definition.getDescription());
            summary.setActive(Objects.equals(activeThemeKey, themeKey));
            summary.setOrder(Optional.ofNullable(definition.getOrder()).orElse(100));
            summary.setPages(definition.getPages());
            return summary;
        } catch (Exception ex) {
            return null;
        }
    }

    private List<ThemeRuntime> loadAllThemes(List<ThemeSource> themeSources) {
        return listThemeKeys(themeSources).stream()
                .map(themeKey -> loadTheme(themeSources, themeKey))
                .sorted(themeComparator())
                .toList();
    }

    private Comparator<ThemeRuntime> themeComparator() {
        return Comparator
                .comparing((ThemeRuntime theme) -> Optional.ofNullable(theme.definition().getOrder()).orElse(100))
                .thenComparing(ThemeRuntime::themeKey, String.CASE_INSENSITIVE_ORDER);
    }

    private Optional<String> resolveActiveThemeKeyFromState(List<String> themeKeys) {
        return systemDictRepository.findByCode(DICT_CODE)
                .flatMap(dict -> loadDictItems(dict.getId()).stream()
                        .filter(item -> ENABLED_STATUS.equals(item.getStatus()))
                        .filter(item -> themeKeys.contains(item.getValue()))
                        .min(Comparator.comparing(item -> item.getSort() == null ? 0 : item.getSort()))
                        .map(SystemDictItem::getValue));
    }

    private SystemDict ensurePortalThemeDict() {
        return systemDictRepository.findByCode(DICT_CODE)
                .orElseGet(() -> {
                    SystemDict dict = SystemDict.builder()
                            .id(IdWorker.getId())
                            .name("门户主题")
                            .code(DICT_CODE)
                            .type(DEFAULT_DICT_TYPE)
                            .sort(999)
                            .description("门户站点主题切换配置")
                            .status(ENABLED_STATUS)
                            .remark("门户主题")
                            .build();
                    systemDictRepository.insert(dict);
                    return dict;
                });
    }

    private void ensureThemeDictItems(SystemDict dict, List<ThemeRuntime> themes) {
        List<SystemDictItem> items = loadDictItems(dict.getId());
        boolean hasActive = items.stream()
                .filter(item -> themes.stream().anyMatch(theme -> Objects.equals(theme.themeKey(), item.getValue())))
                .anyMatch(item -> ENABLED_STATUS.equals(item.getStatus()));

        for (ThemeRuntime theme : themes) {
            if (findThemeItem(dict.getId(), theme.themeKey()).isPresent()) {
                continue;
            }
            boolean active = !hasActive && Boolean.TRUE.equals(theme.definition().getActive());
            insertThemeItem(
                    dict,
                    theme,
                    active ? ENABLED_STATUS : DISABLED_STATUS,
                    active ? 0 : Optional.ofNullable(theme.definition().getOrder()).orElse(100)
            );
            hasActive = hasActive || active;
        }
    }

    private Optional<SystemDictItem> findThemeItem(Long dictId, String themeKey) {
        return loadDictItems(dictId).stream()
                .filter(item -> Objects.equals(item.getValue(), themeKey))
                .findFirst();
    }

    private List<SystemDictItem> loadDictItems(Long dictId) {
        PageQuery query = new PageQuery();
        query.setPage(1);
        query.setPageSize(500);
        return systemDictRepository.findItemPage(query, dictId, null, null, null, null).getRecords();
    }

    private void insertThemeItem(SystemDict dict, ThemeRuntime theme, String status, Integer sort) {
        ThemeDefinition definition = theme.definition();
        systemDictRepository.insertItem(SystemDictItem.builder()
                .id(IdWorker.getId())
                .dictId(dict.getId())
                .dictCode(dict.getCode())
                .value(theme.themeKey())
                .zhCn(StringUtils.hasText(definition.getTitle()) ? definition.getTitle() : theme.themeKey())
                .enUs(theme.themeKey())
                .type("file")
                .sort(sort)
                .description(definition.getDescription())
                .status(status)
                .remark("portal-file-theme")
                .build());
    }

    private Path resolveThemesRoot() {
        return THEME_ROOT_CANDIDATES.stream()
                .map(path -> path.toAbsolutePath().normalize())
                .filter(Files::isDirectory)
                .findFirst()
                .orElseGet(() -> Path.of("resources", "themes").toAbsolutePath().normalize());
    }

    private List<ThemeSource> resolveThemeSources() {
        List<ThemeSource> result = new java.util.ArrayList<>();
        Path themesRoot = resolveThemesRoot();
        if (Files.isDirectory(themesRoot)) {
            try (var stream = Files.list(themesRoot)) {
                stream.filter(Files::isDirectory)
                        .map(path -> resolveThemeSource(path, path.getFileName().toString(), "local"))
                        .filter(Objects::nonNull)
                        .forEach(result::add);
            } catch (IOException ex) {
                throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "主题目录读取失败", ex);
            }
        }

        for (Path pluginRoot : resolvePluginRoots()) {
            try (var stream = Files.list(pluginRoot)) {
                stream.filter(Files::isDirectory)
                        .map(pluginDir -> pluginDir.resolve(PLUGIN_PORTAL_THEME_DIR).normalize())
                        .filter(Files::isDirectory)
                        .map(themeDir -> resolveThemeSource(themeDir, themeDir.getParent().getFileName().toString(), "plugin"))
                        .filter(Objects::nonNull)
                        .forEach(result::add);
            } catch (IOException ex) {
                throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "插件主题目录读取失败", ex);
            }
        }

        for (Path devPluginRoot : resolveDevPluginRoots()) {
            try (var stream = Files.list(devPluginRoot)) {
                stream.filter(Files::isDirectory)
                        .map(pluginDir -> pluginDir.resolve(Path.of("src", "main", "resources", PLUGIN_PORTAL_THEME_DIR)).normalize())
                        .filter(Files::isDirectory)
                        .map(themeDir -> resolveThemeSource(themeDir, themeDir.getFileName().toString(), "plugin-dev"))
                        .filter(Objects::nonNull)
                        .forEach(result::add);
            } catch (IOException ex) {
                throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "开发插件主题目录读取失败", ex);
            }
        }

        return result.stream()
                .collect(java.util.stream.Collectors.toMap(
                        ThemeSource::themeKey,
                        source -> source,
                        (left, right) -> left,
                        java.util.LinkedHashMap::new
                ))
                .values()
                .stream()
                .toList();
    }

    private List<Path> resolvePluginRoots() {
        return PLUGIN_ROOT_CANDIDATES.stream()
                .map(path -> path.toAbsolutePath().normalize())
                .filter(Files::isDirectory)
                .toList();
    }

    private List<Path> resolveDevPluginRoots() {
        return DEV_PLUGIN_ROOT_CANDIDATES.stream()
                .map(path -> path.toAbsolutePath().normalize())
                .filter(Files::isDirectory)
                .toList();
    }

    private ThemeSource resolveThemeSource(Path themeRoot, String fallbackKey, String sourceType) {
        Path configPath = themeRoot.resolve(THEME_CONFIG_FILE).normalize();
        if (!Files.isRegularFile(configPath)) {
            return null;
        }
        try {
            ThemeDefinition definition = objectMapper.readValue(configPath.toFile(), ThemeDefinition.class);
            String themeKey = StringUtils.hasText(definition.getId()) ? definition.getId().trim() : fallbackKey;
            return new ThemeSource(themeKey, themeRoot, resolveThemeOverrideRoot(themeKey), sourceType);
        } catch (IOException ex) {
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "主题配置读取失败: " + fallbackKey, ex);
        }
    }

    private ThemeRuntime loadTheme(List<ThemeSource> themeSources, String themeKey) {
        if (!StringUtils.hasText(themeKey)) {
            throw new DomainException("主题键不能为空");
        }

        String normalizedThemeKey = normalizeRelativePath(themeKey);
        ThemeSource themeSource = themeSources.stream()
                .filter(source -> Objects.equals(source.themeKey(), normalizedThemeKey))
                .findFirst()
                .orElse(null);
        if (themeSource == null) {
            throw new DomainException("文件化主题不存在: " + themeKey);
        }
        return loadTheme(themeSource);
    }

    private ThemeRuntime loadTheme(ThemeSource themeSource) {
        Path configPath = themeSource.resolve(THEME_CONFIG_FILE);
        if (!Files.isRegularFile(configPath)) {
            throw new DomainException("主题缺少 theme.json: " + themeSource.themeKey());
        }

        try {
            ThemeDefinition definition = objectMapper.readValue(configPath.toFile(), ThemeDefinition.class);
            if (!StringUtils.hasText(definition.getId())) {
                definition.setId(themeSource.themeKey());
            }
            return new ThemeRuntime(themeSource.themeKey(), themeSource.root(), themeSource.overrideRoot(), definition, themeSource);
        } catch (IOException ex) {
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "主题配置读取失败: " + themeSource.themeKey(), ex);
        }
    }

    private String resolvePagePath(ThemeDefinition definition, String requestPath) {
        String normalizedPath = normalizeRequestPath(requestPath);
        Map<String, String> pages = definition.getPages();
        if (!CollectionUtils.isEmpty(pages) && StringUtils.hasText(pages.get(normalizedPath))) {
            return pages.get(normalizedPath);
        }
        if (!CollectionUtils.isEmpty(pages) && StringUtils.hasText(pages.get(DEFAULT_ROUTE))) {
            return pages.get(DEFAULT_ROUTE);
        }
        return DEFAULT_PAGE;
    }

    private void injectThemeMeta(Document document, ThemeDefinition definition) {
        if (document.head() == null) {
            document.prependElement("head");
        }
        if (document.title().isBlank() && StringUtils.hasText(definition.getTitle())) {
            document.title(definition.getTitle());
        }
        if (StringUtils.hasText(definition.getDescription())
                && document.head().selectFirst("meta[name=description]") == null) {
            document.head()
                    .appendElement("meta")
                    .attr("name", "description")
                    .attr("content", definition.getDescription());
        }
    }

    private void injectRuntimeState(Document document, ThemeRuntime theme, String requestPath) {
        Map<String, Object> runtime = new LinkedHashMap<>();
        runtime.put("version", "1.0");
        runtime.put("themeKey", theme.themeKey());
        runtime.put("title", theme.definition().getTitle());
        runtime.put("description", theme.definition().getDescription());
        runtime.put("routePath", normalizeRequestPath(requestPath));
        runtime.put("apiBase", "/portal");
        runtime.put("assetBase", "/portal/theme-assets/" + theme.themeKey());
        runtime.put("renderUrl", "/portal/render?themeKey=" + theme.themeKey());

        document.head()
                .appendElement("script")
                .attr("data-portal-runtime", "theme-state")
                .append("""
                        window.TT_PORTAL = %s;
                        window.TT_PORTAL_THEME = window.TT_PORTAL;
                        """.formatted(toJson(runtime)));
    }

    private String readUtf8(Path file) {
        if (!Files.isRegularFile(file)) {
            throw new DomainException("主题文件不存在: " + file.toAbsolutePath().normalize());
        }
        try {
            return Files.readString(file, StandardCharsets.UTF_8);
        } catch (IOException ex) {
            throw new DomainException(ResultCode.INTERNAL_SERVER_ERROR.toString(), "主题文件读取失败: " + file.toAbsolutePath().normalize(), ex);
        }
    }

    private String normalizeRequestPath(String requestPath) {
        if (!StringUtils.hasText(requestPath)) {
            return DEFAULT_ROUTE;
        }
        String normalized = requestPath.trim();
        if (!normalized.startsWith("/")) {
            normalized = "/" + normalized;
        }
        return normalized;
    }

    private String normalizeRelativePath(String value) {
        String normalized = value.trim().replace("\\", "/");
        while (normalized.startsWith("/")) {
            normalized = normalized.substring(1);
        }
        if (!StringUtils.hasText(normalized) || normalized.contains("..")) {
            throw new DomainException("非法主题文件路径: " + value);
        }
        return normalized;
    }

    private Path resolveThemeOverrideRoot(String themeKey) {
        return Path.of("resources", "theme-overrides", themeKey).toAbsolutePath().normalize();
    }

    private String toJson(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (Exception ex) {
            return "{}";
        }
    }

    /**
     * 文件化主题定义。
     */
    public static class ThemeDefinition {
        /**
         * 主题唯一标识。
         */
        private String id;

        /**
         * 主题展示名称。
         */
        private String title;

        /**
         * 主题说明。
         */
        private String description;

        /**
         * 是否作为默认启用主题。
         */
        private Boolean active;

        /**
         * 后台展示排序值。
         */
        private Integer order;

        /**
         * 页面路径到模板文件的映射。
         */
        private Map<String, String> pages = Map.of();

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Boolean getActive() {
            return active;
        }

        public void setActive(Boolean active) {
            this.active = active;
        }

        public Integer getOrder() {
            return order;
        }

        public void setOrder(Integer order) {
            this.order = order;
        }

        public Map<String, String> getPages() {
            return pages;
        }

        public void setPages(Map<String, String> pages) {
            this.pages = pages;
        }
    }

    /**
     * 文件化主题摘要。
     */
    public static class ThemeSummary {
        /**
         * 主题目录键。
         */
        private String key;

        /**
         * 主题展示名称。
         */
        private String title;

        /**
         * 主题说明。
         */
        private String description;

        /**
         * 是否为当前启用主题。
         */
        private Boolean active;

        /**
         * 后台展示排序值。
         */
        private Integer order;

        /**
         * 页面路由映射。
         */
        private Map<String, String> pages = Map.of();

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Boolean getActive() {
            return active;
        }

        public void setActive(Boolean active) {
            this.active = active;
        }

        public Integer getOrder() {
            return order;
        }

        public void setOrder(Integer order) {
            this.order = order;
        }

        public Map<String, String> getPages() {
            return pages;
        }

        public void setPages(Map<String, String> pages) {
            this.pages = pages;
        }
    }

    private record ThemeSource(String themeKey, Path root, Path overrideRoot, String sourceType) {

        private Path resolve(String relativePath) {
            String normalizedRelativePath = normalizeThemeRelativePath(relativePath);
            Path overridePath = overrideRoot.resolve(normalizedRelativePath).normalize();
            if (Files.isRegularFile(overridePath)) {
                return overridePath;
            }
            return root.resolve(normalizedRelativePath).normalize();
        }
    }

    private record ThemeRuntime(String themeKey, Path root, Path overrideRoot, ThemeDefinition definition, ThemeSource source) {

        private Path resolve(String relativePath) {
            String normalizedRelativePath = normalizeThemeRelativePath(relativePath);
            Path overridePath = overrideRoot.resolve(normalizedRelativePath).normalize();
            if (overridePath.startsWith(overrideRoot) && Files.isRegularFile(overridePath)) {
                return overridePath;
            }
            Path resolved = root.resolve(normalizedRelativePath).normalize();
            if (!resolved.startsWith(root)) {
                throw new DomainException("非法主题文件访问: " + relativePath);
            }
            return resolved;
        }
    }

    private static String normalizeThemeRelativePath(String relativePath) {
        String normalizedRelativePath = relativePath == null ? "" : relativePath.trim().replace("\\", "/");
        while (normalizedRelativePath.startsWith("/")) {
            normalizedRelativePath = normalizedRelativePath.substring(1);
        }
        if (!StringUtils.hasText(normalizedRelativePath) || normalizedRelativePath.contains("..")) {
            throw new DomainException("非法主题文件路径: " + relativePath);
        }
        return normalizedRelativePath;
    }
}
