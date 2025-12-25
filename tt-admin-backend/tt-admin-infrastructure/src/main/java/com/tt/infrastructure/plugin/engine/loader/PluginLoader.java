package com.tt.infrastructure.plugin.engine.loader;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * 插件加载器基类
 * <p>
 * 继承ApplicationContextAware以获取Spring主程序上下文对象，
 * 为插件加载提供主程序的Bean访问能力。
 * </p>
 *
 * @author trf
 * @date 2025/12/23
 */
public abstract class PluginLoader implements ApplicationContextAware {

    /**
     * 主程序ApplicationContext
     */
    protected ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}