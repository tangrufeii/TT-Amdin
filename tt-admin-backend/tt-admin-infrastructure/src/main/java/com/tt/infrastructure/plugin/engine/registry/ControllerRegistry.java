package com.tt.infrastructure.plugin.engine.registry;

import com.tt.domain.plugin.BasePluginRegistryHandler;
import com.tt.domain.plugin.model.aggregate.Plugin;
import com.tt.infrastructure.plugin.engine.context.PluginApplicationContextHolder;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.api.AbstractOpenApiResource;
import org.springdoc.core.service.OpenAPIService;
import org.springdoc.webmvc.api.MultipleOpenApiResource;
import org.springdoc.webmvc.api.OpenApiResource;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Locale;
import java.util.Map;

/**
 * 插件Controller注册器
 * <p>
 * 负责将插件中的Controller类注册到Spring MVC的RequestMappingHandlerMapping中。
 * 支持Controller和RestController注解的类。
 * </p>
 *
 * @author trf
 * @date 2025/12/23
 */
@Service
@Order(3)
@Slf4j
public class ControllerRegistry implements BasePluginRegistryHandler {

    private RequestMappingHandlerMapping requestMappingHandlerMapping;

    private ApplicationContext applicationContext;

    private Method getMappingForMethod;

    @Override
    public void initialize() throws Exception {
        requestMappingHandlerMapping = applicationContext.getBean(RequestMappingHandlerMapping.class);
        getMappingForMethod = ReflectionUtils.findMethod(
                RequestMappingHandlerMapping.class,
                "getMappingForMethod",
                Method.class,
                Class.class
        );
        if (getMappingForMethod != null) {
            getMappingForMethod.setAccessible(true);
        }
    }

    @Override
    public void registry(Plugin plugin) throws Exception {
        var pluginContext = PluginApplicationContextHolder.getApplicationContext(plugin.getPluginId());

        for (Class<?> clazz : plugin.getClassList()) {
            Controller controller = clazz.getAnnotation(Controller.class);
            RestController restController = clazz.getAnnotation(RestController.class);

            if (controller == null && restController == null) {
                continue;
            }

            Object bean = pluginContext.getBean(clazz);
            Method[] methods = clazz.getMethods();

            for (Method method : methods) {
                if (hasMappingAnnotation(method)) {
                    RequestMappingInfo requestMappingInfo = (RequestMappingInfo)
                            getMappingForMethod.invoke(requestMappingHandlerMapping, method, clazz);

                    // 如果已存在映射，先注销
                    Map<RequestMappingInfo, HandlerMethod> handlerMethods =
                            requestMappingHandlerMapping.getHandlerMethods();
                    if (handlerMethods.containsKey(requestMappingInfo)) {
                        requestMappingHandlerMapping.unregisterMapping(requestMappingInfo);
                    }

                    // 注册新映射
                    requestMappingHandlerMapping.registerMapping(requestMappingInfo, bean, method);
                    log.info("Registered controller endpoint: {} -> {}.{}",
                            requestMappingInfo, clazz.getSimpleName(), method.getName());
                }
            }
        }
    }

    @Override
    public void unRegistry(Plugin plugin) throws Exception {
        for (Class<?> clazz : plugin.getClassList()) {
            Controller controller = clazz.getAnnotation(Controller.class);
            RestController restController = clazz.getAnnotation(RestController.class);

            if (controller == null && restController == null) {
                continue;
            }

            Method[] methods = clazz.getMethods();
            for (Method method : methods) {
                if (hasMappingAnnotation(method)) {
                    RequestMappingInfo requestMappingInfo = (RequestMappingInfo)
                            getMappingForMethod.invoke(requestMappingHandlerMapping, method, clazz);
                    requestMappingHandlerMapping.unregisterMapping(requestMappingInfo);
                    log.debug("Unregistered controller endpoint: {}.{}", clazz.getSimpleName(), method.getName());
                }
            }
        }
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    /**
     * 判断方法是否有映射注解
     *
     * @param method 方法对象
     * @return 有映射注解返回true
     */
    private boolean hasMappingAnnotation(Method method) {
        return method.getAnnotation(RequestMapping.class) != null
                || method.getAnnotation(GetMapping.class) != null
                || method.getAnnotation(PostMapping.class) != null
                || method.getAnnotation(DeleteMapping.class) != null
                || method.getAnnotation(PutMapping.class) != null
                || method.getAnnotation(PatchMapping.class) != null;
    }

    /**
     * 根据分组名称获取OpenAPIService
     *
     * @param groupName 分组名称
     * @return OpenAPIService
     */
    private OpenAPIService getOpenAPIServiceByGroupName(String groupName) throws Exception {
        MultipleOpenApiResource multipleOpenApiResource =
                applicationContext.getBean(MultipleOpenApiResource.class);

        // 反射获取openApiResource
        Method getOpenApiResource = MultipleOpenApiResource.class
                .getDeclaredMethod("getOpenApiResourceOrThrow", String.class);
        ReflectionUtils.makeAccessible(getOpenApiResource);
        OpenApiResource openApiResource = (OpenApiResource) getOpenApiResource.invoke(multipleOpenApiResource, groupName);

        // 反射获取 openAPIService
        Field openAPIServiceField = AbstractOpenApiResource.class.getDeclaredField("openAPIService");
        ReflectionUtils.makeAccessible(openAPIServiceField);
        return (OpenAPIService) openAPIServiceField.get(openApiResource);
    }
}