<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
      <PluginFormCard :title="t('plugin.codegen.title')" :model="searchParams" :label-width="80">
        <n-grid cols="24" x-gap="16" y-gap="8" responsive="screen">
          <n-form-item-gi :label="t('plugin.codegen.search.tableName')" span="12">
            <n-input v-model:value="searchParams.tableName" :placeholder="t('plugin.codegen.search.placeholder')" />
          </n-form-item-gi>
          <n-form-item-gi span="12">
            <n-space justify="end" class="w-full">
              <n-button type="primary" ghost @click="getDataByPage(1)">
                <template #icon>
                  <IconSearch class="text-icon" />
                </template>
                {{ t('plugin.codegen.actions.search') }}
              </n-button>
              <n-button quaternary @click="resetSearchParams">
                <template #icon>
                  <IconRefresh class="text-icon" />
                </template>
                {{ t('plugin.codegen.actions.reset') }}
              </n-button>
            </n-space>
          </n-form-item-gi>
        </n-grid>
      </PluginFormCard>

      <n-card :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :loading="loading"
          :checked-row-keys="checkedRowKeys"
          @add="openCreate"
          @delete="batchDelete"
          @refresh="getData"
        />
        <n-data-table
          remote
          striped
          size="small"
          class="sm:h-full"
          :loading="loading"
          :columns="columns"
          :data="data"
          :pagination="pagination"
          :row-key="row => row.id"
          v-model:checked-row-keys="checkedRowKeys"
          :single-line="false"
          :scroll-x="1200"
          :flex-height="!isMobile"
        />
      </n-card>

    <n-drawer v-model:show="modalVisible" placement="right" :width="900">
      <n-drawer-content :title="modalTitle" closable>
      <n-tabs v-model:value="step" type="segment" size="small" animated>
        <n-tab-pane :name="1" :tab="t('plugin.codegen.step.base')" disabled>
          <n-form ref="formRef" :model="formModel" :rules="rules" label-placement="left" label-width="120">
            <n-grid cols="24" x-gap="16" y-gap="8" responsive="screen">
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.tableName')" path="tableName">
                <n-select
                  v-model:value="formModel.tableName"
                  label-field="tableName"
                  value-field="tableName"
                  :options="dataTableOptions"
                  :placeholder="t('plugin.codegen.fields.tableNamePlaceholder')"
                  filterable
                  clearable
                  :disabled="isEdit"
                  @update:value="handleTableSelect"
                />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.tableComment')">
                <n-input v-model:value="formModel.tableComment" :disabled="isEdit" />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.tablePrefix')">
                <n-input v-model:value="formModel.tablePrefix" :disabled="isEdit" />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.pluginId')" path="pluginId">
                <n-input v-model:value="formModel.pluginId" />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.pluginName')" path="pluginName">
                <n-input v-model:value="formModel.pluginName" />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.version')">
                <n-input v-model:value="formModel.version" />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.parentPackage')" path="parentPackage">
                <n-input v-model:value="formModel.parentPackage" />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.moduleName')" path="moduleName">
                <n-input v-model:value="formModel.moduleName" />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.routePath')">
                <n-input v-model:value="formModel.routePath" />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.menuName')">
                <n-input v-model:value="formModel.menuName" />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.i18nKey')">
                <n-input v-model:value="formModel.i18nKey" />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.icon')">
                <n-input v-model:value="formModel.icon" />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.includeTableSql')">
                <n-switch v-model:value="formModel.includeTableSql" checked-value="1" unchecked-value="0" />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.parentMenuId')">
                <n-input-number v-model:value="formModel.parentMenuId" class="w-full" />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.author')" path="author">
                <n-input v-model:value="formModel.author" />
              </n-form-item-gi>
              <n-form-item-gi span="12" :label="t('plugin.codegen.fields.status')">
                <n-select v-model:value="formModel.status" :options="statusOptions" />
              </n-form-item-gi>
            </n-grid>
          </n-form>
        </n-tab-pane>

        <n-tab-pane :name="2" :tab="t('plugin.codegen.step.columns')" disabled>
          <n-space class="mb-12">
            <n-button type="error" @click="cleanColumns">
              {{ t('plugin.codegen.actions.cleanColumns') }}
            </n-button>
            <n-button type="warning" @click="syncColumns">
              {{ t('plugin.codegen.actions.syncColumns') }}
            </n-button>
          </n-space>
          <n-data-table
            :loading="columnLoading"
            :columns="columnColumns"
            :data="columnData"
            :scroll-x="5200"
            size="small"
            :row-key="row => row.id"
          />
        </n-tab-pane>

        <n-tab-pane :name="3" :tab="t('plugin.codegen.step.result')" disabled>
          <n-result status="success" :title="t('plugin.codegen.result.title')">
            <template #footer>
              <n-button type="primary" @click="downloadZip">
                {{ t('plugin.codegen.actions.generate') }}
              </n-button>
            </template>
          </n-result>
        </n-tab-pane>
      </n-tabs>

        <template #footer>
          <n-space justify="end">
            <n-button v-if="step > 1" @click="step -= 1">
              {{ t('plugin.codegen.actions.prev') }}
            </n-button>
            <n-button v-if="step < 3" type="primary" :loading="saving" @click="nextStep">
              {{ t('plugin.codegen.actions.next') }}
            </n-button>
          </n-space>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import * as VueNamespace from 'vue';
