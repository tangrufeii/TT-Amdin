package com.tt.server.interceptor;

import cn.dev33.satoken.exception.NotPermissionException;
import cn.dev33.satoken.session.SaSession;
import cn.dev33.satoken.stp.StpUtil;
import com.tt.application.auth.dto.UserDTO;
import com.tt.plugin.core.annotation.PermissionResource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;
import java.util.List;

/**
 * 基于 {@link PermissionResource} 的后端权限拦截器。
 * <p>
 * 前端按钮权限只能控制显示，不能替代接口级校验；这里负责在请求进入控制器前强制校验登录态和资源权限。
 */
@Component
public class PermissionResourceInterceptor implements HandlerInterceptor {

    /**
     * 管理员角色编码。
     */
    private static final List<String> ADMIN_ROLES = List.of("admin", "super-admin", "super_admin", "administrator");

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (!(handler instanceof HandlerMethod handlerMethod)) {
            return true;
        }

        PermissionResource permissionResource = resolvePermissionResource(handlerMethod);
        if (permissionResource == null) {
            return true;
        }
        String[] permissions = permissionResource.value();
        if (permissions == null || permissions.length == 0) {
            return true;
        }

        StpUtil.checkLogin();
        UserDTO user = getCurrentUser();
        if (isAdmin(user) || hasAnyPermission(user, permissions)) {
            return true;
        }
        throw new NotPermissionException(permissions[0]);
    }

    private PermissionResource resolvePermissionResource(HandlerMethod handlerMethod) {
        PermissionResource methodPermission =
                AnnotatedElementUtils.findMergedAnnotation(handlerMethod.getMethod(), PermissionResource.class);
        if (methodPermission != null) {
            return methodPermission;
        }
        return AnnotatedElementUtils.findMergedAnnotation(handlerMethod.getBeanType(), PermissionResource.class);
    }

    private UserDTO getCurrentUser() {
        Object user = StpUtil.getSession().get(SaSession.USER);
        return user instanceof UserDTO userDTO ? userDTO : null;
    }

    private boolean isAdmin(UserDTO user) {
        if (user == null || user.getRoles() == null) {
            return false;
        }
        return user.getRoles().stream().anyMatch(ADMIN_ROLES::contains);
    }

    private boolean hasAnyPermission(UserDTO user, String[] permissions) {
        if (user == null || user.getButtons() == null) {
            return false;
        }
        return Arrays.stream(permissions)
                .filter(permission -> permission != null && !permission.isBlank())
                .anyMatch(user.getButtons()::contains);
    }
}
