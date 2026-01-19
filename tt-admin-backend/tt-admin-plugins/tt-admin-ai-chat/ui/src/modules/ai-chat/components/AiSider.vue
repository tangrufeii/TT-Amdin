<template>
  <div class="ai-sider" :class="{ 'ai-sider-collapsed': collapsed }">
    <div class="ai-sider-header">
      <div v-if="!collapsed" class="ai-brand">
        <span>AI Chat</span>
      </div>
      <n-button
        class="ai-new-session"
        :type="collapsed ? 'default' : 'primary'"
        :circle="collapsed"
        :tertiary="!collapsed"
        @click="$emit('create')"
      >
        <template #icon>
          <n-icon><icon-add /></n-icon>
        </template>
        <span v-if="!collapsed">开启新对话</span>
      </n-button>
    </div>

    <div v-if="!collapsed" class="ai-sider-search">
      <n-input
        v-model:value="searchKeyword"
        placeholder="搜索会话..."
        clearable
        size="small"
        @update:value="$emit('search', $event)"
      >
        <template #prefix>
          <n-icon size="14"><icon-search /></n-icon>
        </template>
      </n-input>
    </div>

    <n-scrollbar class="ai-sessions">
      <n-empty v-if="groupedSessions.length === 0" size="small" :description="searchKeyword ? '未找到匹配会话' : '暂无会话'" />

      <div v-for="group in groupedSessions" :key="group.key" class="ai-session-group">
        <div v-if="!collapsed" class="ai-session-group-title">{{ group.label }}</div>
        <n-list hoverable clickable :show-divider="false">
          <n-list-item
            v-for="item in group.items"
            :key="item.id"
            :class="{ 'ai-session-active': item.id === activeSessionId }"
            @click="$emit('select', item)"
          >
            <template v-if="collapsed">
              <n-tooltip placement="right">
                <template #trigger>
                  <div class="ai-session-icon">
                    <n-icon><icon-chat /></n-icon>
                  </div>
                </template>
                {{ item.title }}
              </n-tooltip>
            </template>
            <template v-else>
              <n-thing>
                <template #header>
                  <n-ellipsis :line-clamp="1" :tooltip="false">{{ item.title }}</n-ellipsis>
                </template>
                <template #description>
                  <n-text depth="3" style="font-size: 12px;">
                    {{ formatTime(item.lastMessageTime || item.createTime) }}
                  </n-text>
                </template>
                <template #header-extra>
                  <n-button text type="error" size="tiny" @click.stop="$emit('delete', item)">
                    <n-icon><icon-delete /></n-icon>
                  </n-button>
                </template>
              </n-thing>
            </template>
          </n-list-item>
        </n-list>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { NButton, NInput, NScrollbar, NList, NListItem, NThing, NIcon, NText, NEmpty, NEllipsis, NTooltip } from 'naive-ui';
import type { ChatSession } from '../api';
import type { SessionGroup } from '../composables/useSessions';

// 简单的图标组件
const IconAdd = { render: () => h('span', { style: 'font-size: 16px;' }, '+') };
const IconSearch = { render: () => h('span', {}, '🔍') };
const IconChat = { render: () => h('span', {}, '💬') };
const IconDelete = { render: () => h('span', {}, '🗑') };

defineProps<{
  groupedSessions: SessionGroup[];
  activeSessionId: number | null;
  collapsed?: boolean;
}>();

defineEmits<{
  (e: 'create'): void;
  (e: 'select', session: ChatSession): void;
  (e: 'delete', session: ChatSession): void;
  (e: 'search', keyword: string): void;
}>();

const searchKeyword = ref('');

function formatTime(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (msgDate.getTime() === today.getTime()) {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  }

  const diffDays = Math.floor((today.getTime() - msgDate.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 1) {
    return '昨天';
  }
  if (diffDays < 7) {
    return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
  }

  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
}
</script>
