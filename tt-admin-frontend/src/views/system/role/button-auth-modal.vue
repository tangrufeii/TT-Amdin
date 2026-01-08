<script setup lang="ts">
import { computed, reactive, shallowRef, watch } from 'vue';
import { $t } from '@/locales';
import { fetchGetMenuPermissions, fetchGetRolePermissionIds, fetchSaveRolePermissions } from '@/service/api';
import { useAuthStore } from '@/store/modules/auth';
import { useRouteStore } from '@/store/modules/route';

defineOptions({
  name: 'ButtonAuthModal'
});

interface Props {
  /** the roleId */
  roleId: string;
}

const props = defineProps<Props>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const title = computed(() => $t('common.edit') + $t('page.manage.role.buttonAuth'));

/** permission checks */
const checks = shallowRef<number[]>([]);

/** permission auth model */
const model: Api.SystemManage.RolePermission = reactive(createDefaultModel());

function createDefaultModel(): Api.SystemManage.RolePermission {
  return {
    roleId: Number(props.roleId),
    permissionIds: []
  };
}

/** menu permission data */
const permissionData = shallowRef<Api.SystemManage.MenuPermission[]>([]);

async function getPermissionData() {
  const { error, data } = await fetchGetMenuPermissions();
  if (!error && data) {
    permissionData.value = data;
  }
}

/** init get permissionIds for roleId, belong checks */
async function getPermissionIds() {
  const { error, data } = await fetchGetRolePermissionIds(props.roleId);
  if (!error && data) {
    checks.value = data;
    await getPermissionData();
  }
}

function closeModal() {
  visible.value = false;
}

async function handleSubmit() {
  model.permissionIds = checks.value;
  const { error, data } = await fetchSaveRolePermissions(model);
  if (!error && data) {
    window.$message?.success?.($t('common.modifySuccess'));
    const authStore = useAuthStore();
    const routeStore = useRouteStore();
    await authStore.initUserInfo();
    await routeStore.initAuthRoute();
    closeModal();
  }
}

watch(visible, () => {
  if (visible.value) {
    Object.assign(model, createDefaultModel());
    getPermissionIds();
  }
});
</script>

<template>
  <NModal v-model:show="visible" :title="title" preset="card" :segmented="false" class="w-1080px">
    <NCheckboxGroup v-model:value="checks" class="h-500px overflow-auto" size="small">
      <NDescriptions label-placement="left" bordered :column="1">
        <NDescriptionsItem
          v-for="item in permissionData"
          :key="item.menuId"
          :label="item.i18nKey ? $t(item.i18nKey as App.I18n.I18nKey) : item.menuName"
        >
          <NGrid :y-gap="8" :cols="4">
            <NGridItem v-for="button in item.buttons" :key="button.id">
              <NCheckbox :value="button.id" :label="button.name" />
            </NGridItem>
          </NGrid>
        </NDescriptionsItem>
      </NDescriptions>
    </NCheckboxGroup>
    <template #footer>
      <NSpace justify="end">
        <NButton size="small" quaternary @click="closeModal">
          {{ $t('common.cancel') }}
        </NButton>
        <NButton type="primary" size="small" @click="handleSubmit">
          {{ $t('common.confirm') }}
        </NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped></style>
