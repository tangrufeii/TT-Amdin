package com.tt.plugin.aichat.model;

import lombok.Data;

@Data
public class AiChatConfigDTO {
    private String provider;
    private String baseUrl;
    private String apiKey;
    private boolean hasApiKey;
    private String model;
    private Double temperature;
    private Integer maxTokens;
    private String systemPrompt;
    private String azureDeployment;
    private String azureApiVersion;
}
