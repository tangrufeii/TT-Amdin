const u = /* @__PURE__ */ Object.assign({ "./view/AiChatView.vue": () => import("./lib/AiChatView.js") }), c = () => ({
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
