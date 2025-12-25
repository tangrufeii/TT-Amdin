/**
 * 插件领域事件包
 * <p>
 * 包含插件系统产生的领域事件，用于事件驱动架构。
 * 通过事件机制实现 domain 层与 infrastructure 层的解耦。
 * </p>
 *
 * <h3>事件分类</h3>
 *
 * <h4>1. 状态变更事件（聚合根内部状态变化）</h4>
 * <ul>
 *     <li>{@link com.tt.domain.plugin.model.event.PluginInstalledEvent} - 插件安装完成事件</li>
 *     <li>{@link com.tt.domain.plugin.model.event.PluginUninstalledEvent} - 插件卸载完成事件</li>
 *     <li>{@link com.tt.domain.plugin.model.event.PluginStatusChangedEvent} - 插件状态变更事件</li>
 * </ul>
 *
 * <h4>2. 操作请求事件（跨层交互）</h4>
 * <ul>
 *     <li>{@link com.tt.domain.plugin.model.event.PluginInstallRequestedEvent} - 插件安装请求事件</li>
 *     <li>{@link com.tt.domain.plugin.model.event.PluginInstallCompletedEvent} - 插件安装完成事件（技术层）</li>
 *     <li>{@link com.tt.domain.plugin.model.event.PluginStartRequestedEvent} - 插件启动请求事件</li>
 *     <li>{@link com.tt.domain.plugin.model.event.PluginStopRequestedEvent} - 插件停止请求事件</li>
 * </ul>
 *
 * <h3>事件流程示例</h3>
 * <pre>
 * 安装插件流程：
 * 1. Application层调用 PluginDomainService.requestInstall()
 * 2. 发布 PluginInstallRequestedEvent
 * 3. Infrastructure层监听并执行文件解压、安装
 * 4. 发布 PluginInstallCompletedEvent
 * 5. Domain层监听并保存数据库记录
 * 6. 发布 PluginInstalledEvent（领域事件）
 * </pre>
 *
 * @author trf
 * @since 2025/12/23
 */
package com.tt.domain.plugin.model.event;