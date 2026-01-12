package com.tt.plugin.aichat.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AiChatConfigRequest {

    @NotBlank(message = "provider is required")
    private String provider;
    @NotBlank(message = "baseUrl is required")
    private String baseUrl;
    private String apiKey;
    private String model;
    private Double temperature;
    private Integer maxTokens;
    private String systemPrompt;
    private String azureDeployment;
    private String azureApiVersion;
}
