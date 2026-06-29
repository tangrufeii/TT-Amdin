<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue';
import { NButton, NTag } from 'naive-ui';
import { fetchGetPortalFileThemeDefinition, fetchGetPortalFileThemes, fetchSwitchPortalFileTheme } from '@/service/api';
import { getPortalHomeUrl, getPortalRenderUrl } from '@/utils/portal';

defineOptions({
  name: 'PortalThemeControl'
});

const loading = ref(false);
const detailLoading = ref(false);
const detailVisible = ref(false);
const switchingThemeKey = ref('');
const fileThemes = ref<Api.Portal.FileThemeSummary[]>([]);
const currentDefinition = ref<Api.Portal.FileThemeDefinition | null>(null);

const activeTheme = computed(() => fileThemes.value.find(item => item.active) || null);
const inactiveThemeCount = computed(() => fileThemes.value.filter(item => !item.active).length);
const currentDefinitionJson = computed(() =>
  currentDefinition.value ? JSON.stringify(currentDefinition.value, null, 2) : ''
);

const columns = [
  {
    title: '主题',
    key: 'title',
    render(row: Api.Portal.FileThemeSummary) {
      return h('div', { class: 'theme-table-name' }, [
        h('strong', row.title || row.key),
        h('span', row.description || '主题描述暂未配置')
      ]);
    }
  },
  {
    title: '目录键',
    key: 'key',
    width: 160,
    render(row: Api.Portal.FileThemeSummary) {
      return h('code', row.key);
    }
  },
  {
    title: '状态',
    key: 'active',
    width: 120,
    render(row: Api.Portal.FileThemeSummary) {
      return h(
        NTag,
        { type: row.active ? 'success' : 'default', bordered: false },
        { default: () => (row.active ? '当前启用' : '未启用') }
      );
    }
  },
  {
    title: '页面',
    key: 'pages',
    width: 180,
    render(row: Api.Portal.FileThemeSummary) {
      return Object.keys(row.pages || {}).join(', ') || '-';
    }
  },
  {
    title: '操作',
    key: 'actions',
    width: 320,
    render(row: Api.Portal.FileThemeSummary) {
      return h('div', { class: 'theme-table-actions' }, [
        h(
          NButton,
          { size: 'small', secondary: true, onClick: () => openPreview(row.key) },
          { default: () => '预览' }
        ),
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            secondary: true,
            disabled: row.active,
            loading: switchingThemeKey.value === row.key,
            onClick: () => switchTheme(row.key)
          },
          { default: () => (row.active ? '当前主题' : '设为当前') }
        ),
        h(
          NButton,
          { size: 'small', type: 'primary', secondary: true, onClick: () => openDefinition(row.key) },
          { default: () => '查看配置' }
        )
      ]);
    }
  }
];

async function loadThemes() {
  loading.value = true;
  try {
    const { data, error } = await fetchGetPortalFileThemes();
    if (error) return;

    fileThemes.value = data || [];
  } finally {
    loading.value = false;
  }
}

async function switchTheme(themeKey: string) {
  switchingThemeKey.value = themeKey;
  try {
    const { error } = await fetchSwitchPortalFileTheme(themeKey);
    if (error) return;

    await loadThemes();
  } finally {
    switchingThemeKey.value = '';
  }
}

async function openDefinition(themeKey: string) {
  detailVisible.value = true;
  detailLoading.value = true;
  try {
    const { data, error } = await fetchGetPortalFileThemeDefinition(themeKey);
    if (error) return;

    currentDefinition.value = data || null;
  } finally {
    detailLoading.value = false;
  }
}

function openPreview(themeKey: string) {
  window.open(getPortalRenderUrl(themeKey), '_blank', 'noopener,noreferrer');
}

function openPortal() {
  window.open(getPortalHomeUrl(), '_blank', 'noopener,noreferrer');
}

onMounted(loadThemes);
</script>

