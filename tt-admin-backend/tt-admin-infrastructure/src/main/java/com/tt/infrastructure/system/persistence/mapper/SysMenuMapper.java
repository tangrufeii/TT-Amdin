package com.tt.infrastructure.system.persistence.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.tt.infrastructure.system.persistence.po.SysMenuPO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SysMenuMapper extends BaseMapper<SysMenuPO> {
}
