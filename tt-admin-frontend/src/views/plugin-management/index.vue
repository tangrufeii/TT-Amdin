<script lang="ts" setup>
import {h, onMounted, ref} from 'vue'
import {
  NButton,
  NCard,
  NDataTable,
  NForm,
  NFormItem,
  NGi,
  NGrid,
  NInput,
  NSelect,
  NSpace,
  NStatistic,
  NTag,
  NUpload,
  NUploadDragger,
  NModal,
  NIcon,
  NText
} from 'naive-ui';
import {$t} from '@/locales'
import {useTable, useTableOperate} from '@/hooks/common/table';
import {useAppStore} from '@/store/modules/app';

import {
  fetchPluginDelete,
  fetchPluginDisable,
  fetchPluginEnable,
  fetchPluginPage,
  fetchPluginStatistics,
  fetchPluginInstall
} from '@/service/api/plugin';

defineOptions({
  name: 'PluginManagement'
});

const appStore = useAppStore();

const { columns, data, loading, getData, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchPluginPage,
  apiParams: {
    page: 1,
    pageSize: 20,
    name: '',
    status: null
  },
  columns: () => [
    {type: 'selection', align: 'center', width: 48},
    {key: 'index', title: $t('common.index'), align: 'center', width: 64},
    {key: 'name', title: $t('page.pluginManagement.table.name'), align: 'center', minWidth: 150},
    {key: 'pluginId', title: $t('page.pluginManagement.table.pluginId'), align: 'center', minWidth: 200},
    {key: 'description', title: $t('page.pluginManagement.table.description'), align: 'center', minWidth: 200},
    {key: 'version', title: $t('page.pluginManagement.table.version'), align: 'center', width: 100},
    {key: 'author', title: $t('page.pluginManagement.table.author'), align: 'center', width: 120},
    {
      key: 'status',
      title: $t('page.pluginManagement.table.status'),
      align: 'center',
      width: 100,
      render: (row: any) => {
        if (row.status === 1) {
          return h(NTag, {
            type: 'success',
            size: 'small',
            bordered: false
          }, () => $t('page.pluginManagement.search.statusEnabled'));
        }
        return h(NTag, {
          type: 'error',
          size: 'small',
          bordered: false
        }, () => $t('page.pluginManagement.search.statusDisabled'));
      }
    },
    {
      key: 'isDev',
      title: $t('page.pluginManagement.table.isDev'),
      align: 'center',
      width: 100,
      render: (row: any) => (row.isDev ? $t('common.yesOrNo.yes') : $t('common.yesOrNo.no'))
    },
    {key: 'createTime', title: $t('page.pluginManagement.table.createTime'), align: 'center', width: 180},
    {
      key: 'operate',
      title: $t('page.pluginManagement.table.action'),
      align: 'center',
      width: 200,
      render: (row: any) =>
        h(
          'div',
          {class: 'flex-center gap-2'},
          [
            row.status === 0
              ? h(NButton, {
                type: 'primary',
                ghost: true,
                size: 'small',
                onClick: () => handleEnable(row.id)
              }, () => $t('page.pluginManagement.table.enable'))
              : h(NButton, {
                type: 'warning',
                ghost: true,
                size: 'small',
                onClick: () => handleDisable(row.id)
              }, () => $t('page.pluginManagement.table.disable')),
            h(NButton, {
              type: 'error',
              ghost: true,
              size: 'small',
              onClick: () => handleDelete(row.id)
            }, () => $t('page.pluginManagement.table.delete'))
          ]
        )
    }
  ]
});
const { checkedRowKeys } = useTableOperate(data, getData);
// 插件统计信息
interface PluginStatistics {
  total: number;
  enabledCount: number;
  disabledCount: number;
}

const statistics = ref<PluginStatistics>({
  total: 0,
  enabledCount: 0,
  disabledCount: 0
});

async function getStatistics() {
  const {data} = await fetchPluginStatistics();
  if (data.value) {
    statistics.value = data.value;
  }
}

// 启用插件
async function handleEnable(id: number) {
  const {error} = await fetchPluginEnable(id);
  if (!error) {
    window.$message?.success($t('page.pluginManagement.message.enableSuccess'));
    getData();
    getStatistics();
  }
}

// 禁用插件
async function handleDisable(id: number) {
  const {error} = await fetchPluginDisable(id);
  if (!error) {
    window.$message?.success($t('page.pluginManagement.message.disableSuccess'));
    getData();
    getStatistics();
  }
}

// 删除插件
async function handleDelete(id: number) {
  window.$dialog?.warning({
    title: $t('common.warning'),
    content: $t('page.pluginManagement.message.deleteConfirm'),
    positiveText: $t('common.confirm'),
    negativeText: $t('common.cancel'),
    onPositiveClick: async () => {
      const {error} = await fetchPluginDelete(id);
      if (!error) {
        window.$message?.success($t('page.pluginManagement.message.deleteSuccess'));
        getData();
        getStatistics();
      }
    }
  });
}

