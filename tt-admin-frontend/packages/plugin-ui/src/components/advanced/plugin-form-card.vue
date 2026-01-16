<script setup lang="ts">
import { NCard, NForm } from 'naive-ui';

interface Props {
  title?: string;
  model?: Record<string, any>;
  rules?: any;
  labelWidth?: number | string;
  labelPlacement?: 'left' | 'top';
  showFeedback?: boolean;
  formSize?: 'small' | 'medium' | 'large';
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  model: () => ({}),
  rules: undefined,
  labelWidth: 80,
  labelPlacement: 'left',
  showFeedback: false,
  formSize: 'small'
});
</script>

<template>
  <NCard :title="props.title" :bordered="false" size="small" class="card-wrapper">
    <NForm
      :model="props.model"
      :rules="props.rules"
      :label-width="props.labelWidth"
      :label-placement="props.labelPlacement"
      :show-feedback="props.showFeedback"
      :size="props.formSize"
    >
      <slot />
    </NForm>
    <div v-if="$slots.actions" class="plugin-form-actions">
      <slot name="actions" />
    </div>
  </NCard>
</template>

<style scoped>
.plugin-form-actions {
  margin-top: 12px;
}
</style>
