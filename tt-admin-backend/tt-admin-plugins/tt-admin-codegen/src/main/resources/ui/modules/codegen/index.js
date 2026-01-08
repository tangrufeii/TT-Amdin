(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".codegen-table-scroll[data-v-b2167f5e]{overflow-x:auto}.plugin-codegen[data-v-b2167f5e]{padding:12px}.toolbar[data-v-b2167f5e]{margin:12px 0}.modal-card[data-v-b2167f5e]{width:90vw;max-width:1200px;height:80vh;overflow:hidden}")),document.head.appendChild(e)}}catch(d){console.error("vite-plugin-css-injected-by-js",d)}})();
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
