const c = window.Vue.defineComponent, e = window.Vue.createElementVNode, p = window.Vue.toDisplayString, g = window.Vue.vModelText, w = window.Vue.withDirectives, s = window.Vue.createTextVNode, m = window.Vue.openBlock, V = window.Vue.createElementBlock, b = { class: "plugin-container" }, v = { class: "plugin-card" }, f = { class: "counter" }, _ = { class: "plugin-card" }, i = window.Vue.ref, h = /* @__PURE__ */ c({
  __name: "PluginDemoView",
  setup(y) {
    const t = i(0), o = i("Hello from TT Plugin Demo!");
    function u() {
      t.value += 1;
    }
    function a() {
      t.value = 0;
    }
    function d() {
      var l;
      (l = window.parent) == null || l.postMessage(
        {
          pluginId: "tt-plugin-demo",
          type: "greeting",
          data: { message: o.value }
        },
        "*"
      ), window.alert("Message sent to the host app, please check the browser console.");
    }
    return (l, n) => (m(), V("div", b, [
      n[3] || (n[3] = e(
        "header",
        { class: "plugin-header" },
        [
          e("h2", null, "TT Admin Demo Plugin"),
          e("p", null, "This is a minimal Web Component page for verifying plugin loading, style injection, and messaging.")
        ],
        -1
        /* CACHED */
      )),
      e("section", v, [
        n[1] || (n[1] = e(
          "h3",
          null,
          "Counter Example",
          -1
          /* CACHED */
        )),
        e(
          "div",
          f,
          p(t.value),
          1
          /* TEXT */
        ),
        e("div", { class: "plugin-actions" }, [
          e("button", {
            type: "button",
            class: "btn btn-primary",
            onClick: u
          }, "+1"),
          e("button", {
            type: "button",
            class: "btn btn-secondary",
            onClick: a
          }, "Reset")
        ])
      ]),
      e("section", _, [
        n[2] || (n[2] = e(
          "h3",
          null,
          "Send Message to Host",
          -1
          /* CACHED */
        )),
        w(e(
          "textarea",
          {
            "onUpdate:modelValue": n[0] || (n[0] = (r) => o.value = r),
            placeholder: "Type anything you want to send",
            rows: "3"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [g, o.value]
        ]),
        e("div", { class: "plugin-actions" }, [
          e("button", {
            type: "button",
            class: "btn btn-outline",
            onClick: d
          }, "Send Message")
        ])
      ]),
      n[4] || (n[4] = e(
        "section",
        { class: "plugin-card info-card" },
        [
          e("h3", null, "Plugin Info"),
          e("ul", null, [
            e("li", null, [
              e("strong", null, "Plugin ID:"),
              s(" tt-plugin-demo")
            ]),
            e("li", null, [
              e("strong", null, "Version:"),
              s(" 1.0.3")
            ]),
            e("li", null, [
              e("strong", null, "Renderer:"),
              s(" WebComponent")
            ])
          ])
        ],
        -1
        /* CACHED */
      ))
    ]));
  }
});
export {
  h as default
};
