package com.tt.application.notice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Schema(description = "Notice manage dto")
public class NoticeManageDTO {

    private Long id;

    private String category;

    private String title;

    private String content;

    private LocalDateTime releaseTime;

    private String remark;

    private String status;

    private String createUser;

    private LocalDateTime createTime;
}
