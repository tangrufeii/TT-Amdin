<template>
  <div class="plugin-page">
    <n-space vertical size="large">
      <n-card :title="t('plugin.${ctx.moduleName}.title')" size="small" bordered>
        <n-form :model="searchModel" label-width="80" label-placement="left">
          <n-grid cols="24" x-gap="16" y-gap="8" responsive="screen">
<#list searchColumns as column>
            <n-form-item-gi
              :span="${column.searchSpan!12}"
              :label="<#if column.i18n?? && column.i18n == '1'>t('plugin.${ctx.moduleName}.${column.fieldName}')<#else>'${column.comment?js_string}'</#if>"
            >
<#if column.searchType?? && (column.searchType == "between" || column.searchType == "notBetween")>
              <n-date-picker v-model:value="searchModel.${column.fieldName}" type="datetimerange" clearable class="w-full" />
<#elseif column.renderType?? && (column.renderType == "date" || column.renderType == "datetime" || column.renderType == "daterange" || column.renderType == "datetimerange")>
              <n-date-picker v-model:value="searchModel.${column.fieldName}" type="${column.renderType}" clearable class="w-full" />
<#elseif column.renderType?? && (column.renderType == "select" || column.renderType == "radio")>
              <n-select
                v-model:value="searchModel.${column.fieldName}"
                :options="dictOptions['${column.dictCode!''}'] || []"
                clearable
                filterable
                :placeholder="'${column.placeholder?js_string}'"
                v-bind="parseComponentProps('${column.componentProps?js_string}')"
              />
<#elseif column.renderType?? && column.renderType == "switch">
              <n-switch v-model:value="searchModel.${column.fieldName}" checked-value="1" unchecked-value="0" />
<#elseif column.renderType?? && column.renderType == "number">
              <n-input-number
                v-model:value="searchModel.${column.fieldName}"
                class="w-full"
                :placeholder="'${column.placeholder?js_string}'"
                <#if column.minValue??> :min="${column.minValue}"</#if>
                <#if column.maxValue??> :max="${column.maxValue}"</#if>
                v-bind="parseComponentProps('${column.componentProps?js_string}')"
              />
<#else>
              <n-input
                v-model:value="searchModel.${column.fieldName}"
                :placeholder="'${column.placeholder?js_string}'"
                <#if column.maxLength??> :maxlength="${column.maxLength}"</#if>
                v-bind="parseComponentProps('${column.componentProps?js_string}')"
              />
</#if>
            </n-form-item-gi>
</#list>
            <n-form-item-gi span="24">
              <n-space justify="end" class="w-full">
                <n-button type="primary" @click="loadData">{{ t('common.search') }}</n-button>
                <n-button @click="resetSearch">{{ t('common.reset') }}</n-button>
              </n-space>
            </n-form-item-gi>
          </n-grid>
        </n-form>

        <n-space justify="space-between" align="center" class="toolbar">
          <n-space>
            <n-button type="primary" @click="openCreate">{{ t('common.add') }}</n-button>
          </n-space>
          <n-button @click="loadData">{{ t('common.search') }}</n-button>
        </n-space>

        <n-data-table :columns="columns" :data="data" :loading="loading" :pagination="pagination" />
      </n-card>
    </n-space>

    <n-modal v-model:show="showModal" preset="card" :title="modalTitle" class="modal-card">
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
          <n-button @click="showModal = false">{{ t('common.cancel') }}</n-button>
          <n-button type="primary" @click="submitForm">{{ t('common.confirm') }}</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
  NButton,
  NCard,
  NDataTable,
  NDatePicker,
  NForm,
  NFormItem,
  NFormItemGi,
  NGrid,
  NInput,
  NInputNumber,
  NModal,
  NSelect,
  NSpace,
  NSwitch
} from 'naive-ui';
import type { FormRules } from 'naive-ui';

const { t } = useI18n();

const loading = ref(false);
const showModal = ref(false);
const isEdit = ref(false);
const data = ref([]);

const searchModel = reactive({
<#list searchColumns as column>
<#if column.searchType?? && (column.searchType == "between" || column.searchType == "notBetween" || column.searchType == "in" || column.searchType == "notIn")>
  ${column.fieldName}: [],
<#elseif column.javaType == "Integer" || column.javaType == "Long" || column.javaType == "Double" || column.javaType == "BigDecimal">
  ${column.fieldName}: null,
<#else>
  ${column.fieldName}: '',
</#if>
</#list>
});

