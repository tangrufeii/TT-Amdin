package com.tt.infrastructure.plugin.engine.registry;

import com.github.xiaoymin.knife4j.spring.configuration.Knife4jProperties;
import com.github.xiaoymin.knife4j.spring.configuration.Knife4jSetting;
import com.github.xiaoymin.knife4j.spring.extension.OpenApiExtensionResolver;
import com.tt.domain.plugin.BasePluginRegistryHandler;
import com.tt.domain.plugin.model.aggregate.Plugin;
import com.tt.infrastructure.plugin.engine.context.PluginApplicationContextHolder;
import com.tt.infrastructure.plugin.engine.scanner.PluginClassMetadata;
import com.tt.infrastructure.plugin.engine.scanner.PluginClassMetadataCache;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.api.AbstractOpenApiResource;
import org.springdoc.core.properties.SpringDocConfigProperties;
import org.springdoc.core.providers.SpringWebProvider;
import org.springdoc.core.service.AbstractRequestService;
import org.springdoc.core.service.OpenAPIService;
import org.springdoc.core.service.OperationService;
import org.springdoc.core.utils.SpringDocUtils;
import org.springdoc.webmvc.api.MultipleOpenApiResource;
import org.springdoc.webmvc.api.OpenApiResource;
import org.springdoc.webmvc.core.providers.SpringWebMvcProvider;
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
import java.util.HashSet;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

/**
 * Registers plugin controllers into Spring MVC mappings.
 */
@Service
@Order(3)
@Slf4j
@RequiredArgsConstructor
public class ControllerRegistry implements BasePluginRegistryHandler {

    private RequestMappingHandlerMapping requestMappingHandlerMapping;

    private ApplicationContext applicationContext;

    private Method getMappingForMethod;

    private final Knife4jProperties knife4jProperties;
    private final SpringDocConfigProperties properties;

    private final OpenAPIService openAPIService;
    private final SpringWebProvider springWebProvider;
    private final SpringDocConfigProperties springDocConfigProperties;
    private final OperationService operationService;
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
//        // 1. 获取 cachedOpenAPI 字段（私有）
//        Field cachedOpenAPIField = OpenAPIService.class.getDeclaredField("cachedOpenAPI");
//
//        // 2. 关闭访问权限检查（强制访问）
//        cachedOpenAPIField.setAccessible(true);
//
//        // 3. 获取实例中的 cachedOpenAPI Map 对象
//        Map<String, OpenAPI> cacheMap = (Map<String, OpenAPI>) cachedOpenAPIField.get(openAPIService);
//
//        // 4. 清空缓存
//        cacheMap.clear();
        for (Class<?> clazz : resolveControllerClasses(plugin)) {
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
            Map<String, Object> mappingsMap = openAPIService.getMappingsMap();
            mappingsMap.putAll(openAPIService.getContext().getBeansWithAnnotation(RestController.class));
            mappingsMap.putAll(openAPIService.getContext().getBeansWithAnnotation(RequestMapping.class));
            mappingsMap.putAll(openAPIService.getContext().getBeansWithAnnotation(Controller.class));
            SpringDocUtils.getConfig().addRestControllers(clazz);
            openAPIService.addMappings(Map.of(bean.toString(), bean));
            Set<Tag> tags = new HashSet();
            Set<String> tagsStr = new HashSet();
            openAPIService.buildTagsFromClass(clazz,tags,tagsStr,Locale.getDefault());

            log.info("添加成功----");
        }
        clearSpringDocCache();
    }

    @Override
    public void unRegistry(Plugin plugin) throws Exception {
        for (Class<?> clazz : resolveControllerClasses(plugin)) {
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
        clearSpringDocCache();
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
    private void clearSpringDocCache(){
        try {
            Field cachedOpenAPIField = ReflectionUtils.findField(
                    OpenAPIService.class,
                    "cachedOpenAPI"
            );
            Field handlerMethodsField = ReflectionUtils.findField(
                    SpringWebProvider.class,
                    "handlerMethods"
            );
            if(handlerMethodsField != null) {
                ReflectionUtils.makeAccessible(handlerMethodsField);
                handlerMethodsField.set(springWebProvider,null);
            }
            if (cachedOpenAPIField != null) {
                // 设置可访问权限（绕过private）
                ReflectionUtils.makeAccessible(cachedOpenAPIField);
                // 提取 Map 实例
                Map<String, OpenAPI> cachedMap = (Map<String, OpenAPI>)
                        ReflectionUtils.getField(cachedOpenAPIField, openAPIService);
                // 清空Map
                if (cachedMap != null) {
                    cachedMap.clear();
                    System.out.println("✅ OpenAPI cache cleared via reflection.");
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private Set<Class<?>> resolveControllerClasses(Plugin plugin) {
        PluginClassMetadata metadata = PluginClassMetadataCache.get(plugin.getPluginId());
        if (metadata != null && !metadata.getControllerClassNames().isEmpty()) {
            return loadClasses(plugin, metadata.getControllerClassNames());
        }
        return new HashSet<>(resolveAllClasses(plugin));
    }

    private Set<Class<?>> loadClasses(Plugin plugin, java.util.Collection<String> classNames) {
        Set<Class<?>> classes = new HashSet<>();
        ClassLoader classLoader = plugin.getPluginClassLoader();
        for (String className : classNames) {
            try {
                classes.add(classLoader.loadClass(className));
            } catch (ClassNotFoundException e) {
                log.debug("Failed to load plugin class: {}", className, e);
            }
        }
        return classes;
    }

    private Set<Class<?>> resolveAllClasses(Plugin plugin) {
        if (plugin.getClassList() != null && !plugin.getClassList().isEmpty()) {
            return new HashSet<>(plugin.getClassList());
        }
        if (plugin.getClassNameList() != null && !plugin.getClassNameList().isEmpty()) {
            return loadClasses(plugin, plugin.getClassNameList());
        }
        return new HashSet<>();
    }

}
