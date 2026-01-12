package com.tt.plugin.aichat.model;

import lombok.Data;

@Data
public class AiChatSendResponse {
    private Long sessionId;
    private String content;
}
