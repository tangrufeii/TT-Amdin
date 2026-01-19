<template>
  <div class="ai-input">
    <div class="ai-input-panel">
      <n-input
        ref="inputRef"
        v-model:value="inputValue"
        type="textarea"
        :placeholder="placeholder"
        :autosize="{ minRows: minRows, maxRows: maxRows }"
        @keydown.enter.exact.prevent="handleEnter"
        @keydown.shift.enter.stop
      />
      <div class="ai-input-actions">
        <div class="ai-input-tools">
          <button
            class="ai-tool-btn"
            :class="{ active: deepThink }"
            @click="toggleDeepThink"
          >
            <span class="ai-tool-icon">💡</span>
            <span>深度思考</span>
          </button>
          <button
            class="ai-tool-btn"
            :class="{ active: webSearch }"
            @click="toggleWebSearch"
          >
            <span class="ai-tool-icon">🌐</span>
            <span>联网搜索</span>
          </button>
        </div>
        <div class="ai-input-right">
          <button
            v-if="sending"
            class="ai-stop-btn"
            @click="$emit('stop')"
          >
            <span>■</span>
            <span>停止生成</span>
          </button>
          <n-button
            v-else
            class="ai-send-btn"
            type="primary"
            circle
            :disabled="!canSend"
            @click="handleSend"
          >
            ↑
          </n-button>
        </div>
      </div>
    </div>
    <div v-if="showHint" class="ai-input-hint">
      按 <kbd>Enter</kbd> 发送，<kbd>Shift + Enter</kbd> 换行
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { NInput, NButton } from 'naive-ui';

const props = withDefaults(defineProps<{
  modelValue?: string;
  placeholder?: string;
  sending?: boolean;
  showHint?: boolean;
  minRows?: number;
  maxRows?: number;
  defaultDeepThink?: boolean;
  defaultWebSearch?: boolean;
}>(), {
  modelValue: '',
  placeholder: '给 AI 发送消息',
  sending: false,
  showHint: false,
  minRows: 2,
  maxRows: 6,
  defaultDeepThink: false,
  defaultWebSearch: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'send', payload: { message: string; deepThink: boolean; webSearch: boolean }): void;
  (e: 'stop'): void;
}>();

const inputRef = ref<any>(null);
const inputValue = ref(props.modelValue);
const deepThink = ref(props.defaultDeepThink);
const webSearch = ref(props.defaultWebSearch);

const canSend = computed(() => {
  return inputValue.value.trim().length > 0 && !props.sending;
});

watch(() => props.modelValue, (val) => {
  inputValue.value = val;
});

watch(inputValue, (val) => {
  emit('update:modelValue', val);
});

function toggleDeepThink() {
  deepThink.value = !deepThink.value;
}

function toggleWebSearch() {
  webSearch.value = !webSearch.value;
}

function handleEnter() {
  if (props.sending) return;
  handleSend();
}

function handleSend() {
  const message = inputValue.value.trim();
  if (!message) return;

  emit('send', {
    message,
    deepThink: deepThink.value,
    webSearch: webSearch.value
  });

  inputValue.value = '';
}

function focus() {
  inputRef.value?.focus();
}

defineExpose({
  focus
});
</script>
