<script setup lang="ts">
import MarkdownViewer from '@/components/common/markdown-viewer.vue';
import content from '../../../../../docs/plugin-dev.md?raw';

defineOptions({
  name: 'DocsPluginDev'
});
</script>

<template>
  <NCard :bordered="false" size="small">
    <MarkdownViewer :content="content" />
  </NCard>
</template>

<style scoped></style>
