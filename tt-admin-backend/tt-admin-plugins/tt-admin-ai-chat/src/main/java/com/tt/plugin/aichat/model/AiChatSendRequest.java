package com.tt.plugin.aichat.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiChatSendRequest {
    private Long sessionId;
    @NotBlank(message = "message is required")
    private String message;
    /** 深度思考模式 */
    private Boolean deepThink;
    /** 联网搜索 */
    private Boolean webSearch;
}
