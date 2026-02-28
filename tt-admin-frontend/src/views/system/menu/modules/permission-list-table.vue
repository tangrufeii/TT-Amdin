<script setup lang="tsx">
import { watch } from 'vue';
import { useBoolean } from '@sa/hooks';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDict } from '@/hooks/business/dict';
import { fetchDeletePermission, fetchGetPermissionPage } from '@/service/api';
import { transDeleteParams } from '@/utils/common';
import { $t } from '@/locales';
import { renderOperateColumn, resolveOperateWidth } from '@/utils/table-operate';
import TableHeaderOperation from '@/components/advanced/table-header-operation.vue';
import PermissionOperateModal from './permission-operate-modal.vue';

defineOptions({
  name: 'PermissionListTable'
});

interface Props {
  showData: Api.SystemManage.MenuTreeData;
}

const props = defineProps<Props>();

const appStore = useAppStore();
const { hasAuth } = useAuth();
const { dictTag } = useDict();

const { bool: modalVisible, setTrue: openModalVisible } = useBoolean();

const { columns, data, loading, mobilePagination, searchParams, getData, getDataByPage, columnChecks } = useTable({
  apiFn: fetchGetPermissionPage,
  apiParams: {
    page: 1,
    pageSize: 20,
    menuId: props.showData.id,
    name: null,
    resource: null,
    status: null
  },
  columns: () => [
    {
      type: 'selection',
      width: 48,
      align: 'center'
    },
    {
      key: 'name',
      title: $t('page.manage.permission.name'),
      align: 'center',
      width: 150
    },
    {
      key: 'resource',
      title: $t('page.manage.permission.resource'),
      align: 'center',
      width: 220,
      ellipsis: true
    },
    {
      key: 'status',
      title: $t('page.manage.permission.status'),
      align: 'center',
      width: 80,
      render: row => dictTag('status', row.status || '1')
    },
    {
      key: 'sort',
      title: $t('page.manage.permission.sort'),
      align: 'center',
      width: 80
    },
    {
      key: 'description',
      title: $t('page.manage.permission.description'),
      align: 'center',
      width: 140,
      ellipsis: {
        tooltip: true
      }
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
              show: hasAuth('sys:permission:update'),
              type: 'primary',
              onClick: () => handleEditButton(row.id)
            },
            {
              key: 'delete',
              label: $t('common.delete'),
              show: hasAuth('sys:permission:delete'),
              type: 'error',
              confirmText: $t('common.confirmDelete'),
              onClick: () => handleDeleteButton(row.id)
            }
          ]
        })
    }
  ]
});

const { operateType, handleData, onDeleted, onBatchDeleted, editingData, checkedRowKeys } = useTableOperate(data, getData);

function handleAddButton() {
  operateType.value = 'add';
  openModalVisible();
}

function handleEditButton(id: string) {
  operateType.value = 'edit';
  handleData(id);
  openModalVisible();
}

async function handleDeleteButton(id: string) {
  const { error, data: result } = await fetchDeletePermission(transDeleteParams([id]));
  if (!error && result) {
    onDeleted();
  }
}

async function handleBatchDelete() {
  if (!checkedRowKeys.value.length) return;
  const { error, data: result } = await fetchDeletePermission(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    onBatchDeleted();
  }
}

watch(
  () => props.showData.id,
  () => {
    searchParams.menuId = props.showData.id;
    getDataByPage();
  }
);
</script>

<template>
  <div class="flex flex-grow">
    <NCard v-if="showData.type === '2'" :title="$t('page.manage.permission.title')" :bordered="false" size="small">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="sys:permission:add"
        delete-auth="sys:permission:delete"
        @add="handleAddButton"
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
        :scroll-x="1000"
        :columns="columns"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        :single-line="false"
        :row-key="row => row.id"
        :pagination="mobilePagination"
      />
    </NCard>
    <NCard v-else :bordered="false" size="small">
      <NEmpty :description="$t('page.manage.menu.menuTypeIsDirectory')" class="h-full justify-center" />
    </NCard>
    <PermissionOperateModal
      v-model:visible="modalVisible"
      :operate-type="operateType"
      :menu-data="showData"
      :row-data="editingData"
      @submitted="getDataByPage"
    />
  </div>
</template>
