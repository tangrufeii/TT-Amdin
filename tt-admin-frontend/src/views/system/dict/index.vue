<template>
  <div class="flex overflow-hidden">
    <NGrid :x-gap="8" :y-gap="8" item-responsive responsive="screen" cols="1 s:1 m:5 l:5 xl:5 2xl:5">
      <NGridItem span="1" class="h-full-hidden">
        <NCard :title="$t('page.manage.dict.title')" :bordered="false" size="small" class="h-full sm:flex-1-hidden" content-class="h-full-hidden">
          <template #header-extra>
            <NSpace>
              <NButton v-if="hasAuth('sys:dict:add')" ghost type="primary" @click="handleAdd">
                {{ $t('common.add') }}
              </NButton>
              <NButton v-if="hasAuth('sys:dict:list')" quaternary @click="init">
                <template #icon>
                  <SvgIcon icon="ic:round-refresh" />
                </template>
              </NButton>
            </NSpace>
          </template>
          <div class="h-full flex flex-col">
            <NInput v-model:value="name" class="mb-2" clearable :placeholder="$t('common.keywordSearch')" />
            <NTree
              :data="dictTreeList"
              :pattern="name"
              block-line
              class="p-tree flex-col-stretch"
              key-field="id"
              label-field="name"
              virtual-scroll
              :render-label="renderLabel"
              :show-irrelevant-nodes="false"
              @update-selected-keys="(_key, _option, meta) => handleSelectKeys(meta?.node || null, meta?.action || '')"
            />
          </div>
        </NCard>
      </NGridItem>
      <NGridItem span="4" class="h-full overflow-auto">
        <DictItemPageTable v-if="dictItemVisible" :dict="dictData" @refresh-dict="refreshDictStore" />
        <NCard v-else :bordered="false" size="small" class="h-full">
          <NEmpty :description="$t('page.manage.dict.selectTreeIsEmptyTip')" class="h-full justify-center" />
        </NCard>
      </NGridItem>
    </NGrid>
    <DictOperateDrawer v-model:visible="dictDrawer" :dict-id="dictData?.id" :operate-type="operateType" @submitted="init" />
  </div>
</template>

<script setup lang="ts">
import type { VNodeChild } from 'vue';
import { h, onMounted, reactive, ref, shallowRef } from 'vue';
import { NButton, NButtonGroup, NPopconfirm, NSpace, NText } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import { fetchDeleteDict, fetchGetDictList } from '@/service/api';
import { useAuth } from '@/hooks/business/auth';
import { transDeleteParams } from '@/utils/common';
import { $t } from '@/locales';
import SvgIcon from '@/components/custom/svg-icon.vue';
import { useDictStore } from '@/store/modules/dict';
import DictOperateDrawer from './dict-operate-drawer.vue';
import DictItemPageTable from './dict-item-page-table.vue';

defineOptions({
  name: 'SystemDict'
});

const { hasAuth } = useAuth();
const dictStore = useDictStore();

const { bool: dictDrawer, setTrue: openDictDrawer } = useBoolean();
const { bool: dictItemVisible, setBool: setDictItemVisible } = useBoolean();

const operateType = ref<NaiveUI.TableOperateType>('add');
const name = ref('');

type DictTree = Api.SystemManage.DictTree & {
  prefix?: () => VNodeChild;
  suffix?: () => VNodeChild;
};

const dictTreeList = shallowRef<DictTree[]>([]);

const dictData: DictTree = reactive({
  id: 0,
  name: '',
  code: '',
  status: '1',
  type: '1',
  description: ''
});

async function init() {
  const { error, data } = await fetchGetDictList();
  if (!error && data) {
    dictTreeList.value = data.map(recursive);
  }
  await dictStore.init(true);
}

function handleAdd() {
  operateType.value = 'add';
  openDictDrawer();
}

function copyCode(code: string) {
  if (!code) return;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(code);
  }
}

function recursive(item: Api.SystemManage.DictTree): DictTree {
  return {
    ...item,
    suffix: () =>
      h(
        NButtonGroup,
        {},
        {
          default: () =>
            [
              h(
                NButton,
                {
                  size: 'tiny',
                  quaternary: true,
                  onClick: event => {
                    event.stopPropagation();
                    copyCode(item.code);
                  }
                },
                { icon: () => h(SvgIcon, { icon: 'ic:baseline-content-copy' }) }
              ),
              hasAuth('sys:dict:update')
                ? h(
                  NButton,
                  {
                    size: 'tiny',
                    quaternary: true,
                    onClick: event => {
                      event.stopPropagation();
                      handleEdit(item);
                    }
                  },
                  { icon: () => h(SvgIcon, { icon: 'ic:round-edit' }) }
                )
                : null,
              hasAuth('sys:dict:delete') && item.type !== '1'
                ? h(
                  NPopconfirm,
                  {
                    onPositiveClick: () => handleDelete(item)
                  },
                  {
                    default: () => $t('common.confirmDelete'),
                    trigger: () =>
                      h(
                        NButton,
                        {
                          size: 'tiny',
                          quaternary: true,
                          onClick: event => {
                            event.stopPropagation();
                          }
                        },
                        { icon: () => h(SvgIcon, { icon: 'ic:round-delete' }) }
                      )
                  }
                )
                : null
            ].filter(Boolean)
        }
      )
  };
}

function renderLabel({ option }: { option: NaiveUI.TreeOption }): VNodeChild {
  const data = option as Api.SystemManage.DictTree;
  const deleted = data.status === '0';
  return h(NText, { delete: deleted }, () => data.name);
}

function handleEdit(item: Api.SystemManage.DictTree) {
  operateType.value = 'edit';
  Object.assign(dictData, item);
  openDictDrawer();
}

async function handleDelete(item: Api.SystemManage.DictTree) {
  const { error, data } = await fetchDeleteDict(transDeleteParams([item.id]));
  if (!error && data) {
    window.$message?.success($t('common.deleteSuccess'));
    await init();
  }
}

function handleSelectKeys(node: NaiveUI.TreeOption | null, action: string) {
  setDictItemVisible(action === 'select');
  if (dictItemVisible.value && node) {
    Object.assign(dictData, node as Api.SystemManage.DictTree);
  }
}

async function refreshDictStore() {
  await dictStore.init(true);
}

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
:deep(.n-tree) {
  .n-tree-node-switcher {
    --uno: hidden;
  }
  .n-tree-node-content {
    --uno: px-8px;
  }
  .n-tree-node-content__suffix {
    display: none;
  }
  .n-tree-node-content:hover .n-tree-node-content__suffix {
    display: inline-flex;
  }
}
</style>
