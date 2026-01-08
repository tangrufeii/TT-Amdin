(function(){"use strict";try{if(typeof document<"u"){var n=document.createElement("style");n.appendChild(document.createTextNode("*{box-sizing:border-box}body{margin:0}.plugin-container{width:100%;min-height:100%;padding:24px;background:#f5f6fa;color:#1f2329;font-family:Segoe UI,system-ui,-apple-system,BlinkMacSystemFont,PingFang SC,Microsoft YaHei,sans-serif;line-height:1.6}.plugin-header{margin-bottom:24px}.plugin-header h2{margin:0;font-size:24px}.plugin-card{background:#fff;border-radius:12px;box-shadow:0 8px 24px #0f172a14;padding:20px;margin-bottom:20px}.plugin-card h3{margin:0 0 16px;font-size:18px}.counter{font-size:48px;font-weight:600;margin-bottom:12px}.plugin-actions{display:flex;gap:12px}textarea{width:100%;border-radius:8px;border:1px solid #d6d9de;padding:12px;resize:vertical;font-size:14px;margin-bottom:12px}.btn{border:none;border-radius:999px;padding:10px 20px;font-size:14px;cursor:pointer;transition:opacity .2s ease}.btn-primary{background:linear-gradient(120deg,#2563eb,#3b82f6);color:#fff}.btn-secondary{background:#e5e7eb;color:#111827}.btn-outline{border:1px solid #2563eb;color:#2563eb;background:transparent}.btn:hover{opacity:.9}.info-card ul{list-style:none;padding:0;margin:0}.info-card li{margin-bottom:8px}.info-card strong{color:#475569}")),document.head.appendChild(n)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
const r = /* @__PURE__ */ Object.assign({ "./view/PluginDemoView.vue": () => import("./lib/PluginDemoView.js") }), u = () => ({
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
