package com.tt.interfaces.http.portal;

import com.tt.application.portal.service.PortalFileThemeRenderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 门户首页控制器。
 */
@RestController
@Tag(name = "门户首页", description = "文件化主题门户首页")
@RequiredArgsConstructor
public class PortalHomeController {

    private final PortalFileThemeRenderService portalFileThemeRenderService;

    /**
     * 渲染当前启用的文件化门户主题首页。
     *
     * @return 门户首页 HTML
     */
    @GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
    @Operation(summary = "渲染门户首页")
    public ResponseEntity<String> index() {
        String html = portalFileThemeRenderService.render(null, "/");
        return ResponseEntity.ok()
                .cacheControl(CacheControl.noStore())
                .contentType(MediaType.TEXT_HTML)
                .body(html);
    }
}
