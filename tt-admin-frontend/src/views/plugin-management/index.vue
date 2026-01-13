<script lang="ts" setup>
import {h, onBeforeUnmount, onMounted, ref} from 'vue'
import {
  NButton,
  NCard,
  NDataTable,
  NForm,
  NFormItem,
  NGi,
  NGrid,
  NInput,
  NSelect,
  NSpace,
  NStatistic,
  NTag,
  NUpload,
  NUploadDragger,
  NModal,
  NIcon,
  NText
} from 'naive-ui';
import {$t} from '@/locales'
import { formatDateTime } from '@/utils/date';
import {useTable, useTableOperate} from '@/hooks/common/table';
import {useAppStore} from '@/store/modules/app';
import {useRouteStore} from '@/store/modules/route';

import {
  fetchPluginDelete,
  fetchPluginDisable,
  fetchPluginEnable,
  fetchPluginPage,
  fetchPluginProgressSnapshots,
  fetchPluginStatistics,
  fetchPluginInstall
} from '@/service/api/plugin';

defineOptions({
  name: 'PluginManagement'
});

const appStore = useAppStore();
const routeStore = useRouteStore();

const { columns, data, loading, getData, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchPluginPage,
  apiParams: {
    page: 1,
    pageSize: 20,
    name: '',
    status: null
  },
  columns: () => [
    {type: 'selection', align: 'center', width: 48},
    {key: 'index', title: $t('common.index'), align: 'center', width: 64},
    {key: 'name', title: $t('page.pluginManagement.table.name'), align: 'center', minWidth: 150},
    {key: 'pluginId', title: $t('page.pluginManagement.table.pluginId'), align: 'center', minWidth: 200},
    {key: 'description', title: $t('page.pluginManagement.table.description'), align: 'center', minWidth: 200},
    {key: 'version', title: $t('page.pluginManagement.table.version'), align: 'center', width: 100},
    {key: 'author', title: $t('page.pluginManagement.table.author'), align: 'center', width: 120},
    {
      key: 'status',
      title: $t('page.pluginManagement.table.status'),
      align: 'center',
      width: 100,
      render: (row: any) => {
        if (isProcessing(row.pluginId)) {
          const info = getProcessingInfo(row.pluginId);
          const progress = info?.progress ?? 0;
          const actionLabel = resolveActionLabel(info?.action);
          const stageLabel = resolveStageLabel(info?.stage);
          const elapsedLabel = formatElapsed(info?.elapsedMs);
          const stageElapsedLabel = formatStageElapsed(info?.stageElapsedMs);
          const messageLabel = info?.message;
          return h(
            'div',
            { class: 'flex flex-col items-center gap-1' },
            [
              h(NTag, { type: 'warning', size: 'small', bordered: false }, () => `${$t('page.pluginManagement.search.statusProcessing')} ${progress}%`),
              actionLabel ? h(NText, { depth: 3, class: 'text-xs' }, () => actionLabel) : null,
              stageLabel ? h(NText, { depth: 3, class: 'text-xs' }, () => stageLabel) : null,
              messageLabel ? h(NText, { depth: 3, class: 'text-xs' }, () => messageLabel) : null,
              stageElapsedLabel ? h(NText, { depth: 3, class: 'text-xs' }, () => stageElapsedLabel) : null,
              elapsedLabel ? h(NText, { depth: 3, class: 'text-xs' }, () => elapsedLabel) : null
            ].filter(Boolean)
          );
        }
        if (row.status === 1) {
          return h(NTag, {
            type: 'success',
            size: 'small',
            bordered: false
          }, () => $t('page.pluginManagement.search.statusEnabled'));
        }
        return h(NTag, {
          type: 'error',
          size: 'small',
          bordered: false
        }, () => $t('page.pluginManagement.search.statusDisabled'));
      }
    },
    {
      key: 'isDev',
      title: $t('page.pluginManagement.table.isDev'),
      align: 'center',
      width: 100,
      render: (row: any) => (row.isDev ? $t('common.yesOrNo.yes') : $t('common.yesOrNo.no'))
    },
    {
      key: 'createTime',
      title: $t('page.pluginManagement.table.createTime'),
      align: 'center',
      width: 180,
      render: (row: any) => formatDateTime(row.createTime)
    },
    {
      key: 'operate',
      title: $t('page.pluginManagement.table.action'),
      align: 'center',
      minWidth: 260,
      render: (row: any) =>
        h(
          'div',
          {class: 'flex-center flex-wrap gap-2'},
          [
            row.status === 0
              ? h(NButton, {
                type: 'primary',
                ghost: true,
                size: 'small',
                loading: isProcessing(row.pluginId),
                disabled: isProcessing(row.pluginId),
                onClick: () => handleEnable(row)
              }, () => $t('page.pluginManagement.table.enable'))
              : h(NButton, {
                type: 'warning',
                ghost: true,
                size: 'small',
                loading: isProcessing(row.pluginId),
                disabled: isProcessing(row.pluginId),
                onClick: () => handleDisable(row)
              }, () => $t('page.pluginManagement.table.disable')),
            h(NButton, {
              type: 'error',
              ghost: true,
              size: 'small',
              loading: isProcessing(row.pluginId),
              disabled: isProcessing(row.pluginId),
              onClick: () => handleDelete(row)
            }, () => $t('page.pluginManagement.table.delete'))
          ]
        )
    }
  ]
});
const { checkedRowKeys } = useTableOperate(data, getData);
// 插件统计信息
interface PluginStatistics {
  total: number;
  enabledCount: number;
  disabledCount: number;
}

