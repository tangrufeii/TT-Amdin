package com.tt.infrastructure.extension.persistence.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.common.page.PageQuery;
import com.tt.domain.extension.model.aggregate.ExtensionRecord;
import com.tt.domain.extension.repository.ExtensionRecordRepository;
import com.tt.infrastructure.extension.convert.ExtensionRecordConvert;
import com.tt.infrastructure.extension.persistence.mapper.ExtensionRecordMapper;
import com.tt.infrastructure.extension.persistence.po.ExtensionRecordPO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * 扩展记录仓储实现
 */
@Slf4j
@Repository
@RequiredArgsConstructor
public class ExtensionRecordRepositoryImpl implements ExtensionRecordRepository {

    private final ExtensionRecordMapper extensionRecordMapper;

    @Override
    public void save(ExtensionRecord record) {
        if (record == null) {
            throw new IllegalArgumentException("扩展记录对象不能为空");
        }

        ExtensionRecordPO po = ExtensionRecordConvert.toPO(record);
        if (po == null) {
            throw new IllegalArgumentException("扩展记录转换失败，无法持久化");
        }

        try {
            if (po.getId() == null) {
                po.setCreatedAt(LocalDateTime.now());
                po.setUpdatedAt(LocalDateTime.now());
                extensionRecordMapper.insert(po);
                log.debug("新增扩展记录: dbId={}, extensionId={}", po.getId(), po.getExtensionId());
            } else {
                po.setUpdatedAt(LocalDateTime.now());
                extensionRecordMapper.updateById(po);
                log.debug("更新扩展记录: dbId={}, extensionId={}", po.getId(), po.getExtensionId());
            }
        } catch (RuntimeException ex) {
            if (isSysExtensionMissing(ex)) {
                log.warn("sys_extension table is missing, skip extension record save: extensionId={}", po.getExtensionId());
                return;
            }
            throw ex;
        }
    }

    @Override
    public Optional<ExtensionRecord> findById(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        try {
            return Optional.ofNullable(ExtensionRecordConvert.toDomain(extensionRecordMapper.selectById(id)));
        } catch (RuntimeException ex) {
            if (isSysExtensionMissing(ex)) {
                log.warn("sys_extension table is missing, return empty extension record: id={}", id);
                return Optional.empty();
            }
            throw ex;
        }
    }

    @Override
    public Optional<ExtensionRecord> findByExtensionId(String extensionId) {
        if (extensionId == null || extensionId.isBlank()) {
            return Optional.empty();
        }
        LambdaQueryWrapper<ExtensionRecordPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ExtensionRecordPO::getExtensionId, extensionId);
        try {
            return Optional.ofNullable(ExtensionRecordConvert.toDomain(extensionRecordMapper.selectOne(wrapper)));
        } catch (RuntimeException ex) {
            if (isSysExtensionMissing(ex)) {
                log.warn("sys_extension table is missing, return empty extension record: extensionId={}", extensionId);
                return Optional.empty();
            }
            throw ex;
        }
    }

    @Override
    public boolean existsByExtensionId(String extensionId) {
        if (extensionId == null || extensionId.isBlank()) {
            return false;
        }
        LambdaQueryWrapper<ExtensionRecordPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ExtensionRecordPO::getExtensionId, extensionId);
        try {
            return extensionRecordMapper.selectCount(wrapper) > 0;
        } catch (RuntimeException ex) {
            if (isSysExtensionMissing(ex)) {
                log.warn("sys_extension table is missing, return extension record not exists: extensionId={}", extensionId);
                return false;
            }
            throw ex;
        }
    }

    @Override
    public IPage<ExtensionRecord> findPage(PageQuery pageQuery, String name, Integer status, String type, String excludeType) {
        LambdaQueryWrapper<ExtensionRecordPO> wrapper = new LambdaQueryWrapper<>();
        if (name != null && !name.isBlank()) {
            wrapper.like(ExtensionRecordPO::getName, name);
        }
        if (status != null) {
            wrapper.eq(ExtensionRecordPO::getStatus, status);
        }
        if (type != null && !type.isBlank()) {
            wrapper.eq(ExtensionRecordPO::getType, type);
        }
        if (excludeType != null && !excludeType.isBlank()) {
            wrapper.ne(ExtensionRecordPO::getType, excludeType);
        }
        wrapper.orderByDesc(ExtensionRecordPO::getCreatedAt);

        try {
            IPage<ExtensionRecordPO> poPage = extensionRecordMapper.selectPage(pageQuery.buildPage(), wrapper);
            return poPage.convert(ExtensionRecordConvert::toDomain);
        } catch (RuntimeException ex) {
            if (isSysExtensionMissing(ex)) {
                log.warn("sys_extension table is missing, return empty extension page");
                IPage<ExtensionRecordPO> emptyPage = pageQuery.buildPage();
                return emptyPage.convert(ExtensionRecordConvert::toDomain);
            }
            throw ex;
        }
    }

    @Override
    public List<ExtensionRecord> findAll() {
        LambdaQueryWrapper<ExtensionRecordPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByDesc(ExtensionRecordPO::getCreatedAt);
        try {
            return extensionRecordMapper.selectList(wrapper)
                    .stream()
                    .map(ExtensionRecordConvert::toDomain)
                    .toList();
        } catch (RuntimeException ex) {
            if (isSysExtensionMissing(ex)) {
                log.warn("sys_extension table is missing, return empty extension list");
                return List.of();
            }
            throw ex;
        }
    }

    @Override
    public List<ExtensionRecord> findByStatus(Integer status) {
        if (status == null) {
            return List.of();
        }
        LambdaQueryWrapper<ExtensionRecordPO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ExtensionRecordPO::getStatus, status);
        wrapper.orderByDesc(ExtensionRecordPO::getCreatedAt);
        try {
            return extensionRecordMapper.selectList(wrapper)
                    .stream()
                    .map(ExtensionRecordConvert::toDomain)
                    .toList();
        } catch (RuntimeException ex) {
            if (isSysExtensionMissing(ex)) {
                log.warn("sys_extension table is missing, return empty extension list by status: status={}", status);
                return List.of();
            }
            throw ex;
        }
    }

    @Override
    public void deleteById(Long id) {
        if (id == null) {
            return;
        }
        try {
            extensionRecordMapper.deleteById(id);
        } catch (RuntimeException ex) {
            if (isSysExtensionMissing(ex)) {
                log.warn("sys_extension table is missing, skip extension record delete: id={}", id);
                return;
            }
            throw ex;
        }
    }

    @Override
    public long count() {
        try {
            return extensionRecordMapper.selectCount(null);
        } catch (RuntimeException ex) {
            if (isSysExtensionMissing(ex)) {
                log.warn("sys_extension table is missing, return extension count 0");
                return 0L;
            }
            throw ex;
        }
    }

    private boolean isSysExtensionMissing(Throwable throwable) {
        Throwable current = throwable;
        while (current != null) {
            String message = current.getMessage();
            if (message != null
                    && message.contains("sys_extension")
                    && (message.contains("doesn't exist") || message.contains("does not exist"))) {
                return true;
            }
            current = current.getCause();
        }
        return false;
    }
}
