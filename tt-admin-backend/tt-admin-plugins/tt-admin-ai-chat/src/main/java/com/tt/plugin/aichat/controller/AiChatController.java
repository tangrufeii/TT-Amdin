package com.tt.plugin.aichat.controller;

import com.tt.common.api.Result;
import com.tt.plugin.aichat.model.AiChatConfigDTO;
import com.tt.plugin.aichat.model.AiChatConfigRequest;
import com.tt.plugin.aichat.model.AiChatMessageDTO;
import com.tt.plugin.aichat.model.AiChatSendRequest;
import com.tt.plugin.aichat.model.AiChatSendResponse;
import com.tt.plugin.aichat.model.AiChatSessionDTO;
import com.tt.plugin.aichat.service.AiChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/plugin/ai-chat")
@Tag(name = "AI Chat Plugin", description = "AI chat endpoints")
@RequiredArgsConstructor
public class AiChatController {

    private final AiChatService aiChatService;

    @GetMapping("/config")
    @Operation(summary = "Get user chat config")
    public Result<AiChatConfigDTO> getConfig() {
        return Result.data(aiChatService.getConfig());
    }

    @PutMapping("/config")
    @Operation(summary = "Save user chat config")
    public Result<Boolean> saveConfig(@Valid @RequestBody AiChatConfigRequest request) {
        aiChatService.saveConfig(request);
        return Result.success();
    }

    @GetMapping("/sessions")
    @Operation(summary = "List chat sessions")
    public Result<List<AiChatSessionDTO>> listSessions() {
        return Result.data(aiChatService.listSessions());
    }

    @PostMapping("/sessions")
    @Operation(summary = "Create chat session")
    public Result<AiChatSessionDTO> createSession(@RequestParam(required = false) String title) {
        return Result.data(aiChatService.createSession(title));
    }

    @DeleteMapping("/sessions/{id}")
    @Operation(summary = "Delete chat session")
    public Result<Boolean> deleteSession(@PathVariable("id") Long id) {
        aiChatService.deleteSession(id);
        return Result.success();
    }

    @GetMapping("/messages/{sessionId}")
    @Operation(summary = "List messages by session")
    public Result<List<AiChatMessageDTO>> listMessages(@PathVariable("sessionId") Long sessionId) {
        return Result.data(aiChatService.listMessages(sessionId));
    }

    @PostMapping("/message")
    @Operation(summary = "Send chat message")
    public Result<AiChatSendResponse> sendMessage( @RequestBody AiChatSendRequest request) {
        return Result.data(aiChatService.sendMessage(request));
    }

    @PostMapping("/message/compat")
    @Operation(summary = "Send chat message (compat for ai-suspended-ball-chat)")
    public Map<String, Object> sendMessageCompat(@RequestBody AiChatSendRequest request) {
        AiChatSendResponse response = aiChatService.sendMessage(request);
        Map<String, Object> payload = new HashMap<>();
        payload.put("code", 0);
        payload.put("content", response.getContent());
        if (response.getSessionId() != null) {
            payload.put("sessionId", response.getSessionId());
        }
        return payload;
    }

    @PostMapping(value = "/message/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @Operation(summary = "Stream chat message")
    public SseEmitter streamMessage(@RequestBody AiChatSendRequest request) {
        try {
            if (request == null || request.getMessage() == null || request.getMessage().trim().isEmpty()) {
                return buildErrorEmitter("message is required");
            }
            return aiChatService.streamMessage(request);
        } catch (Exception ex) {
            String message = ex.getMessage();
            if (message == null || message.isBlank()) {
                message = "stream request failed";
            }
            return buildErrorEmitter(message);
        }
    }

    private SseEmitter buildErrorEmitter(String message) {
        SseEmitter emitter = new SseEmitter(0L);
        String safeMessage = message == null ? "stream request failed" : message;
        CompletableFuture.runAsync(() -> {
            try {
                emitter.send(SseEmitter.event().name("message").data(safeMessage));
                emitter.send(SseEmitter.event().name("done").data("[DONE]"));
            } catch (Exception ex) {
                emitter.completeWithError(ex);
                return;
            }
            emitter.complete();
        });
        return emitter;
    }
}
