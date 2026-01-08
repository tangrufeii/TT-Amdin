<script setup lang="tsx">
import { h } from 'vue';
import { NButton, NPopconfirm } from 'naive-ui';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDict } from '@/hooks/business/dict';
import { fetchDeleteUser, fetchGetUserPage, fetchResetUserPassword } from '@/service/api';
import { transDeleteParams } from '@/utils/common';
import { $t } from '@/locales';
import { formatDateTime } from '@/utils/date';
import UserOperateDrawer from './user-operate-drawer.vue';

defineOptions({
  name: 'SystemUser'
});

const appStore = useAppStore();
const { hasAuth } = useAuth();
const { dictTag } = useDict();

const { columns, columnChecks, data, loading, getData, getDataByPage, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetUserPage,
  apiParams: {
    page: 1,
    pageSize: 20,
    userName: null,
    phone: null,
    status: null
  },
  columns: () => [
    { type: 'selection', align: 'center', width: 48 },
    { key: 'index', title: $t('common.index'), align: 'center', width: 64 },
    { key: 'userName', title: $t('page.manage.user.userName'), align: 'center', minWidth: 120 },
    { key: 'nickName', title: $t('page.manage.user.nickName'), align: 'center', minWidth: 120 },
    { key: 'realName', title: $t('page.manage.user.realName'), align: 'center', minWidth: 120 },
    { key: 'phone', title: $t('page.manage.user.phone'), align: 'center', minWidth: 120 },
    { key: 'email', title: $t('page.manage.user.email'), align: 'center', minWidth: 160 },
    {
      key: 'status',
      title: $t('page.manage.user.status'),
      align: 'center',
      width: 100,
      render: row => dictTag('status', row.status)
    },
    {
      key: 'roleNames',
      title: $t('page.manage.user.role'),
      align: 'center',
      minWidth: 160,
      render: row => (row.roleNames || []).join(' / ')
    },
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
      minWidth: 260,
      render: row => (
        <div class="flex-center flex-wrap gap-8px">
          {hasAuth('sys:user:update') && (
            <NButton type="primary" quaternary size="small" onClick={() => handleEdit(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('sys:user:resetPassword') && (
            <NButton type="warning" quaternary size="small" onClick={() => handleResetPassword(row.id)}>
              {$t('page.manage.user.resetPassword')}
            </NButton>
          )}
          {hasAuth('sys:user:delete') && (
            <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
              {{
                default: () => $t('common.confirmDelete'),
                trigger: () => (
                  <NButton type="error" quaternary size="small">
                    {$t('common.delete')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          )}
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  checkedRowKeys,
  handleAdd,
  handleEdit,
  onBatchDeleted,
  onDeleted
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  const { error, data: result } = await fetchDeleteUser(transDeleteParams(checkedRowKeys.value));
  if (!error && result) {
    onBatchDeleted();
  }
}

async function handleDelete(id: string) {
  const { error, data: result } = await fetchDeleteUser(transDeleteParams([id]));
  if (!error && result) {
    onDeleted();
  }
}

async function handleResetPassword(id: string) {
  const { error, data: result } = await fetchResetUserPassword(id);
  if (!error && result) {
    window.$message?.success(`${$t('page.manage.user.resetPassword')}: ${result}`);
  }
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <NCard :bordered="false" size="small" class="card-wrapper">
      <NForm :model="searchParams" label-placement="left" :show-feedback="false" :label-width="80">
        <NGrid responsive="screen" item-responsive :x-gap="8" :y-gap="8" cols="1 s:1 m:5 l:5 xl:5 2xl:5">
          <NGridItem span="4">
            <NGrid responsive="screen" item-responsive :x-gap="8">
              <NFormItemGi span="24 s:8 m:6" :label="$t('page.manage.user.userName')" path="userName">
                <NInput v-model:value="searchParams.userName" size="small" :placeholder="$t('page.manage.user.form.userName')" />
              </NFormItemGi>
              <NFormItemGi span="24 s:8 m:6" :label="$t('page.manage.user.phone')" path="phone">
                <NInput v-model:value="searchParams.phone" size="small" :placeholder="$t('page.manage.user.form.phone')" />
              </NFormItemGi>
              <NFormItemGi span="24 s:8 m:6" :label="$t('page.manage.user.status')" path="status">
                <NSelect
                  v-model:value="searchParams.status"
                  size="small"
                  :placeholder="$t('page.manage.user.form.status')"
                  :options="[{ label: $t('common.yesOrNo.yes'), value: '1' }, { label: $t('common.yesOrNo.no'), value: '0' }]"
                  clearable
                />
              </NFormItemGi>
            </NGrid>
          </NGridItem>
          <NGridItem>
            <NFormItemGi span="24 s:8 m:6">
              <NSpace class="w-full" justify="end">
                <NButton type="primary" ghost @click="getDataByPage">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
                <NButton quaternary @click="resetSearchParams">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGridItem>
        </NGrid>
      </NForm>
    </NCard>

    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="sys:user:add"
        delete-auth="sys:user:delete"
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
      <UserOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData" @submitted="getDataByPage" />
    </NCard>
  </div>
</template>

<style scoped></style>
