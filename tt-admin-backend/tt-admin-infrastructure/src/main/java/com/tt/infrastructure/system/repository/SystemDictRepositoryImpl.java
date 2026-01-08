package com.tt.infrastructure.system.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.common.page.PageQuery;
import com.tt.domain.system.dict.model.SystemDict;
import com.tt.domain.system.dict.model.SystemDictItem;
import com.tt.domain.system.dict.repository.SystemDictRepository;
import com.tt.infrastructure.system.persistence.mapper.SysDictItemMapper;
import com.tt.infrastructure.system.persistence.mapper.SysDictMapper;
import com.tt.infrastructure.system.persistence.po.SysDictItemPO;
import com.tt.infrastructure.system.persistence.po.SysDictPO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class SystemDictRepositoryImpl implements SystemDictRepository {

    private final SysDictMapper sysDictMapper;
    private final SysDictItemMapper sysDictItemMapper;

    @Override
    public IPage<SystemDict> findPage(PageQuery pageQuery, String name, String code) {
        LambdaQueryWrapper<SysDictPO> wrapper = new LambdaQueryWrapper<SysDictPO>()
                .like(StringUtils.hasText(name), SysDictPO::getName, name)
                .like(StringUtils.hasText(code), SysDictPO::getCode, code)
                .orderByAsc(SysDictPO::getSort)
                .orderByDesc(SysDictPO::getId);
        IPage<SysDictPO> page = sysDictMapper.selectPage(pageQuery.buildPage(), wrapper);
        return page.convert(this::convertDict);
    }

    @Override
    public List<SystemDict> findList(String name, String code) {
        LambdaQueryWrapper<SysDictPO> wrapper = new LambdaQueryWrapper<SysDictPO>()
                .like(StringUtils.hasText(name), SysDictPO::getName, name)
                .like(StringUtils.hasText(code), SysDictPO::getCode, code)
                .orderByAsc(SysDictPO::getSort)
                .orderByDesc(SysDictPO::getId);
        return sysDictMapper.selectList(wrapper).stream().map(this::convertDict).toList();
    }

    @Override
    public Optional<SystemDict> findById(Long id) {
        return Optional.ofNullable(sysDictMapper.selectById(id)).map(this::convertDict);
    }

    @Override
    public Optional<SystemDict> findByCode(String code) {
        LambdaQueryWrapper<SysDictPO> wrapper = new LambdaQueryWrapper<SysDictPO>()
                .eq(SysDictPO::getCode, code);
        return Optional.ofNullable(sysDictMapper.selectOne(wrapper)).map(this::convertDict);
    }

    @Override
    public boolean existsCode(String code, Long excludeId) {
        LambdaQueryWrapper<SysDictPO> wrapper = new LambdaQueryWrapper<SysDictPO>()
                .eq(SysDictPO::getCode, code)
                .ne(excludeId != null, SysDictPO::getId, excludeId);
        Long count = sysDictMapper.selectCount(wrapper);
        return count != null && count > 0;
    }

    @Override
    public void insert(SystemDict dict) {
        sysDictMapper.insert(convertDictPO(dict));
    }

    @Override
    public void update(SystemDict dict) {
        sysDictMapper.updateById(convertDictPO(dict));
    }

    @Override
    public void deleteByIds(Collection<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return;
        }
        sysDictMapper.deleteBatchIds(ids);
    }

    @Override
    public IPage<SystemDictItem> findItemPage(PageQuery pageQuery,
                                              Long dictId,
                                              String value,
                                              String zhCn,
                                              String enUs,
                                              String description) {
        LambdaQueryWrapper<SysDictItemPO> wrapper = new LambdaQueryWrapper<SysDictItemPO>()
                .eq(dictId != null, SysDictItemPO::getDictId, dictId)
                .like(StringUtils.hasText(value), SysDictItemPO::getValue, value)
                .like(StringUtils.hasText(zhCn), SysDictItemPO::getZhCn, zhCn)
                .like(StringUtils.hasText(enUs), SysDictItemPO::getEnUs, enUs)
                .like(StringUtils.hasText(description), SysDictItemPO::getDescription, description)
                .orderByAsc(SysDictItemPO::getSort)
                .orderByDesc(SysDictItemPO::getId);
        IPage<SysDictItemPO> page = sysDictItemMapper.selectPage(pageQuery.buildPage(), wrapper);
        return page.convert(this::convertDictItem);
    }

    @Override
    public Optional<SystemDictItem> findItemById(Long id) {
        return Optional.ofNullable(sysDictItemMapper.selectById(id)).map(this::convertDictItem);
    }

    @Override
    public boolean existsItemValue(Long dictId, String value, Long excludeId) {
        LambdaQueryWrapper<SysDictItemPO> wrapper = new LambdaQueryWrapper<SysDictItemPO>()
                .eq(dictId != null, SysDictItemPO::getDictId, dictId)
                .eq(SysDictItemPO::getValue, value)
                .ne(excludeId != null, SysDictItemPO::getId, excludeId);
        Long count = sysDictItemMapper.selectCount(wrapper);
        return count != null && count > 0;
    }

    @Override
    public void insertItem(SystemDictItem item) {
        sysDictItemMapper.insert(convertDictItemPO(item));
    }

    @Override
    public void updateItem(SystemDictItem item) {
        sysDictItemMapper.updateById(convertDictItemPO(item));
    }

    @Override
    public void deleteItemsByIds(Collection<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return;
        }
        sysDictItemMapper.deleteBatchIds(ids);
    }

    @Override
    public void deleteItemsByDictIds(Collection<Long> dictIds) {
        if (dictIds == null || dictIds.isEmpty()) {
            return;
        }
        LambdaQueryWrapper<SysDictItemPO> wrapper = new LambdaQueryWrapper<SysDictItemPO>()
                .in(SysDictItemPO::getDictId, dictIds);
        sysDictItemMapper.delete(wrapper);
    }

    private SystemDict convertDict(SysDictPO po) {
        if (po == null) {
            return null;
        }
        return SystemDict.builder()
                .id(po.getId())
                .name(po.getName())
                .code(po.getCode())
                .type(po.getType())
                .sort(po.getSort())
                .description(po.getDescription())
                .status(po.getStatus())
                .remark(po.getRemark())
                .build();
    }

    private SysDictPO convertDictPO(SystemDict dict) {
        SysDictPO po = new SysDictPO();
        po.setId(dict.getId());
        po.setName(dict.getName());
        po.setCode(dict.getCode());
        po.setType(dict.getType());
        po.setSort(dict.getSort());
        po.setDescription(dict.getDescription());
        po.setStatus(dict.getStatus());
        po.setRemark(dict.getRemark());
        return po;
    }

    private SystemDictItem convertDictItem(SysDictItemPO po) {
        if (po == null) {
            return null;
        }
        return SystemDictItem.builder()
                .id(po.getId())
                .dictId(po.getDictId())
                .dictCode(po.getDictCode())
                .value(po.getValue())
                .zhCn(po.getZhCn())
                .enUs(po.getEnUs())
                .type(po.getType())
                .sort(po.getSort())
                .description(po.getDescription())
                .status(po.getStatus())
                .remark(po.getRemark())
                .build();
    }

    private SysDictItemPO convertDictItemPO(SystemDictItem item) {
        SysDictItemPO po = new SysDictItemPO();
        po.setId(item.getId());
        po.setDictId(item.getDictId());
        po.setDictCode(item.getDictCode());
        po.setValue(item.getValue());
        po.setZhCn(item.getZhCn());
        po.setEnUs(item.getEnUs());
        po.setType(item.getType());
        po.setSort(item.getSort());
        po.setDescription(item.getDescription());
        po.setStatus(item.getStatus());
        po.setRemark(item.getRemark());
        return po;
    }
}
