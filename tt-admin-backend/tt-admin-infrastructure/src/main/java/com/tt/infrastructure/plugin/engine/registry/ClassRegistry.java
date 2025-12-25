package com.tt.infrastructure.plugin.engine.registry;

import com.baomidou.mybatisplus.core.MybatisConfiguration;
import com.tt.common.utils.SpringBeanUtil;
import com.tt.domain.plugin.BasePluginRegistryHandler;
import com.tt.domain.plugin.model.aggregate.Plugin;
import com.tt.infrastructure.plugin.engine.context.PluginApplicationContextHolder;
import com.tt.plugin.core.annotation.InterceptPath;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.mapper.MapperFactoryBean;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.support.AbstractBeanDefinition;
import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
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
 * 插件类注册器
 * <p>
 * 负责将插件中带有特定注解的类注册到Spring容器中。
 * 首先注册Mapper接口，然后注册其他组件类。
 * </p>
 *
 * @author trf
 * @date 2025/12/23
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

        // 1. 先注册Mapper接口（MyBatis-Plus需要）
        registerMapper(plugin);

        // 2. 注册其他带注解的Bean
        List<Class<?>> annotatedClasses = findAnnotatedClasses(plugin);
        if (!annotatedClasses.isEmpty()) {
            pluginContext.register(annotatedClasses.toArray(new Class[0]));
        }

        // 3. 只有首次启动时才刷新容器（GenericApplicationContext不支持多次refresh）
        if (!pluginContext.isActive()) {
            pluginContext.refresh();
            log.debug("Plugin context refreshed and ready for plugin: {}", plugin.getPluginId());
        }
    }

    @Override
    public void unRegistry(Plugin plugin) throws Exception {
        // 1. 移除所有Bean定义
        removeAllBeanDefinitions(plugin);

        // 2. 取消注册Mapper
        unregisterMappers(plugin);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        // 无需保存ApplicationContext
    }

    /**
     * 注册Mapper接口
     *
     * @param plugin 插件对象
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
     * 查找带注解的类（不包括Mapper和接口）
     *
     * @param plugin 插件对象
     * @return 带注解的类列表
     */
    private List<Class<?>> findAnnotatedClasses(Plugin plugin) {
        // 过滤掉接口
        List<Class<?>> pluginClassList = plugin.getClassList().stream()
                .filter(clazz -> !clazz.isInterface())
                .toList();

        if (pluginClassList.isEmpty()) {
            return Collections.emptyList();
        }

        List<Class<?>> registryClassList = new ArrayList<>();
        for (Class<?> clazz : pluginClassList) {
            Annotation[] annotations = clazz.getAnnotations();
            if (annotations.length > 0
                    && Collections.disjoint(Arrays.asList(annotations), Arrays.asList(REGISTER_ANNOTATIONS))) {
               log.info("loadClass -- > {}", clazz.getName());
                registryClassList.add(clazz);
            }
        }

        return registryClassList;
    }

    /**
     * 获取所有Mapper接口
     *
     * @param plugin 插件对象
     * @return Mapper接口列表
     */
    private List<Class<?>> getMapperList(Plugin plugin) {
        List<Class<?>> mapperClassList = new ArrayList<>();
        for (Class<?> clazz : plugin.getClassList()) {
            if (clazz.getAnnotation(Mapper.class) != null) {
                mapperClassList.add(clazz);
            }
        }
        return mapperClassList;
    }

    /**
     * 移除所有Bean定义
     *
     * @param plugin 插件对象
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
     * 取消注册Mapper
     *
     * @param plugin 插件对象
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