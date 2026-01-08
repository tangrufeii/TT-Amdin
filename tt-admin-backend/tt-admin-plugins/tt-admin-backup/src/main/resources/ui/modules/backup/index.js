(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".plugin-backup[data-v-f660811e]{padding:16px}.action-row[data-v-f660811e]{margin-top:16px}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
const r = /* @__PURE__ */ Object.assign({ "./view/BackupView.vue": () => import("./lib/BackupView.js") }), u = () => ({
  router: (a, p) => {
    const n = [];
    return a.forEach((e) => {
      var t, o;
      e.path && e.component && n.push({
        name: e.componentName || e.name,
        path: e.path,
        component: r[`.${e.component}.vue`],
        meta: {
          moduleName: p,
          title: ((t = e.meta) == null ? void 0 : t.title) || e.name,
          keepAlive: ((o = e.meta) == null ? void 0 : o.keepAlive) ?? !0,
          ...e.meta
        }
      });
    }), n;
  }
});
export {
  u as default
};
