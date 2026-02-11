<template>
  <div class="wc-page">
    <div class="wc-card">
      <h3>Web-Component Vue 插件模板</h3>
      <p class="wc-tip">当前模式：<span class="wc-code">plugin-dev / host</span></p>
      <p class="wc-tip">当前时间：<span class="wc-code">{{ now }}</span></p>
      <p class="wc-tip">修改本文件后，宿主页面会自动刷新当前视图。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const now = ref('');
let timer: number | null = null;

function tick() {
  now.value = new Date().toLocaleString();
}

onMounted(() => {
  tick();
  timer = window.setInterval(tick, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>
