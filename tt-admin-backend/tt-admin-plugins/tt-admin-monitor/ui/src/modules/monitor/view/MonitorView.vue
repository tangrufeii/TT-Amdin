<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <PluginFormCard :title="t('plugin.monitor.config')" :model="config" :label-width="140">
      <n-grid cols="4" x-gap="16" y-gap="8" responsive="screen">
        <n-form-item-gi :label="t('plugin.monitor.threshold') + ' CPU'">
          <n-input-number v-model:value="config.cpuThreshold" :min="1" :max="100" />
        </n-form-item-gi>
        <n-form-item-gi :label="t('plugin.monitor.threshold') + ' Memory'">
          <n-input-number v-model:value="config.memoryThreshold" :min="1" :max="100" />
        </n-form-item-gi>
        <n-form-item-gi :label="t('plugin.monitor.threshold') + ' Disk'">
          <n-input-number v-model:value="config.diskThreshold" :min="1" :max="100" />
        </n-form-item-gi>
        <n-form-item-gi label="Enabled">
          <n-switch v-model:value="config.enabled" checked-value="Y" unchecked-value="N" />
        </n-form-item-gi>
      </n-grid>
      <template #actions>
        <n-space justify="end" align="center">
          <n-tag :type="connected ? 'success' : 'warning'" size="small">
            {{ connected ? '实时连接' : '连接中...' }}
          </n-tag>
          <n-button type="primary" @click="saveConfig" :loading="saving">
            {{ t('plugin.monitor.save') }}
          </n-button>
        </n-space>
      </template>
    </PluginFormCard>

    <n-grid cols="4" x-gap="16" y-gap="16" responsive="screen">
      <n-grid-item>
        <n-card size="small" :bordered="false" class="card-wrapper">
          <n-space align="center" justify="space-between">
            <div>{{ t('plugin.monitor.cpu') }}</div>
            <n-tag :type="alertType(metrics.alerts?.cpu)">{{ Math.round(metrics.cpuUsage ?? 0) }}%</n-tag>
          </n-space>
          <n-progress type="line" :percentage="Math.round(metrics.cpuUsage || 0)" :status="progressStatus(metrics.alerts?.cpu)" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card size="small" :bordered="false" class="card-wrapper">
          <n-space align="center" justify="space-between">
            <div>{{ t('plugin.monitor.memory') }}</div>
            <n-tag :type="alertType(metrics.alerts?.memory)">{{ Math.round(metrics.memoryUsage ?? 0) }}%</n-tag>
          </n-space>
          <n-progress type="line" :percentage="Math.round(metrics.memoryUsage || 0)" :status="progressStatus(metrics.alerts?.memory)" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card size="small" :bordered="false" class="card-wrapper">
          <n-space align="center" justify="space-between">
            <div>{{ t('plugin.monitor.disk') }}</div>
            <n-tag :type="alertType(metrics.alerts?.disk)">{{ diskUsageValue }}%</n-tag>
          </n-space>
          <n-progress type="line" :percentage="diskUsageValue" :status="progressStatus(metrics.alerts?.disk)" />
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card size="small" :bordered="false" class="card-wrapper">
          <n-space align="center" justify="space-between">
            <div>{{ t('plugin.monitor.jvm') }}</div>
            <n-tag type="info">{{ Math.round(metrics.jvmMemoryUsage ?? 0) }}%</n-tag>
          </n-space>
          <n-progress type="line" :percentage="Math.round(metrics.jvmMemoryUsage || 0)" />
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-card size="small" :bordered="false" class="card-wrapper">
      <n-space justify="space-between" align="center">
        <n-space size="large">
          <div>{{ t('plugin.monitor.thread') }}: {{ metrics.threadCount ?? 0 }}</div>
          <div>{{ t('plugin.monitor.uptime') }}: {{ formatUptime(metrics.uptime) }}</div>
        </n-space>
        <div class="muted">{{ t('plugin.monitor.lastUpdate') }}: {{ lastUpdate }}</div>
      </n-space>
      <n-data-table
        :columns="diskColumns"
        :data="metrics.disks || []"
        :loading="!connected && !metrics.disks?.length"
        :row-key="row => row.path"
        class="disk-table"
      />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  NButton,
  NCard,
  NDataTable,
  NFormItemGi,
  NGrid,
  NGridItem,
  NInputNumber,
  NProgress,
  NSpace,
  NSwitch,
  NTag
} from 'naive-ui';
import { fetchMonitorConfig, saveMonitorConfig } from '../api';
import type { DiskUsage, MonitorConfig, MonitorMetrics } from '../api';
import { PluginFormCard } from '@tt/plugin-ui';

