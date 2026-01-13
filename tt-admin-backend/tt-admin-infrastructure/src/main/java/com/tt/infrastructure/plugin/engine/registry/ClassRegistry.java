package com.tt.infrastructure.plugin.engine.registry;

import com.baomidou.mybatisplus.core.MybatisConfiguration;
import com.tt.common.utils.SpringBeanUtil;
import com.tt.domain.plugin.BasePluginRegistryHandler;
import com.tt.domain.plugin.model.aggregate.Plugin;
import com.tt.infrastructure.plugin.engine.context.PluginApplicationContextHolder;
import com.tt.infrastructure.plugin.engine.scanner.PluginClassMetadata;
import com.tt.infrastructure.plugin.engine.scanner.PluginClassMetadataCache;
import com.tt.plugin.core.annotation.InterceptPath;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.mapper.MapperFactoryBean;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.support.AbstractBeanDefinition;
import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.context.ApplicationContext;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;

import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Plugin registry handler.
 */
@Service
@Order(1)
@Slf4j
public class ClassRegistry implements BasePluginRegistryHandler {

    /**
     * 需要注册到容器的注解类型
     */
    private static final Class<?>[] REGISTER_ANNOTATIONS = {
            Bean.class,
            Configuration.class,
            Component.class,
            RestController.class,
            Controller.class,
            Mapper.class,
            Service.class,
            Repository.class,
            InterceptPath.class
    };

    @Override
    public void initialize() throws Exception {
        // 无需初始化操作
    }

    @Override
    public void registry(Plugin plugin) throws Exception {
        var pluginContext = PluginApplicationContextHolder.getApplicationContext(plugin.getPluginId());
        if (pluginContext == null) {
            return;
        }

        if (PluginApplicationContextHolder.isRefreshed(plugin.getPluginId())) {
            log.debug("Plugin context already refreshed, skip class registry: {}", plugin.getPluginId());
            return;
        }

        ensureTaskScheduler(pluginContext);

        // 1. 先注册 Mapper 接口（MyBatis-Plus 需要）
        registerMapper(plugin);

        // 2. 注册其他带注解的 Bean
        List<Class<?>> annotatedClasses = findAnnotatedClasses(plugin);
        if (!annotatedClasses.isEmpty()) {
            pluginContext.register(annotatedClasses.toArray(new Class[0]));
        }

        // 3. 只允许首次 refresh，后续重复启动不再 refresh
        try {
            pluginContext.refresh();
            PluginApplicationContextHolder.markRefreshed(plugin.getPluginId());
            log.debug("Plugin context refreshed and ready for plugin: {}", plugin.getPluginId());
        } catch (IllegalStateException ex) {
            PluginApplicationContextHolder.markRefreshed(plugin.getPluginId());
            log.debug("Plugin context refresh skipped: {}", plugin.getPluginId(), ex);
        }
    }

    @Override
    public void unRegistry(Plugin plugin) throws Exception {
        // 1. 移除所有 Bean 定义
        removeAllBeanDefinitions(plugin);

        // 2. 取消注册 Mapper
        unregisterMappers(plugin);

        // 3. 允许下次重新刷新上下文
        PluginApplicationContextHolder.clearRefreshed(plugin.getPluginId());
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        // 无需保存 ApplicationContext
    }

    private void ensureTaskScheduler(AnnotationConfigApplicationContext pluginContext) {
        if (pluginContext.getBeanFactory().containsSingleton("taskScheduler")) {
            return;
        }
        if (pluginContext.containsBean("taskScheduler")) {
            return;
        }
        TaskScheduler scheduler = null;
        ApplicationContext parent = pluginContext.getParent();
        if (parent != null) {
            try {
                scheduler = parent.getBean(TaskScheduler.class);
            } catch (NoSuchBeanDefinitionException ignore) {
                scheduler = null;
            }
        }

        if (scheduler == null) {
            ThreadPoolTaskScheduler taskScheduler = new ThreadPoolTaskScheduler();
            taskScheduler.setPoolSize(2);
            taskScheduler.setThreadNamePrefix("plugin-scheduler-");
            taskScheduler.initialize();
            scheduler = taskScheduler;
        }

        pluginContext.getBeanFactory().registerSingleton("taskScheduler", scheduler);
    }

