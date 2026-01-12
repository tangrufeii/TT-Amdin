package com.tt.plugin.aichat.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AiChatSessionDTO {
    private Long id;
    private String title;
    private String summary;
    private LocalDateTime lastMessageTime;
    private LocalDateTime createTime;
}
