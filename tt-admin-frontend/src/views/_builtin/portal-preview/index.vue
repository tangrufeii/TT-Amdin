<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchGetPortalFileThemeDefinition, fetchGetPortalFileThemes } from '@/service/api';
import { getPortalRenderUrl } from '@/utils/portal';

defineOptions({
  name: 'PortalPreview'
});

interface ThemeSwitchOption {
  key: string;
  label: string;
  description: string;
  active: boolean;
}

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const detailLoading = ref(false);
const loadError = ref('');
const themeOptions = ref<ThemeSwitchOption[]>([]);
const selectedThemeKey = ref('');
const currentDefinition = ref<Api.Portal.FileThemeDefinition | null>(null);

const selectedTheme = computed(() => themeOptions.value.find(item => item.key === selectedThemeKey.value) || null);
const activeTheme = computed(() => themeOptions.value.find(item => item.active) || null);
const pageEntries = computed(() => Object.entries(currentDefinition.value?.pages || {}));
const previewUrl = computed(() => getPortalRenderUrl(selectedThemeKey.value));
const title = computed(() => currentDefinition.value?.title || selectedTheme.value?.label || selectedThemeKey.value || '门户主题');
const description = computed(() => currentDefinition.value?.description || selectedTheme.value?.description || '');

function resolveRouteTheme() {
  return typeof route.query.theme === 'string' ? route.query.theme : '';
}

async function loadThemes() {
  loading.value = true;
  loadError.value = '';

  try {
    const { data, error } = await fetchGetPortalFileThemes();
    if (error) {
      loadError.value = '文件主题列表加载失败';
      themeOptions.value = [];
      currentDefinition.value = null;
      return;
    }

    themeOptions.value = (data || []).map(item => ({
      key: item.key,
      label: item.title || item.key,
      description: item.description || '主题描述暂未配置',
      active: Boolean(item.active)
    }));

    const routeTheme = resolveRouteTheme();
    selectedThemeKey.value =
      themeOptions.value.find(item => item.key === routeTheme)?.key || activeTheme.value?.key || themeOptions.value[0]?.key || '';

    if (selectedThemeKey.value) {
      await loadDefinition(selectedThemeKey.value);
    } else {
      currentDefinition.value = null;
    }
  } finally {
    loading.value = false;
  }
}

async function loadDefinition(themeKey: string) {
  if (!themeKey) return;

  detailLoading.value = true;
  selectedThemeKey.value = themeKey;

  try {
    const { data, error } = await fetchGetPortalFileThemeDefinition(themeKey);
    currentDefinition.value = error ? null : data || null;
  } finally {
    detailLoading.value = false;
  }
}

async function switchTheme(themeKey: string) {
  if (!themeKey || themeKey === selectedThemeKey.value) return;
  router.replace({ path: '/theme-management/portal-preview', query: { theme: themeKey } });
  await loadDefinition(themeKey);
}

function backToAdmin() {
  router.push('/home');
}

function toThemeControl() {
  router.push('/theme-management/portal-themes');
}

function openRender() {
  if (!previewUrl.value) return;
  window.open(previewUrl.value, '_blank', 'noopener,noreferrer');
}

watch(
  () => route.query.theme,
  theme => {
    const themeKey = typeof theme === 'string' ? theme : '';
    if (themeKey && themeKey !== selectedThemeKey.value) {
      loadDefinition(themeKey).catch(() => undefined);
    }
  }
);

onMounted(loadThemes);
</script>

<template>
  <div class="portal-preview">
    <header class="portal-preview__topbar">
      <div class="portal-preview__brand">
        <span class="portal-preview__brand-mark">TT</span>
        <div>
          <p class="portal-preview__eyebrow">File Theme Preview</p>
          <h1 class="portal-preview__title">门户文件主题预览</h1>
        </div>
      </div>

      <div class="portal-preview__actions">
        <NButton :loading="loading" @click="loadThemes">刷新主题</NButton>
        <NButton secondary @click="toThemeControl">主题中心</NButton>
        <NButton tertiary @click="backToAdmin">返回后台</NButton>
      </div>
    </header>

    <main class="portal-preview__main">
      <NAlert v-if="loadError" type="error" :bordered="false" class="portal-preview__alert">
        {{ loadError }}
      </NAlert>

      <NSpin :show="loading">
        <div v-if="themeOptions.length" class="portal-preview__layout">
          <aside class="portal-preview__sider">
            <button
              v-for="item in themeOptions"
              :key="item.key"
              type="button"
              class="portal-preview__theme"
              :class="{ 'is-active': selectedThemeKey === item.key }"
              @click="switchTheme(item.key)"
            >
              <span>
                <strong>{{ item.label }}</strong>
                <small>{{ item.key }}</small>
              </span>
              <NTag v-if="item.active" type="success" size="small" :bordered="false">启用</NTag>
            </button>
          </aside>

          <section class="portal-preview__workspace">
            <NSpin :show="detailLoading">
              <div class="portal-preview__summary">
                <div>
                  <div class="portal-preview__meta">
                    <NTag :type="selectedTheme?.active ? 'success' : 'default'" :bordered="false">
                      {{ selectedTheme?.active ? '当前启用' : '候选主题' }}
                    </NTag>
                    <code>{{ selectedThemeKey }}</code>
                  </div>
                  <h2>{{ title }}</h2>
                  <p>{{ description || '主题描述暂未配置。' }}</p>
                </div>

                <div class="portal-preview__summary-actions">
                  <NButton secondary :disabled="!previewUrl" @click="openRender">新窗口打开</NButton>
                  <NButton type="primary" :disabled="!previewUrl" @click="toThemeControl">管理主题</NButton>
                </div>
              </div>

              <div class="portal-preview__stats">
                <article>
                  <span>页面</span>
                  <strong>{{ pageEntries.length }}</strong>
                </article>
              </div>

              <section class="portal-preview__frame-panel">
                <div class="portal-preview__frame-head">
                  <div>
                    <h3>渲染结果</h3>
                    <p>{{ previewUrl || '未选择主题' }}</p>
                  </div>
                </div>
                <iframe v-if="previewUrl" class="portal-preview__frame" :src="previewUrl" :title="title" />
                <NEmpty v-else description="未选择可预览主题" />
              </section>

              <div class="portal-preview__detail-grid">
                <section class="portal-preview__panel">
                  <div class="portal-preview__panel-head">
                    <h3>页面映射</h3>
                    <span>theme.json / pages</span>
                  </div>
                  <div v-if="pageEntries.length" class="portal-preview__routes">
                    <div v-for="[routePath, filePath] in pageEntries" :key="routePath">
                      <code>{{ routePath }}</code>
                      <span>{{ filePath }}</span>
                    </div>
                  </div>
                  <NEmpty v-else description="未声明页面映射" />
                </section>
              </div>
            </NSpin>
          </section>
        </div>

        <NEmpty v-else description="没有扫描到文件主题。">
          <template #extra>
            <NButton @click="loadThemes">重新扫描</NButton>
          </template>
        </NEmpty>
      </NSpin>
    </main>
  </div>
