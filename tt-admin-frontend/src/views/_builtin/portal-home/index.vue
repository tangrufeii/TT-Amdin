<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { fetchGetPortalRuntime } from '@/service/api';

defineOptions({
  name: 'PortalHome'
});

const router = useRouter();

const loading = ref(false);
const portalRuntime = ref<Api.Portal.PortalRuntime | null>(null);
const loadError = ref('');

const currentTheme = computed(() => portalRuntime.value?.currentTheme || null);
const currentThemeTitle = computed(() => currentTheme.value?.title || currentTheme.value?.themeKey || '门户主题');
const portalPageUrl = computed(() => currentTheme.value?.portalPageUrl || '');

async function loadPortalRuntime() {
  loading.value = true;
  loadError.value = '';

  const { data, error } = await fetchGetPortalRuntime();
  if (error || !data?.currentTheme?.themeKey) {
    portalRuntime.value = null;
    loadError.value = '门户主题运行时加载失败';
    loading.value = false;
    return;
  }

  portalRuntime.value = data;
  loading.value = false;
}

function toAdminHome() {
  router.push('/home');
}

function toThemeControl() {
  router.push('/theme-management/portal-themes');
}

function toPreview() {
  const themeKey = currentTheme.value?.themeKey;
  router.push(
    themeKey
      ? { path: '/theme-management/portal-preview', query: { theme: themeKey } }
      : '/theme-management/portal-preview'
  );
}

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    loadPortalRuntime().catch(() => {
      loadError.value = '门户主题运行时加载失败';
      loading.value = false;
    });
  },
  { immediate: true }
);
</script>

<template>
  <main class="portal-home">
    <NSpin v-if="loading" class="portal-home__loading" :show="loading">
      <div class="portal-home__loading-inner">正在加载门户主题</div>
    </NSpin>

    <iframe v-else-if="portalPageUrl" class="portal-home__frame" :src="portalPageUrl" :title="currentThemeTitle" />

    <section v-else class="portal-home__fallback">
      <div class="portal-home__fallback-panel">
        <p class="portal-home__eyebrow">Portal Theme Missing</p>
        <h1>{{ currentThemeTitle }}</h1>
        <p>
          {{
            loadError ||
            '当前主题没有可直接加载的 portalDist 入口。主题包需要声明 artifacts.portalDist，并提供入口 index.html。'
          }}
        </p>
        <div class="portal-home__actions">
          <NButton type="primary" @click="toThemeControl">主题管理</NButton>
          <NButton secondary @click="toPreview">主题预览</NButton>
          <NButton quaternary @click="toAdminHome">进入后台</NButton>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.portal-home {
  width: 100vw;
  min-width: 0;
  height: 100vh;
  overflow: hidden;
  background: #f5f7fb;
}

.portal-home__frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: #fff;
}

.portal-home__loading,
.portal-home__fallback {
  width: 100%;
  height: 100%;
}

.portal-home__loading-inner,
.portal-home__fallback {
  display: grid;
  place-items: center;
}

.portal-home__loading-inner {
  min-height: 220px;
  color: #526070;
}

.portal-home__fallback {
  padding: 24px;
}

.portal-home__fallback-panel {
  width: min(620px, 100%);
  border: 1px solid rgb(124 139 161 / 0.22);
  border-radius: 8px;
  background: #fff;
  padding: 28px;
  box-shadow: 0 20px 56px rgb(28 39 58 / 0.12);
}

.portal-home__eyebrow {
  margin: 0 0 8px;
  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.portal-home__fallback-panel h1 {
  margin: 0;
  color: #172033;
  font-size: 26px;
  line-height: 1.25;
}

.portal-home__fallback-panel p:not(.portal-home__eyebrow) {
  margin: 14px 0 0;
  color: #526070;
  font-size: 14px;
  line-height: 1.8;
}

.portal-home__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}
</style>
