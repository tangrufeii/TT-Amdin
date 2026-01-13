<script setup lang="ts">
import MarkdownViewer from '@/components/common/markdown-viewer.vue';
import content from '../../../../../docs/project-intro.md?raw';

defineOptions({
  name: 'DocsProjectIntro'
});
</script>

<template>
  <NCard :bordered="false" size="small">
    <MarkdownViewer :content="content" />
  </NCard>
</template>

<style scoped></style>
