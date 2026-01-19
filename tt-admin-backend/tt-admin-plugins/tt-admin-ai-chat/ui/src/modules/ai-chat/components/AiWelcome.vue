<template>
  <div class="ai-empty">
    <div class="ai-empty-title">
      <span class="ai-empty-logo">✦</span>
      今天有什么可以帮到你？
    </div>

    <div class="ai-suggestions">
      <div
        v-for="(suggestion, index) in suggestions"
        :key="index"
        class="ai-suggestion-card"
        @click="$emit('select', suggestion.prompt)"
      >
        <div class="ai-suggestion-icon">{{ suggestion.icon }}</div>
        <div class="ai-suggestion-title">{{ suggestion.title }}</div>
        <div class="ai-suggestion-desc">{{ suggestion.desc }}</div>
      </div>
    </div>

    <div class="ai-features">
      <div class="ai-feature-item">
        <span class="ai-feature-icon">💡</span>
        <span>深度思考模式</span>
      </div>
      <div class="ai-feature-item">
        <span class="ai-feature-icon">🌐</span>
        <span>联网搜索</span>
      </div>
      <div class="ai-feature-item">
        <span class="ai-feature-icon">📝</span>
        <span>多轮对话记忆</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Suggestion {
  icon: string;
  title: string;
  desc: string;
  prompt: string;
}

defineProps<{
  suggestions?: Suggestion[];
}>();

defineEmits<{
  (e: 'select', prompt: string): void;
}>();

const defaultSuggestions: Suggestion[] = [
  {
    icon: '💻',
    title: '代码助手',
    desc: '帮助你编写、审查和优化代码',
    prompt: '帮我写一个函数'
  },
  {
    icon: '📚',
    title: '知识问答',
    desc: '解答各领域的问题和概念',
    prompt: '解释一下什么是'
  },
  {
    icon: '✍️',
    title: '写作助手',
    desc: '帮助撰写文章、邮件和文案',
    prompt: '帮我写一篇关于'
  },
  {
    icon: '🔍',
    title: '分析总结',
    desc: '分析数据、总结文档内容',
    prompt: '帮我分析一下'
  }
];

// 如果没有传入 suggestions，使用默认值
const suggestions = defaultSuggestions;
</script>
