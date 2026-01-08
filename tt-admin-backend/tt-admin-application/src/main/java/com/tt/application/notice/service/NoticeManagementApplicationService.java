package com.tt.application.notice.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.tt.application.notice.command.NoticeCreateCommand;
import com.tt.application.notice.command.NoticeDeleteCommand;
import com.tt.application.notice.command.NoticePageQueryCommand;
import com.tt.application.notice.command.NoticeUpdateCommand;
import com.tt.application.notice.dto.NoticeManageDTO;
import com.tt.application.notice.repository.NoticeManagementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoticeManagementApplicationService {

    private final NoticeManagementRepository noticeManagementRepository;

    public IPage<NoticeManageDTO> page(NoticePageQueryCommand command) {
        return noticeManagementRepository.page(command);
    }

    public NoticeManageDTO get(Long id) {
        return noticeManagementRepository.get(id);
    }

    @Transactional(rollbackFor = Exception.class)
    public void create(NoticeCreateCommand command) {
        LocalDateTime releaseTime = parseReleaseTime(command.getReleaseTime());
        noticeManagementRepository.create(command, releaseTime, LocalDateTime.now());
    }

    @Transactional(rollbackFor = Exception.class)
    public void update(NoticeUpdateCommand command) {
        LocalDateTime releaseTime = parseReleaseTime(command.getReleaseTime());
        noticeManagementRepository.update(command, releaseTime, LocalDateTime.now());
    }

    @Transactional(rollbackFor = Exception.class)
    public void delete(NoticeDeleteCommand command) {
        List<Long> ids = Optional.ofNullable(command.getIds()).orElse(List.of());
        noticeManagementRepository.delete(ids);
    }

    private LocalDateTime parseReleaseTime(Long timestamp) {
        if (timestamp == null) {
            return null;
        }
        return LocalDateTime.ofInstant(Instant.ofEpochMilli(timestamp), ZoneId.systemDefault());
    }
}
