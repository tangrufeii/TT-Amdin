<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { useBoolean } from '@sa/hooks';
import { fetchAddMenu, fetchGetMenuDetail, fetchUpdateMenu } from '@/service/api';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';
import { views } from '@/router/elegant/imports';
import IconPicker from '@/components/advanced/icon-picker.vue';
import {
  getLayoutAndPage,
  getPathParamFromRoutePath,
  getRoutePathByRouteName,
  getRoutePathWithParam,
  transformLayoutAndPageToComponent
} from './shared';

export type OperateType = 'add' | 'addChild' | 'edit';

interface Props {
  operateType: OperateType;
  rowData: Api.SystemManage.MenuDetail;
  allPages: string[];
  availableRoutes: Array<{
    name: string;
    path: string;
  }>;
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

const builtinRouteNames = new Set(['403', '404', '500', 'login', 'iframe-page']);
const PLUGIN_ROUTE_QUERY_KEY = 'pluginRouteName';
const PLUGIN_ROUTE_BRIDGE_PAGE = 'plugin-root-empty';

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

function normalizeRoutePath(path?: string | null) {
  if (!path) return '';
  return path.startsWith('/') ? path : `/${path}`;
}

const routePathMap = computed(() => {
  const map = new Map<string, string>();
  props.availableRoutes.forEach(item => {
    const routeName = item.name?.trim();
    if (!routeName) return;
    const routePath = normalizeRoutePath(item.path);
    if (!routePath) return;
    map.set(routeName, routePath);
  });
  return map;
});

const localPageOptions = computed<CommonType.Option[]>(() => {
  const pageSet = new Set<string>(props.allPages.filter(Boolean));

  Object.keys(views).forEach(name => {
    if (!builtinRouteNames.has(name)) {
      pageSet.add(name);
    }
  });

  return Array.from(pageSet)
    .map(item => ({ label: item, value: item }))
    .sort((a, b) => String(a.value).localeCompare(String(b.value)));
});

const localPageSet = computed(() => new Set(localPageOptions.value.map(item => String(item.value))));

function isLocalPage(value: string | null | undefined) {
  if (!value) return false;
  return localPageSet.value.has(value.trim());
}

const pluginPageOptions = computed<CommonType.Option[]>(() => {
  const options: CommonType.Option[] = [];
  const seen = new Set<string>();

  props.availableRoutes.forEach(item => {
    const routeName = item.name?.trim();
    if (!routeName || builtinRouteNames.has(routeName) || isLocalPage(routeName) || seen.has(routeName)) {
      return;
    }

    seen.add(routeName);
    const routePath = normalizeRoutePath(item.path);
    options.push({
      label: routePath ? `[插件] ${routeName} (${routePath})` : `[插件] ${routeName}`,
      value: routeName
    });
  });

  return options.sort((a, b) => String(a.value).localeCompare(String(b.value)));
});

const pageOptions = computed(() => [...localPageOptions.value, ...pluginPageOptions.value]);
const selectablePageSet = computed(() => new Set(pageOptions.value.map(item => String(item.value))));
const pluginPageSet = computed(() => new Set(pluginPageOptions.value.map(item => String(item.value))));

function isSelectablePage(value: string | null | undefined) {
  if (!value) return false;
  return selectablePageSet.value.has(value.trim());
}

function isPluginRoutePage(value: string | null | undefined) {
  if (!value) return false;
  return pluginPageSet.value.has(value.trim());
}

function getQueryValue(query: Api.SystemManage.MenuQuery[] | null | undefined, key: string) {
  return (query || []).find(item => item?.key === key)?.value?.trim() || '';
}

function mergePluginRouteQuery(
  query: Api.SystemManage.MenuQuery[] | null | undefined,
  pluginRouteName: string
): Api.SystemManage.MenuQuery[] {
  const normalized = (query || [])
    .filter(item => item && item.key && item.key !== PLUGIN_ROUTE_QUERY_KEY)
    .map(item => ({ key: item.key, value: item.value || '' }));

  normalized.push({
    key: PLUGIN_ROUTE_QUERY_KEY,
    value: pluginRouteName
  });

  return normalized;
}

const rules: Record<'name' | 'routeName' | 'routePath' | 'page', App.Global.FormRule | App.Global.FormRule[]> = {
  name: defaultRequiredRule,
  routeName: [
    defaultRequiredRule,
    {
      trigger: ['blur', 'change'],
      validator: (_rule, value: string) => {
        if (model.type !== '2') return true;
        const routeName = value?.trim();
        if (!routeName) return true;
        if (isPluginRoutePage(model.page) && routeName === model.page?.trim()) {
          return new Error('菜单路由名称不能与插件路由同名，请填写业务路由名');
        }
        return true;
      }
    }
  ],
  routePath: defaultRequiredRule,
  page: {
    trigger: ['blur', 'change'],
    validator: (_rule, value: string) => {
      if (model.type !== '2') return true;
      const target = value?.trim() || model.routeName?.trim();
      if (!isSelectablePage(target)) {
        return new Error('请选择可用页面或插件路由');
      }
      return true;
    }
  }
};

const layoutOptions: CommonType.Option[] = [
  { label: 'base', value: 'base' },
  { label: 'blank', value: 'blank' }
];

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
  const pluginRouteName = getQueryValue(detail.query, PLUGIN_ROUTE_QUERY_KEY);
  const restoredPage = page === PLUGIN_ROUTE_BRIDGE_PAGE && pluginRouteName ? pluginRouteName : page;
  const hasComponentConfig = Boolean(layout || page);

