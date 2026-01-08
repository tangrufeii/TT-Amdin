package com.tt.application.notice.repository;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.notice.command.NoticeCreateCommand;
import com.tt.application.notice.command.NoticePageQueryCommand;
import com.tt.application.notice.command.NoticeUpdateCommand;
import com.tt.application.notice.dto.NoticeManageDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface NoticeManagementRepository {

    IPage<NoticeManageDTO> page(NoticePageQueryCommand command);

    NoticeManageDTO get(Long id);

    void create(NoticeCreateCommand command, LocalDateTime releaseTime, LocalDateTime now);

    void update(NoticeUpdateCommand command, LocalDateTime releaseTime, LocalDateTime now);

    void delete(List<Long> ids);
}