// 搜索
const searchName = ref('');

function handleSearch() {
  searchParams.name = searchName.value;
  getData();
  console.error(data.value)
}

function handleReset() {
  searchName.value = '';
  resetSearchParams();
  getData();
}

// 导入插件
const uploadModalVisible = ref(false);
const uploadLoading = ref(false);
const fileListRef = ref<any[]>([]);

function openUploadModal() {
  uploadModalVisible.value = true;
  fileListRef.value = [];
}

function closeUploadModal() {
  uploadModalVisible.value = false;
  fileListRef.value = [];
}

async function handleUpload({ file }: any) {
  uploadLoading.value = true;
  try {
    const { error } = await fetchPluginInstall(file.file);
    if (!error) {
      window.$message?.success($t('page.pluginManagement.message.installSuccess'));
      closeUploadModal();
      getData();
      getStatistics();
    }
  } finally {
    uploadLoading.value = false;
  }
  return false; // 阻止自动上传
}

function handleImportButtonClick() {
  openUploadModal();
}

onMounted(() => {
  getData();
  getStatistics();
});
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
    <!-- 统计卡片 -->
    <NGrid :x-gap="16" :y-gap="16" item-responsive responsive="screen">
      <NGi span="24 s:24 m:8">
        <NCard :bordered="false" class="card-wrapper">
          <NStatistic :label="$t('page.pluginManagement.statistics.total')" :value="statistics.total"/>
        </NCard>
      </NGi>
      <NGi span="24 s:24 m:8">
        <NCard :bordered="false" class="card-wrapper">
          <NStatistic :label="$t('page.pluginManagement.statistics.enabled')" :value="statistics.enabledCount"/>
        </NCard>
      </NGi>
      <NGi span="24 s:24 m:8">
        <NCard :bordered="false" class="card-wrapper">
          <NStatistic :label="$t('page.pluginManagement.statistics.disabled')" :value="statistics.disabledCount"/>
        </NCard>
      </NGi>
    </NGrid>
    <NButton @click="handleImportButtonClick"> 插件导入</NButton>
    <ConfigSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :bordered="false" class="sm:flex-1-hidden card-wrapper" content-class="flex-col">
      <TableHeaderOperation
        v-model:columns="columnChecks"
        :checked-row-keys="checkedRowKeys"
        :loading="loading"
        add-auth="shop:config:add"
        delete-auth="shop:config:delete"
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
        :scroll-x="962"
        :columns="columns"
        :flex-height="!appStore.isMobile"
        :loading="loading"
        :single-line="false"
        :row-key="row => row.id"
        :pagination="mobilePagination"
      />
      <ConfigOperateDrawer v-model:visible="drawerVisible" :operate-type="operateType" :row-data="editingData" @submitted="getDataByPage" />
    </NCard>
    <!-- 导入插件模态框 -->
    <NModal
      v-model:show="uploadModalVisible"
      :mask-closable="false"
      preset="card"
      :title="$t('page.pluginManagement.table.install')"
      class="w-640px"
    >
      <NUpload
        :custom-request="handleUpload"
        :show-file-list="false"
        accept=".zip,.jar"
        :disabled="uploadLoading"
      >
        <NUploadDragger :disabled="uploadLoading">
          <div style="margin-bottom: 12px">
            <NIcon size="48" :depth="3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 2l5 5h-5zM12 18v-4l-1.5 1.5L9 13.5l3-3l3 3l-1.5 1.5L12 14v4z"/>
              </svg>
            </NIcon>
          </div>
          <NText style="font-size: 16px">
            点击或拖动文件到此区域上传
          </NText>
          <NText depth="3" style="display: block; margin-top: 8px">
            支持 .zip 或 .jar 格式的插件文件
          </NText>
        </NUploadDragger>
      </NUpload>
    </NModal>
  </div>
<!--  <NSpace :size="16" class="min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto" vertical>-->
<!--    &lt;!&ndash; 统计卡片 &ndash;&gt;-->
<!--    <NGrid :x-gap="16" :y-gap="16" item-responsive responsive="screen">-->
<!--      <NGi span="24 s:24 m:8">-->
<!--        <NCard :bordered="false" class="card-wrapper">-->
<!--          <NStatistic :label="$t('page.pluginManagement.statistics.total')" :value="statistics.total"/>-->
<!--        </NCard>-->
<!--      </NGi>-->
<!--      <NGi span="24 s:24 m:8">-->
<!--        <NCard :bordered="false" class="card-wrapper">-->
<!--          <NStatistic :label="$t('page.pluginManagement.statistics.enabled')" :value="statistics.enabledCount"/>-->
<!--        </NCard>-->
<!--      </NGi>-->
<!--      <NGi span="24 s:24 m:8">-->
<!--        <NCard :bordered="false" class="card-wrapper">-->
<!--          <NStatistic :label="$t('page.pluginManagement.statistics.disabled')" :value="statistics.disabledCount"/>-->
<!--        </NCard>-->
<!--      </NGi>-->
<!--    </NGrid>-->

