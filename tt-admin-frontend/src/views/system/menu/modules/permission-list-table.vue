<script setup lang="tsx">
import { watch } from 'vue';
import { NButton, NPopconfirm } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { useAppStore } from '@/store/modules/app';
import { useAuth } from '@/hooks/business/auth';
import { useDict } from '@/hooks/business/dict';
import { fetchDeletePermission, fetchGetPermissionPage } from '@/service/api';
import { transDeleteParams } from '@/utils/common';
import { $t } from '@/locales';
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

const { columns, data, loading, mobilePagination, searchParams, getData, getDataByPage } = useTable({
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
      width: 120,
      fixed: 'right',
      render: row => (
        <div class="flex-center gap-8px">
          {hasAuth('sys:permission:update') && (
            <NButton type="primary" quaternary size="small" onClick={() => handleEditButton(row.id)}>
              {$t('common.edit')}
            </NButton>
          )}
          {hasAuth('sys:permission:delete') && (
            <NPopconfirm onPositiveClick={() => handleDeleteButton(row.id)}>
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

const { operateType, handleData, onDeleted, editingData } = useTableOperate(data, getData);

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
      <template #header-extra>
        <NButton v-if="hasAuth('sys:permission:add')" type="primary" ghost size="small" @click="handleAddButton">
          {{ $t('common.add') }}
        </NButton>
      </template>
      <NDataTable
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
