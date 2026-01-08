package com.tt.interfaces.http.system;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.dict.command.DictCreateCommand;
import com.tt.application.dict.command.DictDeleteCommand;
import com.tt.application.dict.command.DictPageQueryCommand;
import com.tt.application.dict.command.DictUpdateCommand;
import com.tt.application.dict.dto.DictManageDTO;
import com.tt.application.dict.dto.DictTreeDTO;
import com.tt.application.dict.service.DictManagementApplicationService;
import com.tt.common.api.Result;
import com.tt.common.page.RPage;
import com.tt.plugin.core.annotation.PermissionResource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "字典管理", description = "字典管理相关接口")
@RequestMapping("/system/dict")
@RequiredArgsConstructor
public class DictController {

    private final DictManagementApplicationService dictManagementApplicationService;

    @PostMapping("/page")
    @Operation(summary = "字典分页列表")
    @PermissionResource("sys:dict:list")
    public Result<RPage<DictManageDTO>> page(@RequestBody DictPageQueryCommand command) {
        IPage<DictManageDTO> page = dictManagementApplicationService.page(command);
        return Result.data(RPage.build(page, DictManageDTO::new));
    }

    @GetMapping("/list")
    @Operation(summary = "字典树列表")
    @PermissionResource("sys:dict:list")
    public Result<List<DictTreeDTO>> list(DictPageQueryCommand command) {
        return Result.data(dictManagementApplicationService.list(command));
    }

    @GetMapping("/{id}")
    @Operation(summary = "字典详情")
    public Result<DictManageDTO> detail(@PathVariable Long id) {
        return Result.data(dictManagementApplicationService.get(id));
    }

    @PostMapping
    @Operation(summary = "新增字典")
    @PermissionResource("sys:dict:add")
    public Result<Boolean> create(@RequestBody DictCreateCommand command) {
        dictManagementApplicationService.create(command);
        return Result.success();
    }

    @PutMapping
    @Operation(summary = "更新字典")
    @PermissionResource("sys:dict:update")
    public Result<Boolean> update(@RequestBody DictUpdateCommand command) {
        dictManagementApplicationService.update(command);
        return Result.success();
    }

    @DeleteMapping
    @Operation(summary = "删除字典")
    @PermissionResource("sys:dict:delete")
    public Result<Boolean> delete(@RequestBody DictDeleteCommand command) {
        dictManagementApplicationService.delete(command);
        return Result.success();
    }
}
