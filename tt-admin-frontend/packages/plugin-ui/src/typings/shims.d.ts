import type { Component, FunctionalComponent, SVGAttributes } from 'vue';

declare module '~icons/*' {
  const component: FunctionalComponent<SVGAttributes>;
  export default component;
}

declare module 'virtual:icons/*' {
  const component: FunctionalComponent<SVGAttributes>;
  export default component;
}

declare module 'vue-draggable-plus' {
  const VueDraggable: Component;
  export { VueDraggable };
}