import { useI18n } from 'vue-i18n';
import type { DataTableColumns, FormInst, FormRules } from 'naive-ui';
import {
  NButton,
  NCard,
  NDataTable,
  NDrawer,
  NDrawerContent,
  NFormItemGi,
  NGrid,
  NInput,
  NInputNumber,
  NResult,
  NSelect,
  NSpace,
  NSwitch,
  NTabPane,
  NTabs,
  NTag
} from 'naive-ui';
import {
  cleanColumns,
  deleteTables,
  downloadTableZip,
  fetchColumns,
  fetchDataTables,
  fetchDictOptions,
  fetchTableDetail,
  fetchTablePage,
  saveTable,
  syncColumns,
  updateColumns
} from '../api';
import { IconRefresh, IconSearch, PluginFormCard, TableHeaderOperation } from '@tt/plugin-ui';

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
};

const pluginApi = (window as any).__TT_PLUGIN_API__ as PluginApi | undefined;

const fallbackHooks = createFallbackTableHooks();
const isSharedVue = typeof window !== 'undefined' && (window as any).Vue && (window as any).Vue === VueNamespace;
const allowHostHooks = !import.meta.env.DEV && isSharedVue;
const useTableHook = allowHostHooks && pluginApi?.useTable ? pluginApi.useTable : fallbackHooks.useTable;
const useTableOperateHook =
  allowHostHooks && pluginApi?.useTableOperate ? pluginApi.useTableOperate : fallbackHooks.useTableOperate;

import type { CodegenColumn, CodegenTable, DataTableInfo, DictOption } from '../api';

const modalVisible = ref(false);
const step = ref(1);
const saving = ref(false);
const formRef = ref<FormInst | null>(null);
const dataTableOptions = ref<DataTableInfo[]>([]);
const dictOptions = ref<DictOption[]>([]);
const columnData = ref<CodegenColumn[]>([]);
const columnLoading = ref(false);

const statusOptions = [
  { label: t('plugin.codegen.status.enabled'), value: '1' },
  { label: t('plugin.codegen.status.disabled'), value: '0' }
];

const renderTypeOptions = computed(() => [
  { label: t('plugin.codegen.renderType.input'), value: 'input' },
  { label: t('plugin.codegen.renderType.textarea'), value: 'textarea' },
  { label: t('plugin.codegen.renderType.number'), value: 'number' },
  { label: t('plugin.codegen.renderType.select'), value: 'select' },
  { label: t('plugin.codegen.renderType.radio'), value: 'radio' },
  { label: t('plugin.codegen.renderType.switch'), value: 'switch' },
  { label: t('plugin.codegen.renderType.date'), value: 'date' },
  { label: t('plugin.codegen.renderType.datetime'), value: 'datetime' },
  { label: t('plugin.codegen.renderType.daterange'), value: 'daterange' },
  { label: t('plugin.codegen.renderType.datetimerange'), value: 'datetimerange' }
]);

