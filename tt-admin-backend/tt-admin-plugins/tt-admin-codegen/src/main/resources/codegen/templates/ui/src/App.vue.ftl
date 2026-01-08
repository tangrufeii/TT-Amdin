<#assign moduleName = (ctx.moduleName)!((ctx.pluginId?replace('tt-plugin-',''))!((ctx.tableName)!'plugin'))>
<#assign pluginName = (ctx.pluginName)!((ctx.tableComment)!moduleName)>
<template>
  <div class="plugin-app">
    <h3>${pluginName}</h3>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.plugin-app {
  padding: 16px;
}
</style>