const statistics = ref<PluginStatistics>({
  total: 0,
  enabledCount: 0,
  disabledCount: 0
});

interface PluginProcessingInfo {
  action?: string;
  stage?: string;
  progress?: number;
  startedAt?: number;
  elapsedMs?: number;
  stageElapsedMs?: number;
  stageStartedAt?: number;
  serverElapsedMs?: number;
  serverStageElapsedMs?: number;
  serverUpdatedAt?: number;
  message?: string;
  updatedAt?: number;
}

const processingMap = ref<Map<string, PluginProcessingInfo>>(new Map());
const wsRef = ref<WebSocket | null>(null);
let wsReconnectTimer: number | undefined;
let elapsedTimer: number | undefined;
const processingTimeouts = new Map<string, number>();

function buildProcessingKey(pluginId?: string, action?: string) {
  if (!pluginId) return undefined;
  if (!action) return pluginId;
  return `${pluginId}::${action.toUpperCase()}`;
}

function setProcessingInfo(pluginId: string | undefined, info: PluginProcessingInfo) {
  const key = buildProcessingKey(pluginId, info.action);
  if (!key || !pluginId) return;
  const next = new Map(processingMap.value);
  const current = next.get(key) || {};
  if (current.updatedAt && info.updatedAt && info.updatedAt < current.updatedAt) {
    return;
  }
  const now = Date.now();
  let incomingUpdatedAt = info.updatedAt ?? now;
  if (incomingUpdatedAt > now + 5000) {
    incomingUpdatedAt = now;
  }
  const nextInfo: PluginProcessingInfo = { ...current, ...info, updatedAt: incomingUpdatedAt };
  if (info.stage && info.stage !== current.stage) {
    nextInfo.stageStartedAt = incomingUpdatedAt;
  }
  if (info.elapsedMs !== undefined) {
    nextInfo.serverElapsedMs = info.elapsedMs;
    nextInfo.serverUpdatedAt = incomingUpdatedAt;
  }
  if (info.stageElapsedMs !== undefined) {
    nextInfo.serverStageElapsedMs = info.stageElapsedMs;
    nextInfo.serverUpdatedAt = incomingUpdatedAt;
  }
  next.set(key, nextInfo);
  processingMap.value = next;
  refreshTableView();
  ensureElapsedTimer();
  scheduleProcessingTimeout(key);
}

