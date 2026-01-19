import { ref, onMounted, onUnmounted, computed } from 'vue';

export interface ResponsiveBreakpoints {
  desktopLg: number;
  desktop: number;
  tablet: number;
  mobile: number;
  mobileSm: number;
}

const defaultBreakpoints: ResponsiveBreakpoints = {
  desktopLg: 1440,
  desktop: 1200,
  tablet: 992,
  mobile: 768,
  mobileSm: 480
};

export function useResponsive(breakpoints: Partial<ResponsiveBreakpoints> = {}) {
  const bp = { ...defaultBreakpoints, ...breakpoints };

  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const siderVisible = ref(false);
  const siderCollapsed = ref(false);

  const isMobile = computed(() => windowWidth.value < bp.mobile);
  const isTablet = computed(() => windowWidth.value >= bp.mobile && windowWidth.value < bp.tablet);
  const isDesktop = computed(() => windowWidth.value >= bp.tablet);
  const isDesktopLg = computed(() => windowWidth.value >= bp.desktopLg);
  const isMobileSm = computed(() => windowWidth.value < bp.mobileSm);

  const shouldShowSiderOverlay = computed(() => {
    return windowWidth.value < bp.tablet && siderVisible.value;
  });

  function handleResize() {
    windowWidth.value = window.innerWidth;
    // 桌面端自动显示侧边栏
    if (windowWidth.value >= bp.tablet) {
      siderVisible.value = false;
    }
  }

  function toggleSider() {
    if (windowWidth.value < bp.tablet) {
      siderVisible.value = !siderVisible.value;
    } else {
      siderCollapsed.value = !siderCollapsed.value;
    }
  }

  function openSider() {
    if (windowWidth.value < bp.tablet) {
      siderVisible.value = true;
    }
  }

  function closeSider() {
    if (windowWidth.value < bp.tablet) {
      siderVisible.value = false;
    }
  }

  function collapseSider() {
    siderCollapsed.value = true;
  }

  function expandSider() {
    siderCollapsed.value = false;
  }

  onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return {
    windowWidth,
    siderVisible,
    siderCollapsed,
    isMobile,
    isTablet,
    isDesktop,
    isDesktopLg,
    isMobileSm,
    shouldShowSiderOverlay,
    toggleSider,
    openSider,
    closeSider,
    collapseSider,
    expandSider
  };
}
