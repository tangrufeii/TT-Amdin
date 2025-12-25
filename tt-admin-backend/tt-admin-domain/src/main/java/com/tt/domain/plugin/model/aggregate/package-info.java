/**
 * 插件聚合根包
 * <p>
 * 包含插件系统的核心聚合根，是领域模型的核心部分。
 * </p>
 *
 * <h3>主要聚合根</h3>
 * <ul>
 *     <li>{@link com.tt.domain.plugin.model.aggregate.Plugin} - 插件运行时聚合根</li>
 *     <li>{@link com.tt.domain.plugin.model.aggregate.PluginManagement} - 插件管理聚合根</li>
 *     <li>{@link com.tt.domain.plugin.model.aggregate.PluginConfig} - 插件配置聚合</li>
 *     <li>{@link com.tt.domain.plugin.model.aggregate.PluginAuthor} - 插件作者信息聚合</li>
 *     <li>{@link com.tt.domain.plugin.model.aggregate.PluginSpringDoc} - 插件SpringDoc配置聚合</li>
 *     <li>{@link com.tt.domain.plugin.model.aggregate.PluginInfoConfig} - 插件信息配置聚合</li>
 * </ul>
 *
 * @author trf
 * @since 2025/12/23
 */
package com.tt.domain.plugin.model.aggregate;
