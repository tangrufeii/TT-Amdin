import { defineComponent as c, ref as s, createElementBlock as p, openBlock as m, createElementVNode as n, toDisplayString as g, withDirectives as b, vModelText as f, createTextVNode as l } from "vue";
const v = { class: "plugin-container" }, T = { class: "plugin-card" }, w = { class: "counter" }, y = { class: "plugin-card" }, i = /* @__PURE__ */ c({
  __name: "App",
  setup(k) {
    const o = s(0), t = s("Hello from TT Plugin Demo!");
    function u() {
      o.value += 1;
    }
    function a() {
      o.value = 0;
    }
    function d() {
      window.parent !== window && window.parent.postMessage(
        {
          pluginId: "tt-plugin-demo",
          type: "greeting",
          data: { message: t.value }
        },
        "*"
      ), window.alert("已向主系统发送消息，可在浏览器控制台查看日志");
    }
    return (D, e) => (m(), p("div", v, [
      e[3] || (e[3] = n("header", { class: "plugin-header" }, [
        n("h2", null, "TT Admin 示例插件"),
        n("p", null, "这是一个简单的 Web Component 插件页面，用于验证插件加载、样式注入与消息通信。")
      ], -1)),
      n("section", T, [
        e[1] || (e[1] = n("h3", null, "计数器示例", -1)),
        n("div", w, g(o.value), 1),
        n("div", { class: "plugin-actions" }, [
          n("button", {
            type: "button",
            class: "btn btn-primary",
            onClick: u
          }, "+1"),
          n("button", {
            type: "button",
            class: "btn btn-secondary",
            onClick: a
          }, "重置")
        ])
      ]),
      n("section", y, [
        e[2] || (e[2] = n("h3", null, "发送消息到主应用", -1)),
        b(n("textarea", {
          "onUpdate:modelValue": e[0] || (e[0] = (r) => t.value = r),
          placeholder: "输入要发送的内容",
          rows: "3"
        }, null, 512), [
          [f, t.value]
        ]),
        n("div", { class: "plugin-actions" }, [
          n("button", {
            type: "button",
            class: "btn btn-outline",
            onClick: d
          }, "发送消息")
        ])
      ]),
      e[4] || (e[4] = n("section", { class: "plugin-card info-card" }, [
        n("h3", null, "插件信息"),
        n("ul", null, [
          n("li", null, [
            n("strong", null, "插件 ID："),
            l("tt-plugin-demo")
          ]),
          n("li", null, [
            n("strong", null, "版本："),
            l("1.0.3")
          ]),
          n("li", null, [
            n("strong", null, "渲染方式："),
            l("WebComponent")
          ])
        ])
      ], -1))
    ]));
  }
}), C = {
  async onLoad() {
    console.info("[TT Plugin Demo] loaded");
  },
  async onUnload() {
    console.info("[TT Plugin Demo] unloaded");
  }
}, x = {
  component: i,
  meta: {
    name: "tt-plugin-demo",
    version: "1.0.3",
    description: "TT Admin 示例插件"
  },
  hooks: C,
  createComponent: () => i
};
export {
  x as default
};
