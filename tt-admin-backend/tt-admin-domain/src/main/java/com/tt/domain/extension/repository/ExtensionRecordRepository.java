package com.tt.domain.extension.repository;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.common.page.PageQuery;
import com.tt.domain.extension.model.aggregate.ExtensionRecord;

import java.util.List;
import java.util.Optional;

/**
 * 扩展记录仓储接口
 * <p>
 * 负责扩展记录聚合根的持久化与查询。
 */
public interface ExtensionRecordRepository {

    /**
     * 保存扩展记录
     *
     * @param record 扩展记录聚合根
     */
    void save(ExtensionRecord record);

    /**
     * 根据主键ID查询扩展记录
     *
     * @param id 数据库主键
     * @return 扩展记录
     */
    Optional<ExtensionRecord> findById(Long id);

    /**
     * 根据扩展业务ID查询扩展记录
     *
     * @param extensionId 扩展ID
     * @return 扩展记录
     */
    Optional<ExtensionRecord> findByExtensionId(String extensionId);

    /**
     * 检查扩展ID是否存在
     *
     * @param extensionId 扩展ID
     * @return 是否存在
     */
    boolean existsByExtensionId(String extensionId);

    /**
     * 分页查询扩展记录
     *
     * @param pageQuery 分页参数
     * @param name      名称（模糊匹配）
     * @param status    状态（可空）
     * @param type      扩展类型（可空）
     * @param excludeType 排除的扩展类型（可空）
     * @return 分页结果
     */
    IPage<ExtensionRecord> findPage(PageQuery pageQuery, String name, Integer status, String type, String excludeType);

    /**
     * 查询所有扩展记录
     *
     * @return 扩展记录列表
     */
    List<ExtensionRecord> findAll();

    /**
     * 根据状态查询扩展记录
     *
     * @param status 状态码
     * @return 扩展记录列表
     */
    List<ExtensionRecord> findByStatus(Integer status);

    /**
     * 删除扩展记录
     *
     * @param id 数据库主键
     */
    void deleteById(Long id);

    /**
     * 统计扩展总数
     *
     * @return 总数
     */
    long count();
}
