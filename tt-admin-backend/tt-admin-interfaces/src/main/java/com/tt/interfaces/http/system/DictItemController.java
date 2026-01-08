package com.tt.interfaces.http.system;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.dict.command.DictItemCreateCommand;
import com.tt.application.dict.command.DictItemDeleteCommand;
import com.tt.application.dict.command.DictItemPageQueryCommand;
import com.tt.application.dict.command.DictItemUpdateCommand;
import com.tt.application.dict.dto.DictItemManageDTO;
import com.tt.application.dict.service.DictManagementApplicationService;
import com.tt.common.api.Result;
import com.tt.common.page.RPage;
import com.tt.plugin.core.annotation.PermissionResource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "字典项管理", description = "字典项管理相关接口")
@RequestMapping("/system/dict/item")
@RequiredArgsConstructor
public class DictItemController {

    private final DictManagementApplicationService dictManagementApplicationService;

    @PostMapping("/page")
    @Operation(summary = "字典项分页列表")
    @PermissionResource("sys:dict:item:page")
    public Result<RPage<DictItemManageDTO>> page(@RequestBody DictItemPageQueryCommand command) {
        IPage<DictItemManageDTO> page = dictManagementApplicationService.itemPage(command);
        return Result.data(RPage.build(page, DictItemManageDTO::new));
    }

    @GetMapping("/{id}")
    @Operation(summary = "字典项详情")
    public Result<DictItemManageDTO> detail(@PathVariable Long id) {
        return Result.data(dictManagementApplicationService.getItem(id));
    }

    @PostMapping
    @Operation(summary = "新增字典项")
    @PermissionResource("sys:dict:item:add")
    public Result<Boolean> create(@RequestBody DictItemCreateCommand command) {
        dictManagementApplicationService.createItem(command);
        return Result.success();
    }

    @PutMapping
    @Operation(summary = "更新字典项")
    @PermissionResource("sys:dict:item:update")
    public Result<Boolean> update(@RequestBody DictItemUpdateCommand command) {
        dictManagementApplicationService.updateItem(command);
        return Result.success();
    }

    @DeleteMapping
    @Operation(summary = "删除字典项")
    @PermissionResource("sys:dict:item:delete")
    public Result<Boolean> delete(@RequestBody DictItemDeleteCommand command) {
        dictManagementApplicationService.deleteItems(command);
        return Result.success();
    }
}
