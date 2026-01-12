package com.tt.plugin.aichat.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AiChatMessageDTO {
    private Long id;
    private Long sessionId;
    private String role;
    private String content;
    private LocalDateTime createTime;
}