    /**
     * 注册 Mapper 接口
     */
    private void registerMapper(Plugin plugin) {
        List<Class<?>> mapperClassList = getMapperList(plugin);
        if (mapperClassList.isEmpty()) {
            return;
        }

        var pluginContext = PluginApplicationContextHolder.getApplicationContext(plugin.getPluginId());

        for (Class<?> mapperClass : mapperClassList) {
            GenericBeanDefinition definition = new GenericBeanDefinition();
            definition.getConstructorArgumentValues().addGenericArgumentValue(mapperClass);
            definition.setBeanClass(MapperFactoryBean.class);
            definition.getPropertyValues().add("addToConfig", true);
            definition.setAutowireMode(AbstractBeanDefinition.AUTOWIRE_BY_TYPE);
            pluginContext.registerBeanDefinition(mapperClass.getName(), definition);
            log.trace("Registered mapper: {}", mapperClass.getName());
        }
    }

    /**
     * 查找带注解的类（不包含 Mapper 和接口）
     */
    private List<Class<?>> findAnnotatedClasses(Plugin plugin) {
        List<Class<?>> pluginClassList = resolveComponentClasses(plugin);

        if (pluginClassList.isEmpty()) {
            return Collections.emptyList();
        }

        List<Class<?>> registryClassList = new ArrayList<>();
        for (Class<?> clazz : pluginClassList) {
            Annotation[] annotations = clazz.getAnnotations();
            if (annotations.length == 0) {
                continue;
            }
            boolean shouldRegister = Arrays.stream(annotations)
                    .map(Annotation::annotationType)
                    .anyMatch(annotationType -> Arrays.asList(REGISTER_ANNOTATIONS).contains(annotationType));
            if (shouldRegister) {
                log.info("loadClass -- > {}", clazz.getName());
                registryClassList.add(clazz);
            }
        }

        return registryClassList;
    }

    /**
     * 获取所有 Mapper 接口
     */
    private List<Class<?>> getMapperList(Plugin plugin) {
        PluginClassMetadata metadata = PluginClassMetadataCache.get(plugin.getPluginId());
        if (metadata != null && !metadata.getMapperClassNames().isEmpty()) {
            return resolveClassesByName(plugin, metadata.getMapperClassNames());
        }

        List<Class<?>> mapperClassList = new ArrayList<>();
        for (Class<?> clazz : resolveAllClasses(plugin)) {
            if (clazz.getAnnotation(Mapper.class) != null) {
                mapperClassList.add(clazz);
            }
        }
        return mapperClassList;
    }

    private List<Class<?>> resolveComponentClasses(Plugin plugin) {
        PluginClassMetadata metadata = PluginClassMetadataCache.get(plugin.getPluginId());
        if (metadata != null && !metadata.getComponentClassNames().isEmpty()) {
            return resolveClassesByName(plugin, metadata.getComponentClassNames());
        }

        return resolveAllClasses(plugin).stream()
                .filter(clazz -> !clazz.isInterface())
                .toList();
    }

    private List<Class<?>> resolveClassesByName(Plugin plugin, List<String> classNames) {
        if (classNames == null || classNames.isEmpty()) {
            return Collections.emptyList();
        }
        List<Class<?>> classes = new ArrayList<>();
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

    private List<Class<?>> resolveAllClasses(Plugin plugin) {
        if (plugin.getClassList() != null && !plugin.getClassList().isEmpty()) {
            return plugin.getClassList();
        }
        if (plugin.getClassNameList() != null && !plugin.getClassNameList().isEmpty()) {
            return resolveClassesByName(plugin, plugin.getClassNameList());
        }
        return Collections.emptyList();
    }

    /**
     * 移除所有 Bean 定义
     */
    private void removeAllBeanDefinitions(Plugin plugin) {
        var pluginContext = PluginApplicationContextHolder.getApplicationContext(plugin.getPluginId());
        String[] beanDefinitionNames = pluginContext.getBeanDefinitionNames();
        for (String beanDefinitionName : beanDefinitionNames) {
            pluginContext.removeBeanDefinition(beanDefinitionName);
        }
        log.debug("Removed all bean definitions for plugin: {}", plugin.getPluginId());
    }

    /**
     * 取消注册 Mapper
     */
    private void unregisterMappers(Plugin plugin) {
        SqlSessionFactory sqlSessionFactory = SpringBeanUtil.context.getBean(SqlSessionFactory.class);
        MybatisConfiguration configuration = (MybatisConfiguration) sqlSessionFactory.getConfiguration();

        List<Class<?>> mapperList = getMapperList(plugin);
        for (Class<?> mapperClass : mapperList) {
            configuration.removeMapper(mapperClass);
            log.trace("Unregistered mapper: {}", mapperClass.getName());
        }
    }
}
