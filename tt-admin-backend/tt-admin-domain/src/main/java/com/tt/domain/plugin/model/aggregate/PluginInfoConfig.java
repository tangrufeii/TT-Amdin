package com.tt.domain.plugin.model.aggregate;

import lombok.Data;
import lombok.NoArgsConstructor;


/**
 * 插件配置聚合
 */
@Data
@NoArgsConstructor
public class PluginInfoConfig {
    /**
     * 插件id
     */
    private String id;
    /**
     * 插件名称
     */
    private String name;
    /**
     * 插件mapper映射路径,用于插件mapperXml文件位置, 没有可不写
     */
    private String mapperLocation;
    /**
     * 插件描述信息
     */
    private String description;
    /**
     * 插件最低支持版本
     */
    private String minimalVersion;
    /**
     * 插件版本
     */
    private String version;
    /**
     * 插件静态资源路径
     */
    private String staticLocations;
    /**
     * 插件更新URL
     */
    private String updateUrl;
    /**
     * 是否为开发环境(如果是插件前端通过node运行,需要开启dev且设置前端开发环境地址)
     */
    private Boolean isDev;
    /**
     *  前端开发环境地址
     */
    private String frontDevAddress;
}