const searchTypeOptions = computed(() => [
  { label: t('plugin.codegen.searchType.equal'), value: 'equal' },
  { label: t('plugin.codegen.searchType.noEqual'), value: 'noEqual' },
  { label: t('plugin.codegen.searchType.like'), value: 'like' },
  { label: t('plugin.codegen.searchType.leftLike'), value: 'leftLike' },
  { label: t('plugin.codegen.searchType.rightLike'), value: 'rightLike' },
  { label: t('plugin.codegen.searchType.greaterThan'), value: 'greaterThan' },
  { label: t('plugin.codegen.searchType.greaterThanOrEqual'), value: 'greaterThanOrEqual' },
  { label: t('plugin.codegen.searchType.lessThan'), value: 'lessThan' },
  { label: t('plugin.codegen.searchType.lessThanOrEqual'), value: 'lessThanOrEqual' },
  { label: t('plugin.codegen.searchType.in'), value: 'in' },
  { label: t('plugin.codegen.searchType.notIn'), value: 'notIn' },
  { label: t('plugin.codegen.searchType.between'), value: 'between' },
  { label: t('plugin.codegen.searchType.notBetween'), value: 'notBetween' }
]);

const formModel = reactive<CodegenTable>(createDefaultModel());

const rules: FormRules = {
  tableName: { required: true, message: t('plugin.codegen.rules.tableName'), trigger: ['blur', 'change'] },
  pluginId: { required: true, message: t('plugin.codegen.rules.pluginId'), trigger: ['blur', 'input'] },
  pluginName: { required: true, message: t('plugin.codegen.rules.pluginName'), trigger: ['blur', 'input'] },
  parentPackage: { required: true, message: t('plugin.codegen.rules.parentPackage'), trigger: ['blur', 'input'] },
  moduleName: { required: true, message: t('plugin.codegen.rules.moduleName'), trigger: ['blur', 'input'] },
  author: { required: true, message: t('plugin.codegen.rules.author'), trigger: ['blur', 'input'] }
};

const modalTitle = computed(() =>
  isEdit.value ? t('plugin.codegen.modal.edit') : t('plugin.codegen.modal.add')
);

const createTableColumns = (): DataTableColumns<CodegenTable> => [
  { type: 'selection', width: 48, align: 'center' },
  { title: t('plugin.codegen.fields.tableName'), key: 'tableName', width: 160, ellipsis: { tooltip: true } },
  { title: t('plugin.codegen.fields.tableComment'), key: 'tableComment', width: 120, ellipsis: { tooltip: true } },
  { title: t('plugin.codegen.fields.tablePrefix'), key: 'tablePrefix', width: 120 },
  { title: t('plugin.codegen.fields.parentPackage'), key: 'parentPackage', width: 120, ellipsis: { tooltip: true } },
  { title: t('plugin.codegen.fields.moduleName'), key: 'moduleName', width: 140 },
  { title: t('plugin.codegen.fields.author'), key: 'author', width: 140, ellipsis: { tooltip: true } },
  { title: t('plugin.codegen.fields.pluginId'), key: 'pluginId', width: 180, ellipsis: { tooltip: true } },
  {
    title: t('plugin.codegen.fields.status'),
    key: 'status',
    width: 100,
    render: row =>
      h(
        NTag,
        { type: row.status === '1' ? 'success' : 'default', size: 'small' },
        { default: () => (row.status === '1' ? t('plugin.codegen.status.enabled') : t('plugin.codegen.status.disabled')) }
      )
  },
  {
    title: t('plugin.codegen.fields.createTime'),
    key: 'createTime',
    width: 180,
    render: row => formatDateTime(row.createTime)
  },
  {
    title: t('plugin.codegen.actions.action'),
    key: 'action',
    width: 160,
    fixed: 'right',
    render: row =>
      h(NSpace, {}, {
        default: () => [
          h(
            NButton,
            {
              size: 'small',
              type: 'primary',
              quaternary: true,
              onClick: () => openEdit(row)
            },
            { default: () => t('plugin.codegen.actions.edit') }
          ),
          h(
            NButton,
            {
              size: 'small',
              type: 'error',
              quaternary: true,
              onClick: () => deleteRow(row)
            },
            { default: () => t('plugin.codegen.actions.delete') }
          )
        ]
      })
  }
];

