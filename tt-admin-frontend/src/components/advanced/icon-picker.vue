<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { addCollection } from '@iconify/vue';
import { NButton, NCard, NInput, NInputGroup, NModal, NPagination, NSelect, NSpin, NTabs, NTabPane } from 'naive-ui';
import SvgIcon from '@/components/custom/svg-icon.vue';
import { getLocalIcons } from '@/utils/icon';

type IconType = '1' | '2';
type IconParkStyle = 'outline' | 'solid' | 'twotone';

interface Props {
  iconType: IconType;
  placeholder?: string;
  disabled?: boolean;
}

interface IconParkMeta {
  id: number;
  title: string;
  name: string;
  category: string;
  categoryCN: string;
  author?: string;
  tag?: string[];
  rtl?: boolean;
}

const props = defineProps<Props>();
const value = defineModel<string>('value', { default: '' });

const showModal = ref(false);
const keyword = ref('');
const activeTab = ref<'iconpark' | 'local'>('iconpark');
const iconParkStyle = ref<IconParkStyle>('outline');
const iconParkIcons = ref<string[]>([]);
const iconParkMeta = ref<IconParkMeta[]>([]);
const iconParkMetaLoaded = ref(false);
const iconParkLoading = ref(false);
const localIcons = ref<string[]>([]);
const iconParkPage = ref(1);
const localPage = ref(1);
const pageSize = ref(180);
const pageSizeOptions = [120, 180, 240, 360];

const iconParkStyleOptions = [
  { label: 'Outline', value: 'outline' },
  { label: 'Solid', value: 'solid' },
  { label: 'TwoTone', value: 'twotone' }
];

const iconParkPrefix = computed(() => `icon-park-${iconParkStyle.value}`);

const iconParkList = computed<IconParkMeta[]>(() => {
  if (iconParkMetaLoaded.value && iconParkMeta.value.length) {
    return iconParkMeta.value;
  }
  return iconParkIcons.value.map((name, index) => ({
    id: index,
    name,
    title: '',
    category: '',
    categoryCN: ''
  }));
});

const filteredIconPark = computed(() => {
  const available = new Set(iconParkIcons.value);
  const inputRaw = keyword.value.trim();
  if (!inputRaw) {
    return iconParkList.value.filter(item => available.has(item.name));
  }
  const input = inputRaw.toLowerCase();
  return iconParkList.value.filter(item => {
    if (!available.has(item.name)) return false;
    const name = item.name?.toLowerCase() || '';
    const title = item.title || '';
    const categoryCN = item.categoryCN || '';
    const category = item.category?.toLowerCase() || '';
    const tags = item.tag || [];
    return (
      name.includes(input) ||
      category.includes(input) ||
      title.includes(inputRaw) ||
      categoryCN.includes(inputRaw) ||
      tags.some(tag => tag.includes(inputRaw) || tag.toLowerCase().includes(input))
    );
  });
});

