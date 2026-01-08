<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'DocsPluginDev'
});
</script>

<template>
  <NSpace vertical :size="16">
    <NCard :title="$t('page.docs.pluginDev.title')" :bordered="false" size="small" segmented>
      <NList>
        <NListItem>{{ $t('page.docs.pluginDev.goal') }}</NListItem>
        <NListItem>{{ $t('page.docs.pluginDev.structure') }}</NListItem>
        <NListItem>{{ $t('page.docs.pluginDev.build') }}</NListItem>
        <NListItem>{{ $t('page.docs.pluginDev.runtime') }}</NListItem>
        <NListItem>{{ $t('page.docs.pluginDev.i18n') }}</NListItem>
      </NList>
    </NCard>
    <NCard :title="$t('page.docs.pluginDev.tipsTitle')" :bordered="false" size="small">
      <NAlert type="info" :bordered="false">
        {{ $t('page.docs.pluginDev.tipsContent') }}
      </NAlert>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
