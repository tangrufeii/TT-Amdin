<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useNaiveForm, useFormRules } from '@/hooks/common/form';
import { fetchAddUser, fetchGetAllRoles, fetchUpdateUser } from '@/service/api';
import { $t } from '@/locales';

defineOptions({
  name: 'UserOperateDrawer'
});

interface Props {
  visible: boolean;
  operateType: NaiveUI.TableOperateType;
  rowData: Api.SystemManage.User | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'update:visible', value: boolean): void; (e: 'submitted'): void }>();

const { formRef, validate, restoreValidation } = useNaiveForm();
const { formRules, createRequiredRule } = useFormRules();

const roleOptions = reactive<CommonType.Option<number>[]>([]);

const model = reactive<Api.SystemManage.UserEdit>({
  userName: '',
  password: '',
  nickName: '',
  realName: '',
  phone: '',
  email: '',
  status: '1',
  roleIds: []
});

const isEdit = computed(() => props.operateType === 'edit');

const rules = computed(() => ({
  userName: formRules.userName,
  password: isEdit.value ? [] : [createRequiredRule($t('page.manage.user.form.password'))]
}));

function closeDrawer() {
  emit('update:visible', false);
}

async function loadRoles() {
  const { error, data } = await fetchGetAllRoles();
  if (!error && data) {
    roleOptions.length = 0;
    roleOptions.push(...data.map(item => ({ label: item.name, value: item.id })));
  }
}

function applyRowData() {
  if (!props.rowData) return;
  Object.assign(model, {
    id: props.rowData.id,
    userName: props.rowData.userName,
    nickName: props.rowData.nickName,
    realName: props.rowData.realName,
    phone: props.rowData.phone,
    email: props.rowData.email,
    status: props.rowData.status || '1',
    roleIds: props.rowData.roleIds || []
  });
}

function resetModel() {
  Object.assign(model, {
    id: undefined,
    userName: '',
    password: '',
    nickName: '',
    realName: '',
    phone: '',
    email: '',
    status: '1',
    roleIds: []
  });
  restoreValidation();
}

async function handleSubmit() {
  await validate();
  const payload = { ...model };
  if (isEdit.value && payload.id) {
    const { error } = await fetchUpdateUser(payload as Api.SystemManage.UserEdit & { id: number });
    if (!error) {
      window.$message?.success($t('common.updateSuccess'));
      emit('submitted');
      closeDrawer();
    }
    return;
  }
  const { error } = await fetchAddUser(payload);
  if (!error) {
    window.$message?.success($t('common.addSuccess'));
    emit('submitted');
    closeDrawer();
  }
}

watch(
  () => props.visible,
  async visible => {
    if (visible) {
      await loadRoles();
      if (isEdit.value) {
        applyRowData();
      } else {
        resetModel();
      }
    }
  }
);
</script>

<template>
  <NDrawer :show="props.visible" width="420" placement="right" @update:show="value => emit('update:visible', value)">
    <NDrawerContent :title="isEdit ? $t('common.edit') : $t('common.add')" :closable="true">
      <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="100">
        <NFormItem :label="$t('page.manage.user.userName')" path="userName">
          <NInput v-model:value="model.userName" :placeholder="$t('page.manage.user.form.userName')" />
        </NFormItem>
        <NFormItem v-if="!isEdit" :label="$t('page.manage.user.form.password')" path="password">
          <NInput v-model:value="model.password" type="password" :placeholder="$t('page.manage.user.form.password')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.nickName')">
          <NInput v-model:value="model.nickName" :placeholder="$t('page.manage.user.form.nickName')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.realName')">
          <NInput v-model:value="model.realName" :placeholder="$t('page.manage.user.form.realName')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.phone')">
          <NInput v-model:value="model.phone" :placeholder="$t('page.manage.user.form.phone')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.email')">
          <NInput v-model:value="model.email" :placeholder="$t('page.manage.user.form.email')" />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.status')">
          <NSelect
            v-model:value="model.status"
            :options="[
              { label: $t('common.yesOrNo.yes'), value: '1' },
              { label: $t('common.yesOrNo.no'), value: '0' }
            ]"
          />
        </NFormItem>
        <NFormItem :label="$t('page.manage.user.role')">
          <NSelect v-model:value="model.roleIds" multiple :options="roleOptions" :placeholder="$t('page.manage.user.form.role')" />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace justify="end">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
