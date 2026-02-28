<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { NButton, NPopconfirm } from 'naive-ui';
import { $t } from '@/locales';
import { transDeleteParams } from '@/utils/common';
import { fetchDeleteDictItem, fetchGetDictItemPageList } from '@/service/api';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDict } from '@/hooks/business/dict';
import { renderOperateColumn, resolveOperateWidth } from '@/utils/table-operate';
import DictItemSearch from './dict-item-search.vue';
import DictItemOperateDrawer from './dict-item-operate-drawer.vue';

defineOptions({
  name: 'DictItemPageListTable'
});

interface Props {
  dict: Api.SystemManage.DictTree;
}

interface Emits {
  (e: 'refresh-dict'): void;
}

const emit = defineEmits<Emits>();

const props = defineProps<Props>();
const dictId = computed(() => props.dict?.id);

const appStore = useAppStore();
const { hasAuth } = useAuth();
const canAdd = computed(() => hasAuth('sys:dict:item:add'));
const canDelete = computed(() => hasAuth('sys:dict:item:delete'));
const { dictTag } = useDict();

const apiParams = reactive({
  page: 1,
  pageSize: 20,
  dictId: dictId.value,
  value: null,
  description: null,
  zhCn: null,
  enUs: null
});

const { columns, columnChecks, data, loading, getData, getDataByPage, mobilePagination, searchParams, updateSearchParams, resetSearchParams } =
  useTable({
    apiFn: fetchGetDictItemPageList,
    apiParams,
    columns: () => [
      { type: 'selection', align: 'center', width: 48 },
      { key: 'index', title: $t('common.index'), width: 64, align: 'center' },
      { key: 'value', title: $t('page.manage.dictItem.value'), minWidth: 64, align: 'center' },
      { key: 'zhCn', title: $t('page.manage.dictItem.zhCn'), minWidth: 64, align: 'center' },
      { key: 'enUs', title: $t('page.manage.dictItem.enUs'), minWidth: 64, align: 'center' },
      { key: 'sort', title: $t('page.manage.dictItem.sort'), minWidth: 64, align: 'center' },
      {
        key: 'status',
        title: $t('page.manage.dictItem.status'),
        align: 'center',
        width: 80,
        render: row => dictTag('status', row.status)
      },
      {
        key: 'description',
        title: $t('page.manage.dictItem.description'),
        minWidth: 64,
        align: 'center',
        ellipsis: { tooltip: true }
      },
      {
        key: 'operate',
        title: $t('common.operate'),
        align: 'center',
        width: resolveOperateWidth(appStore.isMobile, 180),
        fixed: 'right',
        render: row =>
          renderOperateColumn({
            isMobile: appStore.isMobile,
            confirmTitle: $t('common.warning'),
            confirmPositiveText: $t('common.confirm'),
            confirmNegativeText: $t('common.cancel'),
            actions: [
              {
                key: 'edit',
                label: $t('common.edit'),
                show: hasAuth('sys:dict:item:update'),
                type: 'primary',
                onClick: () => handleEdit(row.id)
              },
              {
                key: 'delete',
                label: $t('common.delete'),
                show: hasAuth('sys:dict:item:delete'),
                type: 'error',
                confirmText: $t('common.confirmDelete'),
                onClick: () => handleDelete(row.id)
              }
            ]
          })
      }
    ]
  });

const { drawerVisible, operateType, handleAdd, handleEdit, editingId, checkedRowKeys, onDeleted, onBatchDeleted } =
  useTableOperate(data, getData);

async function handleDelete(id: string) {
  const { error, data: result } = await fetchDeleteDictItem(transDeleteParams([id]));
  if (!error && result) {
    onDeleted();
    emit('refresh-dict');
  }
}

async function handleBatchDelete() {
  if (!checkedRowKeys.value.length) return;
  const { error, data: result } = await fetchDeleteDictItem(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    onBatchDeleted();
    emit('refresh-dict');
  }
}

watch(dictId, () => {
  updateSearchParams({ dictId: dictId.value });
  apiParams.dictId = dictId.value;
  getDataByPage();
});
</script>

<template>
  <div class="h-full flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <DictItemSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard
      :title="dict.name + `(` + dict.code + `) ` + $t('page.manage.dictItem.title')"
      :bordered="false"
      class="sm:flex-1-hidden card-wrapper"
      content-class="flex-col"
    >
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        @add="handleAdd"
        @delete="handleBatchDelete"
        @refresh="getData"
      >
        <template #prefix>
          <NButton v-if="canAdd" size="small" ghost type="primary" @click="handleAdd">
            <template #icon>
              <icon-ic-round-plus class="text-icon" />
            </template>
            {{ $t('common.add') }}
          </NButton>
        </template>
        <template #suffix>
          <NPopconfirm v-if="canDelete" @positive-click="handleBatchDelete">
            <template #trigger>
              <NButton size="small" ghost type="error" :disabled="!checkedRowKeys.length">
                <template #icon>
                  <icon-ic-round-delete class="text-icon" />
                </template>
                {{ $t('common.batchDelete') }}
              </NButton>
            </template>
            {{ $t('common.confirmDelete') }}
          </NPopconfirm>
        </template>
      </TableHeaderOperation>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        remote
        striped
        size="small"
        class="sm:h-full"
        :data="data"
        :scroll-x="962"
        :columns="columns"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        :single-line="false"
        :row-key="row => row.id"
        :pagination="mobilePagination"
      />
    </NCard>
    <DictItemOperateDrawer :id="editingId" v-model:visible="drawerVisible" :dict="dict" :operate-type="operateType" @submitted="() => { getDataByPage(); emit('refresh-dict'); }" />
  </div>
</template>
