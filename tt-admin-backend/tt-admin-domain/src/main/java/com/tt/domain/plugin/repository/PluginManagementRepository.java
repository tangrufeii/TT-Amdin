package com.tt.domain.plugin.repository;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.domain.plugin.model.aggregate.PluginManagement;
import com.tt.common.page.PageQuery;

import java.util.List;
import java.util.Optional;

/**
 * 插件管理仓储接口
 * <p>
 * 定义插件管理聚合的持久化和查询操作
 * 遵循DDD仓储模式，只返回聚合根
 * <p>
 * 注意：
 * 1. 只返回聚合根 PluginManagement，不直接返回实体
 * 2. 方法应具有业务含义
 * 3. 使用 Optional 避免 NPE
 * 4. 支持分页查询
 *
 * @author tt
 * @date 2025/12/24
 */
public interface PluginManagementRepository {

    /**
     * 保存插件管理聚合
     * <p>
     * 包括新增和更新操作
     *
     * @param pluginManagement 插件管理聚合
     */
    void save(PluginManagement pluginManagement);

    /**
     * 根据ID查找插件
     *
     * @param id 主键ID
     * @return 插件管理聚合
     */
    Optional<PluginManagement> findById(Long id);

    /**
     * 根据插件ID（唯一标识）查找插件
     *
     * @param pluginId 插件ID
     * @return 插件管理聚合
     */
    Optional<PluginManagement> findByPluginId(String pluginId);

    /**
     * 根据插件名称查找插件
     *
     * @param name 插件名称
     * @return 插件管理聚合
     */
    Optional<PluginManagement> findByName(String name);

    /**
     * 检查插件ID是否存在
     *
     * @param pluginId 插件ID
     * @return 是否存在
     */
    boolean existsByPluginId(String pluginId);

    /**
     * 检查插件名称是否存在
     *
     * @param name 插件名称
     * @return 是否存在
     */
    boolean existsByName(String name);

    /**
     * 分页查询插件列表
     *
     * @param pageQuery 分页查询条件
     * @param name      插件名称（模糊查询，可选）
     * @param status    插件状态（可选）
     * @return 分页结果
     */
    IPage<PluginManagement> findPage(PageQuery pageQuery, String name, Integer status);

    /**
     * 查询所有插件列表
     *
     * @return 插件列表
     */
    List<PluginManagement> findAll();

    /**
     * 根据状态查询插件列表
     *
     * @param status 状态：0-禁用，1-启用
     * @return 插件列表
     */
    List<PluginManagement> findByStatus(Integer status);

    /**
     * 删除插件
     *
     * @param id 主键ID
     */
    void deleteById(Long id);

    /**
     * 根据插件ID删除插件
     *
     * @param pluginId 插件ID
     */
    void deleteByPluginId(String pluginId);

    /**
     * 统计插件总数
     *
     * @return 插件总数
     */
    long count();

    /**
     * 根据状态统计插件数量
     *
     * @param status 状态
     * @return 插件数量
     */
    long countByStatus(Integer status);
}