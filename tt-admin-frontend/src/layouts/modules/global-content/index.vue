<script setup lang="ts">
import { computed, defineComponent, h, mergeProps } from 'vue';
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
const transitionName = computed(() => (themeStore.page.animate && !disableTransition.value ? themeStore.page.animateMode : ''));
const pluginWrapperCache = new WeakMap<object, any>();
function wrapPluginComponent(component: any) {
  if (!component || typeof component !== 'object') return component;
  if (pluginWrapperCache.has(component)) return pluginWrapperCache.get(component);
  const name = component.name || component.__name || 'PluginViewWrapper';
  const wrapper = defineComponent({
    name,
    inheritAttrs: false,
    setup(_props, { attrs }) {
      return () =>
        h('div', mergeProps(attrs, { class: 'plugin-view-wrapper flex flex-col flex-1 min-h-0 w-full' }), [
          h('div', { class: 'plugin-view-root flex flex-col flex-1 min-h-0 w-full' }, [h(component)])
        ]);
    }
  });
  pluginWrapperCache.set(component, wrapper);
  return wrapper;
}

function resetScroll() {
  const el = document.querySelector(`#${LAYOUT_SCROLL_EL_ID}`);

  el?.scrollTo({ left: 0, top: 0 });
}
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition
      :name="transitionName"
      mode="out-in"
      @before-leave="appStore.setContentXScrollable(true)"
      @after-leave="resetScroll"
      @after-enter="appStore.setContentXScrollable(false)"
    >
      <KeepAlive :include="routeStore.cacheRoutes" :exclude="routeStore.excludeCacheRoutes">
        <component
          :is="isPluginRoute ? wrapPluginComponent(Component) : Component"
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
