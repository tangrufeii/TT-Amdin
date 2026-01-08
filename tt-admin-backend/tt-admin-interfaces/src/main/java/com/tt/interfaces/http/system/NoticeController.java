package com.tt.interfaces.http.system;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.notice.command.NoticeCreateCommand;
import com.tt.application.notice.command.NoticeDeleteCommand;
import com.tt.application.notice.command.NoticePageQueryCommand;
import com.tt.application.notice.command.NoticeUpdateCommand;
import com.tt.application.notice.dto.NoticeManageDTO;
import com.tt.application.notice.service.NoticeManagementApplicationService;
import com.tt.common.api.Result;
import com.tt.common.page.RPage;
import com.tt.plugin.core.annotation.PermissionResource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/system/notice")
@RequiredArgsConstructor
@Tag(name = "通知公告管理", description = "通知公告管理相关接口")
public class NoticeController {

    private final NoticeManagementApplicationService noticeManagementApplicationService;

    @PostMapping("/page")
    @Operation(summary = "公告分页列表")
    public Result<RPage<NoticeManageDTO>> page(@RequestBody NoticePageQueryCommand command) {
        IPage<NoticeManageDTO> page = noticeManagementApplicationService.page(command);
        return Result.data(RPage.build(page, NoticeManageDTO::new));
    }

    @GetMapping("/{id}")
    @Operation(summary = "公告详情")
    public Result<NoticeManageDTO> detail(@PathVariable Long id) {
        return Result.data(noticeManagementApplicationService.get(id));
    }

    @PostMapping
    @Operation(summary = "新增公告")
    @PermissionResource("sys:notice:add")
    public Result<Boolean> create(@Valid @RequestBody NoticeCreateCommand command) {
        noticeManagementApplicationService.create(command);
        return Result.success();
    }

    @PutMapping
    @Operation(summary = "更新公告")
    @PermissionResource("sys:notice:update")
    public Result<Boolean> update(@Valid @RequestBody NoticeUpdateCommand command) {
        noticeManagementApplicationService.update(command);
        return Result.success();
    }

    @DeleteMapping
    @Operation(summary = "删除公告")
    @PermissionResource("sys:notice:delete")
    public Result<Boolean> delete(@Valid @RequestBody NoticeDeleteCommand command) {
        noticeManagementApplicationService.delete(command);
        return Result.success();
    }
}
