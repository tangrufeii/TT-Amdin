package com.tt.infrastructure.plugin.handler;

/**
 * 插件处理器基类
 */
public interface BasePluginHandler {
    /**
     * 插件初始化
     * @throws Exception
     */
    void init () throws Exception;

    /**
     * 注册
     * @throws Exception
     */
    void register () throws Exception;

    /**
     *
     * @throws Exception
     */
    void unRegister () throws Exception;


}
