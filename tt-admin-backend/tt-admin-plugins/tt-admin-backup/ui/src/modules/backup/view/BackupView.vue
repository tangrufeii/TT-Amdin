<template>
  <div class="plugin-backup">
    <n-space vertical size="large">
      <n-card :title="t('plugin.backup.config')" size="small" bordered>
        <n-form label-placement="left" label-width="120" :model="config" size="small">
          <n-grid cols="2" x-gap="16" y-gap="8" responsive="screen">
            <n-form-item-gi :label="t('plugin.backup.enabled')">
              <n-switch v-model:value="config.enabled" checked-value="Y" unchecked-value="N" />
            </n-form-item-gi>
            <n-form-item-gi :label="t('plugin.backup.cron')">
              <n-input v-model:value="config.cron" placeholder="0 0 2 * * ?" />
            </n-form-item-gi>
            <n-form-item-gi :label="t('plugin.backup.dbType')">
              <n-select v-model:value="config.dbType" :options="dbTypeOptions" />
            </n-form-item-gi>
            <n-form-item-gi :label="t('plugin.backup.backupType')">
              <n-select v-model:value="config.backupType" :options="backupTypeOptions" />
            </n-form-item-gi>
            <n-form-item-gi :label="t('plugin.backup.targetDir')">
              <n-input v-model:value="config.targetDir" placeholder="C:\\backup" />
            </n-form-item-gi>
            <n-form-item-gi :label="t('plugin.backup.retentionDays')">
              <n-input-number v-model:value="config.retentionDays" :min="1" :max="365" />
            </n-form-item-gi>
            <n-form-item-gi v-if="config.backupType === 'custom'" :label="t('plugin.backup.customCommand')" span="2">
              <n-input
                v-model:value="config.customCommand"
                placeholder="mysqldump -h {host} -P {port} -u {user} {database} --result-file={file}"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
              />
            </n-form-item-gi>
            <n-form-item-gi :label="t('plugin.backup.lastRunTime')">
              <n-input :value="formatDateTime(config.lastRunTime)" readonly />
            </n-form-item-gi>
          </n-grid>
        </n-form>
        <n-space justify="end" class="action-row">
          <n-button type="primary" @click="saveConfig" :loading="saving">
            {{ t('plugin.backup.save') }}
          </n-button>
          <n-button type="success" @click="runBackup" :loading="running">
            {{ t('plugin.backup.run') }}
          </n-button>
        </n-space>
      </n-card>

      <n-card :title="t('plugin.backup.records')" size="small" bordered>
        <n-data-table
          :columns="columns"
          :data="records"
          :loading="recordsLoading"
          :pagination="pagination"
          :row-key="row => row.id"
        />
      </n-card>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { NButton, NCard, NDataTable, NForm, NFormItemGi, NGrid, NInput, NInputNumber, NSelect, NSpace, NSwitch, NTag } from 'naive-ui';

interface BackupConfig {
  id?: number;
  dbType?: string;
  backupType?: string;
  customCommand?: string;
  cron?: string;
  enabled?: string;
  retentionDays?: number;
  targetDir?: string;
  lastRunTime?: string;
}

interface BackupRecord {
  id: number;
  configId: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  status: string;
  message: string;
  startTime: string;
  endTime: string;
}

const { t } = useI18n();

const config = reactive<BackupConfig>({
  dbType: 'auto',
  backupType: 'dump',
  customCommand: '',
  cron: '0 0 2 * * ?',
  enabled: 'Y',
  retentionDays: 7,
  targetDir: ''
});

const dbTypeOptions = [
  { label: 'Auto', value: 'auto' },
  { label: 'MySQL', value: 'mysql' },
  { label: 'PostgreSQL', value: 'postgresql' }
];

const backupTypeOptions = [
  { label: 'Dump', value: 'dump' },
  { label: 'Custom Command', value: 'custom' }
];

const records = ref<BackupRecord[]>([]);
const recordsLoading = ref(false);
const saving = ref(false);
const running = ref(false);

const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  onChange: (page: number) => {
    pagination.page = page;
    loadRecords();
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    loadRecords();
  }
});

const columns = computed(() => [
  { title: t('plugin.backup.fileName'), key: 'fileName', ellipsis: { tooltip: true } },
  {
    title: t('plugin.backup.status'),
    key: 'status',
    render: (row: BackupRecord) => {
      const isSuccess = row.status === '1';
      return h(NTag, { type: isSuccess ? 'success' : 'error' }, { default: () => (isSuccess ? 'OK' : 'FAIL') });
    }
  },
  { title: t('plugin.backup.fileSize'), key: 'fileSize', render: (row: BackupRecord) => formatBytes(row.fileSize) },
  { title: t('plugin.backup.startTime'), key: 'startTime' },
  { title: t('plugin.backup.endTime'), key: 'endTime' },
  { title: t('plugin.backup.message'), key: 'message', ellipsis: { tooltip: true } }
]);

function getBaseApi() {

  return  '/proxy-default' ;
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
  const data = await request<BackupConfig>('/plugin/backup/config');
  Object.assign(config, data);
}

async function saveConfig(silent = false) {
  saving.value = true;
  try {
    const data = await request<BackupConfig>('/plugin/backup/config', {
      method: 'PUT',
      body: JSON.stringify(config)
    });
    Object.assign(config, data);
    if (!silent) {
      window.$message?.success(t('common.saveSuccess'));
    }
  } finally {
    saving.value = false;
  }
}

async function runBackup() {
  running.value = true;
  try {
    await saveConfig(true);
    await request('/plugin/backup/run', { method: 'POST' });
    window.$message?.success(t('plugin.backup.run'));
    await loadRecords();
    await loadConfig();
  } finally {
    running.value = false;
  }
}

async function loadRecords() {
  recordsLoading.value = true;
  try {
    const data = await request<{ records: BackupRecord[]; total: number }>(
      '/plugin/backup/records/page',
      {
        method: 'POST',
        body: JSON.stringify({ page: pagination.page, pageSize: pagination.pageSize })
      }
    );
    records.value = data.records || [];
    pagination.itemCount = data.total || 0;
  } finally {
    recordsLoading.value = false;
  }
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

function formatDateTime(value?: string) {
  return value || '--';
}

onMounted(async () => {
  await loadConfig();
  await loadRecords();
});
</script>

<style scoped>
.plugin-backup {
  padding: 16px;
}

.action-row {
  margin-top: 16px;
}
</style>