const columnColumns: DataTableColumns<CodegenColumn> = [
  { title: t('plugin.codegen.column.ordinalPosition'), key: 'ordinalPosition', width: 100 },
  { title: t('plugin.codegen.column.columnName'), key: 'columnName', width: 160, ellipsis: { tooltip: true } },
  {
    title: t('plugin.codegen.column.propertyName'),
    key: 'propertyName',
    width: 160,
    render: row =>
      h(NInput, {
        value: row.propertyName,
        size: 'small',
        'onUpdate:value': (value: string) => {
          row.propertyName = value;
        }
      })
  },
  {
    title: t('plugin.codegen.column.columnComment'),
    key: 'columnComment',
    width: 180,
    render: row =>
      h(NInput, {
        value: row.columnComment,
        size: 'small',
        'onUpdate:value': (value: string) => {
          row.columnComment = value;
        }
      })
  },
  { title: t('plugin.codegen.column.dataType'), key: 'dataType', width: 120 },
  { title: t('plugin.codegen.column.javaType'), key: 'javaType', width: 120 },
  { title: t('plugin.codegen.column.typeScriptType'), key: 'typeScriptType', width: 120 },
  {
    title: t('plugin.codegen.column.i18n'),
    key: 'i18n',
    width: 100,
    render: row =>
      h(NSwitch, {
        value: row.i18n,
        'onUpdate:value': (value: string) => {
          row.i18n = value;
        },
        checkedValue: '1',
        uncheckedValue: '0',
        size: 'small'
      })
  },
  {
    title: t('plugin.codegen.column.required'),
    key: 'required',
    width: 100,
    render: row =>
      h(NSwitch, {
        value: row.required,
        'onUpdate:value': (value: string) => {
          row.required = value;
        },
        checkedValue: '1',
        uncheckedValue: '0',
        size: 'small'
      })
  },
  {
    title: t('plugin.codegen.column.list'),
    key: 'list',
    width: 100,
    render: row =>
      h(NSwitch, {
        value: row.list,
        'onUpdate:value': (value: string) => {
          row.list = value;
        },
        checkedValue: '1',
        uncheckedValue: '0',
        size: 'small'
      })
  },
  {
    title: t('plugin.codegen.column.search'),
    key: 'search',
    width: 100,
    render: row =>
      h(NSwitch, {
        value: row.search,
        'onUpdate:value': (value: string) => {
          row.search = value;
        },
        checkedValue: '1',
        uncheckedValue: '0',
        size: 'small'
      })
  },
  {
    title: t('plugin.codegen.column.searchType'),
    key: 'searchType',
    width: 160,
    render: row =>
      h(NSelect, {
        value: row.searchType,
        options: searchTypeOptions.value,
        size: 'small',
        clearable: true,
        'onUpdate:value': (value: string) => {
          row.searchType = value;
        }
      })
  },
  {
    title: t('plugin.codegen.column.added'),
    key: 'added',
    width: 100,
    render: row =>
      h(NSwitch, {
        value: row.added,
        'onUpdate:value': (value: string) => {
          row.added = value;
        },
        checkedValue: '1',
        uncheckedValue: '0',
        size: 'small'
      })
  },
  {
    title: t('plugin.codegen.column.edit'),
    key: 'edit',
    width: 100,
    render: row =>
      h(NSwitch, {
        value: row.edit,
        'onUpdate:value': (value: string) => {
          row.edit = value;
        },
        checkedValue: '1',
        uncheckedValue: '0',
        size: 'small'
      })
  },
  {
    title: t('plugin.codegen.column.renderType'),
    key: 'renderType',
    width: 160,
    render: row =>
      h(NSelect, {
        value: row.renderType,
        options: renderTypeOptions.value,
        size: 'small',
        clearable: true,
        'onUpdate:value': (value: string) => {
          row.renderType = value;
        }
      })
  },
  {
    title: t('plugin.codegen.column.dictCode'),
    key: 'dictCode',
    width: 180,
    render: row =>
      h(NSelect, {
        value: row.dictCode,
        options: dictOptions.value,
        size: 'small',
        clearable: true,
        filterable: true,
        'onUpdate:value': (value: string) => {
          row.dictCode = value;
        }
      })
  },
  {
    title: t('plugin.codegen.column.formDisabled'),
    key: 'formDisabled',
    width: 120,
    render: row =>
      h(NSwitch, {
        value: row.formDisabled,
        'onUpdate:value': (value: string) => {
          row.formDisabled = value;
        },
        checkedValue: '1',
        uncheckedValue: '0',
        size: 'small'
      })
  },
  {
    title: t('plugin.codegen.column.formReadonly'),
    key: 'formReadonly',
    width: 120,
    render: row =>
      h(NSwitch, {
        value: row.formReadonly,
        'onUpdate:value': (value: string) => {
          row.formReadonly = value;
        },
        checkedValue: '1',
        uncheckedValue: '0',
        size: 'small'
      })
  },
  {
    title: t('plugin.codegen.column.minLength'),
    key: 'minLength',
    width: 120,
    render: row =>
      h(NInputNumber, {
        value: row.minLength,
        min: 0,
        max: 2000,
        size: 'small',
        class: 'w-full',
        'onUpdate:value': (value: number | null) => {
          row.minLength = value ?? undefined;
        }
      })
  },
  {
    title: t('plugin.codegen.column.maxLength'),
    key: 'maxLength',
    width: 120,
    render: row =>
      h(NInputNumber, {
        value: row.maxLength,
        min: 0,
        max: 2000,
        size: 'small',
        class: 'w-full',
        'onUpdate:value': (value: number | null) => {
          row.maxLength = value ?? undefined;
        }
      })
  },
  {
    title: t('plugin.codegen.column.minValue'),
    key: 'minValue',
    width: 120,
    render: row =>
      h(NInputNumber, {
        value: row.minValue,
        size: 'small',
        class: 'w-full',
        'onUpdate:value': (value: number | null) => {
          row.minValue = value ?? undefined;
        }
      })
  },
  {
    title: t('plugin.codegen.column.maxValue'),
    key: 'maxValue',
    width: 120,
    render: row =>
      h(NInputNumber, {
        value: row.maxValue,
        size: 'small',
        class: 'w-full',
        'onUpdate:value': (value: number | null) => {
          row.maxValue = value ?? undefined;
        }
      })
  },
  {
    title: t('plugin.codegen.column.pattern'),
    key: 'pattern',
    width: 180,
    render: row =>
      h(NInput, {
        value: row.pattern,
        size: 'small',
        'onUpdate:value': (value: string) => {
          row.pattern = value;
        }
      })
  },
  {
    title: t('plugin.codegen.column.componentProps'),
    key: 'componentProps',
    width: 200,
    render: row =>
      h(NInput, {
        value: row.componentProps,
        size: 'small',
        'onUpdate:value': (value: string) => {
          row.componentProps = value;
        }
      })
  },
  {
    title: t('plugin.codegen.column.formSpan'),
    key: 'formSpan',
    width: 120,
    render: row =>
      h(NInputNumber, {
        value: row.formSpan,
        min: 1,
        max: 24,
        size: 'small',
        class: 'w-full',
        'onUpdate:value': (value: number | null) => {
          row.formSpan = value ?? 12;
        }
      })
  },
  {
    title: t('plugin.codegen.column.searchSpan'),
    key: 'searchSpan',
    width: 120,
    render: row =>
      h(NInputNumber, {
        value: row.searchSpan,
        min: 1,
        max: 24,
        size: 'small',
        class: 'w-full',
        'onUpdate:value': (value: number | null) => {
          row.searchSpan = value ?? 12;
        }
      })
  },
  {
    title: t('plugin.codegen.column.listWidth'),
    key: 'listWidth',
    width: 140,
    render: row =>
      h(NInputNumber, {
        value: row.listWidth,
        min: 80,
        max: 600,
        size: 'small',
        class: 'w-full',
        'onUpdate:value': (value: number | null) => {
          row.listWidth = value ?? 160;
        }
      })
  },
  {
    title: t('plugin.codegen.column.placeholder'),
    key: 'placeholder',
    width: 200,
    render: row =>
      h(NInput, {
        value: row.placeholder,
        size: 'small',
        'onUpdate:value': (value: string) => {
          row.placeholder = value;
        }
      })
  },
  {
    title: t('plugin.codegen.column.defaultValue'),
    key: 'defaultValue',
    width: 160,
    render: row =>
      h(NInput, {
        value: row.defaultValue,
        size: 'small',
        'onUpdate:value': (value: string) => {
          row.defaultValue = value;
        }
      })
  },
  {
    title: t('plugin.codegen.column.status'),
    key: 'status',
    width: 100,
    render: row =>
      h(NSwitch, {
        value: row.status,
        'onUpdate:value': (value: string) => {
          row.status = value;
        },
        checkedValue: '1',
        uncheckedValue: '0',
        size: 'small'
      })
  }
];

