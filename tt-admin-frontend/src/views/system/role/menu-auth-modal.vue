<script setup lang="ts">
import { computed, reactive, shallowRef, watch } from 'vue';
import type { TreeOption } from 'naive-ui';
import { $t } from '@/locales';
import { fetchGetMenuTree, fetchGetRoleMenuIds, fetchSaveRoleMenus } from '@/service/api';

defineOptions({
  name: 'MenuAuthModal'
});

interface Props {
  /** the roleId */
  roleId: string;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const title = computed(() => $t('common.edit') + $t('page.manage.role.menuAuth'));

/** menu tree data */
const tree = shallowRef<TreeOption[]>([]);

/** tree checks */
const checks = shallowRef<number[]>([]);

/** menu auth model */
const model: Api.SystemManage.RoleMenu = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.RoleMenu {
  return {
    roleId: Number(props.roleId),
    menuIds: []
  };
}

/** init menu tree */
async function getTree() {
  const { error, data } = await fetchGetMenuTree();
  if (!error && data) {
    tree.value = data.map(recursive);
  }
}

/** init get menuIds for roleId, belong checks */
async function getMenuId() {
  const { error, data } = await fetchGetRoleMenuIds(props.roleId);
  if (!error && data) {
    checks.value = data;
    await getTree();
  }
}

/** recursive menu tree data, transform treeOption format */
function recursive(item: Api.SystemManage.MenuTreeData): TreeOption {
  const label = item.i18nKey ? $t(item.i18nKey as App.I18n.I18nKey) : item.name;
  const result: TreeOption = {
    key: item.id,
    label
  };
  if (item.children?.length) {
    result.children = item.children.map(recursive);
  }
  return result;
}

/** submit */
async function handleSubmit() {
  model.menuIds = checks.value;
  const { error, data } = await fetchSaveRoleMenus(model);
  if (!error && data) {
    window.$message?.success?.($t('common.modifySuccess'));
    closeModal();
  }
}

function closeModal() {
  visible.value = false;
}

function init() {
  Object.assign(model, createDefaultModel());
  getMenuId();
}

watch(visible, val => {
  if (val) {
    init();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" class="w-480px">
    <NTree v-model:checked-keys="checks" :data="tree" block-line expand-on-click checkable cascade virtual-scroll class="h-500px" />
    <template #footer>
      <NSpace justify="end">
        <NButton quaternary @click="closeModal">
          {{ $t('common.cancel') }}
        </NButton>
        <NButton type="primary" @click="handleSubmit">
          {{ $t('common.confirm') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
