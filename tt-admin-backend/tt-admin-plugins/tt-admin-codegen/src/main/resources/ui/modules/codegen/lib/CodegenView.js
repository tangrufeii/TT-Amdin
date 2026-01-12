/*!
  * shared v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function bm(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Cc = typeof window < "u", Zo = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), wm = (e, t, n) => ym({ l: e, k: t, s: n }), ym = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Vt = (e) => typeof e == "number" && isFinite(e), xm = (e) => Pd(e) === "[object Date]", Ha = (e) => Pd(e) === "[object RegExp]", tl = (e) => Qe(e) && Object.keys(e).length === 0, At = Object.assign, Cm = Object.create, dt = (e = null) => Cm(e);
let Sc;
const jo = () => Sc || (Sc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : dt());
function $c(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function Rc(e) {
  return e.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Sm(e) {
  return e = e.replace(/(\w+)\s*=\s*"([^"]*)"/g, (o, r, i) => `${r}="${Rc(i)}"`), e = e.replace(/(\w+)\s*=\s*'([^']*)'/g, (o, r, i) => `${r}='${Rc(i)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(e) && (e = e.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ].forEach((o) => {
    e = e.replace(o, "$1javascript&#58;");
  }), e;
}
const $m = Object.prototype.hasOwnProperty;
function Sn(e, t) {
  return $m.call(e, t);
}
const Tt = Array.isArray, Ct = (e) => typeof e == "function", $e = (e) => typeof e == "string", Pt = (e) => typeof e == "boolean", et = (e) => e !== null && typeof e == "object", Rm = (e) => et(e) && Ct(e.then) && Ct(e.catch), fp = Object.prototype.toString, Pd = (e) => fp.call(e), Qe = (e) => Pd(e) === "[object Object]", km = (e) => e == null ? "" : Tt(e) || Qe(e) && e.toString === fp ? JSON.stringify(e, null, 2) : String(e);
function Td(e, t = "") {
  return e.reduce((n, o, r) => r === 0 ? n + o : n + t + o, "");
}
const Ai = (e) => !et(e) || Tt(e);
function Aa(e, t) {
  if (Ai(e) || Ai(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: o, des: r } = n.pop();
    Object.keys(o).forEach((i) => {
      i !== "__proto__" && (et(o[i]) && !et(r[i]) && (r[i] = Array.isArray(o[i]) ? [] : dt()), Ai(r[i]) || Ai(o[i]) ? r[i] = o[i] : n.push({ src: o[i], des: r[i] }));
    });
  }
}
/*!
  * message-compiler v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Pm(e, t, n) {
  return { line: e, column: t, offset: n };
}
function Us(e, t, n) {
  return { start: e, end: t };
}
const ot = {
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
}, Tm = 17;
function nl(e, t, n = {}) {
  const { domain: o, messages: r, args: i } = n, l = e, a = new SyntaxError(String(l));
  return a.code = e, t && (a.location = t), a.domain = o, a;
}
function _m(e) {
  throw e;
}
const _n = " ", Em = "\r", Ht = `
`, zm = "\u2028", Fm = "\u2029";
function Om(e) {
  const t = e;
  let n = 0, o = 1, r = 1, i = 0;
  const l = (y) => t[y] === Em && t[y + 1] === Ht, a = (y) => t[y] === Ht, s = (y) => t[y] === Fm, d = (y) => t[y] === zm, c = (y) => l(y) || a(y) || s(y) || d(y), h = () => n, p = () => o, v = () => r, f = () => i, g = (y) => l(y) || s(y) || d(y) ? Ht : t[y], m = () => g(n), u = () => g(n + i);
  function w() {
    return i = 0, c(n) && (o++, r = 0), l(n) && n++, n++, r++, t[n];
  }
  function $() {
    return l(n + i) && i++, i++, t[n + i];
  }
  function b() {
    n = 0, o = 1, r = 1, i = 0;
  }
  function S(y = 0) {
    i = y;
  }
  function C() {
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
    charAt: g,
    currentChar: m,
    currentPeek: u,
    next: w,
    peek: $,
    reset: b,
    resetPeek: S,
    skipToPeek: C
  };
}
const Xn = void 0, Mm = ".", kc = "'", Im = "tokenizer";
function Vm(e, t = {}) {
  const n = t.location !== !1, o = Om(e), r = () => o.index(), i = () => Pm(o.line(), o.column(), o.index()), l = i(), a = r(), s = {
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
  function h(T, k, z, ...H) {
    const re = d();
    if (k.column += z, k.offset += z, c) {
      const le = n ? Us(re.startLoc, k) : null, F = nl(T, le, {
        domain: Im,
        args: H
      });
      c(F);
    }
  }
  function p(T, k, z) {
    T.endLoc = i(), T.currentType = k;
    const H = { type: k };
    return n && (H.loc = Us(T.startLoc, T.endLoc)), z != null && (H.value = z), H;
  }
  const v = (T) => p(
    T,
    13
    /* TokenTypes.EOF */
  );
  function f(T, k) {
    return T.currentChar() === k ? (T.next(), k) : (h(ot.EXPECTED_TOKEN, i(), 0, k), "");
  }
  function g(T) {
    let k = "";
    for (; T.currentPeek() === _n || T.currentPeek() === Ht; )
      k += T.currentPeek(), T.peek();
    return k;
  }
  function m(T) {
    const k = g(T);
    return T.skipToPeek(), k;
  }
  function u(T) {
    if (T === Xn)
      return !1;
    const k = T.charCodeAt(0);
    return k >= 97 && k <= 122 || // a-z
    k >= 65 && k <= 90 || // A-Z
    k === 95;
  }
  function w(T) {
    if (T === Xn)
      return !1;
    const k = T.charCodeAt(0);
    return k >= 48 && k <= 57;
  }
  function $(T, k) {
    const { currentType: z } = k;
    if (z !== 2)
      return !1;
    g(T);
    const H = u(T.currentPeek());
    return T.resetPeek(), H;
  }
  function b(T, k) {
    const { currentType: z } = k;
    if (z !== 2)
      return !1;
    g(T);
    const H = T.currentPeek() === "-" ? T.peek() : T.currentPeek(), re = w(H);
    return T.resetPeek(), re;
  }
  function S(T, k) {
    const { currentType: z } = k;
    if (z !== 2)
      return !1;
    g(T);
    const H = T.currentPeek() === kc;
    return T.resetPeek(), H;
  }
  function C(T, k) {
    const { currentType: z } = k;
    if (z !== 7)
      return !1;
    g(T);
    const H = T.currentPeek() === ".";
    return T.resetPeek(), H;
  }
  function y(T, k) {
    const { currentType: z } = k;
    if (z !== 8)
      return !1;
    g(T);
    const H = u(T.currentPeek());
    return T.resetPeek(), H;
  }
  function E(T, k) {
    const { currentType: z } = k;
    if (!(z === 7 || z === 11))
      return !1;
    g(T);
    const H = T.currentPeek() === ":";
    return T.resetPeek(), H;
  }
  function R(T, k) {
    const { currentType: z } = k;
    if (z !== 9)
      return !1;
    const H = () => {
      const le = T.currentPeek();
      return le === "{" ? u(T.peek()) : le === "@" || le === "|" || le === ":" || le === "." || le === _n || !le ? !1 : le === Ht ? (T.peek(), H()) : W(T, !1);
    }, re = H();
    return T.resetPeek(), re;
  }
  function O(T) {
    g(T);
    const k = T.currentPeek() === "|";
    return T.resetPeek(), k;
  }
  function W(T, k = !0) {
    const z = (re = !1, le = "") => {
      const F = T.currentPeek();
      return F === "{" || F === "@" || !F ? re : F === "|" ? !(le === _n || le === Ht) : F === _n ? (T.peek(), z(!0, _n)) : F === Ht ? (T.peek(), z(!0, Ht)) : !0;
    }, H = z();
    return k && T.resetPeek(), H;
  }
  function _(T, k) {
    const z = T.currentChar();
    return z === Xn ? Xn : k(z) ? (T.next(), z) : null;
  }
  function V(T) {
    const k = T.charCodeAt(0);
    return k >= 97 && k <= 122 || // a-z
    k >= 65 && k <= 90 || // A-Z
    k >= 48 && k <= 57 || // 0-9
    k === 95 || // _
    k === 36;
  }
  function B(T) {
    return _(T, V);
  }
  function M(T) {
    const k = T.charCodeAt(0);
    return k >= 97 && k <= 122 || // a-z
    k >= 65 && k <= 90 || // A-Z
    k >= 48 && k <= 57 || // 0-9
    k === 95 || // _
    k === 36 || // $
    k === 45;
  }
  function G(T) {
    return _(T, M);
  }
  function U(T) {
    const k = T.charCodeAt(0);
    return k >= 48 && k <= 57;
  }
  function Q(T) {
    return _(T, U);
  }
  function oe(T) {
    const k = T.charCodeAt(0);
    return k >= 48 && k <= 57 || // 0-9
    k >= 65 && k <= 70 || // A-F
    k >= 97 && k <= 102;
  }
  function ne(T) {
    return _(T, oe);
  }
  function X(T) {
    let k = "", z = "";
    for (; k = Q(T); )
      z += k;
    return z;
  }
  function j(T) {
    let k = "";
    for (; ; ) {
      const z = T.currentChar();
      if (z === "{" || z === "}" || z === "@" || z === "|" || !z)
        break;
      if (z === _n || z === Ht)
        if (W(T))
          k += z, T.next();
        else {
          if (O(T))
            break;
          k += z, T.next();
        }
      else
        k += z, T.next();
    }
    return k;
  }
  function Z(T) {
    m(T);
    let k = "", z = "";
    for (; k = G(T); )
      z += k;
    const H = T.currentChar();
    if (H && H !== "}" && H !== Xn && H !== _n && H !== Ht && H !== "　") {
      const re = ge(T);
      return h(ot.INVALID_TOKEN_IN_PLACEHOLDER, i(), 0, z + re), z + re;
    }
    return T.currentChar() === Xn && h(ot.UNTERMINATED_CLOSING_BRACE, i(), 0), z;
  }
  function te(T) {
    m(T);
    let k = "";
    return T.currentChar() === "-" ? (T.next(), k += `-${X(T)}`) : k += X(T), T.currentChar() === Xn && h(ot.UNTERMINATED_CLOSING_BRACE, i(), 0), k;
  }
  function fe(T) {
    return T !== kc && T !== Ht;
  }
  function he(T) {
    m(T), f(T, "'");
    let k = "", z = "";
    for (; k = _(T, fe); )
      k === "\\" ? z += ve(T) : z += k;
    const H = T.currentChar();
    return H === Ht || H === Xn ? (h(ot.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, i(), 0), H === Ht && (T.next(), f(T, "'")), z) : (f(T, "'"), z);
  }
  function ve(T) {
    const k = T.currentChar();
    switch (k) {
      case "\\":
      case "'":
        return T.next(), `\\${k}`;
      case "u":
        return ye(T, k, 4);
      case "U":
        return ye(T, k, 6);
      default:
        return h(ot.UNKNOWN_ESCAPE_SEQUENCE, i(), 0, k), "";
    }
  }
  function ye(T, k, z) {
    f(T, k);
    let H = "";
    for (let re = 0; re < z; re++) {
      const le = ne(T);
      if (!le) {
        h(ot.INVALID_UNICODE_ESCAPE_SEQUENCE, i(), 0, `\\${k}${H}${T.currentChar()}`);
        break;
      }
      H += le;
    }
    return `\\${k}${H}`;
  }
  function J(T) {
    return T !== "{" && T !== "}" && T !== _n && T !== Ht;
  }
  function ge(T) {
    m(T);
    let k = "", z = "";
    for (; k = _(T, J); )
      z += k;
    return z;
  }
  function Ee(T) {
    let k = "", z = "";
    for (; k = B(T); )
      z += k;
    return z;
  }
  function xe(T) {
    const k = (z) => {
      const H = T.currentChar();
      return H === "{" || H === "@" || H === "|" || H === "(" || H === ")" || !H || H === _n ? z : (z += H, T.next(), k(z));
    };
    return k("");
  }
  function Te(T) {
    m(T);
    const k = f(
      T,
      "|"
      /* TokenChars.Pipe */
    );
    return m(T), k;
  }
  function Re(T, k) {
    let z = null;
    switch (T.currentChar()) {
      case "{":
        return k.braceNest >= 1 && h(ot.NOT_ALLOW_NEST_PLACEHOLDER, i(), 0), T.next(), z = p(
          k,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), m(T), k.braceNest++, z;
      case "}":
        return k.braceNest > 0 && k.currentType === 2 && h(ot.EMPTY_PLACEHOLDER, i(), 0), T.next(), z = p(
          k,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), k.braceNest--, k.braceNest > 0 && m(T), k.inLinked && k.braceNest === 0 && (k.inLinked = !1), z;
      case "@":
        return k.braceNest > 0 && h(ot.UNTERMINATED_CLOSING_BRACE, i(), 0), z = Le(T, k) || v(k), k.braceNest = 0, z;
      default: {
        let re = !0, le = !0, F = !0;
        if (O(T))
          return k.braceNest > 0 && h(ot.UNTERMINATED_CLOSING_BRACE, i(), 0), z = p(k, 1, Te(T)), k.braceNest = 0, k.inLinked = !1, z;
        if (k.braceNest > 0 && (k.currentType === 4 || k.currentType === 5 || k.currentType === 6))
          return h(ot.UNTERMINATED_CLOSING_BRACE, i(), 0), k.braceNest = 0, Fe(T, k);
        if (re = $(T, k))
          return z = p(k, 4, Z(T)), m(T), z;
        if (le = b(T, k))
          return z = p(k, 5, te(T)), m(T), z;
        if (F = S(T, k))
          return z = p(k, 6, he(T)), m(T), z;
        if (!re && !le && !F)
          return z = p(k, 12, ge(T)), h(ot.INVALID_TOKEN_IN_PLACEHOLDER, i(), 0, z.value), m(T), z;
        break;
      }
    }
    return z;
  }
  function Le(T, k) {
    const { currentType: z } = k;
    let H = null;
    const re = T.currentChar();
    switch ((z === 7 || z === 8 || z === 11 || z === 9) && (re === Ht || re === _n) && h(ot.INVALID_LINKED_FORMAT, i(), 0), re) {
      case "@":
        return T.next(), H = p(
          k,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), k.inLinked = !0, H;
      case ".":
        return m(T), T.next(), p(
          k,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return m(T), T.next(), p(
          k,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return O(T) ? (H = p(k, 1, Te(T)), k.braceNest = 0, k.inLinked = !1, H) : C(T, k) || E(T, k) ? (m(T), Le(T, k)) : y(T, k) ? (m(T), p(k, 11, Ee(T))) : R(T, k) ? (m(T), re === "{" ? Re(T, k) || H : p(k, 10, xe(T))) : (z === 7 && h(ot.INVALID_LINKED_FORMAT, i(), 0), k.braceNest = 0, k.inLinked = !1, Fe(T, k));
    }
  }
  function Fe(T, k) {
    let z = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (k.braceNest > 0)
      return Re(T, k) || v(k);
    if (k.inLinked)
      return Le(T, k) || v(k);
    switch (T.currentChar()) {
      case "{":
        return Re(T, k) || v(k);
      case "}":
        return h(ot.UNBALANCED_CLOSING_BRACE, i(), 0), T.next(), p(
          k,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return Le(T, k) || v(k);
      default: {
        if (O(T))
          return z = p(k, 1, Te(T)), k.braceNest = 0, k.inLinked = !1, z;
        if (W(T))
          return p(k, 0, j(T));
        break;
      }
    }
    return z;
  }
  function de() {
    const { currentType: T, offset: k, startLoc: z, endLoc: H } = s;
    return s.lastType = T, s.lastOffset = k, s.lastStartLoc = z, s.lastEndLoc = H, s.offset = r(), s.startLoc = i(), o.currentChar() === Xn ? p(
      s,
      13
      /* TokenTypes.EOF */
    ) : Fe(o, s);
  }
  return {
    nextToken: de,
    currentOffset: r,
    currentPosition: i,
    context: d
  };
}
const Am = "parser", Bm = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Lm(e, t, n) {
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
function Dm(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function o(u, w, $, b, ...S) {
    const C = u.currentPosition();
    if (C.offset += b, C.column += b, n) {
      const y = t ? Us($, C) : null, E = nl(w, y, {
        domain: Am,
        args: S
      });
      n(E);
    }
  }
  function r(u, w, $) {
    const b = { type: u };
    return t && (b.start = w, b.end = w, b.loc = { start: $, end: $ }), b;
  }
  function i(u, w, $, b) {
    t && (u.end = w, u.loc && (u.loc.end = $));
  }
  function l(u, w) {
    const $ = u.context(), b = r(3, $.offset, $.startLoc);
    return b.value = w, i(b, u.currentOffset(), u.currentPosition()), b;
  }
  function a(u, w) {
    const $ = u.context(), { lastOffset: b, lastStartLoc: S } = $, C = r(5, b, S);
    return C.index = parseInt(w, 10), u.nextToken(), i(C, u.currentOffset(), u.currentPosition()), C;
  }
  function s(u, w) {
    const $ = u.context(), { lastOffset: b, lastStartLoc: S } = $, C = r(4, b, S);
    return C.key = w, u.nextToken(), i(C, u.currentOffset(), u.currentPosition()), C;
  }
  function d(u, w) {
    const $ = u.context(), { lastOffset: b, lastStartLoc: S } = $, C = r(9, b, S);
    return C.value = w.replace(Bm, Lm), u.nextToken(), i(C, u.currentOffset(), u.currentPosition()), C;
  }
  function c(u) {
    const w = u.nextToken(), $ = u.context(), { lastOffset: b, lastStartLoc: S } = $, C = r(8, b, S);
    return w.type !== 11 ? (o(u, ot.UNEXPECTED_EMPTY_LINKED_MODIFIER, $.lastStartLoc, 0), C.value = "", i(C, b, S), {
      nextConsumeToken: w,
      node: C
    }) : (w.value == null && o(u, ot.UNEXPECTED_LEXICAL_ANALYSIS, $.lastStartLoc, 0, En(w)), C.value = w.value || "", i(C, u.currentOffset(), u.currentPosition()), {
      node: C
    });
  }
  function h(u, w) {
    const $ = u.context(), b = r(7, $.offset, $.startLoc);
    return b.value = w, i(b, u.currentOffset(), u.currentPosition()), b;
  }
  function p(u) {
    const w = u.context(), $ = r(6, w.offset, w.startLoc);
    let b = u.nextToken();
    if (b.type === 8) {
      const S = c(u);
      $.modifier = S.node, b = S.nextConsumeToken || u.nextToken();
    }
    switch (b.type !== 9 && o(u, ot.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, En(b)), b = u.nextToken(), b.type === 2 && (b = u.nextToken()), b.type) {
      case 10:
        b.value == null && o(u, ot.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, En(b)), $.key = h(u, b.value || "");
        break;
      case 4:
        b.value == null && o(u, ot.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, En(b)), $.key = s(u, b.value || "");
        break;
      case 5:
        b.value == null && o(u, ot.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, En(b)), $.key = a(u, b.value || "");
        break;
      case 6:
        b.value == null && o(u, ot.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, En(b)), $.key = d(u, b.value || "");
        break;
      default: {
        o(u, ot.UNEXPECTED_EMPTY_LINKED_KEY, w.lastStartLoc, 0);
        const S = u.context(), C = r(7, S.offset, S.startLoc);
        return C.value = "", i(C, S.offset, S.startLoc), $.key = C, i($, S.offset, S.startLoc), {
          nextConsumeToken: b,
          node: $
        };
      }
    }
    return i($, u.currentOffset(), u.currentPosition()), {
      node: $
    };
  }
  function v(u) {
    const w = u.context(), $ = w.currentType === 1 ? u.currentOffset() : w.offset, b = w.currentType === 1 ? w.endLoc : w.startLoc, S = r(2, $, b);
    S.items = [];
    let C = null;
    do {
      const R = C || u.nextToken();
      switch (C = null, R.type) {
        case 0:
          R.value == null && o(u, ot.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, En(R)), S.items.push(l(u, R.value || ""));
          break;
        case 5:
          R.value == null && o(u, ot.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, En(R)), S.items.push(a(u, R.value || ""));
          break;
        case 4:
          R.value == null && o(u, ot.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, En(R)), S.items.push(s(u, R.value || ""));
          break;
        case 6:
          R.value == null && o(u, ot.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, En(R)), S.items.push(d(u, R.value || ""));
          break;
        case 7: {
          const O = p(u);
          S.items.push(O.node), C = O.nextConsumeToken || null;
          break;
        }
      }
    } while (w.currentType !== 13 && w.currentType !== 1);
    const y = w.currentType === 1 ? w.lastOffset : u.currentOffset(), E = w.currentType === 1 ? w.lastEndLoc : u.currentPosition();
    return i(S, y, E), S;
  }
  function f(u, w, $, b) {
    const S = u.context();
    let C = b.items.length === 0;
    const y = r(1, w, $);
    y.cases = [], y.cases.push(b);
    do {
      const E = v(u);
      C || (C = E.items.length === 0), y.cases.push(E);
    } while (S.currentType !== 13);
    return C && o(u, ot.MUST_HAVE_MESSAGES_IN_PLURAL, $, 0), i(y, u.currentOffset(), u.currentPosition()), y;
  }
  function g(u) {
    const w = u.context(), { offset: $, startLoc: b } = w, S = v(u);
    return w.currentType === 13 ? S : f(u, $, b, S);
  }
  function m(u) {
    const w = Vm(u, At({}, e)), $ = w.context(), b = r(0, $.offset, $.startLoc);
    return t && b.loc && (b.loc.source = u), b.body = g(w), e.onCacheKey && (b.cacheKey = e.onCacheKey(u)), $.currentType !== 13 && o(w, ot.UNEXPECTED_LEXICAL_ANALYSIS, $.lastStartLoc, 0, u[$.offset] || ""), i(b, w.currentOffset(), w.currentPosition()), b;
  }
  return { parse: m };
}
function En(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function Nm(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (i) => (n.helpers.add(i), i) };
}
function Pc(e, t) {
  for (let n = 0; n < e.length; n++)
    _d(e[n], t);
}
function _d(e, t) {
  switch (e.type) {
    case 1:
      Pc(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Pc(e.items, t);
      break;
    case 6: {
      _d(e.key, t), t.helper(
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
function Hm(e, t = {}) {
  const n = Nm(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && _d(e.body, n);
  const o = n.context();
  e.helpers = Array.from(o.helpers);
}
function jm(e) {
  const t = e.body;
  return t.type === 2 ? Tc(t) : t.cases.forEach((n) => Tc(n)), e;
}
function Tc(e) {
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
      e.static = Td(t);
      for (let n = 0; n < e.items.length; n++) {
        const o = e.items[n];
        (o.type === 3 || o.type === 9) && delete o.value;
      }
    }
  }
}
function mr(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      mr(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let o = 0; o < n.length; o++)
        mr(n[o]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let o = 0; o < n.length; o++)
        mr(n[o]);
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
      mr(t.key), t.k = t.key, delete t.key, t.modifier && (mr(t.modifier), t.m = t.modifier, delete t.modifier);
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
function Wm(e, t) {
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
  function s(g, m) {
    l.code += g;
  }
  function d(g, m = !0) {
    const u = m ? o : "";
    s(r ? u + "  ".repeat(g) : u);
  }
  function c(g = !0) {
    const m = ++l.indentLevel;
    g && d(m);
  }
  function h(g = !0) {
    const m = --l.indentLevel;
    g && d(m);
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
    helper: (g) => `_${g}`,
    needIndent: () => l.needIndent
  };
}
function Um(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), Cr(e, t.key), t.modifier ? (e.push(", "), Cr(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function Km(e, t) {
  const { helper: n, needIndent: o } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(o());
  const r = t.items.length;
  for (let i = 0; i < r && (Cr(e, t.items[i]), i !== r - 1); i++)
    e.push(", ");
  e.deindent(o()), e.push("])");
}
function qm(e, t) {
  const { helper: n, needIndent: o } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(o());
    const r = t.cases.length;
    for (let i = 0; i < r && (Cr(e, t.cases[i]), i !== r - 1); i++)
      e.push(", ");
    e.deindent(o()), e.push("])");
  }
}
function Gm(e, t) {
  t.body ? Cr(e, t.body) : e.push("null");
}
function Cr(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Gm(e, t);
      break;
    case 1:
      qm(e, t);
      break;
    case 2:
      Km(e, t);
      break;
    case 6:
      Um(e, t);
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
const Xm = (e, t = {}) => {
  const n = $e(t.mode) ? t.mode : "normal", o = $e(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const r = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, i = t.needIndent ? t.needIndent : n !== "arrow", l = e.helpers || [], a = Wm(e, {
    filename: o,
    breakLineCode: r,
    needIndent: i
  });
  a.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), a.indent(i), l.length > 0 && (a.push(`const { ${Td(l.map((c) => `${c}: _${c}`), ", ")} } = ctx`), a.newline()), a.push("return "), Cr(a, e), a.deindent(i), a.push("}"), delete e.helpers;
  const { code: s, map: d } = a.context();
  return {
    ast: e,
    code: s,
    map: d ? d.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Ym(e, t = {}) {
  const n = At({}, t), o = !!n.jit, r = !!n.minify, i = n.optimize == null ? !0 : n.optimize, a = Dm(n).parse(e);
  return o ? (i && jm(a), r && mr(a), { ast: a, code: "" }) : (Hm(a, n), Xm(a, n));
}
/*!
  * core-base v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Zm() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (jo().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (jo().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Nn(e) {
  return et(e) && Ed(e) === 0 && (Sn(e, "b") || Sn(e, "body"));
}
const hp = ["b", "body"];
function Jm(e) {
  return Eo(e, hp);
}
const pp = ["c", "cases"];
function Qm(e) {
  return Eo(e, pp, []);
}
const vp = ["s", "static"];
function eb(e) {
  return Eo(e, vp);
}
const gp = ["i", "items"];
function tb(e) {
  return Eo(e, gp, []);
}
const mp = ["t", "type"];
function Ed(e) {
  return Eo(e, mp);
}
const bp = ["v", "value"];
function Bi(e, t) {
  const n = Eo(e, bp);
  if (n != null)
    return n;
  throw gi(t);
}
const wp = ["m", "modifier"];
function nb(e) {
  return Eo(e, wp);
}
const yp = ["k", "key"];
function ob(e) {
  const t = Eo(e, yp);
  if (t)
    return t;
  throw gi(
    6
    /* NodeTypes.Linked */
  );
}
function Eo(e, t, n) {
  for (let o = 0; o < t.length; o++) {
    const r = t[o];
    if (Sn(e, r) && e[r] != null)
      return e[r];
  }
  return n;
}
const xp = [
  ...hp,
  ...pp,
  ...vp,
  ...gp,
  ...yp,
  ...wp,
  ...bp,
  ...mp
];
function gi(e) {
  return new Error(`unhandled node type: ${e}`);
}
function Tl(e) {
  return (n) => rb(n, e);
}
function rb(e, t) {
  const n = Jm(t);
  if (n == null)
    throw gi(
      0
      /* NodeTypes.Resource */
    );
  if (Ed(n) === 1) {
    const i = Qm(n);
    return e.plural(i.reduce((l, a) => [
      ...l,
      _c(e, a)
    ], []));
  } else
    return _c(e, n);
}
function _c(e, t) {
  const n = eb(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const o = tb(t).reduce((r, i) => [...r, Ks(e, i)], []);
    return e.normalize(o);
  }
}
function Ks(e, t) {
  const n = Ed(t);
  switch (n) {
    case 3:
      return Bi(t, n);
    case 9:
      return Bi(t, n);
    case 4: {
      const o = t;
      if (Sn(o, "k") && o.k)
        return e.interpolate(e.named(o.k));
      if (Sn(o, "key") && o.key)
        return e.interpolate(e.named(o.key));
      throw gi(n);
    }
    case 5: {
      const o = t;
      if (Sn(o, "i") && Vt(o.i))
        return e.interpolate(e.list(o.i));
      if (Sn(o, "index") && Vt(o.index))
        return e.interpolate(e.list(o.index));
      throw gi(n);
    }
    case 6: {
      const o = t, r = nb(o), i = ob(o);
      return e.linked(Ks(e, i), r ? Ks(e, r) : void 0, e.type);
    }
    case 7:
      return Bi(t, n);
    case 8:
      return Bi(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const ib = (e) => e;
let Li = dt();
function ab(e, t = {}) {
  let n = !1;
  const o = t.onError || _m;
  return t.onError = (r) => {
    n = !0, o(r);
  }, { ...Ym(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function lb(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && $e(e)) {
    Pt(t.warnHtmlMessage) && t.warnHtmlMessage;
    const o = (t.onCacheKey || ib)(e), r = Li[o];
    if (r)
      return r;
    const { ast: i, detectError: l } = ab(e, {
      ...t,
      location: !1,
      jit: !0
    }), a = Tl(i);
    return l ? a : Li[o] = a;
  } else {
    const n = e.cacheKey;
    if (n) {
      const o = Li[n];
      return o || (Li[n] = Tl(e));
    } else
      return Tl(e);
  }
}
let mi = null;
function sb(e) {
  mi = e;
}
function db(e, t, n) {
  mi && mi.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const cb = /* @__PURE__ */ ub("function:translate");
function ub(e) {
  return (t) => mi && mi.emit(e, t);
}
const oo = {
  INVALID_ARGUMENT: Tm,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, fb = 24;
function ro(e) {
  return nl(e, null, void 0);
}
function zd(e, t) {
  return t.locale != null ? Ec(t.locale) : Ec(e.locale);
}
let _l;
function Ec(e) {
  if ($e(e))
    return e;
  if (Ct(e)) {
    if (e.resolvedOnce && _l != null)
      return _l;
    if (e.constructor.name === "Function") {
      const t = e();
      if (Rm(t))
        throw ro(oo.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return _l = t;
    } else
      throw ro(oo.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw ro(oo.NOT_SUPPORT_LOCALE_TYPE);
}
function hb(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...Tt(t) ? t : et(t) ? Object.keys(t) : $e(t) ? [t] : [n]
  ])];
}
function Cp(e, t, n) {
  const o = $e(n) ? n : ja, r = e;
  r.__localeChainCache || (r.__localeChainCache = /* @__PURE__ */ new Map());
  let i = r.__localeChainCache.get(o);
  if (!i) {
    i = [];
    let l = [n];
    for (; Tt(l); )
      l = zc(i, l, t);
    const a = Tt(t) || !Qe(t) ? t : t.default ? t.default : null;
    l = $e(a) ? [a] : a, Tt(l) && zc(i, l, !1), r.__localeChainCache.set(o, i);
  }
  return i;
}
function zc(e, t, n) {
  let o = !0;
  for (let r = 0; r < t.length && Pt(o); r++) {
    const i = t[r];
    $e(i) && (o = pb(e, t[r], n));
  }
  return o;
}
function pb(e, t, n) {
  let o;
  const r = t.split("-");
  do {
    const i = r.join("-");
    o = vb(e, i, n), r.splice(-1, 1);
  } while (r.length && o === !0);
  return o;
}
function vb(e, t, n) {
  let o = !1;
  if (!e.includes(t) && (o = !0, t)) {
    o = t[t.length - 1] !== "!";
    const r = t.replace(/!/g, "");
    e.push(r), (Tt(n) || Qe(n)) && n[r] && (o = n[r]);
  }
  return o;
}
const zo = [];
zo[
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
zo[
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
zo[
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
zo[
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
zo[
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
zo[
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
zo[
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
const gb = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function mb(e) {
  return gb.test(e);
}
function bb(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function wb(e) {
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
function yb(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : mb(t) ? bb(t) : "*" + t;
}
function xb(e) {
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
      if (r = 0, l === void 0 || (l = yb(l), l === !1))
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
      if (s = wb(i), h = zo[o], d = h[s] || h.l || 8, d === 8 || (o = d[0], d[1] !== void 0 && (c = p[d[1]], c && (a = i, c() === !1))))
        return;
      if (o === 7)
        return t;
    }
}
const Fc = /* @__PURE__ */ new Map();
function Cb(e, t) {
  return et(e) ? e[t] : null;
}
function Sb(e, t) {
  if (!et(e))
    return null;
  let n = Fc.get(t);
  if (n || (n = xb(t), n && Fc.set(t, n)), !n)
    return null;
  const o = n.length;
  let r = e, i = 0;
  for (; i < o; ) {
    const l = n[i];
    if (xp.includes(l) && Nn(r))
      return null;
    const a = r[l];
    if (a === void 0 || Ct(r))
      return null;
    r = a, i++;
  }
  return r;
}
const $b = "11.1.12", ol = -1, ja = "en-US", Oc = "", Mc = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Rb() {
  return {
    upper: (e, t) => t === "text" && $e(e) ? e.toUpperCase() : t === "vnode" && et(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && $e(e) ? e.toLowerCase() : t === "vnode" && et(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && $e(e) ? Mc(e) : t === "vnode" && et(e) && "__v_isVNode" in e ? Mc(e.children) : e
  };
}
let Sp;
function kb(e) {
  Sp = e;
}
let $p;
function Pb(e) {
  $p = e;
}
let Rp;
function Tb(e) {
  Rp = e;
}
let kp = null;
const _b = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  kp = e;
}, Eb = /* @__NO_SIDE_EFFECTS__ */ () => kp;
let Pp = null;
const Ic = (e) => {
  Pp = e;
}, zb = () => Pp;
let Vc = 0;
function Fb(e = {}) {
  const t = Ct(e.onWarn) ? e.onWarn : bm, n = $e(e.version) ? e.version : $b, o = $e(e.locale) || Ct(e.locale) ? e.locale : ja, r = Ct(o) ? ja : o, i = Tt(e.fallbackLocale) || Qe(e.fallbackLocale) || $e(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : r, l = Qe(e.messages) ? e.messages : El(r), a = Qe(e.datetimeFormats) ? e.datetimeFormats : El(r), s = Qe(e.numberFormats) ? e.numberFormats : El(r), d = At(dt(), e.modifiers, Rb()), c = e.pluralRules || dt(), h = Ct(e.missing) ? e.missing : null, p = Pt(e.missingWarn) || Ha(e.missingWarn) ? e.missingWarn : !0, v = Pt(e.fallbackWarn) || Ha(e.fallbackWarn) ? e.fallbackWarn : !0, f = !!e.fallbackFormat, g = !!e.unresolving, m = Ct(e.postTranslation) ? e.postTranslation : null, u = Qe(e.processor) ? e.processor : null, w = Pt(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, $ = !!e.escapeParameter, b = Ct(e.messageCompiler) ? e.messageCompiler : Sp, S = Ct(e.messageResolver) ? e.messageResolver : $p || Cb, C = Ct(e.localeFallbacker) ? e.localeFallbacker : Rp || hb, y = et(e.fallbackContext) ? e.fallbackContext : void 0, E = e, R = et(E.__datetimeFormatters) ? E.__datetimeFormatters : /* @__PURE__ */ new Map(), O = et(E.__numberFormatters) ? E.__numberFormatters : /* @__PURE__ */ new Map(), W = et(E.__meta) ? E.__meta : {};
  Vc++;
  const _ = {
    version: n,
    cid: Vc,
    locale: o,
    fallbackLocale: i,
    messages: l,
    modifiers: d,
    pluralRules: c,
    missing: h,
    missingWarn: p,
    fallbackWarn: v,
    fallbackFormat: f,
    unresolving: g,
    postTranslation: m,
    processor: u,
    warnHtmlMessage: w,
    escapeParameter: $,
    messageCompiler: b,
    messageResolver: S,
    localeFallbacker: C,
    fallbackContext: y,
    onWarn: t,
    __meta: W
  };
  return _.datetimeFormats = a, _.numberFormats = s, _.__datetimeFormatters = R, _.__numberFormatters = O, __INTLIFY_PROD_DEVTOOLS__ && db(_, n, W), _;
}
const El = (e) => ({ [e]: dt() });
function Fd(e, t, n, o, r) {
  const { missing: i, onWarn: l } = e;
  if (i !== null) {
    const a = i(e, n, t, r);
    return $e(a) ? a : t;
  } else
    return t;
}
function Lr(e, t, n) {
  const o = e;
  o.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function Ob(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function Mb(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let o = n + 1; o < t.length; o++)
    if (Ob(e, t[o]))
      return !0;
  return !1;
}
function Ac(e, ...t) {
  const { datetimeFormats: n, unresolving: o, fallbackLocale: r, onWarn: i, localeFallbacker: l } = e, { __datetimeFormatters: a } = e, [s, d, c, h] = qs(...t), p = Pt(c.missingWarn) ? c.missingWarn : e.missingWarn;
  Pt(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const v = !!c.part, f = zd(e, c), g = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    f
  );
  if (!$e(s) || s === "")
    return new Intl.DateTimeFormat(f, h).format(d);
  let m = {}, u, w = null;
  const $ = "datetime format";
  for (let C = 0; C < g.length && (u = g[C], m = n[u] || {}, w = m[s], !Qe(w)); C++)
    Fd(e, s, u, p, $);
  if (!Qe(w) || !$e(u))
    return o ? ol : s;
  let b = `${u}__${s}`;
  tl(h) || (b = `${b}__${JSON.stringify(h)}`);
  let S = a.get(b);
  return S || (S = new Intl.DateTimeFormat(u, At({}, w, h)), a.set(b, S)), v ? S.formatToParts(d) : S.format(d);
}
const Tp = [
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
function qs(...e) {
  const [t, n, o, r] = e, i = dt();
  let l = dt(), a;
  if ($e(t)) {
    const s = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!s)
      throw ro(oo.INVALID_ISO_DATE_ARGUMENT);
    const d = s[3] ? s[3].trim().startsWith("T") ? `${s[1].trim()}${s[3].trim()}` : `${s[1].trim()}T${s[3].trim()}` : s[1].trim();
    a = new Date(d);
    try {
      a.toISOString();
    } catch {
      throw ro(oo.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (xm(t)) {
    if (isNaN(t.getTime()))
      throw ro(oo.INVALID_DATE_ARGUMENT);
    a = t;
  } else if (Vt(t))
    a = t;
  else
    throw ro(oo.INVALID_ARGUMENT);
  return $e(n) ? i.key = n : Qe(n) && Object.keys(n).forEach((s) => {
    Tp.includes(s) ? l[s] = n[s] : i[s] = n[s];
  }), $e(o) ? i.locale = o : Qe(o) && (l = o), Qe(r) && (l = r), [i.key || "", a, i, l];
}
function Bc(e, t, n) {
  const o = e;
  for (const r in n) {
    const i = `${t}__${r}`;
    o.__datetimeFormatters.has(i) && o.__datetimeFormatters.delete(i);
  }
}
function Lc(e, ...t) {
  const { numberFormats: n, unresolving: o, fallbackLocale: r, onWarn: i, localeFallbacker: l } = e, { __numberFormatters: a } = e, [s, d, c, h] = Gs(...t), p = Pt(c.missingWarn) ? c.missingWarn : e.missingWarn;
  Pt(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const v = !!c.part, f = zd(e, c), g = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    f
  );
  if (!$e(s) || s === "")
    return new Intl.NumberFormat(f, h).format(d);
  let m = {}, u, w = null;
  const $ = "number format";
  for (let C = 0; C < g.length && (u = g[C], m = n[u] || {}, w = m[s], !Qe(w)); C++)
    Fd(e, s, u, p, $);
  if (!Qe(w) || !$e(u))
    return o ? ol : s;
  let b = `${u}__${s}`;
  tl(h) || (b = `${b}__${JSON.stringify(h)}`);
  let S = a.get(b);
  return S || (S = new Intl.NumberFormat(u, At({}, w, h)), a.set(b, S)), v ? S.formatToParts(d) : S.format(d);
}
const _p = [
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
function Gs(...e) {
  const [t, n, o, r] = e, i = dt();
  let l = dt();
  if (!Vt(t))
    throw ro(oo.INVALID_ARGUMENT);
  const a = t;
  return $e(n) ? i.key = n : Qe(n) && Object.keys(n).forEach((s) => {
    _p.includes(s) ? l[s] = n[s] : i[s] = n[s];
  }), $e(o) ? i.locale = o : Qe(o) && (l = o), Qe(r) && (l = r), [i.key || "", a, i, l];
}
function Dc(e, t, n) {
  const o = e;
  for (const r in n) {
    const i = `${t}__${r}`;
    o.__numberFormatters.has(i) && o.__numberFormatters.delete(i);
  }
}
const Ib = (e) => e, Vb = (e) => "", Ab = "text", Bb = (e) => e.length === 0 ? "" : Td(e), Lb = km;
function Nc(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function Db(e) {
  const t = Vt(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (Vt(e.named.count) || Vt(e.named.n)) ? Vt(e.named.count) ? e.named.count : Vt(e.named.n) ? e.named.n : t : t;
}
function Nb(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function Hb(e = {}) {
  const t = e.locale, n = Db(e), o = et(e.pluralRules) && $e(t) && Ct(e.pluralRules[t]) ? e.pluralRules[t] : Nc, r = et(e.pluralRules) && $e(t) && Ct(e.pluralRules[t]) ? Nc : void 0, i = (u) => u[o(n, u.length, r)], l = e.list || [], a = (u) => l[u], s = e.named || dt();
  Vt(e.pluralIndex) && Nb(n, s);
  const d = (u) => s[u];
  function c(u, w) {
    const $ = Ct(e.messages) ? e.messages(u, !!w) : et(e.messages) ? e.messages[u] : !1;
    return $ || (e.parent ? e.parent.message(u) : Vb);
  }
  const h = (u) => e.modifiers ? e.modifiers[u] : Ib, p = Qe(e.processor) && Ct(e.processor.normalize) ? e.processor.normalize : Bb, v = Qe(e.processor) && Ct(e.processor.interpolate) ? e.processor.interpolate : Lb, f = Qe(e.processor) && $e(e.processor.type) ? e.processor.type : Ab, m = {
    list: a,
    named: d,
    plural: i,
    linked: (u, ...w) => {
      const [$, b] = w;
      let S = "text", C = "";
      w.length === 1 ? et($) ? (C = $.modifier || C, S = $.type || S) : $e($) && (C = $ || C) : w.length === 2 && ($e($) && (C = $ || C), $e(b) && (S = b || S));
      const y = c(u, !0)(m), E = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        S === "vnode" && Tt(y) && C ? y[0] : y
      );
      return C ? h(C)(E, S) : E;
    },
    message: c,
    type: f,
    interpolate: v,
    normalize: p,
    values: At(dt(), l, s)
  };
  return m;
}
const Hc = () => "", fn = (e) => Ct(e);
function jc(e, ...t) {
  const { fallbackFormat: n, postTranslation: o, unresolving: r, messageCompiler: i, fallbackLocale: l, messages: a } = e, [s, d] = Xs(...t), c = Pt(d.missingWarn) ? d.missingWarn : e.missingWarn, h = Pt(d.fallbackWarn) ? d.fallbackWarn : e.fallbackWarn, p = Pt(d.escapeParameter) ? d.escapeParameter : e.escapeParameter, v = !!d.resolvedMessage, f = $e(d.default) || Pt(d.default) ? Pt(d.default) ? i ? s : () => s : d.default : n ? i ? s : () => s : null, g = n || f != null && ($e(f) || Ct(f)), m = zd(e, d);
  p && jb(d);
  let [u, w, $] = v ? [
    s,
    m,
    a[m] || dt()
  ] : Ep(e, s, m, l, h, c), b = u, S = s;
  if (!v && !($e(b) || Nn(b) || fn(b)) && g && (b = f, S = b), !v && (!($e(b) || Nn(b) || fn(b)) || !$e(w)))
    return r ? ol : s;
  let C = !1;
  const y = () => {
    C = !0;
  }, E = fn(b) ? b : zp(e, s, w, b, S, y);
  if (C)
    return b;
  const R = Kb(e, w, $, d), O = Hb(R), W = Wb(e, E, O);
  let _ = o ? o(W, s) : W;
  if (p && $e(_) && (_ = Sm(_)), __INTLIFY_PROD_DEVTOOLS__) {
    const V = {
      timestamp: Date.now(),
      key: $e(s) ? s : fn(b) ? b.key : "",
      locale: w || (fn(b) ? b.locale : ""),
      format: $e(b) ? b : fn(b) ? b.source : "",
      message: _
    };
    V.meta = At({}, e.__meta, /* @__PURE__ */ Eb() || {}), cb(V);
  }
  return _;
}
function jb(e) {
  Tt(e.list) ? e.list = e.list.map((t) => $e(t) ? $c(t) : t) : et(e.named) && Object.keys(e.named).forEach((t) => {
    $e(e.named[t]) && (e.named[t] = $c(e.named[t]));
  });
}
function Ep(e, t, n, o, r, i) {
  const { messages: l, onWarn: a, messageResolver: s, localeFallbacker: d } = e, c = d(e, o, n);
  let h = dt(), p, v = null;
  const f = "translate";
  for (let g = 0; g < c.length && (p = c[g], h = l[p] || dt(), (v = s(h, t)) === null && (v = h[t]), !($e(v) || Nn(v) || fn(v))); g++)
    if (!Mb(p, c)) {
      const m = Fd(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        p,
        i,
        f
      );
      m !== t && (v = m);
    }
  return [v, p, h];
}
function zp(e, t, n, o, r, i) {
  const { messageCompiler: l, warnHtmlMessage: a } = e;
  if (fn(o)) {
    const d = o;
    return d.locale = d.locale || n, d.key = d.key || t, d;
  }
  if (l == null) {
    const d = () => o;
    return d.locale = n, d.key = t, d;
  }
  const s = l(o, Ub(e, n, r, o, a, i));
  return s.locale = n, s.key = t, s.source = o, s;
}
function Wb(e, t, n) {
  return t(n);
}
function Xs(...e) {
  const [t, n, o] = e, r = dt();
  if (!$e(t) && !Vt(t) && !fn(t) && !Nn(t))
    throw ro(oo.INVALID_ARGUMENT);
  const i = Vt(t) ? String(t) : (fn(t), t);
  return Vt(n) ? r.plural = n : $e(n) ? r.default = n : Qe(n) && !tl(n) ? r.named = n : Tt(n) && (r.list = n), Vt(o) ? r.plural = o : $e(o) ? r.default = o : Qe(o) && At(r, o), [i, r];
}
function Ub(e, t, n, o, r, i) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: r,
    onError: (l) => {
      throw i && i(l), l;
    },
    onCacheKey: (l) => wm(t, n, l)
  };
}
function Kb(e, t, n, o) {
  const { modifiers: r, pluralRules: i, messageResolver: l, fallbackLocale: a, fallbackWarn: s, missingWarn: d, fallbackContext: c } = e, p = {
    locale: t,
    modifiers: r,
    pluralRules: i,
    messages: (v, f) => {
      let g = l(n, v);
      if (g == null && (c || f)) {
        const [, , m] = Ep(
          c || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          v,
          t,
          a,
          s,
          d
        );
        g = l(m, v);
      }
      if ($e(g) || Nn(g)) {
        let m = !1;
        const w = zp(e, v, t, g, v, () => {
          m = !0;
        });
        return m ? Hc : w;
      } else return fn(g) ? g : Hc;
    }
  };
  return e.processor && (p.processor = e.processor), o.list && (p.list = o.list), o.named && (p.named = o.named), Vt(o.plural) && (p.pluralIndex = o.plural), p;
}
Zm();
/*!
  * vue-i18n v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const qb = window.Vue.createVNode, Gb = window.Vue.Text, Dr = window.Vue.computed, Wc = window.Vue.watch, Od = window.Vue.getCurrentInstance, Xb = window.Vue.ref, Yb = window.Vue.shallowRef, Fp = window.Vue.Fragment, Md = window.Vue.defineComponent, Op = window.Vue.h;
window.Vue.effectScope;
const Zb = window.Vue.inject, Jb = window.Vue.onMounted, Qb = window.Vue.onUnmounted;
window.Vue.isRef;
const ew = "11.1.12";
function tw() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (jo().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (jo().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (jo().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (jo().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const Sr = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: fb,
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
function bi(e, ...t) {
  return nl(e, null, void 0);
}
const Ys = /* @__PURE__ */ Zo("__translateVNode"), Zs = /* @__PURE__ */ Zo("__datetimeParts"), Js = /* @__PURE__ */ Zo("__numberParts"), nw = Zo("__setPluralRules"), Mp = /* @__PURE__ */ Zo("__injectWithOption"), Qs = /* @__PURE__ */ Zo("__dispose");
function wi(e) {
  if (!et(e) || Nn(e))
    return e;
  for (const t in e)
    if (Sn(e, t))
      if (!t.includes("."))
        et(e[t]) && wi(e[t]);
      else {
        const n = t.split("."), o = n.length - 1;
        let r = e, i = !1;
        for (let l = 0; l < o; l++) {
          if (n[l] === "__proto__")
            throw new Error(`unsafe key: ${n[l]}`);
          if (n[l] in r || (r[n[l]] = dt()), !et(r[n[l]])) {
            i = !0;
            break;
          }
          r = r[n[l]];
        }
        if (i || (Nn(r) ? xp.includes(n[o]) || delete e[t] : (r[n[o]] = e[t], delete e[t])), !Nn(r)) {
          const l = r[n[o]];
          et(l) && wi(l);
        }
      }
  return e;
}
function Ip(e, t) {
  const { messages: n, __i18n: o, messageResolver: r, flatJson: i } = t, l = Qe(n) ? n : Tt(o) ? dt() : { [e]: dt() };
  if (Tt(o) && o.forEach((a) => {
    if ("locale" in a && "resource" in a) {
      const { locale: s, resource: d } = a;
      s ? (l[s] = l[s] || dt(), Aa(d, l[s])) : Aa(d, l);
    } else
      $e(a) && Aa(JSON.parse(a), l);
  }), r == null && i)
    for (const a in l)
      Sn(l, a) && wi(l[a]);
  return l;
}
function Vp(e) {
  return e.type;
}
function ow(e, t, n) {
  let o = et(t.messages) ? t.messages : dt();
  "__i18nGlobal" in n && (o = Ip(e.locale.value, {
    messages: o,
    __i18n: n.__i18nGlobal
  }));
  const r = Object.keys(o);
  r.length && r.forEach((i) => {
    e.mergeLocaleMessage(i, o[i]);
  });
  {
    if (et(t.datetimeFormats)) {
      const i = Object.keys(t.datetimeFormats);
      i.length && i.forEach((l) => {
        e.mergeDateTimeFormat(l, t.datetimeFormats[l]);
      });
    }
    if (et(t.numberFormats)) {
      const i = Object.keys(t.numberFormats);
      i.length && i.forEach((l) => {
        e.mergeNumberFormat(l, t.numberFormats[l]);
      });
    }
  }
}
function Uc(e) {
  return qb(Gb, null, e, 0);
}
const Kc = "__INTLIFY_META__", qc = () => [], rw = () => !1;
let Gc = 0;
function Xc(e) {
  return (t, n, o, r) => e(n, o, Od() || void 0, r);
}
const iw = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = Od();
  let t = null;
  return e && (t = Vp(e)[Kc]) ? { [Kc]: t } : null;
};
function aw(e = {}) {
  const { __root: t, __injectWithOption: n } = e, o = t === void 0, r = e.flatJson, i = Cc ? Xb : Yb;
  let l = Pt(e.inheritLocale) ? e.inheritLocale : !0;
  const a = i(
    // prettier-ignore
    t && l ? t.locale.value : $e(e.locale) ? e.locale : ja
  ), s = i(
    // prettier-ignore
    t && l ? t.fallbackLocale.value : $e(e.fallbackLocale) || Tt(e.fallbackLocale) || Qe(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : a.value
  ), d = i(Ip(a.value, e)), c = i(Qe(e.datetimeFormats) ? e.datetimeFormats : { [a.value]: {} }), h = i(Qe(e.numberFormats) ? e.numberFormats : { [a.value]: {} });
  let p = t ? t.missingWarn : Pt(e.missingWarn) || Ha(e.missingWarn) ? e.missingWarn : !0, v = t ? t.fallbackWarn : Pt(e.fallbackWarn) || Ha(e.fallbackWarn) ? e.fallbackWarn : !0, f = t ? t.fallbackRoot : Pt(e.fallbackRoot) ? e.fallbackRoot : !0, g = !!e.fallbackFormat, m = Ct(e.missing) ? e.missing : null, u = Ct(e.missing) ? Xc(e.missing) : null, w = Ct(e.postTranslation) ? e.postTranslation : null, $ = t ? t.warnHtmlMessage : Pt(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, b = !!e.escapeParameter;
  const S = t ? t.modifiers : Qe(e.modifiers) ? e.modifiers : {};
  let C = e.pluralRules || t && t.pluralRules, y;
  y = (() => {
    o && Ic(null);
    const F = {
      version: ew,
      locale: a.value,
      fallbackLocale: s.value,
      messages: d.value,
      modifiers: S,
      pluralRules: C,
      missing: u === null ? void 0 : u,
      missingWarn: p,
      fallbackWarn: v,
      fallbackFormat: g,
      unresolving: !0,
      postTranslation: w === null ? void 0 : w,
      warnHtmlMessage: $,
      escapeParameter: b,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    F.datetimeFormats = c.value, F.numberFormats = h.value, F.__datetimeFormatters = Qe(y) ? y.__datetimeFormatters : void 0, F.__numberFormatters = Qe(y) ? y.__numberFormatters : void 0;
    const K = Fb(F);
    return o && Ic(K), K;
  })(), Lr(y, a.value, s.value);
  function R() {
    return [
      a.value,
      s.value,
      d.value,
      c.value,
      h.value
    ];
  }
  const O = Dr({
    get: () => a.value,
    set: (F) => {
      y.locale = F, a.value = F;
    }
  }), W = Dr({
    get: () => s.value,
    set: (F) => {
      y.fallbackLocale = F, s.value = F, Lr(y, a.value, F);
    }
  }), _ = Dr(() => d.value), V = /* @__PURE__ */ Dr(() => c.value), B = /* @__PURE__ */ Dr(() => h.value);
  function M() {
    return Ct(w) ? w : null;
  }
  function G(F) {
    w = F, y.postTranslation = F;
  }
  function U() {
    return m;
  }
  function Q(F) {
    F !== null && (u = Xc(F)), m = F, y.missing = u;
  }
  const oe = (F, K, be, Pe, Ke, ct) => {
    R();
    let qe;
    try {
      __INTLIFY_PROD_DEVTOOLS__, o || (y.fallbackContext = t ? zb() : void 0), qe = F(y);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, o || (y.fallbackContext = void 0);
    }
    if (be !== "translate exists" && // for not `te` (e.g `t`)
    Vt(qe) && qe === ol || be === "translate exists" && !qe) {
      const [Ge, vt] = K();
      return t && f ? Pe(t) : Ke(Ge);
    } else {
      if (ct(qe))
        return qe;
      throw bi(Sr.UNEXPECTED_RETURN_TYPE);
    }
  };
  function ne(...F) {
    return oe((K) => Reflect.apply(jc, null, [K, ...F]), () => Xs(...F), "translate", (K) => Reflect.apply(K.t, K, [...F]), (K) => K, (K) => $e(K));
  }
  function X(...F) {
    const [K, be, Pe] = F;
    if (Pe && !et(Pe))
      throw bi(Sr.INVALID_ARGUMENT);
    return ne(K, be, At({ resolvedMessage: !0 }, Pe || {}));
  }
  function j(...F) {
    return oe((K) => Reflect.apply(Ac, null, [K, ...F]), () => qs(...F), "datetime format", (K) => Reflect.apply(K.d, K, [...F]), () => Oc, (K) => $e(K) || Tt(K));
  }
  function Z(...F) {
    return oe((K) => Reflect.apply(Lc, null, [K, ...F]), () => Gs(...F), "number format", (K) => Reflect.apply(K.n, K, [...F]), () => Oc, (K) => $e(K) || Tt(K));
  }
  function te(F) {
    return F.map((K) => $e(K) || Vt(K) || Pt(K) ? Uc(String(K)) : K);
  }
  const he = {
    normalize: te,
    interpolate: (F) => F,
    type: "vnode"
  };
  function ve(...F) {
    return oe((K) => {
      let be;
      const Pe = K;
      try {
        Pe.processor = he, be = Reflect.apply(jc, null, [Pe, ...F]);
      } finally {
        Pe.processor = null;
      }
      return be;
    }, () => Xs(...F), "translate", (K) => K[Ys](...F), (K) => [Uc(K)], (K) => Tt(K));
  }
  function ye(...F) {
    return oe((K) => Reflect.apply(Lc, null, [K, ...F]), () => Gs(...F), "number format", (K) => K[Js](...F), qc, (K) => $e(K) || Tt(K));
  }
  function J(...F) {
    return oe((K) => Reflect.apply(Ac, null, [K, ...F]), () => qs(...F), "datetime format", (K) => K[Zs](...F), qc, (K) => $e(K) || Tt(K));
  }
  function ge(F) {
    C = F, y.pluralRules = C;
  }
  function Ee(F, K) {
    return oe(() => {
      if (!F)
        return !1;
      const be = $e(K) ? K : a.value, Pe = Re(be), Ke = y.messageResolver(Pe, F);
      return Nn(Ke) || fn(Ke) || $e(Ke);
    }, () => [F], "translate exists", (be) => Reflect.apply(be.te, be, [F, K]), rw, (be) => Pt(be));
  }
  function xe(F) {
    let K = null;
    const be = Cp(y, s.value, a.value);
    for (let Pe = 0; Pe < be.length; Pe++) {
      const Ke = d.value[be[Pe]] || {}, ct = y.messageResolver(Ke, F);
      if (ct != null) {
        K = ct;
        break;
      }
    }
    return K;
  }
  function Te(F) {
    const K = xe(F);
    return K ?? (t ? t.tm(F) || {} : {});
  }
  function Re(F) {
    return d.value[F] || {};
  }
  function Le(F, K) {
    if (r) {
      const be = { [F]: K };
      for (const Pe in be)
        Sn(be, Pe) && wi(be[Pe]);
      K = be[F];
    }
    d.value[F] = K, y.messages = d.value;
  }
  function Fe(F, K) {
    d.value[F] = d.value[F] || {};
    const be = { [F]: K };
    if (r)
      for (const Pe in be)
        Sn(be, Pe) && wi(be[Pe]);
    K = be[F], Aa(K, d.value[F]), y.messages = d.value;
  }
  function de(F) {
    return c.value[F] || {};
  }
  function T(F, K) {
    c.value[F] = K, y.datetimeFormats = c.value, Bc(y, F, K);
  }
  function k(F, K) {
    c.value[F] = At(c.value[F] || {}, K), y.datetimeFormats = c.value, Bc(y, F, K);
  }
  function z(F) {
    return h.value[F] || {};
  }
  function H(F, K) {
    h.value[F] = K, y.numberFormats = h.value, Dc(y, F, K);
  }
  function re(F, K) {
    h.value[F] = At(h.value[F] || {}, K), y.numberFormats = h.value, Dc(y, F, K);
  }
  Gc++, t && Cc && (Wc(t.locale, (F) => {
    l && (a.value = F, y.locale = F, Lr(y, a.value, s.value));
  }), Wc(t.fallbackLocale, (F) => {
    l && (s.value = F, y.fallbackLocale = F, Lr(y, a.value, s.value));
  }));
  const le = {
    id: Gc,
    locale: O,
    fallbackLocale: W,
    get inheritLocale() {
      return l;
    },
    set inheritLocale(F) {
      l = F, F && t && (a.value = t.locale.value, s.value = t.fallbackLocale.value, Lr(y, a.value, s.value));
    },
    get availableLocales() {
      return Object.keys(d.value).sort();
    },
    messages: _,
    get modifiers() {
      return S;
    },
    get pluralRules() {
      return C || {};
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
      return g;
    },
    set fallbackFormat(F) {
      g = F, y.fallbackFormat = g;
    },
    get warnHtmlMessage() {
      return $;
    },
    set warnHtmlMessage(F) {
      $ = F, y.warnHtmlMessage = F;
    },
    get escapeParameter() {
      return b;
    },
    set escapeParameter(F) {
      b = F, y.escapeParameter = F;
    },
    t: ne,
    getLocaleMessage: Re,
    setLocaleMessage: Le,
    mergeLocaleMessage: Fe,
    getPostTranslationHandler: M,
    setPostTranslationHandler: G,
    getMissingHandler: U,
    setMissingHandler: Q,
    [nw]: ge
  };
  return le.datetimeFormats = V, le.numberFormats = B, le.rt = X, le.te = Ee, le.tm = Te, le.d = j, le.n = Z, le.getDateTimeFormat = de, le.setDateTimeFormat = T, le.mergeDateTimeFormat = k, le.getNumberFormat = z, le.setNumberFormat = H, le.mergeNumberFormat = re, le[Mp] = n, le[Ys] = ve, le[Zs] = J, le[Js] = ye, le;
}
const Id = {
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
function lw({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((o, r) => [
    ...o,
    // prettier-ignore
    ...r.type === Fp ? r.children : [r]
  ], []) : t.reduce((n, o) => {
    const r = e[o];
    return r && (n[o] = r()), n;
  }, dt());
}
function Ap() {
  return Fp;
}
At({
  keypath: {
    type: String,
    required: !0
  },
  plural: {
    type: [Number, String],
    validator: (e) => Vt(e) || !isNaN(e)
  }
}, Id);
function sw(e) {
  return Tt(e) && !$e(e[0]);
}
function Bp(e, t, n, o) {
  const { slots: r, attrs: i } = t;
  return () => {
    const l = { part: !0 };
    let a = dt();
    e.locale && (l.locale = e.locale), $e(e.format) ? l.key = e.format : et(e.format) && ($e(e.format.key) && (l.key = e.format.key), a = Object.keys(e.format).reduce((p, v) => n.includes(v) ? At(dt(), p, { [v]: e.format[v] }) : p, dt()));
    const s = o(e.value, l, a);
    let d = [l.key];
    Tt(s) ? d = s.map((p, v) => {
      const f = r[p.type], g = f ? f({ [p.type]: p.value, index: v, parts: s }) : [p.value];
      return sw(g) && (g[0].key = `${p.type}-${v}`), g;
    }) : $e(s) && (d = [s]);
    const c = At(dt(), i), h = $e(e.tag) || et(e.tag) ? e.tag : Ap();
    return Op(h, c, d);
  };
}
At({
  value: {
    type: Number,
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, Id);
const dw = /* @__PURE__ */ Zo("global-vue-i18n");
function rl(e = {}) {
  const t = Od();
  if (t == null)
    throw bi(Sr.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw bi(Sr.NOT_INSTALLED);
  const n = cw(t), o = fw(n), r = Vp(t), i = uw(e, r);
  if (i === "global")
    return ow(o, e, r), o;
  if (i === "parent") {
    let s = hw(n, t, e.__useComponent);
    return s == null && (s = o), s;
  }
  const l = n;
  let a = l.__getInstance(t);
  if (a == null) {
    const s = At({}, e);
    "__i18n" in r && (s.__i18n = r.__i18n), o && (s.__root = o), a = aw(s), l.__composerExtend && (a[Qs] = l.__composerExtend(a)), vw(l, t, a), l.__setInstance(t, a);
  }
  return a;
}
function cw(e) {
  const t = Zb(e.isCE ? dw : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw bi(e.isCE ? Sr.NOT_INSTALLED_WITH_PROVIDE : Sr.UNEXPECTED_ERROR);
  return t;
}
function uw(e, t) {
  return tl(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function fw(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function hw(e, t, n = !1) {
  let o = null;
  const r = t.root;
  let i = pw(t, n);
  for (; i != null; ) {
    const l = e;
    if (e.mode === "composition")
      o = l.__getInstance(i);
    else if (__VUE_I18N_LEGACY_API__) {
      const a = l.__getInstance(i);
      a != null && (o = a.__composer, n && o && !o[Mp] && (o = null));
    }
    if (o != null || r === i)
      break;
    i = i.parent;
  }
  return o;
}
function pw(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function vw(e, t, n) {
  Jb(() => {
  }, t), Qb(() => {
    const o = n;
    e.__deleteInstance(t);
    const r = o[Qs];
    r && (r(), delete o[Qs]);
  }, t);
}
At({
  value: {
    type: [Number, Date],
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, Id);
tw();
kb(lb);
Pb(Sb);
Tb(Cp);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = jo();
  e.__INTLIFY__ = !0, sb(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
function gw(e) {
  let t = ".", n = "__", o = "--", r;
  if (e) {
    let f = e.blockPrefix;
    f && (t = f), f = e.elementPrefix, f && (n = f), f = e.modifierPrefix, f && (o = f);
  }
  const i = {
    install(f) {
      r = f.c;
      const g = f.context;
      g.bem = {}, g.bem.b = null, g.bem.els = null;
    }
  };
  function l(f) {
    let g, m;
    return {
      before(u) {
        g = u.bem.b, m = u.bem.els, u.bem.els = null;
      },
      after(u) {
        u.bem.b = g, u.bem.els = m;
      },
      $({ context: u, props: w }) {
        return f = typeof f == "string" ? f : f({ context: u, props: w }), u.bem.b = f, `${(w == null ? void 0 : w.bPrefix) || t}${u.bem.b}`;
      }
    };
  }
  function a(f) {
    let g;
    return {
      before(m) {
        g = m.bem.els;
      },
      after(m) {
        m.bem.els = g;
      },
      $({ context: m, props: u }) {
        return f = typeof f == "string" ? f : f({ context: m, props: u }), m.bem.els = f.split(",").map((w) => w.trim()), m.bem.els.map((w) => `${(u == null ? void 0 : u.bPrefix) || t}${m.bem.b}${n}${w}`).join(", ");
      }
    };
  }
  function s(f) {
    return {
      $({ context: g, props: m }) {
        f = typeof f == "string" ? f : f({ context: g, props: m });
        const u = f.split(",").map((b) => b.trim());
        function w(b) {
          return u.map((S) => `&${(m == null ? void 0 : m.bPrefix) || t}${g.bem.b}${b !== void 0 ? `${n}${b}` : ""}${o}${S}`).join(", ");
        }
        const $ = g.bem.els;
        return $ !== null ? w($[0]) : w();
      }
    };
  }
  function d(f) {
    return {
      $({ context: g, props: m }) {
        f = typeof f == "string" ? f : f({ context: g, props: m });
        const u = g.bem.els;
        return `&:not(${(m == null ? void 0 : m.bPrefix) || t}${g.bem.b}${u !== null && u.length > 0 ? `${n}${u[0]}` : ""}${o}${f})`;
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
function mw(e) {
  let t = 0;
  for (let n = 0; n < e.length; ++n)
    e[n] === "&" && ++t;
  return t;
}
const Lp = /\s*,(?![^(]*\))\s*/g, bw = /\s+/g;
function ww(e, t) {
  const n = [];
  return t.split(Lp).forEach((o) => {
    let r = mw(o);
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
function yw(e, t) {
  const n = [];
  return t.split(Lp).forEach((o) => {
    e.forEach((r) => {
      n.push((r && r + " ") + o);
    });
  }), n;
}
function xw(e) {
  let t = [""];
  return e.forEach((n) => {
    n = n && n.trim(), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    n && (n.includes("&") ? t = ww(t, n) : t = yw(t, n));
  }), t.join(", ").replace(bw, " ");
}
function Yc(e) {
  if (!e)
    return;
  const t = e.parentElement;
  t && t.removeChild(e);
}
function il(e, t) {
  return (t ?? document.head).querySelector(`style[cssr-id="${e}"]`);
}
function Cw(e) {
  const t = document.createElement("style");
  return t.setAttribute("cssr-id", e), t;
}
function Di(e) {
  return e ? /^\s*@(s|m)/.test(e) : !1;
}
const Sw = /[A-Z]/g;
function Dp(e) {
  return e.replace(Sw, (t) => "-" + t.toLowerCase());
}
function $w(e, t = "  ") {
  return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((n) => t + `  ${Dp(n[0])}: ${n[1]};`).join(`
`) + `
` + t + "}" : `: ${e};`;
}
function Rw(e, t, n) {
  return typeof e == "function" ? e({
    context: t.context,
    props: n
  }) : e;
}
function Zc(e, t, n, o) {
  if (!t)
    return "";
  const r = Rw(t, n, o);
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
    a = Dp(a), s != null && l.push(`  ${a}${$w(s)}`);
  }), e && l.push("}"), l.join(`
`);
}
function ed(e, t, n) {
  e && e.forEach((o) => {
    if (Array.isArray(o))
      ed(o, t, n);
    else if (typeof o == "function") {
      const r = o(t);
      Array.isArray(r) ? ed(r, t, n) : r && n(r);
    } else o && n(o);
  });
}
function Np(e, t, n, o, r) {
  const i = e.$;
  let l = "";
  if (!i || typeof i == "string")
    Di(i) ? l = i : t.push(i);
  else if (typeof i == "function") {
    const d = i({
      context: o.context,
      props: r
    });
    Di(d) ? l = d : t.push(d);
  } else if (i.before && i.before(o.context), !i.$ || typeof i.$ == "string")
    Di(i.$) ? l = i.$ : t.push(i.$);
  else if (i.$) {
    const d = i.$({
      context: o.context,
      props: r
    });
    Di(d) ? l = d : t.push(d);
  }
  const a = xw(t), s = Zc(a, e.props, o, r);
  l ? n.push(`${l} {`) : s.length && n.push(s), e.children && ed(e.children, {
    context: o.context,
    props: r
  }, (d) => {
    if (typeof d == "string") {
      const c = Zc(a, { raw: d }, o, r);
      n.push(c);
    } else
      Np(d, t, n, o, r);
  }), t.pop(), l && n.push("}"), i && i.after && i.after(o.context);
}
function kw(e, t, n) {
  const o = [];
  return Np(e, [], o, t, n), o.join(`

`);
}
function td(e) {
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
function Pw(e, t, n, o) {
  const { els: r } = t;
  if (n === void 0)
    r.forEach(Yc), t.els = [];
  else {
    const i = il(n, o);
    i && r.includes(i) && (Yc(i), t.els = r.filter((l) => l !== i));
  }
}
function Jc(e, t) {
  e.push(t);
}
function Tw(e, t, n, o, r, i, l, a, s) {
  let d;
  if (n === void 0 && (d = t.render(o), n = td(d)), s) {
    s.adapter(n, d ?? t.render(o));
    return;
  }
  a === void 0 && (a = document.head);
  const c = il(n, a);
  if (c !== null && !i)
    return c;
  const h = c ?? Cw(n);
  if (d === void 0 && (d = t.render(o)), h.textContent = d, c !== null)
    return c;
  if (l) {
    const p = a.querySelector(`meta[name="${l}"]`);
    if (p)
      return a.insertBefore(h, p), Jc(t.els, h), h;
  }
  return r ? a.insertBefore(h, a.querySelector("style, link")) : a.appendChild(h), Jc(t.els, h), h;
}
function _w(e) {
  return kw(this, this.instance, e);
}
function Ew(e = {}) {
  const { id: t, ssr: n, props: o, head: r = !1, force: i = !1, anchorMetaName: l, parent: a } = e;
  return Tw(this.instance, this, t, o, r, i, l, a, n);
}
function zw(e = {}) {
  const { id: t, parent: n } = e;
  Pw(this.instance, this, t, n);
}
const Ni = function(e, t, n, o) {
  return {
    instance: e,
    $: t,
    props: n,
    children: o,
    els: [],
    render: _w,
    mount: Ew,
    unmount: zw
  };
}, Fw = function(e, t, n, o) {
  return Array.isArray(t) ? Ni(e, { $: null }, null, t) : Array.isArray(n) ? Ni(e, t, null, n) : Array.isArray(o) ? Ni(e, t, n, o) : Ni(e, t, n, null);
};
function Hp(e = {}) {
  const t = {
    c: (...n) => Fw(t, ...n),
    use: (n, ...o) => n.install(t, ...o),
    find: il,
    context: {},
    config: e
  };
  return t;
}
function Ow(e, t) {
  if (e === void 0)
    return !1;
  if (t) {
    const { context: { ids: n } } = t;
    return n.has(e);
  }
  return il(e) !== null;
}
const Mw = "n", yi = `.${Mw}-`, Iw = "__", Vw = "--", jp = Hp(), Wp = gw({
  blockPrefix: yi,
  elementPrefix: Iw,
  modifierPrefix: Vw
});
jp.use(Wp);
const {
  c: I,
  find: gO
} = jp, {
  cB: P,
  cE: L,
  cM: N,
  cNotM: rt
} = Wp;
function Vd(e) {
  return I(({
    props: {
      bPrefix: t
    }
  }) => `${t || yi}modal, ${t || yi}drawer`, [e]);
}
function Ad(e) {
  return I(({
    props: {
      bPrefix: t
    }
  }) => `${t || yi}popover`, [e]);
}
function Aw(e) {
  return I(({
    props: {
      bPrefix: t
    }
  }) => `&${t || yi}modal`, e);
}
const Bw = (...e) => I(">", [P(...e)]);
function ie(e, t) {
  return e + (t === "default" ? "" : t.replace(/^[a-z]/, (n) => n.toUpperCase()));
}
let Wa = [];
const Up = /* @__PURE__ */ new WeakMap();
function Lw() {
  Wa.forEach((e) => e(...Up.get(e))), Wa = [];
}
function xi(e, ...t) {
  Up.set(e, t), !Wa.includes(e) && Wa.push(e) === 1 && requestAnimationFrame(Lw);
}
function pn(e, t) {
  let { target: n } = e;
  for (; n; ) {
    if (n.dataset && n.dataset[t] !== void 0)
      return !0;
    n = n.parentElement;
  }
  return !1;
}
function Ci(e) {
  return e.composedPath()[0] || null;
}
function Dw(e) {
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
function rr(e, t) {
  var n;
  if (e == null)
    return;
  const o = Dw(e);
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
function zt(e) {
  return typeof e == "string" ? e.endsWith("px") ? Number(e.slice(0, e.length - 2)) : Number(e) : e;
}
function ht(e) {
  if (e != null)
    return typeof e == "number" ? `${e}px` : e.endsWith("px") ? e : `${e}px`;
}
function Bt(e, t) {
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
function Nw(e, t) {
  const [n, o] = e.split(" ");
  return {
    row: n,
    col: o || n
  };
}
const Qc = {
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
function Hw(e, t, n) {
  t /= 100, n /= 100;
  let o = (r, i = (r + e / 60) % 6) => n - n * t * Math.max(Math.min(i, 4 - i, 1), 0);
  return [o(5) * 255, o(3) * 255, o(1) * 255];
}
function jw(e, t, n) {
  t /= 100, n /= 100;
  let o = t * Math.min(n, 1 - n), r = (i, l = (i + e / 30) % 12) => n - o * Math.max(Math.min(l - 3, 9 - l, 1), -1);
  return [r(0) * 255, r(8) * 255, r(4) * 255];
}
const Un = "^\\s*", Kn = "\\s*$", Ro = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))%\\s*", an = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", Wo = "([0-9A-Fa-f])", Uo = "([0-9A-Fa-f]{2})", Kp = new RegExp(`${Un}hsl\\s*\\(${an},${Ro},${Ro}\\)${Kn}`), qp = new RegExp(`${Un}hsv\\s*\\(${an},${Ro},${Ro}\\)${Kn}`), Gp = new RegExp(`${Un}hsla\\s*\\(${an},${Ro},${Ro},${an}\\)${Kn}`), Xp = new RegExp(`${Un}hsva\\s*\\(${an},${Ro},${Ro},${an}\\)${Kn}`), Ww = new RegExp(`${Un}rgb\\s*\\(${an},${an},${an}\\)${Kn}`), Uw = new RegExp(`${Un}rgba\\s*\\(${an},${an},${an},${an}\\)${Kn}`), Kw = new RegExp(`${Un}#${Wo}${Wo}${Wo}${Kn}`), qw = new RegExp(`${Un}#${Uo}${Uo}${Uo}${Kn}`), Gw = new RegExp(`${Un}#${Wo}${Wo}${Wo}${Wo}${Kn}`), Xw = new RegExp(`${Un}#${Uo}${Uo}${Uo}${Uo}${Kn}`);
function Zt(e) {
  return parseInt(e, 16);
}
function Yw(e) {
  try {
    let t;
    if (t = Gp.exec(e))
      return [
        Ua(t[1]),
        $o(t[5]),
        $o(t[9]),
        qo(t[13])
      ];
    if (t = Kp.exec(e))
      return [Ua(t[1]), $o(t[5]), $o(t[9]), 1];
    throw new Error(`[seemly/hsla]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function Zw(e) {
  try {
    let t;
    if (t = Xp.exec(e))
      return [
        Ua(t[1]),
        $o(t[5]),
        $o(t[9]),
        qo(t[13])
      ];
    if (t = qp.exec(e))
      return [Ua(t[1]), $o(t[5]), $o(t[9]), 1];
    throw new Error(`[seemly/hsva]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function ko(e) {
  try {
    let t;
    if (t = qw.exec(e))
      return [Zt(t[1]), Zt(t[2]), Zt(t[3]), 1];
    if (t = Ww.exec(e))
      return [jt(t[1]), jt(t[5]), jt(t[9]), 1];
    if (t = Uw.exec(e))
      return [
        jt(t[1]),
        jt(t[5]),
        jt(t[9]),
        qo(t[13])
      ];
    if (t = Kw.exec(e))
      return [
        Zt(t[1] + t[1]),
        Zt(t[2] + t[2]),
        Zt(t[3] + t[3]),
        1
      ];
    if (t = Xw.exec(e))
      return [
        Zt(t[1]),
        Zt(t[2]),
        Zt(t[3]),
        qo(Zt(t[4]) / 255)
      ];
    if (t = Gw.exec(e))
      return [
        Zt(t[1] + t[1]),
        Zt(t[2] + t[2]),
        Zt(t[3] + t[3]),
        qo(Zt(t[4] + t[4]) / 255)
      ];
    if (e in Qc)
      return ko(Qc[e]);
    if (Kp.test(e) || Gp.test(e)) {
      const [n, o, r, i] = Yw(e);
      return [...jw(n, o, r), i];
    } else if (qp.test(e) || Xp.test(e)) {
      const [n, o, r, i] = Zw(e);
      return [...Hw(n, o, r), i];
    }
    throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function Jw(e) {
  return e > 1 ? 1 : e < 0 ? 0 : e;
}
function nd(e, t, n, o) {
  return `rgba(${jt(e)}, ${jt(t)}, ${jt(n)}, ${Jw(o)})`;
}
function zl(e, t, n, o, r) {
  return jt((e * t * (1 - o) + n * o) / r);
}
function Je(e, t) {
  Array.isArray(e) || (e = ko(e)), Array.isArray(t) || (t = ko(t));
  const n = e[3], o = t[3], r = qo(n + o - n * o);
  return nd(zl(e[0], n, t[0], o, r), zl(e[1], n, t[1], o, r), zl(e[2], n, t[2], o, r), r);
}
function Ve(e, t) {
  const [n, o, r, i = 1] = Array.isArray(e) ? e : ko(e);
  return typeof t.alpha == "number" ? nd(n, o, r, t.alpha) : nd(n, o, r, i);
}
function Hi(e, t) {
  const [n, o, r, i = 1] = Array.isArray(e) ? e : ko(e), { lightness: l = 1, alpha: a = 1 } = t;
  return Qw([n * l, o * l, r * l, i * a]);
}
function qo(e) {
  const t = Math.round(Number(e) * 100) / 100;
  return t > 1 ? 1 : t < 0 ? 0 : t;
}
function Ua(e) {
  const t = Math.round(Number(e));
  return t >= 360 || t < 0 ? 0 : t;
}
function jt(e) {
  const t = Math.round(Number(e));
  return t > 255 ? 255 : t < 0 ? 0 : t;
}
function $o(e) {
  const t = Math.round(Number(e));
  return t > 100 ? 100 : t < 0 ? 0 : t;
}
function Qw(e) {
  const [t, n, o] = e;
  return 3 in e ? `rgba(${jt(t)}, ${jt(n)}, ${jt(o)}, ${qo(e[3])})` : `rgba(${jt(t)}, ${jt(n)}, ${jt(o)}, 1)`;
}
function Si(e = 8) {
  return Math.random().toString(16).slice(2, 2 + e);
}
function e0(e, t) {
  const n = [];
  for (let o = 0; o < e; ++o)
    n.push(t);
  return n;
}
function Ba(e) {
  return e.composedPath()[0];
}
const t0 = {
  mousemoveoutside: /* @__PURE__ */ new WeakMap(),
  clickoutside: /* @__PURE__ */ new WeakMap()
};
function n0(e, t, n) {
  if (e === "mousemoveoutside") {
    const o = (r) => {
      t.contains(Ba(r)) || n(r);
    };
    return {
      mousemove: o,
      touchstart: o
    };
  } else if (e === "clickoutside") {
    let o = !1;
    const r = (l) => {
      o = !t.contains(Ba(l));
    }, i = (l) => {
      o && (t.contains(Ba(l)) || n(l));
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
function Yp(e, t, n) {
  const o = t0[e];
  let r = o.get(t);
  r === void 0 && o.set(t, r = /* @__PURE__ */ new WeakMap());
  let i = r.get(n);
  return i === void 0 && r.set(n, i = n0(e, t, n)), i;
}
function o0(e, t, n, o) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const r = Yp(e, t, n);
    return Object.keys(r).forEach((i) => {
      pt(i, document, r[i], o);
    }), !0;
  }
  return !1;
}
function r0(e, t, n, o) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const r = Yp(e, t, n);
    return Object.keys(r).forEach((i) => {
      at(i, document, r[i], o);
    }), !0;
  }
  return !1;
}
function i0() {
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
  function r(y, E, R) {
    const O = y[E];
    return y[E] = function() {
      return R.apply(y, arguments), O.apply(y, arguments);
    }, y;
  }
  function i(y, E) {
    y[E] = Event.prototype[E];
  }
  const l = /* @__PURE__ */ new WeakMap(), a = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
  function s() {
    var y;
    return (y = l.get(this)) !== null && y !== void 0 ? y : null;
  }
  function d(y, E) {
    a !== void 0 && Object.defineProperty(y, "currentTarget", {
      configurable: !0,
      enumerable: !0,
      get: E ?? a.get
    });
  }
  const c = {
    bubble: {},
    capture: {}
  }, h = {};
  function p() {
    const y = function(E) {
      const { type: R, eventPhase: O, bubbles: W } = E, _ = Ba(E);
      if (O === 2)
        return;
      const V = O === 1 ? "capture" : "bubble";
      let B = _;
      const M = [];
      for (; B === null && (B = window), M.push(B), B !== window; )
        B = B.parentNode || null;
      const G = c.capture[R], U = c.bubble[R];
      if (r(E, "stopPropagation", n), r(E, "stopImmediatePropagation", o), d(E, s), V === "capture") {
        if (G === void 0)
          return;
        for (let Q = M.length - 1; Q >= 0 && !e.has(E); --Q) {
          const oe = M[Q], ne = G.get(oe);
          if (ne !== void 0) {
            l.set(E, oe);
            for (const X of ne) {
              if (t.has(E))
                break;
              X(E);
            }
          }
          if (Q === 0 && !W && U !== void 0) {
            const X = U.get(oe);
            if (X !== void 0)
              for (const j of X) {
                if (t.has(E))
                  break;
                j(E);
              }
          }
        }
      } else if (V === "bubble") {
        if (U === void 0)
          return;
        for (let Q = 0; Q < M.length && !e.has(E); ++Q) {
          const oe = M[Q], ne = U.get(oe);
          if (ne !== void 0) {
            l.set(E, oe);
            for (const X of ne) {
              if (t.has(E))
                break;
              X(E);
            }
          }
        }
      }
      i(E, "stopPropagation"), i(E, "stopImmediatePropagation"), d(E);
    };
    return y.displayName = "evtdUnifiedHandler", y;
  }
  function v() {
    const y = function(E) {
      const { type: R, eventPhase: O } = E;
      if (O !== 2)
        return;
      const W = h[R];
      W !== void 0 && W.forEach((_) => _(E));
    };
    return y.displayName = "evtdUnifiedWindowEventHandler", y;
  }
  const f = p(), g = v();
  function m(y, E) {
    const R = c[y];
    return R[E] === void 0 && (R[E] = /* @__PURE__ */ new Map(), window.addEventListener(E, f, y === "capture")), R[E];
  }
  function u(y) {
    return h[y] === void 0 && (h[y] = /* @__PURE__ */ new Set(), window.addEventListener(y, g)), h[y];
  }
  function w(y, E) {
    let R = y.get(E);
    return R === void 0 && y.set(E, R = /* @__PURE__ */ new Set()), R;
  }
  function $(y, E, R, O) {
    const W = c[E][R];
    if (W !== void 0) {
      const _ = W.get(y);
      if (_ !== void 0 && _.has(O))
        return !0;
    }
    return !1;
  }
  function b(y, E) {
    const R = h[y];
    return !!(R !== void 0 && R.has(E));
  }
  function S(y, E, R, O) {
    let W;
    if (typeof O == "object" && O.once === !0 ? W = (G) => {
      C(y, E, W, O), R(G);
    } : W = R, o0(y, E, W, O))
      return;
    const V = O === !0 || typeof O == "object" && O.capture === !0 ? "capture" : "bubble", B = m(V, y), M = w(B, E);
    if (M.has(W) || M.add(W), E === window) {
      const G = u(y);
      G.has(W) || G.add(W);
    }
  }
  function C(y, E, R, O) {
    if (r0(y, E, R, O))
      return;
    const _ = O === !0 || typeof O == "object" && O.capture === !0, V = _ ? "capture" : "bubble", B = m(V, y), M = w(B, E);
    if (E === window && !$(E, _ ? "bubble" : "capture", y, R) && b(y, R)) {
      const U = h[y];
      U.delete(R), U.size === 0 && (window.removeEventListener(y, g), h[y] = void 0);
    }
    M.has(R) && M.delete(R), M.size === 0 && B.delete(E), B.size === 0 && (window.removeEventListener(y, f, V === "capture"), c[V][y] = void 0);
  }
  return {
    on: S,
    off: C
  };
}
const { on: pt, off: at } = i0(), a0 = window.Vue.ref, eu = window.Vue.readonly, l0 = window.Vue.watch;
function s0(e) {
  const t = a0(!!e.value);
  if (t.value)
    return eu(t);
  const n = l0(e, (o) => {
    o && (t.value = !0, n());
  });
  return eu(t);
}
const d0 = window.Vue.computed, c0 = window.Vue.ref, u0 = window.Vue.watch;
function Be(e) {
  const t = d0(e), n = c0(t.value);
  return u0(t, (o) => {
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
const f0 = window.Vue.getCurrentInstance;
function h0() {
  return f0() !== null;
}
const Zp = typeof window < "u", p0 = window.Vue.onMounted, v0 = window.Vue.onBeforeUnmount;
let wr, di;
const g0 = () => {
  var e, t;
  wr = Zp ? (t = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || t === void 0 ? void 0 : t.ready : void 0, di = !1, wr !== void 0 ? wr.then(() => {
    di = !0;
  }) : di = !0;
};
g0();
function Jp(e) {
  if (di)
    return;
  let t = !1;
  p0(() => {
    di || wr == null || wr.then(() => {
      t || e();
    });
  }), v0(() => {
    t = !0;
  });
}
const m0 = window.Vue.watch, b0 = window.Vue.computed;
function Ot(e, t) {
  return m0(e, (n) => {
    n !== void 0 && (t.value = n);
  }), b0(() => e.value === void 0 ? t.value : e.value);
}
const w0 = window.Vue.ref, y0 = window.Vue.onMounted, x0 = window.Vue.readonly;
function Fi() {
  const e = w0(!1);
  return y0(() => {
    e.value = !0;
  }), x0(e);
}
const C0 = window.Vue.computed;
function Ka(e, t) {
  return C0(() => {
    for (const n of t)
      if (e[n] !== void 0)
        return e[n];
    return e[t[t.length - 1]];
  });
}
const S0 = (typeof window > "u" ? !1 : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
!window.MSStream;
function $0() {
  return S0;
}
const R0 = window.Vue.ref, Fl = window.Vue.computed, k0 = window.Vue.onBeforeUnmount, P0 = {
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
function T0(e) {
  return `(min-width: ${e}px)`;
}
const Nr = {};
function _0(e = P0) {
  if (!Zp)
    return Fl(() => []);
  if (typeof window.matchMedia != "function")
    return Fl(() => []);
  const t = R0({}), n = Object.keys(e), o = (r, i) => {
    r.matches ? t.value[i] = !0 : t.value[i] = !1;
  };
  return n.forEach((r) => {
    const i = e[r];
    let l, a;
    Nr[i] === void 0 ? (l = window.matchMedia(T0(i)), l.addEventListener ? l.addEventListener("change", (s) => {
      a.forEach((d) => {
        d(s, r);
      });
    }) : l.addListener && l.addListener((s) => {
      a.forEach((d) => {
        d(s, r);
      });
    }), a = /* @__PURE__ */ new Set(), Nr[i] = {
      mql: l,
      cbs: a
    }) : (l = Nr[i].mql, a = Nr[i].cbs), a.add(o), l.matches && a.forEach((s) => {
      s(l, r);
    });
  }), k0(() => {
    n.forEach((r) => {
      const { cbs: i } = Nr[e[r]];
      i.has(o) && i.delete(o);
    });
  }), Fl(() => {
    const { value: r } = t;
    return n.filter((i) => r[i]);
  });
}
const E0 = window.Vue.onBeforeMount, z0 = window.Vue.onBeforeUnmount, F0 = window.Vue.reactive, O0 = window.Vue.readonly, M0 = window.Vue.watch;
function I0(e = {}, t) {
  const n = F0({
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
    (t === void 0 || t.value) && (pt("keydown", document, i), pt("keyup", document, l)), t !== void 0 && M0(t, (s) => {
      s ? (pt("keydown", document, i), pt("keyup", document, l)) : (at("keydown", document, i), at("keyup", document, l));
    });
  };
  return h0() ? (E0(a), z0(() => {
    (t === void 0 || t.value) && (at("keydown", document, i), at("keyup", document, l));
  })) : a(), O0(n);
}
const Bd = "n-internal-select-menu", Qp = "n-internal-select-menu-body", al = "n-drawer-body", Ld = "n-drawer", ll = "n-modal-body", Oi = "n-popover-body", ji = window.Vue.inject, V0 = window.Vue.onBeforeUnmount, A0 = window.Vue.onMounted, B0 = window.Vue.ref, ev = "__disabled__";
function Wn(e) {
  const t = ji(ll, null), n = ji(al, null), o = ji(Oi, null), r = ji(Qp, null), i = B0();
  if (typeof document < "u") {
    i.value = document.fullscreenElement;
    const l = () => {
      i.value = document.fullscreenElement;
    };
    A0(() => {
      pt("fullscreenchange", document, l);
    }), V0(() => {
      at("fullscreenchange", document, l);
    });
  }
  return Be(() => {
    var l;
    const {
      to: a
    } = e;
    return a !== void 0 ? a === !1 ? ev : a === !0 ? i.value || "body" : a : t != null && t.value ? (l = t.value.$el) !== null && l !== void 0 ? l : t.value : n != null && n.value ? n.value : o != null && o.value ? o.value : r != null && r.value ? r.value : a ?? (i.value || "body");
  });
}
Wn.tdkey = ev;
Wn.propTo = {
  type: [String, Object, Boolean],
  default: void 0
};
const L0 = window.Vue.getCurrentInstance, D0 = window.Vue.inject, N0 = window.Vue.onBeforeUnmount;
window.Vue.onMounted;
const H0 = window.Vue.watch;
function j0(e, t, n) {
  var o;
  const r = D0(e, null);
  if (r === null) return;
  const i = (o = L0()) === null || o === void 0 ? void 0 : o.proxy;
  H0(n, l), l(n.value), N0(() => {
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
const W0 = window.Vue.ref, U0 = window.Vue.watch;
function K0(e, t, n) {
  const o = W0(e.value);
  let r = null;
  return U0(e, (i) => {
    r !== null && window.clearTimeout(r), i === !0 ? n && !n.value ? o.value = !0 : r = window.setTimeout(() => {
      o.value = !0;
    }, t) : o.value = !1;
  }), o;
}
const Jo = typeof document < "u" && typeof window < "u", q0 = window.Vue.onBeforeMount, G0 = window.Vue.onBeforeUnmount, X0 = window.Vue.ref, Dd = X0(!1);
function tu() {
  Dd.value = !0;
}
function nu() {
  Dd.value = !1;
}
let Hr = 0;
function Y0() {
  return Jo && (q0(() => {
    Hr || (window.addEventListener("compositionstart", tu), window.addEventListener("compositionend", nu)), Hr++;
  }), G0(() => {
    Hr <= 1 ? (window.removeEventListener("compositionstart", tu), window.removeEventListener("compositionend", nu), Hr = 0) : Hr--;
  })), Dd;
}
const Z0 = window.Vue.onBeforeUnmount, J0 = window.Vue.onMounted, Q0 = window.Vue.ref, ey = window.Vue.watch;
let ir = 0, ou = "", ru = "", iu = "", au = "";
const lu = Q0("0px");
function ty(e) {
  if (typeof document > "u") return;
  const t = document.documentElement;
  let n, o = !1;
  const r = () => {
    t.style.marginRight = ou, t.style.overflow = ru, t.style.overflowX = iu, t.style.overflowY = au, lu.value = "0px";
  };
  J0(() => {
    n = ey(e, (i) => {
      if (i) {
        if (!ir) {
          const l = window.innerWidth - t.offsetWidth;
          l > 0 && (ou = t.style.marginRight, t.style.marginRight = `${l}px`, lu.value = `${l}px`), ru = t.style.overflow, iu = t.style.overflowX, au = t.style.overflowY, t.style.overflow = "hidden", t.style.overflowX = "hidden", t.style.overflowY = "hidden";
        }
        o = !0, ir++;
      } else
        ir--, ir || r(), o = !1;
    }, {
      immediate: !0
    });
  }), Z0(() => {
    n == null || n(), o && (ir--, ir || r(), o = !1);
  });
}
const ny = window.Vue.onActivated, oy = window.Vue.onDeactivated;
function ry(e) {
  const t = {
    isDeactivated: !1
  };
  let n = !1;
  return ny(() => {
    if (t.isDeactivated = !1, !n) {
      n = !0;
      return;
    }
    e();
  }), oy(() => {
    t.isDeactivated = !0, n || (n = !0);
  }), t;
}
const iy = window.Vue.Fragment, ay = window.Vue.createTextVNode, ly = window.Vue.Comment;
function od(e, t, n = "default") {
  const o = t[n];
  if (o === void 0)
    throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  return o();
}
function rd(e, t = !0, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(ay(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        rd(o, t, n);
        return;
      }
      if (o.type === iy) {
        if (o.children === null)
          return;
        Array.isArray(o.children) && rd(o.children, t, n);
      } else o.type !== ly && n.push(o);
    }
  }), n;
}
function su(e, t, n = "default") {
  const o = t[n];
  if (o === void 0)
    throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  const r = rd(o());
  if (r.length === 1)
    return r[0];
  throw new Error(`[vueuc/${e}]: slot[${n}] should have exactly one child.`);
}
let ho = null;
function tv() {
  if (ho === null && (ho = document.getElementById("v-binder-view-measurer"), ho === null)) {
    ho = document.createElement("div"), ho.id = "v-binder-view-measurer";
    const { style: e } = ho;
    e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(ho);
  }
  return ho.getBoundingClientRect();
}
function sy(e, t) {
  const n = tv();
  return {
    top: t,
    left: e,
    height: 0,
    width: 0,
    right: n.width - e,
    bottom: n.height - t
  };
}
function Ol(e) {
  const t = e.getBoundingClientRect(), n = tv();
  return {
    left: t.left - n.left,
    top: t.top - n.top,
    bottom: n.height + n.top - t.bottom,
    right: n.width + n.left - t.right,
    width: t.width,
    height: t.height
  };
}
function dy(e) {
  return e.nodeType === 9 ? null : e.parentNode;
}
function nv(e) {
  if (e === null)
    return null;
  const t = dy(e);
  if (t === null)
    return null;
  if (t.nodeType === 9)
    return document;
  if (t.nodeType === 1) {
    const { overflow: n, overflowX: o, overflowY: r } = getComputedStyle(t);
    if (/(auto|scroll|overlay)/.test(n + r + o))
      return t;
  }
  return nv(t);
}
const cy = window.Vue.defineComponent, uy = window.Vue.provide, fy = window.Vue.ref, hy = window.Vue.inject, py = window.Vue.getCurrentInstance, vy = window.Vue.onBeforeUnmount, Nd = cy({
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
    uy("VBinder", (t = py()) === null || t === void 0 ? void 0 : t.proxy);
    const n = hy("VBinder", null), o = fy(null), r = (u) => {
      o.value = u, n && e.syncTargetWithParent && n.setTargetRef(u);
    };
    let i = [];
    const l = () => {
      let u = o.value;
      for (; u = nv(u), u !== null; )
        i.push(u);
      for (const w of i)
        pt("scroll", w, h, !0);
    }, a = () => {
      for (const u of i)
        at("scroll", u, h, !0);
      i = [];
    }, s = /* @__PURE__ */ new Set(), d = (u) => {
      s.size === 0 && l(), s.has(u) || s.add(u);
    }, c = (u) => {
      s.has(u) && s.delete(u), s.size === 0 && a();
    }, h = () => {
      xi(p);
    }, p = () => {
      s.forEach((u) => u());
    }, v = /* @__PURE__ */ new Set(), f = (u) => {
      v.size === 0 && pt("resize", window, m), v.has(u) || v.add(u);
    }, g = (u) => {
      v.has(u) && v.delete(u), v.size === 0 && at("resize", window, m);
    }, m = () => {
      v.forEach((u) => u());
    };
    return vy(() => {
      at("resize", window, m), a();
    }), {
      targetRef: o,
      setTargetRef: r,
      addScrollListener: d,
      removeScrollListener: c,
      addResizeListener: f,
      removeResizeListener: g
    };
  },
  render() {
    return od("binder", this.$slots);
  }
}), gy = window.Vue.defineComponent, my = window.Vue.inject, by = window.Vue.withDirectives, Hd = gy({
  name: "Target",
  setup() {
    const { setTargetRef: e, syncTarget: t } = my("VBinder");
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
    return e ? by(su("follower", this.$slots), [
      [t]
    ]) : su("follower", this.$slots);
  }
}), ar = "@@mmoContext", wy = {
  mounted(e, { value: t }) {
    e[ar] = {
      handler: void 0
    }, typeof t == "function" && (e[ar].handler = t, pt("mousemoveoutside", e, t));
  },
  updated(e, { value: t }) {
    const n = e[ar];
    typeof t == "function" ? n.handler ? n.handler !== t && (at("mousemoveoutside", e, n.handler), n.handler = t, pt("mousemoveoutside", e, t)) : (e[ar].handler = t, pt("mousemoveoutside", e, t)) : n.handler && (at("mousemoveoutside", e, n.handler), n.handler = void 0);
  },
  unmounted(e) {
    const { handler: t } = e[ar];
    t && at("mousemoveoutside", e, t), e[ar].handler = void 0;
  }
}, lr = "@@coContext", $i = {
  mounted(e, { value: t, modifiers: n }) {
    e[lr] = {
      handler: void 0
    }, typeof t == "function" && (e[lr].handler = t, pt("clickoutside", e, t, {
      capture: n.capture
    }));
  },
  updated(e, { value: t, modifiers: n }) {
    const o = e[lr];
    typeof t == "function" ? o.handler ? o.handler !== t && (at("clickoutside", e, o.handler, {
      capture: n.capture
    }), o.handler = t, pt("clickoutside", e, t, {
      capture: n.capture
    })) : (e[lr].handler = t, pt("clickoutside", e, t, {
      capture: n.capture
    })) : o.handler && (at("clickoutside", e, o.handler, {
      capture: n.capture
    }), o.handler = void 0);
  },
  unmounted(e, { modifiers: t }) {
    const { handler: n } = e[lr];
    n && at("clickoutside", e, n, {
      capture: t.capture
    }), e[lr].handler = void 0;
  }
};
function yy(e, t) {
  console.error(`[vdirs/${e}]: ${t}`);
}
class xy {
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
    o.has(t) ? o.delete(t) : n === void 0 && yy("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
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
const Ml = new xy(), sr = "@@ziContext", jd = {
  mounted(e, t) {
    const { value: n = {} } = t, { zIndex: o, enabled: r } = n;
    e[sr] = {
      enabled: !!r,
      initialized: !1
    }, r && (Ml.ensureZIndex(e, o), e[sr].initialized = !0);
  },
  updated(e, t) {
    const { value: n = {} } = t, { zIndex: o, enabled: r } = n, i = e[sr].enabled;
    r && !i && (Ml.ensureZIndex(e, o), e[sr].initialized = !0), e[sr].enabled = !!r;
  },
  unmounted(e, t) {
    if (!e[sr].initialized)
      return;
    const { value: n = {} } = t, { zIndex: o } = n;
    Ml.unregister(e, o);
  }
}, Cy = window.Vue.inject, Sy = "@css-render/vue3-ssr";
function $y(e, t) {
  return `<style cssr-id="${e}">
${t}
</style>`;
}
function Ry(e, t, n) {
  const { styles: o, ids: r } = n;
  r.has(e) || o !== null && (r.add(e), o.push($y(e, t)));
}
const ky = typeof document < "u";
function Fo() {
  if (ky)
    return;
  const e = Cy(Sy, null);
  if (e !== null)
    return {
      adapter: (t, n) => Ry(t, n, e),
      context: e
    };
}
function du(e, t) {
  console.error(`[vueuc/${e}]: ${t}`);
}
const { c: Dn } = Hp(), sl = "vueuc-style";
function cu(e) {
  return e & -e;
}
class ov {
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
      r[t] += n, t += cu(t);
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
      i += n[t], t -= cu(t);
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
function uu(e) {
  return typeof e == "string" ? document.querySelector(e) : e() || null;
}
const Py = window.Vue.Teleport, Ty = window.Vue.h, _y = window.Vue.toRef, Ey = window.Vue.computed, zy = window.Vue.defineComponent, rv = zy({
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
      showTeleport: s0(_y(e, "show")),
      mergedTo: Ey(() => {
        const { to: t } = e;
        return t ?? "body";
      })
    };
  },
  render() {
    return this.showTeleport ? this.disabled ? od("lazy-teleport", this.$slots) : Ty(Py, {
      disabled: this.disabled,
      to: this.mergedTo
    }, od("lazy-teleport", this.$slots)) : null;
  }
}), Wi = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, fu = {
  start: "end",
  center: "center",
  end: "start"
}, Il = {
  top: "height",
  bottom: "height",
  left: "width",
  right: "width"
}, Fy = {
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
}, Oy = {
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
}, My = {
  "bottom-start": "right",
  "bottom-end": "left",
  "top-start": "right",
  "top-end": "left",
  "right-start": "bottom",
  "right-end": "top",
  "left-start": "bottom",
  "left-end": "top"
}, hu = {
  top: !0,
  // top++
  bottom: !1,
  // top--
  left: !0,
  // left++
  right: !1
  // left--
}, pu = {
  top: "end",
  bottom: "start",
  left: "end",
  right: "start"
};
function Iy(e, t, n, o, r, i) {
  if (!r || i)
    return { placement: e, top: 0, left: 0 };
  const [l, a] = e.split("-");
  let s = a ?? "center", d = {
    top: 0,
    left: 0
  };
  const c = (v, f, g) => {
    let m = 0, u = 0;
    const w = n[v] - t[f] - t[v];
    return w > 0 && o && (g ? u = hu[f] ? w : -w : m = hu[f] ? w : -w), {
      left: m,
      top: u
    };
  }, h = l === "left" || l === "right";
  if (s !== "center") {
    const v = My[e], f = Wi[v], g = Il[v];
    if (n[g] > t[g]) {
      if (
        // current space is not enough
        // ----------[ target ]---------|
        // -------[     follower        ]
        t[v] + t[g] < n[g]
      ) {
        const m = (n[g] - t[g]) / 2;
        t[v] < m || t[f] < m ? t[v] < t[f] ? (s = fu[a], d = c(g, f, h)) : d = c(g, v, h) : s = "center";
      }
    } else n[g] < t[g] && t[f] < 0 && // opposite align has larger space
    // ------------[   target   ]
    // ----------------[follower]
    t[v] > t[f] && (s = fu[a]);
  } else {
    const v = l === "bottom" || l === "top" ? "left" : "top", f = Wi[v], g = Il[v], m = (n[g] - t[g]) / 2;
    // center is not enough
    // ----------- [ target ]--|
    // -------[     follower     ]
    (t[v] < m || t[f] < m) && (t[v] > t[f] ? (s = pu[v], d = c(g, v, h)) : (s = pu[f], d = c(g, f, h)));
  }
  let p = l;
  return (
    // space is not enough
    t[l] < n[Il[l]] && // opposite position's space is larger
    t[l] < t[Wi[l]] && (p = Wi[l]), {
      placement: s !== "center" ? `${p}-${s}` : p,
      left: d.left,
      top: d.top
    }
  );
}
function Vy(e, t) {
  return t ? Oy[e] : Fy[e];
}
function Ay(e, t, n, o, r, i) {
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
const Vl = window.Vue.h, By = window.Vue.defineComponent, Ly = window.Vue.inject, Dy = window.Vue.nextTick, Ui = window.Vue.watch, Al = window.Vue.toRef, vu = window.Vue.ref, Ny = window.Vue.onMounted, Hy = window.Vue.onBeforeUnmount, jy = window.Vue.withDirectives, Wy = Dn([
  Dn(".v-binder-follower-container", {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    height: "0",
    pointerEvents: "none",
    zIndex: "auto"
  }),
  Dn(".v-binder-follower-content", {
    position: "absolute",
    zIndex: "auto"
  }, [
    Dn("> *", {
      pointerEvents: "all"
    })
  ])
]), Wd = By({
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
    const t = Ly("VBinder"), n = Be(() => e.enabled !== void 0 ? e.enabled : e.show), o = vu(null), r = vu(null), i = () => {
      const { syncTrigger: p } = e;
      p.includes("scroll") && t.addScrollListener(s), p.includes("resize") && t.addResizeListener(s);
    }, l = () => {
      t.removeScrollListener(s), t.removeResizeListener(s);
    };
    Ny(() => {
      n.value && (s(), i());
    });
    const a = Fo();
    Wy.mount({
      id: "vueuc/binder",
      head: !0,
      anchorMetaName: sl,
      ssr: a
    }), Hy(() => {
      l();
    }), Jp(() => {
      n.value && s();
    });
    const s = () => {
      if (!n.value)
        return;
      const p = o.value;
      if (p === null)
        return;
      const v = t.targetRef, { x: f, y: g, overlap: m } = e, u = f !== void 0 && g !== void 0 ? sy(f, g) : Ol(v);
      p.style.setProperty("--v-target-width", `${Math.round(u.width)}px`), p.style.setProperty("--v-target-height", `${Math.round(u.height)}px`);
      const { width: w, minWidth: $, placement: b, internalShift: S, flip: C } = e;
      p.setAttribute("v-placement", b), m ? p.setAttribute("v-overlap", "") : p.removeAttribute("v-overlap");
      const { style: y } = p;
      w === "target" ? y.width = `${u.width}px` : w !== void 0 ? y.width = w : y.width = "", $ === "target" ? y.minWidth = `${u.width}px` : $ !== void 0 ? y.minWidth = $ : y.minWidth = "";
      const E = Ol(p), R = Ol(r.value), { left: O, top: W, placement: _ } = Iy(b, u, E, S, C, m), V = Vy(_, m), { left: B, top: M, transform: G } = Ay(_, R, u, W, O, m);
      p.setAttribute("v-placement", _), p.style.setProperty("--v-offset-left", `${Math.round(O)}px`), p.style.setProperty("--v-offset-top", `${Math.round(W)}px`), p.style.transform = `translateX(${B}) translateY(${M}) ${G}`, p.style.setProperty("--v-transform-origin", V), p.style.transformOrigin = V;
    };
    Ui(n, (p) => {
      p ? (i(), d()) : l();
    });
    const d = () => {
      Dy().then(s).catch((p) => console.error(p));
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
      Ui(Al(e, p), s);
    }), ["teleportDisabled"].forEach((p) => {
      Ui(Al(e, p), d);
    }), Ui(Al(e, "syncTrigger"), (p) => {
      p.includes("resize") ? t.addResizeListener(s) : t.removeResizeListener(s), p.includes("scroll") ? t.addScrollListener(s) : t.removeScrollListener(s);
    });
    const c = Fi(), h = Be(() => {
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
    return Vl(rv, {
      show: this.show,
      to: this.mergedTo,
      disabled: this.teleportDisabled
    }, {
      default: () => {
        var e, t;
        const n = Vl("div", {
          class: ["v-binder-follower-container", this.containerClass],
          ref: "offsetContainerRef"
        }, [
          Vl("div", {
            class: "v-binder-follower-content",
            ref: "followerRef"
          }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e))
        ]);
        return this.zindexable ? jy(n, [
          [
            jd,
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
var Go = [], Uy = function() {
  return Go.some(function(e) {
    return e.activeTargets.length > 0;
  });
}, Ky = function() {
  return Go.some(function(e) {
    return e.skippedTargets.length > 0;
  });
}, gu = "ResizeObserver loop completed with undelivered notifications.", qy = function() {
  var e;
  typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
    message: gu
  }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = gu), window.dispatchEvent(e);
}, Ri;
(function(e) {
  e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
})(Ri || (Ri = {}));
var Xo = function(e) {
  return Object.freeze(e);
}, Gy = /* @__PURE__ */ function() {
  function e(t, n) {
    this.inlineSize = t, this.blockSize = n, Xo(this);
  }
  return e;
}(), iv = function() {
  function e(t, n, o, r) {
    return this.x = t, this.y = n, this.width = o, this.height = r, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Xo(this);
  }
  return e.prototype.toJSON = function() {
    var t = this, n = t.x, o = t.y, r = t.top, i = t.right, l = t.bottom, a = t.left, s = t.width, d = t.height;
    return { x: n, y: o, top: r, right: i, bottom: l, left: a, width: s, height: d };
  }, e.fromRect = function(t) {
    return new e(t.x, t.y, t.width, t.height);
  }, e;
}(), Ud = function(e) {
  return e instanceof SVGElement && "getBBox" in e;
}, av = function(e) {
  if (Ud(e)) {
    var t = e.getBBox(), n = t.width, o = t.height;
    return !n && !o;
  }
  var r = e, i = r.offsetWidth, l = r.offsetHeight;
  return !(i || l || e.getClientRects().length);
}, mu = function(e) {
  var t;
  if (e instanceof Element)
    return !0;
  var n = (t = e == null ? void 0 : e.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
  return !!(n && e instanceof n.Element);
}, Xy = function(e) {
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
}, ci = typeof window < "u" ? window : {}, Ki = /* @__PURE__ */ new WeakMap(), bu = /auto|scroll/, Yy = /^tb|vertical/, Zy = /msie|trident/i.test(ci.navigator && ci.navigator.userAgent), zn = function(e) {
  return parseFloat(e || "0");
}, yr = function(e, t, n) {
  return e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = !1), new Gy((n ? t : e) || 0, (n ? e : t) || 0);
}, wu = Xo({
  devicePixelContentBoxSize: yr(),
  borderBoxSize: yr(),
  contentBoxSize: yr(),
  contentRect: new iv(0, 0, 0, 0)
}), lv = function(e, t) {
  if (t === void 0 && (t = !1), Ki.has(e) && !t)
    return Ki.get(e);
  if (av(e))
    return Ki.set(e, wu), wu;
  var n = getComputedStyle(e), o = Ud(e) && e.ownerSVGElement && e.getBBox(), r = !Zy && n.boxSizing === "border-box", i = Yy.test(n.writingMode || ""), l = !o && bu.test(n.overflowY || ""), a = !o && bu.test(n.overflowX || ""), s = o ? 0 : zn(n.paddingTop), d = o ? 0 : zn(n.paddingRight), c = o ? 0 : zn(n.paddingBottom), h = o ? 0 : zn(n.paddingLeft), p = o ? 0 : zn(n.borderTopWidth), v = o ? 0 : zn(n.borderRightWidth), f = o ? 0 : zn(n.borderBottomWidth), g = o ? 0 : zn(n.borderLeftWidth), m = h + d, u = s + c, w = g + v, $ = p + f, b = a ? e.offsetHeight - $ - e.clientHeight : 0, S = l ? e.offsetWidth - w - e.clientWidth : 0, C = r ? m + w : 0, y = r ? u + $ : 0, E = o ? o.width : zn(n.width) - C - S, R = o ? o.height : zn(n.height) - y - b, O = E + m + S + w, W = R + u + b + $, _ = Xo({
    devicePixelContentBoxSize: yr(Math.round(E * devicePixelRatio), Math.round(R * devicePixelRatio), i),
    borderBoxSize: yr(O, W, i),
    contentBoxSize: yr(E, R, i),
    contentRect: new iv(h, s, E, R)
  });
  return Ki.set(e, _), _;
}, sv = function(e, t, n) {
  var o = lv(e, n), r = o.borderBoxSize, i = o.contentBoxSize, l = o.devicePixelContentBoxSize;
  switch (t) {
    case Ri.DEVICE_PIXEL_CONTENT_BOX:
      return l;
    case Ri.BORDER_BOX:
      return r;
    default:
      return i;
  }
}, Jy = /* @__PURE__ */ function() {
  function e(t) {
    var n = lv(t);
    this.target = t, this.contentRect = n.contentRect, this.borderBoxSize = Xo([n.borderBoxSize]), this.contentBoxSize = Xo([n.contentBoxSize]), this.devicePixelContentBoxSize = Xo([n.devicePixelContentBoxSize]);
  }
  return e;
}(), dv = function(e) {
  if (av(e))
    return 1 / 0;
  for (var t = 0, n = e.parentNode; n; )
    t += 1, n = n.parentNode;
  return t;
}, Qy = function() {
  var e = 1 / 0, t = [];
  Go.forEach(function(l) {
    if (l.activeTargets.length !== 0) {
      var a = [];
      l.activeTargets.forEach(function(d) {
        var c = new Jy(d.target), h = dv(d.target);
        a.push(c), d.lastReportedSize = sv(d.target, d.observedBox), h < e && (e = h);
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
}, yu = function(e) {
  Go.forEach(function(n) {
    n.activeTargets.splice(0, n.activeTargets.length), n.skippedTargets.splice(0, n.skippedTargets.length), n.observationTargets.forEach(function(r) {
      r.isActive() && (dv(r.target) > e ? n.activeTargets.push(r) : n.skippedTargets.push(r));
    });
  });
}, ex = function() {
  var e = 0;
  for (yu(e); Uy(); )
    e = Qy(), yu(e);
  return Ky() && qy(), e > 0;
}, Bl, cv = [], tx = function() {
  return cv.splice(0).forEach(function(e) {
    return e();
  });
}, nx = function(e) {
  if (!Bl) {
    var t = 0, n = document.createTextNode(""), o = { characterData: !0 };
    new MutationObserver(function() {
      return tx();
    }).observe(n, o), Bl = function() {
      n.textContent = "".concat(t ? t-- : t++);
    };
  }
  cv.push(e), Bl();
}, ox = function(e) {
  nx(function() {
    requestAnimationFrame(e);
  });
}, La = 0, rx = function() {
  return !!La;
}, ix = 250, ax = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, xu = [
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
], Cu = function(e) {
  return e === void 0 && (e = 0), Date.now() + e;
}, Ll = !1, lx = function() {
  function e() {
    var t = this;
    this.stopped = !0, this.listener = function() {
      return t.schedule();
    };
  }
  return e.prototype.run = function(t) {
    var n = this;
    if (t === void 0 && (t = ix), !Ll) {
      Ll = !0;
      var o = Cu(t);
      ox(function() {
        var r = !1;
        try {
          r = ex();
        } finally {
          if (Ll = !1, t = o - Cu(), !rx())
            return;
          r ? n.run(1e3) : t > 0 ? n.run(t) : n.start();
        }
      });
    }
  }, e.prototype.schedule = function() {
    this.stop(), this.run();
  }, e.prototype.observe = function() {
    var t = this, n = function() {
      return t.observer && t.observer.observe(document.body, ax);
    };
    document.body ? n() : ci.addEventListener("DOMContentLoaded", n);
  }, e.prototype.start = function() {
    var t = this;
    this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), xu.forEach(function(n) {
      return ci.addEventListener(n, t.listener, !0);
    }));
  }, e.prototype.stop = function() {
    var t = this;
    this.stopped || (this.observer && this.observer.disconnect(), xu.forEach(function(n) {
      return ci.removeEventListener(n, t.listener, !0);
    }), this.stopped = !0);
  }, e;
}(), id = new lx(), Su = function(e) {
  !La && e > 0 && id.start(), La += e, !La && id.stop();
}, sx = function(e) {
  return !Ud(e) && !Xy(e) && getComputedStyle(e).display === "inline";
}, dx = function() {
  function e(t, n) {
    this.target = t, this.observedBox = n || Ri.CONTENT_BOX, this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  return e.prototype.isActive = function() {
    var t = sv(this.target, this.observedBox, !0);
    return sx(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
  }, e;
}(), cx = /* @__PURE__ */ function() {
  function e(t, n) {
    this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = n;
  }
  return e;
}(), qi = /* @__PURE__ */ new WeakMap(), $u = function(e, t) {
  for (var n = 0; n < e.length; n += 1)
    if (e[n].target === t)
      return n;
  return -1;
}, Gi = function() {
  function e() {
  }
  return e.connect = function(t, n) {
    var o = new cx(t, n);
    qi.set(t, o);
  }, e.observe = function(t, n, o) {
    var r = qi.get(t), i = r.observationTargets.length === 0;
    $u(r.observationTargets, n) < 0 && (i && Go.push(r), r.observationTargets.push(new dx(n, o && o.box)), Su(1), id.schedule());
  }, e.unobserve = function(t, n) {
    var o = qi.get(t), r = $u(o.observationTargets, n), i = o.observationTargets.length === 1;
    r >= 0 && (i && Go.splice(Go.indexOf(o), 1), o.observationTargets.splice(r, 1), Su(-1));
  }, e.disconnect = function(t) {
    var n = this, o = qi.get(t);
    o.observationTargets.slice().forEach(function(r) {
      return n.unobserve(t, r.target);
    }), o.activeTargets.splice(0, o.activeTargets.length);
  }, e;
}(), ux = function() {
  function e(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    if (typeof t != "function")
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    Gi.connect(this, t);
  }
  return e.prototype.observe = function(t, n) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!mu(t))
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Gi.observe(this, t, n);
  }, e.prototype.unobserve = function(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!mu(t))
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Gi.unobserve(this, t);
  }, e.prototype.disconnect = function() {
    Gi.disconnect(this);
  }, e.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  }, e;
}();
class fx {
  constructor() {
    this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || ux)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
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
const ui = new fx(), hx = window.Vue.defineComponent, px = window.Vue.renderSlot, vx = window.Vue.getCurrentInstance, gx = window.Vue.onMounted, mx = window.Vue.onBeforeUnmount, Hn = hx({
  name: "ResizeObserver",
  props: {
    onResize: Function
  },
  setup(e) {
    let t = !1;
    const n = vx().proxy;
    function o(r) {
      const { onResize: i } = e;
      i !== void 0 && i(r);
    }
    gx(() => {
      const r = n.$el;
      if (r === void 0) {
        du("resize-observer", "$el does not exist.");
        return;
      }
      if (r.nextElementSibling !== r.nextSibling && r.nodeType === 3 && r.nodeValue !== "") {
        du("resize-observer", "$el can not be observed (it may be a text node).");
        return;
      }
      r.nextElementSibling !== null && (ui.registerHandler(r.nextElementSibling, o), t = !0);
    }), mx(() => {
      t && ui.unregisterHandler(n.$el.nextElementSibling);
    });
  },
  render() {
    return px(this.$slots, "default");
  }
});
let Xi;
function bx() {
  return typeof document > "u" ? !1 : (Xi === void 0 && ("matchMedia" in window ? Xi = window.matchMedia("(pointer:coarse)").matches : Xi = !1), Xi);
}
let Dl;
function Ru() {
  return typeof document > "u" ? 1 : (Dl === void 0 && (Dl = "chrome" in window ? window.devicePixelRatio : 1), Dl);
}
const uv = "VVirtualListXScroll", wx = window.Vue.computed, yx = window.Vue.provide, ku = window.Vue.ref;
function xx({ columnsRef: e, renderColRef: t, renderItemWithColsRef: n }) {
  const o = ku(0), r = ku(0), i = wx(() => {
    const d = e.value;
    if (d.length === 0)
      return null;
    const c = new ov(d.length, 0);
    return d.forEach((h, p) => {
      c.add(p, h.width);
    }), c;
  }), l = Be(() => {
    const d = i.value;
    return d !== null ? Math.max(d.getBound(r.value) - 1, 0) : 0;
  }), a = (d) => {
    const c = i.value;
    return c !== null ? c.sum(d) : 0;
  }, s = Be(() => {
    const d = i.value;
    return d !== null ? Math.min(d.getBound(r.value + o.value) + 1, e.value.length - 1) : 0;
  });
  return yx(uv, {
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
const Cx = window.Vue.defineComponent, Sx = window.Vue.inject, Pu = Cx({
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
      Sx(uv)
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
}), $x = window.Vue.mergeProps, jr = window.Vue.computed, Rx = window.Vue.defineComponent, Wr = window.Vue.ref, kx = window.Vue.onMounted, Mo = window.Vue.h, Px = window.Vue.onActivated, Tx = window.Vue.onDeactivated, Nl = window.Vue.toRef, _x = Dn(".v-vl", {
  maxHeight: "inherit",
  height: "100%",
  overflow: "auto",
  minWidth: "1px"
  // a zero width container won't be scrollable
}, [
  Dn("&:not(.v-vl--show-scrollbar)", {
    scrollbarWidth: "none"
  }, [
    Dn("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", {
      width: 0,
      height: 0,
      display: "none"
    })
  ])
]), Kd = Rx({
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
    const t = Fo();
    _x.mount({
      id: "vueuc/virtual-list",
      head: !0,
      anchorMetaName: sl,
      ssr: t
    }), kx(() => {
      const { defaultScrollIndex: V, defaultScrollKey: B } = e;
      V != null ? m({ index: V }) : B != null && m({ key: B });
    });
    let n = !1, o = !1;
    Px(() => {
      if (n = !1, !o) {
        o = !0;
        return;
      }
      m({ top: v.value, left: l.value });
    }), Tx(() => {
      n = !0, o || (o = !0);
    });
    const r = Be(() => {
      if (e.renderCol == null && e.renderItemWithCols == null || e.columns.length === 0)
        return;
      let V = 0;
      return e.columns.forEach((B) => {
        V += B.width;
      }), V;
    }), i = jr(() => {
      const V = /* @__PURE__ */ new Map(), { keyField: B } = e;
      return e.items.forEach((M, G) => {
        V.set(M[B], G);
      }), V;
    }), { scrollLeftRef: l, listWidthRef: a } = xx({
      columnsRef: Nl(e, "columns"),
      renderColRef: Nl(e, "renderCol"),
      renderItemWithColsRef: Nl(e, "renderItemWithCols")
    }), s = Wr(null), d = Wr(void 0), c = /* @__PURE__ */ new Map(), h = jr(() => {
      const { items: V, itemSize: B, keyField: M } = e, G = new ov(V.length, B);
      return V.forEach((U, Q) => {
        const oe = U[M], ne = c.get(oe);
        ne !== void 0 && G.add(Q, ne);
      }), G;
    }), p = Wr(0), v = Wr(0), f = Be(() => Math.max(h.value.getBound(v.value - zt(e.paddingTop)) - 1, 0)), g = jr(() => {
      const { value: V } = d;
      if (V === void 0)
        return [];
      const { items: B, itemSize: M } = e, G = f.value, U = Math.min(G + Math.ceil(V / M + 1), B.length - 1), Q = [];
      for (let oe = G; oe <= U; ++oe)
        Q.push(B[oe]);
      return Q;
    }), m = (V, B) => {
      if (typeof V == "number") {
        b(V, B, "auto");
        return;
      }
      const { left: M, top: G, index: U, key: Q, position: oe, behavior: ne, debounce: X = !0 } = V;
      if (M !== void 0 || G !== void 0)
        b(M, G, ne);
      else if (U !== void 0)
        $(U, ne, X);
      else if (Q !== void 0) {
        const j = i.value.get(Q);
        j !== void 0 && $(j, ne, X);
      } else oe === "bottom" ? b(0, Number.MAX_SAFE_INTEGER, ne) : oe === "top" && b(0, 0, ne);
    };
    let u, w = null;
    function $(V, B, M) {
      const { value: G } = h, U = G.sum(V) + zt(e.paddingTop);
      if (!M)
        s.value.scrollTo({
          left: 0,
          top: U,
          behavior: B
        });
      else {
        u = V, w !== null && window.clearTimeout(w), w = window.setTimeout(() => {
          u = void 0, w = null;
        }, 16);
        const { scrollTop: Q, offsetHeight: oe } = s.value;
        if (U > Q) {
          const ne = G.get(V);
          U + ne <= Q + oe || s.value.scrollTo({
            left: 0,
            top: U + ne - oe,
            behavior: B
          });
        } else
          s.value.scrollTo({
            left: 0,
            top: U,
            behavior: B
          });
      }
    }
    function b(V, B, M) {
      s.value.scrollTo({
        left: V,
        top: B,
        behavior: M
      });
    }
    function S(V, B) {
      var M, G, U;
      if (n || e.ignoreItemResize || _(B.target))
        return;
      const { value: Q } = h, oe = i.value.get(V), ne = Q.get(oe), X = (U = (G = (M = B.borderBoxSize) === null || M === void 0 ? void 0 : M[0]) === null || G === void 0 ? void 0 : G.blockSize) !== null && U !== void 0 ? U : B.contentRect.height;
      if (X === ne)
        return;
      X - e.itemSize === 0 ? c.delete(V) : c.set(V, X - e.itemSize);
      const Z = X - ne;
      if (Z === 0)
        return;
      Q.add(oe, Z);
      const te = s.value;
      if (te != null) {
        if (u === void 0) {
          const fe = Q.sum(oe);
          te.scrollTop > fe && te.scrollBy(0, Z);
        } else if (oe < u)
          te.scrollBy(0, Z);
        else if (oe === u) {
          const fe = Q.sum(oe);
          X + fe > // Note, listEl shouldn't have border, nor offsetHeight won't be
          // correct
          te.scrollTop + te.offsetHeight && te.scrollBy(0, Z);
        }
        W();
      }
      p.value++;
    }
    const C = !bx();
    let y = !1;
    function E(V) {
      var B;
      (B = e.onScroll) === null || B === void 0 || B.call(e, V), (!C || !y) && W();
    }
    function R(V) {
      var B;
      if ((B = e.onWheel) === null || B === void 0 || B.call(e, V), C) {
        const M = s.value;
        if (M != null) {
          if (V.deltaX === 0 && (M.scrollTop === 0 && V.deltaY <= 0 || M.scrollTop + M.offsetHeight >= M.scrollHeight && V.deltaY >= 0))
            return;
          V.preventDefault(), M.scrollTop += V.deltaY / Ru(), M.scrollLeft += V.deltaX / Ru(), W(), y = !0, xi(() => {
            y = !1;
          });
        }
      }
    }
    function O(V) {
      if (n || _(V.target))
        return;
      if (e.renderCol == null && e.renderItemWithCols == null) {
        if (V.contentRect.height === d.value)
          return;
      } else if (V.contentRect.height === d.value && V.contentRect.width === a.value)
        return;
      d.value = V.contentRect.height, a.value = V.contentRect.width;
      const { onResize: B } = e;
      B !== void 0 && B(V);
    }
    function W() {
      const { value: V } = s;
      V != null && (v.value = V.scrollTop, l.value = V.scrollLeft);
    }
    function _(V) {
      let B = V;
      for (; B !== null; ) {
        if (B.style.display === "none")
          return !0;
        B = B.parentElement;
      }
      return !1;
    }
    return {
      listHeight: d,
      listStyle: {
        overflow: "auto"
      },
      keyToIndex: i,
      itemsStyle: jr(() => {
        const { itemResizable: V } = e, B = ht(h.value.sum());
        return p.value, [
          e.itemsStyle,
          {
            boxSizing: "content-box",
            width: ht(r.value),
            height: V ? "" : B,
            minHeight: V ? B : "",
            paddingTop: ht(e.paddingTop),
            paddingBottom: ht(e.paddingBottom)
          }
        ];
      }),
      visibleItemsStyle: jr(() => (p.value, {
        transform: `translateY(${ht(h.value.sum(f.value))})`
      })),
      viewportItems: g,
      listElRef: s,
      itemsElRef: Wr(null),
      scrollTo: m,
      handleListResize: O,
      handleListScroll: E,
      handleListWheel: R,
      handleItemResize: S
    };
  },
  render() {
    const { itemResizable: e, keyField: t, keyToIndex: n, visibleItemsTag: o } = this;
    return Mo(Hn, {
      onResize: this.handleListResize
    }, {
      default: () => {
        var r, i;
        return Mo("div", $x(this.$attrs, {
          class: ["v-vl", this.showScrollbar && "v-vl--show-scrollbar"],
          onScroll: this.handleListScroll,
          onWheel: this.handleListWheel,
          ref: "listElRef"
        }), [
          this.items.length !== 0 ? Mo("div", {
            ref: "itemsElRef",
            class: "v-vl-items",
            style: this.itemsStyle
          }, [
            Mo(o, Object.assign({
              class: "v-vl-visible-items",
              style: this.visibleItemsStyle
            }, this.visibleItemsProps), {
              default: () => {
                const { renderCol: l, renderItemWithCols: a } = this;
                return this.viewportItems.map((s) => {
                  const d = s[t], c = n.get(d), h = l != null ? Mo(Pu, {
                    index: c,
                    item: s
                  }) : void 0, p = a != null ? Mo(Pu, {
                    index: c,
                    item: s
                  }) : void 0, v = this.$slots.default({
                    item: s,
                    renderedCols: h,
                    renderedItemWithCols: p,
                    index: c
                  })[0];
                  return e ? Mo(Hn, {
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
}), Ex = window.Vue.defineComponent, zx = window.Vue.h, Fx = window.Vue.ref, Ox = Dn(".v-x-scroll", {
  overflow: "auto",
  scrollbarWidth: "none"
}, [
  Dn("&::-webkit-scrollbar", {
    width: 0,
    height: 0
  })
]), Mx = Ex({
  name: "XScroll",
  props: {
    disabled: Boolean,
    onScroll: Function
  },
  setup() {
    const e = Fx(null);
    function t(r) {
      !(r.currentTarget.offsetWidth < r.currentTarget.scrollWidth) || r.deltaY === 0 || (r.currentTarget.scrollLeft += r.deltaY + r.deltaX, r.preventDefault());
    }
    const n = Fo();
    return Ox.mount({
      id: "vueuc/x-scroll",
      head: !0,
      anchorMetaName: sl,
      ssr: n
    }), Object.assign({
      selfRef: e,
      handleWheel: t
    }, {
      scrollTo(...r) {
        var i;
        (i = e.value) === null || i === void 0 || i.scrollTo(...r);
      }
    });
  },
  render() {
    return zx("div", {
      ref: "selfRef",
      onScroll: this.onScroll,
      onWheel: this.disabled ? void 0 : this.handleWheel,
      class: "v-x-scroll"
    }, this.$slots);
  }
}), Ix = window.Vue.defineComponent, Vx = window.Vue.renderSlot, Tu = window.Vue.h, Ax = window.Vue.onMounted, _u = window.Vue.ref, Bx = window.Vue.nextTick, Yn = "v-hidden", Lx = Dn("[v-hidden]", {
  display: "none!important"
}), Eu = Ix({
  name: "Overflow",
  props: {
    getCounter: Function,
    getTail: Function,
    updateCounter: Function,
    onUpdateCount: Function,
    onUpdateOverflow: Function
  },
  setup(e, { slots: t }) {
    const n = _u(null), o = _u(null);
    function r(l) {
      const { value: a } = n, { getCounter: s, getTail: d } = e;
      let c;
      if (s !== void 0 ? c = s() : c = o.value, !a || !c)
        return;
      c.hasAttribute(Yn) && c.removeAttribute(Yn);
      const { children: h } = a;
      if (l.showAllItemsBeforeCalculate)
        for (const $ of h)
          $.hasAttribute(Yn) && $.removeAttribute(Yn);
      const p = a.offsetWidth, v = [], f = t.tail ? d == null ? void 0 : d() : null;
      let g = f ? f.offsetWidth : 0, m = !1;
      const u = a.children.length - (t.tail ? 1 : 0);
      for (let $ = 0; $ < u - 1; ++$) {
        if ($ < 0)
          continue;
        const b = h[$];
        if (m) {
          b.hasAttribute(Yn) || b.setAttribute(Yn, "");
          continue;
        } else b.hasAttribute(Yn) && b.removeAttribute(Yn);
        const S = b.offsetWidth;
        if (g += S, v[$] = S, g > p) {
          const { updateCounter: C } = e;
          for (let y = $; y >= 0; --y) {
            const E = u - 1 - y;
            C !== void 0 ? C(E) : c.textContent = `${E}`;
            const R = c.offsetWidth;
            if (g -= v[y], g + R <= p || y === 0) {
              m = !0, $ = y - 1, f && ($ === -1 ? (f.style.maxWidth = `${p - R}px`, f.style.boxSizing = "border-box") : f.style.maxWidth = "");
              const { onUpdateCount: O } = e;
              O && O(E);
              break;
            }
          }
        }
      }
      const { onUpdateOverflow: w } = e;
      m ? w !== void 0 && w(!0) : (w !== void 0 && w(!1), c.setAttribute(Yn, ""));
    }
    const i = Fo();
    return Lx.mount({
      id: "vueuc/overflow",
      head: !0,
      anchorMetaName: sl,
      ssr: i
    }), Ax(() => r({
      showAllItemsBeforeCalculate: !1
    })), {
      selfRef: n,
      counterRef: o,
      sync: r
    };
  },
  render() {
    const { $slots: e } = this;
    return Bx(() => this.sync({
      showAllItemsBeforeCalculate: !1
    })), Tu("div", {
      class: "v-overflow",
      ref: "selfRef"
    }, [
      Vx(e, "default"),
      // $slots.counter should only has 1 element
      e.counter ? e.counter() : Tu("span", {
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
function fv(e) {
  return e instanceof HTMLElement;
}
function hv(e) {
  for (let t = 0; t < e.childNodes.length; t++) {
    const n = e.childNodes[t];
    if (fv(n) && (vv(n) || hv(n)))
      return !0;
  }
  return !1;
}
function pv(e) {
  for (let t = e.childNodes.length - 1; t >= 0; t--) {
    const n = e.childNodes[t];
    if (fv(n) && (vv(n) || pv(n)))
      return !0;
  }
  return !1;
}
function vv(e) {
  if (!Dx(e))
    return !1;
  try {
    e.focus({ preventScroll: !0 });
  } catch {
  }
  return document.activeElement === e;
}
function Dx(e) {
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
const Hl = window.Vue.h, Nx = window.Vue.defineComponent, zu = window.Vue.ref, Hx = window.Vue.Fragment, jx = window.Vue.onMounted, Wx = window.Vue.onBeforeUnmount, Ux = window.Vue.watch;
let Ur = [];
const gv = Nx({
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
    const t = Si(), n = zu(null), o = zu(null);
    let r = !1, i = !1;
    const l = typeof document > "u" ? null : document.activeElement;
    function a() {
      return Ur[Ur.length - 1] === t;
    }
    function s(m) {
      var u;
      m.code === "Escape" && a() && ((u = e.onEsc) === null || u === void 0 || u.call(e, m));
    }
    jx(() => {
      Ux(() => e.active, (m) => {
        m ? (h(), pt("keydown", document, s)) : (at("keydown", document, s), r && p());
      }, {
        immediate: !0
      });
    }), Wx(() => {
      at("keydown", document, s), r && p();
    });
    function d(m) {
      if (!i && a()) {
        const u = c();
        if (u === null || u.contains(Ci(m)))
          return;
        v("first");
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
        if (Ur.push(t), e.autoFocus) {
          const { initialFocusTo: u } = e;
          u === void 0 ? v("first") : (m = uu(u)) === null || m === void 0 || m.focus({ preventScroll: !0 });
        }
        r = !0, document.addEventListener("focus", d, !0);
      }
    }
    function p() {
      var m;
      if (e.disabled || (document.removeEventListener("focus", d, !0), Ur = Ur.filter((w) => w !== t), a()))
        return;
      const { finalFocusTo: u } = e;
      u !== void 0 ? (m = uu(u)) === null || m === void 0 || m.focus({ preventScroll: !0 }) : e.returnFocusOnDeactivated && l instanceof HTMLElement && (i = !0, l.focus({ preventScroll: !0 }), i = !1);
    }
    function v(m) {
      if (a() && e.active) {
        const u = n.value, w = o.value;
        if (u !== null && w !== null) {
          const $ = c();
          if ($ == null || $ === w) {
            i = !0, u.focus({ preventScroll: !0 }), i = !1;
            return;
          }
          i = !0;
          const b = m === "first" ? hv($) : pv($);
          i = !1, b || (i = !0, u.focus({ preventScroll: !0 }), i = !1);
        }
      }
    }
    function f(m) {
      if (i)
        return;
      const u = c();
      u !== null && (m.relatedTarget !== null && u.contains(m.relatedTarget) ? v("last") : v("first"));
    }
    function g(m) {
      i || (m.relatedTarget !== null && m.relatedTarget === n.value ? v("last") : v("first"));
    }
    return {
      focusableStartRef: n,
      focusableEndRef: o,
      focusableStyle: "position: absolute; height: 0; width: 0;",
      handleStartFocus: f,
      handleEndFocus: g
    };
  },
  render() {
    const { default: e } = this.$slots;
    if (e === void 0)
      return null;
    if (this.disabled)
      return e();
    const { active: t, focusableStyle: n } = this;
    return Hl(Hx, null, [
      Hl("div", {
        "aria-hidden": "true",
        tabindex: t ? "0" : "-1",
        ref: "focusableStartRef",
        style: n,
        onFocus: this.handleStartFocus
      }),
      e(),
      Hl("div", {
        "aria-hidden": "true",
        style: n,
        ref: "focusableEndRef",
        tabindex: t ? "0" : "-1",
        onFocus: this.handleEndFocus
      })
    ]);
  }
}), Kx = window.Vue.onBeforeUnmount, qx = window.Vue.onMounted, Gx = window.Vue.watch;
function mv(e, t) {
  t && (qx(() => {
    const {
      value: n
    } = e;
    n && ui.registerHandler(n, t);
  }), Gx(e, (n, o) => {
    o && ui.unregisterHandler(o);
  }, {
    deep: !1
  }), Kx(() => {
    const {
      value: n
    } = e;
    n && ui.unregisterHandler(n);
  }));
}
function qa(e) {
  return e.replace(/#|\(|\)|,|\s|\./g, "_");
}
const Xx = /^(\d|\.)+$/, Fu = /(\d|\.)+/;
function Et(e, {
  c: t = 1,
  offset: n = 0,
  attachPx: o = !0
} = {}) {
  if (typeof e == "number") {
    const r = (e + n) * t;
    return r === 0 ? "0" : `${r}px`;
  } else if (typeof e == "string")
    if (Xx.test(e)) {
      const r = (Number(e) + n) * t;
      return o ? r === 0 ? "0" : `${r}px` : `${r}`;
    } else {
      const r = Fu.exec(e);
      return r ? e.replace(Fu, String((Number(r[0]) + n) * t)) : e;
    }
  return e;
}
function Ou(e) {
  const {
    left: t,
    right: n,
    top: o,
    bottom: r
  } = Bt(e);
  return `${o} ${t} ${r} ${n}`;
}
function Yx(e, t) {
  if (!e) return;
  const n = document.createElement("a");
  n.href = e, t !== void 0 && (n.download = t), document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
let jl;
function Zx() {
  return jl === void 0 && (jl = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), jl;
}
const bv = /* @__PURE__ */ new WeakSet();
function Jx(e) {
  bv.add(e);
}
function Qx(e) {
  return !bv.has(e);
}
function Mu(e) {
  switch (typeof e) {
    case "string":
      return e || void 0;
    case "number":
      return String(e);
    default:
      return;
  }
}
const e1 = {
  tiny: "mini",
  small: "tiny",
  medium: "small",
  large: "medium",
  huge: "large"
};
function Iu(e) {
  const t = e1[e];
  if (t === void 0)
    throw new Error(`${e} has no smaller size.`);
  return t;
}
function Po(e, t) {
  console.error(`[naive/${e}]: ${t}`);
}
function qd(e, t) {
  throw new Error(`[naive/${e}]: ${t}`);
}
function ue(e, ...t) {
  if (Array.isArray(e))
    e.forEach((n) => ue(n, ...t));
  else
    return e(...t);
}
function wv(e) {
  return (t) => {
    t ? e.value = t.$el : e.value = null;
  };
}
const t1 = window.Vue.Comment, n1 = window.Vue.createTextVNode, o1 = window.Vue.Fragment;
function io(e, t = !0, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(n1(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        io(o, t, n);
        return;
      }
      if (o.type === o1) {
        if (o.children === null) return;
        Array.isArray(o.children) && io(o.children, t, n);
      } else {
        if (o.type === t1 && t) return;
        n.push(o);
      }
    }
  }), n;
}
function r1(e, t = "default", n = void 0) {
  const o = e[t];
  if (!o)
    return Po("getFirstSlotVNode", `slot[${t}] is empty`), null;
  const r = io(o(n));
  return r.length === 1 ? r[0] : (Po("getFirstSlotVNode", `slot[${t}] should have exactly one child`), null);
}
function Gd(e, t = "default", n = []) {
  const r = e.$slots[t];
  return r === void 0 ? n : r();
}
const i1 = window.Vue.vShow;
function a1(e) {
  var t;
  const n = (t = e.dirs) === null || t === void 0 ? void 0 : t.find(({
    dir: o
  }) => o === i1);
  return !!(n && n.value === !1);
}
function ki(e, t = [], n) {
  const o = {};
  return t.forEach((r) => {
    o[r] = e[r];
  }), Object.assign(o, n);
}
function Pi(e) {
  return Object.keys(e);
}
function fi(e) {
  const t = e.filter((n) => n !== void 0);
  if (t.length !== 0)
    return t.length === 1 ? t[0] : (n) => {
      e.forEach((o) => {
        o && o(n);
      });
    };
}
function Xd(e, t = [], n) {
  const o = {};
  return Object.getOwnPropertyNames(e).forEach((i) => {
    t.includes(i) || (o[i] = e[i]);
  }), Object.assign(o, n);
}
const Vu = window.Vue.createTextVNode;
function $n(e, ...t) {
  return typeof e == "function" ? e(...t) : typeof e == "string" ? Vu(e) : typeof e == "number" ? Vu(String(e)) : null;
}
const l1 = window.Vue.Comment, s1 = window.Vue.Fragment, d1 = window.Vue.isVNode;
function Cn(e) {
  return e.some((t) => d1(t) ? !(t.type === l1 || t.type === s1 && !Cn(t.children)) : !0) ? e : null;
}
function Rn(e, t) {
  return e && Cn(e()) || t();
}
function c1(e, t, n) {
  return e && Cn(e(t)) || n(t);
}
function Ye(e, t) {
  const n = e && Cn(e());
  return t(n || null);
}
function xr(e) {
  return !(e && Cn(e()));
}
const u1 = window.Vue.defineComponent, ad = u1({
  render() {
    var e, t;
    return (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e);
  }
}), ao = "n-config-provider", Au = window.Vue.computed, yv = window.Vue.inject, xv = window.Vue.shallowRef, Cv = "n";
function je(e = {}, t = {
  defaultBordered: !0
}) {
  const n = yv(ao, null);
  return {
    // NConfigProvider,
    inlineThemeDisabled: n == null ? void 0 : n.inlineThemeDisabled,
    mergedRtlRef: n == null ? void 0 : n.mergedRtlRef,
    mergedComponentPropsRef: n == null ? void 0 : n.mergedComponentPropsRef,
    mergedBreakpointsRef: n == null ? void 0 : n.mergedBreakpointsRef,
    mergedBorderedRef: Au(() => {
      var o, r;
      const {
        bordered: i
      } = e;
      return i !== void 0 ? i : (r = (o = n == null ? void 0 : n.mergedBorderedRef.value) !== null && o !== void 0 ? o : t.defaultBordered) !== null && r !== void 0 ? r : !0;
    }),
    mergedClsPrefixRef: n ? n.mergedClsPrefixRef : xv(Cv),
    namespaceRef: Au(() => n == null ? void 0 : n.mergedNamespaceRef.value)
  };
}
function Sv() {
  const e = yv(ao, null);
  return e ? e.mergedClsPrefixRef : xv(Cv);
}
const f1 = window.Vue.inject, h1 = window.Vue.ref, p1 = window.Vue.watchEffect;
function St(e, t, n, o) {
  n || qd("useThemeClass", "cssVarsRef is not passed");
  const r = f1(ao, null), i = r == null ? void 0 : r.mergedThemeHashRef, l = r == null ? void 0 : r.styleMountTarget, a = h1(""), s = Fo();
  let d;
  const c = `__${e}`, h = () => {
    let p = c;
    const v = t ? t.value : void 0, f = i == null ? void 0 : i.value;
    f && (p += `-${f}`), v && (p += `-${v}`);
    const {
      themeOverrides: g,
      builtinThemeOverrides: m
    } = o;
    g && (p += `-${td(JSON.stringify(g))}`), m && (p += `-${td(JSON.stringify(m))}`), a.value = p, d = () => {
      const u = n.value;
      let w = "";
      for (const $ in u)
        w += `${$}: ${u[$]};`;
      I(`.${p}`, w).mount({
        id: p,
        ssr: s,
        parent: l
      }), d = void 0;
    };
  };
  return p1(() => {
    h();
  }), {
    themeClass: a,
    onRender: () => {
      d == null || d();
    }
  };
}
const Wl = window.Vue.computed, v1 = window.Vue.inject, g1 = window.Vue.onBeforeUnmount, m1 = window.Vue.provide, ld = "n-form-item";
function lo(e, {
  defaultSize: t = "medium",
  mergedSize: n,
  mergedDisabled: o
} = {}) {
  const r = v1(ld, null);
  m1(ld, null);
  const i = Wl(n ? () => n(r) : () => {
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
  }), l = Wl(o ? () => o(r) : () => {
    const {
      disabled: s
    } = e;
    return s !== void 0 ? s : r ? r.disabled.value : !1;
  }), a = Wl(() => {
    const {
      status: s
    } = e;
    return s || (r == null ? void 0 : r.mergedValidationStatus.value);
  });
  return g1(() => {
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
const b1 = {
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
function Ul(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
function Kr(e) {
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
function qr(e) {
  return (t, n = {}) => {
    const o = n.width, r = o && e.matchPatterns[o] || e.matchPatterns[e.defaultMatchWidth], i = t.match(r);
    if (!i)
      return null;
    const l = i[0], a = o && e.parsePatterns[o] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(a) ? y1(a, (h) => h.test(l)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      w1(a, (h) => h.test(l))
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
function w1(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function y1(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function x1(e) {
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
const C1 = {
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
}, S1 = (e, t, n) => {
  let o;
  const r = C1[e];
  return typeof r == "string" ? o = r : t === 1 ? o = r.one : o = r.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + o : o + " ago" : o;
}, $1 = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, R1 = (e, t, n, o) => $1[e], k1 = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, P1 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, T1 = {
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
}, _1 = {
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
}, E1 = {
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
}, z1 = {
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
}, F1 = (e, t) => {
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
}, O1 = {
  ordinalNumber: F1,
  era: Kr({
    values: k1,
    defaultWidth: "wide"
  }),
  quarter: Kr({
    values: P1,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Kr({
    values: T1,
    defaultWidth: "wide"
  }),
  day: Kr({
    values: _1,
    defaultWidth: "wide"
  }),
  dayPeriod: Kr({
    values: E1,
    defaultWidth: "wide",
    formattingValues: z1,
    defaultFormattingWidth: "wide"
  })
}, M1 = /^(\d+)(th|st|nd|rd)?/i, I1 = /\d+/i, V1 = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, A1 = {
  any: [/^b/i, /^(a|c)/i]
}, B1 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, L1 = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, D1 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, N1 = {
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
}, H1 = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, j1 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, W1 = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, U1 = {
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
}, K1 = {
  ordinalNumber: x1({
    matchPattern: M1,
    parsePattern: I1,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: qr({
    matchPatterns: V1,
    defaultMatchWidth: "wide",
    parsePatterns: A1,
    defaultParseWidth: "any"
  }),
  quarter: qr({
    matchPatterns: B1,
    defaultMatchWidth: "wide",
    parsePatterns: L1,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: qr({
    matchPatterns: D1,
    defaultMatchWidth: "wide",
    parsePatterns: N1,
    defaultParseWidth: "any"
  }),
  day: qr({
    matchPatterns: H1,
    defaultMatchWidth: "wide",
    parsePatterns: j1,
    defaultParseWidth: "any"
  }),
  dayPeriod: qr({
    matchPatterns: W1,
    defaultMatchWidth: "any",
    parsePatterns: U1,
    defaultParseWidth: "any"
  })
}, q1 = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, G1 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, X1 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Y1 = {
  date: Ul({
    formats: q1,
    defaultWidth: "full"
  }),
  time: Ul({
    formats: G1,
    defaultWidth: "full"
  }),
  dateTime: Ul({
    formats: X1,
    defaultWidth: "full"
  })
}, Z1 = {
  code: "en-US",
  formatDistance: S1,
  formatLong: Y1,
  formatRelative: R1,
  localize: O1,
  match: K1,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, J1 = {
  name: "en-US",
  locale: Z1
};
var $v = typeof global == "object" && global && global.Object === Object && global, Q1 = typeof self == "object" && self && self.Object === Object && self, kn = $v || Q1 || Function("return this")(), To = kn.Symbol, Rv = Object.prototype, eC = Rv.hasOwnProperty, tC = Rv.toString, Gr = To ? To.toStringTag : void 0;
function nC(e) {
  var t = eC.call(e, Gr), n = e[Gr];
  try {
    e[Gr] = void 0;
    var o = !0;
  } catch {
  }
  var r = tC.call(e);
  return o && (t ? e[Gr] = n : delete e[Gr]), r;
}
var oC = Object.prototype, rC = oC.toString;
function iC(e) {
  return rC.call(e);
}
var aC = "[object Null]", lC = "[object Undefined]", Bu = To ? To.toStringTag : void 0;
function Qo(e) {
  return e == null ? e === void 0 ? lC : aC : Bu && Bu in Object(e) ? nC(e) : iC(e);
}
function _o(e) {
  return e != null && typeof e == "object";
}
var sC = "[object Symbol]";
function dl(e) {
  return typeof e == "symbol" || _o(e) && Qo(e) == sC;
}
function kv(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = Array(o); ++n < o; )
    r[n] = t(e[n], n, e);
  return r;
}
var vn = Array.isArray, Lu = To ? To.prototype : void 0, Du = Lu ? Lu.toString : void 0;
function Pv(e) {
  if (typeof e == "string")
    return e;
  if (vn(e))
    return kv(e, Pv) + "";
  if (dl(e))
    return Du ? Du.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
var dC = /\s/;
function cC(e) {
  for (var t = e.length; t-- && dC.test(e.charAt(t)); )
    ;
  return t;
}
var uC = /^\s+/;
function fC(e) {
  return e && e.slice(0, cC(e) + 1).replace(uC, "");
}
function gn(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Nu = NaN, hC = /^[-+]0x[0-9a-f]+$/i, pC = /^0b[01]+$/i, vC = /^0o[0-7]+$/i, gC = parseInt;
function Hu(e) {
  if (typeof e == "number")
    return e;
  if (dl(e))
    return Nu;
  if (gn(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = gn(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = fC(e);
  var n = pC.test(e);
  return n || vC.test(e) ? gC(e.slice(2), n ? 2 : 8) : hC.test(e) ? Nu : +e;
}
function Yd(e) {
  return e;
}
var mC = "[object AsyncFunction]", bC = "[object Function]", wC = "[object GeneratorFunction]", yC = "[object Proxy]";
function Zd(e) {
  if (!gn(e))
    return !1;
  var t = Qo(e);
  return t == bC || t == wC || t == mC || t == yC;
}
var Kl = kn["__core-js_shared__"], ju = function() {
  var e = /[^.]+$/.exec(Kl && Kl.keys && Kl.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function xC(e) {
  return !!ju && ju in e;
}
var CC = Function.prototype, SC = CC.toString;
function er(e) {
  if (e != null) {
    try {
      return SC.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var $C = /[\\^$.*+?()[\]{}|]/g, RC = /^\[object .+?Constructor\]$/, kC = Function.prototype, PC = Object.prototype, TC = kC.toString, _C = PC.hasOwnProperty, EC = RegExp(
  "^" + TC.call(_C).replace($C, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function zC(e) {
  if (!gn(e) || xC(e))
    return !1;
  var t = Zd(e) ? EC : RC;
  return t.test(er(e));
}
function FC(e, t) {
  return e == null ? void 0 : e[t];
}
function tr(e, t) {
  var n = FC(e, t);
  return zC(n) ? n : void 0;
}
var sd = tr(kn, "WeakMap"), Wu = Object.create, OC = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!gn(t))
      return {};
    if (Wu)
      return Wu(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}();
function MC(e, t, n) {
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
function IC(e, t) {
  var n = -1, o = e.length;
  for (t || (t = Array(o)); ++n < o; )
    t[n] = e[n];
  return t;
}
var VC = 800, AC = 16, BC = Date.now;
function LC(e) {
  var t = 0, n = 0;
  return function() {
    var o = BC(), r = AC - (o - n);
    if (n = o, r > 0) {
      if (++t >= VC)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function DC(e) {
  return function() {
    return e;
  };
}
var Ga = function() {
  try {
    var e = tr(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), NC = Ga ? function(e, t) {
  return Ga(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: DC(t),
    writable: !0
  });
} : Yd, HC = LC(NC), jC = 9007199254740991, WC = /^(?:0|[1-9]\d*)$/;
function Jd(e, t) {
  var n = typeof e;
  return t = t ?? jC, !!t && (n == "number" || n != "symbol" && WC.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Qd(e, t, n) {
  t == "__proto__" && Ga ? Ga(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function Mi(e, t) {
  return e === t || e !== e && t !== t;
}
var UC = Object.prototype, KC = UC.hasOwnProperty;
function qC(e, t, n) {
  var o = e[t];
  (!(KC.call(e, t) && Mi(o, n)) || n === void 0 && !(t in e)) && Qd(e, t, n);
}
function GC(e, t, n, o) {
  var r = !n;
  n || (n = {});
  for (var i = -1, l = t.length; ++i < l; ) {
    var a = t[i], s = void 0;
    s === void 0 && (s = e[a]), r ? Qd(n, a, s) : qC(n, a, s);
  }
  return n;
}
var Uu = Math.max;
function XC(e, t, n) {
  return t = Uu(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var o = arguments, r = -1, i = Uu(o.length - t, 0), l = Array(i); ++r < i; )
      l[r] = o[t + r];
    r = -1;
    for (var a = Array(t + 1); ++r < t; )
      a[r] = o[r];
    return a[t] = n(l), MC(e, this, a);
  };
}
function YC(e, t) {
  return HC(XC(e, t, Yd), e + "");
}
var ZC = 9007199254740991;
function ec(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= ZC;
}
function Pr(e) {
  return e != null && ec(e.length) && !Zd(e);
}
function JC(e, t, n) {
  if (!gn(n))
    return !1;
  var o = typeof t;
  return (o == "number" ? Pr(n) && Jd(t, n.length) : o == "string" && t in n) ? Mi(n[t], e) : !1;
}
function QC(e) {
  return YC(function(t, n) {
    var o = -1, r = n.length, i = r > 1 ? n[r - 1] : void 0, l = r > 2 ? n[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (r--, i) : void 0, l && JC(n[0], n[1], l) && (i = r < 3 ? void 0 : i, r = 1), t = Object(t); ++o < r; ) {
      var a = n[o];
      a && e(t, a, o, i);
    }
    return t;
  });
}
var eS = Object.prototype;
function tc(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || eS;
  return e === n;
}
function tS(e, t) {
  for (var n = -1, o = Array(e); ++n < e; )
    o[n] = t(n);
  return o;
}
var nS = "[object Arguments]";
function Ku(e) {
  return _o(e) && Qo(e) == nS;
}
var Tv = Object.prototype, oS = Tv.hasOwnProperty, rS = Tv.propertyIsEnumerable, Xa = Ku(/* @__PURE__ */ function() {
  return arguments;
}()) ? Ku : function(e) {
  return _o(e) && oS.call(e, "callee") && !rS.call(e, "callee");
};
function iS() {
  return !1;
}
var _v = typeof exports == "object" && exports && !exports.nodeType && exports, qu = _v && typeof module == "object" && module && !module.nodeType && module, aS = qu && qu.exports === _v, Gu = aS ? kn.Buffer : void 0, lS = Gu ? Gu.isBuffer : void 0, Ya = lS || iS, sS = "[object Arguments]", dS = "[object Array]", cS = "[object Boolean]", uS = "[object Date]", fS = "[object Error]", hS = "[object Function]", pS = "[object Map]", vS = "[object Number]", gS = "[object Object]", mS = "[object RegExp]", bS = "[object Set]", wS = "[object String]", yS = "[object WeakMap]", xS = "[object ArrayBuffer]", CS = "[object DataView]", SS = "[object Float32Array]", $S = "[object Float64Array]", RS = "[object Int8Array]", kS = "[object Int16Array]", PS = "[object Int32Array]", TS = "[object Uint8Array]", _S = "[object Uint8ClampedArray]", ES = "[object Uint16Array]", zS = "[object Uint32Array]", bt = {};
bt[SS] = bt[$S] = bt[RS] = bt[kS] = bt[PS] = bt[TS] = bt[_S] = bt[ES] = bt[zS] = !0;
bt[sS] = bt[dS] = bt[xS] = bt[cS] = bt[CS] = bt[uS] = bt[fS] = bt[hS] = bt[pS] = bt[vS] = bt[gS] = bt[mS] = bt[bS] = bt[wS] = bt[yS] = !1;
function FS(e) {
  return _o(e) && ec(e.length) && !!bt[Qo(e)];
}
function OS(e) {
  return function(t) {
    return e(t);
  };
}
var Ev = typeof exports == "object" && exports && !exports.nodeType && exports, hi = Ev && typeof module == "object" && module && !module.nodeType && module, MS = hi && hi.exports === Ev, ql = MS && $v.process, Xu = function() {
  try {
    var e = hi && hi.require && hi.require("util").types;
    return e || ql && ql.binding && ql.binding("util");
  } catch {
  }
}(), Yu = Xu && Xu.isTypedArray, nc = Yu ? OS(Yu) : FS, IS = Object.prototype, VS = IS.hasOwnProperty;
function zv(e, t) {
  var n = vn(e), o = !n && Xa(e), r = !n && !o && Ya(e), i = !n && !o && !r && nc(e), l = n || o || r || i, a = l ? tS(e.length, String) : [], s = a.length;
  for (var d in e)
    (t || VS.call(e, d)) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    r && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    Jd(d, s))) && a.push(d);
  return a;
}
function Fv(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var AS = Fv(Object.keys, Object), BS = Object.prototype, LS = BS.hasOwnProperty;
function DS(e) {
  if (!tc(e))
    return AS(e);
  var t = [];
  for (var n in Object(e))
    LS.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function oc(e) {
  return Pr(e) ? zv(e) : DS(e);
}
function NS(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var HS = Object.prototype, jS = HS.hasOwnProperty;
function WS(e) {
  if (!gn(e))
    return NS(e);
  var t = tc(e), n = [];
  for (var o in e)
    o == "constructor" && (t || !jS.call(e, o)) || n.push(o);
  return n;
}
function Ov(e) {
  return Pr(e) ? zv(e, !0) : WS(e);
}
var US = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, KS = /^\w*$/;
function rc(e, t) {
  if (vn(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || dl(e) ? !0 : KS.test(e) || !US.test(e) || t != null && e in Object(t);
}
var Ti = tr(Object, "create");
function qS() {
  this.__data__ = Ti ? Ti(null) : {}, this.size = 0;
}
function GS(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var XS = "__lodash_hash_undefined__", YS = Object.prototype, ZS = YS.hasOwnProperty;
function JS(e) {
  var t = this.__data__;
  if (Ti) {
    var n = t[e];
    return n === XS ? void 0 : n;
  }
  return ZS.call(t, e) ? t[e] : void 0;
}
var QS = Object.prototype, e$ = QS.hasOwnProperty;
function t$(e) {
  var t = this.__data__;
  return Ti ? t[e] !== void 0 : e$.call(t, e);
}
var n$ = "__lodash_hash_undefined__";
function o$(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = Ti && t === void 0 ? n$ : t, this;
}
function Yo(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Yo.prototype.clear = qS;
Yo.prototype.delete = GS;
Yo.prototype.get = JS;
Yo.prototype.has = t$;
Yo.prototype.set = o$;
function r$() {
  this.__data__ = [], this.size = 0;
}
function cl(e, t) {
  for (var n = e.length; n--; )
    if (Mi(e[n][0], t))
      return n;
  return -1;
}
var i$ = Array.prototype, a$ = i$.splice;
function l$(e) {
  var t = this.__data__, n = cl(t, e);
  if (n < 0)
    return !1;
  var o = t.length - 1;
  return n == o ? t.pop() : a$.call(t, n, 1), --this.size, !0;
}
function s$(e) {
  var t = this.__data__, n = cl(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function d$(e) {
  return cl(this.__data__, e) > -1;
}
function c$(e, t) {
  var n = this.__data__, o = cl(n, e);
  return o < 0 ? (++this.size, n.push([e, t])) : n[o][1] = t, this;
}
function so(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
so.prototype.clear = r$;
so.prototype.delete = l$;
so.prototype.get = s$;
so.prototype.has = d$;
so.prototype.set = c$;
var _i = tr(kn, "Map");
function u$() {
  this.size = 0, this.__data__ = {
    hash: new Yo(),
    map: new (_i || so)(),
    string: new Yo()
  };
}
function f$(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function ul(e, t) {
  var n = e.__data__;
  return f$(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function h$(e) {
  var t = ul(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function p$(e) {
  return ul(this, e).get(e);
}
function v$(e) {
  return ul(this, e).has(e);
}
function g$(e, t) {
  var n = ul(this, e), o = n.size;
  return n.set(e, t), this.size += n.size == o ? 0 : 1, this;
}
function co(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
co.prototype.clear = u$;
co.prototype.delete = h$;
co.prototype.get = p$;
co.prototype.has = v$;
co.prototype.set = g$;
var m$ = "Expected a function";
function ic(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(m$);
  var n = function() {
    var o = arguments, r = t ? t.apply(this, o) : o[0], i = n.cache;
    if (i.has(r))
      return i.get(r);
    var l = e.apply(this, o);
    return n.cache = i.set(r, l) || i, l;
  };
  return n.cache = new (ic.Cache || co)(), n;
}
ic.Cache = co;
var b$ = 500;
function w$(e) {
  var t = ic(e, function(o) {
    return n.size === b$ && n.clear(), o;
  }), n = t.cache;
  return t;
}
var y$ = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, x$ = /\\(\\)?/g, C$ = w$(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(y$, function(n, o, r, i) {
    t.push(r ? i.replace(x$, "$1") : o || n);
  }), t;
});
function Mv(e) {
  return e == null ? "" : Pv(e);
}
function Iv(e, t) {
  return vn(e) ? e : rc(e, t) ? [e] : C$(Mv(e));
}
function fl(e) {
  if (typeof e == "string" || dl(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function Vv(e, t) {
  t = Iv(t, e);
  for (var n = 0, o = t.length; e != null && n < o; )
    e = e[fl(t[n++])];
  return n && n == o ? e : void 0;
}
function Ei(e, t, n) {
  var o = e == null ? void 0 : Vv(e, t);
  return o === void 0 ? n : o;
}
function S$(e, t) {
  for (var n = -1, o = t.length, r = e.length; ++n < o; )
    e[r + n] = t[n];
  return e;
}
var Av = Fv(Object.getPrototypeOf, Object), $$ = "[object Object]", R$ = Function.prototype, k$ = Object.prototype, Bv = R$.toString, P$ = k$.hasOwnProperty, T$ = Bv.call(Object);
function _$(e) {
  if (!_o(e) || Qo(e) != $$)
    return !1;
  var t = Av(e);
  if (t === null)
    return !0;
  var n = P$.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && Bv.call(n) == T$;
}
function E$(e, t, n) {
  var o = -1, r = e.length;
  t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var i = Array(r); ++o < r; )
    i[o] = e[o + t];
  return i;
}
function z$(e, t, n) {
  var o = e.length;
  return n = n === void 0 ? o : n, !t && n >= o ? e : E$(e, t, n);
}
var F$ = "\\ud800-\\udfff", O$ = "\\u0300-\\u036f", M$ = "\\ufe20-\\ufe2f", I$ = "\\u20d0-\\u20ff", V$ = O$ + M$ + I$, A$ = "\\ufe0e\\ufe0f", B$ = "\\u200d", L$ = RegExp("[" + B$ + F$ + V$ + A$ + "]");
function Lv(e) {
  return L$.test(e);
}
function D$(e) {
  return e.split("");
}
var Dv = "\\ud800-\\udfff", N$ = "\\u0300-\\u036f", H$ = "\\ufe20-\\ufe2f", j$ = "\\u20d0-\\u20ff", W$ = N$ + H$ + j$, U$ = "\\ufe0e\\ufe0f", K$ = "[" + Dv + "]", dd = "[" + W$ + "]", cd = "\\ud83c[\\udffb-\\udfff]", q$ = "(?:" + dd + "|" + cd + ")", Nv = "[^" + Dv + "]", Hv = "(?:\\ud83c[\\udde6-\\uddff]){2}", jv = "[\\ud800-\\udbff][\\udc00-\\udfff]", G$ = "\\u200d", Wv = q$ + "?", Uv = "[" + U$ + "]?", X$ = "(?:" + G$ + "(?:" + [Nv, Hv, jv].join("|") + ")" + Uv + Wv + ")*", Y$ = Uv + Wv + X$, Z$ = "(?:" + [Nv + dd + "?", dd, Hv, jv, K$].join("|") + ")", J$ = RegExp(cd + "(?=" + cd + ")|" + Z$ + Y$, "g");
function Q$(e) {
  return e.match(J$) || [];
}
function e2(e) {
  return Lv(e) ? Q$(e) : D$(e);
}
function t2(e) {
  return function(t) {
    t = Mv(t);
    var n = Lv(t) ? e2(t) : void 0, o = n ? n[0] : t.charAt(0), r = n ? z$(n, 1).join("") : t.slice(1);
    return o[e]() + r;
  };
}
var n2 = t2("toUpperCase");
function o2() {
  this.__data__ = new so(), this.size = 0;
}
function r2(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function i2(e) {
  return this.__data__.get(e);
}
function a2(e) {
  return this.__data__.has(e);
}
var l2 = 200;
function s2(e, t) {
  var n = this.__data__;
  if (n instanceof so) {
    var o = n.__data__;
    if (!_i || o.length < l2 - 1)
      return o.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new co(o);
  }
  return n.set(e, t), this.size = n.size, this;
}
function jn(e) {
  var t = this.__data__ = new so(e);
  this.size = t.size;
}
jn.prototype.clear = o2;
jn.prototype.delete = r2;
jn.prototype.get = i2;
jn.prototype.has = a2;
jn.prototype.set = s2;
var Kv = typeof exports == "object" && exports && !exports.nodeType && exports, Zu = Kv && typeof module == "object" && module && !module.nodeType && module, d2 = Zu && Zu.exports === Kv, Ju = d2 ? kn.Buffer : void 0;
Ju && Ju.allocUnsafe;
function c2(e, t) {
  return e.slice();
}
function u2(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = 0, i = []; ++n < o; ) {
    var l = e[n];
    t(l, n, e) && (i[r++] = l);
  }
  return i;
}
function f2() {
  return [];
}
var h2 = Object.prototype, p2 = h2.propertyIsEnumerable, Qu = Object.getOwnPropertySymbols, v2 = Qu ? function(e) {
  return e == null ? [] : (e = Object(e), u2(Qu(e), function(t) {
    return p2.call(e, t);
  }));
} : f2;
function g2(e, t, n) {
  var o = t(e);
  return vn(e) ? o : S$(o, n(e));
}
function ef(e) {
  return g2(e, oc, v2);
}
var ud = tr(kn, "DataView"), fd = tr(kn, "Promise"), hd = tr(kn, "Set"), tf = "[object Map]", m2 = "[object Object]", nf = "[object Promise]", of = "[object Set]", rf = "[object WeakMap]", af = "[object DataView]", b2 = er(ud), w2 = er(_i), y2 = er(fd), x2 = er(hd), C2 = er(sd), So = Qo;
(ud && So(new ud(new ArrayBuffer(1))) != af || _i && So(new _i()) != tf || fd && So(fd.resolve()) != nf || hd && So(new hd()) != of || sd && So(new sd()) != rf) && (So = function(e) {
  var t = Qo(e), n = t == m2 ? e.constructor : void 0, o = n ? er(n) : "";
  if (o)
    switch (o) {
      case b2:
        return af;
      case w2:
        return tf;
      case y2:
        return nf;
      case x2:
        return of;
      case C2:
        return rf;
    }
  return t;
});
var Za = kn.Uint8Array;
function S2(e) {
  var t = new e.constructor(e.byteLength);
  return new Za(t).set(new Za(e)), t;
}
function $2(e, t) {
  var n = S2(e.buffer);
  return new e.constructor(n, e.byteOffset, e.length);
}
function R2(e) {
  return typeof e.constructor == "function" && !tc(e) ? OC(Av(e)) : {};
}
var k2 = "__lodash_hash_undefined__";
function P2(e) {
  return this.__data__.set(e, k2), this;
}
function T2(e) {
  return this.__data__.has(e);
}
function Ja(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new co(); ++t < n; )
    this.add(e[t]);
}
Ja.prototype.add = Ja.prototype.push = P2;
Ja.prototype.has = T2;
function _2(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function E2(e, t) {
  return e.has(t);
}
var z2 = 1, F2 = 2;
function qv(e, t, n, o, r, i) {
  var l = n & z2, a = e.length, s = t.length;
  if (a != s && !(l && s > a))
    return !1;
  var d = i.get(e), c = i.get(t);
  if (d && c)
    return d == t && c == e;
  var h = -1, p = !0, v = n & F2 ? new Ja() : void 0;
  for (i.set(e, t), i.set(t, e); ++h < a; ) {
    var f = e[h], g = t[h];
    if (o)
      var m = l ? o(g, f, h, t, e, i) : o(f, g, h, e, t, i);
    if (m !== void 0) {
      if (m)
        continue;
      p = !1;
      break;
    }
    if (v) {
      if (!_2(t, function(u, w) {
        if (!E2(v, w) && (f === u || r(f, u, n, o, i)))
          return v.push(w);
      })) {
        p = !1;
        break;
      }
    } else if (!(f === g || r(f, g, n, o, i))) {
      p = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), p;
}
function O2(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o, r) {
    n[++t] = [r, o];
  }), n;
}
function M2(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o) {
    n[++t] = o;
  }), n;
}
var I2 = 1, V2 = 2, A2 = "[object Boolean]", B2 = "[object Date]", L2 = "[object Error]", D2 = "[object Map]", N2 = "[object Number]", H2 = "[object RegExp]", j2 = "[object Set]", W2 = "[object String]", U2 = "[object Symbol]", K2 = "[object ArrayBuffer]", q2 = "[object DataView]", lf = To ? To.prototype : void 0, Gl = lf ? lf.valueOf : void 0;
function G2(e, t, n, o, r, i, l) {
  switch (n) {
    case q2:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case K2:
      return !(e.byteLength != t.byteLength || !i(new Za(e), new Za(t)));
    case A2:
    case B2:
    case N2:
      return Mi(+e, +t);
    case L2:
      return e.name == t.name && e.message == t.message;
    case H2:
    case W2:
      return e == t + "";
    case D2:
      var a = O2;
    case j2:
      var s = o & I2;
      if (a || (a = M2), e.size != t.size && !s)
        return !1;
      var d = l.get(e);
      if (d)
        return d == t;
      o |= V2, l.set(e, t);
      var c = qv(a(e), a(t), o, r, i, l);
      return l.delete(e), c;
    case U2:
      if (Gl)
        return Gl.call(e) == Gl.call(t);
  }
  return !1;
}
var X2 = 1, Y2 = Object.prototype, Z2 = Y2.hasOwnProperty;
function J2(e, t, n, o, r, i) {
  var l = n & X2, a = ef(e), s = a.length, d = ef(t), c = d.length;
  if (s != c && !l)
    return !1;
  for (var h = s; h--; ) {
    var p = a[h];
    if (!(l ? p in t : Z2.call(t, p)))
      return !1;
  }
  var v = i.get(e), f = i.get(t);
  if (v && f)
    return v == t && f == e;
  var g = !0;
  i.set(e, t), i.set(t, e);
  for (var m = l; ++h < s; ) {
    p = a[h];
    var u = e[p], w = t[p];
    if (o)
      var $ = l ? o(w, u, p, t, e, i) : o(u, w, p, e, t, i);
    if (!($ === void 0 ? u === w || r(u, w, n, o, i) : $)) {
      g = !1;
      break;
    }
    m || (m = p == "constructor");
  }
  if (g && !m) {
    var b = e.constructor, S = t.constructor;
    b != S && "constructor" in e && "constructor" in t && !(typeof b == "function" && b instanceof b && typeof S == "function" && S instanceof S) && (g = !1);
  }
  return i.delete(e), i.delete(t), g;
}
var Q2 = 1, sf = "[object Arguments]", df = "[object Array]", Yi = "[object Object]", eR = Object.prototype, cf = eR.hasOwnProperty;
function tR(e, t, n, o, r, i) {
  var l = vn(e), a = vn(t), s = l ? df : So(e), d = a ? df : So(t);
  s = s == sf ? Yi : s, d = d == sf ? Yi : d;
  var c = s == Yi, h = d == Yi, p = s == d;
  if (p && Ya(e)) {
    if (!Ya(t))
      return !1;
    l = !0, c = !1;
  }
  if (p && !c)
    return i || (i = new jn()), l || nc(e) ? qv(e, t, n, o, r, i) : G2(e, t, s, n, o, r, i);
  if (!(n & Q2)) {
    var v = c && cf.call(e, "__wrapped__"), f = h && cf.call(t, "__wrapped__");
    if (v || f) {
      var g = v ? e.value() : e, m = f ? t.value() : t;
      return i || (i = new jn()), r(g, m, n, o, i);
    }
  }
  return p ? (i || (i = new jn()), J2(e, t, n, o, r, i)) : !1;
}
function ac(e, t, n, o, r) {
  return e === t ? !0 : e == null || t == null || !_o(e) && !_o(t) ? e !== e && t !== t : tR(e, t, n, o, ac, r);
}
var nR = 1, oR = 2;
function rR(e, t, n, o) {
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
      var c = new jn(), h;
      if (!(h === void 0 ? ac(d, s, nR | oR, o, c) : h))
        return !1;
    }
  }
  return !0;
}
function Gv(e) {
  return e === e && !gn(e);
}
function iR(e) {
  for (var t = oc(e), n = t.length; n--; ) {
    var o = t[n], r = e[o];
    t[n] = [o, r, Gv(r)];
  }
  return t;
}
function Xv(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function aR(e) {
  var t = iR(e);
  return t.length == 1 && t[0][2] ? Xv(t[0][0], t[0][1]) : function(n) {
    return n === e || rR(n, e, t);
  };
}
function lR(e, t) {
  return e != null && t in Object(e);
}
function sR(e, t, n) {
  t = Iv(t, e);
  for (var o = -1, r = t.length, i = !1; ++o < r; ) {
    var l = fl(t[o]);
    if (!(i = e != null && n(e, l)))
      break;
    e = e[l];
  }
  return i || ++o != r ? i : (r = e == null ? 0 : e.length, !!r && ec(r) && Jd(l, r) && (vn(e) || Xa(e)));
}
function dR(e, t) {
  return e != null && sR(e, t, lR);
}
var cR = 1, uR = 2;
function fR(e, t) {
  return rc(e) && Gv(t) ? Xv(fl(e), t) : function(n) {
    var o = Ei(n, e);
    return o === void 0 && o === t ? dR(n, e) : ac(t, o, cR | uR);
  };
}
function hR(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function pR(e) {
  return function(t) {
    return Vv(t, e);
  };
}
function vR(e) {
  return rc(e) ? hR(fl(e)) : pR(e);
}
function gR(e) {
  return typeof e == "function" ? e : e == null ? Yd : typeof e == "object" ? vn(e) ? fR(e[0], e[1]) : aR(e) : vR(e);
}
function mR(e) {
  return function(t, n, o) {
    for (var r = -1, i = Object(t), l = o(t), a = l.length; a--; ) {
      var s = l[++r];
      if (n(i[s], s, i) === !1)
        break;
    }
    return t;
  };
}
var Yv = mR();
function bR(e, t) {
  return e && Yv(e, t, oc);
}
function wR(e, t) {
  return function(n, o) {
    if (n == null)
      return n;
    if (!Pr(n))
      return e(n, o);
    for (var r = n.length, i = -1, l = Object(n); ++i < r && o(l[i], i, l) !== !1; )
      ;
    return n;
  };
}
var yR = wR(bR), Xl = function() {
  return kn.Date.now();
}, xR = "Expected a function", CR = Math.max, SR = Math.min;
function $R(e, t, n) {
  var o, r, i, l, a, s, d = 0, c = !1, h = !1, p = !0;
  if (typeof e != "function")
    throw new TypeError(xR);
  t = Hu(t) || 0, gn(n) && (c = !!n.leading, h = "maxWait" in n, i = h ? CR(Hu(n.maxWait) || 0, t) : i, p = "trailing" in n ? !!n.trailing : p);
  function v(C) {
    var y = o, E = r;
    return o = r = void 0, d = C, l = e.apply(E, y), l;
  }
  function f(C) {
    return d = C, a = setTimeout(u, t), c ? v(C) : l;
  }
  function g(C) {
    var y = C - s, E = C - d, R = t - y;
    return h ? SR(R, i - E) : R;
  }
  function m(C) {
    var y = C - s, E = C - d;
    return s === void 0 || y >= t || y < 0 || h && E >= i;
  }
  function u() {
    var C = Xl();
    if (m(C))
      return w(C);
    a = setTimeout(u, g(C));
  }
  function w(C) {
    return a = void 0, p && o ? v(C) : (o = r = void 0, l);
  }
  function $() {
    a !== void 0 && clearTimeout(a), d = 0, o = s = r = a = void 0;
  }
  function b() {
    return a === void 0 ? l : w(Xl());
  }
  function S() {
    var C = Xl(), y = m(C);
    if (o = arguments, r = this, s = C, y) {
      if (a === void 0)
        return f(s);
      if (h)
        return clearTimeout(a), a = setTimeout(u, t), v(s);
    }
    return a === void 0 && (a = setTimeout(u, t)), l;
  }
  return S.cancel = $, S.flush = b, S;
}
function pd(e, t, n) {
  (n !== void 0 && !Mi(e[t], n) || n === void 0 && !(t in e)) && Qd(e, t, n);
}
function RR(e) {
  return _o(e) && Pr(e);
}
function vd(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function kR(e) {
  return GC(e, Ov(e));
}
function PR(e, t, n, o, r, i, l) {
  var a = vd(e, n), s = vd(t, n), d = l.get(s);
  if (d) {
    pd(e, n, d);
    return;
  }
  var c = i ? i(a, s, n + "", e, t, l) : void 0, h = c === void 0;
  if (h) {
    var p = vn(s), v = !p && Ya(s), f = !p && !v && nc(s);
    c = s, p || v || f ? vn(a) ? c = a : RR(a) ? c = IC(a) : v ? (h = !1, c = c2(s)) : f ? (h = !1, c = $2(s)) : c = [] : _$(s) || Xa(s) ? (c = a, Xa(a) ? c = kR(a) : (!gn(a) || Zd(a)) && (c = R2(s))) : h = !1;
  }
  h && (l.set(s, c), r(c, s, o, i, l), l.delete(s)), pd(e, n, c);
}
function Zv(e, t, n, o, r) {
  e !== t && Yv(t, function(i, l) {
    if (r || (r = new jn()), gn(i))
      PR(e, t, l, n, Zv, o, r);
    else {
      var a = o ? o(vd(e, l), i, l + "", e, t, r) : void 0;
      a === void 0 && (a = i), pd(e, l, a);
    }
  }, Ov);
}
function TR(e, t) {
  var n = -1, o = Pr(e) ? Array(e.length) : [];
  return yR(e, function(r, i, l) {
    o[++n] = t(r, i, l);
  }), o;
}
function _R(e, t) {
  var n = vn(e) ? kv : TR;
  return n(e, gR(t));
}
var Zi = QC(function(e, t, n) {
  Zv(e, t, n);
}), ER = "Expected a function";
function zR(e, t, n) {
  var o = !0, r = !0;
  if (typeof e != "function")
    throw new TypeError(ER);
  return gn(n) && (o = "leading" in n ? !!n.leading : o, r = "trailing" in n ? !!n.trailing : r), $R(e, t, {
    leading: o,
    maxWait: t,
    trailing: r
  });
}
const uf = window.Vue.computed, FR = window.Vue.inject;
function Tr(e) {
  const {
    mergedLocaleRef: t,
    mergedDateLocaleRef: n
  } = FR(ao, null) || {}, o = uf(() => {
    var i, l;
    return (l = (i = t == null ? void 0 : t.value) === null || i === void 0 ? void 0 : i[e]) !== null && l !== void 0 ? l : b1[e];
  });
  return {
    dateLocaleRef: uf(() => {
      var i;
      return (i = n == null ? void 0 : n.value) !== null && i !== void 0 ? i : J1;
    }),
    localeRef: o
  };
}
const $r = "naive-ui-style", OR = window.Vue.computed, MR = window.Vue.inject, IR = window.Vue.onBeforeMount, VR = window.Vue.watchEffect;
function Lt(e, t, n) {
  if (!t) return;
  const o = Fo(), r = OR(() => {
    const {
      value: a
    } = t;
    if (!a)
      return;
    const s = a[e];
    if (s)
      return s;
  }), i = MR(ao, null), l = () => {
    VR(() => {
      const {
        value: a
      } = n, s = `${a}${e}Rtl`;
      if (Ow(s, o)) return;
      const {
        value: d
      } = r;
      d && d.style.mount({
        id: s,
        head: !0,
        anchorMetaName: $r,
        props: {
          bPrefix: a ? `.${a}-` : void 0
        },
        ssr: o,
        parent: i == null ? void 0 : i.styleMountTarget
      });
    });
  };
  return o ? l() : IR(l), r;
}
const Pn = {
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
  fontSize: AR,
  fontFamily: BR,
  lineHeight: LR
} = Pn, Jv = I("body", `
 margin: 0;
 font-size: ${AR};
 font-family: ${BR};
 line-height: ${LR};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [I("input", `
 font-family: inherit;
 font-size: inherit;
 `)]), DR = window.Vue.inject, NR = window.Vue.onBeforeMount;
function nr(e, t, n) {
  if (!t)
    return;
  const o = Fo(), r = DR(ao, null), i = () => {
    const l = n.value;
    t.mount({
      id: l === void 0 ? e : l + e,
      head: !0,
      anchorMetaName: $r,
      props: {
        bPrefix: l ? `.${l}-` : void 0
      },
      ssr: o,
      parent: r == null ? void 0 : r.styleMountTarget
    }), r != null && r.preflightStyleDisabled || Jv.mount({
      id: "n-global",
      head: !0,
      anchorMetaName: $r,
      ssr: o,
      parent: r == null ? void 0 : r.styleMountTarget
    });
  };
  o ? i() : NR(i);
}
const HR = window.Vue.computed, jR = window.Vue.inject, WR = window.Vue.onBeforeMount;
function _e(e, t, n, o, r, i) {
  const l = Fo(), a = jR(ao, null);
  if (n) {
    const d = () => {
      const c = i == null ? void 0 : i.value;
      n.mount({
        id: c === void 0 ? t : c + t,
        head: !0,
        props: {
          bPrefix: c ? `.${c}-` : void 0
        },
        anchorMetaName: $r,
        ssr: l,
        parent: a == null ? void 0 : a.styleMountTarget
      }), a != null && a.preflightStyleDisabled || Jv.mount({
        id: "n-global",
        head: !0,
        anchorMetaName: $r,
        ssr: l,
        parent: a == null ? void 0 : a.styleMountTarget
      });
    };
    l ? d() : WR(d);
  }
  return HR(() => {
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
      common: g,
      peers: m
    } = v, {
      common: u = void 0,
      [e]: {
        common: w = void 0,
        self: $ = void 0,
        peers: b = {}
      } = {}
    } = (a == null ? void 0 : a.mergedThemeRef.value) || {}, {
      common: S = void 0,
      [e]: C = {}
    } = (a == null ? void 0 : a.mergedThemeOverridesRef.value) || {}, {
      common: y,
      peers: E = {}
    } = C, R = Zi({}, c || w || u || o.common, S, y, g), O = Zi(
      // {}, executed every time, no need for empty obj
      (d = h || $ || o.self) === null || d === void 0 ? void 0 : d(R),
      f,
      C,
      v
    );
    return {
      common: R,
      self: O,
      peers: Zi({}, o.peers, b, p),
      peerOverrides: Zi({}, f.peers, E, m)
    };
  });
}
_e.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object
};
const UR = P("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [I("svg", `
 height: 1em;
 width: 1em;
 `)]), KR = window.Vue.defineComponent, qR = window.Vue.h, GR = window.Vue.toRef, _t = KR({
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
    nr("-base-icon", UR, GR(e, "clsPrefix"));
  },
  render() {
    return qR("i", {
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
}), XR = window.Vue.defineComponent, YR = window.Vue.h, ZR = window.Vue.Transition, _r = XR({
  name: "BaseIconSwitchTransition",
  setup(e, {
    slots: t
  }) {
    const n = Fi();
    return () => YR(ZR, {
      name: "icon-switch-transition",
      appear: n.value
    }, t);
  }
}), JR = window.Vue.defineComponent, ff = window.Vue.h, Qv = JR({
  name: "Add",
  render() {
    return ff("svg", {
      width: "512",
      height: "512",
      viewBox: "0 0 512 512",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, ff("path", {
      d: "M256 112V400M400 256H112",
      stroke: "currentColor",
      "stroke-width": "32",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }));
  }
}), QR = window.Vue.defineComponent, Ji = window.Vue.h, ek = QR({
  name: "ArrowDown",
  render() {
    return Ji("svg", {
      viewBox: "0 0 28 28",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Ji("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, Ji("g", {
      "fill-rule": "nonzero"
    }, Ji("path", {
      d: "M23.7916,15.2664 C24.0788,14.9679 24.0696,14.4931 23.7711,14.206 C23.4726,13.9188 22.9978,13.928 22.7106,14.2265 L14.7511,22.5007 L14.7511,3.74792 C14.7511,3.33371 14.4153,2.99792 14.0011,2.99792 C13.5869,2.99792 13.2511,3.33371 13.2511,3.74793 L13.2511,22.4998 L5.29259,14.2265 C5.00543,13.928 4.53064,13.9188 4.23213,14.206 C3.93361,14.4931 3.9244,14.9679 4.21157,15.2664 L13.2809,24.6944 C13.6743,25.1034 14.3289,25.1034 14.7223,24.6944 L23.7916,15.2664 Z"
    }))));
  }
}), hf = window.Vue.defineComponent, tk = window.Vue.h, nk = window.Vue.inject;
function Er(e, t) {
  const n = hf({
    render() {
      return t();
    }
  });
  return hf({
    name: n2(e),
    setup() {
      var o;
      const r = (o = nk(ao, null)) === null || o === void 0 ? void 0 : o.mergedIconsRef;
      return () => {
        var i;
        const l = (i = r == null ? void 0 : r.value) === null || i === void 0 ? void 0 : i[e];
        return l ? l() : tk(n, null);
      };
    }
  });
}
const ok = window.Vue.defineComponent, pf = window.Vue.h, vf = ok({
  name: "Backward",
  render() {
    return pf("svg", {
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, pf("path", {
      d: "M12.2674 15.793C11.9675 16.0787 11.4927 16.0672 11.2071 15.7673L6.20572 10.5168C5.9298 10.2271 5.9298 9.7719 6.20572 9.48223L11.2071 4.23177C11.4927 3.93184 11.9675 3.92031 12.2674 4.206C12.5673 4.49169 12.5789 4.96642 12.2932 5.26634L7.78458 9.99952L12.2932 14.7327C12.5789 15.0326 12.5673 15.5074 12.2674 15.793Z",
      fill: "currentColor"
    }));
  }
}), rk = window.Vue.defineComponent, Yl = window.Vue.h, ik = rk({
  name: "Checkmark",
  render() {
    return Yl("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 16 16"
    }, Yl("g", {
      fill: "none"
    }, Yl("path", {
      d: "M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",
      fill: "currentColor"
    })));
  }
}), ak = window.Vue.defineComponent, gf = window.Vue.h, eg = ak({
  name: "ChevronDown",
  render() {
    return gf("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, gf("path", {
      d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z",
      fill: "currentColor"
    }));
  }
}), lk = window.Vue.defineComponent, mf = window.Vue.h, tg = lk({
  name: "ChevronRight",
  render() {
    return mf("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, mf("path", {
      d: "M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z",
      fill: "currentColor"
    }));
  }
}), Qi = window.Vue.h, sk = Er("clear", () => Qi("svg", {
  viewBox: "0 0 16 16",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, Qi("g", {
  stroke: "none",
  "stroke-width": "1",
  fill: "none",
  "fill-rule": "evenodd"
}, Qi("g", {
  fill: "currentColor",
  "fill-rule": "nonzero"
}, Qi("path", {
  d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z"
}))))), ea = window.Vue.h, dk = Er("close", () => ea("svg", {
  viewBox: "0 0 12 12",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": !0
}, ea("g", {
  stroke: "none",
  "stroke-width": "1",
  fill: "none",
  "fill-rule": "evenodd"
}, ea("g", {
  fill: "currentColor",
  "fill-rule": "nonzero"
}, ea("path", {
  d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
}))))), ck = window.Vue.defineComponent, Zl = window.Vue.h, uk = ck({
  name: "Empty",
  render() {
    return Zl("svg", {
      viewBox: "0 0 28 28",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, Zl("path", {
      d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",
      fill: "currentColor"
    }), Zl("path", {
      d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",
      fill: "currentColor"
    }));
  }
}), ta = window.Vue.h, fk = Er("error", () => ta("svg", {
  viewBox: "0 0 48 48",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, ta("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, ta("g", {
  "fill-rule": "nonzero"
}, ta("path", {
  d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z"
}))))), hk = window.Vue.defineComponent, Jl = window.Vue.h, pk = hk({
  name: "Eye",
  render() {
    return Jl("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, Jl("path", {
      d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "32"
    }), Jl("circle", {
      cx: "256",
      cy: "256",
      r: "80",
      fill: "none",
      stroke: "currentColor",
      "stroke-miterlimit": "10",
      "stroke-width": "32"
    }));
  }
}), vk = window.Vue.defineComponent, dr = window.Vue.h, gk = vk({
  name: "EyeOff",
  render() {
    return dr("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, dr("path", {
      d: "M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z",
      fill: "currentColor"
    }), dr("path", {
      d: "M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z",
      fill: "currentColor"
    }), dr("path", {
      d: "M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z",
      fill: "currentColor"
    }), dr("path", {
      d: "M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z",
      fill: "currentColor"
    }), dr("path", {
      d: "M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z",
      fill: "currentColor"
    }));
  }
}), mk = window.Vue.defineComponent, na = window.Vue.h, bf = mk({
  name: "FastBackward",
  render() {
    return na("svg", {
      viewBox: "0 0 20 20",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, na("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, na("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, na("path", {
      d: "M8.73171,16.7949 C9.03264,17.0795 9.50733,17.0663 9.79196,16.7654 C10.0766,16.4644 10.0634,15.9897 9.76243,15.7051 L4.52339,10.75 L17.2471,10.75 C17.6613,10.75 17.9971,10.4142 17.9971,10 C17.9971,9.58579 17.6613,9.25 17.2471,9.25 L4.52112,9.25 L9.76243,4.29275 C10.0634,4.00812 10.0766,3.53343 9.79196,3.2325 C9.50733,2.93156 9.03264,2.91834 8.73171,3.20297 L2.31449,9.27241 C2.14819,9.4297 2.04819,9.62981 2.01448,9.8386 C2.00308,9.89058 1.99707,9.94459 1.99707,10 C1.99707,10.0576 2.00356,10.1137 2.01585,10.1675 C2.05084,10.3733 2.15039,10.5702 2.31449,10.7254 L8.73171,16.7949 Z"
    }))));
  }
}), bk = window.Vue.defineComponent, oa = window.Vue.h, wf = bk({
  name: "FastForward",
  render() {
    return oa("svg", {
      viewBox: "0 0 20 20",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, oa("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, oa("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, oa("path", {
      d: "M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z"
    }))));
  }
}), wk = window.Vue.defineComponent, ra = window.Vue.h, yk = wk({
  name: "Filter",
  render() {
    return ra("svg", {
      viewBox: "0 0 28 28",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, ra("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, ra("g", {
      "fill-rule": "nonzero"
    }, ra("path", {
      d: "M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z"
    }))));
  }
}), xk = window.Vue.defineComponent, yf = window.Vue.h, xf = xk({
  name: "Forward",
  render() {
    return yf("svg", {
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, yf("path", {
      d: "M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z",
      fill: "currentColor"
    }));
  }
}), ia = window.Vue.h, Ck = Er("info", () => ia("svg", {
  viewBox: "0 0 28 28",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, ia("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, ia("g", {
  "fill-rule": "nonzero"
}, ia("path", {
  d: "M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z"
}))))), Sk = window.Vue.defineComponent, aa = window.Vue.h, Cf = Sk({
  name: "More",
  render() {
    return aa("svg", {
      viewBox: "0 0 16 16",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, aa("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, aa("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, aa("path", {
      d: "M4,7 C4.55228,7 5,7.44772 5,8 C5,8.55229 4.55228,9 4,9 C3.44772,9 3,8.55229 3,8 C3,7.44772 3.44772,7 4,7 Z M8,7 C8.55229,7 9,7.44772 9,8 C9,8.55229 8.55229,9 8,9 C7.44772,9 7,8.55229 7,8 C7,7.44772 7.44772,7 8,7 Z M12,7 C12.5523,7 13,7.44772 13,8 C13,8.55229 12.5523,9 12,9 C11.4477,9 11,8.55229 11,8 C11,7.44772 11.4477,7 12,7 Z"
    }))));
  }
}), $k = window.Vue.defineComponent, Sf = window.Vue.h, Rk = $k({
  name: "Remove",
  render() {
    return Sf("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, Sf("line", {
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
}), la = window.Vue.h, kk = Er("success", () => la("svg", {
  viewBox: "0 0 48 48",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, la("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, la("g", {
  "fill-rule": "nonzero"
}, la("path", {
  d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z"
}))))), sa = window.Vue.h, Pk = Er("warning", () => sa("svg", {
  viewBox: "0 0 24 24",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, sa("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, sa("g", {
  "fill-rule": "nonzero"
}, sa("path", {
  d: "M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z"
}))))), {
  cubicBezierEaseInOut: Tk
} = Pn;
function hn({
  originalTransform: e = "",
  left: t = 0,
  top: n = 0,
  transition: o = `all .3s ${Tk} !important`
} = {}) {
  return [I("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
    transform: `${e} scale(0.75)`,
    left: t,
    top: n,
    opacity: 0
  }), I("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
    transform: `scale(1) ${e}`,
    left: t,
    top: n,
    opacity: 1
  }), I("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
    transformOrigin: "center",
    position: "absolute",
    left: t,
    top: n,
    transition: o
  })];
}
const _k = P("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [I(">", [L("clear", `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `, [I("&:hover", `
 color: var(--n-clear-color-hover)!important;
 `), I("&:active", `
 color: var(--n-clear-color-pressed)!important;
 `)]), L("placeholder", `
 display: flex;
 `), L("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [hn({
  originalTransform: "translateX(-50%) translateY(-50%)",
  left: "50%",
  top: "50%"
})])])]), Ek = window.Vue.defineComponent, cr = window.Vue.h, zk = window.Vue.toRef, gd = Ek({
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
    return nr("-base-clear", _k, zk(e, "clsPrefix")), {
      handleMouseDown(t) {
        t.preventDefault();
      }
    };
  },
  render() {
    const {
      clsPrefix: e
    } = this;
    return cr("div", {
      class: `${e}-base-clear`
    }, cr(_r, null, {
      default: () => {
        var t, n;
        return this.show ? cr("div", {
          key: "dismiss",
          class: `${e}-base-clear__clear`,
          onClick: this.onClear,
          onMousedown: this.handleMouseDown,
          "data-clear": !0
        }, Rn(this.$slots.icon, () => [cr(_t, {
          clsPrefix: e
        }, {
          default: () => cr(sk, null)
        })])) : cr("div", {
          key: "icon",
          class: `${e}-base-clear__placeholder`
        }, (n = (t = this.$slots).placeholder) === null || n === void 0 ? void 0 : n.call(t));
      }
    }));
  }
}), Fk = P("base-close", `
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
`, [N("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `), I("&::before", `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `), rt("disabled", [I("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), I("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), I("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), I("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), I("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), N("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), N("round", [I("&::before", `
 border-radius: 50%;
 `)])]), Ok = window.Vue.defineComponent, Ql = window.Vue.h, Mk = window.Vue.toRef, hl = Ok({
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
    return nr("-base-close", Fk, Mk(e, "clsPrefix")), () => {
      const {
        clsPrefix: t,
        disabled: n,
        absolute: o,
        round: r,
        isButtonTag: i
      } = e;
      return Ql(i ? "button" : "div", {
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
      }, Ql(_t, {
        clsPrefix: t
      }, {
        default: () => Ql(dk, null)
      }));
    };
  }
}), Ik = window.Vue.defineComponent, Vk = window.Vue.h, Ak = window.Vue.Transition, Bk = window.Vue.TransitionGroup, Lk = Ik({
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
      } = e, h = a ? Bk : Ak, p = {
        name: s ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
        appear: d,
        onEnter: i,
        onAfterEnter: l,
        onBeforeLeave: n,
        onLeave: o,
        onAfterLeave: r
      };
      return a || (p.mode = c), Vk(h, p, t);
    };
  }
}), Dk = window.Vue.defineComponent, Nk = window.Vue.h, Hk = Dk({
  props: {
    onFocus: Function,
    onBlur: Function
  },
  setup(e) {
    return () => Nk("div", {
      style: "width: 0; height: 0",
      tabindex: 0,
      onFocus: e.onFocus,
      onBlur: e.onBlur
    });
  }
}), jk = I([I("@keyframes rotator", `
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`), P("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [L("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [hn()]), L("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [hn({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})]), L("container", `
 animation: rotator 3s linear infinite both;
 `, [L("icon", `
 height: 1em;
 width: 1em;
 `)])])]), Wk = window.Vue.defineComponent, mn = window.Vue.h, Uk = window.Vue.toRef, es = "1.6s", Kk = {
  strokeWidth: {
    type: Number,
    default: 28
  },
  stroke: {
    type: String,
    default: void 0
  }
}, zr = Wk({
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
  }, Kk),
  setup(e) {
    nr("-base-loading", jk, Uk(e, "clsPrefix"));
  },
  render() {
    const {
      clsPrefix: e,
      radius: t,
      strokeWidth: n,
      stroke: o,
      scale: r
    } = this, i = t / r;
    return mn("div", {
      class: `${e}-base-loading`,
      role: "img",
      "aria-label": "loading"
    }, mn(_r, null, {
      default: () => this.show ? mn("div", {
        key: "icon",
        class: `${e}-base-loading__transition-wrapper`
      }, mn("div", {
        class: `${e}-base-loading__container`
      }, mn("svg", {
        class: `${e}-base-loading__icon`,
        viewBox: `0 0 ${2 * i} ${2 * i}`,
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          color: o
        }
      }, mn("g", null, mn("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        values: `0 ${i} ${i};270 ${i} ${i}`,
        begin: "0s",
        dur: es,
        fill: "freeze",
        repeatCount: "indefinite"
      }), mn("circle", {
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
      }, mn("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        values: `0 ${i} ${i};135 ${i} ${i};450 ${i} ${i}`,
        begin: "0s",
        dur: es,
        fill: "freeze",
        repeatCount: "indefinite"
      }), mn("animate", {
        attributeName: "stroke-dashoffset",
        values: `${5.67 * t};${1.42 * t};${5.67 * t}`,
        begin: "0s",
        dur: es,
        fill: "freeze",
        repeatCount: "indefinite"
      })))))) : mn("div", {
        key: "placeholder",
        class: `${e}-base-loading__placeholder`
      }, this.$slots)
    }));
  }
}), {
  cubicBezierEaseInOut: $f
} = Pn;
function ng({
  name: e = "fade-in",
  enterDuration: t = "0.2s",
  leaveDuration: n = "0.2s",
  enterCubicBezier: o = $f,
  leaveCubicBezier: r = $f
} = {}) {
  return [I(`&.${e}-transition-enter-active`, {
    transition: `all ${t} ${o}!important`
  }), I(`&.${e}-transition-leave-active`, {
    transition: `all ${n} ${r}!important`
  }), I(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
    opacity: 0
  }), I(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`, {
    opacity: 1
  })];
}
const ze = {
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
}, qk = ko(ze.neutralBase), og = ko(ze.neutralInvertBase), Gk = `rgba(${og.slice(0, 3).join(", ")}, `;
function Rf(e) {
  return `${Gk + String(e)})`;
}
function Dt(e) {
  const t = Array.from(og);
  return t[3] = Number(e), Je(qk, t);
}
const wt = Object.assign(Object.assign({
  name: "common"
}, Pn), {
  baseColor: ze.neutralBase,
  // primary color
  primaryColor: ze.primaryDefault,
  primaryColorHover: ze.primaryHover,
  primaryColorPressed: ze.primaryActive,
  primaryColorSuppl: ze.primarySuppl,
  // info color
  infoColor: ze.infoDefault,
  infoColorHover: ze.infoHover,
  infoColorPressed: ze.infoActive,
  infoColorSuppl: ze.infoSuppl,
  // success color
  successColor: ze.successDefault,
  successColorHover: ze.successHover,
  successColorPressed: ze.successActive,
  successColorSuppl: ze.successSuppl,
  // warning color
  warningColor: ze.warningDefault,
  warningColorHover: ze.warningHover,
  warningColorPressed: ze.warningActive,
  warningColorSuppl: ze.warningSuppl,
  // error color
  errorColor: ze.errorDefault,
  errorColorHover: ze.errorHover,
  errorColorPressed: ze.errorActive,
  errorColorSuppl: ze.errorSuppl,
  // text color
  textColorBase: ze.neutralTextBase,
  textColor1: "rgb(31, 34, 37)",
  textColor2: "rgb(51, 54, 57)",
  textColor3: "rgb(118, 124, 130)",
  // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
  // textColor5: neutral(base.alpha5),
  textColorDisabled: Dt(ze.alpha4),
  placeholderColor: Dt(ze.alpha4),
  placeholderColorDisabled: Dt(ze.alpha5),
  iconColor: Dt(ze.alpha4),
  iconColorHover: Hi(Dt(ze.alpha4), {
    lightness: 0.75
  }),
  iconColorPressed: Hi(Dt(ze.alpha4), {
    lightness: 0.9
  }),
  iconColorDisabled: Dt(ze.alpha5),
  opacity1: ze.alpha1,
  opacity2: ze.alpha2,
  opacity3: ze.alpha3,
  opacity4: ze.alpha4,
  opacity5: ze.alpha5,
  dividerColor: "rgb(239, 239, 245)",
  borderColor: "rgb(224, 224, 230)",
  // close
  closeIconColor: Dt(Number(ze.alphaClose)),
  closeIconColorHover: Dt(Number(ze.alphaClose)),
  closeIconColorPressed: Dt(Number(ze.alphaClose)),
  closeColorHover: "rgba(0, 0, 0, .09)",
  closeColorPressed: "rgba(0, 0, 0, .13)",
  // clear
  clearColor: Dt(ze.alpha4),
  clearColorHover: Hi(Dt(ze.alpha4), {
    lightness: 0.75
  }),
  clearColorPressed: Hi(Dt(ze.alpha4), {
    lightness: 0.9
  }),
  scrollbarColor: Rf(ze.alphaScrollbar),
  scrollbarColorHover: Rf(ze.alphaScrollbarHover),
  scrollbarWidth: "5px",
  scrollbarHeight: "5px",
  scrollbarBorderRadius: "5px",
  progressRailColor: Dt(ze.alphaProgressRail),
  railColor: "rgb(219, 219, 223)",
  popoverColor: ze.neutralPopover,
  tableColor: ze.neutralCard,
  cardColor: ze.neutralCard,
  modalColor: ze.neutralModal,
  bodyColor: ze.neutralBody,
  tagColor: "#eee",
  avatarColor: Dt(ze.alphaAvatar),
  invertedColor: "rgb(0, 20, 40)",
  inputColor: Dt(ze.alphaInput),
  codeColor: "rgb(244, 244, 248)",
  tabColor: "rgb(247, 247, 250)",
  actionColor: "rgb(250, 250, 252)",
  tableHeaderColor: "rgb(250, 250, 252)",
  hoverColor: "rgb(243, 243, 245)",
  // use color with alpha since it can be nested with header filter & sorter effect
  tableColorHover: "rgba(0, 0, 100, 0.03)",
  tableColorStriped: "rgba(0, 0, 100, 0.02)",
  pressedColor: "rgb(237, 237, 239)",
  opacityDisabled: ze.alphaDisabled,
  inputColorDisabled: "rgb(250, 250, 252)",
  // secondary button color
  // can also be used in tertiary button & quaternary button
  buttonColor2: "rgba(46, 51, 56, .05)",
  buttonColor2Hover: "rgba(46, 51, 56, .09)",
  buttonColor2Pressed: "rgba(46, 51, 56, .13)",
  boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
  boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
  boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
}), Xk = {
  railInsetHorizontalBottom: "auto 2px 4px 2px",
  railInsetHorizontalTop: "4px 2px auto 2px",
  railInsetVerticalRight: "2px 4px 2px auto",
  railInsetVerticalLeft: "2px auto 2px 4px",
  railColor: "transparent"
};
function Yk(e) {
  const {
    scrollbarColor: t,
    scrollbarColorHover: n,
    scrollbarHeight: o,
    scrollbarWidth: r,
    scrollbarBorderRadius: i
  } = e;
  return Object.assign(Object.assign({}, Xk), {
    height: o,
    width: r,
    borderRadius: i,
    color: t,
    colorHover: n
  });
}
const Fr = {
  name: "Scrollbar",
  common: wt,
  self: Yk
}, Zk = P("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [I(">", [P("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `, [I("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), I(">", [
  // We can't set overflow hidden since it affects positioning.
  P("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)
])])]), I(">, +", [P("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `, [N("horizontal", `
 height: var(--n-scrollbar-height);
 `, [I(">", [L("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), N("horizontal--top", `
 top: var(--n-scrollbar-rail-top-horizontal-top); 
 right: var(--n-scrollbar-rail-right-horizontal-top); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-top); 
 left: var(--n-scrollbar-rail-left-horizontal-top); 
 `), N("horizontal--bottom", `
 top: var(--n-scrollbar-rail-top-horizontal-bottom); 
 right: var(--n-scrollbar-rail-right-horizontal-bottom); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-bottom); 
 left: var(--n-scrollbar-rail-left-horizontal-bottom); 
 `), N("vertical", `
 width: var(--n-scrollbar-width);
 `, [I(">", [L("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), N("vertical--left", `
 top: var(--n-scrollbar-rail-top-vertical-left); 
 right: var(--n-scrollbar-rail-right-vertical-left); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-left); 
 left: var(--n-scrollbar-rail-left-vertical-left); 
 `), N("vertical--right", `
 top: var(--n-scrollbar-rail-top-vertical-right); 
 right: var(--n-scrollbar-rail-right-vertical-right); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-right); 
 left: var(--n-scrollbar-rail-left-vertical-right); 
 `), N("disabled", [I(">", [L("scrollbar", "pointer-events: none;")])]), I(">", [L("scrollbar", `
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [ng(), I("&:hover", "background-color: var(--n-scrollbar-color-hover);")])])])])]), Wt = window.Vue.computed, Jk = window.Vue.defineComponent, Qk = window.Vue.Fragment, sn = window.Vue.h, eP = window.Vue.mergeProps, tP = window.Vue.onBeforeUnmount, nP = window.Vue.onMounted, Ut = window.Vue.ref, kf = window.Vue.Transition, oP = window.Vue.watchEffect, rP = Object.assign(Object.assign({}, _e.props), {
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
}), or = Jk({
  name: "Scrollbar",
  props: rP,
  inheritAttrs: !1,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n,
      mergedRtlRef: o
    } = je(e), r = Lt("Scrollbar", o, t), i = Ut(null), l = Ut(null), a = Ut(null), s = Ut(null), d = Ut(null), c = Ut(null), h = Ut(null), p = Ut(null), v = Ut(null), f = Ut(null), g = Ut(null), m = Ut(0), u = Ut(0), w = Ut(!1), $ = Ut(!1);
    let b = !1, S = !1, C, y, E = 0, R = 0, O = 0, W = 0;
    const _ = $0(), V = _e("Scrollbar", "-scrollbar", Zk, Fr, e, t), B = Wt(() => {
      const {
        value: x
      } = p, {
        value: A
      } = c, {
        value: ee
      } = f;
      return x === null || A === null || ee === null ? 0 : Math.min(x, ee * x / A + zt(V.value.self.width) * 1.5);
    }), M = Wt(() => `${B.value}px`), G = Wt(() => {
      const {
        value: x
      } = v, {
        value: A
      } = h, {
        value: ee
      } = g;
      return x === null || A === null || ee === null ? 0 : ee * x / A + zt(V.value.self.height) * 1.5;
    }), U = Wt(() => `${G.value}px`), Q = Wt(() => {
      const {
        value: x
      } = p, {
        value: A
      } = m, {
        value: ee
      } = c, {
        value: Y
      } = f;
      if (x === null || ee === null || Y === null)
        return 0;
      {
        const ae = ee - x;
        return ae ? A / ae * (Y - B.value) : 0;
      }
    }), oe = Wt(() => `${Q.value}px`), ne = Wt(() => {
      const {
        value: x
      } = v, {
        value: A
      } = u, {
        value: ee
      } = h, {
        value: Y
      } = g;
      if (x === null || ee === null || Y === null)
        return 0;
      {
        const ae = ee - x;
        return ae ? A / ae * (Y - G.value) : 0;
      }
    }), X = Wt(() => `${ne.value}px`), j = Wt(() => {
      const {
        value: x
      } = p, {
        value: A
      } = c;
      return x !== null && A !== null && A > x;
    }), Z = Wt(() => {
      const {
        value: x
      } = v, {
        value: A
      } = h;
      return x !== null && A !== null && A > x;
    }), te = Wt(() => {
      const {
        trigger: x
      } = e;
      return x === "none" || w.value;
    }), fe = Wt(() => {
      const {
        trigger: x
      } = e;
      return x === "none" || $.value;
    }), he = Wt(() => {
      const {
        container: x
      } = e;
      return x ? x() : l.value;
    }), ve = Wt(() => {
      const {
        content: x
      } = e;
      return x ? x() : a.value;
    }), ye = (x, A) => {
      if (!e.scrollable) return;
      if (typeof x == "number") {
        Te(x, A ?? 0, 0, !1, "auto");
        return;
      }
      const {
        left: ee,
        top: Y,
        index: ae,
        elSize: me,
        position: pe,
        behavior: Ce,
        el: Ie,
        debounce: Xe = !0
      } = x;
      (ee !== void 0 || Y !== void 0) && Te(ee ?? 0, Y ?? 0, 0, !1, Ce), Ie !== void 0 ? Te(0, Ie.offsetTop, Ie.offsetHeight, Xe, Ce) : ae !== void 0 && me !== void 0 ? Te(0, ae * me, me, Xe, Ce) : pe === "bottom" ? Te(0, Number.MAX_SAFE_INTEGER, 0, !1, Ce) : pe === "top" && Te(0, 0, 0, !1, Ce);
    }, J = ry(() => {
      e.container || ye({
        top: m.value,
        left: u.value
      });
    }), ge = () => {
      J.isDeactivated || K();
    }, Ee = (x) => {
      if (J.isDeactivated) return;
      const {
        onResize: A
      } = e;
      A && A(x), K();
    }, xe = (x, A) => {
      if (!e.scrollable) return;
      const {
        value: ee
      } = he;
      ee && (typeof x == "object" ? ee.scrollBy(x) : ee.scrollBy(x, A || 0));
    };
    function Te(x, A, ee, Y, ae) {
      const {
        value: me
      } = he;
      if (me) {
        if (Y) {
          const {
            scrollTop: pe,
            offsetHeight: Ce
          } = me;
          if (A > pe) {
            A + ee <= pe + Ce || me.scrollTo({
              left: x,
              top: A + ee - Ce,
              behavior: ae
            });
            return;
          }
        }
        me.scrollTo({
          left: x,
          top: A,
          behavior: ae
        });
      }
    }
    function Re() {
      k(), z(), K();
    }
    function Le() {
      Fe();
    }
    function Fe() {
      de(), T();
    }
    function de() {
      y !== void 0 && window.clearTimeout(y), y = window.setTimeout(() => {
        $.value = !1;
      }, e.duration);
    }
    function T() {
      C !== void 0 && window.clearTimeout(C), C = window.setTimeout(() => {
        w.value = !1;
      }, e.duration);
    }
    function k() {
      C !== void 0 && window.clearTimeout(C), w.value = !0;
    }
    function z() {
      y !== void 0 && window.clearTimeout(y), $.value = !0;
    }
    function H(x) {
      const {
        onScroll: A
      } = e;
      A && A(x), re();
    }
    function re() {
      const {
        value: x
      } = he;
      x && (m.value = x.scrollTop, u.value = x.scrollLeft * (r != null && r.value ? -1 : 1));
    }
    function le() {
      const {
        value: x
      } = ve;
      x && (c.value = x.offsetHeight, h.value = x.offsetWidth);
      const {
        value: A
      } = he;
      A && (p.value = A.offsetHeight, v.value = A.offsetWidth);
      const {
        value: ee
      } = d, {
        value: Y
      } = s;
      ee && (g.value = ee.offsetWidth), Y && (f.value = Y.offsetHeight);
    }
    function F() {
      const {
        value: x
      } = he;
      x && (m.value = x.scrollTop, u.value = x.scrollLeft * (r != null && r.value ? -1 : 1), p.value = x.offsetHeight, v.value = x.offsetWidth, c.value = x.scrollHeight, h.value = x.scrollWidth);
      const {
        value: A
      } = d, {
        value: ee
      } = s;
      A && (g.value = A.offsetWidth), ee && (f.value = ee.offsetHeight);
    }
    function K() {
      e.scrollable && (e.useUnifiedContainer ? F() : (le(), re()));
    }
    function be(x) {
      var A;
      return !(!((A = i.value) === null || A === void 0) && A.contains(Ci(x)));
    }
    function Pe(x) {
      x.preventDefault(), x.stopPropagation(), S = !0, pt("mousemove", window, Ke, !0), pt("mouseup", window, ct, !0), R = u.value, O = r != null && r.value ? window.innerWidth - x.clientX : x.clientX;
    }
    function Ke(x) {
      if (!S) return;
      C !== void 0 && window.clearTimeout(C), y !== void 0 && window.clearTimeout(y);
      const {
        value: A
      } = v, {
        value: ee
      } = h, {
        value: Y
      } = G;
      if (A === null || ee === null) return;
      const me = (r != null && r.value ? window.innerWidth - x.clientX - O : x.clientX - O) * (ee - A) / (A - Y), pe = ee - A;
      let Ce = R + me;
      Ce = Math.min(pe, Ce), Ce = Math.max(Ce, 0);
      const {
        value: Ie
      } = he;
      if (Ie) {
        Ie.scrollLeft = Ce * (r != null && r.value ? -1 : 1);
        const {
          internalOnUpdateScrollLeft: Xe
        } = e;
        Xe && Xe(Ce);
      }
    }
    function ct(x) {
      x.preventDefault(), x.stopPropagation(), at("mousemove", window, Ke, !0), at("mouseup", window, ct, !0), S = !1, K(), be(x) && Fe();
    }
    function qe(x) {
      x.preventDefault(), x.stopPropagation(), b = !0, pt("mousemove", window, Ge, !0), pt("mouseup", window, vt, !0), E = m.value, W = x.clientY;
    }
    function Ge(x) {
      if (!b) return;
      C !== void 0 && window.clearTimeout(C), y !== void 0 && window.clearTimeout(y);
      const {
        value: A
      } = p, {
        value: ee
      } = c, {
        value: Y
      } = B;
      if (A === null || ee === null) return;
      const me = (x.clientY - W) * (ee - A) / (A - Y), pe = ee - A;
      let Ce = E + me;
      Ce = Math.min(pe, Ce), Ce = Math.max(Ce, 0);
      const {
        value: Ie
      } = he;
      Ie && (Ie.scrollTop = Ce);
    }
    function vt(x) {
      x.preventDefault(), x.stopPropagation(), at("mousemove", window, Ge, !0), at("mouseup", window, vt, !0), b = !1, K(), be(x) && Fe();
    }
    oP(() => {
      const {
        value: x
      } = Z, {
        value: A
      } = j, {
        value: ee
      } = t, {
        value: Y
      } = d, {
        value: ae
      } = s;
      Y && (x ? Y.classList.remove(`${ee}-scrollbar-rail--disabled`) : Y.classList.add(`${ee}-scrollbar-rail--disabled`)), ae && (A ? ae.classList.remove(`${ee}-scrollbar-rail--disabled`) : ae.classList.add(`${ee}-scrollbar-rail--disabled`));
    }), nP(() => {
      e.container || K();
    }), tP(() => {
      C !== void 0 && window.clearTimeout(C), y !== void 0 && window.clearTimeout(y), at("mousemove", window, Ge, !0), at("mouseup", window, vt, !0);
    });
    const Ne = Wt(() => {
      const {
        common: {
          cubicBezierEaseInOut: x
        },
        self: {
          color: A,
          colorHover: ee,
          height: Y,
          width: ae,
          borderRadius: me,
          railInsetHorizontalTop: pe,
          railInsetHorizontalBottom: Ce,
          railInsetVerticalRight: Ie,
          railInsetVerticalLeft: Xe,
          railColor: Me
        }
      } = V.value, {
        top: ut,
        right: lt,
        bottom: $t,
        left: tt
      } = Bt(pe), {
        top: kt,
        right: Xt,
        bottom: Yt,
        left: q
      } = Bt(Ce), {
        top: se,
        right: ke,
        bottom: Ae,
        left: Ze
      } = Bt(r != null && r.value ? Ou(Ie) : Ie), {
        top: He,
        right: ft,
        bottom: yt,
        left: on
      } = Bt(r != null && r.value ? Ou(Xe) : Xe);
      return {
        "--n-scrollbar-bezier": x,
        "--n-scrollbar-color": A,
        "--n-scrollbar-color-hover": ee,
        "--n-scrollbar-border-radius": me,
        "--n-scrollbar-width": ae,
        "--n-scrollbar-height": Y,
        "--n-scrollbar-rail-top-horizontal-top": ut,
        "--n-scrollbar-rail-right-horizontal-top": lt,
        "--n-scrollbar-rail-bottom-horizontal-top": $t,
        "--n-scrollbar-rail-left-horizontal-top": tt,
        "--n-scrollbar-rail-top-horizontal-bottom": kt,
        "--n-scrollbar-rail-right-horizontal-bottom": Xt,
        "--n-scrollbar-rail-bottom-horizontal-bottom": Yt,
        "--n-scrollbar-rail-left-horizontal-bottom": q,
        "--n-scrollbar-rail-top-vertical-right": se,
        "--n-scrollbar-rail-right-vertical-right": ke,
        "--n-scrollbar-rail-bottom-vertical-right": Ae,
        "--n-scrollbar-rail-left-vertical-right": Ze,
        "--n-scrollbar-rail-top-vertical-left": He,
        "--n-scrollbar-rail-right-vertical-left": ft,
        "--n-scrollbar-rail-bottom-vertical-left": yt,
        "--n-scrollbar-rail-left-vertical-left": on,
        "--n-scrollbar-rail-color": Me
      };
    }), we = n ? St("scrollbar", void 0, Ne, e) : void 0;
    return Object.assign(Object.assign({}, {
      scrollTo: ye,
      scrollBy: xe,
      sync: K,
      syncUnifiedContainer: F,
      handleMouseEnterWrapper: Re,
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
      needYBar: j,
      needXBar: Z,
      yBarSizePx: M,
      xBarSizePx: U,
      yBarTopPx: oe,
      xBarLeftPx: X,
      isShowXBar: te,
      isShowYBar: fe,
      isIos: _,
      handleScroll: H,
      handleContentResize: ge,
      handleContainerResize: Ee,
      handleYScrollMouseDown: qe,
      handleXScrollMouseDown: Pe,
      cssVars: n ? void 0 : Ne,
      themeClass: we == null ? void 0 : we.themeClass,
      onRender: we == null ? void 0 : we.onRender
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
    const d = this.trigger === "none", c = (v, f) => sn("div", {
      ref: "yRailRef",
      class: [`${n}-scrollbar-rail`, `${n}-scrollbar-rail--vertical`, `${n}-scrollbar-rail--vertical--${l}`, v],
      "data-scrollbar-rail": !0,
      style: [f || "", this.verticalRailStyle],
      "aria-hidden": !0
    }, sn(d ? ad : kf, d ? null : {
      name: "fade-in-transition"
    }, {
      default: () => this.needYBar && this.isShowYBar && !this.isIos ? sn("div", {
        class: `${n}-scrollbar-rail__scrollbar`,
        style: {
          height: this.yBarSizePx,
          top: this.yBarTopPx
        },
        onMousedown: this.handleYScrollMouseDown
      }) : null
    })), h = () => {
      var v, f;
      return (v = this.onRender) === null || v === void 0 || v.call(this), sn("div", eP(this.$attrs, {
        role: "none",
        ref: "wrapperRef",
        class: [`${n}-scrollbar`, this.themeClass, r && `${n}-scrollbar--rtl`],
        style: this.cssVars,
        onMouseenter: o ? void 0 : this.handleMouseEnterWrapper,
        onMouseleave: o ? void 0 : this.handleMouseLeaveWrapper
      }), [this.container ? (f = t.default) === null || f === void 0 ? void 0 : f.call(t) : sn("div", {
        role: "none",
        ref: "containerRef",
        class: [`${n}-scrollbar-container`, this.containerClass],
        style: this.containerStyle,
        onScroll: this.handleScroll,
        onWheel: this.onWheel
      }, sn(Hn, {
        onResize: this.handleContentResize
      }, {
        default: () => sn("div", {
          ref: "contentRef",
          role: "none",
          style: [{
            width: this.xScrollable ? "fit-content" : null
          }, this.contentStyle],
          class: [`${n}-scrollbar-content`, this.contentClass]
        }, t)
      })), i ? null : c(void 0, void 0), s && sn("div", {
        ref: "xRailRef",
        class: [`${n}-scrollbar-rail`, `${n}-scrollbar-rail--horizontal`, `${n}-scrollbar-rail--horizontal--${a}`],
        style: this.horizontalRailStyle,
        "data-scrollbar-rail": !0,
        "aria-hidden": !0
      }, sn(d ? ad : kf, d ? null : {
        name: "fade-in-transition"
      }, {
        default: () => this.needXBar && this.isShowXBar && !this.isIos ? sn("div", {
          class: `${n}-scrollbar-rail__scrollbar`,
          style: {
            width: this.xBarSizePx,
            right: r ? this.xBarLeftPx : void 0,
            left: r ? void 0 : this.xBarLeftPx
          },
          onMousedown: this.handleXScrollMouseDown
        }) : null
      }))]);
    }, p = this.container ? h() : sn(Hn, {
      onResize: this.handleContainerResize
    }, {
      default: h
    });
    return i ? sn(Qk, null, p, c(this.themeClass, this.cssVars)) : p;
  }
}), rg = or;
function Pf(e) {
  return Array.isArray(e) ? e : [e];
}
const md = {
  STOP: "STOP"
};
function ig(e, t) {
  const n = t(e);
  e.children !== void 0 && n !== md.STOP && e.children.forEach((o) => ig(o, t));
}
function iP(e, t = {}) {
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
function aP(e, t) {
  const { isLeaf: n } = e;
  return n !== void 0 ? n : !t(e);
}
function lP(e) {
  return e.children;
}
function sP(e) {
  return e.key;
}
function dP() {
  return !1;
}
function cP(e, t) {
  const { isLeaf: n } = e;
  return !(n === !1 && !Array.isArray(t(e)));
}
function uP(e) {
  return e.disabled === !0;
}
function fP(e, t) {
  return e.isLeaf === !1 && !Array.isArray(t(e));
}
function ts(e) {
  var t;
  return e == null ? [] : Array.isArray(e) ? e : (t = e.checkedKeys) !== null && t !== void 0 ? t : [];
}
function ns(e) {
  var t;
  return e == null || Array.isArray(e) ? [] : (t = e.indeterminateKeys) !== null && t !== void 0 ? t : [];
}
function hP(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) || n.add(o);
  }), Array.from(n);
}
function pP(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) && n.delete(o);
  }), Array.from(n);
}
function vP(e) {
  return (e == null ? void 0 : e.type) === "group";
}
function gP(e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((n, o) => {
    t.set(n.key, o);
  }), (n) => {
    var o;
    return (o = t.get(n)) !== null && o !== void 0 ? o : null;
  };
}
class mP extends Error {
  constructor() {
    super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
  }
}
function bP(e, t, n, o) {
  return Qa(t.concat(e), n, o, !1);
}
function wP(e, t) {
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
function yP(e, t, n, o) {
  const r = Qa(t, n, o, !1), i = Qa(e, n, o, !0), l = wP(e, n), a = [];
  return r.forEach((s) => {
    (i.has(s) || l.has(s)) && a.push(s);
  }), a.forEach((s) => r.delete(s)), r;
}
function os(e, t) {
  const { checkedKeys: n, keysToCheck: o, keysToUncheck: r, indeterminateKeys: i, cascade: l, leafOnly: a, checkStrategy: s, allowNotLoaded: d } = e;
  if (!l)
    return o !== void 0 ? {
      checkedKeys: hP(n, o),
      indeterminateKeys: Array.from(i)
    } : r !== void 0 ? {
      checkedKeys: pP(n, r),
      indeterminateKeys: Array.from(i)
    } : {
      checkedKeys: Array.from(n),
      indeterminateKeys: Array.from(i)
    };
  const { levelTreeNodeMap: c } = t;
  let h;
  r !== void 0 ? h = yP(r, n, t, d) : o !== void 0 ? h = bP(o, n, t, d) : h = Qa(n, t, d, !1);
  const p = s === "parent", v = s === "child" || a, f = h, g = /* @__PURE__ */ new Set(), m = Math.max.apply(null, Array.from(c.keys()));
  for (let u = m; u >= 0; u -= 1) {
    const w = u === 0, $ = c.get(u);
    for (const b of $) {
      if (b.isLeaf)
        continue;
      const { key: S, shallowLoaded: C } = b;
      if (v && C && b.children.forEach((O) => {
        !O.disabled && !O.isLeaf && O.shallowLoaded && f.has(O.key) && f.delete(O.key);
      }), b.disabled || !C)
        continue;
      let y = !0, E = !1, R = !0;
      for (const O of b.children) {
        const W = O.key;
        if (!O.disabled) {
          if (R && (R = !1), f.has(W))
            E = !0;
          else if (g.has(W)) {
            E = !0, y = !1;
            break;
          } else if (y = !1, E)
            break;
        }
      }
      y && !R ? (p && b.children.forEach((O) => {
        !O.disabled && f.has(O.key) && f.delete(O.key);
      }), f.add(S)) : E && g.add(S), w && v && f.has(S) && f.delete(S);
    }
  }
  return {
    checkedKeys: Array.from(f),
    indeterminateKeys: Array.from(g)
  };
}
function Qa(e, t, n, o) {
  const { treeNodeMap: r, getChildren: i } = t, l = /* @__PURE__ */ new Set(), a = new Set(e);
  return e.forEach((s) => {
    const d = r.get(s);
    d !== void 0 && ig(d, (c) => {
      if (c.disabled)
        return md.STOP;
      const { key: h } = c;
      if (!l.has(h) && (l.add(h), a.add(h), fP(c.rawNode, i))) {
        if (o)
          return md.STOP;
        if (!n)
          throw new mP();
      }
    });
  }), a;
}
function xP(e, { includeGroup: t = !1, includeSelf: n = !0 }, o) {
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
function CP(e) {
  if (e.length === 0)
    return null;
  const t = e[0];
  return t.isGroup || t.ignored || t.disabled ? t.getNext() : t;
}
function SP(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r + 1) % o] : r === n.length - 1 ? null : n[r + 1];
}
function Tf(e, t, { loop: n = !1, includeDisabled: o = !1 } = {}) {
  const r = t === "prev" ? $P : SP, i = {
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
        const c = lc(d, i);
        c !== null ? a = c : s(r(d, n));
      } else {
        const c = r(d, !1);
        if (c !== null)
          s(c);
        else {
          const h = RP(d);
          h != null && h.isGroup ? s(r(h, n)) : n && s(r(d, !0));
        }
      }
    }
  }
  return s(e), a;
}
function $P(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r - 1 + o) % o] : r === 0 ? null : n[r - 1];
}
function RP(e) {
  return e.parent;
}
function lc(e, t = {}) {
  const { reverse: n = !1 } = t, { children: o } = e;
  if (o) {
    const { length: r } = o, i = n ? r - 1 : 0, l = n ? -1 : r, a = n ? -1 : 1;
    for (let s = i; s !== l; s += a) {
      const d = o[s];
      if (!d.disabled && !d.ignored)
        if (d.isGroup) {
          const c = lc(d, t);
          if (c !== null)
            return c;
        } else
          return d;
    }
  }
  return null;
}
const kP = {
  getChild() {
    return this.ignored ? null : lc(this);
  },
  getParent() {
    const { parent: e } = this;
    return e != null && e.isGroup ? e.getParent() : e;
  },
  getNext(e = {}) {
    return Tf(this, "next", e);
  },
  getPrev(e = {}) {
    return Tf(this, "prev", e);
  }
};
function PP(e, t) {
  const n = t ? new Set(t) : void 0, o = [];
  function r(i) {
    i.forEach((l) => {
      o.push(l), !(l.isLeaf || !l.children || l.ignored) && (l.isGroup || // normal non-leaf node
      n === void 0 || n.has(l.key)) && r(l.children);
    });
  }
  return r(e), o;
}
function TP(e, t) {
  const n = e.key;
  for (; t; ) {
    if (t.key === n)
      return !0;
    t = t.parent;
  }
  return !1;
}
function ag(e, t, n, o, r, i = null, l = 0) {
  const a = [];
  return e.forEach((s, d) => {
    var c;
    const h = Object.create(o);
    if (h.rawNode = s, h.siblings = a, h.level = l, h.index = d, h.isFirstChild = d === 0, h.isLastChild = d + 1 === e.length, h.parent = i, !h.ignored) {
      const p = r(s);
      Array.isArray(p) && (h.children = ag(p, t, n, o, r, h, l + 1));
    }
    a.push(h), t.set(h.key, h), n.has(l) || n.set(l, []), (c = n.get(l)) === null || c === void 0 || c.push(h);
  }), a;
}
function pl(e, t = {}) {
  var n;
  const o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), { getDisabled: i = uP, getIgnored: l = dP, getIsGroup: a = vP, getKey: s = sP } = t, d = (n = t.getChildren) !== null && n !== void 0 ? n : lP, c = t.ignoreEmptyChildren ? (b) => {
    const S = d(b);
    return Array.isArray(S) ? S.length ? S : null : S;
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
      return aP(this.rawNode, c);
    },
    get shallowLoaded() {
      return cP(this.rawNode, c);
    },
    get ignored() {
      return l(this.rawNode);
    },
    contains(b) {
      return TP(this, b);
    }
  }, kP), p = ag(e, o, r, h, c);
  function v(b) {
    if (b == null)
      return null;
    const S = o.get(b);
    return S && !S.isGroup && !S.ignored ? S : null;
  }
  function f(b) {
    if (b == null)
      return null;
    const S = o.get(b);
    return S && !S.ignored ? S : null;
  }
  function g(b, S) {
    const C = f(b);
    return C ? C.getPrev(S) : null;
  }
  function m(b, S) {
    const C = f(b);
    return C ? C.getNext(S) : null;
  }
  function u(b) {
    const S = f(b);
    return S ? S.getParent() : null;
  }
  function w(b) {
    const S = f(b);
    return S ? S.getChild() : null;
  }
  const $ = {
    treeNodes: p,
    treeNodeMap: o,
    levelTreeNodeMap: r,
    maxLevel: Math.max(...r.keys()),
    getChildren: c,
    getFlattenedNodes(b) {
      return PP(p, b);
    },
    getNode: v,
    getPrev: g,
    getNext: m,
    getParent: u,
    getChild: w,
    getFirstAvailableNode() {
      return CP(p);
    },
    getPath(b, S = {}) {
      return xP(b, S, $);
    },
    getCheckedKeys(b, S = {}) {
      const { cascade: C = !0, leafOnly: y = !1, checkStrategy: E = "all", allowNotLoaded: R = !1 } = S;
      return os({
        checkedKeys: ts(b),
        indeterminateKeys: ns(b),
        cascade: C,
        leafOnly: y,
        checkStrategy: E,
        allowNotLoaded: R
      }, $);
    },
    check(b, S, C = {}) {
      const { cascade: y = !0, leafOnly: E = !1, checkStrategy: R = "all", allowNotLoaded: O = !1 } = C;
      return os({
        checkedKeys: ts(S),
        indeterminateKeys: ns(S),
        keysToCheck: b == null ? [] : Pf(b),
        cascade: y,
        leafOnly: E,
        checkStrategy: R,
        allowNotLoaded: O
      }, $);
    },
    uncheck(b, S, C = {}) {
      const { cascade: y = !0, leafOnly: E = !1, checkStrategy: R = "all", allowNotLoaded: O = !1 } = C;
      return os({
        checkedKeys: ts(S),
        indeterminateKeys: ns(S),
        keysToUncheck: b == null ? [] : Pf(b),
        cascade: y,
        leafOnly: E,
        checkStrategy: R,
        allowNotLoaded: O
      }, $);
    },
    getNonLeafKeys(b = {}) {
      return iP(p, b);
    }
  };
  return $;
}
const _P = {
  iconSizeTiny: "28px",
  iconSizeSmall: "34px",
  iconSizeMedium: "40px",
  iconSizeLarge: "46px",
  iconSizeHuge: "52px"
};
function EP(e) {
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
  return Object.assign(Object.assign({}, _P), {
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
const sc = {
  name: "Empty",
  common: wt,
  self: EP
}, zP = P("empty", `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [L("icon", `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [I("+", [L("description", `
 margin-top: 8px;
 `)])]), L("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), L("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]), Xr = window.Vue.computed, FP = window.Vue.defineComponent, ur = window.Vue.h, OP = Object.assign(Object.assign({}, _e.props), {
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
}), lg = FP({
  name: "Empty",
  props: OP,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n,
      mergedComponentPropsRef: o
    } = je(e), r = _e("Empty", "-empty", zP, sc, e, t), {
      localeRef: i
    } = Tr("Empty"), l = Xr(() => {
      var c, h, p;
      return (c = e.description) !== null && c !== void 0 ? c : (p = (h = o == null ? void 0 : o.value) === null || h === void 0 ? void 0 : h.Empty) === null || p === void 0 ? void 0 : p.description;
    }), a = Xr(() => {
      var c, h;
      return ((h = (c = o == null ? void 0 : o.value) === null || c === void 0 ? void 0 : c.Empty) === null || h === void 0 ? void 0 : h.renderIcon) || (() => ur(uk, null));
    }), s = Xr(() => {
      const {
        size: c
      } = e, {
        common: {
          cubicBezierEaseInOut: h
        },
        self: {
          [ie("iconSize", c)]: p,
          [ie("fontSize", c)]: v,
          textColor: f,
          iconColor: g,
          extraTextColor: m
        }
      } = r.value;
      return {
        "--n-icon-size": p,
        "--n-font-size": v,
        "--n-bezier": h,
        "--n-text-color": f,
        "--n-icon-color": g,
        "--n-extra-text-color": m
      };
    }), d = n ? St("empty", Xr(() => {
      let c = "";
      const {
        size: h
      } = e;
      return c += h[0], c;
    }), s, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedRenderIcon: a,
      localizedDescription: Xr(() => l.value || i.value.description),
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
    return n == null || n(), ur("div", {
      class: [`${t}-empty`, this.themeClass],
      style: this.cssVars
    }, this.showIcon ? ur("div", {
      class: `${t}-empty__icon`
    }, e.icon ? e.icon() : ur(_t, {
      clsPrefix: t
    }, {
      default: this.mergedRenderIcon
    })) : null, this.showDescription ? ur("div", {
      class: `${t}-empty__description`
    }, e.default ? e.default() : this.localizedDescription) : null, e.extra ? ur("div", {
      class: `${t}-empty__extra`
    }, e.extra()) : null);
  }
}), MP = {
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
function IP(e) {
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
    fontSizeHuge: g,
    heightTiny: m,
    heightSmall: u,
    heightMedium: w,
    heightLarge: $,
    heightHuge: b
  } = e;
  return Object.assign(Object.assign({}, MP), {
    optionFontSizeTiny: h,
    optionFontSizeSmall: p,
    optionFontSizeMedium: v,
    optionFontSizeLarge: f,
    optionFontSizeHuge: g,
    optionHeightTiny: m,
    optionHeightSmall: u,
    optionHeightMedium: w,
    optionHeightLarge: $,
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
const dc = {
  name: "InternalSelectMenu",
  common: wt,
  peers: {
    Scrollbar: Fr,
    Empty: sc
  },
  self: IP
}, VP = window.Vue.defineComponent, AP = window.Vue.h, BP = window.Vue.inject, _f = VP({
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
    } = BP(Bd);
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
    } = this, i = o == null ? void 0 : o(r), l = t ? t(r, !1) : $n(r[this.labelField], r, !1), a = AP("div", Object.assign({}, i, {
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
}), LP = window.Vue.defineComponent, pi = window.Vue.h, DP = window.Vue.inject, NP = window.Vue.Transition;
function HP(e, t) {
  return pi(NP, {
    name: "fade-in-scale-up-transition"
  }, {
    default: () => e ? pi(_t, {
      clsPrefix: t,
      class: `${t}-base-select-option__check`
    }, {
      default: () => pi(ik)
    }) : null
  });
}
const Ef = LP({
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
    } = DP(Bd), v = Be(() => {
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
    function g(u) {
      const {
        tmNode: w
      } = e;
      w.disabled || p(u, w);
    }
    function m(u) {
      const {
        tmNode: w
      } = e, {
        value: $
      } = v;
      w.disabled || $ || p(u, w);
    }
    return {
      multiple: o,
      isGrouped: Be(() => {
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
      isSelected: Be(() => {
        const {
          value: u
        } = t, {
          value: w
        } = o;
        if (u === null) return !1;
        const $ = e.tmNode.rawNode[s.value];
        if (w) {
          const {
            value: b
          } = r;
          return b.has($);
        } else
          return u === $;
      }),
      labelField: a,
      renderLabel: i,
      renderOption: l,
      handleMouseMove: m,
      handleMouseEnter: g,
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
    } = this, p = HP(n, e), v = s ? [s(t, n), i && p] : [$n(t[this.labelField], t, n), i && p], f = l == null ? void 0 : l(t), g = pi("div", Object.assign({}, f, {
      class: [`${e}-base-select-option`, t.class, f == null ? void 0 : f.class, {
        [`${e}-base-select-option--disabled`]: t.disabled,
        [`${e}-base-select-option--selected`]: n,
        [`${e}-base-select-option--grouped`]: r,
        [`${e}-base-select-option--pending`]: o,
        [`${e}-base-select-option--show-checkmark`]: i
      }],
      style: [(f == null ? void 0 : f.style) || "", t.style || ""],
      onClick: fi([d, f == null ? void 0 : f.onClick]),
      onMouseenter: fi([c, f == null ? void 0 : f.onMouseenter]),
      onMousemove: fi([h, f == null ? void 0 : f.onMousemove])
    }), pi("div", {
      class: `${e}-base-select-option__content`
    }, v));
    return t.render ? t.render({
      node: g,
      option: t,
      selected: n
    }) : a ? a({
      node: g,
      option: t,
      selected: n
    }) : g;
  }
}), {
  cubicBezierEaseIn: zf,
  cubicBezierEaseOut: Ff
} = Pn;
function vl({
  transformOrigin: e = "inherit",
  duration: t = ".2s",
  enterScale: n = ".9",
  originalTransform: o = "",
  originalTransition: r = ""
} = {}) {
  return [I("&.fade-in-scale-up-transition-leave-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${zf}, transform ${t} ${zf} ${r && `,${r}`}`
  }), I("&.fade-in-scale-up-transition-enter-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${Ff}, transform ${t} ${Ff} ${r && `,${r}`}`
  }), I("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
    opacity: 0,
    transform: `${o} scale(${n})`
  }), I("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
    opacity: 1,
    transform: `${o} scale(1)`
  })];
}
const jP = P("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [P("scrollbar", `
 max-height: var(--n-height);
 `), P("virtual-list", `
 max-height: var(--n-height);
 `), P("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [L("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), P("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), P("base-select-menu-option-wrapper", `
 position: relative;
 width: 100%;
 `), L("loading, empty", `
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `), L("loading", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `), L("header", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), L("action", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), P("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), P("base-select-option", `
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `, [N("show-checkmark", `
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `), I("&::before", `
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), I("&:active", `
 color: var(--n-option-text-color-pressed);
 `), N("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), N("pending", [I("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), N("selected", `
 color: var(--n-option-text-color-active);
 `, [I("&::before", `
 background-color: var(--n-option-color-active);
 `), N("pending", [I("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), N("disabled", `
 cursor: not-allowed;
 `, [rt("selected", `
 color: var(--n-option-text-color-disabled);
 `), N("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), L("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [vl({
  enterScale: "0.5"
})])])]), po = window.Vue.computed, WP = window.Vue.defineComponent, Kt = window.Vue.h, UP = window.Vue.nextTick, KP = window.Vue.onBeforeUnmount, qP = window.Vue.onMounted, Of = window.Vue.provide, da = window.Vue.ref, Zn = window.Vue.toRef, Mf = window.Vue.watch, sg = WP({
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
    } = je(e), o = Lt("InternalSelectMenu", n, t), r = _e("InternalSelectMenu", "-internal-select-menu", jP, dc, e, Zn(e, "clsPrefix")), i = da(null), l = da(null), a = da(null), s = po(() => e.treeMate.getFlattenedNodes()), d = po(() => gP(s.value)), c = da(null);
    function h() {
      const {
        treeMate: j
      } = e;
      let Z = null;
      const {
        value: te
      } = e;
      te === null ? Z = j.getFirstAvailableNode() : (e.multiple ? Z = j.getNode((te || [])[(te || []).length - 1]) : Z = j.getNode(te), (!Z || Z.disabled) && (Z = j.getFirstAvailableNode())), B(Z || null);
    }
    function p() {
      const {
        value: j
      } = c;
      j && !e.treeMate.getNode(j.key) && (c.value = null);
    }
    let v;
    Mf(() => e.show, (j) => {
      j ? v = Mf(() => e.treeMate, () => {
        e.resetMenuOnOptionsChange ? (e.autoPending ? h() : p(), UP(M)) : p();
      }, {
        immediate: !0
      }) : v == null || v();
    }, {
      immediate: !0
    }), KP(() => {
      v == null || v();
    });
    const f = po(() => zt(r.value.self[ie("optionHeight", e.size)])), g = po(() => Bt(r.value.self[ie("padding", e.size)])), m = po(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), u = po(() => {
      const j = s.value;
      return j && j.length === 0;
    });
    function w(j) {
      const {
        onToggle: Z
      } = e;
      Z && Z(j);
    }
    function $(j) {
      const {
        onScroll: Z
      } = e;
      Z && Z(j);
    }
    function b(j) {
      var Z;
      (Z = a.value) === null || Z === void 0 || Z.sync(), $(j);
    }
    function S() {
      var j;
      (j = a.value) === null || j === void 0 || j.sync();
    }
    function C() {
      const {
        value: j
      } = c;
      return j || null;
    }
    function y(j, Z) {
      Z.disabled || B(Z, !1);
    }
    function E(j, Z) {
      Z.disabled || w(Z);
    }
    function R(j) {
      var Z;
      pn(j, "action") || (Z = e.onKeyup) === null || Z === void 0 || Z.call(e, j);
    }
    function O(j) {
      var Z;
      pn(j, "action") || (Z = e.onKeydown) === null || Z === void 0 || Z.call(e, j);
    }
    function W(j) {
      var Z;
      (Z = e.onMousedown) === null || Z === void 0 || Z.call(e, j), !e.focusable && j.preventDefault();
    }
    function _() {
      const {
        value: j
      } = c;
      j && B(j.getNext({
        loop: !0
      }), !0);
    }
    function V() {
      const {
        value: j
      } = c;
      j && B(j.getPrev({
        loop: !0
      }), !0);
    }
    function B(j, Z = !1) {
      c.value = j, Z && M();
    }
    function M() {
      var j, Z;
      const te = c.value;
      if (!te) return;
      const fe = d.value(te.key);
      fe !== null && (e.virtualScroll ? (j = l.value) === null || j === void 0 || j.scrollTo({
        index: fe
      }) : (Z = a.value) === null || Z === void 0 || Z.scrollTo({
        index: fe,
        elSize: f.value
      }));
    }
    function G(j) {
      var Z, te;
      !((Z = i.value) === null || Z === void 0) && Z.contains(j.target) && ((te = e.onFocus) === null || te === void 0 || te.call(e, j));
    }
    function U(j) {
      var Z, te;
      !((Z = i.value) === null || Z === void 0) && Z.contains(j.relatedTarget) || (te = e.onBlur) === null || te === void 0 || te.call(e, j);
    }
    Of(Bd, {
      handleOptionMouseEnter: y,
      handleOptionClick: E,
      valueSetRef: m,
      pendingTmNodeRef: c,
      nodePropsRef: Zn(e, "nodeProps"),
      showCheckmarkRef: Zn(e, "showCheckmark"),
      multipleRef: Zn(e, "multiple"),
      valueRef: Zn(e, "value"),
      renderLabelRef: Zn(e, "renderLabel"),
      renderOptionRef: Zn(e, "renderOption"),
      labelFieldRef: Zn(e, "labelField"),
      valueFieldRef: Zn(e, "valueField")
    }), Of(Qp, i), qP(() => {
      const {
        value: j
      } = a;
      j && j.sync();
    });
    const Q = po(() => {
      const {
        size: j
      } = e, {
        common: {
          cubicBezierEaseInOut: Z
        },
        self: {
          height: te,
          borderRadius: fe,
          color: he,
          groupHeaderTextColor: ve,
          actionDividerColor: ye,
          optionTextColorPressed: J,
          optionTextColor: ge,
          optionTextColorDisabled: Ee,
          optionTextColorActive: xe,
          optionOpacityDisabled: Te,
          optionCheckColor: Re,
          actionTextColor: Le,
          optionColorPending: Fe,
          optionColorActive: de,
          loadingColor: T,
          loadingSize: k,
          optionColorActivePending: z,
          [ie("optionFontSize", j)]: H,
          [ie("optionHeight", j)]: re,
          [ie("optionPadding", j)]: le
        }
      } = r.value;
      return {
        "--n-height": te,
        "--n-action-divider-color": ye,
        "--n-action-text-color": Le,
        "--n-bezier": Z,
        "--n-border-radius": fe,
        "--n-color": he,
        "--n-option-font-size": H,
        "--n-group-header-text-color": ve,
        "--n-option-check-color": Re,
        "--n-option-color-pending": Fe,
        "--n-option-color-active": de,
        "--n-option-color-active-pending": z,
        "--n-option-height": re,
        "--n-option-opacity-disabled": Te,
        "--n-option-text-color": ge,
        "--n-option-text-color-active": xe,
        "--n-option-text-color-disabled": Ee,
        "--n-option-text-color-pressed": J,
        "--n-option-padding": le,
        "--n-option-padding-left": Bt(le, "left"),
        "--n-option-padding-right": Bt(le, "right"),
        "--n-loading-color": T,
        "--n-loading-size": k
      };
    }), {
      inlineThemeDisabled: oe
    } = e, ne = oe ? St("internal-select-menu", po(() => e.size[0]), Q, e) : void 0, X = {
      selfRef: i,
      next: _,
      prev: V,
      getPendingTmNode: C
    };
    return mv(i, e.onResize), Object.assign({
      mergedTheme: r,
      mergedClsPrefix: t,
      rtlEnabled: o,
      virtualListRef: l,
      scrollbarRef: a,
      itemSize: f,
      padding: g,
      flattenedNodes: s,
      empty: u,
      virtualListContainer() {
        const {
          value: j
        } = l;
        return j == null ? void 0 : j.listElRef;
      },
      virtualListContent() {
        const {
          value: j
        } = l;
        return j == null ? void 0 : j.itemsElRef;
      },
      doScroll: $,
      handleFocusin: G,
      handleFocusout: U,
      handleKeyUp: R,
      handleKeyDown: O,
      handleMouseDown: W,
      handleVirtualListResize: S,
      handleVirtualListScroll: b,
      cssVars: oe ? void 0 : Q,
      themeClass: ne == null ? void 0 : ne.themeClass,
      onRender: ne == null ? void 0 : ne.onRender
    }, X);
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
    return i == null || i(), Kt("div", {
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
    }, Ye(e.header, (l) => l && Kt("div", {
      class: `${n}-base-select-menu__header`,
      "data-header": !0,
      key: "header"
    }, l)), this.loading ? Kt("div", {
      class: `${n}-base-select-menu__loading`
    }, Kt(zr, {
      clsPrefix: n,
      strokeWidth: 20
    })) : this.empty ? Kt("div", {
      class: `${n}-base-select-menu__empty`,
      "data-empty": !0
    }, Rn(e.empty, () => [Kt(lg, {
      theme: o.peers.Empty,
      themeOverrides: o.peerOverrides.Empty,
      size: this.size
    })])) : Kt(or, {
      ref: "scrollbarRef",
      theme: o.peers.Scrollbar,
      themeOverrides: o.peerOverrides.Scrollbar,
      scrollable: this.scrollable,
      container: t ? this.virtualListContainer : void 0,
      content: t ? this.virtualListContent : void 0,
      onScroll: t ? void 0 : this.doScroll
    }, {
      default: () => t ? Kt(Kd, {
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
        }) => l.isGroup ? Kt(_f, {
          key: l.key,
          clsPrefix: n,
          tmNode: l
        }) : l.ignored ? null : Kt(Ef, {
          clsPrefix: n,
          key: l.key,
          tmNode: l
        })
      }) : Kt("div", {
        class: `${n}-base-select-menu-option-wrapper`,
        style: {
          paddingTop: this.padding.top,
          paddingBottom: this.padding.bottom
        }
      }, this.flattenedNodes.map((l) => l.isGroup ? Kt(_f, {
        key: l.key,
        clsPrefix: n,
        tmNode: l
      }) : Kt(Ef, {
        clsPrefix: n,
        key: l.key,
        tmNode: l
      })))
    }), Ye(e.action, (l) => l && [Kt("div", {
      class: `${n}-base-select-menu__action`,
      "data-action": !0,
      key: "action"
    }, l), Kt(Hk, {
      onFocus: this.onTabOut,
      key: "focus-detector"
    })]));
  }
}), GP = {
  space: "6px",
  spaceArrow: "10px",
  arrowOffset: "10px",
  arrowOffsetVertical: "10px",
  arrowHeight: "6px",
  padding: "8px 14px"
};
function XP(e) {
  const {
    boxShadow2: t,
    popoverColor: n,
    textColor2: o,
    borderRadius: r,
    fontSize: i,
    dividerColor: l
  } = e;
  return Object.assign(Object.assign({}, GP), {
    fontSize: i,
    borderRadius: r,
    color: n,
    dividerColor: l,
    textColor: o,
    boxShadow: t
  });
}
const Or = {
  name: "Popover",
  common: wt,
  peers: {
    Scrollbar: Fr
  },
  self: XP
}, rs = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Ft = "var(--n-arrow-height) * 1.414", YP = I([P("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [I(">", [P("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), rt("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [rt("scrollable", [rt("show-header-or-footer", "padding: var(--n-padding);")])]), L("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), L("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), N("scrollable, show-header-or-footer", [L("content", `
 padding: var(--n-padding);
 `)])]), P("popover-shared", `
 transform-origin: inherit;
 `, [
  P("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [P("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${Ft});
 height: calc(${Ft});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]),
  // body transition
  I("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `),
  I("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `),
  I("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),
  I("&.popover-transition-leave-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)
]), dn("top-start", `
 top: calc(${Ft} / -2);
 left: calc(${Jn("top-start")} - var(--v-offset-left));
 `), dn("top", `
 top: calc(${Ft} / -2);
 transform: translateX(calc(${Ft} / -2)) rotate(45deg);
 left: 50%;
 `), dn("top-end", `
 top: calc(${Ft} / -2);
 right: calc(${Jn("top-end")} + var(--v-offset-left));
 `), dn("bottom-start", `
 bottom: calc(${Ft} / -2);
 left: calc(${Jn("bottom-start")} - var(--v-offset-left));
 `), dn("bottom", `
 bottom: calc(${Ft} / -2);
 transform: translateX(calc(${Ft} / -2)) rotate(45deg);
 left: 50%;
 `), dn("bottom-end", `
 bottom: calc(${Ft} / -2);
 right: calc(${Jn("bottom-end")} + var(--v-offset-left));
 `), dn("left-start", `
 left: calc(${Ft} / -2);
 top: calc(${Jn("left-start")} - var(--v-offset-top));
 `), dn("left", `
 left: calc(${Ft} / -2);
 transform: translateY(calc(${Ft} / -2)) rotate(45deg);
 top: 50%;
 `), dn("left-end", `
 left: calc(${Ft} / -2);
 bottom: calc(${Jn("left-end")} + var(--v-offset-top));
 `), dn("right-start", `
 right: calc(${Ft} / -2);
 top: calc(${Jn("right-start")} - var(--v-offset-top));
 `), dn("right", `
 right: calc(${Ft} / -2);
 transform: translateY(calc(${Ft} / -2)) rotate(45deg);
 top: 50%;
 `), dn("right-end", `
 right: calc(${Ft} / -2);
 bottom: calc(${Jn("right-end")} + var(--v-offset-top));
 `), ..._R({
  top: ["right-start", "left-start"],
  right: ["top-end", "bottom-end"],
  bottom: ["right-end", "left-end"],
  left: ["top-start", "bottom-start"]
}, (e, t) => {
  const n = ["right", "left"].includes(t), o = n ? "width" : "height";
  return e.map((r) => {
    const i = r.split("-")[1] === "end", a = `calc((${`var(--v-target-${o}, 0px)`} - ${Ft}) / 2)`, s = Jn(r);
    return I(`[v-placement="${r}"] >`, [P("popover-shared", [N("center-arrow", [P("popover-arrow", `${t}: calc(max(${a}, ${s}) ${i ? "+" : "-"} var(--v-offset-${n ? "left" : "top"}));`)])])]);
  });
})]);
function Jn(e) {
  return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function dn(e, t) {
  const n = e.split("-")[0], o = ["top", "bottom"].includes(n) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return I(`[v-placement="${e}"] >`, [P("popover-shared", `
 margin-${rs[n]}: var(--n-space);
 `, [N("show-arrow", `
 margin-${rs[n]}: var(--n-space-arrow);
 `), N("overlap", `
 margin: 0;
 `), Bw("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${n}: 100%;
 ${rs[n]}: auto;
 ${o}
 `, [P("popover-arrow", t)])])]);
}
const is = window.Vue.computed, ZP = window.Vue.defineComponent, JP = window.Vue.Fragment, cn = window.Vue.h, QP = window.Vue.inject, e3 = window.Vue.mergeProps, t3 = window.Vue.onBeforeUnmount, as = window.Vue.provide, ca = window.Vue.ref, n3 = window.Vue.toRef, o3 = window.Vue.Transition, r3 = window.Vue.vShow, i3 = window.Vue.watch, a3 = window.Vue.watchEffect, l3 = window.Vue.withDirectives, dg = Object.assign(Object.assign({}, _e.props), {
  to: Wn.propTo,
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
function cg({
  arrowClass: e,
  arrowStyle: t,
  arrowWrapperClass: n,
  arrowWrapperStyle: o,
  clsPrefix: r
}) {
  return cn("div", {
    key: "__popover-arrow__",
    style: o,
    class: [`${r}-popover-arrow-wrapper`, n]
  }, cn("div", {
    class: [`${r}-popover-arrow`, e],
    style: t
  }));
}
const s3 = ZP({
  name: "PopoverBody",
  inheritAttrs: !1,
  props: dg,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    const {
      namespaceRef: o,
      mergedClsPrefixRef: r,
      inlineThemeDisabled: i,
      mergedRtlRef: l
    } = je(e), a = _e("Popover", "-popover", YP, Or, e, r), s = Lt("Popover", l, r), d = ca(null), c = QP("NPopover"), h = ca(null), p = ca(e.show), v = ca(!1);
    a3(() => {
      const {
        show: R
      } = e;
      R && !Zx() && !e.internalDeactivateImmediately && (v.value = !0);
    });
    const f = is(() => {
      const {
        trigger: R,
        onClickoutside: O
      } = e, W = [], {
        positionManuallyRef: {
          value: _
        }
      } = c;
      return _ || (R === "click" && !O && W.push([$i, C, void 0, {
        capture: !0
      }]), R === "hover" && W.push([wy, S])), O && W.push([$i, C, void 0, {
        capture: !0
      }]), (e.displayDirective === "show" || e.animated && v.value) && W.push([r3, e.show]), W;
    }), g = is(() => {
      const {
        common: {
          cubicBezierEaseInOut: R,
          cubicBezierEaseIn: O,
          cubicBezierEaseOut: W
        },
        self: {
          space: _,
          spaceArrow: V,
          padding: B,
          fontSize: M,
          textColor: G,
          dividerColor: U,
          color: Q,
          boxShadow: oe,
          borderRadius: ne,
          arrowHeight: X,
          arrowOffset: j,
          arrowOffsetVertical: Z
        }
      } = a.value;
      return {
        "--n-box-shadow": oe,
        "--n-bezier": R,
        "--n-bezier-ease-in": O,
        "--n-bezier-ease-out": W,
        "--n-font-size": M,
        "--n-text-color": G,
        "--n-color": Q,
        "--n-divider-color": U,
        "--n-border-radius": ne,
        "--n-arrow-height": X,
        "--n-arrow-offset": j,
        "--n-arrow-offset-vertical": Z,
        "--n-padding": B,
        "--n-space": _,
        "--n-space-arrow": V
      };
    }), m = is(() => {
      const R = e.width === "trigger" ? void 0 : Et(e.width), O = [];
      R && O.push({
        width: R
      });
      const {
        maxWidth: W,
        minWidth: _
      } = e;
      return W && O.push({
        maxWidth: Et(W)
      }), _ && O.push({
        maxWidth: Et(_)
      }), i || O.push(g.value), O;
    }), u = i ? St("popover", void 0, g, e) : void 0;
    c.setBodyInstance({
      syncPosition: w
    }), t3(() => {
      c.setBodyInstance(null);
    }), i3(n3(e, "show"), (R) => {
      e.animated || (R ? p.value = !0 : p.value = !1);
    });
    function w() {
      var R;
      (R = d.value) === null || R === void 0 || R.syncPosition();
    }
    function $(R) {
      e.trigger === "hover" && e.keepAliveOnHover && e.show && c.handleMouseEnter(R);
    }
    function b(R) {
      e.trigger === "hover" && e.keepAliveOnHover && c.handleMouseLeave(R);
    }
    function S(R) {
      e.trigger === "hover" && !y().contains(Ci(R)) && c.handleMouseMoveOutside(R);
    }
    function C(R) {
      (e.trigger === "click" && !y().contains(Ci(R)) || e.onClickoutside) && c.handleClickOutside(R);
    }
    function y() {
      return c.getTriggerElement();
    }
    as(Oi, h), as(al, null), as(ll, null);
    function E() {
      if (u == null || u.onRender(), !(e.displayDirective === "show" || e.show || e.animated && v.value))
        return null;
      let O;
      const W = c.internalRenderBodyRef.value, {
        value: _
      } = r;
      if (W)
        O = W(
          // The popover class and overlap class must exists, they will be used
          // to place the body & transition animation.
          // Shadow class exists for reuse box-shadow.
          [`${_}-popover-shared`, (s == null ? void 0 : s.value) && `${_}-popover--rtl`, u == null ? void 0 : u.themeClass.value, e.overlap && `${_}-popover-shared--overlap`, e.showArrow && `${_}-popover-shared--show-arrow`, e.arrowPointToCenter && `${_}-popover-shared--center-arrow`],
          h,
          m.value,
          $,
          b
        );
      else {
        const {
          value: V
        } = c.extraClassRef, {
          internalTrapFocus: B
        } = e, M = !xr(t.header) || !xr(t.footer), G = () => {
          var U, Q;
          const oe = M ? cn(JP, null, Ye(t.header, (j) => j ? cn("div", {
            class: [`${_}-popover__header`, e.headerClass],
            style: e.headerStyle
          }, j) : null), Ye(t.default, (j) => j ? cn("div", {
            class: [`${_}-popover__content`, e.contentClass],
            style: e.contentStyle
          }, t) : null), Ye(t.footer, (j) => j ? cn("div", {
            class: [`${_}-popover__footer`, e.footerClass],
            style: e.footerStyle
          }, j) : null)) : e.scrollable ? (U = t.default) === null || U === void 0 ? void 0 : U.call(t) : cn("div", {
            class: [`${_}-popover__content`, e.contentClass],
            style: e.contentStyle
          }, t), ne = e.scrollable ? cn(rg, {
            themeOverrides: a.value.peerOverrides.Scrollbar,
            theme: a.value.peers.Scrollbar,
            contentClass: M ? void 0 : `${_}-popover__content ${(Q = e.contentClass) !== null && Q !== void 0 ? Q : ""}`,
            contentStyle: M ? void 0 : e.contentStyle
          }, {
            default: () => oe
          }) : oe, X = e.showArrow ? cg({
            arrowClass: e.arrowClass,
            arrowStyle: e.arrowStyle,
            arrowWrapperClass: e.arrowWrapperClass,
            arrowWrapperStyle: e.arrowWrapperStyle,
            clsPrefix: _
          }) : null;
          return [ne, X];
        };
        O = cn("div", e3({
          class: [`${_}-popover`, `${_}-popover-shared`, (s == null ? void 0 : s.value) && `${_}-popover--rtl`, u == null ? void 0 : u.themeClass.value, V.map((U) => `${_}-${U}`), {
            [`${_}-popover--scrollable`]: e.scrollable,
            [`${_}-popover--show-header-or-footer`]: M,
            [`${_}-popover--raw`]: e.raw,
            [`${_}-popover-shared--overlap`]: e.overlap,
            [`${_}-popover-shared--show-arrow`]: e.showArrow,
            [`${_}-popover-shared--center-arrow`]: e.arrowPointToCenter
          }],
          ref: h,
          style: m.value,
          onKeydown: c.handleKeydown,
          onMouseenter: $,
          onMouseleave: b
        }, n), B ? cn(gv, {
          active: e.show,
          autoFocus: !0
        }, {
          default: G
        }) : G());
      }
      return l3(O, f.value);
    }
    return {
      displayed: v,
      namespace: o,
      isMounted: c.isMountedRef,
      zIndex: c.zIndexRef,
      followerRef: d,
      adjustedTo: Wn(e),
      followerEnabled: p,
      renderContentNode: E
    };
  },
  render() {
    return cn(Wd, {
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
      teleportDisabled: this.adjustedTo === Wn.tdkey
    }, {
      default: () => this.animated ? cn(o3, {
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
}), d3 = window.Vue.cloneVNode, If = window.Vue.computed, c3 = window.Vue.defineComponent, Yr = window.Vue.h, u3 = window.Vue.provide, ua = window.Vue.ref, f3 = window.Vue.Text, ls = window.Vue.toRef, h3 = window.Vue.watchEffect, p3 = window.Vue.withDirectives, v3 = Object.keys(dg), g3 = {
  focus: ["onFocus", "onBlur"],
  click: ["onClick"],
  hover: ["onMouseenter", "onMouseleave"],
  manual: [],
  nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
};
function m3(e, t, n) {
  g3[t].forEach((o) => {
    e.props ? e.props = Object.assign({}, e.props) : e.props = {};
    const r = e.props[o], i = n[o];
    r ? e.props[o] = (...l) => {
      r(...l), i(...l);
    } : e.props[o] = i;
  });
}
const Rr = {
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
  to: Wn.propTo,
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
}, b3 = Object.assign(Object.assign(Object.assign({}, _e.props), Rr), {
  internalOnAfterLeave: Function,
  internalRenderBody: Function
}), Ii = c3({
  name: "Popover",
  inheritAttrs: !1,
  props: b3,
  slots: Object,
  __popover__: !0,
  setup(e) {
    const t = Fi(), n = ua(null), o = If(() => e.show), r = ua(e.defaultShow), i = Ot(o, r), l = Be(() => e.disabled ? !1 : i.value), a = () => {
      if (e.disabled) return !0;
      const {
        getDisabled: M
      } = e;
      return !!(M != null && M());
    }, s = () => a() ? !1 : i.value, d = Ka(e, ["arrow", "showArrow"]), c = If(() => e.overlap ? !1 : d.value);
    let h = null;
    const p = ua(null), v = ua(null), f = Be(() => e.x !== void 0 && e.y !== void 0);
    function g(M) {
      const {
        "onUpdate:show": G,
        onUpdateShow: U,
        onShow: Q,
        onHide: oe
      } = e;
      r.value = M, G && ue(G, M), U && ue(U, M), M && Q && ue(Q, !0), M && oe && ue(oe, !1);
    }
    function m() {
      h && h.syncPosition();
    }
    function u() {
      const {
        value: M
      } = p;
      M && (window.clearTimeout(M), p.value = null);
    }
    function w() {
      const {
        value: M
      } = v;
      M && (window.clearTimeout(M), v.value = null);
    }
    function $() {
      const M = a();
      if (e.trigger === "focus" && !M) {
        if (s()) return;
        g(!0);
      }
    }
    function b() {
      const M = a();
      if (e.trigger === "focus" && !M) {
        if (!s()) return;
        g(!1);
      }
    }
    function S() {
      const M = a();
      if (e.trigger === "hover" && !M) {
        if (w(), p.value !== null || s()) return;
        const G = () => {
          g(!0), p.value = null;
        }, {
          delay: U
        } = e;
        U === 0 ? G() : p.value = window.setTimeout(G, U);
      }
    }
    function C() {
      const M = a();
      if (e.trigger === "hover" && !M) {
        if (u(), v.value !== null || !s()) return;
        const G = () => {
          g(!1), v.value = null;
        }, {
          duration: U
        } = e;
        U === 0 ? G() : v.value = window.setTimeout(G, U);
      }
    }
    function y() {
      C();
    }
    function E(M) {
      var G;
      s() && (e.trigger === "click" && (u(), w(), g(!1)), (G = e.onClickoutside) === null || G === void 0 || G.call(e, M));
    }
    function R() {
      if (e.trigger === "click" && !a()) {
        u(), w();
        const M = !s();
        g(M);
      }
    }
    function O(M) {
      e.internalTrapFocus && M.key === "Escape" && (u(), w(), g(!1));
    }
    function W(M) {
      r.value = M;
    }
    function _() {
      var M;
      return (M = n.value) === null || M === void 0 ? void 0 : M.targetRef;
    }
    function V(M) {
      h = M;
    }
    return u3("NPopover", {
      getTriggerElement: _,
      handleKeydown: O,
      handleMouseEnter: S,
      handleMouseLeave: C,
      handleClickOutside: E,
      handleMouseMoveOutside: y,
      setBodyInstance: V,
      positionManuallyRef: f,
      isMountedRef: t,
      zIndexRef: ls(e, "zIndex"),
      extraClassRef: ls(e, "internalExtraClass"),
      internalRenderBodyRef: ls(e, "internalRenderBody")
    }), h3(() => {
      i.value && a() && g(!1);
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
      handleMouseEnter: S,
      handleMouseLeave: C,
      handleFocus: $,
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
    if (!t && (o = r1(n, "trigger"), o)) {
      o = d3(o), o = o.type === f3 ? Yr("span", [o]) : o;
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
        m3(o, l ? "nested" : t ? "manual" : this.trigger, s);
      }
    }
    return Yr(Nd, {
      ref: "binderInstRef",
      syncTarget: !r,
      syncTargetWithParent: this.internalSyncTargetWithParent
    }, {
      default: () => {
        this.mergedShowConsideringDisabledProp;
        const i = this.getMergedShow();
        return [this.internalTrapFocus && i ? p3(Yr("div", {
          style: {
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }), [[jd, {
          enabled: i,
          zIndex: this.zIndex
        }]]) : null, t ? null : Yr(Hd, null, {
          default: () => o
        }), Yr(s3, ki(this.$props, v3, Object.assign(Object.assign({}, this.$attrs), {
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
}), w3 = {
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
function y3(e) {
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
    closeIconColorPressed: g,
    borderRadiusSmall: m,
    fontSizeMini: u,
    fontSizeTiny: w,
    fontSizeSmall: $,
    fontSizeMedium: b,
    heightMini: S,
    heightTiny: C,
    heightSmall: y,
    heightMedium: E,
    closeColorHover: R,
    closeColorPressed: O,
    buttonColor2Hover: W,
    buttonColor2Pressed: _,
    fontWeightStrong: V
  } = e;
  return Object.assign(Object.assign({}, w3), {
    closeBorderRadius: m,
    heightTiny: S,
    heightSmall: C,
    heightMedium: y,
    heightLarge: E,
    borderRadius: m,
    opacityDisabled: h,
    fontSizeTiny: u,
    fontSizeSmall: w,
    fontSizeMedium: $,
    fontSizeLarge: b,
    fontWeightStrong: V,
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
    closeIconColorPressed: g,
    closeColorHover: R,
    closeColorPressed: O,
    borderPrimary: `1px solid ${Ve(r, {
      alpha: 0.3
    })}`,
    textColorPrimary: r,
    colorPrimary: Ve(r, {
      alpha: 0.12
    }),
    colorBorderedPrimary: Ve(r, {
      alpha: 0.1
    }),
    closeIconColorPrimary: r,
    closeIconColorHoverPrimary: r,
    closeIconColorPressedPrimary: r,
    closeColorHoverPrimary: Ve(r, {
      alpha: 0.12
    }),
    closeColorPressedPrimary: Ve(r, {
      alpha: 0.18
    }),
    borderInfo: `1px solid ${Ve(i, {
      alpha: 0.3
    })}`,
    textColorInfo: i,
    colorInfo: Ve(i, {
      alpha: 0.12
    }),
    colorBorderedInfo: Ve(i, {
      alpha: 0.1
    }),
    closeIconColorInfo: i,
    closeIconColorHoverInfo: i,
    closeIconColorPressedInfo: i,
    closeColorHoverInfo: Ve(i, {
      alpha: 0.12
    }),
    closeColorPressedInfo: Ve(i, {
      alpha: 0.18
    }),
    borderSuccess: `1px solid ${Ve(l, {
      alpha: 0.3
    })}`,
    textColorSuccess: l,
    colorSuccess: Ve(l, {
      alpha: 0.12
    }),
    colorBorderedSuccess: Ve(l, {
      alpha: 0.1
    }),
    closeIconColorSuccess: l,
    closeIconColorHoverSuccess: l,
    closeIconColorPressedSuccess: l,
    closeColorHoverSuccess: Ve(l, {
      alpha: 0.12
    }),
    closeColorPressedSuccess: Ve(l, {
      alpha: 0.18
    }),
    borderWarning: `1px solid ${Ve(a, {
      alpha: 0.35
    })}`,
    textColorWarning: a,
    colorWarning: Ve(a, {
      alpha: 0.15
    }),
    colorBorderedWarning: Ve(a, {
      alpha: 0.12
    }),
    closeIconColorWarning: a,
    closeIconColorHoverWarning: a,
    closeIconColorPressedWarning: a,
    closeColorHoverWarning: Ve(a, {
      alpha: 0.12
    }),
    closeColorPressedWarning: Ve(a, {
      alpha: 0.18
    }),
    borderError: `1px solid ${Ve(s, {
      alpha: 0.23
    })}`,
    textColorError: s,
    colorError: Ve(s, {
      alpha: 0.1
    }),
    colorBorderedError: Ve(s, {
      alpha: 0.08
    }),
    closeIconColorError: s,
    closeIconColorHoverError: s,
    closeIconColorPressedError: s,
    closeColorHoverError: Ve(s, {
      alpha: 0.12
    }),
    closeColorPressedError: Ve(s, {
      alpha: 0.18
    })
  });
}
const x3 = {
  common: wt,
  self: y3
}, C3 = {
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
}, S3 = P("tag", `
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
`, [N("strong", `
 font-weight: var(--n-font-weight-strong);
 `), L("border", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `), L("icon", `
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `), L("avatar", `
 display: flex;
 margin: 0 6px 0 0;
 `), L("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), N("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [L("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), L("avatar", `
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `), N("closable", `
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]), N("icon, avatar", [N("round", `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]), N("disabled", `
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `), N("checkable", `
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `, [rt("disabled", [I("&:hover", "background-color: var(--n-color-hover-checkable);", [rt("checked", "color: var(--n-text-color-hover-checkable);")]), I("&:active", "background-color: var(--n-color-pressed-checkable);", [rt("checked", "color: var(--n-text-color-pressed-checkable);")])]), N("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [rt("disabled", [I("&:hover", "background-color: var(--n-color-checked-hover);"), I("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), Vf = window.Vue.computed, $3 = window.Vue.defineComponent, fr = window.Vue.h, R3 = window.Vue.provide, k3 = window.Vue.ref, P3 = window.Vue.toRef;
window.Vue.watchEffect;
const T3 = Object.assign(Object.assign(Object.assign({}, _e.props), C3), {
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
}), _3 = "n-tag", Da = $3({
  name: "Tag",
  props: T3,
  slots: Object,
  setup(e) {
    const t = k3(null), {
      mergedBorderedRef: n,
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = je(e), l = _e("Tag", "-tag", S3, x3, e, o);
    R3(_3, {
      roundRef: P3(e, "round")
    });
    function a() {
      if (!e.disabled && e.checkable) {
        const {
          checked: v,
          onCheckedChange: f,
          onUpdateChecked: g,
          "onUpdate:checked": m
        } = e;
        g && g(!v), m && m(!v), f && f(!v);
      }
    }
    function s(v) {
      if (e.triggerClickOnClose || v.stopPropagation(), !e.disabled) {
        const {
          onClose: f
        } = e;
        f && ue(f, v);
      }
    }
    const d = {
      setTextContent(v) {
        const {
          value: f
        } = t;
        f && (f.textContent = v);
      }
    }, c = Lt("Tag", i, o), h = Vf(() => {
      const {
        type: v,
        size: f,
        color: {
          color: g,
          textColor: m
        } = {}
      } = e, {
        common: {
          cubicBezierEaseInOut: u
        },
        self: {
          padding: w,
          closeMargin: $,
          borderRadius: b,
          opacityDisabled: S,
          textColorCheckable: C,
          textColorHoverCheckable: y,
          textColorPressedCheckable: E,
          textColorChecked: R,
          colorCheckable: O,
          colorHoverCheckable: W,
          colorPressedCheckable: _,
          colorChecked: V,
          colorCheckedHover: B,
          colorCheckedPressed: M,
          closeBorderRadius: G,
          fontWeightStrong: U,
          [ie("colorBordered", v)]: Q,
          [ie("closeSize", f)]: oe,
          [ie("closeIconSize", f)]: ne,
          [ie("fontSize", f)]: X,
          [ie("height", f)]: j,
          [ie("color", v)]: Z,
          [ie("textColor", v)]: te,
          [ie("border", v)]: fe,
          [ie("closeIconColor", v)]: he,
          [ie("closeIconColorHover", v)]: ve,
          [ie("closeIconColorPressed", v)]: ye,
          [ie("closeColorHover", v)]: J,
          [ie("closeColorPressed", v)]: ge
        }
      } = l.value, Ee = Bt($);
      return {
        "--n-font-weight-strong": U,
        "--n-avatar-size-override": `calc(${j} - 8px)`,
        "--n-bezier": u,
        "--n-border-radius": b,
        "--n-border": fe,
        "--n-close-icon-size": ne,
        "--n-close-color-pressed": ge,
        "--n-close-color-hover": J,
        "--n-close-border-radius": G,
        "--n-close-icon-color": he,
        "--n-close-icon-color-hover": ve,
        "--n-close-icon-color-pressed": ye,
        "--n-close-icon-color-disabled": he,
        "--n-close-margin-top": Ee.top,
        "--n-close-margin-right": Ee.right,
        "--n-close-margin-bottom": Ee.bottom,
        "--n-close-margin-left": Ee.left,
        "--n-close-size": oe,
        "--n-color": g || (n.value ? Q : Z),
        "--n-color-checkable": O,
        "--n-color-checked": V,
        "--n-color-checked-hover": B,
        "--n-color-checked-pressed": M,
        "--n-color-hover-checkable": W,
        "--n-color-pressed-checkable": _,
        "--n-font-size": X,
        "--n-height": j,
        "--n-opacity-disabled": S,
        "--n-padding": w,
        "--n-text-color": m || te,
        "--n-text-color-checkable": C,
        "--n-text-color-checked": R,
        "--n-text-color-hover-checkable": y,
        "--n-text-color-pressed-checkable": E
      };
    }), p = r ? St("tag", Vf(() => {
      let v = "";
      const {
        type: f,
        size: g,
        color: {
          color: m,
          textColor: u
        } = {}
      } = e;
      return v += f[0], v += g[0], m && (v += `a${qa(m)}`), u && (v += `b${qa(u)}`), n.value && (v += "c"), v;
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
    const d = Ye(s.avatar, (h) => h && fr("div", {
      class: `${n}-tag__avatar`
    }, h)), c = Ye(s.icon, (h) => h && fr("div", {
      class: `${n}-tag__icon`
    }, h));
    return fr("div", {
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
    }, c || d, fr("span", {
      class: `${n}-tag__content`,
      ref: "contentRef"
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e)), !this.checkable && r ? fr(hl, {
      clsPrefix: n,
      class: `${n}-tag__close`,
      disabled: this.disabled,
      onClick: this.handleCloseClick,
      focusable: this.internalCloseFocusable,
      round: l,
      isButtonTag: this.internalCloseIsButtonTag,
      absolute: !0
    }) : null, !this.checkable && this.mergedBordered ? fr("div", {
      class: `${n}-tag__border`,
      style: {
        borderColor: i
      }
    }) : null);
  }
}), E3 = window.Vue.defineComponent, fa = window.Vue.h, ug = E3({
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
      return fa(zr, {
        clsPrefix: n,
        class: `${n}-base-suffix`,
        strokeWidth: 24,
        scale: 0.85,
        show: e.loading
      }, {
        default: () => e.showArrow ? fa(gd, {
          clsPrefix: n,
          show: e.showClear,
          onClear: e.onClear
        }, {
          placeholder: () => fa(_t, {
            clsPrefix: n,
            class: `${n}-base-suffix__arrow`
          }, {
            default: () => Rn(t.default, () => [fa(eg, null)])
          })
        }) : null
      });
    };
  }
}), z3 = {
  paddingSingle: "0 26px 0 12px",
  paddingMultiple: "3px 26px 0 12px",
  clearSize: "16px",
  arrowSize: "16px"
};
function F3(e) {
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
    clearColor: g,
    clearColorHover: m,
    clearColorPressed: u,
    placeholderColor: w,
    placeholderColorDisabled: $,
    fontSizeTiny: b,
    fontSizeSmall: S,
    fontSizeMedium: C,
    fontSizeLarge: y,
    heightTiny: E,
    heightSmall: R,
    heightMedium: O,
    heightLarge: W,
    fontWeight: _
  } = e;
  return Object.assign(Object.assign({}, z3), {
    fontSizeTiny: b,
    fontSizeSmall: S,
    fontSizeMedium: C,
    fontSizeLarge: y,
    heightTiny: E,
    heightSmall: R,
    heightMedium: O,
    heightLarge: W,
    borderRadius: t,
    fontWeight: _,
    // default
    textColor: n,
    textColorDisabled: o,
    placeholderColor: w,
    placeholderColorDisabled: $,
    color: r,
    colorDisabled: i,
    colorActive: r,
    border: `1px solid ${p}`,
    borderHover: `1px solid ${a}`,
    borderActive: `1px solid ${l}`,
    borderFocus: `1px solid ${a}`,
    boxShadowHover: "none",
    boxShadowActive: `0 0 0 2px ${Ve(l, {
      alpha: 0.2
    })}`,
    boxShadowFocus: `0 0 0 2px ${Ve(l, {
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
    boxShadowActiveWarning: `0 0 0 2px ${Ve(s, {
      alpha: 0.2
    })}`,
    boxShadowFocusWarning: `0 0 0 2px ${Ve(s, {
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
    boxShadowActiveError: `0 0 0 2px ${Ve(c, {
      alpha: 0.2
    })}`,
    boxShadowFocusError: `0 0 0 2px ${Ve(c, {
      alpha: 0.2
    })}`,
    colorActiveError: r,
    caretColorError: c,
    clearColor: g,
    clearColorHover: m,
    clearColorPressed: u
  });
}
const fg = {
  name: "InternalSelection",
  common: wt,
  peers: {
    Popover: Or
  },
  self: F3
}, O3 = I([P("base-selection", `
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
 `, [P("base-loading", `
 color: var(--n-loading-color);
 `), P("base-selection-tags", "min-height: var(--n-height);"), L("border, state-border", `
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
 `), L("state-border", `
 z-index: 1;
 border-color: #0000;
 `), P("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [L("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), P("base-selection-overlay", `
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
 `, [L("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), P("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [L("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), P("base-selection-tags", `
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
 `), P("base-selection-label", `
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
 `, [P("base-selection-input", `
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
 `, [L("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), L("render-label", `
 color: var(--n-text-color);
 `)]), rt("disabled", [I("&:hover", [L("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), N("focus", [L("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), N("active", [L("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), P("base-selection-label", "background-color: var(--n-color-active);"), P("base-selection-tags", "background-color: var(--n-color-active);")])]), N("disabled", "cursor: not-allowed;", [L("arrow", `
 color: var(--n-arrow-color-disabled);
 `), P("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [P("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), L("render-label", `
 color: var(--n-text-color-disabled);
 `)]), P("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), P("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), P("base-selection-input-tag", `
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `, [L("input", `
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
 `), L("mirror", `
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]), ["warning", "error"].map((e) => N(`${e}-status`, [L("state-border", `border: var(--n-border-${e});`), rt("disabled", [I("&:hover", [L("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), N("active", [L("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), P("base-selection-label", `background-color: var(--n-color-active-${e});`), P("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), N("focus", [L("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), P("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), P("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [I("&:last-child", "padding-right: 0;"), P("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [L("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), hr = window.Vue.computed, M3 = window.Vue.defineComponent, I3 = window.Vue.Fragment, We = window.Vue.h, V3 = window.Vue.nextTick, A3 = window.Vue.onMounted, Jt = window.Vue.ref, ss = window.Vue.toRef, ds = window.Vue.watch, B3 = window.Vue.watchEffect, L3 = M3({
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
    } = je(e), o = Lt("InternalSelection", n, t), r = Jt(null), i = Jt(null), l = Jt(null), a = Jt(null), s = Jt(null), d = Jt(null), c = Jt(null), h = Jt(null), p = Jt(null), v = Jt(null), f = Jt(!1), g = Jt(!1), m = Jt(!1), u = _e("InternalSelection", "-internal-selection", O3, fg, e, ss(e, "clsPrefix")), w = hr(() => e.clearable && !e.disabled && (m.value || e.active)), $ = hr(() => e.selectedOption ? e.renderTag ? e.renderTag({
      option: e.selectedOption,
      handleClose: () => {
      }
    }) : e.renderLabel ? e.renderLabel(e.selectedOption, !0) : $n(e.selectedOption[e.labelField], e.selectedOption, !0) : e.placeholder), b = hr(() => {
      const F = e.selectedOption;
      if (F)
        return F[e.labelField];
    }), S = hr(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
    function C() {
      var F;
      const {
        value: K
      } = r;
      if (K) {
        const {
          value: be
        } = i;
        be && (be.style.width = `${K.offsetWidth}px`, e.maxTagCount !== "responsive" && ((F = p.value) === null || F === void 0 || F.sync({
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
    function E() {
      const {
        value: F
      } = v;
      F && (F.style.display = "inline-block");
    }
    ds(ss(e, "active"), (F) => {
      F || y();
    }), ds(ss(e, "pattern"), () => {
      e.multiple && V3(C);
    });
    function R(F) {
      const {
        onFocus: K
      } = e;
      K && K(F);
    }
    function O(F) {
      const {
        onBlur: K
      } = e;
      K && K(F);
    }
    function W(F) {
      const {
        onDeleteOption: K
      } = e;
      K && K(F);
    }
    function _(F) {
      const {
        onClear: K
      } = e;
      K && K(F);
    }
    function V(F) {
      const {
        onPatternInput: K
      } = e;
      K && K(F);
    }
    function B(F) {
      var K;
      (!F.relatedTarget || !(!((K = l.value) === null || K === void 0) && K.contains(F.relatedTarget))) && R(F);
    }
    function M(F) {
      var K;
      !((K = l.value) === null || K === void 0) && K.contains(F.relatedTarget) || O(F);
    }
    function G(F) {
      _(F);
    }
    function U() {
      m.value = !0;
    }
    function Q() {
      m.value = !1;
    }
    function oe(F) {
      !e.active || !e.filterable || F.target !== i.value && F.preventDefault();
    }
    function ne(F) {
      W(F);
    }
    const X = Jt(!1);
    function j(F) {
      if (F.key === "Backspace" && !X.value && !e.pattern.length) {
        const {
          selectedOptions: K
        } = e;
        K != null && K.length && ne(K[K.length - 1]);
      }
    }
    let Z = null;
    function te(F) {
      const {
        value: K
      } = r;
      if (K) {
        const be = F.target.value;
        K.textContent = be, C();
      }
      e.ignoreComposition && X.value ? Z = F : V(F);
    }
    function fe() {
      X.value = !0;
    }
    function he() {
      X.value = !1, e.ignoreComposition && V(Z), Z = null;
    }
    function ve(F) {
      var K;
      g.value = !0, (K = e.onPatternFocus) === null || K === void 0 || K.call(e, F);
    }
    function ye(F) {
      var K;
      g.value = !1, (K = e.onPatternBlur) === null || K === void 0 || K.call(e, F);
    }
    function J() {
      var F, K;
      if (e.filterable)
        g.value = !1, (F = d.value) === null || F === void 0 || F.blur(), (K = i.value) === null || K === void 0 || K.blur();
      else if (e.multiple) {
        const {
          value: be
        } = a;
        be == null || be.blur();
      } else {
        const {
          value: be
        } = s;
        be == null || be.blur();
      }
    }
    function ge() {
      var F, K, be;
      e.filterable ? (g.value = !1, (F = d.value) === null || F === void 0 || F.focus()) : e.multiple ? (K = a.value) === null || K === void 0 || K.focus() : (be = s.value) === null || be === void 0 || be.focus();
    }
    function Ee() {
      const {
        value: F
      } = i;
      F && (E(), F.focus());
    }
    function xe() {
      const {
        value: F
      } = i;
      F && F.blur();
    }
    function Te(F) {
      const {
        value: K
      } = c;
      K && K.setTextContent(`+${F}`);
    }
    function Re() {
      const {
        value: F
      } = h;
      return F;
    }
    function Le() {
      return i.value;
    }
    let Fe = null;
    function de() {
      Fe !== null && window.clearTimeout(Fe);
    }
    function T() {
      e.active || (de(), Fe = window.setTimeout(() => {
        S.value && (f.value = !0);
      }, 100));
    }
    function k() {
      de();
    }
    function z(F) {
      F || (de(), f.value = !1);
    }
    ds(S, (F) => {
      F || (f.value = !1);
    }), A3(() => {
      B3(() => {
        const F = d.value;
        F && (e.disabled ? F.removeAttribute("tabindex") : F.tabIndex = g.value ? -1 : 0);
      });
    }), mv(l, e.onResize);
    const {
      inlineThemeDisabled: H
    } = e, re = hr(() => {
      const {
        size: F
      } = e, {
        common: {
          cubicBezierEaseInOut: K
        },
        self: {
          fontWeight: be,
          borderRadius: Pe,
          color: Ke,
          placeholderColor: ct,
          textColor: qe,
          paddingSingle: Ge,
          paddingMultiple: vt,
          caretColor: Ne,
          colorDisabled: we,
          textColorDisabled: D,
          placeholderColorDisabled: x,
          colorActive: A,
          boxShadowFocus: ee,
          boxShadowActive: Y,
          boxShadowHover: ae,
          border: me,
          borderFocus: pe,
          borderHover: Ce,
          borderActive: Ie,
          arrowColor: Xe,
          arrowColorDisabled: Me,
          loadingColor: ut,
          // form warning
          colorActiveWarning: lt,
          boxShadowFocusWarning: $t,
          boxShadowActiveWarning: tt,
          boxShadowHoverWarning: kt,
          borderWarning: Xt,
          borderFocusWarning: Yt,
          borderHoverWarning: q,
          borderActiveWarning: se,
          // form error
          colorActiveError: ke,
          boxShadowFocusError: Ae,
          boxShadowActiveError: Ze,
          boxShadowHoverError: He,
          borderError: ft,
          borderFocusError: yt,
          borderHoverError: on,
          borderActiveError: qn,
          // clear
          clearColor: Gn,
          clearColorHover: Oo,
          clearColorPressed: Mr,
          clearSize: Ir,
          // arrow
          arrowSize: Vr,
          [ie("height", F)]: Ar,
          [ie("fontSize", F)]: Br
        }
      } = u.value, uo = Bt(Ge), fo = Bt(vt);
      return {
        "--n-bezier": K,
        "--n-border": me,
        "--n-border-active": Ie,
        "--n-border-focus": pe,
        "--n-border-hover": Ce,
        "--n-border-radius": Pe,
        "--n-box-shadow-active": Y,
        "--n-box-shadow-focus": ee,
        "--n-box-shadow-hover": ae,
        "--n-caret-color": Ne,
        "--n-color": Ke,
        "--n-color-active": A,
        "--n-color-disabled": we,
        "--n-font-size": Br,
        "--n-height": Ar,
        "--n-padding-single-top": uo.top,
        "--n-padding-multiple-top": fo.top,
        "--n-padding-single-right": uo.right,
        "--n-padding-multiple-right": fo.right,
        "--n-padding-single-left": uo.left,
        "--n-padding-multiple-left": fo.left,
        "--n-padding-single-bottom": uo.bottom,
        "--n-padding-multiple-bottom": fo.bottom,
        "--n-placeholder-color": ct,
        "--n-placeholder-color-disabled": x,
        "--n-text-color": qe,
        "--n-text-color-disabled": D,
        "--n-arrow-color": Xe,
        "--n-arrow-color-disabled": Me,
        "--n-loading-color": ut,
        // form warning
        "--n-color-active-warning": lt,
        "--n-box-shadow-focus-warning": $t,
        "--n-box-shadow-active-warning": tt,
        "--n-box-shadow-hover-warning": kt,
        "--n-border-warning": Xt,
        "--n-border-focus-warning": Yt,
        "--n-border-hover-warning": q,
        "--n-border-active-warning": se,
        // form error
        "--n-color-active-error": ke,
        "--n-box-shadow-focus-error": Ae,
        "--n-box-shadow-active-error": Ze,
        "--n-box-shadow-hover-error": He,
        "--n-border-error": ft,
        "--n-border-focus-error": yt,
        "--n-border-hover-error": on,
        "--n-border-active-error": qn,
        // clear
        "--n-clear-size": Ir,
        "--n-clear-color": Gn,
        "--n-clear-color-hover": Oo,
        "--n-clear-color-pressed": Mr,
        // arrow-size
        "--n-arrow-size": Vr,
        // font-weight
        "--n-font-weight": be
      };
    }), le = H ? St("internal-selection", hr(() => e.size[0]), re, e) : void 0;
    return {
      mergedTheme: u,
      mergedClearable: w,
      mergedClsPrefix: t,
      rtlEnabled: o,
      patternInputFocused: g,
      filterablePlaceholder: $,
      label: b,
      selected: S,
      showTagsPanel: f,
      isComposing: X,
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
      handleMouseDown: oe,
      handleFocusin: B,
      handleClear: G,
      handleMouseEnter: U,
      handleMouseLeave: Q,
      handleDeleteOption: ne,
      handlePatternKeyDown: j,
      handlePatternInputInput: te,
      handlePatternInputBlur: ye,
      handlePatternInputFocus: ve,
      handleMouseEnterCounter: T,
      handleMouseLeaveCounter: k,
      handleFocusout: M,
      handleCompositionEnd: he,
      handleCompositionStart: fe,
      onPopoverUpdateShow: z,
      focus: ge,
      focusInput: Ee,
      blur: J,
      blurInput: xe,
      updateCounter: Te,
      getCounter: Re,
      getTail: Le,
      renderLabel: e.renderLabel,
      cssVars: H ? void 0 : re,
      themeClass: le == null ? void 0 : le.themeClass,
      onRender: le == null ? void 0 : le.onRender
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
    const p = i === "responsive", v = typeof i == "number", f = p || v, g = We(ad, null, {
      default: () => We(ug, {
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
      } = this, w = (V) => We("div", {
        class: `${a}-base-selection-tag-wrapper`,
        key: V.value
      }, c ? c({
        option: V,
        handleClose: () => {
          this.handleDeleteOption(V);
        }
      }) : We(Da, {
        size: n,
        closable: !V.disabled,
        disabled: o,
        onClose: () => {
          this.handleDeleteOption(V);
        },
        internalCloseIsButtonTag: !1,
        internalCloseFocusable: !1
      }, {
        default: () => h ? h(V, !0) : $n(V[u], V, !0)
      })), $ = () => (v ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(w), b = r ? We("div", {
        class: `${a}-base-selection-input-tag`,
        ref: "inputTagElRef",
        key: "__input-tag__"
      }, We("input", Object.assign({}, this.inputProps, {
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
      })), We("span", {
        ref: "patternInputMirrorRef",
        class: `${a}-base-selection-input-tag__mirror`
      }, this.pattern)) : null, S = p ? () => We("div", {
        class: `${a}-base-selection-tag-wrapper`,
        ref: "counterWrapperRef"
      }, We(Da, {
        size: n,
        ref: "counterRef",
        onMouseenter: this.handleMouseEnterCounter,
        onMouseleave: this.handleMouseLeaveCounter,
        disabled: o
      })) : void 0;
      let C;
      if (v) {
        const V = this.selectedOptions.length - i;
        V > 0 && (C = We("div", {
          class: `${a}-base-selection-tag-wrapper`,
          key: "__counter__"
        }, We(Da, {
          size: n,
          ref: "counterRef",
          onMouseenter: this.handleMouseEnterCounter,
          disabled: o
        }, {
          default: () => `+${V}`
        })));
      }
      const y = p ? r ? We(Eu, {
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
        default: $,
        counter: S,
        tail: () => b
      }) : We(Eu, {
        ref: "overflowRef",
        updateCounter: this.updateCounter,
        getCounter: this.getCounter,
        style: {
          width: "100%",
          display: "flex",
          overflow: "hidden"
        }
      }, {
        default: $,
        counter: S
      }) : v && C ? $().concat(C) : $(), E = f ? () => We("div", {
        class: `${a}-base-selection-popover`
      }, p ? $() : this.selectedOptions.map(w)) : void 0, R = f ? Object.assign({
        show: this.showTagsPanel,
        trigger: "hover",
        overlap: !0,
        placement: "top",
        width: "trigger",
        onUpdateShow: this.onPopoverUpdateShow,
        theme: this.mergedTheme.peers.Popover,
        themeOverrides: this.mergedTheme.peerOverrides.Popover
      }, s) : null, W = (this.selected ? !1 : this.active ? !this.pattern && !this.isComposing : !0) ? We("div", {
        class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`
      }, We("div", {
        class: `${a}-base-selection-placeholder__inner`
      }, this.placeholder)) : null, _ = r ? We("div", {
        ref: "patternInputWrapperRef",
        class: `${a}-base-selection-tags`
      }, y, p ? null : b, g) : We("div", {
        ref: "multipleElRef",
        class: `${a}-base-selection-tags`,
        tabindex: o ? void 0 : 0
      }, y, g);
      m = We(I3, null, f ? We(Ii, Object.assign({}, R, {
        scrollable: !0,
        style: "max-height: calc(var(--v-target-height) * 6.6);"
      }), {
        trigger: () => _,
        default: E
      }) : _, W);
    } else if (r) {
      const u = this.pattern || this.isComposing, w = this.active ? !u : !this.selected, $ = this.active ? !1 : this.selected;
      m = We("div", {
        ref: "patternInputWrapperRef",
        class: `${a}-base-selection-label`,
        title: this.patternInputFocused ? void 0 : Mu(this.label)
      }, We("input", Object.assign({}, this.inputProps, {
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
      })), $ ? We("div", {
        class: `${a}-base-selection-label__render-label ${a}-base-selection-overlay`,
        key: "input"
      }, We("div", {
        class: `${a}-base-selection-overlay__wrapper`
      }, c ? c({
        option: this.selectedOption,
        handleClose: () => {
        }
      }) : h ? h(this.selectedOption, !0) : $n(this.label, this.selectedOption, !0))) : null, w ? We("div", {
        class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`,
        key: "placeholder"
      }, We("div", {
        class: `${a}-base-selection-overlay__wrapper`
      }, this.filterablePlaceholder)) : null, g);
    } else
      m = We("div", {
        ref: "singleElRef",
        class: `${a}-base-selection-label`,
        tabindex: this.disabled ? void 0 : 0
      }, this.label !== void 0 ? We("div", {
        class: `${a}-base-selection-input`,
        title: Mu(this.label),
        key: "input"
      }, We("div", {
        class: `${a}-base-selection-input__content`
      }, c ? c({
        option: this.selectedOption,
        handleClose: () => {
        }
      }) : h ? h(this.selectedOption, !0) : $n(this.label, this.selectedOption, !0))) : We("div", {
        class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`,
        key: "placeholder"
      }, We("div", {
        class: `${a}-base-selection-placeholder__inner`
      }, this.placeholder)), g);
    return We("div", {
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
    }, m, l ? We("div", {
      class: `${a}-base-selection__border`
    }) : null, l ? We("div", {
      class: `${a}-base-selection__state-border`
    }) : null);
  }
}), {
  cubicBezierEaseInOut: vo
} = Pn;
function D3({
  duration: e = ".2s",
  delay: t = ".1s"
} = {}) {
  return [I("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", {
    opacity: 1
  }), I("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), I("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${vo},
 max-width ${e} ${vo} ${t},
 margin-left ${e} ${vo} ${t},
 margin-right ${e} ${vo} ${t};
 `), I("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${vo} ${t},
 max-width ${e} ${vo},
 margin-left ${e} ${vo},
 margin-right ${e} ${vo};
 `)];
}
const N3 = P("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`), H3 = window.Vue.defineComponent, j3 = window.Vue.h, W3 = window.Vue.nextTick, U3 = window.Vue.onBeforeUnmount, Af = window.Vue.ref, K3 = window.Vue.toRef, q3 = H3({
  name: "BaseWave",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    nr("-base-wave", N3, K3(e, "clsPrefix"));
    const t = Af(null), n = Af(!1);
    let o = null;
    return U3(() => {
      o !== null && window.clearTimeout(o);
    }), {
      active: n,
      selfRef: t,
      play() {
        o !== null && (window.clearTimeout(o), n.value = !1, o = null), W3(() => {
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
    return j3("div", {
      ref: "selfRef",
      "aria-hidden": !0,
      class: [`${e}-base-wave`, this.active && `${e}-base-wave--active`]
    });
  }
}), G3 = Jo && "chrome" in window;
Jo && navigator.userAgent.includes("Firefox");
const hg = Jo && navigator.userAgent.includes("Safari") && !G3, X3 = {
  paddingTiny: "0 8px",
  paddingSmall: "0 10px",
  paddingMedium: "0 12px",
  paddingLarge: "0 14px",
  clearSize: "16px"
};
function Y3(e) {
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
    fontSizeTiny: g,
    fontSizeSmall: m,
    fontSizeMedium: u,
    fontSizeLarge: w,
    heightTiny: $,
    heightSmall: b,
    heightMedium: S,
    heightLarge: C,
    actionColor: y,
    clearColor: E,
    clearColorHover: R,
    clearColorPressed: O,
    placeholderColor: W,
    placeholderColorDisabled: _,
    iconColor: V,
    iconColorDisabled: B,
    iconColorHover: M,
    iconColorPressed: G,
    fontWeight: U
  } = e;
  return Object.assign(Object.assign({}, X3), {
    fontWeight: U,
    countTextColorDisabled: o,
    countTextColor: n,
    heightTiny: $,
    heightSmall: b,
    heightMedium: S,
    heightLarge: C,
    fontSizeTiny: g,
    fontSizeSmall: m,
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
    boxShadowFocus: `0 0 0 2px ${Ve(r, {
      alpha: 0.2
    })}`,
    loadingColor: r,
    // warning
    loadingColorWarning: d,
    borderWarning: `1px solid ${d}`,
    borderHoverWarning: `1px solid ${c}`,
    colorFocusWarning: l,
    borderFocusWarning: `1px solid ${c}`,
    boxShadowFocusWarning: `0 0 0 2px ${Ve(d, {
      alpha: 0.2
    })}`,
    caretColorWarning: d,
    // error
    loadingColorError: h,
    borderError: `1px solid ${h}`,
    borderHoverError: `1px solid ${p}`,
    colorFocusError: l,
    borderFocusError: `1px solid ${p}`,
    boxShadowFocusError: `0 0 0 2px ${Ve(h, {
      alpha: 0.2
    })}`,
    caretColorError: h,
    clearColor: E,
    clearColorHover: R,
    clearColorPressed: O,
    iconColor: V,
    iconColorDisabled: B,
    iconColorHover: M,
    iconColorPressed: G,
    suffixTextColor: t
  });
}
const cc = {
  name: "Input",
  common: wt,
  peers: {
    Scrollbar: Fr
  },
  self: Y3
}, pg = "n-input", Z3 = P("input", `
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
  L("input, textarea", `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),
  L("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder", `
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
  L("input-el, textarea-el", `
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `, [I("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), I("&::placeholder", `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `), I("&:-webkit-autofill ~", [L("placeholder", "display: none;")])]),
  N("round", [rt("textarea", "border-radius: calc(var(--n-height) / 2);")]),
  L("placeholder", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `, [I("span", `
 width: 100%;
 display: inline-block;
 `)]),
  N("textarea", [L("placeholder", "overflow: visible;")]),
  rt("autosize", "width: 100%;"),
  N("autosize", [L("textarea-el, input-el", `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),
  // input
  P("input-wrapper", `
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `),
  L("input-mirror", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `),
  L("input-el", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [I("&[type=password]::-ms-reveal", "display: none;"), I("+", [L("placeholder", `
 display: flex;
 align-items: center; 
 `)])]),
  rt("textarea", [L("placeholder", "white-space: nowrap;")]),
  L("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `),
  // textarea
  N("textarea", "width: 100%;", [P("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), N("resizable", [P("input-wrapper", `
 resize: vertical;
 min-height: var(--n-height);
 `)]), L("textarea-el, textarea-mirror, placeholder", `
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
 `), L("textarea-mirror", `
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),
  // pair
  N("pair", [L("input-el, placeholder", "text-align: center;"), L("separator", `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `, [P("icon", `
 color: var(--n-icon-color);
 `), P("base-icon", `
 color: var(--n-icon-color);
 `)])]),
  N("disabled", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [L("border", "border: var(--n-border-disabled);"), L("input-el, textarea-el", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), L("placeholder", "color: var(--n-placeholder-color-disabled);"), L("separator", "color: var(--n-text-color-disabled);", [P("icon", `
 color: var(--n-icon-color-disabled);
 `), P("base-icon", `
 color: var(--n-icon-color-disabled);
 `)]), P("input-word-count", `
 color: var(--n-count-text-color-disabled);
 `), L("suffix, prefix", "color: var(--n-text-color-disabled);", [P("icon", `
 color: var(--n-icon-color-disabled);
 `), P("internal-icon", `
 color: var(--n-icon-color-disabled);
 `)])]),
  rt("disabled", [L("eye", `
 color: var(--n-icon-color);
 cursor: pointer;
 `, [I("&:hover", `
 color: var(--n-icon-color-hover);
 `), I("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), I("&:hover", [L("state-border", "border: var(--n-border-hover);")]), N("focus", "background-color: var(--n-color-focus);", [L("state-border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),
  L("border, state-border", `
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
  L("state-border", `
 border-color: #0000;
 z-index: 1;
 `),
  L("prefix", "margin-right: 4px;"),
  L("suffix", `
 margin-left: 4px;
 `),
  L("suffix, prefix", `
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `, [P("base-loading", `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `), P("base-clear", `
 font-size: var(--n-icon-size);
 `, [L("placeholder", [P("base-icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), I(">", [P("icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), P("base-icon", `
 font-size: var(--n-icon-size);
 `)]),
  P("input-word-count", `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),
  ["warning", "error"].map((e) => N(`${e}-status`, [rt("disabled", [P("base-loading", `
 color: var(--n-loading-color-${e})
 `), L("input-el, textarea-el", `
 caret-color: var(--n-caret-color-${e});
 `), L("state-border", `
 border: var(--n-border-${e});
 `), I("&:hover", [L("state-border", `
 border: var(--n-border-hover-${e});
 `)]), I("&:focus", `
 background-color: var(--n-color-focus-${e});
 `, [L("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)]), N("focus", `
 background-color: var(--n-color-focus-${e});
 `, [L("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))
]), J3 = P("input", [N("disabled", [L("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]), Q3 = window.Vue.ref, eT = window.Vue.watch;
function tT(e) {
  let t = 0;
  for (const n of e)
    t++;
  return t;
}
function ha(e) {
  return e === "" || e == null;
}
function nT(e) {
  const t = Q3(null);
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
  return eT(e, r), {
    recordCursor: n,
    restoreCursor: o
  };
}
const oT = window.Vue.computed, rT = window.Vue.defineComponent, iT = window.Vue.h, aT = window.Vue.inject, Bf = rT({
  name: "InputWordCount",
  setup(e, {
    slots: t
  }) {
    const {
      mergedValueRef: n,
      maxlengthRef: o,
      mergedClsPrefixRef: r,
      countGraphemesRef: i
    } = aT(pg), l = oT(() => {
      const {
        value: a
      } = n;
      return a === null || Array.isArray(a) ? 0 : (i.value || tT)(a);
    });
    return () => {
      const {
        value: a
      } = o, {
        value: s
      } = n;
      return iT("span", {
        class: `${r.value}-input-word-count`
      }, c1(t.default, {
        value: s === null || Array.isArray(s) ? "" : s
      }, () => [a === void 0 ? l.value : `${l.value} / ${a}`]));
    };
  }
}), go = window.Vue.computed, lT = window.Vue.defineComponent, sT = window.Vue.Fragment, dT = window.Vue.getCurrentInstance, Ue = window.Vue.h, Lf = window.Vue.nextTick, cT = window.Vue.onMounted, uT = window.Vue.provide, Nt = window.Vue.ref, Df = window.Vue.toRef, Nf = window.Vue.watch, Hf = window.Vue.watchEffect, fT = Object.assign(Object.assign({}, _e.props), {
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
}), Rt = lT({
  name: "Input",
  props: fT,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBorderedRef: n,
      inlineThemeDisabled: o,
      mergedRtlRef: r
    } = je(e), i = _e("Input", "-input", Z3, cc, e, t);
    hg && nr("-input-safari", J3, t);
    const l = Nt(null), a = Nt(null), s = Nt(null), d = Nt(null), c = Nt(null), h = Nt(null), p = Nt(null), v = nT(p), f = Nt(null), {
      localeRef: g
    } = Tr("Input"), m = Nt(e.defaultValue), u = Df(e, "value"), w = Ot(u, m), $ = lo(e), {
      mergedSizeRef: b,
      mergedDisabledRef: S,
      mergedStatusRef: C
    } = $, y = Nt(!1), E = Nt(!1), R = Nt(!1), O = Nt(!1);
    let W = null;
    const _ = go(() => {
      const {
        placeholder: q,
        pair: se
      } = e;
      return se ? Array.isArray(q) ? q : q === void 0 ? ["", ""] : [q, q] : q === void 0 ? [g.value.placeholder] : [q];
    }), V = go(() => {
      const {
        value: q
      } = R, {
        value: se
      } = w, {
        value: ke
      } = _;
      return !q && (ha(se) || Array.isArray(se) && ha(se[0])) && ke[0];
    }), B = go(() => {
      const {
        value: q
      } = R, {
        value: se
      } = w, {
        value: ke
      } = _;
      return !q && ke[1] && (ha(se) || Array.isArray(se) && ha(se[1]));
    }), M = Be(() => e.internalForceFocus || y.value), G = Be(() => {
      if (S.value || e.readonly || !e.clearable || !M.value && !E.value)
        return !1;
      const {
        value: q
      } = w, {
        value: se
      } = M;
      return e.pair ? !!(Array.isArray(q) && (q[0] || q[1])) && (E.value || se) : !!q && (E.value || se);
    }), U = go(() => {
      const {
        showPasswordOn: q
      } = e;
      if (q)
        return q;
      if (e.showPasswordToggle) return "click";
    }), Q = Nt(!1), oe = go(() => {
      const {
        textDecoration: q
      } = e;
      return q ? Array.isArray(q) ? q.map((se) => ({
        textDecoration: se
      })) : [{
        textDecoration: q
      }] : ["", ""];
    }), ne = Nt(void 0), X = () => {
      var q, se;
      if (e.type === "textarea") {
        const {
          autosize: ke
        } = e;
        if (ke && (ne.value = (se = (q = f.value) === null || q === void 0 ? void 0 : q.$el) === null || se === void 0 ? void 0 : se.offsetWidth), !a.value || typeof ke == "boolean") return;
        const {
          paddingTop: Ae,
          paddingBottom: Ze,
          lineHeight: He
        } = window.getComputedStyle(a.value), ft = Number(Ae.slice(0, -2)), yt = Number(Ze.slice(0, -2)), on = Number(He.slice(0, -2)), {
          value: qn
        } = s;
        if (!qn) return;
        if (ke.minRows) {
          const Gn = Math.max(ke.minRows, 1), Oo = `${ft + yt + on * Gn}px`;
          qn.style.minHeight = Oo;
        }
        if (ke.maxRows) {
          const Gn = `${ft + yt + on * ke.maxRows}px`;
          qn.style.maxHeight = Gn;
        }
      }
    }, j = go(() => {
      const {
        maxlength: q
      } = e;
      return q === void 0 ? void 0 : Number(q);
    });
    cT(() => {
      const {
        value: q
      } = w;
      Array.isArray(q) || Ie(q);
    });
    const Z = dT().proxy;
    function te(q, se) {
      const {
        onUpdateValue: ke,
        "onUpdate:value": Ae,
        onInput: Ze
      } = e, {
        nTriggerFormInput: He
      } = $;
      ke && ue(ke, q, se), Ae && ue(Ae, q, se), Ze && ue(Ze, q, se), m.value = q, He();
    }
    function fe(q, se) {
      const {
        onChange: ke
      } = e, {
        nTriggerFormChange: Ae
      } = $;
      ke && ue(ke, q, se), m.value = q, Ae();
    }
    function he(q) {
      const {
        onBlur: se
      } = e, {
        nTriggerFormBlur: ke
      } = $;
      se && ue(se, q), ke();
    }
    function ve(q) {
      const {
        onFocus: se
      } = e, {
        nTriggerFormFocus: ke
      } = $;
      se && ue(se, q), ke();
    }
    function ye(q) {
      const {
        onClear: se
      } = e;
      se && ue(se, q);
    }
    function J(q) {
      const {
        onInputBlur: se
      } = e;
      se && ue(se, q);
    }
    function ge(q) {
      const {
        onInputFocus: se
      } = e;
      se && ue(se, q);
    }
    function Ee() {
      const {
        onDeactivate: q
      } = e;
      q && ue(q);
    }
    function xe() {
      const {
        onActivate: q
      } = e;
      q && ue(q);
    }
    function Te(q) {
      const {
        onClick: se
      } = e;
      se && ue(se, q);
    }
    function Re(q) {
      const {
        onWrapperFocus: se
      } = e;
      se && ue(se, q);
    }
    function Le(q) {
      const {
        onWrapperBlur: se
      } = e;
      se && ue(se, q);
    }
    function Fe() {
      R.value = !0;
    }
    function de(q) {
      R.value = !1, q.target === h.value ? T(q, 1) : T(q, 0);
    }
    function T(q, se = 0, ke = "input") {
      const Ae = q.target.value;
      if (Ie(Ae), q instanceof InputEvent && !q.isComposing && (R.value = !1), e.type === "textarea") {
        const {
          value: He
        } = f;
        He && He.syncUnifiedContainer();
      }
      if (W = Ae, R.value) return;
      v.recordCursor();
      const Ze = k(Ae);
      if (Ze)
        if (!e.pair)
          ke === "input" ? te(Ae, {
            source: se
          }) : fe(Ae, {
            source: se
          });
        else {
          let {
            value: He
          } = w;
          Array.isArray(He) ? He = [He[0], He[1]] : He = ["", ""], He[se] = Ae, ke === "input" ? te(He, {
            source: se
          }) : fe(He, {
            source: se
          });
        }
      Z.$forceUpdate(), Ze || Lf(v.restoreCursor);
    }
    function k(q) {
      const {
        countGraphemes: se,
        maxlength: ke,
        minlength: Ae
      } = e;
      if (se) {
        let He;
        if (ke !== void 0 && (He === void 0 && (He = se(q)), He > Number(ke)) || Ae !== void 0 && (He === void 0 && (He = se(q)), He < Number(ke)))
          return !1;
      }
      const {
        allowInput: Ze
      } = e;
      return typeof Ze == "function" ? Ze(q) : !0;
    }
    function z(q) {
      J(q), q.relatedTarget === l.value && Ee(), q.relatedTarget !== null && (q.relatedTarget === c.value || q.relatedTarget === h.value || q.relatedTarget === a.value) || (O.value = !1), F(q, "blur"), p.value = null;
    }
    function H(q, se) {
      ge(q), y.value = !0, O.value = !0, xe(), F(q, "focus"), se === 0 ? p.value = c.value : se === 1 ? p.value = h.value : se === 2 && (p.value = a.value);
    }
    function re(q) {
      e.passivelyActivated && (Le(q), F(q, "blur"));
    }
    function le(q) {
      e.passivelyActivated && (y.value = !0, Re(q), F(q, "focus"));
    }
    function F(q, se) {
      q.relatedTarget !== null && (q.relatedTarget === c.value || q.relatedTarget === h.value || q.relatedTarget === a.value || q.relatedTarget === l.value) || (se === "focus" ? (ve(q), y.value = !0) : se === "blur" && (he(q), y.value = !1));
    }
    function K(q, se) {
      T(q, se, "change");
    }
    function be(q) {
      Te(q);
    }
    function Pe(q) {
      ye(q), Ke();
    }
    function Ke() {
      e.pair ? (te(["", ""], {
        source: "clear"
      }), fe(["", ""], {
        source: "clear"
      })) : (te("", {
        source: "clear"
      }), fe("", {
        source: "clear"
      }));
    }
    function ct(q) {
      const {
        onMousedown: se
      } = e;
      se && se(q);
      const {
        tagName: ke
      } = q.target;
      if (ke !== "INPUT" && ke !== "TEXTAREA") {
        if (e.resizable) {
          const {
            value: Ae
          } = l;
          if (Ae) {
            const {
              left: Ze,
              top: He,
              width: ft,
              height: yt
            } = Ae.getBoundingClientRect(), on = 14;
            if (Ze + ft - on < q.clientX && q.clientX < Ze + ft && He + yt - on < q.clientY && q.clientY < He + yt)
              return;
          }
        }
        q.preventDefault(), y.value || ee();
      }
    }
    function qe() {
      var q;
      E.value = !0, e.type === "textarea" && ((q = f.value) === null || q === void 0 || q.handleMouseEnterWrapper());
    }
    function Ge() {
      var q;
      E.value = !1, e.type === "textarea" && ((q = f.value) === null || q === void 0 || q.handleMouseLeaveWrapper());
    }
    function vt() {
      S.value || U.value === "click" && (Q.value = !Q.value);
    }
    function Ne(q) {
      if (S.value) return;
      q.preventDefault();
      const se = (Ae) => {
        Ae.preventDefault(), at("mouseup", document, se);
      };
      if (pt("mouseup", document, se), U.value !== "mousedown") return;
      Q.value = !0;
      const ke = () => {
        Q.value = !1, at("mouseup", document, ke);
      };
      pt("mouseup", document, ke);
    }
    function we(q) {
      e.onKeyup && ue(e.onKeyup, q);
    }
    function D(q) {
      switch (e.onKeydown && ue(e.onKeydown, q), q.key) {
        case "Escape":
          A();
          break;
        case "Enter":
          x(q);
          break;
      }
    }
    function x(q) {
      var se, ke;
      if (e.passivelyActivated) {
        const {
          value: Ae
        } = O;
        if (Ae) {
          e.internalDeactivateOnEnter && A();
          return;
        }
        q.preventDefault(), e.type === "textarea" ? (se = a.value) === null || se === void 0 || se.focus() : (ke = c.value) === null || ke === void 0 || ke.focus();
      }
    }
    function A() {
      e.passivelyActivated && (O.value = !1, Lf(() => {
        var q;
        (q = l.value) === null || q === void 0 || q.focus();
      }));
    }
    function ee() {
      var q, se, ke;
      S.value || (e.passivelyActivated ? (q = l.value) === null || q === void 0 || q.focus() : ((se = a.value) === null || se === void 0 || se.focus(), (ke = c.value) === null || ke === void 0 || ke.focus()));
    }
    function Y() {
      var q;
      !((q = l.value) === null || q === void 0) && q.contains(document.activeElement) && document.activeElement.blur();
    }
    function ae() {
      var q, se;
      (q = a.value) === null || q === void 0 || q.select(), (se = c.value) === null || se === void 0 || se.select();
    }
    function me() {
      S.value || (a.value ? a.value.focus() : c.value && c.value.focus());
    }
    function pe() {
      const {
        value: q
      } = l;
      q != null && q.contains(document.activeElement) && q !== document.activeElement && A();
    }
    function Ce(q) {
      if (e.type === "textarea") {
        const {
          value: se
        } = a;
        se == null || se.scrollTo(q);
      } else {
        const {
          value: se
        } = c;
        se == null || se.scrollTo(q);
      }
    }
    function Ie(q) {
      const {
        type: se,
        pair: ke,
        autosize: Ae
      } = e;
      if (!ke && Ae)
        if (se === "textarea") {
          const {
            value: Ze
          } = s;
          Ze && (Ze.textContent = `${q ?? ""}\r
`);
        } else {
          const {
            value: Ze
          } = d;
          Ze && (q ? Ze.textContent = q : Ze.innerHTML = "&nbsp;");
        }
    }
    function Xe() {
      X();
    }
    const Me = Nt({
      top: "0"
    });
    function ut(q) {
      var se;
      const {
        scrollTop: ke
      } = q.target;
      Me.value.top = `${-ke}px`, (se = f.value) === null || se === void 0 || se.syncUnifiedContainer();
    }
    let lt = null;
    Hf(() => {
      const {
        autosize: q,
        type: se
      } = e;
      q && se === "textarea" ? lt = Nf(w, (ke) => {
        !Array.isArray(ke) && ke !== W && Ie(ke);
      }) : lt == null || lt();
    });
    let $t = null;
    Hf(() => {
      e.type === "textarea" ? $t = Nf(w, (q) => {
        var se;
        !Array.isArray(q) && q !== W && ((se = f.value) === null || se === void 0 || se.syncUnifiedContainer());
      }) : $t == null || $t();
    }), uT(pg, {
      mergedValueRef: w,
      maxlengthRef: j,
      mergedClsPrefixRef: t,
      countGraphemesRef: Df(e, "countGraphemes")
    });
    const tt = {
      wrapperElRef: l,
      inputElRef: c,
      textareaElRef: a,
      isCompositing: R,
      clear: Ke,
      focus: ee,
      blur: Y,
      select: ae,
      deactivate: pe,
      activate: me,
      scrollTo: Ce
    }, kt = Lt("Input", r, t), Xt = go(() => {
      const {
        value: q
      } = b, {
        common: {
          cubicBezierEaseInOut: se
        },
        self: {
          color: ke,
          borderRadius: Ae,
          textColor: Ze,
          caretColor: He,
          caretColorError: ft,
          caretColorWarning: yt,
          textDecorationColor: on,
          border: qn,
          borderDisabled: Gn,
          borderHover: Oo,
          borderFocus: Mr,
          placeholderColor: Ir,
          placeholderColorDisabled: Vr,
          lineHeightTextarea: Ar,
          colorDisabled: Br,
          colorFocus: uo,
          textColorDisabled: fo,
          boxShadowFocus: ml,
          iconSize: bl,
          colorFocusWarning: wl,
          boxShadowFocusWarning: yl,
          borderWarning: xl,
          borderFocusWarning: Cl,
          borderHoverWarning: Sl,
          colorFocusError: $l,
          boxShadowFocusError: Rl,
          borderError: kl,
          borderFocusError: Pl,
          borderHoverError: Zg,
          clearSize: Jg,
          clearColor: Qg,
          clearColorHover: em,
          clearColorPressed: tm,
          iconColor: nm,
          iconColorDisabled: om,
          suffixTextColor: rm,
          countTextColor: im,
          countTextColorDisabled: am,
          iconColorHover: lm,
          iconColorPressed: sm,
          loadingColor: dm,
          loadingColorError: cm,
          loadingColorWarning: um,
          fontWeight: fm,
          [ie("padding", q)]: hm,
          [ie("fontSize", q)]: pm,
          [ie("height", q)]: vm
        }
      } = i.value, {
        left: gm,
        right: mm
      } = Bt(hm);
      return {
        "--n-bezier": se,
        "--n-count-text-color": im,
        "--n-count-text-color-disabled": am,
        "--n-color": ke,
        "--n-font-size": pm,
        "--n-font-weight": fm,
        "--n-border-radius": Ae,
        "--n-height": vm,
        "--n-padding-left": gm,
        "--n-padding-right": mm,
        "--n-text-color": Ze,
        "--n-caret-color": He,
        "--n-text-decoration-color": on,
        "--n-border": qn,
        "--n-border-disabled": Gn,
        "--n-border-hover": Oo,
        "--n-border-focus": Mr,
        "--n-placeholder-color": Ir,
        "--n-placeholder-color-disabled": Vr,
        "--n-icon-size": bl,
        "--n-line-height-textarea": Ar,
        "--n-color-disabled": Br,
        "--n-color-focus": uo,
        "--n-text-color-disabled": fo,
        "--n-box-shadow-focus": ml,
        "--n-loading-color": dm,
        // form warning
        "--n-caret-color-warning": yt,
        "--n-color-focus-warning": wl,
        "--n-box-shadow-focus-warning": yl,
        "--n-border-warning": xl,
        "--n-border-focus-warning": Cl,
        "--n-border-hover-warning": Sl,
        "--n-loading-color-warning": um,
        // form error
        "--n-caret-color-error": ft,
        "--n-color-focus-error": $l,
        "--n-box-shadow-focus-error": Rl,
        "--n-border-error": kl,
        "--n-border-focus-error": Pl,
        "--n-border-hover-error": Zg,
        "--n-loading-color-error": cm,
        // clear-button
        "--n-clear-color": Qg,
        "--n-clear-size": Jg,
        "--n-clear-color-hover": em,
        "--n-clear-color-pressed": tm,
        "--n-icon-color": nm,
        "--n-icon-color-hover": lm,
        "--n-icon-color-pressed": sm,
        "--n-icon-color-disabled": om,
        "--n-suffix-text-color": rm
      };
    }), Yt = o ? St("input", go(() => {
      const {
        value: q
      } = b;
      return q[0];
    }), Xt, e) : void 0;
    return Object.assign(Object.assign({}, tt), {
      // DOM ref
      wrapperElRef: l,
      inputElRef: c,
      inputMirrorElRef: d,
      inputEl2Ref: h,
      textareaElRef: a,
      textareaMirrorElRef: s,
      textareaScrollbarInstRef: f,
      // value
      rtlEnabled: kt,
      uncontrolledValue: m,
      mergedValue: w,
      passwordVisible: Q,
      mergedPlaceholder: _,
      showPlaceholder1: V,
      showPlaceholder2: B,
      mergedFocus: M,
      isComposing: R,
      activated: O,
      showClearButton: G,
      mergedSize: b,
      mergedDisabled: S,
      textDecorationStyle: oe,
      mergedClsPrefix: t,
      mergedBordered: n,
      mergedShowPasswordOn: U,
      placeholderStyle: Me,
      mergedStatus: C,
      textAreaScrollContainerWidth: ne,
      // methods
      handleTextAreaScroll: ut,
      handleCompositionStart: Fe,
      handleCompositionEnd: de,
      handleInput: T,
      handleInputBlur: z,
      handleInputFocus: H,
      handleWrapperBlur: re,
      handleWrapperFocus: le,
      handleMouseEnter: qe,
      handleMouseLeave: Ge,
      handleMouseDown: ct,
      handleChange: K,
      handleClick: be,
      handleClear: Pe,
      handlePasswordToggleClick: vt,
      handlePasswordToggleMousedown: Ne,
      handleWrapperKeydown: D,
      handleWrapperKeyup: we,
      handleTextAreaMirrorResize: Xe,
      getTextareaScrollContainer: () => a.value,
      mergedTheme: i,
      cssVars: o ? void 0 : Xt,
      themeClass: Yt == null ? void 0 : Yt.themeClass,
      onRender: Yt == null ? void 0 : Yt.onRender
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
    return p == null || p(), Ue("div", {
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
    }, Ue("div", {
      class: `${a}-input-wrapper`
    }, Ye(v.prefix, (f) => f && Ue("div", {
      class: `${a}-input__prefix`
    }, f)), c === "textarea" ? Ue(or, {
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
        var f, g;
        const {
          textAreaScrollContainerWidth: m
        } = this, u = {
          width: this.autosize && m && `${m}px`
        };
        return Ue(sT, null, Ue("textarea", Object.assign({}, this.inputProps, {
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
          style: [this.textDecorationStyle[0], (g = this.inputProps) === null || g === void 0 ? void 0 : g.style, u],
          onBlur: this.handleInputBlur,
          onFocus: (w) => {
            this.handleInputFocus(w, 2);
          },
          onInput: this.handleInput,
          onChange: this.handleChange,
          onScroll: this.handleTextAreaScroll
        })), this.showPlaceholder1 ? Ue("div", {
          class: `${a}-input__placeholder`,
          style: [this.placeholderStyle, u],
          key: "placeholder"
        }, this.mergedPlaceholder[0]) : null, this.autosize ? Ue(Hn, {
          onResize: this.handleTextAreaMirrorResize
        }, {
          default: () => Ue("div", {
            ref: "textareaMirrorElRef",
            class: `${a}-input__textarea-mirror`,
            key: "mirror"
          })
        }) : null);
      }
    }) : Ue("div", {
      class: `${a}-input__input`
    }, Ue("input", Object.assign({
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
    })), this.showPlaceholder1 ? Ue("div", {
      class: `${a}-input__placeholder`
    }, Ue("span", null, this.mergedPlaceholder[0])) : null, this.autosize ? Ue("div", {
      class: `${a}-input__input-mirror`,
      key: "mirror",
      ref: "inputMirrorElRef"
    }, " ") : null), !this.pair && Ye(v.suffix, (f) => f || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? Ue("div", {
      class: `${a}-input__suffix`
    }, [Ye(v["clear-icon-placeholder"], (g) => (this.clearable || g) && Ue(gd, {
      clsPrefix: a,
      show: this.showClearButton,
      onClear: this.handleClear
    }, {
      placeholder: () => g,
      icon: () => {
        var m, u;
        return (u = (m = this.$slots)["clear-icon"]) === null || u === void 0 ? void 0 : u.call(m);
      }
    })), this.internalLoadingBeforeSuffix ? null : f, this.loading !== void 0 ? Ue(ug, {
      clsPrefix: a,
      loading: this.loading,
      showArrow: !1,
      showClear: !1,
      style: this.cssVars
    }) : null, this.internalLoadingBeforeSuffix ? f : null, this.showCount && this.type !== "textarea" ? Ue(Bf, null, {
      default: (g) => {
        var m;
        const {
          renderCount: u
        } = this;
        return u ? u(g) : (m = v.count) === null || m === void 0 ? void 0 : m.call(v, g);
      }
    }) : null, this.mergedShowPasswordOn && this.type === "password" ? Ue("div", {
      class: `${a}-input__eye`,
      onMousedown: this.handlePasswordToggleMousedown,
      onClick: this.handlePasswordToggleClick
    }, this.passwordVisible ? Rn(v["password-visible-icon"], () => [Ue(_t, {
      clsPrefix: a
    }, {
      default: () => Ue(pk, null)
    })]) : Rn(v["password-invisible-icon"], () => [Ue(_t, {
      clsPrefix: a
    }, {
      default: () => Ue(gk, null)
    })])) : null]) : null)), this.pair ? Ue("span", {
      class: `${a}-input__separator`
    }, Rn(v.separator, () => [this.separator])) : null, this.pair ? Ue("div", {
      class: `${a}-input-wrapper`
    }, Ue("div", {
      class: `${a}-input__input`
    }, Ue("input", {
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
    }), this.showPlaceholder2 ? Ue("div", {
      class: `${a}-input__placeholder`
    }, Ue("span", null, this.mergedPlaceholder[1])) : null), Ye(v.suffix, (f) => (this.clearable || f) && Ue("div", {
      class: `${a}-input__suffix`
    }, [this.clearable && Ue(gd, {
      clsPrefix: a,
      show: this.showClearButton,
      onClear: this.handleClear
    }, {
      icon: () => {
        var g;
        return (g = v["clear-icon"]) === null || g === void 0 ? void 0 : g.call(v);
      },
      placeholder: () => {
        var g;
        return (g = v["clear-icon-placeholder"]) === null || g === void 0 ? void 0 : g.call(v);
      }
    }), f]))) : null, this.mergedBordered ? Ue("div", {
      class: `${a}-input__border`
    }) : null, this.mergedBordered ? Ue("div", {
      class: `${a}-input__state-border`
    }) : null, this.showCount && c === "textarea" ? Ue(Bf, null, {
      default: (f) => {
        var g;
        const {
          renderCount: m
        } = this;
        return m ? m(f) : (g = v.count) === null || g === void 0 ? void 0 : g.call(v, f);
      }
    }) : null);
  }
});
function el(e) {
  return e.type === "group";
}
function vg(e) {
  return e.type === "ignored";
}
function cs(e, t) {
  try {
    return !!(1 + t.toString().toLowerCase().indexOf(e.trim().toLowerCase()));
  } catch {
    return !1;
  }
}
function gg(e, t) {
  return {
    getIsGroup: el,
    getIgnored: vg,
    getKey(o) {
      return el(o) ? o.name || o.key || "key-required" : o[e];
    },
    getChildren(o) {
      return o[t];
    }
  };
}
function hT(e, t, n, o) {
  if (!t) return e;
  function r(i) {
    if (!Array.isArray(i)) return [];
    const l = [];
    for (const a of i)
      if (el(a)) {
        const s = r(a[o]);
        s.length && l.push(Object.assign({}, a, {
          [o]: s
        }));
      } else {
        if (vg(a))
          continue;
        t(n, a) && l.push(a);
      }
    return l;
  }
  return r(e);
}
function pT(e, t, n) {
  const o = /* @__PURE__ */ new Map();
  return e.forEach((r) => {
    el(r) ? r[n].forEach((i) => {
      o.set(i[t], i);
    }) : o.set(r[t], r);
  }), o;
}
function Io(e) {
  return Je(e, [255, 255, 255, 0.16]);
}
function pa(e) {
  return Je(e, [0, 0, 0, 0.12]);
}
const vT = "n-button-group", gT = {
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
function mT(e) {
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
    borderColor: g,
    primaryColor: m,
    baseColor: u,
    infoColor: w,
    infoColorHover: $,
    infoColorPressed: b,
    successColor: S,
    successColorHover: C,
    successColorPressed: y,
    warningColor: E,
    warningColorHover: R,
    warningColorPressed: O,
    errorColor: W,
    errorColorHover: _,
    errorColorPressed: V,
    fontWeight: B,
    buttonColor2: M,
    buttonColor2Hover: G,
    buttonColor2Pressed: U,
    fontWeightStrong: Q
  } = e;
  return Object.assign(Object.assign({}, gT), {
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
    colorSecondary: M,
    colorSecondaryHover: G,
    colorSecondaryPressed: U,
    // tertiary
    colorTertiary: M,
    colorTertiaryHover: G,
    colorTertiaryPressed: U,
    // quaternary
    colorQuaternary: "#0000",
    colorQuaternaryHover: G,
    colorQuaternaryPressed: U,
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
    border: `1px solid ${g}`,
    borderHover: `1px solid ${v}`,
    borderPressed: `1px solid ${f}`,
    borderFocus: `1px solid ${v}`,
    borderDisabled: `1px solid ${g}`,
    rippleColor: m,
    // primary
    colorPrimary: m,
    colorHoverPrimary: v,
    colorPressedPrimary: f,
    colorFocusPrimary: v,
    colorDisabledPrimary: m,
    textColorPrimary: u,
    textColorHoverPrimary: u,
    textColorPressedPrimary: u,
    textColorFocusPrimary: u,
    textColorDisabledPrimary: u,
    textColorTextPrimary: m,
    textColorTextHoverPrimary: v,
    textColorTextPressedPrimary: f,
    textColorTextFocusPrimary: v,
    textColorTextDisabledPrimary: h,
    textColorGhostPrimary: m,
    textColorGhostHoverPrimary: v,
    textColorGhostPressedPrimary: f,
    textColorGhostFocusPrimary: v,
    textColorGhostDisabledPrimary: m,
    borderPrimary: `1px solid ${m}`,
    borderHoverPrimary: `1px solid ${v}`,
    borderPressedPrimary: `1px solid ${f}`,
    borderFocusPrimary: `1px solid ${v}`,
    borderDisabledPrimary: `1px solid ${m}`,
    rippleColorPrimary: m,
    // info
    colorInfo: w,
    colorHoverInfo: $,
    colorPressedInfo: b,
    colorFocusInfo: $,
    colorDisabledInfo: w,
    textColorInfo: u,
    textColorHoverInfo: u,
    textColorPressedInfo: u,
    textColorFocusInfo: u,
    textColorDisabledInfo: u,
    textColorTextInfo: w,
    textColorTextHoverInfo: $,
    textColorTextPressedInfo: b,
    textColorTextFocusInfo: $,
    textColorTextDisabledInfo: h,
    textColorGhostInfo: w,
    textColorGhostHoverInfo: $,
    textColorGhostPressedInfo: b,
    textColorGhostFocusInfo: $,
    textColorGhostDisabledInfo: w,
    borderInfo: `1px solid ${w}`,
    borderHoverInfo: `1px solid ${$}`,
    borderPressedInfo: `1px solid ${b}`,
    borderFocusInfo: `1px solid ${$}`,
    borderDisabledInfo: `1px solid ${w}`,
    rippleColorInfo: w,
    // success
    colorSuccess: S,
    colorHoverSuccess: C,
    colorPressedSuccess: y,
    colorFocusSuccess: C,
    colorDisabledSuccess: S,
    textColorSuccess: u,
    textColorHoverSuccess: u,
    textColorPressedSuccess: u,
    textColorFocusSuccess: u,
    textColorDisabledSuccess: u,
    textColorTextSuccess: S,
    textColorTextHoverSuccess: C,
    textColorTextPressedSuccess: y,
    textColorTextFocusSuccess: C,
    textColorTextDisabledSuccess: h,
    textColorGhostSuccess: S,
    textColorGhostHoverSuccess: C,
    textColorGhostPressedSuccess: y,
    textColorGhostFocusSuccess: C,
    textColorGhostDisabledSuccess: S,
    borderSuccess: `1px solid ${S}`,
    borderHoverSuccess: `1px solid ${C}`,
    borderPressedSuccess: `1px solid ${y}`,
    borderFocusSuccess: `1px solid ${C}`,
    borderDisabledSuccess: `1px solid ${S}`,
    rippleColorSuccess: S,
    // warning
    colorWarning: E,
    colorHoverWarning: R,
    colorPressedWarning: O,
    colorFocusWarning: R,
    colorDisabledWarning: E,
    textColorWarning: u,
    textColorHoverWarning: u,
    textColorPressedWarning: u,
    textColorFocusWarning: u,
    textColorDisabledWarning: u,
    textColorTextWarning: E,
    textColorTextHoverWarning: R,
    textColorTextPressedWarning: O,
    textColorTextFocusWarning: R,
    textColorTextDisabledWarning: h,
    textColorGhostWarning: E,
    textColorGhostHoverWarning: R,
    textColorGhostPressedWarning: O,
    textColorGhostFocusWarning: R,
    textColorGhostDisabledWarning: E,
    borderWarning: `1px solid ${E}`,
    borderHoverWarning: `1px solid ${R}`,
    borderPressedWarning: `1px solid ${O}`,
    borderFocusWarning: `1px solid ${R}`,
    borderDisabledWarning: `1px solid ${E}`,
    rippleColorWarning: E,
    // error
    colorError: W,
    colorHoverError: _,
    colorPressedError: V,
    colorFocusError: _,
    colorDisabledError: W,
    textColorError: u,
    textColorHoverError: u,
    textColorPressedError: u,
    textColorFocusError: u,
    textColorDisabledError: u,
    textColorTextError: W,
    textColorTextHoverError: _,
    textColorTextPressedError: V,
    textColorTextFocusError: _,
    textColorTextDisabledError: h,
    textColorGhostError: W,
    textColorGhostHoverError: _,
    textColorGhostPressedError: V,
    textColorGhostFocusError: _,
    textColorGhostDisabledError: W,
    borderError: `1px solid ${W}`,
    borderHoverError: `1px solid ${_}`,
    borderPressedError: `1px solid ${V}`,
    borderFocusError: `1px solid ${_}`,
    borderDisabledError: `1px solid ${W}`,
    rippleColorError: W,
    waveOpacity: "0.6",
    fontWeight: B,
    fontWeightStrong: Q
  });
}
const uc = {
  name: "Button",
  common: wt,
  self: mT
}, bT = I([P("button", `
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
 `, [N("color", [L("border", {
  borderColor: "var(--n-border-color)"
}), N("disabled", [L("border", {
  borderColor: "var(--n-border-color-disabled)"
})]), rt("disabled", [I("&:focus", [L("state-border", {
  borderColor: "var(--n-border-color-focus)"
})]), I("&:hover", [L("state-border", {
  borderColor: "var(--n-border-color-hover)"
})]), I("&:active", [L("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})]), N("pressed", [L("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})])])]), N("disabled", {
  backgroundColor: "var(--n-color-disabled)",
  color: "var(--n-text-color-disabled)"
}, [L("border", {
  border: "var(--n-border-disabled)"
})]), rt("disabled", [I("&:focus", {
  backgroundColor: "var(--n-color-focus)",
  color: "var(--n-text-color-focus)"
}, [L("state-border", {
  border: "var(--n-border-focus)"
})]), I("&:hover", {
  backgroundColor: "var(--n-color-hover)",
  color: "var(--n-text-color-hover)"
}, [L("state-border", {
  border: "var(--n-border-hover)"
})]), I("&:active", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [L("state-border", {
  border: "var(--n-border-pressed)"
})]), N("pressed", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [L("state-border", {
  border: "var(--n-border-pressed)"
})])]), N("loading", "cursor: wait;"), P("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [N("active", {
  zIndex: 1,
  animationName: "button-wave-spread, button-wave-opacity"
})]), Jo && "MozBoxSizing" in document.createElement("div").style ? I("&::moz-focus-inner", {
  border: 0
}) : null, L("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `), L("border", {
  border: "var(--n-border)"
}), L("state-border", {
  border: "var(--n-border)",
  borderColor: "#0000",
  zIndex: 1
}), L("icon", `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `, [P("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [hn({
  top: "50%",
  originalTransform: "translateY(-50%)"
})]), D3()]), L("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [I("~", [L("icon", {
  margin: "var(--n-icon-margin)",
  marginRight: 0
})])]), N("block", `
 display: flex;
 width: 100%;
 `), N("dashed", [L("border, state-border", {
  borderStyle: "dashed !important"
})]), N("disabled", {
  cursor: "not-allowed",
  opacity: "var(--n-opacity-disabled)"
})]), I("@keyframes button-wave-spread", {
  from: {
    boxShadow: "0 0 0.5px 0 var(--n-ripple-color)"
  },
  to: {
    // don't use exact 5px since chrome will display the animation with glitches
    boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)"
  }
}), I("@keyframes button-wave-opacity", {
  from: {
    opacity: "var(--n-wave-opacity)"
  },
  to: {
    opacity: 0
  }
})]), va = window.Vue.computed, wT = window.Vue.defineComponent, Fn = window.Vue.h, yT = window.Vue.inject, us = window.Vue.ref;
window.Vue.watchEffect;
const xT = Object.assign(Object.assign({}, _e.props), {
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
    default: !hg
  }
}), qt = wT({
  name: "Button",
  props: xT,
  slots: Object,
  setup(e) {
    const t = us(null), n = us(null), o = us(!1), r = Be(() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered), i = yT(vT, {}), {
      mergedSizeRef: l
    } = lo({}, {
      defaultSize: "medium",
      mergedSize: (b) => {
        const {
          size: S
        } = e;
        if (S) return S;
        const {
          size: C
        } = i;
        if (C) return C;
        const {
          mergedSize: y
        } = b || {};
        return y ? y.value : "medium";
      }
    }), a = va(() => e.focusable && !e.disabled), s = (b) => {
      var S;
      a.value || b.preventDefault(), !e.nativeFocusBehavior && (b.preventDefault(), !e.disabled && a.value && ((S = t.value) === null || S === void 0 || S.focus({
        preventScroll: !0
      })));
    }, d = (b) => {
      var S;
      if (!e.disabled && !e.loading) {
        const {
          onClick: C
        } = e;
        C && ue(C, b), e.text || (S = n.value) === null || S === void 0 || S.play();
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
      mergedRtlRef: g
    } = je(e), m = _e("Button", "-button", bT, uc, e, f), u = Lt("Button", g, f), w = va(() => {
      const b = m.value, {
        common: {
          cubicBezierEaseInOut: S,
          cubicBezierEaseOut: C
        },
        self: y
      } = b, {
        rippleDuration: E,
        opacityDisabled: R,
        fontWeight: O,
        fontWeightStrong: W
      } = y, _ = l.value, {
        dashed: V,
        type: B,
        ghost: M,
        text: G,
        color: U,
        round: Q,
        circle: oe,
        textColor: ne,
        secondary: X,
        tertiary: j,
        quaternary: Z,
        strong: te
      } = e, fe = {
        "--n-font-weight": te ? W : O
      };
      let he = {
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
      const ve = B === "tertiary", ye = B === "default", J = ve ? "default" : B;
      if (G) {
        const z = ne || U;
        he = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": "#0000",
          "--n-text-color": z || y[ie("textColorText", J)],
          "--n-text-color-hover": z ? Io(z) : y[ie("textColorTextHover", J)],
          "--n-text-color-pressed": z ? pa(z) : y[ie("textColorTextPressed", J)],
          "--n-text-color-focus": z ? Io(z) : y[ie("textColorTextHover", J)],
          "--n-text-color-disabled": z || y[ie("textColorTextDisabled", J)]
        };
      } else if (M || V) {
        const z = ne || U;
        he = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": U || y[ie("rippleColor", J)],
          "--n-text-color": z || y[ie("textColorGhost", J)],
          "--n-text-color-hover": z ? Io(z) : y[ie("textColorGhostHover", J)],
          "--n-text-color-pressed": z ? pa(z) : y[ie("textColorGhostPressed", J)],
          "--n-text-color-focus": z ? Io(z) : y[ie("textColorGhostHover", J)],
          "--n-text-color-disabled": z || y[ie("textColorGhostDisabled", J)]
        };
      } else if (X) {
        const z = ye ? y.textColor : ve ? y.textColorTertiary : y[ie("color", J)], H = U || z, re = B !== "default" && B !== "tertiary";
        he = {
          "--n-color": re ? Ve(H, {
            alpha: Number(y.colorOpacitySecondary)
          }) : y.colorSecondary,
          "--n-color-hover": re ? Ve(H, {
            alpha: Number(y.colorOpacitySecondaryHover)
          }) : y.colorSecondaryHover,
          "--n-color-pressed": re ? Ve(H, {
            alpha: Number(y.colorOpacitySecondaryPressed)
          }) : y.colorSecondaryPressed,
          "--n-color-focus": re ? Ve(H, {
            alpha: Number(y.colorOpacitySecondaryHover)
          }) : y.colorSecondaryHover,
          "--n-color-disabled": y.colorSecondary,
          "--n-ripple-color": "#0000",
          "--n-text-color": H,
          "--n-text-color-hover": H,
          "--n-text-color-pressed": H,
          "--n-text-color-focus": H,
          "--n-text-color-disabled": H
        };
      } else if (j || Z) {
        const z = ye ? y.textColor : ve ? y.textColorTertiary : y[ie("color", J)], H = U || z;
        j ? (he["--n-color"] = y.colorTertiary, he["--n-color-hover"] = y.colorTertiaryHover, he["--n-color-pressed"] = y.colorTertiaryPressed, he["--n-color-focus"] = y.colorSecondaryHover, he["--n-color-disabled"] = y.colorTertiary) : (he["--n-color"] = y.colorQuaternary, he["--n-color-hover"] = y.colorQuaternaryHover, he["--n-color-pressed"] = y.colorQuaternaryPressed, he["--n-color-focus"] = y.colorQuaternaryHover, he["--n-color-disabled"] = y.colorQuaternary), he["--n-ripple-color"] = "#0000", he["--n-text-color"] = H, he["--n-text-color-hover"] = H, he["--n-text-color-pressed"] = H, he["--n-text-color-focus"] = H, he["--n-text-color-disabled"] = H;
      } else
        he = {
          "--n-color": U || y[ie("color", J)],
          "--n-color-hover": U ? Io(U) : y[ie("colorHover", J)],
          "--n-color-pressed": U ? pa(U) : y[ie("colorPressed", J)],
          "--n-color-focus": U ? Io(U) : y[ie("colorFocus", J)],
          "--n-color-disabled": U || y[ie("colorDisabled", J)],
          "--n-ripple-color": U || y[ie("rippleColor", J)],
          "--n-text-color": ne || (U ? y.textColorPrimary : ve ? y.textColorTertiary : y[ie("textColor", J)]),
          "--n-text-color-hover": ne || (U ? y.textColorHoverPrimary : y[ie("textColorHover", J)]),
          "--n-text-color-pressed": ne || (U ? y.textColorPressedPrimary : y[ie("textColorPressed", J)]),
          "--n-text-color-focus": ne || (U ? y.textColorFocusPrimary : y[ie("textColorFocus", J)]),
          "--n-text-color-disabled": ne || (U ? y.textColorDisabledPrimary : y[ie("textColorDisabled", J)])
        };
      let ge = {
        "--n-border": "initial",
        "--n-border-hover": "initial",
        "--n-border-pressed": "initial",
        "--n-border-focus": "initial",
        "--n-border-disabled": "initial"
      };
      G ? ge = {
        "--n-border": "none",
        "--n-border-hover": "none",
        "--n-border-pressed": "none",
        "--n-border-focus": "none",
        "--n-border-disabled": "none"
      } : ge = {
        "--n-border": y[ie("border", J)],
        "--n-border-hover": y[ie("borderHover", J)],
        "--n-border-pressed": y[ie("borderPressed", J)],
        "--n-border-focus": y[ie("borderFocus", J)],
        "--n-border-disabled": y[ie("borderDisabled", J)]
      };
      const {
        [ie("height", _)]: Ee,
        [ie("fontSize", _)]: xe,
        [ie("padding", _)]: Te,
        [ie("paddingRound", _)]: Re,
        [ie("iconSize", _)]: Le,
        [ie("borderRadius", _)]: Fe,
        [ie("iconMargin", _)]: de,
        waveOpacity: T
      } = y, k = {
        "--n-width": oe && !G ? Ee : "initial",
        "--n-height": G ? "initial" : Ee,
        "--n-font-size": xe,
        "--n-padding": oe || G ? "initial" : Q ? Re : Te,
        "--n-icon-size": Le,
        "--n-icon-margin": de,
        "--n-border-radius": G ? "initial" : oe || Q ? Ee : Fe
      };
      return Object.assign(Object.assign(Object.assign(Object.assign({
        "--n-bezier": S,
        "--n-bezier-ease-out": C,
        "--n-ripple-duration": E,
        "--n-opacity-disabled": R,
        "--n-wave-opacity": T
      }, fe), he), ge), k);
    }), $ = v ? St("button", va(() => {
      let b = "";
      const {
        dashed: S,
        type: C,
        ghost: y,
        text: E,
        color: R,
        round: O,
        circle: W,
        textColor: _,
        secondary: V,
        tertiary: B,
        quaternary: M,
        strong: G
      } = e;
      S && (b += "a"), y && (b += "b"), E && (b += "c"), O && (b += "d"), W && (b += "e"), V && (b += "f"), B && (b += "g"), M && (b += "h"), G && (b += "i"), R && (b += `j${qa(R)}`), _ && (b += `k${qa(_)}`);
      const {
        value: U
      } = l;
      return b += `l${U[0]}`, b += `m${C[0]}`, b;
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
      customColorCssVars: va(() => {
        const {
          color: b
        } = e;
        if (!b) return null;
        const S = Io(b);
        return {
          "--n-border-color": b,
          "--n-border-color-hover": S,
          "--n-border-color-pressed": pa(b),
          "--n-border-color-focus": S,
          "--n-border-color-disabled": b
        };
      }),
      cssVars: v ? void 0 : w,
      themeClass: $ == null ? void 0 : $.themeClass,
      onRender: $ == null ? void 0 : $.onRender
    };
  },
  render() {
    const {
      mergedClsPrefix: e,
      tag: t,
      onRender: n
    } = this;
    n == null || n();
    const o = Ye(this.$slots.default, (r) => r && Fn("span", {
      class: `${e}-button__content`
    }, r));
    return Fn(t, {
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
    }, this.iconPlacement === "right" && o, Fn(Lk, {
      width: !0
    }, {
      default: () => Ye(this.$slots.icon, (r) => (this.loading || this.renderIcon || r) && Fn("span", {
        class: `${e}-button__icon`,
        style: {
          margin: xr(this.$slots.default) ? "0" : ""
        }
      }, Fn(_r, null, {
        default: () => this.loading ? Fn(zr, {
          clsPrefix: e,
          key: "loading",
          class: `${e}-icon-slot`,
          strokeWidth: 20
        }) : Fn("div", {
          key: "icon",
          class: `${e}-icon-slot`,
          role: "none"
        }, this.renderIcon ? this.renderIcon() : r)
      })))
    }), this.iconPlacement === "left" && o, this.text ? null : Fn(q3, {
      ref: "waveElRef",
      clsPrefix: e
    }), this.showBorder ? Fn("div", {
      "aria-hidden": !0,
      class: `${e}-button__border`,
      style: this.customColorCssVars
    }) : null, this.showBorder ? Fn("div", {
      "aria-hidden": !0,
      class: `${e}-button__state-border`,
      style: this.customColorCssVars
    }) : null);
  }
}), jf = qt, CT = {
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
function ST(e) {
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
    modalColor: g,
    boxShadow1: m,
    popoverColor: u,
    actionColor: w
  } = e;
  return Object.assign(Object.assign({}, CT), {
    lineHeight: o,
    color: i,
    colorModal: g,
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
    boxShadow: m,
    borderRadius: n
  });
}
const $T = {
  common: wt,
  self: ST
}, RT = I([P("card", `
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
 `, [Aw({
  background: "var(--n-color-modal)"
}), N("hoverable", [I("&:hover", "box-shadow: var(--n-box-shadow);")]), N("content-segmented", [I(">", [L("content", {
  paddingTop: "var(--n-padding-bottom)"
})])]), N("content-soft-segmented", [I(">", [L("content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])]), N("footer-segmented", [I(">", [L("footer", {
  paddingTop: "var(--n-padding-bottom)"
})])]), N("footer-soft-segmented", [I(">", [L("footer", `
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]), I(">", [P("card-header", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `, [L("main", `
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `), L("extra", `
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), L("close", `
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), L("action", `
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `), L("content", "flex: 1; min-width: 0;"), L("content, footer", `
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `, [I("&:first-child", {
  paddingTop: "var(--n-padding-bottom)"
})]), L("action", `
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]), P("card-cover", `
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `, [I("img", `
 display: block;
 width: 100%;
 `)]), N("bordered", `
 border: 1px solid var(--n-border-color);
 `, [I("&:target", "border-color: var(--n-color-target);")]), N("action-segmented", [I(">", [L("action", [I("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), N("content-segmented, content-soft-segmented", [I(">", [L("content", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [I("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), N("footer-segmented, footer-soft-segmented", [I(">", [L("footer", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [I("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), N("embedded", `
 background-color: var(--n-color-embedded);
 `)]), Vd(P("card", `
 background: var(--n-color-modal);
 `, [N("embedded", `
 background-color: var(--n-color-embedded-modal);
 `)])), Ad(P("card", `
 background: var(--n-color-popover);
 `, [N("embedded", `
 background-color: var(--n-color-embedded-popover);
 `)]))]), Wf = window.Vue.computed, kT = window.Vue.defineComponent, Qn = window.Vue.h, PT = {
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
}, TT = Object.assign(Object.assign({}, _e.props), PT), Uf = kT({
  name: "Card",
  props: TT,
  slots: Object,
  setup(e) {
    const t = () => {
      const {
        onClose: d
      } = e;
      d && ue(d);
    }, {
      inlineThemeDisabled: n,
      mergedClsPrefixRef: o,
      mergedRtlRef: r
    } = je(e), i = _e("Card", "-card", RT, $T, e, o), l = Lt("Card", r, o), a = Wf(() => {
      const {
        size: d
      } = e, {
        self: {
          color: c,
          colorModal: h,
          colorTarget: p,
          textColor: v,
          titleTextColor: f,
          titleFontWeight: g,
          borderColor: m,
          actionColor: u,
          borderRadius: w,
          lineHeight: $,
          closeIconColor: b,
          closeIconColorHover: S,
          closeIconColorPressed: C,
          closeColorHover: y,
          closeColorPressed: E,
          closeBorderRadius: R,
          closeIconSize: O,
          closeSize: W,
          boxShadow: _,
          colorPopover: V,
          colorEmbedded: B,
          colorEmbeddedModal: M,
          colorEmbeddedPopover: G,
          [ie("padding", d)]: U,
          [ie("fontSize", d)]: Q,
          [ie("titleFontSize", d)]: oe
        },
        common: {
          cubicBezierEaseInOut: ne
        }
      } = i.value, {
        top: X,
        left: j,
        bottom: Z
      } = Bt(U);
      return {
        "--n-bezier": ne,
        "--n-border-radius": w,
        "--n-color": c,
        "--n-color-modal": h,
        "--n-color-popover": V,
        "--n-color-embedded": B,
        "--n-color-embedded-modal": M,
        "--n-color-embedded-popover": G,
        "--n-color-target": p,
        "--n-text-color": v,
        "--n-line-height": $,
        "--n-action-color": u,
        "--n-title-text-color": f,
        "--n-title-font-weight": g,
        "--n-close-icon-color": b,
        "--n-close-icon-color-hover": S,
        "--n-close-icon-color-pressed": C,
        "--n-close-color-hover": y,
        "--n-close-color-pressed": E,
        "--n-border-color": m,
        "--n-box-shadow": _,
        // size
        "--n-padding-top": X,
        "--n-padding-bottom": Z,
        "--n-padding-left": j,
        "--n-font-size": Q,
        "--n-title-font-size": oe,
        "--n-close-size": W,
        "--n-close-icon-size": O,
        "--n-close-border-radius": R
      };
    }), s = n ? St("card", Wf(() => e.size[0]), a, e) : void 0;
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
    return i == null || i(), Qn(a, {
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
    }, Ye(s.cover, (d) => {
      const c = this.cover ? Cn([this.cover()]) : d;
      return c && Qn("div", {
        class: `${o}-card-cover`,
        role: "none"
      }, c);
    }), Ye(s.header, (d) => {
      const {
        title: c
      } = this, h = c ? Cn(typeof c == "function" ? [c()] : [c]) : d;
      return h || this.closable ? Qn("div", {
        class: [`${o}-card-header`, this.headerClass],
        style: this.headerStyle,
        role: "heading"
      }, Qn("div", {
        class: `${o}-card-header__main`,
        role: "heading"
      }, h), Ye(s["header-extra"], (p) => {
        const v = this.headerExtra ? Cn([this.headerExtra()]) : p;
        return v && Qn("div", {
          class: [`${o}-card-header__extra`, this.headerExtraClass],
          style: this.headerExtraStyle
        }, v);
      }), this.closable && Qn(hl, {
        clsPrefix: o,
        class: `${o}-card-header__close`,
        onClick: this.handleCloseClick,
        focusable: this.closeFocusable,
        absolute: !0
      })) : null;
    }), Ye(s.default, (d) => {
      const {
        content: c
      } = this, h = c ? Cn(typeof c == "function" ? [c()] : [c]) : d;
      return h && Qn("div", {
        class: [`${o}-card__content`, this.contentClass],
        style: this.contentStyle,
        role: "none"
      }, h);
    }), Ye(s.footer, (d) => {
      const c = this.footer ? Cn([this.footer()]) : d;
      return c && Qn("div", {
        class: [`${o}-card__footer`, this.footerClass],
        style: this.footerStyle,
        role: "none"
      }, c);
    }), Ye(s.action, (d) => {
      const c = this.action ? Cn([this.action()]) : d;
      return c && Qn("div", {
        class: `${o}-card__action`,
        role: "none"
      }, c);
    }));
  }
}), _T = {
  sizeSmall: "14px",
  sizeMedium: "16px",
  sizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function ET(e) {
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
  return Object.assign(Object.assign({}, _T), {
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
    boxShadowFocus: `0 0 0 2px ${Ve(s, {
      alpha: 0.3
    })}`,
    textColor: d,
    textColorDisabled: l
  });
}
const mg = {
  name: "Checkbox",
  common: wt,
  self: ET
}, fs = window.Vue.computed, zT = window.Vue.defineComponent, FT = window.Vue.h, OT = window.Vue.provide, MT = window.Vue.ref, Kf = window.Vue.toRef;
window.Vue.watchEffect;
const bg = "n-checkbox-group", IT = {
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
}, VT = zT({
  name: "CheckboxGroup",
  props: IT,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = je(e), n = lo(e), {
      mergedSizeRef: o,
      mergedDisabledRef: r
    } = n, i = MT(e.defaultValue), l = fs(() => e.value), a = Ot(l, i), s = fs(() => {
      var h;
      return ((h = a.value) === null || h === void 0 ? void 0 : h.length) || 0;
    }), d = fs(() => Array.isArray(a.value) ? new Set(a.value) : /* @__PURE__ */ new Set());
    function c(h, p) {
      const {
        nTriggerFormInput: v,
        nTriggerFormChange: f
      } = n, {
        onChange: g,
        "onUpdate:value": m,
        onUpdateValue: u
      } = e;
      if (Array.isArray(a.value)) {
        const w = Array.from(a.value), $ = w.findIndex((b) => b === p);
        h ? ~$ || (w.push(p), u && ue(u, w, {
          actionType: "check",
          value: p
        }), m && ue(m, w, {
          actionType: "check",
          value: p
        }), v(), f(), i.value = w, g && ue(g, w)) : ~$ && (w.splice($, 1), u && ue(u, w, {
          actionType: "uncheck",
          value: p
        }), m && ue(m, w, {
          actionType: "uncheck",
          value: p
        }), g && ue(g, w), i.value = w, v(), f());
      } else
        h ? (u && ue(u, [p], {
          actionType: "check",
          value: p
        }), m && ue(m, [p], {
          actionType: "check",
          value: p
        }), g && ue(g, [p]), i.value = [p], v(), f()) : (u && ue(u, [], {
          actionType: "uncheck",
          value: p
        }), m && ue(m, [], {
          actionType: "uncheck",
          value: p
        }), g && ue(g, []), i.value = [], v(), f());
    }
    return OT(bg, {
      checkedCountRef: s,
      maxRef: Kf(e, "max"),
      minRef: Kf(e, "min"),
      valueSetRef: d,
      disabledRef: r,
      mergedSizeRef: o,
      toggleCheckbox: c
    }), {
      mergedClsPrefix: t
    };
  },
  render() {
    return FT("div", {
      class: `${this.mergedClsPrefix}-checkbox-group`,
      role: "group"
    }, this.$slots);
  }
}), qf = window.Vue.h, AT = () => qf("svg", {
  viewBox: "0 0 64 64",
  class: "check-icon"
}, qf("path", {
  d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"
})), Gf = window.Vue.h, BT = () => Gf("svg", {
  viewBox: "0 0 100 100",
  class: "line-icon"
}, Gf("path", {
  d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z"
})), LT = I([
  P("checkbox", `
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `, [N("show-label", "line-height: var(--n-label-line-height);"), I("&:hover", [P("checkbox-box", [L("border", "border: var(--n-border-checked);")])]), I("&:focus:not(:active)", [P("checkbox-box", [L("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), N("inside-table", [P("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), N("checked", [P("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [P("checkbox-icon", [
    // if not set width to 100%, safari & old chrome won't display the icon
    I(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)
  ])])]), N("indeterminate", [P("checkbox-box", [P("checkbox-icon", [I(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), I(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), N("checked, indeterminate", [I("&:focus:not(:active)", [P("checkbox-box", [L("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), P("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [L("border", {
    border: "var(--n-border-checked)"
  })])]), N("disabled", {
    cursor: "not-allowed"
  }, [N("checked", [P("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [L("border", {
    border: "var(--n-border-disabled-checked)"
  }), P("checkbox-icon", [I(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled-checked)"
  })])])]), P("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [L("border", `
 border: var(--n-border-disabled);
 `), P("checkbox-icon", [I(".check-icon, .line-icon", `
 fill: var(--n-check-mark-color-disabled);
 `)])]), L("label", `
 color: var(--n-text-color-disabled);
 `)]), P("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), P("checkbox-box", `
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
 `, [L("border", `
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
 `), P("checkbox-icon", `
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `, [I(".check-icon, .line-icon", `
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
 `), hn({
    left: "1px",
    top: "1px"
  })])]), L("label", `
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `, [I("&:empty", {
    display: "none"
  })])]),
  // modal table header checkbox
  Vd(P("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)),
  // popover table header checkbox
  Ad(P("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))
]), Xf = window.Vue.computed, DT = window.Vue.defineComponent, mo = window.Vue.h, NT = window.Vue.inject, Yf = window.Vue.ref, HT = window.Vue.toRef;
window.Vue.watchEffect;
const jT = Object.assign(Object.assign({}, _e.props), {
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
}), fc = DT({
  name: "Checkbox",
  props: jT,
  setup(e) {
    const t = NT(bg, null), n = Yf(null), {
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = je(e), l = Yf(e.defaultChecked), a = HT(e, "checked"), s = Ot(a, l), d = Be(() => {
      if (t) {
        const C = t.valueSetRef.value;
        return C && e.value !== void 0 ? C.has(e.value) : !1;
      } else
        return s.value === e.checkedValue;
    }), c = lo(e, {
      mergedSize(C) {
        const {
          size: y
        } = e;
        if (y !== void 0) return y;
        if (t) {
          const {
            value: E
          } = t.mergedSizeRef;
          if (E !== void 0)
            return E;
        }
        if (C) {
          const {
            mergedSize: E
          } = C;
          if (E !== void 0) return E.value;
        }
        return "medium";
      },
      mergedDisabled(C) {
        const {
          disabled: y
        } = e;
        if (y !== void 0) return y;
        if (t) {
          if (t.disabledRef.value) return !0;
          const {
            maxRef: {
              value: E
            },
            checkedCountRef: R
          } = t;
          if (E !== void 0 && R.value >= E && !d.value)
            return !0;
          const {
            minRef: {
              value: O
            }
          } = t;
          if (O !== void 0 && R.value <= O && d.value)
            return !0;
        }
        return C ? C.disabled.value : !1;
      }
    }), {
      mergedDisabledRef: h,
      mergedSizeRef: p
    } = c, v = _e("Checkbox", "-checkbox", LT, mg, e, o);
    function f(C) {
      if (t && e.value !== void 0)
        t.toggleCheckbox(!d.value, e.value);
      else {
        const {
          onChange: y,
          "onUpdate:checked": E,
          onUpdateChecked: R
        } = e, {
          nTriggerFormInput: O,
          nTriggerFormChange: W
        } = c, _ = d.value ? e.uncheckedValue : e.checkedValue;
        E && ue(E, _, C), R && ue(R, _, C), y && ue(y, _, C), O(), W(), l.value = _;
      }
    }
    function g(C) {
      h.value || f(C);
    }
    function m(C) {
      if (!h.value)
        switch (C.key) {
          case " ":
          case "Enter":
            f(C);
        }
    }
    function u(C) {
      switch (C.key) {
        case " ":
          C.preventDefault();
      }
    }
    const w = {
      focus: () => {
        var C;
        (C = n.value) === null || C === void 0 || C.focus();
      },
      blur: () => {
        var C;
        (C = n.value) === null || C === void 0 || C.blur();
      }
    }, $ = Lt("Checkbox", i, o), b = Xf(() => {
      const {
        value: C
      } = p, {
        common: {
          cubicBezierEaseInOut: y
        },
        self: {
          borderRadius: E,
          color: R,
          colorChecked: O,
          colorDisabled: W,
          colorTableHeader: _,
          colorTableHeaderModal: V,
          colorTableHeaderPopover: B,
          checkMarkColor: M,
          checkMarkColorDisabled: G,
          border: U,
          borderFocus: Q,
          borderDisabled: oe,
          borderChecked: ne,
          boxShadowFocus: X,
          textColor: j,
          textColorDisabled: Z,
          checkMarkColorDisabledChecked: te,
          colorDisabledChecked: fe,
          borderDisabledChecked: he,
          labelPadding: ve,
          labelLineHeight: ye,
          labelFontWeight: J,
          [ie("fontSize", C)]: ge,
          [ie("size", C)]: Ee
        }
      } = v.value;
      return {
        "--n-label-line-height": ye,
        "--n-label-font-weight": J,
        "--n-size": Ee,
        "--n-bezier": y,
        "--n-border-radius": E,
        "--n-border": U,
        "--n-border-checked": ne,
        "--n-border-focus": Q,
        "--n-border-disabled": oe,
        "--n-border-disabled-checked": he,
        "--n-box-shadow-focus": X,
        "--n-color": R,
        "--n-color-checked": O,
        "--n-color-table": _,
        "--n-color-table-modal": V,
        "--n-color-table-popover": B,
        "--n-color-disabled": W,
        "--n-color-disabled-checked": fe,
        "--n-text-color": j,
        "--n-text-color-disabled": Z,
        "--n-check-mark-color": M,
        "--n-check-mark-color-disabled": G,
        "--n-check-mark-color-disabled-checked": te,
        "--n-font-size": ge,
        "--n-label-padding": ve
      };
    }), S = r ? St("checkbox", Xf(() => p.value[0]), b, e) : void 0;
    return Object.assign(c, w, {
      rtlEnabled: $,
      selfRef: n,
      mergedClsPrefix: o,
      mergedDisabled: h,
      renderedChecked: d,
      mergedTheme: v,
      labelId: Si(),
      handleClick: g,
      handleKeyUp: m,
      handleKeyDown: u,
      cssVars: r ? void 0 : b,
      themeClass: S == null ? void 0 : S.themeClass,
      onRender: S == null ? void 0 : S.onRender
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
    const f = Ye(t.default, (g) => s || g ? mo("span", {
      class: `${d}-checkbox__label`,
      id: a
    }, s || g) : null);
    return mo("div", {
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
        pt("selectstart", window, (g) => {
          g.preventDefault();
        }, {
          once: !0
        });
      }
    }, mo("div", {
      class: `${d}-checkbox-box-wrapper`
    }, " ", mo("div", {
      class: `${d}-checkbox-box`
    }, mo(_r, null, {
      default: () => this.indeterminate ? mo("div", {
        key: "indeterminate",
        class: `${d}-checkbox-icon`
      }, BT()) : mo("div", {
        key: "check",
        class: `${d}-checkbox-icon`
      }, AT())
    }), mo("div", {
      class: `${d}-checkbox-box__border`
    }))), f);
  }
});
function WT(e) {
  const {
    boxShadow2: t
  } = e;
  return {
    menuBoxShadow: t
  };
}
const hc = {
  name: "Popselect",
  common: wt,
  peers: {
    Popover: Or,
    InternalSelectMenu: dc
  },
  self: WT
}, wg = "n-popselect", UT = P("popselect-menu", `
 box-shadow: var(--n-menu-box-shadow);
`), Zf = window.Vue.computed, KT = window.Vue.defineComponent, qT = window.Vue.h, GT = window.Vue.inject, Jf = window.Vue.nextTick, XT = window.Vue.toRef, YT = window.Vue.watch;
window.Vue.watchEffect;
const pc = {
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
}, Qf = Pi(pc), ZT = KT({
  name: "PopselectPanel",
  props: pc,
  setup(e) {
    const t = GT(wg), {
      mergedClsPrefixRef: n,
      inlineThemeDisabled: o
    } = je(e), r = _e("Popselect", "-pop-select", UT, hc, t.props, n), i = Zf(() => pl(e.options, gg("value", "children")));
    function l(p, v) {
      const {
        onUpdateValue: f,
        "onUpdate:value": g,
        onChange: m
      } = e;
      f && ue(f, p, v), g && ue(g, p, v), m && ue(m, p, v);
    }
    function a(p) {
      d(p.key);
    }
    function s(p) {
      !pn(p, "action") && !pn(p, "empty") && !pn(p, "header") && p.preventDefault();
    }
    function d(p) {
      const {
        value: {
          getNode: v
        }
      } = i;
      if (e.multiple)
        if (Array.isArray(e.value)) {
          const f = [], g = [];
          let m = !0;
          e.value.forEach((u) => {
            if (u === p) {
              m = !1;
              return;
            }
            const w = v(u);
            w && (f.push(w.key), g.push(w.rawNode));
          }), m && (f.push(p), g.push(v(p).rawNode)), l(f, g);
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
          "onUpdate:show": g,
          onUpdateShow: m
        } = t.props;
        g && ue(g, !1), m && ue(m, !1), t.setShow(!1);
      }
      Jf(() => {
        t.syncPosition();
      });
    }
    YT(XT(e, "options"), () => {
      Jf(() => {
        t.syncPosition();
      });
    });
    const c = Zf(() => {
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
    return (e = this.onRender) === null || e === void 0 || e.call(this), qT(sg, {
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
}), JT = window.Vue.defineComponent, eh = window.Vue.h, QT = window.Vue.provide, e_ = window.Vue.ref, t_ = Object.assign(Object.assign(Object.assign(Object.assign({}, _e.props), Xd(Rr, ["showArrow", "arrow"])), {
  placement: Object.assign(Object.assign({}, Rr.placement), {
    default: "bottom"
  }),
  trigger: {
    type: String,
    default: "hover"
  }
}), pc), n_ = JT({
  name: "Popselect",
  props: t_,
  slots: Object,
  inheritAttrs: !1,
  __popover__: !0,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = je(e), n = _e("Popselect", "-popselect", void 0, hc, e, t), o = e_(null);
    function r() {
      var a;
      (a = o.value) === null || a === void 0 || a.syncPosition();
    }
    function i(a) {
      var s;
      (s = o.value) === null || s === void 0 || s.setShow(a);
    }
    return QT(wg, {
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
        return eh(ZT, Object.assign({}, a, {
          class: [a.class, n],
          style: [a.style, ...r]
        }, ki(this.$props, Qf), {
          ref: wv(o),
          onMouseenter: fi([i, a.onMouseenter]),
          onMouseleave: fi([l, a.onMouseleave])
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
    return eh(Ii, Object.assign({}, Xd(this.$props, Qf), t, {
      internalDeactivateImmediately: !0
    }), {
      trigger: () => {
        var n, o;
        return (o = (n = this.$slots).default) === null || o === void 0 ? void 0 : o.call(n);
      }
    });
  }
});
function o_(e) {
  const {
    boxShadow2: t
  } = e;
  return {
    menuBoxShadow: t
  };
}
const yg = {
  name: "Select",
  common: wt,
  peers: {
    InternalSelection: fg,
    InternalSelectMenu: dc
  },
  self: o_
}, r_ = I([P("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `), P("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [vl({
  originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
})])]), On = window.Vue.computed, i_ = window.Vue.defineComponent, Vo = window.Vue.h, bn = window.Vue.ref, hs = window.Vue.toRef, a_ = window.Vue.Transition, l_ = window.Vue.vShow, s_ = window.Vue.watch;
window.Vue.watchEffect;
const d_ = window.Vue.withDirectives, c_ = Object.assign(Object.assign({}, _e.props), {
  to: Wn.propTo,
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
}), br = i_({
  name: "Select",
  props: c_,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBorderedRef: n,
      namespaceRef: o,
      inlineThemeDisabled: r
    } = je(e), i = _e("Select", "-select", r_, yg, e, t), l = bn(e.defaultValue), a = hs(e, "value"), s = Ot(a, l), d = bn(!1), c = bn(""), h = Ka(e, ["items", "options"]), p = bn([]), v = bn([]), f = On(() => v.value.concat(p.value).concat(h.value)), g = On(() => {
      const {
        filter: x
      } = e;
      if (x) return x;
      const {
        labelField: A,
        valueField: ee
      } = e;
      return (Y, ae) => {
        if (!ae) return !1;
        const me = ae[A];
        if (typeof me == "string")
          return cs(Y, me);
        const pe = ae[ee];
        return typeof pe == "string" ? cs(Y, pe) : typeof pe == "number" ? cs(Y, String(pe)) : !1;
      };
    }), m = On(() => {
      if (e.remote)
        return h.value;
      {
        const {
          value: x
        } = f, {
          value: A
        } = c;
        return !A.length || !e.filterable ? x : hT(x, g.value, A, e.childrenField);
      }
    }), u = On(() => {
      const {
        valueField: x,
        childrenField: A
      } = e, ee = gg(x, A);
      return pl(m.value, ee);
    }), w = On(() => pT(f.value, e.valueField, e.childrenField)), $ = bn(!1), b = Ot(hs(e, "show"), $), S = bn(null), C = bn(null), y = bn(null), {
      localeRef: E
    } = Tr("Select"), R = On(() => {
      var x;
      return (x = e.placeholder) !== null && x !== void 0 ? x : E.value.placeholder;
    }), O = [], W = bn(/* @__PURE__ */ new Map()), _ = On(() => {
      const {
        fallbackOption: x
      } = e;
      if (x === void 0) {
        const {
          labelField: A,
          valueField: ee
        } = e;
        return (Y) => ({
          [A]: String(Y),
          [ee]: Y
        });
      }
      return x === !1 ? !1 : (A) => Object.assign(x(A), {
        value: A
      });
    });
    function V(x) {
      const A = e.remote, {
        value: ee
      } = W, {
        value: Y
      } = w, {
        value: ae
      } = _, me = [];
      return x.forEach((pe) => {
        if (Y.has(pe))
          me.push(Y.get(pe));
        else if (A && ee.has(pe))
          me.push(ee.get(pe));
        else if (ae) {
          const Ce = ae(pe);
          Ce && me.push(Ce);
        }
      }), me;
    }
    const B = On(() => {
      if (e.multiple) {
        const {
          value: x
        } = s;
        return Array.isArray(x) ? V(x) : [];
      }
      return null;
    }), M = On(() => {
      const {
        value: x
      } = s;
      return !e.multiple && !Array.isArray(x) ? x === null ? null : V([x])[0] || null : null;
    }), G = lo(e), {
      mergedSizeRef: U,
      mergedDisabledRef: Q,
      mergedStatusRef: oe
    } = G;
    function ne(x, A) {
      const {
        onChange: ee,
        "onUpdate:value": Y,
        onUpdateValue: ae
      } = e, {
        nTriggerFormChange: me,
        nTriggerFormInput: pe
      } = G;
      ee && ue(ee, x, A), ae && ue(ae, x, A), Y && ue(Y, x, A), l.value = x, me(), pe();
    }
    function X(x) {
      const {
        onBlur: A
      } = e, {
        nTriggerFormBlur: ee
      } = G;
      A && ue(A, x), ee();
    }
    function j() {
      const {
        onClear: x
      } = e;
      x && ue(x);
    }
    function Z(x) {
      const {
        onFocus: A,
        showOnFocus: ee
      } = e, {
        nTriggerFormFocus: Y
      } = G;
      A && ue(A, x), Y(), ee && ye();
    }
    function te(x) {
      const {
        onSearch: A
      } = e;
      A && ue(A, x);
    }
    function fe(x) {
      const {
        onScroll: A
      } = e;
      A && ue(A, x);
    }
    function he() {
      var x;
      const {
        remote: A,
        multiple: ee
      } = e;
      if (A) {
        const {
          value: Y
        } = W;
        if (ee) {
          const {
            valueField: ae
          } = e;
          (x = B.value) === null || x === void 0 || x.forEach((me) => {
            Y.set(me[ae], me);
          });
        } else {
          const ae = M.value;
          ae && Y.set(ae[e.valueField], ae);
        }
      }
    }
    function ve(x) {
      const {
        onUpdateShow: A,
        "onUpdate:show": ee
      } = e;
      A && ue(A, x), ee && ue(ee, x), $.value = x;
    }
    function ye() {
      Q.value || (ve(!0), $.value = !0, e.filterable && Ge());
    }
    function J() {
      ve(!1);
    }
    function ge() {
      c.value = "", v.value = O;
    }
    const Ee = bn(!1);
    function xe() {
      e.filterable && (Ee.value = !0);
    }
    function Te() {
      e.filterable && (Ee.value = !1, b.value || ge());
    }
    function Re() {
      Q.value || (b.value ? e.filterable ? Ge() : J() : ye());
    }
    function Le(x) {
      var A, ee;
      !((ee = (A = y.value) === null || A === void 0 ? void 0 : A.selfRef) === null || ee === void 0) && ee.contains(x.relatedTarget) || (d.value = !1, X(x), J());
    }
    function Fe(x) {
      Z(x), d.value = !0;
    }
    function de() {
      d.value = !0;
    }
    function T(x) {
      var A;
      !((A = S.value) === null || A === void 0) && A.$el.contains(x.relatedTarget) || (d.value = !1, X(x), J());
    }
    function k() {
      var x;
      (x = S.value) === null || x === void 0 || x.focus(), J();
    }
    function z(x) {
      var A;
      b.value && (!((A = S.value) === null || A === void 0) && A.$el.contains(Ci(x)) || J());
    }
    function H(x) {
      if (!Array.isArray(x)) return [];
      if (_.value)
        return Array.from(x);
      {
        const {
          remote: A
        } = e, {
          value: ee
        } = w;
        if (A) {
          const {
            value: Y
          } = W;
          return x.filter((ae) => ee.has(ae) || Y.has(ae));
        } else
          return x.filter((Y) => ee.has(Y));
      }
    }
    function re(x) {
      le(x.rawNode);
    }
    function le(x) {
      if (Q.value) return;
      const {
        tag: A,
        remote: ee,
        clearFilterAfterSelect: Y,
        valueField: ae
      } = e;
      if (A && !ee) {
        const {
          value: me
        } = v, pe = me[0] || null;
        if (pe) {
          const Ce = p.value;
          Ce.length ? Ce.push(pe) : p.value = [pe], v.value = O;
        }
      }
      if (ee && W.value.set(x[ae], x), e.multiple) {
        const me = H(s.value), pe = me.findIndex((Ce) => Ce === x[ae]);
        if (~pe) {
          if (me.splice(pe, 1), A && !ee) {
            const Ce = F(x[ae]);
            ~Ce && (p.value.splice(Ce, 1), Y && (c.value = ""));
          }
        } else
          me.push(x[ae]), Y && (c.value = "");
        ne(me, V(me));
      } else {
        if (A && !ee) {
          const me = F(x[ae]);
          ~me ? p.value = [p.value[me]] : p.value = O;
        }
        qe(), J(), ne(x[ae], x);
      }
    }
    function F(x) {
      return p.value.findIndex((ee) => ee[e.valueField] === x);
    }
    function K(x) {
      b.value || ye();
      const {
        value: A
      } = x.target;
      c.value = A;
      const {
        tag: ee,
        remote: Y
      } = e;
      if (te(A), ee && !Y) {
        if (!A) {
          v.value = O;
          return;
        }
        const {
          onCreate: ae
        } = e, me = ae ? ae(A) : {
          [e.labelField]: A,
          [e.valueField]: A
        }, {
          valueField: pe,
          labelField: Ce
        } = e;
        h.value.some((Ie) => Ie[pe] === me[pe] || Ie[Ce] === me[Ce]) || p.value.some((Ie) => Ie[pe] === me[pe] || Ie[Ce] === me[Ce]) ? v.value = O : v.value = [me];
      }
    }
    function be(x) {
      x.stopPropagation();
      const {
        multiple: A
      } = e;
      !A && e.filterable && J(), j(), A ? ne([], []) : ne(null, null);
    }
    function Pe(x) {
      !pn(x, "action") && !pn(x, "empty") && !pn(x, "header") && x.preventDefault();
    }
    function Ke(x) {
      fe(x);
    }
    function ct(x) {
      var A, ee, Y, ae, me;
      if (!e.keyboard) {
        x.preventDefault();
        return;
      }
      switch (x.key) {
        case " ":
          if (e.filterable)
            break;
          x.preventDefault();
        case "Enter":
          if (!(!((A = S.value) === null || A === void 0) && A.isComposing)) {
            if (b.value) {
              const pe = (ee = y.value) === null || ee === void 0 ? void 0 : ee.getPendingTmNode();
              pe ? re(pe) : e.filterable || (J(), qe());
            } else if (ye(), e.tag && Ee.value) {
              const pe = v.value[0];
              if (pe) {
                const Ce = pe[e.valueField], {
                  value: Ie
                } = s;
                e.multiple && Array.isArray(Ie) && Ie.includes(Ce) || le(pe);
              }
            }
          }
          x.preventDefault();
          break;
        case "ArrowUp":
          if (x.preventDefault(), e.loading) return;
          b.value && ((Y = y.value) === null || Y === void 0 || Y.prev());
          break;
        case "ArrowDown":
          if (x.preventDefault(), e.loading) return;
          b.value ? (ae = y.value) === null || ae === void 0 || ae.next() : ye();
          break;
        case "Escape":
          b.value && (Jx(x), J()), (me = S.value) === null || me === void 0 || me.focus();
          break;
      }
    }
    function qe() {
      var x;
      (x = S.value) === null || x === void 0 || x.focus();
    }
    function Ge() {
      var x;
      (x = S.value) === null || x === void 0 || x.focusInput();
    }
    function vt() {
      var x;
      b.value && ((x = C.value) === null || x === void 0 || x.syncPosition());
    }
    he(), s_(hs(e, "options"), he);
    const Ne = {
      focus: () => {
        var x;
        (x = S.value) === null || x === void 0 || x.focus();
      },
      focusInput: () => {
        var x;
        (x = S.value) === null || x === void 0 || x.focusInput();
      },
      blur: () => {
        var x;
        (x = S.value) === null || x === void 0 || x.blur();
      },
      blurInput: () => {
        var x;
        (x = S.value) === null || x === void 0 || x.blurInput();
      }
    }, we = On(() => {
      const {
        self: {
          menuBoxShadow: x
        }
      } = i.value;
      return {
        "--n-menu-box-shadow": x
      };
    }), D = r ? St("select", void 0, we, e) : void 0;
    return Object.assign(Object.assign({}, Ne), {
      mergedStatus: oe,
      mergedClsPrefix: t,
      mergedBordered: n,
      namespace: o,
      treeMate: u,
      isMounted: Fi(),
      triggerRef: S,
      menuRef: y,
      pattern: c,
      uncontrolledShow: $,
      mergedShow: b,
      adjustedTo: Wn(e),
      uncontrolledValue: l,
      mergedValue: s,
      followerRef: C,
      localizedPlaceholder: R,
      selectedOption: M,
      selectedOptions: B,
      mergedSize: U,
      mergedDisabled: Q,
      focused: d,
      activeWithoutMenuOpen: Ee,
      inlineThemeDisabled: r,
      onTriggerInputFocus: xe,
      onTriggerInputBlur: Te,
      handleTriggerOrMenuResize: vt,
      handleMenuFocus: de,
      handleMenuBlur: T,
      handleMenuTabOut: k,
      handleTriggerClick: Re,
      handleToggle: re,
      handleDeleteOption: le,
      handlePatternInput: K,
      handleClear: be,
      handleTriggerBlur: Le,
      handleTriggerFocus: Fe,
      handleKeydown: ct,
      handleMenuAfterLeave: ge,
      handleMenuClickOutside: z,
      handleMenuScroll: Ke,
      handleMenuKeydown: ct,
      handleMenuMousedown: Pe,
      mergedTheme: i,
      cssVars: r ? void 0 : we,
      themeClass: D == null ? void 0 : D.themeClass,
      onRender: D == null ? void 0 : D.onRender
    });
  },
  render() {
    return Vo("div", {
      class: `${this.mergedClsPrefix}-select`
    }, Vo(Nd, null, {
      default: () => [Vo(Hd, null, {
        default: () => Vo(L3, {
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
      }), Vo(Wd, {
        ref: "followerRef",
        show: this.mergedShow,
        to: this.adjustedTo,
        teleportDisabled: this.adjustedTo === Wn.tdkey,
        containerClass: this.namespace,
        width: this.consistentMenuWidth ? "target" : void 0,
        minWidth: "target",
        placement: this.placement
      }, {
        default: () => Vo(a_, {
          name: "fade-in-scale-up-transition",
          appear: this.isMounted,
          onAfterLeave: this.handleMenuAfterLeave
        }, {
          default: () => {
            var e, t, n;
            return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), d_(Vo(sg, Object.assign({}, this.menuProps, {
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
            }), this.displayDirective === "show" ? [[l_, this.mergedShow], [$i, this.handleMenuClickOutside, void 0, {
              capture: !0
            }]] : [[$i, this.handleMenuClickOutside, void 0, {
              capture: !0
            }]])) : null;
          }
        })
      })]
    }));
  }
}), u_ = {
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
function f_(e) {
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
  return Object.assign(Object.assign({}, u_), {
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
const xg = {
  name: "Pagination",
  common: wt,
  peers: {
    Select: yg,
    Input: cc,
    Popselect: hc
  },
  self: f_
}, th = `
 background: var(--n-item-color-hover);
 color: var(--n-item-text-color-hover);
 border: var(--n-item-border-hover);
`, nh = [N("button", `
 background: var(--n-button-color-hover);
 border: var(--n-button-border-hover);
 color: var(--n-button-icon-color-hover);
 `)], h_ = P("pagination", `
 display: flex;
 vertical-align: middle;
 font-size: var(--n-item-font-size);
 flex-wrap: nowrap;
`, [P("pagination-prefix", `
 display: flex;
 align-items: center;
 margin: var(--n-prefix-margin);
 `), P("pagination-suffix", `
 display: flex;
 align-items: center;
 margin: var(--n-suffix-margin);
 `), I("> *:not(:first-child)", `
 margin: var(--n-item-margin);
 `), P("select", `
 width: var(--n-select-width);
 `), I("&.transition-disabled", [P("pagination-item", "transition: none!important;")]), P("pagination-quick-jumper", `
 white-space: nowrap;
 display: flex;
 color: var(--n-jumper-text-color);
 transition: color .3s var(--n-bezier);
 align-items: center;
 font-size: var(--n-jumper-font-size);
 `, [P("input", `
 margin: var(--n-input-margin);
 width: var(--n-input-width);
 `)]), P("pagination-item", `
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
 `, [N("button", `
 background: var(--n-button-color);
 color: var(--n-button-icon-color);
 border: var(--n-button-border);
 padding: 0;
 `, [P("base-icon", `
 font-size: var(--n-button-icon-size);
 `)]), rt("disabled", [N("hover", th, nh), I("&:hover", th, nh), I("&:active", `
 background: var(--n-item-color-pressed);
 color: var(--n-item-text-color-pressed);
 border: var(--n-item-border-pressed);
 `, [N("button", `
 background: var(--n-button-color-pressed);
 border: var(--n-button-border-pressed);
 color: var(--n-button-icon-color-pressed);
 `)]), N("active", `
 background: var(--n-item-color-active);
 color: var(--n-item-text-color-active);
 border: var(--n-item-border-active);
 `, [I("&:hover", `
 background: var(--n-item-color-active-hover);
 `)])]), N("disabled", `
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `, [N("active, button", `
 background-color: var(--n-item-color-disabled);
 border: var(--n-item-border-disabled);
 `)])]), N("disabled", `
 cursor: not-allowed;
 `, [P("pagination-quick-jumper", `
 color: var(--n-jumper-text-color-disabled);
 `)]), N("simple", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `, [P("pagination-quick-jumper", [P("input", `
 margin: 0;
 `)])])]);
function Cg(e) {
  var t;
  if (!e) return 10;
  const {
    defaultPageSize: n
  } = e;
  if (n !== void 0) return n;
  const o = (t = e.pageSizes) === null || t === void 0 ? void 0 : t[0];
  return typeof o == "number" ? o : (o == null ? void 0 : o.value) || 10;
}
function p_(e, t, n, o) {
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
  const g = [];
  g.push({
    type: "page",
    label: 1,
    active: e === 1,
    mayBeFastBackward: !1,
    mayBeFastForward: !1
  }), v ? (r = !0, l = c - 1, g.push({
    type: "fast-backward",
    active: !1,
    label: void 0,
    options: o ? oh(s + 1, c - 1) : null
  })) : d >= s + 1 && g.push({
    type: "page",
    label: s + 1,
    mayBeFastBackward: !0,
    mayBeFastForward: !1,
    active: e === s + 1
  });
  for (let m = c; m <= h; ++m)
    g.push({
      type: "page",
      label: m,
      mayBeFastBackward: !1,
      mayBeFastForward: !1,
      active: e === m
    });
  return f ? (i = !0, a = h + 1, g.push({
    type: "fast-forward",
    active: !1,
    label: void 0,
    options: o ? oh(h + 1, d - 1) : null
  })) : h === d - 2 && g[g.length - 1].label !== d - 1 && g.push({
    type: "page",
    mayBeFastForward: !0,
    mayBeFastBackward: !1,
    label: d - 1,
    active: e === d - 1
  }), g[g.length - 1].label !== d && g.push({
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
    items: g
  };
}
function oh(e, t) {
  const n = [];
  for (let o = e; o <= t; ++o)
    n.push({
      label: `${o}`,
      value: o
    });
  return n;
}
const wn = window.Vue.computed, v_ = window.Vue.defineComponent, rh = window.Vue.Fragment, nt = window.Vue.h, g_ = window.Vue.nextTick, bo = window.Vue.ref, ih = window.Vue.toRef, ps = window.Vue.watchEffect, m_ = Object.assign(Object.assign({}, _e.props), {
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
  to: Wn.propTo,
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
}), b_ = v_({
  name: "Pagination",
  props: m_,
  slots: Object,
  setup(e) {
    const {
      mergedComponentPropsRef: t,
      mergedClsPrefixRef: n,
      inlineThemeDisabled: o,
      mergedRtlRef: r
    } = je(e), i = _e("Pagination", "-pagination", h_, xg, e, n), {
      localeRef: l
    } = Tr("Pagination"), a = bo(null), s = bo(e.defaultPage), d = bo(Cg(e)), c = Ot(ih(e, "page"), s), h = Ot(ih(e, "pageSize"), d), p = wn(() => {
      const {
        itemCount: J
      } = e;
      if (J !== void 0)
        return Math.max(1, Math.ceil(J / h.value));
      const {
        pageCount: ge
      } = e;
      return ge !== void 0 ? Math.max(ge, 1) : 1;
    }), v = bo("");
    ps(() => {
      e.simple, v.value = String(c.value);
    });
    const f = bo(!1), g = bo(!1), m = bo(!1), u = bo(!1), w = () => {
      e.disabled || (f.value = !0, M());
    }, $ = () => {
      e.disabled || (f.value = !1, M());
    }, b = () => {
      g.value = !0, M();
    }, S = () => {
      g.value = !1, M();
    }, C = (J) => {
      G(J);
    }, y = wn(() => p_(c.value, p.value, e.pageSlot, e.showQuickJumpDropdown));
    ps(() => {
      y.value.hasFastBackward ? y.value.hasFastForward || (f.value = !1, m.value = !1) : (g.value = !1, u.value = !1);
    });
    const E = wn(() => {
      const J = l.value.selectionSuffix;
      return e.pageSizes.map((ge) => typeof ge == "number" ? {
        label: `${ge} / ${J}`,
        value: ge
      } : ge);
    }), R = wn(() => {
      var J, ge;
      return ((ge = (J = t == null ? void 0 : t.value) === null || J === void 0 ? void 0 : J.Pagination) === null || ge === void 0 ? void 0 : ge.inputSize) || Iu(e.size);
    }), O = wn(() => {
      var J, ge;
      return ((ge = (J = t == null ? void 0 : t.value) === null || J === void 0 ? void 0 : J.Pagination) === null || ge === void 0 ? void 0 : ge.selectSize) || Iu(e.size);
    }), W = wn(() => (c.value - 1) * h.value), _ = wn(() => {
      const J = c.value * h.value - 1, {
        itemCount: ge
      } = e;
      return ge !== void 0 && J > ge - 1 ? ge - 1 : J;
    }), V = wn(() => {
      const {
        itemCount: J
      } = e;
      return J !== void 0 ? J : (e.pageCount || 1) * h.value;
    }), B = Lt("Pagination", r, n);
    function M() {
      g_(() => {
        var J;
        const {
          value: ge
        } = a;
        ge && (ge.classList.add("transition-disabled"), (J = a.value) === null || J === void 0 || J.offsetWidth, ge.classList.remove("transition-disabled"));
      });
    }
    function G(J) {
      if (J === c.value) return;
      const {
        "onUpdate:page": ge,
        onUpdatePage: Ee,
        onChange: xe,
        simple: Te
      } = e;
      ge && ue(ge, J), Ee && ue(Ee, J), xe && ue(xe, J), s.value = J, Te && (v.value = String(J));
    }
    function U(J) {
      if (J === h.value) return;
      const {
        "onUpdate:pageSize": ge,
        onUpdatePageSize: Ee,
        onPageSizeChange: xe
      } = e;
      ge && ue(ge, J), Ee && ue(Ee, J), xe && ue(xe, J), d.value = J, p.value < c.value && G(p.value);
    }
    function Q() {
      if (e.disabled) return;
      const J = Math.min(c.value + 1, p.value);
      G(J);
    }
    function oe() {
      if (e.disabled) return;
      const J = Math.max(c.value - 1, 1);
      G(J);
    }
    function ne() {
      if (e.disabled) return;
      const J = Math.min(y.value.fastForwardTo, p.value);
      G(J);
    }
    function X() {
      if (e.disabled) return;
      const J = Math.max(y.value.fastBackwardTo, 1);
      G(J);
    }
    function j(J) {
      U(J);
    }
    function Z() {
      const J = Number.parseInt(v.value);
      Number.isNaN(J) || (G(Math.max(1, Math.min(J, p.value))), e.simple || (v.value = ""));
    }
    function te() {
      Z();
    }
    function fe(J) {
      if (!e.disabled)
        switch (J.type) {
          case "page":
            G(J.label);
            break;
          case "fast-backward":
            X();
            break;
          case "fast-forward":
            ne();
            break;
        }
    }
    function he(J) {
      v.value = J.replace(/\D+/g, "");
    }
    ps(() => {
      c.value, h.value, M();
    });
    const ve = wn(() => {
      const {
        size: J
      } = e, {
        self: {
          buttonBorder: ge,
          buttonBorderHover: Ee,
          buttonBorderPressed: xe,
          buttonIconColor: Te,
          buttonIconColorHover: Re,
          buttonIconColorPressed: Le,
          itemTextColor: Fe,
          itemTextColorHover: de,
          itemTextColorPressed: T,
          itemTextColorActive: k,
          itemTextColorDisabled: z,
          itemColor: H,
          itemColorHover: re,
          itemColorPressed: le,
          itemColorActive: F,
          itemColorActiveHover: K,
          itemColorDisabled: be,
          itemBorder: Pe,
          itemBorderHover: Ke,
          itemBorderPressed: ct,
          itemBorderActive: qe,
          itemBorderDisabled: Ge,
          itemBorderRadius: vt,
          jumperTextColor: Ne,
          jumperTextColorDisabled: we,
          buttonColor: D,
          buttonColorHover: x,
          buttonColorPressed: A,
          [ie("itemPadding", J)]: ee,
          [ie("itemMargin", J)]: Y,
          [ie("inputWidth", J)]: ae,
          [ie("selectWidth", J)]: me,
          [ie("inputMargin", J)]: pe,
          [ie("selectMargin", J)]: Ce,
          [ie("jumperFontSize", J)]: Ie,
          [ie("prefixMargin", J)]: Xe,
          [ie("suffixMargin", J)]: Me,
          [ie("itemSize", J)]: ut,
          [ie("buttonIconSize", J)]: lt,
          [ie("itemFontSize", J)]: $t,
          [`${ie("itemMargin", J)}Rtl`]: tt,
          [`${ie("inputMargin", J)}Rtl`]: kt
        },
        common: {
          cubicBezierEaseInOut: Xt
        }
      } = i.value;
      return {
        "--n-prefix-margin": Xe,
        "--n-suffix-margin": Me,
        "--n-item-font-size": $t,
        "--n-select-width": me,
        "--n-select-margin": Ce,
        "--n-input-width": ae,
        "--n-input-margin": pe,
        "--n-input-margin-rtl": kt,
        "--n-item-size": ut,
        "--n-item-text-color": Fe,
        "--n-item-text-color-disabled": z,
        "--n-item-text-color-hover": de,
        "--n-item-text-color-active": k,
        "--n-item-text-color-pressed": T,
        "--n-item-color": H,
        "--n-item-color-hover": re,
        "--n-item-color-disabled": be,
        "--n-item-color-active": F,
        "--n-item-color-active-hover": K,
        "--n-item-color-pressed": le,
        "--n-item-border": Pe,
        "--n-item-border-hover": Ke,
        "--n-item-border-disabled": Ge,
        "--n-item-border-active": qe,
        "--n-item-border-pressed": ct,
        "--n-item-padding": ee,
        "--n-item-border-radius": vt,
        "--n-bezier": Xt,
        "--n-jumper-font-size": Ie,
        "--n-jumper-text-color": Ne,
        "--n-jumper-text-color-disabled": we,
        "--n-item-margin": Y,
        "--n-item-margin-rtl": tt,
        "--n-button-icon-size": lt,
        "--n-button-icon-color": Te,
        "--n-button-icon-color-hover": Re,
        "--n-button-icon-color-pressed": Le,
        "--n-button-color-hover": x,
        "--n-button-color": D,
        "--n-button-color-pressed": A,
        "--n-button-border": ge,
        "--n-button-border-hover": Ee,
        "--n-button-border-pressed": xe
      };
    }), ye = o ? St("pagination", wn(() => {
      let J = "";
      const {
        size: ge
      } = e;
      return J += ge[0], J;
    }), ve, e) : void 0;
    return {
      rtlEnabled: B,
      mergedClsPrefix: n,
      locale: l,
      selfRef: a,
      mergedPage: c,
      pageItems: wn(() => y.value.items),
      mergedItemCount: V,
      jumperValue: v,
      pageSizeOptions: E,
      mergedPageSize: h,
      inputSize: R,
      selectSize: O,
      mergedTheme: i,
      mergedPageCount: p,
      startIndex: W,
      endIndex: _,
      showFastForwardMenu: m,
      showFastBackwardMenu: u,
      fastForwardActive: f,
      fastBackwardActive: g,
      handleMenuSelect: C,
      handleFastForwardMouseenter: w,
      handleFastForwardMouseleave: $,
      handleFastBackwardMouseenter: b,
      handleFastBackwardMouseleave: S,
      handleJumperInput: he,
      handleBackwardClick: oe,
      handleForwardClick: Q,
      handlePageItemClick: fe,
      handleSizePickerChange: j,
      handleQuickJumperChange: te,
      cssVars: o ? void 0 : ve,
      themeClass: ye == null ? void 0 : ye.themeClass,
      onRender: ye == null ? void 0 : ye.onRender
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
      jumperValue: g,
      simple: m,
      prev: u,
      next: w,
      prefix: $,
      suffix: b,
      label: S,
      goto: C,
      handleJumperInput: y,
      handleSizePickerChange: E,
      handleBackwardClick: R,
      handlePageItemClick: O,
      handleForwardClick: W,
      handleQuickJumperChange: _,
      onRender: V
    } = this;
    V == null || V();
    const B = $ || e.prefix, M = b || e.suffix, G = u || e.prev, U = w || e.next, Q = S || e.label;
    return nt("div", {
      ref: "selfRef",
      class: [`${t}-pagination`, this.themeClass, this.rtlEnabled && `${t}-pagination--rtl`, n && `${t}-pagination--disabled`, m && `${t}-pagination--simple`],
      style: o
    }, B ? nt("div", {
      class: `${t}-pagination-prefix`
    }, B({
      page: r,
      pageSize: v,
      pageCount: i,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      itemCount: this.mergedItemCount
    })) : null, this.displayOrder.map((oe) => {
      switch (oe) {
        case "pages":
          return nt(rh, null, nt("div", {
            class: [`${t}-pagination-item`, !G && `${t}-pagination-item--button`, (r <= 1 || r > i || n) && `${t}-pagination-item--disabled`],
            onClick: R
          }, G ? G({
            page: r,
            pageSize: v,
            pageCount: i,
            startIndex: this.startIndex,
            endIndex: this.endIndex,
            itemCount: this.mergedItemCount
          }) : nt(_t, {
            clsPrefix: t
          }, {
            default: () => this.rtlEnabled ? nt(xf, null) : nt(vf, null)
          })), m ? nt(rh, null, nt("div", {
            class: `${t}-pagination-quick-jumper`
          }, nt(Rt, {
            value: g,
            onUpdateValue: y,
            size: h,
            placeholder: "",
            disabled: n,
            theme: d.peers.Input,
            themeOverrides: d.peerOverrides.Input,
            onChange: _
          })), " /", " ", i) : l.map((ne, X) => {
            let j, Z, te;
            const {
              type: fe
            } = ne;
            switch (fe) {
              case "page":
                const ve = ne.label;
                Q ? j = Q({
                  type: "page",
                  node: ve,
                  active: ne.active
                }) : j = ve;
                break;
              case "fast-forward":
                const ye = this.fastForwardActive ? nt(_t, {
                  clsPrefix: t
                }, {
                  default: () => this.rtlEnabled ? nt(bf, null) : nt(wf, null)
                }) : nt(_t, {
                  clsPrefix: t
                }, {
                  default: () => nt(Cf, null)
                });
                Q ? j = Q({
                  type: "fast-forward",
                  node: ye,
                  active: this.fastForwardActive || this.showFastForwardMenu
                }) : j = ye, Z = this.handleFastForwardMouseenter, te = this.handleFastForwardMouseleave;
                break;
              case "fast-backward":
                const J = this.fastBackwardActive ? nt(_t, {
                  clsPrefix: t
                }, {
                  default: () => this.rtlEnabled ? nt(wf, null) : nt(bf, null)
                }) : nt(_t, {
                  clsPrefix: t
                }, {
                  default: () => nt(Cf, null)
                });
                Q ? j = Q({
                  type: "fast-backward",
                  node: J,
                  active: this.fastBackwardActive || this.showFastBackwardMenu
                }) : j = J, Z = this.handleFastBackwardMouseenter, te = this.handleFastBackwardMouseleave;
                break;
            }
            const he = nt("div", {
              key: X,
              class: [`${t}-pagination-item`, ne.active && `${t}-pagination-item--active`, fe !== "page" && (fe === "fast-backward" && this.showFastBackwardMenu || fe === "fast-forward" && this.showFastForwardMenu) && `${t}-pagination-item--hover`, n && `${t}-pagination-item--disabled`, fe === "page" && `${t}-pagination-item--clickable`],
              onClick: () => {
                O(ne);
              },
              onMouseenter: Z,
              onMouseleave: te
            }, j);
            if (fe === "page" && !ne.mayBeFastBackward && !ne.mayBeFastForward)
              return he;
            {
              const ve = ne.type === "page" ? ne.mayBeFastBackward ? "fast-backward" : "fast-forward" : ne.type;
              return ne.type !== "page" && !ne.options ? he : nt(n_, {
                to: this.to,
                key: ve,
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
                show: fe === "page" ? !1 : fe === "fast-backward" ? this.showFastBackwardMenu : this.showFastForwardMenu,
                onUpdateShow: (ye) => {
                  fe !== "page" && (ye ? fe === "fast-backward" ? this.showFastBackwardMenu = ye : this.showFastForwardMenu = ye : (this.showFastBackwardMenu = !1, this.showFastForwardMenu = !1));
                },
                options: ne.type !== "page" && ne.options ? ne.options : [],
                onUpdateValue: this.handleMenuSelect,
                scrollable: !0,
                showCheckmark: !1
              }, {
                default: () => he
              });
            }
          }), nt("div", {
            class: [`${t}-pagination-item`, !U && `${t}-pagination-item--button`, {
              [`${t}-pagination-item--disabled`]: r < 1 || r >= i || n
            }],
            onClick: W
          }, U ? U({
            page: r,
            pageSize: v,
            pageCount: i,
            itemCount: this.mergedItemCount,
            startIndex: this.startIndex,
            endIndex: this.endIndex
          }) : nt(_t, {
            clsPrefix: t
          }, {
            default: () => this.rtlEnabled ? nt(vf, null) : nt(xf, null)
          })));
        case "size-picker":
          return !m && a ? nt(br, Object.assign({
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
            onUpdateValue: E
          })) : null;
        case "quick-jumper":
          return !m && s ? nt("div", {
            class: `${t}-pagination-quick-jumper`
          }, C ? C() : Rn(this.$slots.goto, () => [c.goto]), nt(Rt, {
            value: g,
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
    }), M ? nt("div", {
      class: `${t}-pagination-suffix`
    }, M({
      page: r,
      pageSize: v,
      pageCount: i,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      itemCount: this.mergedItemCount
    })) : null);
  }
}), w_ = {
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
function y_(e) {
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
    heightHuge: g,
    textColor3: m,
    opacityDisabled: u
  } = e;
  return Object.assign(Object.assign({}, w_), {
    optionHeightSmall: p,
    optionHeightMedium: v,
    optionHeightLarge: f,
    optionHeightHuge: g,
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
    optionColorActive: Ve(t, {
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
const Sg = {
  name: "Dropdown",
  common: wt,
  peers: {
    Popover: Or
  },
  self: y_
}, x_ = {
  padding: "8px 14px"
};
function C_(e) {
  const {
    borderRadius: t,
    boxShadow2: n,
    baseColor: o
  } = e;
  return Object.assign(Object.assign({}, x_), {
    borderRadius: t,
    boxShadow: n,
    color: Je(o, "rgba(0, 0, 0, .85)"),
    textColor: o
  });
}
const $g = {
  name: "Tooltip",
  common: wt,
  peers: {
    Popover: Or
  },
  self: C_
}, Rg = {
  name: "Ellipsis",
  common: wt,
  peers: {
    Tooltip: $g
  }
}, S_ = {
  radioSizeSmall: "14px",
  radioSizeMedium: "16px",
  radioSizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function $_(e) {
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
    lineHeight: g
  } = e;
  return Object.assign(Object.assign({}, S_), {
    labelLineHeight: g,
    buttonHeightSmall: p,
    buttonHeightMedium: v,
    buttonHeightLarge: f,
    fontSizeSmall: d,
    fontSizeMedium: c,
    fontSizeLarge: h,
    boxShadow: `inset 0 0 0 1px ${t}`,
    boxShadowActive: `inset 0 0 0 1px ${n}`,
    boxShadowFocus: `inset 0 0 0 1px ${n}, 0 0 0 2px ${Ve(n, {
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
    buttonBoxShadowFocus: `inset 0 0 0 1px ${n}, 0 0 0 2px ${Ve(n, {
      alpha: 0.3
    })}`,
    buttonBoxShadowHover: "inset 0 0 0 1px #0000",
    buttonBoxShadow: "inset 0 0 0 1px #0000",
    buttonBorderRadius: s
  });
}
const vc = {
  name: "Radio",
  common: wt,
  self: $_
}, R_ = {
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
function k_(e) {
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
    fontSizeLarge: g,
    dividerColor: m,
    heightSmall: u,
    opacityDisabled: w,
    tableColorStriped: $
  } = e;
  return Object.assign(Object.assign({}, R_), {
    actionDividerColor: m,
    lineHeight: p,
    borderRadius: h,
    fontSizeSmall: v,
    fontSizeMedium: f,
    fontSizeLarge: g,
    borderColor: Je(t, m),
    tdColorHover: Je(t, a),
    tdColorSorting: Je(t, a),
    tdColorStriped: Je(t, $),
    thColor: Je(t, l),
    thColorHover: Je(Je(t, l), a),
    thColorSorting: Je(Je(t, l), a),
    tdColor: t,
    tdTextColor: r,
    thTextColor: i,
    thFontWeight: c,
    thButtonColorHover: a,
    thIconColor: s,
    thIconColorActive: d,
    // modal
    borderColorModal: Je(n, m),
    tdColorHoverModal: Je(n, a),
    tdColorSortingModal: Je(n, a),
    tdColorStripedModal: Je(n, $),
    thColorModal: Je(n, l),
    thColorHoverModal: Je(Je(n, l), a),
    thColorSortingModal: Je(Je(n, l), a),
    tdColorModal: n,
    // popover
    borderColorPopover: Je(o, m),
    tdColorHoverPopover: Je(o, a),
    tdColorSortingPopover: Je(o, a),
    tdColorStripedPopover: Je(o, $),
    thColorPopover: Je(o, l),
    thColorHoverPopover: Je(Je(o, l), a),
    thColorSortingPopover: Je(Je(o, l), a),
    tdColorPopover: o,
    boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
    boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
    // loading
    loadingColor: d,
    loadingSize: u,
    opacityLoading: w
  });
}
const P_ = {
  name: "DataTable",
  common: wt,
  peers: {
    Button: uc,
    Checkbox: mg,
    Radio: vc,
    Pagination: xg,
    Scrollbar: Fr,
    Empty: sc,
    Popover: Or,
    Ellipsis: Rg,
    Dropdown: Sg
  },
  self: k_
}, T_ = Object.assign(Object.assign({}, _e.props), {
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
}), Tn = "n-data-table", kg = 40, Pg = 40;
function ah(e) {
  if (e.type === "selection")
    return e.width === void 0 ? kg : zt(e.width);
  if (e.type === "expand")
    return e.width === void 0 ? Pg : zt(e.width);
  if (!("children" in e))
    return typeof e.width == "string" ? zt(e.width) : e.width;
}
function __(e) {
  var t, n;
  if (e.type === "selection")
    return Et((t = e.width) !== null && t !== void 0 ? t : kg);
  if (e.type === "expand")
    return Et((n = e.width) !== null && n !== void 0 ? n : Pg);
  if (!("children" in e))
    return Et(e.width);
}
function xn(e) {
  return e.type === "selection" ? "__n_selection__" : e.type === "expand" ? "__n_expand__" : e.key;
}
function lh(e) {
  return e && (typeof e == "object" ? Object.assign({}, e) : e);
}
function E_(e) {
  return e === "ascend" ? 1 : e === "descend" ? -1 : 0;
}
function z_(e, t, n) {
  return n !== void 0 && (e = Math.min(e, typeof n == "number" ? n : Number.parseFloat(n))), t !== void 0 && (e = Math.max(e, typeof t == "number" ? t : Number.parseFloat(t))), e;
}
function F_(e, t) {
  if (t !== void 0)
    return {
      width: t,
      minWidth: t,
      maxWidth: t
    };
  const n = __(e), {
    minWidth: o,
    maxWidth: r
  } = e;
  return {
    width: n,
    minWidth: Et(o) || n,
    maxWidth: Et(r)
  };
}
function O_(e, t, n) {
  return typeof n == "function" ? n(e, t) : n || "";
}
function vs(e) {
  return e.filterOptionValues !== void 0 || e.filterOptionValue === void 0 && e.defaultFilterOptionValues !== void 0;
}
function gs(e) {
  return "children" in e ? !1 : !!e.sorter;
}
function Tg(e) {
  return "children" in e && e.children.length ? !1 : !!e.resizable;
}
function sh(e) {
  return "children" in e ? !1 : !!e.filter && (!!e.filterOptions || !!e.renderFilterMenu);
}
function dh(e) {
  if (e) {
    if (e === "descend") return "ascend";
  } else return "descend";
  return !1;
}
function M_(e, t) {
  if (e.sorter === void 0) return null;
  const {
    customNextSortOrder: n
  } = e;
  return t === null || t.columnKey !== e.key ? {
    columnKey: e.key,
    sorter: e.sorter,
    order: dh(!1)
  } : Object.assign(Object.assign({}, t), {
    order: (n || dh)(t.order)
  });
}
function _g(e, t) {
  return t.find((n) => n.columnKey === e.key && n.order) !== void 0;
}
function I_(e) {
  return typeof e == "string" ? e.replace(/,/g, "\\,") : e == null ? "" : `${e}`.replace(/,/g, "\\,");
}
function V_(e, t, n, o) {
  const r = e.filter((a) => a.type !== "expand" && a.type !== "selection" && a.allowExport !== !1), i = r.map((a) => o ? o(a) : a.title).join(","), l = t.map((a) => r.map((s) => n ? n(a[s.key], a, s) : I_(a[s.key])).join(","));
  return [i, ...l].join(`
`);
}
const A_ = window.Vue.defineComponent, B_ = window.Vue.h, L_ = window.Vue.inject, D_ = A_({
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
    } = L_(Tn);
    return () => {
      const {
        rowKey: o
      } = e;
      return B_(fc, {
        privateInsideTable: !0,
        disabled: e.disabled,
        indeterminate: n.value.has(o),
        checked: t.value.has(o),
        onUpdateChecked: e.onUpdateChecked
      });
    };
  }
}), N_ = P("radio", `
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
`, [N("checked", [L("dot", `
 background-color: var(--n-color-active);
 `)]), L("dot-wrapper", `
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `), P("radio-input", `
 position: absolute;
 border: 0;
 width: 0;
 height: 0;
 opacity: 0;
 margin: 0;
 `), L("dot", `
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
 `, [I("&::before", `
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
 `), N("checked", {
  boxShadow: "var(--n-box-shadow-active)"
}, [I("&::before", `
 opacity: 1;
 transform: scale(1);
 `)])]), L("label", `
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `), rt("disabled", `
 cursor: pointer;
 `, [I("&:hover", [L("dot", {
  boxShadow: "var(--n-box-shadow-hover)"
})]), N("focus", [I("&:not(:active)", [L("dot", {
  boxShadow: "var(--n-box-shadow-focus)"
})])])]), N("disabled", `
 cursor: not-allowed;
 `, [L("dot", {
  boxShadow: "var(--n-box-shadow-disabled)",
  backgroundColor: "var(--n-color-disabled)"
}, [I("&::before", {
  backgroundColor: "var(--n-dot-color-disabled)"
}), N("checked", `
 opacity: 1;
 `)]), L("label", {
  color: "var(--n-text-color-disabled)"
}), P("radio-input", `
 cursor: not-allowed;
 `)])]), H_ = window.Vue.inject, ga = window.Vue.ref, j_ = window.Vue.toRef;
window.Vue.watchEffect;
const W_ = {
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
}, Eg = "n-radio-group";
function U_(e) {
  const t = H_(Eg, null), n = lo(e, {
    mergedSize(w) {
      const {
        size: $
      } = e;
      if ($ !== void 0) return $;
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
  } = n, i = ga(null), l = ga(null), a = ga(e.defaultChecked), s = j_(e, "checked"), d = Ot(s, a), c = Be(() => t ? t.valueRef.value === e.value : d.value), h = Be(() => {
    const {
      name: w
    } = e;
    if (w !== void 0) return w;
    if (t) return t.nameRef.value;
  }), p = ga(!1);
  function v() {
    if (t) {
      const {
        doUpdateValue: w
      } = t, {
        value: $
      } = e;
      ue(w, $);
    } else {
      const {
        onUpdateChecked: w,
        "onUpdate:checked": $
      } = e, {
        nTriggerFormInput: b,
        nTriggerFormChange: S
      } = n;
      w && ue(w, !0), $ && ue($, !0), b(), S(), a.value = !0;
    }
  }
  function f() {
    r.value || c.value || v();
  }
  function g() {
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
    handleRadioInputChange: g,
    handleRadioInputBlur: m,
    handleRadioInputFocus: u
  };
}
const ch = window.Vue.computed, K_ = window.Vue.defineComponent, Zr = window.Vue.h, q_ = Object.assign(Object.assign({}, _e.props), W_), zg = K_({
  name: "Radio",
  props: q_,
  setup(e) {
    const t = U_(e), n = _e("Radio", "-radio", N_, vc, e, t.mergedClsPrefix), o = ch(() => {
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
          boxShadowHover: g,
          color: m,
          colorDisabled: u,
          colorActive: w,
          textColor: $,
          textColorDisabled: b,
          dotColorActive: S,
          dotColorDisabled: C,
          labelPadding: y,
          labelLineHeight: E,
          labelFontWeight: R,
          [ie("fontSize", d)]: O,
          [ie("radioSize", d)]: W
        }
      } = n.value;
      return {
        "--n-bezier": c,
        "--n-label-line-height": E,
        "--n-label-font-weight": R,
        "--n-box-shadow": h,
        "--n-box-shadow-active": p,
        "--n-box-shadow-disabled": v,
        "--n-box-shadow-focus": f,
        "--n-box-shadow-hover": g,
        "--n-color": m,
        "--n-color-active": w,
        "--n-color-disabled": u,
        "--n-dot-color-active": S,
        "--n-dot-color-disabled": C,
        "--n-font-size": O,
        "--n-radio-size": W,
        "--n-text-color": $,
        "--n-text-color-disabled": b,
        "--n-label-padding": y
      };
    }), {
      inlineThemeDisabled: r,
      mergedClsPrefixRef: i,
      mergedRtlRef: l
    } = je(e), a = Lt("Radio", l, i), s = r ? St("radio", ch(() => t.mergedSize.value[0]), o, e) : void 0;
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
    return n == null || n(), Zr("label", {
      class: [`${t}-radio`, this.themeClass, this.rtlEnabled && `${t}-radio--rtl`, this.mergedDisabled && `${t}-radio--disabled`, this.renderSafeChecked && `${t}-radio--checked`, this.focus && `${t}-radio--focus`],
      style: this.cssVars
    }, Zr("div", {
      class: `${t}-radio__dot-wrapper`
    }, " ", Zr("div", {
      class: [`${t}-radio__dot`, this.renderSafeChecked && `${t}-radio__dot--checked`]
    }), Zr("input", {
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
    })), Ye(e.default, (r) => !r && !o ? null : Zr("div", {
      ref: "labelRef",
      class: `${t}-radio__label`
    }, r || o)));
  }
}), G_ = P("radio-group", `
 display: inline-block;
 font-size: var(--n-font-size);
`, [L("splitor", `
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `, [N("checked", {
  backgroundColor: "var(--n-button-border-color-active)"
}), N("disabled", {
  opacity: "var(--n-opacity-disabled)"
})]), N("button-group", `
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [P("radio-button", {
  height: "var(--n-height)",
  lineHeight: "var(--n-height)"
}), L("splitor", {
  height: "var(--n-height)"
})]), P("radio-button", `
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
 `, [P("radio-input", `
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
 `), L("state-border", `
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `), I("&:first-child", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `, [L("state-border", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]), I("&:last-child", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `, [L("state-border", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]), rt("disabled", `
 cursor: pointer;
 `, [I("&:hover", [L("state-border", `
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `), rt("checked", {
  color: "var(--n-button-text-color-hover)"
})]), N("focus", [I("&:not(:active)", [L("state-border", {
  boxShadow: "var(--n-button-box-shadow-focus)"
})])])]), N("checked", `
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `), N("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]), uh = window.Vue.computed, X_ = window.Vue.defineComponent, Fg = window.Vue.h, Y_ = window.Vue.provide, fh = window.Vue.ref, hh = window.Vue.toRef;
function Z_(e, t, n) {
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
      const c = r[r.length - 1].props, h = t === c.value, p = c.disabled, v = t === d.value, f = d.disabled, g = (h ? 2 : 0) + (p ? 0 : 1), m = (v ? 2 : 0) + (f ? 0 : 1), u = {
        [`${n}-radio-group__splitor--disabled`]: p,
        [`${n}-radio-group__splitor--checked`]: h
      }, w = {
        [`${n}-radio-group__splitor--disabled`]: f,
        [`${n}-radio-group__splitor--checked`]: v
      }, $ = g < m ? w : u;
      r.push(Fg("div", {
        class: [`${n}-radio-group__splitor`, $]
      }), a);
    }
  }
  return {
    children: r,
    isButtonGroup: i
  };
}
const J_ = Object.assign(Object.assign({}, _e.props), {
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
}), Q_ = X_({
  name: "RadioGroup",
  props: J_,
  setup(e) {
    const t = fh(null), {
      mergedSizeRef: n,
      mergedDisabledRef: o,
      nTriggerFormChange: r,
      nTriggerFormInput: i,
      nTriggerFormBlur: l,
      nTriggerFormFocus: a
    } = lo(e), {
      mergedClsPrefixRef: s,
      inlineThemeDisabled: d,
      mergedRtlRef: c
    } = je(e), h = _e("Radio", "-radio-group", G_, vc, e, s), p = fh(e.defaultValue), v = hh(e, "value"), f = Ot(v, p);
    function g(S) {
      const {
        onUpdateValue: C,
        "onUpdate:value": y
      } = e;
      C && ue(C, S), y && ue(y, S), p.value = S, r(), i();
    }
    function m(S) {
      const {
        value: C
      } = t;
      C && (C.contains(S.relatedTarget) || a());
    }
    function u(S) {
      const {
        value: C
      } = t;
      C && (C.contains(S.relatedTarget) || l());
    }
    Y_(Eg, {
      mergedClsPrefixRef: s,
      nameRef: hh(e, "name"),
      valueRef: f,
      disabledRef: o,
      mergedSizeRef: n,
      doUpdateValue: g
    });
    const w = Lt("Radio", c, s), $ = uh(() => {
      const {
        value: S
      } = n, {
        common: {
          cubicBezierEaseInOut: C
        },
        self: {
          buttonBorderColor: y,
          buttonBorderColorActive: E,
          buttonBorderRadius: R,
          buttonBoxShadow: O,
          buttonBoxShadowFocus: W,
          buttonBoxShadowHover: _,
          buttonColor: V,
          buttonColorActive: B,
          buttonTextColor: M,
          buttonTextColorActive: G,
          buttonTextColorHover: U,
          opacityDisabled: Q,
          [ie("buttonHeight", S)]: oe,
          [ie("fontSize", S)]: ne
        }
      } = h.value;
      return {
        "--n-font-size": ne,
        "--n-bezier": C,
        "--n-button-border-color": y,
        "--n-button-border-color-active": E,
        "--n-button-border-radius": R,
        "--n-button-box-shadow": O,
        "--n-button-box-shadow-focus": W,
        "--n-button-box-shadow-hover": _,
        "--n-button-color": V,
        "--n-button-color-active": B,
        "--n-button-text-color": M,
        "--n-button-text-color-hover": U,
        "--n-button-text-color-active": G,
        "--n-height": oe,
        "--n-opacity-disabled": Q
      };
    }), b = d ? St("radio-group", uh(() => n.value[0]), $, e) : void 0;
    return {
      selfElRef: t,
      rtlEnabled: w,
      mergedClsPrefix: s,
      mergedValue: f,
      handleFocusout: u,
      handleFocusin: m,
      cssVars: d ? void 0 : $,
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
    } = Z_(io(Gd(this)), t, n);
    return (e = this.onRender) === null || e === void 0 || e.call(this), Fg("div", {
      onFocusin: o,
      onFocusout: r,
      ref: "selfElRef",
      class: [`${n}-radio-group`, this.rtlEnabled && `${n}-radio-group--rtl`, this.themeClass, l && `${n}-radio-group--button-group`],
      style: this.cssVars
    }, i);
  }
}), e5 = window.Vue.defineComponent, t5 = window.Vue.h, n5 = window.Vue.inject, o5 = e5({
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
    } = n5(Tn);
    return () => {
      const {
        rowKey: o
      } = e;
      return t5(zg, {
        name: n,
        disabled: e.disabled,
        checked: t.value.has(o),
        onUpdateChecked: e.onUpdateChecked
      });
    };
  }
}), r5 = window.Vue.computed, i5 = window.Vue.defineComponent, a5 = window.Vue.h, l5 = window.Vue.ref, s5 = Object.assign(Object.assign({}, Rr), _e.props), d5 = i5({
  name: "Tooltip",
  props: s5,
  slots: Object,
  __popover__: !0,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = je(e), n = _e("Tooltip", "-tooltip", void 0, $g, e, t), o = l5(null);
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
      popoverThemeOverrides: r5(() => n.value.self)
    });
  },
  render() {
    const {
      mergedTheme: e,
      internalExtraClass: t
    } = this;
    return a5(Ii, Object.assign(Object.assign({}, this.$props), {
      theme: e.peers.Popover,
      themeOverrides: e.peerOverrides.Popover,
      builtinThemeOverrides: this.popoverThemeOverrides,
      internalExtraClass: t.concat("tooltip"),
      ref: "popoverRef"
    }), this.$slots);
  }
}), Og = P("ellipsis", {
  overflow: "hidden"
}, [rt("line-clamp", `
 white-space: nowrap;
 display: inline-block;
 vertical-align: bottom;
 max-width: 100%;
 `), N("line-clamp", `
 display: -webkit-inline-box;
 -webkit-box-orient: vertical;
 `), N("cursor-pointer", `
 cursor: pointer;
 `)]), ph = window.Vue.computed, c5 = window.Vue.defineComponent, ms = window.Vue.h, u5 = window.Vue.mergeProps, f5 = window.Vue.onDeactivated, ma = window.Vue.ref;
function bd(e) {
  return `${e}-ellipsis--line-clamp`;
}
function wd(e, t) {
  return `${e}-ellipsis--cursor-${t}`;
}
const Mg = Object.assign(Object.assign({}, _e.props), {
  expandTrigger: String,
  lineClamp: [Number, String],
  tooltip: {
    type: [Boolean, Object],
    default: !0
  }
}), gc = c5({
  name: "Ellipsis",
  inheritAttrs: !1,
  props: Mg,
  slots: Object,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    const o = Sv(), r = _e("Ellipsis", "-ellipsis", Og, Rg, e, o), i = ma(null), l = ma(null), a = ma(null), s = ma(!1), d = ph(() => {
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
          lineClamp: $
        } = e;
        if (v(w), $ !== void 0)
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
    const h = ph(() => e.expandTrigger === "click" ? () => {
      var m;
      const {
        value: u
      } = s;
      u && ((m = a.value) === null || m === void 0 || m.setShow(!1)), s.value = !u;
    } : void 0);
    f5(() => {
      var m;
      e.tooltip && ((m = a.value) === null || m === void 0 || m.setShow(!1));
    });
    const p = () => ms("span", Object.assign({}, u5(n, {
      class: [`${o.value}-ellipsis`, e.lineClamp !== void 0 ? bd(o.value) : void 0, e.expandTrigger === "click" ? wd(o.value, "pointer") : void 0],
      style: d.value
    }), {
      ref: "triggerRef",
      onClick: h.value,
      onMouseenter: (
        // get tooltip disabled will derive cursor style
        e.expandTrigger === "click" ? c : void 0
      )
    }), e.lineClamp ? t : ms("span", {
      ref: "triggerInnerRef"
    }, t));
    function v(m) {
      if (!m) return;
      const u = d.value, w = bd(o.value);
      e.lineClamp !== void 0 ? g(m, w, "add") : g(m, w, "remove");
      for (const $ in u)
        m.style[$] !== u[$] && (m.style[$] = u[$]);
    }
    function f(m, u) {
      const w = wd(o.value, "pointer");
      e.expandTrigger === "click" && !u ? g(m, w, "add") : g(m, w, "remove");
    }
    function g(m, u, w) {
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
      return ms(d5, Object.assign({
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
}), h5 = window.Vue.defineComponent, bs = window.Vue.h, vh = window.Vue.mergeProps, p5 = window.Vue.ref, v5 = h5({
  name: "PerformantEllipsis",
  props: Mg,
  inheritAttrs: !1,
  setup(e, {
    attrs: t,
    slots: n
  }) {
    const o = p5(!1), r = Sv();
    return nr("-ellipsis", Og, r), {
      mouseEntered: o,
      renderTrigger: () => {
        const {
          lineClamp: l
        } = e, a = r.value;
        return bs("span", Object.assign({}, vh(t, {
          class: [`${a}-ellipsis`, l !== void 0 ? bd(a) : void 0, e.expandTrigger === "click" ? wd(a, "pointer") : void 0],
          style: l === void 0 ? {
            textOverflow: "ellipsis"
          } : {
            "-webkit-line-clamp": l
          }
        }), {
          onMouseenter: () => {
            o.value = !0;
          }
        }), l ? n : bs("span", null, n));
      }
    };
  },
  render() {
    return this.mouseEntered ? bs(gc, vh({}, this.$attrs, this.$props), this.$slots) : this.renderTrigger();
  }
}), g5 = window.Vue.defineComponent, ws = window.Vue.h, m5 = g5({
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
    if (l && !t ? i = l(o, this.index) : t ? i = (e = o[a]) === null || e === void 0 ? void 0 : e.value : i = r ? r(Ei(o, a), o, n) : Ei(o, a), s)
      if (typeof s == "object") {
        const {
          mergedTheme: d
        } = this;
        return n.ellipsisComponent === "performant-ellipsis" ? ws(v5, Object.assign({}, s, {
          theme: d.peers.Ellipsis,
          themeOverrides: d.peerOverrides.Ellipsis
        }), {
          default: () => i
        }) : ws(gc, Object.assign({}, s, {
          theme: d.peers.Ellipsis,
          themeOverrides: d.peerOverrides.Ellipsis
        }), {
          default: () => i
        });
      } else
        return ws("span", {
          class: `${this.clsPrefix}-data-table-td__ellipsis`
        }, i);
    return i;
  }
}), b5 = window.Vue.defineComponent, Jr = window.Vue.h, gh = b5({
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
    return Jr("div", {
      class: [`${e}-data-table-expand-trigger`, this.expanded && `${e}-data-table-expand-trigger--expanded`],
      onClick: this.onClick,
      onMousedown: (t) => {
        t.preventDefault();
      }
    }, Jr(_r, null, {
      default: () => this.loading ? Jr(zr, {
        key: "loading",
        clsPrefix: this.clsPrefix,
        radius: 85,
        strokeWidth: 15,
        scale: 0.88
      }) : this.renderExpandIcon ? this.renderExpandIcon({
        expanded: this.expanded,
        rowData: this.rowData
      }) : Jr(_t, {
        clsPrefix: e,
        key: "base-icon"
      }, {
        default: () => Jr(tg, null)
      })
    }));
  }
}), mh = window.Vue.computed, w5 = window.Vue.defineComponent, eo = window.Vue.h, y5 = window.Vue.inject, x5 = window.Vue.ref, C5 = w5({
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
    } = je(e), o = Lt("DataTable", n, t), {
      mergedClsPrefixRef: r,
      mergedThemeRef: i,
      localeRef: l
    } = y5(Tn), a = x5(e.value), s = mh(() => {
      const {
        value: f
      } = a;
      return Array.isArray(f) ? f : null;
    }), d = mh(() => {
      const {
        value: f
      } = a;
      return vs(e.column) ? Array.isArray(f) && f.length && f[0] || null : Array.isArray(f) ? null : f;
    });
    function c(f) {
      e.onChange(f);
    }
    function h(f) {
      e.multiple && Array.isArray(f) ? a.value = f : vs(e.column) && !Array.isArray(f) ? a.value = [f] : a.value = f;
    }
    function p() {
      c(a.value), e.onConfirm();
    }
    function v() {
      e.multiple || vs(e.column) ? c([]) : c(null), e.onClear();
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
    return eo("div", {
      class: [`${n}-data-table-filter-menu`, this.rtlEnabled && `${n}-data-table-filter-menu--rtl`]
    }, eo(or, null, {
      default: () => {
        const {
          checkboxGroupValue: o,
          handleChange: r
        } = this;
        return this.multiple ? eo(VT, {
          value: o,
          class: `${n}-data-table-filter-menu__group`,
          onUpdateValue: r
        }, {
          default: () => this.options.map((i) => eo(fc, {
            key: i.value,
            theme: e.peers.Checkbox,
            themeOverrides: e.peerOverrides.Checkbox,
            value: i.value
          }, {
            default: () => i.label
          }))
        }) : eo(Q_, {
          name: this.radioGroupName,
          class: `${n}-data-table-filter-menu__group`,
          value: this.radioGroupValue,
          onUpdateValue: this.handleChange
        }, {
          default: () => this.options.map((i) => eo(zg, {
            key: i.value,
            value: i.value,
            theme: e.peers.Radio,
            themeOverrides: e.peerOverrides.Radio
          }, {
            default: () => i.label
          }))
        });
      }
    }), eo("div", {
      class: `${n}-data-table-filter-menu__action`
    }, eo(qt, {
      size: "tiny",
      theme: e.peers.Button,
      themeOverrides: e.peerOverrides.Button,
      onClick: this.handleClearClick
    }, {
      default: () => t.clear
    }), eo(qt, {
      theme: e.peers.Button,
      themeOverrides: e.peerOverrides.Button,
      type: "primary",
      size: "tiny",
      onClick: this.handleConfirmClick
    }, {
      default: () => t.confirm
    })));
  }
}), S5 = window.Vue.defineComponent, $5 = S5({
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
}), ba = window.Vue.computed, R5 = window.Vue.defineComponent, pr = window.Vue.h, k5 = window.Vue.inject, P5 = window.Vue.ref;
function T5(e, t, n) {
  const o = Object.assign({}, e);
  return o[t] = n, o;
}
const _5 = R5({
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
    } = k5(Tn), c = P5(!1), h = r, p = ba(() => e.column.filterMultiple !== !1), v = ba(() => {
      const $ = h.value[e.column.key];
      if ($ === void 0) {
        const {
          value: b
        } = p;
        return b ? [] : null;
      }
      return $;
    }), f = ba(() => {
      const {
        value: $
      } = v;
      return Array.isArray($) ? $.length > 0 : $ !== null;
    }), g = ba(() => {
      var $, b;
      return ((b = ($ = t == null ? void 0 : t.value) === null || $ === void 0 ? void 0 : $.DataTable) === null || b === void 0 ? void 0 : b.renderFilter) || e.column.renderFilter;
    });
    function m($) {
      const b = T5(h.value, e.column.key, $);
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
      mergedRenderFilter: g,
      filterIconPopoverProps: d,
      filterMultiple: p,
      mergedFilterValue: v,
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
    return pr(Ii, Object.assign({
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
          return pr($5, {
            "data-data-table-filter": !0,
            render: r,
            active: this.active,
            show: this.showPopover
          });
        const {
          renderFilterIcon: i
        } = this.column;
        return pr("div", {
          "data-data-table-filter": !0,
          class: [`${t}-data-table-filter`, {
            [`${t}-data-table-filter--active`]: this.active,
            [`${t}-data-table-filter--show`]: this.showPopover
          }]
        }, i ? i({
          active: this.active,
          show: this.showPopover
        }) : pr(_t, {
          clsPrefix: t
        }, {
          default: () => pr(yk, null)
        }));
      },
      default: () => {
        const {
          renderFilterMenu: r
        } = this.column;
        return r ? r({
          hide: n
        }) : pr(C5, {
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
}), E5 = window.Vue.defineComponent, z5 = window.Vue.h, F5 = window.Vue.inject, O5 = window.Vue.onBeforeUnmount, M5 = window.Vue.ref, I5 = E5({
  name: "ColumnResizeButton",
  props: {
    onResizeStart: Function,
    onResize: Function,
    onResizeEnd: Function
  },
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = F5(Tn), n = M5(!1);
    let o = 0;
    function r(s) {
      return s.clientX;
    }
    function i(s) {
      var d;
      s.preventDefault();
      const c = n.value;
      o = r(s), n.value = !0, c || (pt("mousemove", window, l), pt("mouseup", window, a), (d = e.onResizeStart) === null || d === void 0 || d.call(e));
    }
    function l(s) {
      var d;
      (d = e.onResize) === null || d === void 0 || d.call(e, r(s) - o);
    }
    function a() {
      var s;
      n.value = !1, (s = e.onResizeEnd) === null || s === void 0 || s.call(e), at("mousemove", window, l), at("mouseup", window, a);
    }
    return O5(() => {
      at("mousemove", window, l), at("mouseup", window, a);
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
    return z5("span", {
      "data-data-table-resizable": !0,
      class: [`${e}-data-table-resize-button`, this.active && `${e}-data-table-resize-button--active`],
      onMousedown: this.handleMousedown
    });
  }
}), V5 = window.Vue.defineComponent, A5 = V5({
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
}), wa = window.Vue.computed, B5 = window.Vue.defineComponent, ya = window.Vue.h, L5 = window.Vue.inject, D5 = B5({
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
    } = L5(Tn), r = wa(() => n.value.find((s) => s.columnKey === e.column.key)), i = wa(() => r.value !== void 0), l = wa(() => {
      const {
        value: s
      } = r;
      return s && i.value ? s.order : !1;
    }), a = wa(() => {
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
    return e ? ya(A5, {
      render: e,
      order: t
    }) : ya("span", {
      class: [`${n}-data-table-sorter`, t === "ascend" && `${n}-data-table-sorter--asc`, t === "descend" && `${n}-data-table-sorter--desc`]
    }, o ? o({
      order: t
    }) : ya(_t, {
      clsPrefix: n
    }, {
      default: () => ya(ek, null)
    }));
  }
}), mc = "n-dropdown-menu", gl = "n-dropdown", bh = "n-dropdown-option", N5 = window.Vue.defineComponent, H5 = window.Vue.h, Ig = N5({
  name: "DropdownDivider",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  render() {
    return H5("div", {
      class: `${this.clsPrefix}-dropdown-divider`
    });
  }
}), j5 = window.Vue.defineComponent, Qr = window.Vue.h, wh = window.Vue.inject, W5 = j5({
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
    } = wh(mc), {
      renderLabelRef: n,
      labelFieldRef: o,
      nodePropsRef: r,
      renderOptionRef: i
    } = wh(gl);
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
    } = this.tmNode, s = Qr("div", Object.assign({
      class: `${t}-dropdown-option`
    }, r == null ? void 0 : r(a)), Qr("div", {
      class: `${t}-dropdown-option-body ${t}-dropdown-option-body--group`
    }, Qr("div", {
      "data-dropdown-option": !0,
      class: [`${t}-dropdown-option-body__prefix`, o && `${t}-dropdown-option-body__prefix--show-icon`]
    }, $n(a.icon)), Qr("div", {
      class: `${t}-dropdown-option-body__label`,
      "data-dropdown-option": !0
    }, i ? i(a) : $n((e = a.title) !== null && e !== void 0 ? e : a[this.labelField])), Qr("div", {
      class: [`${t}-dropdown-option-body__suffix`, n && `${t}-dropdown-option-body__suffix--has-submenu`],
      "data-dropdown-option": !0
    })));
    return l ? l({
      node: s,
      option: a
    }) : s;
  }
});
function U5(e) {
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
const K5 = {
  common: wt,
  self: U5
}, q5 = P("icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [N("color-transition", {
  transition: "color .3s var(--n-bezier)"
}), N("depth", {
  color: "var(--n-color)"
}, [I("svg", {
  opacity: "var(--n-opacity)",
  transition: "opacity .3s var(--n-bezier)"
})]), I("svg", {
  height: "1em",
  width: "1em"
})]), ys = window.Vue.computed, G5 = window.Vue.defineComponent, yh = window.Vue.h, X5 = window.Vue.mergeProps, Y5 = Object.assign(Object.assign({}, _e.props), {
  depth: [String, Number],
  size: [Number, String],
  color: String,
  component: [Object, Function]
}), Z5 = G5({
  _n_icon__: !0,
  name: "Icon",
  inheritAttrs: !1,
  props: Y5,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = je(e), o = _e("Icon", "-icon", q5, K5, e, t), r = ys(() => {
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
    }), i = n ? St("icon", ys(() => `${e.depth || "d"}`), r, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedStyle: ys(() => {
        const {
          size: l,
          color: a
        } = e;
        return {
          fontSize: Et(l),
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
    return !((e = t == null ? void 0 : t.$options) === null || e === void 0) && e._n_icon__ && Po("icon", "don't wrap `n-icon` inside `n-icon`"), i == null || i(), yh("i", X5(this.$attrs, {
      role: "img",
      class: [`${o}-icon`, l, {
        [`${o}-icon--depth`]: n,
        [`${o}-icon--color-transition`]: n !== void 0
      }],
      style: [this.cssVars, this.mergedStyle]
    }), r ? yh(r) : this.$slots);
  }
});
function yd(e, t) {
  return e.type === "submenu" || e.type === void 0 && e[t] !== void 0;
}
function J5(e) {
  return e.type === "group";
}
function Vg(e) {
  return e.type === "divider";
}
function Q5(e) {
  return e.type === "render";
}
const Ao = window.Vue.computed, e4 = window.Vue.defineComponent, Qt = window.Vue.h, xa = window.Vue.inject, t4 = window.Vue.mergeProps, n4 = window.Vue.provide, o4 = window.Vue.ref, r4 = window.Vue.Transition, Ag = e4({
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
    const t = xa(gl), {
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
      menuPropsRef: g
    } = t, m = xa(bh, null), u = xa(mc), w = xa(Oi), $ = Ao(() => e.tmNode.rawNode), b = Ao(() => {
      const {
        value: U
      } = p;
      return yd(e.tmNode.rawNode, U);
    }), S = Ao(() => {
      const {
        disabled: U
      } = e.tmNode;
      return U;
    }), C = Ao(() => {
      if (!b.value) return !1;
      const {
        key: U,
        disabled: Q
      } = e.tmNode;
      if (Q) return !1;
      const {
        value: oe
      } = n, {
        value: ne
      } = o, {
        value: X
      } = r, {
        value: j
      } = i;
      return oe !== null ? j.includes(U) : ne !== null ? j.includes(U) && j[j.length - 1] !== U : X !== null ? j.includes(U) : !1;
    }), y = Ao(() => o.value === null && !a.value), E = K0(C, 300, y), R = Ao(() => !!(m != null && m.enteringSubmenuRef.value)), O = o4(!1);
    n4(bh, {
      enteringSubmenuRef: O
    });
    function W() {
      O.value = !0;
    }
    function _() {
      O.value = !1;
    }
    function V() {
      const {
        parentKey: U,
        tmNode: Q
      } = e;
      Q.disabled || s.value && (r.value = U, o.value = null, n.value = Q.key);
    }
    function B() {
      const {
        tmNode: U
      } = e;
      U.disabled || s.value && n.value !== U.key && V();
    }
    function M(U) {
      if (e.tmNode.disabled || !s.value) return;
      const {
        relatedTarget: Q
      } = U;
      Q && !pn({
        target: Q
      }, "dropdownOption") && !pn({
        target: Q
      }, "scrollbarRail") && (n.value = null);
    }
    function G() {
      const {
        value: U
      } = b, {
        tmNode: Q
      } = e;
      s.value && !U && !Q.disabled && (t.doSelect(Q.key, Q.rawNode), t.doUpdateShow(!1));
    }
    return {
      labelField: h,
      renderLabel: d,
      renderIcon: c,
      siblingHasIcon: u.showIconRef,
      siblingHasSubmenu: u.hasSubmenuRef,
      menuProps: g,
      popoverBody: w,
      animated: a,
      mergedShowSubmenu: Ao(() => E.value && !R.value),
      rawNode: $,
      hasSubmenu: b,
      pending: Be(() => {
        const {
          value: U
        } = i, {
          key: Q
        } = e.tmNode;
        return U.includes(Q);
      }),
      childActive: Be(() => {
        const {
          value: U
        } = l, {
          key: Q
        } = e.tmNode, oe = U.findIndex((ne) => Q === ne);
        return oe === -1 ? !1 : oe < U.length - 1;
      }),
      active: Be(() => {
        const {
          value: U
        } = l, {
          key: Q
        } = e.tmNode, oe = U.findIndex((ne) => Q === ne);
        return oe === -1 ? !1 : oe === U.length - 1;
      }),
      mergedDisabled: S,
      renderOption: v,
      nodeProps: f,
      handleClick: G,
      handleMouseMove: B,
      handleMouseEnter: V,
      handleMouseLeave: M,
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
      f = Qt(Bg, Object.assign({}, w, {
        clsPrefix: i,
        scrollable: this.scrollable,
        tmNodes: this.tmNode.children,
        parentKey: this.tmNode.key
      }));
    }
    const g = {
      class: [`${i}-dropdown-option-body`, this.pending && `${i}-dropdown-option-body--pending`, this.active && `${i}-dropdown-option-body--active`, this.childActive && `${i}-dropdown-option-body--child-active`, this.mergedDisabled && `${i}-dropdown-option-body--disabled`],
      onMousemove: this.handleMouseMove,
      onMouseenter: this.handleMouseEnter,
      onMouseleave: this.handleMouseLeave,
      onClick: this.handleClick
    }, m = h == null ? void 0 : h(o), u = Qt("div", Object.assign({
      class: [`${i}-dropdown-option`, m == null ? void 0 : m.class],
      "data-dropdown-option": !0
    }, m), Qt("div", t4(g, p), [Qt("div", {
      class: [`${i}-dropdown-option-body__prefix`, l && `${i}-dropdown-option-body__prefix--show-icon`]
    }, [d ? d(o) : $n(o.icon)]), Qt("div", {
      "data-dropdown-option": !0,
      class: `${i}-dropdown-option-body__label`
    }, s ? s(o) : $n((t = o[this.labelField]) !== null && t !== void 0 ? t : o.title)), Qt("div", {
      "data-dropdown-option": !0,
      class: [`${i}-dropdown-option-body__suffix`, a && `${i}-dropdown-option-body__suffix--has-submenu`]
    }, this.hasSubmenu ? Qt(Z5, null, {
      default: () => Qt(tg, null)
    }) : null)]), this.hasSubmenu ? Qt(Nd, null, {
      default: () => [Qt(Hd, null, {
        default: () => Qt("div", {
          class: `${i}-dropdown-offset-container`
        }, Qt(Wd, {
          show: this.mergedShowSubmenu,
          placement: this.placement,
          to: v && this.popoverBody || void 0,
          teleportDisabled: !v
        }, {
          default: () => Qt("div", {
            class: `${i}-dropdown-menu-wrapper`
          }, n ? Qt(r4, {
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
}), i4 = window.Vue.defineComponent, a4 = window.Vue.Fragment, Ca = window.Vue.h, l4 = i4({
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
    return Ca(a4, null, Ca(W5, {
      clsPrefix: n,
      tmNode: e,
      key: e.key
    }), o == null ? void 0 : o.map((r) => {
      const {
        rawNode: i
      } = r;
      return i.show === !1 ? null : Vg(i) ? Ca(Ig, {
        clsPrefix: n,
        key: r.key
      }) : r.isGroup ? (Po("dropdown", "`group` node is not allowed to be put in `group` node."), null) : Ca(Ag, {
        clsPrefix: n,
        tmNode: r,
        parentKey: t,
        key: r.key
      });
    }));
  }
}), s4 = window.Vue.defineComponent, d4 = window.Vue.h, c4 = s4({
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
    return d4("div", t, [e == null ? void 0 : e()]);
  }
}), xh = window.Vue.computed, u4 = window.Vue.defineComponent, vr = window.Vue.h, f4 = window.Vue.inject, Sa = window.Vue.provide, h4 = window.Vue.ref, Bg = u4({
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
    } = f4(gl);
    Sa(mc, {
      showIconRef: xh(() => {
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
      hasSubmenuRef: xh(() => {
        const {
          value: r
        } = n;
        return e.tmNodes.some((i) => {
          var l;
          if (i.isGroup)
            return (l = i.children) === null || l === void 0 ? void 0 : l.some(({
              rawNode: s
            }) => yd(s, r));
          const {
            rawNode: a
          } = i;
          return yd(a, r);
        });
      })
    });
    const o = h4(null);
    return Sa(ll, null), Sa(al, null), Sa(Oi, o), {
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
      return i.show === !1 ? null : Q5(i) ? vr(c4, {
        tmNode: r,
        key: r.key
      }) : Vg(i) ? vr(Ig, {
        clsPrefix: t,
        key: r.key
      }) : J5(i) ? vr(l4, {
        clsPrefix: t,
        tmNode: r,
        parentKey: e,
        key: r.key
      }) : vr(Ag, {
        clsPrefix: t,
        tmNode: r,
        parentKey: e,
        key: r.key,
        props: i.props,
        scrollable: n
      });
    });
    return vr("div", {
      class: [`${t}-dropdown-menu`, n && `${t}-dropdown-menu--scrollable`],
      ref: "bodyRef"
    }, n ? vr(rg, {
      contentClass: `${t}-dropdown-menu__content`
    }, {
      default: () => o
    }) : o, this.showArrow ? cg({
      clsPrefix: t,
      arrowStyle: this.arrowStyle,
      arrowClass: void 0,
      arrowWrapperClass: void 0,
      arrowWrapperStyle: void 0
    }) : null);
  }
}), p4 = P("dropdown-menu", `
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`, [vl(), P("dropdown-option", `
 position: relative;
 `, [I("a", `
 text-decoration: none;
 color: inherit;
 outline: none;
 `, [I("&::before", `
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]), P("dropdown-option-body", `
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `, [I("&::before", `
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `), rt("disabled", [N("pending", `
 color: var(--n-option-text-color-hover);
 `, [L("prefix, suffix", `
 color: var(--n-option-text-color-hover);
 `), I("&::before", "background-color: var(--n-option-color-hover);")]), N("active", `
 color: var(--n-option-text-color-active);
 `, [L("prefix, suffix", `
 color: var(--n-option-text-color-active);
 `), I("&::before", "background-color: var(--n-option-color-active);")]), N("child-active", `
 color: var(--n-option-text-color-child-active);
 `, [L("prefix, suffix", `
 color: var(--n-option-text-color-child-active);
 `)])]), N("disabled", `
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `), N("group", `
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `, [L("prefix", `
 width: calc(var(--n-option-prefix-width) / 2);
 `, [N("show-icon", `
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]), L("prefix", `
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `, [N("show-icon", `
 width: var(--n-option-icon-prefix-width);
 `), P("icon", `
 font-size: var(--n-option-icon-size);
 `)]), L("label", `
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `), L("suffix", `
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
 `, [N("has-submenu", `
 width: var(--n-option-icon-suffix-width);
 `), P("icon", `
 font-size: var(--n-option-icon-size);
 `)]), P("dropdown-menu", "pointer-events: all;")]), P("dropdown-offset-container", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]), P("dropdown-divider", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `), P("dropdown-menu-wrapper", `
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `), I(">", [P("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), rt("scrollable", `
 padding: var(--n-padding);
 `), N("scrollable", [L("content", `
 padding: var(--n-padding);
 `)])]), Bo = window.Vue.computed, v4 = window.Vue.defineComponent, Ch = window.Vue.h, g4 = window.Vue.mergeProps, m4 = window.Vue.provide, $a = window.Vue.ref, to = window.Vue.toRef, b4 = window.Vue.watch, w4 = {
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
}, y4 = Object.keys(Rr), x4 = Object.assign(Object.assign(Object.assign({}, Rr), w4), _e.props), C4 = v4({
  name: "Dropdown",
  inheritAttrs: !1,
  props: x4,
  setup(e) {
    const t = $a(!1), n = Ot(to(e, "show"), t), o = Bo(() => {
      const {
        keyField: _,
        childrenField: V
      } = e;
      return pl(e.options, {
        getKey(B) {
          return B[_];
        },
        getDisabled(B) {
          return B.disabled === !0;
        },
        getIgnored(B) {
          return B.type === "divider" || B.type === "render";
        },
        getChildren(B) {
          return B[V];
        }
      });
    }), r = Bo(() => o.value.treeNodes), i = $a(null), l = $a(null), a = $a(null), s = Bo(() => {
      var _, V, B;
      return (B = (V = (_ = i.value) !== null && _ !== void 0 ? _ : l.value) !== null && V !== void 0 ? V : a.value) !== null && B !== void 0 ? B : null;
    }), d = Bo(() => o.value.getPath(s.value).keyPath), c = Bo(() => o.value.getPath(e.value).keyPath), h = Be(() => e.keyboard && n.value);
    I0({
      keydown: {
        ArrowUp: {
          prevent: !0,
          handler: S
        },
        ArrowRight: {
          prevent: !0,
          handler: b
        },
        ArrowDown: {
          prevent: !0,
          handler: C
        },
        ArrowLeft: {
          prevent: !0,
          handler: $
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
    } = je(e), f = _e("Dropdown", "-dropdown", p4, Sg, e, p);
    m4(gl, {
      labelFieldRef: to(e, "labelField"),
      childrenFieldRef: to(e, "childrenField"),
      renderLabelRef: to(e, "renderLabel"),
      renderIconRef: to(e, "renderIcon"),
      hoverKeyRef: i,
      keyboardKeyRef: l,
      lastToggledSubmenuKeyRef: a,
      pendingKeyPathRef: d,
      activeKeyPathRef: c,
      animatedRef: to(e, "animated"),
      mergedShowRef: n,
      nodePropsRef: to(e, "nodeProps"),
      renderOptionRef: to(e, "renderOption"),
      menuPropsRef: to(e, "menuProps"),
      doSelect: g,
      doUpdateShow: m
    }), b4(n, (_) => {
      !e.animated && !_ && u();
    });
    function g(_, V) {
      const {
        onSelect: B
      } = e;
      B && ue(B, _, V);
    }
    function m(_) {
      const {
        "onUpdate:show": V,
        onUpdateShow: B
      } = e;
      V && ue(V, _), B && ue(B, _), t.value = _;
    }
    function u() {
      i.value = null, l.value = null, a.value = null;
    }
    function w() {
      m(!1);
    }
    function $() {
      R("left");
    }
    function b() {
      R("right");
    }
    function S() {
      R("up");
    }
    function C() {
      R("down");
    }
    function y() {
      const _ = E();
      _ != null && _.isLeaf && n.value && (g(_.key, _.rawNode), m(!1));
    }
    function E() {
      var _;
      const {
        value: V
      } = o, {
        value: B
      } = s;
      return !V || B === null ? null : (_ = V.getNode(B)) !== null && _ !== void 0 ? _ : null;
    }
    function R(_) {
      const {
        value: V
      } = s, {
        value: {
          getFirstAvailableNode: B
        }
      } = o;
      let M = null;
      if (V === null) {
        const G = B();
        G !== null && (M = G.key);
      } else {
        const G = E();
        if (G) {
          let U;
          switch (_) {
            case "down":
              U = G.getNext();
              break;
            case "up":
              U = G.getPrev();
              break;
            case "right":
              U = G.getChild();
              break;
            case "left":
              U = G.getParent();
              break;
          }
          U && (M = U.key);
        }
      }
      M !== null && (i.value = null, l.value = M);
    }
    const O = Bo(() => {
      const {
        size: _,
        inverted: V
      } = e, {
        common: {
          cubicBezierEaseInOut: B
        },
        self: M
      } = f.value, {
        padding: G,
        dividerColor: U,
        borderRadius: Q,
        optionOpacityDisabled: oe,
        [ie("optionIconSuffixWidth", _)]: ne,
        [ie("optionSuffixWidth", _)]: X,
        [ie("optionIconPrefixWidth", _)]: j,
        [ie("optionPrefixWidth", _)]: Z,
        [ie("fontSize", _)]: te,
        [ie("optionHeight", _)]: fe,
        [ie("optionIconSize", _)]: he
      } = M, ve = {
        "--n-bezier": B,
        "--n-font-size": te,
        "--n-padding": G,
        "--n-border-radius": Q,
        "--n-option-height": fe,
        "--n-option-prefix-width": Z,
        "--n-option-icon-prefix-width": j,
        "--n-option-suffix-width": X,
        "--n-option-icon-suffix-width": ne,
        "--n-option-icon-size": he,
        "--n-divider-color": U,
        "--n-option-opacity-disabled": oe
      };
      return V ? (ve["--n-color"] = M.colorInverted, ve["--n-option-color-hover"] = M.optionColorHoverInverted, ve["--n-option-color-active"] = M.optionColorActiveInverted, ve["--n-option-text-color"] = M.optionTextColorInverted, ve["--n-option-text-color-hover"] = M.optionTextColorHoverInverted, ve["--n-option-text-color-active"] = M.optionTextColorActiveInverted, ve["--n-option-text-color-child-active"] = M.optionTextColorChildActiveInverted, ve["--n-prefix-color"] = M.prefixColorInverted, ve["--n-suffix-color"] = M.suffixColorInverted, ve["--n-group-header-text-color"] = M.groupHeaderTextColorInverted) : (ve["--n-color"] = M.color, ve["--n-option-color-hover"] = M.optionColorHover, ve["--n-option-color-active"] = M.optionColorActive, ve["--n-option-text-color"] = M.optionTextColor, ve["--n-option-text-color-hover"] = M.optionTextColorHover, ve["--n-option-text-color-active"] = M.optionTextColorActive, ve["--n-option-text-color-child-active"] = M.optionTextColorChildActive, ve["--n-prefix-color"] = M.prefixColor, ve["--n-suffix-color"] = M.suffixColor, ve["--n-group-header-text-color"] = M.groupHeaderTextColor), ve;
    }), W = v ? St("dropdown", Bo(() => `${e.size[0]}${e.inverted ? "i" : ""}`), O, e) : void 0;
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
      cssVars: v ? void 0 : O,
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
        ref: wv(r),
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
      return Ch(Bg, g4(this.$attrs, p, h));
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
    return Ch(Ii, Object.assign({}, ki(this.$props, y4), n), {
      trigger: () => {
        var o, r;
        return (r = (o = this.$slots).default) === null || r === void 0 ? void 0 : r.call(o);
      }
    });
  }
}), Sh = window.Vue.computed, S4 = window.Vue.defineComponent, xs = window.Vue.h, $4 = window.Vue.inject, Lg = "_n_all__", Dg = "_n_none__";
function R4(e, t, n, o) {
  return e ? (r) => {
    for (const i of e)
      switch (r) {
        case Lg:
          n(!0);
          return;
        case Dg:
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
function k4(e, t) {
  return e ? e.map((n) => {
    switch (n) {
      case "all":
        return {
          label: t.checkTableAll,
          key: Lg
        };
      case "none":
        return {
          label: t.uncheckTableAll,
          key: Dg
        };
      default:
        return n;
    }
  }) : [];
}
const P4 = S4({
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
    } = $4(Tn), a = Sh(() => R4(o.value, r, i, l)), s = Sh(() => k4(o.value, n.value));
    return () => {
      var d, c, h, p;
      const {
        clsPrefix: v
      } = e;
      return xs(C4, {
        theme: (c = (d = t.theme) === null || d === void 0 ? void 0 : d.peers) === null || c === void 0 ? void 0 : c.Dropdown,
        themeOverrides: (p = (h = t.themeOverrides) === null || h === void 0 ? void 0 : h.peers) === null || p === void 0 ? void 0 : p.Dropdown,
        options: s.value,
        onSelect: a.value
      }, {
        default: () => xs(_t, {
          clsPrefix: v,
          class: `${v}-data-table-check-extra`
        }, {
          default: () => xs(eg, null)
        })
      });
    };
  }
}), Ng = window.Vue.defineComponent, $h = window.Vue.Fragment, mt = window.Vue.h, T4 = window.Vue.inject, Rh = window.Vue.ref;
function Cs(e) {
  return typeof e.title == "function" ? e.title(e) : e.title;
}
const _4 = Ng({
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
    return mt("table", {
      style: {
        tableLayout: "fixed",
        width: o
      },
      class: `${e}-data-table-table`
    }, mt("colgroup", null, n.map((r) => mt("col", {
      key: r.key,
      style: r.style
    }))), mt("thead", {
      "data-n-id": t,
      class: `${e}-data-table-thead`
    }, this.$slots));
  }
}), Hg = Ng({
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
      virtualScrollHeaderRef: g,
      headerHeightRef: m,
      onUnstableColumnResize: u,
      doUpdateResizableWidth: w,
      handleTableHeaderScroll: $,
      deriveNextSorter: b,
      doUncheckAll: S,
      doCheckAll: C
    } = T4(Tn), y = Rh(), E = Rh({});
    function R(M) {
      const G = E.value[M];
      return G == null ? void 0 : G.getBoundingClientRect().width;
    }
    function O() {
      i.value ? S() : C();
    }
    function W(M, G) {
      if (pn(M, "dataTableFilter") || pn(M, "dataTableResizable") || !gs(G)) return;
      const U = h.value.find((oe) => oe.columnKey === G.key) || null, Q = M_(G, U);
      b(Q);
    }
    const _ = /* @__PURE__ */ new Map();
    function V(M) {
      _.set(M.key, R(M.key));
    }
    function B(M, G) {
      const U = _.get(M.key);
      if (U === void 0)
        return;
      const Q = U + G, oe = z_(Q, M.minWidth, M.maxWidth);
      u(Q, oe, M, R), w(M, oe);
    }
    return {
      cellElsRef: E,
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
      headerHeight: m,
      virtualScrollHeader: g,
      virtualListRef: y,
      handleCheckboxUpdateChecked: O,
      handleColHeaderClick: W,
      handleTableHeaderScroll: $,
      handleColumnResizeStart: V,
      handleColumnResize: B
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
      mergedSortState: g,
      virtualScrollHeader: m,
      handleColHeaderClick: u,
      handleCheckboxUpdateChecked: w,
      handleColumnResizeStart: $,
      handleColumnResize: b
    } = this, S = (R, O, W) => R.map(({
      column: _,
      colIndex: V,
      colSpan: B,
      rowSpan: M,
      isLast: G
    }) => {
      var U, Q;
      const oe = xn(_), {
        ellipsis: ne
      } = _, X = () => _.type === "selection" ? _.multiple !== !1 ? mt($h, null, mt(fc, {
        key: r,
        privateInsideTable: !0,
        checked: i,
        indeterminate: l,
        disabled: f,
        onUpdateChecked: w
      }), c ? mt(P4, {
        clsPrefix: t
      }) : null) : null : mt($h, null, mt("div", {
        class: `${t}-data-table-th__title-wrapper`
      }, mt("div", {
        class: `${t}-data-table-th__title`
      }, ne === !0 || ne && !ne.tooltip ? mt("div", {
        class: `${t}-data-table-th__ellipsis`
      }, Cs(_)) : ne && typeof ne == "object" ? mt(gc, Object.assign({}, ne, {
        theme: d.peers.Ellipsis,
        themeOverrides: d.peerOverrides.Ellipsis
      }), {
        default: () => Cs(_)
      }) : Cs(_)), gs(_) ? mt(D5, {
        column: _
      }) : null), sh(_) ? mt(_5, {
        column: _,
        options: _.filterOptions
      }) : null, Tg(_) ? mt(I5, {
        onResizeStart: () => {
          $(_);
        },
        onResize: (fe) => {
          b(_, fe);
        }
      }) : null), j = oe in n, Z = oe in o, te = O && !_.fixed ? "div" : "th";
      return mt(te, {
        ref: (fe) => e[oe] = fe,
        key: oe,
        style: [O && !_.fixed ? {
          position: "absolute",
          left: ht(O(V)),
          top: 0,
          bottom: 0
        } : {
          left: ht((U = n[oe]) === null || U === void 0 ? void 0 : U.start),
          right: ht((Q = o[oe]) === null || Q === void 0 ? void 0 : Q.start)
        }, {
          width: ht(_.width),
          textAlign: _.titleAlign || _.align,
          height: W
        }],
        colspan: B,
        rowspan: M,
        "data-col-key": oe,
        class: [`${t}-data-table-th`, (j || Z) && `${t}-data-table-th--fixed-${j ? "left" : "right"}`, {
          [`${t}-data-table-th--sorting`]: _g(_, g),
          [`${t}-data-table-th--filterable`]: sh(_),
          [`${t}-data-table-th--sortable`]: gs(_),
          [`${t}-data-table-th--selection`]: _.type === "selection",
          [`${t}-data-table-th--last`]: G
        }, _.className],
        onClick: _.type !== "selection" && _.type !== "expand" && !("children" in _) ? (fe) => {
          u(fe, _);
        } : void 0
      }, X());
    });
    if (m) {
      const {
        headerHeight: R
      } = this;
      let O = 0, W = 0;
      return s.forEach((_) => {
        _.column.fixed === "left" ? O++ : _.column.fixed === "right" && W++;
      }), mt(Kd, {
        ref: "virtualListRef",
        class: `${t}-data-table-base-table-header`,
        style: {
          height: ht(R)
        },
        onScroll: this.handleTableHeaderScroll,
        columns: s,
        itemSize: R,
        showScrollbar: !1,
        items: [{}],
        itemResizable: !1,
        visibleItemsTag: _4,
        visibleItemsProps: {
          clsPrefix: t,
          id: h,
          cols: s,
          width: Et(this.scrollX)
        },
        renderItemWithCols: ({
          startColIndex: _,
          endColIndex: V,
          getLeft: B
        }) => {
          const M = s.map((U, Q) => ({
            column: U.column,
            isLast: Q === s.length - 1,
            colIndex: U.index,
            colSpan: 1,
            rowSpan: 1
          })).filter(({
            column: U
          }, Q) => !!(_ <= Q && Q <= V || U.fixed)), G = S(M, B, ht(R));
          return G.splice(O, 0, mt("th", {
            colspan: s.length - O - W,
            style: {
              pointerEvents: "none",
              visibility: "hidden",
              height: 0
            }
          })), mt("tr", {
            style: {
              position: "relative"
            }
          }, G);
        }
      }, {
        default: ({
          renderedItemWithCols: _
        }) => _
      });
    }
    const C = mt("thead", {
      class: `${t}-data-table-thead`,
      "data-n-id": h
    }, a.map((R) => mt("tr", {
      class: `${t}-data-table-tr`
    }, S(R, null, void 0))));
    if (!p)
      return C;
    const {
      handleTableHeaderScroll: y,
      scrollX: E
    } = this;
    return mt("div", {
      class: `${t}-data-table-base-table-header`,
      onScroll: y
    }, mt("table", {
      class: `${t}-data-table-table`,
      style: {
        minWidth: Et(E),
        tableLayout: v
      }
    }, mt("colgroup", null, s.map((R) => mt("col", {
      key: R.key,
      style: R.style
    }))), C));
  }
}), kh = window.Vue.computed, jg = window.Vue.defineComponent, E4 = window.Vue.Fragment, st = window.Vue.h, Ph = window.Vue.inject, z4 = window.Vue.onUnmounted, Ss = window.Vue.ref, F4 = window.Vue.watchEffect;
function O4(e, t) {
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
const M4 = jg({
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
    return st("table", {
      style: {
        tableLayout: "fixed"
      },
      class: `${e}-data-table-table`,
      onMouseenter: o,
      onMouseleave: r
    }, st("colgroup", null, n.map((i) => st("col", {
      key: i.key,
      style: i.style
    }))), st("tbody", {
      "data-n-id": t,
      class: `${e}-data-table-tbody`
    }, this.$slots));
  }
}), I4 = jg({
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
      leftActiveFixedChildrenColKeysRef: g,
      rightActiveFixedColKeyRef: m,
      rightActiveFixedChildrenColKeysRef: u,
      renderExpandRef: w,
      hoverKeyRef: $,
      summaryRef: b,
      mergedSortStateRef: S,
      virtualScrollRef: C,
      virtualScrollXRef: y,
      heightForRowRef: E,
      minRowHeightRef: R,
      componentId: O,
      mergedTableLayoutRef: W,
      childTriggerColIndexRef: _,
      indentRef: V,
      rowPropsRef: B,
      maxHeightRef: M,
      stripedRef: G,
      loadingRef: U,
      onLoadRef: Q,
      loadingKeySetRef: oe,
      expandableRef: ne,
      stickyExpandedRowsRef: X,
      renderExpandIconRef: j,
      summaryPlacementRef: Z,
      treeMateRef: te,
      scrollbarPropsRef: fe,
      setHeaderScrollLeft: he,
      doUpdateExpandedRowKeys: ve,
      handleTableBodyScroll: ye,
      doCheck: J,
      doUncheck: ge,
      renderCell: Ee
    } = Ph(Tn), xe = Ph(ao), Te = Ss(null), Re = Ss(null), Le = Ss(null), Fe = Be(() => s.value.length === 0), de = Be(() => e.showHeader || !Fe.value), T = Be(() => e.showHeader || Fe.value);
    let k = "";
    const z = kh(() => new Set(o.value));
    function H(we) {
      var D;
      return (D = te.value.getNode(we)) === null || D === void 0 ? void 0 : D.rawNode;
    }
    function re(we, D, x) {
      const A = H(we.key);
      if (!A) {
        Po("data-table", `fail to get row data with key ${we.key}`);
        return;
      }
      if (x) {
        const ee = s.value.findIndex((Y) => Y.key === k);
        if (ee !== -1) {
          const Y = s.value.findIndex((Ce) => Ce.key === we.key), ae = Math.min(ee, Y), me = Math.max(ee, Y), pe = [];
          s.value.slice(ae, me + 1).forEach((Ce) => {
            Ce.disabled || pe.push(Ce.key);
          }), D ? J(pe, !1, A) : ge(pe, A), k = we.key;
          return;
        }
      }
      D ? J(we.key, !1, A) : ge(we.key, A), k = we.key;
    }
    function le(we) {
      const D = H(we.key);
      if (!D) {
        Po("data-table", `fail to get row data with key ${we.key}`);
        return;
      }
      J(we.key, !0, D);
    }
    function F() {
      if (!de.value) {
        const {
          value: D
        } = Le;
        return D || null;
      }
      if (C.value)
        return Pe();
      const {
        value: we
      } = Te;
      return we ? we.containerRef : null;
    }
    function K(we, D) {
      var x;
      if (oe.value.has(we)) return;
      const {
        value: A
      } = o, ee = A.indexOf(we), Y = Array.from(A);
      ~ee ? (Y.splice(ee, 1), ve(Y)) : D && !D.isLeaf && !D.shallowLoaded ? (oe.value.add(we), (x = Q.value) === null || x === void 0 || x.call(Q, D.rawNode).then(() => {
        const {
          value: ae
        } = o, me = Array.from(ae);
        ~me.indexOf(we) || me.push(we), ve(me);
      }).finally(() => {
        oe.value.delete(we);
      })) : (Y.push(we), ve(Y));
    }
    function be() {
      $.value = null;
    }
    function Pe() {
      const {
        value: we
      } = Re;
      return (we == null ? void 0 : we.listElRef) || null;
    }
    function Ke() {
      const {
        value: we
      } = Re;
      return (we == null ? void 0 : we.itemsElRef) || null;
    }
    function ct(we) {
      var D;
      ye(we), (D = Te.value) === null || D === void 0 || D.sync();
    }
    function qe(we) {
      var D;
      const {
        onResize: x
      } = e;
      x && x(we), (D = Te.value) === null || D === void 0 || D.sync();
    }
    const Ge = {
      getScrollContainer: F,
      scrollTo(we, D) {
        var x, A;
        C.value ? (x = Re.value) === null || x === void 0 || x.scrollTo(we, D) : (A = Te.value) === null || A === void 0 || A.scrollTo(we, D);
      }
    }, vt = I([({
      props: we
    }) => {
      const D = (A) => A === null ? null : I(`[data-n-id="${we.componentId}"] [data-col-key="${A}"]::after`, {
        boxShadow: "var(--n-box-shadow-after)"
      }), x = (A) => A === null ? null : I(`[data-n-id="${we.componentId}"] [data-col-key="${A}"]::before`, {
        boxShadow: "var(--n-box-shadow-before)"
      });
      return I([D(we.leftActiveFixedColKey), x(we.rightActiveFixedColKey), we.leftActiveFixedChildrenColKeys.map((A) => D(A)), we.rightActiveFixedChildrenColKeys.map((A) => x(A))]);
    }]);
    let Ne = !1;
    return F4(() => {
      const {
        value: we
      } = f, {
        value: D
      } = g, {
        value: x
      } = m, {
        value: A
      } = u;
      if (!Ne && we === null && x === null)
        return;
      const ee = {
        leftActiveFixedColKey: we,
        leftActiveFixedChildrenColKeys: D,
        rightActiveFixedColKey: x,
        rightActiveFixedChildrenColKeys: A,
        componentId: O
      };
      vt.mount({
        id: `n-${O}`,
        force: !0,
        props: ee,
        anchorMetaName: $r,
        parent: xe == null ? void 0 : xe.styleMountTarget
      }), Ne = !0;
    }), z4(() => {
      vt.unmount({
        id: `n-${O}`,
        parent: xe == null ? void 0 : xe.styleMountTarget
      });
    }), Object.assign({
      bodyWidth: n,
      summaryPlacement: Z,
      dataTableSlots: t,
      componentId: O,
      scrollbarInstRef: Te,
      virtualListRef: Re,
      emptyElRef: Le,
      summary: b,
      mergedClsPrefix: r,
      mergedTheme: i,
      scrollX: l,
      cols: a,
      loading: U,
      bodyShowHeaderOnly: T,
      shouldDisplaySomeTablePart: de,
      empty: Fe,
      paginatedDataAndInfo: kh(() => {
        const {
          value: we
        } = G;
        let D = !1;
        return {
          data: s.value.map(we ? (A, ee) => (A.isLeaf || (D = !0), {
            tmNode: A,
            key: A.key,
            striped: ee % 2 === 1,
            index: ee
          }) : (A, ee) => (A.isLeaf || (D = !0), {
            tmNode: A,
            key: A.key,
            striped: !1,
            index: ee
          })),
          hasChildren: D
        };
      }),
      rawPaginatedData: d,
      fixedColumnLeftMap: c,
      fixedColumnRightMap: h,
      currentPage: p,
      rowClassName: v,
      renderExpand: w,
      mergedExpandedRowKeySet: z,
      hoverKey: $,
      mergedSortState: S,
      virtualScroll: C,
      virtualScrollX: y,
      heightForRow: E,
      minRowHeight: R,
      mergedTableLayout: W,
      childTriggerColIndex: _,
      indent: V,
      rowProps: B,
      maxHeight: M,
      loadingKeySet: oe,
      expandable: ne,
      stickyExpandedRows: X,
      renderExpandIcon: j,
      scrollbarProps: fe,
      setHeaderScrollLeft: he,
      handleVirtualListScroll: ct,
      handleVirtualListResize: qe,
      handleMouseleaveTable: be,
      virtualListContainer: Pe,
      virtualListContent: Ke,
      handleTableBodyScroll: ye,
      handleCheckboxUpdateChecked: re,
      handleRadioUpdateChecked: le,
      handleUpdateExpanded: K,
      renderCell: Ee
    }, Ge);
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
      minWidth: Et(t) || "100%"
    };
    t && (v.width = "100%");
    const f = st(or, Object.assign({}, this.scrollbarProps, {
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
        const g = {}, m = {}, {
          cols: u,
          paginatedDataAndInfo: w,
          mergedTheme: $,
          fixedColumnLeftMap: b,
          fixedColumnRightMap: S,
          currentPage: C,
          rowClassName: y,
          mergedSortState: E,
          mergedExpandedRowKeySet: R,
          stickyExpandedRows: O,
          componentId: W,
          childTriggerColIndex: _,
          expandable: V,
          rowProps: B,
          handleMouseleaveTable: M,
          renderExpand: G,
          summary: U,
          handleCheckboxUpdateChecked: Q,
          handleRadioUpdateChecked: oe,
          handleUpdateExpanded: ne,
          heightForRow: X,
          minRowHeight: j,
          virtualScrollX: Z
        } = this, {
          length: te
        } = u;
        let fe;
        const {
          data: he,
          hasChildren: ve
        } = w, ye = ve ? O4(he, R) : he;
        if (U) {
          const k = U(this.rawPaginatedData);
          if (Array.isArray(k)) {
            const z = k.map((H, re) => ({
              isSummaryRow: !0,
              key: `__n_summary__${re}`,
              tmNode: {
                rawNode: H,
                disabled: !0
              },
              index: -1
            }));
            fe = this.summaryPlacement === "top" ? [...z, ...ye] : [...ye, ...z];
          } else {
            const z = {
              isSummaryRow: !0,
              key: "__n_summary__",
              tmNode: {
                rawNode: k,
                disabled: !0
              },
              index: -1
            };
            fe = this.summaryPlacement === "top" ? [z, ...ye] : [...ye, z];
          }
        } else
          fe = ye;
        const J = ve ? {
          width: ht(this.indent)
        } : void 0, ge = [];
        fe.forEach((k) => {
          G && R.has(k.key) && (!V || V(k.tmNode.rawNode)) ? ge.push(k, {
            isExpandedRow: !0,
            key: `${k.key}-expand`,
            // solve key repeat of the expanded row
            tmNode: k.tmNode,
            index: k.index
          }) : ge.push(k);
        });
        const {
          length: Ee
        } = ge, xe = {};
        he.forEach(({
          tmNode: k
        }, z) => {
          xe[z] = k.key;
        });
        const Te = O ? this.bodyWidth : null, Re = Te === null ? void 0 : `${Te}px`, Le = this.virtualScrollX ? "div" : "td";
        let Fe = 0, de = 0;
        Z && u.forEach((k) => {
          k.column.fixed === "left" ? Fe++ : k.column.fixed === "right" && de++;
        });
        const T = ({
          // Normal
          rowInfo: k,
          displayedRowIndex: z,
          isVirtual: H,
          // Virtual X
          isVirtualX: re,
          startColIndex: le,
          endColIndex: F,
          getLeft: K
        }) => {
          const {
            index: be
          } = k;
          if ("isExpandedRow" in k) {
            const {
              tmNode: {
                key: Y,
                rawNode: ae
              }
            } = k;
            return st("tr", {
              class: `${n}-data-table-tr ${n}-data-table-tr--expanded`,
              key: `${Y}__expand`
            }, st("td", {
              class: [`${n}-data-table-td`, `${n}-data-table-td--last-col`, z + 1 === Ee && `${n}-data-table-td--last-row`],
              colspan: te
            }, O ? st("div", {
              class: `${n}-data-table-expand`,
              style: {
                width: Re
              }
            }, G(ae, be)) : G(ae, be)));
          }
          const Pe = "isSummaryRow" in k, Ke = !Pe && k.striped, {
            tmNode: ct,
            key: qe
          } = k, {
            rawNode: Ge
          } = ct, vt = R.has(qe), Ne = B ? B(Ge, be) : void 0, we = typeof y == "string" ? y : O_(Ge, be, y), D = re ? u.filter((Y, ae) => !!(le <= ae && ae <= F || Y.column.fixed)) : u, x = re ? ht((X == null ? void 0 : X(Ge, be)) || j) : void 0, A = D.map((Y) => {
            var ae, me, pe, Ce, Ie;
            const Xe = Y.index;
            if (z in g) {
              const ft = g[z], yt = ft.indexOf(Xe);
              if (~yt)
                return ft.splice(yt, 1), null;
            }
            const {
              column: Me
            } = Y, ut = xn(Y), {
              rowSpan: lt,
              colSpan: $t
            } = Me, tt = Pe ? ((ae = k.tmNode.rawNode[ut]) === null || ae === void 0 ? void 0 : ae.colSpan) || 1 : $t ? $t(Ge, be) : 1, kt = Pe ? ((me = k.tmNode.rawNode[ut]) === null || me === void 0 ? void 0 : me.rowSpan) || 1 : lt ? lt(Ge, be) : 1, Xt = Xe + tt === te, Yt = z + kt === Ee, q = kt > 1;
            if (q && (m[z] = {
              [Xe]: []
            }), tt > 1 || q)
              for (let ft = z; ft < z + kt; ++ft) {
                q && m[z][Xe].push(xe[ft]);
                for (let yt = Xe; yt < Xe + tt; ++yt)
                  ft === z && yt === Xe || (ft in g ? g[ft].push(yt) : g[ft] = [yt]);
              }
            const se = q ? this.hoverKey : null, {
              cellProps: ke
            } = Me, Ae = ke == null ? void 0 : ke(Ge, be), Ze = {
              "--indent-offset": ""
            }, He = Me.fixed ? "td" : Le;
            return st(He, Object.assign({}, Ae, {
              key: ut,
              style: [{
                textAlign: Me.align || void 0,
                width: ht(Me.width)
              }, re && {
                height: x
              }, re && !Me.fixed ? {
                position: "absolute",
                left: ht(K(Xe)),
                top: 0,
                bottom: 0
              } : {
                left: ht((pe = b[ut]) === null || pe === void 0 ? void 0 : pe.start),
                right: ht((Ce = S[ut]) === null || Ce === void 0 ? void 0 : Ce.start)
              }, Ze, (Ae == null ? void 0 : Ae.style) || ""],
              colspan: tt,
              rowspan: H ? void 0 : kt,
              "data-col-key": ut,
              class: [`${n}-data-table-td`, Me.className, Ae == null ? void 0 : Ae.class, Pe && `${n}-data-table-td--summary`, se !== null && m[z][Xe].includes(se) && `${n}-data-table-td--hover`, _g(Me, E) && `${n}-data-table-td--sorting`, Me.fixed && `${n}-data-table-td--fixed-${Me.fixed}`, Me.align && `${n}-data-table-td--${Me.align}-align`, Me.type === "selection" && `${n}-data-table-td--selection`, Me.type === "expand" && `${n}-data-table-td--expand`, Xt && `${n}-data-table-td--last-col`, Yt && `${n}-data-table-td--last-row`]
            }), ve && Xe === _ ? [e0(Ze["--indent-offset"] = Pe ? 0 : k.tmNode.level, st("div", {
              class: `${n}-data-table-indent`,
              style: J
            })), Pe || k.tmNode.isLeaf ? st("div", {
              class: `${n}-data-table-expand-placeholder`
            }) : st(gh, {
              class: `${n}-data-table-expand-trigger`,
              clsPrefix: n,
              expanded: vt,
              rowData: Ge,
              renderExpandIcon: this.renderExpandIcon,
              loading: a.has(k.key),
              onClick: () => {
                ne(qe, k.tmNode);
              }
            })] : null, Me.type === "selection" ? Pe ? null : Me.multiple === !1 ? st(o5, {
              key: C,
              rowKey: qe,
              disabled: k.tmNode.disabled,
              onUpdateChecked: () => {
                oe(k.tmNode);
              }
            }) : st(D_, {
              key: C,
              rowKey: qe,
              disabled: k.tmNode.disabled,
              onUpdateChecked: (ft, yt) => {
                Q(k.tmNode, ft, yt.shiftKey);
              }
            }) : Me.type === "expand" ? Pe ? null : !Me.expandable || !((Ie = Me.expandable) === null || Ie === void 0) && Ie.call(Me, Ge) ? st(gh, {
              clsPrefix: n,
              rowData: Ge,
              expanded: vt,
              renderExpandIcon: this.renderExpandIcon,
              onClick: () => {
                ne(qe, null);
              }
            }) : null : st(m5, {
              clsPrefix: n,
              index: be,
              row: Ge,
              column: Me,
              isSummary: Pe,
              mergedTheme: $,
              renderCell: this.renderCell
            }));
          });
          return re && Fe && de && A.splice(Fe, 0, st("td", {
            colspan: u.length - Fe - de,
            style: {
              pointerEvents: "none",
              visibility: "hidden",
              height: 0
            }
          })), st("tr", Object.assign({}, Ne, {
            onMouseenter: (Y) => {
              var ae;
              this.hoverKey = qe, (ae = Ne == null ? void 0 : Ne.onMouseenter) === null || ae === void 0 || ae.call(Ne, Y);
            },
            key: qe,
            class: [`${n}-data-table-tr`, Pe && `${n}-data-table-tr--summary`, Ke && `${n}-data-table-tr--striped`, vt && `${n}-data-table-tr--expanded`, we, Ne == null ? void 0 : Ne.class],
            style: [Ne == null ? void 0 : Ne.style, re && {
              height: x
            }]
          }), A);
        };
        return o ? st(Kd, {
          ref: "virtualListRef",
          items: ge,
          itemSize: this.minRowHeight,
          visibleItemsTag: M4,
          visibleItemsProps: {
            clsPrefix: n,
            id: W,
            cols: u,
            onMouseleave: M
          },
          showScrollbar: !1,
          onResize: this.handleVirtualListResize,
          onScroll: this.handleVirtualListScroll,
          itemsStyle: v,
          itemResizable: !Z,
          columns: u,
          renderItemWithCols: Z ? ({
            itemIndex: k,
            item: z,
            startColIndex: H,
            endColIndex: re,
            getLeft: le
          }) => T({
            displayedRowIndex: k,
            isVirtual: !0,
            isVirtualX: !0,
            rowInfo: z,
            startColIndex: H,
            endColIndex: re,
            getLeft: le
          }) : void 0
        }, {
          default: ({
            item: k,
            index: z,
            renderedItemWithCols: H
          }) => H || T({
            rowInfo: k,
            displayedRowIndex: z,
            isVirtual: !0,
            isVirtualX: !1,
            startColIndex: 0,
            endColIndex: 0,
            getLeft(re) {
              return 0;
            }
          })
        }) : st("table", {
          class: `${n}-data-table-table`,
          onMouseleave: M,
          style: {
            tableLayout: this.mergedTableLayout
          }
        }, st("colgroup", null, u.map((k) => st("col", {
          key: k.key,
          style: k.style
        }))), this.showHeader ? st(Hg, {
          discrete: !1
        }) : null, this.empty ? null : st("tbody", {
          "data-n-id": W,
          class: `${n}-data-table-tbody`
        }, ge.map((k, z) => T({
          rowInfo: k,
          displayedRowIndex: z,
          isVirtual: !1,
          isVirtualX: !1,
          startColIndex: -1,
          endColIndex: -1,
          getLeft(H) {
            return -1;
          }
        }))));
      }
    });
    if (this.empty) {
      const g = () => st("div", {
        class: [`${n}-data-table-empty`, this.loading && `${n}-data-table-empty--hide`],
        style: this.bodyStyle,
        ref: "emptyElRef"
      }, Rn(this.dataTableSlots.empty, () => [st(lg, {
        theme: this.mergedTheme.peers.Empty,
        themeOverrides: this.mergedTheme.peerOverrides.Empty
      })]));
      return this.shouldDisplaySomeTablePart ? st(E4, null, f, g()) : st(Hn, {
        onResize: this.onResize
      }, {
        default: g
      });
    }
    return f;
  }
}), V4 = window.Vue.computed, A4 = window.Vue.defineComponent, $s = window.Vue.h, B4 = window.Vue.inject, Ra = window.Vue.ref, L4 = window.Vue.watchEffect, D4 = A4({
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
    } = B4(Tn), d = Ra(null), c = Ra(null), h = Ra(null), p = Ra(!(n.value.length || t.value.length)), v = V4(() => ({
      maxHeight: Et(r.value),
      minHeight: Et(i.value)
    }));
    function f(w) {
      o.value = w.contentRect.width, s(), p.value || (p.value = !0);
    }
    function g() {
      var w;
      const {
        value: $
      } = d;
      return $ ? a.value ? ((w = $.virtualListRef) === null || w === void 0 ? void 0 : w.listElRef) || null : $.$el : null;
    }
    function m() {
      const {
        value: w
      } = c;
      return w ? w.getScrollContainer() : null;
    }
    const u = {
      getBodyElement: m,
      getHeaderElement: g,
      scrollTo(w, $) {
        var b;
        (b = c.value) === null || b === void 0 || b.scrollTo(w, $);
      }
    };
    return L4(() => {
      const {
        value: w
      } = h;
      if (!w) return;
      const $ = `${e.value}-data-table-base-table--transition-disabled`;
      p.value ? setTimeout(() => {
        w.classList.remove($);
      }, 0) : w.classList.add($);
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
    return $s("div", {
      class: `${e}-data-table-base-table`,
      ref: "selfElRef"
    }, o ? null : $s(Hg, {
      ref: "headerInstRef"
    }), $s(I4, {
      ref: "bodyInstRef",
      bodyStyle: this.bodyStyle,
      showHeader: o,
      flexHeight: n,
      onResize: this.handleBodyResize
    }));
  }
}), Th = H4(), N4 = I([P("data-table", `
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
 `, [P("data-table-wrapper", `
 flex-grow: 1;
 display: flex;
 flex-direction: column;
 `), N("flex-height", [I(">", [P("data-table-wrapper", [I(">", [P("data-table-base-table", `
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 `, [I(">", [P("data-table-base-table-body", "flex-basis: 0;", [
  // last-child means there is no empty icon
  // body is a scrollbar, we need to override height 100%
  I("&:last-child", "flex-grow: 1;")
])])])])])])]), I(">", [P("data-table-loading-wrapper", `
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
 `, [vl({
  originalTransform: "translateX(-50%) translateY(-50%)"
})])]), P("data-table-expand-placeholder", `
 margin-right: 8px;
 display: inline-block;
 width: 16px;
 height: 1px;
 `), P("data-table-indent", `
 display: inline-block;
 height: 1px;
 `), P("data-table-expand-trigger", `
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
 `, [N("expanded", [P("icon", "transform: rotate(90deg);", [hn({
  originalTransform: "rotate(90deg)"
})]), P("base-icon", "transform: rotate(90deg);", [hn({
  originalTransform: "rotate(90deg)"
})])]), P("base-loading", `
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [hn()]), P("icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [hn()]), P("base-icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [hn()])]), P("data-table-thead", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-merged-th-color);
 `), P("data-table-tr", `
 position: relative;
 box-sizing: border-box;
 background-clip: padding-box;
 transition: background-color .3s var(--n-bezier);
 `, [P("data-table-expand", `
 position: sticky;
 left: 0;
 overflow: hidden;
 margin: calc(var(--n-th-padding) * -1);
 padding: var(--n-th-padding);
 box-sizing: border-box;
 `), N("striped", "background-color: var(--n-merged-td-color-striped);", [P("data-table-td", "background-color: var(--n-merged-td-color-striped);")]), rt("summary", [I("&:hover", "background-color: var(--n-merged-td-color-hover);", [I(">", [P("data-table-td", "background-color: var(--n-merged-td-color-hover);")])])])]), P("data-table-th", `
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
 `, [N("filterable", `
 padding-right: 36px;
 `, [N("sortable", `
 padding-right: calc(var(--n-th-padding) + 36px);
 `)]), Th, N("selection", `
 padding: 0;
 text-align: center;
 line-height: 0;
 z-index: 3;
 `), L("title-wrapper", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 max-width: 100%;
 `, [L("title", `
 flex: 1;
 min-width: 0;
 `)]), L("ellipsis", `
 display: inline-block;
 vertical-align: bottom;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 `), N("hover", `
 background-color: var(--n-merged-th-color-hover);
 `), N("sorting", `
 background-color: var(--n-merged-th-color-sorting);
 `), N("sortable", `
 cursor: pointer;
 `, [L("ellipsis", `
 max-width: calc(100% - 18px);
 `), I("&:hover", `
 background-color: var(--n-merged-th-color-hover);
 `)]), P("data-table-sorter", `
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
 `, [P("base-icon", "transition: transform .3s var(--n-bezier)"), N("desc", [P("base-icon", `
 transform: rotate(0deg);
 `)]), N("asc", [P("base-icon", `
 transform: rotate(-180deg);
 `)]), N("asc, desc", `
 color: var(--n-th-icon-color-active);
 `)]), P("data-table-resize-button", `
 width: var(--n-resizable-container-size);
 position: absolute;
 top: 0;
 right: calc(var(--n-resizable-container-size) / 2);
 bottom: 0;
 cursor: col-resize;
 user-select: none;
 `, [I("&::after", `
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
 `), N("active", [I("&::after", ` 
 background-color: var(--n-th-icon-color-active);
 `)]), I("&:hover::after", `
 background-color: var(--n-th-icon-color-active);
 `)]), P("data-table-filter", `
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
 `, [I("&:hover", `
 background-color: var(--n-th-button-color-hover);
 `), N("show", `
 background-color: var(--n-th-button-color-hover);
 `), N("active", `
 background-color: var(--n-th-button-color-hover);
 color: var(--n-th-icon-color-active);
 `)])]), P("data-table-td", `
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
 `, [N("expand", [P("data-table-expand-trigger", `
 margin-right: 0;
 `)]), N("last-row", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [
  // make sure there is no overlap between bottom border and
  // fixed column box shadow
  I("&::after", `
 bottom: 0 !important;
 `),
  I("&::before", `
 bottom: 0 !important;
 `)
]), N("summary", `
 background-color: var(--n-merged-th-color);
 `), N("hover", `
 background-color: var(--n-merged-td-color-hover);
 `), N("sorting", `
 background-color: var(--n-merged-td-color-sorting);
 `), L("ellipsis", `
 display: inline-block;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 vertical-align: bottom;
 max-width: calc(100% - var(--indent-offset, -1.5) * 16px - 24px);
 `), N("selection, expand", `
 text-align: center;
 padding: 0;
 line-height: 0;
 `), Th]), P("data-table-empty", `
 box-sizing: border-box;
 padding: var(--n-empty-padding);
 flex-grow: 1;
 flex-shrink: 0;
 opacity: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: opacity .3s var(--n-bezier);
 `, [N("hide", `
 opacity: 0;
 `)]), L("pagination", `
 margin: var(--n-pagination-margin);
 display: flex;
 justify-content: flex-end;
 `), P("data-table-wrapper", `
 position: relative;
 opacity: 1;
 transition: opacity .3s var(--n-bezier), border-color .3s var(--n-bezier);
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 line-height: var(--n-line-height);
 `), N("loading", [P("data-table-wrapper", `
 opacity: var(--n-opacity-loading);
 pointer-events: none;
 `)]), N("single-column", [P("data-table-td", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [I("&::after, &::before", `
 bottom: 0 !important;
 `)])]), rt("single-line", [P("data-table-th", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [N("last", `
 border-right: 0 solid var(--n-merged-border-color);
 `)]), P("data-table-td", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [N("last-col", `
 border-right: 0 solid var(--n-merged-border-color);
 `)])]), N("bordered", [P("data-table-wrapper", `
 border: 1px solid var(--n-merged-border-color);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 overflow: hidden;
 `)]), P("data-table-base-table", [N("transition-disabled", [P("data-table-th", [I("&::after, &::before", "transition: none;")]), P("data-table-td", [I("&::after, &::before", "transition: none;")])])]), N("bottom-bordered", [P("data-table-td", [N("last-row", `
 border-bottom: 1px solid var(--n-merged-border-color);
 `)])]), P("data-table-table", `
 font-variant-numeric: tabular-nums;
 width: 100%;
 word-break: break-word;
 transition: background-color .3s var(--n-bezier);
 border-collapse: separate;
 border-spacing: 0;
 background-color: var(--n-merged-td-color);
 `), P("data-table-base-table-header", `
 border-top-left-radius: calc(var(--n-border-radius) - 1px);
 border-top-right-radius: calc(var(--n-border-radius) - 1px);
 z-index: 3;
 overflow: scroll;
 flex-shrink: 0;
 transition: border-color .3s var(--n-bezier);
 scrollbar-width: none;
 `, [I("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 display: none;
 width: 0;
 height: 0;
 `)]), P("data-table-check-extra", `
 transition: color .3s var(--n-bezier);
 color: var(--n-th-icon-color);
 position: absolute;
 font-size: 14px;
 right: -4px;
 top: 50%;
 transform: translateY(-50%);
 z-index: 1;
 `)]), P("data-table-filter-menu", [P("scrollbar", `
 max-height: 240px;
 `), L("group", `
 display: flex;
 flex-direction: column;
 padding: 12px 12px 0 12px;
 `, [P("checkbox", `
 margin-bottom: 12px;
 margin-right: 0;
 `), P("radio", `
 margin-bottom: 12px;
 margin-right: 0;
 `)]), L("action", `
 padding: var(--n-action-padding);
 display: flex;
 flex-wrap: nowrap;
 justify-content: space-evenly;
 border-top: 1px solid var(--n-action-divider-color);
 `, [P("button", [I("&:not(:last-child)", `
 margin: var(--n-action-button-margin);
 `), I("&:last-child", `
 margin-right: 0;
 `)])]), P("divider", `
 margin: 0 !important;
 `)]), Vd(P("data-table", `
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 --n-merged-th-color-hover: var(--n-th-color-hover-modal);
 --n-merged-td-color-hover: var(--n-td-color-hover-modal);
 --n-merged-th-color-sorting: var(--n-th-color-hover-modal);
 --n-merged-td-color-sorting: var(--n-td-color-hover-modal);
 --n-merged-td-color-striped: var(--n-td-color-striped-modal);
 `)), Ad(P("data-table", `
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 --n-merged-th-color-hover: var(--n-th-color-hover-popover);
 --n-merged-td-color-hover: var(--n-td-color-hover-popover);
 --n-merged-th-color-sorting: var(--n-th-color-hover-popover);
 --n-merged-td-color-sorting: var(--n-td-color-hover-popover);
 --n-merged-td-color-striped: var(--n-td-color-striped-popover);
 `))]);
function H4() {
  return [N("fixed-left", `
 left: 0;
 position: sticky;
 z-index: 2;
 `, [I("&::after", `
 pointer-events: none;
 content: "";
 width: 36px;
 display: inline-block;
 position: absolute;
 top: 0;
 bottom: -1px;
 transition: box-shadow .2s var(--n-bezier);
 right: -36px;
 `)]), N("fixed-right", `
 right: 0;
 position: sticky;
 z-index: 1;
 `, [I("&::before", `
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
const Mn = window.Vue.computed, j4 = window.Vue.ref;
function W4(e, t) {
  const {
    paginatedDataRef: n,
    treeMateRef: o,
    selectionColumnRef: r
  } = t, i = j4(e.defaultCheckedRowKeys), l = Mn(() => {
    var S;
    const {
      checkedRowKeys: C
    } = e, y = C === void 0 ? i.value : C;
    return ((S = r.value) === null || S === void 0 ? void 0 : S.multiple) === !1 ? {
      checkedKeys: y.slice(0, 1),
      indeterminateKeys: []
    } : o.value.getCheckedKeys(y, {
      cascade: e.cascade,
      allowNotLoaded: e.allowCheckingNotLoaded
    });
  }), a = Mn(() => l.value.checkedKeys), s = Mn(() => l.value.indeterminateKeys), d = Mn(() => new Set(a.value)), c = Mn(() => new Set(s.value)), h = Mn(() => {
    const {
      value: S
    } = d;
    return n.value.reduce((C, y) => {
      const {
        key: E,
        disabled: R
      } = y;
      return C + (!R && S.has(E) ? 1 : 0);
    }, 0);
  }), p = Mn(() => n.value.filter((S) => S.disabled).length), v = Mn(() => {
    const {
      length: S
    } = n.value, {
      value: C
    } = c;
    return h.value > 0 && h.value < S - p.value || n.value.some((y) => C.has(y.key));
  }), f = Mn(() => {
    const {
      length: S
    } = n.value;
    return h.value !== 0 && h.value === S - p.value;
  }), g = Mn(() => n.value.length === 0);
  function m(S, C, y) {
    const {
      "onUpdate:checkedRowKeys": E,
      onUpdateCheckedRowKeys: R,
      onCheckedRowKeysChange: O
    } = e, W = [], {
      value: {
        getNode: _
      }
    } = o;
    S.forEach((V) => {
      var B;
      const M = (B = _(V)) === null || B === void 0 ? void 0 : B.rawNode;
      W.push(M);
    }), E && ue(E, S, W, {
      row: C,
      action: y
    }), R && ue(R, S, W, {
      row: C,
      action: y
    }), O && ue(O, S, W, {
      row: C,
      action: y
    }), i.value = S;
  }
  function u(S, C = !1, y) {
    if (!e.loading) {
      if (C) {
        m(Array.isArray(S) ? S.slice(0, 1) : [S], y, "check");
        return;
      }
      m(o.value.check(S, a.value, {
        cascade: e.cascade,
        allowNotLoaded: e.allowCheckingNotLoaded
      }).checkedKeys, y, "check");
    }
  }
  function w(S, C) {
    e.loading || m(o.value.uncheck(S, a.value, {
      cascade: e.cascade,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, C, "uncheck");
  }
  function $(S = !1) {
    const {
      value: C
    } = r;
    if (!C || e.loading) return;
    const y = [];
    (S ? o.value.treeNodes : n.value).forEach((E) => {
      E.disabled || y.push(E.key);
    }), m(o.value.check(y, a.value, {
      cascade: !0,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, void 0, "checkAll");
  }
  function b(S = !1) {
    const {
      value: C
    } = r;
    if (!C || e.loading) return;
    const y = [];
    (S ? o.value.treeNodes : n.value).forEach((E) => {
      E.disabled || y.push(E.key);
    }), m(o.value.uncheck(y, a.value, {
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
    headerCheckboxDisabledRef: g,
    doUpdateCheckedRowKeys: m,
    doCheckAll: $,
    doUncheckAll: b,
    doCheck: u,
    doUncheck: w
  };
}
const U4 = window.Vue.ref, _h = window.Vue.toRef;
function K4(e, t) {
  const n = Be(() => {
    for (const d of e.columns)
      if (d.type === "expand")
        return d.renderExpand;
  }), o = Be(() => {
    let d;
    for (const c of e.columns)
      if (c.type === "expand") {
        d = c.expandable;
        break;
      }
    return d;
  }), r = U4(e.defaultExpandAll ? n != null && n.value ? (() => {
    const d = [];
    return t.value.treeNodes.forEach((c) => {
      var h;
      !((h = o.value) === null || h === void 0) && h.call(o, c.rawNode) && d.push(c.key);
    }), d;
  })() : t.value.getNonLeafKeys() : e.defaultExpandedRowKeys), i = _h(e, "expandedRowKeys"), l = _h(e, "stickyExpandedRows"), a = Ot(i, r);
  function s(d) {
    const {
      onUpdateExpandedRowKeys: c,
      "onUpdate:expandedRowKeys": h
    } = e;
    c && ue(c, d), h && ue(h, d), r.value = d;
  }
  return {
    stickyExpandedRowsRef: l,
    mergedExpandedRowKeysRef: a,
    renderExpandRef: n,
    expandableRef: o,
    doUpdateExpandedRowKeys: s
  };
}
const ei = window.Vue.computed;
function q4(e, t) {
  const n = [], o = [], r = [], i = /* @__PURE__ */ new WeakMap();
  let l = -1, a = 0, s = !1, d = 0;
  function c(p, v) {
    v > l && (n[v] = [], l = v), p.forEach((f) => {
      if ("children" in f)
        c(f.children, v + 1);
      else {
        const g = "key" in f ? f.key : void 0;
        o.push({
          key: xn(f),
          style: F_(f, g !== void 0 ? Et(t(g)) : void 0),
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
    p.forEach((g) => {
      var m;
      if ("children" in g) {
        const u = d, w = {
          column: g,
          colIndex: d,
          colSpan: 0,
          rowSpan: 1,
          isLast: !1
        };
        h(g.children, v + 1), g.children.forEach(($) => {
          var b, S;
          w.colSpan += (S = (b = i.get($)) === null || b === void 0 ? void 0 : b.colSpan) !== null && S !== void 0 ? S : 0;
        }), u + w.colSpan === a && (w.isLast = !0), i.set(g, w), n[v].push(w);
      } else {
        if (d < f) {
          d += 1;
          return;
        }
        let u = 1;
        "titleColSpan" in g && (u = (m = g.titleColSpan) !== null && m !== void 0 ? m : 1), u > 1 && (f = d + u);
        const w = d + u === a, $ = {
          column: g,
          colSpan: u,
          colIndex: d,
          rowSpan: l - v + 1,
          isLast: w
        };
        i.set(g, $), n[v].push($), d += 1;
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
function G4(e, t) {
  const n = ei(() => q4(e.columns, t));
  return {
    rowsRef: ei(() => n.value.rows),
    colsRef: ei(() => n.value.cols),
    hasEllipsisRef: ei(() => n.value.hasEllipsis),
    dataRelatedColsRef: ei(() => n.value.dataRelatedCols)
  };
}
const X4 = window.Vue.ref;
function Y4() {
  const e = X4({});
  function t(r) {
    return e.value[r];
  }
  function n(r, i) {
    Tg(r) && "key" in r && (e.value[r.key] = i);
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
const ti = window.Vue.computed, ni = window.Vue.ref, Z4 = window.Vue.watch;
function J4(e, {
  mainTableInstRef: t,
  mergedCurrentPageRef: n,
  bodyWidthRef: o
}) {
  let r = 0;
  const i = ni(), l = ni(null), a = ni([]), s = ni(null), d = ni([]), c = ti(() => Et(e.scrollX)), h = ti(() => e.columns.filter((R) => R.fixed === "left")), p = ti(() => e.columns.filter((R) => R.fixed === "right")), v = ti(() => {
    const R = {};
    let O = 0;
    function W(_) {
      _.forEach((V) => {
        const B = {
          start: O,
          end: 0
        };
        R[xn(V)] = B, "children" in V ? (W(V.children), B.end = O) : (O += ah(V) || 0, B.end = O);
      });
    }
    return W(h.value), R;
  }), f = ti(() => {
    const R = {};
    let O = 0;
    function W(_) {
      for (let V = _.length - 1; V >= 0; --V) {
        const B = _[V], M = {
          start: O,
          end: 0
        };
        R[xn(B)] = M, "children" in B ? (W(B.children), M.end = O) : (O += ah(B) || 0, M.end = O);
      }
    }
    return W(p.value), R;
  });
  function g() {
    var R, O;
    const {
      value: W
    } = h;
    let _ = 0;
    const {
      value: V
    } = v;
    let B = null;
    for (let M = 0; M < W.length; ++M) {
      const G = xn(W[M]);
      if (r > (((R = V[G]) === null || R === void 0 ? void 0 : R.start) || 0) - _)
        B = G, _ = ((O = V[G]) === null || O === void 0 ? void 0 : O.end) || 0;
      else
        break;
    }
    l.value = B;
  }
  function m() {
    a.value = [];
    let R = e.columns.find((O) => xn(O) === l.value);
    for (; R && "children" in R; ) {
      const O = R.children.length;
      if (O === 0) break;
      const W = R.children[O - 1];
      a.value.push(xn(W)), R = W;
    }
  }
  function u() {
    var R, O;
    const {
      value: W
    } = p, _ = Number(e.scrollX), {
      value: V
    } = o;
    if (V === null) return;
    let B = 0, M = null;
    const {
      value: G
    } = f;
    for (let U = W.length - 1; U >= 0; --U) {
      const Q = xn(W[U]);
      if (Math.round(r + (((R = G[Q]) === null || R === void 0 ? void 0 : R.start) || 0) + V - B) < _)
        M = Q, B = ((O = G[Q]) === null || O === void 0 ? void 0 : O.end) || 0;
      else
        break;
    }
    s.value = M;
  }
  function w() {
    d.value = [];
    let R = e.columns.find((O) => xn(O) === s.value);
    for (; R && "children" in R && R.children.length; ) {
      const O = R.children[0];
      d.value.push(xn(O)), R = O;
    }
  }
  function $() {
    const R = t.value ? t.value.getHeaderElement() : null, O = t.value ? t.value.getBodyElement() : null;
    return {
      header: R,
      body: O
    };
  }
  function b() {
    const {
      body: R
    } = $();
    R && (R.scrollTop = 0);
  }
  function S() {
    i.value !== "body" ? xi(y) : i.value = void 0;
  }
  function C(R) {
    var O;
    (O = e.onScroll) === null || O === void 0 || O.call(e, R), i.value !== "head" ? xi(y) : i.value = void 0;
  }
  function y() {
    const {
      header: R,
      body: O
    } = $();
    if (!O) return;
    const {
      value: W
    } = o;
    if (W !== null) {
      if (e.maxHeight || e.flexHeight) {
        if (!R) return;
        const _ = r - R.scrollLeft;
        i.value = _ !== 0 ? "head" : "body", i.value === "head" ? (r = R.scrollLeft, O.scrollLeft = r) : (r = O.scrollLeft, R.scrollLeft = r);
      } else
        r = O.scrollLeft;
      g(), m(), u(), w();
    }
  }
  function E(R) {
    const {
      header: O
    } = $();
    O && (O.scrollLeft = R, y());
  }
  return Z4(n, () => {
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
    handleTableBodyScroll: C,
    handleTableHeaderScroll: S,
    setHeaderScrollLeft: E
  };
}
const Eh = window.Vue.computed, Q4 = window.Vue.ref;
function ka(e) {
  return typeof e == "object" && typeof e.multiple == "number" ? e.multiple : !1;
}
function eE(e, t) {
  return t && (e === void 0 || e === "default" || typeof e == "object" && e.compare === "default") ? tE(t) : typeof e == "function" ? e : e && typeof e == "object" && e.compare && e.compare !== "default" ? e.compare : !1;
}
function tE(e) {
  return (t, n) => {
    const o = t[e], r = n[e];
    return o == null ? r == null ? 0 : -1 : r == null ? 1 : typeof o == "number" && typeof r == "number" ? o - r : typeof o == "string" && typeof r == "string" ? o.localeCompare(r) : 0;
  };
}
function nE(e, {
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
  const r = Q4(o), i = Eh(() => {
    const v = t.value.filter((m) => m.type !== "selection" && m.sorter !== void 0 && (m.sortOrder === "ascend" || m.sortOrder === "descend" || m.sortOrder === !1)), f = v.filter((m) => m.sortOrder !== !1);
    if (f.length)
      return f.map((m) => ({
        columnKey: m.key,
        // column to sort has controlled sorter
        // sorter && sort order won't be undefined
        order: m.sortOrder,
        sorter: m.sorter
      }));
    if (v.length) return [];
    const {
      value: g
    } = r;
    return Array.isArray(g) ? g : g ? [g] : [];
  }), l = Eh(() => {
    const v = i.value.slice().sort((f, g) => {
      const m = ka(f.sorter) || 0;
      return (ka(g.sorter) || 0) - m;
    });
    return v.length ? n.value.slice().sort((g, m) => {
      let u = 0;
      return v.some((w) => {
        const {
          columnKey: $,
          sorter: b,
          order: S
        } = w, C = eE(b, $);
        return C && S && (u = C(g.rawNode, m.rawNode), u !== 0) ? (u = u * E_(S), !0) : !1;
      }), u;
    }) : n.value;
  });
  function a(v) {
    let f = i.value.slice();
    return v && ka(v.sorter) !== !1 ? (f = f.filter((g) => ka(g.sorter) !== !1), p(f, v), f) : v || null;
  }
  function s(v) {
    const f = a(v);
    d(f);
  }
  function d(v) {
    const {
      "onUpdate:sorter": f,
      onUpdateSorter: g,
      onSorterChange: m
    } = e;
    f && ue(f, v), g && ue(g, v), m && ue(m, v), r.value = v;
  }
  function c(v, f = "ascend") {
    if (!v)
      h();
    else {
      const g = t.value.find((u) => u.type !== "selection" && u.type !== "expand" && u.key === v);
      if (!(g != null && g.sorter)) return;
      const m = g.sorter;
      s({
        columnKey: v,
        sorter: m,
        order: f
      });
    }
  }
  function h() {
    d(null);
  }
  function p(v, f) {
    const g = v.findIndex((m) => (f == null ? void 0 : f.columnKey) && m.columnKey === f.columnKey);
    g !== void 0 && g >= 0 ? v[g] = f : v.push(f);
  }
  return {
    clearSorter: h,
    sort: c,
    sortedDataRef: l,
    mergedSortStateRef: i,
    deriveNextSorter: s
  };
}
const yn = window.Vue.computed, Pa = window.Vue.ref;
function oE(e, {
  dataRelatedColsRef: t
}) {
  const n = yn(() => {
    const X = (j) => {
      for (let Z = 0; Z < j.length; ++Z) {
        const te = j[Z];
        if ("children" in te)
          return X(te.children);
        if (te.type === "selection")
          return te;
      }
      return null;
    };
    return X(e.columns);
  }), o = yn(() => {
    const {
      childrenKey: X
    } = e;
    return pl(e.data, {
      ignoreEmptyChildren: !0,
      getKey: e.rowKey,
      getChildren: (j) => j[X],
      getDisabled: (j) => {
        var Z, te;
        return !!(!((te = (Z = n.value) === null || Z === void 0 ? void 0 : Z.disabled) === null || te === void 0) && te.call(Z, j));
      }
    });
  }), r = Be(() => {
    const {
      columns: X
    } = e, {
      length: j
    } = X;
    let Z = null;
    for (let te = 0; te < j; ++te) {
      const fe = X[te];
      if (!fe.type && Z === null && (Z = te), "tree" in fe && fe.tree)
        return te;
    }
    return Z || 0;
  }), i = Pa({}), {
    pagination: l
  } = e, a = Pa(l && l.defaultPage || 1), s = Pa(Cg(l)), d = yn(() => {
    const X = t.value.filter((te) => te.filterOptionValues !== void 0 || te.filterOptionValue !== void 0), j = {};
    return X.forEach((te) => {
      var fe;
      te.type === "selection" || te.type === "expand" || (te.filterOptionValues === void 0 ? j[te.key] = (fe = te.filterOptionValue) !== null && fe !== void 0 ? fe : null : j[te.key] = te.filterOptionValues);
    }), Object.assign(lh(i.value), j);
  }), c = yn(() => {
    const X = d.value, {
      columns: j
    } = e;
    function Z(he) {
      return (ve, ye) => !!~String(ye[he]).indexOf(String(ve));
    }
    const {
      value: {
        treeNodes: te
      }
    } = o, fe = [];
    return j.forEach((he) => {
      he.type === "selection" || he.type === "expand" || "children" in he || fe.push([he.key, he]);
    }), te ? te.filter((he) => {
      const {
        rawNode: ve
      } = he;
      for (const [ye, J] of fe) {
        let ge = X[ye];
        if (ge == null || (Array.isArray(ge) || (ge = [ge]), !ge.length)) continue;
        const Ee = J.filter === "default" ? Z(ye) : J.filter;
        if (J && typeof Ee == "function")
          if (J.filterMode === "and") {
            if (ge.some((xe) => !Ee(xe, ve)))
              return !1;
          } else {
            if (ge.some((xe) => Ee(xe, ve)))
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
    clearSorter: g
  } = nE(e, {
    dataRelatedColsRef: t,
    filteredDataRef: c
  });
  t.value.forEach((X) => {
    var j;
    if (X.filter) {
      const Z = X.defaultFilterOptionValues;
      X.filterMultiple ? i.value[X.key] = Z || [] : Z !== void 0 ? i.value[X.key] = Z === null ? [] : Z : i.value[X.key] = (j = X.defaultFilterOptionValue) !== null && j !== void 0 ? j : null;
    }
  });
  const m = yn(() => {
    const {
      pagination: X
    } = e;
    if (X !== !1)
      return X.page;
  }), u = yn(() => {
    const {
      pagination: X
    } = e;
    if (X !== !1)
      return X.pageSize;
  }), w = Ot(m, a), $ = Ot(u, s), b = Be(() => {
    const X = w.value;
    return e.remote ? X : Math.max(1, Math.min(Math.ceil(c.value.length / $.value), X));
  }), S = yn(() => {
    const {
      pagination: X
    } = e;
    if (X) {
      const {
        pageCount: j
      } = X;
      if (j !== void 0) return j;
    }
  }), C = yn(() => {
    if (e.remote) return o.value.treeNodes;
    if (!e.pagination) return h.value;
    const X = $.value, j = (b.value - 1) * X;
    return h.value.slice(j, j + X);
  }), y = yn(() => C.value.map((X) => X.rawNode));
  function E(X) {
    const {
      pagination: j
    } = e;
    if (j) {
      const {
        onChange: Z,
        "onUpdate:page": te,
        onUpdatePage: fe
      } = j;
      Z && ue(Z, X), fe && ue(fe, X), te && ue(te, X), _(X);
    }
  }
  function R(X) {
    const {
      pagination: j
    } = e;
    if (j) {
      const {
        onPageSizeChange: Z,
        "onUpdate:pageSize": te,
        onUpdatePageSize: fe
      } = j;
      Z && ue(Z, X), fe && ue(fe, X), te && ue(te, X), V(X);
    }
  }
  const O = yn(() => {
    if (e.remote) {
      const {
        pagination: X
      } = e;
      if (X) {
        const {
          itemCount: j
        } = X;
        if (j !== void 0) return j;
      }
      return;
    }
    return c.value.length;
  }), W = yn(() => Object.assign(Object.assign({}, e.pagination), {
    // reset deprecated methods
    onChange: void 0,
    onUpdatePage: void 0,
    onUpdatePageSize: void 0,
    onPageSizeChange: void 0,
    "onUpdate:page": E,
    "onUpdate:pageSize": R,
    // writing merged props after pagination to avoid
    // pagination[key] === undefined
    // key still exists but value is undefined
    page: b.value,
    pageSize: $.value,
    pageCount: O.value === void 0 ? S.value : void 0,
    itemCount: O.value
  }));
  function _(X) {
    const {
      "onUpdate:page": j,
      onPageChange: Z,
      onUpdatePage: te
    } = e;
    te && ue(te, X), j && ue(j, X), Z && ue(Z, X), a.value = X;
  }
  function V(X) {
    const {
      "onUpdate:pageSize": j,
      onPageSizeChange: Z,
      onUpdatePageSize: te
    } = e;
    Z && ue(Z, X), te && ue(te, X), j && ue(j, X), s.value = X;
  }
  function B(X, j) {
    const {
      onUpdateFilters: Z,
      "onUpdate:filters": te,
      onFiltersChange: fe
    } = e;
    Z && ue(Z, X, j), te && ue(te, X, j), fe && ue(fe, X, j), i.value = X;
  }
  function M(X, j, Z, te) {
    var fe;
    (fe = e.onUnstableColumnResize) === null || fe === void 0 || fe.call(e, X, j, Z, te);
  }
  function G(X) {
    _(X);
  }
  function U() {
    Q();
  }
  function Q() {
    oe({});
  }
  function oe(X) {
    ne(X);
  }
  function ne(X) {
    X ? X && (i.value = lh(X)) : i.value = {};
  }
  return {
    treeMateRef: o,
    mergedCurrentPageRef: b,
    mergedPaginationRef: W,
    paginatedDataRef: C,
    rawPaginatedDataRef: y,
    mergedFilterStateRef: d,
    mergedSortStateRef: v,
    hoverKeyRef: Pa(null),
    selectionColumnRef: n,
    childTriggerColIndexRef: r,
    doUpdateFilters: B,
    deriveNextSorter: p,
    doUpdatePageSize: V,
    doUpdatePage: _,
    onUnstableColumnResize: M,
    // exported methods
    filter: ne,
    filters: oe,
    clearFilter: U,
    clearFilters: Q,
    clearSorter: g,
    page: G,
    sort: f
  };
}
const wo = window.Vue.computed, rE = window.Vue.defineComponent, yo = window.Vue.h, iE = window.Vue.provide, Rs = window.Vue.ref, xt = window.Vue.toRef, aE = window.Vue.Transition;
window.Vue.watchEffect;
const zh = rE({
  name: "DataTable",
  alias: ["AdvancedTable"],
  props: T_,
  slots: Object,
  setup(e, {
    slots: t
  }) {
    const {
      mergedBorderedRef: n,
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = je(e), l = Lt("DataTable", i, o), a = wo(() => {
      const {
        bottomBordered: x
      } = e;
      return n.value ? !1 : x !== void 0 ? x : !0;
    }), s = _e("DataTable", "-data-table", N4, P_, e, o), d = Rs(null), c = Rs(null), {
      getResizableWidth: h,
      clearResizableWidth: p,
      doUpdateResizableWidth: v
    } = Y4(), {
      rowsRef: f,
      colsRef: g,
      dataRelatedColsRef: m,
      hasEllipsisRef: u
    } = G4(e, h), {
      treeMateRef: w,
      mergedCurrentPageRef: $,
      paginatedDataRef: b,
      rawPaginatedDataRef: S,
      selectionColumnRef: C,
      hoverKeyRef: y,
      mergedPaginationRef: E,
      mergedFilterStateRef: R,
      mergedSortStateRef: O,
      childTriggerColIndexRef: W,
      doUpdatePage: _,
      doUpdateFilters: V,
      onUnstableColumnResize: B,
      deriveNextSorter: M,
      filter: G,
      filters: U,
      clearFilter: Q,
      clearFilters: oe,
      clearSorter: ne,
      page: X,
      sort: j
    } = oE(e, {
      dataRelatedColsRef: m
    }), Z = (x) => {
      const {
        fileName: A = "data.csv",
        keepOriginalData: ee = !1
      } = x || {}, Y = ee ? e.data : S.value, ae = V_(e.columns, Y, e.getCsvCell, e.getCsvHeader), me = new Blob([ae], {
        type: "text/csv;charset=utf-8"
      }), pe = URL.createObjectURL(me);
      Yx(pe, A.endsWith(".csv") ? A : `${A}.csv`), URL.revokeObjectURL(pe);
    }, {
      doCheckAll: te,
      doUncheckAll: fe,
      doCheck: he,
      doUncheck: ve,
      headerCheckboxDisabledRef: ye,
      someRowsCheckedRef: J,
      allRowsCheckedRef: ge,
      mergedCheckedRowKeySetRef: Ee,
      mergedInderminateRowKeySetRef: xe
    } = W4(e, {
      selectionColumnRef: C,
      treeMateRef: w,
      paginatedDataRef: b
    }), {
      stickyExpandedRowsRef: Te,
      mergedExpandedRowKeysRef: Re,
      renderExpandRef: Le,
      expandableRef: Fe,
      doUpdateExpandedRowKeys: de
    } = K4(e, w), {
      handleTableBodyScroll: T,
      handleTableHeaderScroll: k,
      syncScrollState: z,
      setHeaderScrollLeft: H,
      leftActiveFixedColKeyRef: re,
      leftActiveFixedChildrenColKeysRef: le,
      rightActiveFixedColKeyRef: F,
      rightActiveFixedChildrenColKeysRef: K,
      leftFixedColumnsRef: be,
      rightFixedColumnsRef: Pe,
      fixedColumnLeftMapRef: Ke,
      fixedColumnRightMapRef: ct
    } = J4(e, {
      bodyWidthRef: d,
      mainTableInstRef: c,
      mergedCurrentPageRef: $
    }), {
      localeRef: qe
    } = Tr("DataTable"), Ge = wo(() => e.virtualScroll || e.flexHeight || e.maxHeight !== void 0 || u.value ? "fixed" : e.tableLayout);
    iE(Tn, {
      props: e,
      treeMateRef: w,
      renderExpandIconRef: xt(e, "renderExpandIcon"),
      loadingKeySetRef: Rs(/* @__PURE__ */ new Set()),
      slots: t,
      indentRef: xt(e, "indent"),
      childTriggerColIndexRef: W,
      bodyWidthRef: d,
      componentId: Si(),
      hoverKeyRef: y,
      mergedClsPrefixRef: o,
      mergedThemeRef: s,
      scrollXRef: wo(() => e.scrollX),
      rowsRef: f,
      colsRef: g,
      paginatedDataRef: b,
      leftActiveFixedColKeyRef: re,
      leftActiveFixedChildrenColKeysRef: le,
      rightActiveFixedColKeyRef: F,
      rightActiveFixedChildrenColKeysRef: K,
      leftFixedColumnsRef: be,
      rightFixedColumnsRef: Pe,
      fixedColumnLeftMapRef: Ke,
      fixedColumnRightMapRef: ct,
      mergedCurrentPageRef: $,
      someRowsCheckedRef: J,
      allRowsCheckedRef: ge,
      mergedSortStateRef: O,
      mergedFilterStateRef: R,
      loadingRef: xt(e, "loading"),
      rowClassNameRef: xt(e, "rowClassName"),
      mergedCheckedRowKeySetRef: Ee,
      mergedExpandedRowKeysRef: Re,
      mergedInderminateRowKeySetRef: xe,
      localeRef: qe,
      expandableRef: Fe,
      stickyExpandedRowsRef: Te,
      rowKeyRef: xt(e, "rowKey"),
      renderExpandRef: Le,
      summaryRef: xt(e, "summary"),
      virtualScrollRef: xt(e, "virtualScroll"),
      virtualScrollXRef: xt(e, "virtualScrollX"),
      heightForRowRef: xt(e, "heightForRow"),
      minRowHeightRef: xt(e, "minRowHeight"),
      virtualScrollHeaderRef: xt(e, "virtualScrollHeader"),
      headerHeightRef: xt(e, "headerHeight"),
      rowPropsRef: xt(e, "rowProps"),
      stripedRef: xt(e, "striped"),
      checkOptionsRef: wo(() => {
        const {
          value: x
        } = C;
        return x == null ? void 0 : x.options;
      }),
      rawPaginatedDataRef: S,
      filterMenuCssVarsRef: wo(() => {
        const {
          self: {
            actionDividerColor: x,
            actionPadding: A,
            actionButtonMargin: ee
          }
        } = s.value;
        return {
          "--n-action-padding": A,
          "--n-action-button-margin": ee,
          "--n-action-divider-color": x
        };
      }),
      onLoadRef: xt(e, "onLoad"),
      mergedTableLayoutRef: Ge,
      maxHeightRef: xt(e, "maxHeight"),
      minHeightRef: xt(e, "minHeight"),
      flexHeightRef: xt(e, "flexHeight"),
      headerCheckboxDisabledRef: ye,
      paginationBehaviorOnFilterRef: xt(e, "paginationBehaviorOnFilter"),
      summaryPlacementRef: xt(e, "summaryPlacement"),
      filterIconPopoverPropsRef: xt(e, "filterIconPopoverProps"),
      scrollbarPropsRef: xt(e, "scrollbarProps"),
      syncScrollState: z,
      doUpdatePage: _,
      doUpdateFilters: V,
      getResizableWidth: h,
      onUnstableColumnResize: B,
      clearResizableWidth: p,
      doUpdateResizableWidth: v,
      deriveNextSorter: M,
      doCheck: he,
      doUncheck: ve,
      doCheckAll: te,
      doUncheckAll: fe,
      doUpdateExpandedRowKeys: de,
      handleTableHeaderScroll: k,
      handleTableBodyScroll: T,
      setHeaderScrollLeft: H,
      renderCell: xt(e, "renderCell")
    });
    const vt = {
      filter: G,
      filters: U,
      clearFilters: oe,
      clearSorter: ne,
      page: X,
      sort: j,
      clearFilter: Q,
      downloadCsv: Z,
      scrollTo: (x, A) => {
        var ee;
        (ee = c.value) === null || ee === void 0 || ee.scrollTo(x, A);
      }
    }, Ne = wo(() => {
      const {
        size: x
      } = e, {
        common: {
          cubicBezierEaseInOut: A
        },
        self: {
          borderColor: ee,
          tdColorHover: Y,
          tdColorSorting: ae,
          tdColorSortingModal: me,
          tdColorSortingPopover: pe,
          thColorSorting: Ce,
          thColorSortingModal: Ie,
          thColorSortingPopover: Xe,
          thColor: Me,
          thColorHover: ut,
          tdColor: lt,
          tdTextColor: $t,
          thTextColor: tt,
          thFontWeight: kt,
          thButtonColorHover: Xt,
          thIconColor: Yt,
          thIconColorActive: q,
          filterSize: se,
          borderRadius: ke,
          lineHeight: Ae,
          tdColorModal: Ze,
          thColorModal: He,
          borderColorModal: ft,
          thColorHoverModal: yt,
          tdColorHoverModal: on,
          borderColorPopover: qn,
          thColorPopover: Gn,
          tdColorPopover: Oo,
          tdColorHoverPopover: Mr,
          thColorHoverPopover: Ir,
          paginationMargin: Vr,
          emptyPadding: Ar,
          boxShadowAfter: Br,
          boxShadowBefore: uo,
          sorterSize: fo,
          resizableContainerSize: ml,
          resizableSize: bl,
          loadingColor: wl,
          loadingSize: yl,
          opacityLoading: xl,
          tdColorStriped: Cl,
          tdColorStripedModal: Sl,
          tdColorStripedPopover: $l,
          [ie("fontSize", x)]: Rl,
          [ie("thPadding", x)]: kl,
          [ie("tdPadding", x)]: Pl
        }
      } = s.value;
      return {
        "--n-font-size": Rl,
        "--n-th-padding": kl,
        "--n-td-padding": Pl,
        "--n-bezier": A,
        "--n-border-radius": ke,
        "--n-line-height": Ae,
        "--n-border-color": ee,
        "--n-border-color-modal": ft,
        "--n-border-color-popover": qn,
        "--n-th-color": Me,
        "--n-th-color-hover": ut,
        "--n-th-color-modal": He,
        "--n-th-color-hover-modal": yt,
        "--n-th-color-popover": Gn,
        "--n-th-color-hover-popover": Ir,
        "--n-td-color": lt,
        "--n-td-color-hover": Y,
        "--n-td-color-modal": Ze,
        "--n-td-color-hover-modal": on,
        "--n-td-color-popover": Oo,
        "--n-td-color-hover-popover": Mr,
        "--n-th-text-color": tt,
        "--n-td-text-color": $t,
        "--n-th-font-weight": kt,
        "--n-th-button-color-hover": Xt,
        "--n-th-icon-color": Yt,
        "--n-th-icon-color-active": q,
        "--n-filter-size": se,
        "--n-pagination-margin": Vr,
        "--n-empty-padding": Ar,
        "--n-box-shadow-before": uo,
        "--n-box-shadow-after": Br,
        "--n-sorter-size": fo,
        "--n-resizable-container-size": ml,
        "--n-resizable-size": bl,
        "--n-loading-size": yl,
        "--n-loading-color": wl,
        "--n-opacity-loading": xl,
        "--n-td-color-striped": Cl,
        "--n-td-color-striped-modal": Sl,
        "--n-td-color-striped-popover": $l,
        "--n-td-color-sorting": ae,
        "--n-td-color-sorting-modal": me,
        "--n-td-color-sorting-popover": pe,
        "--n-th-color-sorting": Ce,
        "--n-th-color-sorting-modal": Ie,
        "--n-th-color-sorting-popover": Xe
      };
    }), we = r ? St("data-table", wo(() => e.size[0]), Ne, e) : void 0, D = wo(() => {
      if (!e.pagination) return !1;
      if (e.paginateSinglePage) return !0;
      const x = E.value, {
        pageCount: A
      } = x;
      return A !== void 0 ? A > 1 : x.itemCount && x.pageSize && x.itemCount > x.pageSize;
    });
    return Object.assign({
      mainTableInstRef: c,
      mergedClsPrefix: o,
      rtlEnabled: l,
      mergedTheme: s,
      paginatedData: b,
      mergedBordered: n,
      mergedBottomBordered: a,
      mergedPagination: E,
      mergedShowPagination: D,
      cssVars: r ? void 0 : Ne,
      themeClass: we == null ? void 0 : we.themeClass,
      onRender: we == null ? void 0 : we.onRender
    }, vt);
  },
  render() {
    const {
      mergedClsPrefix: e,
      themeClass: t,
      onRender: n,
      $slots: o,
      spinProps: r
    } = this;
    return n == null || n(), yo("div", {
      class: [`${e}-data-table`, this.rtlEnabled && `${e}-data-table--rtl`, t, {
        [`${e}-data-table--bordered`]: this.mergedBordered,
        [`${e}-data-table--bottom-bordered`]: this.mergedBottomBordered,
        [`${e}-data-table--single-line`]: this.singleLine,
        [`${e}-data-table--single-column`]: this.singleColumn,
        [`${e}-data-table--loading`]: this.loading,
        [`${e}-data-table--flex-height`]: this.flexHeight
      }],
      style: this.cssVars
    }, yo("div", {
      class: `${e}-data-table-wrapper`
    }, yo(D4, {
      ref: "mainTableInstRef"
    })), this.mergedShowPagination ? yo("div", {
      class: `${e}-data-table__pagination`
    }, yo(b_, Object.assign({
      theme: this.mergedTheme.peers.Pagination,
      themeOverrides: this.mergedTheme.peerOverrides.Pagination,
      disabled: this.loading
    }, this.mergedPagination))) : null, yo(aE, {
      name: "fade-in-scale-up-transition"
    }, {
      default: () => this.loading ? yo("div", {
        class: `${e}-data-table-loading-wrapper`
      }, Rn(o.loading, () => [yo(zr, Object.assign({
        clsPrefix: e,
        strokeWidth: 20
      }, r))])) : null
    }));
  }
});
function lE(e) {
  const {
    modalColor: t,
    textColor1: n,
    textColor2: o,
    boxShadow3: r,
    lineHeight: i,
    fontWeightStrong: l,
    dividerColor: a,
    closeColorHover: s,
    closeColorPressed: d,
    closeIconColor: c,
    closeIconColorHover: h,
    closeIconColorPressed: p,
    borderRadius: v,
    primaryColorHover: f
  } = e;
  return {
    bodyPadding: "16px 24px",
    borderRadius: v,
    headerPadding: "16px 24px",
    footerPadding: "16px 24px",
    color: t,
    textColor: o,
    titleTextColor: n,
    titleFontSize: "18px",
    titleFontWeight: l,
    boxShadow: r,
    lineHeight: i,
    headerBorderBottom: `1px solid ${a}`,
    footerBorderTop: `1px solid ${a}`,
    closeIconColor: c,
    closeIconColorHover: h,
    closeIconColorPressed: p,
    closeSize: "22px",
    closeIconSize: "18px",
    closeColorHover: s,
    closeColorPressed: d,
    closeBorderRadius: v,
    resizableTriggerColorHover: f
  };
}
const sE = {
  name: "Drawer",
  common: wt,
  peers: {
    Scrollbar: Fr
  },
  self: lE
}, Ta = window.Vue.computed, dE = window.Vue.defineComponent, Lo = window.Vue.h, cE = window.Vue.inject, uE = window.Vue.mergeProps, fE = window.Vue.onBeforeUnmount, ks = window.Vue.provide, _a = window.Vue.ref, hE = window.Vue.Transition, Fh = window.Vue.vShow, pE = window.Vue.watch, vE = window.Vue.watchEffect, Oh = window.Vue.withDirectives, gE = dE({
  name: "NDrawerContent",
  inheritAttrs: !1,
  props: {
    blockScroll: Boolean,
    show: {
      type: Boolean,
      default: void 0
    },
    displayDirective: {
      type: String,
      required: !0
    },
    placement: {
      type: String,
      required: !0
    },
    contentClass: String,
    contentStyle: [Object, String],
    nativeScrollbar: {
      type: Boolean,
      required: !0
    },
    scrollbarProps: Object,
    trapFocus: {
      type: Boolean,
      default: !0
    },
    autoFocus: {
      type: Boolean,
      default: !0
    },
    showMask: {
      type: [Boolean, String],
      required: !0
    },
    maxWidth: Number,
    maxHeight: Number,
    minWidth: Number,
    minHeight: Number,
    resizable: Boolean,
    onClickoutside: Function,
    onAfterLeave: Function,
    onAfterEnter: Function,
    onEsc: Function
  },
  setup(e) {
    const t = _a(!!e.show), n = _a(null), o = cE(Ld);
    let r = 0, i = "", l = null;
    const a = _a(!1), s = _a(!1), d = Ta(() => e.placement === "top" || e.placement === "bottom"), {
      mergedClsPrefixRef: c,
      mergedRtlRef: h
    } = je(e), p = Lt("Drawer", h, c), v = C, f = (R) => {
      s.value = !0, r = d.value ? R.clientY : R.clientX, i = document.body.style.cursor, document.body.style.cursor = d.value ? "ns-resize" : "ew-resize", document.body.addEventListener("mousemove", S), document.body.addEventListener("mouseleave", v), document.body.addEventListener("mouseup", C);
    }, g = () => {
      l !== null && (window.clearTimeout(l), l = null), s.value ? a.value = !0 : l = window.setTimeout(() => {
        a.value = !0;
      }, 300);
    }, m = () => {
      l !== null && (window.clearTimeout(l), l = null), a.value = !1;
    }, {
      doUpdateHeight: u,
      doUpdateWidth: w
    } = o, $ = (R) => {
      const {
        maxWidth: O
      } = e;
      if (O && R > O) return O;
      const {
        minWidth: W
      } = e;
      return W && R < W ? W : R;
    }, b = (R) => {
      const {
        maxHeight: O
      } = e;
      if (O && R > O) return O;
      const {
        minHeight: W
      } = e;
      return W && R < W ? W : R;
    };
    function S(R) {
      var O, W;
      if (s.value)
        if (d.value) {
          let _ = ((O = n.value) === null || O === void 0 ? void 0 : O.offsetHeight) || 0;
          const V = r - R.clientY;
          _ += e.placement === "bottom" ? V : -V, _ = b(_), u(_), r = R.clientY;
        } else {
          let _ = ((W = n.value) === null || W === void 0 ? void 0 : W.offsetWidth) || 0;
          const V = r - R.clientX;
          _ += e.placement === "right" ? V : -V, _ = $(_), w(_), r = R.clientX;
        }
    }
    function C() {
      s.value && (r = 0, s.value = !1, document.body.style.cursor = i, document.body.removeEventListener("mousemove", S), document.body.removeEventListener("mouseup", C), document.body.removeEventListener("mouseleave", v));
    }
    vE(() => {
      e.show && (t.value = !0);
    }), pE(() => e.show, (R) => {
      R || C();
    }), fE(() => {
      C();
    });
    const y = Ta(() => {
      const {
        show: R
      } = e, O = [[Fh, R]];
      return e.showMask || O.push([$i, e.onClickoutside, void 0, {
        capture: !0
      }]), O;
    });
    function E() {
      var R;
      t.value = !1, (R = e.onAfterLeave) === null || R === void 0 || R.call(e);
    }
    return ty(Ta(() => e.blockScroll && t.value)), ks(al, n), ks(Oi, null), ks(ll, null), {
      bodyRef: n,
      rtlEnabled: p,
      mergedClsPrefix: o.mergedClsPrefixRef,
      isMounted: o.isMountedRef,
      mergedTheme: o.mergedThemeRef,
      displayed: t,
      transitionName: Ta(() => ({
        right: "slide-in-from-right-transition",
        left: "slide-in-from-left-transition",
        top: "slide-in-from-top-transition",
        bottom: "slide-in-from-bottom-transition"
      })[e.placement]),
      handleAfterLeave: E,
      bodyDirectives: y,
      handleMousedownResizeTrigger: f,
      handleMouseenterResizeTrigger: g,
      handleMouseleaveResizeTrigger: m,
      isDragging: s,
      isHoverOnResizeTrigger: a
    };
  },
  render() {
    const {
      $slots: e,
      mergedClsPrefix: t
    } = this;
    return this.displayDirective === "show" || this.displayed || this.show ? Oh(
      /* Keep the wrapper dom. Make sure the drawer has a host.
      Nor the detached content will disappear without transition */
      Lo("div", {
        role: "none"
      }, Lo(gv, {
        disabled: !this.showMask || !this.trapFocus,
        active: this.show,
        autoFocus: this.autoFocus,
        onEsc: this.onEsc
      }, {
        default: () => Lo(hE, {
          name: this.transitionName,
          appear: this.isMounted,
          onAfterEnter: this.onAfterEnter,
          onAfterLeave: this.handleAfterLeave
        }, {
          default: () => Oh(Lo("div", uE(this.$attrs, {
            role: "dialog",
            ref: "bodyRef",
            "aria-modal": "true",
            class: [
              `${t}-drawer`,
              this.rtlEnabled && `${t}-drawer--rtl`,
              `${t}-drawer--${this.placement}-placement`,
              /**
               * When the mouse is pressed to resize the drawer,
               * disable text selection
               */
              this.isDragging && `${t}-drawer--unselectable`,
              this.nativeScrollbar && `${t}-drawer--native-scrollbar`
            ]
          }), [this.resizable ? Lo("div", {
            class: [`${t}-drawer__resize-trigger`, (this.isDragging || this.isHoverOnResizeTrigger) && `${t}-drawer__resize-trigger--hover`],
            onMouseenter: this.handleMouseenterResizeTrigger,
            onMouseleave: this.handleMouseleaveResizeTrigger,
            onMousedown: this.handleMousedownResizeTrigger
          }) : null, this.nativeScrollbar ? Lo("div", {
            class: [`${t}-drawer-content-wrapper`, this.contentClass],
            style: this.contentStyle,
            role: "none"
          }, e) : Lo(or, Object.assign({}, this.scrollbarProps, {
            contentStyle: this.contentStyle,
            contentClass: [`${t}-drawer-content-wrapper`, this.contentClass],
            theme: this.mergedTheme.peers.Scrollbar,
            themeOverrides: this.mergedTheme.peerOverrides.Scrollbar
          }), e)]), this.bodyDirectives)
        })
      })),
      [[Fh, this.displayDirective === "if" || this.displayed || this.show]]
    ) : null;
  }
}), {
  cubicBezierEaseIn: mE,
  cubicBezierEaseOut: bE
} = Pn;
function wE({
  duration: e = "0.3s",
  leaveDuration: t = "0.2s",
  name: n = "slide-in-from-bottom"
} = {}) {
  return [I(`&.${n}-transition-leave-active`, {
    transition: `transform ${t} ${mE}`
  }), I(`&.${n}-transition-enter-active`, {
    transition: `transform ${e} ${bE}`
  }), I(`&.${n}-transition-enter-to`, {
    transform: "translateY(0)"
  }), I(`&.${n}-transition-enter-from`, {
    transform: "translateY(100%)"
  }), I(`&.${n}-transition-leave-from`, {
    transform: "translateY(0)"
  }), I(`&.${n}-transition-leave-to`, {
    transform: "translateY(100%)"
  })];
}
const {
  cubicBezierEaseIn: yE,
  cubicBezierEaseOut: xE
} = Pn;
function CE({
  duration: e = "0.3s",
  leaveDuration: t = "0.2s",
  name: n = "slide-in-from-left"
} = {}) {
  return [I(`&.${n}-transition-leave-active`, {
    transition: `transform ${t} ${yE}`
  }), I(`&.${n}-transition-enter-active`, {
    transition: `transform ${e} ${xE}`
  }), I(`&.${n}-transition-enter-to`, {
    transform: "translateX(0)"
  }), I(`&.${n}-transition-enter-from`, {
    transform: "translateX(-100%)"
  }), I(`&.${n}-transition-leave-from`, {
    transform: "translateX(0)"
  }), I(`&.${n}-transition-leave-to`, {
    transform: "translateX(-100%)"
  })];
}
const {
  cubicBezierEaseIn: SE,
  cubicBezierEaseOut: $E
} = Pn;
function RE({
  duration: e = "0.3s",
  leaveDuration: t = "0.2s",
  name: n = "slide-in-from-right"
} = {}) {
  return [I(`&.${n}-transition-leave-active`, {
    transition: `transform ${t} ${SE}`
  }), I(`&.${n}-transition-enter-active`, {
    transition: `transform ${e} ${$E}`
  }), I(`&.${n}-transition-enter-to`, {
    transform: "translateX(0)"
  }), I(`&.${n}-transition-enter-from`, {
    transform: "translateX(100%)"
  }), I(`&.${n}-transition-leave-from`, {
    transform: "translateX(0)"
  }), I(`&.${n}-transition-leave-to`, {
    transform: "translateX(100%)"
  })];
}
const {
  cubicBezierEaseIn: kE,
  cubicBezierEaseOut: PE
} = Pn;
function TE({
  duration: e = "0.3s",
  leaveDuration: t = "0.2s",
  name: n = "slide-in-from-top"
} = {}) {
  return [I(`&.${n}-transition-leave-active`, {
    transition: `transform ${t} ${kE}`
  }), I(`&.${n}-transition-enter-active`, {
    transition: `transform ${e} ${PE}`
  }), I(`&.${n}-transition-enter-to`, {
    transform: "translateY(0)"
  }), I(`&.${n}-transition-enter-from`, {
    transform: "translateY(-100%)"
  }), I(`&.${n}-transition-leave-from`, {
    transform: "translateY(0)"
  }), I(`&.${n}-transition-leave-to`, {
    transform: "translateY(-100%)"
  })];
}
const _E = I([P("drawer", `
 word-break: break-word;
 line-height: var(--n-line-height);
 position: absolute;
 pointer-events: all;
 box-shadow: var(--n-box-shadow);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background-color: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 `, [RE(), CE(), TE(), wE(), N("unselectable", `
 user-select: none; 
 -webkit-user-select: none;
 `), N("native-scrollbar", [P("drawer-content-wrapper", `
 overflow: auto;
 height: 100%;
 `)]), L("resize-trigger", `
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `, [N("hover", `
 background-color: var(--n-resize-trigger-color-hover);
 `)]), P("drawer-content-wrapper", `
 box-sizing: border-box;
 `), P("drawer-content", `
 height: 100%;
 display: flex;
 flex-direction: column;
 `, [N("native-scrollbar", [P("drawer-body-content-wrapper", `
 height: 100%;
 overflow: auto;
 `)]), P("drawer-body", `
 flex: 1 0 0;
 overflow: hidden;
 `), P("drawer-body-content-wrapper", `
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `), P("drawer-header", `
 font-weight: var(--n-title-font-weight);
 line-height: 1;
 font-size: var(--n-title-font-size);
 color: var(--n-title-text-color);
 padding: var(--n-header-padding);
 transition: border .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-divider-color);
 border-bottom: var(--n-header-border-bottom);
 display: flex;
 justify-content: space-between;
 align-items: center;
 `, [L("main", `
 flex: 1;
 `), L("close", `
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), P("drawer-footer", `
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]), N("right-placement", `
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `, [L("resize-trigger", `
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]), N("left-placement", `
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `, [L("resize-trigger", `
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]), N("top-placement", `
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `, [L("resize-trigger", `
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]), N("bottom-placement", `
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `, [L("resize-trigger", `
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]), I("body", [I(">", [P("drawer-container", `
 position: fixed;
 `)])]), P("drawer-container", `
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `, [I("> *", `
 pointer-events: all;
 `)]), P("drawer-mask", `
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [N("invisible", `
 background-color: rgba(0, 0, 0, 0)
 `), ng({
  enterDuration: "0.2s",
  leaveDuration: "0.2s",
  enterCubicBezier: "var(--n-bezier-in)",
  leaveCubicBezier: "var(--n-bezier-out)"
})])]), Ea = window.Vue.computed, EE = window.Vue.defineComponent, oi = window.Vue.h, zE = window.Vue.provide, Mh = window.Vue.ref, Ih = window.Vue.toRef, FE = window.Vue.Transition;
window.Vue.watchEffect;
const OE = window.Vue.withDirectives, ME = Object.assign(Object.assign({}, _e.props), {
  show: Boolean,
  width: [Number, String],
  height: [Number, String],
  placement: {
    type: String,
    default: "right"
  },
  maskClosable: {
    type: Boolean,
    default: !0
  },
  showMask: {
    type: [Boolean, String],
    default: !0
  },
  to: [String, Object],
  displayDirective: {
    type: String,
    default: "if"
  },
  nativeScrollbar: {
    type: Boolean,
    default: !0
  },
  zIndex: Number,
  onMaskClick: Function,
  scrollbarProps: Object,
  contentClass: String,
  contentStyle: [Object, String],
  trapFocus: {
    type: Boolean,
    default: !0
  },
  onEsc: Function,
  autoFocus: {
    type: Boolean,
    default: !0
  },
  closeOnEsc: {
    type: Boolean,
    default: !0
  },
  blockScroll: {
    type: Boolean,
    default: !0
  },
  maxWidth: Number,
  maxHeight: Number,
  minWidth: Number,
  minHeight: Number,
  resizable: Boolean,
  defaultWidth: {
    type: [Number, String],
    default: 251
  },
  defaultHeight: {
    type: [Number, String],
    default: 251
  },
  onUpdateWidth: [Function, Array],
  onUpdateHeight: [Function, Array],
  "onUpdate:width": [Function, Array],
  "onUpdate:height": [Function, Array],
  "onUpdate:show": [Function, Array],
  onUpdateShow: [Function, Array],
  onAfterEnter: Function,
  onAfterLeave: Function,
  /** @deprecated */
  drawerStyle: [String, Object],
  drawerClass: String,
  target: null,
  onShow: Function,
  onHide: Function
}), IE = EE({
  name: "Drawer",
  inheritAttrs: !1,
  props: ME,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      namespaceRef: n,
      inlineThemeDisabled: o
    } = je(e), r = Fi(), i = _e("Drawer", "-drawer", _E, sE, e, t), l = Mh(e.defaultWidth), a = Mh(e.defaultHeight), s = Ot(Ih(e, "width"), l), d = Ot(Ih(e, "height"), a), c = Ea(() => {
      const {
        placement: C
      } = e;
      return C === "top" || C === "bottom" ? "" : Et(s.value);
    }), h = Ea(() => {
      const {
        placement: C
      } = e;
      return C === "left" || C === "right" ? "" : Et(d.value);
    }), p = (C) => {
      const {
        onUpdateWidth: y,
        "onUpdate:width": E
      } = e;
      y && ue(y, C), E && ue(E, C), l.value = C;
    }, v = (C) => {
      const {
        onUpdateHeight: y,
        "onUpdate:width": E
      } = e;
      y && ue(y, C), E && ue(E, C), a.value = C;
    }, f = Ea(() => [{
      width: c.value,
      height: h.value
    }, e.drawerStyle || ""]);
    function g(C) {
      const {
        onMaskClick: y,
        maskClosable: E
      } = e;
      E && $(!1), y && y(C);
    }
    function m(C) {
      g(C);
    }
    const u = Y0();
    function w(C) {
      var y;
      (y = e.onEsc) === null || y === void 0 || y.call(e), e.show && e.closeOnEsc && Qx(C) && (u.value || $(!1));
    }
    function $(C) {
      const {
        onHide: y,
        onUpdateShow: E,
        "onUpdate:show": R
      } = e;
      E && ue(E, C), R && ue(R, C), y && !C && ue(y, C);
    }
    zE(Ld, {
      isMountedRef: r,
      mergedThemeRef: i,
      mergedClsPrefixRef: t,
      doUpdateShow: $,
      doUpdateHeight: v,
      doUpdateWidth: p
    });
    const b = Ea(() => {
      const {
        common: {
          cubicBezierEaseInOut: C,
          cubicBezierEaseIn: y,
          cubicBezierEaseOut: E
        },
        self: {
          color: R,
          textColor: O,
          boxShadow: W,
          lineHeight: _,
          headerPadding: V,
          footerPadding: B,
          borderRadius: M,
          bodyPadding: G,
          titleFontSize: U,
          titleTextColor: Q,
          titleFontWeight: oe,
          headerBorderBottom: ne,
          footerBorderTop: X,
          closeIconColor: j,
          closeIconColorHover: Z,
          closeIconColorPressed: te,
          closeColorHover: fe,
          closeColorPressed: he,
          closeIconSize: ve,
          closeSize: ye,
          closeBorderRadius: J,
          resizableTriggerColorHover: ge
        }
      } = i.value;
      return {
        "--n-line-height": _,
        "--n-color": R,
        "--n-border-radius": M,
        "--n-text-color": O,
        "--n-box-shadow": W,
        "--n-bezier": C,
        "--n-bezier-out": E,
        "--n-bezier-in": y,
        "--n-header-padding": V,
        "--n-body-padding": G,
        "--n-footer-padding": B,
        "--n-title-text-color": Q,
        "--n-title-font-size": U,
        "--n-title-font-weight": oe,
        "--n-header-border-bottom": ne,
        "--n-footer-border-top": X,
        "--n-close-icon-color": j,
        "--n-close-icon-color-hover": Z,
        "--n-close-icon-color-pressed": te,
        "--n-close-size": ye,
        "--n-close-color-hover": fe,
        "--n-close-color-pressed": he,
        "--n-close-icon-size": ve,
        "--n-close-border-radius": J,
        "--n-resize-trigger-color-hover": ge
      };
    }), S = o ? St("drawer", void 0, b, e) : void 0;
    return {
      mergedClsPrefix: t,
      namespace: n,
      mergedBodyStyle: f,
      handleOutsideClick: m,
      handleMaskClick: g,
      handleEsc: w,
      mergedTheme: i,
      cssVars: o ? void 0 : b,
      themeClass: S == null ? void 0 : S.themeClass,
      onRender: S == null ? void 0 : S.onRender,
      isMounted: r
    };
  },
  render() {
    const {
      mergedClsPrefix: e
    } = this;
    return oi(rv, {
      to: this.to,
      show: this.show
    }, {
      default: () => {
        var t;
        return (t = this.onRender) === null || t === void 0 || t.call(this), OE(oi("div", {
          class: [`${e}-drawer-container`, this.namespace, this.themeClass],
          style: this.cssVars,
          role: "none"
        }, this.showMask ? oi(FE, {
          name: "fade-in-transition",
          appear: this.isMounted
        }, {
          default: () => this.show ? oi("div", {
            "aria-hidden": !0,
            class: [`${e}-drawer-mask`, this.showMask === "transparent" && `${e}-drawer-mask--invisible`],
            onClick: this.handleMaskClick
          }) : null
        }) : null, oi(gE, Object.assign({}, this.$attrs, {
          class: [this.drawerClass, this.$attrs.class],
          style: [this.mergedBodyStyle, this.$attrs.style],
          blockScroll: this.blockScroll,
          contentStyle: this.contentStyle,
          contentClass: this.contentClass,
          placement: this.placement,
          scrollbarProps: this.scrollbarProps,
          show: this.show,
          displayDirective: this.displayDirective,
          nativeScrollbar: this.nativeScrollbar,
          onAfterEnter: this.onAfterEnter,
          onAfterLeave: this.onAfterLeave,
          trapFocus: this.trapFocus,
          autoFocus: this.autoFocus,
          resizable: this.resizable,
          maxHeight: this.maxHeight,
          minHeight: this.minHeight,
          maxWidth: this.maxWidth,
          minWidth: this.minWidth,
          showMask: this.showMask,
          onEsc: this.handleEsc,
          onClickoutside: this.handleOutsideClick
        }), this.$slots)), [[jd, {
          zIndex: this.zIndex,
          enabled: this.show
        }]]);
      }
    });
  }
}), VE = window.Vue.defineComponent, xo = window.Vue.h, AE = window.Vue.inject, BE = {
  title: String,
  headerClass: String,
  headerStyle: [Object, String],
  footerClass: String,
  footerStyle: [Object, String],
  bodyClass: String,
  bodyStyle: [Object, String],
  bodyContentClass: String,
  bodyContentStyle: [Object, String],
  nativeScrollbar: {
    type: Boolean,
    default: !0
  },
  scrollbarProps: Object,
  closable: Boolean
}, LE = VE({
  name: "DrawerContent",
  props: BE,
  slots: Object,
  setup() {
    const e = AE(Ld, null);
    e || qd("drawer-content", "`n-drawer-content` must be placed inside `n-drawer`.");
    const {
      doUpdateShow: t
    } = e;
    function n() {
      t(!1);
    }
    return {
      handleCloseClick: n,
      mergedTheme: e.mergedThemeRef,
      mergedClsPrefix: e.mergedClsPrefixRef
    };
  },
  render() {
    const {
      title: e,
      mergedClsPrefix: t,
      nativeScrollbar: n,
      mergedTheme: o,
      bodyClass: r,
      bodyStyle: i,
      bodyContentClass: l,
      bodyContentStyle: a,
      headerClass: s,
      headerStyle: d,
      footerClass: c,
      footerStyle: h,
      scrollbarProps: p,
      closable: v,
      $slots: f
    } = this;
    return xo("div", {
      role: "none",
      class: [`${t}-drawer-content`, n && `${t}-drawer-content--native-scrollbar`]
    }, f.header || e || v ? xo("div", {
      class: [`${t}-drawer-header`, s],
      style: d,
      role: "none"
    }, xo("div", {
      class: `${t}-drawer-header__main`,
      role: "heading",
      "aria-level": "1"
    }, f.header !== void 0 ? f.header() : e), v && xo(hl, {
      onClick: this.handleCloseClick,
      clsPrefix: t,
      class: `${t}-drawer-header__close`,
      absolute: !0
    })) : null, n ? xo("div", {
      class: [`${t}-drawer-body`, r],
      style: i,
      role: "none"
    }, xo("div", {
      class: [`${t}-drawer-body-content-wrapper`, l],
      style: a,
      role: "none"
    }, f)) : xo(or, Object.assign({
      themeOverrides: o.peerOverrides.Scrollbar,
      theme: o.peers.Scrollbar
    }, p, {
      class: `${t}-drawer-body`,
      contentClass: [`${t}-drawer-body-content-wrapper`, l],
      contentStyle: a
    }), f), f.footer ? xo("div", {
      class: [`${t}-drawer-footer`, c],
      style: h,
      role: "none"
    }, f.footer()) : null);
  }
}), DE = {
  gapSmall: "4px 8px",
  gapMedium: "8px 12px",
  gapLarge: "12px 16px"
};
function NE() {
  return DE;
}
const HE = {
  self: NE
};
let Ps;
function jE() {
  if (!Jo) return !0;
  if (Ps === void 0) {
    const e = document.createElement("div");
    e.style.display = "flex", e.style.flexDirection = "column", e.style.rowGap = "1px", e.appendChild(document.createElement("div")), e.appendChild(document.createElement("div")), document.body.appendChild(e);
    const t = e.scrollHeight === 1;
    return document.body.removeChild(e), Ps = t;
  }
  return Ps;
}
const WE = window.Vue.Comment, UE = window.Vue.computed, KE = window.Vue.defineComponent, Vh = window.Vue.h, qE = Object.assign(Object.assign({}, _e.props), {
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
}), ri = KE({
  name: "Space",
  props: qE,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedRtlRef: n
    } = je(e), o = _e("Space", "-space", void 0, HE, e, t), r = Lt("Space", n, t);
    return {
      useGap: jE(),
      rtlEnabled: r,
      mergedClsPrefix: t,
      margin: UE(() => {
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
            [ie("gap", i)]: l
          }
        } = o.value, {
          row: a,
          col: s
        } = Nw(l);
        return {
          horizontal: zt(s),
          vertical: zt(a)
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
    } = this, f = io(Gd(this), !1);
    if (!f.length) return null;
    const g = `${a.horizontal}px`, m = `${a.horizontal / 2}px`, u = `${a.vertical}px`, w = `${a.vertical / 2}px`, $ = f.length - 1, b = r.startsWith("space-");
    return Vh("div", {
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
    }, !p && (h || v) ? f : f.map((S, C) => S.type === WE ? S : Vh("div", {
      role: "none",
      class: i,
      style: [l, {
        maxWidth: "100%"
      }, h ? "" : e ? {
        marginBottom: C !== $ ? u : ""
      } : c ? {
        marginLeft: b ? r === "space-between" && C === $ ? "" : m : C !== $ ? g : "",
        marginRight: b ? r === "space-between" && C === 0 ? "" : m : "",
        paddingTop: w,
        paddingBottom: w
      } : {
        marginRight: b ? r === "space-between" && C === $ ? "" : m : C !== $ ? g : "",
        marginLeft: b ? r === "space-between" && C === 0 ? "" : m : "",
        paddingTop: w,
        paddingBottom: w
      }]
    }, S)));
  }
}), GE = {
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
function XE(e) {
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
  return Object.assign(Object.assign({}, GE), {
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
const Wg = {
  common: wt,
  self: XE
};
function YE(e) {
  const {
    textColorDisabled: t
  } = e;
  return {
    iconColorDisabled: t
  };
}
const ZE = {
  name: "InputNumber",
  common: wt,
  peers: {
    Button: uc,
    Input: cc
  },
  self: YE
}, JE = {
  titleFontSizeSmall: "26px",
  titleFontSizeMedium: "32px",
  titleFontSizeLarge: "40px",
  titleFontSizeHuge: "48px",
  fontSizeSmall: "14px",
  fontSizeMedium: "14px",
  fontSizeLarge: "15px",
  fontSizeHuge: "16px",
  iconSizeSmall: "64px",
  iconSizeMedium: "80px",
  iconSizeLarge: "100px",
  iconSizeHuge: "125px",
  iconColor418: void 0,
  iconColor404: void 0,
  iconColor403: void 0,
  iconColor500: void 0
};
function QE(e) {
  const {
    textColor2: t,
    textColor1: n,
    errorColor: o,
    successColor: r,
    infoColor: i,
    warningColor: l,
    lineHeight: a,
    fontWeightStrong: s
  } = e;
  return Object.assign(Object.assign({}, JE), {
    lineHeight: a,
    titleFontWeight: s,
    titleTextColor: n,
    textColor: t,
    iconColorError: o,
    iconColorSuccess: r,
    iconColorInfo: i,
    iconColorWarning: l
  });
}
const ez = {
  common: wt,
  self: QE
}, tz = {
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
function nz(e) {
  const {
    primaryColor: t,
    opacityDisabled: n,
    borderRadius: o,
    textColor3: r
  } = e;
  return Object.assign(Object.assign({}, tz), {
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
    boxShadowFocus: `0 0 0 2px ${Ve(t, {
      alpha: 0.2
    })}`
  });
}
const oz = {
  common: wt,
  self: nz
}, rz = {
  tabFontSizeSmall: "14px",
  tabFontSizeMedium: "14px",
  tabFontSizeLarge: "16px",
  tabGapSmallLine: "36px",
  tabGapMediumLine: "36px",
  tabGapLargeLine: "36px",
  tabGapSmallLineVertical: "8px",
  tabGapMediumLineVertical: "8px",
  tabGapLargeLineVertical: "8px",
  tabPaddingSmallLine: "6px 0",
  tabPaddingMediumLine: "10px 0",
  tabPaddingLargeLine: "14px 0",
  tabPaddingVerticalSmallLine: "6px 12px",
  tabPaddingVerticalMediumLine: "8px 16px",
  tabPaddingVerticalLargeLine: "10px 20px",
  tabGapSmallBar: "36px",
  tabGapMediumBar: "36px",
  tabGapLargeBar: "36px",
  tabGapSmallBarVertical: "8px",
  tabGapMediumBarVertical: "8px",
  tabGapLargeBarVertical: "8px",
  tabPaddingSmallBar: "4px 0",
  tabPaddingMediumBar: "6px 0",
  tabPaddingLargeBar: "10px 0",
  tabPaddingVerticalSmallBar: "6px 12px",
  tabPaddingVerticalMediumBar: "8px 16px",
  tabPaddingVerticalLargeBar: "10px 20px",
  tabGapSmallCard: "4px",
  tabGapMediumCard: "4px",
  tabGapLargeCard: "4px",
  tabGapSmallCardVertical: "4px",
  tabGapMediumCardVertical: "4px",
  tabGapLargeCardVertical: "4px",
  tabPaddingSmallCard: "8px 16px",
  tabPaddingMediumCard: "10px 20px",
  tabPaddingLargeCard: "12px 24px",
  tabPaddingSmallSegment: "4px 0",
  tabPaddingMediumSegment: "6px 0",
  tabPaddingLargeSegment: "8px 0",
  tabPaddingVerticalLargeSegment: "0 8px",
  tabPaddingVerticalSmallCard: "8px 12px",
  tabPaddingVerticalMediumCard: "10px 16px",
  tabPaddingVerticalLargeCard: "12px 20px",
  tabPaddingVerticalSmallSegment: "0 4px",
  tabPaddingVerticalMediumSegment: "0 6px",
  tabGapSmallSegment: "0",
  tabGapMediumSegment: "0",
  tabGapLargeSegment: "0",
  tabGapSmallSegmentVertical: "0",
  tabGapMediumSegmentVertical: "0",
  tabGapLargeSegmentVertical: "0",
  panePaddingSmall: "8px 0 0 0",
  panePaddingMedium: "12px 0 0 0",
  panePaddingLarge: "16px 0 0 0",
  closeSize: "18px",
  closeIconSize: "14px"
};
function iz(e) {
  const {
    textColor2: t,
    primaryColor: n,
    textColorDisabled: o,
    closeIconColor: r,
    closeIconColorHover: i,
    closeIconColorPressed: l,
    closeColorHover: a,
    closeColorPressed: s,
    tabColor: d,
    baseColor: c,
    dividerColor: h,
    fontWeight: p,
    textColor1: v,
    borderRadius: f,
    fontSize: g,
    fontWeightStrong: m
  } = e;
  return Object.assign(Object.assign({}, rz), {
    colorSegment: d,
    tabFontSizeCard: g,
    tabTextColorLine: v,
    tabTextColorActiveLine: n,
    tabTextColorHoverLine: n,
    tabTextColorDisabledLine: o,
    tabTextColorSegment: v,
    tabTextColorActiveSegment: t,
    tabTextColorHoverSegment: t,
    tabTextColorDisabledSegment: o,
    tabTextColorBar: v,
    tabTextColorActiveBar: n,
    tabTextColorHoverBar: n,
    tabTextColorDisabledBar: o,
    tabTextColorCard: v,
    tabTextColorHoverCard: v,
    tabTextColorActiveCard: n,
    tabTextColorDisabledCard: o,
    barColor: n,
    closeIconColor: r,
    closeIconColorHover: i,
    closeIconColorPressed: l,
    closeColorHover: a,
    closeColorPressed: s,
    closeBorderRadius: f,
    tabColor: d,
    tabColorSegment: c,
    tabBorderColor: h,
    tabFontWeightActive: p,
    tabFontWeight: p,
    tabBorderRadius: f,
    paneTextColor: t,
    fontWeightStrong: m
  });
}
const az = {
  common: wt,
  self: iz
}, Vi = "n-form", Ug = "n-form-item-insts", lz = P("form", [N("inline", `
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `, [P("form-item", {
  width: "auto",
  marginRight: "18px"
}, [I("&:last-child", {
  marginRight: 0
})])])]);
var sz = function(e, t, n, o) {
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
const dz = window.Vue.defineComponent, cz = window.Vue.h, Ah = window.Vue.provide, uz = window.Vue.ref, fz = Object.assign(Object.assign({}, _e.props), {
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
}), Bh = dz({
  name: "Form",
  props: fz,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = je(e);
    _e("Form", "-form", lz, Wg, e, t);
    const n = {}, o = uz(void 0), r = (s) => {
      const d = o.value;
      (d === void 0 || s >= d) && (o.value = s);
    };
    function i(s) {
      return sz(this, arguments, void 0, function* (d, c = () => !0) {
        return yield new Promise((h, p) => {
          const v = [];
          for (const f of Pi(n)) {
            const g = n[f];
            for (const m of g)
              m.path && v.push(m.internalValidate(null, c));
          }
          Promise.all(v).then((f) => {
            const g = f.some((w) => !w.valid), m = [], u = [];
            f.forEach((w) => {
              var $, b;
              !(($ = w.errors) === null || $ === void 0) && $.length && m.push(w.errors), !((b = w.warnings) === null || b === void 0) && b.length && u.push(w.warnings);
            }), d && d(m.length ? m : void 0, {
              warnings: u.length ? u : void 0
            }), g ? p(m.length ? m : void 0) : h({
              warnings: u.length ? u : void 0
            });
          });
        });
      });
    }
    function l() {
      for (const s of Pi(n)) {
        const d = n[s];
        for (const c of d)
          c.restoreValidation();
      }
    }
    return Ah(Vi, {
      props: e,
      maxChildLabelWidthRef: o,
      deriveMaxChildLabelWidth: r
    }), Ah(Ug, {
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
    return cz("form", {
      class: [`${e}-form`, this.inline && `${e}-form--inline`],
      onSubmit: this.onSubmit
    }, this.$slots);
  }
});
function Ko() {
  return Ko = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n)
        Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
  }, Ko.apply(this, arguments);
}
function hz(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, zi(e, t);
}
function xd(e) {
  return xd = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, xd(e);
}
function zi(e, t) {
  return zi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, r) {
    return o.__proto__ = r, o;
  }, zi(e, t);
}
function pz() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Na(e, t, n) {
  return pz() ? Na = Reflect.construct.bind() : Na = function(r, i, l) {
    var a = [null];
    a.push.apply(a, i);
    var s = Function.bind.apply(r, a), d = new s();
    return l && zi(d, l.prototype), d;
  }, Na.apply(null, arguments);
}
function vz(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function Cd(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Cd = function(o) {
    if (o === null || !vz(o)) return o;
    if (typeof o != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(o)) return t.get(o);
      t.set(o, r);
    }
    function r() {
      return Na(o, arguments, xd(this).constructor);
    }
    return r.prototype = Object.create(o.prototype, {
      constructor: {
        value: r,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), zi(r, o);
  }, Cd(e);
}
var gz = /%[sdj%]/g, mz = function() {
};
function Sd(e) {
  if (!e || !e.length) return null;
  var t = {};
  return e.forEach(function(n) {
    var o = n.field;
    t[o] = t[o] || [], t[o].push(n);
  }), t;
}
function ln(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
    n[o - 1] = arguments[o];
  var r = 0, i = n.length;
  if (typeof e == "function")
    return e.apply(null, n);
  if (typeof e == "string") {
    var l = e.replace(gz, function(a) {
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
function bz(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function Mt(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || bz(t) && typeof e == "string" && !e);
}
function wz(e, t, n) {
  var o = [], r = 0, i = e.length;
  function l(a) {
    o.push.apply(o, a || []), r++, r === i && n(o);
  }
  e.forEach(function(a) {
    t(a, l);
  });
}
function Lh(e, t, n) {
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
function yz(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    t.push.apply(t, e[n] || []);
  }), t;
}
var Dh = /* @__PURE__ */ function(e) {
  hz(t, e);
  function t(n, o) {
    var r;
    return r = e.call(this, "Async Validation Error") || this, r.errors = n, r.fields = o, r;
  }
  return t;
}(/* @__PURE__ */ Cd(Error));
function xz(e, t, n, o, r) {
  if (t.first) {
    var i = new Promise(function(p, v) {
      var f = function(u) {
        return o(u), u.length ? v(new Dh(u, Sd(u))) : p(r);
      }, g = yz(e);
      Lh(g, n, f);
    });
    return i.catch(function(p) {
      return p;
    }), i;
  }
  var l = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], a = Object.keys(e), s = a.length, d = 0, c = [], h = new Promise(function(p, v) {
    var f = function(m) {
      if (c.push.apply(c, m), d++, d === s)
        return o(c), c.length ? v(new Dh(c, Sd(c))) : p(r);
    };
    a.length || (o(c), p(r)), a.forEach(function(g) {
      var m = e[g];
      l.indexOf(g) !== -1 ? Lh(m, n, f) : wz(m, n, f);
    });
  });
  return h.catch(function(p) {
    return p;
  }), h;
}
function Cz(e) {
  return !!(e && e.message !== void 0);
}
function Sz(e, t) {
  for (var n = e, o = 0; o < t.length; o++) {
    if (n == null)
      return n;
    n = n[t[o]];
  }
  return n;
}
function Nh(e, t) {
  return function(n) {
    var o;
    return e.fullFields ? o = Sz(t, e.fullFields) : o = t[n.field || e.fullField], Cz(n) ? (n.field = n.field || e.fullField, n.fieldValue = o, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: o,
      field: n.field || e.fullField
    };
  };
}
function Hh(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var o = t[n];
        typeof o == "object" && typeof e[n] == "object" ? e[n] = Ko({}, e[n], o) : e[n] = o;
      }
  }
  return e;
}
var Kg = function(t, n, o, r, i, l) {
  t.required && (!o.hasOwnProperty(t.field) || Mt(n, l || t.type)) && r.push(ln(i.messages.required, t.fullField));
}, $z = function(t, n, o, r, i) {
  (/^\s+$/.test(n) || n === "") && r.push(ln(i.messages.whitespace, t.fullField));
}, za, Rz = function() {
  if (za)
    return za;
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
  s.v4 = function($) {
    return $ && $.exact ? l : new RegExp("" + t($) + n + t($), "g");
  }, s.v6 = function($) {
    return $ && $.exact ? a : new RegExp("" + t($) + r + t($), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", c = "(?:\\S+(?::\\S*)?@)?", h = s.v4().source, p = s.v6().source, v = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", f = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", g = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", m = "(?::\\d{2,5})?", u = '(?:[/?#][^\\s"]*)?', w = "(?:" + d + "|www\\.)" + c + "(?:localhost|" + h + "|" + p + "|" + v + f + g + ")" + m + u;
  return za = new RegExp("(?:^" + w + "$)", "i"), za;
}, jh = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, si = {
  integer: function(t) {
    return si.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return si.number(t) && !si.integer(t);
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
    return typeof t == "object" && !si.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(jh.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(Rz());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(jh.hex);
  }
}, kz = function(t, n, o, r, i) {
  if (t.required && n === void 0) {
    Kg(t, n, o, r, i);
    return;
  }
  var l = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], a = t.type;
  l.indexOf(a) > -1 ? si[a](n) || r.push(ln(i.messages.types[a], t.fullField, t.type)) : a && typeof n !== t.type && r.push(ln(i.messages.types[a], t.fullField, t.type));
}, Pz = function(t, n, o, r, i) {
  var l = typeof t.len == "number", a = typeof t.min == "number", s = typeof t.max == "number", d = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, c = n, h = null, p = typeof n == "number", v = typeof n == "string", f = Array.isArray(n);
  if (p ? h = "number" : v ? h = "string" : f && (h = "array"), !h)
    return !1;
  f && (c = n.length), v && (c = n.replace(d, "_").length), l ? c !== t.len && r.push(ln(i.messages[h].len, t.fullField, t.len)) : a && !s && c < t.min ? r.push(ln(i.messages[h].min, t.fullField, t.min)) : s && !a && c > t.max ? r.push(ln(i.messages[h].max, t.fullField, t.max)) : a && s && (c < t.min || c > t.max) && r.push(ln(i.messages[h].range, t.fullField, t.min, t.max));
}, gr = "enum", Tz = function(t, n, o, r, i) {
  t[gr] = Array.isArray(t[gr]) ? t[gr] : [], t[gr].indexOf(n) === -1 && r.push(ln(i.messages[gr], t.fullField, t[gr].join(", ")));
}, _z = function(t, n, o, r, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(n) || r.push(ln(i.messages.pattern.mismatch, t.fullField, n, t.pattern));
    else if (typeof t.pattern == "string") {
      var l = new RegExp(t.pattern);
      l.test(n) || r.push(ln(i.messages.pattern.mismatch, t.fullField, n, t.pattern));
    }
  }
}, De = {
  required: Kg,
  whitespace: $z,
  type: kz,
  range: Pz,
  enum: Tz,
  pattern: _z
}, Ez = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Mt(n, "string") && !t.required)
      return o();
    De.required(t, n, r, l, i, "string"), Mt(n, "string") || (De.type(t, n, r, l, i), De.range(t, n, r, l, i), De.pattern(t, n, r, l, i), t.whitespace === !0 && De.whitespace(t, n, r, l, i));
  }
  o(l);
}, zz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Mt(n) && !t.required)
      return o();
    De.required(t, n, r, l, i), n !== void 0 && De.type(t, n, r, l, i);
  }
  o(l);
}, Fz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (n === "" && (n = void 0), Mt(n) && !t.required)
      return o();
    De.required(t, n, r, l, i), n !== void 0 && (De.type(t, n, r, l, i), De.range(t, n, r, l, i));
  }
  o(l);
}, Oz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Mt(n) && !t.required)
      return o();
    De.required(t, n, r, l, i), n !== void 0 && De.type(t, n, r, l, i);
  }
  o(l);
}, Mz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Mt(n) && !t.required)
      return o();
    De.required(t, n, r, l, i), Mt(n) || De.type(t, n, r, l, i);
  }
  o(l);
}, Iz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Mt(n) && !t.required)
      return o();
    De.required(t, n, r, l, i), n !== void 0 && (De.type(t, n, r, l, i), De.range(t, n, r, l, i));
  }
  o(l);
}, Vz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Mt(n) && !t.required)
      return o();
    De.required(t, n, r, l, i), n !== void 0 && (De.type(t, n, r, l, i), De.range(t, n, r, l, i));
  }
  o(l);
}, Az = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (n == null && !t.required)
      return o();
    De.required(t, n, r, l, i, "array"), n != null && (De.type(t, n, r, l, i), De.range(t, n, r, l, i));
  }
  o(l);
}, Bz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Mt(n) && !t.required)
      return o();
    De.required(t, n, r, l, i), n !== void 0 && De.type(t, n, r, l, i);
  }
  o(l);
}, Lz = "enum", Dz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Mt(n) && !t.required)
      return o();
    De.required(t, n, r, l, i), n !== void 0 && De[Lz](t, n, r, l, i);
  }
  o(l);
}, Nz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Mt(n, "string") && !t.required)
      return o();
    De.required(t, n, r, l, i), Mt(n, "string") || De.pattern(t, n, r, l, i);
  }
  o(l);
}, Hz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Mt(n, "date") && !t.required)
      return o();
    if (De.required(t, n, r, l, i), !Mt(n, "date")) {
      var s;
      n instanceof Date ? s = n : s = new Date(n), De.type(t, s, r, l, i), s && De.range(t, s.getTime(), r, l, i);
    }
  }
  o(l);
}, jz = function(t, n, o, r, i) {
  var l = [], a = Array.isArray(n) ? "array" : typeof n;
  De.required(t, n, r, l, i, a), o(l);
}, Ts = function(t, n, o, r, i) {
  var l = t.type, a = [], s = t.required || !t.required && r.hasOwnProperty(t.field);
  if (s) {
    if (Mt(n, l) && !t.required)
      return o();
    De.required(t, n, r, a, i, l), Mt(n, l) || De.type(t, n, r, a, i);
  }
  o(a);
}, Wz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Mt(n) && !t.required)
      return o();
    De.required(t, n, r, l, i);
  }
  o(l);
}, vi = {
  string: Ez,
  method: zz,
  number: Fz,
  boolean: Oz,
  regexp: Mz,
  integer: Iz,
  float: Vz,
  array: Az,
  object: Bz,
  enum: Dz,
  pattern: Nz,
  date: Hz,
  url: Ts,
  hex: Ts,
  email: Ts,
  required: jz,
  any: Wz
};
function $d() {
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
var Rd = $d(), kr = /* @__PURE__ */ function() {
  function e(n) {
    this.rules = null, this._messages = Rd, this.define(n);
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
    return o && (this._messages = Hh($d(), o)), this._messages;
  }, t.validate = function(o, r, i) {
    var l = this;
    r === void 0 && (r = {}), i === void 0 && (i = function() {
    });
    var a = o, s = r, d = i;
    if (typeof s == "function" && (d = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
      return d && d(null, a), Promise.resolve(a);
    function c(g) {
      var m = [], u = {};
      function w(b) {
        if (Array.isArray(b)) {
          var S;
          m = (S = m).concat.apply(S, b);
        } else
          m.push(b);
      }
      for (var $ = 0; $ < g.length; $++)
        w(g[$]);
      m.length ? (u = Sd(m), d(m, u)) : d(null, a);
    }
    if (s.messages) {
      var h = this.messages();
      h === Rd && (h = $d()), Hh(h, s.messages), s.messages = h;
    } else
      s.messages = this.messages();
    var p = {}, v = s.keys || Object.keys(this.rules);
    v.forEach(function(g) {
      var m = l.rules[g], u = a[g];
      m.forEach(function(w) {
        var $ = w;
        typeof $.transform == "function" && (a === o && (a = Ko({}, a)), u = a[g] = $.transform(u)), typeof $ == "function" ? $ = {
          validator: $
        } : $ = Ko({}, $), $.validator = l.getValidationMethod($), $.validator && ($.field = g, $.fullField = $.fullField || g, $.type = l.getType($), p[g] = p[g] || [], p[g].push({
          rule: $,
          value: u,
          source: a,
          field: g
        }));
      });
    });
    var f = {};
    return xz(p, s, function(g, m) {
      var u = g.rule, w = (u.type === "object" || u.type === "array") && (typeof u.fields == "object" || typeof u.defaultField == "object");
      w = w && (u.required || !u.required && g.value), u.field = g.field;
      function $(C, y) {
        return Ko({}, y, {
          fullField: u.fullField + "." + C,
          fullFields: u.fullFields ? [].concat(u.fullFields, [C]) : [C]
        });
      }
      function b(C) {
        C === void 0 && (C = []);
        var y = Array.isArray(C) ? C : [C];
        !s.suppressWarning && y.length && e.warning("async-validator:", y), y.length && u.message !== void 0 && (y = [].concat(u.message));
        var E = y.map(Nh(u, a));
        if (s.first && E.length)
          return f[u.field] = 1, m(E);
        if (!w)
          m(E);
        else {
          if (u.required && !g.value)
            return u.message !== void 0 ? E = [].concat(u.message).map(Nh(u, a)) : s.error && (E = [s.error(u, ln(s.messages.required, u.field))]), m(E);
          var R = {};
          u.defaultField && Object.keys(g.value).map(function(_) {
            R[_] = u.defaultField;
          }), R = Ko({}, R, g.rule.fields);
          var O = {};
          Object.keys(R).forEach(function(_) {
            var V = R[_], B = Array.isArray(V) ? V : [V];
            O[_] = B.map($.bind(null, _));
          });
          var W = new e(O);
          W.messages(s.messages), g.rule.options && (g.rule.options.messages = s.messages, g.rule.options.error = s.error), W.validate(g.value, g.rule.options || s, function(_) {
            var V = [];
            E && E.length && V.push.apply(V, E), _ && _.length && V.push.apply(V, _), m(V.length ? V : null);
          });
        }
      }
      var S;
      if (u.asyncValidator)
        S = u.asyncValidator(u, g.value, b, g.source, s);
      else if (u.validator) {
        try {
          S = u.validator(u, g.value, b, g.source, s);
        } catch (C) {
          console.error == null || console.error(C), s.suppressValidatorError || setTimeout(function() {
            throw C;
          }, 0), b(C.message);
        }
        S === !0 ? b() : S === !1 ? b(typeof u.message == "function" ? u.message(u.fullField || u.field) : u.message || (u.fullField || u.field) + " fails") : S instanceof Array ? b(S) : S instanceof Error && b(S.message);
      }
      S && S.then && S.then(function() {
        return b();
      }, function(C) {
        return b(C);
      });
    }, function(g) {
      c(g);
    }, a);
  }, t.getType = function(o) {
    if (o.type === void 0 && o.pattern instanceof RegExp && (o.type = "pattern"), typeof o.validator != "function" && o.type && !vi.hasOwnProperty(o.type))
      throw new Error(ln("Unknown rule type %s", o.type));
    return o.type || "string";
  }, t.getValidationMethod = function(o) {
    if (typeof o.validator == "function")
      return o.validator;
    var r = Object.keys(o), i = r.indexOf("message");
    return i !== -1 && r.splice(i, 1), r.length === 1 && r[0] === "required" ? vi.required : vi[this.getType(o)] || void 0;
  }, e;
}();
kr.register = function(t, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  vi[t] = n;
};
kr.warning = mz;
kr.messages = Rd;
kr.validators = vi;
const {
  cubicBezierEaseInOut: Wh
} = Pn;
function Uz({
  name: e = "fade-down",
  fromOffset: t = "-4px",
  enterDuration: n = ".3s",
  leaveDuration: o = ".3s",
  enterCubicBezier: r = Wh,
  leaveCubicBezier: i = Wh
} = {}) {
  return [I(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
    opacity: 0,
    transform: `translateY(${t})`
  }), I(`&.${e}-transition-enter-to, &.${e}-transition-leave-from`, {
    opacity: 1,
    transform: "translateY(0)"
  }), I(`&.${e}-transition-leave-active`, {
    transition: `opacity ${o} ${i}, transform ${o} ${i}`
  }), I(`&.${e}-transition-enter-active`, {
    transition: `opacity ${n} ${r}, transform ${n} ${r}`
  })];
}
const Kz = P("form-item", `
 display: grid;
 line-height: var(--n-line-height);
`, [P("form-item-label", `
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
 `, [L("asterisk", `
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 color: var(--n-asterisk-color);
 transition: color .3s var(--n-bezier);
 `), L("asterisk-placeholder", `
 grid-area: mark;
 user-select: none;
 -webkit-user-select: none;
 visibility: hidden; 
 `)]), P("form-item-blank", `
 grid-area: blank;
 min-height: var(--n-blank-height);
 `), N("auto-label-width", [P("form-item-label", "white-space: nowrap;")]), N("left-labelled", `
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 grid-template-rows: auto 1fr;
 align-items: flex-start;
 `, [P("form-item-label", `
 display: grid;
 grid-template-columns: 1fr auto;
 min-height: var(--n-blank-height);
 height: auto;
 box-sizing: border-box;
 flex-shrink: 0;
 flex-grow: 0;
 `, [N("reverse-columns-space", `
 grid-template-columns: auto 1fr;
 `), N("left-mark", `
 grid-template-areas:
 "mark text"
 ". text";
 `), N("right-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), N("right-hanging-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), L("text", `
 grid-area: text; 
 `), L("asterisk", `
 grid-area: mark; 
 align-self: end;
 `)])]), N("top-labelled", `
 grid-template-areas:
 "label"
 "blank"
 "feedback";
 grid-template-rows: minmax(var(--n-label-height), auto) 1fr;
 grid-template-columns: minmax(0, 100%);
 `, [N("no-label", `
 grid-template-areas:
 "blank"
 "feedback";
 grid-template-rows: 1fr;
 `), P("form-item-label", `
 display: flex;
 align-items: flex-start;
 justify-content: var(--n-label-text-align);
 `)]), P("form-item-blank", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 position: relative;
 `), P("form-item-feedback-wrapper", `
 grid-area: feedback;
 box-sizing: border-box;
 min-height: var(--n-feedback-height);
 font-size: var(--n-feedback-font-size);
 line-height: 1.25;
 transform-origin: top left;
 `, [I("&:not(:empty)", `
 padding: var(--n-feedback-padding);
 `), P("form-item-feedback", {
  transition: "color .3s var(--n-bezier)",
  color: "var(--n-feedback-text-color)"
}, [N("warning", {
  color: "var(--n-feedback-text-color-warning)"
}), N("error", {
  color: "var(--n-feedback-text-color-error)"
}), Uz({
  fromOffset: "-3px",
  enterDuration: ".3s",
  leaveDuration: ".2s"
})])])]), Gt = window.Vue.computed, bc = window.Vue.inject, Uh = window.Vue.ref;
function qz(e) {
  const t = bc(Vi, null);
  return {
    mergedSize: Gt(() => e.size !== void 0 ? e.size : (t == null ? void 0 : t.props.size) !== void 0 ? t.props.size : "medium")
  };
}
function Gz(e) {
  const t = bc(Vi, null), n = Gt(() => {
    const {
      labelPlacement: f
    } = e;
    return f !== void 0 ? f : t != null && t.props.labelPlacement ? t.props.labelPlacement : "top";
  }), o = Gt(() => n.value === "left" && (e.labelWidth === "auto" || (t == null ? void 0 : t.props.labelWidth) === "auto")), r = Gt(() => {
    if (n.value === "top") return;
    const {
      labelWidth: f
    } = e;
    if (f !== void 0 && f !== "auto")
      return Et(f);
    if (o.value) {
      const g = t == null ? void 0 : t.maxChildLabelWidthRef.value;
      return g !== void 0 ? Et(g) : void 0;
    }
    if ((t == null ? void 0 : t.props.labelWidth) !== void 0)
      return Et(t.props.labelWidth);
  }), i = Gt(() => {
    const {
      labelAlign: f
    } = e;
    if (f) return f;
    if (t != null && t.props.labelAlign) return t.props.labelAlign;
  }), l = Gt(() => {
    var f;
    return [(f = e.labelProps) === null || f === void 0 ? void 0 : f.style, e.labelStyle, {
      width: r.value
    }];
  }), a = Gt(() => {
    const {
      showRequireMark: f
    } = e;
    return f !== void 0 ? f : t == null ? void 0 : t.props.showRequireMark;
  }), s = Gt(() => {
    const {
      requireMarkPlacement: f
    } = e;
    return f !== void 0 ? f : (t == null ? void 0 : t.props.requireMarkPlacement) || "right";
  }), d = Uh(!1), c = Uh(!1), h = Gt(() => {
    const {
      validationStatus: f
    } = e;
    if (f !== void 0) return f;
    if (d.value) return "error";
    if (c.value) return "warning";
  }), p = Gt(() => {
    const {
      showFeedback: f
    } = e;
    return f !== void 0 ? f : (t == null ? void 0 : t.props.showFeedback) !== void 0 ? t.props.showFeedback : !0;
  }), v = Gt(() => {
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
function Xz(e) {
  const t = bc(Vi, null), n = Gt(() => {
    const {
      rulePath: l
    } = e;
    if (l !== void 0) return l;
    const {
      path: a
    } = e;
    if (a !== void 0) return a;
  }), o = Gt(() => {
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
        const c = Ei(s, d);
        c !== void 0 && (Array.isArray(c) ? l.push(...c) : l.push(c));
      }
    }
    return l;
  }), r = Gt(() => o.value.some((l) => l.required)), i = Gt(() => r.value || e.required);
  return {
    mergedRules: o,
    mergedRequired: i
  };
}
var Kh = function(e, t, n, o) {
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
const _s = window.Vue.computed, Yz = window.Vue.defineComponent, en = window.Vue.h, Zz = window.Vue.inject, Jz = window.Vue.onMounted, Qz = window.Vue.provide, Fa = window.Vue.ref, Oa = window.Vue.toRef, eF = window.Vue.Transition, tF = window.Vue.watch, wc = Object.assign(Object.assign({}, _e.props), {
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
}), nF = Pi(wc);
function qh(e, t) {
  return (...n) => {
    try {
      const o = e(...n);
      return !t && (typeof o == "boolean" || o instanceof Error || Array.isArray(o)) || o != null && o.then ? o : (o === void 0 || Po("form-item/validate", `You return a ${typeof o} typed value in the validator method, which is not recommended. Please use ${t ? "`Promise`" : "`boolean`, `Error` or `Promise`"} typed value instead.`), !0);
    } catch (o) {
      Po("form-item/validate", "An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation."), console.error(o);
      return;
    }
  };
}
const oF = Yz({
  name: "FormItem",
  props: wc,
  setup(e) {
    j0(Ug, "formItems", Oa(e, "path"));
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = je(e), o = Zz(Vi, null), r = qz(e), i = Gz(e), {
      validationErrored: l,
      validationWarned: a
    } = i, {
      mergedRequired: s,
      mergedRules: d
    } = Xz(e), {
      mergedSize: c
    } = r, {
      mergedLabelPlacement: h,
      mergedLabelAlign: p,
      mergedRequireMarkPlacement: v
    } = i, f = Fa([]), g = Fa(Si()), m = o ? Oa(o.props, "disabled") : Fa(!1), u = _e("Form", "-form-item", Kz, Wg, e, t);
    tF(Oa(e, "path"), () => {
      e.ignorePathChange || w();
    });
    function w() {
      f.value = [], l.value = !1, a.value = !1, e.feedback && (g.value = Si());
    }
    const $ = (...B) => Kh(this, [...B], void 0, function* (M = null, G = () => !0, U = {
      suppressWarning: !0
    }) {
      const {
        path: Q
      } = e;
      U ? U.first || (U.first = e.first) : U = {};
      const {
        value: oe
      } = d, ne = o ? Ei(o.props.model, Q || "") : void 0, X = {}, j = {}, Z = (M ? oe.filter((xe) => Array.isArray(xe.trigger) ? xe.trigger.includes(M) : xe.trigger === M) : oe).filter(G).map((xe, Te) => {
        const Re = Object.assign({}, xe);
        if (Re.validator && (Re.validator = qh(Re.validator, !1)), Re.asyncValidator && (Re.asyncValidator = qh(Re.asyncValidator, !0)), Re.renderMessage) {
          const Le = `__renderMessage__${Te}`;
          j[Le] = Re.message, Re.message = Le, X[Le] = Re.renderMessage;
        }
        return Re;
      }), te = Z.filter((xe) => xe.level !== "warning"), fe = Z.filter((xe) => xe.level === "warning"), he = {
        valid: !0,
        errors: void 0,
        warnings: void 0
      };
      if (!Z.length) return he;
      const ve = Q ?? "__n_no_path__", ye = new kr({
        [ve]: te
      }), J = new kr({
        [ve]: fe
      }), {
        validateMessages: ge
      } = (o == null ? void 0 : o.props) || {};
      ge && (ye.messages(ge), J.messages(ge));
      const Ee = (xe) => {
        f.value = xe.map((Te) => {
          const Re = (Te == null ? void 0 : Te.message) || "";
          return {
            key: Re,
            render: () => Re.startsWith("__renderMessage__") ? X[Re]() : Re
          };
        }), xe.forEach((Te) => {
          var Re;
          !((Re = Te.message) === null || Re === void 0) && Re.startsWith("__renderMessage__") && (Te.message = j[Te.message]);
        });
      };
      if (te.length) {
        const xe = yield new Promise((Te) => {
          ye.validate({
            [ve]: ne
          }, U, Te);
        });
        xe != null && xe.length && (he.valid = !1, he.errors = xe, Ee(xe));
      }
      if (fe.length && !he.errors) {
        const xe = yield new Promise((Te) => {
          J.validate({
            [ve]: ne
          }, U, Te);
        });
        xe != null && xe.length && (Ee(xe), he.warnings = xe);
      }
      return !he.errors && !he.warnings ? w() : (l.value = !!he.errors, a.value = !!he.warnings), he;
    });
    function b() {
      $("blur");
    }
    function S() {
      $("change");
    }
    function C() {
      $("focus");
    }
    function y() {
      $("input");
    }
    function E(B, M) {
      return Kh(this, void 0, void 0, function* () {
        let G, U, Q, oe;
        return typeof B == "string" ? (G = B, U = M) : B !== null && typeof B == "object" && (G = B.trigger, U = B.callback, Q = B.shouldRuleBeApplied, oe = B.options), yield new Promise((ne, X) => {
          $(G, Q, oe).then(({
            valid: j,
            errors: Z,
            warnings: te
          }) => {
            j ? (U && U(void 0, {
              warnings: te
            }), ne({
              warnings: te
            })) : (U && U(Z, {
              warnings: te
            }), X(Z));
          });
        });
      });
    }
    Qz(ld, {
      path: Oa(e, "path"),
      disabled: m,
      mergedSize: r.mergedSize,
      mergedValidationStatus: i.mergedValidationStatus,
      restoreValidation: w,
      handleContentBlur: b,
      handleContentChange: S,
      handleContentFocus: C,
      handleContentInput: y
    });
    const R = {
      validate: E,
      restoreValidation: w,
      internalValidate: $
    }, O = Fa(null);
    Jz(() => {
      if (!i.isAutoLabelWidth.value) return;
      const B = O.value;
      if (B !== null) {
        const M = B.style.whiteSpace;
        B.style.whiteSpace = "nowrap", B.style.width = "", o == null || o.deriveMaxChildLabelWidth(Number(getComputedStyle(B).width.slice(0, -2))), B.style.whiteSpace = M;
      }
    });
    const W = _s(() => {
      var B;
      const {
        value: M
      } = c, {
        value: G
      } = h, U = G === "top" ? "vertical" : "horizontal", {
        common: {
          cubicBezierEaseInOut: Q
        },
        self: {
          labelTextColor: oe,
          asteriskColor: ne,
          lineHeight: X,
          feedbackTextColor: j,
          feedbackTextColorWarning: Z,
          feedbackTextColorError: te,
          feedbackPadding: fe,
          labelFontWeight: he,
          [ie("labelHeight", M)]: ve,
          [ie("blankHeight", M)]: ye,
          [ie("feedbackFontSize", M)]: J,
          [ie("feedbackHeight", M)]: ge,
          [ie("labelPadding", U)]: Ee,
          [ie("labelTextAlign", U)]: xe,
          [ie(ie("labelFontSize", G), M)]: Te
        }
      } = u.value;
      let Re = (B = p.value) !== null && B !== void 0 ? B : xe;
      return G === "top" && (Re = Re === "right" ? "flex-end" : "flex-start"), {
        "--n-bezier": Q,
        "--n-line-height": X,
        "--n-blank-height": ye,
        "--n-label-font-size": Te,
        "--n-label-text-align": Re,
        "--n-label-height": ve,
        "--n-label-padding": Ee,
        "--n-label-font-weight": he,
        "--n-asterisk-color": ne,
        "--n-label-text-color": oe,
        "--n-feedback-padding": fe,
        "--n-feedback-font-size": J,
        "--n-feedback-height": ge,
        "--n-feedback-text-color": j,
        "--n-feedback-text-color-warning": Z,
        "--n-feedback-text-color-error": te
      };
    }), _ = n ? St("form-item", _s(() => {
      var B;
      return `${c.value[0]}${h.value[0]}${((B = p.value) === null || B === void 0 ? void 0 : B[0]) || ""}`;
    }), W, e) : void 0, V = _s(() => h.value === "left" && v.value === "left" && p.value === "left");
    return Object.assign(Object.assign(Object.assign(Object.assign({
      labelElementRef: O,
      mergedClsPrefix: t,
      mergedRequired: s,
      feedbackId: g,
      renderExplains: f,
      reverseColSpace: V
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
      const d = en("span", {
        class: `${t}-form-item-label__text`
      }, s), c = l ? en("span", {
        class: `${t}-form-item-label__asterisk`
      }, r !== "left" ? " *" : "* ") : r === "right-hanging" && en("span", {
        class: `${t}-form-item-label__asterisk-placeholder`
      }, " *"), {
        labelProps: h
      } = this;
      return en("label", Object.assign({}, h, {
        class: [h == null ? void 0 : h.class, `${t}-form-item-label`, `${t}-form-item-label--${r}-mark`, this.reverseColSpace && `${t}-form-item-label--reverse-columns-space`],
        style: this.mergedLabelStyle,
        ref: "labelElementRef"
      }), r === "left" ? [c, d] : [d, c]);
    };
    return en("div", {
      class: [`${t}-form-item`, this.themeClass, `${t}-form-item--${this.mergedSize}-size`, `${t}-form-item--${this.mergedLabelPlacement}-labelled`, this.isAutoLabelWidth && `${t}-form-item--auto-label-width`, !n && `${t}-form-item--no-label`],
      style: this.cssVars
    }, n && a(), en("div", {
      class: [`${t}-form-item-blank`, this.contentClass, this.mergedValidationStatus && `${t}-form-item-blank--${this.mergedValidationStatus}`],
      style: this.contentStyle
    }, e), this.mergedShowFeedback ? en("div", {
      key: this.feedbackId,
      style: this.feedbackStyle,
      class: [`${t}-form-item-feedback-wrapper`, this.feedbackClass]
    }, en(eF, {
      name: "fade-down-transition",
      mode: "out-in"
    }, {
      default: () => {
        const {
          mergedValidationStatus: s
        } = this;
        return Ye(e.feedback, (d) => {
          var c;
          const {
            feedback: h
          } = this, p = d || h ? en("div", {
            key: "__feedback__",
            class: `${t}-form-item-feedback__line`
          }, d || h) : this.renderExplains.length ? (c = this.renderExplains) === null || c === void 0 ? void 0 : c.map(({
            key: v,
            render: f
          }) => en("div", {
            key: v,
            class: `${t}-form-item-feedback__line`
          }, f())) : null;
          return p ? s === "warning" ? en("div", {
            key: "controlled-warning",
            class: `${t}-form-item-feedback ${t}-form-item-feedback--warning`
          }, p) : s === "error" ? en("div", {
            key: "controlled-error",
            class: `${t}-form-item-feedback ${t}-form-item-feedback--error`
          }, p) : s === "success" ? en("div", {
            key: "controlled-success",
            class: `${t}-form-item-feedback ${t}-form-item-feedback--success`
          }, p) : en("div", {
            key: "controlled-default",
            class: `${t}-form-item-feedback`
          }, p) : null;
        });
      }
    })) : null);
  }
}), Gh = 1, qg = "n-grid", rF = window.Vue.computed, iF = window.Vue.defineComponent, aF = window.Vue.getCurrentInstance, Xh = window.Vue.h, lF = window.Vue.inject, Gg = 1, yc = {
  span: {
    type: [Number, String],
    default: Gg
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
}, sF = Pi(yc), dF = iF({
  __GRID_ITEM__: !0,
  name: "GridItem",
  alias: ["Gi"],
  props: yc,
  setup() {
    const {
      isSsrRef: e,
      xGapRef: t,
      itemStyleRef: n,
      overflowRef: o,
      layoutShiftDisabledRef: r
    } = lF(qg), i = aF();
    return {
      overflow: o,
      itemStyle: n,
      layoutShiftDisabled: r,
      mergedXGap: rF(() => ht(t.value || 0)),
      deriveStyle: () => {
        e.value;
        const {
          privateSpan: l = Gg,
          privateShow: a = !0,
          privateColStart: s = void 0,
          privateOffset: d = 0
        } = i.vnode.props, {
          value: c
        } = t, h = ht(c || 0);
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
      return Xh("div", {
        style: {
          gridColumn: `span ${n} / span ${n}`,
          marginLeft: o ? `calc((100% - (${n} - 1) * ${r}) / ${n} * ${o} + ${r} * ${o})` : ""
        }
      }, this.$slots);
    }
    return Xh("div", {
      style: [this.itemStyle, this.deriveStyle()]
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e, {
      overflow: this.overflow
    }));
  }
}), cF = window.Vue.defineComponent, Yh = window.Vue.h, uF = window.Vue.ref, fF = Object.assign(Object.assign({}, yc), wc), It = cF({
  __GRID_ITEM__: !0,
  name: "FormItemGridItem",
  alias: ["FormItemGi"],
  props: fF,
  setup() {
    const e = uF(null);
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
    return Yh(dF, ki(this.$.vnode.props || {}, sF), {
      default: () => {
        const e = ki(this.$props, nF);
        return Yh(oF, Object.assign({
          ref: "formItemInstRef"
        }, e), this.$slots);
      }
    });
  }
}), hF = {
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
}, Zh = window.Vue.cloneVNode, Es = window.Vue.computed, pF = window.Vue.defineComponent, zs = window.Vue.h, Jh = window.Vue.mergeProps, vF = window.Vue.onMounted, gF = window.Vue.provide, Ma = window.Vue.ref, Qh = window.Vue.toRef, mF = window.Vue.vShow, Xg = 24, Fs = "__ssr__", bF = {
  layoutShiftDisabled: Boolean,
  responsive: {
    type: [String, Boolean],
    default: "self"
  },
  cols: {
    type: [Number, String],
    default: Xg
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
}, ep = pF({
  name: "Grid",
  inheritAttrs: !1,
  props: bF,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBreakpointsRef: n
    } = je(e), o = /^\d+$/, r = Ma(void 0), i = _0((n == null ? void 0 : n.value) || hF), l = Be(() => !!(e.itemResponsive || !o.test(e.cols.toString()) || !o.test(e.xGap.toString()) || !o.test(e.yGap.toString()))), a = Es(() => {
      if (l.value)
        return e.responsive === "self" ? r.value : i.value;
    }), s = Be(() => {
      var u;
      return (u = Number(rr(e.cols.toString(), a.value))) !== null && u !== void 0 ? u : Xg;
    }), d = Be(() => rr(e.xGap.toString(), a.value)), c = Be(() => rr(e.yGap.toString(), a.value)), h = (u) => {
      r.value = u.contentRect.width;
    }, p = (u) => {
      xi(h, u);
    }, v = Ma(!1), f = Es(() => {
      if (e.responsive === "self")
        return p;
    }), g = Ma(!1), m = Ma();
    return vF(() => {
      const {
        value: u
      } = m;
      u && u.hasAttribute(Fs) && (u.removeAttribute(Fs), g.value = !0);
    }), gF(qg, {
      layoutShiftDisabledRef: Qh(e, "layoutShiftDisabled"),
      isSsrRef: g,
      itemStyleRef: Qh(e, "itemStyle"),
      xGapRef: d,
      overflowRef: v
    }), {
      isSsr: !Jo,
      contentEl: m,
      mergedClsPrefix: t,
      style: Es(() => e.layoutShiftDisabled ? {
        width: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${e.cols}, minmax(0, 1fr))`,
        columnGap: ht(e.xGap),
        rowGap: ht(e.yGap)
      } : {
        width: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${s.value}, minmax(0, 1fr))`,
        columnGap: ht(d.value),
        rowGap: ht(c.value)
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
      return zs("div", Jh({
        ref: "contentEl",
        class: `${this.mergedClsPrefix}-grid`,
        style: this.style
      }, this.$attrs), this.$slots);
    const e = () => {
      var t, n, o, r, i, l, a;
      this.overflow = !1;
      const s = io(Gd(this)), d = [], {
        collapsed: c,
        collapsedRows: h,
        responsiveCols: p,
        responsiveQuery: v
      } = this;
      s.forEach((w) => {
        var $, b, S, C, y;
        if ((($ = w == null ? void 0 : w.type) === null || $ === void 0 ? void 0 : $.__GRID_ITEM__) !== !0) return;
        if (a1(w)) {
          const O = Zh(w);
          O.props ? O.props.privateShow = !1 : O.props = {
            privateShow: !1
          }, d.push({
            child: O,
            rawChildSpan: 0
          });
          return;
        }
        w.dirs = ((b = w.dirs) === null || b === void 0 ? void 0 : b.filter(({
          dir: O
        }) => O !== mF)) || null, ((S = w.dirs) === null || S === void 0 ? void 0 : S.length) === 0 && (w.dirs = null);
        const E = Zh(w), R = Number((y = rr((C = E.props) === null || C === void 0 ? void 0 : C.span, v)) !== null && y !== void 0 ? y : Gh);
        R !== 0 && d.push({
          child: E,
          rawChildSpan: R
        });
      });
      let f = 0;
      const g = (t = d[d.length - 1]) === null || t === void 0 ? void 0 : t.child;
      if (g != null && g.props) {
        const w = (n = g.props) === null || n === void 0 ? void 0 : n.suffix;
        w !== void 0 && w !== !1 && (f = Number((r = rr((o = g.props) === null || o === void 0 ? void 0 : o.span, v)) !== null && r !== void 0 ? r : Gh), g.props.privateSpan = f, g.props.privateColStart = p + 1 - f, g.props.privateShow = (i = g.props.privateShow) !== null && i !== void 0 ? i : !0);
      }
      let m = 0, u = !1;
      for (const {
        child: w,
        rawChildSpan: $
      } of d) {
        if (u && (this.overflow = !0), !u) {
          const b = Number((a = rr((l = w.props) === null || l === void 0 ? void 0 : l.offset, v)) !== null && a !== void 0 ? a : 0), S = Math.min($ + b, p);
          if (w.props ? (w.props.privateSpan = S, w.props.privateOffset = b) : w.props = {
            privateSpan: S,
            privateOffset: b
          }, c) {
            const C = m % p;
            S + C > p && (m += p - C), S + m + f > h * p ? u = !0 : m += S;
          }
        }
        u && (w.props ? w.props.privateShow !== !0 && (w.props.privateShow = !1) : w.props = {
          privateShow: !1
        });
      }
      return zs("div", Jh({
        ref: "contentEl",
        class: `${this.mergedClsPrefix}-grid`,
        style: this.style,
        [Fs]: this.isSsr || void 0
      }, this.$attrs), d.map(({
        child: w
      }) => w));
    };
    return this.isResponsive && this.responsive === "self" ? zs(Hn, {
      onResize: this.handleResize
    }, {
      default: e
    }) : e();
  }
}), wF = I([P("input-number-suffix", `
 display: inline-block;
 margin-right: 10px;
 `), P("input-number-prefix", `
 display: inline-block;
 margin-left: 10px;
 `)]);
function yF(e) {
  return e == null || typeof e == "string" && e.trim() === "" ? null : Number(e);
}
function xF(e) {
  return e.includes(".") && (/^(-)?\d+.*(\.|0)$/.test(e) || /^-?\d*$/.test(e)) || e === "-" || e === "-0";
}
function Os(e) {
  return e == null ? !0 : !Number.isNaN(e);
}
function tp(e, t) {
  return typeof e != "number" ? "" : t === void 0 ? String(e) : e.toFixed(t);
}
function Ms(e) {
  if (e === null) return null;
  if (typeof e == "number")
    return e;
  {
    const t = Number(e);
    return Number.isNaN(t) ? null : t;
  }
}
const CF = window.Vue.computed, SF = window.Vue.defineComponent, In = window.Vue.h, $F = window.Vue.nextTick, ii = window.Vue.ref, RF = window.Vue.toRef, kF = window.Vue.watch;
window.Vue.watchEffect;
const np = 800, op = 100, PF = Object.assign(Object.assign({}, _e.props), {
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
}), Co = SF({
  name: "InputNumber",
  props: PF,
  slots: Object,
  setup(e) {
    const {
      mergedBorderedRef: t,
      mergedClsPrefixRef: n,
      mergedRtlRef: o
    } = je(e), r = _e("InputNumber", "-input-number", wF, ZE, e, n), {
      localeRef: i
    } = Tr("InputNumber"), l = lo(e), {
      mergedSizeRef: a,
      mergedDisabledRef: s,
      mergedStatusRef: d
    } = l, c = ii(null), h = ii(null), p = ii(null), v = ii(e.defaultValue), f = RF(e, "value"), g = Ot(f, v), m = ii(""), u = (de) => {
      const T = String(de).split(".")[1];
      return T ? T.length : 0;
    }, w = (de) => {
      const T = [e.min, e.max, e.step, de].map((k) => k === void 0 ? 0 : u(k));
      return Math.max(...T);
    }, $ = Be(() => {
      const {
        placeholder: de
      } = e;
      return de !== void 0 ? de : i.value.placeholder;
    }), b = Be(() => {
      const de = Ms(e.step);
      return de !== null ? de === 0 ? 1 : Math.abs(de) : 1;
    }), S = Be(() => {
      const de = Ms(e.min);
      return de !== null ? de : null;
    }), C = Be(() => {
      const de = Ms(e.max);
      return de !== null ? de : null;
    }), y = () => {
      const {
        value: de
      } = g;
      if (Os(de)) {
        const {
          format: T,
          precision: k
        } = e;
        T ? m.value = T(de) : de === null || k === void 0 || u(de) > k ? m.value = tp(de, void 0) : m.value = tp(de, k);
      } else
        m.value = String(de);
    };
    y();
    const E = (de) => {
      const {
        value: T
      } = g;
      if (de === T) {
        y();
        return;
      }
      const {
        "onUpdate:value": k,
        onUpdateValue: z,
        onChange: H
      } = e, {
        nTriggerFormInput: re,
        nTriggerFormChange: le
      } = l;
      H && ue(H, de), z && ue(z, de), k && ue(k, de), v.value = de, re(), le();
    }, R = ({
      offset: de,
      doUpdateIfValid: T,
      fixPrecision: k,
      isInputing: z
    }) => {
      const {
        value: H
      } = m;
      if (z && xF(H))
        return !1;
      const re = (e.parse || yF)(H);
      if (re === null)
        return T && E(null), null;
      if (Os(re)) {
        const le = u(re), {
          precision: F
        } = e;
        if (F !== void 0 && F < le && !k)
          return !1;
        let K = Number.parseFloat((re + de).toFixed(F ?? w(re)));
        if (Os(K)) {
          const {
            value: be
          } = C, {
            value: Pe
          } = S;
          if (be !== null && K > be) {
            if (!T || z) return !1;
            K = be;
          }
          if (Pe !== null && K < Pe) {
            if (!T || z) return !1;
            K = Pe;
          }
          return e.validator && !e.validator(K) ? !1 : (T && E(K), K);
        }
      }
      return !1;
    }, O = Be(() => R({
      offset: 0,
      doUpdateIfValid: !1,
      isInputing: !1,
      fixPrecision: !1
    }) === !1), W = Be(() => {
      const {
        value: de
      } = g;
      if (e.validator && de === null)
        return !1;
      const {
        value: T
      } = b;
      return R({
        offset: -T,
        doUpdateIfValid: !1,
        isInputing: !1,
        fixPrecision: !1
      }) !== !1;
    }), _ = Be(() => {
      const {
        value: de
      } = g;
      if (e.validator && de === null)
        return !1;
      const {
        value: T
      } = b;
      return R({
        offset: +T,
        doUpdateIfValid: !1,
        isInputing: !1,
        fixPrecision: !1
      }) !== !1;
    });
    function V(de) {
      const {
        onFocus: T
      } = e, {
        nTriggerFormFocus: k
      } = l;
      T && ue(T, de), k();
    }
    function B(de) {
      var T, k;
      if (de.target === ((T = c.value) === null || T === void 0 ? void 0 : T.wrapperElRef))
        return;
      const z = R({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !1,
        fixPrecision: !0
      });
      if (z !== !1) {
        const le = (k = c.value) === null || k === void 0 ? void 0 : k.inputElRef;
        le && (le.value = String(z || "")), g.value === z && y();
      } else
        y();
      const {
        onBlur: H
      } = e, {
        nTriggerFormBlur: re
      } = l;
      H && ue(H, de), re(), $F(() => {
        y();
      });
    }
    function M(de) {
      const {
        onClear: T
      } = e;
      T && ue(T, de);
    }
    function G() {
      const {
        value: de
      } = _;
      if (!de) {
        ye();
        return;
      }
      const {
        value: T
      } = g;
      if (T === null)
        e.validator || E(ne());
      else {
        const {
          value: k
        } = b;
        R({
          offset: k,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        });
      }
    }
    function U() {
      const {
        value: de
      } = W;
      if (!de) {
        he();
        return;
      }
      const {
        value: T
      } = g;
      if (T === null)
        e.validator || E(ne());
      else {
        const {
          value: k
        } = b;
        R({
          offset: -k,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        });
      }
    }
    const Q = V, oe = B;
    function ne() {
      if (e.validator) return null;
      const {
        value: de
      } = S, {
        value: T
      } = C;
      return de !== null ? Math.max(0, de) : T !== null ? Math.min(0, T) : 0;
    }
    function X(de) {
      M(de), E(null);
    }
    function j(de) {
      var T, k, z;
      !((T = p.value) === null || T === void 0) && T.$el.contains(de.target) && de.preventDefault(), !((k = h.value) === null || k === void 0) && k.$el.contains(de.target) && de.preventDefault(), (z = c.value) === null || z === void 0 || z.activate();
    }
    let Z = null, te = null, fe = null;
    function he() {
      fe && (window.clearTimeout(fe), fe = null), Z && (window.clearInterval(Z), Z = null);
    }
    let ve = null;
    function ye() {
      ve && (window.clearTimeout(ve), ve = null), te && (window.clearInterval(te), te = null);
    }
    function J() {
      he(), fe = window.setTimeout(() => {
        Z = window.setInterval(() => {
          U();
        }, op);
      }, np), pt("mouseup", document, he, {
        once: !0
      });
    }
    function ge() {
      ye(), ve = window.setTimeout(() => {
        te = window.setInterval(() => {
          G();
        }, op);
      }, np), pt("mouseup", document, ye, {
        once: !0
      });
    }
    const Ee = () => {
      te || G();
    }, xe = () => {
      Z || U();
    };
    function Te(de) {
      var T, k;
      if (de.key === "Enter") {
        if (de.target === ((T = c.value) === null || T === void 0 ? void 0 : T.wrapperElRef))
          return;
        R({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && ((k = c.value) === null || k === void 0 || k.deactivate());
      } else if (de.key === "ArrowUp") {
        if (!_.value || e.keyboard.ArrowUp === !1) return;
        de.preventDefault(), R({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && G();
      } else if (de.key === "ArrowDown") {
        if (!W.value || e.keyboard.ArrowDown === !1) return;
        de.preventDefault(), R({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && U();
      }
    }
    function Re(de) {
      m.value = de, e.updateValueOnInput && !e.format && !e.parse && e.precision === void 0 && R({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !0,
        fixPrecision: !1
      });
    }
    kF(g, () => {
      y();
    });
    const Le = {
      focus: () => {
        var de;
        return (de = c.value) === null || de === void 0 ? void 0 : de.focus();
      },
      blur: () => {
        var de;
        return (de = c.value) === null || de === void 0 ? void 0 : de.blur();
      },
      select: () => {
        var de;
        return (de = c.value) === null || de === void 0 ? void 0 : de.select();
      }
    }, Fe = Lt("InputNumber", o, n);
    return Object.assign(Object.assign({}, Le), {
      rtlEnabled: Fe,
      inputInstRef: c,
      minusButtonInstRef: h,
      addButtonInstRef: p,
      mergedClsPrefix: n,
      mergedBordered: t,
      uncontrolledValue: v,
      mergedValue: g,
      mergedPlaceholder: $,
      displayedValueInvalid: O,
      mergedSize: a,
      mergedDisabled: s,
      displayedValue: m,
      addable: _,
      minusable: W,
      mergedStatus: d,
      handleFocus: Q,
      handleBlur: oe,
      handleClear: X,
      handleMouseDown: j,
      handleAddClick: Ee,
      handleMinusClick: xe,
      handleAddMousedown: ge,
      handleMinusMousedown: J,
      handleKeyDown: Te,
      handleUpdateDisplayedValue: Re,
      // theme
      mergedTheme: r,
      inputThemeOverrides: {
        paddingSmall: "0 8px 0 10px",
        paddingMedium: "0 8px 0 12px",
        paddingLarge: "0 8px 0 14px"
      },
      buttonThemeOverrides: CF(() => {
        const {
          self: {
            iconColorDisabled: de
          }
        } = r.value, [T, k, z, H] = ko(de);
        return {
          textColorTextDisabled: `rgb(${T}, ${k}, ${z})`,
          opacityDisabled: `${H}`
        };
      })
    });
  },
  render() {
    const {
      mergedClsPrefix: e,
      $slots: t
    } = this, n = () => In(jf, {
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
      icon: () => Rn(t["minus-icon"], () => [In(_t, {
        clsPrefix: e
      }, {
        default: () => In(Rk, null)
      })])
    }), o = () => In(jf, {
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
      icon: () => Rn(t["add-icon"], () => [In(_t, {
        clsPrefix: e
      }, {
        default: () => In(Qv, null)
      })])
    });
    return In("div", {
      class: [`${e}-input-number`, this.rtlEnabled && `${e}-input-number--rtl`]
    }, In(Rt, {
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
        return this.showButton && this.buttonPlacement === "both" ? [n(), Ye(t.prefix, (i) => i ? In("span", {
          class: `${e}-input-number-prefix`
        }, i) : null)] : (r = t.prefix) === null || r === void 0 ? void 0 : r.call(t);
      },
      suffix: () => {
        var r;
        return this.showButton ? [Ye(t.suffix, (i) => i ? In("span", {
          class: `${e}-input-number-suffix`
        }, i) : null), this.buttonPlacement === "right" ? n() : null, o()] : (r = t.suffix) === null || r === void 0 ? void 0 : r.call(t);
      }
    }));
  }
}), Is = window.Vue.h;
function TF() {
  return Is("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 36 36"
  }, Is("path", {
    fill: "#EF9645",
    d: "M15.5 2.965c1.381 0 2.5 1.119 2.5 2.5v.005L20.5.465c1.381 0 2.5 1.119 2.5 2.5V4.25l2.5-1.535c1.381 0 2.5 1.119 2.5 2.5V8.75L29 18H15.458L15.5 2.965z"
  }), Is("path", {
    fill: "#FFDC5D",
    d: "M4.625 16.219c1.381-.611 3.354.208 4.75 2.188.917 1.3 1.187 3.151 2.391 3.344.46.073 1.234-.313 1.234-1.397V4.5s0-2 2-2 2 2 2 2v11.633c0-.029 1-.064 1-.082V2s0-2 2-2 2 2 2 2v14.053c0 .017 1 .041 1 .069V4.25s0-2 2-2 2 2 2 2v12.638c0 .118 1 .251 1 .398V8.75s0-2 2-2 2 2 2 2V24c0 6.627-5.373 12-12 12-4.775 0-8.06-2.598-9.896-5.292C8.547 28.423 8.096 26.051 8 25.334c0 0-.123-1.479-1.156-2.865-1.469-1.969-2.5-3.156-3.125-3.866-.317-.359-.625-1.707.906-2.384z"
  }));
}
const Do = window.Vue.h;
function _F() {
  return Do("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 36 36"
  }, Do("circle", {
    fill: "#FFCB4C",
    cx: "18",
    cy: "17.018",
    r: "17"
  }), Do("path", {
    fill: "#65471B",
    d: "M14.524 21.036c-.145-.116-.258-.274-.312-.464-.134-.46.13-.918.59-1.021 4.528-1.021 7.577 1.363 7.706 1.465.384.306.459.845.173 1.205-.286.358-.828.401-1.211.097-.11-.084-2.523-1.923-6.182-1.098-.274.061-.554-.016-.764-.184z"
  }), Do("ellipse", {
    fill: "#65471B",
    cx: "13.119",
    cy: "11.174",
    rx: "2.125",
    ry: "2.656"
  }), Do("ellipse", {
    fill: "#65471B",
    cx: "24.375",
    cy: "12.236",
    rx: "2.125",
    ry: "2.656"
  }), Do("path", {
    fill: "#F19020",
    d: "M17.276 35.149s1.265-.411 1.429-1.352c.173-.972-.624-1.167-.624-1.167s1.041-.208 1.172-1.376c.123-1.101-.861-1.363-.861-1.363s.97-.4 1.016-1.539c.038-.959-.995-1.428-.995-1.428s5.038-1.221 5.556-1.341c.516-.12 1.32-.615 1.069-1.694-.249-1.08-1.204-1.118-1.697-1.003-.494.115-6.744 1.566-8.9 2.068l-1.439.334c-.54.127-.785-.11-.404-.512.508-.536.833-1.129.946-2.113.119-1.035-.232-2.313-.433-2.809-.374-.921-1.005-1.649-1.734-1.899-1.137-.39-1.945.321-1.542 1.561.604 1.854.208 3.375-.833 4.293-2.449 2.157-3.588 3.695-2.83 6.973.828 3.575 4.377 5.876 7.952 5.048l3.152-.681z"
  }), Do("path", {
    fill: "#65471B",
    d: "M9.296 6.351c-.164-.088-.303-.224-.391-.399-.216-.428-.04-.927.393-1.112 4.266-1.831 7.699-.043 7.843.034.433.231.608.747.391 1.154-.216.405-.74.546-1.173.318-.123-.063-2.832-1.432-6.278.047-.257.109-.547.085-.785-.042zm12.135 3.75c-.156-.098-.286-.243-.362-.424-.187-.442.023-.927.468-1.084 4.381-1.536 7.685.48 7.823.567.415.26.555.787.312 1.178-.242.39-.776.495-1.191.238-.12-.072-2.727-1.621-6.267-.379-.266.091-.553.046-.783-.096z"
  }));
}
const No = window.Vue.h;
function EF() {
  return No("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 36 36"
  }, No("ellipse", {
    fill: "#292F33",
    cx: "18",
    cy: "26",
    rx: "18",
    ry: "10"
  }), No("ellipse", {
    fill: "#66757F",
    cx: "18",
    cy: "24",
    rx: "18",
    ry: "10"
  }), No("path", {
    fill: "#E1E8ED",
    d: "M18 31C3.042 31 1 16 1 12h34c0 2-1.958 19-17 19z"
  }), No("path", {
    fill: "#77B255",
    d: "M35 12.056c0 5.216-7.611 9.444-17 9.444S1 17.271 1 12.056C1 6.84 8.611 3.611 18 3.611s17 3.229 17 8.445z"
  }), No("ellipse", {
    fill: "#A6D388",
    cx: "18",
    cy: "13",
    rx: "15",
    ry: "7"
  }), No("path", {
    d: "M21 17c-.256 0-.512-.098-.707-.293-2.337-2.337-2.376-4.885-.125-8.262.739-1.109.9-2.246.478-3.377-.461-1.236-1.438-1.996-1.731-2.077-.553 0-.958-.443-.958-.996 0-.552.491-.995 1.043-.995.997 0 2.395 1.153 3.183 2.625 1.034 1.933.91 4.039-.351 5.929-1.961 2.942-1.531 4.332-.125 5.738.391.391.391 1.023 0 1.414-.195.196-.451.294-.707.294zm-6-2c-.256 0-.512-.098-.707-.293-2.337-2.337-2.376-4.885-.125-8.262.727-1.091.893-2.083.494-2.947-.444-.961-1.431-1.469-1.684-1.499-.552 0-.989-.447-.989-1 0-.552.458-1 1.011-1 .997 0 2.585.974 3.36 2.423.481.899 1.052 2.761-.528 5.131-1.961 2.942-1.531 4.332-.125 5.738.391.391.391 1.023 0 1.414-.195.197-.451.295-.707.295z",
    fill: "#5C913B"
  }));
}
const Ia = window.Vue.h;
function zF() {
  return Ia("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 36 36"
  }, Ia("path", {
    fill: "#FFCC4D",
    d: "M36 18c0 9.941-8.059 18-18 18-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"
  }), Ia("ellipse", {
    fill: "#664500",
    cx: "18",
    cy: "27",
    rx: "5",
    ry: "6"
  }), Ia("path", {
    fill: "#664500",
    d: "M5.999 11c-.208 0-.419-.065-.599-.2-.442-.331-.531-.958-.2-1.4C8.462 5.05 12.816 5 13 5c.552 0 1 .448 1 1 0 .551-.445.998-.996 1-.155.002-3.568.086-6.204 3.6-.196.262-.497.4-.801.4zm24.002 0c-.305 0-.604-.138-.801-.4-2.64-3.521-6.061-3.598-6.206-3.6-.55-.006-.994-.456-.991-1.005C22.006 5.444 22.45 5 23 5c.184 0 4.537.05 7.8 4.4.332.442.242 1.069-.2 1.4-.18.135-.39.2-.599.2zm-16.087 4.5l1.793-1.793c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0L12.5 14.086l-1.793-1.793c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.793 1.793-1.793 1.793c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l1.793-1.793 1.793 1.793c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414L13.914 15.5zm11 0l1.793-1.793c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0L23.5 14.086l-1.793-1.793c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.793 1.793-1.793 1.793c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l1.793-1.793 1.793 1.793c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414L24.914 15.5z"
  }));
}
const FF = P("result", `
 color: var(--n-text-color);
 line-height: var(--n-line-height);
 font-size: var(--n-font-size);
 transition:
 color .3s var(--n-bezier);
`, [P("result-icon", `
 display: flex;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `, [L("status-image", `
 font-size: var(--n-icon-size);
 width: 1em;
 height: 1em;
 `), P("base-icon", `
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), P("result-content", {
  marginTop: "24px"
}), P("result-footer", `
 margin-top: 24px;
 text-align: center;
 `), P("result-header", [L("title", `
 margin-top: 16px;
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 text-align: center;
 color: var(--n-title-text-color);
 font-size: var(--n-title-font-size);
 `), L("description", `
 margin-top: 4px;
 text-align: center;
 font-size: var(--n-font-size);
 `)])]), rp = window.Vue.computed, OF = window.Vue.defineComponent, un = window.Vue.h, MF = {
  403: TF,
  404: _F,
  418: EF,
  500: zF,
  info: () => un(Ck, null),
  success: () => un(kk, null),
  warning: () => un(Pk, null),
  error: () => un(fk, null)
}, IF = Object.assign(Object.assign({}, _e.props), {
  size: {
    type: String,
    default: "medium"
  },
  status: {
    type: String,
    default: "info"
  },
  title: String,
  description: String
}), VF = OF({
  name: "Result",
  props: IF,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = je(e), o = _e("Result", "-result", FF, ez, e, t), r = rp(() => {
      const {
        size: l,
        status: a
      } = e, {
        common: {
          cubicBezierEaseInOut: s
        },
        self: {
          textColor: d,
          lineHeight: c,
          titleTextColor: h,
          titleFontWeight: p,
          [ie("iconColor", a)]: v,
          [ie("fontSize", l)]: f,
          [ie("titleFontSize", l)]: g,
          [ie("iconSize", l)]: m
        }
      } = o.value;
      return {
        "--n-bezier": s,
        "--n-font-size": f,
        "--n-icon-size": m,
        "--n-line-height": c,
        "--n-text-color": d,
        "--n-title-font-size": g,
        "--n-title-font-weight": p,
        "--n-title-text-color": h,
        "--n-icon-color": v || ""
      };
    }), i = n ? St("result", rp(() => {
      const {
        size: l,
        status: a
      } = e;
      let s = "";
      return l && (s += l[0]), a && (s += a[0]), s;
    }), r, e) : void 0;
    return {
      mergedClsPrefix: t,
      cssVars: n ? void 0 : r,
      themeClass: i == null ? void 0 : i.themeClass,
      onRender: i == null ? void 0 : i.onRender
    };
  },
  render() {
    var e;
    const {
      status: t,
      $slots: n,
      mergedClsPrefix: o,
      onRender: r
    } = this;
    return r == null || r(), un("div", {
      class: [`${o}-result`, this.themeClass],
      style: this.cssVars
    }, un("div", {
      class: `${o}-result-icon`
    }, ((e = n.icon) === null || e === void 0 ? void 0 : e.call(n)) || un(_t, {
      clsPrefix: o
    }, {
      default: () => MF[t]()
    })), un("div", {
      class: `${o}-result-header`
    }, this.title ? un("div", {
      class: `${o}-result-header__title`
    }, this.title) : null, this.description ? un("div", {
      class: `${o}-result-header__description`
    }, this.description) : null), n.default && un("div", {
      class: `${o}-result-content`
    }, n), n.footer && un("div", {
      class: `${o}-result-footer`
    }, n.footer()));
  }
}), AF = P("switch", `
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`, [L("children-placeholder", `
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `), L("rail-placeholder", `
 display: flex;
 flex-wrap: none;
 `), L("button-placeholder", `
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `), P("base-loading", `
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `, [hn({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})]), L("checked, unchecked", `
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
 `), L("checked", `
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), L("unchecked", `
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), I("&:focus", [L("rail", `
 box-shadow: var(--n-box-shadow-focus);
 `)]), N("round", [L("rail", "border-radius: calc(var(--n-rail-height) / 2);", [L("button", "border-radius: calc(var(--n-button-height) / 2);")])]), rt("disabled", [rt("icon", [N("rubber-band", [N("pressed", [L("rail", [L("button", "max-width: var(--n-button-width-pressed);")])]), L("rail", [I("&:active", [L("button", "max-width: var(--n-button-width-pressed);")])]), N("active", [N("pressed", [L("rail", [L("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]), L("rail", [I("&:active", [L("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]), N("active", [L("rail", [L("button", "left: calc(100% - var(--n-button-width) - var(--n-offset))")])]), L("rail", `
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
 `, [L("button-icon", `
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
 `, [hn()]), L("button", `
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
 `)]), N("active", [L("rail", "background-color: var(--n-rail-color-active);")]), N("loading", [L("rail", `
 cursor: wait;
 `)]), N("disabled", [L("rail", `
 cursor: not-allowed;
 opacity: .5;
 `)])]), Va = window.Vue.computed, BF = window.Vue.defineComponent, tn = window.Vue.h, Vs = window.Vue.ref, LF = window.Vue.toRef;
window.Vue.watchEffect;
const DF = Object.assign(Object.assign({}, _e.props), {
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
let ai;
const Vn = BF({
  name: "Switch",
  props: DF,
  slots: Object,
  setup(e) {
    ai === void 0 && (typeof CSS < "u" ? typeof CSS.supports < "u" ? ai = CSS.supports("width", "max(1px)") : ai = !1 : ai = !0);
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = je(e), o = _e("Switch", "-switch", AF, oz, e, t), r = lo(e), {
      mergedSizeRef: i,
      mergedDisabledRef: l
    } = r, a = Vs(e.defaultValue), s = LF(e, "value"), d = Ot(s, a), c = Va(() => d.value === e.checkedValue), h = Vs(!1), p = Vs(!1), v = Va(() => {
      const {
        railStyle: E
      } = e;
      if (E)
        return E({
          focused: p.value,
          checked: c.value
        });
    });
    function f(E) {
      const {
        "onUpdate:value": R,
        onChange: O,
        onUpdateValue: W
      } = e, {
        nTriggerFormInput: _,
        nTriggerFormChange: V
      } = r;
      R && ue(R, E), W && ue(W, E), O && ue(O, E), a.value = E, _(), V();
    }
    function g() {
      const {
        nTriggerFormFocus: E
      } = r;
      E();
    }
    function m() {
      const {
        nTriggerFormBlur: E
      } = r;
      E();
    }
    function u() {
      e.loading || l.value || (d.value !== e.checkedValue ? f(e.checkedValue) : f(e.uncheckedValue));
    }
    function w() {
      p.value = !0, g();
    }
    function $() {
      p.value = !1, m(), h.value = !1;
    }
    function b(E) {
      e.loading || l.value || E.key === " " && (d.value !== e.checkedValue ? f(e.checkedValue) : f(e.uncheckedValue), h.value = !1);
    }
    function S(E) {
      e.loading || l.value || E.key === " " && (E.preventDefault(), h.value = !0);
    }
    const C = Va(() => {
      const {
        value: E
      } = i, {
        self: {
          opacityDisabled: R,
          railColor: O,
          railColorActive: W,
          buttonBoxShadow: _,
          buttonColor: V,
          boxShadowFocus: B,
          loadingColor: M,
          textColor: G,
          iconColor: U,
          [ie("buttonHeight", E)]: Q,
          [ie("buttonWidth", E)]: oe,
          [ie("buttonWidthPressed", E)]: ne,
          [ie("railHeight", E)]: X,
          [ie("railWidth", E)]: j,
          [ie("railBorderRadius", E)]: Z,
          [ie("buttonBorderRadius", E)]: te
        },
        common: {
          cubicBezierEaseInOut: fe
        }
      } = o.value;
      let he, ve, ye;
      return ai ? (he = `calc((${X} - ${Q}) / 2)`, ve = `max(${X}, ${Q})`, ye = `max(${j}, calc(${j} + ${Q} - ${X}))`) : (he = ht((zt(X) - zt(Q)) / 2), ve = ht(Math.max(zt(X), zt(Q))), ye = zt(X) > zt(Q) ? j : ht(zt(j) + zt(Q) - zt(X))), {
        "--n-bezier": fe,
        "--n-button-border-radius": te,
        "--n-button-box-shadow": _,
        "--n-button-color": V,
        "--n-button-width": oe,
        "--n-button-width-pressed": ne,
        "--n-button-height": Q,
        "--n-height": ve,
        "--n-offset": he,
        "--n-opacity-disabled": R,
        "--n-rail-border-radius": Z,
        "--n-rail-color": O,
        "--n-rail-color-active": W,
        "--n-rail-height": X,
        "--n-rail-width": j,
        "--n-width": ye,
        "--n-box-shadow-focus": B,
        "--n-loading-color": M,
        "--n-text-color": G,
        "--n-icon-color": U
      };
    }), y = n ? St("switch", Va(() => i.value[0]), C, e) : void 0;
    return {
      handleClick: u,
      handleBlur: $,
      handleFocus: w,
      handleKeyup: b,
      handleKeydown: S,
      mergedRailStyle: v,
      pressed: h,
      mergedClsPrefix: t,
      mergedValue: d,
      checked: c,
      mergedDisabled: l,
      cssVars: n ? void 0 : C,
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
    } = i, h = !(xr(s) && xr(d) && xr(c));
    return tn("div", {
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
    }, tn("div", {
      class: `${e}-switch__rail`,
      "aria-hidden": "true",
      style: o
    }, Ye(l, (p) => Ye(a, (v) => p || v ? tn("div", {
      "aria-hidden": !0,
      class: `${e}-switch__children-placeholder`
    }, tn("div", {
      class: `${e}-switch__rail-placeholder`
    }, tn("div", {
      class: `${e}-switch__button-placeholder`
    }), p), tn("div", {
      class: `${e}-switch__rail-placeholder`
    }, tn("div", {
      class: `${e}-switch__button-placeholder`
    }), v)) : null)), tn("div", {
      class: `${e}-switch__button`
    }, Ye(s, (p) => Ye(d, (v) => Ye(c, (f) => tn(_r, null, {
      default: () => this.loading ? tn(zr, {
        key: "loading",
        clsPrefix: e,
        strokeWidth: 20
      }) : this.checked && (v || p) ? tn("div", {
        class: `${e}-switch__button-icon`,
        key: v ? "checked-icon" : "icon"
      }, v || p) : !this.checked && (f || p) ? tn("div", {
        class: `${e}-switch__button-icon`,
        key: f ? "unchecked-icon" : "icon"
      }, f || p) : null
    })))), Ye(l, (p) => p && tn("div", {
      key: "checked",
      class: `${e}-switch__checked`
    }, p)), Ye(a, (p) => p && tn("div", {
      key: "unchecked",
      class: `${e}-switch__unchecked`
    }, p)))));
  }
}), xc = "n-tabs", NF = window.Vue.defineComponent, HF = window.Vue.h, jF = window.Vue.inject;
window.Vue.watchEffect;
const Yg = {
  tab: [String, Number, Object, Function],
  name: {
    type: [String, Number],
    required: !0
  },
  disabled: Boolean,
  displayDirective: {
    type: String,
    default: "if"
  },
  closable: {
    type: Boolean,
    default: void 0
  },
  tabProps: Object,
  /** @deprecated */
  label: [String, Number, Object, Function]
}, As = NF({
  __TAB_PANE__: !0,
  name: "TabPane",
  alias: ["TabPanel"],
  props: Yg,
  slots: Object,
  setup(e) {
    const t = jF(xc, null);
    return t || qd("tab-pane", "`n-tab-pane` must be placed inside `n-tabs`."), {
      style: t.paneStyleRef,
      class: t.paneClassRef,
      mergedClsPrefix: t.mergedClsPrefixRef
    };
  },
  render() {
    return HF("div", {
      class: [`${this.mergedClsPrefix}-tab-pane`, this.class],
      style: this.style
    }, this.$slots);
  }
}), WF = window.Vue.computed, UF = window.Vue.defineComponent, KF = window.Vue.Fragment, no = window.Vue.h, qF = window.Vue.inject, GF = window.Vue.mergeProps, XF = Object.assign({
  internalLeftPadded: Boolean,
  internalAddable: Boolean,
  internalCreatedByPane: Boolean
}, Xd(Yg, ["displayDirective"])), kd = UF({
  __TAB__: !0,
  inheritAttrs: !1,
  name: "Tab",
  props: XF,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      valueRef: n,
      typeRef: o,
      closableRef: r,
      tabStyleRef: i,
      addTabStyleRef: l,
      tabClassRef: a,
      addTabClassRef: s,
      tabChangeIdRef: d,
      onBeforeLeaveRef: c,
      triggerRef: h,
      handleAdd: p,
      activateTab: v,
      handleClose: f
    } = qF(xc);
    return {
      trigger: h,
      mergedClosable: WF(() => {
        if (e.internalAddable) return !1;
        const {
          closable: g
        } = e;
        return g === void 0 ? r.value : g;
      }),
      style: i,
      addStyle: l,
      tabClass: a,
      addTabClass: s,
      clsPrefix: t,
      value: n,
      type: o,
      handleClose(g) {
        g.stopPropagation(), !e.disabled && f(e.name);
      },
      activateTab() {
        if (e.disabled) return;
        if (e.internalAddable) {
          p();
          return;
        }
        const {
          name: g
        } = e, m = ++d.id;
        if (g !== n.value) {
          const {
            value: u
          } = c;
          u ? Promise.resolve(u(e.name, n.value)).then((w) => {
            w && d.id === m && v(g);
          }) : v(g);
        }
      }
    };
  },
  render() {
    const {
      internalAddable: e,
      clsPrefix: t,
      name: n,
      disabled: o,
      label: r,
      tab: i,
      value: l,
      mergedClosable: a,
      trigger: s,
      $slots: {
        default: d
      }
    } = this, c = r ?? i;
    return no("div", {
      class: `${t}-tabs-tab-wrapper`
    }, this.internalLeftPadded ? no("div", {
      class: `${t}-tabs-tab-pad`
    }) : null, no("div", Object.assign({
      key: n,
      "data-name": n,
      "data-disabled": o ? !0 : void 0
    }, GF({
      class: [`${t}-tabs-tab`, l === n && `${t}-tabs-tab--active`, o && `${t}-tabs-tab--disabled`, a && `${t}-tabs-tab--closable`, e && `${t}-tabs-tab--addable`, e ? this.addTabClass : this.tabClass],
      onClick: s === "click" ? this.activateTab : void 0,
      onMouseenter: s === "hover" ? this.activateTab : void 0,
      style: e ? this.addStyle : this.style
    }, this.internalCreatedByPane ? this.tabProps || {} : this.$attrs)), no("span", {
      class: `${t}-tabs-tab__label`
    }, e ? no(KF, null, no("div", {
      class: `${t}-tabs-tab__height-placeholder`
    }, " "), no(_t, {
      clsPrefix: t
    }, {
      default: () => no(Qv, null)
    })) : d ? d() : typeof c == "object" ? c : $n(c ?? n)), a && this.type === "card" ? no(hl, {
      clsPrefix: t,
      class: `${t}-tabs-tab__close`,
      onClick: this.handleClose,
      disabled: o
    }) : null));
  }
}), YF = P("tabs", `
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`, [N("segment-type", [P("tabs-rail", [I("&.transition-disabled", [P("tabs-capsule", `
 transition: none;
 `)])])]), N("top", [P("tab-pane", `
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]), N("left", [P("tab-pane", `
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]), N("left, right", `
 flex-direction: row;
 `, [P("tabs-bar", `
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `), P("tabs-tab", `
 padding: var(--n-tab-padding-vertical); 
 `)]), N("right", `
 flex-direction: row-reverse;
 `, [P("tab-pane", `
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `), P("tabs-bar", `
 left: 0;
 `)]), N("bottom", `
 flex-direction: column-reverse;
 justify-content: flex-end;
 `, [P("tab-pane", `
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `), P("tabs-bar", `
 top: 0;
 `)]), P("tabs-rail", `
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `, [P("tabs-capsule", `
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `), P("tabs-tab-wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `, [P("tabs-tab", `
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `, [N("active", `
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `), I("&:hover", `
 color: var(--n-tab-text-color-hover);
 `)])])]), N("flex", [P("tabs-nav", `
 width: 100%;
 position: relative;
 `, [P("tabs-wrapper", `
 width: 100%;
 `, [P("tabs-tab", `
 margin-right: 0;
 `)])])]), P("tabs-nav", `
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `, [L("prefix, suffix", `
 display: flex;
 align-items: center;
 `), L("prefix", "padding-right: 16px;"), L("suffix", "padding-left: 16px;")]), N("top, bottom", [I(">", [P("tabs-nav", [P("tabs-nav-scroll-wrapper", [I("&::before", `
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `), I("&::after", `
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `), N("shadow-start", [I("&::before", `
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]), N("shadow-end", [I("&::after", `
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]), N("left, right", [P("tabs-nav-scroll-content", `
 flex-direction: column;
 `), I(">", [P("tabs-nav", [P("tabs-nav-scroll-wrapper", [I("&::before", `
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `), I("&::after", `
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `), N("shadow-start", [I("&::before", `
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]), N("shadow-end", [I("&::after", `
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]), P("tabs-nav-scroll-wrapper", `
 flex: 1;
 position: relative;
 overflow: hidden;
 `, [P("tabs-nav-y-scroll", `
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `, [I("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `)]), I("&::before, &::after", `
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]), P("tabs-nav-scroll-content", `
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `), P("tabs-wrapper", `
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `), P("tabs-tab-wrapper", `
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `), P("tabs-tab", `
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `, [N("disabled", {
  cursor: "not-allowed"
}), L("close", `
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), L("label", `
 display: flex;
 align-items: center;
 z-index: 1;
 `)]), P("tabs-bar", `
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `, [I("&.transition-disabled", `
 transition: none;
 `), N("disabled", `
 background-color: var(--n-tab-text-color-disabled)
 `)]), P("tabs-pane-wrapper", `
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `), P("tab-pane", `
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `, [I("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active", `
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `), I("&.next-transition-leave-active, &.prev-transition-leave-active", `
 position: absolute;
 `), I("&.next-transition-enter-from, &.prev-transition-leave-to", `
 transform: translateX(32px);
 opacity: 0;
 `), I("&.next-transition-leave-to, &.prev-transition-enter-from", `
 transform: translateX(-32px);
 opacity: 0;
 `), I("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to", `
 transform: translateX(0);
 opacity: 1;
 `)]), P("tabs-tab-pad", `
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `), N("line-type, bar-type", [P("tabs-tab", `
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `, [I("&:hover", {
  color: "var(--n-tab-text-color-hover)"
}), N("active", `
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `), N("disabled", {
  color: "var(--n-tab-text-color-disabled)"
})])]), P("tabs-nav", [N("line-type", [N("top", [L("prefix, suffix", `
 border-bottom: 1px solid var(--n-tab-border-color);
 `), P("tabs-nav-scroll-content", `
 border-bottom: 1px solid var(--n-tab-border-color);
 `), P("tabs-bar", `
 bottom: -1px;
 `)]), N("left", [L("prefix, suffix", `
 border-right: 1px solid var(--n-tab-border-color);
 `), P("tabs-nav-scroll-content", `
 border-right: 1px solid var(--n-tab-border-color);
 `), P("tabs-bar", `
 right: -1px;
 `)]), N("right", [L("prefix, suffix", `
 border-left: 1px solid var(--n-tab-border-color);
 `), P("tabs-nav-scroll-content", `
 border-left: 1px solid var(--n-tab-border-color);
 `), P("tabs-bar", `
 left: -1px;
 `)]), N("bottom", [L("prefix, suffix", `
 border-top: 1px solid var(--n-tab-border-color);
 `), P("tabs-nav-scroll-content", `
 border-top: 1px solid var(--n-tab-border-color);
 `), P("tabs-bar", `
 top: -1px;
 `)]), L("prefix, suffix", `
 transition: border-color .3s var(--n-bezier);
 `), P("tabs-nav-scroll-content", `
 transition: border-color .3s var(--n-bezier);
 `), P("tabs-bar", `
 border-radius: 0;
 `)]), N("card-type", [L("prefix, suffix", `
 transition: border-color .3s var(--n-bezier);
 `), P("tabs-pad", `
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `), P("tabs-tab-pad", `
 transition: border-color .3s var(--n-bezier);
 `), P("tabs-tab", `
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `, [N("addable", `
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `, [L("height-placeholder", `
 width: 0;
 font-size: var(--n-tab-font-size);
 `), rt("disabled", [I("&:hover", `
 color: var(--n-tab-text-color-hover);
 `)])]), N("closable", "padding-right: 8px;"), N("active", `
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `), N("disabled", "color: var(--n-tab-text-color-disabled);")])]), N("left, right", `
 flex-direction: column; 
 `, [L("prefix, suffix", `
 padding: var(--n-tab-padding-vertical);
 `), P("tabs-wrapper", `
 flex-direction: column;
 `), P("tabs-tab-wrapper", `
 flex-direction: column;
 `, [P("tabs-tab-pad", `
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]), N("top", [N("card-type", [P("tabs-scroll-padding", "border-bottom: 1px solid var(--n-tab-border-color);"), L("prefix, suffix", `
 border-bottom: 1px solid var(--n-tab-border-color);
 `), P("tabs-tab", `
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `, [N("active", `
 border-bottom: 1px solid #0000;
 `)]), P("tabs-tab-pad", `
 border-bottom: 1px solid var(--n-tab-border-color);
 `), P("tabs-pad", `
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]), N("left", [N("card-type", [P("tabs-scroll-padding", "border-right: 1px solid var(--n-tab-border-color);"), L("prefix, suffix", `
 border-right: 1px solid var(--n-tab-border-color);
 `), P("tabs-tab", `
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `, [N("active", `
 border-right: 1px solid #0000;
 `)]), P("tabs-tab-pad", `
 border-right: 1px solid var(--n-tab-border-color);
 `), P("tabs-pad", `
 border-right: 1px solid var(--n-tab-border-color);
 `)])]), N("right", [N("card-type", [P("tabs-scroll-padding", "border-left: 1px solid var(--n-tab-border-color);"), L("prefix, suffix", `
 border-left: 1px solid var(--n-tab-border-color);
 `), P("tabs-tab", `
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `, [N("active", `
 border-left: 1px solid #0000;
 `)]), P("tabs-tab-pad", `
 border-left: 1px solid var(--n-tab-border-color);
 `), P("tabs-pad", `
 border-left: 1px solid var(--n-tab-border-color);
 `)])]), N("bottom", [N("card-type", [P("tabs-scroll-padding", "border-top: 1px solid var(--n-tab-border-color);"), L("prefix, suffix", `
 border-top: 1px solid var(--n-tab-border-color);
 `), P("tabs-tab", `
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `, [N("active", `
 border-top: 1px solid #0000;
 `)]), P("tabs-tab-pad", `
 border-top: 1px solid var(--n-tab-border-color);
 `), P("tabs-pad", `
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]), ZF = window.Vue.cloneVNode, Bs = window.Vue.computed, JF = window.Vue.defineComponent, gt = window.Vue.h, Ls = window.Vue.nextTick, QF = window.Vue.onMounted, eO = window.Vue.provide, rn = window.Vue.ref, An = window.Vue.toRef, tO = window.Vue.TransitionGroup, nO = window.Vue.vShow, Ds = window.Vue.watch, oO = window.Vue.watchEffect, rO = window.Vue.withDirectives, Ns = zR, iO = Object.assign(Object.assign({}, _e.props), {
  value: [String, Number],
  defaultValue: [String, Number],
  trigger: {
    type: String,
    default: "click"
  },
  type: {
    type: String,
    default: "bar"
  },
  closable: Boolean,
  justifyContent: String,
  size: {
    type: String,
    default: "medium"
  },
  placement: {
    type: String,
    default: "top"
  },
  tabStyle: [String, Object],
  tabClass: String,
  addTabStyle: [String, Object],
  addTabClass: String,
  barWidth: Number,
  paneClass: String,
  paneStyle: [String, Object],
  paneWrapperClass: String,
  paneWrapperStyle: [String, Object],
  addable: [Boolean, Object],
  tabsPadding: {
    type: Number,
    default: 0
  },
  animated: Boolean,
  onBeforeLeave: Function,
  onAdd: Function,
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  onClose: [Function, Array],
  // deprecated
  labelSize: String,
  activeName: [String, Number],
  onActiveNameChange: [Function, Array]
}), aO = JF({
  name: "Tabs",
  props: iO,
  slots: Object,
  setup(e, {
    slots: t
  }) {
    var n, o, r, i;
    const {
      mergedClsPrefixRef: l,
      inlineThemeDisabled: a
    } = je(e), s = _e("Tabs", "-tabs", YF, az, e, l), d = rn(null), c = rn(null), h = rn(null), p = rn(null), v = rn(null), f = rn(null), g = rn(!0), m = rn(!0), u = Ka(e, ["labelSize", "size"]), w = Ka(e, ["activeName", "value"]), $ = rn((o = (n = w.value) !== null && n !== void 0 ? n : e.defaultValue) !== null && o !== void 0 ? o : t.default ? (i = (r = io(t.default())[0]) === null || r === void 0 ? void 0 : r.props) === null || i === void 0 ? void 0 : i.name : null), b = Ot(w, $), S = {
      id: 0
    }, C = Bs(() => {
      if (!(!e.justifyContent || e.type === "card"))
        return {
          display: "flex",
          justifyContent: e.justifyContent
        };
    });
    Ds(b, () => {
      S.id = 0, W(), _();
    });
    function y() {
      var z;
      const {
        value: H
      } = b;
      return H === null ? null : (z = d.value) === null || z === void 0 ? void 0 : z.querySelector(`[data-name="${H}"]`);
    }
    function E(z) {
      if (e.type === "card") return;
      const {
        value: H
      } = c;
      if (!H) return;
      const re = H.style.opacity === "0";
      if (z) {
        const le = `${l.value}-tabs-bar--disabled`, {
          barWidth: F,
          placement: K
        } = e;
        if (z.dataset.disabled === "true" ? H.classList.add(le) : H.classList.remove(le), ["top", "bottom"].includes(K)) {
          if (O(["top", "maxHeight", "height"]), typeof F == "number" && z.offsetWidth >= F) {
            const be = Math.floor((z.offsetWidth - F) / 2) + z.offsetLeft;
            H.style.left = `${be}px`, H.style.maxWidth = `${F}px`;
          } else
            H.style.left = `${z.offsetLeft}px`, H.style.maxWidth = `${z.offsetWidth}px`;
          H.style.width = "8192px", re && (H.style.transition = "none"), H.offsetWidth, re && (H.style.transition = "", H.style.opacity = "1");
        } else {
          if (O(["left", "maxWidth", "width"]), typeof F == "number" && z.offsetHeight >= F) {
            const be = Math.floor((z.offsetHeight - F) / 2) + z.offsetTop;
            H.style.top = `${be}px`, H.style.maxHeight = `${F}px`;
          } else
            H.style.top = `${z.offsetTop}px`, H.style.maxHeight = `${z.offsetHeight}px`;
          H.style.height = "8192px", re && (H.style.transition = "none"), H.offsetHeight, re && (H.style.transition = "", H.style.opacity = "1");
        }
      }
    }
    function R() {
      if (e.type === "card") return;
      const {
        value: z
      } = c;
      z && (z.style.opacity = "0");
    }
    function O(z) {
      const {
        value: H
      } = c;
      if (H)
        for (const re of z)
          H.style[re] = "";
    }
    function W() {
      if (e.type === "card") return;
      const z = y();
      z ? E(z) : R();
    }
    function _() {
      var z;
      const H = (z = v.value) === null || z === void 0 ? void 0 : z.$el;
      if (!H) return;
      const re = y();
      if (!re) return;
      const {
        scrollLeft: le,
        offsetWidth: F
      } = H, {
        offsetLeft: K,
        offsetWidth: be
      } = re;
      le > K ? H.scrollTo({
        top: 0,
        left: K,
        behavior: "smooth"
      }) : K + be > le + F && H.scrollTo({
        top: 0,
        left: K + be - F,
        behavior: "smooth"
      });
    }
    const V = rn(null);
    let B = 0, M = null;
    function G(z) {
      const H = V.value;
      if (H) {
        B = z.getBoundingClientRect().height;
        const re = `${B}px`, le = () => {
          H.style.height = re, H.style.maxHeight = re;
        };
        M ? (le(), M(), M = null) : M = le;
      }
    }
    function U(z) {
      const H = V.value;
      if (H) {
        const re = z.getBoundingClientRect().height, le = () => {
          document.body.offsetHeight, H.style.maxHeight = `${re}px`, H.style.height = `${Math.max(B, re)}px`;
        };
        M ? (M(), M = null, le()) : M = le;
      }
    }
    function Q() {
      const z = V.value;
      if (z) {
        z.style.maxHeight = "", z.style.height = "";
        const {
          paneWrapperStyle: H
        } = e;
        if (typeof H == "string")
          z.style.cssText = H;
        else if (H) {
          const {
            maxHeight: re,
            height: le
          } = H;
          re !== void 0 && (z.style.maxHeight = re), le !== void 0 && (z.style.height = le);
        }
      }
    }
    const oe = {
      value: []
    }, ne = rn("next");
    function X(z) {
      const H = b.value;
      let re = "next";
      for (const le of oe.value) {
        if (le === H)
          break;
        if (le === z) {
          re = "prev";
          break;
        }
      }
      ne.value = re, j(z);
    }
    function j(z) {
      const {
        onActiveNameChange: H,
        onUpdateValue: re,
        "onUpdate:value": le
      } = e;
      H && ue(H, z), re && ue(re, z), le && ue(le, z), $.value = z;
    }
    function Z(z) {
      const {
        onClose: H
      } = e;
      H && ue(H, z);
    }
    function te() {
      const {
        value: z
      } = c;
      if (!z) return;
      const H = "transition-disabled";
      z.classList.add(H), W(), z.classList.remove(H);
    }
    const fe = rn(null);
    function he({
      transitionDisabled: z
    }) {
      const H = d.value;
      if (!H) return;
      z && H.classList.add("transition-disabled");
      const re = y();
      re && fe.value && (fe.value.style.width = `${re.offsetWidth}px`, fe.value.style.height = `${re.offsetHeight}px`, fe.value.style.transform = `translateX(${re.offsetLeft - zt(getComputedStyle(H).paddingLeft)}px)`, z && fe.value.offsetWidth), z && H.classList.remove("transition-disabled");
    }
    Ds([b], () => {
      e.type === "segment" && Ls(() => {
        he({
          transitionDisabled: !1
        });
      });
    }), QF(() => {
      e.type === "segment" && he({
        transitionDisabled: !0
      });
    });
    let ve = 0;
    function ye(z) {
      var H;
      if (z.contentRect.width === 0 && z.contentRect.height === 0 || ve === z.contentRect.width)
        return;
      ve = z.contentRect.width;
      const {
        type: re
      } = e;
      if ((re === "line" || re === "bar") && te(), re !== "segment") {
        const {
          placement: le
        } = e;
        Re((le === "top" || le === "bottom" ? (H = v.value) === null || H === void 0 ? void 0 : H.$el : f.value) || null);
      }
    }
    const J = Ns(ye, 64);
    Ds([() => e.justifyContent, () => e.size], () => {
      Ls(() => {
        const {
          type: z
        } = e;
        (z === "line" || z === "bar") && te();
      });
    });
    const ge = rn(!1);
    function Ee(z) {
      var H;
      const {
        target: re,
        contentRect: {
          width: le,
          height: F
        }
      } = z, K = re.parentElement.parentElement.offsetWidth, be = re.parentElement.parentElement.offsetHeight, {
        placement: Pe
      } = e;
      if (!ge.value)
        Pe === "top" || Pe === "bottom" ? K < le && (ge.value = !0) : be < F && (ge.value = !0);
      else {
        const {
          value: Ke
        } = p;
        if (!Ke) return;
        Pe === "top" || Pe === "bottom" ? K - le > Ke.$el.offsetWidth && (ge.value = !1) : be - F > Ke.$el.offsetHeight && (ge.value = !1);
      }
      Re(((H = v.value) === null || H === void 0 ? void 0 : H.$el) || null);
    }
    const xe = Ns(Ee, 64);
    function Te() {
      const {
        onAdd: z
      } = e;
      z && z(), Ls(() => {
        const H = y(), {
          value: re
        } = v;
        !H || !re || re.scrollTo({
          left: H.offsetLeft,
          top: 0,
          behavior: "smooth"
        });
      });
    }
    function Re(z) {
      if (!z) return;
      const {
        placement: H
      } = e;
      if (H === "top" || H === "bottom") {
        const {
          scrollLeft: re,
          scrollWidth: le,
          offsetWidth: F
        } = z;
        g.value = re <= 0, m.value = re + F >= le;
      } else {
        const {
          scrollTop: re,
          scrollHeight: le,
          offsetHeight: F
        } = z;
        g.value = re <= 0, m.value = re + F >= le;
      }
    }
    const Le = Ns((z) => {
      Re(z.target);
    }, 64);
    eO(xc, {
      triggerRef: An(e, "trigger"),
      tabStyleRef: An(e, "tabStyle"),
      tabClassRef: An(e, "tabClass"),
      addTabStyleRef: An(e, "addTabStyle"),
      addTabClassRef: An(e, "addTabClass"),
      paneClassRef: An(e, "paneClass"),
      paneStyleRef: An(e, "paneStyle"),
      mergedClsPrefixRef: l,
      typeRef: An(e, "type"),
      closableRef: An(e, "closable"),
      valueRef: b,
      tabChangeIdRef: S,
      onBeforeLeaveRef: An(e, "onBeforeLeave"),
      activateTab: X,
      handleClose: Z,
      handleAdd: Te
    }), Jp(() => {
      W(), _();
    }), oO(() => {
      const {
        value: z
      } = h;
      if (!z) return;
      const {
        value: H
      } = l, re = `${H}-tabs-nav-scroll-wrapper--shadow-start`, le = `${H}-tabs-nav-scroll-wrapper--shadow-end`;
      g.value ? z.classList.remove(re) : z.classList.add(re), m.value ? z.classList.remove(le) : z.classList.add(le);
    });
    const Fe = {
      syncBarPosition: () => {
        W();
      }
    }, de = () => {
      he({
        transitionDisabled: !0
      });
    }, T = Bs(() => {
      const {
        value: z
      } = u, {
        type: H
      } = e, re = {
        card: "Card",
        bar: "Bar",
        line: "Line",
        segment: "Segment"
      }[H], le = `${z}${re}`, {
        self: {
          barColor: F,
          closeIconColor: K,
          closeIconColorHover: be,
          closeIconColorPressed: Pe,
          tabColor: Ke,
          tabBorderColor: ct,
          paneTextColor: qe,
          tabFontWeight: Ge,
          tabBorderRadius: vt,
          tabFontWeightActive: Ne,
          colorSegment: we,
          fontWeightStrong: D,
          tabColorSegment: x,
          closeSize: A,
          closeIconSize: ee,
          closeColorHover: Y,
          closeColorPressed: ae,
          closeBorderRadius: me,
          [ie("panePadding", z)]: pe,
          [ie("tabPadding", le)]: Ce,
          [ie("tabPaddingVertical", le)]: Ie,
          [ie("tabGap", le)]: Xe,
          [ie("tabGap", `${le}Vertical`)]: Me,
          [ie("tabTextColor", H)]: ut,
          [ie("tabTextColorActive", H)]: lt,
          [ie("tabTextColorHover", H)]: $t,
          [ie("tabTextColorDisabled", H)]: tt,
          [ie("tabFontSize", z)]: kt
        },
        common: {
          cubicBezierEaseInOut: Xt
        }
      } = s.value;
      return {
        "--n-bezier": Xt,
        "--n-color-segment": we,
        "--n-bar-color": F,
        "--n-tab-font-size": kt,
        "--n-tab-text-color": ut,
        "--n-tab-text-color-active": lt,
        "--n-tab-text-color-disabled": tt,
        "--n-tab-text-color-hover": $t,
        "--n-pane-text-color": qe,
        "--n-tab-border-color": ct,
        "--n-tab-border-radius": vt,
        "--n-close-size": A,
        "--n-close-icon-size": ee,
        "--n-close-color-hover": Y,
        "--n-close-color-pressed": ae,
        "--n-close-border-radius": me,
        "--n-close-icon-color": K,
        "--n-close-icon-color-hover": be,
        "--n-close-icon-color-pressed": Pe,
        "--n-tab-color": Ke,
        "--n-tab-font-weight": Ge,
        "--n-tab-font-weight-active": Ne,
        "--n-tab-padding": Ce,
        "--n-tab-padding-vertical": Ie,
        "--n-tab-gap": Xe,
        "--n-tab-gap-vertical": Me,
        "--n-pane-padding-left": Bt(pe, "left"),
        "--n-pane-padding-right": Bt(pe, "right"),
        "--n-pane-padding-top": Bt(pe, "top"),
        "--n-pane-padding-bottom": Bt(pe, "bottom"),
        "--n-font-weight-strong": D,
        "--n-tab-color-segment": x
      };
    }), k = a ? St("tabs", Bs(() => `${u.value[0]}${e.type[0]}`), T, e) : void 0;
    return Object.assign({
      mergedClsPrefix: l,
      mergedValue: b,
      renderedNames: /* @__PURE__ */ new Set(),
      segmentCapsuleElRef: fe,
      tabsPaneWrapperRef: V,
      tabsElRef: d,
      barElRef: c,
      addTabInstRef: p,
      xScrollInstRef: v,
      scrollWrapperElRef: h,
      addTabFixed: ge,
      tabWrapperStyle: C,
      handleNavResize: J,
      mergedSize: u,
      handleScroll: Le,
      handleTabsResize: xe,
      cssVars: a ? void 0 : T,
      themeClass: k == null ? void 0 : k.themeClass,
      animationDirection: ne,
      renderNameListRef: oe,
      yScrollElRef: f,
      handleSegmentResize: de,
      onAnimationBeforeLeave: G,
      onAnimationEnter: U,
      onAnimationAfterEnter: Q,
      onRender: k == null ? void 0 : k.onRender
    }, Fe);
  },
  render() {
    const {
      mergedClsPrefix: e,
      type: t,
      placement: n,
      addTabFixed: o,
      addable: r,
      mergedSize: i,
      renderNameListRef: l,
      onRender: a,
      paneWrapperClass: s,
      paneWrapperStyle: d,
      $slots: {
        default: c,
        prefix: h,
        suffix: p
      }
    } = this;
    a == null || a();
    const v = c ? io(c()).filter((S) => S.type.__TAB_PANE__ === !0) : [], f = c ? io(c()).filter((S) => S.type.__TAB__ === !0) : [], g = !f.length, m = t === "card", u = t === "segment", w = !m && !u && this.justifyContent;
    l.value = [];
    const $ = () => {
      const S = gt("div", {
        style: this.tabWrapperStyle,
        class: `${e}-tabs-wrapper`
      }, w ? null : gt("div", {
        class: `${e}-tabs-scroll-padding`,
        style: n === "top" || n === "bottom" ? {
          width: `${this.tabsPadding}px`
        } : {
          height: `${this.tabsPadding}px`
        }
      }), g ? v.map((C, y) => (l.value.push(C.props.name), Hs(gt(kd, Object.assign({}, C.props, {
        internalCreatedByPane: !0,
        internalLeftPadded: y !== 0 && (!w || w === "center" || w === "start" || w === "end")
      }), C.children ? {
        default: C.children.tab
      } : void 0)))) : f.map((C, y) => (l.value.push(C.props.name), Hs(y !== 0 && !w ? lp(C) : C))), !o && r && m ? ap(r, (g ? v.length : f.length) !== 0) : null, w ? null : gt("div", {
        class: `${e}-tabs-scroll-padding`,
        style: {
          width: `${this.tabsPadding}px`
        }
      }));
      return gt("div", {
        ref: "tabsElRef",
        class: `${e}-tabs-nav-scroll-content`
      }, m && r ? gt(Hn, {
        onResize: this.handleTabsResize
      }, {
        default: () => S
      }) : S, m ? gt("div", {
        class: `${e}-tabs-pad`
      }) : null, m ? null : gt("div", {
        ref: "barElRef",
        class: `${e}-tabs-bar`
      }));
    }, b = u ? "top" : n;
    return gt("div", {
      class: [`${e}-tabs`, this.themeClass, `${e}-tabs--${t}-type`, `${e}-tabs--${i}-size`, w && `${e}-tabs--flex`, `${e}-tabs--${b}`],
      style: this.cssVars
    }, gt("div", {
      class: [
        // the class should be applied here since it's possible
        // to make tabs nested in tabs, style may influence each
        // other. adding a class will make it easy to write the
        // style.
        `${e}-tabs-nav--${t}-type`,
        `${e}-tabs-nav--${b}`,
        `${e}-tabs-nav`
      ]
    }, Ye(h, (S) => S && gt("div", {
      class: `${e}-tabs-nav__prefix`
    }, S)), u ? gt(Hn, {
      onResize: this.handleSegmentResize
    }, {
      default: () => gt("div", {
        class: `${e}-tabs-rail`,
        ref: "tabsElRef"
      }, gt("div", {
        class: `${e}-tabs-capsule`,
        ref: "segmentCapsuleElRef"
      }, gt("div", {
        class: `${e}-tabs-wrapper`
      }, gt("div", {
        class: `${e}-tabs-tab`
      }))), g ? v.map((S, C) => (l.value.push(S.props.name), gt(kd, Object.assign({}, S.props, {
        internalCreatedByPane: !0,
        internalLeftPadded: C !== 0
      }), S.children ? {
        default: S.children.tab
      } : void 0))) : f.map((S, C) => (l.value.push(S.props.name), C === 0 ? S : lp(S))))
    }) : gt(Hn, {
      onResize: this.handleNavResize
    }, {
      default: () => gt("div", {
        class: `${e}-tabs-nav-scroll-wrapper`,
        ref: "scrollWrapperElRef"
      }, ["top", "bottom"].includes(b) ? gt(Mx, {
        ref: "xScrollInstRef",
        onScroll: this.handleScroll
      }, {
        default: $
      }) : gt("div", {
        class: `${e}-tabs-nav-y-scroll`,
        onScroll: this.handleScroll,
        ref: "yScrollElRef"
      }, $()))
    }), o && r && m ? ap(r, !0) : null, Ye(p, (S) => S && gt("div", {
      class: `${e}-tabs-nav__suffix`
    }, S))), g && (this.animated && (b === "top" || b === "bottom") ? gt("div", {
      ref: "tabsPaneWrapperRef",
      style: d,
      class: [`${e}-tabs-pane-wrapper`, s]
    }, ip(v, this.mergedValue, this.renderedNames, this.onAnimationBeforeLeave, this.onAnimationEnter, this.onAnimationAfterEnter, this.animationDirection)) : ip(v, this.mergedValue, this.renderedNames)));
  }
});
function ip(e, t, n, o, r, i, l) {
  const a = [];
  return e.forEach((s) => {
    const {
      name: d,
      displayDirective: c,
      "display-directive": h
    } = s.props, p = (f) => c === f || h === f, v = t === d;
    if (s.key !== void 0 && (s.key = d), v || p("show") || p("show:lazy") && n.has(d)) {
      n.has(d) || n.add(d);
      const f = !p("if");
      a.push(f ? rO(s, [[nO, v]]) : s);
    }
  }), l ? gt(tO, {
    name: `${l}-transition`,
    onBeforeLeave: o,
    onEnter: r,
    onAfterEnter: i
  }, {
    default: () => a
  }) : a;
}
function ap(e, t) {
  return gt(kd, {
    ref: "addTabInstRef",
    key: "__addable",
    name: "__addable",
    internalCreatedByPane: !0,
    internalAddable: !0,
    internalLeftPadded: t,
    disabled: typeof e == "object" && e.disabled
  });
}
function lp(e) {
  const t = ZF(e);
  return t.props ? t.props.internalLeftPadded = !0 : t.props = {
    internalLeftPadded: !0
  }, t;
}
function Hs(e) {
  return Array.isArray(e.dynamicProps) ? e.dynamicProps.includes("internalLeftPadded") || e.dynamicProps.push("internalLeftPadded") : e.dynamicProps = ["internalLeftPadded"], e;
}
const lO = window.Vue.defineComponent, ce = window.Vue.unref, Se = window.Vue.createVNode, Oe = window.Vue.withCtx, sp = window.Vue.resolveComponent, Bn = window.Vue.toDisplayString, Ln = window.Vue.createTextVNode, sO = window.Vue.resolveDynamicComponent, dp = window.Vue.isRef, li = window.Vue.openBlock, js = window.Vue.createBlock, cp = window.Vue.createCommentVNode, up = window.Vue.createElementBlock, dO = { class: "min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto" }, cO = {
  key: 1,
  class: "toolbar"
}, Ho = window.Vue.computed, uO = window.Vue.getCurrentInstance, it = window.Vue.h, fO = window.Vue.onBeforeUnmount, hO = window.Vue.onMounted, Ws = window.Vue.reactive, nn = window.Vue.ref, pO = /* @__PURE__ */ lO({
  __name: "CodegenView",
  setup(e) {
    const { t } = rl(), n = nn(!1);
    let o = null;
    function r() {
      if (o) {
        n.value = o.matches;
        return;
      }
      typeof window < "u" && (n.value = window.innerWidth <= 640);
    }
    hO(() => {
      typeof window > "u" || (o = window.matchMedia("(max-width: 640px)"), r(), o.addEventListener ? o.addEventListener("change", r) : o.addListener && o.addListener(r));
    }), fO(() => {
      o && (o.removeEventListener ? o.removeEventListener("change", r) : o.removeListener && o.removeListener(r), o = null);
    });
    const i = window.__TT_PLUGIN_API__, l = we(), a = (i == null ? void 0 : i.useTable) ?? l.useTable, s = (i == null ? void 0 : i.useTableOperate) ?? l.useTableOperate, d = nn(!1), c = nn(1), h = nn(!1), p = nn(null), v = nn([]), f = nn([]), g = nn([]), m = nn(!1), u = [
      { label: t("plugin.codegen.status.enabled"), value: "1" },
      { label: t("plugin.codegen.status.disabled"), value: "0" }
    ], w = Ho(() => [
      { label: t("plugin.codegen.renderType.input"), value: "input" },
      { label: t("plugin.codegen.renderType.textarea"), value: "textarea" },
      { label: t("plugin.codegen.renderType.number"), value: "number" },
      { label: t("plugin.codegen.renderType.select"), value: "select" },
      { label: t("plugin.codegen.renderType.radio"), value: "radio" },
      { label: t("plugin.codegen.renderType.switch"), value: "switch" },
      { label: t("plugin.codegen.renderType.date"), value: "date" },
      { label: t("plugin.codegen.renderType.datetime"), value: "datetime" },
      { label: t("plugin.codegen.renderType.daterange"), value: "daterange" },
      { label: t("plugin.codegen.renderType.datetimerange"), value: "datetimerange" }
    ]), $ = Ho(() => [
      { label: t("plugin.codegen.searchType.equal"), value: "equal" },
      { label: t("plugin.codegen.searchType.noEqual"), value: "noEqual" },
      { label: t("plugin.codegen.searchType.like"), value: "like" },
      { label: t("plugin.codegen.searchType.leftLike"), value: "leftLike" },
      { label: t("plugin.codegen.searchType.rightLike"), value: "rightLike" },
      { label: t("plugin.codegen.searchType.greaterThan"), value: "greaterThan" },
      { label: t("plugin.codegen.searchType.greaterThanOrEqual"), value: "greaterThanOrEqual" },
      { label: t("plugin.codegen.searchType.lessThan"), value: "lessThan" },
      { label: t("plugin.codegen.searchType.lessThanOrEqual"), value: "lessThanOrEqual" },
      { label: t("plugin.codegen.searchType.in"), value: "in" },
      { label: t("plugin.codegen.searchType.notIn"), value: "notIn" },
      { label: t("plugin.codegen.searchType.between"), value: "between" },
      { label: t("plugin.codegen.searchType.notBetween"), value: "notBetween" }
    ]), b = Ws(J()), S = {
      tableName: { required: !0, message: t("plugin.codegen.rules.tableName"), trigger: ["blur", "change"] },
      pluginId: { required: !0, message: t("plugin.codegen.rules.pluginId"), trigger: ["blur", "input"] },
      pluginName: { required: !0, message: t("plugin.codegen.rules.pluginName"), trigger: ["blur", "input"] },
      parentPackage: { required: !0, message: t("plugin.codegen.rules.parentPackage"), trigger: ["blur", "input"] },
      moduleName: { required: !0, message: t("plugin.codegen.rules.moduleName"), trigger: ["blur", "input"] },
      author: { required: !0, message: t("plugin.codegen.rules.author"), trigger: ["blur", "input"] }
    }, C = Ho(
      () => ve.value ? t("plugin.codegen.modal.edit") : t("plugin.codegen.modal.add")
    ), y = () => [
      { type: "selection", width: 48, align: "center" },
      { title: t("plugin.codegen.fields.tableName"), key: "tableName", width: 160, ellipsis: { tooltip: !0 } },
      { title: t("plugin.codegen.fields.tableComment"), key: "tableComment", width: 120, ellipsis: { tooltip: !0 } },
      { title: t("plugin.codegen.fields.tablePrefix"), key: "tablePrefix", width: 120 },
      { title: t("plugin.codegen.fields.parentPackage"), key: "parentPackage", width: 120, ellipsis: { tooltip: !0 } },
      { title: t("plugin.codegen.fields.moduleName"), key: "moduleName", width: 140 },
      { title: t("plugin.codegen.fields.author"), key: "author", width: 140, ellipsis: { tooltip: !0 } },
      { title: t("plugin.codegen.fields.pluginId"), key: "pluginId", width: 180, ellipsis: { tooltip: !0 } },
      {
        title: t("plugin.codegen.fields.status"),
        key: "status",
        width: 100,
        render: (D) => it(
          Da,
          { type: D.status === "1" ? "success" : "default", size: "small" },
          { default: () => D.status === "1" ? t("plugin.codegen.status.enabled") : t("plugin.codegen.status.disabled") }
        )
      },
      {
        title: t("plugin.codegen.fields.createTime"),
        key: "createTime",
        width: 180,
        render: (D) => ge(D.createTime)
      },
      {
        title: t("plugin.codegen.actions.action"),
        key: "action",
        width: 160,
        fixed: "right",
        render: (D) => it(ri, {}, {
          default: () => [
            it(
              qt,
              {
                size: "small",
                type: "primary",
                quaternary: !0,
                onClick: () => F(D)
              },
              { default: () => t("plugin.codegen.actions.edit") }
            ),
            it(
              qt,
              {
                size: "small",
                type: "error",
                quaternary: !0,
                onClick: () => Ke(D)
              },
              { default: () => t("plugin.codegen.actions.delete") }
            )
          ]
        })
      }
    ], E = [
      { title: t("plugin.codegen.column.ordinalPosition"), key: "ordinalPosition", width: 100 },
      { title: t("plugin.codegen.column.columnName"), key: "columnName", width: 160, ellipsis: { tooltip: !0 } },
      {
        title: t("plugin.codegen.column.propertyName"),
        key: "propertyName",
        width: 160,
        render: (D) => it(Rt, {
          value: D.propertyName,
          size: "small",
          "onUpdate:value": (x) => {
            D.propertyName = x;
          }
        })
      },
      {
        title: t("plugin.codegen.column.columnComment"),
        key: "columnComment",
        width: 180,
        render: (D) => it(Rt, {
          value: D.columnComment,
          size: "small",
          "onUpdate:value": (x) => {
            D.columnComment = x;
          }
        })
      },
      { title: t("plugin.codegen.column.dataType"), key: "dataType", width: 120 },
      { title: t("plugin.codegen.column.javaType"), key: "javaType", width: 120 },
      { title: t("plugin.codegen.column.typeScriptType"), key: "typeScriptType", width: 120 },
      {
        title: t("plugin.codegen.column.i18n"),
        key: "i18n",
        width: 100,
        render: (D) => it(Vn, {
          value: D.i18n,
          "onUpdate:value": (x) => {
            D.i18n = x;
          },
          checkedValue: "1",
          uncheckedValue: "0",
          size: "small"
        })
      },
      {
        title: t("plugin.codegen.column.required"),
        key: "required",
        width: 100,
        render: (D) => it(Vn, {
          value: D.required,
          "onUpdate:value": (x) => {
            D.required = x;
          },
          checkedValue: "1",
          uncheckedValue: "0",
          size: "small"
        })
      },
      {
        title: t("plugin.codegen.column.list"),
        key: "list",
        width: 100,
        render: (D) => it(Vn, {
          value: D.list,
          "onUpdate:value": (x) => {
            D.list = x;
          },
          checkedValue: "1",
          uncheckedValue: "0",
          size: "small"
        })
      },
      {
        title: t("plugin.codegen.column.search"),
        key: "search",
        width: 100,
        render: (D) => it(Vn, {
          value: D.search,
          "onUpdate:value": (x) => {
            D.search = x;
          },
          checkedValue: "1",
          uncheckedValue: "0",
          size: "small"
        })
      },
      {
        title: t("plugin.codegen.column.searchType"),
        key: "searchType",
        width: 160,
        render: (D) => it(br, {
          value: D.searchType,
          options: $.value,
          size: "small",
          clearable: !0,
          "onUpdate:value": (x) => {
            D.searchType = x;
          }
        })
      },
      {
        title: t("plugin.codegen.column.added"),
        key: "added",
        width: 100,
        render: (D) => it(Vn, {
          value: D.added,
          "onUpdate:value": (x) => {
            D.added = x;
          },
          checkedValue: "1",
          uncheckedValue: "0",
          size: "small"
        })
      },
      {
        title: t("plugin.codegen.column.edit"),
        key: "edit",
        width: 100,
        render: (D) => it(Vn, {
          value: D.edit,
          "onUpdate:value": (x) => {
            D.edit = x;
          },
          checkedValue: "1",
          uncheckedValue: "0",
          size: "small"
        })
      },
      {
        title: t("plugin.codegen.column.renderType"),
        key: "renderType",
        width: 160,
        render: (D) => it(br, {
          value: D.renderType,
          options: w.value,
          size: "small",
          clearable: !0,
          "onUpdate:value": (x) => {
            D.renderType = x;
          }
        })
      },
      {
        title: t("plugin.codegen.column.dictCode"),
        key: "dictCode",
        width: 180,
        render: (D) => it(br, {
          value: D.dictCode,
          options: f.value,
          size: "small",
          clearable: !0,
          filterable: !0,
          "onUpdate:value": (x) => {
            D.dictCode = x;
          }
        })
      },
      {
        title: t("plugin.codegen.column.formDisabled"),
        key: "formDisabled",
        width: 120,
        render: (D) => it(Vn, {
          value: D.formDisabled,
          "onUpdate:value": (x) => {
            D.formDisabled = x;
          },
          checkedValue: "1",
          uncheckedValue: "0",
          size: "small"
        })
      },
      {
        title: t("plugin.codegen.column.formReadonly"),
        key: "formReadonly",
        width: 120,
        render: (D) => it(Vn, {
          value: D.formReadonly,
          "onUpdate:value": (x) => {
            D.formReadonly = x;
          },
          checkedValue: "1",
          uncheckedValue: "0",
          size: "small"
        })
      },
      {
        title: t("plugin.codegen.column.minLength"),
        key: "minLength",
        width: 120,
        render: (D) => it(Co, {
          value: D.minLength,
          min: 0,
          max: 2e3,
          size: "small",
          class: "w-full",
          "onUpdate:value": (x) => {
            D.minLength = x ?? void 0;
          }
        })
      },
      {
        title: t("plugin.codegen.column.maxLength"),
        key: "maxLength",
        width: 120,
        render: (D) => it(Co, {
          value: D.maxLength,
          min: 0,
          max: 2e3,
          size: "small",
          class: "w-full",
          "onUpdate:value": (x) => {
            D.maxLength = x ?? void 0;
          }
        })
      },
      {
        title: t("plugin.codegen.column.minValue"),
        key: "minValue",
        width: 120,
        render: (D) => it(Co, {
          value: D.minValue,
          size: "small",
          class: "w-full",
          "onUpdate:value": (x) => {
            D.minValue = x ?? void 0;
          }
        })
      },
      {
        title: t("plugin.codegen.column.maxValue"),
        key: "maxValue",
        width: 120,
        render: (D) => it(Co, {
          value: D.maxValue,
          size: "small",
          class: "w-full",
          "onUpdate:value": (x) => {
            D.maxValue = x ?? void 0;
          }
        })
      },
      {
        title: t("plugin.codegen.column.pattern"),
        key: "pattern",
        width: 180,
        render: (D) => it(Rt, {
          value: D.pattern,
          size: "small",
          "onUpdate:value": (x) => {
            D.pattern = x;
          }
        })
      },
      {
        title: t("plugin.codegen.column.componentProps"),
        key: "componentProps",
        width: 200,
        render: (D) => it(Rt, {
          value: D.componentProps,
          size: "small",
          "onUpdate:value": (x) => {
            D.componentProps = x;
          }
        })
      },
      {
        title: t("plugin.codegen.column.formSpan"),
        key: "formSpan",
        width: 120,
        render: (D) => it(Co, {
          value: D.formSpan,
          min: 1,
          max: 24,
          size: "small",
          class: "w-full",
          "onUpdate:value": (x) => {
            D.formSpan = x ?? 12;
          }
        })
      },
      {
        title: t("plugin.codegen.column.searchSpan"),
        key: "searchSpan",
        width: 120,
        render: (D) => it(Co, {
          value: D.searchSpan,
          min: 1,
          max: 24,
          size: "small",
          class: "w-full",
          "onUpdate:value": (x) => {
            D.searchSpan = x ?? 12;
          }
        })
      },
      {
        title: t("plugin.codegen.column.listWidth"),
        key: "listWidth",
        width: 140,
        render: (D) => it(Co, {
          value: D.listWidth,
          min: 80,
          max: 600,
          size: "small",
          class: "w-full",
          "onUpdate:value": (x) => {
            D.listWidth = x ?? 160;
          }
        })
      },
      {
        title: t("plugin.codegen.column.placeholder"),
        key: "placeholder",
        width: 200,
        render: (D) => it(Rt, {
          value: D.placeholder,
          size: "small",
          "onUpdate:value": (x) => {
            D.placeholder = x;
          }
        })
      },
      {
        title: t("plugin.codegen.column.defaultValue"),
        key: "defaultValue",
        width: 160,
        render: (D) => it(Rt, {
          value: D.defaultValue,
          size: "small",
          "onUpdate:value": (x) => {
            D.defaultValue = x;
          }
        })
      },
      {
        title: t("plugin.codegen.column.status"),
        key: "status",
        width: 100,
        render: (D) => it(Vn, {
          value: D.status,
          "onUpdate:value": (x) => {
            D.status = x;
          },
          checkedValue: "1",
          uncheckedValue: "0",
          size: "small"
        })
      }
    ], R = {
      page: 1,
      pageSize: 20,
      tableName: ""
    };
    async function O(D) {
      return await de("/plugin/codegen/tables/page", D);
    }
    const { loading: W, data: _, columns: V, columnChecks: B, pagination: M, getData: G, getDataByPage: U, searchParams: Q, resetSearchParams: oe } = a({
      apiFn: O,
      apiParams: R,
      columns: y,
      transformer: (D) => {
        const { records: x = [], page: A = 1, pageSize: ee = 20, total: Y = 0 } = (D == null ? void 0 : D.data) || {};
        return {
          data: x.map((me, pe) => ({
            ...me,
            id: me.id ?? me.tableId ?? me.tableName,
            index: (A - 1) * ee + pe + 1
          })),
          pageNum: A,
          pageSize: ee,
          total: Y
        };
      }
    }), {
      checkedRowKeys: ne,
      onBatchDeleted: X,
      onDeleted: j,
      onMessage: Z,
      operateType: te,
      handleAdd: fe,
      handleEdit: he
    } = s(_, G), ve = Ho(() => te.value === "edit"), ye = Ho(() => {
      var x;
      const D = uO();
      return ((x = i == null ? void 0 : i.components) == null ? void 0 : x.TableHeaderOperation) || (D == null ? void 0 : D.appContext.components.TableHeaderOperation) || null;
    });
    function J() {
      return {
        tableName: "",
        tableComment: "",
        tablePrefix: "",
        pluginId: "",
        pluginName: "",
        version: "1.0.0",
        parentPackage: "com.tt.plugin",
        moduleName: "",
        routePath: "",
        menuName: "",
        i18nKey: "",
        icon: "mdi:code-tags",
        includeTableSql: "1",
        parentMenuId: 0,
        author: "tt",
        status: "1"
      };
    }
    function ge(D) {
      if (!D) return "";
      const x = new Date(D);
      return Number.isNaN(x.getTime()) ? D : x.toLocaleString();
    }
    function Ee() {
      return window.__TT_PLUGIN_API_BASE__ || "/proxy-default";
    }
    function xe() {
      const x = Object.keys(localStorage).find((ee) => /token$/i.test(ee) && !/refresh/i.test(ee));
      if (!x) return null;
      const A = localStorage.getItem(x);
      if (!A) return null;
      try {
        return JSON.parse(A);
      } catch {
        return A;
      }
    }
    function Te(D, x) {
      if (!x) return D;
      const A = new URLSearchParams();
      Object.entries(x).forEach(([Y, ae]) => {
        if (!(ae == null || ae === "")) {
          if (Array.isArray(ae)) {
            ae.forEach((me) => {
              me != null && me !== "" && A.append(Y, String(me));
            });
            return;
          }
          A.append(Y, String(ae));
        }
      });
      const ee = A.toString();
      return ee ? `${D}${D.includes("?") ? "&" : "?"}${ee}` : D;
    }
    async function Re(D) {
      var me;
      const x = {
        "Content-Type": "application/json"
      }, A = xe();
      A && (x.Authorization = A.startsWith("Bearer ") ? A : `Bearer ${A}`);
      const ee = Te(`${Ee()}${D.url}`, D.params), Y = await fetch(ee, {
        method: D.method || "GET",
        headers: x,
        body: D.data ? JSON.stringify(D.data) : void 0
      }), ae = await Y.json();
      if (ae && typeof ae == "object" && "code" in ae) {
        if (ae.code !== 200) {
          const pe = ae.message || t("plugin.codegen.tips.requestFailed");
          return (me = window.$message) == null || me.error(pe), { data: ae.data, error: pe, response: Y };
        }
        return { data: ae.data ?? ae, error: null, response: Y };
      }
      return { data: ae, error: null, response: Y };
    }
    async function Le(D) {
      return i != null && i.request ? i.request(D) : Re(D);
    }
    async function Fe(D) {
      const x = await Le(D);
      if (x.error)
        throw new Error(x.error);
      return x.data;
    }
    async function de(D, x) {
      return await Le({ url: D, params: x });
    }
    async function T() {
      v.value = await Fe({ url: "/plugin/codegen/data-tables" });
    }
    async function k() {
      f.value = await Fe({ url: "/plugin/codegen/dict/options" });
    }
    function z(D) {
      const x = D.indexOf("_");
      return x !== -1 ? D.substring(0, x + 1) : "";
    }
    function H(D) {
      return D.replace(/_/g, "-").toLowerCase();
    }
    function re(D, x) {
      if (!D) return;
      const A = z(D), ee = A && D.startsWith(A) ? D.slice(A.length) : D, Y = H(ee);
      b.tablePrefix = A, b.tableComment = (x == null ? void 0 : x.tableComment) || D, b.moduleName = Y, b.pluginId = `tt-plugin-${Y}`, b.pluginName = b.tableComment || D, b.routePath = `/${Y}`, b.menuName = b.pluginName, b.i18nKey = `plugin.${Y}.title`, b.parentPackage = "com.tt.plugin";
    }
    function le() {
      fe(), c.value = 1, Object.assign(b, J()), d.value = !0, T(), k(), g.value = [];
    }
    async function F(D) {
      he(D.id), c.value = 1, d.value = !0, k();
      const x = await Fe({ url: `/plugin/codegen/tables/${D.id}` });
      Object.assign(b, x), await K(D.id);
    }
    async function K(D) {
      m.value = !0;
      try {
        const x = await Fe({
          url: `/plugin/codegen/tables/columns/${D}`
        });
        g.value = Array.isArray(x) ? x : [];
      } finally {
        m.value = !1;
      }
    }
    async function be() {
      var D;
      if (c.value === 1) {
        await Pe(), await K(b.id), c.value = 2;
        return;
      }
      if (c.value === 2) {
        if (g.value.length === 0) {
          (D = window.$message) == null || D.warning(t("plugin.codegen.tips.emptyColumns"));
          return;
        }
        h.value = !0;
        try {
          await Fe({ url: "/plugin/codegen/tables/columns", method: "PUT", data: g.value }), c.value = 3;
        } finally {
          h.value = !1;
        }
      }
    }
    async function Pe() {
      var D;
      await ((D = p.value) == null ? void 0 : D.validate()), h.value = !0;
      try {
        const x = ve.value ? "PUT" : "POST", A = await Fe({ url: "/plugin/codegen/tables", method: x, data: b });
        Object.assign(b, A), ve.value || (te.value = "edit"), await Z();
      } finally {
        h.value = !1;
      }
    }
    async function Ke(D) {
      D.id && Ne(t("plugin.codegen.tips.deleteConfirm")) && (await Fe({ url: "/plugin/codegen/tables", method: "DELETE", data: [D.id] }), await j());
    }
    async function ct() {
      ne.value.length !== 0 && Ne(t("plugin.codegen.tips.batchDeleteConfirm")) && (await Fe({ url: "/plugin/codegen/tables", method: "DELETE", data: ne.value }), await X());
    }
    async function qe() {
      if (b.id && Ne(t("plugin.codegen.tips.syncConfirm"))) {
        m.value = !0;
        try {
          const D = await Fe({
            url: `/plugin/codegen/tables/columns/sync/${b.id}`
          });
          g.value = Array.isArray(D) ? D : [];
        } finally {
          m.value = !1;
        }
      }
    }
    async function Ge() {
      b.id && Ne(t("plugin.codegen.tips.cleanConfirm")) && (await Fe({ url: `/plugin/codegen/tables/columns/clean/${b.id}`, method: "PUT" }), g.value = []);
    }
    async function vt() {
      if (!b.id) return;
      const D = await fetch(`${Ee()}/plugin/codegen/tables/zip/${b.id}`, {
        method: "POST"
      }), x = await D.blob(), A = URL.createObjectURL(x), ee = document.createElement("a"), ae = (D.headers.get("content-disposition") || "").match(/filename=([^;]+)/i);
      ee.href = A, ee.download = ae ? decodeURIComponent(ae[1].replace(/"/g, "")) : "plugin-source.zip", ee.click(), URL.revokeObjectURL(A);
    }
    function Ne(D) {
      return window.confirm(D);
    }
    function we() {
      function D(Y) {
        return Y.map((ae) => ae.type === "selection" ? { key: "__selection__", title: t("common.check"), checked: !0 } : ae.type === "expand" ? { key: "__expand__", title: t("common.expandColumn"), checked: !0 } : {
          key: ae.key,
          title: ae.title,
          checked: !0
        });
      }
      function x(Y, ae) {
        const me = /* @__PURE__ */ new Map();
        return Y.forEach((pe) => {
          if (pe.type === "selection") {
            me.set("__selection__", pe);
            return;
          }
          if (pe.type === "expand") {
            me.set("__expand__", pe);
            return;
          }
          me.set(pe.key, pe);
        }), ae.filter((pe) => pe.checked).map((pe) => me.get(pe.key));
      }
      function A(Y) {
        const ae = nn(!1), me = nn([]), pe = Ws({ ...Y.apiParams || {} }), Ce = Ho(() => Y.columns()), Ie = nn([]), Xe = Ho(() => {
          const tt = Ce.value || [];
          return Ie.value.length === 0 && (Ie.value = D(tt)), x(tt, Ie.value);
        }), Me = Ws({
          page: pe.page ?? 1,
          pageSize: pe.pageSize ?? 20,
          itemCount: 0,
          onChange: (tt) => {
            Me.page = tt, pe.page = tt, ut();
          },
          onUpdatePageSize: (tt) => {
            Me.pageSize = tt, Me.page = 1, pe.page = 1, pe.pageSize = tt, ut();
          }
        });
        async function ut() {
          ae.value = !0;
          try {
            const tt = await Y.apiFn({ ...pe }), kt = Y.transformer(tt);
            me.value = kt.data || [], Me.page = kt.pageNum, Me.pageSize = kt.pageSize, Me.itemCount = kt.total;
          } finally {
            ae.value = !1;
          }
        }
        async function lt(tt = 1) {
          Me.page = tt, pe.page = tt, pe.pageSize = Me.pageSize, await ut();
        }
        function $t() {
          Object.assign(pe, { ...Y.apiParams || {} }), ut();
        }
        return Y.immediate !== !1 && ut(), {
          loading: ae,
          data: me,
          columns: Xe,
          columnChecks: Ie,
          pagination: Me,
          getData: ut,
          getDataByPage: lt,
          searchParams: pe,
          resetSearchParams: $t
        };
      }
      function ee(Y, ae) {
        const me = nn([]), pe = nn("add");
        function Ce() {
          pe.value = "add";
        }
        function Ie(lt) {
          pe.value = "edit";
        }
        async function Xe() {
          var lt;
          (lt = window.$message) == null || lt.success(t("common.deleteSuccess")), me.value = [], await ae();
        }
        async function Me() {
          var lt;
          (lt = window.$message) == null || lt.success(t("common.deleteSuccess")), await ae();
        }
        async function ut(lt) {
          var $t;
          ($t = window.$message) == null || $t.success(lt || t("common.actionSuccess")), me.value = [], await ae();
        }
        return {
          checkedRowKeys: me,
          operateType: pe,
          handleAdd: Ce,
          handleEdit: Ie,
          onBatchDeleted: Xe,
          onDeleted: Me,
          onMessage: ut
        };
      }
      return { useTable: A, useTableOperate: ee };
    }
    return (D, x) => {
      const A = sp("icon-ic-round-search"), ee = sp("icon-ic-round-refresh");
      return li(), up("div", dO, [
        Se(ce(Uf), {
          title: ce(t)("plugin.codegen.title"),
          size: "small",
          bordered: !1,
          class: "card-wrapper"
        }, {
          default: Oe(() => [
            Se(ce(Bh), {
              model: ce(Q),
              "label-width": "80",
              "label-placement": "left"
            }, {
              default: Oe(() => [
                Se(ce(ep), {
                  cols: "24",
                  "x-gap": "16",
                  "y-gap": "8",
                  responsive: "screen"
                }, {
                  default: Oe(() => [
                    Se(ce(It), {
                      label: ce(t)("plugin.codegen.search.tableName"),
                      span: "12"
                    }, {
                      default: Oe(() => [
                        Se(ce(Rt), {
                          value: ce(Q).tableName,
                          "onUpdate:value": x[0] || (x[0] = (Y) => ce(Q).tableName = Y),
                          placeholder: ce(t)("plugin.codegen.search.placeholder")
                        }, null, 8, ["value", "placeholder"])
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["label"]),
                    Se(ce(It), { span: "12" }, {
                      default: Oe(() => [
                        Se(ce(ri), {
                          justify: "end",
                          class: "w-full"
                        }, {
                          default: Oe(() => [
                            Se(ce(qt), {
                              type: "primary",
                              ghost: "",
                              onClick: x[1] || (x[1] = (Y) => ce(U)(1))
                            }, {
                              icon: Oe(() => [
                                Se(A, { class: "text-icon" })
                              ]),
                              default: Oe(() => [
                                Ln(
                                  " " + Bn(ce(t)("plugin.codegen.actions.search")),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 1
                              /* STABLE */
                            }),
                            Se(ce(qt), {
                              quaternary: "",
                              onClick: ce(oe)
                            }, {
                              icon: Oe(() => [
                                Se(ee, { class: "text-icon" })
                              ]),
                              default: Oe(() => [
                                Ln(
                                  " " + Bn(ce(t)("plugin.codegen.actions.reset")),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 1
                              /* STABLE */
                            }, 8, ["onClick"])
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
                })
              ]),
              _: 1
              /* STABLE */
            }, 8, ["model"])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["title"]),
        Se(ce(Uf), {
          bordered: !1,
          class: "sm:flex-1-hidden card-wrapper",
          "content-class": "flex-col"
        }, {
          default: Oe(() => [
            ye.value ? (li(), js(sO(ye.value), {
              key: 0,
              columns: ce(B),
              "onUpdate:columns": x[2] || (x[2] = (Y) => dp(B) ? B.value = Y : null),
              loading: ce(W),
              "disabled-delete": ce(ne).length === 0,
              onAdd: le,
              onDelete: ct,
              onRefresh: ce(G)
            }, null, 40, ["columns", "loading", "disabled-delete", "onRefresh"])) : (li(), up("div", cO, [
              Se(ce(ri), null, {
                default: Oe(() => [
                  Se(ce(qt), {
                    size: "small",
                    ghost: "",
                    type: "primary",
                    onClick: le
                  }, {
                    default: Oe(() => [
                      Ln(
                        Bn(ce(t)("common.add")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  Se(ce(qt), {
                    size: "small",
                    ghost: "",
                    type: "error",
                    disabled: ce(ne).length === 0,
                    onClick: ct
                  }, {
                    default: Oe(() => [
                      Ln(
                        Bn(ce(t)("common.batchDelete")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["disabled"])
                ]),
                _: 1
                /* STABLE */
              }),
              Se(ce(qt), {
                size: "small",
                onClick: ce(G)
              }, {
                default: Oe(() => [
                  Ln(
                    Bn(ce(t)("common.refresh")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["onClick"])
            ])),
            Se(ce(zh), {
              remote: "",
              striped: "",
              size: "small",
              class: "sm:h-full",
              loading: ce(W),
              columns: ce(V),
              data: ce(_),
              pagination: ce(M),
              "row-key": (Y) => Y.id,
              "checked-row-keys": ce(ne),
              "onUpdate:checkedRowKeys": x[3] || (x[3] = (Y) => dp(ne) ? ne.value = Y : null),
              "single-line": !1,
              "scroll-x": 1200,
              "flex-height": !n.value
            }, null, 8, ["loading", "columns", "data", "pagination", "row-key", "checked-row-keys", "flex-height"])
          ]),
          _: 1
          /* STABLE */
        }),
        Se(ce(IE), {
          show: d.value,
          "onUpdate:show": x[22] || (x[22] = (Y) => d.value = Y),
          placement: "right",
          width: 900
        }, {
          default: Oe(() => [
            Se(ce(LE), {
              title: C.value,
              closable: ""
            }, {
              footer: Oe(() => [
                Se(ce(ri), { justify: "end" }, {
                  default: Oe(() => [
                    c.value > 1 ? (li(), js(ce(qt), {
                      key: 0,
                      onClick: x[21] || (x[21] = (Y) => c.value -= 1)
                    }, {
                      default: Oe(() => [
                        Ln(
                          Bn(ce(t)("plugin.codegen.actions.prev")),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    })) : cp("v-if", !0),
                    c.value < 3 ? (li(), js(ce(qt), {
                      key: 1,
                      type: "primary",
                      loading: h.value,
                      onClick: be
                    }, {
                      default: Oe(() => [
                        Ln(
                          Bn(ce(t)("plugin.codegen.actions.next")),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["loading"])) : cp("v-if", !0)
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              default: Oe(() => [
                Se(ce(aO), {
                  value: c.value,
                  "onUpdate:value": x[20] || (x[20] = (Y) => c.value = Y),
                  type: "segment",
                  size: "small",
                  animated: ""
                }, {
                  default: Oe(() => [
                    Se(ce(As), {
                      name: 1,
                      tab: ce(t)("plugin.codegen.step.base"),
                      disabled: ""
                    }, {
                      default: Oe(() => [
                        Se(ce(Bh), {
                          ref_key: "formRef",
                          ref: p,
                          model: b,
                          rules: S,
                          "label-placement": "left",
                          "label-width": "120"
                        }, {
                          default: Oe(() => [
                            Se(ce(ep), {
                              cols: "24",
                              "x-gap": "16",
                              "y-gap": "8",
                              responsive: "screen"
                            }, {
                              default: Oe(() => [
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.tableName"),
                                  path: "tableName"
                                }, {
                                  default: Oe(() => [
                                    Se(ce(br), {
                                      value: b.tableName,
                                      "onUpdate:value": [
                                        x[4] || (x[4] = (Y) => b.tableName = Y),
                                        re
                                      ],
                                      "label-field": "tableName",
                                      "value-field": "tableName",
                                      options: v.value,
                                      placeholder: ce(t)("plugin.codegen.fields.tableNamePlaceholder"),
                                      filterable: "",
                                      clearable: "",
                                      disabled: ve.value
                                    }, null, 8, ["value", "options", "placeholder", "disabled"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.tableComment")
                                }, {
                                  default: Oe(() => [
                                    Se(ce(Rt), {
                                      value: b.tableComment,
                                      "onUpdate:value": x[5] || (x[5] = (Y) => b.tableComment = Y),
                                      disabled: ve.value
                                    }, null, 8, ["value", "disabled"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.tablePrefix")
                                }, {
                                  default: Oe(() => [
                                    Se(ce(Rt), {
                                      value: b.tablePrefix,
                                      "onUpdate:value": x[6] || (x[6] = (Y) => b.tablePrefix = Y),
                                      disabled: ve.value
                                    }, null, 8, ["value", "disabled"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.pluginId"),
                                  path: "pluginId"
                                }, {
                                  default: Oe(() => [
                                    Se(ce(Rt), {
                                      value: b.pluginId,
                                      "onUpdate:value": x[7] || (x[7] = (Y) => b.pluginId = Y)
                                    }, null, 8, ["value"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.pluginName"),
                                  path: "pluginName"
                                }, {
                                  default: Oe(() => [
                                    Se(ce(Rt), {
                                      value: b.pluginName,
                                      "onUpdate:value": x[8] || (x[8] = (Y) => b.pluginName = Y)
                                    }, null, 8, ["value"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.version")
                                }, {
                                  default: Oe(() => [
                                    Se(ce(Rt), {
                                      value: b.version,
                                      "onUpdate:value": x[9] || (x[9] = (Y) => b.version = Y)
                                    }, null, 8, ["value"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.parentPackage"),
                                  path: "parentPackage"
                                }, {
                                  default: Oe(() => [
                                    Se(ce(Rt), {
                                      value: b.parentPackage,
                                      "onUpdate:value": x[10] || (x[10] = (Y) => b.parentPackage = Y)
                                    }, null, 8, ["value"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.moduleName"),
                                  path: "moduleName"
                                }, {
                                  default: Oe(() => [
                                    Se(ce(Rt), {
                                      value: b.moduleName,
                                      "onUpdate:value": x[11] || (x[11] = (Y) => b.moduleName = Y)
                                    }, null, 8, ["value"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.routePath")
                                }, {
                                  default: Oe(() => [
                                    Se(ce(Rt), {
                                      value: b.routePath,
                                      "onUpdate:value": x[12] || (x[12] = (Y) => b.routePath = Y)
                                    }, null, 8, ["value"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.menuName")
                                }, {
                                  default: Oe(() => [
                                    Se(ce(Rt), {
                                      value: b.menuName,
                                      "onUpdate:value": x[13] || (x[13] = (Y) => b.menuName = Y)
                                    }, null, 8, ["value"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.i18nKey")
                                }, {
                                  default: Oe(() => [
                                    Se(ce(Rt), {
                                      value: b.i18nKey,
                                      "onUpdate:value": x[14] || (x[14] = (Y) => b.i18nKey = Y)
                                    }, null, 8, ["value"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.icon")
                                }, {
                                  default: Oe(() => [
                                    Se(ce(Rt), {
                                      value: b.icon,
                                      "onUpdate:value": x[15] || (x[15] = (Y) => b.icon = Y)
                                    }, null, 8, ["value"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.includeTableSql")
                                }, {
                                  default: Oe(() => [
                                    Se(ce(Vn), {
                                      value: b.includeTableSql,
                                      "onUpdate:value": x[16] || (x[16] = (Y) => b.includeTableSql = Y),
                                      "checked-value": "1",
                                      "unchecked-value": "0"
                                    }, null, 8, ["value"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.parentMenuId")
                                }, {
                                  default: Oe(() => [
                                    Se(ce(Co), {
                                      value: b.parentMenuId,
                                      "onUpdate:value": x[17] || (x[17] = (Y) => b.parentMenuId = Y),
                                      class: "w-full"
                                    }, null, 8, ["value"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.author"),
                                  path: "author"
                                }, {
                                  default: Oe(() => [
                                    Se(ce(Rt), {
                                      value: b.author,
                                      "onUpdate:value": x[18] || (x[18] = (Y) => b.author = Y)
                                    }, null, 8, ["value"])
                                  ]),
                                  _: 1
                                  /* STABLE */
                                }, 8, ["label"]),
                                Se(ce(It), {
                                  span: "12",
                                  label: ce(t)("plugin.codegen.fields.status")
                                }, {
                                  default: Oe(() => [
                                    Se(ce(br), {
                                      value: b.status,
                                      "onUpdate:value": x[19] || (x[19] = (Y) => b.status = Y),
                                      options: u
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
                        }, 8, ["model"])
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["tab"]),
                    Se(ce(As), {
                      name: 2,
                      tab: ce(t)("plugin.codegen.step.columns"),
                      disabled: ""
                    }, {
                      default: Oe(() => [
                        Se(ce(ri), { class: "mb-12" }, {
                          default: Oe(() => [
                            Se(ce(qt), {
                              type: "error",
                              onClick: Ge
                            }, {
                              default: Oe(() => [
                                Ln(
                                  Bn(ce(t)("plugin.codegen.actions.cleanColumns")),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 1
                              /* STABLE */
                            }),
                            Se(ce(qt), {
                              type: "warning",
                              onClick: qe
                            }, {
                              default: Oe(() => [
                                Ln(
                                  Bn(ce(t)("plugin.codegen.actions.syncColumns")),
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
                        Se(ce(zh), {
                          loading: m.value,
                          columns: E,
                          data: g.value,
                          "scroll-x": 5200,
                          size: "small",
                          "row-key": (Y) => Y.id
                        }, null, 8, ["loading", "data", "row-key"])
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["tab"]),
                    Se(ce(As), {
                      name: 3,
                      tab: ce(t)("plugin.codegen.step.result"),
                      disabled: ""
                    }, {
                      default: Oe(() => [
                        Se(ce(VF), {
                          status: "success",
                          title: ce(t)("plugin.codegen.result.title")
                        }, {
                          footer: Oe(() => [
                            Se(ce(qt), {
                              type: "primary",
                              onClick: vt
                            }, {
                              default: Oe(() => [
                                Ln(
                                  Bn(ce(t)("plugin.codegen.actions.generate")),
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
                        }, 8, ["title"])
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["tab"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["value"])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["title"])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["show"])
      ]);
    };
  }
}), vO = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, mO = /* @__PURE__ */ vO(pO, [["__scopeId", "data-v-60bebf48"]]);
export {
  mO as default
};