const baseSearchParams = {
  page: 1,
  pageSize: 20,
  tableName: ''
};

const { loading, data, columns, columnChecks, pagination, getData, getDataByPage, searchParams, resetSearchParams } = useTableHook({
  apiFn: fetchTablePage,
  apiParams: baseSearchParams,
  columns: createTableColumns,
  transformer: res => {
    const { records = [], page = 1, pageSize = 20, total = 0 } = res?.data || {};
    const dataWithIndex = records.map((item: any, index: number) => ({
      ...item,
      id: item.id ?? item.tableId ?? item.tableName,
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
  checkedRowKeys,
  onBatchDeleted,
  onDeleted,
  onMessage,
  operateType,
  handleAdd,
  handleEdit
} = useTableOperateHook(data, getData);

const isEdit = computed(() => operateType.value === 'edit');


function createDefaultModel(): CodegenTable {
  return {
    tableName: '',
    tableComment: '',
    tablePrefix: '',
    pluginId: '',
    pluginName: '',
    version: '1.0.0',
    parentPackage: 'com.tt.plugin',
    moduleName: '',
    routePath: '',
    menuName: '',
    i18nKey: '',
    icon: 'mdi:code-tags',
    includeTableSql: '1',
    parentMenuId: 0,
    author: 'tt',
    status: '1'
  };
}

function formatDateTime(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
}

async function loadDataTables() {
  dataTableOptions.value = await fetchDataTables();
}

async function loadDictOptions() {
  dictOptions.value = await fetchDictOptions();
}

function getPrefix(tableName: string) {
  const index = tableName.indexOf('_');
  if (index !== -1) {
    return tableName.substring(0, index + 1);
  }
  return '';
}

function toModuleName(name: string) {
  return name.replace(/_/g, '-').toLowerCase();
}

function handleTableSelect(value: string, option: DataTableInfo) {
  if (!value) return;
  const prefix = getPrefix(value);
  const rawName = prefix && value.startsWith(prefix) ? value.slice(prefix.length) : value;
  const moduleName = toModuleName(rawName);
  formModel.tablePrefix = prefix;
  formModel.tableComment = option?.tableComment || value;
  formModel.moduleName = moduleName;
  formModel.pluginId = `tt-plugin-${moduleName}`;
  formModel.pluginName = formModel.tableComment || value;
  formModel.routePath = `/${moduleName}`;
  formModel.menuName = formModel.pluginName;
  formModel.i18nKey = `plugin.${moduleName}.title`;
  formModel.parentPackage = `com.tt.plugin`;
}

function openCreate() {
  handleAdd();
  step.value = 1;
  Object.assign(formModel, createDefaultModel());
  modalVisible.value = true;
  loadDataTables();
  loadDictOptions();
  columnData.value = [];
}

async function openEdit(row: CodegenTable) {
  handleEdit(row.id);
  step.value = 1;
  modalVisible.value = true;
  loadDictOptions();
  const data = await fetchTableDetail(row.id!);
  Object.assign(formModel, data);
  await loadColumns(row.id!);
}

async function loadColumns(tableId: number) {
  columnLoading.value = true;
  try {
    const data = await fetchColumns(tableId);
    columnData.value = Array.isArray(data) ? data : [];
  } finally {
    columnLoading.value = false;
  }
}

async function nextStep() {
  if (step.value === 1) {
    await saveBase();
    await loadColumns(formModel.id!);
    step.value = 2;
    return;
  }
  if (step.value === 2) {
    if (columnData.value.length === 0) {
      window.$message?.warning(t('plugin.codegen.tips.emptyColumns'));
      return;
    }
    saving.value = true;
    try {
      await updateColumns(columnData.value);
      step.value = 3;
    } finally {
      saving.value = false;
    }
  }
}

async function saveBase() {
  await formRef.value?.validate();
  saving.value = true;
  try {
    const data = await saveTable(formModel, isEdit.value);
    Object.assign(formModel, data);
    if (!isEdit.value) {
      operateType.value = 'edit';
    }
    await onMessage();
  } finally {
    saving.value = false;
  }
}

async function deleteRow(row: CodegenTable) {
  if (!row.id) return;
  if (!confirmAction(t('plugin.codegen.tips.deleteConfirm'))) return;
  await deleteTables([row.id]);
  await onDeleted();
}

async function batchDelete() {
  if (checkedRowKeys.value.length === 0) return;
  if (!confirmAction(t('plugin.codegen.tips.batchDeleteConfirm'))) return;
  await deleteTables(checkedRowKeys.value as number[]);
  await onBatchDeleted();
}

async function syncColumns() {
  if (!formModel.id) return;
  if (!confirmAction(t('plugin.codegen.tips.syncConfirm'))) return;
  columnLoading.value = true;
  try {
    const data = await syncColumns(formModel.id);
    columnData.value = Array.isArray(data) ? data : [];
  } finally {
    columnLoading.value = false;
  }
}

async function cleanColumns() {
  if (!formModel.id) return;
  if (!confirmAction(t('plugin.codegen.tips.cleanConfirm'))) return;
  await cleanColumns(formModel.id);
  columnData.value = [];
}

async function downloadZip() {
  if (!formModel.id) return;
  const payload = await downloadTableZip(formModel.id);
  const a = document.createElement('a');
  a.href = payload.url;
  a.download = payload.filename;
  a.click();
  URL.revokeObjectURL(payload.url);
}

function confirmAction(message: string) {
  return window.confirm(message);
}

function createFallbackTableHooks() {
  const vueRuntime = (typeof window !== 'undefined' && (window as any).Vue) ? (window as any).Vue : VueNamespace;
  const { ref: hostRef, reactive: hostReactive, computed: hostComputed } = vueRuntime;
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
    const loading = hostRef(false);
    const data = hostRef<any[]>([]);
    const searchParams = hostReactive({ ...(config.apiParams || {}) });
    const rawColumns = hostComputed(() => config.columns());
    const columnChecks = hostRef<any[]>([]);

    const columns = hostComputed(() => {
      const cols = rawColumns.value || [];
      if (columnChecks.value.length === 0) {
        columnChecks.value = getColumnChecks(cols);
      }
      return buildColumns(cols, columnChecks.value);
    });

    const pagination = hostReactive({
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

  function useTableOperate(data: any, getData: () => Promise<void>) {
    const checkedRowKeys = hostRef<any[]>([]);
    const operateType = hostRef('add');

    function handleAdd() {
      operateType.value = 'add';
    }

    function handleEdit(_id: any) {
      operateType.value = 'edit';
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
      checkedRowKeys,
      operateType,
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
