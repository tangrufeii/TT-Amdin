package com.tt.infrastructure.plugin.persistence.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tt.infrastructure.plugin.persistence.po.PluginManagementPO;
import org.apache.ibatis.annotations.Mapper;

/**
 * 插件管理Mapper接口
 * <p>
 * 基于 MyBatis-Plus 的 BaseMapper 提供基础的CRUD操作
 * 自定义查询方法可通过 XML 文件或注解方式实现
 *
 * @author tt
 * @date 2025/12/24
 */
@Mapper
public interface PluginManagementMapper extends BaseMapper<PluginManagementPO> {

    // BaseMapper 已提供以下方法：
    // - insert(PO entity): 插入单条记录
    // - deleteById(Serializable id): 根据ID删除
    // - deleteByMap(Map<String, Object> map): 根据Map条件删除
    // - delete(Wrapper<T> wrapper): 根据条件删除
    // - updateById(PO entity): 根据ID更新
    // - update(PO entity, Wrapper<T> wrapper): 根据条件更新
    // - selectById(Serializable id): 根据ID查询
    // - selectBatchIds(Collection<? extends Serializable> ids): 批量查询
    // - selectByMap(Map<String, Object> map): 根据Map条件查询
    // - selectOne(Wrapper<T> wrapper): 查询单条记录
    // - selectCount(Wrapper<T> wrapper): 查询总数
    // - selectList(Wrapper<T> wrapper): 查询列表
    // - selectMaps(Wrapper<T> wrapper): 查询列表返回Map
    // - selectPage(IPage<T> page, Wrapper<T> wrapper): 分页查询

    // 如需自定义查询方法，在此添加方法声明
    // 例如：List<PluginManagementPO> selectByCondition(PluginQueryCondition condition);
}