package com.tt.domain.system.dict.repository;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.common.page.PageQuery;
import com.tt.domain.system.dict.model.SystemDict;
import com.tt.domain.system.dict.model.SystemDictItem;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/**
 * 系统字典仓储
 */
public interface SystemDictRepository {

    IPage<SystemDict> findPage(PageQuery pageQuery, String name, String code);

    List<SystemDict> findList(String name, String code);

    Optional<SystemDict> findById(Long id);

    Optional<SystemDict> findByCode(String code);

    boolean existsCode(String code, Long excludeId);

    void insert(SystemDict dict);

    void update(SystemDict dict);

    void deleteByIds(Collection<Long> ids);

    IPage<SystemDictItem> findItemPage(PageQuery pageQuery,
                                       Long dictId,
                                       String value,
                                       String zhCn,
                                       String enUs,
                                       String description);

    Optional<SystemDictItem> findItemById(Long id);

    boolean existsItemValue(Long dictId, String value, Long excludeId);

    void insertItem(SystemDictItem item);

    void updateItem(SystemDictItem item);

    void deleteItemsByIds(Collection<Long> ids);

    void deleteItemsByDictIds(Collection<Long> dictIds);
}