<template>
  <NSpace vertical :size="16">
    <NCard :bordered="false" class="card-wrapper theme-center-hero">
      <div class="theme-center-hero__main">
        <div>
          <p class="theme-center-hero__eyebrow">File Theme Center</p>
          <h2 class="theme-center-hero__title">文件主题管理</h2>
          <p class="theme-center-hero__desc">
            这里管理 `resources/themes` 下真正参与门户渲染的文件主题。主题结构由 `theme.json` 描述，当前启用主题由后台在线切换。
          </p>
        </div>

        <div class="theme-center-hero__actions">
          <NButton :loading="loading" @click="loadThemes">刷新</NButton>
          <NButton type="primary" @click="openPortal">打开门户 /</NButton>
        </div>
      </div>

      <div class="theme-center-summary">
        <article class="theme-center-summary__card">
          <span>当前主题</span>
          <strong>{{ activeTheme?.title || activeTheme?.key || '未设置' }}</strong>
          <small>{{ activeTheme?.description || '在 theme.json 中把 active 设为 true 即可启用。' }}</small>
        </article>
        <article class="theme-center-summary__card">
          <span>文件主题</span>
          <strong>{{ fileThemes.length }}</strong>
          <small>扫描 `resources/themes/*/theme.json` 得到。</small>
        </article>
        <article class="theme-center-summary__card">
          <span>未启用</span>
          <strong>{{ inactiveThemeCount }}</strong>
          <small>点击“设为当前”即可在线切换门户整站主题。</small>
        </article>
      </div>
    </NCard>

    <NCard :bordered="false" class="card-wrapper">
      <NDataTable :loading="loading" :columns="columns" :data="fileThemes" :pagination="{ pageSize: 10 }" />
    </NCard>

    <NModal v-model:show="detailVisible" preset="card" class="w-900px" title="主题配置">
      <NSpin :show="detailLoading">
        <NSpace vertical :size="16">
          <div class="definition-summary">
            <article>
              <span>主题</span>
              <strong>{{ currentDefinition?.title || currentDefinition?.id || '-' }}</strong>
            </article>
            <article>
              <span>页面</span>
              <strong>{{ Object.keys(currentDefinition?.pages || {}).length }}</strong>
            </article>
          </div>

          <NCode :code="currentDefinitionJson" language="json" word-wrap />
        </NSpace>
      </NSpin>
    </NModal>
  </NSpace>
</template>

<style scoped>
.theme-center-hero {
  overflow: hidden;
  border-radius: 16px;
  background:
    radial-gradient(circle at top left, rgb(37 99 235 / 0.14), transparent 34%),
    linear-gradient(180deg, #fff 0%, #f3f6fb 100%);
}

.theme-center-hero__main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.theme-center-hero__eyebrow {
  margin: 0 0 8px;
  color: #4f5f80;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

.theme-center-hero__title {
  margin: 0;
  color: #162033;
  font-size: 28px;
  font-weight: 700;
}

.theme-center-hero__desc {
  max-width: 860px;
  margin: 12px 0 0;
  color: #5f6d86;
  line-height: 1.8;
}

.theme-center-hero__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
}

.theme-center-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.theme-center-summary__card,
.definition-summary article {
  display: grid;
  gap: 8px;
  border-radius: 12px;
  background: rgb(255 255 255 / 0.84);
  padding: 18px;
  box-shadow: inset 0 0 0 1px rgb(148 163 184 / 0.12);
}

.theme-center-summary__card span,
.definition-summary span {
  color: #5b6b88;
  font-size: 13px;
}

.theme-center-summary__card strong,
.definition-summary strong {
  color: #162033;
  font-size: 28px;
  font-weight: 700;
}

.theme-center-summary__card small {
  color: #66758f;
  line-height: 1.7;
}

.definition-summary {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 12px;
}

:deep(.theme-table-name) {
  display: grid;
  gap: 6px;
}

:deep(.theme-table-name strong) {
  color: #162033;
  font-size: 15px;
}

:deep(.theme-table-name span) {
  color: #66758f;
  font-size: 13px;
}

:deep(.theme-table-actions) {
  display: flex;
  gap: 8px;
}

@media (max-width: 900px) {
  .theme-center-hero__main,
  .theme-center-summary,
  .definition-summary {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
