<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <n-card :title="t('plugin.${ctx.moduleName}.title')" :bordered="false" size="small" class="card-wrapper">
      <n-form :model="searchParams" label-width="80" label-placement="left">
        <n-grid cols="24" x-gap="16" y-gap="8" responsive="screen">
<#list searchColumns as column>
          <n-form-item-gi
            :span="${column.searchSpan!12}"
            :label="<#if column.i18n?? && column.i18n == '1'>t('plugin.${ctx.moduleName}.${column.fieldName}')<#else>'${column.comment?js_string}'</#if>"
          >
<#if column.searchType?? && (column.searchType == "between" || column.searchType == "notBetween")>
            <n-date-picker v-model:value="searchParams.${column.fieldName}" type="datetimerange" clearable class="w-full" />
<#elseif column.renderType?? && (column.renderType == "date" || column.renderType == "datetime" || column.renderType == "daterange" || column.renderType == "datetimerange")>
            <n-date-picker v-model:value="searchParams.${column.fieldName}" type="${column.renderType}" clearable class="w-full" />
<#elseif column.renderType?? && (column.renderType == "select" || column.renderType == "radio")>
            <n-select
              v-model:value="searchParams.${column.fieldName}"
              :options="dictOptions['${column.dictCode!''}'] || []"
              clearable
              filterable
              :placeholder="'${column.placeholder?js_string}'"
              v-bind="parseComponentProps('${column.componentProps?js_string}')"
            />
<#elseif column.renderType?? && column.renderType == "switch">
            <n-switch v-model:value="searchParams.${column.fieldName}" checked-value="1" unchecked-value="0" />
<#elseif column.renderType?? && column.renderType == "number">
            <n-input-number
              v-model:value="searchParams.${column.fieldName}"
              class="w-full"
              :placeholder="'${column.placeholder?js_string}'"
              <#if column.minValue??> :min="${column.minValue}"</#if>
              <#if column.maxValue??> :max="${column.maxValue}"</#if>
              v-bind="parseComponentProps('${column.componentProps?js_string}')"
            />
<#else>
            <n-input
              v-model:value="searchParams.${column.fieldName}"
              :placeholder="'${column.placeholder?js_string}'"
              <#if column.maxLength??> :maxlength="${column.maxLength}"</#if>
              v-bind="parseComponentProps('${column.componentProps?js_string}')"
            />
</#if>
          </n-form-item-gi>
</#list>
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
      <div v-else class="flex items-center justify-between gap-12px">
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
        striped
        size="small"
        class="sm:h-full"
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="pagination"
        :row-key="row => row.${primaryKey.fieldName}"
        v-model:checked-row-keys="checkedRowKeys"
        :single-line="false"
        :scroll-x="1200"
      />
    </n-card>

    <n-drawer v-model:show="showModal" placement="right" :width="560">
      <n-drawer-content :title="modalTitle" closable>
        <n-form :model="formModel" :rules="rules" label-width="100">
        <n-grid cols="24" x-gap="16" y-gap="8" responsive="screen">
<#list formColumns as column>
        <n-form-item-gi
          v-if="(isEdit && ${((column.edit!'1') == '1')?string('true','false')}) || (!isEdit && ${((column.added!'1') == '1')?string('true','false')})"
          :span="${column.formSpan!12}"
          :label="<#if column.i18n?? && column.i18n == '1'>t('plugin.${ctx.moduleName}.${column.fieldName}')<#else>'${column.comment?js_string}'</#if>"
          path="${column.fieldName}"
        >
<#if column.renderType?? && column.renderType == "textarea">
          <n-input
            v-model:value="formModel.${column.fieldName}"
            type="textarea"
            :placeholder="'${column.placeholder?js_string}'"
            :disabled="${((column.formDisabled!'0') == '1')?string('true','false')}"
            :readonly="${((column.formReadonly!'0') == '1')?string('true','false')}"
            <#if column.maxLength??> :maxlength="${column.maxLength}"</#if>
            v-bind="parseComponentProps('${column.componentProps?js_string}')"
          />
