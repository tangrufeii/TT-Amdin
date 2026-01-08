<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'DocsProjectIntro'
});
</script>

<template>
  <NSpace vertical :size="16">
    <NCard :title="$t('page.docs.project.title')" :bordered="false" size="small" segmented>
      <NList>
        <NListItem>{{ $t('page.docs.project.positioning') }}</NListItem>
        <NListItem>{{ $t('page.docs.project.architecture') }}</NListItem>
        <NListItem>{{ $t('page.docs.project.rbac') }}</NListItem>
        <NListItem>{{ $t('page.docs.project.frontend') }}</NListItem>
        <NListItem>{{ $t('page.docs.project.backend') }}</NListItem>
      </NList>
    </NCard>
    <NCard :title="$t('page.docs.project.tipsTitle')" :bordered="false" size="small">
      <NAlert type="info" :bordered="false">
        {{ $t('page.docs.project.tipsContent') }}
      </NAlert>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
