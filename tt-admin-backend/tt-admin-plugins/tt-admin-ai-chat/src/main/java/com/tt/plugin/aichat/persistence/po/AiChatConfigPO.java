package com.tt.plugin.aichat.persistence.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("ai_chat_config")
public class AiChatConfigPO {

    @TableId(type = IdType.ASSIGN_ID)
    private Long id;
    private Long userId;
    private String provider;
    private String apiKey;
    private String baseUrl;
    private String model;
    private Double temperature;
    private Integer maxTokens;
    private String systemPrompt;
    private String azureDeployment;
    private String azureApiVersion;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
