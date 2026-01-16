<script setup lang="ts">
import type { Ref, VNodeChild } from 'vue';
import { h, reactive, ref, shallowRef, watch } from 'vue';
import { useBoolean } from '@sa/hooks';
import { fetchDeleteMenu, fetchGetAllPages, fetchGetMenuTree } from '@/service/api';
import { useAuth } from '@/hooks/business/auth';
import { useDict } from '@/hooks/business/dict';
import { transDeleteParams } from '@/utils/common';
import { $t } from '@/locales';
import SvgIcon from '@/components/custom/svg-icon.vue';
import { useAppStore } from '@/store/modules/app';
import { useRouteStore } from '@/store/modules/route';
import MenuOperateDrawer, { type OperateType } from './modules/menu-operate-drawer.vue';
import PermissionListTable from './modules/permission-list-table.vue';

type MenuTreeModel = Api.SystemManage.MenuTreeData & {
  label?: string;
  prefix?: () => VNodeChild;
  children?: MenuTreeModel[];
  isLeaf?: boolean;
};

const { bool: detailVisible, setBool: setDetailVisible } = useBoolean();
const { bool: menuDrawerVisible, setTrue: openMenuDrawer } = useBoolean();
const operateType = ref<OperateType>('add');
const selectedId = ref<number | null>(null);

const { hasAuth } = useAuth();
const { dcitType, dictLabel } = useDict();
const appStore = useAppStore();
const routeStore = useRouteStore();

const tree = shallowRef<MenuTreeModel[]>([]);
const name: Ref<string> = ref('');
const allPages = shallowRef<string[]>([]);

const showData: Api.SystemManage.MenuDetail = reactive({
  id: 0,
  parentId: 0,
  type: '1',
  name: '',
  routeName: '',
  routePath: '',
  icon: '',
  iconType: '1',
  status: '1',
  hide: 'N',
  keepAlive: 'Y',
  sort: 0,
  multiTab: 'N',
  fixedIndexInTab: -1,
  query: []
});

async function getTree() {
  const { data, error } = await fetchGetMenuTree();
  if (!error && data) {
    tree.value = data.map(recursiveTree);
  }
}

function recursiveTree(item: Api.SystemManage.MenuTreeData): MenuTreeModel {
  const label = item.i18nKey ? $t(item.i18nKey as App.I18n.I18nKey) : item.name;
  const result: MenuTreeModel = {
    ...item,
    isLeaf: !item.children?.length,
    label,
    prefix: () =>
      h(SvgIcon, {
        icon: item.iconType === '1' ? item.icon : undefined,
        localIcon: item.iconType === '2' ? item.icon : undefined,
        class: 'text-icon'
      })
  };
  if (item.children?.length) {
    result.children = item.children.map(recursiveTree);
  }
  return result;
}

function updateMenuIconInMenus(detail: Api.SystemManage.MenuDetail | MenuTreeModel | null) {
  if (!detail) return;
  routeStore.updateMenuIcon({
    routeName: detail.routeName,
    routePath: detail.routePath,
    icon: detail.icon,
    iconType: detail.iconType
  });
}

async function getAllPages() {
  const { data } = await fetchGetAllPages();
  allPages.value = data || [];
}

function handleSelectKeys(_node: NaiveUI.TreeOption | null, action: string, option?: { node: MenuTreeModel | null }) {
  setDetailVisible(action === 'select');
  if (action !== 'select' || !option?.node) {
    selectedId.value = null;
    return;
  }
  selectedId.value = Number(option.node.id);
  Object.assign(showData, option.node);
}

function handleAddMenu() {
  operateType.value = 'add';
  openMenuDrawer();
}

function handleAddChildMenu() {
  operateType.value = 'addChild';
  openMenuDrawer();
}

function handleEditMenu() {
  operateType.value = 'edit';
  openMenuDrawer();
}

async function handleDeleteMenu() {
  if (!selectedId.value) return;
  const { data, error } = await fetchDeleteMenu(transDeleteParams([selectedId.value]));
  if (!error && data) {
    window.$message?.success($t('common.deleteSuccess'));
    init(null);
  }
}

function findMenuNode(targetId: number | null, nodes: MenuTreeModel[]): MenuTreeModel | null {
  if (!targetId) return null;
  for (const node of nodes) {
    if (Number(node.id) === targetId) return node;
    if (node.children?.length) {
      const found = findMenuNode(targetId, node.children);
      if (found) return found;
    }
  }
  return null;
}

function findMenuId(targetId: number | null, nodes: MenuTreeModel[]): boolean {
  return Boolean(findMenuNode(targetId, nodes));
}

async function refreshAuthMenus() {
  routeStore.setIsInitAuthRoute(false);
  await routeStore.initAuthRoute();
}

