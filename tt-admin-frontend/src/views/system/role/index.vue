<script setup lang="tsx">
import { ref } from 'vue';
import { formatDateTime } from '@/utils/date';
import { useBoolean } from '@sa/hooks';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDict } from '@/hooks/business/dict';
import { fetchDeleteRole, fetchGetRolePage } from '@/service/api';
import { transDeleteParams } from '@/utils/common';
import { $t } from '@/locales';
import { renderOperateColumn, resolveOperateWidth } from '@/utils/table-operate';
import RoleOperateDrawer from './role-operate-drawer.vue';
import RoleSearch from './role-search.vue';
import MenuAuthModal from './menu-auth-modal.vue';
import ButtonAuthModal from './button-auth-modal.vue';

defineOptions({
  name: 'SystemRole'
});

const appStore = useAppStore();
const { bool: menuModalVisible, setTrue: openMenuModal } = useBoolean();
const { bool: buttonModalVisible, setTrue: openButtonModal } = useBoolean();
const { hasAuth } = useAuth();
const { dictTag } = useDict();

const { columns, columnChecks, data, loading, getData, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetRolePage,
  apiParams: {
    page: 1,
    pageSize: 20,
    roleName: null,
    roleCode: null,
    status: null
  },
  columns: () => [
    { type: 'selection', align: 'center', width: 48 },
    { key: 'index', title: $t('common.index'), align: 'center', width: 64 },
    { key: 'roleName', title: $t('page.manage.role.roleName'), align: 'center', minWidth: 140 },
    { key: 'roleCode', title: $t('page.manage.role.roleCode'), align: 'center', minWidth: 140 },
    {
      key: 'status',
      title: $t('page.manage.role.status'),
      align: 'center',
      width: 100,
      render: row => dictTag('status', row.status)
    },
    { key: 'sort', title: $t('page.manage.role.sort'), align: 'center', width: 80 },
    { key: 'description', title: $t('page.manage.role.descriptionField'), align: 'center', minWidth: 180 },
    {
      key: 'createTime',
      title: $t('page.manage.user.createTime'),
      align: 'center',
      width: 180,
      render: row => formatDateTime(row.createTime)
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: resolveOperateWidth(appStore.isMobile, 320),
      render: row =>
        renderOperateColumn({
          isMobile: appStore.isMobile,
          confirmTitle: $t('common.warning'),
          confirmPositiveText: $t('common.confirm'),
          confirmNegativeText: $t('common.cancel'),
          actions: [
            {
              key: 'menu-auth',
              label: $t('page.manage.role.menuAuth'),
              show: hasAuth('sys:role:menu:add'),
              type: 'primary',
              onClick: () => handleMenuAuth(row.id)
            },
            {
              key: 'button-auth',
              label: $t('page.manage.role.buttonAuth'),
              show: hasAuth('sys:role:permission:add'),
              type: 'primary',
              onClick: () => handleButtonAuth(row.id)
            },
            {
              key: 'edit',
              label: $t('common.edit'),
              show: hasAuth('sys:role:update'),
              type: 'primary',
              onClick: () => handleEdit(row.id)
            },
            {
              key: 'delete',
              label: $t('common.delete'),
              show: hasAuth('sys:role:delete'),
              type: 'error',
              confirmText: $t('common.confirmDelete'),
              onClick: () => handleDelete(row.id)
            }
          ]
        })
    }
  ]
});

const { drawerVisible, operateType, editingId, editingData, checkedRowKeys, handleAdd, handleEdit, handleId, onBatchDeleted, onDeleted } =
  useTableOperate(data, getData);

async function handleBatchDelete() {
  const { error, data: result } = await fetchDeleteRole(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    onBatchDeleted();
  }
}

async function handleDelete(id: string) {
  const { error, data: result } = await fetchDeleteRole(transDeleteParams([id]));
  if (!error && result) {
    onDeleted();
  }
}

function handleMenuAuth(id: string) {
  handleId(id);
  openMenuModal();
}

function handleButtonAuth(id: string) {
  handleId(id);
  openButtonModal();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <RoleSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="sys:role:add"
        delete-auth="sys:role:delete"
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
        :scroll-x="1200"
        :columns="columns"
        :pagination="mobilePagination"
        :row-key="row => row.id"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        :single-line="false"
      />
      <RoleOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData" @submitted="getDataByPage" />
      <MenuAuthModal v-model:visible="menuModalVisible" :role-id="editingId" />
      <ButtonAuthModal v-model:visible="buttonModalVisible" :role-id="editingId" />
    </NCard>
  </div>
</template>

<style scoped></style>