  Object.assign(model, detail, {
    layout: hasComponentConfig ? layout : 'base',
    page: restoredPage,
    pathParam: param,
    routePath: path
  });
}

function handleUpdateRouteByName() {
  const routeName = model.routeName?.trim() || '';
  model.routePath = routePathMap.value.get(routeName) || getRoutePathByRouteName(routeName);

  if (!model.i18nKey && routeName) {
    model.i18nKey = `route.${model.routeName}`;
  }

  if (model.type === '2' && routeName && (!model.page || !isSelectablePage(model.page)) && isSelectablePage(routeName)) {
    model.page = routeName;
  }
}

function getSubmitParams() {
  const { layout, page, pathParam, ...rest } = model;
  const isDirectory = model.type === '1';
  const targetPage = (page || '').trim();
  const isPluginRoute = !isDirectory && isPluginRoutePage(targetPage);
  const componentPage = isDirectory
    ? ''
    : isPluginRoute
      ? PLUGIN_ROUTE_BRIDGE_PAGE
      : (targetPage || model.routeName || '').trim();

  const component = transformLayoutAndPageToComponent(layout, componentPage);
  const routePath = getRoutePathWithParam(model.routePath, isDirectory ? '' : pathParam);
  const normalizedQuery = isPluginRoute
    ? mergePluginRouteQuery(rest.query, targetPage)
    : (rest.query || []).filter(item => item?.key && item.key !== PLUGIN_ROUTE_QUERY_KEY);

  return {
    ...rest,
    component,
    query: normalizedQuery,
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
    emit('submitted', { ...model });
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

watch(
  () => model.type,
  value => {
    if (value === '1') {
      model.page = '';
      model.pathParam = '';
      return;
    }

    if (model.routeName && (!model.page || !isSelectablePage(model.page)) && isSelectablePage(model.routeName)) {
      model.page = model.routeName;
    }
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
              <NRadio
                v-for="item in dictOptions('menu_type')"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
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
              <NRadio
                v-for="item in dictOptions('menu_icon_type')"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.icon')">
            <IconPicker
              v-model:value="model.icon"
              :icon-type="model.iconType"
              :placeholder="$t('page.manage.menu.form.icon')"
            />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.routePath')" path="routePath">
            <NInput v-model:value="model.routePath" disabled :placeholder="$t('page.manage.menu.form.routePath')" />
          </NFormItemGi>
          <NFormItemGi :span="model.type === '2' ? 12 : 24" :label="$t('page.manage.menu.layout')">
            <NSelect v-model:value="model.layout" :options="layoutOptions" />
          </NFormItemGi>
          <NFormItemGi v-if="model.type === '2'" span="12" :label="$t('page.manage.menu.page')" path="page">
            <NSelect v-model:value="model.page" filterable :options="pageOptions" />
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.sort')">
            <NInputNumber v-model:value="model.sort" />
          </NFormItemGi>
          <NFormItemGi v-if="model.type === '2'" span="12" :label="$t('page.manage.menu.pathParam')">
            <NInput v-model:value="model.pathParam" :placeholder="$t('page.manage.menu.form.pathParam')" />
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.multiTab')">
            <NRadioGroup v-model:value="model.multiTab">
              <NRadio
                v-for="item in dictOptions('feature_status')"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="12" :label="$t('page.manage.menu.fixedIndexInTab')">
            <NInputNumber v-model:value="model.fixedIndexInTab" />
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.hideInMenu')">
            <NRadioGroup v-model:value="model.hide">
              <NRadio
                v-for="item in dictOptions('feature_status')"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </NRadioGroup>
          </NFormItemGi>
          <NFormItemGi span="24" :label="$t('page.manage.menu.keepAlive')">
            <NRadioGroup v-model:value="model.keepAlive">
              <NRadio
                v-for="item in dictOptions('feature_status')"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
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
