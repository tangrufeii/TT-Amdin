package com.tt.plugin.aichat.service;


import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.tt.common.domain.DomainException;
import com.tt.plugin.aichat.model.AiChatConfigDTO;
import com.tt.plugin.aichat.model.AiChatConfigRequest;
import com.tt.plugin.aichat.model.AiChatMessageDTO;
import com.tt.plugin.aichat.model.AiChatSendRequest;
import com.tt.plugin.aichat.model.AiChatSendResponse;
import com.tt.plugin.aichat.model.AiChatSessionDTO;
import com.tt.plugin.aichat.persistence.mapper.AiChatConfigMapper;
import com.tt.plugin.aichat.persistence.mapper.AiChatMessageMapper;
import com.tt.plugin.aichat.persistence.mapper.AiChatSessionMapper;
import com.tt.plugin.aichat.persistence.po.AiChatConfigPO;
import com.tt.plugin.aichat.persistence.po.AiChatMessagePO;
import com.tt.plugin.aichat.persistence.po.AiChatSessionPO;
import com.tt.plugin.aichat.service.AiChatCrypto;
import com.tt.plugin.aichat.service.AiChatSecretProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiChatService {

    private static final String DEFAULT_PROVIDER = "openai";
    private static final String PROVIDER_DEEPSEEK = "deepseek";
    private static final String PROVIDER_AZURE = "azure";
    private static final String ROLE_USER = "user";
    private static final String ROLE_ASSISTANT = "assistant";
    private static final String ROLE_SYSTEM = "system";
    private static final String DEFAULT_MODEL = "gpt-3.5-turbo";
    private static final double DEFAULT_TEMPERATURE = 0.7d;
    private static final String DEFAULT_BASE_URL = "https://api.openai.com";
    private static final int MAX_HISTORY = 20;
    private static final String DEFAULT_TITLE = "New Chat";

    private final AiChatConfigMapper configMapper;
    private final AiChatSessionMapper sessionMapper;
    private final AiChatMessageMapper messageMapper;
    private final AiChatSecretProvider secretProvider;

    public AiChatConfigDTO getConfig() {
        Long userId = currentUserId();
        AiChatConfigPO config = configMapper.selectOne(new LambdaQueryWrapper<AiChatConfigPO>()
                .eq(AiChatConfigPO::getUserId, userId));
        AiChatConfigDTO dto = new AiChatConfigDTO();
        if (config == null) {
            dto.setProvider(DEFAULT_PROVIDER);
            dto.setBaseUrl(DEFAULT_BASE_URL);
            dto.setModel(DEFAULT_MODEL);
            dto.setTemperature(DEFAULT_TEMPERATURE);
            dto.setHasApiKey(false);
            return dto;
        }
        dto.setProvider(resolveProvider(config.getProvider()));
        String baseUrl = defaultIfBlank(config.getBaseUrl(), DEFAULT_BASE_URL);
        dto.setBaseUrl(normalizeProviderBaseUrl(dto.getProvider(), baseUrl));
        dto.setModel(defaultIfBlank(config.getModel(), DEFAULT_MODEL));
        dto.setTemperature(defaultIfNull(config.getTemperature(), DEFAULT_TEMPERATURE));
        dto.setMaxTokens(config.getMaxTokens());
        dto.setSystemPrompt(config.getSystemPrompt());
        dto.setAzureDeployment(config.getAzureDeployment());
        dto.setAzureApiVersion(config.getAzureApiVersion());
        dto.setHasApiKey(hasText(config.getApiKey()));
        return dto;
    }

    public void saveConfig(AiChatConfigRequest request) {
        Long userId = currentUserId();
        AiChatConfigPO config = configMapper.selectOne(new LambdaQueryWrapper<AiChatConfigPO>()
                .eq(AiChatConfigPO::getUserId, userId));
        LocalDateTime now = LocalDateTime.now();
        if (config == null) {
            config = new AiChatConfigPO();
            config.setUserId(userId);
            config.setCreateTime(now);
        }
        config.setProvider(resolveProvider(request.getProvider()));
        String baseUrl = request.getBaseUrl();
        config.setBaseUrl(normalizeProviderBaseUrl(config.getProvider(), baseUrl));
        if (hasText(request.getApiKey())) {
            config.setApiKey(encryptApiKey(request.getApiKey().trim()));
        }
        config.setModel(defaultIfBlank(request.getModel(), DEFAULT_MODEL));
        config.setTemperature(defaultIfNull(request.getTemperature(), DEFAULT_TEMPERATURE));
        config.setMaxTokens(normalizeMaxTokens(config.getProvider(), request.getMaxTokens()));
        config.setSystemPrompt(request.getSystemPrompt());
        config.setAzureDeployment(request.getAzureDeployment());
        config.setAzureApiVersion(request.getAzureApiVersion());
        config.setUpdateTime(now);
        if (config.getId() == null) {
            configMapper.insert(config);
        } else {
            configMapper.updateById(config);
        }
    }

    public List<AiChatSessionDTO> listSessions() {
        Long userId = currentUserId();
        List<AiChatSessionPO> sessions = sessionMapper.selectList(new LambdaQueryWrapper<AiChatSessionPO>()
                .eq(AiChatSessionPO::getUserId, userId)
                .orderByDesc(AiChatSessionPO::getLastMessageTime)
                .orderByDesc(AiChatSessionPO::getCreateTime));
        if (CollectionUtils.isEmpty(sessions)) {
            return List.of();
        }
        return sessions.stream().map(this::toSessionDto).toList();
    }

    public AiChatSessionDTO createSession(String title) {
        Long userId = currentUserId();
        AiChatSessionPO session = new AiChatSessionPO();
        session.setUserId(userId);
        session.setTitle(isBlank(title) ? DEFAULT_TITLE : title.trim());
        session.setCreateTime(LocalDateTime.now());
        session.setUpdateTime(LocalDateTime.now());
        sessionMapper.insert(session);
        return toSessionDto(session);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteSession(Long sessionId) {
        if (sessionId == null) {
            return;
        }
        Long userId = currentUserId();
        AiChatSessionPO session = sessionMapper.selectById(sessionId);
        if (session == null || !Objects.equals(session.getUserId(), userId)) {
            return;
        }
        messageMapper.delete(new LambdaQueryWrapper<AiChatMessagePO>()
                .eq(AiChatMessagePO::getSessionId, sessionId)
                .eq(AiChatMessagePO::getUserId, userId));
        sessionMapper.deleteById(sessionId);
    }

    public List<AiChatMessageDTO> listMessages(Long sessionId) {
        Long userId = currentUserId();
        ensureSessionOwner(sessionId, userId);
        List<AiChatMessagePO> messages = messageMapper.selectList(new LambdaQueryWrapper<AiChatMessagePO>()
                .eq(AiChatMessagePO::getSessionId, sessionId)
                .eq(AiChatMessagePO::getUserId, userId)
                .orderByAsc(AiChatMessagePO::getCreateTime));
        if (CollectionUtils.isEmpty(messages)) {
            return List.of();
        }
        return messages.stream().map(this::toMessageDto).toList();
    }

    @Transactional(rollbackFor = Exception.class)
    public AiChatSendResponse sendMessage(AiChatSendRequest request) {
        AiChatContext context = prepareContext(request);
        String answer = callChat(context);
        saveAssistantMessage(context.sessionId, context.userId, answer, context);
        AiChatSendResponse response = new AiChatSendResponse();
        response.setSessionId(context.sessionId);
        response.setContent(answer);
        return response;
    }

    public Flux<String> streamMessage(AiChatSendRequest request) {
        AiChatContext context = prepareContext(request);
        StringBuilder assistant = new StringBuilder();
        Prompt prompt = buildPrompt(context);
        return ChatClient.create(context.chatModel)
                .prompt(prompt)
                .stream()
                .content()
                .delayElements(Duration.ofMillis(200)) // 控制输出速度，优化打字机效果
                .doOnNext(assistant::append)
                .doOnComplete(() -> CompletableFuture.runAsync(() ->
                        saveAssistantMessage(context.sessionId, context.userId, assistant.toString(), context)))
                .onErrorResume(error -> {
                    log.error("ai chat stream failed", error);
                    logWebClientError(error);
                    return Flux.just("stream failed: " + safeErrorMessage(error));
                });
    }

    private AiChatContext prepareContext(AiChatSendRequest request) {
        Long userId = currentUserId();
        AiChatConfigPO config = loadConfig(userId);
        String trimmedMessage = normalizeMessage(request.getMessage());
        Long sessionId = request.getSessionId();
        if (sessionId == null) {
            sessionId = createSession(titleFromMessage(trimmedMessage)).getId();
        } else {
            ensureSessionOwner(sessionId, userId);
        }
        saveUserMessage(sessionId, userId, trimmedMessage);
        ChatModel chatModel = createChatModel(config);
        return new AiChatContext(userId, sessionId, config, chatModel);
    }

    private String callChat(AiChatContext context) {
        Prompt prompt = buildPrompt(context);
        try {
            ChatResponse response = context.chatModel.call(prompt);
            String content = safeContent(response);
            if (isBlank(content)) {
                throw new DomainException("AI_CHAT", "empty response from model");
            }
            return content;
        } catch (RuntimeException ex) {
            logWebClientError(ex);
            throw ex;
        }
    }

    private Prompt buildPrompt(AiChatContext context) {
        List<Message> messages = new ArrayList<>();
        if (hasText(context.config.getSystemPrompt())) {
            messages.add(new SystemMessage(context.config.getSystemPrompt()));
        }
        List<AiChatMessagePO> history = messageMapper.selectList(new LambdaQueryWrapper<AiChatMessagePO>()
                .eq(AiChatMessagePO::getSessionId, context.sessionId)
                .eq(AiChatMessagePO::getUserId, context.userId)
                .orderByDesc(AiChatMessagePO::getCreateTime)
                .last("limit " + MAX_HISTORY));
        if (!CollectionUtils.isEmpty(history)) {
            history.stream()
                    .sorted(Comparator.comparing(AiChatMessagePO::getCreateTime))
                    .forEach(item -> messages.add(toChatMessage(item)));
        }
        ChatOptions options = buildChatOptions(context.config);
        return new Prompt(messages, options);
    }

    private ChatOptions buildChatOptions(AiChatConfigPO config) {
        Integer maxTokens = normalizeMaxTokens(config.getProvider(), config.getMaxTokens());
        return OpenAiChatOptions.builder()
                .withModel(config.getModel())
                .withTemperature(config.getTemperature())
                .withMaxTokens(maxTokens)
                .build();
    }

    private Message toChatMessage(AiChatMessagePO message) {
        if (ROLE_ASSISTANT.equalsIgnoreCase(message.getRole())) {
            return new AssistantMessage(message.getContent());
        }
        if (ROLE_SYSTEM.equalsIgnoreCase(message.getRole())) {
            return new SystemMessage(message.getContent());
        }
        return new UserMessage(message.getContent());
    }

    private void saveUserMessage(Long sessionId, Long userId, String message) {
        AiChatMessagePO po = new AiChatMessagePO();
        po.setSessionId(sessionId);
        po.setUserId(userId);
        po.setRole(ROLE_USER);
        po.setContent(message);
        po.setCreateTime(LocalDateTime.now());
        messageMapper.insert(po);
        touchSession(sessionId);
    }

    private void saveAssistantMessage(Long sessionId, Long userId, String content, AiChatContext context) {
        if (isBlank(content)) {
            return;
        }
        AiChatMessagePO po = new AiChatMessagePO();
        po.setSessionId(sessionId);
        po.setUserId(userId);
        po.setRole(ROLE_ASSISTANT);
        po.setContent(content);
        po.setCreateTime(LocalDateTime.now());
        messageMapper.insert(po);
        touchSession(sessionId);
        updateTitleAndSummary(sessionId, userId, context);
    }

    private void touchSession(Long sessionId) {
        AiChatSessionPO session = sessionMapper.selectById(sessionId);
        if (session == null) {
            return;
        }
        session.setLastMessageTime(LocalDateTime.now());
        session.setUpdateTime(LocalDateTime.now());
        if (isBlank(session.getTitle())) {
            session.setTitle("Chat");
        }
        sessionMapper.updateById(session);
    }

    private void updateTitleAndSummary(Long sessionId, Long userId, AiChatContext context) {
        AiChatSessionPO session = sessionMapper.selectById(sessionId);
        if (session == null) {
            return;
        }
        boolean needTitle = isDefaultTitle(session.getTitle());
        boolean needSummary = true;
        if (needTitle) {
            String title = generateTitle(sessionId, userId, context);
            if (hasText(title)) {
                session.setTitle(title);
            }
        }
        if (needSummary) {
            String summary = updateSummary(sessionId, userId, session.getSummary(), context);
            if (hasText(summary)) {
                session.setSummary(summary);
            }
        }
        session.setUpdateTime(LocalDateTime.now());
        sessionMapper.updateById(session);
    }

    private String generateTitle(Long sessionId, Long userId, AiChatContext context) {
        List<AiChatMessagePO> latest = messageMapper.selectList(new LambdaQueryWrapper<AiChatMessagePO>()
                .eq(AiChatMessagePO::getSessionId, sessionId)
                .eq(AiChatMessagePO::getUserId, userId)
                .orderByDesc(AiChatMessagePO::getCreateTime)
                .last("limit 4"));
        if (CollectionUtils.isEmpty(latest)) {
            return null;
        }
        latest.sort(Comparator.comparing(AiChatMessagePO::getCreateTime));
        StringBuilder input = new StringBuilder();
        for (AiChatMessagePO item : latest) {
            input.append(item.getRole()).append(": ").append(item.getContent()).append("\n");
        }
        List<Message> messages = new ArrayList<>();
        messages.add(new SystemMessage("Generate a short chat title within 12 words. Output title only."));
        messages.add(new UserMessage(input.toString()));
        Prompt prompt = new Prompt(messages, buildChatOptions(context.config));
        String content = safeContent(context.chatModel.call(prompt));
        if (isBlank(content)) {
            return null;
        }
        String title = content.replaceAll("\n", " ").trim();
        return title.length() > 48 ? title.substring(0, 48) : title;
    }

    private String updateSummary(Long sessionId, Long userId, String currentSummary, AiChatContext context) {
        List<AiChatMessagePO> latest = messageMapper.selectList(new LambdaQueryWrapper<AiChatMessagePO>()
                .eq(AiChatMessagePO::getSessionId, sessionId)
                .eq(AiChatMessagePO::getUserId, userId)
                .orderByDesc(AiChatMessagePO::getCreateTime)
                .last("limit 6"));
        if (CollectionUtils.isEmpty(latest)) {
            return currentSummary;
        }
        latest.sort(Comparator.comparing(AiChatMessagePO::getCreateTime));
        StringBuilder input = new StringBuilder();
        if (hasText(currentSummary)) {
            input.append("Current summary: ").append(currentSummary).append("\n");
        }
        input.append("Recent messages:\n");
        for (AiChatMessagePO item : latest) {
            input.append(item.getRole()).append(": ").append(item.getContent()).append("\n");
        }
        List<Message> messages = new ArrayList<>();
        messages.add(new SystemMessage("Summarize the conversation in <= 200 chars. Output summary only."));
        messages.add(new UserMessage(input.toString()));
        Prompt prompt = new Prompt(messages, buildChatOptions(context.config));
        String content = safeContent(context.chatModel.call(prompt));
        if (isBlank(content)) {
            return currentSummary;
        }
        return content.replaceAll("\n", " ").trim();
    }

    private void ensureSessionOwner(Long sessionId, Long userId) {
        AiChatSessionPO session = sessionMapper.selectById(sessionId);
        if (session == null || !Objects.equals(session.getUserId(), userId)) {
            throw new DomainException("AI_CHAT", "session not found");
        }
    }

    private AiChatConfigPO loadConfig(Long userId) {
        AiChatConfigPO config = configMapper.selectOne(new LambdaQueryWrapper<AiChatConfigPO>()
                .eq(AiChatConfigPO::getUserId, userId));
        if (config == null || isBlank(config.getApiKey())) {
            throw new DomainException("AI_CHAT", "api key is required");
        }
        config.setProvider(resolveProvider(config.getProvider()));
        config.setBaseUrl(normalizeProviderBaseUrl(config.getProvider(), defaultIfBlank(config.getBaseUrl(), DEFAULT_BASE_URL)));
        config.setModel(defaultIfBlank(config.getModel(), DEFAULT_MODEL));
        config.setTemperature(defaultIfNull(config.getTemperature(), DEFAULT_TEMPERATURE));
        String decrypted = decryptApiKey(config.getApiKey());
        config.setApiKey(decrypted);
        return config;
    }

    private ChatModel createChatModel(AiChatConfigPO config) {
        if (PROVIDER_AZURE.equalsIgnoreCase(config.getProvider())) {
            throw new DomainException("AI_CHAT", "azure provider is not supported");
        }
        OpenAiApi api = new OpenAiApi(config.getBaseUrl(), config.getApiKey());
        return new OpenAiChatModel(api);
    }

    private Long currentUserId() {
        return StpUtil.getLoginIdAsLong();
    }

    private String titleFromMessage(String message) {
        if (isBlank(message)) {
            return DEFAULT_TITLE;
        }
        String trimmed = message.trim();
        return trimmed.length() > 24 ? trimmed.substring(0, 24) + "..." : trimmed;
    }

    private String safeContent(ChatResponse response) {
        if (response == null || response.getResult() == null || response.getResult().getOutput() == null) {
            return "";
        }
        return Optional.ofNullable(response.getResult().getOutput().getContent()).orElse("");
    }

    private AiChatSessionDTO toSessionDto(AiChatSessionPO session) {
        AiChatSessionDTO dto = new AiChatSessionDTO();
        dto.setId(session.getId());
        dto.setTitle(session.getTitle());
        dto.setSummary(session.getSummary());
        dto.setLastMessageTime(session.getLastMessageTime());
        dto.setCreateTime(session.getCreateTime());
        return dto;
    }

    private AiChatMessageDTO toMessageDto(AiChatMessagePO message) {
        AiChatMessageDTO dto = new AiChatMessageDTO();
        dto.setId(message.getId());
        dto.setSessionId(message.getSessionId());
        dto.setRole(message.getRole());
        dto.setContent(message.getContent());
        dto.setCreateTime(message.getCreateTime());
        return dto;
    }

    private String encryptApiKey(String apiKey) {
        String secret = secretProvider.getSecret();
        if (!hasText(secret)) {
            throw new DomainException("AI_CHAT", "tt.ai.secret is required for encryption");
        }
        return AiChatCrypto.encrypt(secret, apiKey);
    }

    private String decryptApiKey(String encrypted) {
        if (!hasText(encrypted)) {
            return encrypted;
        }
        if (!encrypted.startsWith("enc:v1:")) {
            return encrypted;
        }
        String secret = secretProvider.getSecret();
        if (!hasText(secret)) {
            throw new DomainException("AI_CHAT", "tt.ai.secret is required for decryption");
        }
        return AiChatCrypto.decrypt(secret, encrypted);
    }

    private boolean isDefaultTitle(String title) {
        if (isBlank(title)) {
            return true;
        }
        String lower = title.toLowerCase();
        return "new chat".equals(lower) || "chat".equals(lower);
    }

    private String resolveProvider(String provider) {
        if (isBlank(provider)) {
            return DEFAULT_PROVIDER;
        }
        String normalized = provider.trim().toLowerCase();
        if (PROVIDER_AZURE.equals(normalized)) {
            return PROVIDER_AZURE;
        }
        if (PROVIDER_DEEPSEEK.equals(normalized)) {
            return PROVIDER_DEEPSEEK;
        }
        return DEFAULT_PROVIDER;
    }

    private String normalizeProviderBaseUrl(String provider, String baseUrl) {
        if (isBlank(baseUrl)) {
            return baseUrl;
        }
        String normalized = baseUrl.trim();
        while (normalized.endsWith("/")) {
            normalized = normalized.substring(0, normalized.length() - 1);
        }
        if (!PROVIDER_AZURE.equalsIgnoreCase(provider) && normalized.endsWith("/v1")) {
            normalized = normalized.substring(0, normalized.length() - 3);
        }
        return normalized;
    }

    private String defaultIfBlank(String value, String fallback) {
        return isBlank(value) ? fallback : value;
    }

    private Double defaultIfNull(Double value, Double fallback) {
        return value == null ? fallback : value;
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }

    private String normalizeMessage(String message) {
        if (isBlank(message)) {
            throw new DomainException("AI_CHAT", "message is required");
        }
        return message.trim();
    }

    private Integer normalizeMaxTokens(String provider, Integer maxTokens) {
        if (maxTokens == null) {
            return null;
        }
        int value = maxTokens;
        if (value <= 0) {
            return null;
        }
        if (PROVIDER_DEEPSEEK.equalsIgnoreCase(provider) && value > 8192) {
            log.warn("max_tokens too large for deepseek, clamped to 8192: {}", value);
            return 8192;
        }
        return value;
    }

    private void logWebClientError(Throwable error) {
        WebClientResponseException responseException = null;
        if (error instanceof WebClientResponseException webEx) {
            responseException = webEx;
        } else if (error.getCause() instanceof WebClientResponseException webEx) {
            responseException = webEx;
        }
        if (responseException == null) {
            return;
        }
        String body = responseException.getResponseBodyAsString();
        log.error("ai chat http error: status={}, responseBody={}", responseException.getStatusCode(), body);
    }

    private String safeErrorMessage(Throwable error) {
        if (error == null || error.getMessage() == null || error.getMessage().isBlank()) {
            return "unknown error";
        }
        return error.getMessage();
    }

    private record AiChatContext(Long userId, Long sessionId, AiChatConfigPO config, ChatModel chatModel) {
    }
}

