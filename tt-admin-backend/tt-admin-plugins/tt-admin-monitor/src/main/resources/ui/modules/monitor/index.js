(function(){"use strict";try{if(typeof document<"u"){var t=document.createElement("style");t.appendChild(document.createTextNode(".plugin-monitor[data-v-0822b5b4]{padding:16px}.action-row[data-v-0822b5b4]{margin-top:16px}.muted[data-v-0822b5b4]{color:var(--n-text-color-3);font-size:12px}.disk-table[data-v-0822b5b4]{margin-top:16px}")),document.head.appendChild(t)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
const p = /* @__PURE__ */ Object.assign({ "./view/MonitorView.vue": () => import("./lib/MonitorView.js") }), u = () => ({
  router: (a, r) => {
    const n = [];
    return a.forEach((e) => {
      var o, t;
      e.path && e.component && n.push({
        name: e.componentName || e.name,
        path: e.path,
        component: p[`.${e.component}.vue`],
        meta: {
          moduleName: r,
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
