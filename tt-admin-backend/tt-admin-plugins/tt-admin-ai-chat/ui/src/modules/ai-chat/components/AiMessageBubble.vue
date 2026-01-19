<template>
  <div class="ai-message-row" :class="`ai-message-row--${message.role}`">
    <div class="ai-message-avatar">
      {{ message.role === 'user' ? '你' : 'AI' }}
    </div>
    <div class="ai-message-bubble">
      <AiMessageToolbar
        v-if="message.role === 'assistant' && showToolbar"
        :message="message"
        @copy="$emit('copy', message)"
        @regenerate="$emit('regenerate', message)"
        @like="$emit('like', message)"
        @dislike="$emit('dislike', message)"
      />
      <div class="ai-message-content">
        <!-- 思考过程块 -->
        <div v-if="thinkingContent" class="ai-thinking-block">
          <div class="ai-thinking-header" @click="thinkingExpanded = !thinkingExpanded">
            <span class="ai-thinking-icon">💭</span>
            <span>深度思考</span>
            <span>{{ thinkingExpanded ? '▼' : '▶' }}</span>
          </div>
          <div v-if="thinkingExpanded" class="ai-thinking-content">
            {{ thinkingContent }}
          </div>
        </div>

        <!-- 搜索结果块 -->
        <div v-if="searchResults.length > 0" class="ai-search-results">
          <div class="ai-search-header">
            <span>🔍</span>
            <span>搜索结果</span>
          </div>
          <div v-for="(result, index) in searchResults" :key="index" class="ai-search-item">
            <a :href="result.url" target="_blank">{{ result.title }}</a>
          </div>
        </div>

        <!-- 消息内容 -->
        <div v-if="isPlainText" class="ai-message-plain">
          {{ displayContent }}
        </div>
        <MdPreview
          v-else
          class="ai-message-markdown"
          :editor-id="`ai-${message.localId}`"
          :model-value="displayContent"
        />
        <span v-if="isTyping" class="ai-typing-cursor"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import type { ChatMessage } from '../api';
import AiMessageToolbar from './AiMessageToolbar.vue';

interface SearchResult {
  title: string;
  url: string;
}

const props = defineProps<{
  message: ChatMessage;
  isTyping?: boolean;
  isPlainText?: boolean;
  thinkingContent?: string;
  searchResults?: SearchResult[];
}>();

defineEmits<{
  (e: 'copy', message: ChatMessage): void;
  (e: 'regenerate', message: ChatMessage): void;
  (e: 'like', message: ChatMessage): void;
  (e: 'dislike', message: ChatMessage): void;
}>();

const thinkingExpanded = ref(false);

const displayContent = computed(() => {
  return props.message.displayContent ?? props.message.content;
});

const showToolbar = computed(() => {
  return !!displayContent.value && !props.isTyping;
});

const searchResults = computed(() => props.searchResults || []);
</script>
