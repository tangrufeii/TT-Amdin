<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref, shallowRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { $t } from '@/locales';

const PLUGIN_ROUTE_QUERY_KEY = 'pluginRouteName';

const route = useRoute();
const router = useRouter();

const targetRouteName = ref('');
const componentResolved = ref(false);
const targetComponent = shallowRef<any>(null);
const targetProps = ref<Record<string, any> | undefined>(undefined);

function goPluginManagement() {
  router.push({ name: 'plugin-management' });
}

function readTargetRouteName() {
  const queryValue = route.query?.[PLUGIN_ROUTE_QUERY_KEY];
  if (typeof queryValue === 'string' && queryValue.trim()) {
    return queryValue.trim();
  }

  const metaQuery = Array.isArray(route.meta?.query) ? route.meta.query : [];
  const metaValue = metaQuery.find((item: any) => item?.key === PLUGIN_ROUTE_QUERY_KEY)?.value;
  if (typeof metaValue === 'string' && metaValue.trim()) {
    return metaValue.trim();
  }

  return '';
}

function resolveRouteProps(record: any) {
  const rawProps = record?.props?.default ?? record?.props;
  if (rawProps === true) {
    return route.params as Record<string, any>;
  }
  if (typeof rawProps === 'function') {
    return rawProps(route);
  }
  if (rawProps && typeof rawProps === 'object') {
    return rawProps;
  }
  return undefined;
}

function resolveRouteComponent(record: any) {
  const rawComponent = record?.components?.default ?? record?.component;
  if (!rawComponent) {
    return null;
  }
  if (typeof rawComponent === 'function') {
    return defineAsyncComponent(rawComponent as any);
  }
  return rawComponent;
}

function tryRenderTargetRouteInPlace() {
  const target = readTargetRouteName();
  targetRouteName.value = target;
  componentResolved.value = false;
  targetComponent.value = null;
  targetProps.value = undefined;

  if (!target || String(route.name || '') === target || !router.hasRoute(target)) {
    return;
  }

  const targetRecord = router.getRoutes().find(item => String(item.name || '') === target);
  if (!targetRecord) {
    return;
  }

  const resolvedComponent = resolveRouteComponent(targetRecord);
  if (!resolvedComponent) {
    return;
  }

  targetProps.value = resolveRouteProps(targetRecord);
  targetComponent.value = resolvedComponent;
  componentResolved.value = true;
}

const description = computed(() => {
  if (!targetRouteName.value) {
    return $t('page.pluginRootEmpty.description');
  }
  if (componentResolved.value) {
    return $t('page.pluginRootEmpty.description');
  }
  return `${$t('page.pluginRootEmpty.description')} (${targetRouteName.value})`;
});

onMounted(() => {
  tryRenderTargetRouteInPlace();
});
</script>

<template>
  <div class="plugin-empty-page">
    <div v-if="targetComponent" class="plugin-proxy-view">
      <component :is="targetComponent" v-bind="targetProps" />
    </div>
    <NCard v-else class="plugin-empty-card" :bordered="false">
      <NEmpty :description="description">
        <template #extra>
          <NButton type="primary" @click="goPluginManagement">{{ $t('page.pluginRootEmpty.action') }}</NButton>
        </template>
      </NEmpty>
    </NCard>
  </div>
</template>

<style scoped>
.plugin-empty-page {
  min-height: calc(100vh - 220px);
  padding: 24px;
}

.plugin-proxy-view {
  min-height: calc(100vh - 220px);
}

.plugin-empty-card {
  width: min(560px, 100%);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