function clearProcessingInfo(pluginId?: string, action?: string) {
  const key = buildProcessingKey(pluginId, action);
  if (!key) return;
  const next = new Map(processingMap.value);
  next.delete(key);
  processingMap.value = next;
  refreshTableView();
  clearProcessingTimeout(key);
  if (processingMap.value.size === 0) {
    stopElapsedTimer();
  }
}

function clearProcessingByPluginId(pluginId?: string) {
  if (!pluginId) return;
  const next = new Map(processingMap.value);
  let changed = false;
  for (const key of next.keys()) {
    if (key === pluginId || key.startsWith(`${pluginId}::`)) {
      next.delete(key);
      clearProcessingTimeout(key);
      changed = true;
    }
  }
  if (!changed) return;
  processingMap.value = next;
  refreshTableView();
  if (processingMap.value.size === 0) {
    stopElapsedTimer();
  }
}

function getProcessingInfo(pluginId?: string) {
  if (!pluginId) return undefined;
  const infos = Array.from(processingMap.value.entries())
    .filter(([key]) => key.startsWith(`${pluginId}::`) || key === pluginId)
    .map(([, info]) => info)
    .filter(Boolean);
  if (infos.length === 0) {
    return undefined;
  }
  infos.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
  return infos[0];
}

function isProcessing(pluginId?: string) {
  if (!pluginId) return false;
  for (const key of processingMap.value.keys()) {
    if (key === pluginId || key.startsWith(`${pluginId}::`)) {
      return true;
    }
  }
  return false;
}

function refreshTableView() {
  data.value = [...data.value];
}

function ensureElapsedTimer() {
  if (elapsedTimer || processingMap.value.size === 0) return;
  elapsedTimer = window.setInterval(() => {
    const now = Date.now();
    const next = new Map(processingMap.value);
    let changed = false;
    next.forEach((info, key) => {
      if (!info) return;
      const updated: PluginProcessingInfo = { ...info };
      if (info.serverUpdatedAt !== undefined && info.serverElapsedMs !== undefined) {
        updated.elapsedMs = Math.max(0, info.serverElapsedMs + (now - info.serverUpdatedAt));
      } else if (info.startedAt) {
        updated.elapsedMs = Math.max(0, now - info.startedAt);
      }
      if (info.serverUpdatedAt !== undefined && info.serverStageElapsedMs !== undefined) {
        updated.stageElapsedMs = Math.max(0, info.serverStageElapsedMs + (now - info.serverUpdatedAt));
      } else if (info.stageStartedAt) {
        updated.stageElapsedMs = Math.max(0, now - info.stageStartedAt);
      }
      next.set(key, updated);
      changed = true;
    });
    if (changed) {
      processingMap.value = next;
      refreshTableView();
    }
  }, 500);
}

function stopElapsedTimer() {
  if (elapsedTimer) {
    window.clearInterval(elapsedTimer);
    elapsedTimer = undefined;
  }
}

// Fallback to clear processing state when no WS update arrives.
function scheduleProcessingTimeout(key: string, timeoutMs = 120000) {
  clearProcessingTimeout(key);
  const marker = Date.now();
  const timer = window.setTimeout(() => {
    const current = processingMap.value.get(key);
    if (!current) return;
    if (current.updatedAt && current.updatedAt > marker) {
      return;
    }
    const [pluginId, action] = key.split('::');
    clearProcessingInfo(pluginId, action);
  }, timeoutMs);
  processingTimeouts.set(key, timer);
}

function clearProcessingTimeout(key: string) {
  const timer = processingTimeouts.get(key);
  if (timer) {
    window.clearTimeout(timer);
    processingTimeouts.delete(key);
  }
}

function resolveStageLabel(stage?: string) {
  if (!stage) return '';
  const key = `page.pluginManagement.stage.${stage}`;
  const translated = $t(key);
  return translated === key ? stage : translated;
}

