(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".ai-chat-root[data-v-b8fbc9cd]{height:100%;min-height:0;background:#f5f6f8;overflow:hidden}.ai-chat-app{padding:0;overflow:hidden;min-height:0}#app{overflow:hidden}.ai-chat-root[data-v-b8fbc9cd] .chat-panel-container{height:100%;max-height:100%}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
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
