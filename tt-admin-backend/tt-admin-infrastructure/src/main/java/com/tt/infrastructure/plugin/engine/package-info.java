/**
 * 插件引擎核心包
 * <p>
 * 本包包含插件系统的基础设施代码，负责插件的生命周期管理、类加载、资源处理等技术实现。
 * 作为插件系统的技术支撑层，与具体的业务领域逻辑解耦。
 * </p>
 *
 * <h3>核心职责</h3>
 * <ul>
 *     <li>插件加载与卸载</li>
 *     <li>类加载器管理</li>
 *     <li>插件资源扫描与处理</li>
 *     <li>插件安装与SQL执行</li>
 *     <li>插件运行时上下文管理</li>
 * </ul>
 *
 * <h3>子包结构</h3>
 * <ul>
 *     <li>{@link com.tt.infrastructure.plugin.engine.config} - 配置读取</li>
 *     <li>{@link com.tt.infrastructure.plugin.engine.loader} - 类加载</li>
 *     <li>{@link com.tt.infrastructure.plugin.engine.scanner} - 资源扫描</li>
 *     <li>{@link com.tt.infrastructure.plugin.engine.extractor} - 文件解压</li>
 *     <li>{@link com.tt.infrastructure.plugin.engine.copier} - 文件拷贝</li>
 *     <li>{@link com.tt.infrastructure.plugin.engine.installer} - SQL安装</li>
 *     <li>{@link com.tt.infrastructure.plugin.engine.holder} - 运行时状态持有</li>
 *     <li>{@link com.tt.infrastructure.plugin.engine.context} - Spring上下文管理</li>
 *     <li>{@link com.tt.infrastructure.plugin.engine.handler} - 插件处理器</li>
 *     <li>{@link com.tt.infrastructure.plugin.engine.manager} - 插件管理器</li>
 *     <li>{@link com.tt.infrastructure.plugin.engine.registry} - 组件注册器</li>
 * </ul>
 *
 * @author trf
 * @since 2025/12/23
 */
package com.tt.infrastructure.plugin.engine;