function resolveActionLabel(action?: string) {
  if (!action) return '';
  const key = `page.pluginManagement.action.${action.toLowerCase()}`;
  const translated = $t(key);
  return translated === key ? action : translated;
}

function formatElapsed(ms?: number) {
  if (ms === undefined || ms === null) return '';
  const seconds = Math.max(0, ms) / 1000;
  return $t('page.pluginManagement.message.elapsed', { seconds: seconds.toFixed(1) });
}

function formatStageElapsed(ms?: number) {
  if (ms === undefined || ms === null) return '';
  const seconds = Math.max(0, ms) / 1000;
  return $t('page.pluginManagement.message.stageElapsed', { seconds: seconds.toFixed(1) });
}

function resolveOccurredAt(payload: any) {
  if (typeof payload?.occurredAt === 'number') {
    return payload.occurredAt;
  }
  if (payload?.occurredOn) {
    const parsed = new Date(payload.occurredOn).getTime();
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return Date.now();
}

function buildWsUrl() {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const proxyPrefix = import.meta.env.DEV ? '/proxy-default' : '';
  return `${protocol}://${window.location.host}${proxyPrefix}/ws/plugin/status`;
}

function connectPluginSocket() {
  if (wsRef.value) {
    wsRef.value.close();
  }
  const ws = new WebSocket(buildWsUrl());
  wsRef.value = ws;
  ws.onmessage = async event => {
    try {
      const payload = JSON.parse(event.data);
      const status = String(payload?.status || '').toUpperCase();
      const pluginId = payload?.pluginId;
      if (status === 'PROCESSING') {
        const occurredOn = resolveOccurredAt(payload);
        const startedAt = typeof payload?.startedAt === 'number' ? payload.startedAt : occurredOn;
        setProcessingInfo(pluginId, {
          action: payload?.action,
          stage: payload?.stage,
          progress: typeof payload?.progress === 'number' ? payload.progress : undefined,
          startedAt,
          elapsedMs: payload?.elapsedMs ?? 0,
          stageElapsedMs: payload?.stageElapsedMs ?? undefined,
          message: payload?.message,
          updatedAt: occurredOn
        });
        return;
      }
      if (status === 'SUCCESS' || status === 'FAILED') {
        clearProcessingByPluginId(pluginId);
      }
      if (status === 'FAILED') {
        window.$message?.error(payload?.message || $t('page.pluginManagement.message.operationFailed'));
      }
      if (status === 'SUCCESS') {
        await getData();
        await getStatistics();
        await routeStore.refreshPluginRoutes();
      }
    } catch (error) {
      console.error('[plugin] websocket message parse failed:', error);
    }
  };
  ws.onclose = () => {
    if (wsReconnectTimer) window.clearTimeout(wsReconnectTimer);
    wsReconnectTimer = window.setTimeout(connectPluginSocket, 2000);
  };
  ws.onerror = () => {
    ws.close();
  };
}

function applyProgressSnapshots(messages: string[]) {
  messages.forEach(raw => {
    try {
      const payload = JSON.parse(raw);
      const status = String(payload?.status || '').toUpperCase();
      if (status !== 'PROCESSING') return;
      const occurredOn = resolveOccurredAt(payload);
      const startedAt = typeof payload?.startedAt === 'number' ? payload.startedAt : occurredOn;
      setProcessingInfo(payload?.pluginId, {
        action: payload?.action,
        stage: payload?.stage,
        progress: typeof payload?.progress === 'number' ? payload.progress : undefined,
        startedAt,
        elapsedMs: payload?.elapsedMs ?? 0,
        stageElapsedMs: payload?.stageElapsedMs ?? undefined,
        message: payload?.message,
        updatedAt: occurredOn
      });
    } catch (error) {
      console.error('[plugin] snapshot parse failed:', error);
    }
  });
}

async function loadProgressSnapshots() {
  const { data, error } = await fetchPluginProgressSnapshots();
  if (!error && Array.isArray(data.value)) {
    applyProgressSnapshots(data.value);
  }
}

async function getStatistics() {
  const {data} = await fetchPluginStatistics();
  if (data.value) {
    statistics.value = data.value;
  }
}

// 启用插件
async function handleEnable(row: any) {
  setProcessingInfo(row.pluginId, { action: 'ENABLE', stage: 'start', progress: 0, updatedAt: Date.now() });
  const {error} = await fetchPluginEnable(row.id);
  if (error) {
    clearProcessingInfo(row.pluginId, 'ENABLE');
  }
  if (!error) {
    clearProcessingByPluginId(row.pluginId);
    window.$message?.success($t('page.pluginManagement.message.enableSuccess'));
    getData();
    getStatistics();
    await routeStore.refreshPluginRoutes();
  }
}

// 禁用插件
async function handleDisable(row: any) {
  setProcessingInfo(row.pluginId, { action: 'DISABLE', stage: 'start', progress: 0, updatedAt: Date.now() });
  const {error} = await fetchPluginDisable(row.id);
  if (error) {
    clearProcessingInfo(row.pluginId, 'DISABLE');
  }
  if (!error) {
    clearProcessingByPluginId(row.pluginId);
    window.$message?.success($t('page.pluginManagement.message.disableSuccess'));
    getData();
    getStatistics();
    await routeStore.refreshPluginRoutes();
  }
}

// 删除插件
async function handleDelete(row: any) {
  if (row.status === 1) {
    window.$message?.warning('请先禁用插件再删除');
    return;
  }
  window.$dialog?.warning({
    title: $t('common.warning'),
    content: $t('page.pluginManagement.message.deleteConfirm'),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    onPositiveClick: async () => {
      setProcessingInfo(row.pluginId, { action: 'UNINSTALL', stage: 'start', progress: 0, updatedAt: Date.now() });
      const {error} = await fetchPluginDelete(row.id);
      if (error) {
        clearProcessingInfo(row.pluginId, 'UNINSTALL');
      }
      if (!error) {
        clearProcessingByPluginId(row.pluginId);
        window.$message?.success($t('page.pluginManagement.message.deleteSuccess'));
        getData();
        getStatistics();
        await routeStore.refreshPluginRoutes();
      }
    }
  });
}

// 搜索
const searchName = ref('');

function handleSearch() {
  searchParams.name = searchName.value;
  getData();
}

function handleReset() {
  searchName.value = '';
  resetSearchParams();
  getData();
}

// 导入插件
const uploadModalVisible = ref(false);
const uploadLoading = ref(false);
const fileListRef = ref<any[]>([]);

function openUploadModal() {
  uploadModalVisible.value = true;
  fileListRef.value = [];
}

function closeUploadModal() {
  uploadModalVisible.value = false;
  fileListRef.value = [];
}

async function handleUpload({ file }: any) {
  uploadLoading.value = true;
  try {
    setProcessingInfo(undefined, { action: 'INSTALL', stage: 'start', progress: 0, updatedAt: Date.now() });
    const { error } = await fetchPluginInstall(file.file);
    if (!error) {
      window.$message?.success($t('page.pluginManagement.message.installSuccess'));
      closeUploadModal();
      getData();
      getStatistics();
      await routeStore.refreshPluginRoutes();
    }
  } finally {
    clearProcessingInfo(undefined, 'INSTALL');
    uploadLoading.value = false;
  }
  return false; // 阻止自动上传
}

function handleImportButtonClick() {
  openUploadModal();
}

onMounted(() => {
  getData();
  getStatistics();
  loadProgressSnapshots();
  connectPluginSocket();
});

onBeforeUnmount(() => {
  if (wsReconnectTimer) window.clearTimeout(wsReconnectTimer);
  stopElapsedTimer();
  wsRef.value?.close();
});
</script>

<template>
  <NSpace :size="16" class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto" vertical>
    <!-- 缁熻卡片 -->
    <NGrid :x-gap="16" :y-gap="16" item-responsive responsive="screen">
      <NGi span="24 s:24 m:8">
        <NCard :bordered="false" class="card-wrapper">
          <NStatistic :label="$t('page.pluginManagement.statistics.total')" :value="statistics.total" />
        </NCard>
      </NGi>
      <NGi span="24 s:24 m:8">
        <NCard :bordered="false" class="card-wrapper">
          <NStatistic :label="$t('page.pluginManagement.statistics.enabled')" :value="statistics.enabledCount" />
        </NCard>
      </NGi>
      <NGi span="24 s:24 m:8">
        <NCard :bordered="false" class="card-wrapper">
          <NStatistic :label="$t('page.pluginManagement.statistics.disabled')" :value="statistics.disabledCount" />
        </NCard>
      </NGi>
    </NGrid>

    <!-- 搜索区域 -->
    <NCard :bordered="false" class="card-wrapper">
      <NForm :label-width="80" :model="searchParams" label-placement="left">
        <NGrid :x-gap="16" :y-gap="16" item-responsive responsive="screen">
          <NGi span="24 s:24 m:12 l:8">
            <NFormItem :label="$t('page.pluginManagement.search.name')">
              <NInput
                v-model:value="searchName"
                :placeholder="$t('page.pluginManagement.search.placeholder')"
                clearable
                @keyup.enter="handleSearch"
              />
            </NFormItem>
          </NGi>
          <NGi span="24 s:24 m:12 l:8">
            <NFormItem :label="$t('page.pluginManagement.search.status')">
              <NSelect
                v-model:value="searchParams.status"
                :options="[
                  { label: $t('page.pluginManagement.search.statusAll'), value: null },
                  { label: $t('page.pluginManagement.search.statusEnabled'), value: 1 },
                  { label: $t('page.pluginManagement.search.statusDisabled'), value: 0 }
                ]"
                clearable
              />
            </NFormItem>
          </NGi>
          <NGi span="24 s:24 m:24 l:8">
            <NSpace :size="12">
              <NButton type="primary" @click="handleSearch">
                {{ $t('common.search') }}
              </NButton>
              <NButton @click="handleReset">
                {{ $t('common.reset') }}
              </NButton>
              <NButton type="success" @click="handleImportButtonClick">
                {{ $t('page.pluginManagement.table.install') }}
              </NButton>
            </NSpace>
          </NGi>
        </NGrid>
      </NForm>
    </NCard>

    <!-- 数据表格 -->
    <NCard :bordered="false" class="flex-1-hidden card-wrapper">
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        remote
        striped
        size="small"
        :max-height="appStore.isMobile ? undefined : 600"
        :data="data"
        :scroll-x="962"
        :columns="columns"
        :loading="loading"
        :single-line="false"
        :row-key="row => row.id"
        :pagination="mobilePagination"
      />
    </NCard>

    <!-- 导入插件弹窗 -->
    <NModal
      v-model:show="uploadModalVisible"
      :mask-closable="false"
      preset="card"
      :title="$t('page.pluginManagement.table.install')"
      class="w-640px"
    >
      <NUpload :custom-request="handleUpload" :show-file-list="false" accept=".zip,.jar" :disabled="uploadLoading">
        <NUploadDragger :disabled="uploadLoading">
          <div style="margin-bottom: 12px">
            <NIcon size="48" :depth="3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 2l5 5h-5zM12 18v-4l-1.5 1.5L9 13.5l3-3l3 3l-1.5 1.5L12 14v4z"
                />
              </svg>
            </NIcon>
          </div>
          <NText style="font-size: 16px">
            点击或者拖动文件到此区域上传
          </NText>
          <NText depth="3" style="display: block; margin-top: 8px">
            支持 .zip 或 .jar 格式的插件文件
          </NText>
        </NUploadDragger>
      </NUpload>
    </NModal>
  </NSpace>
</template>



<style scoped>
.card-wrapper {
  border-radius: 8px;
}
</style>
