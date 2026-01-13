<script setup lang="ts">
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

defineOptions({
  name: 'MarkdownViewer'
});

interface Props {
  content: string;
}

defineProps<Props>();
</script>

<template>
  <MdPreview class="markdown-viewer" :model-value="content" />
</template>

<style scoped>
.markdown-viewer {
  background: transparent;
}
</style>
