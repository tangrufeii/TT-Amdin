<template>
  <div class="p-16px">
    <n-card :bordered="false" size="small" :title="t('plugin.demo.advanced')">
      <div class="text-14px">
        这里是独立的进阶页面，用于演示多菜单多页面插件。
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>