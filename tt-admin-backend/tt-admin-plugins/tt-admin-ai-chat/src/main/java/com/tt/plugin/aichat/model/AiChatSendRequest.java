package com.tt.plugin.aichat.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiChatSendRequest {
    private Long sessionId;
    @NotBlank(message = "message is required")
    private String message;
}
