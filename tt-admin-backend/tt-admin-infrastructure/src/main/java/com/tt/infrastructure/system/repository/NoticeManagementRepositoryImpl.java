package com.tt.infrastructure.system.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.tt.application.notice.command.NoticeCreateCommand;
import com.tt.application.notice.command.NoticePageQueryCommand;
import com.tt.application.notice.command.NoticeUpdateCommand;
import com.tt.application.notice.dto.NoticeManageDTO;
import com.tt.application.notice.repository.NoticeManagementRepository;
import com.tt.infrastructure.system.persistence.mapper.SysNoticeMapper;
import com.tt.infrastructure.system.persistence.po.SysNoticePO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class NoticeManagementRepositoryImpl implements NoticeManagementRepository {

    private final SysNoticeMapper sysNoticeMapper;

    @Override
    public IPage<NoticeManageDTO> page(NoticePageQueryCommand command) {
        LambdaQueryWrapper<SysNoticePO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(command.getCategory() != null && !command.getCategory().isBlank(), SysNoticePO::getCategory, command.getCategory());
        wrapper.like(command.getTitle() != null && !command.getTitle().isBlank(), SysNoticePO::getTitle, command.getTitle());
        wrapper.eq(command.getStatus() != null && !command.getStatus().isBlank(), SysNoticePO::getStatus, command.getStatus());
        wrapper.orderByDesc(SysNoticePO::getReleaseTime, SysNoticePO::getCreateTime, SysNoticePO::getId);

        IPage<SysNoticePO> page = sysNoticeMapper.selectPage(command.buildPage(), wrapper);
        return page.convert(this::convert);
    }

    @Override
    public NoticeManageDTO get(Long id) {
        SysNoticePO po = sysNoticeMapper.selectById(id);
        return po == null ? null : convert(po);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void create(NoticeCreateCommand command, LocalDateTime releaseTime, LocalDateTime now) {
        SysNoticePO po = new SysNoticePO();
        po.setId(IdWorker.getId());
        po.setCategory(command.getCategory());
        po.setTitle(command.getTitle());
        po.setContent(command.getContent());
        po.setReleaseTime(releaseTime);
        po.setStatus(Optional.ofNullable(command.getStatus()).orElse("1"));
        po.setRemark(command.getRemark());
        po.setCreateTime(now);
        sysNoticeMapper.insert(po);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(NoticeUpdateCommand command, LocalDateTime releaseTime, LocalDateTime now) {
        SysNoticePO existing = sysNoticeMapper.selectById(command.getId());
        if (existing == null) {
            return;
        }
        existing.setCategory(command.getCategory());
        existing.setTitle(command.getTitle());
        existing.setContent(command.getContent());
        existing.setReleaseTime(releaseTime);
        existing.setStatus(Optional.ofNullable(command.getStatus()).orElse(existing.getStatus()));
        existing.setRemark(command.getRemark());
        existing.setUpdateTime(now);
        sysNoticeMapper.updateById(existing);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return;
        }
        sysNoticeMapper.delete(new LambdaQueryWrapper<SysNoticePO>().in(SysNoticePO::getId, ids));
    }

    private NoticeManageDTO convert(SysNoticePO po) {
        NoticeManageDTO dto = new NoticeManageDTO();
        dto.setId(po.getId());
        dto.setCategory(po.getCategory());
        dto.setTitle(po.getTitle());
        dto.setContent(po.getContent());
        dto.setReleaseTime(po.getReleaseTime());
        dto.setRemark(po.getRemark());
        dto.setStatus(po.getStatus());
        dto.setCreateUser(po.getCreateUser());
        dto.setCreateTime(po.getCreateTime());
        return dto;
    }
}