async function init(detail: Api.SystemManage.MenuDetail | null, refreshMenu = false) {
  await getTree();
  await getAllPages();
  if (detail) {
    Object.assign(showData, detail);
    if (detail.id) {
      selectedId.value = Number(detail.id);
    }
    updateMenuIconInMenus(detail);
  } else {
    const selectedNode = findMenuNode(selectedId.value, tree.value);
    if (selectedNode) {
      Object.assign(showData, selectedNode);
      updateMenuIconInMenus(selectedNode);
    } else {
      selectedId.value = null;
    }
  }
  if (refreshMenu) {
    await refreshAuthMenus();
  }
}

init(null);

watch(
  () => appStore.locale,
  () => {
    getTree();
  }
);
</script>

<template>
  <div class="flex overflow-hidden">
    <NGrid :x-gap="8" :y-gap="8" item-responsive responsive="screen" cols="1 s:1 m:5 l:5 xl:5 2xl:5" class="h-full-hidden">
      <NGridItem span="1" class="h-full-hidden">
        <NCard :bordered="false" size="small" :title="$t('page.manage.menu.title')" class="h-full">
          <template #header-extra>
            <NFlex>
              <NButton v-if="hasAuth('sys:menu:add')" size="small" ghost type="primary" @click="handleAddMenu">
                {{ $t('common.add') }}
              </NButton>
              <NButton quaternary @click="init(null)">
                <template #icon>
                  <SvgIcon icon="ic:round-refresh" />
                </template>
              </NButton>
            </NFlex>
          </template>
          <div class="flex flex-col h-full">
            <NInput v-model:value="name" class="mb-2" clearable :placeholder="$t('page.manage.menu.form.name')" />
            <NTree
              :data="tree"
              :pattern="name"
              block-line
              key-field="id"
              :show-irrelevant-nodes="false"
              virtual-scroll
              @update:selected-keys="(_keys, _opt, meta) => handleSelectKeys(meta?.node || null, meta?.action || '', meta)"
            />
          </div>
        </NCard>
      </NGridItem>
      <NGridItem v-if="detailVisible" span="4" class="flex flex-col gap-2">
        <NCard :bordered="false" size="small" :title="$t('page.manage.menu.detail')">
          <template #header-extra>
            <NFlex>
              <NButton v-if="showData.type === '1' && hasAuth('sys:menu:add')" quaternary size="small" type="primary" @click="handleAddChildMenu">
                {{ $t('page.manage.menu.addChildMenu') }}
              </NButton>
              <NButton v-if="hasAuth('sys:menu:update')" ghost type="primary" size="small" @click="handleEditMenu">
                {{ $t('common.edit') }}
              </NButton>
              <NPopconfirm v-if="hasAuth('sys:menu:delete')" placement="bottom" @positive-click="handleDeleteMenu">
                <template #trigger>
                  <NButton ghost type="error" size="small">
                    {{ $t('common.delete') }}
                  </NButton>
                </template>
                {{ $t('common.confirmDelete') }}
              </NPopconfirm>
            </NFlex>
          </template>
          <NDescriptions label-placement="left" size="small" bordered :column="2">
            <NDescriptionsItem :label="$t('page.manage.menu.type')">
              <NTag :type="dcitType('menu_type', showData.type)">{{ dictLabel('menu_type', showData.type) }}</NTag>
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.status')">
              <NTag :type="dcitType('status', showData.status || '1')">{{ dictLabel('status', showData.status || '1') }}</NTag>
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.name')">{{ showData.name }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.i18nKey')">{{ showData.i18nKey }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.routeName')">{{ showData.routeName }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.routePath')">{{ showData.routePath }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.hideInMenu')">
              <NTag :type="dcitType('feature_status', showData.hide || 'N')">{{ dictLabel('feature_status', showData.hide || 'N') }}</NTag>
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.keepAlive')">
              <NTag :type="dcitType('feature_status', showData.keepAlive || 'N')">{{ dictLabel('feature_status', showData.keepAlive || 'N') }}</NTag>
            </NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.href')" :span="2">{{ showData.href }}</NDescriptionsItem>
            <NDescriptionsItem :label="$t('page.manage.menu.iframeUrl')" :span="2">{{ showData.iframeUrl }}</NDescriptionsItem>
          </NDescriptions>
        </NCard>
        <PermissionListTable :show-data="showData" />
      </NGridItem>
      <NGridItem v-else span="4">
        <NCard :bordered="false" size="small" class="h-full">
          <NEmpty :description="$t('page.manage.menu.selectTreeIsEmptyTip')" class="h-full justify-center" />
        </NCard>
      </NGridItem>
    </NGrid>
    <MenuOperateDrawer
      v-model:visible="menuDrawerVisible"
      :row-data="showData"
      :operate-type="operateType"
      :all-pages="allPages"
      @submitted="data => init(data, true)"
    />
  </div>
</template>

<style scoped></style>
