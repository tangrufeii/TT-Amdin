package com.tt.infrastructure.auth.persistence.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tt.infrastructure.auth.persistence.po.UserPO;
import org.apache.ibatis.annotations.Mapper;

/**
 * 用户Mapper接口
 * <p>
 * 使用MyBatis-Plus提供基础CRUD操作
 */
@Mapper
public interface UserMapper extends BaseMapper<UserPO> {
}