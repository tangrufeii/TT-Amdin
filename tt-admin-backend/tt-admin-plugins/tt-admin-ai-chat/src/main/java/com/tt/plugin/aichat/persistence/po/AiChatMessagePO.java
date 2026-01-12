package com.tt.plugin.aichat.persistence.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("ai_chat_message")
public class AiChatMessagePO {

    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
    private Long sessionId;
    private Long userId;
    private String role;
    private String content;
    private LocalDateTime createTime;
}
