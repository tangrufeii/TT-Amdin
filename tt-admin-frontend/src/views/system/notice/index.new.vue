<script setup lang="tsx">
import { ref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDict } from '@/hooks/business/dict';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { fetchDeleteNotice, fetchGetNoticePage } from '@/service/api';
import { transDeleteParams } from '@/utils/common';
import { $t } from '@/locales';
import { formatDateTime } from '@/utils/date';
import { renderOperateColumn, resolveOperateWidth } from '@/utils/table-operate';
import NoticeSearch from './notice-search.vue';
import NoticeOperateDrawer from './notice-operate-drawer.vue';

defineOptions({
  name: 'SystemNotice'
});

const appStore = useAppStore();
const { hasAuth } = useAuth();
const { dictTag } = useDict();

const operateType = ref<NaiveUI.TableOperateType>('add');
const editingData = ref<Api.SystemManage.Notice | null>(null);


const { columns, columnChecks, data, loading, getData, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetNoticePage,
  apiParams: {
    page: 1,
    pageSize: 20,
    category: null,
    title: null,
    status: null
  },
  columns: () => [
    { type: 'selection', align: 'center', width: 48 },
    { key: 'index', title: $t('common.index'), align: 'center', width: 64 },
    {
      key: 'category',
      title: $t('page.manage.notice.category'),
      align: 'center',
      width: 120,
      render: row => dictTag('notice_category', row.category)
    },
    {
      key: 'title',
      title: $t('page.manage.notice.title'),
      align: 'center',
      minWidth: 200,
      ellipsis: { tooltip: true }
    },
    {
      key: 'content',
      title: $t('page.manage.notice.content'),
      align: 'center',
      minWidth: 240,
      ellipsis: { tooltip: true }
    },
    {
      key: 'releaseTime',
      title: $t('page.manage.notice.releaseTime'),
      align: 'center',
      width: 180,
      render: row => formatDateTime(row.releaseTime)
    },
    {
      key: 'remark',
      title: $t('page.manage.notice.remark'),
      align: 'center',
      minWidth: 200,
      ellipsis: { tooltip: true }
    },
    {
      key: 'status',
      title: $t('page.manage.notice.status'),
      align: 'center',
      width: 100,
      render: row => dictTag('status', row.status)
    },
    { key: 'createUser', title: $t('common.createUser'), align: 'center', width: 120 },
    {
      key: 'createTime',
      title: $t('common.createTime'),
      align: 'center',
      width: 180,
      render: row => formatDateTime(row.createTime)
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: resolveOperateWidth(appStore.isMobile, 200),
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
              show: hasAuth('sys:notice:update'),
              type: 'primary',
              onClick: () => edit(row)
            },
            {
              key: 'delete',
              label: $t('common.delete'),
              show: hasAuth('sys:notice:delete'),
              type: 'error',
              confirmText: $t('common.confirmDelete'),
              onClick: () => handleDelete(row.id)
            }
          ]
        })
    }
  ]
});

const { drawerVisible, openDrawer, checkedRowKeys, handleAdd, onDeleted, onBatchDeleted } = useTableOperate(data, getData);

function edit(item: Api.SystemManage.Notice) {
  operateType.value = 'edit';
  editingData.value = { ...item };
  openDrawer();
}

async function handleDelete(id: string) {
  const { error, data: result } = await fetchDeleteNotice(transDeleteParams([id]));
  if (!error && result) {
    await onDeleted();
  }
}

async function handleBatchDelete() {
  const { error, data: result } = await fetchDeleteNotice(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    await onBatchDeleted();
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <NoticeSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="sys:notice:add"
        delete-auth="sys:notice:delete"
        @add="handleAdd"
        @delete="handleBatchDelete"
        @refresh="getData"
      />
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        remote
        striped
        size="small"
        class="sm:h-full"
        :data="data"
        :scroll-x="1400"
        :columns="columns"
        :pagination="mobilePagination"
        :row-key="row => row.id"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        :single-line="false"
      />
      <NoticeOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData" @submitted="getDataByPage" />
    </NCard>
  </div>
</template>
