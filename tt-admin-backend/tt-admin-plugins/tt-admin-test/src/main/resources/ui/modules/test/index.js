(function(){"use strict";try{if(typeof document<"u"){var d=document.createElement("style");d.appendChild(document.createTextNode(".plugin-page[data-v-66184cd1]{padding:12px}.toolbar[data-v-66184cd1]{margin:12px 0}.modal-card[data-v-66184cd1]{width:90vw;max-width:900px}")),document.head.appendChild(d)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
const u = /* @__PURE__ */ Object.assign({ "./view/TestView.vue": () => import("./lib/TestView.js") }), c = () => ({
  router: (r, p) => {
    const t = [];
    return (r || []).forEach((e) => {
      var o, a;
      if (!e) return;
      const n = e.component || "";
      e.path && n && t.push({
        name: e.componentName || e.name,
        path: e.path,
        component: u["." + n + ".vue"],
        meta: {
          moduleName: p,
          title: ((o = e.meta) == null ? void 0 : o.title) || e.name,
          keepAlive: ((a = e.meta) == null ? void 0 : a.keepAlive) ?? !0,
          ...e.meta
        }
      });
    }), t;
  }
});
export {
  c as default
};