<#elseif column.renderType?? && (column.renderType == "select" || column.renderType == "radio")>
          <n-select
            v-model:value="formModel.${column.fieldName}"
            :options="dictOptions['${column.dictCode!''}'] || []"
            clearable
            filterable
            :placeholder="'${column.placeholder?js_string}'"
            :disabled="${((column.formDisabled!'0') == '1')?string('true','false')}"
            v-bind="parseComponentProps('${column.componentProps?js_string}')"
          />
<#elseif column.renderType?? && column.renderType == "switch">
          <n-switch
            v-model:value="formModel.${column.fieldName}"
            checked-value="1"
            unchecked-value="0"
            :disabled="${((column.formDisabled!'0') == '1')?string('true','false')}"
            v-bind="parseComponentProps('${column.componentProps?js_string}')"
          />
<#elseif column.renderType?? && (column.renderType == "date" || column.renderType == "datetime" || column.renderType == "daterange" || column.renderType == "datetimerange")>
          <n-date-picker
            v-model:value="formModel.${column.fieldName}"
            type="${column.renderType}"
            clearable
            class="w-full"
            :disabled="${((column.formDisabled!'0') == '1')?string('true','false')}"
            v-bind="parseComponentProps('${column.componentProps?js_string}')"
          />
<#elseif column.renderType?? && column.renderType == "number">
          <n-input-number
            v-model:value="formModel.${column.fieldName}"
            class="w-full"
            :placeholder="'${column.placeholder?js_string}'"
            <#if column.minValue??> :min="${column.minValue}"</#if>
            <#if column.maxValue??> :max="${column.maxValue}"</#if>
            :disabled="${((column.formDisabled!'0') == '1')?string('true','false')}"
            :readonly="${((column.formReadonly!'0') == '1')?string('true','false')}"
            v-bind="parseComponentProps('${column.componentProps?js_string}')"
          />
<#else>
          <n-input
            v-model:value="formModel.${column.fieldName}"
            :placeholder="'${column.placeholder?js_string}'"
            :disabled="${((column.formDisabled!'0') == '1')?string('true','false')}"
            :readonly="${((column.formReadonly!'0') == '1')?string('true','false')}"
            <#if column.maxLength??> :maxlength="${column.maxLength}"</#if>
            v-bind="parseComponentProps('${column.componentProps?js_string}')"
          />
</#if>
        </n-form-item-gi>
</#list>
        </n-grid>
        </n-form>
        <template #footer>
          <n-space justify="end">
            <n-button @click="closeModal">{{ t('common.cancel') }}</n-button>
            <n-button type="primary" @click="submitForm">{{ t('common.confirm') }}</n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, h, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  NButton,
  NCard,
  NDataTable,
  NDatePicker,
  NDrawer,
  NDrawerContent,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NInputNumber,
  NSelect,
  NSpace,
  NSwitch
} from 'naive-ui';
import type { FormRules } from 'naive-ui';
import { request } from '@tt/plugin-sdk';

const { t } = useI18n();

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

const formModel = reactive({
<#list columns as column>
  ${column.fieldName}: ${column.defaultValue}<#if column_has_next>,</#if>
</#list>
});

const dictOptions = reactive<Record<string, { label: string; value: string }[]>>({});

