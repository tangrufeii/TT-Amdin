(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".toolbar[data-v-60bebf48]{margin:12px 0}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
const r = /* @__PURE__ */ Object.assign({ "./view/CodegenView.vue": () => import("./lib/CodegenView.js") }), u = () => ({
  router: (a, p) => {
    const n = [];
    return a.forEach((e) => {
      var o, t;
      e.path && e.component && n.push({
        name: e.componentName || e.name,
        path: e.path,
        component: r[`.${e.component}.vue`],
        meta: {
          moduleName: p,
          title: ((o = e.meta) == null ? void 0 : o.title) || e.name,
          keepAlive: ((t = e.meta) == null ? void 0 : t.keepAlive) ?? !0,
          ...e.meta
        }
      });
    }), n;
  }
});
export {
  u as default
};
