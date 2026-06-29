<script setup lang="ts">
import { useRouter } from 'vue-router';

defineOptions({
  name: 'PortalOrchestration'
});

const router = useRouter();

function toThemeCenter() {
  router.push('/theme-management/portal-themes');
}

function toPreview() {
  router.push('/theme-management/portal-preview');
}
</script>

<template>
  <NCard :bordered="false" class="portal-orchestration-placeholder">
    <NSpace vertical :size="16">
      <div>
        <p class="eyebrow">Portal MVP</p>
        <h2>挂件编排已暂缓</h2>
        <p class="desc">
          当前版本优先做好门户整站主题切换和在线启用，插槽、挂件、拖拽编排后续再恢复，别现在把 MVP 搞成大杂烩。
        </p>
      </div>

      <NSpace>
        <NButton type="primary" @click="toThemeCenter">进入主题中心</NButton>
        <NButton secondary @click="toPreview">预览门户主题</NButton>
      </NSpace>
    </NSpace>
  </NCard>
</template>

<style scoped>
.portal-orchestration-placeholder {
  border-radius: 8px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  color: #172033;
  font-size: 26px;
}

.desc {
  max-width: 760px;
  margin: 12px 0 0;
  color: #64748b;
  line-height: 1.8;
}
</style>