const rules: FormRules = {
<#list formColumns as column>
<#assign hasRule = (column.required == "1") || (column.maxLength??) || (column.minLength??) || (column.pattern??) || (column.minValue??) || (column.maxValue??)>
<#if hasRule>
  ${column.fieldName}: [
  <#if column.required == "1">
    { required: true, message: '${column.comment?js_string}不能为空', trigger: ['input', 'blur'] },
  </#if>
  <#if column.minLength?? || column.maxLength??>
    {
      type: 'string',
    <#if column.minLength??>
      min: ${column.minLength},
    </#if>
    <#if column.maxLength??>
      max: ${column.maxLength},
    </#if>
      message: '${column.comment?js_string}长度不符合要求',
      trigger: ['input', 'blur']
    },
  </#if>
  <#if column.pattern?? && column.pattern?has_content>
    { pattern: new RegExp('${column.pattern?js_string}'), message: '${column.comment?js_string}格式不正确', trigger: ['input', 'blur'] },
  </#if>
  <#if column.javaType == "Integer" || column.javaType == "Long" || column.javaType == "Double" || column.javaType == "BigDecimal">
  <#if column.minValue?? || column.maxValue??>
    {
      type: 'number',
    <#if column.minValue??>
      min: ${column.minValue},
    </#if>
    <#if column.maxValue??>
      max: ${column.maxValue},
    </#if>
      message: '${column.comment?js_string}超出范围',
      trigger: ['input', 'blur']
    },
  </#if>
  </#if>
  ],
</#if>
</#list>
};

