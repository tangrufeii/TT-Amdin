<script setup lang="ts">
defineOptions({
  name: 'TtAdminAvatar'
});
</script>

<template>
  <div class="tt-admin-avatar">
    <span>TT</span>
  </div>
</template>

<style scoped>
.tt-admin-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #22c55e);
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 2px;
}
</style>