const { t } = useI18n();

const config = reactive<MonitorConfig>({
  cpuThreshold: 60,
  memoryThreshold: 60,
  diskThreshold: 60,
  enabled: 'Y'
});

const metrics = reactive<MonitorMetrics>({});
const saving = ref(false);
const connected = ref(false);
const lastUpdate = ref('--');

// WebSocket 相关
let ws: WebSocket | null = null;
let reconnectTimer: number | null = null;
const RECONNECT_DELAY = 3000;

const diskUsageValue = computed(() => {
  if (!metrics.disks?.length) return 0;
  const maxUsage = Math.max(...metrics.disks.map(disk => disk.usage || 0));
  return Number.isFinite(maxUsage) ? Math.round(maxUsage) : 0;
});

const diskColumns = computed(() => [
  { title: 'Disk', key: 'path' },
  { title: t('plugin.monitor.disk'), key: 'usage', render: (row: DiskUsage) => `${row.usage}%` },
  { title: 'Used', key: 'used', render: (row: DiskUsage) => formatBytes(row.used) },
  { title: 'Free', key: 'free', render: (row: DiskUsage) => formatBytes(row.free) },
  { title: 'Total', key: 'total', render: (row: DiskUsage) => formatBytes(row.total) }
]);

async function loadConfig() {
  const data = await fetchMonitorConfig();
  Object.assign(config, data);
}

async function saveConfig() {
  saving.value = true;
  try {
    const data = await saveMonitorConfig(config);
    Object.assign(config, data);
    window.$message?.success(t('common.saveSuccess'));
  } finally {
    saving.value = false;
  }
}

// 获取 WebSocket URL
function getWebSocketUrl(): string {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  // 检查主前端是否使用代理模式（通过全局变量判断）
  const apiBase = (window as any).__TT_PLUGIN_API_BASE__ || '';
  const proxyPrefix = apiBase.startsWith('/proxy') ? apiBase : '';
  return `${protocol}//${window.location.host}${proxyPrefix}/ws/plugin/monitor`;
}

// WebSocket 连接
function connectWebSocket() {
  if (ws && (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN)) {
    return;
  }

  const wsUrl = getWebSocketUrl();

  ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    connected.value = true;
    console.log('Monitor WebSocket connected');
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data) as MonitorMetrics;
      Object.assign(metrics, data);
      lastUpdate.value = new Date(data.timestamp || Date.now()).toLocaleString();
    } catch (e) {
      console.warn('Failed to parse monitor metrics:', e);
    }
  };

  ws.onclose = () => {
    connected.value = false;
    console.log('Monitor WebSocket disconnected');
    scheduleReconnect();
  };

  ws.onerror = (error) => {
    console.warn('Monitor WebSocket error:', error);
    connected.value = false;
  };
}

function scheduleReconnect() {
  if (reconnectTimer) {
    return;
  }
  reconnectTimer = window.setTimeout(() => {
    reconnectTimer = null;
    connectWebSocket();
  }, RECONNECT_DELAY);
}

function disconnectWebSocket() {
  if (reconnectTimer) {
    window.clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  if (ws) {
    ws.onclose = null; // 防止触发重连
    ws.close();
    ws = null;
  }
  connected.value = false;
}

function alertType(alert?: boolean) {
  return alert ? 'error' : 'success';
}

function progressStatus(alert?: boolean) {
  return alert ? 'error' : 'success';
}

function formatBytes(size?: number) {
  if (!size) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let index = 0;
  let value = size;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  return `${value.toFixed(2)} ${units[index]}`;
}

function formatUptime(value?: number) {
  if (!value) return '--';
  const seconds = Math.floor(value / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
}

onMounted(async () => {
  await loadConfig();
  connectWebSocket();
});

onBeforeUnmount(() => {
  disconnectWebSocket();
});
</script>

<style scoped>
.action-row {
  margin-top: 16px;
}

.muted {
  color: var(--n-text-color-3);
  font-size: 12px;
}

.disk-table {
  margin-top: 16px;
}
</style>
