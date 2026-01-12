package com.tt.plugin.test.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.tt.plugin.test.mapper.TestMapper;
import com.tt.plugin.test.model.Test;
import com.tt.plugin.test.model.TestPageQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class TestService extends ServiceImpl<TestMapper, Test> {

    public LambdaQueryWrapper<Test> buildWrapper(TestPageQuery query) {
        LambdaQueryWrapper<Test> wrapper = new LambdaQueryWrapper<>();
        if (StringUtils.hasText(query.getName())) {
            wrapper.like(Test::getName, query.getName());
        }

        if (StringUtils.hasText(query.getSex())) {
            wrapper.like(Test::getSex, query.getSex());
        }

        wrapper.orderByDesc(Test::getId);
        return wrapper;
    }
}
