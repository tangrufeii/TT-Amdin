package com.tt.infrastructure.system.persistence.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tt.infrastructure.system.persistence.po.SysRolePO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SysRoleMapper extends BaseMapper<SysRolePO> {
}
