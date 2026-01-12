# TT Plugin - AI Chat

This plugin provides a simple AI chat UI with per-user sessions and message storage.

## Build and Package

1. Build plugin package:
   mvn clean package
2. Use the zip under target/ for installation (assembly zip with plugin.yaml at root).

## Features

- Per-user configuration (baseUrl, apiKey, model, temperature, maxTokens, systemPrompt)
- Session isolation and history
- Streaming responses via SSE

## Endpoints

- GET /plugin/ai-chat/config
- PUT /plugin/ai-chat/config
- GET /plugin/ai-chat/sessions
- POST /plugin/ai-chat/sessions
- DELETE /plugin/ai-chat/sessions/{id}
- GET /plugin/ai-chat/messages/{sessionId}
- POST /plugin/ai-chat/message
- POST /plugin/ai-chat/message/stream
