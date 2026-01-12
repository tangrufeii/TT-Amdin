package com.tt.plugin.test.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tt.plugin.test.model.Test;
import org.apache.ibatis.annotations.Mapper;

/**
 * test Mapper
 */
@Mapper
public interface TestMapper extends BaseMapper<Test> {
}
