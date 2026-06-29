package com.tt.infrastructure.extension.persistence.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tt.infrastructure.extension.persistence.po.ExtensionRecordPO;
import org.apache.ibatis.annotations.Mapper;

/**
 * 扩展记录 Mapper
 */
@Mapper
public interface ExtensionRecordMapper extends BaseMapper<ExtensionRecordPO> {
}
