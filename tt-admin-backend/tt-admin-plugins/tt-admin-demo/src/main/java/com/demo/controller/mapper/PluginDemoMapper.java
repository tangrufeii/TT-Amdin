package com.demo.controller.mapper;


import cn.hutool.db.PageResult;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.demo.controller.model.PluginDemo;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.stream.Collectors;


/**
* @description 测试
* @author Perfree
*/
@Mapper
public interface PluginDemoMapper extends BaseMapper<PluginDemo> {


}