function parseComponentProps(raw: string) {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

const baseSearchParams = {
  page: 1,
  pageSize: 10,
<#list searchColumns as column>
<#if column.searchType?? && (column.searchType == "between" || column.searchType == "notBetween" || column.searchType == "in" || column.searchType == "notIn")>
  ${column.fieldName}: [],
<#elseif column.javaType == "Integer" || column.javaType == "Long" || column.javaType == "Double" || column.javaType == "BigDecimal">
  ${column.fieldName}: null,
<#else>
  ${column.fieldName}: '',
</#if>
</#list>
};

function createColumnFactory() {
  return [
    { type: 'selection', width: 48, align: 'center' },
<#list listColumns as column>
    { title: <#if column.i18n?? && column.i18n == '1'>t('plugin.${ctx.moduleName}.${column.fieldName}')<#else>'${column.comment?js_string}'</#if>, key: '${column.fieldName}', width: ${column.listWidth!160}, ellipsis: { tooltip: true } },
</#list>
    {
      title: t('common.action'),
      key: 'action',
      render: (row: any) =>
        h(NSpace, {}, {
          default: () => [
            h(NButton, { size: 'small', type: 'primary', quaternary: true, onClick: () => openEdit(row) }, { default: () => t('common.edit') }),
            h(NButton, { size: 'small', type: 'error', quaternary: true, onClick: () => removeRow(row) }, { default: () => t('common.delete') })
          ]
        })
    }
  ];
}

async function fetchPage(params: Record<string, any>) {
  return await requestPost('/plugin/${ctx.moduleName}/page', params);
}

const { loading, data, columns, columnChecks, pagination, getData, getDataByPage, searchParams, resetSearchParams } = useTableHook({
  apiFn: fetchPage,
  apiParams: baseSearchParams,
  columns: createColumnFactory,
  transformer: res => {
    const { records = [], page = 1, pageSize = 20, total = 0 } = res?.data || {};
    const dataWithIndex = records.map((item: any, index: number) => ({
      ...item,
      id: item.${primaryKey.fieldName},
      index: (page - 1) * pageSize + index + 1
    }));
    return {
      data: dataWithIndex,
      pageNum: page,
      pageSize,
      total
    };
  }
});

const {
  drawerVisible: showModal,
  closeDrawer: closeModal,
  operateType,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted,
  onMessage
} = useTableOperateHook(data, getData);

const isEdit = computed(() => operateType.value === 'edit');
const modalTitle = computed(() => (isEdit.value ? t('common.edit') : t('common.add')));
const tableHeaderComponent = computed(() => {
  const instance = getCurrentInstance();
  return pluginApi?.components?.TableHeaderOperation || instance?.appContext.components['TableHeaderOperation'] || null;
});

async function requestParams<T>(path: string, params?: Record<string, any>) {
  return await request<T>({ url: path, params });
}

async function requestPost<T>(path: string, data: any) {
  return await request<T>({ url: path, method: 'POST', data });
}

async function requestPut<T>(path: string, data: any) {
  return await request<T>({ url: path, method: 'PUT', data });
}

async function requestDelete<T>(path: string) {
  return await request<T>({ url: path, method: 'DELETE' });
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
    const data = ref([]);
    const searchParams = reactive({ ...(config.apiParams || {}) });
    const rawColumns = computed(() => config.columns());
    const columnChecks = ref([]);
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

  function useTableOperate(data: any, getData: () => Promise<void>) {
    const drawerVisible = ref(false);
    const operateType = ref('add');
    const editingData = ref(null);
    const checkedRowKeys = ref([]);

    function openDrawer() {
      drawerVisible.value = true;
    }

    function closeDrawer() {
      drawerVisible.value = false;
    }

    function handleAdd() {
      operateType.value = 'add';
      editingData.value = null;
      openDrawer();
    }

    function handleEdit(id: any) {
      operateType.value = 'edit';
      const findItem = data.value.find((item: any) => item.id === id) || null;
      editingData.value = findItem ? JSON.parse(JSON.stringify(findItem)) : null;
      openDrawer();
    }

    async function onDeleted() {
      window.$message?.success(t('common.deleteSuccess'));
      await getData();
    }

    async function onBatchDeleted() {
      window.$message?.success(t('common.deleteSuccess'));
      checkedRowKeys.value = [];
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
      editingData,
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


function resetForm(row?: any) {
<#list columns as column>
  formModel.${column.fieldName} = row?.${column.fieldName} ?? ${column.defaultValue};
</#list>
}

function openCreate() {
  handleAdd();
  resetForm();
}

function openEdit(row: any) {
  handleEdit(row.${primaryKey.fieldName});
  resetForm(row);
}

async function submitForm() {
  const payload = { ...formModel };
  const method = isEdit.value ? 'PUT' : 'POST';
  const result =
    method === 'PUT'
      ? await requestPut('/plugin/${ctx.moduleName}', payload)
      : await requestPost('/plugin/${ctx.moduleName}', payload);
  if (!result.error) {
    await onMessage(t('common.saveSuccess'));
    closeModal();
  }
}

async function removeRow(row: any) {
  if (!window.confirm(t('common.deleteConfirm'))) return;
  const result = await requestDelete('/plugin/${ctx.moduleName}/' + row.${primaryKey.fieldName});
  if (!result.error) {
    await onDeleted();
  }
}

async function batchDelete() {
  if (checkedRowKeys.value.length === 0) return;
  if (!window.confirm(t('common.confirmDelete'))) return;
  for (const id of checkedRowKeys.value) {
    const result = await requestDelete('/plugin/${ctx.moduleName}/' + id);
    if (result.error) {
      return;
    }
  }
  await onBatchDeleted();
}

async function loadDictOptions(code: string) {
  if (!code || dictOptions[code]) return;
  const dictListResult = await requestParams<any[]>('/system/dict/list', { code });
  const dictList = dictListResult.data || [];
  const dict = Array.isArray(dictList) ? dictList[0] : null;
  if (!dict?.id) {
    dictOptions[code] = [];
    return;
  }
  const itemsResult = await requestPost('/system/dict/item/page', { page: 1, pageSize: 200, dictId: dict.id });
  const items = itemsResult.data || {};
  dictOptions[code] = (items.records ?? []).map((item: any) => ({
    label: item.zhCn ?? item.value,
    value: item.value
  }));
}

onMounted(() => {
<#assign dictCodes = []>
<#list columns as column>
  <#if column.dictCode?? && column.dictCode?has_content>
    <#if !(dictCodes?seq_contains(column.dictCode))>
      <#assign dictCodes = dictCodes + [column.dictCode]>
    </#if>
  </#if>
</#list>
<#list dictCodes as code>
  loadDictOptions('${code}');
</#list>
});
</script>
