<template>
  <div class="plugin-monitor">
    <n-space vertical size="large">
      <n-card :title="t('plugin.monitor.config')" size="small" bordered>
        <n-form label-placement="left" label-width="140" :model="config" size="small">
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
        </n-form>
        <n-space justify="end" class="action-row">
          <n-button type="primary" @click="saveConfig" :loading="saving">
            {{ t('plugin.monitor.save') }}
          </n-button>
          <n-button @click="fetchMetrics" :loading="metricsLoading">
            {{ t('plugin.monitor.refresh') }}
          </n-button>
        </n-space>
      </n-card>

      <n-grid cols="4" x-gap="16" y-gap="16" responsive="screen">
        <n-grid-item>
          <n-card size="small" bordered>
            <n-space align="center" justify="space-between">
              <div>{{ t('plugin.monitor.cpu') }}</div>
              <n-tag :type="alertType(metrics.alerts?.cpu)">{{ metrics.cpuUsage ?? 0 }}%</n-tag>
            </n-space>
            <n-progress type="line" :percentage="metrics.cpuUsage || 0" :status="progressStatus(metrics.alerts?.cpu)" />
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card size="small" bordered>
            <n-space align="center" justify="space-between">
              <div>{{ t('plugin.monitor.memory') }}</div>
              <n-tag :type="alertType(metrics.alerts?.memory)">{{ metrics.memoryUsage ?? 0 }}%</n-tag>
            </n-space>
            <n-progress type="line" :percentage="metrics.memoryUsage || 0" :status="progressStatus(metrics.alerts?.memory)" />
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card size="small" bordered>
            <n-space align="center" justify="space-between">
              <div>{{ t('plugin.monitor.disk') }}</div>
              <n-tag :type="alertType(metrics.alerts?.disk)">{{ diskUsageValue }}%</n-tag>
            </n-space>
            <n-progress type="line" :percentage="diskUsageValue" :status="progressStatus(metrics.alerts?.disk)" />
          </n-card>
        </n-grid-item>
        <n-grid-item>
          <n-card size="small" bordered>
            <n-space align="center" justify="space-between">
              <div>{{ t('plugin.monitor.jvm') }}</div>
              <n-tag type="info">{{ metrics.jvmMemoryUsage ?? 0 }}%</n-tag>
            </n-space>
            <n-progress type="line" :percentage="metrics.jvmMemoryUsage || 0" />
          </n-card>
        </n-grid-item>
      </n-grid>

      <n-card size="small" bordered>
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
          :loading="metricsLoading"
          :row-key="row => row.path"
          class="disk-table"
        />
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  NButton,
  NCard,
  NDataTable,
  NForm,
  NFormItemGi,
  NGrid,
  NGridItem,
  NInputNumber,
  NProgress,
  NSpace,
  NSwitch,
  NTag
} from 'naive-ui';

interface MonitorConfig {
  id?: number;
  cpuThreshold?: number;
  memoryThreshold?: number;
  diskThreshold?: number;
  enabled?: string;
}

interface DiskUsage {
  path: string;
  total: number;
  free: number;
  used: number;
  usage: number;
}

interface MonitorMetrics {
  cpuUsage?: number;
  memoryUsage?: number;
  jvmMemoryUsage?: number;
  jvmMemoryUsed?: number;
  jvmMemoryTotal?: number;
  loadAverage?: number;
  threadCount?: number;
  uptime?: number;
  timestamp?: number;
  disks?: DiskUsage[];
  alerts?: Record<string, boolean>;
}

const { t } = useI18n();

const config = reactive<MonitorConfig>({
  cpuThreshold: 60,
  memoryThreshold: 60,
  diskThreshold: 60,
  enabled: 'Y'
});

const metrics = reactive<MonitorMetrics>({});
const saving = ref(false);
const metricsLoading = ref(false);
const lastUpdate = ref('--');
let timer: number | null = null;

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

function getBaseApi() {
  const globalWindow = window as unknown as { __TT_PLUGIN_API_BASE__?: string };
  if (typeof window !== 'undefined' && globalWindow.__TT_PLUGIN_API_BASE__ != null) {
    return globalWindow.__TT_PLUGIN_API_BASE__ || '';
  }
  return import.meta.env.DEV ? '/proxy-default' : '';
}

function resolveToken() {
  const keys = Object.keys(localStorage);
  const tokenKey = keys.find(key => /token$/i.test(key) && !/refresh/i.test(key));
  if (!tokenKey) return null;
  const raw = localStorage.getItem(tokenKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  const token = resolveToken();
  if (token) {
    headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }

  const response = await fetch(`${getBaseApi()}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers as Record<string, string> | undefined)
    }
  });
  const data = await response.json();
  return data.data ?? data;
}

async function loadConfig() {
  const data = await request<MonitorConfig>('/plugin/monitor/config');
  Object.assign(config, data);
}

async function saveConfig() {
  saving.value = true;
  try {
    const data = await request<MonitorConfig>('/plugin/monitor/config', {
      method: 'PUT',
      body: JSON.stringify(config)
    });
    Object.assign(config, data);
    window.$message?.success(t('common.saveSuccess'));
  } finally {
    saving.value = false;
  }
}

async function fetchMetrics() {
  metricsLoading.value = true;
  try {
    const data = await request<MonitorMetrics>('/plugin/monitor/metrics');
    Object.assign(metrics, data);
    lastUpdate.value = new Date(metrics.timestamp || Date.now()).toLocaleString();
  } finally {
    metricsLoading.value = false;
  }
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
  await fetchMetrics();
  timer = window.setInterval(fetchMetrics, 2000);
});

onBeforeUnmount(() => {
  if (timer) {
    window.clearInterval(timer);
  }
});
</script>

<style scoped>
.plugin-monitor {
  padding: 16px;
}

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
