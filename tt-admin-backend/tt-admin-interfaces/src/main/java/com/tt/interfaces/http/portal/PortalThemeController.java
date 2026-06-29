package com.tt.interfaces.http.portal;

import com.tt.application.portal.command.PortalThemeSwitchCommand;
import com.tt.application.portal.dto.PortalRuntimeDTO;
import com.tt.application.portal.dto.PortalThemeCurrentDTO;
import com.tt.application.portal.dto.PortalThemeOptionDTO;
import com.tt.application.portal.service.PortalThemeApplicationService;
import com.tt.common.api.Result;
import com.tt.plugin.core.annotation.PermissionResource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 门户主题控制器
 */
@RestController
@Tag(name = "门户主题", description = "门户主题相关接口")
@RequestMapping("/portal/theme")
@RequiredArgsConstructor
public class PortalThemeController {

    private final PortalThemeApplicationService portalThemeApplicationService;

    @GetMapping("/current")
    @Operation(summary = "当前门户主题")
    public Result<PortalThemeCurrentDTO> getCurrentTheme() {
        return Result.data(portalThemeApplicationService.getCurrentTheme());
    }

    @GetMapping("/runtime")
    @Operation(summary = "门户运行时组合结果")
    public Result<PortalRuntimeDTO> getPortalRuntime(@RequestParam(required = false) String themeKey) {
        return Result.data(portalThemeApplicationService.getPortalRuntime(themeKey));
    }

    @GetMapping("/options")
    @Operation(summary = "门户主题选项")
    @PermissionResource("sys:dict:list")
    public Result<List<PortalThemeOptionDTO>> listThemeOptions() {
        return Result.data(portalThemeApplicationService.listThemeOptions());
    }

    @PutMapping("/current")
    @Operation(summary = "切换门户主题")
    @PermissionResource("sys:dict:update")
    public Result<PortalThemeCurrentDTO> switchTheme(@Valid @RequestBody PortalThemeSwitchCommand command) {
        return Result.data(portalThemeApplicationService.switchTheme(command.getThemeKey()));
    }
}
