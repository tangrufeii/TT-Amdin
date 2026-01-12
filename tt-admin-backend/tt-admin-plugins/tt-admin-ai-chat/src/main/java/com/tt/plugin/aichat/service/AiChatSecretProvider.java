package com.tt.plugin.aichat.service;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class AiChatSecretProvider {

    private final Environment environment;

    public AiChatSecretProvider(Environment environment) {
        this.environment = environment;
    }

    public String getSecret() {
        String envSecret = System.getenv("TT_AI_SECRET");
        if (StringUtils.hasText(envSecret)) {
            return envSecret.trim();
        }
        String propSecret = environment.getProperty("tt.ai.secret");
        if (StringUtils.hasText(propSecret)) {
            return propSecret.trim();
        }
        return null;
    }
}
