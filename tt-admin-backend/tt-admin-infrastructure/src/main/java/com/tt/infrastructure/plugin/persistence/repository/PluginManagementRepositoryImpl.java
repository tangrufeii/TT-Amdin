package com.tt.infrastructure.plugin.persistence.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.common.page.PageQuery;
import com.tt.domain.plugin.model.aggregate.PluginManagement;
import com.tt.domain.plugin.repository.PluginManagementRepository;
import com.tt.infrastructure.plugin.convert.PluginManagementConvert;
import com.tt.infrastructure.plugin.persistence.mapper.PluginManagementMapper;
import com.tt.infrastructure.plugin.persistence.po.PluginManagementPO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * 插件管理仓储实现
 * <p>
 * 实现领域层定义的 PluginManagementRepository 接口
 * 使用 MyBatis-Plus 进行数��访问
 * 负责在领域对象与持久化对象之间转换
 *
 * @author tt
 * @date 2025/12/24
 */
@Slf4j
@Repository
@RequiredArgsConstructor
public class PluginManagementRepositoryImpl implements PluginManagementRepository {

    private final PluginManagementMapper pluginManagementMapper;

    @Override
    public void save(PluginManagement pluginManagement) {
        if (pluginManagement == null) {
            throw new IllegalArgumentException("��件管理对象不能为空");
        }

        PluginManagementPO po = PluginManagementConvert.toPO(pluginManagement);
        if (po.getId() == null) {
            // 新增操作
            po.setCreateTime(LocalDateTime.now());
            po.setUpdateTime(LocalDateTime.now());
            pluginManagementMapper.insert(po);
            // 设置回生成的数据库主键ID
            if (pluginManagement.getPluginInfo() != null) {
                pluginManagement.getPluginInfo().setId(po.getPluginId());
            }
            // 使用反射或直接设置dbId（这里需要在聚合根添加setter）
            log.debug("新增插件记录: dbId={}, pluginId={}", po.getId(), po.getPluginId());
        } else {
            // 更新操作
            po.setUpdateTime(LocalDateTime.now());
            pluginManagementMapper.updateById(po);
            log.debug("更新插件记录: dbId={}, pluginId={}", po.getId(), po.getPluginId());
        }
    }

    @Override
    public Optional<PluginManagement> findById(Long id) {
        if (id == null) {
            return Optional.empty();
        }

        PluginManagementPO po = pluginManagementMapper.selectById(id);
        return Optional.ofNullable(PluginManagementConvert.toDomain(po));
    }

    @Override
    public Optional<PluginManagement> findByPluginId(String pluginId) {
        if (pluginId == null || pluginId.isBlank()) {
            return Optional.empty();
        }

        LambdaQueryWrapper<PluginManagementPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PluginManagementPO::getPluginId, pluginId);

        PluginManagementPO po = pluginManagementMapper.selectOne(wrapper);
        return Optional.ofNullable(PluginManagementConvert.toDomain(po));
    }

    @Override
    public Optional<PluginManagement> findByName(String name) {
        if (name == null || name.isBlank()) {
            return Optional.empty();
        }

        LambdaQueryWrapper<PluginManagementPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PluginManagementPO::getName, name);

        PluginManagementPO po = pluginManagementMapper.selectOne(wrapper);
        return Optional.ofNullable(PluginManagementConvert.toDomain(po));
    }

    @Override
    public boolean existsByPluginId(String pluginId) {
        if (pluginId == null || pluginId.isBlank()) {
            return false;
        }

        LambdaQueryWrapper<PluginManagementPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PluginManagementPO::getPluginId, pluginId);

        return pluginManagementMapper.selectCount(wrapper) > 0;
    }

    @Override
    public boolean existsByName(String name) {
        if (name == null || name.isBlank()) {
            return false;
        }

        LambdaQueryWrapper<PluginManagementPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PluginManagementPO::getName, name);

        return pluginManagementMapper.selectCount(wrapper) > 0;
    }

    @Override
    public IPage<PluginManagement> findPage(PageQuery pageQuery, String name, Integer status) {
        // 构建查询条件
        LambdaQueryWrapper<PluginManagementPO> wrapper = new LambdaQueryWrapper<>();

        // 名称模糊查询
        if (name != null && !name.isBlank()) {
            wrapper.like(PluginManagementPO::getName, name);
        }

        // 状态精确查询
        if (status != null) {
            wrapper.eq(PluginManagementPO::getStatus, status);
        }

        // 按创建时间倒序
        wrapper.orderByDesc(PluginManagementPO::getCreateTime);

        // 分页查询
        IPage<PluginManagementPO> poPage = pluginManagementMapper.selectPage(
                pageQuery.buildPage(),
                wrapper
        );

        // 转换为领域对象分页结果
        return poPage.convert(PluginManagementConvert::toDomain);
    }

    @Override
    public List<PluginManagement> findAll() {
        LambdaQueryWrapper<PluginManagementPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByDesc(PluginManagementPO::getCreateTime);

        List<PluginManagementPO> poList = pluginManagementMapper.selectList(wrapper);
        return poList.stream()
                .map(PluginManagementConvert::toDomain)
                .toList();
    }

    @Override
    public List<PluginManagement> findByStatus(Integer status) {
        if (status == null) {
            return List.of();
        }

        LambdaQueryWrapper<PluginManagementPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PluginManagementPO::getStatus, status);
        wrapper.orderByDesc(PluginManagementPO::getCreateTime);

        List<PluginManagementPO> poList = pluginManagementMapper.selectList(wrapper);
        return poList.stream()
                .map(PluginManagementConvert::toDomain)
                .toList();
    }

    @Override
    public void deleteById(Long id) {
        if (id == null) {
            return;
        }

        int rows = pluginManagementMapper.deleteById(id);
        log.debug("删除插件记录: dbId={}, rows={}", id, rows);
    }

    @Override
    public void deleteByPluginId(String pluginId) {
        if (pluginId == null || pluginId.isBlank()) {
            return;
        }

        LambdaQueryWrapper<PluginManagementPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PluginManagementPO::getPluginId, pluginId);

        int rows = pluginManagementMapper.delete(wrapper);
        log.debug("根据插件ID删除记录: pluginId={}, rows={}", pluginId, rows);
    }

    @Override
    public long count() {
        return pluginManagementMapper.selectCount(null);
    }

    @Override
    public long countByStatus(Integer status) {
        if (status == null) {
            return 0;
        }

        LambdaQueryWrapper<PluginManagementPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PluginManagementPO::getStatus, status);

        return pluginManagementMapper.selectCount(wrapper);
    }
}
