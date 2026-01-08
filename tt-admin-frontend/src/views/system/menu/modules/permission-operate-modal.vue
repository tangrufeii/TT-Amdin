<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { NText } from 'naive-ui';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { fetchAddPermission, fetchGetPermissionAnnotations, fetchUpdatePermission } from '@/service/api';
import { $t } from '@/locales';
import { useDict } from '@/hooks/business/dict';

defineOptions({
  name: 'PermissionOperateModal'
});

export type OperateType = NaiveUI.TableOperateType;

interface Props {
  operateType: OperateType;
  menuData: Api.SystemManage.MenuTreeData;
  rowData?: Api.SystemManage.Permission | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { dictOptions } = useDict();

const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<OperateType, string> = {
    add: $t('page.manage.permission.addButton'),
    edit: $t('page.manage.permission.editButton')
  };
  return titles[props.operateType];
});

type Model = Api.SystemManage.PermissionEdit;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    id: 0,
    menuId: 0,
    name: '',
    resource: '',
    description: '',
    status: '1',
    sort: 0
  };
}

type RuleKey = Extract<keyof Model, 'name' | 'resource' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: defaultRequiredRule,
  resource: defaultRequiredRule,
  status: defaultRequiredRule
};

const isEdit = computed(() => props.operateType === 'edit');

const resources = ref<string[]>([]);
const permissionAnnotationMap = ref<Record<string, string>>({});

const resourceOptions = computed(() =>
  Object.entries(permissionAnnotationMap.value).map(([value, label]) => ({
    value,
    label: label ? `${value} - ${label}` : value
  }))
);

async function initPermissionAnnotations() {
  const { error, data } = await fetchGetPermissionAnnotations();
  if (!error && data) {
    permissionAnnotationMap.value = data;
  }
}

async function handleInitModel() {
  initPermissionAnnotations();
  resources.value = [];
  Object.assign(model, createDefaultModel());

  if (props.operateType === 'add') {
    const { id } = props.menuData;
    Object.assign(model, { menuId: id });
    return;
  }

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
    resources.value = model.resource ? model.resource.split(';') : [];
  }
}

function closeModal() {
  visible.value = false;
}

async function handleSubmit() {
  model.resource = resources.value.join(';');
  await validate();

  const func = isEdit.value ? fetchUpdatePermission : fetchAddPermission;
  const { error, data } = await func(model as Api.SystemManage.PermissionEdit & { id: number });
  if (!error && data) {
    window.$message?.success(isEdit.value ? $t('common.updateSuccess') : $t('common.addSuccess'));
    closeModal();
    emit('submitted');
  }
}

watch(visible, () => {
  if (visible.value) {
    handleInitModel();
    restoreValidation();
  }
});
</script>

<template>
  <NModal v-model:show="visible" preset="card" :segmented="false" :title="title" class="w-900px">
    <NForm ref="formRef" label-placement="left" :label-width="90" :model="model" :rules="rules">
      <NGrid :x-gap="8">
        <NFormItemGi span="12" :label="$t('page.manage.permission.name')" path="name">
          <NInput v-model:value="model.name" :placeholder="$t('page.manage.permission.form.name')" />
        </NFormItemGi>
        <NFormItemGi span="6" :label="$t('page.manage.permission.status')" path="status">
          <NRadioGroup v-model:value="model.status">
            <NRadio v-for="item in dictOptions('status')" :key="item.value" :value="item.value" :label="item.label" />
          </NRadioGroup>
        </NFormItemGi>
        <NFormItemGi span="6" :label="$t('page.manage.permission.sort')" path="sort">
          <NInputNumber v-model:value="model.sort" :placeholder="$t('page.manage.permission.form.sort')" />
        </NFormItemGi>
        <NFormItemGi span="24" :label="$t('page.manage.permission.resource')" path="resource">
          <NDynamicInput v-model:value="resources" :placeholder="$t('page.manage.permission.form.resource')" :min="1">
            <template #default="{ index }">
              <NSelect
                v-model:value="resources[index]"
                filterable
                tag
                clearable
                :options="resourceOptions"
                :placeholder="$t('page.manage.permission.form.resource')"
              />
            </template>
            <template #action="{ index, create, remove }">
              <NSpace class="ml-8px w-50% items-center !justify-end">
                <NText depth="2" class="text-sm">
                  {{ permissionAnnotationMap[resources[index]] }}
                </NText>
                <NButton size="medium" @click="() => create(index)">
                  <icon-ic:round-plus class="text-icon" />
                </NButton>
                <NButton size="medium" @click="() => remove(index)">
                  <icon-ic-round-remove class="text-icon" />
                </NButton>
              </NSpace>
            </template>
          </NDynamicInput>
        </NFormItemGi>
        <NFormItemGi span="24">
          <NText depth="3" class="whitespace-pre-line">{{ $t('page.manage.permission.form.resourceIntroduction') }}</NText>
        </NFormItemGi>
        <NFormItemGi span="24" :label="$t('page.manage.permission.description')" path="description">
          <NInput v-model:value="model.description" type="textarea" :placeholder="$t('page.manage.permission.form.description')" />
        </NFormItemGi>
      </NGrid>
    </NForm>
    <template #footer>
      <NSpace :size="12" justify="end">
        <NButton quaternary @click="closeModal">{{ $t('common.cancel') }}</NButton>
        <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
      </NSpace>
    </template>
  </NModal>
</template>
