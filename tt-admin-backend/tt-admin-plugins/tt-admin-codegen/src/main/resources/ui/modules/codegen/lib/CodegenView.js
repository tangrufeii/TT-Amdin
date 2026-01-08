/*!
  * shared v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Wm(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Oc = typeof window < "u", Zo = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), Um = (e, t, n) => Km({ l: e, k: t, s: n }), Km = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Et = (e) => typeof e == "number" && isFinite(e), qm = (e) => Bd(e) === "[object Date]", Ha = (e) => Bd(e) === "[object RegExp]", tl = (e) => Qe(e) && Object.keys(e).length === 0, Ot = Object.assign, Gm = Object.create, st = (e = null) => Gm(e);
let Mc;
const jo = () => Mc || (Mc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : st());
function Vc(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function Ic(e) {
  return e.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Xm(e) {
  return e = e.replace(/(\w+)\s*=\s*"([^"]*)"/g, (o, r, i) => `${r}="${Ic(i)}"`), e = e.replace(/(\w+)\s*=\s*'([^']*)'/g, (o, r, i) => `${r}='${Ic(i)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(e) && (e = e.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ].forEach((o) => {
    e = e.replace(o, "$1javascript&#58;");
  }), e;
}
const Ym = Object.prototype.hasOwnProperty;
function Rn(e, t) {
  return Ym.call(e, t);
}
const $t = Array.isArray, yt = (e) => typeof e == "function", $e = (e) => typeof e == "string", St = (e) => typeof e == "boolean", et = (e) => e !== null && typeof e == "object", Zm = (e) => et(e) && yt(e.then) && yt(e.catch), _p = Object.prototype.toString, Bd = (e) => _p.call(e), Qe = (e) => Bd(e) === "[object Object]", Jm = (e) => e == null ? "" : $t(e) || Qe(e) && e.toString === _p ? JSON.stringify(e, null, 2) : String(e);
function Ld(e, t = "") {
  return e.reduce((n, o, r) => r === 0 ? n + o : n + t + o, "");
}
const Bi = (e) => !et(e) || $t(e);
function Aa(e, t) {
  if (Bi(e) || Bi(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: o, des: r } = n.pop();
    Object.keys(o).forEach((i) => {
      i !== "__proto__" && (et(o[i]) && !et(r[i]) && (r[i] = Array.isArray(o[i]) ? [] : st()), Bi(r[i]) || Bi(o[i]) ? r[i] = o[i] : n.push({ src: o[i], des: r[i] }));
    });
  }
}
/*!
  * message-compiler v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Qm(e, t, n) {
  return { line: e, column: t, offset: n };
}
function Qs(e, t, n) {
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
}, eb = 17;
function nl(e, t, n = {}) {
  const { domain: o, messages: r, args: i } = n, l = e, a = new SyntaxError(String(l));
  return a.code = e, t && (a.location = t), a.domain = o, a;
}
function tb(e) {
  throw e;
}
const _n = " ", nb = "\r", Wt = `
`, ob = "\u2028", rb = "\u2029";
function ib(e) {
  const t = e;
  let n = 0, o = 1, r = 1, i = 0;
  const l = (w) => t[w] === nb && t[w + 1] === Wt, a = (w) => t[w] === Wt, s = (w) => t[w] === rb, d = (w) => t[w] === ob, c = (w) => l(w) || a(w) || s(w) || d(w), h = () => n, p = () => o, v = () => r, u = () => i, g = (w) => l(w) || s(w) || d(w) ? Wt : t[w], m = () => g(n), f = () => g(n + i);
  function b() {
    return i = 0, c(n) && (o++, r = 0), l(n) && n++, n++, r++, t[n];
  }
  function x() {
    return l(n + i) && i++, i++, t[n + i];
  }
  function y() {
    n = 0, o = 1, r = 1, i = 0;
  }
  function S(w = 0) {
    i = w;
  }
  function C() {
    const w = n + i;
    for (; w !== n; )
      b();
    i = 0;
  }
  return {
    index: h,
    line: p,
    column: v,
    peekOffset: u,
    charAt: g,
    currentChar: m,
    currentPeek: f,
    next: b,
    peek: x,
    reset: y,
    resetPeek: S,
    skipToPeek: C
  };
}
const Zn = void 0, ab = ".", Ac = "'", lb = "tokenizer";
function sb(e, t = {}) {
  const n = t.location !== !1, o = ib(e), r = () => o.index(), i = () => Qm(o.line(), o.column(), o.index()), l = i(), a = r(), s = {
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
  function h(P, R, E, ...N) {
    const re = d();
    if (R.column += E, R.offset += E, c) {
      const de = n ? Qs(re.startLoc, R) : null, z = nl(P, de, {
        domain: lb,
        args: N
      });
      c(z);
    }
  }
  function p(P, R, E) {
    P.endLoc = i(), P.currentType = R;
    const N = { type: R };
    return n && (N.loc = Qs(P.startLoc, P.endLoc)), E != null && (N.value = E), N;
  }
  const v = (P) => p(
    P,
    13
    /* TokenTypes.EOF */
  );
  function u(P, R) {
    return P.currentChar() === R ? (P.next(), R) : (h(ot.EXPECTED_TOKEN, i(), 0, R), "");
  }
  function g(P) {
    let R = "";
    for (; P.currentPeek() === _n || P.currentPeek() === Wt; )
      R += P.currentPeek(), P.peek();
    return R;
  }
  function m(P) {
    const R = g(P);
    return P.skipToPeek(), R;
  }
  function f(P) {
    if (P === Zn)
      return !1;
    const R = P.charCodeAt(0);
    return R >= 97 && R <= 122 || // a-z
    R >= 65 && R <= 90 || // A-Z
    R === 95;
  }
  function b(P) {
    if (P === Zn)
      return !1;
    const R = P.charCodeAt(0);
    return R >= 48 && R <= 57;
  }
  function x(P, R) {
    const { currentType: E } = R;
    if (E !== 2)
      return !1;
    g(P);
    const N = f(P.currentPeek());
    return P.resetPeek(), N;
  }
  function y(P, R) {
    const { currentType: E } = R;
    if (E !== 2)
      return !1;
    g(P);
    const N = P.currentPeek() === "-" ? P.peek() : P.currentPeek(), re = b(N);
    return P.resetPeek(), re;
  }
  function S(P, R) {
    const { currentType: E } = R;
    if (E !== 2)
      return !1;
    g(P);
    const N = P.currentPeek() === Ac;
    return P.resetPeek(), N;
  }
  function C(P, R) {
    const { currentType: E } = R;
    if (E !== 7)
      return !1;
    g(P);
    const N = P.currentPeek() === ".";
    return P.resetPeek(), N;
  }
  function w(P, R) {
    const { currentType: E } = R;
    if (E !== 8)
      return !1;
    g(P);
    const N = f(P.currentPeek());
    return P.resetPeek(), N;
  }
  function $(P, R) {
    const { currentType: E } = R;
    if (!(E === 7 || E === 11))
      return !1;
    g(P);
    const N = P.currentPeek() === ":";
    return P.resetPeek(), N;
  }
  function k(P, R) {
    const { currentType: E } = R;
    if (E !== 9)
      return !1;
    const N = () => {
      const de = P.currentPeek();
      return de === "{" ? f(P.peek()) : de === "@" || de === "|" || de === ":" || de === "." || de === _n || !de ? !1 : de === Wt ? (P.peek(), N()) : G(P, !1);
    }, re = N();
    return P.resetPeek(), re;
  }
  function O(P) {
    g(P);
    const R = P.currentPeek() === "|";
    return P.resetPeek(), R;
  }
  function G(P, R = !0) {
    const E = (re = !1, de = "") => {
      const z = P.currentPeek();
      return z === "{" || z === "@" || !z ? re : z === "|" ? !(de === _n || de === Wt) : z === _n ? (P.peek(), E(!0, _n)) : z === Wt ? (P.peek(), E(!0, Wt)) : !0;
    }, N = E();
    return R && P.resetPeek(), N;
  }
  function _(P, R) {
    const E = P.currentChar();
    return E === Zn ? Zn : R(E) ? (P.next(), E) : null;
  }
  function V(P) {
    const R = P.charCodeAt(0);
    return R >= 97 && R <= 122 || // a-z
    R >= 65 && R <= 90 || // A-Z
    R >= 48 && R <= 57 || // 0-9
    R === 95 || // _
    R === 36;
  }
  function I(P) {
    return _(P, V);
  }
  function M(P) {
    const R = P.charCodeAt(0);
    return R >= 97 && R <= 122 || // a-z
    R >= 65 && R <= 90 || // A-Z
    R >= 48 && R <= 57 || // 0-9
    R === 95 || // _
    R === 36 || // $
    R === 45;
  }
  function X(P) {
    return _(P, M);
  }
  function H(P) {
    const R = P.charCodeAt(0);
    return R >= 48 && R <= 57;
  }
  function Q(P) {
    return _(P, H);
  }
  function oe(P) {
    const R = P.charCodeAt(0);
    return R >= 48 && R <= 57 || // 0-9
    R >= 65 && R <= 70 || // A-F
    R >= 97 && R <= 102;
  }
  function te(P) {
    return _(P, oe);
  }
  function Y(P) {
    let R = "", E = "";
    for (; R = Q(P); )
      E += R;
    return E;
  }
  function L(P) {
    let R = "";
    for (; ; ) {
      const E = P.currentChar();
      if (E === "{" || E === "}" || E === "@" || E === "|" || !E)
        break;
      if (E === _n || E === Wt)
        if (G(P))
          R += E, P.next();
        else {
          if (O(P))
            break;
          R += E, P.next();
        }
      else
        R += E, P.next();
    }
    return R;
  }
  function Z(P) {
    m(P);
    let R = "", E = "";
    for (; R = X(P); )
      E += R;
    const N = P.currentChar();
    if (N && N !== "}" && N !== Zn && N !== _n && N !== Wt && N !== "　") {
      const re = pe(P);
      return h(ot.INVALID_TOKEN_IN_PLACEHOLDER, i(), 0, E + re), E + re;
    }
    return P.currentChar() === Zn && h(ot.UNTERMINATED_CLOSING_BRACE, i(), 0), E;
  }
  function ee(P) {
    m(P);
    let R = "";
    return P.currentChar() === "-" ? (P.next(), R += `-${Y(P)}`) : R += Y(P), P.currentChar() === Zn && h(ot.UNTERMINATED_CLOSING_BRACE, i(), 0), R;
  }
  function ue(P) {
    return P !== Ac && P !== Wt;
  }
  function fe(P) {
    m(P), u(P, "'");
    let R = "", E = "";
    for (; R = _(P, ue); )
      R === "\\" ? E += ve(P) : E += R;
    const N = P.currentChar();
    return N === Wt || N === Zn ? (h(ot.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, i(), 0), N === Wt && (P.next(), u(P, "'")), E) : (u(P, "'"), E);
  }
  function ve(P) {
    const R = P.currentChar();
    switch (R) {
      case "\\":
      case "'":
        return P.next(), `\\${R}`;
      case "u":
        return xe(P, R, 4);
      case "U":
        return xe(P, R, 6);
      default:
        return h(ot.UNKNOWN_ESCAPE_SEQUENCE, i(), 0, R), "";
    }
  }
  function xe(P, R, E) {
    u(P, R);
    let N = "";
    for (let re = 0; re < E; re++) {
      const de = te(P);
      if (!de) {
        h(ot.INVALID_UNICODE_ESCAPE_SEQUENCE, i(), 0, `\\${R}${N}${P.currentChar()}`);
        break;
      }
      N += de;
    }
    return `\\${R}${N}`;
  }
  function J(P) {
    return P !== "{" && P !== "}" && P !== _n && P !== Wt;
  }
  function pe(P) {
    m(P);
    let R = "", E = "";
    for (; R = _(P, J); )
      E += R;
    return E;
  }
  function j(P) {
    let R = "", E = "";
    for (; R = I(P); )
      E += R;
    return E;
  }
  function W(P) {
    const R = (E) => {
      const N = P.currentChar();
      return N === "{" || N === "@" || N === "|" || N === "(" || N === ")" || !N || N === _n ? E : (E += N, P.next(), R(E));
    };
    return R("");
  }
  function ie(P) {
    m(P);
    const R = u(
      P,
      "|"
      /* TokenChars.Pipe */
    );
    return m(P), R;
  }
  function ye(P, R) {
    let E = null;
    switch (P.currentChar()) {
      case "{":
        return R.braceNest >= 1 && h(ot.NOT_ALLOW_NEST_PLACEHOLDER, i(), 0), P.next(), E = p(
          R,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), m(P), R.braceNest++, E;
      case "}":
        return R.braceNest > 0 && R.currentType === 2 && h(ot.EMPTY_PLACEHOLDER, i(), 0), P.next(), E = p(
          R,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), R.braceNest--, R.braceNest > 0 && m(P), R.inLinked && R.braceNest === 0 && (R.inLinked = !1), E;
      case "@":
        return R.braceNest > 0 && h(ot.UNTERMINATED_CLOSING_BRACE, i(), 0), E = Me(P, R) || v(R), R.braceNest = 0, E;
      default: {
        let re = !0, de = !0, z = !0;
        if (O(P))
          return R.braceNest > 0 && h(ot.UNTERMINATED_CLOSING_BRACE, i(), 0), E = p(R, 1, ie(P)), R.braceNest = 0, R.inLinked = !1, E;
        if (R.braceNest > 0 && (R.currentType === 4 || R.currentType === 5 || R.currentType === 6))
          return h(ot.UNTERMINATED_CLOSING_BRACE, i(), 0), R.braceNest = 0, ze(P, R);
        if (re = x(P, R))
          return E = p(R, 4, Z(P)), m(P), E;
        if (de = y(P, R))
          return E = p(R, 5, ee(P)), m(P), E;
        if (z = S(P, R))
          return E = p(R, 6, fe(P)), m(P), E;
        if (!re && !de && !z)
          return E = p(R, 12, pe(P)), h(ot.INVALID_TOKEN_IN_PLACEHOLDER, i(), 0, E.value), m(P), E;
        break;
      }
    }
    return E;
  }
  function Me(P, R) {
    const { currentType: E } = R;
    let N = null;
    const re = P.currentChar();
    switch ((E === 7 || E === 8 || E === 11 || E === 9) && (re === Wt || re === _n) && h(ot.INVALID_LINKED_FORMAT, i(), 0), re) {
      case "@":
        return P.next(), N = p(
          R,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), R.inLinked = !0, N;
      case ".":
        return m(P), P.next(), p(
          R,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return m(P), P.next(), p(
          R,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return O(P) ? (N = p(R, 1, ie(P)), R.braceNest = 0, R.inLinked = !1, N) : C(P, R) || $(P, R) ? (m(P), Me(P, R)) : w(P, R) ? (m(P), p(R, 11, j(P))) : k(P, R) ? (m(P), re === "{" ? ye(P, R) || N : p(R, 10, W(P))) : (E === 7 && h(ot.INVALID_LINKED_FORMAT, i(), 0), R.braceNest = 0, R.inLinked = !1, ze(P, R));
    }
  }
  function ze(P, R) {
    let E = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (R.braceNest > 0)
      return ye(P, R) || v(R);
    if (R.inLinked)
      return Me(P, R) || v(R);
    switch (P.currentChar()) {
      case "{":
        return ye(P, R) || v(R);
      case "}":
        return h(ot.UNBALANCED_CLOSING_BRACE, i(), 0), P.next(), p(
          R,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return Me(P, R) || v(R);
      default: {
        if (O(P))
          return E = p(R, 1, ie(P)), R.braceNest = 0, R.inLinked = !1, E;
        if (G(P))
          return p(R, 0, L(P));
        break;
      }
    }
    return E;
  }
  function se() {
    const { currentType: P, offset: R, startLoc: E, endLoc: N } = s;
    return s.lastType = P, s.lastOffset = R, s.lastStartLoc = E, s.lastEndLoc = N, s.offset = r(), s.startLoc = i(), o.currentChar() === Zn ? p(
      s,
      13
      /* TokenTypes.EOF */
    ) : ze(o, s);
  }
  return {
    nextToken: se,
    currentOffset: r,
    currentPosition: i,
    context: d
  };
}
const db = "parser", cb = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function ub(e, t, n) {
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
function fb(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function o(f, b, x, y, ...S) {
    const C = f.currentPosition();
    if (C.offset += y, C.column += y, n) {
      const w = t ? Qs(x, C) : null, $ = nl(b, w, {
        domain: db,
        args: S
      });
      n($);
    }
  }
  function r(f, b, x) {
    const y = { type: f };
    return t && (y.start = b, y.end = b, y.loc = { start: x, end: x }), y;
  }
  function i(f, b, x, y) {
    t && (f.end = b, f.loc && (f.loc.end = x));
  }
  function l(f, b) {
    const x = f.context(), y = r(3, x.offset, x.startLoc);
    return y.value = b, i(y, f.currentOffset(), f.currentPosition()), y;
  }
  function a(f, b) {
    const x = f.context(), { lastOffset: y, lastStartLoc: S } = x, C = r(5, y, S);
    return C.index = parseInt(b, 10), f.nextToken(), i(C, f.currentOffset(), f.currentPosition()), C;
  }
  function s(f, b) {
    const x = f.context(), { lastOffset: y, lastStartLoc: S } = x, C = r(4, y, S);
    return C.key = b, f.nextToken(), i(C, f.currentOffset(), f.currentPosition()), C;
  }
  function d(f, b) {
    const x = f.context(), { lastOffset: y, lastStartLoc: S } = x, C = r(9, y, S);
    return C.value = b.replace(cb, ub), f.nextToken(), i(C, f.currentOffset(), f.currentPosition()), C;
  }
  function c(f) {
    const b = f.nextToken(), x = f.context(), { lastOffset: y, lastStartLoc: S } = x, C = r(8, y, S);
    return b.type !== 11 ? (o(f, ot.UNEXPECTED_EMPTY_LINKED_MODIFIER, x.lastStartLoc, 0), C.value = "", i(C, y, S), {
      nextConsumeToken: b,
      node: C
    }) : (b.value == null && o(f, ot.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, Fn(b)), C.value = b.value || "", i(C, f.currentOffset(), f.currentPosition()), {
      node: C
    });
  }
  function h(f, b) {
    const x = f.context(), y = r(7, x.offset, x.startLoc);
    return y.value = b, i(y, f.currentOffset(), f.currentPosition()), y;
  }
  function p(f) {
    const b = f.context(), x = r(6, b.offset, b.startLoc);
    let y = f.nextToken();
    if (y.type === 8) {
      const S = c(f);
      x.modifier = S.node, y = S.nextConsumeToken || f.nextToken();
    }
    switch (y.type !== 9 && o(f, ot.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, Fn(y)), y = f.nextToken(), y.type === 2 && (y = f.nextToken()), y.type) {
      case 10:
        y.value == null && o(f, ot.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, Fn(y)), x.key = h(f, y.value || "");
        break;
      case 4:
        y.value == null && o(f, ot.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, Fn(y)), x.key = s(f, y.value || "");
        break;
      case 5:
        y.value == null && o(f, ot.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, Fn(y)), x.key = a(f, y.value || "");
        break;
      case 6:
        y.value == null && o(f, ot.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, Fn(y)), x.key = d(f, y.value || "");
        break;
      default: {
        o(f, ot.UNEXPECTED_EMPTY_LINKED_KEY, b.lastStartLoc, 0);
        const S = f.context(), C = r(7, S.offset, S.startLoc);
        return C.value = "", i(C, S.offset, S.startLoc), x.key = C, i(x, S.offset, S.startLoc), {
          nextConsumeToken: y,
          node: x
        };
      }
    }
    return i(x, f.currentOffset(), f.currentPosition()), {
      node: x
    };
  }
  function v(f) {
    const b = f.context(), x = b.currentType === 1 ? f.currentOffset() : b.offset, y = b.currentType === 1 ? b.endLoc : b.startLoc, S = r(2, x, y);
    S.items = [];
    let C = null;
    do {
      const k = C || f.nextToken();
      switch (C = null, k.type) {
        case 0:
          k.value == null && o(f, ot.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, Fn(k)), S.items.push(l(f, k.value || ""));
          break;
        case 5:
          k.value == null && o(f, ot.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, Fn(k)), S.items.push(a(f, k.value || ""));
          break;
        case 4:
          k.value == null && o(f, ot.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, Fn(k)), S.items.push(s(f, k.value || ""));
          break;
        case 6:
          k.value == null && o(f, ot.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, Fn(k)), S.items.push(d(f, k.value || ""));
          break;
        case 7: {
          const O = p(f);
          S.items.push(O.node), C = O.nextConsumeToken || null;
          break;
        }
      }
    } while (b.currentType !== 13 && b.currentType !== 1);
    const w = b.currentType === 1 ? b.lastOffset : f.currentOffset(), $ = b.currentType === 1 ? b.lastEndLoc : f.currentPosition();
    return i(S, w, $), S;
  }
  function u(f, b, x, y) {
    const S = f.context();
    let C = y.items.length === 0;
    const w = r(1, b, x);
    w.cases = [], w.cases.push(y);
    do {
      const $ = v(f);
      C || (C = $.items.length === 0), w.cases.push($);
    } while (S.currentType !== 13);
    return C && o(f, ot.MUST_HAVE_MESSAGES_IN_PLURAL, x, 0), i(w, f.currentOffset(), f.currentPosition()), w;
  }
  function g(f) {
    const b = f.context(), { offset: x, startLoc: y } = b, S = v(f);
    return b.currentType === 13 ? S : u(f, x, y, S);
  }
  function m(f) {
    const b = sb(f, Ot({}, e)), x = b.context(), y = r(0, x.offset, x.startLoc);
    return t && y.loc && (y.loc.source = f), y.body = g(b), e.onCacheKey && (y.cacheKey = e.onCacheKey(f)), x.currentType !== 13 && o(b, ot.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, f[x.offset] || ""), i(y, b.currentOffset(), b.currentPosition()), y;
  }
  return { parse: m };
}
function Fn(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function hb(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (i) => (n.helpers.add(i), i) };
}
function Bc(e, t) {
  for (let n = 0; n < e.length; n++)
    Nd(e[n], t);
}
function Nd(e, t) {
  switch (e.type) {
    case 1:
      Bc(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Bc(e.items, t);
      break;
    case 6: {
      Nd(e.key, t), t.helper(
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
function pb(e, t = {}) {
  const n = hb(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && Nd(e.body, n);
  const o = n.context();
  e.helpers = Array.from(o.helpers);
}
function vb(e) {
  const t = e.body;
  return t.type === 2 ? Lc(t) : t.cases.forEach((n) => Lc(n)), e;
}
function Lc(e) {
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
      e.static = Ld(t);
      for (let n = 0; n < e.items.length; n++) {
        const o = e.items[n];
        (o.type === 3 || o.type === 9) && delete o.value;
      }
    }
  }
}
function wr(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      wr(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let o = 0; o < n.length; o++)
        wr(n[o]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let o = 0; o < n.length; o++)
        wr(n[o]);
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
      wr(t.key), t.k = t.key, delete t.key, t.modifier && (wr(t.modifier), t.m = t.modifier, delete t.modifier);
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
function gb(e, t) {
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
    const f = m ? o : "";
    s(r ? f + "  ".repeat(g) : f);
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
function mb(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), $r(e, t.key), t.modifier ? (e.push(", "), $r(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function bb(e, t) {
  const { helper: n, needIndent: o } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(o());
  const r = t.items.length;
  for (let i = 0; i < r && ($r(e, t.items[i]), i !== r - 1); i++)
    e.push(", ");
  e.deindent(o()), e.push("])");
}
function wb(e, t) {
  const { helper: n, needIndent: o } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(o());
    const r = t.cases.length;
    for (let i = 0; i < r && ($r(e, t.cases[i]), i !== r - 1); i++)
      e.push(", ");
    e.deindent(o()), e.push("])");
  }
}
function yb(e, t) {
  t.body ? $r(e, t.body) : e.push("null");
}
function $r(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      yb(e, t);
      break;
    case 1:
      wb(e, t);
      break;
    case 2:
      bb(e, t);
      break;
    case 6:
      mb(e, t);
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
const xb = (e, t = {}) => {
  const n = $e(t.mode) ? t.mode : "normal", o = $e(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const r = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, i = t.needIndent ? t.needIndent : n !== "arrow", l = e.helpers || [], a = gb(e, {
    filename: o,
    breakLineCode: r,
    needIndent: i
  });
  a.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), a.indent(i), l.length > 0 && (a.push(`const { ${Ld(l.map((c) => `${c}: _${c}`), ", ")} } = ctx`), a.newline()), a.push("return "), $r(a, e), a.deindent(i), a.push("}"), delete e.helpers;
  const { code: s, map: d } = a.context();
  return {
    ast: e,
    code: s,
    map: d ? d.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Cb(e, t = {}) {
  const n = Ot({}, t), o = !!n.jit, r = !!n.minify, i = n.optimize == null ? !0 : n.optimize, a = fb(n).parse(e);
  return o ? (i && vb(a), r && wr(a), { ast: a, code: "" }) : (pb(a, n), xb(a, n));
}
/*!
  * core-base v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Sb() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (jo().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (jo().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function Dn(e) {
  return et(e) && Dd(e) === 0 && (Rn(e, "b") || Rn(e, "body"));
}
const Fp = ["b", "body"];
function $b(e) {
  return Eo(e, Fp);
}
const Ep = ["c", "cases"];
function kb(e) {
  return Eo(e, Ep, []);
}
const zp = ["s", "static"];
function Rb(e) {
  return Eo(e, zp);
}
const Op = ["i", "items"];
function Pb(e) {
  return Eo(e, Op, []);
}
const Mp = ["t", "type"];
function Dd(e) {
  return Eo(e, Mp);
}
const Vp = ["v", "value"];
function Li(e, t) {
  const n = Eo(e, Vp);
  if (n != null)
    return n;
  throw wi(t);
}
const Ip = ["m", "modifier"];
function Tb(e) {
  return Eo(e, Ip);
}
const Ap = ["k", "key"];
function _b(e) {
  const t = Eo(e, Ap);
  if (t)
    return t;
  throw wi(
    6
    /* NodeTypes.Linked */
  );
}
function Eo(e, t, n) {
  for (let o = 0; o < t.length; o++) {
    const r = t[o];
    if (Rn(e, r) && e[r] != null)
      return e[r];
  }
  return n;
}
const Bp = [
  ...Fp,
  ...Ep,
  ...zp,
  ...Op,
  ...Ap,
  ...Ip,
  ...Vp,
  ...Mp
];
function wi(e) {
  return new Error(`unhandled node type: ${e}`);
}
function Fl(e) {
  return (n) => Fb(n, e);
}
function Fb(e, t) {
  const n = $b(t);
  if (n == null)
    throw wi(
      0
      /* NodeTypes.Resource */
    );
  if (Dd(n) === 1) {
    const i = kb(n);
    return e.plural(i.reduce((l, a) => [
      ...l,
      Nc(e, a)
    ], []));
  } else
    return Nc(e, n);
}
function Nc(e, t) {
  const n = Rb(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const o = Pb(t).reduce((r, i) => [...r, ed(e, i)], []);
    return e.normalize(o);
  }
}
function ed(e, t) {
  const n = Dd(t);
  switch (n) {
    case 3:
      return Li(t, n);
    case 9:
      return Li(t, n);
    case 4: {
      const o = t;
      if (Rn(o, "k") && o.k)
        return e.interpolate(e.named(o.k));
      if (Rn(o, "key") && o.key)
        return e.interpolate(e.named(o.key));
      throw wi(n);
    }
    case 5: {
      const o = t;
      if (Rn(o, "i") && Et(o.i))
        return e.interpolate(e.list(o.i));
      if (Rn(o, "index") && Et(o.index))
        return e.interpolate(e.list(o.index));
      throw wi(n);
    }
    case 6: {
      const o = t, r = Tb(o), i = _b(o);
      return e.linked(ed(e, i), r ? ed(e, r) : void 0, e.type);
    }
    case 7:
      return Li(t, n);
    case 8:
      return Li(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const Eb = (e) => e;
let Ni = st();
function zb(e, t = {}) {
  let n = !1;
  const o = t.onError || tb;
  return t.onError = (r) => {
    n = !0, o(r);
  }, { ...Cb(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function Ob(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && $e(e)) {
    St(t.warnHtmlMessage) && t.warnHtmlMessage;
    const o = (t.onCacheKey || Eb)(e), r = Ni[o];
    if (r)
      return r;
    const { ast: i, detectError: l } = zb(e, {
      ...t,
      location: !1,
      jit: !0
    }), a = Fl(i);
    return l ? a : Ni[o] = a;
  } else {
    const n = e.cacheKey;
    if (n) {
      const o = Ni[n];
      return o || (Ni[n] = Fl(e));
    } else
      return Fl(e);
  }
}
let yi = null;
function Mb(e) {
  yi = e;
}
function Vb(e, t, n) {
  yi && yi.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const Ib = /* @__PURE__ */ Ab("function:translate");
function Ab(e) {
  return (t) => yi && yi.emit(e, t);
}
const io = {
  INVALID_ARGUMENT: eb,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, Bb = 24;
function ao(e) {
  return nl(e, null, void 0);
}
function Hd(e, t) {
  return t.locale != null ? Dc(t.locale) : Dc(e.locale);
}
let El;
function Dc(e) {
  if ($e(e))
    return e;
  if (yt(e)) {
    if (e.resolvedOnce && El != null)
      return El;
    if (e.constructor.name === "Function") {
      const t = e();
      if (Zm(t))
        throw ao(io.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return El = t;
    } else
      throw ao(io.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw ao(io.NOT_SUPPORT_LOCALE_TYPE);
}
function Lb(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...$t(t) ? t : et(t) ? Object.keys(t) : $e(t) ? [t] : [n]
  ])];
}
function Lp(e, t, n) {
  const o = $e(n) ? n : ja, r = e;
  r.__localeChainCache || (r.__localeChainCache = /* @__PURE__ */ new Map());
  let i = r.__localeChainCache.get(o);
  if (!i) {
    i = [];
    let l = [n];
    for (; $t(l); )
      l = Hc(i, l, t);
    const a = $t(t) || !Qe(t) ? t : t.default ? t.default : null;
    l = $e(a) ? [a] : a, $t(l) && Hc(i, l, !1), r.__localeChainCache.set(o, i);
  }
  return i;
}
function Hc(e, t, n) {
  let o = !0;
  for (let r = 0; r < t.length && St(o); r++) {
    const i = t[r];
    $e(i) && (o = Nb(e, t[r], n));
  }
  return o;
}
function Nb(e, t, n) {
  let o;
  const r = t.split("-");
  do {
    const i = r.join("-");
    o = Db(e, i, n), r.splice(-1, 1);
  } while (r.length && o === !0);
  return o;
}
function Db(e, t, n) {
  let o = !1;
  if (!e.includes(t) && (o = !0, t)) {
    o = t[t.length - 1] !== "!";
    const r = t.replace(/!/g, "");
    e.push(r), ($t(n) || Qe(n)) && n[r] && (o = n[r]);
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
const Hb = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function jb(e) {
  return Hb.test(e);
}
function Wb(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Ub(e) {
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
function Kb(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : jb(t) ? Wb(t) : "*" + t;
}
function qb(e) {
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
      if (r = 0, l === void 0 || (l = Kb(l), l === !1))
        return !1;
      p[
        1
        /* Actions.PUSH */
      ]();
    }
  };
  function v() {
    const u = e[n + 1];
    if (o === 5 && u === "'" || o === 6 && u === '"')
      return n++, a = "\\" + u, p[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; o !== null; )
    if (n++, i = e[n], !(i === "\\" && v())) {
      if (s = Ub(i), h = zo[o], d = h[s] || h.l || 8, d === 8 || (o = d[0], d[1] !== void 0 && (c = p[d[1]], c && (a = i, c() === !1))))
        return;
      if (o === 7)
        return t;
    }
}
const jc = /* @__PURE__ */ new Map();
function Gb(e, t) {
  return et(e) ? e[t] : null;
}
function Xb(e, t) {
  if (!et(e))
    return null;
  let n = jc.get(t);
  if (n || (n = qb(t), n && jc.set(t, n)), !n)
    return null;
  const o = n.length;
  let r = e, i = 0;
  for (; i < o; ) {
    const l = n[i];
    if (Bp.includes(l) && Dn(r))
      return null;
    const a = r[l];
    if (a === void 0 || yt(r))
      return null;
    r = a, i++;
  }
  return r;
}
const Yb = "11.1.12", ol = -1, ja = "en-US", Wc = "", Uc = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function Zb() {
  return {
    upper: (e, t) => t === "text" && $e(e) ? e.toUpperCase() : t === "vnode" && et(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && $e(e) ? e.toLowerCase() : t === "vnode" && et(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && $e(e) ? Uc(e) : t === "vnode" && et(e) && "__v_isVNode" in e ? Uc(e.children) : e
  };
}
let Np;
function Jb(e) {
  Np = e;
}
let Dp;
function Qb(e) {
  Dp = e;
}
let Hp;
function e0(e) {
  Hp = e;
}
let jp = null;
const t0 = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  jp = e;
}, n0 = /* @__NO_SIDE_EFFECTS__ */ () => jp;
let Wp = null;
const Kc = (e) => {
  Wp = e;
}, o0 = () => Wp;
let qc = 0;
function r0(e = {}) {
  const t = yt(e.onWarn) ? e.onWarn : Wm, n = $e(e.version) ? e.version : Yb, o = $e(e.locale) || yt(e.locale) ? e.locale : ja, r = yt(o) ? ja : o, i = $t(e.fallbackLocale) || Qe(e.fallbackLocale) || $e(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : r, l = Qe(e.messages) ? e.messages : zl(r), a = Qe(e.datetimeFormats) ? e.datetimeFormats : zl(r), s = Qe(e.numberFormats) ? e.numberFormats : zl(r), d = Ot(st(), e.modifiers, Zb()), c = e.pluralRules || st(), h = yt(e.missing) ? e.missing : null, p = St(e.missingWarn) || Ha(e.missingWarn) ? e.missingWarn : !0, v = St(e.fallbackWarn) || Ha(e.fallbackWarn) ? e.fallbackWarn : !0, u = !!e.fallbackFormat, g = !!e.unresolving, m = yt(e.postTranslation) ? e.postTranslation : null, f = Qe(e.processor) ? e.processor : null, b = St(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, x = !!e.escapeParameter, y = yt(e.messageCompiler) ? e.messageCompiler : Np, S = yt(e.messageResolver) ? e.messageResolver : Dp || Gb, C = yt(e.localeFallbacker) ? e.localeFallbacker : Hp || Lb, w = et(e.fallbackContext) ? e.fallbackContext : void 0, $ = e, k = et($.__datetimeFormatters) ? $.__datetimeFormatters : /* @__PURE__ */ new Map(), O = et($.__numberFormatters) ? $.__numberFormatters : /* @__PURE__ */ new Map(), G = et($.__meta) ? $.__meta : {};
  qc++;
  const _ = {
    version: n,
    cid: qc,
    locale: o,
    fallbackLocale: i,
    messages: l,
    modifiers: d,
    pluralRules: c,
    missing: h,
    missingWarn: p,
    fallbackWarn: v,
    fallbackFormat: u,
    unresolving: g,
    postTranslation: m,
    processor: f,
    warnHtmlMessage: b,
    escapeParameter: x,
    messageCompiler: y,
    messageResolver: S,
    localeFallbacker: C,
    fallbackContext: w,
    onWarn: t,
    __meta: G
  };
  return _.datetimeFormats = a, _.numberFormats = s, _.__datetimeFormatters = k, _.__numberFormatters = O, __INTLIFY_PROD_DEVTOOLS__ && Vb(_, n, G), _;
}
const zl = (e) => ({ [e]: st() });
function jd(e, t, n, o, r) {
  const { missing: i, onWarn: l } = e;
  if (i !== null) {
    const a = i(e, n, t, r);
    return $e(a) ? a : t;
  } else
    return t;
}
function jr(e, t, n) {
  const o = e;
  o.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function i0(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function a0(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let o = n + 1; o < t.length; o++)
    if (i0(e, t[o]))
      return !0;
  return !1;
}
function Gc(e, ...t) {
  const { datetimeFormats: n, unresolving: o, fallbackLocale: r, onWarn: i, localeFallbacker: l } = e, { __datetimeFormatters: a } = e, [s, d, c, h] = td(...t), p = St(c.missingWarn) ? c.missingWarn : e.missingWarn;
  St(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const v = !!c.part, u = Hd(e, c), g = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    u
  );
  if (!$e(s) || s === "")
    return new Intl.DateTimeFormat(u, h).format(d);
  let m = {}, f, b = null;
  const x = "datetime format";
  for (let C = 0; C < g.length && (f = g[C], m = n[f] || {}, b = m[s], !Qe(b)); C++)
    jd(e, s, f, p, x);
  if (!Qe(b) || !$e(f))
    return o ? ol : s;
  let y = `${f}__${s}`;
  tl(h) || (y = `${y}__${JSON.stringify(h)}`);
  let S = a.get(y);
  return S || (S = new Intl.DateTimeFormat(f, Ot({}, b, h)), a.set(y, S)), v ? S.formatToParts(d) : S.format(d);
}
const Up = [
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
function td(...e) {
  const [t, n, o, r] = e, i = st();
  let l = st(), a;
  if ($e(t)) {
    const s = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!s)
      throw ao(io.INVALID_ISO_DATE_ARGUMENT);
    const d = s[3] ? s[3].trim().startsWith("T") ? `${s[1].trim()}${s[3].trim()}` : `${s[1].trim()}T${s[3].trim()}` : s[1].trim();
    a = new Date(d);
    try {
      a.toISOString();
    } catch {
      throw ao(io.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (qm(t)) {
    if (isNaN(t.getTime()))
      throw ao(io.INVALID_DATE_ARGUMENT);
    a = t;
  } else if (Et(t))
    a = t;
  else
    throw ao(io.INVALID_ARGUMENT);
  return $e(n) ? i.key = n : Qe(n) && Object.keys(n).forEach((s) => {
    Up.includes(s) ? l[s] = n[s] : i[s] = n[s];
  }), $e(o) ? i.locale = o : Qe(o) && (l = o), Qe(r) && (l = r), [i.key || "", a, i, l];
}
function Xc(e, t, n) {
  const o = e;
  for (const r in n) {
    const i = `${t}__${r}`;
    o.__datetimeFormatters.has(i) && o.__datetimeFormatters.delete(i);
  }
}
function Yc(e, ...t) {
  const { numberFormats: n, unresolving: o, fallbackLocale: r, onWarn: i, localeFallbacker: l } = e, { __numberFormatters: a } = e, [s, d, c, h] = nd(...t), p = St(c.missingWarn) ? c.missingWarn : e.missingWarn;
  St(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const v = !!c.part, u = Hd(e, c), g = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    u
  );
  if (!$e(s) || s === "")
    return new Intl.NumberFormat(u, h).format(d);
  let m = {}, f, b = null;
  const x = "number format";
  for (let C = 0; C < g.length && (f = g[C], m = n[f] || {}, b = m[s], !Qe(b)); C++)
    jd(e, s, f, p, x);
  if (!Qe(b) || !$e(f))
    return o ? ol : s;
  let y = `${f}__${s}`;
  tl(h) || (y = `${y}__${JSON.stringify(h)}`);
  let S = a.get(y);
  return S || (S = new Intl.NumberFormat(f, Ot({}, b, h)), a.set(y, S)), v ? S.formatToParts(d) : S.format(d);
}
const Kp = [
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
function nd(...e) {
  const [t, n, o, r] = e, i = st();
  let l = st();
  if (!Et(t))
    throw ao(io.INVALID_ARGUMENT);
  const a = t;
  return $e(n) ? i.key = n : Qe(n) && Object.keys(n).forEach((s) => {
    Kp.includes(s) ? l[s] = n[s] : i[s] = n[s];
  }), $e(o) ? i.locale = o : Qe(o) && (l = o), Qe(r) && (l = r), [i.key || "", a, i, l];
}
function Zc(e, t, n) {
  const o = e;
  for (const r in n) {
    const i = `${t}__${r}`;
    o.__numberFormatters.has(i) && o.__numberFormatters.delete(i);
  }
}
const l0 = (e) => e, s0 = (e) => "", d0 = "text", c0 = (e) => e.length === 0 ? "" : Ld(e), u0 = Jm;
function Jc(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function f0(e) {
  const t = Et(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (Et(e.named.count) || Et(e.named.n)) ? Et(e.named.count) ? e.named.count : Et(e.named.n) ? e.named.n : t : t;
}
function h0(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function p0(e = {}) {
  const t = e.locale, n = f0(e), o = et(e.pluralRules) && $e(t) && yt(e.pluralRules[t]) ? e.pluralRules[t] : Jc, r = et(e.pluralRules) && $e(t) && yt(e.pluralRules[t]) ? Jc : void 0, i = (f) => f[o(n, f.length, r)], l = e.list || [], a = (f) => l[f], s = e.named || st();
  Et(e.pluralIndex) && h0(n, s);
  const d = (f) => s[f];
  function c(f, b) {
    const x = yt(e.messages) ? e.messages(f, !!b) : et(e.messages) ? e.messages[f] : !1;
    return x || (e.parent ? e.parent.message(f) : s0);
  }
  const h = (f) => e.modifiers ? e.modifiers[f] : l0, p = Qe(e.processor) && yt(e.processor.normalize) ? e.processor.normalize : c0, v = Qe(e.processor) && yt(e.processor.interpolate) ? e.processor.interpolate : u0, u = Qe(e.processor) && $e(e.processor.type) ? e.processor.type : d0, m = {
    list: a,
    named: d,
    plural: i,
    linked: (f, ...b) => {
      const [x, y] = b;
      let S = "text", C = "";
      b.length === 1 ? et(x) ? (C = x.modifier || C, S = x.type || S) : $e(x) && (C = x || C) : b.length === 2 && ($e(x) && (C = x || C), $e(y) && (S = y || S));
      const w = c(f, !0)(m), $ = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        S === "vnode" && $t(w) && C ? w[0] : w
      );
      return C ? h(C)($, S) : $;
    },
    message: c,
    type: u,
    interpolate: v,
    normalize: p,
    values: Ot(st(), l, s)
  };
  return m;
}
const Qc = () => "", vn = (e) => yt(e);
function eu(e, ...t) {
  const { fallbackFormat: n, postTranslation: o, unresolving: r, messageCompiler: i, fallbackLocale: l, messages: a } = e, [s, d] = od(...t), c = St(d.missingWarn) ? d.missingWarn : e.missingWarn, h = St(d.fallbackWarn) ? d.fallbackWarn : e.fallbackWarn, p = St(d.escapeParameter) ? d.escapeParameter : e.escapeParameter, v = !!d.resolvedMessage, u = $e(d.default) || St(d.default) ? St(d.default) ? i ? s : () => s : d.default : n ? i ? s : () => s : null, g = n || u != null && ($e(u) || yt(u)), m = Hd(e, d);
  p && v0(d);
  let [f, b, x] = v ? [
    s,
    m,
    a[m] || st()
  ] : qp(e, s, m, l, h, c), y = f, S = s;
  if (!v && !($e(y) || Dn(y) || vn(y)) && g && (y = u, S = y), !v && (!($e(y) || Dn(y) || vn(y)) || !$e(b)))
    return r ? ol : s;
  let C = !1;
  const w = () => {
    C = !0;
  }, $ = vn(y) ? y : Gp(e, s, b, y, S, w);
  if (C)
    return y;
  const k = b0(e, b, x, d), O = p0(k), G = g0(e, $, O);
  let _ = o ? o(G, s) : G;
  if (p && $e(_) && (_ = Xm(_)), __INTLIFY_PROD_DEVTOOLS__) {
    const V = {
      timestamp: Date.now(),
      key: $e(s) ? s : vn(y) ? y.key : "",
      locale: b || (vn(y) ? y.locale : ""),
      format: $e(y) ? y : vn(y) ? y.source : "",
      message: _
    };
    V.meta = Ot({}, e.__meta, /* @__PURE__ */ n0() || {}), Ib(V);
  }
  return _;
}
function v0(e) {
  $t(e.list) ? e.list = e.list.map((t) => $e(t) ? Vc(t) : t) : et(e.named) && Object.keys(e.named).forEach((t) => {
    $e(e.named[t]) && (e.named[t] = Vc(e.named[t]));
  });
}
function qp(e, t, n, o, r, i) {
  const { messages: l, onWarn: a, messageResolver: s, localeFallbacker: d } = e, c = d(e, o, n);
  let h = st(), p, v = null;
  const u = "translate";
  for (let g = 0; g < c.length && (p = c[g], h = l[p] || st(), (v = s(h, t)) === null && (v = h[t]), !($e(v) || Dn(v) || vn(v))); g++)
    if (!a0(p, c)) {
      const m = jd(
        e,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        t,
        p,
        i,
        u
      );
      m !== t && (v = m);
    }
  return [v, p, h];
}
function Gp(e, t, n, o, r, i) {
  const { messageCompiler: l, warnHtmlMessage: a } = e;
  if (vn(o)) {
    const d = o;
    return d.locale = d.locale || n, d.key = d.key || t, d;
  }
  if (l == null) {
    const d = () => o;
    return d.locale = n, d.key = t, d;
  }
  const s = l(o, m0(e, n, r, o, a, i));
  return s.locale = n, s.key = t, s.source = o, s;
}
function g0(e, t, n) {
  return t(n);
}
function od(...e) {
  const [t, n, o] = e, r = st();
  if (!$e(t) && !Et(t) && !vn(t) && !Dn(t))
    throw ao(io.INVALID_ARGUMENT);
  const i = Et(t) ? String(t) : (vn(t), t);
  return Et(n) ? r.plural = n : $e(n) ? r.default = n : Qe(n) && !tl(n) ? r.named = n : $t(n) && (r.list = n), Et(o) ? r.plural = o : $e(o) ? r.default = o : Qe(o) && Ot(r, o), [i, r];
}
function m0(e, t, n, o, r, i) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: r,
    onError: (l) => {
      throw i && i(l), l;
    },
    onCacheKey: (l) => Um(t, n, l)
  };
}
function b0(e, t, n, o) {
  const { modifiers: r, pluralRules: i, messageResolver: l, fallbackLocale: a, fallbackWarn: s, missingWarn: d, fallbackContext: c } = e, p = {
    locale: t,
    modifiers: r,
    pluralRules: i,
    messages: (v, u) => {
      let g = l(n, v);
      if (g == null && (c || u)) {
        const [, , m] = qp(
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
      if ($e(g) || Dn(g)) {
        let m = !1;
        const b = Gp(e, v, t, g, v, () => {
          m = !0;
        });
        return m ? Qc : b;
      } else return vn(g) ? g : Qc;
    }
  };
  return e.processor && (p.processor = e.processor), o.list && (p.list = o.list), o.named && (p.named = o.named), Et(o.plural) && (p.pluralIndex = o.plural), p;
}
Sb();
/*!
  * vue-i18n v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const w0 = window.Vue.createVNode, y0 = window.Vue.Text, Wr = window.Vue.computed, tu = window.Vue.watch, Wd = window.Vue.getCurrentInstance, x0 = window.Vue.ref, C0 = window.Vue.shallowRef, Xp = window.Vue.Fragment, Ud = window.Vue.defineComponent, Yp = window.Vue.h;
window.Vue.effectScope;
const S0 = window.Vue.inject, $0 = window.Vue.onMounted, k0 = window.Vue.onUnmounted;
window.Vue.isRef;
const R0 = "11.1.12";
function P0() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (jo().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (jo().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (jo().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (jo().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const kr = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: Bb,
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
function xi(e, ...t) {
  return nl(e, null, void 0);
}
const rd = /* @__PURE__ */ Zo("__translateVNode"), id = /* @__PURE__ */ Zo("__datetimeParts"), ad = /* @__PURE__ */ Zo("__numberParts"), T0 = Zo("__setPluralRules"), Zp = /* @__PURE__ */ Zo("__injectWithOption"), ld = /* @__PURE__ */ Zo("__dispose");
function Ci(e) {
  if (!et(e) || Dn(e))
    return e;
  for (const t in e)
    if (Rn(e, t))
      if (!t.includes("."))
        et(e[t]) && Ci(e[t]);
      else {
        const n = t.split("."), o = n.length - 1;
        let r = e, i = !1;
        for (let l = 0; l < o; l++) {
          if (n[l] === "__proto__")
            throw new Error(`unsafe key: ${n[l]}`);
          if (n[l] in r || (r[n[l]] = st()), !et(r[n[l]])) {
            i = !0;
            break;
          }
          r = r[n[l]];
        }
        if (i || (Dn(r) ? Bp.includes(n[o]) || delete e[t] : (r[n[o]] = e[t], delete e[t])), !Dn(r)) {
          const l = r[n[o]];
          et(l) && Ci(l);
        }
      }
  return e;
}
function Jp(e, t) {
  const { messages: n, __i18n: o, messageResolver: r, flatJson: i } = t, l = Qe(n) ? n : $t(o) ? st() : { [e]: st() };
  if ($t(o) && o.forEach((a) => {
    if ("locale" in a && "resource" in a) {
      const { locale: s, resource: d } = a;
      s ? (l[s] = l[s] || st(), Aa(d, l[s])) : Aa(d, l);
    } else
      $e(a) && Aa(JSON.parse(a), l);
  }), r == null && i)
    for (const a in l)
      Rn(l, a) && Ci(l[a]);
  return l;
}
function Qp(e) {
  return e.type;
}
function _0(e, t, n) {
  let o = et(t.messages) ? t.messages : st();
  "__i18nGlobal" in n && (o = Jp(e.locale.value, {
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
function nu(e) {
  return w0(y0, null, e, 0);
}
const ou = "__INTLIFY_META__", ru = () => [], F0 = () => !1;
let iu = 0;
function au(e) {
  return (t, n, o, r) => e(n, o, Wd() || void 0, r);
}
const E0 = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = Wd();
  let t = null;
  return e && (t = Qp(e)[ou]) ? { [ou]: t } : null;
};
function z0(e = {}) {
  const { __root: t, __injectWithOption: n } = e, o = t === void 0, r = e.flatJson, i = Oc ? x0 : C0;
  let l = St(e.inheritLocale) ? e.inheritLocale : !0;
  const a = i(
    // prettier-ignore
    t && l ? t.locale.value : $e(e.locale) ? e.locale : ja
  ), s = i(
    // prettier-ignore
    t && l ? t.fallbackLocale.value : $e(e.fallbackLocale) || $t(e.fallbackLocale) || Qe(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : a.value
  ), d = i(Jp(a.value, e)), c = i(Qe(e.datetimeFormats) ? e.datetimeFormats : { [a.value]: {} }), h = i(Qe(e.numberFormats) ? e.numberFormats : { [a.value]: {} });
  let p = t ? t.missingWarn : St(e.missingWarn) || Ha(e.missingWarn) ? e.missingWarn : !0, v = t ? t.fallbackWarn : St(e.fallbackWarn) || Ha(e.fallbackWarn) ? e.fallbackWarn : !0, u = t ? t.fallbackRoot : St(e.fallbackRoot) ? e.fallbackRoot : !0, g = !!e.fallbackFormat, m = yt(e.missing) ? e.missing : null, f = yt(e.missing) ? au(e.missing) : null, b = yt(e.postTranslation) ? e.postTranslation : null, x = t ? t.warnHtmlMessage : St(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, y = !!e.escapeParameter;
  const S = t ? t.modifiers : Qe(e.modifiers) ? e.modifiers : {};
  let C = e.pluralRules || t && t.pluralRules, w;
  w = (() => {
    o && Kc(null);
    const z = {
      version: R0,
      locale: a.value,
      fallbackLocale: s.value,
      messages: d.value,
      modifiers: S,
      pluralRules: C,
      missing: f === null ? void 0 : f,
      missingWarn: p,
      fallbackWarn: v,
      fallbackFormat: g,
      unresolving: !0,
      postTranslation: b === null ? void 0 : b,
      warnHtmlMessage: x,
      escapeParameter: y,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    z.datetimeFormats = c.value, z.numberFormats = h.value, z.__datetimeFormatters = Qe(w) ? w.__datetimeFormatters : void 0, z.__numberFormatters = Qe(w) ? w.__numberFormatters : void 0;
    const K = r0(z);
    return o && Kc(K), K;
  })(), jr(w, a.value, s.value);
  function k() {
    return [
      a.value,
      s.value,
      d.value,
      c.value,
      h.value
    ];
  }
  const O = Wr({
    get: () => a.value,
    set: (z) => {
      w.locale = z, a.value = z;
    }
  }), G = Wr({
    get: () => s.value,
    set: (z) => {
      w.fallbackLocale = z, s.value = z, jr(w, a.value, z);
    }
  }), _ = Wr(() => d.value), V = /* @__PURE__ */ Wr(() => c.value), I = /* @__PURE__ */ Wr(() => h.value);
  function M() {
    return yt(b) ? b : null;
  }
  function X(z) {
    b = z, w.postTranslation = z;
  }
  function H() {
    return m;
  }
  function Q(z) {
    z !== null && (f = au(z)), m = z, w.missing = f;
  }
  const oe = (z, K, me, _e, Ge, vt) => {
    k();
    let Xe;
    try {
      __INTLIFY_PROD_DEVTOOLS__, o || (w.fallbackContext = t ? o0() : void 0), Xe = z(w);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, o || (w.fallbackContext = void 0);
    }
    if (me !== "translate exists" && // for not `te` (e.g `t`)
    Et(Xe) && Xe === ol || me === "translate exists" && !Xe) {
      const [Ye, bt] = K();
      return t && u ? _e(t) : Ge(Ye);
    } else {
      if (vt(Xe))
        return Xe;
      throw xi(kr.UNEXPECTED_RETURN_TYPE);
    }
  };
  function te(...z) {
    return oe((K) => Reflect.apply(eu, null, [K, ...z]), () => od(...z), "translate", (K) => Reflect.apply(K.t, K, [...z]), (K) => K, (K) => $e(K));
  }
  function Y(...z) {
    const [K, me, _e] = z;
    if (_e && !et(_e))
      throw xi(kr.INVALID_ARGUMENT);
    return te(K, me, Ot({ resolvedMessage: !0 }, _e || {}));
  }
  function L(...z) {
    return oe((K) => Reflect.apply(Gc, null, [K, ...z]), () => td(...z), "datetime format", (K) => Reflect.apply(K.d, K, [...z]), () => Wc, (K) => $e(K) || $t(K));
  }
  function Z(...z) {
    return oe((K) => Reflect.apply(Yc, null, [K, ...z]), () => nd(...z), "number format", (K) => Reflect.apply(K.n, K, [...z]), () => Wc, (K) => $e(K) || $t(K));
  }
  function ee(z) {
    return z.map((K) => $e(K) || Et(K) || St(K) ? nu(String(K)) : K);
  }
  const fe = {
    normalize: ee,
    interpolate: (z) => z,
    type: "vnode"
  };
  function ve(...z) {
    return oe((K) => {
      let me;
      const _e = K;
      try {
        _e.processor = fe, me = Reflect.apply(eu, null, [_e, ...z]);
      } finally {
        _e.processor = null;
      }
      return me;
    }, () => od(...z), "translate", (K) => K[rd](...z), (K) => [nu(K)], (K) => $t(K));
  }
  function xe(...z) {
    return oe((K) => Reflect.apply(Yc, null, [K, ...z]), () => nd(...z), "number format", (K) => K[ad](...z), ru, (K) => $e(K) || $t(K));
  }
  function J(...z) {
    return oe((K) => Reflect.apply(Gc, null, [K, ...z]), () => td(...z), "datetime format", (K) => K[id](...z), ru, (K) => $e(K) || $t(K));
  }
  function pe(z) {
    C = z, w.pluralRules = C;
  }
  function j(z, K) {
    return oe(() => {
      if (!z)
        return !1;
      const me = $e(K) ? K : a.value, _e = ye(me), Ge = w.messageResolver(_e, z);
      return Dn(Ge) || vn(Ge) || $e(Ge);
    }, () => [z], "translate exists", (me) => Reflect.apply(me.te, me, [z, K]), F0, (me) => St(me));
  }
  function W(z) {
    let K = null;
    const me = Lp(w, s.value, a.value);
    for (let _e = 0; _e < me.length; _e++) {
      const Ge = d.value[me[_e]] || {}, vt = w.messageResolver(Ge, z);
      if (vt != null) {
        K = vt;
        break;
      }
    }
    return K;
  }
  function ie(z) {
    const K = W(z);
    return K ?? (t ? t.tm(z) || {} : {});
  }
  function ye(z) {
    return d.value[z] || {};
  }
  function Me(z, K) {
    if (r) {
      const me = { [z]: K };
      for (const _e in me)
        Rn(me, _e) && Ci(me[_e]);
      K = me[z];
    }
    d.value[z] = K, w.messages = d.value;
  }
  function ze(z, K) {
    d.value[z] = d.value[z] || {};
    const me = { [z]: K };
    if (r)
      for (const _e in me)
        Rn(me, _e) && Ci(me[_e]);
    K = me[z], Aa(K, d.value[z]), w.messages = d.value;
  }
  function se(z) {
    return c.value[z] || {};
  }
  function P(z, K) {
    c.value[z] = K, w.datetimeFormats = c.value, Xc(w, z, K);
  }
  function R(z, K) {
    c.value[z] = Ot(c.value[z] || {}, K), w.datetimeFormats = c.value, Xc(w, z, K);
  }
  function E(z) {
    return h.value[z] || {};
  }
  function N(z, K) {
    h.value[z] = K, w.numberFormats = h.value, Zc(w, z, K);
  }
  function re(z, K) {
    h.value[z] = Ot(h.value[z] || {}, K), w.numberFormats = h.value, Zc(w, z, K);
  }
  iu++, t && Oc && (tu(t.locale, (z) => {
    l && (a.value = z, w.locale = z, jr(w, a.value, s.value));
  }), tu(t.fallbackLocale, (z) => {
    l && (s.value = z, w.fallbackLocale = z, jr(w, a.value, s.value));
  }));
  const de = {
    id: iu,
    locale: O,
    fallbackLocale: G,
    get inheritLocale() {
      return l;
    },
    set inheritLocale(z) {
      l = z, z && t && (a.value = t.locale.value, s.value = t.fallbackLocale.value, jr(w, a.value, s.value));
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
    set missingWarn(z) {
      p = z, w.missingWarn = p;
    },
    get fallbackWarn() {
      return v;
    },
    set fallbackWarn(z) {
      v = z, w.fallbackWarn = v;
    },
    get fallbackRoot() {
      return u;
    },
    set fallbackRoot(z) {
      u = z;
    },
    get fallbackFormat() {
      return g;
    },
    set fallbackFormat(z) {
      g = z, w.fallbackFormat = g;
    },
    get warnHtmlMessage() {
      return x;
    },
    set warnHtmlMessage(z) {
      x = z, w.warnHtmlMessage = z;
    },
    get escapeParameter() {
      return y;
    },
    set escapeParameter(z) {
      y = z, w.escapeParameter = z;
    },
    t: te,
    getLocaleMessage: ye,
    setLocaleMessage: Me,
    mergeLocaleMessage: ze,
    getPostTranslationHandler: M,
    setPostTranslationHandler: X,
    getMissingHandler: H,
    setMissingHandler: Q,
    [T0]: pe
  };
  return de.datetimeFormats = V, de.numberFormats = I, de.rt = Y, de.te = j, de.tm = ie, de.d = L, de.n = Z, de.getDateTimeFormat = se, de.setDateTimeFormat = P, de.mergeDateTimeFormat = R, de.getNumberFormat = E, de.setNumberFormat = N, de.mergeNumberFormat = re, de[Zp] = n, de[rd] = ve, de[id] = J, de[ad] = xe, de;
}
const Kd = {
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
function O0({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((o, r) => [
    ...o,
    // prettier-ignore
    ...r.type === Xp ? r.children : [r]
  ], []) : t.reduce((n, o) => {
    const r = e[o];
    return r && (n[o] = r()), n;
  }, st());
}
function ev() {
  return Xp;
}
Ot({
  keypath: {
    type: String,
    required: !0
  },
  plural: {
    type: [Number, String],
    validator: (e) => Et(e) || !isNaN(e)
  }
}, Kd);
function M0(e) {
  return $t(e) && !$e(e[0]);
}
function tv(e, t, n, o) {
  const { slots: r, attrs: i } = t;
  return () => {
    const l = { part: !0 };
    let a = st();
    e.locale && (l.locale = e.locale), $e(e.format) ? l.key = e.format : et(e.format) && ($e(e.format.key) && (l.key = e.format.key), a = Object.keys(e.format).reduce((p, v) => n.includes(v) ? Ot(st(), p, { [v]: e.format[v] }) : p, st()));
    const s = o(e.value, l, a);
    let d = [l.key];
    $t(s) ? d = s.map((p, v) => {
      const u = r[p.type], g = u ? u({ [p.type]: p.value, index: v, parts: s }) : [p.value];
      return M0(g) && (g[0].key = `${p.type}-${v}`), g;
    }) : $e(s) && (d = [s]);
    const c = Ot(st(), i), h = $e(e.tag) || et(e.tag) ? e.tag : ev();
    return Yp(h, c, d);
  };
}
Ot({
  value: {
    type: Number,
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, Kd);
const V0 = /* @__PURE__ */ Zo("global-vue-i18n");
function rl(e = {}) {
  const t = Wd();
  if (t == null)
    throw xi(kr.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw xi(kr.NOT_INSTALLED);
  const n = I0(t), o = B0(n), r = Qp(t), i = A0(e, r);
  if (i === "global")
    return _0(o, e, r), o;
  if (i === "parent") {
    let s = L0(n, t, e.__useComponent);
    return s == null && (s = o), s;
  }
  const l = n;
  let a = l.__getInstance(t);
  if (a == null) {
    const s = Ot({}, e);
    "__i18n" in r && (s.__i18n = r.__i18n), o && (s.__root = o), a = z0(s), l.__composerExtend && (a[ld] = l.__composerExtend(a)), D0(l, t, a), l.__setInstance(t, a);
  }
  return a;
}
function I0(e) {
  const t = S0(e.isCE ? V0 : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw xi(e.isCE ? kr.NOT_INSTALLED_WITH_PROVIDE : kr.UNEXPECTED_ERROR);
  return t;
}
function A0(e, t) {
  return tl(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function B0(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function L0(e, t, n = !1) {
  let o = null;
  const r = t.root;
  let i = N0(t, n);
  for (; i != null; ) {
    const l = e;
    if (e.mode === "composition")
      o = l.__getInstance(i);
    else if (__VUE_I18N_LEGACY_API__) {
      const a = l.__getInstance(i);
      a != null && (o = a.__composer, n && o && !o[Zp] && (o = null));
    }
    if (o != null || r === i)
      break;
    i = i.parent;
  }
  return o;
}
function N0(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function D0(e, t, n) {
  $0(() => {
  }, t), k0(() => {
    const o = n;
    e.__deleteInstance(t);
    const r = o[ld];
    r && (r(), delete o[ld]);
  }, t);
}
Ot({
  value: {
    type: [Number, Date],
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, Kd);
P0();
Jb(Ob);
Qb(Xb);
e0(Lp);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = jo();
  e.__INTLIFY__ = !0, Mb(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
function H0(e) {
  let t = ".", n = "__", o = "--", r;
  if (e) {
    let u = e.blockPrefix;
    u && (t = u), u = e.elementPrefix, u && (n = u), u = e.modifierPrefix, u && (o = u);
  }
  const i = {
    install(u) {
      r = u.c;
      const g = u.context;
      g.bem = {}, g.bem.b = null, g.bem.els = null;
    }
  };
  function l(u) {
    let g, m;
    return {
      before(f) {
        g = f.bem.b, m = f.bem.els, f.bem.els = null;
      },
      after(f) {
        f.bem.b = g, f.bem.els = m;
      },
      $({ context: f, props: b }) {
        return u = typeof u == "string" ? u : u({ context: f, props: b }), f.bem.b = u, `${(b == null ? void 0 : b.bPrefix) || t}${f.bem.b}`;
      }
    };
  }
  function a(u) {
    let g;
    return {
      before(m) {
        g = m.bem.els;
      },
      after(m) {
        m.bem.els = g;
      },
      $({ context: m, props: f }) {
        return u = typeof u == "string" ? u : u({ context: m, props: f }), m.bem.els = u.split(",").map((b) => b.trim()), m.bem.els.map((b) => `${(f == null ? void 0 : f.bPrefix) || t}${m.bem.b}${n}${b}`).join(", ");
      }
    };
  }
  function s(u) {
    return {
      $({ context: g, props: m }) {
        u = typeof u == "string" ? u : u({ context: g, props: m });
        const f = u.split(",").map((y) => y.trim());
        function b(y) {
          return f.map((S) => `&${(m == null ? void 0 : m.bPrefix) || t}${g.bem.b}${y !== void 0 ? `${n}${y}` : ""}${o}${S}`).join(", ");
        }
        const x = g.bem.els;
        return x !== null ? b(x[0]) : b();
      }
    };
  }
  function d(u) {
    return {
      $({ context: g, props: m }) {
        u = typeof u == "string" ? u : u({ context: g, props: m });
        const f = g.bem.els;
        return `&:not(${(m == null ? void 0 : m.bPrefix) || t}${g.bem.b}${f !== null && f.length > 0 ? `${n}${f[0]}` : ""}${o}${u})`;
      }
    };
  }
  return Object.assign(i, {
    cB: (...u) => r(l(u[0]), u[1], u[2]),
    cE: (...u) => r(a(u[0]), u[1], u[2]),
    cM: (...u) => r(s(u[0]), u[1], u[2]),
    cNotM: (...u) => r(d(u[0]), u[1], u[2])
  }), i;
}
function j0(e) {
  let t = 0;
  for (let n = 0; n < e.length; ++n)
    e[n] === "&" && ++t;
  return t;
}
const nv = /\s*,(?![^(]*\))\s*/g, W0 = /\s+/g;
function U0(e, t) {
  const n = [];
  return t.split(nv).forEach((o) => {
    let r = j0(o);
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
function K0(e, t) {
  const n = [];
  return t.split(nv).forEach((o) => {
    e.forEach((r) => {
      n.push((r && r + " ") + o);
    });
  }), n;
}
function q0(e) {
  let t = [""];
  return e.forEach((n) => {
    n = n && n.trim(), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    n && (n.includes("&") ? t = U0(t, n) : t = K0(t, n));
  }), t.join(", ").replace(W0, " ");
}
function lu(e) {
  if (!e)
    return;
  const t = e.parentElement;
  t && t.removeChild(e);
}
function il(e, t) {
  return (t ?? document.head).querySelector(`style[cssr-id="${e}"]`);
}
function G0(e) {
  const t = document.createElement("style");
  return t.setAttribute("cssr-id", e), t;
}
function Di(e) {
  return e ? /^\s*@(s|m)/.test(e) : !1;
}
const X0 = /[A-Z]/g;
function ov(e) {
  return e.replace(X0, (t) => "-" + t.toLowerCase());
}
function Y0(e, t = "  ") {
  return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((n) => t + `  ${ov(n[0])}: ${n[1]};`).join(`
`) + `
` + t + "}" : `: ${e};`;
}
function Z0(e, t, n) {
  return typeof e == "function" ? e({
    context: t.context,
    props: n
  }) : e;
}
function su(e, t, n, o) {
  if (!t)
    return "";
  const r = Z0(t, n, o);
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
    a = ov(a), s != null && l.push(`  ${a}${Y0(s)}`);
  }), e && l.push("}"), l.join(`
`);
}
function sd(e, t, n) {
  e && e.forEach((o) => {
    if (Array.isArray(o))
      sd(o, t, n);
    else if (typeof o == "function") {
      const r = o(t);
      Array.isArray(r) ? sd(r, t, n) : r && n(r);
    } else o && n(o);
  });
}
function rv(e, t, n, o, r) {
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
  const a = q0(t), s = su(a, e.props, o, r);
  l ? n.push(`${l} {`) : s.length && n.push(s), e.children && sd(e.children, {
    context: o.context,
    props: r
  }, (d) => {
    if (typeof d == "string") {
      const c = su(a, { raw: d }, o, r);
      n.push(c);
    } else
      rv(d, t, n, o, r);
  }), t.pop(), l && n.push("}"), i && i.after && i.after(o.context);
}
function J0(e, t, n) {
  const o = [];
  return rv(e, [], o, t, n), o.join(`

`);
}
function dd(e) {
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
function Q0(e, t, n, o) {
  const { els: r } = t;
  if (n === void 0)
    r.forEach(lu), t.els = [];
  else {
    const i = il(n, o);
    i && r.includes(i) && (lu(i), t.els = r.filter((l) => l !== i));
  }
}
function du(e, t) {
  e.push(t);
}
function ew(e, t, n, o, r, i, l, a, s) {
  let d;
  if (n === void 0 && (d = t.render(o), n = dd(d)), s) {
    s.adapter(n, d ?? t.render(o));
    return;
  }
  a === void 0 && (a = document.head);
  const c = il(n, a);
  if (c !== null && !i)
    return c;
  const h = c ?? G0(n);
  if (d === void 0 && (d = t.render(o)), h.textContent = d, c !== null)
    return c;
  if (l) {
    const p = a.querySelector(`meta[name="${l}"]`);
    if (p)
      return a.insertBefore(h, p), du(t.els, h), h;
  }
  return r ? a.insertBefore(h, a.querySelector("style, link")) : a.appendChild(h), du(t.els, h), h;
}
function tw(e) {
  return J0(this, this.instance, e);
}
function nw(e = {}) {
  const { id: t, ssr: n, props: o, head: r = !1, force: i = !1, anchorMetaName: l, parent: a } = e;
  return ew(this.instance, this, t, o, r, i, l, a, n);
}
function ow(e = {}) {
  const { id: t, parent: n } = e;
  Q0(this.instance, this, t, n);
}
const Hi = function(e, t, n, o) {
  return {
    instance: e,
    $: t,
    props: n,
    children: o,
    els: [],
    render: tw,
    mount: nw,
    unmount: ow
  };
}, rw = function(e, t, n, o) {
  return Array.isArray(t) ? Hi(e, { $: null }, null, t) : Array.isArray(n) ? Hi(e, t, null, n) : Array.isArray(o) ? Hi(e, t, n, o) : Hi(e, t, n, null);
};
function iv(e = {}) {
  const t = {
    c: (...n) => rw(t, ...n),
    use: (n, ...o) => n.install(t, ...o),
    find: il,
    context: {},
    config: e
  };
  return t;
}
function iw(e, t) {
  if (e === void 0)
    return !1;
  if (t) {
    const { context: { ids: n } } = t;
    return n.has(e);
  }
  return il(e) !== null;
}
const aw = "n", Si = `.${aw}-`, lw = "__", sw = "--", av = iv(), lv = H0({
  blockPrefix: Si,
  elementPrefix: lw,
  modifierPrefix: sw
});
av.use(lv);
const {
  c: D,
  find: AO
} = av, {
  cB: T,
  cE: A,
  cM: B,
  cNotM: rt
} = lv;
function al(e) {
  return D(({
    props: {
      bPrefix: t
    }
  }) => `${t || Si}modal, ${t || Si}drawer`, [e]);
}
function qd(e) {
  return D(({
    props: {
      bPrefix: t
    }
  }) => `${t || Si}popover`, [e]);
}
function sv(e) {
  return D(({
    props: {
      bPrefix: t
    }
  }) => `&${t || Si}modal`, e);
}
const dw = (...e) => D(">", [T(...e)]);
function ne(e, t) {
  return e + (t === "default" ? "" : t.replace(/^[a-z]/, (n) => n.toUpperCase()));
}
let Wa = [];
const dv = /* @__PURE__ */ new WeakMap();
function cw() {
  Wa.forEach((e) => e(...dv.get(e))), Wa = [];
}
function $i(e, ...t) {
  dv.set(e, t), !Wa.includes(e) && Wa.push(e) === 1 && requestAnimationFrame(cw);
}
function mn(e, t) {
  let { target: n } = e;
  for (; n; ) {
    if (n.dataset && n.dataset[t] !== void 0)
      return !0;
    n = n.parentElement;
  }
  return !1;
}
function Rr(e) {
  return e.composedPath()[0] || null;
}
function uw(e) {
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
  const o = uw(e);
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
function kt(e) {
  return typeof e == "string" ? e.endsWith("px") ? Number(e.slice(0, e.length - 2)) : Number(e) : e;
}
function ct(e) {
  if (e != null)
    return typeof e == "number" ? `${e}px` : e.endsWith("px") ? e : `${e}px`;
}
function zt(e, t) {
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
function fw(e, t) {
  const [n, o] = e.split(" ");
  return {
    row: n,
    col: o || n
  };
}
const cu = {
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
function hw(e, t, n) {
  t /= 100, n /= 100;
  let o = (r, i = (r + e / 60) % 6) => n - n * t * Math.max(Math.min(i, 4 - i, 1), 0);
  return [o(5) * 255, o(3) * 255, o(1) * 255];
}
function pw(e, t, n) {
  t /= 100, n /= 100;
  let o = t * Math.min(n, 1 - n), r = (i, l = (i + e / 30) % 12) => n - o * Math.max(Math.min(l - 3, 9 - l, 1), -1);
  return [r(0) * 255, r(8) * 255, r(4) * 255];
}
const qn = "^\\s*", Gn = "\\s*$", ko = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))%\\s*", ln = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", Wo = "([0-9A-Fa-f])", Uo = "([0-9A-Fa-f]{2})", cv = new RegExp(`${qn}hsl\\s*\\(${ln},${ko},${ko}\\)${Gn}`), uv = new RegExp(`${qn}hsv\\s*\\(${ln},${ko},${ko}\\)${Gn}`), fv = new RegExp(`${qn}hsla\\s*\\(${ln},${ko},${ko},${ln}\\)${Gn}`), hv = new RegExp(`${qn}hsva\\s*\\(${ln},${ko},${ko},${ln}\\)${Gn}`), vw = new RegExp(`${qn}rgb\\s*\\(${ln},${ln},${ln}\\)${Gn}`), gw = new RegExp(`${qn}rgba\\s*\\(${ln},${ln},${ln},${ln}\\)${Gn}`), mw = new RegExp(`${qn}#${Wo}${Wo}${Wo}${Gn}`), bw = new RegExp(`${qn}#${Uo}${Uo}${Uo}${Gn}`), ww = new RegExp(`${qn}#${Wo}${Wo}${Wo}${Wo}${Gn}`), yw = new RegExp(`${qn}#${Uo}${Uo}${Uo}${Uo}${Gn}`);
function Qt(e) {
  return parseInt(e, 16);
}
function xw(e) {
  try {
    let t;
    if (t = fv.exec(e))
      return [
        Ua(t[1]),
        $o(t[5]),
        $o(t[9]),
        qo(t[13])
      ];
    if (t = cv.exec(e))
      return [Ua(t[1]), $o(t[5]), $o(t[9]), 1];
    throw new Error(`[seemly/hsla]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function Cw(e) {
  try {
    let t;
    if (t = hv.exec(e))
      return [
        Ua(t[1]),
        $o(t[5]),
        $o(t[9]),
        qo(t[13])
      ];
    if (t = uv.exec(e))
      return [Ua(t[1]), $o(t[5]), $o(t[9]), 1];
    throw new Error(`[seemly/hsva]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function Ro(e) {
  try {
    let t;
    if (t = bw.exec(e))
      return [Qt(t[1]), Qt(t[2]), Qt(t[3]), 1];
    if (t = vw.exec(e))
      return [Ut(t[1]), Ut(t[5]), Ut(t[9]), 1];
    if (t = gw.exec(e))
      return [
        Ut(t[1]),
        Ut(t[5]),
        Ut(t[9]),
        qo(t[13])
      ];
    if (t = mw.exec(e))
      return [
        Qt(t[1] + t[1]),
        Qt(t[2] + t[2]),
        Qt(t[3] + t[3]),
        1
      ];
    if (t = yw.exec(e))
      return [
        Qt(t[1]),
        Qt(t[2]),
        Qt(t[3]),
        qo(Qt(t[4]) / 255)
      ];
    if (t = ww.exec(e))
      return [
        Qt(t[1] + t[1]),
        Qt(t[2] + t[2]),
        Qt(t[3] + t[3]),
        qo(Qt(t[4] + t[4]) / 255)
      ];
    if (e in cu)
      return Ro(cu[e]);
    if (cv.test(e) || fv.test(e)) {
      const [n, o, r, i] = xw(e);
      return [...pw(n, o, r), i];
    } else if (uv.test(e) || hv.test(e)) {
      const [n, o, r, i] = Cw(e);
      return [...hw(n, o, r), i];
    }
    throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function Sw(e) {
  return e > 1 ? 1 : e < 0 ? 0 : e;
}
function cd(e, t, n, o) {
  return `rgba(${Ut(e)}, ${Ut(t)}, ${Ut(n)}, ${Sw(o)})`;
}
function Ol(e, t, n, o, r) {
  return Ut((e * t * (1 - o) + n * o) / r);
}
function Je(e, t) {
  Array.isArray(e) || (e = Ro(e)), Array.isArray(t) || (t = Ro(t));
  const n = e[3], o = t[3], r = qo(n + o - n * o);
  return cd(Ol(e[0], n, t[0], o, r), Ol(e[1], n, t[1], o, r), Ol(e[2], n, t[2], o, r), r);
}
function Ve(e, t) {
  const [n, o, r, i = 1] = Array.isArray(e) ? e : Ro(e);
  return typeof t.alpha == "number" ? cd(n, o, r, t.alpha) : cd(n, o, r, i);
}
function ji(e, t) {
  const [n, o, r, i = 1] = Array.isArray(e) ? e : Ro(e), { lightness: l = 1, alpha: a = 1 } = t;
  return $w([n * l, o * l, r * l, i * a]);
}
function qo(e) {
  const t = Math.round(Number(e) * 100) / 100;
  return t > 1 ? 1 : t < 0 ? 0 : t;
}
function Ua(e) {
  const t = Math.round(Number(e));
  return t >= 360 || t < 0 ? 0 : t;
}
function Ut(e) {
  const t = Math.round(Number(e));
  return t > 255 ? 255 : t < 0 ? 0 : t;
}
function $o(e) {
  const t = Math.round(Number(e));
  return t > 100 ? 100 : t < 0 ? 0 : t;
}
function $w(e) {
  const [t, n, o] = e;
  return 3 in e ? `rgba(${Ut(t)}, ${Ut(n)}, ${Ut(o)}, ${qo(e[3])})` : `rgba(${Ut(t)}, ${Ut(n)}, ${Ut(o)}, 1)`;
}
function ki(e = 8) {
  return Math.random().toString(16).slice(2, 2 + e);
}
function kw(e, t) {
  const n = [];
  for (let o = 0; o < e; ++o)
    n.push(t);
  return n;
}
function Ba(e) {
  return e.composedPath()[0];
}
const Rw = {
  mousemoveoutside: /* @__PURE__ */ new WeakMap(),
  clickoutside: /* @__PURE__ */ new WeakMap()
};
function Pw(e, t, n) {
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
function pv(e, t, n) {
  const o = Rw[e];
  let r = o.get(t);
  r === void 0 && o.set(t, r = /* @__PURE__ */ new WeakMap());
  let i = r.get(n);
  return i === void 0 && r.set(n, i = Pw(e, t, n)), i;
}
function Tw(e, t, n, o) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const r = pv(e, t, n);
    return Object.keys(r).forEach((i) => {
      Ke(i, document, r[i], o);
    }), !0;
  }
  return !1;
}
function _w(e, t, n, o) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const r = pv(e, t, n);
    return Object.keys(r).forEach((i) => {
      qe(i, document, r[i], o);
    }), !0;
  }
  return !1;
}
function Fw() {
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
  function r(w, $, k) {
    const O = w[$];
    return w[$] = function() {
      return k.apply(w, arguments), O.apply(w, arguments);
    }, w;
  }
  function i(w, $) {
    w[$] = Event.prototype[$];
  }
  const l = /* @__PURE__ */ new WeakMap(), a = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
  function s() {
    var w;
    return (w = l.get(this)) !== null && w !== void 0 ? w : null;
  }
  function d(w, $) {
    a !== void 0 && Object.defineProperty(w, "currentTarget", {
      configurable: !0,
      enumerable: !0,
      get: $ ?? a.get
    });
  }
  const c = {
    bubble: {},
    capture: {}
  }, h = {};
  function p() {
    const w = function($) {
      const { type: k, eventPhase: O, bubbles: G } = $, _ = Ba($);
      if (O === 2)
        return;
      const V = O === 1 ? "capture" : "bubble";
      let I = _;
      const M = [];
      for (; I === null && (I = window), M.push(I), I !== window; )
        I = I.parentNode || null;
      const X = c.capture[k], H = c.bubble[k];
      if (r($, "stopPropagation", n), r($, "stopImmediatePropagation", o), d($, s), V === "capture") {
        if (X === void 0)
          return;
        for (let Q = M.length - 1; Q >= 0 && !e.has($); --Q) {
          const oe = M[Q], te = X.get(oe);
          if (te !== void 0) {
            l.set($, oe);
            for (const Y of te) {
              if (t.has($))
                break;
              Y($);
            }
          }
          if (Q === 0 && !G && H !== void 0) {
            const Y = H.get(oe);
            if (Y !== void 0)
              for (const L of Y) {
                if (t.has($))
                  break;
                L($);
              }
          }
        }
      } else if (V === "bubble") {
        if (H === void 0)
          return;
        for (let Q = 0; Q < M.length && !e.has($); ++Q) {
          const oe = M[Q], te = H.get(oe);
          if (te !== void 0) {
            l.set($, oe);
            for (const Y of te) {
              if (t.has($))
                break;
              Y($);
            }
          }
        }
      }
      i($, "stopPropagation"), i($, "stopImmediatePropagation"), d($);
    };
    return w.displayName = "evtdUnifiedHandler", w;
  }
  function v() {
    const w = function($) {
      const { type: k, eventPhase: O } = $;
      if (O !== 2)
        return;
      const G = h[k];
      G !== void 0 && G.forEach((_) => _($));
    };
    return w.displayName = "evtdUnifiedWindowEventHandler", w;
  }
  const u = p(), g = v();
  function m(w, $) {
    const k = c[w];
    return k[$] === void 0 && (k[$] = /* @__PURE__ */ new Map(), window.addEventListener($, u, w === "capture")), k[$];
  }
  function f(w) {
    return h[w] === void 0 && (h[w] = /* @__PURE__ */ new Set(), window.addEventListener(w, g)), h[w];
  }
  function b(w, $) {
    let k = w.get($);
    return k === void 0 && w.set($, k = /* @__PURE__ */ new Set()), k;
  }
  function x(w, $, k, O) {
    const G = c[$][k];
    if (G !== void 0) {
      const _ = G.get(w);
      if (_ !== void 0 && _.has(O))
        return !0;
    }
    return !1;
  }
  function y(w, $) {
    const k = h[w];
    return !!(k !== void 0 && k.has($));
  }
  function S(w, $, k, O) {
    let G;
    if (typeof O == "object" && O.once === !0 ? G = (X) => {
      C(w, $, G, O), k(X);
    } : G = k, Tw(w, $, G, O))
      return;
    const V = O === !0 || typeof O == "object" && O.capture === !0 ? "capture" : "bubble", I = m(V, w), M = b(I, $);
    if (M.has(G) || M.add(G), $ === window) {
      const X = f(w);
      X.has(G) || X.add(G);
    }
  }
  function C(w, $, k, O) {
    if (_w(w, $, k, O))
      return;
    const _ = O === !0 || typeof O == "object" && O.capture === !0, V = _ ? "capture" : "bubble", I = m(V, w), M = b(I, $);
    if ($ === window && !x($, _ ? "bubble" : "capture", w, k) && y(w, k)) {
      const H = h[w];
      H.delete(k), H.size === 0 && (window.removeEventListener(w, g), h[w] = void 0);
    }
    M.has(k) && M.delete(k), M.size === 0 && I.delete($), I.size === 0 && (window.removeEventListener(w, u, V === "capture"), c[V][w] = void 0);
  }
  return {
    on: S,
    off: C
  };
}
const { on: Ke, off: qe } = Fw(), Ew = window.Vue.ref, uu = window.Vue.readonly, zw = window.Vue.watch;
function Ow(e) {
  const t = Ew(!!e.value);
  if (t.value)
    return uu(t);
  const n = zw(e, (o) => {
    o && (t.value = !0, n());
  });
  return uu(t);
}
const Mw = window.Vue.computed, Vw = window.Vue.ref, Iw = window.Vue.watch;
function Ae(e) {
  const t = Mw(e), n = Vw(t.value);
  return Iw(t, (o) => {
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
const Aw = window.Vue.getCurrentInstance;
function Gd() {
  return Aw() !== null;
}
const ll = typeof window < "u", Bw = window.Vue.onMounted, Lw = window.Vue.onBeforeUnmount;
let xr, fi;
const Nw = () => {
  var e, t;
  xr = ll ? (t = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || t === void 0 ? void 0 : t.ready : void 0, fi = !1, xr !== void 0 ? xr.then(() => {
    fi = !0;
  }) : fi = !0;
};
Nw();
function vv(e) {
  if (fi)
    return;
  let t = !1;
  Bw(() => {
    fi || xr == null || xr.then(() => {
      t || e();
    });
  }), Lw(() => {
    t = !0;
  });
}
const gv = window.Vue.ref, fu = window.Vue.readonly, Dw = window.Vue.onBeforeMount, Hw = window.Vue.onBeforeUnmount, ci = gv(null);
function hu(e) {
  if (e.clientX > 0 || e.clientY > 0)
    ci.value = {
      x: e.clientX,
      y: e.clientY
    };
  else {
    const { target: t } = e;
    if (t instanceof Element) {
      const { left: n, top: o, width: r, height: i } = t.getBoundingClientRect();
      n > 0 || o > 0 ? ci.value = {
        x: n + r / 2,
        y: o + i / 2
      } : ci.value = { x: 0, y: 0 };
    } else
      ci.value = null;
  }
}
let Wi = 0, pu = !0;
function jw() {
  if (!ll)
    return fu(gv(null));
  Wi === 0 && Ke("click", document, hu, !0);
  const e = () => {
    Wi += 1;
  };
  return pu && (pu = Gd()) ? (Dw(e), Hw(() => {
    Wi -= 1, Wi === 0 && qe("click", document, hu, !0);
  })) : e(), fu(ci);
}
const Ww = window.Vue.onBeforeMount, Uw = window.Vue.onBeforeUnmount, ud = window.Vue.ref, vu = window.Vue.readonly, Kw = ud(void 0);
let Ui = 0;
function gu() {
  Kw.value = Date.now();
}
let mu = !0;
function qw(e) {
  if (!ll)
    return vu(ud(!1));
  const t = ud(!1);
  let n = null;
  function o() {
    n !== null && window.clearTimeout(n);
  }
  function r() {
    o(), t.value = !0, n = window.setTimeout(() => {
      t.value = !1;
    }, e);
  }
  Ui === 0 && Ke("click", window, gu, !0);
  const i = () => {
    Ui += 1, Ke("click", window, r, !0);
  };
  return mu && (mu = Gd()) ? (Ww(i), Uw(() => {
    Ui -= 1, Ui === 0 && qe("click", window, gu, !0), qe("click", window, r, !0), o();
  })) : i(), vu(t);
}
const Gw = window.Vue.watch, Xw = window.Vue.computed;
function Bt(e, t) {
  return Gw(e, (n) => {
    n !== void 0 && (t.value = n);
  }), Xw(() => e.value === void 0 ? t.value : e.value);
}
const Yw = window.Vue.ref, Zw = window.Vue.onMounted, Jw = window.Vue.readonly;
function zi() {
  const e = Yw(!1);
  return Zw(() => {
    e.value = !0;
  }), Jw(e);
}
const Qw = window.Vue.computed;
function Ka(e, t) {
  return Qw(() => {
    for (const n of t)
      if (e[n] !== void 0)
        return e[n];
    return e[t[t.length - 1]];
  });
}
const ey = (typeof window > "u" ? !1 : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
!window.MSStream;
function ty() {
  return ey;
}
const ny = window.Vue.ref, Ml = window.Vue.computed, oy = window.Vue.onBeforeUnmount, ry = {
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
function iy(e) {
  return `(min-width: ${e}px)`;
}
const Ur = {};
function ay(e = ry) {
  if (!ll)
    return Ml(() => []);
  if (typeof window.matchMedia != "function")
    return Ml(() => []);
  const t = ny({}), n = Object.keys(e), o = (r, i) => {
    r.matches ? t.value[i] = !0 : t.value[i] = !1;
  };
  return n.forEach((r) => {
    const i = e[r];
    let l, a;
    Ur[i] === void 0 ? (l = window.matchMedia(iy(i)), l.addEventListener ? l.addEventListener("change", (s) => {
      a.forEach((d) => {
        d(s, r);
      });
    }) : l.addListener && l.addListener((s) => {
      a.forEach((d) => {
        d(s, r);
      });
    }), a = /* @__PURE__ */ new Set(), Ur[i] = {
      mql: l,
      cbs: a
    }) : (l = Ur[i].mql, a = Ur[i].cbs), a.add(o), l.matches && a.forEach((s) => {
      s(l, r);
    });
  }), oy(() => {
    n.forEach((r) => {
      const { cbs: i } = Ur[e[r]];
      i.has(o) && i.delete(o);
    });
  }), Ml(() => {
    const { value: r } = t;
    return n.filter((i) => r[i]);
  });
}
const ly = window.Vue.onBeforeMount, sy = window.Vue.onBeforeUnmount, dy = window.Vue.reactive, cy = window.Vue.readonly, uy = window.Vue.watch;
function fy(e = {}, t) {
  const n = dy({
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
    (t === void 0 || t.value) && (Ke("keydown", document, i), Ke("keyup", document, l)), t !== void 0 && uy(t, (s) => {
      s ? (Ke("keydown", document, i), Ke("keyup", document, l)) : (qe("keydown", document, i), qe("keyup", document, l));
    });
  };
  return Gd() ? (ly(a), sy(() => {
    (t === void 0 || t.value) && (qe("keydown", document, i), qe("keyup", document, l));
  })) : a(), cy(n);
}
const Xd = "n-internal-select-menu", mv = "n-internal-select-menu-body", sl = "n-drawer-body", dl = "n-modal-body", hy = "n-modal-provider", bv = "n-modal", Oi = "n-popover-body", Ki = window.Vue.inject, py = window.Vue.onBeforeUnmount, vy = window.Vue.onMounted, gy = window.Vue.ref, wv = "__disabled__";
function Un(e) {
  const t = Ki(dl, null), n = Ki(sl, null), o = Ki(Oi, null), r = Ki(mv, null), i = gy();
  if (typeof document < "u") {
    i.value = document.fullscreenElement;
    const l = () => {
      i.value = document.fullscreenElement;
    };
    vy(() => {
      Ke("fullscreenchange", document, l);
    }), py(() => {
      qe("fullscreenchange", document, l);
    });
  }
  return Ae(() => {
    var l;
    const {
      to: a
    } = e;
    return a !== void 0 ? a === !1 ? wv : a === !0 ? i.value || "body" : a : t != null && t.value ? (l = t.value.$el) !== null && l !== void 0 ? l : t.value : n != null && n.value ? n.value : o != null && o.value ? o.value : r != null && r.value ? r.value : a ?? (i.value || "body");
  });
}
Un.tdkey = wv;
Un.propTo = {
  type: [String, Object, Boolean],
  default: void 0
};
const my = window.Vue.getCurrentInstance, by = window.Vue.inject, wy = window.Vue.onBeforeUnmount;
window.Vue.onMounted;
const yy = window.Vue.watch;
function xy(e, t, n) {
  var o;
  const r = by(e, null);
  if (r === null) return;
  const i = (o = my()) === null || o === void 0 ? void 0 : o.proxy;
  yy(n, l), l(n.value), wy(() => {
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
const Cy = window.Vue.ref, Sy = window.Vue.watch;
function $y(e, t, n) {
  const o = Cy(e.value);
  let r = null;
  return Sy(e, (i) => {
    r !== null && window.clearTimeout(r), i === !0 ? n && !n.value ? o.value = !0 : r = window.setTimeout(() => {
      o.value = !0;
    }, t) : o.value = !1;
  }), o;
}
const Jo = typeof document < "u" && typeof window < "u", ky = window.Vue.onBeforeMount, Ry = window.Vue.onBeforeUnmount, Py = window.Vue.ref, Yd = Py(!1);
function bu() {
  Yd.value = !0;
}
function wu() {
  Yd.value = !1;
}
let Kr = 0;
function Ty() {
  return Jo && (ky(() => {
    Kr || (window.addEventListener("compositionstart", bu), window.addEventListener("compositionend", wu)), Kr++;
  }), Ry(() => {
    Kr <= 1 ? (window.removeEventListener("compositionstart", bu), window.removeEventListener("compositionend", wu), Kr = 0) : Kr--;
  })), Yd;
}
const _y = window.Vue.onBeforeUnmount, Fy = window.Vue.onMounted, Ey = window.Vue.ref, zy = window.Vue.watch;
let ir = 0, yu = "", xu = "", Cu = "", Su = "";
const $u = Ey("0px");
function Oy(e) {
  if (typeof document > "u") return;
  const t = document.documentElement;
  let n, o = !1;
  const r = () => {
    t.style.marginRight = yu, t.style.overflow = xu, t.style.overflowX = Cu, t.style.overflowY = Su, $u.value = "0px";
  };
  Fy(() => {
    n = zy(e, (i) => {
      if (i) {
        if (!ir) {
          const l = window.innerWidth - t.offsetWidth;
          l > 0 && (yu = t.style.marginRight, t.style.marginRight = `${l}px`, $u.value = `${l}px`), xu = t.style.overflow, Cu = t.style.overflowX, Su = t.style.overflowY, t.style.overflow = "hidden", t.style.overflowX = "hidden", t.style.overflowY = "hidden";
        }
        o = !0, ir++;
      } else
        ir--, ir || r(), o = !1;
    }, {
      immediate: !0
    });
  }), _y(() => {
    n == null || n(), o && (ir--, ir || r(), o = !1);
  });
}
const My = window.Vue.onActivated, Vy = window.Vue.onDeactivated;
function Iy(e) {
  const t = {
    isDeactivated: !1
  };
  let n = !1;
  return My(() => {
    if (t.isDeactivated = !1, !n) {
      n = !0;
      return;
    }
    e();
  }), Vy(() => {
    t.isDeactivated = !0, n || (n = !0);
  }), t;
}
const Ay = window.Vue.Fragment, By = window.Vue.createTextVNode, Ly = window.Vue.Comment;
function fd(e, t, n = "default") {
  const o = t[n];
  if (o === void 0)
    throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  return o();
}
function hd(e, t = !0, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(By(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        hd(o, t, n);
        return;
      }
      if (o.type === Ay) {
        if (o.children === null)
          return;
        Array.isArray(o.children) && hd(o.children, t, n);
      } else o.type !== Ly && n.push(o);
    }
  }), n;
}
function ku(e, t, n = "default") {
  const o = t[n];
  if (o === void 0)
    throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  const r = hd(o());
  if (r.length === 1)
    return r[0];
  throw new Error(`[vueuc/${e}]: slot[${n}] should have exactly one child.`);
}
let po = null;
function yv() {
  if (po === null && (po = document.getElementById("v-binder-view-measurer"), po === null)) {
    po = document.createElement("div"), po.id = "v-binder-view-measurer";
    const { style: e } = po;
    e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(po);
  }
  return po.getBoundingClientRect();
}
function Ny(e, t) {
  const n = yv();
  return {
    top: t,
    left: e,
    height: 0,
    width: 0,
    right: n.width - e,
    bottom: n.height - t
  };
}
function Vl(e) {
  const t = e.getBoundingClientRect(), n = yv();
  return {
    left: t.left - n.left,
    top: t.top - n.top,
    bottom: n.height + n.top - t.bottom,
    right: n.width + n.left - t.right,
    width: t.width,
    height: t.height
  };
}
function Dy(e) {
  return e.nodeType === 9 ? null : e.parentNode;
}
function xv(e) {
  if (e === null)
    return null;
  const t = Dy(e);
  if (t === null)
    return null;
  if (t.nodeType === 9)
    return document;
  if (t.nodeType === 1) {
    const { overflow: n, overflowX: o, overflowY: r } = getComputedStyle(t);
    if (/(auto|scroll|overlay)/.test(n + r + o))
      return t;
  }
  return xv(t);
}
const Hy = window.Vue.defineComponent, jy = window.Vue.provide, Wy = window.Vue.ref, Uy = window.Vue.inject, Ky = window.Vue.getCurrentInstance, qy = window.Vue.onBeforeUnmount, Zd = Hy({
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
    jy("VBinder", (t = Ky()) === null || t === void 0 ? void 0 : t.proxy);
    const n = Uy("VBinder", null), o = Wy(null), r = (f) => {
      o.value = f, n && e.syncTargetWithParent && n.setTargetRef(f);
    };
    let i = [];
    const l = () => {
      let f = o.value;
      for (; f = xv(f), f !== null; )
        i.push(f);
      for (const b of i)
        Ke("scroll", b, h, !0);
    }, a = () => {
      for (const f of i)
        qe("scroll", f, h, !0);
      i = [];
    }, s = /* @__PURE__ */ new Set(), d = (f) => {
      s.size === 0 && l(), s.has(f) || s.add(f);
    }, c = (f) => {
      s.has(f) && s.delete(f), s.size === 0 && a();
    }, h = () => {
      $i(p);
    }, p = () => {
      s.forEach((f) => f());
    }, v = /* @__PURE__ */ new Set(), u = (f) => {
      v.size === 0 && Ke("resize", window, m), v.has(f) || v.add(f);
    }, g = (f) => {
      v.has(f) && v.delete(f), v.size === 0 && qe("resize", window, m);
    }, m = () => {
      v.forEach((f) => f());
    };
    return qy(() => {
      qe("resize", window, m), a();
    }), {
      targetRef: o,
      setTargetRef: r,
      addScrollListener: d,
      removeScrollListener: c,
      addResizeListener: u,
      removeResizeListener: g
    };
  },
  render() {
    return fd("binder", this.$slots);
  }
}), Gy = window.Vue.defineComponent, Xy = window.Vue.inject, Yy = window.Vue.withDirectives, Jd = Gy({
  name: "Target",
  setup() {
    const { setTargetRef: e, syncTarget: t } = Xy("VBinder");
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
    return e ? Yy(ku("follower", this.$slots), [
      [t]
    ]) : ku("follower", this.$slots);
  }
}), ar = "@@mmoContext", Zy = {
  mounted(e, { value: t }) {
    e[ar] = {
      handler: void 0
    }, typeof t == "function" && (e[ar].handler = t, Ke("mousemoveoutside", e, t));
  },
  updated(e, { value: t }) {
    const n = e[ar];
    typeof t == "function" ? n.handler ? n.handler !== t && (qe("mousemoveoutside", e, n.handler), n.handler = t, Ke("mousemoveoutside", e, t)) : (e[ar].handler = t, Ke("mousemoveoutside", e, t)) : n.handler && (qe("mousemoveoutside", e, n.handler), n.handler = void 0);
  },
  unmounted(e) {
    const { handler: t } = e[ar];
    t && qe("mousemoveoutside", e, t), e[ar].handler = void 0;
  }
}, lr = "@@coContext", Ri = {
  mounted(e, { value: t, modifiers: n }) {
    e[lr] = {
      handler: void 0
    }, typeof t == "function" && (e[lr].handler = t, Ke("clickoutside", e, t, {
      capture: n.capture
    }));
  },
  updated(e, { value: t, modifiers: n }) {
    const o = e[lr];
    typeof t == "function" ? o.handler ? o.handler !== t && (qe("clickoutside", e, o.handler, {
      capture: n.capture
    }), o.handler = t, Ke("clickoutside", e, t, {
      capture: n.capture
    })) : (e[lr].handler = t, Ke("clickoutside", e, t, {
      capture: n.capture
    })) : o.handler && (qe("clickoutside", e, o.handler, {
      capture: n.capture
    }), o.handler = void 0);
  },
  unmounted(e, { modifiers: t }) {
    const { handler: n } = e[lr];
    n && qe("clickoutside", e, n, {
      capture: t.capture
    }), e[lr].handler = void 0;
  }
};
function Jy(e, t) {
  console.error(`[vdirs/${e}]: ${t}`);
}
class Qy {
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
    o.has(t) ? o.delete(t) : n === void 0 && Jy("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
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
const Il = new Qy(), sr = "@@ziContext", Qd = {
  mounted(e, t) {
    const { value: n = {} } = t, { zIndex: o, enabled: r } = n;
    e[sr] = {
      enabled: !!r,
      initialized: !1
    }, r && (Il.ensureZIndex(e, o), e[sr].initialized = !0);
  },
  updated(e, t) {
    const { value: n = {} } = t, { zIndex: o, enabled: r } = n, i = e[sr].enabled;
    r && !i && (Il.ensureZIndex(e, o), e[sr].initialized = !0), e[sr].enabled = !!r;
  },
  unmounted(e, t) {
    if (!e[sr].initialized)
      return;
    const { value: n = {} } = t, { zIndex: o } = n;
    Il.unregister(e, o);
  }
}, ex = window.Vue.inject, tx = "@css-render/vue3-ssr";
function nx(e, t) {
  return `<style cssr-id="${e}">
${t}
</style>`;
}
function ox(e, t, n) {
  const { styles: o, ids: r } = n;
  r.has(e) || o !== null && (r.add(e), o.push(nx(e, t)));
}
const rx = typeof document < "u";
function Oo() {
  if (rx)
    return;
  const e = ex(tx, null);
  if (e !== null)
    return {
      adapter: (t, n) => ox(t, n, e),
      context: e
    };
}
function Ru(e, t) {
  console.error(`[vueuc/${e}]: ${t}`);
}
const { c: Nn } = iv(), cl = "vueuc-style";
function Pu(e) {
  return e & -e;
}
class Cv {
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
      r[t] += n, t += Pu(t);
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
      i += n[t], t -= Pu(t);
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
function Tu(e) {
  return typeof e == "string" ? document.querySelector(e) : e() || null;
}
const ix = window.Vue.Teleport, ax = window.Vue.h, lx = window.Vue.toRef, sx = window.Vue.computed, dx = window.Vue.defineComponent, Sv = dx({
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
      showTeleport: Ow(lx(e, "show")),
      mergedTo: sx(() => {
        const { to: t } = e;
        return t ?? "body";
      })
    };
  },
  render() {
    return this.showTeleport ? this.disabled ? fd("lazy-teleport", this.$slots) : ax(ix, {
      disabled: this.disabled,
      to: this.mergedTo
    }, fd("lazy-teleport", this.$slots)) : null;
  }
}), qi = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, _u = {
  start: "end",
  center: "center",
  end: "start"
}, Al = {
  top: "height",
  bottom: "height",
  left: "width",
  right: "width"
}, cx = {
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
}, ux = {
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
}, fx = {
  "bottom-start": "right",
  "bottom-end": "left",
  "top-start": "right",
  "top-end": "left",
  "right-start": "bottom",
  "right-end": "top",
  "left-start": "bottom",
  "left-end": "top"
}, Fu = {
  top: !0,
  // top++
  bottom: !1,
  // top--
  left: !0,
  // left++
  right: !1
  // left--
}, Eu = {
  top: "end",
  bottom: "start",
  left: "end",
  right: "start"
};
function hx(e, t, n, o, r, i) {
  if (!r || i)
    return { placement: e, top: 0, left: 0 };
  const [l, a] = e.split("-");
  let s = a ?? "center", d = {
    top: 0,
    left: 0
  };
  const c = (v, u, g) => {
    let m = 0, f = 0;
    const b = n[v] - t[u] - t[v];
    return b > 0 && o && (g ? f = Fu[u] ? b : -b : m = Fu[u] ? b : -b), {
      left: m,
      top: f
    };
  }, h = l === "left" || l === "right";
  if (s !== "center") {
    const v = fx[e], u = qi[v], g = Al[v];
    if (n[g] > t[g]) {
      if (
        // current space is not enough
        // ----------[ target ]---------|
        // -------[     follower        ]
        t[v] + t[g] < n[g]
      ) {
        const m = (n[g] - t[g]) / 2;
        t[v] < m || t[u] < m ? t[v] < t[u] ? (s = _u[a], d = c(g, u, h)) : d = c(g, v, h) : s = "center";
      }
    } else n[g] < t[g] && t[u] < 0 && // opposite align has larger space
    // ------------[   target   ]
    // ----------------[follower]
    t[v] > t[u] && (s = _u[a]);
  } else {
    const v = l === "bottom" || l === "top" ? "left" : "top", u = qi[v], g = Al[v], m = (n[g] - t[g]) / 2;
    // center is not enough
    // ----------- [ target ]--|
    // -------[     follower     ]
    (t[v] < m || t[u] < m) && (t[v] > t[u] ? (s = Eu[v], d = c(g, v, h)) : (s = Eu[u], d = c(g, u, h)));
  }
  let p = l;
  return (
    // space is not enough
    t[l] < n[Al[l]] && // opposite position's space is larger
    t[l] < t[qi[l]] && (p = qi[l]), {
      placement: s !== "center" ? `${p}-${s}` : p,
      left: d.left,
      top: d.top
    }
  );
}
function px(e, t) {
  return t ? ux[e] : cx[e];
}
function vx(e, t, n, o, r, i) {
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
const Bl = window.Vue.h, gx = window.Vue.defineComponent, mx = window.Vue.inject, bx = window.Vue.nextTick, Gi = window.Vue.watch, Ll = window.Vue.toRef, zu = window.Vue.ref, wx = window.Vue.onMounted, yx = window.Vue.onBeforeUnmount, xx = window.Vue.withDirectives, Cx = Nn([
  Nn(".v-binder-follower-container", {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    height: "0",
    pointerEvents: "none",
    zIndex: "auto"
  }),
  Nn(".v-binder-follower-content", {
    position: "absolute",
    zIndex: "auto"
  }, [
    Nn("> *", {
      pointerEvents: "all"
    })
  ])
]), ec = gx({
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
    const t = mx("VBinder"), n = Ae(() => e.enabled !== void 0 ? e.enabled : e.show), o = zu(null), r = zu(null), i = () => {
      const { syncTrigger: p } = e;
      p.includes("scroll") && t.addScrollListener(s), p.includes("resize") && t.addResizeListener(s);
    }, l = () => {
      t.removeScrollListener(s), t.removeResizeListener(s);
    };
    wx(() => {
      n.value && (s(), i());
    });
    const a = Oo();
    Cx.mount({
      id: "vueuc/binder",
      head: !0,
      anchorMetaName: cl,
      ssr: a
    }), yx(() => {
      l();
    }), vv(() => {
      n.value && s();
    });
    const s = () => {
      if (!n.value)
        return;
      const p = o.value;
      if (p === null)
        return;
      const v = t.targetRef, { x: u, y: g, overlap: m } = e, f = u !== void 0 && g !== void 0 ? Ny(u, g) : Vl(v);
      p.style.setProperty("--v-target-width", `${Math.round(f.width)}px`), p.style.setProperty("--v-target-height", `${Math.round(f.height)}px`);
      const { width: b, minWidth: x, placement: y, internalShift: S, flip: C } = e;
      p.setAttribute("v-placement", y), m ? p.setAttribute("v-overlap", "") : p.removeAttribute("v-overlap");
      const { style: w } = p;
      b === "target" ? w.width = `${f.width}px` : b !== void 0 ? w.width = b : w.width = "", x === "target" ? w.minWidth = `${f.width}px` : x !== void 0 ? w.minWidth = x : w.minWidth = "";
      const $ = Vl(p), k = Vl(r.value), { left: O, top: G, placement: _ } = hx(y, f, $, S, C, m), V = px(_, m), { left: I, top: M, transform: X } = vx(_, k, f, G, O, m);
      p.setAttribute("v-placement", _), p.style.setProperty("--v-offset-left", `${Math.round(O)}px`), p.style.setProperty("--v-offset-top", `${Math.round(G)}px`), p.style.transform = `translateX(${I}) translateY(${M}) ${X}`, p.style.setProperty("--v-transform-origin", V), p.style.transformOrigin = V;
    };
    Gi(n, (p) => {
      p ? (i(), d()) : l();
    });
    const d = () => {
      bx().then(s).catch((p) => console.error(p));
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
      Gi(Ll(e, p), s);
    }), ["teleportDisabled"].forEach((p) => {
      Gi(Ll(e, p), d);
    }), Gi(Ll(e, "syncTrigger"), (p) => {
      p.includes("resize") ? t.addResizeListener(s) : t.removeResizeListener(s), p.includes("scroll") ? t.addScrollListener(s) : t.removeScrollListener(s);
    });
    const c = zi(), h = Ae(() => {
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
    return Bl(Sv, {
      show: this.show,
      to: this.mergedTo,
      disabled: this.teleportDisabled
    }, {
      default: () => {
        var e, t;
        const n = Bl("div", {
          class: ["v-binder-follower-container", this.containerClass],
          ref: "offsetContainerRef"
        }, [
          Bl("div", {
            class: "v-binder-follower-content",
            ref: "followerRef"
          }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e))
        ]);
        return this.zindexable ? xx(n, [
          [
            Qd,
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
var Go = [], Sx = function() {
  return Go.some(function(e) {
    return e.activeTargets.length > 0;
  });
}, $x = function() {
  return Go.some(function(e) {
    return e.skippedTargets.length > 0;
  });
}, Ou = "ResizeObserver loop completed with undelivered notifications.", kx = function() {
  var e;
  typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
    message: Ou
  }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = Ou), window.dispatchEvent(e);
}, Pi;
(function(e) {
  e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
})(Pi || (Pi = {}));
var Xo = function(e) {
  return Object.freeze(e);
}, Rx = /* @__PURE__ */ function() {
  function e(t, n) {
    this.inlineSize = t, this.blockSize = n, Xo(this);
  }
  return e;
}(), $v = function() {
  function e(t, n, o, r) {
    return this.x = t, this.y = n, this.width = o, this.height = r, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Xo(this);
  }
  return e.prototype.toJSON = function() {
    var t = this, n = t.x, o = t.y, r = t.top, i = t.right, l = t.bottom, a = t.left, s = t.width, d = t.height;
    return { x: n, y: o, top: r, right: i, bottom: l, left: a, width: s, height: d };
  }, e.fromRect = function(t) {
    return new e(t.x, t.y, t.width, t.height);
  }, e;
}(), tc = function(e) {
  return e instanceof SVGElement && "getBBox" in e;
}, kv = function(e) {
  if (tc(e)) {
    var t = e.getBBox(), n = t.width, o = t.height;
    return !n && !o;
  }
  var r = e, i = r.offsetWidth, l = r.offsetHeight;
  return !(i || l || e.getClientRects().length);
}, Mu = function(e) {
  var t;
  if (e instanceof Element)
    return !0;
  var n = (t = e == null ? void 0 : e.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
  return !!(n && e instanceof n.Element);
}, Px = function(e) {
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
}, hi = typeof window < "u" ? window : {}, Xi = /* @__PURE__ */ new WeakMap(), Vu = /auto|scroll/, Tx = /^tb|vertical/, _x = /msie|trident/i.test(hi.navigator && hi.navigator.userAgent), En = function(e) {
  return parseFloat(e || "0");
}, Cr = function(e, t, n) {
  return e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = !1), new Rx((n ? t : e) || 0, (n ? e : t) || 0);
}, Iu = Xo({
  devicePixelContentBoxSize: Cr(),
  borderBoxSize: Cr(),
  contentBoxSize: Cr(),
  contentRect: new $v(0, 0, 0, 0)
}), Rv = function(e, t) {
  if (t === void 0 && (t = !1), Xi.has(e) && !t)
    return Xi.get(e);
  if (kv(e))
    return Xi.set(e, Iu), Iu;
  var n = getComputedStyle(e), o = tc(e) && e.ownerSVGElement && e.getBBox(), r = !_x && n.boxSizing === "border-box", i = Tx.test(n.writingMode || ""), l = !o && Vu.test(n.overflowY || ""), a = !o && Vu.test(n.overflowX || ""), s = o ? 0 : En(n.paddingTop), d = o ? 0 : En(n.paddingRight), c = o ? 0 : En(n.paddingBottom), h = o ? 0 : En(n.paddingLeft), p = o ? 0 : En(n.borderTopWidth), v = o ? 0 : En(n.borderRightWidth), u = o ? 0 : En(n.borderBottomWidth), g = o ? 0 : En(n.borderLeftWidth), m = h + d, f = s + c, b = g + v, x = p + u, y = a ? e.offsetHeight - x - e.clientHeight : 0, S = l ? e.offsetWidth - b - e.clientWidth : 0, C = r ? m + b : 0, w = r ? f + x : 0, $ = o ? o.width : En(n.width) - C - S, k = o ? o.height : En(n.height) - w - y, O = $ + m + S + b, G = k + f + y + x, _ = Xo({
    devicePixelContentBoxSize: Cr(Math.round($ * devicePixelRatio), Math.round(k * devicePixelRatio), i),
    borderBoxSize: Cr(O, G, i),
    contentBoxSize: Cr($, k, i),
    contentRect: new $v(h, s, $, k)
  });
  return Xi.set(e, _), _;
}, Pv = function(e, t, n) {
  var o = Rv(e, n), r = o.borderBoxSize, i = o.contentBoxSize, l = o.devicePixelContentBoxSize;
  switch (t) {
    case Pi.DEVICE_PIXEL_CONTENT_BOX:
      return l;
    case Pi.BORDER_BOX:
      return r;
    default:
      return i;
  }
}, Fx = /* @__PURE__ */ function() {
  function e(t) {
    var n = Rv(t);
    this.target = t, this.contentRect = n.contentRect, this.borderBoxSize = Xo([n.borderBoxSize]), this.contentBoxSize = Xo([n.contentBoxSize]), this.devicePixelContentBoxSize = Xo([n.devicePixelContentBoxSize]);
  }
  return e;
}(), Tv = function(e) {
  if (kv(e))
    return 1 / 0;
  for (var t = 0, n = e.parentNode; n; )
    t += 1, n = n.parentNode;
  return t;
}, Ex = function() {
  var e = 1 / 0, t = [];
  Go.forEach(function(l) {
    if (l.activeTargets.length !== 0) {
      var a = [];
      l.activeTargets.forEach(function(d) {
        var c = new Fx(d.target), h = Tv(d.target);
        a.push(c), d.lastReportedSize = Pv(d.target, d.observedBox), h < e && (e = h);
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
}, Au = function(e) {
  Go.forEach(function(n) {
    n.activeTargets.splice(0, n.activeTargets.length), n.skippedTargets.splice(0, n.skippedTargets.length), n.observationTargets.forEach(function(r) {
      r.isActive() && (Tv(r.target) > e ? n.activeTargets.push(r) : n.skippedTargets.push(r));
    });
  });
}, zx = function() {
  var e = 0;
  for (Au(e); Sx(); )
    e = Ex(), Au(e);
  return $x() && kx(), e > 0;
}, Nl, _v = [], Ox = function() {
  return _v.splice(0).forEach(function(e) {
    return e();
  });
}, Mx = function(e) {
  if (!Nl) {
    var t = 0, n = document.createTextNode(""), o = { characterData: !0 };
    new MutationObserver(function() {
      return Ox();
    }).observe(n, o), Nl = function() {
      n.textContent = "".concat(t ? t-- : t++);
    };
  }
  _v.push(e), Nl();
}, Vx = function(e) {
  Mx(function() {
    requestAnimationFrame(e);
  });
}, La = 0, Ix = function() {
  return !!La;
}, Ax = 250, Bx = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, Bu = [
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
], Lu = function(e) {
  return e === void 0 && (e = 0), Date.now() + e;
}, Dl = !1, Lx = function() {
  function e() {
    var t = this;
    this.stopped = !0, this.listener = function() {
      return t.schedule();
    };
  }
  return e.prototype.run = function(t) {
    var n = this;
    if (t === void 0 && (t = Ax), !Dl) {
      Dl = !0;
      var o = Lu(t);
      Vx(function() {
        var r = !1;
        try {
          r = zx();
        } finally {
          if (Dl = !1, t = o - Lu(), !Ix())
            return;
          r ? n.run(1e3) : t > 0 ? n.run(t) : n.start();
        }
      });
    }
  }, e.prototype.schedule = function() {
    this.stop(), this.run();
  }, e.prototype.observe = function() {
    var t = this, n = function() {
      return t.observer && t.observer.observe(document.body, Bx);
    };
    document.body ? n() : hi.addEventListener("DOMContentLoaded", n);
  }, e.prototype.start = function() {
    var t = this;
    this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), Bu.forEach(function(n) {
      return hi.addEventListener(n, t.listener, !0);
    }));
  }, e.prototype.stop = function() {
    var t = this;
    this.stopped || (this.observer && this.observer.disconnect(), Bu.forEach(function(n) {
      return hi.removeEventListener(n, t.listener, !0);
    }), this.stopped = !0);
  }, e;
}(), pd = new Lx(), Nu = function(e) {
  !La && e > 0 && pd.start(), La += e, !La && pd.stop();
}, Nx = function(e) {
  return !tc(e) && !Px(e) && getComputedStyle(e).display === "inline";
}, Dx = function() {
  function e(t, n) {
    this.target = t, this.observedBox = n || Pi.CONTENT_BOX, this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  return e.prototype.isActive = function() {
    var t = Pv(this.target, this.observedBox, !0);
    return Nx(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
  }, e;
}(), Hx = /* @__PURE__ */ function() {
  function e(t, n) {
    this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = n;
  }
  return e;
}(), Yi = /* @__PURE__ */ new WeakMap(), Du = function(e, t) {
  for (var n = 0; n < e.length; n += 1)
    if (e[n].target === t)
      return n;
  return -1;
}, Zi = function() {
  function e() {
  }
  return e.connect = function(t, n) {
    var o = new Hx(t, n);
    Yi.set(t, o);
  }, e.observe = function(t, n, o) {
    var r = Yi.get(t), i = r.observationTargets.length === 0;
    Du(r.observationTargets, n) < 0 && (i && Go.push(r), r.observationTargets.push(new Dx(n, o && o.box)), Nu(1), pd.schedule());
  }, e.unobserve = function(t, n) {
    var o = Yi.get(t), r = Du(o.observationTargets, n), i = o.observationTargets.length === 1;
    r >= 0 && (i && Go.splice(Go.indexOf(o), 1), o.observationTargets.splice(r, 1), Nu(-1));
  }, e.disconnect = function(t) {
    var n = this, o = Yi.get(t);
    o.observationTargets.slice().forEach(function(r) {
      return n.unobserve(t, r.target);
    }), o.activeTargets.splice(0, o.activeTargets.length);
  }, e;
}(), jx = function() {
  function e(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    if (typeof t != "function")
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    Zi.connect(this, t);
  }
  return e.prototype.observe = function(t, n) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!Mu(t))
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Zi.observe(this, t, n);
  }, e.prototype.unobserve = function(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!Mu(t))
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Zi.unobserve(this, t);
  }, e.prototype.disconnect = function() {
    Zi.disconnect(this);
  }, e.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  }, e;
}();
class Wx {
  constructor() {
    this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || jx)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
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
const pi = new Wx(), Ux = window.Vue.defineComponent, Kx = window.Vue.renderSlot, qx = window.Vue.getCurrentInstance, Gx = window.Vue.onMounted, Xx = window.Vue.onBeforeUnmount, Hn = Ux({
  name: "ResizeObserver",
  props: {
    onResize: Function
  },
  setup(e) {
    let t = !1;
    const n = qx().proxy;
    function o(r) {
      const { onResize: i } = e;
      i !== void 0 && i(r);
    }
    Gx(() => {
      const r = n.$el;
      if (r === void 0) {
        Ru("resize-observer", "$el does not exist.");
        return;
      }
      if (r.nextElementSibling !== r.nextSibling && r.nodeType === 3 && r.nodeValue !== "") {
        Ru("resize-observer", "$el can not be observed (it may be a text node).");
        return;
      }
      r.nextElementSibling !== null && (pi.registerHandler(r.nextElementSibling, o), t = !0);
    }), Xx(() => {
      t && pi.unregisterHandler(n.$el.nextElementSibling);
    });
  },
  render() {
    return Kx(this.$slots, "default");
  }
});
let Ji;
function Yx() {
  return typeof document > "u" ? !1 : (Ji === void 0 && ("matchMedia" in window ? Ji = window.matchMedia("(pointer:coarse)").matches : Ji = !1), Ji);
}
let Hl;
function Hu() {
  return typeof document > "u" ? 1 : (Hl === void 0 && (Hl = "chrome" in window ? window.devicePixelRatio : 1), Hl);
}
const Fv = "VVirtualListXScroll", Zx = window.Vue.computed, Jx = window.Vue.provide, ju = window.Vue.ref;
function Qx({ columnsRef: e, renderColRef: t, renderItemWithColsRef: n }) {
  const o = ju(0), r = ju(0), i = Zx(() => {
    const d = e.value;
    if (d.length === 0)
      return null;
    const c = new Cv(d.length, 0);
    return d.forEach((h, p) => {
      c.add(p, h.width);
    }), c;
  }), l = Ae(() => {
    const d = i.value;
    return d !== null ? Math.max(d.getBound(r.value) - 1, 0) : 0;
  }), a = (d) => {
    const c = i.value;
    return c !== null ? c.sum(d) : 0;
  }, s = Ae(() => {
    const d = i.value;
    return d !== null ? Math.min(d.getBound(r.value + o.value) + 1, e.value.length - 1) : 0;
  });
  return Jx(Fv, {
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
const e1 = window.Vue.defineComponent, t1 = window.Vue.inject, Wu = e1({
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
      t1(Fv)
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
}), n1 = window.Vue.mergeProps, qr = window.Vue.computed, o1 = window.Vue.defineComponent, Gr = window.Vue.ref, r1 = window.Vue.onMounted, Vo = window.Vue.h, i1 = window.Vue.onActivated, a1 = window.Vue.onDeactivated, jl = window.Vue.toRef, l1 = Nn(".v-vl", {
  maxHeight: "inherit",
  height: "100%",
  overflow: "auto",
  minWidth: "1px"
  // a zero width container won't be scrollable
}, [
  Nn("&:not(.v-vl--show-scrollbar)", {
    scrollbarWidth: "none"
  }, [
    Nn("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", {
      width: 0,
      height: 0,
      display: "none"
    })
  ])
]), nc = o1({
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
    l1.mount({
      id: "vueuc/virtual-list",
      head: !0,
      anchorMetaName: cl,
      ssr: t
    }), r1(() => {
      const { defaultScrollIndex: V, defaultScrollKey: I } = e;
      V != null ? m({ index: V }) : I != null && m({ key: I });
    });
    let n = !1, o = !1;
    i1(() => {
      if (n = !1, !o) {
        o = !0;
        return;
      }
      m({ top: v.value, left: l.value });
    }), a1(() => {
      n = !0, o || (o = !0);
    });
    const r = Ae(() => {
      if (e.renderCol == null && e.renderItemWithCols == null || e.columns.length === 0)
        return;
      let V = 0;
      return e.columns.forEach((I) => {
        V += I.width;
      }), V;
    }), i = qr(() => {
      const V = /* @__PURE__ */ new Map(), { keyField: I } = e;
      return e.items.forEach((M, X) => {
        V.set(M[I], X);
      }), V;
    }), { scrollLeftRef: l, listWidthRef: a } = Qx({
      columnsRef: jl(e, "columns"),
      renderColRef: jl(e, "renderCol"),
      renderItemWithColsRef: jl(e, "renderItemWithCols")
    }), s = Gr(null), d = Gr(void 0), c = /* @__PURE__ */ new Map(), h = qr(() => {
      const { items: V, itemSize: I, keyField: M } = e, X = new Cv(V.length, I);
      return V.forEach((H, Q) => {
        const oe = H[M], te = c.get(oe);
        te !== void 0 && X.add(Q, te);
      }), X;
    }), p = Gr(0), v = Gr(0), u = Ae(() => Math.max(h.value.getBound(v.value - kt(e.paddingTop)) - 1, 0)), g = qr(() => {
      const { value: V } = d;
      if (V === void 0)
        return [];
      const { items: I, itemSize: M } = e, X = u.value, H = Math.min(X + Math.ceil(V / M + 1), I.length - 1), Q = [];
      for (let oe = X; oe <= H; ++oe)
        Q.push(I[oe]);
      return Q;
    }), m = (V, I) => {
      if (typeof V == "number") {
        y(V, I, "auto");
        return;
      }
      const { left: M, top: X, index: H, key: Q, position: oe, behavior: te, debounce: Y = !0 } = V;
      if (M !== void 0 || X !== void 0)
        y(M, X, te);
      else if (H !== void 0)
        x(H, te, Y);
      else if (Q !== void 0) {
        const L = i.value.get(Q);
        L !== void 0 && x(L, te, Y);
      } else oe === "bottom" ? y(0, Number.MAX_SAFE_INTEGER, te) : oe === "top" && y(0, 0, te);
    };
    let f, b = null;
    function x(V, I, M) {
      const { value: X } = h, H = X.sum(V) + kt(e.paddingTop);
      if (!M)
        s.value.scrollTo({
          left: 0,
          top: H,
          behavior: I
        });
      else {
        f = V, b !== null && window.clearTimeout(b), b = window.setTimeout(() => {
          f = void 0, b = null;
        }, 16);
        const { scrollTop: Q, offsetHeight: oe } = s.value;
        if (H > Q) {
          const te = X.get(V);
          H + te <= Q + oe || s.value.scrollTo({
            left: 0,
            top: H + te - oe,
            behavior: I
          });
        } else
          s.value.scrollTo({
            left: 0,
            top: H,
            behavior: I
          });
      }
    }
    function y(V, I, M) {
      s.value.scrollTo({
        left: V,
        top: I,
        behavior: M
      });
    }
    function S(V, I) {
      var M, X, H;
      if (n || e.ignoreItemResize || _(I.target))
        return;
      const { value: Q } = h, oe = i.value.get(V), te = Q.get(oe), Y = (H = (X = (M = I.borderBoxSize) === null || M === void 0 ? void 0 : M[0]) === null || X === void 0 ? void 0 : X.blockSize) !== null && H !== void 0 ? H : I.contentRect.height;
      if (Y === te)
        return;
      Y - e.itemSize === 0 ? c.delete(V) : c.set(V, Y - e.itemSize);
      const Z = Y - te;
      if (Z === 0)
        return;
      Q.add(oe, Z);
      const ee = s.value;
      if (ee != null) {
        if (f === void 0) {
          const ue = Q.sum(oe);
          ee.scrollTop > ue && ee.scrollBy(0, Z);
        } else if (oe < f)
          ee.scrollBy(0, Z);
        else if (oe === f) {
          const ue = Q.sum(oe);
          Y + ue > // Note, listEl shouldn't have border, nor offsetHeight won't be
          // correct
          ee.scrollTop + ee.offsetHeight && ee.scrollBy(0, Z);
        }
        G();
      }
      p.value++;
    }
    const C = !Yx();
    let w = !1;
    function $(V) {
      var I;
      (I = e.onScroll) === null || I === void 0 || I.call(e, V), (!C || !w) && G();
    }
    function k(V) {
      var I;
      if ((I = e.onWheel) === null || I === void 0 || I.call(e, V), C) {
        const M = s.value;
        if (M != null) {
          if (V.deltaX === 0 && (M.scrollTop === 0 && V.deltaY <= 0 || M.scrollTop + M.offsetHeight >= M.scrollHeight && V.deltaY >= 0))
            return;
          V.preventDefault(), M.scrollTop += V.deltaY / Hu(), M.scrollLeft += V.deltaX / Hu(), G(), w = !0, $i(() => {
            w = !1;
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
      const { onResize: I } = e;
      I !== void 0 && I(V);
    }
    function G() {
      const { value: V } = s;
      V != null && (v.value = V.scrollTop, l.value = V.scrollLeft);
    }
    function _(V) {
      let I = V;
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
      itemsStyle: qr(() => {
        const { itemResizable: V } = e, I = ct(h.value.sum());
        return p.value, [
          e.itemsStyle,
          {
            boxSizing: "content-box",
            width: ct(r.value),
            height: V ? "" : I,
            minHeight: V ? I : "",
            paddingTop: ct(e.paddingTop),
            paddingBottom: ct(e.paddingBottom)
          }
        ];
      }),
      visibleItemsStyle: qr(() => (p.value, {
        transform: `translateY(${ct(h.value.sum(u.value))})`
      })),
      viewportItems: g,
      listElRef: s,
      itemsElRef: Gr(null),
      scrollTo: m,
      handleListResize: O,
      handleListScroll: $,
      handleListWheel: k,
      handleItemResize: S
    };
  },
  render() {
    const { itemResizable: e, keyField: t, keyToIndex: n, visibleItemsTag: o } = this;
    return Vo(Hn, {
      onResize: this.handleListResize
    }, {
      default: () => {
        var r, i;
        return Vo("div", n1(this.$attrs, {
          class: ["v-vl", this.showScrollbar && "v-vl--show-scrollbar"],
          onScroll: this.handleListScroll,
          onWheel: this.handleListWheel,
          ref: "listElRef"
        }), [
          this.items.length !== 0 ? Vo("div", {
            ref: "itemsElRef",
            class: "v-vl-items",
            style: this.itemsStyle
          }, [
            Vo(o, Object.assign({
              class: "v-vl-visible-items",
              style: this.visibleItemsStyle
            }, this.visibleItemsProps), {
              default: () => {
                const { renderCol: l, renderItemWithCols: a } = this;
                return this.viewportItems.map((s) => {
                  const d = s[t], c = n.get(d), h = l != null ? Vo(Wu, {
                    index: c,
                    item: s
                  }) : void 0, p = a != null ? Vo(Wu, {
                    index: c,
                    item: s
                  }) : void 0, v = this.$slots.default({
                    item: s,
                    renderedCols: h,
                    renderedItemWithCols: p,
                    index: c
                  })[0];
                  return e ? Vo(Hn, {
                    key: d,
                    onResize: (u) => this.handleItemResize(d, u)
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
}), s1 = window.Vue.defineComponent, d1 = window.Vue.h, c1 = window.Vue.ref, u1 = Nn(".v-x-scroll", {
  overflow: "auto",
  scrollbarWidth: "none"
}, [
  Nn("&::-webkit-scrollbar", {
    width: 0,
    height: 0
  })
]), f1 = s1({
  name: "XScroll",
  props: {
    disabled: Boolean,
    onScroll: Function
  },
  setup() {
    const e = c1(null);
    function t(r) {
      !(r.currentTarget.offsetWidth < r.currentTarget.scrollWidth) || r.deltaY === 0 || (r.currentTarget.scrollLeft += r.deltaY + r.deltaX, r.preventDefault());
    }
    const n = Oo();
    return u1.mount({
      id: "vueuc/x-scroll",
      head: !0,
      anchorMetaName: cl,
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
    return d1("div", {
      ref: "selfRef",
      onScroll: this.onScroll,
      onWheel: this.disabled ? void 0 : this.handleWheel,
      class: "v-x-scroll"
    }, this.$slots);
  }
}), h1 = window.Vue.defineComponent, p1 = window.Vue.renderSlot, Uu = window.Vue.h, v1 = window.Vue.onMounted, Ku = window.Vue.ref, g1 = window.Vue.nextTick, Jn = "v-hidden", m1 = Nn("[v-hidden]", {
  display: "none!important"
}), qu = h1({
  name: "Overflow",
  props: {
    getCounter: Function,
    getTail: Function,
    updateCounter: Function,
    onUpdateCount: Function,
    onUpdateOverflow: Function
  },
  setup(e, { slots: t }) {
    const n = Ku(null), o = Ku(null);
    function r(l) {
      const { value: a } = n, { getCounter: s, getTail: d } = e;
      let c;
      if (s !== void 0 ? c = s() : c = o.value, !a || !c)
        return;
      c.hasAttribute(Jn) && c.removeAttribute(Jn);
      const { children: h } = a;
      if (l.showAllItemsBeforeCalculate)
        for (const x of h)
          x.hasAttribute(Jn) && x.removeAttribute(Jn);
      const p = a.offsetWidth, v = [], u = t.tail ? d == null ? void 0 : d() : null;
      let g = u ? u.offsetWidth : 0, m = !1;
      const f = a.children.length - (t.tail ? 1 : 0);
      for (let x = 0; x < f - 1; ++x) {
        if (x < 0)
          continue;
        const y = h[x];
        if (m) {
          y.hasAttribute(Jn) || y.setAttribute(Jn, "");
          continue;
        } else y.hasAttribute(Jn) && y.removeAttribute(Jn);
        const S = y.offsetWidth;
        if (g += S, v[x] = S, g > p) {
          const { updateCounter: C } = e;
          for (let w = x; w >= 0; --w) {
            const $ = f - 1 - w;
            C !== void 0 ? C($) : c.textContent = `${$}`;
            const k = c.offsetWidth;
            if (g -= v[w], g + k <= p || w === 0) {
              m = !0, x = w - 1, u && (x === -1 ? (u.style.maxWidth = `${p - k}px`, u.style.boxSizing = "border-box") : u.style.maxWidth = "");
              const { onUpdateCount: O } = e;
              O && O($);
              break;
            }
          }
        }
      }
      const { onUpdateOverflow: b } = e;
      m ? b !== void 0 && b(!0) : (b !== void 0 && b(!1), c.setAttribute(Jn, ""));
    }
    const i = Oo();
    return m1.mount({
      id: "vueuc/overflow",
      head: !0,
      anchorMetaName: cl,
      ssr: i
    }), v1(() => r({
      showAllItemsBeforeCalculate: !1
    })), {
      selfRef: n,
      counterRef: o,
      sync: r
    };
  },
  render() {
    const { $slots: e } = this;
    return g1(() => this.sync({
      showAllItemsBeforeCalculate: !1
    })), Uu("div", {
      class: "v-overflow",
      ref: "selfRef"
    }, [
      p1(e, "default"),
      // $slots.counter should only has 1 element
      e.counter ? e.counter() : Uu("span", {
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
function Ev(e) {
  return e instanceof HTMLElement;
}
function zv(e) {
  for (let t = 0; t < e.childNodes.length; t++) {
    const n = e.childNodes[t];
    if (Ev(n) && (Mv(n) || zv(n)))
      return !0;
  }
  return !1;
}
function Ov(e) {
  for (let t = e.childNodes.length - 1; t >= 0; t--) {
    const n = e.childNodes[t];
    if (Ev(n) && (Mv(n) || Ov(n)))
      return !0;
  }
  return !1;
}
function Mv(e) {
  if (!b1(e))
    return !1;
  try {
    e.focus({ preventScroll: !0 });
  } catch {
  }
  return document.activeElement === e;
}
function b1(e) {
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
const Wl = window.Vue.h, w1 = window.Vue.defineComponent, Gu = window.Vue.ref, y1 = window.Vue.Fragment, x1 = window.Vue.onMounted, C1 = window.Vue.onBeforeUnmount, S1 = window.Vue.watch;
let Xr = [];
const Vv = w1({
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
    const t = ki(), n = Gu(null), o = Gu(null);
    let r = !1, i = !1;
    const l = typeof document > "u" ? null : document.activeElement;
    function a() {
      return Xr[Xr.length - 1] === t;
    }
    function s(m) {
      var f;
      m.code === "Escape" && a() && ((f = e.onEsc) === null || f === void 0 || f.call(e, m));
    }
    x1(() => {
      S1(() => e.active, (m) => {
        m ? (h(), Ke("keydown", document, s)) : (qe("keydown", document, s), r && p());
      }, {
        immediate: !0
      });
    }), C1(() => {
      qe("keydown", document, s), r && p();
    });
    function d(m) {
      if (!i && a()) {
        const f = c();
        if (f === null || f.contains(Rr(m)))
          return;
        v("first");
      }
    }
    function c() {
      const m = n.value;
      if (m === null)
        return null;
      let f = m;
      for (; f = f.nextSibling, !(f === null || f instanceof Element && f.tagName === "DIV"); )
        ;
      return f;
    }
    function h() {
      var m;
      if (!e.disabled) {
        if (Xr.push(t), e.autoFocus) {
          const { initialFocusTo: f } = e;
          f === void 0 ? v("first") : (m = Tu(f)) === null || m === void 0 || m.focus({ preventScroll: !0 });
        }
        r = !0, document.addEventListener("focus", d, !0);
      }
    }
    function p() {
      var m;
      if (e.disabled || (document.removeEventListener("focus", d, !0), Xr = Xr.filter((b) => b !== t), a()))
        return;
      const { finalFocusTo: f } = e;
      f !== void 0 ? (m = Tu(f)) === null || m === void 0 || m.focus({ preventScroll: !0 }) : e.returnFocusOnDeactivated && l instanceof HTMLElement && (i = !0, l.focus({ preventScroll: !0 }), i = !1);
    }
    function v(m) {
      if (a() && e.active) {
        const f = n.value, b = o.value;
        if (f !== null && b !== null) {
          const x = c();
          if (x == null || x === b) {
            i = !0, f.focus({ preventScroll: !0 }), i = !1;
            return;
          }
          i = !0;
          const y = m === "first" ? zv(x) : Ov(x);
          i = !1, y || (i = !0, f.focus({ preventScroll: !0 }), i = !1);
        }
      }
    }
    function u(m) {
      if (i)
        return;
      const f = c();
      f !== null && (m.relatedTarget !== null && f.contains(m.relatedTarget) ? v("last") : v("first"));
    }
    function g(m) {
      i || (m.relatedTarget !== null && m.relatedTarget === n.value ? v("last") : v("first"));
    }
    return {
      focusableStartRef: n,
      focusableEndRef: o,
      focusableStyle: "position: absolute; height: 0; width: 0;",
      handleStartFocus: u,
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
    return Wl(y1, null, [
      Wl("div", {
        "aria-hidden": "true",
        tabindex: t ? "0" : "-1",
        ref: "focusableStartRef",
        style: n,
        onFocus: this.handleStartFocus
      }),
      e(),
      Wl("div", {
        "aria-hidden": "true",
        style: n,
        ref: "focusableEndRef",
        tabindex: t ? "0" : "-1",
        onFocus: this.handleEndFocus
      })
    ]);
  }
}), $1 = window.Vue.onBeforeUnmount, k1 = window.Vue.onMounted, R1 = window.Vue.watch;
function Iv(e, t) {
  t && (k1(() => {
    const {
      value: n
    } = e;
    n && pi.registerHandler(n, t);
  }), R1(e, (n, o) => {
    o && pi.unregisterHandler(o);
  }, {
    deep: !1
  }), $1(() => {
    const {
      value: n
    } = e;
    n && pi.unregisterHandler(n);
  }));
}
function qa(e) {
  return e.replace(/#|\(|\)|,|\s|\./g, "_");
}
const P1 = /^(\d|\.)+$/, Xu = /(\d|\.)+/;
function Pt(e, {
  c: t = 1,
  offset: n = 0,
  attachPx: o = !0
} = {}) {
  if (typeof e == "number") {
    const r = (e + n) * t;
    return r === 0 ? "0" : `${r}px`;
  } else if (typeof e == "string")
    if (P1.test(e)) {
      const r = (Number(e) + n) * t;
      return o ? r === 0 ? "0" : `${r}px` : `${r}`;
    } else {
      const r = Xu.exec(e);
      return r ? e.replace(Xu, String((Number(r[0]) + n) * t)) : e;
    }
  return e;
}
function Yu(e) {
  const {
    left: t,
    right: n,
    top: o,
    bottom: r
  } = zt(e);
  return `${o} ${t} ${r} ${n}`;
}
function T1(e, t) {
  if (!e) return;
  const n = document.createElement("a");
  n.href = e, t !== void 0 && (n.download = t), document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
let Ul;
function _1() {
  return Ul === void 0 && (Ul = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), Ul;
}
const Av = /* @__PURE__ */ new WeakSet();
function F1(e) {
  Av.add(e);
}
function E1(e) {
  return !Av.has(e);
}
function Zu(e) {
  switch (typeof e) {
    case "string":
      return e || void 0;
    case "number":
      return String(e);
    default:
      return;
  }
}
const z1 = {
  tiny: "mini",
  small: "tiny",
  medium: "small",
  large: "medium",
  huge: "large"
};
function Ju(e) {
  const t = z1[e];
  if (t === void 0)
    throw new Error(`${e} has no smaller size.`);
  return t;
}
function Kn(e, t) {
  console.error(`[naive/${e}]: ${t}`);
}
function Bv(e, t) {
  throw new Error(`[naive/${e}]: ${t}`);
}
function ce(e, ...t) {
  if (Array.isArray(e))
    e.forEach((n) => ce(n, ...t));
  else
    return e(...t);
}
function Lv(e) {
  return (t) => {
    t ? e.value = t.$el : e.value = null;
  };
}
const O1 = window.Vue.Comment, M1 = window.Vue.createTextVNode, V1 = window.Vue.Fragment;
function jn(e, t = !0, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(M1(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        jn(o, t, n);
        return;
      }
      if (o.type === V1) {
        if (o.children === null) return;
        Array.isArray(o.children) && jn(o.children, t, n);
      } else {
        if (o.type === O1 && t) return;
        n.push(o);
      }
    }
  }), n;
}
function I1(e, t = "default", n = void 0) {
  const o = e[t];
  if (!o)
    return Kn("getFirstSlotVNode", `slot[${t}] is empty`), null;
  const r = jn(o(n));
  return r.length === 1 ? r[0] : (Kn("getFirstSlotVNode", `slot[${t}] should have exactly one child`), null);
}
function A1(e, t, n) {
  if (!t)
    return null;
  const o = jn(t(n));
  return o.length === 1 ? o[0] : (Kn("getFirstSlotVNode", `slot[${e}] should have exactly one child`), null);
}
function oc(e, t = "default", n = []) {
  const r = e.$slots[t];
  return r === void 0 ? n : r();
}
const B1 = window.Vue.vShow;
function L1(e) {
  var t;
  const n = (t = e.dirs) === null || t === void 0 ? void 0 : t.find(({
    dir: o
  }) => o === B1);
  return !!(n && n.value === !1);
}
function Po(e, t = [], n) {
  const o = {};
  return t.forEach((r) => {
    o[r] = e[r];
  }), Object.assign(o, n);
}
function To(e) {
  return Object.keys(e);
}
function vi(e) {
  const t = e.filter((n) => n !== void 0);
  if (t.length !== 0)
    return t.length === 1 ? t[0] : (n) => {
      e.forEach((o) => {
        o && o(n);
      });
    };
}
function rc(e, t = [], n) {
  const o = {};
  return Object.getOwnPropertyNames(e).forEach((i) => {
    t.includes(i) || (o[i] = e[i]);
  }), Object.assign(o, n);
}
const Qu = window.Vue.createTextVNode;
function At(e, ...t) {
  return typeof e == "function" ? e(...t) : typeof e == "string" ? Qu(e) : typeof e == "number" ? Qu(String(e)) : null;
}
const N1 = window.Vue.Comment, D1 = window.Vue.Fragment, H1 = window.Vue.isVNode;
function kn(e) {
  return e.some((t) => H1(t) ? !(t.type === N1 || t.type === D1 && !kn(t.children)) : !0) ? e : null;
}
function dn(e, t) {
  return e && kn(e()) || t();
}
function j1(e, t, n) {
  return e && kn(e(t)) || n(t);
}
function Le(e, t) {
  const n = e && kn(e());
  return t(n || null);
}
function Sr(e) {
  return !(e && kn(e()));
}
const W1 = window.Vue.defineComponent, vd = W1({
  render() {
    var e, t;
    return (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e);
  }
}), lo = "n-config-provider", ef = window.Vue.computed, Nv = window.Vue.inject, Dv = window.Vue.shallowRef, Hv = "n";
function He(e = {}, t = {
  defaultBordered: !0
}) {
  const n = Nv(lo, null);
  return {
    // NConfigProvider,
    inlineThemeDisabled: n == null ? void 0 : n.inlineThemeDisabled,
    mergedRtlRef: n == null ? void 0 : n.mergedRtlRef,
    mergedComponentPropsRef: n == null ? void 0 : n.mergedComponentPropsRef,
    mergedBreakpointsRef: n == null ? void 0 : n.mergedBreakpointsRef,
    mergedBorderedRef: ef(() => {
      var o, r;
      const {
        bordered: i
      } = e;
      return i !== void 0 ? i : (r = (o = n == null ? void 0 : n.mergedBorderedRef.value) !== null && o !== void 0 ? o : t.defaultBordered) !== null && r !== void 0 ? r : !0;
    }),
    mergedClsPrefixRef: n ? n.mergedClsPrefixRef : Dv(Hv),
    namespaceRef: ef(() => n == null ? void 0 : n.mergedNamespaceRef.value)
  };
}
function jv() {
  const e = Nv(lo, null);
  return e ? e.mergedClsPrefixRef : Dv(Hv);
}
const U1 = window.Vue.inject, K1 = window.Vue.ref, q1 = window.Vue.watchEffect;
function mt(e, t, n, o) {
  n || Bv("useThemeClass", "cssVarsRef is not passed");
  const r = U1(lo, null), i = r == null ? void 0 : r.mergedThemeHashRef, l = r == null ? void 0 : r.styleMountTarget, a = K1(""), s = Oo();
  let d;
  const c = `__${e}`, h = () => {
    let p = c;
    const v = t ? t.value : void 0, u = i == null ? void 0 : i.value;
    u && (p += `-${u}`), v && (p += `-${v}`);
    const {
      themeOverrides: g,
      builtinThemeOverrides: m
    } = o;
    g && (p += `-${dd(JSON.stringify(g))}`), m && (p += `-${dd(JSON.stringify(m))}`), a.value = p, d = () => {
      const f = n.value;
      let b = "";
      for (const x in f)
        b += `${x}: ${f[x]};`;
      D(`.${p}`, b).mount({
        id: p,
        ssr: s,
        parent: l
      }), d = void 0;
    };
  };
  return q1(() => {
    h();
  }), {
    themeClass: a,
    onRender: () => {
      d == null || d();
    }
  };
}
const Kl = window.Vue.computed, G1 = window.Vue.inject, X1 = window.Vue.onBeforeUnmount, Y1 = window.Vue.provide, gd = "n-form-item";
function so(e, {
  defaultSize: t = "medium",
  mergedSize: n,
  mergedDisabled: o
} = {}) {
  const r = G1(gd, null);
  Y1(gd, null);
  const i = Kl(n ? () => n(r) : () => {
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
  }), l = Kl(o ? () => o(r) : () => {
    const {
      disabled: s
    } = e;
    return s !== void 0 ? s : r ? r.disabled.value : !1;
  }), a = Kl(() => {
    const {
      status: s
    } = e;
    return s || (r == null ? void 0 : r.mergedValidationStatus.value);
  });
  return X1(() => {
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
const Z1 = {
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
function ql(e) {
  return (t = {}) => {
    const n = t.width ? String(t.width) : e.defaultWidth;
    return e.formats[n] || e.formats[e.defaultWidth];
  };
}
function Yr(e) {
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
function Zr(e) {
  return (t, n = {}) => {
    const o = n.width, r = o && e.matchPatterns[o] || e.matchPatterns[e.defaultMatchWidth], i = t.match(r);
    if (!i)
      return null;
    const l = i[0], a = o && e.parsePatterns[o] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(a) ? Q1(a, (h) => h.test(l)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      J1(a, (h) => h.test(l))
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
function J1(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Q1(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function eC(e) {
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
const tC = {
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
}, nC = (e, t, n) => {
  let o;
  const r = tC[e];
  return typeof r == "string" ? o = r : t === 1 ? o = r.one : o = r.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + o : o + " ago" : o;
}, oC = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, rC = (e, t, n, o) => oC[e], iC = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, aC = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, lC = {
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
}, sC = {
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
}, dC = {
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
}, cC = {
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
}, uC = (e, t) => {
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
}, fC = {
  ordinalNumber: uC,
  era: Yr({
    values: iC,
    defaultWidth: "wide"
  }),
  quarter: Yr({
    values: aC,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Yr({
    values: lC,
    defaultWidth: "wide"
  }),
  day: Yr({
    values: sC,
    defaultWidth: "wide"
  }),
  dayPeriod: Yr({
    values: dC,
    defaultWidth: "wide",
    formattingValues: cC,
    defaultFormattingWidth: "wide"
  })
}, hC = /^(\d+)(th|st|nd|rd)?/i, pC = /\d+/i, vC = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, gC = {
  any: [/^b/i, /^(a|c)/i]
}, mC = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, bC = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, wC = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, yC = {
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
}, xC = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, CC = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, SC = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, $C = {
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
}, kC = {
  ordinalNumber: eC({
    matchPattern: hC,
    parsePattern: pC,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: Zr({
    matchPatterns: vC,
    defaultMatchWidth: "wide",
    parsePatterns: gC,
    defaultParseWidth: "any"
  }),
  quarter: Zr({
    matchPatterns: mC,
    defaultMatchWidth: "wide",
    parsePatterns: bC,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: Zr({
    matchPatterns: wC,
    defaultMatchWidth: "wide",
    parsePatterns: yC,
    defaultParseWidth: "any"
  }),
  day: Zr({
    matchPatterns: xC,
    defaultMatchWidth: "wide",
    parsePatterns: CC,
    defaultParseWidth: "any"
  }),
  dayPeriod: Zr({
    matchPatterns: SC,
    defaultMatchWidth: "any",
    parsePatterns: $C,
    defaultParseWidth: "any"
  })
}, RC = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, PC = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, TC = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, _C = {
  date: ql({
    formats: RC,
    defaultWidth: "full"
  }),
  time: ql({
    formats: PC,
    defaultWidth: "full"
  }),
  dateTime: ql({
    formats: TC,
    defaultWidth: "full"
  })
}, FC = {
  code: "en-US",
  formatDistance: nC,
  formatLong: _C,
  formatRelative: rC,
  localize: fC,
  match: kC,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, EC = {
  name: "en-US",
  locale: FC
};
var Wv = typeof global == "object" && global && global.Object === Object && global, zC = typeof self == "object" && self && self.Object === Object && self, Pn = Wv || zC || Function("return this")(), _o = Pn.Symbol, Uv = Object.prototype, OC = Uv.hasOwnProperty, MC = Uv.toString, Jr = _o ? _o.toStringTag : void 0;
function VC(e) {
  var t = OC.call(e, Jr), n = e[Jr];
  try {
    e[Jr] = void 0;
    var o = !0;
  } catch {
  }
  var r = MC.call(e);
  return o && (t ? e[Jr] = n : delete e[Jr]), r;
}
var IC = Object.prototype, AC = IC.toString;
function BC(e) {
  return AC.call(e);
}
var LC = "[object Null]", NC = "[object Undefined]", tf = _o ? _o.toStringTag : void 0;
function Qo(e) {
  return e == null ? e === void 0 ? NC : LC : tf && tf in Object(e) ? VC(e) : BC(e);
}
function Fo(e) {
  return e != null && typeof e == "object";
}
var DC = "[object Symbol]";
function ul(e) {
  return typeof e == "symbol" || Fo(e) && Qo(e) == DC;
}
function Kv(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = Array(o); ++n < o; )
    r[n] = t(e[n], n, e);
  return r;
}
var bn = Array.isArray, nf = _o ? _o.prototype : void 0, of = nf ? nf.toString : void 0;
function qv(e) {
  if (typeof e == "string")
    return e;
  if (bn(e))
    return Kv(e, qv) + "";
  if (ul(e))
    return of ? of.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
var HC = /\s/;
function jC(e) {
  for (var t = e.length; t-- && HC.test(e.charAt(t)); )
    ;
  return t;
}
var WC = /^\s+/;
function UC(e) {
  return e && e.slice(0, jC(e) + 1).replace(WC, "");
}
function wn(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var rf = NaN, KC = /^[-+]0x[0-9a-f]+$/i, qC = /^0b[01]+$/i, GC = /^0o[0-7]+$/i, XC = parseInt;
function af(e) {
  if (typeof e == "number")
    return e;
  if (ul(e))
    return rf;
  if (wn(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = wn(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = UC(e);
  var n = qC.test(e);
  return n || GC.test(e) ? XC(e.slice(2), n ? 2 : 8) : KC.test(e) ? rf : +e;
}
function ic(e) {
  return e;
}
var YC = "[object AsyncFunction]", ZC = "[object Function]", JC = "[object GeneratorFunction]", QC = "[object Proxy]";
function ac(e) {
  if (!wn(e))
    return !1;
  var t = Qo(e);
  return t == ZC || t == JC || t == YC || t == QC;
}
var Gl = Pn["__core-js_shared__"], lf = function() {
  var e = /[^.]+$/.exec(Gl && Gl.keys && Gl.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function eS(e) {
  return !!lf && lf in e;
}
var tS = Function.prototype, nS = tS.toString;
function er(e) {
  if (e != null) {
    try {
      return nS.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var oS = /[\\^$.*+?()[\]{}|]/g, rS = /^\[object .+?Constructor\]$/, iS = Function.prototype, aS = Object.prototype, lS = iS.toString, sS = aS.hasOwnProperty, dS = RegExp(
  "^" + lS.call(sS).replace(oS, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function cS(e) {
  if (!wn(e) || eS(e))
    return !1;
  var t = ac(e) ? dS : rS;
  return t.test(er(e));
}
function uS(e, t) {
  return e == null ? void 0 : e[t];
}
function tr(e, t) {
  var n = uS(e, t);
  return cS(n) ? n : void 0;
}
var md = tr(Pn, "WeakMap"), sf = Object.create, fS = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!wn(t))
      return {};
    if (sf)
      return sf(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}();
function hS(e, t, n) {
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
function pS(e, t) {
  var n = -1, o = e.length;
  for (t || (t = Array(o)); ++n < o; )
    t[n] = e[n];
  return t;
}
var vS = 800, gS = 16, mS = Date.now;
function bS(e) {
  var t = 0, n = 0;
  return function() {
    var o = mS(), r = gS - (o - n);
    if (n = o, r > 0) {
      if (++t >= vS)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function wS(e) {
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
}(), yS = Ga ? function(e, t) {
  return Ga(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: wS(t),
    writable: !0
  });
} : ic, xS = bS(yS), CS = 9007199254740991, SS = /^(?:0|[1-9]\d*)$/;
function lc(e, t) {
  var n = typeof e;
  return t = t ?? CS, !!t && (n == "number" || n != "symbol" && SS.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function sc(e, t, n) {
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
var $S = Object.prototype, kS = $S.hasOwnProperty;
function RS(e, t, n) {
  var o = e[t];
  (!(kS.call(e, t) && Mi(o, n)) || n === void 0 && !(t in e)) && sc(e, t, n);
}
function PS(e, t, n, o) {
  var r = !n;
  n || (n = {});
  for (var i = -1, l = t.length; ++i < l; ) {
    var a = t[i], s = void 0;
    s === void 0 && (s = e[a]), r ? sc(n, a, s) : RS(n, a, s);
  }
  return n;
}
var df = Math.max;
function TS(e, t, n) {
  return t = df(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var o = arguments, r = -1, i = df(o.length - t, 0), l = Array(i); ++r < i; )
      l[r] = o[t + r];
    r = -1;
    for (var a = Array(t + 1); ++r < t; )
      a[r] = o[r];
    return a[t] = n(l), hS(e, this, a);
  };
}
function _S(e, t) {
  return xS(TS(e, t, ic), e + "");
}
var FS = 9007199254740991;
function dc(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= FS;
}
function Fr(e) {
  return e != null && dc(e.length) && !ac(e);
}
function ES(e, t, n) {
  if (!wn(n))
    return !1;
  var o = typeof t;
  return (o == "number" ? Fr(n) && lc(t, n.length) : o == "string" && t in n) ? Mi(n[t], e) : !1;
}
function zS(e) {
  return _S(function(t, n) {
    var o = -1, r = n.length, i = r > 1 ? n[r - 1] : void 0, l = r > 2 ? n[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (r--, i) : void 0, l && ES(n[0], n[1], l) && (i = r < 3 ? void 0 : i, r = 1), t = Object(t); ++o < r; ) {
      var a = n[o];
      a && e(t, a, o, i);
    }
    return t;
  });
}
var OS = Object.prototype;
function cc(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || OS;
  return e === n;
}
function MS(e, t) {
  for (var n = -1, o = Array(e); ++n < e; )
    o[n] = t(n);
  return o;
}
var VS = "[object Arguments]";
function cf(e) {
  return Fo(e) && Qo(e) == VS;
}
var Gv = Object.prototype, IS = Gv.hasOwnProperty, AS = Gv.propertyIsEnumerable, Xa = cf(/* @__PURE__ */ function() {
  return arguments;
}()) ? cf : function(e) {
  return Fo(e) && IS.call(e, "callee") && !AS.call(e, "callee");
};
function BS() {
  return !1;
}
var Xv = typeof exports == "object" && exports && !exports.nodeType && exports, uf = Xv && typeof module == "object" && module && !module.nodeType && module, LS = uf && uf.exports === Xv, ff = LS ? Pn.Buffer : void 0, NS = ff ? ff.isBuffer : void 0, Ya = NS || BS, DS = "[object Arguments]", HS = "[object Array]", jS = "[object Boolean]", WS = "[object Date]", US = "[object Error]", KS = "[object Function]", qS = "[object Map]", GS = "[object Number]", XS = "[object Object]", YS = "[object RegExp]", ZS = "[object Set]", JS = "[object String]", QS = "[object WeakMap]", e$ = "[object ArrayBuffer]", t$ = "[object DataView]", n$ = "[object Float32Array]", o$ = "[object Float64Array]", r$ = "[object Int8Array]", i$ = "[object Int16Array]", a$ = "[object Int32Array]", l$ = "[object Uint8Array]", s$ = "[object Uint8ClampedArray]", d$ = "[object Uint16Array]", c$ = "[object Uint32Array]", pt = {};
pt[n$] = pt[o$] = pt[r$] = pt[i$] = pt[a$] = pt[l$] = pt[s$] = pt[d$] = pt[c$] = !0;
pt[DS] = pt[HS] = pt[e$] = pt[jS] = pt[t$] = pt[WS] = pt[US] = pt[KS] = pt[qS] = pt[GS] = pt[XS] = pt[YS] = pt[ZS] = pt[JS] = pt[QS] = !1;
function u$(e) {
  return Fo(e) && dc(e.length) && !!pt[Qo(e)];
}
function f$(e) {
  return function(t) {
    return e(t);
  };
}
var Yv = typeof exports == "object" && exports && !exports.nodeType && exports, gi = Yv && typeof module == "object" && module && !module.nodeType && module, h$ = gi && gi.exports === Yv, Xl = h$ && Wv.process, hf = function() {
  try {
    var e = gi && gi.require && gi.require("util").types;
    return e || Xl && Xl.binding && Xl.binding("util");
  } catch {
  }
}(), pf = hf && hf.isTypedArray, uc = pf ? f$(pf) : u$, p$ = Object.prototype, v$ = p$.hasOwnProperty;
function Zv(e, t) {
  var n = bn(e), o = !n && Xa(e), r = !n && !o && Ya(e), i = !n && !o && !r && uc(e), l = n || o || r || i, a = l ? MS(e.length, String) : [], s = a.length;
  for (var d in e)
    (t || v$.call(e, d)) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    r && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    lc(d, s))) && a.push(d);
  return a;
}
function Jv(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var g$ = Jv(Object.keys, Object), m$ = Object.prototype, b$ = m$.hasOwnProperty;
function w$(e) {
  if (!cc(e))
    return g$(e);
  var t = [];
  for (var n in Object(e))
    b$.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function fc(e) {
  return Fr(e) ? Zv(e) : w$(e);
}
function y$(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var x$ = Object.prototype, C$ = x$.hasOwnProperty;
function S$(e) {
  if (!wn(e))
    return y$(e);
  var t = cc(e), n = [];
  for (var o in e)
    o == "constructor" && (t || !C$.call(e, o)) || n.push(o);
  return n;
}
function Qv(e) {
  return Fr(e) ? Zv(e, !0) : S$(e);
}
var $$ = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, k$ = /^\w*$/;
function hc(e, t) {
  if (bn(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || ul(e) ? !0 : k$.test(e) || !$$.test(e) || t != null && e in Object(t);
}
var Ti = tr(Object, "create");
function R$() {
  this.__data__ = Ti ? Ti(null) : {}, this.size = 0;
}
function P$(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var T$ = "__lodash_hash_undefined__", _$ = Object.prototype, F$ = _$.hasOwnProperty;
function E$(e) {
  var t = this.__data__;
  if (Ti) {
    var n = t[e];
    return n === T$ ? void 0 : n;
  }
  return F$.call(t, e) ? t[e] : void 0;
}
var z$ = Object.prototype, O$ = z$.hasOwnProperty;
function M$(e) {
  var t = this.__data__;
  return Ti ? t[e] !== void 0 : O$.call(t, e);
}
var V$ = "__lodash_hash_undefined__";
function I$(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = Ti && t === void 0 ? V$ : t, this;
}
function Yo(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Yo.prototype.clear = R$;
Yo.prototype.delete = P$;
Yo.prototype.get = E$;
Yo.prototype.has = M$;
Yo.prototype.set = I$;
function A$() {
  this.__data__ = [], this.size = 0;
}
function fl(e, t) {
  for (var n = e.length; n--; )
    if (Mi(e[n][0], t))
      return n;
  return -1;
}
var B$ = Array.prototype, L$ = B$.splice;
function N$(e) {
  var t = this.__data__, n = fl(t, e);
  if (n < 0)
    return !1;
  var o = t.length - 1;
  return n == o ? t.pop() : L$.call(t, n, 1), --this.size, !0;
}
function D$(e) {
  var t = this.__data__, n = fl(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function H$(e) {
  return fl(this.__data__, e) > -1;
}
function j$(e, t) {
  var n = this.__data__, o = fl(n, e);
  return o < 0 ? (++this.size, n.push([e, t])) : n[o][1] = t, this;
}
function co(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
co.prototype.clear = A$;
co.prototype.delete = N$;
co.prototype.get = D$;
co.prototype.has = H$;
co.prototype.set = j$;
var _i = tr(Pn, "Map");
function W$() {
  this.size = 0, this.__data__ = {
    hash: new Yo(),
    map: new (_i || co)(),
    string: new Yo()
  };
}
function U$(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function hl(e, t) {
  var n = e.__data__;
  return U$(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function K$(e) {
  var t = hl(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function q$(e) {
  return hl(this, e).get(e);
}
function G$(e) {
  return hl(this, e).has(e);
}
function X$(e, t) {
  var n = hl(this, e), o = n.size;
  return n.set(e, t), this.size += n.size == o ? 0 : 1, this;
}
function uo(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
uo.prototype.clear = W$;
uo.prototype.delete = K$;
uo.prototype.get = q$;
uo.prototype.has = G$;
uo.prototype.set = X$;
var Y$ = "Expected a function";
function pc(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Y$);
  var n = function() {
    var o = arguments, r = t ? t.apply(this, o) : o[0], i = n.cache;
    if (i.has(r))
      return i.get(r);
    var l = e.apply(this, o);
    return n.cache = i.set(r, l) || i, l;
  };
  return n.cache = new (pc.Cache || uo)(), n;
}
pc.Cache = uo;
var Z$ = 500;
function J$(e) {
  var t = pc(e, function(o) {
    return n.size === Z$ && n.clear(), o;
  }), n = t.cache;
  return t;
}
var Q$ = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, e2 = /\\(\\)?/g, t2 = J$(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Q$, function(n, o, r, i) {
    t.push(r ? i.replace(e2, "$1") : o || n);
  }), t;
});
function eg(e) {
  return e == null ? "" : qv(e);
}
function tg(e, t) {
  return bn(e) ? e : hc(e, t) ? [e] : t2(eg(e));
}
function pl(e) {
  if (typeof e == "string" || ul(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function ng(e, t) {
  t = tg(t, e);
  for (var n = 0, o = t.length; e != null && n < o; )
    e = e[pl(t[n++])];
  return n && n == o ? e : void 0;
}
function Fi(e, t, n) {
  var o = e == null ? void 0 : ng(e, t);
  return o === void 0 ? n : o;
}
function n2(e, t) {
  for (var n = -1, o = t.length, r = e.length; ++n < o; )
    e[r + n] = t[n];
  return e;
}
var og = Jv(Object.getPrototypeOf, Object), o2 = "[object Object]", r2 = Function.prototype, i2 = Object.prototype, rg = r2.toString, a2 = i2.hasOwnProperty, l2 = rg.call(Object);
function s2(e) {
  if (!Fo(e) || Qo(e) != o2)
    return !1;
  var t = og(e);
  if (t === null)
    return !0;
  var n = a2.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && rg.call(n) == l2;
}
function d2(e, t, n) {
  var o = -1, r = e.length;
  t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var i = Array(r); ++o < r; )
    i[o] = e[o + t];
  return i;
}
function c2(e, t, n) {
  var o = e.length;
  return n = n === void 0 ? o : n, !t && n >= o ? e : d2(e, t, n);
}
var u2 = "\\ud800-\\udfff", f2 = "\\u0300-\\u036f", h2 = "\\ufe20-\\ufe2f", p2 = "\\u20d0-\\u20ff", v2 = f2 + h2 + p2, g2 = "\\ufe0e\\ufe0f", m2 = "\\u200d", b2 = RegExp("[" + m2 + u2 + v2 + g2 + "]");
function ig(e) {
  return b2.test(e);
}
function w2(e) {
  return e.split("");
}
var ag = "\\ud800-\\udfff", y2 = "\\u0300-\\u036f", x2 = "\\ufe20-\\ufe2f", C2 = "\\u20d0-\\u20ff", S2 = y2 + x2 + C2, $2 = "\\ufe0e\\ufe0f", k2 = "[" + ag + "]", bd = "[" + S2 + "]", wd = "\\ud83c[\\udffb-\\udfff]", R2 = "(?:" + bd + "|" + wd + ")", lg = "[^" + ag + "]", sg = "(?:\\ud83c[\\udde6-\\uddff]){2}", dg = "[\\ud800-\\udbff][\\udc00-\\udfff]", P2 = "\\u200d", cg = R2 + "?", ug = "[" + $2 + "]?", T2 = "(?:" + P2 + "(?:" + [lg, sg, dg].join("|") + ")" + ug + cg + ")*", _2 = ug + cg + T2, F2 = "(?:" + [lg + bd + "?", bd, sg, dg, k2].join("|") + ")", E2 = RegExp(wd + "(?=" + wd + ")|" + F2 + _2, "g");
function z2(e) {
  return e.match(E2) || [];
}
function O2(e) {
  return ig(e) ? z2(e) : w2(e);
}
function M2(e) {
  return function(t) {
    t = eg(t);
    var n = ig(t) ? O2(t) : void 0, o = n ? n[0] : t.charAt(0), r = n ? c2(n, 1).join("") : t.slice(1);
    return o[e]() + r;
  };
}
var V2 = M2("toUpperCase");
function I2() {
  this.__data__ = new co(), this.size = 0;
}
function A2(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function B2(e) {
  return this.__data__.get(e);
}
function L2(e) {
  return this.__data__.has(e);
}
var N2 = 200;
function D2(e, t) {
  var n = this.__data__;
  if (n instanceof co) {
    var o = n.__data__;
    if (!_i || o.length < N2 - 1)
      return o.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new uo(o);
  }
  return n.set(e, t), this.size = n.size, this;
}
function Wn(e) {
  var t = this.__data__ = new co(e);
  this.size = t.size;
}
Wn.prototype.clear = I2;
Wn.prototype.delete = A2;
Wn.prototype.get = B2;
Wn.prototype.has = L2;
Wn.prototype.set = D2;
var fg = typeof exports == "object" && exports && !exports.nodeType && exports, vf = fg && typeof module == "object" && module && !module.nodeType && module, H2 = vf && vf.exports === fg, gf = H2 ? Pn.Buffer : void 0;
gf && gf.allocUnsafe;
function j2(e, t) {
  return e.slice();
}
function W2(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = 0, i = []; ++n < o; ) {
    var l = e[n];
    t(l, n, e) && (i[r++] = l);
  }
  return i;
}
function U2() {
  return [];
}
var K2 = Object.prototype, q2 = K2.propertyIsEnumerable, mf = Object.getOwnPropertySymbols, G2 = mf ? function(e) {
  return e == null ? [] : (e = Object(e), W2(mf(e), function(t) {
    return q2.call(e, t);
  }));
} : U2;
function X2(e, t, n) {
  var o = t(e);
  return bn(e) ? o : n2(o, n(e));
}
function bf(e) {
  return X2(e, fc, G2);
}
var yd = tr(Pn, "DataView"), xd = tr(Pn, "Promise"), Cd = tr(Pn, "Set"), wf = "[object Map]", Y2 = "[object Object]", yf = "[object Promise]", xf = "[object Set]", Cf = "[object WeakMap]", Sf = "[object DataView]", Z2 = er(yd), J2 = er(_i), Q2 = er(xd), ek = er(Cd), tk = er(md), So = Qo;
(yd && So(new yd(new ArrayBuffer(1))) != Sf || _i && So(new _i()) != wf || xd && So(xd.resolve()) != yf || Cd && So(new Cd()) != xf || md && So(new md()) != Cf) && (So = function(e) {
  var t = Qo(e), n = t == Y2 ? e.constructor : void 0, o = n ? er(n) : "";
  if (o)
    switch (o) {
      case Z2:
        return Sf;
      case J2:
        return wf;
      case Q2:
        return yf;
      case ek:
        return xf;
      case tk:
        return Cf;
    }
  return t;
});
var Za = Pn.Uint8Array;
function nk(e) {
  var t = new e.constructor(e.byteLength);
  return new Za(t).set(new Za(e)), t;
}
function ok(e, t) {
  var n = nk(e.buffer);
  return new e.constructor(n, e.byteOffset, e.length);
}
function rk(e) {
  return typeof e.constructor == "function" && !cc(e) ? fS(og(e)) : {};
}
var ik = "__lodash_hash_undefined__";
function ak(e) {
  return this.__data__.set(e, ik), this;
}
function lk(e) {
  return this.__data__.has(e);
}
function Ja(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new uo(); ++t < n; )
    this.add(e[t]);
}
Ja.prototype.add = Ja.prototype.push = ak;
Ja.prototype.has = lk;
function sk(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function dk(e, t) {
  return e.has(t);
}
var ck = 1, uk = 2;
function hg(e, t, n, o, r, i) {
  var l = n & ck, a = e.length, s = t.length;
  if (a != s && !(l && s > a))
    return !1;
  var d = i.get(e), c = i.get(t);
  if (d && c)
    return d == t && c == e;
  var h = -1, p = !0, v = n & uk ? new Ja() : void 0;
  for (i.set(e, t), i.set(t, e); ++h < a; ) {
    var u = e[h], g = t[h];
    if (o)
      var m = l ? o(g, u, h, t, e, i) : o(u, g, h, e, t, i);
    if (m !== void 0) {
      if (m)
        continue;
      p = !1;
      break;
    }
    if (v) {
      if (!sk(t, function(f, b) {
        if (!dk(v, b) && (u === f || r(u, f, n, o, i)))
          return v.push(b);
      })) {
        p = !1;
        break;
      }
    } else if (!(u === g || r(u, g, n, o, i))) {
      p = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), p;
}
function fk(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o, r) {
    n[++t] = [r, o];
  }), n;
}
function hk(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o) {
    n[++t] = o;
  }), n;
}
var pk = 1, vk = 2, gk = "[object Boolean]", mk = "[object Date]", bk = "[object Error]", wk = "[object Map]", yk = "[object Number]", xk = "[object RegExp]", Ck = "[object Set]", Sk = "[object String]", $k = "[object Symbol]", kk = "[object ArrayBuffer]", Rk = "[object DataView]", $f = _o ? _o.prototype : void 0, Yl = $f ? $f.valueOf : void 0;
function Pk(e, t, n, o, r, i, l) {
  switch (n) {
    case Rk:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case kk:
      return !(e.byteLength != t.byteLength || !i(new Za(e), new Za(t)));
    case gk:
    case mk:
    case yk:
      return Mi(+e, +t);
    case bk:
      return e.name == t.name && e.message == t.message;
    case xk:
    case Sk:
      return e == t + "";
    case wk:
      var a = fk;
    case Ck:
      var s = o & pk;
      if (a || (a = hk), e.size != t.size && !s)
        return !1;
      var d = l.get(e);
      if (d)
        return d == t;
      o |= vk, l.set(e, t);
      var c = hg(a(e), a(t), o, r, i, l);
      return l.delete(e), c;
    case $k:
      if (Yl)
        return Yl.call(e) == Yl.call(t);
  }
  return !1;
}
var Tk = 1, _k = Object.prototype, Fk = _k.hasOwnProperty;
function Ek(e, t, n, o, r, i) {
  var l = n & Tk, a = bf(e), s = a.length, d = bf(t), c = d.length;
  if (s != c && !l)
    return !1;
  for (var h = s; h--; ) {
    var p = a[h];
    if (!(l ? p in t : Fk.call(t, p)))
      return !1;
  }
  var v = i.get(e), u = i.get(t);
  if (v && u)
    return v == t && u == e;
  var g = !0;
  i.set(e, t), i.set(t, e);
  for (var m = l; ++h < s; ) {
    p = a[h];
    var f = e[p], b = t[p];
    if (o)
      var x = l ? o(b, f, p, t, e, i) : o(f, b, p, e, t, i);
    if (!(x === void 0 ? f === b || r(f, b, n, o, i) : x)) {
      g = !1;
      break;
    }
    m || (m = p == "constructor");
  }
  if (g && !m) {
    var y = e.constructor, S = t.constructor;
    y != S && "constructor" in e && "constructor" in t && !(typeof y == "function" && y instanceof y && typeof S == "function" && S instanceof S) && (g = !1);
  }
  return i.delete(e), i.delete(t), g;
}
var zk = 1, kf = "[object Arguments]", Rf = "[object Array]", Qi = "[object Object]", Ok = Object.prototype, Pf = Ok.hasOwnProperty;
function Mk(e, t, n, o, r, i) {
  var l = bn(e), a = bn(t), s = l ? Rf : So(e), d = a ? Rf : So(t);
  s = s == kf ? Qi : s, d = d == kf ? Qi : d;
  var c = s == Qi, h = d == Qi, p = s == d;
  if (p && Ya(e)) {
    if (!Ya(t))
      return !1;
    l = !0, c = !1;
  }
  if (p && !c)
    return i || (i = new Wn()), l || uc(e) ? hg(e, t, n, o, r, i) : Pk(e, t, s, n, o, r, i);
  if (!(n & zk)) {
    var v = c && Pf.call(e, "__wrapped__"), u = h && Pf.call(t, "__wrapped__");
    if (v || u) {
      var g = v ? e.value() : e, m = u ? t.value() : t;
      return i || (i = new Wn()), r(g, m, n, o, i);
    }
  }
  return p ? (i || (i = new Wn()), Ek(e, t, n, o, r, i)) : !1;
}
function vc(e, t, n, o, r) {
  return e === t ? !0 : e == null || t == null || !Fo(e) && !Fo(t) ? e !== e && t !== t : Mk(e, t, n, o, vc, r);
}
var Vk = 1, Ik = 2;
function Ak(e, t, n, o) {
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
      var c = new Wn(), h;
      if (!(h === void 0 ? vc(d, s, Vk | Ik, o, c) : h))
        return !1;
    }
  }
  return !0;
}
function pg(e) {
  return e === e && !wn(e);
}
function Bk(e) {
  for (var t = fc(e), n = t.length; n--; ) {
    var o = t[n], r = e[o];
    t[n] = [o, r, pg(r)];
  }
  return t;
}
function vg(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function Lk(e) {
  var t = Bk(e);
  return t.length == 1 && t[0][2] ? vg(t[0][0], t[0][1]) : function(n) {
    return n === e || Ak(n, e, t);
  };
}
function Nk(e, t) {
  return e != null && t in Object(e);
}
function Dk(e, t, n) {
  t = tg(t, e);
  for (var o = -1, r = t.length, i = !1; ++o < r; ) {
    var l = pl(t[o]);
    if (!(i = e != null && n(e, l)))
      break;
    e = e[l];
  }
  return i || ++o != r ? i : (r = e == null ? 0 : e.length, !!r && dc(r) && lc(l, r) && (bn(e) || Xa(e)));
}
function Hk(e, t) {
  return e != null && Dk(e, t, Nk);
}
var jk = 1, Wk = 2;
function Uk(e, t) {
  return hc(e) && pg(t) ? vg(pl(e), t) : function(n) {
    var o = Fi(n, e);
    return o === void 0 && o === t ? Hk(n, e) : vc(t, o, jk | Wk);
  };
}
function Kk(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function qk(e) {
  return function(t) {
    return ng(t, e);
  };
}
function Gk(e) {
  return hc(e) ? Kk(pl(e)) : qk(e);
}
function Xk(e) {
  return typeof e == "function" ? e : e == null ? ic : typeof e == "object" ? bn(e) ? Uk(e[0], e[1]) : Lk(e) : Gk(e);
}
function Yk(e) {
  return function(t, n, o) {
    for (var r = -1, i = Object(t), l = o(t), a = l.length; a--; ) {
      var s = l[++r];
      if (n(i[s], s, i) === !1)
        break;
    }
    return t;
  };
}
var gg = Yk();
function Zk(e, t) {
  return e && gg(e, t, fc);
}
function Jk(e, t) {
  return function(n, o) {
    if (n == null)
      return n;
    if (!Fr(n))
      return e(n, o);
    for (var r = n.length, i = -1, l = Object(n); ++i < r && o(l[i], i, l) !== !1; )
      ;
    return n;
  };
}
var Qk = Jk(Zk), Zl = function() {
  return Pn.Date.now();
}, eR = "Expected a function", tR = Math.max, nR = Math.min;
function oR(e, t, n) {
  var o, r, i, l, a, s, d = 0, c = !1, h = !1, p = !0;
  if (typeof e != "function")
    throw new TypeError(eR);
  t = af(t) || 0, wn(n) && (c = !!n.leading, h = "maxWait" in n, i = h ? tR(af(n.maxWait) || 0, t) : i, p = "trailing" in n ? !!n.trailing : p);
  function v(C) {
    var w = o, $ = r;
    return o = r = void 0, d = C, l = e.apply($, w), l;
  }
  function u(C) {
    return d = C, a = setTimeout(f, t), c ? v(C) : l;
  }
  function g(C) {
    var w = C - s, $ = C - d, k = t - w;
    return h ? nR(k, i - $) : k;
  }
  function m(C) {
    var w = C - s, $ = C - d;
    return s === void 0 || w >= t || w < 0 || h && $ >= i;
  }
  function f() {
    var C = Zl();
    if (m(C))
      return b(C);
    a = setTimeout(f, g(C));
  }
  function b(C) {
    return a = void 0, p && o ? v(C) : (o = r = void 0, l);
  }
  function x() {
    a !== void 0 && clearTimeout(a), d = 0, o = s = r = a = void 0;
  }
  function y() {
    return a === void 0 ? l : b(Zl());
  }
  function S() {
    var C = Zl(), w = m(C);
    if (o = arguments, r = this, s = C, w) {
      if (a === void 0)
        return u(s);
      if (h)
        return clearTimeout(a), a = setTimeout(f, t), v(s);
    }
    return a === void 0 && (a = setTimeout(f, t)), l;
  }
  return S.cancel = x, S.flush = y, S;
}
function Sd(e, t, n) {
  (n !== void 0 && !Mi(e[t], n) || n === void 0 && !(t in e)) && sc(e, t, n);
}
function rR(e) {
  return Fo(e) && Fr(e);
}
function $d(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function iR(e) {
  return PS(e, Qv(e));
}
function aR(e, t, n, o, r, i, l) {
  var a = $d(e, n), s = $d(t, n), d = l.get(s);
  if (d) {
    Sd(e, n, d);
    return;
  }
  var c = i ? i(a, s, n + "", e, t, l) : void 0, h = c === void 0;
  if (h) {
    var p = bn(s), v = !p && Ya(s), u = !p && !v && uc(s);
    c = s, p || v || u ? bn(a) ? c = a : rR(a) ? c = pS(a) : v ? (h = !1, c = j2(s)) : u ? (h = !1, c = ok(s)) : c = [] : s2(s) || Xa(s) ? (c = a, Xa(a) ? c = iR(a) : (!wn(a) || ac(a)) && (c = rk(s))) : h = !1;
  }
  h && (l.set(s, c), r(c, s, o, i, l), l.delete(s)), Sd(e, n, c);
}
function mg(e, t, n, o, r) {
  e !== t && gg(t, function(i, l) {
    if (r || (r = new Wn()), wn(i))
      aR(e, t, l, n, mg, o, r);
    else {
      var a = o ? o($d(e, l), i, l + "", e, t, r) : void 0;
      a === void 0 && (a = i), Sd(e, l, a);
    }
  }, Qv);
}
function lR(e, t) {
  var n = -1, o = Fr(e) ? Array(e.length) : [];
  return Qk(e, function(r, i, l) {
    o[++n] = t(r, i, l);
  }), o;
}
function sR(e, t) {
  var n = bn(e) ? Kv : lR;
  return n(e, Xk(t));
}
var ea = zS(function(e, t, n) {
  mg(e, t, n);
}), dR = "Expected a function";
function cR(e, t, n) {
  var o = !0, r = !0;
  if (typeof e != "function")
    throw new TypeError(dR);
  return wn(n) && (o = "leading" in n ? !!n.leading : o, r = "trailing" in n ? !!n.trailing : r), oR(e, t, {
    leading: o,
    maxWait: t,
    trailing: r
  });
}
const Tf = window.Vue.computed, uR = window.Vue.inject;
function Er(e) {
  const {
    mergedLocaleRef: t,
    mergedDateLocaleRef: n
  } = uR(lo, null) || {}, o = Tf(() => {
    var i, l;
    return (l = (i = t == null ? void 0 : t.value) === null || i === void 0 ? void 0 : i[e]) !== null && l !== void 0 ? l : Z1[e];
  });
  return {
    dateLocaleRef: Tf(() => {
      var i;
      return (i = n == null ? void 0 : n.value) !== null && i !== void 0 ? i : EC;
    }),
    localeRef: o
  };
}
const Pr = "naive-ui-style", fR = window.Vue.computed, hR = window.Vue.inject, pR = window.Vue.onBeforeMount, vR = window.Vue.watchEffect;
function Lt(e, t, n) {
  if (!t) return;
  const o = Oo(), r = fR(() => {
    const {
      value: a
    } = t;
    if (!a)
      return;
    const s = a[e];
    if (s)
      return s;
  }), i = hR(lo, null), l = () => {
    vR(() => {
      const {
        value: a
      } = n, s = `${a}${e}Rtl`;
      if (iw(s, o)) return;
      const {
        value: d
      } = r;
      d && d.style.mount({
        id: s,
        head: !0,
        anchorMetaName: Pr,
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
const nr = {
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
} = nr, bg = D("body", `
 margin: 0;
 font-size: ${gR};
 font-family: ${mR};
 line-height: ${bR};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [D("input", `
 font-family: inherit;
 font-size: inherit;
 `)]), wR = window.Vue.inject, yR = window.Vue.onBeforeMount;
function or(e, t, n) {
  if (!t)
    return;
  const o = Oo(), r = wR(lo, null), i = () => {
    const l = n.value;
    t.mount({
      id: l === void 0 ? e : l + e,
      head: !0,
      anchorMetaName: Pr,
      props: {
        bPrefix: l ? `.${l}-` : void 0
      },
      ssr: o,
      parent: r == null ? void 0 : r.styleMountTarget
    }), r != null && r.preflightStyleDisabled || bg.mount({
      id: "n-global",
      head: !0,
      anchorMetaName: Pr,
      ssr: o,
      parent: r == null ? void 0 : r.styleMountTarget
    });
  };
  o ? i() : yR(i);
}
const xR = window.Vue.computed, CR = window.Vue.inject, SR = window.Vue.onBeforeMount;
function Pe(e, t, n, o, r, i) {
  const l = Oo(), a = CR(lo, null);
  if (n) {
    const d = () => {
      const c = i == null ? void 0 : i.value;
      n.mount({
        id: c === void 0 ? t : c + t,
        head: !0,
        props: {
          bPrefix: c ? `.${c}-` : void 0
        },
        anchorMetaName: Pr,
        ssr: l,
        parent: a == null ? void 0 : a.styleMountTarget
      }), a != null && a.preflightStyleDisabled || bg.mount({
        id: "n-global",
        head: !0,
        anchorMetaName: Pr,
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
      themeOverrides: v = {},
      builtinThemeOverrides: u = {}
    } = r, {
      common: g,
      peers: m
    } = v, {
      common: f = void 0,
      [e]: {
        common: b = void 0,
        self: x = void 0,
        peers: y = {}
      } = {}
    } = (a == null ? void 0 : a.mergedThemeRef.value) || {}, {
      common: S = void 0,
      [e]: C = {}
    } = (a == null ? void 0 : a.mergedThemeOverridesRef.value) || {}, {
      common: w,
      peers: $ = {}
    } = C, k = ea({}, c || b || f || o.common, S, w, g), O = ea(
      // {}, executed every time, no need for empty obj
      (d = h || x || o.self) === null || d === void 0 ? void 0 : d(k),
      u,
      C,
      v
    );
    return {
      common: k,
      self: O,
      peers: ea({}, o.peers, y, p),
      peerOverrides: ea({}, u.peers, $, m)
    };
  });
}
Pe.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object
};
const $R = T("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [D("svg", `
 height: 1em;
 width: 1em;
 `)]), kR = window.Vue.defineComponent, RR = window.Vue.h, PR = window.Vue.toRef, Ct = kR({
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
    or("-base-icon", $R, PR(e, "clsPrefix"));
  },
  render() {
    return RR("i", {
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
}), TR = window.Vue.defineComponent, _R = window.Vue.h, FR = window.Vue.Transition, zr = TR({
  name: "BaseIconSwitchTransition",
  setup(e, {
    slots: t
  }) {
    const n = zi();
    return () => _R(FR, {
      name: "icon-switch-transition",
      appear: n.value
    }, t);
  }
}), ER = window.Vue.defineComponent, _f = window.Vue.h, wg = ER({
  name: "Add",
  render() {
    return _f("svg", {
      width: "512",
      height: "512",
      viewBox: "0 0 512 512",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, _f("path", {
      d: "M256 112V400M400 256H112",
      stroke: "currentColor",
      "stroke-width": "32",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }));
  }
}), zR = window.Vue.defineComponent, ta = window.Vue.h, OR = zR({
  name: "ArrowDown",
  render() {
    return ta("svg", {
      viewBox: "0 0 28 28",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, ta("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, ta("g", {
      "fill-rule": "nonzero"
    }, ta("path", {
      d: "M23.7916,15.2664 C24.0788,14.9679 24.0696,14.4931 23.7711,14.206 C23.4726,13.9188 22.9978,13.928 22.7106,14.2265 L14.7511,22.5007 L14.7511,3.74792 C14.7511,3.33371 14.4153,2.99792 14.0011,2.99792 C13.5869,2.99792 13.2511,3.33371 13.2511,3.74793 L13.2511,22.4998 L5.29259,14.2265 C5.00543,13.928 4.53064,13.9188 4.23213,14.206 C3.93361,14.4931 3.9244,14.9679 4.21157,15.2664 L13.2809,24.6944 C13.6743,25.1034 14.3289,25.1034 14.7223,24.6944 L23.7916,15.2664 Z"
    }))));
  }
}), Ff = window.Vue.defineComponent, MR = window.Vue.h, VR = window.Vue.inject;
function Or(e, t) {
  const n = Ff({
    render() {
      return t();
    }
  });
  return Ff({
    name: V2(e),
    setup() {
      var o;
      const r = (o = VR(lo, null)) === null || o === void 0 ? void 0 : o.mergedIconsRef;
      return () => {
        var i;
        const l = (i = r == null ? void 0 : r.value) === null || i === void 0 ? void 0 : i[e];
        return l ? l() : MR(n, null);
      };
    }
  });
}
const IR = window.Vue.defineComponent, Ef = window.Vue.h, zf = IR({
  name: "Backward",
  render() {
    return Ef("svg", {
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, Ef("path", {
      d: "M12.2674 15.793C11.9675 16.0787 11.4927 16.0672 11.2071 15.7673L6.20572 10.5168C5.9298 10.2271 5.9298 9.7719 6.20572 9.48223L11.2071 4.23177C11.4927 3.93184 11.9675 3.92031 12.2674 4.206C12.5673 4.49169 12.5789 4.96642 12.2932 5.26634L7.78458 9.99952L12.2932 14.7327C12.5789 15.0326 12.5673 15.5074 12.2674 15.793Z",
      fill: "currentColor"
    }));
  }
}), AR = window.Vue.defineComponent, Jl = window.Vue.h, BR = AR({
  name: "Checkmark",
  render() {
    return Jl("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 16 16"
    }, Jl("g", {
      fill: "none"
    }, Jl("path", {
      d: "M14.046 3.486a.75.75 0 0 1-.032 1.06l-7.93 7.474a.85.85 0 0 1-1.188-.022l-2.68-2.72a.75.75 0 1 1 1.068-1.053l2.234 2.267l7.468-7.038a.75.75 0 0 1 1.06.032z",
      fill: "currentColor"
    })));
  }
}), LR = window.Vue.defineComponent, Of = window.Vue.h, yg = LR({
  name: "ChevronDown",
  render() {
    return Of("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, Of("path", {
      d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z",
      fill: "currentColor"
    }));
  }
}), NR = window.Vue.defineComponent, Mf = window.Vue.h, xg = NR({
  name: "ChevronRight",
  render() {
    return Mf("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, Mf("path", {
      d: "M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z",
      fill: "currentColor"
    }));
  }
}), na = window.Vue.h, DR = Or("clear", () => na("svg", {
  viewBox: "0 0 16 16",
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
  d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z"
}))))), oa = window.Vue.h, HR = Or("close", () => oa("svg", {
  viewBox: "0 0 12 12",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": !0
}, oa("g", {
  stroke: "none",
  "stroke-width": "1",
  fill: "none",
  "fill-rule": "evenodd"
}, oa("g", {
  fill: "currentColor",
  "fill-rule": "nonzero"
}, oa("path", {
  d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
}))))), jR = window.Vue.defineComponent, Ql = window.Vue.h, WR = jR({
  name: "Empty",
  render() {
    return Ql("svg", {
      viewBox: "0 0 28 28",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, Ql("path", {
      d: "M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z",
      fill: "currentColor"
    }), Ql("path", {
      d: "M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z",
      fill: "currentColor"
    }));
  }
}), ra = window.Vue.h, Cg = Or("error", () => ra("svg", {
  viewBox: "0 0 48 48",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, ra("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, ra("g", {
  "fill-rule": "nonzero"
}, ra("path", {
  d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z"
}))))), UR = window.Vue.defineComponent, es = window.Vue.h, KR = UR({
  name: "Eye",
  render() {
    return es("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, es("path", {
      d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "32"
    }), es("circle", {
      cx: "256",
      cy: "256",
      r: "80",
      fill: "none",
      stroke: "currentColor",
      "stroke-miterlimit": "10",
      "stroke-width": "32"
    }));
  }
}), qR = window.Vue.defineComponent, dr = window.Vue.h, GR = qR({
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
}), XR = window.Vue.defineComponent, ia = window.Vue.h, Vf = XR({
  name: "FastBackward",
  render() {
    return ia("svg", {
      viewBox: "0 0 20 20",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, ia("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, ia("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, ia("path", {
      d: "M8.73171,16.7949 C9.03264,17.0795 9.50733,17.0663 9.79196,16.7654 C10.0766,16.4644 10.0634,15.9897 9.76243,15.7051 L4.52339,10.75 L17.2471,10.75 C17.6613,10.75 17.9971,10.4142 17.9971,10 C17.9971,9.58579 17.6613,9.25 17.2471,9.25 L4.52112,9.25 L9.76243,4.29275 C10.0634,4.00812 10.0766,3.53343 9.79196,3.2325 C9.50733,2.93156 9.03264,2.91834 8.73171,3.20297 L2.31449,9.27241 C2.14819,9.4297 2.04819,9.62981 2.01448,9.8386 C2.00308,9.89058 1.99707,9.94459 1.99707,10 C1.99707,10.0576 2.00356,10.1137 2.01585,10.1675 C2.05084,10.3733 2.15039,10.5702 2.31449,10.7254 L8.73171,16.7949 Z"
    }))));
  }
}), YR = window.Vue.defineComponent, aa = window.Vue.h, If = YR({
  name: "FastForward",
  render() {
    return aa("svg", {
      viewBox: "0 0 20 20",
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
      d: "M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z"
    }))));
  }
}), ZR = window.Vue.defineComponent, la = window.Vue.h, JR = ZR({
  name: "Filter",
  render() {
    return la("svg", {
      viewBox: "0 0 28 28",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, la("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, la("g", {
      "fill-rule": "nonzero"
    }, la("path", {
      d: "M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z"
    }))));
  }
}), QR = window.Vue.defineComponent, Af = window.Vue.h, Bf = QR({
  name: "Forward",
  render() {
    return Af("svg", {
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, Af("path", {
      d: "M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z",
      fill: "currentColor"
    }));
  }
}), sa = window.Vue.h, kd = Or("info", () => sa("svg", {
  viewBox: "0 0 28 28",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, sa("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, sa("g", {
  "fill-rule": "nonzero"
}, sa("path", {
  d: "M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z"
}))))), eP = window.Vue.defineComponent, da = window.Vue.h, Lf = eP({
  name: "More",
  render() {
    return da("svg", {
      viewBox: "0 0 16 16",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, da("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, da("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, da("path", {
      d: "M4,7 C4.55228,7 5,7.44772 5,8 C5,8.55229 4.55228,9 4,9 C3.44772,9 3,8.55229 3,8 C3,7.44772 3.44772,7 4,7 Z M8,7 C8.55229,7 9,7.44772 9,8 C9,8.55229 8.55229,9 8,9 C7.44772,9 7,8.55229 7,8 C7,7.44772 7.44772,7 8,7 Z M12,7 C12.5523,7 13,7.44772 13,8 C13,8.55229 12.5523,9 12,9 C11.4477,9 11,8.55229 11,8 C11,7.44772 11.4477,7 12,7 Z"
    }))));
  }
}), tP = window.Vue.defineComponent, Nf = window.Vue.h, nP = tP({
  name: "Remove",
  render() {
    return Nf("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, Nf("line", {
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
}), ca = window.Vue.h, Sg = Or("success", () => ca("svg", {
  viewBox: "0 0 48 48",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, ca("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, ca("g", {
  "fill-rule": "nonzero"
}, ca("path", {
  d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z"
}))))), ua = window.Vue.h, $g = Or("warning", () => ua("svg", {
  viewBox: "0 0 24 24",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, ua("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, ua("g", {
  "fill-rule": "nonzero"
}, ua("path", {
  d: "M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z"
}))))), {
  cubicBezierEaseInOut: oP
} = nr;
function gn({
  originalTransform: e = "",
  left: t = 0,
  top: n = 0,
  transition: o = `all .3s ${oP} !important`
} = {}) {
  return [D("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
    transform: `${e} scale(0.75)`,
    left: t,
    top: n,
    opacity: 0
  }), D("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
    transform: `scale(1) ${e}`,
    left: t,
    top: n,
    opacity: 1
  }), D("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
    transformOrigin: "center",
    position: "absolute",
    left: t,
    top: n,
    transition: o
  })];
}
const rP = T("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [D(">", [A("clear", `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `, [D("&:hover", `
 color: var(--n-clear-color-hover)!important;
 `), D("&:active", `
 color: var(--n-clear-color-pressed)!important;
 `)]), A("placeholder", `
 display: flex;
 `), A("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [gn({
  originalTransform: "translateX(-50%) translateY(-50%)",
  left: "50%",
  top: "50%"
})])])]), iP = window.Vue.defineComponent, cr = window.Vue.h, aP = window.Vue.toRef, Rd = iP({
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
    return or("-base-clear", rP, aP(e, "clsPrefix")), {
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
    }, cr(zr, null, {
      default: () => {
        var t, n;
        return this.show ? cr("div", {
          key: "dismiss",
          class: `${e}-base-clear__clear`,
          onClick: this.onClear,
          onMousedown: this.handleMouseDown,
          "data-clear": !0
        }, dn(this.$slots.icon, () => [cr(Ct, {
          clsPrefix: e
        }, {
          default: () => cr(DR, null)
        })])) : cr("div", {
          key: "icon",
          class: `${e}-base-clear__placeholder`
        }, (n = (t = this.$slots).placeholder) === null || n === void 0 ? void 0 : n.call(t));
      }
    }));
  }
}), lP = T("base-close", `
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
`, [B("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `), D("&::before", `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `), rt("disabled", [D("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), D("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), D("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), D("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), D("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), B("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), B("round", [D("&::before", `
 border-radius: 50%;
 `)])]), sP = window.Vue.defineComponent, ts = window.Vue.h, dP = window.Vue.toRef, vl = sP({
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
    return or("-base-close", lP, dP(e, "clsPrefix")), () => {
      const {
        clsPrefix: t,
        disabled: n,
        absolute: o,
        round: r,
        isButtonTag: i
      } = e;
      return ts(i ? "button" : "div", {
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
      }, ts(Ct, {
        clsPrefix: t
      }, {
        default: () => ts(HR, null)
      }));
    };
  }
}), cP = window.Vue.defineComponent, uP = window.Vue.h, fP = window.Vue.Transition, hP = window.Vue.TransitionGroup, pP = cP({
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
      } = e, h = a ? hP : fP, p = {
        name: s ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
        appear: d,
        onEnter: i,
        onAfterEnter: l,
        onBeforeLeave: n,
        onLeave: o,
        onAfterLeave: r
      };
      return a || (p.mode = c), uP(h, p, t);
    };
  }
}), vP = window.Vue.defineComponent, gP = window.Vue.h, mP = vP({
  props: {
    onFocus: Function,
    onBlur: Function
  },
  setup(e) {
    return () => gP("div", {
      style: "width: 0; height: 0",
      tabindex: 0,
      onFocus: e.onFocus,
      onBlur: e.onBlur
    });
  }
}), bP = D([D("@keyframes rotator", `
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`), T("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [A("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [gn()]), A("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [gn({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})]), A("container", `
 animation: rotator 3s linear infinite both;
 `, [A("icon", `
 height: 1em;
 width: 1em;
 `)])])]), wP = window.Vue.defineComponent, yn = window.Vue.h, yP = window.Vue.toRef, ns = "1.6s", xP = {
  strokeWidth: {
    type: Number,
    default: 28
  },
  stroke: {
    type: String,
    default: void 0
  }
}, Mr = wP({
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
  }, xP),
  setup(e) {
    or("-base-loading", bP, yP(e, "clsPrefix"));
  },
  render() {
    const {
      clsPrefix: e,
      radius: t,
      strokeWidth: n,
      stroke: o,
      scale: r
    } = this, i = t / r;
    return yn("div", {
      class: `${e}-base-loading`,
      role: "img",
      "aria-label": "loading"
    }, yn(zr, null, {
      default: () => this.show ? yn("div", {
        key: "icon",
        class: `${e}-base-loading__transition-wrapper`
      }, yn("div", {
        class: `${e}-base-loading__container`
      }, yn("svg", {
        class: `${e}-base-loading__icon`,
        viewBox: `0 0 ${2 * i} ${2 * i}`,
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          color: o
        }
      }, yn("g", null, yn("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        values: `0 ${i} ${i};270 ${i} ${i}`,
        begin: "0s",
        dur: ns,
        fill: "freeze",
        repeatCount: "indefinite"
      }), yn("circle", {
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
      }, yn("animateTransform", {
        attributeName: "transform",
        type: "rotate",
        values: `0 ${i} ${i};135 ${i} ${i};450 ${i} ${i}`,
        begin: "0s",
        dur: ns,
        fill: "freeze",
        repeatCount: "indefinite"
      }), yn("animate", {
        attributeName: "stroke-dashoffset",
        values: `${5.67 * t};${1.42 * t};${5.67 * t}`,
        begin: "0s",
        dur: ns,
        fill: "freeze",
        repeatCount: "indefinite"
      })))))) : yn("div", {
        key: "placeholder",
        class: `${e}-base-loading__placeholder`
      }, this.$slots)
    }));
  }
}), {
  cubicBezierEaseInOut: Df
} = nr;
function kg({
  name: e = "fade-in",
  enterDuration: t = "0.2s",
  leaveDuration: n = "0.2s",
  enterCubicBezier: o = Df,
  leaveCubicBezier: r = Df
} = {}) {
  return [D(`&.${e}-transition-enter-active`, {
    transition: `all ${t} ${o}!important`
  }), D(`&.${e}-transition-leave-active`, {
    transition: `all ${n} ${r}!important`
  }), D(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
    opacity: 0
  }), D(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`, {
    opacity: 1
  })];
}
const Ee = {
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
}, CP = Ro(Ee.neutralBase), Rg = Ro(Ee.neutralInvertBase), SP = `rgba(${Rg.slice(0, 3).join(", ")}, `;
function Hf(e) {
  return `${SP + String(e)})`;
}
function Ht(e) {
  const t = Array.from(Rg);
  return t[3] = Number(e), Je(CP, t);
}
const ut = Object.assign(Object.assign({
  name: "common"
}, nr), {
  baseColor: Ee.neutralBase,
  // primary color
  primaryColor: Ee.primaryDefault,
  primaryColorHover: Ee.primaryHover,
  primaryColorPressed: Ee.primaryActive,
  primaryColorSuppl: Ee.primarySuppl,
  // info color
  infoColor: Ee.infoDefault,
  infoColorHover: Ee.infoHover,
  infoColorPressed: Ee.infoActive,
  infoColorSuppl: Ee.infoSuppl,
  // success color
  successColor: Ee.successDefault,
  successColorHover: Ee.successHover,
  successColorPressed: Ee.successActive,
  successColorSuppl: Ee.successSuppl,
  // warning color
  warningColor: Ee.warningDefault,
  warningColorHover: Ee.warningHover,
  warningColorPressed: Ee.warningActive,
  warningColorSuppl: Ee.warningSuppl,
  // error color
  errorColor: Ee.errorDefault,
  errorColorHover: Ee.errorHover,
  errorColorPressed: Ee.errorActive,
  errorColorSuppl: Ee.errorSuppl,
  // text color
  textColorBase: Ee.neutralTextBase,
  textColor1: "rgb(31, 34, 37)",
  textColor2: "rgb(51, 54, 57)",
  textColor3: "rgb(118, 124, 130)",
  // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
  // textColor5: neutral(base.alpha5),
  textColorDisabled: Ht(Ee.alpha4),
  placeholderColor: Ht(Ee.alpha4),
  placeholderColorDisabled: Ht(Ee.alpha5),
  iconColor: Ht(Ee.alpha4),
  iconColorHover: ji(Ht(Ee.alpha4), {
    lightness: 0.75
  }),
  iconColorPressed: ji(Ht(Ee.alpha4), {
    lightness: 0.9
  }),
  iconColorDisabled: Ht(Ee.alpha5),
  opacity1: Ee.alpha1,
  opacity2: Ee.alpha2,
  opacity3: Ee.alpha3,
  opacity4: Ee.alpha4,
  opacity5: Ee.alpha5,
  dividerColor: "rgb(239, 239, 245)",
  borderColor: "rgb(224, 224, 230)",
  // close
  closeIconColor: Ht(Number(Ee.alphaClose)),
  closeIconColorHover: Ht(Number(Ee.alphaClose)),
  closeIconColorPressed: Ht(Number(Ee.alphaClose)),
  closeColorHover: "rgba(0, 0, 0, .09)",
  closeColorPressed: "rgba(0, 0, 0, .13)",
  // clear
  clearColor: Ht(Ee.alpha4),
  clearColorHover: ji(Ht(Ee.alpha4), {
    lightness: 0.75
  }),
  clearColorPressed: ji(Ht(Ee.alpha4), {
    lightness: 0.9
  }),
  scrollbarColor: Hf(Ee.alphaScrollbar),
  scrollbarColorHover: Hf(Ee.alphaScrollbarHover),
  scrollbarWidth: "5px",
  scrollbarHeight: "5px",
  scrollbarBorderRadius: "5px",
  progressRailColor: Ht(Ee.alphaProgressRail),
  railColor: "rgb(219, 219, 223)",
  popoverColor: Ee.neutralPopover,
  tableColor: Ee.neutralCard,
  cardColor: Ee.neutralCard,
  modalColor: Ee.neutralModal,
  bodyColor: Ee.neutralBody,
  tagColor: "#eee",
  avatarColor: Ht(Ee.alphaAvatar),
  invertedColor: "rgb(0, 20, 40)",
  inputColor: Ht(Ee.alphaInput),
  codeColor: "rgb(244, 244, 248)",
  tabColor: "rgb(247, 247, 250)",
  actionColor: "rgb(250, 250, 252)",
  tableHeaderColor: "rgb(250, 250, 252)",
  hoverColor: "rgb(243, 243, 245)",
  // use color with alpha since it can be nested with header filter & sorter effect
  tableColorHover: "rgba(0, 0, 100, 0.03)",
  tableColorStriped: "rgba(0, 0, 100, 0.02)",
  pressedColor: "rgb(237, 237, 239)",
  opacityDisabled: Ee.alphaDisabled,
  inputColorDisabled: "rgb(250, 250, 252)",
  // secondary button color
  // can also be used in tertiary button & quaternary button
  buttonColor2: "rgba(46, 51, 56, .05)",
  buttonColor2Hover: "rgba(46, 51, 56, .09)",
  buttonColor2Pressed: "rgba(46, 51, 56, .13)",
  boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
  boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
  boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
}), $P = {
  railInsetHorizontalBottom: "auto 2px 4px 2px",
  railInsetHorizontalTop: "4px 2px auto 2px",
  railInsetVerticalRight: "2px 4px 2px auto",
  railInsetVerticalLeft: "2px auto 2px 4px",
  railColor: "transparent"
};
function kP(e) {
  const {
    scrollbarColor: t,
    scrollbarColorHover: n,
    scrollbarHeight: o,
    scrollbarWidth: r,
    scrollbarBorderRadius: i
  } = e;
  return Object.assign(Object.assign({}, $P), {
    height: o,
    width: r,
    borderRadius: i,
    color: t,
    colorHover: n
  });
}
const Vr = {
  name: "Scrollbar",
  common: ut,
  self: kP
}, RP = T("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [D(">", [T("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `, [D("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), D(">", [
  // We can't set overflow hidden since it affects positioning.
  T("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)
])])]), D(">, +", [T("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `, [B("horizontal", `
 height: var(--n-scrollbar-height);
 `, [D(">", [A("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), B("horizontal--top", `
 top: var(--n-scrollbar-rail-top-horizontal-top); 
 right: var(--n-scrollbar-rail-right-horizontal-top); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-top); 
 left: var(--n-scrollbar-rail-left-horizontal-top); 
 `), B("horizontal--bottom", `
 top: var(--n-scrollbar-rail-top-horizontal-bottom); 
 right: var(--n-scrollbar-rail-right-horizontal-bottom); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-bottom); 
 left: var(--n-scrollbar-rail-left-horizontal-bottom); 
 `), B("vertical", `
 width: var(--n-scrollbar-width);
 `, [D(">", [A("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), B("vertical--left", `
 top: var(--n-scrollbar-rail-top-vertical-left); 
 right: var(--n-scrollbar-rail-right-vertical-left); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-left); 
 left: var(--n-scrollbar-rail-left-vertical-left); 
 `), B("vertical--right", `
 top: var(--n-scrollbar-rail-top-vertical-right); 
 right: var(--n-scrollbar-rail-right-vertical-right); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-right); 
 left: var(--n-scrollbar-rail-left-vertical-right); 
 `), B("disabled", [D(">", [A("scrollbar", "pointer-events: none;")])]), D(">", [A("scrollbar", `
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [kg(), D("&:hover", "background-color: var(--n-scrollbar-color-hover);")])])])])]), Kt = window.Vue.computed, PP = window.Vue.defineComponent, TP = window.Vue.Fragment, cn = window.Vue.h, _P = window.Vue.mergeProps, FP = window.Vue.onBeforeUnmount, EP = window.Vue.onMounted, qt = window.Vue.ref, jf = window.Vue.Transition, zP = window.Vue.watchEffect, OP = Object.assign(Object.assign({}, Pe.props), {
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
}), Ir = PP({
  name: "Scrollbar",
  props: OP,
  inheritAttrs: !1,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n,
      mergedRtlRef: o
    } = He(e), r = Lt("Scrollbar", o, t), i = qt(null), l = qt(null), a = qt(null), s = qt(null), d = qt(null), c = qt(null), h = qt(null), p = qt(null), v = qt(null), u = qt(null), g = qt(null), m = qt(0), f = qt(0), b = qt(!1), x = qt(!1);
    let y = !1, S = !1, C, w, $ = 0, k = 0, O = 0, G = 0;
    const _ = ty(), V = Pe("Scrollbar", "-scrollbar", RP, Vr, e, t), I = Kt(() => {
      const {
        value: F
      } = p, {
        value: q
      } = c, {
        value: ae
      } = u;
      return F === null || q === null || ae === null ? 0 : Math.min(F, ae * F / q + kt(V.value.self.width) * 1.5);
    }), M = Kt(() => `${I.value}px`), X = Kt(() => {
      const {
        value: F
      } = v, {
        value: q
      } = h, {
        value: ae
      } = g;
      return F === null || q === null || ae === null ? 0 : ae * F / q + kt(V.value.self.height) * 1.5;
    }), H = Kt(() => `${X.value}px`), Q = Kt(() => {
      const {
        value: F
      } = p, {
        value: q
      } = m, {
        value: ae
      } = c, {
        value: ge
      } = u;
      if (F === null || ae === null || ge === null)
        return 0;
      {
        const be = ae - F;
        return be ? q / be * (ge - I.value) : 0;
      }
    }), oe = Kt(() => `${Q.value}px`), te = Kt(() => {
      const {
        value: F
      } = v, {
        value: q
      } = f, {
        value: ae
      } = h, {
        value: ge
      } = g;
      if (F === null || ae === null || ge === null)
        return 0;
      {
        const be = ae - F;
        return be ? q / be * (ge - X.value) : 0;
      }
    }), Y = Kt(() => `${te.value}px`), L = Kt(() => {
      const {
        value: F
      } = p, {
        value: q
      } = c;
      return F !== null && q !== null && q > F;
    }), Z = Kt(() => {
      const {
        value: F
      } = v, {
        value: q
      } = h;
      return F !== null && q !== null && q > F;
    }), ee = Kt(() => {
      const {
        trigger: F
      } = e;
      return F === "none" || b.value;
    }), ue = Kt(() => {
      const {
        trigger: F
      } = e;
      return F === "none" || x.value;
    }), fe = Kt(() => {
      const {
        container: F
      } = e;
      return F ? F() : l.value;
    }), ve = Kt(() => {
      const {
        content: F
      } = e;
      return F ? F() : a.value;
    }), xe = (F, q) => {
      if (!e.scrollable) return;
      if (typeof F == "number") {
        ie(F, q ?? 0, 0, !1, "auto");
        return;
      }
      const {
        left: ae,
        top: ge,
        index: be,
        elSize: Ce,
        position: Se,
        behavior: Te,
        el: Be,
        debounce: it = !0
      } = F;
      (ae !== void 0 || ge !== void 0) && ie(ae ?? 0, ge ?? 0, 0, !1, Te), Be !== void 0 ? ie(0, Be.offsetTop, Be.offsetHeight, it, Te) : be !== void 0 && Ce !== void 0 ? ie(0, be * Ce, Ce, it, Te) : Se === "bottom" ? ie(0, Number.MAX_SAFE_INTEGER, 0, !1, Te) : Se === "top" && ie(0, 0, 0, !1, Te);
    }, J = Iy(() => {
      e.container || xe({
        top: m.value,
        left: f.value
      });
    }), pe = () => {
      J.isDeactivated || K();
    }, j = (F) => {
      if (J.isDeactivated) return;
      const {
        onResize: q
      } = e;
      q && q(F), K();
    }, W = (F, q) => {
      if (!e.scrollable) return;
      const {
        value: ae
      } = fe;
      ae && (typeof F == "object" ? ae.scrollBy(F) : ae.scrollBy(F, q || 0));
    };
    function ie(F, q, ae, ge, be) {
      const {
        value: Ce
      } = fe;
      if (Ce) {
        if (ge) {
          const {
            scrollTop: Se,
            offsetHeight: Te
          } = Ce;
          if (q > Se) {
            q + ae <= Se + Te || Ce.scrollTo({
              left: F,
              top: q + ae - Te,
              behavior: be
            });
            return;
          }
        }
        Ce.scrollTo({
          left: F,
          top: q,
          behavior: be
        });
      }
    }
    function ye() {
      R(), E(), K();
    }
    function Me() {
      ze();
    }
    function ze() {
      se(), P();
    }
    function se() {
      w !== void 0 && window.clearTimeout(w), w = window.setTimeout(() => {
        x.value = !1;
      }, e.duration);
    }
    function P() {
      C !== void 0 && window.clearTimeout(C), C = window.setTimeout(() => {
        b.value = !1;
      }, e.duration);
    }
    function R() {
      C !== void 0 && window.clearTimeout(C), b.value = !0;
    }
    function E() {
      w !== void 0 && window.clearTimeout(w), x.value = !0;
    }
    function N(F) {
      const {
        onScroll: q
      } = e;
      q && q(F), re();
    }
    function re() {
      const {
        value: F
      } = fe;
      F && (m.value = F.scrollTop, f.value = F.scrollLeft * (r != null && r.value ? -1 : 1));
    }
    function de() {
      const {
        value: F
      } = ve;
      F && (c.value = F.offsetHeight, h.value = F.offsetWidth);
      const {
        value: q
      } = fe;
      q && (p.value = q.offsetHeight, v.value = q.offsetWidth);
      const {
        value: ae
      } = d, {
        value: ge
      } = s;
      ae && (g.value = ae.offsetWidth), ge && (u.value = ge.offsetHeight);
    }
    function z() {
      const {
        value: F
      } = fe;
      F && (m.value = F.scrollTop, f.value = F.scrollLeft * (r != null && r.value ? -1 : 1), p.value = F.offsetHeight, v.value = F.offsetWidth, c.value = F.scrollHeight, h.value = F.scrollWidth);
      const {
        value: q
      } = d, {
        value: ae
      } = s;
      q && (g.value = q.offsetWidth), ae && (u.value = ae.offsetHeight);
    }
    function K() {
      e.scrollable && (e.useUnifiedContainer ? z() : (de(), re()));
    }
    function me(F) {
      var q;
      return !(!((q = i.value) === null || q === void 0) && q.contains(Rr(F)));
    }
    function _e(F) {
      F.preventDefault(), F.stopPropagation(), S = !0, Ke("mousemove", window, Ge, !0), Ke("mouseup", window, vt, !0), k = f.value, O = r != null && r.value ? window.innerWidth - F.clientX : F.clientX;
    }
    function Ge(F) {
      if (!S) return;
      C !== void 0 && window.clearTimeout(C), w !== void 0 && window.clearTimeout(w);
      const {
        value: q
      } = v, {
        value: ae
      } = h, {
        value: ge
      } = X;
      if (q === null || ae === null) return;
      const Ce = (r != null && r.value ? window.innerWidth - F.clientX - O : F.clientX - O) * (ae - q) / (q - ge), Se = ae - q;
      let Te = k + Ce;
      Te = Math.min(Se, Te), Te = Math.max(Te, 0);
      const {
        value: Be
      } = fe;
      if (Be) {
        Be.scrollLeft = Te * (r != null && r.value ? -1 : 1);
        const {
          internalOnUpdateScrollLeft: it
        } = e;
        it && it(Te);
      }
    }
    function vt(F) {
      F.preventDefault(), F.stopPropagation(), qe("mousemove", window, Ge, !0), qe("mouseup", window, vt, !0), S = !1, K(), me(F) && ze();
    }
    function Xe(F) {
      F.preventDefault(), F.stopPropagation(), y = !0, Ke("mousemove", window, Ye, !0), Ke("mouseup", window, bt, !0), $ = m.value, G = F.clientY;
    }
    function Ye(F) {
      if (!y) return;
      C !== void 0 && window.clearTimeout(C), w !== void 0 && window.clearTimeout(w);
      const {
        value: q
      } = p, {
        value: ae
      } = c, {
        value: ge
      } = I;
      if (q === null || ae === null) return;
      const Ce = (F.clientY - G) * (ae - q) / (q - ge), Se = ae - q;
      let Te = $ + Ce;
      Te = Math.min(Se, Te), Te = Math.max(Te, 0);
      const {
        value: Be
      } = fe;
      Be && (Be.scrollTop = Te);
    }
    function bt(F) {
      F.preventDefault(), F.stopPropagation(), qe("mousemove", window, Ye, !0), qe("mouseup", window, bt, !0), y = !1, K(), me(F) && ze();
    }
    zP(() => {
      const {
        value: F
      } = Z, {
        value: q
      } = L, {
        value: ae
      } = t, {
        value: ge
      } = d, {
        value: be
      } = s;
      ge && (F ? ge.classList.remove(`${ae}-scrollbar-rail--disabled`) : ge.classList.add(`${ae}-scrollbar-rail--disabled`)), be && (q ? be.classList.remove(`${ae}-scrollbar-rail--disabled`) : be.classList.add(`${ae}-scrollbar-rail--disabled`));
    }), EP(() => {
      e.container || K();
    }), FP(() => {
      C !== void 0 && window.clearTimeout(C), w !== void 0 && window.clearTimeout(w), qe("mousemove", window, Ye, !0), qe("mouseup", window, bt, !0);
    });
    const tt = Kt(() => {
      const {
        common: {
          cubicBezierEaseInOut: F
        },
        self: {
          color: q,
          colorHover: ae,
          height: ge,
          width: be,
          borderRadius: Ce,
          railInsetHorizontalTop: Se,
          railInsetHorizontalBottom: Te,
          railInsetVerticalRight: Be,
          railInsetVerticalLeft: it,
          railColor: je
        }
      } = V.value, {
        top: _t,
        right: Mt,
        bottom: Vt,
        left: Nt
      } = zt(Se), {
        top: Dt,
        right: Zt,
        bottom: Jt,
        left: U
      } = zt(Te), {
        top: le,
        right: Re,
        bottom: Ie,
        left: Ze
      } = zt(r != null && r.value ? Yu(Be) : Be), {
        top: De,
        right: dt,
        bottom: gt,
        left: rn
      } = zt(r != null && r.value ? Yu(it) : it);
      return {
        "--n-scrollbar-bezier": F,
        "--n-scrollbar-color": q,
        "--n-scrollbar-color-hover": ae,
        "--n-scrollbar-border-radius": Ce,
        "--n-scrollbar-width": be,
        "--n-scrollbar-height": ge,
        "--n-scrollbar-rail-top-horizontal-top": _t,
        "--n-scrollbar-rail-right-horizontal-top": Mt,
        "--n-scrollbar-rail-bottom-horizontal-top": Vt,
        "--n-scrollbar-rail-left-horizontal-top": Nt,
        "--n-scrollbar-rail-top-horizontal-bottom": Dt,
        "--n-scrollbar-rail-right-horizontal-bottom": Zt,
        "--n-scrollbar-rail-bottom-horizontal-bottom": Jt,
        "--n-scrollbar-rail-left-horizontal-bottom": U,
        "--n-scrollbar-rail-top-vertical-right": le,
        "--n-scrollbar-rail-right-vertical-right": Re,
        "--n-scrollbar-rail-bottom-vertical-right": Ie,
        "--n-scrollbar-rail-left-vertical-right": Ze,
        "--n-scrollbar-rail-top-vertical-left": De,
        "--n-scrollbar-rail-right-vertical-left": dt,
        "--n-scrollbar-rail-bottom-vertical-left": gt,
        "--n-scrollbar-rail-left-vertical-left": rn,
        "--n-scrollbar-rail-color": je
      };
    }), we = n ? mt("scrollbar", void 0, tt, e) : void 0;
    return Object.assign(Object.assign({}, {
      scrollTo: xe,
      scrollBy: W,
      sync: K,
      syncUnifiedContainer: z,
      handleMouseEnterWrapper: ye,
      handleMouseLeaveWrapper: Me
    }), {
      mergedClsPrefix: t,
      rtlEnabled: r,
      containerScrollTop: m,
      wrapperRef: i,
      containerRef: l,
      contentRef: a,
      yRailRef: s,
      xRailRef: d,
      needYBar: L,
      needXBar: Z,
      yBarSizePx: M,
      xBarSizePx: H,
      yBarTopPx: oe,
      xBarLeftPx: Y,
      isShowXBar: ee,
      isShowYBar: ue,
      isIos: _,
      handleScroll: N,
      handleContentResize: pe,
      handleContainerResize: j,
      handleYScrollMouseDown: Xe,
      handleXScrollMouseDown: _e,
      cssVars: n ? void 0 : tt,
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
    const d = this.trigger === "none", c = (v, u) => cn("div", {
      ref: "yRailRef",
      class: [`${n}-scrollbar-rail`, `${n}-scrollbar-rail--vertical`, `${n}-scrollbar-rail--vertical--${l}`, v],
      "data-scrollbar-rail": !0,
      style: [u || "", this.verticalRailStyle],
      "aria-hidden": !0
    }, cn(d ? vd : jf, d ? null : {
      name: "fade-in-transition"
    }, {
      default: () => this.needYBar && this.isShowYBar && !this.isIos ? cn("div", {
        class: `${n}-scrollbar-rail__scrollbar`,
        style: {
          height: this.yBarSizePx,
          top: this.yBarTopPx
        },
        onMousedown: this.handleYScrollMouseDown
      }) : null
    })), h = () => {
      var v, u;
      return (v = this.onRender) === null || v === void 0 || v.call(this), cn("div", _P(this.$attrs, {
        role: "none",
        ref: "wrapperRef",
        class: [`${n}-scrollbar`, this.themeClass, r && `${n}-scrollbar--rtl`],
        style: this.cssVars,
        onMouseenter: o ? void 0 : this.handleMouseEnterWrapper,
        onMouseleave: o ? void 0 : this.handleMouseLeaveWrapper
      }), [this.container ? (u = t.default) === null || u === void 0 ? void 0 : u.call(t) : cn("div", {
        role: "none",
        ref: "containerRef",
        class: [`${n}-scrollbar-container`, this.containerClass],
        style: this.containerStyle,
        onScroll: this.handleScroll,
        onWheel: this.onWheel
      }, cn(Hn, {
        onResize: this.handleContentResize
      }, {
        default: () => cn("div", {
          ref: "contentRef",
          role: "none",
          style: [{
            width: this.xScrollable ? "fit-content" : null
          }, this.contentStyle],
          class: [`${n}-scrollbar-content`, this.contentClass]
        }, t)
      })), i ? null : c(void 0, void 0), s && cn("div", {
        ref: "xRailRef",
        class: [`${n}-scrollbar-rail`, `${n}-scrollbar-rail--horizontal`, `${n}-scrollbar-rail--horizontal--${a}`],
        style: this.horizontalRailStyle,
        "data-scrollbar-rail": !0,
        "aria-hidden": !0
      }, cn(d ? vd : jf, d ? null : {
        name: "fade-in-transition"
      }, {
        default: () => this.needXBar && this.isShowXBar && !this.isIos ? cn("div", {
          class: `${n}-scrollbar-rail__scrollbar`,
          style: {
            width: this.xBarSizePx,
            right: r ? this.xBarLeftPx : void 0,
            left: r ? void 0 : this.xBarLeftPx
          },
          onMousedown: this.handleXScrollMouseDown
        }) : null
      }))]);
    }, p = this.container ? h() : cn(Hn, {
      onResize: this.handleContainerResize
    }, {
      default: h
    });
    return i ? cn(TP, null, p, c(this.themeClass, this.cssVars)) : p;
  }
}), Pg = Ir;
function Wf(e) {
  return Array.isArray(e) ? e : [e];
}
const Pd = {
  STOP: "STOP"
};
function Tg(e, t) {
  const n = t(e);
  e.children !== void 0 && n !== Pd.STOP && e.children.forEach((o) => Tg(o, t));
}
function MP(e, t = {}) {
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
function VP(e, t) {
  const { isLeaf: n } = e;
  return n !== void 0 ? n : !t(e);
}
function IP(e) {
  return e.children;
}
function AP(e) {
  return e.key;
}
function BP() {
  return !1;
}
function LP(e, t) {
  const { isLeaf: n } = e;
  return !(n === !1 && !Array.isArray(t(e)));
}
function NP(e) {
  return e.disabled === !0;
}
function DP(e, t) {
  return e.isLeaf === !1 && !Array.isArray(t(e));
}
function os(e) {
  var t;
  return e == null ? [] : Array.isArray(e) ? e : (t = e.checkedKeys) !== null && t !== void 0 ? t : [];
}
function rs(e) {
  var t;
  return e == null || Array.isArray(e) ? [] : (t = e.indeterminateKeys) !== null && t !== void 0 ? t : [];
}
function HP(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) || n.add(o);
  }), Array.from(n);
}
function jP(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) && n.delete(o);
  }), Array.from(n);
}
function WP(e) {
  return (e == null ? void 0 : e.type) === "group";
}
function UP(e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((n, o) => {
    t.set(n.key, o);
  }), (n) => {
    var o;
    return (o = t.get(n)) !== null && o !== void 0 ? o : null;
  };
}
class KP extends Error {
  constructor() {
    super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
  }
}
function qP(e, t, n, o) {
  return Qa(t.concat(e), n, o, !1);
}
function GP(e, t) {
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
function XP(e, t, n, o) {
  const r = Qa(t, n, o, !1), i = Qa(e, n, o, !0), l = GP(e, n), a = [];
  return r.forEach((s) => {
    (i.has(s) || l.has(s)) && a.push(s);
  }), a.forEach((s) => r.delete(s)), r;
}
function is(e, t) {
  const { checkedKeys: n, keysToCheck: o, keysToUncheck: r, indeterminateKeys: i, cascade: l, leafOnly: a, checkStrategy: s, allowNotLoaded: d } = e;
  if (!l)
    return o !== void 0 ? {
      checkedKeys: HP(n, o),
      indeterminateKeys: Array.from(i)
    } : r !== void 0 ? {
      checkedKeys: jP(n, r),
      indeterminateKeys: Array.from(i)
    } : {
      checkedKeys: Array.from(n),
      indeterminateKeys: Array.from(i)
    };
  const { levelTreeNodeMap: c } = t;
  let h;
  r !== void 0 ? h = XP(r, n, t, d) : o !== void 0 ? h = qP(o, n, t, d) : h = Qa(n, t, d, !1);
  const p = s === "parent", v = s === "child" || a, u = h, g = /* @__PURE__ */ new Set(), m = Math.max.apply(null, Array.from(c.keys()));
  for (let f = m; f >= 0; f -= 1) {
    const b = f === 0, x = c.get(f);
    for (const y of x) {
      if (y.isLeaf)
        continue;
      const { key: S, shallowLoaded: C } = y;
      if (v && C && y.children.forEach((O) => {
        !O.disabled && !O.isLeaf && O.shallowLoaded && u.has(O.key) && u.delete(O.key);
      }), y.disabled || !C)
        continue;
      let w = !0, $ = !1, k = !0;
      for (const O of y.children) {
        const G = O.key;
        if (!O.disabled) {
          if (k && (k = !1), u.has(G))
            $ = !0;
          else if (g.has(G)) {
            $ = !0, w = !1;
            break;
          } else if (w = !1, $)
            break;
        }
      }
      w && !k ? (p && y.children.forEach((O) => {
        !O.disabled && u.has(O.key) && u.delete(O.key);
      }), u.add(S)) : $ && g.add(S), b && v && u.has(S) && u.delete(S);
    }
  }
  return {
    checkedKeys: Array.from(u),
    indeterminateKeys: Array.from(g)
  };
}
function Qa(e, t, n, o) {
  const { treeNodeMap: r, getChildren: i } = t, l = /* @__PURE__ */ new Set(), a = new Set(e);
  return e.forEach((s) => {
    const d = r.get(s);
    d !== void 0 && Tg(d, (c) => {
      if (c.disabled)
        return Pd.STOP;
      const { key: h } = c;
      if (!l.has(h) && (l.add(h), a.add(h), DP(c.rawNode, i))) {
        if (o)
          return Pd.STOP;
        if (!n)
          throw new KP();
      }
    });
  }), a;
}
function YP(e, { includeGroup: t = !1, includeSelf: n = !0 }, o) {
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
function ZP(e) {
  if (e.length === 0)
    return null;
  const t = e[0];
  return t.isGroup || t.ignored || t.disabled ? t.getNext() : t;
}
function JP(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r + 1) % o] : r === n.length - 1 ? null : n[r + 1];
}
function Uf(e, t, { loop: n = !1, includeDisabled: o = !1 } = {}) {
  const r = t === "prev" ? QP : JP, i = {
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
        const c = gc(d, i);
        c !== null ? a = c : s(r(d, n));
      } else {
        const c = r(d, !1);
        if (c !== null)
          s(c);
        else {
          const h = e3(d);
          h != null && h.isGroup ? s(r(h, n)) : n && s(r(d, !0));
        }
      }
    }
  }
  return s(e), a;
}
function QP(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r - 1 + o) % o] : r === 0 ? null : n[r - 1];
}
function e3(e) {
  return e.parent;
}
function gc(e, t = {}) {
  const { reverse: n = !1 } = t, { children: o } = e;
  if (o) {
    const { length: r } = o, i = n ? r - 1 : 0, l = n ? -1 : r, a = n ? -1 : 1;
    for (let s = i; s !== l; s += a) {
      const d = o[s];
      if (!d.disabled && !d.ignored)
        if (d.isGroup) {
          const c = gc(d, t);
          if (c !== null)
            return c;
        } else
          return d;
    }
  }
  return null;
}
const t3 = {
  getChild() {
    return this.ignored ? null : gc(this);
  },
  getParent() {
    const { parent: e } = this;
    return e != null && e.isGroup ? e.getParent() : e;
  },
  getNext(e = {}) {
    return Uf(this, "next", e);
  },
  getPrev(e = {}) {
    return Uf(this, "prev", e);
  }
};
function n3(e, t) {
  const n = t ? new Set(t) : void 0, o = [];
  function r(i) {
    i.forEach((l) => {
      o.push(l), !(l.isLeaf || !l.children || l.ignored) && (l.isGroup || // normal non-leaf node
      n === void 0 || n.has(l.key)) && r(l.children);
    });
  }
  return r(e), o;
}
function o3(e, t) {
  const n = e.key;
  for (; t; ) {
    if (t.key === n)
      return !0;
    t = t.parent;
  }
  return !1;
}
function _g(e, t, n, o, r, i = null, l = 0) {
  const a = [];
  return e.forEach((s, d) => {
    var c;
    const h = Object.create(o);
    if (h.rawNode = s, h.siblings = a, h.level = l, h.index = d, h.isFirstChild = d === 0, h.isLastChild = d + 1 === e.length, h.parent = i, !h.ignored) {
      const p = r(s);
      Array.isArray(p) && (h.children = _g(p, t, n, o, r, h, l + 1));
    }
    a.push(h), t.set(h.key, h), n.has(l) || n.set(l, []), (c = n.get(l)) === null || c === void 0 || c.push(h);
  }), a;
}
function gl(e, t = {}) {
  var n;
  const o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), { getDisabled: i = NP, getIgnored: l = BP, getIsGroup: a = WP, getKey: s = AP } = t, d = (n = t.getChildren) !== null && n !== void 0 ? n : IP, c = t.ignoreEmptyChildren ? (y) => {
    const S = d(y);
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
      return VP(this.rawNode, c);
    },
    get shallowLoaded() {
      return LP(this.rawNode, c);
    },
    get ignored() {
      return l(this.rawNode);
    },
    contains(y) {
      return o3(this, y);
    }
  }, t3), p = _g(e, o, r, h, c);
  function v(y) {
    if (y == null)
      return null;
    const S = o.get(y);
    return S && !S.isGroup && !S.ignored ? S : null;
  }
  function u(y) {
    if (y == null)
      return null;
    const S = o.get(y);
    return S && !S.ignored ? S : null;
  }
  function g(y, S) {
    const C = u(y);
    return C ? C.getPrev(S) : null;
  }
  function m(y, S) {
    const C = u(y);
    return C ? C.getNext(S) : null;
  }
  function f(y) {
    const S = u(y);
    return S ? S.getParent() : null;
  }
  function b(y) {
    const S = u(y);
    return S ? S.getChild() : null;
  }
  const x = {
    treeNodes: p,
    treeNodeMap: o,
    levelTreeNodeMap: r,
    maxLevel: Math.max(...r.keys()),
    getChildren: c,
    getFlattenedNodes(y) {
      return n3(p, y);
    },
    getNode: v,
    getPrev: g,
    getNext: m,
    getParent: f,
    getChild: b,
    getFirstAvailableNode() {
      return ZP(p);
    },
    getPath(y, S = {}) {
      return YP(y, S, x);
    },
    getCheckedKeys(y, S = {}) {
      const { cascade: C = !0, leafOnly: w = !1, checkStrategy: $ = "all", allowNotLoaded: k = !1 } = S;
      return is({
        checkedKeys: os(y),
        indeterminateKeys: rs(y),
        cascade: C,
        leafOnly: w,
        checkStrategy: $,
        allowNotLoaded: k
      }, x);
    },
    check(y, S, C = {}) {
      const { cascade: w = !0, leafOnly: $ = !1, checkStrategy: k = "all", allowNotLoaded: O = !1 } = C;
      return is({
        checkedKeys: os(S),
        indeterminateKeys: rs(S),
        keysToCheck: y == null ? [] : Wf(y),
        cascade: w,
        leafOnly: $,
        checkStrategy: k,
        allowNotLoaded: O
      }, x);
    },
    uncheck(y, S, C = {}) {
      const { cascade: w = !0, leafOnly: $ = !1, checkStrategy: k = "all", allowNotLoaded: O = !1 } = C;
      return is({
        checkedKeys: os(S),
        indeterminateKeys: rs(S),
        keysToUncheck: y == null ? [] : Wf(y),
        cascade: w,
        leafOnly: $,
        checkStrategy: k,
        allowNotLoaded: O
      }, x);
    },
    getNonLeafKeys(y = {}) {
      return MP(p, y);
    }
  };
  return x;
}
const r3 = {
  iconSizeTiny: "28px",
  iconSizeSmall: "34px",
  iconSizeMedium: "40px",
  iconSizeLarge: "46px",
  iconSizeHuge: "52px"
};
function i3(e) {
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
  return Object.assign(Object.assign({}, r3), {
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
const mc = {
  name: "Empty",
  common: ut,
  self: i3
}, a3 = T("empty", `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [A("icon", `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [D("+", [A("description", `
 margin-top: 8px;
 `)])]), A("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), A("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]), Qr = window.Vue.computed, l3 = window.Vue.defineComponent, ur = window.Vue.h, s3 = Object.assign(Object.assign({}, Pe.props), {
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
}), Fg = l3({
  name: "Empty",
  props: s3,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n,
      mergedComponentPropsRef: o
    } = He(e), r = Pe("Empty", "-empty", a3, mc, e, t), {
      localeRef: i
    } = Er("Empty"), l = Qr(() => {
      var c, h, p;
      return (c = e.description) !== null && c !== void 0 ? c : (p = (h = o == null ? void 0 : o.value) === null || h === void 0 ? void 0 : h.Empty) === null || p === void 0 ? void 0 : p.description;
    }), a = Qr(() => {
      var c, h;
      return ((h = (c = o == null ? void 0 : o.value) === null || c === void 0 ? void 0 : c.Empty) === null || h === void 0 ? void 0 : h.renderIcon) || (() => ur(WR, null));
    }), s = Qr(() => {
      const {
        size: c
      } = e, {
        common: {
          cubicBezierEaseInOut: h
        },
        self: {
          [ne("iconSize", c)]: p,
          [ne("fontSize", c)]: v,
          textColor: u,
          iconColor: g,
          extraTextColor: m
        }
      } = r.value;
      return {
        "--n-icon-size": p,
        "--n-font-size": v,
        "--n-bezier": h,
        "--n-text-color": u,
        "--n-icon-color": g,
        "--n-extra-text-color": m
      };
    }), d = n ? mt("empty", Qr(() => {
      let c = "";
      const {
        size: h
      } = e;
      return c += h[0], c;
    }), s, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedRenderIcon: a,
      localizedDescription: Qr(() => l.value || i.value.description),
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
    }, e.icon ? e.icon() : ur(Ct, {
      clsPrefix: t
    }, {
      default: this.mergedRenderIcon
    })) : null, this.showDescription ? ur("div", {
      class: `${t}-empty__description`
    }, e.default ? e.default() : this.localizedDescription) : null, e.extra ? ur("div", {
      class: `${t}-empty__extra`
    }, e.extra()) : null);
  }
}), d3 = {
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
function c3(e) {
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
    fontSizeLarge: u,
    fontSizeHuge: g,
    heightTiny: m,
    heightSmall: f,
    heightMedium: b,
    heightLarge: x,
    heightHuge: y
  } = e;
  return Object.assign(Object.assign({}, d3), {
    optionFontSizeTiny: h,
    optionFontSizeSmall: p,
    optionFontSizeMedium: v,
    optionFontSizeLarge: u,
    optionFontSizeHuge: g,
    optionHeightTiny: m,
    optionHeightSmall: f,
    optionHeightMedium: b,
    optionHeightLarge: x,
    optionHeightHuge: y,
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
const bc = {
  name: "InternalSelectMenu",
  common: ut,
  peers: {
    Scrollbar: Vr,
    Empty: mc
  },
  self: c3
}, u3 = window.Vue.defineComponent, f3 = window.Vue.h, h3 = window.Vue.inject, Kf = u3({
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
    } = h3(Xd);
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
    } = this, i = o == null ? void 0 : o(r), l = t ? t(r, !1) : At(r[this.labelField], r, !1), a = f3("div", Object.assign({}, i, {
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
}), p3 = window.Vue.defineComponent, mi = window.Vue.h, v3 = window.Vue.inject, g3 = window.Vue.Transition;
function m3(e, t) {
  return mi(g3, {
    name: "fade-in-scale-up-transition"
  }, {
    default: () => e ? mi(Ct, {
      clsPrefix: t,
      class: `${t}-base-select-option__check`
    }, {
      default: () => mi(BR)
    }) : null
  });
}
const qf = p3({
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
    } = v3(Xd), v = Ae(() => {
      const {
        value: f
      } = n;
      return f ? e.tmNode.key === f.key : !1;
    });
    function u(f) {
      const {
        tmNode: b
      } = e;
      b.disabled || h(f, b);
    }
    function g(f) {
      const {
        tmNode: b
      } = e;
      b.disabled || p(f, b);
    }
    function m(f) {
      const {
        tmNode: b
      } = e, {
        value: x
      } = v;
      b.disabled || x || p(f, b);
    }
    return {
      multiple: o,
      isGrouped: Ae(() => {
        const {
          tmNode: f
        } = e, {
          parent: b
        } = f;
        return b && b.rawNode.type === "group";
      }),
      showCheckmark: d,
      nodeProps: c,
      isPending: v,
      isSelected: Ae(() => {
        const {
          value: f
        } = t, {
          value: b
        } = o;
        if (f === null) return !1;
        const x = e.tmNode.rawNode[s.value];
        if (b) {
          const {
            value: y
          } = r;
          return y.has(x);
        } else
          return f === x;
      }),
      labelField: a,
      renderLabel: i,
      renderOption: l,
      handleMouseMove: m,
      handleMouseEnter: g,
      handleClick: u
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
    } = this, p = m3(n, e), v = s ? [s(t, n), i && p] : [At(t[this.labelField], t, n), i && p], u = l == null ? void 0 : l(t), g = mi("div", Object.assign({}, u, {
      class: [`${e}-base-select-option`, t.class, u == null ? void 0 : u.class, {
        [`${e}-base-select-option--disabled`]: t.disabled,
        [`${e}-base-select-option--selected`]: n,
        [`${e}-base-select-option--grouped`]: r,
        [`${e}-base-select-option--pending`]: o,
        [`${e}-base-select-option--show-checkmark`]: i
      }],
      style: [(u == null ? void 0 : u.style) || "", t.style || ""],
      onClick: vi([d, u == null ? void 0 : u.onClick]),
      onMouseenter: vi([c, u == null ? void 0 : u.onMouseenter]),
      onMousemove: vi([h, u == null ? void 0 : u.onMousemove])
    }), mi("div", {
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
  cubicBezierEaseIn: Gf,
  cubicBezierEaseOut: Xf
} = nr;
function Vi({
  transformOrigin: e = "inherit",
  duration: t = ".2s",
  enterScale: n = ".9",
  originalTransform: o = "",
  originalTransition: r = ""
} = {}) {
  return [D("&.fade-in-scale-up-transition-leave-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${Gf}, transform ${t} ${Gf} ${r && `,${r}`}`
  }), D("&.fade-in-scale-up-transition-enter-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${Xf}, transform ${t} ${Xf} ${r && `,${r}`}`
  }), D("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
    opacity: 0,
    transform: `${o} scale(${n})`
  }), D("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
    opacity: 1,
    transform: `${o} scale(1)`
  })];
}
const b3 = T("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [T("scrollbar", `
 max-height: var(--n-height);
 `), T("virtual-list", `
 max-height: var(--n-height);
 `), T("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [A("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), T("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), T("base-select-menu-option-wrapper", `
 position: relative;
 width: 100%;
 `), A("loading, empty", `
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `), A("loading", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `), A("header", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), A("action", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), T("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), T("base-select-option", `
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `, [B("show-checkmark", `
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `), D("&::before", `
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), D("&:active", `
 color: var(--n-option-text-color-pressed);
 `), B("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), B("pending", [D("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), B("selected", `
 color: var(--n-option-text-color-active);
 `, [D("&::before", `
 background-color: var(--n-option-color-active);
 `), B("pending", [D("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), B("disabled", `
 cursor: not-allowed;
 `, [rt("selected", `
 color: var(--n-option-text-color-disabled);
 `), B("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), A("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [Vi({
  enterScale: "0.5"
})])])]), vo = window.Vue.computed, w3 = window.Vue.defineComponent, Gt = window.Vue.h, y3 = window.Vue.nextTick, x3 = window.Vue.onBeforeUnmount, C3 = window.Vue.onMounted, Yf = window.Vue.provide, fa = window.Vue.ref, Qn = window.Vue.toRef, Zf = window.Vue.watch, Eg = w3({
  name: "InternalSelectMenu",
  props: Object.assign(Object.assign({}, Pe.props), {
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
    } = He(e), o = Lt("InternalSelectMenu", n, t), r = Pe("InternalSelectMenu", "-internal-select-menu", b3, bc, e, Qn(e, "clsPrefix")), i = fa(null), l = fa(null), a = fa(null), s = vo(() => e.treeMate.getFlattenedNodes()), d = vo(() => UP(s.value)), c = fa(null);
    function h() {
      const {
        treeMate: L
      } = e;
      let Z = null;
      const {
        value: ee
      } = e;
      ee === null ? Z = L.getFirstAvailableNode() : (e.multiple ? Z = L.getNode((ee || [])[(ee || []).length - 1]) : Z = L.getNode(ee), (!Z || Z.disabled) && (Z = L.getFirstAvailableNode())), I(Z || null);
    }
    function p() {
      const {
        value: L
      } = c;
      L && !e.treeMate.getNode(L.key) && (c.value = null);
    }
    let v;
    Zf(() => e.show, (L) => {
      L ? v = Zf(() => e.treeMate, () => {
        e.resetMenuOnOptionsChange ? (e.autoPending ? h() : p(), y3(M)) : p();
      }, {
        immediate: !0
      }) : v == null || v();
    }, {
      immediate: !0
    }), x3(() => {
      v == null || v();
    });
    const u = vo(() => kt(r.value.self[ne("optionHeight", e.size)])), g = vo(() => zt(r.value.self[ne("padding", e.size)])), m = vo(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), f = vo(() => {
      const L = s.value;
      return L && L.length === 0;
    });
    function b(L) {
      const {
        onToggle: Z
      } = e;
      Z && Z(L);
    }
    function x(L) {
      const {
        onScroll: Z
      } = e;
      Z && Z(L);
    }
    function y(L) {
      var Z;
      (Z = a.value) === null || Z === void 0 || Z.sync(), x(L);
    }
    function S() {
      var L;
      (L = a.value) === null || L === void 0 || L.sync();
    }
    function C() {
      const {
        value: L
      } = c;
      return L || null;
    }
    function w(L, Z) {
      Z.disabled || I(Z, !1);
    }
    function $(L, Z) {
      Z.disabled || b(Z);
    }
    function k(L) {
      var Z;
      mn(L, "action") || (Z = e.onKeyup) === null || Z === void 0 || Z.call(e, L);
    }
    function O(L) {
      var Z;
      mn(L, "action") || (Z = e.onKeydown) === null || Z === void 0 || Z.call(e, L);
    }
    function G(L) {
      var Z;
      (Z = e.onMousedown) === null || Z === void 0 || Z.call(e, L), !e.focusable && L.preventDefault();
    }
    function _() {
      const {
        value: L
      } = c;
      L && I(L.getNext({
        loop: !0
      }), !0);
    }
    function V() {
      const {
        value: L
      } = c;
      L && I(L.getPrev({
        loop: !0
      }), !0);
    }
    function I(L, Z = !1) {
      c.value = L, Z && M();
    }
    function M() {
      var L, Z;
      const ee = c.value;
      if (!ee) return;
      const ue = d.value(ee.key);
      ue !== null && (e.virtualScroll ? (L = l.value) === null || L === void 0 || L.scrollTo({
        index: ue
      }) : (Z = a.value) === null || Z === void 0 || Z.scrollTo({
        index: ue,
        elSize: u.value
      }));
    }
    function X(L) {
      var Z, ee;
      !((Z = i.value) === null || Z === void 0) && Z.contains(L.target) && ((ee = e.onFocus) === null || ee === void 0 || ee.call(e, L));
    }
    function H(L) {
      var Z, ee;
      !((Z = i.value) === null || Z === void 0) && Z.contains(L.relatedTarget) || (ee = e.onBlur) === null || ee === void 0 || ee.call(e, L);
    }
    Yf(Xd, {
      handleOptionMouseEnter: w,
      handleOptionClick: $,
      valueSetRef: m,
      pendingTmNodeRef: c,
      nodePropsRef: Qn(e, "nodeProps"),
      showCheckmarkRef: Qn(e, "showCheckmark"),
      multipleRef: Qn(e, "multiple"),
      valueRef: Qn(e, "value"),
      renderLabelRef: Qn(e, "renderLabel"),
      renderOptionRef: Qn(e, "renderOption"),
      labelFieldRef: Qn(e, "labelField"),
      valueFieldRef: Qn(e, "valueField")
    }), Yf(mv, i), C3(() => {
      const {
        value: L
      } = a;
      L && L.sync();
    });
    const Q = vo(() => {
      const {
        size: L
      } = e, {
        common: {
          cubicBezierEaseInOut: Z
        },
        self: {
          height: ee,
          borderRadius: ue,
          color: fe,
          groupHeaderTextColor: ve,
          actionDividerColor: xe,
          optionTextColorPressed: J,
          optionTextColor: pe,
          optionTextColorDisabled: j,
          optionTextColorActive: W,
          optionOpacityDisabled: ie,
          optionCheckColor: ye,
          actionTextColor: Me,
          optionColorPending: ze,
          optionColorActive: se,
          loadingColor: P,
          loadingSize: R,
          optionColorActivePending: E,
          [ne("optionFontSize", L)]: N,
          [ne("optionHeight", L)]: re,
          [ne("optionPadding", L)]: de
        }
      } = r.value;
      return {
        "--n-height": ee,
        "--n-action-divider-color": xe,
        "--n-action-text-color": Me,
        "--n-bezier": Z,
        "--n-border-radius": ue,
        "--n-color": fe,
        "--n-option-font-size": N,
        "--n-group-header-text-color": ve,
        "--n-option-check-color": ye,
        "--n-option-color-pending": ze,
        "--n-option-color-active": se,
        "--n-option-color-active-pending": E,
        "--n-option-height": re,
        "--n-option-opacity-disabled": ie,
        "--n-option-text-color": pe,
        "--n-option-text-color-active": W,
        "--n-option-text-color-disabled": j,
        "--n-option-text-color-pressed": J,
        "--n-option-padding": de,
        "--n-option-padding-left": zt(de, "left"),
        "--n-option-padding-right": zt(de, "right"),
        "--n-loading-color": P,
        "--n-loading-size": R
      };
    }), {
      inlineThemeDisabled: oe
    } = e, te = oe ? mt("internal-select-menu", vo(() => e.size[0]), Q, e) : void 0, Y = {
      selfRef: i,
      next: _,
      prev: V,
      getPendingTmNode: C
    };
    return Iv(i, e.onResize), Object.assign({
      mergedTheme: r,
      mergedClsPrefix: t,
      rtlEnabled: o,
      virtualListRef: l,
      scrollbarRef: a,
      itemSize: u,
      padding: g,
      flattenedNodes: s,
      empty: f,
      virtualListContainer() {
        const {
          value: L
        } = l;
        return L == null ? void 0 : L.listElRef;
      },
      virtualListContent() {
        const {
          value: L
        } = l;
        return L == null ? void 0 : L.itemsElRef;
      },
      doScroll: x,
      handleFocusin: X,
      handleFocusout: H,
      handleKeyUp: k,
      handleKeyDown: O,
      handleMouseDown: G,
      handleVirtualListResize: S,
      handleVirtualListScroll: y,
      cssVars: oe ? void 0 : Q,
      themeClass: te == null ? void 0 : te.themeClass,
      onRender: te == null ? void 0 : te.onRender
    }, Y);
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
    return i == null || i(), Gt("div", {
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
    }, Le(e.header, (l) => l && Gt("div", {
      class: `${n}-base-select-menu__header`,
      "data-header": !0,
      key: "header"
    }, l)), this.loading ? Gt("div", {
      class: `${n}-base-select-menu__loading`
    }, Gt(Mr, {
      clsPrefix: n,
      strokeWidth: 20
    })) : this.empty ? Gt("div", {
      class: `${n}-base-select-menu__empty`,
      "data-empty": !0
    }, dn(e.empty, () => [Gt(Fg, {
      theme: o.peers.Empty,
      themeOverrides: o.peerOverrides.Empty,
      size: this.size
    })])) : Gt(Ir, {
      ref: "scrollbarRef",
      theme: o.peers.Scrollbar,
      themeOverrides: o.peerOverrides.Scrollbar,
      scrollable: this.scrollable,
      container: t ? this.virtualListContainer : void 0,
      content: t ? this.virtualListContent : void 0,
      onScroll: t ? void 0 : this.doScroll
    }, {
      default: () => t ? Gt(nc, {
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
        }) => l.isGroup ? Gt(Kf, {
          key: l.key,
          clsPrefix: n,
          tmNode: l
        }) : l.ignored ? null : Gt(qf, {
          clsPrefix: n,
          key: l.key,
          tmNode: l
        })
      }) : Gt("div", {
        class: `${n}-base-select-menu-option-wrapper`,
        style: {
          paddingTop: this.padding.top,
          paddingBottom: this.padding.bottom
        }
      }, this.flattenedNodes.map((l) => l.isGroup ? Gt(Kf, {
        key: l.key,
        clsPrefix: n,
        tmNode: l
      }) : Gt(qf, {
        clsPrefix: n,
        key: l.key,
        tmNode: l
      })))
    }), Le(e.action, (l) => l && [Gt("div", {
      class: `${n}-base-select-menu__action`,
      "data-action": !0,
      key: "action"
    }, l), Gt(mP, {
      onFocus: this.onTabOut,
      key: "focus-detector"
    })]));
  }
}), S3 = {
  space: "6px",
  spaceArrow: "10px",
  arrowOffset: "10px",
  arrowOffsetVertical: "10px",
  arrowHeight: "6px",
  padding: "8px 14px"
};
function $3(e) {
  const {
    boxShadow2: t,
    popoverColor: n,
    textColor2: o,
    borderRadius: r,
    fontSize: i,
    dividerColor: l
  } = e;
  return Object.assign(Object.assign({}, S3), {
    fontSize: i,
    borderRadius: r,
    color: n,
    dividerColor: l,
    textColor: o,
    boxShadow: t
  });
}
const Ar = {
  name: "Popover",
  common: ut,
  peers: {
    Scrollbar: Vr
  },
  self: $3
}, as = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Rt = "var(--n-arrow-height) * 1.414", k3 = D([T("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [D(">", [T("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), rt("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [rt("scrollable", [rt("show-header-or-footer", "padding: var(--n-padding);")])]), A("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), A("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), B("scrollable, show-header-or-footer", [A("content", `
 padding: var(--n-padding);
 `)])]), T("popover-shared", `
 transform-origin: inherit;
 `, [
  T("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [T("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${Rt});
 height: calc(${Rt});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]),
  // body transition
  D("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `),
  D("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `),
  D("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),
  D("&.popover-transition-leave-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)
]), un("top-start", `
 top: calc(${Rt} / -2);
 left: calc(${eo("top-start")} - var(--v-offset-left));
 `), un("top", `
 top: calc(${Rt} / -2);
 transform: translateX(calc(${Rt} / -2)) rotate(45deg);
 left: 50%;
 `), un("top-end", `
 top: calc(${Rt} / -2);
 right: calc(${eo("top-end")} + var(--v-offset-left));
 `), un("bottom-start", `
 bottom: calc(${Rt} / -2);
 left: calc(${eo("bottom-start")} - var(--v-offset-left));
 `), un("bottom", `
 bottom: calc(${Rt} / -2);
 transform: translateX(calc(${Rt} / -2)) rotate(45deg);
 left: 50%;
 `), un("bottom-end", `
 bottom: calc(${Rt} / -2);
 right: calc(${eo("bottom-end")} + var(--v-offset-left));
 `), un("left-start", `
 left: calc(${Rt} / -2);
 top: calc(${eo("left-start")} - var(--v-offset-top));
 `), un("left", `
 left: calc(${Rt} / -2);
 transform: translateY(calc(${Rt} / -2)) rotate(45deg);
 top: 50%;
 `), un("left-end", `
 left: calc(${Rt} / -2);
 bottom: calc(${eo("left-end")} + var(--v-offset-top));
 `), un("right-start", `
 right: calc(${Rt} / -2);
 top: calc(${eo("right-start")} - var(--v-offset-top));
 `), un("right", `
 right: calc(${Rt} / -2);
 transform: translateY(calc(${Rt} / -2)) rotate(45deg);
 top: 50%;
 `), un("right-end", `
 right: calc(${Rt} / -2);
 bottom: calc(${eo("right-end")} + var(--v-offset-top));
 `), ...sR({
  top: ["right-start", "left-start"],
  right: ["top-end", "bottom-end"],
  bottom: ["right-end", "left-end"],
  left: ["top-start", "bottom-start"]
}, (e, t) => {
  const n = ["right", "left"].includes(t), o = n ? "width" : "height";
  return e.map((r) => {
    const i = r.split("-")[1] === "end", a = `calc((${`var(--v-target-${o}, 0px)`} - ${Rt}) / 2)`, s = eo(r);
    return D(`[v-placement="${r}"] >`, [T("popover-shared", [B("center-arrow", [T("popover-arrow", `${t}: calc(max(${a}, ${s}) ${i ? "+" : "-"} var(--v-offset-${n ? "left" : "top"}));`)])])]);
  });
})]);
function eo(e) {
  return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function un(e, t) {
  const n = e.split("-")[0], o = ["top", "bottom"].includes(n) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return D(`[v-placement="${e}"] >`, [T("popover-shared", `
 margin-${as[n]}: var(--n-space);
 `, [B("show-arrow", `
 margin-${as[n]}: var(--n-space-arrow);
 `), B("overlap", `
 margin: 0;
 `), dw("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${n}: 100%;
 ${as[n]}: auto;
 ${o}
 `, [T("popover-arrow", t)])])]);
}
const ls = window.Vue.computed, R3 = window.Vue.defineComponent, P3 = window.Vue.Fragment, hn = window.Vue.h, T3 = window.Vue.inject, _3 = window.Vue.mergeProps, F3 = window.Vue.onBeforeUnmount, ss = window.Vue.provide, ha = window.Vue.ref, E3 = window.Vue.toRef, z3 = window.Vue.Transition, O3 = window.Vue.vShow, M3 = window.Vue.watch, V3 = window.Vue.watchEffect, I3 = window.Vue.withDirectives, zg = Object.assign(Object.assign({}, Pe.props), {
  to: Un.propTo,
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
function Og({
  arrowClass: e,
  arrowStyle: t,
  arrowWrapperClass: n,
  arrowWrapperStyle: o,
  clsPrefix: r
}) {
  return hn("div", {
    key: "__popover-arrow__",
    style: o,
    class: [`${r}-popover-arrow-wrapper`, n]
  }, hn("div", {
    class: [`${r}-popover-arrow`, e],
    style: t
  }));
}
const A3 = R3({
  name: "PopoverBody",
  inheritAttrs: !1,
  props: zg,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    const {
      namespaceRef: o,
      mergedClsPrefixRef: r,
      inlineThemeDisabled: i,
      mergedRtlRef: l
    } = He(e), a = Pe("Popover", "-popover", k3, Ar, e, r), s = Lt("Popover", l, r), d = ha(null), c = T3("NPopover"), h = ha(null), p = ha(e.show), v = ha(!1);
    V3(() => {
      const {
        show: k
      } = e;
      k && !_1() && !e.internalDeactivateImmediately && (v.value = !0);
    });
    const u = ls(() => {
      const {
        trigger: k,
        onClickoutside: O
      } = e, G = [], {
        positionManuallyRef: {
          value: _
        }
      } = c;
      return _ || (k === "click" && !O && G.push([Ri, C, void 0, {
        capture: !0
      }]), k === "hover" && G.push([Zy, S])), O && G.push([Ri, C, void 0, {
        capture: !0
      }]), (e.displayDirective === "show" || e.animated && v.value) && G.push([O3, e.show]), G;
    }), g = ls(() => {
      const {
        common: {
          cubicBezierEaseInOut: k,
          cubicBezierEaseIn: O,
          cubicBezierEaseOut: G
        },
        self: {
          space: _,
          spaceArrow: V,
          padding: I,
          fontSize: M,
          textColor: X,
          dividerColor: H,
          color: Q,
          boxShadow: oe,
          borderRadius: te,
          arrowHeight: Y,
          arrowOffset: L,
          arrowOffsetVertical: Z
        }
      } = a.value;
      return {
        "--n-box-shadow": oe,
        "--n-bezier": k,
        "--n-bezier-ease-in": O,
        "--n-bezier-ease-out": G,
        "--n-font-size": M,
        "--n-text-color": X,
        "--n-color": Q,
        "--n-divider-color": H,
        "--n-border-radius": te,
        "--n-arrow-height": Y,
        "--n-arrow-offset": L,
        "--n-arrow-offset-vertical": Z,
        "--n-padding": I,
        "--n-space": _,
        "--n-space-arrow": V
      };
    }), m = ls(() => {
      const k = e.width === "trigger" ? void 0 : Pt(e.width), O = [];
      k && O.push({
        width: k
      });
      const {
        maxWidth: G,
        minWidth: _
      } = e;
      return G && O.push({
        maxWidth: Pt(G)
      }), _ && O.push({
        maxWidth: Pt(_)
      }), i || O.push(g.value), O;
    }), f = i ? mt("popover", void 0, g, e) : void 0;
    c.setBodyInstance({
      syncPosition: b
    }), F3(() => {
      c.setBodyInstance(null);
    }), M3(E3(e, "show"), (k) => {
      e.animated || (k ? p.value = !0 : p.value = !1);
    });
    function b() {
      var k;
      (k = d.value) === null || k === void 0 || k.syncPosition();
    }
    function x(k) {
      e.trigger === "hover" && e.keepAliveOnHover && e.show && c.handleMouseEnter(k);
    }
    function y(k) {
      e.trigger === "hover" && e.keepAliveOnHover && c.handleMouseLeave(k);
    }
    function S(k) {
      e.trigger === "hover" && !w().contains(Rr(k)) && c.handleMouseMoveOutside(k);
    }
    function C(k) {
      (e.trigger === "click" && !w().contains(Rr(k)) || e.onClickoutside) && c.handleClickOutside(k);
    }
    function w() {
      return c.getTriggerElement();
    }
    ss(Oi, h), ss(sl, null), ss(dl, null);
    function $() {
      if (f == null || f.onRender(), !(e.displayDirective === "show" || e.show || e.animated && v.value))
        return null;
      let O;
      const G = c.internalRenderBodyRef.value, {
        value: _
      } = r;
      if (G)
        O = G(
          // The popover class and overlap class must exists, they will be used
          // to place the body & transition animation.
          // Shadow class exists for reuse box-shadow.
          [`${_}-popover-shared`, (s == null ? void 0 : s.value) && `${_}-popover--rtl`, f == null ? void 0 : f.themeClass.value, e.overlap && `${_}-popover-shared--overlap`, e.showArrow && `${_}-popover-shared--show-arrow`, e.arrowPointToCenter && `${_}-popover-shared--center-arrow`],
          h,
          m.value,
          x,
          y
        );
      else {
        const {
          value: V
        } = c.extraClassRef, {
          internalTrapFocus: I
        } = e, M = !Sr(t.header) || !Sr(t.footer), X = () => {
          var H, Q;
          const oe = M ? hn(P3, null, Le(t.header, (L) => L ? hn("div", {
            class: [`${_}-popover__header`, e.headerClass],
            style: e.headerStyle
          }, L) : null), Le(t.default, (L) => L ? hn("div", {
            class: [`${_}-popover__content`, e.contentClass],
            style: e.contentStyle
          }, t) : null), Le(t.footer, (L) => L ? hn("div", {
            class: [`${_}-popover__footer`, e.footerClass],
            style: e.footerStyle
          }, L) : null)) : e.scrollable ? (H = t.default) === null || H === void 0 ? void 0 : H.call(t) : hn("div", {
            class: [`${_}-popover__content`, e.contentClass],
            style: e.contentStyle
          }, t), te = e.scrollable ? hn(Pg, {
            themeOverrides: a.value.peerOverrides.Scrollbar,
            theme: a.value.peers.Scrollbar,
            contentClass: M ? void 0 : `${_}-popover__content ${(Q = e.contentClass) !== null && Q !== void 0 ? Q : ""}`,
            contentStyle: M ? void 0 : e.contentStyle
          }, {
            default: () => oe
          }) : oe, Y = e.showArrow ? Og({
            arrowClass: e.arrowClass,
            arrowStyle: e.arrowStyle,
            arrowWrapperClass: e.arrowWrapperClass,
            arrowWrapperStyle: e.arrowWrapperStyle,
            clsPrefix: _
          }) : null;
          return [te, Y];
        };
        O = hn("div", _3({
          class: [`${_}-popover`, `${_}-popover-shared`, (s == null ? void 0 : s.value) && `${_}-popover--rtl`, f == null ? void 0 : f.themeClass.value, V.map((H) => `${_}-${H}`), {
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
          onMouseenter: x,
          onMouseleave: y
        }, n), I ? hn(Vv, {
          active: e.show,
          autoFocus: !0
        }, {
          default: X
        }) : X());
      }
      return I3(O, u.value);
    }
    return {
      displayed: v,
      namespace: o,
      isMounted: c.isMountedRef,
      zIndex: c.zIndexRef,
      followerRef: d,
      adjustedTo: Un(e),
      followerEnabled: p,
      renderContentNode: $
    };
  },
  render() {
    return hn(ec, {
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
      teleportDisabled: this.adjustedTo === Un.tdkey
    }, {
      default: () => this.animated ? hn(z3, {
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
}), B3 = window.Vue.cloneVNode, Jf = window.Vue.computed, L3 = window.Vue.defineComponent, ei = window.Vue.h, N3 = window.Vue.provide, pa = window.Vue.ref, D3 = window.Vue.Text, ds = window.Vue.toRef, H3 = window.Vue.watchEffect, j3 = window.Vue.withDirectives, W3 = Object.keys(zg), U3 = {
  focus: ["onFocus", "onBlur"],
  click: ["onClick"],
  hover: ["onMouseenter", "onMouseleave"],
  manual: [],
  nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
};
function K3(e, t, n) {
  U3[t].forEach((o) => {
    e.props ? e.props = Object.assign({}, e.props) : e.props = {};
    const r = e.props[o], i = n[o];
    r ? e.props[o] = (...l) => {
      r(...l), i(...l);
    } : e.props[o] = i;
  });
}
const Tr = {
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
  to: Un.propTo,
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
}, q3 = Object.assign(Object.assign(Object.assign({}, Pe.props), Tr), {
  internalOnAfterLeave: Function,
  internalRenderBody: Function
}), Ii = L3({
  name: "Popover",
  inheritAttrs: !1,
  props: q3,
  slots: Object,
  __popover__: !0,
  setup(e) {
    const t = zi(), n = pa(null), o = Jf(() => e.show), r = pa(e.defaultShow), i = Bt(o, r), l = Ae(() => e.disabled ? !1 : i.value), a = () => {
      if (e.disabled) return !0;
      const {
        getDisabled: M
      } = e;
      return !!(M != null && M());
    }, s = () => a() ? !1 : i.value, d = Ka(e, ["arrow", "showArrow"]), c = Jf(() => e.overlap ? !1 : d.value);
    let h = null;
    const p = pa(null), v = pa(null), u = Ae(() => e.x !== void 0 && e.y !== void 0);
    function g(M) {
      const {
        "onUpdate:show": X,
        onUpdateShow: H,
        onShow: Q,
        onHide: oe
      } = e;
      r.value = M, X && ce(X, M), H && ce(H, M), M && Q && ce(Q, !0), M && oe && ce(oe, !1);
    }
    function m() {
      h && h.syncPosition();
    }
    function f() {
      const {
        value: M
      } = p;
      M && (window.clearTimeout(M), p.value = null);
    }
    function b() {
      const {
        value: M
      } = v;
      M && (window.clearTimeout(M), v.value = null);
    }
    function x() {
      const M = a();
      if (e.trigger === "focus" && !M) {
        if (s()) return;
        g(!0);
      }
    }
    function y() {
      const M = a();
      if (e.trigger === "focus" && !M) {
        if (!s()) return;
        g(!1);
      }
    }
    function S() {
      const M = a();
      if (e.trigger === "hover" && !M) {
        if (b(), p.value !== null || s()) return;
        const X = () => {
          g(!0), p.value = null;
        }, {
          delay: H
        } = e;
        H === 0 ? X() : p.value = window.setTimeout(X, H);
      }
    }
    function C() {
      const M = a();
      if (e.trigger === "hover" && !M) {
        if (f(), v.value !== null || !s()) return;
        const X = () => {
          g(!1), v.value = null;
        }, {
          duration: H
        } = e;
        H === 0 ? X() : v.value = window.setTimeout(X, H);
      }
    }
    function w() {
      C();
    }
    function $(M) {
      var X;
      s() && (e.trigger === "click" && (f(), b(), g(!1)), (X = e.onClickoutside) === null || X === void 0 || X.call(e, M));
    }
    function k() {
      if (e.trigger === "click" && !a()) {
        f(), b();
        const M = !s();
        g(M);
      }
    }
    function O(M) {
      e.internalTrapFocus && M.key === "Escape" && (f(), b(), g(!1));
    }
    function G(M) {
      r.value = M;
    }
    function _() {
      var M;
      return (M = n.value) === null || M === void 0 ? void 0 : M.targetRef;
    }
    function V(M) {
      h = M;
    }
    return N3("NPopover", {
      getTriggerElement: _,
      handleKeydown: O,
      handleMouseEnter: S,
      handleMouseLeave: C,
      handleClickOutside: $,
      handleMouseMoveOutside: w,
      setBodyInstance: V,
      positionManuallyRef: u,
      isMountedRef: t,
      zIndexRef: ds(e, "zIndex"),
      extraClassRef: ds(e, "internalExtraClass"),
      internalRenderBodyRef: ds(e, "internalRenderBody")
    }), H3(() => {
      i.value && a() && g(!1);
    }), {
      binderInstRef: n,
      positionManually: u,
      mergedShowConsideringDisabledProp: l,
      // if to show popover body
      uncontrolledShow: r,
      mergedShowArrow: c,
      getMergedShow: s,
      setShow: G,
      handleClick: k,
      handleMouseEnter: S,
      handleMouseLeave: C,
      handleFocus: x,
      handleBlur: y,
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
    if (!t && (o = I1(n, "trigger"), o)) {
      o = B3(o), o = o.type === D3 ? ei("span", [o]) : o;
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
        K3(o, l ? "nested" : t ? "manual" : this.trigger, s);
      }
    }
    return ei(Zd, {
      ref: "binderInstRef",
      syncTarget: !r,
      syncTargetWithParent: this.internalSyncTargetWithParent
    }, {
      default: () => {
        this.mergedShowConsideringDisabledProp;
        const i = this.getMergedShow();
        return [this.internalTrapFocus && i ? j3(ei("div", {
          style: {
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }), [[Qd, {
          enabled: i,
          zIndex: this.zIndex
        }]]) : null, t ? null : ei(Jd, null, {
          default: () => o
        }), ei(A3, Po(this.$props, W3, Object.assign(Object.assign({}, this.$attrs), {
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
}), G3 = {
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
function X3(e) {
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
    closeIconColorHover: u,
    closeIconColorPressed: g,
    borderRadiusSmall: m,
    fontSizeMini: f,
    fontSizeTiny: b,
    fontSizeSmall: x,
    fontSizeMedium: y,
    heightMini: S,
    heightTiny: C,
    heightSmall: w,
    heightMedium: $,
    closeColorHover: k,
    closeColorPressed: O,
    buttonColor2Hover: G,
    buttonColor2Pressed: _,
    fontWeightStrong: V
  } = e;
  return Object.assign(Object.assign({}, G3), {
    closeBorderRadius: m,
    heightTiny: S,
    heightSmall: C,
    heightMedium: w,
    heightLarge: $,
    borderRadius: m,
    opacityDisabled: h,
    fontSizeTiny: f,
    fontSizeSmall: b,
    fontSizeMedium: x,
    fontSizeLarge: y,
    fontWeightStrong: V,
    // checked
    textColorCheckable: t,
    textColorHoverCheckable: t,
    textColorPressedCheckable: t,
    textColorChecked: d,
    colorCheckable: "#0000",
    colorHoverCheckable: G,
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
    closeIconColorHover: u,
    closeIconColorPressed: g,
    closeColorHover: k,
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
const Y3 = {
  common: ut,
  self: X3
}, Z3 = {
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
}, J3 = T("tag", `
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
`, [B("strong", `
 font-weight: var(--n-font-weight-strong);
 `), A("border", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `), A("icon", `
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `), A("avatar", `
 display: flex;
 margin: 0 6px 0 0;
 `), A("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), B("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [A("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), A("avatar", `
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `), B("closable", `
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]), B("icon, avatar", [B("round", `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]), B("disabled", `
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `), B("checkable", `
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `, [rt("disabled", [D("&:hover", "background-color: var(--n-color-hover-checkable);", [rt("checked", "color: var(--n-text-color-hover-checkable);")]), D("&:active", "background-color: var(--n-color-pressed-checkable);", [rt("checked", "color: var(--n-text-color-pressed-checkable);")])]), B("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [rt("disabled", [D("&:hover", "background-color: var(--n-color-checked-hover);"), D("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), Qf = window.Vue.computed, Q3 = window.Vue.defineComponent, fr = window.Vue.h, eT = window.Vue.provide, tT = window.Vue.ref, nT = window.Vue.toRef;
window.Vue.watchEffect;
const oT = Object.assign(Object.assign(Object.assign({}, Pe.props), Z3), {
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
}), rT = "n-tag", Na = Q3({
  name: "Tag",
  props: oT,
  slots: Object,
  setup(e) {
    const t = tT(null), {
      mergedBorderedRef: n,
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = He(e), l = Pe("Tag", "-tag", J3, Y3, e, o);
    eT(rT, {
      roundRef: nT(e, "round")
    });
    function a() {
      if (!e.disabled && e.checkable) {
        const {
          checked: v,
          onCheckedChange: u,
          onUpdateChecked: g,
          "onUpdate:checked": m
        } = e;
        g && g(!v), m && m(!v), u && u(!v);
      }
    }
    function s(v) {
      if (e.triggerClickOnClose || v.stopPropagation(), !e.disabled) {
        const {
          onClose: u
        } = e;
        u && ce(u, v);
      }
    }
    const d = {
      setTextContent(v) {
        const {
          value: u
        } = t;
        u && (u.textContent = v);
      }
    }, c = Lt("Tag", i, o), h = Qf(() => {
      const {
        type: v,
        size: u,
        color: {
          color: g,
          textColor: m
        } = {}
      } = e, {
        common: {
          cubicBezierEaseInOut: f
        },
        self: {
          padding: b,
          closeMargin: x,
          borderRadius: y,
          opacityDisabled: S,
          textColorCheckable: C,
          textColorHoverCheckable: w,
          textColorPressedCheckable: $,
          textColorChecked: k,
          colorCheckable: O,
          colorHoverCheckable: G,
          colorPressedCheckable: _,
          colorChecked: V,
          colorCheckedHover: I,
          colorCheckedPressed: M,
          closeBorderRadius: X,
          fontWeightStrong: H,
          [ne("colorBordered", v)]: Q,
          [ne("closeSize", u)]: oe,
          [ne("closeIconSize", u)]: te,
          [ne("fontSize", u)]: Y,
          [ne("height", u)]: L,
          [ne("color", v)]: Z,
          [ne("textColor", v)]: ee,
          [ne("border", v)]: ue,
          [ne("closeIconColor", v)]: fe,
          [ne("closeIconColorHover", v)]: ve,
          [ne("closeIconColorPressed", v)]: xe,
          [ne("closeColorHover", v)]: J,
          [ne("closeColorPressed", v)]: pe
        }
      } = l.value, j = zt(x);
      return {
        "--n-font-weight-strong": H,
        "--n-avatar-size-override": `calc(${L} - 8px)`,
        "--n-bezier": f,
        "--n-border-radius": y,
        "--n-border": ue,
        "--n-close-icon-size": te,
        "--n-close-color-pressed": pe,
        "--n-close-color-hover": J,
        "--n-close-border-radius": X,
        "--n-close-icon-color": fe,
        "--n-close-icon-color-hover": ve,
        "--n-close-icon-color-pressed": xe,
        "--n-close-icon-color-disabled": fe,
        "--n-close-margin-top": j.top,
        "--n-close-margin-right": j.right,
        "--n-close-margin-bottom": j.bottom,
        "--n-close-margin-left": j.left,
        "--n-close-size": oe,
        "--n-color": g || (n.value ? Q : Z),
        "--n-color-checkable": O,
        "--n-color-checked": V,
        "--n-color-checked-hover": I,
        "--n-color-checked-pressed": M,
        "--n-color-hover-checkable": G,
        "--n-color-pressed-checkable": _,
        "--n-font-size": Y,
        "--n-height": L,
        "--n-opacity-disabled": S,
        "--n-padding": b,
        "--n-text-color": m || ee,
        "--n-text-color-checkable": C,
        "--n-text-color-checked": k,
        "--n-text-color-hover-checkable": w,
        "--n-text-color-pressed-checkable": $
      };
    }), p = r ? mt("tag", Qf(() => {
      let v = "";
      const {
        type: u,
        size: g,
        color: {
          color: m,
          textColor: f
        } = {}
      } = e;
      return v += u[0], v += g[0], m && (v += `a${qa(m)}`), f && (v += `b${qa(f)}`), n.value && (v += "c"), v;
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
    const d = Le(s.avatar, (h) => h && fr("div", {
      class: `${n}-tag__avatar`
    }, h)), c = Le(s.icon, (h) => h && fr("div", {
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
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e)), !this.checkable && r ? fr(vl, {
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
}), iT = window.Vue.defineComponent, va = window.Vue.h, Mg = iT({
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
      return va(Mr, {
        clsPrefix: n,
        class: `${n}-base-suffix`,
        strokeWidth: 24,
        scale: 0.85,
        show: e.loading
      }, {
        default: () => e.showArrow ? va(Rd, {
          clsPrefix: n,
          show: e.showClear,
          onClear: e.onClear
        }, {
          placeholder: () => va(Ct, {
            clsPrefix: n,
            class: `${n}-base-suffix__arrow`
          }, {
            default: () => dn(t.default, () => [va(yg, null)])
          })
        }) : null
      });
    };
  }
}), aT = {
  paddingSingle: "0 26px 0 12px",
  paddingMultiple: "3px 26px 0 12px",
  clearSize: "16px",
  arrowSize: "16px"
};
function lT(e) {
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
    iconColorDisabled: u,
    clearColor: g,
    clearColorHover: m,
    clearColorPressed: f,
    placeholderColor: b,
    placeholderColorDisabled: x,
    fontSizeTiny: y,
    fontSizeSmall: S,
    fontSizeMedium: C,
    fontSizeLarge: w,
    heightTiny: $,
    heightSmall: k,
    heightMedium: O,
    heightLarge: G,
    fontWeight: _
  } = e;
  return Object.assign(Object.assign({}, aT), {
    fontSizeTiny: y,
    fontSizeSmall: S,
    fontSizeMedium: C,
    fontSizeLarge: w,
    heightTiny: $,
    heightSmall: k,
    heightMedium: O,
    heightLarge: G,
    borderRadius: t,
    fontWeight: _,
    // default
    textColor: n,
    textColorDisabled: o,
    placeholderColor: b,
    placeholderColorDisabled: x,
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
    arrowColorDisabled: u,
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
    clearColorPressed: f
  });
}
const Vg = {
  name: "InternalSelection",
  common: ut,
  peers: {
    Popover: Ar
  },
  self: lT
}, sT = D([T("base-selection", `
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
 `, [T("base-loading", `
 color: var(--n-loading-color);
 `), T("base-selection-tags", "min-height: var(--n-height);"), A("border, state-border", `
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
 `), A("state-border", `
 z-index: 1;
 border-color: #0000;
 `), T("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [A("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), T("base-selection-overlay", `
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
 `, [A("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), T("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [A("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), T("base-selection-tags", `
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
 `), T("base-selection-label", `
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
 `, [T("base-selection-input", `
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
 `, [A("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), A("render-label", `
 color: var(--n-text-color);
 `)]), rt("disabled", [D("&:hover", [A("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), B("focus", [A("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), B("active", [A("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), T("base-selection-label", "background-color: var(--n-color-active);"), T("base-selection-tags", "background-color: var(--n-color-active);")])]), B("disabled", "cursor: not-allowed;", [A("arrow", `
 color: var(--n-arrow-color-disabled);
 `), T("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [T("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), A("render-label", `
 color: var(--n-text-color-disabled);
 `)]), T("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), T("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), T("base-selection-input-tag", `
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `, [A("input", `
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
 `), A("mirror", `
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]), ["warning", "error"].map((e) => B(`${e}-status`, [A("state-border", `border: var(--n-border-${e});`), rt("disabled", [D("&:hover", [A("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), B("active", [A("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), T("base-selection-label", `background-color: var(--n-color-active-${e});`), T("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), B("focus", [A("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), T("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), T("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [D("&:last-child", "padding-right: 0;"), T("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [A("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), hr = window.Vue.computed, dT = window.Vue.defineComponent, cT = window.Vue.Fragment, We = window.Vue.h, uT = window.Vue.nextTick, fT = window.Vue.onMounted, en = window.Vue.ref, cs = window.Vue.toRef, us = window.Vue.watch, hT = window.Vue.watchEffect, pT = dT({
  name: "InternalSelection",
  props: Object.assign(Object.assign({}, Pe.props), {
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
    } = He(e), o = Lt("InternalSelection", n, t), r = en(null), i = en(null), l = en(null), a = en(null), s = en(null), d = en(null), c = en(null), h = en(null), p = en(null), v = en(null), u = en(!1), g = en(!1), m = en(!1), f = Pe("InternalSelection", "-internal-selection", sT, Vg, e, cs(e, "clsPrefix")), b = hr(() => e.clearable && !e.disabled && (m.value || e.active)), x = hr(() => e.selectedOption ? e.renderTag ? e.renderTag({
      option: e.selectedOption,
      handleClose: () => {
      }
    }) : e.renderLabel ? e.renderLabel(e.selectedOption, !0) : At(e.selectedOption[e.labelField], e.selectedOption, !0) : e.placeholder), y = hr(() => {
      const z = e.selectedOption;
      if (z)
        return z[e.labelField];
    }), S = hr(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
    function C() {
      var z;
      const {
        value: K
      } = r;
      if (K) {
        const {
          value: me
        } = i;
        me && (me.style.width = `${K.offsetWidth}px`, e.maxTagCount !== "responsive" && ((z = p.value) === null || z === void 0 || z.sync({
          showAllItemsBeforeCalculate: !1
        })));
      }
    }
    function w() {
      const {
        value: z
      } = v;
      z && (z.style.display = "none");
    }
    function $() {
      const {
        value: z
      } = v;
      z && (z.style.display = "inline-block");
    }
    us(cs(e, "active"), (z) => {
      z || w();
    }), us(cs(e, "pattern"), () => {
      e.multiple && uT(C);
    });
    function k(z) {
      const {
        onFocus: K
      } = e;
      K && K(z);
    }
    function O(z) {
      const {
        onBlur: K
      } = e;
      K && K(z);
    }
    function G(z) {
      const {
        onDeleteOption: K
      } = e;
      K && K(z);
    }
    function _(z) {
      const {
        onClear: K
      } = e;
      K && K(z);
    }
    function V(z) {
      const {
        onPatternInput: K
      } = e;
      K && K(z);
    }
    function I(z) {
      var K;
      (!z.relatedTarget || !(!((K = l.value) === null || K === void 0) && K.contains(z.relatedTarget))) && k(z);
    }
    function M(z) {
      var K;
      !((K = l.value) === null || K === void 0) && K.contains(z.relatedTarget) || O(z);
    }
    function X(z) {
      _(z);
    }
    function H() {
      m.value = !0;
    }
    function Q() {
      m.value = !1;
    }
    function oe(z) {
      !e.active || !e.filterable || z.target !== i.value && z.preventDefault();
    }
    function te(z) {
      G(z);
    }
    const Y = en(!1);
    function L(z) {
      if (z.key === "Backspace" && !Y.value && !e.pattern.length) {
        const {
          selectedOptions: K
        } = e;
        K != null && K.length && te(K[K.length - 1]);
      }
    }
    let Z = null;
    function ee(z) {
      const {
        value: K
      } = r;
      if (K) {
        const me = z.target.value;
        K.textContent = me, C();
      }
      e.ignoreComposition && Y.value ? Z = z : V(z);
    }
    function ue() {
      Y.value = !0;
    }
    function fe() {
      Y.value = !1, e.ignoreComposition && V(Z), Z = null;
    }
    function ve(z) {
      var K;
      g.value = !0, (K = e.onPatternFocus) === null || K === void 0 || K.call(e, z);
    }
    function xe(z) {
      var K;
      g.value = !1, (K = e.onPatternBlur) === null || K === void 0 || K.call(e, z);
    }
    function J() {
      var z, K;
      if (e.filterable)
        g.value = !1, (z = d.value) === null || z === void 0 || z.blur(), (K = i.value) === null || K === void 0 || K.blur();
      else if (e.multiple) {
        const {
          value: me
        } = a;
        me == null || me.blur();
      } else {
        const {
          value: me
        } = s;
        me == null || me.blur();
      }
    }
    function pe() {
      var z, K, me;
      e.filterable ? (g.value = !1, (z = d.value) === null || z === void 0 || z.focus()) : e.multiple ? (K = a.value) === null || K === void 0 || K.focus() : (me = s.value) === null || me === void 0 || me.focus();
    }
    function j() {
      const {
        value: z
      } = i;
      z && ($(), z.focus());
    }
    function W() {
      const {
        value: z
      } = i;
      z && z.blur();
    }
    function ie(z) {
      const {
        value: K
      } = c;
      K && K.setTextContent(`+${z}`);
    }
    function ye() {
      const {
        value: z
      } = h;
      return z;
    }
    function Me() {
      return i.value;
    }
    let ze = null;
    function se() {
      ze !== null && window.clearTimeout(ze);
    }
    function P() {
      e.active || (se(), ze = window.setTimeout(() => {
        S.value && (u.value = !0);
      }, 100));
    }
    function R() {
      se();
    }
    function E(z) {
      z || (se(), u.value = !1);
    }
    us(S, (z) => {
      z || (u.value = !1);
    }), fT(() => {
      hT(() => {
        const z = d.value;
        z && (e.disabled ? z.removeAttribute("tabindex") : z.tabIndex = g.value ? -1 : 0);
      });
    }), Iv(l, e.onResize);
    const {
      inlineThemeDisabled: N
    } = e, re = hr(() => {
      const {
        size: z
      } = e, {
        common: {
          cubicBezierEaseInOut: K
        },
        self: {
          fontWeight: me,
          borderRadius: _e,
          color: Ge,
          placeholderColor: vt,
          textColor: Xe,
          paddingSingle: Ye,
          paddingMultiple: bt,
          caretColor: tt,
          colorDisabled: we,
          textColorDisabled: Fe,
          placeholderColorDisabled: F,
          colorActive: q,
          boxShadowFocus: ae,
          boxShadowActive: ge,
          boxShadowHover: be,
          border: Ce,
          borderFocus: Se,
          borderHover: Te,
          borderActive: Be,
          arrowColor: it,
          arrowColorDisabled: je,
          loadingColor: _t,
          // form warning
          colorActiveWarning: Mt,
          boxShadowFocusWarning: Vt,
          boxShadowActiveWarning: Nt,
          boxShadowHoverWarning: Dt,
          borderWarning: Zt,
          borderFocusWarning: Jt,
          borderHoverWarning: U,
          borderActiveWarning: le,
          // form error
          colorActiveError: Re,
          boxShadowFocusError: Ie,
          boxShadowActiveError: Ze,
          boxShadowHoverError: De,
          borderError: dt,
          borderFocusError: gt,
          borderHoverError: rn,
          borderActiveError: Xn,
          // clear
          clearColor: Yn,
          clearColorHover: Mo,
          clearColorPressed: Br,
          clearSize: Lr,
          // arrow
          arrowSize: Nr,
          [ne("height", z)]: Dr,
          [ne("fontSize", z)]: Hr
        }
      } = f.value, fo = zt(Ye), ho = zt(bt);
      return {
        "--n-bezier": K,
        "--n-border": Ce,
        "--n-border-active": Be,
        "--n-border-focus": Se,
        "--n-border-hover": Te,
        "--n-border-radius": _e,
        "--n-box-shadow-active": ge,
        "--n-box-shadow-focus": ae,
        "--n-box-shadow-hover": be,
        "--n-caret-color": tt,
        "--n-color": Ge,
        "--n-color-active": q,
        "--n-color-disabled": we,
        "--n-font-size": Hr,
        "--n-height": Dr,
        "--n-padding-single-top": fo.top,
        "--n-padding-multiple-top": ho.top,
        "--n-padding-single-right": fo.right,
        "--n-padding-multiple-right": ho.right,
        "--n-padding-single-left": fo.left,
        "--n-padding-multiple-left": ho.left,
        "--n-padding-single-bottom": fo.bottom,
        "--n-padding-multiple-bottom": ho.bottom,
        "--n-placeholder-color": vt,
        "--n-placeholder-color-disabled": F,
        "--n-text-color": Xe,
        "--n-text-color-disabled": Fe,
        "--n-arrow-color": it,
        "--n-arrow-color-disabled": je,
        "--n-loading-color": _t,
        // form warning
        "--n-color-active-warning": Mt,
        "--n-box-shadow-focus-warning": Vt,
        "--n-box-shadow-active-warning": Nt,
        "--n-box-shadow-hover-warning": Dt,
        "--n-border-warning": Zt,
        "--n-border-focus-warning": Jt,
        "--n-border-hover-warning": U,
        "--n-border-active-warning": le,
        // form error
        "--n-color-active-error": Re,
        "--n-box-shadow-focus-error": Ie,
        "--n-box-shadow-active-error": Ze,
        "--n-box-shadow-hover-error": De,
        "--n-border-error": dt,
        "--n-border-focus-error": gt,
        "--n-border-hover-error": rn,
        "--n-border-active-error": Xn,
        // clear
        "--n-clear-size": Lr,
        "--n-clear-color": Yn,
        "--n-clear-color-hover": Mo,
        "--n-clear-color-pressed": Br,
        // arrow-size
        "--n-arrow-size": Nr,
        // font-weight
        "--n-font-weight": me
      };
    }), de = N ? mt("internal-selection", hr(() => e.size[0]), re, e) : void 0;
    return {
      mergedTheme: f,
      mergedClearable: b,
      mergedClsPrefix: t,
      rtlEnabled: o,
      patternInputFocused: g,
      filterablePlaceholder: x,
      label: y,
      selected: S,
      showTagsPanel: u,
      isComposing: Y,
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
      handleFocusin: I,
      handleClear: X,
      handleMouseEnter: H,
      handleMouseLeave: Q,
      handleDeleteOption: te,
      handlePatternKeyDown: L,
      handlePatternInputInput: ee,
      handlePatternInputBlur: xe,
      handlePatternInputFocus: ve,
      handleMouseEnterCounter: P,
      handleMouseLeaveCounter: R,
      handleFocusout: M,
      handleCompositionEnd: fe,
      handleCompositionStart: ue,
      onPopoverUpdateShow: E,
      focus: pe,
      focusInput: j,
      blur: J,
      blurInput: W,
      updateCounter: ie,
      getCounter: ye,
      getTail: Me,
      renderLabel: e.renderLabel,
      cssVars: N ? void 0 : re,
      themeClass: de == null ? void 0 : de.themeClass,
      onRender: de == null ? void 0 : de.onRender
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
    const p = i === "responsive", v = typeof i == "number", u = p || v, g = We(vd, null, {
      default: () => We(Mg, {
        clsPrefix: a,
        loading: this.loading,
        showArrow: this.showArrow,
        showClear: this.mergedClearable && this.selected,
        onClear: this.handleClear
      }, {
        default: () => {
          var f, b;
          return (b = (f = this.$slots).arrow) === null || b === void 0 ? void 0 : b.call(f);
        }
      })
    });
    let m;
    if (t) {
      const {
        labelField: f
      } = this, b = (V) => We("div", {
        class: `${a}-base-selection-tag-wrapper`,
        key: V.value
      }, c ? c({
        option: V,
        handleClose: () => {
          this.handleDeleteOption(V);
        }
      }) : We(Na, {
        size: n,
        closable: !V.disabled,
        disabled: o,
        onClose: () => {
          this.handleDeleteOption(V);
        },
        internalCloseIsButtonTag: !1,
        internalCloseFocusable: !1
      }, {
        default: () => h ? h(V, !0) : At(V[f], V, !0)
      })), x = () => (v ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(b), y = r ? We("div", {
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
      }, We(Na, {
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
        }, We(Na, {
          size: n,
          ref: "counterRef",
          onMouseenter: this.handleMouseEnterCounter,
          disabled: o
        }, {
          default: () => `+${V}`
        })));
      }
      const w = p ? r ? We(qu, {
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
        counter: S,
        tail: () => y
      }) : We(qu, {
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
        counter: S
      }) : v && C ? x().concat(C) : x(), $ = u ? () => We("div", {
        class: `${a}-base-selection-popover`
      }, p ? x() : this.selectedOptions.map(b)) : void 0, k = u ? Object.assign({
        show: this.showTagsPanel,
        trigger: "hover",
        overlap: !0,
        placement: "top",
        width: "trigger",
        onUpdateShow: this.onPopoverUpdateShow,
        theme: this.mergedTheme.peers.Popover,
        themeOverrides: this.mergedTheme.peerOverrides.Popover
      }, s) : null, G = (this.selected ? !1 : this.active ? !this.pattern && !this.isComposing : !0) ? We("div", {
        class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`
      }, We("div", {
        class: `${a}-base-selection-placeholder__inner`
      }, this.placeholder)) : null, _ = r ? We("div", {
        ref: "patternInputWrapperRef",
        class: `${a}-base-selection-tags`
      }, w, p ? null : y, g) : We("div", {
        ref: "multipleElRef",
        class: `${a}-base-selection-tags`,
        tabindex: o ? void 0 : 0
      }, w, g);
      m = We(cT, null, u ? We(Ii, Object.assign({}, k, {
        scrollable: !0,
        style: "max-height: calc(var(--v-target-height) * 6.6);"
      }), {
        trigger: () => _,
        default: $
      }) : _, G);
    } else if (r) {
      const f = this.pattern || this.isComposing, b = this.active ? !f : !this.selected, x = this.active ? !1 : this.selected;
      m = We("div", {
        ref: "patternInputWrapperRef",
        class: `${a}-base-selection-label`,
        title: this.patternInputFocused ? void 0 : Zu(this.label)
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
      })), x ? We("div", {
        class: `${a}-base-selection-label__render-label ${a}-base-selection-overlay`,
        key: "input"
      }, We("div", {
        class: `${a}-base-selection-overlay__wrapper`
      }, c ? c({
        option: this.selectedOption,
        handleClose: () => {
        }
      }) : h ? h(this.selectedOption, !0) : At(this.label, this.selectedOption, !0))) : null, b ? We("div", {
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
        title: Zu(this.label),
        key: "input"
      }, We("div", {
        class: `${a}-base-selection-input__content`
      }, c ? c({
        option: this.selectedOption,
        handleClose: () => {
        }
      }) : h ? h(this.selectedOption, !0) : At(this.label, this.selectedOption, !0))) : We("div", {
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
  cubicBezierEaseInOut: go
} = nr;
function vT({
  duration: e = ".2s",
  delay: t = ".1s"
} = {}) {
  return [D("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", {
    opacity: 1
  }), D("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), D("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${go},
 max-width ${e} ${go} ${t},
 margin-left ${e} ${go} ${t},
 margin-right ${e} ${go} ${t};
 `), D("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${go} ${t},
 max-width ${e} ${go},
 margin-left ${e} ${go},
 margin-right ${e} ${go};
 `)];
}
const gT = T("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`), mT = window.Vue.defineComponent, bT = window.Vue.h, wT = window.Vue.nextTick, yT = window.Vue.onBeforeUnmount, eh = window.Vue.ref, xT = window.Vue.toRef, CT = mT({
  name: "BaseWave",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    or("-base-wave", gT, xT(e, "clsPrefix"));
    const t = eh(null), n = eh(!1);
    let o = null;
    return yT(() => {
      o !== null && window.clearTimeout(o);
    }), {
      active: n,
      selfRef: t,
      play() {
        o !== null && (window.clearTimeout(o), n.value = !1, o = null), wT(() => {
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
    return bT("div", {
      ref: "selfRef",
      "aria-hidden": !0,
      class: [`${e}-base-wave`, this.active && `${e}-base-wave--active`]
    });
  }
}), ST = Jo && "chrome" in window;
Jo && navigator.userAgent.includes("Firefox");
const Ig = Jo && navigator.userAgent.includes("Safari") && !ST, $T = {
  paddingTiny: "0 8px",
  paddingSmall: "0 10px",
  paddingMedium: "0 12px",
  paddingLarge: "0 14px",
  clearSize: "16px"
};
function kT(e) {
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
    lineHeight: u,
    fontSizeTiny: g,
    fontSizeSmall: m,
    fontSizeMedium: f,
    fontSizeLarge: b,
    heightTiny: x,
    heightSmall: y,
    heightMedium: S,
    heightLarge: C,
    actionColor: w,
    clearColor: $,
    clearColorHover: k,
    clearColorPressed: O,
    placeholderColor: G,
    placeholderColorDisabled: _,
    iconColor: V,
    iconColorDisabled: I,
    iconColorHover: M,
    iconColorPressed: X,
    fontWeight: H
  } = e;
  return Object.assign(Object.assign({}, $T), {
    fontWeight: H,
    countTextColorDisabled: o,
    countTextColor: n,
    heightTiny: x,
    heightSmall: y,
    heightMedium: S,
    heightLarge: C,
    fontSizeTiny: g,
    fontSizeSmall: m,
    fontSizeMedium: f,
    fontSizeLarge: b,
    lineHeight: u,
    lineHeightTextarea: u,
    borderRadius: v,
    iconSize: "16px",
    groupLabelColor: w,
    groupLabelTextColor: t,
    textColor: t,
    textColorDisabled: o,
    textDecorationColor: t,
    caretColor: r,
    placeholderColor: G,
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
    clearColor: $,
    clearColorHover: k,
    clearColorPressed: O,
    iconColor: V,
    iconColorDisabled: I,
    iconColorHover: M,
    iconColorPressed: X,
    suffixTextColor: t
  });
}
const wc = {
  name: "Input",
  common: ut,
  peers: {
    Scrollbar: Vr
  },
  self: kT
}, Ag = "n-input", RT = T("input", `
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
  A("input, textarea", `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),
  A("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder", `
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
  A("input-el, textarea-el", `
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `, [D("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), D("&::placeholder", `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `), D("&:-webkit-autofill ~", [A("placeholder", "display: none;")])]),
  B("round", [rt("textarea", "border-radius: calc(var(--n-height) / 2);")]),
  A("placeholder", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `, [D("span", `
 width: 100%;
 display: inline-block;
 `)]),
  B("textarea", [A("placeholder", "overflow: visible;")]),
  rt("autosize", "width: 100%;"),
  B("autosize", [A("textarea-el, input-el", `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),
  // input
  T("input-wrapper", `
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `),
  A("input-mirror", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `),
  A("input-el", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [D("&[type=password]::-ms-reveal", "display: none;"), D("+", [A("placeholder", `
 display: flex;
 align-items: center; 
 `)])]),
  rt("textarea", [A("placeholder", "white-space: nowrap;")]),
  A("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `),
  // textarea
  B("textarea", "width: 100%;", [T("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), B("resizable", [T("input-wrapper", `
 resize: vertical;
 min-height: var(--n-height);
 `)]), A("textarea-el, textarea-mirror, placeholder", `
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
 `), A("textarea-mirror", `
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),
  // pair
  B("pair", [A("input-el, placeholder", "text-align: center;"), A("separator", `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `, [T("icon", `
 color: var(--n-icon-color);
 `), T("base-icon", `
 color: var(--n-icon-color);
 `)])]),
  B("disabled", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [A("border", "border: var(--n-border-disabled);"), A("input-el, textarea-el", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), A("placeholder", "color: var(--n-placeholder-color-disabled);"), A("separator", "color: var(--n-text-color-disabled);", [T("icon", `
 color: var(--n-icon-color-disabled);
 `), T("base-icon", `
 color: var(--n-icon-color-disabled);
 `)]), T("input-word-count", `
 color: var(--n-count-text-color-disabled);
 `), A("suffix, prefix", "color: var(--n-text-color-disabled);", [T("icon", `
 color: var(--n-icon-color-disabled);
 `), T("internal-icon", `
 color: var(--n-icon-color-disabled);
 `)])]),
  rt("disabled", [A("eye", `
 color: var(--n-icon-color);
 cursor: pointer;
 `, [D("&:hover", `
 color: var(--n-icon-color-hover);
 `), D("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), D("&:hover", [A("state-border", "border: var(--n-border-hover);")]), B("focus", "background-color: var(--n-color-focus);", [A("state-border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),
  A("border, state-border", `
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
  A("state-border", `
 border-color: #0000;
 z-index: 1;
 `),
  A("prefix", "margin-right: 4px;"),
  A("suffix", `
 margin-left: 4px;
 `),
  A("suffix, prefix", `
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `, [T("base-loading", `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `), T("base-clear", `
 font-size: var(--n-icon-size);
 `, [A("placeholder", [T("base-icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), D(">", [T("icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), T("base-icon", `
 font-size: var(--n-icon-size);
 `)]),
  T("input-word-count", `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),
  ["warning", "error"].map((e) => B(`${e}-status`, [rt("disabled", [T("base-loading", `
 color: var(--n-loading-color-${e})
 `), A("input-el, textarea-el", `
 caret-color: var(--n-caret-color-${e});
 `), A("state-border", `
 border: var(--n-border-${e});
 `), D("&:hover", [A("state-border", `
 border: var(--n-border-hover-${e});
 `)]), D("&:focus", `
 background-color: var(--n-color-focus-${e});
 `, [A("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)]), B("focus", `
 background-color: var(--n-color-focus-${e});
 `, [A("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))
]), PT = T("input", [B("disabled", [A("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]), TT = window.Vue.ref, _T = window.Vue.watch;
function FT(e) {
  let t = 0;
  for (const n of e)
    t++;
  return t;
}
function ga(e) {
  return e === "" || e == null;
}
function ET(e) {
  const t = TT(null);
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
      const v = c[d - 1], u = s.indexOf(v, d - 1);
      u !== -1 && (p = u + 1);
    }
    (i = a.setSelectionRange) === null || i === void 0 || i.call(a, p, p);
  }
  function r() {
    t.value = null;
  }
  return _T(e, r), {
    recordCursor: n,
    restoreCursor: o
  };
}
const zT = window.Vue.computed, OT = window.Vue.defineComponent, MT = window.Vue.h, VT = window.Vue.inject, th = OT({
  name: "InputWordCount",
  setup(e, {
    slots: t
  }) {
    const {
      mergedValueRef: n,
      maxlengthRef: o,
      mergedClsPrefixRef: r,
      countGraphemesRef: i
    } = VT(Ag), l = zT(() => {
      const {
        value: a
      } = n;
      return a === null || Array.isArray(a) ? 0 : (i.value || FT)(a);
    });
    return () => {
      const {
        value: a
      } = o, {
        value: s
      } = n;
      return MT("span", {
        class: `${r.value}-input-word-count`
      }, j1(t.default, {
        value: s === null || Array.isArray(s) ? "" : s
      }, () => [a === void 0 ? l.value : `${l.value} / ${a}`]));
    };
  }
}), mo = window.Vue.computed, IT = window.Vue.defineComponent, AT = window.Vue.Fragment, BT = window.Vue.getCurrentInstance, Ue = window.Vue.h, nh = window.Vue.nextTick, LT = window.Vue.onMounted, NT = window.Vue.provide, jt = window.Vue.ref, oh = window.Vue.toRef, rh = window.Vue.watch, ih = window.Vue.watchEffect, DT = Object.assign(Object.assign({}, Pe.props), {
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
}), xt = IT({
  name: "Input",
  props: DT,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBorderedRef: n,
      inlineThemeDisabled: o,
      mergedRtlRef: r
    } = He(e), i = Pe("Input", "-input", RT, wc, e, t);
    Ig && or("-input-safari", PT, t);
    const l = jt(null), a = jt(null), s = jt(null), d = jt(null), c = jt(null), h = jt(null), p = jt(null), v = ET(p), u = jt(null), {
      localeRef: g
    } = Er("Input"), m = jt(e.defaultValue), f = oh(e, "value"), b = Bt(f, m), x = so(e), {
      mergedSizeRef: y,
      mergedDisabledRef: S,
      mergedStatusRef: C
    } = x, w = jt(!1), $ = jt(!1), k = jt(!1), O = jt(!1);
    let G = null;
    const _ = mo(() => {
      const {
        placeholder: U,
        pair: le
      } = e;
      return le ? Array.isArray(U) ? U : U === void 0 ? ["", ""] : [U, U] : U === void 0 ? [g.value.placeholder] : [U];
    }), V = mo(() => {
      const {
        value: U
      } = k, {
        value: le
      } = b, {
        value: Re
      } = _;
      return !U && (ga(le) || Array.isArray(le) && ga(le[0])) && Re[0];
    }), I = mo(() => {
      const {
        value: U
      } = k, {
        value: le
      } = b, {
        value: Re
      } = _;
      return !U && Re[1] && (ga(le) || Array.isArray(le) && ga(le[1]));
    }), M = Ae(() => e.internalForceFocus || w.value), X = Ae(() => {
      if (S.value || e.readonly || !e.clearable || !M.value && !$.value)
        return !1;
      const {
        value: U
      } = b, {
        value: le
      } = M;
      return e.pair ? !!(Array.isArray(U) && (U[0] || U[1])) && ($.value || le) : !!U && ($.value || le);
    }), H = mo(() => {
      const {
        showPasswordOn: U
      } = e;
      if (U)
        return U;
      if (e.showPasswordToggle) return "click";
    }), Q = jt(!1), oe = mo(() => {
      const {
        textDecoration: U
      } = e;
      return U ? Array.isArray(U) ? U.map((le) => ({
        textDecoration: le
      })) : [{
        textDecoration: U
      }] : ["", ""];
    }), te = jt(void 0), Y = () => {
      var U, le;
      if (e.type === "textarea") {
        const {
          autosize: Re
        } = e;
        if (Re && (te.value = (le = (U = u.value) === null || U === void 0 ? void 0 : U.$el) === null || le === void 0 ? void 0 : le.offsetWidth), !a.value || typeof Re == "boolean") return;
        const {
          paddingTop: Ie,
          paddingBottom: Ze,
          lineHeight: De
        } = window.getComputedStyle(a.value), dt = Number(Ie.slice(0, -2)), gt = Number(Ze.slice(0, -2)), rn = Number(De.slice(0, -2)), {
          value: Xn
        } = s;
        if (!Xn) return;
        if (Re.minRows) {
          const Yn = Math.max(Re.minRows, 1), Mo = `${dt + gt + rn * Yn}px`;
          Xn.style.minHeight = Mo;
        }
        if (Re.maxRows) {
          const Yn = `${dt + gt + rn * Re.maxRows}px`;
          Xn.style.maxHeight = Yn;
        }
      }
    }, L = mo(() => {
      const {
        maxlength: U
      } = e;
      return U === void 0 ? void 0 : Number(U);
    });
    LT(() => {
      const {
        value: U
      } = b;
      Array.isArray(U) || Be(U);
    });
    const Z = BT().proxy;
    function ee(U, le) {
      const {
        onUpdateValue: Re,
        "onUpdate:value": Ie,
        onInput: Ze
      } = e, {
        nTriggerFormInput: De
      } = x;
      Re && ce(Re, U, le), Ie && ce(Ie, U, le), Ze && ce(Ze, U, le), m.value = U, De();
    }
    function ue(U, le) {
      const {
        onChange: Re
      } = e, {
        nTriggerFormChange: Ie
      } = x;
      Re && ce(Re, U, le), m.value = U, Ie();
    }
    function fe(U) {
      const {
        onBlur: le
      } = e, {
        nTriggerFormBlur: Re
      } = x;
      le && ce(le, U), Re();
    }
    function ve(U) {
      const {
        onFocus: le
      } = e, {
        nTriggerFormFocus: Re
      } = x;
      le && ce(le, U), Re();
    }
    function xe(U) {
      const {
        onClear: le
      } = e;
      le && ce(le, U);
    }
    function J(U) {
      const {
        onInputBlur: le
      } = e;
      le && ce(le, U);
    }
    function pe(U) {
      const {
        onInputFocus: le
      } = e;
      le && ce(le, U);
    }
    function j() {
      const {
        onDeactivate: U
      } = e;
      U && ce(U);
    }
    function W() {
      const {
        onActivate: U
      } = e;
      U && ce(U);
    }
    function ie(U) {
      const {
        onClick: le
      } = e;
      le && ce(le, U);
    }
    function ye(U) {
      const {
        onWrapperFocus: le
      } = e;
      le && ce(le, U);
    }
    function Me(U) {
      const {
        onWrapperBlur: le
      } = e;
      le && ce(le, U);
    }
    function ze() {
      k.value = !0;
    }
    function se(U) {
      k.value = !1, U.target === h.value ? P(U, 1) : P(U, 0);
    }
    function P(U, le = 0, Re = "input") {
      const Ie = U.target.value;
      if (Be(Ie), U instanceof InputEvent && !U.isComposing && (k.value = !1), e.type === "textarea") {
        const {
          value: De
        } = u;
        De && De.syncUnifiedContainer();
      }
      if (G = Ie, k.value) return;
      v.recordCursor();
      const Ze = R(Ie);
      if (Ze)
        if (!e.pair)
          Re === "input" ? ee(Ie, {
            source: le
          }) : ue(Ie, {
            source: le
          });
        else {
          let {
            value: De
          } = b;
          Array.isArray(De) ? De = [De[0], De[1]] : De = ["", ""], De[le] = Ie, Re === "input" ? ee(De, {
            source: le
          }) : ue(De, {
            source: le
          });
        }
      Z.$forceUpdate(), Ze || nh(v.restoreCursor);
    }
    function R(U) {
      const {
        countGraphemes: le,
        maxlength: Re,
        minlength: Ie
      } = e;
      if (le) {
        let De;
        if (Re !== void 0 && (De === void 0 && (De = le(U)), De > Number(Re)) || Ie !== void 0 && (De === void 0 && (De = le(U)), De < Number(Re)))
          return !1;
      }
      const {
        allowInput: Ze
      } = e;
      return typeof Ze == "function" ? Ze(U) : !0;
    }
    function E(U) {
      J(U), U.relatedTarget === l.value && j(), U.relatedTarget !== null && (U.relatedTarget === c.value || U.relatedTarget === h.value || U.relatedTarget === a.value) || (O.value = !1), z(U, "blur"), p.value = null;
    }
    function N(U, le) {
      pe(U), w.value = !0, O.value = !0, W(), z(U, "focus"), le === 0 ? p.value = c.value : le === 1 ? p.value = h.value : le === 2 && (p.value = a.value);
    }
    function re(U) {
      e.passivelyActivated && (Me(U), z(U, "blur"));
    }
    function de(U) {
      e.passivelyActivated && (w.value = !0, ye(U), z(U, "focus"));
    }
    function z(U, le) {
      U.relatedTarget !== null && (U.relatedTarget === c.value || U.relatedTarget === h.value || U.relatedTarget === a.value || U.relatedTarget === l.value) || (le === "focus" ? (ve(U), w.value = !0) : le === "blur" && (fe(U), w.value = !1));
    }
    function K(U, le) {
      P(U, le, "change");
    }
    function me(U) {
      ie(U);
    }
    function _e(U) {
      xe(U), Ge();
    }
    function Ge() {
      e.pair ? (ee(["", ""], {
        source: "clear"
      }), ue(["", ""], {
        source: "clear"
      })) : (ee("", {
        source: "clear"
      }), ue("", {
        source: "clear"
      }));
    }
    function vt(U) {
      const {
        onMousedown: le
      } = e;
      le && le(U);
      const {
        tagName: Re
      } = U.target;
      if (Re !== "INPUT" && Re !== "TEXTAREA") {
        if (e.resizable) {
          const {
            value: Ie
          } = l;
          if (Ie) {
            const {
              left: Ze,
              top: De,
              width: dt,
              height: gt
            } = Ie.getBoundingClientRect(), rn = 14;
            if (Ze + dt - rn < U.clientX && U.clientX < Ze + dt && De + gt - rn < U.clientY && U.clientY < De + gt)
              return;
          }
        }
        U.preventDefault(), w.value || ae();
      }
    }
    function Xe() {
      var U;
      $.value = !0, e.type === "textarea" && ((U = u.value) === null || U === void 0 || U.handleMouseEnterWrapper());
    }
    function Ye() {
      var U;
      $.value = !1, e.type === "textarea" && ((U = u.value) === null || U === void 0 || U.handleMouseLeaveWrapper());
    }
    function bt() {
      S.value || H.value === "click" && (Q.value = !Q.value);
    }
    function tt(U) {
      if (S.value) return;
      U.preventDefault();
      const le = (Ie) => {
        Ie.preventDefault(), qe("mouseup", document, le);
      };
      if (Ke("mouseup", document, le), H.value !== "mousedown") return;
      Q.value = !0;
      const Re = () => {
        Q.value = !1, qe("mouseup", document, Re);
      };
      Ke("mouseup", document, Re);
    }
    function we(U) {
      e.onKeyup && ce(e.onKeyup, U);
    }
    function Fe(U) {
      switch (e.onKeydown && ce(e.onKeydown, U), U.key) {
        case "Escape":
          q();
          break;
        case "Enter":
          F(U);
          break;
      }
    }
    function F(U) {
      var le, Re;
      if (e.passivelyActivated) {
        const {
          value: Ie
        } = O;
        if (Ie) {
          e.internalDeactivateOnEnter && q();
          return;
        }
        U.preventDefault(), e.type === "textarea" ? (le = a.value) === null || le === void 0 || le.focus() : (Re = c.value) === null || Re === void 0 || Re.focus();
      }
    }
    function q() {
      e.passivelyActivated && (O.value = !1, nh(() => {
        var U;
        (U = l.value) === null || U === void 0 || U.focus();
      }));
    }
    function ae() {
      var U, le, Re;
      S.value || (e.passivelyActivated ? (U = l.value) === null || U === void 0 || U.focus() : ((le = a.value) === null || le === void 0 || le.focus(), (Re = c.value) === null || Re === void 0 || Re.focus()));
    }
    function ge() {
      var U;
      !((U = l.value) === null || U === void 0) && U.contains(document.activeElement) && document.activeElement.blur();
    }
    function be() {
      var U, le;
      (U = a.value) === null || U === void 0 || U.select(), (le = c.value) === null || le === void 0 || le.select();
    }
    function Ce() {
      S.value || (a.value ? a.value.focus() : c.value && c.value.focus());
    }
    function Se() {
      const {
        value: U
      } = l;
      U != null && U.contains(document.activeElement) && U !== document.activeElement && q();
    }
    function Te(U) {
      if (e.type === "textarea") {
        const {
          value: le
        } = a;
        le == null || le.scrollTo(U);
      } else {
        const {
          value: le
        } = c;
        le == null || le.scrollTo(U);
      }
    }
    function Be(U) {
      const {
        type: le,
        pair: Re,
        autosize: Ie
      } = e;
      if (!Re && Ie)
        if (le === "textarea") {
          const {
            value: Ze
          } = s;
          Ze && (Ze.textContent = `${U ?? ""}\r
`);
        } else {
          const {
            value: Ze
          } = d;
          Ze && (U ? Ze.textContent = U : Ze.innerHTML = "&nbsp;");
        }
    }
    function it() {
      Y();
    }
    const je = jt({
      top: "0"
    });
    function _t(U) {
      var le;
      const {
        scrollTop: Re
      } = U.target;
      je.value.top = `${-Re}px`, (le = u.value) === null || le === void 0 || le.syncUnifiedContainer();
    }
    let Mt = null;
    ih(() => {
      const {
        autosize: U,
        type: le
      } = e;
      U && le === "textarea" ? Mt = rh(b, (Re) => {
        !Array.isArray(Re) && Re !== G && Be(Re);
      }) : Mt == null || Mt();
    });
    let Vt = null;
    ih(() => {
      e.type === "textarea" ? Vt = rh(b, (U) => {
        var le;
        !Array.isArray(U) && U !== G && ((le = u.value) === null || le === void 0 || le.syncUnifiedContainer());
      }) : Vt == null || Vt();
    }), NT(Ag, {
      mergedValueRef: b,
      maxlengthRef: L,
      mergedClsPrefixRef: t,
      countGraphemesRef: oh(e, "countGraphemes")
    });
    const Nt = {
      wrapperElRef: l,
      inputElRef: c,
      textareaElRef: a,
      isCompositing: k,
      clear: Ge,
      focus: ae,
      blur: ge,
      select: be,
      deactivate: Se,
      activate: Ce,
      scrollTo: Te
    }, Dt = Lt("Input", r, t), Zt = mo(() => {
      const {
        value: U
      } = y, {
        common: {
          cubicBezierEaseInOut: le
        },
        self: {
          color: Re,
          borderRadius: Ie,
          textColor: Ze,
          caretColor: De,
          caretColorError: dt,
          caretColorWarning: gt,
          textDecorationColor: rn,
          border: Xn,
          borderDisabled: Yn,
          borderHover: Mo,
          borderFocus: Br,
          placeholderColor: Lr,
          placeholderColorDisabled: Nr,
          lineHeightTextarea: Dr,
          colorDisabled: Hr,
          colorFocus: fo,
          textColorDisabled: ho,
          boxShadowFocus: wl,
          iconSize: yl,
          colorFocusWarning: xl,
          boxShadowFocusWarning: Cl,
          borderWarning: Sl,
          borderFocusWarning: $l,
          borderHoverWarning: kl,
          colorFocusError: Rl,
          boxShadowFocusError: Pl,
          borderError: Tl,
          borderFocusError: _l,
          borderHoverError: Sm,
          clearSize: $m,
          clearColor: km,
          clearColorHover: Rm,
          clearColorPressed: Pm,
          iconColor: Tm,
          iconColorDisabled: _m,
          suffixTextColor: Fm,
          countTextColor: Em,
          countTextColorDisabled: zm,
          iconColorHover: Om,
          iconColorPressed: Mm,
          loadingColor: Vm,
          loadingColorError: Im,
          loadingColorWarning: Am,
          fontWeight: Bm,
          [ne("padding", U)]: Lm,
          [ne("fontSize", U)]: Nm,
          [ne("height", U)]: Dm
        }
      } = i.value, {
        left: Hm,
        right: jm
      } = zt(Lm);
      return {
        "--n-bezier": le,
        "--n-count-text-color": Em,
        "--n-count-text-color-disabled": zm,
        "--n-color": Re,
        "--n-font-size": Nm,
        "--n-font-weight": Bm,
        "--n-border-radius": Ie,
        "--n-height": Dm,
        "--n-padding-left": Hm,
        "--n-padding-right": jm,
        "--n-text-color": Ze,
        "--n-caret-color": De,
        "--n-text-decoration-color": rn,
        "--n-border": Xn,
        "--n-border-disabled": Yn,
        "--n-border-hover": Mo,
        "--n-border-focus": Br,
        "--n-placeholder-color": Lr,
        "--n-placeholder-color-disabled": Nr,
        "--n-icon-size": yl,
        "--n-line-height-textarea": Dr,
        "--n-color-disabled": Hr,
        "--n-color-focus": fo,
        "--n-text-color-disabled": ho,
        "--n-box-shadow-focus": wl,
        "--n-loading-color": Vm,
        // form warning
        "--n-caret-color-warning": gt,
        "--n-color-focus-warning": xl,
        "--n-box-shadow-focus-warning": Cl,
        "--n-border-warning": Sl,
        "--n-border-focus-warning": $l,
        "--n-border-hover-warning": kl,
        "--n-loading-color-warning": Am,
        // form error
        "--n-caret-color-error": dt,
        "--n-color-focus-error": Rl,
        "--n-box-shadow-focus-error": Pl,
        "--n-border-error": Tl,
        "--n-border-focus-error": _l,
        "--n-border-hover-error": Sm,
        "--n-loading-color-error": Im,
        // clear-button
        "--n-clear-color": km,
        "--n-clear-size": $m,
        "--n-clear-color-hover": Rm,
        "--n-clear-color-pressed": Pm,
        "--n-icon-color": Tm,
        "--n-icon-color-hover": Om,
        "--n-icon-color-pressed": Mm,
        "--n-icon-color-disabled": _m,
        "--n-suffix-text-color": Fm
      };
    }), Jt = o ? mt("input", mo(() => {
      const {
        value: U
      } = y;
      return U[0];
    }), Zt, e) : void 0;
    return Object.assign(Object.assign({}, Nt), {
      // DOM ref
      wrapperElRef: l,
      inputElRef: c,
      inputMirrorElRef: d,
      inputEl2Ref: h,
      textareaElRef: a,
      textareaMirrorElRef: s,
      textareaScrollbarInstRef: u,
      // value
      rtlEnabled: Dt,
      uncontrolledValue: m,
      mergedValue: b,
      passwordVisible: Q,
      mergedPlaceholder: _,
      showPlaceholder1: V,
      showPlaceholder2: I,
      mergedFocus: M,
      isComposing: k,
      activated: O,
      showClearButton: X,
      mergedSize: y,
      mergedDisabled: S,
      textDecorationStyle: oe,
      mergedClsPrefix: t,
      mergedBordered: n,
      mergedShowPasswordOn: H,
      placeholderStyle: je,
      mergedStatus: C,
      textAreaScrollContainerWidth: te,
      // methods
      handleTextAreaScroll: _t,
      handleCompositionStart: ze,
      handleCompositionEnd: se,
      handleInput: P,
      handleInputBlur: E,
      handleInputFocus: N,
      handleWrapperBlur: re,
      handleWrapperFocus: de,
      handleMouseEnter: Xe,
      handleMouseLeave: Ye,
      handleMouseDown: vt,
      handleChange: K,
      handleClick: me,
      handleClear: _e,
      handlePasswordToggleClick: bt,
      handlePasswordToggleMousedown: tt,
      handleWrapperKeydown: Fe,
      handleWrapperKeyup: we,
      handleTextAreaMirrorResize: it,
      getTextareaScrollContainer: () => a.value,
      mergedTheme: i,
      cssVars: o ? void 0 : Zt,
      themeClass: Jt == null ? void 0 : Jt.themeClass,
      onRender: Jt == null ? void 0 : Jt.onRender
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
    }, Le(v.prefix, (u) => u && Ue("div", {
      class: `${a}-input__prefix`
    }, u)), c === "textarea" ? Ue(Ir, {
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
        var u, g;
        const {
          textAreaScrollContainerWidth: m
        } = this, f = {
          width: this.autosize && m && `${m}px`
        };
        return Ue(AT, null, Ue("textarea", Object.assign({}, this.inputProps, {
          ref: "textareaElRef",
          class: [`${a}-input__textarea-el`, (u = this.inputProps) === null || u === void 0 ? void 0 : u.class],
          autofocus: this.autofocus,
          rows: Number(this.rows),
          placeholder: this.placeholder,
          value: this.mergedValue,
          disabled: this.mergedDisabled,
          maxlength: h ? void 0 : this.maxlength,
          minlength: h ? void 0 : this.minlength,
          readonly: this.readonly,
          tabindex: this.passivelyActivated && !this.activated ? -1 : void 0,
          style: [this.textDecorationStyle[0], (g = this.inputProps) === null || g === void 0 ? void 0 : g.style, f],
          onBlur: this.handleInputBlur,
          onFocus: (b) => {
            this.handleInputFocus(b, 2);
          },
          onInput: this.handleInput,
          onChange: this.handleChange,
          onScroll: this.handleTextAreaScroll
        })), this.showPlaceholder1 ? Ue("div", {
          class: `${a}-input__placeholder`,
          style: [this.placeholderStyle, f],
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
      onFocus: (u) => {
        this.handleInputFocus(u, 0);
      },
      onInput: (u) => {
        this.handleInput(u, 0);
      },
      onChange: (u) => {
        this.handleChange(u, 0);
      }
    })), this.showPlaceholder1 ? Ue("div", {
      class: `${a}-input__placeholder`
    }, Ue("span", null, this.mergedPlaceholder[0])) : null, this.autosize ? Ue("div", {
      class: `${a}-input__input-mirror`,
      key: "mirror",
      ref: "inputMirrorElRef"
    }, " ") : null), !this.pair && Le(v.suffix, (u) => u || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? Ue("div", {
      class: `${a}-input__suffix`
    }, [Le(v["clear-icon-placeholder"], (g) => (this.clearable || g) && Ue(Rd, {
      clsPrefix: a,
      show: this.showClearButton,
      onClear: this.handleClear
    }, {
      placeholder: () => g,
      icon: () => {
        var m, f;
        return (f = (m = this.$slots)["clear-icon"]) === null || f === void 0 ? void 0 : f.call(m);
      }
    })), this.internalLoadingBeforeSuffix ? null : u, this.loading !== void 0 ? Ue(Mg, {
      clsPrefix: a,
      loading: this.loading,
      showArrow: !1,
      showClear: !1,
      style: this.cssVars
    }) : null, this.internalLoadingBeforeSuffix ? u : null, this.showCount && this.type !== "textarea" ? Ue(th, null, {
      default: (g) => {
        var m;
        const {
          renderCount: f
        } = this;
        return f ? f(g) : (m = v.count) === null || m === void 0 ? void 0 : m.call(v, g);
      }
    }) : null, this.mergedShowPasswordOn && this.type === "password" ? Ue("div", {
      class: `${a}-input__eye`,
      onMousedown: this.handlePasswordToggleMousedown,
      onClick: this.handlePasswordToggleClick
    }, this.passwordVisible ? dn(v["password-visible-icon"], () => [Ue(Ct, {
      clsPrefix: a
    }, {
      default: () => Ue(KR, null)
    })]) : dn(v["password-invisible-icon"], () => [Ue(Ct, {
      clsPrefix: a
    }, {
      default: () => Ue(GR, null)
    })])) : null]) : null)), this.pair ? Ue("span", {
      class: `${a}-input__separator`
    }, dn(v.separator, () => [this.separator])) : null, this.pair ? Ue("div", {
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
      onFocus: (u) => {
        this.handleInputFocus(u, 1);
      },
      onInput: (u) => {
        this.handleInput(u, 1);
      },
      onChange: (u) => {
        this.handleChange(u, 1);
      }
    }), this.showPlaceholder2 ? Ue("div", {
      class: `${a}-input__placeholder`
    }, Ue("span", null, this.mergedPlaceholder[1])) : null), Le(v.suffix, (u) => (this.clearable || u) && Ue("div", {
      class: `${a}-input__suffix`
    }, [this.clearable && Ue(Rd, {
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
    }), u]))) : null, this.mergedBordered ? Ue("div", {
      class: `${a}-input__border`
    }) : null, this.mergedBordered ? Ue("div", {
      class: `${a}-input__state-border`
    }) : null, this.showCount && c === "textarea" ? Ue(th, null, {
      default: (u) => {
        var g;
        const {
          renderCount: m
        } = this;
        return m ? m(u) : (g = v.count) === null || g === void 0 ? void 0 : g.call(v, u);
      }
    }) : null);
  }
});
function el(e) {
  return e.type === "group";
}
function Bg(e) {
  return e.type === "ignored";
}
function fs(e, t) {
  try {
    return !!(1 + t.toString().toLowerCase().indexOf(e.trim().toLowerCase()));
  } catch {
    return !1;
  }
}
function Lg(e, t) {
  return {
    getIsGroup: el,
    getIgnored: Bg,
    getKey(o) {
      return el(o) ? o.name || o.key || "key-required" : o[e];
    },
    getChildren(o) {
      return o[t];
    }
  };
}
function HT(e, t, n, o) {
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
        if (Bg(a))
          continue;
        t(n, a) && l.push(a);
      }
    return l;
  }
  return r(e);
}
function jT(e, t, n) {
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
function ma(e) {
  return Je(e, [0, 0, 0, 0.12]);
}
const WT = "n-button-group", UT = {
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
function KT(e) {
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
    primaryColorPressed: u,
    borderColor: g,
    primaryColor: m,
    baseColor: f,
    infoColor: b,
    infoColorHover: x,
    infoColorPressed: y,
    successColor: S,
    successColorHover: C,
    successColorPressed: w,
    warningColor: $,
    warningColorHover: k,
    warningColorPressed: O,
    errorColor: G,
    errorColorHover: _,
    errorColorPressed: V,
    fontWeight: I,
    buttonColor2: M,
    buttonColor2Hover: X,
    buttonColor2Pressed: H,
    fontWeightStrong: Q
  } = e;
  return Object.assign(Object.assign({}, UT), {
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
    colorSecondaryHover: X,
    colorSecondaryPressed: H,
    // tertiary
    colorTertiary: M,
    colorTertiaryHover: X,
    colorTertiaryPressed: H,
    // quaternary
    colorQuaternary: "#0000",
    colorQuaternaryHover: X,
    colorQuaternaryPressed: H,
    // default type
    color: "#0000",
    colorHover: "#0000",
    colorPressed: "#0000",
    colorFocus: "#0000",
    colorDisabled: "#0000",
    textColor: h,
    textColorTertiary: p,
    textColorHover: v,
    textColorPressed: u,
    textColorFocus: v,
    textColorDisabled: h,
    textColorText: h,
    textColorTextHover: v,
    textColorTextPressed: u,
    textColorTextFocus: v,
    textColorTextDisabled: h,
    textColorGhost: h,
    textColorGhostHover: v,
    textColorGhostPressed: u,
    textColorGhostFocus: v,
    textColorGhostDisabled: h,
    border: `1px solid ${g}`,
    borderHover: `1px solid ${v}`,
    borderPressed: `1px solid ${u}`,
    borderFocus: `1px solid ${v}`,
    borderDisabled: `1px solid ${g}`,
    rippleColor: m,
    // primary
    colorPrimary: m,
    colorHoverPrimary: v,
    colorPressedPrimary: u,
    colorFocusPrimary: v,
    colorDisabledPrimary: m,
    textColorPrimary: f,
    textColorHoverPrimary: f,
    textColorPressedPrimary: f,
    textColorFocusPrimary: f,
    textColorDisabledPrimary: f,
    textColorTextPrimary: m,
    textColorTextHoverPrimary: v,
    textColorTextPressedPrimary: u,
    textColorTextFocusPrimary: v,
    textColorTextDisabledPrimary: h,
    textColorGhostPrimary: m,
    textColorGhostHoverPrimary: v,
    textColorGhostPressedPrimary: u,
    textColorGhostFocusPrimary: v,
    textColorGhostDisabledPrimary: m,
    borderPrimary: `1px solid ${m}`,
    borderHoverPrimary: `1px solid ${v}`,
    borderPressedPrimary: `1px solid ${u}`,
    borderFocusPrimary: `1px solid ${v}`,
    borderDisabledPrimary: `1px solid ${m}`,
    rippleColorPrimary: m,
    // info
    colorInfo: b,
    colorHoverInfo: x,
    colorPressedInfo: y,
    colorFocusInfo: x,
    colorDisabledInfo: b,
    textColorInfo: f,
    textColorHoverInfo: f,
    textColorPressedInfo: f,
    textColorFocusInfo: f,
    textColorDisabledInfo: f,
    textColorTextInfo: b,
    textColorTextHoverInfo: x,
    textColorTextPressedInfo: y,
    textColorTextFocusInfo: x,
    textColorTextDisabledInfo: h,
    textColorGhostInfo: b,
    textColorGhostHoverInfo: x,
    textColorGhostPressedInfo: y,
    textColorGhostFocusInfo: x,
    textColorGhostDisabledInfo: b,
    borderInfo: `1px solid ${b}`,
    borderHoverInfo: `1px solid ${x}`,
    borderPressedInfo: `1px solid ${y}`,
    borderFocusInfo: `1px solid ${x}`,
    borderDisabledInfo: `1px solid ${b}`,
    rippleColorInfo: b,
    // success
    colorSuccess: S,
    colorHoverSuccess: C,
    colorPressedSuccess: w,
    colorFocusSuccess: C,
    colorDisabledSuccess: S,
    textColorSuccess: f,
    textColorHoverSuccess: f,
    textColorPressedSuccess: f,
    textColorFocusSuccess: f,
    textColorDisabledSuccess: f,
    textColorTextSuccess: S,
    textColorTextHoverSuccess: C,
    textColorTextPressedSuccess: w,
    textColorTextFocusSuccess: C,
    textColorTextDisabledSuccess: h,
    textColorGhostSuccess: S,
    textColorGhostHoverSuccess: C,
    textColorGhostPressedSuccess: w,
    textColorGhostFocusSuccess: C,
    textColorGhostDisabledSuccess: S,
    borderSuccess: `1px solid ${S}`,
    borderHoverSuccess: `1px solid ${C}`,
    borderPressedSuccess: `1px solid ${w}`,
    borderFocusSuccess: `1px solid ${C}`,
    borderDisabledSuccess: `1px solid ${S}`,
    rippleColorSuccess: S,
    // warning
    colorWarning: $,
    colorHoverWarning: k,
    colorPressedWarning: O,
    colorFocusWarning: k,
    colorDisabledWarning: $,
    textColorWarning: f,
    textColorHoverWarning: f,
    textColorPressedWarning: f,
    textColorFocusWarning: f,
    textColorDisabledWarning: f,
    textColorTextWarning: $,
    textColorTextHoverWarning: k,
    textColorTextPressedWarning: O,
    textColorTextFocusWarning: k,
    textColorTextDisabledWarning: h,
    textColorGhostWarning: $,
    textColorGhostHoverWarning: k,
    textColorGhostPressedWarning: O,
    textColorGhostFocusWarning: k,
    textColorGhostDisabledWarning: $,
    borderWarning: `1px solid ${$}`,
    borderHoverWarning: `1px solid ${k}`,
    borderPressedWarning: `1px solid ${O}`,
    borderFocusWarning: `1px solid ${k}`,
    borderDisabledWarning: `1px solid ${$}`,
    rippleColorWarning: $,
    // error
    colorError: G,
    colorHoverError: _,
    colorPressedError: V,
    colorFocusError: _,
    colorDisabledError: G,
    textColorError: f,
    textColorHoverError: f,
    textColorPressedError: f,
    textColorFocusError: f,
    textColorDisabledError: f,
    textColorTextError: G,
    textColorTextHoverError: _,
    textColorTextPressedError: V,
    textColorTextFocusError: _,
    textColorTextDisabledError: h,
    textColorGhostError: G,
    textColorGhostHoverError: _,
    textColorGhostPressedError: V,
    textColorGhostFocusError: _,
    textColorGhostDisabledError: G,
    borderError: `1px solid ${G}`,
    borderHoverError: `1px solid ${_}`,
    borderPressedError: `1px solid ${V}`,
    borderFocusError: `1px solid ${_}`,
    borderDisabledError: `1px solid ${G}`,
    rippleColorError: G,
    waveOpacity: "0.6",
    fontWeight: I,
    fontWeightStrong: Q
  });
}
const ml = {
  name: "Button",
  common: ut,
  self: KT
}, qT = D([T("button", `
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
 `, [B("color", [A("border", {
  borderColor: "var(--n-border-color)"
}), B("disabled", [A("border", {
  borderColor: "var(--n-border-color-disabled)"
})]), rt("disabled", [D("&:focus", [A("state-border", {
  borderColor: "var(--n-border-color-focus)"
})]), D("&:hover", [A("state-border", {
  borderColor: "var(--n-border-color-hover)"
})]), D("&:active", [A("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})]), B("pressed", [A("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})])])]), B("disabled", {
  backgroundColor: "var(--n-color-disabled)",
  color: "var(--n-text-color-disabled)"
}, [A("border", {
  border: "var(--n-border-disabled)"
})]), rt("disabled", [D("&:focus", {
  backgroundColor: "var(--n-color-focus)",
  color: "var(--n-text-color-focus)"
}, [A("state-border", {
  border: "var(--n-border-focus)"
})]), D("&:hover", {
  backgroundColor: "var(--n-color-hover)",
  color: "var(--n-text-color-hover)"
}, [A("state-border", {
  border: "var(--n-border-hover)"
})]), D("&:active", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [A("state-border", {
  border: "var(--n-border-pressed)"
})]), B("pressed", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [A("state-border", {
  border: "var(--n-border-pressed)"
})])]), B("loading", "cursor: wait;"), T("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [B("active", {
  zIndex: 1,
  animationName: "button-wave-spread, button-wave-opacity"
})]), Jo && "MozBoxSizing" in document.createElement("div").style ? D("&::moz-focus-inner", {
  border: 0
}) : null, A("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `), A("border", {
  border: "var(--n-border)"
}), A("state-border", {
  border: "var(--n-border)",
  borderColor: "#0000",
  zIndex: 1
}), A("icon", `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `, [T("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [gn({
  top: "50%",
  originalTransform: "translateY(-50%)"
})]), vT()]), A("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [D("~", [A("icon", {
  margin: "var(--n-icon-margin)",
  marginRight: 0
})])]), B("block", `
 display: flex;
 width: 100%;
 `), B("dashed", [A("border, state-border", {
  borderStyle: "dashed !important"
})]), B("disabled", {
  cursor: "not-allowed",
  opacity: "var(--n-opacity-disabled)"
})]), D("@keyframes button-wave-spread", {
  from: {
    boxShadow: "0 0 0.5px 0 var(--n-ripple-color)"
  },
  to: {
    // don't use exact 5px since chrome will display the animation with glitches
    boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)"
  }
}), D("@keyframes button-wave-opacity", {
  from: {
    opacity: "var(--n-wave-opacity)"
  },
  to: {
    opacity: 0
  }
})]), ba = window.Vue.computed, GT = window.Vue.defineComponent, zn = window.Vue.h, XT = window.Vue.inject, hs = window.Vue.ref;
window.Vue.watchEffect;
const YT = Object.assign(Object.assign({}, Pe.props), {
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
    default: !Ig
  }
}), It = GT({
  name: "Button",
  props: YT,
  slots: Object,
  setup(e) {
    const t = hs(null), n = hs(null), o = hs(!1), r = Ae(() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered), i = XT(WT, {}), {
      mergedSizeRef: l
    } = so({}, {
      defaultSize: "medium",
      mergedSize: (y) => {
        const {
          size: S
        } = e;
        if (S) return S;
        const {
          size: C
        } = i;
        if (C) return C;
        const {
          mergedSize: w
        } = y || {};
        return w ? w.value : "medium";
      }
    }), a = ba(() => e.focusable && !e.disabled), s = (y) => {
      var S;
      a.value || y.preventDefault(), !e.nativeFocusBehavior && (y.preventDefault(), !e.disabled && a.value && ((S = t.value) === null || S === void 0 || S.focus({
        preventScroll: !0
      })));
    }, d = (y) => {
      var S;
      if (!e.disabled && !e.loading) {
        const {
          onClick: C
        } = e;
        C && ce(C, y), e.text || (S = n.value) === null || S === void 0 || S.play();
      }
    }, c = (y) => {
      switch (y.key) {
        case "Enter":
          if (!e.keyboard)
            return;
          o.value = !1;
      }
    }, h = (y) => {
      switch (y.key) {
        case "Enter":
          if (!e.keyboard || e.loading) {
            y.preventDefault();
            return;
          }
          o.value = !0;
      }
    }, p = () => {
      o.value = !1;
    }, {
      inlineThemeDisabled: v,
      mergedClsPrefixRef: u,
      mergedRtlRef: g
    } = He(e), m = Pe("Button", "-button", qT, ml, e, u), f = Lt("Button", g, u), b = ba(() => {
      const y = m.value, {
        common: {
          cubicBezierEaseInOut: S,
          cubicBezierEaseOut: C
        },
        self: w
      } = y, {
        rippleDuration: $,
        opacityDisabled: k,
        fontWeight: O,
        fontWeightStrong: G
      } = w, _ = l.value, {
        dashed: V,
        type: I,
        ghost: M,
        text: X,
        color: H,
        round: Q,
        circle: oe,
        textColor: te,
        secondary: Y,
        tertiary: L,
        quaternary: Z,
        strong: ee
      } = e, ue = {
        "--n-font-weight": ee ? G : O
      };
      let fe = {
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
      const ve = I === "tertiary", xe = I === "default", J = ve ? "default" : I;
      if (X) {
        const E = te || H;
        fe = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": "#0000",
          "--n-text-color": E || w[ne("textColorText", J)],
          "--n-text-color-hover": E ? Io(E) : w[ne("textColorTextHover", J)],
          "--n-text-color-pressed": E ? ma(E) : w[ne("textColorTextPressed", J)],
          "--n-text-color-focus": E ? Io(E) : w[ne("textColorTextHover", J)],
          "--n-text-color-disabled": E || w[ne("textColorTextDisabled", J)]
        };
      } else if (M || V) {
        const E = te || H;
        fe = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": H || w[ne("rippleColor", J)],
          "--n-text-color": E || w[ne("textColorGhost", J)],
          "--n-text-color-hover": E ? Io(E) : w[ne("textColorGhostHover", J)],
          "--n-text-color-pressed": E ? ma(E) : w[ne("textColorGhostPressed", J)],
          "--n-text-color-focus": E ? Io(E) : w[ne("textColorGhostHover", J)],
          "--n-text-color-disabled": E || w[ne("textColorGhostDisabled", J)]
        };
      } else if (Y) {
        const E = xe ? w.textColor : ve ? w.textColorTertiary : w[ne("color", J)], N = H || E, re = I !== "default" && I !== "tertiary";
        fe = {
          "--n-color": re ? Ve(N, {
            alpha: Number(w.colorOpacitySecondary)
          }) : w.colorSecondary,
          "--n-color-hover": re ? Ve(N, {
            alpha: Number(w.colorOpacitySecondaryHover)
          }) : w.colorSecondaryHover,
          "--n-color-pressed": re ? Ve(N, {
            alpha: Number(w.colorOpacitySecondaryPressed)
          }) : w.colorSecondaryPressed,
          "--n-color-focus": re ? Ve(N, {
            alpha: Number(w.colorOpacitySecondaryHover)
          }) : w.colorSecondaryHover,
          "--n-color-disabled": w.colorSecondary,
          "--n-ripple-color": "#0000",
          "--n-text-color": N,
          "--n-text-color-hover": N,
          "--n-text-color-pressed": N,
          "--n-text-color-focus": N,
          "--n-text-color-disabled": N
        };
      } else if (L || Z) {
        const E = xe ? w.textColor : ve ? w.textColorTertiary : w[ne("color", J)], N = H || E;
        L ? (fe["--n-color"] = w.colorTertiary, fe["--n-color-hover"] = w.colorTertiaryHover, fe["--n-color-pressed"] = w.colorTertiaryPressed, fe["--n-color-focus"] = w.colorSecondaryHover, fe["--n-color-disabled"] = w.colorTertiary) : (fe["--n-color"] = w.colorQuaternary, fe["--n-color-hover"] = w.colorQuaternaryHover, fe["--n-color-pressed"] = w.colorQuaternaryPressed, fe["--n-color-focus"] = w.colorQuaternaryHover, fe["--n-color-disabled"] = w.colorQuaternary), fe["--n-ripple-color"] = "#0000", fe["--n-text-color"] = N, fe["--n-text-color-hover"] = N, fe["--n-text-color-pressed"] = N, fe["--n-text-color-focus"] = N, fe["--n-text-color-disabled"] = N;
      } else
        fe = {
          "--n-color": H || w[ne("color", J)],
          "--n-color-hover": H ? Io(H) : w[ne("colorHover", J)],
          "--n-color-pressed": H ? ma(H) : w[ne("colorPressed", J)],
          "--n-color-focus": H ? Io(H) : w[ne("colorFocus", J)],
          "--n-color-disabled": H || w[ne("colorDisabled", J)],
          "--n-ripple-color": H || w[ne("rippleColor", J)],
          "--n-text-color": te || (H ? w.textColorPrimary : ve ? w.textColorTertiary : w[ne("textColor", J)]),
          "--n-text-color-hover": te || (H ? w.textColorHoverPrimary : w[ne("textColorHover", J)]),
          "--n-text-color-pressed": te || (H ? w.textColorPressedPrimary : w[ne("textColorPressed", J)]),
          "--n-text-color-focus": te || (H ? w.textColorFocusPrimary : w[ne("textColorFocus", J)]),
          "--n-text-color-disabled": te || (H ? w.textColorDisabledPrimary : w[ne("textColorDisabled", J)])
        };
      let pe = {
        "--n-border": "initial",
        "--n-border-hover": "initial",
        "--n-border-pressed": "initial",
        "--n-border-focus": "initial",
        "--n-border-disabled": "initial"
      };
      X ? pe = {
        "--n-border": "none",
        "--n-border-hover": "none",
        "--n-border-pressed": "none",
        "--n-border-focus": "none",
        "--n-border-disabled": "none"
      } : pe = {
        "--n-border": w[ne("border", J)],
        "--n-border-hover": w[ne("borderHover", J)],
        "--n-border-pressed": w[ne("borderPressed", J)],
        "--n-border-focus": w[ne("borderFocus", J)],
        "--n-border-disabled": w[ne("borderDisabled", J)]
      };
      const {
        [ne("height", _)]: j,
        [ne("fontSize", _)]: W,
        [ne("padding", _)]: ie,
        [ne("paddingRound", _)]: ye,
        [ne("iconSize", _)]: Me,
        [ne("borderRadius", _)]: ze,
        [ne("iconMargin", _)]: se,
        waveOpacity: P
      } = w, R = {
        "--n-width": oe && !X ? j : "initial",
        "--n-height": X ? "initial" : j,
        "--n-font-size": W,
        "--n-padding": oe || X ? "initial" : Q ? ye : ie,
        "--n-icon-size": Me,
        "--n-icon-margin": se,
        "--n-border-radius": X ? "initial" : oe || Q ? j : ze
      };
      return Object.assign(Object.assign(Object.assign(Object.assign({
        "--n-bezier": S,
        "--n-bezier-ease-out": C,
        "--n-ripple-duration": $,
        "--n-opacity-disabled": k,
        "--n-wave-opacity": P
      }, ue), fe), pe), R);
    }), x = v ? mt("button", ba(() => {
      let y = "";
      const {
        dashed: S,
        type: C,
        ghost: w,
        text: $,
        color: k,
        round: O,
        circle: G,
        textColor: _,
        secondary: V,
        tertiary: I,
        quaternary: M,
        strong: X
      } = e;
      S && (y += "a"), w && (y += "b"), $ && (y += "c"), O && (y += "d"), G && (y += "e"), V && (y += "f"), I && (y += "g"), M && (y += "h"), X && (y += "i"), k && (y += `j${qa(k)}`), _ && (y += `k${qa(_)}`);
      const {
        value: H
      } = l;
      return y += `l${H[0]}`, y += `m${C[0]}`, y;
    }), b, e) : void 0;
    return {
      selfElRef: t,
      waveElRef: n,
      mergedClsPrefix: u,
      mergedFocusable: a,
      mergedSize: l,
      showBorder: r,
      enterPressed: o,
      rtlEnabled: f,
      handleMousedown: s,
      handleKeydown: h,
      handleBlur: p,
      handleKeyup: c,
      handleClick: d,
      customColorCssVars: ba(() => {
        const {
          color: y
        } = e;
        if (!y) return null;
        const S = Io(y);
        return {
          "--n-border-color": y,
          "--n-border-color-hover": S,
          "--n-border-color-pressed": ma(y),
          "--n-border-color-focus": S,
          "--n-border-color-disabled": y
        };
      }),
      cssVars: v ? void 0 : b,
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
    const o = Le(this.$slots.default, (r) => r && zn("span", {
      class: `${e}-button__content`
    }, r));
    return zn(t, {
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
    }, this.iconPlacement === "right" && o, zn(pP, {
      width: !0
    }, {
      default: () => Le(this.$slots.icon, (r) => (this.loading || this.renderIcon || r) && zn("span", {
        class: `${e}-button__icon`,
        style: {
          margin: Sr(this.$slots.default) ? "0" : ""
        }
      }, zn(zr, null, {
        default: () => this.loading ? zn(Mr, {
          clsPrefix: e,
          key: "loading",
          class: `${e}-icon-slot`,
          strokeWidth: 20
        }) : zn("div", {
          key: "icon",
          class: `${e}-icon-slot`,
          role: "none"
        }, this.renderIcon ? this.renderIcon() : r)
      })))
    }), this.iconPlacement === "left" && o, this.text ? null : zn(CT, {
      ref: "waveElRef",
      clsPrefix: e
    }), this.showBorder ? zn("div", {
      "aria-hidden": !0,
      class: `${e}-button__border`,
      style: this.customColorCssVars
    }) : null, this.showBorder ? zn("div", {
      "aria-hidden": !0,
      class: `${e}-button__state-border`,
      style: this.customColorCssVars
    }) : null);
  }
}), ah = It, ZT = {
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
function JT(e) {
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
    closeColorPressed: u,
    modalColor: g,
    boxShadow1: m,
    popoverColor: f,
    actionColor: b
  } = e;
  return Object.assign(Object.assign({}, ZT), {
    lineHeight: o,
    color: i,
    colorModal: g,
    colorPopover: f,
    colorTarget: t,
    colorEmbedded: b,
    colorEmbeddedModal: b,
    colorEmbeddedPopover: b,
    textColor: l,
    titleTextColor: a,
    borderColor: s,
    actionColor: b,
    titleFontWeight: d,
    closeColorHover: v,
    closeColorPressed: u,
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
const Ng = {
  name: "Card",
  common: ut,
  self: JT
}, QT = D([T("card", `
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
 `, [sv({
  background: "var(--n-color-modal)"
}), B("hoverable", [D("&:hover", "box-shadow: var(--n-box-shadow);")]), B("content-segmented", [D(">", [A("content", {
  paddingTop: "var(--n-padding-bottom)"
})])]), B("content-soft-segmented", [D(">", [A("content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])]), B("footer-segmented", [D(">", [A("footer", {
  paddingTop: "var(--n-padding-bottom)"
})])]), B("footer-soft-segmented", [D(">", [A("footer", `
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]), D(">", [T("card-header", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `, [A("main", `
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `), A("extra", `
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), A("close", `
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), A("action", `
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `), A("content", "flex: 1; min-width: 0;"), A("content, footer", `
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `, [D("&:first-child", {
  paddingTop: "var(--n-padding-bottom)"
})]), A("action", `
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]), T("card-cover", `
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `, [D("img", `
 display: block;
 width: 100%;
 `)]), B("bordered", `
 border: 1px solid var(--n-border-color);
 `, [D("&:target", "border-color: var(--n-color-target);")]), B("action-segmented", [D(">", [A("action", [D("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), B("content-segmented, content-soft-segmented", [D(">", [A("content", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [D("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), B("footer-segmented, footer-soft-segmented", [D(">", [A("footer", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [D("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), B("embedded", `
 background-color: var(--n-color-embedded);
 `)]), al(T("card", `
 background: var(--n-color-modal);
 `, [B("embedded", `
 background-color: var(--n-color-embedded-modal);
 `)])), qd(T("card", `
 background: var(--n-color-popover);
 `, [B("embedded", `
 background-color: var(--n-color-embedded-popover);
 `)]))]), lh = window.Vue.computed, e5 = window.Vue.defineComponent, to = window.Vue.h, yc = {
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
}, t5 = To(yc), n5 = Object.assign(Object.assign({}, Pe.props), yc), Dg = e5({
  name: "Card",
  props: n5,
  slots: Object,
  setup(e) {
    const t = () => {
      const {
        onClose: d
      } = e;
      d && ce(d);
    }, {
      inlineThemeDisabled: n,
      mergedClsPrefixRef: o,
      mergedRtlRef: r
    } = He(e), i = Pe("Card", "-card", QT, Ng, e, o), l = Lt("Card", r, o), a = lh(() => {
      const {
        size: d
      } = e, {
        self: {
          color: c,
          colorModal: h,
          colorTarget: p,
          textColor: v,
          titleTextColor: u,
          titleFontWeight: g,
          borderColor: m,
          actionColor: f,
          borderRadius: b,
          lineHeight: x,
          closeIconColor: y,
          closeIconColorHover: S,
          closeIconColorPressed: C,
          closeColorHover: w,
          closeColorPressed: $,
          closeBorderRadius: k,
          closeIconSize: O,
          closeSize: G,
          boxShadow: _,
          colorPopover: V,
          colorEmbedded: I,
          colorEmbeddedModal: M,
          colorEmbeddedPopover: X,
          [ne("padding", d)]: H,
          [ne("fontSize", d)]: Q,
          [ne("titleFontSize", d)]: oe
        },
        common: {
          cubicBezierEaseInOut: te
        }
      } = i.value, {
        top: Y,
        left: L,
        bottom: Z
      } = zt(H);
      return {
        "--n-bezier": te,
        "--n-border-radius": b,
        "--n-color": c,
        "--n-color-modal": h,
        "--n-color-popover": V,
        "--n-color-embedded": I,
        "--n-color-embedded-modal": M,
        "--n-color-embedded-popover": X,
        "--n-color-target": p,
        "--n-text-color": v,
        "--n-line-height": x,
        "--n-action-color": f,
        "--n-title-text-color": u,
        "--n-title-font-weight": g,
        "--n-close-icon-color": y,
        "--n-close-icon-color-hover": S,
        "--n-close-icon-color-pressed": C,
        "--n-close-color-hover": w,
        "--n-close-color-pressed": $,
        "--n-border-color": m,
        "--n-box-shadow": _,
        // size
        "--n-padding-top": Y,
        "--n-padding-bottom": Z,
        "--n-padding-left": L,
        "--n-font-size": Q,
        "--n-title-font-size": oe,
        "--n-close-size": G,
        "--n-close-icon-size": O,
        "--n-close-border-radius": k
      };
    }), s = n ? mt("card", lh(() => e.size[0]), a, e) : void 0;
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
    return i == null || i(), to(a, {
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
    }, Le(s.cover, (d) => {
      const c = this.cover ? kn([this.cover()]) : d;
      return c && to("div", {
        class: `${o}-card-cover`,
        role: "none"
      }, c);
    }), Le(s.header, (d) => {
      const {
        title: c
      } = this, h = c ? kn(typeof c == "function" ? [c()] : [c]) : d;
      return h || this.closable ? to("div", {
        class: [`${o}-card-header`, this.headerClass],
        style: this.headerStyle,
        role: "heading"
      }, to("div", {
        class: `${o}-card-header__main`,
        role: "heading"
      }, h), Le(s["header-extra"], (p) => {
        const v = this.headerExtra ? kn([this.headerExtra()]) : p;
        return v && to("div", {
          class: [`${o}-card-header__extra`, this.headerExtraClass],
          style: this.headerExtraStyle
        }, v);
      }), this.closable && to(vl, {
        clsPrefix: o,
        class: `${o}-card-header__close`,
        onClick: this.handleCloseClick,
        focusable: this.closeFocusable,
        absolute: !0
      })) : null;
    }), Le(s.default, (d) => {
      const {
        content: c
      } = this, h = c ? kn(typeof c == "function" ? [c()] : [c]) : d;
      return h && to("div", {
        class: [`${o}-card__content`, this.contentClass],
        style: this.contentStyle,
        role: "none"
      }, h);
    }), Le(s.footer, (d) => {
      const c = this.footer ? kn([this.footer()]) : d;
      return c && to("div", {
        class: [`${o}-card__footer`, this.footerClass],
        style: this.footerStyle,
        role: "none"
      }, c);
    }), Le(s.action, (d) => {
      const c = this.action ? kn([this.action()]) : d;
      return c && to("div", {
        class: `${o}-card__action`,
        role: "none"
      }, c);
    }));
  }
}), o5 = {
  sizeSmall: "14px",
  sizeMedium: "16px",
  sizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function r5(e) {
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
    lineHeight: u
  } = e;
  return Object.assign(Object.assign({}, o5), {
    labelLineHeight: u,
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
const Hg = {
  name: "Checkbox",
  common: ut,
  self: r5
}, ps = window.Vue.computed, i5 = window.Vue.defineComponent, a5 = window.Vue.h, l5 = window.Vue.provide, s5 = window.Vue.ref, sh = window.Vue.toRef;
window.Vue.watchEffect;
const jg = "n-checkbox-group", d5 = {
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
}, c5 = i5({
  name: "CheckboxGroup",
  props: d5,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = He(e), n = so(e), {
      mergedSizeRef: o,
      mergedDisabledRef: r
    } = n, i = s5(e.defaultValue), l = ps(() => e.value), a = Bt(l, i), s = ps(() => {
      var h;
      return ((h = a.value) === null || h === void 0 ? void 0 : h.length) || 0;
    }), d = ps(() => Array.isArray(a.value) ? new Set(a.value) : /* @__PURE__ */ new Set());
    function c(h, p) {
      const {
        nTriggerFormInput: v,
        nTriggerFormChange: u
      } = n, {
        onChange: g,
        "onUpdate:value": m,
        onUpdateValue: f
      } = e;
      if (Array.isArray(a.value)) {
        const b = Array.from(a.value), x = b.findIndex((y) => y === p);
        h ? ~x || (b.push(p), f && ce(f, b, {
          actionType: "check",
          value: p
        }), m && ce(m, b, {
          actionType: "check",
          value: p
        }), v(), u(), i.value = b, g && ce(g, b)) : ~x && (b.splice(x, 1), f && ce(f, b, {
          actionType: "uncheck",
          value: p
        }), m && ce(m, b, {
          actionType: "uncheck",
          value: p
        }), g && ce(g, b), i.value = b, v(), u());
      } else
        h ? (f && ce(f, [p], {
          actionType: "check",
          value: p
        }), m && ce(m, [p], {
          actionType: "check",
          value: p
        }), g && ce(g, [p]), i.value = [p], v(), u()) : (f && ce(f, [], {
          actionType: "uncheck",
          value: p
        }), m && ce(m, [], {
          actionType: "uncheck",
          value: p
        }), g && ce(g, []), i.value = [], v(), u());
    }
    return l5(jg, {
      checkedCountRef: s,
      maxRef: sh(e, "max"),
      minRef: sh(e, "min"),
      valueSetRef: d,
      disabledRef: r,
      mergedSizeRef: o,
      toggleCheckbox: c
    }), {
      mergedClsPrefix: t
    };
  },
  render() {
    return a5("div", {
      class: `${this.mergedClsPrefix}-checkbox-group`,
      role: "group"
    }, this.$slots);
  }
}), dh = window.Vue.h, u5 = () => dh("svg", {
  viewBox: "0 0 64 64",
  class: "check-icon"
}, dh("path", {
  d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"
})), ch = window.Vue.h, f5 = () => ch("svg", {
  viewBox: "0 0 100 100",
  class: "line-icon"
}, ch("path", {
  d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z"
})), h5 = D([
  T("checkbox", `
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `, [B("show-label", "line-height: var(--n-label-line-height);"), D("&:hover", [T("checkbox-box", [A("border", "border: var(--n-border-checked);")])]), D("&:focus:not(:active)", [T("checkbox-box", [A("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), B("inside-table", [T("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), B("checked", [T("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [T("checkbox-icon", [
    // if not set width to 100%, safari & old chrome won't display the icon
    D(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)
  ])])]), B("indeterminate", [T("checkbox-box", [T("checkbox-icon", [D(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), D(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), B("checked, indeterminate", [D("&:focus:not(:active)", [T("checkbox-box", [A("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), T("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [A("border", {
    border: "var(--n-border-checked)"
  })])]), B("disabled", {
    cursor: "not-allowed"
  }, [B("checked", [T("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [A("border", {
    border: "var(--n-border-disabled-checked)"
  }), T("checkbox-icon", [D(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled-checked)"
  })])])]), T("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [A("border", `
 border: var(--n-border-disabled);
 `), T("checkbox-icon", [D(".check-icon, .line-icon", `
 fill: var(--n-check-mark-color-disabled);
 `)])]), A("label", `
 color: var(--n-text-color-disabled);
 `)]), T("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), T("checkbox-box", `
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
 `, [A("border", `
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
 `), T("checkbox-icon", `
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `, [D(".check-icon, .line-icon", `
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
 `), gn({
    left: "1px",
    top: "1px"
  })])]), A("label", `
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `, [D("&:empty", {
    display: "none"
  })])]),
  // modal table header checkbox
  al(T("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)),
  // popover table header checkbox
  qd(T("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))
]), uh = window.Vue.computed, p5 = window.Vue.defineComponent, bo = window.Vue.h, v5 = window.Vue.inject, fh = window.Vue.ref, g5 = window.Vue.toRef;
window.Vue.watchEffect;
const m5 = Object.assign(Object.assign({}, Pe.props), {
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
}), xc = p5({
  name: "Checkbox",
  props: m5,
  setup(e) {
    const t = v5(jg, null), n = fh(null), {
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = He(e), l = fh(e.defaultChecked), a = g5(e, "checked"), s = Bt(a, l), d = Ae(() => {
      if (t) {
        const C = t.valueSetRef.value;
        return C && e.value !== void 0 ? C.has(e.value) : !1;
      } else
        return s.value === e.checkedValue;
    }), c = so(e, {
      mergedSize(C) {
        const {
          size: w
        } = e;
        if (w !== void 0) return w;
        if (t) {
          const {
            value: $
          } = t.mergedSizeRef;
          if ($ !== void 0)
            return $;
        }
        if (C) {
          const {
            mergedSize: $
          } = C;
          if ($ !== void 0) return $.value;
        }
        return "medium";
      },
      mergedDisabled(C) {
        const {
          disabled: w
        } = e;
        if (w !== void 0) return w;
        if (t) {
          if (t.disabledRef.value) return !0;
          const {
            maxRef: {
              value: $
            },
            checkedCountRef: k
          } = t;
          if ($ !== void 0 && k.value >= $ && !d.value)
            return !0;
          const {
            minRef: {
              value: O
            }
          } = t;
          if (O !== void 0 && k.value <= O && d.value)
            return !0;
        }
        return C ? C.disabled.value : !1;
      }
    }), {
      mergedDisabledRef: h,
      mergedSizeRef: p
    } = c, v = Pe("Checkbox", "-checkbox", h5, Hg, e, o);
    function u(C) {
      if (t && e.value !== void 0)
        t.toggleCheckbox(!d.value, e.value);
      else {
        const {
          onChange: w,
          "onUpdate:checked": $,
          onUpdateChecked: k
        } = e, {
          nTriggerFormInput: O,
          nTriggerFormChange: G
        } = c, _ = d.value ? e.uncheckedValue : e.checkedValue;
        $ && ce($, _, C), k && ce(k, _, C), w && ce(w, _, C), O(), G(), l.value = _;
      }
    }
    function g(C) {
      h.value || u(C);
    }
    function m(C) {
      if (!h.value)
        switch (C.key) {
          case " ":
          case "Enter":
            u(C);
        }
    }
    function f(C) {
      switch (C.key) {
        case " ":
          C.preventDefault();
      }
    }
    const b = {
      focus: () => {
        var C;
        (C = n.value) === null || C === void 0 || C.focus();
      },
      blur: () => {
        var C;
        (C = n.value) === null || C === void 0 || C.blur();
      }
    }, x = Lt("Checkbox", i, o), y = uh(() => {
      const {
        value: C
      } = p, {
        common: {
          cubicBezierEaseInOut: w
        },
        self: {
          borderRadius: $,
          color: k,
          colorChecked: O,
          colorDisabled: G,
          colorTableHeader: _,
          colorTableHeaderModal: V,
          colorTableHeaderPopover: I,
          checkMarkColor: M,
          checkMarkColorDisabled: X,
          border: H,
          borderFocus: Q,
          borderDisabled: oe,
          borderChecked: te,
          boxShadowFocus: Y,
          textColor: L,
          textColorDisabled: Z,
          checkMarkColorDisabledChecked: ee,
          colorDisabledChecked: ue,
          borderDisabledChecked: fe,
          labelPadding: ve,
          labelLineHeight: xe,
          labelFontWeight: J,
          [ne("fontSize", C)]: pe,
          [ne("size", C)]: j
        }
      } = v.value;
      return {
        "--n-label-line-height": xe,
        "--n-label-font-weight": J,
        "--n-size": j,
        "--n-bezier": w,
        "--n-border-radius": $,
        "--n-border": H,
        "--n-border-checked": te,
        "--n-border-focus": Q,
        "--n-border-disabled": oe,
        "--n-border-disabled-checked": fe,
        "--n-box-shadow-focus": Y,
        "--n-color": k,
        "--n-color-checked": O,
        "--n-color-table": _,
        "--n-color-table-modal": V,
        "--n-color-table-popover": I,
        "--n-color-disabled": G,
        "--n-color-disabled-checked": ue,
        "--n-text-color": L,
        "--n-text-color-disabled": Z,
        "--n-check-mark-color": M,
        "--n-check-mark-color-disabled": X,
        "--n-check-mark-color-disabled-checked": ee,
        "--n-font-size": pe,
        "--n-label-padding": ve
      };
    }), S = r ? mt("checkbox", uh(() => p.value[0]), y, e) : void 0;
    return Object.assign(c, b, {
      rtlEnabled: x,
      selfRef: n,
      mergedClsPrefix: o,
      mergedDisabled: h,
      renderedChecked: d,
      mergedTheme: v,
      labelId: ki(),
      handleClick: g,
      handleKeyUp: m,
      handleKeyDown: f,
      cssVars: r ? void 0 : y,
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
    const u = Le(t.default, (g) => s || g ? bo("span", {
      class: `${d}-checkbox__label`,
      id: a
    }, s || g) : null);
    return bo("div", {
      ref: "selfRef",
      class: [`${d}-checkbox`, this.themeClass, this.rtlEnabled && `${d}-checkbox--rtl`, n && `${d}-checkbox--checked`, o && `${d}-checkbox--disabled`, r && `${d}-checkbox--indeterminate`, i && `${d}-checkbox--inside-table`, u && `${d}-checkbox--show-label`],
      tabindex: o || !c ? void 0 : 0,
      role: "checkbox",
      "aria-checked": r ? "mixed" : n,
      "aria-labelledby": a,
      style: l,
      onKeyup: h,
      onKeydown: p,
      onClick: v,
      onMousedown: () => {
        Ke("selectstart", window, (g) => {
          g.preventDefault();
        }, {
          once: !0
        });
      }
    }, bo("div", {
      class: `${d}-checkbox-box-wrapper`
    }, " ", bo("div", {
      class: `${d}-checkbox-box`
    }, bo(zr, null, {
      default: () => this.indeterminate ? bo("div", {
        key: "indeterminate",
        class: `${d}-checkbox-icon`
      }, f5()) : bo("div", {
        key: "check",
        class: `${d}-checkbox-icon`
      }, u5())
    }), bo("div", {
      class: `${d}-checkbox-box__border`
    }))), u);
  }
});
function b5(e) {
  const {
    boxShadow2: t
  } = e;
  return {
    menuBoxShadow: t
  };
}
const Cc = {
  name: "Popselect",
  common: ut,
  peers: {
    Popover: Ar,
    InternalSelectMenu: bc
  },
  self: b5
}, Wg = "n-popselect", w5 = T("popselect-menu", `
 box-shadow: var(--n-menu-box-shadow);
`), hh = window.Vue.computed, y5 = window.Vue.defineComponent, x5 = window.Vue.h, C5 = window.Vue.inject, ph = window.Vue.nextTick, S5 = window.Vue.toRef, $5 = window.Vue.watch;
window.Vue.watchEffect;
const Sc = {
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
}, vh = To(Sc), k5 = y5({
  name: "PopselectPanel",
  props: Sc,
  setup(e) {
    const t = C5(Wg), {
      mergedClsPrefixRef: n,
      inlineThemeDisabled: o
    } = He(e), r = Pe("Popselect", "-pop-select", w5, Cc, t.props, n), i = hh(() => gl(e.options, Lg("value", "children")));
    function l(p, v) {
      const {
        onUpdateValue: u,
        "onUpdate:value": g,
        onChange: m
      } = e;
      u && ce(u, p, v), g && ce(g, p, v), m && ce(m, p, v);
    }
    function a(p) {
      d(p.key);
    }
    function s(p) {
      !mn(p, "action") && !mn(p, "empty") && !mn(p, "header") && p.preventDefault();
    }
    function d(p) {
      const {
        value: {
          getNode: v
        }
      } = i;
      if (e.multiple)
        if (Array.isArray(e.value)) {
          const u = [], g = [];
          let m = !0;
          e.value.forEach((f) => {
            if (f === p) {
              m = !1;
              return;
            }
            const b = v(f);
            b && (u.push(b.key), g.push(b.rawNode));
          }), m && (u.push(p), g.push(v(p).rawNode)), l(u, g);
        } else {
          const u = v(p);
          u && l([p], [u.rawNode]);
        }
      else if (e.value === p && e.cancelable)
        l(null, null);
      else {
        const u = v(p);
        u && l(p, u.rawNode);
        const {
          "onUpdate:show": g,
          onUpdateShow: m
        } = t.props;
        g && ce(g, !1), m && ce(m, !1), t.setShow(!1);
      }
      ph(() => {
        t.syncPosition();
      });
    }
    $5(S5(e, "options"), () => {
      ph(() => {
        t.syncPosition();
      });
    });
    const c = hh(() => {
      const {
        self: {
          menuBoxShadow: p
        }
      } = r.value;
      return {
        "--n-menu-box-shadow": p
      };
    }), h = o ? mt("select", void 0, c, t.props) : void 0;
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
    return (e = this.onRender) === null || e === void 0 || e.call(this), x5(Eg, {
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
}), R5 = window.Vue.defineComponent, gh = window.Vue.h, P5 = window.Vue.provide, T5 = window.Vue.ref, _5 = Object.assign(Object.assign(Object.assign(Object.assign({}, Pe.props), rc(Tr, ["showArrow", "arrow"])), {
  placement: Object.assign(Object.assign({}, Tr.placement), {
    default: "bottom"
  }),
  trigger: {
    type: String,
    default: "hover"
  }
}), Sc), F5 = R5({
  name: "Popselect",
  props: _5,
  slots: Object,
  inheritAttrs: !1,
  __popover__: !0,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = He(e), n = Pe("Popselect", "-popselect", void 0, Cc, e, t), o = T5(null);
    function r() {
      var a;
      (a = o.value) === null || a === void 0 || a.syncPosition();
    }
    function i(a) {
      var s;
      (s = o.value) === null || s === void 0 || s.setShow(a);
    }
    return P5(Wg, {
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
        return gh(k5, Object.assign({}, a, {
          class: [a.class, n],
          style: [a.style, ...r]
        }, Po(this.$props, vh), {
          ref: Lv(o),
          onMouseenter: vi([i, a.onMouseenter]),
          onMouseleave: vi([l, a.onMouseleave])
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
    return gh(Ii, Object.assign({}, rc(this.$props, vh), t, {
      internalDeactivateImmediately: !0
    }), {
      trigger: () => {
        var n, o;
        return (o = (n = this.$slots).default) === null || o === void 0 ? void 0 : o.call(n);
      }
    });
  }
});
function E5(e) {
  const {
    boxShadow2: t
  } = e;
  return {
    menuBoxShadow: t
  };
}
const Ug = {
  name: "Select",
  common: ut,
  peers: {
    InternalSelection: Vg,
    InternalSelectMenu: bc
  },
  self: E5
}, z5 = D([T("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `), T("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [Vi({
  originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
})])]), On = window.Vue.computed, O5 = window.Vue.defineComponent, Ao = window.Vue.h, xn = window.Vue.ref, vs = window.Vue.toRef, M5 = window.Vue.Transition, V5 = window.Vue.vShow, I5 = window.Vue.watch;
window.Vue.watchEffect;
const A5 = window.Vue.withDirectives, B5 = Object.assign(Object.assign({}, Pe.props), {
  to: Un.propTo,
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
}), yr = O5({
  name: "Select",
  props: B5,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBorderedRef: n,
      namespaceRef: o,
      inlineThemeDisabled: r
    } = He(e), i = Pe("Select", "-select", z5, Ug, e, t), l = xn(e.defaultValue), a = vs(e, "value"), s = Bt(a, l), d = xn(!1), c = xn(""), h = Ka(e, ["items", "options"]), p = xn([]), v = xn([]), u = On(() => v.value.concat(p.value).concat(h.value)), g = On(() => {
      const {
        filter: F
      } = e;
      if (F) return F;
      const {
        labelField: q,
        valueField: ae
      } = e;
      return (ge, be) => {
        if (!be) return !1;
        const Ce = be[q];
        if (typeof Ce == "string")
          return fs(ge, Ce);
        const Se = be[ae];
        return typeof Se == "string" ? fs(ge, Se) : typeof Se == "number" ? fs(ge, String(Se)) : !1;
      };
    }), m = On(() => {
      if (e.remote)
        return h.value;
      {
        const {
          value: F
        } = u, {
          value: q
        } = c;
        return !q.length || !e.filterable ? F : HT(F, g.value, q, e.childrenField);
      }
    }), f = On(() => {
      const {
        valueField: F,
        childrenField: q
      } = e, ae = Lg(F, q);
      return gl(m.value, ae);
    }), b = On(() => jT(u.value, e.valueField, e.childrenField)), x = xn(!1), y = Bt(vs(e, "show"), x), S = xn(null), C = xn(null), w = xn(null), {
      localeRef: $
    } = Er("Select"), k = On(() => {
      var F;
      return (F = e.placeholder) !== null && F !== void 0 ? F : $.value.placeholder;
    }), O = [], G = xn(/* @__PURE__ */ new Map()), _ = On(() => {
      const {
        fallbackOption: F
      } = e;
      if (F === void 0) {
        const {
          labelField: q,
          valueField: ae
        } = e;
        return (ge) => ({
          [q]: String(ge),
          [ae]: ge
        });
      }
      return F === !1 ? !1 : (q) => Object.assign(F(q), {
        value: q
      });
    });
    function V(F) {
      const q = e.remote, {
        value: ae
      } = G, {
        value: ge
      } = b, {
        value: be
      } = _, Ce = [];
      return F.forEach((Se) => {
        if (ge.has(Se))
          Ce.push(ge.get(Se));
        else if (q && ae.has(Se))
          Ce.push(ae.get(Se));
        else if (be) {
          const Te = be(Se);
          Te && Ce.push(Te);
        }
      }), Ce;
    }
    const I = On(() => {
      if (e.multiple) {
        const {
          value: F
        } = s;
        return Array.isArray(F) ? V(F) : [];
      }
      return null;
    }), M = On(() => {
      const {
        value: F
      } = s;
      return !e.multiple && !Array.isArray(F) ? F === null ? null : V([F])[0] || null : null;
    }), X = so(e), {
      mergedSizeRef: H,
      mergedDisabledRef: Q,
      mergedStatusRef: oe
    } = X;
    function te(F, q) {
      const {
        onChange: ae,
        "onUpdate:value": ge,
        onUpdateValue: be
      } = e, {
        nTriggerFormChange: Ce,
        nTriggerFormInput: Se
      } = X;
      ae && ce(ae, F, q), be && ce(be, F, q), ge && ce(ge, F, q), l.value = F, Ce(), Se();
    }
    function Y(F) {
      const {
        onBlur: q
      } = e, {
        nTriggerFormBlur: ae
      } = X;
      q && ce(q, F), ae();
    }
    function L() {
      const {
        onClear: F
      } = e;
      F && ce(F);
    }
    function Z(F) {
      const {
        onFocus: q,
        showOnFocus: ae
      } = e, {
        nTriggerFormFocus: ge
      } = X;
      q && ce(q, F), ge(), ae && xe();
    }
    function ee(F) {
      const {
        onSearch: q
      } = e;
      q && ce(q, F);
    }
    function ue(F) {
      const {
        onScroll: q
      } = e;
      q && ce(q, F);
    }
    function fe() {
      var F;
      const {
        remote: q,
        multiple: ae
      } = e;
      if (q) {
        const {
          value: ge
        } = G;
        if (ae) {
          const {
            valueField: be
          } = e;
          (F = I.value) === null || F === void 0 || F.forEach((Ce) => {
            ge.set(Ce[be], Ce);
          });
        } else {
          const be = M.value;
          be && ge.set(be[e.valueField], be);
        }
      }
    }
    function ve(F) {
      const {
        onUpdateShow: q,
        "onUpdate:show": ae
      } = e;
      q && ce(q, F), ae && ce(ae, F), x.value = F;
    }
    function xe() {
      Q.value || (ve(!0), x.value = !0, e.filterable && Ye());
    }
    function J() {
      ve(!1);
    }
    function pe() {
      c.value = "", v.value = O;
    }
    const j = xn(!1);
    function W() {
      e.filterable && (j.value = !0);
    }
    function ie() {
      e.filterable && (j.value = !1, y.value || pe());
    }
    function ye() {
      Q.value || (y.value ? e.filterable ? Ye() : J() : xe());
    }
    function Me(F) {
      var q, ae;
      !((ae = (q = w.value) === null || q === void 0 ? void 0 : q.selfRef) === null || ae === void 0) && ae.contains(F.relatedTarget) || (d.value = !1, Y(F), J());
    }
    function ze(F) {
      Z(F), d.value = !0;
    }
    function se() {
      d.value = !0;
    }
    function P(F) {
      var q;
      !((q = S.value) === null || q === void 0) && q.$el.contains(F.relatedTarget) || (d.value = !1, Y(F), J());
    }
    function R() {
      var F;
      (F = S.value) === null || F === void 0 || F.focus(), J();
    }
    function E(F) {
      var q;
      y.value && (!((q = S.value) === null || q === void 0) && q.$el.contains(Rr(F)) || J());
    }
    function N(F) {
      if (!Array.isArray(F)) return [];
      if (_.value)
        return Array.from(F);
      {
        const {
          remote: q
        } = e, {
          value: ae
        } = b;
        if (q) {
          const {
            value: ge
          } = G;
          return F.filter((be) => ae.has(be) || ge.has(be));
        } else
          return F.filter((ge) => ae.has(ge));
      }
    }
    function re(F) {
      de(F.rawNode);
    }
    function de(F) {
      if (Q.value) return;
      const {
        tag: q,
        remote: ae,
        clearFilterAfterSelect: ge,
        valueField: be
      } = e;
      if (q && !ae) {
        const {
          value: Ce
        } = v, Se = Ce[0] || null;
        if (Se) {
          const Te = p.value;
          Te.length ? Te.push(Se) : p.value = [Se], v.value = O;
        }
      }
      if (ae && G.value.set(F[be], F), e.multiple) {
        const Ce = N(s.value), Se = Ce.findIndex((Te) => Te === F[be]);
        if (~Se) {
          if (Ce.splice(Se, 1), q && !ae) {
            const Te = z(F[be]);
            ~Te && (p.value.splice(Te, 1), ge && (c.value = ""));
          }
        } else
          Ce.push(F[be]), ge && (c.value = "");
        te(Ce, V(Ce));
      } else {
        if (q && !ae) {
          const Ce = z(F[be]);
          ~Ce ? p.value = [p.value[Ce]] : p.value = O;
        }
        Xe(), J(), te(F[be], F);
      }
    }
    function z(F) {
      return p.value.findIndex((ae) => ae[e.valueField] === F);
    }
    function K(F) {
      y.value || xe();
      const {
        value: q
      } = F.target;
      c.value = q;
      const {
        tag: ae,
        remote: ge
      } = e;
      if (ee(q), ae && !ge) {
        if (!q) {
          v.value = O;
          return;
        }
        const {
          onCreate: be
        } = e, Ce = be ? be(q) : {
          [e.labelField]: q,
          [e.valueField]: q
        }, {
          valueField: Se,
          labelField: Te
        } = e;
        h.value.some((Be) => Be[Se] === Ce[Se] || Be[Te] === Ce[Te]) || p.value.some((Be) => Be[Se] === Ce[Se] || Be[Te] === Ce[Te]) ? v.value = O : v.value = [Ce];
      }
    }
    function me(F) {
      F.stopPropagation();
      const {
        multiple: q
      } = e;
      !q && e.filterable && J(), L(), q ? te([], []) : te(null, null);
    }
    function _e(F) {
      !mn(F, "action") && !mn(F, "empty") && !mn(F, "header") && F.preventDefault();
    }
    function Ge(F) {
      ue(F);
    }
    function vt(F) {
      var q, ae, ge, be, Ce;
      if (!e.keyboard) {
        F.preventDefault();
        return;
      }
      switch (F.key) {
        case " ":
          if (e.filterable)
            break;
          F.preventDefault();
        case "Enter":
          if (!(!((q = S.value) === null || q === void 0) && q.isComposing)) {
            if (y.value) {
              const Se = (ae = w.value) === null || ae === void 0 ? void 0 : ae.getPendingTmNode();
              Se ? re(Se) : e.filterable || (J(), Xe());
            } else if (xe(), e.tag && j.value) {
              const Se = v.value[0];
              if (Se) {
                const Te = Se[e.valueField], {
                  value: Be
                } = s;
                e.multiple && Array.isArray(Be) && Be.includes(Te) || de(Se);
              }
            }
          }
          F.preventDefault();
          break;
        case "ArrowUp":
          if (F.preventDefault(), e.loading) return;
          y.value && ((ge = w.value) === null || ge === void 0 || ge.prev());
          break;
        case "ArrowDown":
          if (F.preventDefault(), e.loading) return;
          y.value ? (be = w.value) === null || be === void 0 || be.next() : xe();
          break;
        case "Escape":
          y.value && (F1(F), J()), (Ce = S.value) === null || Ce === void 0 || Ce.focus();
          break;
      }
    }
    function Xe() {
      var F;
      (F = S.value) === null || F === void 0 || F.focus();
    }
    function Ye() {
      var F;
      (F = S.value) === null || F === void 0 || F.focusInput();
    }
    function bt() {
      var F;
      y.value && ((F = C.value) === null || F === void 0 || F.syncPosition());
    }
    fe(), I5(vs(e, "options"), fe);
    const tt = {
      focus: () => {
        var F;
        (F = S.value) === null || F === void 0 || F.focus();
      },
      focusInput: () => {
        var F;
        (F = S.value) === null || F === void 0 || F.focusInput();
      },
      blur: () => {
        var F;
        (F = S.value) === null || F === void 0 || F.blur();
      },
      blurInput: () => {
        var F;
        (F = S.value) === null || F === void 0 || F.blurInput();
      }
    }, we = On(() => {
      const {
        self: {
          menuBoxShadow: F
        }
      } = i.value;
      return {
        "--n-menu-box-shadow": F
      };
    }), Fe = r ? mt("select", void 0, we, e) : void 0;
    return Object.assign(Object.assign({}, tt), {
      mergedStatus: oe,
      mergedClsPrefix: t,
      mergedBordered: n,
      namespace: o,
      treeMate: f,
      isMounted: zi(),
      triggerRef: S,
      menuRef: w,
      pattern: c,
      uncontrolledShow: x,
      mergedShow: y,
      adjustedTo: Un(e),
      uncontrolledValue: l,
      mergedValue: s,
      followerRef: C,
      localizedPlaceholder: k,
      selectedOption: M,
      selectedOptions: I,
      mergedSize: H,
      mergedDisabled: Q,
      focused: d,
      activeWithoutMenuOpen: j,
      inlineThemeDisabled: r,
      onTriggerInputFocus: W,
      onTriggerInputBlur: ie,
      handleTriggerOrMenuResize: bt,
      handleMenuFocus: se,
      handleMenuBlur: P,
      handleMenuTabOut: R,
      handleTriggerClick: ye,
      handleToggle: re,
      handleDeleteOption: de,
      handlePatternInput: K,
      handleClear: me,
      handleTriggerBlur: Me,
      handleTriggerFocus: ze,
      handleKeydown: vt,
      handleMenuAfterLeave: pe,
      handleMenuClickOutside: E,
      handleMenuScroll: Ge,
      handleMenuKeydown: vt,
      handleMenuMousedown: _e,
      mergedTheme: i,
      cssVars: r ? void 0 : we,
      themeClass: Fe == null ? void 0 : Fe.themeClass,
      onRender: Fe == null ? void 0 : Fe.onRender
    });
  },
  render() {
    return Ao("div", {
      class: `${this.mergedClsPrefix}-select`
    }, Ao(Zd, null, {
      default: () => [Ao(Jd, null, {
        default: () => Ao(pT, {
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
      }), Ao(ec, {
        ref: "followerRef",
        show: this.mergedShow,
        to: this.adjustedTo,
        teleportDisabled: this.adjustedTo === Un.tdkey,
        containerClass: this.namespace,
        width: this.consistentMenuWidth ? "target" : void 0,
        minWidth: "target",
        placement: this.placement
      }, {
        default: () => Ao(M5, {
          name: "fade-in-scale-up-transition",
          appear: this.isMounted,
          onAfterLeave: this.handleMenuAfterLeave
        }, {
          default: () => {
            var e, t, n;
            return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), A5(Ao(Eg, Object.assign({}, this.menuProps, {
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
            }), this.displayDirective === "show" ? [[V5, this.mergedShow], [Ri, this.handleMenuClickOutside, void 0, {
              capture: !0
            }]] : [[Ri, this.handleMenuClickOutside, void 0, {
              capture: !0
            }]])) : null;
          }
        })
      })]
    }));
  }
}), L5 = {
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
function N5(e) {
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
    heightMedium: u
  } = e;
  return Object.assign(Object.assign({}, L5), {
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
    itemSizeLarge: u,
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
const Kg = {
  name: "Pagination",
  common: ut,
  peers: {
    Select: Ug,
    Input: wc,
    Popselect: Cc
  },
  self: N5
}, mh = `
 background: var(--n-item-color-hover);
 color: var(--n-item-text-color-hover);
 border: var(--n-item-border-hover);
`, bh = [B("button", `
 background: var(--n-button-color-hover);
 border: var(--n-button-border-hover);
 color: var(--n-button-icon-color-hover);
 `)], D5 = T("pagination", `
 display: flex;
 vertical-align: middle;
 font-size: var(--n-item-font-size);
 flex-wrap: nowrap;
`, [T("pagination-prefix", `
 display: flex;
 align-items: center;
 margin: var(--n-prefix-margin);
 `), T("pagination-suffix", `
 display: flex;
 align-items: center;
 margin: var(--n-suffix-margin);
 `), D("> *:not(:first-child)", `
 margin: var(--n-item-margin);
 `), T("select", `
 width: var(--n-select-width);
 `), D("&.transition-disabled", [T("pagination-item", "transition: none!important;")]), T("pagination-quick-jumper", `
 white-space: nowrap;
 display: flex;
 color: var(--n-jumper-text-color);
 transition: color .3s var(--n-bezier);
 align-items: center;
 font-size: var(--n-jumper-font-size);
 `, [T("input", `
 margin: var(--n-input-margin);
 width: var(--n-input-width);
 `)]), T("pagination-item", `
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
 `, [B("button", `
 background: var(--n-button-color);
 color: var(--n-button-icon-color);
 border: var(--n-button-border);
 padding: 0;
 `, [T("base-icon", `
 font-size: var(--n-button-icon-size);
 `)]), rt("disabled", [B("hover", mh, bh), D("&:hover", mh, bh), D("&:active", `
 background: var(--n-item-color-pressed);
 color: var(--n-item-text-color-pressed);
 border: var(--n-item-border-pressed);
 `, [B("button", `
 background: var(--n-button-color-pressed);
 border: var(--n-button-border-pressed);
 color: var(--n-button-icon-color-pressed);
 `)]), B("active", `
 background: var(--n-item-color-active);
 color: var(--n-item-text-color-active);
 border: var(--n-item-border-active);
 `, [D("&:hover", `
 background: var(--n-item-color-active-hover);
 `)])]), B("disabled", `
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `, [B("active, button", `
 background-color: var(--n-item-color-disabled);
 border: var(--n-item-border-disabled);
 `)])]), B("disabled", `
 cursor: not-allowed;
 `, [T("pagination-quick-jumper", `
 color: var(--n-jumper-text-color-disabled);
 `)]), B("simple", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `, [T("pagination-quick-jumper", [T("input", `
 margin: 0;
 `)])])]);
function qg(e) {
  var t;
  if (!e) return 10;
  const {
    defaultPageSize: n
  } = e;
  if (n !== void 0) return n;
  const o = (t = e.pageSizes) === null || t === void 0 ? void 0 : t[0];
  return typeof o == "number" ? o : (o == null ? void 0 : o.value) || 10;
}
function H5(e, t, n, o) {
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
  let v = !1, u = !1;
  c > s + 2 && (v = !0), h < d - 2 && (u = !0);
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
    options: o ? wh(s + 1, c - 1) : null
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
  return u ? (i = !0, a = h + 1, g.push({
    type: "fast-forward",
    active: !1,
    label: void 0,
    options: o ? wh(h + 1, d - 1) : null
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
function wh(e, t) {
  const n = [];
  for (let o = e; o <= t; ++o)
    n.push({
      label: `${o}`,
      value: o
    });
  return n;
}
const Cn = window.Vue.computed, j5 = window.Vue.defineComponent, yh = window.Vue.Fragment, nt = window.Vue.h, W5 = window.Vue.nextTick, wo = window.Vue.ref, xh = window.Vue.toRef, gs = window.Vue.watchEffect, U5 = Object.assign(Object.assign({}, Pe.props), {
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
  to: Un.propTo,
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
}), K5 = j5({
  name: "Pagination",
  props: U5,
  slots: Object,
  setup(e) {
    const {
      mergedComponentPropsRef: t,
      mergedClsPrefixRef: n,
      inlineThemeDisabled: o,
      mergedRtlRef: r
    } = He(e), i = Pe("Pagination", "-pagination", D5, Kg, e, n), {
      localeRef: l
    } = Er("Pagination"), a = wo(null), s = wo(e.defaultPage), d = wo(qg(e)), c = Bt(xh(e, "page"), s), h = Bt(xh(e, "pageSize"), d), p = Cn(() => {
      const {
        itemCount: J
      } = e;
      if (J !== void 0)
        return Math.max(1, Math.ceil(J / h.value));
      const {
        pageCount: pe
      } = e;
      return pe !== void 0 ? Math.max(pe, 1) : 1;
    }), v = wo("");
    gs(() => {
      e.simple, v.value = String(c.value);
    });
    const u = wo(!1), g = wo(!1), m = wo(!1), f = wo(!1), b = () => {
      e.disabled || (u.value = !0, M());
    }, x = () => {
      e.disabled || (u.value = !1, M());
    }, y = () => {
      g.value = !0, M();
    }, S = () => {
      g.value = !1, M();
    }, C = (J) => {
      X(J);
    }, w = Cn(() => H5(c.value, p.value, e.pageSlot, e.showQuickJumpDropdown));
    gs(() => {
      w.value.hasFastBackward ? w.value.hasFastForward || (u.value = !1, m.value = !1) : (g.value = !1, f.value = !1);
    });
    const $ = Cn(() => {
      const J = l.value.selectionSuffix;
      return e.pageSizes.map((pe) => typeof pe == "number" ? {
        label: `${pe} / ${J}`,
        value: pe
      } : pe);
    }), k = Cn(() => {
      var J, pe;
      return ((pe = (J = t == null ? void 0 : t.value) === null || J === void 0 ? void 0 : J.Pagination) === null || pe === void 0 ? void 0 : pe.inputSize) || Ju(e.size);
    }), O = Cn(() => {
      var J, pe;
      return ((pe = (J = t == null ? void 0 : t.value) === null || J === void 0 ? void 0 : J.Pagination) === null || pe === void 0 ? void 0 : pe.selectSize) || Ju(e.size);
    }), G = Cn(() => (c.value - 1) * h.value), _ = Cn(() => {
      const J = c.value * h.value - 1, {
        itemCount: pe
      } = e;
      return pe !== void 0 && J > pe - 1 ? pe - 1 : J;
    }), V = Cn(() => {
      const {
        itemCount: J
      } = e;
      return J !== void 0 ? J : (e.pageCount || 1) * h.value;
    }), I = Lt("Pagination", r, n);
    function M() {
      W5(() => {
        var J;
        const {
          value: pe
        } = a;
        pe && (pe.classList.add("transition-disabled"), (J = a.value) === null || J === void 0 || J.offsetWidth, pe.classList.remove("transition-disabled"));
      });
    }
    function X(J) {
      if (J === c.value) return;
      const {
        "onUpdate:page": pe,
        onUpdatePage: j,
        onChange: W,
        simple: ie
      } = e;
      pe && ce(pe, J), j && ce(j, J), W && ce(W, J), s.value = J, ie && (v.value = String(J));
    }
    function H(J) {
      if (J === h.value) return;
      const {
        "onUpdate:pageSize": pe,
        onUpdatePageSize: j,
        onPageSizeChange: W
      } = e;
      pe && ce(pe, J), j && ce(j, J), W && ce(W, J), d.value = J, p.value < c.value && X(p.value);
    }
    function Q() {
      if (e.disabled) return;
      const J = Math.min(c.value + 1, p.value);
      X(J);
    }
    function oe() {
      if (e.disabled) return;
      const J = Math.max(c.value - 1, 1);
      X(J);
    }
    function te() {
      if (e.disabled) return;
      const J = Math.min(w.value.fastForwardTo, p.value);
      X(J);
    }
    function Y() {
      if (e.disabled) return;
      const J = Math.max(w.value.fastBackwardTo, 1);
      X(J);
    }
    function L(J) {
      H(J);
    }
    function Z() {
      const J = Number.parseInt(v.value);
      Number.isNaN(J) || (X(Math.max(1, Math.min(J, p.value))), e.simple || (v.value = ""));
    }
    function ee() {
      Z();
    }
    function ue(J) {
      if (!e.disabled)
        switch (J.type) {
          case "page":
            X(J.label);
            break;
          case "fast-backward":
            Y();
            break;
          case "fast-forward":
            te();
            break;
        }
    }
    function fe(J) {
      v.value = J.replace(/\D+/g, "");
    }
    gs(() => {
      c.value, h.value, M();
    });
    const ve = Cn(() => {
      const {
        size: J
      } = e, {
        self: {
          buttonBorder: pe,
          buttonBorderHover: j,
          buttonBorderPressed: W,
          buttonIconColor: ie,
          buttonIconColorHover: ye,
          buttonIconColorPressed: Me,
          itemTextColor: ze,
          itemTextColorHover: se,
          itemTextColorPressed: P,
          itemTextColorActive: R,
          itemTextColorDisabled: E,
          itemColor: N,
          itemColorHover: re,
          itemColorPressed: de,
          itemColorActive: z,
          itemColorActiveHover: K,
          itemColorDisabled: me,
          itemBorder: _e,
          itemBorderHover: Ge,
          itemBorderPressed: vt,
          itemBorderActive: Xe,
          itemBorderDisabled: Ye,
          itemBorderRadius: bt,
          jumperTextColor: tt,
          jumperTextColorDisabled: we,
          buttonColor: Fe,
          buttonColorHover: F,
          buttonColorPressed: q,
          [ne("itemPadding", J)]: ae,
          [ne("itemMargin", J)]: ge,
          [ne("inputWidth", J)]: be,
          [ne("selectWidth", J)]: Ce,
          [ne("inputMargin", J)]: Se,
          [ne("selectMargin", J)]: Te,
          [ne("jumperFontSize", J)]: Be,
          [ne("prefixMargin", J)]: it,
          [ne("suffixMargin", J)]: je,
          [ne("itemSize", J)]: _t,
          [ne("buttonIconSize", J)]: Mt,
          [ne("itemFontSize", J)]: Vt,
          [`${ne("itemMargin", J)}Rtl`]: Nt,
          [`${ne("inputMargin", J)}Rtl`]: Dt
        },
        common: {
          cubicBezierEaseInOut: Zt
        }
      } = i.value;
      return {
        "--n-prefix-margin": it,
        "--n-suffix-margin": je,
        "--n-item-font-size": Vt,
        "--n-select-width": Ce,
        "--n-select-margin": Te,
        "--n-input-width": be,
        "--n-input-margin": Se,
        "--n-input-margin-rtl": Dt,
        "--n-item-size": _t,
        "--n-item-text-color": ze,
        "--n-item-text-color-disabled": E,
        "--n-item-text-color-hover": se,
        "--n-item-text-color-active": R,
        "--n-item-text-color-pressed": P,
        "--n-item-color": N,
        "--n-item-color-hover": re,
        "--n-item-color-disabled": me,
        "--n-item-color-active": z,
        "--n-item-color-active-hover": K,
        "--n-item-color-pressed": de,
        "--n-item-border": _e,
        "--n-item-border-hover": Ge,
        "--n-item-border-disabled": Ye,
        "--n-item-border-active": Xe,
        "--n-item-border-pressed": vt,
        "--n-item-padding": ae,
        "--n-item-border-radius": bt,
        "--n-bezier": Zt,
        "--n-jumper-font-size": Be,
        "--n-jumper-text-color": tt,
        "--n-jumper-text-color-disabled": we,
        "--n-item-margin": ge,
        "--n-item-margin-rtl": Nt,
        "--n-button-icon-size": Mt,
        "--n-button-icon-color": ie,
        "--n-button-icon-color-hover": ye,
        "--n-button-icon-color-pressed": Me,
        "--n-button-color-hover": F,
        "--n-button-color": Fe,
        "--n-button-color-pressed": q,
        "--n-button-border": pe,
        "--n-button-border-hover": j,
        "--n-button-border-pressed": W
      };
    }), xe = o ? mt("pagination", Cn(() => {
      let J = "";
      const {
        size: pe
      } = e;
      return J += pe[0], J;
    }), ve, e) : void 0;
    return {
      rtlEnabled: I,
      mergedClsPrefix: n,
      locale: l,
      selfRef: a,
      mergedPage: c,
      pageItems: Cn(() => w.value.items),
      mergedItemCount: V,
      jumperValue: v,
      pageSizeOptions: $,
      mergedPageSize: h,
      inputSize: k,
      selectSize: O,
      mergedTheme: i,
      mergedPageCount: p,
      startIndex: G,
      endIndex: _,
      showFastForwardMenu: m,
      showFastBackwardMenu: f,
      fastForwardActive: u,
      fastBackwardActive: g,
      handleMenuSelect: C,
      handleFastForwardMouseenter: b,
      handleFastForwardMouseleave: x,
      handleFastBackwardMouseenter: y,
      handleFastBackwardMouseleave: S,
      handleJumperInput: fe,
      handleBackwardClick: oe,
      handleForwardClick: Q,
      handlePageItemClick: ue,
      handleSizePickerChange: L,
      handleQuickJumperChange: ee,
      cssVars: o ? void 0 : ve,
      themeClass: xe == null ? void 0 : xe.themeClass,
      onRender: xe == null ? void 0 : xe.onRender
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
      pageSizeOptions: u,
      jumperValue: g,
      simple: m,
      prev: f,
      next: b,
      prefix: x,
      suffix: y,
      label: S,
      goto: C,
      handleJumperInput: w,
      handleSizePickerChange: $,
      handleBackwardClick: k,
      handlePageItemClick: O,
      handleForwardClick: G,
      handleQuickJumperChange: _,
      onRender: V
    } = this;
    V == null || V();
    const I = x || e.prefix, M = y || e.suffix, X = f || e.prev, H = b || e.next, Q = S || e.label;
    return nt("div", {
      ref: "selfRef",
      class: [`${t}-pagination`, this.themeClass, this.rtlEnabled && `${t}-pagination--rtl`, n && `${t}-pagination--disabled`, m && `${t}-pagination--simple`],
      style: o
    }, I ? nt("div", {
      class: `${t}-pagination-prefix`
    }, I({
      page: r,
      pageSize: v,
      pageCount: i,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      itemCount: this.mergedItemCount
    })) : null, this.displayOrder.map((oe) => {
      switch (oe) {
        case "pages":
          return nt(yh, null, nt("div", {
            class: [`${t}-pagination-item`, !X && `${t}-pagination-item--button`, (r <= 1 || r > i || n) && `${t}-pagination-item--disabled`],
            onClick: k
          }, X ? X({
            page: r,
            pageSize: v,
            pageCount: i,
            startIndex: this.startIndex,
            endIndex: this.endIndex,
            itemCount: this.mergedItemCount
          }) : nt(Ct, {
            clsPrefix: t
          }, {
            default: () => this.rtlEnabled ? nt(Bf, null) : nt(zf, null)
          })), m ? nt(yh, null, nt("div", {
            class: `${t}-pagination-quick-jumper`
          }, nt(xt, {
            value: g,
            onUpdateValue: w,
            size: h,
            placeholder: "",
            disabled: n,
            theme: d.peers.Input,
            themeOverrides: d.peerOverrides.Input,
            onChange: _
          })), " /", " ", i) : l.map((te, Y) => {
            let L, Z, ee;
            const {
              type: ue
            } = te;
            switch (ue) {
              case "page":
                const ve = te.label;
                Q ? L = Q({
                  type: "page",
                  node: ve,
                  active: te.active
                }) : L = ve;
                break;
              case "fast-forward":
                const xe = this.fastForwardActive ? nt(Ct, {
                  clsPrefix: t
                }, {
                  default: () => this.rtlEnabled ? nt(Vf, null) : nt(If, null)
                }) : nt(Ct, {
                  clsPrefix: t
                }, {
                  default: () => nt(Lf, null)
                });
                Q ? L = Q({
                  type: "fast-forward",
                  node: xe,
                  active: this.fastForwardActive || this.showFastForwardMenu
                }) : L = xe, Z = this.handleFastForwardMouseenter, ee = this.handleFastForwardMouseleave;
                break;
              case "fast-backward":
                const J = this.fastBackwardActive ? nt(Ct, {
                  clsPrefix: t
                }, {
                  default: () => this.rtlEnabled ? nt(If, null) : nt(Vf, null)
                }) : nt(Ct, {
                  clsPrefix: t
                }, {
                  default: () => nt(Lf, null)
                });
                Q ? L = Q({
                  type: "fast-backward",
                  node: J,
                  active: this.fastBackwardActive || this.showFastBackwardMenu
                }) : L = J, Z = this.handleFastBackwardMouseenter, ee = this.handleFastBackwardMouseleave;
                break;
            }
            const fe = nt("div", {
              key: Y,
              class: [`${t}-pagination-item`, te.active && `${t}-pagination-item--active`, ue !== "page" && (ue === "fast-backward" && this.showFastBackwardMenu || ue === "fast-forward" && this.showFastForwardMenu) && `${t}-pagination-item--hover`, n && `${t}-pagination-item--disabled`, ue === "page" && `${t}-pagination-item--clickable`],
              onClick: () => {
                O(te);
              },
              onMouseenter: Z,
              onMouseleave: ee
            }, L);
            if (ue === "page" && !te.mayBeFastBackward && !te.mayBeFastForward)
              return fe;
            {
              const ve = te.type === "page" ? te.mayBeFastBackward ? "fast-backward" : "fast-forward" : te.type;
              return te.type !== "page" && !te.options ? fe : nt(F5, {
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
                show: ue === "page" ? !1 : ue === "fast-backward" ? this.showFastBackwardMenu : this.showFastForwardMenu,
                onUpdateShow: (xe) => {
                  ue !== "page" && (xe ? ue === "fast-backward" ? this.showFastBackwardMenu = xe : this.showFastForwardMenu = xe : (this.showFastBackwardMenu = !1, this.showFastForwardMenu = !1));
                },
                options: te.type !== "page" && te.options ? te.options : [],
                onUpdateValue: this.handleMenuSelect,
                scrollable: !0,
                showCheckmark: !1
              }, {
                default: () => fe
              });
            }
          }), nt("div", {
            class: [`${t}-pagination-item`, !H && `${t}-pagination-item--button`, {
              [`${t}-pagination-item--disabled`]: r < 1 || r >= i || n
            }],
            onClick: G
          }, H ? H({
            page: r,
            pageSize: v,
            pageCount: i,
            itemCount: this.mergedItemCount,
            startIndex: this.startIndex,
            endIndex: this.endIndex
          }) : nt(Ct, {
            clsPrefix: t
          }, {
            default: () => this.rtlEnabled ? nt(zf, null) : nt(Bf, null)
          })));
        case "size-picker":
          return !m && a ? nt(yr, Object.assign({
            consistentMenuWidth: !1,
            placeholder: "",
            showCheckmark: !1,
            to: this.to
          }, this.selectProps, {
            size: p,
            options: u,
            value: v,
            disabled: n,
            theme: d.peers.Select,
            themeOverrides: d.peerOverrides.Select,
            onUpdateValue: $
          })) : null;
        case "quick-jumper":
          return !m && s ? nt("div", {
            class: `${t}-pagination-quick-jumper`
          }, C ? C() : dn(this.$slots.goto, () => [c.goto]), nt(xt, {
            value: g,
            onUpdateValue: w,
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
}), q5 = {
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
function G5(e) {
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
    heightLarge: u,
    heightHuge: g,
    textColor3: m,
    opacityDisabled: f
  } = e;
  return Object.assign(Object.assign({}, q5), {
    optionHeightSmall: p,
    optionHeightMedium: v,
    optionHeightLarge: u,
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
    optionOpacityDisabled: f
  });
}
const Gg = {
  name: "Dropdown",
  common: ut,
  peers: {
    Popover: Ar
  },
  self: G5
}, X5 = {
  padding: "8px 14px"
};
function Y5(e) {
  const {
    borderRadius: t,
    boxShadow2: n,
    baseColor: o
  } = e;
  return Object.assign(Object.assign({}, X5), {
    borderRadius: t,
    boxShadow: n,
    color: Je(o, "rgba(0, 0, 0, .85)"),
    textColor: o
  });
}
const Xg = {
  name: "Tooltip",
  common: ut,
  peers: {
    Popover: Ar
  },
  self: Y5
}, Yg = {
  name: "Ellipsis",
  common: ut,
  peers: {
    Tooltip: Xg
  }
}, Z5 = {
  radioSizeSmall: "14px",
  radioSizeMedium: "16px",
  radioSizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function J5(e) {
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
    heightLarge: u,
    lineHeight: g
  } = e;
  return Object.assign(Object.assign({}, Z5), {
    labelLineHeight: g,
    buttonHeightSmall: p,
    buttonHeightMedium: v,
    buttonHeightLarge: u,
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
const $c = {
  name: "Radio",
  common: ut,
  self: J5
}, Q5 = {
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
function e_(e) {
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
    fontSizeMedium: u,
    fontSizeLarge: g,
    dividerColor: m,
    heightSmall: f,
    opacityDisabled: b,
    tableColorStriped: x
  } = e;
  return Object.assign(Object.assign({}, Q5), {
    actionDividerColor: m,
    lineHeight: p,
    borderRadius: h,
    fontSizeSmall: v,
    fontSizeMedium: u,
    fontSizeLarge: g,
    borderColor: Je(t, m),
    tdColorHover: Je(t, a),
    tdColorSorting: Je(t, a),
    tdColorStriped: Je(t, x),
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
    tdColorStripedModal: Je(n, x),
    thColorModal: Je(n, l),
    thColorHoverModal: Je(Je(n, l), a),
    thColorSortingModal: Je(Je(n, l), a),
    tdColorModal: n,
    // popover
    borderColorPopover: Je(o, m),
    tdColorHoverPopover: Je(o, a),
    tdColorSortingPopover: Je(o, a),
    tdColorStripedPopover: Je(o, x),
    thColorPopover: Je(o, l),
    thColorHoverPopover: Je(Je(o, l), a),
    thColorSortingPopover: Je(Je(o, l), a),
    tdColorPopover: o,
    boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
    boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
    // loading
    loadingColor: d,
    loadingSize: f,
    opacityLoading: b
  });
}
const t_ = {
  name: "DataTable",
  common: ut,
  peers: {
    Button: ml,
    Checkbox: Hg,
    Radio: $c,
    Pagination: Kg,
    Scrollbar: Vr,
    Empty: mc,
    Popover: Ar,
    Ellipsis: Yg,
    Dropdown: Gg
  },
  self: e_
}, n_ = Object.assign(Object.assign({}, Pe.props), {
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
}), Tn = "n-data-table", Zg = 40, Jg = 40;
function Ch(e) {
  if (e.type === "selection")
    return e.width === void 0 ? Zg : kt(e.width);
  if (e.type === "expand")
    return e.width === void 0 ? Jg : kt(e.width);
  if (!("children" in e))
    return typeof e.width == "string" ? kt(e.width) : e.width;
}
function o_(e) {
  var t, n;
  if (e.type === "selection")
    return Pt((t = e.width) !== null && t !== void 0 ? t : Zg);
  if (e.type === "expand")
    return Pt((n = e.width) !== null && n !== void 0 ? n : Jg);
  if (!("children" in e))
    return Pt(e.width);
}
function $n(e) {
  return e.type === "selection" ? "__n_selection__" : e.type === "expand" ? "__n_expand__" : e.key;
}
function Sh(e) {
  return e && (typeof e == "object" ? Object.assign({}, e) : e);
}
function r_(e) {
  return e === "ascend" ? 1 : e === "descend" ? -1 : 0;
}
function i_(e, t, n) {
  return n !== void 0 && (e = Math.min(e, typeof n == "number" ? n : Number.parseFloat(n))), t !== void 0 && (e = Math.max(e, typeof t == "number" ? t : Number.parseFloat(t))), e;
}
function a_(e, t) {
  if (t !== void 0)
    return {
      width: t,
      minWidth: t,
      maxWidth: t
    };
  const n = o_(e), {
    minWidth: o,
    maxWidth: r
  } = e;
  return {
    width: n,
    minWidth: Pt(o) || n,
    maxWidth: Pt(r)
  };
}
function l_(e, t, n) {
  return typeof n == "function" ? n(e, t) : n || "";
}
function ms(e) {
  return e.filterOptionValues !== void 0 || e.filterOptionValue === void 0 && e.defaultFilterOptionValues !== void 0;
}
function bs(e) {
  return "children" in e ? !1 : !!e.sorter;
}
function Qg(e) {
  return "children" in e && e.children.length ? !1 : !!e.resizable;
}
function $h(e) {
  return "children" in e ? !1 : !!e.filter && (!!e.filterOptions || !!e.renderFilterMenu);
}
function kh(e) {
  if (e) {
    if (e === "descend") return "ascend";
  } else return "descend";
  return !1;
}
function s_(e, t) {
  if (e.sorter === void 0) return null;
  const {
    customNextSortOrder: n
  } = e;
  return t === null || t.columnKey !== e.key ? {
    columnKey: e.key,
    sorter: e.sorter,
    order: kh(!1)
  } : Object.assign(Object.assign({}, t), {
    order: (n || kh)(t.order)
  });
}
function em(e, t) {
  return t.find((n) => n.columnKey === e.key && n.order) !== void 0;
}
function d_(e) {
  return typeof e == "string" ? e.replace(/,/g, "\\,") : e == null ? "" : `${e}`.replace(/,/g, "\\,");
}
function c_(e, t, n, o) {
  const r = e.filter((a) => a.type !== "expand" && a.type !== "selection" && a.allowExport !== !1), i = r.map((a) => o ? o(a) : a.title).join(","), l = t.map((a) => r.map((s) => n ? n(a[s.key], a, s) : d_(a[s.key])).join(","));
  return [i, ...l].join(`
`);
}
const u_ = window.Vue.defineComponent, f_ = window.Vue.h, h_ = window.Vue.inject, p_ = u_({
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
    } = h_(Tn);
    return () => {
      const {
        rowKey: o
      } = e;
      return f_(xc, {
        privateInsideTable: !0,
        disabled: e.disabled,
        indeterminate: n.value.has(o),
        checked: t.value.has(o),
        onUpdateChecked: e.onUpdateChecked
      });
    };
  }
}), v_ = T("radio", `
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
`, [B("checked", [A("dot", `
 background-color: var(--n-color-active);
 `)]), A("dot-wrapper", `
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `), T("radio-input", `
 position: absolute;
 border: 0;
 width: 0;
 height: 0;
 opacity: 0;
 margin: 0;
 `), A("dot", `
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
 `, [D("&::before", `
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
 `), B("checked", {
  boxShadow: "var(--n-box-shadow-active)"
}, [D("&::before", `
 opacity: 1;
 transform: scale(1);
 `)])]), A("label", `
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `), rt("disabled", `
 cursor: pointer;
 `, [D("&:hover", [A("dot", {
  boxShadow: "var(--n-box-shadow-hover)"
})]), B("focus", [D("&:not(:active)", [A("dot", {
  boxShadow: "var(--n-box-shadow-focus)"
})])])]), B("disabled", `
 cursor: not-allowed;
 `, [A("dot", {
  boxShadow: "var(--n-box-shadow-disabled)",
  backgroundColor: "var(--n-color-disabled)"
}, [D("&::before", {
  backgroundColor: "var(--n-dot-color-disabled)"
}), B("checked", `
 opacity: 1;
 `)]), A("label", {
  color: "var(--n-text-color-disabled)"
}), T("radio-input", `
 cursor: not-allowed;
 `)])]), g_ = window.Vue.inject, wa = window.Vue.ref, m_ = window.Vue.toRef;
window.Vue.watchEffect;
const b_ = {
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
}, tm = "n-radio-group";
function w_(e) {
  const t = g_(tm, null), n = so(e, {
    mergedSize(b) {
      const {
        size: x
      } = e;
      if (x !== void 0) return x;
      if (t) {
        const {
          mergedSizeRef: {
            value: y
          }
        } = t;
        if (y !== void 0)
          return y;
      }
      return b ? b.mergedSize.value : "medium";
    },
    mergedDisabled(b) {
      return !!(e.disabled || t != null && t.disabledRef.value || b != null && b.disabled.value);
    }
  }), {
    mergedSizeRef: o,
    mergedDisabledRef: r
  } = n, i = wa(null), l = wa(null), a = wa(e.defaultChecked), s = m_(e, "checked"), d = Bt(s, a), c = Ae(() => t ? t.valueRef.value === e.value : d.value), h = Ae(() => {
    const {
      name: b
    } = e;
    if (b !== void 0) return b;
    if (t) return t.nameRef.value;
  }), p = wa(!1);
  function v() {
    if (t) {
      const {
        doUpdateValue: b
      } = t, {
        value: x
      } = e;
      ce(b, x);
    } else {
      const {
        onUpdateChecked: b,
        "onUpdate:checked": x
      } = e, {
        nTriggerFormInput: y,
        nTriggerFormChange: S
      } = n;
      b && ce(b, !0), x && ce(x, !0), y(), S(), a.value = !0;
    }
  }
  function u() {
    r.value || c.value || v();
  }
  function g() {
    u(), i.value && (i.value.checked = c.value);
  }
  function m() {
    p.value = !1;
  }
  function f() {
    p.value = !0;
  }
  return {
    mergedClsPrefix: t ? t.mergedClsPrefixRef : He(e).mergedClsPrefixRef,
    inputRef: i,
    labelRef: l,
    mergedName: h,
    mergedDisabled: r,
    renderSafeChecked: c,
    focus: p,
    mergedSize: o,
    handleRadioInputChange: g,
    handleRadioInputBlur: m,
    handleRadioInputFocus: f
  };
}
const Rh = window.Vue.computed, y_ = window.Vue.defineComponent, ti = window.Vue.h, x_ = Object.assign(Object.assign({}, Pe.props), b_), nm = y_({
  name: "Radio",
  props: x_,
  setup(e) {
    const t = w_(e), n = Pe("Radio", "-radio", v_, $c, e, t.mergedClsPrefix), o = Rh(() => {
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
          boxShadowFocus: u,
          boxShadowHover: g,
          color: m,
          colorDisabled: f,
          colorActive: b,
          textColor: x,
          textColorDisabled: y,
          dotColorActive: S,
          dotColorDisabled: C,
          labelPadding: w,
          labelLineHeight: $,
          labelFontWeight: k,
          [ne("fontSize", d)]: O,
          [ne("radioSize", d)]: G
        }
      } = n.value;
      return {
        "--n-bezier": c,
        "--n-label-line-height": $,
        "--n-label-font-weight": k,
        "--n-box-shadow": h,
        "--n-box-shadow-active": p,
        "--n-box-shadow-disabled": v,
        "--n-box-shadow-focus": u,
        "--n-box-shadow-hover": g,
        "--n-color": m,
        "--n-color-active": b,
        "--n-color-disabled": f,
        "--n-dot-color-active": S,
        "--n-dot-color-disabled": C,
        "--n-font-size": O,
        "--n-radio-size": G,
        "--n-text-color": x,
        "--n-text-color-disabled": y,
        "--n-label-padding": w
      };
    }), {
      inlineThemeDisabled: r,
      mergedClsPrefixRef: i,
      mergedRtlRef: l
    } = He(e), a = Lt("Radio", l, i), s = r ? mt("radio", Rh(() => t.mergedSize.value[0]), o, e) : void 0;
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
    return n == null || n(), ti("label", {
      class: [`${t}-radio`, this.themeClass, this.rtlEnabled && `${t}-radio--rtl`, this.mergedDisabled && `${t}-radio--disabled`, this.renderSafeChecked && `${t}-radio--checked`, this.focus && `${t}-radio--focus`],
      style: this.cssVars
    }, ti("div", {
      class: `${t}-radio__dot-wrapper`
    }, " ", ti("div", {
      class: [`${t}-radio__dot`, this.renderSafeChecked && `${t}-radio__dot--checked`]
    }), ti("input", {
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
    })), Le(e.default, (r) => !r && !o ? null : ti("div", {
      ref: "labelRef",
      class: `${t}-radio__label`
    }, r || o)));
  }
}), C_ = T("radio-group", `
 display: inline-block;
 font-size: var(--n-font-size);
`, [A("splitor", `
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `, [B("checked", {
  backgroundColor: "var(--n-button-border-color-active)"
}), B("disabled", {
  opacity: "var(--n-opacity-disabled)"
})]), B("button-group", `
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [T("radio-button", {
  height: "var(--n-height)",
  lineHeight: "var(--n-height)"
}), A("splitor", {
  height: "var(--n-height)"
})]), T("radio-button", `
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
 `, [T("radio-input", `
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
 `), A("state-border", `
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `), D("&:first-child", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `, [A("state-border", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]), D("&:last-child", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `, [A("state-border", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]), rt("disabled", `
 cursor: pointer;
 `, [D("&:hover", [A("state-border", `
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `), rt("checked", {
  color: "var(--n-button-text-color-hover)"
})]), B("focus", [D("&:not(:active)", [A("state-border", {
  boxShadow: "var(--n-button-box-shadow-focus)"
})])])]), B("checked", `
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `), B("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]), Ph = window.Vue.computed, S_ = window.Vue.defineComponent, om = window.Vue.h, $_ = window.Vue.provide, Th = window.Vue.ref, _h = window.Vue.toRef;
function k_(e, t, n) {
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
      const c = r[r.length - 1].props, h = t === c.value, p = c.disabled, v = t === d.value, u = d.disabled, g = (h ? 2 : 0) + (p ? 0 : 1), m = (v ? 2 : 0) + (u ? 0 : 1), f = {
        [`${n}-radio-group__splitor--disabled`]: p,
        [`${n}-radio-group__splitor--checked`]: h
      }, b = {
        [`${n}-radio-group__splitor--disabled`]: u,
        [`${n}-radio-group__splitor--checked`]: v
      }, x = g < m ? b : f;
      r.push(om("div", {
        class: [`${n}-radio-group__splitor`, x]
      }), a);
    }
  }
  return {
    children: r,
    isButtonGroup: i
  };
}
const R_ = Object.assign(Object.assign({}, Pe.props), {
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
}), P_ = S_({
  name: "RadioGroup",
  props: R_,
  setup(e) {
    const t = Th(null), {
      mergedSizeRef: n,
      mergedDisabledRef: o,
      nTriggerFormChange: r,
      nTriggerFormInput: i,
      nTriggerFormBlur: l,
      nTriggerFormFocus: a
    } = so(e), {
      mergedClsPrefixRef: s,
      inlineThemeDisabled: d,
      mergedRtlRef: c
    } = He(e), h = Pe("Radio", "-radio-group", C_, $c, e, s), p = Th(e.defaultValue), v = _h(e, "value"), u = Bt(v, p);
    function g(S) {
      const {
        onUpdateValue: C,
        "onUpdate:value": w
      } = e;
      C && ce(C, S), w && ce(w, S), p.value = S, r(), i();
    }
    function m(S) {
      const {
        value: C
      } = t;
      C && (C.contains(S.relatedTarget) || a());
    }
    function f(S) {
      const {
        value: C
      } = t;
      C && (C.contains(S.relatedTarget) || l());
    }
    $_(tm, {
      mergedClsPrefixRef: s,
      nameRef: _h(e, "name"),
      valueRef: u,
      disabledRef: o,
      mergedSizeRef: n,
      doUpdateValue: g
    });
    const b = Lt("Radio", c, s), x = Ph(() => {
      const {
        value: S
      } = n, {
        common: {
          cubicBezierEaseInOut: C
        },
        self: {
          buttonBorderColor: w,
          buttonBorderColorActive: $,
          buttonBorderRadius: k,
          buttonBoxShadow: O,
          buttonBoxShadowFocus: G,
          buttonBoxShadowHover: _,
          buttonColor: V,
          buttonColorActive: I,
          buttonTextColor: M,
          buttonTextColorActive: X,
          buttonTextColorHover: H,
          opacityDisabled: Q,
          [ne("buttonHeight", S)]: oe,
          [ne("fontSize", S)]: te
        }
      } = h.value;
      return {
        "--n-font-size": te,
        "--n-bezier": C,
        "--n-button-border-color": w,
        "--n-button-border-color-active": $,
        "--n-button-border-radius": k,
        "--n-button-box-shadow": O,
        "--n-button-box-shadow-focus": G,
        "--n-button-box-shadow-hover": _,
        "--n-button-color": V,
        "--n-button-color-active": I,
        "--n-button-text-color": M,
        "--n-button-text-color-hover": H,
        "--n-button-text-color-active": X,
        "--n-height": oe,
        "--n-opacity-disabled": Q
      };
    }), y = d ? mt("radio-group", Ph(() => n.value[0]), x, e) : void 0;
    return {
      selfElRef: t,
      rtlEnabled: b,
      mergedClsPrefix: s,
      mergedValue: u,
      handleFocusout: f,
      handleFocusin: m,
      cssVars: d ? void 0 : x,
      themeClass: y == null ? void 0 : y.themeClass,
      onRender: y == null ? void 0 : y.onRender
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
    } = k_(jn(oc(this)), t, n);
    return (e = this.onRender) === null || e === void 0 || e.call(this), om("div", {
      onFocusin: o,
      onFocusout: r,
      ref: "selfElRef",
      class: [`${n}-radio-group`, this.rtlEnabled && `${n}-radio-group--rtl`, this.themeClass, l && `${n}-radio-group--button-group`],
      style: this.cssVars
    }, i);
  }
}), T_ = window.Vue.defineComponent, __ = window.Vue.h, F_ = window.Vue.inject, E_ = T_({
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
    } = F_(Tn);
    return () => {
      const {
        rowKey: o
      } = e;
      return __(nm, {
        name: n,
        disabled: e.disabled,
        checked: t.value.has(o),
        onUpdateChecked: e.onUpdateChecked
      });
    };
  }
}), z_ = window.Vue.computed, O_ = window.Vue.defineComponent, M_ = window.Vue.h, V_ = window.Vue.ref, I_ = Object.assign(Object.assign({}, Tr), Pe.props), A_ = O_({
  name: "Tooltip",
  props: I_,
  slots: Object,
  __popover__: !0,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = He(e), n = Pe("Tooltip", "-tooltip", void 0, Xg, e, t), o = V_(null);
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
      popoverThemeOverrides: z_(() => n.value.self)
    });
  },
  render() {
    const {
      mergedTheme: e,
      internalExtraClass: t
    } = this;
    return M_(Ii, Object.assign(Object.assign({}, this.$props), {
      theme: e.peers.Popover,
      themeOverrides: e.peerOverrides.Popover,
      builtinThemeOverrides: this.popoverThemeOverrides,
      internalExtraClass: t.concat("tooltip"),
      ref: "popoverRef"
    }), this.$slots);
  }
}), rm = T("ellipsis", {
  overflow: "hidden"
}, [rt("line-clamp", `
 white-space: nowrap;
 display: inline-block;
 vertical-align: bottom;
 max-width: 100%;
 `), B("line-clamp", `
 display: -webkit-inline-box;
 -webkit-box-orient: vertical;
 `), B("cursor-pointer", `
 cursor: pointer;
 `)]), Fh = window.Vue.computed, B_ = window.Vue.defineComponent, ws = window.Vue.h, L_ = window.Vue.mergeProps, N_ = window.Vue.onDeactivated, ya = window.Vue.ref;
function Td(e) {
  return `${e}-ellipsis--line-clamp`;
}
function _d(e, t) {
  return `${e}-ellipsis--cursor-${t}`;
}
const im = Object.assign(Object.assign({}, Pe.props), {
  expandTrigger: String,
  lineClamp: [Number, String],
  tooltip: {
    type: [Boolean, Object],
    default: !0
  }
}), kc = B_({
  name: "Ellipsis",
  inheritAttrs: !1,
  props: im,
  slots: Object,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    const o = jv(), r = Pe("Ellipsis", "-ellipsis", rm, Yg, e, o), i = ya(null), l = ya(null), a = ya(null), s = ya(!1), d = Fh(() => {
      const {
        lineClamp: m
      } = e, {
        value: f
      } = s;
      return m !== void 0 ? {
        textOverflow: "",
        "-webkit-line-clamp": f ? "" : m
      } : {
        textOverflow: f ? "" : "ellipsis",
        "-webkit-line-clamp": ""
      };
    });
    function c() {
      let m = !1;
      const {
        value: f
      } = s;
      if (f) return !0;
      const {
        value: b
      } = i;
      if (b) {
        const {
          lineClamp: x
        } = e;
        if (v(b), x !== void 0)
          m = b.scrollHeight <= b.offsetHeight;
        else {
          const {
            value: y
          } = l;
          y && (m = y.getBoundingClientRect().width <= b.getBoundingClientRect().width);
        }
        u(b, m);
      }
      return m;
    }
    const h = Fh(() => e.expandTrigger === "click" ? () => {
      var m;
      const {
        value: f
      } = s;
      f && ((m = a.value) === null || m === void 0 || m.setShow(!1)), s.value = !f;
    } : void 0);
    N_(() => {
      var m;
      e.tooltip && ((m = a.value) === null || m === void 0 || m.setShow(!1));
    });
    const p = () => ws("span", Object.assign({}, L_(n, {
      class: [`${o.value}-ellipsis`, e.lineClamp !== void 0 ? Td(o.value) : void 0, e.expandTrigger === "click" ? _d(o.value, "pointer") : void 0],
      style: d.value
    }), {
      ref: "triggerRef",
      onClick: h.value,
      onMouseenter: (
        // get tooltip disabled will derive cursor style
        e.expandTrigger === "click" ? c : void 0
      )
    }), e.lineClamp ? t : ws("span", {
      ref: "triggerInnerRef"
    }, t));
    function v(m) {
      if (!m) return;
      const f = d.value, b = Td(o.value);
      e.lineClamp !== void 0 ? g(m, b, "add") : g(m, b, "remove");
      for (const x in f)
        m.style[x] !== f[x] && (m.style[x] = f[x]);
    }
    function u(m, f) {
      const b = _d(o.value, "pointer");
      e.expandTrigger === "click" && !f ? g(m, b, "add") : g(m, b, "remove");
    }
    function g(m, f, b) {
      b === "add" ? m.classList.contains(f) || m.classList.add(f) : m.classList.contains(f) && m.classList.remove(f);
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
      return ws(A_, Object.assign({
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
}), D_ = window.Vue.defineComponent, ys = window.Vue.h, Eh = window.Vue.mergeProps, H_ = window.Vue.ref, j_ = D_({
  name: "PerformantEllipsis",
  props: im,
  inheritAttrs: !1,
  setup(e, {
    attrs: t,
    slots: n
  }) {
    const o = H_(!1), r = jv();
    return or("-ellipsis", rm, r), {
      mouseEntered: o,
      renderTrigger: () => {
        const {
          lineClamp: l
        } = e, a = r.value;
        return ys("span", Object.assign({}, Eh(t, {
          class: [`${a}-ellipsis`, l !== void 0 ? Td(a) : void 0, e.expandTrigger === "click" ? _d(a, "pointer") : void 0],
          style: l === void 0 ? {
            textOverflow: "ellipsis"
          } : {
            "-webkit-line-clamp": l
          }
        }), {
          onMouseenter: () => {
            o.value = !0;
          }
        }), l ? n : ys("span", null, n));
      }
    };
  },
  render() {
    return this.mouseEntered ? ys(kc, Eh({}, this.$attrs, this.$props), this.$slots) : this.renderTrigger();
  }
}), W_ = window.Vue.defineComponent, xs = window.Vue.h, U_ = W_({
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
    if (l && !t ? i = l(o, this.index) : t ? i = (e = o[a]) === null || e === void 0 ? void 0 : e.value : i = r ? r(Fi(o, a), o, n) : Fi(o, a), s)
      if (typeof s == "object") {
        const {
          mergedTheme: d
        } = this;
        return n.ellipsisComponent === "performant-ellipsis" ? xs(j_, Object.assign({}, s, {
          theme: d.peers.Ellipsis,
          themeOverrides: d.peerOverrides.Ellipsis
        }), {
          default: () => i
        }) : xs(kc, Object.assign({}, s, {
          theme: d.peers.Ellipsis,
          themeOverrides: d.peerOverrides.Ellipsis
        }), {
          default: () => i
        });
      } else
        return xs("span", {
          class: `${this.clsPrefix}-data-table-td__ellipsis`
        }, i);
    return i;
  }
}), K_ = window.Vue.defineComponent, ni = window.Vue.h, zh = K_({
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
    return ni("div", {
      class: [`${e}-data-table-expand-trigger`, this.expanded && `${e}-data-table-expand-trigger--expanded`],
      onClick: this.onClick,
      onMousedown: (t) => {
        t.preventDefault();
      }
    }, ni(zr, null, {
      default: () => this.loading ? ni(Mr, {
        key: "loading",
        clsPrefix: this.clsPrefix,
        radius: 85,
        strokeWidth: 15,
        scale: 0.88
      }) : this.renderExpandIcon ? this.renderExpandIcon({
        expanded: this.expanded,
        rowData: this.rowData
      }) : ni(Ct, {
        clsPrefix: e,
        key: "base-icon"
      }, {
        default: () => ni(xg, null)
      })
    }));
  }
}), Oh = window.Vue.computed, q_ = window.Vue.defineComponent, no = window.Vue.h, G_ = window.Vue.inject, X_ = window.Vue.ref, Y_ = q_({
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
    } = He(e), o = Lt("DataTable", n, t), {
      mergedClsPrefixRef: r,
      mergedThemeRef: i,
      localeRef: l
    } = G_(Tn), a = X_(e.value), s = Oh(() => {
      const {
        value: u
      } = a;
      return Array.isArray(u) ? u : null;
    }), d = Oh(() => {
      const {
        value: u
      } = a;
      return ms(e.column) ? Array.isArray(u) && u.length && u[0] || null : Array.isArray(u) ? null : u;
    });
    function c(u) {
      e.onChange(u);
    }
    function h(u) {
      e.multiple && Array.isArray(u) ? a.value = u : ms(e.column) && !Array.isArray(u) ? a.value = [u] : a.value = u;
    }
    function p() {
      c(a.value), e.onConfirm();
    }
    function v() {
      e.multiple || ms(e.column) ? c([]) : c(null), e.onClear();
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
    return no("div", {
      class: [`${n}-data-table-filter-menu`, this.rtlEnabled && `${n}-data-table-filter-menu--rtl`]
    }, no(Ir, null, {
      default: () => {
        const {
          checkboxGroupValue: o,
          handleChange: r
        } = this;
        return this.multiple ? no(c5, {
          value: o,
          class: `${n}-data-table-filter-menu__group`,
          onUpdateValue: r
        }, {
          default: () => this.options.map((i) => no(xc, {
            key: i.value,
            theme: e.peers.Checkbox,
            themeOverrides: e.peerOverrides.Checkbox,
            value: i.value
          }, {
            default: () => i.label
          }))
        }) : no(P_, {
          name: this.radioGroupName,
          class: `${n}-data-table-filter-menu__group`,
          value: this.radioGroupValue,
          onUpdateValue: this.handleChange
        }, {
          default: () => this.options.map((i) => no(nm, {
            key: i.value,
            value: i.value,
            theme: e.peers.Radio,
            themeOverrides: e.peerOverrides.Radio
          }, {
            default: () => i.label
          }))
        });
      }
    }), no("div", {
      class: `${n}-data-table-filter-menu__action`
    }, no(It, {
      size: "tiny",
      theme: e.peers.Button,
      themeOverrides: e.peerOverrides.Button,
      onClick: this.handleClearClick
    }, {
      default: () => t.clear
    }), no(It, {
      theme: e.peers.Button,
      themeOverrides: e.peerOverrides.Button,
      type: "primary",
      size: "tiny",
      onClick: this.handleConfirmClick
    }, {
      default: () => t.confirm
    })));
  }
}), Z_ = window.Vue.defineComponent, J_ = Z_({
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
}), xa = window.Vue.computed, Q_ = window.Vue.defineComponent, pr = window.Vue.h, e4 = window.Vue.inject, t4 = window.Vue.ref;
function n4(e, t, n) {
  const o = Object.assign({}, e);
  return o[t] = n, o;
}
const o4 = Q_({
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
    } = He(), {
      mergedThemeRef: n,
      mergedClsPrefixRef: o,
      mergedFilterStateRef: r,
      filterMenuCssVarsRef: i,
      paginationBehaviorOnFilterRef: l,
      doUpdatePage: a,
      doUpdateFilters: s,
      filterIconPopoverPropsRef: d
    } = e4(Tn), c = t4(!1), h = r, p = xa(() => e.column.filterMultiple !== !1), v = xa(() => {
      const x = h.value[e.column.key];
      if (x === void 0) {
        const {
          value: y
        } = p;
        return y ? [] : null;
      }
      return x;
    }), u = xa(() => {
      const {
        value: x
      } = v;
      return Array.isArray(x) ? x.length > 0 : x !== null;
    }), g = xa(() => {
      var x, y;
      return ((y = (x = t == null ? void 0 : t.value) === null || x === void 0 ? void 0 : x.DataTable) === null || y === void 0 ? void 0 : y.renderFilter) || e.column.renderFilter;
    });
    function m(x) {
      const y = n4(h.value, e.column.key, x);
      s(y, e.column), l.value === "first" && a(1);
    }
    function f() {
      c.value = !1;
    }
    function b() {
      c.value = !1;
    }
    return {
      mergedTheme: n,
      mergedClsPrefix: o,
      active: u,
      showPopover: c,
      mergedRenderFilter: g,
      filterIconPopoverProps: d,
      filterMultiple: p,
      mergedFilterValue: v,
      filterMenuCssVars: i,
      handleFilterChange: m,
      handleFilterMenuConfirm: b,
      handleFilterMenuCancel: f
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
          return pr(J_, {
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
        }) : pr(Ct, {
          clsPrefix: t
        }, {
          default: () => pr(JR, null)
        }));
      },
      default: () => {
        const {
          renderFilterMenu: r
        } = this.column;
        return r ? r({
          hide: n
        }) : pr(Y_, {
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
}), r4 = window.Vue.defineComponent, i4 = window.Vue.h, a4 = window.Vue.inject, l4 = window.Vue.onBeforeUnmount, s4 = window.Vue.ref, d4 = r4({
  name: "ColumnResizeButton",
  props: {
    onResizeStart: Function,
    onResize: Function,
    onResizeEnd: Function
  },
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = a4(Tn), n = s4(!1);
    let o = 0;
    function r(s) {
      return s.clientX;
    }
    function i(s) {
      var d;
      s.preventDefault();
      const c = n.value;
      o = r(s), n.value = !0, c || (Ke("mousemove", window, l), Ke("mouseup", window, a), (d = e.onResizeStart) === null || d === void 0 || d.call(e));
    }
    function l(s) {
      var d;
      (d = e.onResize) === null || d === void 0 || d.call(e, r(s) - o);
    }
    function a() {
      var s;
      n.value = !1, (s = e.onResizeEnd) === null || s === void 0 || s.call(e), qe("mousemove", window, l), qe("mouseup", window, a);
    }
    return l4(() => {
      qe("mousemove", window, l), qe("mouseup", window, a);
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
    return i4("span", {
      "data-data-table-resizable": !0,
      class: [`${e}-data-table-resize-button`, this.active && `${e}-data-table-resize-button--active`],
      onMousedown: this.handleMousedown
    });
  }
}), c4 = window.Vue.defineComponent, u4 = c4({
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
}), Ca = window.Vue.computed, f4 = window.Vue.defineComponent, Sa = window.Vue.h, h4 = window.Vue.inject, p4 = f4({
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
    } = He(), {
      mergedSortStateRef: n,
      mergedClsPrefixRef: o
    } = h4(Tn), r = Ca(() => n.value.find((s) => s.columnKey === e.column.key)), i = Ca(() => r.value !== void 0), l = Ca(() => {
      const {
        value: s
      } = r;
      return s && i.value ? s.order : !1;
    }), a = Ca(() => {
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
    return e ? Sa(u4, {
      render: e,
      order: t
    }) : Sa("span", {
      class: [`${n}-data-table-sorter`, t === "ascend" && `${n}-data-table-sorter--asc`, t === "descend" && `${n}-data-table-sorter--desc`]
    }, o ? o({
      order: t
    }) : Sa(Ct, {
      clsPrefix: n
    }, {
      default: () => Sa(OR, null)
    }));
  }
}), Rc = "n-dropdown-menu", bl = "n-dropdown", Mh = "n-dropdown-option", v4 = window.Vue.defineComponent, g4 = window.Vue.h, am = v4({
  name: "DropdownDivider",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  render() {
    return g4("div", {
      class: `${this.clsPrefix}-dropdown-divider`
    });
  }
}), m4 = window.Vue.defineComponent, oi = window.Vue.h, Vh = window.Vue.inject, b4 = m4({
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
    } = Vh(Rc), {
      renderLabelRef: n,
      labelFieldRef: o,
      nodePropsRef: r,
      renderOptionRef: i
    } = Vh(bl);
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
    } = this.tmNode, s = oi("div", Object.assign({
      class: `${t}-dropdown-option`
    }, r == null ? void 0 : r(a)), oi("div", {
      class: `${t}-dropdown-option-body ${t}-dropdown-option-body--group`
    }, oi("div", {
      "data-dropdown-option": !0,
      class: [`${t}-dropdown-option-body__prefix`, o && `${t}-dropdown-option-body__prefix--show-icon`]
    }, At(a.icon)), oi("div", {
      class: `${t}-dropdown-option-body__label`,
      "data-dropdown-option": !0
    }, i ? i(a) : At((e = a.title) !== null && e !== void 0 ? e : a[this.labelField])), oi("div", {
      class: [`${t}-dropdown-option-body__suffix`, n && `${t}-dropdown-option-body__suffix--has-submenu`],
      "data-dropdown-option": !0
    })));
    return l ? l({
      node: s,
      option: a
    }) : s;
  }
});
function w4(e) {
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
const y4 = {
  common: ut,
  self: w4
}, x4 = T("icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [B("color-transition", {
  transition: "color .3s var(--n-bezier)"
}), B("depth", {
  color: "var(--n-color)"
}, [D("svg", {
  opacity: "var(--n-opacity)",
  transition: "opacity .3s var(--n-bezier)"
})]), D("svg", {
  height: "1em",
  width: "1em"
})]), Cs = window.Vue.computed, C4 = window.Vue.defineComponent, Ih = window.Vue.h, S4 = window.Vue.mergeProps, $4 = Object.assign(Object.assign({}, Pe.props), {
  depth: [String, Number],
  size: [Number, String],
  color: String,
  component: [Object, Function]
}), k4 = C4({
  _n_icon__: !0,
  name: "Icon",
  inheritAttrs: !1,
  props: $4,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = He(e), o = Pe("Icon", "-icon", x4, y4, e, t), r = Cs(() => {
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
    }), i = n ? mt("icon", Cs(() => `${e.depth || "d"}`), r, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedStyle: Cs(() => {
        const {
          size: l,
          color: a
        } = e;
        return {
          fontSize: Pt(l),
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
    return !((e = t == null ? void 0 : t.$options) === null || e === void 0) && e._n_icon__ && Kn("icon", "don't wrap `n-icon` inside `n-icon`"), i == null || i(), Ih("i", S4(this.$attrs, {
      role: "img",
      class: [`${o}-icon`, l, {
        [`${o}-icon--depth`]: n,
        [`${o}-icon--color-transition`]: n !== void 0
      }],
      style: [this.cssVars, this.mergedStyle]
    }), r ? Ih(r) : this.$slots);
  }
});
function Fd(e, t) {
  return e.type === "submenu" || e.type === void 0 && e[t] !== void 0;
}
function R4(e) {
  return e.type === "group";
}
function lm(e) {
  return e.type === "divider";
}
function P4(e) {
  return e.type === "render";
}
const Bo = window.Vue.computed, T4 = window.Vue.defineComponent, tn = window.Vue.h, $a = window.Vue.inject, _4 = window.Vue.mergeProps, F4 = window.Vue.provide, E4 = window.Vue.ref, z4 = window.Vue.Transition, sm = T4({
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
    const t = $a(bl), {
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
      nodePropsRef: u,
      menuPropsRef: g
    } = t, m = $a(Mh, null), f = $a(Rc), b = $a(Oi), x = Bo(() => e.tmNode.rawNode), y = Bo(() => {
      const {
        value: H
      } = p;
      return Fd(e.tmNode.rawNode, H);
    }), S = Bo(() => {
      const {
        disabled: H
      } = e.tmNode;
      return H;
    }), C = Bo(() => {
      if (!y.value) return !1;
      const {
        key: H,
        disabled: Q
      } = e.tmNode;
      if (Q) return !1;
      const {
        value: oe
      } = n, {
        value: te
      } = o, {
        value: Y
      } = r, {
        value: L
      } = i;
      return oe !== null ? L.includes(H) : te !== null ? L.includes(H) && L[L.length - 1] !== H : Y !== null ? L.includes(H) : !1;
    }), w = Bo(() => o.value === null && !a.value), $ = $y(C, 300, w), k = Bo(() => !!(m != null && m.enteringSubmenuRef.value)), O = E4(!1);
    F4(Mh, {
      enteringSubmenuRef: O
    });
    function G() {
      O.value = !0;
    }
    function _() {
      O.value = !1;
    }
    function V() {
      const {
        parentKey: H,
        tmNode: Q
      } = e;
      Q.disabled || s.value && (r.value = H, o.value = null, n.value = Q.key);
    }
    function I() {
      const {
        tmNode: H
      } = e;
      H.disabled || s.value && n.value !== H.key && V();
    }
    function M(H) {
      if (e.tmNode.disabled || !s.value) return;
      const {
        relatedTarget: Q
      } = H;
      Q && !mn({
        target: Q
      }, "dropdownOption") && !mn({
        target: Q
      }, "scrollbarRail") && (n.value = null);
    }
    function X() {
      const {
        value: H
      } = y, {
        tmNode: Q
      } = e;
      s.value && !H && !Q.disabled && (t.doSelect(Q.key, Q.rawNode), t.doUpdateShow(!1));
    }
    return {
      labelField: h,
      renderLabel: d,
      renderIcon: c,
      siblingHasIcon: f.showIconRef,
      siblingHasSubmenu: f.hasSubmenuRef,
      menuProps: g,
      popoverBody: b,
      animated: a,
      mergedShowSubmenu: Bo(() => $.value && !k.value),
      rawNode: x,
      hasSubmenu: y,
      pending: Ae(() => {
        const {
          value: H
        } = i, {
          key: Q
        } = e.tmNode;
        return H.includes(Q);
      }),
      childActive: Ae(() => {
        const {
          value: H
        } = l, {
          key: Q
        } = e.tmNode, oe = H.findIndex((te) => Q === te);
        return oe === -1 ? !1 : oe < H.length - 1;
      }),
      active: Ae(() => {
        const {
          value: H
        } = l, {
          key: Q
        } = e.tmNode, oe = H.findIndex((te) => Q === te);
        return oe === -1 ? !1 : oe === H.length - 1;
      }),
      mergedDisabled: S,
      renderOption: v,
      nodeProps: u,
      handleClick: X,
      handleMouseMove: I,
      handleMouseEnter: V,
      handleMouseLeave: M,
      handleSubmenuBeforeEnter: G,
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
    let u = null;
    if (r) {
      const b = (e = this.menuProps) === null || e === void 0 ? void 0 : e.call(this, o, o.children);
      u = tn(dm, Object.assign({}, b, {
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
    }, m = h == null ? void 0 : h(o), f = tn("div", Object.assign({
      class: [`${i}-dropdown-option`, m == null ? void 0 : m.class],
      "data-dropdown-option": !0
    }, m), tn("div", _4(g, p), [tn("div", {
      class: [`${i}-dropdown-option-body__prefix`, l && `${i}-dropdown-option-body__prefix--show-icon`]
    }, [d ? d(o) : At(o.icon)]), tn("div", {
      "data-dropdown-option": !0,
      class: `${i}-dropdown-option-body__label`
    }, s ? s(o) : At((t = o[this.labelField]) !== null && t !== void 0 ? t : o.title)), tn("div", {
      "data-dropdown-option": !0,
      class: [`${i}-dropdown-option-body__suffix`, a && `${i}-dropdown-option-body__suffix--has-submenu`]
    }, this.hasSubmenu ? tn(k4, null, {
      default: () => tn(xg, null)
    }) : null)]), this.hasSubmenu ? tn(Zd, null, {
      default: () => [tn(Jd, null, {
        default: () => tn("div", {
          class: `${i}-dropdown-offset-container`
        }, tn(ec, {
          show: this.mergedShowSubmenu,
          placement: this.placement,
          to: v && this.popoverBody || void 0,
          teleportDisabled: !v
        }, {
          default: () => tn("div", {
            class: `${i}-dropdown-menu-wrapper`
          }, n ? tn(z4, {
            onBeforeEnter: this.handleSubmenuBeforeEnter,
            onAfterEnter: this.handleSubmenuAfterEnter,
            name: "fade-in-scale-up-transition",
            appear: !0
          }, {
            default: () => u
          }) : u)
        }))
      })]
    }) : null);
    return c ? c({
      node: f,
      option: o
    }) : f;
  }
}), O4 = window.Vue.defineComponent, M4 = window.Vue.Fragment, ka = window.Vue.h, V4 = O4({
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
    return ka(M4, null, ka(b4, {
      clsPrefix: n,
      tmNode: e,
      key: e.key
    }), o == null ? void 0 : o.map((r) => {
      const {
        rawNode: i
      } = r;
      return i.show === !1 ? null : lm(i) ? ka(am, {
        clsPrefix: n,
        key: r.key
      }) : r.isGroup ? (Kn("dropdown", "`group` node is not allowed to be put in `group` node."), null) : ka(sm, {
        clsPrefix: n,
        tmNode: r,
        parentKey: t,
        key: r.key
      });
    }));
  }
}), I4 = window.Vue.defineComponent, A4 = window.Vue.h, B4 = I4({
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
    return A4("div", t, [e == null ? void 0 : e()]);
  }
}), Ah = window.Vue.computed, L4 = window.Vue.defineComponent, vr = window.Vue.h, N4 = window.Vue.inject, Ra = window.Vue.provide, D4 = window.Vue.ref, dm = L4({
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
    } = N4(bl);
    Ra(Rc, {
      showIconRef: Ah(() => {
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
      hasSubmenuRef: Ah(() => {
        const {
          value: r
        } = n;
        return e.tmNodes.some((i) => {
          var l;
          if (i.isGroup)
            return (l = i.children) === null || l === void 0 ? void 0 : l.some(({
              rawNode: s
            }) => Fd(s, r));
          const {
            rawNode: a
          } = i;
          return Fd(a, r);
        });
      })
    });
    const o = D4(null);
    return Ra(dl, null), Ra(sl, null), Ra(Oi, o), {
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
      return i.show === !1 ? null : P4(i) ? vr(B4, {
        tmNode: r,
        key: r.key
      }) : lm(i) ? vr(am, {
        clsPrefix: t,
        key: r.key
      }) : R4(i) ? vr(V4, {
        clsPrefix: t,
        tmNode: r,
        parentKey: e,
        key: r.key
      }) : vr(sm, {
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
    }, n ? vr(Pg, {
      contentClass: `${t}-dropdown-menu__content`
    }, {
      default: () => o
    }) : o, this.showArrow ? Og({
      clsPrefix: t,
      arrowStyle: this.arrowStyle,
      arrowClass: void 0,
      arrowWrapperClass: void 0,
      arrowWrapperStyle: void 0
    }) : null);
  }
}), H4 = T("dropdown-menu", `
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`, [Vi(), T("dropdown-option", `
 position: relative;
 `, [D("a", `
 text-decoration: none;
 color: inherit;
 outline: none;
 `, [D("&::before", `
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]), T("dropdown-option-body", `
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `, [D("&::before", `
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `), rt("disabled", [B("pending", `
 color: var(--n-option-text-color-hover);
 `, [A("prefix, suffix", `
 color: var(--n-option-text-color-hover);
 `), D("&::before", "background-color: var(--n-option-color-hover);")]), B("active", `
 color: var(--n-option-text-color-active);
 `, [A("prefix, suffix", `
 color: var(--n-option-text-color-active);
 `), D("&::before", "background-color: var(--n-option-color-active);")]), B("child-active", `
 color: var(--n-option-text-color-child-active);
 `, [A("prefix, suffix", `
 color: var(--n-option-text-color-child-active);
 `)])]), B("disabled", `
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `), B("group", `
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `, [A("prefix", `
 width: calc(var(--n-option-prefix-width) / 2);
 `, [B("show-icon", `
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]), A("prefix", `
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `, [B("show-icon", `
 width: var(--n-option-icon-prefix-width);
 `), T("icon", `
 font-size: var(--n-option-icon-size);
 `)]), A("label", `
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `), A("suffix", `
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
 `, [B("has-submenu", `
 width: var(--n-option-icon-suffix-width);
 `), T("icon", `
 font-size: var(--n-option-icon-size);
 `)]), T("dropdown-menu", "pointer-events: all;")]), T("dropdown-offset-container", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]), T("dropdown-divider", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `), T("dropdown-menu-wrapper", `
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `), D(">", [T("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), rt("scrollable", `
 padding: var(--n-padding);
 `), B("scrollable", [A("content", `
 padding: var(--n-padding);
 `)])]), Lo = window.Vue.computed, j4 = window.Vue.defineComponent, Bh = window.Vue.h, W4 = window.Vue.mergeProps, U4 = window.Vue.provide, Pa = window.Vue.ref, oo = window.Vue.toRef, K4 = window.Vue.watch, q4 = {
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
}, G4 = Object.keys(Tr), X4 = Object.assign(Object.assign(Object.assign({}, Tr), q4), Pe.props), Y4 = j4({
  name: "Dropdown",
  inheritAttrs: !1,
  props: X4,
  setup(e) {
    const t = Pa(!1), n = Bt(oo(e, "show"), t), o = Lo(() => {
      const {
        keyField: _,
        childrenField: V
      } = e;
      return gl(e.options, {
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
          return I[V];
        }
      });
    }), r = Lo(() => o.value.treeNodes), i = Pa(null), l = Pa(null), a = Pa(null), s = Lo(() => {
      var _, V, I;
      return (I = (V = (_ = i.value) !== null && _ !== void 0 ? _ : l.value) !== null && V !== void 0 ? V : a.value) !== null && I !== void 0 ? I : null;
    }), d = Lo(() => o.value.getPath(s.value).keyPath), c = Lo(() => o.value.getPath(e.value).keyPath), h = Ae(() => e.keyboard && n.value);
    fy({
      keydown: {
        ArrowUp: {
          prevent: !0,
          handler: S
        },
        ArrowRight: {
          prevent: !0,
          handler: y
        },
        ArrowDown: {
          prevent: !0,
          handler: C
        },
        ArrowLeft: {
          prevent: !0,
          handler: x
        },
        Enter: {
          prevent: !0,
          handler: w
        },
        Escape: b
      }
    }, h);
    const {
      mergedClsPrefixRef: p,
      inlineThemeDisabled: v
    } = He(e), u = Pe("Dropdown", "-dropdown", H4, Gg, e, p);
    U4(bl, {
      labelFieldRef: oo(e, "labelField"),
      childrenFieldRef: oo(e, "childrenField"),
      renderLabelRef: oo(e, "renderLabel"),
      renderIconRef: oo(e, "renderIcon"),
      hoverKeyRef: i,
      keyboardKeyRef: l,
      lastToggledSubmenuKeyRef: a,
      pendingKeyPathRef: d,
      activeKeyPathRef: c,
      animatedRef: oo(e, "animated"),
      mergedShowRef: n,
      nodePropsRef: oo(e, "nodeProps"),
      renderOptionRef: oo(e, "renderOption"),
      menuPropsRef: oo(e, "menuProps"),
      doSelect: g,
      doUpdateShow: m
    }), K4(n, (_) => {
      !e.animated && !_ && f();
    });
    function g(_, V) {
      const {
        onSelect: I
      } = e;
      I && ce(I, _, V);
    }
    function m(_) {
      const {
        "onUpdate:show": V,
        onUpdateShow: I
      } = e;
      V && ce(V, _), I && ce(I, _), t.value = _;
    }
    function f() {
      i.value = null, l.value = null, a.value = null;
    }
    function b() {
      m(!1);
    }
    function x() {
      k("left");
    }
    function y() {
      k("right");
    }
    function S() {
      k("up");
    }
    function C() {
      k("down");
    }
    function w() {
      const _ = $();
      _ != null && _.isLeaf && n.value && (g(_.key, _.rawNode), m(!1));
    }
    function $() {
      var _;
      const {
        value: V
      } = o, {
        value: I
      } = s;
      return !V || I === null ? null : (_ = V.getNode(I)) !== null && _ !== void 0 ? _ : null;
    }
    function k(_) {
      const {
        value: V
      } = s, {
        value: {
          getFirstAvailableNode: I
        }
      } = o;
      let M = null;
      if (V === null) {
        const X = I();
        X !== null && (M = X.key);
      } else {
        const X = $();
        if (X) {
          let H;
          switch (_) {
            case "down":
              H = X.getNext();
              break;
            case "up":
              H = X.getPrev();
              break;
            case "right":
              H = X.getChild();
              break;
            case "left":
              H = X.getParent();
              break;
          }
          H && (M = H.key);
        }
      }
      M !== null && (i.value = null, l.value = M);
    }
    const O = Lo(() => {
      const {
        size: _,
        inverted: V
      } = e, {
        common: {
          cubicBezierEaseInOut: I
        },
        self: M
      } = u.value, {
        padding: X,
        dividerColor: H,
        borderRadius: Q,
        optionOpacityDisabled: oe,
        [ne("optionIconSuffixWidth", _)]: te,
        [ne("optionSuffixWidth", _)]: Y,
        [ne("optionIconPrefixWidth", _)]: L,
        [ne("optionPrefixWidth", _)]: Z,
        [ne("fontSize", _)]: ee,
        [ne("optionHeight", _)]: ue,
        [ne("optionIconSize", _)]: fe
      } = M, ve = {
        "--n-bezier": I,
        "--n-font-size": ee,
        "--n-padding": X,
        "--n-border-radius": Q,
        "--n-option-height": ue,
        "--n-option-prefix-width": Z,
        "--n-option-icon-prefix-width": L,
        "--n-option-suffix-width": Y,
        "--n-option-icon-suffix-width": te,
        "--n-option-icon-size": fe,
        "--n-divider-color": H,
        "--n-option-opacity-disabled": oe
      };
      return V ? (ve["--n-color"] = M.colorInverted, ve["--n-option-color-hover"] = M.optionColorHoverInverted, ve["--n-option-color-active"] = M.optionColorActiveInverted, ve["--n-option-text-color"] = M.optionTextColorInverted, ve["--n-option-text-color-hover"] = M.optionTextColorHoverInverted, ve["--n-option-text-color-active"] = M.optionTextColorActiveInverted, ve["--n-option-text-color-child-active"] = M.optionTextColorChildActiveInverted, ve["--n-prefix-color"] = M.prefixColorInverted, ve["--n-suffix-color"] = M.suffixColorInverted, ve["--n-group-header-text-color"] = M.groupHeaderTextColorInverted) : (ve["--n-color"] = M.color, ve["--n-option-color-hover"] = M.optionColorHover, ve["--n-option-color-active"] = M.optionColorActive, ve["--n-option-text-color"] = M.optionTextColor, ve["--n-option-text-color-hover"] = M.optionTextColorHover, ve["--n-option-text-color-active"] = M.optionTextColorActive, ve["--n-option-text-color-child-active"] = M.optionTextColorChildActive, ve["--n-prefix-color"] = M.prefixColor, ve["--n-suffix-color"] = M.suffixColor, ve["--n-group-header-text-color"] = M.groupHeaderTextColor), ve;
    }), G = v ? mt("dropdown", Lo(() => `${e.size[0]}${e.inverted ? "i" : ""}`), O, e) : void 0;
    return {
      mergedClsPrefix: p,
      mergedTheme: u,
      // data
      tmNodes: r,
      // show
      mergedShow: n,
      // methods
      handleAfterLeave: () => {
        e.animated && f();
      },
      doUpdateShow: m,
      cssVars: v ? void 0 : O,
      themeClass: G == null ? void 0 : G.themeClass,
      onRender: G == null ? void 0 : G.onRender
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
        ref: Lv(r),
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
      return Bh(dm, W4(this.$attrs, p, h));
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
    return Bh(Ii, Object.assign({}, Po(this.$props, G4), n), {
      trigger: () => {
        var o, r;
        return (r = (o = this.$slots).default) === null || r === void 0 ? void 0 : r.call(o);
      }
    });
  }
}), Lh = window.Vue.computed, Z4 = window.Vue.defineComponent, Ss = window.Vue.h, J4 = window.Vue.inject, cm = "_n_all__", um = "_n_none__";
function Q4(e, t, n, o) {
  return e ? (r) => {
    for (const i of e)
      switch (r) {
        case cm:
          n(!0);
          return;
        case um:
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
function eF(e, t) {
  return e ? e.map((n) => {
    switch (n) {
      case "all":
        return {
          label: t.checkTableAll,
          key: cm
        };
      case "none":
        return {
          label: t.uncheckTableAll,
          key: um
        };
      default:
        return n;
    }
  }) : [];
}
const tF = Z4({
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
    } = J4(Tn), a = Lh(() => Q4(o.value, r, i, l)), s = Lh(() => eF(o.value, n.value));
    return () => {
      var d, c, h, p;
      const {
        clsPrefix: v
      } = e;
      return Ss(Y4, {
        theme: (c = (d = t.theme) === null || d === void 0 ? void 0 : d.peers) === null || c === void 0 ? void 0 : c.Dropdown,
        themeOverrides: (p = (h = t.themeOverrides) === null || h === void 0 ? void 0 : h.peers) === null || p === void 0 ? void 0 : p.Dropdown,
        options: s.value,
        onSelect: a.value
      }, {
        default: () => Ss(Ct, {
          clsPrefix: v,
          class: `${v}-data-table-check-extra`
        }, {
          default: () => Ss(yg, null)
        })
      });
    };
  }
}), fm = window.Vue.defineComponent, Nh = window.Vue.Fragment, ht = window.Vue.h, nF = window.Vue.inject, Dh = window.Vue.ref;
function $s(e) {
  return typeof e.title == "function" ? e.title(e) : e.title;
}
const oF = fm({
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
    return ht("table", {
      style: {
        tableLayout: "fixed",
        width: o
      },
      class: `${e}-data-table-table`
    }, ht("colgroup", null, n.map((r) => ht("col", {
      key: r.key,
      style: r.style
    }))), ht("thead", {
      "data-n-id": t,
      class: `${e}-data-table-thead`
    }, this.$slots));
  }
}), hm = fm({
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
      headerCheckboxDisabledRef: u,
      virtualScrollHeaderRef: g,
      headerHeightRef: m,
      onUnstableColumnResize: f,
      doUpdateResizableWidth: b,
      handleTableHeaderScroll: x,
      deriveNextSorter: y,
      doUncheckAll: S,
      doCheckAll: C
    } = nF(Tn), w = Dh(), $ = Dh({});
    function k(M) {
      const X = $.value[M];
      return X == null ? void 0 : X.getBoundingClientRect().width;
    }
    function O() {
      i.value ? S() : C();
    }
    function G(M, X) {
      if (mn(M, "dataTableFilter") || mn(M, "dataTableResizable") || !bs(X)) return;
      const H = h.value.find((oe) => oe.columnKey === X.key) || null, Q = s_(X, H);
      y(Q);
    }
    const _ = /* @__PURE__ */ new Map();
    function V(M) {
      _.set(M.key, k(M.key));
    }
    function I(M, X) {
      const H = _.get(M.key);
      if (H === void 0)
        return;
      const Q = H + X, oe = i_(Q, M.minWidth, M.maxWidth);
      f(Q, oe, M, k), b(M, oe);
    }
    return {
      cellElsRef: $,
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
      headerCheckboxDisabled: u,
      headerHeight: m,
      virtualScrollHeader: g,
      virtualListRef: w,
      handleCheckboxUpdateChecked: O,
      handleColHeaderClick: G,
      handleTableHeaderScroll: x,
      handleColumnResizeStart: V,
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
      mergedTableLayout: v,
      headerCheckboxDisabled: u,
      mergedSortState: g,
      virtualScrollHeader: m,
      handleColHeaderClick: f,
      handleCheckboxUpdateChecked: b,
      handleColumnResizeStart: x,
      handleColumnResize: y
    } = this, S = (k, O, G) => k.map(({
      column: _,
      colIndex: V,
      colSpan: I,
      rowSpan: M,
      isLast: X
    }) => {
      var H, Q;
      const oe = $n(_), {
        ellipsis: te
      } = _, Y = () => _.type === "selection" ? _.multiple !== !1 ? ht(Nh, null, ht(xc, {
        key: r,
        privateInsideTable: !0,
        checked: i,
        indeterminate: l,
        disabled: u,
        onUpdateChecked: b
      }), c ? ht(tF, {
        clsPrefix: t
      }) : null) : null : ht(Nh, null, ht("div", {
        class: `${t}-data-table-th__title-wrapper`
      }, ht("div", {
        class: `${t}-data-table-th__title`
      }, te === !0 || te && !te.tooltip ? ht("div", {
        class: `${t}-data-table-th__ellipsis`
      }, $s(_)) : te && typeof te == "object" ? ht(kc, Object.assign({}, te, {
        theme: d.peers.Ellipsis,
        themeOverrides: d.peerOverrides.Ellipsis
      }), {
        default: () => $s(_)
      }) : $s(_)), bs(_) ? ht(p4, {
        column: _
      }) : null), $h(_) ? ht(o4, {
        column: _,
        options: _.filterOptions
      }) : null, Qg(_) ? ht(d4, {
        onResizeStart: () => {
          x(_);
        },
        onResize: (ue) => {
          y(_, ue);
        }
      }) : null), L = oe in n, Z = oe in o, ee = O && !_.fixed ? "div" : "th";
      return ht(ee, {
        ref: (ue) => e[oe] = ue,
        key: oe,
        style: [O && !_.fixed ? {
          position: "absolute",
          left: ct(O(V)),
          top: 0,
          bottom: 0
        } : {
          left: ct((H = n[oe]) === null || H === void 0 ? void 0 : H.start),
          right: ct((Q = o[oe]) === null || Q === void 0 ? void 0 : Q.start)
        }, {
          width: ct(_.width),
          textAlign: _.titleAlign || _.align,
          height: G
        }],
        colspan: I,
        rowspan: M,
        "data-col-key": oe,
        class: [`${t}-data-table-th`, (L || Z) && `${t}-data-table-th--fixed-${L ? "left" : "right"}`, {
          [`${t}-data-table-th--sorting`]: em(_, g),
          [`${t}-data-table-th--filterable`]: $h(_),
          [`${t}-data-table-th--sortable`]: bs(_),
          [`${t}-data-table-th--selection`]: _.type === "selection",
          [`${t}-data-table-th--last`]: X
        }, _.className],
        onClick: _.type !== "selection" && _.type !== "expand" && !("children" in _) ? (ue) => {
          f(ue, _);
        } : void 0
      }, Y());
    });
    if (m) {
      const {
        headerHeight: k
      } = this;
      let O = 0, G = 0;
      return s.forEach((_) => {
        _.column.fixed === "left" ? O++ : _.column.fixed === "right" && G++;
      }), ht(nc, {
        ref: "virtualListRef",
        class: `${t}-data-table-base-table-header`,
        style: {
          height: ct(k)
        },
        onScroll: this.handleTableHeaderScroll,
        columns: s,
        itemSize: k,
        showScrollbar: !1,
        items: [{}],
        itemResizable: !1,
        visibleItemsTag: oF,
        visibleItemsProps: {
          clsPrefix: t,
          id: h,
          cols: s,
          width: Pt(this.scrollX)
        },
        renderItemWithCols: ({
          startColIndex: _,
          endColIndex: V,
          getLeft: I
        }) => {
          const M = s.map((H, Q) => ({
            column: H.column,
            isLast: Q === s.length - 1,
            colIndex: H.index,
            colSpan: 1,
            rowSpan: 1
          })).filter(({
            column: H
          }, Q) => !!(_ <= Q && Q <= V || H.fixed)), X = S(M, I, ct(k));
          return X.splice(O, 0, ht("th", {
            colspan: s.length - O - G,
            style: {
              pointerEvents: "none",
              visibility: "hidden",
              height: 0
            }
          })), ht("tr", {
            style: {
              position: "relative"
            }
          }, X);
        }
      }, {
        default: ({
          renderedItemWithCols: _
        }) => _
      });
    }
    const C = ht("thead", {
      class: `${t}-data-table-thead`,
      "data-n-id": h
    }, a.map((k) => ht("tr", {
      class: `${t}-data-table-tr`
    }, S(k, null, void 0))));
    if (!p)
      return C;
    const {
      handleTableHeaderScroll: w,
      scrollX: $
    } = this;
    return ht("div", {
      class: `${t}-data-table-base-table-header`,
      onScroll: w
    }, ht("table", {
      class: `${t}-data-table-table`,
      style: {
        minWidth: Pt($),
        tableLayout: v
      }
    }, ht("colgroup", null, s.map((k) => ht("col", {
      key: k.key,
      style: k.style
    }))), C));
  }
}), Hh = window.Vue.computed, pm = window.Vue.defineComponent, rF = window.Vue.Fragment, lt = window.Vue.h, jh = window.Vue.inject, iF = window.Vue.onUnmounted, ks = window.Vue.ref, aF = window.Vue.watchEffect;
function lF(e, t) {
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
const sF = pm({
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
    return lt("table", {
      style: {
        tableLayout: "fixed"
      },
      class: `${e}-data-table-table`,
      onMouseenter: o,
      onMouseleave: r
    }, lt("colgroup", null, n.map((i) => lt("col", {
      key: i.key,
      style: i.style
    }))), lt("tbody", {
      "data-n-id": t,
      class: `${e}-data-table-tbody`
    }, this.$slots));
  }
}), dF = pm({
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
      leftActiveFixedColKeyRef: u,
      leftActiveFixedChildrenColKeysRef: g,
      rightActiveFixedColKeyRef: m,
      rightActiveFixedChildrenColKeysRef: f,
      renderExpandRef: b,
      hoverKeyRef: x,
      summaryRef: y,
      mergedSortStateRef: S,
      virtualScrollRef: C,
      virtualScrollXRef: w,
      heightForRowRef: $,
      minRowHeightRef: k,
      componentId: O,
      mergedTableLayoutRef: G,
      childTriggerColIndexRef: _,
      indentRef: V,
      rowPropsRef: I,
      maxHeightRef: M,
      stripedRef: X,
      loadingRef: H,
      onLoadRef: Q,
      loadingKeySetRef: oe,
      expandableRef: te,
      stickyExpandedRowsRef: Y,
      renderExpandIconRef: L,
      summaryPlacementRef: Z,
      treeMateRef: ee,
      scrollbarPropsRef: ue,
      setHeaderScrollLeft: fe,
      doUpdateExpandedRowKeys: ve,
      handleTableBodyScroll: xe,
      doCheck: J,
      doUncheck: pe,
      renderCell: j
    } = jh(Tn), W = jh(lo), ie = ks(null), ye = ks(null), Me = ks(null), ze = Ae(() => s.value.length === 0), se = Ae(() => e.showHeader || !ze.value), P = Ae(() => e.showHeader || ze.value);
    let R = "";
    const E = Hh(() => new Set(o.value));
    function N(we) {
      var Fe;
      return (Fe = ee.value.getNode(we)) === null || Fe === void 0 ? void 0 : Fe.rawNode;
    }
    function re(we, Fe, F) {
      const q = N(we.key);
      if (!q) {
        Kn("data-table", `fail to get row data with key ${we.key}`);
        return;
      }
      if (F) {
        const ae = s.value.findIndex((ge) => ge.key === R);
        if (ae !== -1) {
          const ge = s.value.findIndex((Te) => Te.key === we.key), be = Math.min(ae, ge), Ce = Math.max(ae, ge), Se = [];
          s.value.slice(be, Ce + 1).forEach((Te) => {
            Te.disabled || Se.push(Te.key);
          }), Fe ? J(Se, !1, q) : pe(Se, q), R = we.key;
          return;
        }
      }
      Fe ? J(we.key, !1, q) : pe(we.key, q), R = we.key;
    }
    function de(we) {
      const Fe = N(we.key);
      if (!Fe) {
        Kn("data-table", `fail to get row data with key ${we.key}`);
        return;
      }
      J(we.key, !0, Fe);
    }
    function z() {
      if (!se.value) {
        const {
          value: Fe
        } = Me;
        return Fe || null;
      }
      if (C.value)
        return _e();
      const {
        value: we
      } = ie;
      return we ? we.containerRef : null;
    }
    function K(we, Fe) {
      var F;
      if (oe.value.has(we)) return;
      const {
        value: q
      } = o, ae = q.indexOf(we), ge = Array.from(q);
      ~ae ? (ge.splice(ae, 1), ve(ge)) : Fe && !Fe.isLeaf && !Fe.shallowLoaded ? (oe.value.add(we), (F = Q.value) === null || F === void 0 || F.call(Q, Fe.rawNode).then(() => {
        const {
          value: be
        } = o, Ce = Array.from(be);
        ~Ce.indexOf(we) || Ce.push(we), ve(Ce);
      }).finally(() => {
        oe.value.delete(we);
      })) : (ge.push(we), ve(ge));
    }
    function me() {
      x.value = null;
    }
    function _e() {
      const {
        value: we
      } = ye;
      return (we == null ? void 0 : we.listElRef) || null;
    }
    function Ge() {
      const {
        value: we
      } = ye;
      return (we == null ? void 0 : we.itemsElRef) || null;
    }
    function vt(we) {
      var Fe;
      xe(we), (Fe = ie.value) === null || Fe === void 0 || Fe.sync();
    }
    function Xe(we) {
      var Fe;
      const {
        onResize: F
      } = e;
      F && F(we), (Fe = ie.value) === null || Fe === void 0 || Fe.sync();
    }
    const Ye = {
      getScrollContainer: z,
      scrollTo(we, Fe) {
        var F, q;
        C.value ? (F = ye.value) === null || F === void 0 || F.scrollTo(we, Fe) : (q = ie.value) === null || q === void 0 || q.scrollTo(we, Fe);
      }
    }, bt = D([({
      props: we
    }) => {
      const Fe = (q) => q === null ? null : D(`[data-n-id="${we.componentId}"] [data-col-key="${q}"]::after`, {
        boxShadow: "var(--n-box-shadow-after)"
      }), F = (q) => q === null ? null : D(`[data-n-id="${we.componentId}"] [data-col-key="${q}"]::before`, {
        boxShadow: "var(--n-box-shadow-before)"
      });
      return D([Fe(we.leftActiveFixedColKey), F(we.rightActiveFixedColKey), we.leftActiveFixedChildrenColKeys.map((q) => Fe(q)), we.rightActiveFixedChildrenColKeys.map((q) => F(q))]);
    }]);
    let tt = !1;
    return aF(() => {
      const {
        value: we
      } = u, {
        value: Fe
      } = g, {
        value: F
      } = m, {
        value: q
      } = f;
      if (!tt && we === null && F === null)
        return;
      const ae = {
        leftActiveFixedColKey: we,
        leftActiveFixedChildrenColKeys: Fe,
        rightActiveFixedColKey: F,
        rightActiveFixedChildrenColKeys: q,
        componentId: O
      };
      bt.mount({
        id: `n-${O}`,
        force: !0,
        props: ae,
        anchorMetaName: Pr,
        parent: W == null ? void 0 : W.styleMountTarget
      }), tt = !0;
    }), iF(() => {
      bt.unmount({
        id: `n-${O}`,
        parent: W == null ? void 0 : W.styleMountTarget
      });
    }), Object.assign({
      bodyWidth: n,
      summaryPlacement: Z,
      dataTableSlots: t,
      componentId: O,
      scrollbarInstRef: ie,
      virtualListRef: ye,
      emptyElRef: Me,
      summary: y,
      mergedClsPrefix: r,
      mergedTheme: i,
      scrollX: l,
      cols: a,
      loading: H,
      bodyShowHeaderOnly: P,
      shouldDisplaySomeTablePart: se,
      empty: ze,
      paginatedDataAndInfo: Hh(() => {
        const {
          value: we
        } = X;
        let Fe = !1;
        return {
          data: s.value.map(we ? (q, ae) => (q.isLeaf || (Fe = !0), {
            tmNode: q,
            key: q.key,
            striped: ae % 2 === 1,
            index: ae
          }) : (q, ae) => (q.isLeaf || (Fe = !0), {
            tmNode: q,
            key: q.key,
            striped: !1,
            index: ae
          })),
          hasChildren: Fe
        };
      }),
      rawPaginatedData: d,
      fixedColumnLeftMap: c,
      fixedColumnRightMap: h,
      currentPage: p,
      rowClassName: v,
      renderExpand: b,
      mergedExpandedRowKeySet: E,
      hoverKey: x,
      mergedSortState: S,
      virtualScroll: C,
      virtualScrollX: w,
      heightForRow: $,
      minRowHeight: k,
      mergedTableLayout: G,
      childTriggerColIndex: _,
      indent: V,
      rowProps: I,
      maxHeight: M,
      loadingKeySet: oe,
      expandable: te,
      stickyExpandedRows: Y,
      renderExpandIcon: L,
      scrollbarProps: ue,
      setHeaderScrollLeft: fe,
      handleVirtualListScroll: vt,
      handleVirtualListResize: Xe,
      handleMouseleaveTable: me,
      virtualListContainer: _e,
      virtualListContent: Ge,
      handleTableBodyScroll: xe,
      handleCheckboxUpdateChecked: re,
      handleRadioUpdateChecked: de,
      handleUpdateExpanded: K,
      renderCell: j
    }, Ye);
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
      minWidth: Pt(t) || "100%"
    };
    t && (v.width = "100%");
    const u = lt(Ir, Object.assign({}, this.scrollbarProps, {
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
          cols: f,
          paginatedDataAndInfo: b,
          mergedTheme: x,
          fixedColumnLeftMap: y,
          fixedColumnRightMap: S,
          currentPage: C,
          rowClassName: w,
          mergedSortState: $,
          mergedExpandedRowKeySet: k,
          stickyExpandedRows: O,
          componentId: G,
          childTriggerColIndex: _,
          expandable: V,
          rowProps: I,
          handleMouseleaveTable: M,
          renderExpand: X,
          summary: H,
          handleCheckboxUpdateChecked: Q,
          handleRadioUpdateChecked: oe,
          handleUpdateExpanded: te,
          heightForRow: Y,
          minRowHeight: L,
          virtualScrollX: Z
        } = this, {
          length: ee
        } = f;
        let ue;
        const {
          data: fe,
          hasChildren: ve
        } = b, xe = ve ? lF(fe, k) : fe;
        if (H) {
          const R = H(this.rawPaginatedData);
          if (Array.isArray(R)) {
            const E = R.map((N, re) => ({
              isSummaryRow: !0,
              key: `__n_summary__${re}`,
              tmNode: {
                rawNode: N,
                disabled: !0
              },
              index: -1
            }));
            ue = this.summaryPlacement === "top" ? [...E, ...xe] : [...xe, ...E];
          } else {
            const E = {
              isSummaryRow: !0,
              key: "__n_summary__",
              tmNode: {
                rawNode: R,
                disabled: !0
              },
              index: -1
            };
            ue = this.summaryPlacement === "top" ? [E, ...xe] : [...xe, E];
          }
        } else
          ue = xe;
        const J = ve ? {
          width: ct(this.indent)
        } : void 0, pe = [];
        ue.forEach((R) => {
          X && k.has(R.key) && (!V || V(R.tmNode.rawNode)) ? pe.push(R, {
            isExpandedRow: !0,
            key: `${R.key}-expand`,
            // solve key repeat of the expanded row
            tmNode: R.tmNode,
            index: R.index
          }) : pe.push(R);
        });
        const {
          length: j
        } = pe, W = {};
        fe.forEach(({
          tmNode: R
        }, E) => {
          W[E] = R.key;
        });
        const ie = O ? this.bodyWidth : null, ye = ie === null ? void 0 : `${ie}px`, Me = this.virtualScrollX ? "div" : "td";
        let ze = 0, se = 0;
        Z && f.forEach((R) => {
          R.column.fixed === "left" ? ze++ : R.column.fixed === "right" && se++;
        });
        const P = ({
          // Normal
          rowInfo: R,
          displayedRowIndex: E,
          isVirtual: N,
          // Virtual X
          isVirtualX: re,
          startColIndex: de,
          endColIndex: z,
          getLeft: K
        }) => {
          const {
            index: me
          } = R;
          if ("isExpandedRow" in R) {
            const {
              tmNode: {
                key: ge,
                rawNode: be
              }
            } = R;
            return lt("tr", {
              class: `${n}-data-table-tr ${n}-data-table-tr--expanded`,
              key: `${ge}__expand`
            }, lt("td", {
              class: [`${n}-data-table-td`, `${n}-data-table-td--last-col`, E + 1 === j && `${n}-data-table-td--last-row`],
              colspan: ee
            }, O ? lt("div", {
              class: `${n}-data-table-expand`,
              style: {
                width: ye
              }
            }, X(be, me)) : X(be, me)));
          }
          const _e = "isSummaryRow" in R, Ge = !_e && R.striped, {
            tmNode: vt,
            key: Xe
          } = R, {
            rawNode: Ye
          } = vt, bt = k.has(Xe), tt = I ? I(Ye, me) : void 0, we = typeof w == "string" ? w : l_(Ye, me, w), Fe = re ? f.filter((ge, be) => !!(de <= be && be <= z || ge.column.fixed)) : f, F = re ? ct((Y == null ? void 0 : Y(Ye, me)) || L) : void 0, q = Fe.map((ge) => {
            var be, Ce, Se, Te, Be;
            const it = ge.index;
            if (E in g) {
              const dt = g[E], gt = dt.indexOf(it);
              if (~gt)
                return dt.splice(gt, 1), null;
            }
            const {
              column: je
            } = ge, _t = $n(ge), {
              rowSpan: Mt,
              colSpan: Vt
            } = je, Nt = _e ? ((be = R.tmNode.rawNode[_t]) === null || be === void 0 ? void 0 : be.colSpan) || 1 : Vt ? Vt(Ye, me) : 1, Dt = _e ? ((Ce = R.tmNode.rawNode[_t]) === null || Ce === void 0 ? void 0 : Ce.rowSpan) || 1 : Mt ? Mt(Ye, me) : 1, Zt = it + Nt === ee, Jt = E + Dt === j, U = Dt > 1;
            if (U && (m[E] = {
              [it]: []
            }), Nt > 1 || U)
              for (let dt = E; dt < E + Dt; ++dt) {
                U && m[E][it].push(W[dt]);
                for (let gt = it; gt < it + Nt; ++gt)
                  dt === E && gt === it || (dt in g ? g[dt].push(gt) : g[dt] = [gt]);
              }
            const le = U ? this.hoverKey : null, {
              cellProps: Re
            } = je, Ie = Re == null ? void 0 : Re(Ye, me), Ze = {
              "--indent-offset": ""
            }, De = je.fixed ? "td" : Me;
            return lt(De, Object.assign({}, Ie, {
              key: _t,
              style: [{
                textAlign: je.align || void 0,
                width: ct(je.width)
              }, re && {
                height: F
              }, re && !je.fixed ? {
                position: "absolute",
                left: ct(K(it)),
                top: 0,
                bottom: 0
              } : {
                left: ct((Se = y[_t]) === null || Se === void 0 ? void 0 : Se.start),
                right: ct((Te = S[_t]) === null || Te === void 0 ? void 0 : Te.start)
              }, Ze, (Ie == null ? void 0 : Ie.style) || ""],
              colspan: Nt,
              rowspan: N ? void 0 : Dt,
              "data-col-key": _t,
              class: [`${n}-data-table-td`, je.className, Ie == null ? void 0 : Ie.class, _e && `${n}-data-table-td--summary`, le !== null && m[E][it].includes(le) && `${n}-data-table-td--hover`, em(je, $) && `${n}-data-table-td--sorting`, je.fixed && `${n}-data-table-td--fixed-${je.fixed}`, je.align && `${n}-data-table-td--${je.align}-align`, je.type === "selection" && `${n}-data-table-td--selection`, je.type === "expand" && `${n}-data-table-td--expand`, Zt && `${n}-data-table-td--last-col`, Jt && `${n}-data-table-td--last-row`]
            }), ve && it === _ ? [kw(Ze["--indent-offset"] = _e ? 0 : R.tmNode.level, lt("div", {
              class: `${n}-data-table-indent`,
              style: J
            })), _e || R.tmNode.isLeaf ? lt("div", {
              class: `${n}-data-table-expand-placeholder`
            }) : lt(zh, {
              class: `${n}-data-table-expand-trigger`,
              clsPrefix: n,
              expanded: bt,
              rowData: Ye,
              renderExpandIcon: this.renderExpandIcon,
              loading: a.has(R.key),
              onClick: () => {
                te(Xe, R.tmNode);
              }
            })] : null, je.type === "selection" ? _e ? null : je.multiple === !1 ? lt(E_, {
              key: C,
              rowKey: Xe,
              disabled: R.tmNode.disabled,
              onUpdateChecked: () => {
                oe(R.tmNode);
              }
            }) : lt(p_, {
              key: C,
              rowKey: Xe,
              disabled: R.tmNode.disabled,
              onUpdateChecked: (dt, gt) => {
                Q(R.tmNode, dt, gt.shiftKey);
              }
            }) : je.type === "expand" ? _e ? null : !je.expandable || !((Be = je.expandable) === null || Be === void 0) && Be.call(je, Ye) ? lt(zh, {
              clsPrefix: n,
              rowData: Ye,
              expanded: bt,
              renderExpandIcon: this.renderExpandIcon,
              onClick: () => {
                te(Xe, null);
              }
            }) : null : lt(U_, {
              clsPrefix: n,
              index: me,
              row: Ye,
              column: je,
              isSummary: _e,
              mergedTheme: x,
              renderCell: this.renderCell
            }));
          });
          return re && ze && se && q.splice(ze, 0, lt("td", {
            colspan: f.length - ze - se,
            style: {
              pointerEvents: "none",
              visibility: "hidden",
              height: 0
            }
          })), lt("tr", Object.assign({}, tt, {
            onMouseenter: (ge) => {
              var be;
              this.hoverKey = Xe, (be = tt == null ? void 0 : tt.onMouseenter) === null || be === void 0 || be.call(tt, ge);
            },
            key: Xe,
            class: [`${n}-data-table-tr`, _e && `${n}-data-table-tr--summary`, Ge && `${n}-data-table-tr--striped`, bt && `${n}-data-table-tr--expanded`, we, tt == null ? void 0 : tt.class],
            style: [tt == null ? void 0 : tt.style, re && {
              height: F
            }]
          }), q);
        };
        return o ? lt(nc, {
          ref: "virtualListRef",
          items: pe,
          itemSize: this.minRowHeight,
          visibleItemsTag: sF,
          visibleItemsProps: {
            clsPrefix: n,
            id: G,
            cols: f,
            onMouseleave: M
          },
          showScrollbar: !1,
          onResize: this.handleVirtualListResize,
          onScroll: this.handleVirtualListScroll,
          itemsStyle: v,
          itemResizable: !Z,
          columns: f,
          renderItemWithCols: Z ? ({
            itemIndex: R,
            item: E,
            startColIndex: N,
            endColIndex: re,
            getLeft: de
          }) => P({
            displayedRowIndex: R,
            isVirtual: !0,
            isVirtualX: !0,
            rowInfo: E,
            startColIndex: N,
            endColIndex: re,
            getLeft: de
          }) : void 0
        }, {
          default: ({
            item: R,
            index: E,
            renderedItemWithCols: N
          }) => N || P({
            rowInfo: R,
            displayedRowIndex: E,
            isVirtual: !0,
            isVirtualX: !1,
            startColIndex: 0,
            endColIndex: 0,
            getLeft(re) {
              return 0;
            }
          })
        }) : lt("table", {
          class: `${n}-data-table-table`,
          onMouseleave: M,
          style: {
            tableLayout: this.mergedTableLayout
          }
        }, lt("colgroup", null, f.map((R) => lt("col", {
          key: R.key,
          style: R.style
        }))), this.showHeader ? lt(hm, {
          discrete: !1
        }) : null, this.empty ? null : lt("tbody", {
          "data-n-id": G,
          class: `${n}-data-table-tbody`
        }, pe.map((R, E) => P({
          rowInfo: R,
          displayedRowIndex: E,
          isVirtual: !1,
          isVirtualX: !1,
          startColIndex: -1,
          endColIndex: -1,
          getLeft(N) {
            return -1;
          }
        }))));
      }
    });
    if (this.empty) {
      const g = () => lt("div", {
        class: [`${n}-data-table-empty`, this.loading && `${n}-data-table-empty--hide`],
        style: this.bodyStyle,
        ref: "emptyElRef"
      }, dn(this.dataTableSlots.empty, () => [lt(Fg, {
        theme: this.mergedTheme.peers.Empty,
        themeOverrides: this.mergedTheme.peerOverrides.Empty
      })]));
      return this.shouldDisplaySomeTablePart ? lt(rF, null, u, g()) : lt(Hn, {
        onResize: this.onResize
      }, {
        default: g
      });
    }
    return u;
  }
}), cF = window.Vue.computed, uF = window.Vue.defineComponent, Rs = window.Vue.h, fF = window.Vue.inject, Ta = window.Vue.ref, hF = window.Vue.watchEffect, pF = uF({
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
    } = fF(Tn), d = Ta(null), c = Ta(null), h = Ta(null), p = Ta(!(n.value.length || t.value.length)), v = cF(() => ({
      maxHeight: Pt(r.value),
      minHeight: Pt(i.value)
    }));
    function u(b) {
      o.value = b.contentRect.width, s(), p.value || (p.value = !0);
    }
    function g() {
      var b;
      const {
        value: x
      } = d;
      return x ? a.value ? ((b = x.virtualListRef) === null || b === void 0 ? void 0 : b.listElRef) || null : x.$el : null;
    }
    function m() {
      const {
        value: b
      } = c;
      return b ? b.getScrollContainer() : null;
    }
    const f = {
      getBodyElement: m,
      getHeaderElement: g,
      scrollTo(b, x) {
        var y;
        (y = c.value) === null || y === void 0 || y.scrollTo(b, x);
      }
    };
    return hF(() => {
      const {
        value: b
      } = h;
      if (!b) return;
      const x = `${e.value}-data-table-base-table--transition-disabled`;
      p.value ? setTimeout(() => {
        b.classList.remove(x);
      }, 0) : b.classList.add(x);
    }), Object.assign({
      maxHeight: r,
      mergedClsPrefix: e,
      selfElRef: h,
      headerInstRef: d,
      bodyInstRef: c,
      bodyStyle: v,
      flexHeight: l,
      handleBodyResize: u
    }, f);
  },
  render() {
    const {
      mergedClsPrefix: e,
      maxHeight: t,
      flexHeight: n
    } = this, o = t === void 0 && !n;
    return Rs("div", {
      class: `${e}-data-table-base-table`,
      ref: "selfElRef"
    }, o ? null : Rs(hm, {
      ref: "headerInstRef"
    }), Rs(dF, {
      ref: "bodyInstRef",
      bodyStyle: this.bodyStyle,
      showHeader: o,
      flexHeight: n,
      onResize: this.handleBodyResize
    }));
  }
}), Wh = gF(), vF = D([T("data-table", `
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
 `, [T("data-table-wrapper", `
 flex-grow: 1;
 display: flex;
 flex-direction: column;
 `), B("flex-height", [D(">", [T("data-table-wrapper", [D(">", [T("data-table-base-table", `
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 `, [D(">", [T("data-table-base-table-body", "flex-basis: 0;", [
  // last-child means there is no empty icon
  // body is a scrollbar, we need to override height 100%
  D("&:last-child", "flex-grow: 1;")
])])])])])])]), D(">", [T("data-table-loading-wrapper", `
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
 `, [Vi({
  originalTransform: "translateX(-50%) translateY(-50%)"
})])]), T("data-table-expand-placeholder", `
 margin-right: 8px;
 display: inline-block;
 width: 16px;
 height: 1px;
 `), T("data-table-indent", `
 display: inline-block;
 height: 1px;
 `), T("data-table-expand-trigger", `
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
 `, [B("expanded", [T("icon", "transform: rotate(90deg);", [gn({
  originalTransform: "rotate(90deg)"
})]), T("base-icon", "transform: rotate(90deg);", [gn({
  originalTransform: "rotate(90deg)"
})])]), T("base-loading", `
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [gn()]), T("icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [gn()]), T("base-icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [gn()])]), T("data-table-thead", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-merged-th-color);
 `), T("data-table-tr", `
 position: relative;
 box-sizing: border-box;
 background-clip: padding-box;
 transition: background-color .3s var(--n-bezier);
 `, [T("data-table-expand", `
 position: sticky;
 left: 0;
 overflow: hidden;
 margin: calc(var(--n-th-padding) * -1);
 padding: var(--n-th-padding);
 box-sizing: border-box;
 `), B("striped", "background-color: var(--n-merged-td-color-striped);", [T("data-table-td", "background-color: var(--n-merged-td-color-striped);")]), rt("summary", [D("&:hover", "background-color: var(--n-merged-td-color-hover);", [D(">", [T("data-table-td", "background-color: var(--n-merged-td-color-hover);")])])])]), T("data-table-th", `
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
 `, [B("filterable", `
 padding-right: 36px;
 `, [B("sortable", `
 padding-right: calc(var(--n-th-padding) + 36px);
 `)]), Wh, B("selection", `
 padding: 0;
 text-align: center;
 line-height: 0;
 z-index: 3;
 `), A("title-wrapper", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 max-width: 100%;
 `, [A("title", `
 flex: 1;
 min-width: 0;
 `)]), A("ellipsis", `
 display: inline-block;
 vertical-align: bottom;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 `), B("hover", `
 background-color: var(--n-merged-th-color-hover);
 `), B("sorting", `
 background-color: var(--n-merged-th-color-sorting);
 `), B("sortable", `
 cursor: pointer;
 `, [A("ellipsis", `
 max-width: calc(100% - 18px);
 `), D("&:hover", `
 background-color: var(--n-merged-th-color-hover);
 `)]), T("data-table-sorter", `
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
 `, [T("base-icon", "transition: transform .3s var(--n-bezier)"), B("desc", [T("base-icon", `
 transform: rotate(0deg);
 `)]), B("asc", [T("base-icon", `
 transform: rotate(-180deg);
 `)]), B("asc, desc", `
 color: var(--n-th-icon-color-active);
 `)]), T("data-table-resize-button", `
 width: var(--n-resizable-container-size);
 position: absolute;
 top: 0;
 right: calc(var(--n-resizable-container-size) / 2);
 bottom: 0;
 cursor: col-resize;
 user-select: none;
 `, [D("&::after", `
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
 `), B("active", [D("&::after", ` 
 background-color: var(--n-th-icon-color-active);
 `)]), D("&:hover::after", `
 background-color: var(--n-th-icon-color-active);
 `)]), T("data-table-filter", `
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
 `, [D("&:hover", `
 background-color: var(--n-th-button-color-hover);
 `), B("show", `
 background-color: var(--n-th-button-color-hover);
 `), B("active", `
 background-color: var(--n-th-button-color-hover);
 color: var(--n-th-icon-color-active);
 `)])]), T("data-table-td", `
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
 `, [B("expand", [T("data-table-expand-trigger", `
 margin-right: 0;
 `)]), B("last-row", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [
  // make sure there is no overlap between bottom border and
  // fixed column box shadow
  D("&::after", `
 bottom: 0 !important;
 `),
  D("&::before", `
 bottom: 0 !important;
 `)
]), B("summary", `
 background-color: var(--n-merged-th-color);
 `), B("hover", `
 background-color: var(--n-merged-td-color-hover);
 `), B("sorting", `
 background-color: var(--n-merged-td-color-sorting);
 `), A("ellipsis", `
 display: inline-block;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 vertical-align: bottom;
 max-width: calc(100% - var(--indent-offset, -1.5) * 16px - 24px);
 `), B("selection, expand", `
 text-align: center;
 padding: 0;
 line-height: 0;
 `), Wh]), T("data-table-empty", `
 box-sizing: border-box;
 padding: var(--n-empty-padding);
 flex-grow: 1;
 flex-shrink: 0;
 opacity: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: opacity .3s var(--n-bezier);
 `, [B("hide", `
 opacity: 0;
 `)]), A("pagination", `
 margin: var(--n-pagination-margin);
 display: flex;
 justify-content: flex-end;
 `), T("data-table-wrapper", `
 position: relative;
 opacity: 1;
 transition: opacity .3s var(--n-bezier), border-color .3s var(--n-bezier);
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 line-height: var(--n-line-height);
 `), B("loading", [T("data-table-wrapper", `
 opacity: var(--n-opacity-loading);
 pointer-events: none;
 `)]), B("single-column", [T("data-table-td", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [D("&::after, &::before", `
 bottom: 0 !important;
 `)])]), rt("single-line", [T("data-table-th", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [B("last", `
 border-right: 0 solid var(--n-merged-border-color);
 `)]), T("data-table-td", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [B("last-col", `
 border-right: 0 solid var(--n-merged-border-color);
 `)])]), B("bordered", [T("data-table-wrapper", `
 border: 1px solid var(--n-merged-border-color);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 overflow: hidden;
 `)]), T("data-table-base-table", [B("transition-disabled", [T("data-table-th", [D("&::after, &::before", "transition: none;")]), T("data-table-td", [D("&::after, &::before", "transition: none;")])])]), B("bottom-bordered", [T("data-table-td", [B("last-row", `
 border-bottom: 1px solid var(--n-merged-border-color);
 `)])]), T("data-table-table", `
 font-variant-numeric: tabular-nums;
 width: 100%;
 word-break: break-word;
 transition: background-color .3s var(--n-bezier);
 border-collapse: separate;
 border-spacing: 0;
 background-color: var(--n-merged-td-color);
 `), T("data-table-base-table-header", `
 border-top-left-radius: calc(var(--n-border-radius) - 1px);
 border-top-right-radius: calc(var(--n-border-radius) - 1px);
 z-index: 3;
 overflow: scroll;
 flex-shrink: 0;
 transition: border-color .3s var(--n-bezier);
 scrollbar-width: none;
 `, [D("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 display: none;
 width: 0;
 height: 0;
 `)]), T("data-table-check-extra", `
 transition: color .3s var(--n-bezier);
 color: var(--n-th-icon-color);
 position: absolute;
 font-size: 14px;
 right: -4px;
 top: 50%;
 transform: translateY(-50%);
 z-index: 1;
 `)]), T("data-table-filter-menu", [T("scrollbar", `
 max-height: 240px;
 `), A("group", `
 display: flex;
 flex-direction: column;
 padding: 12px 12px 0 12px;
 `, [T("checkbox", `
 margin-bottom: 12px;
 margin-right: 0;
 `), T("radio", `
 margin-bottom: 12px;
 margin-right: 0;
 `)]), A("action", `
 padding: var(--n-action-padding);
 display: flex;
 flex-wrap: nowrap;
 justify-content: space-evenly;
 border-top: 1px solid var(--n-action-divider-color);
 `, [T("button", [D("&:not(:last-child)", `
 margin: var(--n-action-button-margin);
 `), D("&:last-child", `
 margin-right: 0;
 `)])]), T("divider", `
 margin: 0 !important;
 `)]), al(T("data-table", `
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 --n-merged-th-color-hover: var(--n-th-color-hover-modal);
 --n-merged-td-color-hover: var(--n-td-color-hover-modal);
 --n-merged-th-color-sorting: var(--n-th-color-hover-modal);
 --n-merged-td-color-sorting: var(--n-td-color-hover-modal);
 --n-merged-td-color-striped: var(--n-td-color-striped-modal);
 `)), qd(T("data-table", `
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 --n-merged-th-color-hover: var(--n-th-color-hover-popover);
 --n-merged-td-color-hover: var(--n-td-color-hover-popover);
 --n-merged-th-color-sorting: var(--n-th-color-hover-popover);
 --n-merged-td-color-sorting: var(--n-td-color-hover-popover);
 --n-merged-td-color-striped: var(--n-td-color-striped-popover);
 `))]);
function gF() {
  return [B("fixed-left", `
 left: 0;
 position: sticky;
 z-index: 2;
 `, [D("&::after", `
 pointer-events: none;
 content: "";
 width: 36px;
 display: inline-block;
 position: absolute;
 top: 0;
 bottom: -1px;
 transition: box-shadow .2s var(--n-bezier);
 right: -36px;
 `)]), B("fixed-right", `
 right: 0;
 position: sticky;
 z-index: 1;
 `, [D("&::before", `
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
const Mn = window.Vue.computed, mF = window.Vue.ref;
function bF(e, t) {
  const {
    paginatedDataRef: n,
    treeMateRef: o,
    selectionColumnRef: r
  } = t, i = mF(e.defaultCheckedRowKeys), l = Mn(() => {
    var S;
    const {
      checkedRowKeys: C
    } = e, w = C === void 0 ? i.value : C;
    return ((S = r.value) === null || S === void 0 ? void 0 : S.multiple) === !1 ? {
      checkedKeys: w.slice(0, 1),
      indeterminateKeys: []
    } : o.value.getCheckedKeys(w, {
      cascade: e.cascade,
      allowNotLoaded: e.allowCheckingNotLoaded
    });
  }), a = Mn(() => l.value.checkedKeys), s = Mn(() => l.value.indeterminateKeys), d = Mn(() => new Set(a.value)), c = Mn(() => new Set(s.value)), h = Mn(() => {
    const {
      value: S
    } = d;
    return n.value.reduce((C, w) => {
      const {
        key: $,
        disabled: k
      } = w;
      return C + (!k && S.has($) ? 1 : 0);
    }, 0);
  }), p = Mn(() => n.value.filter((S) => S.disabled).length), v = Mn(() => {
    const {
      length: S
    } = n.value, {
      value: C
    } = c;
    return h.value > 0 && h.value < S - p.value || n.value.some((w) => C.has(w.key));
  }), u = Mn(() => {
    const {
      length: S
    } = n.value;
    return h.value !== 0 && h.value === S - p.value;
  }), g = Mn(() => n.value.length === 0);
  function m(S, C, w) {
    const {
      "onUpdate:checkedRowKeys": $,
      onUpdateCheckedRowKeys: k,
      onCheckedRowKeysChange: O
    } = e, G = [], {
      value: {
        getNode: _
      }
    } = o;
    S.forEach((V) => {
      var I;
      const M = (I = _(V)) === null || I === void 0 ? void 0 : I.rawNode;
      G.push(M);
    }), $ && ce($, S, G, {
      row: C,
      action: w
    }), k && ce(k, S, G, {
      row: C,
      action: w
    }), O && ce(O, S, G, {
      row: C,
      action: w
    }), i.value = S;
  }
  function f(S, C = !1, w) {
    if (!e.loading) {
      if (C) {
        m(Array.isArray(S) ? S.slice(0, 1) : [S], w, "check");
        return;
      }
      m(o.value.check(S, a.value, {
        cascade: e.cascade,
        allowNotLoaded: e.allowCheckingNotLoaded
      }).checkedKeys, w, "check");
    }
  }
  function b(S, C) {
    e.loading || m(o.value.uncheck(S, a.value, {
      cascade: e.cascade,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, C, "uncheck");
  }
  function x(S = !1) {
    const {
      value: C
    } = r;
    if (!C || e.loading) return;
    const w = [];
    (S ? o.value.treeNodes : n.value).forEach(($) => {
      $.disabled || w.push($.key);
    }), m(o.value.check(w, a.value, {
      cascade: !0,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, void 0, "checkAll");
  }
  function y(S = !1) {
    const {
      value: C
    } = r;
    if (!C || e.loading) return;
    const w = [];
    (S ? o.value.treeNodes : n.value).forEach(($) => {
      $.disabled || w.push($.key);
    }), m(o.value.uncheck(w, a.value, {
      cascade: !0,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, void 0, "uncheckAll");
  }
  return {
    mergedCheckedRowKeySetRef: d,
    mergedCheckedRowKeysRef: a,
    mergedInderminateRowKeySetRef: c,
    someRowsCheckedRef: v,
    allRowsCheckedRef: u,
    headerCheckboxDisabledRef: g,
    doUpdateCheckedRowKeys: m,
    doCheckAll: x,
    doUncheckAll: y,
    doCheck: f,
    doUncheck: b
  };
}
const wF = window.Vue.ref, Uh = window.Vue.toRef;
function yF(e, t) {
  const n = Ae(() => {
    for (const d of e.columns)
      if (d.type === "expand")
        return d.renderExpand;
  }), o = Ae(() => {
    let d;
    for (const c of e.columns)
      if (c.type === "expand") {
        d = c.expandable;
        break;
      }
    return d;
  }), r = wF(e.defaultExpandAll ? n != null && n.value ? (() => {
    const d = [];
    return t.value.treeNodes.forEach((c) => {
      var h;
      !((h = o.value) === null || h === void 0) && h.call(o, c.rawNode) && d.push(c.key);
    }), d;
  })() : t.value.getNonLeafKeys() : e.defaultExpandedRowKeys), i = Uh(e, "expandedRowKeys"), l = Uh(e, "stickyExpandedRows"), a = Bt(i, r);
  function s(d) {
    const {
      onUpdateExpandedRowKeys: c,
      "onUpdate:expandedRowKeys": h
    } = e;
    c && ce(c, d), h && ce(h, d), r.value = d;
  }
  return {
    stickyExpandedRowsRef: l,
    mergedExpandedRowKeysRef: a,
    renderExpandRef: n,
    expandableRef: o,
    doUpdateExpandedRowKeys: s
  };
}
const ri = window.Vue.computed;
function xF(e, t) {
  const n = [], o = [], r = [], i = /* @__PURE__ */ new WeakMap();
  let l = -1, a = 0, s = !1, d = 0;
  function c(p, v) {
    v > l && (n[v] = [], l = v), p.forEach((u) => {
      if ("children" in u)
        c(u.children, v + 1);
      else {
        const g = "key" in u ? u.key : void 0;
        o.push({
          key: $n(u),
          style: a_(u, g !== void 0 ? Pt(t(g)) : void 0),
          column: u,
          index: d++,
          // The width property is only applied to horizontally virtual scroll table
          width: u.width === void 0 ? 128 : Number(u.width)
        }), a += 1, s || (s = !!u.ellipsis), r.push(u);
      }
    });
  }
  c(e, 0), d = 0;
  function h(p, v) {
    let u = 0;
    p.forEach((g) => {
      var m;
      if ("children" in g) {
        const f = d, b = {
          column: g,
          colIndex: d,
          colSpan: 0,
          rowSpan: 1,
          isLast: !1
        };
        h(g.children, v + 1), g.children.forEach((x) => {
          var y, S;
          b.colSpan += (S = (y = i.get(x)) === null || y === void 0 ? void 0 : y.colSpan) !== null && S !== void 0 ? S : 0;
        }), f + b.colSpan === a && (b.isLast = !0), i.set(g, b), n[v].push(b);
      } else {
        if (d < u) {
          d += 1;
          return;
        }
        let f = 1;
        "titleColSpan" in g && (f = (m = g.titleColSpan) !== null && m !== void 0 ? m : 1), f > 1 && (u = d + f);
        const b = d + f === a, x = {
          column: g,
          colSpan: f,
          colIndex: d,
          rowSpan: l - v + 1,
          isLast: b
        };
        i.set(g, x), n[v].push(x), d += 1;
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
function CF(e, t) {
  const n = ri(() => xF(e.columns, t));
  return {
    rowsRef: ri(() => n.value.rows),
    colsRef: ri(() => n.value.cols),
    hasEllipsisRef: ri(() => n.value.hasEllipsis),
    dataRelatedColsRef: ri(() => n.value.dataRelatedCols)
  };
}
const SF = window.Vue.ref;
function $F() {
  const e = SF({});
  function t(r) {
    return e.value[r];
  }
  function n(r, i) {
    Qg(r) && "key" in r && (e.value[r.key] = i);
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
const ii = window.Vue.computed, ai = window.Vue.ref, kF = window.Vue.watch;
function RF(e, {
  mainTableInstRef: t,
  mergedCurrentPageRef: n,
  bodyWidthRef: o
}) {
  let r = 0;
  const i = ai(), l = ai(null), a = ai([]), s = ai(null), d = ai([]), c = ii(() => Pt(e.scrollX)), h = ii(() => e.columns.filter((k) => k.fixed === "left")), p = ii(() => e.columns.filter((k) => k.fixed === "right")), v = ii(() => {
    const k = {};
    let O = 0;
    function G(_) {
      _.forEach((V) => {
        const I = {
          start: O,
          end: 0
        };
        k[$n(V)] = I, "children" in V ? (G(V.children), I.end = O) : (O += Ch(V) || 0, I.end = O);
      });
    }
    return G(h.value), k;
  }), u = ii(() => {
    const k = {};
    let O = 0;
    function G(_) {
      for (let V = _.length - 1; V >= 0; --V) {
        const I = _[V], M = {
          start: O,
          end: 0
        };
        k[$n(I)] = M, "children" in I ? (G(I.children), M.end = O) : (O += Ch(I) || 0, M.end = O);
      }
    }
    return G(p.value), k;
  });
  function g() {
    var k, O;
    const {
      value: G
    } = h;
    let _ = 0;
    const {
      value: V
    } = v;
    let I = null;
    for (let M = 0; M < G.length; ++M) {
      const X = $n(G[M]);
      if (r > (((k = V[X]) === null || k === void 0 ? void 0 : k.start) || 0) - _)
        I = X, _ = ((O = V[X]) === null || O === void 0 ? void 0 : O.end) || 0;
      else
        break;
    }
    l.value = I;
  }
  function m() {
    a.value = [];
    let k = e.columns.find((O) => $n(O) === l.value);
    for (; k && "children" in k; ) {
      const O = k.children.length;
      if (O === 0) break;
      const G = k.children[O - 1];
      a.value.push($n(G)), k = G;
    }
  }
  function f() {
    var k, O;
    const {
      value: G
    } = p, _ = Number(e.scrollX), {
      value: V
    } = o;
    if (V === null) return;
    let I = 0, M = null;
    const {
      value: X
    } = u;
    for (let H = G.length - 1; H >= 0; --H) {
      const Q = $n(G[H]);
      if (Math.round(r + (((k = X[Q]) === null || k === void 0 ? void 0 : k.start) || 0) + V - I) < _)
        M = Q, I = ((O = X[Q]) === null || O === void 0 ? void 0 : O.end) || 0;
      else
        break;
    }
    s.value = M;
  }
  function b() {
    d.value = [];
    let k = e.columns.find((O) => $n(O) === s.value);
    for (; k && "children" in k && k.children.length; ) {
      const O = k.children[0];
      d.value.push($n(O)), k = O;
    }
  }
  function x() {
    const k = t.value ? t.value.getHeaderElement() : null, O = t.value ? t.value.getBodyElement() : null;
    return {
      header: k,
      body: O
    };
  }
  function y() {
    const {
      body: k
    } = x();
    k && (k.scrollTop = 0);
  }
  function S() {
    i.value !== "body" ? $i(w) : i.value = void 0;
  }
  function C(k) {
    var O;
    (O = e.onScroll) === null || O === void 0 || O.call(e, k), i.value !== "head" ? $i(w) : i.value = void 0;
  }
  function w() {
    const {
      header: k,
      body: O
    } = x();
    if (!O) return;
    const {
      value: G
    } = o;
    if (G !== null) {
      if (e.maxHeight || e.flexHeight) {
        if (!k) return;
        const _ = r - k.scrollLeft;
        i.value = _ !== 0 ? "head" : "body", i.value === "head" ? (r = k.scrollLeft, O.scrollLeft = r) : (r = O.scrollLeft, k.scrollLeft = r);
      } else
        r = O.scrollLeft;
      g(), m(), f(), b();
    }
  }
  function $(k) {
    const {
      header: O
    } = x();
    O && (O.scrollLeft = k, w());
  }
  return kF(n, () => {
    y();
  }), {
    styleScrollXRef: c,
    fixedColumnLeftMapRef: v,
    fixedColumnRightMapRef: u,
    leftFixedColumnsRef: h,
    rightFixedColumnsRef: p,
    leftActiveFixedColKeyRef: l,
    leftActiveFixedChildrenColKeysRef: a,
    rightActiveFixedColKeyRef: s,
    rightActiveFixedChildrenColKeysRef: d,
    syncScrollState: w,
    handleTableBodyScroll: C,
    handleTableHeaderScroll: S,
    setHeaderScrollLeft: $
  };
}
const Kh = window.Vue.computed, PF = window.Vue.ref;
function _a(e) {
  return typeof e == "object" && typeof e.multiple == "number" ? e.multiple : !1;
}
function TF(e, t) {
  return t && (e === void 0 || e === "default" || typeof e == "object" && e.compare === "default") ? _F(t) : typeof e == "function" ? e : e && typeof e == "object" && e.compare && e.compare !== "default" ? e.compare : !1;
}
function _F(e) {
  return (t, n) => {
    const o = t[e], r = n[e];
    return o == null ? r == null ? 0 : -1 : r == null ? 1 : typeof o == "number" && typeof r == "number" ? o - r : typeof o == "string" && typeof r == "string" ? o.localeCompare(r) : 0;
  };
}
function FF(e, {
  dataRelatedColsRef: t,
  filteredDataRef: n
}) {
  const o = [];
  t.value.forEach((v) => {
    var u;
    v.sorter !== void 0 && p(o, {
      columnKey: v.key,
      sorter: v.sorter,
      order: (u = v.defaultSortOrder) !== null && u !== void 0 ? u : !1
    });
  });
  const r = PF(o), i = Kh(() => {
    const v = t.value.filter((m) => m.type !== "selection" && m.sorter !== void 0 && (m.sortOrder === "ascend" || m.sortOrder === "descend" || m.sortOrder === !1)), u = v.filter((m) => m.sortOrder !== !1);
    if (u.length)
      return u.map((m) => ({
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
  }), l = Kh(() => {
    const v = i.value.slice().sort((u, g) => {
      const m = _a(u.sorter) || 0;
      return (_a(g.sorter) || 0) - m;
    });
    return v.length ? n.value.slice().sort((g, m) => {
      let f = 0;
      return v.some((b) => {
        const {
          columnKey: x,
          sorter: y,
          order: S
        } = b, C = TF(y, x);
        return C && S && (f = C(g.rawNode, m.rawNode), f !== 0) ? (f = f * r_(S), !0) : !1;
      }), f;
    }) : n.value;
  });
  function a(v) {
    let u = i.value.slice();
    return v && _a(v.sorter) !== !1 ? (u = u.filter((g) => _a(g.sorter) !== !1), p(u, v), u) : v || null;
  }
  function s(v) {
    const u = a(v);
    d(u);
  }
  function d(v) {
    const {
      "onUpdate:sorter": u,
      onUpdateSorter: g,
      onSorterChange: m
    } = e;
    u && ce(u, v), g && ce(g, v), m && ce(m, v), r.value = v;
  }
  function c(v, u = "ascend") {
    if (!v)
      h();
    else {
      const g = t.value.find((f) => f.type !== "selection" && f.type !== "expand" && f.key === v);
      if (!(g != null && g.sorter)) return;
      const m = g.sorter;
      s({
        columnKey: v,
        sorter: m,
        order: u
      });
    }
  }
  function h() {
    d(null);
  }
  function p(v, u) {
    const g = v.findIndex((m) => (u == null ? void 0 : u.columnKey) && m.columnKey === u.columnKey);
    g !== void 0 && g >= 0 ? v[g] = u : v.push(u);
  }
  return {
    clearSorter: h,
    sort: c,
    sortedDataRef: l,
    mergedSortStateRef: i,
    deriveNextSorter: s
  };
}
const Sn = window.Vue.computed, Fa = window.Vue.ref;
function EF(e, {
  dataRelatedColsRef: t
}) {
  const n = Sn(() => {
    const Y = (L) => {
      for (let Z = 0; Z < L.length; ++Z) {
        const ee = L[Z];
        if ("children" in ee)
          return Y(ee.children);
        if (ee.type === "selection")
          return ee;
      }
      return null;
    };
    return Y(e.columns);
  }), o = Sn(() => {
    const {
      childrenKey: Y
    } = e;
    return gl(e.data, {
      ignoreEmptyChildren: !0,
      getKey: e.rowKey,
      getChildren: (L) => L[Y],
      getDisabled: (L) => {
        var Z, ee;
        return !!(!((ee = (Z = n.value) === null || Z === void 0 ? void 0 : Z.disabled) === null || ee === void 0) && ee.call(Z, L));
      }
    });
  }), r = Ae(() => {
    const {
      columns: Y
    } = e, {
      length: L
    } = Y;
    let Z = null;
    for (let ee = 0; ee < L; ++ee) {
      const ue = Y[ee];
      if (!ue.type && Z === null && (Z = ee), "tree" in ue && ue.tree)
        return ee;
    }
    return Z || 0;
  }), i = Fa({}), {
    pagination: l
  } = e, a = Fa(l && l.defaultPage || 1), s = Fa(qg(l)), d = Sn(() => {
    const Y = t.value.filter((ee) => ee.filterOptionValues !== void 0 || ee.filterOptionValue !== void 0), L = {};
    return Y.forEach((ee) => {
      var ue;
      ee.type === "selection" || ee.type === "expand" || (ee.filterOptionValues === void 0 ? L[ee.key] = (ue = ee.filterOptionValue) !== null && ue !== void 0 ? ue : null : L[ee.key] = ee.filterOptionValues);
    }), Object.assign(Sh(i.value), L);
  }), c = Sn(() => {
    const Y = d.value, {
      columns: L
    } = e;
    function Z(fe) {
      return (ve, xe) => !!~String(xe[fe]).indexOf(String(ve));
    }
    const {
      value: {
        treeNodes: ee
      }
    } = o, ue = [];
    return L.forEach((fe) => {
      fe.type === "selection" || fe.type === "expand" || "children" in fe || ue.push([fe.key, fe]);
    }), ee ? ee.filter((fe) => {
      const {
        rawNode: ve
      } = fe;
      for (const [xe, J] of ue) {
        let pe = Y[xe];
        if (pe == null || (Array.isArray(pe) || (pe = [pe]), !pe.length)) continue;
        const j = J.filter === "default" ? Z(xe) : J.filter;
        if (J && typeof j == "function")
          if (J.filterMode === "and") {
            if (pe.some((W) => !j(W, ve)))
              return !1;
          } else {
            if (pe.some((W) => j(W, ve)))
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
    sort: u,
    clearSorter: g
  } = FF(e, {
    dataRelatedColsRef: t,
    filteredDataRef: c
  });
  t.value.forEach((Y) => {
    var L;
    if (Y.filter) {
      const Z = Y.defaultFilterOptionValues;
      Y.filterMultiple ? i.value[Y.key] = Z || [] : Z !== void 0 ? i.value[Y.key] = Z === null ? [] : Z : i.value[Y.key] = (L = Y.defaultFilterOptionValue) !== null && L !== void 0 ? L : null;
    }
  });
  const m = Sn(() => {
    const {
      pagination: Y
    } = e;
    if (Y !== !1)
      return Y.page;
  }), f = Sn(() => {
    const {
      pagination: Y
    } = e;
    if (Y !== !1)
      return Y.pageSize;
  }), b = Bt(m, a), x = Bt(f, s), y = Ae(() => {
    const Y = b.value;
    return e.remote ? Y : Math.max(1, Math.min(Math.ceil(c.value.length / x.value), Y));
  }), S = Sn(() => {
    const {
      pagination: Y
    } = e;
    if (Y) {
      const {
        pageCount: L
      } = Y;
      if (L !== void 0) return L;
    }
  }), C = Sn(() => {
    if (e.remote) return o.value.treeNodes;
    if (!e.pagination) return h.value;
    const Y = x.value, L = (y.value - 1) * Y;
    return h.value.slice(L, L + Y);
  }), w = Sn(() => C.value.map((Y) => Y.rawNode));
  function $(Y) {
    const {
      pagination: L
    } = e;
    if (L) {
      const {
        onChange: Z,
        "onUpdate:page": ee,
        onUpdatePage: ue
      } = L;
      Z && ce(Z, Y), ue && ce(ue, Y), ee && ce(ee, Y), _(Y);
    }
  }
  function k(Y) {
    const {
      pagination: L
    } = e;
    if (L) {
      const {
        onPageSizeChange: Z,
        "onUpdate:pageSize": ee,
        onUpdatePageSize: ue
      } = L;
      Z && ce(Z, Y), ue && ce(ue, Y), ee && ce(ee, Y), V(Y);
    }
  }
  const O = Sn(() => {
    if (e.remote) {
      const {
        pagination: Y
      } = e;
      if (Y) {
        const {
          itemCount: L
        } = Y;
        if (L !== void 0) return L;
      }
      return;
    }
    return c.value.length;
  }), G = Sn(() => Object.assign(Object.assign({}, e.pagination), {
    // reset deprecated methods
    onChange: void 0,
    onUpdatePage: void 0,
    onUpdatePageSize: void 0,
    onPageSizeChange: void 0,
    "onUpdate:page": $,
    "onUpdate:pageSize": k,
    // writing merged props after pagination to avoid
    // pagination[key] === undefined
    // key still exists but value is undefined
    page: y.value,
    pageSize: x.value,
    pageCount: O.value === void 0 ? S.value : void 0,
    itemCount: O.value
  }));
  function _(Y) {
    const {
      "onUpdate:page": L,
      onPageChange: Z,
      onUpdatePage: ee
    } = e;
    ee && ce(ee, Y), L && ce(L, Y), Z && ce(Z, Y), a.value = Y;
  }
  function V(Y) {
    const {
      "onUpdate:pageSize": L,
      onPageSizeChange: Z,
      onUpdatePageSize: ee
    } = e;
    Z && ce(Z, Y), ee && ce(ee, Y), L && ce(L, Y), s.value = Y;
  }
  function I(Y, L) {
    const {
      onUpdateFilters: Z,
      "onUpdate:filters": ee,
      onFiltersChange: ue
    } = e;
    Z && ce(Z, Y, L), ee && ce(ee, Y, L), ue && ce(ue, Y, L), i.value = Y;
  }
  function M(Y, L, Z, ee) {
    var ue;
    (ue = e.onUnstableColumnResize) === null || ue === void 0 || ue.call(e, Y, L, Z, ee);
  }
  function X(Y) {
    _(Y);
  }
  function H() {
    Q();
  }
  function Q() {
    oe({});
  }
  function oe(Y) {
    te(Y);
  }
  function te(Y) {
    Y ? Y && (i.value = Sh(Y)) : i.value = {};
  }
  return {
    treeMateRef: o,
    mergedCurrentPageRef: y,
    mergedPaginationRef: G,
    paginatedDataRef: C,
    rawPaginatedDataRef: w,
    mergedFilterStateRef: d,
    mergedSortStateRef: v,
    hoverKeyRef: Fa(null),
    selectionColumnRef: n,
    childTriggerColIndexRef: r,
    doUpdateFilters: I,
    deriveNextSorter: p,
    doUpdatePageSize: V,
    doUpdatePage: _,
    onUnstableColumnResize: M,
    // exported methods
    filter: te,
    filters: oe,
    clearFilter: H,
    clearFilters: Q,
    clearSorter: g,
    page: X,
    sort: u
  };
}
const yo = window.Vue.computed, zF = window.Vue.defineComponent, xo = window.Vue.h, OF = window.Vue.provide, Ps = window.Vue.ref, wt = window.Vue.toRef, MF = window.Vue.Transition;
window.Vue.watchEffect;
const qh = zF({
  name: "DataTable",
  alias: ["AdvancedTable"],
  props: n_,
  slots: Object,
  setup(e, {
    slots: t
  }) {
    const {
      mergedBorderedRef: n,
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = He(e), l = Lt("DataTable", i, o), a = yo(() => {
      const {
        bottomBordered: F
      } = e;
      return n.value ? !1 : F !== void 0 ? F : !0;
    }), s = Pe("DataTable", "-data-table", vF, t_, e, o), d = Ps(null), c = Ps(null), {
      getResizableWidth: h,
      clearResizableWidth: p,
      doUpdateResizableWidth: v
    } = $F(), {
      rowsRef: u,
      colsRef: g,
      dataRelatedColsRef: m,
      hasEllipsisRef: f
    } = CF(e, h), {
      treeMateRef: b,
      mergedCurrentPageRef: x,
      paginatedDataRef: y,
      rawPaginatedDataRef: S,
      selectionColumnRef: C,
      hoverKeyRef: w,
      mergedPaginationRef: $,
      mergedFilterStateRef: k,
      mergedSortStateRef: O,
      childTriggerColIndexRef: G,
      doUpdatePage: _,
      doUpdateFilters: V,
      onUnstableColumnResize: I,
      deriveNextSorter: M,
      filter: X,
      filters: H,
      clearFilter: Q,
      clearFilters: oe,
      clearSorter: te,
      page: Y,
      sort: L
    } = EF(e, {
      dataRelatedColsRef: m
    }), Z = (F) => {
      const {
        fileName: q = "data.csv",
        keepOriginalData: ae = !1
      } = F || {}, ge = ae ? e.data : S.value, be = c_(e.columns, ge, e.getCsvCell, e.getCsvHeader), Ce = new Blob([be], {
        type: "text/csv;charset=utf-8"
      }), Se = URL.createObjectURL(Ce);
      T1(Se, q.endsWith(".csv") ? q : `${q}.csv`), URL.revokeObjectURL(Se);
    }, {
      doCheckAll: ee,
      doUncheckAll: ue,
      doCheck: fe,
      doUncheck: ve,
      headerCheckboxDisabledRef: xe,
      someRowsCheckedRef: J,
      allRowsCheckedRef: pe,
      mergedCheckedRowKeySetRef: j,
      mergedInderminateRowKeySetRef: W
    } = bF(e, {
      selectionColumnRef: C,
      treeMateRef: b,
      paginatedDataRef: y
    }), {
      stickyExpandedRowsRef: ie,
      mergedExpandedRowKeysRef: ye,
      renderExpandRef: Me,
      expandableRef: ze,
      doUpdateExpandedRowKeys: se
    } = yF(e, b), {
      handleTableBodyScroll: P,
      handleTableHeaderScroll: R,
      syncScrollState: E,
      setHeaderScrollLeft: N,
      leftActiveFixedColKeyRef: re,
      leftActiveFixedChildrenColKeysRef: de,
      rightActiveFixedColKeyRef: z,
      rightActiveFixedChildrenColKeysRef: K,
      leftFixedColumnsRef: me,
      rightFixedColumnsRef: _e,
      fixedColumnLeftMapRef: Ge,
      fixedColumnRightMapRef: vt
    } = RF(e, {
      bodyWidthRef: d,
      mainTableInstRef: c,
      mergedCurrentPageRef: x
    }), {
      localeRef: Xe
    } = Er("DataTable"), Ye = yo(() => e.virtualScroll || e.flexHeight || e.maxHeight !== void 0 || f.value ? "fixed" : e.tableLayout);
    OF(Tn, {
      props: e,
      treeMateRef: b,
      renderExpandIconRef: wt(e, "renderExpandIcon"),
      loadingKeySetRef: Ps(/* @__PURE__ */ new Set()),
      slots: t,
      indentRef: wt(e, "indent"),
      childTriggerColIndexRef: G,
      bodyWidthRef: d,
      componentId: ki(),
      hoverKeyRef: w,
      mergedClsPrefixRef: o,
      mergedThemeRef: s,
      scrollXRef: yo(() => e.scrollX),
      rowsRef: u,
      colsRef: g,
      paginatedDataRef: y,
      leftActiveFixedColKeyRef: re,
      leftActiveFixedChildrenColKeysRef: de,
      rightActiveFixedColKeyRef: z,
      rightActiveFixedChildrenColKeysRef: K,
      leftFixedColumnsRef: me,
      rightFixedColumnsRef: _e,
      fixedColumnLeftMapRef: Ge,
      fixedColumnRightMapRef: vt,
      mergedCurrentPageRef: x,
      someRowsCheckedRef: J,
      allRowsCheckedRef: pe,
      mergedSortStateRef: O,
      mergedFilterStateRef: k,
      loadingRef: wt(e, "loading"),
      rowClassNameRef: wt(e, "rowClassName"),
      mergedCheckedRowKeySetRef: j,
      mergedExpandedRowKeysRef: ye,
      mergedInderminateRowKeySetRef: W,
      localeRef: Xe,
      expandableRef: ze,
      stickyExpandedRowsRef: ie,
      rowKeyRef: wt(e, "rowKey"),
      renderExpandRef: Me,
      summaryRef: wt(e, "summary"),
      virtualScrollRef: wt(e, "virtualScroll"),
      virtualScrollXRef: wt(e, "virtualScrollX"),
      heightForRowRef: wt(e, "heightForRow"),
      minRowHeightRef: wt(e, "minRowHeight"),
      virtualScrollHeaderRef: wt(e, "virtualScrollHeader"),
      headerHeightRef: wt(e, "headerHeight"),
      rowPropsRef: wt(e, "rowProps"),
      stripedRef: wt(e, "striped"),
      checkOptionsRef: yo(() => {
        const {
          value: F
        } = C;
        return F == null ? void 0 : F.options;
      }),
      rawPaginatedDataRef: S,
      filterMenuCssVarsRef: yo(() => {
        const {
          self: {
            actionDividerColor: F,
            actionPadding: q,
            actionButtonMargin: ae
          }
        } = s.value;
        return {
          "--n-action-padding": q,
          "--n-action-button-margin": ae,
          "--n-action-divider-color": F
        };
      }),
      onLoadRef: wt(e, "onLoad"),
      mergedTableLayoutRef: Ye,
      maxHeightRef: wt(e, "maxHeight"),
      minHeightRef: wt(e, "minHeight"),
      flexHeightRef: wt(e, "flexHeight"),
      headerCheckboxDisabledRef: xe,
      paginationBehaviorOnFilterRef: wt(e, "paginationBehaviorOnFilter"),
      summaryPlacementRef: wt(e, "summaryPlacement"),
      filterIconPopoverPropsRef: wt(e, "filterIconPopoverProps"),
      scrollbarPropsRef: wt(e, "scrollbarProps"),
      syncScrollState: E,
      doUpdatePage: _,
      doUpdateFilters: V,
      getResizableWidth: h,
      onUnstableColumnResize: I,
      clearResizableWidth: p,
      doUpdateResizableWidth: v,
      deriveNextSorter: M,
      doCheck: fe,
      doUncheck: ve,
      doCheckAll: ee,
      doUncheckAll: ue,
      doUpdateExpandedRowKeys: se,
      handleTableHeaderScroll: R,
      handleTableBodyScroll: P,
      setHeaderScrollLeft: N,
      renderCell: wt(e, "renderCell")
    });
    const bt = {
      filter: X,
      filters: H,
      clearFilters: oe,
      clearSorter: te,
      page: Y,
      sort: L,
      clearFilter: Q,
      downloadCsv: Z,
      scrollTo: (F, q) => {
        var ae;
        (ae = c.value) === null || ae === void 0 || ae.scrollTo(F, q);
      }
    }, tt = yo(() => {
      const {
        size: F
      } = e, {
        common: {
          cubicBezierEaseInOut: q
        },
        self: {
          borderColor: ae,
          tdColorHover: ge,
          tdColorSorting: be,
          tdColorSortingModal: Ce,
          tdColorSortingPopover: Se,
          thColorSorting: Te,
          thColorSortingModal: Be,
          thColorSortingPopover: it,
          thColor: je,
          thColorHover: _t,
          tdColor: Mt,
          tdTextColor: Vt,
          thTextColor: Nt,
          thFontWeight: Dt,
          thButtonColorHover: Zt,
          thIconColor: Jt,
          thIconColorActive: U,
          filterSize: le,
          borderRadius: Re,
          lineHeight: Ie,
          tdColorModal: Ze,
          thColorModal: De,
          borderColorModal: dt,
          thColorHoverModal: gt,
          tdColorHoverModal: rn,
          borderColorPopover: Xn,
          thColorPopover: Yn,
          tdColorPopover: Mo,
          tdColorHoverPopover: Br,
          thColorHoverPopover: Lr,
          paginationMargin: Nr,
          emptyPadding: Dr,
          boxShadowAfter: Hr,
          boxShadowBefore: fo,
          sorterSize: ho,
          resizableContainerSize: wl,
          resizableSize: yl,
          loadingColor: xl,
          loadingSize: Cl,
          opacityLoading: Sl,
          tdColorStriped: $l,
          tdColorStripedModal: kl,
          tdColorStripedPopover: Rl,
          [ne("fontSize", F)]: Pl,
          [ne("thPadding", F)]: Tl,
          [ne("tdPadding", F)]: _l
        }
      } = s.value;
      return {
        "--n-font-size": Pl,
        "--n-th-padding": Tl,
        "--n-td-padding": _l,
        "--n-bezier": q,
        "--n-border-radius": Re,
        "--n-line-height": Ie,
        "--n-border-color": ae,
        "--n-border-color-modal": dt,
        "--n-border-color-popover": Xn,
        "--n-th-color": je,
        "--n-th-color-hover": _t,
        "--n-th-color-modal": De,
        "--n-th-color-hover-modal": gt,
        "--n-th-color-popover": Yn,
        "--n-th-color-hover-popover": Lr,
        "--n-td-color": Mt,
        "--n-td-color-hover": ge,
        "--n-td-color-modal": Ze,
        "--n-td-color-hover-modal": rn,
        "--n-td-color-popover": Mo,
        "--n-td-color-hover-popover": Br,
        "--n-th-text-color": Nt,
        "--n-td-text-color": Vt,
        "--n-th-font-weight": Dt,
        "--n-th-button-color-hover": Zt,
        "--n-th-icon-color": Jt,
        "--n-th-icon-color-active": U,
        "--n-filter-size": le,
        "--n-pagination-margin": Nr,
        "--n-empty-padding": Dr,
        "--n-box-shadow-before": fo,
        "--n-box-shadow-after": Hr,
        "--n-sorter-size": ho,
        "--n-resizable-container-size": wl,
        "--n-resizable-size": yl,
        "--n-loading-size": Cl,
        "--n-loading-color": xl,
        "--n-opacity-loading": Sl,
        "--n-td-color-striped": $l,
        "--n-td-color-striped-modal": kl,
        "--n-td-color-striped-popover": Rl,
        "--n-td-color-sorting": be,
        "--n-td-color-sorting-modal": Ce,
        "--n-td-color-sorting-popover": Se,
        "--n-th-color-sorting": Te,
        "--n-th-color-sorting-modal": Be,
        "--n-th-color-sorting-popover": it
      };
    }), we = r ? mt("data-table", yo(() => e.size[0]), tt, e) : void 0, Fe = yo(() => {
      if (!e.pagination) return !1;
      if (e.paginateSinglePage) return !0;
      const F = $.value, {
        pageCount: q
      } = F;
      return q !== void 0 ? q > 1 : F.itemCount && F.pageSize && F.itemCount > F.pageSize;
    });
    return Object.assign({
      mainTableInstRef: c,
      mergedClsPrefix: o,
      rtlEnabled: l,
      mergedTheme: s,
      paginatedData: y,
      mergedBordered: n,
      mergedBottomBordered: a,
      mergedPagination: $,
      mergedShowPagination: Fe,
      cssVars: r ? void 0 : tt,
      themeClass: we == null ? void 0 : we.themeClass,
      onRender: we == null ? void 0 : we.onRender
    }, bt);
  },
  render() {
    const {
      mergedClsPrefix: e,
      themeClass: t,
      onRender: n,
      $slots: o,
      spinProps: r
    } = this;
    return n == null || n(), xo("div", {
      class: [`${e}-data-table`, this.rtlEnabled && `${e}-data-table--rtl`, t, {
        [`${e}-data-table--bordered`]: this.mergedBordered,
        [`${e}-data-table--bottom-bordered`]: this.mergedBottomBordered,
        [`${e}-data-table--single-line`]: this.singleLine,
        [`${e}-data-table--single-column`]: this.singleColumn,
        [`${e}-data-table--loading`]: this.loading,
        [`${e}-data-table--flex-height`]: this.flexHeight
      }],
      style: this.cssVars
    }, xo("div", {
      class: `${e}-data-table-wrapper`
    }, xo(pF, {
      ref: "mainTableInstRef"
    })), this.mergedShowPagination ? xo("div", {
      class: `${e}-data-table__pagination`
    }, xo(K5, Object.assign({
      theme: this.mergedTheme.peers.Pagination,
      themeOverrides: this.mergedTheme.peerOverrides.Pagination,
      disabled: this.loading
    }, this.mergedPagination))) : null, xo(MF, {
      name: "fade-in-scale-up-transition"
    }, {
      default: () => this.loading ? xo("div", {
        class: `${e}-data-table-loading-wrapper`
      }, dn(o.loading, () => [xo(Mr, Object.assign({
        clsPrefix: e,
        strokeWidth: 20
      }, r))])) : null
    }));
  }
}), VF = "n-dialog-provider", IF = {
  titleFontSize: "18px",
  padding: "16px 28px 20px 28px",
  iconSize: "28px",
  actionSpace: "12px",
  contentMargin: "8px 0 16px 0",
  iconMargin: "0 4px 0 0",
  iconMarginIconTop: "4px 0 8px 0",
  closeSize: "22px",
  closeIconSize: "18px",
  closeMargin: "20px 26px 0 0",
  closeMarginIconTop: "10px 16px 0 0"
};
function AF(e) {
  const {
    textColor1: t,
    textColor2: n,
    modalColor: o,
    closeIconColor: r,
    closeIconColorHover: i,
    closeIconColorPressed: l,
    closeColorHover: a,
    closeColorPressed: s,
    infoColor: d,
    successColor: c,
    warningColor: h,
    errorColor: p,
    primaryColor: v,
    dividerColor: u,
    borderRadius: g,
    fontWeightStrong: m,
    lineHeight: f,
    fontSize: b
  } = e;
  return Object.assign(Object.assign({}, IF), {
    fontSize: b,
    lineHeight: f,
    border: `1px solid ${u}`,
    titleTextColor: t,
    textColor: n,
    color: o,
    closeColorHover: a,
    closeColorPressed: s,
    closeIconColor: r,
    closeIconColorHover: i,
    closeIconColorPressed: l,
    closeBorderRadius: g,
    iconColor: v,
    iconColorInfo: d,
    iconColorSuccess: c,
    iconColorWarning: h,
    iconColorError: p,
    borderRadius: g,
    titleFontWeight: m
  });
}
const vm = {
  name: "Dialog",
  common: ut,
  peers: {
    Button: ml
  },
  self: AF
}, Pc = {
  icon: Function,
  type: {
    type: String,
    default: "default"
  },
  title: [String, Function],
  closable: {
    type: Boolean,
    default: !0
  },
  negativeText: String,
  positiveText: String,
  positiveButtonProps: Object,
  negativeButtonProps: Object,
  content: [String, Function],
  action: Function,
  showIcon: {
    type: Boolean,
    default: !0
  },
  loading: Boolean,
  bordered: Boolean,
  iconPlacement: String,
  titleClass: [String, Array],
  titleStyle: [String, Object],
  contentClass: [String, Array],
  contentStyle: [String, Object],
  actionClass: [String, Array],
  actionStyle: [String, Object],
  onPositiveClick: Function,
  onNegativeClick: Function,
  onClose: Function,
  closeFocusable: Boolean
}, BF = To(Pc), LF = D([T("dialog", `
 --n-icon-margin: var(--n-icon-margin-top) var(--n-icon-margin-right) var(--n-icon-margin-bottom) var(--n-icon-margin-left);
 word-break: break-word;
 line-height: var(--n-line-height);
 position: relative;
 background: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 margin: auto;
 border-radius: var(--n-border-radius);
 padding: var(--n-padding);
 transition: 
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `, [A("icon", {
  color: "var(--n-icon-color)"
}), B("bordered", {
  border: "var(--n-border)"
}), B("icon-top", [A("close", {
  margin: "var(--n-close-margin)"
}), A("icon", {
  margin: "var(--n-icon-margin)"
}), A("content", {
  textAlign: "center"
}), A("title", {
  justifyContent: "center"
}), A("action", {
  justifyContent: "center"
})]), B("icon-left", [A("icon", {
  margin: "var(--n-icon-margin)"
}), B("closable", [A("title", `
 padding-right: calc(var(--n-close-size) + 6px);
 `)])]), A("close", `
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 z-index: 1;
 `), A("content", `
 font-size: var(--n-font-size);
 margin: var(--n-content-margin);
 position: relative;
 word-break: break-word;
 `, [B("last", "margin-bottom: 0;")]), A("action", `
 display: flex;
 justify-content: flex-end;
 `, [D("> *:not(:last-child)", `
 margin-right: var(--n-action-space);
 `)]), A("icon", `
 font-size: var(--n-icon-size);
 transition: color .3s var(--n-bezier);
 `), A("title", `
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `), T("dialog-icon-container", `
 display: flex;
 justify-content: center;
 `)]), al(T("dialog", `
 width: 446px;
 max-width: calc(100vw - 32px);
 `)), T("dialog", [sv(`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)])]), Ts = window.Vue.computed, NF = window.Vue.defineComponent, Xt = window.Vue.h, DF = {
  default: () => Xt(kd, null),
  info: () => Xt(kd, null),
  success: () => Xt(Sg, null),
  warning: () => Xt($g, null),
  error: () => Xt(Cg, null)
}, HF = NF({
  name: "Dialog",
  alias: [
    "NimbusConfirmCard",
    // deprecated
    "Confirm"
    // deprecated
  ],
  props: Object.assign(Object.assign({}, Pe.props), Pc),
  slots: Object,
  setup(e) {
    const {
      mergedComponentPropsRef: t,
      mergedClsPrefixRef: n,
      inlineThemeDisabled: o,
      mergedRtlRef: r
    } = He(e), i = Lt("Dialog", r, n), l = Ts(() => {
      var v, u;
      const {
        iconPlacement: g
      } = e;
      return g || ((u = (v = t == null ? void 0 : t.value) === null || v === void 0 ? void 0 : v.Dialog) === null || u === void 0 ? void 0 : u.iconPlacement) || "left";
    });
    function a(v) {
      const {
        onPositiveClick: u
      } = e;
      u && u(v);
    }
    function s(v) {
      const {
        onNegativeClick: u
      } = e;
      u && u(v);
    }
    function d() {
      const {
        onClose: v
      } = e;
      v && v();
    }
    const c = Pe("Dialog", "-dialog", LF, vm, e, n), h = Ts(() => {
      const {
        type: v
      } = e, u = l.value, {
        common: {
          cubicBezierEaseInOut: g
        },
        self: {
          fontSize: m,
          lineHeight: f,
          border: b,
          titleTextColor: x,
          textColor: y,
          color: S,
          closeBorderRadius: C,
          closeColorHover: w,
          closeColorPressed: $,
          closeIconColor: k,
          closeIconColorHover: O,
          closeIconColorPressed: G,
          closeIconSize: _,
          borderRadius: V,
          titleFontWeight: I,
          titleFontSize: M,
          padding: X,
          iconSize: H,
          actionSpace: Q,
          contentMargin: oe,
          closeSize: te,
          [u === "top" ? "iconMarginIconTop" : "iconMargin"]: Y,
          [u === "top" ? "closeMarginIconTop" : "closeMargin"]: L,
          [ne("iconColor", v)]: Z
        }
      } = c.value, ee = zt(Y);
      return {
        "--n-font-size": m,
        "--n-icon-color": Z,
        "--n-bezier": g,
        "--n-close-margin": L,
        "--n-icon-margin-top": ee.top,
        "--n-icon-margin-right": ee.right,
        "--n-icon-margin-bottom": ee.bottom,
        "--n-icon-margin-left": ee.left,
        "--n-icon-size": H,
        "--n-close-size": te,
        "--n-close-icon-size": _,
        "--n-close-border-radius": C,
        "--n-close-color-hover": w,
        "--n-close-color-pressed": $,
        "--n-close-icon-color": k,
        "--n-close-icon-color-hover": O,
        "--n-close-icon-color-pressed": G,
        "--n-color": S,
        "--n-text-color": y,
        "--n-border-radius": V,
        "--n-padding": X,
        "--n-line-height": f,
        "--n-border": b,
        "--n-content-margin": oe,
        "--n-title-font-size": M,
        "--n-title-font-weight": I,
        "--n-title-text-color": x,
        "--n-action-space": Q
      };
    }), p = o ? mt("dialog", Ts(() => `${e.type[0]}${l.value[0]}`), h, e) : void 0;
    return {
      mergedClsPrefix: n,
      rtlEnabled: i,
      mergedIconPlacement: l,
      mergedTheme: c,
      handlePositiveClick: a,
      handleNegativeClick: s,
      handleCloseClick: d,
      cssVars: o ? void 0 : h,
      themeClass: p == null ? void 0 : p.themeClass,
      onRender: p == null ? void 0 : p.onRender
    };
  },
  render() {
    var e;
    const {
      bordered: t,
      mergedIconPlacement: n,
      cssVars: o,
      closable: r,
      showIcon: i,
      title: l,
      content: a,
      action: s,
      negativeText: d,
      positiveText: c,
      positiveButtonProps: h,
      negativeButtonProps: p,
      handlePositiveClick: v,
      handleNegativeClick: u,
      mergedTheme: g,
      loading: m,
      type: f,
      mergedClsPrefix: b
    } = this;
    (e = this.onRender) === null || e === void 0 || e.call(this);
    const x = i ? Xt(Ct, {
      clsPrefix: b,
      class: `${b}-dialog__icon`
    }, {
      default: () => Le(this.$slots.icon, (S) => S || (this.icon ? At(this.icon) : DF[this.type]()))
    }) : null, y = Le(this.$slots.action, (S) => S || c || d || s ? Xt("div", {
      class: [`${b}-dialog__action`, this.actionClass],
      style: this.actionStyle
    }, S || (s ? [At(s)] : [this.negativeText && Xt(It, Object.assign({
      theme: g.peers.Button,
      themeOverrides: g.peerOverrides.Button,
      ghost: !0,
      size: "small",
      onClick: u
    }, p), {
      default: () => At(this.negativeText)
    }), this.positiveText && Xt(It, Object.assign({
      theme: g.peers.Button,
      themeOverrides: g.peerOverrides.Button,
      size: "small",
      type: f === "default" ? "primary" : f,
      disabled: m,
      loading: m,
      onClick: v
    }, h), {
      default: () => At(this.positiveText)
    })])) : null);
    return Xt("div", {
      class: [`${b}-dialog`, this.themeClass, this.closable && `${b}-dialog--closable`, `${b}-dialog--icon-${n}`, t && `${b}-dialog--bordered`, this.rtlEnabled && `${b}-dialog--rtl`],
      style: o,
      role: "dialog"
    }, r ? Le(this.$slots.close, (S) => {
      const C = [`${b}-dialog__close`, this.rtlEnabled && `${b}-dialog--rtl`];
      return S ? Xt("div", {
        class: C
      }, S) : Xt(vl, {
        focusable: this.closeFocusable,
        clsPrefix: b,
        class: C,
        onClick: this.handleCloseClick
      });
    }) : null, i && n === "top" ? Xt("div", {
      class: `${b}-dialog-icon-container`
    }, x) : null, Xt("div", {
      class: [`${b}-dialog__title`, this.titleClass],
      style: this.titleStyle
    }, i && n === "left" ? x : null, dn(this.$slots.header, () => [At(l)])), Xt("div", {
      class: [`${b}-dialog__content`, y ? "" : `${b}-dialog__content--last`, this.contentClass],
      style: this.contentStyle
    }, dn(this.$slots.default, () => [At(a)])), y);
  }
});
function jF(e) {
  const {
    modalColor: t,
    textColor2: n,
    boxShadow3: o
  } = e;
  return {
    color: t,
    textColor: n,
    boxShadow: o
  };
}
const WF = {
  name: "Modal",
  common: ut,
  peers: {
    Scrollbar: Vr,
    Dialog: vm,
    Card: Ng
  },
  self: jF
}, _s = window.Vue.computed;
window.Vue.inject;
const UF = window.Vue.onUnmounted, Ed = "n-draggable";
function KF(e, t) {
  let n;
  const o = _s(() => e.value !== !1), r = _s(() => o.value ? Ed : ""), i = _s(() => {
    const s = e.value;
    return s === !0 || s === !1 ? !0 : s ? s.bounds !== "none" : !0;
  });
  function l(s) {
    const d = s.querySelector(`.${Ed}`);
    if (!d || !r.value)
      return;
    let c = 0, h = 0, p = 0, v = 0, u = 0, g = 0, m;
    function f(y) {
      y.preventDefault(), m = y;
      const {
        x: S,
        y: C,
        right: w,
        bottom: $
      } = s.getBoundingClientRect();
      h = S, v = C, c = window.innerWidth - w, p = window.innerHeight - $;
      const {
        left: k,
        top: O
      } = s.style;
      u = +O.slice(0, -2), g = +k.slice(0, -2);
    }
    function b(y) {
      if (!m) return;
      const {
        clientX: S,
        clientY: C
      } = m;
      let w = y.clientX - S, $ = y.clientY - C;
      i.value && (w > c ? w = c : -w > h && (w = -h), $ > p ? $ = p : -$ > v && ($ = -v));
      const k = w + g, O = $ + u;
      s.style.top = `${O}px`, s.style.left = `${k}px`;
    }
    function x() {
      m = void 0, t.onEnd(s);
    }
    Ke("mousedown", d, f), Ke("mousemove", window, b), Ke("mouseup", window, x), n = () => {
      qe("mousedown", d, f), Ke("mousemove", window, b), Ke("mouseup", window, x);
    };
  }
  function a() {
    n && (n(), n = void 0);
  }
  return UF(a), {
    stopDrag: a,
    startDrag: l,
    draggableRef: o,
    draggableClassRef: r
  };
}
const Tc = Object.assign(Object.assign({}, yc), Pc), qF = To(Tc), GF = window.Vue.cloneVNode, Fs = window.Vue.computed, XF = window.Vue.defineComponent, gr = window.Vue.h, YF = window.Vue.inject, ZF = window.Vue.mergeProps, Gh = window.Vue.nextTick, Xh = window.Vue.normalizeClass, Es = window.Vue.provide, mr = window.Vue.ref, zs = window.Vue.toRef, JF = window.Vue.Transition, Yh = window.Vue.vShow, Os = window.Vue.watch, Zh = window.Vue.withDirectives, QF = XF({
  name: "ModalBody",
  inheritAttrs: !1,
  slots: Object,
  props: Object.assign(Object.assign({
    show: {
      type: Boolean,
      required: !0
    },
    preset: String,
    displayDirective: {
      type: String,
      required: !0
    },
    trapFocus: {
      type: Boolean,
      default: !0
    },
    autoFocus: {
      type: Boolean,
      default: !0
    },
    blockScroll: Boolean,
    draggable: {
      type: [Boolean, Object],
      default: !1
    },
    maskHidden: Boolean
  }, Tc), {
    renderMask: Function,
    // events
    onClickoutside: Function,
    onBeforeLeave: {
      type: Function,
      required: !0
    },
    onAfterLeave: {
      type: Function,
      required: !0
    },
    onPositiveClick: {
      type: Function,
      required: !0
    },
    onNegativeClick: {
      type: Function,
      required: !0
    },
    onClose: {
      type: Function,
      required: !0
    },
    onAfterEnter: Function,
    onEsc: Function
  }),
  setup(e) {
    const t = mr(null), n = mr(null), o = mr(e.show), r = mr(null), i = mr(null), l = YF(bv);
    let a = null;
    Os(zs(e, "show"), ($) => {
      $ && (a = l.getMousePosition());
    }, {
      immediate: !0
    });
    const {
      stopDrag: s,
      startDrag: d,
      draggableRef: c,
      draggableClassRef: h
    } = KF(zs(e, "draggable"), {
      onEnd: ($) => {
        g($);
      }
    }), p = Fs(() => Xh([e.titleClass, h.value])), v = Fs(() => Xh([e.headerClass, h.value]));
    Os(zs(e, "show"), ($) => {
      $ && (o.value = !0);
    }), Oy(Fs(() => e.blockScroll && o.value));
    function u() {
      if (l.transformOriginRef.value === "center")
        return "";
      const {
        value: $
      } = r, {
        value: k
      } = i;
      if ($ === null || k === null)
        return "";
      if (n.value) {
        const O = n.value.containerScrollTop;
        return `${$}px ${k + O}px`;
      }
      return "";
    }
    function g($) {
      if (l.transformOriginRef.value === "center" || !a || !n.value) return;
      const k = n.value.containerScrollTop, {
        offsetLeft: O,
        offsetTop: G
      } = $, _ = a.y, V = a.x;
      r.value = -(O - V), i.value = -(G - _ - k), $.style.transformOrigin = u();
    }
    function m($) {
      Gh(() => {
        g($);
      });
    }
    function f($) {
      $.style.transformOrigin = u(), e.onBeforeLeave();
    }
    function b($) {
      const k = $;
      c.value && d(k), e.onAfterEnter && e.onAfterEnter(k);
    }
    function x() {
      o.value = !1, r.value = null, i.value = null, s(), e.onAfterLeave();
    }
    function y() {
      const {
        onClose: $
      } = e;
      $ && $();
    }
    function S() {
      e.onNegativeClick();
    }
    function C() {
      e.onPositiveClick();
    }
    const w = mr(null);
    return Os(w, ($) => {
      $ && Gh(() => {
        const k = $.el;
        k && t.value !== k && (t.value = k);
      });
    }), Es(dl, t), Es(sl, null), Es(Oi, null), {
      mergedTheme: l.mergedThemeRef,
      appear: l.appearRef,
      isMounted: l.isMountedRef,
      mergedClsPrefix: l.mergedClsPrefixRef,
      bodyRef: t,
      scrollbarRef: n,
      draggableClass: h,
      displayed: o,
      childNodeRef: w,
      cardHeaderClass: v,
      dialogTitleClass: p,
      handlePositiveClick: C,
      handleNegativeClick: S,
      handleCloseClick: y,
      handleAfterEnter: b,
      handleAfterLeave: x,
      handleBeforeLeave: f,
      handleEnter: m
    };
  },
  render() {
    const {
      $slots: e,
      $attrs: t,
      handleEnter: n,
      handleAfterEnter: o,
      handleAfterLeave: r,
      handleBeforeLeave: i,
      preset: l,
      mergedClsPrefix: a
    } = this;
    let s = null;
    if (!l) {
      if (s = A1("default", e.default, {
        draggableClass: this.draggableClass
      }), !s) {
        Kn("modal", "default slot is empty");
        return;
      }
      s = GF(s), s.props = ZF({
        class: `${a}-modal`
      }, t, s.props || {});
    }
    return this.displayDirective === "show" || this.displayed || this.show ? Zh(gr("div", {
      role: "none",
      class: [`${a}-modal-body-wrapper`, this.maskHidden && `${a}-modal-body-wrapper--mask-hidden`]
    }, gr(Ir, {
      ref: "scrollbarRef",
      theme: this.mergedTheme.peers.Scrollbar,
      themeOverrides: this.mergedTheme.peerOverrides.Scrollbar,
      contentClass: `${a}-modal-scroll-content`
    }, {
      default: () => {
        var d;
        return [(d = this.renderMask) === null || d === void 0 ? void 0 : d.call(this), gr(Vv, {
          disabled: !this.trapFocus || this.maskHidden,
          active: this.show,
          onEsc: this.onEsc,
          autoFocus: this.autoFocus
        }, {
          default: () => {
            var c;
            return gr(JF, {
              name: "fade-in-scale-up-transition",
              appear: (c = this.appear) !== null && c !== void 0 ? c : this.isMounted,
              onEnter: n,
              onAfterEnter: o,
              onAfterLeave: r,
              onBeforeLeave: i
            }, {
              default: () => {
                const h = [[Yh, this.show]], {
                  onClickoutside: p
                } = this;
                return p && h.push([Ri, this.onClickoutside, void 0, {
                  capture: !0
                }]), Zh(this.preset === "confirm" || this.preset === "dialog" ? gr(HF, Object.assign({}, this.$attrs, {
                  class: [`${a}-modal`, this.$attrs.class],
                  ref: "bodyRef",
                  theme: this.mergedTheme.peers.Dialog,
                  themeOverrides: this.mergedTheme.peerOverrides.Dialog
                }, Po(this.$props, BF), {
                  titleClass: this.dialogTitleClass,
                  "aria-modal": "true"
                }), e) : this.preset === "card" ? gr(Dg, Object.assign({}, this.$attrs, {
                  ref: "bodyRef",
                  class: [`${a}-modal`, this.$attrs.class],
                  theme: this.mergedTheme.peers.Card,
                  themeOverrides: this.mergedTheme.peerOverrides.Card
                }, Po(this.$props, t5), {
                  headerClass: this.cardHeaderClass,
                  "aria-modal": "true",
                  role: "dialog"
                }), e) : this.childNodeRef = s, h);
              }
            });
          }
        })];
      }
    })), [[Yh, this.displayDirective === "if" || this.displayed || this.show]]) : null;
  }
}), eE = D([T("modal-container", `
 position: fixed;
 left: 0;
 top: 0;
 height: 0;
 width: 0;
 display: flex;
 `), T("modal-mask", `
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, .4);
 `, [kg({
  enterDuration: ".25s",
  leaveDuration: ".25s",
  enterCubicBezier: "var(--n-bezier-ease-out)",
  leaveCubicBezier: "var(--n-bezier-ease-out)"
})]), T("modal-body-wrapper", `
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: visible;
 `, [T("modal-scroll-content", `
 min-height: 100%;
 display: flex;
 position: relative;
 `), B("mask-hidden", "pointer-events: none;", [D("> *", `
 pointer-events: all;
 `)])]), T("modal", `
 position: relative;
 align-self: center;
 color: var(--n-text-color);
 margin: auto;
 box-shadow: var(--n-box-shadow);
 `, [Vi({
  duration: ".25s",
  enterScale: ".5"
}), D(`.${Ed}`, `
 cursor: move;
 user-select: none;
 `)])]), Jh = window.Vue.computed, tE = window.Vue.defineComponent, li = window.Vue.h, Qh = window.Vue.inject, nE = window.Vue.provide, oE = window.Vue.ref, ep = window.Vue.toRef, rE = window.Vue.Transition, iE = window.Vue.withDirectives, aE = Object.assign(Object.assign(Object.assign(Object.assign({}, Pe.props), {
  show: Boolean,
  showMask: {
    type: Boolean,
    default: !0
  },
  maskClosable: {
    type: Boolean,
    default: !0
  },
  preset: String,
  to: [String, Object],
  displayDirective: {
    type: String,
    default: "if"
  },
  transformOrigin: {
    type: String,
    default: "mouse"
  },
  zIndex: Number,
  autoFocus: {
    type: Boolean,
    default: !0
  },
  trapFocus: {
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
  }
}), Tc), {
  draggable: [Boolean, Object],
  // events
  onEsc: Function,
  "onUpdate:show": [Function, Array],
  onUpdateShow: [Function, Array],
  onAfterEnter: Function,
  onBeforeLeave: Function,
  onAfterLeave: Function,
  onClose: Function,
  onPositiveClick: Function,
  onNegativeClick: Function,
  onMaskClick: Function,
  // private
  internalDialog: Boolean,
  internalModal: Boolean,
  internalAppear: {
    type: Boolean,
    default: void 0
  },
  // deprecated
  overlayStyle: [String, Object],
  onBeforeHide: Function,
  onAfterHide: Function,
  onHide: Function,
  unstableShowMask: {
    type: Boolean,
    default: void 0
  }
}), lE = tE({
  name: "Modal",
  inheritAttrs: !1,
  props: aE,
  slots: Object,
  setup(e) {
    const t = oE(null), {
      mergedClsPrefixRef: n,
      namespaceRef: o,
      inlineThemeDisabled: r
    } = He(e), i = Pe("Modal", "-modal", eE, WF, e, n), l = qw(64), a = jw(), s = zi(), d = e.internalDialog ? Qh(VF, null) : null, c = e.internalModal ? Qh(hy, null) : null, h = Ty();
    function p(C) {
      const {
        onUpdateShow: w,
        "onUpdate:show": $,
        onHide: k
      } = e;
      w && ce(w, C), $ && ce($, C), k && !C && k(C);
    }
    function v() {
      const {
        onClose: C
      } = e;
      C ? Promise.resolve(C()).then((w) => {
        w !== !1 && p(!1);
      }) : p(!1);
    }
    function u() {
      const {
        onPositiveClick: C
      } = e;
      C ? Promise.resolve(C()).then((w) => {
        w !== !1 && p(!1);
      }) : p(!1);
    }
    function g() {
      const {
        onNegativeClick: C
      } = e;
      C ? Promise.resolve(C()).then((w) => {
        w !== !1 && p(!1);
      }) : p(!1);
    }
    function m() {
      const {
        onBeforeLeave: C,
        onBeforeHide: w
      } = e;
      C && ce(C), w && w();
    }
    function f() {
      const {
        onAfterLeave: C,
        onAfterHide: w
      } = e;
      C && ce(C), w && w();
    }
    function b(C) {
      var w;
      const {
        onMaskClick: $
      } = e;
      $ && $(C), e.maskClosable && !((w = t.value) === null || w === void 0) && w.contains(Rr(C)) && p(!1);
    }
    function x(C) {
      var w;
      (w = e.onEsc) === null || w === void 0 || w.call(e), e.show && e.closeOnEsc && E1(C) && (h.value || p(!1));
    }
    nE(bv, {
      getMousePosition: () => {
        const C = d || c;
        if (C) {
          const {
            clickedRef: w,
            clickedPositionRef: $
          } = C;
          if (w.value && $.value)
            return $.value;
        }
        return l.value ? a.value : null;
      },
      mergedClsPrefixRef: n,
      mergedThemeRef: i,
      isMountedRef: s,
      appearRef: ep(e, "internalAppear"),
      transformOriginRef: ep(e, "transformOrigin")
    });
    const y = Jh(() => {
      const {
        common: {
          cubicBezierEaseOut: C
        },
        self: {
          boxShadow: w,
          color: $,
          textColor: k
        }
      } = i.value;
      return {
        "--n-bezier-ease-out": C,
        "--n-box-shadow": w,
        "--n-color": $,
        "--n-text-color": k
      };
    }), S = r ? mt("theme-class", void 0, y, e) : void 0;
    return {
      mergedClsPrefix: n,
      namespace: o,
      isMounted: s,
      containerRef: t,
      presetProps: Jh(() => Po(e, qF)),
      handleEsc: x,
      handleAfterLeave: f,
      handleClickoutside: b,
      handleBeforeLeave: m,
      doUpdateShow: p,
      handleNegativeClick: g,
      handlePositiveClick: u,
      handleCloseClick: v,
      cssVars: r ? void 0 : y,
      themeClass: S == null ? void 0 : S.themeClass,
      onRender: S == null ? void 0 : S.onRender
    };
  },
  render() {
    const {
      mergedClsPrefix: e
    } = this;
    return li(Sv, {
      to: this.to,
      show: this.show
    }, {
      default: () => {
        var t;
        (t = this.onRender) === null || t === void 0 || t.call(this);
        const {
          showMask: n
        } = this;
        return iE(li("div", {
          role: "none",
          ref: "containerRef",
          class: [`${e}-modal-container`, this.themeClass, this.namespace],
          style: this.cssVars
        }, li(QF, Object.assign({
          style: this.overlayStyle
        }, this.$attrs, {
          ref: "bodyWrapper",
          displayDirective: this.displayDirective,
          show: this.show,
          preset: this.preset,
          autoFocus: this.autoFocus,
          trapFocus: this.trapFocus,
          draggable: this.draggable,
          blockScroll: this.blockScroll,
          maskHidden: !n
        }, this.presetProps, {
          onEsc: this.handleEsc,
          onClose: this.handleCloseClick,
          onNegativeClick: this.handleNegativeClick,
          onPositiveClick: this.handlePositiveClick,
          onBeforeLeave: this.handleBeforeLeave,
          onAfterEnter: this.onAfterEnter,
          onAfterLeave: this.handleAfterLeave,
          onClickoutside: n ? void 0 : this.handleClickoutside,
          renderMask: n ? () => {
            var o;
            return li(rE, {
              name: "fade-in-transition",
              key: "mask",
              appear: (o = this.internalAppear) !== null && o !== void 0 ? o : this.isMounted
            }, {
              default: () => this.show ? li("div", {
                "aria-hidden": !0,
                ref: "containerRef",
                class: `${e}-modal-mask`,
                onClick: this.handleClickoutside
              }) : null
            });
          } : void 0
        }), this.$slots)), [[Qd, {
          zIndex: this.zIndex,
          enabled: this.show
        }]]);
      }
    });
  }
}), sE = {
  gapSmall: "4px 8px",
  gapMedium: "8px 12px",
  gapLarge: "12px 16px"
};
function dE() {
  return sE;
}
const cE = {
  self: dE
};
let Ms;
function uE() {
  if (!Jo) return !0;
  if (Ms === void 0) {
    const e = document.createElement("div");
    e.style.display = "flex", e.style.flexDirection = "column", e.style.rowGap = "1px", e.appendChild(document.createElement("div")), e.appendChild(document.createElement("div")), document.body.appendChild(e);
    const t = e.scrollHeight === 1;
    return document.body.removeChild(e), Ms = t;
  }
  return Ms;
}
const fE = window.Vue.Comment, hE = window.Vue.computed, pE = window.Vue.defineComponent, tp = window.Vue.h, vE = Object.assign(Object.assign({}, Pe.props), {
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
}), No = pE({
  name: "Space",
  props: vE,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedRtlRef: n
    } = He(e), o = Pe("Space", "-space", void 0, cE, e, t), r = Lt("Space", n, t);
    return {
      useGap: uE(),
      rtlEnabled: r,
      mergedClsPrefix: t,
      margin: hE(() => {
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
            [ne("gap", i)]: l
          }
        } = o.value, {
          row: a,
          col: s
        } = fw(l);
        return {
          horizontal: kt(s),
          vertical: kt(a)
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
    } = this, u = jn(oc(this), !1);
    if (!u.length) return null;
    const g = `${a.horizontal}px`, m = `${a.horizontal / 2}px`, f = `${a.vertical}px`, b = `${a.vertical / 2}px`, x = u.length - 1, y = r.startsWith("space-");
    return tp("div", {
      role: "none",
      class: [`${d}-space`, c && `${d}-space--rtl`],
      style: {
        display: o ? "inline-flex" : "flex",
        flexDirection: e && !t ? "column" : e && t ? "column-reverse" : !e && t ? "row-reverse" : "row",
        justifyContent: ["start", "end"].includes(r) ? `flex-${r}` : r,
        flexWrap: !s || e ? "nowrap" : "wrap",
        marginTop: h || e ? "" : `-${b}`,
        marginBottom: h || e ? "" : `-${b}`,
        alignItems: n,
        gap: h ? `${a.vertical}px ${a.horizontal}px` : ""
      }
    }, !p && (h || v) ? u : u.map((S, C) => S.type === fE ? S : tp("div", {
      role: "none",
      class: i,
      style: [l, {
        maxWidth: "100%"
      }, h ? "" : e ? {
        marginBottom: C !== x ? f : ""
      } : c ? {
        marginLeft: y ? r === "space-between" && C === x ? "" : m : C !== x ? g : "",
        marginRight: y ? r === "space-between" && C === 0 ? "" : m : "",
        paddingTop: b,
        paddingBottom: b
      } : {
        marginRight: y ? r === "space-between" && C === x ? "" : m : C !== x ? g : "",
        marginLeft: y ? r === "space-between" && C === 0 ? "" : m : "",
        paddingTop: b,
        paddingBottom: b
      }]
    }, S)));
  }
}), gE = {
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
function mE(e) {
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
  return Object.assign(Object.assign({}, gE), {
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
const gm = {
  common: ut,
  self: mE
};
function bE(e) {
  const {
    textColorDisabled: t
  } = e;
  return {
    iconColorDisabled: t
  };
}
const wE = {
  name: "InputNumber",
  common: ut,
  peers: {
    Button: ml,
    Input: wc
  },
  self: bE
}, yE = {
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
function xE(e) {
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
  return Object.assign(Object.assign({}, yE), {
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
const CE = {
  common: ut,
  self: xE
}, SE = {
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
function $E(e) {
  const {
    primaryColor: t,
    opacityDisabled: n,
    borderRadius: o,
    textColor3: r
  } = e;
  return Object.assign(Object.assign({}, SE), {
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
const kE = {
  common: ut,
  self: $E
}, RE = {
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
function PE(e) {
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
    borderRadius: u,
    fontSize: g,
    fontWeightStrong: m
  } = e;
  return Object.assign(Object.assign({}, RE), {
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
    closeBorderRadius: u,
    tabColor: d,
    tabColorSegment: c,
    tabBorderColor: h,
    tabFontWeightActive: p,
    tabFontWeight: p,
    tabBorderRadius: u,
    paneTextColor: t,
    fontWeightStrong: m
  });
}
const TE = {
  common: ut,
  self: PE
}, Ai = "n-form", mm = "n-form-item-insts", _E = T("form", [B("inline", `
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `, [T("form-item", {
  width: "auto",
  marginRight: "18px"
}, [D("&:last-child", {
  marginRight: 0
})])])]);
var FE = function(e, t, n, o) {
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
const EE = window.Vue.defineComponent, zE = window.Vue.h, np = window.Vue.provide, OE = window.Vue.ref, ME = Object.assign(Object.assign({}, Pe.props), {
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
}), op = EE({
  name: "Form",
  props: ME,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = He(e);
    Pe("Form", "-form", _E, gm, e, t);
    const n = {}, o = OE(void 0), r = (s) => {
      const d = o.value;
      (d === void 0 || s >= d) && (o.value = s);
    };
    function i(s) {
      return FE(this, arguments, void 0, function* (d, c = () => !0) {
        return yield new Promise((h, p) => {
          const v = [];
          for (const u of To(n)) {
            const g = n[u];
            for (const m of g)
              m.path && v.push(m.internalValidate(null, c));
          }
          Promise.all(v).then((u) => {
            const g = u.some((b) => !b.valid), m = [], f = [];
            u.forEach((b) => {
              var x, y;
              !((x = b.errors) === null || x === void 0) && x.length && m.push(b.errors), !((y = b.warnings) === null || y === void 0) && y.length && f.push(b.warnings);
            }), d && d(m.length ? m : void 0, {
              warnings: f.length ? f : void 0
            }), g ? p(m.length ? m : void 0) : h({
              warnings: f.length ? f : void 0
            });
          });
        });
      });
    }
    function l() {
      for (const s of To(n)) {
        const d = n[s];
        for (const c of d)
          c.restoreValidation();
      }
    }
    return np(Ai, {
      props: e,
      maxChildLabelWidthRef: o,
      deriveMaxChildLabelWidth: r
    }), np(mm, {
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
    return zE("form", {
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
function VE(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Ei(e, t);
}
function zd(e) {
  return zd = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, zd(e);
}
function Ei(e, t) {
  return Ei = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, r) {
    return o.__proto__ = r, o;
  }, Ei(e, t);
}
function IE() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Da(e, t, n) {
  return IE() ? Da = Reflect.construct.bind() : Da = function(r, i, l) {
    var a = [null];
    a.push.apply(a, i);
    var s = Function.bind.apply(r, a), d = new s();
    return l && Ei(d, l.prototype), d;
  }, Da.apply(null, arguments);
}
function AE(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function Od(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Od = function(o) {
    if (o === null || !AE(o)) return o;
    if (typeof o != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(o)) return t.get(o);
      t.set(o, r);
    }
    function r() {
      return Da(o, arguments, zd(this).constructor);
    }
    return r.prototype = Object.create(o.prototype, {
      constructor: {
        value: r,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), Ei(r, o);
  }, Od(e);
}
var BE = /%[sdj%]/g, LE = function() {
};
function Md(e) {
  if (!e || !e.length) return null;
  var t = {};
  return e.forEach(function(n) {
    var o = n.field;
    t[o] = t[o] || [], t[o].push(n);
  }), t;
}
function sn(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
    n[o - 1] = arguments[o];
  var r = 0, i = n.length;
  if (typeof e == "function")
    return e.apply(null, n);
  if (typeof e == "string") {
    var l = e.replace(BE, function(a) {
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
function NE(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function Tt(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || NE(t) && typeof e == "string" && !e);
}
function DE(e, t, n) {
  var o = [], r = 0, i = e.length;
  function l(a) {
    o.push.apply(o, a || []), r++, r === i && n(o);
  }
  e.forEach(function(a) {
    t(a, l);
  });
}
function rp(e, t, n) {
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
function HE(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    t.push.apply(t, e[n] || []);
  }), t;
}
var ip = /* @__PURE__ */ function(e) {
  VE(t, e);
  function t(n, o) {
    var r;
    return r = e.call(this, "Async Validation Error") || this, r.errors = n, r.fields = o, r;
  }
  return t;
}(/* @__PURE__ */ Od(Error));
function jE(e, t, n, o, r) {
  if (t.first) {
    var i = new Promise(function(p, v) {
      var u = function(f) {
        return o(f), f.length ? v(new ip(f, Md(f))) : p(r);
      }, g = HE(e);
      rp(g, n, u);
    });
    return i.catch(function(p) {
      return p;
    }), i;
  }
  var l = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], a = Object.keys(e), s = a.length, d = 0, c = [], h = new Promise(function(p, v) {
    var u = function(m) {
      if (c.push.apply(c, m), d++, d === s)
        return o(c), c.length ? v(new ip(c, Md(c))) : p(r);
    };
    a.length || (o(c), p(r)), a.forEach(function(g) {
      var m = e[g];
      l.indexOf(g) !== -1 ? rp(m, n, u) : DE(m, n, u);
    });
  });
  return h.catch(function(p) {
    return p;
  }), h;
}
function WE(e) {
  return !!(e && e.message !== void 0);
}
function UE(e, t) {
  for (var n = e, o = 0; o < t.length; o++) {
    if (n == null)
      return n;
    n = n[t[o]];
  }
  return n;
}
function ap(e, t) {
  return function(n) {
    var o;
    return e.fullFields ? o = UE(t, e.fullFields) : o = t[n.field || e.fullField], WE(n) ? (n.field = n.field || e.fullField, n.fieldValue = o, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: o,
      field: n.field || e.fullField
    };
  };
}
function lp(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var o = t[n];
        typeof o == "object" && typeof e[n] == "object" ? e[n] = Ko({}, e[n], o) : e[n] = o;
      }
  }
  return e;
}
var bm = function(t, n, o, r, i, l) {
  t.required && (!o.hasOwnProperty(t.field) || Tt(n, l || t.type)) && r.push(sn(i.messages.required, t.fullField));
}, KE = function(t, n, o, r, i) {
  (/^\s+$/.test(n) || n === "") && r.push(sn(i.messages.whitespace, t.fullField));
}, Ea, qE = function() {
  if (Ea)
    return Ea;
  var e = "[a-fA-F\\d:]", t = function(y) {
    return y && y.includeBoundaries ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))" : "";
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
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), i = new RegExp("(?:^" + n + "$)|(?:^" + r + "$)"), l = new RegExp("^" + n + "$"), a = new RegExp("^" + r + "$"), s = function(y) {
    return y && y.exact ? i : new RegExp("(?:" + t(y) + n + t(y) + ")|(?:" + t(y) + r + t(y) + ")", "g");
  };
  s.v4 = function(x) {
    return x && x.exact ? l : new RegExp("" + t(x) + n + t(x), "g");
  }, s.v6 = function(x) {
    return x && x.exact ? a : new RegExp("" + t(x) + r + t(x), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", c = "(?:\\S+(?::\\S*)?@)?", h = s.v4().source, p = s.v6().source, v = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", u = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", g = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", m = "(?::\\d{2,5})?", f = '(?:[/?#][^\\s"]*)?', b = "(?:" + d + "|www\\.)" + c + "(?:localhost|" + h + "|" + p + "|" + v + u + g + ")" + m + f;
  return Ea = new RegExp("(?:^" + b + "$)", "i"), Ea;
}, sp = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, ui = {
  integer: function(t) {
    return ui.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return ui.number(t) && !ui.integer(t);
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
    return typeof t == "object" && !ui.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(sp.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(qE());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(sp.hex);
  }
}, GE = function(t, n, o, r, i) {
  if (t.required && n === void 0) {
    bm(t, n, o, r, i);
    return;
  }
  var l = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], a = t.type;
  l.indexOf(a) > -1 ? ui[a](n) || r.push(sn(i.messages.types[a], t.fullField, t.type)) : a && typeof n !== t.type && r.push(sn(i.messages.types[a], t.fullField, t.type));
}, XE = function(t, n, o, r, i) {
  var l = typeof t.len == "number", a = typeof t.min == "number", s = typeof t.max == "number", d = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, c = n, h = null, p = typeof n == "number", v = typeof n == "string", u = Array.isArray(n);
  if (p ? h = "number" : v ? h = "string" : u && (h = "array"), !h)
    return !1;
  u && (c = n.length), v && (c = n.replace(d, "_").length), l ? c !== t.len && r.push(sn(i.messages[h].len, t.fullField, t.len)) : a && !s && c < t.min ? r.push(sn(i.messages[h].min, t.fullField, t.min)) : s && !a && c > t.max ? r.push(sn(i.messages[h].max, t.fullField, t.max)) : a && s && (c < t.min || c > t.max) && r.push(sn(i.messages[h].range, t.fullField, t.min, t.max));
}, br = "enum", YE = function(t, n, o, r, i) {
  t[br] = Array.isArray(t[br]) ? t[br] : [], t[br].indexOf(n) === -1 && r.push(sn(i.messages[br], t.fullField, t[br].join(", ")));
}, ZE = function(t, n, o, r, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(n) || r.push(sn(i.messages.pattern.mismatch, t.fullField, n, t.pattern));
    else if (typeof t.pattern == "string") {
      var l = new RegExp(t.pattern);
      l.test(n) || r.push(sn(i.messages.pattern.mismatch, t.fullField, n, t.pattern));
    }
  }
}, Ne = {
  required: bm,
  whitespace: KE,
  type: GE,
  range: XE,
  enum: YE,
  pattern: ZE
}, JE = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Tt(n, "string") && !t.required)
      return o();
    Ne.required(t, n, r, l, i, "string"), Tt(n, "string") || (Ne.type(t, n, r, l, i), Ne.range(t, n, r, l, i), Ne.pattern(t, n, r, l, i), t.whitespace === !0 && Ne.whitespace(t, n, r, l, i));
  }
  o(l);
}, QE = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Tt(n) && !t.required)
      return o();
    Ne.required(t, n, r, l, i), n !== void 0 && Ne.type(t, n, r, l, i);
  }
  o(l);
}, ez = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (n === "" && (n = void 0), Tt(n) && !t.required)
      return o();
    Ne.required(t, n, r, l, i), n !== void 0 && (Ne.type(t, n, r, l, i), Ne.range(t, n, r, l, i));
  }
  o(l);
}, tz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Tt(n) && !t.required)
      return o();
    Ne.required(t, n, r, l, i), n !== void 0 && Ne.type(t, n, r, l, i);
  }
  o(l);
}, nz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Tt(n) && !t.required)
      return o();
    Ne.required(t, n, r, l, i), Tt(n) || Ne.type(t, n, r, l, i);
  }
  o(l);
}, oz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Tt(n) && !t.required)
      return o();
    Ne.required(t, n, r, l, i), n !== void 0 && (Ne.type(t, n, r, l, i), Ne.range(t, n, r, l, i));
  }
  o(l);
}, rz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Tt(n) && !t.required)
      return o();
    Ne.required(t, n, r, l, i), n !== void 0 && (Ne.type(t, n, r, l, i), Ne.range(t, n, r, l, i));
  }
  o(l);
}, iz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (n == null && !t.required)
      return o();
    Ne.required(t, n, r, l, i, "array"), n != null && (Ne.type(t, n, r, l, i), Ne.range(t, n, r, l, i));
  }
  o(l);
}, az = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Tt(n) && !t.required)
      return o();
    Ne.required(t, n, r, l, i), n !== void 0 && Ne.type(t, n, r, l, i);
  }
  o(l);
}, lz = "enum", sz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Tt(n) && !t.required)
      return o();
    Ne.required(t, n, r, l, i), n !== void 0 && Ne[lz](t, n, r, l, i);
  }
  o(l);
}, dz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Tt(n, "string") && !t.required)
      return o();
    Ne.required(t, n, r, l, i), Tt(n, "string") || Ne.pattern(t, n, r, l, i);
  }
  o(l);
}, cz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Tt(n, "date") && !t.required)
      return o();
    if (Ne.required(t, n, r, l, i), !Tt(n, "date")) {
      var s;
      n instanceof Date ? s = n : s = new Date(n), Ne.type(t, s, r, l, i), s && Ne.range(t, s.getTime(), r, l, i);
    }
  }
  o(l);
}, uz = function(t, n, o, r, i) {
  var l = [], a = Array.isArray(n) ? "array" : typeof n;
  Ne.required(t, n, r, l, i, a), o(l);
}, Vs = function(t, n, o, r, i) {
  var l = t.type, a = [], s = t.required || !t.required && r.hasOwnProperty(t.field);
  if (s) {
    if (Tt(n, l) && !t.required)
      return o();
    Ne.required(t, n, r, a, i, l), Tt(n, l) || Ne.type(t, n, r, a, i);
  }
  o(a);
}, fz = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (Tt(n) && !t.required)
      return o();
    Ne.required(t, n, r, l, i);
  }
  o(l);
}, bi = {
  string: JE,
  method: QE,
  number: ez,
  boolean: tz,
  regexp: nz,
  integer: oz,
  float: rz,
  array: iz,
  object: az,
  enum: sz,
  pattern: dz,
  date: cz,
  url: Vs,
  hex: Vs,
  email: Vs,
  required: uz,
  any: fz
};
function Vd() {
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
var Id = Vd(), _r = /* @__PURE__ */ function() {
  function e(n) {
    this.rules = null, this._messages = Id, this.define(n);
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
    return o && (this._messages = lp(Vd(), o)), this._messages;
  }, t.validate = function(o, r, i) {
    var l = this;
    r === void 0 && (r = {}), i === void 0 && (i = function() {
    });
    var a = o, s = r, d = i;
    if (typeof s == "function" && (d = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
      return d && d(null, a), Promise.resolve(a);
    function c(g) {
      var m = [], f = {};
      function b(y) {
        if (Array.isArray(y)) {
          var S;
          m = (S = m).concat.apply(S, y);
        } else
          m.push(y);
      }
      for (var x = 0; x < g.length; x++)
        b(g[x]);
      m.length ? (f = Md(m), d(m, f)) : d(null, a);
    }
    if (s.messages) {
      var h = this.messages();
      h === Id && (h = Vd()), lp(h, s.messages), s.messages = h;
    } else
      s.messages = this.messages();
    var p = {}, v = s.keys || Object.keys(this.rules);
    v.forEach(function(g) {
      var m = l.rules[g], f = a[g];
      m.forEach(function(b) {
        var x = b;
        typeof x.transform == "function" && (a === o && (a = Ko({}, a)), f = a[g] = x.transform(f)), typeof x == "function" ? x = {
          validator: x
        } : x = Ko({}, x), x.validator = l.getValidationMethod(x), x.validator && (x.field = g, x.fullField = x.fullField || g, x.type = l.getType(x), p[g] = p[g] || [], p[g].push({
          rule: x,
          value: f,
          source: a,
          field: g
        }));
      });
    });
    var u = {};
    return jE(p, s, function(g, m) {
      var f = g.rule, b = (f.type === "object" || f.type === "array") && (typeof f.fields == "object" || typeof f.defaultField == "object");
      b = b && (f.required || !f.required && g.value), f.field = g.field;
      function x(C, w) {
        return Ko({}, w, {
          fullField: f.fullField + "." + C,
          fullFields: f.fullFields ? [].concat(f.fullFields, [C]) : [C]
        });
      }
      function y(C) {
        C === void 0 && (C = []);
        var w = Array.isArray(C) ? C : [C];
        !s.suppressWarning && w.length && e.warning("async-validator:", w), w.length && f.message !== void 0 && (w = [].concat(f.message));
        var $ = w.map(ap(f, a));
        if (s.first && $.length)
          return u[f.field] = 1, m($);
        if (!b)
          m($);
        else {
          if (f.required && !g.value)
            return f.message !== void 0 ? $ = [].concat(f.message).map(ap(f, a)) : s.error && ($ = [s.error(f, sn(s.messages.required, f.field))]), m($);
          var k = {};
          f.defaultField && Object.keys(g.value).map(function(_) {
            k[_] = f.defaultField;
          }), k = Ko({}, k, g.rule.fields);
          var O = {};
          Object.keys(k).forEach(function(_) {
            var V = k[_], I = Array.isArray(V) ? V : [V];
            O[_] = I.map(x.bind(null, _));
          });
          var G = new e(O);
          G.messages(s.messages), g.rule.options && (g.rule.options.messages = s.messages, g.rule.options.error = s.error), G.validate(g.value, g.rule.options || s, function(_) {
            var V = [];
            $ && $.length && V.push.apply(V, $), _ && _.length && V.push.apply(V, _), m(V.length ? V : null);
          });
        }
      }
      var S;
      if (f.asyncValidator)
        S = f.asyncValidator(f, g.value, y, g.source, s);
      else if (f.validator) {
        try {
          S = f.validator(f, g.value, y, g.source, s);
        } catch (C) {
          console.error == null || console.error(C), s.suppressValidatorError || setTimeout(function() {
            throw C;
          }, 0), y(C.message);
        }
        S === !0 ? y() : S === !1 ? y(typeof f.message == "function" ? f.message(f.fullField || f.field) : f.message || (f.fullField || f.field) + " fails") : S instanceof Array ? y(S) : S instanceof Error && y(S.message);
      }
      S && S.then && S.then(function() {
        return y();
      }, function(C) {
        return y(C);
      });
    }, function(g) {
      c(g);
    }, a);
  }, t.getType = function(o) {
    if (o.type === void 0 && o.pattern instanceof RegExp && (o.type = "pattern"), typeof o.validator != "function" && o.type && !bi.hasOwnProperty(o.type))
      throw new Error(sn("Unknown rule type %s", o.type));
    return o.type || "string";
  }, t.getValidationMethod = function(o) {
    if (typeof o.validator == "function")
      return o.validator;
    var r = Object.keys(o), i = r.indexOf("message");
    return i !== -1 && r.splice(i, 1), r.length === 1 && r[0] === "required" ? bi.required : bi[this.getType(o)] || void 0;
  }, e;
}();
_r.register = function(t, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  bi[t] = n;
};
_r.warning = LE;
_r.messages = Id;
_r.validators = bi;
const {
  cubicBezierEaseInOut: dp
} = nr;
function hz({
  name: e = "fade-down",
  fromOffset: t = "-4px",
  enterDuration: n = ".3s",
  leaveDuration: o = ".3s",
  enterCubicBezier: r = dp,
  leaveCubicBezier: i = dp
} = {}) {
  return [D(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
    opacity: 0,
    transform: `translateY(${t})`
  }), D(`&.${e}-transition-enter-to, &.${e}-transition-leave-from`, {
    opacity: 1,
    transform: "translateY(0)"
  }), D(`&.${e}-transition-leave-active`, {
    transition: `opacity ${o} ${i}, transform ${o} ${i}`
  }), D(`&.${e}-transition-enter-active`, {
    transition: `opacity ${n} ${r}, transform ${n} ${r}`
  })];
}
const pz = T("form-item", `
 display: grid;
 line-height: var(--n-line-height);
`, [T("form-item-label", `
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
 `, [A("asterisk", `
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 color: var(--n-asterisk-color);
 transition: color .3s var(--n-bezier);
 `), A("asterisk-placeholder", `
 grid-area: mark;
 user-select: none;
 -webkit-user-select: none;
 visibility: hidden; 
 `)]), T("form-item-blank", `
 grid-area: blank;
 min-height: var(--n-blank-height);
 `), B("auto-label-width", [T("form-item-label", "white-space: nowrap;")]), B("left-labelled", `
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 grid-template-rows: auto 1fr;
 align-items: flex-start;
 `, [T("form-item-label", `
 display: grid;
 grid-template-columns: 1fr auto;
 min-height: var(--n-blank-height);
 height: auto;
 box-sizing: border-box;
 flex-shrink: 0;
 flex-grow: 0;
 `, [B("reverse-columns-space", `
 grid-template-columns: auto 1fr;
 `), B("left-mark", `
 grid-template-areas:
 "mark text"
 ". text";
 `), B("right-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), B("right-hanging-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), A("text", `
 grid-area: text; 
 `), A("asterisk", `
 grid-area: mark; 
 align-self: end;
 `)])]), B("top-labelled", `
 grid-template-areas:
 "label"
 "blank"
 "feedback";
 grid-template-rows: minmax(var(--n-label-height), auto) 1fr;
 grid-template-columns: minmax(0, 100%);
 `, [B("no-label", `
 grid-template-areas:
 "blank"
 "feedback";
 grid-template-rows: 1fr;
 `), T("form-item-label", `
 display: flex;
 align-items: flex-start;
 justify-content: var(--n-label-text-align);
 `)]), T("form-item-blank", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 position: relative;
 `), T("form-item-feedback-wrapper", `
 grid-area: feedback;
 box-sizing: border-box;
 min-height: var(--n-feedback-height);
 font-size: var(--n-feedback-font-size);
 line-height: 1.25;
 transform-origin: top left;
 `, [D("&:not(:empty)", `
 padding: var(--n-feedback-padding);
 `), T("form-item-feedback", {
  transition: "color .3s var(--n-bezier)",
  color: "var(--n-feedback-text-color)"
}, [B("warning", {
  color: "var(--n-feedback-text-color-warning)"
}), B("error", {
  color: "var(--n-feedback-text-color-error)"
}), hz({
  fromOffset: "-3px",
  enterDuration: ".3s",
  leaveDuration: ".2s"
})])])]), Yt = window.Vue.computed, _c = window.Vue.inject, cp = window.Vue.ref;
function vz(e) {
  const t = _c(Ai, null);
  return {
    mergedSize: Yt(() => e.size !== void 0 ? e.size : (t == null ? void 0 : t.props.size) !== void 0 ? t.props.size : "medium")
  };
}
function gz(e) {
  const t = _c(Ai, null), n = Yt(() => {
    const {
      labelPlacement: u
    } = e;
    return u !== void 0 ? u : t != null && t.props.labelPlacement ? t.props.labelPlacement : "top";
  }), o = Yt(() => n.value === "left" && (e.labelWidth === "auto" || (t == null ? void 0 : t.props.labelWidth) === "auto")), r = Yt(() => {
    if (n.value === "top") return;
    const {
      labelWidth: u
    } = e;
    if (u !== void 0 && u !== "auto")
      return Pt(u);
    if (o.value) {
      const g = t == null ? void 0 : t.maxChildLabelWidthRef.value;
      return g !== void 0 ? Pt(g) : void 0;
    }
    if ((t == null ? void 0 : t.props.labelWidth) !== void 0)
      return Pt(t.props.labelWidth);
  }), i = Yt(() => {
    const {
      labelAlign: u
    } = e;
    if (u) return u;
    if (t != null && t.props.labelAlign) return t.props.labelAlign;
  }), l = Yt(() => {
    var u;
    return [(u = e.labelProps) === null || u === void 0 ? void 0 : u.style, e.labelStyle, {
      width: r.value
    }];
  }), a = Yt(() => {
    const {
      showRequireMark: u
    } = e;
    return u !== void 0 ? u : t == null ? void 0 : t.props.showRequireMark;
  }), s = Yt(() => {
    const {
      requireMarkPlacement: u
    } = e;
    return u !== void 0 ? u : (t == null ? void 0 : t.props.requireMarkPlacement) || "right";
  }), d = cp(!1), c = cp(!1), h = Yt(() => {
    const {
      validationStatus: u
    } = e;
    if (u !== void 0) return u;
    if (d.value) return "error";
    if (c.value) return "warning";
  }), p = Yt(() => {
    const {
      showFeedback: u
    } = e;
    return u !== void 0 ? u : (t == null ? void 0 : t.props.showFeedback) !== void 0 ? t.props.showFeedback : !0;
  }), v = Yt(() => {
    const {
      showLabel: u
    } = e;
    return u !== void 0 ? u : (t == null ? void 0 : t.props.showLabel) !== void 0 ? t.props.showLabel : !0;
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
function mz(e) {
  const t = _c(Ai, null), n = Yt(() => {
    const {
      rulePath: l
    } = e;
    if (l !== void 0) return l;
    const {
      path: a
    } = e;
    if (a !== void 0) return a;
  }), o = Yt(() => {
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
        const c = Fi(s, d);
        c !== void 0 && (Array.isArray(c) ? l.push(...c) : l.push(c));
      }
    }
    return l;
  }), r = Yt(() => o.value.some((l) => l.required)), i = Yt(() => r.value || e.required);
  return {
    mergedRules: o,
    mergedRequired: i
  };
}
var up = function(e, t, n, o) {
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
const Is = window.Vue.computed, bz = window.Vue.defineComponent, nn = window.Vue.h, wz = window.Vue.inject, yz = window.Vue.onMounted, xz = window.Vue.provide, za = window.Vue.ref, Oa = window.Vue.toRef, Cz = window.Vue.Transition, Sz = window.Vue.watch, Fc = Object.assign(Object.assign({}, Pe.props), {
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
}), $z = To(Fc);
function fp(e, t) {
  return (...n) => {
    try {
      const o = e(...n);
      return !t && (typeof o == "boolean" || o instanceof Error || Array.isArray(o)) || o != null && o.then ? o : (o === void 0 || Kn("form-item/validate", `You return a ${typeof o} typed value in the validator method, which is not recommended. Please use ${t ? "`Promise`" : "`boolean`, `Error` or `Promise`"} typed value instead.`), !0);
    } catch (o) {
      Kn("form-item/validate", "An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation."), console.error(o);
      return;
    }
  };
}
const kz = bz({
  name: "FormItem",
  props: Fc,
  setup(e) {
    xy(mm, "formItems", Oa(e, "path"));
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = He(e), o = wz(Ai, null), r = vz(e), i = gz(e), {
      validationErrored: l,
      validationWarned: a
    } = i, {
      mergedRequired: s,
      mergedRules: d
    } = mz(e), {
      mergedSize: c
    } = r, {
      mergedLabelPlacement: h,
      mergedLabelAlign: p,
      mergedRequireMarkPlacement: v
    } = i, u = za([]), g = za(ki()), m = o ? Oa(o.props, "disabled") : za(!1), f = Pe("Form", "-form-item", pz, gm, e, t);
    Sz(Oa(e, "path"), () => {
      e.ignorePathChange || b();
    });
    function b() {
      u.value = [], l.value = !1, a.value = !1, e.feedback && (g.value = ki());
    }
    const x = (...I) => up(this, [...I], void 0, function* (M = null, X = () => !0, H = {
      suppressWarning: !0
    }) {
      const {
        path: Q
      } = e;
      H ? H.first || (H.first = e.first) : H = {};
      const {
        value: oe
      } = d, te = o ? Fi(o.props.model, Q || "") : void 0, Y = {}, L = {}, Z = (M ? oe.filter((W) => Array.isArray(W.trigger) ? W.trigger.includes(M) : W.trigger === M) : oe).filter(X).map((W, ie) => {
        const ye = Object.assign({}, W);
        if (ye.validator && (ye.validator = fp(ye.validator, !1)), ye.asyncValidator && (ye.asyncValidator = fp(ye.asyncValidator, !0)), ye.renderMessage) {
          const Me = `__renderMessage__${ie}`;
          L[Me] = ye.message, ye.message = Me, Y[Me] = ye.renderMessage;
        }
        return ye;
      }), ee = Z.filter((W) => W.level !== "warning"), ue = Z.filter((W) => W.level === "warning"), fe = {
        valid: !0,
        errors: void 0,
        warnings: void 0
      };
      if (!Z.length) return fe;
      const ve = Q ?? "__n_no_path__", xe = new _r({
        [ve]: ee
      }), J = new _r({
        [ve]: ue
      }), {
        validateMessages: pe
      } = (o == null ? void 0 : o.props) || {};
      pe && (xe.messages(pe), J.messages(pe));
      const j = (W) => {
        u.value = W.map((ie) => {
          const ye = (ie == null ? void 0 : ie.message) || "";
          return {
            key: ye,
            render: () => ye.startsWith("__renderMessage__") ? Y[ye]() : ye
          };
        }), W.forEach((ie) => {
          var ye;
          !((ye = ie.message) === null || ye === void 0) && ye.startsWith("__renderMessage__") && (ie.message = L[ie.message]);
        });
      };
      if (ee.length) {
        const W = yield new Promise((ie) => {
          xe.validate({
            [ve]: te
          }, H, ie);
        });
        W != null && W.length && (fe.valid = !1, fe.errors = W, j(W));
      }
      if (ue.length && !fe.errors) {
        const W = yield new Promise((ie) => {
          J.validate({
            [ve]: te
          }, H, ie);
        });
        W != null && W.length && (j(W), fe.warnings = W);
      }
      return !fe.errors && !fe.warnings ? b() : (l.value = !!fe.errors, a.value = !!fe.warnings), fe;
    });
    function y() {
      x("blur");
    }
    function S() {
      x("change");
    }
    function C() {
      x("focus");
    }
    function w() {
      x("input");
    }
    function $(I, M) {
      return up(this, void 0, void 0, function* () {
        let X, H, Q, oe;
        return typeof I == "string" ? (X = I, H = M) : I !== null && typeof I == "object" && (X = I.trigger, H = I.callback, Q = I.shouldRuleBeApplied, oe = I.options), yield new Promise((te, Y) => {
          x(X, Q, oe).then(({
            valid: L,
            errors: Z,
            warnings: ee
          }) => {
            L ? (H && H(void 0, {
              warnings: ee
            }), te({
              warnings: ee
            })) : (H && H(Z, {
              warnings: ee
            }), Y(Z));
          });
        });
      });
    }
    xz(gd, {
      path: Oa(e, "path"),
      disabled: m,
      mergedSize: r.mergedSize,
      mergedValidationStatus: i.mergedValidationStatus,
      restoreValidation: b,
      handleContentBlur: y,
      handleContentChange: S,
      handleContentFocus: C,
      handleContentInput: w
    });
    const k = {
      validate: $,
      restoreValidation: b,
      internalValidate: x
    }, O = za(null);
    yz(() => {
      if (!i.isAutoLabelWidth.value) return;
      const I = O.value;
      if (I !== null) {
        const M = I.style.whiteSpace;
        I.style.whiteSpace = "nowrap", I.style.width = "", o == null || o.deriveMaxChildLabelWidth(Number(getComputedStyle(I).width.slice(0, -2))), I.style.whiteSpace = M;
      }
    });
    const G = Is(() => {
      var I;
      const {
        value: M
      } = c, {
        value: X
      } = h, H = X === "top" ? "vertical" : "horizontal", {
        common: {
          cubicBezierEaseInOut: Q
        },
        self: {
          labelTextColor: oe,
          asteriskColor: te,
          lineHeight: Y,
          feedbackTextColor: L,
          feedbackTextColorWarning: Z,
          feedbackTextColorError: ee,
          feedbackPadding: ue,
          labelFontWeight: fe,
          [ne("labelHeight", M)]: ve,
          [ne("blankHeight", M)]: xe,
          [ne("feedbackFontSize", M)]: J,
          [ne("feedbackHeight", M)]: pe,
          [ne("labelPadding", H)]: j,
          [ne("labelTextAlign", H)]: W,
          [ne(ne("labelFontSize", X), M)]: ie
        }
      } = f.value;
      let ye = (I = p.value) !== null && I !== void 0 ? I : W;
      return X === "top" && (ye = ye === "right" ? "flex-end" : "flex-start"), {
        "--n-bezier": Q,
        "--n-line-height": Y,
        "--n-blank-height": xe,
        "--n-label-font-size": ie,
        "--n-label-text-align": ye,
        "--n-label-height": ve,
        "--n-label-padding": j,
        "--n-label-font-weight": fe,
        "--n-asterisk-color": te,
        "--n-label-text-color": oe,
        "--n-feedback-padding": ue,
        "--n-feedback-font-size": J,
        "--n-feedback-height": pe,
        "--n-feedback-text-color": L,
        "--n-feedback-text-color-warning": Z,
        "--n-feedback-text-color-error": ee
      };
    }), _ = n ? mt("form-item", Is(() => {
      var I;
      return `${c.value[0]}${h.value[0]}${((I = p.value) === null || I === void 0 ? void 0 : I[0]) || ""}`;
    }), G, e) : void 0, V = Is(() => h.value === "left" && v.value === "left" && p.value === "left");
    return Object.assign(Object.assign(Object.assign(Object.assign({
      labelElementRef: O,
      mergedClsPrefix: t,
      mergedRequired: s,
      feedbackId: g,
      renderExplains: u,
      reverseColSpace: V
    }, i), r), k), {
      cssVars: n ? void 0 : G,
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
      const d = nn("span", {
        class: `${t}-form-item-label__text`
      }, s), c = l ? nn("span", {
        class: `${t}-form-item-label__asterisk`
      }, r !== "left" ? " *" : "* ") : r === "right-hanging" && nn("span", {
        class: `${t}-form-item-label__asterisk-placeholder`
      }, " *"), {
        labelProps: h
      } = this;
      return nn("label", Object.assign({}, h, {
        class: [h == null ? void 0 : h.class, `${t}-form-item-label`, `${t}-form-item-label--${r}-mark`, this.reverseColSpace && `${t}-form-item-label--reverse-columns-space`],
        style: this.mergedLabelStyle,
        ref: "labelElementRef"
      }), r === "left" ? [c, d] : [d, c]);
    };
    return nn("div", {
      class: [`${t}-form-item`, this.themeClass, `${t}-form-item--${this.mergedSize}-size`, `${t}-form-item--${this.mergedLabelPlacement}-labelled`, this.isAutoLabelWidth && `${t}-form-item--auto-label-width`, !n && `${t}-form-item--no-label`],
      style: this.cssVars
    }, n && a(), nn("div", {
      class: [`${t}-form-item-blank`, this.contentClass, this.mergedValidationStatus && `${t}-form-item-blank--${this.mergedValidationStatus}`],
      style: this.contentStyle
    }, e), this.mergedShowFeedback ? nn("div", {
      key: this.feedbackId,
      style: this.feedbackStyle,
      class: [`${t}-form-item-feedback-wrapper`, this.feedbackClass]
    }, nn(Cz, {
      name: "fade-down-transition",
      mode: "out-in"
    }, {
      default: () => {
        const {
          mergedValidationStatus: s
        } = this;
        return Le(e.feedback, (d) => {
          var c;
          const {
            feedback: h
          } = this, p = d || h ? nn("div", {
            key: "__feedback__",
            class: `${t}-form-item-feedback__line`
          }, d || h) : this.renderExplains.length ? (c = this.renderExplains) === null || c === void 0 ? void 0 : c.map(({
            key: v,
            render: u
          }) => nn("div", {
            key: v,
            class: `${t}-form-item-feedback__line`
          }, u())) : null;
          return p ? s === "warning" ? nn("div", {
            key: "controlled-warning",
            class: `${t}-form-item-feedback ${t}-form-item-feedback--warning`
          }, p) : s === "error" ? nn("div", {
            key: "controlled-error",
            class: `${t}-form-item-feedback ${t}-form-item-feedback--error`
          }, p) : s === "success" ? nn("div", {
            key: "controlled-success",
            class: `${t}-form-item-feedback ${t}-form-item-feedback--success`
          }, p) : nn("div", {
            key: "controlled-default",
            class: `${t}-form-item-feedback`
          }, p) : null;
        });
      }
    })) : null);
  }
}), hp = 1, wm = "n-grid", Rz = window.Vue.computed, Pz = window.Vue.defineComponent, Tz = window.Vue.getCurrentInstance, pp = window.Vue.h, _z = window.Vue.inject, ym = 1, Ec = {
  span: {
    type: [Number, String],
    default: ym
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
}, Fz = To(Ec), Ez = Pz({
  __GRID_ITEM__: !0,
  name: "GridItem",
  alias: ["Gi"],
  props: Ec,
  setup() {
    const {
      isSsrRef: e,
      xGapRef: t,
      itemStyleRef: n,
      overflowRef: o,
      layoutShiftDisabledRef: r
    } = _z(wm), i = Tz();
    return {
      overflow: o,
      itemStyle: n,
      layoutShiftDisabled: r,
      mergedXGap: Rz(() => ct(t.value || 0)),
      deriveStyle: () => {
        e.value;
        const {
          privateSpan: l = ym,
          privateShow: a = !0,
          privateColStart: s = void 0,
          privateOffset: d = 0
        } = i.vnode.props, {
          value: c
        } = t, h = ct(c || 0);
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
      return pp("div", {
        style: {
          gridColumn: `span ${n} / span ${n}`,
          marginLeft: o ? `calc((100% - (${n} - 1) * ${r}) / ${n} * ${o} + ${r} * ${o})` : ""
        }
      }, this.$slots);
    }
    return pp("div", {
      style: [this.itemStyle, this.deriveStyle()]
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e, {
      overflow: this.overflow
    }));
  }
}), zz = window.Vue.defineComponent, vp = window.Vue.h, Oz = window.Vue.ref, Mz = Object.assign(Object.assign({}, Ec), Fc), Ft = zz({
  __GRID_ITEM__: !0,
  name: "FormItemGridItem",
  alias: ["FormItemGi"],
  props: Mz,
  setup() {
    const e = Oz(null);
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
    return vp(Ez, Po(this.$.vnode.props || {}, Fz), {
      default: () => {
        const e = Po(this.$props, $z);
        return vp(kz, Object.assign({
          ref: "formItemInstRef"
        }, e), this.$slots);
      }
    });
  }
}), Vz = {
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
}, gp = window.Vue.cloneVNode, As = window.Vue.computed, Iz = window.Vue.defineComponent, Bs = window.Vue.h, mp = window.Vue.mergeProps, Az = window.Vue.onMounted, Bz = window.Vue.provide, Ma = window.Vue.ref, bp = window.Vue.toRef, Lz = window.Vue.vShow, xm = 24, Ls = "__ssr__", Nz = {
  layoutShiftDisabled: Boolean,
  responsive: {
    type: [String, Boolean],
    default: "self"
  },
  cols: {
    type: [Number, String],
    default: xm
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
}, wp = Iz({
  name: "Grid",
  inheritAttrs: !1,
  props: Nz,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBreakpointsRef: n
    } = He(e), o = /^\d+$/, r = Ma(void 0), i = ay((n == null ? void 0 : n.value) || Vz), l = Ae(() => !!(e.itemResponsive || !o.test(e.cols.toString()) || !o.test(e.xGap.toString()) || !o.test(e.yGap.toString()))), a = As(() => {
      if (l.value)
        return e.responsive === "self" ? r.value : i.value;
    }), s = Ae(() => {
      var f;
      return (f = Number(rr(e.cols.toString(), a.value))) !== null && f !== void 0 ? f : xm;
    }), d = Ae(() => rr(e.xGap.toString(), a.value)), c = Ae(() => rr(e.yGap.toString(), a.value)), h = (f) => {
      r.value = f.contentRect.width;
    }, p = (f) => {
      $i(h, f);
    }, v = Ma(!1), u = As(() => {
      if (e.responsive === "self")
        return p;
    }), g = Ma(!1), m = Ma();
    return Az(() => {
      const {
        value: f
      } = m;
      f && f.hasAttribute(Ls) && (f.removeAttribute(Ls), g.value = !0);
    }), Bz(wm, {
      layoutShiftDisabledRef: bp(e, "layoutShiftDisabled"),
      isSsrRef: g,
      itemStyleRef: bp(e, "itemStyle"),
      xGapRef: d,
      overflowRef: v
    }), {
      isSsr: !Jo,
      contentEl: m,
      mergedClsPrefix: t,
      style: As(() => e.layoutShiftDisabled ? {
        width: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${e.cols}, minmax(0, 1fr))`,
        columnGap: ct(e.xGap),
        rowGap: ct(e.yGap)
      } : {
        width: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${s.value}, minmax(0, 1fr))`,
        columnGap: ct(d.value),
        rowGap: ct(c.value)
      }),
      isResponsive: l,
      responsiveQuery: a,
      responsiveCols: s,
      handleResize: u,
      overflow: v
    };
  },
  render() {
    if (this.layoutShiftDisabled)
      return Bs("div", mp({
        ref: "contentEl",
        class: `${this.mergedClsPrefix}-grid`,
        style: this.style
      }, this.$attrs), this.$slots);
    const e = () => {
      var t, n, o, r, i, l, a;
      this.overflow = !1;
      const s = jn(oc(this)), d = [], {
        collapsed: c,
        collapsedRows: h,
        responsiveCols: p,
        responsiveQuery: v
      } = this;
      s.forEach((b) => {
        var x, y, S, C, w;
        if (((x = b == null ? void 0 : b.type) === null || x === void 0 ? void 0 : x.__GRID_ITEM__) !== !0) return;
        if (L1(b)) {
          const O = gp(b);
          O.props ? O.props.privateShow = !1 : O.props = {
            privateShow: !1
          }, d.push({
            child: O,
            rawChildSpan: 0
          });
          return;
        }
        b.dirs = ((y = b.dirs) === null || y === void 0 ? void 0 : y.filter(({
          dir: O
        }) => O !== Lz)) || null, ((S = b.dirs) === null || S === void 0 ? void 0 : S.length) === 0 && (b.dirs = null);
        const $ = gp(b), k = Number((w = rr((C = $.props) === null || C === void 0 ? void 0 : C.span, v)) !== null && w !== void 0 ? w : hp);
        k !== 0 && d.push({
          child: $,
          rawChildSpan: k
        });
      });
      let u = 0;
      const g = (t = d[d.length - 1]) === null || t === void 0 ? void 0 : t.child;
      if (g != null && g.props) {
        const b = (n = g.props) === null || n === void 0 ? void 0 : n.suffix;
        b !== void 0 && b !== !1 && (u = Number((r = rr((o = g.props) === null || o === void 0 ? void 0 : o.span, v)) !== null && r !== void 0 ? r : hp), g.props.privateSpan = u, g.props.privateColStart = p + 1 - u, g.props.privateShow = (i = g.props.privateShow) !== null && i !== void 0 ? i : !0);
      }
      let m = 0, f = !1;
      for (const {
        child: b,
        rawChildSpan: x
      } of d) {
        if (f && (this.overflow = !0), !f) {
          const y = Number((a = rr((l = b.props) === null || l === void 0 ? void 0 : l.offset, v)) !== null && a !== void 0 ? a : 0), S = Math.min(x + y, p);
          if (b.props ? (b.props.privateSpan = S, b.props.privateOffset = y) : b.props = {
            privateSpan: S,
            privateOffset: y
          }, c) {
            const C = m % p;
            S + C > p && (m += p - C), S + m + u > h * p ? f = !0 : m += S;
          }
        }
        f && (b.props ? b.props.privateShow !== !0 && (b.props.privateShow = !1) : b.props = {
          privateShow: !1
        });
      }
      return Bs("div", mp({
        ref: "contentEl",
        class: `${this.mergedClsPrefix}-grid`,
        style: this.style,
        [Ls]: this.isSsr || void 0
      }, this.$attrs), d.map(({
        child: b
      }) => b));
    };
    return this.isResponsive && this.responsive === "self" ? Bs(Hn, {
      onResize: this.handleResize
    }, {
      default: e
    }) : e();
  }
}), Dz = D([T("input-number-suffix", `
 display: inline-block;
 margin-right: 10px;
 `), T("input-number-prefix", `
 display: inline-block;
 margin-left: 10px;
 `)]);
function Hz(e) {
  return e == null || typeof e == "string" && e.trim() === "" ? null : Number(e);
}
function jz(e) {
  return e.includes(".") && (/^(-)?\d+.*(\.|0)$/.test(e) || /^-?\d*$/.test(e)) || e === "-" || e === "-0";
}
function Ns(e) {
  return e == null ? !0 : !Number.isNaN(e);
}
function yp(e, t) {
  return typeof e != "number" ? "" : t === void 0 ? String(e) : e.toFixed(t);
}
function Ds(e) {
  if (e === null) return null;
  if (typeof e == "number")
    return e;
  {
    const t = Number(e);
    return Number.isNaN(t) ? null : t;
  }
}
const Wz = window.Vue.computed, Uz = window.Vue.defineComponent, Vn = window.Vue.h, Kz = window.Vue.nextTick, si = window.Vue.ref, qz = window.Vue.toRef, Gz = window.Vue.watch;
window.Vue.watchEffect;
const xp = 800, Cp = 100, Xz = Object.assign(Object.assign({}, Pe.props), {
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
}), Co = Uz({
  name: "InputNumber",
  props: Xz,
  slots: Object,
  setup(e) {
    const {
      mergedBorderedRef: t,
      mergedClsPrefixRef: n,
      mergedRtlRef: o
    } = He(e), r = Pe("InputNumber", "-input-number", Dz, wE, e, n), {
      localeRef: i
    } = Er("InputNumber"), l = so(e), {
      mergedSizeRef: a,
      mergedDisabledRef: s,
      mergedStatusRef: d
    } = l, c = si(null), h = si(null), p = si(null), v = si(e.defaultValue), u = qz(e, "value"), g = Bt(u, v), m = si(""), f = (se) => {
      const P = String(se).split(".")[1];
      return P ? P.length : 0;
    }, b = (se) => {
      const P = [e.min, e.max, e.step, se].map((R) => R === void 0 ? 0 : f(R));
      return Math.max(...P);
    }, x = Ae(() => {
      const {
        placeholder: se
      } = e;
      return se !== void 0 ? se : i.value.placeholder;
    }), y = Ae(() => {
      const se = Ds(e.step);
      return se !== null ? se === 0 ? 1 : Math.abs(se) : 1;
    }), S = Ae(() => {
      const se = Ds(e.min);
      return se !== null ? se : null;
    }), C = Ae(() => {
      const se = Ds(e.max);
      return se !== null ? se : null;
    }), w = () => {
      const {
        value: se
      } = g;
      if (Ns(se)) {
        const {
          format: P,
          precision: R
        } = e;
        P ? m.value = P(se) : se === null || R === void 0 || f(se) > R ? m.value = yp(se, void 0) : m.value = yp(se, R);
      } else
        m.value = String(se);
    };
    w();
    const $ = (se) => {
      const {
        value: P
      } = g;
      if (se === P) {
        w();
        return;
      }
      const {
        "onUpdate:value": R,
        onUpdateValue: E,
        onChange: N
      } = e, {
        nTriggerFormInput: re,
        nTriggerFormChange: de
      } = l;
      N && ce(N, se), E && ce(E, se), R && ce(R, se), v.value = se, re(), de();
    }, k = ({
      offset: se,
      doUpdateIfValid: P,
      fixPrecision: R,
      isInputing: E
    }) => {
      const {
        value: N
      } = m;
      if (E && jz(N))
        return !1;
      const re = (e.parse || Hz)(N);
      if (re === null)
        return P && $(null), null;
      if (Ns(re)) {
        const de = f(re), {
          precision: z
        } = e;
        if (z !== void 0 && z < de && !R)
          return !1;
        let K = Number.parseFloat((re + se).toFixed(z ?? b(re)));
        if (Ns(K)) {
          const {
            value: me
          } = C, {
            value: _e
          } = S;
          if (me !== null && K > me) {
            if (!P || E) return !1;
            K = me;
          }
          if (_e !== null && K < _e) {
            if (!P || E) return !1;
            K = _e;
          }
          return e.validator && !e.validator(K) ? !1 : (P && $(K), K);
        }
      }
      return !1;
    }, O = Ae(() => k({
      offset: 0,
      doUpdateIfValid: !1,
      isInputing: !1,
      fixPrecision: !1
    }) === !1), G = Ae(() => {
      const {
        value: se
      } = g;
      if (e.validator && se === null)
        return !1;
      const {
        value: P
      } = y;
      return k({
        offset: -P,
        doUpdateIfValid: !1,
        isInputing: !1,
        fixPrecision: !1
      }) !== !1;
    }), _ = Ae(() => {
      const {
        value: se
      } = g;
      if (e.validator && se === null)
        return !1;
      const {
        value: P
      } = y;
      return k({
        offset: +P,
        doUpdateIfValid: !1,
        isInputing: !1,
        fixPrecision: !1
      }) !== !1;
    });
    function V(se) {
      const {
        onFocus: P
      } = e, {
        nTriggerFormFocus: R
      } = l;
      P && ce(P, se), R();
    }
    function I(se) {
      var P, R;
      if (se.target === ((P = c.value) === null || P === void 0 ? void 0 : P.wrapperElRef))
        return;
      const E = k({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !1,
        fixPrecision: !0
      });
      if (E !== !1) {
        const de = (R = c.value) === null || R === void 0 ? void 0 : R.inputElRef;
        de && (de.value = String(E || "")), g.value === E && w();
      } else
        w();
      const {
        onBlur: N
      } = e, {
        nTriggerFormBlur: re
      } = l;
      N && ce(N, se), re(), Kz(() => {
        w();
      });
    }
    function M(se) {
      const {
        onClear: P
      } = e;
      P && ce(P, se);
    }
    function X() {
      const {
        value: se
      } = _;
      if (!se) {
        xe();
        return;
      }
      const {
        value: P
      } = g;
      if (P === null)
        e.validator || $(te());
      else {
        const {
          value: R
        } = y;
        k({
          offset: R,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        });
      }
    }
    function H() {
      const {
        value: se
      } = G;
      if (!se) {
        fe();
        return;
      }
      const {
        value: P
      } = g;
      if (P === null)
        e.validator || $(te());
      else {
        const {
          value: R
        } = y;
        k({
          offset: -R,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        });
      }
    }
    const Q = V, oe = I;
    function te() {
      if (e.validator) return null;
      const {
        value: se
      } = S, {
        value: P
      } = C;
      return se !== null ? Math.max(0, se) : P !== null ? Math.min(0, P) : 0;
    }
    function Y(se) {
      M(se), $(null);
    }
    function L(se) {
      var P, R, E;
      !((P = p.value) === null || P === void 0) && P.$el.contains(se.target) && se.preventDefault(), !((R = h.value) === null || R === void 0) && R.$el.contains(se.target) && se.preventDefault(), (E = c.value) === null || E === void 0 || E.activate();
    }
    let Z = null, ee = null, ue = null;
    function fe() {
      ue && (window.clearTimeout(ue), ue = null), Z && (window.clearInterval(Z), Z = null);
    }
    let ve = null;
    function xe() {
      ve && (window.clearTimeout(ve), ve = null), ee && (window.clearInterval(ee), ee = null);
    }
    function J() {
      fe(), ue = window.setTimeout(() => {
        Z = window.setInterval(() => {
          H();
        }, Cp);
      }, xp), Ke("mouseup", document, fe, {
        once: !0
      });
    }
    function pe() {
      xe(), ve = window.setTimeout(() => {
        ee = window.setInterval(() => {
          X();
        }, Cp);
      }, xp), Ke("mouseup", document, xe, {
        once: !0
      });
    }
    const j = () => {
      ee || X();
    }, W = () => {
      Z || H();
    };
    function ie(se) {
      var P, R;
      if (se.key === "Enter") {
        if (se.target === ((P = c.value) === null || P === void 0 ? void 0 : P.wrapperElRef))
          return;
        k({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && ((R = c.value) === null || R === void 0 || R.deactivate());
      } else if (se.key === "ArrowUp") {
        if (!_.value || e.keyboard.ArrowUp === !1) return;
        se.preventDefault(), k({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && X();
      } else if (se.key === "ArrowDown") {
        if (!G.value || e.keyboard.ArrowDown === !1) return;
        se.preventDefault(), k({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && H();
      }
    }
    function ye(se) {
      m.value = se, e.updateValueOnInput && !e.format && !e.parse && e.precision === void 0 && k({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !0,
        fixPrecision: !1
      });
    }
    Gz(g, () => {
      w();
    });
    const Me = {
      focus: () => {
        var se;
        return (se = c.value) === null || se === void 0 ? void 0 : se.focus();
      },
      blur: () => {
        var se;
        return (se = c.value) === null || se === void 0 ? void 0 : se.blur();
      },
      select: () => {
        var se;
        return (se = c.value) === null || se === void 0 ? void 0 : se.select();
      }
    }, ze = Lt("InputNumber", o, n);
    return Object.assign(Object.assign({}, Me), {
      rtlEnabled: ze,
      inputInstRef: c,
      minusButtonInstRef: h,
      addButtonInstRef: p,
      mergedClsPrefix: n,
      mergedBordered: t,
      uncontrolledValue: v,
      mergedValue: g,
      mergedPlaceholder: x,
      displayedValueInvalid: O,
      mergedSize: a,
      mergedDisabled: s,
      displayedValue: m,
      addable: _,
      minusable: G,
      mergedStatus: d,
      handleFocus: Q,
      handleBlur: oe,
      handleClear: Y,
      handleMouseDown: L,
      handleAddClick: j,
      handleMinusClick: W,
      handleAddMousedown: pe,
      handleMinusMousedown: J,
      handleKeyDown: ie,
      handleUpdateDisplayedValue: ye,
      // theme
      mergedTheme: r,
      inputThemeOverrides: {
        paddingSmall: "0 8px 0 10px",
        paddingMedium: "0 8px 0 12px",
        paddingLarge: "0 8px 0 14px"
      },
      buttonThemeOverrides: Wz(() => {
        const {
          self: {
            iconColorDisabled: se
          }
        } = r.value, [P, R, E, N] = Ro(se);
        return {
          textColorTextDisabled: `rgb(${P}, ${R}, ${E})`,
          opacityDisabled: `${N}`
        };
      })
    });
  },
  render() {
    const {
      mergedClsPrefix: e,
      $slots: t
    } = this, n = () => Vn(ah, {
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
      icon: () => dn(t["minus-icon"], () => [Vn(Ct, {
        clsPrefix: e
      }, {
        default: () => Vn(nP, null)
      })])
    }), o = () => Vn(ah, {
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
      icon: () => dn(t["add-icon"], () => [Vn(Ct, {
        clsPrefix: e
      }, {
        default: () => Vn(wg, null)
      })])
    });
    return Vn("div", {
      class: [`${e}-input-number`, this.rtlEnabled && `${e}-input-number--rtl`]
    }, Vn(xt, {
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
        return this.showButton && this.buttonPlacement === "both" ? [n(), Le(t.prefix, (i) => i ? Vn("span", {
          class: `${e}-input-number-prefix`
        }, i) : null)] : (r = t.prefix) === null || r === void 0 ? void 0 : r.call(t);
      },
      suffix: () => {
        var r;
        return this.showButton ? [Le(t.suffix, (i) => i ? Vn("span", {
          class: `${e}-input-number-suffix`
        }, i) : null), this.buttonPlacement === "right" ? n() : null, o()] : (r = t.suffix) === null || r === void 0 ? void 0 : r.call(t);
      }
    }));
  }
}), Hs = window.Vue.h;
function Yz() {
  return Hs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 36 36"
  }, Hs("path", {
    fill: "#EF9645",
    d: "M15.5 2.965c1.381 0 2.5 1.119 2.5 2.5v.005L20.5.465c1.381 0 2.5 1.119 2.5 2.5V4.25l2.5-1.535c1.381 0 2.5 1.119 2.5 2.5V8.75L29 18H15.458L15.5 2.965z"
  }), Hs("path", {
    fill: "#FFDC5D",
    d: "M4.625 16.219c1.381-.611 3.354.208 4.75 2.188.917 1.3 1.187 3.151 2.391 3.344.46.073 1.234-.313 1.234-1.397V4.5s0-2 2-2 2 2 2 2v11.633c0-.029 1-.064 1-.082V2s0-2 2-2 2 2 2 2v14.053c0 .017 1 .041 1 .069V4.25s0-2 2-2 2 2 2 2v12.638c0 .118 1 .251 1 .398V8.75s0-2 2-2 2 2 2 2V24c0 6.627-5.373 12-12 12-4.775 0-8.06-2.598-9.896-5.292C8.547 28.423 8.096 26.051 8 25.334c0 0-.123-1.479-1.156-2.865-1.469-1.969-2.5-3.156-3.125-3.866-.317-.359-.625-1.707.906-2.384z"
  }));
}
const Do = window.Vue.h;
function Zz() {
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
const Ho = window.Vue.h;
function Jz() {
  return Ho("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 36 36"
  }, Ho("ellipse", {
    fill: "#292F33",
    cx: "18",
    cy: "26",
    rx: "18",
    ry: "10"
  }), Ho("ellipse", {
    fill: "#66757F",
    cx: "18",
    cy: "24",
    rx: "18",
    ry: "10"
  }), Ho("path", {
    fill: "#E1E8ED",
    d: "M18 31C3.042 31 1 16 1 12h34c0 2-1.958 19-17 19z"
  }), Ho("path", {
    fill: "#77B255",
    d: "M35 12.056c0 5.216-7.611 9.444-17 9.444S1 17.271 1 12.056C1 6.84 8.611 3.611 18 3.611s17 3.229 17 8.445z"
  }), Ho("ellipse", {
    fill: "#A6D388",
    cx: "18",
    cy: "13",
    rx: "15",
    ry: "7"
  }), Ho("path", {
    d: "M21 17c-.256 0-.512-.098-.707-.293-2.337-2.337-2.376-4.885-.125-8.262.739-1.109.9-2.246.478-3.377-.461-1.236-1.438-1.996-1.731-2.077-.553 0-.958-.443-.958-.996 0-.552.491-.995 1.043-.995.997 0 2.395 1.153 3.183 2.625 1.034 1.933.91 4.039-.351 5.929-1.961 2.942-1.531 4.332-.125 5.738.391.391.391 1.023 0 1.414-.195.196-.451.294-.707.294zm-6-2c-.256 0-.512-.098-.707-.293-2.337-2.337-2.376-4.885-.125-8.262.727-1.091.893-2.083.494-2.947-.444-.961-1.431-1.469-1.684-1.499-.552 0-.989-.447-.989-1 0-.552.458-1 1.011-1 .997 0 2.585.974 3.36 2.423.481.899 1.052 2.761-.528 5.131-1.961 2.942-1.531 4.332-.125 5.738.391.391.391 1.023 0 1.414-.195.197-.451.295-.707.295z",
    fill: "#5C913B"
  }));
}
const Va = window.Vue.h;
function Qz() {
  return Va("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 36 36"
  }, Va("path", {
    fill: "#FFCC4D",
    d: "M36 18c0 9.941-8.059 18-18 18-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"
  }), Va("ellipse", {
    fill: "#664500",
    cx: "18",
    cy: "27",
    rx: "5",
    ry: "6"
  }), Va("path", {
    fill: "#664500",
    d: "M5.999 11c-.208 0-.419-.065-.599-.2-.442-.331-.531-.958-.2-1.4C8.462 5.05 12.816 5 13 5c.552 0 1 .448 1 1 0 .551-.445.998-.996 1-.155.002-3.568.086-6.204 3.6-.196.262-.497.4-.801.4zm24.002 0c-.305 0-.604-.138-.801-.4-2.64-3.521-6.061-3.598-6.206-3.6-.55-.006-.994-.456-.991-1.005C22.006 5.444 22.45 5 23 5c.184 0 4.537.05 7.8 4.4.332.442.242 1.069-.2 1.4-.18.135-.39.2-.599.2zm-16.087 4.5l1.793-1.793c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0L12.5 14.086l-1.793-1.793c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.793 1.793-1.793 1.793c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l1.793-1.793 1.793 1.793c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414L13.914 15.5zm11 0l1.793-1.793c.391-.391.391-1.023 0-1.414s-1.023-.391-1.414 0L23.5 14.086l-1.793-1.793c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l1.793 1.793-1.793 1.793c-.391.391-.391 1.023 0 1.414.195.195.451.293.707.293s.512-.098.707-.293l1.793-1.793 1.793 1.793c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023 0-1.414L24.914 15.5z"
  }));
}
const eO = T("result", `
 color: var(--n-text-color);
 line-height: var(--n-line-height);
 font-size: var(--n-font-size);
 transition:
 color .3s var(--n-bezier);
`, [T("result-icon", `
 display: flex;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `, [A("status-image", `
 font-size: var(--n-icon-size);
 width: 1em;
 height: 1em;
 `), T("base-icon", `
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), T("result-content", {
  marginTop: "24px"
}), T("result-footer", `
 margin-top: 24px;
 text-align: center;
 `), T("result-header", [A("title", `
 margin-top: 16px;
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 text-align: center;
 color: var(--n-title-text-color);
 font-size: var(--n-title-font-size);
 `), A("description", `
 margin-top: 4px;
 text-align: center;
 font-size: var(--n-font-size);
 `)])]), Sp = window.Vue.computed, tO = window.Vue.defineComponent, pn = window.Vue.h, nO = {
  403: Yz,
  404: Zz,
  418: Jz,
  500: Qz,
  info: () => pn(kd, null),
  success: () => pn(Sg, null),
  warning: () => pn($g, null),
  error: () => pn(Cg, null)
}, oO = Object.assign(Object.assign({}, Pe.props), {
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
}), rO = tO({
  name: "Result",
  props: oO,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = He(e), o = Pe("Result", "-result", eO, CE, e, t), r = Sp(() => {
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
          [ne("iconColor", a)]: v,
          [ne("fontSize", l)]: u,
          [ne("titleFontSize", l)]: g,
          [ne("iconSize", l)]: m
        }
      } = o.value;
      return {
        "--n-bezier": s,
        "--n-font-size": u,
        "--n-icon-size": m,
        "--n-line-height": c,
        "--n-text-color": d,
        "--n-title-font-size": g,
        "--n-title-font-weight": p,
        "--n-title-text-color": h,
        "--n-icon-color": v || ""
      };
    }), i = n ? mt("result", Sp(() => {
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
    return r == null || r(), pn("div", {
      class: [`${o}-result`, this.themeClass],
      style: this.cssVars
    }, pn("div", {
      class: `${o}-result-icon`
    }, ((e = n.icon) === null || e === void 0 ? void 0 : e.call(n)) || pn(Ct, {
      clsPrefix: o
    }, {
      default: () => nO[t]()
    })), pn("div", {
      class: `${o}-result-header`
    }, this.title ? pn("div", {
      class: `${o}-result-header__title`
    }, this.title) : null, this.description ? pn("div", {
      class: `${o}-result-header__description`
    }, this.description) : null), n.default && pn("div", {
      class: `${o}-result-content`
    }, n), n.footer && pn("div", {
      class: `${o}-result-footer`
    }, n.footer()));
  }
}), iO = T("switch", `
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`, [A("children-placeholder", `
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `), A("rail-placeholder", `
 display: flex;
 flex-wrap: none;
 `), A("button-placeholder", `
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `), T("base-loading", `
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `, [gn({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})]), A("checked, unchecked", `
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
 `), A("checked", `
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), A("unchecked", `
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), D("&:focus", [A("rail", `
 box-shadow: var(--n-box-shadow-focus);
 `)]), B("round", [A("rail", "border-radius: calc(var(--n-rail-height) / 2);", [A("button", "border-radius: calc(var(--n-button-height) / 2);")])]), rt("disabled", [rt("icon", [B("rubber-band", [B("pressed", [A("rail", [A("button", "max-width: var(--n-button-width-pressed);")])]), A("rail", [D("&:active", [A("button", "max-width: var(--n-button-width-pressed);")])]), B("active", [B("pressed", [A("rail", [A("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]), A("rail", [D("&:active", [A("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]), B("active", [A("rail", [A("button", "left: calc(100% - var(--n-button-width) - var(--n-offset))")])]), A("rail", `
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
 `, [A("button-icon", `
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
 `, [gn()]), A("button", `
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
 `)]), B("active", [A("rail", "background-color: var(--n-rail-color-active);")]), B("loading", [A("rail", `
 cursor: wait;
 `)]), B("disabled", [A("rail", `
 cursor: not-allowed;
 opacity: .5;
 `)])]), Ia = window.Vue.computed, aO = window.Vue.defineComponent, on = window.Vue.h, js = window.Vue.ref, lO = window.Vue.toRef;
window.Vue.watchEffect;
const sO = Object.assign(Object.assign({}, Pe.props), {
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
let di;
const In = aO({
  name: "Switch",
  props: sO,
  slots: Object,
  setup(e) {
    di === void 0 && (typeof CSS < "u" ? typeof CSS.supports < "u" ? di = CSS.supports("width", "max(1px)") : di = !1 : di = !0);
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = He(e), o = Pe("Switch", "-switch", iO, kE, e, t), r = so(e), {
      mergedSizeRef: i,
      mergedDisabledRef: l
    } = r, a = js(e.defaultValue), s = lO(e, "value"), d = Bt(s, a), c = Ia(() => d.value === e.checkedValue), h = js(!1), p = js(!1), v = Ia(() => {
      const {
        railStyle: $
      } = e;
      if ($)
        return $({
          focused: p.value,
          checked: c.value
        });
    });
    function u($) {
      const {
        "onUpdate:value": k,
        onChange: O,
        onUpdateValue: G
      } = e, {
        nTriggerFormInput: _,
        nTriggerFormChange: V
      } = r;
      k && ce(k, $), G && ce(G, $), O && ce(O, $), a.value = $, _(), V();
    }
    function g() {
      const {
        nTriggerFormFocus: $
      } = r;
      $();
    }
    function m() {
      const {
        nTriggerFormBlur: $
      } = r;
      $();
    }
    function f() {
      e.loading || l.value || (d.value !== e.checkedValue ? u(e.checkedValue) : u(e.uncheckedValue));
    }
    function b() {
      p.value = !0, g();
    }
    function x() {
      p.value = !1, m(), h.value = !1;
    }
    function y($) {
      e.loading || l.value || $.key === " " && (d.value !== e.checkedValue ? u(e.checkedValue) : u(e.uncheckedValue), h.value = !1);
    }
    function S($) {
      e.loading || l.value || $.key === " " && ($.preventDefault(), h.value = !0);
    }
    const C = Ia(() => {
      const {
        value: $
      } = i, {
        self: {
          opacityDisabled: k,
          railColor: O,
          railColorActive: G,
          buttonBoxShadow: _,
          buttonColor: V,
          boxShadowFocus: I,
          loadingColor: M,
          textColor: X,
          iconColor: H,
          [ne("buttonHeight", $)]: Q,
          [ne("buttonWidth", $)]: oe,
          [ne("buttonWidthPressed", $)]: te,
          [ne("railHeight", $)]: Y,
          [ne("railWidth", $)]: L,
          [ne("railBorderRadius", $)]: Z,
          [ne("buttonBorderRadius", $)]: ee
        },
        common: {
          cubicBezierEaseInOut: ue
        }
      } = o.value;
      let fe, ve, xe;
      return di ? (fe = `calc((${Y} - ${Q}) / 2)`, ve = `max(${Y}, ${Q})`, xe = `max(${L}, calc(${L} + ${Q} - ${Y}))`) : (fe = ct((kt(Y) - kt(Q)) / 2), ve = ct(Math.max(kt(Y), kt(Q))), xe = kt(Y) > kt(Q) ? L : ct(kt(L) + kt(Q) - kt(Y))), {
        "--n-bezier": ue,
        "--n-button-border-radius": ee,
        "--n-button-box-shadow": _,
        "--n-button-color": V,
        "--n-button-width": oe,
        "--n-button-width-pressed": te,
        "--n-button-height": Q,
        "--n-height": ve,
        "--n-offset": fe,
        "--n-opacity-disabled": k,
        "--n-rail-border-radius": Z,
        "--n-rail-color": O,
        "--n-rail-color-active": G,
        "--n-rail-height": Y,
        "--n-rail-width": L,
        "--n-width": xe,
        "--n-box-shadow-focus": I,
        "--n-loading-color": M,
        "--n-text-color": X,
        "--n-icon-color": H
      };
    }), w = n ? mt("switch", Ia(() => i.value[0]), C, e) : void 0;
    return {
      handleClick: f,
      handleBlur: x,
      handleFocus: b,
      handleKeyup: y,
      handleKeydown: S,
      mergedRailStyle: v,
      pressed: h,
      mergedClsPrefix: t,
      mergedValue: d,
      checked: c,
      mergedDisabled: l,
      cssVars: n ? void 0 : C,
      themeClass: w == null ? void 0 : w.themeClass,
      onRender: w == null ? void 0 : w.onRender
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
    } = i, h = !(Sr(s) && Sr(d) && Sr(c));
    return on("div", {
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
    }, on("div", {
      class: `${e}-switch__rail`,
      "aria-hidden": "true",
      style: o
    }, Le(l, (p) => Le(a, (v) => p || v ? on("div", {
      "aria-hidden": !0,
      class: `${e}-switch__children-placeholder`
    }, on("div", {
      class: `${e}-switch__rail-placeholder`
    }, on("div", {
      class: `${e}-switch__button-placeholder`
    }), p), on("div", {
      class: `${e}-switch__rail-placeholder`
    }, on("div", {
      class: `${e}-switch__button-placeholder`
    }), v)) : null)), on("div", {
      class: `${e}-switch__button`
    }, Le(s, (p) => Le(d, (v) => Le(c, (u) => on(zr, null, {
      default: () => this.loading ? on(Mr, {
        key: "loading",
        clsPrefix: e,
        strokeWidth: 20
      }) : this.checked && (v || p) ? on("div", {
        class: `${e}-switch__button-icon`,
        key: v ? "checked-icon" : "icon"
      }, v || p) : !this.checked && (u || p) ? on("div", {
        class: `${e}-switch__button-icon`,
        key: u ? "unchecked-icon" : "icon"
      }, u || p) : null
    })))), Le(l, (p) => p && on("div", {
      key: "checked",
      class: `${e}-switch__checked`
    }, p)), Le(a, (p) => p && on("div", {
      key: "unchecked",
      class: `${e}-switch__unchecked`
    }, p)))));
  }
}), zc = "n-tabs", dO = window.Vue.defineComponent, cO = window.Vue.h, uO = window.Vue.inject;
window.Vue.watchEffect;
const Cm = {
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
}, Ws = dO({
  __TAB_PANE__: !0,
  name: "TabPane",
  alias: ["TabPanel"],
  props: Cm,
  slots: Object,
  setup(e) {
    const t = uO(zc, null);
    return t || Bv("tab-pane", "`n-tab-pane` must be placed inside `n-tabs`."), {
      style: t.paneStyleRef,
      class: t.paneClassRef,
      mergedClsPrefix: t.mergedClsPrefixRef
    };
  },
  render() {
    return cO("div", {
      class: [`${this.mergedClsPrefix}-tab-pane`, this.class],
      style: this.style
    }, this.$slots);
  }
}), fO = window.Vue.computed, hO = window.Vue.defineComponent, pO = window.Vue.Fragment, ro = window.Vue.h, vO = window.Vue.inject, gO = window.Vue.mergeProps, mO = Object.assign({
  internalLeftPadded: Boolean,
  internalAddable: Boolean,
  internalCreatedByPane: Boolean
}, rc(Cm, ["displayDirective"])), Ad = hO({
  __TAB__: !0,
  inheritAttrs: !1,
  name: "Tab",
  props: mO,
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
      handleClose: u
    } = vO(zc);
    return {
      trigger: h,
      mergedClosable: fO(() => {
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
        g.stopPropagation(), !e.disabled && u(e.name);
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
            value: f
          } = c;
          f ? Promise.resolve(f(e.name, n.value)).then((b) => {
            b && d.id === m && v(g);
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
    return ro("div", {
      class: `${t}-tabs-tab-wrapper`
    }, this.internalLeftPadded ? ro("div", {
      class: `${t}-tabs-tab-pad`
    }) : null, ro("div", Object.assign({
      key: n,
      "data-name": n,
      "data-disabled": o ? !0 : void 0
    }, gO({
      class: [`${t}-tabs-tab`, l === n && `${t}-tabs-tab--active`, o && `${t}-tabs-tab--disabled`, a && `${t}-tabs-tab--closable`, e && `${t}-tabs-tab--addable`, e ? this.addTabClass : this.tabClass],
      onClick: s === "click" ? this.activateTab : void 0,
      onMouseenter: s === "hover" ? this.activateTab : void 0,
      style: e ? this.addStyle : this.style
    }, this.internalCreatedByPane ? this.tabProps || {} : this.$attrs)), ro("span", {
      class: `${t}-tabs-tab__label`
    }, e ? ro(pO, null, ro("div", {
      class: `${t}-tabs-tab__height-placeholder`
    }, " "), ro(Ct, {
      clsPrefix: t
    }, {
      default: () => ro(wg, null)
    })) : d ? d() : typeof c == "object" ? c : At(c ?? n)), a && this.type === "card" ? ro(vl, {
      clsPrefix: t,
      class: `${t}-tabs-tab__close`,
      onClick: this.handleClose,
      disabled: o
    }) : null));
  }
}), bO = T("tabs", `
 box-sizing: border-box;
 width: 100%;
 display: flex;
 flex-direction: column;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`, [B("segment-type", [T("tabs-rail", [D("&.transition-disabled", [T("tabs-capsule", `
 transition: none;
 `)])])]), B("top", [T("tab-pane", `
 padding: var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left);
 `)]), B("left", [T("tab-pane", `
 padding: var(--n-pane-padding-right) var(--n-pane-padding-bottom) var(--n-pane-padding-left) var(--n-pane-padding-top);
 `)]), B("left, right", `
 flex-direction: row;
 `, [T("tabs-bar", `
 width: 2px;
 right: 0;
 transition:
 top .2s var(--n-bezier),
 max-height .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `), T("tabs-tab", `
 padding: var(--n-tab-padding-vertical); 
 `)]), B("right", `
 flex-direction: row-reverse;
 `, [T("tab-pane", `
 padding: var(--n-pane-padding-left) var(--n-pane-padding-top) var(--n-pane-padding-right) var(--n-pane-padding-bottom);
 `), T("tabs-bar", `
 left: 0;
 `)]), B("bottom", `
 flex-direction: column-reverse;
 justify-content: flex-end;
 `, [T("tab-pane", `
 padding: var(--n-pane-padding-bottom) var(--n-pane-padding-right) var(--n-pane-padding-top) var(--n-pane-padding-left);
 `), T("tabs-bar", `
 top: 0;
 `)]), T("tabs-rail", `
 position: relative;
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `, [T("tabs-capsule", `
 border-radius: var(--n-tab-border-radius);
 position: absolute;
 pointer-events: none;
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 transition: transform 0.3s var(--n-bezier);
 `), T("tabs-tab-wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `, [T("tabs-tab", `
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `, [B("active", `
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 `), D("&:hover", `
 color: var(--n-tab-text-color-hover);
 `)])])]), B("flex", [T("tabs-nav", `
 width: 100%;
 position: relative;
 `, [T("tabs-wrapper", `
 width: 100%;
 `, [T("tabs-tab", `
 margin-right: 0;
 `)])])]), T("tabs-nav", `
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `, [A("prefix, suffix", `
 display: flex;
 align-items: center;
 `), A("prefix", "padding-right: 16px;"), A("suffix", "padding-left: 16px;")]), B("top, bottom", [D(">", [T("tabs-nav", [T("tabs-nav-scroll-wrapper", [D("&::before", `
 top: 0;
 bottom: 0;
 left: 0;
 width: 20px;
 `), D("&::after", `
 top: 0;
 bottom: 0;
 right: 0;
 width: 20px;
 `), B("shadow-start", [D("&::before", `
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]), B("shadow-end", [D("&::after", `
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]), B("left, right", [T("tabs-nav-scroll-content", `
 flex-direction: column;
 `), D(">", [T("tabs-nav", [T("tabs-nav-scroll-wrapper", [D("&::before", `
 top: 0;
 left: 0;
 right: 0;
 height: 20px;
 `), D("&::after", `
 bottom: 0;
 left: 0;
 right: 0;
 height: 20px;
 `), B("shadow-start", [D("&::before", `
 box-shadow: inset 0 10px 8px -8px rgba(0, 0, 0, .12);
 `)]), B("shadow-end", [D("&::after", `
 box-shadow: inset 0 -10px 8px -8px rgba(0, 0, 0, .12);
 `)])])])])]), T("tabs-nav-scroll-wrapper", `
 flex: 1;
 position: relative;
 overflow: hidden;
 `, [T("tabs-nav-y-scroll", `
 height: 100%;
 width: 100%;
 overflow-y: auto; 
 scrollbar-width: none;
 `, [D("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `)]), D("&::before, &::after", `
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 z-index: 1;
 `)]), T("tabs-nav-scroll-content", `
 display: flex;
 position: relative;
 min-width: 100%;
 min-height: 100%;
 width: fit-content;
 box-sizing: border-box;
 `), T("tabs-wrapper", `
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `), T("tabs-tab-wrapper", `
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `), T("tabs-tab", `
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
 `, [B("disabled", {
  cursor: "not-allowed"
}), A("close", `
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), A("label", `
 display: flex;
 align-items: center;
 z-index: 1;
 `)]), T("tabs-bar", `
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
 `, [D("&.transition-disabled", `
 transition: none;
 `), B("disabled", `
 background-color: var(--n-tab-text-color-disabled)
 `)]), T("tabs-pane-wrapper", `
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `), T("tab-pane", `
 color: var(--n-pane-text-color);
 width: 100%;
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `, [D("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active", `
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `), D("&.next-transition-leave-active, &.prev-transition-leave-active", `
 position: absolute;
 `), D("&.next-transition-enter-from, &.prev-transition-leave-to", `
 transform: translateX(32px);
 opacity: 0;
 `), D("&.next-transition-leave-to, &.prev-transition-enter-from", `
 transform: translateX(-32px);
 opacity: 0;
 `), D("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to", `
 transform: translateX(0);
 opacity: 1;
 `)]), T("tabs-tab-pad", `
 box-sizing: border-box;
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `), B("line-type, bar-type", [T("tabs-tab", `
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `, [D("&:hover", {
  color: "var(--n-tab-text-color-hover)"
}), B("active", `
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `), B("disabled", {
  color: "var(--n-tab-text-color-disabled)"
})])]), T("tabs-nav", [B("line-type", [B("top", [A("prefix, suffix", `
 border-bottom: 1px solid var(--n-tab-border-color);
 `), T("tabs-nav-scroll-content", `
 border-bottom: 1px solid var(--n-tab-border-color);
 `), T("tabs-bar", `
 bottom: -1px;
 `)]), B("left", [A("prefix, suffix", `
 border-right: 1px solid var(--n-tab-border-color);
 `), T("tabs-nav-scroll-content", `
 border-right: 1px solid var(--n-tab-border-color);
 `), T("tabs-bar", `
 right: -1px;
 `)]), B("right", [A("prefix, suffix", `
 border-left: 1px solid var(--n-tab-border-color);
 `), T("tabs-nav-scroll-content", `
 border-left: 1px solid var(--n-tab-border-color);
 `), T("tabs-bar", `
 left: -1px;
 `)]), B("bottom", [A("prefix, suffix", `
 border-top: 1px solid var(--n-tab-border-color);
 `), T("tabs-nav-scroll-content", `
 border-top: 1px solid var(--n-tab-border-color);
 `), T("tabs-bar", `
 top: -1px;
 `)]), A("prefix, suffix", `
 transition: border-color .3s var(--n-bezier);
 `), T("tabs-nav-scroll-content", `
 transition: border-color .3s var(--n-bezier);
 `), T("tabs-bar", `
 border-radius: 0;
 `)]), B("card-type", [A("prefix, suffix", `
 transition: border-color .3s var(--n-bezier);
 `), T("tabs-pad", `
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 `), T("tabs-tab-pad", `
 transition: border-color .3s var(--n-bezier);
 `), T("tabs-tab", `
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
 `, [B("addable", `
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 justify-content: center;
 `, [A("height-placeholder", `
 width: 0;
 font-size: var(--n-tab-font-size);
 `), rt("disabled", [D("&:hover", `
 color: var(--n-tab-text-color-hover);
 `)])]), B("closable", "padding-right: 8px;"), B("active", `
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `), B("disabled", "color: var(--n-tab-text-color-disabled);")])]), B("left, right", `
 flex-direction: column; 
 `, [A("prefix, suffix", `
 padding: var(--n-tab-padding-vertical);
 `), T("tabs-wrapper", `
 flex-direction: column;
 `), T("tabs-tab-wrapper", `
 flex-direction: column;
 `, [T("tabs-tab-pad", `
 height: var(--n-tab-gap-vertical);
 width: 100%;
 `)])]), B("top", [B("card-type", [T("tabs-scroll-padding", "border-bottom: 1px solid var(--n-tab-border-color);"), A("prefix, suffix", `
 border-bottom: 1px solid var(--n-tab-border-color);
 `), T("tabs-tab", `
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 `, [B("active", `
 border-bottom: 1px solid #0000;
 `)]), T("tabs-tab-pad", `
 border-bottom: 1px solid var(--n-tab-border-color);
 `), T("tabs-pad", `
 border-bottom: 1px solid var(--n-tab-border-color);
 `)])]), B("left", [B("card-type", [T("tabs-scroll-padding", "border-right: 1px solid var(--n-tab-border-color);"), A("prefix, suffix", `
 border-right: 1px solid var(--n-tab-border-color);
 `), T("tabs-tab", `
 border-top-left-radius: var(--n-tab-border-radius);
 border-bottom-left-radius: var(--n-tab-border-radius);
 `, [B("active", `
 border-right: 1px solid #0000;
 `)]), T("tabs-tab-pad", `
 border-right: 1px solid var(--n-tab-border-color);
 `), T("tabs-pad", `
 border-right: 1px solid var(--n-tab-border-color);
 `)])]), B("right", [B("card-type", [T("tabs-scroll-padding", "border-left: 1px solid var(--n-tab-border-color);"), A("prefix, suffix", `
 border-left: 1px solid var(--n-tab-border-color);
 `), T("tabs-tab", `
 border-top-right-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `, [B("active", `
 border-left: 1px solid #0000;
 `)]), T("tabs-tab-pad", `
 border-left: 1px solid var(--n-tab-border-color);
 `), T("tabs-pad", `
 border-left: 1px solid var(--n-tab-border-color);
 `)])]), B("bottom", [B("card-type", [T("tabs-scroll-padding", "border-top: 1px solid var(--n-tab-border-color);"), A("prefix, suffix", `
 border-top: 1px solid var(--n-tab-border-color);
 `), T("tabs-tab", `
 border-bottom-left-radius: var(--n-tab-border-radius);
 border-bottom-right-radius: var(--n-tab-border-radius);
 `, [B("active", `
 border-top: 1px solid #0000;
 `)]), T("tabs-tab-pad", `
 border-top: 1px solid var(--n-tab-border-color);
 `), T("tabs-pad", `
 border-top: 1px solid var(--n-tab-border-color);
 `)])])])]), wO = window.Vue.cloneVNode, Us = window.Vue.computed, yO = window.Vue.defineComponent, ft = window.Vue.h, Ks = window.Vue.nextTick, xO = window.Vue.onMounted, CO = window.Vue.provide, an = window.Vue.ref, An = window.Vue.toRef, SO = window.Vue.TransitionGroup, $O = window.Vue.vShow, qs = window.Vue.watch, kO = window.Vue.watchEffect, RO = window.Vue.withDirectives, Gs = cR, PO = Object.assign(Object.assign({}, Pe.props), {
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
}), TO = yO({
  name: "Tabs",
  props: PO,
  slots: Object,
  setup(e, {
    slots: t
  }) {
    var n, o, r, i;
    const {
      mergedClsPrefixRef: l,
      inlineThemeDisabled: a
    } = He(e), s = Pe("Tabs", "-tabs", bO, TE, e, l), d = an(null), c = an(null), h = an(null), p = an(null), v = an(null), u = an(null), g = an(!0), m = an(!0), f = Ka(e, ["labelSize", "size"]), b = Ka(e, ["activeName", "value"]), x = an((o = (n = b.value) !== null && n !== void 0 ? n : e.defaultValue) !== null && o !== void 0 ? o : t.default ? (i = (r = jn(t.default())[0]) === null || r === void 0 ? void 0 : r.props) === null || i === void 0 ? void 0 : i.name : null), y = Bt(b, x), S = {
      id: 0
    }, C = Us(() => {
      if (!(!e.justifyContent || e.type === "card"))
        return {
          display: "flex",
          justifyContent: e.justifyContent
        };
    });
    qs(y, () => {
      S.id = 0, G(), _();
    });
    function w() {
      var E;
      const {
        value: N
      } = y;
      return N === null ? null : (E = d.value) === null || E === void 0 ? void 0 : E.querySelector(`[data-name="${N}"]`);
    }
    function $(E) {
      if (e.type === "card") return;
      const {
        value: N
      } = c;
      if (!N) return;
      const re = N.style.opacity === "0";
      if (E) {
        const de = `${l.value}-tabs-bar--disabled`, {
          barWidth: z,
          placement: K
        } = e;
        if (E.dataset.disabled === "true" ? N.classList.add(de) : N.classList.remove(de), ["top", "bottom"].includes(K)) {
          if (O(["top", "maxHeight", "height"]), typeof z == "number" && E.offsetWidth >= z) {
            const me = Math.floor((E.offsetWidth - z) / 2) + E.offsetLeft;
            N.style.left = `${me}px`, N.style.maxWidth = `${z}px`;
          } else
            N.style.left = `${E.offsetLeft}px`, N.style.maxWidth = `${E.offsetWidth}px`;
          N.style.width = "8192px", re && (N.style.transition = "none"), N.offsetWidth, re && (N.style.transition = "", N.style.opacity = "1");
        } else {
          if (O(["left", "maxWidth", "width"]), typeof z == "number" && E.offsetHeight >= z) {
            const me = Math.floor((E.offsetHeight - z) / 2) + E.offsetTop;
            N.style.top = `${me}px`, N.style.maxHeight = `${z}px`;
          } else
            N.style.top = `${E.offsetTop}px`, N.style.maxHeight = `${E.offsetHeight}px`;
          N.style.height = "8192px", re && (N.style.transition = "none"), N.offsetHeight, re && (N.style.transition = "", N.style.opacity = "1");
        }
      }
    }
    function k() {
      if (e.type === "card") return;
      const {
        value: E
      } = c;
      E && (E.style.opacity = "0");
    }
    function O(E) {
      const {
        value: N
      } = c;
      if (N)
        for (const re of E)
          N.style[re] = "";
    }
    function G() {
      if (e.type === "card") return;
      const E = w();
      E ? $(E) : k();
    }
    function _() {
      var E;
      const N = (E = v.value) === null || E === void 0 ? void 0 : E.$el;
      if (!N) return;
      const re = w();
      if (!re) return;
      const {
        scrollLeft: de,
        offsetWidth: z
      } = N, {
        offsetLeft: K,
        offsetWidth: me
      } = re;
      de > K ? N.scrollTo({
        top: 0,
        left: K,
        behavior: "smooth"
      }) : K + me > de + z && N.scrollTo({
        top: 0,
        left: K + me - z,
        behavior: "smooth"
      });
    }
    const V = an(null);
    let I = 0, M = null;
    function X(E) {
      const N = V.value;
      if (N) {
        I = E.getBoundingClientRect().height;
        const re = `${I}px`, de = () => {
          N.style.height = re, N.style.maxHeight = re;
        };
        M ? (de(), M(), M = null) : M = de;
      }
    }
    function H(E) {
      const N = V.value;
      if (N) {
        const re = E.getBoundingClientRect().height, de = () => {
          document.body.offsetHeight, N.style.maxHeight = `${re}px`, N.style.height = `${Math.max(I, re)}px`;
        };
        M ? (M(), M = null, de()) : M = de;
      }
    }
    function Q() {
      const E = V.value;
      if (E) {
        E.style.maxHeight = "", E.style.height = "";
        const {
          paneWrapperStyle: N
        } = e;
        if (typeof N == "string")
          E.style.cssText = N;
        else if (N) {
          const {
            maxHeight: re,
            height: de
          } = N;
          re !== void 0 && (E.style.maxHeight = re), de !== void 0 && (E.style.height = de);
        }
      }
    }
    const oe = {
      value: []
    }, te = an("next");
    function Y(E) {
      const N = y.value;
      let re = "next";
      for (const de of oe.value) {
        if (de === N)
          break;
        if (de === E) {
          re = "prev";
          break;
        }
      }
      te.value = re, L(E);
    }
    function L(E) {
      const {
        onActiveNameChange: N,
        onUpdateValue: re,
        "onUpdate:value": de
      } = e;
      N && ce(N, E), re && ce(re, E), de && ce(de, E), x.value = E;
    }
    function Z(E) {
      const {
        onClose: N
      } = e;
      N && ce(N, E);
    }
    function ee() {
      const {
        value: E
      } = c;
      if (!E) return;
      const N = "transition-disabled";
      E.classList.add(N), G(), E.classList.remove(N);
    }
    const ue = an(null);
    function fe({
      transitionDisabled: E
    }) {
      const N = d.value;
      if (!N) return;
      E && N.classList.add("transition-disabled");
      const re = w();
      re && ue.value && (ue.value.style.width = `${re.offsetWidth}px`, ue.value.style.height = `${re.offsetHeight}px`, ue.value.style.transform = `translateX(${re.offsetLeft - kt(getComputedStyle(N).paddingLeft)}px)`, E && ue.value.offsetWidth), E && N.classList.remove("transition-disabled");
    }
    qs([y], () => {
      e.type === "segment" && Ks(() => {
        fe({
          transitionDisabled: !1
        });
      });
    }), xO(() => {
      e.type === "segment" && fe({
        transitionDisabled: !0
      });
    });
    let ve = 0;
    function xe(E) {
      var N;
      if (E.contentRect.width === 0 && E.contentRect.height === 0 || ve === E.contentRect.width)
        return;
      ve = E.contentRect.width;
      const {
        type: re
      } = e;
      if ((re === "line" || re === "bar") && ee(), re !== "segment") {
        const {
          placement: de
        } = e;
        ye((de === "top" || de === "bottom" ? (N = v.value) === null || N === void 0 ? void 0 : N.$el : u.value) || null);
      }
    }
    const J = Gs(xe, 64);
    qs([() => e.justifyContent, () => e.size], () => {
      Ks(() => {
        const {
          type: E
        } = e;
        (E === "line" || E === "bar") && ee();
      });
    });
    const pe = an(!1);
    function j(E) {
      var N;
      const {
        target: re,
        contentRect: {
          width: de,
          height: z
        }
      } = E, K = re.parentElement.parentElement.offsetWidth, me = re.parentElement.parentElement.offsetHeight, {
        placement: _e
      } = e;
      if (!pe.value)
        _e === "top" || _e === "bottom" ? K < de && (pe.value = !0) : me < z && (pe.value = !0);
      else {
        const {
          value: Ge
        } = p;
        if (!Ge) return;
        _e === "top" || _e === "bottom" ? K - de > Ge.$el.offsetWidth && (pe.value = !1) : me - z > Ge.$el.offsetHeight && (pe.value = !1);
      }
      ye(((N = v.value) === null || N === void 0 ? void 0 : N.$el) || null);
    }
    const W = Gs(j, 64);
    function ie() {
      const {
        onAdd: E
      } = e;
      E && E(), Ks(() => {
        const N = w(), {
          value: re
        } = v;
        !N || !re || re.scrollTo({
          left: N.offsetLeft,
          top: 0,
          behavior: "smooth"
        });
      });
    }
    function ye(E) {
      if (!E) return;
      const {
        placement: N
      } = e;
      if (N === "top" || N === "bottom") {
        const {
          scrollLeft: re,
          scrollWidth: de,
          offsetWidth: z
        } = E;
        g.value = re <= 0, m.value = re + z >= de;
      } else {
        const {
          scrollTop: re,
          scrollHeight: de,
          offsetHeight: z
        } = E;
        g.value = re <= 0, m.value = re + z >= de;
      }
    }
    const Me = Gs((E) => {
      ye(E.target);
    }, 64);
    CO(zc, {
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
      valueRef: y,
      tabChangeIdRef: S,
      onBeforeLeaveRef: An(e, "onBeforeLeave"),
      activateTab: Y,
      handleClose: Z,
      handleAdd: ie
    }), vv(() => {
      G(), _();
    }), kO(() => {
      const {
        value: E
      } = h;
      if (!E) return;
      const {
        value: N
      } = l, re = `${N}-tabs-nav-scroll-wrapper--shadow-start`, de = `${N}-tabs-nav-scroll-wrapper--shadow-end`;
      g.value ? E.classList.remove(re) : E.classList.add(re), m.value ? E.classList.remove(de) : E.classList.add(de);
    });
    const ze = {
      syncBarPosition: () => {
        G();
      }
    }, se = () => {
      fe({
        transitionDisabled: !0
      });
    }, P = Us(() => {
      const {
        value: E
      } = f, {
        type: N
      } = e, re = {
        card: "Card",
        bar: "Bar",
        line: "Line",
        segment: "Segment"
      }[N], de = `${E}${re}`, {
        self: {
          barColor: z,
          closeIconColor: K,
          closeIconColorHover: me,
          closeIconColorPressed: _e,
          tabColor: Ge,
          tabBorderColor: vt,
          paneTextColor: Xe,
          tabFontWeight: Ye,
          tabBorderRadius: bt,
          tabFontWeightActive: tt,
          colorSegment: we,
          fontWeightStrong: Fe,
          tabColorSegment: F,
          closeSize: q,
          closeIconSize: ae,
          closeColorHover: ge,
          closeColorPressed: be,
          closeBorderRadius: Ce,
          [ne("panePadding", E)]: Se,
          [ne("tabPadding", de)]: Te,
          [ne("tabPaddingVertical", de)]: Be,
          [ne("tabGap", de)]: it,
          [ne("tabGap", `${de}Vertical`)]: je,
          [ne("tabTextColor", N)]: _t,
          [ne("tabTextColorActive", N)]: Mt,
          [ne("tabTextColorHover", N)]: Vt,
          [ne("tabTextColorDisabled", N)]: Nt,
          [ne("tabFontSize", E)]: Dt
        },
        common: {
          cubicBezierEaseInOut: Zt
        }
      } = s.value;
      return {
        "--n-bezier": Zt,
        "--n-color-segment": we,
        "--n-bar-color": z,
        "--n-tab-font-size": Dt,
        "--n-tab-text-color": _t,
        "--n-tab-text-color-active": Mt,
        "--n-tab-text-color-disabled": Nt,
        "--n-tab-text-color-hover": Vt,
        "--n-pane-text-color": Xe,
        "--n-tab-border-color": vt,
        "--n-tab-border-radius": bt,
        "--n-close-size": q,
        "--n-close-icon-size": ae,
        "--n-close-color-hover": ge,
        "--n-close-color-pressed": be,
        "--n-close-border-radius": Ce,
        "--n-close-icon-color": K,
        "--n-close-icon-color-hover": me,
        "--n-close-icon-color-pressed": _e,
        "--n-tab-color": Ge,
        "--n-tab-font-weight": Ye,
        "--n-tab-font-weight-active": tt,
        "--n-tab-padding": Te,
        "--n-tab-padding-vertical": Be,
        "--n-tab-gap": it,
        "--n-tab-gap-vertical": je,
        "--n-pane-padding-left": zt(Se, "left"),
        "--n-pane-padding-right": zt(Se, "right"),
        "--n-pane-padding-top": zt(Se, "top"),
        "--n-pane-padding-bottom": zt(Se, "bottom"),
        "--n-font-weight-strong": Fe,
        "--n-tab-color-segment": F
      };
    }), R = a ? mt("tabs", Us(() => `${f.value[0]}${e.type[0]}`), P, e) : void 0;
    return Object.assign({
      mergedClsPrefix: l,
      mergedValue: y,
      renderedNames: /* @__PURE__ */ new Set(),
      segmentCapsuleElRef: ue,
      tabsPaneWrapperRef: V,
      tabsElRef: d,
      barElRef: c,
      addTabInstRef: p,
      xScrollInstRef: v,
      scrollWrapperElRef: h,
      addTabFixed: pe,
      tabWrapperStyle: C,
      handleNavResize: J,
      mergedSize: f,
      handleScroll: Me,
      handleTabsResize: W,
      cssVars: a ? void 0 : P,
      themeClass: R == null ? void 0 : R.themeClass,
      animationDirection: te,
      renderNameListRef: oe,
      yScrollElRef: u,
      handleSegmentResize: se,
      onAnimationBeforeLeave: X,
      onAnimationEnter: H,
      onAnimationAfterEnter: Q,
      onRender: R == null ? void 0 : R.onRender
    }, ze);
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
    const v = c ? jn(c()).filter((S) => S.type.__TAB_PANE__ === !0) : [], u = c ? jn(c()).filter((S) => S.type.__TAB__ === !0) : [], g = !u.length, m = t === "card", f = t === "segment", b = !m && !f && this.justifyContent;
    l.value = [];
    const x = () => {
      const S = ft("div", {
        style: this.tabWrapperStyle,
        class: `${e}-tabs-wrapper`
      }, b ? null : ft("div", {
        class: `${e}-tabs-scroll-padding`,
        style: n === "top" || n === "bottom" ? {
          width: `${this.tabsPadding}px`
        } : {
          height: `${this.tabsPadding}px`
        }
      }), g ? v.map((C, w) => (l.value.push(C.props.name), Xs(ft(Ad, Object.assign({}, C.props, {
        internalCreatedByPane: !0,
        internalLeftPadded: w !== 0 && (!b || b === "center" || b === "start" || b === "end")
      }), C.children ? {
        default: C.children.tab
      } : void 0)))) : u.map((C, w) => (l.value.push(C.props.name), Xs(w !== 0 && !b ? Rp(C) : C))), !o && r && m ? kp(r, (g ? v.length : u.length) !== 0) : null, b ? null : ft("div", {
        class: `${e}-tabs-scroll-padding`,
        style: {
          width: `${this.tabsPadding}px`
        }
      }));
      return ft("div", {
        ref: "tabsElRef",
        class: `${e}-tabs-nav-scroll-content`
      }, m && r ? ft(Hn, {
        onResize: this.handleTabsResize
      }, {
        default: () => S
      }) : S, m ? ft("div", {
        class: `${e}-tabs-pad`
      }) : null, m ? null : ft("div", {
        ref: "barElRef",
        class: `${e}-tabs-bar`
      }));
    }, y = f ? "top" : n;
    return ft("div", {
      class: [`${e}-tabs`, this.themeClass, `${e}-tabs--${t}-type`, `${e}-tabs--${i}-size`, b && `${e}-tabs--flex`, `${e}-tabs--${y}`],
      style: this.cssVars
    }, ft("div", {
      class: [
        // the class should be applied here since it's possible
        // to make tabs nested in tabs, style may influence each
        // other. adding a class will make it easy to write the
        // style.
        `${e}-tabs-nav--${t}-type`,
        `${e}-tabs-nav--${y}`,
        `${e}-tabs-nav`
      ]
    }, Le(h, (S) => S && ft("div", {
      class: `${e}-tabs-nav__prefix`
    }, S)), f ? ft(Hn, {
      onResize: this.handleSegmentResize
    }, {
      default: () => ft("div", {
        class: `${e}-tabs-rail`,
        ref: "tabsElRef"
      }, ft("div", {
        class: `${e}-tabs-capsule`,
        ref: "segmentCapsuleElRef"
      }, ft("div", {
        class: `${e}-tabs-wrapper`
      }, ft("div", {
        class: `${e}-tabs-tab`
      }))), g ? v.map((S, C) => (l.value.push(S.props.name), ft(Ad, Object.assign({}, S.props, {
        internalCreatedByPane: !0,
        internalLeftPadded: C !== 0
      }), S.children ? {
        default: S.children.tab
      } : void 0))) : u.map((S, C) => (l.value.push(S.props.name), C === 0 ? S : Rp(S))))
    }) : ft(Hn, {
      onResize: this.handleNavResize
    }, {
      default: () => ft("div", {
        class: `${e}-tabs-nav-scroll-wrapper`,
        ref: "scrollWrapperElRef"
      }, ["top", "bottom"].includes(y) ? ft(f1, {
        ref: "xScrollInstRef",
        onScroll: this.handleScroll
      }, {
        default: x
      }) : ft("div", {
        class: `${e}-tabs-nav-y-scroll`,
        onScroll: this.handleScroll,
        ref: "yScrollElRef"
      }, x()))
    }), o && r && m ? kp(r, !0) : null, Le(p, (S) => S && ft("div", {
      class: `${e}-tabs-nav__suffix`
    }, S))), g && (this.animated && (y === "top" || y === "bottom") ? ft("div", {
      ref: "tabsPaneWrapperRef",
      style: d,
      class: [`${e}-tabs-pane-wrapper`, s]
    }, $p(v, this.mergedValue, this.renderedNames, this.onAnimationBeforeLeave, this.onAnimationEnter, this.onAnimationAfterEnter, this.animationDirection)) : $p(v, this.mergedValue, this.renderedNames)));
  }
});
function $p(e, t, n, o, r, i, l) {
  const a = [];
  return e.forEach((s) => {
    const {
      name: d,
      displayDirective: c,
      "display-directive": h
    } = s.props, p = (u) => c === u || h === u, v = t === d;
    if (s.key !== void 0 && (s.key = d), v || p("show") || p("show:lazy") && n.has(d)) {
      n.has(d) || n.add(d);
      const u = !p("if");
      a.push(u ? RO(s, [[$O, v]]) : s);
    }
  }), l ? ft(SO, {
    name: `${l}-transition`,
    onBeforeLeave: o,
    onEnter: r,
    onAfterEnter: i
  }, {
    default: () => a
  }) : a;
}
function kp(e, t) {
  return ft(Ad, {
    ref: "addTabInstRef",
    key: "__addable",
    name: "__addable",
    internalCreatedByPane: !0,
    internalAddable: !0,
    internalLeftPadded: t,
    disabled: typeof e == "object" && e.disabled
  });
}
function Rp(e) {
  const t = wO(e);
  return t.props ? t.props.internalLeftPadded = !0 : t.props = {
    internalLeftPadded: !0
  }, t;
}
function Xs(e) {
  return Array.isArray(e.dynamicProps) ? e.dynamicProps.includes("internalLeftPadded") || e.dynamicProps.push("internalLeftPadded") : e.dynamicProps = ["internalLeftPadded"], e;
}
const _O = window.Vue.defineComponent, he = window.Vue.unref, ke = window.Vue.createVNode, Oe = window.Vue.withCtx, Bn = window.Vue.toDisplayString, Ln = window.Vue.createTextVNode, FO = window.Vue.createElementVNode, Ys = window.Vue.openBlock, Pp = window.Vue.createBlock, Tp = window.Vue.createCommentVNode, EO = window.Vue.createElementBlock, zO = { class: "plugin-codegen" }, OO = { class: "codegen-table-scroll" }, Zs = window.Vue.computed, at = window.Vue.h, MO = window.Vue.onMounted, Js = window.Vue.reactive, fn = window.Vue.ref, VO = /* @__PURE__ */ _O({
  __name: "CodegenView",
  setup(e) {
    const { t } = rl(), n = Js({
      tableName: ""
    }), o = fn([]), r = fn(!1), i = fn([]), l = Js({
      page: 1,
      pageSize: 20,
      itemCount: 0,
      onChange: (j) => {
        l.page = j, I();
      },
      onUpdatePageSize: (j) => {
        l.pageSize = j, l.page = 1, I();
      }
    }), a = fn(!1), s = fn(1), d = fn(!1), c = fn(null), h = fn(!1), p = fn([]), v = fn([]), u = fn([]), g = fn(!1), m = [
      { label: t("plugin.codegen.status.enabled"), value: "1" },
      { label: t("plugin.codegen.status.disabled"), value: "0" }
    ], f = Zs(() => [
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
    ]), b = Zs(() => [
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
    ]), x = Js($()), y = {
      tableName: { required: !0, message: t("plugin.codegen.rules.tableName"), trigger: ["blur", "change"] },
      pluginId: { required: !0, message: t("plugin.codegen.rules.pluginId"), trigger: ["blur", "input"] },
      pluginName: { required: !0, message: t("plugin.codegen.rules.pluginName"), trigger: ["blur", "input"] },
      parentPackage: { required: !0, message: t("plugin.codegen.rules.parentPackage"), trigger: ["blur", "input"] },
      moduleName: { required: !0, message: t("plugin.codegen.rules.moduleName"), trigger: ["blur", "input"] },
      author: { required: !0, message: t("plugin.codegen.rules.author"), trigger: ["blur", "input"] }
    }, S = Zs(
      () => h.value ? t("plugin.codegen.modal.edit") : t("plugin.codegen.modal.add")
    ), C = [
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
        render: (j) => at(
          Na,
          { type: j.status === "1" ? "success" : "default", size: "small" },
          { default: () => j.status === "1" ? t("plugin.codegen.status.enabled") : t("plugin.codegen.status.disabled") }
        )
      },
      {
        title: t("plugin.codegen.fields.createTime"),
        key: "createTime",
        width: 180,
        render: (j) => k(j.createTime)
      },
      {
        title: t("plugin.codegen.actions.action"),
        key: "action",
        width: 160,
        fixed: "right",
        render: (j) => at(No, {}, {
          default: () => [
            at(
              It,
              {
                size: "small",
                onClick: () => Y(j)
              },
              { default: () => t("plugin.codegen.actions.edit") }
            ),
            at(
              It,
              {
                size: "small",
                type: "error",
                onClick: () => ue(j)
              },
              { default: () => t("plugin.codegen.actions.delete") }
            )
          ]
        })
      }
    ], w = [
      { title: t("plugin.codegen.column.ordinalPosition"), key: "ordinalPosition", width: 100 },
      { title: t("plugin.codegen.column.columnName"), key: "columnName", width: 160, ellipsis: { tooltip: !0 } },
      {
        title: t("plugin.codegen.column.propertyName"),
        key: "propertyName",
        width: 160,
        render: (j) => at(xt, {
          value: j.propertyName,
          size: "small",
          "onUpdate:value": (W) => {
            j.propertyName = W;
          }
        })
      },
      {
        title: t("plugin.codegen.column.columnComment"),
        key: "columnComment",
        width: 180,
        render: (j) => at(xt, {
          value: j.columnComment,
          size: "small",
          "onUpdate:value": (W) => {
            j.columnComment = W;
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
        render: (j) => at(In, {
          value: j.i18n,
          "onUpdate:value": (W) => {
            j.i18n = W;
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
        render: (j) => at(In, {
          value: j.required,
          "onUpdate:value": (W) => {
            j.required = W;
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
        render: (j) => at(In, {
          value: j.list,
          "onUpdate:value": (W) => {
            j.list = W;
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
        render: (j) => at(In, {
          value: j.search,
          "onUpdate:value": (W) => {
            j.search = W;
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
        render: (j) => at(yr, {
          value: j.searchType,
          options: b.value,
          size: "small",
          clearable: !0,
          "onUpdate:value": (W) => {
            j.searchType = W;
          }
        })
      },
      {
        title: t("plugin.codegen.column.added"),
        key: "added",
        width: 100,
        render: (j) => at(In, {
          value: j.added,
          "onUpdate:value": (W) => {
            j.added = W;
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
        render: (j) => at(In, {
          value: j.edit,
          "onUpdate:value": (W) => {
            j.edit = W;
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
        render: (j) => at(yr, {
          value: j.renderType,
          options: f.value,
          size: "small",
          clearable: !0,
          "onUpdate:value": (W) => {
            j.renderType = W;
          }
        })
      },
      {
        title: t("plugin.codegen.column.dictCode"),
        key: "dictCode",
        width: 180,
        render: (j) => at(yr, {
          value: j.dictCode,
          options: v.value,
          size: "small",
          clearable: !0,
          filterable: !0,
          "onUpdate:value": (W) => {
            j.dictCode = W;
          }
        })
      },
      {
        title: t("plugin.codegen.column.formDisabled"),
        key: "formDisabled",
        width: 120,
        render: (j) => at(In, {
          value: j.formDisabled,
          "onUpdate:value": (W) => {
            j.formDisabled = W;
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
        render: (j) => at(In, {
          value: j.formReadonly,
          "onUpdate:value": (W) => {
            j.formReadonly = W;
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
        render: (j) => at(Co, {
          value: j.minLength,
          min: 0,
          max: 2e3,
          size: "small",
          class: "w-full",
          "onUpdate:value": (W) => {
            j.minLength = W ?? void 0;
          }
        })
      },
      {
        title: t("plugin.codegen.column.maxLength"),
        key: "maxLength",
        width: 120,
        render: (j) => at(Co, {
          value: j.maxLength,
          min: 0,
          max: 2e3,
          size: "small",
          class: "w-full",
          "onUpdate:value": (W) => {
            j.maxLength = W ?? void 0;
          }
        })
      },
      {
        title: t("plugin.codegen.column.minValue"),
        key: "minValue",
        width: 120,
        render: (j) => at(Co, {
          value: j.minValue,
          size: "small",
          class: "w-full",
          "onUpdate:value": (W) => {
            j.minValue = W ?? void 0;
          }
        })
      },
      {
        title: t("plugin.codegen.column.maxValue"),
        key: "maxValue",
        width: 120,
        render: (j) => at(Co, {
          value: j.maxValue,
          size: "small",
          class: "w-full",
          "onUpdate:value": (W) => {
            j.maxValue = W ?? void 0;
          }
        })
      },
      {
        title: t("plugin.codegen.column.pattern"),
        key: "pattern",
        width: 180,
        render: (j) => at(xt, {
          value: j.pattern,
          size: "small",
          "onUpdate:value": (W) => {
            j.pattern = W;
          }
        })
      },
      {
        title: t("plugin.codegen.column.componentProps"),
        key: "componentProps",
        width: 200,
        render: (j) => at(xt, {
          value: j.componentProps,
          size: "small",
          "onUpdate:value": (W) => {
            j.componentProps = W;
          }
        })
      },
      {
        title: t("plugin.codegen.column.formSpan"),
        key: "formSpan",
        width: 120,
        render: (j) => at(Co, {
          value: j.formSpan,
          min: 1,
          max: 24,
          size: "small",
          class: "w-full",
          "onUpdate:value": (W) => {
            j.formSpan = W ?? 12;
          }
        })
      },
      {
        title: t("plugin.codegen.column.searchSpan"),
        key: "searchSpan",
        width: 120,
        render: (j) => at(Co, {
          value: j.searchSpan,
          min: 1,
          max: 24,
          size: "small",
          class: "w-full",
          "onUpdate:value": (W) => {
            j.searchSpan = W ?? 12;
          }
        })
      },
      {
        title: t("plugin.codegen.column.listWidth"),
        key: "listWidth",
        width: 140,
        render: (j) => at(Co, {
          value: j.listWidth,
          min: 80,
          max: 600,
          size: "small",
          class: "w-full",
          "onUpdate:value": (W) => {
            j.listWidth = W ?? 160;
          }
        })
      },
      {
        title: t("plugin.codegen.column.placeholder"),
        key: "placeholder",
        width: 200,
        render: (j) => at(xt, {
          value: j.placeholder,
          size: "small",
          "onUpdate:value": (W) => {
            j.placeholder = W;
          }
        })
      },
      {
        title: t("plugin.codegen.column.defaultValue"),
        key: "defaultValue",
        width: 160,
        render: (j) => at(xt, {
          value: j.defaultValue,
          size: "small",
          "onUpdate:value": (W) => {
            j.defaultValue = W;
          }
        })
      },
      {
        title: t("plugin.codegen.column.status"),
        key: "status",
        width: 100,
        render: (j) => at(In, {
          value: j.status,
          "onUpdate:value": (W) => {
            j.status = W;
          },
          checkedValue: "1",
          uncheckedValue: "0",
          size: "small"
        })
      }
    ];
    function $() {
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
    function k(j) {
      if (!j) return "";
      const W = new Date(j);
      return Number.isNaN(W.getTime()) ? j : W.toLocaleString();
    }
    function O() {
      return "/proxy-default";
    }
    function G() {
      const W = Object.keys(localStorage).find((ye) => /token$/i.test(ye) && !/refresh/i.test(ye));
      if (!W) return null;
      const ie = localStorage.getItem(W);
      if (!ie) return null;
      try {
        return JSON.parse(ie);
      } catch {
        return ie;
      }
    }
    async function _(j, W = {}) {
      var se;
      const ie = {
        "Content-Type": "application/json"
      }, ye = G();
      ye && (ie.Authorization = ye.startsWith("Bearer ") ? ye : `Bearer ${ye}`);
      const ze = await (await fetch(`${O()}${j}`, {
        ...W,
        headers: {
          ...ie,
          ...W.headers
        }
      })).json();
      if (ze && typeof ze == "object" && "code" in ze) {
        if (ze.code !== 200) {
          const P = ze.message || t("plugin.codegen.tips.requestFailed");
          throw (se = window.$message) == null || se.error(P), new Error(P);
        }
        return ze.data ?? ze;
      }
      return ze;
    }
    function V() {
      n.tableName = "", l.page = 1, I();
    }
    async function I() {
      r.value = !0;
      try {
        const j = await _(
          `/plugin/codegen/tables/page?page=${l.page}&pageSize=${l.pageSize}&tableName=${n.tableName || ""}`
        );
        o.value = j.records ?? [], l.itemCount = j.total ?? 0;
      } finally {
        r.value = !1;
      }
    }
    async function M() {
      p.value = await _("/plugin/codegen/data-tables");
    }
    async function X() {
      v.value = await _("/plugin/codegen/dict/options");
    }
    function H(j) {
      const W = j.indexOf("_");
      return W !== -1 ? j.substring(0, W + 1) : "";
    }
    function Q(j) {
      return j.replace(/_/g, "-").toLowerCase();
    }
    function oe(j, W) {
      if (!j) return;
      const ie = H(j), ye = ie && j.startsWith(ie) ? j.slice(ie.length) : j, Me = Q(ye);
      x.tablePrefix = ie, x.tableComment = (W == null ? void 0 : W.tableComment) || j, x.moduleName = Me, x.pluginId = `tt-plugin-${Me}`, x.pluginName = x.tableComment || j, x.routePath = `/${Me}`, x.menuName = x.pluginName, x.i18nKey = `plugin.${Me}.title`, x.parentPackage = "com.tt.plugin";
    }
    function te() {
      h.value = !1, s.value = 1, Object.assign(x, $()), a.value = !0, M(), X(), u.value = [];
    }
    async function Y(j) {
      h.value = !0, s.value = 1, a.value = !0, X();
      const W = await _(`/plugin/codegen/tables/${j.id}`);
      Object.assign(x, W), await L(j.id);
    }
    async function L(j) {
      g.value = !0;
      try {
        const W = await _(`/plugin/codegen/tables/columns/${j}`);
        u.value = Array.isArray(W) ? W : [];
      } finally {
        g.value = !1;
      }
    }
    async function Z() {
      var j;
      if (s.value === 1) {
        await ee(), await L(x.id), s.value = 2;
        return;
      }
      if (s.value === 2) {
        if (u.value.length === 0) {
          (j = window.$message) == null || j.warning(t("plugin.codegen.tips.emptyColumns"));
          return;
        }
        d.value = !0;
        try {
          await _("/plugin/codegen/tables/columns", {
            method: "PUT",
            body: JSON.stringify(u.value)
          }), s.value = 3;
        } finally {
          d.value = !1;
        }
      }
    }
    async function ee() {
      var j;
      await ((j = c.value) == null ? void 0 : j.validate()), d.value = !0;
      try {
        const W = h.value ? "PUT" : "POST", ie = await _("/plugin/codegen/tables", {
          method: W,
          body: JSON.stringify(x)
        });
        Object.assign(x, ie), h.value || (h.value = !0), await I();
      } finally {
        d.value = !1;
      }
    }
    async function ue(j) {
      j.id && pe(t("plugin.codegen.tips.deleteConfirm")) && (await _("/plugin/codegen/tables", {
        method: "DELETE",
        body: JSON.stringify([j.id])
      }), await I());
    }
    async function fe() {
      i.value.length !== 0 && pe(t("plugin.codegen.tips.batchDeleteConfirm")) && (await _("/plugin/codegen/tables", {
        method: "DELETE",
        body: JSON.stringify(i.value)
      }), i.value = [], await I());
    }
    async function ve() {
      if (x.id && pe(t("plugin.codegen.tips.syncConfirm"))) {
        g.value = !0;
        try {
          const j = await _(
            `/plugin/codegen/tables/columns/sync/${x.id}`
          );
          u.value = Array.isArray(j) ? j : [];
        } finally {
          g.value = !1;
        }
      }
    }
    async function xe() {
      x.id && pe(t("plugin.codegen.tips.cleanConfirm")) && (await _(`/plugin/codegen/tables/columns/clean/${x.id}`, { method: "PUT" }), u.value = []);
    }
    async function J() {
      if (!x.id) return;
      const j = await fetch(`${O()}/plugin/codegen/tables/zip/${x.id}`, {
        method: "POST"
      }), W = await j.blob(), ie = URL.createObjectURL(W), ye = document.createElement("a"), ze = (j.headers.get("content-disposition") || "").match(/filename=([^;]+)/i);
      ye.href = ie, ye.download = ze ? decodeURIComponent(ze[1].replace(/"/g, "")) : "plugin-source.zip", ye.click(), URL.revokeObjectURL(ie);
    }
    function pe(j) {
      return window.confirm(j);
    }
    return MO(() => {
      I();
    }), (j, W) => (Ys(), EO("div", zO, [
      ke(he(No), {
        vertical: "",
        size: "large"
      }, {
        default: Oe(() => [
          ke(he(Dg), {
            title: he(t)("plugin.codegen.title"),
            size: "small",
            bordered: ""
          }, {
            default: Oe(() => [
              ke(he(op), {
                model: n,
                "label-width": "80",
                "label-placement": "left"
              }, {
                default: Oe(() => [
                  ke(he(wp), {
                    cols: "24",
                    "x-gap": "16",
                    "y-gap": "8",
                    responsive: "screen"
                  }, {
                    default: Oe(() => [
                      ke(he(Ft), {
                        label: he(t)("plugin.codegen.search.tableName"),
                        span: "12"
                      }, {
                        default: Oe(() => [
                          ke(he(xt), {
                            value: n.tableName,
                            "onUpdate:value": W[0] || (W[0] = (ie) => n.tableName = ie),
                            placeholder: he(t)("plugin.codegen.search.placeholder")
                          }, null, 8, ["value", "placeholder"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      ke(he(Ft), { span: "12" }, {
                        default: Oe(() => [
                          ke(he(No), {
                            justify: "end",
                            class: "w-full"
                          }, {
                            default: Oe(() => [
                              ke(he(It), {
                                type: "primary",
                                onClick: I
                              }, {
                                default: Oe(() => [
                                  Ln(
                                    Bn(he(t)("plugin.codegen.actions.search")),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                _: 1
                                /* STABLE */
                              }),
                              ke(he(It), { onClick: V }, {
                                default: Oe(() => [
                                  Ln(
                                    Bn(he(t)("plugin.codegen.actions.reset")),
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
              }, 8, ["model"]),
              ke(he(No), {
                class: "toolbar",
                justify: "space-between"
              }, {
                default: Oe(() => [
                  ke(he(No), null, {
                    default: Oe(() => [
                      ke(he(It), {
                        type: "primary",
                        onClick: te
                      }, {
                        default: Oe(() => [
                          Ln(
                            Bn(he(t)("plugin.codegen.actions.add")),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      ke(he(It), {
                        type: "error",
                        disabled: i.value.length === 0,
                        onClick: fe
                      }, {
                        default: Oe(() => [
                          Ln(
                            Bn(he(t)("plugin.codegen.actions.delete")),
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
                  ke(he(It), { onClick: I }, {
                    default: Oe(() => [
                      Ln(
                        Bn(he(t)("plugin.codegen.actions.refresh")),
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
              FO("div", OO, [
                ke(he(qh), {
                  remote: "",
                  size: "small",
                  loading: r.value,
                  columns: C,
                  data: o.value,
                  pagination: l,
                  "row-key": (ie) => ie.id,
                  "checked-row-keys": i.value,
                  "onUpdate:checkedRowKeys": W[1] || (W[1] = (ie) => i.value = ie)
                }, null, 8, ["loading", "data", "pagination", "row-key", "checked-row-keys"])
              ])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["title"])
        ]),
        _: 1
        /* STABLE */
      }),
      ke(he(lE), {
        show: a.value,
        "onUpdate:show": W[20] || (W[20] = (ie) => a.value = ie),
        preset: "card",
        class: "modal-card",
        title: S.value
      }, {
        footer: Oe(() => [
          ke(he(No), { justify: "end" }, {
            default: Oe(() => [
              s.value > 1 ? (Ys(), Pp(he(It), {
                key: 0,
                onClick: W[19] || (W[19] = (ie) => s.value -= 1)
              }, {
                default: Oe(() => [
                  Ln(
                    Bn(he(t)("plugin.codegen.actions.prev")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              })) : Tp("v-if", !0),
              s.value < 3 ? (Ys(), Pp(he(It), {
                key: 1,
                type: "primary",
                loading: d.value,
                onClick: Z
              }, {
                default: Oe(() => [
                  Ln(
                    Bn(he(t)("plugin.codegen.actions.next")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["loading"])) : Tp("v-if", !0)
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        default: Oe(() => [
          ke(he(TO), {
            value: s.value,
            "onUpdate:value": W[18] || (W[18] = (ie) => s.value = ie),
            type: "segment",
            size: "small",
            animated: ""
          }, {
            default: Oe(() => [
              ke(he(Ws), {
                name: 1,
                tab: he(t)("plugin.codegen.step.base"),
                disabled: ""
              }, {
                default: Oe(() => [
                  ke(he(op), {
                    ref_key: "formRef",
                    ref: c,
                    model: x,
                    rules: y,
                    "label-placement": "left",
                    "label-width": "120"
                  }, {
                    default: Oe(() => [
                      ke(he(wp), {
                        cols: "24",
                        "x-gap": "16",
                        "y-gap": "8",
                        responsive: "screen"
                      }, {
                        default: Oe(() => [
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.tableName"),
                            path: "tableName"
                          }, {
                            default: Oe(() => [
                              ke(he(yr), {
                                value: x.tableName,
                                "onUpdate:value": [
                                  W[2] || (W[2] = (ie) => x.tableName = ie),
                                  oe
                                ],
                                "label-field": "tableName",
                                "value-field": "tableName",
                                options: p.value,
                                placeholder: he(t)("plugin.codegen.fields.tableNamePlaceholder"),
                                filterable: "",
                                clearable: "",
                                disabled: h.value
                              }, null, 8, ["value", "options", "placeholder", "disabled"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.tableComment")
                          }, {
                            default: Oe(() => [
                              ke(he(xt), {
                                value: x.tableComment,
                                "onUpdate:value": W[3] || (W[3] = (ie) => x.tableComment = ie),
                                disabled: h.value
                              }, null, 8, ["value", "disabled"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.tablePrefix")
                          }, {
                            default: Oe(() => [
                              ke(he(xt), {
                                value: x.tablePrefix,
                                "onUpdate:value": W[4] || (W[4] = (ie) => x.tablePrefix = ie),
                                disabled: h.value
                              }, null, 8, ["value", "disabled"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.pluginId"),
                            path: "pluginId"
                          }, {
                            default: Oe(() => [
                              ke(he(xt), {
                                value: x.pluginId,
                                "onUpdate:value": W[5] || (W[5] = (ie) => x.pluginId = ie)
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.pluginName"),
                            path: "pluginName"
                          }, {
                            default: Oe(() => [
                              ke(he(xt), {
                                value: x.pluginName,
                                "onUpdate:value": W[6] || (W[6] = (ie) => x.pluginName = ie)
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.version")
                          }, {
                            default: Oe(() => [
                              ke(he(xt), {
                                value: x.version,
                                "onUpdate:value": W[7] || (W[7] = (ie) => x.version = ie)
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.parentPackage"),
                            path: "parentPackage"
                          }, {
                            default: Oe(() => [
                              ke(he(xt), {
                                value: x.parentPackage,
                                "onUpdate:value": W[8] || (W[8] = (ie) => x.parentPackage = ie)
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.moduleName"),
                            path: "moduleName"
                          }, {
                            default: Oe(() => [
                              ke(he(xt), {
                                value: x.moduleName,
                                "onUpdate:value": W[9] || (W[9] = (ie) => x.moduleName = ie)
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.routePath")
                          }, {
                            default: Oe(() => [
                              ke(he(xt), {
                                value: x.routePath,
                                "onUpdate:value": W[10] || (W[10] = (ie) => x.routePath = ie)
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.menuName")
                          }, {
                            default: Oe(() => [
                              ke(he(xt), {
                                value: x.menuName,
                                "onUpdate:value": W[11] || (W[11] = (ie) => x.menuName = ie)
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.i18nKey")
                          }, {
                            default: Oe(() => [
                              ke(he(xt), {
                                value: x.i18nKey,
                                "onUpdate:value": W[12] || (W[12] = (ie) => x.i18nKey = ie)
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.icon")
                          }, {
                            default: Oe(() => [
                              ke(he(xt), {
                                value: x.icon,
                                "onUpdate:value": W[13] || (W[13] = (ie) => x.icon = ie)
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.includeTableSql")
                          }, {
                            default: Oe(() => [
                              ke(he(In), {
                                value: x.includeTableSql,
                                "onUpdate:value": W[14] || (W[14] = (ie) => x.includeTableSql = ie),
                                "checked-value": "1",
                                "unchecked-value": "0"
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.parentMenuId")
                          }, {
                            default: Oe(() => [
                              ke(he(Co), {
                                value: x.parentMenuId,
                                "onUpdate:value": W[15] || (W[15] = (ie) => x.parentMenuId = ie),
                                class: "w-full"
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.author"),
                            path: "author"
                          }, {
                            default: Oe(() => [
                              ke(he(xt), {
                                value: x.author,
                                "onUpdate:value": W[16] || (W[16] = (ie) => x.author = ie)
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                            /* STABLE */
                          }, 8, ["label"]),
                          ke(he(Ft), {
                            span: "12",
                            label: he(t)("plugin.codegen.fields.status")
                          }, {
                            default: Oe(() => [
                              ke(he(yr), {
                                value: x.status,
                                "onUpdate:value": W[17] || (W[17] = (ie) => x.status = ie),
                                options: m
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
              ke(he(Ws), {
                name: 2,
                tab: he(t)("plugin.codegen.step.columns"),
                disabled: ""
              }, {
                default: Oe(() => [
                  ke(he(No), { class: "mb-12" }, {
                    default: Oe(() => [
                      ke(he(It), {
                        type: "error",
                        onClick: xe
                      }, {
                        default: Oe(() => [
                          Ln(
                            Bn(he(t)("plugin.codegen.actions.cleanColumns")),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      ke(he(It), {
                        type: "warning",
                        onClick: ve
                      }, {
                        default: Oe(() => [
                          Ln(
                            Bn(he(t)("plugin.codegen.actions.syncColumns")),
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
                  ke(he(qh), {
                    loading: g.value,
                    columns: w,
                    data: u.value,
                    "scroll-x": 5200,
                    size: "small",
                    "row-key": (ie) => ie.id
                  }, null, 8, ["loading", "data", "row-key"])
                ]),
                _: 1
                /* STABLE */
              }, 8, ["tab"]),
              ke(he(Ws), {
                name: 3,
                tab: he(t)("plugin.codegen.step.result"),
                disabled: ""
              }, {
                default: Oe(() => [
                  ke(he(rO), {
                    status: "success",
                    title: he(t)("plugin.codegen.result.title")
                  }, {
                    footer: Oe(() => [
                      ke(he(It), {
                        type: "primary",
                        onClick: J
                      }, {
                        default: Oe(() => [
                          Ln(
                            Bn(he(t)("plugin.codegen.actions.generate")),
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
      }, 8, ["show", "title"])
    ]));
  }
}), IO = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, BO = /* @__PURE__ */ IO(VO, [["__scopeId", "data-v-b2167f5e"]]);
export {
  BO as default
};
