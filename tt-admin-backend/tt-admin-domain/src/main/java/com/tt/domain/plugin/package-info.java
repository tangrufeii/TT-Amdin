/**
 * 插件领域层
 * <p>
 * 包含插件系统的核心领域模型、领域服务和仓储接口。
 * 遵循 DDD(领域驱动设计) 原则，关注业务本质而非技术实现。
 * </p>
 *
 * <h3>主要组成</h3>
 * <ul>
 *     <li>{@link com.tt.domain.plugin.model} - 领域模型包
 *     <ul>
 *         <li>aggregate - 聚合根（Plugin、PluginManagement 等）</li>
 *         <li>entity - 实体</li>
 *         <li>valobj - 值对象</li>
 *         <li>enums - 枚举</li>
 *         <li>constant - 常量</li>
 *         <li>event - 领域事件</li>
 *     </ul>
 *     </li>
 *     <li>{@link com.tt.domain.plugin.service} - 领域服务</li>
 *     <li>{@link com.tt.domain.plugin.repository} - 仓储接口</li>
 *     <li>{@link com.tt.domain.plugin.BasePluginRegistryHandler} - 插件注册处理器接口</li>
 * </ul>
 *
 * <h3>设计说明</h3>
 * <p>
 * 插件的基础设施实现（如类加载、文件处理、SQL 执行等）已移至
 * {@link com.tt.infrastructure.plugin.engine} 包中，本层仅保留领域相关的核心概念。
 * </p>
 *
 * @author trf
 * @since 2025/12/23
 */
package com.tt.domain.plugin;