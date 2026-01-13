<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
      <n-card :title="t('plugin.backup.config')" size="small" :bordered="false" class="card-wrapper">
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

      <n-card :title="t('plugin.backup.records')" size="small" :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
        <component
          :is="tableHeaderComponent"
          v-if="tableHeaderComponent"
          v-model:columns="columnChecks"
          :loading="loading"
          :disabled-add="true"
          :disabled-delete="true"
          @refresh="getData"
        />
        <n-data-table
          remote
          size="small"
          class="sm:h-full"
          :columns="columns"
          :data="data"
          :loading="loading"
          :pagination="pagination"
          :row-key="row => row.id"
          :single-line="false"
          :flex-height="!isMobile"
        />
      </n-card>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, h, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { NButton, NCard, NDataTable, NForm, NFormItemGi, NGrid, NInput, NInputNumber, NSelect, NSpace, NSwitch, NTag } from 'naive-ui';
import { request, requestData } from '@tt/plugin-sdk';

type PluginApi = {
  useTable?: any;
  components?: {
    TableHeaderOperation?: any;
  };
};

const pluginApi = (window as any).__TT_PLUGIN_API__ as PluginApi | undefined;

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
const isMobile = ref(false);
let mobileQuery: MediaQueryList | null = null;

function updateMobile() {
  if (mobileQuery) {
    isMobile.value = mobileQuery.matches;
    return;
  }
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth <= 640;
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return;
  mobileQuery = window.matchMedia('(max-width: 640px)');
  updateMobile();
  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener('change', updateMobile);
  } else if (mobileQuery.addListener) {
    mobileQuery.addListener(updateMobile);
  }
});

onBeforeUnmount(() => {
  if (!mobileQuery) return;
  if (mobileQuery.removeEventListener) {
    mobileQuery.removeEventListener('change', updateMobile);
  } else if (mobileQuery.removeListener) {
    mobileQuery.removeListener(updateMobile);
  }
  mobileQuery = null;
});

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

const saving = ref(false);
const running = ref(false);

const createColumns = () => [
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
];

const baseSearchParams = {
  page: 1,
  pageSize: 10
};

async function fetchRecords(params: Record<string, any>) {
  return await request<{ records: BackupRecord[]; total: number; page?: number; pageSize?: number }>({
    url: '/plugin/backup/records/page',
    method: 'POST',
    data: params
  });
}

async function loadConfig() {
  const data = await requestData<BackupConfig>({ url: '/plugin/backup/config' });
  Object.assign(config, data);
}

async function saveConfig(silent = false) {
  saving.value = true;
  try {
    const data = await requestData<BackupConfig>({ url: '/plugin/backup/config', method: 'PUT', data: config });
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
    await requestData({ url: '/plugin/backup/run', method: 'POST' });
    window.$message?.success(t('plugin.backup.run'));
    await getData();
    await loadConfig();
  } finally {
    running.value = false;
  }
}

const fallbackHooks = createFallbackTableHooks();
const useTableHook = pluginApi?.useTable ?? fallbackHooks.useTable;

const { loading, data, columns, columnChecks, pagination, getData, getDataByPage } = useTableHook({
  apiFn: fetchRecords,
  apiParams: baseSearchParams,
  columns: createColumns,
  transformer: res => {
    const payload = res?.data || {};
    const { records = [], page = 1, pageSize = 10, total = 0 } = payload;
    return {
      data: records,
      pageNum: page,
      pageSize,
      total
    };
  }
});

const tableHeaderComponent = computed(() => {
  const instance = getCurrentInstance();
  return pluginApi?.components?.TableHeaderOperation || instance?.appContext.components['TableHeaderOperation'] || null;
});

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

function createFallbackTableHooks() {
  function getColumnChecks(cols: any[]) {
    return cols.map(column => {
      if (column.type === 'selection') {
        return { key: '__selection__', title: t('common.check'), checked: true };
      }
      if (column.type === 'expand') {
        return { key: '__expand__', title: t('common.expandColumn'), checked: true };
      }
      return {
        key: column.key,
        title: column.title,
        checked: true
      };
    });
  }

  function buildColumns(cols: any[], checks: any[]) {
    const columnMap = new Map();
    cols.forEach(column => {
      if (column.type === 'selection') {
        columnMap.set('__selection__', column);
        return;
      }
      if (column.type === 'expand') {
        columnMap.set('__expand__', column);
        return;
      }
      columnMap.set(column.key, column);
    });
    return checks.filter((item: any) => item.checked).map((item: any) => columnMap.get(item.key));
  }

  function useTable(config: any) {
    const loading = ref(false);
    const data = ref<any[]>([]);
    const searchParams = reactive({ ...(config.apiParams || {}) });
    const rawColumns = computed(() => config.columns());
    const columnChecks = ref<any[]>([]);

    const columns = computed(() => {
      const cols = rawColumns.value || [];
      if (columnChecks.value.length === 0) {
        columnChecks.value = getColumnChecks(cols);
      }
      return buildColumns(cols, columnChecks.value);
    });

    const pagination = reactive({
      page: searchParams.page ?? 1,
      pageSize: searchParams.pageSize ?? 10,
      itemCount: 0,
      onChange: (page: number) => {
        pagination.page = page;
        searchParams.page = page;
        getData();
      },
      onUpdatePageSize: (pageSize: number) => {
        pagination.pageSize = pageSize;
        pagination.page = 1;
        searchParams.page = 1;
        searchParams.pageSize = pageSize;
        getData();
      }
    });

    async function getData() {
      loading.value = true;
      try {
        const response = await config.apiFn({ ...searchParams });
        const transformed = config.transformer(response);
        data.value = transformed.data || [];
        pagination.page = transformed.pageNum;
        pagination.pageSize = transformed.pageSize;
        pagination.itemCount = transformed.total;
      } finally {
        loading.value = false;
      }
    }

    async function getDataByPage(pageNum = 1) {
      pagination.page = pageNum;
      searchParams.page = pageNum;
      searchParams.pageSize = pagination.pageSize;
      await getData();
    }

    if (config.immediate !== false) {
      getData();
    }

    return {
      loading,
      data,
      columns,
      columnChecks,
      pagination,
      getData,
      getDataByPage
    };
  }

  return { useTable };
}

onMounted(async () => {
  await loadConfig();
  await getDataByPage(1);
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
