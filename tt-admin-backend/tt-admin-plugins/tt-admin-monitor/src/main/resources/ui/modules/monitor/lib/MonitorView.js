/*!
  * shared v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function xg(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Ud = typeof window < "u", Ao = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), Cg = (e, t, n) => Sg({ l: e, k: t, s: n }), Sg = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Pt = (e) => typeof e == "number" && isFinite(e), $g = (e) => Js(e) === "[object Date]", Ra = (e) => Js(e) === "[object RegExp]", La = (e) => Ge(e) && Object.keys(e).length === 0, _t = Object.assign, Rg = Object.create, rt = (e = null) => Rg(e);
let Kd;
const ko = () => Kd || (Kd = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : rt());
function qd(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function Gd(e) {
  return e.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function kg(e) {
  return e = e.replace(/(\w+)\s*=\s*"([^"]*)"/g, (o, r, i) => `${r}="${Gd(i)}"`), e = e.replace(/(\w+)\s*=\s*'([^']*)'/g, (o, r, i) => `${r}='${Gd(i)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(e) && (e = e.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ].forEach((o) => {
    e = e.replace(o, "$1javascript&#58;");
  }), e;
}
const Pg = Object.prototype.hasOwnProperty;
function bn(e, t) {
  return Pg.call(e, t);
}
const xt = Array.isArray, gt = (e) => typeof e == "function", ye = (e) => typeof e == "string", yt = (e) => typeof e == "boolean", Xe = (e) => e !== null && typeof e == "object", _g = (e) => Xe(e) && gt(e.then) && gt(e.catch), ph = Object.prototype.toString, Js = (e) => ph.call(e), Ge = (e) => Js(e) === "[object Object]", Tg = (e) => e == null ? "" : xt(e) || Ge(e) && e.toString === ph ? JSON.stringify(e, null, 2) : String(e);
function Qs(e, t = "") {
  return e.reduce((n, o, r) => r === 0 ? n + o : n + t + o, "");
}
const yi = (e) => !Xe(e) || xt(e);
function xa(e, t) {
  if (yi(e) || yi(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: o, des: r } = n.pop();
    Object.keys(o).forEach((i) => {
      i !== "__proto__" && (Xe(o[i]) && !Xe(r[i]) && (r[i] = Array.isArray(o[i]) ? [] : rt()), yi(r[i]) || yi(o[i]) ? r[i] = o[i] : n.push({ src: o[i], des: r[i] }));
    });
  }
}
/*!
  * message-compiler v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Fg(e, t, n) {
  return { line: e, column: t, offset: n };
}
function ms(e, t, n) {
  return { start: e, end: t };
}
const Ze = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14
}, Eg = 17;
function Da(e, t, n = {}) {
  const { domain: o, messages: r, args: i } = n, l = e, a = new SyntaxError(String(l));
  return a.code = e, t && (a.location = t), a.domain = o, a;
}
function zg(e) {
  throw e;
}
const xn = " ", Og = "\r", Ot = `
`, Mg = "\u2028", Ig = "\u2029";
function Ag(e) {
  const t = e;
  let n = 0, o = 1, r = 1, i = 0;
  const l = (y) => t[y] === Og && t[y + 1] === Ot, a = (y) => t[y] === Ot, s = (y) => t[y] === Ig, d = (y) => t[y] === Mg, c = (y) => l(y) || a(y) || s(y) || d(y), h = () => n, p = () => o, g = () => r, f = () => i, v = (y) => l(y) || s(y) || d(y) ? Ot : t[y], m = () => v(n), u = () => v(n + i);
  function w() {
    return i = 0, c(n) && (o++, r = 0), l(n) && n++, n++, r++, t[n];
  }
  function x() {
    return l(n + i) && i++, i++, t[n + i];
  }
  function b() {
    n = 0, o = 1, r = 1, i = 0;
  }
  function C(y = 0) {
    i = y;
  }
  function S() {
    const y = n + i;
    for (; y !== n; )
      w();
    i = 0;
  }
  return {
    index: h,
    line: p,
    column: g,
    peekOffset: f,
    charAt: v,
    currentChar: m,
    currentPeek: u,
    next: w,
    peek: x,
    reset: b,
    resetPeek: C,
    skipToPeek: S
  };
}
const Vn = void 0, Vg = ".", Xd = "'", Bg = "tokenizer";
function Lg(e, t = {}) {
  const n = t.location !== !1, o = Ag(e), r = () => o.index(), i = () => Fg(o.line(), o.column(), o.index()), l = i(), a = r(), s = {
    currentType: 13,
    offset: a,
    startLoc: l,
    endLoc: l,
    lastType: 13,
    lastOffset: a,
    lastStartLoc: l,
    lastEndLoc: l,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, d = () => s, { onError: c } = t;
  function h(k, $, D, ...ee) {
    const ve = d();
    if ($.column += D, $.offset += D, c) {
      const he = n ? ms(ve.startLoc, $) : null, F = Da(k, he, {
        domain: Bg,
        args: ee
      });
      c(F);
    }
  }
  function p(k, $, D) {
    k.endLoc = i(), k.currentType = $;
    const ee = { type: $ };
    return n && (ee.loc = ms(k.startLoc, k.endLoc)), D != null && (ee.value = D), ee;
  }
  const g = (k) => p(
    k,
    13
    /* TokenTypes.EOF */
  );
  function f(k, $) {
    return k.currentChar() === $ ? (k.next(), $) : (h(Ze.EXPECTED_TOKEN, i(), 0, $), "");
  }
  function v(k) {
    let $ = "";
    for (; k.currentPeek() === xn || k.currentPeek() === Ot; )
      $ += k.currentPeek(), k.peek();
    return $;
  }
  function m(k) {
    const $ = v(k);
    return k.skipToPeek(), $;
  }
  function u(k) {
    if (k === Vn)
      return !1;
    const $ = k.charCodeAt(0);
    return $ >= 97 && $ <= 122 || // a-z
    $ >= 65 && $ <= 90 || // A-Z
    $ === 95;
  }
  function w(k) {
    if (k === Vn)
      return !1;
    const $ = k.charCodeAt(0);
    return $ >= 48 && $ <= 57;
  }
  function x(k, $) {
    const { currentType: D } = $;
    if (D !== 2)
      return !1;
    v(k);
    const ee = u(k.currentPeek());
    return k.resetPeek(), ee;
  }
  function b(k, $) {
    const { currentType: D } = $;
    if (D !== 2)
      return !1;
    v(k);
    const ee = k.currentPeek() === "-" ? k.peek() : k.currentPeek(), ve = w(ee);
    return k.resetPeek(), ve;
  }
  function C(k, $) {
    const { currentType: D } = $;
    if (D !== 2)
      return !1;
    v(k);
    const ee = k.currentPeek() === Xd;
    return k.resetPeek(), ee;
  }
  function S(k, $) {
    const { currentType: D } = $;
    if (D !== 7)
      return !1;
    v(k);
    const ee = k.currentPeek() === ".";
    return k.resetPeek(), ee;
  }
  function y(k, $) {
    const { currentType: D } = $;
    if (D !== 8)
      return !1;
    v(k);
    const ee = u(k.currentPeek());
    return k.resetPeek(), ee;
  }
  function T(k, $) {
    const { currentType: D } = $;
    if (!(D === 7 || D === 11))
      return !1;
    v(k);
    const ee = k.currentPeek() === ":";
    return k.resetPeek(), ee;
  }
  function R(k, $) {
    const { currentType: D } = $;
    if (D !== 9)
      return !1;
    const ee = () => {
      const he = k.currentPeek();
      return he === "{" ? u(k.peek()) : he === "@" || he === "|" || he === ":" || he === "." || he === xn || !he ? !1 : he === Ot ? (k.peek(), ee()) : W(k, !1);
    }, ve = ee();
    return k.resetPeek(), ve;
  }
  function E(k) {
    v(k);
    const $ = k.currentPeek() === "|";
    return k.resetPeek(), $;
  }
  function W(k, $ = !0) {
    const D = (ve = !1, he = "") => {
      const F = k.currentPeek();
      return F === "{" || F === "@" || !F ? ve : F === "|" ? !(he === xn || he === Ot) : F === xn ? (k.peek(), D(!0, xn)) : F === Ot ? (k.peek(), D(!0, Ot)) : !0;
    }, ee = D();
    return $ && k.resetPeek(), ee;
  }
  function _(k, $) {
    const D = k.currentChar();
    return D === Vn ? Vn : $(D) ? (k.next(), D) : null;
  }
  function M(k) {
    const $ = k.charCodeAt(0);
    return $ >= 97 && $ <= 122 || // a-z
    $ >= 65 && $ <= 90 || // A-Z
    $ >= 48 && $ <= 57 || // 0-9
    $ === 95 || // _
    $ === 36;
  }
  function I(k) {
    return _(k, M);
  }
  function O(k) {
    const $ = k.charCodeAt(0);
    return $ >= 97 && $ <= 122 || // a-z
    $ >= 65 && $ <= 90 || // A-Z
    $ >= 48 && $ <= 57 || // 0-9
    $ === 95 || // _
    $ === 36 || // $
    $ === 45;
  }
  function K(k) {
    return _(k, O);
  }
  function L(k) {
    const $ = k.charCodeAt(0);
    return $ >= 48 && $ <= 57;
  }
  function Y(k) {
    return _(k, L);
  }
  function Q(k) {
    const $ = k.charCodeAt(0);
    return $ >= 48 && $ <= 57 || // 0-9
    $ >= 65 && $ <= 70 || // A-F
    $ >= 97 && $ <= 102;
  }
  function J(k) {
    return _(k, Q);
  }
  function q(k) {
    let $ = "", D = "";
    for (; $ = Y(k); )
      D += $;
    return D;
  }
  function A(k) {
    let $ = "";
    for (; ; ) {
      const D = k.currentChar();
      if (D === "{" || D === "}" || D === "@" || D === "|" || !D)
        break;
      if (D === xn || D === Ot)
        if (W(k))
          $ += D, k.next();
        else {
          if (E(k))
            break;
          $ += D, k.next();
        }
      else
        $ += D, k.next();
    }
    return $;
  }
  function G(k) {
    m(k);
    let $ = "", D = "";
    for (; $ = K(k); )
      D += $;
    const ee = k.currentChar();
    if (ee && ee !== "}" && ee !== Vn && ee !== xn && ee !== Ot && ee !== "　") {
      const ve = ce(k);
      return h(Ze.INVALID_TOKEN_IN_PLACEHOLDER, i(), 0, D + ve), D + ve;
    }
    return k.currentChar() === Vn && h(Ze.UNTERMINATED_CLOSING_BRACE, i(), 0), D;
  }
  function Z(k) {
    m(k);
    let $ = "";
    return k.currentChar() === "-" ? (k.next(), $ += `-${q(k)}`) : $ += q(k), k.currentChar() === Vn && h(Ze.UNTERMINATED_CLOSING_BRACE, i(), 0), $;
  }
  function ae(k) {
    return k !== Xd && k !== Ot;
  }
  function le(k) {
    m(k), f(k, "'");
    let $ = "", D = "";
    for (; $ = _(k, ae); )
      $ === "\\" ? D += de(k) : D += $;
    const ee = k.currentChar();
    return ee === Ot || ee === Vn ? (h(Ze.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, i(), 0), ee === Ot && (k.next(), f(k, "'")), D) : (f(k, "'"), D);
  }
  function de(k) {
    const $ = k.currentChar();
    switch ($) {
      case "\\":
      case "'":
        return k.next(), `\\${$}`;
      case "u":
        return ge(k, $, 4);
      case "U":
        return ge(k, $, 6);
      default:
        return h(Ze.UNKNOWN_ESCAPE_SEQUENCE, i(), 0, $), "";
    }
  }
  function ge(k, $, D) {
    f(k, $);
    let ee = "";
    for (let ve = 0; ve < D; ve++) {
      const he = J(k);
      if (!he) {
        h(Ze.INVALID_UNICODE_ESCAPE_SEQUENCE, i(), 0, `\\${$}${ee}${k.currentChar()}`);
        break;
      }
      ee += he;
    }
    return `\\${$}${ee}`;
  }
  function X(k) {
    return k !== "{" && k !== "}" && k !== xn && k !== Ot;
  }
  function ce(k) {
    m(k);
    let $ = "", D = "";
    for (; $ = _(k, X); )
      D += $;
    return D;
  }
  function Pe(k) {
    let $ = "", D = "";
    for (; $ = I(k); )
      D += $;
    return D;
  }
  function me(k) {
    const $ = (D) => {
      const ee = k.currentChar();
      return ee === "{" || ee === "@" || ee === "|" || ee === "(" || ee === ")" || !ee || ee === xn ? D : (D += ee, k.next(), $(D));
    };
    return $("");
  }
  function $e(k) {
    m(k);
    const $ = f(
      k,
      "|"
      /* TokenChars.Pipe */
    );
    return m(k), $;
  }
  function Se(k, $) {
    let D = null;
    switch (k.currentChar()) {
      case "{":
        return $.braceNest >= 1 && h(Ze.NOT_ALLOW_NEST_PLACEHOLDER, i(), 0), k.next(), D = p(
          $,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), m(k), $.braceNest++, D;
      case "}":
        return $.braceNest > 0 && $.currentType === 2 && h(Ze.EMPTY_PLACEHOLDER, i(), 0), k.next(), D = p(
          $,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), $.braceNest--, $.braceNest > 0 && m(k), $.inLinked && $.braceNest === 0 && ($.inLinked = !1), D;
      case "@":
        return $.braceNest > 0 && h(Ze.UNTERMINATED_CLOSING_BRACE, i(), 0), D = Le(k, $) || g($), $.braceNest = 0, D;
      default: {
        let ve = !0, he = !0, F = !0;
        if (E(k))
          return $.braceNest > 0 && h(Ze.UNTERMINATED_CLOSING_BRACE, i(), 0), D = p($, 1, $e(k)), $.braceNest = 0, $.inLinked = !1, D;
        if ($.braceNest > 0 && ($.currentType === 4 || $.currentType === 5 || $.currentType === 6))
          return h(Ze.UNTERMINATED_CLOSING_BRACE, i(), 0), $.braceNest = 0, Ie(k, $);
        if (ve = x(k, $))
          return D = p($, 4, G(k)), m(k), D;
        if (he = b(k, $))
          return D = p($, 5, Z(k)), m(k), D;
        if (F = C(k, $))
          return D = p($, 6, le(k)), m(k), D;
        if (!ve && !he && !F)
          return D = p($, 12, ce(k)), h(Ze.INVALID_TOKEN_IN_PLACEHOLDER, i(), 0, D.value), m(k), D;
        break;
      }
    }
    return D;
  }
  function Le(k, $) {
    const { currentType: D } = $;
    let ee = null;
    const ve = k.currentChar();
    switch ((D === 7 || D === 8 || D === 11 || D === 9) && (ve === Ot || ve === xn) && h(Ze.INVALID_LINKED_FORMAT, i(), 0), ve) {
      case "@":
        return k.next(), ee = p(
          $,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), $.inLinked = !0, ee;
      case ".":
        return m(k), k.next(), p(
          $,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return m(k), k.next(), p(
          $,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return E(k) ? (ee = p($, 1, $e(k)), $.braceNest = 0, $.inLinked = !1, ee) : S(k, $) || T(k, $) ? (m(k), Le(k, $)) : y(k, $) ? (m(k), p($, 11, Pe(k))) : R(k, $) ? (m(k), ve === "{" ? Se(k, $) || ee : p($, 10, me(k))) : (D === 7 && h(Ze.INVALID_LINKED_FORMAT, i(), 0), $.braceNest = 0, $.inLinked = !1, Ie(k, $));
    }
  }
  function Ie(k, $) {
    let D = {
      type: 13
      /* TokenTypes.EOF */
    };
    if ($.braceNest > 0)
      return Se(k, $) || g($);
    if ($.inLinked)
      return Le(k, $) || g($);
    switch (k.currentChar()) {
      case "{":
        return Se(k, $) || g($);
      case "}":
        return h(Ze.UNBALANCED_CLOSING_BRACE, i(), 0), k.next(), p(
          $,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return Le(k, $) || g($);
      default: {
        if (E(k))
          return D = p($, 1, $e(k)), $.braceNest = 0, $.inLinked = !1, D;
        if (W(k))
          return p($, 0, A(k));
        break;
      }
    }
    return D;
  }
  function re() {
    const { currentType: k, offset: $, startLoc: D, endLoc: ee } = s;
    return s.lastType = k, s.lastOffset = $, s.lastStartLoc = D, s.lastEndLoc = ee, s.offset = r(), s.startLoc = i(), o.currentChar() === Vn ? p(
      s,
      13
      /* TokenTypes.EOF */
    ) : Ie(o, s);
  }
  return {
    nextToken: re,
    currentOffset: r,
    currentPosition: i,
    context: d
  };
}
const Dg = "parser", Ng = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Hg(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\";
    case "\\'":
      return "'";
    default: {
      const o = parseInt(t || n, 16);
      return o <= 55295 || o >= 57344 ? String.fromCodePoint(o) : "�";
    }
  }
}
function jg(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function o(u, w, x, b, ...C) {
    const S = u.currentPosition();
    if (S.offset += b, S.column += b, n) {
      const y = t ? ms(x, S) : null, T = Da(w, y, {
        domain: Dg,
        args: C
      });
      n(T);
    }
  }
  function r(u, w, x) {
    const b = { type: u };
    return t && (b.start = w, b.end = w, b.loc = { start: x, end: x }), b;
  }
  function i(u, w, x, b) {
    t && (u.end = w, u.loc && (u.loc.end = x));
  }
  function l(u, w) {
    const x = u.context(), b = r(3, x.offset, x.startLoc);
    return b.value = w, i(b, u.currentOffset(), u.currentPosition()), b;
  }
  function a(u, w) {
    const x = u.context(), { lastOffset: b, lastStartLoc: C } = x, S = r(5, b, C);
    return S.index = parseInt(w, 10), u.nextToken(), i(S, u.currentOffset(), u.currentPosition()), S;
  }
  function s(u, w) {
    const x = u.context(), { lastOffset: b, lastStartLoc: C } = x, S = r(4, b, C);
    return S.key = w, u.nextToken(), i(S, u.currentOffset(), u.currentPosition()), S;
  }
  function d(u, w) {
    const x = u.context(), { lastOffset: b, lastStartLoc: C } = x, S = r(9, b, C);
    return S.value = w.replace(Ng, Hg), u.nextToken(), i(S, u.currentOffset(), u.currentPosition()), S;
  }
  function c(u) {
    const w = u.nextToken(), x = u.context(), { lastOffset: b, lastStartLoc: C } = x, S = r(8, b, C);
    return w.type !== 11 ? (o(u, Ze.UNEXPECTED_EMPTY_LINKED_MODIFIER, x.lastStartLoc, 0), S.value = "", i(S, b, C), {
      nextConsumeToken: w,
      node: S
    }) : (w.value == null && o(u, Ze.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, Cn(w)), S.value = w.value || "", i(S, u.currentOffset(), u.currentPosition()), {
      node: S
    });
  }
  function h(u, w) {
    const x = u.context(), b = r(7, x.offset, x.startLoc);
    return b.value = w, i(b, u.currentOffset(), u.currentPosition()), b;
  }
  function p(u) {
    const w = u.context(), x = r(6, w.offset, w.startLoc);
    let b = u.nextToken();
    if (b.type === 8) {
      const C = c(u);
      x.modifier = C.node, b = C.nextConsumeToken || u.nextToken();
    }
    switch (b.type !== 9 && o(u, Ze.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, Cn(b)), b = u.nextToken(), b.type === 2 && (b = u.nextToken()), b.type) {
      case 10:
        b.value == null && o(u, Ze.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, Cn(b)), x.key = h(u, b.value || "");
        break;
      case 4:
        b.value == null && o(u, Ze.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, Cn(b)), x.key = s(u, b.value || "");
        break;
      case 5:
        b.value == null && o(u, Ze.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, Cn(b)), x.key = a(u, b.value || "");
        break;
      case 6:
        b.value == null && o(u, Ze.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, Cn(b)), x.key = d(u, b.value || "");
        break;
      default: {
        o(u, Ze.UNEXPECTED_EMPTY_LINKED_KEY, w.lastStartLoc, 0);
        const C = u.context(), S = r(7, C.offset, C.startLoc);
        return S.value = "", i(S, C.offset, C.startLoc), x.key = S, i(x, C.offset, C.startLoc), {
          nextConsumeToken: b,
          node: x
        };
      }
    }
    return i(x, u.currentOffset(), u.currentPosition()), {
      node: x
    };
  }
  function g(u) {
    const w = u.context(), x = w.currentType === 1 ? u.currentOffset() : w.offset, b = w.currentType === 1 ? w.endLoc : w.startLoc, C = r(2, x, b);
    C.items = [];
    let S = null;
    do {
      const R = S || u.nextToken();
      switch (S = null, R.type) {
        case 0:
          R.value == null && o(u, Ze.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, Cn(R)), C.items.push(l(u, R.value || ""));
          break;
        case 5:
          R.value == null && o(u, Ze.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, Cn(R)), C.items.push(a(u, R.value || ""));
          break;
        case 4:
          R.value == null && o(u, Ze.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, Cn(R)), C.items.push(s(u, R.value || ""));
          break;
        case 6:
          R.value == null && o(u, Ze.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, Cn(R)), C.items.push(d(u, R.value || ""));
          break;
        case 7: {
          const E = p(u);
          C.items.push(E.node), S = E.nextConsumeToken || null;
          break;
        }
      }
    } while (w.currentType !== 13 && w.currentType !== 1);
    const y = w.currentType === 1 ? w.lastOffset : u.currentOffset(), T = w.currentType === 1 ? w.lastEndLoc : u.currentPosition();
    return i(C, y, T), C;
  }
  function f(u, w, x, b) {
    const C = u.context();
    let S = b.items.length === 0;
    const y = r(1, w, x);
    y.cases = [], y.cases.push(b);
    do {
      const T = g(u);
      S || (S = T.items.length === 0), y.cases.push(T);
    } while (C.currentType !== 13);
    return S && o(u, Ze.MUST_HAVE_MESSAGES_IN_PLURAL, x, 0), i(y, u.currentOffset(), u.currentPosition()), y;
  }
  function v(u) {
    const w = u.context(), { offset: x, startLoc: b } = w, C = g(u);
    return w.currentType === 13 ? C : f(u, x, b, C);
  }
  function m(u) {
    const w = Lg(u, _t({}, e)), x = w.context(), b = r(0, x.offset, x.startLoc);
    return t && b.loc && (b.loc.source = u), b.body = v(w), e.onCacheKey && (b.cacheKey = e.onCacheKey(u)), x.currentType !== 13 && o(w, Ze.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, u[x.offset] || ""), i(b, w.currentOffset(), w.currentPosition()), b;
  }
  return { parse: m };
}
function Cn(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Wg(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (i) => (n.helpers.add(i), i) };
}
function Yd(e, t) {
  for (let n = 0; n < e.length; n++)
    ed(e[n], t);
}
function ed(e, t) {
  switch (e.type) {
    case 1:
      Yd(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Yd(e.items, t);
      break;
    case 6: {
      ed(e.key, t), t.helper(
        "linked"
        /* HelperNameMap.LINKED */
      ), t.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      t.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      ), t.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function Ug(e, t = {}) {
  const n = Wg(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && ed(e.body, n);
  const o = n.context();
  e.helpers = Array.from(o.helpers);
}
function Kg(e) {
  const t = e.body;
  return t.type === 2 ? Zd(t) : t.cases.forEach((n) => Zd(n)), e;
}
function Zd(e) {
  if (e.items.length === 1) {
    const t = e.items[0];
    (t.type === 3 || t.type === 9) && (e.static = t.value, delete t.value);
  } else {
    const t = [];
    for (let n = 0; n < e.items.length; n++) {
      const o = e.items[n];
      if (!(o.type === 3 || o.type === 9) || o.value == null)
        break;
      t.push(o.value);
    }
    if (t.length === e.items.length) {
      e.static = Qs(t);
      for (let n = 0; n < e.items.length; n++) {
        const o = e.items[n];
        (o.type === 3 || o.type === 9) && delete o.value;
      }
    }
  }
}
function or(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      or(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let o = 0; o < n.length; o++)
        or(n[o]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let o = 0; o < n.length; o++)
        or(n[o]);
      t.i = n, delete t.items, t.static && (t.s = t.static, delete t.static);
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const t = e;
      t.value && (t.v = t.value, delete t.value);
      break;
    }
    case 6: {
      const t = e;
      or(t.key), t.k = t.key, delete t.key, t.modifier && (or(t.modifier), t.m = t.modifier, delete t.modifier);
      break;
    }
    case 5: {
      const t = e;
      t.i = t.index, delete t.index;
      break;
    }
    case 4: {
      const t = e;
      t.k = t.key, delete t.key;
      break;
    }
  }
  delete e.type;
}
function qg(e, t) {
  const { filename: n, breakLineCode: o, needIndent: r } = t, i = t.location !== !1, l = {
    filename: n,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode: o,
    needIndent: r,
    indentLevel: 0
  };
  i && e.loc && (l.source = e.loc.source);
  const a = () => l;
  function s(v, m) {
    l.code += v;
  }
  function d(v, m = !0) {
    const u = m ? o : "";
    s(r ? u + "  ".repeat(v) : u);
  }
  function c(v = !0) {
    const m = ++l.indentLevel;
    v && d(m);
  }
  function h(v = !0) {
    const m = --l.indentLevel;
    v && d(m);
  }
  function p() {
    d(l.indentLevel);
  }
  return {
    context: a,
    push: s,
    indent: c,
    deindent: h,
    newline: p,
    helper: (v) => `_${v}`,
    needIndent: () => l.needIndent
  };
}
function Gg(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), lr(e, t.key), t.modifier ? (e.push(", "), lr(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Xg(e, t) {
  const { helper: n, needIndent: o } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(o());
  const r = t.items.length;
  for (let i = 0; i < r && (lr(e, t.items[i]), i !== r - 1); i++)
    e.push(", ");
  e.deindent(o()), e.push("])");
}
function Yg(e, t) {
  const { helper: n, needIndent: o } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(o());
    const r = t.cases.length;
    for (let i = 0; i < r && (lr(e, t.cases[i]), i !== r - 1); i++)
      e.push(", ");
    e.deindent(o()), e.push("])");
  }
}
function Zg(e, t) {
  t.body ? lr(e, t.body) : e.push("null");
}
function lr(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Zg(e, t);
      break;
    case 1:
      Yg(e, t);
      break;
    case 2:
      Xg(e, t);
      break;
    case 6:
      Gg(e, t);
      break;
    case 8:
      e.push(JSON.stringify(t.value), t);
      break;
    case 7:
      e.push(JSON.stringify(t.value), t);
      break;
    case 5:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "list"
        /* HelperNameMap.LIST */
      )}(${t.index}))`, t);
      break;
    case 4:
      e.push(`${n(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${n(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(t.key)}))`, t);
      break;
    case 9:
      e.push(JSON.stringify(t.value), t);
      break;
    case 3:
      e.push(JSON.stringify(t.value), t);
      break;
  }
}
const Jg = (e, t = {}) => {
  const n = ye(t.mode) ? t.mode : "normal", o = ye(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const r = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, i = t.needIndent ? t.needIndent : n !== "arrow", l = e.helpers || [], a = qg(e, {
    filename: o,
    breakLineCode: r,
    needIndent: i
  });
  a.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), a.indent(i), l.length > 0 && (a.push(`const { ${Qs(l.map((c) => `${c}: _${c}`), ", ")} } = ctx`), a.newline()), a.push("return "), lr(a, e), a.deindent(i), a.push("}"), delete e.helpers;
  const { code: s, map: d } = a.context();
  return {
    ast: e,
    code: s,
    map: d ? d.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Qg(e, t = {}) {
  const n = _t({}, t), o = !!n.jit, r = !!n.minify, i = n.optimize == null ? !0 : n.optimize, a = jg(n).parse(e);
  return o ? (i && Kg(a), r && or(a), { ast: a, code: "" }) : (Ug(a, n), Jg(a, n));
}
/*!
  * core-base v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function em() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (ko().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (ko().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Tn(e) {
  return Xe(e) && td(e) === 0 && (bn(e, "b") || bn(e, "body"));
}
const vh = ["b", "body"];
function tm(e) {
  return go(e, vh);
}
const gh = ["c", "cases"];
function nm(e) {
  return go(e, gh, []);
}
const mh = ["s", "static"];
function om(e) {
  return go(e, mh);
}
const bh = ["i", "items"];
function rm(e) {
  return go(e, bh, []);
}
const wh = ["t", "type"];
function td(e) {
  return go(e, wh);
}
const yh = ["v", "value"];
function xi(e, t) {
  const n = go(e, yh);
  if (n != null)
    return n;
  throw Qr(t);
}
const xh = ["m", "modifier"];
function im(e) {
  return go(e, xh);
}
const Ch = ["k", "key"];
function am(e) {
  const t = go(e, Ch);
  if (t)
    return t;
  throw Qr(
    6
    /* NodeTypes.Linked */
  );
}
function go(e, t, n) {
  for (let o = 0; o < t.length; o++) {
    const r = t[o];
    if (bn(e, r) && e[r] != null)
      return e[r];
  }
  return n;
}
const Sh = [
  ...vh,
  ...gh,
  ...mh,
  ...bh,
  ...Ch,
  ...xh,
  ...yh,
  ...wh
];
function Qr(e) {
  return new Error(`unhandled node type: ${e}`);
}
function dl(e) {
  return (n) => lm(n, e);
}
function lm(e, t) {
  const n = tm(t);
  if (n == null)
    throw Qr(
      0
      /* NodeTypes.Resource */
    );
  if (td(n) === 1) {
    const i = nm(n);
    return e.plural(i.reduce((l, a) => [
      ...l,
      Jd(e, a)
    ], []));
  } else
    return Jd(e, n);
}
function Jd(e, t) {
  const n = om(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const o = rm(t).reduce((r, i) => [...r, bs(e, i)], []);
    return e.normalize(o);
  }
}
function bs(e, t) {
  const n = td(t);
  switch (n) {
    case 3:
      return xi(t, n);
    case 9:
      return xi(t, n);
    case 4: {
      const o = t;
      if (bn(o, "k") && o.k)
        return e.interpolate(e.named(o.k));
      if (bn(o, "key") && o.key)
        return e.interpolate(e.named(o.key));
      throw Qr(n);
    }
    case 5: {
      const o = t;
      if (bn(o, "i") && Pt(o.i))
        return e.interpolate(e.list(o.i));
      if (bn(o, "index") && Pt(o.index))
        return e.interpolate(e.list(o.index));
      throw Qr(n);
    }
    case 6: {
      const o = t, r = im(o), i = am(o);
      return e.linked(bs(e, i), r ? bs(e, r) : void 0, e.type);
    }
    case 7:
      return xi(t, n);
    case 8:
      return xi(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const sm = (e) => e;
let Ci = rt();
function dm(e, t = {}) {
  let n = !1;
  const o = t.onError || zg;
  return t.onError = (r) => {
    n = !0, o(r);
  }, { ...Qg(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function cm(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && ye(e)) {
    yt(t.warnHtmlMessage) && t.warnHtmlMessage;
    const o = (t.onCacheKey || sm)(e), r = Ci[o];
    if (r)
      return r;
    const { ast: i, detectError: l } = dm(e, {
      ...t,
      location: !1,
      jit: !0
    }), a = dl(i);
    return l ? a : Ci[o] = a;
  } else {
    const n = e.cacheKey;
    if (n) {
      const o = Ci[n];
      return o || (Ci[n] = dl(e));
    } else
      return dl(e);
  }
}
let ei = null;
function um(e) {
  ei = e;
}
function fm(e, t, n) {
  ei && ei.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const hm = /* @__PURE__ */ pm("function:translate");
function pm(e) {
  return (t) => ei && ei.emit(e, t);
}
const Wn = {
  INVALID_ARGUMENT: Eg,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, vm = 24;
function Un(e) {
  return Da(e, null, void 0);
}
function nd(e, t) {
  return t.locale != null ? Qd(t.locale) : Qd(e.locale);
}
let cl;
function Qd(e) {
  if (ye(e))
    return e;
  if (gt(e)) {
    if (e.resolvedOnce && cl != null)
      return cl;
    if (e.constructor.name === "Function") {
      const t = e();
      if (_g(t))
        throw Un(Wn.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return cl = t;
    } else
      throw Un(Wn.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw Un(Wn.NOT_SUPPORT_LOCALE_TYPE);
}
function gm(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...xt(t) ? t : Xe(t) ? Object.keys(t) : ye(t) ? [t] : [n]
  ])];
}
function $h(e, t, n) {
  const o = ye(n) ? n : ka, r = e;
  r.__localeChainCache || (r.__localeChainCache = /* @__PURE__ */ new Map());
  let i = r.__localeChainCache.get(o);
  if (!i) {
    i = [];
    let l = [n];
    for (; xt(l); )
      l = ec(i, l, t);
    const a = xt(t) || !Ge(t) ? t : t.default ? t.default : null;
    l = ye(a) ? [a] : a, xt(l) && ec(i, l, !1), r.__localeChainCache.set(o, i);
  }
  return i;
}
function ec(e, t, n) {
  let o = !0;
  for (let r = 0; r < t.length && yt(o); r++) {
    const i = t[r];
    ye(i) && (o = mm(e, t[r], n));
  }
  return o;
}
function mm(e, t, n) {
  let o;
  const r = t.split("-");
  do {
    const i = r.join("-");
    o = bm(e, i, n), r.splice(-1, 1);
  } while (r.length && o === !0);
  return o;
}
function bm(e, t, n) {
  let o = !1;
  if (!e.includes(t) && (o = !0, t)) {
    o = t[t.length - 1] !== "!";
    const r = t.replace(/!/g, "");
    e.push(r), (xt(n) || Ge(n)) && n[r] && (o = n[r]);
  }
  return o;
}
const mo = [];
mo[
  0
  /* States.BEFORE_PATH */
] = {
  w: [
    0
    /* States.BEFORE_PATH */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
mo[
  1
  /* States.IN_PATH */
] = {
  w: [
    1
    /* States.IN_PATH */
  ],
  ".": [
    2
    /* States.BEFORE_IDENT */
  ],
  "[": [
    4
    /* States.IN_SUB_PATH */
  ],
  o: [
    7
    /* States.AFTER_PATH */
  ]
};
mo[
  2
  /* States.BEFORE_IDENT */
] = {
  w: [
    2
    /* States.BEFORE_IDENT */
  ],
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ]
};
mo[
  3
  /* States.IN_IDENT */
] = {
  i: [
    3,
    0
    /* Actions.APPEND */
  ],
  0: [
    3,
    0
    /* Actions.APPEND */
  ],
  w: [
    1,
    1
    /* Actions.PUSH */
  ],
  ".": [
    2,
    1
    /* Actions.PUSH */
  ],
  "[": [
    4,
    1
    /* Actions.PUSH */
  ],
  o: [
    7,
    1
    /* Actions.PUSH */
  ]
};
mo[
  4
  /* States.IN_SUB_PATH */
] = {
  "'": [
    5,
    0
    /* Actions.APPEND */
  ],
  '"': [
    6,
    0
    /* Actions.APPEND */
  ],
  "[": [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  "]": [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  o: 8,
  l: [
    4,
    0
    /* Actions.APPEND */
  ]
};
mo[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  "'": [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    5,
    0
    /* Actions.APPEND */
  ]
};
mo[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  '"': [
    4,
    0
    /* Actions.APPEND */
  ],
  o: 8,
  l: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const wm = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function ym(e) {
  return wm.test(e);
}
function xm(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Cm(e) {
  if (e == null)
    return "o";
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function Sm(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : ym(t) ? xm(t) : "*" + t;
}
function $m(e) {
  const t = [];
  let n = -1, o = 0, r = 0, i, l, a, s, d, c, h;
  const p = [];
  p[
    0
    /* Actions.APPEND */
  ] = () => {
    l === void 0 ? l = a : l += a;
  }, p[
    1
    /* Actions.PUSH */
  ] = () => {
    l !== void 0 && (t.push(l), l = void 0);
  }, p[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    p[
      0
      /* Actions.APPEND */
    ](), r++;
  }, p[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (r > 0)
      r--, o = 4, p[
        0
        /* Actions.APPEND */
      ]();
    else {
      if (r = 0, l === void 0 || (l = Sm(l), l === !1))
        return !1;
      p[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function g() {
    const f = e[n + 1];
    if (o === 5 && f === "'" || o === 6 && f === '"')
      return n++, a = "\\" + f, p[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; o !== null; )
    if (n++, i = e[n], !(i === "\\" && g())) {
      if (s = Cm(i), h = mo[o], d = h[s] || h.l || 8, d === 8 || (o = d[0], d[1] !== void 0 && (c = p[d[1]], c && (a = i, c() === !1))))
        return;
      if (o === 7)
        return t;
    }
}
const tc = /* @__PURE__ */ new Map();
function Rm(e, t) {
  return Xe(e) ? e[t] : null;
}
function km(e, t) {
  if (!Xe(e))
    return null;
  let n = tc.get(t);
  if (n || (n = $m(t), n && tc.set(t, n)), !n)
    return null;
  const o = n.length;
  let r = e, i = 0;
  for (; i < o; ) {
    const l = n[i];
    if (Sh.includes(l) && Tn(r))
      return null;
    const a = r[l];
    if (a === void 0 || gt(r))
      return null;
    r = a, i++;
  }
  return r;
}
const Pm = "11.1.12", Na = -1, ka = "en-US", nc = "", oc = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function _m() {
  return {
    upper: (e, t) => t === "text" && ye(e) ? e.toUpperCase() : t === "vnode" && Xe(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && ye(e) ? e.toLowerCase() : t === "vnode" && Xe(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && ye(e) ? oc(e) : t === "vnode" && Xe(e) && "__v_isVNode" in e ? oc(e.children) : e
  };
}
let Rh;
function Tm(e) {
  Rh = e;
}
let kh;
function Fm(e) {
  kh = e;
}
let Ph;
function Em(e) {
  Ph = e;
}
let _h = null;
const zm = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  _h = e;
}, Om = /* @__NO_SIDE_EFFECTS__ */ () => _h;
let Th = null;
const rc = (e) => {
  Th = e;
}, Mm = () => Th;
let ic = 0;
function Im(e = {}) {
  const t = gt(e.onWarn) ? e.onWarn : xg, n = ye(e.version) ? e.version : Pm, o = ye(e.locale) || gt(e.locale) ? e.locale : ka, r = gt(o) ? ka : o, i = xt(e.fallbackLocale) || Ge(e.fallbackLocale) || ye(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : r, l = Ge(e.messages) ? e.messages : ul(r), a = Ge(e.datetimeFormats) ? e.datetimeFormats : ul(r), s = Ge(e.numberFormats) ? e.numberFormats : ul(r), d = _t(rt(), e.modifiers, _m()), c = e.pluralRules || rt(), h = gt(e.missing) ? e.missing : null, p = yt(e.missingWarn) || Ra(e.missingWarn) ? e.missingWarn : !0, g = yt(e.fallbackWarn) || Ra(e.fallbackWarn) ? e.fallbackWarn : !0, f = !!e.fallbackFormat, v = !!e.unresolving, m = gt(e.postTranslation) ? e.postTranslation : null, u = Ge(e.processor) ? e.processor : null, w = yt(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, x = !!e.escapeParameter, b = gt(e.messageCompiler) ? e.messageCompiler : Rh, C = gt(e.messageResolver) ? e.messageResolver : kh || Rm, S = gt(e.localeFallbacker) ? e.localeFallbacker : Ph || gm, y = Xe(e.fallbackContext) ? e.fallbackContext : void 0, T = e, R = Xe(T.__datetimeFormatters) ? T.__datetimeFormatters : /* @__PURE__ */ new Map(), E = Xe(T.__numberFormatters) ? T.__numberFormatters : /* @__PURE__ */ new Map(), W = Xe(T.__meta) ? T.__meta : {};
  ic++;
  const _ = {
    version: n,
    cid: ic,
    locale: o,
    fallbackLocale: i,
    messages: l,
    modifiers: d,
    pluralRules: c,
    missing: h,
    missingWarn: p,
    fallbackWarn: g,
    fallbackFormat: f,
    unresolving: v,
    postTranslation: m,
    processor: u,
    warnHtmlMessage: w,
    escapeParameter: x,
    messageCompiler: b,
    messageResolver: C,
    localeFallbacker: S,
    fallbackContext: y,
    onWarn: t,
    __meta: W
  };
  return _.datetimeFormats = a, _.numberFormats = s, _.__datetimeFormatters = R, _.__numberFormatters = E, __INTLIFY_PROD_DEVTOOLS__ && fm(_, n, W), _;
}
const ul = (e) => ({ [e]: rt() });
function od(e, t, n, o, r) {
  const { missing: i, onWarn: l } = e;
  if (i !== null) {
    const a = i(e, n, t, r);
    return ye(a) ? a : t;
  } else
    return t;
}
function Rr(e, t, n) {
  const o = e;
  o.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Am(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function Vm(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let o = n + 1; o < t.length; o++)
    if (Am(e, t[o]))
      return !0;
  return !1;
}
function ac(e, ...t) {
  const { datetimeFormats: n, unresolving: o, fallbackLocale: r, onWarn: i, localeFallbacker: l } = e, { __datetimeFormatters: a } = e, [s, d, c, h] = ws(...t), p = yt(c.missingWarn) ? c.missingWarn : e.missingWarn;
  yt(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const g = !!c.part, f = nd(e, c), v = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    f
  );
  if (!ye(s) || s === "")
    return new Intl.DateTimeFormat(f, h).format(d);
  let m = {}, u, w = null;
  const x = "datetime format";
  for (let S = 0; S < v.length && (u = v[S], m = n[u] || {}, w = m[s], !Ge(w)); S++)
    od(e, s, u, p, x);
  if (!Ge(w) || !ye(u))
    return o ? Na : s;
  let b = `${u}__${s}`;
  La(h) || (b = `${b}__${JSON.stringify(h)}`);
  let C = a.get(b);
  return C || (C = new Intl.DateTimeFormat(u, _t({}, w, h)), a.set(b, C)), g ? C.formatToParts(d) : C.format(d);
}
const Fh = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function ws(...e) {
  const [t, n, o, r] = e, i = rt();
  let l = rt(), a;
  if (ye(t)) {
    const s = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!s)
      throw Un(Wn.INVALID_ISO_DATE_ARGUMENT);
    const d = s[3] ? s[3].trim().startsWith("T") ? `${s[1].trim()}${s[3].trim()}` : `${s[1].trim()}T${s[3].trim()}` : s[1].trim();
    a = new Date(d);
    try {
      a.toISOString();
    } catch {
      throw Un(Wn.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if ($g(t)) {
    if (isNaN(t.getTime()))
      throw Un(Wn.INVALID_DATE_ARGUMENT);
    a = t;
  } else if (Pt(t))
    a = t;
  else
    throw Un(Wn.INVALID_ARGUMENT);
  return ye(n) ? i.key = n : Ge(n) && Object.keys(n).forEach((s) => {
    Fh.includes(s) ? l[s] = n[s] : i[s] = n[s];
  }), ye(o) ? i.locale = o : Ge(o) && (l = o), Ge(r) && (l = r), [i.key || "", a, i, l];
}
function lc(e, t, n) {
  const o = e;
  for (const r in n) {
    const i = `${t}__${r}`;
    o.__datetimeFormatters.has(i) && o.__datetimeFormatters.delete(i);
  }
}
function sc(e, ...t) {
  const { numberFormats: n, unresolving: o, fallbackLocale: r, onWarn: i, localeFallbacker: l } = e, { __numberFormatters: a } = e, [s, d, c, h] = ys(...t), p = yt(c.missingWarn) ? c.missingWarn : e.missingWarn;
  yt(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const g = !!c.part, f = nd(e, c), v = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    f
  );
  if (!ye(s) || s === "")
    return new Intl.NumberFormat(f, h).format(d);
  let m = {}, u, w = null;
  const x = "number format";
  for (let S = 0; S < v.length && (u = v[S], m = n[u] || {}, w = m[s], !Ge(w)); S++)
    od(e, s, u, p, x);
  if (!Ge(w) || !ye(u))
    return o ? Na : s;
  let b = `${u}__${s}`;
  La(h) || (b = `${b}__${JSON.stringify(h)}`);
  let C = a.get(b);
  return C || (C = new Intl.NumberFormat(u, _t({}, w, h)), a.set(b, C)), g ? C.formatToParts(d) : C.format(d);
}
const Eh = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function ys(...e) {
  const [t, n, o, r] = e, i = rt();
  let l = rt();
  if (!Pt(t))
    throw Un(Wn.INVALID_ARGUMENT);
  const a = t;
  return ye(n) ? i.key = n : Ge(n) && Object.keys(n).forEach((s) => {
    Eh.includes(s) ? l[s] = n[s] : i[s] = n[s];
  }), ye(o) ? i.locale = o : Ge(o) && (l = o), Ge(r) && (l = r), [i.key || "", a, i, l];
}
function dc(e, t, n) {
  const o = e;
  for (const r in n) {
    const i = `${t}__${r}`;
    o.__numberFormatters.has(i) && o.__numberFormatters.delete(i);
  }
}
const Bm = (e) => e, Lm = (e) => "", Dm = "text", Nm = (e) => e.length === 0 ? "" : Qs(e), Hm = Tg;
function cc(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function jm(e) {
  const t = Pt(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (Pt(e.named.count) || Pt(e.named.n)) ? Pt(e.named.count) ? e.named.count : Pt(e.named.n) ? e.named.n : t : t;
}
function Wm(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function Um(e = {}) {
  const t = e.locale, n = jm(e), o = Xe(e.pluralRules) && ye(t) && gt(e.pluralRules[t]) ? e.pluralRules[t] : cc, r = Xe(e.pluralRules) && ye(t) && gt(e.pluralRules[t]) ? cc : void 0, i = (u) => u[o(n, u.length, r)], l = e.list || [], a = (u) => l[u], s = e.named || rt();
  Pt(e.pluralIndex) && Wm(n, s);
  const d = (u) => s[u];
  function c(u, w) {
    const x = gt(e.messages) ? e.messages(u, !!w) : Xe(e.messages) ? e.messages[u] : !1;
    return x || (e.parent ? e.parent.message(u) : Lm);
  }
  const h = (u) => e.modifiers ? e.modifiers[u] : Bm, p = Ge(e.processor) && gt(e.processor.normalize) ? e.processor.normalize : Nm, g = Ge(e.processor) && gt(e.processor.interpolate) ? e.processor.interpolate : Hm, f = Ge(e.processor) && ye(e.processor.type) ? e.processor.type : Dm, m = {
    list: a,
    named: d,
    plural: i,
    linked: (u, ...w) => {
      const [x, b] = w;
      let C = "text", S = "";
      w.length === 1 ? Xe(x) ? (S = x.modifier || S, C = x.type || C) : ye(x) && (S = x || S) : w.length === 2 && (ye(x) && (S = x || S), ye(b) && (C = b || C));
      const y = c(u, !0)(m), T = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        C === "vnode" && xt(y) && S ? y[0] : y
      );
      return S ? h(S)(T, C) : T;
    },
    message: c,
    type: f,
    interpolate: g,
    normalize: p,
    values: _t(rt(), l, s)
  };
  return m;
}
const uc = () => "", sn = (e) => gt(e);
function fc(e, ...t) {
  const { fallbackFormat: n, postTranslation: o, unresolving: r, messageCompiler: i, fallbackLocale: l, messages: a } = e, [s, d] = xs(...t), c = yt(d.missingWarn) ? d.missingWarn : e.missingWarn, h = yt(d.fallbackWarn) ? d.fallbackWarn : e.fallbackWarn, p = yt(d.escapeParameter) ? d.escapeParameter : e.escapeParameter, g = !!d.resolvedMessage, f = ye(d.default) || yt(d.default) ? yt(d.default) ? i ? s : () => s : d.default : n ? i ? s : () => s : null, v = n || f != null && (ye(f) || gt(f)), m = nd(e, d);
  p && Km(d);
  let [u, w, x] = g ? [
    s,
    m,
    a[m] || rt()
  ] : zh(e, s, m, l, h, c), b = u, C = s;
  if (!g && !(ye(b) || Tn(b) || sn(b)) && v && (b = f, C = b), !g && (!(ye(b) || Tn(b) || sn(b)) || !ye(w)))
    return r ? Na : s;
  let S = !1;
  const y = () => {
    S = !0;
  }, T = sn(b) ? b : Oh(e, s, w, b, C, y);
  if (S)
    return b;
  const R = Xm(e, w, x, d), E = Um(R), W = qm(e, T, E);
  let _ = o ? o(W, s) : W;
  if (p && ye(_) && (_ = kg(_)), __INTLIFY_PROD_DEVTOOLS__) {
    const M = {
      timestamp: Date.now(),
      key: ye(s) ? s : sn(b) ? b.key : "",
      locale: w || (sn(b) ? b.locale : ""),
      format: ye(b) ? b : sn(b) ? b.source : "",
      message: _
    };
    M.meta = _t({}, e.__meta, /* @__PURE__ */ Om() || {}), hm(M);
  }
  return _;
}
function Km(e) {
  xt(e.list) ? e.list = e.list.map((t) => ye(t) ? qd(t) : t) : Xe(e.named) && Object.keys(e.named).forEach((t) => {
    ye(e.named[t]) && (e.named[t] = qd(e.named[t]));
  });
}
function zh(e, t, n, o, r, i) {
  const { messages: l, onWarn: a, messageResolver: s, localeFallbacker: d } = e, c = d(e, o, n);
  let h = rt(), p, g = null;
  const f = "translate";
  for (let v = 0; v < c.length && (p = c[v], h = l[p] || rt(), (g = s(h, t)) === null && (g = h[t]), !(ye(g) || Tn(g) || sn(g))); v++)
    if (!Vm(p, c)) {
      const m = od(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        p,
        i,
        f
      );
      m !== t && (g = m);
    }
  return [g, p, h];
}
function Oh(e, t, n, o, r, i) {
  const { messageCompiler: l, warnHtmlMessage: a } = e;
  if (sn(o)) {
    const d = o;
    return d.locale = d.locale || n, d.key = d.key || t, d;
  }
  if (l == null) {
    const d = () => o;
    return d.locale = n, d.key = t, d;
  }
  const s = l(o, Gm(e, n, r, o, a, i));
  return s.locale = n, s.key = t, s.source = o, s;
}
function qm(e, t, n) {
  return t(n);
}
function xs(...e) {
  const [t, n, o] = e, r = rt();
  if (!ye(t) && !Pt(t) && !sn(t) && !Tn(t))
    throw Un(Wn.INVALID_ARGUMENT);
  const i = Pt(t) ? String(t) : (sn(t), t);
  return Pt(n) ? r.plural = n : ye(n) ? r.default = n : Ge(n) && !La(n) ? r.named = n : xt(n) && (r.list = n), Pt(o) ? r.plural = o : ye(o) ? r.default = o : Ge(o) && _t(r, o), [i, r];
}
function Gm(e, t, n, o, r, i) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: r,
    onError: (l) => {
      throw i && i(l), l;
    },
    onCacheKey: (l) => Cg(t, n, l)
  };
}
function Xm(e, t, n, o) {
  const { modifiers: r, pluralRules: i, messageResolver: l, fallbackLocale: a, fallbackWarn: s, missingWarn: d, fallbackContext: c } = e, p = {
    locale: t,
    modifiers: r,
    pluralRules: i,
    messages: (g, f) => {
      let v = l(n, g);
      if (v == null && (c || f)) {
        const [, , m] = zh(
          c || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          g,
          t,
          a,
          s,
          d
        );
        v = l(m, g);
      }
      if (ye(v) || Tn(v)) {
        let m = !1;
        const w = Oh(e, g, t, v, g, () => {
          m = !0;
        });
        return m ? uc : w;
      } else return sn(v) ? v : uc;
    }
  };
  return e.processor && (p.processor = e.processor), o.list && (p.list = o.list), o.named && (p.named = o.named), Pt(o.plural) && (p.pluralIndex = o.plural), p;
}
em();
/*!
  * vue-i18n v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Ym = window.Vue.createVNode, Zm = window.Vue.Text, kr = window.Vue.computed, hc = window.Vue.watch, rd = window.Vue.getCurrentInstance, Jm = window.Vue.ref, Qm = window.Vue.shallowRef, Mh = window.Vue.Fragment, id = window.Vue.defineComponent, Ih = window.Vue.h;
window.Vue.effectScope;
const eb = window.Vue.inject, tb = window.Vue.onMounted, nb = window.Vue.onUnmounted;
window.Vue.isRef;
const ob = "11.1.12";
function rb() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (ko().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (ko().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (ko().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (ko().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const sr = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: vm,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: 25,
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  // unexpected error
  UNEXPECTED_ERROR: 32
};
function ti(e, ...t) {
  return Da(e, null, void 0);
}
const Cs = /* @__PURE__ */ Ao("__translateVNode"), Ss = /* @__PURE__ */ Ao("__datetimeParts"), $s = /* @__PURE__ */ Ao("__numberParts"), ib = Ao("__setPluralRules"), Ah = /* @__PURE__ */ Ao("__injectWithOption"), Rs = /* @__PURE__ */ Ao("__dispose");
function ni(e) {
  if (!Xe(e) || Tn(e))
    return e;
  for (const t in e)
    if (bn(e, t))
      if (!t.includes("."))
        Xe(e[t]) && ni(e[t]);
      else {
        const n = t.split("."), o = n.length - 1;
        let r = e, i = !1;
        for (let l = 0; l < o; l++) {
          if (n[l] === "__proto__")
            throw new Error(`unsafe key: ${n[l]}`);
          if (n[l] in r || (r[n[l]] = rt()), !Xe(r[n[l]])) {
            i = !0;
            break;
          }
          r = r[n[l]];
        }
        if (i || (Tn(r) ? Sh.includes(n[o]) || delete e[t] : (r[n[o]] = e[t], delete e[t])), !Tn(r)) {
          const l = r[n[o]];
          Xe(l) && ni(l);
        }
      }
  return e;
}
function Vh(e, t) {
  const { messages: n, __i18n: o, messageResolver: r, flatJson: i } = t, l = Ge(n) ? n : xt(o) ? rt() : { [e]: rt() };
  if (xt(o) && o.forEach((a) => {
    if ("locale" in a && "resource" in a) {
      const { locale: s, resource: d } = a;
      s ? (l[s] = l[s] || rt(), xa(d, l[s])) : xa(d, l);
    } else
      ye(a) && xa(JSON.parse(a), l);
  }), r == null && i)
    for (const a in l)
      bn(l, a) && ni(l[a]);
  return l;
}
function Bh(e) {
  return e.type;
}
function ab(e, t, n) {
  let o = Xe(t.messages) ? t.messages : rt();
  "__i18nGlobal" in n && (o = Vh(e.locale.value, {
    messages: o,
    __i18n: n.__i18nGlobal
  }));
  const r = Object.keys(o);
  r.length && r.forEach((i) => {
    e.mergeLocaleMessage(i, o[i]);
  });
  {
    if (Xe(t.datetimeFormats)) {
      const i = Object.keys(t.datetimeFormats);
      i.length && i.forEach((l) => {
        e.mergeDateTimeFormat(l, t.datetimeFormats[l]);
      });
    }
    if (Xe(t.numberFormats)) {
      const i = Object.keys(t.numberFormats);
      i.length && i.forEach((l) => {
        e.mergeNumberFormat(l, t.numberFormats[l]);
      });
    }
  }
}
function pc(e) {
  return Ym(Zm, null, e, 0);
}
const vc = "__INTLIFY_META__", gc = () => [], lb = () => !1;
let mc = 0;
function bc(e) {
  return (t, n, o, r) => e(n, o, rd() || void 0, r);
}
const sb = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = rd();
  let t = null;
  return e && (t = Bh(e)[vc]) ? { [vc]: t } : null;
};
function db(e = {}) {
  const { __root: t, __injectWithOption: n } = e, o = t === void 0, r = e.flatJson, i = Ud ? Jm : Qm;
  let l = yt(e.inheritLocale) ? e.inheritLocale : !0;
  const a = i(
    // prettier-ignore
    t && l ? t.locale.value : ye(e.locale) ? e.locale : ka
  ), s = i(
    // prettier-ignore
    t && l ? t.fallbackLocale.value : ye(e.fallbackLocale) || xt(e.fallbackLocale) || Ge(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : a.value
  ), d = i(Vh(a.value, e)), c = i(Ge(e.datetimeFormats) ? e.datetimeFormats : { [a.value]: {} }), h = i(Ge(e.numberFormats) ? e.numberFormats : { [a.value]: {} });
  let p = t ? t.missingWarn : yt(e.missingWarn) || Ra(e.missingWarn) ? e.missingWarn : !0, g = t ? t.fallbackWarn : yt(e.fallbackWarn) || Ra(e.fallbackWarn) ? e.fallbackWarn : !0, f = t ? t.fallbackRoot : yt(e.fallbackRoot) ? e.fallbackRoot : !0, v = !!e.fallbackFormat, m = gt(e.missing) ? e.missing : null, u = gt(e.missing) ? bc(e.missing) : null, w = gt(e.postTranslation) ? e.postTranslation : null, x = t ? t.warnHtmlMessage : yt(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, b = !!e.escapeParameter;
  const C = t ? t.modifiers : Ge(e.modifiers) ? e.modifiers : {};
  let S = e.pluralRules || t && t.pluralRules, y;
  y = (() => {
    o && rc(null);
    const F = {
      version: ob,
      locale: a.value,
      fallbackLocale: s.value,
      messages: d.value,
      modifiers: C,
      pluralRules: S,
      missing: u === null ? void 0 : u,
      missingWarn: p,
      fallbackWarn: g,
      fallbackFormat: v,
      unresolving: !0,
      postTranslation: w === null ? void 0 : w,
      warnHtmlMessage: x,
      escapeParameter: b,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    F.datetimeFormats = c.value, F.numberFormats = h.value, F.__datetimeFormatters = Ge(y) ? y.__datetimeFormatters : void 0, F.__numberFormatters = Ge(y) ? y.__numberFormatters : void 0;
    const j = Im(F);
    return o && rc(j), j;
  })(), Rr(y, a.value, s.value);
  function R() {
    return [
      a.value,
      s.value,
      d.value,
      c.value,
      h.value
    ];
  }
  const E = kr({
    get: () => a.value,
    set: (F) => {
      y.locale = F, a.value = F;
    }
  }), W = kr({
    get: () => s.value,
    set: (F) => {
      y.fallbackLocale = F, s.value = F, Rr(y, a.value, F);
    }
  }), _ = kr(() => d.value), M = /* @__PURE__ */ kr(() => c.value), I = /* @__PURE__ */ kr(() => h.value);
  function O() {
    return gt(w) ? w : null;
  }
  function K(F) {
    w = F, y.postTranslation = F;
  }
  function L() {
    return m;
  }
  function Y(F) {
    F !== null && (u = bc(F)), m = F, y.missing = u;
  }
  const Q = (F, j, pe, Fe, dt, bt) => {
    R();
    let Je;
    try {
      __INTLIFY_PROD_DEVTOOLS__, o || (y.fallbackContext = t ? Mm() : void 0), Je = F(y);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, o || (y.fallbackContext = void 0);
    }
    if (pe !== "translate exists" && // for not `te` (e.g `t`)
    Pt(Je) && Je === Na || pe === "translate exists" && !Je) {
      const [Qe, wt] = j();
      return t && f ? Fe(t) : dt(Qe);
    } else {
      if (bt(Je))
        return Je;
      throw ti(sr.UNEXPECTED_RETURN_TYPE);
    }
  };
  function J(...F) {
    return Q((j) => Reflect.apply(fc, null, [j, ...F]), () => xs(...F), "translate", (j) => Reflect.apply(j.t, j, [...F]), (j) => j, (j) => ye(j));
  }
  function q(...F) {
    const [j, pe, Fe] = F;
    if (Fe && !Xe(Fe))
      throw ti(sr.INVALID_ARGUMENT);
    return J(j, pe, _t({ resolvedMessage: !0 }, Fe || {}));
  }
  function A(...F) {
    return Q((j) => Reflect.apply(ac, null, [j, ...F]), () => ws(...F), "datetime format", (j) => Reflect.apply(j.d, j, [...F]), () => nc, (j) => ye(j) || xt(j));
  }
  function G(...F) {
    return Q((j) => Reflect.apply(sc, null, [j, ...F]), () => ys(...F), "number format", (j) => Reflect.apply(j.n, j, [...F]), () => nc, (j) => ye(j) || xt(j));
  }
  function Z(F) {
    return F.map((j) => ye(j) || Pt(j) || yt(j) ? pc(String(j)) : j);
  }
  const le = {
    normalize: Z,
    interpolate: (F) => F,
    type: "vnode"
  };
  function de(...F) {
    return Q((j) => {
      let pe;
      const Fe = j;
      try {
        Fe.processor = le, pe = Reflect.apply(fc, null, [Fe, ...F]);
      } finally {
        Fe.processor = null;
      }
      return pe;
    }, () => xs(...F), "translate", (j) => j[Cs](...F), (j) => [pc(j)], (j) => xt(j));
  }
  function ge(...F) {
    return Q((j) => Reflect.apply(sc, null, [j, ...F]), () => ys(...F), "number format", (j) => j[$s](...F), gc, (j) => ye(j) || xt(j));
  }
  function X(...F) {
    return Q((j) => Reflect.apply(ac, null, [j, ...F]), () => ws(...F), "datetime format", (j) => j[Ss](...F), gc, (j) => ye(j) || xt(j));
  }
  function ce(F) {
    S = F, y.pluralRules = S;
  }
  function Pe(F, j) {
    return Q(() => {
      if (!F)
        return !1;
      const pe = ye(j) ? j : a.value, Fe = Se(pe), dt = y.messageResolver(Fe, F);
      return Tn(dt) || sn(dt) || ye(dt);
    }, () => [F], "translate exists", (pe) => Reflect.apply(pe.te, pe, [F, j]), lb, (pe) => yt(pe));
  }
  function me(F) {
    let j = null;
    const pe = $h(y, s.value, a.value);
    for (let Fe = 0; Fe < pe.length; Fe++) {
      const dt = d.value[pe[Fe]] || {}, bt = y.messageResolver(dt, F);
      if (bt != null) {
        j = bt;
        break;
      }
    }
    return j;
  }
  function $e(F) {
    const j = me(F);
    return j ?? (t ? t.tm(F) || {} : {});
  }
  function Se(F) {
    return d.value[F] || {};
  }
  function Le(F, j) {
    if (r) {
      const pe = { [F]: j };
      for (const Fe in pe)
        bn(pe, Fe) && ni(pe[Fe]);
      j = pe[F];
    }
    d.value[F] = j, y.messages = d.value;
  }
  function Ie(F, j) {
    d.value[F] = d.value[F] || {};
    const pe = { [F]: j };
    if (r)
      for (const Fe in pe)
        bn(pe, Fe) && ni(pe[Fe]);
    j = pe[F], xa(j, d.value[F]), y.messages = d.value;
  }
  function re(F) {
    return c.value[F] || {};
  }
  function k(F, j) {
    c.value[F] = j, y.datetimeFormats = c.value, lc(y, F, j);
  }
  function $(F, j) {
    c.value[F] = _t(c.value[F] || {}, j), y.datetimeFormats = c.value, lc(y, F, j);
  }
  function D(F) {
    return h.value[F] || {};
  }
  function ee(F, j) {
    h.value[F] = j, y.numberFormats = h.value, dc(y, F, j);
  }
  function ve(F, j) {
    h.value[F] = _t(h.value[F] || {}, j), y.numberFormats = h.value, dc(y, F, j);
  }
  mc++, t && Ud && (hc(t.locale, (F) => {
    l && (a.value = F, y.locale = F, Rr(y, a.value, s.value));
  }), hc(t.fallbackLocale, (F) => {
    l && (s.value = F, y.fallbackLocale = F, Rr(y, a.value, s.value));
  }));
  const he = {
    id: mc,
    locale: E,
    fallbackLocale: W,
    get inheritLocale() {
      return l;
    },
    set inheritLocale(F) {
      l = F, F && t && (a.value = t.locale.value, s.value = t.fallbackLocale.value, Rr(y, a.value, s.value));
    },
    get availableLocales() {
      return Object.keys(d.value).sort();
    },
    messages: _,
    get modifiers() {
      return C;
    },
    get pluralRules() {
      return S || {};
    },
    get isGlobal() {
      return o;
    },
    get missingWarn() {
      return p;
    },
    set missingWarn(F) {
      p = F, y.missingWarn = p;
    },
    get fallbackWarn() {
      return g;
    },
    set fallbackWarn(F) {
      g = F, y.fallbackWarn = g;
    },
    get fallbackRoot() {
      return f;
    },
    set fallbackRoot(F) {
      f = F;
    },
    get fallbackFormat() {
      return v;
    },
    set fallbackFormat(F) {
      v = F, y.fallbackFormat = v;
    },
    get warnHtmlMessage() {
      return x;
    },
    set warnHtmlMessage(F) {
      x = F, y.warnHtmlMessage = F;
    },
    get escapeParameter() {
      return b;
    },
    set escapeParameter(F) {
      b = F, y.escapeParameter = F;
    },
    t: J,
    getLocaleMessage: Se,
    setLocaleMessage: Le,
    mergeLocaleMessage: Ie,
    getPostTranslationHandler: O,
    setPostTranslationHandler: K,
    getMissingHandler: L,
    setMissingHandler: Y,
    [ib]: ce
  };
  return he.datetimeFormats = M, he.numberFormats = I, he.rt = q, he.te = Pe, he.tm = $e, he.d = A, he.n = G, he.getDateTimeFormat = re, he.setDateTimeFormat = k, he.mergeDateTimeFormat = $, he.getNumberFormat = D, he.setNumberFormat = ee, he.mergeNumberFormat = ve, he[Ah] = n, he[Cs] = de, he[Ss] = X, he[$s] = ge, he;
}
const ad = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (e) => e === "parent" || e === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function cb({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((o, r) => [
    ...o,
    // prettier-ignore
    ...r.type === Mh ? r.children : [r]
  ], []) : t.reduce((n, o) => {
    const r = e[o];
    return r && (n[o] = r()), n;
  }, rt());
}
function Lh() {
  return Mh;
}
_t({
  keypath: {
    type: String,
    required: !0
  },
  plural: {
    type: [Number, String],
    validator: (e) => Pt(e) || !isNaN(e)
  }
}, ad);
function ub(e) {
  return xt(e) && !ye(e[0]);
}
function Dh(e, t, n, o) {
  const { slots: r, attrs: i } = t;
  return () => {
    const l = { part: !0 };
    let a = rt();
    e.locale && (l.locale = e.locale), ye(e.format) ? l.key = e.format : Xe(e.format) && (ye(e.format.key) && (l.key = e.format.key), a = Object.keys(e.format).reduce((p, g) => n.includes(g) ? _t(rt(), p, { [g]: e.format[g] }) : p, rt()));
    const s = o(e.value, l, a);
    let d = [l.key];
    xt(s) ? d = s.map((p, g) => {
      const f = r[p.type], v = f ? f({ [p.type]: p.value, index: g, parts: s }) : [p.value];
      return ub(v) && (v[0].key = `${p.type}-${g}`), v;
    }) : ye(s) && (d = [s]);
    const c = _t(rt(), i), h = ye(e.tag) || Xe(e.tag) ? e.tag : Lh();
    return Ih(h, c, d);
  };
}
_t({
  value: {
    type: Number,
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, ad);
const fb = /* @__PURE__ */ Ao("global-vue-i18n");
function Ha(e = {}) {
  const t = rd();
  if (t == null)
    throw ti(sr.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw ti(sr.NOT_INSTALLED);
  const n = hb(t), o = vb(n), r = Bh(t), i = pb(e, r);
  if (i === "global")
    return ab(o, e, r), o;
  if (i === "parent") {
    let s = gb(n, t, e.__useComponent);
    return s == null && (s = o), s;
  }
  const l = n;
  let a = l.__getInstance(t);
  if (a == null) {
    const s = _t({}, e);
    "__i18n" in r && (s.__i18n = r.__i18n), o && (s.__root = o), a = db(s), l.__composerExtend && (a[Rs] = l.__composerExtend(a)), bb(l, t, a), l.__setInstance(t, a);
  }
  return a;
}
function hb(e) {
  const t = eb(e.isCE ? fb : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw ti(e.isCE ? sr.NOT_INSTALLED_WITH_PROVIDE : sr.UNEXPECTED_ERROR);
  return t;
}
function pb(e, t) {
  return La(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function vb(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function gb(e, t, n = !1) {
  let o = null;
  const r = t.root;
  let i = mb(t, n);
  for (; i != null; ) {
    const l = e;
    if (e.mode === "composition")
      o = l.__getInstance(i);
    else if (__VUE_I18N_LEGACY_API__) {
      const a = l.__getInstance(i);
      a != null && (o = a.__composer, n && o && !o[Ah] && (o = null));
    }
    if (o != null || r === i)
      break;
    i = i.parent;
  }
  return o;
}
function mb(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function bb(e, t, n) {
  tb(() => {
  }, t), nb(() => {
    const o = n;
    e.__deleteInstance(t);
    const r = o[Rs];
    r && (r(), delete o[Rs]);
  }, t);
}
_t({
  value: {
    type: [Number, Date],
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, ad);
rb();
Tm(cm);
Fm(km);
Em($h);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = ko();
  e.__INTLIFY__ = !0, um(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
function wb(e) {
  let t = ".", n = "__", o = "--", r;
  if (e) {
    let f = e.blockPrefix;
    f && (t = f), f = e.elementPrefix, f && (n = f), f = e.modifierPrefix, f && (o = f);
  }
  const i = {
    install(f) {
      r = f.c;
      const v = f.context;
      v.bem = {}, v.bem.b = null, v.bem.els = null;
    }
  };
  function l(f) {
    let v, m;
    return {
      before(u) {
        v = u.bem.b, m = u.bem.els, u.bem.els = null;
      },
      after(u) {
        u.bem.b = v, u.bem.els = m;
      },
      $({ context: u, props: w }) {
        return f = typeof f == "string" ? f : f({ context: u, props: w }), u.bem.b = f, `${(w == null ? void 0 : w.bPrefix) || t}${u.bem.b}`;
      }
    };
  }
  function a(f) {
    let v;
    return {
      before(m) {
        v = m.bem.els;
      },
      after(m) {
        m.bem.els = v;
      },
      $({ context: m, props: u }) {
        return f = typeof f == "string" ? f : f({ context: m, props: u }), m.bem.els = f.split(",").map((w) => w.trim()), m.bem.els.map((w) => `${(u == null ? void 0 : u.bPrefix) || t}${m.bem.b}${n}${w}`).join(", ");
      }
    };
  }
  function s(f) {
    return {
      $({ context: v, props: m }) {
        f = typeof f == "string" ? f : f({ context: v, props: m });
        const u = f.split(",").map((b) => b.trim());
        function w(b) {
          return u.map((C) => `&${(m == null ? void 0 : m.bPrefix) || t}${v.bem.b}${b !== void 0 ? `${n}${b}` : ""}${o}${C}`).join(", ");
        }
        const x = v.bem.els;
        return x !== null ? w(x[0]) : w();
      }
    };
  }
  function d(f) {
    return {
      $({ context: v, props: m }) {
        f = typeof f == "string" ? f : f({ context: v, props: m });
        const u = v.bem.els;
        return `&:not(${(m == null ? void 0 : m.bPrefix) || t}${v.bem.b}${u !== null && u.length > 0 ? `${n}${u[0]}` : ""}${o}${f})`;
      }
    };
  }
  return Object.assign(i, {
    cB: (...f) => r(l(f[0]), f[1], f[2]),
    cE: (...f) => r(a(f[0]), f[1], f[2]),
    cM: (...f) => r(s(f[0]), f[1], f[2]),
    cNotM: (...f) => r(d(f[0]), f[1], f[2])
  }), i;
}
function yb(e) {
  let t = 0;
  for (let n = 0; n < e.length; ++n)
    e[n] === "&" && ++t;
  return t;
}
const Nh = /\s*,(?![^(]*\))\s*/g, xb = /\s+/g;
function Cb(e, t) {
  const n = [];
  return t.split(Nh).forEach((o) => {
    let r = yb(o);
    if (r) {
      if (r === 1) {
        e.forEach((l) => {
          n.push(o.replace("&", l));
        });
        return;
      }
    } else {
      e.forEach((l) => {
        n.push(
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          (l && l + " ") + o
        );
      });
      return;
    }
    let i = [
      o
    ];
    for (; r--; ) {
      const l = [];
      i.forEach((a) => {
        e.forEach((s) => {
          l.push(a.replace("&", s));
        });
      }), i = l;
    }
    i.forEach((l) => n.push(l));
  }), n;
}
function Sb(e, t) {
  const n = [];
  return t.split(Nh).forEach((o) => {
    e.forEach((r) => {
      n.push((r && r + " ") + o);
    });
  }), n;
}
function $b(e) {
  let t = [""];
  return e.forEach((n) => {
    n = n && n.trim(), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    n && (n.includes("&") ? t = Cb(t, n) : t = Sb(t, n));
  }), t.join(", ").replace(xb, " ");
}
function wc(e) {
  if (!e)
    return;
  const t = e.parentElement;
  t && t.removeChild(e);
}
function ja(e, t) {
  return (t ?? document.head).querySelector(`style[cssr-id="${e}"]`);
}
function Rb(e) {
  const t = document.createElement("style");
  return t.setAttribute("cssr-id", e), t;
}
function Si(e) {
  return e ? /^\s*@(s|m)/.test(e) : !1;
}
const kb = /[A-Z]/g;
function Hh(e) {
  return e.replace(kb, (t) => "-" + t.toLowerCase());
}
function Pb(e, t = "  ") {
  return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((n) => t + `  ${Hh(n[0])}: ${n[1]};`).join(`
`) + `
` + t + "}" : `: ${e};`;
}
function _b(e, t, n) {
  return typeof e == "function" ? e({
    context: t.context,
    props: n
  }) : e;
}
function yc(e, t, n, o) {
  if (!t)
    return "";
  const r = _b(t, n, o);
  if (!r)
    return "";
  if (typeof r == "string")
    return `${e} {
${r}
}`;
  const i = Object.keys(r);
  if (i.length === 0)
    return n.config.keepEmptyBlock ? e + ` {
}` : "";
  const l = e ? [
    e + " {"
  ] : [];
  return i.forEach((a) => {
    const s = r[a];
    if (a === "raw") {
      l.push(`
` + s + `
`);
      return;
    }
    a = Hh(a), s != null && l.push(`  ${a}${Pb(s)}`);
  }), e && l.push("}"), l.join(`
`);
}
function ks(e, t, n) {
  e && e.forEach((o) => {
    if (Array.isArray(o))
      ks(o, t, n);
    else if (typeof o == "function") {
      const r = o(t);
      Array.isArray(r) ? ks(r, t, n) : r && n(r);
    } else o && n(o);
  });
}
function jh(e, t, n, o, r) {
  const i = e.$;
  let l = "";
  if (!i || typeof i == "string")
    Si(i) ? l = i : t.push(i);
  else if (typeof i == "function") {
    const d = i({
      context: o.context,
      props: r
    });
    Si(d) ? l = d : t.push(d);
  } else if (i.before && i.before(o.context), !i.$ || typeof i.$ == "string")
    Si(i.$) ? l = i.$ : t.push(i.$);
  else if (i.$) {
    const d = i.$({
      context: o.context,
      props: r
    });
    Si(d) ? l = d : t.push(d);
  }
  const a = $b(t), s = yc(a, e.props, o, r);
  l ? n.push(`${l} {`) : s.length && n.push(s), e.children && ks(e.children, {
    context: o.context,
    props: r
  }, (d) => {
    if (typeof d == "string") {
      const c = yc(a, { raw: d }, o, r);
      n.push(c);
    } else
      jh(d, t, n, o, r);
  }), t.pop(), l && n.push("}"), i && i.after && i.after(o.context);
}
function Tb(e, t, n) {
  const o = [];
  return jh(e, [], o, t, n), o.join(`

`);
}
function Pa(e) {
  for (var t = 0, n, o = 0, r = e.length; r >= 4; ++o, r -= 4)
    n = e.charCodeAt(o) & 255 | (e.charCodeAt(++o) & 255) << 8 | (e.charCodeAt(++o) & 255) << 16 | (e.charCodeAt(++o) & 255) << 24, n = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= /* k >>> r: */
    n >>> 24, t = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (r) {
    case 3:
      t ^= (e.charCodeAt(o + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(o + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(o) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
typeof window < "u" && (window.__cssrContext = {});
function Fb(e, t, n, o) {
  const { els: r } = t;
  if (n === void 0)
    r.forEach(wc), t.els = [];
  else {
    const i = ja(n, o);
    i && r.includes(i) && (wc(i), t.els = r.filter((l) => l !== i));
  }
}
function xc(e, t) {
  e.push(t);
}
function Eb(e, t, n, o, r, i, l, a, s) {
  let d;
  if (n === void 0 && (d = t.render(o), n = Pa(d)), s) {
    s.adapter(n, d ?? t.render(o));
    return;
  }
  a === void 0 && (a = document.head);
  const c = ja(n, a);
  if (c !== null && !i)
    return c;
  const h = c ?? Rb(n);
  if (d === void 0 && (d = t.render(o)), h.textContent = d, c !== null)
    return c;
  if (l) {
    const p = a.querySelector(`meta[name="${l}"]`);
    if (p)
      return a.insertBefore(h, p), xc(t.els, h), h;
  }
  return r ? a.insertBefore(h, a.querySelector("style, link")) : a.appendChild(h), xc(t.els, h), h;
}
function zb(e) {
  return Tb(this, this.instance, e);
}
function Ob(e = {}) {
  const { id: t, ssr: n, props: o, head: r = !1, force: i = !1, anchorMetaName: l, parent: a } = e;
  return Eb(this.instance, this, t, o, r, i, l, a, n);
}
function Mb(e = {}) {
  const { id: t, parent: n } = e;
  Fb(this.instance, this, t, n);
}
const $i = function(e, t, n, o) {
  return {
    instance: e,
    $: t,
    props: n,
    children: o,
    els: [],
    render: zb,
    mount: Ob,
    unmount: Mb
  };
}, Ib = function(e, t, n, o) {
  return Array.isArray(t) ? $i(e, { $: null }, null, t) : Array.isArray(n) ? $i(e, t, null, n) : Array.isArray(o) ? $i(e, t, n, o) : $i(e, t, n, null);
};
function Wh(e = {}) {
  const t = {
    c: (...n) => Ib(t, ...n),
    use: (n, ...o) => n.install(t, ...o),
    find: ja,
    context: {},
    config: e
  };
  return t;
}
function Ab(e, t) {
  if (e === void 0)
    return !1;
  if (t) {
    const { context: { ids: n } } = t;
    return n.has(e);
  }
  return ja(e) !== null;
}
const Vb = "n", oi = `.${Vb}-`, Bb = "__", Lb = "--", Uh = Wh(), Kh = wb({
  blockPrefix: oi,
  elementPrefix: Bb,
  modifierPrefix: Lb
});
Uh.use(Kh);
const {
  c: H,
  find: ZE
} = Uh, {
  cB: z,
  cE: B,
  cM: U,
  cNotM: tt
} = Kh;
function ld(e) {
  return H(({
    props: {
      bPrefix: t
    }
  }) => `${t || oi}modal, ${t || oi}drawer`, [e]);
}
function sd(e) {
  return H(({
    props: {
      bPrefix: t
    }
  }) => `${t || oi}popover`, [e]);
}
function Db(e) {
  return H(({
    props: {
      bPrefix: t
    }
  }) => `&${t || oi}modal`, e);
}
const Nb = (...e) => H(">", [z(...e)]);
function oe(e, t) {
  return e + (t === "default" ? "" : t.replace(/^[a-z]/, (n) => n.toUpperCase()));
}
let _a = [];
const qh = /* @__PURE__ */ new WeakMap();
function Hb() {
  _a.forEach((e) => e(...qh.get(e))), _a = [];
}
function ri(e, ...t) {
  qh.set(e, t), !_a.includes(e) && _a.push(e) === 1 && requestAnimationFrame(Hb);
}
function cn(e, t) {
  let { target: n } = e;
  for (; n; ) {
    if (n.dataset && n.dataset[t] !== void 0)
      return !0;
    n = n.parentElement;
  }
  return !1;
}
function ii(e) {
  return e.composedPath()[0] || null;
}
function jb(e) {
  if (typeof e == "number")
    return {
      "": e.toString()
    };
  const t = {};
  return e.split(/ +/).forEach((n) => {
    if (n === "")
      return;
    const [o, r] = n.split(":");
    r === void 0 ? t[""] = o : t[o] = r;
  }), t;
}
function jo(e, t) {
  var n;
  if (e == null)
    return;
  const o = jb(e);
  if (t === void 0)
    return o[""];
  if (typeof t == "string")
    return (n = o[t]) !== null && n !== void 0 ? n : o[""];
  if (Array.isArray(t)) {
    for (let r = t.length - 1; r >= 0; --r) {
      const i = t[r];
      if (i in o)
        return o[i];
    }
    return o[""];
  } else {
    let r, i = -1;
    return Object.keys(o).forEach((l) => {
      const a = Number(l);
      !Number.isNaN(a) && t >= a && a >= i && (i = a, r = o[l]);
    }), r;
  }
}
function Rt(e) {
  return typeof e == "string" ? e.endsWith("px") ? Number(e.slice(0, e.length - 2)) : Number(e) : e;
}
function lt(e) {
  if (e != null)
    return typeof e == "number" ? `${e}px` : e.endsWith("px") ? e : `${e}px`;
}
function en(e, t) {
  const n = e.trim().split(/\s+/g), o = {
    top: n[0]
  };
  switch (n.length) {
    case 1:
      o.right = n[0], o.bottom = n[0], o.left = n[0];
      break;
    case 2:
      o.right = n[1], o.left = n[1], o.bottom = n[0];
      break;
    case 3:
      o.right = n[1], o.bottom = n[2], o.left = n[1];
      break;
    case 4:
      o.right = n[1], o.bottom = n[2], o.left = n[3];
      break;
    default:
      throw new Error("[seemly/getMargin]:" + e + " is not a valid value.");
  }
  return t === void 0 ? o : o[t];
}
function Wb(e, t) {
  const [n, o] = e.split(" ");
  return {
    row: n,
    col: o || n
  };
}
const Cc = {
  aliceblue: "#F0F8FF",
  antiquewhite: "#FAEBD7",
  aqua: "#0FF",
  aquamarine: "#7FFFD4",
  azure: "#F0FFFF",
  beige: "#F5F5DC",
  bisque: "#FFE4C4",
  black: "#000",
  blanchedalmond: "#FFEBCD",
  blue: "#00F",
  blueviolet: "#8A2BE2",
  brown: "#A52A2A",
  burlywood: "#DEB887",
  cadetblue: "#5F9EA0",
  chartreuse: "#7FFF00",
  chocolate: "#D2691E",
  coral: "#FF7F50",
  cornflowerblue: "#6495ED",
  cornsilk: "#FFF8DC",
  crimson: "#DC143C",
  cyan: "#0FF",
  darkblue: "#00008B",
  darkcyan: "#008B8B",
  darkgoldenrod: "#B8860B",
  darkgray: "#A9A9A9",
  darkgrey: "#A9A9A9",
  darkgreen: "#006400",
  darkkhaki: "#BDB76B",
  darkmagenta: "#8B008B",
  darkolivegreen: "#556B2F",
  darkorange: "#FF8C00",
  darkorchid: "#9932CC",
  darkred: "#8B0000",
  darksalmon: "#E9967A",
  darkseagreen: "#8FBC8F",
  darkslateblue: "#483D8B",
  darkslategray: "#2F4F4F",
  darkslategrey: "#2F4F4F",
  darkturquoise: "#00CED1",
  darkviolet: "#9400D3",
  deeppink: "#FF1493",
  deepskyblue: "#00BFFF",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1E90FF",
  firebrick: "#B22222",
  floralwhite: "#FFFAF0",
  forestgreen: "#228B22",
  fuchsia: "#F0F",
  gainsboro: "#DCDCDC",
  ghostwhite: "#F8F8FF",
  gold: "#FFD700",
  goldenrod: "#DAA520",
  gray: "#808080",
  grey: "#808080",
  green: "#008000",
  greenyellow: "#ADFF2F",
  honeydew: "#F0FFF0",
  hotpink: "#FF69B4",
  indianred: "#CD5C5C",
  indigo: "#4B0082",
  ivory: "#FFFFF0",
  khaki: "#F0E68C",
  lavender: "#E6E6FA",
  lavenderblush: "#FFF0F5",
  lawngreen: "#7CFC00",
  lemonchiffon: "#FFFACD",
  lightblue: "#ADD8E6",
  lightcoral: "#F08080",
  lightcyan: "#E0FFFF",
  lightgoldenrodyellow: "#FAFAD2",
  lightgray: "#D3D3D3",
  lightgrey: "#D3D3D3",
  lightgreen: "#90EE90",
  lightpink: "#FFB6C1",
  lightsalmon: "#FFA07A",
  lightseagreen: "#20B2AA",
  lightskyblue: "#87CEFA",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#B0C4DE",
  lightyellow: "#FFFFE0",
  lime: "#0F0",
  limegreen: "#32CD32",
  linen: "#FAF0E6",
  magenta: "#F0F",
  maroon: "#800000",
  mediumaquamarine: "#66CDAA",
  mediumblue: "#0000CD",
  mediumorchid: "#BA55D3",
  mediumpurple: "#9370DB",
  mediumseagreen: "#3CB371",
  mediumslateblue: "#7B68EE",
  mediumspringgreen: "#00FA9A",
  mediumturquoise: "#48D1CC",
  mediumvioletred: "#C71585",
  midnightblue: "#191970",
  mintcream: "#F5FFFA",
  mistyrose: "#FFE4E1",
  moccasin: "#FFE4B5",
  navajowhite: "#FFDEAD",
  navy: "#000080",
  oldlace: "#FDF5E6",
  olive: "#808000",
  olivedrab: "#6B8E23",
  orange: "#FFA500",
  orangered: "#FF4500",
  orchid: "#DA70D6",
  palegoldenrod: "#EEE8AA",
  palegreen: "#98FB98",
  paleturquoise: "#AFEEEE",
  palevioletred: "#DB7093",
  papayawhip: "#FFEFD5",
  peachpuff: "#FFDAB9",
  peru: "#CD853F",
  pink: "#FFC0CB",
  plum: "#DDA0DD",
  powderblue: "#B0E0E6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#F00",
  rosybrown: "#BC8F8F",
  royalblue: "#4169E1",
  saddlebrown: "#8B4513",
  salmon: "#FA8072",
  sandybrown: "#F4A460",
  seagreen: "#2E8B57",
  seashell: "#FFF5EE",
  sienna: "#A0522D",
  silver: "#C0C0C0",
  skyblue: "#87CEEB",
  slateblue: "#6A5ACD",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#FFFAFA",
  springgreen: "#00FF7F",
  steelblue: "#4682B4",
  tan: "#D2B48C",
  teal: "#008080",
  thistle: "#D8BFD8",
  tomato: "#FF6347",
  turquoise: "#40E0D0",
  violet: "#EE82EE",
  wheat: "#F5DEB3",
  white: "#FFF",
  whitesmoke: "#F5F5F5",
  yellow: "#FF0",
  yellowgreen: "#9ACD32",
  transparent: "#0000"
};
function Ub(e, t, n) {
  t /= 100, n /= 100;
  let o = (r, i = (r + e / 60) % 6) => n - n * t * Math.max(Math.min(i, 4 - i, 1), 0);
  return [o(5) * 255, o(3) * 255, o(1) * 255];
}
function Kb(e, t, n) {
  t /= 100, n /= 100;
  let o = t * Math.min(n, 1 - n), r = (i, l = (i + e / 30) % 12) => n - o * Math.max(Math.min(l - 3, 9 - l, 1), -1);
  return [r(0) * 255, r(8) * 255, r(4) * 255];
}
const zn = "^\\s*", On = "\\s*$", uo = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))%\\s*", tn = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", Po = "([0-9A-Fa-f])", _o = "([0-9A-Fa-f]{2})", Gh = new RegExp(`${zn}hsl\\s*\\(${tn},${uo},${uo}\\)${On}`), Xh = new RegExp(`${zn}hsv\\s*\\(${tn},${uo},${uo}\\)${On}`), Yh = new RegExp(`${zn}hsla\\s*\\(${tn},${uo},${uo},${tn}\\)${On}`), Zh = new RegExp(`${zn}hsva\\s*\\(${tn},${uo},${uo},${tn}\\)${On}`), qb = new RegExp(`${zn}rgb\\s*\\(${tn},${tn},${tn}\\)${On}`), Gb = new RegExp(`${zn}rgba\\s*\\(${tn},${tn},${tn},${tn}\\)${On}`), Xb = new RegExp(`${zn}#${Po}${Po}${Po}${On}`), Yb = new RegExp(`${zn}#${_o}${_o}${_o}${On}`), Zb = new RegExp(`${zn}#${Po}${Po}${Po}${Po}${On}`), Jb = new RegExp(`${zn}#${_o}${_o}${_o}${_o}${On}`);
function qt(e) {
  return parseInt(e, 16);
}
function Qb(e) {
  try {
    let t;
    if (t = Yh.exec(e))
      return [
        Ta(t[1]),
        so(t[5]),
        so(t[9]),
        Eo(t[13])
      ];
    if (t = Gh.exec(e))
      return [Ta(t[1]), so(t[5]), so(t[9]), 1];
    throw new Error(`[seemly/hsla]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function ew(e) {
  try {
    let t;
    if (t = Zh.exec(e))
      return [
        Ta(t[1]),
        so(t[5]),
        so(t[9]),
        Eo(t[13])
      ];
    if (t = Xh.exec(e))
      return [Ta(t[1]), so(t[5]), so(t[9]), 1];
    throw new Error(`[seemly/hsva]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function fo(e) {
  try {
    let t;
    if (t = Yb.exec(e))
      return [qt(t[1]), qt(t[2]), qt(t[3]), 1];
    if (t = qb.exec(e))
      return [Mt(t[1]), Mt(t[5]), Mt(t[9]), 1];
    if (t = Gb.exec(e))
      return [
        Mt(t[1]),
        Mt(t[5]),
        Mt(t[9]),
        Eo(t[13])
      ];
    if (t = Xb.exec(e))
      return [
        qt(t[1] + t[1]),
        qt(t[2] + t[2]),
        qt(t[3] + t[3]),
        1
      ];
    if (t = Jb.exec(e))
      return [
        qt(t[1]),
        qt(t[2]),
        qt(t[3]),
        Eo(qt(t[4]) / 255)
      ];
    if (t = Zb.exec(e))
      return [
        qt(t[1] + t[1]),
        qt(t[2] + t[2]),
        qt(t[3] + t[3]),
        Eo(qt(t[4] + t[4]) / 255)
      ];
    if (e in Cc)
      return fo(Cc[e]);
    if (Gh.test(e) || Yh.test(e)) {
      const [n, o, r, i] = Qb(e);
      return [...Kb(n, o, r), i];
    } else if (Xh.test(e) || Zh.test(e)) {
      const [n, o, r, i] = ew(e);
      return [...Ub(n, o, r), i];
    }
    throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function tw(e) {
  return e > 1 ? 1 : e < 0 ? 0 : e;
}
function Ps(e, t, n, o) {
  return `rgba(${Mt(e)}, ${Mt(t)}, ${Mt(n)}, ${tw(o)})`;
}
function fl(e, t, n, o, r) {
  return Mt((e * t * (1 - o) + n * o) / r);
}
function Ke(e, t) {
  Array.isArray(e) || (e = fo(e)), Array.isArray(t) || (t = fo(t));
  const n = e[3], o = t[3], r = Eo(n + o - n * o);
  return Ps(fl(e[0], n, t[0], o, r), fl(e[1], n, t[1], o, r), fl(e[2], n, t[2], o, r), r);
}
function Ee(e, t) {
  const [n, o, r, i = 1] = Array.isArray(e) ? e : fo(e);
  return typeof t.alpha == "number" ? Ps(n, o, r, t.alpha) : Ps(n, o, r, i);
}
function Ri(e, t) {
  const [n, o, r, i = 1] = Array.isArray(e) ? e : fo(e), { lightness: l = 1, alpha: a = 1 } = t;
  return nw([n * l, o * l, r * l, i * a]);
}
function Eo(e) {
  const t = Math.round(Number(e) * 100) / 100;
  return t > 1 ? 1 : t < 0 ? 0 : t;
}
function Ta(e) {
  const t = Math.round(Number(e));
  return t >= 360 || t < 0 ? 0 : t;
}
function Mt(e) {
  const t = Math.round(Number(e));
  return t > 255 ? 255 : t < 0 ? 0 : t;
}
function so(e) {
  const t = Math.round(Number(e));
  return t > 100 ? 100 : t < 0 ? 0 : t;
}
function nw(e) {
  const [t, n, o] = e;
  return 3 in e ? `rgba(${Mt(t)}, ${Mt(n)}, ${Mt(o)}, ${Eo(e[3])})` : `rgba(${Mt(t)}, ${Mt(n)}, ${Mt(o)}, 1)`;
}
function ai(e = 8) {
  return Math.random().toString(16).slice(2, 2 + e);
}
function ow(e, t) {
  const n = [];
  for (let o = 0; o < e; ++o)
    n.push(t);
  return n;
}
function Ca(e) {
  return e.composedPath()[0];
}
const rw = {
  mousemoveoutside: /* @__PURE__ */ new WeakMap(),
  clickoutside: /* @__PURE__ */ new WeakMap()
};
function iw(e, t, n) {
  if (e === "mousemoveoutside") {
    const o = (r) => {
      t.contains(Ca(r)) || n(r);
    };
    return {
      mousemove: o,
      touchstart: o
    };
  } else if (e === "clickoutside") {
    let o = !1;
    const r = (l) => {
      o = !t.contains(Ca(l));
    }, i = (l) => {
      o && (t.contains(Ca(l)) || n(l));
    };
    return {
      mousedown: r,
      mouseup: i,
      touchstart: r,
      touchend: i
    };
  }
  return console.error(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `[evtd/create-trap-handler]: name \`${e}\` is invalid. This could be a bug of evtd.`
  ), {};
}
function Jh(e, t, n) {
  const o = rw[e];
  let r = o.get(t);
  r === void 0 && o.set(t, r = /* @__PURE__ */ new WeakMap());
  let i = r.get(n);
  return i === void 0 && r.set(n, i = iw(e, t, n)), i;
}
function aw(e, t, n, o) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const r = Jh(e, t, n);
    return Object.keys(r).forEach((i) => {
      st(i, document, r[i], o);
    }), !0;
  }
  return !1;
}
function lw(e, t, n, o) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const r = Jh(e, t, n);
    return Object.keys(r).forEach((i) => {
      et(i, document, r[i], o);
    }), !0;
  }
  return !1;
}
function sw() {
  if (typeof window > "u")
    return {
      on: () => {
      },
      off: () => {
      }
    };
  const e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
  function n() {
    e.set(this, !0);
  }
  function o() {
    e.set(this, !0), t.set(this, !0);
  }
  function r(y, T, R) {
    const E = y[T];
    return y[T] = function() {
      return R.apply(y, arguments), E.apply(y, arguments);
    }, y;
  }
  function i(y, T) {
    y[T] = Event.prototype[T];
  }
  const l = /* @__PURE__ */ new WeakMap(), a = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
  function s() {
    var y;
    return (y = l.get(this)) !== null && y !== void 0 ? y : null;
  }
  function d(y, T) {
    a !== void 0 && Object.defineProperty(y, "currentTarget", {
      configurable: !0,
      enumerable: !0,
      get: T ?? a.get
    });
  }
  const c = {
    bubble: {},
    capture: {}
  }, h = {};
  function p() {
    const y = function(T) {
      const { type: R, eventPhase: E, bubbles: W } = T, _ = Ca(T);
      if (E === 2)
        return;
      const M = E === 1 ? "capture" : "bubble";
      let I = _;
      const O = [];
      for (; I === null && (I = window), O.push(I), I !== window; )
        I = I.parentNode || null;
      const K = c.capture[R], L = c.bubble[R];
      if (r(T, "stopPropagation", n), r(T, "stopImmediatePropagation", o), d(T, s), M === "capture") {
        if (K === void 0)
          return;
        for (let Y = O.length - 1; Y >= 0 && !e.has(T); --Y) {
          const Q = O[Y], J = K.get(Q);
          if (J !== void 0) {
            l.set(T, Q);
            for (const q of J) {
              if (t.has(T))
                break;
              q(T);
            }
          }
          if (Y === 0 && !W && L !== void 0) {
            const q = L.get(Q);
            if (q !== void 0)
              for (const A of q) {
                if (t.has(T))
                  break;
                A(T);
              }
          }
        }
      } else if (M === "bubble") {
        if (L === void 0)
          return;
        for (let Y = 0; Y < O.length && !e.has(T); ++Y) {
          const Q = O[Y], J = L.get(Q);
          if (J !== void 0) {
            l.set(T, Q);
            for (const q of J) {
              if (t.has(T))
                break;
              q(T);
            }
          }
        }
      }
      i(T, "stopPropagation"), i(T, "stopImmediatePropagation"), d(T);
    };
    return y.displayName = "evtdUnifiedHandler", y;
  }
  function g() {
    const y = function(T) {
      const { type: R, eventPhase: E } = T;
      if (E !== 2)
        return;
      const W = h[R];
      W !== void 0 && W.forEach((_) => _(T));
    };
    return y.displayName = "evtdUnifiedWindowEventHandler", y;
  }
  const f = p(), v = g();
  function m(y, T) {
    const R = c[y];
    return R[T] === void 0 && (R[T] = /* @__PURE__ */ new Map(), window.addEventListener(T, f, y === "capture")), R[T];
  }
  function u(y) {
    return h[y] === void 0 && (h[y] = /* @__PURE__ */ new Set(), window.addEventListener(y, v)), h[y];
  }
  function w(y, T) {
    let R = y.get(T);
    return R === void 0 && y.set(T, R = /* @__PURE__ */ new Set()), R;
  }
  function x(y, T, R, E) {
    const W = c[T][R];
    if (W !== void 0) {
      const _ = W.get(y);
      if (_ !== void 0 && _.has(E))
        return !0;
    }
    return !1;
  }
  function b(y, T) {
    const R = h[y];
    return !!(R !== void 0 && R.has(T));
  }
  function C(y, T, R, E) {
    let W;
    if (typeof E == "object" && E.once === !0 ? W = (K) => {
      S(y, T, W, E), R(K);
    } : W = R, aw(y, T, W, E))
      return;
    const M = E === !0 || typeof E == "object" && E.capture === !0 ? "capture" : "bubble", I = m(M, y), O = w(I, T);
    if (O.has(W) || O.add(W), T === window) {
      const K = u(y);
      K.has(W) || K.add(W);
    }
  }
  function S(y, T, R, E) {
    if (lw(y, T, R, E))
      return;
    const _ = E === !0 || typeof E == "object" && E.capture === !0, M = _ ? "capture" : "bubble", I = m(M, y), O = w(I, T);
    if (T === window && !x(T, _ ? "bubble" : "capture", y, R) && b(y, R)) {
      const L = h[y];
      L.delete(R), L.size === 0 && (window.removeEventListener(y, v), h[y] = void 0);
    }
    O.has(R) && O.delete(R), O.size === 0 && I.delete(T), I.size === 0 && (window.removeEventListener(y, f, M === "capture"), c[M][y] = void 0);
  }
  return {
    on: C,
    off: S
  };
}
const { on: st, off: et } = sw(), dw = window.Vue.ref, Sc = window.Vue.readonly, cw = window.Vue.watch;
function uw(e) {
  const t = dw(!!e.value);
  if (t.value)
    return Sc(t);
  const n = cw(e, (o) => {
    o && (t.value = !0, n());
  });
  return Sc(t);
}
const fw = window.Vue.computed, hw = window.Vue.ref, pw = window.Vue.watch;
function Me(e) {
  const t = fw(e), n = hw(t.value);
  return pw(t, (o) => {
    n.value = o;
  }), typeof e == "function" ? n : {
    __v_isRef: !0,
    get value() {
      return n.value;
    },
    set value(o) {
      e.set(o);
    }
  };
}
const vw = window.Vue.getCurrentInstance;
function gw() {
  return vw() !== null;
}
const Qh = typeof window < "u", mw = window.Vue.onMounted, bw = window.Vue.onBeforeUnmount;
let rr, Kr;
const ww = () => {
  var e, t;
  rr = Qh ? (t = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || t === void 0 ? void 0 : t.ready : void 0, Kr = !1, rr !== void 0 ? rr.then(() => {
    Kr = !0;
  }) : Kr = !0;
};
ww();
function yw(e) {
  if (Kr)
    return;
  let t = !1;
  mw(() => {
    Kr || rr == null || rr.then(() => {
      t || e();
    });
  }), bw(() => {
    t = !0;
  });
}
const xw = window.Vue.watch, Cw = window.Vue.computed;
function It(e, t) {
  return xw(e, (n) => {
    n !== void 0 && (t.value = n);
  }), Cw(() => e.value === void 0 ? t.value : e.value);
}
const Sw = window.Vue.ref, $w = window.Vue.onMounted, Rw = window.Vue.readonly;
function Wa() {
  const e = Sw(!1);
  return $w(() => {
    e.value = !0;
  }), Rw(e);
}
const kw = window.Vue.computed;
function ep(e, t) {
  return kw(() => {
    for (const n of t)
      if (e[n] !== void 0)
        return e[n];
    return e[t[t.length - 1]];
  });
}
const Pw = (typeof window > "u" ? !1 : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
!window.MSStream;
function _w() {
  return Pw;
}
const Tw = window.Vue.ref, hl = window.Vue.computed, Fw = window.Vue.onBeforeUnmount, Ew = {
  // mobile
  // 0 ~ 640 doesn't mean it should display well in all the range,
  // but means you should treat it like a mobile phone.)
  xs: 0,
  s: 640,
  m: 1024,
  l: 1280,
  xl: 1536,
  "2xl": 1920
  // normal desktop display
};
function zw(e) {
  return `(min-width: ${e}px)`;
}
const Pr = {};
function Ow(e = Ew) {
  if (!Qh)
    return hl(() => []);
  if (typeof window.matchMedia != "function")
    return hl(() => []);
  const t = Tw({}), n = Object.keys(e), o = (r, i) => {
    r.matches ? t.value[i] = !0 : t.value[i] = !1;
  };
  return n.forEach((r) => {
    const i = e[r];
    let l, a;
    Pr[i] === void 0 ? (l = window.matchMedia(zw(i)), l.addEventListener ? l.addEventListener("change", (s) => {
      a.forEach((d) => {
        d(s, r);
      });
    }) : l.addListener && l.addListener((s) => {
      a.forEach((d) => {
        d(s, r);
      });
    }), a = /* @__PURE__ */ new Set(), Pr[i] = {
      mql: l,
      cbs: a
    }) : (l = Pr[i].mql, a = Pr[i].cbs), a.add(o), l.matches && a.forEach((s) => {
      s(l, r);
    });
  }), Fw(() => {
    n.forEach((r) => {
      const { cbs: i } = Pr[e[r]];
      i.has(o) && i.delete(o);
    });
  }), hl(() => {
    const { value: r } = t;
    return n.filter((i) => r[i]);
  });
}
const Mw = window.Vue.onBeforeMount, Iw = window.Vue.onBeforeUnmount, Aw = window.Vue.reactive, Vw = window.Vue.readonly, Bw = window.Vue.watch;
function Lw(e = {}, t) {
  const n = Aw({
    ctrl: !1,
    command: !1,
    win: !1,
    shift: !1,
    tab: !1
  }), { keydown: o, keyup: r } = e, i = (s) => {
    switch (s.key) {
      case "Control":
        n.ctrl = !0;
        break;
      case "Meta":
        n.command = !0, n.win = !0;
        break;
      case "Shift":
        n.shift = !0;
        break;
      case "Tab":
        n.tab = !0;
        break;
    }
    o !== void 0 && Object.keys(o).forEach((d) => {
      if (d !== s.key)
        return;
      const c = o[d];
      if (typeof c == "function")
        c(s);
      else {
        const { stop: h = !1, prevent: p = !1 } = c;
        h && s.stopPropagation(), p && s.preventDefault(), c.handler(s);
      }
    });
  }, l = (s) => {
    switch (s.key) {
      case "Control":
        n.ctrl = !1;
        break;
      case "Meta":
        n.command = !1, n.win = !1;
        break;
      case "Shift":
        n.shift = !1;
        break;
      case "Tab":
        n.tab = !1;
        break;
    }
    r !== void 0 && Object.keys(r).forEach((d) => {
      if (d !== s.key)
        return;
      const c = r[d];
      if (typeof c == "function")
        c(s);
      else {
        const { stop: h = !1, prevent: p = !1 } = c;
        h && s.stopPropagation(), p && s.preventDefault(), c.handler(s);
      }
    });
  }, a = () => {
    (t === void 0 || t.value) && (st("keydown", document, i), st("keyup", document, l)), t !== void 0 && Bw(t, (s) => {
      s ? (st("keydown", document, i), st("keyup", document, l)) : (et("keydown", document, i), et("keyup", document, l));
    });
  };
  return gw() ? (Mw(a), Iw(() => {
    (t === void 0 || t.value) && (et("keydown", document, i), et("keyup", document, l));
  })) : a(), Vw(n);
}
const dd = "n-internal-select-menu", tp = "n-internal-select-menu-body", cd = "n-drawer-body", ud = "n-modal-body", Ua = "n-popover-body", ki = window.Vue.inject, Dw = window.Vue.onBeforeUnmount, Nw = window.Vue.onMounted, Hw = window.Vue.ref, np = "__disabled__";
function En(e) {
  const t = ki(ud, null), n = ki(cd, null), o = ki(Ua, null), r = ki(tp, null), i = Hw();
  if (typeof document < "u") {
    i.value = document.fullscreenElement;
    const l = () => {
      i.value = document.fullscreenElement;
    };
    Nw(() => {
      st("fullscreenchange", document, l);
    }), Dw(() => {
      et("fullscreenchange", document, l);
    });
  }
  return Me(() => {
    var l;
    const {
      to: a
    } = e;
    return a !== void 0 ? a === !1 ? np : a === !0 ? i.value || "body" : a : t != null && t.value ? (l = t.value.$el) !== null && l !== void 0 ? l : t.value : n != null && n.value ? n.value : o != null && o.value ? o.value : r != null && r.value ? r.value : a ?? (i.value || "body");
  });
}
En.tdkey = np;
En.propTo = {
  type: [String, Object, Boolean],
  default: void 0
};
const jw = window.Vue.getCurrentInstance, Ww = window.Vue.inject, Uw = window.Vue.onBeforeUnmount;
window.Vue.onMounted;
const Kw = window.Vue.watch;
function qw(e, t, n) {
  var o;
  const r = Ww(e, null);
  if (r === null) return;
  const i = (o = jw()) === null || o === void 0 ? void 0 : o.proxy;
  Kw(n, l), l(n.value), Uw(() => {
    l(void 0, n.value);
  });
  function l(d, c) {
    if (!r) return;
    const h = r[t];
    c !== void 0 && a(h, c), d !== void 0 && s(h, d);
  }
  function a(d, c) {
    d[c] || (d[c] = []), d[c].splice(d[c].findIndex((h) => h === i), 1);
  }
  function s(d, c) {
    d[c] || (d[c] = []), ~d[c].findIndex((h) => h === i) || d[c].push(i);
  }
}
const Gw = window.Vue.ref, Xw = window.Vue.watch;
function Yw(e, t, n) {
  const o = Gw(e.value);
  let r = null;
  return Xw(e, (i) => {
    r !== null && window.clearTimeout(r), i === !0 ? n && !n.value ? o.value = !0 : r = window.setTimeout(() => {
      o.value = !0;
    }, t) : o.value = !1;
  }), o;
}
const hr = typeof document < "u" && typeof window < "u", Zw = window.Vue.onActivated, Jw = window.Vue.onDeactivated;
function Qw(e) {
  const t = {
    isDeactivated: !1
  };
  let n = !1;
  return Zw(() => {
    if (t.isDeactivated = !1, !n) {
      n = !0;
      return;
    }
    e();
  }), Jw(() => {
    t.isDeactivated = !0, n || (n = !0);
  }), t;
}
const e0 = window.Vue.Fragment, t0 = window.Vue.createTextVNode, n0 = window.Vue.Comment;
function _s(e, t, n = "default") {
  const o = t[n];
  if (o === void 0)
    throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  return o();
}
function Ts(e, t = !0, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(t0(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        Ts(o, t, n);
        return;
      }
      if (o.type === e0) {
        if (o.children === null)
          return;
        Array.isArray(o.children) && Ts(o.children, t, n);
      } else o.type !== n0 && n.push(o);
    }
  }), n;
}
function $c(e, t, n = "default") {
  const o = t[n];
  if (o === void 0)
    throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  const r = Ts(o());
  if (r.length === 1)
    return r[0];
  throw new Error(`[vueuc/${e}]: slot[${n}] should have exactly one child.`);
}
let Jn = null;
function op() {
  if (Jn === null && (Jn = document.getElementById("v-binder-view-measurer"), Jn === null)) {
    Jn = document.createElement("div"), Jn.id = "v-binder-view-measurer";
    const { style: e } = Jn;
    e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(Jn);
  }
  return Jn.getBoundingClientRect();
}
function o0(e, t) {
  const n = op();
  return {
    top: t,
    left: e,
    height: 0,
    width: 0,
    right: n.width - e,
    bottom: n.height - t
  };
}
function pl(e) {
  const t = e.getBoundingClientRect(), n = op();
  return {
    left: t.left - n.left,
    top: t.top - n.top,
    bottom: n.height + n.top - t.bottom,
    right: n.width + n.left - t.right,
    width: t.width,
    height: t.height
  };
}
function r0(e) {
  return e.nodeType === 9 ? null : e.parentNode;
}
function rp(e) {
  if (e === null)
    return null;
  const t = r0(e);
  if (t === null)
    return null;
  if (t.nodeType === 9)
    return document;
  if (t.nodeType === 1) {
    const { overflow: n, overflowX: o, overflowY: r } = getComputedStyle(t);
    if (/(auto|scroll|overlay)/.test(n + r + o))
      return t;
  }
  return rp(t);
}
const i0 = window.Vue.defineComponent, a0 = window.Vue.provide, l0 = window.Vue.ref, s0 = window.Vue.inject, d0 = window.Vue.getCurrentInstance, c0 = window.Vue.onBeforeUnmount, fd = i0({
  name: "Binder",
  props: {
    syncTargetWithParent: Boolean,
    syncTarget: {
      type: Boolean,
      default: !0
    }
  },
  setup(e) {
    var t;
    a0("VBinder", (t = d0()) === null || t === void 0 ? void 0 : t.proxy);
    const n = s0("VBinder", null), o = l0(null), r = (u) => {
      o.value = u, n && e.syncTargetWithParent && n.setTargetRef(u);
    };
    let i = [];
    const l = () => {
      let u = o.value;
      for (; u = rp(u), u !== null; )
        i.push(u);
      for (const w of i)
        st("scroll", w, h, !0);
    }, a = () => {
      for (const u of i)
        et("scroll", u, h, !0);
      i = [];
    }, s = /* @__PURE__ */ new Set(), d = (u) => {
      s.size === 0 && l(), s.has(u) || s.add(u);
    }, c = (u) => {
      s.has(u) && s.delete(u), s.size === 0 && a();
    }, h = () => {
      ri(p);
    }, p = () => {
      s.forEach((u) => u());
    }, g = /* @__PURE__ */ new Set(), f = (u) => {
      g.size === 0 && st("resize", window, m), g.has(u) || g.add(u);
    }, v = (u) => {
      g.has(u) && g.delete(u), g.size === 0 && et("resize", window, m);
    }, m = () => {
      g.forEach((u) => u());
    };
    return c0(() => {
      et("resize", window, m), a();
    }), {
      targetRef: o,
      setTargetRef: r,
      addScrollListener: d,
      removeScrollListener: c,
      addResizeListener: f,
      removeResizeListener: v
    };
  },
  render() {
    return _s("binder", this.$slots);
  }
}), u0 = window.Vue.defineComponent, f0 = window.Vue.inject, h0 = window.Vue.withDirectives, hd = u0({
  name: "Target",
  setup() {
    const { setTargetRef: e, syncTarget: t } = f0("VBinder");
    return {
      syncTarget: t,
      setTargetDirective: {
        mounted: e,
        updated: e
      }
    };
  },
  render() {
    const { syncTarget: e, setTargetDirective: t } = this;
    return e ? h0($c("follower", this.$slots), [
      [t]
    ]) : $c("follower", this.$slots);
  }
}), Wo = "@@mmoContext", p0 = {
  mounted(e, { value: t }) {
    e[Wo] = {
      handler: void 0
    }, typeof t == "function" && (e[Wo].handler = t, st("mousemoveoutside", e, t));
  },
  updated(e, { value: t }) {
    const n = e[Wo];
    typeof t == "function" ? n.handler ? n.handler !== t && (et("mousemoveoutside", e, n.handler), n.handler = t, st("mousemoveoutside", e, t)) : (e[Wo].handler = t, st("mousemoveoutside", e, t)) : n.handler && (et("mousemoveoutside", e, n.handler), n.handler = void 0);
  },
  unmounted(e) {
    const { handler: t } = e[Wo];
    t && et("mousemoveoutside", e, t), e[Wo].handler = void 0;
  }
}, Uo = "@@coContext", Fa = {
  mounted(e, { value: t, modifiers: n }) {
    e[Uo] = {
      handler: void 0
    }, typeof t == "function" && (e[Uo].handler = t, st("clickoutside", e, t, {
      capture: n.capture
    }));
  },
  updated(e, { value: t, modifiers: n }) {
    const o = e[Uo];
    typeof t == "function" ? o.handler ? o.handler !== t && (et("clickoutside", e, o.handler, {
      capture: n.capture
    }), o.handler = t, st("clickoutside", e, t, {
      capture: n.capture
    })) : (e[Uo].handler = t, st("clickoutside", e, t, {
      capture: n.capture
    })) : o.handler && (et("clickoutside", e, o.handler, {
      capture: n.capture
    }), o.handler = void 0);
  },
  unmounted(e, { modifiers: t }) {
    const { handler: n } = e[Uo];
    n && et("clickoutside", e, n, {
      capture: t.capture
    }), e[Uo].handler = void 0;
  }
};
function v0(e, t) {
  console.error(`[vdirs/${e}]: ${t}`);
}
class g0 {
  constructor() {
    this.elementZIndex = /* @__PURE__ */ new Map(), this.nextZIndex = 2e3;
  }
  get elementCount() {
    return this.elementZIndex.size;
  }
  ensureZIndex(t, n) {
    const { elementZIndex: o } = this;
    if (n !== void 0) {
      t.style.zIndex = `${n}`, o.delete(t);
      return;
    }
    const { nextZIndex: r } = this;
    o.has(t) && o.get(t) + 1 === this.nextZIndex || (t.style.zIndex = `${r}`, o.set(t, r), this.nextZIndex = r + 1, this.squashState());
  }
  unregister(t, n) {
    const { elementZIndex: o } = this;
    o.has(t) ? o.delete(t) : n === void 0 && v0("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
  }
  squashState() {
    const { elementCount: t } = this;
    t || (this.nextZIndex = 2e3), this.nextZIndex - t > 2500 && this.rearrange();
  }
  rearrange() {
    const t = Array.from(this.elementZIndex.entries());
    t.sort((n, o) => n[1] - o[1]), this.nextZIndex = 2e3, t.forEach((n) => {
      const o = n[0], r = this.nextZIndex++;
      `${r}` !== o.style.zIndex && (o.style.zIndex = `${r}`);
    });
  }
}
const vl = new g0(), Ko = "@@ziContext", ip = {
  mounted(e, t) {
    const { value: n = {} } = t, { zIndex: o, enabled: r } = n;
    e[Ko] = {
      enabled: !!r,
      initialized: !1
    }, r && (vl.ensureZIndex(e, o), e[Ko].initialized = !0);
  },
  updated(e, t) {
    const { value: n = {} } = t, { zIndex: o, enabled: r } = n, i = e[Ko].enabled;
    r && !i && (vl.ensureZIndex(e, o), e[Ko].initialized = !0), e[Ko].enabled = !!r;
  },
  unmounted(e, t) {
    if (!e[Ko].initialized)
      return;
    const { value: n = {} } = t, { zIndex: o } = n;
    vl.unregister(e, o);
  }
}, m0 = window.Vue.inject, b0 = "@css-render/vue3-ssr";
function w0(e, t) {
  return `<style cssr-id="${e}">
${t}
</style>`;
}
function y0(e, t, n) {
  const { styles: o, ids: r } = n;
  r.has(e) || o !== null && (r.add(e), o.push(w0(e, t)));
}
const x0 = typeof document < "u";
function Vo() {
  if (x0)
    return;
  const e = m0(b0, null);
  if (e !== null)
    return {
      adapter: (t, n) => y0(t, n, e),
      context: e
    };
}
function Rc(e, t) {
  console.error(`[vueuc/${e}]: ${t}`);
}
const { c: co } = Wh(), pd = "vueuc-style";
function kc(e) {
  return e & -e;
}
class ap {
  /**
   * @param l length of the array
   * @param min min value of the array
   */
  constructor(t, n) {
    this.l = t, this.min = n;
    const o = new Array(t + 1);
    for (let r = 0; r < t + 1; ++r)
      o[r] = 0;
    this.ft = o;
  }
  /**
   * Add arr[i] by n, start from 0
   * @param i the index of the element to be added
   * @param n the value to be added
   */
  add(t, n) {
    if (n === 0)
      return;
    const { l: o, ft: r } = this;
    for (t += 1; t <= o; )
      r[t] += n, t += kc(t);
  }
  /**
   * Get the value of index i
   * @param i index
   * @returns value of the index
   */
  get(t) {
    return this.sum(t + 1) - this.sum(t);
  }
  /**
   * Get the sum of first i elements
   * @param i count of head elements to be added
   * @returns the sum of first i elements
   */
  sum(t) {
    if (t === void 0 && (t = this.l), t <= 0)
      return 0;
    const { ft: n, min: o, l: r } = this;
    if (t > r)
      throw new Error("[FinweckTree.sum]: `i` is larger than length.");
    let i = t * o;
    for (; t > 0; )
      i += n[t], t -= kc(t);
    return i;
  }
  /**
   * Get the largest count of head elements whose sum are <= threshold
   * @param threshold
   * @returns the largest count of head elements whose sum are <= threshold
   */
  getBound(t) {
    let n = 0, o = this.l;
    for (; o > n; ) {
      const r = Math.floor((n + o) / 2), i = this.sum(r);
      if (i > t) {
        o = r;
        continue;
      } else if (i < t) {
        if (n === r)
          return this.sum(n + 1) <= t ? n + 1 : r;
        n = r;
      } else
        return r;
    }
    return n;
  }
}
function Pc(e) {
  return typeof e == "string" ? document.querySelector(e) : e() || null;
}
const C0 = window.Vue.Teleport, S0 = window.Vue.h, $0 = window.Vue.toRef, R0 = window.Vue.computed, k0 = window.Vue.defineComponent, P0 = k0({
  name: "LazyTeleport",
  props: {
    to: {
      type: [String, Object],
      default: void 0
    },
    disabled: Boolean,
    show: {
      type: Boolean,
      required: !0
    }
  },
  setup(e) {
    return {
      showTeleport: uw($0(e, "show")),
      mergedTo: R0(() => {
        const { to: t } = e;
        return t ?? "body";
      })
    };
  },
  render() {
    return this.showTeleport ? this.disabled ? _s("lazy-teleport", this.$slots) : S0(C0, {
      disabled: this.disabled,
      to: this.mergedTo
    }, _s("lazy-teleport", this.$slots)) : null;
  }
}), Pi = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, _c = {
  start: "end",
  center: "center",
  end: "start"
}, gl = {
  top: "height",
  bottom: "height",
  left: "width",
  right: "width"
}, _0 = {
  "bottom-start": "top left",
  bottom: "top center",
  "bottom-end": "top right",
  "top-start": "bottom left",
  top: "bottom center",
  "top-end": "bottom right",
  "right-start": "top left",
  right: "center left",
  "right-end": "bottom left",
  "left-start": "top right",
  left: "center right",
  "left-end": "bottom right"
}, T0 = {
  "bottom-start": "bottom left",
  bottom: "bottom center",
  "bottom-end": "bottom right",
  "top-start": "top left",
  top: "top center",
  "top-end": "top right",
  "right-start": "top right",
  right: "center right",
  "right-end": "bottom right",
  "left-start": "top left",
  left: "center left",
  "left-end": "bottom left"
}, F0 = {
  "bottom-start": "right",
  "bottom-end": "left",
  "top-start": "right",
  "top-end": "left",
  "right-start": "bottom",
  "right-end": "top",
  "left-start": "bottom",
  "left-end": "top"
}, Tc = {
  top: !0,
  // top++
  bottom: !1,
  // top--
  left: !0,
  // left++
  right: !1
  // left--
}, Fc = {
  top: "end",
  bottom: "start",
  left: "end",
  right: "start"
};
function E0(e, t, n, o, r, i) {
  if (!r || i)
    return { placement: e, top: 0, left: 0 };
  const [l, a] = e.split("-");
  let s = a ?? "center", d = {
    top: 0,
    left: 0
  };
  const c = (g, f, v) => {
    let m = 0, u = 0;
    const w = n[g] - t[f] - t[g];
    return w > 0 && o && (v ? u = Tc[f] ? w : -w : m = Tc[f] ? w : -w), {
      left: m,
      top: u
    };
  }, h = l === "left" || l === "right";
  if (s !== "center") {
    const g = F0[e], f = Pi[g], v = gl[g];
    if (n[v] > t[v]) {
      if (
        // current space is not enough
        // ----------[ target ]---------|
        // -------[     follower        ]
        t[g] + t[v] < n[v]
      ) {
        const m = (n[v] - t[v]) / 2;
        t[g] < m || t[f] < m ? t[g] < t[f] ? (s = _c[a], d = c(v, f, h)) : d = c(v, g, h) : s = "center";
      }
    } else n[v] < t[v] && t[f] < 0 && // opposite align has larger space
    // ------------[   target   ]
    // ----------------[follower]
    t[g] > t[f] && (s = _c[a]);
  } else {
    const g = l === "bottom" || l === "top" ? "left" : "top", f = Pi[g], v = gl[g], m = (n[v] - t[v]) / 2;
    // center is not enough
    // ----------- [ target ]--|
    // -------[     follower     ]
    (t[g] < m || t[f] < m) && (t[g] > t[f] ? (s = Fc[g], d = c(v, g, h)) : (s = Fc[f], d = c(v, f, h)));
  }
  let p = l;
  return (
    // space is not enough
    t[l] < n[gl[l]] && // opposite position's space is larger
    t[l] < t[Pi[l]] && (p = Pi[l]), {
      placement: s !== "center" ? `${p}-${s}` : p,
      left: d.left,
      top: d.top
    }
  );
}
function z0(e, t) {
  return t ? T0[e] : _0[e];
}
function O0(e, t, n, o, r, i) {
  if (i)
    switch (e) {
      case "bottom-start":
        return {
          top: `${Math.round(n.top - t.top + n.height)}px`,
          left: `${Math.round(n.left - t.left)}px`,
          transform: "translateY(-100%)"
        };
      case "bottom-end":
        return {
          top: `${Math.round(n.top - t.top + n.height)}px`,
          left: `${Math.round(n.left - t.left + n.width)}px`,
          transform: "translateX(-100%) translateY(-100%)"
        };
      case "top-start":
        return {
          top: `${Math.round(n.top - t.top)}px`,
          left: `${Math.round(n.left - t.left)}px`,
          transform: ""
        };
      case "top-end":
        return {
          top: `${Math.round(n.top - t.top)}px`,
          left: `${Math.round(n.left - t.left + n.width)}px`,
          transform: "translateX(-100%)"
        };
      case "right-start":
        return {
          top: `${Math.round(n.top - t.top)}px`,
          left: `${Math.round(n.left - t.left + n.width)}px`,
          transform: "translateX(-100%)"
        };
      case "right-end":
        return {
          top: `${Math.round(n.top - t.top + n.height)}px`,
          left: `${Math.round(n.left - t.left + n.width)}px`,
          transform: "translateX(-100%) translateY(-100%)"
        };
      case "left-start":
        return {
          top: `${Math.round(n.top - t.top)}px`,
          left: `${Math.round(n.left - t.left)}px`,
          transform: ""
        };
      case "left-end":
        return {
          top: `${Math.round(n.top - t.top + n.height)}px`,
          left: `${Math.round(n.left - t.left)}px`,
          transform: "translateY(-100%)"
        };
      case "top":
        return {
          top: `${Math.round(n.top - t.top)}px`,
          left: `${Math.round(n.left - t.left + n.width / 2)}px`,
          transform: "translateX(-50%)"
        };
      case "right":
        return {
          top: `${Math.round(n.top - t.top + n.height / 2)}px`,
          left: `${Math.round(n.left - t.left + n.width)}px`,
          transform: "translateX(-100%) translateY(-50%)"
        };
      case "left":
        return {
          top: `${Math.round(n.top - t.top + n.height / 2)}px`,
          left: `${Math.round(n.left - t.left)}px`,
          transform: "translateY(-50%)"
        };
      case "bottom":
      default:
        return {
          top: `${Math.round(n.top - t.top + n.height)}px`,
          left: `${Math.round(n.left - t.left + n.width / 2)}px`,
          transform: "translateX(-50%) translateY(-100%)"
        };
    }
  switch (e) {
    case "bottom-start":
      return {
        top: `${Math.round(n.top - t.top + n.height + o)}px`,
        left: `${Math.round(n.left - t.left + r)}px`,
        transform: ""
      };
    case "bottom-end":
      return {
        top: `${Math.round(n.top - t.top + n.height + o)}px`,
        left: `${Math.round(n.left - t.left + n.width + r)}px`,
        transform: "translateX(-100%)"
      };
    case "top-start":
      return {
        top: `${Math.round(n.top - t.top + o)}px`,
        left: `${Math.round(n.left - t.left + r)}px`,
        transform: "translateY(-100%)"
      };
    case "top-end":
      return {
        top: `${Math.round(n.top - t.top + o)}px`,
        left: `${Math.round(n.left - t.left + n.width + r)}px`,
        transform: "translateX(-100%) translateY(-100%)"
      };
    case "right-start":
      return {
        top: `${Math.round(n.top - t.top + o)}px`,
        left: `${Math.round(n.left - t.left + n.width + r)}px`,
        transform: ""
      };
    case "right-end":
      return {
        top: `${Math.round(n.top - t.top + n.height + o)}px`,
        left: `${Math.round(n.left - t.left + n.width + r)}px`,
        transform: "translateY(-100%)"
      };
    case "left-start":
      return {
        top: `${Math.round(n.top - t.top + o)}px`,
        left: `${Math.round(n.left - t.left + r)}px`,
        transform: "translateX(-100%)"
      };
    case "left-end":
      return {
        top: `${Math.round(n.top - t.top + n.height + o)}px`,
        left: `${Math.round(n.left - t.left + r)}px`,
        transform: "translateX(-100%) translateY(-100%)"
      };
    case "top":
      return {
        top: `${Math.round(n.top - t.top + o)}px`,
        left: `${Math.round(n.left - t.left + n.width / 2 + r)}px`,
        transform: "translateY(-100%) translateX(-50%)"
      };
    case "right":
      return {
        top: `${Math.round(n.top - t.top + n.height / 2 + o)}px`,
        left: `${Math.round(n.left - t.left + n.width + r)}px`,
        transform: "translateY(-50%)"
      };
    case "left":
      return {
        top: `${Math.round(n.top - t.top + n.height / 2 + o)}px`,
        left: `${Math.round(n.left - t.left + r)}px`,
        transform: "translateY(-50%) translateX(-100%)"
      };
    case "bottom":
    default:
      return {
        top: `${Math.round(n.top - t.top + n.height + o)}px`,
        left: `${Math.round(n.left - t.left + n.width / 2 + r)}px`,
        transform: "translateX(-50%)"
      };
  }
}
const ml = window.Vue.h, M0 = window.Vue.defineComponent, I0 = window.Vue.inject, A0 = window.Vue.nextTick, _i = window.Vue.watch, bl = window.Vue.toRef, Ec = window.Vue.ref, V0 = window.Vue.onMounted, B0 = window.Vue.onBeforeUnmount, L0 = window.Vue.withDirectives, D0 = co([
  co(".v-binder-follower-container", {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    height: "0",
    pointerEvents: "none",
    zIndex: "auto"
  }),
  co(".v-binder-follower-content", {
    position: "absolute",
    zIndex: "auto"
  }, [
    co("> *", {
      pointerEvents: "all"
    })
  ])
]), vd = M0({
  name: "Follower",
  inheritAttrs: !1,
  props: {
    show: Boolean,
    enabled: {
      type: Boolean,
      default: void 0
    },
    placement: {
      type: String,
      default: "bottom"
    },
    syncTrigger: {
      type: Array,
      default: ["resize", "scroll"]
    },
    to: [String, Object],
    flip: {
      type: Boolean,
      default: !0
    },
    internalShift: Boolean,
    x: Number,
    y: Number,
    width: String,
    minWidth: String,
    containerClass: String,
    teleportDisabled: Boolean,
    zindexable: {
      type: Boolean,
      default: !0
    },
    zIndex: Number,
    overlap: Boolean
  },
  setup(e) {
    const t = I0("VBinder"), n = Me(() => e.enabled !== void 0 ? e.enabled : e.show), o = Ec(null), r = Ec(null), i = () => {
      const { syncTrigger: p } = e;
      p.includes("scroll") && t.addScrollListener(s), p.includes("resize") && t.addResizeListener(s);
    }, l = () => {
      t.removeScrollListener(s), t.removeResizeListener(s);
    };
    V0(() => {
      n.value && (s(), i());
    });
    const a = Vo();
    D0.mount({
      id: "vueuc/binder",
      head: !0,
      anchorMetaName: pd,
      ssr: a
    }), B0(() => {
      l();
    }), yw(() => {
      n.value && s();
    });
    const s = () => {
      if (!n.value)
        return;
      const p = o.value;
      if (p === null)
        return;
      const g = t.targetRef, { x: f, y: v, overlap: m } = e, u = f !== void 0 && v !== void 0 ? o0(f, v) : pl(g);
      p.style.setProperty("--v-target-width", `${Math.round(u.width)}px`), p.style.setProperty("--v-target-height", `${Math.round(u.height)}px`);
      const { width: w, minWidth: x, placement: b, internalShift: C, flip: S } = e;
      p.setAttribute("v-placement", b), m ? p.setAttribute("v-overlap", "") : p.removeAttribute("v-overlap");
      const { style: y } = p;
      w === "target" ? y.width = `${u.width}px` : w !== void 0 ? y.width = w : y.width = "", x === "target" ? y.minWidth = `${u.width}px` : x !== void 0 ? y.minWidth = x : y.minWidth = "";
      const T = pl(p), R = pl(r.value), { left: E, top: W, placement: _ } = E0(b, u, T, C, S, m), M = z0(_, m), { left: I, top: O, transform: K } = O0(_, R, u, W, E, m);
      p.setAttribute("v-placement", _), p.style.setProperty("--v-offset-left", `${Math.round(E)}px`), p.style.setProperty("--v-offset-top", `${Math.round(W)}px`), p.style.transform = `translateX(${I}) translateY(${O}) ${K}`, p.style.setProperty("--v-transform-origin", M), p.style.transformOrigin = M;
    };
    _i(n, (p) => {
      p ? (i(), d()) : l();
    });
    const d = () => {
      A0().then(s).catch((p) => console.error(p));
    };
    [
      "placement",
      "x",
      "y",
      "internalShift",
      "flip",
      "width",
      "overlap",
      "minWidth"
    ].forEach((p) => {
      _i(bl(e, p), s);
    }), ["teleportDisabled"].forEach((p) => {
      _i(bl(e, p), d);
    }), _i(bl(e, "syncTrigger"), (p) => {
      p.includes("resize") ? t.addResizeListener(s) : t.removeResizeListener(s), p.includes("scroll") ? t.addScrollListener(s) : t.removeScrollListener(s);
    });
    const c = Wa(), h = Me(() => {
      const { to: p } = e;
      if (p !== void 0)
        return p;
      c.value;
    });
    return {
      VBinder: t,
      mergedEnabled: n,
      offsetContainerRef: r,
      followerRef: o,
      mergedTo: h,
      syncPosition: s
    };
  },
  render() {
    return ml(P0, {
      show: this.show,
      to: this.mergedTo,
      disabled: this.teleportDisabled
    }, {
      default: () => {
        var e, t;
        const n = ml("div", {
          class: ["v-binder-follower-container", this.containerClass],
          ref: "offsetContainerRef"
        }, [
          ml("div", {
            class: "v-binder-follower-content",
            ref: "followerRef"
          }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e))
        ]);
        return this.zindexable ? L0(n, [
          [
            ip,
            {
              enabled: this.mergedEnabled,
              zIndex: this.zIndex
            }
          ]
        ]) : n;
      }
    });
  }
});
var zo = [], N0 = function() {
  return zo.some(function(e) {
    return e.activeTargets.length > 0;
  });
}, H0 = function() {
  return zo.some(function(e) {
    return e.skippedTargets.length > 0;
  });
}, zc = "ResizeObserver loop completed with undelivered notifications.", j0 = function() {
  var e;
  typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
    message: zc
  }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = zc), window.dispatchEvent(e);
}, li;
(function(e) {
  e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
})(li || (li = {}));
var Oo = function(e) {
  return Object.freeze(e);
}, W0 = /* @__PURE__ */ function() {
  function e(t, n) {
    this.inlineSize = t, this.blockSize = n, Oo(this);
  }
  return e;
}(), lp = function() {
  function e(t, n, o, r) {
    return this.x = t, this.y = n, this.width = o, this.height = r, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Oo(this);
  }
  return e.prototype.toJSON = function() {
    var t = this, n = t.x, o = t.y, r = t.top, i = t.right, l = t.bottom, a = t.left, s = t.width, d = t.height;
    return { x: n, y: o, top: r, right: i, bottom: l, left: a, width: s, height: d };
  }, e.fromRect = function(t) {
    return new e(t.x, t.y, t.width, t.height);
  }, e;
}(), gd = function(e) {
  return e instanceof SVGElement && "getBBox" in e;
}, sp = function(e) {
  if (gd(e)) {
    var t = e.getBBox(), n = t.width, o = t.height;
    return !n && !o;
  }
  var r = e, i = r.offsetWidth, l = r.offsetHeight;
  return !(i || l || e.getClientRects().length);
}, Oc = function(e) {
  var t;
  if (e instanceof Element)
    return !0;
  var n = (t = e == null ? void 0 : e.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
  return !!(n && e instanceof n.Element);
}, U0 = function(e) {
  switch (e.tagName) {
    case "INPUT":
      if (e.type !== "image")
        break;
    case "VIDEO":
    case "AUDIO":
    case "EMBED":
    case "OBJECT":
    case "CANVAS":
    case "IFRAME":
    case "IMG":
      return !0;
  }
  return !1;
}, qr = typeof window < "u" ? window : {}, Ti = /* @__PURE__ */ new WeakMap(), Mc = /auto|scroll/, K0 = /^tb|vertical/, q0 = /msie|trident/i.test(qr.navigator && qr.navigator.userAgent), Sn = function(e) {
  return parseFloat(e || "0");
}, ir = function(e, t, n) {
  return e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = !1), new W0((n ? t : e) || 0, (n ? e : t) || 0);
}, Ic = Oo({
  devicePixelContentBoxSize: ir(),
  borderBoxSize: ir(),
  contentBoxSize: ir(),
  contentRect: new lp(0, 0, 0, 0)
}), dp = function(e, t) {
  if (t === void 0 && (t = !1), Ti.has(e) && !t)
    return Ti.get(e);
  if (sp(e))
    return Ti.set(e, Ic), Ic;
  var n = getComputedStyle(e), o = gd(e) && e.ownerSVGElement && e.getBBox(), r = !q0 && n.boxSizing === "border-box", i = K0.test(n.writingMode || ""), l = !o && Mc.test(n.overflowY || ""), a = !o && Mc.test(n.overflowX || ""), s = o ? 0 : Sn(n.paddingTop), d = o ? 0 : Sn(n.paddingRight), c = o ? 0 : Sn(n.paddingBottom), h = o ? 0 : Sn(n.paddingLeft), p = o ? 0 : Sn(n.borderTopWidth), g = o ? 0 : Sn(n.borderRightWidth), f = o ? 0 : Sn(n.borderBottomWidth), v = o ? 0 : Sn(n.borderLeftWidth), m = h + d, u = s + c, w = v + g, x = p + f, b = a ? e.offsetHeight - x - e.clientHeight : 0, C = l ? e.offsetWidth - w - e.clientWidth : 0, S = r ? m + w : 0, y = r ? u + x : 0, T = o ? o.width : Sn(n.width) - S - C, R = o ? o.height : Sn(n.height) - y - b, E = T + m + C + w, W = R + u + b + x, _ = Oo({
    devicePixelContentBoxSize: ir(Math.round(T * devicePixelRatio), Math.round(R * devicePixelRatio), i),
    borderBoxSize: ir(E, W, i),
    contentBoxSize: ir(T, R, i),
    contentRect: new lp(h, s, T, R)
  });
  return Ti.set(e, _), _;
}, cp = function(e, t, n) {
  var o = dp(e, n), r = o.borderBoxSize, i = o.contentBoxSize, l = o.devicePixelContentBoxSize;
  switch (t) {
    case li.DEVICE_PIXEL_CONTENT_BOX:
      return l;
    case li.BORDER_BOX:
      return r;
    default:
      return i;
  }
}, G0 = /* @__PURE__ */ function() {
  function e(t) {
    var n = dp(t);
    this.target = t, this.contentRect = n.contentRect, this.borderBoxSize = Oo([n.borderBoxSize]), this.contentBoxSize = Oo([n.contentBoxSize]), this.devicePixelContentBoxSize = Oo([n.devicePixelContentBoxSize]);
  }
  return e;
}(), up = function(e) {
  if (sp(e))
    return 1 / 0;
  for (var t = 0, n = e.parentNode; n; )
    t += 1, n = n.parentNode;
  return t;
}, X0 = function() {
  var e = 1 / 0, t = [];
  zo.forEach(function(l) {
    if (l.activeTargets.length !== 0) {
      var a = [];
      l.activeTargets.forEach(function(d) {
        var c = new G0(d.target), h = up(d.target);
        a.push(c), d.lastReportedSize = cp(d.target, d.observedBox), h < e && (e = h);
      }), t.push(function() {
        l.callback.call(l.observer, a, l.observer);
      }), l.activeTargets.splice(0, l.activeTargets.length);
    }
  });
  for (var n = 0, o = t; n < o.length; n++) {
    var r = o[n];
    r();
  }
  return e;
}, Ac = function(e) {
  zo.forEach(function(n) {
    n.activeTargets.splice(0, n.activeTargets.length), n.skippedTargets.splice(0, n.skippedTargets.length), n.observationTargets.forEach(function(r) {
      r.isActive() && (up(r.target) > e ? n.activeTargets.push(r) : n.skippedTargets.push(r));
    });
  });
}, Y0 = function() {
  var e = 0;
  for (Ac(e); N0(); )
    e = X0(), Ac(e);
  return H0() && j0(), e > 0;
}, wl, fp = [], Z0 = function() {
  return fp.splice(0).forEach(function(e) {
    return e();
  });
}, J0 = function(e) {
  if (!wl) {
    var t = 0, n = document.createTextNode(""), o = { characterData: !0 };
    new MutationObserver(function() {
      return Z0();
    }).observe(n, o), wl = function() {
      n.textContent = "".concat(t ? t-- : t++);
    };
  }
  fp.push(e), wl();
}, Q0 = function(e) {
  J0(function() {
    requestAnimationFrame(e);
  });
}, Sa = 0, ey = function() {
  return !!Sa;
}, ty = 250, ny = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, Vc = [
  "resize",
  "load",
  "transitionend",
  "animationend",
  "animationstart",
  "animationiteration",
  "keyup",
  "keydown",
  "mouseup",
  "mousedown",
  "mouseover",
  "mouseout",
  "blur",
  "focus"
], Bc = function(e) {
  return e === void 0 && (e = 0), Date.now() + e;
}, yl = !1, oy = function() {
  function e() {
    var t = this;
    this.stopped = !0, this.listener = function() {
      return t.schedule();
    };
  }
  return e.prototype.run = function(t) {
    var n = this;
    if (t === void 0 && (t = ty), !yl) {
      yl = !0;
      var o = Bc(t);
      Q0(function() {
        var r = !1;
        try {
          r = Y0();
        } finally {
          if (yl = !1, t = o - Bc(), !ey())
            return;
          r ? n.run(1e3) : t > 0 ? n.run(t) : n.start();
        }
      });
    }
  }, e.prototype.schedule = function() {
    this.stop(), this.run();
  }, e.prototype.observe = function() {
    var t = this, n = function() {
      return t.observer && t.observer.observe(document.body, ny);
    };
    document.body ? n() : qr.addEventListener("DOMContentLoaded", n);
  }, e.prototype.start = function() {
    var t = this;
    this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), Vc.forEach(function(n) {
      return qr.addEventListener(n, t.listener, !0);
    }));
  }, e.prototype.stop = function() {
    var t = this;
    this.stopped || (this.observer && this.observer.disconnect(), Vc.forEach(function(n) {
      return qr.removeEventListener(n, t.listener, !0);
    }), this.stopped = !0);
  }, e;
}(), Fs = new oy(), Lc = function(e) {
  !Sa && e > 0 && Fs.start(), Sa += e, !Sa && Fs.stop();
}, ry = function(e) {
  return !gd(e) && !U0(e) && getComputedStyle(e).display === "inline";
}, iy = function() {
  function e(t, n) {
    this.target = t, this.observedBox = n || li.CONTENT_BOX, this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  return e.prototype.isActive = function() {
    var t = cp(this.target, this.observedBox, !0);
    return ry(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
  }, e;
}(), ay = /* @__PURE__ */ function() {
  function e(t, n) {
    this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = n;
  }
  return e;
}(), Fi = /* @__PURE__ */ new WeakMap(), Dc = function(e, t) {
  for (var n = 0; n < e.length; n += 1)
    if (e[n].target === t)
      return n;
  return -1;
}, Ei = function() {
  function e() {
  }
  return e.connect = function(t, n) {
    var o = new ay(t, n);
    Fi.set(t, o);
  }, e.observe = function(t, n, o) {
    var r = Fi.get(t), i = r.observationTargets.length === 0;
    Dc(r.observationTargets, n) < 0 && (i && zo.push(r), r.observationTargets.push(new iy(n, o && o.box)), Lc(1), Fs.schedule());
  }, e.unobserve = function(t, n) {
    var o = Fi.get(t), r = Dc(o.observationTargets, n), i = o.observationTargets.length === 1;
    r >= 0 && (i && zo.splice(zo.indexOf(o), 1), o.observationTargets.splice(r, 1), Lc(-1));
  }, e.disconnect = function(t) {
    var n = this, o = Fi.get(t);
    o.observationTargets.slice().forEach(function(r) {
      return n.unobserve(t, r.target);
    }), o.activeTargets.splice(0, o.activeTargets.length);
  }, e;
}(), ly = function() {
  function e(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    if (typeof t != "function")
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    Ei.connect(this, t);
  }
  return e.prototype.observe = function(t, n) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!Oc(t))
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Ei.observe(this, t, n);
  }, e.prototype.unobserve = function(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!Oc(t))
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Ei.unobserve(this, t);
  }, e.prototype.disconnect = function() {
    Ei.disconnect(this);
  }, e.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  }, e;
}();
class sy {
  constructor() {
    this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || ly)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
  }
  handleResize(t) {
    for (const n of t) {
      const o = this.elHandlersMap.get(n.target);
      o !== void 0 && o(n);
    }
  }
  registerHandler(t, n) {
    this.elHandlersMap.set(t, n), this.observer.observe(t);
  }
  unregisterHandler(t) {
    this.elHandlersMap.has(t) && (this.elHandlersMap.delete(t), this.observer.unobserve(t));
  }
}
const Gr = new sy(), dy = window.Vue.defineComponent, cy = window.Vue.renderSlot, uy = window.Vue.getCurrentInstance, fy = window.Vue.onMounted, hy = window.Vue.onBeforeUnmount, Mo = dy({
  name: "ResizeObserver",
  props: {
    onResize: Function
  },
  setup(e) {
    let t = !1;
    const n = uy().proxy;
    function o(r) {
      const { onResize: i } = e;
      i !== void 0 && i(r);
    }
    fy(() => {
      const r = n.$el;
      if (r === void 0) {
        Rc("resize-observer", "$el does not exist.");
        return;
      }
      if (r.nextElementSibling !== r.nextSibling && r.nodeType === 3 && r.nodeValue !== "") {
        Rc("resize-observer", "$el can not be observed (it may be a text node).");
        return;
      }
      r.nextElementSibling !== null && (Gr.registerHandler(r.nextElementSibling, o), t = !0);
    }), hy(() => {
      t && Gr.unregisterHandler(n.$el.nextElementSibling);
    });
  },
  render() {
    return cy(this.$slots, "default");
  }
});
let zi;
function py() {
  return typeof document > "u" ? !1 : (zi === void 0 && ("matchMedia" in window ? zi = window.matchMedia("(pointer:coarse)").matches : zi = !1), zi);
}
let xl;
function Nc() {
  return typeof document > "u" ? 1 : (xl === void 0 && (xl = "chrome" in window ? window.devicePixelRatio : 1), xl);
}
const hp = "VVirtualListXScroll", vy = window.Vue.computed, gy = window.Vue.provide, Hc = window.Vue.ref;
function my({ columnsRef: e, renderColRef: t, renderItemWithColsRef: n }) {
  const o = Hc(0), r = Hc(0), i = vy(() => {
    const d = e.value;
    if (d.length === 0)
      return null;
    const c = new ap(d.length, 0);
    return d.forEach((h, p) => {
      c.add(p, h.width);
    }), c;
  }), l = Me(() => {
    const d = i.value;
    return d !== null ? Math.max(d.getBound(r.value) - 1, 0) : 0;
  }), a = (d) => {
    const c = i.value;
    return c !== null ? c.sum(d) : 0;
  }, s = Me(() => {
    const d = i.value;
    return d !== null ? Math.min(d.getBound(r.value + o.value) + 1, e.value.length - 1) : 0;
  });
  return gy(hp, {
    startIndexRef: l,
    endIndexRef: s,
    columnsRef: e,
    renderColRef: t,
    renderItemWithColsRef: n,
    getLeft: a
  }), {
    listWidthRef: o,
    scrollLeftRef: r
  };
}
const by = window.Vue.defineComponent, wy = window.Vue.inject, jc = by({
  name: "VirtualListRow",
  props: {
    index: { type: Number, required: !0 },
    item: {
      type: Object,
      required: !0
    }
  },
  setup() {
    const { startIndexRef: e, endIndexRef: t, columnsRef: n, getLeft: o, renderColRef: r, renderItemWithColsRef: i } = (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      wy(hp)
    );
    return {
      startIndex: e,
      endIndex: t,
      columns: n,
      renderCol: r,
      renderItemWithCols: i,
      getLeft: o
    };
  },
  render() {
    const { startIndex: e, endIndex: t, columns: n, renderCol: o, renderItemWithCols: r, getLeft: i, item: l } = this;
    if (r != null)
      return r({
        itemIndex: this.index,
        startColIndex: e,
        endColIndex: t,
        allColumns: n,
        item: l,
        getLeft: i
      });
    if (o != null) {
      const a = [];
      for (let s = e; s <= t; ++s) {
        const d = n[s];
        a.push(o({ column: d, left: i(s), item: l }));
      }
      return a;
    }
    return null;
  }
}), yy = window.Vue.mergeProps, _r = window.Vue.computed, xy = window.Vue.defineComponent, Tr = window.Vue.ref, Cy = window.Vue.onMounted, yo = window.Vue.h, Sy = window.Vue.onActivated, $y = window.Vue.onDeactivated, Cl = window.Vue.toRef, Ry = co(".v-vl", {
  maxHeight: "inherit",
  height: "100%",
  overflow: "auto",
  minWidth: "1px"
  // a zero width container won't be scrollable
}, [
  co("&:not(.v-vl--show-scrollbar)", {
    scrollbarWidth: "none"
  }, [
    co("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", {
      width: 0,
      height: 0,
      display: "none"
    })
  ])
]), md = xy({
  name: "VirtualList",
  inheritAttrs: !1,
  props: {
    showScrollbar: {
      type: Boolean,
      default: !0
    },
    columns: {
      type: Array,
      default: () => []
    },
    renderCol: Function,
    renderItemWithCols: Function,
    items: {
      type: Array,
      default: () => []
    },
    // it is suppose to be the min height
    itemSize: {
      type: Number,
      required: !0
    },
    itemResizable: Boolean,
    itemsStyle: [String, Object],
    visibleItemsTag: {
      type: [String, Object],
      default: "div"
    },
    visibleItemsProps: Object,
    ignoreItemResize: Boolean,
    onScroll: Function,
    onWheel: Function,
    onResize: Function,
    defaultScrollKey: [Number, String],
    defaultScrollIndex: Number,
    keyField: {
      type: String,
      default: "key"
    },
    // Whether it is a good API?
    // ResizeObserver + footer & header is not enough.
    // Too complex for simple case
    paddingTop: {
      type: [Number, String],
      default: 0
    },
    paddingBottom: {
      type: [Number, String],
      default: 0
    }
  },
  setup(e) {
    const t = Vo();
    Ry.mount({
      id: "vueuc/virtual-list",
      head: !0,
      anchorMetaName: pd,
      ssr: t
    }), Cy(() => {
      const { defaultScrollIndex: M, defaultScrollKey: I } = e;
      M != null ? m({ index: M }) : I != null && m({ key: I });
    });
    let n = !1, o = !1;
    Sy(() => {
      if (n = !1, !o) {
        o = !0;
        return;
      }
      m({ top: g.value, left: l.value });
    }), $y(() => {
      n = !0, o || (o = !0);
    });
    const r = Me(() => {
      if (e.renderCol == null && e.renderItemWithCols == null || e.columns.length === 0)
        return;
      let M = 0;
      return e.columns.forEach((I) => {
        M += I.width;
      }), M;
    }), i = _r(() => {
      const M = /* @__PURE__ */ new Map(), { keyField: I } = e;
      return e.items.forEach((O, K) => {
        M.set(O[I], K);
      }), M;
    }), { scrollLeftRef: l, listWidthRef: a } = my({
      columnsRef: Cl(e, "columns"),
      renderColRef: Cl(e, "renderCol"),
      renderItemWithColsRef: Cl(e, "renderItemWithCols")
    }), s = Tr(null), d = Tr(void 0), c = /* @__PURE__ */ new Map(), h = _r(() => {
      const { items: M, itemSize: I, keyField: O } = e, K = new ap(M.length, I);
      return M.forEach((L, Y) => {
        const Q = L[O], J = c.get(Q);
        J !== void 0 && K.add(Y, J);
      }), K;
    }), p = Tr(0), g = Tr(0), f = Me(() => Math.max(h.value.getBound(g.value - Rt(e.paddingTop)) - 1, 0)), v = _r(() => {
      const { value: M } = d;
      if (M === void 0)
        return [];
      const { items: I, itemSize: O } = e, K = f.value, L = Math.min(K + Math.ceil(M / O + 1), I.length - 1), Y = [];
      for (let Q = K; Q <= L; ++Q)
        Y.push(I[Q]);
      return Y;
    }), m = (M, I) => {
      if (typeof M == "number") {
        b(M, I, "auto");
        return;
      }
      const { left: O, top: K, index: L, key: Y, position: Q, behavior: J, debounce: q = !0 } = M;
      if (O !== void 0 || K !== void 0)
        b(O, K, J);
      else if (L !== void 0)
        x(L, J, q);
      else if (Y !== void 0) {
        const A = i.value.get(Y);
        A !== void 0 && x(A, J, q);
      } else Q === "bottom" ? b(0, Number.MAX_SAFE_INTEGER, J) : Q === "top" && b(0, 0, J);
    };
    let u, w = null;
    function x(M, I, O) {
      const { value: K } = h, L = K.sum(M) + Rt(e.paddingTop);
      if (!O)
        s.value.scrollTo({
          left: 0,
          top: L,
          behavior: I
        });
      else {
        u = M, w !== null && window.clearTimeout(w), w = window.setTimeout(() => {
          u = void 0, w = null;
        }, 16);
        const { scrollTop: Y, offsetHeight: Q } = s.value;
        if (L > Y) {
          const J = K.get(M);
          L + J <= Y + Q || s.value.scrollTo({
            left: 0,
            top: L + J - Q,
            behavior: I
          });
        } else
          s.value.scrollTo({
            left: 0,
            top: L,
            behavior: I
          });
      }
    }
    function b(M, I, O) {
      s.value.scrollTo({
        left: M,
        top: I,
        behavior: O
      });
    }
    function C(M, I) {
      var O, K, L;
      if (n || e.ignoreItemResize || _(I.target))
        return;
      const { value: Y } = h, Q = i.value.get(M), J = Y.get(Q), q = (L = (K = (O = I.borderBoxSize) === null || O === void 0 ? void 0 : O[0]) === null || K === void 0 ? void 0 : K.blockSize) !== null && L !== void 0 ? L : I.contentRect.height;
      if (q === J)
        return;
      q - e.itemSize === 0 ? c.delete(M) : c.set(M, q - e.itemSize);
      const G = q - J;
      if (G === 0)
        return;
      Y.add(Q, G);
      const Z = s.value;
      if (Z != null) {
        if (u === void 0) {
          const ae = Y.sum(Q);
          Z.scrollTop > ae && Z.scrollBy(0, G);
        } else if (Q < u)
          Z.scrollBy(0, G);
        else if (Q === u) {
          const ae = Y.sum(Q);
          q + ae > // Note, listEl shouldn't have border, nor offsetHeight won't be
          // correct
          Z.scrollTop + Z.offsetHeight && Z.scrollBy(0, G);
        }
        W();
      }
      p.value++;
    }
    const S = !py();
    let y = !1;
    function T(M) {
      var I;
      (I = e.onScroll) === null || I === void 0 || I.call(e, M), (!S || !y) && W();
    }
    function R(M) {
      var I;
      if ((I = e.onWheel) === null || I === void 0 || I.call(e, M), S) {
        const O = s.value;
        if (O != null) {
          if (M.deltaX === 0 && (O.scrollTop === 0 && M.deltaY <= 0 || O.scrollTop + O.offsetHeight >= O.scrollHeight && M.deltaY >= 0))
            return;
          M.preventDefault(), O.scrollTop += M.deltaY / Nc(), O.scrollLeft += M.deltaX / Nc(), W(), y = !0, ri(() => {
            y = !1;
          });
        }
      }
    }
    function E(M) {
      if (n || _(M.target))
        return;
      if (e.renderCol == null && e.renderItemWithCols == null) {
        if (M.contentRect.height === d.value)
          return;
      } else if (M.contentRect.height === d.value && M.contentRect.width === a.value)
        return;
      d.value = M.contentRect.height, a.value = M.contentRect.width;
      const { onResize: I } = e;
      I !== void 0 && I(M);
    }
    function W() {
      const { value: M } = s;
      M != null && (g.value = M.scrollTop, l.value = M.scrollLeft);
    }
    function _(M) {
      let I = M;
      for (; I !== null; ) {
        if (I.style.display === "none")
          return !0;
        I = I.parentElement;
      }
      return !1;
    }
    return {
      listHeight: d,
      listStyle: {
        overflow: "auto"
      },
      keyToIndex: i,
      itemsStyle: _r(() => {
        const { itemResizable: M } = e, I = lt(h.value.sum());
        return p.value, [
          e.itemsStyle,
          {
            boxSizing: "content-box",
            width: lt(r.value),
            height: M ? "" : I,
            minHeight: M ? I : "",
            paddingTop: lt(e.paddingTop),
            paddingBottom: lt(e.paddingBottom)
          }
        ];
      }),
      visibleItemsStyle: _r(() => (p.value, {
        transform: `translateY(${lt(h.value.sum(f.value))})`
      })),
      viewportItems: v,
      listElRef: s,
      itemsElRef: Tr(null),
      scrollTo: m,
      handleListResize: E,
      handleListScroll: T,
      handleListWheel: R,
      handleItemResize: C
    };
  },
  render() {
    const { itemResizable: e, keyField: t, keyToIndex: n, visibleItemsTag: o } = this;
    return yo(Mo, {
      onResize: this.handleListResize
    }, {
      default: () => {
        var r, i;
        return yo("div", yy(this.$attrs, {
          class: ["v-vl", this.showScrollbar && "v-vl--show-scrollbar"],
          onScroll: this.handleListScroll,
          onWheel: this.handleListWheel,
          ref: "listElRef"
        }), [
          this.items.length !== 0 ? yo("div", {
            ref: "itemsElRef",
            class: "v-vl-items",
            style: this.itemsStyle
          }, [
            yo(o, Object.assign({
              class: "v-vl-visible-items",
              style: this.visibleItemsStyle
            }, this.visibleItemsProps), {
              default: () => {
                const { renderCol: l, renderItemWithCols: a } = this;
                return this.viewportItems.map((s) => {
                  const d = s[t], c = n.get(d), h = l != null ? yo(jc, {
                    index: c,
                    item: s
                  }) : void 0, p = a != null ? yo(jc, {
                    index: c,
                    item: s
                  }) : void 0, g = this.$slots.default({
                    item: s,
                    renderedCols: h,
                    renderedItemWithCols: p,
                    index: c
                  })[0];
                  return e ? yo(Mo, {
                    key: d,
                    onResize: (f) => this.handleItemResize(d, f)
                  }, {
                    default: () => g
                  }) : (g.key = d, g);
                });
              }
            })
          ]) : (i = (r = this.$slots).empty) === null || i === void 0 ? void 0 : i.call(r)
        ]);
      }
    });
  }
}), ky = window.Vue.defineComponent, Py = window.Vue.renderSlot, Wc = window.Vue.h, _y = window.Vue.onMounted, Uc = window.Vue.ref, Ty = window.Vue.nextTick, Bn = "v-hidden", Fy = co("[v-hidden]", {
  display: "none!important"
}), Kc = ky({
  name: "Overflow",
  props: {
    getCounter: Function,
    getTail: Function,
    updateCounter: Function,
    onUpdateCount: Function,
    onUpdateOverflow: Function
  },
  setup(e, { slots: t }) {
    const n = Uc(null), o = Uc(null);
    function r(l) {
      const { value: a } = n, { getCounter: s, getTail: d } = e;
      let c;
      if (s !== void 0 ? c = s() : c = o.value, !a || !c)
        return;
      c.hasAttribute(Bn) && c.removeAttribute(Bn);
      const { children: h } = a;
      if (l.showAllItemsBeforeCalculate)
        for (const x of h)
          x.hasAttribute(Bn) && x.removeAttribute(Bn);
      const p = a.offsetWidth, g = [], f = t.tail ? d == null ? void 0 : d() : null;
      let v = f ? f.offsetWidth : 0, m = !1;
      const u = a.children.length - (t.tail ? 1 : 0);
      for (let x = 0; x < u - 1; ++x) {
        if (x < 0)
          continue;
        const b = h[x];
        if (m) {
          b.hasAttribute(Bn) || b.setAttribute(Bn, "");
          continue;
        } else b.hasAttribute(Bn) && b.removeAttribute(Bn);
        const C = b.offsetWidth;
        if (v += C, g[x] = C, v > p) {
          const { updateCounter: S } = e;
          for (let y = x; y >= 0; --y) {
            const T = u - 1 - y;
            S !== void 0 ? S(T) : c.textContent = `${T}`;
            const R = c.offsetWidth;
            if (v -= g[y], v + R <= p || y === 0) {
              m = !0, x = y - 1, f && (x === -1 ? (f.style.maxWidth = `${p - R}px`, f.style.boxSizing = "border-box") : f.style.maxWidth = "");
              const { onUpdateCount: E } = e;
              E && E(T);
              break;
            }
          }
        }
      }
      const { onUpdateOverflow: w } = e;
      m ? w !== void 0 && w(!0) : (w !== void 0 && w(!1), c.setAttribute(Bn, ""));
    }
    const i = Vo();
    return Fy.mount({
      id: "vueuc/overflow",
      head: !0,
      anchorMetaName: pd,
      ssr: i
    }), _y(() => r({
      showAllItemsBeforeCalculate: !1
    })), {
      selfRef: n,
      counterRef: o,
      sync: r
    };
  },
  render() {
    const { $slots: e } = this;
    return Ty(() => this.sync({
      showAllItemsBeforeCalculate: !1
    })), Wc("div", {
      class: "v-overflow",
      ref: "selfRef"
    }, [
      Py(e, "default"),
      // $slots.counter should only has 1 element
      e.counter ? e.counter() : Wc("span", {
        style: {
          display: "inline-block"
        },
        ref: "counterRef"
      }),
      // $slots.tail should only has 1 element
      e.tail ? e.tail() : null
    ]);
  }
});
function pp(e) {
  return e instanceof HTMLElement;
}
function vp(e) {
  for (let t = 0; t < e.childNodes.length; t++) {
    const n = e.childNodes[t];
    if (pp(n) && (mp(n) || vp(n)))
      return !0;
  }
  return !1;
}
function gp(e) {
  for (let t = e.childNodes.length - 1; t >= 0; t--) {
    const n = e.childNodes[t];
    if (pp(n) && (mp(n) || gp(n)))
      return !0;
  }
  return !1;
}
function mp(e) {
  if (!Ey(e))
    return !1;
  try {
    e.focus({ preventScroll: !0 });
  } catch {
  }
  return document.activeElement === e;
}
function Ey(e) {
  if (e.tabIndex > 0 || e.tabIndex === 0 && e.getAttribute("tabIndex") !== null)
    return !0;
  if (e.getAttribute("disabled"))
    return !1;
  switch (e.nodeName) {
    case "A":
      return !!e.href && e.rel !== "ignore";
    case "INPUT":
      return e.type !== "hidden" && e.type !== "file";
    case "SELECT":
    case "TEXTAREA":
      return !0;
    default:
      return !1;
  }
}
const Sl = window.Vue.h, zy = window.Vue.defineComponent, qc = window.Vue.ref, Oy = window.Vue.Fragment, My = window.Vue.onMounted, Iy = window.Vue.onBeforeUnmount, Ay = window.Vue.watch;
let Fr = [];
const Vy = zy({
  name: "FocusTrap",
  props: {
    disabled: Boolean,
    active: Boolean,
    autoFocus: {
      type: Boolean,
      default: !0
    },
    onEsc: Function,
    initialFocusTo: [String, Function],
    finalFocusTo: [String, Function],
    returnFocusOnDeactivated: {
      type: Boolean,
      default: !0
    }
  },
  setup(e) {
    const t = ai(), n = qc(null), o = qc(null);
    let r = !1, i = !1;
    const l = typeof document > "u" ? null : document.activeElement;
    function a() {
      return Fr[Fr.length - 1] === t;
    }
    function s(m) {
      var u;
      m.code === "Escape" && a() && ((u = e.onEsc) === null || u === void 0 || u.call(e, m));
    }
    My(() => {
      Ay(() => e.active, (m) => {
        m ? (h(), st("keydown", document, s)) : (et("keydown", document, s), r && p());
      }, {
        immediate: !0
      });
    }), Iy(() => {
      et("keydown", document, s), r && p();
    });
    function d(m) {
      if (!i && a()) {
        const u = c();
        if (u === null || u.contains(ii(m)))
          return;
        g("first");
      }
    }
    function c() {
      const m = n.value;
      if (m === null)
        return null;
      let u = m;
      for (; u = u.nextSibling, !(u === null || u instanceof Element && u.tagName === "DIV"); )
        ;
      return u;
    }
    function h() {
      var m;
      if (!e.disabled) {
        if (Fr.push(t), e.autoFocus) {
          const { initialFocusTo: u } = e;
          u === void 0 ? g("first") : (m = Pc(u)) === null || m === void 0 || m.focus({ preventScroll: !0 });
        }
        r = !0, document.addEventListener("focus", d, !0);
      }
    }
    function p() {
      var m;
      if (e.disabled || (document.removeEventListener("focus", d, !0), Fr = Fr.filter((w) => w !== t), a()))
        return;
      const { finalFocusTo: u } = e;
      u !== void 0 ? (m = Pc(u)) === null || m === void 0 || m.focus({ preventScroll: !0 }) : e.returnFocusOnDeactivated && l instanceof HTMLElement && (i = !0, l.focus({ preventScroll: !0 }), i = !1);
    }
    function g(m) {
      if (a() && e.active) {
        const u = n.value, w = o.value;
        if (u !== null && w !== null) {
          const x = c();
          if (x == null || x === w) {
            i = !0, u.focus({ preventScroll: !0 }), i = !1;
            return;
          }
          i = !0;
          const b = m === "first" ? vp(x) : gp(x);
          i = !1, b || (i = !0, u.focus({ preventScroll: !0 }), i = !1);
        }
      }
    }
    function f(m) {
      if (i)
        return;
      const u = c();
      u !== null && (m.relatedTarget !== null && u.contains(m.relatedTarget) ? g("last") : g("first"));
    }
    function v(m) {
      i || (m.relatedTarget !== null && m.relatedTarget === n.value ? g("last") : g("first"));
    }
    return {
      focusableStartRef: n,
      focusableEndRef: o,
      focusableStyle: "position: absolute; height: 0; width: 0;",
      handleStartFocus: f,
      handleEndFocus: v
    };
  },
  render() {
    const { default: e } = this.$slots;
    if (e === void 0)
      return null;
    if (this.disabled)
      return e();
    const { active: t, focusableStyle: n } = this;
    return Sl(Oy, null, [
      Sl("div", {
        "aria-hidden": "true",
        tabindex: t ? "0" : "-1",
        ref: "focusableStartRef",
        style: n,
        onFocus: this.handleStartFocus
      }),
      e(),
      Sl("div", {
        "aria-hidden": "true",
        style: n,
        ref: "focusableEndRef",
        tabindex: t ? "0" : "-1",
        onFocus: this.handleEndFocus
      })
    ]);
  }
}), By = window.Vue.onBeforeUnmount, Ly = window.Vue.onMounted, Dy = window.Vue.watch;
function bp(e, t) {
  t && (Ly(() => {
    const {
      value: n
    } = e;
    n && Gr.registerHandler(n, t);
  }), Dy(e, (n, o) => {
    o && Gr.unregisterHandler(o);
  }, {
    deep: !1
  }), By(() => {
    const {
      value: n
    } = e;
    n && Gr.unregisterHandler(n);
  }));
}
function Ea(e) {
  return e.replace(/#|\(|\)|,|\s|\./g, "_");
}
const Ny = /^(\d|\.)+$/, Gc = /(\d|\.)+/;
function ft(e, {
  c: t = 1,
  offset: n = 0,
  attachPx: o = !0
} = {}) {
  if (typeof e == "number") {
    const r = (e + n) * t;
    return r === 0 ? "0" : `${r}px`;
  } else if (typeof e == "string")
    if (Ny.test(e)) {
      const r = (Number(e) + n) * t;
      return o ? r === 0 ? "0" : `${r}px` : `${r}`;
    } else {
      const r = Gc.exec(e);
      return r ? e.replace(Gc, String((Number(r[0]) + n) * t)) : e;
    }
  return e;
}
function Xc(e) {
  const {
    left: t,
    right: n,
    top: o,
    bottom: r
  } = en(e);
  return `${o} ${t} ${r} ${n}`;
}
function Hy(e, t) {
  if (!e) return;
  const n = document.createElement("a");
  n.href = e, t !== void 0 && (n.download = t), document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
let $l;
function jy() {
  return $l === void 0 && ($l = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), $l;
}
const Wy = /* @__PURE__ */ new WeakSet();
function Uy(e) {
  Wy.add(e);
}
function Yc(e) {
  switch (typeof e) {
    case "string":
      return e || void 0;
    case "number":
      return String(e);
    default:
      return;
  }
}
const Ky = {
  tiny: "mini",
  small: "tiny",
  medium: "small",
  large: "medium",
  huge: "large"
};
function Zc(e) {
  const t = Ky[e];
  if (t === void 0)
    throw new Error(`${e} has no smaller size.`);
  return t;
}
function ho(e, t) {
  console.error(`[naive/${e}]: ${t}`);
}
function qy(e, t) {
  throw new Error(`[naive/${e}]: ${t}`);
}
function ie(e, ...t) {
  if (Array.isArray(e))
    e.forEach((n) => ie(n, ...t));
  else
    return e(...t);
}
function wp(e) {
  return (t) => {
    t ? e.value = t.$el : e.value = null;
  };
}
const Gy = window.Vue.Comment, Xy = window.Vue.createTextVNode, Yy = window.Vue.Fragment;
function dr(e, t = !0, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(Xy(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        dr(o, t, n);
        return;
      }
      if (o.type === Yy) {
        if (o.children === null) return;
        Array.isArray(o.children) && dr(o.children, t, n);
      } else {
        if (o.type === Gy && t) return;
        n.push(o);
      }
    }
  }), n;
}
function Zy(e, t = "default", n = void 0) {
  const o = e[t];
  if (!o)
    return ho("getFirstSlotVNode", `slot[${t}] is empty`), null;
  const r = dr(o(n));
  return r.length === 1 ? r[0] : (ho("getFirstSlotVNode", `slot[${t}] should have exactly one child`), null);
}
function bd(e, t = "default", n = []) {
  const r = e.$slots[t];
  return r === void 0 ? n : r();
}
const Jy = window.Vue.vShow;
function Qy(e) {
  var t;
  const n = (t = e.dirs) === null || t === void 0 ? void 0 : t.find(({
    dir: o
  }) => o === Jy);
  return !!(n && n.value === !1);
}
function si(e, t = [], n) {
  const o = {};
  return t.forEach((r) => {
    o[r] = e[r];
  }), Object.assign(o, n);
}
function di(e) {
  return Object.keys(e);
}
function Xr(e) {
  const t = e.filter((n) => n !== void 0);
  if (t.length !== 0)
    return t.length === 1 ? t[0] : (n) => {
      e.forEach((o) => {
        o && o(n);
      });
    };
}
function yp(e, t = [], n) {
  const o = {};
  return Object.getOwnPropertyNames(e).forEach((i) => {
    t.includes(i) || (o[i] = e[i]);
  }), Object.assign(o, n);
}
const Jc = window.Vue.createTextVNode;
function _n(e, ...t) {
  return typeof e == "function" ? e(...t) : typeof e == "string" ? Jc(e) : typeof e == "number" ? Jc(String(e)) : null;
}
const ex = window.Vue.Comment, tx = window.Vue.Fragment, nx = window.Vue.isVNode;
function mn(e) {
  return e.some((t) => nx(t) ? !(t.type === ex || t.type === tx && !mn(t.children)) : !0) ? e : null;
}
function wn(e, t) {
  return e && mn(e()) || t();
}
function ox(e, t, n) {
  return e && mn(e(t)) || n(t);
}
function qe(e, t) {
  const n = e && mn(e());
  return t(n || null);
}
function ar(e) {
  return !(e && mn(e()));
}
const rx = window.Vue.defineComponent, Es = rx({
  render() {
    var e, t;
    return (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e);
  }
}), Kn = "n-config-provider", Qc = window.Vue.computed, xp = window.Vue.inject, Cp = window.Vue.shallowRef, Sp = "n";
function je(e = {}, t = {
  defaultBordered: !0
}) {
  const n = xp(Kn, null);
  return {
    // NConfigProvider,
    inlineThemeDisabled: n == null ? void 0 : n.inlineThemeDisabled,
    mergedRtlRef: n == null ? void 0 : n.mergedRtlRef,
    mergedComponentPropsRef: n == null ? void 0 : n.mergedComponentPropsRef,
    mergedBreakpointsRef: n == null ? void 0 : n.mergedBreakpointsRef,
    mergedBorderedRef: Qc(() => {
      var o, r;
      const {
        bordered: i
      } = e;
      return i !== void 0 ? i : (r = (o = n == null ? void 0 : n.mergedBorderedRef.value) !== null && o !== void 0 ? o : t.defaultBordered) !== null && r !== void 0 ? r : !0;
    }),
    mergedClsPrefixRef: n ? n.mergedClsPrefixRef : Cp(Sp),
    namespaceRef: Qc(() => n == null ? void 0 : n.mergedNamespaceRef.value)
  };
}
function $p() {
  const e = xp(Kn, null);
  return e ? e.mergedClsPrefixRef : Cp(Sp);
}
const ix = window.Vue.inject, ax = window.Vue.ref, lx = window.Vue.watchEffect;
function St(e, t, n, o) {
  n || qy("useThemeClass", "cssVarsRef is not passed");
  const r = ix(Kn, null), i = r == null ? void 0 : r.mergedThemeHashRef, l = r == null ? void 0 : r.styleMountTarget, a = ax(""), s = Vo();
  let d;
  const c = `__${e}`, h = () => {
    let p = c;
    const g = t ? t.value : void 0, f = i == null ? void 0 : i.value;
    f && (p += `-${f}`), g && (p += `-${g}`);
    const {
      themeOverrides: v,
      builtinThemeOverrides: m
    } = o;
    v && (p += `-${Pa(JSON.stringify(v))}`), m && (p += `-${Pa(JSON.stringify(m))}`), a.value = p, d = () => {
      const u = n.value;
      let w = "";
      for (const x in u)
        w += `${x}: ${u[x]};`;
      H(`.${p}`, w).mount({
        id: p,
        ssr: s,
        parent: l
      }), d = void 0;
    };
  };
  return lx(() => {
    h();
  }), {
    themeClass: a,
    onRender: () => {
      d == null || d();
    }
  };
}
const Rl = window.Vue.computed, sx = window.Vue.inject, dx = window.Vue.onBeforeUnmount, cx = window.Vue.provide, zs = "n-form-item";
function qn(e, {
  defaultSize: t = "medium",
  mergedSize: n,
  mergedDisabled: o
} = {}) {
  const r = sx(zs, null);
  cx(zs, null);
  const i = Rl(n ? () => n(r) : () => {
    const {
      size: s
    } = e;
    if (s) return s;
    if (r) {
      const {
        mergedSize: d
      } = r;
      if (d.value !== void 0)
        return d.value;
    }
    return t;
  }), l = Rl(o ? () => o(r) : () => {
    const {
      disabled: s
    } = e;
    return s !== void 0 ? s : r ? r.disabled.value : !1;
  }), a = Rl(() => {
    const {
      status: s
    } = e;
    return s || (r == null ? void 0 : r.mergedValidationStatus.value);
  });
  return dx(() => {
    r && r.restoreValidation();
  }), {
    mergedSizeRef: i,
    mergedDisabledRef: l,
    mergedStatusRef: a,
    nTriggerFormBlur() {
      r && r.handleContentBlur();
    },
    nTriggerFormChange() {
      r && r.handleContentChange();
    },
    nTriggerFormFocus() {
      r && r.handleContentFocus();
    },
    nTriggerFormInput() {
      r && r.handleContentInput();
    }
  };
}
const ux = {
  name: "en-US",
  global: {
    undo: "Undo",
    redo: "Redo",
    confirm: "Confirm",
    clear: "Clear"
  },
  Popconfirm: {
    positiveText: "Confirm",
    negativeText: "Cancel"
  },
  Cascader: {
    placeholder: "Please Select",
    loading: "Loading",
    loadingRequiredMessage: (e) => `Please load all ${e}'s descendants before checking it.`
  },
  Time: {
    dateFormat: "yyyy-MM-dd",
    dateTimeFormat: "yyyy-MM-dd HH:mm:ss"
  },
  DatePicker: {
    yearFormat: "yyyy",
    monthFormat: "MMM",
    dayFormat: "eeeeee",
    yearTypeFormat: "yyyy",
    monthTypeFormat: "yyyy-MM",
    dateFormat: "yyyy-MM-dd",
    dateTimeFormat: "yyyy-MM-dd HH:mm:ss",
    quarterFormat: "yyyy-qqq",
    weekFormat: "YYYY-w",
    clear: "Clear",
    now: "Now",
    confirm: "Confirm",
    selectTime: "Select Time",
    selectDate: "Select Date",
    datePlaceholder: "Select Date",
    datetimePlaceholder: "Select Date and Time",
    monthPlaceholder: "Select Month",
    yearPlaceholder: "Select Year",
    quarterPlaceholder: "Select Quarter",
    weekPlaceholder: "Select Week",
    startDatePlaceholder: "Start Date",
    endDatePlaceholder: "End Date",
    startDatetimePlaceholder: "Start Date and Time",
    endDatetimePlaceholder: "End Date and Time",
    startMonthPlaceholder: "Start Month",
    endMonthPlaceholder: "End Month",
    monthBeforeYear: !0,
    firstDayOfWeek: 6,
    today: "Today"
  },
  DataTable: {
    checkTableAll: "Select all in the table",
    uncheckTableAll: "Unselect all in the table",
    confirm: "Confirm",
    clear: "Clear"
  },
  LegacyTransfer: {
    sourceTitle: "Source",
    targetTitle: "Target"
  },
  Transfer: {
    selectAll: "Select all",
    unselectAll: "Unselect all",
    clearAll: "Clear",
    total: (e) => `Total ${e} items`,
    selected: (e) => `${e} items selected`
  },
  Empty: {
    description: "No Data"
  },
  Select: {
    placeholder: "Please Select"
  },
  TimePicker: {
    placeholder: "Select Time",
    positiveText: "OK",
    negativeText: "Cancel",
    now: "Now",
    clear: "Clear"
  },
  Pagination: {
    goto: "Goto",
    selectionSuffix: "page"
  },
  DynamicTags: {
    add: "Add"
  },
  Log: {
    loading: "Loading"
  },
  Input: {
    placeholder: "Please Input"
  },
  InputNumber: {
    placeholder: "Please Input"
  },
  DynamicInput: {
    create: "Create"
  },
  ThemeEditor: {
    title: "Theme Editor",
    clearAllVars: "Clear All Variables",
    clearSearch: "Clear Search",
    filterCompName: "Filter Component Name",
    filterVarName: "Filter Variable Name",
    import: "Import",
    export: "Export",
    restore: "Reset to Default"
  },
  Image: {
    tipPrevious: "Previous picture (←)",
    tipNext: "Next picture (→)",
    tipCounterclockwise: "Counterclockwise",
    tipClockwise: "Clockwise",
    tipZoomOut: "Zoom out",
    tipZoomIn: "Zoom in",
    tipDownload: "Download",
    tipClose: "Close (Esc)",
    // TODO: translation
    tipOriginalSize: "Zoom to original size"
  },
  Heatmap: {
    less: "less",
    more: "more",
    monthFormat: "MMM",
    weekdayFormat: "eee"
  }
};
function kl(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
function Er(e) {
  return (t, n) => {
    const o = n != null && n.context ? String(n.context) : "standalone";
    let r;
    if (o === "formatting" && e.formattingValues) {
      const l = e.defaultFormattingWidth || e.defaultWidth, a = n != null && n.width ? String(n.width) : l;
      r = e.formattingValues[a] || e.formattingValues[l];
    } else {
      const l = e.defaultWidth, a = n != null && n.width ? String(n.width) : e.defaultWidth;
      r = e.values[a] || e.values[l];
    }
    const i = e.argumentCallback ? e.argumentCallback(t) : t;
    return r[i];
  };
}
function zr(e) {
  return (t, n = {}) => {
    const o = n.width, r = o && e.matchPatterns[o] || e.matchPatterns[e.defaultMatchWidth], i = t.match(r);
    if (!i)
      return null;
    const l = i[0], a = o && e.parsePatterns[o] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(a) ? hx(a, (h) => h.test(l)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      fx(a, (h) => h.test(l))
    );
    let d;
    d = e.valueCallback ? e.valueCallback(s) : s, d = n.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      n.valueCallback(d)
    ) : d;
    const c = t.slice(l.length);
    return { value: d, rest: c };
  };
}
function fx(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function hx(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function px(e) {
  return (t, n = {}) => {
    const o = t.match(e.matchPattern);
    if (!o) return null;
    const r = o[0], i = t.match(e.parsePattern);
    if (!i) return null;
    let l = e.valueCallback ? e.valueCallback(i[0]) : i[0];
    l = n.valueCallback ? n.valueCallback(l) : l;
    const a = t.slice(r.length);
    return { value: l, rest: a };
  };
}
const vx = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, gx = (e, t, n) => {
  let o;
  const r = vx[e];
  return typeof r == "string" ? o = r : t === 1 ? o = r.one : o = r.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + o : o + " ago" : o;
}, mx = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, bx = (e, t, n, o) => mx[e], wx = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, yx = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, xx = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, Cx = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, Sx = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, $x = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, Rx = (e, t) => {
  const n = Number(e), o = n % 100;
  if (o > 20 || o < 10)
    switch (o % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, kx = {
  ordinalNumber: Rx,
  era: Er({
    values: wx,
    defaultWidth: "wide"
  }),
  quarter: Er({
    values: yx,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Er({
    values: xx,
    defaultWidth: "wide"
  }),
  day: Er({
    values: Cx,
    defaultWidth: "wide"
  }),
  dayPeriod: Er({
    values: Sx,
    defaultWidth: "wide",
    formattingValues: $x,
    defaultFormattingWidth: "wide"
  })
}, Px = /^(\d+)(th|st|nd|rd)?/i, _x = /\d+/i, Tx = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, Fx = {
  any: [/^b/i, /^(a|c)/i]
}, Ex = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, zx = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, Ox = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Mx = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, Ix = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Ax = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, Vx = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Bx = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Lx = {
  ordinalNumber: px({
    matchPattern: Px,
    parsePattern: _x,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: zr({
    matchPatterns: Tx,
    defaultMatchWidth: "wide",
    parsePatterns: Fx,
    defaultParseWidth: "any"
  }),
  quarter: zr({
    matchPatterns: Ex,
    defaultMatchWidth: "wide",
    parsePatterns: zx,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: zr({
    matchPatterns: Ox,
    defaultMatchWidth: "wide",
    parsePatterns: Mx,
    defaultParseWidth: "any"
  }),
  day: zr({
    matchPatterns: Ix,
    defaultMatchWidth: "wide",
    parsePatterns: Ax,
    defaultParseWidth: "any"
  }),
  dayPeriod: zr({
    matchPatterns: Vx,
    defaultMatchWidth: "any",
    parsePatterns: Bx,
    defaultParseWidth: "any"
  })
}, Dx = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Nx = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Hx = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, jx = {
  date: kl({
    formats: Dx,
    defaultWidth: "full"
  }),
  time: kl({
    formats: Nx,
    defaultWidth: "full"
  }),
  dateTime: kl({
    formats: Hx,
    defaultWidth: "full"
  })
}, Wx = {
  code: "en-US",
  formatDistance: gx,
  formatLong: jx,
  formatRelative: bx,
  localize: kx,
  match: Lx,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, Ux = {
  name: "en-US",
  locale: Wx
};
var Rp = typeof global == "object" && global && global.Object === Object && global, Kx = typeof self == "object" && self && self.Object === Object && self, Mn = Rp || Kx || Function("return this")(), po = Mn.Symbol, kp = Object.prototype, qx = kp.hasOwnProperty, Gx = kp.toString, Or = po ? po.toStringTag : void 0;
function Xx(e) {
  var t = qx.call(e, Or), n = e[Or];
  try {
    e[Or] = void 0;
    var o = !0;
  } catch {
  }
  var r = Gx.call(e);
  return o && (t ? e[Or] = n : delete e[Or]), r;
}
var Yx = Object.prototype, Zx = Yx.toString;
function Jx(e) {
  return Zx.call(e);
}
var Qx = "[object Null]", e1 = "[object Undefined]", eu = po ? po.toStringTag : void 0;
function Bo(e) {
  return e == null ? e === void 0 ? e1 : Qx : eu && eu in Object(e) ? Xx(e) : Jx(e);
}
function vo(e) {
  return e != null && typeof e == "object";
}
var t1 = "[object Symbol]";
function wd(e) {
  return typeof e == "symbol" || vo(e) && Bo(e) == t1;
}
function Pp(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = Array(o); ++n < o; )
    r[n] = t(e[n], n, e);
  return r;
}
var un = Array.isArray, tu = po ? po.prototype : void 0, nu = tu ? tu.toString : void 0;
function _p(e) {
  if (typeof e == "string")
    return e;
  if (un(e))
    return Pp(e, _p) + "";
  if (wd(e))
    return nu ? nu.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function bo(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function yd(e) {
  return e;
}
var n1 = "[object AsyncFunction]", o1 = "[object Function]", r1 = "[object GeneratorFunction]", i1 = "[object Proxy]";
function xd(e) {
  if (!bo(e))
    return !1;
  var t = Bo(e);
  return t == o1 || t == r1 || t == n1 || t == i1;
}
var Pl = Mn["__core-js_shared__"], ou = function() {
  var e = /[^.]+$/.exec(Pl && Pl.keys && Pl.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function a1(e) {
  return !!ou && ou in e;
}
var l1 = Function.prototype, s1 = l1.toString;
function Lo(e) {
  if (e != null) {
    try {
      return s1.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var d1 = /[\\^$.*+?()[\]{}|]/g, c1 = /^\[object .+?Constructor\]$/, u1 = Function.prototype, f1 = Object.prototype, h1 = u1.toString, p1 = f1.hasOwnProperty, v1 = RegExp(
  "^" + h1.call(p1).replace(d1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function g1(e) {
  if (!bo(e) || a1(e))
    return !1;
  var t = xd(e) ? v1 : c1;
  return t.test(Lo(e));
}
function m1(e, t) {
  return e == null ? void 0 : e[t];
}
function Do(e, t) {
  var n = m1(e, t);
  return g1(n) ? n : void 0;
}
var Os = Do(Mn, "WeakMap"), ru = Object.create, b1 = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!bo(t))
      return {};
    if (ru)
      return ru(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}();
function w1(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, n[0]);
    case 2:
      return e.call(t, n[0], n[1]);
    case 3:
      return e.call(t, n[0], n[1], n[2]);
  }
  return e.apply(t, n);
}
function y1(e, t) {
  var n = -1, o = e.length;
  for (t || (t = Array(o)); ++n < o; )
    t[n] = e[n];
  return t;
}
var x1 = 800, C1 = 16, S1 = Date.now;
function $1(e) {
  var t = 0, n = 0;
  return function() {
    var o = S1(), r = C1 - (o - n);
    if (n = o, r > 0) {
      if (++t >= x1)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function R1(e) {
  return function() {
    return e;
  };
}
var za = function() {
  try {
    var e = Do(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), k1 = za ? function(e, t) {
  return za(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: R1(t),
    writable: !0
  });
} : yd, P1 = $1(k1), _1 = 9007199254740991, T1 = /^(?:0|[1-9]\d*)$/;
function Cd(e, t) {
  var n = typeof e;
  return t = t ?? _1, !!t && (n == "number" || n != "symbol" && T1.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Sd(e, t, n) {
  t == "__proto__" && za ? za(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function vi(e, t) {
  return e === t || e !== e && t !== t;
}
var F1 = Object.prototype, E1 = F1.hasOwnProperty;
function z1(e, t, n) {
  var o = e[t];
  (!(E1.call(e, t) && vi(o, n)) || n === void 0 && !(t in e)) && Sd(e, t, n);
}
function O1(e, t, n, o) {
  var r = !n;
  n || (n = {});
  for (var i = -1, l = t.length; ++i < l; ) {
    var a = t[i], s = void 0;
    s === void 0 && (s = e[a]), r ? Sd(n, a, s) : z1(n, a, s);
  }
  return n;
}
var iu = Math.max;
function M1(e, t, n) {
  return t = iu(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var o = arguments, r = -1, i = iu(o.length - t, 0), l = Array(i); ++r < i; )
      l[r] = o[t + r];
    r = -1;
    for (var a = Array(t + 1); ++r < t; )
      a[r] = o[r];
    return a[t] = n(l), w1(e, this, a);
  };
}
function I1(e, t) {
  return P1(M1(e, t, yd), e + "");
}
var A1 = 9007199254740991;
function $d(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= A1;
}
function pr(e) {
  return e != null && $d(e.length) && !xd(e);
}
function V1(e, t, n) {
  if (!bo(n))
    return !1;
  var o = typeof t;
  return (o == "number" ? pr(n) && Cd(t, n.length) : o == "string" && t in n) ? vi(n[t], e) : !1;
}
function B1(e) {
  return I1(function(t, n) {
    var o = -1, r = n.length, i = r > 1 ? n[r - 1] : void 0, l = r > 2 ? n[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (r--, i) : void 0, l && V1(n[0], n[1], l) && (i = r < 3 ? void 0 : i, r = 1), t = Object(t); ++o < r; ) {
      var a = n[o];
      a && e(t, a, o, i);
    }
    return t;
  });
}
var L1 = Object.prototype;
function Rd(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || L1;
  return e === n;
}
function D1(e, t) {
  for (var n = -1, o = Array(e); ++n < e; )
    o[n] = t(n);
  return o;
}
var N1 = "[object Arguments]";
function au(e) {
  return vo(e) && Bo(e) == N1;
}
var Tp = Object.prototype, H1 = Tp.hasOwnProperty, j1 = Tp.propertyIsEnumerable, Oa = au(/* @__PURE__ */ function() {
  return arguments;
}()) ? au : function(e) {
  return vo(e) && H1.call(e, "callee") && !j1.call(e, "callee");
};
function W1() {
  return !1;
}
var Fp = typeof exports == "object" && exports && !exports.nodeType && exports, lu = Fp && typeof module == "object" && module && !module.nodeType && module, U1 = lu && lu.exports === Fp, su = U1 ? Mn.Buffer : void 0, K1 = su ? su.isBuffer : void 0, Ma = K1 || W1, q1 = "[object Arguments]", G1 = "[object Array]", X1 = "[object Boolean]", Y1 = "[object Date]", Z1 = "[object Error]", J1 = "[object Function]", Q1 = "[object Map]", eC = "[object Number]", tC = "[object Object]", nC = "[object RegExp]", oC = "[object Set]", rC = "[object String]", iC = "[object WeakMap]", aC = "[object ArrayBuffer]", lC = "[object DataView]", sC = "[object Float32Array]", dC = "[object Float64Array]", cC = "[object Int8Array]", uC = "[object Int16Array]", fC = "[object Int32Array]", hC = "[object Uint8Array]", pC = "[object Uint8ClampedArray]", vC = "[object Uint16Array]", gC = "[object Uint32Array]", ut = {};
ut[sC] = ut[dC] = ut[cC] = ut[uC] = ut[fC] = ut[hC] = ut[pC] = ut[vC] = ut[gC] = !0;
ut[q1] = ut[G1] = ut[aC] = ut[X1] = ut[lC] = ut[Y1] = ut[Z1] = ut[J1] = ut[Q1] = ut[eC] = ut[tC] = ut[nC] = ut[oC] = ut[rC] = ut[iC] = !1;
function mC(e) {
  return vo(e) && $d(e.length) && !!ut[Bo(e)];
}
function bC(e) {
  return function(t) {
    return e(t);
  };
}
var Ep = typeof exports == "object" && exports && !exports.nodeType && exports, Yr = Ep && typeof module == "object" && module && !module.nodeType && module, wC = Yr && Yr.exports === Ep, _l = wC && Rp.process, du = function() {
  try {
    var e = Yr && Yr.require && Yr.require("util").types;
    return e || _l && _l.binding && _l.binding("util");
  } catch {
  }
}(), cu = du && du.isTypedArray, kd = cu ? bC(cu) : mC, yC = Object.prototype, xC = yC.hasOwnProperty;
function zp(e, t) {
  var n = un(e), o = !n && Oa(e), r = !n && !o && Ma(e), i = !n && !o && !r && kd(e), l = n || o || r || i, a = l ? D1(e.length, String) : [], s = a.length;
  for (var d in e)
    (t || xC.call(e, d)) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    r && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    Cd(d, s))) && a.push(d);
  return a;
}
function Op(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var CC = Op(Object.keys, Object), SC = Object.prototype, $C = SC.hasOwnProperty;
function RC(e) {
  if (!Rd(e))
    return CC(e);
  var t = [];
  for (var n in Object(e))
    $C.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function Pd(e) {
  return pr(e) ? zp(e) : RC(e);
}
function kC(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var PC = Object.prototype, _C = PC.hasOwnProperty;
function TC(e) {
  if (!bo(e))
    return kC(e);
  var t = Rd(e), n = [];
  for (var o in e)
    o == "constructor" && (t || !_C.call(e, o)) || n.push(o);
  return n;
}
function Mp(e) {
  return pr(e) ? zp(e, !0) : TC(e);
}
var FC = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, EC = /^\w*$/;
function _d(e, t) {
  if (un(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || wd(e) ? !0 : EC.test(e) || !FC.test(e) || t != null && e in Object(t);
}
var ci = Do(Object, "create");
function zC() {
  this.__data__ = ci ? ci(null) : {}, this.size = 0;
}
function OC(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var MC = "__lodash_hash_undefined__", IC = Object.prototype, AC = IC.hasOwnProperty;
function VC(e) {
  var t = this.__data__;
  if (ci) {
    var n = t[e];
    return n === MC ? void 0 : n;
  }
  return AC.call(t, e) ? t[e] : void 0;
}
var BC = Object.prototype, LC = BC.hasOwnProperty;
function DC(e) {
  var t = this.__data__;
  return ci ? t[e] !== void 0 : LC.call(t, e);
}
var NC = "__lodash_hash_undefined__";
function HC(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = ci && t === void 0 ? NC : t, this;
}
function Io(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Io.prototype.clear = zC;
Io.prototype.delete = OC;
Io.prototype.get = VC;
Io.prototype.has = DC;
Io.prototype.set = HC;
function jC() {
  this.__data__ = [], this.size = 0;
}
function Ka(e, t) {
  for (var n = e.length; n--; )
    if (vi(e[n][0], t))
      return n;
  return -1;
}
var WC = Array.prototype, UC = WC.splice;
function KC(e) {
  var t = this.__data__, n = Ka(t, e);
  if (n < 0)
    return !1;
  var o = t.length - 1;
  return n == o ? t.pop() : UC.call(t, n, 1), --this.size, !0;
}
function qC(e) {
  var t = this.__data__, n = Ka(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function GC(e) {
  return Ka(this.__data__, e) > -1;
}
function XC(e, t) {
  var n = this.__data__, o = Ka(n, e);
  return o < 0 ? (++this.size, n.push([e, t])) : n[o][1] = t, this;
}
function Gn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Gn.prototype.clear = jC;
Gn.prototype.delete = KC;
Gn.prototype.get = qC;
Gn.prototype.has = GC;
Gn.prototype.set = XC;
var ui = Do(Mn, "Map");
function YC() {
  this.size = 0, this.__data__ = {
    hash: new Io(),
    map: new (ui || Gn)(),
    string: new Io()
  };
}
function ZC(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function qa(e, t) {
  var n = e.__data__;
  return ZC(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function JC(e) {
  var t = qa(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function QC(e) {
  return qa(this, e).get(e);
}
function eS(e) {
  return qa(this, e).has(e);
}
function tS(e, t) {
  var n = qa(this, e), o = n.size;
  return n.set(e, t), this.size += n.size == o ? 0 : 1, this;
}
function Xn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Xn.prototype.clear = YC;
Xn.prototype.delete = JC;
Xn.prototype.get = QC;
Xn.prototype.has = eS;
Xn.prototype.set = tS;
var nS = "Expected a function";
function Td(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(nS);
  var n = function() {
    var o = arguments, r = t ? t.apply(this, o) : o[0], i = n.cache;
    if (i.has(r))
      return i.get(r);
    var l = e.apply(this, o);
    return n.cache = i.set(r, l) || i, l;
  };
  return n.cache = new (Td.Cache || Xn)(), n;
}
Td.Cache = Xn;
var oS = 500;
function rS(e) {
  var t = Td(e, function(o) {
    return n.size === oS && n.clear(), o;
  }), n = t.cache;
  return t;
}
var iS = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, aS = /\\(\\)?/g, lS = rS(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(iS, function(n, o, r, i) {
    t.push(r ? i.replace(aS, "$1") : o || n);
  }), t;
});
function Ip(e) {
  return e == null ? "" : _p(e);
}
function Ap(e, t) {
  return un(e) ? e : _d(e, t) ? [e] : lS(Ip(e));
}
function Ga(e) {
  if (typeof e == "string" || wd(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function Vp(e, t) {
  t = Ap(t, e);
  for (var n = 0, o = t.length; e != null && n < o; )
    e = e[Ga(t[n++])];
  return n && n == o ? e : void 0;
}
function fi(e, t, n) {
  var o = e == null ? void 0 : Vp(e, t);
  return o === void 0 ? n : o;
}
function sS(e, t) {
  for (var n = -1, o = t.length, r = e.length; ++n < o; )
    e[r + n] = t[n];
  return e;
}
var Bp = Op(Object.getPrototypeOf, Object), dS = "[object Object]", cS = Function.prototype, uS = Object.prototype, Lp = cS.toString, fS = uS.hasOwnProperty, hS = Lp.call(Object);
function pS(e) {
  if (!vo(e) || Bo(e) != dS)
    return !1;
  var t = Bp(e);
  if (t === null)
    return !0;
  var n = fS.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && Lp.call(n) == hS;
}
function vS(e, t, n) {
  var o = -1, r = e.length;
  t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var i = Array(r); ++o < r; )
    i[o] = e[o + t];
  return i;
}
function gS(e, t, n) {
  var o = e.length;
  return n = n === void 0 ? o : n, !t && n >= o ? e : vS(e, t, n);
}
var mS = "\\ud800-\\udfff", bS = "\\u0300-\\u036f", wS = "\\ufe20-\\ufe2f", yS = "\\u20d0-\\u20ff", xS = bS + wS + yS, CS = "\\ufe0e\\ufe0f", SS = "\\u200d", $S = RegExp("[" + SS + mS + xS + CS + "]");
function Dp(e) {
  return $S.test(e);
}
function RS(e) {
  return e.split("");
}
var Np = "\\ud800-\\udfff", kS = "\\u0300-\\u036f", PS = "\\ufe20-\\ufe2f", _S = "\\u20d0-\\u20ff", TS = kS + PS + _S, FS = "\\ufe0e\\ufe0f", ES = "[" + Np + "]", Ms = "[" + TS + "]", Is = "\\ud83c[\\udffb-\\udfff]", zS = "(?:" + Ms + "|" + Is + ")", Hp = "[^" + Np + "]", jp = "(?:\\ud83c[\\udde6-\\uddff]){2}", Wp = "[\\ud800-\\udbff][\\udc00-\\udfff]", OS = "\\u200d", Up = zS + "?", Kp = "[" + FS + "]?", MS = "(?:" + OS + "(?:" + [Hp, jp, Wp].join("|") + ")" + Kp + Up + ")*", IS = Kp + Up + MS, AS = "(?:" + [Hp + Ms + "?", Ms, jp, Wp, ES].join("|") + ")", VS = RegExp(Is + "(?=" + Is + ")|" + AS + IS, "g");
function BS(e) {
  return e.match(VS) || [];
}
function LS(e) {
  return Dp(e) ? BS(e) : RS(e);
}
function DS(e) {
  return function(t) {
    t = Ip(t);
    var n = Dp(t) ? LS(t) : void 0, o = n ? n[0] : t.charAt(0), r = n ? gS(n, 1).join("") : t.slice(1);
    return o[e]() + r;
  };
}
var NS = DS("toUpperCase");
function HS() {
  this.__data__ = new Gn(), this.size = 0;
}
function jS(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function WS(e) {
  return this.__data__.get(e);
}
function US(e) {
  return this.__data__.has(e);
}
var KS = 200;
function qS(e, t) {
  var n = this.__data__;
  if (n instanceof Gn) {
    var o = n.__data__;
    if (!ui || o.length < KS - 1)
      return o.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new Xn(o);
  }
  return n.set(e, t), this.size = n.size, this;
}
function Fn(e) {
  var t = this.__data__ = new Gn(e);
  this.size = t.size;
}
Fn.prototype.clear = HS;
Fn.prototype.delete = jS;
Fn.prototype.get = WS;
Fn.prototype.has = US;
Fn.prototype.set = qS;
var qp = typeof exports == "object" && exports && !exports.nodeType && exports, uu = qp && typeof module == "object" && module && !module.nodeType && module, GS = uu && uu.exports === qp, fu = GS ? Mn.Buffer : void 0;
fu && fu.allocUnsafe;
function XS(e, t) {
  return e.slice();
}
function YS(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = 0, i = []; ++n < o; ) {
    var l = e[n];
    t(l, n, e) && (i[r++] = l);
  }
  return i;
}
function ZS() {
  return [];
}
var JS = Object.prototype, QS = JS.propertyIsEnumerable, hu = Object.getOwnPropertySymbols, e$ = hu ? function(e) {
  return e == null ? [] : (e = Object(e), YS(hu(e), function(t) {
    return QS.call(e, t);
  }));
} : ZS;
function t$(e, t, n) {
  var o = t(e);
  return un(e) ? o : sS(o, n(e));
}
function pu(e) {
  return t$(e, Pd, e$);
}
var As = Do(Mn, "DataView"), Vs = Do(Mn, "Promise"), Bs = Do(Mn, "Set"), vu = "[object Map]", n$ = "[object Object]", gu = "[object Promise]", mu = "[object Set]", bu = "[object WeakMap]", wu = "[object DataView]", o$ = Lo(As), r$ = Lo(ui), i$ = Lo(Vs), a$ = Lo(Bs), l$ = Lo(Os), lo = Bo;
(As && lo(new As(new ArrayBuffer(1))) != wu || ui && lo(new ui()) != vu || Vs && lo(Vs.resolve()) != gu || Bs && lo(new Bs()) != mu || Os && lo(new Os()) != bu) && (lo = function(e) {
  var t = Bo(e), n = t == n$ ? e.constructor : void 0, o = n ? Lo(n) : "";
  if (o)
    switch (o) {
      case o$:
        return wu;
      case r$:
        return vu;
      case i$:
        return gu;
      case a$:
        return mu;
      case l$:
        return bu;
    }
  return t;
});
var Ia = Mn.Uint8Array;
function s$(e) {
  var t = new e.constructor(e.byteLength);
  return new Ia(t).set(new Ia(e)), t;
}
function d$(e, t) {
  var n = s$(e.buffer);
  return new e.constructor(n, e.byteOffset, e.length);
}
function c$(e) {
  return typeof e.constructor == "function" && !Rd(e) ? b1(Bp(e)) : {};
}
var u$ = "__lodash_hash_undefined__";
function f$(e) {
  return this.__data__.set(e, u$), this;
}
function h$(e) {
  return this.__data__.has(e);
}
function Aa(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new Xn(); ++t < n; )
    this.add(e[t]);
}
Aa.prototype.add = Aa.prototype.push = f$;
Aa.prototype.has = h$;
function p$(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function v$(e, t) {
  return e.has(t);
}
var g$ = 1, m$ = 2;
function Gp(e, t, n, o, r, i) {
  var l = n & g$, a = e.length, s = t.length;
  if (a != s && !(l && s > a))
    return !1;
  var d = i.get(e), c = i.get(t);
  if (d && c)
    return d == t && c == e;
  var h = -1, p = !0, g = n & m$ ? new Aa() : void 0;
  for (i.set(e, t), i.set(t, e); ++h < a; ) {
    var f = e[h], v = t[h];
    if (o)
      var m = l ? o(v, f, h, t, e, i) : o(f, v, h, e, t, i);
    if (m !== void 0) {
      if (m)
        continue;
      p = !1;
      break;
    }
    if (g) {
      if (!p$(t, function(u, w) {
        if (!v$(g, w) && (f === u || r(f, u, n, o, i)))
          return g.push(w);
      })) {
        p = !1;
        break;
      }
    } else if (!(f === v || r(f, v, n, o, i))) {
      p = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), p;
}
function b$(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o, r) {
    n[++t] = [r, o];
  }), n;
}
function w$(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o) {
    n[++t] = o;
  }), n;
}
var y$ = 1, x$ = 2, C$ = "[object Boolean]", S$ = "[object Date]", $$ = "[object Error]", R$ = "[object Map]", k$ = "[object Number]", P$ = "[object RegExp]", _$ = "[object Set]", T$ = "[object String]", F$ = "[object Symbol]", E$ = "[object ArrayBuffer]", z$ = "[object DataView]", yu = po ? po.prototype : void 0, Tl = yu ? yu.valueOf : void 0;
function O$(e, t, n, o, r, i, l) {
  switch (n) {
    case z$:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case E$:
      return !(e.byteLength != t.byteLength || !i(new Ia(e), new Ia(t)));
    case C$:
    case S$:
    case k$:
      return vi(+e, +t);
    case $$:
      return e.name == t.name && e.message == t.message;
    case P$:
    case T$:
      return e == t + "";
    case R$:
      var a = b$;
    case _$:
      var s = o & y$;
      if (a || (a = w$), e.size != t.size && !s)
        return !1;
      var d = l.get(e);
      if (d)
        return d == t;
      o |= x$, l.set(e, t);
      var c = Gp(a(e), a(t), o, r, i, l);
      return l.delete(e), c;
    case F$:
      if (Tl)
        return Tl.call(e) == Tl.call(t);
  }
  return !1;
}
var M$ = 1, I$ = Object.prototype, A$ = I$.hasOwnProperty;
function V$(e, t, n, o, r, i) {
  var l = n & M$, a = pu(e), s = a.length, d = pu(t), c = d.length;
  if (s != c && !l)
    return !1;
  for (var h = s; h--; ) {
    var p = a[h];
    if (!(l ? p in t : A$.call(t, p)))
      return !1;
  }
  var g = i.get(e), f = i.get(t);
  if (g && f)
    return g == t && f == e;
  var v = !0;
  i.set(e, t), i.set(t, e);
  for (var m = l; ++h < s; ) {
    p = a[h];
    var u = e[p], w = t[p];
    if (o)
      var x = l ? o(w, u, p, t, e, i) : o(u, w, p, e, t, i);
    if (!(x === void 0 ? u === w || r(u, w, n, o, i) : x)) {
      v = !1;
      break;
    }
    m || (m = p == "constructor");
  }
  if (v && !m) {
    var b = e.constructor, C = t.constructor;
    b != C && "constructor" in e && "constructor" in t && !(typeof b == "function" && b instanceof b && typeof C == "function" && C instanceof C) && (v = !1);
  }
  return i.delete(e), i.delete(t), v;
}
var B$ = 1, xu = "[object Arguments]", Cu = "[object Array]", Oi = "[object Object]", L$ = Object.prototype, Su = L$.hasOwnProperty;
function D$(e, t, n, o, r, i) {
  var l = un(e), a = un(t), s = l ? Cu : lo(e), d = a ? Cu : lo(t);
  s = s == xu ? Oi : s, d = d == xu ? Oi : d;
  var c = s == Oi, h = d == Oi, p = s == d;
  if (p && Ma(e)) {
    if (!Ma(t))
      return !1;
    l = !0, c = !1;
  }
  if (p && !c)
    return i || (i = new Fn()), l || kd(e) ? Gp(e, t, n, o, r, i) : O$(e, t, s, n, o, r, i);
  if (!(n & B$)) {
    var g = c && Su.call(e, "__wrapped__"), f = h && Su.call(t, "__wrapped__");
    if (g || f) {
      var v = g ? e.value() : e, m = f ? t.value() : t;
      return i || (i = new Fn()), r(v, m, n, o, i);
    }
  }
  return p ? (i || (i = new Fn()), V$(e, t, n, o, r, i)) : !1;
}
function Fd(e, t, n, o, r) {
  return e === t ? !0 : e == null || t == null || !vo(e) && !vo(t) ? e !== e && t !== t : D$(e, t, n, o, Fd, r);
}
var N$ = 1, H$ = 2;
function j$(e, t, n, o) {
  var r = n.length, i = r;
  if (e == null)
    return !i;
  for (e = Object(e); r--; ) {
    var l = n[r];
    if (l[2] ? l[1] !== e[l[0]] : !(l[0] in e))
      return !1;
  }
  for (; ++r < i; ) {
    l = n[r];
    var a = l[0], s = e[a], d = l[1];
    if (l[2]) {
      if (s === void 0 && !(a in e))
        return !1;
    } else {
      var c = new Fn(), h;
      if (!(h === void 0 ? Fd(d, s, N$ | H$, o, c) : h))
        return !1;
    }
  }
  return !0;
}
function Xp(e) {
  return e === e && !bo(e);
}
function W$(e) {
  for (var t = Pd(e), n = t.length; n--; ) {
    var o = t[n], r = e[o];
    t[n] = [o, r, Xp(r)];
  }
  return t;
}
function Yp(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function U$(e) {
  var t = W$(e);
  return t.length == 1 && t[0][2] ? Yp(t[0][0], t[0][1]) : function(n) {
    return n === e || j$(n, e, t);
  };
}
function K$(e, t) {
  return e != null && t in Object(e);
}
function q$(e, t, n) {
  t = Ap(t, e);
  for (var o = -1, r = t.length, i = !1; ++o < r; ) {
    var l = Ga(t[o]);
    if (!(i = e != null && n(e, l)))
      break;
    e = e[l];
  }
  return i || ++o != r ? i : (r = e == null ? 0 : e.length, !!r && $d(r) && Cd(l, r) && (un(e) || Oa(e)));
}
function G$(e, t) {
  return e != null && q$(e, t, K$);
}
var X$ = 1, Y$ = 2;
function Z$(e, t) {
  return _d(e) && Xp(t) ? Yp(Ga(e), t) : function(n) {
    var o = fi(n, e);
    return o === void 0 && o === t ? G$(n, e) : Fd(t, o, X$ | Y$);
  };
}
function J$(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function Q$(e) {
  return function(t) {
    return Vp(t, e);
  };
}
function eR(e) {
  return _d(e) ? J$(Ga(e)) : Q$(e);
}
function tR(e) {
  return typeof e == "function" ? e : e == null ? yd : typeof e == "object" ? un(e) ? Z$(e[0], e[1]) : U$(e) : eR(e);
}
function nR(e) {
  return function(t, n, o) {
    for (var r = -1, i = Object(t), l = o(t), a = l.length; a--; ) {
      var s = l[++r];
      if (n(i[s], s, i) === !1)
        break;
    }
    return t;
  };
}
var Zp = nR();
function oR(e, t) {
  return e && Zp(e, t, Pd);
}
function rR(e, t) {
  return function(n, o) {
    if (n == null)
      return n;
    if (!pr(n))
      return e(n, o);
    for (var r = n.length, i = -1, l = Object(n); ++i < r && o(l[i], i, l) !== !1; )
      ;
    return n;
  };
}
var iR = rR(oR);
function Ls(e, t, n) {
  (n !== void 0 && !vi(e[t], n) || n === void 0 && !(t in e)) && Sd(e, t, n);
}
function aR(e) {
  return vo(e) && pr(e);
}
function Ds(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function lR(e) {
  return O1(e, Mp(e));
}
function sR(e, t, n, o, r, i, l) {
  var a = Ds(e, n), s = Ds(t, n), d = l.get(s);
  if (d) {
    Ls(e, n, d);
    return;
  }
  var c = i ? i(a, s, n + "", e, t, l) : void 0, h = c === void 0;
  if (h) {
    var p = un(s), g = !p && Ma(s), f = !p && !g && kd(s);
    c = s, p || g || f ? un(a) ? c = a : aR(a) ? c = y1(a) : g ? (h = !1, c = XS(s)) : f ? (h = !1, c = d$(s)) : c = [] : pS(s) || Oa(s) ? (c = a, Oa(a) ? c = lR(a) : (!bo(a) || xd(a)) && (c = c$(s))) : h = !1;
  }
  h && (l.set(s, c), r(c, s, o, i, l), l.delete(s)), Ls(e, n, c);
}
function Jp(e, t, n, o, r) {
  e !== t && Zp(t, function(i, l) {
    if (r || (r = new Fn()), bo(i))
      sR(e, t, l, n, Jp, o, r);
    else {
      var a = o ? o(Ds(e, l), i, l + "", e, t, r) : void 0;
      a === void 0 && (a = i), Ls(e, l, a);
    }
  }, Mp);
}
function dR(e, t) {
  var n = -1, o = pr(e) ? Array(e.length) : [];
  return iR(e, function(r, i, l) {
    o[++n] = t(r, i, l);
  }), o;
}
function cR(e, t) {
  var n = un(e) ? Pp : dR;
  return n(e, tR(t));
}
var Mi = B1(function(e, t, n) {
  Jp(e, t, n);
});
const $u = window.Vue.computed, uR = window.Vue.inject;
function vr(e) {
  const {
    mergedLocaleRef: t,
    mergedDateLocaleRef: n
  } = uR(Kn, null) || {}, o = $u(() => {
    var i, l;
    return (l = (i = t == null ? void 0 : t.value) === null || i === void 0 ? void 0 : i[e]) !== null && l !== void 0 ? l : ux[e];
  });
  return {
    dateLocaleRef: $u(() => {
      var i;
      return (i = n == null ? void 0 : n.value) !== null && i !== void 0 ? i : Ux;
    }),
    localeRef: o
  };
}
const cr = "naive-ui-style", fR = window.Vue.computed, hR = window.Vue.inject, pR = window.Vue.onBeforeMount, vR = window.Vue.watchEffect;
function At(e, t, n) {
  if (!t) return;
  const o = Vo(), r = fR(() => {
    const {
      value: a
    } = t;
    if (!a)
      return;
    const s = a[e];
    if (s)
      return s;
  }), i = hR(Kn, null), l = () => {
    vR(() => {
      const {
        value: a
      } = n, s = `${a}${e}Rtl`;
      if (Ab(s, o)) return;
      const {
        value: d
      } = r;
      d && d.style.mount({
        id: s,
        head: !0,
        anchorMetaName: cr,
        props: {
          bPrefix: a ? `.${a}-` : void 0
        },
        ssr: o,
        parent: i == null ? void 0 : i.styleMountTarget
      });
    });
  };
  return o ? l() : pR(l), r;
}
const No = {
  fontFamily: 'v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  fontFamilyMono: "v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace",
  fontWeight: "400",
  fontWeightStrong: "500",
  cubicBezierEaseInOut: "cubic-bezier(.4, 0, .2, 1)",
  cubicBezierEaseOut: "cubic-bezier(0, 0, .2, 1)",
  cubicBezierEaseIn: "cubic-bezier(.4, 0, 1, 1)",
  borderRadius: "3px",
  borderRadiusSmall: "2px",
  fontSize: "14px",
  fontSizeMini: "12px",
  fontSizeTiny: "12px",
  fontSizeSmall: "14px",
  fontSizeMedium: "14px",
  fontSizeLarge: "15px",
  fontSizeHuge: "16px",
  lineHeight: "1.6",
  heightMini: "16px",
  // private now, it's too small
  heightTiny: "22px",
  heightSmall: "28px",
  heightMedium: "34px",
  heightLarge: "40px",
  heightHuge: "46px"
}, {
  fontSize: gR,
  fontFamily: mR,
  lineHeight: bR
} = No, Qp = H("body", `
 margin: 0;
 font-size: ${gR};
 font-family: ${mR};
 line-height: ${bR};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [H("input", `
 font-family: inherit;
 font-size: inherit;
 `)]), wR = window.Vue.inject, yR = window.Vue.onBeforeMount;
function Ho(e, t, n) {
  if (!t)
    return;
  const o = Vo(), r = wR(Kn, null), i = () => {
    const l = n.value;
    t.mount({
      id: l === void 0 ? e : l + e,
      head: !0,
      anchorMetaName: cr,
      props: {
        bPrefix: l ? `.${l}-` : void 0
      },
      ssr: o,
      parent: r == null ? void 0 : r.styleMountTarget
    }), r != null && r.preflightStyleDisabled || Qp.mount({
      id: "n-global",
      head: !0,
      anchorMetaName: cr,
      ssr: o,
      parent: r == null ? void 0 : r.styleMountTarget
    });
  };
  o ? i() : yR(i);
}
const xR = window.Vue.computed, CR = window.Vue.inject, SR = window.Vue.onBeforeMount;
function ke(e, t, n, o, r, i) {
  const l = Vo(), a = CR(Kn, null);
  if (n) {
    const d = () => {
      const c = i == null ? void 0 : i.value;
      n.mount({
        id: c === void 0 ? t : c + t,
        head: !0,
        props: {
          bPrefix: c ? `.${c}-` : void 0
        },
        anchorMetaName: cr,
        ssr: l,
        parent: a == null ? void 0 : a.styleMountTarget
      }), a != null && a.preflightStyleDisabled || Qp.mount({
        id: "n-global",
        head: !0,
        anchorMetaName: cr,
        ssr: l,
        parent: a == null ? void 0 : a.styleMountTarget
      });
    };
    l ? d() : SR(d);
  }
  return xR(() => {
    var d;
    const {
      theme: {
        common: c,
        self: h,
        peers: p = {}
      } = {},
      themeOverrides: g = {},
      builtinThemeOverrides: f = {}
    } = r, {
      common: v,
      peers: m
    } = g, {
      common: u = void 0,
      [e]: {
        common: w = void 0,
        self: x = void 0,
        peers: b = {}
      } = {}
    } = (a == null ? void 0 : a.mergedThemeRef.value) || {}, {
      common: C = void 0,
      [e]: S = {}
    } = (a == null ? void 0 : a.mergedThemeOverridesRef.value) || {}, {
      common: y,
      peers: T = {}
    } = S, R = Mi({}, c || w || u || o.common, C, y, v), E = Mi(
      // {}, executed every time, no need for empty obj
      (d = h || x || o.self) === null || d === void 0 ? void 0 : d(R),
      f,
      S,
      g
    );
    return {
      common: R,
      self: E,
      peers: Mi({}, o.peers, b, p),
      peerOverrides: Mi({}, f.peers, T, m)
    };
  });
}
ke.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object
};
const $R = z("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [H("svg", `
 height: 1em;
 width: 1em;
 `)]), RR = window.Vue.defineComponent, kR = window.Vue.h, PR = window.Vue.toRef, Ct = RR({
  name: "BaseIcon",
  props: {
    role: String,
    ariaLabel: String,
    ariaDisabled: {
      type: Boolean,
      default: void 0
    },
    ariaHidden: {
      type: Boolean,
      default: void 0
    },
    clsPrefix: {
      type: String,
      required: !0
    },
    onClick: Function,
    onMousedown: Function,
    onMouseup: Function
  },
  setup(e) {
    Ho("-base-icon", $R, PR(e, "clsPrefix"));
  },
  render() {
    return kR("i", {
      class: `${this.clsPrefix}-base-icon`,
      onClick: this.onClick,
      onMousedown: this.onMousedown,
      onMouseup: this.onMouseup,
      role: this.role,
      "aria-label": this.ariaLabel,
      "aria-hidden": this.ariaHidden,
      "aria-disabled": this.ariaDisabled
    }, this.$slots);
  }
}), _R = window.Vue.defineComponent, TR = window.Vue.h, FR = window.Vue.Transition, gr = _R({
  name: "BaseIconSwitchTransition",
  setup(e, {
    slots: t
  }) {
    const n = Wa();
    return () => TR(FR, {
      name: "icon-switch-transition",
      appear: n.value
    }, t);
  }
}), ER = window.Vue.defineComponent, Ru = window.Vue.h, zR = ER({
  name: "Add",
  render() {
    return Ru("svg", {
      width: "512",
      height: "512",
      viewBox: "0 0 512 512",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, Ru("path", {
      d: "M256 112V400M400 256H112",
      stroke: "currentColor",
      "stroke-width": "32",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }));
  }
}), OR = window.Vue.defineComponent, Ii = window.Vue.h, MR = OR({
  name: "ArrowDown",
  render() {
    return Ii("svg", {
      viewBox: "0 0 28 28",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Ii("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, Ii("g", {
      "fill-rule": "nonzero"
    }, Ii("path", {
      d: "M23.7916,15.2664 C24.0788,14.9679 24.0696,14.4931 23.7711,14.206 C23.4726,13.9188 22.9978,13.928 22.7106,14.2265 L14.7511,22.5007 L14.7511,3.74792 C14.7511,3.33371 14.4153,2.99792 14.0011,2.99792 C13.5869,2.99792 13.2511,3.33371 13.2511,3.74793 L13.2511,22.4998 L5.29259,14.2265 C5.00543,13.928 4.53064,13.9188 4.23213,14.206 C3.93361,14.4931 3.9244,14.9679 4.21157,15.2664 L13.2809,24.6944 C13.6743,25.1034 14.3289,25.1034 14.7223,24.6944 L23.7916,15.2664 Z"
    }))));
  }
}), ku = window.Vue.defineComponent, IR = window.Vue.h, AR = window.Vue.inject;
function mr(e, t) {
  const n = ku({
    render() {
      return t();
    }
  });
  return ku({
    name: NS(e),
    setup() {
      var o;
      const r = (o = AR(Kn, null)) === null || o === void 0 ? void 0 : o.mergedIconsRef;
      return () => {
        var i;
        const l = (i = r == null ? void 0 : r.value) === null || i === void 0 ? void 0 : i[e];
        return l ? l() : IR(n, null);
      };
    }
  });
}
const VR = window.Vue.defineComponent, Pu = window.Vue.h, _u = VR({
  name: "Backward",
  render() {
    return Pu("svg", {
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, Pu("path", {
      d: "M12.2674 15.793C11.9675 16.0787 11.4927 16.0672 11.2071 15.7673L6.20572 10.5168C5.9298 10.2271 5.9298 9.7719 6.20572 9.48223L11.2071 4.23177C11.4927 3.93184 11.9675 3.92031 12.2674 4.206C12.5673 4.49169 12.5789 4.96642 12.2932 5.26634L7.78458 9.99952L12.2932 14.7327C12.5789 15.0326 12.5673 15.5074 12.2674 15.793Z",
      fill: "currentColor"
    }));
  }
}), BR = window.Vue.defineComponent, Fl = window.Vue.h, LR = BR({
  name: "Checkmark",
  render() {
    return Fl("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 16 16"
    }, Fl("g", {
      fill: "none"
    }, Fl("path", {
      d: "M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",
      fill: "currentColor"
    })));
  }
}), DR = window.Vue.defineComponent, Tu = window.Vue.h, ev = DR({
  name: "ChevronDown",
  render() {
    return Tu("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, Tu("path", {
      d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z",
      fill: "currentColor"
    }));
  }
}), NR = window.Vue.defineComponent, Fu = window.Vue.h, tv = NR({
  name: "ChevronRight",
  render() {
    return Fu("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, Fu("path", {
      d: "M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z",
      fill: "currentColor"
    }));
  }
}), Ai = window.Vue.h, HR = mr("clear", () => Ai("svg", {
  viewBox: "0 0 16 16",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, Ai("g", {
  stroke: "none",
  "stroke-width": "1",
  fill: "none",
  "fill-rule": "evenodd"
}, Ai("g", {
  fill: "currentColor",
  "fill-rule": "nonzero"
}, Ai("path", {
  d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z"
}))))), Vi = window.Vue.h, jR = mr("close", () => Vi("svg", {
  viewBox: "0 0 12 12",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": !0
}, Vi("g", {
  stroke: "none",
  "stroke-width": "1",
  fill: "none",
  "fill-rule": "evenodd"
}, Vi("g", {
  fill: "currentColor",
  "fill-rule": "nonzero"
}, Vi("path", {
  d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
}))))), WR = window.Vue.defineComponent, El = window.Vue.h, UR = WR({
  name: "Empty",
  render() {
    return El("svg", {
      viewBox: "0 0 28 28",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, El("path", {
      d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",
      fill: "currentColor"
    }), El("path", {
      d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",
      fill: "currentColor"
    }));
  }
}), Bi = window.Vue.h, nv = mr("error", () => Bi("svg", {
  viewBox: "0 0 48 48",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, Bi("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, Bi("g", {
  "fill-rule": "nonzero"
}, Bi("path", {
  d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z"
}))))), KR = window.Vue.defineComponent, zl = window.Vue.h, qR = KR({
  name: "Eye",
  render() {
    return zl("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, zl("path", {
      d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "32"
    }), zl("circle", {
      cx: "256",
      cy: "256",
      r: "80",
      fill: "none",
      stroke: "currentColor",
      "stroke-miterlimit": "10",
      "stroke-width": "32"
    }));
  }
}), GR = window.Vue.defineComponent, qo = window.Vue.h, XR = GR({
  name: "EyeOff",
  render() {
    return qo("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, qo("path", {
      d: "M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z",
      fill: "currentColor"
    }), qo("path", {
      d: "M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z",
      fill: "currentColor"
    }), qo("path", {
      d: "M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z",
      fill: "currentColor"
    }), qo("path", {
      d: "M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z",
      fill: "currentColor"
    }), qo("path", {
      d: "M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z",
      fill: "currentColor"
    }));
  }
}), YR = window.Vue.defineComponent, Li = window.Vue.h, Eu = YR({
  name: "FastBackward",
  render() {
    return Li("svg", {
      viewBox: "0 0 20 20",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Li("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, Li("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, Li("path", {
      d: "M8.73171,16.7949 C9.03264,17.0795 9.50733,17.0663 9.79196,16.7654 C10.0766,16.4644 10.0634,15.9897 9.76243,15.7051 L4.52339,10.75 L17.2471,10.75 C17.6613,10.75 17.9971,10.4142 17.9971,10 C17.9971,9.58579 17.6613,9.25 17.2471,9.25 L4.52112,9.25 L9.76243,4.29275 C10.0634,4.00812 10.0766,3.53343 9.79196,3.2325 C9.50733,2.93156 9.03264,2.91834 8.73171,3.20297 L2.31449,9.27241 C2.14819,9.4297 2.04819,9.62981 2.01448,9.8386 C2.00308,9.89058 1.99707,9.94459 1.99707,10 C1.99707,10.0576 2.00356,10.1137 2.01585,10.1675 C2.05084,10.3733 2.15039,10.5702 2.31449,10.7254 L8.73171,16.7949 Z"
    }))));
  }
}), ZR = window.Vue.defineComponent, Di = window.Vue.h, zu = ZR({
  name: "FastForward",
  render() {
    return Di("svg", {
      viewBox: "0 0 20 20",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Di("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, Di("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, Di("path", {
      d: "M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z"
    }))));
  }
}), JR = window.Vue.defineComponent, Ni = window.Vue.h, QR = JR({
  name: "Filter",
  render() {
    return Ni("svg", {
      viewBox: "0 0 28 28",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Ni("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, Ni("g", {
      "fill-rule": "nonzero"
    }, Ni("path", {
      d: "M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z"
    }))));
  }
}), ek = window.Vue.defineComponent, Ou = window.Vue.h, Mu = ek({
  name: "Forward",
  render() {
    return Ou("svg", {
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, Ou("path", {
      d: "M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z",
      fill: "currentColor"
    }));
  }
}), Hi = window.Vue.h, ov = mr("info", () => Hi("svg", {
  viewBox: "0 0 28 28",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, Hi("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, Hi("g", {
  "fill-rule": "nonzero"
}, Hi("path", {
  d: "M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z"
}))))), tk = window.Vue.defineComponent, ji = window.Vue.h, Iu = tk({
  name: "More",
  render() {
    return ji("svg", {
      viewBox: "0 0 16 16",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, ji("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, ji("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, ji("path", {
      d: "M4,7 C4.55228,7 5,7.44772 5,8 C5,8.55229 4.55228,9 4,9 C3.44772,9 3,8.55229 3,8 C3,7.44772 3.44772,7 4,7 Z M8,7 C8.55229,7 9,7.44772 9,8 C9,8.55229 8.55229,9 8,9 C7.44772,9 7,8.55229 7,8 C7,7.44772 7.44772,7 8,7 Z M12,7 C12.5523,7 13,7.44772 13,8 C13,8.55229 12.5523,9 12,9 C11.4477,9 11,8.55229 11,8 C11,7.44772 11.4477,7 12,7 Z"
    }))));
  }
}), nk = window.Vue.defineComponent, Au = window.Vue.h, ok = nk({
  name: "Remove",
  render() {
    return Au("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, Au("line", {
      x1: "400",
      y1: "256",
      x2: "112",
      y2: "256",
      style: `
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 32px;
      `
    }));
  }
}), Wi = window.Vue.h, rv = mr("success", () => Wi("svg", {
  viewBox: "0 0 48 48",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, Wi("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, Wi("g", {
  "fill-rule": "nonzero"
}, Wi("path", {
  d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z"
}))))), Ui = window.Vue.h, iv = mr("warning", () => Ui("svg", {
  viewBox: "0 0 24 24",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, Ui("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, Ui("g", {
  "fill-rule": "nonzero"
}, Ui("path", {
  d: "M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z"
}))))), {
  cubicBezierEaseInOut: rk
} = No;
function dn({
  originalTransform: e = "",
  left: t = 0,
  top: n = 0,
  transition: o = `all .3s ${rk} !important`
} = {}) {
  return [H("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
    transform: `${e} scale(0.75)`,
    left: t,
    top: n,
    opacity: 0
  }), H("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
    transform: `scale(1) ${e}`,
    left: t,
    top: n,
    opacity: 1
  }), H("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
    transformOrigin: "center",
    position: "absolute",
    left: t,
    top: n,
    transition: o
  })];
}
const ik = z("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [H(">", [B("clear", `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `, [H("&:hover", `
 color: var(--n-clear-color-hover)!important;
 `), H("&:active", `
 color: var(--n-clear-color-pressed)!important;
 `)]), B("placeholder", `
 display: flex;
 `), B("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [dn({
  originalTransform: "translateX(-50%) translateY(-50%)",
  left: "50%",
  top: "50%"
})])])]), ak = window.Vue.defineComponent, Go = window.Vue.h, lk = window.Vue.toRef, Ns = ak({
  name: "BaseClear",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    },
    show: Boolean,
    onClear: Function
  },
  setup(e) {
    return Ho("-base-clear", ik, lk(e, "clsPrefix")), {
      handleMouseDown(t) {
        t.preventDefault();
      }
    };
  },
  render() {
    const {
      clsPrefix: e
    } = this;
    return Go("div", {
      class: `${e}-base-clear`
    }, Go(gr, null, {
      default: () => {
        var t, n;
        return this.show ? Go("div", {
          key: "dismiss",
          class: `${e}-base-clear__clear`,
          onClick: this.onClear,
          onMousedown: this.handleMouseDown,
          "data-clear": !0
        }, wn(this.$slots.icon, () => [Go(Ct, {
          clsPrefix: e
        }, {
          default: () => Go(HR, null)
        })])) : Go("div", {
          key: "icon",
          class: `${e}-base-clear__placeholder`
        }, (n = (t = this.$slots).placeholder) === null || n === void 0 ? void 0 : n.call(t));
      }
    }));
  }
}), sk = z("base-close", `
 display: flex;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 background-color: transparent;
 color: var(--n-close-icon-color);
 border-radius: var(--n-close-border-radius);
 height: var(--n-close-size);
 width: var(--n-close-size);
 font-size: var(--n-close-icon-size);
 outline: none;
 border: none;
 position: relative;
 padding: 0;
`, [U("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `), H("&::before", `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `), tt("disabled", [H("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), H("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), H("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), H("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), H("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), U("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), U("round", [H("&::before", `
 border-radius: 50%;
 `)])]), dk = window.Vue.defineComponent, Ol = window.Vue.h, ck = window.Vue.toRef, av = dk({
  name: "BaseClose",
  props: {
    isButtonTag: {
      type: Boolean,
      default: !0
    },
    clsPrefix: {
      type: String,
      required: !0
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    focusable: {
      type: Boolean,
      default: !0
    },
    round: Boolean,
    onClick: Function,
    absolute: Boolean
  },
  setup(e) {
    return Ho("-base-close", sk, ck(e, "clsPrefix")), () => {
      const {
        clsPrefix: t,
        disabled: n,
        absolute: o,
        round: r,
        isButtonTag: i
      } = e;
      return Ol(i ? "button" : "div", {
        type: i ? "button" : void 0,
        tabindex: n || !e.focusable ? -1 : 0,
        "aria-disabled": n,
        "aria-label": "close",
        role: i ? void 0 : "button",
        disabled: n,
        class: [`${t}-base-close`, o && `${t}-base-close--absolute`, n && `${t}-base-close--disabled`, r && `${t}-base-close--round`],
        onMousedown: (a) => {
          e.focusable || a.preventDefault();
        },
        onClick: e.onClick
      }, Ol(Ct, {
        clsPrefix: t
      }, {
        default: () => Ol(jR, null)
      }));
    };
  }
}), uk = window.Vue.defineComponent, fk = window.Vue.h, hk = window.Vue.Transition, pk = window.Vue.TransitionGroup, vk = uk({
  name: "FadeInExpandTransition",
  props: {
    appear: Boolean,
    group: Boolean,
    mode: String,
    onLeave: Function,
    onAfterLeave: Function,
    onAfterEnter: Function,
    width: Boolean,
    // reverse mode is only used in tree
    // it make it from expanded to collapsed after mounted
    reverse: Boolean
  },
  setup(e, {
    slots: t
  }) {
    function n(a) {
      e.width ? a.style.maxWidth = `${a.offsetWidth}px` : a.style.maxHeight = `${a.offsetHeight}px`, a.offsetWidth;
    }
    function o(a) {
      e.width ? a.style.maxWidth = "0" : a.style.maxHeight = "0", a.offsetWidth;
      const {
        onLeave: s
      } = e;
      s && s();
    }
    function r(a) {
      e.width ? a.style.maxWidth = "" : a.style.maxHeight = "";
      const {
        onAfterLeave: s
      } = e;
      s && s();
    }
    function i(a) {
      if (a.style.transition = "none", e.width) {
        const s = a.offsetWidth;
        a.style.maxWidth = "0", a.offsetWidth, a.style.transition = "", a.style.maxWidth = `${s}px`;
      } else if (e.reverse)
        a.style.maxHeight = `${a.offsetHeight}px`, a.offsetHeight, a.style.transition = "", a.style.maxHeight = "0";
      else {
        const s = a.offsetHeight;
        a.style.maxHeight = "0", a.offsetWidth, a.style.transition = "", a.style.maxHeight = `${s}px`;
      }
      a.offsetWidth;
    }
    function l(a) {
      var s;
      e.width ? a.style.maxWidth = "" : e.reverse || (a.style.maxHeight = ""), (s = e.onAfterEnter) === null || s === void 0 || s.call(e);
    }
    return () => {
      const {
        group: a,
        width: s,
        appear: d,
        mode: c
      } = e, h = a ? pk : hk, p = {
        name: s ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
        appear: d,
        onEnter: i,
        onAfterEnter: l,
        onBeforeLeave: n,
        onLeave: o,
        onAfterLeave: r
      };
      return a || (p.mode = c), fk(h, p, t);
    };
  }
}), gk = window.Vue.defineComponent, mk = window.Vue.h, bk = gk({
  props: {
    onFocus: Function,
    onBlur: Function
  },
  setup(e) {
    return () => mk("div", {
      style: "width: 0; height: 0",
      tabindex: 0,
      onFocus: e.onFocus,
      onBlur: e.onBlur
    });
  }
}), wk = H([H("@keyframes rotator", `
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`), z("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [B("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [dn()]), B("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [dn({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})]), B("container", `
 animation: rotator 3s linear infinite both;
 `, [B("icon", `
 height: 1em;
 width: 1em;
 `)])])]), yk = window.Vue.defineComponent, fn = window.Vue.h, xk = window.Vue.toRef, Ml = "1.6s", Ck = {
  strokeWidth: {
    type: Number,
    default: 28
  },
  stroke: {
    type: String,
    default: void 0
  }
}, br = yk({
  name: "BaseLoading",
  props: Object.assign({
    clsPrefix: {
      type: String,
      required: !0
    },
    show: {
      type: Boolean,
      default: !0
    },
    scale: {
      type: Number,
      default: 1
    },
    radius: {
      type: Number,
      default: 100
    }
  }, Ck),
  setup(e) {
    Ho("-base-loading", wk, xk(e, "clsPrefix"));
  },
  render() {
    const {
      clsPrefix: e,
      radius: t,
      strokeWidth: n,
      stroke: o,
      scale: r
    } = this, i = t / r;
    return fn("div", {
      class: `${e}-base-loading`,
      role: "img",
      "aria-label": "loading"
    }, fn(gr, null, {
      default: () => this.show ? fn("div", {
        key: "icon",
        class: `${e}-base-loading__transition-wrapper`
      }, fn("div", {
        class: `${e}-base-loading__container`
      }, fn("svg", {
        class: `${e}-base-loading__icon`,
        viewBox: `0 0 ${2 * i} ${2 * i}`,
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          color: o
        }
      }, fn("g", null, fn("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        values: `0 ${i} ${i};270 ${i} ${i}`,
        begin: "0s",
        dur: Ml,
        fill: "freeze",
        repeatCount: "indefinite"
      }), fn("circle", {
        class: `${e}-base-loading__icon`,
        fill: "none",
        stroke: "currentColor",
        "stroke-width": n,
        "stroke-linecap": "round",
        cx: i,
        cy: i,
        r: t - n / 2,
        "stroke-dasharray": 5.67 * t,
        "stroke-dashoffset": 18.48 * t
      }, fn("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        values: `0 ${i} ${i};135 ${i} ${i};450 ${i} ${i}`,
        begin: "0s",
        dur: Ml,
        fill: "freeze",
        repeatCount: "indefinite"
      }), fn("animate", {
        attributeName: "stroke-dashoffset",
        values: `${5.67 * t};${1.42 * t};${5.67 * t}`,
        begin: "0s",
        dur: Ml,
        fill: "freeze",
        repeatCount: "indefinite"
      })))))) : fn("div", {
        key: "placeholder",
        class: `${e}-base-loading__placeholder`
      }, this.$slots)
    }));
  }
}), {
  cubicBezierEaseInOut: Vu
} = No;
function Sk({
  name: e = "fade-in",
  enterDuration: t = "0.2s",
  leaveDuration: n = "0.2s",
  enterCubicBezier: o = Vu,
  leaveCubicBezier: r = Vu
} = {}) {
  return [H(`&.${e}-transition-enter-active`, {
    transition: `all ${t} ${o}!important`
  }), H(`&.${e}-transition-leave-active`, {
    transition: `all ${n} ${r}!important`
  }), H(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
    opacity: 0
  }), H(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`, {
    opacity: 1
  })];
}
const Te = {
  neutralBase: "#FFF",
  neutralInvertBase: "#000",
  neutralTextBase: "#000",
  neutralPopover: "#fff",
  neutralCard: "#fff",
  neutralModal: "#fff",
  neutralBody: "#fff",
  alpha1: "0.82",
  alpha2: "0.72",
  alpha3: "0.38",
  alpha4: "0.24",
  // disabled text, placeholder, icon
  alpha5: "0.18",
  // disabled placeholder
  alphaClose: "0.6",
  alphaDisabled: "0.5",
  alphaAvatar: "0.2",
  alphaProgressRail: ".08",
  alphaInput: "0",
  alphaScrollbar: "0.25",
  alphaScrollbarHover: "0.4",
  // primary
  primaryHover: "#36ad6a",
  primaryDefault: "#18a058",
  primaryActive: "#0c7a43",
  primarySuppl: "#36ad6a",
  // info
  infoHover: "#4098fc",
  infoDefault: "#2080f0",
  infoActive: "#1060c9",
  infoSuppl: "#4098fc",
  // error
  errorHover: "#de576d",
  errorDefault: "#d03050",
  errorActive: "#ab1f3f",
  errorSuppl: "#de576d",
  // warning
  warningHover: "#fcb040",
  warningDefault: "#f0a020",
  warningActive: "#c97c10",
  warningSuppl: "#fcb040",
  // success
  successHover: "#36ad6a",
  successDefault: "#18a058",
  successActive: "#0c7a43",
  successSuppl: "#36ad6a"
}, $k = fo(Te.neutralBase), lv = fo(Te.neutralInvertBase), Rk = `rgba(${lv.slice(0, 3).join(", ")}, `;
function Bu(e) {
  return `${Rk + String(e)})`;
}
function Ft(e) {
  const t = Array.from(lv);
  return t[3] = Number(e), Ke($k, t);
}
const mt = Object.assign(Object.assign({
  name: "common"
}, No), {
  baseColor: Te.neutralBase,
  // primary color
  primaryColor: Te.primaryDefault,
  primaryColorHover: Te.primaryHover,
  primaryColorPressed: Te.primaryActive,
  primaryColorSuppl: Te.primarySuppl,
  // info color
  infoColor: Te.infoDefault,
  infoColorHover: Te.infoHover,
  infoColorPressed: Te.infoActive,
  infoColorSuppl: Te.infoSuppl,
  // success color
  successColor: Te.successDefault,
  successColorHover: Te.successHover,
  successColorPressed: Te.successActive,
  successColorSuppl: Te.successSuppl,
  // warning color
  warningColor: Te.warningDefault,
  warningColorHover: Te.warningHover,
  warningColorPressed: Te.warningActive,
  warningColorSuppl: Te.warningSuppl,
  // error color
  errorColor: Te.errorDefault,
  errorColorHover: Te.errorHover,
  errorColorPressed: Te.errorActive,
  errorColorSuppl: Te.errorSuppl,
  // text color
  textColorBase: Te.neutralTextBase,
  textColor1: "rgb(31, 34, 37)",
  textColor2: "rgb(51, 54, 57)",
  textColor3: "rgb(118, 124, 130)",
  // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
  // textColor5: neutral(base.alpha5),
  textColorDisabled: Ft(Te.alpha4),
  placeholderColor: Ft(Te.alpha4),
  placeholderColorDisabled: Ft(Te.alpha5),
  iconColor: Ft(Te.alpha4),
  iconColorHover: Ri(Ft(Te.alpha4), {
    lightness: 0.75
  }),
  iconColorPressed: Ri(Ft(Te.alpha4), {
    lightness: 0.9
  }),
  iconColorDisabled: Ft(Te.alpha5),
  opacity1: Te.alpha1,
  opacity2: Te.alpha2,
  opacity3: Te.alpha3,
  opacity4: Te.alpha4,
  opacity5: Te.alpha5,
  dividerColor: "rgb(239, 239, 245)",
  borderColor: "rgb(224, 224, 230)",
  // close
  closeIconColor: Ft(Number(Te.alphaClose)),
  closeIconColorHover: Ft(Number(Te.alphaClose)),
  closeIconColorPressed: Ft(Number(Te.alphaClose)),
  closeColorHover: "rgba(0, 0, 0, .09)",
  closeColorPressed: "rgba(0, 0, 0, .13)",
  // clear
  clearColor: Ft(Te.alpha4),
  clearColorHover: Ri(Ft(Te.alpha4), {
    lightness: 0.75
  }),
  clearColorPressed: Ri(Ft(Te.alpha4), {
    lightness: 0.9
  }),
  scrollbarColor: Bu(Te.alphaScrollbar),
  scrollbarColorHover: Bu(Te.alphaScrollbarHover),
  scrollbarWidth: "5px",
  scrollbarHeight: "5px",
  scrollbarBorderRadius: "5px",
  progressRailColor: Ft(Te.alphaProgressRail),
  railColor: "rgb(219, 219, 223)",
  popoverColor: Te.neutralPopover,
  tableColor: Te.neutralCard,
  cardColor: Te.neutralCard,
  modalColor: Te.neutralModal,
  bodyColor: Te.neutralBody,
  tagColor: "#eee",
  avatarColor: Ft(Te.alphaAvatar),
  invertedColor: "rgb(0, 20, 40)",
  inputColor: Ft(Te.alphaInput),
  codeColor: "rgb(244, 244, 248)",
  tabColor: "rgb(247, 247, 250)",
  actionColor: "rgb(250, 250, 252)",
  tableHeaderColor: "rgb(250, 250, 252)",
  hoverColor: "rgb(243, 243, 245)",
  // use color with alpha since it can be nested with header filter & sorter effect
  tableColorHover: "rgba(0, 0, 100, 0.03)",
  tableColorStriped: "rgba(0, 0, 100, 0.02)",
  pressedColor: "rgb(237, 237, 239)",
  opacityDisabled: Te.alphaDisabled,
  inputColorDisabled: "rgb(250, 250, 252)",
  // secondary button color
  // can also be used in tertiary button & quaternary button
  buttonColor2: "rgba(46, 51, 56, .05)",
  buttonColor2Hover: "rgba(46, 51, 56, .09)",
  buttonColor2Pressed: "rgba(46, 51, 56, .13)",
  boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
  boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
  boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
}), kk = {
  railInsetHorizontalBottom: "auto 2px 4px 2px",
  railInsetHorizontalTop: "4px 2px auto 2px",
  railInsetVerticalRight: "2px 4px 2px auto",
  railInsetVerticalLeft: "2px auto 2px 4px",
  railColor: "transparent"
};
function Pk(e) {
  const {
    scrollbarColor: t,
    scrollbarColorHover: n,
    scrollbarHeight: o,
    scrollbarWidth: r,
    scrollbarBorderRadius: i
  } = e;
  return Object.assign(Object.assign({}, kk), {
    height: o,
    width: r,
    borderRadius: i,
    color: t,
    colorHover: n
  });
}
const gi = {
  name: "Scrollbar",
  common: mt,
  self: Pk
}, _k = z("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [H(">", [z("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `, [H("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), H(">", [
  // We can't set overflow hidden since it affects positioning.
  z("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)
])])]), H(">, +", [z("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `, [U("horizontal", `
 height: var(--n-scrollbar-height);
 `, [H(">", [B("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), U("horizontal--top", `
 top: var(--n-scrollbar-rail-top-horizontal-top); 
 right: var(--n-scrollbar-rail-right-horizontal-top); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-top); 
 left: var(--n-scrollbar-rail-left-horizontal-top); 
 `), U("horizontal--bottom", `
 top: var(--n-scrollbar-rail-top-horizontal-bottom); 
 right: var(--n-scrollbar-rail-right-horizontal-bottom); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-bottom); 
 left: var(--n-scrollbar-rail-left-horizontal-bottom); 
 `), U("vertical", `
 width: var(--n-scrollbar-width);
 `, [H(">", [B("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), U("vertical--left", `
 top: var(--n-scrollbar-rail-top-vertical-left); 
 right: var(--n-scrollbar-rail-right-vertical-left); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-left); 
 left: var(--n-scrollbar-rail-left-vertical-left); 
 `), U("vertical--right", `
 top: var(--n-scrollbar-rail-top-vertical-right); 
 right: var(--n-scrollbar-rail-right-vertical-right); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-right); 
 left: var(--n-scrollbar-rail-left-vertical-right); 
 `), U("disabled", [H(">", [B("scrollbar", "pointer-events: none;")])]), H(">", [B("scrollbar", `
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [Sk(), H("&:hover", "background-color: var(--n-scrollbar-color-hover);")])])])])]), Lt = window.Vue.computed, Tk = window.Vue.defineComponent, Fk = window.Vue.Fragment, rn = window.Vue.h, Ek = window.Vue.mergeProps, zk = window.Vue.onBeforeUnmount, Ok = window.Vue.onMounted, Dt = window.Vue.ref, Lu = window.Vue.Transition, Mk = window.Vue.watchEffect, Ik = Object.assign(Object.assign({}, ke.props), {
  duration: {
    type: Number,
    default: 0
  },
  scrollable: {
    type: Boolean,
    default: !0
  },
  xScrollable: Boolean,
  trigger: {
    type: String,
    default: "hover"
  },
  useUnifiedContainer: Boolean,
  triggerDisplayManually: Boolean,
  // If container is set, resize observer won't not attached
  container: Function,
  content: Function,
  containerClass: String,
  containerStyle: [String, Object],
  contentClass: [String, Array],
  contentStyle: [String, Object],
  horizontalRailStyle: [String, Object],
  verticalRailStyle: [String, Object],
  onScroll: Function,
  onWheel: Function,
  onResize: Function,
  internalOnUpdateScrollLeft: Function,
  internalHoistYRail: Boolean,
  yPlacement: {
    type: String,
    default: "right"
  },
  xPlacement: {
    type: String,
    default: "bottom"
  }
}), mi = Tk({
  name: "Scrollbar",
  props: Ik,
  inheritAttrs: !1,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n,
      mergedRtlRef: o
    } = je(e), r = At("Scrollbar", o, t), i = Dt(null), l = Dt(null), a = Dt(null), s = Dt(null), d = Dt(null), c = Dt(null), h = Dt(null), p = Dt(null), g = Dt(null), f = Dt(null), v = Dt(null), m = Dt(0), u = Dt(0), w = Dt(!1), x = Dt(!1);
    let b = !1, C = !1, S, y, T = 0, R = 0, E = 0, W = 0;
    const _ = _w(), M = ke("Scrollbar", "-scrollbar", _k, gi, e, t), I = Lt(() => {
      const {
        value: P
      } = p, {
        value: N
      } = c, {
        value: te
      } = f;
      return P === null || N === null || te === null ? 0 : Math.min(P, te * P / N + Rt(M.value.self.width) * 1.5);
    }), O = Lt(() => `${I.value}px`), K = Lt(() => {
      const {
        value: P
      } = g, {
        value: N
      } = h, {
        value: te
      } = v;
      return P === null || N === null || te === null ? 0 : te * P / N + Rt(M.value.self.height) * 1.5;
    }), L = Lt(() => `${K.value}px`), Y = Lt(() => {
      const {
        value: P
      } = p, {
        value: N
      } = m, {
        value: te
      } = c, {
        value: se
      } = f;
      if (P === null || te === null || se === null)
        return 0;
      {
        const ue = te - P;
        return ue ? N / ue * (se - I.value) : 0;
      }
    }), Q = Lt(() => `${Y.value}px`), J = Lt(() => {
      const {
        value: P
      } = g, {
        value: N
      } = u, {
        value: te
      } = h, {
        value: se
      } = v;
      if (P === null || te === null || se === null)
        return 0;
      {
        const ue = te - P;
        return ue ? N / ue * (se - K.value) : 0;
      }
    }), q = Lt(() => `${J.value}px`), A = Lt(() => {
      const {
        value: P
      } = p, {
        value: N
      } = c;
      return P !== null && N !== null && N > P;
    }), G = Lt(() => {
      const {
        value: P
      } = g, {
        value: N
      } = h;
      return P !== null && N !== null && N > P;
    }), Z = Lt(() => {
      const {
        trigger: P
      } = e;
      return P === "none" || w.value;
    }), ae = Lt(() => {
      const {
        trigger: P
      } = e;
      return P === "none" || x.value;
    }), le = Lt(() => {
      const {
        container: P
      } = e;
      return P ? P() : l.value;
    }), de = Lt(() => {
      const {
        content: P
      } = e;
      return P ? P() : a.value;
    }), ge = (P, N) => {
      if (!e.scrollable) return;
      if (typeof P == "number") {
        $e(P, N ?? 0, 0, !1, "auto");
        return;
      }
      const {
        left: te,
        top: se,
        index: ue,
        elSize: be,
        position: we,
        behavior: Ce,
        el: Ve,
        debounce: it = !0
      } = P;
      (te !== void 0 || se !== void 0) && $e(te ?? 0, se ?? 0, 0, !1, Ce), Ve !== void 0 ? $e(0, Ve.offsetTop, Ve.offsetHeight, it, Ce) : ue !== void 0 && be !== void 0 ? $e(0, ue * be, be, it, Ce) : we === "bottom" ? $e(0, Number.MAX_SAFE_INTEGER, 0, !1, Ce) : we === "top" && $e(0, 0, 0, !1, Ce);
    }, X = Qw(() => {
      e.container || ge({
        top: m.value,
        left: u.value
      });
    }), ce = () => {
      X.isDeactivated || j();
    }, Pe = (P) => {
      if (X.isDeactivated) return;
      const {
        onResize: N
      } = e;
      N && N(P), j();
    }, me = (P, N) => {
      if (!e.scrollable) return;
      const {
        value: te
      } = le;
      te && (typeof P == "object" ? te.scrollBy(P) : te.scrollBy(P, N || 0));
    };
    function $e(P, N, te, se, ue) {
      const {
        value: be
      } = le;
      if (be) {
        if (se) {
          const {
            scrollTop: we,
            offsetHeight: Ce
          } = be;
          if (N > we) {
            N + te <= we + Ce || be.scrollTo({
              left: P,
              top: N + te - Ce,
              behavior: ue
            });
            return;
          }
        }
        be.scrollTo({
          left: P,
          top: N,
          behavior: ue
        });
      }
    }
    function Se() {
      $(), D(), j();
    }
    function Le() {
      Ie();
    }
    function Ie() {
      re(), k();
    }
    function re() {
      y !== void 0 && window.clearTimeout(y), y = window.setTimeout(() => {
        x.value = !1;
      }, e.duration);
    }
    function k() {
      S !== void 0 && window.clearTimeout(S), S = window.setTimeout(() => {
        w.value = !1;
      }, e.duration);
    }
    function $() {
      S !== void 0 && window.clearTimeout(S), w.value = !0;
    }
    function D() {
      y !== void 0 && window.clearTimeout(y), x.value = !0;
    }
    function ee(P) {
      const {
        onScroll: N
      } = e;
      N && N(P), ve();
    }
    function ve() {
      const {
        value: P
      } = le;
      P && (m.value = P.scrollTop, u.value = P.scrollLeft * (r != null && r.value ? -1 : 1));
    }
    function he() {
      const {
        value: P
      } = de;
      P && (c.value = P.offsetHeight, h.value = P.offsetWidth);
      const {
        value: N
      } = le;
      N && (p.value = N.offsetHeight, g.value = N.offsetWidth);
      const {
        value: te
      } = d, {
        value: se
      } = s;
      te && (v.value = te.offsetWidth), se && (f.value = se.offsetHeight);
    }
    function F() {
      const {
        value: P
      } = le;
      P && (m.value = P.scrollTop, u.value = P.scrollLeft * (r != null && r.value ? -1 : 1), p.value = P.offsetHeight, g.value = P.offsetWidth, c.value = P.scrollHeight, h.value = P.scrollWidth);
      const {
        value: N
      } = d, {
        value: te
      } = s;
      N && (v.value = N.offsetWidth), te && (f.value = te.offsetHeight);
    }
    function j() {
      e.scrollable && (e.useUnifiedContainer ? F() : (he(), ve()));
    }
    function pe(P) {
      var N;
      return !(!((N = i.value) === null || N === void 0) && N.contains(ii(P)));
    }
    function Fe(P) {
      P.preventDefault(), P.stopPropagation(), C = !0, st("mousemove", window, dt, !0), st("mouseup", window, bt, !0), R = u.value, E = r != null && r.value ? window.innerWidth - P.clientX : P.clientX;
    }
    function dt(P) {
      if (!C) return;
      S !== void 0 && window.clearTimeout(S), y !== void 0 && window.clearTimeout(y);
      const {
        value: N
      } = g, {
        value: te
      } = h, {
        value: se
      } = K;
      if (N === null || te === null) return;
      const be = (r != null && r.value ? window.innerWidth - P.clientX - E : P.clientX - E) * (te - N) / (N - se), we = te - N;
      let Ce = R + be;
      Ce = Math.min(we, Ce), Ce = Math.max(Ce, 0);
      const {
        value: Ve
      } = le;
      if (Ve) {
        Ve.scrollLeft = Ce * (r != null && r.value ? -1 : 1);
        const {
          internalOnUpdateScrollLeft: it
        } = e;
        it && it(Ce);
      }
    }
    function bt(P) {
      P.preventDefault(), P.stopPropagation(), et("mousemove", window, dt, !0), et("mouseup", window, bt, !0), C = !1, j(), pe(P) && Ie();
    }
    function Je(P) {
      P.preventDefault(), P.stopPropagation(), b = !0, st("mousemove", window, Qe, !0), st("mouseup", window, wt, !0), T = m.value, W = P.clientY;
    }
    function Qe(P) {
      if (!b) return;
      S !== void 0 && window.clearTimeout(S), y !== void 0 && window.clearTimeout(y);
      const {
        value: N
      } = p, {
        value: te
      } = c, {
        value: se
      } = I;
      if (N === null || te === null) return;
      const be = (P.clientY - W) * (te - N) / (N - se), we = te - N;
      let Ce = T + be;
      Ce = Math.min(we, Ce), Ce = Math.max(Ce, 0);
      const {
        value: Ve
      } = le;
      Ve && (Ve.scrollTop = Ce);
    }
    function wt(P) {
      P.preventDefault(), P.stopPropagation(), et("mousemove", window, Qe, !0), et("mouseup", window, wt, !0), b = !1, j(), pe(P) && Ie();
    }
    Mk(() => {
      const {
        value: P
      } = G, {
        value: N
      } = A, {
        value: te
      } = t, {
        value: se
      } = d, {
        value: ue
      } = s;
      se && (P ? se.classList.remove(`${te}-scrollbar-rail--disabled`) : se.classList.add(`${te}-scrollbar-rail--disabled`)), ue && (N ? ue.classList.remove(`${te}-scrollbar-rail--disabled`) : ue.classList.add(`${te}-scrollbar-rail--disabled`));
    }), Ok(() => {
      e.container || j();
    }), zk(() => {
      S !== void 0 && window.clearTimeout(S), y !== void 0 && window.clearTimeout(y), et("mousemove", window, Qe, !0), et("mouseup", window, wt, !0);
    });
    const nt = Lt(() => {
      const {
        common: {
          cubicBezierEaseInOut: P
        },
        self: {
          color: N,
          colorHover: te,
          height: se,
          width: ue,
          borderRadius: be,
          railInsetHorizontalTop: we,
          railInsetHorizontalBottom: Ce,
          railInsetVerticalRight: Ve,
          railInsetVerticalLeft: it,
          railColor: He
        }
      } = M.value, {
        top: Tt,
        right: Vt,
        bottom: Bt,
        left: Wt
      } = en(we), {
        top: Ut,
        right: on,
        bottom: Kt,
        left: V
      } = en(Ce), {
        top: ne,
        right: xe,
        bottom: ze,
        left: We
      } = en(r != null && r.value ? Xc(Ve) : Ve), {
        top: Be,
        right: at,
        bottom: ht,
        left: Jt
      } = en(r != null && r.value ? Xc(it) : it);
      return {
        "--n-scrollbar-bezier": P,
        "--n-scrollbar-color": N,
        "--n-scrollbar-color-hover": te,
        "--n-scrollbar-border-radius": be,
        "--n-scrollbar-width": ue,
        "--n-scrollbar-height": se,
        "--n-scrollbar-rail-top-horizontal-top": Tt,
        "--n-scrollbar-rail-right-horizontal-top": Vt,
        "--n-scrollbar-rail-bottom-horizontal-top": Bt,
        "--n-scrollbar-rail-left-horizontal-top": Wt,
        "--n-scrollbar-rail-top-horizontal-bottom": Ut,
        "--n-scrollbar-rail-right-horizontal-bottom": on,
        "--n-scrollbar-rail-bottom-horizontal-bottom": Kt,
        "--n-scrollbar-rail-left-horizontal-bottom": V,
        "--n-scrollbar-rail-top-vertical-right": ne,
        "--n-scrollbar-rail-right-vertical-right": xe,
        "--n-scrollbar-rail-bottom-vertical-right": ze,
        "--n-scrollbar-rail-left-vertical-right": We,
        "--n-scrollbar-rail-top-vertical-left": Be,
        "--n-scrollbar-rail-right-vertical-left": at,
        "--n-scrollbar-rail-bottom-vertical-left": ht,
        "--n-scrollbar-rail-left-vertical-left": Jt,
        "--n-scrollbar-rail-color": He
      };
    }), fe = n ? St("scrollbar", void 0, nt, e) : void 0;
    return Object.assign(Object.assign({}, {
      scrollTo: ge,
      scrollBy: me,
      sync: j,
      syncUnifiedContainer: F,
      handleMouseEnterWrapper: Se,
      handleMouseLeaveWrapper: Le
    }), {
      mergedClsPrefix: t,
      rtlEnabled: r,
      containerScrollTop: m,
      wrapperRef: i,
      containerRef: l,
      contentRef: a,
      yRailRef: s,
      xRailRef: d,
      needYBar: A,
      needXBar: G,
      yBarSizePx: O,
      xBarSizePx: L,
      yBarTopPx: Q,
      xBarLeftPx: q,
      isShowXBar: Z,
      isShowYBar: ae,
      isIos: _,
      handleScroll: ee,
      handleContentResize: ce,
      handleContainerResize: Pe,
      handleYScrollMouseDown: Je,
      handleXScrollMouseDown: Fe,
      cssVars: n ? void 0 : nt,
      themeClass: fe == null ? void 0 : fe.themeClass,
      onRender: fe == null ? void 0 : fe.onRender
    });
  },
  render() {
    var e;
    const {
      $slots: t,
      mergedClsPrefix: n,
      triggerDisplayManually: o,
      rtlEnabled: r,
      internalHoistYRail: i,
      yPlacement: l,
      xPlacement: a,
      xScrollable: s
    } = this;
    if (!this.scrollable) return (e = t.default) === null || e === void 0 ? void 0 : e.call(t);
    const d = this.trigger === "none", c = (g, f) => rn("div", {
      ref: "yRailRef",
      class: [`${n}-scrollbar-rail`, `${n}-scrollbar-rail--vertical`, `${n}-scrollbar-rail--vertical--${l}`, g],
      "data-scrollbar-rail": !0,
      style: [f || "", this.verticalRailStyle],
      "aria-hidden": !0
    }, rn(d ? Es : Lu, d ? null : {
      name: "fade-in-transition"
    }, {
      default: () => this.needYBar && this.isShowYBar && !this.isIos ? rn("div", {
        class: `${n}-scrollbar-rail__scrollbar`,
        style: {
          height: this.yBarSizePx,
          top: this.yBarTopPx
        },
        onMousedown: this.handleYScrollMouseDown
      }) : null
    })), h = () => {
      var g, f;
      return (g = this.onRender) === null || g === void 0 || g.call(this), rn("div", Ek(this.$attrs, {
        role: "none",
        ref: "wrapperRef",
        class: [`${n}-scrollbar`, this.themeClass, r && `${n}-scrollbar--rtl`],
        style: this.cssVars,
        onMouseenter: o ? void 0 : this.handleMouseEnterWrapper,
        onMouseleave: o ? void 0 : this.handleMouseLeaveWrapper
      }), [this.container ? (f = t.default) === null || f === void 0 ? void 0 : f.call(t) : rn("div", {
        role: "none",
        ref: "containerRef",
        class: [`${n}-scrollbar-container`, this.containerClass],
        style: this.containerStyle,
        onScroll: this.handleScroll,
        onWheel: this.onWheel
      }, rn(Mo, {
        onResize: this.handleContentResize
      }, {
        default: () => rn("div", {
          ref: "contentRef",
          role: "none",
          style: [{
            width: this.xScrollable ? "fit-content" : null
          }, this.contentStyle],
          class: [`${n}-scrollbar-content`, this.contentClass]
        }, t)
      })), i ? null : c(void 0, void 0), s && rn("div", {
        ref: "xRailRef",
        class: [`${n}-scrollbar-rail`, `${n}-scrollbar-rail--horizontal`, `${n}-scrollbar-rail--horizontal--${a}`],
        style: this.horizontalRailStyle,
        "data-scrollbar-rail": !0,
        "aria-hidden": !0
      }, rn(d ? Es : Lu, d ? null : {
        name: "fade-in-transition"
      }, {
        default: () => this.needXBar && this.isShowXBar && !this.isIos ? rn("div", {
          class: `${n}-scrollbar-rail__scrollbar`,
          style: {
            width: this.xBarSizePx,
            right: r ? this.xBarLeftPx : void 0,
            left: r ? void 0 : this.xBarLeftPx
          },
          onMousedown: this.handleXScrollMouseDown
        }) : null
      }))]);
    }, p = this.container ? h() : rn(Mo, {
      onResize: this.handleContainerResize
    }, {
      default: h
    });
    return i ? rn(Fk, null, p, c(this.themeClass, this.cssVars)) : p;
  }
}), sv = mi;
function Du(e) {
  return Array.isArray(e) ? e : [e];
}
const Hs = {
  STOP: "STOP"
};
function dv(e, t) {
  const n = t(e);
  e.children !== void 0 && n !== Hs.STOP && e.children.forEach((o) => dv(o, t));
}
function Ak(e, t = {}) {
  const { preserveGroup: n = !1 } = t, o = [], r = n ? (l) => {
    l.isLeaf || (o.push(l.key), i(l.children));
  } : (l) => {
    l.isLeaf || (l.isGroup || o.push(l.key), i(l.children));
  };
  function i(l) {
    l.forEach(r);
  }
  return i(e), o;
}
function Vk(e, t) {
  const { isLeaf: n } = e;
  return n !== void 0 ? n : !t(e);
}
function Bk(e) {
  return e.children;
}
function Lk(e) {
  return e.key;
}
function Dk() {
  return !1;
}
function Nk(e, t) {
  const { isLeaf: n } = e;
  return !(n === !1 && !Array.isArray(t(e)));
}
function Hk(e) {
  return e.disabled === !0;
}
function jk(e, t) {
  return e.isLeaf === !1 && !Array.isArray(t(e));
}
function Il(e) {
  var t;
  return e == null ? [] : Array.isArray(e) ? e : (t = e.checkedKeys) !== null && t !== void 0 ? t : [];
}
function Al(e) {
  var t;
  return e == null || Array.isArray(e) ? [] : (t = e.indeterminateKeys) !== null && t !== void 0 ? t : [];
}
function Wk(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) || n.add(o);
  }), Array.from(n);
}
function Uk(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) && n.delete(o);
  }), Array.from(n);
}
function Kk(e) {
  return (e == null ? void 0 : e.type) === "group";
}
function qk(e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((n, o) => {
    t.set(n.key, o);
  }), (n) => {
    var o;
    return (o = t.get(n)) !== null && o !== void 0 ? o : null;
  };
}
class Gk extends Error {
  constructor() {
    super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
  }
}
function Xk(e, t, n, o) {
  return Va(t.concat(e), n, o, !1);
}
function Yk(e, t) {
  const n = /* @__PURE__ */ new Set();
  return e.forEach((o) => {
    const r = t.treeNodeMap.get(o);
    if (r !== void 0) {
      let i = r.parent;
      for (; i !== null && !(i.disabled || n.has(i.key)); )
        n.add(i.key), i = i.parent;
    }
  }), n;
}
function Zk(e, t, n, o) {
  const r = Va(t, n, o, !1), i = Va(e, n, o, !0), l = Yk(e, n), a = [];
  return r.forEach((s) => {
    (i.has(s) || l.has(s)) && a.push(s);
  }), a.forEach((s) => r.delete(s)), r;
}
function Vl(e, t) {
  const { checkedKeys: n, keysToCheck: o, keysToUncheck: r, indeterminateKeys: i, cascade: l, leafOnly: a, checkStrategy: s, allowNotLoaded: d } = e;
  if (!l)
    return o !== void 0 ? {
      checkedKeys: Wk(n, o),
      indeterminateKeys: Array.from(i)
    } : r !== void 0 ? {
      checkedKeys: Uk(n, r),
      indeterminateKeys: Array.from(i)
    } : {
      checkedKeys: Array.from(n),
      indeterminateKeys: Array.from(i)
    };
  const { levelTreeNodeMap: c } = t;
  let h;
  r !== void 0 ? h = Zk(r, n, t, d) : o !== void 0 ? h = Xk(o, n, t, d) : h = Va(n, t, d, !1);
  const p = s === "parent", g = s === "child" || a, f = h, v = /* @__PURE__ */ new Set(), m = Math.max.apply(null, Array.from(c.keys()));
  for (let u = m; u >= 0; u -= 1) {
    const w = u === 0, x = c.get(u);
    for (const b of x) {
      if (b.isLeaf)
        continue;
      const { key: C, shallowLoaded: S } = b;
      if (g && S && b.children.forEach((E) => {
        !E.disabled && !E.isLeaf && E.shallowLoaded && f.has(E.key) && f.delete(E.key);
      }), b.disabled || !S)
        continue;
      let y = !0, T = !1, R = !0;
      for (const E of b.children) {
        const W = E.key;
        if (!E.disabled) {
          if (R && (R = !1), f.has(W))
            T = !0;
          else if (v.has(W)) {
            T = !0, y = !1;
            break;
          } else if (y = !1, T)
            break;
        }
      }
      y && !R ? (p && b.children.forEach((E) => {
        !E.disabled && f.has(E.key) && f.delete(E.key);
      }), f.add(C)) : T && v.add(C), w && g && f.has(C) && f.delete(C);
    }
  }
  return {
    checkedKeys: Array.from(f),
    indeterminateKeys: Array.from(v)
  };
}
function Va(e, t, n, o) {
  const { treeNodeMap: r, getChildren: i } = t, l = /* @__PURE__ */ new Set(), a = new Set(e);
  return e.forEach((s) => {
    const d = r.get(s);
    d !== void 0 && dv(d, (c) => {
      if (c.disabled)
        return Hs.STOP;
      const { key: h } = c;
      if (!l.has(h) && (l.add(h), a.add(h), jk(c.rawNode, i))) {
        if (o)
          return Hs.STOP;
        if (!n)
          throw new Gk();
      }
    });
  }), a;
}
function Jk(e, { includeGroup: t = !1, includeSelf: n = !0 }, o) {
  var r;
  const i = o.treeNodeMap;
  let l = e == null ? null : (r = i.get(e)) !== null && r !== void 0 ? r : null;
  const a = {
    keyPath: [],
    treeNodePath: [],
    treeNode: l
  };
  if (l != null && l.ignored)
    return a.treeNode = null, a;
  for (; l; )
    !l.ignored && (t || !l.isGroup) && a.treeNodePath.push(l), l = l.parent;
  return a.treeNodePath.reverse(), n || a.treeNodePath.pop(), a.keyPath = a.treeNodePath.map((s) => s.key), a;
}
function Qk(e) {
  if (e.length === 0)
    return null;
  const t = e[0];
  return t.isGroup || t.ignored || t.disabled ? t.getNext() : t;
}
function e2(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r + 1) % o] : r === n.length - 1 ? null : n[r + 1];
}
function Nu(e, t, { loop: n = !1, includeDisabled: o = !1 } = {}) {
  const r = t === "prev" ? t2 : e2, i = {
    reverse: t === "prev"
  };
  let l = !1, a = null;
  function s(d) {
    if (d !== null) {
      if (d === e) {
        if (!l)
          l = !0;
        else if (!e.disabled && !e.isGroup) {
          a = e;
          return;
        }
      } else if ((!d.disabled || o) && !d.ignored && !d.isGroup) {
        a = d;
        return;
      }
      if (d.isGroup) {
        const c = Ed(d, i);
        c !== null ? a = c : s(r(d, n));
      } else {
        const c = r(d, !1);
        if (c !== null)
          s(c);
        else {
          const h = n2(d);
          h != null && h.isGroup ? s(r(h, n)) : n && s(r(d, !0));
        }
      }
    }
  }
  return s(e), a;
}
function t2(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r - 1 + o) % o] : r === 0 ? null : n[r - 1];
}
function n2(e) {
  return e.parent;
}
function Ed(e, t = {}) {
  const { reverse: n = !1 } = t, { children: o } = e;
  if (o) {
    const { length: r } = o, i = n ? r - 1 : 0, l = n ? -1 : r, a = n ? -1 : 1;
    for (let s = i; s !== l; s += a) {
      const d = o[s];
      if (!d.disabled && !d.ignored)
        if (d.isGroup) {
          const c = Ed(d, t);
          if (c !== null)
            return c;
        } else
          return d;
    }
  }
  return null;
}
const o2 = {
  getChild() {
    return this.ignored ? null : Ed(this);
  },
  getParent() {
    const { parent: e } = this;
    return e != null && e.isGroup ? e.getParent() : e;
  },
  getNext(e = {}) {
    return Nu(this, "next", e);
  },
  getPrev(e = {}) {
    return Nu(this, "prev", e);
  }
};
function r2(e, t) {
  const n = t ? new Set(t) : void 0, o = [];
  function r(i) {
    i.forEach((l) => {
      o.push(l), !(l.isLeaf || !l.children || l.ignored) && (l.isGroup || // normal non-leaf node
      n === void 0 || n.has(l.key)) && r(l.children);
    });
  }
  return r(e), o;
}
function i2(e, t) {
  const n = e.key;
  for (; t; ) {
    if (t.key === n)
      return !0;
    t = t.parent;
  }
  return !1;
}
function cv(e, t, n, o, r, i = null, l = 0) {
  const a = [];
  return e.forEach((s, d) => {
    var c;
    const h = Object.create(o);
    if (h.rawNode = s, h.siblings = a, h.level = l, h.index = d, h.isFirstChild = d === 0, h.isLastChild = d + 1 === e.length, h.parent = i, !h.ignored) {
      const p = r(s);
      Array.isArray(p) && (h.children = cv(p, t, n, o, r, h, l + 1));
    }
    a.push(h), t.set(h.key, h), n.has(l) || n.set(l, []), (c = n.get(l)) === null || c === void 0 || c.push(h);
  }), a;
}
function Xa(e, t = {}) {
  var n;
  const o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), { getDisabled: i = Hk, getIgnored: l = Dk, getIsGroup: a = Kk, getKey: s = Lk } = t, d = (n = t.getChildren) !== null && n !== void 0 ? n : Bk, c = t.ignoreEmptyChildren ? (b) => {
    const C = d(b);
    return Array.isArray(C) ? C.length ? C : null : C;
  } : d, h = Object.assign({
    get key() {
      return s(this.rawNode);
    },
    get disabled() {
      return i(this.rawNode);
    },
    get isGroup() {
      return a(this.rawNode);
    },
    get isLeaf() {
      return Vk(this.rawNode, c);
    },
    get shallowLoaded() {
      return Nk(this.rawNode, c);
    },
    get ignored() {
      return l(this.rawNode);
    },
    contains(b) {
      return i2(this, b);
    }
  }, o2), p = cv(e, o, r, h, c);
  function g(b) {
    if (b == null)
      return null;
    const C = o.get(b);
    return C && !C.isGroup && !C.ignored ? C : null;
  }
  function f(b) {
    if (b == null)
      return null;
    const C = o.get(b);
    return C && !C.ignored ? C : null;
  }
  function v(b, C) {
    const S = f(b);
    return S ? S.getPrev(C) : null;
  }
  function m(b, C) {
    const S = f(b);
    return S ? S.getNext(C) : null;
  }
  function u(b) {
    const C = f(b);
    return C ? C.getParent() : null;
  }
  function w(b) {
    const C = f(b);
    return C ? C.getChild() : null;
  }
  const x = {
    treeNodes: p,
    treeNodeMap: o,
    levelTreeNodeMap: r,
    maxLevel: Math.max(...r.keys()),
    getChildren: c,
    getFlattenedNodes(b) {
      return r2(p, b);
    },
    getNode: g,
    getPrev: v,
    getNext: m,
    getParent: u,
    getChild: w,
    getFirstAvailableNode() {
      return Qk(p);
    },
    getPath(b, C = {}) {
      return Jk(b, C, x);
    },
    getCheckedKeys(b, C = {}) {
      const { cascade: S = !0, leafOnly: y = !1, checkStrategy: T = "all", allowNotLoaded: R = !1 } = C;
      return Vl({
        checkedKeys: Il(b),
        indeterminateKeys: Al(b),
        cascade: S,
        leafOnly: y,
        checkStrategy: T,
        allowNotLoaded: R
      }, x);
    },
    check(b, C, S = {}) {
      const { cascade: y = !0, leafOnly: T = !1, checkStrategy: R = "all", allowNotLoaded: E = !1 } = S;
      return Vl({
        checkedKeys: Il(C),
        indeterminateKeys: Al(C),
        keysToCheck: b == null ? [] : Du(b),
        cascade: y,
        leafOnly: T,
        checkStrategy: R,
        allowNotLoaded: E
      }, x);
    },
    uncheck(b, C, S = {}) {
      const { cascade: y = !0, leafOnly: T = !1, checkStrategy: R = "all", allowNotLoaded: E = !1 } = S;
      return Vl({
        checkedKeys: Il(C),
        indeterminateKeys: Al(C),
        keysToUncheck: b == null ? [] : Du(b),
        cascade: y,
        leafOnly: T,
        checkStrategy: R,
        allowNotLoaded: E
      }, x);
    },
    getNonLeafKeys(b = {}) {
      return Ak(p, b);
    }
  };
  return x;
}
const a2 = {
  iconSizeTiny: "28px",
  iconSizeSmall: "34px",
  iconSizeMedium: "40px",
  iconSizeLarge: "46px",
  iconSizeHuge: "52px"
};
function l2(e) {
  const {
    textColorDisabled: t,
    iconColor: n,
    textColor2: o,
    fontSizeTiny: r,
    fontSizeSmall: i,
    fontSizeMedium: l,
    fontSizeLarge: a,
    fontSizeHuge: s
  } = e;
  return Object.assign(Object.assign({}, a2), {
    fontSizeTiny: r,
    fontSizeSmall: i,
    fontSizeMedium: l,
    fontSizeLarge: a,
    fontSizeHuge: s,
    textColor: t,
    iconColor: n,
    extraTextColor: o
  });
}
const zd = {
  name: "Empty",
  common: mt,
  self: l2
}, s2 = z("empty", `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [B("icon", `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [H("+", [B("description", `
 margin-top: 8px;
 `)])]), B("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), B("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]), Mr = window.Vue.computed, d2 = window.Vue.defineComponent, Xo = window.Vue.h, c2 = Object.assign(Object.assign({}, ke.props), {
  description: String,
  showDescription: {
    type: Boolean,
    default: !0
  },
  showIcon: {
    type: Boolean,
    default: !0
  },
  size: {
    type: String,
    default: "medium"
  },
  renderIcon: Function
}), uv = d2({
  name: "Empty",
  props: c2,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n,
      mergedComponentPropsRef: o
    } = je(e), r = ke("Empty", "-empty", s2, zd, e, t), {
      localeRef: i
    } = vr("Empty"), l = Mr(() => {
      var c, h, p;
      return (c = e.description) !== null && c !== void 0 ? c : (p = (h = o == null ? void 0 : o.value) === null || h === void 0 ? void 0 : h.Empty) === null || p === void 0 ? void 0 : p.description;
    }), a = Mr(() => {
      var c, h;
      return ((h = (c = o == null ? void 0 : o.value) === null || c === void 0 ? void 0 : c.Empty) === null || h === void 0 ? void 0 : h.renderIcon) || (() => Xo(UR, null));
    }), s = Mr(() => {
      const {
        size: c
      } = e, {
        common: {
          cubicBezierEaseInOut: h
        },
        self: {
          [oe("iconSize", c)]: p,
          [oe("fontSize", c)]: g,
          textColor: f,
          iconColor: v,
          extraTextColor: m
        }
      } = r.value;
      return {
        "--n-icon-size": p,
        "--n-font-size": g,
        "--n-bezier": h,
        "--n-text-color": f,
        "--n-icon-color": v,
        "--n-extra-text-color": m
      };
    }), d = n ? St("empty", Mr(() => {
      let c = "";
      const {
        size: h
      } = e;
      return c += h[0], c;
    }), s, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedRenderIcon: a,
      localizedDescription: Mr(() => l.value || i.value.description),
      cssVars: n ? void 0 : s,
      themeClass: d == null ? void 0 : d.themeClass,
      onRender: d == null ? void 0 : d.onRender
    };
  },
  render() {
    const {
      $slots: e,
      mergedClsPrefix: t,
      onRender: n
    } = this;
    return n == null || n(), Xo("div", {
      class: [`${t}-empty`, this.themeClass],
      style: this.cssVars
    }, this.showIcon ? Xo("div", {
      class: `${t}-empty__icon`
    }, e.icon ? e.icon() : Xo(Ct, {
      clsPrefix: t
    }, {
      default: this.mergedRenderIcon
    })) : null, this.showDescription ? Xo("div", {
      class: `${t}-empty__description`
    }, e.default ? e.default() : this.localizedDescription) : null, e.extra ? Xo("div", {
      class: `${t}-empty__extra`
    }, e.extra()) : null);
  }
}), u2 = {
  height: "calc(var(--n-option-height) * 7.6)",
  paddingTiny: "4px 0",
  paddingSmall: "4px 0",
  paddingMedium: "4px 0",
  paddingLarge: "4px 0",
  paddingHuge: "4px 0",
  optionPaddingTiny: "0 12px",
  optionPaddingSmall: "0 12px",
  optionPaddingMedium: "0 12px",
  optionPaddingLarge: "0 12px",
  optionPaddingHuge: "0 12px",
  loadingSize: "18px"
};
function f2(e) {
  const {
    borderRadius: t,
    popoverColor: n,
    textColor3: o,
    dividerColor: r,
    textColor2: i,
    primaryColorPressed: l,
    textColorDisabled: a,
    primaryColor: s,
    opacityDisabled: d,
    hoverColor: c,
    fontSizeTiny: h,
    fontSizeSmall: p,
    fontSizeMedium: g,
    fontSizeLarge: f,
    fontSizeHuge: v,
    heightTiny: m,
    heightSmall: u,
    heightMedium: w,
    heightLarge: x,
    heightHuge: b
  } = e;
  return Object.assign(Object.assign({}, u2), {
    optionFontSizeTiny: h,
    optionFontSizeSmall: p,
    optionFontSizeMedium: g,
    optionFontSizeLarge: f,
    optionFontSizeHuge: v,
    optionHeightTiny: m,
    optionHeightSmall: u,
    optionHeightMedium: w,
    optionHeightLarge: x,
    optionHeightHuge: b,
    borderRadius: t,
    color: n,
    groupHeaderTextColor: o,
    actionDividerColor: r,
    optionTextColor: i,
    optionTextColorPressed: l,
    optionTextColorDisabled: a,
    optionTextColorActive: s,
    optionOpacityDisabled: d,
    optionCheckColor: s,
    optionColorPending: c,
    optionColorActive: "rgba(0, 0, 0, 0)",
    optionColorActivePending: c,
    actionTextColor: i,
    loadingColor: s
  });
}
const Od = {
  name: "InternalSelectMenu",
  common: mt,
  peers: {
    Scrollbar: gi,
    Empty: zd
  },
  self: f2
}, h2 = window.Vue.defineComponent, p2 = window.Vue.h, v2 = window.Vue.inject, Hu = h2({
  name: "NBaseSelectGroupHeader",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    },
    tmNode: {
      type: Object,
      required: !0
    }
  },
  setup() {
    const {
      renderLabelRef: e,
      renderOptionRef: t,
      labelFieldRef: n,
      nodePropsRef: o
    } = v2(dd);
    return {
      labelField: n,
      nodeProps: o,
      renderLabel: e,
      renderOption: t
    };
  },
  render() {
    const {
      clsPrefix: e,
      renderLabel: t,
      renderOption: n,
      nodeProps: o,
      tmNode: {
        rawNode: r
      }
    } = this, i = o == null ? void 0 : o(r), l = t ? t(r, !1) : _n(r[this.labelField], r, !1), a = p2("div", Object.assign({}, i, {
      class: [`${e}-base-select-group-header`, i == null ? void 0 : i.class]
    }), l);
    return r.render ? r.render({
      node: a,
      option: r
    }) : n ? n({
      node: a,
      option: r,
      selected: !1
    }) : a;
  }
}), g2 = window.Vue.defineComponent, Zr = window.Vue.h, m2 = window.Vue.inject, b2 = window.Vue.Transition;
function w2(e, t) {
  return Zr(b2, {
    name: "fade-in-scale-up-transition"
  }, {
    default: () => e ? Zr(Ct, {
      clsPrefix: t,
      class: `${t}-base-select-option__check`
    }, {
      default: () => Zr(LR)
    }) : null
  });
}
const ju = g2({
  name: "NBaseSelectOption",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    },
    tmNode: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const {
      valueRef: t,
      pendingTmNodeRef: n,
      multipleRef: o,
      valueSetRef: r,
      renderLabelRef: i,
      renderOptionRef: l,
      labelFieldRef: a,
      valueFieldRef: s,
      showCheckmarkRef: d,
      nodePropsRef: c,
      handleOptionClick: h,
      handleOptionMouseEnter: p
    } = m2(dd), g = Me(() => {
      const {
        value: u
      } = n;
      return u ? e.tmNode.key === u.key : !1;
    });
    function f(u) {
      const {
        tmNode: w
      } = e;
      w.disabled || h(u, w);
    }
    function v(u) {
      const {
        tmNode: w
      } = e;
      w.disabled || p(u, w);
    }
    function m(u) {
      const {
        tmNode: w
      } = e, {
        value: x
      } = g;
      w.disabled || x || p(u, w);
    }
    return {
      multiple: o,
      isGrouped: Me(() => {
        const {
          tmNode: u
        } = e, {
          parent: w
        } = u;
        return w && w.rawNode.type === "group";
      }),
      showCheckmark: d,
      nodeProps: c,
      isPending: g,
      isSelected: Me(() => {
        const {
          value: u
        } = t, {
          value: w
        } = o;
        if (u === null) return !1;
        const x = e.tmNode.rawNode[s.value];
        if (w) {
          const {
            value: b
          } = r;
          return b.has(x);
        } else
          return u === x;
      }),
      labelField: a,
      renderLabel: i,
      renderOption: l,
      handleMouseMove: m,
      handleMouseEnter: v,
      handleClick: f
    };
  },
  render() {
    const {
      clsPrefix: e,
      tmNode: {
        rawNode: t
      },
      isSelected: n,
      isPending: o,
      isGrouped: r,
      showCheckmark: i,
      nodeProps: l,
      renderOption: a,
      renderLabel: s,
      handleClick: d,
      handleMouseEnter: c,
      handleMouseMove: h
    } = this, p = w2(n, e), g = s ? [s(t, n), i && p] : [_n(t[this.labelField], t, n), i && p], f = l == null ? void 0 : l(t), v = Zr("div", Object.assign({}, f, {
      class: [`${e}-base-select-option`, t.class, f == null ? void 0 : f.class, {
        [`${e}-base-select-option--disabled`]: t.disabled,
        [`${e}-base-select-option--selected`]: n,
        [`${e}-base-select-option--grouped`]: r,
        [`${e}-base-select-option--pending`]: o,
        [`${e}-base-select-option--show-checkmark`]: i
      }],
      style: [(f == null ? void 0 : f.style) || "", t.style || ""],
      onClick: Xr([d, f == null ? void 0 : f.onClick]),
      onMouseenter: Xr([c, f == null ? void 0 : f.onMouseenter]),
      onMousemove: Xr([h, f == null ? void 0 : f.onMousemove])
    }), Zr("div", {
      class: `${e}-base-select-option__content`
    }, g));
    return t.render ? t.render({
      node: v,
      option: t,
      selected: n
    }) : a ? a({
      node: v,
      option: t,
      selected: n
    }) : v;
  }
}), {
  cubicBezierEaseIn: Wu,
  cubicBezierEaseOut: Uu
} = No;
function Ya({
  transformOrigin: e = "inherit",
  duration: t = ".2s",
  enterScale: n = ".9",
  originalTransform: o = "",
  originalTransition: r = ""
} = {}) {
  return [H("&.fade-in-scale-up-transition-leave-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${Wu}, transform ${t} ${Wu} ${r && `,${r}`}`
  }), H("&.fade-in-scale-up-transition-enter-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${Uu}, transform ${t} ${Uu} ${r && `,${r}`}`
  }), H("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
    opacity: 0,
    transform: `${o} scale(${n})`
  }), H("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
    opacity: 1,
    transform: `${o} scale(1)`
  })];
}
const y2 = z("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [z("scrollbar", `
 max-height: var(--n-height);
 `), z("virtual-list", `
 max-height: var(--n-height);
 `), z("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [B("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), z("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), z("base-select-menu-option-wrapper", `
 position: relative;
 width: 100%;
 `), B("loading, empty", `
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `), B("loading", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `), B("header", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), B("action", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), z("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), z("base-select-option", `
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `, [U("show-checkmark", `
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `), H("&::before", `
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), H("&:active", `
 color: var(--n-option-text-color-pressed);
 `), U("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), U("pending", [H("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), U("selected", `
 color: var(--n-option-text-color-active);
 `, [H("&::before", `
 background-color: var(--n-option-color-active);
 `), U("pending", [H("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), U("disabled", `
 cursor: not-allowed;
 `, [tt("selected", `
 color: var(--n-option-text-color-disabled);
 `), U("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), B("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [Ya({
  enterScale: "0.5"
})])])]), Qn = window.Vue.computed, x2 = window.Vue.defineComponent, Nt = window.Vue.h, C2 = window.Vue.nextTick, S2 = window.Vue.onBeforeUnmount, $2 = window.Vue.onMounted, Ku = window.Vue.provide, Ki = window.Vue.ref, Ln = window.Vue.toRef, qu = window.Vue.watch, fv = x2({
  name: "InternalSelectMenu",
  props: Object.assign(Object.assign({}, ke.props), {
    clsPrefix: {
      type: String,
      required: !0
    },
    scrollable: {
      type: Boolean,
      default: !0
    },
    treeMate: {
      type: Object,
      required: !0
    },
    multiple: Boolean,
    size: {
      type: String,
      default: "medium"
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    autoPending: Boolean,
    virtualScroll: {
      type: Boolean,
      default: !0
    },
    // show is used to toggle pending state initialization
    show: {
      type: Boolean,
      default: !0
    },
    labelField: {
      type: String,
      default: "label"
    },
    valueField: {
      type: String,
      default: "value"
    },
    loading: Boolean,
    focusable: Boolean,
    renderLabel: Function,
    renderOption: Function,
    nodeProps: Function,
    showCheckmark: {
      type: Boolean,
      default: !0
    },
    onMousedown: Function,
    onScroll: Function,
    onFocus: Function,
    onBlur: Function,
    onKeyup: Function,
    onKeydown: Function,
    onTabOut: Function,
    onMouseenter: Function,
    onMouseleave: Function,
    onResize: Function,
    resetMenuOnOptionsChange: {
      type: Boolean,
      default: !0
    },
    inlineThemeDisabled: Boolean,
    // deprecated
    onToggle: Function
  }),
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedRtlRef: n
    } = je(e), o = At("InternalSelectMenu", n, t), r = ke("InternalSelectMenu", "-internal-select-menu", y2, Od, e, Ln(e, "clsPrefix")), i = Ki(null), l = Ki(null), a = Ki(null), s = Qn(() => e.treeMate.getFlattenedNodes()), d = Qn(() => qk(s.value)), c = Ki(null);
    function h() {
      const {
        treeMate: A
      } = e;
      let G = null;
      const {
        value: Z
      } = e;
      Z === null ? G = A.getFirstAvailableNode() : (e.multiple ? G = A.getNode((Z || [])[(Z || []).length - 1]) : G = A.getNode(Z), (!G || G.disabled) && (G = A.getFirstAvailableNode())), I(G || null);
    }
    function p() {
      const {
        value: A
      } = c;
      A && !e.treeMate.getNode(A.key) && (c.value = null);
    }
    let g;
    qu(() => e.show, (A) => {
      A ? g = qu(() => e.treeMate, () => {
        e.resetMenuOnOptionsChange ? (e.autoPending ? h() : p(), C2(O)) : p();
      }, {
        immediate: !0
      }) : g == null || g();
    }, {
      immediate: !0
    }), S2(() => {
      g == null || g();
    });
    const f = Qn(() => Rt(r.value.self[oe("optionHeight", e.size)])), v = Qn(() => en(r.value.self[oe("padding", e.size)])), m = Qn(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), u = Qn(() => {
      const A = s.value;
      return A && A.length === 0;
    });
    function w(A) {
      const {
        onToggle: G
      } = e;
      G && G(A);
    }
    function x(A) {
      const {
        onScroll: G
      } = e;
      G && G(A);
    }
    function b(A) {
      var G;
      (G = a.value) === null || G === void 0 || G.sync(), x(A);
    }
    function C() {
      var A;
      (A = a.value) === null || A === void 0 || A.sync();
    }
    function S() {
      const {
        value: A
      } = c;
      return A || null;
    }
    function y(A, G) {
      G.disabled || I(G, !1);
    }
    function T(A, G) {
      G.disabled || w(G);
    }
    function R(A) {
      var G;
      cn(A, "action") || (G = e.onKeyup) === null || G === void 0 || G.call(e, A);
    }
    function E(A) {
      var G;
      cn(A, "action") || (G = e.onKeydown) === null || G === void 0 || G.call(e, A);
    }
    function W(A) {
      var G;
      (G = e.onMousedown) === null || G === void 0 || G.call(e, A), !e.focusable && A.preventDefault();
    }
    function _() {
      const {
        value: A
      } = c;
      A && I(A.getNext({
        loop: !0
      }), !0);
    }
    function M() {
      const {
        value: A
      } = c;
      A && I(A.getPrev({
        loop: !0
      }), !0);
    }
    function I(A, G = !1) {
      c.value = A, G && O();
    }
    function O() {
      var A, G;
      const Z = c.value;
      if (!Z) return;
      const ae = d.value(Z.key);
      ae !== null && (e.virtualScroll ? (A = l.value) === null || A === void 0 || A.scrollTo({
        index: ae
      }) : (G = a.value) === null || G === void 0 || G.scrollTo({
        index: ae,
        elSize: f.value
      }));
    }
    function K(A) {
      var G, Z;
      !((G = i.value) === null || G === void 0) && G.contains(A.target) && ((Z = e.onFocus) === null || Z === void 0 || Z.call(e, A));
    }
    function L(A) {
      var G, Z;
      !((G = i.value) === null || G === void 0) && G.contains(A.relatedTarget) || (Z = e.onBlur) === null || Z === void 0 || Z.call(e, A);
    }
    Ku(dd, {
      handleOptionMouseEnter: y,
      handleOptionClick: T,
      valueSetRef: m,
      pendingTmNodeRef: c,
      nodePropsRef: Ln(e, "nodeProps"),
      showCheckmarkRef: Ln(e, "showCheckmark"),
      multipleRef: Ln(e, "multiple"),
      valueRef: Ln(e, "value"),
      renderLabelRef: Ln(e, "renderLabel"),
      renderOptionRef: Ln(e, "renderOption"),
      labelFieldRef: Ln(e, "labelField"),
      valueFieldRef: Ln(e, "valueField")
    }), Ku(tp, i), $2(() => {
      const {
        value: A
      } = a;
      A && A.sync();
    });
    const Y = Qn(() => {
      const {
        size: A
      } = e, {
        common: {
          cubicBezierEaseInOut: G
        },
        self: {
          height: Z,
          borderRadius: ae,
          color: le,
          groupHeaderTextColor: de,
          actionDividerColor: ge,
          optionTextColorPressed: X,
          optionTextColor: ce,
          optionTextColorDisabled: Pe,
          optionTextColorActive: me,
          optionOpacityDisabled: $e,
          optionCheckColor: Se,
          actionTextColor: Le,
          optionColorPending: Ie,
          optionColorActive: re,
          loadingColor: k,
          loadingSize: $,
          optionColorActivePending: D,
          [oe("optionFontSize", A)]: ee,
          [oe("optionHeight", A)]: ve,
          [oe("optionPadding", A)]: he
        }
      } = r.value;
      return {
        "--n-height": Z,
        "--n-action-divider-color": ge,
        "--n-action-text-color": Le,
        "--n-bezier": G,
        "--n-border-radius": ae,
        "--n-color": le,
        "--n-option-font-size": ee,
        "--n-group-header-text-color": de,
        "--n-option-check-color": Se,
        "--n-option-color-pending": Ie,
        "--n-option-color-active": re,
        "--n-option-color-active-pending": D,
        "--n-option-height": ve,
        "--n-option-opacity-disabled": $e,
        "--n-option-text-color": ce,
        "--n-option-text-color-active": me,
        "--n-option-text-color-disabled": Pe,
        "--n-option-text-color-pressed": X,
        "--n-option-padding": he,
        "--n-option-padding-left": en(he, "left"),
        "--n-option-padding-right": en(he, "right"),
        "--n-loading-color": k,
        "--n-loading-size": $
      };
    }), {
      inlineThemeDisabled: Q
    } = e, J = Q ? St("internal-select-menu", Qn(() => e.size[0]), Y, e) : void 0, q = {
      selfRef: i,
      next: _,
      prev: M,
      getPendingTmNode: S
    };
    return bp(i, e.onResize), Object.assign({
      mergedTheme: r,
      mergedClsPrefix: t,
      rtlEnabled: o,
      virtualListRef: l,
      scrollbarRef: a,
      itemSize: f,
      padding: v,
      flattenedNodes: s,
      empty: u,
      virtualListContainer() {
        const {
          value: A
        } = l;
        return A == null ? void 0 : A.listElRef;
      },
      virtualListContent() {
        const {
          value: A
        } = l;
        return A == null ? void 0 : A.itemsElRef;
      },
      doScroll: x,
      handleFocusin: K,
      handleFocusout: L,
      handleKeyUp: R,
      handleKeyDown: E,
      handleMouseDown: W,
      handleVirtualListResize: C,
      handleVirtualListScroll: b,
      cssVars: Q ? void 0 : Y,
      themeClass: J == null ? void 0 : J.themeClass,
      onRender: J == null ? void 0 : J.onRender
    }, q);
  },
  render() {
    const {
      $slots: e,
      virtualScroll: t,
      clsPrefix: n,
      mergedTheme: o,
      themeClass: r,
      onRender: i
    } = this;
    return i == null || i(), Nt("div", {
      ref: "selfRef",
      tabindex: this.focusable ? 0 : -1,
      class: [`${n}-base-select-menu`, this.rtlEnabled && `${n}-base-select-menu--rtl`, r, this.multiple && `${n}-base-select-menu--multiple`],
      style: this.cssVars,
      onFocusin: this.handleFocusin,
      onFocusout: this.handleFocusout,
      onKeyup: this.handleKeyUp,
      onKeydown: this.handleKeyDown,
      onMousedown: this.handleMouseDown,
      onMouseenter: this.onMouseenter,
      onMouseleave: this.onMouseleave
    }, qe(e.header, (l) => l && Nt("div", {
      class: `${n}-base-select-menu__header`,
      "data-header": !0,
      key: "header"
    }, l)), this.loading ? Nt("div", {
      class: `${n}-base-select-menu__loading`
    }, Nt(br, {
      clsPrefix: n,
      strokeWidth: 20
    })) : this.empty ? Nt("div", {
      class: `${n}-base-select-menu__empty`,
      "data-empty": !0
    }, wn(e.empty, () => [Nt(uv, {
      theme: o.peers.Empty,
      themeOverrides: o.peerOverrides.Empty,
      size: this.size
    })])) : Nt(mi, {
      ref: "scrollbarRef",
      theme: o.peers.Scrollbar,
      themeOverrides: o.peerOverrides.Scrollbar,
      scrollable: this.scrollable,
      container: t ? this.virtualListContainer : void 0,
      content: t ? this.virtualListContent : void 0,
      onScroll: t ? void 0 : this.doScroll
    }, {
      default: () => t ? Nt(md, {
        ref: "virtualListRef",
        class: `${n}-virtual-list`,
        items: this.flattenedNodes,
        itemSize: this.itemSize,
        showScrollbar: !1,
        paddingTop: this.padding.top,
        paddingBottom: this.padding.bottom,
        onResize: this.handleVirtualListResize,
        onScroll: this.handleVirtualListScroll,
        itemResizable: !0
      }, {
        default: ({
          item: l
        }) => l.isGroup ? Nt(Hu, {
          key: l.key,
          clsPrefix: n,
          tmNode: l
        }) : l.ignored ? null : Nt(ju, {
          clsPrefix: n,
          key: l.key,
          tmNode: l
        })
      }) : Nt("div", {
        class: `${n}-base-select-menu-option-wrapper`,
        style: {
          paddingTop: this.padding.top,
          paddingBottom: this.padding.bottom
        }
      }, this.flattenedNodes.map((l) => l.isGroup ? Nt(Hu, {
        key: l.key,
        clsPrefix: n,
        tmNode: l
      }) : Nt(ju, {
        clsPrefix: n,
        key: l.key,
        tmNode: l
      })))
    }), qe(e.action, (l) => l && [Nt("div", {
      class: `${n}-base-select-menu__action`,
      "data-action": !0,
      key: "action"
    }, l), Nt(bk, {
      onFocus: this.onTabOut,
      key: "focus-detector"
    })]));
  }
}), R2 = {
  space: "6px",
  spaceArrow: "10px",
  arrowOffset: "10px",
  arrowOffsetVertical: "10px",
  arrowHeight: "6px",
  padding: "8px 14px"
};
function k2(e) {
  const {
    boxShadow2: t,
    popoverColor: n,
    textColor2: o,
    borderRadius: r,
    fontSize: i,
    dividerColor: l
  } = e;
  return Object.assign(Object.assign({}, R2), {
    fontSize: i,
    borderRadius: r,
    color: n,
    dividerColor: l,
    textColor: o,
    boxShadow: t
  });
}
const wr = {
  name: "Popover",
  common: mt,
  peers: {
    Scrollbar: gi
  },
  self: k2
}, Bl = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, $t = "var(--n-arrow-height) * 1.414", P2 = H([z("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [H(">", [z("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), tt("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [tt("scrollable", [tt("show-header-or-footer", "padding: var(--n-padding);")])]), B("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), B("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), U("scrollable, show-header-or-footer", [B("content", `
 padding: var(--n-padding);
 `)])]), z("popover-shared", `
 transform-origin: inherit;
 `, [
  z("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [z("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${$t});
 height: calc(${$t});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]),
  // body transition
  H("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `),
  H("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `),
  H("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),
  H("&.popover-transition-leave-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)
]), an("top-start", `
 top: calc(${$t} / -2);
 left: calc(${Dn("top-start")} - var(--v-offset-left));
 `), an("top", `
 top: calc(${$t} / -2);
 transform: translateX(calc(${$t} / -2)) rotate(45deg);
 left: 50%;
 `), an("top-end", `
 top: calc(${$t} / -2);
 right: calc(${Dn("top-end")} + var(--v-offset-left));
 `), an("bottom-start", `
 bottom: calc(${$t} / -2);
 left: calc(${Dn("bottom-start")} - var(--v-offset-left));
 `), an("bottom", `
 bottom: calc(${$t} / -2);
 transform: translateX(calc(${$t} / -2)) rotate(45deg);
 left: 50%;
 `), an("bottom-end", `
 bottom: calc(${$t} / -2);
 right: calc(${Dn("bottom-end")} + var(--v-offset-left));
 `), an("left-start", `
 left: calc(${$t} / -2);
 top: calc(${Dn("left-start")} - var(--v-offset-top));
 `), an("left", `
 left: calc(${$t} / -2);
 transform: translateY(calc(${$t} / -2)) rotate(45deg);
 top: 50%;
 `), an("left-end", `
 left: calc(${$t} / -2);
 bottom: calc(${Dn("left-end")} + var(--v-offset-top));
 `), an("right-start", `
 right: calc(${$t} / -2);
 top: calc(${Dn("right-start")} - var(--v-offset-top));
 `), an("right", `
 right: calc(${$t} / -2);
 transform: translateY(calc(${$t} / -2)) rotate(45deg);
 top: 50%;
 `), an("right-end", `
 right: calc(${$t} / -2);
 bottom: calc(${Dn("right-end")} + var(--v-offset-top));
 `), ...cR({
  top: ["right-start", "left-start"],
  right: ["top-end", "bottom-end"],
  bottom: ["right-end", "left-end"],
  left: ["top-start", "bottom-start"]
}, (e, t) => {
  const n = ["right", "left"].includes(t), o = n ? "width" : "height";
  return e.map((r) => {
    const i = r.split("-")[1] === "end", a = `calc((${`var(--v-target-${o}, 0px)`} - ${$t}) / 2)`, s = Dn(r);
    return H(`[v-placement="${r}"] >`, [z("popover-shared", [U("center-arrow", [z("popover-arrow", `${t}: calc(max(${a}, ${s}) ${i ? "+" : "-"} var(--v-offset-${n ? "left" : "top"}));`)])])]);
  });
})]);
function Dn(e) {
  return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function an(e, t) {
  const n = e.split("-")[0], o = ["top", "bottom"].includes(n) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return H(`[v-placement="${e}"] >`, [z("popover-shared", `
 margin-${Bl[n]}: var(--n-space);
 `, [U("show-arrow", `
 margin-${Bl[n]}: var(--n-space-arrow);
 `), U("overlap", `
 margin: 0;
 `), Nb("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${n}: 100%;
 ${Bl[n]}: auto;
 ${o}
 `, [z("popover-arrow", t)])])]);
}
const Ll = window.Vue.computed, _2 = window.Vue.defineComponent, T2 = window.Vue.Fragment, ln = window.Vue.h, F2 = window.Vue.inject, E2 = window.Vue.mergeProps, z2 = window.Vue.onBeforeUnmount, Dl = window.Vue.provide, qi = window.Vue.ref, O2 = window.Vue.toRef, M2 = window.Vue.Transition, I2 = window.Vue.vShow, A2 = window.Vue.watch, V2 = window.Vue.watchEffect, B2 = window.Vue.withDirectives, hv = Object.assign(Object.assign({}, ke.props), {
  to: En.propTo,
  show: Boolean,
  trigger: String,
  showArrow: Boolean,
  delay: Number,
  duration: Number,
  raw: Boolean,
  arrowPointToCenter: Boolean,
  arrowClass: String,
  arrowStyle: [String, Object],
  arrowWrapperClass: String,
  arrowWrapperStyle: [String, Object],
  displayDirective: String,
  x: Number,
  y: Number,
  flip: Boolean,
  overlap: Boolean,
  placement: String,
  width: [Number, String],
  keepAliveOnHover: Boolean,
  scrollable: Boolean,
  contentClass: String,
  contentStyle: [Object, String],
  headerClass: String,
  headerStyle: [Object, String],
  footerClass: String,
  footerStyle: [Object, String],
  // private
  internalDeactivateImmediately: Boolean,
  animated: Boolean,
  onClickoutside: Function,
  internalTrapFocus: Boolean,
  internalOnAfterLeave: Function,
  // deprecated
  minWidth: Number,
  maxWidth: Number
});
function pv({
  arrowClass: e,
  arrowStyle: t,
  arrowWrapperClass: n,
  arrowWrapperStyle: o,
  clsPrefix: r
}) {
  return ln("div", {
    key: "__popover-arrow__",
    style: o,
    class: [`${r}-popover-arrow-wrapper`, n]
  }, ln("div", {
    class: [`${r}-popover-arrow`, e],
    style: t
  }));
}
const L2 = _2({
  name: "PopoverBody",
  inheritAttrs: !1,
  props: hv,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    const {
      namespaceRef: o,
      mergedClsPrefixRef: r,
      inlineThemeDisabled: i,
      mergedRtlRef: l
    } = je(e), a = ke("Popover", "-popover", P2, wr, e, r), s = At("Popover", l, r), d = qi(null), c = F2("NPopover"), h = qi(null), p = qi(e.show), g = qi(!1);
    V2(() => {
      const {
        show: R
      } = e;
      R && !jy() && !e.internalDeactivateImmediately && (g.value = !0);
    });
    const f = Ll(() => {
      const {
        trigger: R,
        onClickoutside: E
      } = e, W = [], {
        positionManuallyRef: {
          value: _
        }
      } = c;
      return _ || (R === "click" && !E && W.push([Fa, S, void 0, {
        capture: !0
      }]), R === "hover" && W.push([p0, C])), E && W.push([Fa, S, void 0, {
        capture: !0
      }]), (e.displayDirective === "show" || e.animated && g.value) && W.push([I2, e.show]), W;
    }), v = Ll(() => {
      const {
        common: {
          cubicBezierEaseInOut: R,
          cubicBezierEaseIn: E,
          cubicBezierEaseOut: W
        },
        self: {
          space: _,
          spaceArrow: M,
          padding: I,
          fontSize: O,
          textColor: K,
          dividerColor: L,
          color: Y,
          boxShadow: Q,
          borderRadius: J,
          arrowHeight: q,
          arrowOffset: A,
          arrowOffsetVertical: G
        }
      } = a.value;
      return {
        "--n-box-shadow": Q,
        "--n-bezier": R,
        "--n-bezier-ease-in": E,
        "--n-bezier-ease-out": W,
        "--n-font-size": O,
        "--n-text-color": K,
        "--n-color": Y,
        "--n-divider-color": L,
        "--n-border-radius": J,
        "--n-arrow-height": q,
        "--n-arrow-offset": A,
        "--n-arrow-offset-vertical": G,
        "--n-padding": I,
        "--n-space": _,
        "--n-space-arrow": M
      };
    }), m = Ll(() => {
      const R = e.width === "trigger" ? void 0 : ft(e.width), E = [];
      R && E.push({
        width: R
      });
      const {
        maxWidth: W,
        minWidth: _
      } = e;
      return W && E.push({
        maxWidth: ft(W)
      }), _ && E.push({
        maxWidth: ft(_)
      }), i || E.push(v.value), E;
    }), u = i ? St("popover", void 0, v, e) : void 0;
    c.setBodyInstance({
      syncPosition: w
    }), z2(() => {
      c.setBodyInstance(null);
    }), A2(O2(e, "show"), (R) => {
      e.animated || (R ? p.value = !0 : p.value = !1);
    });
    function w() {
      var R;
      (R = d.value) === null || R === void 0 || R.syncPosition();
    }
    function x(R) {
      e.trigger === "hover" && e.keepAliveOnHover && e.show && c.handleMouseEnter(R);
    }
    function b(R) {
      e.trigger === "hover" && e.keepAliveOnHover && c.handleMouseLeave(R);
    }
    function C(R) {
      e.trigger === "hover" && !y().contains(ii(R)) && c.handleMouseMoveOutside(R);
    }
    function S(R) {
      (e.trigger === "click" && !y().contains(ii(R)) || e.onClickoutside) && c.handleClickOutside(R);
    }
    function y() {
      return c.getTriggerElement();
    }
    Dl(Ua, h), Dl(cd, null), Dl(ud, null);
    function T() {
      if (u == null || u.onRender(), !(e.displayDirective === "show" || e.show || e.animated && g.value))
        return null;
      let E;
      const W = c.internalRenderBodyRef.value, {
        value: _
      } = r;
      if (W)
        E = W(
          // The popover class and overlap class must exists, they will be used
          // to place the body & transition animation.
          // Shadow class exists for reuse box-shadow.
          [`${_}-popover-shared`, (s == null ? void 0 : s.value) && `${_}-popover--rtl`, u == null ? void 0 : u.themeClass.value, e.overlap && `${_}-popover-shared--overlap`, e.showArrow && `${_}-popover-shared--show-arrow`, e.arrowPointToCenter && `${_}-popover-shared--center-arrow`],
          h,
          m.value,
          x,
          b
        );
      else {
        const {
          value: M
        } = c.extraClassRef, {
          internalTrapFocus: I
        } = e, O = !ar(t.header) || !ar(t.footer), K = () => {
          var L, Y;
          const Q = O ? ln(T2, null, qe(t.header, (A) => A ? ln("div", {
            class: [`${_}-popover__header`, e.headerClass],
            style: e.headerStyle
          }, A) : null), qe(t.default, (A) => A ? ln("div", {
            class: [`${_}-popover__content`, e.contentClass],
            style: e.contentStyle
          }, t) : null), qe(t.footer, (A) => A ? ln("div", {
            class: [`${_}-popover__footer`, e.footerClass],
            style: e.footerStyle
          }, A) : null)) : e.scrollable ? (L = t.default) === null || L === void 0 ? void 0 : L.call(t) : ln("div", {
            class: [`${_}-popover__content`, e.contentClass],
            style: e.contentStyle
          }, t), J = e.scrollable ? ln(sv, {
            themeOverrides: a.value.peerOverrides.Scrollbar,
            theme: a.value.peers.Scrollbar,
            contentClass: O ? void 0 : `${_}-popover__content ${(Y = e.contentClass) !== null && Y !== void 0 ? Y : ""}`,
            contentStyle: O ? void 0 : e.contentStyle
          }, {
            default: () => Q
          }) : Q, q = e.showArrow ? pv({
            arrowClass: e.arrowClass,
            arrowStyle: e.arrowStyle,
            arrowWrapperClass: e.arrowWrapperClass,
            arrowWrapperStyle: e.arrowWrapperStyle,
            clsPrefix: _
          }) : null;
          return [J, q];
        };
        E = ln("div", E2({
          class: [`${_}-popover`, `${_}-popover-shared`, (s == null ? void 0 : s.value) && `${_}-popover--rtl`, u == null ? void 0 : u.themeClass.value, M.map((L) => `${_}-${L}`), {
            [`${_}-popover--scrollable`]: e.scrollable,
            [`${_}-popover--show-header-or-footer`]: O,
            [`${_}-popover--raw`]: e.raw,
            [`${_}-popover-shared--overlap`]: e.overlap,
            [`${_}-popover-shared--show-arrow`]: e.showArrow,
            [`${_}-popover-shared--center-arrow`]: e.arrowPointToCenter
          }],
          ref: h,
          style: m.value,
          onKeydown: c.handleKeydown,
          onMouseenter: x,
          onMouseleave: b
        }, n), I ? ln(Vy, {
          active: e.show,
          autoFocus: !0
        }, {
          default: K
        }) : K());
      }
      return B2(E, f.value);
    }
    return {
      displayed: g,
      namespace: o,
      isMounted: c.isMountedRef,
      zIndex: c.zIndexRef,
      followerRef: d,
      adjustedTo: En(e),
      followerEnabled: p,
      renderContentNode: T
    };
  },
  render() {
    return ln(vd, {
      ref: "followerRef",
      zIndex: this.zIndex,
      show: this.show,
      enabled: this.followerEnabled,
      to: this.adjustedTo,
      x: this.x,
      y: this.y,
      flip: this.flip,
      placement: this.placement,
      containerClass: this.namespace,
      overlap: this.overlap,
      width: this.width === "trigger" ? "target" : void 0,
      teleportDisabled: this.adjustedTo === En.tdkey
    }, {
      default: () => this.animated ? ln(M2, {
        name: "popover-transition",
        appear: this.isMounted,
        // Don't use watch to enable follower, since the transition may
        // make position sync timing very subtle and buggy.
        onEnter: () => {
          this.followerEnabled = !0;
        },
        onAfterLeave: () => {
          var e;
          (e = this.internalOnAfterLeave) === null || e === void 0 || e.call(this), this.followerEnabled = !1, this.displayed = !1;
        }
      }, {
        default: this.renderContentNode
      }) : this.renderContentNode()
    });
  }
}), D2 = window.Vue.cloneVNode, Gu = window.Vue.computed, N2 = window.Vue.defineComponent, Ir = window.Vue.h, H2 = window.Vue.provide, Gi = window.Vue.ref, j2 = window.Vue.Text, Nl = window.Vue.toRef, W2 = window.Vue.watchEffect, U2 = window.Vue.withDirectives, K2 = Object.keys(hv), q2 = {
  focus: ["onFocus", "onBlur"],
  click: ["onClick"],
  hover: ["onMouseenter", "onMouseleave"],
  manual: [],
  nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
};
function G2(e, t, n) {
  q2[t].forEach((o) => {
    e.props ? e.props = Object.assign({}, e.props) : e.props = {};
    const r = e.props[o], i = n[o];
    r ? e.props[o] = (...l) => {
      r(...l), i(...l);
    } : e.props[o] = i;
  });
}
const ur = {
  show: {
    type: Boolean,
    default: void 0
  },
  defaultShow: Boolean,
  showArrow: {
    type: Boolean,
    default: !0
  },
  trigger: {
    type: String,
    default: "hover"
  },
  delay: {
    type: Number,
    default: 100
  },
  duration: {
    type: Number,
    default: 100
  },
  raw: Boolean,
  placement: {
    type: String,
    default: "top"
  },
  x: Number,
  y: Number,
  arrowPointToCenter: Boolean,
  disabled: Boolean,
  getDisabled: Function,
  displayDirective: {
    type: String,
    default: "if"
  },
  arrowClass: String,
  arrowStyle: [String, Object],
  arrowWrapperClass: String,
  arrowWrapperStyle: [String, Object],
  flip: {
    type: Boolean,
    default: !0
  },
  animated: {
    type: Boolean,
    default: !0
  },
  width: {
    type: [Number, String],
    default: void 0
  },
  overlap: Boolean,
  keepAliveOnHover: {
    type: Boolean,
    default: !0
  },
  zIndex: Number,
  to: En.propTo,
  scrollable: Boolean,
  contentClass: String,
  contentStyle: [Object, String],
  headerClass: String,
  headerStyle: [Object, String],
  footerClass: String,
  footerStyle: [Object, String],
  // events
  onClickoutside: Function,
  "onUpdate:show": [Function, Array],
  onUpdateShow: [Function, Array],
  // internal
  internalDeactivateImmediately: Boolean,
  internalSyncTargetWithParent: Boolean,
  internalInheritedEventHandlers: {
    type: Array,
    default: () => []
  },
  internalTrapFocus: Boolean,
  internalExtraClass: {
    type: Array,
    default: () => []
  },
  // deprecated
  onShow: [Function, Array],
  onHide: [Function, Array],
  arrow: {
    type: Boolean,
    default: void 0
  },
  minWidth: Number,
  maxWidth: Number
}, X2 = Object.assign(Object.assign(Object.assign({}, ke.props), ur), {
  internalOnAfterLeave: Function,
  internalRenderBody: Function
}), bi = N2({
  name: "Popover",
  inheritAttrs: !1,
  props: X2,
  slots: Object,
  __popover__: !0,
  setup(e) {
    const t = Wa(), n = Gi(null), o = Gu(() => e.show), r = Gi(e.defaultShow), i = It(o, r), l = Me(() => e.disabled ? !1 : i.value), a = () => {
      if (e.disabled) return !0;
      const {
        getDisabled: O
      } = e;
      return !!(O != null && O());
    }, s = () => a() ? !1 : i.value, d = ep(e, ["arrow", "showArrow"]), c = Gu(() => e.overlap ? !1 : d.value);
    let h = null;
    const p = Gi(null), g = Gi(null), f = Me(() => e.x !== void 0 && e.y !== void 0);
    function v(O) {
      const {
        "onUpdate:show": K,
        onUpdateShow: L,
        onShow: Y,
        onHide: Q
      } = e;
      r.value = O, K && ie(K, O), L && ie(L, O), O && Y && ie(Y, !0), O && Q && ie(Q, !1);
    }
    function m() {
      h && h.syncPosition();
    }
    function u() {
      const {
        value: O
      } = p;
      O && (window.clearTimeout(O), p.value = null);
    }
    function w() {
      const {
        value: O
      } = g;
      O && (window.clearTimeout(O), g.value = null);
    }
    function x() {
      const O = a();
      if (e.trigger === "focus" && !O) {
        if (s()) return;
        v(!0);
      }
    }
    function b() {
      const O = a();
      if (e.trigger === "focus" && !O) {
        if (!s()) return;
        v(!1);
      }
    }
    function C() {
      const O = a();
      if (e.trigger === "hover" && !O) {
        if (w(), p.value !== null || s()) return;
        const K = () => {
          v(!0), p.value = null;
        }, {
          delay: L
        } = e;
        L === 0 ? K() : p.value = window.setTimeout(K, L);
      }
    }
    function S() {
      const O = a();
      if (e.trigger === "hover" && !O) {
        if (u(), g.value !== null || !s()) return;
        const K = () => {
          v(!1), g.value = null;
        }, {
          duration: L
        } = e;
        L === 0 ? K() : g.value = window.setTimeout(K, L);
      }
    }
    function y() {
      S();
    }
    function T(O) {
      var K;
      s() && (e.trigger === "click" && (u(), w(), v(!1)), (K = e.onClickoutside) === null || K === void 0 || K.call(e, O));
    }
    function R() {
      if (e.trigger === "click" && !a()) {
        u(), w();
        const O = !s();
        v(O);
      }
    }
    function E(O) {
      e.internalTrapFocus && O.key === "Escape" && (u(), w(), v(!1));
    }
    function W(O) {
      r.value = O;
    }
    function _() {
      var O;
      return (O = n.value) === null || O === void 0 ? void 0 : O.targetRef;
    }
    function M(O) {
      h = O;
    }
    return H2("NPopover", {
      getTriggerElement: _,
      handleKeydown: E,
      handleMouseEnter: C,
      handleMouseLeave: S,
      handleClickOutside: T,
      handleMouseMoveOutside: y,
      setBodyInstance: M,
      positionManuallyRef: f,
      isMountedRef: t,
      zIndexRef: Nl(e, "zIndex"),
      extraClassRef: Nl(e, "internalExtraClass"),
      internalRenderBodyRef: Nl(e, "internalRenderBody")
    }), W2(() => {
      i.value && a() && v(!1);
    }), {
      binderInstRef: n,
      positionManually: f,
      mergedShowConsideringDisabledProp: l,
      // if to show popover body
      uncontrolledShow: r,
      mergedShowArrow: c,
      getMergedShow: s,
      setShow: W,
      handleClick: R,
      handleMouseEnter: C,
      handleMouseLeave: S,
      handleFocus: x,
      handleBlur: b,
      syncPosition: m
    };
  },
  render() {
    var e;
    const {
      positionManually: t,
      $slots: n
    } = this;
    let o, r = !1;
    if (!t && (o = Zy(n, "trigger"), o)) {
      o = D2(o), o = o.type === j2 ? Ir("span", [o]) : o;
      const i = {
        onClick: this.handleClick,
        onMouseenter: this.handleMouseEnter,
        onMouseleave: this.handleMouseLeave,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      };
      if (!((e = o.type) === null || e === void 0) && e.__popover__)
        r = !0, o.props || (o.props = {
          internalSyncTargetWithParent: !0,
          internalInheritedEventHandlers: []
        }), o.props.internalSyncTargetWithParent = !0, o.props.internalInheritedEventHandlers ? o.props.internalInheritedEventHandlers = [i, ...o.props.internalInheritedEventHandlers] : o.props.internalInheritedEventHandlers = [i];
      else {
        const {
          internalInheritedEventHandlers: l
        } = this, a = [i, ...l], s = {
          onBlur: (d) => {
            a.forEach((c) => {
              c.onBlur(d);
            });
          },
          onFocus: (d) => {
            a.forEach((c) => {
              c.onFocus(d);
            });
          },
          onClick: (d) => {
            a.forEach((c) => {
              c.onClick(d);
            });
          },
          onMouseenter: (d) => {
            a.forEach((c) => {
              c.onMouseenter(d);
            });
          },
          onMouseleave: (d) => {
            a.forEach((c) => {
              c.onMouseleave(d);
            });
          }
        };
        G2(o, l ? "nested" : t ? "manual" : this.trigger, s);
      }
    }
    return Ir(fd, {
      ref: "binderInstRef",
      syncTarget: !r,
      syncTargetWithParent: this.internalSyncTargetWithParent
    }, {
      default: () => {
        this.mergedShowConsideringDisabledProp;
        const i = this.getMergedShow();
        return [this.internalTrapFocus && i ? U2(Ir("div", {
          style: {
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }), [[ip, {
          enabled: i,
          zIndex: this.zIndex
        }]]) : null, t ? null : Ir(hd, null, {
          default: () => o
        }), Ir(L2, si(this.$props, K2, Object.assign(Object.assign({}, this.$attrs), {
          showArrow: this.mergedShowArrow,
          show: i
        })), {
          default: () => {
            var l, a;
            return (a = (l = this.$slots).default) === null || a === void 0 ? void 0 : a.call(l);
          },
          header: () => {
            var l, a;
            return (a = (l = this.$slots).header) === null || a === void 0 ? void 0 : a.call(l);
          },
          footer: () => {
            var l, a;
            return (a = (l = this.$slots).footer) === null || a === void 0 ? void 0 : a.call(l);
          }
        })];
      }
    });
  }
}), Y2 = {
  closeIconSizeTiny: "12px",
  closeIconSizeSmall: "12px",
  closeIconSizeMedium: "14px",
  closeIconSizeLarge: "14px",
  closeSizeTiny: "16px",
  closeSizeSmall: "16px",
  closeSizeMedium: "18px",
  closeSizeLarge: "18px",
  padding: "0 7px",
  closeMargin: "0 0 0 4px"
};
function Z2(e) {
  const {
    textColor2: t,
    primaryColorHover: n,
    primaryColorPressed: o,
    primaryColor: r,
    infoColor: i,
    successColor: l,
    warningColor: a,
    errorColor: s,
    baseColor: d,
    borderColor: c,
    opacityDisabled: h,
    tagColor: p,
    closeIconColor: g,
    closeIconColorHover: f,
    closeIconColorPressed: v,
    borderRadiusSmall: m,
    fontSizeMini: u,
    fontSizeTiny: w,
    fontSizeSmall: x,
    fontSizeMedium: b,
    heightMini: C,
    heightTiny: S,
    heightSmall: y,
    heightMedium: T,
    closeColorHover: R,
    closeColorPressed: E,
    buttonColor2Hover: W,
    buttonColor2Pressed: _,
    fontWeightStrong: M
  } = e;
  return Object.assign(Object.assign({}, Y2), {
    closeBorderRadius: m,
    heightTiny: C,
    heightSmall: S,
    heightMedium: y,
    heightLarge: T,
    borderRadius: m,
    opacityDisabled: h,
    fontSizeTiny: u,
    fontSizeSmall: w,
    fontSizeMedium: x,
    fontSizeLarge: b,
    fontWeightStrong: M,
    // checked
    textColorCheckable: t,
    textColorHoverCheckable: t,
    textColorPressedCheckable: t,
    textColorChecked: d,
    colorCheckable: "#0000",
    colorHoverCheckable: W,
    colorPressedCheckable: _,
    colorChecked: r,
    colorCheckedHover: n,
    colorCheckedPressed: o,
    // default
    border: `1px solid ${c}`,
    textColor: t,
    color: p,
    colorBordered: "rgb(250, 250, 252)",
    closeIconColor: g,
    closeIconColorHover: f,
    closeIconColorPressed: v,
    closeColorHover: R,
    closeColorPressed: E,
    borderPrimary: `1px solid ${Ee(r, {
      alpha: 0.3
    })}`,
    textColorPrimary: r,
    colorPrimary: Ee(r, {
      alpha: 0.12
    }),
    colorBorderedPrimary: Ee(r, {
      alpha: 0.1
    }),
    closeIconColorPrimary: r,
    closeIconColorHoverPrimary: r,
    closeIconColorPressedPrimary: r,
    closeColorHoverPrimary: Ee(r, {
      alpha: 0.12
    }),
    closeColorPressedPrimary: Ee(r, {
      alpha: 0.18
    }),
    borderInfo: `1px solid ${Ee(i, {
      alpha: 0.3
    })}`,
    textColorInfo: i,
    colorInfo: Ee(i, {
      alpha: 0.12
    }),
    colorBorderedInfo: Ee(i, {
      alpha: 0.1
    }),
    closeIconColorInfo: i,
    closeIconColorHoverInfo: i,
    closeIconColorPressedInfo: i,
    closeColorHoverInfo: Ee(i, {
      alpha: 0.12
    }),
    closeColorPressedInfo: Ee(i, {
      alpha: 0.18
    }),
    borderSuccess: `1px solid ${Ee(l, {
      alpha: 0.3
    })}`,
    textColorSuccess: l,
    colorSuccess: Ee(l, {
      alpha: 0.12
    }),
    colorBorderedSuccess: Ee(l, {
      alpha: 0.1
    }),
    closeIconColorSuccess: l,
    closeIconColorHoverSuccess: l,
    closeIconColorPressedSuccess: l,
    closeColorHoverSuccess: Ee(l, {
      alpha: 0.12
    }),
    closeColorPressedSuccess: Ee(l, {
      alpha: 0.18
    }),
    borderWarning: `1px solid ${Ee(a, {
      alpha: 0.35
    })}`,
    textColorWarning: a,
    colorWarning: Ee(a, {
      alpha: 0.15
    }),
    colorBorderedWarning: Ee(a, {
      alpha: 0.12
    }),
    closeIconColorWarning: a,
    closeIconColorHoverWarning: a,
    closeIconColorPressedWarning: a,
    closeColorHoverWarning: Ee(a, {
      alpha: 0.12
    }),
    closeColorPressedWarning: Ee(a, {
      alpha: 0.18
    }),
    borderError: `1px solid ${Ee(s, {
      alpha: 0.23
    })}`,
    textColorError: s,
    colorError: Ee(s, {
      alpha: 0.1
    }),
    colorBorderedError: Ee(s, {
      alpha: 0.08
    }),
    closeIconColorError: s,
    closeIconColorHoverError: s,
    closeIconColorPressedError: s,
    closeColorHoverError: Ee(s, {
      alpha: 0.12
    }),
    closeColorPressedError: Ee(s, {
      alpha: 0.18
    })
  });
}
const J2 = {
  common: mt,
  self: Z2
}, Q2 = {
  color: Object,
  type: {
    type: String,
    default: "default"
  },
  round: Boolean,
  size: {
    type: String,
    default: "medium"
  },
  closable: Boolean,
  disabled: {
    type: Boolean,
    default: void 0
  }
}, eP = z("tag", `
 --n-close-margin: var(--n-close-margin-top) var(--n-close-margin-right) var(--n-close-margin-bottom) var(--n-close-margin-left);
 white-space: nowrap;
 position: relative;
 box-sizing: border-box;
 cursor: default;
 display: inline-flex;
 align-items: center;
 flex-wrap: nowrap;
 padding: var(--n-padding);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 line-height: 1;
 height: var(--n-height);
 font-size: var(--n-font-size);
`, [U("strong", `
 font-weight: var(--n-font-weight-strong);
 `), B("border", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `), B("icon", `
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `), B("avatar", `
 display: flex;
 margin: 0 6px 0 0;
 `), B("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), U("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [B("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), B("avatar", `
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `), U("closable", `
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]), U("icon, avatar", [U("round", `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]), U("disabled", `
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `), U("checkable", `
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `, [tt("disabled", [H("&:hover", "background-color: var(--n-color-hover-checkable);", [tt("checked", "color: var(--n-text-color-hover-checkable);")]), H("&:active", "background-color: var(--n-color-pressed-checkable);", [tt("checked", "color: var(--n-text-color-pressed-checkable);")])]), U("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [tt("disabled", [H("&:hover", "background-color: var(--n-color-checked-hover);"), H("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), Xu = window.Vue.computed, tP = window.Vue.defineComponent, Yo = window.Vue.h, nP = window.Vue.provide, oP = window.Vue.ref, rP = window.Vue.toRef;
window.Vue.watchEffect;
const iP = Object.assign(Object.assign(Object.assign({}, ke.props), Q2), {
  bordered: {
    type: Boolean,
    default: void 0
  },
  checked: Boolean,
  checkable: Boolean,
  strong: Boolean,
  triggerClickOnClose: Boolean,
  onClose: [Array, Function],
  onMouseenter: Function,
  onMouseleave: Function,
  "onUpdate:checked": Function,
  onUpdateChecked: Function,
  // private
  internalCloseFocusable: {
    type: Boolean,
    default: !0
  },
  internalCloseIsButtonTag: {
    type: Boolean,
    default: !0
  },
  // deprecated
  onCheckedChange: Function
}), aP = "n-tag", To = tP({
  name: "Tag",
  props: iP,
  slots: Object,
  setup(e) {
    const t = oP(null), {
      mergedBorderedRef: n,
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = je(e), l = ke("Tag", "-tag", eP, J2, e, o);
    nP(aP, {
      roundRef: rP(e, "round")
    });
    function a() {
      if (!e.disabled && e.checkable) {
        const {
          checked: g,
          onCheckedChange: f,
          onUpdateChecked: v,
          "onUpdate:checked": m
        } = e;
        v && v(!g), m && m(!g), f && f(!g);
      }
    }
    function s(g) {
      if (e.triggerClickOnClose || g.stopPropagation(), !e.disabled) {
        const {
          onClose: f
        } = e;
        f && ie(f, g);
      }
    }
    const d = {
      setTextContent(g) {
        const {
          value: f
        } = t;
        f && (f.textContent = g);
      }
    }, c = At("Tag", i, o), h = Xu(() => {
      const {
        type: g,
        size: f,
        color: {
          color: v,
          textColor: m
        } = {}
      } = e, {
        common: {
          cubicBezierEaseInOut: u
        },
        self: {
          padding: w,
          closeMargin: x,
          borderRadius: b,
          opacityDisabled: C,
          textColorCheckable: S,
          textColorHoverCheckable: y,
          textColorPressedCheckable: T,
          textColorChecked: R,
          colorCheckable: E,
          colorHoverCheckable: W,
          colorPressedCheckable: _,
          colorChecked: M,
          colorCheckedHover: I,
          colorCheckedPressed: O,
          closeBorderRadius: K,
          fontWeightStrong: L,
          [oe("colorBordered", g)]: Y,
          [oe("closeSize", f)]: Q,
          [oe("closeIconSize", f)]: J,
          [oe("fontSize", f)]: q,
          [oe("height", f)]: A,
          [oe("color", g)]: G,
          [oe("textColor", g)]: Z,
          [oe("border", g)]: ae,
          [oe("closeIconColor", g)]: le,
          [oe("closeIconColorHover", g)]: de,
          [oe("closeIconColorPressed", g)]: ge,
          [oe("closeColorHover", g)]: X,
          [oe("closeColorPressed", g)]: ce
        }
      } = l.value, Pe = en(x);
      return {
        "--n-font-weight-strong": L,
        "--n-avatar-size-override": `calc(${A} - 8px)`,
        "--n-bezier": u,
        "--n-border-radius": b,
        "--n-border": ae,
        "--n-close-icon-size": J,
        "--n-close-color-pressed": ce,
        "--n-close-color-hover": X,
        "--n-close-border-radius": K,
        "--n-close-icon-color": le,
        "--n-close-icon-color-hover": de,
        "--n-close-icon-color-pressed": ge,
        "--n-close-icon-color-disabled": le,
        "--n-close-margin-top": Pe.top,
        "--n-close-margin-right": Pe.right,
        "--n-close-margin-bottom": Pe.bottom,
        "--n-close-margin-left": Pe.left,
        "--n-close-size": Q,
        "--n-color": v || (n.value ? Y : G),
        "--n-color-checkable": E,
        "--n-color-checked": M,
        "--n-color-checked-hover": I,
        "--n-color-checked-pressed": O,
        "--n-color-hover-checkable": W,
        "--n-color-pressed-checkable": _,
        "--n-font-size": q,
        "--n-height": A,
        "--n-opacity-disabled": C,
        "--n-padding": w,
        "--n-text-color": m || Z,
        "--n-text-color-checkable": S,
        "--n-text-color-checked": R,
        "--n-text-color-hover-checkable": y,
        "--n-text-color-pressed-checkable": T
      };
    }), p = r ? St("tag", Xu(() => {
      let g = "";
      const {
        type: f,
        size: v,
        color: {
          color: m,
          textColor: u
        } = {}
      } = e;
      return g += f[0], g += v[0], m && (g += `a${Ea(m)}`), u && (g += `b${Ea(u)}`), n.value && (g += "c"), g;
    }), h, e) : void 0;
    return Object.assign(Object.assign({}, d), {
      rtlEnabled: c,
      mergedClsPrefix: o,
      contentRef: t,
      mergedBordered: n,
      handleClick: a,
      handleCloseClick: s,
      cssVars: r ? void 0 : h,
      themeClass: p == null ? void 0 : p.themeClass,
      onRender: p == null ? void 0 : p.onRender
    });
  },
  render() {
    var e, t;
    const {
      mergedClsPrefix: n,
      rtlEnabled: o,
      closable: r,
      color: {
        borderColor: i
      } = {},
      round: l,
      onRender: a,
      $slots: s
    } = this;
    a == null || a();
    const d = qe(s.avatar, (h) => h && Yo("div", {
      class: `${n}-tag__avatar`
    }, h)), c = qe(s.icon, (h) => h && Yo("div", {
      class: `${n}-tag__icon`
    }, h));
    return Yo("div", {
      class: [`${n}-tag`, this.themeClass, {
        [`${n}-tag--rtl`]: o,
        [`${n}-tag--strong`]: this.strong,
        [`${n}-tag--disabled`]: this.disabled,
        [`${n}-tag--checkable`]: this.checkable,
        [`${n}-tag--checked`]: this.checkable && this.checked,
        [`${n}-tag--round`]: l,
        [`${n}-tag--avatar`]: d,
        [`${n}-tag--icon`]: c,
        [`${n}-tag--closable`]: r
      }],
      style: this.cssVars,
      onClick: this.handleClick,
      onMouseenter: this.onMouseenter,
      onMouseleave: this.onMouseleave
    }, c || d, Yo("span", {
      class: `${n}-tag__content`,
      ref: "contentRef"
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e)), !this.checkable && r ? Yo(av, {
      clsPrefix: n,
      class: `${n}-tag__close`,
      disabled: this.disabled,
      onClick: this.handleCloseClick,
      focusable: this.internalCloseFocusable,
      round: l,
      isButtonTag: this.internalCloseIsButtonTag,
      absolute: !0
    }) : null, !this.checkable && this.mergedBordered ? Yo("div", {
      class: `${n}-tag__border`,
      style: {
        borderColor: i
      }
    }) : null);
  }
}), lP = window.Vue.defineComponent, Xi = window.Vue.h, vv = lP({
  name: "InternalSelectionSuffix",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    },
    showArrow: {
      type: Boolean,
      default: void 0
    },
    showClear: {
      type: Boolean,
      default: void 0
    },
    loading: {
      type: Boolean,
      default: !1
    },
    onClear: Function
  },
  setup(e, {
    slots: t
  }) {
    return () => {
      const {
        clsPrefix: n
      } = e;
      return Xi(br, {
        clsPrefix: n,
        class: `${n}-base-suffix`,
        strokeWidth: 24,
        scale: 0.85,
        show: e.loading
      }, {
        default: () => e.showArrow ? Xi(Ns, {
          clsPrefix: n,
          show: e.showClear,
          onClear: e.onClear
        }, {
          placeholder: () => Xi(Ct, {
            clsPrefix: n,
            class: `${n}-base-suffix__arrow`
          }, {
            default: () => wn(t.default, () => [Xi(ev, null)])
          })
        }) : null
      });
    };
  }
}), sP = {
  paddingSingle: "0 26px 0 12px",
  paddingMultiple: "3px 26px 0 12px",
  clearSize: "16px",
  arrowSize: "16px"
};
function dP(e) {
  const {
    borderRadius: t,
    textColor2: n,
    textColorDisabled: o,
    inputColor: r,
    inputColorDisabled: i,
    primaryColor: l,
    primaryColorHover: a,
    warningColor: s,
    warningColorHover: d,
    errorColor: c,
    errorColorHover: h,
    borderColor: p,
    iconColor: g,
    iconColorDisabled: f,
    clearColor: v,
    clearColorHover: m,
    clearColorPressed: u,
    placeholderColor: w,
    placeholderColorDisabled: x,
    fontSizeTiny: b,
    fontSizeSmall: C,
    fontSizeMedium: S,
    fontSizeLarge: y,
    heightTiny: T,
    heightSmall: R,
    heightMedium: E,
    heightLarge: W,
    fontWeight: _
  } = e;
  return Object.assign(Object.assign({}, sP), {
    fontSizeTiny: b,
    fontSizeSmall: C,
    fontSizeMedium: S,
    fontSizeLarge: y,
    heightTiny: T,
    heightSmall: R,
    heightMedium: E,
    heightLarge: W,
    borderRadius: t,
    fontWeight: _,
    // default
    textColor: n,
    textColorDisabled: o,
    placeholderColor: w,
    placeholderColorDisabled: x,
    color: r,
    colorDisabled: i,
    colorActive: r,
    border: `1px solid ${p}`,
    borderHover: `1px solid ${a}`,
    borderActive: `1px solid ${l}`,
    borderFocus: `1px solid ${a}`,
    boxShadowHover: "none",
    boxShadowActive: `0 0 0 2px ${Ee(l, {
      alpha: 0.2
    })}`,
    boxShadowFocus: `0 0 0 2px ${Ee(l, {
      alpha: 0.2
    })}`,
    caretColor: l,
    arrowColor: g,
    arrowColorDisabled: f,
    loadingColor: l,
    // warning
    borderWarning: `1px solid ${s}`,
    borderHoverWarning: `1px solid ${d}`,
    borderActiveWarning: `1px solid ${s}`,
    borderFocusWarning: `1px solid ${d}`,
    boxShadowHoverWarning: "none",
    boxShadowActiveWarning: `0 0 0 2px ${Ee(s, {
      alpha: 0.2
    })}`,
    boxShadowFocusWarning: `0 0 0 2px ${Ee(s, {
      alpha: 0.2
    })}`,
    colorActiveWarning: r,
    caretColorWarning: s,
    // error
    borderError: `1px solid ${c}`,
    borderHoverError: `1px solid ${h}`,
    borderActiveError: `1px solid ${c}`,
    borderFocusError: `1px solid ${h}`,
    boxShadowHoverError: "none",
    boxShadowActiveError: `0 0 0 2px ${Ee(c, {
      alpha: 0.2
    })}`,
    boxShadowFocusError: `0 0 0 2px ${Ee(c, {
      alpha: 0.2
    })}`,
    colorActiveError: r,
    caretColorError: c,
    clearColor: v,
    clearColorHover: m,
    clearColorPressed: u
  });
}
const gv = {
  name: "InternalSelection",
  common: mt,
  peers: {
    Popover: wr
  },
  self: dP
}, cP = H([z("base-selection", `
 --n-padding-single: var(--n-padding-single-top) var(--n-padding-single-right) var(--n-padding-single-bottom) var(--n-padding-single-left);
 --n-padding-multiple: var(--n-padding-multiple-top) var(--n-padding-multiple-right) var(--n-padding-multiple-bottom) var(--n-padding-multiple-left);
 position: relative;
 z-index: auto;
 box-shadow: none;
 width: 100%;
 max-width: 100%;
 display: inline-block;
 vertical-align: bottom;
 border-radius: var(--n-border-radius);
 min-height: var(--n-height);
 line-height: 1.5;
 font-size: var(--n-font-size);
 `, [z("base-loading", `
 color: var(--n-loading-color);
 `), z("base-selection-tags", "min-height: var(--n-height);"), B("border, state-border", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border: var(--n-border);
 border-radius: inherit;
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `), B("state-border", `
 z-index: 1;
 border-color: #0000;
 `), z("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [B("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), z("base-selection-overlay", `
 display: flex;
 align-items: center;
 white-space: nowrap;
 pointer-events: none;
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 padding: var(--n-padding-single);
 transition: color .3s var(--n-bezier);
 `, [B("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), z("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [B("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), z("base-selection-tags", `
 cursor: pointer;
 outline: none;
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 display: flex;
 padding: var(--n-padding-multiple);
 flex-wrap: wrap;
 align-items: center;
 width: 100%;
 vertical-align: bottom;
 background-color: var(--n-color);
 border-radius: inherit;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `), z("base-selection-label", `
 height: var(--n-height);
 display: inline-flex;
 width: 100%;
 vertical-align: bottom;
 cursor: pointer;
 outline: none;
 z-index: auto;
 box-sizing: border-box;
 position: relative;
 transition:
 color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: inherit;
 background-color: var(--n-color);
 align-items: center;
 `, [z("base-selection-input", `
 font-size: inherit;
 line-height: inherit;
 outline: none;
 cursor: pointer;
 box-sizing: border-box;
 border:none;
 width: 100%;
 padding: var(--n-padding-single);
 background-color: #0000;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 caret-color: var(--n-caret-color);
 `, [B("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), B("render-label", `
 color: var(--n-text-color);
 `)]), tt("disabled", [H("&:hover", [B("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), U("focus", [B("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), U("active", [B("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), z("base-selection-label", "background-color: var(--n-color-active);"), z("base-selection-tags", "background-color: var(--n-color-active);")])]), U("disabled", "cursor: not-allowed;", [B("arrow", `
 color: var(--n-arrow-color-disabled);
 `), z("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [z("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), B("render-label", `
 color: var(--n-text-color-disabled);
 `)]), z("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), z("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), z("base-selection-input-tag", `
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `, [B("input", `
 font-size: inherit;
 font-family: inherit;
 min-width: 1px;
 padding: 0;
 background-color: #0000;
 outline: none;
 border: none;
 max-width: 100%;
 overflow: hidden;
 width: 1em;
 line-height: inherit;
 cursor: pointer;
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 `), B("mirror", `
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]), ["warning", "error"].map((e) => U(`${e}-status`, [B("state-border", `border: var(--n-border-${e});`), tt("disabled", [H("&:hover", [B("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), U("active", [B("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), z("base-selection-label", `background-color: var(--n-color-active-${e});`), z("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), U("focus", [B("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), z("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), z("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [H("&:last-child", "padding-right: 0;"), z("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [B("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), Zo = window.Vue.computed, uP = window.Vue.defineComponent, fP = window.Vue.Fragment, De = window.Vue.h, hP = window.Vue.nextTick, pP = window.Vue.onMounted, Gt = window.Vue.ref, Hl = window.Vue.toRef, jl = window.Vue.watch, vP = window.Vue.watchEffect, gP = uP({
  name: "InternalSelection",
  props: Object.assign(Object.assign({}, ke.props), {
    clsPrefix: {
      type: String,
      required: !0
    },
    bordered: {
      type: Boolean,
      default: void 0
    },
    active: Boolean,
    pattern: {
      type: String,
      default: ""
    },
    placeholder: String,
    selectedOption: {
      type: Object,
      default: null
    },
    selectedOptions: {
      type: Array,
      default: null
    },
    labelField: {
      type: String,
      default: "label"
    },
    valueField: {
      type: String,
      default: "value"
    },
    multiple: Boolean,
    filterable: Boolean,
    clearable: Boolean,
    disabled: Boolean,
    size: {
      type: String,
      default: "medium"
    },
    loading: Boolean,
    autofocus: Boolean,
    showArrow: {
      type: Boolean,
      default: !0
    },
    inputProps: Object,
    focused: Boolean,
    renderTag: Function,
    onKeydown: Function,
    onClick: Function,
    onBlur: Function,
    onFocus: Function,
    onDeleteOption: Function,
    maxTagCount: [String, Number],
    ellipsisTagPopoverProps: Object,
    onClear: Function,
    onPatternInput: Function,
    onPatternFocus: Function,
    onPatternBlur: Function,
    renderLabel: Function,
    status: String,
    inlineThemeDisabled: Boolean,
    ignoreComposition: {
      type: Boolean,
      default: !0
    },
    onResize: Function
  }),
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedRtlRef: n
    } = je(e), o = At("InternalSelection", n, t), r = Gt(null), i = Gt(null), l = Gt(null), a = Gt(null), s = Gt(null), d = Gt(null), c = Gt(null), h = Gt(null), p = Gt(null), g = Gt(null), f = Gt(!1), v = Gt(!1), m = Gt(!1), u = ke("InternalSelection", "-internal-selection", cP, gv, e, Hl(e, "clsPrefix")), w = Zo(() => e.clearable && !e.disabled && (m.value || e.active)), x = Zo(() => e.selectedOption ? e.renderTag ? e.renderTag({
      option: e.selectedOption,
      handleClose: () => {
      }
    }) : e.renderLabel ? e.renderLabel(e.selectedOption, !0) : _n(e.selectedOption[e.labelField], e.selectedOption, !0) : e.placeholder), b = Zo(() => {
      const F = e.selectedOption;
      if (F)
        return F[e.labelField];
    }), C = Zo(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
    function S() {
      var F;
      const {
        value: j
      } = r;
      if (j) {
        const {
          value: pe
        } = i;
        pe && (pe.style.width = `${j.offsetWidth}px`, e.maxTagCount !== "responsive" && ((F = p.value) === null || F === void 0 || F.sync({
          showAllItemsBeforeCalculate: !1
        })));
      }
    }
    function y() {
      const {
        value: F
      } = g;
      F && (F.style.display = "none");
    }
    function T() {
      const {
        value: F
      } = g;
      F && (F.style.display = "inline-block");
    }
    jl(Hl(e, "active"), (F) => {
      F || y();
    }), jl(Hl(e, "pattern"), () => {
      e.multiple && hP(S);
    });
    function R(F) {
      const {
        onFocus: j
      } = e;
      j && j(F);
    }
    function E(F) {
      const {
        onBlur: j
      } = e;
      j && j(F);
    }
    function W(F) {
      const {
        onDeleteOption: j
      } = e;
      j && j(F);
    }
    function _(F) {
      const {
        onClear: j
      } = e;
      j && j(F);
    }
    function M(F) {
      const {
        onPatternInput: j
      } = e;
      j && j(F);
    }
    function I(F) {
      var j;
      (!F.relatedTarget || !(!((j = l.value) === null || j === void 0) && j.contains(F.relatedTarget))) && R(F);
    }
    function O(F) {
      var j;
      !((j = l.value) === null || j === void 0) && j.contains(F.relatedTarget) || E(F);
    }
    function K(F) {
      _(F);
    }
    function L() {
      m.value = !0;
    }
    function Y() {
      m.value = !1;
    }
    function Q(F) {
      !e.active || !e.filterable || F.target !== i.value && F.preventDefault();
    }
    function J(F) {
      W(F);
    }
    const q = Gt(!1);
    function A(F) {
      if (F.key === "Backspace" && !q.value && !e.pattern.length) {
        const {
          selectedOptions: j
        } = e;
        j != null && j.length && J(j[j.length - 1]);
      }
    }
    let G = null;
    function Z(F) {
      const {
        value: j
      } = r;
      if (j) {
        const pe = F.target.value;
        j.textContent = pe, S();
      }
      e.ignoreComposition && q.value ? G = F : M(F);
    }
    function ae() {
      q.value = !0;
    }
    function le() {
      q.value = !1, e.ignoreComposition && M(G), G = null;
    }
    function de(F) {
      var j;
      v.value = !0, (j = e.onPatternFocus) === null || j === void 0 || j.call(e, F);
    }
    function ge(F) {
      var j;
      v.value = !1, (j = e.onPatternBlur) === null || j === void 0 || j.call(e, F);
    }
    function X() {
      var F, j;
      if (e.filterable)
        v.value = !1, (F = d.value) === null || F === void 0 || F.blur(), (j = i.value) === null || j === void 0 || j.blur();
      else if (e.multiple) {
        const {
          value: pe
        } = a;
        pe == null || pe.blur();
      } else {
        const {
          value: pe
        } = s;
        pe == null || pe.blur();
      }
    }
    function ce() {
      var F, j, pe;
      e.filterable ? (v.value = !1, (F = d.value) === null || F === void 0 || F.focus()) : e.multiple ? (j = a.value) === null || j === void 0 || j.focus() : (pe = s.value) === null || pe === void 0 || pe.focus();
    }
    function Pe() {
      const {
        value: F
      } = i;
      F && (T(), F.focus());
    }
    function me() {
      const {
        value: F
      } = i;
      F && F.blur();
    }
    function $e(F) {
      const {
        value: j
      } = c;
      j && j.setTextContent(`+${F}`);
    }
    function Se() {
      const {
        value: F
      } = h;
      return F;
    }
    function Le() {
      return i.value;
    }
    let Ie = null;
    function re() {
      Ie !== null && window.clearTimeout(Ie);
    }
    function k() {
      e.active || (re(), Ie = window.setTimeout(() => {
        C.value && (f.value = !0);
      }, 100));
    }
    function $() {
      re();
    }
    function D(F) {
      F || (re(), f.value = !1);
    }
    jl(C, (F) => {
      F || (f.value = !1);
    }), pP(() => {
      vP(() => {
        const F = d.value;
        F && (e.disabled ? F.removeAttribute("tabindex") : F.tabIndex = v.value ? -1 : 0);
      });
    }), bp(l, e.onResize);
    const {
      inlineThemeDisabled: ee
    } = e, ve = Zo(() => {
      const {
        size: F
      } = e, {
        common: {
          cubicBezierEaseInOut: j
        },
        self: {
          fontWeight: pe,
          borderRadius: Fe,
          color: dt,
          placeholderColor: bt,
          textColor: Je,
          paddingSingle: Qe,
          paddingMultiple: wt,
          caretColor: nt,
          colorDisabled: fe,
          textColorDisabled: Re,
          placeholderColorDisabled: P,
          colorActive: N,
          boxShadowFocus: te,
          boxShadowActive: se,
          boxShadowHover: ue,
          border: be,
          borderFocus: we,
          borderHover: Ce,
          borderActive: Ve,
          arrowColor: it,
          arrowColorDisabled: He,
          loadingColor: Tt,
          // form warning
          colorActiveWarning: Vt,
          boxShadowFocusWarning: Bt,
          boxShadowActiveWarning: Wt,
          boxShadowHoverWarning: Ut,
          borderWarning: on,
          borderFocusWarning: Kt,
          borderHoverWarning: V,
          borderActiveWarning: ne,
          // form error
          colorActiveError: xe,
          boxShadowFocusError: ze,
          boxShadowActiveError: We,
          boxShadowHoverError: Be,
          borderError: at,
          borderFocusError: ht,
          borderHoverError: Jt,
          borderActiveError: In,
          // clear
          clearColor: An,
          clearColorHover: wo,
          clearColorPressed: yr,
          clearSize: xr,
          // arrow
          arrowSize: Cr,
          [oe("height", F)]: Sr,
          [oe("fontSize", F)]: $r
        }
      } = u.value, Yn = en(Qe), Zn = en(wt);
      return {
        "--n-bezier": j,
        "--n-border": be,
        "--n-border-active": Ve,
        "--n-border-focus": we,
        "--n-border-hover": Ce,
        "--n-border-radius": Fe,
        "--n-box-shadow-active": se,
        "--n-box-shadow-focus": te,
        "--n-box-shadow-hover": ue,
        "--n-caret-color": nt,
        "--n-color": dt,
        "--n-color-active": N,
        "--n-color-disabled": fe,
        "--n-font-size": $r,
        "--n-height": Sr,
        "--n-padding-single-top": Yn.top,
        "--n-padding-multiple-top": Zn.top,
        "--n-padding-single-right": Yn.right,
        "--n-padding-multiple-right": Zn.right,
        "--n-padding-single-left": Yn.left,
        "--n-padding-multiple-left": Zn.left,
        "--n-padding-single-bottom": Yn.bottom,
        "--n-padding-multiple-bottom": Zn.bottom,
        "--n-placeholder-color": bt,
        "--n-placeholder-color-disabled": P,
        "--n-text-color": Je,
        "--n-text-color-disabled": Re,
        "--n-arrow-color": it,
        "--n-arrow-color-disabled": He,
        "--n-loading-color": Tt,
        // form warning
        "--n-color-active-warning": Vt,
        "--n-box-shadow-focus-warning": Bt,
        "--n-box-shadow-active-warning": Wt,
        "--n-box-shadow-hover-warning": Ut,
        "--n-border-warning": on,
        "--n-border-focus-warning": Kt,
        "--n-border-hover-warning": V,
        "--n-border-active-warning": ne,
        // form error
        "--n-color-active-error": xe,
        "--n-box-shadow-focus-error": ze,
        "--n-box-shadow-active-error": We,
        "--n-box-shadow-hover-error": Be,
        "--n-border-error": at,
        "--n-border-focus-error": ht,
        "--n-border-hover-error": Jt,
        "--n-border-active-error": In,
        // clear
        "--n-clear-size": xr,
        "--n-clear-color": An,
        "--n-clear-color-hover": wo,
        "--n-clear-color-pressed": yr,
        // arrow-size
        "--n-arrow-size": Cr,
        // font-weight
        "--n-font-weight": pe
      };
    }), he = ee ? St("internal-selection", Zo(() => e.size[0]), ve, e) : void 0;
    return {
      mergedTheme: u,
      mergedClearable: w,
      mergedClsPrefix: t,
      rtlEnabled: o,
      patternInputFocused: v,
      filterablePlaceholder: x,
      label: b,
      selected: C,
      showTagsPanel: f,
      isComposing: q,
      // dom ref
      counterRef: c,
      counterWrapperRef: h,
      patternInputMirrorRef: r,
      patternInputRef: i,
      selfRef: l,
      multipleElRef: a,
      singleElRef: s,
      patternInputWrapperRef: d,
      overflowRef: p,
      inputTagElRef: g,
      handleMouseDown: Q,
      handleFocusin: I,
      handleClear: K,
      handleMouseEnter: L,
      handleMouseLeave: Y,
      handleDeleteOption: J,
      handlePatternKeyDown: A,
      handlePatternInputInput: Z,
      handlePatternInputBlur: ge,
      handlePatternInputFocus: de,
      handleMouseEnterCounter: k,
      handleMouseLeaveCounter: $,
      handleFocusout: O,
      handleCompositionEnd: le,
      handleCompositionStart: ae,
      onPopoverUpdateShow: D,
      focus: ce,
      focusInput: Pe,
      blur: X,
      blurInput: me,
      updateCounter: $e,
      getCounter: Se,
      getTail: Le,
      renderLabel: e.renderLabel,
      cssVars: ee ? void 0 : ve,
      themeClass: he == null ? void 0 : he.themeClass,
      onRender: he == null ? void 0 : he.onRender
    };
  },
  render() {
    const {
      status: e,
      multiple: t,
      size: n,
      disabled: o,
      filterable: r,
      maxTagCount: i,
      bordered: l,
      clsPrefix: a,
      ellipsisTagPopoverProps: s,
      onRender: d,
      renderTag: c,
      renderLabel: h
    } = this;
    d == null || d();
    const p = i === "responsive", g = typeof i == "number", f = p || g, v = De(Es, null, {
      default: () => De(vv, {
        clsPrefix: a,
        loading: this.loading,
        showArrow: this.showArrow,
        showClear: this.mergedClearable && this.selected,
        onClear: this.handleClear
      }, {
        default: () => {
          var u, w;
          return (w = (u = this.$slots).arrow) === null || w === void 0 ? void 0 : w.call(u);
        }
      })
    });
    let m;
    if (t) {
      const {
        labelField: u
      } = this, w = (M) => De("div", {
        class: `${a}-base-selection-tag-wrapper`,
        key: M.value
      }, c ? c({
        option: M,
        handleClose: () => {
          this.handleDeleteOption(M);
        }
      }) : De(To, {
        size: n,
        closable: !M.disabled,
        disabled: o,
        onClose: () => {
          this.handleDeleteOption(M);
        },
        internalCloseIsButtonTag: !1,
        internalCloseFocusable: !1
      }, {
        default: () => h ? h(M, !0) : _n(M[u], M, !0)
      })), x = () => (g ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(w), b = r ? De("div", {
        class: `${a}-base-selection-input-tag`,
        ref: "inputTagElRef",
        key: "__input-tag__"
      }, De("input", Object.assign({}, this.inputProps, {
        ref: "patternInputRef",
        tabindex: -1,
        disabled: o,
        value: this.pattern,
        autofocus: this.autofocus,
        class: `${a}-base-selection-input-tag__input`,
        onBlur: this.handlePatternInputBlur,
        onFocus: this.handlePatternInputFocus,
        onKeydown: this.handlePatternKeyDown,
        onInput: this.handlePatternInputInput,
        onCompositionstart: this.handleCompositionStart,
        onCompositionend: this.handleCompositionEnd
      })), De("span", {
        ref: "patternInputMirrorRef",
        class: `${a}-base-selection-input-tag__mirror`
      }, this.pattern)) : null, C = p ? () => De("div", {
        class: `${a}-base-selection-tag-wrapper`,
        ref: "counterWrapperRef"
      }, De(To, {
        size: n,
        ref: "counterRef",
        onMouseenter: this.handleMouseEnterCounter,
        onMouseleave: this.handleMouseLeaveCounter,
        disabled: o
      })) : void 0;
      let S;
      if (g) {
        const M = this.selectedOptions.length - i;
        M > 0 && (S = De("div", {
          class: `${a}-base-selection-tag-wrapper`,
          key: "__counter__"
        }, De(To, {
          size: n,
          ref: "counterRef",
          onMouseenter: this.handleMouseEnterCounter,
          disabled: o
        }, {
          default: () => `+${M}`
        })));
      }
      const y = p ? r ? De(Kc, {
        ref: "overflowRef",
        updateCounter: this.updateCounter,
        getCounter: this.getCounter,
        getTail: this.getTail,
        style: {
          width: "100%",
          display: "flex",
          overflow: "hidden"
        }
      }, {
        default: x,
        counter: C,
        tail: () => b
      }) : De(Kc, {
        ref: "overflowRef",
        updateCounter: this.updateCounter,
        getCounter: this.getCounter,
        style: {
          width: "100%",
          display: "flex",
          overflow: "hidden"
        }
      }, {
        default: x,
        counter: C
      }) : g && S ? x().concat(S) : x(), T = f ? () => De("div", {
        class: `${a}-base-selection-popover`
      }, p ? x() : this.selectedOptions.map(w)) : void 0, R = f ? Object.assign({
        show: this.showTagsPanel,
        trigger: "hover",
        overlap: !0,
        placement: "top",
        width: "trigger",
        onUpdateShow: this.onPopoverUpdateShow,
        theme: this.mergedTheme.peers.Popover,
        themeOverrides: this.mergedTheme.peerOverrides.Popover
      }, s) : null, W = (this.selected ? !1 : this.active ? !this.pattern && !this.isComposing : !0) ? De("div", {
        class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`
      }, De("div", {
        class: `${a}-base-selection-placeholder__inner`
      }, this.placeholder)) : null, _ = r ? De("div", {
        ref: "patternInputWrapperRef",
        class: `${a}-base-selection-tags`
      }, y, p ? null : b, v) : De("div", {
        ref: "multipleElRef",
        class: `${a}-base-selection-tags`,
        tabindex: o ? void 0 : 0
      }, y, v);
      m = De(fP, null, f ? De(bi, Object.assign({}, R, {
        scrollable: !0,
        style: "max-height: calc(var(--v-target-height) * 6.6);"
      }), {
        trigger: () => _,
        default: T
      }) : _, W);
    } else if (r) {
      const u = this.pattern || this.isComposing, w = this.active ? !u : !this.selected, x = this.active ? !1 : this.selected;
      m = De("div", {
        ref: "patternInputWrapperRef",
        class: `${a}-base-selection-label`,
        title: this.patternInputFocused ? void 0 : Yc(this.label)
      }, De("input", Object.assign({}, this.inputProps, {
        ref: "patternInputRef",
        class: `${a}-base-selection-input`,
        value: this.active ? this.pattern : "",
        placeholder: "",
        readonly: o,
        disabled: o,
        tabindex: -1,
        autofocus: this.autofocus,
        onFocus: this.handlePatternInputFocus,
        onBlur: this.handlePatternInputBlur,
        onInput: this.handlePatternInputInput,
        onCompositionstart: this.handleCompositionStart,
        onCompositionend: this.handleCompositionEnd
      })), x ? De("div", {
        class: `${a}-base-selection-label__render-label ${a}-base-selection-overlay`,
        key: "input"
      }, De("div", {
        class: `${a}-base-selection-overlay__wrapper`
      }, c ? c({
        option: this.selectedOption,
        handleClose: () => {
        }
      }) : h ? h(this.selectedOption, !0) : _n(this.label, this.selectedOption, !0))) : null, w ? De("div", {
        class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`,
        key: "placeholder"
      }, De("div", {
        class: `${a}-base-selection-overlay__wrapper`
      }, this.filterablePlaceholder)) : null, v);
    } else
      m = De("div", {
        ref: "singleElRef",
        class: `${a}-base-selection-label`,
        tabindex: this.disabled ? void 0 : 0
      }, this.label !== void 0 ? De("div", {
        class: `${a}-base-selection-input`,
        title: Yc(this.label),
        key: "input"
      }, De("div", {
        class: `${a}-base-selection-input__content`
      }, c ? c({
        option: this.selectedOption,
        handleClose: () => {
        }
      }) : h ? h(this.selectedOption, !0) : _n(this.label, this.selectedOption, !0))) : De("div", {
        class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`,
        key: "placeholder"
      }, De("div", {
        class: `${a}-base-selection-placeholder__inner`
      }, this.placeholder)), v);
    return De("div", {
      ref: "selfRef",
      class: [`${a}-base-selection`, this.rtlEnabled && `${a}-base-selection--rtl`, this.themeClass, e && `${a}-base-selection--${e}-status`, {
        [`${a}-base-selection--active`]: this.active,
        [`${a}-base-selection--selected`]: this.selected || this.active && this.pattern,
        [`${a}-base-selection--disabled`]: this.disabled,
        [`${a}-base-selection--multiple`]: this.multiple,
        // focus is not controlled by selection itself since it always need
        // to be managed together with menu. provide :focus style will cause
        // many redundant codes.
        [`${a}-base-selection--focus`]: this.focused
      }],
      style: this.cssVars,
      onClick: this.onClick,
      onMouseenter: this.handleMouseEnter,
      onMouseleave: this.handleMouseLeave,
      onKeydown: this.onKeydown,
      onFocusin: this.handleFocusin,
      onFocusout: this.handleFocusout,
      onMousedown: this.handleMouseDown
    }, m, l ? De("div", {
      class: `${a}-base-selection__border`
    }) : null, l ? De("div", {
      class: `${a}-base-selection__state-border`
    }) : null);
  }
}), {
  cubicBezierEaseInOut: eo
} = No;
function mP({
  duration: e = ".2s",
  delay: t = ".1s"
} = {}) {
  return [H("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", {
    opacity: 1
  }), H("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), H("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${eo},
 max-width ${e} ${eo} ${t},
 margin-left ${e} ${eo} ${t},
 margin-right ${e} ${eo} ${t};
 `), H("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${eo} ${t},
 max-width ${e} ${eo},
 margin-left ${e} ${eo},
 margin-right ${e} ${eo};
 `)];
}
const bP = z("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`), wP = window.Vue.defineComponent, yP = window.Vue.h, xP = window.Vue.nextTick, CP = window.Vue.onBeforeUnmount, Yu = window.Vue.ref, SP = window.Vue.toRef, $P = wP({
  name: "BaseWave",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    Ho("-base-wave", bP, SP(e, "clsPrefix"));
    const t = Yu(null), n = Yu(!1);
    let o = null;
    return CP(() => {
      o !== null && window.clearTimeout(o);
    }), {
      active: n,
      selfRef: t,
      play() {
        o !== null && (window.clearTimeout(o), n.value = !1, o = null), xP(() => {
          var r;
          (r = t.value) === null || r === void 0 || r.offsetHeight, n.value = !0, o = window.setTimeout(() => {
            n.value = !1, o = null;
          }, 1e3);
        });
      }
    };
  },
  render() {
    const {
      clsPrefix: e
    } = this;
    return yP("div", {
      ref: "selfRef",
      "aria-hidden": !0,
      class: [`${e}-base-wave`, this.active && `${e}-base-wave--active`]
    });
  }
}), RP = hr && "chrome" in window;
hr && navigator.userAgent.includes("Firefox");
const mv = hr && navigator.userAgent.includes("Safari") && !RP, kP = {
  paddingTiny: "0 8px",
  paddingSmall: "0 10px",
  paddingMedium: "0 12px",
  paddingLarge: "0 14px",
  clearSize: "16px"
};
function PP(e) {
  const {
    textColor2: t,
    textColor3: n,
    textColorDisabled: o,
    primaryColor: r,
    primaryColorHover: i,
    inputColor: l,
    inputColorDisabled: a,
    borderColor: s,
    warningColor: d,
    warningColorHover: c,
    errorColor: h,
    errorColorHover: p,
    borderRadius: g,
    lineHeight: f,
    fontSizeTiny: v,
    fontSizeSmall: m,
    fontSizeMedium: u,
    fontSizeLarge: w,
    heightTiny: x,
    heightSmall: b,
    heightMedium: C,
    heightLarge: S,
    actionColor: y,
    clearColor: T,
    clearColorHover: R,
    clearColorPressed: E,
    placeholderColor: W,
    placeholderColorDisabled: _,
    iconColor: M,
    iconColorDisabled: I,
    iconColorHover: O,
    iconColorPressed: K,
    fontWeight: L
  } = e;
  return Object.assign(Object.assign({}, kP), {
    fontWeight: L,
    countTextColorDisabled: o,
    countTextColor: n,
    heightTiny: x,
    heightSmall: b,
    heightMedium: C,
    heightLarge: S,
    fontSizeTiny: v,
    fontSizeSmall: m,
    fontSizeMedium: u,
    fontSizeLarge: w,
    lineHeight: f,
    lineHeightTextarea: f,
    borderRadius: g,
    iconSize: "16px",
    groupLabelColor: y,
    groupLabelTextColor: t,
    textColor: t,
    textColorDisabled: o,
    textDecorationColor: t,
    caretColor: r,
    placeholderColor: W,
    placeholderColorDisabled: _,
    color: l,
    colorDisabled: a,
    colorFocus: l,
    groupLabelBorder: `1px solid ${s}`,
    border: `1px solid ${s}`,
    borderHover: `1px solid ${i}`,
    borderDisabled: `1px solid ${s}`,
    borderFocus: `1px solid ${i}`,
    boxShadowFocus: `0 0 0 2px ${Ee(r, {
      alpha: 0.2
    })}`,
    loadingColor: r,
    // warning
    loadingColorWarning: d,
    borderWarning: `1px solid ${d}`,
    borderHoverWarning: `1px solid ${c}`,
    colorFocusWarning: l,
    borderFocusWarning: `1px solid ${c}`,
    boxShadowFocusWarning: `0 0 0 2px ${Ee(d, {
      alpha: 0.2
    })}`,
    caretColorWarning: d,
    // error
    loadingColorError: h,
    borderError: `1px solid ${h}`,
    borderHoverError: `1px solid ${p}`,
    colorFocusError: l,
    borderFocusError: `1px solid ${p}`,
    boxShadowFocusError: `0 0 0 2px ${Ee(h, {
      alpha: 0.2
    })}`,
    caretColorError: h,
    clearColor: T,
    clearColorHover: R,
    clearColorPressed: E,
    iconColor: M,
    iconColorDisabled: I,
    iconColorHover: O,
    iconColorPressed: K,
    suffixTextColor: t
  });
}
const Md = {
  name: "Input",
  common: mt,
  peers: {
    Scrollbar: gi
  },
  self: PP
}, bv = "n-input", _P = z("input", `
 max-width: 100%;
 cursor: text;
 line-height: 1.5;
 z-index: auto;
 outline: none;
 box-sizing: border-box;
 position: relative;
 display: inline-flex;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 font-weight: var(--n-font-weight);
 --n-padding-vertical: calc((var(--n-height) - 1.5 * var(--n-font-size)) / 2);
`, [
  // common
  B("input, textarea", `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),
  B("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder", `
 box-sizing: border-box;
 font-size: inherit;
 line-height: 1.5;
 font-family: inherit;
 border: none;
 outline: none;
 background-color: #0000;
 text-align: inherit;
 transition:
 -webkit-text-fill-color .3s var(--n-bezier),
 caret-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 `),
  B("input-el, textarea-el", `
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `, [H("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), H("&::placeholder", `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `), H("&:-webkit-autofill ~", [B("placeholder", "display: none;")])]),
  U("round", [tt("textarea", "border-radius: calc(var(--n-height) / 2);")]),
  B("placeholder", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `, [H("span", `
 width: 100%;
 display: inline-block;
 `)]),
  U("textarea", [B("placeholder", "overflow: visible;")]),
  tt("autosize", "width: 100%;"),
  U("autosize", [B("textarea-el, input-el", `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),
  // input
  z("input-wrapper", `
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `),
  B("input-mirror", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `),
  B("input-el", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [H("&[type=password]::-ms-reveal", "display: none;"), H("+", [B("placeholder", `
 display: flex;
 align-items: center; 
 `)])]),
  tt("textarea", [B("placeholder", "white-space: nowrap;")]),
  B("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `),
  // textarea
  U("textarea", "width: 100%;", [z("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), U("resizable", [z("input-wrapper", `
 resize: vertical;
 min-height: var(--n-height);
 `)]), B("textarea-el, textarea-mirror, placeholder", `
 height: 100%;
 padding-left: 0;
 padding-right: 0;
 padding-top: var(--n-padding-vertical);
 padding-bottom: var(--n-padding-vertical);
 word-break: break-word;
 display: inline-block;
 vertical-align: bottom;
 box-sizing: border-box;
 line-height: var(--n-line-height-textarea);
 margin: 0;
 resize: none;
 white-space: pre-wrap;
 scroll-padding-block-end: var(--n-padding-vertical);
 `), B("textarea-mirror", `
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),
  // pair
  U("pair", [B("input-el, placeholder", "text-align: center;"), B("separator", `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `, [z("icon", `
 color: var(--n-icon-color);
 `), z("base-icon", `
 color: var(--n-icon-color);
 `)])]),
  U("disabled", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [B("border", "border: var(--n-border-disabled);"), B("input-el, textarea-el", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), B("placeholder", "color: var(--n-placeholder-color-disabled);"), B("separator", "color: var(--n-text-color-disabled);", [z("icon", `
 color: var(--n-icon-color-disabled);
 `), z("base-icon", `
 color: var(--n-icon-color-disabled);
 `)]), z("input-word-count", `
 color: var(--n-count-text-color-disabled);
 `), B("suffix, prefix", "color: var(--n-text-color-disabled);", [z("icon", `
 color: var(--n-icon-color-disabled);
 `), z("internal-icon", `
 color: var(--n-icon-color-disabled);
 `)])]),
  tt("disabled", [B("eye", `
 color: var(--n-icon-color);
 cursor: pointer;
 `, [H("&:hover", `
 color: var(--n-icon-color-hover);
 `), H("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), H("&:hover", [B("state-border", "border: var(--n-border-hover);")]), U("focus", "background-color: var(--n-color-focus);", [B("state-border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),
  B("border, state-border", `
 box-sizing: border-box;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: inherit;
 border: var(--n-border);
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),
  B("state-border", `
 border-color: #0000;
 z-index: 1;
 `),
  B("prefix", "margin-right: 4px;"),
  B("suffix", `
 margin-left: 4px;
 `),
  B("suffix, prefix", `
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `, [z("base-loading", `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `), z("base-clear", `
 font-size: var(--n-icon-size);
 `, [B("placeholder", [z("base-icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), H(">", [z("icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), z("base-icon", `
 font-size: var(--n-icon-size);
 `)]),
  z("input-word-count", `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),
  ["warning", "error"].map((e) => U(`${e}-status`, [tt("disabled", [z("base-loading", `
 color: var(--n-loading-color-${e})
 `), B("input-el, textarea-el", `
 caret-color: var(--n-caret-color-${e});
 `), B("state-border", `
 border: var(--n-border-${e});
 `), H("&:hover", [B("state-border", `
 border: var(--n-border-hover-${e});
 `)]), H("&:focus", `
 background-color: var(--n-color-focus-${e});
 `, [B("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)]), U("focus", `
 background-color: var(--n-color-focus-${e});
 `, [B("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))
]), TP = z("input", [U("disabled", [B("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]), FP = window.Vue.ref, EP = window.Vue.watch;
function zP(e) {
  let t = 0;
  for (const n of e)
    t++;
  return t;
}
function Yi(e) {
  return e === "" || e == null;
}
function OP(e) {
  const t = FP(null);
  function n() {
    const {
      value: i
    } = e;
    if (!(i != null && i.focus)) {
      r();
      return;
    }
    const {
      selectionStart: l,
      selectionEnd: a,
      value: s
    } = i;
    if (l == null || a == null) {
      r();
      return;
    }
    t.value = {
      start: l,
      end: a,
      beforeText: s.slice(0, l),
      afterText: s.slice(a)
    };
  }
  function o() {
    var i;
    const {
      value: l
    } = t, {
      value: a
    } = e;
    if (!l || !a)
      return;
    const {
      value: s
    } = a, {
      start: d,
      beforeText: c,
      afterText: h
    } = l;
    let p = s.length;
    if (s.endsWith(h))
      p = s.length - h.length;
    else if (s.startsWith(c))
      p = c.length;
    else {
      const g = c[d - 1], f = s.indexOf(g, d - 1);
      f !== -1 && (p = f + 1);
    }
    (i = a.setSelectionRange) === null || i === void 0 || i.call(a, p, p);
  }
  function r() {
    t.value = null;
  }
  return EP(e, r), {
    recordCursor: n,
    restoreCursor: o
  };
}
const MP = window.Vue.computed, IP = window.Vue.defineComponent, AP = window.Vue.h, VP = window.Vue.inject, Zu = IP({
  name: "InputWordCount",
  setup(e, {
    slots: t
  }) {
    const {
      mergedValueRef: n,
      maxlengthRef: o,
      mergedClsPrefixRef: r,
      countGraphemesRef: i
    } = VP(bv), l = MP(() => {
      const {
        value: a
      } = n;
      return a === null || Array.isArray(a) ? 0 : (i.value || zP)(a);
    });
    return () => {
      const {
        value: a
      } = o, {
        value: s
      } = n;
      return AP("span", {
        class: `${r.value}-input-word-count`
      }, ox(t.default, {
        value: s === null || Array.isArray(s) ? "" : s
      }, () => [a === void 0 ? l.value : `${l.value} / ${a}`]));
    };
  }
}), to = window.Vue.computed, BP = window.Vue.defineComponent, LP = window.Vue.Fragment, DP = window.Vue.getCurrentInstance, Ne = window.Vue.h, Ju = window.Vue.nextTick, NP = window.Vue.onMounted, HP = window.Vue.provide, Et = window.Vue.ref, Qu = window.Vue.toRef, ef = window.Vue.watch, tf = window.Vue.watchEffect, jP = Object.assign(Object.assign({}, ke.props), {
  bordered: {
    type: Boolean,
    default: void 0
  },
  type: {
    type: String,
    default: "text"
  },
  placeholder: [Array, String],
  defaultValue: {
    type: [String, Array],
    default: null
  },
  value: [String, Array],
  disabled: {
    type: Boolean,
    default: void 0
  },
  size: String,
  rows: {
    type: [Number, String],
    default: 3
  },
  round: Boolean,
  minlength: [String, Number],
  maxlength: [String, Number],
  clearable: Boolean,
  autosize: {
    type: [Boolean, Object],
    default: !1
  },
  pair: Boolean,
  separator: String,
  readonly: {
    type: [String, Boolean],
    default: !1
  },
  passivelyActivated: Boolean,
  showPasswordOn: String,
  stateful: {
    type: Boolean,
    default: !0
  },
  autofocus: Boolean,
  inputProps: Object,
  resizable: {
    type: Boolean,
    default: !0
  },
  showCount: Boolean,
  loading: {
    type: Boolean,
    default: void 0
  },
  allowInput: Function,
  renderCount: Function,
  onMousedown: Function,
  onKeydown: Function,
  onKeyup: [Function, Array],
  onInput: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
  onClick: [Function, Array],
  onChange: [Function, Array],
  onClear: [Function, Array],
  countGraphemes: Function,
  status: String,
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  /** private */
  textDecoration: [String, Array],
  attrSize: {
    type: Number,
    default: 20
  },
  onInputBlur: [Function, Array],
  onInputFocus: [Function, Array],
  onDeactivate: [Function, Array],
  onActivate: [Function, Array],
  onWrapperFocus: [Function, Array],
  onWrapperBlur: [Function, Array],
  internalDeactivateOnEnter: Boolean,
  internalForceFocus: Boolean,
  internalLoadingBeforeSuffix: {
    type: Boolean,
    default: !0
  },
  /** deprecated */
  showPasswordToggle: Boolean
}), js = BP({
  name: "Input",
  props: jP,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBorderedRef: n,
      inlineThemeDisabled: o,
      mergedRtlRef: r
    } = je(e), i = ke("Input", "-input", _P, Md, e, t);
    mv && Ho("-input-safari", TP, t);
    const l = Et(null), a = Et(null), s = Et(null), d = Et(null), c = Et(null), h = Et(null), p = Et(null), g = OP(p), f = Et(null), {
      localeRef: v
    } = vr("Input"), m = Et(e.defaultValue), u = Qu(e, "value"), w = It(u, m), x = qn(e), {
      mergedSizeRef: b,
      mergedDisabledRef: C,
      mergedStatusRef: S
    } = x, y = Et(!1), T = Et(!1), R = Et(!1), E = Et(!1);
    let W = null;
    const _ = to(() => {
      const {
        placeholder: V,
        pair: ne
      } = e;
      return ne ? Array.isArray(V) ? V : V === void 0 ? ["", ""] : [V, V] : V === void 0 ? [v.value.placeholder] : [V];
    }), M = to(() => {
      const {
        value: V
      } = R, {
        value: ne
      } = w, {
        value: xe
      } = _;
      return !V && (Yi(ne) || Array.isArray(ne) && Yi(ne[0])) && xe[0];
    }), I = to(() => {
      const {
        value: V
      } = R, {
        value: ne
      } = w, {
        value: xe
      } = _;
      return !V && xe[1] && (Yi(ne) || Array.isArray(ne) && Yi(ne[1]));
    }), O = Me(() => e.internalForceFocus || y.value), K = Me(() => {
      if (C.value || e.readonly || !e.clearable || !O.value && !T.value)
        return !1;
      const {
        value: V
      } = w, {
        value: ne
      } = O;
      return e.pair ? !!(Array.isArray(V) && (V[0] || V[1])) && (T.value || ne) : !!V && (T.value || ne);
    }), L = to(() => {
      const {
        showPasswordOn: V
      } = e;
      if (V)
        return V;
      if (e.showPasswordToggle) return "click";
    }), Y = Et(!1), Q = to(() => {
      const {
        textDecoration: V
      } = e;
      return V ? Array.isArray(V) ? V.map((ne) => ({
        textDecoration: ne
      })) : [{
        textDecoration: V
      }] : ["", ""];
    }), J = Et(void 0), q = () => {
      var V, ne;
      if (e.type === "textarea") {
        const {
          autosize: xe
        } = e;
        if (xe && (J.value = (ne = (V = f.value) === null || V === void 0 ? void 0 : V.$el) === null || ne === void 0 ? void 0 : ne.offsetWidth), !a.value || typeof xe == "boolean") return;
        const {
          paddingTop: ze,
          paddingBottom: We,
          lineHeight: Be
        } = window.getComputedStyle(a.value), at = Number(ze.slice(0, -2)), ht = Number(We.slice(0, -2)), Jt = Number(Be.slice(0, -2)), {
          value: In
        } = s;
        if (!In) return;
        if (xe.minRows) {
          const An = Math.max(xe.minRows, 1), wo = `${at + ht + Jt * An}px`;
          In.style.minHeight = wo;
        }
        if (xe.maxRows) {
          const An = `${at + ht + Jt * xe.maxRows}px`;
          In.style.maxHeight = An;
        }
      }
    }, A = to(() => {
      const {
        maxlength: V
      } = e;
      return V === void 0 ? void 0 : Number(V);
    });
    NP(() => {
      const {
        value: V
      } = w;
      Array.isArray(V) || Ve(V);
    });
    const G = DP().proxy;
    function Z(V, ne) {
      const {
        onUpdateValue: xe,
        "onUpdate:value": ze,
        onInput: We
      } = e, {
        nTriggerFormInput: Be
      } = x;
      xe && ie(xe, V, ne), ze && ie(ze, V, ne), We && ie(We, V, ne), m.value = V, Be();
    }
    function ae(V, ne) {
      const {
        onChange: xe
      } = e, {
        nTriggerFormChange: ze
      } = x;
      xe && ie(xe, V, ne), m.value = V, ze();
    }
    function le(V) {
      const {
        onBlur: ne
      } = e, {
        nTriggerFormBlur: xe
      } = x;
      ne && ie(ne, V), xe();
    }
    function de(V) {
      const {
        onFocus: ne
      } = e, {
        nTriggerFormFocus: xe
      } = x;
      ne && ie(ne, V), xe();
    }
    function ge(V) {
      const {
        onClear: ne
      } = e;
      ne && ie(ne, V);
    }
    function X(V) {
      const {
        onInputBlur: ne
      } = e;
      ne && ie(ne, V);
    }
    function ce(V) {
      const {
        onInputFocus: ne
      } = e;
      ne && ie(ne, V);
    }
    function Pe() {
      const {
        onDeactivate: V
      } = e;
      V && ie(V);
    }
    function me() {
      const {
        onActivate: V
      } = e;
      V && ie(V);
    }
    function $e(V) {
      const {
        onClick: ne
      } = e;
      ne && ie(ne, V);
    }
    function Se(V) {
      const {
        onWrapperFocus: ne
      } = e;
      ne && ie(ne, V);
    }
    function Le(V) {
      const {
        onWrapperBlur: ne
      } = e;
      ne && ie(ne, V);
    }
    function Ie() {
      R.value = !0;
    }
    function re(V) {
      R.value = !1, V.target === h.value ? k(V, 1) : k(V, 0);
    }
    function k(V, ne = 0, xe = "input") {
      const ze = V.target.value;
      if (Ve(ze), V instanceof InputEvent && !V.isComposing && (R.value = !1), e.type === "textarea") {
        const {
          value: Be
        } = f;
        Be && Be.syncUnifiedContainer();
      }
      if (W = ze, R.value) return;
      g.recordCursor();
      const We = $(ze);
      if (We)
        if (!e.pair)
          xe === "input" ? Z(ze, {
            source: ne
          }) : ae(ze, {
            source: ne
          });
        else {
          let {
            value: Be
          } = w;
          Array.isArray(Be) ? Be = [Be[0], Be[1]] : Be = ["", ""], Be[ne] = ze, xe === "input" ? Z(Be, {
            source: ne
          }) : ae(Be, {
            source: ne
          });
        }
      G.$forceUpdate(), We || Ju(g.restoreCursor);
    }
    function $(V) {
      const {
        countGraphemes: ne,
        maxlength: xe,
        minlength: ze
      } = e;
      if (ne) {
        let Be;
        if (xe !== void 0 && (Be === void 0 && (Be = ne(V)), Be > Number(xe)) || ze !== void 0 && (Be === void 0 && (Be = ne(V)), Be < Number(xe)))
          return !1;
      }
      const {
        allowInput: We
      } = e;
      return typeof We == "function" ? We(V) : !0;
    }
    function D(V) {
      X(V), V.relatedTarget === l.value && Pe(), V.relatedTarget !== null && (V.relatedTarget === c.value || V.relatedTarget === h.value || V.relatedTarget === a.value) || (E.value = !1), F(V, "blur"), p.value = null;
    }
    function ee(V, ne) {
      ce(V), y.value = !0, E.value = !0, me(), F(V, "focus"), ne === 0 ? p.value = c.value : ne === 1 ? p.value = h.value : ne === 2 && (p.value = a.value);
    }
    function ve(V) {
      e.passivelyActivated && (Le(V), F(V, "blur"));
    }
    function he(V) {
      e.passivelyActivated && (y.value = !0, Se(V), F(V, "focus"));
    }
    function F(V, ne) {
      V.relatedTarget !== null && (V.relatedTarget === c.value || V.relatedTarget === h.value || V.relatedTarget === a.value || V.relatedTarget === l.value) || (ne === "focus" ? (de(V), y.value = !0) : ne === "blur" && (le(V), y.value = !1));
    }
    function j(V, ne) {
      k(V, ne, "change");
    }
    function pe(V) {
      $e(V);
    }
    function Fe(V) {
      ge(V), dt();
    }
    function dt() {
      e.pair ? (Z(["", ""], {
        source: "clear"
      }), ae(["", ""], {
        source: "clear"
      })) : (Z("", {
        source: "clear"
      }), ae("", {
        source: "clear"
      }));
    }
    function bt(V) {
      const {
        onMousedown: ne
      } = e;
      ne && ne(V);
      const {
        tagName: xe
      } = V.target;
      if (xe !== "INPUT" && xe !== "TEXTAREA") {
        if (e.resizable) {
          const {
            value: ze
          } = l;
          if (ze) {
            const {
              left: We,
              top: Be,
              width: at,
              height: ht
            } = ze.getBoundingClientRect(), Jt = 14;
            if (We + at - Jt < V.clientX && V.clientX < We + at && Be + ht - Jt < V.clientY && V.clientY < Be + ht)
              return;
          }
        }
        V.preventDefault(), y.value || te();
      }
    }
    function Je() {
      var V;
      T.value = !0, e.type === "textarea" && ((V = f.value) === null || V === void 0 || V.handleMouseEnterWrapper());
    }
    function Qe() {
      var V;
      T.value = !1, e.type === "textarea" && ((V = f.value) === null || V === void 0 || V.handleMouseLeaveWrapper());
    }
    function wt() {
      C.value || L.value === "click" && (Y.value = !Y.value);
    }
    function nt(V) {
      if (C.value) return;
      V.preventDefault();
      const ne = (ze) => {
        ze.preventDefault(), et("mouseup", document, ne);
      };
      if (st("mouseup", document, ne), L.value !== "mousedown") return;
      Y.value = !0;
      const xe = () => {
        Y.value = !1, et("mouseup", document, xe);
      };
      st("mouseup", document, xe);
    }
    function fe(V) {
      e.onKeyup && ie(e.onKeyup, V);
    }
    function Re(V) {
      switch (e.onKeydown && ie(e.onKeydown, V), V.key) {
        case "Escape":
          N();
          break;
        case "Enter":
          P(V);
          break;
      }
    }
    function P(V) {
      var ne, xe;
      if (e.passivelyActivated) {
        const {
          value: ze
        } = E;
        if (ze) {
          e.internalDeactivateOnEnter && N();
          return;
        }
        V.preventDefault(), e.type === "textarea" ? (ne = a.value) === null || ne === void 0 || ne.focus() : (xe = c.value) === null || xe === void 0 || xe.focus();
      }
    }
    function N() {
      e.passivelyActivated && (E.value = !1, Ju(() => {
        var V;
        (V = l.value) === null || V === void 0 || V.focus();
      }));
    }
    function te() {
      var V, ne, xe;
      C.value || (e.passivelyActivated ? (V = l.value) === null || V === void 0 || V.focus() : ((ne = a.value) === null || ne === void 0 || ne.focus(), (xe = c.value) === null || xe === void 0 || xe.focus()));
    }
    function se() {
      var V;
      !((V = l.value) === null || V === void 0) && V.contains(document.activeElement) && document.activeElement.blur();
    }
    function ue() {
      var V, ne;
      (V = a.value) === null || V === void 0 || V.select(), (ne = c.value) === null || ne === void 0 || ne.select();
    }
    function be() {
      C.value || (a.value ? a.value.focus() : c.value && c.value.focus());
    }
    function we() {
      const {
        value: V
      } = l;
      V != null && V.contains(document.activeElement) && V !== document.activeElement && N();
    }
    function Ce(V) {
      if (e.type === "textarea") {
        const {
          value: ne
        } = a;
        ne == null || ne.scrollTo(V);
      } else {
        const {
          value: ne
        } = c;
        ne == null || ne.scrollTo(V);
      }
    }
    function Ve(V) {
      const {
        type: ne,
        pair: xe,
        autosize: ze
      } = e;
      if (!xe && ze)
        if (ne === "textarea") {
          const {
            value: We
          } = s;
          We && (We.textContent = `${V ?? ""}\r
`);
        } else {
          const {
            value: We
          } = d;
          We && (V ? We.textContent = V : We.innerHTML = "&nbsp;");
        }
    }
    function it() {
      q();
    }
    const He = Et({
      top: "0"
    });
    function Tt(V) {
      var ne;
      const {
        scrollTop: xe
      } = V.target;
      He.value.top = `${-xe}px`, (ne = f.value) === null || ne === void 0 || ne.syncUnifiedContainer();
    }
    let Vt = null;
    tf(() => {
      const {
        autosize: V,
        type: ne
      } = e;
      V && ne === "textarea" ? Vt = ef(w, (xe) => {
        !Array.isArray(xe) && xe !== W && Ve(xe);
      }) : Vt == null || Vt();
    });
    let Bt = null;
    tf(() => {
      e.type === "textarea" ? Bt = ef(w, (V) => {
        var ne;
        !Array.isArray(V) && V !== W && ((ne = f.value) === null || ne === void 0 || ne.syncUnifiedContainer());
      }) : Bt == null || Bt();
    }), HP(bv, {
      mergedValueRef: w,
      maxlengthRef: A,
      mergedClsPrefixRef: t,
      countGraphemesRef: Qu(e, "countGraphemes")
    });
    const Wt = {
      wrapperElRef: l,
      inputElRef: c,
      textareaElRef: a,
      isCompositing: R,
      clear: dt,
      focus: te,
      blur: se,
      select: ue,
      deactivate: we,
      activate: be,
      scrollTo: Ce
    }, Ut = At("Input", r, t), on = to(() => {
      const {
        value: V
      } = b, {
        common: {
          cubicBezierEaseInOut: ne
        },
        self: {
          color: xe,
          borderRadius: ze,
          textColor: We,
          caretColor: Be,
          caretColorError: at,
          caretColorWarning: ht,
          textDecorationColor: Jt,
          border: In,
          borderDisabled: An,
          borderHover: wo,
          borderFocus: yr,
          placeholderColor: xr,
          placeholderColorDisabled: Cr,
          lineHeightTextarea: Sr,
          colorDisabled: $r,
          colorFocus: Yn,
          textColorDisabled: Zn,
          boxShadowFocus: Ja,
          iconSize: Qa,
          colorFocusWarning: el,
          boxShadowFocusWarning: tl,
          borderWarning: nl,
          borderFocusWarning: ol,
          borderHoverWarning: rl,
          colorFocusError: il,
          boxShadowFocusError: al,
          borderError: ll,
          borderFocusError: sl,
          borderHoverError: eg,
          clearSize: tg,
          clearColor: ng,
          clearColorHover: og,
          clearColorPressed: rg,
          iconColor: ig,
          iconColorDisabled: ag,
          suffixTextColor: lg,
          countTextColor: sg,
          countTextColorDisabled: dg,
          iconColorHover: cg,
          iconColorPressed: ug,
          loadingColor: fg,
          loadingColorError: hg,
          loadingColorWarning: pg,
          fontWeight: vg,
          [oe("padding", V)]: gg,
          [oe("fontSize", V)]: mg,
          [oe("height", V)]: bg
        }
      } = i.value, {
        left: wg,
        right: yg
      } = en(gg);
      return {
        "--n-bezier": ne,
        "--n-count-text-color": sg,
        "--n-count-text-color-disabled": dg,
        "--n-color": xe,
        "--n-font-size": mg,
        "--n-font-weight": vg,
        "--n-border-radius": ze,
        "--n-height": bg,
        "--n-padding-left": wg,
        "--n-padding-right": yg,
        "--n-text-color": We,
        "--n-caret-color": Be,
        "--n-text-decoration-color": Jt,
        "--n-border": In,
        "--n-border-disabled": An,
        "--n-border-hover": wo,
        "--n-border-focus": yr,
        "--n-placeholder-color": xr,
        "--n-placeholder-color-disabled": Cr,
        "--n-icon-size": Qa,
        "--n-line-height-textarea": Sr,
        "--n-color-disabled": $r,
        "--n-color-focus": Yn,
        "--n-text-color-disabled": Zn,
        "--n-box-shadow-focus": Ja,
        "--n-loading-color": fg,
        // form warning
        "--n-caret-color-warning": ht,
        "--n-color-focus-warning": el,
        "--n-box-shadow-focus-warning": tl,
        "--n-border-warning": nl,
        "--n-border-focus-warning": ol,
        "--n-border-hover-warning": rl,
        "--n-loading-color-warning": pg,
        // form error
        "--n-caret-color-error": at,
        "--n-color-focus-error": il,
        "--n-box-shadow-focus-error": al,
        "--n-border-error": ll,
        "--n-border-focus-error": sl,
        "--n-border-hover-error": eg,
        "--n-loading-color-error": hg,
        // clear-button
        "--n-clear-color": ng,
        "--n-clear-size": tg,
        "--n-clear-color-hover": og,
        "--n-clear-color-pressed": rg,
        "--n-icon-color": ig,
        "--n-icon-color-hover": cg,
        "--n-icon-color-pressed": ug,
        "--n-icon-color-disabled": ag,
        "--n-suffix-text-color": lg
      };
    }), Kt = o ? St("input", to(() => {
      const {
        value: V
      } = b;
      return V[0];
    }), on, e) : void 0;
    return Object.assign(Object.assign({}, Wt), {
      // DOM ref
      wrapperElRef: l,
      inputElRef: c,
      inputMirrorElRef: d,
      inputEl2Ref: h,
      textareaElRef: a,
      textareaMirrorElRef: s,
      textareaScrollbarInstRef: f,
      // value
      rtlEnabled: Ut,
      uncontrolledValue: m,
      mergedValue: w,
      passwordVisible: Y,
      mergedPlaceholder: _,
      showPlaceholder1: M,
      showPlaceholder2: I,
      mergedFocus: O,
      isComposing: R,
      activated: E,
      showClearButton: K,
      mergedSize: b,
      mergedDisabled: C,
      textDecorationStyle: Q,
      mergedClsPrefix: t,
      mergedBordered: n,
      mergedShowPasswordOn: L,
      placeholderStyle: He,
      mergedStatus: S,
      textAreaScrollContainerWidth: J,
      // methods
      handleTextAreaScroll: Tt,
      handleCompositionStart: Ie,
      handleCompositionEnd: re,
      handleInput: k,
      handleInputBlur: D,
      handleInputFocus: ee,
      handleWrapperBlur: ve,
      handleWrapperFocus: he,
      handleMouseEnter: Je,
      handleMouseLeave: Qe,
      handleMouseDown: bt,
      handleChange: j,
      handleClick: pe,
      handleClear: Fe,
      handlePasswordToggleClick: wt,
      handlePasswordToggleMousedown: nt,
      handleWrapperKeydown: Re,
      handleWrapperKeyup: fe,
      handleTextAreaMirrorResize: it,
      getTextareaScrollContainer: () => a.value,
      mergedTheme: i,
      cssVars: o ? void 0 : on,
      themeClass: Kt == null ? void 0 : Kt.themeClass,
      onRender: Kt == null ? void 0 : Kt.onRender
    });
  },
  render() {
    var e, t, n, o, r, i, l;
    const {
      mergedClsPrefix: a,
      mergedStatus: s,
      themeClass: d,
      type: c,
      countGraphemes: h,
      onRender: p
    } = this, g = this.$slots;
    return p == null || p(), Ne("div", {
      ref: "wrapperElRef",
      class: [`${a}-input`, d, s && `${a}-input--${s}-status`, {
        [`${a}-input--rtl`]: this.rtlEnabled,
        [`${a}-input--disabled`]: this.mergedDisabled,
        [`${a}-input--textarea`]: c === "textarea",
        [`${a}-input--resizable`]: this.resizable && !this.autosize,
        [`${a}-input--autosize`]: this.autosize,
        [`${a}-input--round`]: this.round && c !== "textarea",
        [`${a}-input--pair`]: this.pair,
        [`${a}-input--focus`]: this.mergedFocus,
        [`${a}-input--stateful`]: this.stateful
      }],
      style: this.cssVars,
      tabindex: !this.mergedDisabled && this.passivelyActivated && !this.activated ? 0 : void 0,
      onFocus: this.handleWrapperFocus,
      onBlur: this.handleWrapperBlur,
      onClick: this.handleClick,
      onMousedown: this.handleMouseDown,
      onMouseenter: this.handleMouseEnter,
      onMouseleave: this.handleMouseLeave,
      onCompositionstart: this.handleCompositionStart,
      onCompositionend: this.handleCompositionEnd,
      onKeyup: this.handleWrapperKeyup,
      onKeydown: this.handleWrapperKeydown
    }, Ne("div", {
      class: `${a}-input-wrapper`
    }, qe(g.prefix, (f) => f && Ne("div", {
      class: `${a}-input__prefix`
    }, f)), c === "textarea" ? Ne(mi, {
      ref: "textareaScrollbarInstRef",
      class: `${a}-input__textarea`,
      container: this.getTextareaScrollContainer,
      theme: (t = (e = this.theme) === null || e === void 0 ? void 0 : e.peers) === null || t === void 0 ? void 0 : t.Scrollbar,
      themeOverrides: (o = (n = this.themeOverrides) === null || n === void 0 ? void 0 : n.peers) === null || o === void 0 ? void 0 : o.Scrollbar,
      triggerDisplayManually: !0,
      useUnifiedContainer: !0,
      internalHoistYRail: !0
    }, {
      default: () => {
        var f, v;
        const {
          textAreaScrollContainerWidth: m
        } = this, u = {
          width: this.autosize && m && `${m}px`
        };
        return Ne(LP, null, Ne("textarea", Object.assign({}, this.inputProps, {
          ref: "textareaElRef",
          class: [`${a}-input__textarea-el`, (f = this.inputProps) === null || f === void 0 ? void 0 : f.class],
          autofocus: this.autofocus,
          rows: Number(this.rows),
          placeholder: this.placeholder,
          value: this.mergedValue,
          disabled: this.mergedDisabled,
          maxlength: h ? void 0 : this.maxlength,
          minlength: h ? void 0 : this.minlength,
          readonly: this.readonly,
          tabindex: this.passivelyActivated && !this.activated ? -1 : void 0,
          style: [this.textDecorationStyle[0], (v = this.inputProps) === null || v === void 0 ? void 0 : v.style, u],
          onBlur: this.handleInputBlur,
          onFocus: (w) => {
            this.handleInputFocus(w, 2);
          },
          onInput: this.handleInput,
          onChange: this.handleChange,
          onScroll: this.handleTextAreaScroll
        })), this.showPlaceholder1 ? Ne("div", {
          class: `${a}-input__placeholder`,
          style: [this.placeholderStyle, u],
          key: "placeholder"
        }, this.mergedPlaceholder[0]) : null, this.autosize ? Ne(Mo, {
          onResize: this.handleTextAreaMirrorResize
        }, {
          default: () => Ne("div", {
            ref: "textareaMirrorElRef",
            class: `${a}-input__textarea-mirror`,
            key: "mirror"
          })
        }) : null);
      }
    }) : Ne("div", {
      class: `${a}-input__input`
    }, Ne("input", Object.assign({
      type: c === "password" && this.mergedShowPasswordOn && this.passwordVisible ? "text" : c
    }, this.inputProps, {
      ref: "inputElRef",
      class: [`${a}-input__input-el`, (r = this.inputProps) === null || r === void 0 ? void 0 : r.class],
      style: [this.textDecorationStyle[0], (i = this.inputProps) === null || i === void 0 ? void 0 : i.style],
      tabindex: this.passivelyActivated && !this.activated ? -1 : (l = this.inputProps) === null || l === void 0 ? void 0 : l.tabindex,
      placeholder: this.mergedPlaceholder[0],
      disabled: this.mergedDisabled,
      maxlength: h ? void 0 : this.maxlength,
      minlength: h ? void 0 : this.minlength,
      value: Array.isArray(this.mergedValue) ? this.mergedValue[0] : this.mergedValue,
      readonly: this.readonly,
      autofocus: this.autofocus,
      size: this.attrSize,
      onBlur: this.handleInputBlur,
      onFocus: (f) => {
        this.handleInputFocus(f, 0);
      },
      onInput: (f) => {
        this.handleInput(f, 0);
      },
      onChange: (f) => {
        this.handleChange(f, 0);
      }
    })), this.showPlaceholder1 ? Ne("div", {
      class: `${a}-input__placeholder`
    }, Ne("span", null, this.mergedPlaceholder[0])) : null, this.autosize ? Ne("div", {
      class: `${a}-input__input-mirror`,
      key: "mirror",
      ref: "inputMirrorElRef"
    }, " ") : null), !this.pair && qe(g.suffix, (f) => f || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? Ne("div", {
      class: `${a}-input__suffix`
    }, [qe(g["clear-icon-placeholder"], (v) => (this.clearable || v) && Ne(Ns, {
      clsPrefix: a,
      show: this.showClearButton,
      onClear: this.handleClear
    }, {
      placeholder: () => v,
      icon: () => {
        var m, u;
        return (u = (m = this.$slots)["clear-icon"]) === null || u === void 0 ? void 0 : u.call(m);
      }
    })), this.internalLoadingBeforeSuffix ? null : f, this.loading !== void 0 ? Ne(vv, {
      clsPrefix: a,
      loading: this.loading,
      showArrow: !1,
      showClear: !1,
      style: this.cssVars
    }) : null, this.internalLoadingBeforeSuffix ? f : null, this.showCount && this.type !== "textarea" ? Ne(Zu, null, {
      default: (v) => {
        var m;
        const {
          renderCount: u
        } = this;
        return u ? u(v) : (m = g.count) === null || m === void 0 ? void 0 : m.call(g, v);
      }
    }) : null, this.mergedShowPasswordOn && this.type === "password" ? Ne("div", {
      class: `${a}-input__eye`,
      onMousedown: this.handlePasswordToggleMousedown,
      onClick: this.handlePasswordToggleClick
    }, this.passwordVisible ? wn(g["password-visible-icon"], () => [Ne(Ct, {
      clsPrefix: a
    }, {
      default: () => Ne(qR, null)
    })]) : wn(g["password-invisible-icon"], () => [Ne(Ct, {
      clsPrefix: a
    }, {
      default: () => Ne(XR, null)
    })])) : null]) : null)), this.pair ? Ne("span", {
      class: `${a}-input__separator`
    }, wn(g.separator, () => [this.separator])) : null, this.pair ? Ne("div", {
      class: `${a}-input-wrapper`
    }, Ne("div", {
      class: `${a}-input__input`
    }, Ne("input", {
      ref: "inputEl2Ref",
      type: this.type,
      class: `${a}-input__input-el`,
      tabindex: this.passivelyActivated && !this.activated ? -1 : void 0,
      placeholder: this.mergedPlaceholder[1],
      disabled: this.mergedDisabled,
      maxlength: h ? void 0 : this.maxlength,
      minlength: h ? void 0 : this.minlength,
      value: Array.isArray(this.mergedValue) ? this.mergedValue[1] : void 0,
      readonly: this.readonly,
      style: this.textDecorationStyle[1],
      onBlur: this.handleInputBlur,
      onFocus: (f) => {
        this.handleInputFocus(f, 1);
      },
      onInput: (f) => {
        this.handleInput(f, 1);
      },
      onChange: (f) => {
        this.handleChange(f, 1);
      }
    }), this.showPlaceholder2 ? Ne("div", {
      class: `${a}-input__placeholder`
    }, Ne("span", null, this.mergedPlaceholder[1])) : null), qe(g.suffix, (f) => (this.clearable || f) && Ne("div", {
      class: `${a}-input__suffix`
    }, [this.clearable && Ne(Ns, {
      clsPrefix: a,
      show: this.showClearButton,
      onClear: this.handleClear
    }, {
      icon: () => {
        var v;
        return (v = g["clear-icon"]) === null || v === void 0 ? void 0 : v.call(g);
      },
      placeholder: () => {
        var v;
        return (v = g["clear-icon-placeholder"]) === null || v === void 0 ? void 0 : v.call(g);
      }
    }), f]))) : null, this.mergedBordered ? Ne("div", {
      class: `${a}-input__border`
    }) : null, this.mergedBordered ? Ne("div", {
      class: `${a}-input__state-border`
    }) : null, this.showCount && c === "textarea" ? Ne(Zu, null, {
      default: (f) => {
        var v;
        const {
          renderCount: m
        } = this;
        return m ? m(f) : (v = g.count) === null || v === void 0 ? void 0 : v.call(g, f);
      }
    }) : null);
  }
});
function Ba(e) {
  return e.type === "group";
}
function wv(e) {
  return e.type === "ignored";
}
function Wl(e, t) {
  try {
    return !!(1 + t.toString().toLowerCase().indexOf(e.trim().toLowerCase()));
  } catch {
    return !1;
  }
}
function yv(e, t) {
  return {
    getIsGroup: Ba,
    getIgnored: wv,
    getKey(o) {
      return Ba(o) ? o.name || o.key || "key-required" : o[e];
    },
    getChildren(o) {
      return o[t];
    }
  };
}
function WP(e, t, n, o) {
  if (!t) return e;
  function r(i) {
    if (!Array.isArray(i)) return [];
    const l = [];
    for (const a of i)
      if (Ba(a)) {
        const s = r(a[o]);
        s.length && l.push(Object.assign({}, a, {
          [o]: s
        }));
      } else {
        if (wv(a))
          continue;
        t(n, a) && l.push(a);
      }
    return l;
  }
  return r(e);
}
function UP(e, t, n) {
  const o = /* @__PURE__ */ new Map();
  return e.forEach((r) => {
    Ba(r) ? r[n].forEach((i) => {
      o.set(i[t], i);
    }) : o.set(r[t], r);
  }), o;
}
function xo(e) {
  return Ke(e, [255, 255, 255, 0.16]);
}
function Zi(e) {
  return Ke(e, [0, 0, 0, 0.12]);
}
const KP = "n-button-group", qP = {
  paddingTiny: "0 6px",
  paddingSmall: "0 10px",
  paddingMedium: "0 14px",
  paddingLarge: "0 18px",
  paddingRoundTiny: "0 10px",
  paddingRoundSmall: "0 14px",
  paddingRoundMedium: "0 18px",
  paddingRoundLarge: "0 22px",
  iconMarginTiny: "6px",
  iconMarginSmall: "6px",
  iconMarginMedium: "6px",
  iconMarginLarge: "6px",
  iconSizeTiny: "14px",
  iconSizeSmall: "18px",
  iconSizeMedium: "18px",
  iconSizeLarge: "20px",
  rippleDuration: ".6s"
};
function GP(e) {
  const {
    heightTiny: t,
    heightSmall: n,
    heightMedium: o,
    heightLarge: r,
    borderRadius: i,
    fontSizeTiny: l,
    fontSizeSmall: a,
    fontSizeMedium: s,
    fontSizeLarge: d,
    opacityDisabled: c,
    textColor2: h,
    textColor3: p,
    primaryColorHover: g,
    primaryColorPressed: f,
    borderColor: v,
    primaryColor: m,
    baseColor: u,
    infoColor: w,
    infoColorHover: x,
    infoColorPressed: b,
    successColor: C,
    successColorHover: S,
    successColorPressed: y,
    warningColor: T,
    warningColorHover: R,
    warningColorPressed: E,
    errorColor: W,
    errorColorHover: _,
    errorColorPressed: M,
    fontWeight: I,
    buttonColor2: O,
    buttonColor2Hover: K,
    buttonColor2Pressed: L,
    fontWeightStrong: Y
  } = e;
  return Object.assign(Object.assign({}, qP), {
    heightTiny: t,
    heightSmall: n,
    heightMedium: o,
    heightLarge: r,
    borderRadiusTiny: i,
    borderRadiusSmall: i,
    borderRadiusMedium: i,
    borderRadiusLarge: i,
    fontSizeTiny: l,
    fontSizeSmall: a,
    fontSizeMedium: s,
    fontSizeLarge: d,
    opacityDisabled: c,
    // secondary
    colorOpacitySecondary: "0.16",
    colorOpacitySecondaryHover: "0.22",
    colorOpacitySecondaryPressed: "0.28",
    colorSecondary: O,
    colorSecondaryHover: K,
    colorSecondaryPressed: L,
    // tertiary
    colorTertiary: O,
    colorTertiaryHover: K,
    colorTertiaryPressed: L,
    // quaternary
    colorQuaternary: "#0000",
    colorQuaternaryHover: K,
    colorQuaternaryPressed: L,
    // default type
    color: "#0000",
    colorHover: "#0000",
    colorPressed: "#0000",
    colorFocus: "#0000",
    colorDisabled: "#0000",
    textColor: h,
    textColorTertiary: p,
    textColorHover: g,
    textColorPressed: f,
    textColorFocus: g,
    textColorDisabled: h,
    textColorText: h,
    textColorTextHover: g,
    textColorTextPressed: f,
    textColorTextFocus: g,
    textColorTextDisabled: h,
    textColorGhost: h,
    textColorGhostHover: g,
    textColorGhostPressed: f,
    textColorGhostFocus: g,
    textColorGhostDisabled: h,
    border: `1px solid ${v}`,
    borderHover: `1px solid ${g}`,
    borderPressed: `1px solid ${f}`,
    borderFocus: `1px solid ${g}`,
    borderDisabled: `1px solid ${v}`,
    rippleColor: m,
    // primary
    colorPrimary: m,
    colorHoverPrimary: g,
    colorPressedPrimary: f,
    colorFocusPrimary: g,
    colorDisabledPrimary: m,
    textColorPrimary: u,
    textColorHoverPrimary: u,
    textColorPressedPrimary: u,
    textColorFocusPrimary: u,
    textColorDisabledPrimary: u,
    textColorTextPrimary: m,
    textColorTextHoverPrimary: g,
    textColorTextPressedPrimary: f,
    textColorTextFocusPrimary: g,
    textColorTextDisabledPrimary: h,
    textColorGhostPrimary: m,
    textColorGhostHoverPrimary: g,
    textColorGhostPressedPrimary: f,
    textColorGhostFocusPrimary: g,
    textColorGhostDisabledPrimary: m,
    borderPrimary: `1px solid ${m}`,
    borderHoverPrimary: `1px solid ${g}`,
    borderPressedPrimary: `1px solid ${f}`,
    borderFocusPrimary: `1px solid ${g}`,
    borderDisabledPrimary: `1px solid ${m}`,
    rippleColorPrimary: m,
    // info
    colorInfo: w,
    colorHoverInfo: x,
    colorPressedInfo: b,
    colorFocusInfo: x,
    colorDisabledInfo: w,
    textColorInfo: u,
    textColorHoverInfo: u,
    textColorPressedInfo: u,
    textColorFocusInfo: u,
    textColorDisabledInfo: u,
    textColorTextInfo: w,
    textColorTextHoverInfo: x,
    textColorTextPressedInfo: b,
    textColorTextFocusInfo: x,
    textColorTextDisabledInfo: h,
    textColorGhostInfo: w,
    textColorGhostHoverInfo: x,
    textColorGhostPressedInfo: b,
    textColorGhostFocusInfo: x,
    textColorGhostDisabledInfo: w,
    borderInfo: `1px solid ${w}`,
    borderHoverInfo: `1px solid ${x}`,
    borderPressedInfo: `1px solid ${b}`,
    borderFocusInfo: `1px solid ${x}`,
    borderDisabledInfo: `1px solid ${w}`,
    rippleColorInfo: w,
    // success
    colorSuccess: C,
    colorHoverSuccess: S,
    colorPressedSuccess: y,
    colorFocusSuccess: S,
    colorDisabledSuccess: C,
    textColorSuccess: u,
    textColorHoverSuccess: u,
    textColorPressedSuccess: u,
    textColorFocusSuccess: u,
    textColorDisabledSuccess: u,
    textColorTextSuccess: C,
    textColorTextHoverSuccess: S,
    textColorTextPressedSuccess: y,
    textColorTextFocusSuccess: S,
    textColorTextDisabledSuccess: h,
    textColorGhostSuccess: C,
    textColorGhostHoverSuccess: S,
    textColorGhostPressedSuccess: y,
    textColorGhostFocusSuccess: S,
    textColorGhostDisabledSuccess: C,
    borderSuccess: `1px solid ${C}`,
    borderHoverSuccess: `1px solid ${S}`,
    borderPressedSuccess: `1px solid ${y}`,
    borderFocusSuccess: `1px solid ${S}`,
    borderDisabledSuccess: `1px solid ${C}`,
    rippleColorSuccess: C,
    // warning
    colorWarning: T,
    colorHoverWarning: R,
    colorPressedWarning: E,
    colorFocusWarning: R,
    colorDisabledWarning: T,
    textColorWarning: u,
    textColorHoverWarning: u,
    textColorPressedWarning: u,
    textColorFocusWarning: u,
    textColorDisabledWarning: u,
    textColorTextWarning: T,
    textColorTextHoverWarning: R,
    textColorTextPressedWarning: E,
    textColorTextFocusWarning: R,
    textColorTextDisabledWarning: h,
    textColorGhostWarning: T,
    textColorGhostHoverWarning: R,
    textColorGhostPressedWarning: E,
    textColorGhostFocusWarning: R,
    textColorGhostDisabledWarning: T,
    borderWarning: `1px solid ${T}`,
    borderHoverWarning: `1px solid ${R}`,
    borderPressedWarning: `1px solid ${E}`,
    borderFocusWarning: `1px solid ${R}`,
    borderDisabledWarning: `1px solid ${T}`,
    rippleColorWarning: T,
    // error
    colorError: W,
    colorHoverError: _,
    colorPressedError: M,
    colorFocusError: _,
    colorDisabledError: W,
    textColorError: u,
    textColorHoverError: u,
    textColorPressedError: u,
    textColorFocusError: u,
    textColorDisabledError: u,
    textColorTextError: W,
    textColorTextHoverError: _,
    textColorTextPressedError: M,
    textColorTextFocusError: _,
    textColorTextDisabledError: h,
    textColorGhostError: W,
    textColorGhostHoverError: _,
    textColorGhostPressedError: M,
    textColorGhostFocusError: _,
    textColorGhostDisabledError: W,
    borderError: `1px solid ${W}`,
    borderHoverError: `1px solid ${_}`,
    borderPressedError: `1px solid ${M}`,
    borderFocusError: `1px solid ${_}`,
    borderDisabledError: `1px solid ${W}`,
    rippleColorError: W,
    waveOpacity: "0.6",
    fontWeight: I,
    fontWeightStrong: Y
  });
}
const Id = {
  name: "Button",
  common: mt,
  self: GP
}, XP = H([z("button", `
 margin: 0;
 font-weight: var(--n-font-weight);
 line-height: 1;
 font-family: inherit;
 padding: var(--n-padding);
 height: var(--n-height);
 font-size: var(--n-font-size);
 border-radius: var(--n-border-radius);
 color: var(--n-text-color);
 background-color: var(--n-color);
 width: var(--n-width);
 white-space: nowrap;
 outline: none;
 position: relative;
 z-index: auto;
 border: none;
 display: inline-flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 align-items: center;
 justify-content: center;
 user-select: none;
 -webkit-user-select: none;
 text-align: center;
 cursor: pointer;
 text-decoration: none;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [U("color", [B("border", {
  borderColor: "var(--n-border-color)"
}), U("disabled", [B("border", {
  borderColor: "var(--n-border-color-disabled)"
})]), tt("disabled", [H("&:focus", [B("state-border", {
  borderColor: "var(--n-border-color-focus)"
})]), H("&:hover", [B("state-border", {
  borderColor: "var(--n-border-color-hover)"
})]), H("&:active", [B("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})]), U("pressed", [B("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})])])]), U("disabled", {
  backgroundColor: "var(--n-color-disabled)",
  color: "var(--n-text-color-disabled)"
}, [B("border", {
  border: "var(--n-border-disabled)"
})]), tt("disabled", [H("&:focus", {
  backgroundColor: "var(--n-color-focus)",
  color: "var(--n-text-color-focus)"
}, [B("state-border", {
  border: "var(--n-border-focus)"
})]), H("&:hover", {
  backgroundColor: "var(--n-color-hover)",
  color: "var(--n-text-color-hover)"
}, [B("state-border", {
  border: "var(--n-border-hover)"
})]), H("&:active", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [B("state-border", {
  border: "var(--n-border-pressed)"
})]), U("pressed", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [B("state-border", {
  border: "var(--n-border-pressed)"
})])]), U("loading", "cursor: wait;"), z("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [U("active", {
  zIndex: 1,
  animationName: "button-wave-spread, button-wave-opacity"
})]), hr && "MozBoxSizing" in document.createElement("div").style ? H("&::moz-focus-inner", {
  border: 0
}) : null, B("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `), B("border", {
  border: "var(--n-border)"
}), B("state-border", {
  border: "var(--n-border)",
  borderColor: "#0000",
  zIndex: 1
}), B("icon", `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `, [z("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [dn({
  top: "50%",
  originalTransform: "translateY(-50%)"
})]), mP()]), B("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [H("~", [B("icon", {
  margin: "var(--n-icon-margin)",
  marginRight: 0
})])]), U("block", `
 display: flex;
 width: 100%;
 `), U("dashed", [B("border, state-border", {
  borderStyle: "dashed !important"
})]), U("disabled", {
  cursor: "not-allowed",
  opacity: "var(--n-opacity-disabled)"
})]), H("@keyframes button-wave-spread", {
  from: {
    boxShadow: "0 0 0.5px 0 var(--n-ripple-color)"
  },
  to: {
    // don't use exact 5px since chrome will display the animation with glitches
    boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)"
  }
}), H("@keyframes button-wave-opacity", {
  from: {
    opacity: "var(--n-wave-opacity)"
  },
  to: {
    opacity: 0
  }
})]), Ji = window.Vue.computed, YP = window.Vue.defineComponent, $n = window.Vue.h, ZP = window.Vue.inject, Ul = window.Vue.ref;
window.Vue.watchEffect;
const JP = Object.assign(Object.assign({}, ke.props), {
  color: String,
  textColor: String,
  text: Boolean,
  block: Boolean,
  loading: Boolean,
  disabled: Boolean,
  circle: Boolean,
  size: String,
  ghost: Boolean,
  round: Boolean,
  secondary: Boolean,
  tertiary: Boolean,
  quaternary: Boolean,
  strong: Boolean,
  focusable: {
    type: Boolean,
    default: !0
  },
  keyboard: {
    type: Boolean,
    default: !0
  },
  tag: {
    type: String,
    default: "button"
  },
  type: {
    type: String,
    default: "default"
  },
  dashed: Boolean,
  renderIcon: Function,
  iconPlacement: {
    type: String,
    default: "left"
  },
  attrType: {
    type: String,
    default: "button"
  },
  bordered: {
    type: Boolean,
    default: !0
  },
  onClick: [Function, Array],
  nativeFocusBehavior: {
    type: Boolean,
    default: !mv
  }
}), hi = YP({
  name: "Button",
  props: JP,
  slots: Object,
  setup(e) {
    const t = Ul(null), n = Ul(null), o = Ul(!1), r = Me(() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered), i = ZP(KP, {}), {
      mergedSizeRef: l
    } = qn({}, {
      defaultSize: "medium",
      mergedSize: (b) => {
        const {
          size: C
        } = e;
        if (C) return C;
        const {
          size: S
        } = i;
        if (S) return S;
        const {
          mergedSize: y
        } = b || {};
        return y ? y.value : "medium";
      }
    }), a = Ji(() => e.focusable && !e.disabled), s = (b) => {
      var C;
      a.value || b.preventDefault(), !e.nativeFocusBehavior && (b.preventDefault(), !e.disabled && a.value && ((C = t.value) === null || C === void 0 || C.focus({
        preventScroll: !0
      })));
    }, d = (b) => {
      var C;
      if (!e.disabled && !e.loading) {
        const {
          onClick: S
        } = e;
        S && ie(S, b), e.text || (C = n.value) === null || C === void 0 || C.play();
      }
    }, c = (b) => {
      switch (b.key) {
        case "Enter":
          if (!e.keyboard)
            return;
          o.value = !1;
      }
    }, h = (b) => {
      switch (b.key) {
        case "Enter":
          if (!e.keyboard || e.loading) {
            b.preventDefault();
            return;
          }
          o.value = !0;
      }
    }, p = () => {
      o.value = !1;
    }, {
      inlineThemeDisabled: g,
      mergedClsPrefixRef: f,
      mergedRtlRef: v
    } = je(e), m = ke("Button", "-button", XP, Id, e, f), u = At("Button", v, f), w = Ji(() => {
      const b = m.value, {
        common: {
          cubicBezierEaseInOut: C,
          cubicBezierEaseOut: S
        },
        self: y
      } = b, {
        rippleDuration: T,
        opacityDisabled: R,
        fontWeight: E,
        fontWeightStrong: W
      } = y, _ = l.value, {
        dashed: M,
        type: I,
        ghost: O,
        text: K,
        color: L,
        round: Y,
        circle: Q,
        textColor: J,
        secondary: q,
        tertiary: A,
        quaternary: G,
        strong: Z
      } = e, ae = {
        "--n-font-weight": Z ? W : E
      };
      let le = {
        "--n-color": "initial",
        "--n-color-hover": "initial",
        "--n-color-pressed": "initial",
        "--n-color-focus": "initial",
        "--n-color-disabled": "initial",
        "--n-ripple-color": "initial",
        "--n-text-color": "initial",
        "--n-text-color-hover": "initial",
        "--n-text-color-pressed": "initial",
        "--n-text-color-focus": "initial",
        "--n-text-color-disabled": "initial"
      };
      const de = I === "tertiary", ge = I === "default", X = de ? "default" : I;
      if (K) {
        const D = J || L;
        le = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": "#0000",
          "--n-text-color": D || y[oe("textColorText", X)],
          "--n-text-color-hover": D ? xo(D) : y[oe("textColorTextHover", X)],
          "--n-text-color-pressed": D ? Zi(D) : y[oe("textColorTextPressed", X)],
          "--n-text-color-focus": D ? xo(D) : y[oe("textColorTextHover", X)],
          "--n-text-color-disabled": D || y[oe("textColorTextDisabled", X)]
        };
      } else if (O || M) {
        const D = J || L;
        le = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": L || y[oe("rippleColor", X)],
          "--n-text-color": D || y[oe("textColorGhost", X)],
          "--n-text-color-hover": D ? xo(D) : y[oe("textColorGhostHover", X)],
          "--n-text-color-pressed": D ? Zi(D) : y[oe("textColorGhostPressed", X)],
          "--n-text-color-focus": D ? xo(D) : y[oe("textColorGhostHover", X)],
          "--n-text-color-disabled": D || y[oe("textColorGhostDisabled", X)]
        };
      } else if (q) {
        const D = ge ? y.textColor : de ? y.textColorTertiary : y[oe("color", X)], ee = L || D, ve = I !== "default" && I !== "tertiary";
        le = {
          "--n-color": ve ? Ee(ee, {
            alpha: Number(y.colorOpacitySecondary)
          }) : y.colorSecondary,
          "--n-color-hover": ve ? Ee(ee, {
            alpha: Number(y.colorOpacitySecondaryHover)
          }) : y.colorSecondaryHover,
          "--n-color-pressed": ve ? Ee(ee, {
            alpha: Number(y.colorOpacitySecondaryPressed)
          }) : y.colorSecondaryPressed,
          "--n-color-focus": ve ? Ee(ee, {
            alpha: Number(y.colorOpacitySecondaryHover)
          }) : y.colorSecondaryHover,
          "--n-color-disabled": y.colorSecondary,
          "--n-ripple-color": "#0000",
          "--n-text-color": ee,
          "--n-text-color-hover": ee,
          "--n-text-color-pressed": ee,
          "--n-text-color-focus": ee,
          "--n-text-color-disabled": ee
        };
      } else if (A || G) {
        const D = ge ? y.textColor : de ? y.textColorTertiary : y[oe("color", X)], ee = L || D;
        A ? (le["--n-color"] = y.colorTertiary, le["--n-color-hover"] = y.colorTertiaryHover, le["--n-color-pressed"] = y.colorTertiaryPressed, le["--n-color-focus"] = y.colorSecondaryHover, le["--n-color-disabled"] = y.colorTertiary) : (le["--n-color"] = y.colorQuaternary, le["--n-color-hover"] = y.colorQuaternaryHover, le["--n-color-pressed"] = y.colorQuaternaryPressed, le["--n-color-focus"] = y.colorQuaternaryHover, le["--n-color-disabled"] = y.colorQuaternary), le["--n-ripple-color"] = "#0000", le["--n-text-color"] = ee, le["--n-text-color-hover"] = ee, le["--n-text-color-pressed"] = ee, le["--n-text-color-focus"] = ee, le["--n-text-color-disabled"] = ee;
      } else
        le = {
          "--n-color": L || y[oe("color", X)],
          "--n-color-hover": L ? xo(L) : y[oe("colorHover", X)],
          "--n-color-pressed": L ? Zi(L) : y[oe("colorPressed", X)],
          "--n-color-focus": L ? xo(L) : y[oe("colorFocus", X)],
          "--n-color-disabled": L || y[oe("colorDisabled", X)],
          "--n-ripple-color": L || y[oe("rippleColor", X)],
          "--n-text-color": J || (L ? y.textColorPrimary : de ? y.textColorTertiary : y[oe("textColor", X)]),
          "--n-text-color-hover": J || (L ? y.textColorHoverPrimary : y[oe("textColorHover", X)]),
          "--n-text-color-pressed": J || (L ? y.textColorPressedPrimary : y[oe("textColorPressed", X)]),
          "--n-text-color-focus": J || (L ? y.textColorFocusPrimary : y[oe("textColorFocus", X)]),
          "--n-text-color-disabled": J || (L ? y.textColorDisabledPrimary : y[oe("textColorDisabled", X)])
        };
      let ce = {
        "--n-border": "initial",
        "--n-border-hover": "initial",
        "--n-border-pressed": "initial",
        "--n-border-focus": "initial",
        "--n-border-disabled": "initial"
      };
      K ? ce = {
        "--n-border": "none",
        "--n-border-hover": "none",
        "--n-border-pressed": "none",
        "--n-border-focus": "none",
        "--n-border-disabled": "none"
      } : ce = {
        "--n-border": y[oe("border", X)],
        "--n-border-hover": y[oe("borderHover", X)],
        "--n-border-pressed": y[oe("borderPressed", X)],
        "--n-border-focus": y[oe("borderFocus", X)],
        "--n-border-disabled": y[oe("borderDisabled", X)]
      };
      const {
        [oe("height", _)]: Pe,
        [oe("fontSize", _)]: me,
        [oe("padding", _)]: $e,
        [oe("paddingRound", _)]: Se,
        [oe("iconSize", _)]: Le,
        [oe("borderRadius", _)]: Ie,
        [oe("iconMargin", _)]: re,
        waveOpacity: k
      } = y, $ = {
        "--n-width": Q && !K ? Pe : "initial",
        "--n-height": K ? "initial" : Pe,
        "--n-font-size": me,
        "--n-padding": Q || K ? "initial" : Y ? Se : $e,
        "--n-icon-size": Le,
        "--n-icon-margin": re,
        "--n-border-radius": K ? "initial" : Q || Y ? Pe : Ie
      };
      return Object.assign(Object.assign(Object.assign(Object.assign({
        "--n-bezier": C,
        "--n-bezier-ease-out": S,
        "--n-ripple-duration": T,
        "--n-opacity-disabled": R,
        "--n-wave-opacity": k
      }, ae), le), ce), $);
    }), x = g ? St("button", Ji(() => {
      let b = "";
      const {
        dashed: C,
        type: S,
        ghost: y,
        text: T,
        color: R,
        round: E,
        circle: W,
        textColor: _,
        secondary: M,
        tertiary: I,
        quaternary: O,
        strong: K
      } = e;
      C && (b += "a"), y && (b += "b"), T && (b += "c"), E && (b += "d"), W && (b += "e"), M && (b += "f"), I && (b += "g"), O && (b += "h"), K && (b += "i"), R && (b += `j${Ea(R)}`), _ && (b += `k${Ea(_)}`);
      const {
        value: L
      } = l;
      return b += `l${L[0]}`, b += `m${S[0]}`, b;
    }), w, e) : void 0;
    return {
      selfElRef: t,
      waveElRef: n,
      mergedClsPrefix: f,
      mergedFocusable: a,
      mergedSize: l,
      showBorder: r,
      enterPressed: o,
      rtlEnabled: u,
      handleMousedown: s,
      handleKeydown: h,
      handleBlur: p,
      handleKeyup: c,
      handleClick: d,
      customColorCssVars: Ji(() => {
        const {
          color: b
        } = e;
        if (!b) return null;
        const C = xo(b);
        return {
          "--n-border-color": b,
          "--n-border-color-hover": C,
          "--n-border-color-pressed": Zi(b),
          "--n-border-color-focus": C,
          "--n-border-color-disabled": b
        };
      }),
      cssVars: g ? void 0 : w,
      themeClass: x == null ? void 0 : x.themeClass,
      onRender: x == null ? void 0 : x.onRender
    };
  },
  render() {
    const {
      mergedClsPrefix: e,
      tag: t,
      onRender: n
    } = this;
    n == null || n();
    const o = qe(this.$slots.default, (r) => r && $n("span", {
      class: `${e}-button__content`
    }, r));
    return $n(t, {
      ref: "selfElRef",
      class: [
        this.themeClass,
        `${e}-button`,
        `${e}-button--${this.type}-type`,
        `${e}-button--${this.mergedSize}-type`,
        this.rtlEnabled && `${e}-button--rtl`,
        this.disabled && `${e}-button--disabled`,
        this.block && `${e}-button--block`,
        this.enterPressed && `${e}-button--pressed`,
        !this.text && this.dashed && `${e}-button--dashed`,
        this.color && `${e}-button--color`,
        this.secondary && `${e}-button--secondary`,
        this.loading && `${e}-button--loading`,
        this.ghost && `${e}-button--ghost`
        // required for button group border collapse
      ],
      tabindex: this.mergedFocusable ? 0 : -1,
      type: this.attrType,
      style: this.cssVars,
      disabled: this.disabled,
      onClick: this.handleClick,
      onBlur: this.handleBlur,
      onMousedown: this.handleMousedown,
      onKeyup: this.handleKeyup,
      onKeydown: this.handleKeydown
    }, this.iconPlacement === "right" && o, $n(vk, {
      width: !0
    }, {
      default: () => qe(this.$slots.icon, (r) => (this.loading || this.renderIcon || r) && $n("span", {
        class: `${e}-button__icon`,
        style: {
          margin: ar(this.$slots.default) ? "0" : ""
        }
      }, $n(gr, null, {
        default: () => this.loading ? $n(br, {
          clsPrefix: e,
          key: "loading",
          class: `${e}-icon-slot`,
          strokeWidth: 20
        }) : $n("div", {
          key: "icon",
          class: `${e}-icon-slot`,
          role: "none"
        }, this.renderIcon ? this.renderIcon() : r)
      })))
    }), this.iconPlacement === "left" && o, this.text ? null : $n($P, {
      ref: "waveElRef",
      clsPrefix: e
    }), this.showBorder ? $n("div", {
      "aria-hidden": !0,
      class: `${e}-button__border`,
      style: this.customColorCssVars
    }) : null, this.showBorder ? $n("div", {
      "aria-hidden": !0,
      class: `${e}-button__state-border`,
      style: this.customColorCssVars
    }) : null);
  }
}), nf = hi, QP = {
  paddingSmall: "12px 16px 12px",
  paddingMedium: "19px 24px 20px",
  paddingLarge: "23px 32px 24px",
  paddingHuge: "27px 40px 28px",
  titleFontSizeSmall: "16px",
  titleFontSizeMedium: "18px",
  titleFontSizeLarge: "18px",
  titleFontSizeHuge: "18px",
  closeIconSize: "18px",
  closeSize: "22px"
};
function e_(e) {
  const {
    primaryColor: t,
    borderRadius: n,
    lineHeight: o,
    fontSize: r,
    cardColor: i,
    textColor2: l,
    textColor1: a,
    dividerColor: s,
    fontWeightStrong: d,
    closeIconColor: c,
    closeIconColorHover: h,
    closeIconColorPressed: p,
    closeColorHover: g,
    closeColorPressed: f,
    modalColor: v,
    boxShadow1: m,
    popoverColor: u,
    actionColor: w
  } = e;
  return Object.assign(Object.assign({}, QP), {
    lineHeight: o,
    color: i,
    colorModal: v,
    colorPopover: u,
    colorTarget: t,
    colorEmbedded: w,
    colorEmbeddedModal: w,
    colorEmbeddedPopover: w,
    textColor: l,
    titleTextColor: a,
    borderColor: s,
    actionColor: w,
    titleFontWeight: d,
    closeColorHover: g,
    closeColorPressed: f,
    closeBorderRadius: n,
    closeIconColor: c,
    closeIconColorHover: h,
    closeIconColorPressed: p,
    fontSizeSmall: r,
    fontSizeMedium: r,
    fontSizeLarge: r,
    fontSizeHuge: r,
    boxShadow: m,
    borderRadius: n
  });
}
const t_ = {
  common: mt,
  self: e_
}, n_ = H([z("card", `
 font-size: var(--n-font-size);
 line-height: var(--n-line-height);
 display: flex;
 flex-direction: column;
 width: 100%;
 box-sizing: border-box;
 position: relative;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 color: var(--n-text-color);
 word-break: break-word;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [Db({
  background: "var(--n-color-modal)"
}), U("hoverable", [H("&:hover", "box-shadow: var(--n-box-shadow);")]), U("content-segmented", [H(">", [B("content", {
  paddingTop: "var(--n-padding-bottom)"
})])]), U("content-soft-segmented", [H(">", [B("content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])]), U("footer-segmented", [H(">", [B("footer", {
  paddingTop: "var(--n-padding-bottom)"
})])]), U("footer-soft-segmented", [H(">", [B("footer", `
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]), H(">", [z("card-header", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `, [B("main", `
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `), B("extra", `
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), B("close", `
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), B("action", `
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `), B("content", "flex: 1; min-width: 0;"), B("content, footer", `
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `, [H("&:first-child", {
  paddingTop: "var(--n-padding-bottom)"
})]), B("action", `
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]), z("card-cover", `
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `, [H("img", `
 display: block;
 width: 100%;
 `)]), U("bordered", `
 border: 1px solid var(--n-border-color);
 `, [H("&:target", "border-color: var(--n-color-target);")]), U("action-segmented", [H(">", [B("action", [H("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), U("content-segmented, content-soft-segmented", [H(">", [B("content", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [H("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), U("footer-segmented, footer-soft-segmented", [H(">", [B("footer", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [H("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), U("embedded", `
 background-color: var(--n-color-embedded);
 `)]), ld(z("card", `
 background: var(--n-color-modal);
 `, [U("embedded", `
 background-color: var(--n-color-embedded-modal);
 `)])), sd(z("card", `
 background: var(--n-color-popover);
 `, [U("embedded", `
 background-color: var(--n-color-embedded-popover);
 `)]))]), of = window.Vue.computed, o_ = window.Vue.defineComponent, Nn = window.Vue.h, r_ = {
  title: [String, Function],
  contentClass: String,
  contentStyle: [Object, String],
  headerClass: String,
  headerStyle: [Object, String],
  headerExtraClass: String,
  headerExtraStyle: [Object, String],
  footerClass: String,
  footerStyle: [Object, String],
  embedded: Boolean,
  segmented: {
    type: [Boolean, Object],
    default: !1
  },
  size: {
    type: String,
    default: "medium"
  },
  bordered: {
    type: Boolean,
    default: !0
  },
  closable: Boolean,
  hoverable: Boolean,
  role: String,
  onClose: [Function, Array],
  tag: {
    type: String,
    default: "div"
  },
  cover: Function,
  content: [String, Function],
  footer: Function,
  action: Function,
  headerExtra: Function,
  closeFocusable: Boolean
}, i_ = Object.assign(Object.assign({}, ke.props), r_), Jo = o_({
  name: "Card",
  props: i_,
  slots: Object,
  setup(e) {
    const t = () => {
      const {
        onClose: d
      } = e;
      d && ie(d);
    }, {
      inlineThemeDisabled: n,
      mergedClsPrefixRef: o,
      mergedRtlRef: r
    } = je(e), i = ke("Card", "-card", n_, t_, e, o), l = At("Card", r, o), a = of(() => {
      const {
        size: d
      } = e, {
        self: {
          color: c,
          colorModal: h,
          colorTarget: p,
          textColor: g,
          titleTextColor: f,
          titleFontWeight: v,
          borderColor: m,
          actionColor: u,
          borderRadius: w,
          lineHeight: x,
          closeIconColor: b,
          closeIconColorHover: C,
          closeIconColorPressed: S,
          closeColorHover: y,
          closeColorPressed: T,
          closeBorderRadius: R,
          closeIconSize: E,
          closeSize: W,
          boxShadow: _,
          colorPopover: M,
          colorEmbedded: I,
          colorEmbeddedModal: O,
          colorEmbeddedPopover: K,
          [oe("padding", d)]: L,
          [oe("fontSize", d)]: Y,
          [oe("titleFontSize", d)]: Q
        },
        common: {
          cubicBezierEaseInOut: J
        }
      } = i.value, {
        top: q,
        left: A,
        bottom: G
      } = en(L);
      return {
        "--n-bezier": J,
        "--n-border-radius": w,
        "--n-color": c,
        "--n-color-modal": h,
        "--n-color-popover": M,
        "--n-color-embedded": I,
        "--n-color-embedded-modal": O,
        "--n-color-embedded-popover": K,
        "--n-color-target": p,
        "--n-text-color": g,
        "--n-line-height": x,
        "--n-action-color": u,
        "--n-title-text-color": f,
        "--n-title-font-weight": v,
        "--n-close-icon-color": b,
        "--n-close-icon-color-hover": C,
        "--n-close-icon-color-pressed": S,
        "--n-close-color-hover": y,
        "--n-close-color-pressed": T,
        "--n-border-color": m,
        "--n-box-shadow": _,
        // size
        "--n-padding-top": q,
        "--n-padding-bottom": G,
        "--n-padding-left": A,
        "--n-font-size": Y,
        "--n-title-font-size": Q,
        "--n-close-size": W,
        "--n-close-icon-size": E,
        "--n-close-border-radius": R
      };
    }), s = n ? St("card", of(() => e.size[0]), a, e) : void 0;
    return {
      rtlEnabled: l,
      mergedClsPrefix: o,
      mergedTheme: i,
      handleCloseClick: t,
      cssVars: n ? void 0 : a,
      themeClass: s == null ? void 0 : s.themeClass,
      onRender: s == null ? void 0 : s.onRender
    };
  },
  render() {
    const {
      segmented: e,
      bordered: t,
      hoverable: n,
      mergedClsPrefix: o,
      rtlEnabled: r,
      onRender: i,
      embedded: l,
      tag: a,
      $slots: s
    } = this;
    return i == null || i(), Nn(a, {
      class: [`${o}-card`, this.themeClass, l && `${o}-card--embedded`, {
        [`${o}-card--rtl`]: r,
        [`${o}-card--content${typeof e != "boolean" && e.content === "soft" ? "-soft" : ""}-segmented`]: e === !0 || e !== !1 && e.content,
        [`${o}-card--footer${typeof e != "boolean" && e.footer === "soft" ? "-soft" : ""}-segmented`]: e === !0 || e !== !1 && e.footer,
        [`${o}-card--action-segmented`]: e === !0 || e !== !1 && e.action,
        [`${o}-card--bordered`]: t,
        [`${o}-card--hoverable`]: n
      }],
      style: this.cssVars,
      role: this.role
    }, qe(s.cover, (d) => {
      const c = this.cover ? mn([this.cover()]) : d;
      return c && Nn("div", {
        class: `${o}-card-cover`,
        role: "none"
      }, c);
    }), qe(s.header, (d) => {
      const {
        title: c
      } = this, h = c ? mn(typeof c == "function" ? [c()] : [c]) : d;
      return h || this.closable ? Nn("div", {
        class: [`${o}-card-header`, this.headerClass],
        style: this.headerStyle,
        role: "heading"
      }, Nn("div", {
        class: `${o}-card-header__main`,
        role: "heading"
      }, h), qe(s["header-extra"], (p) => {
        const g = this.headerExtra ? mn([this.headerExtra()]) : p;
        return g && Nn("div", {
          class: [`${o}-card-header__extra`, this.headerExtraClass],
          style: this.headerExtraStyle
        }, g);
      }), this.closable && Nn(av, {
        clsPrefix: o,
        class: `${o}-card-header__close`,
        onClick: this.handleCloseClick,
        focusable: this.closeFocusable,
        absolute: !0
      })) : null;
    }), qe(s.default, (d) => {
      const {
        content: c
      } = this, h = c ? mn(typeof c == "function" ? [c()] : [c]) : d;
      return h && Nn("div", {
        class: [`${o}-card__content`, this.contentClass],
        style: this.contentStyle,
        role: "none"
      }, h);
    }), qe(s.footer, (d) => {
      const c = this.footer ? mn([this.footer()]) : d;
      return c && Nn("div", {
        class: [`${o}-card__footer`, this.footerClass],
        style: this.footerStyle,
        role: "none"
      }, c);
    }), qe(s.action, (d) => {
      const c = this.action ? mn([this.action()]) : d;
      return c && Nn("div", {
        class: `${o}-card__action`,
        role: "none"
      }, c);
    }));
  }
}), a_ = {
  sizeSmall: "14px",
  sizeMedium: "16px",
  sizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function l_(e) {
  const {
    baseColor: t,
    inputColorDisabled: n,
    cardColor: o,
    modalColor: r,
    popoverColor: i,
    textColorDisabled: l,
    borderColor: a,
    primaryColor: s,
    textColor2: d,
    fontSizeSmall: c,
    fontSizeMedium: h,
    fontSizeLarge: p,
    borderRadiusSmall: g,
    lineHeight: f
  } = e;
  return Object.assign(Object.assign({}, a_), {
    labelLineHeight: f,
    fontSizeSmall: c,
    fontSizeMedium: h,
    fontSizeLarge: p,
    borderRadius: g,
    color: t,
    colorChecked: s,
    colorDisabled: n,
    colorDisabledChecked: n,
    colorTableHeader: o,
    colorTableHeaderModal: r,
    colorTableHeaderPopover: i,
    checkMarkColor: t,
    checkMarkColorDisabled: l,
    checkMarkColorDisabledChecked: l,
    border: `1px solid ${a}`,
    borderDisabled: `1px solid ${a}`,
    borderDisabledChecked: `1px solid ${a}`,
    borderChecked: `1px solid ${s}`,
    borderFocus: `1px solid ${s}`,
    boxShadowFocus: `0 0 0 2px ${Ee(s, {
      alpha: 0.3
    })}`,
    textColor: d,
    textColorDisabled: l
  });
}
const xv = {
  name: "Checkbox",
  common: mt,
  self: l_
}, Kl = window.Vue.computed, s_ = window.Vue.defineComponent, d_ = window.Vue.h, c_ = window.Vue.provide, u_ = window.Vue.ref, rf = window.Vue.toRef;
window.Vue.watchEffect;
const Cv = "n-checkbox-group", f_ = {
  min: Number,
  max: Number,
  size: String,
  value: Array,
  defaultValue: {
    type: Array,
    default: null
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  // deprecated
  onChange: [Function, Array]
}, h_ = s_({
  name: "CheckboxGroup",
  props: f_,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = je(e), n = qn(e), {
      mergedSizeRef: o,
      mergedDisabledRef: r
    } = n, i = u_(e.defaultValue), l = Kl(() => e.value), a = It(l, i), s = Kl(() => {
      var h;
      return ((h = a.value) === null || h === void 0 ? void 0 : h.length) || 0;
    }), d = Kl(() => Array.isArray(a.value) ? new Set(a.value) : /* @__PURE__ */ new Set());
    function c(h, p) {
      const {
        nTriggerFormInput: g,
        nTriggerFormChange: f
      } = n, {
        onChange: v,
        "onUpdate:value": m,
        onUpdateValue: u
      } = e;
      if (Array.isArray(a.value)) {
        const w = Array.from(a.value), x = w.findIndex((b) => b === p);
        h ? ~x || (w.push(p), u && ie(u, w, {
          actionType: "check",
          value: p
        }), m && ie(m, w, {
          actionType: "check",
          value: p
        }), g(), f(), i.value = w, v && ie(v, w)) : ~x && (w.splice(x, 1), u && ie(u, w, {
          actionType: "uncheck",
          value: p
        }), m && ie(m, w, {
          actionType: "uncheck",
          value: p
        }), v && ie(v, w), i.value = w, g(), f());
      } else
        h ? (u && ie(u, [p], {
          actionType: "check",
          value: p
        }), m && ie(m, [p], {
          actionType: "check",
          value: p
        }), v && ie(v, [p]), i.value = [p], g(), f()) : (u && ie(u, [], {
          actionType: "uncheck",
          value: p
        }), m && ie(m, [], {
          actionType: "uncheck",
          value: p
        }), v && ie(v, []), i.value = [], g(), f());
    }
    return c_(Cv, {
      checkedCountRef: s,
      maxRef: rf(e, "max"),
      minRef: rf(e, "min"),
      valueSetRef: d,
      disabledRef: r,
      mergedSizeRef: o,
      toggleCheckbox: c
    }), {
      mergedClsPrefix: t
    };
  },
  render() {
    return d_("div", {
      class: `${this.mergedClsPrefix}-checkbox-group`,
      role: "group"
    }, this.$slots);
  }
}), af = window.Vue.h, p_ = () => af("svg", {
  viewBox: "0 0 64 64",
  class: "check-icon"
}, af("path", {
  d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"
})), lf = window.Vue.h, v_ = () => lf("svg", {
  viewBox: "0 0 100 100",
  class: "line-icon"
}, lf("path", {
  d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z"
})), g_ = H([
  z("checkbox", `
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `, [U("show-label", "line-height: var(--n-label-line-height);"), H("&:hover", [z("checkbox-box", [B("border", "border: var(--n-border-checked);")])]), H("&:focus:not(:active)", [z("checkbox-box", [B("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), U("inside-table", [z("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), U("checked", [z("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [z("checkbox-icon", [
    // if not set width to 100%, safari & old chrome won't display the icon
    H(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)
  ])])]), U("indeterminate", [z("checkbox-box", [z("checkbox-icon", [H(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), H(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), U("checked, indeterminate", [H("&:focus:not(:active)", [z("checkbox-box", [B("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), z("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [B("border", {
    border: "var(--n-border-checked)"
  })])]), U("disabled", {
    cursor: "not-allowed"
  }, [U("checked", [z("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [B("border", {
    border: "var(--n-border-disabled-checked)"
  }), z("checkbox-icon", [H(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled-checked)"
  })])])]), z("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [B("border", `
 border: var(--n-border-disabled);
 `), z("checkbox-icon", [H(".check-icon, .line-icon", `
 fill: var(--n-check-mark-color-disabled);
 `)])]), B("label", `
 color: var(--n-text-color-disabled);
 `)]), z("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), z("checkbox-box", `
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 height: var(--n-size);
 width: var(--n-size);
 display: inline-block;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color 0.3s var(--n-bezier);
 `, [B("border", `
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 border-radius: inherit;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border: var(--n-border);
 `), z("checkbox-icon", `
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `, [H(".check-icon, .line-icon", `
 width: 100%;
 fill: var(--n-check-mark-color);
 opacity: 0;
 transform: scale(0.5);
 transform-origin: center;
 transition:
 fill 0.3s var(--n-bezier),
 transform 0.3s var(--n-bezier),
 opacity 0.3s var(--n-bezier),
 border-color 0.3s var(--n-bezier);
 `), dn({
    left: "1px",
    top: "1px"
  })])]), B("label", `
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `, [H("&:empty", {
    display: "none"
  })])]),
  // modal table header checkbox
  ld(z("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)),
  // popover table header checkbox
  sd(z("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))
]), sf = window.Vue.computed, m_ = window.Vue.defineComponent, no = window.Vue.h, b_ = window.Vue.inject, df = window.Vue.ref, w_ = window.Vue.toRef;
window.Vue.watchEffect;
const y_ = Object.assign(Object.assign({}, ke.props), {
  size: String,
  checked: {
    type: [Boolean, String, Number],
    default: void 0
  },
  defaultChecked: {
    type: [Boolean, String, Number],
    default: !1
  },
  value: [String, Number],
  disabled: {
    type: Boolean,
    default: void 0
  },
  indeterminate: Boolean,
  label: String,
  focusable: {
    type: Boolean,
    default: !0
  },
  checkedValue: {
    type: [Boolean, String, Number],
    default: !0
  },
  uncheckedValue: {
    type: [Boolean, String, Number],
    default: !1
  },
  "onUpdate:checked": [Function, Array],
  onUpdateChecked: [Function, Array],
  // private
  privateInsideTable: Boolean,
  // deprecated
  onChange: [Function, Array]
}), Ad = m_({
  name: "Checkbox",
  props: y_,
  setup(e) {
    const t = b_(Cv, null), n = df(null), {
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = je(e), l = df(e.defaultChecked), a = w_(e, "checked"), s = It(a, l), d = Me(() => {
      if (t) {
        const S = t.valueSetRef.value;
        return S && e.value !== void 0 ? S.has(e.value) : !1;
      } else
        return s.value === e.checkedValue;
    }), c = qn(e, {
      mergedSize(S) {
        const {
          size: y
        } = e;
        if (y !== void 0) return y;
        if (t) {
          const {
            value: T
          } = t.mergedSizeRef;
          if (T !== void 0)
            return T;
        }
        if (S) {
          const {
            mergedSize: T
          } = S;
          if (T !== void 0) return T.value;
        }
        return "medium";
      },
      mergedDisabled(S) {
        const {
          disabled: y
        } = e;
        if (y !== void 0) return y;
        if (t) {
          if (t.disabledRef.value) return !0;
          const {
            maxRef: {
              value: T
            },
            checkedCountRef: R
          } = t;
          if (T !== void 0 && R.value >= T && !d.value)
            return !0;
          const {
            minRef: {
              value: E
            }
          } = t;
          if (E !== void 0 && R.value <= E && d.value)
            return !0;
        }
        return S ? S.disabled.value : !1;
      }
    }), {
      mergedDisabledRef: h,
      mergedSizeRef: p
    } = c, g = ke("Checkbox", "-checkbox", g_, xv, e, o);
    function f(S) {
      if (t && e.value !== void 0)
        t.toggleCheckbox(!d.value, e.value);
      else {
        const {
          onChange: y,
          "onUpdate:checked": T,
          onUpdateChecked: R
        } = e, {
          nTriggerFormInput: E,
          nTriggerFormChange: W
        } = c, _ = d.value ? e.uncheckedValue : e.checkedValue;
        T && ie(T, _, S), R && ie(R, _, S), y && ie(y, _, S), E(), W(), l.value = _;
      }
    }
    function v(S) {
      h.value || f(S);
    }
    function m(S) {
      if (!h.value)
        switch (S.key) {
          case " ":
          case "Enter":
            f(S);
        }
    }
    function u(S) {
      switch (S.key) {
        case " ":
          S.preventDefault();
      }
    }
    const w = {
      focus: () => {
        var S;
        (S = n.value) === null || S === void 0 || S.focus();
      },
      blur: () => {
        var S;
        (S = n.value) === null || S === void 0 || S.blur();
      }
    }, x = At("Checkbox", i, o), b = sf(() => {
      const {
        value: S
      } = p, {
        common: {
          cubicBezierEaseInOut: y
        },
        self: {
          borderRadius: T,
          color: R,
          colorChecked: E,
          colorDisabled: W,
          colorTableHeader: _,
          colorTableHeaderModal: M,
          colorTableHeaderPopover: I,
          checkMarkColor: O,
          checkMarkColorDisabled: K,
          border: L,
          borderFocus: Y,
          borderDisabled: Q,
          borderChecked: J,
          boxShadowFocus: q,
          textColor: A,
          textColorDisabled: G,
          checkMarkColorDisabledChecked: Z,
          colorDisabledChecked: ae,
          borderDisabledChecked: le,
          labelPadding: de,
          labelLineHeight: ge,
          labelFontWeight: X,
          [oe("fontSize", S)]: ce,
          [oe("size", S)]: Pe
        }
      } = g.value;
      return {
        "--n-label-line-height": ge,
        "--n-label-font-weight": X,
        "--n-size": Pe,
        "--n-bezier": y,
        "--n-border-radius": T,
        "--n-border": L,
        "--n-border-checked": J,
        "--n-border-focus": Y,
        "--n-border-disabled": Q,
        "--n-border-disabled-checked": le,
        "--n-box-shadow-focus": q,
        "--n-color": R,
        "--n-color-checked": E,
        "--n-color-table": _,
        "--n-color-table-modal": M,
        "--n-color-table-popover": I,
        "--n-color-disabled": W,
        "--n-color-disabled-checked": ae,
        "--n-text-color": A,
        "--n-text-color-disabled": G,
        "--n-check-mark-color": O,
        "--n-check-mark-color-disabled": K,
        "--n-check-mark-color-disabled-checked": Z,
        "--n-font-size": ce,
        "--n-label-padding": de
      };
    }), C = r ? St("checkbox", sf(() => p.value[0]), b, e) : void 0;
    return Object.assign(c, w, {
      rtlEnabled: x,
      selfRef: n,
      mergedClsPrefix: o,
      mergedDisabled: h,
      renderedChecked: d,
      mergedTheme: g,
      labelId: ai(),
      handleClick: v,
      handleKeyUp: m,
      handleKeyDown: u,
      cssVars: r ? void 0 : b,
      themeClass: C == null ? void 0 : C.themeClass,
      onRender: C == null ? void 0 : C.onRender
    });
  },
  render() {
    var e;
    const {
      $slots: t,
      renderedChecked: n,
      mergedDisabled: o,
      indeterminate: r,
      privateInsideTable: i,
      cssVars: l,
      labelId: a,
      label: s,
      mergedClsPrefix: d,
      focusable: c,
      handleKeyUp: h,
      handleKeyDown: p,
      handleClick: g
    } = this;
    (e = this.onRender) === null || e === void 0 || e.call(this);
    const f = qe(t.default, (v) => s || v ? no("span", {
      class: `${d}-checkbox__label`,
      id: a
    }, s || v) : null);
    return no("div", {
      ref: "selfRef",
      class: [`${d}-checkbox`, this.themeClass, this.rtlEnabled && `${d}-checkbox--rtl`, n && `${d}-checkbox--checked`, o && `${d}-checkbox--disabled`, r && `${d}-checkbox--indeterminate`, i && `${d}-checkbox--inside-table`, f && `${d}-checkbox--show-label`],
      tabindex: o || !c ? void 0 : 0,
      role: "checkbox",
      "aria-checked": r ? "mixed" : n,
      "aria-labelledby": a,
      style: l,
      onKeyup: h,
      onKeydown: p,
      onClick: g,
      onMousedown: () => {
        st("selectstart", window, (v) => {
          v.preventDefault();
        }, {
          once: !0
        });
      }
    }, no("div", {
      class: `${d}-checkbox-box-wrapper`
    }, " ", no("div", {
      class: `${d}-checkbox-box`
    }, no(gr, null, {
      default: () => this.indeterminate ? no("div", {
        key: "indeterminate",
        class: `${d}-checkbox-icon`
      }, v_()) : no("div", {
        key: "check",
        class: `${d}-checkbox-icon`
      }, p_())
    }), no("div", {
      class: `${d}-checkbox-box__border`
    }))), f);
  }
});
function x_(e) {
  const {
    boxShadow2: t
  } = e;
  return {
    menuBoxShadow: t
  };
}
const Vd = {
  name: "Popselect",
  common: mt,
  peers: {
    Popover: wr,
    InternalSelectMenu: Od
  },
  self: x_
}, Sv = "n-popselect", C_ = z("popselect-menu", `
 box-shadow: var(--n-menu-box-shadow);
`), cf = window.Vue.computed, S_ = window.Vue.defineComponent, $_ = window.Vue.h, R_ = window.Vue.inject, uf = window.Vue.nextTick, k_ = window.Vue.toRef, P_ = window.Vue.watch;
window.Vue.watchEffect;
const Bd = {
  multiple: Boolean,
  value: {
    type: [String, Number, Array],
    default: null
  },
  cancelable: Boolean,
  options: {
    type: Array,
    default: () => []
  },
  size: {
    type: String,
    default: "medium"
  },
  scrollable: Boolean,
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  onMouseenter: Function,
  onMouseleave: Function,
  renderLabel: Function,
  showCheckmark: {
    type: Boolean,
    default: void 0
  },
  nodeProps: Function,
  virtualScroll: Boolean,
  // deprecated
  onChange: [Function, Array]
}, ff = di(Bd), __ = S_({
  name: "PopselectPanel",
  props: Bd,
  setup(e) {
    const t = R_(Sv), {
      mergedClsPrefixRef: n,
      inlineThemeDisabled: o
    } = je(e), r = ke("Popselect", "-pop-select", C_, Vd, t.props, n), i = cf(() => Xa(e.options, yv("value", "children")));
    function l(p, g) {
      const {
        onUpdateValue: f,
        "onUpdate:value": v,
        onChange: m
      } = e;
      f && ie(f, p, g), v && ie(v, p, g), m && ie(m, p, g);
    }
    function a(p) {
      d(p.key);
    }
    function s(p) {
      !cn(p, "action") && !cn(p, "empty") && !cn(p, "header") && p.preventDefault();
    }
    function d(p) {
      const {
        value: {
          getNode: g
        }
      } = i;
      if (e.multiple)
        if (Array.isArray(e.value)) {
          const f = [], v = [];
          let m = !0;
          e.value.forEach((u) => {
            if (u === p) {
              m = !1;
              return;
            }
            const w = g(u);
            w && (f.push(w.key), v.push(w.rawNode));
          }), m && (f.push(p), v.push(g(p).rawNode)), l(f, v);
        } else {
          const f = g(p);
          f && l([p], [f.rawNode]);
        }
      else if (e.value === p && e.cancelable)
        l(null, null);
      else {
        const f = g(p);
        f && l(p, f.rawNode);
        const {
          "onUpdate:show": v,
          onUpdateShow: m
        } = t.props;
        v && ie(v, !1), m && ie(m, !1), t.setShow(!1);
      }
      uf(() => {
        t.syncPosition();
      });
    }
    P_(k_(e, "options"), () => {
      uf(() => {
        t.syncPosition();
      });
    });
    const c = cf(() => {
      const {
        self: {
          menuBoxShadow: p
        }
      } = r.value;
      return {
        "--n-menu-box-shadow": p
      };
    }), h = o ? St("select", void 0, c, t.props) : void 0;
    return {
      mergedTheme: t.mergedThemeRef,
      mergedClsPrefix: n,
      treeMate: i,
      handleToggle: a,
      handleMenuMousedown: s,
      cssVars: o ? void 0 : c,
      themeClass: h == null ? void 0 : h.themeClass,
      onRender: h == null ? void 0 : h.onRender
    };
  },
  render() {
    var e;
    return (e = this.onRender) === null || e === void 0 || e.call(this), $_(fv, {
      clsPrefix: this.mergedClsPrefix,
      focusable: !0,
      nodeProps: this.nodeProps,
      class: [`${this.mergedClsPrefix}-popselect-menu`, this.themeClass],
      style: this.cssVars,
      theme: this.mergedTheme.peers.InternalSelectMenu,
      themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu,
      multiple: this.multiple,
      treeMate: this.treeMate,
      size: this.size,
      value: this.value,
      virtualScroll: this.virtualScroll,
      scrollable: this.scrollable,
      renderLabel: this.renderLabel,
      onToggle: this.handleToggle,
      onMouseenter: this.onMouseenter,
      onMouseleave: this.onMouseenter,
      onMousedown: this.handleMenuMousedown,
      showCheckmark: this.showCheckmark
    }, {
      header: () => {
        var t, n;
        return ((n = (t = this.$slots).header) === null || n === void 0 ? void 0 : n.call(t)) || [];
      },
      action: () => {
        var t, n;
        return ((n = (t = this.$slots).action) === null || n === void 0 ? void 0 : n.call(t)) || [];
      },
      empty: () => {
        var t, n;
        return ((n = (t = this.$slots).empty) === null || n === void 0 ? void 0 : n.call(t)) || [];
      }
    });
  }
}), T_ = window.Vue.defineComponent, hf = window.Vue.h, F_ = window.Vue.provide, E_ = window.Vue.ref, z_ = Object.assign(Object.assign(Object.assign(Object.assign({}, ke.props), yp(ur, ["showArrow", "arrow"])), {
  placement: Object.assign(Object.assign({}, ur.placement), {
    default: "bottom"
  }),
  trigger: {
    type: String,
    default: "hover"
  }
}), Bd), O_ = T_({
  name: "Popselect",
  props: z_,
  slots: Object,
  inheritAttrs: !1,
  __popover__: !0,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = je(e), n = ke("Popselect", "-popselect", void 0, Vd, e, t), o = E_(null);
    function r() {
      var a;
      (a = o.value) === null || a === void 0 || a.syncPosition();
    }
    function i(a) {
      var s;
      (s = o.value) === null || s === void 0 || s.setShow(a);
    }
    return F_(Sv, {
      props: e,
      mergedThemeRef: n,
      syncPosition: r,
      setShow: i
    }), Object.assign(Object.assign({}, {
      syncPosition: r,
      setShow: i
    }), {
      popoverInstRef: o,
      mergedTheme: n
    });
  },
  render() {
    const {
      mergedTheme: e
    } = this, t = {
      theme: e.peers.Popover,
      themeOverrides: e.peerOverrides.Popover,
      builtinThemeOverrides: {
        padding: "0"
      },
      ref: "popoverInstRef",
      internalRenderBody: (n, o, r, i, l) => {
        const {
          $attrs: a
        } = this;
        return hf(__, Object.assign({}, a, {
          class: [a.class, n],
          style: [a.style, ...r]
        }, si(this.$props, ff), {
          ref: wp(o),
          onMouseenter: Xr([i, a.onMouseenter]),
          onMouseleave: Xr([l, a.onMouseleave])
        }), {
          header: () => {
            var s, d;
            return (d = (s = this.$slots).header) === null || d === void 0 ? void 0 : d.call(s);
          },
          action: () => {
            var s, d;
            return (d = (s = this.$slots).action) === null || d === void 0 ? void 0 : d.call(s);
          },
          empty: () => {
            var s, d;
            return (d = (s = this.$slots).empty) === null || d === void 0 ? void 0 : d.call(s);
          }
        });
      }
    };
    return hf(bi, Object.assign({}, yp(this.$props, ff), t, {
      internalDeactivateImmediately: !0
    }), {
      trigger: () => {
        var n, o;
        return (o = (n = this.$slots).default) === null || o === void 0 ? void 0 : o.call(n);
      }
    });
  }
});
function M_(e) {
  const {
    boxShadow2: t
  } = e;
  return {
    menuBoxShadow: t
  };
}
const $v = {
  name: "Select",
  common: mt,
  peers: {
    InternalSelection: gv,
    InternalSelectMenu: Od
  },
  self: M_
}, I_ = H([z("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `), z("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [Ya({
  originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
})])]), Rn = window.Vue.computed, A_ = window.Vue.defineComponent, Co = window.Vue.h, hn = window.Vue.ref, ql = window.Vue.toRef, V_ = window.Vue.Transition, B_ = window.Vue.vShow, L_ = window.Vue.watch;
window.Vue.watchEffect;
const D_ = window.Vue.withDirectives, N_ = Object.assign(Object.assign({}, ke.props), {
  to: En.propTo,
  bordered: {
    type: Boolean,
    default: void 0
  },
  clearable: Boolean,
  clearFilterAfterSelect: {
    type: Boolean,
    default: !0
  },
  options: {
    type: Array,
    default: () => []
  },
  defaultValue: {
    type: [String, Number, Array],
    default: null
  },
  keyboard: {
    type: Boolean,
    default: !0
  },
  value: [String, Number, Array],
  placeholder: String,
  menuProps: Object,
  multiple: Boolean,
  size: String,
  menuSize: {
    type: String
  },
  filterable: Boolean,
  disabled: {
    type: Boolean,
    default: void 0
  },
  remote: Boolean,
  loading: Boolean,
  filter: Function,
  placement: {
    type: String,
    default: "bottom-start"
  },
  widthMode: {
    type: String,
    default: "trigger"
  },
  tag: Boolean,
  onCreate: Function,
  fallbackOption: {
    type: [Function, Boolean],
    default: void 0
  },
  show: {
    type: Boolean,
    default: void 0
  },
  showArrow: {
    type: Boolean,
    default: !0
  },
  maxTagCount: [Number, String],
  ellipsisTagPopoverProps: Object,
  consistentMenuWidth: {
    type: Boolean,
    default: !0
  },
  virtualScroll: {
    type: Boolean,
    default: !0
  },
  labelField: {
    type: String,
    default: "label"
  },
  valueField: {
    type: String,
    default: "value"
  },
  childrenField: {
    type: String,
    default: "children"
  },
  renderLabel: Function,
  renderOption: Function,
  renderTag: Function,
  "onUpdate:value": [Function, Array],
  inputProps: Object,
  nodeProps: Function,
  ignoreComposition: {
    type: Boolean,
    default: !0
  },
  showOnFocus: Boolean,
  // for jsx
  onUpdateValue: [Function, Array],
  onBlur: [Function, Array],
  onClear: [Function, Array],
  onFocus: [Function, Array],
  onScroll: [Function, Array],
  onSearch: [Function, Array],
  onUpdateShow: [Function, Array],
  "onUpdate:show": [Function, Array],
  displayDirective: {
    type: String,
    default: "show"
  },
  resetMenuOnOptionsChange: {
    type: Boolean,
    default: !0
  },
  status: String,
  showCheckmark: {
    type: Boolean,
    default: !0
  },
  /** deprecated */
  onChange: [Function, Array],
  items: Array
}), H_ = A_({
  name: "Select",
  props: N_,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBorderedRef: n,
      namespaceRef: o,
      inlineThemeDisabled: r
    } = je(e), i = ke("Select", "-select", I_, $v, e, t), l = hn(e.defaultValue), a = ql(e, "value"), s = It(a, l), d = hn(!1), c = hn(""), h = ep(e, ["items", "options"]), p = hn([]), g = hn([]), f = Rn(() => g.value.concat(p.value).concat(h.value)), v = Rn(() => {
      const {
        filter: P
      } = e;
      if (P) return P;
      const {
        labelField: N,
        valueField: te
      } = e;
      return (se, ue) => {
        if (!ue) return !1;
        const be = ue[N];
        if (typeof be == "string")
          return Wl(se, be);
        const we = ue[te];
        return typeof we == "string" ? Wl(se, we) : typeof we == "number" ? Wl(se, String(we)) : !1;
      };
    }), m = Rn(() => {
      if (e.remote)
        return h.value;
      {
        const {
          value: P
        } = f, {
          value: N
        } = c;
        return !N.length || !e.filterable ? P : WP(P, v.value, N, e.childrenField);
      }
    }), u = Rn(() => {
      const {
        valueField: P,
        childrenField: N
      } = e, te = yv(P, N);
      return Xa(m.value, te);
    }), w = Rn(() => UP(f.value, e.valueField, e.childrenField)), x = hn(!1), b = It(ql(e, "show"), x), C = hn(null), S = hn(null), y = hn(null), {
      localeRef: T
    } = vr("Select"), R = Rn(() => {
      var P;
      return (P = e.placeholder) !== null && P !== void 0 ? P : T.value.placeholder;
    }), E = [], W = hn(/* @__PURE__ */ new Map()), _ = Rn(() => {
      const {
        fallbackOption: P
      } = e;
      if (P === void 0) {
        const {
          labelField: N,
          valueField: te
        } = e;
        return (se) => ({
          [N]: String(se),
          [te]: se
        });
      }
      return P === !1 ? !1 : (N) => Object.assign(P(N), {
        value: N
      });
    });
    function M(P) {
      const N = e.remote, {
        value: te
      } = W, {
        value: se
      } = w, {
        value: ue
      } = _, be = [];
      return P.forEach((we) => {
        if (se.has(we))
          be.push(se.get(we));
        else if (N && te.has(we))
          be.push(te.get(we));
        else if (ue) {
          const Ce = ue(we);
          Ce && be.push(Ce);
        }
      }), be;
    }
    const I = Rn(() => {
      if (e.multiple) {
        const {
          value: P
        } = s;
        return Array.isArray(P) ? M(P) : [];
      }
      return null;
    }), O = Rn(() => {
      const {
        value: P
      } = s;
      return !e.multiple && !Array.isArray(P) ? P === null ? null : M([P])[0] || null : null;
    }), K = qn(e), {
      mergedSizeRef: L,
      mergedDisabledRef: Y,
      mergedStatusRef: Q
    } = K;
    function J(P, N) {
      const {
        onChange: te,
        "onUpdate:value": se,
        onUpdateValue: ue
      } = e, {
        nTriggerFormChange: be,
        nTriggerFormInput: we
      } = K;
      te && ie(te, P, N), ue && ie(ue, P, N), se && ie(se, P, N), l.value = P, be(), we();
    }
    function q(P) {
      const {
        onBlur: N
      } = e, {
        nTriggerFormBlur: te
      } = K;
      N && ie(N, P), te();
    }
    function A() {
      const {
        onClear: P
      } = e;
      P && ie(P);
    }
    function G(P) {
      const {
        onFocus: N,
        showOnFocus: te
      } = e, {
        nTriggerFormFocus: se
      } = K;
      N && ie(N, P), se(), te && ge();
    }
    function Z(P) {
      const {
        onSearch: N
      } = e;
      N && ie(N, P);
    }
    function ae(P) {
      const {
        onScroll: N
      } = e;
      N && ie(N, P);
    }
    function le() {
      var P;
      const {
        remote: N,
        multiple: te
      } = e;
      if (N) {
        const {
          value: se
        } = W;
        if (te) {
          const {
            valueField: ue
          } = e;
          (P = I.value) === null || P === void 0 || P.forEach((be) => {
            se.set(be[ue], be);
          });
        } else {
          const ue = O.value;
          ue && se.set(ue[e.valueField], ue);
        }
      }
    }
    function de(P) {
      const {
        onUpdateShow: N,
        "onUpdate:show": te
      } = e;
      N && ie(N, P), te && ie(te, P), x.value = P;
    }
    function ge() {
      Y.value || (de(!0), x.value = !0, e.filterable && Qe());
    }
    function X() {
      de(!1);
    }
    function ce() {
      c.value = "", g.value = E;
    }
    const Pe = hn(!1);
    function me() {
      e.filterable && (Pe.value = !0);
    }
    function $e() {
      e.filterable && (Pe.value = !1, b.value || ce());
    }
    function Se() {
      Y.value || (b.value ? e.filterable ? Qe() : X() : ge());
    }
    function Le(P) {
      var N, te;
      !((te = (N = y.value) === null || N === void 0 ? void 0 : N.selfRef) === null || te === void 0) && te.contains(P.relatedTarget) || (d.value = !1, q(P), X());
    }
    function Ie(P) {
      G(P), d.value = !0;
    }
    function re() {
      d.value = !0;
    }
    function k(P) {
      var N;
      !((N = C.value) === null || N === void 0) && N.$el.contains(P.relatedTarget) || (d.value = !1, q(P), X());
    }
    function $() {
      var P;
      (P = C.value) === null || P === void 0 || P.focus(), X();
    }
    function D(P) {
      var N;
      b.value && (!((N = C.value) === null || N === void 0) && N.$el.contains(ii(P)) || X());
    }
    function ee(P) {
      if (!Array.isArray(P)) return [];
      if (_.value)
        return Array.from(P);
      {
        const {
          remote: N
        } = e, {
          value: te
        } = w;
        if (N) {
          const {
            value: se
          } = W;
          return P.filter((ue) => te.has(ue) || se.has(ue));
        } else
          return P.filter((se) => te.has(se));
      }
    }
    function ve(P) {
      he(P.rawNode);
    }
    function he(P) {
      if (Y.value) return;
      const {
        tag: N,
        remote: te,
        clearFilterAfterSelect: se,
        valueField: ue
      } = e;
      if (N && !te) {
        const {
          value: be
        } = g, we = be[0] || null;
        if (we) {
          const Ce = p.value;
          Ce.length ? Ce.push(we) : p.value = [we], g.value = E;
        }
      }
      if (te && W.value.set(P[ue], P), e.multiple) {
        const be = ee(s.value), we = be.findIndex((Ce) => Ce === P[ue]);
        if (~we) {
          if (be.splice(we, 1), N && !te) {
            const Ce = F(P[ue]);
            ~Ce && (p.value.splice(Ce, 1), se && (c.value = ""));
          }
        } else
          be.push(P[ue]), se && (c.value = "");
        J(be, M(be));
      } else {
        if (N && !te) {
          const be = F(P[ue]);
          ~be ? p.value = [p.value[be]] : p.value = E;
        }
        Je(), X(), J(P[ue], P);
      }
    }
    function F(P) {
      return p.value.findIndex((te) => te[e.valueField] === P);
    }
    function j(P) {
      b.value || ge();
      const {
        value: N
      } = P.target;
      c.value = N;
      const {
        tag: te,
        remote: se
      } = e;
      if (Z(N), te && !se) {
        if (!N) {
          g.value = E;
          return;
        }
        const {
          onCreate: ue
        } = e, be = ue ? ue(N) : {
          [e.labelField]: N,
          [e.valueField]: N
        }, {
          valueField: we,
          labelField: Ce
        } = e;
        h.value.some((Ve) => Ve[we] === be[we] || Ve[Ce] === be[Ce]) || p.value.some((Ve) => Ve[we] === be[we] || Ve[Ce] === be[Ce]) ? g.value = E : g.value = [be];
      }
    }
    function pe(P) {
      P.stopPropagation();
      const {
        multiple: N
      } = e;
      !N && e.filterable && X(), A(), N ? J([], []) : J(null, null);
    }
    function Fe(P) {
      !cn(P, "action") && !cn(P, "empty") && !cn(P, "header") && P.preventDefault();
    }
    function dt(P) {
      ae(P);
    }
    function bt(P) {
      var N, te, se, ue, be;
      if (!e.keyboard) {
        P.preventDefault();
        return;
      }
      switch (P.key) {
        case " ":
          if (e.filterable)
            break;
          P.preventDefault();
        case "Enter":
          if (!(!((N = C.value) === null || N === void 0) && N.isComposing)) {
            if (b.value) {
              const we = (te = y.value) === null || te === void 0 ? void 0 : te.getPendingTmNode();
              we ? ve(we) : e.filterable || (X(), Je());
            } else if (ge(), e.tag && Pe.value) {
              const we = g.value[0];
              if (we) {
                const Ce = we[e.valueField], {
                  value: Ve
                } = s;
                e.multiple && Array.isArray(Ve) && Ve.includes(Ce) || he(we);
              }
            }
          }
          P.preventDefault();
          break;
        case "ArrowUp":
          if (P.preventDefault(), e.loading) return;
          b.value && ((se = y.value) === null || se === void 0 || se.prev());
          break;
        case "ArrowDown":
          if (P.preventDefault(), e.loading) return;
          b.value ? (ue = y.value) === null || ue === void 0 || ue.next() : ge();
          break;
        case "Escape":
          b.value && (Uy(P), X()), (be = C.value) === null || be === void 0 || be.focus();
          break;
      }
    }
    function Je() {
      var P;
      (P = C.value) === null || P === void 0 || P.focus();
    }
    function Qe() {
      var P;
      (P = C.value) === null || P === void 0 || P.focusInput();
    }
    function wt() {
      var P;
      b.value && ((P = S.value) === null || P === void 0 || P.syncPosition());
    }
    le(), L_(ql(e, "options"), le);
    const nt = {
      focus: () => {
        var P;
        (P = C.value) === null || P === void 0 || P.focus();
      },
      focusInput: () => {
        var P;
        (P = C.value) === null || P === void 0 || P.focusInput();
      },
      blur: () => {
        var P;
        (P = C.value) === null || P === void 0 || P.blur();
      },
      blurInput: () => {
        var P;
        (P = C.value) === null || P === void 0 || P.blurInput();
      }
    }, fe = Rn(() => {
      const {
        self: {
          menuBoxShadow: P
        }
      } = i.value;
      return {
        "--n-menu-box-shadow": P
      };
    }), Re = r ? St("select", void 0, fe, e) : void 0;
    return Object.assign(Object.assign({}, nt), {
      mergedStatus: Q,
      mergedClsPrefix: t,
      mergedBordered: n,
      namespace: o,
      treeMate: u,
      isMounted: Wa(),
      triggerRef: C,
      menuRef: y,
      pattern: c,
      uncontrolledShow: x,
      mergedShow: b,
      adjustedTo: En(e),
      uncontrolledValue: l,
      mergedValue: s,
      followerRef: S,
      localizedPlaceholder: R,
      selectedOption: O,
      selectedOptions: I,
      mergedSize: L,
      mergedDisabled: Y,
      focused: d,
      activeWithoutMenuOpen: Pe,
      inlineThemeDisabled: r,
      onTriggerInputFocus: me,
      onTriggerInputBlur: $e,
      handleTriggerOrMenuResize: wt,
      handleMenuFocus: re,
      handleMenuBlur: k,
      handleMenuTabOut: $,
      handleTriggerClick: Se,
      handleToggle: ve,
      handleDeleteOption: he,
      handlePatternInput: j,
      handleClear: pe,
      handleTriggerBlur: Le,
      handleTriggerFocus: Ie,
      handleKeydown: bt,
      handleMenuAfterLeave: ce,
      handleMenuClickOutside: D,
      handleMenuScroll: dt,
      handleMenuKeydown: bt,
      handleMenuMousedown: Fe,
      mergedTheme: i,
      cssVars: r ? void 0 : fe,
      themeClass: Re == null ? void 0 : Re.themeClass,
      onRender: Re == null ? void 0 : Re.onRender
    });
  },
  render() {
    return Co("div", {
      class: `${this.mergedClsPrefix}-select`
    }, Co(fd, null, {
      default: () => [Co(hd, null, {
        default: () => Co(gP, {
          ref: "triggerRef",
          inlineThemeDisabled: this.inlineThemeDisabled,
          status: this.mergedStatus,
          inputProps: this.inputProps,
          clsPrefix: this.mergedClsPrefix,
          showArrow: this.showArrow,
          maxTagCount: this.maxTagCount,
          ellipsisTagPopoverProps: this.ellipsisTagPopoverProps,
          bordered: this.mergedBordered,
          active: this.activeWithoutMenuOpen || this.mergedShow,
          pattern: this.pattern,
          placeholder: this.localizedPlaceholder,
          selectedOption: this.selectedOption,
          selectedOptions: this.selectedOptions,
          multiple: this.multiple,
          renderTag: this.renderTag,
          renderLabel: this.renderLabel,
          filterable: this.filterable,
          clearable: this.clearable,
          disabled: this.mergedDisabled,
          size: this.mergedSize,
          theme: this.mergedTheme.peers.InternalSelection,
          labelField: this.labelField,
          valueField: this.valueField,
          themeOverrides: this.mergedTheme.peerOverrides.InternalSelection,
          loading: this.loading,
          focused: this.focused,
          onClick: this.handleTriggerClick,
          onDeleteOption: this.handleDeleteOption,
          onPatternInput: this.handlePatternInput,
          onClear: this.handleClear,
          onBlur: this.handleTriggerBlur,
          onFocus: this.handleTriggerFocus,
          onKeydown: this.handleKeydown,
          onPatternBlur: this.onTriggerInputBlur,
          onPatternFocus: this.onTriggerInputFocus,
          onResize: this.handleTriggerOrMenuResize,
          ignoreComposition: this.ignoreComposition
        }, {
          arrow: () => {
            var e, t;
            return [(t = (e = this.$slots).arrow) === null || t === void 0 ? void 0 : t.call(e)];
          }
        })
      }), Co(vd, {
        ref: "followerRef",
        show: this.mergedShow,
        to: this.adjustedTo,
        teleportDisabled: this.adjustedTo === En.tdkey,
        containerClass: this.namespace,
        width: this.consistentMenuWidth ? "target" : void 0,
        minWidth: "target",
        placement: this.placement
      }, {
        default: () => Co(V_, {
          name: "fade-in-scale-up-transition",
          appear: this.isMounted,
          onAfterLeave: this.handleMenuAfterLeave
        }, {
          default: () => {
            var e, t, n;
            return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), D_(Co(fv, Object.assign({}, this.menuProps, {
              ref: "menuRef",
              onResize: this.handleTriggerOrMenuResize,
              inlineThemeDisabled: this.inlineThemeDisabled,
              virtualScroll: this.consistentMenuWidth && this.virtualScroll,
              class: [`${this.mergedClsPrefix}-select-menu`, this.themeClass, (t = this.menuProps) === null || t === void 0 ? void 0 : t.class],
              clsPrefix: this.mergedClsPrefix,
              focusable: !0,
              labelField: this.labelField,
              valueField: this.valueField,
              autoPending: !0,
              nodeProps: this.nodeProps,
              theme: this.mergedTheme.peers.InternalSelectMenu,
              themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu,
              treeMate: this.treeMate,
              multiple: this.multiple,
              size: this.menuSize,
              renderOption: this.renderOption,
              renderLabel: this.renderLabel,
              value: this.mergedValue,
              style: [(n = this.menuProps) === null || n === void 0 ? void 0 : n.style, this.cssVars],
              onToggle: this.handleToggle,
              onScroll: this.handleMenuScroll,
              onFocus: this.handleMenuFocus,
              onBlur: this.handleMenuBlur,
              onKeydown: this.handleMenuKeydown,
              onTabOut: this.handleMenuTabOut,
              onMousedown: this.handleMenuMousedown,
              show: this.mergedShow,
              showCheckmark: this.showCheckmark,
              resetMenuOnOptionsChange: this.resetMenuOnOptionsChange
            }), {
              empty: () => {
                var o, r;
                return [(r = (o = this.$slots).empty) === null || r === void 0 ? void 0 : r.call(o)];
              },
              header: () => {
                var o, r;
                return [(r = (o = this.$slots).header) === null || r === void 0 ? void 0 : r.call(o)];
              },
              action: () => {
                var o, r;
                return [(r = (o = this.$slots).action) === null || r === void 0 ? void 0 : r.call(o)];
              }
            }), this.displayDirective === "show" ? [[B_, this.mergedShow], [Fa, this.handleMenuClickOutside, void 0, {
              capture: !0
            }]] : [[Fa, this.handleMenuClickOutside, void 0, {
              capture: !0
            }]])) : null;
          }
        })
      })]
    }));
  }
}), j_ = {
  itemPaddingSmall: "0 4px",
  itemMarginSmall: "0 0 0 8px",
  itemMarginSmallRtl: "0 8px 0 0",
  itemPaddingMedium: "0 4px",
  itemMarginMedium: "0 0 0 8px",
  itemMarginMediumRtl: "0 8px 0 0",
  itemPaddingLarge: "0 4px",
  itemMarginLarge: "0 0 0 8px",
  itemMarginLargeRtl: "0 8px 0 0",
  buttonIconSizeSmall: "14px",
  buttonIconSizeMedium: "16px",
  buttonIconSizeLarge: "18px",
  inputWidthSmall: "60px",
  selectWidthSmall: "unset",
  inputMarginSmall: "0 0 0 8px",
  inputMarginSmallRtl: "0 8px 0 0",
  selectMarginSmall: "0 0 0 8px",
  prefixMarginSmall: "0 8px 0 0",
  suffixMarginSmall: "0 0 0 8px",
  inputWidthMedium: "60px",
  selectWidthMedium: "unset",
  inputMarginMedium: "0 0 0 8px",
  inputMarginMediumRtl: "0 8px 0 0",
  selectMarginMedium: "0 0 0 8px",
  prefixMarginMedium: "0 8px 0 0",
  suffixMarginMedium: "0 0 0 8px",
  inputWidthLarge: "60px",
  selectWidthLarge: "unset",
  inputMarginLarge: "0 0 0 8px",
  inputMarginLargeRtl: "0 8px 0 0",
  selectMarginLarge: "0 0 0 8px",
  prefixMarginLarge: "0 8px 0 0",
  suffixMarginLarge: "0 0 0 8px"
};
function W_(e) {
  const {
    textColor2: t,
    primaryColor: n,
    primaryColorHover: o,
    primaryColorPressed: r,
    inputColorDisabled: i,
    textColorDisabled: l,
    borderColor: a,
    borderRadius: s,
    // item font size
    fontSizeTiny: d,
    fontSizeSmall: c,
    fontSizeMedium: h,
    // item size
    heightTiny: p,
    heightSmall: g,
    heightMedium: f
  } = e;
  return Object.assign(Object.assign({}, j_), {
    buttonColor: "#0000",
    buttonColorHover: "#0000",
    buttonColorPressed: "#0000",
    buttonBorder: `1px solid ${a}`,
    buttonBorderHover: `1px solid ${a}`,
    buttonBorderPressed: `1px solid ${a}`,
    buttonIconColor: t,
    buttonIconColorHover: t,
    buttonIconColorPressed: t,
    itemTextColor: t,
    itemTextColorHover: o,
    itemTextColorPressed: r,
    itemTextColorActive: n,
    itemTextColorDisabled: l,
    itemColor: "#0000",
    itemColorHover: "#0000",
    itemColorPressed: "#0000",
    itemColorActive: "#0000",
    itemColorActiveHover: "#0000",
    itemColorDisabled: i,
    itemBorder: "1px solid #0000",
    itemBorderHover: "1px solid #0000",
    itemBorderPressed: "1px solid #0000",
    itemBorderActive: `1px solid ${n}`,
    itemBorderDisabled: `1px solid ${a}`,
    itemBorderRadius: s,
    itemSizeSmall: p,
    itemSizeMedium: g,
    itemSizeLarge: f,
    itemFontSizeSmall: d,
    itemFontSizeMedium: c,
    itemFontSizeLarge: h,
    jumperFontSizeSmall: d,
    jumperFontSizeMedium: c,
    jumperFontSizeLarge: h,
    jumperTextColor: t,
    jumperTextColorDisabled: l
  });
}
const Rv = {
  name: "Pagination",
  common: mt,
  peers: {
    Select: $v,
    Input: Md,
    Popselect: Vd
  },
  self: W_
}, pf = `
 background: var(--n-item-color-hover);
 color: var(--n-item-text-color-hover);
 border: var(--n-item-border-hover);
`, vf = [U("button", `
 background: var(--n-button-color-hover);
 border: var(--n-button-border-hover);
 color: var(--n-button-icon-color-hover);
 `)], U_ = z("pagination", `
 display: flex;
 vertical-align: middle;
 font-size: var(--n-item-font-size);
 flex-wrap: nowrap;
`, [z("pagination-prefix", `
 display: flex;
 align-items: center;
 margin: var(--n-prefix-margin);
 `), z("pagination-suffix", `
 display: flex;
 align-items: center;
 margin: var(--n-suffix-margin);
 `), H("> *:not(:first-child)", `
 margin: var(--n-item-margin);
 `), z("select", `
 width: var(--n-select-width);
 `), H("&.transition-disabled", [z("pagination-item", "transition: none!important;")]), z("pagination-quick-jumper", `
 white-space: nowrap;
 display: flex;
 color: var(--n-jumper-text-color);
 transition: color .3s var(--n-bezier);
 align-items: center;
 font-size: var(--n-jumper-font-size);
 `, [z("input", `
 margin: var(--n-input-margin);
 width: var(--n-input-width);
 `)]), z("pagination-item", `
 position: relative;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 display: flex;
 align-items: center;
 justify-content: center;
 box-sizing: border-box;
 min-width: var(--n-item-size);
 height: var(--n-item-size);
 padding: var(--n-item-padding);
 background-color: var(--n-item-color);
 color: var(--n-item-text-color);
 border-radius: var(--n-item-border-radius);
 border: var(--n-item-border);
 fill: var(--n-button-icon-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 fill .3s var(--n-bezier);
 `, [U("button", `
 background: var(--n-button-color);
 color: var(--n-button-icon-color);
 border: var(--n-button-border);
 padding: 0;
 `, [z("base-icon", `
 font-size: var(--n-button-icon-size);
 `)]), tt("disabled", [U("hover", pf, vf), H("&:hover", pf, vf), H("&:active", `
 background: var(--n-item-color-pressed);
 color: var(--n-item-text-color-pressed);
 border: var(--n-item-border-pressed);
 `, [U("button", `
 background: var(--n-button-color-pressed);
 border: var(--n-button-border-pressed);
 color: var(--n-button-icon-color-pressed);
 `)]), U("active", `
 background: var(--n-item-color-active);
 color: var(--n-item-text-color-active);
 border: var(--n-item-border-active);
 `, [H("&:hover", `
 background: var(--n-item-color-active-hover);
 `)])]), U("disabled", `
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `, [U("active, button", `
 background-color: var(--n-item-color-disabled);
 border: var(--n-item-border-disabled);
 `)])]), U("disabled", `
 cursor: not-allowed;
 `, [z("pagination-quick-jumper", `
 color: var(--n-jumper-text-color-disabled);
 `)]), U("simple", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `, [z("pagination-quick-jumper", [z("input", `
 margin: 0;
 `)])])]);
function kv(e) {
  var t;
  if (!e) return 10;
  const {
    defaultPageSize: n
  } = e;
  if (n !== void 0) return n;
  const o = (t = e.pageSizes) === null || t === void 0 ? void 0 : t[0];
  return typeof o == "number" ? o : (o == null ? void 0 : o.value) || 10;
}
function K_(e, t, n, o) {
  let r = !1, i = !1, l = 1, a = t;
  if (t === 1)
    return {
      hasFastBackward: !1,
      hasFastForward: !1,
      fastForwardTo: a,
      fastBackwardTo: l,
      items: [{
        type: "page",
        label: 1,
        active: e === 1,
        mayBeFastBackward: !1,
        mayBeFastForward: !1
      }]
    };
  if (t === 2)
    return {
      hasFastBackward: !1,
      hasFastForward: !1,
      fastForwardTo: a,
      fastBackwardTo: l,
      items: [{
        type: "page",
        label: 1,
        active: e === 1,
        mayBeFastBackward: !1,
        mayBeFastForward: !1
      }, {
        type: "page",
        label: 2,
        active: e === 2,
        mayBeFastBackward: !0,
        mayBeFastForward: !1
      }]
    };
  const s = 1, d = t;
  let c = e, h = e;
  const p = (n - 5) / 2;
  h += Math.ceil(p), h = Math.min(Math.max(h, s + n - 3), d - 2), c -= Math.floor(p), c = Math.max(Math.min(c, d - n + 3), s + 2);
  let g = !1, f = !1;
  c > s + 2 && (g = !0), h < d - 2 && (f = !0);
  const v = [];
  v.push({
    type: "page",
    label: 1,
    active: e === 1,
    mayBeFastBackward: !1,
    mayBeFastForward: !1
  }), g ? (r = !0, l = c - 1, v.push({
    type: "fast-backward",
    active: !1,
    label: void 0,
    options: o ? gf(s + 1, c - 1) : null
  })) : d >= s + 1 && v.push({
    type: "page",
    label: s + 1,
    mayBeFastBackward: !0,
    mayBeFastForward: !1,
    active: e === s + 1
  });
  for (let m = c; m <= h; ++m)
    v.push({
      type: "page",
      label: m,
      mayBeFastBackward: !1,
      mayBeFastForward: !1,
      active: e === m
    });
  return f ? (i = !0, a = h + 1, v.push({
    type: "fast-forward",
    active: !1,
    label: void 0,
    options: o ? gf(h + 1, d - 1) : null
  })) : h === d - 2 && v[v.length - 1].label !== d - 1 && v.push({
    type: "page",
    mayBeFastForward: !0,
    mayBeFastBackward: !1,
    label: d - 1,
    active: e === d - 1
  }), v[v.length - 1].label !== d && v.push({
    type: "page",
    mayBeFastForward: !1,
    mayBeFastBackward: !1,
    label: d,
    active: e === d
  }), {
    hasFastBackward: r,
    hasFastForward: i,
    fastBackwardTo: l,
    fastForwardTo: a,
    items: v
  };
}
function gf(e, t) {
  const n = [];
  for (let o = e; o <= t; ++o)
    n.push({
      label: `${o}`,
      value: o
    });
  return n;
}
const pn = window.Vue.computed, q_ = window.Vue.defineComponent, mf = window.Vue.Fragment, Ye = window.Vue.h, G_ = window.Vue.nextTick, oo = window.Vue.ref, bf = window.Vue.toRef, Gl = window.Vue.watchEffect, X_ = Object.assign(Object.assign({}, ke.props), {
  simple: Boolean,
  page: Number,
  defaultPage: {
    type: Number,
    default: 1
  },
  itemCount: Number,
  pageCount: Number,
  defaultPageCount: {
    type: Number,
    default: 1
  },
  showSizePicker: Boolean,
  pageSize: Number,
  defaultPageSize: Number,
  pageSizes: {
    type: Array,
    default() {
      return [10];
    }
  },
  showQuickJumper: Boolean,
  size: {
    type: String,
    default: "medium"
  },
  disabled: Boolean,
  pageSlot: {
    type: Number,
    default: 9
  },
  selectProps: Object,
  prev: Function,
  next: Function,
  goto: Function,
  prefix: Function,
  suffix: Function,
  label: Function,
  displayOrder: {
    type: Array,
    default: ["pages", "size-picker", "quick-jumper"]
  },
  to: En.propTo,
  showQuickJumpDropdown: {
    type: Boolean,
    default: !0
  },
  "onUpdate:page": [Function, Array],
  onUpdatePage: [Function, Array],
  "onUpdate:pageSize": [Function, Array],
  onUpdatePageSize: [Function, Array],
  /** @deprecated */
  onPageSizeChange: [Function, Array],
  /** @deprecated */
  onChange: [Function, Array]
}), Y_ = q_({
  name: "Pagination",
  props: X_,
  slots: Object,
  setup(e) {
    const {
      mergedComponentPropsRef: t,
      mergedClsPrefixRef: n,
      inlineThemeDisabled: o,
      mergedRtlRef: r
    } = je(e), i = ke("Pagination", "-pagination", U_, Rv, e, n), {
      localeRef: l
    } = vr("Pagination"), a = oo(null), s = oo(e.defaultPage), d = oo(kv(e)), c = It(bf(e, "page"), s), h = It(bf(e, "pageSize"), d), p = pn(() => {
      const {
        itemCount: X
      } = e;
      if (X !== void 0)
        return Math.max(1, Math.ceil(X / h.value));
      const {
        pageCount: ce
      } = e;
      return ce !== void 0 ? Math.max(ce, 1) : 1;
    }), g = oo("");
    Gl(() => {
      e.simple, g.value = String(c.value);
    });
    const f = oo(!1), v = oo(!1), m = oo(!1), u = oo(!1), w = () => {
      e.disabled || (f.value = !0, O());
    }, x = () => {
      e.disabled || (f.value = !1, O());
    }, b = () => {
      v.value = !0, O();
    }, C = () => {
      v.value = !1, O();
    }, S = (X) => {
      K(X);
    }, y = pn(() => K_(c.value, p.value, e.pageSlot, e.showQuickJumpDropdown));
    Gl(() => {
      y.value.hasFastBackward ? y.value.hasFastForward || (f.value = !1, m.value = !1) : (v.value = !1, u.value = !1);
    });
    const T = pn(() => {
      const X = l.value.selectionSuffix;
      return e.pageSizes.map((ce) => typeof ce == "number" ? {
        label: `${ce} / ${X}`,
        value: ce
      } : ce);
    }), R = pn(() => {
      var X, ce;
      return ((ce = (X = t == null ? void 0 : t.value) === null || X === void 0 ? void 0 : X.Pagination) === null || ce === void 0 ? void 0 : ce.inputSize) || Zc(e.size);
    }), E = pn(() => {
      var X, ce;
      return ((ce = (X = t == null ? void 0 : t.value) === null || X === void 0 ? void 0 : X.Pagination) === null || ce === void 0 ? void 0 : ce.selectSize) || Zc(e.size);
    }), W = pn(() => (c.value - 1) * h.value), _ = pn(() => {
      const X = c.value * h.value - 1, {
        itemCount: ce
      } = e;
      return ce !== void 0 && X > ce - 1 ? ce - 1 : X;
    }), M = pn(() => {
      const {
        itemCount: X
      } = e;
      return X !== void 0 ? X : (e.pageCount || 1) * h.value;
    }), I = At("Pagination", r, n);
    function O() {
      G_(() => {
        var X;
        const {
          value: ce
        } = a;
        ce && (ce.classList.add("transition-disabled"), (X = a.value) === null || X === void 0 || X.offsetWidth, ce.classList.remove("transition-disabled"));
      });
    }
    function K(X) {
      if (X === c.value) return;
      const {
        "onUpdate:page": ce,
        onUpdatePage: Pe,
        onChange: me,
        simple: $e
      } = e;
      ce && ie(ce, X), Pe && ie(Pe, X), me && ie(me, X), s.value = X, $e && (g.value = String(X));
    }
    function L(X) {
      if (X === h.value) return;
      const {
        "onUpdate:pageSize": ce,
        onUpdatePageSize: Pe,
        onPageSizeChange: me
      } = e;
      ce && ie(ce, X), Pe && ie(Pe, X), me && ie(me, X), d.value = X, p.value < c.value && K(p.value);
    }
    function Y() {
      if (e.disabled) return;
      const X = Math.min(c.value + 1, p.value);
      K(X);
    }
    function Q() {
      if (e.disabled) return;
      const X = Math.max(c.value - 1, 1);
      K(X);
    }
    function J() {
      if (e.disabled) return;
      const X = Math.min(y.value.fastForwardTo, p.value);
      K(X);
    }
    function q() {
      if (e.disabled) return;
      const X = Math.max(y.value.fastBackwardTo, 1);
      K(X);
    }
    function A(X) {
      L(X);
    }
    function G() {
      const X = Number.parseInt(g.value);
      Number.isNaN(X) || (K(Math.max(1, Math.min(X, p.value))), e.simple || (g.value = ""));
    }
    function Z() {
      G();
    }
    function ae(X) {
      if (!e.disabled)
        switch (X.type) {
          case "page":
            K(X.label);
            break;
          case "fast-backward":
            q();
            break;
          case "fast-forward":
            J();
            break;
        }
    }
    function le(X) {
      g.value = X.replace(/\D+/g, "");
    }
    Gl(() => {
      c.value, h.value, O();
    });
    const de = pn(() => {
      const {
        size: X
      } = e, {
        self: {
          buttonBorder: ce,
          buttonBorderHover: Pe,
          buttonBorderPressed: me,
          buttonIconColor: $e,
          buttonIconColorHover: Se,
          buttonIconColorPressed: Le,
          itemTextColor: Ie,
          itemTextColorHover: re,
          itemTextColorPressed: k,
          itemTextColorActive: $,
          itemTextColorDisabled: D,
          itemColor: ee,
          itemColorHover: ve,
          itemColorPressed: he,
          itemColorActive: F,
          itemColorActiveHover: j,
          itemColorDisabled: pe,
          itemBorder: Fe,
          itemBorderHover: dt,
          itemBorderPressed: bt,
          itemBorderActive: Je,
          itemBorderDisabled: Qe,
          itemBorderRadius: wt,
          jumperTextColor: nt,
          jumperTextColorDisabled: fe,
          buttonColor: Re,
          buttonColorHover: P,
          buttonColorPressed: N,
          [oe("itemPadding", X)]: te,
          [oe("itemMargin", X)]: se,
          [oe("inputWidth", X)]: ue,
          [oe("selectWidth", X)]: be,
          [oe("inputMargin", X)]: we,
          [oe("selectMargin", X)]: Ce,
          [oe("jumperFontSize", X)]: Ve,
          [oe("prefixMargin", X)]: it,
          [oe("suffixMargin", X)]: He,
          [oe("itemSize", X)]: Tt,
          [oe("buttonIconSize", X)]: Vt,
          [oe("itemFontSize", X)]: Bt,
          [`${oe("itemMargin", X)}Rtl`]: Wt,
          [`${oe("inputMargin", X)}Rtl`]: Ut
        },
        common: {
          cubicBezierEaseInOut: on
        }
      } = i.value;
      return {
        "--n-prefix-margin": it,
        "--n-suffix-margin": He,
        "--n-item-font-size": Bt,
        "--n-select-width": be,
        "--n-select-margin": Ce,
        "--n-input-width": ue,
        "--n-input-margin": we,
        "--n-input-margin-rtl": Ut,
        "--n-item-size": Tt,
        "--n-item-text-color": Ie,
        "--n-item-text-color-disabled": D,
        "--n-item-text-color-hover": re,
        "--n-item-text-color-active": $,
        "--n-item-text-color-pressed": k,
        "--n-item-color": ee,
        "--n-item-color-hover": ve,
        "--n-item-color-disabled": pe,
        "--n-item-color-active": F,
        "--n-item-color-active-hover": j,
        "--n-item-color-pressed": he,
        "--n-item-border": Fe,
        "--n-item-border-hover": dt,
        "--n-item-border-disabled": Qe,
        "--n-item-border-active": Je,
        "--n-item-border-pressed": bt,
        "--n-item-padding": te,
        "--n-item-border-radius": wt,
        "--n-bezier": on,
        "--n-jumper-font-size": Ve,
        "--n-jumper-text-color": nt,
        "--n-jumper-text-color-disabled": fe,
        "--n-item-margin": se,
        "--n-item-margin-rtl": Wt,
        "--n-button-icon-size": Vt,
        "--n-button-icon-color": $e,
        "--n-button-icon-color-hover": Se,
        "--n-button-icon-color-pressed": Le,
        "--n-button-color-hover": P,
        "--n-button-color": Re,
        "--n-button-color-pressed": N,
        "--n-button-border": ce,
        "--n-button-border-hover": Pe,
        "--n-button-border-pressed": me
      };
    }), ge = o ? St("pagination", pn(() => {
      let X = "";
      const {
        size: ce
      } = e;
      return X += ce[0], X;
    }), de, e) : void 0;
    return {
      rtlEnabled: I,
      mergedClsPrefix: n,
      locale: l,
      selfRef: a,
      mergedPage: c,
      pageItems: pn(() => y.value.items),
      mergedItemCount: M,
      jumperValue: g,
      pageSizeOptions: T,
      mergedPageSize: h,
      inputSize: R,
      selectSize: E,
      mergedTheme: i,
      mergedPageCount: p,
      startIndex: W,
      endIndex: _,
      showFastForwardMenu: m,
      showFastBackwardMenu: u,
      fastForwardActive: f,
      fastBackwardActive: v,
      handleMenuSelect: S,
      handleFastForwardMouseenter: w,
      handleFastForwardMouseleave: x,
      handleFastBackwardMouseenter: b,
      handleFastBackwardMouseleave: C,
      handleJumperInput: le,
      handleBackwardClick: Q,
      handleForwardClick: Y,
      handlePageItemClick: ae,
      handleSizePickerChange: A,
      handleQuickJumperChange: Z,
      cssVars: o ? void 0 : de,
      themeClass: ge == null ? void 0 : ge.themeClass,
      onRender: ge == null ? void 0 : ge.onRender
    };
  },
  render() {
    const {
      $slots: e,
      mergedClsPrefix: t,
      disabled: n,
      cssVars: o,
      mergedPage: r,
      mergedPageCount: i,
      pageItems: l,
      showSizePicker: a,
      showQuickJumper: s,
      mergedTheme: d,
      locale: c,
      inputSize: h,
      selectSize: p,
      mergedPageSize: g,
      pageSizeOptions: f,
      jumperValue: v,
      simple: m,
      prev: u,
      next: w,
      prefix: x,
      suffix: b,
      label: C,
      goto: S,
      handleJumperInput: y,
      handleSizePickerChange: T,
      handleBackwardClick: R,
      handlePageItemClick: E,
      handleForwardClick: W,
      handleQuickJumperChange: _,
      onRender: M
    } = this;
    M == null || M();
    const I = x || e.prefix, O = b || e.suffix, K = u || e.prev, L = w || e.next, Y = C || e.label;
    return Ye("div", {
      ref: "selfRef",
      class: [`${t}-pagination`, this.themeClass, this.rtlEnabled && `${t}-pagination--rtl`, n && `${t}-pagination--disabled`, m && `${t}-pagination--simple`],
      style: o
    }, I ? Ye("div", {
      class: `${t}-pagination-prefix`
    }, I({
      page: r,
      pageSize: g,
      pageCount: i,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      itemCount: this.mergedItemCount
    })) : null, this.displayOrder.map((Q) => {
      switch (Q) {
        case "pages":
          return Ye(mf, null, Ye("div", {
            class: [`${t}-pagination-item`, !K && `${t}-pagination-item--button`, (r <= 1 || r > i || n) && `${t}-pagination-item--disabled`],
            onClick: R
          }, K ? K({
            page: r,
            pageSize: g,
            pageCount: i,
            startIndex: this.startIndex,
            endIndex: this.endIndex,
            itemCount: this.mergedItemCount
          }) : Ye(Ct, {
            clsPrefix: t
          }, {
            default: () => this.rtlEnabled ? Ye(Mu, null) : Ye(_u, null)
          })), m ? Ye(mf, null, Ye("div", {
            class: `${t}-pagination-quick-jumper`
          }, Ye(js, {
            value: v,
            onUpdateValue: y,
            size: h,
            placeholder: "",
            disabled: n,
            theme: d.peers.Input,
            themeOverrides: d.peerOverrides.Input,
            onChange: _
          })), " /", " ", i) : l.map((J, q) => {
            let A, G, Z;
            const {
              type: ae
            } = J;
            switch (ae) {
              case "page":
                const de = J.label;
                Y ? A = Y({
                  type: "page",
                  node: de,
                  active: J.active
                }) : A = de;
                break;
              case "fast-forward":
                const ge = this.fastForwardActive ? Ye(Ct, {
                  clsPrefix: t
                }, {
                  default: () => this.rtlEnabled ? Ye(Eu, null) : Ye(zu, null)
                }) : Ye(Ct, {
                  clsPrefix: t
                }, {
                  default: () => Ye(Iu, null)
                });
                Y ? A = Y({
                  type: "fast-forward",
                  node: ge,
                  active: this.fastForwardActive || this.showFastForwardMenu
                }) : A = ge, G = this.handleFastForwardMouseenter, Z = this.handleFastForwardMouseleave;
                break;
              case "fast-backward":
                const X = this.fastBackwardActive ? Ye(Ct, {
                  clsPrefix: t
                }, {
                  default: () => this.rtlEnabled ? Ye(zu, null) : Ye(Eu, null)
                }) : Ye(Ct, {
                  clsPrefix: t
                }, {
                  default: () => Ye(Iu, null)
                });
                Y ? A = Y({
                  type: "fast-backward",
                  node: X,
                  active: this.fastBackwardActive || this.showFastBackwardMenu
                }) : A = X, G = this.handleFastBackwardMouseenter, Z = this.handleFastBackwardMouseleave;
                break;
            }
            const le = Ye("div", {
              key: q,
              class: [`${t}-pagination-item`, J.active && `${t}-pagination-item--active`, ae !== "page" && (ae === "fast-backward" && this.showFastBackwardMenu || ae === "fast-forward" && this.showFastForwardMenu) && `${t}-pagination-item--hover`, n && `${t}-pagination-item--disabled`, ae === "page" && `${t}-pagination-item--clickable`],
              onClick: () => {
                E(J);
              },
              onMouseenter: G,
              onMouseleave: Z
            }, A);
            if (ae === "page" && !J.mayBeFastBackward && !J.mayBeFastForward)
              return le;
            {
              const de = J.type === "page" ? J.mayBeFastBackward ? "fast-backward" : "fast-forward" : J.type;
              return J.type !== "page" && !J.options ? le : Ye(O_, {
                to: this.to,
                key: de,
                disabled: n,
                trigger: "hover",
                virtualScroll: !0,
                style: {
                  width: "60px"
                },
                theme: d.peers.Popselect,
                themeOverrides: d.peerOverrides.Popselect,
                builtinThemeOverrides: {
                  peers: {
                    InternalSelectMenu: {
                      height: "calc(var(--n-option-height) * 4.6)"
                    }
                  }
                },
                nodeProps: () => ({
                  style: {
                    justifyContent: "center"
                  }
                }),
                show: ae === "page" ? !1 : ae === "fast-backward" ? this.showFastBackwardMenu : this.showFastForwardMenu,
                onUpdateShow: (ge) => {
                  ae !== "page" && (ge ? ae === "fast-backward" ? this.showFastBackwardMenu = ge : this.showFastForwardMenu = ge : (this.showFastBackwardMenu = !1, this.showFastForwardMenu = !1));
                },
                options: J.type !== "page" && J.options ? J.options : [],
                onUpdateValue: this.handleMenuSelect,
                scrollable: !0,
                showCheckmark: !1
              }, {
                default: () => le
              });
            }
          }), Ye("div", {
            class: [`${t}-pagination-item`, !L && `${t}-pagination-item--button`, {
              [`${t}-pagination-item--disabled`]: r < 1 || r >= i || n
            }],
            onClick: W
          }, L ? L({
            page: r,
            pageSize: g,
            pageCount: i,
            itemCount: this.mergedItemCount,
            startIndex: this.startIndex,
            endIndex: this.endIndex
          }) : Ye(Ct, {
            clsPrefix: t
          }, {
            default: () => this.rtlEnabled ? Ye(_u, null) : Ye(Mu, null)
          })));
        case "size-picker":
          return !m && a ? Ye(H_, Object.assign({
            consistentMenuWidth: !1,
            placeholder: "",
            showCheckmark: !1,
            to: this.to
          }, this.selectProps, {
            size: p,
            options: f,
            value: g,
            disabled: n,
            theme: d.peers.Select,
            themeOverrides: d.peerOverrides.Select,
            onUpdateValue: T
          })) : null;
        case "quick-jumper":
          return !m && s ? Ye("div", {
            class: `${t}-pagination-quick-jumper`
          }, S ? S() : wn(this.$slots.goto, () => [c.goto]), Ye(js, {
            value: v,
            onUpdateValue: y,
            size: h,
            placeholder: "",
            disabled: n,
            theme: d.peers.Input,
            themeOverrides: d.peerOverrides.Input,
            onChange: _
          })) : null;
        default:
          return null;
      }
    }), O ? Ye("div", {
      class: `${t}-pagination-suffix`
    }, O({
      page: r,
      pageSize: g,
      pageCount: i,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      itemCount: this.mergedItemCount
    })) : null);
  }
}), Z_ = {
  padding: "4px 0",
  optionIconSizeSmall: "14px",
  optionIconSizeMedium: "16px",
  optionIconSizeLarge: "16px",
  optionIconSizeHuge: "18px",
  optionSuffixWidthSmall: "14px",
  optionSuffixWidthMedium: "14px",
  optionSuffixWidthLarge: "16px",
  optionSuffixWidthHuge: "16px",
  optionIconSuffixWidthSmall: "32px",
  optionIconSuffixWidthMedium: "32px",
  optionIconSuffixWidthLarge: "36px",
  optionIconSuffixWidthHuge: "36px",
  optionPrefixWidthSmall: "14px",
  optionPrefixWidthMedium: "14px",
  optionPrefixWidthLarge: "16px",
  optionPrefixWidthHuge: "16px",
  optionIconPrefixWidthSmall: "36px",
  optionIconPrefixWidthMedium: "36px",
  optionIconPrefixWidthLarge: "40px",
  optionIconPrefixWidthHuge: "40px"
};
function J_(e) {
  const {
    primaryColor: t,
    textColor2: n,
    dividerColor: o,
    hoverColor: r,
    popoverColor: i,
    invertedColor: l,
    borderRadius: a,
    fontSizeSmall: s,
    fontSizeMedium: d,
    fontSizeLarge: c,
    fontSizeHuge: h,
    heightSmall: p,
    heightMedium: g,
    heightLarge: f,
    heightHuge: v,
    textColor3: m,
    opacityDisabled: u
  } = e;
  return Object.assign(Object.assign({}, Z_), {
    optionHeightSmall: p,
    optionHeightMedium: g,
    optionHeightLarge: f,
    optionHeightHuge: v,
    borderRadius: a,
    fontSizeSmall: s,
    fontSizeMedium: d,
    fontSizeLarge: c,
    fontSizeHuge: h,
    // non-inverted
    optionTextColor: n,
    optionTextColorHover: n,
    optionTextColorActive: t,
    optionTextColorChildActive: t,
    color: i,
    dividerColor: o,
    suffixColor: n,
    prefixColor: n,
    optionColorHover: r,
    optionColorActive: Ee(t, {
      alpha: 0.1
    }),
    groupHeaderTextColor: m,
    // inverted
    optionTextColorInverted: "#BBB",
    optionTextColorHoverInverted: "#FFF",
    optionTextColorActiveInverted: "#FFF",
    optionTextColorChildActiveInverted: "#FFF",
    colorInverted: l,
    dividerColorInverted: "#BBB",
    suffixColorInverted: "#BBB",
    prefixColorInverted: "#BBB",
    optionColorHoverInverted: t,
    optionColorActiveInverted: t,
    groupHeaderTextColorInverted: "#AAA",
    optionOpacityDisabled: u
  });
}
const Pv = {
  name: "Dropdown",
  common: mt,
  peers: {
    Popover: wr
  },
  self: J_
}, Q_ = {
  padding: "8px 14px"
};
function eT(e) {
  const {
    borderRadius: t,
    boxShadow2: n,
    baseColor: o
  } = e;
  return Object.assign(Object.assign({}, Q_), {
    borderRadius: t,
    boxShadow: n,
    color: Ke(o, "rgba(0, 0, 0, .85)"),
    textColor: o
  });
}
const _v = {
  name: "Tooltip",
  common: mt,
  peers: {
    Popover: wr
  },
  self: eT
}, Tv = {
  name: "Ellipsis",
  common: mt,
  peers: {
    Tooltip: _v
  }
}, tT = {
  radioSizeSmall: "14px",
  radioSizeMedium: "16px",
  radioSizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function nT(e) {
  const {
    borderColor: t,
    primaryColor: n,
    baseColor: o,
    textColorDisabled: r,
    inputColorDisabled: i,
    textColor2: l,
    opacityDisabled: a,
    borderRadius: s,
    fontSizeSmall: d,
    fontSizeMedium: c,
    fontSizeLarge: h,
    heightSmall: p,
    heightMedium: g,
    heightLarge: f,
    lineHeight: v
  } = e;
  return Object.assign(Object.assign({}, tT), {
    labelLineHeight: v,
    buttonHeightSmall: p,
    buttonHeightMedium: g,
    buttonHeightLarge: f,
    fontSizeSmall: d,
    fontSizeMedium: c,
    fontSizeLarge: h,
    boxShadow: `inset 0 0 0 1px ${t}`,
    boxShadowActive: `inset 0 0 0 1px ${n}`,
    boxShadowFocus: `inset 0 0 0 1px ${n}, 0 0 0 2px ${Ee(n, {
      alpha: 0.2
    })}`,
    boxShadowHover: `inset 0 0 0 1px ${n}`,
    boxShadowDisabled: `inset 0 0 0 1px ${t}`,
    color: o,
    colorDisabled: i,
    colorActive: "#0000",
    textColor: l,
    textColorDisabled: r,
    dotColorActive: n,
    dotColorDisabled: t,
    buttonBorderColor: t,
    buttonBorderColorActive: n,
    buttonBorderColorHover: t,
    buttonColor: o,
    buttonColorActive: o,
    buttonTextColor: l,
    buttonTextColorActive: n,
    buttonTextColorHover: n,
    opacityDisabled: a,
    buttonBoxShadowFocus: `inset 0 0 0 1px ${n}, 0 0 0 2px ${Ee(n, {
      alpha: 0.3
    })}`,
    buttonBoxShadowHover: "inset 0 0 0 1px #0000",
    buttonBoxShadow: "inset 0 0 0 1px #0000",
    buttonBorderRadius: s
  });
}
const Ld = {
  name: "Radio",
  common: mt,
  self: nT
}, oT = {
  thPaddingSmall: "8px",
  thPaddingMedium: "12px",
  thPaddingLarge: "12px",
  tdPaddingSmall: "8px",
  tdPaddingMedium: "12px",
  tdPaddingLarge: "12px",
  sorterSize: "15px",
  resizableContainerSize: "8px",
  resizableSize: "2px",
  filterSize: "15px",
  paginationMargin: "12px 0 0 0",
  emptyPadding: "48px 0",
  actionPadding: "8px 12px",
  actionButtonMargin: "0 8px 0 0"
};
function rT(e) {
  const {
    cardColor: t,
    modalColor: n,
    popoverColor: o,
    textColor2: r,
    textColor1: i,
    tableHeaderColor: l,
    tableColorHover: a,
    iconColor: s,
    primaryColor: d,
    fontWeightStrong: c,
    borderRadius: h,
    lineHeight: p,
    fontSizeSmall: g,
    fontSizeMedium: f,
    fontSizeLarge: v,
    dividerColor: m,
    heightSmall: u,
    opacityDisabled: w,
    tableColorStriped: x
  } = e;
  return Object.assign(Object.assign({}, oT), {
    actionDividerColor: m,
    lineHeight: p,
    borderRadius: h,
    fontSizeSmall: g,
    fontSizeMedium: f,
    fontSizeLarge: v,
    borderColor: Ke(t, m),
    tdColorHover: Ke(t, a),
    tdColorSorting: Ke(t, a),
    tdColorStriped: Ke(t, x),
    thColor: Ke(t, l),
    thColorHover: Ke(Ke(t, l), a),
    thColorSorting: Ke(Ke(t, l), a),
    tdColor: t,
    tdTextColor: r,
    thTextColor: i,
    thFontWeight: c,
    thButtonColorHover: a,
    thIconColor: s,
    thIconColorActive: d,
    // modal
    borderColorModal: Ke(n, m),
    tdColorHoverModal: Ke(n, a),
    tdColorSortingModal: Ke(n, a),
    tdColorStripedModal: Ke(n, x),
    thColorModal: Ke(n, l),
    thColorHoverModal: Ke(Ke(n, l), a),
    thColorSortingModal: Ke(Ke(n, l), a),
    tdColorModal: n,
    // popover
    borderColorPopover: Ke(o, m),
    tdColorHoverPopover: Ke(o, a),
    tdColorSortingPopover: Ke(o, a),
    tdColorStripedPopover: Ke(o, x),
    thColorPopover: Ke(o, l),
    thColorHoverPopover: Ke(Ke(o, l), a),
    thColorSortingPopover: Ke(Ke(o, l), a),
    tdColorPopover: o,
    boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
    boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
    // loading
    loadingColor: d,
    loadingSize: u,
    opacityLoading: w
  });
}
const iT = {
  name: "DataTable",
  common: mt,
  peers: {
    Button: Id,
    Checkbox: xv,
    Radio: Ld,
    Pagination: Rv,
    Scrollbar: gi,
    Empty: zd,
    Popover: wr,
    Ellipsis: Tv,
    Dropdown: Pv
  },
  self: rT
}, aT = Object.assign(Object.assign({}, ke.props), {
  onUnstableColumnResize: Function,
  pagination: {
    type: [Object, Boolean],
    default: !1
  },
  paginateSinglePage: {
    type: Boolean,
    default: !0
  },
  minHeight: [Number, String],
  maxHeight: [Number, String],
  // Use any type as row data to make prop data acceptable
  columns: {
    type: Array,
    default: () => []
  },
  rowClassName: [String, Function],
  rowProps: Function,
  rowKey: Function,
  summary: [Function],
  data: {
    type: Array,
    default: () => []
  },
  loading: Boolean,
  bordered: {
    type: Boolean,
    default: void 0
  },
  bottomBordered: {
    type: Boolean,
    default: void 0
  },
  striped: Boolean,
  scrollX: [Number, String],
  defaultCheckedRowKeys: {
    type: Array,
    default: () => []
  },
  checkedRowKeys: Array,
  singleLine: {
    type: Boolean,
    default: !0
  },
  singleColumn: Boolean,
  size: {
    type: String,
    default: "medium"
  },
  remote: Boolean,
  defaultExpandedRowKeys: {
    type: Array,
    default: []
  },
  defaultExpandAll: Boolean,
  expandedRowKeys: Array,
  stickyExpandedRows: Boolean,
  virtualScroll: Boolean,
  virtualScrollX: Boolean,
  virtualScrollHeader: Boolean,
  headerHeight: {
    type: Number,
    default: 28
  },
  heightForRow: Function,
  minRowHeight: {
    type: Number,
    default: 28
  },
  tableLayout: {
    type: String,
    default: "auto"
  },
  allowCheckingNotLoaded: Boolean,
  cascade: {
    type: Boolean,
    default: !0
  },
  childrenKey: {
    type: String,
    default: "children"
  },
  indent: {
    type: Number,
    default: 16
  },
  flexHeight: Boolean,
  summaryPlacement: {
    type: String,
    default: "bottom"
  },
  paginationBehaviorOnFilter: {
    type: String,
    default: "current"
  },
  filterIconPopoverProps: Object,
  scrollbarProps: Object,
  renderCell: Function,
  renderExpandIcon: Function,
  spinProps: {
    type: Object,
    default: {}
  },
  getCsvCell: Function,
  getCsvHeader: Function,
  onLoad: Function,
  "onUpdate:page": [Function, Array],
  onUpdatePage: [Function, Array],
  "onUpdate:pageSize": [Function, Array],
  onUpdatePageSize: [Function, Array],
  "onUpdate:sorter": [Function, Array],
  onUpdateSorter: [Function, Array],
  "onUpdate:filters": [Function, Array],
  onUpdateFilters: [Function, Array],
  "onUpdate:checkedRowKeys": [Function, Array],
  onUpdateCheckedRowKeys: [Function, Array],
  "onUpdate:expandedRowKeys": [Function, Array],
  onUpdateExpandedRowKeys: [Function, Array],
  onScroll: Function,
  // deprecated
  onPageChange: [Function, Array],
  onPageSizeChange: [Function, Array],
  onSorterChange: [Function, Array],
  onFiltersChange: [Function, Array],
  onCheckedRowKeysChange: [Function, Array]
}), yn = "n-data-table", Fv = 40, Ev = 40;
function wf(e) {
  if (e.type === "selection")
    return e.width === void 0 ? Fv : Rt(e.width);
  if (e.type === "expand")
    return e.width === void 0 ? Ev : Rt(e.width);
  if (!("children" in e))
    return typeof e.width == "string" ? Rt(e.width) : e.width;
}
function lT(e) {
  var t, n;
  if (e.type === "selection")
    return ft((t = e.width) !== null && t !== void 0 ? t : Fv);
  if (e.type === "expand")
    return ft((n = e.width) !== null && n !== void 0 ? n : Ev);
  if (!("children" in e))
    return ft(e.width);
}
function gn(e) {
  return e.type === "selection" ? "__n_selection__" : e.type === "expand" ? "__n_expand__" : e.key;
}
function yf(e) {
  return e && (typeof e == "object" ? Object.assign({}, e) : e);
}
function sT(e) {
  return e === "ascend" ? 1 : e === "descend" ? -1 : 0;
}
function dT(e, t, n) {
  return n !== void 0 && (e = Math.min(e, typeof n == "number" ? n : Number.parseFloat(n))), t !== void 0 && (e = Math.max(e, typeof t == "number" ? t : Number.parseFloat(t))), e;
}
function cT(e, t) {
  if (t !== void 0)
    return {
      width: t,
      minWidth: t,
      maxWidth: t
    };
  const n = lT(e), {
    minWidth: o,
    maxWidth: r
  } = e;
  return {
    width: n,
    minWidth: ft(o) || n,
    maxWidth: ft(r)
  };
}
function uT(e, t, n) {
  return typeof n == "function" ? n(e, t) : n || "";
}
function Xl(e) {
  return e.filterOptionValues !== void 0 || e.filterOptionValue === void 0 && e.defaultFilterOptionValues !== void 0;
}
function Yl(e) {
  return "children" in e ? !1 : !!e.sorter;
}
function zv(e) {
  return "children" in e && e.children.length ? !1 : !!e.resizable;
}
function xf(e) {
  return "children" in e ? !1 : !!e.filter && (!!e.filterOptions || !!e.renderFilterMenu);
}
function Cf(e) {
  if (e) {
    if (e === "descend") return "ascend";
  } else return "descend";
  return !1;
}
function fT(e, t) {
  if (e.sorter === void 0) return null;
  const {
    customNextSortOrder: n
  } = e;
  return t === null || t.columnKey !== e.key ? {
    columnKey: e.key,
    sorter: e.sorter,
    order: Cf(!1)
  } : Object.assign(Object.assign({}, t), {
    order: (n || Cf)(t.order)
  });
}
function Ov(e, t) {
  return t.find((n) => n.columnKey === e.key && n.order) !== void 0;
}
function hT(e) {
  return typeof e == "string" ? e.replace(/,/g, "\\,") : e == null ? "" : `${e}`.replace(/,/g, "\\,");
}
function pT(e, t, n, o) {
  const r = e.filter((a) => a.type !== "expand" && a.type !== "selection" && a.allowExport !== !1), i = r.map((a) => o ? o(a) : a.title).join(","), l = t.map((a) => r.map((s) => n ? n(a[s.key], a, s) : hT(a[s.key])).join(","));
  return [i, ...l].join(`
`);
}
const vT = window.Vue.defineComponent, gT = window.Vue.h, mT = window.Vue.inject, bT = vT({
  name: "DataTableBodyCheckbox",
  props: {
    rowKey: {
      type: [String, Number],
      required: !0
    },
    disabled: {
      type: Boolean,
      required: !0
    },
    onUpdateChecked: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const {
      mergedCheckedRowKeySetRef: t,
      mergedInderminateRowKeySetRef: n
    } = mT(yn);
    return () => {
      const {
        rowKey: o
      } = e;
      return gT(Ad, {
        privateInsideTable: !0,
        disabled: e.disabled,
        indeterminate: n.value.has(o),
        checked: t.value.has(o),
        onUpdateChecked: e.onUpdateChecked
      });
    };
  }
}), wT = z("radio", `
 line-height: var(--n-label-line-height);
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 align-items: flex-start;
 flex-wrap: nowrap;
 font-size: var(--n-font-size);
 word-break: break-word;
`, [U("checked", [B("dot", `
 background-color: var(--n-color-active);
 `)]), B("dot-wrapper", `
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `), z("radio-input", `
 position: absolute;
 border: 0;
 width: 0;
 height: 0;
 opacity: 0;
 margin: 0;
 `), B("dot", `
 position: absolute;
 top: 50%;
 left: 0;
 transform: translateY(-50%);
 height: var(--n-radio-size);
 width: var(--n-radio-size);
 background: var(--n-color);
 box-shadow: var(--n-box-shadow);
 border-radius: 50%;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `, [H("&::before", `
 content: "";
 opacity: 0;
 position: absolute;
 left: 4px;
 top: 4px;
 height: calc(100% - 8px);
 width: calc(100% - 8px);
 border-radius: 50%;
 transform: scale(.8);
 background: var(--n-dot-color-active);
 transition: 
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `), U("checked", {
  boxShadow: "var(--n-box-shadow-active)"
}, [H("&::before", `
 opacity: 1;
 transform: scale(1);
 `)])]), B("label", `
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `), tt("disabled", `
 cursor: pointer;
 `, [H("&:hover", [B("dot", {
  boxShadow: "var(--n-box-shadow-hover)"
})]), U("focus", [H("&:not(:active)", [B("dot", {
  boxShadow: "var(--n-box-shadow-focus)"
})])])]), U("disabled", `
 cursor: not-allowed;
 `, [B("dot", {
  boxShadow: "var(--n-box-shadow-disabled)",
  backgroundColor: "var(--n-color-disabled)"
}, [H("&::before", {
  backgroundColor: "var(--n-dot-color-disabled)"
}), U("checked", `
 opacity: 1;
 `)]), B("label", {
  color: "var(--n-text-color-disabled)"
}), z("radio-input", `
 cursor: not-allowed;
 `)])]), yT = window.Vue.inject, Qi = window.Vue.ref, xT = window.Vue.toRef;
window.Vue.watchEffect;
const CT = {
  name: String,
  value: {
    type: [String, Number, Boolean],
    default: "on"
  },
  checked: {
    type: Boolean,
    default: void 0
  },
  defaultChecked: Boolean,
  disabled: {
    type: Boolean,
    default: void 0
  },
  label: String,
  size: String,
  onUpdateChecked: [Function, Array],
  "onUpdate:checked": [Function, Array],
  // deprecated
  checkedValue: {
    type: Boolean,
    default: void 0
  }
}, Mv = "n-radio-group";
function ST(e) {
  const t = yT(Mv, null), n = qn(e, {
    mergedSize(w) {
      const {
        size: x
      } = e;
      if (x !== void 0) return x;
      if (t) {
        const {
          mergedSizeRef: {
            value: b
          }
        } = t;
        if (b !== void 0)
          return b;
      }
      return w ? w.mergedSize.value : "medium";
    },
    mergedDisabled(w) {
      return !!(e.disabled || t != null && t.disabledRef.value || w != null && w.disabled.value);
    }
  }), {
    mergedSizeRef: o,
    mergedDisabledRef: r
  } = n, i = Qi(null), l = Qi(null), a = Qi(e.defaultChecked), s = xT(e, "checked"), d = It(s, a), c = Me(() => t ? t.valueRef.value === e.value : d.value), h = Me(() => {
    const {
      name: w
    } = e;
    if (w !== void 0) return w;
    if (t) return t.nameRef.value;
  }), p = Qi(!1);
  function g() {
    if (t) {
      const {
        doUpdateValue: w
      } = t, {
        value: x
      } = e;
      ie(w, x);
    } else {
      const {
        onUpdateChecked: w,
        "onUpdate:checked": x
      } = e, {
        nTriggerFormInput: b,
        nTriggerFormChange: C
      } = n;
      w && ie(w, !0), x && ie(x, !0), b(), C(), a.value = !0;
    }
  }
  function f() {
    r.value || c.value || g();
  }
  function v() {
    f(), i.value && (i.value.checked = c.value);
  }
  function m() {
    p.value = !1;
  }
  function u() {
    p.value = !0;
  }
  return {
    mergedClsPrefix: t ? t.mergedClsPrefixRef : je(e).mergedClsPrefixRef,
    inputRef: i,
    labelRef: l,
    mergedName: h,
    mergedDisabled: r,
    renderSafeChecked: c,
    focus: p,
    mergedSize: o,
    handleRadioInputChange: v,
    handleRadioInputBlur: m,
    handleRadioInputFocus: u
  };
}
const Sf = window.Vue.computed, $T = window.Vue.defineComponent, Ar = window.Vue.h, RT = Object.assign(Object.assign({}, ke.props), CT), Iv = $T({
  name: "Radio",
  props: RT,
  setup(e) {
    const t = ST(e), n = ke("Radio", "-radio", wT, Ld, e, t.mergedClsPrefix), o = Sf(() => {
      const {
        mergedSize: {
          value: d
        }
      } = t, {
        common: {
          cubicBezierEaseInOut: c
        },
        self: {
          boxShadow: h,
          boxShadowActive: p,
          boxShadowDisabled: g,
          boxShadowFocus: f,
          boxShadowHover: v,
          color: m,
          colorDisabled: u,
          colorActive: w,
          textColor: x,
          textColorDisabled: b,
          dotColorActive: C,
          dotColorDisabled: S,
          labelPadding: y,
          labelLineHeight: T,
          labelFontWeight: R,
          [oe("fontSize", d)]: E,
          [oe("radioSize", d)]: W
        }
      } = n.value;
      return {
        "--n-bezier": c,
        "--n-label-line-height": T,
        "--n-label-font-weight": R,
        "--n-box-shadow": h,
        "--n-box-shadow-active": p,
        "--n-box-shadow-disabled": g,
        "--n-box-shadow-focus": f,
        "--n-box-shadow-hover": v,
        "--n-color": m,
        "--n-color-active": w,
        "--n-color-disabled": u,
        "--n-dot-color-active": C,
        "--n-dot-color-disabled": S,
        "--n-font-size": E,
        "--n-radio-size": W,
        "--n-text-color": x,
        "--n-text-color-disabled": b,
        "--n-label-padding": y
      };
    }), {
      inlineThemeDisabled: r,
      mergedClsPrefixRef: i,
      mergedRtlRef: l
    } = je(e), a = At("Radio", l, i), s = r ? St("radio", Sf(() => t.mergedSize.value[0]), o, e) : void 0;
    return Object.assign(t, {
      rtlEnabled: a,
      cssVars: r ? void 0 : o,
      themeClass: s == null ? void 0 : s.themeClass,
      onRender: s == null ? void 0 : s.onRender
    });
  },
  render() {
    const {
      $slots: e,
      mergedClsPrefix: t,
      onRender: n,
      label: o
    } = this;
    return n == null || n(), Ar("label", {
      class: [`${t}-radio`, this.themeClass, this.rtlEnabled && `${t}-radio--rtl`, this.mergedDisabled && `${t}-radio--disabled`, this.renderSafeChecked && `${t}-radio--checked`, this.focus && `${t}-radio--focus`],
      style: this.cssVars
    }, Ar("div", {
      class: `${t}-radio__dot-wrapper`
    }, " ", Ar("div", {
      class: [`${t}-radio__dot`, this.renderSafeChecked && `${t}-radio__dot--checked`]
    }), Ar("input", {
      ref: "inputRef",
      type: "radio",
      class: `${t}-radio-input`,
      value: this.value,
      name: this.mergedName,
      checked: this.renderSafeChecked,
      disabled: this.mergedDisabled,
      onChange: this.handleRadioInputChange,
      onFocus: this.handleRadioInputFocus,
      onBlur: this.handleRadioInputBlur
    })), qe(e.default, (r) => !r && !o ? null : Ar("div", {
      ref: "labelRef",
      class: `${t}-radio__label`
    }, r || o)));
  }
}), kT = z("radio-group", `
 display: inline-block;
 font-size: var(--n-font-size);
`, [B("splitor", `
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `, [U("checked", {
  backgroundColor: "var(--n-button-border-color-active)"
}), U("disabled", {
  opacity: "var(--n-opacity-disabled)"
})]), U("button-group", `
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [z("radio-button", {
  height: "var(--n-height)",
  lineHeight: "var(--n-height)"
}), B("splitor", {
  height: "var(--n-height)"
})]), z("radio-button", `
 vertical-align: bottom;
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-block;
 box-sizing: border-box;
 padding-left: 14px;
 padding-right: 14px;
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background: var(--n-button-color);
 color: var(--n-button-text-color);
 border-top: 1px solid var(--n-button-border-color);
 border-bottom: 1px solid var(--n-button-border-color);
 `, [z("radio-input", `
 pointer-events: none;
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 `), B("state-border", `
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `), H("&:first-child", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `, [B("state-border", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]), H("&:last-child", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `, [B("state-border", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]), tt("disabled", `
 cursor: pointer;
 `, [H("&:hover", [B("state-border", `
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `), tt("checked", {
  color: "var(--n-button-text-color-hover)"
})]), U("focus", [H("&:not(:active)", [B("state-border", {
  boxShadow: "var(--n-button-box-shadow-focus)"
})])])]), U("checked", `
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `), U("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]), $f = window.Vue.computed, PT = window.Vue.defineComponent, Av = window.Vue.h, _T = window.Vue.provide, Rf = window.Vue.ref, kf = window.Vue.toRef;
function TT(e, t, n) {
  var o;
  const r = [];
  let i = !1;
  for (let l = 0; l < e.length; ++l) {
    const a = e[l], s = (o = a.type) === null || o === void 0 ? void 0 : o.name;
    s === "RadioButton" && (i = !0);
    const d = a.props;
    if (s !== "RadioButton") {
      r.push(a);
      continue;
    }
    if (l === 0)
      r.push(a);
    else {
      const c = r[r.length - 1].props, h = t === c.value, p = c.disabled, g = t === d.value, f = d.disabled, v = (h ? 2 : 0) + (p ? 0 : 1), m = (g ? 2 : 0) + (f ? 0 : 1), u = {
        [`${n}-radio-group__splitor--disabled`]: p,
        [`${n}-radio-group__splitor--checked`]: h
      }, w = {
        [`${n}-radio-group__splitor--disabled`]: f,
        [`${n}-radio-group__splitor--checked`]: g
      }, x = v < m ? w : u;
      r.push(Av("div", {
        class: [`${n}-radio-group__splitor`, x]
      }), a);
    }
  }
  return {
    children: r,
    isButtonGroup: i
  };
}
const FT = Object.assign(Object.assign({}, ke.props), {
  name: String,
  value: [String, Number, Boolean],
  defaultValue: {
    type: [String, Number, Boolean],
    default: null
  },
  size: String,
  disabled: {
    type: Boolean,
    default: void 0
  },
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array]
}), ET = PT({
  name: "RadioGroup",
  props: FT,
  setup(e) {
    const t = Rf(null), {
      mergedSizeRef: n,
      mergedDisabledRef: o,
      nTriggerFormChange: r,
      nTriggerFormInput: i,
      nTriggerFormBlur: l,
      nTriggerFormFocus: a
    } = qn(e), {
      mergedClsPrefixRef: s,
      inlineThemeDisabled: d,
      mergedRtlRef: c
    } = je(e), h = ke("Radio", "-radio-group", kT, Ld, e, s), p = Rf(e.defaultValue), g = kf(e, "value"), f = It(g, p);
    function v(C) {
      const {
        onUpdateValue: S,
        "onUpdate:value": y
      } = e;
      S && ie(S, C), y && ie(y, C), p.value = C, r(), i();
    }
    function m(C) {
      const {
        value: S
      } = t;
      S && (S.contains(C.relatedTarget) || a());
    }
    function u(C) {
      const {
        value: S
      } = t;
      S && (S.contains(C.relatedTarget) || l());
    }
    _T(Mv, {
      mergedClsPrefixRef: s,
      nameRef: kf(e, "name"),
      valueRef: f,
      disabledRef: o,
      mergedSizeRef: n,
      doUpdateValue: v
    });
    const w = At("Radio", c, s), x = $f(() => {
      const {
        value: C
      } = n, {
        common: {
          cubicBezierEaseInOut: S
        },
        self: {
          buttonBorderColor: y,
          buttonBorderColorActive: T,
          buttonBorderRadius: R,
          buttonBoxShadow: E,
          buttonBoxShadowFocus: W,
          buttonBoxShadowHover: _,
          buttonColor: M,
          buttonColorActive: I,
          buttonTextColor: O,
          buttonTextColorActive: K,
          buttonTextColorHover: L,
          opacityDisabled: Y,
          [oe("buttonHeight", C)]: Q,
          [oe("fontSize", C)]: J
        }
      } = h.value;
      return {
        "--n-font-size": J,
        "--n-bezier": S,
        "--n-button-border-color": y,
        "--n-button-border-color-active": T,
        "--n-button-border-radius": R,
        "--n-button-box-shadow": E,
        "--n-button-box-shadow-focus": W,
        "--n-button-box-shadow-hover": _,
        "--n-button-color": M,
        "--n-button-color-active": I,
        "--n-button-text-color": O,
        "--n-button-text-color-hover": L,
        "--n-button-text-color-active": K,
        "--n-height": Q,
        "--n-opacity-disabled": Y
      };
    }), b = d ? St("radio-group", $f(() => n.value[0]), x, e) : void 0;
    return {
      selfElRef: t,
      rtlEnabled: w,
      mergedClsPrefix: s,
      mergedValue: f,
      handleFocusout: u,
      handleFocusin: m,
      cssVars: d ? void 0 : x,
      themeClass: b == null ? void 0 : b.themeClass,
      onRender: b == null ? void 0 : b.onRender
    };
  },
  render() {
    var e;
    const {
      mergedValue: t,
      mergedClsPrefix: n,
      handleFocusin: o,
      handleFocusout: r
    } = this, {
      children: i,
      isButtonGroup: l
    } = TT(dr(bd(this)), t, n);
    return (e = this.onRender) === null || e === void 0 || e.call(this), Av("div", {
      onFocusin: o,
      onFocusout: r,
      ref: "selfElRef",
      class: [`${n}-radio-group`, this.rtlEnabled && `${n}-radio-group--rtl`, this.themeClass, l && `${n}-radio-group--button-group`],
      style: this.cssVars
    }, i);
  }
}), zT = window.Vue.defineComponent, OT = window.Vue.h, MT = window.Vue.inject, IT = zT({
  name: "DataTableBodyRadio",
  props: {
    rowKey: {
      type: [String, Number],
      required: !0
    },
    disabled: {
      type: Boolean,
      required: !0
    },
    onUpdateChecked: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const {
      mergedCheckedRowKeySetRef: t,
      componentId: n
    } = MT(yn);
    return () => {
      const {
        rowKey: o
      } = e;
      return OT(Iv, {
        name: n,
        disabled: e.disabled,
        checked: t.value.has(o),
        onUpdateChecked: e.onUpdateChecked
      });
    };
  }
}), AT = window.Vue.computed, VT = window.Vue.defineComponent, BT = window.Vue.h, LT = window.Vue.ref, DT = Object.assign(Object.assign({}, ur), ke.props), NT = VT({
  name: "Tooltip",
  props: DT,
  slots: Object,
  __popover__: !0,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = je(e), n = ke("Tooltip", "-tooltip", void 0, _v, e, t), o = LT(null);
    return Object.assign(Object.assign({}, {
      syncPosition() {
        o.value.syncPosition();
      },
      setShow(i) {
        o.value.setShow(i);
      }
    }), {
      popoverRef: o,
      mergedTheme: n,
      popoverThemeOverrides: AT(() => n.value.self)
    });
  },
  render() {
    const {
      mergedTheme: e,
      internalExtraClass: t
    } = this;
    return BT(bi, Object.assign(Object.assign({}, this.$props), {
      theme: e.peers.Popover,
      themeOverrides: e.peerOverrides.Popover,
      builtinThemeOverrides: this.popoverThemeOverrides,
      internalExtraClass: t.concat("tooltip"),
      ref: "popoverRef"
    }), this.$slots);
  }
}), Vv = z("ellipsis", {
  overflow: "hidden"
}, [tt("line-clamp", `
 white-space: nowrap;
 display: inline-block;
 vertical-align: bottom;
 max-width: 100%;
 `), U("line-clamp", `
 display: -webkit-inline-box;
 -webkit-box-orient: vertical;
 `), U("cursor-pointer", `
 cursor: pointer;
 `)]), Pf = window.Vue.computed, HT = window.Vue.defineComponent, Zl = window.Vue.h, jT = window.Vue.mergeProps, WT = window.Vue.onDeactivated, ea = window.Vue.ref;
function Ws(e) {
  return `${e}-ellipsis--line-clamp`;
}
function Us(e, t) {
  return `${e}-ellipsis--cursor-${t}`;
}
const Bv = Object.assign(Object.assign({}, ke.props), {
  expandTrigger: String,
  lineClamp: [Number, String],
  tooltip: {
    type: [Boolean, Object],
    default: !0
  }
}), Dd = HT({
  name: "Ellipsis",
  inheritAttrs: !1,
  props: Bv,
  slots: Object,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    const o = $p(), r = ke("Ellipsis", "-ellipsis", Vv, Tv, e, o), i = ea(null), l = ea(null), a = ea(null), s = ea(!1), d = Pf(() => {
      const {
        lineClamp: m
      } = e, {
        value: u
      } = s;
      return m !== void 0 ? {
        textOverflow: "",
        "-webkit-line-clamp": u ? "" : m
      } : {
        textOverflow: u ? "" : "ellipsis",
        "-webkit-line-clamp": ""
      };
    });
    function c() {
      let m = !1;
      const {
        value: u
      } = s;
      if (u) return !0;
      const {
        value: w
      } = i;
      if (w) {
        const {
          lineClamp: x
        } = e;
        if (g(w), x !== void 0)
          m = w.scrollHeight <= w.offsetHeight;
        else {
          const {
            value: b
          } = l;
          b && (m = b.getBoundingClientRect().width <= w.getBoundingClientRect().width);
        }
        f(w, m);
      }
      return m;
    }
    const h = Pf(() => e.expandTrigger === "click" ? () => {
      var m;
      const {
        value: u
      } = s;
      u && ((m = a.value) === null || m === void 0 || m.setShow(!1)), s.value = !u;
    } : void 0);
    WT(() => {
      var m;
      e.tooltip && ((m = a.value) === null || m === void 0 || m.setShow(!1));
    });
    const p = () => Zl("span", Object.assign({}, jT(n, {
      class: [`${o.value}-ellipsis`, e.lineClamp !== void 0 ? Ws(o.value) : void 0, e.expandTrigger === "click" ? Us(o.value, "pointer") : void 0],
      style: d.value
    }), {
      ref: "triggerRef",
      onClick: h.value,
      onMouseenter: (
        // get tooltip disabled will derive cursor style
        e.expandTrigger === "click" ? c : void 0
      )
    }), e.lineClamp ? t : Zl("span", {
      ref: "triggerInnerRef"
    }, t));
    function g(m) {
      if (!m) return;
      const u = d.value, w = Ws(o.value);
      e.lineClamp !== void 0 ? v(m, w, "add") : v(m, w, "remove");
      for (const x in u)
        m.style[x] !== u[x] && (m.style[x] = u[x]);
    }
    function f(m, u) {
      const w = Us(o.value, "pointer");
      e.expandTrigger === "click" && !u ? v(m, w, "add") : v(m, w, "remove");
    }
    function v(m, u, w) {
      w === "add" ? m.classList.contains(u) || m.classList.add(u) : m.classList.contains(u) && m.classList.remove(u);
    }
    return {
      mergedTheme: r,
      triggerRef: i,
      triggerInnerRef: l,
      tooltipRef: a,
      handleClick: h,
      renderTrigger: p,
      getTooltipDisabled: c
    };
  },
  render() {
    var e;
    const {
      tooltip: t,
      renderTrigger: n,
      $slots: o
    } = this;
    if (t) {
      const {
        mergedTheme: r
      } = this;
      return Zl(NT, Object.assign({
        ref: "tooltipRef",
        placement: "top"
      }, t, {
        getDisabled: this.getTooltipDisabled,
        theme: r.peers.Tooltip,
        themeOverrides: r.peerOverrides.Tooltip
      }), {
        trigger: n,
        default: (e = o.tooltip) !== null && e !== void 0 ? e : o.default
      });
    } else
      return n();
  }
}), UT = window.Vue.defineComponent, Jl = window.Vue.h, _f = window.Vue.mergeProps, KT = window.Vue.ref, qT = UT({
  name: "PerformantEllipsis",
  props: Bv,
  inheritAttrs: !1,
  setup(e, {
    attrs: t,
    slots: n
  }) {
    const o = KT(!1), r = $p();
    return Ho("-ellipsis", Vv, r), {
      mouseEntered: o,
      renderTrigger: () => {
        const {
          lineClamp: l
        } = e, a = r.value;
        return Jl("span", Object.assign({}, _f(t, {
          class: [`${a}-ellipsis`, l !== void 0 ? Ws(a) : void 0, e.expandTrigger === "click" ? Us(a, "pointer") : void 0],
          style: l === void 0 ? {
            textOverflow: "ellipsis"
          } : {
            "-webkit-line-clamp": l
          }
        }), {
          onMouseenter: () => {
            o.value = !0;
          }
        }), l ? n : Jl("span", null, n));
      }
    };
  },
  render() {
    return this.mouseEntered ? Jl(Dd, _f({}, this.$attrs, this.$props), this.$slots) : this.renderTrigger();
  }
}), GT = window.Vue.defineComponent, Ql = window.Vue.h, XT = GT({
  name: "DataTableCell",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    },
    row: {
      type: Object,
      required: !0
    },
    index: {
      type: Number,
      required: !0
    },
    column: {
      type: Object,
      required: !0
    },
    isSummary: Boolean,
    mergedTheme: {
      type: Object,
      required: !0
    },
    renderCell: Function
  },
  render() {
    var e;
    const {
      isSummary: t,
      column: n,
      row: o,
      renderCell: r
    } = this;
    let i;
    const {
      render: l,
      key: a,
      ellipsis: s
    } = n;
    if (l && !t ? i = l(o, this.index) : t ? i = (e = o[a]) === null || e === void 0 ? void 0 : e.value : i = r ? r(fi(o, a), o, n) : fi(o, a), s)
      if (typeof s == "object") {
        const {
          mergedTheme: d
        } = this;
        return n.ellipsisComponent === "performant-ellipsis" ? Ql(qT, Object.assign({}, s, {
          theme: d.peers.Ellipsis,
          themeOverrides: d.peerOverrides.Ellipsis
        }), {
          default: () => i
        }) : Ql(Dd, Object.assign({}, s, {
          theme: d.peers.Ellipsis,
          themeOverrides: d.peerOverrides.Ellipsis
        }), {
          default: () => i
        });
      } else
        return Ql("span", {
          class: `${this.clsPrefix}-data-table-td__ellipsis`
        }, i);
    return i;
  }
}), YT = window.Vue.defineComponent, Vr = window.Vue.h, Tf = YT({
  name: "DataTableExpandTrigger",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    },
    expanded: Boolean,
    loading: Boolean,
    onClick: {
      type: Function,
      required: !0
    },
    renderExpandIcon: {
      type: Function
    },
    rowData: {
      type: Object,
      required: !0
    }
  },
  render() {
    const {
      clsPrefix: e
    } = this;
    return Vr("div", {
      class: [`${e}-data-table-expand-trigger`, this.expanded && `${e}-data-table-expand-trigger--expanded`],
      onClick: this.onClick,
      onMousedown: (t) => {
        t.preventDefault();
      }
    }, Vr(gr, null, {
      default: () => this.loading ? Vr(br, {
        key: "loading",
        clsPrefix: this.clsPrefix,
        radius: 85,
        strokeWidth: 15,
        scale: 0.88
      }) : this.renderExpandIcon ? this.renderExpandIcon({
        expanded: this.expanded,
        rowData: this.rowData
      }) : Vr(Ct, {
        clsPrefix: e,
        key: "base-icon"
      }, {
        default: () => Vr(tv, null)
      })
    }));
  }
}), Ff = window.Vue.computed, ZT = window.Vue.defineComponent, Hn = window.Vue.h, JT = window.Vue.inject, QT = window.Vue.ref, e5 = ZT({
  name: "DataTableFilterMenu",
  props: {
    column: {
      type: Object,
      required: !0
    },
    radioGroupName: {
      type: String,
      required: !0
    },
    multiple: {
      type: Boolean,
      required: !0
    },
    value: {
      type: [Array, String, Number],
      default: null
    },
    options: {
      type: Array,
      required: !0
    },
    onConfirm: {
      type: Function,
      required: !0
    },
    onClear: {
      type: Function,
      required: !0
    },
    onChange: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedRtlRef: n
    } = je(e), o = At("DataTable", n, t), {
      mergedClsPrefixRef: r,
      mergedThemeRef: i,
      localeRef: l
    } = JT(yn), a = QT(e.value), s = Ff(() => {
      const {
        value: f
      } = a;
      return Array.isArray(f) ? f : null;
    }), d = Ff(() => {
      const {
        value: f
      } = a;
      return Xl(e.column) ? Array.isArray(f) && f.length && f[0] || null : Array.isArray(f) ? null : f;
    });
    function c(f) {
      e.onChange(f);
    }
    function h(f) {
      e.multiple && Array.isArray(f) ? a.value = f : Xl(e.column) && !Array.isArray(f) ? a.value = [f] : a.value = f;
    }
    function p() {
      c(a.value), e.onConfirm();
    }
    function g() {
      e.multiple || Xl(e.column) ? c([]) : c(null), e.onClear();
    }
    return {
      mergedClsPrefix: r,
      rtlEnabled: o,
      mergedTheme: i,
      locale: l,
      checkboxGroupValue: s,
      radioGroupValue: d,
      handleChange: h,
      handleConfirmClick: p,
      handleClearClick: g
    };
  },
  render() {
    const {
      mergedTheme: e,
      locale: t,
      mergedClsPrefix: n
    } = this;
    return Hn("div", {
      class: [`${n}-data-table-filter-menu`, this.rtlEnabled && `${n}-data-table-filter-menu--rtl`]
    }, Hn(mi, null, {
      default: () => {
        const {
          checkboxGroupValue: o,
          handleChange: r
        } = this;
        return this.multiple ? Hn(h_, {
          value: o,
          class: `${n}-data-table-filter-menu__group`,
          onUpdateValue: r
        }, {
          default: () => this.options.map((i) => Hn(Ad, {
            key: i.value,
            theme: e.peers.Checkbox,
            themeOverrides: e.peerOverrides.Checkbox,
            value: i.value
          }, {
            default: () => i.label
          }))
        }) : Hn(ET, {
          name: this.radioGroupName,
          class: `${n}-data-table-filter-menu__group`,
          value: this.radioGroupValue,
          onUpdateValue: this.handleChange
        }, {
          default: () => this.options.map((i) => Hn(Iv, {
            key: i.value,
            value: i.value,
            theme: e.peers.Radio,
            themeOverrides: e.peerOverrides.Radio
          }, {
            default: () => i.label
          }))
        });
      }
    }), Hn("div", {
      class: `${n}-data-table-filter-menu__action`
    }, Hn(hi, {
      size: "tiny",
      theme: e.peers.Button,
      themeOverrides: e.peerOverrides.Button,
      onClick: this.handleClearClick
    }, {
      default: () => t.clear
    }), Hn(hi, {
      theme: e.peers.Button,
      themeOverrides: e.peerOverrides.Button,
      type: "primary",
      size: "tiny",
      onClick: this.handleConfirmClick
    }, {
      default: () => t.confirm
    })));
  }
}), t5 = window.Vue.defineComponent, n5 = t5({
  name: "DataTableRenderFilter",
  props: {
    render: {
      type: Function,
      required: !0
    },
    active: {
      type: Boolean,
      default: !1
    },
    show: {
      type: Boolean,
      default: !1
    }
  },
  render() {
    const {
      render: e,
      active: t,
      show: n
    } = this;
    return e({
      active: t,
      show: n
    });
  }
}), ta = window.Vue.computed, o5 = window.Vue.defineComponent, Qo = window.Vue.h, r5 = window.Vue.inject, i5 = window.Vue.ref;
function a5(e, t, n) {
  const o = Object.assign({}, e);
  return o[t] = n, o;
}
const l5 = o5({
  name: "DataTableFilterButton",
  props: {
    column: {
      type: Object,
      required: !0
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  setup(e) {
    const {
      mergedComponentPropsRef: t
    } = je(), {
      mergedThemeRef: n,
      mergedClsPrefixRef: o,
      mergedFilterStateRef: r,
      filterMenuCssVarsRef: i,
      paginationBehaviorOnFilterRef: l,
      doUpdatePage: a,
      doUpdateFilters: s,
      filterIconPopoverPropsRef: d
    } = r5(yn), c = i5(!1), h = r, p = ta(() => e.column.filterMultiple !== !1), g = ta(() => {
      const x = h.value[e.column.key];
      if (x === void 0) {
        const {
          value: b
        } = p;
        return b ? [] : null;
      }
      return x;
    }), f = ta(() => {
      const {
        value: x
      } = g;
      return Array.isArray(x) ? x.length > 0 : x !== null;
    }), v = ta(() => {
      var x, b;
      return ((b = (x = t == null ? void 0 : t.value) === null || x === void 0 ? void 0 : x.DataTable) === null || b === void 0 ? void 0 : b.renderFilter) || e.column.renderFilter;
    });
    function m(x) {
      const b = a5(h.value, e.column.key, x);
      s(b, e.column), l.value === "first" && a(1);
    }
    function u() {
      c.value = !1;
    }
    function w() {
      c.value = !1;
    }
    return {
      mergedTheme: n,
      mergedClsPrefix: o,
      active: f,
      showPopover: c,
      mergedRenderFilter: v,
      filterIconPopoverProps: d,
      filterMultiple: p,
      mergedFilterValue: g,
      filterMenuCssVars: i,
      handleFilterChange: m,
      handleFilterMenuConfirm: w,
      handleFilterMenuCancel: u
    };
  },
  render() {
    const {
      mergedTheme: e,
      mergedClsPrefix: t,
      handleFilterMenuCancel: n,
      filterIconPopoverProps: o
    } = this;
    return Qo(bi, Object.assign({
      show: this.showPopover,
      onUpdateShow: (r) => this.showPopover = r,
      trigger: "click",
      theme: e.peers.Popover,
      themeOverrides: e.peerOverrides.Popover,
      placement: "bottom"
    }, o, {
      style: {
        padding: 0
      }
    }), {
      trigger: () => {
        const {
          mergedRenderFilter: r
        } = this;
        if (r)
          return Qo(n5, {
            "data-data-table-filter": !0,
            render: r,
            active: this.active,
            show: this.showPopover
          });
        const {
          renderFilterIcon: i
        } = this.column;
        return Qo("div", {
          "data-data-table-filter": !0,
          class: [`${t}-data-table-filter`, {
            [`${t}-data-table-filter--active`]: this.active,
            [`${t}-data-table-filter--show`]: this.showPopover
          }]
        }, i ? i({
          active: this.active,
          show: this.showPopover
        }) : Qo(Ct, {
          clsPrefix: t
        }, {
          default: () => Qo(QR, null)
        }));
      },
      default: () => {
        const {
          renderFilterMenu: r
        } = this.column;
        return r ? r({
          hide: n
        }) : Qo(e5, {
          style: this.filterMenuCssVars,
          radioGroupName: String(this.column.key),
          multiple: this.filterMultiple,
          value: this.mergedFilterValue,
          options: this.options,
          column: this.column,
          onChange: this.handleFilterChange,
          onClear: this.handleFilterMenuCancel,
          onConfirm: this.handleFilterMenuConfirm
        });
      }
    });
  }
}), s5 = window.Vue.defineComponent, d5 = window.Vue.h, c5 = window.Vue.inject, u5 = window.Vue.onBeforeUnmount, f5 = window.Vue.ref, h5 = s5({
  name: "ColumnResizeButton",
  props: {
    onResizeStart: Function,
    onResize: Function,
    onResizeEnd: Function
  },
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = c5(yn), n = f5(!1);
    let o = 0;
    function r(s) {
      return s.clientX;
    }
    function i(s) {
      var d;
      s.preventDefault();
      const c = n.value;
      o = r(s), n.value = !0, c || (st("mousemove", window, l), st("mouseup", window, a), (d = e.onResizeStart) === null || d === void 0 || d.call(e));
    }
    function l(s) {
      var d;
      (d = e.onResize) === null || d === void 0 || d.call(e, r(s) - o);
    }
    function a() {
      var s;
      n.value = !1, (s = e.onResizeEnd) === null || s === void 0 || s.call(e), et("mousemove", window, l), et("mouseup", window, a);
    }
    return u5(() => {
      et("mousemove", window, l), et("mouseup", window, a);
    }), {
      mergedClsPrefix: t,
      active: n,
      handleMousedown: i
    };
  },
  render() {
    const {
      mergedClsPrefix: e
    } = this;
    return d5("span", {
      "data-data-table-resizable": !0,
      class: [`${e}-data-table-resize-button`, this.active && `${e}-data-table-resize-button--active`],
      onMousedown: this.handleMousedown
    });
  }
}), p5 = window.Vue.defineComponent, v5 = p5({
  name: "DataTableRenderSorter",
  props: {
    render: {
      type: Function,
      required: !0
    },
    order: {
      // asc, desc
      type: [String, Boolean],
      default: !1
    }
  },
  render() {
    const {
      render: e,
      order: t
    } = this;
    return e({
      order: t
    });
  }
}), na = window.Vue.computed, g5 = window.Vue.defineComponent, oa = window.Vue.h, m5 = window.Vue.inject, b5 = g5({
  name: "SortIcon",
  props: {
    column: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    const {
      mergedComponentPropsRef: t
    } = je(), {
      mergedSortStateRef: n,
      mergedClsPrefixRef: o
    } = m5(yn), r = na(() => n.value.find((s) => s.columnKey === e.column.key)), i = na(() => r.value !== void 0), l = na(() => {
      const {
        value: s
      } = r;
      return s && i.value ? s.order : !1;
    }), a = na(() => {
      var s, d;
      return ((d = (s = t == null ? void 0 : t.value) === null || s === void 0 ? void 0 : s.DataTable) === null || d === void 0 ? void 0 : d.renderSorter) || e.column.renderSorter;
    });
    return {
      mergedClsPrefix: o,
      active: i,
      mergedSortOrder: l,
      mergedRenderSorter: a
    };
  },
  render() {
    const {
      mergedRenderSorter: e,
      mergedSortOrder: t,
      mergedClsPrefix: n
    } = this, {
      renderSorterIcon: o
    } = this.column;
    return e ? oa(v5, {
      render: e,
      order: t
    }) : oa("span", {
      class: [`${n}-data-table-sorter`, t === "ascend" && `${n}-data-table-sorter--asc`, t === "descend" && `${n}-data-table-sorter--desc`]
    }, o ? o({
      order: t
    }) : oa(Ct, {
      clsPrefix: n
    }, {
      default: () => oa(MR, null)
    }));
  }
}), Nd = "n-dropdown-menu", Za = "n-dropdown", Ef = "n-dropdown-option", w5 = window.Vue.defineComponent, y5 = window.Vue.h, Lv = w5({
  name: "DropdownDivider",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  render() {
    return y5("div", {
      class: `${this.clsPrefix}-dropdown-divider`
    });
  }
}), x5 = window.Vue.defineComponent, Br = window.Vue.h, zf = window.Vue.inject, C5 = x5({
  name: "DropdownGroupHeader",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    },
    tmNode: {
      type: Object,
      required: !0
    }
  },
  setup() {
    const {
      showIconRef: e,
      hasSubmenuRef: t
    } = zf(Nd), {
      renderLabelRef: n,
      labelFieldRef: o,
      nodePropsRef: r,
      renderOptionRef: i
    } = zf(Za);
    return {
      labelField: o,
      showIcon: e,
      hasSubmenu: t,
      renderLabel: n,
      nodeProps: r,
      renderOption: i
    };
  },
  render() {
    var e;
    const {
      clsPrefix: t,
      hasSubmenu: n,
      showIcon: o,
      nodeProps: r,
      renderLabel: i,
      renderOption: l
    } = this, {
      rawNode: a
    } = this.tmNode, s = Br("div", Object.assign({
      class: `${t}-dropdown-option`
    }, r == null ? void 0 : r(a)), Br("div", {
      class: `${t}-dropdown-option-body ${t}-dropdown-option-body--group`
    }, Br("div", {
      "data-dropdown-option": !0,
      class: [`${t}-dropdown-option-body__prefix`, o && `${t}-dropdown-option-body__prefix--show-icon`]
    }, _n(a.icon)), Br("div", {
      class: `${t}-dropdown-option-body__label`,
      "data-dropdown-option": !0
    }, i ? i(a) : _n((e = a.title) !== null && e !== void 0 ? e : a[this.labelField])), Br("div", {
      class: [`${t}-dropdown-option-body__suffix`, n && `${t}-dropdown-option-body__suffix--has-submenu`],
      "data-dropdown-option": !0
    })));
    return l ? l({
      node: s,
      option: a
    }) : s;
  }
});
function S5(e) {
  const {
    textColorBase: t,
    opacity1: n,
    opacity2: o,
    opacity3: r,
    opacity4: i,
    opacity5: l
  } = e;
  return {
    color: t,
    opacity1Depth: n,
    opacity2Depth: o,
    opacity3Depth: r,
    opacity4Depth: i,
    opacity5Depth: l
  };
}
const $5 = {
  common: mt,
  self: S5
}, R5 = z("icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [U("color-transition", {
  transition: "color .3s var(--n-bezier)"
}), U("depth", {
  color: "var(--n-color)"
}, [H("svg", {
  opacity: "var(--n-opacity)",
  transition: "opacity .3s var(--n-bezier)"
})]), H("svg", {
  height: "1em",
  width: "1em"
})]), es = window.Vue.computed, k5 = window.Vue.defineComponent, Of = window.Vue.h, P5 = window.Vue.mergeProps, _5 = Object.assign(Object.assign({}, ke.props), {
  depth: [String, Number],
  size: [Number, String],
  color: String,
  component: [Object, Function]
}), T5 = k5({
  _n_icon__: !0,
  name: "Icon",
  inheritAttrs: !1,
  props: _5,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = je(e), o = ke("Icon", "-icon", R5, $5, e, t), r = es(() => {
      const {
        depth: l
      } = e, {
        common: {
          cubicBezierEaseInOut: a
        },
        self: s
      } = o.value;
      if (l !== void 0) {
        const {
          color: d,
          [`opacity${l}Depth`]: c
        } = s;
        return {
          "--n-bezier": a,
          "--n-color": d,
          "--n-opacity": c
        };
      }
      return {
        "--n-bezier": a,
        "--n-color": "",
        "--n-opacity": ""
      };
    }), i = n ? St("icon", es(() => `${e.depth || "d"}`), r, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedStyle: es(() => {
        const {
          size: l,
          color: a
        } = e;
        return {
          fontSize: ft(l),
          color: a
        };
      }),
      cssVars: n ? void 0 : r,
      themeClass: i == null ? void 0 : i.themeClass,
      onRender: i == null ? void 0 : i.onRender
    };
  },
  render() {
    var e;
    const {
      $parent: t,
      depth: n,
      mergedClsPrefix: o,
      component: r,
      onRender: i,
      themeClass: l
    } = this;
    return !((e = t == null ? void 0 : t.$options) === null || e === void 0) && e._n_icon__ && ho("icon", "don't wrap `n-icon` inside `n-icon`"), i == null || i(), Of("i", P5(this.$attrs, {
      role: "img",
      class: [`${o}-icon`, l, {
        [`${o}-icon--depth`]: n,
        [`${o}-icon--color-transition`]: n !== void 0
      }],
      style: [this.cssVars, this.mergedStyle]
    }), r ? Of(r) : this.$slots);
  }
});
function Ks(e, t) {
  return e.type === "submenu" || e.type === void 0 && e[t] !== void 0;
}
function F5(e) {
  return e.type === "group";
}
function Dv(e) {
  return e.type === "divider";
}
function E5(e) {
  return e.type === "render";
}
const So = window.Vue.computed, z5 = window.Vue.defineComponent, Xt = window.Vue.h, ra = window.Vue.inject, O5 = window.Vue.mergeProps, M5 = window.Vue.provide, I5 = window.Vue.ref, A5 = window.Vue.Transition, Nv = z5({
  name: "DropdownOption",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    },
    tmNode: {
      type: Object,
      required: !0
    },
    parentKey: {
      type: [String, Number],
      default: null
    },
    placement: {
      type: String,
      default: "right-start"
    },
    props: Object,
    scrollable: Boolean
  },
  setup(e) {
    const t = ra(Za), {
      hoverKeyRef: n,
      keyboardKeyRef: o,
      lastToggledSubmenuKeyRef: r,
      pendingKeyPathRef: i,
      activeKeyPathRef: l,
      animatedRef: a,
      mergedShowRef: s,
      renderLabelRef: d,
      renderIconRef: c,
      labelFieldRef: h,
      childrenFieldRef: p,
      renderOptionRef: g,
      nodePropsRef: f,
      menuPropsRef: v
    } = t, m = ra(Ef, null), u = ra(Nd), w = ra(Ua), x = So(() => e.tmNode.rawNode), b = So(() => {
      const {
        value: L
      } = p;
      return Ks(e.tmNode.rawNode, L);
    }), C = So(() => {
      const {
        disabled: L
      } = e.tmNode;
      return L;
    }), S = So(() => {
      if (!b.value) return !1;
      const {
        key: L,
        disabled: Y
      } = e.tmNode;
      if (Y) return !1;
      const {
        value: Q
      } = n, {
        value: J
      } = o, {
        value: q
      } = r, {
        value: A
      } = i;
      return Q !== null ? A.includes(L) : J !== null ? A.includes(L) && A[A.length - 1] !== L : q !== null ? A.includes(L) : !1;
    }), y = So(() => o.value === null && !a.value), T = Yw(S, 300, y), R = So(() => !!(m != null && m.enteringSubmenuRef.value)), E = I5(!1);
    M5(Ef, {
      enteringSubmenuRef: E
    });
    function W() {
      E.value = !0;
    }
    function _() {
      E.value = !1;
    }
    function M() {
      const {
        parentKey: L,
        tmNode: Y
      } = e;
      Y.disabled || s.value && (r.value = L, o.value = null, n.value = Y.key);
    }
    function I() {
      const {
        tmNode: L
      } = e;
      L.disabled || s.value && n.value !== L.key && M();
    }
    function O(L) {
      if (e.tmNode.disabled || !s.value) return;
      const {
        relatedTarget: Y
      } = L;
      Y && !cn({
        target: Y
      }, "dropdownOption") && !cn({
        target: Y
      }, "scrollbarRail") && (n.value = null);
    }
    function K() {
      const {
        value: L
      } = b, {
        tmNode: Y
      } = e;
      s.value && !L && !Y.disabled && (t.doSelect(Y.key, Y.rawNode), t.doUpdateShow(!1));
    }
    return {
      labelField: h,
      renderLabel: d,
      renderIcon: c,
      siblingHasIcon: u.showIconRef,
      siblingHasSubmenu: u.hasSubmenuRef,
      menuProps: v,
      popoverBody: w,
      animated: a,
      mergedShowSubmenu: So(() => T.value && !R.value),
      rawNode: x,
      hasSubmenu: b,
      pending: Me(() => {
        const {
          value: L
        } = i, {
          key: Y
        } = e.tmNode;
        return L.includes(Y);
      }),
      childActive: Me(() => {
        const {
          value: L
        } = l, {
          key: Y
        } = e.tmNode, Q = L.findIndex((J) => Y === J);
        return Q === -1 ? !1 : Q < L.length - 1;
      }),
      active: Me(() => {
        const {
          value: L
        } = l, {
          key: Y
        } = e.tmNode, Q = L.findIndex((J) => Y === J);
        return Q === -1 ? !1 : Q === L.length - 1;
      }),
      mergedDisabled: C,
      renderOption: g,
      nodeProps: f,
      handleClick: K,
      handleMouseMove: I,
      handleMouseEnter: M,
      handleMouseLeave: O,
      handleSubmenuBeforeEnter: W,
      handleSubmenuAfterEnter: _
    };
  },
  render() {
    var e, t;
    const {
      animated: n,
      rawNode: o,
      mergedShowSubmenu: r,
      clsPrefix: i,
      siblingHasIcon: l,
      siblingHasSubmenu: a,
      renderLabel: s,
      renderIcon: d,
      renderOption: c,
      nodeProps: h,
      props: p,
      scrollable: g
    } = this;
    let f = null;
    if (r) {
      const w = (e = this.menuProps) === null || e === void 0 ? void 0 : e.call(this, o, o.children);
      f = Xt(Hv, Object.assign({}, w, {
        clsPrefix: i,
        scrollable: this.scrollable,
        tmNodes: this.tmNode.children,
        parentKey: this.tmNode.key
      }));
    }
    const v = {
      class: [`${i}-dropdown-option-body`, this.pending && `${i}-dropdown-option-body--pending`, this.active && `${i}-dropdown-option-body--active`, this.childActive && `${i}-dropdown-option-body--child-active`, this.mergedDisabled && `${i}-dropdown-option-body--disabled`],
      onMousemove: this.handleMouseMove,
      onMouseenter: this.handleMouseEnter,
      onMouseleave: this.handleMouseLeave,
      onClick: this.handleClick
    }, m = h == null ? void 0 : h(o), u = Xt("div", Object.assign({
      class: [`${i}-dropdown-option`, m == null ? void 0 : m.class],
      "data-dropdown-option": !0
    }, m), Xt("div", O5(v, p), [Xt("div", {
      class: [`${i}-dropdown-option-body__prefix`, l && `${i}-dropdown-option-body__prefix--show-icon`]
    }, [d ? d(o) : _n(o.icon)]), Xt("div", {
      "data-dropdown-option": !0,
      class: `${i}-dropdown-option-body__label`
    }, s ? s(o) : _n((t = o[this.labelField]) !== null && t !== void 0 ? t : o.title)), Xt("div", {
      "data-dropdown-option": !0,
      class: [`${i}-dropdown-option-body__suffix`, a && `${i}-dropdown-option-body__suffix--has-submenu`]
    }, this.hasSubmenu ? Xt(T5, null, {
      default: () => Xt(tv, null)
    }) : null)]), this.hasSubmenu ? Xt(fd, null, {
      default: () => [Xt(hd, null, {
        default: () => Xt("div", {
          class: `${i}-dropdown-offset-container`
        }, Xt(vd, {
          show: this.mergedShowSubmenu,
          placement: this.placement,
          to: g && this.popoverBody || void 0,
          teleportDisabled: !g
        }, {
          default: () => Xt("div", {
            class: `${i}-dropdown-menu-wrapper`
          }, n ? Xt(A5, {
            onBeforeEnter: this.handleSubmenuBeforeEnter,
            onAfterEnter: this.handleSubmenuAfterEnter,
            name: "fade-in-scale-up-transition",
            appear: !0
          }, {
            default: () => f
          }) : f)
        }))
      })]
    }) : null);
    return c ? c({
      node: u,
      option: o
    }) : u;
  }
}), V5 = window.Vue.defineComponent, B5 = window.Vue.Fragment, ia = window.Vue.h, L5 = V5({
  name: "NDropdownGroup",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    },
    tmNode: {
      type: Object,
      required: !0
    },
    parentKey: {
      type: [String, Number],
      default: null
    }
  },
  render() {
    const {
      tmNode: e,
      parentKey: t,
      clsPrefix: n
    } = this, {
      children: o
    } = e;
    return ia(B5, null, ia(C5, {
      clsPrefix: n,
      tmNode: e,
      key: e.key
    }), o == null ? void 0 : o.map((r) => {
      const {
        rawNode: i
      } = r;
      return i.show === !1 ? null : Dv(i) ? ia(Lv, {
        clsPrefix: n,
        key: r.key
      }) : r.isGroup ? (ho("dropdown", "`group` node is not allowed to be put in `group` node."), null) : ia(Nv, {
        clsPrefix: n,
        tmNode: r,
        parentKey: t,
        key: r.key
      });
    }));
  }
}), D5 = window.Vue.defineComponent, N5 = window.Vue.h, H5 = D5({
  name: "DropdownRenderOption",
  props: {
    tmNode: {
      type: Object,
      required: !0
    }
  },
  render() {
    const {
      rawNode: {
        render: e,
        props: t
      }
    } = this.tmNode;
    return N5("div", t, [e == null ? void 0 : e()]);
  }
}), Mf = window.Vue.computed, j5 = window.Vue.defineComponent, er = window.Vue.h, W5 = window.Vue.inject, aa = window.Vue.provide, U5 = window.Vue.ref, Hv = j5({
  name: "DropdownMenu",
  props: {
    scrollable: Boolean,
    showArrow: Boolean,
    arrowStyle: [String, Object],
    clsPrefix: {
      type: String,
      required: !0
    },
    tmNodes: {
      type: Array,
      default: () => []
    },
    parentKey: {
      type: [String, Number],
      default: null
    }
  },
  setup(e) {
    const {
      renderIconRef: t,
      childrenFieldRef: n
    } = W5(Za);
    aa(Nd, {
      showIconRef: Mf(() => {
        const r = t.value;
        return e.tmNodes.some((i) => {
          var l;
          if (i.isGroup)
            return (l = i.children) === null || l === void 0 ? void 0 : l.some(({
              rawNode: s
            }) => r ? r(s) : s.icon);
          const {
            rawNode: a
          } = i;
          return r ? r(a) : a.icon;
        });
      }),
      hasSubmenuRef: Mf(() => {
        const {
          value: r
        } = n;
        return e.tmNodes.some((i) => {
          var l;
          if (i.isGroup)
            return (l = i.children) === null || l === void 0 ? void 0 : l.some(({
              rawNode: s
            }) => Ks(s, r));
          const {
            rawNode: a
          } = i;
          return Ks(a, r);
        });
      })
    });
    const o = U5(null);
    return aa(ud, null), aa(cd, null), aa(Ua, o), {
      bodyRef: o
    };
  },
  render() {
    const {
      parentKey: e,
      clsPrefix: t,
      scrollable: n
    } = this, o = this.tmNodes.map((r) => {
      const {
        rawNode: i
      } = r;
      return i.show === !1 ? null : E5(i) ? er(H5, {
        tmNode: r,
        key: r.key
      }) : Dv(i) ? er(Lv, {
        clsPrefix: t,
        key: r.key
      }) : F5(i) ? er(L5, {
        clsPrefix: t,
        tmNode: r,
        parentKey: e,
        key: r.key
      }) : er(Nv, {
        clsPrefix: t,
        tmNode: r,
        parentKey: e,
        key: r.key,
        props: i.props,
        scrollable: n
      });
    });
    return er("div", {
      class: [`${t}-dropdown-menu`, n && `${t}-dropdown-menu--scrollable`],
      ref: "bodyRef"
    }, n ? er(sv, {
      contentClass: `${t}-dropdown-menu__content`
    }, {
      default: () => o
    }) : o, this.showArrow ? pv({
      clsPrefix: t,
      arrowStyle: this.arrowStyle,
      arrowClass: void 0,
      arrowWrapperClass: void 0,
      arrowWrapperStyle: void 0
    }) : null);
  }
}), K5 = z("dropdown-menu", `
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`, [Ya(), z("dropdown-option", `
 position: relative;
 `, [H("a", `
 text-decoration: none;
 color: inherit;
 outline: none;
 `, [H("&::before", `
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]), z("dropdown-option-body", `
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `, [H("&::before", `
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `), tt("disabled", [U("pending", `
 color: var(--n-option-text-color-hover);
 `, [B("prefix, suffix", `
 color: var(--n-option-text-color-hover);
 `), H("&::before", "background-color: var(--n-option-color-hover);")]), U("active", `
 color: var(--n-option-text-color-active);
 `, [B("prefix, suffix", `
 color: var(--n-option-text-color-active);
 `), H("&::before", "background-color: var(--n-option-color-active);")]), U("child-active", `
 color: var(--n-option-text-color-child-active);
 `, [B("prefix, suffix", `
 color: var(--n-option-text-color-child-active);
 `)])]), U("disabled", `
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `), U("group", `
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `, [B("prefix", `
 width: calc(var(--n-option-prefix-width) / 2);
 `, [U("show-icon", `
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]), B("prefix", `
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `, [U("show-icon", `
 width: var(--n-option-icon-prefix-width);
 `), z("icon", `
 font-size: var(--n-option-icon-size);
 `)]), B("label", `
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `), B("suffix", `
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `, [U("has-submenu", `
 width: var(--n-option-icon-suffix-width);
 `), z("icon", `
 font-size: var(--n-option-icon-size);
 `)]), z("dropdown-menu", "pointer-events: all;")]), z("dropdown-offset-container", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]), z("dropdown-divider", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `), z("dropdown-menu-wrapper", `
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `), H(">", [z("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), tt("scrollable", `
 padding: var(--n-padding);
 `), U("scrollable", [B("content", `
 padding: var(--n-padding);
 `)])]), $o = window.Vue.computed, q5 = window.Vue.defineComponent, If = window.Vue.h, G5 = window.Vue.mergeProps, X5 = window.Vue.provide, la = window.Vue.ref, jn = window.Vue.toRef, Y5 = window.Vue.watch, Z5 = {
  animated: {
    type: Boolean,
    default: !0
  },
  keyboard: {
    type: Boolean,
    default: !0
  },
  size: {
    type: String,
    default: "medium"
  },
  inverted: Boolean,
  placement: {
    type: String,
    default: "bottom"
  },
  onSelect: [Function, Array],
  options: {
    type: Array,
    default: () => []
  },
  menuProps: Function,
  showArrow: Boolean,
  renderLabel: Function,
  renderIcon: Function,
  renderOption: Function,
  nodeProps: Function,
  labelField: {
    type: String,
    default: "label"
  },
  keyField: {
    type: String,
    default: "key"
  },
  childrenField: {
    type: String,
    default: "children"
  },
  // for menu, not documented
  value: [String, Number]
}, J5 = Object.keys(ur), Q5 = Object.assign(Object.assign(Object.assign({}, ur), Z5), ke.props), eF = q5({
  name: "Dropdown",
  inheritAttrs: !1,
  props: Q5,
  setup(e) {
    const t = la(!1), n = It(jn(e, "show"), t), o = $o(() => {
      const {
        keyField: _,
        childrenField: M
      } = e;
      return Xa(e.options, {
        getKey(I) {
          return I[_];
        },
        getDisabled(I) {
          return I.disabled === !0;
        },
        getIgnored(I) {
          return I.type === "divider" || I.type === "render";
        },
        getChildren(I) {
          return I[M];
        }
      });
    }), r = $o(() => o.value.treeNodes), i = la(null), l = la(null), a = la(null), s = $o(() => {
      var _, M, I;
      return (I = (M = (_ = i.value) !== null && _ !== void 0 ? _ : l.value) !== null && M !== void 0 ? M : a.value) !== null && I !== void 0 ? I : null;
    }), d = $o(() => o.value.getPath(s.value).keyPath), c = $o(() => o.value.getPath(e.value).keyPath), h = Me(() => e.keyboard && n.value);
    Lw({
      keydown: {
        ArrowUp: {
          prevent: !0,
          handler: C
        },
        ArrowRight: {
          prevent: !0,
          handler: b
        },
        ArrowDown: {
          prevent: !0,
          handler: S
        },
        ArrowLeft: {
          prevent: !0,
          handler: x
        },
        Enter: {
          prevent: !0,
          handler: y
        },
        Escape: w
      }
    }, h);
    const {
      mergedClsPrefixRef: p,
      inlineThemeDisabled: g
    } = je(e), f = ke("Dropdown", "-dropdown", K5, Pv, e, p);
    X5(Za, {
      labelFieldRef: jn(e, "labelField"),
      childrenFieldRef: jn(e, "childrenField"),
      renderLabelRef: jn(e, "renderLabel"),
      renderIconRef: jn(e, "renderIcon"),
      hoverKeyRef: i,
      keyboardKeyRef: l,
      lastToggledSubmenuKeyRef: a,
      pendingKeyPathRef: d,
      activeKeyPathRef: c,
      animatedRef: jn(e, "animated"),
      mergedShowRef: n,
      nodePropsRef: jn(e, "nodeProps"),
      renderOptionRef: jn(e, "renderOption"),
      menuPropsRef: jn(e, "menuProps"),
      doSelect: v,
      doUpdateShow: m
    }), Y5(n, (_) => {
      !e.animated && !_ && u();
    });
    function v(_, M) {
      const {
        onSelect: I
      } = e;
      I && ie(I, _, M);
    }
    function m(_) {
      const {
        "onUpdate:show": M,
        onUpdateShow: I
      } = e;
      M && ie(M, _), I && ie(I, _), t.value = _;
    }
    function u() {
      i.value = null, l.value = null, a.value = null;
    }
    function w() {
      m(!1);
    }
    function x() {
      R("left");
    }
    function b() {
      R("right");
    }
    function C() {
      R("up");
    }
    function S() {
      R("down");
    }
    function y() {
      const _ = T();
      _ != null && _.isLeaf && n.value && (v(_.key, _.rawNode), m(!1));
    }
    function T() {
      var _;
      const {
        value: M
      } = o, {
        value: I
      } = s;
      return !M || I === null ? null : (_ = M.getNode(I)) !== null && _ !== void 0 ? _ : null;
    }
    function R(_) {
      const {
        value: M
      } = s, {
        value: {
          getFirstAvailableNode: I
        }
      } = o;
      let O = null;
      if (M === null) {
        const K = I();
        K !== null && (O = K.key);
      } else {
        const K = T();
        if (K) {
          let L;
          switch (_) {
            case "down":
              L = K.getNext();
              break;
            case "up":
              L = K.getPrev();
              break;
            case "right":
              L = K.getChild();
              break;
            case "left":
              L = K.getParent();
              break;
          }
          L && (O = L.key);
        }
      }
      O !== null && (i.value = null, l.value = O);
    }
    const E = $o(() => {
      const {
        size: _,
        inverted: M
      } = e, {
        common: {
          cubicBezierEaseInOut: I
        },
        self: O
      } = f.value, {
        padding: K,
        dividerColor: L,
        borderRadius: Y,
        optionOpacityDisabled: Q,
        [oe("optionIconSuffixWidth", _)]: J,
        [oe("optionSuffixWidth", _)]: q,
        [oe("optionIconPrefixWidth", _)]: A,
        [oe("optionPrefixWidth", _)]: G,
        [oe("fontSize", _)]: Z,
        [oe("optionHeight", _)]: ae,
        [oe("optionIconSize", _)]: le
      } = O, de = {
        "--n-bezier": I,
        "--n-font-size": Z,
        "--n-padding": K,
        "--n-border-radius": Y,
        "--n-option-height": ae,
        "--n-option-prefix-width": G,
        "--n-option-icon-prefix-width": A,
        "--n-option-suffix-width": q,
        "--n-option-icon-suffix-width": J,
        "--n-option-icon-size": le,
        "--n-divider-color": L,
        "--n-option-opacity-disabled": Q
      };
      return M ? (de["--n-color"] = O.colorInverted, de["--n-option-color-hover"] = O.optionColorHoverInverted, de["--n-option-color-active"] = O.optionColorActiveInverted, de["--n-option-text-color"] = O.optionTextColorInverted, de["--n-option-text-color-hover"] = O.optionTextColorHoverInverted, de["--n-option-text-color-active"] = O.optionTextColorActiveInverted, de["--n-option-text-color-child-active"] = O.optionTextColorChildActiveInverted, de["--n-prefix-color"] = O.prefixColorInverted, de["--n-suffix-color"] = O.suffixColorInverted, de["--n-group-header-text-color"] = O.groupHeaderTextColorInverted) : (de["--n-color"] = O.color, de["--n-option-color-hover"] = O.optionColorHover, de["--n-option-color-active"] = O.optionColorActive, de["--n-option-text-color"] = O.optionTextColor, de["--n-option-text-color-hover"] = O.optionTextColorHover, de["--n-option-text-color-active"] = O.optionTextColorActive, de["--n-option-text-color-child-active"] = O.optionTextColorChildActive, de["--n-prefix-color"] = O.prefixColor, de["--n-suffix-color"] = O.suffixColor, de["--n-group-header-text-color"] = O.groupHeaderTextColor), de;
    }), W = g ? St("dropdown", $o(() => `${e.size[0]}${e.inverted ? "i" : ""}`), E, e) : void 0;
    return {
      mergedClsPrefix: p,
      mergedTheme: f,
      // data
      tmNodes: r,
      // show
      mergedShow: n,
      // methods
      handleAfterLeave: () => {
        e.animated && u();
      },
      doUpdateShow: m,
      cssVars: g ? void 0 : E,
      themeClass: W == null ? void 0 : W.themeClass,
      onRender: W == null ? void 0 : W.onRender
    };
  },
  render() {
    const e = (o, r, i, l, a) => {
      var s;
      const {
        mergedClsPrefix: d,
        menuProps: c
      } = this;
      (s = this.onRender) === null || s === void 0 || s.call(this);
      const h = (c == null ? void 0 : c(void 0, this.tmNodes.map((g) => g.rawNode))) || {}, p = {
        ref: wp(r),
        class: [o, `${d}-dropdown`, this.themeClass],
        clsPrefix: d,
        tmNodes: this.tmNodes,
        style: [...i, this.cssVars],
        showArrow: this.showArrow,
        arrowStyle: this.arrowStyle,
        scrollable: this.scrollable,
        onMouseenter: l,
        onMouseleave: a
      };
      return If(Hv, G5(this.$attrs, p, h));
    }, {
      mergedTheme: t
    } = this, n = {
      show: this.mergedShow,
      theme: t.peers.Popover,
      themeOverrides: t.peerOverrides.Popover,
      internalOnAfterLeave: this.handleAfterLeave,
      internalRenderBody: e,
      onUpdateShow: this.doUpdateShow,
      "onUpdate:show": void 0
    };
    return If(bi, Object.assign({}, si(this.$props, J5), n), {
      trigger: () => {
        var o, r;
        return (r = (o = this.$slots).default) === null || r === void 0 ? void 0 : r.call(o);
      }
    });
  }
}), Af = window.Vue.computed, tF = window.Vue.defineComponent, ts = window.Vue.h, nF = window.Vue.inject, jv = "_n_all__", Wv = "_n_none__";
function oF(e, t, n, o) {
  return e ? (r) => {
    for (const i of e)
      switch (r) {
        case jv:
          n(!0);
          return;
        case Wv:
          o(!0);
          return;
        default:
          if (typeof i == "object" && i.key === r) {
            i.onSelect(t.value);
            return;
          }
      }
  } : () => {
  };
}
function rF(e, t) {
  return e ? e.map((n) => {
    switch (n) {
      case "all":
        return {
          label: t.checkTableAll,
          key: jv
        };
      case "none":
        return {
          label: t.uncheckTableAll,
          key: Wv
        };
      default:
        return n;
    }
  }) : [];
}
const iF = tF({
  name: "DataTableSelectionMenu",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    const {
      props: t,
      localeRef: n,
      checkOptionsRef: o,
      rawPaginatedDataRef: r,
      doCheckAll: i,
      doUncheckAll: l
    } = nF(yn), a = Af(() => oF(o.value, r, i, l)), s = Af(() => rF(o.value, n.value));
    return () => {
      var d, c, h, p;
      const {
        clsPrefix: g
      } = e;
      return ts(eF, {
        theme: (c = (d = t.theme) === null || d === void 0 ? void 0 : d.peers) === null || c === void 0 ? void 0 : c.Dropdown,
        themeOverrides: (p = (h = t.themeOverrides) === null || h === void 0 ? void 0 : h.peers) === null || p === void 0 ? void 0 : p.Dropdown,
        options: s.value,
        onSelect: a.value
      }, {
        default: () => ts(Ct, {
          clsPrefix: g,
          class: `${g}-data-table-check-extra`
        }, {
          default: () => ts(ev, null)
        })
      });
    };
  }
}), Uv = window.Vue.defineComponent, Vf = window.Vue.Fragment, ct = window.Vue.h, aF = window.Vue.inject, Bf = window.Vue.ref;
function ns(e) {
  return typeof e.title == "function" ? e.title(e) : e.title;
}
const lF = Uv({
  props: {
    clsPrefix: {
      type: String,
      required: !0
    },
    id: {
      type: String,
      required: !0
    },
    cols: {
      type: Array,
      required: !0
    },
    width: String
  },
  render() {
    const {
      clsPrefix: e,
      id: t,
      cols: n,
      width: o
    } = this;
    return ct("table", {
      style: {
        tableLayout: "fixed",
        width: o
      },
      class: `${e}-data-table-table`
    }, ct("colgroup", null, n.map((r) => ct("col", {
      key: r.key,
      style: r.style
    }))), ct("thead", {
      "data-n-id": t,
      class: `${e}-data-table-thead`
    }, this.$slots));
  }
}), Kv = Uv({
  name: "DataTableHeader",
  props: {
    discrete: {
      type: Boolean,
      default: !0
    }
  },
  setup() {
    const {
      mergedClsPrefixRef: e,
      scrollXRef: t,
      fixedColumnLeftMapRef: n,
      fixedColumnRightMapRef: o,
      mergedCurrentPageRef: r,
      allRowsCheckedRef: i,
      someRowsCheckedRef: l,
      rowsRef: a,
      colsRef: s,
      mergedThemeRef: d,
      checkOptionsRef: c,
      mergedSortStateRef: h,
      componentId: p,
      mergedTableLayoutRef: g,
      headerCheckboxDisabledRef: f,
      virtualScrollHeaderRef: v,
      headerHeightRef: m,
      onUnstableColumnResize: u,
      doUpdateResizableWidth: w,
      handleTableHeaderScroll: x,
      deriveNextSorter: b,
      doUncheckAll: C,
      doCheckAll: S
    } = aF(yn), y = Bf(), T = Bf({});
    function R(O) {
      const K = T.value[O];
      return K == null ? void 0 : K.getBoundingClientRect().width;
    }
    function E() {
      i.value ? C() : S();
    }
    function W(O, K) {
      if (cn(O, "dataTableFilter") || cn(O, "dataTableResizable") || !Yl(K)) return;
      const L = h.value.find((Q) => Q.columnKey === K.key) || null, Y = fT(K, L);
      b(Y);
    }
    const _ = /* @__PURE__ */ new Map();
    function M(O) {
      _.set(O.key, R(O.key));
    }
    function I(O, K) {
      const L = _.get(O.key);
      if (L === void 0)
        return;
      const Y = L + K, Q = dT(Y, O.minWidth, O.maxWidth);
      u(Y, Q, O, R), w(O, Q);
    }
    return {
      cellElsRef: T,
      componentId: p,
      mergedSortState: h,
      mergedClsPrefix: e,
      scrollX: t,
      fixedColumnLeftMap: n,
      fixedColumnRightMap: o,
      currentPage: r,
      allRowsChecked: i,
      someRowsChecked: l,
      rows: a,
      cols: s,
      mergedTheme: d,
      checkOptions: c,
      mergedTableLayout: g,
      headerCheckboxDisabled: f,
      headerHeight: m,
      virtualScrollHeader: v,
      virtualListRef: y,
      handleCheckboxUpdateChecked: E,
      handleColHeaderClick: W,
      handleTableHeaderScroll: x,
      handleColumnResizeStart: M,
      handleColumnResize: I
    };
  },
  render() {
    const {
      cellElsRef: e,
      mergedClsPrefix: t,
      fixedColumnLeftMap: n,
      fixedColumnRightMap: o,
      currentPage: r,
      allRowsChecked: i,
      someRowsChecked: l,
      rows: a,
      cols: s,
      mergedTheme: d,
      checkOptions: c,
      componentId: h,
      discrete: p,
      mergedTableLayout: g,
      headerCheckboxDisabled: f,
      mergedSortState: v,
      virtualScrollHeader: m,
      handleColHeaderClick: u,
      handleCheckboxUpdateChecked: w,
      handleColumnResizeStart: x,
      handleColumnResize: b
    } = this, C = (R, E, W) => R.map(({
      column: _,
      colIndex: M,
      colSpan: I,
      rowSpan: O,
      isLast: K
    }) => {
      var L, Y;
      const Q = gn(_), {
        ellipsis: J
      } = _, q = () => _.type === "selection" ? _.multiple !== !1 ? ct(Vf, null, ct(Ad, {
        key: r,
        privateInsideTable: !0,
        checked: i,
        indeterminate: l,
        disabled: f,
        onUpdateChecked: w
      }), c ? ct(iF, {
        clsPrefix: t
      }) : null) : null : ct(Vf, null, ct("div", {
        class: `${t}-data-table-th__title-wrapper`
      }, ct("div", {
        class: `${t}-data-table-th__title`
      }, J === !0 || J && !J.tooltip ? ct("div", {
        class: `${t}-data-table-th__ellipsis`
      }, ns(_)) : J && typeof J == "object" ? ct(Dd, Object.assign({}, J, {
        theme: d.peers.Ellipsis,
        themeOverrides: d.peerOverrides.Ellipsis
      }), {
        default: () => ns(_)
      }) : ns(_)), Yl(_) ? ct(b5, {
        column: _
      }) : null), xf(_) ? ct(l5, {
        column: _,
        options: _.filterOptions
      }) : null, zv(_) ? ct(h5, {
        onResizeStart: () => {
          x(_);
        },
        onResize: (ae) => {
          b(_, ae);
        }
      }) : null), A = Q in n, G = Q in o, Z = E && !_.fixed ? "div" : "th";
      return ct(Z, {
        ref: (ae) => e[Q] = ae,
        key: Q,
        style: [E && !_.fixed ? {
          position: "absolute",
          left: lt(E(M)),
          top: 0,
          bottom: 0
        } : {
          left: lt((L = n[Q]) === null || L === void 0 ? void 0 : L.start),
          right: lt((Y = o[Q]) === null || Y === void 0 ? void 0 : Y.start)
        }, {
          width: lt(_.width),
          textAlign: _.titleAlign || _.align,
          height: W
        }],
        colspan: I,
        rowspan: O,
        "data-col-key": Q,
        class: [`${t}-data-table-th`, (A || G) && `${t}-data-table-th--fixed-${A ? "left" : "right"}`, {
          [`${t}-data-table-th--sorting`]: Ov(_, v),
          [`${t}-data-table-th--filterable`]: xf(_),
          [`${t}-data-table-th--sortable`]: Yl(_),
          [`${t}-data-table-th--selection`]: _.type === "selection",
          [`${t}-data-table-th--last`]: K
        }, _.className],
        onClick: _.type !== "selection" && _.type !== "expand" && !("children" in _) ? (ae) => {
          u(ae, _);
        } : void 0
      }, q());
    });
    if (m) {
      const {
        headerHeight: R
      } = this;
      let E = 0, W = 0;
      return s.forEach((_) => {
        _.column.fixed === "left" ? E++ : _.column.fixed === "right" && W++;
      }), ct(md, {
        ref: "virtualListRef",
        class: `${t}-data-table-base-table-header`,
        style: {
          height: lt(R)
        },
        onScroll: this.handleTableHeaderScroll,
        columns: s,
        itemSize: R,
        showScrollbar: !1,
        items: [{}],
        itemResizable: !1,
        visibleItemsTag: lF,
        visibleItemsProps: {
          clsPrefix: t,
          id: h,
          cols: s,
          width: ft(this.scrollX)
        },
        renderItemWithCols: ({
          startColIndex: _,
          endColIndex: M,
          getLeft: I
        }) => {
          const O = s.map((L, Y) => ({
            column: L.column,
            isLast: Y === s.length - 1,
            colIndex: L.index,
            colSpan: 1,
            rowSpan: 1
          })).filter(({
            column: L
          }, Y) => !!(_ <= Y && Y <= M || L.fixed)), K = C(O, I, lt(R));
          return K.splice(E, 0, ct("th", {
            colspan: s.length - E - W,
            style: {
              pointerEvents: "none",
              visibility: "hidden",
              height: 0
            }
          })), ct("tr", {
            style: {
              position: "relative"
            }
          }, K);
        }
      }, {
        default: ({
          renderedItemWithCols: _
        }) => _
      });
    }
    const S = ct("thead", {
      class: `${t}-data-table-thead`,
      "data-n-id": h
    }, a.map((R) => ct("tr", {
      class: `${t}-data-table-tr`
    }, C(R, null, void 0))));
    if (!p)
      return S;
    const {
      handleTableHeaderScroll: y,
      scrollX: T
    } = this;
    return ct("div", {
      class: `${t}-data-table-base-table-header`,
      onScroll: y
    }, ct("table", {
      class: `${t}-data-table-table`,
      style: {
        minWidth: ft(T),
        tableLayout: g
      }
    }, ct("colgroup", null, s.map((R) => ct("col", {
      key: R.key,
      style: R.style
    }))), S));
  }
}), Lf = window.Vue.computed, qv = window.Vue.defineComponent, sF = window.Vue.Fragment, ot = window.Vue.h, Df = window.Vue.inject, dF = window.Vue.onUnmounted, os = window.Vue.ref, cF = window.Vue.watchEffect;
function uF(e, t) {
  const n = [];
  function o(r, i) {
    r.forEach((l) => {
      l.children && t.has(l.key) ? (n.push({
        tmNode: l,
        striped: !1,
        key: l.key,
        index: i
      }), o(l.children, i)) : n.push({
        key: l.key,
        tmNode: l,
        striped: !1,
        index: i
      });
    });
  }
  return e.forEach((r) => {
    n.push(r);
    const {
      children: i
    } = r.tmNode;
    i && t.has(r.key) && o(i, r.index);
  }), n;
}
const fF = qv({
  props: {
    clsPrefix: {
      type: String,
      required: !0
    },
    id: {
      type: String,
      required: !0
    },
    cols: {
      type: Array,
      required: !0
    },
    onMouseenter: Function,
    onMouseleave: Function
  },
  render() {
    const {
      clsPrefix: e,
      id: t,
      cols: n,
      onMouseenter: o,
      onMouseleave: r
    } = this;
    return ot("table", {
      style: {
        tableLayout: "fixed"
      },
      class: `${e}-data-table-table`,
      onMouseenter: o,
      onMouseleave: r
    }, ot("colgroup", null, n.map((i) => ot("col", {
      key: i.key,
      style: i.style
    }))), ot("tbody", {
      "data-n-id": t,
      class: `${e}-data-table-tbody`
    }, this.$slots));
  }
}), hF = qv({
  name: "DataTableBody",
  props: {
    onResize: Function,
    showHeader: Boolean,
    flexHeight: Boolean,
    bodyStyle: Object
  },
  setup(e) {
    const {
      slots: t,
      bodyWidthRef: n,
      mergedExpandedRowKeysRef: o,
      mergedClsPrefixRef: r,
      mergedThemeRef: i,
      scrollXRef: l,
      colsRef: a,
      paginatedDataRef: s,
      rawPaginatedDataRef: d,
      fixedColumnLeftMapRef: c,
      fixedColumnRightMapRef: h,
      mergedCurrentPageRef: p,
      rowClassNameRef: g,
      leftActiveFixedColKeyRef: f,
      leftActiveFixedChildrenColKeysRef: v,
      rightActiveFixedColKeyRef: m,
      rightActiveFixedChildrenColKeysRef: u,
      renderExpandRef: w,
      hoverKeyRef: x,
      summaryRef: b,
      mergedSortStateRef: C,
      virtualScrollRef: S,
      virtualScrollXRef: y,
      heightForRowRef: T,
      minRowHeightRef: R,
      componentId: E,
      mergedTableLayoutRef: W,
      childTriggerColIndexRef: _,
      indentRef: M,
      rowPropsRef: I,
      maxHeightRef: O,
      stripedRef: K,
      loadingRef: L,
      onLoadRef: Y,
      loadingKeySetRef: Q,
      expandableRef: J,
      stickyExpandedRowsRef: q,
      renderExpandIconRef: A,
      summaryPlacementRef: G,
      treeMateRef: Z,
      scrollbarPropsRef: ae,
      setHeaderScrollLeft: le,
      doUpdateExpandedRowKeys: de,
      handleTableBodyScroll: ge,
      doCheck: X,
      doUncheck: ce,
      renderCell: Pe
    } = Df(yn), me = Df(Kn), $e = os(null), Se = os(null), Le = os(null), Ie = Me(() => s.value.length === 0), re = Me(() => e.showHeader || !Ie.value), k = Me(() => e.showHeader || Ie.value);
    let $ = "";
    const D = Lf(() => new Set(o.value));
    function ee(fe) {
      var Re;
      return (Re = Z.value.getNode(fe)) === null || Re === void 0 ? void 0 : Re.rawNode;
    }
    function ve(fe, Re, P) {
      const N = ee(fe.key);
      if (!N) {
        ho("data-table", `fail to get row data with key ${fe.key}`);
        return;
      }
      if (P) {
        const te = s.value.findIndex((se) => se.key === $);
        if (te !== -1) {
          const se = s.value.findIndex((Ce) => Ce.key === fe.key), ue = Math.min(te, se), be = Math.max(te, se), we = [];
          s.value.slice(ue, be + 1).forEach((Ce) => {
            Ce.disabled || we.push(Ce.key);
          }), Re ? X(we, !1, N) : ce(we, N), $ = fe.key;
          return;
        }
      }
      Re ? X(fe.key, !1, N) : ce(fe.key, N), $ = fe.key;
    }
    function he(fe) {
      const Re = ee(fe.key);
      if (!Re) {
        ho("data-table", `fail to get row data with key ${fe.key}`);
        return;
      }
      X(fe.key, !0, Re);
    }
    function F() {
      if (!re.value) {
        const {
          value: Re
        } = Le;
        return Re || null;
      }
      if (S.value)
        return Fe();
      const {
        value: fe
      } = $e;
      return fe ? fe.containerRef : null;
    }
    function j(fe, Re) {
      var P;
      if (Q.value.has(fe)) return;
      const {
        value: N
      } = o, te = N.indexOf(fe), se = Array.from(N);
      ~te ? (se.splice(te, 1), de(se)) : Re && !Re.isLeaf && !Re.shallowLoaded ? (Q.value.add(fe), (P = Y.value) === null || P === void 0 || P.call(Y, Re.rawNode).then(() => {
        const {
          value: ue
        } = o, be = Array.from(ue);
        ~be.indexOf(fe) || be.push(fe), de(be);
      }).finally(() => {
        Q.value.delete(fe);
      })) : (se.push(fe), de(se));
    }
    function pe() {
      x.value = null;
    }
    function Fe() {
      const {
        value: fe
      } = Se;
      return (fe == null ? void 0 : fe.listElRef) || null;
    }
    function dt() {
      const {
        value: fe
      } = Se;
      return (fe == null ? void 0 : fe.itemsElRef) || null;
    }
    function bt(fe) {
      var Re;
      ge(fe), (Re = $e.value) === null || Re === void 0 || Re.sync();
    }
    function Je(fe) {
      var Re;
      const {
        onResize: P
      } = e;
      P && P(fe), (Re = $e.value) === null || Re === void 0 || Re.sync();
    }
    const Qe = {
      getScrollContainer: F,
      scrollTo(fe, Re) {
        var P, N;
        S.value ? (P = Se.value) === null || P === void 0 || P.scrollTo(fe, Re) : (N = $e.value) === null || N === void 0 || N.scrollTo(fe, Re);
      }
    }, wt = H([({
      props: fe
    }) => {
      const Re = (N) => N === null ? null : H(`[data-n-id="${fe.componentId}"] [data-col-key="${N}"]::after`, {
        boxShadow: "var(--n-box-shadow-after)"
      }), P = (N) => N === null ? null : H(`[data-n-id="${fe.componentId}"] [data-col-key="${N}"]::before`, {
        boxShadow: "var(--n-box-shadow-before)"
      });
      return H([Re(fe.leftActiveFixedColKey), P(fe.rightActiveFixedColKey), fe.leftActiveFixedChildrenColKeys.map((N) => Re(N)), fe.rightActiveFixedChildrenColKeys.map((N) => P(N))]);
    }]);
    let nt = !1;
    return cF(() => {
      const {
        value: fe
      } = f, {
        value: Re
      } = v, {
        value: P
      } = m, {
        value: N
      } = u;
      if (!nt && fe === null && P === null)
        return;
      const te = {
        leftActiveFixedColKey: fe,
        leftActiveFixedChildrenColKeys: Re,
        rightActiveFixedColKey: P,
        rightActiveFixedChildrenColKeys: N,
        componentId: E
      };
      wt.mount({
        id: `n-${E}`,
        force: !0,
        props: te,
        anchorMetaName: cr,
        parent: me == null ? void 0 : me.styleMountTarget
      }), nt = !0;
    }), dF(() => {
      wt.unmount({
        id: `n-${E}`,
        parent: me == null ? void 0 : me.styleMountTarget
      });
    }), Object.assign({
      bodyWidth: n,
      summaryPlacement: G,
      dataTableSlots: t,
      componentId: E,
      scrollbarInstRef: $e,
      virtualListRef: Se,
      emptyElRef: Le,
      summary: b,
      mergedClsPrefix: r,
      mergedTheme: i,
      scrollX: l,
      cols: a,
      loading: L,
      bodyShowHeaderOnly: k,
      shouldDisplaySomeTablePart: re,
      empty: Ie,
      paginatedDataAndInfo: Lf(() => {
        const {
          value: fe
        } = K;
        let Re = !1;
        return {
          data: s.value.map(fe ? (N, te) => (N.isLeaf || (Re = !0), {
            tmNode: N,
            key: N.key,
            striped: te % 2 === 1,
            index: te
          }) : (N, te) => (N.isLeaf || (Re = !0), {
            tmNode: N,
            key: N.key,
            striped: !1,
            index: te
          })),
          hasChildren: Re
        };
      }),
      rawPaginatedData: d,
      fixedColumnLeftMap: c,
      fixedColumnRightMap: h,
      currentPage: p,
      rowClassName: g,
      renderExpand: w,
      mergedExpandedRowKeySet: D,
      hoverKey: x,
      mergedSortState: C,
      virtualScroll: S,
      virtualScrollX: y,
      heightForRow: T,
      minRowHeight: R,
      mergedTableLayout: W,
      childTriggerColIndex: _,
      indent: M,
      rowProps: I,
      maxHeight: O,
      loadingKeySet: Q,
      expandable: J,
      stickyExpandedRows: q,
      renderExpandIcon: A,
      scrollbarProps: ae,
      setHeaderScrollLeft: le,
      handleVirtualListScroll: bt,
      handleVirtualListResize: Je,
      handleMouseleaveTable: pe,
      virtualListContainer: Fe,
      virtualListContent: dt,
      handleTableBodyScroll: ge,
      handleCheckboxUpdateChecked: ve,
      handleRadioUpdateChecked: he,
      handleUpdateExpanded: j,
      renderCell: Pe
    }, Qe);
  },
  render() {
    const {
      mergedTheme: e,
      scrollX: t,
      mergedClsPrefix: n,
      virtualScroll: o,
      maxHeight: r,
      mergedTableLayout: i,
      flexHeight: l,
      loadingKeySet: a,
      onResize: s,
      setHeaderScrollLeft: d
    } = this, c = t !== void 0 || r !== void 0 || l, h = !c && i === "auto", p = t !== void 0 || h, g = {
      minWidth: ft(t) || "100%"
    };
    t && (g.width = "100%");
    const f = ot(mi, Object.assign({}, this.scrollbarProps, {
      ref: "scrollbarInstRef",
      scrollable: c || h,
      class: `${n}-data-table-base-table-body`,
      style: this.empty ? void 0 : this.bodyStyle,
      theme: e.peers.Scrollbar,
      themeOverrides: e.peerOverrides.Scrollbar,
      contentStyle: g,
      container: o ? this.virtualListContainer : void 0,
      content: o ? this.virtualListContent : void 0,
      horizontalRailStyle: {
        zIndex: 3
      },
      verticalRailStyle: {
        zIndex: 3
      },
      xScrollable: p,
      onScroll: o ? void 0 : this.handleTableBodyScroll,
      internalOnUpdateScrollLeft: d,
      onResize: s
    }), {
      default: () => {
        const v = {}, m = {}, {
          cols: u,
          paginatedDataAndInfo: w,
          mergedTheme: x,
          fixedColumnLeftMap: b,
          fixedColumnRightMap: C,
          currentPage: S,
          rowClassName: y,
          mergedSortState: T,
          mergedExpandedRowKeySet: R,
          stickyExpandedRows: E,
          componentId: W,
          childTriggerColIndex: _,
          expandable: M,
          rowProps: I,
          handleMouseleaveTable: O,
          renderExpand: K,
          summary: L,
          handleCheckboxUpdateChecked: Y,
          handleRadioUpdateChecked: Q,
          handleUpdateExpanded: J,
          heightForRow: q,
          minRowHeight: A,
          virtualScrollX: G
        } = this, {
          length: Z
        } = u;
        let ae;
        const {
          data: le,
          hasChildren: de
        } = w, ge = de ? uF(le, R) : le;
        if (L) {
          const $ = L(this.rawPaginatedData);
          if (Array.isArray($)) {
            const D = $.map((ee, ve) => ({
              isSummaryRow: !0,
              key: `__n_summary__${ve}`,
              tmNode: {
                rawNode: ee,
                disabled: !0
              },
              index: -1
            }));
            ae = this.summaryPlacement === "top" ? [...D, ...ge] : [...ge, ...D];
          } else {
            const D = {
              isSummaryRow: !0,
              key: "__n_summary__",
              tmNode: {
                rawNode: $,
                disabled: !0
              },
              index: -1
            };
            ae = this.summaryPlacement === "top" ? [D, ...ge] : [...ge, D];
          }
        } else
          ae = ge;
        const X = de ? {
          width: lt(this.indent)
        } : void 0, ce = [];
        ae.forEach(($) => {
          K && R.has($.key) && (!M || M($.tmNode.rawNode)) ? ce.push($, {
            isExpandedRow: !0,
            key: `${$.key}-expand`,
            // solve key repeat of the expanded row
            tmNode: $.tmNode,
            index: $.index
          }) : ce.push($);
        });
        const {
          length: Pe
        } = ce, me = {};
        le.forEach(({
          tmNode: $
        }, D) => {
          me[D] = $.key;
        });
        const $e = E ? this.bodyWidth : null, Se = $e === null ? void 0 : `${$e}px`, Le = this.virtualScrollX ? "div" : "td";
        let Ie = 0, re = 0;
        G && u.forEach(($) => {
          $.column.fixed === "left" ? Ie++ : $.column.fixed === "right" && re++;
        });
        const k = ({
          // Normal
          rowInfo: $,
          displayedRowIndex: D,
          isVirtual: ee,
          // Virtual X
          isVirtualX: ve,
          startColIndex: he,
          endColIndex: F,
          getLeft: j
        }) => {
          const {
            index: pe
          } = $;
          if ("isExpandedRow" in $) {
            const {
              tmNode: {
                key: se,
                rawNode: ue
              }
            } = $;
            return ot("tr", {
              class: `${n}-data-table-tr ${n}-data-table-tr--expanded`,
              key: `${se}__expand`
            }, ot("td", {
              class: [`${n}-data-table-td`, `${n}-data-table-td--last-col`, D + 1 === Pe && `${n}-data-table-td--last-row`],
              colspan: Z
            }, E ? ot("div", {
              class: `${n}-data-table-expand`,
              style: {
                width: Se
              }
            }, K(ue, pe)) : K(ue, pe)));
          }
          const Fe = "isSummaryRow" in $, dt = !Fe && $.striped, {
            tmNode: bt,
            key: Je
          } = $, {
            rawNode: Qe
          } = bt, wt = R.has(Je), nt = I ? I(Qe, pe) : void 0, fe = typeof y == "string" ? y : uT(Qe, pe, y), Re = ve ? u.filter((se, ue) => !!(he <= ue && ue <= F || se.column.fixed)) : u, P = ve ? lt((q == null ? void 0 : q(Qe, pe)) || A) : void 0, N = Re.map((se) => {
            var ue, be, we, Ce, Ve;
            const it = se.index;
            if (D in v) {
              const at = v[D], ht = at.indexOf(it);
              if (~ht)
                return at.splice(ht, 1), null;
            }
            const {
              column: He
            } = se, Tt = gn(se), {
              rowSpan: Vt,
              colSpan: Bt
            } = He, Wt = Fe ? ((ue = $.tmNode.rawNode[Tt]) === null || ue === void 0 ? void 0 : ue.colSpan) || 1 : Bt ? Bt(Qe, pe) : 1, Ut = Fe ? ((be = $.tmNode.rawNode[Tt]) === null || be === void 0 ? void 0 : be.rowSpan) || 1 : Vt ? Vt(Qe, pe) : 1, on = it + Wt === Z, Kt = D + Ut === Pe, V = Ut > 1;
            if (V && (m[D] = {
              [it]: []
            }), Wt > 1 || V)
              for (let at = D; at < D + Ut; ++at) {
                V && m[D][it].push(me[at]);
                for (let ht = it; ht < it + Wt; ++ht)
                  at === D && ht === it || (at in v ? v[at].push(ht) : v[at] = [ht]);
              }
            const ne = V ? this.hoverKey : null, {
              cellProps: xe
            } = He, ze = xe == null ? void 0 : xe(Qe, pe), We = {
              "--indent-offset": ""
            }, Be = He.fixed ? "td" : Le;
            return ot(Be, Object.assign({}, ze, {
              key: Tt,
              style: [{
                textAlign: He.align || void 0,
                width: lt(He.width)
              }, ve && {
                height: P
              }, ve && !He.fixed ? {
                position: "absolute",
                left: lt(j(it)),
                top: 0,
                bottom: 0
              } : {
                left: lt((we = b[Tt]) === null || we === void 0 ? void 0 : we.start),
                right: lt((Ce = C[Tt]) === null || Ce === void 0 ? void 0 : Ce.start)
              }, We, (ze == null ? void 0 : ze.style) || ""],
              colspan: Wt,
              rowspan: ee ? void 0 : Ut,
              "data-col-key": Tt,
              class: [`${n}-data-table-td`, He.className, ze == null ? void 0 : ze.class, Fe && `${n}-data-table-td--summary`, ne !== null && m[D][it].includes(ne) && `${n}-data-table-td--hover`, Ov(He, T) && `${n}-data-table-td--sorting`, He.fixed && `${n}-data-table-td--fixed-${He.fixed}`, He.align && `${n}-data-table-td--${He.align}-align`, He.type === "selection" && `${n}-data-table-td--selection`, He.type === "expand" && `${n}-data-table-td--expand`, on && `${n}-data-table-td--last-col`, Kt && `${n}-data-table-td--last-row`]
            }), de && it === _ ? [ow(We["--indent-offset"] = Fe ? 0 : $.tmNode.level, ot("div", {
              class: `${n}-data-table-indent`,
              style: X
            })), Fe || $.tmNode.isLeaf ? ot("div", {
              class: `${n}-data-table-expand-placeholder`
            }) : ot(Tf, {
              class: `${n}-data-table-expand-trigger`,
              clsPrefix: n,
              expanded: wt,
              rowData: Qe,
              renderExpandIcon: this.renderExpandIcon,
              loading: a.has($.key),
              onClick: () => {
                J(Je, $.tmNode);
              }
            })] : null, He.type === "selection" ? Fe ? null : He.multiple === !1 ? ot(IT, {
              key: S,
              rowKey: Je,
              disabled: $.tmNode.disabled,
              onUpdateChecked: () => {
                Q($.tmNode);
              }
            }) : ot(bT, {
              key: S,
              rowKey: Je,
              disabled: $.tmNode.disabled,
              onUpdateChecked: (at, ht) => {
                Y($.tmNode, at, ht.shiftKey);
              }
            }) : He.type === "expand" ? Fe ? null : !He.expandable || !((Ve = He.expandable) === null || Ve === void 0) && Ve.call(He, Qe) ? ot(Tf, {
              clsPrefix: n,
              rowData: Qe,
              expanded: wt,
              renderExpandIcon: this.renderExpandIcon,
              onClick: () => {
                J(Je, null);
              }
            }) : null : ot(XT, {
              clsPrefix: n,
              index: pe,
              row: Qe,
              column: He,
              isSummary: Fe,
              mergedTheme: x,
              renderCell: this.renderCell
            }));
          });
          return ve && Ie && re && N.splice(Ie, 0, ot("td", {
            colspan: u.length - Ie - re,
            style: {
              pointerEvents: "none",
              visibility: "hidden",
              height: 0
            }
          })), ot("tr", Object.assign({}, nt, {
            onMouseenter: (se) => {
              var ue;
              this.hoverKey = Je, (ue = nt == null ? void 0 : nt.onMouseenter) === null || ue === void 0 || ue.call(nt, se);
            },
            key: Je,
            class: [`${n}-data-table-tr`, Fe && `${n}-data-table-tr--summary`, dt && `${n}-data-table-tr--striped`, wt && `${n}-data-table-tr--expanded`, fe, nt == null ? void 0 : nt.class],
            style: [nt == null ? void 0 : nt.style, ve && {
              height: P
            }]
          }), N);
        };
        return o ? ot(md, {
          ref: "virtualListRef",
          items: ce,
          itemSize: this.minRowHeight,
          visibleItemsTag: fF,
          visibleItemsProps: {
            clsPrefix: n,
            id: W,
            cols: u,
            onMouseleave: O
          },
          showScrollbar: !1,
          onResize: this.handleVirtualListResize,
          onScroll: this.handleVirtualListScroll,
          itemsStyle: g,
          itemResizable: !G,
          columns: u,
          renderItemWithCols: G ? ({
            itemIndex: $,
            item: D,
            startColIndex: ee,
            endColIndex: ve,
            getLeft: he
          }) => k({
            displayedRowIndex: $,
            isVirtual: !0,
            isVirtualX: !0,
            rowInfo: D,
            startColIndex: ee,
            endColIndex: ve,
            getLeft: he
          }) : void 0
        }, {
          default: ({
            item: $,
            index: D,
            renderedItemWithCols: ee
          }) => ee || k({
            rowInfo: $,
            displayedRowIndex: D,
            isVirtual: !0,
            isVirtualX: !1,
            startColIndex: 0,
            endColIndex: 0,
            getLeft(ve) {
              return 0;
            }
          })
        }) : ot("table", {
          class: `${n}-data-table-table`,
          onMouseleave: O,
          style: {
            tableLayout: this.mergedTableLayout
          }
        }, ot("colgroup", null, u.map(($) => ot("col", {
          key: $.key,
          style: $.style
        }))), this.showHeader ? ot(Kv, {
          discrete: !1
        }) : null, this.empty ? null : ot("tbody", {
          "data-n-id": W,
          class: `${n}-data-table-tbody`
        }, ce.map(($, D) => k({
          rowInfo: $,
          displayedRowIndex: D,
          isVirtual: !1,
          isVirtualX: !1,
          startColIndex: -1,
          endColIndex: -1,
          getLeft(ee) {
            return -1;
          }
        }))));
      }
    });
    if (this.empty) {
      const v = () => ot("div", {
        class: [`${n}-data-table-empty`, this.loading && `${n}-data-table-empty--hide`],
        style: this.bodyStyle,
        ref: "emptyElRef"
      }, wn(this.dataTableSlots.empty, () => [ot(uv, {
        theme: this.mergedTheme.peers.Empty,
        themeOverrides: this.mergedTheme.peerOverrides.Empty
      })]));
      return this.shouldDisplaySomeTablePart ? ot(sF, null, f, v()) : ot(Mo, {
        onResize: this.onResize
      }, {
        default: v
      });
    }
    return f;
  }
}), pF = window.Vue.computed, vF = window.Vue.defineComponent, rs = window.Vue.h, gF = window.Vue.inject, sa = window.Vue.ref, mF = window.Vue.watchEffect, bF = vF({
  name: "MainTable",
  setup() {
    const {
      mergedClsPrefixRef: e,
      rightFixedColumnsRef: t,
      leftFixedColumnsRef: n,
      bodyWidthRef: o,
      maxHeightRef: r,
      minHeightRef: i,
      flexHeightRef: l,
      virtualScrollHeaderRef: a,
      syncScrollState: s
    } = gF(yn), d = sa(null), c = sa(null), h = sa(null), p = sa(!(n.value.length || t.value.length)), g = pF(() => ({
      maxHeight: ft(r.value),
      minHeight: ft(i.value)
    }));
    function f(w) {
      o.value = w.contentRect.width, s(), p.value || (p.value = !0);
    }
    function v() {
      var w;
      const {
        value: x
      } = d;
      return x ? a.value ? ((w = x.virtualListRef) === null || w === void 0 ? void 0 : w.listElRef) || null : x.$el : null;
    }
    function m() {
      const {
        value: w
      } = c;
      return w ? w.getScrollContainer() : null;
    }
    const u = {
      getBodyElement: m,
      getHeaderElement: v,
      scrollTo(w, x) {
        var b;
        (b = c.value) === null || b === void 0 || b.scrollTo(w, x);
      }
    };
    return mF(() => {
      const {
        value: w
      } = h;
      if (!w) return;
      const x = `${e.value}-data-table-base-table--transition-disabled`;
      p.value ? setTimeout(() => {
        w.classList.remove(x);
      }, 0) : w.classList.add(x);
    }), Object.assign({
      maxHeight: r,
      mergedClsPrefix: e,
      selfElRef: h,
      headerInstRef: d,
      bodyInstRef: c,
      bodyStyle: g,
      flexHeight: l,
      handleBodyResize: f
    }, u);
  },
  render() {
    const {
      mergedClsPrefix: e,
      maxHeight: t,
      flexHeight: n
    } = this, o = t === void 0 && !n;
    return rs("div", {
      class: `${e}-data-table-base-table`,
      ref: "selfElRef"
    }, o ? null : rs(Kv, {
      ref: "headerInstRef"
    }), rs(hF, {
      ref: "bodyInstRef",
      bodyStyle: this.bodyStyle,
      showHeader: o,
      flexHeight: n,
      onResize: this.handleBodyResize
    }));
  }
}), Nf = yF(), wF = H([z("data-table", `
 width: 100%;
 font-size: var(--n-font-size);
 display: flex;
 flex-direction: column;
 position: relative;
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 --n-merged-th-color-hover: var(--n-th-color-hover);
 --n-merged-th-color-sorting: var(--n-th-color-sorting);
 --n-merged-td-color-hover: var(--n-td-color-hover);
 --n-merged-td-color-sorting: var(--n-td-color-sorting);
 --n-merged-td-color-striped: var(--n-td-color-striped);
 `, [z("data-table-wrapper", `
 flex-grow: 1;
 display: flex;
 flex-direction: column;
 `), U("flex-height", [H(">", [z("data-table-wrapper", [H(">", [z("data-table-base-table", `
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 `, [H(">", [z("data-table-base-table-body", "flex-basis: 0;", [
  // last-child means there is no empty icon
  // body is a scrollbar, we need to override height 100%
  H("&:last-child", "flex-grow: 1;")
])])])])])])]), H(">", [z("data-table-loading-wrapper", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [Ya({
  originalTransform: "translateX(-50%) translateY(-50%)"
})])]), z("data-table-expand-placeholder", `
 margin-right: 8px;
 display: inline-block;
 width: 16px;
 height: 1px;
 `), z("data-table-indent", `
 display: inline-block;
 height: 1px;
 `), z("data-table-expand-trigger", `
 display: inline-flex;
 margin-right: 8px;
 cursor: pointer;
 font-size: 16px;
 vertical-align: -0.2em;
 position: relative;
 width: 16px;
 height: 16px;
 color: var(--n-td-text-color);
 transition: color .3s var(--n-bezier);
 `, [U("expanded", [z("icon", "transform: rotate(90deg);", [dn({
  originalTransform: "rotate(90deg)"
})]), z("base-icon", "transform: rotate(90deg);", [dn({
  originalTransform: "rotate(90deg)"
})])]), z("base-loading", `
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [dn()]), z("icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [dn()]), z("base-icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [dn()])]), z("data-table-thead", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-merged-th-color);
 `), z("data-table-tr", `
 position: relative;
 box-sizing: border-box;
 background-clip: padding-box;
 transition: background-color .3s var(--n-bezier);
 `, [z("data-table-expand", `
 position: sticky;
 left: 0;
 overflow: hidden;
 margin: calc(var(--n-th-padding) * -1);
 padding: var(--n-th-padding);
 box-sizing: border-box;
 `), U("striped", "background-color: var(--n-merged-td-color-striped);", [z("data-table-td", "background-color: var(--n-merged-td-color-striped);")]), tt("summary", [H("&:hover", "background-color: var(--n-merged-td-color-hover);", [H(">", [z("data-table-td", "background-color: var(--n-merged-td-color-hover);")])])])]), z("data-table-th", `
 padding: var(--n-th-padding);
 position: relative;
 text-align: start;
 box-sizing: border-box;
 background-color: var(--n-merged-th-color);
 border-color: var(--n-merged-border-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 color: var(--n-th-text-color);
 transition:
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 font-weight: var(--n-th-font-weight);
 `, [U("filterable", `
 padding-right: 36px;
 `, [U("sortable", `
 padding-right: calc(var(--n-th-padding) + 36px);
 `)]), Nf, U("selection", `
 padding: 0;
 text-align: center;
 line-height: 0;
 z-index: 3;
 `), B("title-wrapper", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 max-width: 100%;
 `, [B("title", `
 flex: 1;
 min-width: 0;
 `)]), B("ellipsis", `
 display: inline-block;
 vertical-align: bottom;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 `), U("hover", `
 background-color: var(--n-merged-th-color-hover);
 `), U("sorting", `
 background-color: var(--n-merged-th-color-sorting);
 `), U("sortable", `
 cursor: pointer;
 `, [B("ellipsis", `
 max-width: calc(100% - 18px);
 `), H("&:hover", `
 background-color: var(--n-merged-th-color-hover);
 `)]), z("data-table-sorter", `
 height: var(--n-sorter-size);
 width: var(--n-sorter-size);
 margin-left: 4px;
 position: relative;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 vertical-align: -0.2em;
 color: var(--n-th-icon-color);
 transition: color .3s var(--n-bezier);
 `, [z("base-icon", "transition: transform .3s var(--n-bezier)"), U("desc", [z("base-icon", `
 transform: rotate(0deg);
 `)]), U("asc", [z("base-icon", `
 transform: rotate(-180deg);
 `)]), U("asc, desc", `
 color: var(--n-th-icon-color-active);
 `)]), z("data-table-resize-button", `
 width: var(--n-resizable-container-size);
 position: absolute;
 top: 0;
 right: calc(var(--n-resizable-container-size) / 2);
 bottom: 0;
 cursor: col-resize;
 user-select: none;
 `, [H("&::after", `
 width: var(--n-resizable-size);
 height: 50%;
 position: absolute;
 top: 50%;
 left: calc(var(--n-resizable-container-size) / 2);
 bottom: 0;
 background-color: var(--n-merged-border-color);
 transform: translateY(-50%);
 transition: background-color .3s var(--n-bezier);
 z-index: 1;
 content: '';
 `), U("active", [H("&::after", ` 
 background-color: var(--n-th-icon-color-active);
 `)]), H("&:hover::after", `
 background-color: var(--n-th-icon-color-active);
 `)]), z("data-table-filter", `
 position: absolute;
 z-index: auto;
 right: 0;
 width: 36px;
 top: 0;
 bottom: 0;
 cursor: pointer;
 display: flex;
 justify-content: center;
 align-items: center;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 font-size: var(--n-filter-size);
 color: var(--n-th-icon-color);
 `, [H("&:hover", `
 background-color: var(--n-th-button-color-hover);
 `), U("show", `
 background-color: var(--n-th-button-color-hover);
 `), U("active", `
 background-color: var(--n-th-button-color-hover);
 color: var(--n-th-icon-color-active);
 `)])]), z("data-table-td", `
 padding: var(--n-td-padding);
 text-align: start;
 box-sizing: border-box;
 border: none;
 background-color: var(--n-merged-td-color);
 color: var(--n-td-text-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `, [U("expand", [z("data-table-expand-trigger", `
 margin-right: 0;
 `)]), U("last-row", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [
  // make sure there is no overlap between bottom border and
  // fixed column box shadow
  H("&::after", `
 bottom: 0 !important;
 `),
  H("&::before", `
 bottom: 0 !important;
 `)
]), U("summary", `
 background-color: var(--n-merged-th-color);
 `), U("hover", `
 background-color: var(--n-merged-td-color-hover);
 `), U("sorting", `
 background-color: var(--n-merged-td-color-sorting);
 `), B("ellipsis", `
 display: inline-block;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 vertical-align: bottom;
 max-width: calc(100% - var(--indent-offset, -1.5) * 16px - 24px);
 `), U("selection, expand", `
 text-align: center;
 padding: 0;
 line-height: 0;
 `), Nf]), z("data-table-empty", `
 box-sizing: border-box;
 padding: var(--n-empty-padding);
 flex-grow: 1;
 flex-shrink: 0;
 opacity: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: opacity .3s var(--n-bezier);
 `, [U("hide", `
 opacity: 0;
 `)]), B("pagination", `
 margin: var(--n-pagination-margin);
 display: flex;
 justify-content: flex-end;
 `), z("data-table-wrapper", `
 position: relative;
 opacity: 1;
 transition: opacity .3s var(--n-bezier), border-color .3s var(--n-bezier);
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 line-height: var(--n-line-height);
 `), U("loading", [z("data-table-wrapper", `
 opacity: var(--n-opacity-loading);
 pointer-events: none;
 `)]), U("single-column", [z("data-table-td", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [H("&::after, &::before", `
 bottom: 0 !important;
 `)])]), tt("single-line", [z("data-table-th", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [U("last", `
 border-right: 0 solid var(--n-merged-border-color);
 `)]), z("data-table-td", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [U("last-col", `
 border-right: 0 solid var(--n-merged-border-color);
 `)])]), U("bordered", [z("data-table-wrapper", `
 border: 1px solid var(--n-merged-border-color);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 overflow: hidden;
 `)]), z("data-table-base-table", [U("transition-disabled", [z("data-table-th", [H("&::after, &::before", "transition: none;")]), z("data-table-td", [H("&::after, &::before", "transition: none;")])])]), U("bottom-bordered", [z("data-table-td", [U("last-row", `
 border-bottom: 1px solid var(--n-merged-border-color);
 `)])]), z("data-table-table", `
 font-variant-numeric: tabular-nums;
 width: 100%;
 word-break: break-word;
 transition: background-color .3s var(--n-bezier);
 border-collapse: separate;
 border-spacing: 0;
 background-color: var(--n-merged-td-color);
 `), z("data-table-base-table-header", `
 border-top-left-radius: calc(var(--n-border-radius) - 1px);
 border-top-right-radius: calc(var(--n-border-radius) - 1px);
 z-index: 3;
 overflow: scroll;
 flex-shrink: 0;
 transition: border-color .3s var(--n-bezier);
 scrollbar-width: none;
 `, [H("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 display: none;
 width: 0;
 height: 0;
 `)]), z("data-table-check-extra", `
 transition: color .3s var(--n-bezier);
 color: var(--n-th-icon-color);
 position: absolute;
 font-size: 14px;
 right: -4px;
 top: 50%;
 transform: translateY(-50%);
 z-index: 1;
 `)]), z("data-table-filter-menu", [z("scrollbar", `
 max-height: 240px;
 `), B("group", `
 display: flex;
 flex-direction: column;
 padding: 12px 12px 0 12px;
 `, [z("checkbox", `
 margin-bottom: 12px;
 margin-right: 0;
 `), z("radio", `
 margin-bottom: 12px;
 margin-right: 0;
 `)]), B("action", `
 padding: var(--n-action-padding);
 display: flex;
 flex-wrap: nowrap;
 justify-content: space-evenly;
 border-top: 1px solid var(--n-action-divider-color);
 `, [z("button", [H("&:not(:last-child)", `
 margin: var(--n-action-button-margin);
 `), H("&:last-child", `
 margin-right: 0;
 `)])]), z("divider", `
 margin: 0 !important;
 `)]), ld(z("data-table", `
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 --n-merged-th-color-hover: var(--n-th-color-hover-modal);
 --n-merged-td-color-hover: var(--n-td-color-hover-modal);
 --n-merged-th-color-sorting: var(--n-th-color-hover-modal);
 --n-merged-td-color-sorting: var(--n-td-color-hover-modal);
 --n-merged-td-color-striped: var(--n-td-color-striped-modal);
 `)), sd(z("data-table", `
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 --n-merged-th-color-hover: var(--n-th-color-hover-popover);
 --n-merged-td-color-hover: var(--n-td-color-hover-popover);
 --n-merged-th-color-sorting: var(--n-th-color-hover-popover);
 --n-merged-td-color-sorting: var(--n-td-color-hover-popover);
 --n-merged-td-color-striped: var(--n-td-color-striped-popover);
 `))]);
function yF() {
  return [U("fixed-left", `
 left: 0;
 position: sticky;
 z-index: 2;
 `, [H("&::after", `
 pointer-events: none;
 content: "";
 width: 36px;
 display: inline-block;
 position: absolute;
 top: 0;
 bottom: -1px;
 transition: box-shadow .2s var(--n-bezier);
 right: -36px;
 `)]), U("fixed-right", `
 right: 0;
 position: sticky;
 z-index: 1;
 `, [H("&::before", `
 pointer-events: none;
 content: "";
 width: 36px;
 display: inline-block;
 position: absolute;
 top: 0;
 bottom: -1px;
 transition: box-shadow .2s var(--n-bezier);
 left: -36px;
 `)])];
}
const kn = window.Vue.computed, xF = window.Vue.ref;
function CF(e, t) {
  const {
    paginatedDataRef: n,
    treeMateRef: o,
    selectionColumnRef: r
  } = t, i = xF(e.defaultCheckedRowKeys), l = kn(() => {
    var C;
    const {
      checkedRowKeys: S
    } = e, y = S === void 0 ? i.value : S;
    return ((C = r.value) === null || C === void 0 ? void 0 : C.multiple) === !1 ? {
      checkedKeys: y.slice(0, 1),
      indeterminateKeys: []
    } : o.value.getCheckedKeys(y, {
      cascade: e.cascade,
      allowNotLoaded: e.allowCheckingNotLoaded
    });
  }), a = kn(() => l.value.checkedKeys), s = kn(() => l.value.indeterminateKeys), d = kn(() => new Set(a.value)), c = kn(() => new Set(s.value)), h = kn(() => {
    const {
      value: C
    } = d;
    return n.value.reduce((S, y) => {
      const {
        key: T,
        disabled: R
      } = y;
      return S + (!R && C.has(T) ? 1 : 0);
    }, 0);
  }), p = kn(() => n.value.filter((C) => C.disabled).length), g = kn(() => {
    const {
      length: C
    } = n.value, {
      value: S
    } = c;
    return h.value > 0 && h.value < C - p.value || n.value.some((y) => S.has(y.key));
  }), f = kn(() => {
    const {
      length: C
    } = n.value;
    return h.value !== 0 && h.value === C - p.value;
  }), v = kn(() => n.value.length === 0);
  function m(C, S, y) {
    const {
      "onUpdate:checkedRowKeys": T,
      onUpdateCheckedRowKeys: R,
      onCheckedRowKeysChange: E
    } = e, W = [], {
      value: {
        getNode: _
      }
    } = o;
    C.forEach((M) => {
      var I;
      const O = (I = _(M)) === null || I === void 0 ? void 0 : I.rawNode;
      W.push(O);
    }), T && ie(T, C, W, {
      row: S,
      action: y
    }), R && ie(R, C, W, {
      row: S,
      action: y
    }), E && ie(E, C, W, {
      row: S,
      action: y
    }), i.value = C;
  }
  function u(C, S = !1, y) {
    if (!e.loading) {
      if (S) {
        m(Array.isArray(C) ? C.slice(0, 1) : [C], y, "check");
        return;
      }
      m(o.value.check(C, a.value, {
        cascade: e.cascade,
        allowNotLoaded: e.allowCheckingNotLoaded
      }).checkedKeys, y, "check");
    }
  }
  function w(C, S) {
    e.loading || m(o.value.uncheck(C, a.value, {
      cascade: e.cascade,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, S, "uncheck");
  }
  function x(C = !1) {
    const {
      value: S
    } = r;
    if (!S || e.loading) return;
    const y = [];
    (C ? o.value.treeNodes : n.value).forEach((T) => {
      T.disabled || y.push(T.key);
    }), m(o.value.check(y, a.value, {
      cascade: !0,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, void 0, "checkAll");
  }
  function b(C = !1) {
    const {
      value: S
    } = r;
    if (!S || e.loading) return;
    const y = [];
    (C ? o.value.treeNodes : n.value).forEach((T) => {
      T.disabled || y.push(T.key);
    }), m(o.value.uncheck(y, a.value, {
      cascade: !0,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, void 0, "uncheckAll");
  }
  return {
    mergedCheckedRowKeySetRef: d,
    mergedCheckedRowKeysRef: a,
    mergedInderminateRowKeySetRef: c,
    someRowsCheckedRef: g,
    allRowsCheckedRef: f,
    headerCheckboxDisabledRef: v,
    doUpdateCheckedRowKeys: m,
    doCheckAll: x,
    doUncheckAll: b,
    doCheck: u,
    doUncheck: w
  };
}
const SF = window.Vue.ref, Hf = window.Vue.toRef;
function $F(e, t) {
  const n = Me(() => {
    for (const d of e.columns)
      if (d.type === "expand")
        return d.renderExpand;
  }), o = Me(() => {
    let d;
    for (const c of e.columns)
      if (c.type === "expand") {
        d = c.expandable;
        break;
      }
    return d;
  }), r = SF(e.defaultExpandAll ? n != null && n.value ? (() => {
    const d = [];
    return t.value.treeNodes.forEach((c) => {
      var h;
      !((h = o.value) === null || h === void 0) && h.call(o, c.rawNode) && d.push(c.key);
    }), d;
  })() : t.value.getNonLeafKeys() : e.defaultExpandedRowKeys), i = Hf(e, "expandedRowKeys"), l = Hf(e, "stickyExpandedRows"), a = It(i, r);
  function s(d) {
    const {
      onUpdateExpandedRowKeys: c,
      "onUpdate:expandedRowKeys": h
    } = e;
    c && ie(c, d), h && ie(h, d), r.value = d;
  }
  return {
    stickyExpandedRowsRef: l,
    mergedExpandedRowKeysRef: a,
    renderExpandRef: n,
    expandableRef: o,
    doUpdateExpandedRowKeys: s
  };
}
const Lr = window.Vue.computed;
function RF(e, t) {
  const n = [], o = [], r = [], i = /* @__PURE__ */ new WeakMap();
  let l = -1, a = 0, s = !1, d = 0;
  function c(p, g) {
    g > l && (n[g] = [], l = g), p.forEach((f) => {
      if ("children" in f)
        c(f.children, g + 1);
      else {
        const v = "key" in f ? f.key : void 0;
        o.push({
          key: gn(f),
          style: cT(f, v !== void 0 ? ft(t(v)) : void 0),
          column: f,
          index: d++,
          // The width property is only applied to horizontally virtual scroll table
          width: f.width === void 0 ? 128 : Number(f.width)
        }), a += 1, s || (s = !!f.ellipsis), r.push(f);
      }
    });
  }
  c(e, 0), d = 0;
  function h(p, g) {
    let f = 0;
    p.forEach((v) => {
      var m;
      if ("children" in v) {
        const u = d, w = {
          column: v,
          colIndex: d,
          colSpan: 0,
          rowSpan: 1,
          isLast: !1
        };
        h(v.children, g + 1), v.children.forEach((x) => {
          var b, C;
          w.colSpan += (C = (b = i.get(x)) === null || b === void 0 ? void 0 : b.colSpan) !== null && C !== void 0 ? C : 0;
        }), u + w.colSpan === a && (w.isLast = !0), i.set(v, w), n[g].push(w);
      } else {
        if (d < f) {
          d += 1;
          return;
        }
        let u = 1;
        "titleColSpan" in v && (u = (m = v.titleColSpan) !== null && m !== void 0 ? m : 1), u > 1 && (f = d + u);
        const w = d + u === a, x = {
          column: v,
          colSpan: u,
          colIndex: d,
          rowSpan: l - g + 1,
          isLast: w
        };
        i.set(v, x), n[g].push(x), d += 1;
      }
    });
  }
  return h(e, 0), {
    hasEllipsis: s,
    rows: n,
    cols: o,
    dataRelatedCols: r
  };
}
function kF(e, t) {
  const n = Lr(() => RF(e.columns, t));
  return {
    rowsRef: Lr(() => n.value.rows),
    colsRef: Lr(() => n.value.cols),
    hasEllipsisRef: Lr(() => n.value.hasEllipsis),
    dataRelatedColsRef: Lr(() => n.value.dataRelatedCols)
  };
}
const PF = window.Vue.ref;
function _F() {
  const e = PF({});
  function t(r) {
    return e.value[r];
  }
  function n(r, i) {
    zv(r) && "key" in r && (e.value[r.key] = i);
  }
  function o() {
    e.value = {};
  }
  return {
    getResizableWidth: t,
    doUpdateResizableWidth: n,
    clearResizableWidth: o
  };
}
const Dr = window.Vue.computed, Nr = window.Vue.ref, TF = window.Vue.watch;
function FF(e, {
  mainTableInstRef: t,
  mergedCurrentPageRef: n,
  bodyWidthRef: o
}) {
  let r = 0;
  const i = Nr(), l = Nr(null), a = Nr([]), s = Nr(null), d = Nr([]), c = Dr(() => ft(e.scrollX)), h = Dr(() => e.columns.filter((R) => R.fixed === "left")), p = Dr(() => e.columns.filter((R) => R.fixed === "right")), g = Dr(() => {
    const R = {};
    let E = 0;
    function W(_) {
      _.forEach((M) => {
        const I = {
          start: E,
          end: 0
        };
        R[gn(M)] = I, "children" in M ? (W(M.children), I.end = E) : (E += wf(M) || 0, I.end = E);
      });
    }
    return W(h.value), R;
  }), f = Dr(() => {
    const R = {};
    let E = 0;
    function W(_) {
      for (let M = _.length - 1; M >= 0; --M) {
        const I = _[M], O = {
          start: E,
          end: 0
        };
        R[gn(I)] = O, "children" in I ? (W(I.children), O.end = E) : (E += wf(I) || 0, O.end = E);
      }
    }
    return W(p.value), R;
  });
  function v() {
    var R, E;
    const {
      value: W
    } = h;
    let _ = 0;
    const {
      value: M
    } = g;
    let I = null;
    for (let O = 0; O < W.length; ++O) {
      const K = gn(W[O]);
      if (r > (((R = M[K]) === null || R === void 0 ? void 0 : R.start) || 0) - _)
        I = K, _ = ((E = M[K]) === null || E === void 0 ? void 0 : E.end) || 0;
      else
        break;
    }
    l.value = I;
  }
  function m() {
    a.value = [];
    let R = e.columns.find((E) => gn(E) === l.value);
    for (; R && "children" in R; ) {
      const E = R.children.length;
      if (E === 0) break;
      const W = R.children[E - 1];
      a.value.push(gn(W)), R = W;
    }
  }
  function u() {
    var R, E;
    const {
      value: W
    } = p, _ = Number(e.scrollX), {
      value: M
    } = o;
    if (M === null) return;
    let I = 0, O = null;
    const {
      value: K
    } = f;
    for (let L = W.length - 1; L >= 0; --L) {
      const Y = gn(W[L]);
      if (Math.round(r + (((R = K[Y]) === null || R === void 0 ? void 0 : R.start) || 0) + M - I) < _)
        O = Y, I = ((E = K[Y]) === null || E === void 0 ? void 0 : E.end) || 0;
      else
        break;
    }
    s.value = O;
  }
  function w() {
    d.value = [];
    let R = e.columns.find((E) => gn(E) === s.value);
    for (; R && "children" in R && R.children.length; ) {
      const E = R.children[0];
      d.value.push(gn(E)), R = E;
    }
  }
  function x() {
    const R = t.value ? t.value.getHeaderElement() : null, E = t.value ? t.value.getBodyElement() : null;
    return {
      header: R,
      body: E
    };
  }
  function b() {
    const {
      body: R
    } = x();
    R && (R.scrollTop = 0);
  }
  function C() {
    i.value !== "body" ? ri(y) : i.value = void 0;
  }
  function S(R) {
    var E;
    (E = e.onScroll) === null || E === void 0 || E.call(e, R), i.value !== "head" ? ri(y) : i.value = void 0;
  }
  function y() {
    const {
      header: R,
      body: E
    } = x();
    if (!E) return;
    const {
      value: W
    } = o;
    if (W !== null) {
      if (e.maxHeight || e.flexHeight) {
        if (!R) return;
        const _ = r - R.scrollLeft;
        i.value = _ !== 0 ? "head" : "body", i.value === "head" ? (r = R.scrollLeft, E.scrollLeft = r) : (r = E.scrollLeft, R.scrollLeft = r);
      } else
        r = E.scrollLeft;
      v(), m(), u(), w();
    }
  }
  function T(R) {
    const {
      header: E
    } = x();
    E && (E.scrollLeft = R, y());
  }
  return TF(n, () => {
    b();
  }), {
    styleScrollXRef: c,
    fixedColumnLeftMapRef: g,
    fixedColumnRightMapRef: f,
    leftFixedColumnsRef: h,
    rightFixedColumnsRef: p,
    leftActiveFixedColKeyRef: l,
    leftActiveFixedChildrenColKeysRef: a,
    rightActiveFixedColKeyRef: s,
    rightActiveFixedChildrenColKeysRef: d,
    syncScrollState: y,
    handleTableBodyScroll: S,
    handleTableHeaderScroll: C,
    setHeaderScrollLeft: T
  };
}
const jf = window.Vue.computed, EF = window.Vue.ref;
function da(e) {
  return typeof e == "object" && typeof e.multiple == "number" ? e.multiple : !1;
}
function zF(e, t) {
  return t && (e === void 0 || e === "default" || typeof e == "object" && e.compare === "default") ? OF(t) : typeof e == "function" ? e : e && typeof e == "object" && e.compare && e.compare !== "default" ? e.compare : !1;
}
function OF(e) {
  return (t, n) => {
    const o = t[e], r = n[e];
    return o == null ? r == null ? 0 : -1 : r == null ? 1 : typeof o == "number" && typeof r == "number" ? o - r : typeof o == "string" && typeof r == "string" ? o.localeCompare(r) : 0;
  };
}
function MF(e, {
  dataRelatedColsRef: t,
  filteredDataRef: n
}) {
  const o = [];
  t.value.forEach((g) => {
    var f;
    g.sorter !== void 0 && p(o, {
      columnKey: g.key,
      sorter: g.sorter,
      order: (f = g.defaultSortOrder) !== null && f !== void 0 ? f : !1
    });
  });
  const r = EF(o), i = jf(() => {
    const g = t.value.filter((m) => m.type !== "selection" && m.sorter !== void 0 && (m.sortOrder === "ascend" || m.sortOrder === "descend" || m.sortOrder === !1)), f = g.filter((m) => m.sortOrder !== !1);
    if (f.length)
      return f.map((m) => ({
        columnKey: m.key,
        // column to sort has controlled sorter
        // sorter && sort order won't be undefined
        order: m.sortOrder,
        sorter: m.sorter
      }));
    if (g.length) return [];
    const {
      value: v
    } = r;
    return Array.isArray(v) ? v : v ? [v] : [];
  }), l = jf(() => {
    const g = i.value.slice().sort((f, v) => {
      const m = da(f.sorter) || 0;
      return (da(v.sorter) || 0) - m;
    });
    return g.length ? n.value.slice().sort((v, m) => {
      let u = 0;
      return g.some((w) => {
        const {
          columnKey: x,
          sorter: b,
          order: C
        } = w, S = zF(b, x);
        return S && C && (u = S(v.rawNode, m.rawNode), u !== 0) ? (u = u * sT(C), !0) : !1;
      }), u;
    }) : n.value;
  });
  function a(g) {
    let f = i.value.slice();
    return g && da(g.sorter) !== !1 ? (f = f.filter((v) => da(v.sorter) !== !1), p(f, g), f) : g || null;
  }
  function s(g) {
    const f = a(g);
    d(f);
  }
  function d(g) {
    const {
      "onUpdate:sorter": f,
      onUpdateSorter: v,
      onSorterChange: m
    } = e;
    f && ie(f, g), v && ie(v, g), m && ie(m, g), r.value = g;
  }
  function c(g, f = "ascend") {
    if (!g)
      h();
    else {
      const v = t.value.find((u) => u.type !== "selection" && u.type !== "expand" && u.key === g);
      if (!(v != null && v.sorter)) return;
      const m = v.sorter;
      s({
        columnKey: g,
        sorter: m,
        order: f
      });
    }
  }
  function h() {
    d(null);
  }
  function p(g, f) {
    const v = g.findIndex((m) => (f == null ? void 0 : f.columnKey) && m.columnKey === f.columnKey);
    v !== void 0 && v >= 0 ? g[v] = f : g.push(f);
  }
  return {
    clearSorter: h,
    sort: c,
    sortedDataRef: l,
    mergedSortStateRef: i,
    deriveNextSorter: s
  };
}
const vn = window.Vue.computed, ca = window.Vue.ref;
function IF(e, {
  dataRelatedColsRef: t
}) {
  const n = vn(() => {
    const q = (A) => {
      for (let G = 0; G < A.length; ++G) {
        const Z = A[G];
        if ("children" in Z)
          return q(Z.children);
        if (Z.type === "selection")
          return Z;
      }
      return null;
    };
    return q(e.columns);
  }), o = vn(() => {
    const {
      childrenKey: q
    } = e;
    return Xa(e.data, {
      ignoreEmptyChildren: !0,
      getKey: e.rowKey,
      getChildren: (A) => A[q],
      getDisabled: (A) => {
        var G, Z;
        return !!(!((Z = (G = n.value) === null || G === void 0 ? void 0 : G.disabled) === null || Z === void 0) && Z.call(G, A));
      }
    });
  }), r = Me(() => {
    const {
      columns: q
    } = e, {
      length: A
    } = q;
    let G = null;
    for (let Z = 0; Z < A; ++Z) {
      const ae = q[Z];
      if (!ae.type && G === null && (G = Z), "tree" in ae && ae.tree)
        return Z;
    }
    return G || 0;
  }), i = ca({}), {
    pagination: l
  } = e, a = ca(l && l.defaultPage || 1), s = ca(kv(l)), d = vn(() => {
    const q = t.value.filter((Z) => Z.filterOptionValues !== void 0 || Z.filterOptionValue !== void 0), A = {};
    return q.forEach((Z) => {
      var ae;
      Z.type === "selection" || Z.type === "expand" || (Z.filterOptionValues === void 0 ? A[Z.key] = (ae = Z.filterOptionValue) !== null && ae !== void 0 ? ae : null : A[Z.key] = Z.filterOptionValues);
    }), Object.assign(yf(i.value), A);
  }), c = vn(() => {
    const q = d.value, {
      columns: A
    } = e;
    function G(le) {
      return (de, ge) => !!~String(ge[le]).indexOf(String(de));
    }
    const {
      value: {
        treeNodes: Z
      }
    } = o, ae = [];
    return A.forEach((le) => {
      le.type === "selection" || le.type === "expand" || "children" in le || ae.push([le.key, le]);
    }), Z ? Z.filter((le) => {
      const {
        rawNode: de
      } = le;
      for (const [ge, X] of ae) {
        let ce = q[ge];
        if (ce == null || (Array.isArray(ce) || (ce = [ce]), !ce.length)) continue;
        const Pe = X.filter === "default" ? G(ge) : X.filter;
        if (X && typeof Pe == "function")
          if (X.filterMode === "and") {
            if (ce.some((me) => !Pe(me, de)))
              return !1;
          } else {
            if (ce.some((me) => Pe(me, de)))
              continue;
            return !1;
          }
      }
      return !0;
    }) : [];
  }), {
    sortedDataRef: h,
    deriveNextSorter: p,
    mergedSortStateRef: g,
    sort: f,
    clearSorter: v
  } = MF(e, {
    dataRelatedColsRef: t,
    filteredDataRef: c
  });
  t.value.forEach((q) => {
    var A;
    if (q.filter) {
      const G = q.defaultFilterOptionValues;
      q.filterMultiple ? i.value[q.key] = G || [] : G !== void 0 ? i.value[q.key] = G === null ? [] : G : i.value[q.key] = (A = q.defaultFilterOptionValue) !== null && A !== void 0 ? A : null;
    }
  });
  const m = vn(() => {
    const {
      pagination: q
    } = e;
    if (q !== !1)
      return q.page;
  }), u = vn(() => {
    const {
      pagination: q
    } = e;
    if (q !== !1)
      return q.pageSize;
  }), w = It(m, a), x = It(u, s), b = Me(() => {
    const q = w.value;
    return e.remote ? q : Math.max(1, Math.min(Math.ceil(c.value.length / x.value), q));
  }), C = vn(() => {
    const {
      pagination: q
    } = e;
    if (q) {
      const {
        pageCount: A
      } = q;
      if (A !== void 0) return A;
    }
  }), S = vn(() => {
    if (e.remote) return o.value.treeNodes;
    if (!e.pagination) return h.value;
    const q = x.value, A = (b.value - 1) * q;
    return h.value.slice(A, A + q);
  }), y = vn(() => S.value.map((q) => q.rawNode));
  function T(q) {
    const {
      pagination: A
    } = e;
    if (A) {
      const {
        onChange: G,
        "onUpdate:page": Z,
        onUpdatePage: ae
      } = A;
      G && ie(G, q), ae && ie(ae, q), Z && ie(Z, q), _(q);
    }
  }
  function R(q) {
    const {
      pagination: A
    } = e;
    if (A) {
      const {
        onPageSizeChange: G,
        "onUpdate:pageSize": Z,
        onUpdatePageSize: ae
      } = A;
      G && ie(G, q), ae && ie(ae, q), Z && ie(Z, q), M(q);
    }
  }
  const E = vn(() => {
    if (e.remote) {
      const {
        pagination: q
      } = e;
      if (q) {
        const {
          itemCount: A
        } = q;
        if (A !== void 0) return A;
      }
      return;
    }
    return c.value.length;
  }), W = vn(() => Object.assign(Object.assign({}, e.pagination), {
    // reset deprecated methods
    onChange: void 0,
    onUpdatePage: void 0,
    onUpdatePageSize: void 0,
    onPageSizeChange: void 0,
    "onUpdate:page": T,
    "onUpdate:pageSize": R,
    // writing merged props after pagination to avoid
    // pagination[key] === undefined
    // key still exists but value is undefined
    page: b.value,
    pageSize: x.value,
    pageCount: E.value === void 0 ? C.value : void 0,
    itemCount: E.value
  }));
  function _(q) {
    const {
      "onUpdate:page": A,
      onPageChange: G,
      onUpdatePage: Z
    } = e;
    Z && ie(Z, q), A && ie(A, q), G && ie(G, q), a.value = q;
  }
  function M(q) {
    const {
      "onUpdate:pageSize": A,
      onPageSizeChange: G,
      onUpdatePageSize: Z
    } = e;
    G && ie(G, q), Z && ie(Z, q), A && ie(A, q), s.value = q;
  }
  function I(q, A) {
    const {
      onUpdateFilters: G,
      "onUpdate:filters": Z,
      onFiltersChange: ae
    } = e;
    G && ie(G, q, A), Z && ie(Z, q, A), ae && ie(ae, q, A), i.value = q;
  }
  function O(q, A, G, Z) {
    var ae;
    (ae = e.onUnstableColumnResize) === null || ae === void 0 || ae.call(e, q, A, G, Z);
  }
  function K(q) {
    _(q);
  }
  function L() {
    Y();
  }
  function Y() {
    Q({});
  }
  function Q(q) {
    J(q);
  }
  function J(q) {
    q ? q && (i.value = yf(q)) : i.value = {};
  }
  return {
    treeMateRef: o,
    mergedCurrentPageRef: b,
    mergedPaginationRef: W,
    paginatedDataRef: S,
    rawPaginatedDataRef: y,
    mergedFilterStateRef: d,
    mergedSortStateRef: g,
    hoverKeyRef: ca(null),
    selectionColumnRef: n,
    childTriggerColIndexRef: r,
    doUpdateFilters: I,
    deriveNextSorter: p,
    doUpdatePageSize: M,
    doUpdatePage: _,
    onUnstableColumnResize: O,
    // exported methods
    filter: J,
    filters: Q,
    clearFilter: L,
    clearFilters: Y,
    clearSorter: v,
    page: K,
    sort: f
  };
}
const ro = window.Vue.computed, AF = window.Vue.defineComponent, io = window.Vue.h, VF = window.Vue.provide, is = window.Vue.ref, pt = window.Vue.toRef, BF = window.Vue.Transition;
window.Vue.watchEffect;
const LF = AF({
  name: "DataTable",
  alias: ["AdvancedTable"],
  props: aT,
  slots: Object,
  setup(e, {
    slots: t
  }) {
    const {
      mergedBorderedRef: n,
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = je(e), l = At("DataTable", i, o), a = ro(() => {
      const {
        bottomBordered: P
      } = e;
      return n.value ? !1 : P !== void 0 ? P : !0;
    }), s = ke("DataTable", "-data-table", wF, iT, e, o), d = is(null), c = is(null), {
      getResizableWidth: h,
      clearResizableWidth: p,
      doUpdateResizableWidth: g
    } = _F(), {
      rowsRef: f,
      colsRef: v,
      dataRelatedColsRef: m,
      hasEllipsisRef: u
    } = kF(e, h), {
      treeMateRef: w,
      mergedCurrentPageRef: x,
      paginatedDataRef: b,
      rawPaginatedDataRef: C,
      selectionColumnRef: S,
      hoverKeyRef: y,
      mergedPaginationRef: T,
      mergedFilterStateRef: R,
      mergedSortStateRef: E,
      childTriggerColIndexRef: W,
      doUpdatePage: _,
      doUpdateFilters: M,
      onUnstableColumnResize: I,
      deriveNextSorter: O,
      filter: K,
      filters: L,
      clearFilter: Y,
      clearFilters: Q,
      clearSorter: J,
      page: q,
      sort: A
    } = IF(e, {
      dataRelatedColsRef: m
    }), G = (P) => {
      const {
        fileName: N = "data.csv",
        keepOriginalData: te = !1
      } = P || {}, se = te ? e.data : C.value, ue = pT(e.columns, se, e.getCsvCell, e.getCsvHeader), be = new Blob([ue], {
        type: "text/csv;charset=utf-8"
      }), we = URL.createObjectURL(be);
      Hy(we, N.endsWith(".csv") ? N : `${N}.csv`), URL.revokeObjectURL(we);
    }, {
      doCheckAll: Z,
      doUncheckAll: ae,
      doCheck: le,
      doUncheck: de,
      headerCheckboxDisabledRef: ge,
      someRowsCheckedRef: X,
      allRowsCheckedRef: ce,
      mergedCheckedRowKeySetRef: Pe,
      mergedInderminateRowKeySetRef: me
    } = CF(e, {
      selectionColumnRef: S,
      treeMateRef: w,
      paginatedDataRef: b
    }), {
      stickyExpandedRowsRef: $e,
      mergedExpandedRowKeysRef: Se,
      renderExpandRef: Le,
      expandableRef: Ie,
      doUpdateExpandedRowKeys: re
    } = $F(e, w), {
      handleTableBodyScroll: k,
      handleTableHeaderScroll: $,
      syncScrollState: D,
      setHeaderScrollLeft: ee,
      leftActiveFixedColKeyRef: ve,
      leftActiveFixedChildrenColKeysRef: he,
      rightActiveFixedColKeyRef: F,
      rightActiveFixedChildrenColKeysRef: j,
      leftFixedColumnsRef: pe,
      rightFixedColumnsRef: Fe,
      fixedColumnLeftMapRef: dt,
      fixedColumnRightMapRef: bt
    } = FF(e, {
      bodyWidthRef: d,
      mainTableInstRef: c,
      mergedCurrentPageRef: x
    }), {
      localeRef: Je
    } = vr("DataTable"), Qe = ro(() => e.virtualScroll || e.flexHeight || e.maxHeight !== void 0 || u.value ? "fixed" : e.tableLayout);
    VF(yn, {
      props: e,
      treeMateRef: w,
      renderExpandIconRef: pt(e, "renderExpandIcon"),
      loadingKeySetRef: is(/* @__PURE__ */ new Set()),
      slots: t,
      indentRef: pt(e, "indent"),
      childTriggerColIndexRef: W,
      bodyWidthRef: d,
      componentId: ai(),
      hoverKeyRef: y,
      mergedClsPrefixRef: o,
      mergedThemeRef: s,
      scrollXRef: ro(() => e.scrollX),
      rowsRef: f,
      colsRef: v,
      paginatedDataRef: b,
      leftActiveFixedColKeyRef: ve,
      leftActiveFixedChildrenColKeysRef: he,
      rightActiveFixedColKeyRef: F,
      rightActiveFixedChildrenColKeysRef: j,
      leftFixedColumnsRef: pe,
      rightFixedColumnsRef: Fe,
      fixedColumnLeftMapRef: dt,
      fixedColumnRightMapRef: bt,
      mergedCurrentPageRef: x,
      someRowsCheckedRef: X,
      allRowsCheckedRef: ce,
      mergedSortStateRef: E,
      mergedFilterStateRef: R,
      loadingRef: pt(e, "loading"),
      rowClassNameRef: pt(e, "rowClassName"),
      mergedCheckedRowKeySetRef: Pe,
      mergedExpandedRowKeysRef: Se,
      mergedInderminateRowKeySetRef: me,
      localeRef: Je,
      expandableRef: Ie,
      stickyExpandedRowsRef: $e,
      rowKeyRef: pt(e, "rowKey"),
      renderExpandRef: Le,
      summaryRef: pt(e, "summary"),
      virtualScrollRef: pt(e, "virtualScroll"),
      virtualScrollXRef: pt(e, "virtualScrollX"),
      heightForRowRef: pt(e, "heightForRow"),
      minRowHeightRef: pt(e, "minRowHeight"),
      virtualScrollHeaderRef: pt(e, "virtualScrollHeader"),
      headerHeightRef: pt(e, "headerHeight"),
      rowPropsRef: pt(e, "rowProps"),
      stripedRef: pt(e, "striped"),
      checkOptionsRef: ro(() => {
        const {
          value: P
        } = S;
        return P == null ? void 0 : P.options;
      }),
      rawPaginatedDataRef: C,
      filterMenuCssVarsRef: ro(() => {
        const {
          self: {
            actionDividerColor: P,
            actionPadding: N,
            actionButtonMargin: te
          }
        } = s.value;
        return {
          "--n-action-padding": N,
          "--n-action-button-margin": te,
          "--n-action-divider-color": P
        };
      }),
      onLoadRef: pt(e, "onLoad"),
      mergedTableLayoutRef: Qe,
      maxHeightRef: pt(e, "maxHeight"),
      minHeightRef: pt(e, "minHeight"),
      flexHeightRef: pt(e, "flexHeight"),
      headerCheckboxDisabledRef: ge,
      paginationBehaviorOnFilterRef: pt(e, "paginationBehaviorOnFilter"),
      summaryPlacementRef: pt(e, "summaryPlacement"),
      filterIconPopoverPropsRef: pt(e, "filterIconPopoverProps"),
      scrollbarPropsRef: pt(e, "scrollbarProps"),
      syncScrollState: D,
      doUpdatePage: _,
      doUpdateFilters: M,
      getResizableWidth: h,
      onUnstableColumnResize: I,
      clearResizableWidth: p,
      doUpdateResizableWidth: g,
      deriveNextSorter: O,
      doCheck: le,
      doUncheck: de,
      doCheckAll: Z,
      doUncheckAll: ae,
      doUpdateExpandedRowKeys: re,
      handleTableHeaderScroll: $,
      handleTableBodyScroll: k,
      setHeaderScrollLeft: ee,
      renderCell: pt(e, "renderCell")
    });
    const wt = {
      filter: K,
      filters: L,
      clearFilters: Q,
      clearSorter: J,
      page: q,
      sort: A,
      clearFilter: Y,
      downloadCsv: G,
      scrollTo: (P, N) => {
        var te;
        (te = c.value) === null || te === void 0 || te.scrollTo(P, N);
      }
    }, nt = ro(() => {
      const {
        size: P
      } = e, {
        common: {
          cubicBezierEaseInOut: N
        },
        self: {
          borderColor: te,
          tdColorHover: se,
          tdColorSorting: ue,
          tdColorSortingModal: be,
          tdColorSortingPopover: we,
          thColorSorting: Ce,
          thColorSortingModal: Ve,
          thColorSortingPopover: it,
          thColor: He,
          thColorHover: Tt,
          tdColor: Vt,
          tdTextColor: Bt,
          thTextColor: Wt,
          thFontWeight: Ut,
          thButtonColorHover: on,
          thIconColor: Kt,
          thIconColorActive: V,
          filterSize: ne,
          borderRadius: xe,
          lineHeight: ze,
          tdColorModal: We,
          thColorModal: Be,
          borderColorModal: at,
          thColorHoverModal: ht,
          tdColorHoverModal: Jt,
          borderColorPopover: In,
          thColorPopover: An,
          tdColorPopover: wo,
          tdColorHoverPopover: yr,
          thColorHoverPopover: xr,
          paginationMargin: Cr,
          emptyPadding: Sr,
          boxShadowAfter: $r,
          boxShadowBefore: Yn,
          sorterSize: Zn,
          resizableContainerSize: Ja,
          resizableSize: Qa,
          loadingColor: el,
          loadingSize: tl,
          opacityLoading: nl,
          tdColorStriped: ol,
          tdColorStripedModal: rl,
          tdColorStripedPopover: il,
          [oe("fontSize", P)]: al,
          [oe("thPadding", P)]: ll,
          [oe("tdPadding", P)]: sl
        }
      } = s.value;
      return {
        "--n-font-size": al,
        "--n-th-padding": ll,
        "--n-td-padding": sl,
        "--n-bezier": N,
        "--n-border-radius": xe,
        "--n-line-height": ze,
        "--n-border-color": te,
        "--n-border-color-modal": at,
        "--n-border-color-popover": In,
        "--n-th-color": He,
        "--n-th-color-hover": Tt,
        "--n-th-color-modal": Be,
        "--n-th-color-hover-modal": ht,
        "--n-th-color-popover": An,
        "--n-th-color-hover-popover": xr,
        "--n-td-color": Vt,
        "--n-td-color-hover": se,
        "--n-td-color-modal": We,
        "--n-td-color-hover-modal": Jt,
        "--n-td-color-popover": wo,
        "--n-td-color-hover-popover": yr,
        "--n-th-text-color": Wt,
        "--n-td-text-color": Bt,
        "--n-th-font-weight": Ut,
        "--n-th-button-color-hover": on,
        "--n-th-icon-color": Kt,
        "--n-th-icon-color-active": V,
        "--n-filter-size": ne,
        "--n-pagination-margin": Cr,
        "--n-empty-padding": Sr,
        "--n-box-shadow-before": Yn,
        "--n-box-shadow-after": $r,
        "--n-sorter-size": Zn,
        "--n-resizable-container-size": Ja,
        "--n-resizable-size": Qa,
        "--n-loading-size": tl,
        "--n-loading-color": el,
        "--n-opacity-loading": nl,
        "--n-td-color-striped": ol,
        "--n-td-color-striped-modal": rl,
        "--n-td-color-striped-popover": il,
        "--n-td-color-sorting": ue,
        "--n-td-color-sorting-modal": be,
        "--n-td-color-sorting-popover": we,
        "--n-th-color-sorting": Ce,
        "--n-th-color-sorting-modal": Ve,
        "--n-th-color-sorting-popover": it
      };
    }), fe = r ? St("data-table", ro(() => e.size[0]), nt, e) : void 0, Re = ro(() => {
      if (!e.pagination) return !1;
      if (e.paginateSinglePage) return !0;
      const P = T.value, {
        pageCount: N
      } = P;
      return N !== void 0 ? N > 1 : P.itemCount && P.pageSize && P.itemCount > P.pageSize;
    });
    return Object.assign({
      mainTableInstRef: c,
      mergedClsPrefix: o,
      rtlEnabled: l,
      mergedTheme: s,
      paginatedData: b,
      mergedBordered: n,
      mergedBottomBordered: a,
      mergedPagination: T,
      mergedShowPagination: Re,
      cssVars: r ? void 0 : nt,
      themeClass: fe == null ? void 0 : fe.themeClass,
      onRender: fe == null ? void 0 : fe.onRender
    }, wt);
  },
  render() {
    const {
      mergedClsPrefix: e,
      themeClass: t,
      onRender: n,
      $slots: o,
      spinProps: r
    } = this;
    return n == null || n(), io("div", {
      class: [`${e}-data-table`, this.rtlEnabled && `${e}-data-table--rtl`, t, {
        [`${e}-data-table--bordered`]: this.mergedBordered,
        [`${e}-data-table--bottom-bordered`]: this.mergedBottomBordered,
        [`${e}-data-table--single-line`]: this.singleLine,
        [`${e}-data-table--single-column`]: this.singleColumn,
        [`${e}-data-table--loading`]: this.loading,
        [`${e}-data-table--flex-height`]: this.flexHeight
      }],
      style: this.cssVars
    }, io("div", {
      class: `${e}-data-table-wrapper`
    }, io(bF, {
      ref: "mainTableInstRef"
    })), this.mergedShowPagination ? io("div", {
      class: `${e}-data-table__pagination`
    }, io(Y_, Object.assign({
      theme: this.mergedTheme.peers.Pagination,
      themeOverrides: this.mergedTheme.peerOverrides.Pagination,
      disabled: this.loading
    }, this.mergedPagination))) : null, io(BF, {
      name: "fade-in-scale-up-transition"
    }, {
      default: () => this.loading ? io("div", {
        class: `${e}-data-table-loading-wrapper`
      }, wn(o.loading, () => [io(br, Object.assign({
        clsPrefix: e,
        strokeWidth: 20
      }, r))])) : null
    }));
  }
}), DF = {
  gapSmall: "4px 8px",
  gapMedium: "8px 12px",
  gapLarge: "12px 16px"
};
function NF() {
  return DF;
}
const HF = {
  self: NF
};
let as;
function jF() {
  if (!hr) return !0;
  if (as === void 0) {
    const e = document.createElement("div");
    e.style.display = "flex", e.style.flexDirection = "column", e.style.rowGap = "1px", e.appendChild(document.createElement("div")), e.appendChild(document.createElement("div")), document.body.appendChild(e);
    const t = e.scrollHeight === 1;
    return document.body.removeChild(e), as = t;
  }
  return as;
}
const WF = window.Vue.Comment, UF = window.Vue.computed, KF = window.Vue.defineComponent, Wf = window.Vue.h, qF = Object.assign(Object.assign({}, ke.props), {
  align: String,
  justify: {
    type: String,
    default: "start"
  },
  inline: Boolean,
  vertical: Boolean,
  reverse: Boolean,
  size: {
    type: [String, Number, Array],
    default: "medium"
  },
  wrapItem: {
    type: Boolean,
    default: !0
  },
  itemClass: String,
  itemStyle: [String, Object],
  wrap: {
    type: Boolean,
    default: !0
  },
  // internal
  internalUseGap: {
    type: Boolean,
    default: void 0
  }
}), ao = KF({
  name: "Space",
  props: qF,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedRtlRef: n
    } = je(e), o = ke("Space", "-space", void 0, HF, e, t), r = At("Space", n, t);
    return {
      useGap: jF(),
      rtlEnabled: r,
      mergedClsPrefix: t,
      margin: UF(() => {
        const {
          size: i
        } = e;
        if (Array.isArray(i))
          return {
            horizontal: i[0],
            vertical: i[1]
          };
        if (typeof i == "number")
          return {
            horizontal: i,
            vertical: i
          };
        const {
          self: {
            [oe("gap", i)]: l
          }
        } = o.value, {
          row: a,
          col: s
        } = Wb(l);
        return {
          horizontal: Rt(s),
          vertical: Rt(a)
        };
      })
    };
  },
  render() {
    const {
      vertical: e,
      reverse: t,
      align: n,
      inline: o,
      justify: r,
      itemClass: i,
      itemStyle: l,
      margin: a,
      wrap: s,
      mergedClsPrefix: d,
      rtlEnabled: c,
      useGap: h,
      wrapItem: p,
      internalUseGap: g
    } = this, f = dr(bd(this), !1);
    if (!f.length) return null;
    const v = `${a.horizontal}px`, m = `${a.horizontal / 2}px`, u = `${a.vertical}px`, w = `${a.vertical / 2}px`, x = f.length - 1, b = r.startsWith("space-");
    return Wf("div", {
      role: "none",
      class: [`${d}-space`, c && `${d}-space--rtl`],
      style: {
        display: o ? "inline-flex" : "flex",
        flexDirection: e && !t ? "column" : e && t ? "column-reverse" : !e && t ? "row-reverse" : "row",
        justifyContent: ["start", "end"].includes(r) ? `flex-${r}` : r,
        flexWrap: !s || e ? "nowrap" : "wrap",
        marginTop: h || e ? "" : `-${w}`,
        marginBottom: h || e ? "" : `-${w}`,
        alignItems: n,
        gap: h ? `${a.vertical}px ${a.horizontal}px` : ""
      }
    }, !p && (h || g) ? f : f.map((C, S) => C.type === WF ? C : Wf("div", {
      role: "none",
      class: i,
      style: [l, {
        maxWidth: "100%"
      }, h ? "" : e ? {
        marginBottom: S !== x ? u : ""
      } : c ? {
        marginLeft: b ? r === "space-between" && S === x ? "" : m : S !== x ? v : "",
        marginRight: b ? r === "space-between" && S === 0 ? "" : m : "",
        paddingTop: w,
        paddingBottom: w
      } : {
        marginRight: b ? r === "space-between" && S === x ? "" : m : S !== x ? v : "",
        marginLeft: b ? r === "space-between" && S === 0 ? "" : m : "",
        paddingTop: w,
        paddingBottom: w
      }]
    }, C)));
  }
}), GF = {
  feedbackPadding: "4px 0 0 2px",
  feedbackHeightSmall: "24px",
  feedbackHeightMedium: "24px",
  feedbackHeightLarge: "26px",
  feedbackFontSizeSmall: "13px",
  feedbackFontSizeMedium: "14px",
  feedbackFontSizeLarge: "14px",
  labelFontSizeLeftSmall: "14px",
  labelFontSizeLeftMedium: "14px",
  labelFontSizeLeftLarge: "15px",
  labelFontSizeTopSmall: "13px",
  labelFontSizeTopMedium: "14px",
  labelFontSizeTopLarge: "14px",
  labelHeightSmall: "24px",
  labelHeightMedium: "26px",
  labelHeightLarge: "28px",
  labelPaddingVertical: "0 0 6px 2px",
  labelPaddingHorizontal: "0 12px 0 0",
  labelTextAlignVertical: "left",
  labelTextAlignHorizontal: "right",
  labelFontWeight: "400"
};
function XF(e) {
  const {
    heightSmall: t,
    heightMedium: n,
    heightLarge: o,
    textColor1: r,
    errorColor: i,
    warningColor: l,
    lineHeight: a,
    textColor3: s
  } = e;
  return Object.assign(Object.assign({}, GF), {
    blankHeightSmall: t,
    blankHeightMedium: n,
    blankHeightLarge: o,
    lineHeight: a,
    labelTextColor: r,
    asteriskColor: i,
    feedbackTextColorError: i,
    feedbackTextColorWarning: l,
    feedbackTextColor: s
  });
}
const Gv = {
  common: mt,
  self: XF
};
function YF(e) {
  const {
    textColorDisabled: t
  } = e;
  return {
    iconColorDisabled: t
  };
}
const ZF = {
  name: "InputNumber",
  common: mt,
  peers: {
    Button: Id,
    Input: Md
  },
  self: YF
};
function JF(e) {
  const {
    infoColor: t,
    successColor: n,
    warningColor: o,
    errorColor: r,
    textColor2: i,
    progressRailColor: l,
    fontSize: a,
    fontWeight: s
  } = e;
  return {
    fontSize: a,
    fontSizeCircle: "28px",
    fontWeightCircle: s,
    railColor: l,
    railHeight: "8px",
    iconSizeCircle: "36px",
    iconSizeLine: "18px",
    iconColor: t,
    iconColorInfo: t,
    iconColorSuccess: n,
    iconColorWarning: o,
    iconColorError: r,
    textColorCircle: i,
    textColorLineInner: "rgb(255, 255, 255)",
    textColorLineOuter: i,
    fillColor: t,
    fillColorInfo: t,
    fillColorSuccess: n,
    fillColorWarning: o,
    fillColorError: r,
    lineBgProcessing: "linear-gradient(90deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, .5) 100%)"
  };
}
const QF = {
  common: mt,
  self: JF
}, e3 = {
  buttonHeightSmall: "14px",
  buttonHeightMedium: "18px",
  buttonHeightLarge: "22px",
  buttonWidthSmall: "14px",
  buttonWidthMedium: "18px",
  buttonWidthLarge: "22px",
  buttonWidthPressedSmall: "20px",
  buttonWidthPressedMedium: "24px",
  buttonWidthPressedLarge: "28px",
  railHeightSmall: "18px",
  railHeightMedium: "22px",
  railHeightLarge: "26px",
  railWidthSmall: "32px",
  railWidthMedium: "40px",
  railWidthLarge: "48px"
};
function t3(e) {
  const {
    primaryColor: t,
    opacityDisabled: n,
    borderRadius: o,
    textColor3: r
  } = e;
  return Object.assign(Object.assign({}, e3), {
    iconColor: r,
    textColor: "white",
    loadingColor: t,
    opacityDisabled: n,
    railColor: "rgba(0, 0, 0, .14)",
    railColorActive: t,
    buttonBoxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",
    buttonColor: "#FFF",
    railBorderRadiusSmall: o,
    railBorderRadiusMedium: o,
    railBorderRadiusLarge: o,
    buttonBorderRadiusSmall: o,
    buttonBorderRadiusMedium: o,
    buttonBorderRadiusLarge: o,
    boxShadowFocus: `0 0 0 2px ${Ee(t, {
      alpha: 0.2
    })}`
  });
}
const n3 = {
  common: mt,
  self: t3
}, wi = "n-form", Xv = "n-form-item-insts", o3 = z("form", [U("inline", `
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `, [z("form-item", {
  width: "auto",
  marginRight: "18px"
}, [H("&:last-child", {
  marginRight: 0
})])])]);
var r3 = function(e, t, n, o) {
  function r(i) {
    return i instanceof n ? i : new n(function(l) {
      l(i);
    });
  }
  return new (n || (n = Promise))(function(i, l) {
    function a(c) {
      try {
        d(o.next(c));
      } catch (h) {
        l(h);
      }
    }
    function s(c) {
      try {
        d(o.throw(c));
      } catch (h) {
        l(h);
      }
    }
    function d(c) {
      c.done ? i(c.value) : r(c.value).then(a, s);
    }
    d((o = o.apply(e, t || [])).next());
  });
};
const i3 = window.Vue.defineComponent, a3 = window.Vue.h, Uf = window.Vue.provide, l3 = window.Vue.ref, s3 = Object.assign(Object.assign({}, ke.props), {
  inline: Boolean,
  labelWidth: [Number, String],
  labelAlign: String,
  labelPlacement: {
    type: String,
    default: "top"
  },
  model: {
    type: Object,
    default: () => {
    }
  },
  rules: Object,
  disabled: Boolean,
  size: String,
  showRequireMark: {
    type: Boolean,
    default: void 0
  },
  requireMarkPlacement: String,
  showFeedback: {
    type: Boolean,
    default: !0
  },
  onSubmit: {
    type: Function,
    default: (e) => {
      e.preventDefault();
    }
  },
  showLabel: {
    type: Boolean,
    default: void 0
  },
  validateMessages: Object
}), d3 = i3({
  name: "Form",
  props: s3,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = je(e);
    ke("Form", "-form", o3, Gv, e, t);
    const n = {}, o = l3(void 0), r = (s) => {
      const d = o.value;
      (d === void 0 || s >= d) && (o.value = s);
    };
    function i(s) {
      return r3(this, arguments, void 0, function* (d, c = () => !0) {
        return yield new Promise((h, p) => {
          const g = [];
          for (const f of di(n)) {
            const v = n[f];
            for (const m of v)
              m.path && g.push(m.internalValidate(null, c));
          }
          Promise.all(g).then((f) => {
            const v = f.some((w) => !w.valid), m = [], u = [];
            f.forEach((w) => {
              var x, b;
              !((x = w.errors) === null || x === void 0) && x.length && m.push(w.errors), !((b = w.warnings) === null || b === void 0) && b.length && u.push(w.warnings);
            }), d && d(m.length ? m : void 0, {
              warnings: u.length ? u : void 0
            }), v ? p(m.length ? m : void 0) : h({
              warnings: u.length ? u : void 0
            });
          });
        });
      });
    }
    function l() {
      for (const s of di(n)) {
        const d = n[s];
        for (const c of d)
          c.restoreValidation();
      }
    }
    return Uf(wi, {
      props: e,
      maxChildLabelWidthRef: o,
      deriveMaxChildLabelWidth: r
    }), Uf(Xv, {
      formItems: n
    }), Object.assign({
      validate: i,
      restoreValidation: l
    }, {
      mergedClsPrefix: t
    });
  },
  render() {
    const {
      mergedClsPrefix: e
    } = this;
    return a3("form", {
      class: [`${e}-form`, this.inline && `${e}-form--inline`],
      onSubmit: this.onSubmit
    }, this.$slots);
  }
});
function Fo() {
  return Fo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n)
        Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
  }, Fo.apply(this, arguments);
}
function c3(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, pi(e, t);
}
function qs(e) {
  return qs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, qs(e);
}
function pi(e, t) {
  return pi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, r) {
    return o.__proto__ = r, o;
  }, pi(e, t);
}
function u3() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function $a(e, t, n) {
  return u3() ? $a = Reflect.construct.bind() : $a = function(r, i, l) {
    var a = [null];
    a.push.apply(a, i);
    var s = Function.bind.apply(r, a), d = new s();
    return l && pi(d, l.prototype), d;
  }, $a.apply(null, arguments);
}
function f3(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function Gs(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Gs = function(o) {
    if (o === null || !f3(o)) return o;
    if (typeof o != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(o)) return t.get(o);
      t.set(o, r);
    }
    function r() {
      return $a(o, arguments, qs(this).constructor);
    }
    return r.prototype = Object.create(o.prototype, {
      constructor: {
        value: r,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), pi(r, o);
  }, Gs(e);
}
var h3 = /%[sdj%]/g, p3 = function() {
};
function Xs(e) {
  if (!e || !e.length) return null;
  var t = {};
  return e.forEach(function(n) {
    var o = n.field;
    t[o] = t[o] || [], t[o].push(n);
  }), t;
}
function nn(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
    n[o - 1] = arguments[o];
  var r = 0, i = n.length;
  if (typeof e == "function")
    return e.apply(null, n);
  if (typeof e == "string") {
    var l = e.replace(h3, function(a) {
      if (a === "%%")
        return "%";
      if (r >= i)
        return a;
      switch (a) {
        case "%s":
          return String(n[r++]);
        case "%d":
          return Number(n[r++]);
        case "%j":
          try {
            return JSON.stringify(n[r++]);
          } catch {
            return "[Circular]";
          }
          break;
        default:
          return a;
      }
    });
    return l;
  }
  return e;
}
function v3(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function kt(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || v3(t) && typeof e == "string" && !e);
}
function g3(e, t, n) {
  var o = [], r = 0, i = e.length;
  function l(a) {
    o.push.apply(o, a || []), r++, r === i && n(o);
  }
  e.forEach(function(a) {
    t(a, l);
  });
}
function Kf(e, t, n) {
  var o = 0, r = e.length;
  function i(l) {
    if (l && l.length) {
      n(l);
      return;
    }
    var a = o;
    o = o + 1, a < r ? t(e[a], i) : n([]);
  }
  i([]);
}
function m3(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    t.push.apply(t, e[n] || []);
  }), t;
}
var qf = /* @__PURE__ */ function(e) {
  c3(t, e);
  function t(n, o) {
    var r;
    return r = e.call(this, "Async Validation Error") || this, r.errors = n, r.fields = o, r;
  }
  return t;
}(/* @__PURE__ */ Gs(Error));
function b3(e, t, n, o, r) {
  if (t.first) {
    var i = new Promise(function(p, g) {
      var f = function(u) {
        return o(u), u.length ? g(new qf(u, Xs(u))) : p(r);
      }, v = m3(e);
      Kf(v, n, f);
    });
    return i.catch(function(p) {
      return p;
    }), i;
  }
  var l = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], a = Object.keys(e), s = a.length, d = 0, c = [], h = new Promise(function(p, g) {
    var f = function(m) {
      if (c.push.apply(c, m), d++, d === s)
        return o(c), c.length ? g(new qf(c, Xs(c))) : p(r);
    };
    a.length || (o(c), p(r)), a.forEach(function(v) {
      var m = e[v];
      l.indexOf(v) !== -1 ? Kf(m, n, f) : g3(m, n, f);
    });
  });
  return h.catch(function(p) {
    return p;
  }), h;
}
function w3(e) {
  return !!(e && e.message !== void 0);
}
function y3(e, t) {
  for (var n = e, o = 0; o < t.length; o++) {
    if (n == null)
      return n;
    n = n[t[o]];
  }
  return n;
}
function Gf(e, t) {
  return function(n) {
    var o;
    return e.fullFields ? o = y3(t, e.fullFields) : o = t[n.field || e.fullField], w3(n) ? (n.field = n.field || e.fullField, n.fieldValue = o, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: o,
      field: n.field || e.fullField
    };
  };
}
function Xf(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var o = t[n];
        typeof o == "object" && typeof e[n] == "object" ? e[n] = Fo({}, e[n], o) : e[n] = o;
      }
  }
  return e;
}
var Yv = function(t, n, o, r, i, l) {
  t.required && (!o.hasOwnProperty(t.field) || kt(n, l || t.type)) && r.push(nn(i.messages.required, t.fullField));
}, x3 = function(t, n, o, r, i) {
  (/^\s+$/.test(n) || n === "") && r.push(nn(i.messages.whitespace, t.fullField));
}, ua, C3 = function() {
  if (ua)
    return ua;
  var e = "[a-fA-F\\d:]", t = function(b) {
    return b && b.includeBoundaries ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))" : "";
  }, n = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}", o = "[a-fA-F\\d]{1,4}", r = (`
(?:
(?:` + o + ":){7}(?:" + o + `|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:` + o + ":){6}(?:" + n + "|:" + o + `|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:` + o + ":){5}(?::" + n + "|(?::" + o + `){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:` + o + ":){4}(?:(?::" + o + "){0,1}:" + n + "|(?::" + o + `){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:` + o + ":){3}(?:(?::" + o + "){0,2}:" + n + "|(?::" + o + `){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:` + o + ":){2}(?:(?::" + o + "){0,3}:" + n + "|(?::" + o + `){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:` + o + ":){1}(?:(?::" + o + "){0,4}:" + n + "|(?::" + o + `){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::` + o + "){0,5}:" + n + "|(?::" + o + `){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), i = new RegExp("(?:^" + n + "$)|(?:^" + r + "$)"), l = new RegExp("^" + n + "$"), a = new RegExp("^" + r + "$"), s = function(b) {
    return b && b.exact ? i : new RegExp("(?:" + t(b) + n + t(b) + ")|(?:" + t(b) + r + t(b) + ")", "g");
  };
  s.v4 = function(x) {
    return x && x.exact ? l : new RegExp("" + t(x) + n + t(x), "g");
  }, s.v6 = function(x) {
    return x && x.exact ? a : new RegExp("" + t(x) + r + t(x), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", c = "(?:\\S+(?::\\S*)?@)?", h = s.v4().source, p = s.v6().source, g = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", f = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", v = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", m = "(?::\\d{2,5})?", u = '(?:[/?#][^\\s"]*)?', w = "(?:" + d + "|www\\.)" + c + "(?:localhost|" + h + "|" + p + "|" + g + f + v + ")" + m + u;
  return ua = new RegExp("(?:^" + w + "$)", "i"), ua;
}, Yf = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, Wr = {
  integer: function(t) {
    return Wr.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return Wr.number(t) && !Wr.integer(t);
  },
  array: function(t) {
    return Array.isArray(t);
  },
  regexp: function(t) {
    if (t instanceof RegExp)
      return !0;
    try {
      return !!new RegExp(t);
    } catch {
      return !1;
    }
  },
  date: function(t) {
    return typeof t.getTime == "function" && typeof t.getMonth == "function" && typeof t.getYear == "function" && !isNaN(t.getTime());
  },
  number: function(t) {
    return isNaN(t) ? !1 : typeof t == "number";
  },
  object: function(t) {
    return typeof t == "object" && !Wr.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(Yf.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(C3());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(Yf.hex);
  }
}, S3 = function(t, n, o, r, i) {
  if (t.required && n === void 0) {
    Yv(t, n, o, r, i);
    return;
  }
  var l = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], a = t.type;
  l.indexOf(a) > -1 ? Wr[a](n) || r.push(nn(i.messages.types[a], t.fullField, t.type)) : a && typeof n !== t.type && r.push(nn(i.messages.types[a], t.fullField, t.type));
}, $3 = function(t, n, o, r, i) {
  var l = typeof t.len == "number", a = typeof t.min == "number", s = typeof t.max == "number", d = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, c = n, h = null, p = typeof n == "number", g = typeof n == "string", f = Array.isArray(n);
  if (p ? h = "number" : g ? h = "string" : f && (h = "array"), !h)
    return !1;
  f && (c = n.length), g && (c = n.replace(d, "_").length), l ? c !== t.len && r.push(nn(i.messages[h].len, t.fullField, t.len)) : a && !s && c < t.min ? r.push(nn(i.messages[h].min, t.fullField, t.min)) : s && !a && c > t.max ? r.push(nn(i.messages[h].max, t.fullField, t.max)) : a && s && (c < t.min || c > t.max) && r.push(nn(i.messages[h].range, t.fullField, t.min, t.max));
}, tr = "enum", R3 = function(t, n, o, r, i) {
  t[tr] = Array.isArray(t[tr]) ? t[tr] : [], t[tr].indexOf(n) === -1 && r.push(nn(i.messages[tr], t.fullField, t[tr].join(", ")));
}, k3 = function(t, n, o, r, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(n) || r.push(nn(i.messages.pattern.mismatch, t.fullField, n, t.pattern));
    else if (typeof t.pattern == "string") {
      var l = new RegExp(t.pattern);
      l.test(n) || r.push(nn(i.messages.pattern.mismatch, t.fullField, n, t.pattern));
    }
  }
}, Ae = {
  required: Yv,
  whitespace: x3,
  type: S3,
  range: $3,
  enum: R3,
  pattern: k3
}, P3 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (kt(n, "string") && !t.required)
      return o();
    Ae.required(t, n, r, l, i, "string"), kt(n, "string") || (Ae.type(t, n, r, l, i), Ae.range(t, n, r, l, i), Ae.pattern(t, n, r, l, i), t.whitespace === !0 && Ae.whitespace(t, n, r, l, i));
  }
  o(l);
}, _3 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (kt(n) && !t.required)
      return o();
    Ae.required(t, n, r, l, i), n !== void 0 && Ae.type(t, n, r, l, i);
  }
  o(l);
}, T3 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (n === "" && (n = void 0), kt(n) && !t.required)
      return o();
    Ae.required(t, n, r, l, i), n !== void 0 && (Ae.type(t, n, r, l, i), Ae.range(t, n, r, l, i));
  }
  o(l);
}, F3 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (kt(n) && !t.required)
      return o();
    Ae.required(t, n, r, l, i), n !== void 0 && Ae.type(t, n, r, l, i);
  }
  o(l);
}, E3 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (kt(n) && !t.required)
      return o();
    Ae.required(t, n, r, l, i), kt(n) || Ae.type(t, n, r, l, i);
  }
  o(l);
}, z3 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (kt(n) && !t.required)
      return o();
    Ae.required(t, n, r, l, i), n !== void 0 && (Ae.type(t, n, r, l, i), Ae.range(t, n, r, l, i));
  }
  o(l);
}, O3 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (kt(n) && !t.required)
      return o();
    Ae.required(t, n, r, l, i), n !== void 0 && (Ae.type(t, n, r, l, i), Ae.range(t, n, r, l, i));
  }
  o(l);
}, M3 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (n == null && !t.required)
      return o();
    Ae.required(t, n, r, l, i, "array"), n != null && (Ae.type(t, n, r, l, i), Ae.range(t, n, r, l, i));
  }
  o(l);
}, I3 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (kt(n) && !t.required)
      return o();
    Ae.required(t, n, r, l, i), n !== void 0 && Ae.type(t, n, r, l, i);
  }
  o(l);
}, A3 = "enum", V3 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (kt(n) && !t.required)
      return o();
    Ae.required(t, n, r, l, i), n !== void 0 && Ae[A3](t, n, r, l, i);
  }
  o(l);
}, B3 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (kt(n, "string") && !t.required)
      return o();
    Ae.required(t, n, r, l, i), kt(n, "string") || Ae.pattern(t, n, r, l, i);
  }
  o(l);
}, L3 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (kt(n, "date") && !t.required)
      return o();
    if (Ae.required(t, n, r, l, i), !kt(n, "date")) {
      var s;
      n instanceof Date ? s = n : s = new Date(n), Ae.type(t, s, r, l, i), s && Ae.range(t, s.getTime(), r, l, i);
    }
  }
  o(l);
}, D3 = function(t, n, o, r, i) {
  var l = [], a = Array.isArray(n) ? "array" : typeof n;
  Ae.required(t, n, r, l, i, a), o(l);
}, ls = function(t, n, o, r, i) {
  var l = t.type, a = [], s = t.required || !t.required && r.hasOwnProperty(t.field);
  if (s) {
    if (kt(n, l) && !t.required)
      return o();
    Ae.required(t, n, r, a, i, l), kt(n, l) || Ae.type(t, n, r, a, i);
  }
  o(a);
}, N3 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (kt(n) && !t.required)
      return o();
    Ae.required(t, n, r, l, i);
  }
  o(l);
}, Jr = {
  string: P3,
  method: _3,
  number: T3,
  boolean: F3,
  regexp: E3,
  integer: z3,
  float: O3,
  array: M3,
  object: I3,
  enum: V3,
  pattern: B3,
  date: L3,
  url: ls,
  hex: ls,
  email: ls,
  required: D3,
  any: N3
};
function Ys() {
  return {
    default: "Validation error on field %s",
    required: "%s is required",
    enum: "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      boolean: "%s is not a %s",
      integer: "%s is not an %s",
      float: "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function() {
      var t = JSON.parse(JSON.stringify(this));
      return t.clone = this.clone, t;
    }
  };
}
var Zs = Ys(), fr = /* @__PURE__ */ function() {
  function e(n) {
    this.rules = null, this._messages = Zs, this.define(n);
  }
  var t = e.prototype;
  return t.define = function(o) {
    var r = this;
    if (!o)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof o != "object" || Array.isArray(o))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(o).forEach(function(i) {
      var l = o[i];
      r.rules[i] = Array.isArray(l) ? l : [l];
    });
  }, t.messages = function(o) {
    return o && (this._messages = Xf(Ys(), o)), this._messages;
  }, t.validate = function(o, r, i) {
    var l = this;
    r === void 0 && (r = {}), i === void 0 && (i = function() {
    });
    var a = o, s = r, d = i;
    if (typeof s == "function" && (d = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
      return d && d(null, a), Promise.resolve(a);
    function c(v) {
      var m = [], u = {};
      function w(b) {
        if (Array.isArray(b)) {
          var C;
          m = (C = m).concat.apply(C, b);
        } else
          m.push(b);
      }
      for (var x = 0; x < v.length; x++)
        w(v[x]);
      m.length ? (u = Xs(m), d(m, u)) : d(null, a);
    }
    if (s.messages) {
      var h = this.messages();
      h === Zs && (h = Ys()), Xf(h, s.messages), s.messages = h;
    } else
      s.messages = this.messages();
    var p = {}, g = s.keys || Object.keys(this.rules);
    g.forEach(function(v) {
      var m = l.rules[v], u = a[v];
      m.forEach(function(w) {
        var x = w;
        typeof x.transform == "function" && (a === o && (a = Fo({}, a)), u = a[v] = x.transform(u)), typeof x == "function" ? x = {
          validator: x
        } : x = Fo({}, x), x.validator = l.getValidationMethod(x), x.validator && (x.field = v, x.fullField = x.fullField || v, x.type = l.getType(x), p[v] = p[v] || [], p[v].push({
          rule: x,
          value: u,
          source: a,
          field: v
        }));
      });
    });
    var f = {};
    return b3(p, s, function(v, m) {
      var u = v.rule, w = (u.type === "object" || u.type === "array") && (typeof u.fields == "object" || typeof u.defaultField == "object");
      w = w && (u.required || !u.required && v.value), u.field = v.field;
      function x(S, y) {
        return Fo({}, y, {
          fullField: u.fullField + "." + S,
          fullFields: u.fullFields ? [].concat(u.fullFields, [S]) : [S]
        });
      }
      function b(S) {
        S === void 0 && (S = []);
        var y = Array.isArray(S) ? S : [S];
        !s.suppressWarning && y.length && e.warning("async-validator:", y), y.length && u.message !== void 0 && (y = [].concat(u.message));
        var T = y.map(Gf(u, a));
        if (s.first && T.length)
          return f[u.field] = 1, m(T);
        if (!w)
          m(T);
        else {
          if (u.required && !v.value)
            return u.message !== void 0 ? T = [].concat(u.message).map(Gf(u, a)) : s.error && (T = [s.error(u, nn(s.messages.required, u.field))]), m(T);
          var R = {};
          u.defaultField && Object.keys(v.value).map(function(_) {
            R[_] = u.defaultField;
          }), R = Fo({}, R, v.rule.fields);
          var E = {};
          Object.keys(R).forEach(function(_) {
            var M = R[_], I = Array.isArray(M) ? M : [M];
            E[_] = I.map(x.bind(null, _));
          });
          var W = new e(E);
          W.messages(s.messages), v.rule.options && (v.rule.options.messages = s.messages, v.rule.options.error = s.error), W.validate(v.value, v.rule.options || s, function(_) {
            var M = [];
            T && T.length && M.push.apply(M, T), _ && _.length && M.push.apply(M, _), m(M.length ? M : null);
          });
        }
      }
      var C;
      if (u.asyncValidator)
        C = u.asyncValidator(u, v.value, b, v.source, s);
      else if (u.validator) {
        try {
          C = u.validator(u, v.value, b, v.source, s);
        } catch (S) {
          console.error == null || console.error(S), s.suppressValidatorError || setTimeout(function() {
            throw S;
          }, 0), b(S.message);
        }
        C === !0 ? b() : C === !1 ? b(typeof u.message == "function" ? u.message(u.fullField || u.field) : u.message || (u.fullField || u.field) + " fails") : C instanceof Array ? b(C) : C instanceof Error && b(C.message);
      }
      C && C.then && C.then(function() {
        return b();
      }, function(S) {
        return b(S);
      });
    }, function(v) {
      c(v);
    }, a);
  }, t.getType = function(o) {
    if (o.type === void 0 && o.pattern instanceof RegExp && (o.type = "pattern"), typeof o.validator != "function" && o.type && !Jr.hasOwnProperty(o.type))
      throw new Error(nn("Unknown rule type %s", o.type));
    return o.type || "string";
  }, t.getValidationMethod = function(o) {
    if (typeof o.validator == "function")
      return o.validator;
    var r = Object.keys(o), i = r.indexOf("message");
    return i !== -1 && r.splice(i, 1), r.length === 1 && r[0] === "required" ? Jr.required : Jr[this.getType(o)] || void 0;
  }, e;
}();
fr.register = function(t, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  Jr[t] = n;
};
fr.warning = p3;
fr.messages = Zs;
fr.validators = Jr;
const {
  cubicBezierEaseInOut: Zf
} = No;
function H3({
  name: e = "fade-down",
  fromOffset: t = "-4px",
  enterDuration: n = ".3s",
  leaveDuration: o = ".3s",
  enterCubicBezier: r = Zf,
  leaveCubicBezier: i = Zf
} = {}) {
  return [H(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
    opacity: 0,
    transform: `translateY(${t})`
  }), H(`&.${e}-transition-enter-to, &.${e}-transition-leave-from`, {
    opacity: 1,
    transform: "translateY(0)"
  }), H(`&.${e}-transition-leave-active`, {
    transition: `opacity ${o} ${i}, transform ${o} ${i}`
  }), H(`&.${e}-transition-enter-active`, {
    transition: `opacity ${n} ${r}, transform ${n} ${r}`
  })];
}
const j3 = z("form-item", `
 display: grid;
 line-height: var(--n-line-height);
`, [z("form-item-label", `
 grid-area: label;
 align-items: center;
 line-height: 1.25;
 text-align: var(--n-label-text-align);
 font-size: var(--n-label-font-size);
 min-height: var(--n-label-height);
 padding: var(--n-label-padding);
 color: var(--n-label-text-color);
 transition: color .3s var(--n-bezier);
 box-sizing: border-box;
 font-weight: var(--n-label-font-weight);
 `, [B("asterisk", `
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 color: var(--n-asterisk-color);
 transition: color .3s var(--n-bezier);
 `), B("asterisk-placeholder", `
 grid-area: mark;
 user-select: none;
 -webkit-user-select: none;
 visibility: hidden; 
 `)]), z("form-item-blank", `
 grid-area: blank;
 min-height: var(--n-blank-height);
 `), U("auto-label-width", [z("form-item-label", "white-space: nowrap;")]), U("left-labelled", `
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 grid-template-rows: auto 1fr;
 align-items: flex-start;
 `, [z("form-item-label", `
 display: grid;
 grid-template-columns: 1fr auto;
 min-height: var(--n-blank-height);
 height: auto;
 box-sizing: border-box;
 flex-shrink: 0;
 flex-grow: 0;
 `, [U("reverse-columns-space", `
 grid-template-columns: auto 1fr;
 `), U("left-mark", `
 grid-template-areas:
 "mark text"
 ". text";
 `), U("right-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), U("right-hanging-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), B("text", `
 grid-area: text; 
 `), B("asterisk", `
 grid-area: mark; 
 align-self: end;
 `)])]), U("top-labelled", `
 grid-template-areas:
 "label"
 "blank"
 "feedback";
 grid-template-rows: minmax(var(--n-label-height), auto) 1fr;
 grid-template-columns: minmax(0, 100%);
 `, [U("no-label", `
 grid-template-areas:
 "blank"
 "feedback";
 grid-template-rows: 1fr;
 `), z("form-item-label", `
 display: flex;
 align-items: flex-start;
 justify-content: var(--n-label-text-align);
 `)]), z("form-item-blank", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 position: relative;
 `), z("form-item-feedback-wrapper", `
 grid-area: feedback;
 box-sizing: border-box;
 min-height: var(--n-feedback-height);
 font-size: var(--n-feedback-font-size);
 line-height: 1.25;
 transform-origin: top left;
 `, [H("&:not(:empty)", `
 padding: var(--n-feedback-padding);
 `), z("form-item-feedback", {
  transition: "color .3s var(--n-bezier)",
  color: "var(--n-feedback-text-color)"
}, [U("warning", {
  color: "var(--n-feedback-text-color-warning)"
}), U("error", {
  color: "var(--n-feedback-text-color-error)"
}), H3({
  fromOffset: "-3px",
  enterDuration: ".3s",
  leaveDuration: ".2s"
})])])]), jt = window.Vue.computed, Hd = window.Vue.inject, Jf = window.Vue.ref;
function W3(e) {
  const t = Hd(wi, null);
  return {
    mergedSize: jt(() => e.size !== void 0 ? e.size : (t == null ? void 0 : t.props.size) !== void 0 ? t.props.size : "medium")
  };
}
function U3(e) {
  const t = Hd(wi, null), n = jt(() => {
    const {
      labelPlacement: f
    } = e;
    return f !== void 0 ? f : t != null && t.props.labelPlacement ? t.props.labelPlacement : "top";
  }), o = jt(() => n.value === "left" && (e.labelWidth === "auto" || (t == null ? void 0 : t.props.labelWidth) === "auto")), r = jt(() => {
    if (n.value === "top") return;
    const {
      labelWidth: f
    } = e;
    if (f !== void 0 && f !== "auto")
      return ft(f);
    if (o.value) {
      const v = t == null ? void 0 : t.maxChildLabelWidthRef.value;
      return v !== void 0 ? ft(v) : void 0;
    }
    if ((t == null ? void 0 : t.props.labelWidth) !== void 0)
      return ft(t.props.labelWidth);
  }), i = jt(() => {
    const {
      labelAlign: f
    } = e;
    if (f) return f;
    if (t != null && t.props.labelAlign) return t.props.labelAlign;
  }), l = jt(() => {
    var f;
    return [(f = e.labelProps) === null || f === void 0 ? void 0 : f.style, e.labelStyle, {
      width: r.value
    }];
  }), a = jt(() => {
    const {
      showRequireMark: f
    } = e;
    return f !== void 0 ? f : t == null ? void 0 : t.props.showRequireMark;
  }), s = jt(() => {
    const {
      requireMarkPlacement: f
    } = e;
    return f !== void 0 ? f : (t == null ? void 0 : t.props.requireMarkPlacement) || "right";
  }), d = Jf(!1), c = Jf(!1), h = jt(() => {
    const {
      validationStatus: f
    } = e;
    if (f !== void 0) return f;
    if (d.value) return "error";
    if (c.value) return "warning";
  }), p = jt(() => {
    const {
      showFeedback: f
    } = e;
    return f !== void 0 ? f : (t == null ? void 0 : t.props.showFeedback) !== void 0 ? t.props.showFeedback : !0;
  }), g = jt(() => {
    const {
      showLabel: f
    } = e;
    return f !== void 0 ? f : (t == null ? void 0 : t.props.showLabel) !== void 0 ? t.props.showLabel : !0;
  });
  return {
    validationErrored: d,
    validationWarned: c,
    mergedLabelStyle: l,
    mergedLabelPlacement: n,
    mergedLabelAlign: i,
    mergedShowRequireMark: a,
    mergedRequireMarkPlacement: s,
    mergedValidationStatus: h,
    mergedShowFeedback: p,
    mergedShowLabel: g,
    isAutoLabelWidth: o
  };
}
function K3(e) {
  const t = Hd(wi, null), n = jt(() => {
    const {
      rulePath: l
    } = e;
    if (l !== void 0) return l;
    const {
      path: a
    } = e;
    if (a !== void 0) return a;
  }), o = jt(() => {
    const l = [], {
      rule: a
    } = e;
    if (a !== void 0 && (Array.isArray(a) ? l.push(...a) : l.push(a)), t) {
      const {
        rules: s
      } = t.props, {
        value: d
      } = n;
      if (s !== void 0 && d !== void 0) {
        const c = fi(s, d);
        c !== void 0 && (Array.isArray(c) ? l.push(...c) : l.push(c));
      }
    }
    return l;
  }), r = jt(() => o.value.some((l) => l.required)), i = jt(() => r.value || e.required);
  return {
    mergedRules: o,
    mergedRequired: i
  };
}
var Qf = function(e, t, n, o) {
  function r(i) {
    return i instanceof n ? i : new n(function(l) {
      l(i);
    });
  }
  return new (n || (n = Promise))(function(i, l) {
    function a(c) {
      try {
        d(o.next(c));
      } catch (h) {
        l(h);
      }
    }
    function s(c) {
      try {
        d(o.throw(c));
      } catch (h) {
        l(h);
      }
    }
    function d(c) {
      c.done ? i(c.value) : r(c.value).then(a, s);
    }
    d((o = o.apply(e, t || [])).next());
  });
};
const ss = window.Vue.computed, q3 = window.Vue.defineComponent, Yt = window.Vue.h, G3 = window.Vue.inject, X3 = window.Vue.onMounted, Y3 = window.Vue.provide, fa = window.Vue.ref, ha = window.Vue.toRef, Z3 = window.Vue.Transition, J3 = window.Vue.watch, jd = Object.assign(Object.assign({}, ke.props), {
  label: String,
  labelWidth: [Number, String],
  labelStyle: [String, Object],
  labelAlign: String,
  labelPlacement: String,
  path: String,
  first: Boolean,
  rulePath: String,
  required: Boolean,
  showRequireMark: {
    type: Boolean,
    default: void 0
  },
  requireMarkPlacement: String,
  showFeedback: {
    type: Boolean,
    default: void 0
  },
  rule: [Object, Array],
  size: String,
  ignorePathChange: Boolean,
  validationStatus: String,
  feedback: String,
  feedbackClass: String,
  feedbackStyle: [String, Object],
  showLabel: {
    type: Boolean,
    default: void 0
  },
  labelProps: Object,
  contentClass: String,
  contentStyle: [String, Object]
}), Q3 = di(jd);
function eh(e, t) {
  return (...n) => {
    try {
      const o = e(...n);
      return !t && (typeof o == "boolean" || o instanceof Error || Array.isArray(o)) || o != null && o.then ? o : (o === void 0 || ho("form-item/validate", `You return a ${typeof o} typed value in the validator method, which is not recommended. Please use ${t ? "`Promise`" : "`boolean`, `Error` or `Promise`"} typed value instead.`), !0);
    } catch (o) {
      ho("form-item/validate", "An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation."), console.error(o);
      return;
    }
  };
}
const eE = q3({
  name: "FormItem",
  props: jd,
  setup(e) {
    qw(Xv, "formItems", ha(e, "path"));
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = je(e), o = G3(wi, null), r = W3(e), i = U3(e), {
      validationErrored: l,
      validationWarned: a
    } = i, {
      mergedRequired: s,
      mergedRules: d
    } = K3(e), {
      mergedSize: c
    } = r, {
      mergedLabelPlacement: h,
      mergedLabelAlign: p,
      mergedRequireMarkPlacement: g
    } = i, f = fa([]), v = fa(ai()), m = o ? ha(o.props, "disabled") : fa(!1), u = ke("Form", "-form-item", j3, Gv, e, t);
    J3(ha(e, "path"), () => {
      e.ignorePathChange || w();
    });
    function w() {
      f.value = [], l.value = !1, a.value = !1, e.feedback && (v.value = ai());
    }
    const x = (...I) => Qf(this, [...I], void 0, function* (O = null, K = () => !0, L = {
      suppressWarning: !0
    }) {
      const {
        path: Y
      } = e;
      L ? L.first || (L.first = e.first) : L = {};
      const {
        value: Q
      } = d, J = o ? fi(o.props.model, Y || "") : void 0, q = {}, A = {}, G = (O ? Q.filter((me) => Array.isArray(me.trigger) ? me.trigger.includes(O) : me.trigger === O) : Q).filter(K).map((me, $e) => {
        const Se = Object.assign({}, me);
        if (Se.validator && (Se.validator = eh(Se.validator, !1)), Se.asyncValidator && (Se.asyncValidator = eh(Se.asyncValidator, !0)), Se.renderMessage) {
          const Le = `__renderMessage__${$e}`;
          A[Le] = Se.message, Se.message = Le, q[Le] = Se.renderMessage;
        }
        return Se;
      }), Z = G.filter((me) => me.level !== "warning"), ae = G.filter((me) => me.level === "warning"), le = {
        valid: !0,
        errors: void 0,
        warnings: void 0
      };
      if (!G.length) return le;
      const de = Y ?? "__n_no_path__", ge = new fr({
        [de]: Z
      }), X = new fr({
        [de]: ae
      }), {
        validateMessages: ce
      } = (o == null ? void 0 : o.props) || {};
      ce && (ge.messages(ce), X.messages(ce));
      const Pe = (me) => {
        f.value = me.map(($e) => {
          const Se = ($e == null ? void 0 : $e.message) || "";
          return {
            key: Se,
            render: () => Se.startsWith("__renderMessage__") ? q[Se]() : Se
          };
        }), me.forEach(($e) => {
          var Se;
          !((Se = $e.message) === null || Se === void 0) && Se.startsWith("__renderMessage__") && ($e.message = A[$e.message]);
        });
      };
      if (Z.length) {
        const me = yield new Promise(($e) => {
          ge.validate({
            [de]: J
          }, L, $e);
        });
        me != null && me.length && (le.valid = !1, le.errors = me, Pe(me));
      }
      if (ae.length && !le.errors) {
        const me = yield new Promise(($e) => {
          X.validate({
            [de]: J
          }, L, $e);
        });
        me != null && me.length && (Pe(me), le.warnings = me);
      }
      return !le.errors && !le.warnings ? w() : (l.value = !!le.errors, a.value = !!le.warnings), le;
    });
    function b() {
      x("blur");
    }
    function C() {
      x("change");
    }
    function S() {
      x("focus");
    }
    function y() {
      x("input");
    }
    function T(I, O) {
      return Qf(this, void 0, void 0, function* () {
        let K, L, Y, Q;
        return typeof I == "string" ? (K = I, L = O) : I !== null && typeof I == "object" && (K = I.trigger, L = I.callback, Y = I.shouldRuleBeApplied, Q = I.options), yield new Promise((J, q) => {
          x(K, Y, Q).then(({
            valid: A,
            errors: G,
            warnings: Z
          }) => {
            A ? (L && L(void 0, {
              warnings: Z
            }), J({
              warnings: Z
            })) : (L && L(G, {
              warnings: Z
            }), q(G));
          });
        });
      });
    }
    Y3(zs, {
      path: ha(e, "path"),
      disabled: m,
      mergedSize: r.mergedSize,
      mergedValidationStatus: i.mergedValidationStatus,
      restoreValidation: w,
      handleContentBlur: b,
      handleContentChange: C,
      handleContentFocus: S,
      handleContentInput: y
    });
    const R = {
      validate: T,
      restoreValidation: w,
      internalValidate: x
    }, E = fa(null);
    X3(() => {
      if (!i.isAutoLabelWidth.value) return;
      const I = E.value;
      if (I !== null) {
        const O = I.style.whiteSpace;
        I.style.whiteSpace = "nowrap", I.style.width = "", o == null || o.deriveMaxChildLabelWidth(Number(getComputedStyle(I).width.slice(0, -2))), I.style.whiteSpace = O;
      }
    });
    const W = ss(() => {
      var I;
      const {
        value: O
      } = c, {
        value: K
      } = h, L = K === "top" ? "vertical" : "horizontal", {
        common: {
          cubicBezierEaseInOut: Y
        },
        self: {
          labelTextColor: Q,
          asteriskColor: J,
          lineHeight: q,
          feedbackTextColor: A,
          feedbackTextColorWarning: G,
          feedbackTextColorError: Z,
          feedbackPadding: ae,
          labelFontWeight: le,
          [oe("labelHeight", O)]: de,
          [oe("blankHeight", O)]: ge,
          [oe("feedbackFontSize", O)]: X,
          [oe("feedbackHeight", O)]: ce,
          [oe("labelPadding", L)]: Pe,
          [oe("labelTextAlign", L)]: me,
          [oe(oe("labelFontSize", K), O)]: $e
        }
      } = u.value;
      let Se = (I = p.value) !== null && I !== void 0 ? I : me;
      return K === "top" && (Se = Se === "right" ? "flex-end" : "flex-start"), {
        "--n-bezier": Y,
        "--n-line-height": q,
        "--n-blank-height": ge,
        "--n-label-font-size": $e,
        "--n-label-text-align": Se,
        "--n-label-height": de,
        "--n-label-padding": Pe,
        "--n-label-font-weight": le,
        "--n-asterisk-color": J,
        "--n-label-text-color": Q,
        "--n-feedback-padding": ae,
        "--n-feedback-font-size": X,
        "--n-feedback-height": ce,
        "--n-feedback-text-color": A,
        "--n-feedback-text-color-warning": G,
        "--n-feedback-text-color-error": Z
      };
    }), _ = n ? St("form-item", ss(() => {
      var I;
      return `${c.value[0]}${h.value[0]}${((I = p.value) === null || I === void 0 ? void 0 : I[0]) || ""}`;
    }), W, e) : void 0, M = ss(() => h.value === "left" && g.value === "left" && p.value === "left");
    return Object.assign(Object.assign(Object.assign(Object.assign({
      labelElementRef: E,
      mergedClsPrefix: t,
      mergedRequired: s,
      feedbackId: v,
      renderExplains: f,
      reverseColSpace: M
    }, i), r), R), {
      cssVars: n ? void 0 : W,
      themeClass: _ == null ? void 0 : _.themeClass,
      onRender: _ == null ? void 0 : _.onRender
    });
  },
  render() {
    const {
      $slots: e,
      mergedClsPrefix: t,
      mergedShowLabel: n,
      mergedShowRequireMark: o,
      mergedRequireMarkPlacement: r,
      onRender: i
    } = this, l = o !== void 0 ? o : this.mergedRequired;
    i == null || i();
    const a = () => {
      const s = this.$slots.label ? this.$slots.label() : this.label;
      if (!s) return null;
      const d = Yt("span", {
        class: `${t}-form-item-label__text`
      }, s), c = l ? Yt("span", {
        class: `${t}-form-item-label__asterisk`
      }, r !== "left" ? " *" : "* ") : r === "right-hanging" && Yt("span", {
        class: `${t}-form-item-label__asterisk-placeholder`
      }, " *"), {
        labelProps: h
      } = this;
      return Yt("label", Object.assign({}, h, {
        class: [h == null ? void 0 : h.class, `${t}-form-item-label`, `${t}-form-item-label--${r}-mark`, this.reverseColSpace && `${t}-form-item-label--reverse-columns-space`],
        style: this.mergedLabelStyle,
        ref: "labelElementRef"
      }), r === "left" ? [c, d] : [d, c]);
    };
    return Yt("div", {
      class: [`${t}-form-item`, this.themeClass, `${t}-form-item--${this.mergedSize}-size`, `${t}-form-item--${this.mergedLabelPlacement}-labelled`, this.isAutoLabelWidth && `${t}-form-item--auto-label-width`, !n && `${t}-form-item--no-label`],
      style: this.cssVars
    }, n && a(), Yt("div", {
      class: [`${t}-form-item-blank`, this.contentClass, this.mergedValidationStatus && `${t}-form-item-blank--${this.mergedValidationStatus}`],
      style: this.contentStyle
    }, e), this.mergedShowFeedback ? Yt("div", {
      key: this.feedbackId,
      style: this.feedbackStyle,
      class: [`${t}-form-item-feedback-wrapper`, this.feedbackClass]
    }, Yt(Z3, {
      name: "fade-down-transition",
      mode: "out-in"
    }, {
      default: () => {
        const {
          mergedValidationStatus: s
        } = this;
        return qe(e.feedback, (d) => {
          var c;
          const {
            feedback: h
          } = this, p = d || h ? Yt("div", {
            key: "__feedback__",
            class: `${t}-form-item-feedback__line`
          }, d || h) : this.renderExplains.length ? (c = this.renderExplains) === null || c === void 0 ? void 0 : c.map(({
            key: g,
            render: f
          }) => Yt("div", {
            key: g,
            class: `${t}-form-item-feedback__line`
          }, f())) : null;
          return p ? s === "warning" ? Yt("div", {
            key: "controlled-warning",
            class: `${t}-form-item-feedback ${t}-form-item-feedback--warning`
          }, p) : s === "error" ? Yt("div", {
            key: "controlled-error",
            class: `${t}-form-item-feedback ${t}-form-item-feedback--error`
          }, p) : s === "success" ? Yt("div", {
            key: "controlled-success",
            class: `${t}-form-item-feedback ${t}-form-item-feedback--success`
          }, p) : Yt("div", {
            key: "controlled-default",
            class: `${t}-form-item-feedback`
          }, p) : null;
        });
      }
    })) : null);
  }
}), th = 1, Zv = "n-grid", tE = window.Vue.computed, nE = window.Vue.defineComponent, oE = window.Vue.getCurrentInstance, nh = window.Vue.h, rE = window.Vue.inject, Jv = 1, Wd = {
  span: {
    type: [Number, String],
    default: Jv
  },
  offset: {
    type: [Number, String],
    default: 0
  },
  suffix: Boolean,
  // private props
  privateOffset: Number,
  privateSpan: Number,
  privateColStart: Number,
  privateShow: {
    type: Boolean,
    default: !0
  }
}, iE = di(Wd), Ur = nE({
  __GRID_ITEM__: !0,
  name: "GridItem",
  alias: ["Gi"],
  props: Wd,
  setup() {
    const {
      isSsrRef: e,
      xGapRef: t,
      itemStyleRef: n,
      overflowRef: o,
      layoutShiftDisabledRef: r
    } = rE(Zv), i = oE();
    return {
      overflow: o,
      itemStyle: n,
      layoutShiftDisabled: r,
      mergedXGap: tE(() => lt(t.value || 0)),
      deriveStyle: () => {
        e.value;
        const {
          privateSpan: l = Jv,
          privateShow: a = !0,
          privateColStart: s = void 0,
          privateOffset: d = 0
        } = i.vnode.props, {
          value: c
        } = t, h = lt(c || 0);
        return {
          display: a ? "" : "none",
          gridColumn: `${s ?? `span ${l}`} / span ${l}`,
          marginLeft: d ? `calc((100% - (${l} - 1) * ${h}) / ${l} * ${d} + ${h} * ${d})` : ""
        };
      }
    };
  },
  render() {
    var e, t;
    if (this.layoutShiftDisabled) {
      const {
        span: n,
        offset: o,
        mergedXGap: r
      } = this;
      return nh("div", {
        style: {
          gridColumn: `span ${n} / span ${n}`,
          marginLeft: o ? `calc((100% - (${n} - 1) * ${r}) / ${n} * ${o} + ${r} * ${o})` : ""
        }
      }, this.$slots);
    }
    return nh("div", {
      style: [this.itemStyle, this.deriveStyle()]
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e, {
      overflow: this.overflow
    }));
  }
}), aE = window.Vue.defineComponent, oh = window.Vue.h, lE = window.Vue.ref, sE = Object.assign(Object.assign({}, Wd), jd), pa = aE({
  __GRID_ITEM__: !0,
  name: "FormItemGridItem",
  alias: ["FormItemGi"],
  props: sE,
  setup() {
    const e = lE(null);
    return {
      formItemInstRef: e,
      validate: (...o) => {
        const {
          value: r
        } = e;
        if (r)
          return r.validate(...o);
      },
      restoreValidation: () => {
        const {
          value: o
        } = e;
        o && o.restoreValidation();
      }
    };
  },
  render() {
    return oh(Ur, si(this.$.vnode.props || {}, iE), {
      default: () => {
        const e = si(this.$props, Q3);
        return oh(eE, Object.assign({
          ref: "formItemInstRef"
        }, e), this.$slots);
      }
    });
  }
}), dE = {
  xs: 0,
  // mobile
  s: 640,
  // tablet
  m: 1024,
  // laptop s
  l: 1280,
  // laptop
  xl: 1536,
  // laptop l
  xxl: 1920
  // normal desktop display
}, rh = window.Vue.cloneVNode, ds = window.Vue.computed, cE = window.Vue.defineComponent, cs = window.Vue.h, ih = window.Vue.mergeProps, uE = window.Vue.onMounted, fE = window.Vue.provide, va = window.Vue.ref, ah = window.Vue.toRef, hE = window.Vue.vShow, Qv = 24, us = "__ssr__", pE = {
  layoutShiftDisabled: Boolean,
  responsive: {
    type: [String, Boolean],
    default: "self"
  },
  cols: {
    type: [Number, String],
    default: Qv
  },
  itemResponsive: Boolean,
  collapsed: Boolean,
  // may create grid rows < collapsedRows since a item may take all the row
  collapsedRows: {
    type: Number,
    default: 1
  },
  itemStyle: [Object, String],
  xGap: {
    type: [Number, String],
    default: 0
  },
  yGap: {
    type: [Number, String],
    default: 0
  }
}, lh = cE({
  name: "Grid",
  inheritAttrs: !1,
  props: pE,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBreakpointsRef: n
    } = je(e), o = /^\d+$/, r = va(void 0), i = Ow((n == null ? void 0 : n.value) || dE), l = Me(() => !!(e.itemResponsive || !o.test(e.cols.toString()) || !o.test(e.xGap.toString()) || !o.test(e.yGap.toString()))), a = ds(() => {
      if (l.value)
        return e.responsive === "self" ? r.value : i.value;
    }), s = Me(() => {
      var u;
      return (u = Number(jo(e.cols.toString(), a.value))) !== null && u !== void 0 ? u : Qv;
    }), d = Me(() => jo(e.xGap.toString(), a.value)), c = Me(() => jo(e.yGap.toString(), a.value)), h = (u) => {
      r.value = u.contentRect.width;
    }, p = (u) => {
      ri(h, u);
    }, g = va(!1), f = ds(() => {
      if (e.responsive === "self")
        return p;
    }), v = va(!1), m = va();
    return uE(() => {
      const {
        value: u
      } = m;
      u && u.hasAttribute(us) && (u.removeAttribute(us), v.value = !0);
    }), fE(Zv, {
      layoutShiftDisabledRef: ah(e, "layoutShiftDisabled"),
      isSsrRef: v,
      itemStyleRef: ah(e, "itemStyle"),
      xGapRef: d,
      overflowRef: g
    }), {
      isSsr: !hr,
      contentEl: m,
      mergedClsPrefix: t,
      style: ds(() => e.layoutShiftDisabled ? {
        width: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${e.cols}, minmax(0, 1fr))`,
        columnGap: lt(e.xGap),
        rowGap: lt(e.yGap)
      } : {
        width: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${s.value}, minmax(0, 1fr))`,
        columnGap: lt(d.value),
        rowGap: lt(c.value)
      }),
      isResponsive: l,
      responsiveQuery: a,
      responsiveCols: s,
      handleResize: f,
      overflow: g
    };
  },
  render() {
    if (this.layoutShiftDisabled)
      return cs("div", ih({
        ref: "contentEl",
        class: `${this.mergedClsPrefix}-grid`,
        style: this.style
      }, this.$attrs), this.$slots);
    const e = () => {
      var t, n, o, r, i, l, a;
      this.overflow = !1;
      const s = dr(bd(this)), d = [], {
        collapsed: c,
        collapsedRows: h,
        responsiveCols: p,
        responsiveQuery: g
      } = this;
      s.forEach((w) => {
        var x, b, C, S, y;
        if (((x = w == null ? void 0 : w.type) === null || x === void 0 ? void 0 : x.__GRID_ITEM__) !== !0) return;
        if (Qy(w)) {
          const E = rh(w);
          E.props ? E.props.privateShow = !1 : E.props = {
            privateShow: !1
          }, d.push({
            child: E,
            rawChildSpan: 0
          });
          return;
        }
        w.dirs = ((b = w.dirs) === null || b === void 0 ? void 0 : b.filter(({
          dir: E
        }) => E !== hE)) || null, ((C = w.dirs) === null || C === void 0 ? void 0 : C.length) === 0 && (w.dirs = null);
        const T = rh(w), R = Number((y = jo((S = T.props) === null || S === void 0 ? void 0 : S.span, g)) !== null && y !== void 0 ? y : th);
        R !== 0 && d.push({
          child: T,
          rawChildSpan: R
        });
      });
      let f = 0;
      const v = (t = d[d.length - 1]) === null || t === void 0 ? void 0 : t.child;
      if (v != null && v.props) {
        const w = (n = v.props) === null || n === void 0 ? void 0 : n.suffix;
        w !== void 0 && w !== !1 && (f = Number((r = jo((o = v.props) === null || o === void 0 ? void 0 : o.span, g)) !== null && r !== void 0 ? r : th), v.props.privateSpan = f, v.props.privateColStart = p + 1 - f, v.props.privateShow = (i = v.props.privateShow) !== null && i !== void 0 ? i : !0);
      }
      let m = 0, u = !1;
      for (const {
        child: w,
        rawChildSpan: x
      } of d) {
        if (u && (this.overflow = !0), !u) {
          const b = Number((a = jo((l = w.props) === null || l === void 0 ? void 0 : l.offset, g)) !== null && a !== void 0 ? a : 0), C = Math.min(x + b, p);
          if (w.props ? (w.props.privateSpan = C, w.props.privateOffset = b) : w.props = {
            privateSpan: C,
            privateOffset: b
          }, c) {
            const S = m % p;
            C + S > p && (m += p - S), C + m + f > h * p ? u = !0 : m += C;
          }
        }
        u && (w.props ? w.props.privateShow !== !0 && (w.props.privateShow = !1) : w.props = {
          privateShow: !1
        });
      }
      return cs("div", ih({
        ref: "contentEl",
        class: `${this.mergedClsPrefix}-grid`,
        style: this.style,
        [us]: this.isSsr || void 0
      }, this.$attrs), d.map(({
        child: w
      }) => w));
    };
    return this.isResponsive && this.responsive === "self" ? cs(Mo, {
      onResize: this.handleResize
    }, {
      default: e
    }) : e();
  }
}), vE = H([z("input-number-suffix", `
 display: inline-block;
 margin-right: 10px;
 `), z("input-number-prefix", `
 display: inline-block;
 margin-left: 10px;
 `)]);
function gE(e) {
  return e == null || typeof e == "string" && e.trim() === "" ? null : Number(e);
}
function mE(e) {
  return e.includes(".") && (/^(-)?\d+.*(\.|0)$/.test(e) || /^-?\d*$/.test(e)) || e === "-" || e === "-0";
}
function fs(e) {
  return e == null ? !0 : !Number.isNaN(e);
}
function sh(e, t) {
  return typeof e != "number" ? "" : t === void 0 ? String(e) : e.toFixed(t);
}
function hs(e) {
  if (e === null) return null;
  if (typeof e == "number")
    return e;
  {
    const t = Number(e);
    return Number.isNaN(t) ? null : t;
  }
}
const bE = window.Vue.computed, wE = window.Vue.defineComponent, Pn = window.Vue.h, yE = window.Vue.nextTick, Hr = window.Vue.ref, xE = window.Vue.toRef, CE = window.Vue.watch;
window.Vue.watchEffect;
const dh = 800, ch = 100, SE = Object.assign(Object.assign({}, ke.props), {
  autofocus: Boolean,
  loading: {
    type: Boolean,
    default: void 0
  },
  placeholder: String,
  defaultValue: {
    type: Number,
    default: null
  },
  value: Number,
  step: {
    type: [Number, String],
    default: 1
  },
  min: [Number, String],
  max: [Number, String],
  size: String,
  disabled: {
    type: Boolean,
    default: void 0
  },
  validator: Function,
  bordered: {
    type: Boolean,
    default: void 0
  },
  showButton: {
    type: Boolean,
    default: !0
  },
  buttonPlacement: {
    type: String,
    default: "right"
  },
  inputProps: Object,
  readonly: Boolean,
  clearable: Boolean,
  keyboard: {
    type: Object,
    default: {}
  },
  updateValueOnInput: {
    type: Boolean,
    default: !0
  },
  round: {
    type: Boolean,
    default: void 0
  },
  parse: Function,
  format: Function,
  precision: Number,
  status: String,
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  onFocus: [Function, Array],
  onBlur: [Function, Array],
  onClear: [Function, Array],
  // deprecated
  onChange: [Function, Array]
}), ps = wE({
  name: "InputNumber",
  props: SE,
  slots: Object,
  setup(e) {
    const {
      mergedBorderedRef: t,
      mergedClsPrefixRef: n,
      mergedRtlRef: o
    } = je(e), r = ke("InputNumber", "-input-number", vE, ZF, e, n), {
      localeRef: i
    } = vr("InputNumber"), l = qn(e), {
      mergedSizeRef: a,
      mergedDisabledRef: s,
      mergedStatusRef: d
    } = l, c = Hr(null), h = Hr(null), p = Hr(null), g = Hr(e.defaultValue), f = xE(e, "value"), v = It(f, g), m = Hr(""), u = (re) => {
      const k = String(re).split(".")[1];
      return k ? k.length : 0;
    }, w = (re) => {
      const k = [e.min, e.max, e.step, re].map(($) => $ === void 0 ? 0 : u($));
      return Math.max(...k);
    }, x = Me(() => {
      const {
        placeholder: re
      } = e;
      return re !== void 0 ? re : i.value.placeholder;
    }), b = Me(() => {
      const re = hs(e.step);
      return re !== null ? re === 0 ? 1 : Math.abs(re) : 1;
    }), C = Me(() => {
      const re = hs(e.min);
      return re !== null ? re : null;
    }), S = Me(() => {
      const re = hs(e.max);
      return re !== null ? re : null;
    }), y = () => {
      const {
        value: re
      } = v;
      if (fs(re)) {
        const {
          format: k,
          precision: $
        } = e;
        k ? m.value = k(re) : re === null || $ === void 0 || u(re) > $ ? m.value = sh(re, void 0) : m.value = sh(re, $);
      } else
        m.value = String(re);
    };
    y();
    const T = (re) => {
      const {
        value: k
      } = v;
      if (re === k) {
        y();
        return;
      }
      const {
        "onUpdate:value": $,
        onUpdateValue: D,
        onChange: ee
      } = e, {
        nTriggerFormInput: ve,
        nTriggerFormChange: he
      } = l;
      ee && ie(ee, re), D && ie(D, re), $ && ie($, re), g.value = re, ve(), he();
    }, R = ({
      offset: re,
      doUpdateIfValid: k,
      fixPrecision: $,
      isInputing: D
    }) => {
      const {
        value: ee
      } = m;
      if (D && mE(ee))
        return !1;
      const ve = (e.parse || gE)(ee);
      if (ve === null)
        return k && T(null), null;
      if (fs(ve)) {
        const he = u(ve), {
          precision: F
        } = e;
        if (F !== void 0 && F < he && !$)
          return !1;
        let j = Number.parseFloat((ve + re).toFixed(F ?? w(ve)));
        if (fs(j)) {
          const {
            value: pe
          } = S, {
            value: Fe
          } = C;
          if (pe !== null && j > pe) {
            if (!k || D) return !1;
            j = pe;
          }
          if (Fe !== null && j < Fe) {
            if (!k || D) return !1;
            j = Fe;
          }
          return e.validator && !e.validator(j) ? !1 : (k && T(j), j);
        }
      }
      return !1;
    }, E = Me(() => R({
      offset: 0,
      doUpdateIfValid: !1,
      isInputing: !1,
      fixPrecision: !1
    }) === !1), W = Me(() => {
      const {
        value: re
      } = v;
      if (e.validator && re === null)
        return !1;
      const {
        value: k
      } = b;
      return R({
        offset: -k,
        doUpdateIfValid: !1,
        isInputing: !1,
        fixPrecision: !1
      }) !== !1;
    }), _ = Me(() => {
      const {
        value: re
      } = v;
      if (e.validator && re === null)
        return !1;
      const {
        value: k
      } = b;
      return R({
        offset: +k,
        doUpdateIfValid: !1,
        isInputing: !1,
        fixPrecision: !1
      }) !== !1;
    });
    function M(re) {
      const {
        onFocus: k
      } = e, {
        nTriggerFormFocus: $
      } = l;
      k && ie(k, re), $();
    }
    function I(re) {
      var k, $;
      if (re.target === ((k = c.value) === null || k === void 0 ? void 0 : k.wrapperElRef))
        return;
      const D = R({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !1,
        fixPrecision: !0
      });
      if (D !== !1) {
        const he = ($ = c.value) === null || $ === void 0 ? void 0 : $.inputElRef;
        he && (he.value = String(D || "")), v.value === D && y();
      } else
        y();
      const {
        onBlur: ee
      } = e, {
        nTriggerFormBlur: ve
      } = l;
      ee && ie(ee, re), ve(), yE(() => {
        y();
      });
    }
    function O(re) {
      const {
        onClear: k
      } = e;
      k && ie(k, re);
    }
    function K() {
      const {
        value: re
      } = _;
      if (!re) {
        ge();
        return;
      }
      const {
        value: k
      } = v;
      if (k === null)
        e.validator || T(J());
      else {
        const {
          value: $
        } = b;
        R({
          offset: $,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        });
      }
    }
    function L() {
      const {
        value: re
      } = W;
      if (!re) {
        le();
        return;
      }
      const {
        value: k
      } = v;
      if (k === null)
        e.validator || T(J());
      else {
        const {
          value: $
        } = b;
        R({
          offset: -$,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        });
      }
    }
    const Y = M, Q = I;
    function J() {
      if (e.validator) return null;
      const {
        value: re
      } = C, {
        value: k
      } = S;
      return re !== null ? Math.max(0, re) : k !== null ? Math.min(0, k) : 0;
    }
    function q(re) {
      O(re), T(null);
    }
    function A(re) {
      var k, $, D;
      !((k = p.value) === null || k === void 0) && k.$el.contains(re.target) && re.preventDefault(), !(($ = h.value) === null || $ === void 0) && $.$el.contains(re.target) && re.preventDefault(), (D = c.value) === null || D === void 0 || D.activate();
    }
    let G = null, Z = null, ae = null;
    function le() {
      ae && (window.clearTimeout(ae), ae = null), G && (window.clearInterval(G), G = null);
    }
    let de = null;
    function ge() {
      de && (window.clearTimeout(de), de = null), Z && (window.clearInterval(Z), Z = null);
    }
    function X() {
      le(), ae = window.setTimeout(() => {
        G = window.setInterval(() => {
          L();
        }, ch);
      }, dh), st("mouseup", document, le, {
        once: !0
      });
    }
    function ce() {
      ge(), de = window.setTimeout(() => {
        Z = window.setInterval(() => {
          K();
        }, ch);
      }, dh), st("mouseup", document, ge, {
        once: !0
      });
    }
    const Pe = () => {
      Z || K();
    }, me = () => {
      G || L();
    };
    function $e(re) {
      var k, $;
      if (re.key === "Enter") {
        if (re.target === ((k = c.value) === null || k === void 0 ? void 0 : k.wrapperElRef))
          return;
        R({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && (($ = c.value) === null || $ === void 0 || $.deactivate());
      } else if (re.key === "ArrowUp") {
        if (!_.value || e.keyboard.ArrowUp === !1) return;
        re.preventDefault(), R({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && K();
      } else if (re.key === "ArrowDown") {
        if (!W.value || e.keyboard.ArrowDown === !1) return;
        re.preventDefault(), R({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && L();
      }
    }
    function Se(re) {
      m.value = re, e.updateValueOnInput && !e.format && !e.parse && e.precision === void 0 && R({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !0,
        fixPrecision: !1
      });
    }
    CE(v, () => {
      y();
    });
    const Le = {
      focus: () => {
        var re;
        return (re = c.value) === null || re === void 0 ? void 0 : re.focus();
      },
      blur: () => {
        var re;
        return (re = c.value) === null || re === void 0 ? void 0 : re.blur();
      },
      select: () => {
        var re;
        return (re = c.value) === null || re === void 0 ? void 0 : re.select();
      }
    }, Ie = At("InputNumber", o, n);
    return Object.assign(Object.assign({}, Le), {
      rtlEnabled: Ie,
      inputInstRef: c,
      minusButtonInstRef: h,
      addButtonInstRef: p,
      mergedClsPrefix: n,
      mergedBordered: t,
      uncontrolledValue: g,
      mergedValue: v,
      mergedPlaceholder: x,
      displayedValueInvalid: E,
      mergedSize: a,
      mergedDisabled: s,
      displayedValue: m,
      addable: _,
      minusable: W,
      mergedStatus: d,
      handleFocus: Y,
      handleBlur: Q,
      handleClear: q,
      handleMouseDown: A,
      handleAddClick: Pe,
      handleMinusClick: me,
      handleAddMousedown: ce,
      handleMinusMousedown: X,
      handleKeyDown: $e,
      handleUpdateDisplayedValue: Se,
      // theme
      mergedTheme: r,
      inputThemeOverrides: {
        paddingSmall: "0 8px 0 10px",
        paddingMedium: "0 8px 0 12px",
        paddingLarge: "0 8px 0 14px"
      },
      buttonThemeOverrides: bE(() => {
        const {
          self: {
            iconColorDisabled: re
          }
        } = r.value, [k, $, D, ee] = fo(re);
        return {
          textColorTextDisabled: `rgb(${k}, ${$}, ${D})`,
          opacityDisabled: `${ee}`
        };
      })
    });
  },
  render() {
    const {
      mergedClsPrefix: e,
      $slots: t
    } = this, n = () => Pn(nf, {
      text: !0,
      disabled: !this.minusable || this.mergedDisabled || this.readonly,
      focusable: !1,
      theme: this.mergedTheme.peers.Button,
      themeOverrides: this.mergedTheme.peerOverrides.Button,
      builtinThemeOverrides: this.buttonThemeOverrides,
      onClick: this.handleMinusClick,
      onMousedown: this.handleMinusMousedown,
      ref: "minusButtonInstRef"
    }, {
      icon: () => wn(t["minus-icon"], () => [Pn(Ct, {
        clsPrefix: e
      }, {
        default: () => Pn(ok, null)
      })])
    }), o = () => Pn(nf, {
      text: !0,
      disabled: !this.addable || this.mergedDisabled || this.readonly,
      focusable: !1,
      theme: this.mergedTheme.peers.Button,
      themeOverrides: this.mergedTheme.peerOverrides.Button,
      builtinThemeOverrides: this.buttonThemeOverrides,
      onClick: this.handleAddClick,
      onMousedown: this.handleAddMousedown,
      ref: "addButtonInstRef"
    }, {
      icon: () => wn(t["add-icon"], () => [Pn(Ct, {
        clsPrefix: e
      }, {
        default: () => Pn(zR, null)
      })])
    });
    return Pn("div", {
      class: [`${e}-input-number`, this.rtlEnabled && `${e}-input-number--rtl`]
    }, Pn(js, {
      ref: "inputInstRef",
      autofocus: this.autofocus,
      status: this.mergedStatus,
      bordered: this.mergedBordered,
      loading: this.loading,
      value: this.displayedValue,
      onUpdateValue: this.handleUpdateDisplayedValue,
      theme: this.mergedTheme.peers.Input,
      themeOverrides: this.mergedTheme.peerOverrides.Input,
      builtinThemeOverrides: this.inputThemeOverrides,
      size: this.mergedSize,
      placeholder: this.mergedPlaceholder,
      disabled: this.mergedDisabled,
      readonly: this.readonly,
      round: this.round,
      textDecoration: this.displayedValueInvalid ? "line-through" : void 0,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeydown: this.handleKeyDown,
      onMousedown: this.handleMouseDown,
      onClear: this.handleClear,
      clearable: this.clearable,
      inputProps: this.inputProps,
      internalLoadingBeforeSuffix: !0
    }, {
      prefix: () => {
        var r;
        return this.showButton && this.buttonPlacement === "both" ? [n(), qe(t.prefix, (i) => i ? Pn("span", {
          class: `${e}-input-number-prefix`
        }, i) : null)] : (r = t.prefix) === null || r === void 0 ? void 0 : r.call(t);
      },
      suffix: () => {
        var r;
        return this.showButton ? [qe(t.suffix, (i) => i ? Pn("span", {
          class: `${e}-input-number-suffix`
        }, i) : null), this.buttonPlacement === "right" ? n() : null, o()] : (r = t.suffix) === null || r === void 0 ? void 0 : r.call(t);
      }
    }));
  }
}), $E = window.Vue.computed, RE = window.Vue.defineComponent, vt = window.Vue.h, kE = {
  success: vt(rv, null),
  error: vt(nv, null),
  warning: vt(iv, null),
  info: vt(ov, null)
}, PE = RE({
  name: "ProgressCircle",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    },
    status: {
      type: String,
      required: !0
    },
    strokeWidth: {
      type: Number,
      required: !0
    },
    fillColor: [String, Object],
    railColor: String,
    railStyle: [String, Object],
    percentage: {
      type: Number,
      default: 0
    },
    offsetDegree: {
      type: Number,
      default: 0
    },
    showIndicator: {
      type: Boolean,
      required: !0
    },
    indicatorTextColor: String,
    unit: String,
    viewBoxWidth: {
      type: Number,
      required: !0
    },
    gapDegree: {
      type: Number,
      required: !0
    },
    gapOffsetDegree: {
      type: Number,
      default: 0
    }
  },
  setup(e, {
    slots: t
  }) {
    const n = $E(() => {
      const i = "gradient", {
        fillColor: l
      } = e;
      return typeof l == "object" ? `${i}-${Pa(JSON.stringify(l))}` : i;
    });
    function o(i, l, a, s) {
      const {
        gapDegree: d,
        viewBoxWidth: c,
        strokeWidth: h
      } = e, p = 50, g = 0, f = p, v = 0, m = 2 * p, u = 50 + h / 2, w = `M ${u},${u} m ${g},${f}
      a ${p},${p} 0 1 1 ${v},${-m}
      a ${p},${p} 0 1 1 ${-v},${m}`, x = Math.PI * 2 * p, b = {
        stroke: s === "rail" ? a : typeof e.fillColor == "object" ? `url(#${n.value})` : a,
        strokeDasharray: `${i / 100 * (x - d)}px ${c * 8}px`,
        strokeDashoffset: `-${d / 2}px`,
        transformOrigin: l ? "center" : void 0,
        transform: l ? `rotate(${l}deg)` : void 0
      };
      return {
        pathString: w,
        pathStyle: b
      };
    }
    const r = () => {
      const i = typeof e.fillColor == "object", l = i ? e.fillColor.stops[0] : "", a = i ? e.fillColor.stops[1] : "";
      return i && vt("defs", null, vt("linearGradient", {
        id: n.value,
        x1: "0%",
        y1: "100%",
        x2: "100%",
        y2: "0%"
      }, vt("stop", {
        offset: "0%",
        "stop-color": l
      }), vt("stop", {
        offset: "100%",
        "stop-color": a
      })));
    };
    return () => {
      const {
        fillColor: i,
        railColor: l,
        strokeWidth: a,
        offsetDegree: s,
        status: d,
        percentage: c,
        showIndicator: h,
        indicatorTextColor: p,
        unit: g,
        gapOffsetDegree: f,
        clsPrefix: v
      } = e, {
        pathString: m,
        pathStyle: u
      } = o(100, 0, l, "rail"), {
        pathString: w,
        pathStyle: x
      } = o(c, s, i, "fill"), b = 100 + a;
      return vt("div", {
        class: `${v}-progress-content`,
        role: "none"
      }, vt("div", {
        class: `${v}-progress-graph`,
        "aria-hidden": !0
      }, vt("div", {
        class: `${v}-progress-graph-circle`,
        style: {
          transform: f ? `rotate(${f}deg)` : void 0
        }
      }, vt("svg", {
        viewBox: `0 0 ${b} ${b}`
      }, r(), vt("g", null, vt("path", {
        class: `${v}-progress-graph-circle-rail`,
        d: m,
        "stroke-width": a,
        "stroke-linecap": "round",
        fill: "none",
        style: u
      })), vt("g", null, vt("path", {
        class: [`${v}-progress-graph-circle-fill`, c === 0 && `${v}-progress-graph-circle-fill--empty`],
        d: w,
        "stroke-width": a,
        "stroke-linecap": "round",
        fill: "none",
        style: x
      }))))), h ? vt("div", null, t.default ? vt("div", {
        class: `${v}-progress-custom-content`,
        role: "none"
      }, t.default()) : d !== "default" ? vt("div", {
        class: `${v}-progress-icon`,
        "aria-hidden": !0
      }, vt(Ct, {
        clsPrefix: v
      }, {
        default: () => kE[d]
      })) : vt("div", {
        class: `${v}-progress-text`,
        style: {
          color: p
        },
        role: "none"
      }, vt("span", {
        class: `${v}-progress-text__percentage`
      }, c), vt("span", {
        class: `${v}-progress-text__unit`
      }, g))) : null);
    };
  }
}), ga = window.Vue.computed, _E = window.Vue.defineComponent, Ht = window.Vue.h, TE = {
  success: Ht(rv, null),
  error: Ht(nv, null),
  warning: Ht(iv, null),
  info: Ht(ov, null)
}, FE = _E({
  name: "ProgressLine",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    },
    percentage: {
      type: Number,
      default: 0
    },
    railColor: String,
    railStyle: [String, Object],
    fillColor: [String, Object],
    status: {
      type: String,
      required: !0
    },
    indicatorPlacement: {
      type: String,
      required: !0
    },
    indicatorTextColor: String,
    unit: {
      type: String,
      default: "%"
    },
    processing: {
      type: Boolean,
      required: !0
    },
    showIndicator: {
      type: Boolean,
      required: !0
    },
    height: [String, Number],
    railBorderRadius: [String, Number],
    fillBorderRadius: [String, Number]
  },
  setup(e, {
    slots: t
  }) {
    const n = ga(() => ft(e.height)), o = ga(() => {
      var l, a;
      return typeof e.fillColor == "object" ? `linear-gradient(to right, ${(l = e.fillColor) === null || l === void 0 ? void 0 : l.stops[0]} , ${(a = e.fillColor) === null || a === void 0 ? void 0 : a.stops[1]})` : e.fillColor;
    }), r = ga(() => e.railBorderRadius !== void 0 ? ft(e.railBorderRadius) : e.height !== void 0 ? ft(e.height, {
      c: 0.5
    }) : ""), i = ga(() => e.fillBorderRadius !== void 0 ? ft(e.fillBorderRadius) : e.railBorderRadius !== void 0 ? ft(e.railBorderRadius) : e.height !== void 0 ? ft(e.height, {
      c: 0.5
    }) : "");
    return () => {
      const {
        indicatorPlacement: l,
        railColor: a,
        railStyle: s,
        percentage: d,
        unit: c,
        indicatorTextColor: h,
        status: p,
        showIndicator: g,
        processing: f,
        clsPrefix: v
      } = e;
      return Ht("div", {
        class: `${v}-progress-content`,
        role: "none"
      }, Ht("div", {
        class: `${v}-progress-graph`,
        "aria-hidden": !0
      }, Ht("div", {
        class: [`${v}-progress-graph-line`, {
          [`${v}-progress-graph-line--indicator-${l}`]: !0
        }]
      }, Ht("div", {
        class: `${v}-progress-graph-line-rail`,
        style: [{
          backgroundColor: a,
          height: n.value,
          borderRadius: r.value
        }, s]
      }, Ht("div", {
        class: [`${v}-progress-graph-line-fill`, f && `${v}-progress-graph-line-fill--processing`],
        style: {
          maxWidth: `${e.percentage}%`,
          background: o.value,
          height: n.value,
          lineHeight: n.value,
          borderRadius: i.value
        }
      }, l === "inside" ? Ht("div", {
        class: `${v}-progress-graph-line-indicator`,
        style: {
          color: h
        }
      }, t.default ? t.default() : `${d}${c}`) : null)))), g && l === "outside" ? Ht("div", null, t.default ? Ht("div", {
        class: `${v}-progress-custom-content`,
        style: {
          color: h
        },
        role: "none"
      }, t.default()) : p === "default" ? Ht("div", {
        role: "none",
        class: `${v}-progress-icon ${v}-progress-icon--as-text`,
        style: {
          color: h
        }
      }, d, c) : Ht("div", {
        class: `${v}-progress-icon`,
        "aria-hidden": !0
      }, Ht(Ct, {
        clsPrefix: v
      }, {
        default: () => TE[p]
      }))) : null);
    };
  }
}), EE = window.Vue.computed, zE = window.Vue.defineComponent, Qt = window.Vue.h;
function uh(e, t, n = 100) {
  return `m ${n / 2} ${n / 2 - e} a ${e} ${e} 0 1 1 0 ${2 * e} a ${e} ${e} 0 1 1 0 -${2 * e}`;
}
const OE = zE({
  name: "ProgressMultipleCircle",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    },
    viewBoxWidth: {
      type: Number,
      required: !0
    },
    percentage: {
      type: Array,
      default: [0]
    },
    strokeWidth: {
      type: Number,
      required: !0
    },
    circleGap: {
      type: Number,
      required: !0
    },
    showIndicator: {
      type: Boolean,
      required: !0
    },
    fillColor: {
      type: Array,
      default: () => []
    },
    railColor: {
      type: Array,
      default: () => []
    },
    railStyle: {
      type: Array,
      default: () => []
    }
  },
  setup(e, {
    slots: t
  }) {
    const n = EE(() => e.percentage.map((i, l) => `${Math.PI * i / 100 * (e.viewBoxWidth / 2 - e.strokeWidth / 2 * (1 + 2 * l) - e.circleGap * l) * 2}, ${e.viewBoxWidth * 8}`)), o = (r, i) => {
      const l = e.fillColor[i], a = typeof l == "object" ? l.stops[0] : "", s = typeof l == "object" ? l.stops[1] : "";
      return typeof e.fillColor[i] == "object" && Qt("linearGradient", {
        id: `gradient-${i}`,
        x1: "100%",
        y1: "0%",
        x2: "0%",
        y2: "100%"
      }, Qt("stop", {
        offset: "0%",
        "stop-color": a
      }), Qt("stop", {
        offset: "100%",
        "stop-color": s
      }));
    };
    return () => {
      const {
        viewBoxWidth: r,
        strokeWidth: i,
        circleGap: l,
        showIndicator: a,
        fillColor: s,
        railColor: d,
        railStyle: c,
        percentage: h,
        clsPrefix: p
      } = e;
      return Qt("div", {
        class: `${p}-progress-content`,
        role: "none"
      }, Qt("div", {
        class: `${p}-progress-graph`,
        "aria-hidden": !0
      }, Qt("div", {
        class: `${p}-progress-graph-circle`
      }, Qt("svg", {
        viewBox: `0 0 ${r} ${r}`
      }, Qt("defs", null, h.map((g, f) => o(g, f))), h.map((g, f) => Qt("g", {
        key: f
      }, Qt("path", {
        class: `${p}-progress-graph-circle-rail`,
        d: uh(r / 2 - i / 2 * (1 + 2 * f) - l * f, i, r),
        "stroke-width": i,
        "stroke-linecap": "round",
        fill: "none",
        style: [{
          strokeDashoffset: 0,
          stroke: d[f]
        }, c[f]]
      }), Qt("path", {
        class: [`${p}-progress-graph-circle-fill`, g === 0 && `${p}-progress-graph-circle-fill--empty`],
        d: uh(r / 2 - i / 2 * (1 + 2 * f) - l * f, i, r),
        "stroke-width": i,
        "stroke-linecap": "round",
        fill: "none",
        style: {
          strokeDasharray: n.value[f],
          strokeDashoffset: 0,
          stroke: typeof s[f] == "object" ? `url(#gradient-${f})` : s[f]
        }
      })))))), a && t.default ? Qt("div", null, Qt("div", {
        class: `${p}-progress-text`
      }, t.default())) : null);
    };
  }
}), ME = H([z("progress", {
  display: "inline-block"
}, [z("progress-icon", `
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 `), U("line", `
 width: 100%;
 display: block;
 `, [z("progress-content", `
 display: flex;
 align-items: center;
 `, [z("progress-graph", {
  flex: 1
})]), z("progress-custom-content", {
  marginLeft: "14px"
}), z("progress-icon", `
 width: 30px;
 padding-left: 14px;
 height: var(--n-icon-size-line);
 line-height: var(--n-icon-size-line);
 font-size: var(--n-icon-size-line);
 `, [U("as-text", `
 color: var(--n-text-color-line-outer);
 text-align: center;
 width: 40px;
 font-size: var(--n-font-size);
 padding-left: 4px;
 transition: color .3s var(--n-bezier);
 `)])]), U("circle, dashboard", {
  width: "120px"
}, [z("progress-custom-content", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `), z("progress-text", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: inherit;
 font-size: var(--n-font-size-circle);
 color: var(--n-text-color-circle);
 font-weight: var(--n-font-weight-circle);
 transition: color .3s var(--n-bezier);
 white-space: nowrap;
 `), z("progress-icon", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: var(--n-icon-color);
 font-size: var(--n-icon-size-circle);
 `)]), U("multiple-circle", `
 width: 200px;
 color: inherit;
 `, [z("progress-text", `
 font-weight: var(--n-font-weight-circle);
 color: var(--n-text-color-circle);
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `)]), z("progress-content", {
  position: "relative"
}), z("progress-graph", {
  position: "relative"
}, [z("progress-graph-circle", [H("svg", {
  verticalAlign: "bottom"
}), z("progress-graph-circle-fill", `
 stroke: var(--n-fill-color);
 transition:
 opacity .3s var(--n-bezier),
 stroke .3s var(--n-bezier),
 stroke-dasharray .3s var(--n-bezier);
 `, [U("empty", {
  opacity: 0
})]), z("progress-graph-circle-rail", `
 transition: stroke .3s var(--n-bezier);
 overflow: hidden;
 stroke: var(--n-rail-color);
 `)]), z("progress-graph-line", [U("indicator-inside", [z("progress-graph-line-rail", `
 height: 16px;
 line-height: 16px;
 border-radius: 10px;
 `, [z("progress-graph-line-fill", `
 height: inherit;
 border-radius: 10px;
 `), z("progress-graph-line-indicator", `
 background: #0000;
 white-space: nowrap;
 text-align: right;
 margin-left: 14px;
 margin-right: 14px;
 height: inherit;
 font-size: 12px;
 color: var(--n-text-color-line-inner);
 transition: color .3s var(--n-bezier);
 `)])]), U("indicator-inside-label", `
 height: 16px;
 display: flex;
 align-items: center;
 `, [z("progress-graph-line-rail", `
 flex: 1;
 transition: background-color .3s var(--n-bezier);
 `), z("progress-graph-line-indicator", `
 background: var(--n-fill-color);
 font-size: 12px;
 transform: translateZ(0);
 display: flex;
 vertical-align: middle;
 height: 16px;
 line-height: 16px;
 padding: 0 10px;
 border-radius: 10px;
 position: absolute;
 white-space: nowrap;
 color: var(--n-text-color-line-inner);
 transition:
 right .2s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]), z("progress-graph-line-rail", `
 position: relative;
 overflow: hidden;
 height: var(--n-rail-height);
 border-radius: 5px;
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 `, [z("progress-graph-line-fill", `
 background: var(--n-fill-color);
 position: relative;
 border-radius: 5px;
 height: inherit;
 width: 100%;
 max-width: 0%;
 transition:
 background-color .3s var(--n-bezier),
 max-width .2s var(--n-bezier);
 `, [U("processing", [H("&::after", `
 content: "";
 background-image: var(--n-line-bg-processing);
 animation: progress-processing-animation 2s var(--n-bezier) infinite;
 `)])])])])])]), H("@keyframes progress-processing-animation", `
 0% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 100%;
 opacity: 1;
 }
 66% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 100% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 `)]), ma = window.Vue.computed, IE = window.Vue.defineComponent, ba = window.Vue.h, AE = Object.assign(Object.assign({}, ke.props), {
  processing: Boolean,
  type: {
    type: String,
    default: "line"
  },
  gapDegree: Number,
  gapOffsetDegree: Number,
  status: {
    type: String,
    default: "default"
  },
  railColor: [String, Array],
  railStyle: [String, Array],
  color: [String, Array, Object],
  viewBoxWidth: {
    type: Number,
    default: 100
  },
  strokeWidth: {
    type: Number,
    default: 7
  },
  percentage: [Number, Array],
  unit: {
    type: String,
    default: "%"
  },
  showIndicator: {
    type: Boolean,
    default: !0
  },
  indicatorPosition: {
    type: String,
    default: "outside"
  },
  indicatorPlacement: {
    type: String,
    default: "outside"
  },
  indicatorTextColor: String,
  circleGap: {
    type: Number,
    default: 1
  },
  height: Number,
  borderRadius: [String, Number],
  fillBorderRadius: [String, Number],
  offsetDegree: Number
}), wa = IE({
  name: "Progress",
  props: AE,
  setup(e) {
    const t = ma(() => e.indicatorPlacement || e.indicatorPosition), n = ma(() => {
      if (e.gapDegree || e.gapDegree === 0)
        return e.gapDegree;
      if (e.type === "dashboard")
        return 75;
    }), {
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r
    } = je(e), i = ke("Progress", "-progress", ME, QF, e, o), l = ma(() => {
      const {
        status: s
      } = e, {
        common: {
          cubicBezierEaseInOut: d
        },
        self: {
          fontSize: c,
          fontSizeCircle: h,
          railColor: p,
          railHeight: g,
          iconSizeCircle: f,
          iconSizeLine: v,
          textColorCircle: m,
          textColorLineInner: u,
          textColorLineOuter: w,
          lineBgProcessing: x,
          fontWeightCircle: b,
          [oe("iconColor", s)]: C,
          [oe("fillColor", s)]: S
        }
      } = i.value;
      return {
        "--n-bezier": d,
        "--n-fill-color": S,
        "--n-font-size": c,
        "--n-font-size-circle": h,
        "--n-font-weight-circle": b,
        "--n-icon-color": C,
        "--n-icon-size-circle": f,
        "--n-icon-size-line": v,
        "--n-line-bg-processing": x,
        "--n-rail-color": p,
        "--n-rail-height": g,
        "--n-text-color-circle": m,
        "--n-text-color-line-inner": u,
        "--n-text-color-line-outer": w
      };
    }), a = r ? St("progress", ma(() => e.status[0]), l, e) : void 0;
    return {
      mergedClsPrefix: o,
      mergedIndicatorPlacement: t,
      gapDeg: n,
      cssVars: r ? void 0 : l,
      themeClass: a == null ? void 0 : a.themeClass,
      onRender: a == null ? void 0 : a.onRender
    };
  },
  render() {
    const {
      type: e,
      cssVars: t,
      indicatorTextColor: n,
      showIndicator: o,
      status: r,
      railColor: i,
      railStyle: l,
      color: a,
      percentage: s,
      viewBoxWidth: d,
      strokeWidth: c,
      mergedIndicatorPlacement: h,
      unit: p,
      borderRadius: g,
      fillBorderRadius: f,
      height: v,
      processing: m,
      circleGap: u,
      mergedClsPrefix: w,
      gapDeg: x,
      gapOffsetDegree: b,
      themeClass: C,
      $slots: S,
      onRender: y
    } = this;
    return y == null || y(), ba("div", {
      class: [C, `${w}-progress`, `${w}-progress--${e}`, `${w}-progress--${r}`],
      style: t,
      "aria-valuemax": 100,
      "aria-valuemin": 0,
      "aria-valuenow": s,
      role: e === "circle" || e === "line" || e === "dashboard" ? "progressbar" : "none"
    }, e === "circle" || e === "dashboard" ? ba(PE, {
      clsPrefix: w,
      status: r,
      showIndicator: o,
      indicatorTextColor: n,
      railColor: i,
      fillColor: a,
      railStyle: l,
      offsetDegree: this.offsetDegree,
      percentage: s,
      viewBoxWidth: d,
      strokeWidth: c,
      gapDegree: x === void 0 ? e === "dashboard" ? 75 : 0 : x,
      gapOffsetDegree: b,
      unit: p
    }, S) : e === "line" ? ba(FE, {
      clsPrefix: w,
      status: r,
      showIndicator: o,
      indicatorTextColor: n,
      railColor: i,
      fillColor: a,
      railStyle: l,
      percentage: s,
      processing: m,
      indicatorPlacement: h,
      unit: p,
      fillBorderRadius: f,
      railBorderRadius: g,
      height: v
    }, S) : e === "multiple-circle" ? ba(OE, {
      clsPrefix: w,
      strokeWidth: c,
      railColor: i,
      fillColor: a,
      railStyle: l,
      viewBoxWidth: d,
      percentage: s,
      showIndicator: o,
      circleGap: u
    }, S) : null);
  }
}), VE = z("switch", `
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`, [B("children-placeholder", `
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `), B("rail-placeholder", `
 display: flex;
 flex-wrap: none;
 `), B("button-placeholder", `
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `), z("base-loading", `
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `, [dn({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})]), B("checked, unchecked", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `), B("checked", `
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), B("unchecked", `
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), H("&:focus", [B("rail", `
 box-shadow: var(--n-box-shadow-focus);
 `)]), U("round", [B("rail", "border-radius: calc(var(--n-rail-height) / 2);", [B("button", "border-radius: calc(var(--n-button-height) / 2);")])]), tt("disabled", [tt("icon", [U("rubber-band", [U("pressed", [B("rail", [B("button", "max-width: var(--n-button-width-pressed);")])]), B("rail", [H("&:active", [B("button", "max-width: var(--n-button-width-pressed);")])]), U("active", [U("pressed", [B("rail", [B("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]), B("rail", [H("&:active", [B("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]), U("active", [B("rail", [B("button", "left: calc(100% - var(--n-button-width) - var(--n-offset))")])]), B("rail", `
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `, [B("button-icon", `
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `, [dn()]), B("button", `
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]), U("active", [B("rail", "background-color: var(--n-rail-color-active);")]), U("loading", [B("rail", `
 cursor: wait;
 `)]), U("disabled", [B("rail", `
 cursor: not-allowed;
 opacity: .5;
 `)])]), ya = window.Vue.computed, BE = window.Vue.defineComponent, Zt = window.Vue.h, vs = window.Vue.ref, LE = window.Vue.toRef;
window.Vue.watchEffect;
const DE = Object.assign(Object.assign({}, ke.props), {
  size: {
    type: String,
    default: "medium"
  },
  value: {
    type: [String, Number, Boolean],
    default: void 0
  },
  loading: Boolean,
  defaultValue: {
    type: [String, Number, Boolean],
    default: !1
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  round: {
    type: Boolean,
    default: !0
  },
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  checkedValue: {
    type: [String, Number, Boolean],
    default: !0
  },
  uncheckedValue: {
    type: [String, Number, Boolean],
    default: !1
  },
  railStyle: Function,
  rubberBand: {
    type: Boolean,
    default: !0
  },
  /** @deprecated */
  onChange: [Function, Array]
});
let jr;
const NE = BE({
  name: "Switch",
  props: DE,
  slots: Object,
  setup(e) {
    jr === void 0 && (typeof CSS < "u" ? typeof CSS.supports < "u" ? jr = CSS.supports("width", "max(1px)") : jr = !1 : jr = !0);
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = je(e), o = ke("Switch", "-switch", VE, n3, e, t), r = qn(e), {
      mergedSizeRef: i,
      mergedDisabledRef: l
    } = r, a = vs(e.defaultValue), s = LE(e, "value"), d = It(s, a), c = ya(() => d.value === e.checkedValue), h = vs(!1), p = vs(!1), g = ya(() => {
      const {
        railStyle: T
      } = e;
      if (T)
        return T({
          focused: p.value,
          checked: c.value
        });
    });
    function f(T) {
      const {
        "onUpdate:value": R,
        onChange: E,
        onUpdateValue: W
      } = e, {
        nTriggerFormInput: _,
        nTriggerFormChange: M
      } = r;
      R && ie(R, T), W && ie(W, T), E && ie(E, T), a.value = T, _(), M();
    }
    function v() {
      const {
        nTriggerFormFocus: T
      } = r;
      T();
    }
    function m() {
      const {
        nTriggerFormBlur: T
      } = r;
      T();
    }
    function u() {
      e.loading || l.value || (d.value !== e.checkedValue ? f(e.checkedValue) : f(e.uncheckedValue));
    }
    function w() {
      p.value = !0, v();
    }
    function x() {
      p.value = !1, m(), h.value = !1;
    }
    function b(T) {
      e.loading || l.value || T.key === " " && (d.value !== e.checkedValue ? f(e.checkedValue) : f(e.uncheckedValue), h.value = !1);
    }
    function C(T) {
      e.loading || l.value || T.key === " " && (T.preventDefault(), h.value = !0);
    }
    const S = ya(() => {
      const {
        value: T
      } = i, {
        self: {
          opacityDisabled: R,
          railColor: E,
          railColorActive: W,
          buttonBoxShadow: _,
          buttonColor: M,
          boxShadowFocus: I,
          loadingColor: O,
          textColor: K,
          iconColor: L,
          [oe("buttonHeight", T)]: Y,
          [oe("buttonWidth", T)]: Q,
          [oe("buttonWidthPressed", T)]: J,
          [oe("railHeight", T)]: q,
          [oe("railWidth", T)]: A,
          [oe("railBorderRadius", T)]: G,
          [oe("buttonBorderRadius", T)]: Z
        },
        common: {
          cubicBezierEaseInOut: ae
        }
      } = o.value;
      let le, de, ge;
      return jr ? (le = `calc((${q} - ${Y}) / 2)`, de = `max(${q}, ${Y})`, ge = `max(${A}, calc(${A} + ${Y} - ${q}))`) : (le = lt((Rt(q) - Rt(Y)) / 2), de = lt(Math.max(Rt(q), Rt(Y))), ge = Rt(q) > Rt(Y) ? A : lt(Rt(A) + Rt(Y) - Rt(q))), {
        "--n-bezier": ae,
        "--n-button-border-radius": Z,
        "--n-button-box-shadow": _,
        "--n-button-color": M,
        "--n-button-width": Q,
        "--n-button-width-pressed": J,
        "--n-button-height": Y,
        "--n-height": de,
        "--n-offset": le,
        "--n-opacity-disabled": R,
        "--n-rail-border-radius": G,
        "--n-rail-color": E,
        "--n-rail-color-active": W,
        "--n-rail-height": q,
        "--n-rail-width": A,
        "--n-width": ge,
        "--n-box-shadow-focus": I,
        "--n-loading-color": O,
        "--n-text-color": K,
        "--n-icon-color": L
      };
    }), y = n ? St("switch", ya(() => i.value[0]), S, e) : void 0;
    return {
      handleClick: u,
      handleBlur: x,
      handleFocus: w,
      handleKeyup: b,
      handleKeydown: C,
      mergedRailStyle: g,
      pressed: h,
      mergedClsPrefix: t,
      mergedValue: d,
      checked: c,
      mergedDisabled: l,
      cssVars: n ? void 0 : S,
      themeClass: y == null ? void 0 : y.themeClass,
      onRender: y == null ? void 0 : y.onRender
    };
  },
  render() {
    const {
      mergedClsPrefix: e,
      mergedDisabled: t,
      checked: n,
      mergedRailStyle: o,
      onRender: r,
      $slots: i
    } = this;
    r == null || r();
    const {
      checked: l,
      unchecked: a,
      icon: s,
      "checked-icon": d,
      "unchecked-icon": c
    } = i, h = !(ar(s) && ar(d) && ar(c));
    return Zt("div", {
      role: "switch",
      "aria-checked": n,
      class: [`${e}-switch`, this.themeClass, h && `${e}-switch--icon`, n && `${e}-switch--active`, t && `${e}-switch--disabled`, this.round && `${e}-switch--round`, this.loading && `${e}-switch--loading`, this.pressed && `${e}-switch--pressed`, this.rubberBand && `${e}-switch--rubber-band`],
      tabindex: this.mergedDisabled ? void 0 : 0,
      style: this.cssVars,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyup: this.handleKeyup,
      onKeydown: this.handleKeydown
    }, Zt("div", {
      class: `${e}-switch__rail`,
      "aria-hidden": "true",
      style: o
    }, qe(l, (p) => qe(a, (g) => p || g ? Zt("div", {
      "aria-hidden": !0,
      class: `${e}-switch__children-placeholder`
    }, Zt("div", {
      class: `${e}-switch__rail-placeholder`
    }, Zt("div", {
      class: `${e}-switch__button-placeholder`
    }), p), Zt("div", {
      class: `${e}-switch__rail-placeholder`
    }, Zt("div", {
      class: `${e}-switch__button-placeholder`
    }), g)) : null)), Zt("div", {
      class: `${e}-switch__button`
    }, qe(s, (p) => qe(d, (g) => qe(c, (f) => Zt(gr, null, {
      default: () => this.loading ? Zt(br, {
        key: "loading",
        clsPrefix: e,
        strokeWidth: 20
      }) : this.checked && (g || p) ? Zt("div", {
        class: `${e}-switch__button-icon`,
        key: g ? "checked-icon" : "icon"
      }, g || p) : !this.checked && (f || p) ? Zt("div", {
        class: `${e}-switch__button-icon`,
        key: f ? "unchecked-icon" : "icon"
      }, f || p) : null
    })))), qe(l, (p) => p && Zt("div", {
      key: "checked",
      class: `${e}-switch__checked`
    }, p)), qe(a, (p) => p && Zt("div", {
      key: "unchecked",
      class: `${e}-switch__unchecked`
    }, p)))));
  }
}), HE = window.Vue.defineComponent, _e = window.Vue.unref, Oe = window.Vue.createVNode, Ue = window.Vue.withCtx, zt = window.Vue.toDisplayString, nr = window.Vue.createTextVNode, Ro = window.Vue.createElementVNode, jE = window.Vue.openBlock, WE = window.Vue.createElementBlock, UE = { class: "plugin-monitor" }, KE = { class: "muted" }, fh = window.Vue.computed, qE = window.Vue.onBeforeUnmount, GE = window.Vue.onMounted, hh = window.Vue.reactive, gs = window.Vue.ref, XE = /* @__PURE__ */ HE({
  __name: "MonitorView",
  setup(e) {
    const { t } = Ha(), n = hh({
      cpuThreshold: 60,
      memoryThreshold: 60,
      diskThreshold: 60,
      enabled: "Y"
    }), o = hh({}), r = gs(!1), i = gs(!1), l = gs("--");
    let a = null;
    const s = fh(() => {
      var C;
      if (!((C = o.disks) != null && C.length)) return 0;
      const b = Math.max(...o.disks.map((S) => S.usage || 0));
      return Number.isFinite(b) ? Math.round(b) : 0;
    }), d = fh(() => [
      { title: "Disk", key: "path" },
      { title: t("plugin.monitor.disk"), key: "usage", render: (b) => `${b.usage}%` },
      { title: "Used", key: "used", render: (b) => w(b.used) },
      { title: "Free", key: "free", render: (b) => w(b.free) },
      { title: "Total", key: "total", render: (b) => w(b.total) }
    ]);
    function c() {
      const b = window;
      return typeof window < "u" && b.__TT_PLUGIN_API_BASE__ != null && b.__TT_PLUGIN_API_BASE__ || "";
    }
    function h() {
      const C = Object.keys(localStorage).find((y) => /token$/i.test(y) && !/refresh/i.test(y));
      if (!C) return null;
      const S = localStorage.getItem(C);
      if (!S) return null;
      try {
        return JSON.parse(S);
      } catch {
        return S;
      }
    }
    async function p(b, C = {}) {
      const S = {
        "Content-Type": "application/json"
      }, y = h();
      y && (S.Authorization = y.startsWith("Bearer ") ? y : `Bearer ${y}`);
      const R = await (await fetch(`${c()}${b}`, {
        ...C,
        headers: {
          ...S,
          ...C.headers
        }
      })).json();
      return R.data ?? R;
    }
    async function g() {
      const b = await p("/plugin/monitor/config");
      Object.assign(n, b);
    }
    async function f() {
      var b;
      r.value = !0;
      try {
        const C = await p("/plugin/monitor/config", {
          method: "PUT",
          body: JSON.stringify(n)
        });
        Object.assign(n, C), (b = window.$message) == null || b.success(t("common.saveSuccess"));
      } finally {
        r.value = !1;
      }
    }
    async function v() {
      i.value = !0;
      try {
        const b = await p("/plugin/monitor/metrics");
        Object.assign(o, b), l.value = new Date(o.timestamp || Date.now()).toLocaleString();
      } finally {
        i.value = !1;
      }
    }
    function m(b) {
      return b ? "error" : "success";
    }
    function u(b) {
      return b ? "error" : "success";
    }
    function w(b) {
      if (!b) return "0 B";
      const C = ["B", "KB", "MB", "GB", "TB"];
      let S = 0, y = b;
      for (; y >= 1024 && S < C.length - 1; )
        y /= 1024, S += 1;
      return `${y.toFixed(2)} ${C[S]}`;
    }
    function x(b) {
      if (!b) return "--";
      const C = Math.floor(b / 1e3), S = Math.floor(C / 86400), y = Math.floor(C % 86400 / 3600), T = Math.floor(C % 3600 / 60);
      return `${S}d ${y}h ${T}m`;
    }
    return GE(async () => {
      await g(), await v(), a = window.setInterval(v, 2e3);
    }), qE(() => {
      a && window.clearInterval(a);
    }), (b, C) => (jE(), WE("div", UE, [
      Oe(_e(ao), {
        vertical: "",
        size: "large"
      }, {
        default: Ue(() => [
          Oe(_e(Jo), {
            title: _e(t)("plugin.monitor.config"),
            size: "small",
            bordered: ""
          }, {
            default: Ue(() => [
              Oe(_e(d3), {
                "label-placement": "left",
                "label-width": "140",
                model: n,
                size: "small"
              }, {
                default: Ue(() => [
                  Oe(_e(lh), {
                    cols: "4",
                    "x-gap": "16",
                    "y-gap": "8",
                    responsive: "screen"
                  }, {
                    default: Ue(() => [
                      Oe(_e(pa), {
                        label: _e(t)("plugin.monitor.threshold") + " CPU"
                      }, {
                        default: Ue(() => [
                          Oe(_e(ps), {
                            value: n.cpuThreshold,
                            "onUpdate:value": C[0] || (C[0] = (S) => n.cpuThreshold = S),
                            min: 1,
                            max: 100
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      Oe(_e(pa), {
                        label: _e(t)("plugin.monitor.threshold") + " Memory"
                      }, {
                        default: Ue(() => [
                          Oe(_e(ps), {
                            value: n.memoryThreshold,
                            "onUpdate:value": C[1] || (C[1] = (S) => n.memoryThreshold = S),
                            min: 1,
                            max: 100
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      Oe(_e(pa), {
                        label: _e(t)("plugin.monitor.threshold") + " Disk"
                      }, {
                        default: Ue(() => [
                          Oe(_e(ps), {
                            value: n.diskThreshold,
                            "onUpdate:value": C[2] || (C[2] = (S) => n.diskThreshold = S),
                            min: 1,
                            max: 100
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      Oe(_e(pa), { label: "Enabled" }, {
                        default: Ue(() => [
                          Oe(_e(NE), {
                            value: n.enabled,
                            "onUpdate:value": C[3] || (C[3] = (S) => n.enabled = S),
                            "checked-value": "Y",
                            "unchecked-value": "N"
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["model"]),
              Oe(_e(ao), {
                justify: "end",
                class: "action-row"
              }, {
                default: Ue(() => [
                  Oe(_e(hi), {
                    type: "primary",
                    onClick: f,
                    loading: r.value
                  }, {
                    default: Ue(() => [
                      nr(
                        zt(_e(t)("plugin.monitor.save")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["loading"]),
                  Oe(_e(hi), {
                    onClick: v,
                    loading: i.value
                  }, {
                    default: Ue(() => [
                      nr(
                        zt(_e(t)("plugin.monitor.refresh")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["loading"])
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["title"]),
          Oe(_e(lh), {
            cols: "4",
            "x-gap": "16",
            "y-gap": "16",
            responsive: "screen"
          }, {
            default: Ue(() => [
              Oe(_e(Ur), null, {
                default: Ue(() => [
                  Oe(_e(Jo), {
                    size: "small",
                    bordered: ""
                  }, {
                    default: Ue(() => {
                      var S;
                      return [
                        Oe(_e(ao), {
                          align: "center",
                          justify: "space-between"
                        }, {
                          default: Ue(() => {
                            var y;
                            return [
                              Ro(
                                "div",
                                null,
                                zt(_e(t)("plugin.monitor.cpu")),
                                1
                                /* TEXT */
                              ),
                              Oe(_e(To), {
                                type: m((y = o.alerts) == null ? void 0 : y.cpu)
                              }, {
                                default: Ue(() => [
                                  nr(
                                    zt(o.cpuUsage ?? 0) + "%",
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                _: 1
                                /* STABLE */
                              }, 8, ["type"])
                            ];
                          }),
                          _: 1
                          /* STABLE */
                        }),
                        Oe(_e(wa), {
                          type: "line",
                          percentage: o.cpuUsage || 0,
                          status: u((S = o.alerts) == null ? void 0 : S.cpu)
                        }, null, 8, ["percentage", "status"])
                      ];
                    }),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              Oe(_e(Ur), null, {
                default: Ue(() => [
                  Oe(_e(Jo), {
                    size: "small",
                    bordered: ""
                  }, {
                    default: Ue(() => {
                      var S;
                      return [
                        Oe(_e(ao), {
                          align: "center",
                          justify: "space-between"
                        }, {
                          default: Ue(() => {
                            var y;
                            return [
                              Ro(
                                "div",
                                null,
                                zt(_e(t)("plugin.monitor.memory")),
                                1
                                /* TEXT */
                              ),
                              Oe(_e(To), {
                                type: m((y = o.alerts) == null ? void 0 : y.memory)
                              }, {
                                default: Ue(() => [
                                  nr(
                                    zt(o.memoryUsage ?? 0) + "%",
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                _: 1
                                /* STABLE */
                              }, 8, ["type"])
                            ];
                          }),
                          _: 1
                          /* STABLE */
                        }),
                        Oe(_e(wa), {
                          type: "line",
                          percentage: o.memoryUsage || 0,
                          status: u((S = o.alerts) == null ? void 0 : S.memory)
                        }, null, 8, ["percentage", "status"])
                      ];
                    }),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              Oe(_e(Ur), null, {
                default: Ue(() => [
                  Oe(_e(Jo), {
                    size: "small",
                    bordered: ""
                  }, {
                    default: Ue(() => {
                      var S;
                      return [
                        Oe(_e(ao), {
                          align: "center",
                          justify: "space-between"
                        }, {
                          default: Ue(() => {
                            var y;
                            return [
                              Ro(
                                "div",
                                null,
                                zt(_e(t)("plugin.monitor.disk")),
                                1
                                /* TEXT */
                              ),
                              Oe(_e(To), {
                                type: m((y = o.alerts) == null ? void 0 : y.disk)
                              }, {
                                default: Ue(() => [
                                  nr(
                                    zt(s.value) + "%",
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                _: 1
                                /* STABLE */
                              }, 8, ["type"])
                            ];
                          }),
                          _: 1
                          /* STABLE */
                        }),
                        Oe(_e(wa), {
                          type: "line",
                          percentage: s.value,
                          status: u((S = o.alerts) == null ? void 0 : S.disk)
                        }, null, 8, ["percentage", "status"])
                      ];
                    }),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              Oe(_e(Ur), null, {
                default: Ue(() => [
                  Oe(_e(Jo), {
                    size: "small",
                    bordered: ""
                  }, {
                    default: Ue(() => [
                      Oe(_e(ao), {
                        align: "center",
                        justify: "space-between"
                      }, {
                        default: Ue(() => [
                          Ro(
                            "div",
                            null,
                            zt(_e(t)("plugin.monitor.jvm")),
                            1
                            /* TEXT */
                          ),
                          Oe(_e(To), { type: "info" }, {
                            default: Ue(() => [
                              nr(
                                zt(o.jvmMemoryUsage ?? 0) + "%",
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 1
                            /* STABLE */
                          })
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      Oe(_e(wa), {
                        type: "line",
                        percentage: o.jvmMemoryUsage || 0
                      }, null, 8, ["percentage"])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            _: 1
            /* STABLE */
          }),
          Oe(_e(Jo), {
            size: "small",
            bordered: ""
          }, {
            default: Ue(() => [
              Oe(_e(ao), {
                justify: "space-between",
                align: "center"
              }, {
                default: Ue(() => [
                  Oe(_e(ao), { size: "large" }, {
                    default: Ue(() => [
                      Ro(
                        "div",
                        null,
                        zt(_e(t)("plugin.monitor.thread")) + ": " + zt(o.threadCount ?? 0),
                        1
                        /* TEXT */
                      ),
                      Ro(
                        "div",
                        null,
                        zt(_e(t)("plugin.monitor.uptime")) + ": " + zt(x(o.uptime)),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  Ro(
                    "div",
                    KE,
                    zt(_e(t)("plugin.monitor.lastUpdate")) + ": " + zt(l.value),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }),
              Oe(_e(LF), {
                columns: d.value,
                data: o.disks || [],
                loading: i.value,
                "row-key": (S) => S.path,
                class: "disk-table"
              }, null, 8, ["columns", "data", "loading", "row-key"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })
    ]));
  }
}), YE = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, JE = /* @__PURE__ */ YE(XE, [["__scopeId", "data-v-0822b5b4"]]);
export {
  JE as default
};
