<template>
  <div>嘿嘿,黑你好</div>
  <div class="h-full min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
      <n-card :title="t('plugin.test.title')" size="small" :bordered="false" class="card-wrapper">
        <n-form :model="searchParams" label-width="80" label-placement="left">
          <n-grid cols="24" x-gap="16" y-gap="8" responsive="screen">
            <n-form-item-gi :span="12" :label="t('plugin.test.name')">
              <n-input v-model:value="searchParams.name" :placeholder="t('plugin.test.name')" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" :label="t('plugin.test.sex')">
              <n-input v-model:value="searchParams.sex" :placeholder="t('plugin.test.sex')" />
            </n-form-item-gi>
            <n-form-item-gi span="24">
              <n-space justify="end" class="w-full">
                <n-button type="primary" ghost @click="getDataByPage(1)">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ t('common.search') }}
                </n-button>
                <n-button quaternary @click="resetSearchParams">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ t('common.reset') }}
                </n-button>
              </n-space>
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-card>
      <n-card :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
        <component
          :is="tableHeaderComponent"
          v-if="tableHeaderComponent"
          v-model:columns="columnChecks"
          :loading="loading"
          :disabled-delete="checkedRowKeys.length === 0"
          @add="openCreate"
          @delete="batchDelete"
          @refresh="getData"
        />
        <div v-else class="toolbar">
          <n-space>
            <n-button size="small" ghost type="primary" @click="openCreate">{{ t('common.add') }}</n-button>
            <n-button size="small" ghost type="error" :disabled="checkedRowKeys.length === 0" @click="batchDelete">
              {{ t('common.batchDelete') }}
            </n-button>
          </n-space>
          <n-button size="small" @click="getData">{{ t('common.refresh') }}</n-button>
        </div>
        <n-data-table
          remote
          size="small"
          class="sm:h-full"
          :columns="columns"
          :data="data"
          :loading="loading"
          :pagination="pagination"
          :row-key="row => row.id"
          v-model:checked-row-keys="checkedRowKeys"
          :single-line="false"
          :flex-height="false"
        />
      </n-card>
    <n-drawer v-model:show="drawerVisible" placement="right" :width="420">
      <n-drawer-content :title="modalTitle" closable>
        <n-form :model="formModel" :rules="rules" label-width="100">
          <n-grid cols="24" x-gap="16" y-gap="8" responsive="screen">
            <n-form-item-gi :span="12" :label="t('plugin.test.name')" path="name">
              <n-input v-model:value="formModel.name" :placeholder="t('plugin.test.name')" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" :label="t('plugin.test.sex')" path="sex">
              <n-input v-model:value="formModel.sex" :placeholder="t('plugin.test.sex')" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" :label="t('plugin.test.age')" path="age">
              <n-input-number v-model:value="formModel.age" class="w-full" />
            </n-form-item-gi>
          </n-grid>
        </n-form>
        <template #footer>
          <n-space justify="end">
            <n-button @click="closeDrawer">{{ t('common.cancel') }}</n-button>
            <n-button type="primary" @click="submitForm">{{ t('common.confirm') }}</n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, h, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  NButton,
  NCard,
  NDataTable,
  NDrawer,
  NDrawerContent,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NInputNumber,
  NSpace
} from 'naive-ui';
import type { FormRules } from 'naive-ui';
import { deleteTestRecord, deleteTestRecords, fetchTestPage, saveTestRecord } from '../api';
import type { TestPageQuery, TestRecord } from '../api';
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
type PluginApi = {
  useTable?: any;
  useTableOperate?: any;
  components?: {
    TableHeaderOperation?: any;
  };
};
const pluginApi = (window as any).__TT_PLUGIN_API__ as PluginApi | undefined;
const fallbackHooks = createFallbackTableHooks();
const useTableHook = pluginApi?.useTable ?? fallbackHooks.useTable;
const useTableOperateHook = pluginApi?.useTableOperate ?? fallbackHooks.useTableOperate;
const formModel = reactive<TestRecord>({
  name: '',
  sex: '',
  age: null as number | null,
  id: null as number | null
});
const rules: FormRules = {
  name: { required: true, message: t('form.required'), trigger: ['input', 'blur'] },
  sex: { required: true, message: t('form.required'), trigger: ['input', 'blur'] }
};
const baseSearchParams: TestPageQuery = {
  page: 1,
  pageSize: 20,
  name: '',
  sex: ''
};
const createColumns = () => [
  { type: 'selection', width: 48, align: 'center' },
  { title: t('plugin.test.name'), key: 'name', width: 160, ellipsis: { tooltip: true } },
  { title: t('plugin.test.sex'), key: 'sex', width: 160, ellipsis: { tooltip: true } },
  { title: t('plugin.test.age'), key: 'age', width: 160, ellipsis: { tooltip: true } },
  {
    title: t('common.action'),
    key: 'action',
    width: 200,
    fixed: 'right',
    render: (row: any) =>
      h(NSpace, {}, {
        default: () => [
          h(NButton, { size: 'small', type: 'primary', quaternary: true, onClick: () => openEdit(row) }, { default: () => t('common.edit') }),
          h(NButton, { size: 'small', type: 'error', quaternary: true, onClick: () => removeRow(row) }, { default: () => t('common.delete') })
        ]
      })
  }
];
const { loading, data, columns, columnChecks, pagination, getData, getDataByPage, searchParams, resetSearchParams } = useTableHook({
  apiFn: fetchTestPage,
  apiParams: baseSearchParams,
  columns: createColumns,
  transformer: res => {
    const payload = res?.data || {};
    const { records = [], page = 1, pageSize = 20, total = 0 } = payload;
    return {
      data: records,
      pageNum: page,
      pageSize,
      total
    };
  }
});
const {
  drawerVisible,
  openDrawer,
  closeDrawer,
  operateType,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted,
  onMessage,
  handleAdd,
  handleEdit
} = useTableOperateHook(data, getData);
const modalTitle = computed(() => (operateType.value === 'edit' ? t('common.edit') : t('common.add')));
const tableHeaderComponent = computed(() => {
  const instance = getCurrentInstance();
  return pluginApi?.components?.TableHeaderOperation || instance?.appContext.components['TableHeaderOperation'] || null;
});
function resetForm(row?: any) {
  formModel.name = row?.name ?? '';
  formModel.sex = row?.sex ?? '';
  formModel.age = row?.age ?? null;
  formModel.id = row?.id ?? null;
}
function openCreate() {
  handleAdd();
  resetForm();
  openDrawer();
}
function openEdit(row: any) {
  handleEdit(row.id);
  resetForm(row);
  openDrawer();
}
async function submitForm() {
  const payload = { ...formModel };
  await saveTestRecord(payload, operateType.value === 'edit');
  await onMessage(t('common.saveSuccess'));
  closeDrawer();
}
async function removeRow(row: any) {
  if (!window.confirm(t('common.confirmDelete'))) return;
  await deleteTestRecord(row.id);
  await onDeleted();
}
async function batchDelete() {
  if (checkedRowKeys.value.length === 0) return;
  if (!window.confirm(t('common.confirmDelete'))) return;
  await deleteTestRecords(checkedRowKeys.value as number[]);
  await onBatchDeleted();
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
      pageSize: searchParams.pageSize ?? 20,
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
    function resetSearchParams() {
      Object.assign(searchParams, { ...(config.apiParams || {}) });
      getData();
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
      getDataByPage,
      searchParams,
      resetSearchParams
    };
  }
  function useTableOperate(_data: any, getData: () => Promise<void>) {
    const drawerVisible = ref(false);
    const operateType = ref('add');
    const checkedRowKeys = ref<any[]>([]);
    function openDrawer() {
      drawerVisible.value = true;
    }
    function closeDrawer() {
      drawerVisible.value = false;
    }
    function handleAdd() {
      operateType.value = 'add';
      openDrawer();
    }
    function handleEdit(_id: any) {
      operateType.value = 'edit';
      openDrawer();
    }
    async function onBatchDeleted() {
      window.$message?.success(t('common.deleteSuccess'));
      checkedRowKeys.value = [];
      await getData();
    }
    async function onDeleted() {
      window.$message?.success(t('common.deleteSuccess'));
      await getData();
    }
    async function onMessage(message?: string) {
      window.$message?.success(message || t('common.actionSuccess'));
      checkedRowKeys.value = [];
      await getData();
    }
    return {
      drawerVisible,
      openDrawer,
      closeDrawer,
      operateType,
      checkedRowKeys,
      handleAdd,
      handleEdit,
      onBatchDeleted,
      onDeleted,
      onMessage
    };
  }
  return { useTable, useTableOperate };
}
</script>
<style scoped>
.toolbar {
  margin: 12px 0;
}
</style>
