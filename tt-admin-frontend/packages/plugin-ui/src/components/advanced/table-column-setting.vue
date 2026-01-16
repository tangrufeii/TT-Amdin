<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { VueDraggable } from 'vue-draggable-plus';
import { NButton, NCheckbox, NPopover } from 'naive-ui';
import IconSetting from './IconSetting.vue';
import IconDrag from './IconDrag.vue';

defineOptions({
  name: 'TableColumnSetting'
});

const { t } = useI18n();

const columns = defineModel<NaiveUI.TableColumnCheck[]>('columns', {
  default: () => []
});
</script>

<template>
  <NPopover placement="bottom-end" trigger="click">
    <template #trigger>
      <NButton size="small">
        <template #icon>
          <IconSetting class="text-icon" />
        </template>
        {{ t('common.columnSetting') }}
      </NButton>
    </template>
    <VueDraggable v-model="columns" :animation="150" filter=".none_draggable">
      <div
        v-for="item in columns"
        :key="item.key"
        class="h-36px flex-y-center rd-4px px-8px hover:(bg-primary bg-opacity-20)"
        :class="{ hidden: item.visible === false }"
      >
        <IconDrag class="mr-8px h-full cursor-move text-icon" />
        <NCheckbox v-model:checked="item.checked" class="none_draggable flex-1">
          <template v-if="typeof item.title === 'function'">
            <component :is="item.title" />
          </template>
          <template v-else>{{ item.title }}</template>
        </NCheckbox>
      </div>
    </VueDraggable>
  </NPopover>
</template>