</template>

<style scoped>
.portal-preview {
  min-height: 100vh;
  background: #f5f7fb;
  color: #172033;
  padding: 20px;
}

.portal-preview__topbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  margin: 0 auto 16px;
  max-width: 1480px;
}

.portal-preview__brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.portal-preview__brand-mark {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #2563eb;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}

.portal-preview__eyebrow {
  margin: 0 0 4px;
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
}

.portal-preview__title {
  margin: 0;
  font-size: 24px;
  line-height: 1.2;
}

.portal-preview__actions,
.portal-preview__summary-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.portal-preview__main {
  margin: 0 auto;
  max-width: 1480px;
}

.portal-preview__alert {
  margin-bottom: 14px;
  border-radius: 8px;
}

.portal-preview__layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 16px;
}

.portal-preview__sider,
.portal-preview__workspace,
.portal-preview__summary,
.portal-preview__frame-panel,
.portal-preview__panel {
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 10px 30px rgb(15 23 42 / 0.06);
}

.portal-preview__sider {
  display: grid;
  align-content: start;
  gap: 8px;
  padding: 12px;
}

.portal-preview__theme {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  padding: 12px;
  text-align: left;
  cursor: pointer;
}

.portal-preview__theme:hover,
.portal-preview__theme.is-active {
  border-color: rgb(37 99 235 / 0.16);
  background: #f5f8ff;
}

.portal-preview__theme span {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.portal-preview__theme strong,
.portal-preview__theme small {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.portal-preview__theme small,
.portal-preview__summary p,
.portal-preview__frame-head p,
.portal-preview__panel-head span {
  color: #64748b;
}

.portal-preview__workspace {
  min-width: 0;
  padding: 16px;
}

.portal-preview__summary {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  box-shadow: none;
  padding: 16px;
  background: #f8fafc;
}

.portal-preview__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.portal-preview__meta code,
.portal-preview__routes code {
  border-radius: 6px;
  background: #e2e8f0;
  padding: 3px 7px;
  color: #334155;
  font-size: 12px;
}

.portal-preview__summary h2 {
  margin: 12px 0 0;
  font-size: 24px;
  line-height: 1.25;
}

.portal-preview__summary p {
  margin: 8px 0 0;
  line-height: 1.7;
}

.portal-preview__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.portal-preview__stats article {
  display: grid;
  gap: 6px;
  border-radius: 8px;
  background: #f8fafc;
  padding: 14px;
}

.portal-preview__stats span {
  color: #64748b;
  font-size: 12px;
}

.portal-preview__stats strong {
  font-size: 28px;
  line-height: 1;
}

.portal-preview__frame-panel {
  overflow: hidden;
  margin-top: 12px;
}

.portal-preview__frame-head {
  padding: 14px 16px;
  border-bottom: 1px solid #eef2f7;
}

.portal-preview__frame-head h3,
.portal-preview__panel-head h3 {
  margin: 0;
  font-size: 15px;
}

.portal-preview__frame-head p {
  margin: 6px 0 0;
  word-break: break-all;
}

.portal-preview__frame {
  display: block;
  width: 100%;
  min-height: 620px;
  border: 0;
  background: #fff;
}

.portal-preview__detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 12px;
  margin-top: 12px;
}

.portal-preview__panel {
  padding: 14px;
  box-shadow: none;
  background: #f8fafc;
}

.portal-preview__panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.portal-preview__routes,
.portal-preview__tags {
  display: grid;
  gap: 8px;
}

.portal-preview__routes div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-radius: 8px;
  background: #fff;
  padding: 10px;
}

.portal-preview__routes span {
  min-width: 0;
  overflow: hidden;
  color: #475569;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.portal-preview__tags {
  grid-template-columns: repeat(auto-fit, minmax(120px, max-content));
}

@media (max-width: 1100px) {
  .portal-preview__topbar,
  .portal-preview__layout,
  .portal-preview__summary,
  .portal-preview__detail-grid {
    display: grid;
    grid-template-columns: 1fr;
  }

  .portal-preview__actions,
  .portal-preview__summary-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .portal-preview {
    padding: 14px;
  }

  .portal-preview__stats {
    grid-template-columns: 1fr;
  }

  .portal-preview__frame {
    min-height: 520px;
  }
}
</style>
