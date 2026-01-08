package com.tt.interfaces.support;

import com.tt.plugin.core.annotation.PermissionResource;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 从 Controller 方法上提取权限资源与接口说明。
 */
@Component
@RequiredArgsConstructor
public class PermissionAnnotationExtractor {

    private final RequestMappingHandlerMapping requestMappingHandlerMapping;

    public Map<String, String> extractPermissionAnnotations() {
        Map<String, String> result = new LinkedHashMap<>();
        Map<RequestMappingInfo, HandlerMethod> handlerMethods = requestMappingHandlerMapping.getHandlerMethods();
        handlerMethods.forEach((info, handlerMethod) -> {
            PermissionResource permissionResource =
                    AnnotatedElementUtils.findMergedAnnotation(handlerMethod.getMethod(), PermissionResource.class);
            if (permissionResource == null) {
                return;
            }
            Operation operation = AnnotatedElementUtils.findMergedAnnotation(handlerMethod.getMethod(), Operation.class);
            String summary = operation == null ? "" : operation.summary();
            String description = operation == null ? "" : operation.description();
            String label = StringUtils.hasText(summary) ? summary : description;
            for (String resource : permissionResource.value()) {
                if (!StringUtils.hasText(resource)) {
                    continue;
                }
                result.put(resource, StringUtils.hasText(label) ? label : resource);
            }
        });
        return result;
    }
}
