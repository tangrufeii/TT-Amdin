<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useBoolean } from '@sa/hooks';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useDict } from '@/hooks/business/dict';
import { fetchAddMenu, fetchGetMenuDetail, fetchUpdateMenu } from '@/service/api';
import { $t } from '@/locales';
import { getLayoutAndPage, getPathParamFromRoutePath, getRoutePathByRouteName, getRoutePathWithParam, transformLayoutAndPageToComponent } from './shared';

export type OperateType = 'add' | 'addChild' | 'edit';

interface Props {
  operateType: OperateType;
  rowData: Api.SystemManage.MenuDetail;
  allPages: string[];
}

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'submitted', data: Api.SystemManage.MenuDetail | null): void }>();

const visible = defineModel<boolean>('visible', { default: false });

const { dictOptions } = useDict();
const { formRef, validate, restoreValidation } = useNaiveForm();
const { defaultRequiredRule } = useFormRules();
const { bool: submitting, setTrue: startSubmitting, setFalse: stopSubmitting } = useBoolean();

const title = computed(() => {
  const map: Record<OperateType, string> = {
    add: $t('page.manage.menu.addMenu'),
    addChild: $t('page.manage.menu.addChildMenu'),
    edit: $t('page.manage.menu.editMenu')
  };
  return map[props.operateType];
});

interface FormModel extends Api.SystemManage.MenuEdit {
  layout: string;
  page: string;
  pathParam: string;
  query: Api.SystemManage.MenuQuery[];
}

const model: FormModel = reactive(createDefaultModel());

function createDefaultModel(): FormModel {
  return {
    id: undefined,
    parentId: 0,
    type: '1',
    name: '',
    code: '',
    i18nKey: '',
    routeName: '',
    routePath: '',
    component: '',
    icon: '',
    iconType: '1',
    status: '1',
    hide: 'N',
    href: '',
    iframeUrl: '',
    keepAlive: 'Y',
    sort: 0,
    multiTab: 'N',
    fixedIndexInTab: -1,
    remark: '',
    query: [],
    layout: 'base',
    page: '',
    pathParam: ''
  };
}

const rules: Record<'name' | 'routeName' | 'routePath', App.Global.FormRule> = {
  name: defaultRequiredRule,
  routeName: defaultRequiredRule,
  routePath: defaultRequiredRule
};

const layoutOptions: CommonType.Option[] = [
  { label: 'base', value: 'base' },
  { label: 'blank', value: 'blank' }
];

const pageOptions = computed(() => {
  const opts = new Set(props.allPages);
  if (model.routeName && !opts.has(model.routeName)) {
    opts.add(model.routeName);
  }
  return Array.from(opts).map(item => ({ label: item, value: item }));
});

async function handleInitModel() {
  Object.assign(model, createDefaultModel());
  if (props.operateType === 'addChild') {
    model.parentId = props.rowData.id;
    model.type = '2';
  }
  if (props.operateType === 'edit' && props.rowData.id) {
    const { data, error } = await fetchGetMenuDetail(props.rowData.id);
    if (!error && data) {
      applyDetail(data);
    }
  }
}

function applyDetail(detail: Api.SystemManage.MenuDetail) {
  const { layout, page } = getLayoutAndPage(detail.component);
  const { path, param } = getPathParamFromRoutePath(detail.routePath);
  Object.assign(model, detail, {
    layout: layout || 'base',
    page,
    pathParam: param,
    routePath: path
  });
}

function handleUpdateRouteByName() {
  model.routePath = getRoutePathByRouteName(model.routeName);
  if (!model.i18nKey) {
    model.i18nKey = `route.${model.routeName}`;
  }
}

function getSubmitParams() {
  const { layout, page, pathParam, ...rest } = model;
  const component = transformLayoutAndPageToComponent(layout, page || model.routeName);
  const routePath = getRoutePathWithParam(model.routePath, pathParam);
  return {
    ...rest,
    component,
    routePath
  } as Api.SystemManage.MenuEdit & { id?: number };
}

