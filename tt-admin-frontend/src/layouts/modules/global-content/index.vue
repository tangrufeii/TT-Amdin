<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { LAYOUT_SCROLL_EL_ID } from '@sa/materials';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import { useRouteStore } from '@/store/modules/route';
import { useTabStore } from '@/store/modules/tab';

defineOptions({
  name: 'GlobalContent'
});

interface Props {
  /** Show padding for content */
  showPadding?: boolean;
}

withDefaults(defineProps<Props>(), {
  showPadding: true
});

const appStore = useAppStore();
const themeStore = useThemeStore();
const routeStore = useRouteStore();
const tabStore = useTabStore();
const route = useRoute();
const isPluginRoute = computed(() => Boolean(route.meta?.moduleName));
const disableTransition = computed(() => Boolean(route.meta?.disableTransition));
const transitionName = computed(() => {
  if (!themeStore.page.animate || disableTransition.value) return '';
  return themeStore.page.animateMode;
});
const transitionMode = computed(() => {
  if (disableTransition.value) return undefined;
  const metaMode = route.meta?.transitionMode as string | undefined;
  if (metaMode) return metaMode;
  if (isPluginRoute.value) return undefined;
  return 'out-in';
});

function resetScroll() {
  const el = document.querySelector(`#${LAYOUT_SCROLL_EL_ID}`);

  el?.scrollTo({ left: 0, top: 0 });
}
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition
      :name="transitionName"
      :mode="transitionMode"
      @before-leave="appStore.setContentXScrollable(true)"
      @after-leave="resetScroll"
      @after-enter="appStore.setContentXScrollable(false)"
    >
      <KeepAlive :include="routeStore.cacheRoutes" :exclude="routeStore.excludeCacheRoutes">
        <component
          :is="Component"
          v-if="appStore.reloadFlag"
          :key="tabStore.getTabIdByRoute(route)"
          :class="{ 'p-16px': showPadding }"
          class="flex-grow bg-layout transition-300"
        />
        
      </KeepAlive>
    </Transition>
  </RouterView>
  
</template>

<style></style>
