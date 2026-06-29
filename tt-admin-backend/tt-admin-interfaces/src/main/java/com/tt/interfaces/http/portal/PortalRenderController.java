package com.tt.interfaces.http.portal;

import com.tt.application.portal.service.PortalFileThemeRenderService;
import com.tt.application.portal.service.PortalFileThemeRenderService.ThemeDefinition;
import com.tt.application.portal.service.PortalFileThemeRenderService.ThemeSummary;
import com.tt.common.api.Result;
import com.tt.plugin.core.annotation.PermissionResource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.HandlerMapping;

import java.io.IOException;
import java.nio.file.Files;
import java.time.Duration;
import java.util.List;
import java.util.Map;

/**
 * 文件化门户渲染控制器。
 */
@RestController
@Tag(name = "门户渲染", description = "文件化主题门户渲染接口")
@RequestMapping("/portal")
@RequiredArgsConstructor
public class PortalRenderController {

    private final PortalFileThemeRenderService portalFileThemeRenderService;
    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    /**
     * 渲染文件化门户主题。
     *
     * @param themeKey 指定主题键；为空时使用当前主题
     * @param path 页面路径
     * @return HTML
     */
    @GetMapping(value = "/render", produces = MediaType.TEXT_HTML_VALUE)
    @Operation(summary = "渲染文件化门户主题")
    public ResponseEntity<String> render(@RequestParam(required = false) String themeKey,
                                         @RequestParam(required = false) String path) {
        String html = portalFileThemeRenderService.render(themeKey, path);
        return ResponseEntity.ok()
                .cacheControl(CacheControl.noStore())
                .contentType(MediaType.TEXT_HTML)
                .body(html);
    }

    /**
     * 列出文件化门户主题。
     *
     * @return 文件主题摘要列表
     */
    @GetMapping("/file-themes")
    @Operation(summary = "列出文件化门户主题")
    @PermissionResource("portal:theme:list")
    public Result<List<ThemeSummary>> listFileThemes() {
        return Result.data(portalFileThemeRenderService.listThemes());
    }

    /**
     * 读取文件化门户主题配置。
     *
     * @param themeKey 主题键
     * @return theme.json 解析结果
     */
    @GetMapping("/file-themes/{themeKey}/definition")
    @Operation(summary = "读取文件化门户主题配置")
    @PermissionResource("portal:theme:detail")
    public Result<ThemeDefinition> getFileThemeDefinition(@PathVariable String themeKey) {
        return Result.data(portalFileThemeRenderService.getThemeDefinition(themeKey));
    }

    /**
     * 切换当前文件化门户主题。
     *
     * @param command 切换命令
     * @return 切换后的主题摘要
     */
    @PutMapping("/file-themes/current")
    @Operation(summary = "切换文件化门户主题")
    @PermissionResource("portal:theme:switch")
    public Result<ThemeSummary> switchFileTheme(@RequestBody Map<String, String> command) {
        return Result.data(portalFileThemeRenderService.switchTheme(command != null ? command.get("themeKey") : null));
    }

    /**
     * 读取文件化主题静态资源。
     *
     * @param themeKey 主题键
     * @param request HTTP 请求
     * @return 主题静态资源
     */
    @GetMapping("/theme-assets/{themeKey}/**")
    @Operation(summary = "读取文件化主题静态资源")
    public ResponseEntity<FileSystemResource> themeAsset(@PathVariable String themeKey, HttpServletRequest request) throws IOException {
        String assetPath = extractWildcardPath(request);
        FileSystemResource resource = portalFileThemeRenderService.resolveThemeAsset(themeKey, assetPath);
        String contentType = Files.probeContentType(resource.getFile().toPath());
        MediaType mediaType = StringUtils.hasText(contentType)
                ? MediaType.parseMediaType(contentType)
                : MediaType.APPLICATION_OCTET_STREAM;

        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(Duration.ofMinutes(10)).cachePublic())
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
                .contentType(mediaType)
                .body(resource);
    }

    private String extractWildcardPath(HttpServletRequest request) {
        String path = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
        String pattern = (String) request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE);
        return pathMatcher.extractPathWithinPattern(pattern, path);
    }
}