const visibleIconPark = computed(() => {
  const start = (iconParkPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredIconPark.value.slice(start, end);
});

const filteredLocalIcons = computed(() => {
  const input = keyword.value.trim().toLowerCase();
  if (!input) return localIcons.value;
  return localIcons.value.filter(name => name.includes(input));
});

const visibleLocalIcons = computed(() => {
  const start = (localPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredLocalIcons.value.slice(start, end);
});

function syncTabByType(type: IconType) {
  activeTab.value = type === '2' ? 'local' : 'iconpark';
}

async function openModal() {
  syncTabByType(props.iconType);
  showModal.value = true;
  await nextTick();
  await ensureIconData();
}

function closeModal() {
  showModal.value = false;
}

async function ensureIconData() {
  if (activeTab.value === 'iconpark') {
    await loadIconParkMeta();
    await loadIconParkIcons(iconParkStyle.value);
  } else {
    if (localIcons.value.length === 0) {
      localIcons.value = getLocalIcons();
    }
  }
}

const iconParkCache = new Map<string, string[]>();

async function loadIconParkMeta() {
  if (iconParkMetaLoaded.value) return;
  try {
    const response = await fetch('/iconpark-icons.json');
    if (!response.ok) return;
    const payload = await response.json();
    if (Array.isArray(payload)) {
      iconParkMeta.value = payload as IconParkMeta[];
      iconParkMetaLoaded.value = true;
    }
  } catch {
    iconParkMetaLoaded.value = false;
  }
}

async function loadIconParkIcons(style: IconParkStyle) {
  if (iconParkCache.has(style)) {
    iconParkIcons.value = iconParkCache.get(style) || [];
    return;
  }
  iconParkLoading.value = true;
  try {
    let data: any = null;
    if (style === 'outline') {
      ({ default: data } = await import('@iconify/json/json/icon-park-outline.json'));
    } else if (style === 'solid') {
      ({ default: data } = await import('@iconify/json/json/icon-park-solid.json'));
    } else {
      ({ default: data } = await import('@iconify/json/json/icon-park-twotone.json'));
    }
    if (data) {
      addCollection(data);
      const names = Object.keys(data.icons || {});
      iconParkCache.set(style, names);
      iconParkIcons.value = names;
    }
  } finally {
    iconParkLoading.value = false;
  }
}

function selectIcon(name: string) {
  if (activeTab.value === 'local') {
    value.value = name;
  } else {
    value.value = `${iconParkPrefix.value}:${name}`;
  }
  closeModal();
}

watch(
  () => props.iconType,
  type => {
    syncTabByType(type);
  }
);

watch(iconParkStyle, async () => {
  if (activeTab.value !== 'iconpark') return;
  iconParkPage.value = 1;
  await loadIconParkIcons(iconParkStyle.value);
});

watch(activeTab, async () => {
  keyword.value = '';
  iconParkPage.value = 1;
  localPage.value = 1;
  await ensureIconData();
});

watch(keyword, () => {
  iconParkPage.value = 1;
  localPage.value = 1;
});
</script>

<template>
  <div class="icon-picker">
    <NInputGroup>
      <NInput v-model:value="value" :placeholder="props.placeholder" :disabled="props.disabled">
        <template #prefix>
          <SvgIcon
            v-if="value"
            :icon="props.iconType === '1' ? value : undefined"
            :local-icon="props.iconType === '2' ? value : undefined"
            class="text-icon"
          />
        </template>
      </NInput>
      <NButton :disabled="props.disabled" @click="openModal">选择</NButton>
    </NInputGroup>
  </div>

  <NModal
    v-model:show="showModal"
    preset="card"
    title="选择图标"
    class="icon-picker-modal"
    :bordered="false"
    :style="{ width: '860px', maxWidth: '86vw' }"
  >
    <div class="icon-picker-toolbar">
      <NInput v-model:value="keyword" clearable placeholder="支持中文/英文关键词搜索" />
      <NSelect
        v-if="activeTab === 'iconpark'"
        v-model:value="iconParkStyle"
        class="icon-picker-style"
        :options="iconParkStyleOptions"
      />
    </div>
    <NTabs v-model:value="activeTab" type="line">
      <NTabPane name="iconpark" tab="IconPark">
        <NSpin :show="iconParkLoading">
          <div class="icon-picker-meta">共 {{ filteredIconPark.length }} 个，显示 {{ visibleIconPark.length }} 个</div>
          <div class="icon-grid-wrapper">
            <div class="icon-grid">
              <button
                v-for="item in visibleIconPark"
                :key="item.name"
                class="icon-grid-item"
                type="button"
                @click="selectIcon(item.name)"
              >
                <SvgIcon :icon="`${iconParkPrefix}:${item.name}`" class="text-20px" />
                <span class="icon-grid-name">{{ item.title || item.name }}</span>
                <span v-if="item.categoryCN" class="icon-grid-desc">{{ item.categoryCN }}</span>
              </button>
            </div>
            <NCard v-if="!visibleIconPark.length" size="small" class="icon-empty">无匹配图标</NCard>
          </div>
          <div v-if="filteredIconPark.length > pageSize" class="icon-pagination">
            <NPagination
              v-model:page="iconParkPage"
              v-model:page-size="pageSize"
              size="small"
              :page-sizes="pageSizeOptions"
              :item-count="filteredIconPark.length"
              show-size-picker
            />
          </div>
        </NSpin>
      </NTabPane>
      <NTabPane name="local" tab="本地图标">
        <div class="icon-picker-meta">共 {{ filteredLocalIcons.length }} 个，显示 {{ visibleLocalIcons.length }} 个</div>
        <div class="icon-grid-wrapper">
          <div class="icon-grid">
            <button
              v-for="name in visibleLocalIcons"
              :key="name"
              class="icon-grid-item"
              type="button"
              @click="selectIcon(name)"
            >
              <SvgIcon :local-icon="name" class="text-20px" />
              <span class="icon-grid-name">{{ name }}</span>
            </button>
          </div>
          <NCard v-if="!visibleLocalIcons.length" size="small" class="icon-empty">无匹配图标</NCard>
        </div>
        <div v-if="filteredLocalIcons.length > pageSize" class="icon-pagination">
          <NPagination
            v-model:page="localPage"
            v-model:page-size="pageSize"
            size="small"
            :page-sizes="pageSizeOptions"
            :item-count="filteredLocalIcons.length"
            show-size-picker
          />
        </div>
      </NTabPane>
    </NTabs>
  </NModal>
</template>

<style scoped>
.icon-picker-modal {
  width: min(860px, 86vw);
  max-height: 80vh;
  margin: 6vh auto 0;
}

.icon-picker-toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.icon-picker-style {
  width: 140px;
}

.icon-picker-meta {
  margin: 8px 0 12px;
  font-size: 12px;
  color: var(--n-text-color-3);
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 10px;
}

.icon-grid-wrapper {
  max-height: 50vh;
  overflow: auto;
  padding-right: 4px;
}

.icon-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 8px;
  border: 1px solid var(--n-border-color);
  border-radius: 6px;
  background: var(--n-color);
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-grid-item:hover {
  border-color: var(--n-primary-color);
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.12);
}

.icon-grid-name {
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: var(--n-text-color-2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-grid-desc {
  width: 100%;
  text-align: center;
  font-size: 11px;
  color: var(--n-text-color-3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-empty {
  margin-top: 12px;
  text-align: center;
}

.icon-pagination {
  display: flex;
  justify-content: center;
  margin: 12px 0 4px;
}

:deep(.n-card__content) {
  overflow: hidden;
}
</style>