<!--    &lt;!&ndash; 搜索区域 &ndash;&gt;-->
<!--    <NCard :bordered="false" class="card-wrapper">-->
<!--      <NForm :label-width="80" :model="searchParams" label-placement="left">-->
<!--        <NGrid :x-gap="16" :y-gap="16" item-responsive responsive="screen">-->
<!--          <NGi span="24 s:24 m:12 l:8">-->
<!--            <NFormItem :label="$t('page.pluginManagement.search.name')">-->
<!--              <NInput-->
<!--                v-model:value="searchName"-->
<!--                :placeholder="$t('page.pluginManagement.search.placeholder')"-->
<!--                clearable-->
<!--                @keyup.enter="handleSearch"-->
<!--              />-->
<!--            </NFormItem>-->
<!--          </NGi>-->
<!--          <NGi span="24 s:24 m:12 l:8">-->
<!--            <NFormItem :label="$t('page.pluginManagement.search.status')">-->
<!--              <NSelect-->
<!--                v-model:value="searchParams.status"-->
<!--                :options="[-->
<!--                  { label: $t('page.pluginManagement.search.statusAll'), value: null },-->
<!--                  { label: $t('page.pluginManagement.search.statusEnabled'), value: 1 },-->
<!--                  { label: $t('page.pluginManagement.search.statusDisabled'), value: 0 }-->
<!--                ]"-->
<!--                clearable-->
<!--              />-->
<!--            </NFormItem>-->
<!--          </NGi>-->
<!--          <NGi span="24 s:24 m:24 l:8">-->
<!--            <NSpace :size="12">-->
<!--              <NButton type="primary" @click="handleSearch">-->
<!--                {{ $t('common.search') }}-->
<!--              </NButton>-->
<!--              <NButton @click="handleReset">-->
<!--                {{ $t('common.reset') }}-->
<!--              </NButton>-->
<!--              <NButton type="success" @click="handleImportButtonClick">-->
<!--                {{ $t('page.pluginManagement.table.install') }}-->
<!--              </NButton>-->
<!--            </NSpace>-->
<!--          </NGi>-->
<!--        </NGrid>-->
<!--      </NForm>-->
<!--    </NCard>-->

<!--    &lt;!&ndash; 数据表格 &ndash;&gt;-->
<!--    <NCard :bordered="false" class="flex-1-hidden card-wrapper">-->
<!--      <NDataTable-->
<!--        v-model:checked-row-keys="checkedRowKeys"-->
<!--        remote-->
<!--        striped-->
<!--        size="small"-->
<!--        :max-height="appStore.isMobile ? undefined : 600"-->
<!--        :data="data"-->
<!--        :scroll-x="1200"-->
<!--        :columns="columns"-->
<!--        :loading="loading"-->
<!--        :single-line="false"-->
<!--        :row-key="row => row.id"-->
<!--        :pagination="mobilePagination"-->
<!--      />-->
<!--    </NCard>-->

<!--    &lt;!&ndash; 导入插件模态框 &ndash;&gt;-->
<!--    <NModal-->
<!--      v-model:show="uploadModalVisible"-->
<!--      :mask-closable="false"-->
<!--      preset="card"-->
<!--      :title="$t('page.pluginManagement.table.install')"-->
<!--      class="w-640px"-->
<!--    >-->
<!--      <NUpload-->
<!--        :custom-request="handleUpload"-->
<!--        :show-file-list="false"-->
<!--        accept=".zip,.jar"-->
<!--        :disabled="uploadLoading"-->
<!--      >-->
<!--        <NUploadDragger :disabled="uploadLoading">-->
<!--          <div style="margin-bottom: 12px">-->
<!--            <NIcon size="48" :depth="3">-->
<!--              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">-->
<!--                <path fill="currentColor" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm-1 2l5 5h-5zM12 18v-4l-1.5 1.5L9 13.5l3-3l3 3l-1.5 1.5L12 14v4z"/>-->
<!--              </svg>-->
<!--            </NIcon>-->
<!--          </div>-->
<!--          <NText style="font-size: 16px">-->
<!--            点击或拖动文件到此区域上传-->
<!--          </NText>-->
<!--          <NText depth="3" style="display: block; margin-top: 8px">-->
<!--            支持 .zip 或 .jar 格式的插件文件-->
<!--          </NText>-->
<!--        </NUploadDragger>-->
<!--      </NUpload>-->
<!--    </NModal>-->
<!--  </NSpace>-->
</template>

<style scoped>
.card-wrapper {
  border-radius: 8px;
}
</style>
