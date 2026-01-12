package com.tt.plugin.test.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.common.api.Result;
import com.tt.common.page.RPage;
import com.tt.plugin.test.model.Test;
import com.tt.plugin.test.model.TestPageQuery;
import com.tt.plugin.test.service.TestService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * test 控制器
 */
@RestController
@RequestMapping("/plugin/test")
@Tag(name = "test管理")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    @PostMapping("/page")
    @Operation(summary = "test分页查询")
    public Result<RPage<Test>> page(@RequestBody TestPageQuery query) {
        IPage<Test> page = testService.page(query.buildPage(), testService.buildWrapper(query));
        return Result.data(RPage.build(page));
    }

    @GetMapping("/{id}")
    @Operation(summary = "test详情")
    public Result<Test> getById(@PathVariable Integer id) {
        return Result.data(testService.getById(id));
    }

    @PostMapping
    @Operation(summary = "test新增")
    public Result<Test> create(@RequestBody Test entity) {
        testService.save(entity);
        return Result.data(entity);
    }

    @PutMapping
    @Operation(summary = "test更新")
    public Result<Test> update(@RequestBody Test entity) {
        testService.updateById(entity);
        return Result.data(entity);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "test删除")
    public Result<Void> delete(@PathVariable Integer id) {
        testService.removeById(id);
        return Result.success();
    }
}
