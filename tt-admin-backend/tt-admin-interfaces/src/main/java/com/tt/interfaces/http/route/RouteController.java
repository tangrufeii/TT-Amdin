package com.tt.interfaces.http.route;

import cn.dev33.satoken.stp.StpUtil;
import com.tt.application.route.dto.RouteDTO;
import com.tt.application.route.dto.UserRouteDTO;
import com.tt.application.route.service.RouteApplicationService;
import com.tt.common.api.Result;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Tag(name = "路由管理", description = "路由管理相关接口")
@RequiredArgsConstructor
@RequestMapping("/route")
public class RouteController {

    private final RouteApplicationService routeApplicationService;

    @GetMapping("/getConstantRoutes")
    @Operation(summary = "获取常量路由")
    public Result<List<RouteDTO>> getConstantRoutes() {
        return Result.data(routeApplicationService.getConstantRoutes());
    }

    @GetMapping("/getUserRoutes")
    @Operation(summary = "获取用户动态路由")
    public Result<UserRouteDTO> getUserRoutes() {
        Long userId = StpUtil.getLoginIdAsLong();
        return Result.data(routeApplicationService.getUserRoutes(userId));
    }

    @GetMapping("/isRouteExist")
    @Operation(summary = "判断路由是否存在")
    public Result<Boolean> isRouteExist(@RequestParam String routeName) {
        return Result.data(routeApplicationService.isRouteExist(routeName));
    }
}
