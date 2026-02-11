<template>
  <div class="page">
    <div class="card">
      <h2>Vue3 Iframe 插件模板</h2>
      <p class="tip">当前在 iframe 内运行，可独立于宿主 router。</p>
      <p class="tip">Hash 路由：<code>{{ hash }}</code></p>
      <p class="tip">Query：<code>{{ query }}</code></p>
      <p class="tip">可将这里替换为你自己的 Vue2/Vue3 工程产物入口。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const currentHash = ref(window.location.hash || '#/plugin/iframe-vue');

function syncHash() {
  currentHash.value = window.location.hash || '#/plugin/iframe-vue';
}

onMounted(() => {
  window.addEventListener('hashchange', syncHash);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', syncHash);
});

const hash = computed(() => currentHash.value);
const query = computed(() => window.location.search || '');
</script>