async function handleSubmit() {
  await validate();
  startSubmitting();
  const params = getSubmitParams();
  const api = props.operateType === 'edit' ? fetchUpdateMenu : fetchAddMenu;
  const { data, error } = await api(params as any);
  stopSubmitting();
  if (!error && data) {
    window.$message?.success(props.operateType === 'edit' ? $t('common.updateSuccess') : $t('common.addSuccess'));
    emit('submitted', null);
    visible.value = false;
  }
}

watch(visible, value => {
  if (value) {
    handleInitModel();
    restoreValidation();
  }
});

watch(
  () => model.routeName,
  () => {
    handleUpdateRouteByName();
  }
);
</script>

<template>
  <NDrawer v-model:show="visible" display-directive="show" width="sm:460 s:360">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="80">
        <NGrid :cols="24" :x-gap="12">
          <NFormItemGi span="12" :label="$t('page.manage.menu.type')" path="type">
            <NRadioGroup v-model:value="model.type">
              <NRadio v-for="item in dictOptions('menu_type')" :key="item.value" :value="item.value" :label="item.label" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.status')" path="status">
            <NRadioGroup v-model:value="model.status">
              <NRadio v-for="item in dictOptions('status')" :key="item.value" :value="item.value" :label="item.label" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.name')" path="name">
            <NInput v-model:value="model.name" :placeholder="$t('page.manage.menu.form.name')" />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.routeName')" path="routeName">
            <NInput v-model:value="model.routeName" :placeholder="$t('page.manage.menu.form.routeName')" />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.i18nKey')" path="i18nKey">
            <NInput v-model:value="model.i18nKey" :placeholder="$t('page.manage.menu.form.i18nKey')" />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.iconTypeTitle')">
            <NRadioGroup v-model:value="model.iconType">
              <NRadio v-for="item in dictOptions('menu_icon_type')" :key="item.value" :value="item.value" :label="item.label" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.icon')">
            <NInput v-model:value="model.icon" :placeholder="$t('page.manage.menu.form.icon')" />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.routePath')" path="routePath">
            <NInput v-model:value="model.routePath" disabled :placeholder="$t('page.manage.menu.form.routePath')" />
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.layout')">
            <NSelect v-model:value="model.layout" :options="layoutOptions" />
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.page')">
            <NSelect v-model:value="model.page" allow-create :options="pageOptions" />
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.sort')">
            <NInputNumber v-model:value="model.sort" />
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.pathParam')">
            <NInput v-model:value="model.pathParam" :placeholder="$t('page.manage.menu.form.pathParam')" />
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.multiTab')">
            <NRadioGroup v-model:value="model.multiTab">
              <NRadio v-for="item in dictOptions('feature_status')" :key="item.value" :value="item.value" :label="item.label" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.fixedIndexInTab')">
            <NInputNumber v-model:value="model.fixedIndexInTab" />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.hideInMenu')">
            <NRadioGroup v-model:value="model.hide">
              <NRadio v-for="item in dictOptions('feature_status')" :key="item.value" :value="item.value" :label="item.label" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.keepAlive')">
            <NRadioGroup v-model:value="model.keepAlive">
              <NRadio v-for="item in dictOptions('feature_status')" :key="item.value" :value="item.value" :label="item.label" />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.href')">
            <NInput v-model:value="model.href" :placeholder="$t('page.manage.menu.form.href')" />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.iframeUrl')">
            <NInput v-model:value="model.iframeUrl" :placeholder="$t('page.manage.menu.form.iframeUrl')" />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.query')">
            <NDynamicInput
              v-model:value="model.query"
              preset="pair"
              :key-placeholder="$t('page.manage.menu.form.queryKey')"
              :value-placeholder="$t('page.manage.menu.form.queryValue')"
            />
          </NFormItemGi>
        </NGrid>
      </NForm>
      <template #footer>
        <NSpace justify="end">
          <NButton quaternary @click="() => (visible = false)">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" :loading="submitting" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>
