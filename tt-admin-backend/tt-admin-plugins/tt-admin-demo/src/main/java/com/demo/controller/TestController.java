package com.demo.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.demo.controller.mapper.PluginDemoMapper;
import com.demo.controller.model.PluginDemo;
import com.tt.common.api.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/demo")
public class TestController {
    @Autowired
    private PluginDemoMapper pluginDemoMapper;
    @GetMapping("/test")
    public Result test() {
        return Result.success("插件测试成功");
    }

    @GetMapping("/page")
    public Result page() {
        Page<PluginDemo> objectPage = new Page<>(1, 10);
        Page<PluginDemo> pluginDemoPage = pluginDemoMapper.selectPage(objectPage, new QueryWrapper<PluginDemo>());
        return  Result.data(pluginDemoPage);
    }
}
