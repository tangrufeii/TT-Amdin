package com.tt.infrastructure.plugin.engine.registry;

import cn.hutool.core.io.FileUtil;
import com.tt.domain.plugin.BasePluginRegistryHandler;
import com.tt.domain.plugin.model.aggregate.Plugin;
import com.tt.domain.plugin.model.aggregate.PluginConfig;
import com.tt.infrastructure.plugin.engine.PluginUtil;
import com.tt.infrastructure.plugin.engine.context.PluginApplicationContextHolder;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.builder.xml.XMLMapperBuilder;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;
import org.springframework.util.ClassUtils;

import java.io.BufferedInputStream;
import java.io.File;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * 插件Mapper XML注册器
 * <p>
 * 负责将插件中的MyBatis Mapper XML文件注册到MyBatis配置中。
 * 插件卸载时会清理相关的MappedStatement等资源。
 * </p>
 *
 * @author trf
 * @date 2025/12/23
 */
@Service
@Order(2)
@Slf4j
public class MapperRegistry implements BasePluginRegistryHandler {

    @Override
    public void initialize() throws Exception {
        // 无需初始化操作
    }

    @Override
    public void registry(Plugin plugin) throws Exception {
        SqlSessionFactory sqlSessionFactory = PluginApplicationContextHolder
                .getApplicationContext(plugin.getPluginId())
                .getBean(SqlSessionFactory.class);
        Configuration configuration = sqlSessionFactory.getConfiguration();

        try {
            Resources.setDefaultClassLoader(plugin.getPluginClassLoader());
            List<File> mapperXmlFiles = PluginUtil.getMapperXml(
                    new File(plugin.getPluginPath()),
                    plugin.getPluginConfig());

            for (File file : mapperXmlFiles) {
                try (BufferedInputStream inputStream = FileUtil.getInputStream(file)) {
                    XMLMapperBuilder xmlMapperBuilder = new XMLMapperBuilder(
                            inputStream,
                            configuration,
                            file.getAbsolutePath(),
                            configuration.getSqlFragments());
                    xmlMapperBuilder.parse();
                    log.debug("Registered mapper XML: {}", file.getName());
                }
            }
        } catch (Exception e) {
            log.error("Failed to register mapper XML for plugin: {}", plugin.getPluginId(), e);
        } finally {
            Resources.setDefaultClassLoader(ClassUtils.getDefaultClassLoader());
        }
    }

    @Override
    public void unRegistry(Plugin plugin) throws Exception {
        try {
            List<String> mapperXmlPaths = PluginUtil.getMapperXmlPath(
                    new File(plugin.getPluginPath()),
                    plugin.getPluginConfig());

            SqlSessionFactory sqlSessionFactory = PluginApplicationContextHolder
                    .getApplicationContext(plugin.getPluginId())
                    .getBean(SqlSessionFactory.class);
            Configuration configuration = sqlSessionFactory.getConfiguration();

            // 清理MyBatis配置中的各种资源
            clearMappedStatements(configuration, mapperXmlPaths);
            clearCaches(configuration, mapperXmlPaths);
            clearResultMaps(configuration, mapperXmlPaths);
            clearParameterMaps(configuration, mapperXmlPaths);
            clearKeyGenerators(configuration, mapperXmlPaths);
            clearSqlFragments(configuration);

            // 清理已加载资源集合
            clearLoadedResources(configuration);

            log.debug("Unregistered mapper XML for plugin: {}", plugin.getPluginId());
        } catch (Exception e) {
            log.error("Failed to unregister mapper XML for plugin: {}", plugin.getPluginId(), e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        // 无需保存ApplicationContext
    }

    /**
     * 清理MappedStatement
     */
    private void clearMappedStatements(Configuration configuration, List<String> mapperXmlPaths) throws Exception {
        clearValues(configuration, "mappedStatements", mapperXmlPaths);
    }

    /**
     * 清理Cache
     */
    private void clearCaches(Configuration configuration, List<String> mapperXmlPaths) throws Exception {
        clearValues(configuration, "caches", mapperXmlPaths);
    }

    /**
     * 清理ResultMap
     */
    private void clearResultMaps(Configuration configuration, List<String> mapperXmlPaths) throws Exception {
        clearValues(configuration, "resultMaps", mapperXmlPaths);
    }

    /**
     * 清理ParameterMap
     */
    private void clearParameterMaps(Configuration configuration, List<String> mapperXmlPaths) throws Exception {
        clearValues(configuration, "parameterMaps", mapperXmlPaths);
    }

    /**
     * 清理KeyGenerator
     */
    private void clearKeyGenerators(Configuration configuration, List<String> mapperXmlPaths) throws Exception {
        clearValues(configuration, "keyGenerators", mapperXmlPaths);
    }

    /**
     * 清理SqlFragment
     */
    private void clearSqlFragments(Configuration configuration) throws Exception {
        Field loadedResourcesField = configuration.getClass().getSuperclass().getDeclaredField("sqlFragments");
        loadedResourcesField.setAccessible(true);
        ((Map<?, ?>) loadedResourcesField.get(configuration)).clear();
    }

    /**
     * 清理已加载资源集合
     */
    private void clearLoadedResources(Configuration configuration) throws Exception {
        Field loadedResourcesField = configuration.getClass().getSuperclass().getDeclaredField("loadedResources");
        loadedResourcesField.setAccessible(true);
        ((Set<?>) loadedResourcesField.get(configuration)).clear();
    }

    /**
     * 清理Configuration中的指定字段值
     *
     * @param configuration  MyBatis配置对象
     * @param fieldName      字段名
     * @param mapperXmlPaths Mapper文件路径列表
     */
    private void clearValues(Configuration configuration, String fieldName, List<String> mapperXmlPaths) throws Exception {
        Field field = configuration.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        Map<?, ?> map = (Map<?, ?>) field.get(configuration);

        ConcurrentMap<Object, Object> newMap = new ConcurrentHashMap<>();
        for (Map.Entry<?, ?> entry : map.entrySet()) {
            Object value = entry.getValue();
            if (value instanceof MappedStatement ms) {
                if (!mapperXmlPaths.contains(ms.getResource())) {
                    newMap.put(entry.getKey(), value);
                }
            } else {
                newMap.put(entry.getKey(), value);
            }
        }
        field.set(configuration, newMap);
    }
}