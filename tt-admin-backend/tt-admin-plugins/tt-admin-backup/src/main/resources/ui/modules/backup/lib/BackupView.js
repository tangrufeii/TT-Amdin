/*!
  * shared v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function nm(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Pd = typeof window < "u", Eo = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), om = (e, t, n) => rm({ l: e, k: t, s: n }), rm = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Rt = (e) => typeof e == "number" && isFinite(e), im = (e) => Ms(e) === "[object Date]", da = (e) => Ms(e) === "[object RegExp]", Ca = (e) => Ue(e) && Object.keys(e).length === 0, kt = Object.assign, am = Object.create, nt = (e = null) => am(e);
let _d;
const xo = () => _d || (_d = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : nt());
function Td(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function Fd(e) {
  return e.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function lm(e) {
  return e = e.replace(/(\w+)\s*=\s*"([^"]*)"/g, (o, r, i) => `${r}="${Fd(i)}"`), e = e.replace(/(\w+)\s*=\s*'([^']*)'/g, (o, r, i) => `${r}='${Fd(i)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(e) && (e = e.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ].forEach((o) => {
    e = e.replace(o, "$1javascript&#58;");
  }), e;
}
const sm = Object.prototype.hasOwnProperty;
function pn(e, t) {
  return sm.call(e, t);
}
const bt = Array.isArray, ht = (e) => typeof e == "function", ye = (e) => typeof e == "string", gt = (e) => typeof e == "boolean", Ke = (e) => e !== null && typeof e == "object", dm = (e) => Ke(e) && ht(e.then) && ht(e.catch), Jf = Object.prototype.toString, Ms = (e) => Jf.call(e), Ue = (e) => Ms(e) === "[object Object]", cm = (e) => e == null ? "" : bt(e) || Ue(e) && e.toString === Jf ? JSON.stringify(e, null, 2) : String(e);
function Is(e, t = "") {
  return e.reduce((n, o, r) => r === 0 ? n + o : n + t + o, "");
}
const ui = (e) => !Ke(e) || bt(e);
function ra(e, t) {
  if (ui(e) || ui(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: o, des: r } = n.pop();
    Object.keys(o).forEach((i) => {
      i !== "__proto__" && (Ke(o[i]) && !Ke(r[i]) && (r[i] = Array.isArray(o[i]) ? [] : nt()), ui(r[i]) || ui(o[i]) ? r[i] = o[i] : n.push({ src: o[i], des: r[i] }));
    });
  }
}
/*!
  * message-compiler v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function um(e, t, n) {
  return { line: e, column: t, offset: n };
}
function Jl(e, t, n) {
  return { start: e, end: t };
}
const Xe = {
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
}, fm = 17;
function Sa(e, t, n = {}) {
  const { domain: o, messages: r, args: i } = n, l = e, a = new SyntaxError(String(l));
  return a.code = e, t && (a.location = t), a.domain = o, a;
}
function hm(e) {
  throw e;
}
const gn = " ", pm = "\r", Et = `
`, vm = "\u2028", mm = "\u2029";
function gm(e) {
  const t = e;
  let n = 0, o = 1, r = 1, i = 0;
  const l = (y) => t[y] === pm && t[y + 1] === Et, a = (y) => t[y] === Et, s = (y) => t[y] === mm, d = (y) => t[y] === vm, c = (y) => l(y) || a(y) || s(y) || d(y), h = () => n, p = () => o, v = () => r, f = () => i, m = (y) => l(y) || s(y) || d(y) ? Et : t[y], g = () => m(n), u = () => m(n + i);
  function w() {
    return i = 0, c(n) && (o++, r = 0), l(n) && n++, n++, r++, t[n];
  }
  function C() {
    return l(n + i) && i++, i++, t[n + i];
  }
  function b() {
    n = 0, o = 1, r = 1, i = 0;
  }
  function x(y = 0) {
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
    column: v,
    peekOffset: f,
    charAt: m,
    currentChar: g,
    currentPeek: u,
    next: w,
    peek: C,
    reset: b,
    resetPeek: x,
    skipToPeek: S
  };
}
const zn = void 0, bm = ".", Ed = "'", wm = "tokenizer";
function ym(e, t = {}) {
  const n = t.location !== !1, o = gm(e), r = () => o.index(), i = () => um(o.line(), o.column(), o.index()), l = i(), a = r(), s = {
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
      const he = n ? Jl(ve.startLoc, $) : null, F = Sa(k, he, {
        domain: wm,
        args: ee
      });
      c(F);
    }
  }
  function p(k, $, D) {
    k.endLoc = i(), k.currentType = $;
    const ee = { type: $ };
    return n && (ee.loc = Jl(k.startLoc, k.endLoc)), D != null && (ee.value = D), ee;
  }
  const v = (k) => p(
    k,
    13
    /* TokenTypes.EOF */
  );
  function f(k, $) {
    return k.currentChar() === $ ? (k.next(), $) : (h(Xe.EXPECTED_TOKEN, i(), 0, $), "");
  }
  function m(k) {
    let $ = "";
    for (; k.currentPeek() === gn || k.currentPeek() === Et; )
      $ += k.currentPeek(), k.peek();
    return $;
  }
  function g(k) {
    const $ = m(k);
    return k.skipToPeek(), $;
  }
  function u(k) {
    if (k === zn)
      return !1;
    const $ = k.charCodeAt(0);
    return $ >= 97 && $ <= 122 || // a-z
    $ >= 65 && $ <= 90 || // A-Z
    $ === 95;
  }
  function w(k) {
    if (k === zn)
      return !1;
    const $ = k.charCodeAt(0);
    return $ >= 48 && $ <= 57;
  }
  function C(k, $) {
    const { currentType: D } = $;
    if (D !== 2)
      return !1;
    m(k);
    const ee = u(k.currentPeek());
    return k.resetPeek(), ee;
  }
  function b(k, $) {
    const { currentType: D } = $;
    if (D !== 2)
      return !1;
    m(k);
    const ee = k.currentPeek() === "-" ? k.peek() : k.currentPeek(), ve = w(ee);
    return k.resetPeek(), ve;
  }
  function x(k, $) {
    const { currentType: D } = $;
    if (D !== 2)
      return !1;
    m(k);
    const ee = k.currentPeek() === Ed;
    return k.resetPeek(), ee;
  }
  function S(k, $) {
    const { currentType: D } = $;
    if (D !== 7)
      return !1;
    m(k);
    const ee = k.currentPeek() === ".";
    return k.resetPeek(), ee;
  }
  function y(k, $) {
    const { currentType: D } = $;
    if (D !== 8)
      return !1;
    m(k);
    const ee = u(k.currentPeek());
    return k.resetPeek(), ee;
  }
  function T(k, $) {
    const { currentType: D } = $;
    if (!(D === 7 || D === 11))
      return !1;
    m(k);
    const ee = k.currentPeek() === ":";
    return k.resetPeek(), ee;
  }
  function R(k, $) {
    const { currentType: D } = $;
    if (D !== 9)
      return !1;
    const ee = () => {
      const he = k.currentPeek();
      return he === "{" ? u(k.peek()) : he === "@" || he === "|" || he === ":" || he === "." || he === gn || !he ? !1 : he === Et ? (k.peek(), ee()) : W(k, !1);
    }, ve = ee();
    return k.resetPeek(), ve;
  }
  function E(k) {
    m(k);
    const $ = k.currentPeek() === "|";
    return k.resetPeek(), $;
  }
  function W(k, $ = !0) {
    const D = (ve = !1, he = "") => {
      const F = k.currentPeek();
      return F === "{" || F === "@" || !F ? ve : F === "|" ? !(he === gn || he === Et) : F === gn ? (k.peek(), D(!0, gn)) : F === Et ? (k.peek(), D(!0, Et)) : !0;
    }, ee = D();
    return $ && k.resetPeek(), ee;
  }
  function _(k, $) {
    const D = k.currentChar();
    return D === zn ? zn : $(D) ? (k.next(), D) : null;
  }
  function z(k) {
    const $ = k.charCodeAt(0);
    return $ >= 97 && $ <= 122 || // a-z
    $ >= 65 && $ <= 90 || // A-Z
    $ >= 48 && $ <= 57 || // 0-9
    $ === 95 || // _
    $ === 36;
  }
  function M(k) {
    return _(k, z);
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
  function U(k) {
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
  function I(k) {
    let $ = "";
    for (; ; ) {
      const D = k.currentChar();
      if (D === "{" || D === "}" || D === "@" || D === "|" || !D)
        break;
      if (D === gn || D === Et)
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
    g(k);
    let $ = "", D = "";
    for (; $ = U(k); )
      D += $;
    const ee = k.currentChar();
    if (ee && ee !== "}" && ee !== zn && ee !== gn && ee !== Et && ee !== "　") {
      const ve = ce(k);
      return h(Xe.INVALID_TOKEN_IN_PLACEHOLDER, i(), 0, D + ve), D + ve;
    }
    return k.currentChar() === zn && h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), D;
  }
  function Z(k) {
    g(k);
    let $ = "";
    return k.currentChar() === "-" ? (k.next(), $ += `-${q(k)}`) : $ += q(k), k.currentChar() === zn && h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), $;
  }
  function ae(k) {
    return k !== Ed && k !== Et;
  }
  function le(k) {
    g(k), f(k, "'");
    let $ = "", D = "";
    for (; $ = _(k, ae); )
      $ === "\\" ? D += de(k) : D += $;
    const ee = k.currentChar();
    return ee === Et || ee === zn ? (h(Xe.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, i(), 0), ee === Et && (k.next(), f(k, "'")), D) : (f(k, "'"), D);
  }
  function de(k) {
    const $ = k.currentChar();
    switch ($) {
      case "\\":
      case "'":
        return k.next(), `\\${$}`;
      case "u":
        return me(k, $, 4);
      case "U":
        return me(k, $, 6);
      default:
        return h(Xe.UNKNOWN_ESCAPE_SEQUENCE, i(), 0, $), "";
    }
  }
  function me(k, $, D) {
    f(k, $);
    let ee = "";
    for (let ve = 0; ve < D; ve++) {
      const he = J(k);
      if (!he) {
        h(Xe.INVALID_UNICODE_ESCAPE_SEQUENCE, i(), 0, `\\${$}${ee}${k.currentChar()}`);
        break;
      }
      ee += he;
    }
    return `\\${$}${ee}`;
  }
  function X(k) {
    return k !== "{" && k !== "}" && k !== gn && k !== Et;
  }
  function ce(k) {
    g(k);
    let $ = "", D = "";
    for (; $ = _(k, X); )
      D += $;
    return D;
  }
  function ke(k) {
    let $ = "", D = "";
    for (; $ = M(k); )
      D += $;
    return D;
  }
  function ge(k) {
    const $ = (D) => {
      const ee = k.currentChar();
      return ee === "{" || ee === "@" || ee === "|" || ee === "(" || ee === ")" || !ee || ee === gn ? D : (D += ee, k.next(), $(D));
    };
    return $("");
  }
  function $e(k) {
    g(k);
    const $ = f(
      k,
      "|"
      /* TokenChars.Pipe */
    );
    return g(k), $;
  }
  function Se(k, $) {
    let D = null;
    switch (k.currentChar()) {
      case "{":
        return $.braceNest >= 1 && h(Xe.NOT_ALLOW_NEST_PLACEHOLDER, i(), 0), k.next(), D = p(
          $,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), g(k), $.braceNest++, D;
      case "}":
        return $.braceNest > 0 && $.currentType === 2 && h(Xe.EMPTY_PLACEHOLDER, i(), 0), k.next(), D = p(
          $,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), $.braceNest--, $.braceNest > 0 && g(k), $.inLinked && $.braceNest === 0 && ($.inLinked = !1), D;
      case "@":
        return $.braceNest > 0 && h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), D = Be(k, $) || v($), $.braceNest = 0, D;
      default: {
        let ve = !0, he = !0, F = !0;
        if (E(k))
          return $.braceNest > 0 && h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), D = p($, 1, $e(k)), $.braceNest = 0, $.inLinked = !1, D;
        if ($.braceNest > 0 && ($.currentType === 4 || $.currentType === 5 || $.currentType === 6))
          return h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), $.braceNest = 0, Me(k, $);
        if (ve = C(k, $))
          return D = p($, 4, G(k)), g(k), D;
        if (he = b(k, $))
          return D = p($, 5, Z(k)), g(k), D;
        if (F = x(k, $))
          return D = p($, 6, le(k)), g(k), D;
        if (!ve && !he && !F)
          return D = p($, 12, ce(k)), h(Xe.INVALID_TOKEN_IN_PLACEHOLDER, i(), 0, D.value), g(k), D;
        break;
      }
    }
    return D;
  }
  function Be(k, $) {
    const { currentType: D } = $;
    let ee = null;
    const ve = k.currentChar();
    switch ((D === 7 || D === 8 || D === 11 || D === 9) && (ve === Et || ve === gn) && h(Xe.INVALID_LINKED_FORMAT, i(), 0), ve) {
      case "@":
        return k.next(), ee = p(
          $,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), $.inLinked = !0, ee;
      case ".":
        return g(k), k.next(), p(
          $,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return g(k), k.next(), p(
          $,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return E(k) ? (ee = p($, 1, $e(k)), $.braceNest = 0, $.inLinked = !1, ee) : S(k, $) || T(k, $) ? (g(k), Be(k, $)) : y(k, $) ? (g(k), p($, 11, ke(k))) : R(k, $) ? (g(k), ve === "{" ? Se(k, $) || ee : p($, 10, ge(k))) : (D === 7 && h(Xe.INVALID_LINKED_FORMAT, i(), 0), $.braceNest = 0, $.inLinked = !1, Me(k, $));
    }
  }
  function Me(k, $) {
    let D = {
      type: 13
      /* TokenTypes.EOF */
    };
    if ($.braceNest > 0)
      return Se(k, $) || v($);
    if ($.inLinked)
      return Be(k, $) || v($);
    switch (k.currentChar()) {
      case "{":
        return Se(k, $) || v($);
      case "}":
        return h(Xe.UNBALANCED_CLOSING_BRACE, i(), 0), k.next(), p(
          $,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return Be(k, $) || v($);
      default: {
        if (E(k))
          return D = p($, 1, $e(k)), $.braceNest = 0, $.inLinked = !1, D;
        if (W(k))
          return p($, 0, I(k));
        break;
      }
    }
    return D;
  }
  function oe() {
    const { currentType: k, offset: $, startLoc: D, endLoc: ee } = s;
    return s.lastType = k, s.lastOffset = $, s.lastStartLoc = D, s.lastEndLoc = ee, s.offset = r(), s.startLoc = i(), o.currentChar() === zn ? p(
      s,
      13
      /* TokenTypes.EOF */
    ) : Me(o, s);
  }
  return {
    nextToken: oe,
    currentOffset: r,
    currentPosition: i,
    context: d
  };
}
const xm = "parser", Cm = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Sm(e, t, n) {
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
function $m(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function o(u, w, C, b, ...x) {
    const S = u.currentPosition();
    if (S.offset += b, S.column += b, n) {
      const y = t ? Jl(C, S) : null, T = Sa(w, y, {
        domain: xm,
        args: x
      });
      n(T);
    }
  }
  function r(u, w, C) {
    const b = { type: u };
    return t && (b.start = w, b.end = w, b.loc = { start: C, end: C }), b;
  }
  function i(u, w, C, b) {
    t && (u.end = w, u.loc && (u.loc.end = C));
  }
  function l(u, w) {
    const C = u.context(), b = r(3, C.offset, C.startLoc);
    return b.value = w, i(b, u.currentOffset(), u.currentPosition()), b;
  }
  function a(u, w) {
    const C = u.context(), { lastOffset: b, lastStartLoc: x } = C, S = r(5, b, x);
    return S.index = parseInt(w, 10), u.nextToken(), i(S, u.currentOffset(), u.currentPosition()), S;
  }
  function s(u, w) {
    const C = u.context(), { lastOffset: b, lastStartLoc: x } = C, S = r(4, b, x);
    return S.key = w, u.nextToken(), i(S, u.currentOffset(), u.currentPosition()), S;
  }
  function d(u, w) {
    const C = u.context(), { lastOffset: b, lastStartLoc: x } = C, S = r(9, b, x);
    return S.value = w.replace(Cm, Sm), u.nextToken(), i(S, u.currentOffset(), u.currentPosition()), S;
  }
  function c(u) {
    const w = u.nextToken(), C = u.context(), { lastOffset: b, lastStartLoc: x } = C, S = r(8, b, x);
    return w.type !== 11 ? (o(u, Xe.UNEXPECTED_EMPTY_LINKED_MODIFIER, C.lastStartLoc, 0), S.value = "", i(S, b, x), {
      nextConsumeToken: w,
      node: S
    }) : (w.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, C.lastStartLoc, 0, bn(w)), S.value = w.value || "", i(S, u.currentOffset(), u.currentPosition()), {
      node: S
    });
  }
  function h(u, w) {
    const C = u.context(), b = r(7, C.offset, C.startLoc);
    return b.value = w, i(b, u.currentOffset(), u.currentPosition()), b;
  }
  function p(u) {
    const w = u.context(), C = r(6, w.offset, w.startLoc);
    let b = u.nextToken();
    if (b.type === 8) {
      const x = c(u);
      C.modifier = x.node, b = x.nextConsumeToken || u.nextToken();
    }
    switch (b.type !== 9 && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn(b)), b = u.nextToken(), b.type === 2 && (b = u.nextToken()), b.type) {
      case 10:
        b.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn(b)), C.key = h(u, b.value || "");
        break;
      case 4:
        b.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn(b)), C.key = s(u, b.value || "");
        break;
      case 5:
        b.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn(b)), C.key = a(u, b.value || "");
        break;
      case 6:
        b.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn(b)), C.key = d(u, b.value || "");
        break;
      default: {
        o(u, Xe.UNEXPECTED_EMPTY_LINKED_KEY, w.lastStartLoc, 0);
        const x = u.context(), S = r(7, x.offset, x.startLoc);
        return S.value = "", i(S, x.offset, x.startLoc), C.key = S, i(C, x.offset, x.startLoc), {
          nextConsumeToken: b,
          node: C
        };
      }
    }
    return i(C, u.currentOffset(), u.currentPosition()), {
      node: C
    };
  }
  function v(u) {
    const w = u.context(), C = w.currentType === 1 ? u.currentOffset() : w.offset, b = w.currentType === 1 ? w.endLoc : w.startLoc, x = r(2, C, b);
    x.items = [];
    let S = null;
    do {
      const R = S || u.nextToken();
      switch (S = null, R.type) {
        case 0:
          R.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn(R)), x.items.push(l(u, R.value || ""));
          break;
        case 5:
          R.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn(R)), x.items.push(a(u, R.value || ""));
          break;
        case 4:
          R.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn(R)), x.items.push(s(u, R.value || ""));
          break;
        case 6:
          R.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn(R)), x.items.push(d(u, R.value || ""));
          break;
        case 7: {
          const E = p(u);
          x.items.push(E.node), S = E.nextConsumeToken || null;
          break;
        }
      }
    } while (w.currentType !== 13 && w.currentType !== 1);
    const y = w.currentType === 1 ? w.lastOffset : u.currentOffset(), T = w.currentType === 1 ? w.lastEndLoc : u.currentPosition();
    return i(x, y, T), x;
  }
  function f(u, w, C, b) {
    const x = u.context();
    let S = b.items.length === 0;
    const y = r(1, w, C);
    y.cases = [], y.cases.push(b);
    do {
      const T = v(u);
      S || (S = T.items.length === 0), y.cases.push(T);
    } while (x.currentType !== 13);
    return S && o(u, Xe.MUST_HAVE_MESSAGES_IN_PLURAL, C, 0), i(y, u.currentOffset(), u.currentPosition()), y;
  }
  function m(u) {
    const w = u.context(), { offset: C, startLoc: b } = w, x = v(u);
    return w.currentType === 13 ? x : f(u, C, b, x);
  }
  function g(u) {
    const w = ym(u, kt({}, e)), C = w.context(), b = r(0, C.offset, C.startLoc);
    return t && b.loc && (b.loc.source = u), b.body = m(w), e.onCacheKey && (b.cacheKey = e.onCacheKey(u)), C.currentType !== 13 && o(w, Xe.UNEXPECTED_LEXICAL_ANALYSIS, C.lastStartLoc, 0, u[C.offset] || ""), i(b, w.currentOffset(), w.currentPosition()), b;
  }
  return { parse: g };
}
function bn(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Rm(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (i) => (n.helpers.add(i), i) };
}
function Od(e, t) {
  for (let n = 0; n < e.length; n++)
    As(e[n], t);
}
function As(e, t) {
  switch (e.type) {
    case 1:
      Od(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Od(e.items, t);
      break;
    case 6: {
      As(e.key, t), t.helper(
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
function km(e, t = {}) {
  const n = Rm(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && As(e.body, n);
  const o = n.context();
  e.helpers = Array.from(o.helpers);
}
function Pm(e) {
  const t = e.body;
  return t.type === 2 ? zd(t) : t.cases.forEach((n) => zd(n)), e;
}
function zd(e) {
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
      e.static = Is(t);
      for (let n = 0; n < e.items.length; n++) {
        const o = e.items[n];
        (o.type === 3 || o.type === 9) && delete o.value;
      }
    }
  }
}
function Yo(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      Yo(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let o = 0; o < n.length; o++)
        Yo(n[o]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let o = 0; o < n.length; o++)
        Yo(n[o]);
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
      Yo(t.key), t.k = t.key, delete t.key, t.modifier && (Yo(t.modifier), t.m = t.modifier, delete t.modifier);
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
function _m(e, t) {
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
  function s(m, g) {
    l.code += m;
  }
  function d(m, g = !0) {
    const u = g ? o : "";
    s(r ? u + "  ".repeat(m) : u);
  }
  function c(m = !0) {
    const g = ++l.indentLevel;
    m && d(g);
  }
  function h(m = !0) {
    const g = --l.indentLevel;
    m && d(g);
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
    helper: (m) => `_${m}`,
    needIndent: () => l.needIndent
  };
}
function Tm(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), er(e, t.key), t.modifier ? (e.push(", "), er(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Fm(e, t) {
  const { helper: n, needIndent: o } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(o());
  const r = t.items.length;
  for (let i = 0; i < r && (er(e, t.items[i]), i !== r - 1); i++)
    e.push(", ");
  e.deindent(o()), e.push("])");
}
function Em(e, t) {
  const { helper: n, needIndent: o } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(o());
    const r = t.cases.length;
    for (let i = 0; i < r && (er(e, t.cases[i]), i !== r - 1); i++)
      e.push(", ");
    e.deindent(o()), e.push("])");
  }
}
function Om(e, t) {
  t.body ? er(e, t.body) : e.push("null");
}
function er(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Om(e, t);
      break;
    case 1:
      Em(e, t);
      break;
    case 2:
      Fm(e, t);
      break;
    case 6:
      Tm(e, t);
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
const zm = (e, t = {}) => {
  const n = ye(t.mode) ? t.mode : "normal", o = ye(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const r = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, i = t.needIndent ? t.needIndent : n !== "arrow", l = e.helpers || [], a = _m(e, {
    filename: o,
    breakLineCode: r,
    needIndent: i
  });
  a.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), a.indent(i), l.length > 0 && (a.push(`const { ${Is(l.map((c) => `${c}: _${c}`), ", ")} } = ctx`), a.newline()), a.push("return "), er(a, e), a.deindent(i), a.push("}"), delete e.helpers;
  const { code: s, map: d } = a.context();
  return {
    ast: e,
    code: s,
    map: d ? d.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Mm(e, t = {}) {
  const n = kt({}, t), o = !!n.jit, r = !!n.minify, i = n.optimize == null ? !0 : n.optimize, a = $m(n).parse(e);
  return o ? (i && Pm(a), r && Yo(a), { ast: a, code: "" }) : (km(a, n), zm(a, n));
}
/*!
  * core-base v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Im() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (xo().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (xo().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Rn(e) {
  return Ke(e) && Vs(e) === 0 && (pn(e, "b") || pn(e, "body"));
}
const Qf = ["b", "body"];
function Am(e) {
  return fo(e, Qf);
}
const eh = ["c", "cases"];
function Vm(e) {
  return fo(e, eh, []);
}
const th = ["s", "static"];
function Bm(e) {
  return fo(e, th);
}
const nh = ["i", "items"];
function Lm(e) {
  return fo(e, nh, []);
}
const oh = ["t", "type"];
function Vs(e) {
  return fo(e, oh);
}
const rh = ["v", "value"];
function fi(e, t) {
  const n = fo(e, rh);
  if (n != null)
    return n;
  throw Wr(t);
}
const ih = ["m", "modifier"];
function Dm(e) {
  return fo(e, ih);
}
const ah = ["k", "key"];
function Nm(e) {
  const t = fo(e, ah);
  if (t)
    return t;
  throw Wr(
    6
    /* NodeTypes.Linked */
  );
}
function fo(e, t, n) {
  for (let o = 0; o < t.length; o++) {
    const r = t[o];
    if (pn(e, r) && e[r] != null)
      return e[r];
  }
  return n;
}
const lh = [
  ...Qf,
  ...eh,
  ...th,
  ...nh,
  ...ah,
  ...ih,
  ...rh,
  ...oh
];
function Wr(e) {
  return new Error(`unhandled node type: ${e}`);
}
function Ka(e) {
  return (n) => Hm(n, e);
}
function Hm(e, t) {
  const n = Am(t);
  if (n == null)
    throw Wr(
      0
      /* NodeTypes.Resource */
    );
  if (Vs(n) === 1) {
    const i = Vm(n);
    return e.plural(i.reduce((l, a) => [
      ...l,
      Md(e, a)
    ], []));
  } else
    return Md(e, n);
}
function Md(e, t) {
  const n = Bm(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const o = Lm(t).reduce((r, i) => [...r, Ql(e, i)], []);
    return e.normalize(o);
  }
}
function Ql(e, t) {
  const n = Vs(t);
  switch (n) {
    case 3:
      return fi(t, n);
    case 9:
      return fi(t, n);
    case 4: {
      const o = t;
      if (pn(o, "k") && o.k)
        return e.interpolate(e.named(o.k));
      if (pn(o, "key") && o.key)
        return e.interpolate(e.named(o.key));
      throw Wr(n);
    }
    case 5: {
      const o = t;
      if (pn(o, "i") && Rt(o.i))
        return e.interpolate(e.list(o.i));
      if (pn(o, "index") && Rt(o.index))
        return e.interpolate(e.list(o.index));
      throw Wr(n);
    }
    case 6: {
      const o = t, r = Dm(o), i = Nm(o);
      return e.linked(Ql(e, i), r ? Ql(e, r) : void 0, e.type);
    }
    case 7:
      return fi(t, n);
    case 8:
      return fi(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const jm = (e) => e;
let hi = nt();
function Wm(e, t = {}) {
  let n = !1;
  const o = t.onError || hm;
  return t.onError = (r) => {
    n = !0, o(r);
  }, { ...Mm(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function Um(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && ye(e)) {
    gt(t.warnHtmlMessage) && t.warnHtmlMessage;
    const o = (t.onCacheKey || jm)(e), r = hi[o];
    if (r)
      return r;
    const { ast: i, detectError: l } = Wm(e, {
      ...t,
      location: !1,
      jit: !0
    }), a = Ka(i);
    return l ? a : hi[o] = a;
  } else {
    const n = e.cacheKey;
    if (n) {
      const o = hi[n];
      return o || (hi[n] = Ka(e));
    } else
      return Ka(e);
  }
}
let Ur = null;
function Km(e) {
  Ur = e;
}
function qm(e, t, n) {
  Ur && Ur.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const Gm = /* @__PURE__ */ Xm("function:translate");
function Xm(e) {
  return (t) => Ur && Ur.emit(e, t);
}
const Dn = {
  INVALID_ARGUMENT: fm,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, Ym = 24;
function Nn(e) {
  return Sa(e, null, void 0);
}
function Bs(e, t) {
  return t.locale != null ? Id(t.locale) : Id(e.locale);
}
let qa;
function Id(e) {
  if (ye(e))
    return e;
  if (ht(e)) {
    if (e.resolvedOnce && qa != null)
      return qa;
    if (e.constructor.name === "Function") {
      const t = e();
      if (dm(t))
        throw Nn(Dn.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return qa = t;
    } else
      throw Nn(Dn.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw Nn(Dn.NOT_SUPPORT_LOCALE_TYPE);
}
function Zm(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...bt(t) ? t : Ke(t) ? Object.keys(t) : ye(t) ? [t] : [n]
  ])];
}
function sh(e, t, n) {
  const o = ye(n) ? n : ca, r = e;
  r.__localeChainCache || (r.__localeChainCache = /* @__PURE__ */ new Map());
  let i = r.__localeChainCache.get(o);
  if (!i) {
    i = [];
    let l = [n];
    for (; bt(l); )
      l = Ad(i, l, t);
    const a = bt(t) || !Ue(t) ? t : t.default ? t.default : null;
    l = ye(a) ? [a] : a, bt(l) && Ad(i, l, !1), r.__localeChainCache.set(o, i);
  }
  return i;
}
function Ad(e, t, n) {
  let o = !0;
  for (let r = 0; r < t.length && gt(o); r++) {
    const i = t[r];
    ye(i) && (o = Jm(e, t[r], n));
  }
  return o;
}
function Jm(e, t, n) {
  let o;
  const r = t.split("-");
  do {
    const i = r.join("-");
    o = Qm(e, i, n), r.splice(-1, 1);
  } while (r.length && o === !0);
  return o;
}
function Qm(e, t, n) {
  let o = !1;
  if (!e.includes(t) && (o = !0, t)) {
    o = t[t.length - 1] !== "!";
    const r = t.replace(/!/g, "");
    e.push(r), (bt(n) || Ue(n)) && n[r] && (o = n[r]);
  }
  return o;
}
const ho = [];
ho[
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
ho[
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
ho[
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
ho[
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
ho[
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
ho[
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
ho[
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
const eg = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function tg(e) {
  return eg.test(e);
}
function ng(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function og(e) {
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
function rg(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : tg(t) ? ng(t) : "*" + t;
}
function ig(e) {
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
      if (r = 0, l === void 0 || (l = rg(l), l === !1))
        return !1;
      p[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function v() {
    const f = e[n + 1];
    if (o === 5 && f === "'" || o === 6 && f === '"')
      return n++, a = "\\" + f, p[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; o !== null; )
    if (n++, i = e[n], !(i === "\\" && v())) {
      if (s = og(i), h = ho[o], d = h[s] || h.l || 8, d === 8 || (o = d[0], d[1] !== void 0 && (c = p[d[1]], c && (a = i, c() === !1))))
        return;
      if (o === 7)
        return t;
    }
}
const Vd = /* @__PURE__ */ new Map();
function ag(e, t) {
  return Ke(e) ? e[t] : null;
}
function lg(e, t) {
  if (!Ke(e))
    return null;
  let n = Vd.get(t);
  if (n || (n = ig(t), n && Vd.set(t, n)), !n)
    return null;
  const o = n.length;
  let r = e, i = 0;
  for (; i < o; ) {
    const l = n[i];
    if (lh.includes(l) && Rn(r))
      return null;
    const a = r[l];
    if (a === void 0 || ht(r))
      return null;
    r = a, i++;
  }
  return r;
}
const sg = "11.1.12", $a = -1, ca = "en-US", Bd = "", Ld = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function dg() {
  return {
    upper: (e, t) => t === "text" && ye(e) ? e.toUpperCase() : t === "vnode" && Ke(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && ye(e) ? e.toLowerCase() : t === "vnode" && Ke(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && ye(e) ? Ld(e) : t === "vnode" && Ke(e) && "__v_isVNode" in e ? Ld(e.children) : e
  };
}
let dh;
function cg(e) {
  dh = e;
}
let ch;
function ug(e) {
  ch = e;
}
let uh;
function fg(e) {
  uh = e;
}
let fh = null;
const hg = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  fh = e;
}, pg = /* @__NO_SIDE_EFFECTS__ */ () => fh;
let hh = null;
const Dd = (e) => {
  hh = e;
}, vg = () => hh;
let Nd = 0;
function mg(e = {}) {
  const t = ht(e.onWarn) ? e.onWarn : nm, n = ye(e.version) ? e.version : sg, o = ye(e.locale) || ht(e.locale) ? e.locale : ca, r = ht(o) ? ca : o, i = bt(e.fallbackLocale) || Ue(e.fallbackLocale) || ye(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : r, l = Ue(e.messages) ? e.messages : Ga(r), a = Ue(e.datetimeFormats) ? e.datetimeFormats : Ga(r), s = Ue(e.numberFormats) ? e.numberFormats : Ga(r), d = kt(nt(), e.modifiers, dg()), c = e.pluralRules || nt(), h = ht(e.missing) ? e.missing : null, p = gt(e.missingWarn) || da(e.missingWarn) ? e.missingWarn : !0, v = gt(e.fallbackWarn) || da(e.fallbackWarn) ? e.fallbackWarn : !0, f = !!e.fallbackFormat, m = !!e.unresolving, g = ht(e.postTranslation) ? e.postTranslation : null, u = Ue(e.processor) ? e.processor : null, w = gt(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, C = !!e.escapeParameter, b = ht(e.messageCompiler) ? e.messageCompiler : dh, x = ht(e.messageResolver) ? e.messageResolver : ch || ag, S = ht(e.localeFallbacker) ? e.localeFallbacker : uh || Zm, y = Ke(e.fallbackContext) ? e.fallbackContext : void 0, T = e, R = Ke(T.__datetimeFormatters) ? T.__datetimeFormatters : /* @__PURE__ */ new Map(), E = Ke(T.__numberFormatters) ? T.__numberFormatters : /* @__PURE__ */ new Map(), W = Ke(T.__meta) ? T.__meta : {};
  Nd++;
  const _ = {
    version: n,
    cid: Nd,
    locale: o,
    fallbackLocale: i,
    messages: l,
    modifiers: d,
    pluralRules: c,
    missing: h,
    missingWarn: p,
    fallbackWarn: v,
    fallbackFormat: f,
    unresolving: m,
    postTranslation: g,
    processor: u,
    warnHtmlMessage: w,
    escapeParameter: C,
    messageCompiler: b,
    messageResolver: x,
    localeFallbacker: S,
    fallbackContext: y,
    onWarn: t,
    __meta: W
  };
  return _.datetimeFormats = a, _.numberFormats = s, _.__datetimeFormatters = R, _.__numberFormatters = E, __INTLIFY_PROD_DEVTOOLS__ && qm(_, n, W), _;
}
const Ga = (e) => ({ [e]: nt() });
function Ls(e, t, n, o, r) {
  const { missing: i, onWarn: l } = e;
  if (i !== null) {
    const a = i(e, n, t, r);
    return ye(a) ? a : t;
  } else
    return t;
}
function gr(e, t, n) {
  const o = e;
  o.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function gg(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function bg(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let o = n + 1; o < t.length; o++)
    if (gg(e, t[o]))
      return !0;
  return !1;
}
function Hd(e, ...t) {
  const { datetimeFormats: n, unresolving: o, fallbackLocale: r, onWarn: i, localeFallbacker: l } = e, { __datetimeFormatters: a } = e, [s, d, c, h] = es(...t), p = gt(c.missingWarn) ? c.missingWarn : e.missingWarn;
  gt(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const v = !!c.part, f = Bs(e, c), m = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    f
  );
  if (!ye(s) || s === "")
    return new Intl.DateTimeFormat(f, h).format(d);
  let g = {}, u, w = null;
  const C = "datetime format";
  for (let S = 0; S < m.length && (u = m[S], g = n[u] || {}, w = g[s], !Ue(w)); S++)
    Ls(e, s, u, p, C);
  if (!Ue(w) || !ye(u))
    return o ? $a : s;
  let b = `${u}__${s}`;
  Ca(h) || (b = `${b}__${JSON.stringify(h)}`);
  let x = a.get(b);
  return x || (x = new Intl.DateTimeFormat(u, kt({}, w, h)), a.set(b, x)), v ? x.formatToParts(d) : x.format(d);
}
const ph = [
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
function es(...e) {
  const [t, n, o, r] = e, i = nt();
  let l = nt(), a;
  if (ye(t)) {
    const s = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!s)
      throw Nn(Dn.INVALID_ISO_DATE_ARGUMENT);
    const d = s[3] ? s[3].trim().startsWith("T") ? `${s[1].trim()}${s[3].trim()}` : `${s[1].trim()}T${s[3].trim()}` : s[1].trim();
    a = new Date(d);
    try {
      a.toISOString();
    } catch {
      throw Nn(Dn.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (im(t)) {
    if (isNaN(t.getTime()))
      throw Nn(Dn.INVALID_DATE_ARGUMENT);
    a = t;
  } else if (Rt(t))
    a = t;
  else
    throw Nn(Dn.INVALID_ARGUMENT);
  return ye(n) ? i.key = n : Ue(n) && Object.keys(n).forEach((s) => {
    ph.includes(s) ? l[s] = n[s] : i[s] = n[s];
  }), ye(o) ? i.locale = o : Ue(o) && (l = o), Ue(r) && (l = r), [i.key || "", a, i, l];
}
function jd(e, t, n) {
  const o = e;
  for (const r in n) {
    const i = `${t}__${r}`;
    o.__datetimeFormatters.has(i) && o.__datetimeFormatters.delete(i);
  }
}
function Wd(e, ...t) {
  const { numberFormats: n, unresolving: o, fallbackLocale: r, onWarn: i, localeFallbacker: l } = e, { __numberFormatters: a } = e, [s, d, c, h] = ts(...t), p = gt(c.missingWarn) ? c.missingWarn : e.missingWarn;
  gt(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const v = !!c.part, f = Bs(e, c), m = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    f
  );
  if (!ye(s) || s === "")
    return new Intl.NumberFormat(f, h).format(d);
  let g = {}, u, w = null;
  const C = "number format";
  for (let S = 0; S < m.length && (u = m[S], g = n[u] || {}, w = g[s], !Ue(w)); S++)
    Ls(e, s, u, p, C);
  if (!Ue(w) || !ye(u))
    return o ? $a : s;
  let b = `${u}__${s}`;
  Ca(h) || (b = `${b}__${JSON.stringify(h)}`);
  let x = a.get(b);
  return x || (x = new Intl.NumberFormat(u, kt({}, w, h)), a.set(b, x)), v ? x.formatToParts(d) : x.format(d);
}
const vh = [
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
function ts(...e) {
  const [t, n, o, r] = e, i = nt();
  let l = nt();
  if (!Rt(t))
    throw Nn(Dn.INVALID_ARGUMENT);
  const a = t;
  return ye(n) ? i.key = n : Ue(n) && Object.keys(n).forEach((s) => {
    vh.includes(s) ? l[s] = n[s] : i[s] = n[s];
  }), ye(o) ? i.locale = o : Ue(o) && (l = o), Ue(r) && (l = r), [i.key || "", a, i, l];
}
function Ud(e, t, n) {
  const o = e;
  for (const r in n) {
    const i = `${t}__${r}`;
    o.__numberFormatters.has(i) && o.__numberFormatters.delete(i);
  }
}
const wg = (e) => e, yg = (e) => "", xg = "text", Cg = (e) => e.length === 0 ? "" : Is(e), Sg = cm;
function Kd(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function $g(e) {
  const t = Rt(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (Rt(e.named.count) || Rt(e.named.n)) ? Rt(e.named.count) ? e.named.count : Rt(e.named.n) ? e.named.n : t : t;
}
function Rg(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function kg(e = {}) {
  const t = e.locale, n = $g(e), o = Ke(e.pluralRules) && ye(t) && ht(e.pluralRules[t]) ? e.pluralRules[t] : Kd, r = Ke(e.pluralRules) && ye(t) && ht(e.pluralRules[t]) ? Kd : void 0, i = (u) => u[o(n, u.length, r)], l = e.list || [], a = (u) => l[u], s = e.named || nt();
  Rt(e.pluralIndex) && Rg(n, s);
  const d = (u) => s[u];
  function c(u, w) {
    const C = ht(e.messages) ? e.messages(u, !!w) : Ke(e.messages) ? e.messages[u] : !1;
    return C || (e.parent ? e.parent.message(u) : yg);
  }
  const h = (u) => e.modifiers ? e.modifiers[u] : wg, p = Ue(e.processor) && ht(e.processor.normalize) ? e.processor.normalize : Cg, v = Ue(e.processor) && ht(e.processor.interpolate) ? e.processor.interpolate : Sg, f = Ue(e.processor) && ye(e.processor.type) ? e.processor.type : xg, g = {
    list: a,
    named: d,
    plural: i,
    linked: (u, ...w) => {
      const [C, b] = w;
      let x = "text", S = "";
      w.length === 1 ? Ke(C) ? (S = C.modifier || S, x = C.type || x) : ye(C) && (S = C || S) : w.length === 2 && (ye(C) && (S = C || S), ye(b) && (x = b || x));
      const y = c(u, !0)(g), T = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        x === "vnode" && bt(y) && S ? y[0] : y
      );
      return S ? h(S)(T, x) : T;
    },
    message: c,
    type: f,
    interpolate: v,
    normalize: p,
    values: kt(nt(), l, s)
  };
  return g;
}
const qd = () => "", on = (e) => ht(e);
function Gd(e, ...t) {
  const { fallbackFormat: n, postTranslation: o, unresolving: r, messageCompiler: i, fallbackLocale: l, messages: a } = e, [s, d] = ns(...t), c = gt(d.missingWarn) ? d.missingWarn : e.missingWarn, h = gt(d.fallbackWarn) ? d.fallbackWarn : e.fallbackWarn, p = gt(d.escapeParameter) ? d.escapeParameter : e.escapeParameter, v = !!d.resolvedMessage, f = ye(d.default) || gt(d.default) ? gt(d.default) ? i ? s : () => s : d.default : n ? i ? s : () => s : null, m = n || f != null && (ye(f) || ht(f)), g = Bs(e, d);
  p && Pg(d);
  let [u, w, C] = v ? [
    s,
    g,
    a[g] || nt()
  ] : mh(e, s, g, l, h, c), b = u, x = s;
  if (!v && !(ye(b) || Rn(b) || on(b)) && m && (b = f, x = b), !v && (!(ye(b) || Rn(b) || on(b)) || !ye(w)))
    return r ? $a : s;
  let S = !1;
  const y = () => {
    S = !0;
  }, T = on(b) ? b : gh(e, s, w, b, x, y);
  if (S)
    return b;
  const R = Fg(e, w, C, d), E = kg(R), W = _g(e, T, E);
  let _ = o ? o(W, s) : W;
  if (p && ye(_) && (_ = lm(_)), __INTLIFY_PROD_DEVTOOLS__) {
    const z = {
      timestamp: Date.now(),
      key: ye(s) ? s : on(b) ? b.key : "",
      locale: w || (on(b) ? b.locale : ""),
      format: ye(b) ? b : on(b) ? b.source : "",
      message: _
    };
    z.meta = kt({}, e.__meta, /* @__PURE__ */ pg() || {}), Gm(z);
  }
  return _;
}
function Pg(e) {
  bt(e.list) ? e.list = e.list.map((t) => ye(t) ? Td(t) : t) : Ke(e.named) && Object.keys(e.named).forEach((t) => {
    ye(e.named[t]) && (e.named[t] = Td(e.named[t]));
  });
}
function mh(e, t, n, o, r, i) {
  const { messages: l, onWarn: a, messageResolver: s, localeFallbacker: d } = e, c = d(e, o, n);
  let h = nt(), p, v = null;
  const f = "translate";
  for (let m = 0; m < c.length && (p = c[m], h = l[p] || nt(), (v = s(h, t)) === null && (v = h[t]), !(ye(v) || Rn(v) || on(v))); m++)
    if (!bg(p, c)) {
      const g = Ls(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        p,
        i,
        f
      );
      g !== t && (v = g);
    }
  return [v, p, h];
}
function gh(e, t, n, o, r, i) {
  const { messageCompiler: l, warnHtmlMessage: a } = e;
  if (on(o)) {
    const d = o;
    return d.locale = d.locale || n, d.key = d.key || t, d;
  }
  if (l == null) {
    const d = () => o;
    return d.locale = n, d.key = t, d;
  }
  const s = l(o, Tg(e, n, r, o, a, i));
  return s.locale = n, s.key = t, s.source = o, s;
}
function _g(e, t, n) {
  return t(n);
}
function ns(...e) {
  const [t, n, o] = e, r = nt();
  if (!ye(t) && !Rt(t) && !on(t) && !Rn(t))
    throw Nn(Dn.INVALID_ARGUMENT);
  const i = Rt(t) ? String(t) : (on(t), t);
  return Rt(n) ? r.plural = n : ye(n) ? r.default = n : Ue(n) && !Ca(n) ? r.named = n : bt(n) && (r.list = n), Rt(o) ? r.plural = o : ye(o) ? r.default = o : Ue(o) && kt(r, o), [i, r];
}
function Tg(e, t, n, o, r, i) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: r,
    onError: (l) => {
      throw i && i(l), l;
    },
    onCacheKey: (l) => om(t, n, l)
  };
}
function Fg(e, t, n, o) {
  const { modifiers: r, pluralRules: i, messageResolver: l, fallbackLocale: a, fallbackWarn: s, missingWarn: d, fallbackContext: c } = e, p = {
    locale: t,
    modifiers: r,
    pluralRules: i,
    messages: (v, f) => {
      let m = l(n, v);
      if (m == null && (c || f)) {
        const [, , g] = mh(
          c || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          v,
          t,
          a,
          s,
          d
        );
        m = l(g, v);
      }
      if (ye(m) || Rn(m)) {
        let g = !1;
        const w = gh(e, v, t, m, v, () => {
          g = !0;
        });
        return g ? qd : w;
      } else return on(m) ? m : qd;
    }
  };
  return e.processor && (p.processor = e.processor), o.list && (p.list = o.list), o.named && (p.named = o.named), Rt(o.plural) && (p.pluralIndex = o.plural), p;
}
Im();
/*!
  * vue-i18n v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Eg = window.Vue.createVNode, Og = window.Vue.Text, br = window.Vue.computed, Xd = window.Vue.watch, Ds = window.Vue.getCurrentInstance, zg = window.Vue.ref, Mg = window.Vue.shallowRef, bh = window.Vue.Fragment, Ns = window.Vue.defineComponent, wh = window.Vue.h;
window.Vue.effectScope;
const Ig = window.Vue.inject, Ag = window.Vue.onMounted, Vg = window.Vue.onUnmounted;
window.Vue.isRef;
const Bg = "11.1.12";
function Lg() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (xo().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (xo().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (xo().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (xo().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const tr = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: Ym,
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
function Kr(e, ...t) {
  return Sa(e, null, void 0);
}
const os = /* @__PURE__ */ Eo("__translateVNode"), rs = /* @__PURE__ */ Eo("__datetimeParts"), is = /* @__PURE__ */ Eo("__numberParts"), Dg = Eo("__setPluralRules"), yh = /* @__PURE__ */ Eo("__injectWithOption"), as = /* @__PURE__ */ Eo("__dispose");
function qr(e) {
  if (!Ke(e) || Rn(e))
    return e;
  for (const t in e)
    if (pn(e, t))
      if (!t.includes("."))
        Ke(e[t]) && qr(e[t]);
      else {
        const n = t.split("."), o = n.length - 1;
        let r = e, i = !1;
        for (let l = 0; l < o; l++) {
          if (n[l] === "__proto__")
            throw new Error(`unsafe key: ${n[l]}`);
          if (n[l] in r || (r[n[l]] = nt()), !Ke(r[n[l]])) {
            i = !0;
            break;
          }
          r = r[n[l]];
        }
        if (i || (Rn(r) ? lh.includes(n[o]) || delete e[t] : (r[n[o]] = e[t], delete e[t])), !Rn(r)) {
          const l = r[n[o]];
          Ke(l) && qr(l);
        }
      }
  return e;
}
function xh(e, t) {
  const { messages: n, __i18n: o, messageResolver: r, flatJson: i } = t, l = Ue(n) ? n : bt(o) ? nt() : { [e]: nt() };
  if (bt(o) && o.forEach((a) => {
    if ("locale" in a && "resource" in a) {
      const { locale: s, resource: d } = a;
      s ? (l[s] = l[s] || nt(), ra(d, l[s])) : ra(d, l);
    } else
      ye(a) && ra(JSON.parse(a), l);
  }), r == null && i)
    for (const a in l)
      pn(l, a) && qr(l[a]);
  return l;
}
function Ch(e) {
  return e.type;
}
function Ng(e, t, n) {
  let o = Ke(t.messages) ? t.messages : nt();
  "__i18nGlobal" in n && (o = xh(e.locale.value, {
    messages: o,
    __i18n: n.__i18nGlobal
  }));
  const r = Object.keys(o);
  r.length && r.forEach((i) => {
    e.mergeLocaleMessage(i, o[i]);
  });
  {
    if (Ke(t.datetimeFormats)) {
      const i = Object.keys(t.datetimeFormats);
      i.length && i.forEach((l) => {
        e.mergeDateTimeFormat(l, t.datetimeFormats[l]);
      });
    }
    if (Ke(t.numberFormats)) {
      const i = Object.keys(t.numberFormats);
      i.length && i.forEach((l) => {
        e.mergeNumberFormat(l, t.numberFormats[l]);
      });
    }
  }
}
function Yd(e) {
  return Eg(Og, null, e, 0);
}
const Zd = "__INTLIFY_META__", Jd = () => [], Hg = () => !1;
let Qd = 0;
function ec(e) {
  return (t, n, o, r) => e(n, o, Ds() || void 0, r);
}
const jg = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = Ds();
  let t = null;
  return e && (t = Ch(e)[Zd]) ? { [Zd]: t } : null;
};
function Wg(e = {}) {
  const { __root: t, __injectWithOption: n } = e, o = t === void 0, r = e.flatJson, i = Pd ? zg : Mg;
  let l = gt(e.inheritLocale) ? e.inheritLocale : !0;
  const a = i(
    // prettier-ignore
    t && l ? t.locale.value : ye(e.locale) ? e.locale : ca
  ), s = i(
    // prettier-ignore
    t && l ? t.fallbackLocale.value : ye(e.fallbackLocale) || bt(e.fallbackLocale) || Ue(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : a.value
  ), d = i(xh(a.value, e)), c = i(Ue(e.datetimeFormats) ? e.datetimeFormats : { [a.value]: {} }), h = i(Ue(e.numberFormats) ? e.numberFormats : { [a.value]: {} });
  let p = t ? t.missingWarn : gt(e.missingWarn) || da(e.missingWarn) ? e.missingWarn : !0, v = t ? t.fallbackWarn : gt(e.fallbackWarn) || da(e.fallbackWarn) ? e.fallbackWarn : !0, f = t ? t.fallbackRoot : gt(e.fallbackRoot) ? e.fallbackRoot : !0, m = !!e.fallbackFormat, g = ht(e.missing) ? e.missing : null, u = ht(e.missing) ? ec(e.missing) : null, w = ht(e.postTranslation) ? e.postTranslation : null, C = t ? t.warnHtmlMessage : gt(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, b = !!e.escapeParameter;
  const x = t ? t.modifiers : Ue(e.modifiers) ? e.modifiers : {};
  let S = e.pluralRules || t && t.pluralRules, y;
  y = (() => {
    o && Dd(null);
    const F = {
      version: Bg,
      locale: a.value,
      fallbackLocale: s.value,
      messages: d.value,
      modifiers: x,
      pluralRules: S,
      missing: u === null ? void 0 : u,
      missingWarn: p,
      fallbackWarn: v,
      fallbackFormat: m,
      unresolving: !0,
      postTranslation: w === null ? void 0 : w,
      warnHtmlMessage: C,
      escapeParameter: b,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    F.datetimeFormats = c.value, F.numberFormats = h.value, F.__datetimeFormatters = Ue(y) ? y.__datetimeFormatters : void 0, F.__numberFormatters = Ue(y) ? y.__numberFormatters : void 0;
    const j = mg(F);
    return o && Dd(j), j;
  })(), gr(y, a.value, s.value);
  function R() {
    return [
      a.value,
      s.value,
      d.value,
      c.value,
      h.value
    ];
  }
  const E = br({
    get: () => a.value,
    set: (F) => {
      y.locale = F, a.value = F;
    }
  }), W = br({
    get: () => s.value,
    set: (F) => {
      y.fallbackLocale = F, s.value = F, gr(y, a.value, F);
    }
  }), _ = br(() => d.value), z = /* @__PURE__ */ br(() => c.value), M = /* @__PURE__ */ br(() => h.value);
  function O() {
    return ht(w) ? w : null;
  }
  function U(F) {
    w = F, y.postTranslation = F;
  }
  function L() {
    return g;
  }
  function Y(F) {
    F !== null && (u = ec(F)), g = F, y.missing = u;
  }
  const Q = (F, j, pe, Te, lt, pt) => {
    R();
    let Ye;
    try {
      __INTLIFY_PROD_DEVTOOLS__, o || (y.fallbackContext = t ? vg() : void 0), Ye = F(y);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, o || (y.fallbackContext = void 0);
    }
    if (pe !== "translate exists" && // for not `te` (e.g `t`)
    Rt(Ye) && Ye === $a || pe === "translate exists" && !Ye) {
      const [Ze, mt] = j();
      return t && f ? Te(t) : lt(Ze);
    } else {
      if (pt(Ye))
        return Ye;
      throw Kr(tr.UNEXPECTED_RETURN_TYPE);
    }
  };
  function J(...F) {
    return Q((j) => Reflect.apply(Gd, null, [j, ...F]), () => ns(...F), "translate", (j) => Reflect.apply(j.t, j, [...F]), (j) => j, (j) => ye(j));
  }
  function q(...F) {
    const [j, pe, Te] = F;
    if (Te && !Ke(Te))
      throw Kr(tr.INVALID_ARGUMENT);
    return J(j, pe, kt({ resolvedMessage: !0 }, Te || {}));
  }
  function I(...F) {
    return Q((j) => Reflect.apply(Hd, null, [j, ...F]), () => es(...F), "datetime format", (j) => Reflect.apply(j.d, j, [...F]), () => Bd, (j) => ye(j) || bt(j));
  }
  function G(...F) {
    return Q((j) => Reflect.apply(Wd, null, [j, ...F]), () => ts(...F), "number format", (j) => Reflect.apply(j.n, j, [...F]), () => Bd, (j) => ye(j) || bt(j));
  }
  function Z(F) {
    return F.map((j) => ye(j) || Rt(j) || gt(j) ? Yd(String(j)) : j);
  }
  const le = {
    normalize: Z,
    interpolate: (F) => F,
    type: "vnode"
  };
  function de(...F) {
    return Q((j) => {
      let pe;
      const Te = j;
      try {
        Te.processor = le, pe = Reflect.apply(Gd, null, [Te, ...F]);
      } finally {
        Te.processor = null;
      }
      return pe;
    }, () => ns(...F), "translate", (j) => j[os](...F), (j) => [Yd(j)], (j) => bt(j));
  }
  function me(...F) {
    return Q((j) => Reflect.apply(Wd, null, [j, ...F]), () => ts(...F), "number format", (j) => j[is](...F), Jd, (j) => ye(j) || bt(j));
  }
  function X(...F) {
    return Q((j) => Reflect.apply(Hd, null, [j, ...F]), () => es(...F), "datetime format", (j) => j[rs](...F), Jd, (j) => ye(j) || bt(j));
  }
  function ce(F) {
    S = F, y.pluralRules = S;
  }
  function ke(F, j) {
    return Q(() => {
      if (!F)
        return !1;
      const pe = ye(j) ? j : a.value, Te = Se(pe), lt = y.messageResolver(Te, F);
      return Rn(lt) || on(lt) || ye(lt);
    }, () => [F], "translate exists", (pe) => Reflect.apply(pe.te, pe, [F, j]), Hg, (pe) => gt(pe));
  }
  function ge(F) {
    let j = null;
    const pe = sh(y, s.value, a.value);
    for (let Te = 0; Te < pe.length; Te++) {
      const lt = d.value[pe[Te]] || {}, pt = y.messageResolver(lt, F);
      if (pt != null) {
        j = pt;
        break;
      }
    }
    return j;
  }
  function $e(F) {
    const j = ge(F);
    return j ?? (t ? t.tm(F) || {} : {});
  }
  function Se(F) {
    return d.value[F] || {};
  }
  function Be(F, j) {
    if (r) {
      const pe = { [F]: j };
      for (const Te in pe)
        pn(pe, Te) && qr(pe[Te]);
      j = pe[F];
    }
    d.value[F] = j, y.messages = d.value;
  }
  function Me(F, j) {
    d.value[F] = d.value[F] || {};
    const pe = { [F]: j };
    if (r)
      for (const Te in pe)
        pn(pe, Te) && qr(pe[Te]);
    j = pe[F], ra(j, d.value[F]), y.messages = d.value;
  }
  function oe(F) {
    return c.value[F] || {};
  }
  function k(F, j) {
    c.value[F] = j, y.datetimeFormats = c.value, jd(y, F, j);
  }
  function $(F, j) {
    c.value[F] = kt(c.value[F] || {}, j), y.datetimeFormats = c.value, jd(y, F, j);
  }
  function D(F) {
    return h.value[F] || {};
  }
  function ee(F, j) {
    h.value[F] = j, y.numberFormats = h.value, Ud(y, F, j);
  }
  function ve(F, j) {
    h.value[F] = kt(h.value[F] || {}, j), y.numberFormats = h.value, Ud(y, F, j);
  }
  Qd++, t && Pd && (Xd(t.locale, (F) => {
    l && (a.value = F, y.locale = F, gr(y, a.value, s.value));
  }), Xd(t.fallbackLocale, (F) => {
    l && (s.value = F, y.fallbackLocale = F, gr(y, a.value, s.value));
  }));
  const he = {
    id: Qd,
    locale: E,
    fallbackLocale: W,
    get inheritLocale() {
      return l;
    },
    set inheritLocale(F) {
      l = F, F && t && (a.value = t.locale.value, s.value = t.fallbackLocale.value, gr(y, a.value, s.value));
    },
    get availableLocales() {
      return Object.keys(d.value).sort();
    },
    messages: _,
    get modifiers() {
      return x;
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
      return v;
    },
    set fallbackWarn(F) {
      v = F, y.fallbackWarn = v;
    },
    get fallbackRoot() {
      return f;
    },
    set fallbackRoot(F) {
      f = F;
    },
    get fallbackFormat() {
      return m;
    },
    set fallbackFormat(F) {
      m = F, y.fallbackFormat = m;
    },
    get warnHtmlMessage() {
      return C;
    },
    set warnHtmlMessage(F) {
      C = F, y.warnHtmlMessage = F;
    },
    get escapeParameter() {
      return b;
    },
    set escapeParameter(F) {
      b = F, y.escapeParameter = F;
    },
    t: J,
    getLocaleMessage: Se,
    setLocaleMessage: Be,
    mergeLocaleMessage: Me,
    getPostTranslationHandler: O,
    setPostTranslationHandler: U,
    getMissingHandler: L,
    setMissingHandler: Y,
    [Dg]: ce
  };
  return he.datetimeFormats = z, he.numberFormats = M, he.rt = q, he.te = ke, he.tm = $e, he.d = I, he.n = G, he.getDateTimeFormat = oe, he.setDateTimeFormat = k, he.mergeDateTimeFormat = $, he.getNumberFormat = D, he.setNumberFormat = ee, he.mergeNumberFormat = ve, he[yh] = n, he[os] = de, he[rs] = X, he[is] = me, he;
}
const Hs = {
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
function Ug({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((o, r) => [
    ...o,
    // prettier-ignore
    ...r.type === bh ? r.children : [r]
  ], []) : t.reduce((n, o) => {
    const r = e[o];
    return r && (n[o] = r()), n;
  }, nt());
}
function Sh() {
  return bh;
}
kt({
  keypath: {
    type: String,
    required: !0
  },
  plural: {
    type: [Number, String],
    validator: (e) => Rt(e) || !isNaN(e)
  }
}, Hs);
function Kg(e) {
  return bt(e) && !ye(e[0]);
}
function $h(e, t, n, o) {
  const { slots: r, attrs: i } = t;
  return () => {
    const l = { part: !0 };
    let a = nt();
    e.locale && (l.locale = e.locale), ye(e.format) ? l.key = e.format : Ke(e.format) && (ye(e.format.key) && (l.key = e.format.key), a = Object.keys(e.format).reduce((p, v) => n.includes(v) ? kt(nt(), p, { [v]: e.format[v] }) : p, nt()));
    const s = o(e.value, l, a);
    let d = [l.key];
    bt(s) ? d = s.map((p, v) => {
      const f = r[p.type], m = f ? f({ [p.type]: p.value, index: v, parts: s }) : [p.value];
      return Kg(m) && (m[0].key = `${p.type}-${v}`), m;
    }) : ye(s) && (d = [s]);
    const c = kt(nt(), i), h = ye(e.tag) || Ke(e.tag) ? e.tag : Sh();
    return wh(h, c, d);
  };
}
kt({
  value: {
    type: Number,
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, Hs);
const qg = /* @__PURE__ */ Eo("global-vue-i18n");
function Ra(e = {}) {
  const t = Ds();
  if (t == null)
    throw Kr(tr.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw Kr(tr.NOT_INSTALLED);
  const n = Gg(t), o = Yg(n), r = Ch(t), i = Xg(e, r);
  if (i === "global")
    return Ng(o, e, r), o;
  if (i === "parent") {
    let s = Zg(n, t, e.__useComponent);
    return s == null && (s = o), s;
  }
  const l = n;
  let a = l.__getInstance(t);
  if (a == null) {
    const s = kt({}, e);
    "__i18n" in r && (s.__i18n = r.__i18n), o && (s.__root = o), a = Wg(s), l.__composerExtend && (a[as] = l.__composerExtend(a)), Qg(l, t, a), l.__setInstance(t, a);
  }
  return a;
}
function Gg(e) {
  const t = Ig(e.isCE ? qg : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw Kr(e.isCE ? tr.NOT_INSTALLED_WITH_PROVIDE : tr.UNEXPECTED_ERROR);
  return t;
}
function Xg(e, t) {
  return Ca(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function Yg(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function Zg(e, t, n = !1) {
  let o = null;
  const r = t.root;
  let i = Jg(t, n);
  for (; i != null; ) {
    const l = e;
    if (e.mode === "composition")
      o = l.__getInstance(i);
    else if (__VUE_I18N_LEGACY_API__) {
      const a = l.__getInstance(i);
      a != null && (o = a.__composer, n && o && !o[yh] && (o = null));
    }
    if (o != null || r === i)
      break;
    i = i.parent;
  }
  return o;
}
function Jg(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function Qg(e, t, n) {
  Ag(() => {
  }, t), Vg(() => {
    const o = n;
    e.__deleteInstance(t);
    const r = o[as];
    r && (r(), delete o[as]);
  }, t);
}
kt({
  value: {
    type: [Number, Date],
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, Hs);
Lg();
cg(Um);
ug(lg);
fg(sh);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = xo();
  e.__INTLIFY__ = !0, Km(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
function eb(e) {
  let t = ".", n = "__", o = "--", r;
  if (e) {
    let f = e.blockPrefix;
    f && (t = f), f = e.elementPrefix, f && (n = f), f = e.modifierPrefix, f && (o = f);
  }
  const i = {
    install(f) {
      r = f.c;
      const m = f.context;
      m.bem = {}, m.bem.b = null, m.bem.els = null;
    }
  };
  function l(f) {
    let m, g;
    return {
      before(u) {
        m = u.bem.b, g = u.bem.els, u.bem.els = null;
      },
      after(u) {
        u.bem.b = m, u.bem.els = g;
      },
      $({ context: u, props: w }) {
        return f = typeof f == "string" ? f : f({ context: u, props: w }), u.bem.b = f, `${(w == null ? void 0 : w.bPrefix) || t}${u.bem.b}`;
      }
    };
  }
  function a(f) {
    let m;
    return {
      before(g) {
        m = g.bem.els;
      },
      after(g) {
        g.bem.els = m;
      },
      $({ context: g, props: u }) {
        return f = typeof f == "string" ? f : f({ context: g, props: u }), g.bem.els = f.split(",").map((w) => w.trim()), g.bem.els.map((w) => `${(u == null ? void 0 : u.bPrefix) || t}${g.bem.b}${n}${w}`).join(", ");
      }
    };
  }
  function s(f) {
    return {
      $({ context: m, props: g }) {
        f = typeof f == "string" ? f : f({ context: m, props: g });
        const u = f.split(",").map((b) => b.trim());
        function w(b) {
          return u.map((x) => `&${(g == null ? void 0 : g.bPrefix) || t}${m.bem.b}${b !== void 0 ? `${n}${b}` : ""}${o}${x}`).join(", ");
        }
        const C = m.bem.els;
        return C !== null ? w(C[0]) : w();
      }
    };
  }
  function d(f) {
    return {
      $({ context: m, props: g }) {
        f = typeof f == "string" ? f : f({ context: m, props: g });
        const u = m.bem.els;
        return `&:not(${(g == null ? void 0 : g.bPrefix) || t}${m.bem.b}${u !== null && u.length > 0 ? `${n}${u[0]}` : ""}${o}${f})`;
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
function tb(e) {
  let t = 0;
  for (let n = 0; n < e.length; ++n)
    e[n] === "&" && ++t;
  return t;
}
const Rh = /\s*,(?![^(]*\))\s*/g, nb = /\s+/g;
function ob(e, t) {
  const n = [];
  return t.split(Rh).forEach((o) => {
    let r = tb(o);
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
function rb(e, t) {
  const n = [];
  return t.split(Rh).forEach((o) => {
    e.forEach((r) => {
      n.push((r && r + " ") + o);
    });
  }), n;
}
function ib(e) {
  let t = [""];
  return e.forEach((n) => {
    n = n && n.trim(), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    n && (n.includes("&") ? t = ob(t, n) : t = rb(t, n));
  }), t.join(", ").replace(nb, " ");
}
function tc(e) {
  if (!e)
    return;
  const t = e.parentElement;
  t && t.removeChild(e);
}
function ka(e, t) {
  return (t ?? document.head).querySelector(`style[cssr-id="${e}"]`);
}
function ab(e) {
  const t = document.createElement("style");
  return t.setAttribute("cssr-id", e), t;
}
function pi(e) {
  return e ? /^\s*@(s|m)/.test(e) : !1;
}
const lb = /[A-Z]/g;
function kh(e) {
  return e.replace(lb, (t) => "-" + t.toLowerCase());
}
function sb(e, t = "  ") {
  return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((n) => t + `  ${kh(n[0])}: ${n[1]};`).join(`
`) + `
` + t + "}" : `: ${e};`;
}
function db(e, t, n) {
  return typeof e == "function" ? e({
    context: t.context,
    props: n
  }) : e;
}
function nc(e, t, n, o) {
  if (!t)
    return "";
  const r = db(t, n, o);
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
    a = kh(a), s != null && l.push(`  ${a}${sb(s)}`);
  }), e && l.push("}"), l.join(`
`);
}
function ls(e, t, n) {
  e && e.forEach((o) => {
    if (Array.isArray(o))
      ls(o, t, n);
    else if (typeof o == "function") {
      const r = o(t);
      Array.isArray(r) ? ls(r, t, n) : r && n(r);
    } else o && n(o);
  });
}
function Ph(e, t, n, o, r) {
  const i = e.$;
  let l = "";
  if (!i || typeof i == "string")
    pi(i) ? l = i : t.push(i);
  else if (typeof i == "function") {
    const d = i({
      context: o.context,
      props: r
    });
    pi(d) ? l = d : t.push(d);
  } else if (i.before && i.before(o.context), !i.$ || typeof i.$ == "string")
    pi(i.$) ? l = i.$ : t.push(i.$);
  else if (i.$) {
    const d = i.$({
      context: o.context,
      props: r
    });
    pi(d) ? l = d : t.push(d);
  }
  const a = ib(t), s = nc(a, e.props, o, r);
  l ? n.push(`${l} {`) : s.length && n.push(s), e.children && ls(e.children, {
    context: o.context,
    props: r
  }, (d) => {
    if (typeof d == "string") {
      const c = nc(a, { raw: d }, o, r);
      n.push(c);
    } else
      Ph(d, t, n, o, r);
  }), t.pop(), l && n.push("}"), i && i.after && i.after(o.context);
}
function cb(e, t, n) {
  const o = [];
  return Ph(e, [], o, t, n), o.join(`

`);
}
function ss(e) {
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
function ub(e, t, n, o) {
  const { els: r } = t;
  if (n === void 0)
    r.forEach(tc), t.els = [];
  else {
    const i = ka(n, o);
    i && r.includes(i) && (tc(i), t.els = r.filter((l) => l !== i));
  }
}
function oc(e, t) {
  e.push(t);
}
function fb(e, t, n, o, r, i, l, a, s) {
  let d;
  if (n === void 0 && (d = t.render(o), n = ss(d)), s) {
    s.adapter(n, d ?? t.render(o));
    return;
  }
  a === void 0 && (a = document.head);
  const c = ka(n, a);
  if (c !== null && !i)
    return c;
  const h = c ?? ab(n);
  if (d === void 0 && (d = t.render(o)), h.textContent = d, c !== null)
    return c;
  if (l) {
    const p = a.querySelector(`meta[name="${l}"]`);
    if (p)
      return a.insertBefore(h, p), oc(t.els, h), h;
  }
  return r ? a.insertBefore(h, a.querySelector("style, link")) : a.appendChild(h), oc(t.els, h), h;
}
function hb(e) {
  return cb(this, this.instance, e);
}
function pb(e = {}) {
  const { id: t, ssr: n, props: o, head: r = !1, force: i = !1, anchorMetaName: l, parent: a } = e;
  return fb(this.instance, this, t, o, r, i, l, a, n);
}
function vb(e = {}) {
  const { id: t, parent: n } = e;
  ub(this.instance, this, t, n);
}
const vi = function(e, t, n, o) {
  return {
    instance: e,
    $: t,
    props: n,
    children: o,
    els: [],
    render: hb,
    mount: pb,
    unmount: vb
  };
}, mb = function(e, t, n, o) {
  return Array.isArray(t) ? vi(e, { $: null }, null, t) : Array.isArray(n) ? vi(e, t, null, n) : Array.isArray(o) ? vi(e, t, n, o) : vi(e, t, n, null);
};
function _h(e = {}) {
  const t = {
    c: (...n) => mb(t, ...n),
    use: (n, ...o) => n.install(t, ...o),
    find: ka,
    context: {},
    config: e
  };
  return t;
}
function gb(e, t) {
  if (e === void 0)
    return !1;
  if (t) {
    const { context: { ids: n } } = t;
    return n.has(e);
  }
  return ka(e) !== null;
}
const bb = "n", Gr = `.${bb}-`, wb = "__", yb = "--", Th = _h(), Fh = eb({
  blockPrefix: Gr,
  elementPrefix: wb,
  modifierPrefix: yb
});
Th.use(Fh);
const {
  c: H,
  find: yz
} = Th, {
  cB: A,
  cE: B,
  cM: K,
  cNotM: Qe
} = Fh;
function js(e) {
  return H(({
    props: {
      bPrefix: t
    }
  }) => `${t || Gr}modal, ${t || Gr}drawer`, [e]);
}
function Ws(e) {
  return H(({
    props: {
      bPrefix: t
    }
  }) => `${t || Gr}popover`, [e]);
}
function xb(e) {
  return H(({
    props: {
      bPrefix: t
    }
  }) => `&${t || Gr}modal`, e);
}
const Cb = (...e) => H(">", [A(...e)]);
function re(e, t) {
  return e + (t === "default" ? "" : t.replace(/^[a-z]/, (n) => n.toUpperCase()));
}
let ua = [];
const Eh = /* @__PURE__ */ new WeakMap();
function Sb() {
  ua.forEach((e) => e(...Eh.get(e))), ua = [];
}
function Xr(e, ...t) {
  Eh.set(e, t), !ua.includes(e) && ua.push(e) === 1 && requestAnimationFrame(Sb);
}
function an(e, t) {
  let { target: n } = e;
  for (; n; ) {
    if (n.dataset && n.dataset[t] !== void 0)
      return !0;
    n = n.parentElement;
  }
  return !1;
}
function Yr(e) {
  return e.composedPath()[0] || null;
}
function $b(e) {
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
function Bo(e, t) {
  var n;
  if (e == null)
    return;
  const o = $b(e);
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
function xt(e) {
  return typeof e == "string" ? e.endsWith("px") ? Number(e.slice(0, e.length - 2)) : Number(e) : e;
}
function it(e) {
  if (e != null)
    return typeof e == "number" ? `${e}px` : e.endsWith("px") ? e : `${e}px`;
}
function Yt(e, t) {
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
function Rb(e, t) {
  const [n, o] = e.split(" ");
  return {
    row: n,
    col: o || n
  };
}
const rc = {
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
function kb(e, t, n) {
  t /= 100, n /= 100;
  let o = (r, i = (r + e / 60) % 6) => n - n * t * Math.max(Math.min(i, 4 - i, 1), 0);
  return [o(5) * 255, o(3) * 255, o(1) * 255];
}
function Pb(e, t, n) {
  t /= 100, n /= 100;
  let o = t * Math.min(n, 1 - n), r = (i, l = (i + e / 30) % 12) => n - o * Math.max(Math.min(l - 3, 9 - l, 1), -1);
  return [r(0) * 255, r(8) * 255, r(4) * 255];
}
const _n = "^\\s*", Tn = "\\s*$", ao = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))%\\s*", Zt = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", Co = "([0-9A-Fa-f])", So = "([0-9A-Fa-f]{2})", Oh = new RegExp(`${_n}hsl\\s*\\(${Zt},${ao},${ao}\\)${Tn}`), zh = new RegExp(`${_n}hsv\\s*\\(${Zt},${ao},${ao}\\)${Tn}`), Mh = new RegExp(`${_n}hsla\\s*\\(${Zt},${ao},${ao},${Zt}\\)${Tn}`), Ih = new RegExp(`${_n}hsva\\s*\\(${Zt},${ao},${ao},${Zt}\\)${Tn}`), _b = new RegExp(`${_n}rgb\\s*\\(${Zt},${Zt},${Zt}\\)${Tn}`), Tb = new RegExp(`${_n}rgba\\s*\\(${Zt},${Zt},${Zt},${Zt}\\)${Tn}`), Fb = new RegExp(`${_n}#${Co}${Co}${Co}${Tn}`), Eb = new RegExp(`${_n}#${So}${So}${So}${Tn}`), Ob = new RegExp(`${_n}#${Co}${Co}${Co}${Co}${Tn}`), zb = new RegExp(`${_n}#${So}${So}${So}${So}${Tn}`);
function Wt(e) {
  return parseInt(e, 16);
}
function Mb(e) {
  try {
    let t;
    if (t = Mh.exec(e))
      return [
        fa(t[1]),
        ro(t[5]),
        ro(t[9]),
        ko(t[13])
      ];
    if (t = Oh.exec(e))
      return [fa(t[1]), ro(t[5]), ro(t[9]), 1];
    throw new Error(`[seemly/hsla]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function Ib(e) {
  try {
    let t;
    if (t = Ih.exec(e))
      return [
        fa(t[1]),
        ro(t[5]),
        ro(t[9]),
        ko(t[13])
      ];
    if (t = zh.exec(e))
      return [fa(t[1]), ro(t[5]), ro(t[9]), 1];
    throw new Error(`[seemly/hsva]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function lo(e) {
  try {
    let t;
    if (t = Eb.exec(e))
      return [Wt(t[1]), Wt(t[2]), Wt(t[3]), 1];
    if (t = _b.exec(e))
      return [Ot(t[1]), Ot(t[5]), Ot(t[9]), 1];
    if (t = Tb.exec(e))
      return [
        Ot(t[1]),
        Ot(t[5]),
        Ot(t[9]),
        ko(t[13])
      ];
    if (t = Fb.exec(e))
      return [
        Wt(t[1] + t[1]),
        Wt(t[2] + t[2]),
        Wt(t[3] + t[3]),
        1
      ];
    if (t = zb.exec(e))
      return [
        Wt(t[1]),
        Wt(t[2]),
        Wt(t[3]),
        ko(Wt(t[4]) / 255)
      ];
    if (t = Ob.exec(e))
      return [
        Wt(t[1] + t[1]),
        Wt(t[2] + t[2]),
        Wt(t[3] + t[3]),
        ko(Wt(t[4] + t[4]) / 255)
      ];
    if (e in rc)
      return lo(rc[e]);
    if (Oh.test(e) || Mh.test(e)) {
      const [n, o, r, i] = Mb(e);
      return [...Pb(n, o, r), i];
    } else if (zh.test(e) || Ih.test(e)) {
      const [n, o, r, i] = Ib(e);
      return [...kb(n, o, r), i];
    }
    throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function Ab(e) {
  return e > 1 ? 1 : e < 0 ? 0 : e;
}
function ds(e, t, n, o) {
  return `rgba(${Ot(e)}, ${Ot(t)}, ${Ot(n)}, ${Ab(o)})`;
}
function Xa(e, t, n, o, r) {
  return Ot((e * t * (1 - o) + n * o) / r);
}
function je(e, t) {
  Array.isArray(e) || (e = lo(e)), Array.isArray(t) || (t = lo(t));
  const n = e[3], o = t[3], r = ko(n + o - n * o);
  return ds(Xa(e[0], n, t[0], o, r), Xa(e[1], n, t[1], o, r), Xa(e[2], n, t[2], o, r), r);
}
function Fe(e, t) {
  const [n, o, r, i = 1] = Array.isArray(e) ? e : lo(e);
  return typeof t.alpha == "number" ? ds(n, o, r, t.alpha) : ds(n, o, r, i);
}
function mi(e, t) {
  const [n, o, r, i = 1] = Array.isArray(e) ? e : lo(e), { lightness: l = 1, alpha: a = 1 } = t;
  return Vb([n * l, o * l, r * l, i * a]);
}
function ko(e) {
  const t = Math.round(Number(e) * 100) / 100;
  return t > 1 ? 1 : t < 0 ? 0 : t;
}
function fa(e) {
  const t = Math.round(Number(e));
  return t >= 360 || t < 0 ? 0 : t;
}
function Ot(e) {
  const t = Math.round(Number(e));
  return t > 255 ? 255 : t < 0 ? 0 : t;
}
function ro(e) {
  const t = Math.round(Number(e));
  return t > 100 ? 100 : t < 0 ? 0 : t;
}
function Vb(e) {
  const [t, n, o] = e;
  return 3 in e ? `rgba(${Ot(t)}, ${Ot(n)}, ${Ot(o)}, ${ko(e[3])})` : `rgba(${Ot(t)}, ${Ot(n)}, ${Ot(o)}, 1)`;
}
function Zr(e = 8) {
  return Math.random().toString(16).slice(2, 2 + e);
}
function Bb(e, t) {
  const n = [];
  for (let o = 0; o < e; ++o)
    n.push(t);
  return n;
}
function ia(e) {
  return e.composedPath()[0];
}
const Lb = {
  mousemoveoutside: /* @__PURE__ */ new WeakMap(),
  clickoutside: /* @__PURE__ */ new WeakMap()
};
function Db(e, t, n) {
  if (e === "mousemoveoutside") {
    const o = (r) => {
      t.contains(ia(r)) || n(r);
    };
    return {
      mousemove: o,
      touchstart: o
    };
  } else if (e === "clickoutside") {
    let o = !1;
    const r = (l) => {
      o = !t.contains(ia(l));
    }, i = (l) => {
      o && (t.contains(ia(l)) || n(l));
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
function Ah(e, t, n) {
  const o = Lb[e];
  let r = o.get(t);
  r === void 0 && o.set(t, r = /* @__PURE__ */ new WeakMap());
  let i = r.get(n);
  return i === void 0 && r.set(n, i = Db(e, t, n)), i;
}
function Nb(e, t, n, o) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const r = Ah(e, t, n);
    return Object.keys(r).forEach((i) => {
      at(i, document, r[i], o);
    }), !0;
  }
  return !1;
}
function Hb(e, t, n, o) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const r = Ah(e, t, n);
    return Object.keys(r).forEach((i) => {
      Je(i, document, r[i], o);
    }), !0;
  }
  return !1;
}
function jb() {
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
      const { type: R, eventPhase: E, bubbles: W } = T, _ = ia(T);
      if (E === 2)
        return;
      const z = E === 1 ? "capture" : "bubble";
      let M = _;
      const O = [];
      for (; M === null && (M = window), O.push(M), M !== window; )
        M = M.parentNode || null;
      const U = c.capture[R], L = c.bubble[R];
      if (r(T, "stopPropagation", n), r(T, "stopImmediatePropagation", o), d(T, s), z === "capture") {
        if (U === void 0)
          return;
        for (let Y = O.length - 1; Y >= 0 && !e.has(T); --Y) {
          const Q = O[Y], J = U.get(Q);
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
              for (const I of q) {
                if (t.has(T))
                  break;
                I(T);
              }
          }
        }
      } else if (z === "bubble") {
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
  function v() {
    const y = function(T) {
      const { type: R, eventPhase: E } = T;
      if (E !== 2)
        return;
      const W = h[R];
      W !== void 0 && W.forEach((_) => _(T));
    };
    return y.displayName = "evtdUnifiedWindowEventHandler", y;
  }
  const f = p(), m = v();
  function g(y, T) {
    const R = c[y];
    return R[T] === void 0 && (R[T] = /* @__PURE__ */ new Map(), window.addEventListener(T, f, y === "capture")), R[T];
  }
  function u(y) {
    return h[y] === void 0 && (h[y] = /* @__PURE__ */ new Set(), window.addEventListener(y, m)), h[y];
  }
  function w(y, T) {
    let R = y.get(T);
    return R === void 0 && y.set(T, R = /* @__PURE__ */ new Set()), R;
  }
  function C(y, T, R, E) {
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
  function x(y, T, R, E) {
    let W;
    if (typeof E == "object" && E.once === !0 ? W = (U) => {
      S(y, T, W, E), R(U);
    } : W = R, Nb(y, T, W, E))
      return;
    const z = E === !0 || typeof E == "object" && E.capture === !0 ? "capture" : "bubble", M = g(z, y), O = w(M, T);
    if (O.has(W) || O.add(W), T === window) {
      const U = u(y);
      U.has(W) || U.add(W);
    }
  }
  function S(y, T, R, E) {
    if (Hb(y, T, R, E))
      return;
    const _ = E === !0 || typeof E == "object" && E.capture === !0, z = _ ? "capture" : "bubble", M = g(z, y), O = w(M, T);
    if (T === window && !C(T, _ ? "bubble" : "capture", y, R) && b(y, R)) {
      const L = h[y];
      L.delete(R), L.size === 0 && (window.removeEventListener(y, m), h[y] = void 0);
    }
    O.has(R) && O.delete(R), O.size === 0 && M.delete(T), M.size === 0 && (window.removeEventListener(y, f, z === "capture"), c[z][y] = void 0);
  }
  return {
    on: x,
    off: S
  };
}
const { on: at, off: Je } = jb(), Wb = window.Vue.ref, ic = window.Vue.readonly, Ub = window.Vue.watch;
function Kb(e) {
  const t = Wb(!!e.value);
  if (t.value)
    return ic(t);
  const n = Ub(e, (o) => {
    o && (t.value = !0, n());
  });
  return ic(t);
}
const qb = window.Vue.computed, Gb = window.Vue.ref, Xb = window.Vue.watch;
function Oe(e) {
  const t = qb(e), n = Gb(t.value);
  return Xb(t, (o) => {
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
const Yb = window.Vue.getCurrentInstance;
function Zb() {
  return Yb() !== null;
}
const Vh = typeof window < "u", Jb = window.Vue.onMounted, Qb = window.Vue.onBeforeUnmount;
let Zo, Vr;
const ew = () => {
  var e, t;
  Zo = Vh ? (t = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || t === void 0 ? void 0 : t.ready : void 0, Vr = !1, Zo !== void 0 ? Zo.then(() => {
    Vr = !0;
  }) : Vr = !0;
};
ew();
function tw(e) {
  if (Vr)
    return;
  let t = !1;
  Jb(() => {
    Vr || Zo == null || Zo.then(() => {
      t || e();
    });
  }), Qb(() => {
    t = !0;
  });
}
const nw = window.Vue.watch, ow = window.Vue.computed;
function zt(e, t) {
  return nw(e, (n) => {
    n !== void 0 && (t.value = n);
  }), ow(() => e.value === void 0 ? t.value : e.value);
}
const rw = window.Vue.ref, iw = window.Vue.onMounted, aw = window.Vue.readonly;
function Pa() {
  const e = rw(!1);
  return iw(() => {
    e.value = !0;
  }), aw(e);
}
const lw = window.Vue.computed;
function Bh(e, t) {
  return lw(() => {
    for (const n of t)
      if (e[n] !== void 0)
        return e[n];
    return e[t[t.length - 1]];
  });
}
const sw = (typeof window > "u" ? !1 : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
!window.MSStream;
function dw() {
  return sw;
}
const cw = window.Vue.ref, Ya = window.Vue.computed, uw = window.Vue.onBeforeUnmount, fw = {
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
function hw(e) {
  return `(min-width: ${e}px)`;
}
const wr = {};
function pw(e = fw) {
  if (!Vh)
    return Ya(() => []);
  if (typeof window.matchMedia != "function")
    return Ya(() => []);
  const t = cw({}), n = Object.keys(e), o = (r, i) => {
    r.matches ? t.value[i] = !0 : t.value[i] = !1;
  };
  return n.forEach((r) => {
    const i = e[r];
    let l, a;
    wr[i] === void 0 ? (l = window.matchMedia(hw(i)), l.addEventListener ? l.addEventListener("change", (s) => {
      a.forEach((d) => {
        d(s, r);
      });
    }) : l.addListener && l.addListener((s) => {
      a.forEach((d) => {
        d(s, r);
      });
    }), a = /* @__PURE__ */ new Set(), wr[i] = {
      mql: l,
      cbs: a
    }) : (l = wr[i].mql, a = wr[i].cbs), a.add(o), l.matches && a.forEach((s) => {
      s(l, r);
    });
  }), uw(() => {
    n.forEach((r) => {
      const { cbs: i } = wr[e[r]];
      i.has(o) && i.delete(o);
    });
  }), Ya(() => {
    const { value: r } = t;
    return n.filter((i) => r[i]);
  });
}
const vw = window.Vue.onBeforeMount, mw = window.Vue.onBeforeUnmount, gw = window.Vue.reactive, bw = window.Vue.readonly, ww = window.Vue.watch;
function yw(e = {}, t) {
  const n = gw({
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
    (t === void 0 || t.value) && (at("keydown", document, i), at("keyup", document, l)), t !== void 0 && ww(t, (s) => {
      s ? (at("keydown", document, i), at("keyup", document, l)) : (Je("keydown", document, i), Je("keyup", document, l));
    });
  };
  return Zb() ? (vw(a), mw(() => {
    (t === void 0 || t.value) && (Je("keydown", document, i), Je("keyup", document, l));
  })) : a(), bw(n);
}
const Us = "n-internal-select-menu", Lh = "n-internal-select-menu-body", Ks = "n-drawer-body", qs = "n-modal-body", _a = "n-popover-body", gi = window.Vue.inject, xw = window.Vue.onBeforeUnmount, Cw = window.Vue.onMounted, Sw = window.Vue.ref, Dh = "__disabled__";
function Pn(e) {
  const t = gi(qs, null), n = gi(Ks, null), o = gi(_a, null), r = gi(Lh, null), i = Sw();
  if (typeof document < "u") {
    i.value = document.fullscreenElement;
    const l = () => {
      i.value = document.fullscreenElement;
    };
    Cw(() => {
      at("fullscreenchange", document, l);
    }), xw(() => {
      Je("fullscreenchange", document, l);
    });
  }
  return Oe(() => {
    var l;
    const {
      to: a
    } = e;
    return a !== void 0 ? a === !1 ? Dh : a === !0 ? i.value || "body" : a : t != null && t.value ? (l = t.value.$el) !== null && l !== void 0 ? l : t.value : n != null && n.value ? n.value : o != null && o.value ? o.value : r != null && r.value ? r.value : a ?? (i.value || "body");
  });
}
Pn.tdkey = Dh;
Pn.propTo = {
  type: [String, Object, Boolean],
  default: void 0
};
const $w = window.Vue.getCurrentInstance, Rw = window.Vue.inject, kw = window.Vue.onBeforeUnmount;
window.Vue.onMounted;
const Pw = window.Vue.watch;
function _w(e, t, n) {
  var o;
  const r = Rw(e, null);
  if (r === null) return;
  const i = (o = $w()) === null || o === void 0 ? void 0 : o.proxy;
  Pw(n, l), l(n.value), kw(() => {
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
const Tw = window.Vue.ref, Fw = window.Vue.watch;
function Ew(e, t, n) {
  const o = Tw(e.value);
  let r = null;
  return Fw(e, (i) => {
    r !== null && window.clearTimeout(r), i === !0 ? n && !n.value ? o.value = !0 : r = window.setTimeout(() => {
      o.value = !0;
    }, t) : o.value = !1;
  }), o;
}
const ar = typeof document < "u" && typeof window < "u", Ow = window.Vue.onActivated, zw = window.Vue.onDeactivated;
function Mw(e) {
  const t = {
    isDeactivated: !1
  };
  let n = !1;
  return Ow(() => {
    if (t.isDeactivated = !1, !n) {
      n = !0;
      return;
    }
    e();
  }), zw(() => {
    t.isDeactivated = !0, n || (n = !0);
  }), t;
}
const Iw = window.Vue.Fragment, Aw = window.Vue.createTextVNode, Vw = window.Vue.Comment;
function cs(e, t, n = "default") {
  const o = t[n];
  if (o === void 0)
    throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  return o();
}
function us(e, t = !0, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(Aw(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        us(o, t, n);
        return;
      }
      if (o.type === Iw) {
        if (o.children === null)
          return;
        Array.isArray(o.children) && us(o.children, t, n);
      } else o.type !== Vw && n.push(o);
    }
  }), n;
}
function ac(e, t, n = "default") {
  const o = t[n];
  if (o === void 0)
    throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  const r = us(o());
  if (r.length === 1)
    return r[0];
  throw new Error(`[vueuc/${e}]: slot[${n}] should have exactly one child.`);
}
let Gn = null;
function Nh() {
  if (Gn === null && (Gn = document.getElementById("v-binder-view-measurer"), Gn === null)) {
    Gn = document.createElement("div"), Gn.id = "v-binder-view-measurer";
    const { style: e } = Gn;
    e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(Gn);
  }
  return Gn.getBoundingClientRect();
}
function Bw(e, t) {
  const n = Nh();
  return {
    top: t,
    left: e,
    height: 0,
    width: 0,
    right: n.width - e,
    bottom: n.height - t
  };
}
function Za(e) {
  const t = e.getBoundingClientRect(), n = Nh();
  return {
    left: t.left - n.left,
    top: t.top - n.top,
    bottom: n.height + n.top - t.bottom,
    right: n.width + n.left - t.right,
    width: t.width,
    height: t.height
  };
}
function Lw(e) {
  return e.nodeType === 9 ? null : e.parentNode;
}
function Hh(e) {
  if (e === null)
    return null;
  const t = Lw(e);
  if (t === null)
    return null;
  if (t.nodeType === 9)
    return document;
  if (t.nodeType === 1) {
    const { overflow: n, overflowX: o, overflowY: r } = getComputedStyle(t);
    if (/(auto|scroll|overlay)/.test(n + r + o))
      return t;
  }
  return Hh(t);
}
const Dw = window.Vue.defineComponent, Nw = window.Vue.provide, Hw = window.Vue.ref, jw = window.Vue.inject, Ww = window.Vue.getCurrentInstance, Uw = window.Vue.onBeforeUnmount, Gs = Dw({
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
    Nw("VBinder", (t = Ww()) === null || t === void 0 ? void 0 : t.proxy);
    const n = jw("VBinder", null), o = Hw(null), r = (u) => {
      o.value = u, n && e.syncTargetWithParent && n.setTargetRef(u);
    };
    let i = [];
    const l = () => {
      let u = o.value;
      for (; u = Hh(u), u !== null; )
        i.push(u);
      for (const w of i)
        at("scroll", w, h, !0);
    }, a = () => {
      for (const u of i)
        Je("scroll", u, h, !0);
      i = [];
    }, s = /* @__PURE__ */ new Set(), d = (u) => {
      s.size === 0 && l(), s.has(u) || s.add(u);
    }, c = (u) => {
      s.has(u) && s.delete(u), s.size === 0 && a();
    }, h = () => {
      Xr(p);
    }, p = () => {
      s.forEach((u) => u());
    }, v = /* @__PURE__ */ new Set(), f = (u) => {
      v.size === 0 && at("resize", window, g), v.has(u) || v.add(u);
    }, m = (u) => {
      v.has(u) && v.delete(u), v.size === 0 && Je("resize", window, g);
    }, g = () => {
      v.forEach((u) => u());
    };
    return Uw(() => {
      Je("resize", window, g), a();
    }), {
      targetRef: o,
      setTargetRef: r,
      addScrollListener: d,
      removeScrollListener: c,
      addResizeListener: f,
      removeResizeListener: m
    };
  },
  render() {
    return cs("binder", this.$slots);
  }
}), Kw = window.Vue.defineComponent, qw = window.Vue.inject, Gw = window.Vue.withDirectives, Xs = Kw({
  name: "Target",
  setup() {
    const { setTargetRef: e, syncTarget: t } = qw("VBinder");
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
    return e ? Gw(ac("follower", this.$slots), [
      [t]
    ]) : ac("follower", this.$slots);
  }
}), Lo = "@@mmoContext", Xw = {
  mounted(e, { value: t }) {
    e[Lo] = {
      handler: void 0
    }, typeof t == "function" && (e[Lo].handler = t, at("mousemoveoutside", e, t));
  },
  updated(e, { value: t }) {
    const n = e[Lo];
    typeof t == "function" ? n.handler ? n.handler !== t && (Je("mousemoveoutside", e, n.handler), n.handler = t, at("mousemoveoutside", e, t)) : (e[Lo].handler = t, at("mousemoveoutside", e, t)) : n.handler && (Je("mousemoveoutside", e, n.handler), n.handler = void 0);
  },
  unmounted(e) {
    const { handler: t } = e[Lo];
    t && Je("mousemoveoutside", e, t), e[Lo].handler = void 0;
  }
}, Do = "@@coContext", ha = {
  mounted(e, { value: t, modifiers: n }) {
    e[Do] = {
      handler: void 0
    }, typeof t == "function" && (e[Do].handler = t, at("clickoutside", e, t, {
      capture: n.capture
    }));
  },
  updated(e, { value: t, modifiers: n }) {
    const o = e[Do];
    typeof t == "function" ? o.handler ? o.handler !== t && (Je("clickoutside", e, o.handler, {
      capture: n.capture
    }), o.handler = t, at("clickoutside", e, t, {
      capture: n.capture
    })) : (e[Do].handler = t, at("clickoutside", e, t, {
      capture: n.capture
    })) : o.handler && (Je("clickoutside", e, o.handler, {
      capture: n.capture
    }), o.handler = void 0);
  },
  unmounted(e, { modifiers: t }) {
    const { handler: n } = e[Do];
    n && Je("clickoutside", e, n, {
      capture: t.capture
    }), e[Do].handler = void 0;
  }
};
function Yw(e, t) {
  console.error(`[vdirs/${e}]: ${t}`);
}
class Zw {
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
    o.has(t) ? o.delete(t) : n === void 0 && Yw("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
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
const Ja = new Zw(), No = "@@ziContext", jh = {
  mounted(e, t) {
    const { value: n = {} } = t, { zIndex: o, enabled: r } = n;
    e[No] = {
      enabled: !!r,
      initialized: !1
    }, r && (Ja.ensureZIndex(e, o), e[No].initialized = !0);
  },
  updated(e, t) {
    const { value: n = {} } = t, { zIndex: o, enabled: r } = n, i = e[No].enabled;
    r && !i && (Ja.ensureZIndex(e, o), e[No].initialized = !0), e[No].enabled = !!r;
  },
  unmounted(e, t) {
    if (!e[No].initialized)
      return;
    const { value: n = {} } = t, { zIndex: o } = n;
    Ja.unregister(e, o);
  }
}, Jw = window.Vue.inject, Qw = "@css-render/vue3-ssr";
function e0(e, t) {
  return `<style cssr-id="${e}">
${t}
</style>`;
}
function t0(e, t, n) {
  const { styles: o, ids: r } = n;
  r.has(e) || o !== null && (r.add(e), o.push(e0(e, t)));
}
const n0 = typeof document < "u";
function Oo() {
  if (n0)
    return;
  const e = Jw(Qw, null);
  if (e !== null)
    return {
      adapter: (t, n) => t0(t, n, e),
      context: e
    };
}
function lc(e, t) {
  console.error(`[vueuc/${e}]: ${t}`);
}
const { c: io } = _h(), Ys = "vueuc-style";
function sc(e) {
  return e & -e;
}
class Wh {
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
      r[t] += n, t += sc(t);
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
      i += n[t], t -= sc(t);
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
function dc(e) {
  return typeof e == "string" ? document.querySelector(e) : e() || null;
}
const o0 = window.Vue.Teleport, r0 = window.Vue.h, i0 = window.Vue.toRef, a0 = window.Vue.computed, l0 = window.Vue.defineComponent, s0 = l0({
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
      showTeleport: Kb(i0(e, "show")),
      mergedTo: a0(() => {
        const { to: t } = e;
        return t ?? "body";
      })
    };
  },
  render() {
    return this.showTeleport ? this.disabled ? cs("lazy-teleport", this.$slots) : r0(o0, {
      disabled: this.disabled,
      to: this.mergedTo
    }, cs("lazy-teleport", this.$slots)) : null;
  }
}), bi = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, cc = {
  start: "end",
  center: "center",
  end: "start"
}, Qa = {
  top: "height",
  bottom: "height",
  left: "width",
  right: "width"
}, d0 = {
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
}, c0 = {
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
}, u0 = {
  "bottom-start": "right",
  "bottom-end": "left",
  "top-start": "right",
  "top-end": "left",
  "right-start": "bottom",
  "right-end": "top",
  "left-start": "bottom",
  "left-end": "top"
}, uc = {
  top: !0,
  // top++
  bottom: !1,
  // top--
  left: !0,
  // left++
  right: !1
  // left--
}, fc = {
  top: "end",
  bottom: "start",
  left: "end",
  right: "start"
};
function f0(e, t, n, o, r, i) {
  if (!r || i)
    return { placement: e, top: 0, left: 0 };
  const [l, a] = e.split("-");
  let s = a ?? "center", d = {
    top: 0,
    left: 0
  };
  const c = (v, f, m) => {
    let g = 0, u = 0;
    const w = n[v] - t[f] - t[v];
    return w > 0 && o && (m ? u = uc[f] ? w : -w : g = uc[f] ? w : -w), {
      left: g,
      top: u
    };
  }, h = l === "left" || l === "right";
  if (s !== "center") {
    const v = u0[e], f = bi[v], m = Qa[v];
    if (n[m] > t[m]) {
      if (
        // current space is not enough
        // ----------[ target ]---------|
        // -------[     follower        ]
        t[v] + t[m] < n[m]
      ) {
        const g = (n[m] - t[m]) / 2;
        t[v] < g || t[f] < g ? t[v] < t[f] ? (s = cc[a], d = c(m, f, h)) : d = c(m, v, h) : s = "center";
      }
    } else n[m] < t[m] && t[f] < 0 && // opposite align has larger space
    // ------------[   target   ]
    // ----------------[follower]
    t[v] > t[f] && (s = cc[a]);
  } else {
    const v = l === "bottom" || l === "top" ? "left" : "top", f = bi[v], m = Qa[v], g = (n[m] - t[m]) / 2;
    // center is not enough
    // ----------- [ target ]--|
    // -------[     follower     ]
    (t[v] < g || t[f] < g) && (t[v] > t[f] ? (s = fc[v], d = c(m, v, h)) : (s = fc[f], d = c(m, f, h)));
  }
  let p = l;
  return (
    // space is not enough
    t[l] < n[Qa[l]] && // opposite position's space is larger
    t[l] < t[bi[l]] && (p = bi[l]), {
      placement: s !== "center" ? `${p}-${s}` : p,
      left: d.left,
      top: d.top
    }
  );
}
function h0(e, t) {
  return t ? c0[e] : d0[e];
}
function p0(e, t, n, o, r, i) {
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
const el = window.Vue.h, v0 = window.Vue.defineComponent, m0 = window.Vue.inject, g0 = window.Vue.nextTick, wi = window.Vue.watch, tl = window.Vue.toRef, hc = window.Vue.ref, b0 = window.Vue.onMounted, w0 = window.Vue.onBeforeUnmount, y0 = window.Vue.withDirectives, x0 = io([
  io(".v-binder-follower-container", {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    height: "0",
    pointerEvents: "none",
    zIndex: "auto"
  }),
  io(".v-binder-follower-content", {
    position: "absolute",
    zIndex: "auto"
  }, [
    io("> *", {
      pointerEvents: "all"
    })
  ])
]), Zs = v0({
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
    const t = m0("VBinder"), n = Oe(() => e.enabled !== void 0 ? e.enabled : e.show), o = hc(null), r = hc(null), i = () => {
      const { syncTrigger: p } = e;
      p.includes("scroll") && t.addScrollListener(s), p.includes("resize") && t.addResizeListener(s);
    }, l = () => {
      t.removeScrollListener(s), t.removeResizeListener(s);
    };
    b0(() => {
      n.value && (s(), i());
    });
    const a = Oo();
    x0.mount({
      id: "vueuc/binder",
      head: !0,
      anchorMetaName: Ys,
      ssr: a
    }), w0(() => {
      l();
    }), tw(() => {
      n.value && s();
    });
    const s = () => {
      if (!n.value)
        return;
      const p = o.value;
      if (p === null)
        return;
      const v = t.targetRef, { x: f, y: m, overlap: g } = e, u = f !== void 0 && m !== void 0 ? Bw(f, m) : Za(v);
      p.style.setProperty("--v-target-width", `${Math.round(u.width)}px`), p.style.setProperty("--v-target-height", `${Math.round(u.height)}px`);
      const { width: w, minWidth: C, placement: b, internalShift: x, flip: S } = e;
      p.setAttribute("v-placement", b), g ? p.setAttribute("v-overlap", "") : p.removeAttribute("v-overlap");
      const { style: y } = p;
      w === "target" ? y.width = `${u.width}px` : w !== void 0 ? y.width = w : y.width = "", C === "target" ? y.minWidth = `${u.width}px` : C !== void 0 ? y.minWidth = C : y.minWidth = "";
      const T = Za(p), R = Za(r.value), { left: E, top: W, placement: _ } = f0(b, u, T, x, S, g), z = h0(_, g), { left: M, top: O, transform: U } = p0(_, R, u, W, E, g);
      p.setAttribute("v-placement", _), p.style.setProperty("--v-offset-left", `${Math.round(E)}px`), p.style.setProperty("--v-offset-top", `${Math.round(W)}px`), p.style.transform = `translateX(${M}) translateY(${O}) ${U}`, p.style.setProperty("--v-transform-origin", z), p.style.transformOrigin = z;
    };
    wi(n, (p) => {
      p ? (i(), d()) : l();
    });
    const d = () => {
      g0().then(s).catch((p) => console.error(p));
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
      wi(tl(e, p), s);
    }), ["teleportDisabled"].forEach((p) => {
      wi(tl(e, p), d);
    }), wi(tl(e, "syncTrigger"), (p) => {
      p.includes("resize") ? t.addResizeListener(s) : t.removeResizeListener(s), p.includes("scroll") ? t.addScrollListener(s) : t.removeScrollListener(s);
    });
    const c = Pa(), h = Oe(() => {
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
    return el(s0, {
      show: this.show,
      to: this.mergedTo,
      disabled: this.teleportDisabled
    }, {
      default: () => {
        var e, t;
        const n = el("div", {
          class: ["v-binder-follower-container", this.containerClass],
          ref: "offsetContainerRef"
        }, [
          el("div", {
            class: "v-binder-follower-content",
            ref: "followerRef"
          }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e))
        ]);
        return this.zindexable ? y0(n, [
          [
            jh,
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
var Po = [], C0 = function() {
  return Po.some(function(e) {
    return e.activeTargets.length > 0;
  });
}, S0 = function() {
  return Po.some(function(e) {
    return e.skippedTargets.length > 0;
  });
}, pc = "ResizeObserver loop completed with undelivered notifications.", $0 = function() {
  var e;
  typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
    message: pc
  }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = pc), window.dispatchEvent(e);
}, Jr;
(function(e) {
  e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
})(Jr || (Jr = {}));
var _o = function(e) {
  return Object.freeze(e);
}, R0 = /* @__PURE__ */ function() {
  function e(t, n) {
    this.inlineSize = t, this.blockSize = n, _o(this);
  }
  return e;
}(), Uh = function() {
  function e(t, n, o, r) {
    return this.x = t, this.y = n, this.width = o, this.height = r, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, _o(this);
  }
  return e.prototype.toJSON = function() {
    var t = this, n = t.x, o = t.y, r = t.top, i = t.right, l = t.bottom, a = t.left, s = t.width, d = t.height;
    return { x: n, y: o, top: r, right: i, bottom: l, left: a, width: s, height: d };
  }, e.fromRect = function(t) {
    return new e(t.x, t.y, t.width, t.height);
  }, e;
}(), Js = function(e) {
  return e instanceof SVGElement && "getBBox" in e;
}, Kh = function(e) {
  if (Js(e)) {
    var t = e.getBBox(), n = t.width, o = t.height;
    return !n && !o;
  }
  var r = e, i = r.offsetWidth, l = r.offsetHeight;
  return !(i || l || e.getClientRects().length);
}, vc = function(e) {
  var t;
  if (e instanceof Element)
    return !0;
  var n = (t = e == null ? void 0 : e.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
  return !!(n && e instanceof n.Element);
}, k0 = function(e) {
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
}, Br = typeof window < "u" ? window : {}, yi = /* @__PURE__ */ new WeakMap(), mc = /auto|scroll/, P0 = /^tb|vertical/, _0 = /msie|trident/i.test(Br.navigator && Br.navigator.userAgent), wn = function(e) {
  return parseFloat(e || "0");
}, Jo = function(e, t, n) {
  return e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = !1), new R0((n ? t : e) || 0, (n ? e : t) || 0);
}, gc = _o({
  devicePixelContentBoxSize: Jo(),
  borderBoxSize: Jo(),
  contentBoxSize: Jo(),
  contentRect: new Uh(0, 0, 0, 0)
}), qh = function(e, t) {
  if (t === void 0 && (t = !1), yi.has(e) && !t)
    return yi.get(e);
  if (Kh(e))
    return yi.set(e, gc), gc;
  var n = getComputedStyle(e), o = Js(e) && e.ownerSVGElement && e.getBBox(), r = !_0 && n.boxSizing === "border-box", i = P0.test(n.writingMode || ""), l = !o && mc.test(n.overflowY || ""), a = !o && mc.test(n.overflowX || ""), s = o ? 0 : wn(n.paddingTop), d = o ? 0 : wn(n.paddingRight), c = o ? 0 : wn(n.paddingBottom), h = o ? 0 : wn(n.paddingLeft), p = o ? 0 : wn(n.borderTopWidth), v = o ? 0 : wn(n.borderRightWidth), f = o ? 0 : wn(n.borderBottomWidth), m = o ? 0 : wn(n.borderLeftWidth), g = h + d, u = s + c, w = m + v, C = p + f, b = a ? e.offsetHeight - C - e.clientHeight : 0, x = l ? e.offsetWidth - w - e.clientWidth : 0, S = r ? g + w : 0, y = r ? u + C : 0, T = o ? o.width : wn(n.width) - S - x, R = o ? o.height : wn(n.height) - y - b, E = T + g + x + w, W = R + u + b + C, _ = _o({
    devicePixelContentBoxSize: Jo(Math.round(T * devicePixelRatio), Math.round(R * devicePixelRatio), i),
    borderBoxSize: Jo(E, W, i),
    contentBoxSize: Jo(T, R, i),
    contentRect: new Uh(h, s, T, R)
  });
  return yi.set(e, _), _;
}, Gh = function(e, t, n) {
  var o = qh(e, n), r = o.borderBoxSize, i = o.contentBoxSize, l = o.devicePixelContentBoxSize;
  switch (t) {
    case Jr.DEVICE_PIXEL_CONTENT_BOX:
      return l;
    case Jr.BORDER_BOX:
      return r;
    default:
      return i;
  }
}, T0 = /* @__PURE__ */ function() {
  function e(t) {
    var n = qh(t);
    this.target = t, this.contentRect = n.contentRect, this.borderBoxSize = _o([n.borderBoxSize]), this.contentBoxSize = _o([n.contentBoxSize]), this.devicePixelContentBoxSize = _o([n.devicePixelContentBoxSize]);
  }
  return e;
}(), Xh = function(e) {
  if (Kh(e))
    return 1 / 0;
  for (var t = 0, n = e.parentNode; n; )
    t += 1, n = n.parentNode;
  return t;
}, F0 = function() {
  var e = 1 / 0, t = [];
  Po.forEach(function(l) {
    if (l.activeTargets.length !== 0) {
      var a = [];
      l.activeTargets.forEach(function(d) {
        var c = new T0(d.target), h = Xh(d.target);
        a.push(c), d.lastReportedSize = Gh(d.target, d.observedBox), h < e && (e = h);
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
}, bc = function(e) {
  Po.forEach(function(n) {
    n.activeTargets.splice(0, n.activeTargets.length), n.skippedTargets.splice(0, n.skippedTargets.length), n.observationTargets.forEach(function(r) {
      r.isActive() && (Xh(r.target) > e ? n.activeTargets.push(r) : n.skippedTargets.push(r));
    });
  });
}, E0 = function() {
  var e = 0;
  for (bc(e); C0(); )
    e = F0(), bc(e);
  return S0() && $0(), e > 0;
}, nl, Yh = [], O0 = function() {
  return Yh.splice(0).forEach(function(e) {
    return e();
  });
}, z0 = function(e) {
  if (!nl) {
    var t = 0, n = document.createTextNode(""), o = { characterData: !0 };
    new MutationObserver(function() {
      return O0();
    }).observe(n, o), nl = function() {
      n.textContent = "".concat(t ? t-- : t++);
    };
  }
  Yh.push(e), nl();
}, M0 = function(e) {
  z0(function() {
    requestAnimationFrame(e);
  });
}, aa = 0, I0 = function() {
  return !!aa;
}, A0 = 250, V0 = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, wc = [
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
], yc = function(e) {
  return e === void 0 && (e = 0), Date.now() + e;
}, ol = !1, B0 = function() {
  function e() {
    var t = this;
    this.stopped = !0, this.listener = function() {
      return t.schedule();
    };
  }
  return e.prototype.run = function(t) {
    var n = this;
    if (t === void 0 && (t = A0), !ol) {
      ol = !0;
      var o = yc(t);
      M0(function() {
        var r = !1;
        try {
          r = E0();
        } finally {
          if (ol = !1, t = o - yc(), !I0())
            return;
          r ? n.run(1e3) : t > 0 ? n.run(t) : n.start();
        }
      });
    }
  }, e.prototype.schedule = function() {
    this.stop(), this.run();
  }, e.prototype.observe = function() {
    var t = this, n = function() {
      return t.observer && t.observer.observe(document.body, V0);
    };
    document.body ? n() : Br.addEventListener("DOMContentLoaded", n);
  }, e.prototype.start = function() {
    var t = this;
    this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), wc.forEach(function(n) {
      return Br.addEventListener(n, t.listener, !0);
    }));
  }, e.prototype.stop = function() {
    var t = this;
    this.stopped || (this.observer && this.observer.disconnect(), wc.forEach(function(n) {
      return Br.removeEventListener(n, t.listener, !0);
    }), this.stopped = !0);
  }, e;
}(), fs = new B0(), xc = function(e) {
  !aa && e > 0 && fs.start(), aa += e, !aa && fs.stop();
}, L0 = function(e) {
  return !Js(e) && !k0(e) && getComputedStyle(e).display === "inline";
}, D0 = function() {
  function e(t, n) {
    this.target = t, this.observedBox = n || Jr.CONTENT_BOX, this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  return e.prototype.isActive = function() {
    var t = Gh(this.target, this.observedBox, !0);
    return L0(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
  }, e;
}(), N0 = /* @__PURE__ */ function() {
  function e(t, n) {
    this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = n;
  }
  return e;
}(), xi = /* @__PURE__ */ new WeakMap(), Cc = function(e, t) {
  for (var n = 0; n < e.length; n += 1)
    if (e[n].target === t)
      return n;
  return -1;
}, Ci = function() {
  function e() {
  }
  return e.connect = function(t, n) {
    var o = new N0(t, n);
    xi.set(t, o);
  }, e.observe = function(t, n, o) {
    var r = xi.get(t), i = r.observationTargets.length === 0;
    Cc(r.observationTargets, n) < 0 && (i && Po.push(r), r.observationTargets.push(new D0(n, o && o.box)), xc(1), fs.schedule());
  }, e.unobserve = function(t, n) {
    var o = xi.get(t), r = Cc(o.observationTargets, n), i = o.observationTargets.length === 1;
    r >= 0 && (i && Po.splice(Po.indexOf(o), 1), o.observationTargets.splice(r, 1), xc(-1));
  }, e.disconnect = function(t) {
    var n = this, o = xi.get(t);
    o.observationTargets.slice().forEach(function(r) {
      return n.unobserve(t, r.target);
    }), o.activeTargets.splice(0, o.activeTargets.length);
  }, e;
}(), H0 = function() {
  function e(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    if (typeof t != "function")
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    Ci.connect(this, t);
  }
  return e.prototype.observe = function(t, n) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!vc(t))
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Ci.observe(this, t, n);
  }, e.prototype.unobserve = function(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!vc(t))
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Ci.unobserve(this, t);
  }, e.prototype.disconnect = function() {
    Ci.disconnect(this);
  }, e.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  }, e;
}();
class j0 {
  constructor() {
    this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || H0)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
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
const Lr = new j0(), W0 = window.Vue.defineComponent, U0 = window.Vue.renderSlot, K0 = window.Vue.getCurrentInstance, q0 = window.Vue.onMounted, G0 = window.Vue.onBeforeUnmount, To = W0({
  name: "ResizeObserver",
  props: {
    onResize: Function
  },
  setup(e) {
    let t = !1;
    const n = K0().proxy;
    function o(r) {
      const { onResize: i } = e;
      i !== void 0 && i(r);
    }
    q0(() => {
      const r = n.$el;
      if (r === void 0) {
        lc("resize-observer", "$el does not exist.");
        return;
      }
      if (r.nextElementSibling !== r.nextSibling && r.nodeType === 3 && r.nodeValue !== "") {
        lc("resize-observer", "$el can not be observed (it may be a text node).");
        return;
      }
      r.nextElementSibling !== null && (Lr.registerHandler(r.nextElementSibling, o), t = !0);
    }), G0(() => {
      t && Lr.unregisterHandler(n.$el.nextElementSibling);
    });
  },
  render() {
    return U0(this.$slots, "default");
  }
});
let Si;
function X0() {
  return typeof document > "u" ? !1 : (Si === void 0 && ("matchMedia" in window ? Si = window.matchMedia("(pointer:coarse)").matches : Si = !1), Si);
}
let rl;
function Sc() {
  return typeof document > "u" ? 1 : (rl === void 0 && (rl = "chrome" in window ? window.devicePixelRatio : 1), rl);
}
const Zh = "VVirtualListXScroll", Y0 = window.Vue.computed, Z0 = window.Vue.provide, $c = window.Vue.ref;
function J0({ columnsRef: e, renderColRef: t, renderItemWithColsRef: n }) {
  const o = $c(0), r = $c(0), i = Y0(() => {
    const d = e.value;
    if (d.length === 0)
      return null;
    const c = new Wh(d.length, 0);
    return d.forEach((h, p) => {
      c.add(p, h.width);
    }), c;
  }), l = Oe(() => {
    const d = i.value;
    return d !== null ? Math.max(d.getBound(r.value) - 1, 0) : 0;
  }), a = (d) => {
    const c = i.value;
    return c !== null ? c.sum(d) : 0;
  }, s = Oe(() => {
    const d = i.value;
    return d !== null ? Math.min(d.getBound(r.value + o.value) + 1, e.value.length - 1) : 0;
  });
  return Z0(Zh, {
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
const Q0 = window.Vue.defineComponent, ey = window.Vue.inject, Rc = Q0({
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
      ey(Zh)
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
}), ty = window.Vue.mergeProps, yr = window.Vue.computed, ny = window.Vue.defineComponent, xr = window.Vue.ref, oy = window.Vue.onMounted, mo = window.Vue.h, ry = window.Vue.onActivated, iy = window.Vue.onDeactivated, il = window.Vue.toRef, ay = io(".v-vl", {
  maxHeight: "inherit",
  height: "100%",
  overflow: "auto",
  minWidth: "1px"
  // a zero width container won't be scrollable
}, [
  io("&:not(.v-vl--show-scrollbar)", {
    scrollbarWidth: "none"
  }, [
    io("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", {
      width: 0,
      height: 0,
      display: "none"
    })
  ])
]), Qs = ny({
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
    const t = Oo();
    ay.mount({
      id: "vueuc/virtual-list",
      head: !0,
      anchorMetaName: Ys,
      ssr: t
    }), oy(() => {
      const { defaultScrollIndex: z, defaultScrollKey: M } = e;
      z != null ? g({ index: z }) : M != null && g({ key: M });
    });
    let n = !1, o = !1;
    ry(() => {
      if (n = !1, !o) {
        o = !0;
        return;
      }
      g({ top: v.value, left: l.value });
    }), iy(() => {
      n = !0, o || (o = !0);
    });
    const r = Oe(() => {
      if (e.renderCol == null && e.renderItemWithCols == null || e.columns.length === 0)
        return;
      let z = 0;
      return e.columns.forEach((M) => {
        z += M.width;
      }), z;
    }), i = yr(() => {
      const z = /* @__PURE__ */ new Map(), { keyField: M } = e;
      return e.items.forEach((O, U) => {
        z.set(O[M], U);
      }), z;
    }), { scrollLeftRef: l, listWidthRef: a } = J0({
      columnsRef: il(e, "columns"),
      renderColRef: il(e, "renderCol"),
      renderItemWithColsRef: il(e, "renderItemWithCols")
    }), s = xr(null), d = xr(void 0), c = /* @__PURE__ */ new Map(), h = yr(() => {
      const { items: z, itemSize: M, keyField: O } = e, U = new Wh(z.length, M);
      return z.forEach((L, Y) => {
        const Q = L[O], J = c.get(Q);
        J !== void 0 && U.add(Y, J);
      }), U;
    }), p = xr(0), v = xr(0), f = Oe(() => Math.max(h.value.getBound(v.value - xt(e.paddingTop)) - 1, 0)), m = yr(() => {
      const { value: z } = d;
      if (z === void 0)
        return [];
      const { items: M, itemSize: O } = e, U = f.value, L = Math.min(U + Math.ceil(z / O + 1), M.length - 1), Y = [];
      for (let Q = U; Q <= L; ++Q)
        Y.push(M[Q]);
      return Y;
    }), g = (z, M) => {
      if (typeof z == "number") {
        b(z, M, "auto");
        return;
      }
      const { left: O, top: U, index: L, key: Y, position: Q, behavior: J, debounce: q = !0 } = z;
      if (O !== void 0 || U !== void 0)
        b(O, U, J);
      else if (L !== void 0)
        C(L, J, q);
      else if (Y !== void 0) {
        const I = i.value.get(Y);
        I !== void 0 && C(I, J, q);
      } else Q === "bottom" ? b(0, Number.MAX_SAFE_INTEGER, J) : Q === "top" && b(0, 0, J);
    };
    let u, w = null;
    function C(z, M, O) {
      const { value: U } = h, L = U.sum(z) + xt(e.paddingTop);
      if (!O)
        s.value.scrollTo({
          left: 0,
          top: L,
          behavior: M
        });
      else {
        u = z, w !== null && window.clearTimeout(w), w = window.setTimeout(() => {
          u = void 0, w = null;
        }, 16);
        const { scrollTop: Y, offsetHeight: Q } = s.value;
        if (L > Y) {
          const J = U.get(z);
          L + J <= Y + Q || s.value.scrollTo({
            left: 0,
            top: L + J - Q,
            behavior: M
          });
        } else
          s.value.scrollTo({
            left: 0,
            top: L,
            behavior: M
          });
      }
    }
    function b(z, M, O) {
      s.value.scrollTo({
        left: z,
        top: M,
        behavior: O
      });
    }
    function x(z, M) {
      var O, U, L;
      if (n || e.ignoreItemResize || _(M.target))
        return;
      const { value: Y } = h, Q = i.value.get(z), J = Y.get(Q), q = (L = (U = (O = M.borderBoxSize) === null || O === void 0 ? void 0 : O[0]) === null || U === void 0 ? void 0 : U.blockSize) !== null && L !== void 0 ? L : M.contentRect.height;
      if (q === J)
        return;
      q - e.itemSize === 0 ? c.delete(z) : c.set(z, q - e.itemSize);
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
    const S = !X0();
    let y = !1;
    function T(z) {
      var M;
      (M = e.onScroll) === null || M === void 0 || M.call(e, z), (!S || !y) && W();
    }
    function R(z) {
      var M;
      if ((M = e.onWheel) === null || M === void 0 || M.call(e, z), S) {
        const O = s.value;
        if (O != null) {
          if (z.deltaX === 0 && (O.scrollTop === 0 && z.deltaY <= 0 || O.scrollTop + O.offsetHeight >= O.scrollHeight && z.deltaY >= 0))
            return;
          z.preventDefault(), O.scrollTop += z.deltaY / Sc(), O.scrollLeft += z.deltaX / Sc(), W(), y = !0, Xr(() => {
            y = !1;
          });
        }
      }
    }
    function E(z) {
      if (n || _(z.target))
        return;
      if (e.renderCol == null && e.renderItemWithCols == null) {
        if (z.contentRect.height === d.value)
          return;
      } else if (z.contentRect.height === d.value && z.contentRect.width === a.value)
        return;
      d.value = z.contentRect.height, a.value = z.contentRect.width;
      const { onResize: M } = e;
      M !== void 0 && M(z);
    }
    function W() {
      const { value: z } = s;
      z != null && (v.value = z.scrollTop, l.value = z.scrollLeft);
    }
    function _(z) {
      let M = z;
      for (; M !== null; ) {
        if (M.style.display === "none")
          return !0;
        M = M.parentElement;
      }
      return !1;
    }
    return {
      listHeight: d,
      listStyle: {
        overflow: "auto"
      },
      keyToIndex: i,
      itemsStyle: yr(() => {
        const { itemResizable: z } = e, M = it(h.value.sum());
        return p.value, [
          e.itemsStyle,
          {
            boxSizing: "content-box",
            width: it(r.value),
            height: z ? "" : M,
            minHeight: z ? M : "",
            paddingTop: it(e.paddingTop),
            paddingBottom: it(e.paddingBottom)
          }
        ];
      }),
      visibleItemsStyle: yr(() => (p.value, {
        transform: `translateY(${it(h.value.sum(f.value))})`
      })),
      viewportItems: m,
      listElRef: s,
      itemsElRef: xr(null),
      scrollTo: g,
      handleListResize: E,
      handleListScroll: T,
      handleListWheel: R,
      handleItemResize: x
    };
  },
  render() {
    const { itemResizable: e, keyField: t, keyToIndex: n, visibleItemsTag: o } = this;
    return mo(To, {
      onResize: this.handleListResize
    }, {
      default: () => {
        var r, i;
        return mo("div", ty(this.$attrs, {
          class: ["v-vl", this.showScrollbar && "v-vl--show-scrollbar"],
          onScroll: this.handleListScroll,
          onWheel: this.handleListWheel,
          ref: "listElRef"
        }), [
          this.items.length !== 0 ? mo("div", {
            ref: "itemsElRef",
            class: "v-vl-items",
            style: this.itemsStyle
          }, [
            mo(o, Object.assign({
              class: "v-vl-visible-items",
              style: this.visibleItemsStyle
            }, this.visibleItemsProps), {
              default: () => {
                const { renderCol: l, renderItemWithCols: a } = this;
                return this.viewportItems.map((s) => {
                  const d = s[t], c = n.get(d), h = l != null ? mo(Rc, {
                    index: c,
                    item: s
                  }) : void 0, p = a != null ? mo(Rc, {
                    index: c,
                    item: s
                  }) : void 0, v = this.$slots.default({
                    item: s,
                    renderedCols: h,
                    renderedItemWithCols: p,
                    index: c
                  })[0];
                  return e ? mo(To, {
                    key: d,
                    onResize: (f) => this.handleItemResize(d, f)
                  }, {
                    default: () => v
                  }) : (v.key = d, v);
                });
              }
            })
          ]) : (i = (r = this.$slots).empty) === null || i === void 0 ? void 0 : i.call(r)
        ]);
      }
    });
  }
}), ly = window.Vue.defineComponent, sy = window.Vue.renderSlot, kc = window.Vue.h, dy = window.Vue.onMounted, Pc = window.Vue.ref, cy = window.Vue.nextTick, Mn = "v-hidden", uy = io("[v-hidden]", {
  display: "none!important"
}), _c = ly({
  name: "Overflow",
  props: {
    getCounter: Function,
    getTail: Function,
    updateCounter: Function,
    onUpdateCount: Function,
    onUpdateOverflow: Function
  },
  setup(e, { slots: t }) {
    const n = Pc(null), o = Pc(null);
    function r(l) {
      const { value: a } = n, { getCounter: s, getTail: d } = e;
      let c;
      if (s !== void 0 ? c = s() : c = o.value, !a || !c)
        return;
      c.hasAttribute(Mn) && c.removeAttribute(Mn);
      const { children: h } = a;
      if (l.showAllItemsBeforeCalculate)
        for (const C of h)
          C.hasAttribute(Mn) && C.removeAttribute(Mn);
      const p = a.offsetWidth, v = [], f = t.tail ? d == null ? void 0 : d() : null;
      let m = f ? f.offsetWidth : 0, g = !1;
      const u = a.children.length - (t.tail ? 1 : 0);
      for (let C = 0; C < u - 1; ++C) {
        if (C < 0)
          continue;
        const b = h[C];
        if (g) {
          b.hasAttribute(Mn) || b.setAttribute(Mn, "");
          continue;
        } else b.hasAttribute(Mn) && b.removeAttribute(Mn);
        const x = b.offsetWidth;
        if (m += x, v[C] = x, m > p) {
          const { updateCounter: S } = e;
          for (let y = C; y >= 0; --y) {
            const T = u - 1 - y;
            S !== void 0 ? S(T) : c.textContent = `${T}`;
            const R = c.offsetWidth;
            if (m -= v[y], m + R <= p || y === 0) {
              g = !0, C = y - 1, f && (C === -1 ? (f.style.maxWidth = `${p - R}px`, f.style.boxSizing = "border-box") : f.style.maxWidth = "");
              const { onUpdateCount: E } = e;
              E && E(T);
              break;
            }
          }
        }
      }
      const { onUpdateOverflow: w } = e;
      g ? w !== void 0 && w(!0) : (w !== void 0 && w(!1), c.setAttribute(Mn, ""));
    }
    const i = Oo();
    return uy.mount({
      id: "vueuc/overflow",
      head: !0,
      anchorMetaName: Ys,
      ssr: i
    }), dy(() => r({
      showAllItemsBeforeCalculate: !1
    })), {
      selfRef: n,
      counterRef: o,
      sync: r
    };
  },
  render() {
    const { $slots: e } = this;
    return cy(() => this.sync({
      showAllItemsBeforeCalculate: !1
    })), kc("div", {
      class: "v-overflow",
      ref: "selfRef"
    }, [
      sy(e, "default"),
      // $slots.counter should only has 1 element
      e.counter ? e.counter() : kc("span", {
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
function Jh(e) {
  return e instanceof HTMLElement;
}
function Qh(e) {
  for (let t = 0; t < e.childNodes.length; t++) {
    const n = e.childNodes[t];
    if (Jh(n) && (tp(n) || Qh(n)))
      return !0;
  }
  return !1;
}
function ep(e) {
  for (let t = e.childNodes.length - 1; t >= 0; t--) {
    const n = e.childNodes[t];
    if (Jh(n) && (tp(n) || ep(n)))
      return !0;
  }
  return !1;
}
function tp(e) {
  if (!fy(e))
    return !1;
  try {
    e.focus({ preventScroll: !0 });
  } catch {
  }
  return document.activeElement === e;
}
function fy(e) {
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
const al = window.Vue.h, hy = window.Vue.defineComponent, Tc = window.Vue.ref, py = window.Vue.Fragment, vy = window.Vue.onMounted, my = window.Vue.onBeforeUnmount, gy = window.Vue.watch;
let Cr = [];
const by = hy({
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
    const t = Zr(), n = Tc(null), o = Tc(null);
    let r = !1, i = !1;
    const l = typeof document > "u" ? null : document.activeElement;
    function a() {
      return Cr[Cr.length - 1] === t;
    }
    function s(g) {
      var u;
      g.code === "Escape" && a() && ((u = e.onEsc) === null || u === void 0 || u.call(e, g));
    }
    vy(() => {
      gy(() => e.active, (g) => {
        g ? (h(), at("keydown", document, s)) : (Je("keydown", document, s), r && p());
      }, {
        immediate: !0
      });
    }), my(() => {
      Je("keydown", document, s), r && p();
    });
    function d(g) {
      if (!i && a()) {
        const u = c();
        if (u === null || u.contains(Yr(g)))
          return;
        v("first");
      }
    }
    function c() {
      const g = n.value;
      if (g === null)
        return null;
      let u = g;
      for (; u = u.nextSibling, !(u === null || u instanceof Element && u.tagName === "DIV"); )
        ;
      return u;
    }
    function h() {
      var g;
      if (!e.disabled) {
        if (Cr.push(t), e.autoFocus) {
          const { initialFocusTo: u } = e;
          u === void 0 ? v("first") : (g = dc(u)) === null || g === void 0 || g.focus({ preventScroll: !0 });
        }
        r = !0, document.addEventListener("focus", d, !0);
      }
    }
    function p() {
      var g;
      if (e.disabled || (document.removeEventListener("focus", d, !0), Cr = Cr.filter((w) => w !== t), a()))
        return;
      const { finalFocusTo: u } = e;
      u !== void 0 ? (g = dc(u)) === null || g === void 0 || g.focus({ preventScroll: !0 }) : e.returnFocusOnDeactivated && l instanceof HTMLElement && (i = !0, l.focus({ preventScroll: !0 }), i = !1);
    }
    function v(g) {
      if (a() && e.active) {
        const u = n.value, w = o.value;
        if (u !== null && w !== null) {
          const C = c();
          if (C == null || C === w) {
            i = !0, u.focus({ preventScroll: !0 }), i = !1;
            return;
          }
          i = !0;
          const b = g === "first" ? Qh(C) : ep(C);
          i = !1, b || (i = !0, u.focus({ preventScroll: !0 }), i = !1);
        }
      }
    }
    function f(g) {
      if (i)
        return;
      const u = c();
      u !== null && (g.relatedTarget !== null && u.contains(g.relatedTarget) ? v("last") : v("first"));
    }
    function m(g) {
      i || (g.relatedTarget !== null && g.relatedTarget === n.value ? v("last") : v("first"));
    }
    return {
      focusableStartRef: n,
      focusableEndRef: o,
      focusableStyle: "position: absolute; height: 0; width: 0;",
      handleStartFocus: f,
      handleEndFocus: m
    };
  },
  render() {
    const { default: e } = this.$slots;
    if (e === void 0)
      return null;
    if (this.disabled)
      return e();
    const { active: t, focusableStyle: n } = this;
    return al(py, null, [
      al("div", {
        "aria-hidden": "true",
        tabindex: t ? "0" : "-1",
        ref: "focusableStartRef",
        style: n,
        onFocus: this.handleStartFocus
      }),
      e(),
      al("div", {
        "aria-hidden": "true",
        style: n,
        ref: "focusableEndRef",
        tabindex: t ? "0" : "-1",
        onFocus: this.handleEndFocus
      })
    ]);
  }
}), wy = window.Vue.onBeforeUnmount, yy = window.Vue.onMounted, xy = window.Vue.watch;
function np(e, t) {
  t && (yy(() => {
    const {
      value: n
    } = e;
    n && Lr.registerHandler(n, t);
  }), xy(e, (n, o) => {
    o && Lr.unregisterHandler(o);
  }, {
    deep: !1
  }), wy(() => {
    const {
      value: n
    } = e;
    n && Lr.unregisterHandler(n);
  }));
}
function pa(e) {
  return e.replace(/#|\(|\)|,|\s|\./g, "_");
}
const Cy = /^(\d|\.)+$/, Fc = /(\d|\.)+/;
function St(e, {
  c: t = 1,
  offset: n = 0,
  attachPx: o = !0
} = {}) {
  if (typeof e == "number") {
    const r = (e + n) * t;
    return r === 0 ? "0" : `${r}px`;
  } else if (typeof e == "string")
    if (Cy.test(e)) {
      const r = (Number(e) + n) * t;
      return o ? r === 0 ? "0" : `${r}px` : `${r}`;
    } else {
      const r = Fc.exec(e);
      return r ? e.replace(Fc, String((Number(r[0]) + n) * t)) : e;
    }
  return e;
}
function Ec(e) {
  const {
    left: t,
    right: n,
    top: o,
    bottom: r
  } = Yt(e);
  return `${o} ${t} ${r} ${n}`;
}
function Sy(e, t) {
  if (!e) return;
  const n = document.createElement("a");
  n.href = e, t !== void 0 && (n.download = t), document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
let ll;
function $y() {
  return ll === void 0 && (ll = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), ll;
}
const Ry = /* @__PURE__ */ new WeakSet();
function ky(e) {
  Ry.add(e);
}
function Oc(e) {
  switch (typeof e) {
    case "string":
      return e || void 0;
    case "number":
      return String(e);
    default:
      return;
  }
}
const Py = {
  tiny: "mini",
  small: "tiny",
  medium: "small",
  large: "medium",
  huge: "large"
};
function zc(e) {
  const t = Py[e];
  if (t === void 0)
    throw new Error(`${e} has no smaller size.`);
  return t;
}
function so(e, t) {
  console.error(`[naive/${e}]: ${t}`);
}
function _y(e, t) {
  throw new Error(`[naive/${e}]: ${t}`);
}
function ie(e, ...t) {
  if (Array.isArray(e))
    e.forEach((n) => ie(n, ...t));
  else
    return e(...t);
}
function op(e) {
  return (t) => {
    t ? e.value = t.$el : e.value = null;
  };
}
const Ty = window.Vue.Comment, Fy = window.Vue.createTextVNode, Ey = window.Vue.Fragment;
function nr(e, t = !0, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(Fy(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        nr(o, t, n);
        return;
      }
      if (o.type === Ey) {
        if (o.children === null) return;
        Array.isArray(o.children) && nr(o.children, t, n);
      } else {
        if (o.type === Ty && t) return;
        n.push(o);
      }
    }
  }), n;
}
function Oy(e, t = "default", n = void 0) {
  const o = e[t];
  if (!o)
    return so("getFirstSlotVNode", `slot[${t}] is empty`), null;
  const r = nr(o(n));
  return r.length === 1 ? r[0] : (so("getFirstSlotVNode", `slot[${t}] should have exactly one child`), null);
}
function ed(e, t = "default", n = []) {
  const r = e.$slots[t];
  return r === void 0 ? n : r();
}
const zy = window.Vue.vShow;
function My(e) {
  var t;
  const n = (t = e.dirs) === null || t === void 0 ? void 0 : t.find(({
    dir: o
  }) => o === zy);
  return !!(n && n.value === !1);
}
function Qr(e, t = [], n) {
  const o = {};
  return t.forEach((r) => {
    o[r] = e[r];
  }), Object.assign(o, n);
}
function ei(e) {
  return Object.keys(e);
}
function Dr(e) {
  const t = e.filter((n) => n !== void 0);
  if (t.length !== 0)
    return t.length === 1 ? t[0] : (n) => {
      e.forEach((o) => {
        o && o(n);
      });
    };
}
function rp(e, t = [], n) {
  const o = {};
  return Object.getOwnPropertyNames(e).forEach((i) => {
    t.includes(i) || (o[i] = e[i]);
  }), Object.assign(o, n);
}
const Mc = window.Vue.createTextVNode;
function $n(e, ...t) {
  return typeof e == "function" ? e(...t) : typeof e == "string" ? Mc(e) : typeof e == "number" ? Mc(String(e)) : null;
}
const Iy = window.Vue.Comment, Ay = window.Vue.Fragment, Vy = window.Vue.isVNode;
function hn(e) {
  return e.some((t) => Vy(t) ? !(t.type === Iy || t.type === Ay && !hn(t.children)) : !0) ? e : null;
}
function vn(e, t) {
  return e && hn(e()) || t();
}
function By(e, t, n) {
  return e && hn(e(t)) || n(t);
}
function We(e, t) {
  const n = e && hn(e());
  return t(n || null);
}
function Qo(e) {
  return !(e && hn(e()));
}
const Ly = window.Vue.defineComponent, hs = Ly({
  render() {
    var e, t;
    return (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e);
  }
}), Hn = "n-config-provider", Ic = window.Vue.computed, ip = window.Vue.inject, ap = window.Vue.shallowRef, lp = "n";
function qe(e = {}, t = {
  defaultBordered: !0
}) {
  const n = ip(Hn, null);
  return {
    // NConfigProvider,
    inlineThemeDisabled: n == null ? void 0 : n.inlineThemeDisabled,
    mergedRtlRef: n == null ? void 0 : n.mergedRtlRef,
    mergedComponentPropsRef: n == null ? void 0 : n.mergedComponentPropsRef,
    mergedBreakpointsRef: n == null ? void 0 : n.mergedBreakpointsRef,
    mergedBorderedRef: Ic(() => {
      var o, r;
      const {
        bordered: i
      } = e;
      return i !== void 0 ? i : (r = (o = n == null ? void 0 : n.mergedBorderedRef.value) !== null && o !== void 0 ? o : t.defaultBordered) !== null && r !== void 0 ? r : !0;
    }),
    mergedClsPrefixRef: n ? n.mergedClsPrefixRef : ap(lp),
    namespaceRef: Ic(() => n == null ? void 0 : n.mergedNamespaceRef.value)
  };
}
function sp() {
  const e = ip(Hn, null);
  return e ? e.mergedClsPrefixRef : ap(lp);
}
const Dy = window.Vue.inject, Ny = window.Vue.ref, Hy = window.Vue.watchEffect;
function wt(e, t, n, o) {
  n || _y("useThemeClass", "cssVarsRef is not passed");
  const r = Dy(Hn, null), i = r == null ? void 0 : r.mergedThemeHashRef, l = r == null ? void 0 : r.styleMountTarget, a = Ny(""), s = Oo();
  let d;
  const c = `__${e}`, h = () => {
    let p = c;
    const v = t ? t.value : void 0, f = i == null ? void 0 : i.value;
    f && (p += `-${f}`), v && (p += `-${v}`);
    const {
      themeOverrides: m,
      builtinThemeOverrides: g
    } = o;
    m && (p += `-${ss(JSON.stringify(m))}`), g && (p += `-${ss(JSON.stringify(g))}`), a.value = p, d = () => {
      const u = n.value;
      let w = "";
      for (const C in u)
        w += `${C}: ${u[C]};`;
      H(`.${p}`, w).mount({
        id: p,
        ssr: s,
        parent: l
      }), d = void 0;
    };
  };
  return Hy(() => {
    h();
  }), {
    themeClass: a,
    onRender: () => {
      d == null || d();
    }
  };
}
const sl = window.Vue.computed, jy = window.Vue.inject, Wy = window.Vue.onBeforeUnmount, Uy = window.Vue.provide, ps = "n-form-item";
function jn(e, {
  defaultSize: t = "medium",
  mergedSize: n,
  mergedDisabled: o
} = {}) {
  const r = jy(ps, null);
  Uy(ps, null);
  const i = sl(n ? () => n(r) : () => {
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
  }), l = sl(o ? () => o(r) : () => {
    const {
      disabled: s
    } = e;
    return s !== void 0 ? s : r ? r.disabled.value : !1;
  }), a = sl(() => {
    const {
      status: s
    } = e;
    return s || (r == null ? void 0 : r.mergedValidationStatus.value);
  });
  return Wy(() => {
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
const Ky = {
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
function dl(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
function Sr(e) {
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
function $r(e) {
  return (t, n = {}) => {
    const o = n.width, r = o && e.matchPatterns[o] || e.matchPatterns[e.defaultMatchWidth], i = t.match(r);
    if (!i)
      return null;
    const l = i[0], a = o && e.parsePatterns[o] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(a) ? Gy(a, (h) => h.test(l)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      qy(a, (h) => h.test(l))
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
function qy(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Gy(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Xy(e) {
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
const Yy = {
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
}, Zy = (e, t, n) => {
  let o;
  const r = Yy[e];
  return typeof r == "string" ? o = r : t === 1 ? o = r.one : o = r.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + o : o + " ago" : o;
}, Jy = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, Qy = (e, t, n, o) => Jy[e], ex = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, tx = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, nx = {
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
}, ox = {
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
}, rx = {
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
}, ix = {
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
}, ax = (e, t) => {
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
}, lx = {
  ordinalNumber: ax,
  era: Sr({
    values: ex,
    defaultWidth: "wide"
  }),
  quarter: Sr({
    values: tx,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Sr({
    values: nx,
    defaultWidth: "wide"
  }),
  day: Sr({
    values: ox,
    defaultWidth: "wide"
  }),
  dayPeriod: Sr({
    values: rx,
    defaultWidth: "wide",
    formattingValues: ix,
    defaultFormattingWidth: "wide"
  })
}, sx = /^(\d+)(th|st|nd|rd)?/i, dx = /\d+/i, cx = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, ux = {
  any: [/^b/i, /^(a|c)/i]
}, fx = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, hx = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, px = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, vx = {
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
}, mx = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, gx = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, bx = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, wx = {
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
}, yx = {
  ordinalNumber: Xy({
    matchPattern: sx,
    parsePattern: dx,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: $r({
    matchPatterns: cx,
    defaultMatchWidth: "wide",
    parsePatterns: ux,
    defaultParseWidth: "any"
  }),
  quarter: $r({
    matchPatterns: fx,
    defaultMatchWidth: "wide",
    parsePatterns: hx,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: $r({
    matchPatterns: px,
    defaultMatchWidth: "wide",
    parsePatterns: vx,
    defaultParseWidth: "any"
  }),
  day: $r({
    matchPatterns: mx,
    defaultMatchWidth: "wide",
    parsePatterns: gx,
    defaultParseWidth: "any"
  }),
  dayPeriod: $r({
    matchPatterns: bx,
    defaultMatchWidth: "any",
    parsePatterns: wx,
    defaultParseWidth: "any"
  })
}, xx = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, Cx = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Sx = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, $x = {
  date: dl({
    formats: xx,
    defaultWidth: "full"
  }),
  time: dl({
    formats: Cx,
    defaultWidth: "full"
  }),
  dateTime: dl({
    formats: Sx,
    defaultWidth: "full"
  })
}, Rx = {
  code: "en-US",
  formatDistance: Zy,
  formatLong: $x,
  formatRelative: Qy,
  localize: lx,
  match: yx,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, kx = {
  name: "en-US",
  locale: Rx
};
var dp = typeof global == "object" && global && global.Object === Object && global, Px = typeof self == "object" && self && self.Object === Object && self, Fn = dp || Px || Function("return this")(), co = Fn.Symbol, cp = Object.prototype, _x = cp.hasOwnProperty, Tx = cp.toString, Rr = co ? co.toStringTag : void 0;
function Fx(e) {
  var t = _x.call(e, Rr), n = e[Rr];
  try {
    e[Rr] = void 0;
    var o = !0;
  } catch {
  }
  var r = Tx.call(e);
  return o && (t ? e[Rr] = n : delete e[Rr]), r;
}
var Ex = Object.prototype, Ox = Ex.toString;
function zx(e) {
  return Ox.call(e);
}
var Mx = "[object Null]", Ix = "[object Undefined]", Ac = co ? co.toStringTag : void 0;
function zo(e) {
  return e == null ? e === void 0 ? Ix : Mx : Ac && Ac in Object(e) ? Fx(e) : zx(e);
}
function uo(e) {
  return e != null && typeof e == "object";
}
var Ax = "[object Symbol]";
function td(e) {
  return typeof e == "symbol" || uo(e) && zo(e) == Ax;
}
function up(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = Array(o); ++n < o; )
    r[n] = t(e[n], n, e);
  return r;
}
var ln = Array.isArray, Vc = co ? co.prototype : void 0, Bc = Vc ? Vc.toString : void 0;
function fp(e) {
  if (typeof e == "string")
    return e;
  if (ln(e))
    return up(e, fp) + "";
  if (td(e))
    return Bc ? Bc.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function po(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function nd(e) {
  return e;
}
var Vx = "[object AsyncFunction]", Bx = "[object Function]", Lx = "[object GeneratorFunction]", Dx = "[object Proxy]";
function od(e) {
  if (!po(e))
    return !1;
  var t = zo(e);
  return t == Bx || t == Lx || t == Vx || t == Dx;
}
var cl = Fn["__core-js_shared__"], Lc = function() {
  var e = /[^.]+$/.exec(cl && cl.keys && cl.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Nx(e) {
  return !!Lc && Lc in e;
}
var Hx = Function.prototype, jx = Hx.toString;
function Mo(e) {
  if (e != null) {
    try {
      return jx.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Wx = /[\\^$.*+?()[\]{}|]/g, Ux = /^\[object .+?Constructor\]$/, Kx = Function.prototype, qx = Object.prototype, Gx = Kx.toString, Xx = qx.hasOwnProperty, Yx = RegExp(
  "^" + Gx.call(Xx).replace(Wx, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Zx(e) {
  if (!po(e) || Nx(e))
    return !1;
  var t = od(e) ? Yx : Ux;
  return t.test(Mo(e));
}
function Jx(e, t) {
  return e == null ? void 0 : e[t];
}
function Io(e, t) {
  var n = Jx(e, t);
  return Zx(n) ? n : void 0;
}
var vs = Io(Fn, "WeakMap"), Dc = Object.create, Qx = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!po(t))
      return {};
    if (Dc)
      return Dc(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}();
function eC(e, t, n) {
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
function tC(e, t) {
  var n = -1, o = e.length;
  for (t || (t = Array(o)); ++n < o; )
    t[n] = e[n];
  return t;
}
var nC = 800, oC = 16, rC = Date.now;
function iC(e) {
  var t = 0, n = 0;
  return function() {
    var o = rC(), r = oC - (o - n);
    if (n = o, r > 0) {
      if (++t >= nC)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function aC(e) {
  return function() {
    return e;
  };
}
var va = function() {
  try {
    var e = Io(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), lC = va ? function(e, t) {
  return va(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: aC(t),
    writable: !0
  });
} : nd, sC = iC(lC), dC = 9007199254740991, cC = /^(?:0|[1-9]\d*)$/;
function rd(e, t) {
  var n = typeof e;
  return t = t ?? dC, !!t && (n == "number" || n != "symbol" && cC.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function id(e, t, n) {
  t == "__proto__" && va ? va(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function ai(e, t) {
  return e === t || e !== e && t !== t;
}
var uC = Object.prototype, fC = uC.hasOwnProperty;
function hC(e, t, n) {
  var o = e[t];
  (!(fC.call(e, t) && ai(o, n)) || n === void 0 && !(t in e)) && id(e, t, n);
}
function pC(e, t, n, o) {
  var r = !n;
  n || (n = {});
  for (var i = -1, l = t.length; ++i < l; ) {
    var a = t[i], s = void 0;
    s === void 0 && (s = e[a]), r ? id(n, a, s) : hC(n, a, s);
  }
  return n;
}
var Nc = Math.max;
function vC(e, t, n) {
  return t = Nc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var o = arguments, r = -1, i = Nc(o.length - t, 0), l = Array(i); ++r < i; )
      l[r] = o[t + r];
    r = -1;
    for (var a = Array(t + 1); ++r < t; )
      a[r] = o[r];
    return a[t] = n(l), eC(e, this, a);
  };
}
function mC(e, t) {
  return sC(vC(e, t, nd), e + "");
}
var gC = 9007199254740991;
function ad(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= gC;
}
function lr(e) {
  return e != null && ad(e.length) && !od(e);
}
function bC(e, t, n) {
  if (!po(n))
    return !1;
  var o = typeof t;
  return (o == "number" ? lr(n) && rd(t, n.length) : o == "string" && t in n) ? ai(n[t], e) : !1;
}
function wC(e) {
  return mC(function(t, n) {
    var o = -1, r = n.length, i = r > 1 ? n[r - 1] : void 0, l = r > 2 ? n[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (r--, i) : void 0, l && bC(n[0], n[1], l) && (i = r < 3 ? void 0 : i, r = 1), t = Object(t); ++o < r; ) {
      var a = n[o];
      a && e(t, a, o, i);
    }
    return t;
  });
}
var yC = Object.prototype;
function ld(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || yC;
  return e === n;
}
function xC(e, t) {
  for (var n = -1, o = Array(e); ++n < e; )
    o[n] = t(n);
  return o;
}
var CC = "[object Arguments]";
function Hc(e) {
  return uo(e) && zo(e) == CC;
}
var hp = Object.prototype, SC = hp.hasOwnProperty, $C = hp.propertyIsEnumerable, ma = Hc(/* @__PURE__ */ function() {
  return arguments;
}()) ? Hc : function(e) {
  return uo(e) && SC.call(e, "callee") && !$C.call(e, "callee");
};
function RC() {
  return !1;
}
var pp = typeof exports == "object" && exports && !exports.nodeType && exports, jc = pp && typeof module == "object" && module && !module.nodeType && module, kC = jc && jc.exports === pp, Wc = kC ? Fn.Buffer : void 0, PC = Wc ? Wc.isBuffer : void 0, ga = PC || RC, _C = "[object Arguments]", TC = "[object Array]", FC = "[object Boolean]", EC = "[object Date]", OC = "[object Error]", zC = "[object Function]", MC = "[object Map]", IC = "[object Number]", AC = "[object Object]", VC = "[object RegExp]", BC = "[object Set]", LC = "[object String]", DC = "[object WeakMap]", NC = "[object ArrayBuffer]", HC = "[object DataView]", jC = "[object Float32Array]", WC = "[object Float64Array]", UC = "[object Int8Array]", KC = "[object Int16Array]", qC = "[object Int32Array]", GC = "[object Uint8Array]", XC = "[object Uint8ClampedArray]", YC = "[object Uint16Array]", ZC = "[object Uint32Array]", dt = {};
dt[jC] = dt[WC] = dt[UC] = dt[KC] = dt[qC] = dt[GC] = dt[XC] = dt[YC] = dt[ZC] = !0;
dt[_C] = dt[TC] = dt[NC] = dt[FC] = dt[HC] = dt[EC] = dt[OC] = dt[zC] = dt[MC] = dt[IC] = dt[AC] = dt[VC] = dt[BC] = dt[LC] = dt[DC] = !1;
function JC(e) {
  return uo(e) && ad(e.length) && !!dt[zo(e)];
}
function QC(e) {
  return function(t) {
    return e(t);
  };
}
var vp = typeof exports == "object" && exports && !exports.nodeType && exports, Nr = vp && typeof module == "object" && module && !module.nodeType && module, e1 = Nr && Nr.exports === vp, ul = e1 && dp.process, Uc = function() {
  try {
    var e = Nr && Nr.require && Nr.require("util").types;
    return e || ul && ul.binding && ul.binding("util");
  } catch {
  }
}(), Kc = Uc && Uc.isTypedArray, sd = Kc ? QC(Kc) : JC, t1 = Object.prototype, n1 = t1.hasOwnProperty;
function mp(e, t) {
  var n = ln(e), o = !n && ma(e), r = !n && !o && ga(e), i = !n && !o && !r && sd(e), l = n || o || r || i, a = l ? xC(e.length, String) : [], s = a.length;
  for (var d in e)
    (t || n1.call(e, d)) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    r && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    rd(d, s))) && a.push(d);
  return a;
}
function gp(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var o1 = gp(Object.keys, Object), r1 = Object.prototype, i1 = r1.hasOwnProperty;
function a1(e) {
  if (!ld(e))
    return o1(e);
  var t = [];
  for (var n in Object(e))
    i1.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function dd(e) {
  return lr(e) ? mp(e) : a1(e);
}
function l1(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var s1 = Object.prototype, d1 = s1.hasOwnProperty;
function c1(e) {
  if (!po(e))
    return l1(e);
  var t = ld(e), n = [];
  for (var o in e)
    o == "constructor" && (t || !d1.call(e, o)) || n.push(o);
  return n;
}
function bp(e) {
  return lr(e) ? mp(e, !0) : c1(e);
}
var u1 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, f1 = /^\w*$/;
function cd(e, t) {
  if (ln(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || td(e) ? !0 : f1.test(e) || !u1.test(e) || t != null && e in Object(t);
}
var ti = Io(Object, "create");
function h1() {
  this.__data__ = ti ? ti(null) : {}, this.size = 0;
}
function p1(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var v1 = "__lodash_hash_undefined__", m1 = Object.prototype, g1 = m1.hasOwnProperty;
function b1(e) {
  var t = this.__data__;
  if (ti) {
    var n = t[e];
    return n === v1 ? void 0 : n;
  }
  return g1.call(t, e) ? t[e] : void 0;
}
var w1 = Object.prototype, y1 = w1.hasOwnProperty;
function x1(e) {
  var t = this.__data__;
  return ti ? t[e] !== void 0 : y1.call(t, e);
}
var C1 = "__lodash_hash_undefined__";
function S1(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = ti && t === void 0 ? C1 : t, this;
}
function Fo(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Fo.prototype.clear = h1;
Fo.prototype.delete = p1;
Fo.prototype.get = b1;
Fo.prototype.has = x1;
Fo.prototype.set = S1;
function $1() {
  this.__data__ = [], this.size = 0;
}
function Ta(e, t) {
  for (var n = e.length; n--; )
    if (ai(e[n][0], t))
      return n;
  return -1;
}
var R1 = Array.prototype, k1 = R1.splice;
function P1(e) {
  var t = this.__data__, n = Ta(t, e);
  if (n < 0)
    return !1;
  var o = t.length - 1;
  return n == o ? t.pop() : k1.call(t, n, 1), --this.size, !0;
}
function _1(e) {
  var t = this.__data__, n = Ta(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function T1(e) {
  return Ta(this.__data__, e) > -1;
}
function F1(e, t) {
  var n = this.__data__, o = Ta(n, e);
  return o < 0 ? (++this.size, n.push([e, t])) : n[o][1] = t, this;
}
function Wn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Wn.prototype.clear = $1;
Wn.prototype.delete = P1;
Wn.prototype.get = _1;
Wn.prototype.has = T1;
Wn.prototype.set = F1;
var ni = Io(Fn, "Map");
function E1() {
  this.size = 0, this.__data__ = {
    hash: new Fo(),
    map: new (ni || Wn)(),
    string: new Fo()
  };
}
function O1(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Fa(e, t) {
  var n = e.__data__;
  return O1(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function z1(e) {
  var t = Fa(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function M1(e) {
  return Fa(this, e).get(e);
}
function I1(e) {
  return Fa(this, e).has(e);
}
function A1(e, t) {
  var n = Fa(this, e), o = n.size;
  return n.set(e, t), this.size += n.size == o ? 0 : 1, this;
}
function Un(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Un.prototype.clear = E1;
Un.prototype.delete = z1;
Un.prototype.get = M1;
Un.prototype.has = I1;
Un.prototype.set = A1;
var V1 = "Expected a function";
function ud(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(V1);
  var n = function() {
    var o = arguments, r = t ? t.apply(this, o) : o[0], i = n.cache;
    if (i.has(r))
      return i.get(r);
    var l = e.apply(this, o);
    return n.cache = i.set(r, l) || i, l;
  };
  return n.cache = new (ud.Cache || Un)(), n;
}
ud.Cache = Un;
var B1 = 500;
function L1(e) {
  var t = ud(e, function(o) {
    return n.size === B1 && n.clear(), o;
  }), n = t.cache;
  return t;
}
var D1 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, N1 = /\\(\\)?/g, H1 = L1(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(D1, function(n, o, r, i) {
    t.push(r ? i.replace(N1, "$1") : o || n);
  }), t;
});
function wp(e) {
  return e == null ? "" : fp(e);
}
function yp(e, t) {
  return ln(e) ? e : cd(e, t) ? [e] : H1(wp(e));
}
function Ea(e) {
  if (typeof e == "string" || td(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function xp(e, t) {
  t = yp(t, e);
  for (var n = 0, o = t.length; e != null && n < o; )
    e = e[Ea(t[n++])];
  return n && n == o ? e : void 0;
}
function oi(e, t, n) {
  var o = e == null ? void 0 : xp(e, t);
  return o === void 0 ? n : o;
}
function j1(e, t) {
  for (var n = -1, o = t.length, r = e.length; ++n < o; )
    e[r + n] = t[n];
  return e;
}
var Cp = gp(Object.getPrototypeOf, Object), W1 = "[object Object]", U1 = Function.prototype, K1 = Object.prototype, Sp = U1.toString, q1 = K1.hasOwnProperty, G1 = Sp.call(Object);
function X1(e) {
  if (!uo(e) || zo(e) != W1)
    return !1;
  var t = Cp(e);
  if (t === null)
    return !0;
  var n = q1.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && Sp.call(n) == G1;
}
function Y1(e, t, n) {
  var o = -1, r = e.length;
  t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var i = Array(r); ++o < r; )
    i[o] = e[o + t];
  return i;
}
function Z1(e, t, n) {
  var o = e.length;
  return n = n === void 0 ? o : n, !t && n >= o ? e : Y1(e, t, n);
}
var J1 = "\\ud800-\\udfff", Q1 = "\\u0300-\\u036f", eS = "\\ufe20-\\ufe2f", tS = "\\u20d0-\\u20ff", nS = Q1 + eS + tS, oS = "\\ufe0e\\ufe0f", rS = "\\u200d", iS = RegExp("[" + rS + J1 + nS + oS + "]");
function $p(e) {
  return iS.test(e);
}
function aS(e) {
  return e.split("");
}
var Rp = "\\ud800-\\udfff", lS = "\\u0300-\\u036f", sS = "\\ufe20-\\ufe2f", dS = "\\u20d0-\\u20ff", cS = lS + sS + dS, uS = "\\ufe0e\\ufe0f", fS = "[" + Rp + "]", ms = "[" + cS + "]", gs = "\\ud83c[\\udffb-\\udfff]", hS = "(?:" + ms + "|" + gs + ")", kp = "[^" + Rp + "]", Pp = "(?:\\ud83c[\\udde6-\\uddff]){2}", _p = "[\\ud800-\\udbff][\\udc00-\\udfff]", pS = "\\u200d", Tp = hS + "?", Fp = "[" + uS + "]?", vS = "(?:" + pS + "(?:" + [kp, Pp, _p].join("|") + ")" + Fp + Tp + ")*", mS = Fp + Tp + vS, gS = "(?:" + [kp + ms + "?", ms, Pp, _p, fS].join("|") + ")", bS = RegExp(gs + "(?=" + gs + ")|" + gS + mS, "g");
function wS(e) {
  return e.match(bS) || [];
}
function yS(e) {
  return $p(e) ? wS(e) : aS(e);
}
function xS(e) {
  return function(t) {
    t = wp(t);
    var n = $p(t) ? yS(t) : void 0, o = n ? n[0] : t.charAt(0), r = n ? Z1(n, 1).join("") : t.slice(1);
    return o[e]() + r;
  };
}
var CS = xS("toUpperCase");
function SS() {
  this.__data__ = new Wn(), this.size = 0;
}
function $S(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function RS(e) {
  return this.__data__.get(e);
}
function kS(e) {
  return this.__data__.has(e);
}
var PS = 200;
function _S(e, t) {
  var n = this.__data__;
  if (n instanceof Wn) {
    var o = n.__data__;
    if (!ni || o.length < PS - 1)
      return o.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new Un(o);
  }
  return n.set(e, t), this.size = n.size, this;
}
function kn(e) {
  var t = this.__data__ = new Wn(e);
  this.size = t.size;
}
kn.prototype.clear = SS;
kn.prototype.delete = $S;
kn.prototype.get = RS;
kn.prototype.has = kS;
kn.prototype.set = _S;
var Ep = typeof exports == "object" && exports && !exports.nodeType && exports, qc = Ep && typeof module == "object" && module && !module.nodeType && module, TS = qc && qc.exports === Ep, Gc = TS ? Fn.Buffer : void 0;
Gc && Gc.allocUnsafe;
function FS(e, t) {
  return e.slice();
}
function ES(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = 0, i = []; ++n < o; ) {
    var l = e[n];
    t(l, n, e) && (i[r++] = l);
  }
  return i;
}
function OS() {
  return [];
}
var zS = Object.prototype, MS = zS.propertyIsEnumerable, Xc = Object.getOwnPropertySymbols, IS = Xc ? function(e) {
  return e == null ? [] : (e = Object(e), ES(Xc(e), function(t) {
    return MS.call(e, t);
  }));
} : OS;
function AS(e, t, n) {
  var o = t(e);
  return ln(e) ? o : j1(o, n(e));
}
function Yc(e) {
  return AS(e, dd, IS);
}
var bs = Io(Fn, "DataView"), ws = Io(Fn, "Promise"), ys = Io(Fn, "Set"), Zc = "[object Map]", VS = "[object Object]", Jc = "[object Promise]", Qc = "[object Set]", eu = "[object WeakMap]", tu = "[object DataView]", BS = Mo(bs), LS = Mo(ni), DS = Mo(ws), NS = Mo(ys), HS = Mo(vs), oo = zo;
(bs && oo(new bs(new ArrayBuffer(1))) != tu || ni && oo(new ni()) != Zc || ws && oo(ws.resolve()) != Jc || ys && oo(new ys()) != Qc || vs && oo(new vs()) != eu) && (oo = function(e) {
  var t = zo(e), n = t == VS ? e.constructor : void 0, o = n ? Mo(n) : "";
  if (o)
    switch (o) {
      case BS:
        return tu;
      case LS:
        return Zc;
      case DS:
        return Jc;
      case NS:
        return Qc;
      case HS:
        return eu;
    }
  return t;
});
var ba = Fn.Uint8Array;
function jS(e) {
  var t = new e.constructor(e.byteLength);
  return new ba(t).set(new ba(e)), t;
}
function WS(e, t) {
  var n = jS(e.buffer);
  return new e.constructor(n, e.byteOffset, e.length);
}
function US(e) {
  return typeof e.constructor == "function" && !ld(e) ? Qx(Cp(e)) : {};
}
var KS = "__lodash_hash_undefined__";
function qS(e) {
  return this.__data__.set(e, KS), this;
}
function GS(e) {
  return this.__data__.has(e);
}
function wa(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new Un(); ++t < n; )
    this.add(e[t]);
}
wa.prototype.add = wa.prototype.push = qS;
wa.prototype.has = GS;
function XS(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function YS(e, t) {
  return e.has(t);
}
var ZS = 1, JS = 2;
function Op(e, t, n, o, r, i) {
  var l = n & ZS, a = e.length, s = t.length;
  if (a != s && !(l && s > a))
    return !1;
  var d = i.get(e), c = i.get(t);
  if (d && c)
    return d == t && c == e;
  var h = -1, p = !0, v = n & JS ? new wa() : void 0;
  for (i.set(e, t), i.set(t, e); ++h < a; ) {
    var f = e[h], m = t[h];
    if (o)
      var g = l ? o(m, f, h, t, e, i) : o(f, m, h, e, t, i);
    if (g !== void 0) {
      if (g)
        continue;
      p = !1;
      break;
    }
    if (v) {
      if (!XS(t, function(u, w) {
        if (!YS(v, w) && (f === u || r(f, u, n, o, i)))
          return v.push(w);
      })) {
        p = !1;
        break;
      }
    } else if (!(f === m || r(f, m, n, o, i))) {
      p = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), p;
}
function QS(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o, r) {
    n[++t] = [r, o];
  }), n;
}
function e$(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o) {
    n[++t] = o;
  }), n;
}
var t$ = 1, n$ = 2, o$ = "[object Boolean]", r$ = "[object Date]", i$ = "[object Error]", a$ = "[object Map]", l$ = "[object Number]", s$ = "[object RegExp]", d$ = "[object Set]", c$ = "[object String]", u$ = "[object Symbol]", f$ = "[object ArrayBuffer]", h$ = "[object DataView]", nu = co ? co.prototype : void 0, fl = nu ? nu.valueOf : void 0;
function p$(e, t, n, o, r, i, l) {
  switch (n) {
    case h$:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case f$:
      return !(e.byteLength != t.byteLength || !i(new ba(e), new ba(t)));
    case o$:
    case r$:
    case l$:
      return ai(+e, +t);
    case i$:
      return e.name == t.name && e.message == t.message;
    case s$:
    case c$:
      return e == t + "";
    case a$:
      var a = QS;
    case d$:
      var s = o & t$;
      if (a || (a = e$), e.size != t.size && !s)
        return !1;
      var d = l.get(e);
      if (d)
        return d == t;
      o |= n$, l.set(e, t);
      var c = Op(a(e), a(t), o, r, i, l);
      return l.delete(e), c;
    case u$:
      if (fl)
        return fl.call(e) == fl.call(t);
  }
  return !1;
}
var v$ = 1, m$ = Object.prototype, g$ = m$.hasOwnProperty;
function b$(e, t, n, o, r, i) {
  var l = n & v$, a = Yc(e), s = a.length, d = Yc(t), c = d.length;
  if (s != c && !l)
    return !1;
  for (var h = s; h--; ) {
    var p = a[h];
    if (!(l ? p in t : g$.call(t, p)))
      return !1;
  }
  var v = i.get(e), f = i.get(t);
  if (v && f)
    return v == t && f == e;
  var m = !0;
  i.set(e, t), i.set(t, e);
  for (var g = l; ++h < s; ) {
    p = a[h];
    var u = e[p], w = t[p];
    if (o)
      var C = l ? o(w, u, p, t, e, i) : o(u, w, p, e, t, i);
    if (!(C === void 0 ? u === w || r(u, w, n, o, i) : C)) {
      m = !1;
      break;
    }
    g || (g = p == "constructor");
  }
  if (m && !g) {
    var b = e.constructor, x = t.constructor;
    b != x && "constructor" in e && "constructor" in t && !(typeof b == "function" && b instanceof b && typeof x == "function" && x instanceof x) && (m = !1);
  }
  return i.delete(e), i.delete(t), m;
}
var w$ = 1, ou = "[object Arguments]", ru = "[object Array]", $i = "[object Object]", y$ = Object.prototype, iu = y$.hasOwnProperty;
function x$(e, t, n, o, r, i) {
  var l = ln(e), a = ln(t), s = l ? ru : oo(e), d = a ? ru : oo(t);
  s = s == ou ? $i : s, d = d == ou ? $i : d;
  var c = s == $i, h = d == $i, p = s == d;
  if (p && ga(e)) {
    if (!ga(t))
      return !1;
    l = !0, c = !1;
  }
  if (p && !c)
    return i || (i = new kn()), l || sd(e) ? Op(e, t, n, o, r, i) : p$(e, t, s, n, o, r, i);
  if (!(n & w$)) {
    var v = c && iu.call(e, "__wrapped__"), f = h && iu.call(t, "__wrapped__");
    if (v || f) {
      var m = v ? e.value() : e, g = f ? t.value() : t;
      return i || (i = new kn()), r(m, g, n, o, i);
    }
  }
  return p ? (i || (i = new kn()), b$(e, t, n, o, r, i)) : !1;
}
function fd(e, t, n, o, r) {
  return e === t ? !0 : e == null || t == null || !uo(e) && !uo(t) ? e !== e && t !== t : x$(e, t, n, o, fd, r);
}
var C$ = 1, S$ = 2;
function $$(e, t, n, o) {
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
      var c = new kn(), h;
      if (!(h === void 0 ? fd(d, s, C$ | S$, o, c) : h))
        return !1;
    }
  }
  return !0;
}
function zp(e) {
  return e === e && !po(e);
}
function R$(e) {
  for (var t = dd(e), n = t.length; n--; ) {
    var o = t[n], r = e[o];
    t[n] = [o, r, zp(r)];
  }
  return t;
}
function Mp(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function k$(e) {
  var t = R$(e);
  return t.length == 1 && t[0][2] ? Mp(t[0][0], t[0][1]) : function(n) {
    return n === e || $$(n, e, t);
  };
}
function P$(e, t) {
  return e != null && t in Object(e);
}
function _$(e, t, n) {
  t = yp(t, e);
  for (var o = -1, r = t.length, i = !1; ++o < r; ) {
    var l = Ea(t[o]);
    if (!(i = e != null && n(e, l)))
      break;
    e = e[l];
  }
  return i || ++o != r ? i : (r = e == null ? 0 : e.length, !!r && ad(r) && rd(l, r) && (ln(e) || ma(e)));
}
function T$(e, t) {
  return e != null && _$(e, t, P$);
}
var F$ = 1, E$ = 2;
function O$(e, t) {
  return cd(e) && zp(t) ? Mp(Ea(e), t) : function(n) {
    var o = oi(n, e);
    return o === void 0 && o === t ? T$(n, e) : fd(t, o, F$ | E$);
  };
}
function z$(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function M$(e) {
  return function(t) {
    return xp(t, e);
  };
}
function I$(e) {
  return cd(e) ? z$(Ea(e)) : M$(e);
}
function A$(e) {
  return typeof e == "function" ? e : e == null ? nd : typeof e == "object" ? ln(e) ? O$(e[0], e[1]) : k$(e) : I$(e);
}
function V$(e) {
  return function(t, n, o) {
    for (var r = -1, i = Object(t), l = o(t), a = l.length; a--; ) {
      var s = l[++r];
      if (n(i[s], s, i) === !1)
        break;
    }
    return t;
  };
}
var Ip = V$();
function B$(e, t) {
  return e && Ip(e, t, dd);
}
function L$(e, t) {
  return function(n, o) {
    if (n == null)
      return n;
    if (!lr(n))
      return e(n, o);
    for (var r = n.length, i = -1, l = Object(n); ++i < r && o(l[i], i, l) !== !1; )
      ;
    return n;
  };
}
var D$ = L$(B$);
function xs(e, t, n) {
  (n !== void 0 && !ai(e[t], n) || n === void 0 && !(t in e)) && id(e, t, n);
}
function N$(e) {
  return uo(e) && lr(e);
}
function Cs(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function H$(e) {
  return pC(e, bp(e));
}
function j$(e, t, n, o, r, i, l) {
  var a = Cs(e, n), s = Cs(t, n), d = l.get(s);
  if (d) {
    xs(e, n, d);
    return;
  }
  var c = i ? i(a, s, n + "", e, t, l) : void 0, h = c === void 0;
  if (h) {
    var p = ln(s), v = !p && ga(s), f = !p && !v && sd(s);
    c = s, p || v || f ? ln(a) ? c = a : N$(a) ? c = tC(a) : v ? (h = !1, c = FS(s)) : f ? (h = !1, c = WS(s)) : c = [] : X1(s) || ma(s) ? (c = a, ma(a) ? c = H$(a) : (!po(a) || od(a)) && (c = US(s))) : h = !1;
  }
  h && (l.set(s, c), r(c, s, o, i, l), l.delete(s)), xs(e, n, c);
}
function Ap(e, t, n, o, r) {
  e !== t && Ip(t, function(i, l) {
    if (r || (r = new kn()), po(i))
      j$(e, t, l, n, Ap, o, r);
    else {
      var a = o ? o(Cs(e, l), i, l + "", e, t, r) : void 0;
      a === void 0 && (a = i), xs(e, l, a);
    }
  }, bp);
}
function W$(e, t) {
  var n = -1, o = lr(e) ? Array(e.length) : [];
  return D$(e, function(r, i, l) {
    o[++n] = t(r, i, l);
  }), o;
}
function U$(e, t) {
  var n = ln(e) ? up : W$;
  return n(e, A$(t));
}
var Ri = wC(function(e, t, n) {
  Ap(e, t, n);
});
const au = window.Vue.computed, K$ = window.Vue.inject;
function sr(e) {
  const {
    mergedLocaleRef: t,
    mergedDateLocaleRef: n
  } = K$(Hn, null) || {}, o = au(() => {
    var i, l;
    return (l = (i = t == null ? void 0 : t.value) === null || i === void 0 ? void 0 : i[e]) !== null && l !== void 0 ? l : Ky[e];
  });
  return {
    dateLocaleRef: au(() => {
      var i;
      return (i = n == null ? void 0 : n.value) !== null && i !== void 0 ? i : kx;
    }),
    localeRef: o
  };
}
const or = "naive-ui-style", q$ = window.Vue.computed, G$ = window.Vue.inject, X$ = window.Vue.onBeforeMount, Y$ = window.Vue.watchEffect;
function Mt(e, t, n) {
  if (!t) return;
  const o = Oo(), r = q$(() => {
    const {
      value: a
    } = t;
    if (!a)
      return;
    const s = a[e];
    if (s)
      return s;
  }), i = G$(Hn, null), l = () => {
    Y$(() => {
      const {
        value: a
      } = n, s = `${a}${e}Rtl`;
      if (gb(s, o)) return;
      const {
        value: d
      } = r;
      d && d.style.mount({
        id: s,
        head: !0,
        anchorMetaName: or,
        props: {
          bPrefix: a ? `.${a}-` : void 0
        },
        ssr: o,
        parent: i == null ? void 0 : i.styleMountTarget
      });
    });
  };
  return o ? l() : X$(l), r;
}
const Ao = {
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
  fontSize: Z$,
  fontFamily: J$,
  lineHeight: Q$
} = Ao, Vp = H("body", `
 margin: 0;
 font-size: ${Z$};
 font-family: ${J$};
 line-height: ${Q$};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [H("input", `
 font-family: inherit;
 font-size: inherit;
 `)]), eR = window.Vue.inject, tR = window.Vue.onBeforeMount;
function Vo(e, t, n) {
  if (!t)
    return;
  const o = Oo(), r = eR(Hn, null), i = () => {
    const l = n.value;
    t.mount({
      id: l === void 0 ? e : l + e,
      head: !0,
      anchorMetaName: or,
      props: {
        bPrefix: l ? `.${l}-` : void 0
      },
      ssr: o,
      parent: r == null ? void 0 : r.styleMountTarget
    }), r != null && r.preflightStyleDisabled || Vp.mount({
      id: "n-global",
      head: !0,
      anchorMetaName: or,
      ssr: o,
      parent: r == null ? void 0 : r.styleMountTarget
    });
  };
  o ? i() : tR(i);
}
const nR = window.Vue.computed, oR = window.Vue.inject, rR = window.Vue.onBeforeMount;
function _e(e, t, n, o, r, i) {
  const l = Oo(), a = oR(Hn, null);
  if (n) {
    const d = () => {
      const c = i == null ? void 0 : i.value;
      n.mount({
        id: c === void 0 ? t : c + t,
        head: !0,
        props: {
          bPrefix: c ? `.${c}-` : void 0
        },
        anchorMetaName: or,
        ssr: l,
        parent: a == null ? void 0 : a.styleMountTarget
      }), a != null && a.preflightStyleDisabled || Vp.mount({
        id: "n-global",
        head: !0,
        anchorMetaName: or,
        ssr: l,
        parent: a == null ? void 0 : a.styleMountTarget
      });
    };
    l ? d() : rR(d);
  }
  return nR(() => {
    var d;
    const {
      theme: {
        common: c,
        self: h,
        peers: p = {}
      } = {},
      themeOverrides: v = {},
      builtinThemeOverrides: f = {}
    } = r, {
      common: m,
      peers: g
    } = v, {
      common: u = void 0,
      [e]: {
        common: w = void 0,
        self: C = void 0,
        peers: b = {}
      } = {}
    } = (a == null ? void 0 : a.mergedThemeRef.value) || {}, {
      common: x = void 0,
      [e]: S = {}
    } = (a == null ? void 0 : a.mergedThemeOverridesRef.value) || {}, {
      common: y,
      peers: T = {}
    } = S, R = Ri({}, c || w || u || o.common, x, y, m), E = Ri(
      // {}, executed every time, no need for empty obj
      (d = h || C || o.self) === null || d === void 0 ? void 0 : d(R),
      f,
      S,
      v
    );
    return {
      common: R,
      self: E,
      peers: Ri({}, o.peers, b, p),
      peerOverrides: Ri({}, f.peers, T, g)
    };
  });
}
_e.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object
};
const iR = A("base-icon", `
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
 `)]), aR = window.Vue.defineComponent, lR = window.Vue.h, sR = window.Vue.toRef, Ct = aR({
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
    Vo("-base-icon", iR, sR(e, "clsPrefix"));
  },
  render() {
    return lR("i", {
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
}), dR = window.Vue.defineComponent, cR = window.Vue.h, uR = window.Vue.Transition, dr = dR({
  name: "BaseIconSwitchTransition",
  setup(e, {
    slots: t
  }) {
    const n = Pa();
    return () => cR(uR, {
      name: "icon-switch-transition",
      appear: n.value
    }, t);
  }
}), fR = window.Vue.defineComponent, lu = window.Vue.h, hR = fR({
  name: "Add",
  render() {
    return lu("svg", {
      width: "512",
      height: "512",
      viewBox: "0 0 512 512",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, lu("path", {
      d: "M256 112V400M400 256H112",
      stroke: "currentColor",
      "stroke-width": "32",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }));
  }
}), pR = window.Vue.defineComponent, ki = window.Vue.h, vR = pR({
  name: "ArrowDown",
  render() {
    return ki("svg", {
      viewBox: "0 0 28 28",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, ki("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, ki("g", {
      "fill-rule": "nonzero"
    }, ki("path", {
      d: "M23.7916,15.2664 C24.0788,14.9679 24.0696,14.4931 23.7711,14.206 C23.4726,13.9188 22.9978,13.928 22.7106,14.2265 L14.7511,22.5007 L14.7511,3.74792 C14.7511,3.33371 14.4153,2.99792 14.0011,2.99792 C13.5869,2.99792 13.2511,3.33371 13.2511,3.74793 L13.2511,22.4998 L5.29259,14.2265 C5.00543,13.928 4.53064,13.9188 4.23213,14.206 C3.93361,14.4931 3.9244,14.9679 4.21157,15.2664 L13.2809,24.6944 C13.6743,25.1034 14.3289,25.1034 14.7223,24.6944 L23.7916,15.2664 Z"
    }))));
  }
}), su = window.Vue.defineComponent, mR = window.Vue.h, gR = window.Vue.inject;
function Bp(e, t) {
  const n = su({
    render() {
      return t();
    }
  });
  return su({
    name: CS(e),
    setup() {
      var o;
      const r = (o = gR(Hn, null)) === null || o === void 0 ? void 0 : o.mergedIconsRef;
      return () => {
        var i;
        const l = (i = r == null ? void 0 : r.value) === null || i === void 0 ? void 0 : i[e];
        return l ? l() : mR(n, null);
      };
    }
  });
}
const bR = window.Vue.defineComponent, du = window.Vue.h, cu = bR({
  name: "Backward",
  render() {
    return du("svg", {
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, du("path", {
      d: "M12.2674 15.793C11.9675 16.0787 11.4927 16.0672 11.2071 15.7673L6.20572 10.5168C5.9298 10.2271 5.9298 9.7719 6.20572 9.48223L11.2071 4.23177C11.4927 3.93184 11.9675 3.92031 12.2674 4.206C12.5673 4.49169 12.5789 4.96642 12.2932 5.26634L7.78458 9.99952L12.2932 14.7327C12.5789 15.0326 12.5673 15.5074 12.2674 15.793Z",
      fill: "currentColor"
    }));
  }
}), wR = window.Vue.defineComponent, hl = window.Vue.h, yR = wR({
  name: "Checkmark",
  render() {
    return hl("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 16 16"
    }, hl("g", {
      fill: "none"
    }, hl("path", {
      d: "M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",
      fill: "currentColor"
    })));
  }
}), xR = window.Vue.defineComponent, uu = window.Vue.h, Lp = xR({
  name: "ChevronDown",
  render() {
    return uu("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, uu("path", {
      d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z",
      fill: "currentColor"
    }));
  }
}), CR = window.Vue.defineComponent, fu = window.Vue.h, Dp = CR({
  name: "ChevronRight",
  render() {
    return fu("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, fu("path", {
      d: "M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z",
      fill: "currentColor"
    }));
  }
}), Pi = window.Vue.h, SR = Bp("clear", () => Pi("svg", {
  viewBox: "0 0 16 16",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, Pi("g", {
  stroke: "none",
  "stroke-width": "1",
  fill: "none",
  "fill-rule": "evenodd"
}, Pi("g", {
  fill: "currentColor",
  "fill-rule": "nonzero"
}, Pi("path", {
  d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z"
}))))), _i = window.Vue.h, $R = Bp("close", () => _i("svg", {
  viewBox: "0 0 12 12",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": !0
}, _i("g", {
  stroke: "none",
  "stroke-width": "1",
  fill: "none",
  "fill-rule": "evenodd"
}, _i("g", {
  fill: "currentColor",
  "fill-rule": "nonzero"
}, _i("path", {
  d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
}))))), RR = window.Vue.defineComponent, pl = window.Vue.h, kR = RR({
  name: "Empty",
  render() {
    return pl("svg", {
      viewBox: "0 0 28 28",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, pl("path", {
      d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",
      fill: "currentColor"
    }), pl("path", {
      d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",
      fill: "currentColor"
    }));
  }
}), PR = window.Vue.defineComponent, vl = window.Vue.h, _R = PR({
  name: "Eye",
  render() {
    return vl("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, vl("path", {
      d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "32"
    }), vl("circle", {
      cx: "256",
      cy: "256",
      r: "80",
      fill: "none",
      stroke: "currentColor",
      "stroke-miterlimit": "10",
      "stroke-width": "32"
    }));
  }
}), TR = window.Vue.defineComponent, Ho = window.Vue.h, FR = TR({
  name: "EyeOff",
  render() {
    return Ho("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, Ho("path", {
      d: "M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z",
      fill: "currentColor"
    }), Ho("path", {
      d: "M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z",
      fill: "currentColor"
    }), Ho("path", {
      d: "M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z",
      fill: "currentColor"
    }), Ho("path", {
      d: "M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z",
      fill: "currentColor"
    }), Ho("path", {
      d: "M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z",
      fill: "currentColor"
    }));
  }
}), ER = window.Vue.defineComponent, Ti = window.Vue.h, hu = ER({
  name: "FastBackward",
  render() {
    return Ti("svg", {
      viewBox: "0 0 20 20",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Ti("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, Ti("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, Ti("path", {
      d: "M8.73171,16.7949 C9.03264,17.0795 9.50733,17.0663 9.79196,16.7654 C10.0766,16.4644 10.0634,15.9897 9.76243,15.7051 L4.52339,10.75 L17.2471,10.75 C17.6613,10.75 17.9971,10.4142 17.9971,10 C17.9971,9.58579 17.6613,9.25 17.2471,9.25 L4.52112,9.25 L9.76243,4.29275 C10.0634,4.00812 10.0766,3.53343 9.79196,3.2325 C9.50733,2.93156 9.03264,2.91834 8.73171,3.20297 L2.31449,9.27241 C2.14819,9.4297 2.04819,9.62981 2.01448,9.8386 C2.00308,9.89058 1.99707,9.94459 1.99707,10 C1.99707,10.0576 2.00356,10.1137 2.01585,10.1675 C2.05084,10.3733 2.15039,10.5702 2.31449,10.7254 L8.73171,16.7949 Z"
    }))));
  }
}), OR = window.Vue.defineComponent, Fi = window.Vue.h, pu = OR({
  name: "FastForward",
  render() {
    return Fi("svg", {
      viewBox: "0 0 20 20",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Fi("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, Fi("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, Fi("path", {
      d: "M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z"
    }))));
  }
}), zR = window.Vue.defineComponent, Ei = window.Vue.h, MR = zR({
  name: "Filter",
  render() {
    return Ei("svg", {
      viewBox: "0 0 28 28",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Ei("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, Ei("g", {
      "fill-rule": "nonzero"
    }, Ei("path", {
      d: "M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z"
    }))));
  }
}), IR = window.Vue.defineComponent, vu = window.Vue.h, mu = IR({
  name: "Forward",
  render() {
    return vu("svg", {
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, vu("path", {
      d: "M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z",
      fill: "currentColor"
    }));
  }
}), AR = window.Vue.defineComponent, Oi = window.Vue.h, gu = AR({
  name: "More",
  render() {
    return Oi("svg", {
      viewBox: "0 0 16 16",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Oi("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, Oi("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, Oi("path", {
      d: "M4,7 C4.55228,7 5,7.44772 5,8 C5,8.55229 4.55228,9 4,9 C3.44772,9 3,8.55229 3,8 C3,7.44772 3.44772,7 4,7 Z M8,7 C8.55229,7 9,7.44772 9,8 C9,8.55229 8.55229,9 8,9 C7.44772,9 7,8.55229 7,8 C7,7.44772 7.44772,7 8,7 Z M12,7 C12.5523,7 13,7.44772 13,8 C13,8.55229 12.5523,9 12,9 C11.4477,9 11,8.55229 11,8 C11,7.44772 11.4477,7 12,7 Z"
    }))));
  }
}), VR = window.Vue.defineComponent, bu = window.Vue.h, BR = VR({
  name: "Remove",
  render() {
    return bu("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, bu("line", {
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
}), {
  cubicBezierEaseInOut: LR
} = Ao;
function rn({
  originalTransform: e = "",
  left: t = 0,
  top: n = 0,
  transition: o = `all .3s ${LR} !important`
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
const DR = A("base-clear", `
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
 `, [rn({
  originalTransform: "translateX(-50%) translateY(-50%)",
  left: "50%",
  top: "50%"
})])])]), NR = window.Vue.defineComponent, jo = window.Vue.h, HR = window.Vue.toRef, Ss = NR({
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
    return Vo("-base-clear", DR, HR(e, "clsPrefix")), {
      handleMouseDown(t) {
        t.preventDefault();
      }
    };
  },
  render() {
    const {
      clsPrefix: e
    } = this;
    return jo("div", {
      class: `${e}-base-clear`
    }, jo(dr, null, {
      default: () => {
        var t, n;
        return this.show ? jo("div", {
          key: "dismiss",
          class: `${e}-base-clear__clear`,
          onClick: this.onClear,
          onMousedown: this.handleMouseDown,
          "data-clear": !0
        }, vn(this.$slots.icon, () => [jo(Ct, {
          clsPrefix: e
        }, {
          default: () => jo(SR, null)
        })])) : jo("div", {
          key: "icon",
          class: `${e}-base-clear__placeholder`
        }, (n = (t = this.$slots).placeholder) === null || n === void 0 ? void 0 : n.call(t));
      }
    }));
  }
}), jR = A("base-close", `
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
`, [K("absolute", `
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
 `), Qe("disabled", [H("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), H("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), H("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), H("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), H("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), K("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), K("round", [H("&::before", `
 border-radius: 50%;
 `)])]), WR = window.Vue.defineComponent, ml = window.Vue.h, UR = window.Vue.toRef, Np = WR({
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
    return Vo("-base-close", jR, UR(e, "clsPrefix")), () => {
      const {
        clsPrefix: t,
        disabled: n,
        absolute: o,
        round: r,
        isButtonTag: i
      } = e;
      return ml(i ? "button" : "div", {
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
      }, ml(Ct, {
        clsPrefix: t
      }, {
        default: () => ml($R, null)
      }));
    };
  }
}), KR = window.Vue.defineComponent, qR = window.Vue.h, GR = window.Vue.Transition, XR = window.Vue.TransitionGroup, YR = KR({
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
      } = e, h = a ? XR : GR, p = {
        name: s ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
        appear: d,
        onEnter: i,
        onAfterEnter: l,
        onBeforeLeave: n,
        onLeave: o,
        onAfterLeave: r
      };
      return a || (p.mode = c), qR(h, p, t);
    };
  }
}), ZR = window.Vue.defineComponent, JR = window.Vue.h, QR = ZR({
  props: {
    onFocus: Function,
    onBlur: Function
  },
  setup(e) {
    return () => JR("div", {
      style: "width: 0; height: 0",
      tabindex: 0,
      onFocus: e.onFocus,
      onBlur: e.onBlur
    });
  }
}), ek = H([H("@keyframes rotator", `
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`), A("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [B("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [rn()]), B("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [rn({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})]), B("container", `
 animation: rotator 3s linear infinite both;
 `, [B("icon", `
 height: 1em;
 width: 1em;
 `)])])]), tk = window.Vue.defineComponent, sn = window.Vue.h, nk = window.Vue.toRef, gl = "1.6s", ok = {
  strokeWidth: {
    type: Number,
    default: 28
  },
  stroke: {
    type: String,
    default: void 0
  }
}, cr = tk({
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
  }, ok),
  setup(e) {
    Vo("-base-loading", ek, nk(e, "clsPrefix"));
  },
  render() {
    const {
      clsPrefix: e,
      radius: t,
      strokeWidth: n,
      stroke: o,
      scale: r
    } = this, i = t / r;
    return sn("div", {
      class: `${e}-base-loading`,
      role: "img",
      "aria-label": "loading"
    }, sn(dr, null, {
      default: () => this.show ? sn("div", {
        key: "icon",
        class: `${e}-base-loading__transition-wrapper`
      }, sn("div", {
        class: `${e}-base-loading__container`
      }, sn("svg", {
        class: `${e}-base-loading__icon`,
        viewBox: `0 0 ${2 * i} ${2 * i}`,
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          color: o
        }
      }, sn("g", null, sn("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        values: `0 ${i} ${i};270 ${i} ${i}`,
        begin: "0s",
        dur: gl,
        fill: "freeze",
        repeatCount: "indefinite"
      }), sn("circle", {
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
      }, sn("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        values: `0 ${i} ${i};135 ${i} ${i};450 ${i} ${i}`,
        begin: "0s",
        dur: gl,
        fill: "freeze",
        repeatCount: "indefinite"
      }), sn("animate", {
        attributeName: "stroke-dashoffset",
        values: `${5.67 * t};${1.42 * t};${5.67 * t}`,
        begin: "0s",
        dur: gl,
        fill: "freeze",
        repeatCount: "indefinite"
      })))))) : sn("div", {
        key: "placeholder",
        class: `${e}-base-loading__placeholder`
      }, this.$slots)
    }));
  }
}), {
  cubicBezierEaseInOut: wu
} = Ao;
function rk({
  name: e = "fade-in",
  enterDuration: t = "0.2s",
  leaveDuration: n = "0.2s",
  enterCubicBezier: o = wu,
  leaveCubicBezier: r = wu
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
const Pe = {
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
}, ik = lo(Pe.neutralBase), Hp = lo(Pe.neutralInvertBase), ak = `rgba(${Hp.slice(0, 3).join(", ")}, `;
function yu(e) {
  return `${ak + String(e)})`;
}
function _t(e) {
  const t = Array.from(Hp);
  return t[3] = Number(e), je(ik, t);
}
const vt = Object.assign(Object.assign({
  name: "common"
}, Ao), {
  baseColor: Pe.neutralBase,
  // primary color
  primaryColor: Pe.primaryDefault,
  primaryColorHover: Pe.primaryHover,
  primaryColorPressed: Pe.primaryActive,
  primaryColorSuppl: Pe.primarySuppl,
  // info color
  infoColor: Pe.infoDefault,
  infoColorHover: Pe.infoHover,
  infoColorPressed: Pe.infoActive,
  infoColorSuppl: Pe.infoSuppl,
  // success color
  successColor: Pe.successDefault,
  successColorHover: Pe.successHover,
  successColorPressed: Pe.successActive,
  successColorSuppl: Pe.successSuppl,
  // warning color
  warningColor: Pe.warningDefault,
  warningColorHover: Pe.warningHover,
  warningColorPressed: Pe.warningActive,
  warningColorSuppl: Pe.warningSuppl,
  // error color
  errorColor: Pe.errorDefault,
  errorColorHover: Pe.errorHover,
  errorColorPressed: Pe.errorActive,
  errorColorSuppl: Pe.errorSuppl,
  // text color
  textColorBase: Pe.neutralTextBase,
  textColor1: "rgb(31, 34, 37)",
  textColor2: "rgb(51, 54, 57)",
  textColor3: "rgb(118, 124, 130)",
  // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
  // textColor5: neutral(base.alpha5),
  textColorDisabled: _t(Pe.alpha4),
  placeholderColor: _t(Pe.alpha4),
  placeholderColorDisabled: _t(Pe.alpha5),
  iconColor: _t(Pe.alpha4),
  iconColorHover: mi(_t(Pe.alpha4), {
    lightness: 0.75
  }),
  iconColorPressed: mi(_t(Pe.alpha4), {
    lightness: 0.9
  }),
  iconColorDisabled: _t(Pe.alpha5),
  opacity1: Pe.alpha1,
  opacity2: Pe.alpha2,
  opacity3: Pe.alpha3,
  opacity4: Pe.alpha4,
  opacity5: Pe.alpha5,
  dividerColor: "rgb(239, 239, 245)",
  borderColor: "rgb(224, 224, 230)",
  // close
  closeIconColor: _t(Number(Pe.alphaClose)),
  closeIconColorHover: _t(Number(Pe.alphaClose)),
  closeIconColorPressed: _t(Number(Pe.alphaClose)),
  closeColorHover: "rgba(0, 0, 0, .09)",
  closeColorPressed: "rgba(0, 0, 0, .13)",
  // clear
  clearColor: _t(Pe.alpha4),
  clearColorHover: mi(_t(Pe.alpha4), {
    lightness: 0.75
  }),
  clearColorPressed: mi(_t(Pe.alpha4), {
    lightness: 0.9
  }),
  scrollbarColor: yu(Pe.alphaScrollbar),
  scrollbarColorHover: yu(Pe.alphaScrollbarHover),
  scrollbarWidth: "5px",
  scrollbarHeight: "5px",
  scrollbarBorderRadius: "5px",
  progressRailColor: _t(Pe.alphaProgressRail),
  railColor: "rgb(219, 219, 223)",
  popoverColor: Pe.neutralPopover,
  tableColor: Pe.neutralCard,
  cardColor: Pe.neutralCard,
  modalColor: Pe.neutralModal,
  bodyColor: Pe.neutralBody,
  tagColor: "#eee",
  avatarColor: _t(Pe.alphaAvatar),
  invertedColor: "rgb(0, 20, 40)",
  inputColor: _t(Pe.alphaInput),
  codeColor: "rgb(244, 244, 248)",
  tabColor: "rgb(247, 247, 250)",
  actionColor: "rgb(250, 250, 252)",
  tableHeaderColor: "rgb(250, 250, 252)",
  hoverColor: "rgb(243, 243, 245)",
  // use color with alpha since it can be nested with header filter & sorter effect
  tableColorHover: "rgba(0, 0, 100, 0.03)",
  tableColorStriped: "rgba(0, 0, 100, 0.02)",
  pressedColor: "rgb(237, 237, 239)",
  opacityDisabled: Pe.alphaDisabled,
  inputColorDisabled: "rgb(250, 250, 252)",
  // secondary button color
  // can also be used in tertiary button & quaternary button
  buttonColor2: "rgba(46, 51, 56, .05)",
  buttonColor2Hover: "rgba(46, 51, 56, .09)",
  buttonColor2Pressed: "rgba(46, 51, 56, .13)",
  boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
  boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
  boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
}), lk = {
  railInsetHorizontalBottom: "auto 2px 4px 2px",
  railInsetHorizontalTop: "4px 2px auto 2px",
  railInsetVerticalRight: "2px 4px 2px auto",
  railInsetVerticalLeft: "2px auto 2px 4px",
  railColor: "transparent"
};
function sk(e) {
  const {
    scrollbarColor: t,
    scrollbarColorHover: n,
    scrollbarHeight: o,
    scrollbarWidth: r,
    scrollbarBorderRadius: i
  } = e;
  return Object.assign(Object.assign({}, lk), {
    height: o,
    width: r,
    borderRadius: i,
    color: t,
    colorHover: n
  });
}
const li = {
  name: "Scrollbar",
  common: vt,
  self: sk
}, dk = A("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [H(">", [A("scrollbar-container", `
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
  A("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)
])])]), H(">, +", [A("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `, [K("horizontal", `
 height: var(--n-scrollbar-height);
 `, [H(">", [B("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), K("horizontal--top", `
 top: var(--n-scrollbar-rail-top-horizontal-top); 
 right: var(--n-scrollbar-rail-right-horizontal-top); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-top); 
 left: var(--n-scrollbar-rail-left-horizontal-top); 
 `), K("horizontal--bottom", `
 top: var(--n-scrollbar-rail-top-horizontal-bottom); 
 right: var(--n-scrollbar-rail-right-horizontal-bottom); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-bottom); 
 left: var(--n-scrollbar-rail-left-horizontal-bottom); 
 `), K("vertical", `
 width: var(--n-scrollbar-width);
 `, [H(">", [B("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), K("vertical--left", `
 top: var(--n-scrollbar-rail-top-vertical-left); 
 right: var(--n-scrollbar-rail-right-vertical-left); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-left); 
 left: var(--n-scrollbar-rail-left-vertical-left); 
 `), K("vertical--right", `
 top: var(--n-scrollbar-rail-top-vertical-right); 
 right: var(--n-scrollbar-rail-right-vertical-right); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-right); 
 left: var(--n-scrollbar-rail-left-vertical-right); 
 `), K("disabled", [H(">", [B("scrollbar", "pointer-events: none;")])]), H(">", [B("scrollbar", `
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [rk(), H("&:hover", "background-color: var(--n-scrollbar-color-hover);")])])])])]), Vt = window.Vue.computed, ck = window.Vue.defineComponent, uk = window.Vue.Fragment, en = window.Vue.h, fk = window.Vue.mergeProps, hk = window.Vue.onBeforeUnmount, pk = window.Vue.onMounted, Bt = window.Vue.ref, xu = window.Vue.Transition, vk = window.Vue.watchEffect, mk = Object.assign(Object.assign({}, _e.props), {
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
}), si = ck({
  name: "Scrollbar",
  props: mk,
  inheritAttrs: !1,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n,
      mergedRtlRef: o
    } = qe(e), r = Mt("Scrollbar", o, t), i = Bt(null), l = Bt(null), a = Bt(null), s = Bt(null), d = Bt(null), c = Bt(null), h = Bt(null), p = Bt(null), v = Bt(null), f = Bt(null), m = Bt(null), g = Bt(0), u = Bt(0), w = Bt(!1), C = Bt(!1);
    let b = !1, x = !1, S, y, T = 0, R = 0, E = 0, W = 0;
    const _ = dw(), z = _e("Scrollbar", "-scrollbar", dk, li, e, t), M = Vt(() => {
      const {
        value: P
      } = p, {
        value: N
      } = c, {
        value: te
      } = f;
      return P === null || N === null || te === null ? 0 : Math.min(P, te * P / N + xt(z.value.self.width) * 1.5);
    }), O = Vt(() => `${M.value}px`), U = Vt(() => {
      const {
        value: P
      } = v, {
        value: N
      } = h, {
        value: te
      } = m;
      return P === null || N === null || te === null ? 0 : te * P / N + xt(z.value.self.height) * 1.5;
    }), L = Vt(() => `${U.value}px`), Y = Vt(() => {
      const {
        value: P
      } = p, {
        value: N
      } = g, {
        value: te
      } = c, {
        value: se
      } = f;
      if (P === null || te === null || se === null)
        return 0;
      {
        const ue = te - P;
        return ue ? N / ue * (se - M.value) : 0;
      }
    }), Q = Vt(() => `${Y.value}px`), J = Vt(() => {
      const {
        value: P
      } = v, {
        value: N
      } = u, {
        value: te
      } = h, {
        value: se
      } = m;
      if (P === null || te === null || se === null)
        return 0;
      {
        const ue = te - P;
        return ue ? N / ue * (se - U.value) : 0;
      }
    }), q = Vt(() => `${J.value}px`), I = Vt(() => {
      const {
        value: P
      } = p, {
        value: N
      } = c;
      return P !== null && N !== null && N > P;
    }), G = Vt(() => {
      const {
        value: P
      } = v, {
        value: N
      } = h;
      return P !== null && N !== null && N > P;
    }), Z = Vt(() => {
      const {
        trigger: P
      } = e;
      return P === "none" || w.value;
    }), ae = Vt(() => {
      const {
        trigger: P
      } = e;
      return P === "none" || C.value;
    }), le = Vt(() => {
      const {
        container: P
      } = e;
      return P ? P() : l.value;
    }), de = Vt(() => {
      const {
        content: P
      } = e;
      return P ? P() : a.value;
    }), me = (P, N) => {
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
        el: Ae,
        debounce: ot = !0
      } = P;
      (te !== void 0 || se !== void 0) && $e(te ?? 0, se ?? 0, 0, !1, Ce), Ae !== void 0 ? $e(0, Ae.offsetTop, Ae.offsetHeight, ot, Ce) : ue !== void 0 && be !== void 0 ? $e(0, ue * be, be, ot, Ce) : we === "bottom" ? $e(0, Number.MAX_SAFE_INTEGER, 0, !1, Ce) : we === "top" && $e(0, 0, 0, !1, Ce);
    }, X = Mw(() => {
      e.container || me({
        top: g.value,
        left: u.value
      });
    }), ce = () => {
      X.isDeactivated || j();
    }, ke = (P) => {
      if (X.isDeactivated) return;
      const {
        onResize: N
      } = e;
      N && N(P), j();
    }, ge = (P, N) => {
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
    function Be() {
      Me();
    }
    function Me() {
      oe(), k();
    }
    function oe() {
      y !== void 0 && window.clearTimeout(y), y = window.setTimeout(() => {
        C.value = !1;
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
      y !== void 0 && window.clearTimeout(y), C.value = !0;
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
      P && (g.value = P.scrollTop, u.value = P.scrollLeft * (r != null && r.value ? -1 : 1));
    }
    function he() {
      const {
        value: P
      } = de;
      P && (c.value = P.offsetHeight, h.value = P.offsetWidth);
      const {
        value: N
      } = le;
      N && (p.value = N.offsetHeight, v.value = N.offsetWidth);
      const {
        value: te
      } = d, {
        value: se
      } = s;
      te && (m.value = te.offsetWidth), se && (f.value = se.offsetHeight);
    }
    function F() {
      const {
        value: P
      } = le;
      P && (g.value = P.scrollTop, u.value = P.scrollLeft * (r != null && r.value ? -1 : 1), p.value = P.offsetHeight, v.value = P.offsetWidth, c.value = P.scrollHeight, h.value = P.scrollWidth);
      const {
        value: N
      } = d, {
        value: te
      } = s;
      N && (m.value = N.offsetWidth), te && (f.value = te.offsetHeight);
    }
    function j() {
      e.scrollable && (e.useUnifiedContainer ? F() : (he(), ve()));
    }
    function pe(P) {
      var N;
      return !(!((N = i.value) === null || N === void 0) && N.contains(Yr(P)));
    }
    function Te(P) {
      P.preventDefault(), P.stopPropagation(), x = !0, at("mousemove", window, lt, !0), at("mouseup", window, pt, !0), R = u.value, E = r != null && r.value ? window.innerWidth - P.clientX : P.clientX;
    }
    function lt(P) {
      if (!x) return;
      S !== void 0 && window.clearTimeout(S), y !== void 0 && window.clearTimeout(y);
      const {
        value: N
      } = v, {
        value: te
      } = h, {
        value: se
      } = U;
      if (N === null || te === null) return;
      const be = (r != null && r.value ? window.innerWidth - P.clientX - E : P.clientX - E) * (te - N) / (N - se), we = te - N;
      let Ce = R + be;
      Ce = Math.min(we, Ce), Ce = Math.max(Ce, 0);
      const {
        value: Ae
      } = le;
      if (Ae) {
        Ae.scrollLeft = Ce * (r != null && r.value ? -1 : 1);
        const {
          internalOnUpdateScrollLeft: ot
        } = e;
        ot && ot(Ce);
      }
    }
    function pt(P) {
      P.preventDefault(), P.stopPropagation(), Je("mousemove", window, lt, !0), Je("mouseup", window, pt, !0), x = !1, j(), pe(P) && Me();
    }
    function Ye(P) {
      P.preventDefault(), P.stopPropagation(), b = !0, at("mousemove", window, Ze, !0), at("mouseup", window, mt, !0), T = g.value, W = P.clientY;
    }
    function Ze(P) {
      if (!b) return;
      S !== void 0 && window.clearTimeout(S), y !== void 0 && window.clearTimeout(y);
      const {
        value: N
      } = p, {
        value: te
      } = c, {
        value: se
      } = M;
      if (N === null || te === null) return;
      const be = (P.clientY - W) * (te - N) / (N - se), we = te - N;
      let Ce = T + be;
      Ce = Math.min(we, Ce), Ce = Math.max(Ce, 0);
      const {
        value: Ae
      } = le;
      Ae && (Ae.scrollTop = Ce);
    }
    function mt(P) {
      P.preventDefault(), P.stopPropagation(), Je("mousemove", window, Ze, !0), Je("mouseup", window, mt, !0), b = !1, j(), pe(P) && Me();
    }
    vk(() => {
      const {
        value: P
      } = G, {
        value: N
      } = I, {
        value: te
      } = t, {
        value: se
      } = d, {
        value: ue
      } = s;
      se && (P ? se.classList.remove(`${te}-scrollbar-rail--disabled`) : se.classList.add(`${te}-scrollbar-rail--disabled`)), ue && (N ? ue.classList.remove(`${te}-scrollbar-rail--disabled`) : ue.classList.add(`${te}-scrollbar-rail--disabled`));
    }), pk(() => {
      e.container || j();
    }), hk(() => {
      S !== void 0 && window.clearTimeout(S), y !== void 0 && window.clearTimeout(y), Je("mousemove", window, Ze, !0), Je("mouseup", window, mt, !0);
    });
    const et = Vt(() => {
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
          railInsetVerticalRight: Ae,
          railInsetVerticalLeft: ot,
          railColor: Ne
        }
      } = z.value, {
        top: Pt,
        right: It,
        bottom: At,
        left: Nt
      } = Yt(we), {
        top: Ht,
        right: Qt,
        bottom: jt,
        left: V
      } = Yt(Ce), {
        top: ne,
        right: xe,
        bottom: Ee,
        left: He
      } = Yt(r != null && r.value ? Ec(Ae) : Ae), {
        top: Ve,
        right: rt,
        bottom: ct,
        left: Xt
      } = Yt(r != null && r.value ? Ec(ot) : ot);
      return {
        "--n-scrollbar-bezier": P,
        "--n-scrollbar-color": N,
        "--n-scrollbar-color-hover": te,
        "--n-scrollbar-border-radius": be,
        "--n-scrollbar-width": ue,
        "--n-scrollbar-height": se,
        "--n-scrollbar-rail-top-horizontal-top": Pt,
        "--n-scrollbar-rail-right-horizontal-top": It,
        "--n-scrollbar-rail-bottom-horizontal-top": At,
        "--n-scrollbar-rail-left-horizontal-top": Nt,
        "--n-scrollbar-rail-top-horizontal-bottom": Ht,
        "--n-scrollbar-rail-right-horizontal-bottom": Qt,
        "--n-scrollbar-rail-bottom-horizontal-bottom": jt,
        "--n-scrollbar-rail-left-horizontal-bottom": V,
        "--n-scrollbar-rail-top-vertical-right": ne,
        "--n-scrollbar-rail-right-vertical-right": xe,
        "--n-scrollbar-rail-bottom-vertical-right": Ee,
        "--n-scrollbar-rail-left-vertical-right": He,
        "--n-scrollbar-rail-top-vertical-left": Ve,
        "--n-scrollbar-rail-right-vertical-left": rt,
        "--n-scrollbar-rail-bottom-vertical-left": ct,
        "--n-scrollbar-rail-left-vertical-left": Xt,
        "--n-scrollbar-rail-color": Ne
      };
    }), fe = n ? wt("scrollbar", void 0, et, e) : void 0;
    return Object.assign(Object.assign({}, {
      scrollTo: me,
      scrollBy: ge,
      sync: j,
      syncUnifiedContainer: F,
      handleMouseEnterWrapper: Se,
      handleMouseLeaveWrapper: Be
    }), {
      mergedClsPrefix: t,
      rtlEnabled: r,
      containerScrollTop: g,
      wrapperRef: i,
      containerRef: l,
      contentRef: a,
      yRailRef: s,
      xRailRef: d,
      needYBar: I,
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
      handleContainerResize: ke,
      handleYScrollMouseDown: Ye,
      handleXScrollMouseDown: Te,
      cssVars: n ? void 0 : et,
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
    const d = this.trigger === "none", c = (v, f) => en("div", {
      ref: "yRailRef",
      class: [`${n}-scrollbar-rail`, `${n}-scrollbar-rail--vertical`, `${n}-scrollbar-rail--vertical--${l}`, v],
      "data-scrollbar-rail": !0,
      style: [f || "", this.verticalRailStyle],
      "aria-hidden": !0
    }, en(d ? hs : xu, d ? null : {
      name: "fade-in-transition"
    }, {
      default: () => this.needYBar && this.isShowYBar && !this.isIos ? en("div", {
        class: `${n}-scrollbar-rail__scrollbar`,
        style: {
          height: this.yBarSizePx,
          top: this.yBarTopPx
        },
        onMousedown: this.handleYScrollMouseDown
      }) : null
    })), h = () => {
      var v, f;
      return (v = this.onRender) === null || v === void 0 || v.call(this), en("div", fk(this.$attrs, {
        role: "none",
        ref: "wrapperRef",
        class: [`${n}-scrollbar`, this.themeClass, r && `${n}-scrollbar--rtl`],
        style: this.cssVars,
        onMouseenter: o ? void 0 : this.handleMouseEnterWrapper,
        onMouseleave: o ? void 0 : this.handleMouseLeaveWrapper
      }), [this.container ? (f = t.default) === null || f === void 0 ? void 0 : f.call(t) : en("div", {
        role: "none",
        ref: "containerRef",
        class: [`${n}-scrollbar-container`, this.containerClass],
        style: this.containerStyle,
        onScroll: this.handleScroll,
        onWheel: this.onWheel
      }, en(To, {
        onResize: this.handleContentResize
      }, {
        default: () => en("div", {
          ref: "contentRef",
          role: "none",
          style: [{
            width: this.xScrollable ? "fit-content" : null
          }, this.contentStyle],
          class: [`${n}-scrollbar-content`, this.contentClass]
        }, t)
      })), i ? null : c(void 0, void 0), s && en("div", {
        ref: "xRailRef",
        class: [`${n}-scrollbar-rail`, `${n}-scrollbar-rail--horizontal`, `${n}-scrollbar-rail--horizontal--${a}`],
        style: this.horizontalRailStyle,
        "data-scrollbar-rail": !0,
        "aria-hidden": !0
      }, en(d ? hs : xu, d ? null : {
        name: "fade-in-transition"
      }, {
        default: () => this.needXBar && this.isShowXBar && !this.isIos ? en("div", {
          class: `${n}-scrollbar-rail__scrollbar`,
          style: {
            width: this.xBarSizePx,
            right: r ? this.xBarLeftPx : void 0,
            left: r ? void 0 : this.xBarLeftPx
          },
          onMousedown: this.handleXScrollMouseDown
        }) : null
      }))]);
    }, p = this.container ? h() : en(To, {
      onResize: this.handleContainerResize
    }, {
      default: h
    });
    return i ? en(uk, null, p, c(this.themeClass, this.cssVars)) : p;
  }
}), jp = si;
function Cu(e) {
  return Array.isArray(e) ? e : [e];
}
const $s = {
  STOP: "STOP"
};
function Wp(e, t) {
  const n = t(e);
  e.children !== void 0 && n !== $s.STOP && e.children.forEach((o) => Wp(o, t));
}
function gk(e, t = {}) {
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
function bk(e, t) {
  const { isLeaf: n } = e;
  return n !== void 0 ? n : !t(e);
}
function wk(e) {
  return e.children;
}
function yk(e) {
  return e.key;
}
function xk() {
  return !1;
}
function Ck(e, t) {
  const { isLeaf: n } = e;
  return !(n === !1 && !Array.isArray(t(e)));
}
function Sk(e) {
  return e.disabled === !0;
}
function $k(e, t) {
  return e.isLeaf === !1 && !Array.isArray(t(e));
}
function bl(e) {
  var t;
  return e == null ? [] : Array.isArray(e) ? e : (t = e.checkedKeys) !== null && t !== void 0 ? t : [];
}
function wl(e) {
  var t;
  return e == null || Array.isArray(e) ? [] : (t = e.indeterminateKeys) !== null && t !== void 0 ? t : [];
}
function Rk(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) || n.add(o);
  }), Array.from(n);
}
function kk(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) && n.delete(o);
  }), Array.from(n);
}
function Pk(e) {
  return (e == null ? void 0 : e.type) === "group";
}
function _k(e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((n, o) => {
    t.set(n.key, o);
  }), (n) => {
    var o;
    return (o = t.get(n)) !== null && o !== void 0 ? o : null;
  };
}
class Tk extends Error {
  constructor() {
    super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
  }
}
function Fk(e, t, n, o) {
  return ya(t.concat(e), n, o, !1);
}
function Ek(e, t) {
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
function Ok(e, t, n, o) {
  const r = ya(t, n, o, !1), i = ya(e, n, o, !0), l = Ek(e, n), a = [];
  return r.forEach((s) => {
    (i.has(s) || l.has(s)) && a.push(s);
  }), a.forEach((s) => r.delete(s)), r;
}
function yl(e, t) {
  const { checkedKeys: n, keysToCheck: o, keysToUncheck: r, indeterminateKeys: i, cascade: l, leafOnly: a, checkStrategy: s, allowNotLoaded: d } = e;
  if (!l)
    return o !== void 0 ? {
      checkedKeys: Rk(n, o),
      indeterminateKeys: Array.from(i)
    } : r !== void 0 ? {
      checkedKeys: kk(n, r),
      indeterminateKeys: Array.from(i)
    } : {
      checkedKeys: Array.from(n),
      indeterminateKeys: Array.from(i)
    };
  const { levelTreeNodeMap: c } = t;
  let h;
  r !== void 0 ? h = Ok(r, n, t, d) : o !== void 0 ? h = Fk(o, n, t, d) : h = ya(n, t, d, !1);
  const p = s === "parent", v = s === "child" || a, f = h, m = /* @__PURE__ */ new Set(), g = Math.max.apply(null, Array.from(c.keys()));
  for (let u = g; u >= 0; u -= 1) {
    const w = u === 0, C = c.get(u);
    for (const b of C) {
      if (b.isLeaf)
        continue;
      const { key: x, shallowLoaded: S } = b;
      if (v && S && b.children.forEach((E) => {
        !E.disabled && !E.isLeaf && E.shallowLoaded && f.has(E.key) && f.delete(E.key);
      }), b.disabled || !S)
        continue;
      let y = !0, T = !1, R = !0;
      for (const E of b.children) {
        const W = E.key;
        if (!E.disabled) {
          if (R && (R = !1), f.has(W))
            T = !0;
          else if (m.has(W)) {
            T = !0, y = !1;
            break;
          } else if (y = !1, T)
            break;
        }
      }
      y && !R ? (p && b.children.forEach((E) => {
        !E.disabled && f.has(E.key) && f.delete(E.key);
      }), f.add(x)) : T && m.add(x), w && v && f.has(x) && f.delete(x);
    }
  }
  return {
    checkedKeys: Array.from(f),
    indeterminateKeys: Array.from(m)
  };
}
function ya(e, t, n, o) {
  const { treeNodeMap: r, getChildren: i } = t, l = /* @__PURE__ */ new Set(), a = new Set(e);
  return e.forEach((s) => {
    const d = r.get(s);
    d !== void 0 && Wp(d, (c) => {
      if (c.disabled)
        return $s.STOP;
      const { key: h } = c;
      if (!l.has(h) && (l.add(h), a.add(h), $k(c.rawNode, i))) {
        if (o)
          return $s.STOP;
        if (!n)
          throw new Tk();
      }
    });
  }), a;
}
function zk(e, { includeGroup: t = !1, includeSelf: n = !0 }, o) {
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
function Mk(e) {
  if (e.length === 0)
    return null;
  const t = e[0];
  return t.isGroup || t.ignored || t.disabled ? t.getNext() : t;
}
function Ik(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r + 1) % o] : r === n.length - 1 ? null : n[r + 1];
}
function Su(e, t, { loop: n = !1, includeDisabled: o = !1 } = {}) {
  const r = t === "prev" ? Ak : Ik, i = {
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
        const c = hd(d, i);
        c !== null ? a = c : s(r(d, n));
      } else {
        const c = r(d, !1);
        if (c !== null)
          s(c);
        else {
          const h = Vk(d);
          h != null && h.isGroup ? s(r(h, n)) : n && s(r(d, !0));
        }
      }
    }
  }
  return s(e), a;
}
function Ak(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r - 1 + o) % o] : r === 0 ? null : n[r - 1];
}
function Vk(e) {
  return e.parent;
}
function hd(e, t = {}) {
  const { reverse: n = !1 } = t, { children: o } = e;
  if (o) {
    const { length: r } = o, i = n ? r - 1 : 0, l = n ? -1 : r, a = n ? -1 : 1;
    for (let s = i; s !== l; s += a) {
      const d = o[s];
      if (!d.disabled && !d.ignored)
        if (d.isGroup) {
          const c = hd(d, t);
          if (c !== null)
            return c;
        } else
          return d;
    }
  }
  return null;
}
const Bk = {
  getChild() {
    return this.ignored ? null : hd(this);
  },
  getParent() {
    const { parent: e } = this;
    return e != null && e.isGroup ? e.getParent() : e;
  },
  getNext(e = {}) {
    return Su(this, "next", e);
  },
  getPrev(e = {}) {
    return Su(this, "prev", e);
  }
};
function Lk(e, t) {
  const n = t ? new Set(t) : void 0, o = [];
  function r(i) {
    i.forEach((l) => {
      o.push(l), !(l.isLeaf || !l.children || l.ignored) && (l.isGroup || // normal non-leaf node
      n === void 0 || n.has(l.key)) && r(l.children);
    });
  }
  return r(e), o;
}
function Dk(e, t) {
  const n = e.key;
  for (; t; ) {
    if (t.key === n)
      return !0;
    t = t.parent;
  }
  return !1;
}
function Up(e, t, n, o, r, i = null, l = 0) {
  const a = [];
  return e.forEach((s, d) => {
    var c;
    const h = Object.create(o);
    if (h.rawNode = s, h.siblings = a, h.level = l, h.index = d, h.isFirstChild = d === 0, h.isLastChild = d + 1 === e.length, h.parent = i, !h.ignored) {
      const p = r(s);
      Array.isArray(p) && (h.children = Up(p, t, n, o, r, h, l + 1));
    }
    a.push(h), t.set(h.key, h), n.has(l) || n.set(l, []), (c = n.get(l)) === null || c === void 0 || c.push(h);
  }), a;
}
function Oa(e, t = {}) {
  var n;
  const o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), { getDisabled: i = Sk, getIgnored: l = xk, getIsGroup: a = Pk, getKey: s = yk } = t, d = (n = t.getChildren) !== null && n !== void 0 ? n : wk, c = t.ignoreEmptyChildren ? (b) => {
    const x = d(b);
    return Array.isArray(x) ? x.length ? x : null : x;
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
      return bk(this.rawNode, c);
    },
    get shallowLoaded() {
      return Ck(this.rawNode, c);
    },
    get ignored() {
      return l(this.rawNode);
    },
    contains(b) {
      return Dk(this, b);
    }
  }, Bk), p = Up(e, o, r, h, c);
  function v(b) {
    if (b == null)
      return null;
    const x = o.get(b);
    return x && !x.isGroup && !x.ignored ? x : null;
  }
  function f(b) {
    if (b == null)
      return null;
    const x = o.get(b);
    return x && !x.ignored ? x : null;
  }
  function m(b, x) {
    const S = f(b);
    return S ? S.getPrev(x) : null;
  }
  function g(b, x) {
    const S = f(b);
    return S ? S.getNext(x) : null;
  }
  function u(b) {
    const x = f(b);
    return x ? x.getParent() : null;
  }
  function w(b) {
    const x = f(b);
    return x ? x.getChild() : null;
  }
  const C = {
    treeNodes: p,
    treeNodeMap: o,
    levelTreeNodeMap: r,
    maxLevel: Math.max(...r.keys()),
    getChildren: c,
    getFlattenedNodes(b) {
      return Lk(p, b);
    },
    getNode: v,
    getPrev: m,
    getNext: g,
    getParent: u,
    getChild: w,
    getFirstAvailableNode() {
      return Mk(p);
    },
    getPath(b, x = {}) {
      return zk(b, x, C);
    },
    getCheckedKeys(b, x = {}) {
      const { cascade: S = !0, leafOnly: y = !1, checkStrategy: T = "all", allowNotLoaded: R = !1 } = x;
      return yl({
        checkedKeys: bl(b),
        indeterminateKeys: wl(b),
        cascade: S,
        leafOnly: y,
        checkStrategy: T,
        allowNotLoaded: R
      }, C);
    },
    check(b, x, S = {}) {
      const { cascade: y = !0, leafOnly: T = !1, checkStrategy: R = "all", allowNotLoaded: E = !1 } = S;
      return yl({
        checkedKeys: bl(x),
        indeterminateKeys: wl(x),
        keysToCheck: b == null ? [] : Cu(b),
        cascade: y,
        leafOnly: T,
        checkStrategy: R,
        allowNotLoaded: E
      }, C);
    },
    uncheck(b, x, S = {}) {
      const { cascade: y = !0, leafOnly: T = !1, checkStrategy: R = "all", allowNotLoaded: E = !1 } = S;
      return yl({
        checkedKeys: bl(x),
        indeterminateKeys: wl(x),
        keysToUncheck: b == null ? [] : Cu(b),
        cascade: y,
        leafOnly: T,
        checkStrategy: R,
        allowNotLoaded: E
      }, C);
    },
    getNonLeafKeys(b = {}) {
      return gk(p, b);
    }
  };
  return C;
}
const Nk = {
  iconSizeTiny: "28px",
  iconSizeSmall: "34px",
  iconSizeMedium: "40px",
  iconSizeLarge: "46px",
  iconSizeHuge: "52px"
};
function Hk(e) {
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
  return Object.assign(Object.assign({}, Nk), {
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
const pd = {
  name: "Empty",
  common: vt,
  self: Hk
}, jk = A("empty", `
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
 `)]), kr = window.Vue.computed, Wk = window.Vue.defineComponent, Wo = window.Vue.h, Uk = Object.assign(Object.assign({}, _e.props), {
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
}), Kp = Wk({
  name: "Empty",
  props: Uk,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n,
      mergedComponentPropsRef: o
    } = qe(e), r = _e("Empty", "-empty", jk, pd, e, t), {
      localeRef: i
    } = sr("Empty"), l = kr(() => {
      var c, h, p;
      return (c = e.description) !== null && c !== void 0 ? c : (p = (h = o == null ? void 0 : o.value) === null || h === void 0 ? void 0 : h.Empty) === null || p === void 0 ? void 0 : p.description;
    }), a = kr(() => {
      var c, h;
      return ((h = (c = o == null ? void 0 : o.value) === null || c === void 0 ? void 0 : c.Empty) === null || h === void 0 ? void 0 : h.renderIcon) || (() => Wo(kR, null));
    }), s = kr(() => {
      const {
        size: c
      } = e, {
        common: {
          cubicBezierEaseInOut: h
        },
        self: {
          [re("iconSize", c)]: p,
          [re("fontSize", c)]: v,
          textColor: f,
          iconColor: m,
          extraTextColor: g
        }
      } = r.value;
      return {
        "--n-icon-size": p,
        "--n-font-size": v,
        "--n-bezier": h,
        "--n-text-color": f,
        "--n-icon-color": m,
        "--n-extra-text-color": g
      };
    }), d = n ? wt("empty", kr(() => {
      let c = "";
      const {
        size: h
      } = e;
      return c += h[0], c;
    }), s, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedRenderIcon: a,
      localizedDescription: kr(() => l.value || i.value.description),
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
    return n == null || n(), Wo("div", {
      class: [`${t}-empty`, this.themeClass],
      style: this.cssVars
    }, this.showIcon ? Wo("div", {
      class: `${t}-empty__icon`
    }, e.icon ? e.icon() : Wo(Ct, {
      clsPrefix: t
    }, {
      default: this.mergedRenderIcon
    })) : null, this.showDescription ? Wo("div", {
      class: `${t}-empty__description`
    }, e.default ? e.default() : this.localizedDescription) : null, e.extra ? Wo("div", {
      class: `${t}-empty__extra`
    }, e.extra()) : null);
  }
}), Kk = {
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
function qk(e) {
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
    fontSizeMedium: v,
    fontSizeLarge: f,
    fontSizeHuge: m,
    heightTiny: g,
    heightSmall: u,
    heightMedium: w,
    heightLarge: C,
    heightHuge: b
  } = e;
  return Object.assign(Object.assign({}, Kk), {
    optionFontSizeTiny: h,
    optionFontSizeSmall: p,
    optionFontSizeMedium: v,
    optionFontSizeLarge: f,
    optionFontSizeHuge: m,
    optionHeightTiny: g,
    optionHeightSmall: u,
    optionHeightMedium: w,
    optionHeightLarge: C,
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
const vd = {
  name: "InternalSelectMenu",
  common: vt,
  peers: {
    Scrollbar: li,
    Empty: pd
  },
  self: qk
}, Gk = window.Vue.defineComponent, Xk = window.Vue.h, Yk = window.Vue.inject, $u = Gk({
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
    } = Yk(Us);
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
    } = this, i = o == null ? void 0 : o(r), l = t ? t(r, !1) : $n(r[this.labelField], r, !1), a = Xk("div", Object.assign({}, i, {
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
}), Zk = window.Vue.defineComponent, Hr = window.Vue.h, Jk = window.Vue.inject, Qk = window.Vue.Transition;
function eP(e, t) {
  return Hr(Qk, {
    name: "fade-in-scale-up-transition"
  }, {
    default: () => e ? Hr(Ct, {
      clsPrefix: t,
      class: `${t}-base-select-option__check`
    }, {
      default: () => Hr(yR)
    }) : null
  });
}
const Ru = Zk({
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
    } = Jk(Us), v = Oe(() => {
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
    function m(u) {
      const {
        tmNode: w
      } = e;
      w.disabled || p(u, w);
    }
    function g(u) {
      const {
        tmNode: w
      } = e, {
        value: C
      } = v;
      w.disabled || C || p(u, w);
    }
    return {
      multiple: o,
      isGrouped: Oe(() => {
        const {
          tmNode: u
        } = e, {
          parent: w
        } = u;
        return w && w.rawNode.type === "group";
      }),
      showCheckmark: d,
      nodeProps: c,
      isPending: v,
      isSelected: Oe(() => {
        const {
          value: u
        } = t, {
          value: w
        } = o;
        if (u === null) return !1;
        const C = e.tmNode.rawNode[s.value];
        if (w) {
          const {
            value: b
          } = r;
          return b.has(C);
        } else
          return u === C;
      }),
      labelField: a,
      renderLabel: i,
      renderOption: l,
      handleMouseMove: g,
      handleMouseEnter: m,
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
    } = this, p = eP(n, e), v = s ? [s(t, n), i && p] : [$n(t[this.labelField], t, n), i && p], f = l == null ? void 0 : l(t), m = Hr("div", Object.assign({}, f, {
      class: [`${e}-base-select-option`, t.class, f == null ? void 0 : f.class, {
        [`${e}-base-select-option--disabled`]: t.disabled,
        [`${e}-base-select-option--selected`]: n,
        [`${e}-base-select-option--grouped`]: r,
        [`${e}-base-select-option--pending`]: o,
        [`${e}-base-select-option--show-checkmark`]: i
      }],
      style: [(f == null ? void 0 : f.style) || "", t.style || ""],
      onClick: Dr([d, f == null ? void 0 : f.onClick]),
      onMouseenter: Dr([c, f == null ? void 0 : f.onMouseenter]),
      onMousemove: Dr([h, f == null ? void 0 : f.onMousemove])
    }), Hr("div", {
      class: `${e}-base-select-option__content`
    }, v));
    return t.render ? t.render({
      node: m,
      option: t,
      selected: n
    }) : a ? a({
      node: m,
      option: t,
      selected: n
    }) : m;
  }
}), {
  cubicBezierEaseIn: ku,
  cubicBezierEaseOut: Pu
} = Ao;
function za({
  transformOrigin: e = "inherit",
  duration: t = ".2s",
  enterScale: n = ".9",
  originalTransform: o = "",
  originalTransition: r = ""
} = {}) {
  return [H("&.fade-in-scale-up-transition-leave-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${ku}, transform ${t} ${ku} ${r && `,${r}`}`
  }), H("&.fade-in-scale-up-transition-enter-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${Pu}, transform ${t} ${Pu} ${r && `,${r}`}`
  }), H("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
    opacity: 0,
    transform: `${o} scale(${n})`
  }), H("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
    opacity: 1,
    transform: `${o} scale(1)`
  })];
}
const tP = A("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [A("scrollbar", `
 max-height: var(--n-height);
 `), A("virtual-list", `
 max-height: var(--n-height);
 `), A("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [B("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), A("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), A("base-select-menu-option-wrapper", `
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
 `), A("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), A("base-select-option", `
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `, [K("show-checkmark", `
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
 `), K("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), K("pending", [H("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), K("selected", `
 color: var(--n-option-text-color-active);
 `, [H("&::before", `
 background-color: var(--n-option-color-active);
 `), K("pending", [H("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), K("disabled", `
 cursor: not-allowed;
 `, [Qe("selected", `
 color: var(--n-option-text-color-disabled);
 `), K("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), B("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [za({
  enterScale: "0.5"
})])])]), Xn = window.Vue.computed, nP = window.Vue.defineComponent, Lt = window.Vue.h, oP = window.Vue.nextTick, rP = window.Vue.onBeforeUnmount, iP = window.Vue.onMounted, _u = window.Vue.provide, zi = window.Vue.ref, In = window.Vue.toRef, Tu = window.Vue.watch, qp = nP({
  name: "InternalSelectMenu",
  props: Object.assign(Object.assign({}, _e.props), {
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
    } = qe(e), o = Mt("InternalSelectMenu", n, t), r = _e("InternalSelectMenu", "-internal-select-menu", tP, vd, e, In(e, "clsPrefix")), i = zi(null), l = zi(null), a = zi(null), s = Xn(() => e.treeMate.getFlattenedNodes()), d = Xn(() => _k(s.value)), c = zi(null);
    function h() {
      const {
        treeMate: I
      } = e;
      let G = null;
      const {
        value: Z
      } = e;
      Z === null ? G = I.getFirstAvailableNode() : (e.multiple ? G = I.getNode((Z || [])[(Z || []).length - 1]) : G = I.getNode(Z), (!G || G.disabled) && (G = I.getFirstAvailableNode())), M(G || null);
    }
    function p() {
      const {
        value: I
      } = c;
      I && !e.treeMate.getNode(I.key) && (c.value = null);
    }
    let v;
    Tu(() => e.show, (I) => {
      I ? v = Tu(() => e.treeMate, () => {
        e.resetMenuOnOptionsChange ? (e.autoPending ? h() : p(), oP(O)) : p();
      }, {
        immediate: !0
      }) : v == null || v();
    }, {
      immediate: !0
    }), rP(() => {
      v == null || v();
    });
    const f = Xn(() => xt(r.value.self[re("optionHeight", e.size)])), m = Xn(() => Yt(r.value.self[re("padding", e.size)])), g = Xn(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), u = Xn(() => {
      const I = s.value;
      return I && I.length === 0;
    });
    function w(I) {
      const {
        onToggle: G
      } = e;
      G && G(I);
    }
    function C(I) {
      const {
        onScroll: G
      } = e;
      G && G(I);
    }
    function b(I) {
      var G;
      (G = a.value) === null || G === void 0 || G.sync(), C(I);
    }
    function x() {
      var I;
      (I = a.value) === null || I === void 0 || I.sync();
    }
    function S() {
      const {
        value: I
      } = c;
      return I || null;
    }
    function y(I, G) {
      G.disabled || M(G, !1);
    }
    function T(I, G) {
      G.disabled || w(G);
    }
    function R(I) {
      var G;
      an(I, "action") || (G = e.onKeyup) === null || G === void 0 || G.call(e, I);
    }
    function E(I) {
      var G;
      an(I, "action") || (G = e.onKeydown) === null || G === void 0 || G.call(e, I);
    }
    function W(I) {
      var G;
      (G = e.onMousedown) === null || G === void 0 || G.call(e, I), !e.focusable && I.preventDefault();
    }
    function _() {
      const {
        value: I
      } = c;
      I && M(I.getNext({
        loop: !0
      }), !0);
    }
    function z() {
      const {
        value: I
      } = c;
      I && M(I.getPrev({
        loop: !0
      }), !0);
    }
    function M(I, G = !1) {
      c.value = I, G && O();
    }
    function O() {
      var I, G;
      const Z = c.value;
      if (!Z) return;
      const ae = d.value(Z.key);
      ae !== null && (e.virtualScroll ? (I = l.value) === null || I === void 0 || I.scrollTo({
        index: ae
      }) : (G = a.value) === null || G === void 0 || G.scrollTo({
        index: ae,
        elSize: f.value
      }));
    }
    function U(I) {
      var G, Z;
      !((G = i.value) === null || G === void 0) && G.contains(I.target) && ((Z = e.onFocus) === null || Z === void 0 || Z.call(e, I));
    }
    function L(I) {
      var G, Z;
      !((G = i.value) === null || G === void 0) && G.contains(I.relatedTarget) || (Z = e.onBlur) === null || Z === void 0 || Z.call(e, I);
    }
    _u(Us, {
      handleOptionMouseEnter: y,
      handleOptionClick: T,
      valueSetRef: g,
      pendingTmNodeRef: c,
      nodePropsRef: In(e, "nodeProps"),
      showCheckmarkRef: In(e, "showCheckmark"),
      multipleRef: In(e, "multiple"),
      valueRef: In(e, "value"),
      renderLabelRef: In(e, "renderLabel"),
      renderOptionRef: In(e, "renderOption"),
      labelFieldRef: In(e, "labelField"),
      valueFieldRef: In(e, "valueField")
    }), _u(Lh, i), iP(() => {
      const {
        value: I
      } = a;
      I && I.sync();
    });
    const Y = Xn(() => {
      const {
        size: I
      } = e, {
        common: {
          cubicBezierEaseInOut: G
        },
        self: {
          height: Z,
          borderRadius: ae,
          color: le,
          groupHeaderTextColor: de,
          actionDividerColor: me,
          optionTextColorPressed: X,
          optionTextColor: ce,
          optionTextColorDisabled: ke,
          optionTextColorActive: ge,
          optionOpacityDisabled: $e,
          optionCheckColor: Se,
          actionTextColor: Be,
          optionColorPending: Me,
          optionColorActive: oe,
          loadingColor: k,
          loadingSize: $,
          optionColorActivePending: D,
          [re("optionFontSize", I)]: ee,
          [re("optionHeight", I)]: ve,
          [re("optionPadding", I)]: he
        }
      } = r.value;
      return {
        "--n-height": Z,
        "--n-action-divider-color": me,
        "--n-action-text-color": Be,
        "--n-bezier": G,
        "--n-border-radius": ae,
        "--n-color": le,
        "--n-option-font-size": ee,
        "--n-group-header-text-color": de,
        "--n-option-check-color": Se,
        "--n-option-color-pending": Me,
        "--n-option-color-active": oe,
        "--n-option-color-active-pending": D,
        "--n-option-height": ve,
        "--n-option-opacity-disabled": $e,
        "--n-option-text-color": ce,
        "--n-option-text-color-active": ge,
        "--n-option-text-color-disabled": ke,
        "--n-option-text-color-pressed": X,
        "--n-option-padding": he,
        "--n-option-padding-left": Yt(he, "left"),
        "--n-option-padding-right": Yt(he, "right"),
        "--n-loading-color": k,
        "--n-loading-size": $
      };
    }), {
      inlineThemeDisabled: Q
    } = e, J = Q ? wt("internal-select-menu", Xn(() => e.size[0]), Y, e) : void 0, q = {
      selfRef: i,
      next: _,
      prev: z,
      getPendingTmNode: S
    };
    return np(i, e.onResize), Object.assign({
      mergedTheme: r,
      mergedClsPrefix: t,
      rtlEnabled: o,
      virtualListRef: l,
      scrollbarRef: a,
      itemSize: f,
      padding: m,
      flattenedNodes: s,
      empty: u,
      virtualListContainer() {
        const {
          value: I
        } = l;
        return I == null ? void 0 : I.listElRef;
      },
      virtualListContent() {
        const {
          value: I
        } = l;
        return I == null ? void 0 : I.itemsElRef;
      },
      doScroll: C,
      handleFocusin: U,
      handleFocusout: L,
      handleKeyUp: R,
      handleKeyDown: E,
      handleMouseDown: W,
      handleVirtualListResize: x,
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
    return i == null || i(), Lt("div", {
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
    }, We(e.header, (l) => l && Lt("div", {
      class: `${n}-base-select-menu__header`,
      "data-header": !0,
      key: "header"
    }, l)), this.loading ? Lt("div", {
      class: `${n}-base-select-menu__loading`
    }, Lt(cr, {
      clsPrefix: n,
      strokeWidth: 20
    })) : this.empty ? Lt("div", {
      class: `${n}-base-select-menu__empty`,
      "data-empty": !0
    }, vn(e.empty, () => [Lt(Kp, {
      theme: o.peers.Empty,
      themeOverrides: o.peerOverrides.Empty,
      size: this.size
    })])) : Lt(si, {
      ref: "scrollbarRef",
      theme: o.peers.Scrollbar,
      themeOverrides: o.peerOverrides.Scrollbar,
      scrollable: this.scrollable,
      container: t ? this.virtualListContainer : void 0,
      content: t ? this.virtualListContent : void 0,
      onScroll: t ? void 0 : this.doScroll
    }, {
      default: () => t ? Lt(Qs, {
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
        }) => l.isGroup ? Lt($u, {
          key: l.key,
          clsPrefix: n,
          tmNode: l
        }) : l.ignored ? null : Lt(Ru, {
          clsPrefix: n,
          key: l.key,
          tmNode: l
        })
      }) : Lt("div", {
        class: `${n}-base-select-menu-option-wrapper`,
        style: {
          paddingTop: this.padding.top,
          paddingBottom: this.padding.bottom
        }
      }, this.flattenedNodes.map((l) => l.isGroup ? Lt($u, {
        key: l.key,
        clsPrefix: n,
        tmNode: l
      }) : Lt(Ru, {
        clsPrefix: n,
        key: l.key,
        tmNode: l
      })))
    }), We(e.action, (l) => l && [Lt("div", {
      class: `${n}-base-select-menu__action`,
      "data-action": !0,
      key: "action"
    }, l), Lt(QR, {
      onFocus: this.onTabOut,
      key: "focus-detector"
    })]));
  }
}), aP = {
  space: "6px",
  spaceArrow: "10px",
  arrowOffset: "10px",
  arrowOffsetVertical: "10px",
  arrowHeight: "6px",
  padding: "8px 14px"
};
function lP(e) {
  const {
    boxShadow2: t,
    popoverColor: n,
    textColor2: o,
    borderRadius: r,
    fontSize: i,
    dividerColor: l
  } = e;
  return Object.assign(Object.assign({}, aP), {
    fontSize: i,
    borderRadius: r,
    color: n,
    dividerColor: l,
    textColor: o,
    boxShadow: t
  });
}
const ur = {
  name: "Popover",
  common: vt,
  peers: {
    Scrollbar: li
  },
  self: lP
}, xl = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, yt = "var(--n-arrow-height) * 1.414", sP = H([A("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [H(">", [A("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), Qe("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [Qe("scrollable", [Qe("show-header-or-footer", "padding: var(--n-padding);")])]), B("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), B("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), K("scrollable, show-header-or-footer", [B("content", `
 padding: var(--n-padding);
 `)])]), A("popover-shared", `
 transform-origin: inherit;
 `, [
  A("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [A("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${yt});
 height: calc(${yt});
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
]), tn("top-start", `
 top: calc(${yt} / -2);
 left: calc(${An("top-start")} - var(--v-offset-left));
 `), tn("top", `
 top: calc(${yt} / -2);
 transform: translateX(calc(${yt} / -2)) rotate(45deg);
 left: 50%;
 `), tn("top-end", `
 top: calc(${yt} / -2);
 right: calc(${An("top-end")} + var(--v-offset-left));
 `), tn("bottom-start", `
 bottom: calc(${yt} / -2);
 left: calc(${An("bottom-start")} - var(--v-offset-left));
 `), tn("bottom", `
 bottom: calc(${yt} / -2);
 transform: translateX(calc(${yt} / -2)) rotate(45deg);
 left: 50%;
 `), tn("bottom-end", `
 bottom: calc(${yt} / -2);
 right: calc(${An("bottom-end")} + var(--v-offset-left));
 `), tn("left-start", `
 left: calc(${yt} / -2);
 top: calc(${An("left-start")} - var(--v-offset-top));
 `), tn("left", `
 left: calc(${yt} / -2);
 transform: translateY(calc(${yt} / -2)) rotate(45deg);
 top: 50%;
 `), tn("left-end", `
 left: calc(${yt} / -2);
 bottom: calc(${An("left-end")} + var(--v-offset-top));
 `), tn("right-start", `
 right: calc(${yt} / -2);
 top: calc(${An("right-start")} - var(--v-offset-top));
 `), tn("right", `
 right: calc(${yt} / -2);
 transform: translateY(calc(${yt} / -2)) rotate(45deg);
 top: 50%;
 `), tn("right-end", `
 right: calc(${yt} / -2);
 bottom: calc(${An("right-end")} + var(--v-offset-top));
 `), ...U$({
  top: ["right-start", "left-start"],
  right: ["top-end", "bottom-end"],
  bottom: ["right-end", "left-end"],
  left: ["top-start", "bottom-start"]
}, (e, t) => {
  const n = ["right", "left"].includes(t), o = n ? "width" : "height";
  return e.map((r) => {
    const i = r.split("-")[1] === "end", a = `calc((${`var(--v-target-${o}, 0px)`} - ${yt}) / 2)`, s = An(r);
    return H(`[v-placement="${r}"] >`, [A("popover-shared", [K("center-arrow", [A("popover-arrow", `${t}: calc(max(${a}, ${s}) ${i ? "+" : "-"} var(--v-offset-${n ? "left" : "top"}));`)])])]);
  });
})]);
function An(e) {
  return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function tn(e, t) {
  const n = e.split("-")[0], o = ["top", "bottom"].includes(n) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return H(`[v-placement="${e}"] >`, [A("popover-shared", `
 margin-${xl[n]}: var(--n-space);
 `, [K("show-arrow", `
 margin-${xl[n]}: var(--n-space-arrow);
 `), K("overlap", `
 margin: 0;
 `), Cb("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${n}: 100%;
 ${xl[n]}: auto;
 ${o}
 `, [A("popover-arrow", t)])])]);
}
const Cl = window.Vue.computed, dP = window.Vue.defineComponent, cP = window.Vue.Fragment, nn = window.Vue.h, uP = window.Vue.inject, fP = window.Vue.mergeProps, hP = window.Vue.onBeforeUnmount, Sl = window.Vue.provide, Mi = window.Vue.ref, pP = window.Vue.toRef, vP = window.Vue.Transition, mP = window.Vue.vShow, gP = window.Vue.watch, bP = window.Vue.watchEffect, wP = window.Vue.withDirectives, Gp = Object.assign(Object.assign({}, _e.props), {
  to: Pn.propTo,
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
function Xp({
  arrowClass: e,
  arrowStyle: t,
  arrowWrapperClass: n,
  arrowWrapperStyle: o,
  clsPrefix: r
}) {
  return nn("div", {
    key: "__popover-arrow__",
    style: o,
    class: [`${r}-popover-arrow-wrapper`, n]
  }, nn("div", {
    class: [`${r}-popover-arrow`, e],
    style: t
  }));
}
const yP = dP({
  name: "PopoverBody",
  inheritAttrs: !1,
  props: Gp,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    const {
      namespaceRef: o,
      mergedClsPrefixRef: r,
      inlineThemeDisabled: i,
      mergedRtlRef: l
    } = qe(e), a = _e("Popover", "-popover", sP, ur, e, r), s = Mt("Popover", l, r), d = Mi(null), c = uP("NPopover"), h = Mi(null), p = Mi(e.show), v = Mi(!1);
    bP(() => {
      const {
        show: R
      } = e;
      R && !$y() && !e.internalDeactivateImmediately && (v.value = !0);
    });
    const f = Cl(() => {
      const {
        trigger: R,
        onClickoutside: E
      } = e, W = [], {
        positionManuallyRef: {
          value: _
        }
      } = c;
      return _ || (R === "click" && !E && W.push([ha, S, void 0, {
        capture: !0
      }]), R === "hover" && W.push([Xw, x])), E && W.push([ha, S, void 0, {
        capture: !0
      }]), (e.displayDirective === "show" || e.animated && v.value) && W.push([mP, e.show]), W;
    }), m = Cl(() => {
      const {
        common: {
          cubicBezierEaseInOut: R,
          cubicBezierEaseIn: E,
          cubicBezierEaseOut: W
        },
        self: {
          space: _,
          spaceArrow: z,
          padding: M,
          fontSize: O,
          textColor: U,
          dividerColor: L,
          color: Y,
          boxShadow: Q,
          borderRadius: J,
          arrowHeight: q,
          arrowOffset: I,
          arrowOffsetVertical: G
        }
      } = a.value;
      return {
        "--n-box-shadow": Q,
        "--n-bezier": R,
        "--n-bezier-ease-in": E,
        "--n-bezier-ease-out": W,
        "--n-font-size": O,
        "--n-text-color": U,
        "--n-color": Y,
        "--n-divider-color": L,
        "--n-border-radius": J,
        "--n-arrow-height": q,
        "--n-arrow-offset": I,
        "--n-arrow-offset-vertical": G,
        "--n-padding": M,
        "--n-space": _,
        "--n-space-arrow": z
      };
    }), g = Cl(() => {
      const R = e.width === "trigger" ? void 0 : St(e.width), E = [];
      R && E.push({
        width: R
      });
      const {
        maxWidth: W,
        minWidth: _
      } = e;
      return W && E.push({
        maxWidth: St(W)
      }), _ && E.push({
        maxWidth: St(_)
      }), i || E.push(m.value), E;
    }), u = i ? wt("popover", void 0, m, e) : void 0;
    c.setBodyInstance({
      syncPosition: w
    }), hP(() => {
      c.setBodyInstance(null);
    }), gP(pP(e, "show"), (R) => {
      e.animated || (R ? p.value = !0 : p.value = !1);
    });
    function w() {
      var R;
      (R = d.value) === null || R === void 0 || R.syncPosition();
    }
    function C(R) {
      e.trigger === "hover" && e.keepAliveOnHover && e.show && c.handleMouseEnter(R);
    }
    function b(R) {
      e.trigger === "hover" && e.keepAliveOnHover && c.handleMouseLeave(R);
    }
    function x(R) {
      e.trigger === "hover" && !y().contains(Yr(R)) && c.handleMouseMoveOutside(R);
    }
    function S(R) {
      (e.trigger === "click" && !y().contains(Yr(R)) || e.onClickoutside) && c.handleClickOutside(R);
    }
    function y() {
      return c.getTriggerElement();
    }
    Sl(_a, h), Sl(Ks, null), Sl(qs, null);
    function T() {
      if (u == null || u.onRender(), !(e.displayDirective === "show" || e.show || e.animated && v.value))
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
          g.value,
          C,
          b
        );
      else {
        const {
          value: z
        } = c.extraClassRef, {
          internalTrapFocus: M
        } = e, O = !Qo(t.header) || !Qo(t.footer), U = () => {
          var L, Y;
          const Q = O ? nn(cP, null, We(t.header, (I) => I ? nn("div", {
            class: [`${_}-popover__header`, e.headerClass],
            style: e.headerStyle
          }, I) : null), We(t.default, (I) => I ? nn("div", {
            class: [`${_}-popover__content`, e.contentClass],
            style: e.contentStyle
          }, t) : null), We(t.footer, (I) => I ? nn("div", {
            class: [`${_}-popover__footer`, e.footerClass],
            style: e.footerStyle
          }, I) : null)) : e.scrollable ? (L = t.default) === null || L === void 0 ? void 0 : L.call(t) : nn("div", {
            class: [`${_}-popover__content`, e.contentClass],
            style: e.contentStyle
          }, t), J = e.scrollable ? nn(jp, {
            themeOverrides: a.value.peerOverrides.Scrollbar,
            theme: a.value.peers.Scrollbar,
            contentClass: O ? void 0 : `${_}-popover__content ${(Y = e.contentClass) !== null && Y !== void 0 ? Y : ""}`,
            contentStyle: O ? void 0 : e.contentStyle
          }, {
            default: () => Q
          }) : Q, q = e.showArrow ? Xp({
            arrowClass: e.arrowClass,
            arrowStyle: e.arrowStyle,
            arrowWrapperClass: e.arrowWrapperClass,
            arrowWrapperStyle: e.arrowWrapperStyle,
            clsPrefix: _
          }) : null;
          return [J, q];
        };
        E = nn("div", fP({
          class: [`${_}-popover`, `${_}-popover-shared`, (s == null ? void 0 : s.value) && `${_}-popover--rtl`, u == null ? void 0 : u.themeClass.value, z.map((L) => `${_}-${L}`), {
            [`${_}-popover--scrollable`]: e.scrollable,
            [`${_}-popover--show-header-or-footer`]: O,
            [`${_}-popover--raw`]: e.raw,
            [`${_}-popover-shared--overlap`]: e.overlap,
            [`${_}-popover-shared--show-arrow`]: e.showArrow,
            [`${_}-popover-shared--center-arrow`]: e.arrowPointToCenter
          }],
          ref: h,
          style: g.value,
          onKeydown: c.handleKeydown,
          onMouseenter: C,
          onMouseleave: b
        }, n), M ? nn(by, {
          active: e.show,
          autoFocus: !0
        }, {
          default: U
        }) : U());
      }
      return wP(E, f.value);
    }
    return {
      displayed: v,
      namespace: o,
      isMounted: c.isMountedRef,
      zIndex: c.zIndexRef,
      followerRef: d,
      adjustedTo: Pn(e),
      followerEnabled: p,
      renderContentNode: T
    };
  },
  render() {
    return nn(Zs, {
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
      teleportDisabled: this.adjustedTo === Pn.tdkey
    }, {
      default: () => this.animated ? nn(vP, {
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
}), xP = window.Vue.cloneVNode, Fu = window.Vue.computed, CP = window.Vue.defineComponent, Pr = window.Vue.h, SP = window.Vue.provide, Ii = window.Vue.ref, $P = window.Vue.Text, $l = window.Vue.toRef, RP = window.Vue.watchEffect, kP = window.Vue.withDirectives, PP = Object.keys(Gp), _P = {
  focus: ["onFocus", "onBlur"],
  click: ["onClick"],
  hover: ["onMouseenter", "onMouseleave"],
  manual: [],
  nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
};
function TP(e, t, n) {
  _P[t].forEach((o) => {
    e.props ? e.props = Object.assign({}, e.props) : e.props = {};
    const r = e.props[o], i = n[o];
    r ? e.props[o] = (...l) => {
      r(...l), i(...l);
    } : e.props[o] = i;
  });
}
const rr = {
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
  to: Pn.propTo,
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
}, FP = Object.assign(Object.assign(Object.assign({}, _e.props), rr), {
  internalOnAfterLeave: Function,
  internalRenderBody: Function
}), di = CP({
  name: "Popover",
  inheritAttrs: !1,
  props: FP,
  slots: Object,
  __popover__: !0,
  setup(e) {
    const t = Pa(), n = Ii(null), o = Fu(() => e.show), r = Ii(e.defaultShow), i = zt(o, r), l = Oe(() => e.disabled ? !1 : i.value), a = () => {
      if (e.disabled) return !0;
      const {
        getDisabled: O
      } = e;
      return !!(O != null && O());
    }, s = () => a() ? !1 : i.value, d = Bh(e, ["arrow", "showArrow"]), c = Fu(() => e.overlap ? !1 : d.value);
    let h = null;
    const p = Ii(null), v = Ii(null), f = Oe(() => e.x !== void 0 && e.y !== void 0);
    function m(O) {
      const {
        "onUpdate:show": U,
        onUpdateShow: L,
        onShow: Y,
        onHide: Q
      } = e;
      r.value = O, U && ie(U, O), L && ie(L, O), O && Y && ie(Y, !0), O && Q && ie(Q, !1);
    }
    function g() {
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
      } = v;
      O && (window.clearTimeout(O), v.value = null);
    }
    function C() {
      const O = a();
      if (e.trigger === "focus" && !O) {
        if (s()) return;
        m(!0);
      }
    }
    function b() {
      const O = a();
      if (e.trigger === "focus" && !O) {
        if (!s()) return;
        m(!1);
      }
    }
    function x() {
      const O = a();
      if (e.trigger === "hover" && !O) {
        if (w(), p.value !== null || s()) return;
        const U = () => {
          m(!0), p.value = null;
        }, {
          delay: L
        } = e;
        L === 0 ? U() : p.value = window.setTimeout(U, L);
      }
    }
    function S() {
      const O = a();
      if (e.trigger === "hover" && !O) {
        if (u(), v.value !== null || !s()) return;
        const U = () => {
          m(!1), v.value = null;
        }, {
          duration: L
        } = e;
        L === 0 ? U() : v.value = window.setTimeout(U, L);
      }
    }
    function y() {
      S();
    }
    function T(O) {
      var U;
      s() && (e.trigger === "click" && (u(), w(), m(!1)), (U = e.onClickoutside) === null || U === void 0 || U.call(e, O));
    }
    function R() {
      if (e.trigger === "click" && !a()) {
        u(), w();
        const O = !s();
        m(O);
      }
    }
    function E(O) {
      e.internalTrapFocus && O.key === "Escape" && (u(), w(), m(!1));
    }
    function W(O) {
      r.value = O;
    }
    function _() {
      var O;
      return (O = n.value) === null || O === void 0 ? void 0 : O.targetRef;
    }
    function z(O) {
      h = O;
    }
    return SP("NPopover", {
      getTriggerElement: _,
      handleKeydown: E,
      handleMouseEnter: x,
      handleMouseLeave: S,
      handleClickOutside: T,
      handleMouseMoveOutside: y,
      setBodyInstance: z,
      positionManuallyRef: f,
      isMountedRef: t,
      zIndexRef: $l(e, "zIndex"),
      extraClassRef: $l(e, "internalExtraClass"),
      internalRenderBodyRef: $l(e, "internalRenderBody")
    }), RP(() => {
      i.value && a() && m(!1);
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
      handleMouseEnter: x,
      handleMouseLeave: S,
      handleFocus: C,
      handleBlur: b,
      syncPosition: g
    };
  },
  render() {
    var e;
    const {
      positionManually: t,
      $slots: n
    } = this;
    let o, r = !1;
    if (!t && (o = Oy(n, "trigger"), o)) {
      o = xP(o), o = o.type === $P ? Pr("span", [o]) : o;
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
        TP(o, l ? "nested" : t ? "manual" : this.trigger, s);
      }
    }
    return Pr(Gs, {
      ref: "binderInstRef",
      syncTarget: !r,
      syncTargetWithParent: this.internalSyncTargetWithParent
    }, {
      default: () => {
        this.mergedShowConsideringDisabledProp;
        const i = this.getMergedShow();
        return [this.internalTrapFocus && i ? kP(Pr("div", {
          style: {
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }), [[jh, {
          enabled: i,
          zIndex: this.zIndex
        }]]) : null, t ? null : Pr(Xs, null, {
          default: () => o
        }), Pr(yP, Qr(this.$props, PP, Object.assign(Object.assign({}, this.$attrs), {
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
}), EP = {
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
function OP(e) {
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
    closeIconColor: v,
    closeIconColorHover: f,
    closeIconColorPressed: m,
    borderRadiusSmall: g,
    fontSizeMini: u,
    fontSizeTiny: w,
    fontSizeSmall: C,
    fontSizeMedium: b,
    heightMini: x,
    heightTiny: S,
    heightSmall: y,
    heightMedium: T,
    closeColorHover: R,
    closeColorPressed: E,
    buttonColor2Hover: W,
    buttonColor2Pressed: _,
    fontWeightStrong: z
  } = e;
  return Object.assign(Object.assign({}, EP), {
    closeBorderRadius: g,
    heightTiny: x,
    heightSmall: S,
    heightMedium: y,
    heightLarge: T,
    borderRadius: g,
    opacityDisabled: h,
    fontSizeTiny: u,
    fontSizeSmall: w,
    fontSizeMedium: C,
    fontSizeLarge: b,
    fontWeightStrong: z,
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
    closeIconColor: v,
    closeIconColorHover: f,
    closeIconColorPressed: m,
    closeColorHover: R,
    closeColorPressed: E,
    borderPrimary: `1px solid ${Fe(r, {
      alpha: 0.3
    })}`,
    textColorPrimary: r,
    colorPrimary: Fe(r, {
      alpha: 0.12
    }),
    colorBorderedPrimary: Fe(r, {
      alpha: 0.1
    }),
    closeIconColorPrimary: r,
    closeIconColorHoverPrimary: r,
    closeIconColorPressedPrimary: r,
    closeColorHoverPrimary: Fe(r, {
      alpha: 0.12
    }),
    closeColorPressedPrimary: Fe(r, {
      alpha: 0.18
    }),
    borderInfo: `1px solid ${Fe(i, {
      alpha: 0.3
    })}`,
    textColorInfo: i,
    colorInfo: Fe(i, {
      alpha: 0.12
    }),
    colorBorderedInfo: Fe(i, {
      alpha: 0.1
    }),
    closeIconColorInfo: i,
    closeIconColorHoverInfo: i,
    closeIconColorPressedInfo: i,
    closeColorHoverInfo: Fe(i, {
      alpha: 0.12
    }),
    closeColorPressedInfo: Fe(i, {
      alpha: 0.18
    }),
    borderSuccess: `1px solid ${Fe(l, {
      alpha: 0.3
    })}`,
    textColorSuccess: l,
    colorSuccess: Fe(l, {
      alpha: 0.12
    }),
    colorBorderedSuccess: Fe(l, {
      alpha: 0.1
    }),
    closeIconColorSuccess: l,
    closeIconColorHoverSuccess: l,
    closeIconColorPressedSuccess: l,
    closeColorHoverSuccess: Fe(l, {
      alpha: 0.12
    }),
    closeColorPressedSuccess: Fe(l, {
      alpha: 0.18
    }),
    borderWarning: `1px solid ${Fe(a, {
      alpha: 0.35
    })}`,
    textColorWarning: a,
    colorWarning: Fe(a, {
      alpha: 0.15
    }),
    colorBorderedWarning: Fe(a, {
      alpha: 0.12
    }),
    closeIconColorWarning: a,
    closeIconColorHoverWarning: a,
    closeIconColorPressedWarning: a,
    closeColorHoverWarning: Fe(a, {
      alpha: 0.12
    }),
    closeColorPressedWarning: Fe(a, {
      alpha: 0.18
    }),
    borderError: `1px solid ${Fe(s, {
      alpha: 0.23
    })}`,
    textColorError: s,
    colorError: Fe(s, {
      alpha: 0.1
    }),
    colorBorderedError: Fe(s, {
      alpha: 0.08
    }),
    closeIconColorError: s,
    closeIconColorHoverError: s,
    closeIconColorPressedError: s,
    closeColorHoverError: Fe(s, {
      alpha: 0.12
    }),
    closeColorPressedError: Fe(s, {
      alpha: 0.18
    })
  });
}
const zP = {
  common: vt,
  self: OP
}, MP = {
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
}, IP = A("tag", `
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
`, [K("strong", `
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
 `), K("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [B("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), B("avatar", `
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `), K("closable", `
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]), K("icon, avatar", [K("round", `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]), K("disabled", `
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `), K("checkable", `
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `, [Qe("disabled", [H("&:hover", "background-color: var(--n-color-hover-checkable);", [Qe("checked", "color: var(--n-text-color-hover-checkable);")]), H("&:active", "background-color: var(--n-color-pressed-checkable);", [Qe("checked", "color: var(--n-text-color-pressed-checkable);")])]), K("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [Qe("disabled", [H("&:hover", "background-color: var(--n-color-checked-hover);"), H("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), Eu = window.Vue.computed, AP = window.Vue.defineComponent, Uo = window.Vue.h, VP = window.Vue.provide, BP = window.Vue.ref, LP = window.Vue.toRef;
window.Vue.watchEffect;
const DP = Object.assign(Object.assign(Object.assign({}, _e.props), MP), {
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
}), NP = "n-tag", la = AP({
  name: "Tag",
  props: DP,
  slots: Object,
  setup(e) {
    const t = BP(null), {
      mergedBorderedRef: n,
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = qe(e), l = _e("Tag", "-tag", IP, zP, e, o);
    VP(NP, {
      roundRef: LP(e, "round")
    });
    function a() {
      if (!e.disabled && e.checkable) {
        const {
          checked: v,
          onCheckedChange: f,
          onUpdateChecked: m,
          "onUpdate:checked": g
        } = e;
        m && m(!v), g && g(!v), f && f(!v);
      }
    }
    function s(v) {
      if (e.triggerClickOnClose || v.stopPropagation(), !e.disabled) {
        const {
          onClose: f
        } = e;
        f && ie(f, v);
      }
    }
    const d = {
      setTextContent(v) {
        const {
          value: f
        } = t;
        f && (f.textContent = v);
      }
    }, c = Mt("Tag", i, o), h = Eu(() => {
      const {
        type: v,
        size: f,
        color: {
          color: m,
          textColor: g
        } = {}
      } = e, {
        common: {
          cubicBezierEaseInOut: u
        },
        self: {
          padding: w,
          closeMargin: C,
          borderRadius: b,
          opacityDisabled: x,
          textColorCheckable: S,
          textColorHoverCheckable: y,
          textColorPressedCheckable: T,
          textColorChecked: R,
          colorCheckable: E,
          colorHoverCheckable: W,
          colorPressedCheckable: _,
          colorChecked: z,
          colorCheckedHover: M,
          colorCheckedPressed: O,
          closeBorderRadius: U,
          fontWeightStrong: L,
          [re("colorBordered", v)]: Y,
          [re("closeSize", f)]: Q,
          [re("closeIconSize", f)]: J,
          [re("fontSize", f)]: q,
          [re("height", f)]: I,
          [re("color", v)]: G,
          [re("textColor", v)]: Z,
          [re("border", v)]: ae,
          [re("closeIconColor", v)]: le,
          [re("closeIconColorHover", v)]: de,
          [re("closeIconColorPressed", v)]: me,
          [re("closeColorHover", v)]: X,
          [re("closeColorPressed", v)]: ce
        }
      } = l.value, ke = Yt(C);
      return {
        "--n-font-weight-strong": L,
        "--n-avatar-size-override": `calc(${I} - 8px)`,
        "--n-bezier": u,
        "--n-border-radius": b,
        "--n-border": ae,
        "--n-close-icon-size": J,
        "--n-close-color-pressed": ce,
        "--n-close-color-hover": X,
        "--n-close-border-radius": U,
        "--n-close-icon-color": le,
        "--n-close-icon-color-hover": de,
        "--n-close-icon-color-pressed": me,
        "--n-close-icon-color-disabled": le,
        "--n-close-margin-top": ke.top,
        "--n-close-margin-right": ke.right,
        "--n-close-margin-bottom": ke.bottom,
        "--n-close-margin-left": ke.left,
        "--n-close-size": Q,
        "--n-color": m || (n.value ? Y : G),
        "--n-color-checkable": E,
        "--n-color-checked": z,
        "--n-color-checked-hover": M,
        "--n-color-checked-pressed": O,
        "--n-color-hover-checkable": W,
        "--n-color-pressed-checkable": _,
        "--n-font-size": q,
        "--n-height": I,
        "--n-opacity-disabled": x,
        "--n-padding": w,
        "--n-text-color": g || Z,
        "--n-text-color-checkable": S,
        "--n-text-color-checked": R,
        "--n-text-color-hover-checkable": y,
        "--n-text-color-pressed-checkable": T
      };
    }), p = r ? wt("tag", Eu(() => {
      let v = "";
      const {
        type: f,
        size: m,
        color: {
          color: g,
          textColor: u
        } = {}
      } = e;
      return v += f[0], v += m[0], g && (v += `a${pa(g)}`), u && (v += `b${pa(u)}`), n.value && (v += "c"), v;
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
    const d = We(s.avatar, (h) => h && Uo("div", {
      class: `${n}-tag__avatar`
    }, h)), c = We(s.icon, (h) => h && Uo("div", {
      class: `${n}-tag__icon`
    }, h));
    return Uo("div", {
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
    }, c || d, Uo("span", {
      class: `${n}-tag__content`,
      ref: "contentRef"
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e)), !this.checkable && r ? Uo(Np, {
      clsPrefix: n,
      class: `${n}-tag__close`,
      disabled: this.disabled,
      onClick: this.handleCloseClick,
      focusable: this.internalCloseFocusable,
      round: l,
      isButtonTag: this.internalCloseIsButtonTag,
      absolute: !0
    }) : null, !this.checkable && this.mergedBordered ? Uo("div", {
      class: `${n}-tag__border`,
      style: {
        borderColor: i
      }
    }) : null);
  }
}), HP = window.Vue.defineComponent, Ai = window.Vue.h, Yp = HP({
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
      return Ai(cr, {
        clsPrefix: n,
        class: `${n}-base-suffix`,
        strokeWidth: 24,
        scale: 0.85,
        show: e.loading
      }, {
        default: () => e.showArrow ? Ai(Ss, {
          clsPrefix: n,
          show: e.showClear,
          onClear: e.onClear
        }, {
          placeholder: () => Ai(Ct, {
            clsPrefix: n,
            class: `${n}-base-suffix__arrow`
          }, {
            default: () => vn(t.default, () => [Ai(Lp, null)])
          })
        }) : null
      });
    };
  }
}), jP = {
  paddingSingle: "0 26px 0 12px",
  paddingMultiple: "3px 26px 0 12px",
  clearSize: "16px",
  arrowSize: "16px"
};
function WP(e) {
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
    iconColor: v,
    iconColorDisabled: f,
    clearColor: m,
    clearColorHover: g,
    clearColorPressed: u,
    placeholderColor: w,
    placeholderColorDisabled: C,
    fontSizeTiny: b,
    fontSizeSmall: x,
    fontSizeMedium: S,
    fontSizeLarge: y,
    heightTiny: T,
    heightSmall: R,
    heightMedium: E,
    heightLarge: W,
    fontWeight: _
  } = e;
  return Object.assign(Object.assign({}, jP), {
    fontSizeTiny: b,
    fontSizeSmall: x,
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
    placeholderColorDisabled: C,
    color: r,
    colorDisabled: i,
    colorActive: r,
    border: `1px solid ${p}`,
    borderHover: `1px solid ${a}`,
    borderActive: `1px solid ${l}`,
    borderFocus: `1px solid ${a}`,
    boxShadowHover: "none",
    boxShadowActive: `0 0 0 2px ${Fe(l, {
      alpha: 0.2
    })}`,
    boxShadowFocus: `0 0 0 2px ${Fe(l, {
      alpha: 0.2
    })}`,
    caretColor: l,
    arrowColor: v,
    arrowColorDisabled: f,
    loadingColor: l,
    // warning
    borderWarning: `1px solid ${s}`,
    borderHoverWarning: `1px solid ${d}`,
    borderActiveWarning: `1px solid ${s}`,
    borderFocusWarning: `1px solid ${d}`,
    boxShadowHoverWarning: "none",
    boxShadowActiveWarning: `0 0 0 2px ${Fe(s, {
      alpha: 0.2
    })}`,
    boxShadowFocusWarning: `0 0 0 2px ${Fe(s, {
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
    boxShadowActiveError: `0 0 0 2px ${Fe(c, {
      alpha: 0.2
    })}`,
    boxShadowFocusError: `0 0 0 2px ${Fe(c, {
      alpha: 0.2
    })}`,
    colorActiveError: r,
    caretColorError: c,
    clearColor: m,
    clearColorHover: g,
    clearColorPressed: u
  });
}
const Zp = {
  name: "InternalSelection",
  common: vt,
  peers: {
    Popover: ur
  },
  self: WP
}, UP = H([A("base-selection", `
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
 `, [A("base-loading", `
 color: var(--n-loading-color);
 `), A("base-selection-tags", "min-height: var(--n-height);"), B("border, state-border", `
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
 `), A("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [B("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), A("base-selection-overlay", `
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
 `)]), A("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [B("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), A("base-selection-tags", `
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
 `), A("base-selection-label", `
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
 `, [A("base-selection-input", `
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
 `)]), Qe("disabled", [H("&:hover", [B("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), K("focus", [B("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), K("active", [B("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), A("base-selection-label", "background-color: var(--n-color-active);"), A("base-selection-tags", "background-color: var(--n-color-active);")])]), K("disabled", "cursor: not-allowed;", [B("arrow", `
 color: var(--n-arrow-color-disabled);
 `), A("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [A("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), B("render-label", `
 color: var(--n-text-color-disabled);
 `)]), A("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), A("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), A("base-selection-input-tag", `
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
 `)]), ["warning", "error"].map((e) => K(`${e}-status`, [B("state-border", `border: var(--n-border-${e});`), Qe("disabled", [H("&:hover", [B("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), K("active", [B("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), A("base-selection-label", `background-color: var(--n-color-active-${e});`), A("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), K("focus", [B("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), A("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), A("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [H("&:last-child", "padding-right: 0;"), A("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [B("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), Ko = window.Vue.computed, KP = window.Vue.defineComponent, qP = window.Vue.Fragment, Le = window.Vue.h, GP = window.Vue.nextTick, XP = window.Vue.onMounted, Ut = window.Vue.ref, Rl = window.Vue.toRef, kl = window.Vue.watch, YP = window.Vue.watchEffect, ZP = KP({
  name: "InternalSelection",
  props: Object.assign(Object.assign({}, _e.props), {
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
    } = qe(e), o = Mt("InternalSelection", n, t), r = Ut(null), i = Ut(null), l = Ut(null), a = Ut(null), s = Ut(null), d = Ut(null), c = Ut(null), h = Ut(null), p = Ut(null), v = Ut(null), f = Ut(!1), m = Ut(!1), g = Ut(!1), u = _e("InternalSelection", "-internal-selection", UP, Zp, e, Rl(e, "clsPrefix")), w = Ko(() => e.clearable && !e.disabled && (g.value || e.active)), C = Ko(() => e.selectedOption ? e.renderTag ? e.renderTag({
      option: e.selectedOption,
      handleClose: () => {
      }
    }) : e.renderLabel ? e.renderLabel(e.selectedOption, !0) : $n(e.selectedOption[e.labelField], e.selectedOption, !0) : e.placeholder), b = Ko(() => {
      const F = e.selectedOption;
      if (F)
        return F[e.labelField];
    }), x = Ko(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
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
      } = v;
      F && (F.style.display = "none");
    }
    function T() {
      const {
        value: F
      } = v;
      F && (F.style.display = "inline-block");
    }
    kl(Rl(e, "active"), (F) => {
      F || y();
    }), kl(Rl(e, "pattern"), () => {
      e.multiple && GP(S);
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
    function z(F) {
      const {
        onPatternInput: j
      } = e;
      j && j(F);
    }
    function M(F) {
      var j;
      (!F.relatedTarget || !(!((j = l.value) === null || j === void 0) && j.contains(F.relatedTarget))) && R(F);
    }
    function O(F) {
      var j;
      !((j = l.value) === null || j === void 0) && j.contains(F.relatedTarget) || E(F);
    }
    function U(F) {
      _(F);
    }
    function L() {
      g.value = !0;
    }
    function Y() {
      g.value = !1;
    }
    function Q(F) {
      !e.active || !e.filterable || F.target !== i.value && F.preventDefault();
    }
    function J(F) {
      W(F);
    }
    const q = Ut(!1);
    function I(F) {
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
      e.ignoreComposition && q.value ? G = F : z(F);
    }
    function ae() {
      q.value = !0;
    }
    function le() {
      q.value = !1, e.ignoreComposition && z(G), G = null;
    }
    function de(F) {
      var j;
      m.value = !0, (j = e.onPatternFocus) === null || j === void 0 || j.call(e, F);
    }
    function me(F) {
      var j;
      m.value = !1, (j = e.onPatternBlur) === null || j === void 0 || j.call(e, F);
    }
    function X() {
      var F, j;
      if (e.filterable)
        m.value = !1, (F = d.value) === null || F === void 0 || F.blur(), (j = i.value) === null || j === void 0 || j.blur();
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
      e.filterable ? (m.value = !1, (F = d.value) === null || F === void 0 || F.focus()) : e.multiple ? (j = a.value) === null || j === void 0 || j.focus() : (pe = s.value) === null || pe === void 0 || pe.focus();
    }
    function ke() {
      const {
        value: F
      } = i;
      F && (T(), F.focus());
    }
    function ge() {
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
    function Be() {
      return i.value;
    }
    let Me = null;
    function oe() {
      Me !== null && window.clearTimeout(Me);
    }
    function k() {
      e.active || (oe(), Me = window.setTimeout(() => {
        x.value && (f.value = !0);
      }, 100));
    }
    function $() {
      oe();
    }
    function D(F) {
      F || (oe(), f.value = !1);
    }
    kl(x, (F) => {
      F || (f.value = !1);
    }), XP(() => {
      YP(() => {
        const F = d.value;
        F && (e.disabled ? F.removeAttribute("tabindex") : F.tabIndex = m.value ? -1 : 0);
      });
    }), np(l, e.onResize);
    const {
      inlineThemeDisabled: ee
    } = e, ve = Ko(() => {
      const {
        size: F
      } = e, {
        common: {
          cubicBezierEaseInOut: j
        },
        self: {
          fontWeight: pe,
          borderRadius: Te,
          color: lt,
          placeholderColor: pt,
          textColor: Ye,
          paddingSingle: Ze,
          paddingMultiple: mt,
          caretColor: et,
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
          borderActive: Ae,
          arrowColor: ot,
          arrowColorDisabled: Ne,
          loadingColor: Pt,
          // form warning
          colorActiveWarning: It,
          boxShadowFocusWarning: At,
          boxShadowActiveWarning: Nt,
          boxShadowHoverWarning: Ht,
          borderWarning: Qt,
          borderFocusWarning: jt,
          borderHoverWarning: V,
          borderActiveWarning: ne,
          // form error
          colorActiveError: xe,
          boxShadowFocusError: Ee,
          boxShadowActiveError: He,
          boxShadowHoverError: Ve,
          borderError: rt,
          borderFocusError: ct,
          borderHoverError: Xt,
          borderActiveError: En,
          // clear
          clearColor: On,
          clearColorHover: vo,
          clearColorPressed: fr,
          clearSize: hr,
          // arrow
          arrowSize: pr,
          [re("height", F)]: vr,
          [re("fontSize", F)]: mr
        }
      } = u.value, Kn = Yt(Ze), qn = Yt(mt);
      return {
        "--n-bezier": j,
        "--n-border": be,
        "--n-border-active": Ae,
        "--n-border-focus": we,
        "--n-border-hover": Ce,
        "--n-border-radius": Te,
        "--n-box-shadow-active": se,
        "--n-box-shadow-focus": te,
        "--n-box-shadow-hover": ue,
        "--n-caret-color": et,
        "--n-color": lt,
        "--n-color-active": N,
        "--n-color-disabled": fe,
        "--n-font-size": mr,
        "--n-height": vr,
        "--n-padding-single-top": Kn.top,
        "--n-padding-multiple-top": qn.top,
        "--n-padding-single-right": Kn.right,
        "--n-padding-multiple-right": qn.right,
        "--n-padding-single-left": Kn.left,
        "--n-padding-multiple-left": qn.left,
        "--n-padding-single-bottom": Kn.bottom,
        "--n-padding-multiple-bottom": qn.bottom,
        "--n-placeholder-color": pt,
        "--n-placeholder-color-disabled": P,
        "--n-text-color": Ye,
        "--n-text-color-disabled": Re,
        "--n-arrow-color": ot,
        "--n-arrow-color-disabled": Ne,
        "--n-loading-color": Pt,
        // form warning
        "--n-color-active-warning": It,
        "--n-box-shadow-focus-warning": At,
        "--n-box-shadow-active-warning": Nt,
        "--n-box-shadow-hover-warning": Ht,
        "--n-border-warning": Qt,
        "--n-border-focus-warning": jt,
        "--n-border-hover-warning": V,
        "--n-border-active-warning": ne,
        // form error
        "--n-color-active-error": xe,
        "--n-box-shadow-focus-error": Ee,
        "--n-box-shadow-active-error": He,
        "--n-box-shadow-hover-error": Ve,
        "--n-border-error": rt,
        "--n-border-focus-error": ct,
        "--n-border-hover-error": Xt,
        "--n-border-active-error": En,
        // clear
        "--n-clear-size": hr,
        "--n-clear-color": On,
        "--n-clear-color-hover": vo,
        "--n-clear-color-pressed": fr,
        // arrow-size
        "--n-arrow-size": pr,
        // font-weight
        "--n-font-weight": pe
      };
    }), he = ee ? wt("internal-selection", Ko(() => e.size[0]), ve, e) : void 0;
    return {
      mergedTheme: u,
      mergedClearable: w,
      mergedClsPrefix: t,
      rtlEnabled: o,
      patternInputFocused: m,
      filterablePlaceholder: C,
      label: b,
      selected: x,
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
      inputTagElRef: v,
      handleMouseDown: Q,
      handleFocusin: M,
      handleClear: U,
      handleMouseEnter: L,
      handleMouseLeave: Y,
      handleDeleteOption: J,
      handlePatternKeyDown: I,
      handlePatternInputInput: Z,
      handlePatternInputBlur: me,
      handlePatternInputFocus: de,
      handleMouseEnterCounter: k,
      handleMouseLeaveCounter: $,
      handleFocusout: O,
      handleCompositionEnd: le,
      handleCompositionStart: ae,
      onPopoverUpdateShow: D,
      focus: ce,
      focusInput: ke,
      blur: X,
      blurInput: ge,
      updateCounter: $e,
      getCounter: Se,
      getTail: Be,
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
    const p = i === "responsive", v = typeof i == "number", f = p || v, m = Le(hs, null, {
      default: () => Le(Yp, {
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
    let g;
    if (t) {
      const {
        labelField: u
      } = this, w = (z) => Le("div", {
        class: `${a}-base-selection-tag-wrapper`,
        key: z.value
      }, c ? c({
        option: z,
        handleClose: () => {
          this.handleDeleteOption(z);
        }
      }) : Le(la, {
        size: n,
        closable: !z.disabled,
        disabled: o,
        onClose: () => {
          this.handleDeleteOption(z);
        },
        internalCloseIsButtonTag: !1,
        internalCloseFocusable: !1
      }, {
        default: () => h ? h(z, !0) : $n(z[u], z, !0)
      })), C = () => (v ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(w), b = r ? Le("div", {
        class: `${a}-base-selection-input-tag`,
        ref: "inputTagElRef",
        key: "__input-tag__"
      }, Le("input", Object.assign({}, this.inputProps, {
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
      })), Le("span", {
        ref: "patternInputMirrorRef",
        class: `${a}-base-selection-input-tag__mirror`
      }, this.pattern)) : null, x = p ? () => Le("div", {
        class: `${a}-base-selection-tag-wrapper`,
        ref: "counterWrapperRef"
      }, Le(la, {
        size: n,
        ref: "counterRef",
        onMouseenter: this.handleMouseEnterCounter,
        onMouseleave: this.handleMouseLeaveCounter,
        disabled: o
      })) : void 0;
      let S;
      if (v) {
        const z = this.selectedOptions.length - i;
        z > 0 && (S = Le("div", {
          class: `${a}-base-selection-tag-wrapper`,
          key: "__counter__"
        }, Le(la, {
          size: n,
          ref: "counterRef",
          onMouseenter: this.handleMouseEnterCounter,
          disabled: o
        }, {
          default: () => `+${z}`
        })));
      }
      const y = p ? r ? Le(_c, {
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
        default: C,
        counter: x,
        tail: () => b
      }) : Le(_c, {
        ref: "overflowRef",
        updateCounter: this.updateCounter,
        getCounter: this.getCounter,
        style: {
          width: "100%",
          display: "flex",
          overflow: "hidden"
        }
      }, {
        default: C,
        counter: x
      }) : v && S ? C().concat(S) : C(), T = f ? () => Le("div", {
        class: `${a}-base-selection-popover`
      }, p ? C() : this.selectedOptions.map(w)) : void 0, R = f ? Object.assign({
        show: this.showTagsPanel,
        trigger: "hover",
        overlap: !0,
        placement: "top",
        width: "trigger",
        onUpdateShow: this.onPopoverUpdateShow,
        theme: this.mergedTheme.peers.Popover,
        themeOverrides: this.mergedTheme.peerOverrides.Popover
      }, s) : null, W = (this.selected ? !1 : this.active ? !this.pattern && !this.isComposing : !0) ? Le("div", {
        class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`
      }, Le("div", {
        class: `${a}-base-selection-placeholder__inner`
      }, this.placeholder)) : null, _ = r ? Le("div", {
        ref: "patternInputWrapperRef",
        class: `${a}-base-selection-tags`
      }, y, p ? null : b, m) : Le("div", {
        ref: "multipleElRef",
        class: `${a}-base-selection-tags`,
        tabindex: o ? void 0 : 0
      }, y, m);
      g = Le(qP, null, f ? Le(di, Object.assign({}, R, {
        scrollable: !0,
        style: "max-height: calc(var(--v-target-height) * 6.6);"
      }), {
        trigger: () => _,
        default: T
      }) : _, W);
    } else if (r) {
      const u = this.pattern || this.isComposing, w = this.active ? !u : !this.selected, C = this.active ? !1 : this.selected;
      g = Le("div", {
        ref: "patternInputWrapperRef",
        class: `${a}-base-selection-label`,
        title: this.patternInputFocused ? void 0 : Oc(this.label)
      }, Le("input", Object.assign({}, this.inputProps, {
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
      })), C ? Le("div", {
        class: `${a}-base-selection-label__render-label ${a}-base-selection-overlay`,
        key: "input"
      }, Le("div", {
        class: `${a}-base-selection-overlay__wrapper`
      }, c ? c({
        option: this.selectedOption,
        handleClose: () => {
        }
      }) : h ? h(this.selectedOption, !0) : $n(this.label, this.selectedOption, !0))) : null, w ? Le("div", {
        class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`,
        key: "placeholder"
      }, Le("div", {
        class: `${a}-base-selection-overlay__wrapper`
      }, this.filterablePlaceholder)) : null, m);
    } else
      g = Le("div", {
        ref: "singleElRef",
        class: `${a}-base-selection-label`,
        tabindex: this.disabled ? void 0 : 0
      }, this.label !== void 0 ? Le("div", {
        class: `${a}-base-selection-input`,
        title: Oc(this.label),
        key: "input"
      }, Le("div", {
        class: `${a}-base-selection-input__content`
      }, c ? c({
        option: this.selectedOption,
        handleClose: () => {
        }
      }) : h ? h(this.selectedOption, !0) : $n(this.label, this.selectedOption, !0))) : Le("div", {
        class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`,
        key: "placeholder"
      }, Le("div", {
        class: `${a}-base-selection-placeholder__inner`
      }, this.placeholder)), m);
    return Le("div", {
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
    }, g, l ? Le("div", {
      class: `${a}-base-selection__border`
    }) : null, l ? Le("div", {
      class: `${a}-base-selection__state-border`
    }) : null);
  }
}), {
  cubicBezierEaseInOut: Yn
} = Ao;
function JP({
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
 opacity ${e} ${Yn},
 max-width ${e} ${Yn} ${t},
 margin-left ${e} ${Yn} ${t},
 margin-right ${e} ${Yn} ${t};
 `), H("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${Yn} ${t},
 max-width ${e} ${Yn},
 margin-left ${e} ${Yn},
 margin-right ${e} ${Yn};
 `)];
}
const QP = A("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`), e_ = window.Vue.defineComponent, t_ = window.Vue.h, n_ = window.Vue.nextTick, o_ = window.Vue.onBeforeUnmount, Ou = window.Vue.ref, r_ = window.Vue.toRef, i_ = e_({
  name: "BaseWave",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    Vo("-base-wave", QP, r_(e, "clsPrefix"));
    const t = Ou(null), n = Ou(!1);
    let o = null;
    return o_(() => {
      o !== null && window.clearTimeout(o);
    }), {
      active: n,
      selfRef: t,
      play() {
        o !== null && (window.clearTimeout(o), n.value = !1, o = null), n_(() => {
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
    return t_("div", {
      ref: "selfRef",
      "aria-hidden": !0,
      class: [`${e}-base-wave`, this.active && `${e}-base-wave--active`]
    });
  }
}), a_ = ar && "chrome" in window;
ar && navigator.userAgent.includes("Firefox");
const Jp = ar && navigator.userAgent.includes("Safari") && !a_, l_ = {
  paddingTiny: "0 8px",
  paddingSmall: "0 10px",
  paddingMedium: "0 12px",
  paddingLarge: "0 14px",
  clearSize: "16px"
};
function s_(e) {
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
    borderRadius: v,
    lineHeight: f,
    fontSizeTiny: m,
    fontSizeSmall: g,
    fontSizeMedium: u,
    fontSizeLarge: w,
    heightTiny: C,
    heightSmall: b,
    heightMedium: x,
    heightLarge: S,
    actionColor: y,
    clearColor: T,
    clearColorHover: R,
    clearColorPressed: E,
    placeholderColor: W,
    placeholderColorDisabled: _,
    iconColor: z,
    iconColorDisabled: M,
    iconColorHover: O,
    iconColorPressed: U,
    fontWeight: L
  } = e;
  return Object.assign(Object.assign({}, l_), {
    fontWeight: L,
    countTextColorDisabled: o,
    countTextColor: n,
    heightTiny: C,
    heightSmall: b,
    heightMedium: x,
    heightLarge: S,
    fontSizeTiny: m,
    fontSizeSmall: g,
    fontSizeMedium: u,
    fontSizeLarge: w,
    lineHeight: f,
    lineHeightTextarea: f,
    borderRadius: v,
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
    boxShadowFocus: `0 0 0 2px ${Fe(r, {
      alpha: 0.2
    })}`,
    loadingColor: r,
    // warning
    loadingColorWarning: d,
    borderWarning: `1px solid ${d}`,
    borderHoverWarning: `1px solid ${c}`,
    colorFocusWarning: l,
    borderFocusWarning: `1px solid ${c}`,
    boxShadowFocusWarning: `0 0 0 2px ${Fe(d, {
      alpha: 0.2
    })}`,
    caretColorWarning: d,
    // error
    loadingColorError: h,
    borderError: `1px solid ${h}`,
    borderHoverError: `1px solid ${p}`,
    colorFocusError: l,
    borderFocusError: `1px solid ${p}`,
    boxShadowFocusError: `0 0 0 2px ${Fe(h, {
      alpha: 0.2
    })}`,
    caretColorError: h,
    clearColor: T,
    clearColorHover: R,
    clearColorPressed: E,
    iconColor: z,
    iconColorDisabled: M,
    iconColorHover: O,
    iconColorPressed: U,
    suffixTextColor: t
  });
}
const md = {
  name: "Input",
  common: vt,
  peers: {
    Scrollbar: li
  },
  self: s_
}, Qp = "n-input", d_ = A("input", `
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
  K("round", [Qe("textarea", "border-radius: calc(var(--n-height) / 2);")]),
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
  K("textarea", [B("placeholder", "overflow: visible;")]),
  Qe("autosize", "width: 100%;"),
  K("autosize", [B("textarea-el, input-el", `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),
  // input
  A("input-wrapper", `
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
  Qe("textarea", [B("placeholder", "white-space: nowrap;")]),
  B("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `),
  // textarea
  K("textarea", "width: 100%;", [A("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), K("resizable", [A("input-wrapper", `
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
  K("pair", [B("input-el, placeholder", "text-align: center;"), B("separator", `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `, [A("icon", `
 color: var(--n-icon-color);
 `), A("base-icon", `
 color: var(--n-icon-color);
 `)])]),
  K("disabled", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [B("border", "border: var(--n-border-disabled);"), B("input-el, textarea-el", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), B("placeholder", "color: var(--n-placeholder-color-disabled);"), B("separator", "color: var(--n-text-color-disabled);", [A("icon", `
 color: var(--n-icon-color-disabled);
 `), A("base-icon", `
 color: var(--n-icon-color-disabled);
 `)]), A("input-word-count", `
 color: var(--n-count-text-color-disabled);
 `), B("suffix, prefix", "color: var(--n-text-color-disabled);", [A("icon", `
 color: var(--n-icon-color-disabled);
 `), A("internal-icon", `
 color: var(--n-icon-color-disabled);
 `)])]),
  Qe("disabled", [B("eye", `
 color: var(--n-icon-color);
 cursor: pointer;
 `, [H("&:hover", `
 color: var(--n-icon-color-hover);
 `), H("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), H("&:hover", [B("state-border", "border: var(--n-border-hover);")]), K("focus", "background-color: var(--n-color-focus);", [B("state-border", `
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
 `, [A("base-loading", `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `), A("base-clear", `
 font-size: var(--n-icon-size);
 `, [B("placeholder", [A("base-icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), H(">", [A("icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), A("base-icon", `
 font-size: var(--n-icon-size);
 `)]),
  A("input-word-count", `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),
  ["warning", "error"].map((e) => K(`${e}-status`, [Qe("disabled", [A("base-loading", `
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
 `)]), K("focus", `
 background-color: var(--n-color-focus-${e});
 `, [B("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))
]), c_ = A("input", [K("disabled", [B("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]), u_ = window.Vue.ref, f_ = window.Vue.watch;
function h_(e) {
  let t = 0;
  for (const n of e)
    t++;
  return t;
}
function Vi(e) {
  return e === "" || e == null;
}
function p_(e) {
  const t = u_(null);
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
      const v = c[d - 1], f = s.indexOf(v, d - 1);
      f !== -1 && (p = f + 1);
    }
    (i = a.setSelectionRange) === null || i === void 0 || i.call(a, p, p);
  }
  function r() {
    t.value = null;
  }
  return f_(e, r), {
    recordCursor: n,
    restoreCursor: o
  };
}
const v_ = window.Vue.computed, m_ = window.Vue.defineComponent, g_ = window.Vue.h, b_ = window.Vue.inject, zu = m_({
  name: "InputWordCount",
  setup(e, {
    slots: t
  }) {
    const {
      mergedValueRef: n,
      maxlengthRef: o,
      mergedClsPrefixRef: r,
      countGraphemesRef: i
    } = b_(Qp), l = v_(() => {
      const {
        value: a
      } = n;
      return a === null || Array.isArray(a) ? 0 : (i.value || h_)(a);
    });
    return () => {
      const {
        value: a
      } = o, {
        value: s
      } = n;
      return g_("span", {
        class: `${r.value}-input-word-count`
      }, By(t.default, {
        value: s === null || Array.isArray(s) ? "" : s
      }, () => [a === void 0 ? l.value : `${l.value} / ${a}`]));
    };
  }
}), Zn = window.Vue.computed, w_ = window.Vue.defineComponent, y_ = window.Vue.Fragment, x_ = window.Vue.getCurrentInstance, De = window.Vue.h, Mu = window.Vue.nextTick, C_ = window.Vue.onMounted, S_ = window.Vue.provide, Tt = window.Vue.ref, Iu = window.Vue.toRef, Au = window.Vue.watch, Vu = window.Vue.watchEffect, $_ = Object.assign(Object.assign({}, _e.props), {
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
}), $o = w_({
  name: "Input",
  props: $_,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBorderedRef: n,
      inlineThemeDisabled: o,
      mergedRtlRef: r
    } = qe(e), i = _e("Input", "-input", d_, md, e, t);
    Jp && Vo("-input-safari", c_, t);
    const l = Tt(null), a = Tt(null), s = Tt(null), d = Tt(null), c = Tt(null), h = Tt(null), p = Tt(null), v = p_(p), f = Tt(null), {
      localeRef: m
    } = sr("Input"), g = Tt(e.defaultValue), u = Iu(e, "value"), w = zt(u, g), C = jn(e), {
      mergedSizeRef: b,
      mergedDisabledRef: x,
      mergedStatusRef: S
    } = C, y = Tt(!1), T = Tt(!1), R = Tt(!1), E = Tt(!1);
    let W = null;
    const _ = Zn(() => {
      const {
        placeholder: V,
        pair: ne
      } = e;
      return ne ? Array.isArray(V) ? V : V === void 0 ? ["", ""] : [V, V] : V === void 0 ? [m.value.placeholder] : [V];
    }), z = Zn(() => {
      const {
        value: V
      } = R, {
        value: ne
      } = w, {
        value: xe
      } = _;
      return !V && (Vi(ne) || Array.isArray(ne) && Vi(ne[0])) && xe[0];
    }), M = Zn(() => {
      const {
        value: V
      } = R, {
        value: ne
      } = w, {
        value: xe
      } = _;
      return !V && xe[1] && (Vi(ne) || Array.isArray(ne) && Vi(ne[1]));
    }), O = Oe(() => e.internalForceFocus || y.value), U = Oe(() => {
      if (x.value || e.readonly || !e.clearable || !O.value && !T.value)
        return !1;
      const {
        value: V
      } = w, {
        value: ne
      } = O;
      return e.pair ? !!(Array.isArray(V) && (V[0] || V[1])) && (T.value || ne) : !!V && (T.value || ne);
    }), L = Zn(() => {
      const {
        showPasswordOn: V
      } = e;
      if (V)
        return V;
      if (e.showPasswordToggle) return "click";
    }), Y = Tt(!1), Q = Zn(() => {
      const {
        textDecoration: V
      } = e;
      return V ? Array.isArray(V) ? V.map((ne) => ({
        textDecoration: ne
      })) : [{
        textDecoration: V
      }] : ["", ""];
    }), J = Tt(void 0), q = () => {
      var V, ne;
      if (e.type === "textarea") {
        const {
          autosize: xe
        } = e;
        if (xe && (J.value = (ne = (V = f.value) === null || V === void 0 ? void 0 : V.$el) === null || ne === void 0 ? void 0 : ne.offsetWidth), !a.value || typeof xe == "boolean") return;
        const {
          paddingTop: Ee,
          paddingBottom: He,
          lineHeight: Ve
        } = window.getComputedStyle(a.value), rt = Number(Ee.slice(0, -2)), ct = Number(He.slice(0, -2)), Xt = Number(Ve.slice(0, -2)), {
          value: En
        } = s;
        if (!En) return;
        if (xe.minRows) {
          const On = Math.max(xe.minRows, 1), vo = `${rt + ct + Xt * On}px`;
          En.style.minHeight = vo;
        }
        if (xe.maxRows) {
          const On = `${rt + ct + Xt * xe.maxRows}px`;
          En.style.maxHeight = On;
        }
      }
    }, I = Zn(() => {
      const {
        maxlength: V
      } = e;
      return V === void 0 ? void 0 : Number(V);
    });
    C_(() => {
      const {
        value: V
      } = w;
      Array.isArray(V) || Ae(V);
    });
    const G = x_().proxy;
    function Z(V, ne) {
      const {
        onUpdateValue: xe,
        "onUpdate:value": Ee,
        onInput: He
      } = e, {
        nTriggerFormInput: Ve
      } = C;
      xe && ie(xe, V, ne), Ee && ie(Ee, V, ne), He && ie(He, V, ne), g.value = V, Ve();
    }
    function ae(V, ne) {
      const {
        onChange: xe
      } = e, {
        nTriggerFormChange: Ee
      } = C;
      xe && ie(xe, V, ne), g.value = V, Ee();
    }
    function le(V) {
      const {
        onBlur: ne
      } = e, {
        nTriggerFormBlur: xe
      } = C;
      ne && ie(ne, V), xe();
    }
    function de(V) {
      const {
        onFocus: ne
      } = e, {
        nTriggerFormFocus: xe
      } = C;
      ne && ie(ne, V), xe();
    }
    function me(V) {
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
    function ke() {
      const {
        onDeactivate: V
      } = e;
      V && ie(V);
    }
    function ge() {
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
    function Be(V) {
      const {
        onWrapperBlur: ne
      } = e;
      ne && ie(ne, V);
    }
    function Me() {
      R.value = !0;
    }
    function oe(V) {
      R.value = !1, V.target === h.value ? k(V, 1) : k(V, 0);
    }
    function k(V, ne = 0, xe = "input") {
      const Ee = V.target.value;
      if (Ae(Ee), V instanceof InputEvent && !V.isComposing && (R.value = !1), e.type === "textarea") {
        const {
          value: Ve
        } = f;
        Ve && Ve.syncUnifiedContainer();
      }
      if (W = Ee, R.value) return;
      v.recordCursor();
      const He = $(Ee);
      if (He)
        if (!e.pair)
          xe === "input" ? Z(Ee, {
            source: ne
          }) : ae(Ee, {
            source: ne
          });
        else {
          let {
            value: Ve
          } = w;
          Array.isArray(Ve) ? Ve = [Ve[0], Ve[1]] : Ve = ["", ""], Ve[ne] = Ee, xe === "input" ? Z(Ve, {
            source: ne
          }) : ae(Ve, {
            source: ne
          });
        }
      G.$forceUpdate(), He || Mu(v.restoreCursor);
    }
    function $(V) {
      const {
        countGraphemes: ne,
        maxlength: xe,
        minlength: Ee
      } = e;
      if (ne) {
        let Ve;
        if (xe !== void 0 && (Ve === void 0 && (Ve = ne(V)), Ve > Number(xe)) || Ee !== void 0 && (Ve === void 0 && (Ve = ne(V)), Ve < Number(xe)))
          return !1;
      }
      const {
        allowInput: He
      } = e;
      return typeof He == "function" ? He(V) : !0;
    }
    function D(V) {
      X(V), V.relatedTarget === l.value && ke(), V.relatedTarget !== null && (V.relatedTarget === c.value || V.relatedTarget === h.value || V.relatedTarget === a.value) || (E.value = !1), F(V, "blur"), p.value = null;
    }
    function ee(V, ne) {
      ce(V), y.value = !0, E.value = !0, ge(), F(V, "focus"), ne === 0 ? p.value = c.value : ne === 1 ? p.value = h.value : ne === 2 && (p.value = a.value);
    }
    function ve(V) {
      e.passivelyActivated && (Be(V), F(V, "blur"));
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
    function Te(V) {
      me(V), lt();
    }
    function lt() {
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
    function pt(V) {
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
            value: Ee
          } = l;
          if (Ee) {
            const {
              left: He,
              top: Ve,
              width: rt,
              height: ct
            } = Ee.getBoundingClientRect(), Xt = 14;
            if (He + rt - Xt < V.clientX && V.clientX < He + rt && Ve + ct - Xt < V.clientY && V.clientY < Ve + ct)
              return;
          }
        }
        V.preventDefault(), y.value || te();
      }
    }
    function Ye() {
      var V;
      T.value = !0, e.type === "textarea" && ((V = f.value) === null || V === void 0 || V.handleMouseEnterWrapper());
    }
    function Ze() {
      var V;
      T.value = !1, e.type === "textarea" && ((V = f.value) === null || V === void 0 || V.handleMouseLeaveWrapper());
    }
    function mt() {
      x.value || L.value === "click" && (Y.value = !Y.value);
    }
    function et(V) {
      if (x.value) return;
      V.preventDefault();
      const ne = (Ee) => {
        Ee.preventDefault(), Je("mouseup", document, ne);
      };
      if (at("mouseup", document, ne), L.value !== "mousedown") return;
      Y.value = !0;
      const xe = () => {
        Y.value = !1, Je("mouseup", document, xe);
      };
      at("mouseup", document, xe);
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
          value: Ee
        } = E;
        if (Ee) {
          e.internalDeactivateOnEnter && N();
          return;
        }
        V.preventDefault(), e.type === "textarea" ? (ne = a.value) === null || ne === void 0 || ne.focus() : (xe = c.value) === null || xe === void 0 || xe.focus();
      }
    }
    function N() {
      e.passivelyActivated && (E.value = !1, Mu(() => {
        var V;
        (V = l.value) === null || V === void 0 || V.focus();
      }));
    }
    function te() {
      var V, ne, xe;
      x.value || (e.passivelyActivated ? (V = l.value) === null || V === void 0 || V.focus() : ((ne = a.value) === null || ne === void 0 || ne.focus(), (xe = c.value) === null || xe === void 0 || xe.focus()));
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
      x.value || (a.value ? a.value.focus() : c.value && c.value.focus());
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
    function Ae(V) {
      const {
        type: ne,
        pair: xe,
        autosize: Ee
      } = e;
      if (!xe && Ee)
        if (ne === "textarea") {
          const {
            value: He
          } = s;
          He && (He.textContent = `${V ?? ""}\r
`);
        } else {
          const {
            value: He
          } = d;
          He && (V ? He.textContent = V : He.innerHTML = "&nbsp;");
        }
    }
    function ot() {
      q();
    }
    const Ne = Tt({
      top: "0"
    });
    function Pt(V) {
      var ne;
      const {
        scrollTop: xe
      } = V.target;
      Ne.value.top = `${-xe}px`, (ne = f.value) === null || ne === void 0 || ne.syncUnifiedContainer();
    }
    let It = null;
    Vu(() => {
      const {
        autosize: V,
        type: ne
      } = e;
      V && ne === "textarea" ? It = Au(w, (xe) => {
        !Array.isArray(xe) && xe !== W && Ae(xe);
      }) : It == null || It();
    });
    let At = null;
    Vu(() => {
      e.type === "textarea" ? At = Au(w, (V) => {
        var ne;
        !Array.isArray(V) && V !== W && ((ne = f.value) === null || ne === void 0 || ne.syncUnifiedContainer());
      }) : At == null || At();
    }), S_(Qp, {
      mergedValueRef: w,
      maxlengthRef: I,
      mergedClsPrefixRef: t,
      countGraphemesRef: Iu(e, "countGraphemes")
    });
    const Nt = {
      wrapperElRef: l,
      inputElRef: c,
      textareaElRef: a,
      isCompositing: R,
      clear: lt,
      focus: te,
      blur: se,
      select: ue,
      deactivate: we,
      activate: be,
      scrollTo: Ce
    }, Ht = Mt("Input", r, t), Qt = Zn(() => {
      const {
        value: V
      } = b, {
        common: {
          cubicBezierEaseInOut: ne
        },
        self: {
          color: xe,
          borderRadius: Ee,
          textColor: He,
          caretColor: Ve,
          caretColorError: rt,
          caretColorWarning: ct,
          textDecorationColor: Xt,
          border: En,
          borderDisabled: On,
          borderHover: vo,
          borderFocus: fr,
          placeholderColor: hr,
          placeholderColorDisabled: pr,
          lineHeightTextarea: vr,
          colorDisabled: mr,
          colorFocus: Kn,
          textColorDisabled: qn,
          boxShadowFocus: Ia,
          iconSize: Aa,
          colorFocusWarning: Va,
          boxShadowFocusWarning: Ba,
          borderWarning: La,
          borderFocusWarning: Da,
          borderHoverWarning: Na,
          colorFocusError: Ha,
          boxShadowFocusError: ja,
          borderError: Wa,
          borderFocusError: Ua,
          borderHoverError: Iv,
          clearSize: Av,
          clearColor: Vv,
          clearColorHover: Bv,
          clearColorPressed: Lv,
          iconColor: Dv,
          iconColorDisabled: Nv,
          suffixTextColor: Hv,
          countTextColor: jv,
          countTextColorDisabled: Wv,
          iconColorHover: Uv,
          iconColorPressed: Kv,
          loadingColor: qv,
          loadingColorError: Gv,
          loadingColorWarning: Xv,
          fontWeight: Yv,
          [re("padding", V)]: Zv,
          [re("fontSize", V)]: Jv,
          [re("height", V)]: Qv
        }
      } = i.value, {
        left: em,
        right: tm
      } = Yt(Zv);
      return {
        "--n-bezier": ne,
        "--n-count-text-color": jv,
        "--n-count-text-color-disabled": Wv,
        "--n-color": xe,
        "--n-font-size": Jv,
        "--n-font-weight": Yv,
        "--n-border-radius": Ee,
        "--n-height": Qv,
        "--n-padding-left": em,
        "--n-padding-right": tm,
        "--n-text-color": He,
        "--n-caret-color": Ve,
        "--n-text-decoration-color": Xt,
        "--n-border": En,
        "--n-border-disabled": On,
        "--n-border-hover": vo,
        "--n-border-focus": fr,
        "--n-placeholder-color": hr,
        "--n-placeholder-color-disabled": pr,
        "--n-icon-size": Aa,
        "--n-line-height-textarea": vr,
        "--n-color-disabled": mr,
        "--n-color-focus": Kn,
        "--n-text-color-disabled": qn,
        "--n-box-shadow-focus": Ia,
        "--n-loading-color": qv,
        // form warning
        "--n-caret-color-warning": ct,
        "--n-color-focus-warning": Va,
        "--n-box-shadow-focus-warning": Ba,
        "--n-border-warning": La,
        "--n-border-focus-warning": Da,
        "--n-border-hover-warning": Na,
        "--n-loading-color-warning": Xv,
        // form error
        "--n-caret-color-error": rt,
        "--n-color-focus-error": Ha,
        "--n-box-shadow-focus-error": ja,
        "--n-border-error": Wa,
        "--n-border-focus-error": Ua,
        "--n-border-hover-error": Iv,
        "--n-loading-color-error": Gv,
        // clear-button
        "--n-clear-color": Vv,
        "--n-clear-size": Av,
        "--n-clear-color-hover": Bv,
        "--n-clear-color-pressed": Lv,
        "--n-icon-color": Dv,
        "--n-icon-color-hover": Uv,
        "--n-icon-color-pressed": Kv,
        "--n-icon-color-disabled": Nv,
        "--n-suffix-text-color": Hv
      };
    }), jt = o ? wt("input", Zn(() => {
      const {
        value: V
      } = b;
      return V[0];
    }), Qt, e) : void 0;
    return Object.assign(Object.assign({}, Nt), {
      // DOM ref
      wrapperElRef: l,
      inputElRef: c,
      inputMirrorElRef: d,
      inputEl2Ref: h,
      textareaElRef: a,
      textareaMirrorElRef: s,
      textareaScrollbarInstRef: f,
      // value
      rtlEnabled: Ht,
      uncontrolledValue: g,
      mergedValue: w,
      passwordVisible: Y,
      mergedPlaceholder: _,
      showPlaceholder1: z,
      showPlaceholder2: M,
      mergedFocus: O,
      isComposing: R,
      activated: E,
      showClearButton: U,
      mergedSize: b,
      mergedDisabled: x,
      textDecorationStyle: Q,
      mergedClsPrefix: t,
      mergedBordered: n,
      mergedShowPasswordOn: L,
      placeholderStyle: Ne,
      mergedStatus: S,
      textAreaScrollContainerWidth: J,
      // methods
      handleTextAreaScroll: Pt,
      handleCompositionStart: Me,
      handleCompositionEnd: oe,
      handleInput: k,
      handleInputBlur: D,
      handleInputFocus: ee,
      handleWrapperBlur: ve,
      handleWrapperFocus: he,
      handleMouseEnter: Ye,
      handleMouseLeave: Ze,
      handleMouseDown: pt,
      handleChange: j,
      handleClick: pe,
      handleClear: Te,
      handlePasswordToggleClick: mt,
      handlePasswordToggleMousedown: et,
      handleWrapperKeydown: Re,
      handleWrapperKeyup: fe,
      handleTextAreaMirrorResize: ot,
      getTextareaScrollContainer: () => a.value,
      mergedTheme: i,
      cssVars: o ? void 0 : Qt,
      themeClass: jt == null ? void 0 : jt.themeClass,
      onRender: jt == null ? void 0 : jt.onRender
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
    } = this, v = this.$slots;
    return p == null || p(), De("div", {
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
    }, De("div", {
      class: `${a}-input-wrapper`
    }, We(v.prefix, (f) => f && De("div", {
      class: `${a}-input__prefix`
    }, f)), c === "textarea" ? De(si, {
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
        var f, m;
        const {
          textAreaScrollContainerWidth: g
        } = this, u = {
          width: this.autosize && g && `${g}px`
        };
        return De(y_, null, De("textarea", Object.assign({}, this.inputProps, {
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
          style: [this.textDecorationStyle[0], (m = this.inputProps) === null || m === void 0 ? void 0 : m.style, u],
          onBlur: this.handleInputBlur,
          onFocus: (w) => {
            this.handleInputFocus(w, 2);
          },
          onInput: this.handleInput,
          onChange: this.handleChange,
          onScroll: this.handleTextAreaScroll
        })), this.showPlaceholder1 ? De("div", {
          class: `${a}-input__placeholder`,
          style: [this.placeholderStyle, u],
          key: "placeholder"
        }, this.mergedPlaceholder[0]) : null, this.autosize ? De(To, {
          onResize: this.handleTextAreaMirrorResize
        }, {
          default: () => De("div", {
            ref: "textareaMirrorElRef",
            class: `${a}-input__textarea-mirror`,
            key: "mirror"
          })
        }) : null);
      }
    }) : De("div", {
      class: `${a}-input__input`
    }, De("input", Object.assign({
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
    })), this.showPlaceholder1 ? De("div", {
      class: `${a}-input__placeholder`
    }, De("span", null, this.mergedPlaceholder[0])) : null, this.autosize ? De("div", {
      class: `${a}-input__input-mirror`,
      key: "mirror",
      ref: "inputMirrorElRef"
    }, " ") : null), !this.pair && We(v.suffix, (f) => f || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? De("div", {
      class: `${a}-input__suffix`
    }, [We(v["clear-icon-placeholder"], (m) => (this.clearable || m) && De(Ss, {
      clsPrefix: a,
      show: this.showClearButton,
      onClear: this.handleClear
    }, {
      placeholder: () => m,
      icon: () => {
        var g, u;
        return (u = (g = this.$slots)["clear-icon"]) === null || u === void 0 ? void 0 : u.call(g);
      }
    })), this.internalLoadingBeforeSuffix ? null : f, this.loading !== void 0 ? De(Yp, {
      clsPrefix: a,
      loading: this.loading,
      showArrow: !1,
      showClear: !1,
      style: this.cssVars
    }) : null, this.internalLoadingBeforeSuffix ? f : null, this.showCount && this.type !== "textarea" ? De(zu, null, {
      default: (m) => {
        var g;
        const {
          renderCount: u
        } = this;
        return u ? u(m) : (g = v.count) === null || g === void 0 ? void 0 : g.call(v, m);
      }
    }) : null, this.mergedShowPasswordOn && this.type === "password" ? De("div", {
      class: `${a}-input__eye`,
      onMousedown: this.handlePasswordToggleMousedown,
      onClick: this.handlePasswordToggleClick
    }, this.passwordVisible ? vn(v["password-visible-icon"], () => [De(Ct, {
      clsPrefix: a
    }, {
      default: () => De(_R, null)
    })]) : vn(v["password-invisible-icon"], () => [De(Ct, {
      clsPrefix: a
    }, {
      default: () => De(FR, null)
    })])) : null]) : null)), this.pair ? De("span", {
      class: `${a}-input__separator`
    }, vn(v.separator, () => [this.separator])) : null, this.pair ? De("div", {
      class: `${a}-input-wrapper`
    }, De("div", {
      class: `${a}-input__input`
    }, De("input", {
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
    }), this.showPlaceholder2 ? De("div", {
      class: `${a}-input__placeholder`
    }, De("span", null, this.mergedPlaceholder[1])) : null), We(v.suffix, (f) => (this.clearable || f) && De("div", {
      class: `${a}-input__suffix`
    }, [this.clearable && De(Ss, {
      clsPrefix: a,
      show: this.showClearButton,
      onClear: this.handleClear
    }, {
      icon: () => {
        var m;
        return (m = v["clear-icon"]) === null || m === void 0 ? void 0 : m.call(v);
      },
      placeholder: () => {
        var m;
        return (m = v["clear-icon-placeholder"]) === null || m === void 0 ? void 0 : m.call(v);
      }
    }), f]))) : null, this.mergedBordered ? De("div", {
      class: `${a}-input__border`
    }) : null, this.mergedBordered ? De("div", {
      class: `${a}-input__state-border`
    }) : null, this.showCount && c === "textarea" ? De(zu, null, {
      default: (f) => {
        var m;
        const {
          renderCount: g
        } = this;
        return g ? g(f) : (m = v.count) === null || m === void 0 ? void 0 : m.call(v, f);
      }
    }) : null);
  }
});
function xa(e) {
  return e.type === "group";
}
function ev(e) {
  return e.type === "ignored";
}
function Pl(e, t) {
  try {
    return !!(1 + t.toString().toLowerCase().indexOf(e.trim().toLowerCase()));
  } catch {
    return !1;
  }
}
function tv(e, t) {
  return {
    getIsGroup: xa,
    getIgnored: ev,
    getKey(o) {
      return xa(o) ? o.name || o.key || "key-required" : o[e];
    },
    getChildren(o) {
      return o[t];
    }
  };
}
function R_(e, t, n, o) {
  if (!t) return e;
  function r(i) {
    if (!Array.isArray(i)) return [];
    const l = [];
    for (const a of i)
      if (xa(a)) {
        const s = r(a[o]);
        s.length && l.push(Object.assign({}, a, {
          [o]: s
        }));
      } else {
        if (ev(a))
          continue;
        t(n, a) && l.push(a);
      }
    return l;
  }
  return r(e);
}
function k_(e, t, n) {
  const o = /* @__PURE__ */ new Map();
  return e.forEach((r) => {
    xa(r) ? r[n].forEach((i) => {
      o.set(i[t], i);
    }) : o.set(r[t], r);
  }), o;
}
function go(e) {
  return je(e, [255, 255, 255, 0.16]);
}
function Bi(e) {
  return je(e, [0, 0, 0, 0.12]);
}
const P_ = "n-button-group", __ = {
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
function T_(e) {
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
    primaryColorHover: v,
    primaryColorPressed: f,
    borderColor: m,
    primaryColor: g,
    baseColor: u,
    infoColor: w,
    infoColorHover: C,
    infoColorPressed: b,
    successColor: x,
    successColorHover: S,
    successColorPressed: y,
    warningColor: T,
    warningColorHover: R,
    warningColorPressed: E,
    errorColor: W,
    errorColorHover: _,
    errorColorPressed: z,
    fontWeight: M,
    buttonColor2: O,
    buttonColor2Hover: U,
    buttonColor2Pressed: L,
    fontWeightStrong: Y
  } = e;
  return Object.assign(Object.assign({}, __), {
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
    colorSecondaryHover: U,
    colorSecondaryPressed: L,
    // tertiary
    colorTertiary: O,
    colorTertiaryHover: U,
    colorTertiaryPressed: L,
    // quaternary
    colorQuaternary: "#0000",
    colorQuaternaryHover: U,
    colorQuaternaryPressed: L,
    // default type
    color: "#0000",
    colorHover: "#0000",
    colorPressed: "#0000",
    colorFocus: "#0000",
    colorDisabled: "#0000",
    textColor: h,
    textColorTertiary: p,
    textColorHover: v,
    textColorPressed: f,
    textColorFocus: v,
    textColorDisabled: h,
    textColorText: h,
    textColorTextHover: v,
    textColorTextPressed: f,
    textColorTextFocus: v,
    textColorTextDisabled: h,
    textColorGhost: h,
    textColorGhostHover: v,
    textColorGhostPressed: f,
    textColorGhostFocus: v,
    textColorGhostDisabled: h,
    border: `1px solid ${m}`,
    borderHover: `1px solid ${v}`,
    borderPressed: `1px solid ${f}`,
    borderFocus: `1px solid ${v}`,
    borderDisabled: `1px solid ${m}`,
    rippleColor: g,
    // primary
    colorPrimary: g,
    colorHoverPrimary: v,
    colorPressedPrimary: f,
    colorFocusPrimary: v,
    colorDisabledPrimary: g,
    textColorPrimary: u,
    textColorHoverPrimary: u,
    textColorPressedPrimary: u,
    textColorFocusPrimary: u,
    textColorDisabledPrimary: u,
    textColorTextPrimary: g,
    textColorTextHoverPrimary: v,
    textColorTextPressedPrimary: f,
    textColorTextFocusPrimary: v,
    textColorTextDisabledPrimary: h,
    textColorGhostPrimary: g,
    textColorGhostHoverPrimary: v,
    textColorGhostPressedPrimary: f,
    textColorGhostFocusPrimary: v,
    textColorGhostDisabledPrimary: g,
    borderPrimary: `1px solid ${g}`,
    borderHoverPrimary: `1px solid ${v}`,
    borderPressedPrimary: `1px solid ${f}`,
    borderFocusPrimary: `1px solid ${v}`,
    borderDisabledPrimary: `1px solid ${g}`,
    rippleColorPrimary: g,
    // info
    colorInfo: w,
    colorHoverInfo: C,
    colorPressedInfo: b,
    colorFocusInfo: C,
    colorDisabledInfo: w,
    textColorInfo: u,
    textColorHoverInfo: u,
    textColorPressedInfo: u,
    textColorFocusInfo: u,
    textColorDisabledInfo: u,
    textColorTextInfo: w,
    textColorTextHoverInfo: C,
    textColorTextPressedInfo: b,
    textColorTextFocusInfo: C,
    textColorTextDisabledInfo: h,
    textColorGhostInfo: w,
    textColorGhostHoverInfo: C,
    textColorGhostPressedInfo: b,
    textColorGhostFocusInfo: C,
    textColorGhostDisabledInfo: w,
    borderInfo: `1px solid ${w}`,
    borderHoverInfo: `1px solid ${C}`,
    borderPressedInfo: `1px solid ${b}`,
    borderFocusInfo: `1px solid ${C}`,
    borderDisabledInfo: `1px solid ${w}`,
    rippleColorInfo: w,
    // success
    colorSuccess: x,
    colorHoverSuccess: S,
    colorPressedSuccess: y,
    colorFocusSuccess: S,
    colorDisabledSuccess: x,
    textColorSuccess: u,
    textColorHoverSuccess: u,
    textColorPressedSuccess: u,
    textColorFocusSuccess: u,
    textColorDisabledSuccess: u,
    textColorTextSuccess: x,
    textColorTextHoverSuccess: S,
    textColorTextPressedSuccess: y,
    textColorTextFocusSuccess: S,
    textColorTextDisabledSuccess: h,
    textColorGhostSuccess: x,
    textColorGhostHoverSuccess: S,
    textColorGhostPressedSuccess: y,
    textColorGhostFocusSuccess: S,
    textColorGhostDisabledSuccess: x,
    borderSuccess: `1px solid ${x}`,
    borderHoverSuccess: `1px solid ${S}`,
    borderPressedSuccess: `1px solid ${y}`,
    borderFocusSuccess: `1px solid ${S}`,
    borderDisabledSuccess: `1px solid ${x}`,
    rippleColorSuccess: x,
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
    colorPressedError: z,
    colorFocusError: _,
    colorDisabledError: W,
    textColorError: u,
    textColorHoverError: u,
    textColorPressedError: u,
    textColorFocusError: u,
    textColorDisabledError: u,
    textColorTextError: W,
    textColorTextHoverError: _,
    textColorTextPressedError: z,
    textColorTextFocusError: _,
    textColorTextDisabledError: h,
    textColorGhostError: W,
    textColorGhostHoverError: _,
    textColorGhostPressedError: z,
    textColorGhostFocusError: _,
    textColorGhostDisabledError: W,
    borderError: `1px solid ${W}`,
    borderHoverError: `1px solid ${_}`,
    borderPressedError: `1px solid ${z}`,
    borderFocusError: `1px solid ${_}`,
    borderDisabledError: `1px solid ${W}`,
    rippleColorError: W,
    waveOpacity: "0.6",
    fontWeight: M,
    fontWeightStrong: Y
  });
}
const gd = {
  name: "Button",
  common: vt,
  self: T_
}, F_ = H([A("button", `
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
 `, [K("color", [B("border", {
  borderColor: "var(--n-border-color)"
}), K("disabled", [B("border", {
  borderColor: "var(--n-border-color-disabled)"
})]), Qe("disabled", [H("&:focus", [B("state-border", {
  borderColor: "var(--n-border-color-focus)"
})]), H("&:hover", [B("state-border", {
  borderColor: "var(--n-border-color-hover)"
})]), H("&:active", [B("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})]), K("pressed", [B("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})])])]), K("disabled", {
  backgroundColor: "var(--n-color-disabled)",
  color: "var(--n-text-color-disabled)"
}, [B("border", {
  border: "var(--n-border-disabled)"
})]), Qe("disabled", [H("&:focus", {
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
})]), K("pressed", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [B("state-border", {
  border: "var(--n-border-pressed)"
})])]), K("loading", "cursor: wait;"), A("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [K("active", {
  zIndex: 1,
  animationName: "button-wave-spread, button-wave-opacity"
})]), ar && "MozBoxSizing" in document.createElement("div").style ? H("&::moz-focus-inner", {
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
 `, [A("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [rn({
  top: "50%",
  originalTransform: "translateY(-50%)"
})]), JP()]), B("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [H("~", [B("icon", {
  margin: "var(--n-icon-margin)",
  marginRight: 0
})])]), K("block", `
 display: flex;
 width: 100%;
 `), K("dashed", [B("border, state-border", {
  borderStyle: "dashed !important"
})]), K("disabled", {
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
})]), Li = window.Vue.computed, E_ = window.Vue.defineComponent, yn = window.Vue.h, O_ = window.Vue.inject, _l = window.Vue.ref;
window.Vue.watchEffect;
const z_ = Object.assign(Object.assign({}, _e.props), {
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
    default: !Jp
  }
}), ri = E_({
  name: "Button",
  props: z_,
  slots: Object,
  setup(e) {
    const t = _l(null), n = _l(null), o = _l(!1), r = Oe(() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered), i = O_(P_, {}), {
      mergedSizeRef: l
    } = jn({}, {
      defaultSize: "medium",
      mergedSize: (b) => {
        const {
          size: x
        } = e;
        if (x) return x;
        const {
          size: S
        } = i;
        if (S) return S;
        const {
          mergedSize: y
        } = b || {};
        return y ? y.value : "medium";
      }
    }), a = Li(() => e.focusable && !e.disabled), s = (b) => {
      var x;
      a.value || b.preventDefault(), !e.nativeFocusBehavior && (b.preventDefault(), !e.disabled && a.value && ((x = t.value) === null || x === void 0 || x.focus({
        preventScroll: !0
      })));
    }, d = (b) => {
      var x;
      if (!e.disabled && !e.loading) {
        const {
          onClick: S
        } = e;
        S && ie(S, b), e.text || (x = n.value) === null || x === void 0 || x.play();
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
      inlineThemeDisabled: v,
      mergedClsPrefixRef: f,
      mergedRtlRef: m
    } = qe(e), g = _e("Button", "-button", F_, gd, e, f), u = Mt("Button", m, f), w = Li(() => {
      const b = g.value, {
        common: {
          cubicBezierEaseInOut: x,
          cubicBezierEaseOut: S
        },
        self: y
      } = b, {
        rippleDuration: T,
        opacityDisabled: R,
        fontWeight: E,
        fontWeightStrong: W
      } = y, _ = l.value, {
        dashed: z,
        type: M,
        ghost: O,
        text: U,
        color: L,
        round: Y,
        circle: Q,
        textColor: J,
        secondary: q,
        tertiary: I,
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
      const de = M === "tertiary", me = M === "default", X = de ? "default" : M;
      if (U) {
        const D = J || L;
        le = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": "#0000",
          "--n-text-color": D || y[re("textColorText", X)],
          "--n-text-color-hover": D ? go(D) : y[re("textColorTextHover", X)],
          "--n-text-color-pressed": D ? Bi(D) : y[re("textColorTextPressed", X)],
          "--n-text-color-focus": D ? go(D) : y[re("textColorTextHover", X)],
          "--n-text-color-disabled": D || y[re("textColorTextDisabled", X)]
        };
      } else if (O || z) {
        const D = J || L;
        le = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": L || y[re("rippleColor", X)],
          "--n-text-color": D || y[re("textColorGhost", X)],
          "--n-text-color-hover": D ? go(D) : y[re("textColorGhostHover", X)],
          "--n-text-color-pressed": D ? Bi(D) : y[re("textColorGhostPressed", X)],
          "--n-text-color-focus": D ? go(D) : y[re("textColorGhostHover", X)],
          "--n-text-color-disabled": D || y[re("textColorGhostDisabled", X)]
        };
      } else if (q) {
        const D = me ? y.textColor : de ? y.textColorTertiary : y[re("color", X)], ee = L || D, ve = M !== "default" && M !== "tertiary";
        le = {
          "--n-color": ve ? Fe(ee, {
            alpha: Number(y.colorOpacitySecondary)
          }) : y.colorSecondary,
          "--n-color-hover": ve ? Fe(ee, {
            alpha: Number(y.colorOpacitySecondaryHover)
          }) : y.colorSecondaryHover,
          "--n-color-pressed": ve ? Fe(ee, {
            alpha: Number(y.colorOpacitySecondaryPressed)
          }) : y.colorSecondaryPressed,
          "--n-color-focus": ve ? Fe(ee, {
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
      } else if (I || G) {
        const D = me ? y.textColor : de ? y.textColorTertiary : y[re("color", X)], ee = L || D;
        I ? (le["--n-color"] = y.colorTertiary, le["--n-color-hover"] = y.colorTertiaryHover, le["--n-color-pressed"] = y.colorTertiaryPressed, le["--n-color-focus"] = y.colorSecondaryHover, le["--n-color-disabled"] = y.colorTertiary) : (le["--n-color"] = y.colorQuaternary, le["--n-color-hover"] = y.colorQuaternaryHover, le["--n-color-pressed"] = y.colorQuaternaryPressed, le["--n-color-focus"] = y.colorQuaternaryHover, le["--n-color-disabled"] = y.colorQuaternary), le["--n-ripple-color"] = "#0000", le["--n-text-color"] = ee, le["--n-text-color-hover"] = ee, le["--n-text-color-pressed"] = ee, le["--n-text-color-focus"] = ee, le["--n-text-color-disabled"] = ee;
      } else
        le = {
          "--n-color": L || y[re("color", X)],
          "--n-color-hover": L ? go(L) : y[re("colorHover", X)],
          "--n-color-pressed": L ? Bi(L) : y[re("colorPressed", X)],
          "--n-color-focus": L ? go(L) : y[re("colorFocus", X)],
          "--n-color-disabled": L || y[re("colorDisabled", X)],
          "--n-ripple-color": L || y[re("rippleColor", X)],
          "--n-text-color": J || (L ? y.textColorPrimary : de ? y.textColorTertiary : y[re("textColor", X)]),
          "--n-text-color-hover": J || (L ? y.textColorHoverPrimary : y[re("textColorHover", X)]),
          "--n-text-color-pressed": J || (L ? y.textColorPressedPrimary : y[re("textColorPressed", X)]),
          "--n-text-color-focus": J || (L ? y.textColorFocusPrimary : y[re("textColorFocus", X)]),
          "--n-text-color-disabled": J || (L ? y.textColorDisabledPrimary : y[re("textColorDisabled", X)])
        };
      let ce = {
        "--n-border": "initial",
        "--n-border-hover": "initial",
        "--n-border-pressed": "initial",
        "--n-border-focus": "initial",
        "--n-border-disabled": "initial"
      };
      U ? ce = {
        "--n-border": "none",
        "--n-border-hover": "none",
        "--n-border-pressed": "none",
        "--n-border-focus": "none",
        "--n-border-disabled": "none"
      } : ce = {
        "--n-border": y[re("border", X)],
        "--n-border-hover": y[re("borderHover", X)],
        "--n-border-pressed": y[re("borderPressed", X)],
        "--n-border-focus": y[re("borderFocus", X)],
        "--n-border-disabled": y[re("borderDisabled", X)]
      };
      const {
        [re("height", _)]: ke,
        [re("fontSize", _)]: ge,
        [re("padding", _)]: $e,
        [re("paddingRound", _)]: Se,
        [re("iconSize", _)]: Be,
        [re("borderRadius", _)]: Me,
        [re("iconMargin", _)]: oe,
        waveOpacity: k
      } = y, $ = {
        "--n-width": Q && !U ? ke : "initial",
        "--n-height": U ? "initial" : ke,
        "--n-font-size": ge,
        "--n-padding": Q || U ? "initial" : Y ? Se : $e,
        "--n-icon-size": Be,
        "--n-icon-margin": oe,
        "--n-border-radius": U ? "initial" : Q || Y ? ke : Me
      };
      return Object.assign(Object.assign(Object.assign(Object.assign({
        "--n-bezier": x,
        "--n-bezier-ease-out": S,
        "--n-ripple-duration": T,
        "--n-opacity-disabled": R,
        "--n-wave-opacity": k
      }, ae), le), ce), $);
    }), C = v ? wt("button", Li(() => {
      let b = "";
      const {
        dashed: x,
        type: S,
        ghost: y,
        text: T,
        color: R,
        round: E,
        circle: W,
        textColor: _,
        secondary: z,
        tertiary: M,
        quaternary: O,
        strong: U
      } = e;
      x && (b += "a"), y && (b += "b"), T && (b += "c"), E && (b += "d"), W && (b += "e"), z && (b += "f"), M && (b += "g"), O && (b += "h"), U && (b += "i"), R && (b += `j${pa(R)}`), _ && (b += `k${pa(_)}`);
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
      customColorCssVars: Li(() => {
        const {
          color: b
        } = e;
        if (!b) return null;
        const x = go(b);
        return {
          "--n-border-color": b,
          "--n-border-color-hover": x,
          "--n-border-color-pressed": Bi(b),
          "--n-border-color-focus": x,
          "--n-border-color-disabled": b
        };
      }),
      cssVars: v ? void 0 : w,
      themeClass: C == null ? void 0 : C.themeClass,
      onRender: C == null ? void 0 : C.onRender
    };
  },
  render() {
    const {
      mergedClsPrefix: e,
      tag: t,
      onRender: n
    } = this;
    n == null || n();
    const o = We(this.$slots.default, (r) => r && yn("span", {
      class: `${e}-button__content`
    }, r));
    return yn(t, {
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
    }, this.iconPlacement === "right" && o, yn(YR, {
      width: !0
    }, {
      default: () => We(this.$slots.icon, (r) => (this.loading || this.renderIcon || r) && yn("span", {
        class: `${e}-button__icon`,
        style: {
          margin: Qo(this.$slots.default) ? "0" : ""
        }
      }, yn(dr, null, {
        default: () => this.loading ? yn(cr, {
          clsPrefix: e,
          key: "loading",
          class: `${e}-icon-slot`,
          strokeWidth: 20
        }) : yn("div", {
          key: "icon",
          class: `${e}-icon-slot`,
          role: "none"
        }, this.renderIcon ? this.renderIcon() : r)
      })))
    }), this.iconPlacement === "left" && o, this.text ? null : yn(i_, {
      ref: "waveElRef",
      clsPrefix: e
    }), this.showBorder ? yn("div", {
      "aria-hidden": !0,
      class: `${e}-button__border`,
      style: this.customColorCssVars
    }) : null, this.showBorder ? yn("div", {
      "aria-hidden": !0,
      class: `${e}-button__state-border`,
      style: this.customColorCssVars
    }) : null);
  }
}), Bu = ri, M_ = {
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
function I_(e) {
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
    closeColorHover: v,
    closeColorPressed: f,
    modalColor: m,
    boxShadow1: g,
    popoverColor: u,
    actionColor: w
  } = e;
  return Object.assign(Object.assign({}, M_), {
    lineHeight: o,
    color: i,
    colorModal: m,
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
    closeColorHover: v,
    closeColorPressed: f,
    closeBorderRadius: n,
    closeIconColor: c,
    closeIconColorHover: h,
    closeIconColorPressed: p,
    fontSizeSmall: r,
    fontSizeMedium: r,
    fontSizeLarge: r,
    fontSizeHuge: r,
    boxShadow: g,
    borderRadius: n
  });
}
const A_ = {
  common: vt,
  self: I_
}, V_ = H([A("card", `
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
 `, [xb({
  background: "var(--n-color-modal)"
}), K("hoverable", [H("&:hover", "box-shadow: var(--n-box-shadow);")]), K("content-segmented", [H(">", [B("content", {
  paddingTop: "var(--n-padding-bottom)"
})])]), K("content-soft-segmented", [H(">", [B("content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])]), K("footer-segmented", [H(">", [B("footer", {
  paddingTop: "var(--n-padding-bottom)"
})])]), K("footer-soft-segmented", [H(">", [B("footer", `
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]), H(">", [A("card-header", `
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
 `)]), A("card-cover", `
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `, [H("img", `
 display: block;
 width: 100%;
 `)]), K("bordered", `
 border: 1px solid var(--n-border-color);
 `, [H("&:target", "border-color: var(--n-color-target);")]), K("action-segmented", [H(">", [B("action", [H("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), K("content-segmented, content-soft-segmented", [H(">", [B("content", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [H("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), K("footer-segmented, footer-soft-segmented", [H(">", [B("footer", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [H("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), K("embedded", `
 background-color: var(--n-color-embedded);
 `)]), js(A("card", `
 background: var(--n-color-modal);
 `, [K("embedded", `
 background-color: var(--n-color-embedded-modal);
 `)])), Ws(A("card", `
 background: var(--n-color-popover);
 `, [K("embedded", `
 background-color: var(--n-color-embedded-popover);
 `)]))]), Lu = window.Vue.computed, B_ = window.Vue.defineComponent, Vn = window.Vue.h, L_ = {
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
}, D_ = Object.assign(Object.assign({}, _e.props), L_), Du = B_({
  name: "Card",
  props: D_,
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
    } = qe(e), i = _e("Card", "-card", V_, A_, e, o), l = Mt("Card", r, o), a = Lu(() => {
      const {
        size: d
      } = e, {
        self: {
          color: c,
          colorModal: h,
          colorTarget: p,
          textColor: v,
          titleTextColor: f,
          titleFontWeight: m,
          borderColor: g,
          actionColor: u,
          borderRadius: w,
          lineHeight: C,
          closeIconColor: b,
          closeIconColorHover: x,
          closeIconColorPressed: S,
          closeColorHover: y,
          closeColorPressed: T,
          closeBorderRadius: R,
          closeIconSize: E,
          closeSize: W,
          boxShadow: _,
          colorPopover: z,
          colorEmbedded: M,
          colorEmbeddedModal: O,
          colorEmbeddedPopover: U,
          [re("padding", d)]: L,
          [re("fontSize", d)]: Y,
          [re("titleFontSize", d)]: Q
        },
        common: {
          cubicBezierEaseInOut: J
        }
      } = i.value, {
        top: q,
        left: I,
        bottom: G
      } = Yt(L);
      return {
        "--n-bezier": J,
        "--n-border-radius": w,
        "--n-color": c,
        "--n-color-modal": h,
        "--n-color-popover": z,
        "--n-color-embedded": M,
        "--n-color-embedded-modal": O,
        "--n-color-embedded-popover": U,
        "--n-color-target": p,
        "--n-text-color": v,
        "--n-line-height": C,
        "--n-action-color": u,
        "--n-title-text-color": f,
        "--n-title-font-weight": m,
        "--n-close-icon-color": b,
        "--n-close-icon-color-hover": x,
        "--n-close-icon-color-pressed": S,
        "--n-close-color-hover": y,
        "--n-close-color-pressed": T,
        "--n-border-color": g,
        "--n-box-shadow": _,
        // size
        "--n-padding-top": q,
        "--n-padding-bottom": G,
        "--n-padding-left": I,
        "--n-font-size": Y,
        "--n-title-font-size": Q,
        "--n-close-size": W,
        "--n-close-icon-size": E,
        "--n-close-border-radius": R
      };
    }), s = n ? wt("card", Lu(() => e.size[0]), a, e) : void 0;
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
    return i == null || i(), Vn(a, {
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
    }, We(s.cover, (d) => {
      const c = this.cover ? hn([this.cover()]) : d;
      return c && Vn("div", {
        class: `${o}-card-cover`,
        role: "none"
      }, c);
    }), We(s.header, (d) => {
      const {
        title: c
      } = this, h = c ? hn(typeof c == "function" ? [c()] : [c]) : d;
      return h || this.closable ? Vn("div", {
        class: [`${o}-card-header`, this.headerClass],
        style: this.headerStyle,
        role: "heading"
      }, Vn("div", {
        class: `${o}-card-header__main`,
        role: "heading"
      }, h), We(s["header-extra"], (p) => {
        const v = this.headerExtra ? hn([this.headerExtra()]) : p;
        return v && Vn("div", {
          class: [`${o}-card-header__extra`, this.headerExtraClass],
          style: this.headerExtraStyle
        }, v);
      }), this.closable && Vn(Np, {
        clsPrefix: o,
        class: `${o}-card-header__close`,
        onClick: this.handleCloseClick,
        focusable: this.closeFocusable,
        absolute: !0
      })) : null;
    }), We(s.default, (d) => {
      const {
        content: c
      } = this, h = c ? hn(typeof c == "function" ? [c()] : [c]) : d;
      return h && Vn("div", {
        class: [`${o}-card__content`, this.contentClass],
        style: this.contentStyle,
        role: "none"
      }, h);
    }), We(s.footer, (d) => {
      const c = this.footer ? hn([this.footer()]) : d;
      return c && Vn("div", {
        class: [`${o}-card__footer`, this.footerClass],
        style: this.footerStyle,
        role: "none"
      }, c);
    }), We(s.action, (d) => {
      const c = this.action ? hn([this.action()]) : d;
      return c && Vn("div", {
        class: `${o}-card__action`,
        role: "none"
      }, c);
    }));
  }
}), N_ = {
  sizeSmall: "14px",
  sizeMedium: "16px",
  sizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function H_(e) {
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
    borderRadiusSmall: v,
    lineHeight: f
  } = e;
  return Object.assign(Object.assign({}, N_), {
    labelLineHeight: f,
    fontSizeSmall: c,
    fontSizeMedium: h,
    fontSizeLarge: p,
    borderRadius: v,
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
    boxShadowFocus: `0 0 0 2px ${Fe(s, {
      alpha: 0.3
    })}`,
    textColor: d,
    textColorDisabled: l
  });
}
const nv = {
  name: "Checkbox",
  common: vt,
  self: H_
}, Tl = window.Vue.computed, j_ = window.Vue.defineComponent, W_ = window.Vue.h, U_ = window.Vue.provide, K_ = window.Vue.ref, Nu = window.Vue.toRef;
window.Vue.watchEffect;
const ov = "n-checkbox-group", q_ = {
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
}, G_ = j_({
  name: "CheckboxGroup",
  props: q_,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = qe(e), n = jn(e), {
      mergedSizeRef: o,
      mergedDisabledRef: r
    } = n, i = K_(e.defaultValue), l = Tl(() => e.value), a = zt(l, i), s = Tl(() => {
      var h;
      return ((h = a.value) === null || h === void 0 ? void 0 : h.length) || 0;
    }), d = Tl(() => Array.isArray(a.value) ? new Set(a.value) : /* @__PURE__ */ new Set());
    function c(h, p) {
      const {
        nTriggerFormInput: v,
        nTriggerFormChange: f
      } = n, {
        onChange: m,
        "onUpdate:value": g,
        onUpdateValue: u
      } = e;
      if (Array.isArray(a.value)) {
        const w = Array.from(a.value), C = w.findIndex((b) => b === p);
        h ? ~C || (w.push(p), u && ie(u, w, {
          actionType: "check",
          value: p
        }), g && ie(g, w, {
          actionType: "check",
          value: p
        }), v(), f(), i.value = w, m && ie(m, w)) : ~C && (w.splice(C, 1), u && ie(u, w, {
          actionType: "uncheck",
          value: p
        }), g && ie(g, w, {
          actionType: "uncheck",
          value: p
        }), m && ie(m, w), i.value = w, v(), f());
      } else
        h ? (u && ie(u, [p], {
          actionType: "check",
          value: p
        }), g && ie(g, [p], {
          actionType: "check",
          value: p
        }), m && ie(m, [p]), i.value = [p], v(), f()) : (u && ie(u, [], {
          actionType: "uncheck",
          value: p
        }), g && ie(g, [], {
          actionType: "uncheck",
          value: p
        }), m && ie(m, []), i.value = [], v(), f());
    }
    return U_(ov, {
      checkedCountRef: s,
      maxRef: Nu(e, "max"),
      minRef: Nu(e, "min"),
      valueSetRef: d,
      disabledRef: r,
      mergedSizeRef: o,
      toggleCheckbox: c
    }), {
      mergedClsPrefix: t
    };
  },
  render() {
    return W_("div", {
      class: `${this.mergedClsPrefix}-checkbox-group`,
      role: "group"
    }, this.$slots);
  }
}), Hu = window.Vue.h, X_ = () => Hu("svg", {
  viewBox: "0 0 64 64",
  class: "check-icon"
}, Hu("path", {
  d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"
})), ju = window.Vue.h, Y_ = () => ju("svg", {
  viewBox: "0 0 100 100",
  class: "line-icon"
}, ju("path", {
  d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z"
})), Z_ = H([
  A("checkbox", `
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `, [K("show-label", "line-height: var(--n-label-line-height);"), H("&:hover", [A("checkbox-box", [B("border", "border: var(--n-border-checked);")])]), H("&:focus:not(:active)", [A("checkbox-box", [B("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), K("inside-table", [A("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), K("checked", [A("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [A("checkbox-icon", [
    // if not set width to 100%, safari & old chrome won't display the icon
    H(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)
  ])])]), K("indeterminate", [A("checkbox-box", [A("checkbox-icon", [H(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), H(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), K("checked, indeterminate", [H("&:focus:not(:active)", [A("checkbox-box", [B("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), A("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [B("border", {
    border: "var(--n-border-checked)"
  })])]), K("disabled", {
    cursor: "not-allowed"
  }, [K("checked", [A("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [B("border", {
    border: "var(--n-border-disabled-checked)"
  }), A("checkbox-icon", [H(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled-checked)"
  })])])]), A("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [B("border", `
 border: var(--n-border-disabled);
 `), A("checkbox-icon", [H(".check-icon, .line-icon", `
 fill: var(--n-check-mark-color-disabled);
 `)])]), B("label", `
 color: var(--n-text-color-disabled);
 `)]), A("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), A("checkbox-box", `
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
 `), A("checkbox-icon", `
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
 `), rn({
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
  js(A("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)),
  // popover table header checkbox
  Ws(A("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))
]), Wu = window.Vue.computed, J_ = window.Vue.defineComponent, Jn = window.Vue.h, Q_ = window.Vue.inject, Uu = window.Vue.ref, eT = window.Vue.toRef;
window.Vue.watchEffect;
const tT = Object.assign(Object.assign({}, _e.props), {
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
}), bd = J_({
  name: "Checkbox",
  props: tT,
  setup(e) {
    const t = Q_(ov, null), n = Uu(null), {
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = qe(e), l = Uu(e.defaultChecked), a = eT(e, "checked"), s = zt(a, l), d = Oe(() => {
      if (t) {
        const S = t.valueSetRef.value;
        return S && e.value !== void 0 ? S.has(e.value) : !1;
      } else
        return s.value === e.checkedValue;
    }), c = jn(e, {
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
    } = c, v = _e("Checkbox", "-checkbox", Z_, nv, e, o);
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
    function m(S) {
      h.value || f(S);
    }
    function g(S) {
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
    }, C = Mt("Checkbox", i, o), b = Wu(() => {
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
          colorTableHeaderModal: z,
          colorTableHeaderPopover: M,
          checkMarkColor: O,
          checkMarkColorDisabled: U,
          border: L,
          borderFocus: Y,
          borderDisabled: Q,
          borderChecked: J,
          boxShadowFocus: q,
          textColor: I,
          textColorDisabled: G,
          checkMarkColorDisabledChecked: Z,
          colorDisabledChecked: ae,
          borderDisabledChecked: le,
          labelPadding: de,
          labelLineHeight: me,
          labelFontWeight: X,
          [re("fontSize", S)]: ce,
          [re("size", S)]: ke
        }
      } = v.value;
      return {
        "--n-label-line-height": me,
        "--n-label-font-weight": X,
        "--n-size": ke,
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
        "--n-color-table-modal": z,
        "--n-color-table-popover": M,
        "--n-color-disabled": W,
        "--n-color-disabled-checked": ae,
        "--n-text-color": I,
        "--n-text-color-disabled": G,
        "--n-check-mark-color": O,
        "--n-check-mark-color-disabled": U,
        "--n-check-mark-color-disabled-checked": Z,
        "--n-font-size": ce,
        "--n-label-padding": de
      };
    }), x = r ? wt("checkbox", Wu(() => p.value[0]), b, e) : void 0;
    return Object.assign(c, w, {
      rtlEnabled: C,
      selfRef: n,
      mergedClsPrefix: o,
      mergedDisabled: h,
      renderedChecked: d,
      mergedTheme: v,
      labelId: Zr(),
      handleClick: m,
      handleKeyUp: g,
      handleKeyDown: u,
      cssVars: r ? void 0 : b,
      themeClass: x == null ? void 0 : x.themeClass,
      onRender: x == null ? void 0 : x.onRender
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
      handleClick: v
    } = this;
    (e = this.onRender) === null || e === void 0 || e.call(this);
    const f = We(t.default, (m) => s || m ? Jn("span", {
      class: `${d}-checkbox__label`,
      id: a
    }, s || m) : null);
    return Jn("div", {
      ref: "selfRef",
      class: [`${d}-checkbox`, this.themeClass, this.rtlEnabled && `${d}-checkbox--rtl`, n && `${d}-checkbox--checked`, o && `${d}-checkbox--disabled`, r && `${d}-checkbox--indeterminate`, i && `${d}-checkbox--inside-table`, f && `${d}-checkbox--show-label`],
      tabindex: o || !c ? void 0 : 0,
      role: "checkbox",
      "aria-checked": r ? "mixed" : n,
      "aria-labelledby": a,
      style: l,
      onKeyup: h,
      onKeydown: p,
      onClick: v,
      onMousedown: () => {
        at("selectstart", window, (m) => {
          m.preventDefault();
        }, {
          once: !0
        });
      }
    }, Jn("div", {
      class: `${d}-checkbox-box-wrapper`
    }, " ", Jn("div", {
      class: `${d}-checkbox-box`
    }, Jn(dr, null, {
      default: () => this.indeterminate ? Jn("div", {
        key: "indeterminate",
        class: `${d}-checkbox-icon`
      }, Y_()) : Jn("div", {
        key: "check",
        class: `${d}-checkbox-icon`
      }, X_())
    }), Jn("div", {
      class: `${d}-checkbox-box__border`
    }))), f);
  }
});
function nT(e) {
  const {
    boxShadow2: t
  } = e;
  return {
    menuBoxShadow: t
  };
}
const wd = {
  name: "Popselect",
  common: vt,
  peers: {
    Popover: ur,
    InternalSelectMenu: vd
  },
  self: nT
}, rv = "n-popselect", oT = A("popselect-menu", `
 box-shadow: var(--n-menu-box-shadow);
`), Ku = window.Vue.computed, rT = window.Vue.defineComponent, iT = window.Vue.h, aT = window.Vue.inject, qu = window.Vue.nextTick, lT = window.Vue.toRef, sT = window.Vue.watch;
window.Vue.watchEffect;
const yd = {
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
}, Gu = ei(yd), dT = rT({
  name: "PopselectPanel",
  props: yd,
  setup(e) {
    const t = aT(rv), {
      mergedClsPrefixRef: n,
      inlineThemeDisabled: o
    } = qe(e), r = _e("Popselect", "-pop-select", oT, wd, t.props, n), i = Ku(() => Oa(e.options, tv("value", "children")));
    function l(p, v) {
      const {
        onUpdateValue: f,
        "onUpdate:value": m,
        onChange: g
      } = e;
      f && ie(f, p, v), m && ie(m, p, v), g && ie(g, p, v);
    }
    function a(p) {
      d(p.key);
    }
    function s(p) {
      !an(p, "action") && !an(p, "empty") && !an(p, "header") && p.preventDefault();
    }
    function d(p) {
      const {
        value: {
          getNode: v
        }
      } = i;
      if (e.multiple)
        if (Array.isArray(e.value)) {
          const f = [], m = [];
          let g = !0;
          e.value.forEach((u) => {
            if (u === p) {
              g = !1;
              return;
            }
            const w = v(u);
            w && (f.push(w.key), m.push(w.rawNode));
          }), g && (f.push(p), m.push(v(p).rawNode)), l(f, m);
        } else {
          const f = v(p);
          f && l([p], [f.rawNode]);
        }
      else if (e.value === p && e.cancelable)
        l(null, null);
      else {
        const f = v(p);
        f && l(p, f.rawNode);
        const {
          "onUpdate:show": m,
          onUpdateShow: g
        } = t.props;
        m && ie(m, !1), g && ie(g, !1), t.setShow(!1);
      }
      qu(() => {
        t.syncPosition();
      });
    }
    sT(lT(e, "options"), () => {
      qu(() => {
        t.syncPosition();
      });
    });
    const c = Ku(() => {
      const {
        self: {
          menuBoxShadow: p
        }
      } = r.value;
      return {
        "--n-menu-box-shadow": p
      };
    }), h = o ? wt("select", void 0, c, t.props) : void 0;
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
    return (e = this.onRender) === null || e === void 0 || e.call(this), iT(qp, {
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
}), cT = window.Vue.defineComponent, Xu = window.Vue.h, uT = window.Vue.provide, fT = window.Vue.ref, hT = Object.assign(Object.assign(Object.assign(Object.assign({}, _e.props), rp(rr, ["showArrow", "arrow"])), {
  placement: Object.assign(Object.assign({}, rr.placement), {
    default: "bottom"
  }),
  trigger: {
    type: String,
    default: "hover"
  }
}), yd), pT = cT({
  name: "Popselect",
  props: hT,
  slots: Object,
  inheritAttrs: !1,
  __popover__: !0,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = qe(e), n = _e("Popselect", "-popselect", void 0, wd, e, t), o = fT(null);
    function r() {
      var a;
      (a = o.value) === null || a === void 0 || a.syncPosition();
    }
    function i(a) {
      var s;
      (s = o.value) === null || s === void 0 || s.setShow(a);
    }
    return uT(rv, {
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
        return Xu(dT, Object.assign({}, a, {
          class: [a.class, n],
          style: [a.style, ...r]
        }, Qr(this.$props, Gu), {
          ref: op(o),
          onMouseenter: Dr([i, a.onMouseenter]),
          onMouseleave: Dr([l, a.onMouseleave])
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
    return Xu(di, Object.assign({}, rp(this.$props, Gu), t, {
      internalDeactivateImmediately: !0
    }), {
      trigger: () => {
        var n, o;
        return (o = (n = this.$slots).default) === null || o === void 0 ? void 0 : o.call(n);
      }
    });
  }
});
function vT(e) {
  const {
    boxShadow2: t
  } = e;
  return {
    menuBoxShadow: t
  };
}
const iv = {
  name: "Select",
  common: vt,
  peers: {
    InternalSelection: Zp,
    InternalSelectMenu: vd
  },
  self: vT
}, mT = H([A("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `), A("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [za({
  originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
})])]), xn = window.Vue.computed, gT = window.Vue.defineComponent, bo = window.Vue.h, dn = window.Vue.ref, Fl = window.Vue.toRef, bT = window.Vue.Transition, wT = window.Vue.vShow, yT = window.Vue.watch;
window.Vue.watchEffect;
const xT = window.Vue.withDirectives, CT = Object.assign(Object.assign({}, _e.props), {
  to: Pn.propTo,
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
}), Rs = gT({
  name: "Select",
  props: CT,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBorderedRef: n,
      namespaceRef: o,
      inlineThemeDisabled: r
    } = qe(e), i = _e("Select", "-select", mT, iv, e, t), l = dn(e.defaultValue), a = Fl(e, "value"), s = zt(a, l), d = dn(!1), c = dn(""), h = Bh(e, ["items", "options"]), p = dn([]), v = dn([]), f = xn(() => v.value.concat(p.value).concat(h.value)), m = xn(() => {
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
          return Pl(se, be);
        const we = ue[te];
        return typeof we == "string" ? Pl(se, we) : typeof we == "number" ? Pl(se, String(we)) : !1;
      };
    }), g = xn(() => {
      if (e.remote)
        return h.value;
      {
        const {
          value: P
        } = f, {
          value: N
        } = c;
        return !N.length || !e.filterable ? P : R_(P, m.value, N, e.childrenField);
      }
    }), u = xn(() => {
      const {
        valueField: P,
        childrenField: N
      } = e, te = tv(P, N);
      return Oa(g.value, te);
    }), w = xn(() => k_(f.value, e.valueField, e.childrenField)), C = dn(!1), b = zt(Fl(e, "show"), C), x = dn(null), S = dn(null), y = dn(null), {
      localeRef: T
    } = sr("Select"), R = xn(() => {
      var P;
      return (P = e.placeholder) !== null && P !== void 0 ? P : T.value.placeholder;
    }), E = [], W = dn(/* @__PURE__ */ new Map()), _ = xn(() => {
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
    function z(P) {
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
    const M = xn(() => {
      if (e.multiple) {
        const {
          value: P
        } = s;
        return Array.isArray(P) ? z(P) : [];
      }
      return null;
    }), O = xn(() => {
      const {
        value: P
      } = s;
      return !e.multiple && !Array.isArray(P) ? P === null ? null : z([P])[0] || null : null;
    }), U = jn(e), {
      mergedSizeRef: L,
      mergedDisabledRef: Y,
      mergedStatusRef: Q
    } = U;
    function J(P, N) {
      const {
        onChange: te,
        "onUpdate:value": se,
        onUpdateValue: ue
      } = e, {
        nTriggerFormChange: be,
        nTriggerFormInput: we
      } = U;
      te && ie(te, P, N), ue && ie(ue, P, N), se && ie(se, P, N), l.value = P, be(), we();
    }
    function q(P) {
      const {
        onBlur: N
      } = e, {
        nTriggerFormBlur: te
      } = U;
      N && ie(N, P), te();
    }
    function I() {
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
      } = U;
      N && ie(N, P), se(), te && me();
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
          (P = M.value) === null || P === void 0 || P.forEach((be) => {
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
      N && ie(N, P), te && ie(te, P), C.value = P;
    }
    function me() {
      Y.value || (de(!0), C.value = !0, e.filterable && Ze());
    }
    function X() {
      de(!1);
    }
    function ce() {
      c.value = "", v.value = E;
    }
    const ke = dn(!1);
    function ge() {
      e.filterable && (ke.value = !0);
    }
    function $e() {
      e.filterable && (ke.value = !1, b.value || ce());
    }
    function Se() {
      Y.value || (b.value ? e.filterable ? Ze() : X() : me());
    }
    function Be(P) {
      var N, te;
      !((te = (N = y.value) === null || N === void 0 ? void 0 : N.selfRef) === null || te === void 0) && te.contains(P.relatedTarget) || (d.value = !1, q(P), X());
    }
    function Me(P) {
      G(P), d.value = !0;
    }
    function oe() {
      d.value = !0;
    }
    function k(P) {
      var N;
      !((N = x.value) === null || N === void 0) && N.$el.contains(P.relatedTarget) || (d.value = !1, q(P), X());
    }
    function $() {
      var P;
      (P = x.value) === null || P === void 0 || P.focus(), X();
    }
    function D(P) {
      var N;
      b.value && (!((N = x.value) === null || N === void 0) && N.$el.contains(Yr(P)) || X());
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
        } = v, we = be[0] || null;
        if (we) {
          const Ce = p.value;
          Ce.length ? Ce.push(we) : p.value = [we], v.value = E;
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
        J(be, z(be));
      } else {
        if (N && !te) {
          const be = F(P[ue]);
          ~be ? p.value = [p.value[be]] : p.value = E;
        }
        Ye(), X(), J(P[ue], P);
      }
    }
    function F(P) {
      return p.value.findIndex((te) => te[e.valueField] === P);
    }
    function j(P) {
      b.value || me();
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
          v.value = E;
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
        h.value.some((Ae) => Ae[we] === be[we] || Ae[Ce] === be[Ce]) || p.value.some((Ae) => Ae[we] === be[we] || Ae[Ce] === be[Ce]) ? v.value = E : v.value = [be];
      }
    }
    function pe(P) {
      P.stopPropagation();
      const {
        multiple: N
      } = e;
      !N && e.filterable && X(), I(), N ? J([], []) : J(null, null);
    }
    function Te(P) {
      !an(P, "action") && !an(P, "empty") && !an(P, "header") && P.preventDefault();
    }
    function lt(P) {
      ae(P);
    }
    function pt(P) {
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
          if (!(!((N = x.value) === null || N === void 0) && N.isComposing)) {
            if (b.value) {
              const we = (te = y.value) === null || te === void 0 ? void 0 : te.getPendingTmNode();
              we ? ve(we) : e.filterable || (X(), Ye());
            } else if (me(), e.tag && ke.value) {
              const we = v.value[0];
              if (we) {
                const Ce = we[e.valueField], {
                  value: Ae
                } = s;
                e.multiple && Array.isArray(Ae) && Ae.includes(Ce) || he(we);
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
          b.value ? (ue = y.value) === null || ue === void 0 || ue.next() : me();
          break;
        case "Escape":
          b.value && (ky(P), X()), (be = x.value) === null || be === void 0 || be.focus();
          break;
      }
    }
    function Ye() {
      var P;
      (P = x.value) === null || P === void 0 || P.focus();
    }
    function Ze() {
      var P;
      (P = x.value) === null || P === void 0 || P.focusInput();
    }
    function mt() {
      var P;
      b.value && ((P = S.value) === null || P === void 0 || P.syncPosition());
    }
    le(), yT(Fl(e, "options"), le);
    const et = {
      focus: () => {
        var P;
        (P = x.value) === null || P === void 0 || P.focus();
      },
      focusInput: () => {
        var P;
        (P = x.value) === null || P === void 0 || P.focusInput();
      },
      blur: () => {
        var P;
        (P = x.value) === null || P === void 0 || P.blur();
      },
      blurInput: () => {
        var P;
        (P = x.value) === null || P === void 0 || P.blurInput();
      }
    }, fe = xn(() => {
      const {
        self: {
          menuBoxShadow: P
        }
      } = i.value;
      return {
        "--n-menu-box-shadow": P
      };
    }), Re = r ? wt("select", void 0, fe, e) : void 0;
    return Object.assign(Object.assign({}, et), {
      mergedStatus: Q,
      mergedClsPrefix: t,
      mergedBordered: n,
      namespace: o,
      treeMate: u,
      isMounted: Pa(),
      triggerRef: x,
      menuRef: y,
      pattern: c,
      uncontrolledShow: C,
      mergedShow: b,
      adjustedTo: Pn(e),
      uncontrolledValue: l,
      mergedValue: s,
      followerRef: S,
      localizedPlaceholder: R,
      selectedOption: O,
      selectedOptions: M,
      mergedSize: L,
      mergedDisabled: Y,
      focused: d,
      activeWithoutMenuOpen: ke,
      inlineThemeDisabled: r,
      onTriggerInputFocus: ge,
      onTriggerInputBlur: $e,
      handleTriggerOrMenuResize: mt,
      handleMenuFocus: oe,
      handleMenuBlur: k,
      handleMenuTabOut: $,
      handleTriggerClick: Se,
      handleToggle: ve,
      handleDeleteOption: he,
      handlePatternInput: j,
      handleClear: pe,
      handleTriggerBlur: Be,
      handleTriggerFocus: Me,
      handleKeydown: pt,
      handleMenuAfterLeave: ce,
      handleMenuClickOutside: D,
      handleMenuScroll: lt,
      handleMenuKeydown: pt,
      handleMenuMousedown: Te,
      mergedTheme: i,
      cssVars: r ? void 0 : fe,
      themeClass: Re == null ? void 0 : Re.themeClass,
      onRender: Re == null ? void 0 : Re.onRender
    });
  },
  render() {
    return bo("div", {
      class: `${this.mergedClsPrefix}-select`
    }, bo(Gs, null, {
      default: () => [bo(Xs, null, {
        default: () => bo(ZP, {
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
      }), bo(Zs, {
        ref: "followerRef",
        show: this.mergedShow,
        to: this.adjustedTo,
        teleportDisabled: this.adjustedTo === Pn.tdkey,
        containerClass: this.namespace,
        width: this.consistentMenuWidth ? "target" : void 0,
        minWidth: "target",
        placement: this.placement
      }, {
        default: () => bo(bT, {
          name: "fade-in-scale-up-transition",
          appear: this.isMounted,
          onAfterLeave: this.handleMenuAfterLeave
        }, {
          default: () => {
            var e, t, n;
            return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), xT(bo(qp, Object.assign({}, this.menuProps, {
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
            }), this.displayDirective === "show" ? [[wT, this.mergedShow], [ha, this.handleMenuClickOutside, void 0, {
              capture: !0
            }]] : [[ha, this.handleMenuClickOutside, void 0, {
              capture: !0
            }]])) : null;
          }
        })
      })]
    }));
  }
}), ST = {
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
function $T(e) {
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
    heightSmall: v,
    heightMedium: f
  } = e;
  return Object.assign(Object.assign({}, ST), {
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
    itemSizeMedium: v,
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
const av = {
  name: "Pagination",
  common: vt,
  peers: {
    Select: iv,
    Input: md,
    Popselect: wd
  },
  self: $T
}, Yu = `
 background: var(--n-item-color-hover);
 color: var(--n-item-text-color-hover);
 border: var(--n-item-border-hover);
`, Zu = [K("button", `
 background: var(--n-button-color-hover);
 border: var(--n-button-border-hover);
 color: var(--n-button-icon-color-hover);
 `)], RT = A("pagination", `
 display: flex;
 vertical-align: middle;
 font-size: var(--n-item-font-size);
 flex-wrap: nowrap;
`, [A("pagination-prefix", `
 display: flex;
 align-items: center;
 margin: var(--n-prefix-margin);
 `), A("pagination-suffix", `
 display: flex;
 align-items: center;
 margin: var(--n-suffix-margin);
 `), H("> *:not(:first-child)", `
 margin: var(--n-item-margin);
 `), A("select", `
 width: var(--n-select-width);
 `), H("&.transition-disabled", [A("pagination-item", "transition: none!important;")]), A("pagination-quick-jumper", `
 white-space: nowrap;
 display: flex;
 color: var(--n-jumper-text-color);
 transition: color .3s var(--n-bezier);
 align-items: center;
 font-size: var(--n-jumper-font-size);
 `, [A("input", `
 margin: var(--n-input-margin);
 width: var(--n-input-width);
 `)]), A("pagination-item", `
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
 `, [K("button", `
 background: var(--n-button-color);
 color: var(--n-button-icon-color);
 border: var(--n-button-border);
 padding: 0;
 `, [A("base-icon", `
 font-size: var(--n-button-icon-size);
 `)]), Qe("disabled", [K("hover", Yu, Zu), H("&:hover", Yu, Zu), H("&:active", `
 background: var(--n-item-color-pressed);
 color: var(--n-item-text-color-pressed);
 border: var(--n-item-border-pressed);
 `, [K("button", `
 background: var(--n-button-color-pressed);
 border: var(--n-button-border-pressed);
 color: var(--n-button-icon-color-pressed);
 `)]), K("active", `
 background: var(--n-item-color-active);
 color: var(--n-item-text-color-active);
 border: var(--n-item-border-active);
 `, [H("&:hover", `
 background: var(--n-item-color-active-hover);
 `)])]), K("disabled", `
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `, [K("active, button", `
 background-color: var(--n-item-color-disabled);
 border: var(--n-item-border-disabled);
 `)])]), K("disabled", `
 cursor: not-allowed;
 `, [A("pagination-quick-jumper", `
 color: var(--n-jumper-text-color-disabled);
 `)]), K("simple", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `, [A("pagination-quick-jumper", [A("input", `
 margin: 0;
 `)])])]);
function lv(e) {
  var t;
  if (!e) return 10;
  const {
    defaultPageSize: n
  } = e;
  if (n !== void 0) return n;
  const o = (t = e.pageSizes) === null || t === void 0 ? void 0 : t[0];
  return typeof o == "number" ? o : (o == null ? void 0 : o.value) || 10;
}
function kT(e, t, n, o) {
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
  let v = !1, f = !1;
  c > s + 2 && (v = !0), h < d - 2 && (f = !0);
  const m = [];
  m.push({
    type: "page",
    label: 1,
    active: e === 1,
    mayBeFastBackward: !1,
    mayBeFastForward: !1
  }), v ? (r = !0, l = c - 1, m.push({
    type: "fast-backward",
    active: !1,
    label: void 0,
    options: o ? Ju(s + 1, c - 1) : null
  })) : d >= s + 1 && m.push({
    type: "page",
    label: s + 1,
    mayBeFastBackward: !0,
    mayBeFastForward: !1,
    active: e === s + 1
  });
  for (let g = c; g <= h; ++g)
    m.push({
      type: "page",
      label: g,
      mayBeFastBackward: !1,
      mayBeFastForward: !1,
      active: e === g
    });
  return f ? (i = !0, a = h + 1, m.push({
    type: "fast-forward",
    active: !1,
    label: void 0,
    options: o ? Ju(h + 1, d - 1) : null
  })) : h === d - 2 && m[m.length - 1].label !== d - 1 && m.push({
    type: "page",
    mayBeFastForward: !0,
    mayBeFastBackward: !1,
    label: d - 1,
    active: e === d - 1
  }), m[m.length - 1].label !== d && m.push({
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
    items: m
  };
}
function Ju(e, t) {
  const n = [];
  for (let o = e; o <= t; ++o)
    n.push({
      label: `${o}`,
      value: o
    });
  return n;
}
const cn = window.Vue.computed, PT = window.Vue.defineComponent, Qu = window.Vue.Fragment, Ge = window.Vue.h, _T = window.Vue.nextTick, Qn = window.Vue.ref, ef = window.Vue.toRef, El = window.Vue.watchEffect, TT = Object.assign(Object.assign({}, _e.props), {
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
  to: Pn.propTo,
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
}), FT = PT({
  name: "Pagination",
  props: TT,
  slots: Object,
  setup(e) {
    const {
      mergedComponentPropsRef: t,
      mergedClsPrefixRef: n,
      inlineThemeDisabled: o,
      mergedRtlRef: r
    } = qe(e), i = _e("Pagination", "-pagination", RT, av, e, n), {
      localeRef: l
    } = sr("Pagination"), a = Qn(null), s = Qn(e.defaultPage), d = Qn(lv(e)), c = zt(ef(e, "page"), s), h = zt(ef(e, "pageSize"), d), p = cn(() => {
      const {
        itemCount: X
      } = e;
      if (X !== void 0)
        return Math.max(1, Math.ceil(X / h.value));
      const {
        pageCount: ce
      } = e;
      return ce !== void 0 ? Math.max(ce, 1) : 1;
    }), v = Qn("");
    El(() => {
      e.simple, v.value = String(c.value);
    });
    const f = Qn(!1), m = Qn(!1), g = Qn(!1), u = Qn(!1), w = () => {
      e.disabled || (f.value = !0, O());
    }, C = () => {
      e.disabled || (f.value = !1, O());
    }, b = () => {
      m.value = !0, O();
    }, x = () => {
      m.value = !1, O();
    }, S = (X) => {
      U(X);
    }, y = cn(() => kT(c.value, p.value, e.pageSlot, e.showQuickJumpDropdown));
    El(() => {
      y.value.hasFastBackward ? y.value.hasFastForward || (f.value = !1, g.value = !1) : (m.value = !1, u.value = !1);
    });
    const T = cn(() => {
      const X = l.value.selectionSuffix;
      return e.pageSizes.map((ce) => typeof ce == "number" ? {
        label: `${ce} / ${X}`,
        value: ce
      } : ce);
    }), R = cn(() => {
      var X, ce;
      return ((ce = (X = t == null ? void 0 : t.value) === null || X === void 0 ? void 0 : X.Pagination) === null || ce === void 0 ? void 0 : ce.inputSize) || zc(e.size);
    }), E = cn(() => {
      var X, ce;
      return ((ce = (X = t == null ? void 0 : t.value) === null || X === void 0 ? void 0 : X.Pagination) === null || ce === void 0 ? void 0 : ce.selectSize) || zc(e.size);
    }), W = cn(() => (c.value - 1) * h.value), _ = cn(() => {
      const X = c.value * h.value - 1, {
        itemCount: ce
      } = e;
      return ce !== void 0 && X > ce - 1 ? ce - 1 : X;
    }), z = cn(() => {
      const {
        itemCount: X
      } = e;
      return X !== void 0 ? X : (e.pageCount || 1) * h.value;
    }), M = Mt("Pagination", r, n);
    function O() {
      _T(() => {
        var X;
        const {
          value: ce
        } = a;
        ce && (ce.classList.add("transition-disabled"), (X = a.value) === null || X === void 0 || X.offsetWidth, ce.classList.remove("transition-disabled"));
      });
    }
    function U(X) {
      if (X === c.value) return;
      const {
        "onUpdate:page": ce,
        onUpdatePage: ke,
        onChange: ge,
        simple: $e
      } = e;
      ce && ie(ce, X), ke && ie(ke, X), ge && ie(ge, X), s.value = X, $e && (v.value = String(X));
    }
    function L(X) {
      if (X === h.value) return;
      const {
        "onUpdate:pageSize": ce,
        onUpdatePageSize: ke,
        onPageSizeChange: ge
      } = e;
      ce && ie(ce, X), ke && ie(ke, X), ge && ie(ge, X), d.value = X, p.value < c.value && U(p.value);
    }
    function Y() {
      if (e.disabled) return;
      const X = Math.min(c.value + 1, p.value);
      U(X);
    }
    function Q() {
      if (e.disabled) return;
      const X = Math.max(c.value - 1, 1);
      U(X);
    }
    function J() {
      if (e.disabled) return;
      const X = Math.min(y.value.fastForwardTo, p.value);
      U(X);
    }
    function q() {
      if (e.disabled) return;
      const X = Math.max(y.value.fastBackwardTo, 1);
      U(X);
    }
    function I(X) {
      L(X);
    }
    function G() {
      const X = Number.parseInt(v.value);
      Number.isNaN(X) || (U(Math.max(1, Math.min(X, p.value))), e.simple || (v.value = ""));
    }
    function Z() {
      G();
    }
    function ae(X) {
      if (!e.disabled)
        switch (X.type) {
          case "page":
            U(X.label);
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
      v.value = X.replace(/\D+/g, "");
    }
    El(() => {
      c.value, h.value, O();
    });
    const de = cn(() => {
      const {
        size: X
      } = e, {
        self: {
          buttonBorder: ce,
          buttonBorderHover: ke,
          buttonBorderPressed: ge,
          buttonIconColor: $e,
          buttonIconColorHover: Se,
          buttonIconColorPressed: Be,
          itemTextColor: Me,
          itemTextColorHover: oe,
          itemTextColorPressed: k,
          itemTextColorActive: $,
          itemTextColorDisabled: D,
          itemColor: ee,
          itemColorHover: ve,
          itemColorPressed: he,
          itemColorActive: F,
          itemColorActiveHover: j,
          itemColorDisabled: pe,
          itemBorder: Te,
          itemBorderHover: lt,
          itemBorderPressed: pt,
          itemBorderActive: Ye,
          itemBorderDisabled: Ze,
          itemBorderRadius: mt,
          jumperTextColor: et,
          jumperTextColorDisabled: fe,
          buttonColor: Re,
          buttonColorHover: P,
          buttonColorPressed: N,
          [re("itemPadding", X)]: te,
          [re("itemMargin", X)]: se,
          [re("inputWidth", X)]: ue,
          [re("selectWidth", X)]: be,
          [re("inputMargin", X)]: we,
          [re("selectMargin", X)]: Ce,
          [re("jumperFontSize", X)]: Ae,
          [re("prefixMargin", X)]: ot,
          [re("suffixMargin", X)]: Ne,
          [re("itemSize", X)]: Pt,
          [re("buttonIconSize", X)]: It,
          [re("itemFontSize", X)]: At,
          [`${re("itemMargin", X)}Rtl`]: Nt,
          [`${re("inputMargin", X)}Rtl`]: Ht
        },
        common: {
          cubicBezierEaseInOut: Qt
        }
      } = i.value;
      return {
        "--n-prefix-margin": ot,
        "--n-suffix-margin": Ne,
        "--n-item-font-size": At,
        "--n-select-width": be,
        "--n-select-margin": Ce,
        "--n-input-width": ue,
        "--n-input-margin": we,
        "--n-input-margin-rtl": Ht,
        "--n-item-size": Pt,
        "--n-item-text-color": Me,
        "--n-item-text-color-disabled": D,
        "--n-item-text-color-hover": oe,
        "--n-item-text-color-active": $,
        "--n-item-text-color-pressed": k,
        "--n-item-color": ee,
        "--n-item-color-hover": ve,
        "--n-item-color-disabled": pe,
        "--n-item-color-active": F,
        "--n-item-color-active-hover": j,
        "--n-item-color-pressed": he,
        "--n-item-border": Te,
        "--n-item-border-hover": lt,
        "--n-item-border-disabled": Ze,
        "--n-item-border-active": Ye,
        "--n-item-border-pressed": pt,
        "--n-item-padding": te,
        "--n-item-border-radius": mt,
        "--n-bezier": Qt,
        "--n-jumper-font-size": Ae,
        "--n-jumper-text-color": et,
        "--n-jumper-text-color-disabled": fe,
        "--n-item-margin": se,
        "--n-item-margin-rtl": Nt,
        "--n-button-icon-size": It,
        "--n-button-icon-color": $e,
        "--n-button-icon-color-hover": Se,
        "--n-button-icon-color-pressed": Be,
        "--n-button-color-hover": P,
        "--n-button-color": Re,
        "--n-button-color-pressed": N,
        "--n-button-border": ce,
        "--n-button-border-hover": ke,
        "--n-button-border-pressed": ge
      };
    }), me = o ? wt("pagination", cn(() => {
      let X = "";
      const {
        size: ce
      } = e;
      return X += ce[0], X;
    }), de, e) : void 0;
    return {
      rtlEnabled: M,
      mergedClsPrefix: n,
      locale: l,
      selfRef: a,
      mergedPage: c,
      pageItems: cn(() => y.value.items),
      mergedItemCount: z,
      jumperValue: v,
      pageSizeOptions: T,
      mergedPageSize: h,
      inputSize: R,
      selectSize: E,
      mergedTheme: i,
      mergedPageCount: p,
      startIndex: W,
      endIndex: _,
      showFastForwardMenu: g,
      showFastBackwardMenu: u,
      fastForwardActive: f,
      fastBackwardActive: m,
      handleMenuSelect: S,
      handleFastForwardMouseenter: w,
      handleFastForwardMouseleave: C,
      handleFastBackwardMouseenter: b,
      handleFastBackwardMouseleave: x,
      handleJumperInput: le,
      handleBackwardClick: Q,
      handleForwardClick: Y,
      handlePageItemClick: ae,
      handleSizePickerChange: I,
      handleQuickJumperChange: Z,
      cssVars: o ? void 0 : de,
      themeClass: me == null ? void 0 : me.themeClass,
      onRender: me == null ? void 0 : me.onRender
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
      mergedPageSize: v,
      pageSizeOptions: f,
      jumperValue: m,
      simple: g,
      prev: u,
      next: w,
      prefix: C,
      suffix: b,
      label: x,
      goto: S,
      handleJumperInput: y,
      handleSizePickerChange: T,
      handleBackwardClick: R,
      handlePageItemClick: E,
      handleForwardClick: W,
      handleQuickJumperChange: _,
      onRender: z
    } = this;
    z == null || z();
    const M = C || e.prefix, O = b || e.suffix, U = u || e.prev, L = w || e.next, Y = x || e.label;
    return Ge("div", {
      ref: "selfRef",
      class: [`${t}-pagination`, this.themeClass, this.rtlEnabled && `${t}-pagination--rtl`, n && `${t}-pagination--disabled`, g && `${t}-pagination--simple`],
      style: o
    }, M ? Ge("div", {
      class: `${t}-pagination-prefix`
    }, M({
      page: r,
      pageSize: v,
      pageCount: i,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      itemCount: this.mergedItemCount
    })) : null, this.displayOrder.map((Q) => {
      switch (Q) {
        case "pages":
          return Ge(Qu, null, Ge("div", {
            class: [`${t}-pagination-item`, !U && `${t}-pagination-item--button`, (r <= 1 || r > i || n) && `${t}-pagination-item--disabled`],
            onClick: R
          }, U ? U({
            page: r,
            pageSize: v,
            pageCount: i,
            startIndex: this.startIndex,
            endIndex: this.endIndex,
            itemCount: this.mergedItemCount
          }) : Ge(Ct, {
            clsPrefix: t
          }, {
            default: () => this.rtlEnabled ? Ge(mu, null) : Ge(cu, null)
          })), g ? Ge(Qu, null, Ge("div", {
            class: `${t}-pagination-quick-jumper`
          }, Ge($o, {
            value: m,
            onUpdateValue: y,
            size: h,
            placeholder: "",
            disabled: n,
            theme: d.peers.Input,
            themeOverrides: d.peerOverrides.Input,
            onChange: _
          })), " /", " ", i) : l.map((J, q) => {
            let I, G, Z;
            const {
              type: ae
            } = J;
            switch (ae) {
              case "page":
                const de = J.label;
                Y ? I = Y({
                  type: "page",
                  node: de,
                  active: J.active
                }) : I = de;
                break;
              case "fast-forward":
                const me = this.fastForwardActive ? Ge(Ct, {
                  clsPrefix: t
                }, {
                  default: () => this.rtlEnabled ? Ge(hu, null) : Ge(pu, null)
                }) : Ge(Ct, {
                  clsPrefix: t
                }, {
                  default: () => Ge(gu, null)
                });
                Y ? I = Y({
                  type: "fast-forward",
                  node: me,
                  active: this.fastForwardActive || this.showFastForwardMenu
                }) : I = me, G = this.handleFastForwardMouseenter, Z = this.handleFastForwardMouseleave;
                break;
              case "fast-backward":
                const X = this.fastBackwardActive ? Ge(Ct, {
                  clsPrefix: t
                }, {
                  default: () => this.rtlEnabled ? Ge(pu, null) : Ge(hu, null)
                }) : Ge(Ct, {
                  clsPrefix: t
                }, {
                  default: () => Ge(gu, null)
                });
                Y ? I = Y({
                  type: "fast-backward",
                  node: X,
                  active: this.fastBackwardActive || this.showFastBackwardMenu
                }) : I = X, G = this.handleFastBackwardMouseenter, Z = this.handleFastBackwardMouseleave;
                break;
            }
            const le = Ge("div", {
              key: q,
              class: [`${t}-pagination-item`, J.active && `${t}-pagination-item--active`, ae !== "page" && (ae === "fast-backward" && this.showFastBackwardMenu || ae === "fast-forward" && this.showFastForwardMenu) && `${t}-pagination-item--hover`, n && `${t}-pagination-item--disabled`, ae === "page" && `${t}-pagination-item--clickable`],
              onClick: () => {
                E(J);
              },
              onMouseenter: G,
              onMouseleave: Z
            }, I);
            if (ae === "page" && !J.mayBeFastBackward && !J.mayBeFastForward)
              return le;
            {
              const de = J.type === "page" ? J.mayBeFastBackward ? "fast-backward" : "fast-forward" : J.type;
              return J.type !== "page" && !J.options ? le : Ge(pT, {
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
                onUpdateShow: (me) => {
                  ae !== "page" && (me ? ae === "fast-backward" ? this.showFastBackwardMenu = me : this.showFastForwardMenu = me : (this.showFastBackwardMenu = !1, this.showFastForwardMenu = !1));
                },
                options: J.type !== "page" && J.options ? J.options : [],
                onUpdateValue: this.handleMenuSelect,
                scrollable: !0,
                showCheckmark: !1
              }, {
                default: () => le
              });
            }
          }), Ge("div", {
            class: [`${t}-pagination-item`, !L && `${t}-pagination-item--button`, {
              [`${t}-pagination-item--disabled`]: r < 1 || r >= i || n
            }],
            onClick: W
          }, L ? L({
            page: r,
            pageSize: v,
            pageCount: i,
            itemCount: this.mergedItemCount,
            startIndex: this.startIndex,
            endIndex: this.endIndex
          }) : Ge(Ct, {
            clsPrefix: t
          }, {
            default: () => this.rtlEnabled ? Ge(cu, null) : Ge(mu, null)
          })));
        case "size-picker":
          return !g && a ? Ge(Rs, Object.assign({
            consistentMenuWidth: !1,
            placeholder: "",
            showCheckmark: !1,
            to: this.to
          }, this.selectProps, {
            size: p,
            options: f,
            value: v,
            disabled: n,
            theme: d.peers.Select,
            themeOverrides: d.peerOverrides.Select,
            onUpdateValue: T
          })) : null;
        case "quick-jumper":
          return !g && s ? Ge("div", {
            class: `${t}-pagination-quick-jumper`
          }, S ? S() : vn(this.$slots.goto, () => [c.goto]), Ge($o, {
            value: m,
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
    }), O ? Ge("div", {
      class: `${t}-pagination-suffix`
    }, O({
      page: r,
      pageSize: v,
      pageCount: i,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      itemCount: this.mergedItemCount
    })) : null);
  }
}), ET = {
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
function OT(e) {
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
    heightMedium: v,
    heightLarge: f,
    heightHuge: m,
    textColor3: g,
    opacityDisabled: u
  } = e;
  return Object.assign(Object.assign({}, ET), {
    optionHeightSmall: p,
    optionHeightMedium: v,
    optionHeightLarge: f,
    optionHeightHuge: m,
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
    optionColorActive: Fe(t, {
      alpha: 0.1
    }),
    groupHeaderTextColor: g,
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
const sv = {
  name: "Dropdown",
  common: vt,
  peers: {
    Popover: ur
  },
  self: OT
}, zT = {
  padding: "8px 14px"
};
function MT(e) {
  const {
    borderRadius: t,
    boxShadow2: n,
    baseColor: o
  } = e;
  return Object.assign(Object.assign({}, zT), {
    borderRadius: t,
    boxShadow: n,
    color: je(o, "rgba(0, 0, 0, .85)"),
    textColor: o
  });
}
const dv = {
  name: "Tooltip",
  common: vt,
  peers: {
    Popover: ur
  },
  self: MT
}, cv = {
  name: "Ellipsis",
  common: vt,
  peers: {
    Tooltip: dv
  }
}, IT = {
  radioSizeSmall: "14px",
  radioSizeMedium: "16px",
  radioSizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function AT(e) {
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
    heightMedium: v,
    heightLarge: f,
    lineHeight: m
  } = e;
  return Object.assign(Object.assign({}, IT), {
    labelLineHeight: m,
    buttonHeightSmall: p,
    buttonHeightMedium: v,
    buttonHeightLarge: f,
    fontSizeSmall: d,
    fontSizeMedium: c,
    fontSizeLarge: h,
    boxShadow: `inset 0 0 0 1px ${t}`,
    boxShadowActive: `inset 0 0 0 1px ${n}`,
    boxShadowFocus: `inset 0 0 0 1px ${n}, 0 0 0 2px ${Fe(n, {
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
    buttonBoxShadowFocus: `inset 0 0 0 1px ${n}, 0 0 0 2px ${Fe(n, {
      alpha: 0.3
    })}`,
    buttonBoxShadowHover: "inset 0 0 0 1px #0000",
    buttonBoxShadow: "inset 0 0 0 1px #0000",
    buttonBorderRadius: s
  });
}
const xd = {
  name: "Radio",
  common: vt,
  self: AT
}, VT = {
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
function BT(e) {
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
    fontSizeSmall: v,
    fontSizeMedium: f,
    fontSizeLarge: m,
    dividerColor: g,
    heightSmall: u,
    opacityDisabled: w,
    tableColorStriped: C
  } = e;
  return Object.assign(Object.assign({}, VT), {
    actionDividerColor: g,
    lineHeight: p,
    borderRadius: h,
    fontSizeSmall: v,
    fontSizeMedium: f,
    fontSizeLarge: m,
    borderColor: je(t, g),
    tdColorHover: je(t, a),
    tdColorSorting: je(t, a),
    tdColorStriped: je(t, C),
    thColor: je(t, l),
    thColorHover: je(je(t, l), a),
    thColorSorting: je(je(t, l), a),
    tdColor: t,
    tdTextColor: r,
    thTextColor: i,
    thFontWeight: c,
    thButtonColorHover: a,
    thIconColor: s,
    thIconColorActive: d,
    // modal
    borderColorModal: je(n, g),
    tdColorHoverModal: je(n, a),
    tdColorSortingModal: je(n, a),
    tdColorStripedModal: je(n, C),
    thColorModal: je(n, l),
    thColorHoverModal: je(je(n, l), a),
    thColorSortingModal: je(je(n, l), a),
    tdColorModal: n,
    // popover
    borderColorPopover: je(o, g),
    tdColorHoverPopover: je(o, a),
    tdColorSortingPopover: je(o, a),
    tdColorStripedPopover: je(o, C),
    thColorPopover: je(o, l),
    thColorHoverPopover: je(je(o, l), a),
    thColorSortingPopover: je(je(o, l), a),
    tdColorPopover: o,
    boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
    boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
    // loading
    loadingColor: d,
    loadingSize: u,
    opacityLoading: w
  });
}
const LT = {
  name: "DataTable",
  common: vt,
  peers: {
    Button: gd,
    Checkbox: nv,
    Radio: xd,
    Pagination: av,
    Scrollbar: li,
    Empty: pd,
    Popover: ur,
    Ellipsis: cv,
    Dropdown: sv
  },
  self: BT
}, DT = Object.assign(Object.assign({}, _e.props), {
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
}), mn = "n-data-table", uv = 40, fv = 40;
function tf(e) {
  if (e.type === "selection")
    return e.width === void 0 ? uv : xt(e.width);
  if (e.type === "expand")
    return e.width === void 0 ? fv : xt(e.width);
  if (!("children" in e))
    return typeof e.width == "string" ? xt(e.width) : e.width;
}
function NT(e) {
  var t, n;
  if (e.type === "selection")
    return St((t = e.width) !== null && t !== void 0 ? t : uv);
  if (e.type === "expand")
    return St((n = e.width) !== null && n !== void 0 ? n : fv);
  if (!("children" in e))
    return St(e.width);
}
function fn(e) {
  return e.type === "selection" ? "__n_selection__" : e.type === "expand" ? "__n_expand__" : e.key;
}
function nf(e) {
  return e && (typeof e == "object" ? Object.assign({}, e) : e);
}
function HT(e) {
  return e === "ascend" ? 1 : e === "descend" ? -1 : 0;
}
function jT(e, t, n) {
  return n !== void 0 && (e = Math.min(e, typeof n == "number" ? n : Number.parseFloat(n))), t !== void 0 && (e = Math.max(e, typeof t == "number" ? t : Number.parseFloat(t))), e;
}
function WT(e, t) {
  if (t !== void 0)
    return {
      width: t,
      minWidth: t,
      maxWidth: t
    };
  const n = NT(e), {
    minWidth: o,
    maxWidth: r
  } = e;
  return {
    width: n,
    minWidth: St(o) || n,
    maxWidth: St(r)
  };
}
function UT(e, t, n) {
  return typeof n == "function" ? n(e, t) : n || "";
}
function Ol(e) {
  return e.filterOptionValues !== void 0 || e.filterOptionValue === void 0 && e.defaultFilterOptionValues !== void 0;
}
function zl(e) {
  return "children" in e ? !1 : !!e.sorter;
}
function hv(e) {
  return "children" in e && e.children.length ? !1 : !!e.resizable;
}
function of(e) {
  return "children" in e ? !1 : !!e.filter && (!!e.filterOptions || !!e.renderFilterMenu);
}
function rf(e) {
  if (e) {
    if (e === "descend") return "ascend";
  } else return "descend";
  return !1;
}
function KT(e, t) {
  if (e.sorter === void 0) return null;
  const {
    customNextSortOrder: n
  } = e;
  return t === null || t.columnKey !== e.key ? {
    columnKey: e.key,
    sorter: e.sorter,
    order: rf(!1)
  } : Object.assign(Object.assign({}, t), {
    order: (n || rf)(t.order)
  });
}
function pv(e, t) {
  return t.find((n) => n.columnKey === e.key && n.order) !== void 0;
}
function qT(e) {
  return typeof e == "string" ? e.replace(/,/g, "\\,") : e == null ? "" : `${e}`.replace(/,/g, "\\,");
}
function GT(e, t, n, o) {
  const r = e.filter((a) => a.type !== "expand" && a.type !== "selection" && a.allowExport !== !1), i = r.map((a) => o ? o(a) : a.title).join(","), l = t.map((a) => r.map((s) => n ? n(a[s.key], a, s) : qT(a[s.key])).join(","));
  return [i, ...l].join(`
`);
}
const XT = window.Vue.defineComponent, YT = window.Vue.h, ZT = window.Vue.inject, JT = XT({
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
    } = ZT(mn);
    return () => {
      const {
        rowKey: o
      } = e;
      return YT(bd, {
        privateInsideTable: !0,
        disabled: e.disabled,
        indeterminate: n.value.has(o),
        checked: t.value.has(o),
        onUpdateChecked: e.onUpdateChecked
      });
    };
  }
}), QT = A("radio", `
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
`, [K("checked", [B("dot", `
 background-color: var(--n-color-active);
 `)]), B("dot-wrapper", `
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `), A("radio-input", `
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
 `), K("checked", {
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
 `), Qe("disabled", `
 cursor: pointer;
 `, [H("&:hover", [B("dot", {
  boxShadow: "var(--n-box-shadow-hover)"
})]), K("focus", [H("&:not(:active)", [B("dot", {
  boxShadow: "var(--n-box-shadow-focus)"
})])])]), K("disabled", `
 cursor: not-allowed;
 `, [B("dot", {
  boxShadow: "var(--n-box-shadow-disabled)",
  backgroundColor: "var(--n-color-disabled)"
}, [H("&::before", {
  backgroundColor: "var(--n-dot-color-disabled)"
}), K("checked", `
 opacity: 1;
 `)]), B("label", {
  color: "var(--n-text-color-disabled)"
}), A("radio-input", `
 cursor: not-allowed;
 `)])]), eF = window.Vue.inject, Di = window.Vue.ref, tF = window.Vue.toRef;
window.Vue.watchEffect;
const nF = {
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
}, vv = "n-radio-group";
function oF(e) {
  const t = eF(vv, null), n = jn(e, {
    mergedSize(w) {
      const {
        size: C
      } = e;
      if (C !== void 0) return C;
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
  } = n, i = Di(null), l = Di(null), a = Di(e.defaultChecked), s = tF(e, "checked"), d = zt(s, a), c = Oe(() => t ? t.valueRef.value === e.value : d.value), h = Oe(() => {
    const {
      name: w
    } = e;
    if (w !== void 0) return w;
    if (t) return t.nameRef.value;
  }), p = Di(!1);
  function v() {
    if (t) {
      const {
        doUpdateValue: w
      } = t, {
        value: C
      } = e;
      ie(w, C);
    } else {
      const {
        onUpdateChecked: w,
        "onUpdate:checked": C
      } = e, {
        nTriggerFormInput: b,
        nTriggerFormChange: x
      } = n;
      w && ie(w, !0), C && ie(C, !0), b(), x(), a.value = !0;
    }
  }
  function f() {
    r.value || c.value || v();
  }
  function m() {
    f(), i.value && (i.value.checked = c.value);
  }
  function g() {
    p.value = !1;
  }
  function u() {
    p.value = !0;
  }
  return {
    mergedClsPrefix: t ? t.mergedClsPrefixRef : qe(e).mergedClsPrefixRef,
    inputRef: i,
    labelRef: l,
    mergedName: h,
    mergedDisabled: r,
    renderSafeChecked: c,
    focus: p,
    mergedSize: o,
    handleRadioInputChange: m,
    handleRadioInputBlur: g,
    handleRadioInputFocus: u
  };
}
const af = window.Vue.computed, rF = window.Vue.defineComponent, _r = window.Vue.h, iF = Object.assign(Object.assign({}, _e.props), nF), mv = rF({
  name: "Radio",
  props: iF,
  setup(e) {
    const t = oF(e), n = _e("Radio", "-radio", QT, xd, e, t.mergedClsPrefix), o = af(() => {
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
          boxShadowDisabled: v,
          boxShadowFocus: f,
          boxShadowHover: m,
          color: g,
          colorDisabled: u,
          colorActive: w,
          textColor: C,
          textColorDisabled: b,
          dotColorActive: x,
          dotColorDisabled: S,
          labelPadding: y,
          labelLineHeight: T,
          labelFontWeight: R,
          [re("fontSize", d)]: E,
          [re("radioSize", d)]: W
        }
      } = n.value;
      return {
        "--n-bezier": c,
        "--n-label-line-height": T,
        "--n-label-font-weight": R,
        "--n-box-shadow": h,
        "--n-box-shadow-active": p,
        "--n-box-shadow-disabled": v,
        "--n-box-shadow-focus": f,
        "--n-box-shadow-hover": m,
        "--n-color": g,
        "--n-color-active": w,
        "--n-color-disabled": u,
        "--n-dot-color-active": x,
        "--n-dot-color-disabled": S,
        "--n-font-size": E,
        "--n-radio-size": W,
        "--n-text-color": C,
        "--n-text-color-disabled": b,
        "--n-label-padding": y
      };
    }), {
      inlineThemeDisabled: r,
      mergedClsPrefixRef: i,
      mergedRtlRef: l
    } = qe(e), a = Mt("Radio", l, i), s = r ? wt("radio", af(() => t.mergedSize.value[0]), o, e) : void 0;
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
    return n == null || n(), _r("label", {
      class: [`${t}-radio`, this.themeClass, this.rtlEnabled && `${t}-radio--rtl`, this.mergedDisabled && `${t}-radio--disabled`, this.renderSafeChecked && `${t}-radio--checked`, this.focus && `${t}-radio--focus`],
      style: this.cssVars
    }, _r("div", {
      class: `${t}-radio__dot-wrapper`
    }, " ", _r("div", {
      class: [`${t}-radio__dot`, this.renderSafeChecked && `${t}-radio__dot--checked`]
    }), _r("input", {
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
    })), We(e.default, (r) => !r && !o ? null : _r("div", {
      ref: "labelRef",
      class: `${t}-radio__label`
    }, r || o)));
  }
}), aF = A("radio-group", `
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
 `, [K("checked", {
  backgroundColor: "var(--n-button-border-color-active)"
}), K("disabled", {
  opacity: "var(--n-opacity-disabled)"
})]), K("button-group", `
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [A("radio-button", {
  height: "var(--n-height)",
  lineHeight: "var(--n-height)"
}), B("splitor", {
  height: "var(--n-height)"
})]), A("radio-button", `
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
 `, [A("radio-input", `
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
 `)]), Qe("disabled", `
 cursor: pointer;
 `, [H("&:hover", [B("state-border", `
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `), Qe("checked", {
  color: "var(--n-button-text-color-hover)"
})]), K("focus", [H("&:not(:active)", [B("state-border", {
  boxShadow: "var(--n-button-box-shadow-focus)"
})])])]), K("checked", `
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `), K("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]), lf = window.Vue.computed, lF = window.Vue.defineComponent, gv = window.Vue.h, sF = window.Vue.provide, sf = window.Vue.ref, df = window.Vue.toRef;
function dF(e, t, n) {
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
      const c = r[r.length - 1].props, h = t === c.value, p = c.disabled, v = t === d.value, f = d.disabled, m = (h ? 2 : 0) + (p ? 0 : 1), g = (v ? 2 : 0) + (f ? 0 : 1), u = {
        [`${n}-radio-group__splitor--disabled`]: p,
        [`${n}-radio-group__splitor--checked`]: h
      }, w = {
        [`${n}-radio-group__splitor--disabled`]: f,
        [`${n}-radio-group__splitor--checked`]: v
      }, C = m < g ? w : u;
      r.push(gv("div", {
        class: [`${n}-radio-group__splitor`, C]
      }), a);
    }
  }
  return {
    children: r,
    isButtonGroup: i
  };
}
const cF = Object.assign(Object.assign({}, _e.props), {
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
}), uF = lF({
  name: "RadioGroup",
  props: cF,
  setup(e) {
    const t = sf(null), {
      mergedSizeRef: n,
      mergedDisabledRef: o,
      nTriggerFormChange: r,
      nTriggerFormInput: i,
      nTriggerFormBlur: l,
      nTriggerFormFocus: a
    } = jn(e), {
      mergedClsPrefixRef: s,
      inlineThemeDisabled: d,
      mergedRtlRef: c
    } = qe(e), h = _e("Radio", "-radio-group", aF, xd, e, s), p = sf(e.defaultValue), v = df(e, "value"), f = zt(v, p);
    function m(x) {
      const {
        onUpdateValue: S,
        "onUpdate:value": y
      } = e;
      S && ie(S, x), y && ie(y, x), p.value = x, r(), i();
    }
    function g(x) {
      const {
        value: S
      } = t;
      S && (S.contains(x.relatedTarget) || a());
    }
    function u(x) {
      const {
        value: S
      } = t;
      S && (S.contains(x.relatedTarget) || l());
    }
    sF(vv, {
      mergedClsPrefixRef: s,
      nameRef: df(e, "name"),
      valueRef: f,
      disabledRef: o,
      mergedSizeRef: n,
      doUpdateValue: m
    });
    const w = Mt("Radio", c, s), C = lf(() => {
      const {
        value: x
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
          buttonColor: z,
          buttonColorActive: M,
          buttonTextColor: O,
          buttonTextColorActive: U,
          buttonTextColorHover: L,
          opacityDisabled: Y,
          [re("buttonHeight", x)]: Q,
          [re("fontSize", x)]: J
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
        "--n-button-color": z,
        "--n-button-color-active": M,
        "--n-button-text-color": O,
        "--n-button-text-color-hover": L,
        "--n-button-text-color-active": U,
        "--n-height": Q,
        "--n-opacity-disabled": Y
      };
    }), b = d ? wt("radio-group", lf(() => n.value[0]), C, e) : void 0;
    return {
      selfElRef: t,
      rtlEnabled: w,
      mergedClsPrefix: s,
      mergedValue: f,
      handleFocusout: u,
      handleFocusin: g,
      cssVars: d ? void 0 : C,
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
    } = dF(nr(ed(this)), t, n);
    return (e = this.onRender) === null || e === void 0 || e.call(this), gv("div", {
      onFocusin: o,
      onFocusout: r,
      ref: "selfElRef",
      class: [`${n}-radio-group`, this.rtlEnabled && `${n}-radio-group--rtl`, this.themeClass, l && `${n}-radio-group--button-group`],
      style: this.cssVars
    }, i);
  }
}), fF = window.Vue.defineComponent, hF = window.Vue.h, pF = window.Vue.inject, vF = fF({
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
    } = pF(mn);
    return () => {
      const {
        rowKey: o
      } = e;
      return hF(mv, {
        name: n,
        disabled: e.disabled,
        checked: t.value.has(o),
        onUpdateChecked: e.onUpdateChecked
      });
    };
  }
}), mF = window.Vue.computed, gF = window.Vue.defineComponent, bF = window.Vue.h, wF = window.Vue.ref, yF = Object.assign(Object.assign({}, rr), _e.props), xF = gF({
  name: "Tooltip",
  props: yF,
  slots: Object,
  __popover__: !0,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = qe(e), n = _e("Tooltip", "-tooltip", void 0, dv, e, t), o = wF(null);
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
      popoverThemeOverrides: mF(() => n.value.self)
    });
  },
  render() {
    const {
      mergedTheme: e,
      internalExtraClass: t
    } = this;
    return bF(di, Object.assign(Object.assign({}, this.$props), {
      theme: e.peers.Popover,
      themeOverrides: e.peerOverrides.Popover,
      builtinThemeOverrides: this.popoverThemeOverrides,
      internalExtraClass: t.concat("tooltip"),
      ref: "popoverRef"
    }), this.$slots);
  }
}), bv = A("ellipsis", {
  overflow: "hidden"
}, [Qe("line-clamp", `
 white-space: nowrap;
 display: inline-block;
 vertical-align: bottom;
 max-width: 100%;
 `), K("line-clamp", `
 display: -webkit-inline-box;
 -webkit-box-orient: vertical;
 `), K("cursor-pointer", `
 cursor: pointer;
 `)]), cf = window.Vue.computed, CF = window.Vue.defineComponent, Ml = window.Vue.h, SF = window.Vue.mergeProps, $F = window.Vue.onDeactivated, Ni = window.Vue.ref;
function ks(e) {
  return `${e}-ellipsis--line-clamp`;
}
function Ps(e, t) {
  return `${e}-ellipsis--cursor-${t}`;
}
const wv = Object.assign(Object.assign({}, _e.props), {
  expandTrigger: String,
  lineClamp: [Number, String],
  tooltip: {
    type: [Boolean, Object],
    default: !0
  }
}), Cd = CF({
  name: "Ellipsis",
  inheritAttrs: !1,
  props: wv,
  slots: Object,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    const o = sp(), r = _e("Ellipsis", "-ellipsis", bv, cv, e, o), i = Ni(null), l = Ni(null), a = Ni(null), s = Ni(!1), d = cf(() => {
      const {
        lineClamp: g
      } = e, {
        value: u
      } = s;
      return g !== void 0 ? {
        textOverflow: "",
        "-webkit-line-clamp": u ? "" : g
      } : {
        textOverflow: u ? "" : "ellipsis",
        "-webkit-line-clamp": ""
      };
    });
    function c() {
      let g = !1;
      const {
        value: u
      } = s;
      if (u) return !0;
      const {
        value: w
      } = i;
      if (w) {
        const {
          lineClamp: C
        } = e;
        if (v(w), C !== void 0)
          g = w.scrollHeight <= w.offsetHeight;
        else {
          const {
            value: b
          } = l;
          b && (g = b.getBoundingClientRect().width <= w.getBoundingClientRect().width);
        }
        f(w, g);
      }
      return g;
    }
    const h = cf(() => e.expandTrigger === "click" ? () => {
      var g;
      const {
        value: u
      } = s;
      u && ((g = a.value) === null || g === void 0 || g.setShow(!1)), s.value = !u;
    } : void 0);
    $F(() => {
      var g;
      e.tooltip && ((g = a.value) === null || g === void 0 || g.setShow(!1));
    });
    const p = () => Ml("span", Object.assign({}, SF(n, {
      class: [`${o.value}-ellipsis`, e.lineClamp !== void 0 ? ks(o.value) : void 0, e.expandTrigger === "click" ? Ps(o.value, "pointer") : void 0],
      style: d.value
    }), {
      ref: "triggerRef",
      onClick: h.value,
      onMouseenter: (
        // get tooltip disabled will derive cursor style
        e.expandTrigger === "click" ? c : void 0
      )
    }), e.lineClamp ? t : Ml("span", {
      ref: "triggerInnerRef"
    }, t));
    function v(g) {
      if (!g) return;
      const u = d.value, w = ks(o.value);
      e.lineClamp !== void 0 ? m(g, w, "add") : m(g, w, "remove");
      for (const C in u)
        g.style[C] !== u[C] && (g.style[C] = u[C]);
    }
    function f(g, u) {
      const w = Ps(o.value, "pointer");
      e.expandTrigger === "click" && !u ? m(g, w, "add") : m(g, w, "remove");
    }
    function m(g, u, w) {
      w === "add" ? g.classList.contains(u) || g.classList.add(u) : g.classList.contains(u) && g.classList.remove(u);
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
      return Ml(xF, Object.assign({
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
}), RF = window.Vue.defineComponent, Il = window.Vue.h, uf = window.Vue.mergeProps, kF = window.Vue.ref, PF = RF({
  name: "PerformantEllipsis",
  props: wv,
  inheritAttrs: !1,
  setup(e, {
    attrs: t,
    slots: n
  }) {
    const o = kF(!1), r = sp();
    return Vo("-ellipsis", bv, r), {
      mouseEntered: o,
      renderTrigger: () => {
        const {
          lineClamp: l
        } = e, a = r.value;
        return Il("span", Object.assign({}, uf(t, {
          class: [`${a}-ellipsis`, l !== void 0 ? ks(a) : void 0, e.expandTrigger === "click" ? Ps(a, "pointer") : void 0],
          style: l === void 0 ? {
            textOverflow: "ellipsis"
          } : {
            "-webkit-line-clamp": l
          }
        }), {
          onMouseenter: () => {
            o.value = !0;
          }
        }), l ? n : Il("span", null, n));
      }
    };
  },
  render() {
    return this.mouseEntered ? Il(Cd, uf({}, this.$attrs, this.$props), this.$slots) : this.renderTrigger();
  }
}), _F = window.Vue.defineComponent, Al = window.Vue.h, TF = _F({
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
    if (l && !t ? i = l(o, this.index) : t ? i = (e = o[a]) === null || e === void 0 ? void 0 : e.value : i = r ? r(oi(o, a), o, n) : oi(o, a), s)
      if (typeof s == "object") {
        const {
          mergedTheme: d
        } = this;
        return n.ellipsisComponent === "performant-ellipsis" ? Al(PF, Object.assign({}, s, {
          theme: d.peers.Ellipsis,
          themeOverrides: d.peerOverrides.Ellipsis
        }), {
          default: () => i
        }) : Al(Cd, Object.assign({}, s, {
          theme: d.peers.Ellipsis,
          themeOverrides: d.peerOverrides.Ellipsis
        }), {
          default: () => i
        });
      } else
        return Al("span", {
          class: `${this.clsPrefix}-data-table-td__ellipsis`
        }, i);
    return i;
  }
}), FF = window.Vue.defineComponent, Tr = window.Vue.h, ff = FF({
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
    return Tr("div", {
      class: [`${e}-data-table-expand-trigger`, this.expanded && `${e}-data-table-expand-trigger--expanded`],
      onClick: this.onClick,
      onMousedown: (t) => {
        t.preventDefault();
      }
    }, Tr(dr, null, {
      default: () => this.loading ? Tr(cr, {
        key: "loading",
        clsPrefix: this.clsPrefix,
        radius: 85,
        strokeWidth: 15,
        scale: 0.88
      }) : this.renderExpandIcon ? this.renderExpandIcon({
        expanded: this.expanded,
        rowData: this.rowData
      }) : Tr(Ct, {
        clsPrefix: e,
        key: "base-icon"
      }, {
        default: () => Tr(Dp, null)
      })
    }));
  }
}), hf = window.Vue.computed, EF = window.Vue.defineComponent, Bn = window.Vue.h, OF = window.Vue.inject, zF = window.Vue.ref, MF = EF({
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
    } = qe(e), o = Mt("DataTable", n, t), {
      mergedClsPrefixRef: r,
      mergedThemeRef: i,
      localeRef: l
    } = OF(mn), a = zF(e.value), s = hf(() => {
      const {
        value: f
      } = a;
      return Array.isArray(f) ? f : null;
    }), d = hf(() => {
      const {
        value: f
      } = a;
      return Ol(e.column) ? Array.isArray(f) && f.length && f[0] || null : Array.isArray(f) ? null : f;
    });
    function c(f) {
      e.onChange(f);
    }
    function h(f) {
      e.multiple && Array.isArray(f) ? a.value = f : Ol(e.column) && !Array.isArray(f) ? a.value = [f] : a.value = f;
    }
    function p() {
      c(a.value), e.onConfirm();
    }
    function v() {
      e.multiple || Ol(e.column) ? c([]) : c(null), e.onClear();
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
      handleClearClick: v
    };
  },
  render() {
    const {
      mergedTheme: e,
      locale: t,
      mergedClsPrefix: n
    } = this;
    return Bn("div", {
      class: [`${n}-data-table-filter-menu`, this.rtlEnabled && `${n}-data-table-filter-menu--rtl`]
    }, Bn(si, null, {
      default: () => {
        const {
          checkboxGroupValue: o,
          handleChange: r
        } = this;
        return this.multiple ? Bn(G_, {
          value: o,
          class: `${n}-data-table-filter-menu__group`,
          onUpdateValue: r
        }, {
          default: () => this.options.map((i) => Bn(bd, {
            key: i.value,
            theme: e.peers.Checkbox,
            themeOverrides: e.peerOverrides.Checkbox,
            value: i.value
          }, {
            default: () => i.label
          }))
        }) : Bn(uF, {
          name: this.radioGroupName,
          class: `${n}-data-table-filter-menu__group`,
          value: this.radioGroupValue,
          onUpdateValue: this.handleChange
        }, {
          default: () => this.options.map((i) => Bn(mv, {
            key: i.value,
            value: i.value,
            theme: e.peers.Radio,
            themeOverrides: e.peerOverrides.Radio
          }, {
            default: () => i.label
          }))
        });
      }
    }), Bn("div", {
      class: `${n}-data-table-filter-menu__action`
    }, Bn(ri, {
      size: "tiny",
      theme: e.peers.Button,
      themeOverrides: e.peerOverrides.Button,
      onClick: this.handleClearClick
    }, {
      default: () => t.clear
    }), Bn(ri, {
      theme: e.peers.Button,
      themeOverrides: e.peerOverrides.Button,
      type: "primary",
      size: "tiny",
      onClick: this.handleConfirmClick
    }, {
      default: () => t.confirm
    })));
  }
}), IF = window.Vue.defineComponent, AF = IF({
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
}), Hi = window.Vue.computed, VF = window.Vue.defineComponent, qo = window.Vue.h, BF = window.Vue.inject, LF = window.Vue.ref;
function DF(e, t, n) {
  const o = Object.assign({}, e);
  return o[t] = n, o;
}
const NF = VF({
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
    } = qe(), {
      mergedThemeRef: n,
      mergedClsPrefixRef: o,
      mergedFilterStateRef: r,
      filterMenuCssVarsRef: i,
      paginationBehaviorOnFilterRef: l,
      doUpdatePage: a,
      doUpdateFilters: s,
      filterIconPopoverPropsRef: d
    } = BF(mn), c = LF(!1), h = r, p = Hi(() => e.column.filterMultiple !== !1), v = Hi(() => {
      const C = h.value[e.column.key];
      if (C === void 0) {
        const {
          value: b
        } = p;
        return b ? [] : null;
      }
      return C;
    }), f = Hi(() => {
      const {
        value: C
      } = v;
      return Array.isArray(C) ? C.length > 0 : C !== null;
    }), m = Hi(() => {
      var C, b;
      return ((b = (C = t == null ? void 0 : t.value) === null || C === void 0 ? void 0 : C.DataTable) === null || b === void 0 ? void 0 : b.renderFilter) || e.column.renderFilter;
    });
    function g(C) {
      const b = DF(h.value, e.column.key, C);
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
      mergedRenderFilter: m,
      filterIconPopoverProps: d,
      filterMultiple: p,
      mergedFilterValue: v,
      filterMenuCssVars: i,
      handleFilterChange: g,
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
    return qo(di, Object.assign({
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
          return qo(AF, {
            "data-data-table-filter": !0,
            render: r,
            active: this.active,
            show: this.showPopover
          });
        const {
          renderFilterIcon: i
        } = this.column;
        return qo("div", {
          "data-data-table-filter": !0,
          class: [`${t}-data-table-filter`, {
            [`${t}-data-table-filter--active`]: this.active,
            [`${t}-data-table-filter--show`]: this.showPopover
          }]
        }, i ? i({
          active: this.active,
          show: this.showPopover
        }) : qo(Ct, {
          clsPrefix: t
        }, {
          default: () => qo(MR, null)
        }));
      },
      default: () => {
        const {
          renderFilterMenu: r
        } = this.column;
        return r ? r({
          hide: n
        }) : qo(MF, {
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
}), HF = window.Vue.defineComponent, jF = window.Vue.h, WF = window.Vue.inject, UF = window.Vue.onBeforeUnmount, KF = window.Vue.ref, qF = HF({
  name: "ColumnResizeButton",
  props: {
    onResizeStart: Function,
    onResize: Function,
    onResizeEnd: Function
  },
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = WF(mn), n = KF(!1);
    let o = 0;
    function r(s) {
      return s.clientX;
    }
    function i(s) {
      var d;
      s.preventDefault();
      const c = n.value;
      o = r(s), n.value = !0, c || (at("mousemove", window, l), at("mouseup", window, a), (d = e.onResizeStart) === null || d === void 0 || d.call(e));
    }
    function l(s) {
      var d;
      (d = e.onResize) === null || d === void 0 || d.call(e, r(s) - o);
    }
    function a() {
      var s;
      n.value = !1, (s = e.onResizeEnd) === null || s === void 0 || s.call(e), Je("mousemove", window, l), Je("mouseup", window, a);
    }
    return UF(() => {
      Je("mousemove", window, l), Je("mouseup", window, a);
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
    return jF("span", {
      "data-data-table-resizable": !0,
      class: [`${e}-data-table-resize-button`, this.active && `${e}-data-table-resize-button--active`],
      onMousedown: this.handleMousedown
    });
  }
}), GF = window.Vue.defineComponent, XF = GF({
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
}), ji = window.Vue.computed, YF = window.Vue.defineComponent, Wi = window.Vue.h, ZF = window.Vue.inject, JF = YF({
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
    } = qe(), {
      mergedSortStateRef: n,
      mergedClsPrefixRef: o
    } = ZF(mn), r = ji(() => n.value.find((s) => s.columnKey === e.column.key)), i = ji(() => r.value !== void 0), l = ji(() => {
      const {
        value: s
      } = r;
      return s && i.value ? s.order : !1;
    }), a = ji(() => {
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
    return e ? Wi(XF, {
      render: e,
      order: t
    }) : Wi("span", {
      class: [`${n}-data-table-sorter`, t === "ascend" && `${n}-data-table-sorter--asc`, t === "descend" && `${n}-data-table-sorter--desc`]
    }, o ? o({
      order: t
    }) : Wi(Ct, {
      clsPrefix: n
    }, {
      default: () => Wi(vR, null)
    }));
  }
}), Sd = "n-dropdown-menu", Ma = "n-dropdown", pf = "n-dropdown-option", QF = window.Vue.defineComponent, eE = window.Vue.h, yv = QF({
  name: "DropdownDivider",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  render() {
    return eE("div", {
      class: `${this.clsPrefix}-dropdown-divider`
    });
  }
}), tE = window.Vue.defineComponent, Fr = window.Vue.h, vf = window.Vue.inject, nE = tE({
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
    } = vf(Sd), {
      renderLabelRef: n,
      labelFieldRef: o,
      nodePropsRef: r,
      renderOptionRef: i
    } = vf(Ma);
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
    } = this.tmNode, s = Fr("div", Object.assign({
      class: `${t}-dropdown-option`
    }, r == null ? void 0 : r(a)), Fr("div", {
      class: `${t}-dropdown-option-body ${t}-dropdown-option-body--group`
    }, Fr("div", {
      "data-dropdown-option": !0,
      class: [`${t}-dropdown-option-body__prefix`, o && `${t}-dropdown-option-body__prefix--show-icon`]
    }, $n(a.icon)), Fr("div", {
      class: `${t}-dropdown-option-body__label`,
      "data-dropdown-option": !0
    }, i ? i(a) : $n((e = a.title) !== null && e !== void 0 ? e : a[this.labelField])), Fr("div", {
      class: [`${t}-dropdown-option-body__suffix`, n && `${t}-dropdown-option-body__suffix--has-submenu`],
      "data-dropdown-option": !0
    })));
    return l ? l({
      node: s,
      option: a
    }) : s;
  }
});
function oE(e) {
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
const rE = {
  common: vt,
  self: oE
}, iE = A("icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [K("color-transition", {
  transition: "color .3s var(--n-bezier)"
}), K("depth", {
  color: "var(--n-color)"
}, [H("svg", {
  opacity: "var(--n-opacity)",
  transition: "opacity .3s var(--n-bezier)"
})]), H("svg", {
  height: "1em",
  width: "1em"
})]), Vl = window.Vue.computed, aE = window.Vue.defineComponent, mf = window.Vue.h, lE = window.Vue.mergeProps, sE = Object.assign(Object.assign({}, _e.props), {
  depth: [String, Number],
  size: [Number, String],
  color: String,
  component: [Object, Function]
}), dE = aE({
  _n_icon__: !0,
  name: "Icon",
  inheritAttrs: !1,
  props: sE,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = qe(e), o = _e("Icon", "-icon", iE, rE, e, t), r = Vl(() => {
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
    }), i = n ? wt("icon", Vl(() => `${e.depth || "d"}`), r, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedStyle: Vl(() => {
        const {
          size: l,
          color: a
        } = e;
        return {
          fontSize: St(l),
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
    return !((e = t == null ? void 0 : t.$options) === null || e === void 0) && e._n_icon__ && so("icon", "don't wrap `n-icon` inside `n-icon`"), i == null || i(), mf("i", lE(this.$attrs, {
      role: "img",
      class: [`${o}-icon`, l, {
        [`${o}-icon--depth`]: n,
        [`${o}-icon--color-transition`]: n !== void 0
      }],
      style: [this.cssVars, this.mergedStyle]
    }), r ? mf(r) : this.$slots);
  }
});
function _s(e, t) {
  return e.type === "submenu" || e.type === void 0 && e[t] !== void 0;
}
function cE(e) {
  return e.type === "group";
}
function xv(e) {
  return e.type === "divider";
}
function uE(e) {
  return e.type === "render";
}
const wo = window.Vue.computed, fE = window.Vue.defineComponent, Kt = window.Vue.h, Ui = window.Vue.inject, hE = window.Vue.mergeProps, pE = window.Vue.provide, vE = window.Vue.ref, mE = window.Vue.Transition, Cv = fE({
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
    const t = Ui(Ma), {
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
      renderOptionRef: v,
      nodePropsRef: f,
      menuPropsRef: m
    } = t, g = Ui(pf, null), u = Ui(Sd), w = Ui(_a), C = wo(() => e.tmNode.rawNode), b = wo(() => {
      const {
        value: L
      } = p;
      return _s(e.tmNode.rawNode, L);
    }), x = wo(() => {
      const {
        disabled: L
      } = e.tmNode;
      return L;
    }), S = wo(() => {
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
        value: I
      } = i;
      return Q !== null ? I.includes(L) : J !== null ? I.includes(L) && I[I.length - 1] !== L : q !== null ? I.includes(L) : !1;
    }), y = wo(() => o.value === null && !a.value), T = Ew(S, 300, y), R = wo(() => !!(g != null && g.enteringSubmenuRef.value)), E = vE(!1);
    pE(pf, {
      enteringSubmenuRef: E
    });
    function W() {
      E.value = !0;
    }
    function _() {
      E.value = !1;
    }
    function z() {
      const {
        parentKey: L,
        tmNode: Y
      } = e;
      Y.disabled || s.value && (r.value = L, o.value = null, n.value = Y.key);
    }
    function M() {
      const {
        tmNode: L
      } = e;
      L.disabled || s.value && n.value !== L.key && z();
    }
    function O(L) {
      if (e.tmNode.disabled || !s.value) return;
      const {
        relatedTarget: Y
      } = L;
      Y && !an({
        target: Y
      }, "dropdownOption") && !an({
        target: Y
      }, "scrollbarRail") && (n.value = null);
    }
    function U() {
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
      menuProps: m,
      popoverBody: w,
      animated: a,
      mergedShowSubmenu: wo(() => T.value && !R.value),
      rawNode: C,
      hasSubmenu: b,
      pending: Oe(() => {
        const {
          value: L
        } = i, {
          key: Y
        } = e.tmNode;
        return L.includes(Y);
      }),
      childActive: Oe(() => {
        const {
          value: L
        } = l, {
          key: Y
        } = e.tmNode, Q = L.findIndex((J) => Y === J);
        return Q === -1 ? !1 : Q < L.length - 1;
      }),
      active: Oe(() => {
        const {
          value: L
        } = l, {
          key: Y
        } = e.tmNode, Q = L.findIndex((J) => Y === J);
        return Q === -1 ? !1 : Q === L.length - 1;
      }),
      mergedDisabled: x,
      renderOption: v,
      nodeProps: f,
      handleClick: U,
      handleMouseMove: M,
      handleMouseEnter: z,
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
      scrollable: v
    } = this;
    let f = null;
    if (r) {
      const w = (e = this.menuProps) === null || e === void 0 ? void 0 : e.call(this, o, o.children);
      f = Kt(Sv, Object.assign({}, w, {
        clsPrefix: i,
        scrollable: this.scrollable,
        tmNodes: this.tmNode.children,
        parentKey: this.tmNode.key
      }));
    }
    const m = {
      class: [`${i}-dropdown-option-body`, this.pending && `${i}-dropdown-option-body--pending`, this.active && `${i}-dropdown-option-body--active`, this.childActive && `${i}-dropdown-option-body--child-active`, this.mergedDisabled && `${i}-dropdown-option-body--disabled`],
      onMousemove: this.handleMouseMove,
      onMouseenter: this.handleMouseEnter,
      onMouseleave: this.handleMouseLeave,
      onClick: this.handleClick
    }, g = h == null ? void 0 : h(o), u = Kt("div", Object.assign({
      class: [`${i}-dropdown-option`, g == null ? void 0 : g.class],
      "data-dropdown-option": !0
    }, g), Kt("div", hE(m, p), [Kt("div", {
      class: [`${i}-dropdown-option-body__prefix`, l && `${i}-dropdown-option-body__prefix--show-icon`]
    }, [d ? d(o) : $n(o.icon)]), Kt("div", {
      "data-dropdown-option": !0,
      class: `${i}-dropdown-option-body__label`
    }, s ? s(o) : $n((t = o[this.labelField]) !== null && t !== void 0 ? t : o.title)), Kt("div", {
      "data-dropdown-option": !0,
      class: [`${i}-dropdown-option-body__suffix`, a && `${i}-dropdown-option-body__suffix--has-submenu`]
    }, this.hasSubmenu ? Kt(dE, null, {
      default: () => Kt(Dp, null)
    }) : null)]), this.hasSubmenu ? Kt(Gs, null, {
      default: () => [Kt(Xs, null, {
        default: () => Kt("div", {
          class: `${i}-dropdown-offset-container`
        }, Kt(Zs, {
          show: this.mergedShowSubmenu,
          placement: this.placement,
          to: v && this.popoverBody || void 0,
          teleportDisabled: !v
        }, {
          default: () => Kt("div", {
            class: `${i}-dropdown-menu-wrapper`
          }, n ? Kt(mE, {
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
}), gE = window.Vue.defineComponent, bE = window.Vue.Fragment, Ki = window.Vue.h, wE = gE({
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
    return Ki(bE, null, Ki(nE, {
      clsPrefix: n,
      tmNode: e,
      key: e.key
    }), o == null ? void 0 : o.map((r) => {
      const {
        rawNode: i
      } = r;
      return i.show === !1 ? null : xv(i) ? Ki(yv, {
        clsPrefix: n,
        key: r.key
      }) : r.isGroup ? (so("dropdown", "`group` node is not allowed to be put in `group` node."), null) : Ki(Cv, {
        clsPrefix: n,
        tmNode: r,
        parentKey: t,
        key: r.key
      });
    }));
  }
}), yE = window.Vue.defineComponent, xE = window.Vue.h, CE = yE({
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
    return xE("div", t, [e == null ? void 0 : e()]);
  }
}), gf = window.Vue.computed, SE = window.Vue.defineComponent, Go = window.Vue.h, $E = window.Vue.inject, qi = window.Vue.provide, RE = window.Vue.ref, Sv = SE({
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
    } = $E(Ma);
    qi(Sd, {
      showIconRef: gf(() => {
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
      hasSubmenuRef: gf(() => {
        const {
          value: r
        } = n;
        return e.tmNodes.some((i) => {
          var l;
          if (i.isGroup)
            return (l = i.children) === null || l === void 0 ? void 0 : l.some(({
              rawNode: s
            }) => _s(s, r));
          const {
            rawNode: a
          } = i;
          return _s(a, r);
        });
      })
    });
    const o = RE(null);
    return qi(qs, null), qi(Ks, null), qi(_a, o), {
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
      return i.show === !1 ? null : uE(i) ? Go(CE, {
        tmNode: r,
        key: r.key
      }) : xv(i) ? Go(yv, {
        clsPrefix: t,
        key: r.key
      }) : cE(i) ? Go(wE, {
        clsPrefix: t,
        tmNode: r,
        parentKey: e,
        key: r.key
      }) : Go(Cv, {
        clsPrefix: t,
        tmNode: r,
        parentKey: e,
        key: r.key,
        props: i.props,
        scrollable: n
      });
    });
    return Go("div", {
      class: [`${t}-dropdown-menu`, n && `${t}-dropdown-menu--scrollable`],
      ref: "bodyRef"
    }, n ? Go(jp, {
      contentClass: `${t}-dropdown-menu__content`
    }, {
      default: () => o
    }) : o, this.showArrow ? Xp({
      clsPrefix: t,
      arrowStyle: this.arrowStyle,
      arrowClass: void 0,
      arrowWrapperClass: void 0,
      arrowWrapperStyle: void 0
    }) : null);
  }
}), kE = A("dropdown-menu", `
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`, [za(), A("dropdown-option", `
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
 `)]), A("dropdown-option-body", `
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
 `), Qe("disabled", [K("pending", `
 color: var(--n-option-text-color-hover);
 `, [B("prefix, suffix", `
 color: var(--n-option-text-color-hover);
 `), H("&::before", "background-color: var(--n-option-color-hover);")]), K("active", `
 color: var(--n-option-text-color-active);
 `, [B("prefix, suffix", `
 color: var(--n-option-text-color-active);
 `), H("&::before", "background-color: var(--n-option-color-active);")]), K("child-active", `
 color: var(--n-option-text-color-child-active);
 `, [B("prefix, suffix", `
 color: var(--n-option-text-color-child-active);
 `)])]), K("disabled", `
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `), K("group", `
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `, [B("prefix", `
 width: calc(var(--n-option-prefix-width) / 2);
 `, [K("show-icon", `
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]), B("prefix", `
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `, [K("show-icon", `
 width: var(--n-option-icon-prefix-width);
 `), A("icon", `
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
 `, [K("has-submenu", `
 width: var(--n-option-icon-suffix-width);
 `), A("icon", `
 font-size: var(--n-option-icon-size);
 `)]), A("dropdown-menu", "pointer-events: all;")]), A("dropdown-offset-container", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]), A("dropdown-divider", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `), A("dropdown-menu-wrapper", `
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `), H(">", [A("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), Qe("scrollable", `
 padding: var(--n-padding);
 `), K("scrollable", [B("content", `
 padding: var(--n-padding);
 `)])]), yo = window.Vue.computed, PE = window.Vue.defineComponent, bf = window.Vue.h, _E = window.Vue.mergeProps, TE = window.Vue.provide, Gi = window.Vue.ref, Ln = window.Vue.toRef, FE = window.Vue.watch, EE = {
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
}, OE = Object.keys(rr), zE = Object.assign(Object.assign(Object.assign({}, rr), EE), _e.props), ME = PE({
  name: "Dropdown",
  inheritAttrs: !1,
  props: zE,
  setup(e) {
    const t = Gi(!1), n = zt(Ln(e, "show"), t), o = yo(() => {
      const {
        keyField: _,
        childrenField: z
      } = e;
      return Oa(e.options, {
        getKey(M) {
          return M[_];
        },
        getDisabled(M) {
          return M.disabled === !0;
        },
        getIgnored(M) {
          return M.type === "divider" || M.type === "render";
        },
        getChildren(M) {
          return M[z];
        }
      });
    }), r = yo(() => o.value.treeNodes), i = Gi(null), l = Gi(null), a = Gi(null), s = yo(() => {
      var _, z, M;
      return (M = (z = (_ = i.value) !== null && _ !== void 0 ? _ : l.value) !== null && z !== void 0 ? z : a.value) !== null && M !== void 0 ? M : null;
    }), d = yo(() => o.value.getPath(s.value).keyPath), c = yo(() => o.value.getPath(e.value).keyPath), h = Oe(() => e.keyboard && n.value);
    yw({
      keydown: {
        ArrowUp: {
          prevent: !0,
          handler: x
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
          handler: C
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
      inlineThemeDisabled: v
    } = qe(e), f = _e("Dropdown", "-dropdown", kE, sv, e, p);
    TE(Ma, {
      labelFieldRef: Ln(e, "labelField"),
      childrenFieldRef: Ln(e, "childrenField"),
      renderLabelRef: Ln(e, "renderLabel"),
      renderIconRef: Ln(e, "renderIcon"),
      hoverKeyRef: i,
      keyboardKeyRef: l,
      lastToggledSubmenuKeyRef: a,
      pendingKeyPathRef: d,
      activeKeyPathRef: c,
      animatedRef: Ln(e, "animated"),
      mergedShowRef: n,
      nodePropsRef: Ln(e, "nodeProps"),
      renderOptionRef: Ln(e, "renderOption"),
      menuPropsRef: Ln(e, "menuProps"),
      doSelect: m,
      doUpdateShow: g
    }), FE(n, (_) => {
      !e.animated && !_ && u();
    });
    function m(_, z) {
      const {
        onSelect: M
      } = e;
      M && ie(M, _, z);
    }
    function g(_) {
      const {
        "onUpdate:show": z,
        onUpdateShow: M
      } = e;
      z && ie(z, _), M && ie(M, _), t.value = _;
    }
    function u() {
      i.value = null, l.value = null, a.value = null;
    }
    function w() {
      g(!1);
    }
    function C() {
      R("left");
    }
    function b() {
      R("right");
    }
    function x() {
      R("up");
    }
    function S() {
      R("down");
    }
    function y() {
      const _ = T();
      _ != null && _.isLeaf && n.value && (m(_.key, _.rawNode), g(!1));
    }
    function T() {
      var _;
      const {
        value: z
      } = o, {
        value: M
      } = s;
      return !z || M === null ? null : (_ = z.getNode(M)) !== null && _ !== void 0 ? _ : null;
    }
    function R(_) {
      const {
        value: z
      } = s, {
        value: {
          getFirstAvailableNode: M
        }
      } = o;
      let O = null;
      if (z === null) {
        const U = M();
        U !== null && (O = U.key);
      } else {
        const U = T();
        if (U) {
          let L;
          switch (_) {
            case "down":
              L = U.getNext();
              break;
            case "up":
              L = U.getPrev();
              break;
            case "right":
              L = U.getChild();
              break;
            case "left":
              L = U.getParent();
              break;
          }
          L && (O = L.key);
        }
      }
      O !== null && (i.value = null, l.value = O);
    }
    const E = yo(() => {
      const {
        size: _,
        inverted: z
      } = e, {
        common: {
          cubicBezierEaseInOut: M
        },
        self: O
      } = f.value, {
        padding: U,
        dividerColor: L,
        borderRadius: Y,
        optionOpacityDisabled: Q,
        [re("optionIconSuffixWidth", _)]: J,
        [re("optionSuffixWidth", _)]: q,
        [re("optionIconPrefixWidth", _)]: I,
        [re("optionPrefixWidth", _)]: G,
        [re("fontSize", _)]: Z,
        [re("optionHeight", _)]: ae,
        [re("optionIconSize", _)]: le
      } = O, de = {
        "--n-bezier": M,
        "--n-font-size": Z,
        "--n-padding": U,
        "--n-border-radius": Y,
        "--n-option-height": ae,
        "--n-option-prefix-width": G,
        "--n-option-icon-prefix-width": I,
        "--n-option-suffix-width": q,
        "--n-option-icon-suffix-width": J,
        "--n-option-icon-size": le,
        "--n-divider-color": L,
        "--n-option-opacity-disabled": Q
      };
      return z ? (de["--n-color"] = O.colorInverted, de["--n-option-color-hover"] = O.optionColorHoverInverted, de["--n-option-color-active"] = O.optionColorActiveInverted, de["--n-option-text-color"] = O.optionTextColorInverted, de["--n-option-text-color-hover"] = O.optionTextColorHoverInverted, de["--n-option-text-color-active"] = O.optionTextColorActiveInverted, de["--n-option-text-color-child-active"] = O.optionTextColorChildActiveInverted, de["--n-prefix-color"] = O.prefixColorInverted, de["--n-suffix-color"] = O.suffixColorInverted, de["--n-group-header-text-color"] = O.groupHeaderTextColorInverted) : (de["--n-color"] = O.color, de["--n-option-color-hover"] = O.optionColorHover, de["--n-option-color-active"] = O.optionColorActive, de["--n-option-text-color"] = O.optionTextColor, de["--n-option-text-color-hover"] = O.optionTextColorHover, de["--n-option-text-color-active"] = O.optionTextColorActive, de["--n-option-text-color-child-active"] = O.optionTextColorChildActive, de["--n-prefix-color"] = O.prefixColor, de["--n-suffix-color"] = O.suffixColor, de["--n-group-header-text-color"] = O.groupHeaderTextColor), de;
    }), W = v ? wt("dropdown", yo(() => `${e.size[0]}${e.inverted ? "i" : ""}`), E, e) : void 0;
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
      doUpdateShow: g,
      cssVars: v ? void 0 : E,
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
      const h = (c == null ? void 0 : c(void 0, this.tmNodes.map((v) => v.rawNode))) || {}, p = {
        ref: op(r),
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
      return bf(Sv, _E(this.$attrs, p, h));
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
    return bf(di, Object.assign({}, Qr(this.$props, OE), n), {
      trigger: () => {
        var o, r;
        return (r = (o = this.$slots).default) === null || r === void 0 ? void 0 : r.call(o);
      }
    });
  }
}), wf = window.Vue.computed, IE = window.Vue.defineComponent, Bl = window.Vue.h, AE = window.Vue.inject, $v = "_n_all__", Rv = "_n_none__";
function VE(e, t, n, o) {
  return e ? (r) => {
    for (const i of e)
      switch (r) {
        case $v:
          n(!0);
          return;
        case Rv:
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
function BE(e, t) {
  return e ? e.map((n) => {
    switch (n) {
      case "all":
        return {
          label: t.checkTableAll,
          key: $v
        };
      case "none":
        return {
          label: t.uncheckTableAll,
          key: Rv
        };
      default:
        return n;
    }
  }) : [];
}
const LE = IE({
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
    } = AE(mn), a = wf(() => VE(o.value, r, i, l)), s = wf(() => BE(o.value, n.value));
    return () => {
      var d, c, h, p;
      const {
        clsPrefix: v
      } = e;
      return Bl(ME, {
        theme: (c = (d = t.theme) === null || d === void 0 ? void 0 : d.peers) === null || c === void 0 ? void 0 : c.Dropdown,
        themeOverrides: (p = (h = t.themeOverrides) === null || h === void 0 ? void 0 : h.peers) === null || p === void 0 ? void 0 : p.Dropdown,
        options: s.value,
        onSelect: a.value
      }, {
        default: () => Bl(Ct, {
          clsPrefix: v,
          class: `${v}-data-table-check-extra`
        }, {
          default: () => Bl(Lp, null)
        })
      });
    };
  }
}), kv = window.Vue.defineComponent, yf = window.Vue.Fragment, st = window.Vue.h, DE = window.Vue.inject, xf = window.Vue.ref;
function Ll(e) {
  return typeof e.title == "function" ? e.title(e) : e.title;
}
const NE = kv({
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
    return st("table", {
      style: {
        tableLayout: "fixed",
        width: o
      },
      class: `${e}-data-table-table`
    }, st("colgroup", null, n.map((r) => st("col", {
      key: r.key,
      style: r.style
    }))), st("thead", {
      "data-n-id": t,
      class: `${e}-data-table-thead`
    }, this.$slots));
  }
}), Pv = kv({
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
      mergedTableLayoutRef: v,
      headerCheckboxDisabledRef: f,
      virtualScrollHeaderRef: m,
      headerHeightRef: g,
      onUnstableColumnResize: u,
      doUpdateResizableWidth: w,
      handleTableHeaderScroll: C,
      deriveNextSorter: b,
      doUncheckAll: x,
      doCheckAll: S
    } = DE(mn), y = xf(), T = xf({});
    function R(O) {
      const U = T.value[O];
      return U == null ? void 0 : U.getBoundingClientRect().width;
    }
    function E() {
      i.value ? x() : S();
    }
    function W(O, U) {
      if (an(O, "dataTableFilter") || an(O, "dataTableResizable") || !zl(U)) return;
      const L = h.value.find((Q) => Q.columnKey === U.key) || null, Y = KT(U, L);
      b(Y);
    }
    const _ = /* @__PURE__ */ new Map();
    function z(O) {
      _.set(O.key, R(O.key));
    }
    function M(O, U) {
      const L = _.get(O.key);
      if (L === void 0)
        return;
      const Y = L + U, Q = jT(Y, O.minWidth, O.maxWidth);
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
      mergedTableLayout: v,
      headerCheckboxDisabled: f,
      headerHeight: g,
      virtualScrollHeader: m,
      virtualListRef: y,
      handleCheckboxUpdateChecked: E,
      handleColHeaderClick: W,
      handleTableHeaderScroll: C,
      handleColumnResizeStart: z,
      handleColumnResize: M
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
      mergedTableLayout: v,
      headerCheckboxDisabled: f,
      mergedSortState: m,
      virtualScrollHeader: g,
      handleColHeaderClick: u,
      handleCheckboxUpdateChecked: w,
      handleColumnResizeStart: C,
      handleColumnResize: b
    } = this, x = (R, E, W) => R.map(({
      column: _,
      colIndex: z,
      colSpan: M,
      rowSpan: O,
      isLast: U
    }) => {
      var L, Y;
      const Q = fn(_), {
        ellipsis: J
      } = _, q = () => _.type === "selection" ? _.multiple !== !1 ? st(yf, null, st(bd, {
        key: r,
        privateInsideTable: !0,
        checked: i,
        indeterminate: l,
        disabled: f,
        onUpdateChecked: w
      }), c ? st(LE, {
        clsPrefix: t
      }) : null) : null : st(yf, null, st("div", {
        class: `${t}-data-table-th__title-wrapper`
      }, st("div", {
        class: `${t}-data-table-th__title`
      }, J === !0 || J && !J.tooltip ? st("div", {
        class: `${t}-data-table-th__ellipsis`
      }, Ll(_)) : J && typeof J == "object" ? st(Cd, Object.assign({}, J, {
        theme: d.peers.Ellipsis,
        themeOverrides: d.peerOverrides.Ellipsis
      }), {
        default: () => Ll(_)
      }) : Ll(_)), zl(_) ? st(JF, {
        column: _
      }) : null), of(_) ? st(NF, {
        column: _,
        options: _.filterOptions
      }) : null, hv(_) ? st(qF, {
        onResizeStart: () => {
          C(_);
        },
        onResize: (ae) => {
          b(_, ae);
        }
      }) : null), I = Q in n, G = Q in o, Z = E && !_.fixed ? "div" : "th";
      return st(Z, {
        ref: (ae) => e[Q] = ae,
        key: Q,
        style: [E && !_.fixed ? {
          position: "absolute",
          left: it(E(z)),
          top: 0,
          bottom: 0
        } : {
          left: it((L = n[Q]) === null || L === void 0 ? void 0 : L.start),
          right: it((Y = o[Q]) === null || Y === void 0 ? void 0 : Y.start)
        }, {
          width: it(_.width),
          textAlign: _.titleAlign || _.align,
          height: W
        }],
        colspan: M,
        rowspan: O,
        "data-col-key": Q,
        class: [`${t}-data-table-th`, (I || G) && `${t}-data-table-th--fixed-${I ? "left" : "right"}`, {
          [`${t}-data-table-th--sorting`]: pv(_, m),
          [`${t}-data-table-th--filterable`]: of(_),
          [`${t}-data-table-th--sortable`]: zl(_),
          [`${t}-data-table-th--selection`]: _.type === "selection",
          [`${t}-data-table-th--last`]: U
        }, _.className],
        onClick: _.type !== "selection" && _.type !== "expand" && !("children" in _) ? (ae) => {
          u(ae, _);
        } : void 0
      }, q());
    });
    if (g) {
      const {
        headerHeight: R
      } = this;
      let E = 0, W = 0;
      return s.forEach((_) => {
        _.column.fixed === "left" ? E++ : _.column.fixed === "right" && W++;
      }), st(Qs, {
        ref: "virtualListRef",
        class: `${t}-data-table-base-table-header`,
        style: {
          height: it(R)
        },
        onScroll: this.handleTableHeaderScroll,
        columns: s,
        itemSize: R,
        showScrollbar: !1,
        items: [{}],
        itemResizable: !1,
        visibleItemsTag: NE,
        visibleItemsProps: {
          clsPrefix: t,
          id: h,
          cols: s,
          width: St(this.scrollX)
        },
        renderItemWithCols: ({
          startColIndex: _,
          endColIndex: z,
          getLeft: M
        }) => {
          const O = s.map((L, Y) => ({
            column: L.column,
            isLast: Y === s.length - 1,
            colIndex: L.index,
            colSpan: 1,
            rowSpan: 1
          })).filter(({
            column: L
          }, Y) => !!(_ <= Y && Y <= z || L.fixed)), U = x(O, M, it(R));
          return U.splice(E, 0, st("th", {
            colspan: s.length - E - W,
            style: {
              pointerEvents: "none",
              visibility: "hidden",
              height: 0
            }
          })), st("tr", {
            style: {
              position: "relative"
            }
          }, U);
        }
      }, {
        default: ({
          renderedItemWithCols: _
        }) => _
      });
    }
    const S = st("thead", {
      class: `${t}-data-table-thead`,
      "data-n-id": h
    }, a.map((R) => st("tr", {
      class: `${t}-data-table-tr`
    }, x(R, null, void 0))));
    if (!p)
      return S;
    const {
      handleTableHeaderScroll: y,
      scrollX: T
    } = this;
    return st("div", {
      class: `${t}-data-table-base-table-header`,
      onScroll: y
    }, st("table", {
      class: `${t}-data-table-table`,
      style: {
        minWidth: St(T),
        tableLayout: v
      }
    }, st("colgroup", null, s.map((R) => st("col", {
      key: R.key,
      style: R.style
    }))), S));
  }
}), Cf = window.Vue.computed, _v = window.Vue.defineComponent, HE = window.Vue.Fragment, tt = window.Vue.h, Sf = window.Vue.inject, jE = window.Vue.onUnmounted, Dl = window.Vue.ref, WE = window.Vue.watchEffect;
function UE(e, t) {
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
const KE = _v({
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
    return tt("table", {
      style: {
        tableLayout: "fixed"
      },
      class: `${e}-data-table-table`,
      onMouseenter: o,
      onMouseleave: r
    }, tt("colgroup", null, n.map((i) => tt("col", {
      key: i.key,
      style: i.style
    }))), tt("tbody", {
      "data-n-id": t,
      class: `${e}-data-table-tbody`
    }, this.$slots));
  }
}), qE = _v({
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
      rowClassNameRef: v,
      leftActiveFixedColKeyRef: f,
      leftActiveFixedChildrenColKeysRef: m,
      rightActiveFixedColKeyRef: g,
      rightActiveFixedChildrenColKeysRef: u,
      renderExpandRef: w,
      hoverKeyRef: C,
      summaryRef: b,
      mergedSortStateRef: x,
      virtualScrollRef: S,
      virtualScrollXRef: y,
      heightForRowRef: T,
      minRowHeightRef: R,
      componentId: E,
      mergedTableLayoutRef: W,
      childTriggerColIndexRef: _,
      indentRef: z,
      rowPropsRef: M,
      maxHeightRef: O,
      stripedRef: U,
      loadingRef: L,
      onLoadRef: Y,
      loadingKeySetRef: Q,
      expandableRef: J,
      stickyExpandedRowsRef: q,
      renderExpandIconRef: I,
      summaryPlacementRef: G,
      treeMateRef: Z,
      scrollbarPropsRef: ae,
      setHeaderScrollLeft: le,
      doUpdateExpandedRowKeys: de,
      handleTableBodyScroll: me,
      doCheck: X,
      doUncheck: ce,
      renderCell: ke
    } = Sf(mn), ge = Sf(Hn), $e = Dl(null), Se = Dl(null), Be = Dl(null), Me = Oe(() => s.value.length === 0), oe = Oe(() => e.showHeader || !Me.value), k = Oe(() => e.showHeader || Me.value);
    let $ = "";
    const D = Cf(() => new Set(o.value));
    function ee(fe) {
      var Re;
      return (Re = Z.value.getNode(fe)) === null || Re === void 0 ? void 0 : Re.rawNode;
    }
    function ve(fe, Re, P) {
      const N = ee(fe.key);
      if (!N) {
        so("data-table", `fail to get row data with key ${fe.key}`);
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
        so("data-table", `fail to get row data with key ${fe.key}`);
        return;
      }
      X(fe.key, !0, Re);
    }
    function F() {
      if (!oe.value) {
        const {
          value: Re
        } = Be;
        return Re || null;
      }
      if (S.value)
        return Te();
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
      C.value = null;
    }
    function Te() {
      const {
        value: fe
      } = Se;
      return (fe == null ? void 0 : fe.listElRef) || null;
    }
    function lt() {
      const {
        value: fe
      } = Se;
      return (fe == null ? void 0 : fe.itemsElRef) || null;
    }
    function pt(fe) {
      var Re;
      me(fe), (Re = $e.value) === null || Re === void 0 || Re.sync();
    }
    function Ye(fe) {
      var Re;
      const {
        onResize: P
      } = e;
      P && P(fe), (Re = $e.value) === null || Re === void 0 || Re.sync();
    }
    const Ze = {
      getScrollContainer: F,
      scrollTo(fe, Re) {
        var P, N;
        S.value ? (P = Se.value) === null || P === void 0 || P.scrollTo(fe, Re) : (N = $e.value) === null || N === void 0 || N.scrollTo(fe, Re);
      }
    }, mt = H([({
      props: fe
    }) => {
      const Re = (N) => N === null ? null : H(`[data-n-id="${fe.componentId}"] [data-col-key="${N}"]::after`, {
        boxShadow: "var(--n-box-shadow-after)"
      }), P = (N) => N === null ? null : H(`[data-n-id="${fe.componentId}"] [data-col-key="${N}"]::before`, {
        boxShadow: "var(--n-box-shadow-before)"
      });
      return H([Re(fe.leftActiveFixedColKey), P(fe.rightActiveFixedColKey), fe.leftActiveFixedChildrenColKeys.map((N) => Re(N)), fe.rightActiveFixedChildrenColKeys.map((N) => P(N))]);
    }]);
    let et = !1;
    return WE(() => {
      const {
        value: fe
      } = f, {
        value: Re
      } = m, {
        value: P
      } = g, {
        value: N
      } = u;
      if (!et && fe === null && P === null)
        return;
      const te = {
        leftActiveFixedColKey: fe,
        leftActiveFixedChildrenColKeys: Re,
        rightActiveFixedColKey: P,
        rightActiveFixedChildrenColKeys: N,
        componentId: E
      };
      mt.mount({
        id: `n-${E}`,
        force: !0,
        props: te,
        anchorMetaName: or,
        parent: ge == null ? void 0 : ge.styleMountTarget
      }), et = !0;
    }), jE(() => {
      mt.unmount({
        id: `n-${E}`,
        parent: ge == null ? void 0 : ge.styleMountTarget
      });
    }), Object.assign({
      bodyWidth: n,
      summaryPlacement: G,
      dataTableSlots: t,
      componentId: E,
      scrollbarInstRef: $e,
      virtualListRef: Se,
      emptyElRef: Be,
      summary: b,
      mergedClsPrefix: r,
      mergedTheme: i,
      scrollX: l,
      cols: a,
      loading: L,
      bodyShowHeaderOnly: k,
      shouldDisplaySomeTablePart: oe,
      empty: Me,
      paginatedDataAndInfo: Cf(() => {
        const {
          value: fe
        } = U;
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
      rowClassName: v,
      renderExpand: w,
      mergedExpandedRowKeySet: D,
      hoverKey: C,
      mergedSortState: x,
      virtualScroll: S,
      virtualScrollX: y,
      heightForRow: T,
      minRowHeight: R,
      mergedTableLayout: W,
      childTriggerColIndex: _,
      indent: z,
      rowProps: M,
      maxHeight: O,
      loadingKeySet: Q,
      expandable: J,
      stickyExpandedRows: q,
      renderExpandIcon: I,
      scrollbarProps: ae,
      setHeaderScrollLeft: le,
      handleVirtualListScroll: pt,
      handleVirtualListResize: Ye,
      handleMouseleaveTable: pe,
      virtualListContainer: Te,
      virtualListContent: lt,
      handleTableBodyScroll: me,
      handleCheckboxUpdateChecked: ve,
      handleRadioUpdateChecked: he,
      handleUpdateExpanded: j,
      renderCell: ke
    }, Ze);
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
    } = this, c = t !== void 0 || r !== void 0 || l, h = !c && i === "auto", p = t !== void 0 || h, v = {
      minWidth: St(t) || "100%"
    };
    t && (v.width = "100%");
    const f = tt(si, Object.assign({}, this.scrollbarProps, {
      ref: "scrollbarInstRef",
      scrollable: c || h,
      class: `${n}-data-table-base-table-body`,
      style: this.empty ? void 0 : this.bodyStyle,
      theme: e.peers.Scrollbar,
      themeOverrides: e.peerOverrides.Scrollbar,
      contentStyle: v,
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
        const m = {}, g = {}, {
          cols: u,
          paginatedDataAndInfo: w,
          mergedTheme: C,
          fixedColumnLeftMap: b,
          fixedColumnRightMap: x,
          currentPage: S,
          rowClassName: y,
          mergedSortState: T,
          mergedExpandedRowKeySet: R,
          stickyExpandedRows: E,
          componentId: W,
          childTriggerColIndex: _,
          expandable: z,
          rowProps: M,
          handleMouseleaveTable: O,
          renderExpand: U,
          summary: L,
          handleCheckboxUpdateChecked: Y,
          handleRadioUpdateChecked: Q,
          handleUpdateExpanded: J,
          heightForRow: q,
          minRowHeight: I,
          virtualScrollX: G
        } = this, {
          length: Z
        } = u;
        let ae;
        const {
          data: le,
          hasChildren: de
        } = w, me = de ? UE(le, R) : le;
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
            ae = this.summaryPlacement === "top" ? [...D, ...me] : [...me, ...D];
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
            ae = this.summaryPlacement === "top" ? [D, ...me] : [...me, D];
          }
        } else
          ae = me;
        const X = de ? {
          width: it(this.indent)
        } : void 0, ce = [];
        ae.forEach(($) => {
          U && R.has($.key) && (!z || z($.tmNode.rawNode)) ? ce.push($, {
            isExpandedRow: !0,
            key: `${$.key}-expand`,
            // solve key repeat of the expanded row
            tmNode: $.tmNode,
            index: $.index
          }) : ce.push($);
        });
        const {
          length: ke
        } = ce, ge = {};
        le.forEach(({
          tmNode: $
        }, D) => {
          ge[D] = $.key;
        });
        const $e = E ? this.bodyWidth : null, Se = $e === null ? void 0 : `${$e}px`, Be = this.virtualScrollX ? "div" : "td";
        let Me = 0, oe = 0;
        G && u.forEach(($) => {
          $.column.fixed === "left" ? Me++ : $.column.fixed === "right" && oe++;
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
            return tt("tr", {
              class: `${n}-data-table-tr ${n}-data-table-tr--expanded`,
              key: `${se}__expand`
            }, tt("td", {
              class: [`${n}-data-table-td`, `${n}-data-table-td--last-col`, D + 1 === ke && `${n}-data-table-td--last-row`],
              colspan: Z
            }, E ? tt("div", {
              class: `${n}-data-table-expand`,
              style: {
                width: Se
              }
            }, U(ue, pe)) : U(ue, pe)));
          }
          const Te = "isSummaryRow" in $, lt = !Te && $.striped, {
            tmNode: pt,
            key: Ye
          } = $, {
            rawNode: Ze
          } = pt, mt = R.has(Ye), et = M ? M(Ze, pe) : void 0, fe = typeof y == "string" ? y : UT(Ze, pe, y), Re = ve ? u.filter((se, ue) => !!(he <= ue && ue <= F || se.column.fixed)) : u, P = ve ? it((q == null ? void 0 : q(Ze, pe)) || I) : void 0, N = Re.map((se) => {
            var ue, be, we, Ce, Ae;
            const ot = se.index;
            if (D in m) {
              const rt = m[D], ct = rt.indexOf(ot);
              if (~ct)
                return rt.splice(ct, 1), null;
            }
            const {
              column: Ne
            } = se, Pt = fn(se), {
              rowSpan: It,
              colSpan: At
            } = Ne, Nt = Te ? ((ue = $.tmNode.rawNode[Pt]) === null || ue === void 0 ? void 0 : ue.colSpan) || 1 : At ? At(Ze, pe) : 1, Ht = Te ? ((be = $.tmNode.rawNode[Pt]) === null || be === void 0 ? void 0 : be.rowSpan) || 1 : It ? It(Ze, pe) : 1, Qt = ot + Nt === Z, jt = D + Ht === ke, V = Ht > 1;
            if (V && (g[D] = {
              [ot]: []
            }), Nt > 1 || V)
              for (let rt = D; rt < D + Ht; ++rt) {
                V && g[D][ot].push(ge[rt]);
                for (let ct = ot; ct < ot + Nt; ++ct)
                  rt === D && ct === ot || (rt in m ? m[rt].push(ct) : m[rt] = [ct]);
              }
            const ne = V ? this.hoverKey : null, {
              cellProps: xe
            } = Ne, Ee = xe == null ? void 0 : xe(Ze, pe), He = {
              "--indent-offset": ""
            }, Ve = Ne.fixed ? "td" : Be;
            return tt(Ve, Object.assign({}, Ee, {
              key: Pt,
              style: [{
                textAlign: Ne.align || void 0,
                width: it(Ne.width)
              }, ve && {
                height: P
              }, ve && !Ne.fixed ? {
                position: "absolute",
                left: it(j(ot)),
                top: 0,
                bottom: 0
              } : {
                left: it((we = b[Pt]) === null || we === void 0 ? void 0 : we.start),
                right: it((Ce = x[Pt]) === null || Ce === void 0 ? void 0 : Ce.start)
              }, He, (Ee == null ? void 0 : Ee.style) || ""],
              colspan: Nt,
              rowspan: ee ? void 0 : Ht,
              "data-col-key": Pt,
              class: [`${n}-data-table-td`, Ne.className, Ee == null ? void 0 : Ee.class, Te && `${n}-data-table-td--summary`, ne !== null && g[D][ot].includes(ne) && `${n}-data-table-td--hover`, pv(Ne, T) && `${n}-data-table-td--sorting`, Ne.fixed && `${n}-data-table-td--fixed-${Ne.fixed}`, Ne.align && `${n}-data-table-td--${Ne.align}-align`, Ne.type === "selection" && `${n}-data-table-td--selection`, Ne.type === "expand" && `${n}-data-table-td--expand`, Qt && `${n}-data-table-td--last-col`, jt && `${n}-data-table-td--last-row`]
            }), de && ot === _ ? [Bb(He["--indent-offset"] = Te ? 0 : $.tmNode.level, tt("div", {
              class: `${n}-data-table-indent`,
              style: X
            })), Te || $.tmNode.isLeaf ? tt("div", {
              class: `${n}-data-table-expand-placeholder`
            }) : tt(ff, {
              class: `${n}-data-table-expand-trigger`,
              clsPrefix: n,
              expanded: mt,
              rowData: Ze,
              renderExpandIcon: this.renderExpandIcon,
              loading: a.has($.key),
              onClick: () => {
                J(Ye, $.tmNode);
              }
            })] : null, Ne.type === "selection" ? Te ? null : Ne.multiple === !1 ? tt(vF, {
              key: S,
              rowKey: Ye,
              disabled: $.tmNode.disabled,
              onUpdateChecked: () => {
                Q($.tmNode);
              }
            }) : tt(JT, {
              key: S,
              rowKey: Ye,
              disabled: $.tmNode.disabled,
              onUpdateChecked: (rt, ct) => {
                Y($.tmNode, rt, ct.shiftKey);
              }
            }) : Ne.type === "expand" ? Te ? null : !Ne.expandable || !((Ae = Ne.expandable) === null || Ae === void 0) && Ae.call(Ne, Ze) ? tt(ff, {
              clsPrefix: n,
              rowData: Ze,
              expanded: mt,
              renderExpandIcon: this.renderExpandIcon,
              onClick: () => {
                J(Ye, null);
              }
            }) : null : tt(TF, {
              clsPrefix: n,
              index: pe,
              row: Ze,
              column: Ne,
              isSummary: Te,
              mergedTheme: C,
              renderCell: this.renderCell
            }));
          });
          return ve && Me && oe && N.splice(Me, 0, tt("td", {
            colspan: u.length - Me - oe,
            style: {
              pointerEvents: "none",
              visibility: "hidden",
              height: 0
            }
          })), tt("tr", Object.assign({}, et, {
            onMouseenter: (se) => {
              var ue;
              this.hoverKey = Ye, (ue = et == null ? void 0 : et.onMouseenter) === null || ue === void 0 || ue.call(et, se);
            },
            key: Ye,
            class: [`${n}-data-table-tr`, Te && `${n}-data-table-tr--summary`, lt && `${n}-data-table-tr--striped`, mt && `${n}-data-table-tr--expanded`, fe, et == null ? void 0 : et.class],
            style: [et == null ? void 0 : et.style, ve && {
              height: P
            }]
          }), N);
        };
        return o ? tt(Qs, {
          ref: "virtualListRef",
          items: ce,
          itemSize: this.minRowHeight,
          visibleItemsTag: KE,
          visibleItemsProps: {
            clsPrefix: n,
            id: W,
            cols: u,
            onMouseleave: O
          },
          showScrollbar: !1,
          onResize: this.handleVirtualListResize,
          onScroll: this.handleVirtualListScroll,
          itemsStyle: v,
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
        }) : tt("table", {
          class: `${n}-data-table-table`,
          onMouseleave: O,
          style: {
            tableLayout: this.mergedTableLayout
          }
        }, tt("colgroup", null, u.map(($) => tt("col", {
          key: $.key,
          style: $.style
        }))), this.showHeader ? tt(Pv, {
          discrete: !1
        }) : null, this.empty ? null : tt("tbody", {
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
      const m = () => tt("div", {
        class: [`${n}-data-table-empty`, this.loading && `${n}-data-table-empty--hide`],
        style: this.bodyStyle,
        ref: "emptyElRef"
      }, vn(this.dataTableSlots.empty, () => [tt(Kp, {
        theme: this.mergedTheme.peers.Empty,
        themeOverrides: this.mergedTheme.peerOverrides.Empty
      })]));
      return this.shouldDisplaySomeTablePart ? tt(HE, null, f, m()) : tt(To, {
        onResize: this.onResize
      }, {
        default: m
      });
    }
    return f;
  }
}), GE = window.Vue.computed, XE = window.Vue.defineComponent, Nl = window.Vue.h, YE = window.Vue.inject, Xi = window.Vue.ref, ZE = window.Vue.watchEffect, JE = XE({
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
    } = YE(mn), d = Xi(null), c = Xi(null), h = Xi(null), p = Xi(!(n.value.length || t.value.length)), v = GE(() => ({
      maxHeight: St(r.value),
      minHeight: St(i.value)
    }));
    function f(w) {
      o.value = w.contentRect.width, s(), p.value || (p.value = !0);
    }
    function m() {
      var w;
      const {
        value: C
      } = d;
      return C ? a.value ? ((w = C.virtualListRef) === null || w === void 0 ? void 0 : w.listElRef) || null : C.$el : null;
    }
    function g() {
      const {
        value: w
      } = c;
      return w ? w.getScrollContainer() : null;
    }
    const u = {
      getBodyElement: g,
      getHeaderElement: m,
      scrollTo(w, C) {
        var b;
        (b = c.value) === null || b === void 0 || b.scrollTo(w, C);
      }
    };
    return ZE(() => {
      const {
        value: w
      } = h;
      if (!w) return;
      const C = `${e.value}-data-table-base-table--transition-disabled`;
      p.value ? setTimeout(() => {
        w.classList.remove(C);
      }, 0) : w.classList.add(C);
    }), Object.assign({
      maxHeight: r,
      mergedClsPrefix: e,
      selfElRef: h,
      headerInstRef: d,
      bodyInstRef: c,
      bodyStyle: v,
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
    return Nl("div", {
      class: `${e}-data-table-base-table`,
      ref: "selfElRef"
    }, o ? null : Nl(Pv, {
      ref: "headerInstRef"
    }), Nl(qE, {
      ref: "bodyInstRef",
      bodyStyle: this.bodyStyle,
      showHeader: o,
      flexHeight: n,
      onResize: this.handleBodyResize
    }));
  }
}), $f = e2(), QE = H([A("data-table", `
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
 `, [A("data-table-wrapper", `
 flex-grow: 1;
 display: flex;
 flex-direction: column;
 `), K("flex-height", [H(">", [A("data-table-wrapper", [H(">", [A("data-table-base-table", `
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 `, [H(">", [A("data-table-base-table-body", "flex-basis: 0;", [
  // last-child means there is no empty icon
  // body is a scrollbar, we need to override height 100%
  H("&:last-child", "flex-grow: 1;")
])])])])])])]), H(">", [A("data-table-loading-wrapper", `
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
 `, [za({
  originalTransform: "translateX(-50%) translateY(-50%)"
})])]), A("data-table-expand-placeholder", `
 margin-right: 8px;
 display: inline-block;
 width: 16px;
 height: 1px;
 `), A("data-table-indent", `
 display: inline-block;
 height: 1px;
 `), A("data-table-expand-trigger", `
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
 `, [K("expanded", [A("icon", "transform: rotate(90deg);", [rn({
  originalTransform: "rotate(90deg)"
})]), A("base-icon", "transform: rotate(90deg);", [rn({
  originalTransform: "rotate(90deg)"
})])]), A("base-loading", `
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [rn()]), A("icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [rn()]), A("base-icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [rn()])]), A("data-table-thead", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-merged-th-color);
 `), A("data-table-tr", `
 position: relative;
 box-sizing: border-box;
 background-clip: padding-box;
 transition: background-color .3s var(--n-bezier);
 `, [A("data-table-expand", `
 position: sticky;
 left: 0;
 overflow: hidden;
 margin: calc(var(--n-th-padding) * -1);
 padding: var(--n-th-padding);
 box-sizing: border-box;
 `), K("striped", "background-color: var(--n-merged-td-color-striped);", [A("data-table-td", "background-color: var(--n-merged-td-color-striped);")]), Qe("summary", [H("&:hover", "background-color: var(--n-merged-td-color-hover);", [H(">", [A("data-table-td", "background-color: var(--n-merged-td-color-hover);")])])])]), A("data-table-th", `
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
 `, [K("filterable", `
 padding-right: 36px;
 `, [K("sortable", `
 padding-right: calc(var(--n-th-padding) + 36px);
 `)]), $f, K("selection", `
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
 `), K("hover", `
 background-color: var(--n-merged-th-color-hover);
 `), K("sorting", `
 background-color: var(--n-merged-th-color-sorting);
 `), K("sortable", `
 cursor: pointer;
 `, [B("ellipsis", `
 max-width: calc(100% - 18px);
 `), H("&:hover", `
 background-color: var(--n-merged-th-color-hover);
 `)]), A("data-table-sorter", `
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
 `, [A("base-icon", "transition: transform .3s var(--n-bezier)"), K("desc", [A("base-icon", `
 transform: rotate(0deg);
 `)]), K("asc", [A("base-icon", `
 transform: rotate(-180deg);
 `)]), K("asc, desc", `
 color: var(--n-th-icon-color-active);
 `)]), A("data-table-resize-button", `
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
 `), K("active", [H("&::after", ` 
 background-color: var(--n-th-icon-color-active);
 `)]), H("&:hover::after", `
 background-color: var(--n-th-icon-color-active);
 `)]), A("data-table-filter", `
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
 `), K("show", `
 background-color: var(--n-th-button-color-hover);
 `), K("active", `
 background-color: var(--n-th-button-color-hover);
 color: var(--n-th-icon-color-active);
 `)])]), A("data-table-td", `
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
 `, [K("expand", [A("data-table-expand-trigger", `
 margin-right: 0;
 `)]), K("last-row", `
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
]), K("summary", `
 background-color: var(--n-merged-th-color);
 `), K("hover", `
 background-color: var(--n-merged-td-color-hover);
 `), K("sorting", `
 background-color: var(--n-merged-td-color-sorting);
 `), B("ellipsis", `
 display: inline-block;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 vertical-align: bottom;
 max-width: calc(100% - var(--indent-offset, -1.5) * 16px - 24px);
 `), K("selection, expand", `
 text-align: center;
 padding: 0;
 line-height: 0;
 `), $f]), A("data-table-empty", `
 box-sizing: border-box;
 padding: var(--n-empty-padding);
 flex-grow: 1;
 flex-shrink: 0;
 opacity: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: opacity .3s var(--n-bezier);
 `, [K("hide", `
 opacity: 0;
 `)]), B("pagination", `
 margin: var(--n-pagination-margin);
 display: flex;
 justify-content: flex-end;
 `), A("data-table-wrapper", `
 position: relative;
 opacity: 1;
 transition: opacity .3s var(--n-bezier), border-color .3s var(--n-bezier);
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 line-height: var(--n-line-height);
 `), K("loading", [A("data-table-wrapper", `
 opacity: var(--n-opacity-loading);
 pointer-events: none;
 `)]), K("single-column", [A("data-table-td", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [H("&::after, &::before", `
 bottom: 0 !important;
 `)])]), Qe("single-line", [A("data-table-th", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [K("last", `
 border-right: 0 solid var(--n-merged-border-color);
 `)]), A("data-table-td", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [K("last-col", `
 border-right: 0 solid var(--n-merged-border-color);
 `)])]), K("bordered", [A("data-table-wrapper", `
 border: 1px solid var(--n-merged-border-color);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 overflow: hidden;
 `)]), A("data-table-base-table", [K("transition-disabled", [A("data-table-th", [H("&::after, &::before", "transition: none;")]), A("data-table-td", [H("&::after, &::before", "transition: none;")])])]), K("bottom-bordered", [A("data-table-td", [K("last-row", `
 border-bottom: 1px solid var(--n-merged-border-color);
 `)])]), A("data-table-table", `
 font-variant-numeric: tabular-nums;
 width: 100%;
 word-break: break-word;
 transition: background-color .3s var(--n-bezier);
 border-collapse: separate;
 border-spacing: 0;
 background-color: var(--n-merged-td-color);
 `), A("data-table-base-table-header", `
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
 `)]), A("data-table-check-extra", `
 transition: color .3s var(--n-bezier);
 color: var(--n-th-icon-color);
 position: absolute;
 font-size: 14px;
 right: -4px;
 top: 50%;
 transform: translateY(-50%);
 z-index: 1;
 `)]), A("data-table-filter-menu", [A("scrollbar", `
 max-height: 240px;
 `), B("group", `
 display: flex;
 flex-direction: column;
 padding: 12px 12px 0 12px;
 `, [A("checkbox", `
 margin-bottom: 12px;
 margin-right: 0;
 `), A("radio", `
 margin-bottom: 12px;
 margin-right: 0;
 `)]), B("action", `
 padding: var(--n-action-padding);
 display: flex;
 flex-wrap: nowrap;
 justify-content: space-evenly;
 border-top: 1px solid var(--n-action-divider-color);
 `, [A("button", [H("&:not(:last-child)", `
 margin: var(--n-action-button-margin);
 `), H("&:last-child", `
 margin-right: 0;
 `)])]), A("divider", `
 margin: 0 !important;
 `)]), js(A("data-table", `
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 --n-merged-th-color-hover: var(--n-th-color-hover-modal);
 --n-merged-td-color-hover: var(--n-td-color-hover-modal);
 --n-merged-th-color-sorting: var(--n-th-color-hover-modal);
 --n-merged-td-color-sorting: var(--n-td-color-hover-modal);
 --n-merged-td-color-striped: var(--n-td-color-striped-modal);
 `)), Ws(A("data-table", `
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 --n-merged-th-color-hover: var(--n-th-color-hover-popover);
 --n-merged-td-color-hover: var(--n-td-color-hover-popover);
 --n-merged-th-color-sorting: var(--n-th-color-hover-popover);
 --n-merged-td-color-sorting: var(--n-td-color-hover-popover);
 --n-merged-td-color-striped: var(--n-td-color-striped-popover);
 `))]);
function e2() {
  return [K("fixed-left", `
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
 `)]), K("fixed-right", `
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
const Cn = window.Vue.computed, t2 = window.Vue.ref;
function n2(e, t) {
  const {
    paginatedDataRef: n,
    treeMateRef: o,
    selectionColumnRef: r
  } = t, i = t2(e.defaultCheckedRowKeys), l = Cn(() => {
    var x;
    const {
      checkedRowKeys: S
    } = e, y = S === void 0 ? i.value : S;
    return ((x = r.value) === null || x === void 0 ? void 0 : x.multiple) === !1 ? {
      checkedKeys: y.slice(0, 1),
      indeterminateKeys: []
    } : o.value.getCheckedKeys(y, {
      cascade: e.cascade,
      allowNotLoaded: e.allowCheckingNotLoaded
    });
  }), a = Cn(() => l.value.checkedKeys), s = Cn(() => l.value.indeterminateKeys), d = Cn(() => new Set(a.value)), c = Cn(() => new Set(s.value)), h = Cn(() => {
    const {
      value: x
    } = d;
    return n.value.reduce((S, y) => {
      const {
        key: T,
        disabled: R
      } = y;
      return S + (!R && x.has(T) ? 1 : 0);
    }, 0);
  }), p = Cn(() => n.value.filter((x) => x.disabled).length), v = Cn(() => {
    const {
      length: x
    } = n.value, {
      value: S
    } = c;
    return h.value > 0 && h.value < x - p.value || n.value.some((y) => S.has(y.key));
  }), f = Cn(() => {
    const {
      length: x
    } = n.value;
    return h.value !== 0 && h.value === x - p.value;
  }), m = Cn(() => n.value.length === 0);
  function g(x, S, y) {
    const {
      "onUpdate:checkedRowKeys": T,
      onUpdateCheckedRowKeys: R,
      onCheckedRowKeysChange: E
    } = e, W = [], {
      value: {
        getNode: _
      }
    } = o;
    x.forEach((z) => {
      var M;
      const O = (M = _(z)) === null || M === void 0 ? void 0 : M.rawNode;
      W.push(O);
    }), T && ie(T, x, W, {
      row: S,
      action: y
    }), R && ie(R, x, W, {
      row: S,
      action: y
    }), E && ie(E, x, W, {
      row: S,
      action: y
    }), i.value = x;
  }
  function u(x, S = !1, y) {
    if (!e.loading) {
      if (S) {
        g(Array.isArray(x) ? x.slice(0, 1) : [x], y, "check");
        return;
      }
      g(o.value.check(x, a.value, {
        cascade: e.cascade,
        allowNotLoaded: e.allowCheckingNotLoaded
      }).checkedKeys, y, "check");
    }
  }
  function w(x, S) {
    e.loading || g(o.value.uncheck(x, a.value, {
      cascade: e.cascade,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, S, "uncheck");
  }
  function C(x = !1) {
    const {
      value: S
    } = r;
    if (!S || e.loading) return;
    const y = [];
    (x ? o.value.treeNodes : n.value).forEach((T) => {
      T.disabled || y.push(T.key);
    }), g(o.value.check(y, a.value, {
      cascade: !0,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, void 0, "checkAll");
  }
  function b(x = !1) {
    const {
      value: S
    } = r;
    if (!S || e.loading) return;
    const y = [];
    (x ? o.value.treeNodes : n.value).forEach((T) => {
      T.disabled || y.push(T.key);
    }), g(o.value.uncheck(y, a.value, {
      cascade: !0,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, void 0, "uncheckAll");
  }
  return {
    mergedCheckedRowKeySetRef: d,
    mergedCheckedRowKeysRef: a,
    mergedInderminateRowKeySetRef: c,
    someRowsCheckedRef: v,
    allRowsCheckedRef: f,
    headerCheckboxDisabledRef: m,
    doUpdateCheckedRowKeys: g,
    doCheckAll: C,
    doUncheckAll: b,
    doCheck: u,
    doUncheck: w
  };
}
const o2 = window.Vue.ref, Rf = window.Vue.toRef;
function r2(e, t) {
  const n = Oe(() => {
    for (const d of e.columns)
      if (d.type === "expand")
        return d.renderExpand;
  }), o = Oe(() => {
    let d;
    for (const c of e.columns)
      if (c.type === "expand") {
        d = c.expandable;
        break;
      }
    return d;
  }), r = o2(e.defaultExpandAll ? n != null && n.value ? (() => {
    const d = [];
    return t.value.treeNodes.forEach((c) => {
      var h;
      !((h = o.value) === null || h === void 0) && h.call(o, c.rawNode) && d.push(c.key);
    }), d;
  })() : t.value.getNonLeafKeys() : e.defaultExpandedRowKeys), i = Rf(e, "expandedRowKeys"), l = Rf(e, "stickyExpandedRows"), a = zt(i, r);
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
const Er = window.Vue.computed;
function i2(e, t) {
  const n = [], o = [], r = [], i = /* @__PURE__ */ new WeakMap();
  let l = -1, a = 0, s = !1, d = 0;
  function c(p, v) {
    v > l && (n[v] = [], l = v), p.forEach((f) => {
      if ("children" in f)
        c(f.children, v + 1);
      else {
        const m = "key" in f ? f.key : void 0;
        o.push({
          key: fn(f),
          style: WT(f, m !== void 0 ? St(t(m)) : void 0),
          column: f,
          index: d++,
          // The width property is only applied to horizontally virtual scroll table
          width: f.width === void 0 ? 128 : Number(f.width)
        }), a += 1, s || (s = !!f.ellipsis), r.push(f);
      }
    });
  }
  c(e, 0), d = 0;
  function h(p, v) {
    let f = 0;
    p.forEach((m) => {
      var g;
      if ("children" in m) {
        const u = d, w = {
          column: m,
          colIndex: d,
          colSpan: 0,
          rowSpan: 1,
          isLast: !1
        };
        h(m.children, v + 1), m.children.forEach((C) => {
          var b, x;
          w.colSpan += (x = (b = i.get(C)) === null || b === void 0 ? void 0 : b.colSpan) !== null && x !== void 0 ? x : 0;
        }), u + w.colSpan === a && (w.isLast = !0), i.set(m, w), n[v].push(w);
      } else {
        if (d < f) {
          d += 1;
          return;
        }
        let u = 1;
        "titleColSpan" in m && (u = (g = m.titleColSpan) !== null && g !== void 0 ? g : 1), u > 1 && (f = d + u);
        const w = d + u === a, C = {
          column: m,
          colSpan: u,
          colIndex: d,
          rowSpan: l - v + 1,
          isLast: w
        };
        i.set(m, C), n[v].push(C), d += 1;
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
function a2(e, t) {
  const n = Er(() => i2(e.columns, t));
  return {
    rowsRef: Er(() => n.value.rows),
    colsRef: Er(() => n.value.cols),
    hasEllipsisRef: Er(() => n.value.hasEllipsis),
    dataRelatedColsRef: Er(() => n.value.dataRelatedCols)
  };
}
const l2 = window.Vue.ref;
function s2() {
  const e = l2({});
  function t(r) {
    return e.value[r];
  }
  function n(r, i) {
    hv(r) && "key" in r && (e.value[r.key] = i);
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
const Or = window.Vue.computed, zr = window.Vue.ref, d2 = window.Vue.watch;
function c2(e, {
  mainTableInstRef: t,
  mergedCurrentPageRef: n,
  bodyWidthRef: o
}) {
  let r = 0;
  const i = zr(), l = zr(null), a = zr([]), s = zr(null), d = zr([]), c = Or(() => St(e.scrollX)), h = Or(() => e.columns.filter((R) => R.fixed === "left")), p = Or(() => e.columns.filter((R) => R.fixed === "right")), v = Or(() => {
    const R = {};
    let E = 0;
    function W(_) {
      _.forEach((z) => {
        const M = {
          start: E,
          end: 0
        };
        R[fn(z)] = M, "children" in z ? (W(z.children), M.end = E) : (E += tf(z) || 0, M.end = E);
      });
    }
    return W(h.value), R;
  }), f = Or(() => {
    const R = {};
    let E = 0;
    function W(_) {
      for (let z = _.length - 1; z >= 0; --z) {
        const M = _[z], O = {
          start: E,
          end: 0
        };
        R[fn(M)] = O, "children" in M ? (W(M.children), O.end = E) : (E += tf(M) || 0, O.end = E);
      }
    }
    return W(p.value), R;
  });
  function m() {
    var R, E;
    const {
      value: W
    } = h;
    let _ = 0;
    const {
      value: z
    } = v;
    let M = null;
    for (let O = 0; O < W.length; ++O) {
      const U = fn(W[O]);
      if (r > (((R = z[U]) === null || R === void 0 ? void 0 : R.start) || 0) - _)
        M = U, _ = ((E = z[U]) === null || E === void 0 ? void 0 : E.end) || 0;
      else
        break;
    }
    l.value = M;
  }
  function g() {
    a.value = [];
    let R = e.columns.find((E) => fn(E) === l.value);
    for (; R && "children" in R; ) {
      const E = R.children.length;
      if (E === 0) break;
      const W = R.children[E - 1];
      a.value.push(fn(W)), R = W;
    }
  }
  function u() {
    var R, E;
    const {
      value: W
    } = p, _ = Number(e.scrollX), {
      value: z
    } = o;
    if (z === null) return;
    let M = 0, O = null;
    const {
      value: U
    } = f;
    for (let L = W.length - 1; L >= 0; --L) {
      const Y = fn(W[L]);
      if (Math.round(r + (((R = U[Y]) === null || R === void 0 ? void 0 : R.start) || 0) + z - M) < _)
        O = Y, M = ((E = U[Y]) === null || E === void 0 ? void 0 : E.end) || 0;
      else
        break;
    }
    s.value = O;
  }
  function w() {
    d.value = [];
    let R = e.columns.find((E) => fn(E) === s.value);
    for (; R && "children" in R && R.children.length; ) {
      const E = R.children[0];
      d.value.push(fn(E)), R = E;
    }
  }
  function C() {
    const R = t.value ? t.value.getHeaderElement() : null, E = t.value ? t.value.getBodyElement() : null;
    return {
      header: R,
      body: E
    };
  }
  function b() {
    const {
      body: R
    } = C();
    R && (R.scrollTop = 0);
  }
  function x() {
    i.value !== "body" ? Xr(y) : i.value = void 0;
  }
  function S(R) {
    var E;
    (E = e.onScroll) === null || E === void 0 || E.call(e, R), i.value !== "head" ? Xr(y) : i.value = void 0;
  }
  function y() {
    const {
      header: R,
      body: E
    } = C();
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
      m(), g(), u(), w();
    }
  }
  function T(R) {
    const {
      header: E
    } = C();
    E && (E.scrollLeft = R, y());
  }
  return d2(n, () => {
    b();
  }), {
    styleScrollXRef: c,
    fixedColumnLeftMapRef: v,
    fixedColumnRightMapRef: f,
    leftFixedColumnsRef: h,
    rightFixedColumnsRef: p,
    leftActiveFixedColKeyRef: l,
    leftActiveFixedChildrenColKeysRef: a,
    rightActiveFixedColKeyRef: s,
    rightActiveFixedChildrenColKeysRef: d,
    syncScrollState: y,
    handleTableBodyScroll: S,
    handleTableHeaderScroll: x,
    setHeaderScrollLeft: T
  };
}
const kf = window.Vue.computed, u2 = window.Vue.ref;
function Yi(e) {
  return typeof e == "object" && typeof e.multiple == "number" ? e.multiple : !1;
}
function f2(e, t) {
  return t && (e === void 0 || e === "default" || typeof e == "object" && e.compare === "default") ? h2(t) : typeof e == "function" ? e : e && typeof e == "object" && e.compare && e.compare !== "default" ? e.compare : !1;
}
function h2(e) {
  return (t, n) => {
    const o = t[e], r = n[e];
    return o == null ? r == null ? 0 : -1 : r == null ? 1 : typeof o == "number" && typeof r == "number" ? o - r : typeof o == "string" && typeof r == "string" ? o.localeCompare(r) : 0;
  };
}
function p2(e, {
  dataRelatedColsRef: t,
  filteredDataRef: n
}) {
  const o = [];
  t.value.forEach((v) => {
    var f;
    v.sorter !== void 0 && p(o, {
      columnKey: v.key,
      sorter: v.sorter,
      order: (f = v.defaultSortOrder) !== null && f !== void 0 ? f : !1
    });
  });
  const r = u2(o), i = kf(() => {
    const v = t.value.filter((g) => g.type !== "selection" && g.sorter !== void 0 && (g.sortOrder === "ascend" || g.sortOrder === "descend" || g.sortOrder === !1)), f = v.filter((g) => g.sortOrder !== !1);
    if (f.length)
      return f.map((g) => ({
        columnKey: g.key,
        // column to sort has controlled sorter
        // sorter && sort order won't be undefined
        order: g.sortOrder,
        sorter: g.sorter
      }));
    if (v.length) return [];
    const {
      value: m
    } = r;
    return Array.isArray(m) ? m : m ? [m] : [];
  }), l = kf(() => {
    const v = i.value.slice().sort((f, m) => {
      const g = Yi(f.sorter) || 0;
      return (Yi(m.sorter) || 0) - g;
    });
    return v.length ? n.value.slice().sort((m, g) => {
      let u = 0;
      return v.some((w) => {
        const {
          columnKey: C,
          sorter: b,
          order: x
        } = w, S = f2(b, C);
        return S && x && (u = S(m.rawNode, g.rawNode), u !== 0) ? (u = u * HT(x), !0) : !1;
      }), u;
    }) : n.value;
  });
  function a(v) {
    let f = i.value.slice();
    return v && Yi(v.sorter) !== !1 ? (f = f.filter((m) => Yi(m.sorter) !== !1), p(f, v), f) : v || null;
  }
  function s(v) {
    const f = a(v);
    d(f);
  }
  function d(v) {
    const {
      "onUpdate:sorter": f,
      onUpdateSorter: m,
      onSorterChange: g
    } = e;
    f && ie(f, v), m && ie(m, v), g && ie(g, v), r.value = v;
  }
  function c(v, f = "ascend") {
    if (!v)
      h();
    else {
      const m = t.value.find((u) => u.type !== "selection" && u.type !== "expand" && u.key === v);
      if (!(m != null && m.sorter)) return;
      const g = m.sorter;
      s({
        columnKey: v,
        sorter: g,
        order: f
      });
    }
  }
  function h() {
    d(null);
  }
  function p(v, f) {
    const m = v.findIndex((g) => (f == null ? void 0 : f.columnKey) && g.columnKey === f.columnKey);
    m !== void 0 && m >= 0 ? v[m] = f : v.push(f);
  }
  return {
    clearSorter: h,
    sort: c,
    sortedDataRef: l,
    mergedSortStateRef: i,
    deriveNextSorter: s
  };
}
const un = window.Vue.computed, Zi = window.Vue.ref;
function v2(e, {
  dataRelatedColsRef: t
}) {
  const n = un(() => {
    const q = (I) => {
      for (let G = 0; G < I.length; ++G) {
        const Z = I[G];
        if ("children" in Z)
          return q(Z.children);
        if (Z.type === "selection")
          return Z;
      }
      return null;
    };
    return q(e.columns);
  }), o = un(() => {
    const {
      childrenKey: q
    } = e;
    return Oa(e.data, {
      ignoreEmptyChildren: !0,
      getKey: e.rowKey,
      getChildren: (I) => I[q],
      getDisabled: (I) => {
        var G, Z;
        return !!(!((Z = (G = n.value) === null || G === void 0 ? void 0 : G.disabled) === null || Z === void 0) && Z.call(G, I));
      }
    });
  }), r = Oe(() => {
    const {
      columns: q
    } = e, {
      length: I
    } = q;
    let G = null;
    for (let Z = 0; Z < I; ++Z) {
      const ae = q[Z];
      if (!ae.type && G === null && (G = Z), "tree" in ae && ae.tree)
        return Z;
    }
    return G || 0;
  }), i = Zi({}), {
    pagination: l
  } = e, a = Zi(l && l.defaultPage || 1), s = Zi(lv(l)), d = un(() => {
    const q = t.value.filter((Z) => Z.filterOptionValues !== void 0 || Z.filterOptionValue !== void 0), I = {};
    return q.forEach((Z) => {
      var ae;
      Z.type === "selection" || Z.type === "expand" || (Z.filterOptionValues === void 0 ? I[Z.key] = (ae = Z.filterOptionValue) !== null && ae !== void 0 ? ae : null : I[Z.key] = Z.filterOptionValues);
    }), Object.assign(nf(i.value), I);
  }), c = un(() => {
    const q = d.value, {
      columns: I
    } = e;
    function G(le) {
      return (de, me) => !!~String(me[le]).indexOf(String(de));
    }
    const {
      value: {
        treeNodes: Z
      }
    } = o, ae = [];
    return I.forEach((le) => {
      le.type === "selection" || le.type === "expand" || "children" in le || ae.push([le.key, le]);
    }), Z ? Z.filter((le) => {
      const {
        rawNode: de
      } = le;
      for (const [me, X] of ae) {
        let ce = q[me];
        if (ce == null || (Array.isArray(ce) || (ce = [ce]), !ce.length)) continue;
        const ke = X.filter === "default" ? G(me) : X.filter;
        if (X && typeof ke == "function")
          if (X.filterMode === "and") {
            if (ce.some((ge) => !ke(ge, de)))
              return !1;
          } else {
            if (ce.some((ge) => ke(ge, de)))
              continue;
            return !1;
          }
      }
      return !0;
    }) : [];
  }), {
    sortedDataRef: h,
    deriveNextSorter: p,
    mergedSortStateRef: v,
    sort: f,
    clearSorter: m
  } = p2(e, {
    dataRelatedColsRef: t,
    filteredDataRef: c
  });
  t.value.forEach((q) => {
    var I;
    if (q.filter) {
      const G = q.defaultFilterOptionValues;
      q.filterMultiple ? i.value[q.key] = G || [] : G !== void 0 ? i.value[q.key] = G === null ? [] : G : i.value[q.key] = (I = q.defaultFilterOptionValue) !== null && I !== void 0 ? I : null;
    }
  });
  const g = un(() => {
    const {
      pagination: q
    } = e;
    if (q !== !1)
      return q.page;
  }), u = un(() => {
    const {
      pagination: q
    } = e;
    if (q !== !1)
      return q.pageSize;
  }), w = zt(g, a), C = zt(u, s), b = Oe(() => {
    const q = w.value;
    return e.remote ? q : Math.max(1, Math.min(Math.ceil(c.value.length / C.value), q));
  }), x = un(() => {
    const {
      pagination: q
    } = e;
    if (q) {
      const {
        pageCount: I
      } = q;
      if (I !== void 0) return I;
    }
  }), S = un(() => {
    if (e.remote) return o.value.treeNodes;
    if (!e.pagination) return h.value;
    const q = C.value, I = (b.value - 1) * q;
    return h.value.slice(I, I + q);
  }), y = un(() => S.value.map((q) => q.rawNode));
  function T(q) {
    const {
      pagination: I
    } = e;
    if (I) {
      const {
        onChange: G,
        "onUpdate:page": Z,
        onUpdatePage: ae
      } = I;
      G && ie(G, q), ae && ie(ae, q), Z && ie(Z, q), _(q);
    }
  }
  function R(q) {
    const {
      pagination: I
    } = e;
    if (I) {
      const {
        onPageSizeChange: G,
        "onUpdate:pageSize": Z,
        onUpdatePageSize: ae
      } = I;
      G && ie(G, q), ae && ie(ae, q), Z && ie(Z, q), z(q);
    }
  }
  const E = un(() => {
    if (e.remote) {
      const {
        pagination: q
      } = e;
      if (q) {
        const {
          itemCount: I
        } = q;
        if (I !== void 0) return I;
      }
      return;
    }
    return c.value.length;
  }), W = un(() => Object.assign(Object.assign({}, e.pagination), {
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
    pageSize: C.value,
    pageCount: E.value === void 0 ? x.value : void 0,
    itemCount: E.value
  }));
  function _(q) {
    const {
      "onUpdate:page": I,
      onPageChange: G,
      onUpdatePage: Z
    } = e;
    Z && ie(Z, q), I && ie(I, q), G && ie(G, q), a.value = q;
  }
  function z(q) {
    const {
      "onUpdate:pageSize": I,
      onPageSizeChange: G,
      onUpdatePageSize: Z
    } = e;
    G && ie(G, q), Z && ie(Z, q), I && ie(I, q), s.value = q;
  }
  function M(q, I) {
    const {
      onUpdateFilters: G,
      "onUpdate:filters": Z,
      onFiltersChange: ae
    } = e;
    G && ie(G, q, I), Z && ie(Z, q, I), ae && ie(ae, q, I), i.value = q;
  }
  function O(q, I, G, Z) {
    var ae;
    (ae = e.onUnstableColumnResize) === null || ae === void 0 || ae.call(e, q, I, G, Z);
  }
  function U(q) {
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
    q ? q && (i.value = nf(q)) : i.value = {};
  }
  return {
    treeMateRef: o,
    mergedCurrentPageRef: b,
    mergedPaginationRef: W,
    paginatedDataRef: S,
    rawPaginatedDataRef: y,
    mergedFilterStateRef: d,
    mergedSortStateRef: v,
    hoverKeyRef: Zi(null),
    selectionColumnRef: n,
    childTriggerColIndexRef: r,
    doUpdateFilters: M,
    deriveNextSorter: p,
    doUpdatePageSize: z,
    doUpdatePage: _,
    onUnstableColumnResize: O,
    // exported methods
    filter: J,
    filters: Q,
    clearFilter: L,
    clearFilters: Y,
    clearSorter: m,
    page: U,
    sort: f
  };
}
const eo = window.Vue.computed, m2 = window.Vue.defineComponent, to = window.Vue.h, g2 = window.Vue.provide, Hl = window.Vue.ref, ft = window.Vue.toRef, b2 = window.Vue.Transition;
window.Vue.watchEffect;
const w2 = m2({
  name: "DataTable",
  alias: ["AdvancedTable"],
  props: DT,
  slots: Object,
  setup(e, {
    slots: t
  }) {
    const {
      mergedBorderedRef: n,
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = qe(e), l = Mt("DataTable", i, o), a = eo(() => {
      const {
        bottomBordered: P
      } = e;
      return n.value ? !1 : P !== void 0 ? P : !0;
    }), s = _e("DataTable", "-data-table", QE, LT, e, o), d = Hl(null), c = Hl(null), {
      getResizableWidth: h,
      clearResizableWidth: p,
      doUpdateResizableWidth: v
    } = s2(), {
      rowsRef: f,
      colsRef: m,
      dataRelatedColsRef: g,
      hasEllipsisRef: u
    } = a2(e, h), {
      treeMateRef: w,
      mergedCurrentPageRef: C,
      paginatedDataRef: b,
      rawPaginatedDataRef: x,
      selectionColumnRef: S,
      hoverKeyRef: y,
      mergedPaginationRef: T,
      mergedFilterStateRef: R,
      mergedSortStateRef: E,
      childTriggerColIndexRef: W,
      doUpdatePage: _,
      doUpdateFilters: z,
      onUnstableColumnResize: M,
      deriveNextSorter: O,
      filter: U,
      filters: L,
      clearFilter: Y,
      clearFilters: Q,
      clearSorter: J,
      page: q,
      sort: I
    } = v2(e, {
      dataRelatedColsRef: g
    }), G = (P) => {
      const {
        fileName: N = "data.csv",
        keepOriginalData: te = !1
      } = P || {}, se = te ? e.data : x.value, ue = GT(e.columns, se, e.getCsvCell, e.getCsvHeader), be = new Blob([ue], {
        type: "text/csv;charset=utf-8"
      }), we = URL.createObjectURL(be);
      Sy(we, N.endsWith(".csv") ? N : `${N}.csv`), URL.revokeObjectURL(we);
    }, {
      doCheckAll: Z,
      doUncheckAll: ae,
      doCheck: le,
      doUncheck: de,
      headerCheckboxDisabledRef: me,
      someRowsCheckedRef: X,
      allRowsCheckedRef: ce,
      mergedCheckedRowKeySetRef: ke,
      mergedInderminateRowKeySetRef: ge
    } = n2(e, {
      selectionColumnRef: S,
      treeMateRef: w,
      paginatedDataRef: b
    }), {
      stickyExpandedRowsRef: $e,
      mergedExpandedRowKeysRef: Se,
      renderExpandRef: Be,
      expandableRef: Me,
      doUpdateExpandedRowKeys: oe
    } = r2(e, w), {
      handleTableBodyScroll: k,
      handleTableHeaderScroll: $,
      syncScrollState: D,
      setHeaderScrollLeft: ee,
      leftActiveFixedColKeyRef: ve,
      leftActiveFixedChildrenColKeysRef: he,
      rightActiveFixedColKeyRef: F,
      rightActiveFixedChildrenColKeysRef: j,
      leftFixedColumnsRef: pe,
      rightFixedColumnsRef: Te,
      fixedColumnLeftMapRef: lt,
      fixedColumnRightMapRef: pt
    } = c2(e, {
      bodyWidthRef: d,
      mainTableInstRef: c,
      mergedCurrentPageRef: C
    }), {
      localeRef: Ye
    } = sr("DataTable"), Ze = eo(() => e.virtualScroll || e.flexHeight || e.maxHeight !== void 0 || u.value ? "fixed" : e.tableLayout);
    g2(mn, {
      props: e,
      treeMateRef: w,
      renderExpandIconRef: ft(e, "renderExpandIcon"),
      loadingKeySetRef: Hl(/* @__PURE__ */ new Set()),
      slots: t,
      indentRef: ft(e, "indent"),
      childTriggerColIndexRef: W,
      bodyWidthRef: d,
      componentId: Zr(),
      hoverKeyRef: y,
      mergedClsPrefixRef: o,
      mergedThemeRef: s,
      scrollXRef: eo(() => e.scrollX),
      rowsRef: f,
      colsRef: m,
      paginatedDataRef: b,
      leftActiveFixedColKeyRef: ve,
      leftActiveFixedChildrenColKeysRef: he,
      rightActiveFixedColKeyRef: F,
      rightActiveFixedChildrenColKeysRef: j,
      leftFixedColumnsRef: pe,
      rightFixedColumnsRef: Te,
      fixedColumnLeftMapRef: lt,
      fixedColumnRightMapRef: pt,
      mergedCurrentPageRef: C,
      someRowsCheckedRef: X,
      allRowsCheckedRef: ce,
      mergedSortStateRef: E,
      mergedFilterStateRef: R,
      loadingRef: ft(e, "loading"),
      rowClassNameRef: ft(e, "rowClassName"),
      mergedCheckedRowKeySetRef: ke,
      mergedExpandedRowKeysRef: Se,
      mergedInderminateRowKeySetRef: ge,
      localeRef: Ye,
      expandableRef: Me,
      stickyExpandedRowsRef: $e,
      rowKeyRef: ft(e, "rowKey"),
      renderExpandRef: Be,
      summaryRef: ft(e, "summary"),
      virtualScrollRef: ft(e, "virtualScroll"),
      virtualScrollXRef: ft(e, "virtualScrollX"),
      heightForRowRef: ft(e, "heightForRow"),
      minRowHeightRef: ft(e, "minRowHeight"),
      virtualScrollHeaderRef: ft(e, "virtualScrollHeader"),
      headerHeightRef: ft(e, "headerHeight"),
      rowPropsRef: ft(e, "rowProps"),
      stripedRef: ft(e, "striped"),
      checkOptionsRef: eo(() => {
        const {
          value: P
        } = S;
        return P == null ? void 0 : P.options;
      }),
      rawPaginatedDataRef: x,
      filterMenuCssVarsRef: eo(() => {
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
      onLoadRef: ft(e, "onLoad"),
      mergedTableLayoutRef: Ze,
      maxHeightRef: ft(e, "maxHeight"),
      minHeightRef: ft(e, "minHeight"),
      flexHeightRef: ft(e, "flexHeight"),
      headerCheckboxDisabledRef: me,
      paginationBehaviorOnFilterRef: ft(e, "paginationBehaviorOnFilter"),
      summaryPlacementRef: ft(e, "summaryPlacement"),
      filterIconPopoverPropsRef: ft(e, "filterIconPopoverProps"),
      scrollbarPropsRef: ft(e, "scrollbarProps"),
      syncScrollState: D,
      doUpdatePage: _,
      doUpdateFilters: z,
      getResizableWidth: h,
      onUnstableColumnResize: M,
      clearResizableWidth: p,
      doUpdateResizableWidth: v,
      deriveNextSorter: O,
      doCheck: le,
      doUncheck: de,
      doCheckAll: Z,
      doUncheckAll: ae,
      doUpdateExpandedRowKeys: oe,
      handleTableHeaderScroll: $,
      handleTableBodyScroll: k,
      setHeaderScrollLeft: ee,
      renderCell: ft(e, "renderCell")
    });
    const mt = {
      filter: U,
      filters: L,
      clearFilters: Q,
      clearSorter: J,
      page: q,
      sort: I,
      clearFilter: Y,
      downloadCsv: G,
      scrollTo: (P, N) => {
        var te;
        (te = c.value) === null || te === void 0 || te.scrollTo(P, N);
      }
    }, et = eo(() => {
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
          thColorSortingModal: Ae,
          thColorSortingPopover: ot,
          thColor: Ne,
          thColorHover: Pt,
          tdColor: It,
          tdTextColor: At,
          thTextColor: Nt,
          thFontWeight: Ht,
          thButtonColorHover: Qt,
          thIconColor: jt,
          thIconColorActive: V,
          filterSize: ne,
          borderRadius: xe,
          lineHeight: Ee,
          tdColorModal: He,
          thColorModal: Ve,
          borderColorModal: rt,
          thColorHoverModal: ct,
          tdColorHoverModal: Xt,
          borderColorPopover: En,
          thColorPopover: On,
          tdColorPopover: vo,
          tdColorHoverPopover: fr,
          thColorHoverPopover: hr,
          paginationMargin: pr,
          emptyPadding: vr,
          boxShadowAfter: mr,
          boxShadowBefore: Kn,
          sorterSize: qn,
          resizableContainerSize: Ia,
          resizableSize: Aa,
          loadingColor: Va,
          loadingSize: Ba,
          opacityLoading: La,
          tdColorStriped: Da,
          tdColorStripedModal: Na,
          tdColorStripedPopover: Ha,
          [re("fontSize", P)]: ja,
          [re("thPadding", P)]: Wa,
          [re("tdPadding", P)]: Ua
        }
      } = s.value;
      return {
        "--n-font-size": ja,
        "--n-th-padding": Wa,
        "--n-td-padding": Ua,
        "--n-bezier": N,
        "--n-border-radius": xe,
        "--n-line-height": Ee,
        "--n-border-color": te,
        "--n-border-color-modal": rt,
        "--n-border-color-popover": En,
        "--n-th-color": Ne,
        "--n-th-color-hover": Pt,
        "--n-th-color-modal": Ve,
        "--n-th-color-hover-modal": ct,
        "--n-th-color-popover": On,
        "--n-th-color-hover-popover": hr,
        "--n-td-color": It,
        "--n-td-color-hover": se,
        "--n-td-color-modal": He,
        "--n-td-color-hover-modal": Xt,
        "--n-td-color-popover": vo,
        "--n-td-color-hover-popover": fr,
        "--n-th-text-color": Nt,
        "--n-td-text-color": At,
        "--n-th-font-weight": Ht,
        "--n-th-button-color-hover": Qt,
        "--n-th-icon-color": jt,
        "--n-th-icon-color-active": V,
        "--n-filter-size": ne,
        "--n-pagination-margin": pr,
        "--n-empty-padding": vr,
        "--n-box-shadow-before": Kn,
        "--n-box-shadow-after": mr,
        "--n-sorter-size": qn,
        "--n-resizable-container-size": Ia,
        "--n-resizable-size": Aa,
        "--n-loading-size": Ba,
        "--n-loading-color": Va,
        "--n-opacity-loading": La,
        "--n-td-color-striped": Da,
        "--n-td-color-striped-modal": Na,
        "--n-td-color-striped-popover": Ha,
        "--n-td-color-sorting": ue,
        "--n-td-color-sorting-modal": be,
        "--n-td-color-sorting-popover": we,
        "--n-th-color-sorting": Ce,
        "--n-th-color-sorting-modal": Ae,
        "--n-th-color-sorting-popover": ot
      };
    }), fe = r ? wt("data-table", eo(() => e.size[0]), et, e) : void 0, Re = eo(() => {
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
      cssVars: r ? void 0 : et,
      themeClass: fe == null ? void 0 : fe.themeClass,
      onRender: fe == null ? void 0 : fe.onRender
    }, mt);
  },
  render() {
    const {
      mergedClsPrefix: e,
      themeClass: t,
      onRender: n,
      $slots: o,
      spinProps: r
    } = this;
    return n == null || n(), to("div", {
      class: [`${e}-data-table`, this.rtlEnabled && `${e}-data-table--rtl`, t, {
        [`${e}-data-table--bordered`]: this.mergedBordered,
        [`${e}-data-table--bottom-bordered`]: this.mergedBottomBordered,
        [`${e}-data-table--single-line`]: this.singleLine,
        [`${e}-data-table--single-column`]: this.singleColumn,
        [`${e}-data-table--loading`]: this.loading,
        [`${e}-data-table--flex-height`]: this.flexHeight
      }],
      style: this.cssVars
    }, to("div", {
      class: `${e}-data-table-wrapper`
    }, to(JE, {
      ref: "mainTableInstRef"
    })), this.mergedShowPagination ? to("div", {
      class: `${e}-data-table__pagination`
    }, to(FT, Object.assign({
      theme: this.mergedTheme.peers.Pagination,
      themeOverrides: this.mergedTheme.peerOverrides.Pagination,
      disabled: this.loading
    }, this.mergedPagination))) : null, to(b2, {
      name: "fade-in-scale-up-transition"
    }, {
      default: () => this.loading ? to("div", {
        class: `${e}-data-table-loading-wrapper`
      }, vn(o.loading, () => [to(cr, Object.assign({
        clsPrefix: e,
        strokeWidth: 20
      }, r))])) : null
    }));
  }
}), y2 = {
  gapSmall: "4px 8px",
  gapMedium: "8px 12px",
  gapLarge: "12px 16px"
};
function x2() {
  return y2;
}
const C2 = {
  self: x2
};
let jl;
function S2() {
  if (!ar) return !0;
  if (jl === void 0) {
    const e = document.createElement("div");
    e.style.display = "flex", e.style.flexDirection = "column", e.style.rowGap = "1px", e.appendChild(document.createElement("div")), e.appendChild(document.createElement("div")), document.body.appendChild(e);
    const t = e.scrollHeight === 1;
    return document.body.removeChild(e), jl = t;
  }
  return jl;
}
const $2 = window.Vue.Comment, R2 = window.Vue.computed, k2 = window.Vue.defineComponent, Pf = window.Vue.h, P2 = Object.assign(Object.assign({}, _e.props), {
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
}), _f = k2({
  name: "Space",
  props: P2,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedRtlRef: n
    } = qe(e), o = _e("Space", "-space", void 0, C2, e, t), r = Mt("Space", n, t);
    return {
      useGap: S2(),
      rtlEnabled: r,
      mergedClsPrefix: t,
      margin: R2(() => {
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
            [re("gap", i)]: l
          }
        } = o.value, {
          row: a,
          col: s
        } = Rb(l);
        return {
          horizontal: xt(s),
          vertical: xt(a)
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
      internalUseGap: v
    } = this, f = nr(ed(this), !1);
    if (!f.length) return null;
    const m = `${a.horizontal}px`, g = `${a.horizontal / 2}px`, u = `${a.vertical}px`, w = `${a.vertical / 2}px`, C = f.length - 1, b = r.startsWith("space-");
    return Pf("div", {
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
    }, !p && (h || v) ? f : f.map((x, S) => x.type === $2 ? x : Pf("div", {
      role: "none",
      class: i,
      style: [l, {
        maxWidth: "100%"
      }, h ? "" : e ? {
        marginBottom: S !== C ? u : ""
      } : c ? {
        marginLeft: b ? r === "space-between" && S === C ? "" : g : S !== C ? m : "",
        marginRight: b ? r === "space-between" && S === 0 ? "" : g : "",
        paddingTop: w,
        paddingBottom: w
      } : {
        marginRight: b ? r === "space-between" && S === C ? "" : g : S !== C ? m : "",
        marginLeft: b ? r === "space-between" && S === 0 ? "" : g : "",
        paddingTop: w,
        paddingBottom: w
      }]
    }, x)));
  }
}), _2 = {
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
function T2(e) {
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
  return Object.assign(Object.assign({}, _2), {
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
const Tv = {
  common: vt,
  self: T2
};
function F2(e) {
  const {
    textColorDisabled: t
  } = e;
  return {
    iconColorDisabled: t
  };
}
const E2 = {
  name: "InputNumber",
  common: vt,
  peers: {
    Button: gd,
    Input: md
  },
  self: F2
}, O2 = {
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
function z2(e) {
  const {
    primaryColor: t,
    opacityDisabled: n,
    borderRadius: o,
    textColor3: r
  } = e;
  return Object.assign(Object.assign({}, O2), {
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
    boxShadowFocus: `0 0 0 2px ${Fe(t, {
      alpha: 0.2
    })}`
  });
}
const M2 = {
  common: vt,
  self: z2
}, ci = "n-form", Fv = "n-form-item-insts", I2 = A("form", [K("inline", `
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `, [A("form-item", {
  width: "auto",
  marginRight: "18px"
}, [H("&:last-child", {
  marginRight: 0
})])])]);
var A2 = function(e, t, n, o) {
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
const V2 = window.Vue.defineComponent, B2 = window.Vue.h, Tf = window.Vue.provide, L2 = window.Vue.ref, D2 = Object.assign(Object.assign({}, _e.props), {
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
}), N2 = V2({
  name: "Form",
  props: D2,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = qe(e);
    _e("Form", "-form", I2, Tv, e, t);
    const n = {}, o = L2(void 0), r = (s) => {
      const d = o.value;
      (d === void 0 || s >= d) && (o.value = s);
    };
    function i(s) {
      return A2(this, arguments, void 0, function* (d, c = () => !0) {
        return yield new Promise((h, p) => {
          const v = [];
          for (const f of ei(n)) {
            const m = n[f];
            for (const g of m)
              g.path && v.push(g.internalValidate(null, c));
          }
          Promise.all(v).then((f) => {
            const m = f.some((w) => !w.valid), g = [], u = [];
            f.forEach((w) => {
              var C, b;
              !((C = w.errors) === null || C === void 0) && C.length && g.push(w.errors), !((b = w.warnings) === null || b === void 0) && b.length && u.push(w.warnings);
            }), d && d(g.length ? g : void 0, {
              warnings: u.length ? u : void 0
            }), m ? p(g.length ? g : void 0) : h({
              warnings: u.length ? u : void 0
            });
          });
        });
      });
    }
    function l() {
      for (const s of ei(n)) {
        const d = n[s];
        for (const c of d)
          c.restoreValidation();
      }
    }
    return Tf(ci, {
      props: e,
      maxChildLabelWidthRef: o,
      deriveMaxChildLabelWidth: r
    }), Tf(Fv, {
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
    return B2("form", {
      class: [`${e}-form`, this.inline && `${e}-form--inline`],
      onSubmit: this.onSubmit
    }, this.$slots);
  }
});
function Ro() {
  return Ro = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n)
        Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
  }, Ro.apply(this, arguments);
}
function H2(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, ii(e, t);
}
function Ts(e) {
  return Ts = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Ts(e);
}
function ii(e, t) {
  return ii = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, r) {
    return o.__proto__ = r, o;
  }, ii(e, t);
}
function j2() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function sa(e, t, n) {
  return j2() ? sa = Reflect.construct.bind() : sa = function(r, i, l) {
    var a = [null];
    a.push.apply(a, i);
    var s = Function.bind.apply(r, a), d = new s();
    return l && ii(d, l.prototype), d;
  }, sa.apply(null, arguments);
}
function W2(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function Fs(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Fs = function(o) {
    if (o === null || !W2(o)) return o;
    if (typeof o != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(o)) return t.get(o);
      t.set(o, r);
    }
    function r() {
      return sa(o, arguments, Ts(this).constructor);
    }
    return r.prototype = Object.create(o.prototype, {
      constructor: {
        value: r,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), ii(r, o);
  }, Fs(e);
}
var U2 = /%[sdj%]/g, K2 = function() {
};
function Es(e) {
  if (!e || !e.length) return null;
  var t = {};
  return e.forEach(function(n) {
    var o = n.field;
    t[o] = t[o] || [], t[o].push(n);
  }), t;
}
function Jt(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
    n[o - 1] = arguments[o];
  var r = 0, i = n.length;
  if (typeof e == "function")
    return e.apply(null, n);
  if (typeof e == "string") {
    var l = e.replace(U2, function(a) {
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
function q2(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function $t(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || q2(t) && typeof e == "string" && !e);
}
function G2(e, t, n) {
  var o = [], r = 0, i = e.length;
  function l(a) {
    o.push.apply(o, a || []), r++, r === i && n(o);
  }
  e.forEach(function(a) {
    t(a, l);
  });
}
function Ff(e, t, n) {
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
function X2(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    t.push.apply(t, e[n] || []);
  }), t;
}
var Ef = /* @__PURE__ */ function(e) {
  H2(t, e);
  function t(n, o) {
    var r;
    return r = e.call(this, "Async Validation Error") || this, r.errors = n, r.fields = o, r;
  }
  return t;
}(/* @__PURE__ */ Fs(Error));
function Y2(e, t, n, o, r) {
  if (t.first) {
    var i = new Promise(function(p, v) {
      var f = function(u) {
        return o(u), u.length ? v(new Ef(u, Es(u))) : p(r);
      }, m = X2(e);
      Ff(m, n, f);
    });
    return i.catch(function(p) {
      return p;
    }), i;
  }
  var l = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], a = Object.keys(e), s = a.length, d = 0, c = [], h = new Promise(function(p, v) {
    var f = function(g) {
      if (c.push.apply(c, g), d++, d === s)
        return o(c), c.length ? v(new Ef(c, Es(c))) : p(r);
    };
    a.length || (o(c), p(r)), a.forEach(function(m) {
      var g = e[m];
      l.indexOf(m) !== -1 ? Ff(g, n, f) : G2(g, n, f);
    });
  });
  return h.catch(function(p) {
    return p;
  }), h;
}
function Z2(e) {
  return !!(e && e.message !== void 0);
}
function J2(e, t) {
  for (var n = e, o = 0; o < t.length; o++) {
    if (n == null)
      return n;
    n = n[t[o]];
  }
  return n;
}
function Of(e, t) {
  return function(n) {
    var o;
    return e.fullFields ? o = J2(t, e.fullFields) : o = t[n.field || e.fullField], Z2(n) ? (n.field = n.field || e.fullField, n.fieldValue = o, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: o,
      field: n.field || e.fullField
    };
  };
}
function zf(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var o = t[n];
        typeof o == "object" && typeof e[n] == "object" ? e[n] = Ro({}, e[n], o) : e[n] = o;
      }
  }
  return e;
}
var Ev = function(t, n, o, r, i, l) {
  t.required && (!o.hasOwnProperty(t.field) || $t(n, l || t.type)) && r.push(Jt(i.messages.required, t.fullField));
}, Q2 = function(t, n, o, r, i) {
  (/^\s+$/.test(n) || n === "") && r.push(Jt(i.messages.whitespace, t.fullField));
}, Ji, eO = function() {
  if (Ji)
    return Ji;
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
  s.v4 = function(C) {
    return C && C.exact ? l : new RegExp("" + t(C) + n + t(C), "g");
  }, s.v6 = function(C) {
    return C && C.exact ? a : new RegExp("" + t(C) + r + t(C), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", c = "(?:\\S+(?::\\S*)?@)?", h = s.v4().source, p = s.v6().source, v = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", f = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", m = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", g = "(?::\\d{2,5})?", u = '(?:[/?#][^\\s"]*)?', w = "(?:" + d + "|www\\.)" + c + "(?:localhost|" + h + "|" + p + "|" + v + f + m + ")" + g + u;
  return Ji = new RegExp("(?:^" + w + "$)", "i"), Ji;
}, Mf = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, Ar = {
  integer: function(t) {
    return Ar.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return Ar.number(t) && !Ar.integer(t);
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
    return typeof t == "object" && !Ar.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(Mf.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(eO());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(Mf.hex);
  }
}, tO = function(t, n, o, r, i) {
  if (t.required && n === void 0) {
    Ev(t, n, o, r, i);
    return;
  }
  var l = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], a = t.type;
  l.indexOf(a) > -1 ? Ar[a](n) || r.push(Jt(i.messages.types[a], t.fullField, t.type)) : a && typeof n !== t.type && r.push(Jt(i.messages.types[a], t.fullField, t.type));
}, nO = function(t, n, o, r, i) {
  var l = typeof t.len == "number", a = typeof t.min == "number", s = typeof t.max == "number", d = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, c = n, h = null, p = typeof n == "number", v = typeof n == "string", f = Array.isArray(n);
  if (p ? h = "number" : v ? h = "string" : f && (h = "array"), !h)
    return !1;
  f && (c = n.length), v && (c = n.replace(d, "_").length), l ? c !== t.len && r.push(Jt(i.messages[h].len, t.fullField, t.len)) : a && !s && c < t.min ? r.push(Jt(i.messages[h].min, t.fullField, t.min)) : s && !a && c > t.max ? r.push(Jt(i.messages[h].max, t.fullField, t.max)) : a && s && (c < t.min || c > t.max) && r.push(Jt(i.messages[h].range, t.fullField, t.min, t.max));
}, Xo = "enum", oO = function(t, n, o, r, i) {
  t[Xo] = Array.isArray(t[Xo]) ? t[Xo] : [], t[Xo].indexOf(n) === -1 && r.push(Jt(i.messages[Xo], t.fullField, t[Xo].join(", ")));
}, rO = function(t, n, o, r, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(n) || r.push(Jt(i.messages.pattern.mismatch, t.fullField, n, t.pattern));
    else if (typeof t.pattern == "string") {
      var l = new RegExp(t.pattern);
      l.test(n) || r.push(Jt(i.messages.pattern.mismatch, t.fullField, n, t.pattern));
    }
  }
}, Ie = {
  required: Ev,
  whitespace: Q2,
  type: tO,
  range: nO,
  enum: oO,
  pattern: rO
}, iO = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if ($t(n, "string") && !t.required)
      return o();
    Ie.required(t, n, r, l, i, "string"), $t(n, "string") || (Ie.type(t, n, r, l, i), Ie.range(t, n, r, l, i), Ie.pattern(t, n, r, l, i), t.whitespace === !0 && Ie.whitespace(t, n, r, l, i));
  }
  o(l);
}, aO = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, l, i), n !== void 0 && Ie.type(t, n, r, l, i);
  }
  o(l);
}, lO = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (n === "" && (n = void 0), $t(n) && !t.required)
      return o();
    Ie.required(t, n, r, l, i), n !== void 0 && (Ie.type(t, n, r, l, i), Ie.range(t, n, r, l, i));
  }
  o(l);
}, sO = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, l, i), n !== void 0 && Ie.type(t, n, r, l, i);
  }
  o(l);
}, dO = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, l, i), $t(n) || Ie.type(t, n, r, l, i);
  }
  o(l);
}, cO = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, l, i), n !== void 0 && (Ie.type(t, n, r, l, i), Ie.range(t, n, r, l, i));
  }
  o(l);
}, uO = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, l, i), n !== void 0 && (Ie.type(t, n, r, l, i), Ie.range(t, n, r, l, i));
  }
  o(l);
}, fO = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (n == null && !t.required)
      return o();
    Ie.required(t, n, r, l, i, "array"), n != null && (Ie.type(t, n, r, l, i), Ie.range(t, n, r, l, i));
  }
  o(l);
}, hO = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, l, i), n !== void 0 && Ie.type(t, n, r, l, i);
  }
  o(l);
}, pO = "enum", vO = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, l, i), n !== void 0 && Ie[pO](t, n, r, l, i);
  }
  o(l);
}, mO = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if ($t(n, "string") && !t.required)
      return o();
    Ie.required(t, n, r, l, i), $t(n, "string") || Ie.pattern(t, n, r, l, i);
  }
  o(l);
}, gO = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if ($t(n, "date") && !t.required)
      return o();
    if (Ie.required(t, n, r, l, i), !$t(n, "date")) {
      var s;
      n instanceof Date ? s = n : s = new Date(n), Ie.type(t, s, r, l, i), s && Ie.range(t, s.getTime(), r, l, i);
    }
  }
  o(l);
}, bO = function(t, n, o, r, i) {
  var l = [], a = Array.isArray(n) ? "array" : typeof n;
  Ie.required(t, n, r, l, i, a), o(l);
}, Wl = function(t, n, o, r, i) {
  var l = t.type, a = [], s = t.required || !t.required && r.hasOwnProperty(t.field);
  if (s) {
    if ($t(n, l) && !t.required)
      return o();
    Ie.required(t, n, r, a, i, l), $t(n, l) || Ie.type(t, n, r, a, i);
  }
  o(a);
}, wO = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, l, i);
  }
  o(l);
}, jr = {
  string: iO,
  method: aO,
  number: lO,
  boolean: sO,
  regexp: dO,
  integer: cO,
  float: uO,
  array: fO,
  object: hO,
  enum: vO,
  pattern: mO,
  date: gO,
  url: Wl,
  hex: Wl,
  email: Wl,
  required: bO,
  any: wO
};
function Os() {
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
var zs = Os(), ir = /* @__PURE__ */ function() {
  function e(n) {
    this.rules = null, this._messages = zs, this.define(n);
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
    return o && (this._messages = zf(Os(), o)), this._messages;
  }, t.validate = function(o, r, i) {
    var l = this;
    r === void 0 && (r = {}), i === void 0 && (i = function() {
    });
    var a = o, s = r, d = i;
    if (typeof s == "function" && (d = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
      return d && d(null, a), Promise.resolve(a);
    function c(m) {
      var g = [], u = {};
      function w(b) {
        if (Array.isArray(b)) {
          var x;
          g = (x = g).concat.apply(x, b);
        } else
          g.push(b);
      }
      for (var C = 0; C < m.length; C++)
        w(m[C]);
      g.length ? (u = Es(g), d(g, u)) : d(null, a);
    }
    if (s.messages) {
      var h = this.messages();
      h === zs && (h = Os()), zf(h, s.messages), s.messages = h;
    } else
      s.messages = this.messages();
    var p = {}, v = s.keys || Object.keys(this.rules);
    v.forEach(function(m) {
      var g = l.rules[m], u = a[m];
      g.forEach(function(w) {
        var C = w;
        typeof C.transform == "function" && (a === o && (a = Ro({}, a)), u = a[m] = C.transform(u)), typeof C == "function" ? C = {
          validator: C
        } : C = Ro({}, C), C.validator = l.getValidationMethod(C), C.validator && (C.field = m, C.fullField = C.fullField || m, C.type = l.getType(C), p[m] = p[m] || [], p[m].push({
          rule: C,
          value: u,
          source: a,
          field: m
        }));
      });
    });
    var f = {};
    return Y2(p, s, function(m, g) {
      var u = m.rule, w = (u.type === "object" || u.type === "array") && (typeof u.fields == "object" || typeof u.defaultField == "object");
      w = w && (u.required || !u.required && m.value), u.field = m.field;
      function C(S, y) {
        return Ro({}, y, {
          fullField: u.fullField + "." + S,
          fullFields: u.fullFields ? [].concat(u.fullFields, [S]) : [S]
        });
      }
      function b(S) {
        S === void 0 && (S = []);
        var y = Array.isArray(S) ? S : [S];
        !s.suppressWarning && y.length && e.warning("async-validator:", y), y.length && u.message !== void 0 && (y = [].concat(u.message));
        var T = y.map(Of(u, a));
        if (s.first && T.length)
          return f[u.field] = 1, g(T);
        if (!w)
          g(T);
        else {
          if (u.required && !m.value)
            return u.message !== void 0 ? T = [].concat(u.message).map(Of(u, a)) : s.error && (T = [s.error(u, Jt(s.messages.required, u.field))]), g(T);
          var R = {};
          u.defaultField && Object.keys(m.value).map(function(_) {
            R[_] = u.defaultField;
          }), R = Ro({}, R, m.rule.fields);
          var E = {};
          Object.keys(R).forEach(function(_) {
            var z = R[_], M = Array.isArray(z) ? z : [z];
            E[_] = M.map(C.bind(null, _));
          });
          var W = new e(E);
          W.messages(s.messages), m.rule.options && (m.rule.options.messages = s.messages, m.rule.options.error = s.error), W.validate(m.value, m.rule.options || s, function(_) {
            var z = [];
            T && T.length && z.push.apply(z, T), _ && _.length && z.push.apply(z, _), g(z.length ? z : null);
          });
        }
      }
      var x;
      if (u.asyncValidator)
        x = u.asyncValidator(u, m.value, b, m.source, s);
      else if (u.validator) {
        try {
          x = u.validator(u, m.value, b, m.source, s);
        } catch (S) {
          console.error == null || console.error(S), s.suppressValidatorError || setTimeout(function() {
            throw S;
          }, 0), b(S.message);
        }
        x === !0 ? b() : x === !1 ? b(typeof u.message == "function" ? u.message(u.fullField || u.field) : u.message || (u.fullField || u.field) + " fails") : x instanceof Array ? b(x) : x instanceof Error && b(x.message);
      }
      x && x.then && x.then(function() {
        return b();
      }, function(S) {
        return b(S);
      });
    }, function(m) {
      c(m);
    }, a);
  }, t.getType = function(o) {
    if (o.type === void 0 && o.pattern instanceof RegExp && (o.type = "pattern"), typeof o.validator != "function" && o.type && !jr.hasOwnProperty(o.type))
      throw new Error(Jt("Unknown rule type %s", o.type));
    return o.type || "string";
  }, t.getValidationMethod = function(o) {
    if (typeof o.validator == "function")
      return o.validator;
    var r = Object.keys(o), i = r.indexOf("message");
    return i !== -1 && r.splice(i, 1), r.length === 1 && r[0] === "required" ? jr.required : jr[this.getType(o)] || void 0;
  }, e;
}();
ir.register = function(t, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  jr[t] = n;
};
ir.warning = K2;
ir.messages = zs;
ir.validators = jr;
const {
  cubicBezierEaseInOut: If
} = Ao;
function yO({
  name: e = "fade-down",
  fromOffset: t = "-4px",
  enterDuration: n = ".3s",
  leaveDuration: o = ".3s",
  enterCubicBezier: r = If,
  leaveCubicBezier: i = If
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
const xO = A("form-item", `
 display: grid;
 line-height: var(--n-line-height);
`, [A("form-item-label", `
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
 `)]), A("form-item-blank", `
 grid-area: blank;
 min-height: var(--n-blank-height);
 `), K("auto-label-width", [A("form-item-label", "white-space: nowrap;")]), K("left-labelled", `
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 grid-template-rows: auto 1fr;
 align-items: flex-start;
 `, [A("form-item-label", `
 display: grid;
 grid-template-columns: 1fr auto;
 min-height: var(--n-blank-height);
 height: auto;
 box-sizing: border-box;
 flex-shrink: 0;
 flex-grow: 0;
 `, [K("reverse-columns-space", `
 grid-template-columns: auto 1fr;
 `), K("left-mark", `
 grid-template-areas:
 "mark text"
 ". text";
 `), K("right-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), K("right-hanging-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), B("text", `
 grid-area: text; 
 `), B("asterisk", `
 grid-area: mark; 
 align-self: end;
 `)])]), K("top-labelled", `
 grid-template-areas:
 "label"
 "blank"
 "feedback";
 grid-template-rows: minmax(var(--n-label-height), auto) 1fr;
 grid-template-columns: minmax(0, 100%);
 `, [K("no-label", `
 grid-template-areas:
 "blank"
 "feedback";
 grid-template-rows: 1fr;
 `), A("form-item-label", `
 display: flex;
 align-items: flex-start;
 justify-content: var(--n-label-text-align);
 `)]), A("form-item-blank", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 position: relative;
 `), A("form-item-feedback-wrapper", `
 grid-area: feedback;
 box-sizing: border-box;
 min-height: var(--n-feedback-height);
 font-size: var(--n-feedback-font-size);
 line-height: 1.25;
 transform-origin: top left;
 `, [H("&:not(:empty)", `
 padding: var(--n-feedback-padding);
 `), A("form-item-feedback", {
  transition: "color .3s var(--n-bezier)",
  color: "var(--n-feedback-text-color)"
}, [K("warning", {
  color: "var(--n-feedback-text-color-warning)"
}), K("error", {
  color: "var(--n-feedback-text-color-error)"
}), yO({
  fromOffset: "-3px",
  enterDuration: ".3s",
  leaveDuration: ".2s"
})])])]), Dt = window.Vue.computed, $d = window.Vue.inject, Af = window.Vue.ref;
function CO(e) {
  const t = $d(ci, null);
  return {
    mergedSize: Dt(() => e.size !== void 0 ? e.size : (t == null ? void 0 : t.props.size) !== void 0 ? t.props.size : "medium")
  };
}
function SO(e) {
  const t = $d(ci, null), n = Dt(() => {
    const {
      labelPlacement: f
    } = e;
    return f !== void 0 ? f : t != null && t.props.labelPlacement ? t.props.labelPlacement : "top";
  }), o = Dt(() => n.value === "left" && (e.labelWidth === "auto" || (t == null ? void 0 : t.props.labelWidth) === "auto")), r = Dt(() => {
    if (n.value === "top") return;
    const {
      labelWidth: f
    } = e;
    if (f !== void 0 && f !== "auto")
      return St(f);
    if (o.value) {
      const m = t == null ? void 0 : t.maxChildLabelWidthRef.value;
      return m !== void 0 ? St(m) : void 0;
    }
    if ((t == null ? void 0 : t.props.labelWidth) !== void 0)
      return St(t.props.labelWidth);
  }), i = Dt(() => {
    const {
      labelAlign: f
    } = e;
    if (f) return f;
    if (t != null && t.props.labelAlign) return t.props.labelAlign;
  }), l = Dt(() => {
    var f;
    return [(f = e.labelProps) === null || f === void 0 ? void 0 : f.style, e.labelStyle, {
      width: r.value
    }];
  }), a = Dt(() => {
    const {
      showRequireMark: f
    } = e;
    return f !== void 0 ? f : t == null ? void 0 : t.props.showRequireMark;
  }), s = Dt(() => {
    const {
      requireMarkPlacement: f
    } = e;
    return f !== void 0 ? f : (t == null ? void 0 : t.props.requireMarkPlacement) || "right";
  }), d = Af(!1), c = Af(!1), h = Dt(() => {
    const {
      validationStatus: f
    } = e;
    if (f !== void 0) return f;
    if (d.value) return "error";
    if (c.value) return "warning";
  }), p = Dt(() => {
    const {
      showFeedback: f
    } = e;
    return f !== void 0 ? f : (t == null ? void 0 : t.props.showFeedback) !== void 0 ? t.props.showFeedback : !0;
  }), v = Dt(() => {
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
    mergedShowLabel: v,
    isAutoLabelWidth: o
  };
}
function $O(e) {
  const t = $d(ci, null), n = Dt(() => {
    const {
      rulePath: l
    } = e;
    if (l !== void 0) return l;
    const {
      path: a
    } = e;
    if (a !== void 0) return a;
  }), o = Dt(() => {
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
        const c = oi(s, d);
        c !== void 0 && (Array.isArray(c) ? l.push(...c) : l.push(c));
      }
    }
    return l;
  }), r = Dt(() => o.value.some((l) => l.required)), i = Dt(() => r.value || e.required);
  return {
    mergedRules: o,
    mergedRequired: i
  };
}
var Vf = function(e, t, n, o) {
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
const Ul = window.Vue.computed, RO = window.Vue.defineComponent, qt = window.Vue.h, kO = window.Vue.inject, PO = window.Vue.onMounted, _O = window.Vue.provide, Qi = window.Vue.ref, ea = window.Vue.toRef, TO = window.Vue.Transition, FO = window.Vue.watch, Rd = Object.assign(Object.assign({}, _e.props), {
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
}), EO = ei(Rd);
function Bf(e, t) {
  return (...n) => {
    try {
      const o = e(...n);
      return !t && (typeof o == "boolean" || o instanceof Error || Array.isArray(o)) || o != null && o.then ? o : (o === void 0 || so("form-item/validate", `You return a ${typeof o} typed value in the validator method, which is not recommended. Please use ${t ? "`Promise`" : "`boolean`, `Error` or `Promise`"} typed value instead.`), !0);
    } catch (o) {
      so("form-item/validate", "An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation."), console.error(o);
      return;
    }
  };
}
const OO = RO({
  name: "FormItem",
  props: Rd,
  setup(e) {
    _w(Fv, "formItems", ea(e, "path"));
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = qe(e), o = kO(ci, null), r = CO(e), i = SO(e), {
      validationErrored: l,
      validationWarned: a
    } = i, {
      mergedRequired: s,
      mergedRules: d
    } = $O(e), {
      mergedSize: c
    } = r, {
      mergedLabelPlacement: h,
      mergedLabelAlign: p,
      mergedRequireMarkPlacement: v
    } = i, f = Qi([]), m = Qi(Zr()), g = o ? ea(o.props, "disabled") : Qi(!1), u = _e("Form", "-form-item", xO, Tv, e, t);
    FO(ea(e, "path"), () => {
      e.ignorePathChange || w();
    });
    function w() {
      f.value = [], l.value = !1, a.value = !1, e.feedback && (m.value = Zr());
    }
    const C = (...M) => Vf(this, [...M], void 0, function* (O = null, U = () => !0, L = {
      suppressWarning: !0
    }) {
      const {
        path: Y
      } = e;
      L ? L.first || (L.first = e.first) : L = {};
      const {
        value: Q
      } = d, J = o ? oi(o.props.model, Y || "") : void 0, q = {}, I = {}, G = (O ? Q.filter((ge) => Array.isArray(ge.trigger) ? ge.trigger.includes(O) : ge.trigger === O) : Q).filter(U).map((ge, $e) => {
        const Se = Object.assign({}, ge);
        if (Se.validator && (Se.validator = Bf(Se.validator, !1)), Se.asyncValidator && (Se.asyncValidator = Bf(Se.asyncValidator, !0)), Se.renderMessage) {
          const Be = `__renderMessage__${$e}`;
          I[Be] = Se.message, Se.message = Be, q[Be] = Se.renderMessage;
        }
        return Se;
      }), Z = G.filter((ge) => ge.level !== "warning"), ae = G.filter((ge) => ge.level === "warning"), le = {
        valid: !0,
        errors: void 0,
        warnings: void 0
      };
      if (!G.length) return le;
      const de = Y ?? "__n_no_path__", me = new ir({
        [de]: Z
      }), X = new ir({
        [de]: ae
      }), {
        validateMessages: ce
      } = (o == null ? void 0 : o.props) || {};
      ce && (me.messages(ce), X.messages(ce));
      const ke = (ge) => {
        f.value = ge.map(($e) => {
          const Se = ($e == null ? void 0 : $e.message) || "";
          return {
            key: Se,
            render: () => Se.startsWith("__renderMessage__") ? q[Se]() : Se
          };
        }), ge.forEach(($e) => {
          var Se;
          !((Se = $e.message) === null || Se === void 0) && Se.startsWith("__renderMessage__") && ($e.message = I[$e.message]);
        });
      };
      if (Z.length) {
        const ge = yield new Promise(($e) => {
          me.validate({
            [de]: J
          }, L, $e);
        });
        ge != null && ge.length && (le.valid = !1, le.errors = ge, ke(ge));
      }
      if (ae.length && !le.errors) {
        const ge = yield new Promise(($e) => {
          X.validate({
            [de]: J
          }, L, $e);
        });
        ge != null && ge.length && (ke(ge), le.warnings = ge);
      }
      return !le.errors && !le.warnings ? w() : (l.value = !!le.errors, a.value = !!le.warnings), le;
    });
    function b() {
      C("blur");
    }
    function x() {
      C("change");
    }
    function S() {
      C("focus");
    }
    function y() {
      C("input");
    }
    function T(M, O) {
      return Vf(this, void 0, void 0, function* () {
        let U, L, Y, Q;
        return typeof M == "string" ? (U = M, L = O) : M !== null && typeof M == "object" && (U = M.trigger, L = M.callback, Y = M.shouldRuleBeApplied, Q = M.options), yield new Promise((J, q) => {
          C(U, Y, Q).then(({
            valid: I,
            errors: G,
            warnings: Z
          }) => {
            I ? (L && L(void 0, {
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
    _O(ps, {
      path: ea(e, "path"),
      disabled: g,
      mergedSize: r.mergedSize,
      mergedValidationStatus: i.mergedValidationStatus,
      restoreValidation: w,
      handleContentBlur: b,
      handleContentChange: x,
      handleContentFocus: S,
      handleContentInput: y
    });
    const R = {
      validate: T,
      restoreValidation: w,
      internalValidate: C
    }, E = Qi(null);
    PO(() => {
      if (!i.isAutoLabelWidth.value) return;
      const M = E.value;
      if (M !== null) {
        const O = M.style.whiteSpace;
        M.style.whiteSpace = "nowrap", M.style.width = "", o == null || o.deriveMaxChildLabelWidth(Number(getComputedStyle(M).width.slice(0, -2))), M.style.whiteSpace = O;
      }
    });
    const W = Ul(() => {
      var M;
      const {
        value: O
      } = c, {
        value: U
      } = h, L = U === "top" ? "vertical" : "horizontal", {
        common: {
          cubicBezierEaseInOut: Y
        },
        self: {
          labelTextColor: Q,
          asteriskColor: J,
          lineHeight: q,
          feedbackTextColor: I,
          feedbackTextColorWarning: G,
          feedbackTextColorError: Z,
          feedbackPadding: ae,
          labelFontWeight: le,
          [re("labelHeight", O)]: de,
          [re("blankHeight", O)]: me,
          [re("feedbackFontSize", O)]: X,
          [re("feedbackHeight", O)]: ce,
          [re("labelPadding", L)]: ke,
          [re("labelTextAlign", L)]: ge,
          [re(re("labelFontSize", U), O)]: $e
        }
      } = u.value;
      let Se = (M = p.value) !== null && M !== void 0 ? M : ge;
      return U === "top" && (Se = Se === "right" ? "flex-end" : "flex-start"), {
        "--n-bezier": Y,
        "--n-line-height": q,
        "--n-blank-height": me,
        "--n-label-font-size": $e,
        "--n-label-text-align": Se,
        "--n-label-height": de,
        "--n-label-padding": ke,
        "--n-label-font-weight": le,
        "--n-asterisk-color": J,
        "--n-label-text-color": Q,
        "--n-feedback-padding": ae,
        "--n-feedback-font-size": X,
        "--n-feedback-height": ce,
        "--n-feedback-text-color": I,
        "--n-feedback-text-color-warning": G,
        "--n-feedback-text-color-error": Z
      };
    }), _ = n ? wt("form-item", Ul(() => {
      var M;
      return `${c.value[0]}${h.value[0]}${((M = p.value) === null || M === void 0 ? void 0 : M[0]) || ""}`;
    }), W, e) : void 0, z = Ul(() => h.value === "left" && v.value === "left" && p.value === "left");
    return Object.assign(Object.assign(Object.assign(Object.assign({
      labelElementRef: E,
      mergedClsPrefix: t,
      mergedRequired: s,
      feedbackId: m,
      renderExplains: f,
      reverseColSpace: z
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
      const d = qt("span", {
        class: `${t}-form-item-label__text`
      }, s), c = l ? qt("span", {
        class: `${t}-form-item-label__asterisk`
      }, r !== "left" ? " *" : "* ") : r === "right-hanging" && qt("span", {
        class: `${t}-form-item-label__asterisk-placeholder`
      }, " *"), {
        labelProps: h
      } = this;
      return qt("label", Object.assign({}, h, {
        class: [h == null ? void 0 : h.class, `${t}-form-item-label`, `${t}-form-item-label--${r}-mark`, this.reverseColSpace && `${t}-form-item-label--reverse-columns-space`],
        style: this.mergedLabelStyle,
        ref: "labelElementRef"
      }), r === "left" ? [c, d] : [d, c]);
    };
    return qt("div", {
      class: [`${t}-form-item`, this.themeClass, `${t}-form-item--${this.mergedSize}-size`, `${t}-form-item--${this.mergedLabelPlacement}-labelled`, this.isAutoLabelWidth && `${t}-form-item--auto-label-width`, !n && `${t}-form-item--no-label`],
      style: this.cssVars
    }, n && a(), qt("div", {
      class: [`${t}-form-item-blank`, this.contentClass, this.mergedValidationStatus && `${t}-form-item-blank--${this.mergedValidationStatus}`],
      style: this.contentStyle
    }, e), this.mergedShowFeedback ? qt("div", {
      key: this.feedbackId,
      style: this.feedbackStyle,
      class: [`${t}-form-item-feedback-wrapper`, this.feedbackClass]
    }, qt(TO, {
      name: "fade-down-transition",
      mode: "out-in"
    }, {
      default: () => {
        const {
          mergedValidationStatus: s
        } = this;
        return We(e.feedback, (d) => {
          var c;
          const {
            feedback: h
          } = this, p = d || h ? qt("div", {
            key: "__feedback__",
            class: `${t}-form-item-feedback__line`
          }, d || h) : this.renderExplains.length ? (c = this.renderExplains) === null || c === void 0 ? void 0 : c.map(({
            key: v,
            render: f
          }) => qt("div", {
            key: v,
            class: `${t}-form-item-feedback__line`
          }, f())) : null;
          return p ? s === "warning" ? qt("div", {
            key: "controlled-warning",
            class: `${t}-form-item-feedback ${t}-form-item-feedback--warning`
          }, p) : s === "error" ? qt("div", {
            key: "controlled-error",
            class: `${t}-form-item-feedback ${t}-form-item-feedback--error`
          }, p) : s === "success" ? qt("div", {
            key: "controlled-success",
            class: `${t}-form-item-feedback ${t}-form-item-feedback--success`
          }, p) : qt("div", {
            key: "controlled-default",
            class: `${t}-form-item-feedback`
          }, p) : null;
        });
      }
    })) : null);
  }
}), Lf = 1, Ov = "n-grid", zO = window.Vue.computed, MO = window.Vue.defineComponent, IO = window.Vue.getCurrentInstance, Df = window.Vue.h, AO = window.Vue.inject, zv = 1, kd = {
  span: {
    type: [Number, String],
    default: zv
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
}, VO = ei(kd), BO = MO({
  __GRID_ITEM__: !0,
  name: "GridItem",
  alias: ["Gi"],
  props: kd,
  setup() {
    const {
      isSsrRef: e,
      xGapRef: t,
      itemStyleRef: n,
      overflowRef: o,
      layoutShiftDisabledRef: r
    } = AO(Ov), i = IO();
    return {
      overflow: o,
      itemStyle: n,
      layoutShiftDisabled: r,
      mergedXGap: zO(() => it(t.value || 0)),
      deriveStyle: () => {
        e.value;
        const {
          privateSpan: l = zv,
          privateShow: a = !0,
          privateColStart: s = void 0,
          privateOffset: d = 0
        } = i.vnode.props, {
          value: c
        } = t, h = it(c || 0);
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
      return Df("div", {
        style: {
          gridColumn: `span ${n} / span ${n}`,
          marginLeft: o ? `calc((100% - (${n} - 1) * ${r}) / ${n} * ${o} + ${r} * ${o})` : ""
        }
      }, this.$slots);
    }
    return Df("div", {
      style: [this.itemStyle, this.deriveStyle()]
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e, {
      overflow: this.overflow
    }));
  }
}), LO = window.Vue.defineComponent, Nf = window.Vue.h, DO = window.Vue.ref, NO = Object.assign(Object.assign({}, kd), Rd), no = LO({
  __GRID_ITEM__: !0,
  name: "FormItemGridItem",
  alias: ["FormItemGi"],
  props: NO,
  setup() {
    const e = DO(null);
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
    return Nf(BO, Qr(this.$.vnode.props || {}, VO), {
      default: () => {
        const e = Qr(this.$props, EO);
        return Nf(OO, Object.assign({
          ref: "formItemInstRef"
        }, e), this.$slots);
      }
    });
  }
}), HO = {
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
}, Hf = window.Vue.cloneVNode, Kl = window.Vue.computed, jO = window.Vue.defineComponent, ql = window.Vue.h, jf = window.Vue.mergeProps, WO = window.Vue.onMounted, UO = window.Vue.provide, ta = window.Vue.ref, Wf = window.Vue.toRef, KO = window.Vue.vShow, Mv = 24, Gl = "__ssr__", qO = {
  layoutShiftDisabled: Boolean,
  responsive: {
    type: [String, Boolean],
    default: "self"
  },
  cols: {
    type: [Number, String],
    default: Mv
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
}, GO = jO({
  name: "Grid",
  inheritAttrs: !1,
  props: qO,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBreakpointsRef: n
    } = qe(e), o = /^\d+$/, r = ta(void 0), i = pw((n == null ? void 0 : n.value) || HO), l = Oe(() => !!(e.itemResponsive || !o.test(e.cols.toString()) || !o.test(e.xGap.toString()) || !o.test(e.yGap.toString()))), a = Kl(() => {
      if (l.value)
        return e.responsive === "self" ? r.value : i.value;
    }), s = Oe(() => {
      var u;
      return (u = Number(Bo(e.cols.toString(), a.value))) !== null && u !== void 0 ? u : Mv;
    }), d = Oe(() => Bo(e.xGap.toString(), a.value)), c = Oe(() => Bo(e.yGap.toString(), a.value)), h = (u) => {
      r.value = u.contentRect.width;
    }, p = (u) => {
      Xr(h, u);
    }, v = ta(!1), f = Kl(() => {
      if (e.responsive === "self")
        return p;
    }), m = ta(!1), g = ta();
    return WO(() => {
      const {
        value: u
      } = g;
      u && u.hasAttribute(Gl) && (u.removeAttribute(Gl), m.value = !0);
    }), UO(Ov, {
      layoutShiftDisabledRef: Wf(e, "layoutShiftDisabled"),
      isSsrRef: m,
      itemStyleRef: Wf(e, "itemStyle"),
      xGapRef: d,
      overflowRef: v
    }), {
      isSsr: !ar,
      contentEl: g,
      mergedClsPrefix: t,
      style: Kl(() => e.layoutShiftDisabled ? {
        width: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${e.cols}, minmax(0, 1fr))`,
        columnGap: it(e.xGap),
        rowGap: it(e.yGap)
      } : {
        width: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${s.value}, minmax(0, 1fr))`,
        columnGap: it(d.value),
        rowGap: it(c.value)
      }),
      isResponsive: l,
      responsiveQuery: a,
      responsiveCols: s,
      handleResize: f,
      overflow: v
    };
  },
  render() {
    if (this.layoutShiftDisabled)
      return ql("div", jf({
        ref: "contentEl",
        class: `${this.mergedClsPrefix}-grid`,
        style: this.style
      }, this.$attrs), this.$slots);
    const e = () => {
      var t, n, o, r, i, l, a;
      this.overflow = !1;
      const s = nr(ed(this)), d = [], {
        collapsed: c,
        collapsedRows: h,
        responsiveCols: p,
        responsiveQuery: v
      } = this;
      s.forEach((w) => {
        var C, b, x, S, y;
        if (((C = w == null ? void 0 : w.type) === null || C === void 0 ? void 0 : C.__GRID_ITEM__) !== !0) return;
        if (My(w)) {
          const E = Hf(w);
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
        }) => E !== KO)) || null, ((x = w.dirs) === null || x === void 0 ? void 0 : x.length) === 0 && (w.dirs = null);
        const T = Hf(w), R = Number((y = Bo((S = T.props) === null || S === void 0 ? void 0 : S.span, v)) !== null && y !== void 0 ? y : Lf);
        R !== 0 && d.push({
          child: T,
          rawChildSpan: R
        });
      });
      let f = 0;
      const m = (t = d[d.length - 1]) === null || t === void 0 ? void 0 : t.child;
      if (m != null && m.props) {
        const w = (n = m.props) === null || n === void 0 ? void 0 : n.suffix;
        w !== void 0 && w !== !1 && (f = Number((r = Bo((o = m.props) === null || o === void 0 ? void 0 : o.span, v)) !== null && r !== void 0 ? r : Lf), m.props.privateSpan = f, m.props.privateColStart = p + 1 - f, m.props.privateShow = (i = m.props.privateShow) !== null && i !== void 0 ? i : !0);
      }
      let g = 0, u = !1;
      for (const {
        child: w,
        rawChildSpan: C
      } of d) {
        if (u && (this.overflow = !0), !u) {
          const b = Number((a = Bo((l = w.props) === null || l === void 0 ? void 0 : l.offset, v)) !== null && a !== void 0 ? a : 0), x = Math.min(C + b, p);
          if (w.props ? (w.props.privateSpan = x, w.props.privateOffset = b) : w.props = {
            privateSpan: x,
            privateOffset: b
          }, c) {
            const S = g % p;
            x + S > p && (g += p - S), x + g + f > h * p ? u = !0 : g += x;
          }
        }
        u && (w.props ? w.props.privateShow !== !0 && (w.props.privateShow = !1) : w.props = {
          privateShow: !1
        });
      }
      return ql("div", jf({
        ref: "contentEl",
        class: `${this.mergedClsPrefix}-grid`,
        style: this.style,
        [Gl]: this.isSsr || void 0
      }, this.$attrs), d.map(({
        child: w
      }) => w));
    };
    return this.isResponsive && this.responsive === "self" ? ql(To, {
      onResize: this.handleResize
    }, {
      default: e
    }) : e();
  }
}), XO = H([A("input-number-suffix", `
 display: inline-block;
 margin-right: 10px;
 `), A("input-number-prefix", `
 display: inline-block;
 margin-left: 10px;
 `)]);
function YO(e) {
  return e == null || typeof e == "string" && e.trim() === "" ? null : Number(e);
}
function ZO(e) {
  return e.includes(".") && (/^(-)?\d+.*(\.|0)$/.test(e) || /^-?\d*$/.test(e)) || e === "-" || e === "-0";
}
function Xl(e) {
  return e == null ? !0 : !Number.isNaN(e);
}
function Uf(e, t) {
  return typeof e != "number" ? "" : t === void 0 ? String(e) : e.toFixed(t);
}
function Yl(e) {
  if (e === null) return null;
  if (typeof e == "number")
    return e;
  {
    const t = Number(e);
    return Number.isNaN(t) ? null : t;
  }
}
const JO = window.Vue.computed, QO = window.Vue.defineComponent, Sn = window.Vue.h, ez = window.Vue.nextTick, Mr = window.Vue.ref, tz = window.Vue.toRef, nz = window.Vue.watch;
window.Vue.watchEffect;
const Kf = 800, qf = 100, oz = Object.assign(Object.assign({}, _e.props), {
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
}), rz = QO({
  name: "InputNumber",
  props: oz,
  slots: Object,
  setup(e) {
    const {
      mergedBorderedRef: t,
      mergedClsPrefixRef: n,
      mergedRtlRef: o
    } = qe(e), r = _e("InputNumber", "-input-number", XO, E2, e, n), {
      localeRef: i
    } = sr("InputNumber"), l = jn(e), {
      mergedSizeRef: a,
      mergedDisabledRef: s,
      mergedStatusRef: d
    } = l, c = Mr(null), h = Mr(null), p = Mr(null), v = Mr(e.defaultValue), f = tz(e, "value"), m = zt(f, v), g = Mr(""), u = (oe) => {
      const k = String(oe).split(".")[1];
      return k ? k.length : 0;
    }, w = (oe) => {
      const k = [e.min, e.max, e.step, oe].map(($) => $ === void 0 ? 0 : u($));
      return Math.max(...k);
    }, C = Oe(() => {
      const {
        placeholder: oe
      } = e;
      return oe !== void 0 ? oe : i.value.placeholder;
    }), b = Oe(() => {
      const oe = Yl(e.step);
      return oe !== null ? oe === 0 ? 1 : Math.abs(oe) : 1;
    }), x = Oe(() => {
      const oe = Yl(e.min);
      return oe !== null ? oe : null;
    }), S = Oe(() => {
      const oe = Yl(e.max);
      return oe !== null ? oe : null;
    }), y = () => {
      const {
        value: oe
      } = m;
      if (Xl(oe)) {
        const {
          format: k,
          precision: $
        } = e;
        k ? g.value = k(oe) : oe === null || $ === void 0 || u(oe) > $ ? g.value = Uf(oe, void 0) : g.value = Uf(oe, $);
      } else
        g.value = String(oe);
    };
    y();
    const T = (oe) => {
      const {
        value: k
      } = m;
      if (oe === k) {
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
      ee && ie(ee, oe), D && ie(D, oe), $ && ie($, oe), v.value = oe, ve(), he();
    }, R = ({
      offset: oe,
      doUpdateIfValid: k,
      fixPrecision: $,
      isInputing: D
    }) => {
      const {
        value: ee
      } = g;
      if (D && ZO(ee))
        return !1;
      const ve = (e.parse || YO)(ee);
      if (ve === null)
        return k && T(null), null;
      if (Xl(ve)) {
        const he = u(ve), {
          precision: F
        } = e;
        if (F !== void 0 && F < he && !$)
          return !1;
        let j = Number.parseFloat((ve + oe).toFixed(F ?? w(ve)));
        if (Xl(j)) {
          const {
            value: pe
          } = S, {
            value: Te
          } = x;
          if (pe !== null && j > pe) {
            if (!k || D) return !1;
            j = pe;
          }
          if (Te !== null && j < Te) {
            if (!k || D) return !1;
            j = Te;
          }
          return e.validator && !e.validator(j) ? !1 : (k && T(j), j);
        }
      }
      return !1;
    }, E = Oe(() => R({
      offset: 0,
      doUpdateIfValid: !1,
      isInputing: !1,
      fixPrecision: !1
    }) === !1), W = Oe(() => {
      const {
        value: oe
      } = m;
      if (e.validator && oe === null)
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
    }), _ = Oe(() => {
      const {
        value: oe
      } = m;
      if (e.validator && oe === null)
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
    function z(oe) {
      const {
        onFocus: k
      } = e, {
        nTriggerFormFocus: $
      } = l;
      k && ie(k, oe), $();
    }
    function M(oe) {
      var k, $;
      if (oe.target === ((k = c.value) === null || k === void 0 ? void 0 : k.wrapperElRef))
        return;
      const D = R({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !1,
        fixPrecision: !0
      });
      if (D !== !1) {
        const he = ($ = c.value) === null || $ === void 0 ? void 0 : $.inputElRef;
        he && (he.value = String(D || "")), m.value === D && y();
      } else
        y();
      const {
        onBlur: ee
      } = e, {
        nTriggerFormBlur: ve
      } = l;
      ee && ie(ee, oe), ve(), ez(() => {
        y();
      });
    }
    function O(oe) {
      const {
        onClear: k
      } = e;
      k && ie(k, oe);
    }
    function U() {
      const {
        value: oe
      } = _;
      if (!oe) {
        me();
        return;
      }
      const {
        value: k
      } = m;
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
        value: oe
      } = W;
      if (!oe) {
        le();
        return;
      }
      const {
        value: k
      } = m;
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
    const Y = z, Q = M;
    function J() {
      if (e.validator) return null;
      const {
        value: oe
      } = x, {
        value: k
      } = S;
      return oe !== null ? Math.max(0, oe) : k !== null ? Math.min(0, k) : 0;
    }
    function q(oe) {
      O(oe), T(null);
    }
    function I(oe) {
      var k, $, D;
      !((k = p.value) === null || k === void 0) && k.$el.contains(oe.target) && oe.preventDefault(), !(($ = h.value) === null || $ === void 0) && $.$el.contains(oe.target) && oe.preventDefault(), (D = c.value) === null || D === void 0 || D.activate();
    }
    let G = null, Z = null, ae = null;
    function le() {
      ae && (window.clearTimeout(ae), ae = null), G && (window.clearInterval(G), G = null);
    }
    let de = null;
    function me() {
      de && (window.clearTimeout(de), de = null), Z && (window.clearInterval(Z), Z = null);
    }
    function X() {
      le(), ae = window.setTimeout(() => {
        G = window.setInterval(() => {
          L();
        }, qf);
      }, Kf), at("mouseup", document, le, {
        once: !0
      });
    }
    function ce() {
      me(), de = window.setTimeout(() => {
        Z = window.setInterval(() => {
          U();
        }, qf);
      }, Kf), at("mouseup", document, me, {
        once: !0
      });
    }
    const ke = () => {
      Z || U();
    }, ge = () => {
      G || L();
    };
    function $e(oe) {
      var k, $;
      if (oe.key === "Enter") {
        if (oe.target === ((k = c.value) === null || k === void 0 ? void 0 : k.wrapperElRef))
          return;
        R({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && (($ = c.value) === null || $ === void 0 || $.deactivate());
      } else if (oe.key === "ArrowUp") {
        if (!_.value || e.keyboard.ArrowUp === !1) return;
        oe.preventDefault(), R({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && U();
      } else if (oe.key === "ArrowDown") {
        if (!W.value || e.keyboard.ArrowDown === !1) return;
        oe.preventDefault(), R({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && L();
      }
    }
    function Se(oe) {
      g.value = oe, e.updateValueOnInput && !e.format && !e.parse && e.precision === void 0 && R({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !0,
        fixPrecision: !1
      });
    }
    nz(m, () => {
      y();
    });
    const Be = {
      focus: () => {
        var oe;
        return (oe = c.value) === null || oe === void 0 ? void 0 : oe.focus();
      },
      blur: () => {
        var oe;
        return (oe = c.value) === null || oe === void 0 ? void 0 : oe.blur();
      },
      select: () => {
        var oe;
        return (oe = c.value) === null || oe === void 0 ? void 0 : oe.select();
      }
    }, Me = Mt("InputNumber", o, n);
    return Object.assign(Object.assign({}, Be), {
      rtlEnabled: Me,
      inputInstRef: c,
      minusButtonInstRef: h,
      addButtonInstRef: p,
      mergedClsPrefix: n,
      mergedBordered: t,
      uncontrolledValue: v,
      mergedValue: m,
      mergedPlaceholder: C,
      displayedValueInvalid: E,
      mergedSize: a,
      mergedDisabled: s,
      displayedValue: g,
      addable: _,
      minusable: W,
      mergedStatus: d,
      handleFocus: Y,
      handleBlur: Q,
      handleClear: q,
      handleMouseDown: I,
      handleAddClick: ke,
      handleMinusClick: ge,
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
      buttonThemeOverrides: JO(() => {
        const {
          self: {
            iconColorDisabled: oe
          }
        } = r.value, [k, $, D, ee] = lo(oe);
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
    } = this, n = () => Sn(Bu, {
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
      icon: () => vn(t["minus-icon"], () => [Sn(Ct, {
        clsPrefix: e
      }, {
        default: () => Sn(BR, null)
      })])
    }), o = () => Sn(Bu, {
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
      icon: () => vn(t["add-icon"], () => [Sn(Ct, {
        clsPrefix: e
      }, {
        default: () => Sn(hR, null)
      })])
    });
    return Sn("div", {
      class: [`${e}-input-number`, this.rtlEnabled && `${e}-input-number--rtl`]
    }, Sn($o, {
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
        return this.showButton && this.buttonPlacement === "both" ? [n(), We(t.prefix, (i) => i ? Sn("span", {
          class: `${e}-input-number-prefix`
        }, i) : null)] : (r = t.prefix) === null || r === void 0 ? void 0 : r.call(t);
      },
      suffix: () => {
        var r;
        return this.showButton ? [We(t.suffix, (i) => i ? Sn("span", {
          class: `${e}-input-number-suffix`
        }, i) : null), this.buttonPlacement === "right" ? n() : null, o()] : (r = t.suffix) === null || r === void 0 ? void 0 : r.call(t);
      }
    }));
  }
}), iz = A("switch", `
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
 `), A("base-loading", `
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `, [rn({
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
 `)]), K("round", [B("rail", "border-radius: calc(var(--n-rail-height) / 2);", [B("button", "border-radius: calc(var(--n-button-height) / 2);")])]), Qe("disabled", [Qe("icon", [K("rubber-band", [K("pressed", [B("rail", [B("button", "max-width: var(--n-button-width-pressed);")])]), B("rail", [H("&:active", [B("button", "max-width: var(--n-button-width-pressed);")])]), K("active", [K("pressed", [B("rail", [B("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]), B("rail", [H("&:active", [B("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]), K("active", [B("rail", [B("button", "left: calc(100% - var(--n-button-width) - var(--n-offset))")])]), B("rail", `
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
 `, [rn()]), B("button", `
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
 `)]), K("active", [B("rail", "background-color: var(--n-rail-color-active);")]), K("loading", [B("rail", `
 cursor: wait;
 `)]), K("disabled", [B("rail", `
 cursor: not-allowed;
 opacity: .5;
 `)])]), na = window.Vue.computed, az = window.Vue.defineComponent, Gt = window.Vue.h, Zl = window.Vue.ref, lz = window.Vue.toRef;
window.Vue.watchEffect;
const sz = Object.assign(Object.assign({}, _e.props), {
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
let Ir;
const dz = az({
  name: "Switch",
  props: sz,
  slots: Object,
  setup(e) {
    Ir === void 0 && (typeof CSS < "u" ? typeof CSS.supports < "u" ? Ir = CSS.supports("width", "max(1px)") : Ir = !1 : Ir = !0);
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = qe(e), o = _e("Switch", "-switch", iz, M2, e, t), r = jn(e), {
      mergedSizeRef: i,
      mergedDisabledRef: l
    } = r, a = Zl(e.defaultValue), s = lz(e, "value"), d = zt(s, a), c = na(() => d.value === e.checkedValue), h = Zl(!1), p = Zl(!1), v = na(() => {
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
        nTriggerFormChange: z
      } = r;
      R && ie(R, T), W && ie(W, T), E && ie(E, T), a.value = T, _(), z();
    }
    function m() {
      const {
        nTriggerFormFocus: T
      } = r;
      T();
    }
    function g() {
      const {
        nTriggerFormBlur: T
      } = r;
      T();
    }
    function u() {
      e.loading || l.value || (d.value !== e.checkedValue ? f(e.checkedValue) : f(e.uncheckedValue));
    }
    function w() {
      p.value = !0, m();
    }
    function C() {
      p.value = !1, g(), h.value = !1;
    }
    function b(T) {
      e.loading || l.value || T.key === " " && (d.value !== e.checkedValue ? f(e.checkedValue) : f(e.uncheckedValue), h.value = !1);
    }
    function x(T) {
      e.loading || l.value || T.key === " " && (T.preventDefault(), h.value = !0);
    }
    const S = na(() => {
      const {
        value: T
      } = i, {
        self: {
          opacityDisabled: R,
          railColor: E,
          railColorActive: W,
          buttonBoxShadow: _,
          buttonColor: z,
          boxShadowFocus: M,
          loadingColor: O,
          textColor: U,
          iconColor: L,
          [re("buttonHeight", T)]: Y,
          [re("buttonWidth", T)]: Q,
          [re("buttonWidthPressed", T)]: J,
          [re("railHeight", T)]: q,
          [re("railWidth", T)]: I,
          [re("railBorderRadius", T)]: G,
          [re("buttonBorderRadius", T)]: Z
        },
        common: {
          cubicBezierEaseInOut: ae
        }
      } = o.value;
      let le, de, me;
      return Ir ? (le = `calc((${q} - ${Y}) / 2)`, de = `max(${q}, ${Y})`, me = `max(${I}, calc(${I} + ${Y} - ${q}))`) : (le = it((xt(q) - xt(Y)) / 2), de = it(Math.max(xt(q), xt(Y))), me = xt(q) > xt(Y) ? I : it(xt(I) + xt(Y) - xt(q))), {
        "--n-bezier": ae,
        "--n-button-border-radius": Z,
        "--n-button-box-shadow": _,
        "--n-button-color": z,
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
        "--n-rail-width": I,
        "--n-width": me,
        "--n-box-shadow-focus": M,
        "--n-loading-color": O,
        "--n-text-color": U,
        "--n-icon-color": L
      };
    }), y = n ? wt("switch", na(() => i.value[0]), S, e) : void 0;
    return {
      handleClick: u,
      handleBlur: C,
      handleFocus: w,
      handleKeyup: b,
      handleKeydown: x,
      mergedRailStyle: v,
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
    } = i, h = !(Qo(s) && Qo(d) && Qo(c));
    return Gt("div", {
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
    }, Gt("div", {
      class: `${e}-switch__rail`,
      "aria-hidden": "true",
      style: o
    }, We(l, (p) => We(a, (v) => p || v ? Gt("div", {
      "aria-hidden": !0,
      class: `${e}-switch__children-placeholder`
    }, Gt("div", {
      class: `${e}-switch__rail-placeholder`
    }, Gt("div", {
      class: `${e}-switch__button-placeholder`
    }), p), Gt("div", {
      class: `${e}-switch__rail-placeholder`
    }, Gt("div", {
      class: `${e}-switch__button-placeholder`
    }), v)) : null)), Gt("div", {
      class: `${e}-switch__button`
    }, We(s, (p) => We(d, (v) => We(c, (f) => Gt(dr, null, {
      default: () => this.loading ? Gt(cr, {
        key: "loading",
        clsPrefix: e,
        strokeWidth: 20
      }) : this.checked && (v || p) ? Gt("div", {
        class: `${e}-switch__button-icon`,
        key: v ? "checked-icon" : "icon"
      }, v || p) : !this.checked && (f || p) ? Gt("div", {
        class: `${e}-switch__button-icon`,
        key: f ? "unchecked-icon" : "icon"
      }, f || p) : null
    })))), We(l, (p) => p && Gt("div", {
      key: "checked",
      class: `${e}-switch__checked`
    }, p)), We(a, (p) => p && Gt("div", {
      key: "unchecked",
      class: `${e}-switch__unchecked`
    }, p)))));
  }
}), cz = window.Vue.defineComponent, ze = window.Vue.unref, ut = window.Vue.createVNode, Ft = window.Vue.withCtx, Gf = window.Vue.openBlock, uz = window.Vue.createBlock, fz = window.Vue.createCommentVNode, Xf = window.Vue.toDisplayString, Yf = window.Vue.createTextVNode, hz = window.Vue.createElementBlock, pz = { class: "plugin-backup" }, vz = window.Vue.computed, mz = window.Vue.h, gz = window.Vue.onMounted, Zf = window.Vue.reactive, oa = window.Vue.ref, bz = /* @__PURE__ */ cz({
  __name: "BackupView",
  setup(e) {
    const { t } = Ra(), n = Zf({
      dbType: "auto",
      backupType: "dump",
      customCommand: "",
      cron: "0 0 2 * * ?",
      enabled: "Y",
      retentionDays: 7,
      targetDir: ""
    }), o = [
      { label: "Auto", value: "auto" },
      { label: "MySQL", value: "mysql" },
      { label: "PostgreSQL", value: "postgresql" }
    ], r = [
      { label: "Dump", value: "dump" },
      { label: "Custom Command", value: "custom" }
    ], i = oa([]), l = oa(!1), a = oa(!1), s = oa(!1), d = Zf({
      page: 1,
      pageSize: 10,
      itemCount: 0,
      onChange: (b) => {
        d.page = b, u();
      },
      onUpdatePageSize: (b) => {
        d.pageSize = b, d.page = 1, u();
      }
    }), c = vz(() => [
      { title: t("plugin.backup.fileName"), key: "fileName", ellipsis: { tooltip: !0 } },
      {
        title: t("plugin.backup.status"),
        key: "status",
        render: (b) => {
          const x = b.status === "1";
          return mz(la, { type: x ? "success" : "error" }, { default: () => x ? "OK" : "FAIL" });
        }
      },
      { title: t("plugin.backup.fileSize"), key: "fileSize", render: (b) => w(b.fileSize) },
      { title: t("plugin.backup.startTime"), key: "startTime" },
      { title: t("plugin.backup.endTime"), key: "endTime" },
      { title: t("plugin.backup.message"), key: "message", ellipsis: { tooltip: !0 } }
    ]);
    function h() {
      return "/proxy-default";
    }
    function p() {
      const x = Object.keys(localStorage).find((y) => /token$/i.test(y) && !/refresh/i.test(y));
      if (!x) return null;
      const S = localStorage.getItem(x);
      if (!S) return null;
      try {
        return JSON.parse(S);
      } catch {
        return S;
      }
    }
    async function v(b, x = {}) {
      const S = {
        "Content-Type": "application/json"
      }, y = p();
      y && (S.Authorization = y.startsWith("Bearer ") ? y : `Bearer ${y}`);
      const R = await (await fetch(`${h()}${b}`, {
        ...x,
        headers: {
          ...S,
          ...x.headers
        }
      })).json();
      return R.data ?? R;
    }
    async function f() {
      const b = await v("/plugin/backup/config");
      Object.assign(n, b);
    }
    async function m(b = !1) {
      var x;
      a.value = !0;
      try {
        const S = await v("/plugin/backup/config", {
          method: "PUT",
          body: JSON.stringify(n)
        });
        Object.assign(n, S), b || (x = window.$message) == null || x.success(t("common.saveSuccess"));
      } finally {
        a.value = !1;
      }
    }
    async function g() {
      var b;
      s.value = !0;
      try {
        await m(!0), await v("/plugin/backup/run", { method: "POST" }), (b = window.$message) == null || b.success(t("plugin.backup.run")), await u(), await f();
      } finally {
        s.value = !1;
      }
    }
    async function u() {
      l.value = !0;
      try {
        const b = await v(
          "/plugin/backup/records/page",
          {
            method: "POST",
            body: JSON.stringify({ page: d.page, pageSize: d.pageSize })
          }
        );
        i.value = b.records || [], d.itemCount = b.total || 0;
      } finally {
        l.value = !1;
      }
    }
    function w(b) {
      if (!b) return "0 B";
      const x = ["B", "KB", "MB", "GB", "TB"];
      let S = 0, y = b;
      for (; y >= 1024 && S < x.length - 1; )
        y /= 1024, S += 1;
      return `${y.toFixed(2)} ${x[S]}`;
    }
    function C(b) {
      return b || "--";
    }
    return gz(async () => {
      await f(), await u();
    }), (b, x) => (Gf(), hz("div", pz, [
      ut(ze(_f), {
        vertical: "",
        size: "large"
      }, {
        default: Ft(() => [
          ut(ze(Du), {
            title: ze(t)("plugin.backup.config"),
            size: "small",
            bordered: ""
          }, {
            default: Ft(() => [
              ut(ze(N2), {
                "label-placement": "left",
                "label-width": "120",
                model: n,
                size: "small"
              }, {
                default: Ft(() => [
                  ut(ze(GO), {
                    cols: "2",
                    "x-gap": "16",
                    "y-gap": "8",
                    responsive: "screen"
                  }, {
                    default: Ft(() => [
                      ut(ze(no), {
                        label: ze(t)("plugin.backup.enabled")
                      }, {
                        default: Ft(() => [
                          ut(ze(dz), {
                            value: n.enabled,
                            "onUpdate:value": x[0] || (x[0] = (S) => n.enabled = S),
                            "checked-value": "Y",
                            "unchecked-value": "N"
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      ut(ze(no), {
                        label: ze(t)("plugin.backup.cron")
                      }, {
                        default: Ft(() => [
                          ut(ze($o), {
                            value: n.cron,
                            "onUpdate:value": x[1] || (x[1] = (S) => n.cron = S),
                            placeholder: "0 0 2 * * ?"
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      ut(ze(no), {
                        label: ze(t)("plugin.backup.dbType")
                      }, {
                        default: Ft(() => [
                          ut(ze(Rs), {
                            value: n.dbType,
                            "onUpdate:value": x[2] || (x[2] = (S) => n.dbType = S),
                            options: o
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      ut(ze(no), {
                        label: ze(t)("plugin.backup.backupType")
                      }, {
                        default: Ft(() => [
                          ut(ze(Rs), {
                            value: n.backupType,
                            "onUpdate:value": x[3] || (x[3] = (S) => n.backupType = S),
                            options: r
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      ut(ze(no), {
                        label: ze(t)("plugin.backup.targetDir")
                      }, {
                        default: Ft(() => [
                          ut(ze($o), {
                            value: n.targetDir,
                            "onUpdate:value": x[4] || (x[4] = (S) => n.targetDir = S),
                            placeholder: "C:\\\\backup"
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      ut(ze(no), {
                        label: ze(t)("plugin.backup.retentionDays")
                      }, {
                        default: Ft(() => [
                          ut(ze(rz), {
                            value: n.retentionDays,
                            "onUpdate:value": x[5] || (x[5] = (S) => n.retentionDays = S),
                            min: 1,
                            max: 365
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      n.backupType === "custom" ? (Gf(), uz(ze(no), {
                        key: 0,
                        label: ze(t)("plugin.backup.customCommand"),
                        span: "2"
                      }, {
                        default: Ft(() => [
                          ut(ze($o), {
                            value: n.customCommand,
                            "onUpdate:value": x[6] || (x[6] = (S) => n.customCommand = S),
                            placeholder: "mysqldump -h {host} -P {port} -u {user} {database} --result-file={file}",
                            type: "textarea",
                            autosize: { minRows: 2, maxRows: 4 }
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"])) : fz("v-if", !0),
                      ut(ze(no), {
                        label: ze(t)("plugin.backup.lastRunTime")
                      }, {
                        default: Ft(() => [
                          ut(ze($o), {
                            value: C(n.lastRunTime),
                            readonly: ""
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"])
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }, 8, ["model"]),
              ut(ze(_f), {
                justify: "end",
                class: "action-row"
              }, {
                default: Ft(() => [
                  ut(ze(ri), {
                    type: "primary",
                    onClick: m,
                    loading: a.value
                  }, {
                    default: Ft(() => [
                      Yf(
                        Xf(ze(t)("plugin.backup.save")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["loading"]),
                  ut(ze(ri), {
                    type: "success",
                    onClick: g,
                    loading: s.value
                  }, {
                    default: Ft(() => [
                      Yf(
                        Xf(ze(t)("plugin.backup.run")),
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
          ut(ze(Du), {
            title: ze(t)("plugin.backup.records"),
            size: "small",
            bordered: ""
          }, {
            default: Ft(() => [
              ut(ze(w2), {
                columns: c.value,
                data: i.value,
                loading: l.value,
                pagination: d,
                "row-key": (S) => S.id
              }, null, 8, ["columns", "data", "loading", "pagination", "row-key"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["title"])
        ]),
        _: 1
        /* STABLE */
      })
    ]));
  }
}), wz = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, xz = /* @__PURE__ */ wz(bz, [["__scopeId", "data-v-f660811e"]]);
export {
  xz as default
};
