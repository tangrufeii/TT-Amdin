<template>
  <div class="ai-message-toolbar">
    <n-button text size="tiny" @click="handleCopy">
      <template #icon>
        <span>📋</span>
      </template>
      {{ copied ? '已复制' : '复制' }}
    </n-button>
    <n-button text size="tiny" @click="$emit('regenerate', message)">
      <template #icon>
        <span>🔄</span>
      </template>
      重新生成
    </n-button>
    <n-button text size="tiny" :type="liked ? 'primary' : 'default'" @click="handleLike">
      <template #icon>
        <span>{{ liked ? '👍' : '👍' }}</span>
      </template>
    </n-button>
    <n-button text size="tiny" :type="disliked ? 'error' : 'default'" @click="handleDislike">
      <template #icon>
        <span>{{ disliked ? '👎' : '👎' }}</span>
      </template>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import type { ChatMessage } from '../api';

const props = defineProps<{
  message: ChatMessage;
}>();

const emit = defineEmits<{
  (e: 'copy', message: ChatMessage): void;
  (e: 'regenerate', message: ChatMessage): void;
  (e: 'like', message: ChatMessage): void;
  (e: 'dislike', message: ChatMessage): void;
}>();

const copied = ref(false);
const liked = ref(false);
const disliked = ref(false);

function handleCopy() {
  const text = props.message.content || props.message.displayContent || '';
  copyToClipboard(text);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
  emit('copy', props.message);
}

function handleLike() {
  liked.value = !liked.value;
  if (liked.value) {
    disliked.value = false;
  }
  emit('like', props.message);
}

function handleDislike() {
  disliked.value = !disliked.value;
  if (disliked.value) {
    liked.value = false;
  }
  emit('dislike', props.message);
}

function copyToClipboard(text: string) {
  if (!text) return;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}
</script>
