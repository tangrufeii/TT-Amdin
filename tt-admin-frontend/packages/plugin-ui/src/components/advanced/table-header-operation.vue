<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { NButton, NGrid, NGridItem, NPopconfirm, NSpace } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import TableColumnSetting from './table-column-setting.vue';
import IconPlus from './IconPlus.vue';
import IconDelete from './IconDelete.vue';
import IconSave from './IconSave.vue';
import IconRefresh from './IconRefresh.vue';

defineOptions({
  name: 'TableHeaderOperation'
});

interface Props {
  loading?: boolean;
  checkedRowKeys?: string[];
  addAuth?: string;
  deleteAuth?: string;
  exportAuth?: string;
  disabledAdd?: boolean;
  disabledDelete?: boolean;
  disabledExport?: boolean;
}

interface Emits {
  (e: 'add'): void;
  (e: 'delete'): void;
  (e: 'refresh'): void;
  (e: 'export'): void;
}

const emit = defineEmits<Emits>();
const props = defineProps<Props>();
const { t } = useI18n();

const columns = defineModel<NaiveUI.TableColumnCheck[]>('columns', {
  default: () => []
});

const hasCheck = computed(() => (props.checkedRowKeys?.length ?? 0) > 0);
const showAdd = computed(() => !props.disabledAdd);
const showDelete = computed(() => !props.disabledDelete);
const showExport = computed(() => Boolean(props.exportAuth) && !props.disabledExport);

const isMobile = ref(false);
let mobileQuery: MediaQueryList | null = null;

function updateMobile() {
  if (mobileQuery) {
    isMobile.value = mobileQuery.matches;
    return;
  }
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth <= 640;
  }
}

onMounted(() => {
  if (typeof window === 'undefined') return;
  mobileQuery = window.matchMedia('(max-width: 640px)');
  updateMobile();
  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener('change', updateMobile);
  } else if (mobileQuery.addListener) {
    mobileQuery.addListener(updateMobile);
  }
});

onBeforeUnmount(() => {
  if (!mobileQuery) return;
  if (mobileQuery.removeEventListener) {
    mobileQuery.removeEventListener('change', updateMobile);
  } else if (mobileQuery.removeListener) {
    mobileQuery.removeListener(updateMobile);
  }
  mobileQuery = null;
});

function add() {
  emit('add');
}

function batchDelete() {
  emit('delete');
}

function refresh() {
  emit('refresh');
}

function exportData() {
  emit('export');
}
</script>

<template>
  <NGrid x-gap="8" y-gap="8" :cols="12" class="mb-2">
    <NGridItem span="9">
      <NSpace justify="start">
        <NButton v-if="showAdd" size="small" ghost type="primary" @click="add">
          <template #icon>
            <IconPlus class="text-icon" />
          </template>
          {{ t('common.add') }}
        </NButton>
        <NPopconfirm v-if="showDelete" placement="bottom" @positive-click="batchDelete">
          <template #trigger>
            <NButton size="small" ghost type="error" :disabled="!hasCheck">
              <template #icon>
                <IconDelete class="text-icon" />
              </template>
              {{ t('common.batchDelete') }}
            </NButton>
          </template>
          {{ t('common.confirmBatchDelete') }}
        </NPopconfirm>
      </NSpace>
    </NGridItem>
    <NGridItem v-if="!isMobile" span="3">
      <NSpace justify="end">
        <NButton v-if="showExport" size="small" quaternary @click="exportData">
          <template #icon>
            <IconSave class="text-icon" />
          </template>
        </NButton>
        <NButton size="small" quaternary @click="refresh">
          <template #icon>
            <IconRefresh class="text-icon" :class="{ 'animate-spin': loading }" />
          </template>
        </NButton>
        <TableColumnSetting v-model:columns="columns" />
      </NSpace>
    </NGridItem>
  </NGrid>
</template>