const formModel = reactive({
<#list columns as column>
  ${column.fieldName}: ${column.defaultValue}<#if column_has_next>,</#if>
</#list>
});

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

const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  onChange: (page: number) => {
    pagination.page = page;
    loadData();
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
    loadData();
  }
});

const columns = computed(() => [
<#list listColumns as column>
  { title: <#if column.i18n?? && column.i18n == '1'>t('plugin.${ctx.moduleName}.${column.fieldName}')<#else>'${column.comment?js_string}'</#if>, key: '${column.fieldName}', width: ${column.listWidth!160}, ellipsis: { tooltip: true } },
</#list>
  {
    title: t('common.action'),
    key: 'action',
    render: (row: any) =>
      h(NSpace, {}, {
        default: () => [
          h(NButton, { size: 'small', onClick: () => openEdit(row) }, { default: () => t('common.edit') }),
          h(NButton, { size: 'small', type: 'error', onClick: () => removeRow(row) }, { default: () => t('common.delete') })
        ]
      })
  }
]);

const modalTitle = computed(() => (isEdit.value ? t('common.edit') : t('common.add')));

const dictOptions = reactive<Record<string, { label: string; value: string }[]>>({});

function getBaseApi() {
  return '/proxy-default';
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

async function request(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  const token = resolveToken();
  if (token) {
    headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }
  const response = await fetch(`${r'${getBaseApi()}'}${r'${path}'}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers as Record<string, string> | undefined)
    }
  });
  const payload = await response.json();
  return payload.data ?? payload;
}

function resetSearch() {
<#list searchColumns as column>
<#if column.searchType?? && (column.searchType == "between" || column.searchType == "notBetween" || column.searchType == "in" || column.searchType == "notIn")>
  searchModel.${column.fieldName} = [];
<#elseif column.javaType == "Integer" || column.javaType == "Long" || column.javaType == "Double" || column.javaType == "BigDecimal">
  searchModel.${column.fieldName} = null;
<#else>
  searchModel.${column.fieldName} = '';
</#if>
</#list>
  pagination.page = 1;
  loadData();
}

async function loadData() {
  loading.value = true;
  try {
    const response = await request('/plugin/${ctx.moduleName}/page', {
      method: 'POST',
      body: JSON.stringify({
        page: pagination.page,
        pageSize: pagination.pageSize,
        ...searchModel
      })
    });
    data.value = response.records ?? [];
    pagination.itemCount = response.total ?? 0;
  } finally {
    loading.value = false;
  }
}

function resetForm(row?: any) {
<#list columns as column>
  formModel.${column.fieldName} = row?.${column.fieldName} ?? ${column.defaultValue};
</#list>
}

function openCreate() {
  isEdit.value = false;
  resetForm();
  showModal.value = true;
}

function openEdit(row: any) {
  isEdit.value = true;
  resetForm(row);
  showModal.value = true;
}

async function submitForm() {
  const payload = { ...formModel };
  const method = isEdit.value ? 'PUT' : 'POST';
  await request('/plugin/${ctx.moduleName}', {
    method,
    body: JSON.stringify(payload)
  });
  window.$message?.success(t('common.saveSuccess'));
  showModal.value = false;
  await loadData();
}

async function removeRow(row: any) {
  if (!window.confirm(t('common.deleteConfirm'))) return;
  await request('/plugin/${ctx.moduleName}/' + row.${primaryKey.fieldName}, { method: 'DELETE' });
  await loadData();
}

async function loadDictOptions(code: string) {
  if (!code || dictOptions[code]) return;
  const dictList = await request(`/system/dict/list?code=${code}`);
  const dict = Array.isArray(dictList) ? dictList[0] : null;
  if (!dict?.id) {
    dictOptions[code] = [];
    return;
  }
  const items = await request('/system/dict/item/page', {
    method: 'POST',
    body: JSON.stringify({ page: 1, pageSize: 200, dictId: dict.id })
  });
  dictOptions[code] = (items.records ?? []).map((item: any) => ({
    label: item.zhCn ?? item.value,
    value: item.value
  }));
}

onMounted(() => {
  loadData();
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

<style scoped>
.plugin-page {
  padding: 12px;
}

.toolbar {
  margin: 12px 0;
}

.modal-card {
  width: 90vw;
  max-width: 900px;
}
</style>
