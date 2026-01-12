/*!
  * shared v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function im(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const Fd = typeof window < "u", Eo = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), am = (e, t, n) => lm({ l: e, k: t, s: n }), lm = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), kt = (e) => typeof e == "number" && isFinite(e), sm = (e) => Vs(e) === "[object Date]", da = (e) => Vs(e) === "[object RegExp]", Ca = (e) => Ue(e) && Object.keys(e).length === 0, Rt = Object.assign, dm = Object.create, nt = (e = null) => dm(e);
let Ed;
const xo = () => Ed || (Ed = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : nt());
function Od(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function zd(e) {
  return e.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function cm(e) {
  return e = e.replace(/(\w+)\s*=\s*"([^"]*)"/g, (o, r, i) => `${r}="${zd(i)}"`), e = e.replace(/(\w+)\s*=\s*'([^']*)'/g, (o, r, i) => `${r}='${zd(i)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(e) && (e = e.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ].forEach((o) => {
    e = e.replace(o, "$1javascript&#58;");
  }), e;
}
const um = Object.prototype.hasOwnProperty;
function pn(e, t) {
  return um.call(e, t);
}
const bt = Array.isArray, ht = (e) => typeof e == "function", xe = (e) => typeof e == "string", gt = (e) => typeof e == "boolean", Ke = (e) => e !== null && typeof e == "object", fm = (e) => Ke(e) && ht(e.then) && ht(e.catch), th = Object.prototype.toString, Vs = (e) => th.call(e), Ue = (e) => Vs(e) === "[object Object]", hm = (e) => e == null ? "" : bt(e) || Ue(e) && e.toString === th ? JSON.stringify(e, null, 2) : String(e);
function Bs(e, t = "") {
  return e.reduce((n, o, r) => r === 0 ? n + o : n + t + o, "");
}
const fi = (e) => !Ke(e) || bt(e);
function ra(e, t) {
  if (fi(e) || fi(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: o, des: r } = n.pop();
    Object.keys(o).forEach((i) => {
      i !== "__proto__" && (Ke(o[i]) && !Ke(r[i]) && (r[i] = Array.isArray(o[i]) ? [] : nt()), fi(r[i]) || fi(o[i]) ? r[i] = o[i] : n.push({ src: o[i], des: r[i] }));
    });
  }
}
/*!
  * message-compiler v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function pm(e, t, n) {
  return { line: e, column: t, offset: n };
}
function ts(e, t, n) {
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
}, vm = 17;
function Sa(e, t, n = {}) {
  const { domain: o, messages: r, args: i } = n, a = e, l = new SyntaxError(String(a));
  return l.code = e, t && (l.location = t), l.domain = o, l;
}
function mm(e) {
  throw e;
}
const gn = " ", gm = "\r", Ft = `
`, bm = "\u2028", wm = "\u2029";
function ym(e) {
  const t = e;
  let n = 0, o = 1, r = 1, i = 0;
  const a = (y) => t[y] === gm && t[y + 1] === Ft, l = (y) => t[y] === Ft, s = (y) => t[y] === wm, d = (y) => t[y] === bm, c = (y) => a(y) || l(y) || s(y) || d(y), h = () => n, p = () => o, v = () => r, f = () => i, m = (y) => a(y) || s(y) || d(y) ? Ft : t[y], g = () => m(n), u = () => m(n + i);
  function b() {
    return i = 0, c(n) && (o++, r = 0), a(n) && n++, n++, r++, t[n];
  }
  function x() {
    return a(n + i) && i++, i++, t[n + i];
  }
  function w() {
    n = 0, o = 1, r = 1, i = 0;
  }
  function C(y = 0) {
    i = y;
  }
  function S() {
    const y = n + i;
    for (; y !== n; )
      b();
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
    next: b,
    peek: x,
    reset: w,
    resetPeek: C,
    skipToPeek: S
  };
}
const zn = void 0, xm = ".", Md = "'", Cm = "tokenizer";
function Sm(e, t = {}) {
  const n = t.location !== !1, o = ym(e), r = () => o.index(), i = () => pm(o.line(), o.column(), o.index()), a = i(), l = r(), s = {
    currentType: 13,
    offset: l,
    startLoc: a,
    endLoc: a,
    lastType: 13,
    lastOffset: l,
    lastStartLoc: a,
    lastEndLoc: a,
    braceNest: 0,
    inLinked: !1,
    text: ""
  }, d = () => s, { onError: c } = t;
  function h(R, $, N, ...ne) {
    const ge = d();
    if ($.column += N, $.offset += N, c) {
      const he = n ? ts(ge.startLoc, $) : null, O = Sa(R, he, {
        domain: Cm,
        args: ne
      });
      c(O);
    }
  }
  function p(R, $, N) {
    R.endLoc = i(), R.currentType = $;
    const ne = { type: $ };
    return n && (ne.loc = ts(R.startLoc, R.endLoc)), N != null && (ne.value = N), ne;
  }
  const v = (R) => p(
    R,
    13
    /* TokenTypes.EOF */
  );
  function f(R, $) {
    return R.currentChar() === $ ? (R.next(), $) : (h(Xe.EXPECTED_TOKEN, i(), 0, $), "");
  }
  function m(R) {
    let $ = "";
    for (; R.currentPeek() === gn || R.currentPeek() === Ft; )
      $ += R.currentPeek(), R.peek();
    return $;
  }
  function g(R) {
    const $ = m(R);
    return R.skipToPeek(), $;
  }
  function u(R) {
    if (R === zn)
      return !1;
    const $ = R.charCodeAt(0);
    return $ >= 97 && $ <= 122 || // a-z
    $ >= 65 && $ <= 90 || // A-Z
    $ === 95;
  }
  function b(R) {
    if (R === zn)
      return !1;
    const $ = R.charCodeAt(0);
    return $ >= 48 && $ <= 57;
  }
  function x(R, $) {
    const { currentType: N } = $;
    if (N !== 2)
      return !1;
    m(R);
    const ne = u(R.currentPeek());
    return R.resetPeek(), ne;
  }
  function w(R, $) {
    const { currentType: N } = $;
    if (N !== 2)
      return !1;
    m(R);
    const ne = R.currentPeek() === "-" ? R.peek() : R.currentPeek(), ge = b(ne);
    return R.resetPeek(), ge;
  }
  function C(R, $) {
    const { currentType: N } = $;
    if (N !== 2)
      return !1;
    m(R);
    const ne = R.currentPeek() === Md;
    return R.resetPeek(), ne;
  }
  function S(R, $) {
    const { currentType: N } = $;
    if (N !== 7)
      return !1;
    m(R);
    const ne = R.currentPeek() === ".";
    return R.resetPeek(), ne;
  }
  function y(R, $) {
    const { currentType: N } = $;
    if (N !== 8)
      return !1;
    m(R);
    const ne = u(R.currentPeek());
    return R.resetPeek(), ne;
  }
  function T(R, $) {
    const { currentType: N } = $;
    if (!(N === 7 || N === 11))
      return !1;
    m(R);
    const ne = R.currentPeek() === ":";
    return R.resetPeek(), ne;
  }
  function k(R, $) {
    const { currentType: N } = $;
    if (N !== 9)
      return !1;
    const ne = () => {
      const he = R.currentPeek();
      return he === "{" ? u(R.peek()) : he === "@" || he === "|" || he === ":" || he === "." || he === gn || !he ? !1 : he === Ft ? (R.peek(), ne()) : U(R, !1);
    }, ge = ne();
    return R.resetPeek(), ge;
  }
  function E(R) {
    m(R);
    const $ = R.currentPeek() === "|";
    return R.resetPeek(), $;
  }
  function U(R, $ = !0) {
    const N = (ge = !1, he = "") => {
      const O = R.currentPeek();
      return O === "{" || O === "@" || !O ? ge : O === "|" ? !(he === gn || he === Ft) : O === gn ? (R.peek(), N(!0, gn)) : O === Ft ? (R.peek(), N(!0, Ft)) : !0;
    }, ne = N();
    return $ && R.resetPeek(), ne;
  }
  function _(R, $) {
    const N = R.currentChar();
    return N === zn ? zn : $(N) ? (R.next(), N) : null;
  }
  function M(R) {
    const $ = R.charCodeAt(0);
    return $ >= 97 && $ <= 122 || // a-z
    $ >= 65 && $ <= 90 || // A-Z
    $ >= 48 && $ <= 57 || // 0-9
    $ === 95 || // _
    $ === 36;
  }
  function I(R) {
    return _(R, M);
  }
  function z(R) {
    const $ = R.charCodeAt(0);
    return $ >= 97 && $ <= 122 || // a-z
    $ >= 65 && $ <= 90 || // A-Z
    $ >= 48 && $ <= 57 || // 0-9
    $ === 95 || // _
    $ === 36 || // $
    $ === 45;
  }
  function G(R) {
    return _(R, z);
  }
  function L(R) {
    const $ = R.charCodeAt(0);
    return $ >= 48 && $ <= 57;
  }
  function Z(R) {
    return _(R, L);
  }
  function te(R) {
    const $ = R.charCodeAt(0);
    return $ >= 48 && $ <= 57 || // 0-9
    $ >= 65 && $ <= 70 || // A-F
    $ >= 97 && $ <= 102;
  }
  function q(R) {
    return _(R, te);
  }
  function A(R) {
    let $ = "", N = "";
    for (; $ = Z(R); )
      N += $;
    return N;
  }
  function F(R) {
    let $ = "";
    for (; ; ) {
      const N = R.currentChar();
      if (N === "{" || N === "}" || N === "@" || N === "|" || !N)
        break;
      if (N === gn || N === Ft)
        if (U(R))
          $ += N, R.next();
        else {
          if (E(R))
            break;
          $ += N, R.next();
        }
      else
        $ += N, R.next();
    }
    return $;
  }
  function j(R) {
    g(R);
    let $ = "", N = "";
    for (; $ = G(R); )
      N += $;
    const ne = R.currentChar();
    if (ne && ne !== "}" && ne !== zn && ne !== gn && ne !== Ft && ne !== "　") {
      const ge = se(R);
      return h(Xe.INVALID_TOKEN_IN_PLACEHOLDER, i(), 0, N + ge), N + ge;
    }
    return R.currentChar() === zn && h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), N;
  }
  function J(R) {
    g(R);
    let $ = "";
    return R.currentChar() === "-" ? (R.next(), $ += `-${A(R)}`) : $ += A(R), R.currentChar() === zn && h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), $;
  }
  function Q(R) {
    return R !== Md && R !== Ft;
  }
  function ee(R) {
    g(R), f(R, "'");
    let $ = "", N = "";
    for (; $ = _(R, Q); )
      $ === "\\" ? N += de(R) : N += $;
    const ne = R.currentChar();
    return ne === Ft || ne === zn ? (h(Xe.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, i(), 0), ne === Ft && (R.next(), f(R, "'")), N) : (f(R, "'"), N);
  }
  function de(R) {
    const $ = R.currentChar();
    switch ($) {
      case "\\":
      case "'":
        return R.next(), `\\${$}`;
      case "u":
        return pe(R, $, 4);
      case "U":
        return pe(R, $, 6);
      default:
        return h(Xe.UNKNOWN_ESCAPE_SEQUENCE, i(), 0, $), "";
    }
  }
  function pe(R, $, N) {
    f(R, $);
    let ne = "";
    for (let ge = 0; ge < N; ge++) {
      const he = q(R);
      if (!he) {
        h(Xe.INVALID_UNICODE_ESCAPE_SEQUENCE, i(), 0, `\\${$}${ne}${R.currentChar()}`);
        break;
      }
      ne += he;
    }
    return `\\${$}${ne}`;
  }
  function Y(R) {
    return R !== "{" && R !== "}" && R !== gn && R !== Ft;
  }
  function se(R) {
    g(R);
    let $ = "", N = "";
    for (; $ = _(R, Y); )
      N += $;
    return N;
  }
  function $e(R) {
    let $ = "", N = "";
    for (; $ = I(R); )
      N += $;
    return N;
  }
  function me(R) {
    const $ = (N) => {
      const ne = R.currentChar();
      return ne === "{" || ne === "@" || ne === "|" || ne === "(" || ne === ")" || !ne || ne === gn ? N : (N += ne, R.next(), $(N));
    };
    return $("");
  }
  function be(R) {
    g(R);
    const $ = f(
      R,
      "|"
      /* TokenChars.Pipe */
    );
    return g(R), $;
  }
  function Ce(R, $) {
    let N = null;
    switch (R.currentChar()) {
      case "{":
        return $.braceNest >= 1 && h(Xe.NOT_ALLOW_NEST_PLACEHOLDER, i(), 0), R.next(), N = p(
          $,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), g(R), $.braceNest++, N;
      case "}":
        return $.braceNest > 0 && $.currentType === 2 && h(Xe.EMPTY_PLACEHOLDER, i(), 0), R.next(), N = p(
          $,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), $.braceNest--, $.braceNest > 0 && g(R), $.inLinked && $.braceNest === 0 && ($.inLinked = !1), N;
      case "@":
        return $.braceNest > 0 && h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), N = Be(R, $) || v($), $.braceNest = 0, N;
      default: {
        let ge = !0, he = !0, O = !0;
        if (E(R))
          return $.braceNest > 0 && h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), N = p($, 1, be(R)), $.braceNest = 0, $.inLinked = !1, N;
        if ($.braceNest > 0 && ($.currentType === 4 || $.currentType === 5 || $.currentType === 6))
          return h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), $.braceNest = 0, Me(R, $);
        if (ge = x(R, $))
          return N = p($, 4, j(R)), g(R), N;
        if (he = w(R, $))
          return N = p($, 5, J(R)), g(R), N;
        if (O = C(R, $))
          return N = p($, 6, ee(R)), g(R), N;
        if (!ge && !he && !O)
          return N = p($, 12, se(R)), h(Xe.INVALID_TOKEN_IN_PLACEHOLDER, i(), 0, N.value), g(R), N;
        break;
      }
    }
    return N;
  }
  function Be(R, $) {
    const { currentType: N } = $;
    let ne = null;
    const ge = R.currentChar();
    switch ((N === 7 || N === 8 || N === 11 || N === 9) && (ge === Ft || ge === gn) && h(Xe.INVALID_LINKED_FORMAT, i(), 0), ge) {
      case "@":
        return R.next(), ne = p(
          $,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), $.inLinked = !0, ne;
      case ".":
        return g(R), R.next(), p(
          $,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return g(R), R.next(), p(
          $,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return E(R) ? (ne = p($, 1, be(R)), $.braceNest = 0, $.inLinked = !1, ne) : S(R, $) || T(R, $) ? (g(R), Be(R, $)) : y(R, $) ? (g(R), p($, 11, $e(R))) : k(R, $) ? (g(R), ge === "{" ? Ce(R, $) || ne : p($, 10, me(R))) : (N === 7 && h(Xe.INVALID_LINKED_FORMAT, i(), 0), $.braceNest = 0, $.inLinked = !1, Me(R, $));
    }
  }
  function Me(R, $) {
    let N = {
      type: 13
      /* TokenTypes.EOF */
    };
    if ($.braceNest > 0)
      return Ce(R, $) || v($);
    if ($.inLinked)
      return Be(R, $) || v($);
    switch (R.currentChar()) {
      case "{":
        return Ce(R, $) || v($);
      case "}":
        return h(Xe.UNBALANCED_CLOSING_BRACE, i(), 0), R.next(), p(
          $,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return Be(R, $) || v($);
      default: {
        if (E(R))
          return N = p($, 1, be(R)), $.braceNest = 0, $.inLinked = !1, N;
        if (U(R))
          return p($, 0, F(R));
        break;
      }
    }
    return N;
  }
  function ie() {
    const { currentType: R, offset: $, startLoc: N, endLoc: ne } = s;
    return s.lastType = R, s.lastOffset = $, s.lastStartLoc = N, s.lastEndLoc = ne, s.offset = r(), s.startLoc = i(), o.currentChar() === zn ? p(
      s,
      13
      /* TokenTypes.EOF */
    ) : Me(o, s);
  }
  return {
    nextToken: ie,
    currentOffset: r,
    currentPosition: i,
    context: d
  };
}
const $m = "parser", km = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function Rm(e, t, n) {
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
function Pm(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function o(u, b, x, w, ...C) {
    const S = u.currentPosition();
    if (S.offset += w, S.column += w, n) {
      const y = t ? ts(x, S) : null, T = Sa(b, y, {
        domain: $m,
        args: C
      });
      n(T);
    }
  }
  function r(u, b, x) {
    const w = { type: u };
    return t && (w.start = b, w.end = b, w.loc = { start: x, end: x }), w;
  }
  function i(u, b, x, w) {
    t && (u.end = b, u.loc && (u.loc.end = x));
  }
  function a(u, b) {
    const x = u.context(), w = r(3, x.offset, x.startLoc);
    return w.value = b, i(w, u.currentOffset(), u.currentPosition()), w;
  }
  function l(u, b) {
    const x = u.context(), { lastOffset: w, lastStartLoc: C } = x, S = r(5, w, C);
    return S.index = parseInt(b, 10), u.nextToken(), i(S, u.currentOffset(), u.currentPosition()), S;
  }
  function s(u, b) {
    const x = u.context(), { lastOffset: w, lastStartLoc: C } = x, S = r(4, w, C);
    return S.key = b, u.nextToken(), i(S, u.currentOffset(), u.currentPosition()), S;
  }
  function d(u, b) {
    const x = u.context(), { lastOffset: w, lastStartLoc: C } = x, S = r(9, w, C);
    return S.value = b.replace(km, Rm), u.nextToken(), i(S, u.currentOffset(), u.currentPosition()), S;
  }
  function c(u) {
    const b = u.nextToken(), x = u.context(), { lastOffset: w, lastStartLoc: C } = x, S = r(8, w, C);
    return b.type !== 11 ? (o(u, Xe.UNEXPECTED_EMPTY_LINKED_MODIFIER, x.lastStartLoc, 0), S.value = "", i(S, w, C), {
      nextConsumeToken: b,
      node: S
    }) : (b.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, bn(b)), S.value = b.value || "", i(S, u.currentOffset(), u.currentPosition()), {
      node: S
    });
  }
  function h(u, b) {
    const x = u.context(), w = r(7, x.offset, x.startLoc);
    return w.value = b, i(w, u.currentOffset(), u.currentPosition()), w;
  }
  function p(u) {
    const b = u.context(), x = r(6, b.offset, b.startLoc);
    let w = u.nextToken();
    if (w.type === 8) {
      const C = c(u);
      x.modifier = C.node, w = C.nextConsumeToken || u.nextToken();
    }
    switch (w.type !== 9 && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, bn(w)), w = u.nextToken(), w.type === 2 && (w = u.nextToken()), w.type) {
      case 10:
        w.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, bn(w)), x.key = h(u, w.value || "");
        break;
      case 4:
        w.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, bn(w)), x.key = s(u, w.value || "");
        break;
      case 5:
        w.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, bn(w)), x.key = l(u, w.value || "");
        break;
      case 6:
        w.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, bn(w)), x.key = d(u, w.value || "");
        break;
      default: {
        o(u, Xe.UNEXPECTED_EMPTY_LINKED_KEY, b.lastStartLoc, 0);
        const C = u.context(), S = r(7, C.offset, C.startLoc);
        return S.value = "", i(S, C.offset, C.startLoc), x.key = S, i(x, C.offset, C.startLoc), {
          nextConsumeToken: w,
          node: x
        };
      }
    }
    return i(x, u.currentOffset(), u.currentPosition()), {
      node: x
    };
  }
  function v(u) {
    const b = u.context(), x = b.currentType === 1 ? u.currentOffset() : b.offset, w = b.currentType === 1 ? b.endLoc : b.startLoc, C = r(2, x, w);
    C.items = [];
    let S = null;
    do {
      const k = S || u.nextToken();
      switch (S = null, k.type) {
        case 0:
          k.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, bn(k)), C.items.push(a(u, k.value || ""));
          break;
        case 5:
          k.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, bn(k)), C.items.push(l(u, k.value || ""));
          break;
        case 4:
          k.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, bn(k)), C.items.push(s(u, k.value || ""));
          break;
        case 6:
          k.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, b.lastStartLoc, 0, bn(k)), C.items.push(d(u, k.value || ""));
          break;
        case 7: {
          const E = p(u);
          C.items.push(E.node), S = E.nextConsumeToken || null;
          break;
        }
      }
    } while (b.currentType !== 13 && b.currentType !== 1);
    const y = b.currentType === 1 ? b.lastOffset : u.currentOffset(), T = b.currentType === 1 ? b.lastEndLoc : u.currentPosition();
    return i(C, y, T), C;
  }
  function f(u, b, x, w) {
    const C = u.context();
    let S = w.items.length === 0;
    const y = r(1, b, x);
    y.cases = [], y.cases.push(w);
    do {
      const T = v(u);
      S || (S = T.items.length === 0), y.cases.push(T);
    } while (C.currentType !== 13);
    return S && o(u, Xe.MUST_HAVE_MESSAGES_IN_PLURAL, x, 0), i(y, u.currentOffset(), u.currentPosition()), y;
  }
  function m(u) {
    const b = u.context(), { offset: x, startLoc: w } = b, C = v(u);
    return b.currentType === 13 ? C : f(u, x, w, C);
  }
  function g(u) {
    const b = Sm(u, Rt({}, e)), x = b.context(), w = r(0, x.offset, x.startLoc);
    return t && w.loc && (w.loc.source = u), w.body = m(b), e.onCacheKey && (w.cacheKey = e.onCacheKey(u)), x.currentType !== 13 && o(b, Xe.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, u[x.offset] || ""), i(w, b.currentOffset(), b.currentPosition()), w;
  }
  return { parse: g };
}
function bn(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function _m(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (i) => (n.helpers.add(i), i) };
}
function Id(e, t) {
  for (let n = 0; n < e.length; n++)
    Ls(e[n], t);
}
function Ls(e, t) {
  switch (e.type) {
    case 1:
      Id(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      Id(e.items, t);
      break;
    case 6: {
      Ls(e.key, t), t.helper(
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
function Tm(e, t = {}) {
  const n = _m(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && Ls(e.body, n);
  const o = n.context();
  e.helpers = Array.from(o.helpers);
}
function Fm(e) {
  const t = e.body;
  return t.type === 2 ? Ad(t) : t.cases.forEach((n) => Ad(n)), e;
}
function Ad(e) {
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
      e.static = Bs(t);
      for (let n = 0; n < e.items.length; n++) {
        const o = e.items[n];
        (o.type === 3 || o.type === 9) && delete o.value;
      }
    }
  }
}
function Zo(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      Zo(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let o = 0; o < n.length; o++)
        Zo(n[o]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let o = 0; o < n.length; o++)
        Zo(n[o]);
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
      Zo(t.key), t.k = t.key, delete t.key, t.modifier && (Zo(t.modifier), t.m = t.modifier, delete t.modifier);
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
function Em(e, t) {
  const { filename: n, breakLineCode: o, needIndent: r } = t, i = t.location !== !1, a = {
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
  i && e.loc && (a.source = e.loc.source);
  const l = () => a;
  function s(m, g) {
    a.code += m;
  }
  function d(m, g = !0) {
    const u = g ? o : "";
    s(r ? u + "  ".repeat(m) : u);
  }
  function c(m = !0) {
    const g = ++a.indentLevel;
    m && d(g);
  }
  function h(m = !0) {
    const g = --a.indentLevel;
    m && d(g);
  }
  function p() {
    d(a.indentLevel);
  }
  return {
    context: l,
    push: s,
    indent: c,
    deindent: h,
    newline: p,
    helper: (m) => `_${m}`,
    needIndent: () => a.needIndent
  };
}
function Om(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), tr(e, t.key), t.modifier ? (e.push(", "), tr(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function zm(e, t) {
  const { helper: n, needIndent: o } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(o());
  const r = t.items.length;
  for (let i = 0; i < r && (tr(e, t.items[i]), i !== r - 1); i++)
    e.push(", ");
  e.deindent(o()), e.push("])");
}
function Mm(e, t) {
  const { helper: n, needIndent: o } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(o());
    const r = t.cases.length;
    for (let i = 0; i < r && (tr(e, t.cases[i]), i !== r - 1); i++)
      e.push(", ");
    e.deindent(o()), e.push("])");
  }
}
function Im(e, t) {
  t.body ? tr(e, t.body) : e.push("null");
}
function tr(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      Im(e, t);
      break;
    case 1:
      Mm(e, t);
      break;
    case 2:
      zm(e, t);
      break;
    case 6:
      Om(e, t);
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
const Am = (e, t = {}) => {
  const n = xe(t.mode) ? t.mode : "normal", o = xe(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const r = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, i = t.needIndent ? t.needIndent : n !== "arrow", a = e.helpers || [], l = Em(e, {
    filename: o,
    breakLineCode: r,
    needIndent: i
  });
  l.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), l.indent(i), a.length > 0 && (l.push(`const { ${Bs(a.map((c) => `${c}: _${c}`), ", ")} } = ctx`), l.newline()), l.push("return "), tr(l, e), l.deindent(i), l.push("}"), delete e.helpers;
  const { code: s, map: d } = l.context();
  return {
    ast: e,
    code: s,
    map: d ? d.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function Vm(e, t = {}) {
  const n = Rt({}, t), o = !!n.jit, r = !!n.minify, i = n.optimize == null ? !0 : n.optimize, l = Pm(n).parse(e);
  return o ? (i && Fm(l), r && Zo(l), { ast: l, code: "" }) : (Tm(l, n), Am(l, n));
}
/*!
  * core-base v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Bm() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (xo().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (xo().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function kn(e) {
  return Ke(e) && Ds(e) === 0 && (pn(e, "b") || pn(e, "body"));
}
const nh = ["b", "body"];
function Lm(e) {
  return fo(e, nh);
}
const oh = ["c", "cases"];
function Dm(e) {
  return fo(e, oh, []);
}
const rh = ["s", "static"];
function Nm(e) {
  return fo(e, rh);
}
const ih = ["i", "items"];
function Hm(e) {
  return fo(e, ih, []);
}
const ah = ["t", "type"];
function Ds(e) {
  return fo(e, ah);
}
const lh = ["v", "value"];
function hi(e, t) {
  const n = fo(e, lh);
  if (n != null)
    return n;
  throw Ur(t);
}
const sh = ["m", "modifier"];
function jm(e) {
  return fo(e, sh);
}
const dh = ["k", "key"];
function Wm(e) {
  const t = fo(e, dh);
  if (t)
    return t;
  throw Ur(
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
const ch = [
  ...nh,
  ...oh,
  ...rh,
  ...ih,
  ...dh,
  ...sh,
  ...lh,
  ...ah
];
function Ur(e) {
  return new Error(`unhandled node type: ${e}`);
}
function Ka(e) {
  return (n) => Um(n, e);
}
function Um(e, t) {
  const n = Lm(t);
  if (n == null)
    throw Ur(
      0
      /* NodeTypes.Resource */
    );
  if (Ds(n) === 1) {
    const i = Dm(n);
    return e.plural(i.reduce((a, l) => [
      ...a,
      Vd(e, l)
    ], []));
  } else
    return Vd(e, n);
}
function Vd(e, t) {
  const n = Nm(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const o = Hm(t).reduce((r, i) => [...r, ns(e, i)], []);
    return e.normalize(o);
  }
}
function ns(e, t) {
  const n = Ds(t);
  switch (n) {
    case 3:
      return hi(t, n);
    case 9:
      return hi(t, n);
    case 4: {
      const o = t;
      if (pn(o, "k") && o.k)
        return e.interpolate(e.named(o.k));
      if (pn(o, "key") && o.key)
        return e.interpolate(e.named(o.key));
      throw Ur(n);
    }
    case 5: {
      const o = t;
      if (pn(o, "i") && kt(o.i))
        return e.interpolate(e.list(o.i));
      if (pn(o, "index") && kt(o.index))
        return e.interpolate(e.list(o.index));
      throw Ur(n);
    }
    case 6: {
      const o = t, r = jm(o), i = Wm(o);
      return e.linked(ns(e, i), r ? ns(e, r) : void 0, e.type);
    }
    case 7:
      return hi(t, n);
    case 8:
      return hi(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const Km = (e) => e;
let pi = nt();
function qm(e, t = {}) {
  let n = !1;
  const o = t.onError || mm;
  return t.onError = (r) => {
    n = !0, o(r);
  }, { ...Vm(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function Gm(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && xe(e)) {
    gt(t.warnHtmlMessage) && t.warnHtmlMessage;
    const o = (t.onCacheKey || Km)(e), r = pi[o];
    if (r)
      return r;
    const { ast: i, detectError: a } = qm(e, {
      ...t,
      location: !1,
      jit: !0
    }), l = Ka(i);
    return a ? l : pi[o] = l;
  } else {
    const n = e.cacheKey;
    if (n) {
      const o = pi[n];
      return o || (pi[n] = Ka(e));
    } else
      return Ka(e);
  }
}
let Kr = null;
function Xm(e) {
  Kr = e;
}
function Ym(e, t, n) {
  Kr && Kr.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const Zm = /* @__PURE__ */ Jm("function:translate");
function Jm(e) {
  return (t) => Kr && Kr.emit(e, t);
}
const Dn = {
  INVALID_ARGUMENT: vm,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, Qm = 24;
function Nn(e) {
  return Sa(e, null, void 0);
}
function Ns(e, t) {
  return t.locale != null ? Bd(t.locale) : Bd(e.locale);
}
let qa;
function Bd(e) {
  if (xe(e))
    return e;
  if (ht(e)) {
    if (e.resolvedOnce && qa != null)
      return qa;
    if (e.constructor.name === "Function") {
      const t = e();
      if (fm(t))
        throw Nn(Dn.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return qa = t;
    } else
      throw Nn(Dn.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw Nn(Dn.NOT_SUPPORT_LOCALE_TYPE);
}
function eg(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...bt(t) ? t : Ke(t) ? Object.keys(t) : xe(t) ? [t] : [n]
  ])];
}
function uh(e, t, n) {
  const o = xe(n) ? n : ca, r = e;
  r.__localeChainCache || (r.__localeChainCache = /* @__PURE__ */ new Map());
  let i = r.__localeChainCache.get(o);
  if (!i) {
    i = [];
    let a = [n];
    for (; bt(a); )
      a = Ld(i, a, t);
    const l = bt(t) || !Ue(t) ? t : t.default ? t.default : null;
    a = xe(l) ? [l] : l, bt(a) && Ld(i, a, !1), r.__localeChainCache.set(o, i);
  }
  return i;
}
function Ld(e, t, n) {
  let o = !0;
  for (let r = 0; r < t.length && gt(o); r++) {
    const i = t[r];
    xe(i) && (o = tg(e, t[r], n));
  }
  return o;
}
function tg(e, t, n) {
  let o;
  const r = t.split("-");
  do {
    const i = r.join("-");
    o = ng(e, i, n), r.splice(-1, 1);
  } while (r.length && o === !0);
  return o;
}
function ng(e, t, n) {
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
const og = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function rg(e) {
  return og.test(e);
}
function ig(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function ag(e) {
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
function lg(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : rg(t) ? ig(t) : "*" + t;
}
function sg(e) {
  const t = [];
  let n = -1, o = 0, r = 0, i, a, l, s, d, c, h;
  const p = [];
  p[
    0
    /* Actions.APPEND */
  ] = () => {
    a === void 0 ? a = l : a += l;
  }, p[
    1
    /* Actions.PUSH */
  ] = () => {
    a !== void 0 && (t.push(a), a = void 0);
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
      if (r = 0, a === void 0 || (a = lg(a), a === !1))
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
      return n++, l = "\\" + f, p[
        0
        /* Actions.APPEND */
      ](), !0;
  }
  for (; o !== null; )
    if (n++, i = e[n], !(i === "\\" && v())) {
      if (s = ag(i), h = ho[o], d = h[s] || h.l || 8, d === 8 || (o = d[0], d[1] !== void 0 && (c = p[d[1]], c && (l = i, c() === !1))))
        return;
      if (o === 7)
        return t;
    }
}
const Dd = /* @__PURE__ */ new Map();
function dg(e, t) {
  return Ke(e) ? e[t] : null;
}
function cg(e, t) {
  if (!Ke(e))
    return null;
  let n = Dd.get(t);
  if (n || (n = sg(t), n && Dd.set(t, n)), !n)
    return null;
  const o = n.length;
  let r = e, i = 0;
  for (; i < o; ) {
    const a = n[i];
    if (ch.includes(a) && kn(r))
      return null;
    const l = r[a];
    if (l === void 0 || ht(r))
      return null;
    r = l, i++;
  }
  return r;
}
const ug = "11.1.12", $a = -1, ca = "en-US", Nd = "", Hd = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function fg() {
  return {
    upper: (e, t) => t === "text" && xe(e) ? e.toUpperCase() : t === "vnode" && Ke(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && xe(e) ? e.toLowerCase() : t === "vnode" && Ke(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && xe(e) ? Hd(e) : t === "vnode" && Ke(e) && "__v_isVNode" in e ? Hd(e.children) : e
  };
}
let fh;
function hg(e) {
  fh = e;
}
let hh;
function pg(e) {
  hh = e;
}
let ph;
function vg(e) {
  ph = e;
}
let vh = null;
const mg = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  vh = e;
}, gg = /* @__NO_SIDE_EFFECTS__ */ () => vh;
let mh = null;
const jd = (e) => {
  mh = e;
}, bg = () => mh;
let Wd = 0;
function wg(e = {}) {
  const t = ht(e.onWarn) ? e.onWarn : im, n = xe(e.version) ? e.version : ug, o = xe(e.locale) || ht(e.locale) ? e.locale : ca, r = ht(o) ? ca : o, i = bt(e.fallbackLocale) || Ue(e.fallbackLocale) || xe(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : r, a = Ue(e.messages) ? e.messages : Ga(r), l = Ue(e.datetimeFormats) ? e.datetimeFormats : Ga(r), s = Ue(e.numberFormats) ? e.numberFormats : Ga(r), d = Rt(nt(), e.modifiers, fg()), c = e.pluralRules || nt(), h = ht(e.missing) ? e.missing : null, p = gt(e.missingWarn) || da(e.missingWarn) ? e.missingWarn : !0, v = gt(e.fallbackWarn) || da(e.fallbackWarn) ? e.fallbackWarn : !0, f = !!e.fallbackFormat, m = !!e.unresolving, g = ht(e.postTranslation) ? e.postTranslation : null, u = Ue(e.processor) ? e.processor : null, b = gt(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, x = !!e.escapeParameter, w = ht(e.messageCompiler) ? e.messageCompiler : fh, C = ht(e.messageResolver) ? e.messageResolver : hh || dg, S = ht(e.localeFallbacker) ? e.localeFallbacker : ph || eg, y = Ke(e.fallbackContext) ? e.fallbackContext : void 0, T = e, k = Ke(T.__datetimeFormatters) ? T.__datetimeFormatters : /* @__PURE__ */ new Map(), E = Ke(T.__numberFormatters) ? T.__numberFormatters : /* @__PURE__ */ new Map(), U = Ke(T.__meta) ? T.__meta : {};
  Wd++;
  const _ = {
    version: n,
    cid: Wd,
    locale: o,
    fallbackLocale: i,
    messages: a,
    modifiers: d,
    pluralRules: c,
    missing: h,
    missingWarn: p,
    fallbackWarn: v,
    fallbackFormat: f,
    unresolving: m,
    postTranslation: g,
    processor: u,
    warnHtmlMessage: b,
    escapeParameter: x,
    messageCompiler: w,
    messageResolver: C,
    localeFallbacker: S,
    fallbackContext: y,
    onWarn: t,
    __meta: U
  };
  return _.datetimeFormats = l, _.numberFormats = s, _.__datetimeFormatters = k, _.__numberFormatters = E, __INTLIFY_PROD_DEVTOOLS__ && Ym(_, n, U), _;
}
const Ga = (e) => ({ [e]: nt() });
function Hs(e, t, n, o, r) {
  const { missing: i, onWarn: a } = e;
  if (i !== null) {
    const l = i(e, n, t, r);
    return xe(l) ? l : t;
  } else
    return t;
}
function br(e, t, n) {
  const o = e;
  o.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function yg(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function xg(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let o = n + 1; o < t.length; o++)
    if (yg(e, t[o]))
      return !0;
  return !1;
}
function Ud(e, ...t) {
  const { datetimeFormats: n, unresolving: o, fallbackLocale: r, onWarn: i, localeFallbacker: a } = e, { __datetimeFormatters: l } = e, [s, d, c, h] = os(...t), p = gt(c.missingWarn) ? c.missingWarn : e.missingWarn;
  gt(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const v = !!c.part, f = Ns(e, c), m = a(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    f
  );
  if (!xe(s) || s === "")
    return new Intl.DateTimeFormat(f, h).format(d);
  let g = {}, u, b = null;
  const x = "datetime format";
  for (let S = 0; S < m.length && (u = m[S], g = n[u] || {}, b = g[s], !Ue(b)); S++)
    Hs(e, s, u, p, x);
  if (!Ue(b) || !xe(u))
    return o ? $a : s;
  let w = `${u}__${s}`;
  Ca(h) || (w = `${w}__${JSON.stringify(h)}`);
  let C = l.get(w);
  return C || (C = new Intl.DateTimeFormat(u, Rt({}, b, h)), l.set(w, C)), v ? C.formatToParts(d) : C.format(d);
}
const gh = [
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
function os(...e) {
  const [t, n, o, r] = e, i = nt();
  let a = nt(), l;
  if (xe(t)) {
    const s = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!s)
      throw Nn(Dn.INVALID_ISO_DATE_ARGUMENT);
    const d = s[3] ? s[3].trim().startsWith("T") ? `${s[1].trim()}${s[3].trim()}` : `${s[1].trim()}T${s[3].trim()}` : s[1].trim();
    l = new Date(d);
    try {
      l.toISOString();
    } catch {
      throw Nn(Dn.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (sm(t)) {
    if (isNaN(t.getTime()))
      throw Nn(Dn.INVALID_DATE_ARGUMENT);
    l = t;
  } else if (kt(t))
    l = t;
  else
    throw Nn(Dn.INVALID_ARGUMENT);
  return xe(n) ? i.key = n : Ue(n) && Object.keys(n).forEach((s) => {
    gh.includes(s) ? a[s] = n[s] : i[s] = n[s];
  }), xe(o) ? i.locale = o : Ue(o) && (a = o), Ue(r) && (a = r), [i.key || "", l, i, a];
}
function Kd(e, t, n) {
  const o = e;
  for (const r in n) {
    const i = `${t}__${r}`;
    o.__datetimeFormatters.has(i) && o.__datetimeFormatters.delete(i);
  }
}
function qd(e, ...t) {
  const { numberFormats: n, unresolving: o, fallbackLocale: r, onWarn: i, localeFallbacker: a } = e, { __numberFormatters: l } = e, [s, d, c, h] = rs(...t), p = gt(c.missingWarn) ? c.missingWarn : e.missingWarn;
  gt(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const v = !!c.part, f = Ns(e, c), m = a(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    f
  );
  if (!xe(s) || s === "")
    return new Intl.NumberFormat(f, h).format(d);
  let g = {}, u, b = null;
  const x = "number format";
  for (let S = 0; S < m.length && (u = m[S], g = n[u] || {}, b = g[s], !Ue(b)); S++)
    Hs(e, s, u, p, x);
  if (!Ue(b) || !xe(u))
    return o ? $a : s;
  let w = `${u}__${s}`;
  Ca(h) || (w = `${w}__${JSON.stringify(h)}`);
  let C = l.get(w);
  return C || (C = new Intl.NumberFormat(u, Rt({}, b, h)), l.set(w, C)), v ? C.formatToParts(d) : C.format(d);
}
const bh = [
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
function rs(...e) {
  const [t, n, o, r] = e, i = nt();
  let a = nt();
  if (!kt(t))
    throw Nn(Dn.INVALID_ARGUMENT);
  const l = t;
  return xe(n) ? i.key = n : Ue(n) && Object.keys(n).forEach((s) => {
    bh.includes(s) ? a[s] = n[s] : i[s] = n[s];
  }), xe(o) ? i.locale = o : Ue(o) && (a = o), Ue(r) && (a = r), [i.key || "", l, i, a];
}
function Gd(e, t, n) {
  const o = e;
  for (const r in n) {
    const i = `${t}__${r}`;
    o.__numberFormatters.has(i) && o.__numberFormatters.delete(i);
  }
}
const Cg = (e) => e, Sg = (e) => "", $g = "text", kg = (e) => e.length === 0 ? "" : Bs(e), Rg = hm;
function Xd(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function Pg(e) {
  const t = kt(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (kt(e.named.count) || kt(e.named.n)) ? kt(e.named.count) ? e.named.count : kt(e.named.n) ? e.named.n : t : t;
}
function _g(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function Tg(e = {}) {
  const t = e.locale, n = Pg(e), o = Ke(e.pluralRules) && xe(t) && ht(e.pluralRules[t]) ? e.pluralRules[t] : Xd, r = Ke(e.pluralRules) && xe(t) && ht(e.pluralRules[t]) ? Xd : void 0, i = (u) => u[o(n, u.length, r)], a = e.list || [], l = (u) => a[u], s = e.named || nt();
  kt(e.pluralIndex) && _g(n, s);
  const d = (u) => s[u];
  function c(u, b) {
    const x = ht(e.messages) ? e.messages(u, !!b) : Ke(e.messages) ? e.messages[u] : !1;
    return x || (e.parent ? e.parent.message(u) : Sg);
  }
  const h = (u) => e.modifiers ? e.modifiers[u] : Cg, p = Ue(e.processor) && ht(e.processor.normalize) ? e.processor.normalize : kg, v = Ue(e.processor) && ht(e.processor.interpolate) ? e.processor.interpolate : Rg, f = Ue(e.processor) && xe(e.processor.type) ? e.processor.type : $g, g = {
    list: l,
    named: d,
    plural: i,
    linked: (u, ...b) => {
      const [x, w] = b;
      let C = "text", S = "";
      b.length === 1 ? Ke(x) ? (S = x.modifier || S, C = x.type || C) : xe(x) && (S = x || S) : b.length === 2 && (xe(x) && (S = x || S), xe(w) && (C = w || C));
      const y = c(u, !0)(g), T = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        C === "vnode" && bt(y) && S ? y[0] : y
      );
      return S ? h(S)(T, C) : T;
    },
    message: c,
    type: f,
    interpolate: v,
    normalize: p,
    values: Rt(nt(), a, s)
  };
  return g;
}
const Yd = () => "", on = (e) => ht(e);
function Zd(e, ...t) {
  const { fallbackFormat: n, postTranslation: o, unresolving: r, messageCompiler: i, fallbackLocale: a, messages: l } = e, [s, d] = is(...t), c = gt(d.missingWarn) ? d.missingWarn : e.missingWarn, h = gt(d.fallbackWarn) ? d.fallbackWarn : e.fallbackWarn, p = gt(d.escapeParameter) ? d.escapeParameter : e.escapeParameter, v = !!d.resolvedMessage, f = xe(d.default) || gt(d.default) ? gt(d.default) ? i ? s : () => s : d.default : n ? i ? s : () => s : null, m = n || f != null && (xe(f) || ht(f)), g = Ns(e, d);
  p && Fg(d);
  let [u, b, x] = v ? [
    s,
    g,
    l[g] || nt()
  ] : wh(e, s, g, a, h, c), w = u, C = s;
  if (!v && !(xe(w) || kn(w) || on(w)) && m && (w = f, C = w), !v && (!(xe(w) || kn(w) || on(w)) || !xe(b)))
    return r ? $a : s;
  let S = !1;
  const y = () => {
    S = !0;
  }, T = on(w) ? w : yh(e, s, b, w, C, y);
  if (S)
    return w;
  const k = zg(e, b, x, d), E = Tg(k), U = Eg(e, T, E);
  let _ = o ? o(U, s) : U;
  if (p && xe(_) && (_ = cm(_)), __INTLIFY_PROD_DEVTOOLS__) {
    const M = {
      timestamp: Date.now(),
      key: xe(s) ? s : on(w) ? w.key : "",
      locale: b || (on(w) ? w.locale : ""),
      format: xe(w) ? w : on(w) ? w.source : "",
      message: _
    };
    M.meta = Rt({}, e.__meta, /* @__PURE__ */ gg() || {}), Zm(M);
  }
  return _;
}
function Fg(e) {
  bt(e.list) ? e.list = e.list.map((t) => xe(t) ? Od(t) : t) : Ke(e.named) && Object.keys(e.named).forEach((t) => {
    xe(e.named[t]) && (e.named[t] = Od(e.named[t]));
  });
}
function wh(e, t, n, o, r, i) {
  const { messages: a, onWarn: l, messageResolver: s, localeFallbacker: d } = e, c = d(e, o, n);
  let h = nt(), p, v = null;
  const f = "translate";
  for (let m = 0; m < c.length && (p = c[m], h = a[p] || nt(), (v = s(h, t)) === null && (v = h[t]), !(xe(v) || kn(v) || on(v))); m++)
    if (!xg(p, c)) {
      const g = Hs(
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
function yh(e, t, n, o, r, i) {
  const { messageCompiler: a, warnHtmlMessage: l } = e;
  if (on(o)) {
    const d = o;
    return d.locale = d.locale || n, d.key = d.key || t, d;
  }
  if (a == null) {
    const d = () => o;
    return d.locale = n, d.key = t, d;
  }
  const s = a(o, Og(e, n, r, o, l, i));
  return s.locale = n, s.key = t, s.source = o, s;
}
function Eg(e, t, n) {
  return t(n);
}
function is(...e) {
  const [t, n, o] = e, r = nt();
  if (!xe(t) && !kt(t) && !on(t) && !kn(t))
    throw Nn(Dn.INVALID_ARGUMENT);
  const i = kt(t) ? String(t) : (on(t), t);
  return kt(n) ? r.plural = n : xe(n) ? r.default = n : Ue(n) && !Ca(n) ? r.named = n : bt(n) && (r.list = n), kt(o) ? r.plural = o : xe(o) ? r.default = o : Ue(o) && Rt(r, o), [i, r];
}
function Og(e, t, n, o, r, i) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: r,
    onError: (a) => {
      throw i && i(a), a;
    },
    onCacheKey: (a) => am(t, n, a)
  };
}
function zg(e, t, n, o) {
  const { modifiers: r, pluralRules: i, messageResolver: a, fallbackLocale: l, fallbackWarn: s, missingWarn: d, fallbackContext: c } = e, p = {
    locale: t,
    modifiers: r,
    pluralRules: i,
    messages: (v, f) => {
      let m = a(n, v);
      if (m == null && (c || f)) {
        const [, , g] = wh(
          c || e,
          // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
          v,
          t,
          l,
          s,
          d
        );
        m = a(g, v);
      }
      if (xe(m) || kn(m)) {
        let g = !1;
        const b = yh(e, v, t, m, v, () => {
          g = !0;
        });
        return g ? Yd : b;
      } else return on(m) ? m : Yd;
    }
  };
  return e.processor && (p.processor = e.processor), o.list && (p.list = o.list), o.named && (p.named = o.named), kt(o.plural) && (p.pluralIndex = o.plural), p;
}
Bm();
/*!
  * vue-i18n v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Mg = window.Vue.createVNode, Ig = window.Vue.Text, wr = window.Vue.computed, Jd = window.Vue.watch, js = window.Vue.getCurrentInstance, Ag = window.Vue.ref, Vg = window.Vue.shallowRef, xh = window.Vue.Fragment, Ws = window.Vue.defineComponent, Ch = window.Vue.h;
window.Vue.effectScope;
const Bg = window.Vue.inject, Lg = window.Vue.onMounted, Dg = window.Vue.onUnmounted;
window.Vue.isRef;
const Ng = "11.1.12";
function Hg() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (xo().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (xo().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (xo().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (xo().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const nr = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: Qm,
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
function qr(e, ...t) {
  return Sa(e, null, void 0);
}
const as = /* @__PURE__ */ Eo("__translateVNode"), ls = /* @__PURE__ */ Eo("__datetimeParts"), ss = /* @__PURE__ */ Eo("__numberParts"), jg = Eo("__setPluralRules"), Sh = /* @__PURE__ */ Eo("__injectWithOption"), ds = /* @__PURE__ */ Eo("__dispose");
function Gr(e) {
  if (!Ke(e) || kn(e))
    return e;
  for (const t in e)
    if (pn(e, t))
      if (!t.includes("."))
        Ke(e[t]) && Gr(e[t]);
      else {
        const n = t.split("."), o = n.length - 1;
        let r = e, i = !1;
        for (let a = 0; a < o; a++) {
          if (n[a] === "__proto__")
            throw new Error(`unsafe key: ${n[a]}`);
          if (n[a] in r || (r[n[a]] = nt()), !Ke(r[n[a]])) {
            i = !0;
            break;
          }
          r = r[n[a]];
        }
        if (i || (kn(r) ? ch.includes(n[o]) || delete e[t] : (r[n[o]] = e[t], delete e[t])), !kn(r)) {
          const a = r[n[o]];
          Ke(a) && Gr(a);
        }
      }
  return e;
}
function $h(e, t) {
  const { messages: n, __i18n: o, messageResolver: r, flatJson: i } = t, a = Ue(n) ? n : bt(o) ? nt() : { [e]: nt() };
  if (bt(o) && o.forEach((l) => {
    if ("locale" in l && "resource" in l) {
      const { locale: s, resource: d } = l;
      s ? (a[s] = a[s] || nt(), ra(d, a[s])) : ra(d, a);
    } else
      xe(l) && ra(JSON.parse(l), a);
  }), r == null && i)
    for (const l in a)
      pn(a, l) && Gr(a[l]);
  return a;
}
function kh(e) {
  return e.type;
}
function Wg(e, t, n) {
  let o = Ke(t.messages) ? t.messages : nt();
  "__i18nGlobal" in n && (o = $h(e.locale.value, {
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
      i.length && i.forEach((a) => {
        e.mergeDateTimeFormat(a, t.datetimeFormats[a]);
      });
    }
    if (Ke(t.numberFormats)) {
      const i = Object.keys(t.numberFormats);
      i.length && i.forEach((a) => {
        e.mergeNumberFormat(a, t.numberFormats[a]);
      });
    }
  }
}
function Qd(e) {
  return Mg(Ig, null, e, 0);
}
const ec = "__INTLIFY_META__", tc = () => [], Ug = () => !1;
let nc = 0;
function oc(e) {
  return (t, n, o, r) => e(n, o, js() || void 0, r);
}
const Kg = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = js();
  let t = null;
  return e && (t = kh(e)[ec]) ? { [ec]: t } : null;
};
function qg(e = {}) {
  const { __root: t, __injectWithOption: n } = e, o = t === void 0, r = e.flatJson, i = Fd ? Ag : Vg;
  let a = gt(e.inheritLocale) ? e.inheritLocale : !0;
  const l = i(
    // prettier-ignore
    t && a ? t.locale.value : xe(e.locale) ? e.locale : ca
  ), s = i(
    // prettier-ignore
    t && a ? t.fallbackLocale.value : xe(e.fallbackLocale) || bt(e.fallbackLocale) || Ue(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : l.value
  ), d = i($h(l.value, e)), c = i(Ue(e.datetimeFormats) ? e.datetimeFormats : { [l.value]: {} }), h = i(Ue(e.numberFormats) ? e.numberFormats : { [l.value]: {} });
  let p = t ? t.missingWarn : gt(e.missingWarn) || da(e.missingWarn) ? e.missingWarn : !0, v = t ? t.fallbackWarn : gt(e.fallbackWarn) || da(e.fallbackWarn) ? e.fallbackWarn : !0, f = t ? t.fallbackRoot : gt(e.fallbackRoot) ? e.fallbackRoot : !0, m = !!e.fallbackFormat, g = ht(e.missing) ? e.missing : null, u = ht(e.missing) ? oc(e.missing) : null, b = ht(e.postTranslation) ? e.postTranslation : null, x = t ? t.warnHtmlMessage : gt(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, w = !!e.escapeParameter;
  const C = t ? t.modifiers : Ue(e.modifiers) ? e.modifiers : {};
  let S = e.pluralRules || t && t.pluralRules, y;
  y = (() => {
    o && jd(null);
    const O = {
      version: Ng,
      locale: l.value,
      fallbackLocale: s.value,
      messages: d.value,
      modifiers: C,
      pluralRules: S,
      missing: u === null ? void 0 : u,
      missingWarn: p,
      fallbackWarn: v,
      fallbackFormat: m,
      unresolving: !0,
      postTranslation: b === null ? void 0 : b,
      warnHtmlMessage: x,
      escapeParameter: w,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    O.datetimeFormats = c.value, O.numberFormats = h.value, O.__datetimeFormatters = Ue(y) ? y.__datetimeFormatters : void 0, O.__numberFormatters = Ue(y) ? y.__numberFormatters : void 0;
    const K = wg(O);
    return o && jd(K), K;
  })(), br(y, l.value, s.value);
  function k() {
    return [
      l.value,
      s.value,
      d.value,
      c.value,
      h.value
    ];
  }
  const E = wr({
    get: () => l.value,
    set: (O) => {
      y.locale = O, l.value = O;
    }
  }), U = wr({
    get: () => s.value,
    set: (O) => {
      y.fallbackLocale = O, s.value = O, br(y, l.value, O);
    }
  }), _ = wr(() => d.value), M = /* @__PURE__ */ wr(() => c.value), I = /* @__PURE__ */ wr(() => h.value);
  function z() {
    return ht(b) ? b : null;
  }
  function G(O) {
    b = O, y.postTranslation = O;
  }
  function L() {
    return g;
  }
  function Z(O) {
    O !== null && (u = oc(O)), g = O, y.missing = u;
  }
  const te = (O, K, ve, Te, lt, pt) => {
    k();
    let Ye;
    try {
      __INTLIFY_PROD_DEVTOOLS__, o || (y.fallbackContext = t ? bg() : void 0), Ye = O(y);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, o || (y.fallbackContext = void 0);
    }
    if (ve !== "translate exists" && // for not `te` (e.g `t`)
    kt(Ye) && Ye === $a || ve === "translate exists" && !Ye) {
      const [Ze, mt] = K();
      return t && f ? Te(t) : lt(Ze);
    } else {
      if (pt(Ye))
        return Ye;
      throw qr(nr.UNEXPECTED_RETURN_TYPE);
    }
  };
  function q(...O) {
    return te((K) => Reflect.apply(Zd, null, [K, ...O]), () => is(...O), "translate", (K) => Reflect.apply(K.t, K, [...O]), (K) => K, (K) => xe(K));
  }
  function A(...O) {
    const [K, ve, Te] = O;
    if (Te && !Ke(Te))
      throw qr(nr.INVALID_ARGUMENT);
    return q(K, ve, Rt({ resolvedMessage: !0 }, Te || {}));
  }
  function F(...O) {
    return te((K) => Reflect.apply(Ud, null, [K, ...O]), () => os(...O), "datetime format", (K) => Reflect.apply(K.d, K, [...O]), () => Nd, (K) => xe(K) || bt(K));
  }
  function j(...O) {
    return te((K) => Reflect.apply(qd, null, [K, ...O]), () => rs(...O), "number format", (K) => Reflect.apply(K.n, K, [...O]), () => Nd, (K) => xe(K) || bt(K));
  }
  function J(O) {
    return O.map((K) => xe(K) || kt(K) || gt(K) ? Qd(String(K)) : K);
  }
  const ee = {
    normalize: J,
    interpolate: (O) => O,
    type: "vnode"
  };
  function de(...O) {
    return te((K) => {
      let ve;
      const Te = K;
      try {
        Te.processor = ee, ve = Reflect.apply(Zd, null, [Te, ...O]);
      } finally {
        Te.processor = null;
      }
      return ve;
    }, () => is(...O), "translate", (K) => K[as](...O), (K) => [Qd(K)], (K) => bt(K));
  }
  function pe(...O) {
    return te((K) => Reflect.apply(qd, null, [K, ...O]), () => rs(...O), "number format", (K) => K[ss](...O), tc, (K) => xe(K) || bt(K));
  }
  function Y(...O) {
    return te((K) => Reflect.apply(Ud, null, [K, ...O]), () => os(...O), "datetime format", (K) => K[ls](...O), tc, (K) => xe(K) || bt(K));
  }
  function se(O) {
    S = O, y.pluralRules = S;
  }
  function $e(O, K) {
    return te(() => {
      if (!O)
        return !1;
      const ve = xe(K) ? K : l.value, Te = Ce(ve), lt = y.messageResolver(Te, O);
      return kn(lt) || on(lt) || xe(lt);
    }, () => [O], "translate exists", (ve) => Reflect.apply(ve.te, ve, [O, K]), Ug, (ve) => gt(ve));
  }
  function me(O) {
    let K = null;
    const ve = uh(y, s.value, l.value);
    for (let Te = 0; Te < ve.length; Te++) {
      const lt = d.value[ve[Te]] || {}, pt = y.messageResolver(lt, O);
      if (pt != null) {
        K = pt;
        break;
      }
    }
    return K;
  }
  function be(O) {
    const K = me(O);
    return K ?? (t ? t.tm(O) || {} : {});
  }
  function Ce(O) {
    return d.value[O] || {};
  }
  function Be(O, K) {
    if (r) {
      const ve = { [O]: K };
      for (const Te in ve)
        pn(ve, Te) && Gr(ve[Te]);
      K = ve[O];
    }
    d.value[O] = K, y.messages = d.value;
  }
  function Me(O, K) {
    d.value[O] = d.value[O] || {};
    const ve = { [O]: K };
    if (r)
      for (const Te in ve)
        pn(ve, Te) && Gr(ve[Te]);
    K = ve[O], ra(K, d.value[O]), y.messages = d.value;
  }
  function ie(O) {
    return c.value[O] || {};
  }
  function R(O, K) {
    c.value[O] = K, y.datetimeFormats = c.value, Kd(y, O, K);
  }
  function $(O, K) {
    c.value[O] = Rt(c.value[O] || {}, K), y.datetimeFormats = c.value, Kd(y, O, K);
  }
  function N(O) {
    return h.value[O] || {};
  }
  function ne(O, K) {
    h.value[O] = K, y.numberFormats = h.value, Gd(y, O, K);
  }
  function ge(O, K) {
    h.value[O] = Rt(h.value[O] || {}, K), y.numberFormats = h.value, Gd(y, O, K);
  }
  nc++, t && Fd && (Jd(t.locale, (O) => {
    a && (l.value = O, y.locale = O, br(y, l.value, s.value));
  }), Jd(t.fallbackLocale, (O) => {
    a && (s.value = O, y.fallbackLocale = O, br(y, l.value, s.value));
  }));
  const he = {
    id: nc,
    locale: E,
    fallbackLocale: U,
    get inheritLocale() {
      return a;
    },
    set inheritLocale(O) {
      a = O, O && t && (l.value = t.locale.value, s.value = t.fallbackLocale.value, br(y, l.value, s.value));
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
    set missingWarn(O) {
      p = O, y.missingWarn = p;
    },
    get fallbackWarn() {
      return v;
    },
    set fallbackWarn(O) {
      v = O, y.fallbackWarn = v;
    },
    get fallbackRoot() {
      return f;
    },
    set fallbackRoot(O) {
      f = O;
    },
    get fallbackFormat() {
      return m;
    },
    set fallbackFormat(O) {
      m = O, y.fallbackFormat = m;
    },
    get warnHtmlMessage() {
      return x;
    },
    set warnHtmlMessage(O) {
      x = O, y.warnHtmlMessage = O;
    },
    get escapeParameter() {
      return w;
    },
    set escapeParameter(O) {
      w = O, y.escapeParameter = O;
    },
    t: q,
    getLocaleMessage: Ce,
    setLocaleMessage: Be,
    mergeLocaleMessage: Me,
    getPostTranslationHandler: z,
    setPostTranslationHandler: G,
    getMissingHandler: L,
    setMissingHandler: Z,
    [jg]: se
  };
  return he.datetimeFormats = M, he.numberFormats = I, he.rt = A, he.te = $e, he.tm = be, he.d = F, he.n = j, he.getDateTimeFormat = ie, he.setDateTimeFormat = R, he.mergeDateTimeFormat = $, he.getNumberFormat = N, he.setNumberFormat = ne, he.mergeNumberFormat = ge, he[Sh] = n, he[as] = de, he[ls] = Y, he[ss] = pe, he;
}
const Us = {
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
function Gg({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((o, r) => [
    ...o,
    // prettier-ignore
    ...r.type === xh ? r.children : [r]
  ], []) : t.reduce((n, o) => {
    const r = e[o];
    return r && (n[o] = r()), n;
  }, nt());
}
function Rh() {
  return xh;
}
Rt({
  keypath: {
    type: String,
    required: !0
  },
  plural: {
    type: [Number, String],
    validator: (e) => kt(e) || !isNaN(e)
  }
}, Us);
function Xg(e) {
  return bt(e) && !xe(e[0]);
}
function Ph(e, t, n, o) {
  const { slots: r, attrs: i } = t;
  return () => {
    const a = { part: !0 };
    let l = nt();
    e.locale && (a.locale = e.locale), xe(e.format) ? a.key = e.format : Ke(e.format) && (xe(e.format.key) && (a.key = e.format.key), l = Object.keys(e.format).reduce((p, v) => n.includes(v) ? Rt(nt(), p, { [v]: e.format[v] }) : p, nt()));
    const s = o(e.value, a, l);
    let d = [a.key];
    bt(s) ? d = s.map((p, v) => {
      const f = r[p.type], m = f ? f({ [p.type]: p.value, index: v, parts: s }) : [p.value];
      return Xg(m) && (m[0].key = `${p.type}-${v}`), m;
    }) : xe(s) && (d = [s]);
    const c = Rt(nt(), i), h = xe(e.tag) || Ke(e.tag) ? e.tag : Rh();
    return Ch(h, c, d);
  };
}
Rt({
  value: {
    type: Number,
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, Us);
const Yg = /* @__PURE__ */ Eo("global-vue-i18n");
function ka(e = {}) {
  const t = js();
  if (t == null)
    throw qr(nr.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw qr(nr.NOT_INSTALLED);
  const n = Zg(t), o = Qg(n), r = kh(t), i = Jg(e, r);
  if (i === "global")
    return Wg(o, e, r), o;
  if (i === "parent") {
    let s = eb(n, t, e.__useComponent);
    return s == null && (s = o), s;
  }
  const a = n;
  let l = a.__getInstance(t);
  if (l == null) {
    const s = Rt({}, e);
    "__i18n" in r && (s.__i18n = r.__i18n), o && (s.__root = o), l = qg(s), a.__composerExtend && (l[ds] = a.__composerExtend(l)), nb(a, t, l), a.__setInstance(t, l);
  }
  return l;
}
function Zg(e) {
  const t = Bg(e.isCE ? Yg : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw qr(e.isCE ? nr.NOT_INSTALLED_WITH_PROVIDE : nr.UNEXPECTED_ERROR);
  return t;
}
function Jg(e, t) {
  return Ca(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function Qg(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function eb(e, t, n = !1) {
  let o = null;
  const r = t.root;
  let i = tb(t, n);
  for (; i != null; ) {
    const a = e;
    if (e.mode === "composition")
      o = a.__getInstance(i);
    else if (__VUE_I18N_LEGACY_API__) {
      const l = a.__getInstance(i);
      l != null && (o = l.__composer, n && o && !o[Sh] && (o = null));
    }
    if (o != null || r === i)
      break;
    i = i.parent;
  }
  return o;
}
function tb(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function nb(e, t, n) {
  Lg(() => {
  }, t), Dg(() => {
    const o = n;
    e.__deleteInstance(t);
    const r = o[ds];
    r && (r(), delete o[ds]);
  }, t);
}
Rt({
  value: {
    type: [Number, Date],
    required: !0
  },
  format: {
    type: [String, Object]
  }
}, Us);
Hg();
hg(Gm);
pg(cg);
vg(uh);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = xo();
  e.__INTLIFY__ = !0, Xm(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
function ob(e) {
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
  function a(f) {
    let m, g;
    return {
      before(u) {
        m = u.bem.b, g = u.bem.els, u.bem.els = null;
      },
      after(u) {
        u.bem.b = m, u.bem.els = g;
      },
      $({ context: u, props: b }) {
        return f = typeof f == "string" ? f : f({ context: u, props: b }), u.bem.b = f, `${(b == null ? void 0 : b.bPrefix) || t}${u.bem.b}`;
      }
    };
  }
  function l(f) {
    let m;
    return {
      before(g) {
        m = g.bem.els;
      },
      after(g) {
        g.bem.els = m;
      },
      $({ context: g, props: u }) {
        return f = typeof f == "string" ? f : f({ context: g, props: u }), g.bem.els = f.split(",").map((b) => b.trim()), g.bem.els.map((b) => `${(u == null ? void 0 : u.bPrefix) || t}${g.bem.b}${n}${b}`).join(", ");
      }
    };
  }
  function s(f) {
    return {
      $({ context: m, props: g }) {
        f = typeof f == "string" ? f : f({ context: m, props: g });
        const u = f.split(",").map((w) => w.trim());
        function b(w) {
          return u.map((C) => `&${(g == null ? void 0 : g.bPrefix) || t}${m.bem.b}${w !== void 0 ? `${n}${w}` : ""}${o}${C}`).join(", ");
        }
        const x = m.bem.els;
        return x !== null ? b(x[0]) : b();
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
    cB: (...f) => r(a(f[0]), f[1], f[2]),
    cE: (...f) => r(l(f[0]), f[1], f[2]),
    cM: (...f) => r(s(f[0]), f[1], f[2]),
    cNotM: (...f) => r(d(f[0]), f[1], f[2])
  }), i;
}
function rb(e) {
  let t = 0;
  for (let n = 0; n < e.length; ++n)
    e[n] === "&" && ++t;
  return t;
}
const _h = /\s*,(?![^(]*\))\s*/g, ib = /\s+/g;
function ab(e, t) {
  const n = [];
  return t.split(_h).forEach((o) => {
    let r = rb(o);
    if (r) {
      if (r === 1) {
        e.forEach((a) => {
          n.push(o.replace("&", a));
        });
        return;
      }
    } else {
      e.forEach((a) => {
        n.push(
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          (a && a + " ") + o
        );
      });
      return;
    }
    let i = [
      o
    ];
    for (; r--; ) {
      const a = [];
      i.forEach((l) => {
        e.forEach((s) => {
          a.push(l.replace("&", s));
        });
      }), i = a;
    }
    i.forEach((a) => n.push(a));
  }), n;
}
function lb(e, t) {
  const n = [];
  return t.split(_h).forEach((o) => {
    e.forEach((r) => {
      n.push((r && r + " ") + o);
    });
  }), n;
}
function sb(e) {
  let t = [""];
  return e.forEach((n) => {
    n = n && n.trim(), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    n && (n.includes("&") ? t = ab(t, n) : t = lb(t, n));
  }), t.join(", ").replace(ib, " ");
}
function rc(e) {
  if (!e)
    return;
  const t = e.parentElement;
  t && t.removeChild(e);
}
function Ra(e, t) {
  return (t ?? document.head).querySelector(`style[cssr-id="${e}"]`);
}
function db(e) {
  const t = document.createElement("style");
  return t.setAttribute("cssr-id", e), t;
}
function vi(e) {
  return e ? /^\s*@(s|m)/.test(e) : !1;
}
const cb = /[A-Z]/g;
function Th(e) {
  return e.replace(cb, (t) => "-" + t.toLowerCase());
}
function ub(e, t = "  ") {
  return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((n) => t + `  ${Th(n[0])}: ${n[1]};`).join(`
`) + `
` + t + "}" : `: ${e};`;
}
function fb(e, t, n) {
  return typeof e == "function" ? e({
    context: t.context,
    props: n
  }) : e;
}
function ic(e, t, n, o) {
  if (!t)
    return "";
  const r = fb(t, n, o);
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
  const a = e ? [
    e + " {"
  ] : [];
  return i.forEach((l) => {
    const s = r[l];
    if (l === "raw") {
      a.push(`
` + s + `
`);
      return;
    }
    l = Th(l), s != null && a.push(`  ${l}${ub(s)}`);
  }), e && a.push("}"), a.join(`
`);
}
function cs(e, t, n) {
  e && e.forEach((o) => {
    if (Array.isArray(o))
      cs(o, t, n);
    else if (typeof o == "function") {
      const r = o(t);
      Array.isArray(r) ? cs(r, t, n) : r && n(r);
    } else o && n(o);
  });
}
function Fh(e, t, n, o, r) {
  const i = e.$;
  let a = "";
  if (!i || typeof i == "string")
    vi(i) ? a = i : t.push(i);
  else if (typeof i == "function") {
    const d = i({
      context: o.context,
      props: r
    });
    vi(d) ? a = d : t.push(d);
  } else if (i.before && i.before(o.context), !i.$ || typeof i.$ == "string")
    vi(i.$) ? a = i.$ : t.push(i.$);
  else if (i.$) {
    const d = i.$({
      context: o.context,
      props: r
    });
    vi(d) ? a = d : t.push(d);
  }
  const l = sb(t), s = ic(l, e.props, o, r);
  a ? n.push(`${a} {`) : s.length && n.push(s), e.children && cs(e.children, {
    context: o.context,
    props: r
  }, (d) => {
    if (typeof d == "string") {
      const c = ic(l, { raw: d }, o, r);
      n.push(c);
    } else
      Fh(d, t, n, o, r);
  }), t.pop(), a && n.push("}"), i && i.after && i.after(o.context);
}
function hb(e, t, n) {
  const o = [];
  return Fh(e, [], o, t, n), o.join(`

`);
}
function us(e) {
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
function pb(e, t, n, o) {
  const { els: r } = t;
  if (n === void 0)
    r.forEach(rc), t.els = [];
  else {
    const i = Ra(n, o);
    i && r.includes(i) && (rc(i), t.els = r.filter((a) => a !== i));
  }
}
function ac(e, t) {
  e.push(t);
}
function vb(e, t, n, o, r, i, a, l, s) {
  let d;
  if (n === void 0 && (d = t.render(o), n = us(d)), s) {
    s.adapter(n, d ?? t.render(o));
    return;
  }
  l === void 0 && (l = document.head);
  const c = Ra(n, l);
  if (c !== null && !i)
    return c;
  const h = c ?? db(n);
  if (d === void 0 && (d = t.render(o)), h.textContent = d, c !== null)
    return c;
  if (a) {
    const p = l.querySelector(`meta[name="${a}"]`);
    if (p)
      return l.insertBefore(h, p), ac(t.els, h), h;
  }
  return r ? l.insertBefore(h, l.querySelector("style, link")) : l.appendChild(h), ac(t.els, h), h;
}
function mb(e) {
  return hb(this, this.instance, e);
}
function gb(e = {}) {
  const { id: t, ssr: n, props: o, head: r = !1, force: i = !1, anchorMetaName: a, parent: l } = e;
  return vb(this.instance, this, t, o, r, i, a, l, n);
}
function bb(e = {}) {
  const { id: t, parent: n } = e;
  pb(this.instance, this, t, n);
}
const mi = function(e, t, n, o) {
  return {
    instance: e,
    $: t,
    props: n,
    children: o,
    els: [],
    render: mb,
    mount: gb,
    unmount: bb
  };
}, wb = function(e, t, n, o) {
  return Array.isArray(t) ? mi(e, { $: null }, null, t) : Array.isArray(n) ? mi(e, t, null, n) : Array.isArray(o) ? mi(e, t, n, o) : mi(e, t, n, null);
};
function Eh(e = {}) {
  const t = {
    c: (...n) => wb(t, ...n),
    use: (n, ...o) => n.install(t, ...o),
    find: Ra,
    context: {},
    config: e
  };
  return t;
}
function yb(e, t) {
  if (e === void 0)
    return !1;
  if (t) {
    const { context: { ids: n } } = t;
    return n.has(e);
  }
  return Ra(e) !== null;
}
const xb = "n", Xr = `.${xb}-`, Cb = "__", Sb = "--", Oh = Eh(), zh = ob({
  blockPrefix: Xr,
  elementPrefix: Cb,
  modifierPrefix: Sb
});
Oh.use(zh);
const {
  c: W,
  find: $z
} = Oh, {
  cB: V,
  cE: D,
  cM: X,
  cNotM: Qe
} = zh;
function Ks(e) {
  return W(({
    props: {
      bPrefix: t
    }
  }) => `${t || Xr}modal, ${t || Xr}drawer`, [e]);
}
function qs(e) {
  return W(({
    props: {
      bPrefix: t
    }
  }) => `${t || Xr}popover`, [e]);
}
function $b(e) {
  return W(({
    props: {
      bPrefix: t
    }
  }) => `&${t || Xr}modal`, e);
}
const kb = (...e) => W(">", [V(...e)]);
function ae(e, t) {
  return e + (t === "default" ? "" : t.replace(/^[a-z]/, (n) => n.toUpperCase()));
}
let ua = [];
const Mh = /* @__PURE__ */ new WeakMap();
function Rb() {
  ua.forEach((e) => e(...Mh.get(e))), ua = [];
}
function Yr(e, ...t) {
  Mh.set(e, t), !ua.includes(e) && ua.push(e) === 1 && requestAnimationFrame(Rb);
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
function Zr(e) {
  return e.composedPath()[0] || null;
}
function Pb(e) {
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
  const o = Pb(e);
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
    return Object.keys(o).forEach((a) => {
      const l = Number(a);
      !Number.isNaN(l) && t >= l && l >= i && (i = l, r = o[a]);
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
function _b(e, t) {
  const [n, o] = e.split(" ");
  return {
    row: n,
    col: o || n
  };
}
const lc = {
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
function Tb(e, t, n) {
  t /= 100, n /= 100;
  let o = (r, i = (r + e / 60) % 6) => n - n * t * Math.max(Math.min(i, 4 - i, 1), 0);
  return [o(5) * 255, o(3) * 255, o(1) * 255];
}
function Fb(e, t, n) {
  t /= 100, n /= 100;
  let o = t * Math.min(n, 1 - n), r = (i, a = (i + e / 30) % 12) => n - o * Math.max(Math.min(a - 3, 9 - a, 1), -1);
  return [r(0) * 255, r(8) * 255, r(4) * 255];
}
const _n = "^\\s*", Tn = "\\s*$", ao = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))%\\s*", Zt = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", Co = "([0-9A-Fa-f])", So = "([0-9A-Fa-f]{2})", Ih = new RegExp(`${_n}hsl\\s*\\(${Zt},${ao},${ao}\\)${Tn}`), Ah = new RegExp(`${_n}hsv\\s*\\(${Zt},${ao},${ao}\\)${Tn}`), Vh = new RegExp(`${_n}hsla\\s*\\(${Zt},${ao},${ao},${Zt}\\)${Tn}`), Bh = new RegExp(`${_n}hsva\\s*\\(${Zt},${ao},${ao},${Zt}\\)${Tn}`), Eb = new RegExp(`${_n}rgb\\s*\\(${Zt},${Zt},${Zt}\\)${Tn}`), Ob = new RegExp(`${_n}rgba\\s*\\(${Zt},${Zt},${Zt},${Zt}\\)${Tn}`), zb = new RegExp(`${_n}#${Co}${Co}${Co}${Tn}`), Mb = new RegExp(`${_n}#${So}${So}${So}${Tn}`), Ib = new RegExp(`${_n}#${Co}${Co}${Co}${Co}${Tn}`), Ab = new RegExp(`${_n}#${So}${So}${So}${So}${Tn}`);
function Wt(e) {
  return parseInt(e, 16);
}
function Vb(e) {
  try {
    let t;
    if (t = Vh.exec(e))
      return [
        fa(t[1]),
        ro(t[5]),
        ro(t[9]),
        Ro(t[13])
      ];
    if (t = Ih.exec(e))
      return [fa(t[1]), ro(t[5]), ro(t[9]), 1];
    throw new Error(`[seemly/hsla]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function Bb(e) {
  try {
    let t;
    if (t = Bh.exec(e))
      return [
        fa(t[1]),
        ro(t[5]),
        ro(t[9]),
        Ro(t[13])
      ];
    if (t = Ah.exec(e))
      return [fa(t[1]), ro(t[5]), ro(t[9]), 1];
    throw new Error(`[seemly/hsva]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function lo(e) {
  try {
    let t;
    if (t = Mb.exec(e))
      return [Wt(t[1]), Wt(t[2]), Wt(t[3]), 1];
    if (t = Eb.exec(e))
      return [Et(t[1]), Et(t[5]), Et(t[9]), 1];
    if (t = Ob.exec(e))
      return [
        Et(t[1]),
        Et(t[5]),
        Et(t[9]),
        Ro(t[13])
      ];
    if (t = zb.exec(e))
      return [
        Wt(t[1] + t[1]),
        Wt(t[2] + t[2]),
        Wt(t[3] + t[3]),
        1
      ];
    if (t = Ab.exec(e))
      return [
        Wt(t[1]),
        Wt(t[2]),
        Wt(t[3]),
        Ro(Wt(t[4]) / 255)
      ];
    if (t = Ib.exec(e))
      return [
        Wt(t[1] + t[1]),
        Wt(t[2] + t[2]),
        Wt(t[3] + t[3]),
        Ro(Wt(t[4] + t[4]) / 255)
      ];
    if (e in lc)
      return lo(lc[e]);
    if (Ih.test(e) || Vh.test(e)) {
      const [n, o, r, i] = Vb(e);
      return [...Fb(n, o, r), i];
    } else if (Ah.test(e) || Bh.test(e)) {
      const [n, o, r, i] = Bb(e);
      return [...Tb(n, o, r), i];
    }
    throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function Lb(e) {
  return e > 1 ? 1 : e < 0 ? 0 : e;
}
function fs(e, t, n, o) {
  return `rgba(${Et(e)}, ${Et(t)}, ${Et(n)}, ${Lb(o)})`;
}
function Xa(e, t, n, o, r) {
  return Et((e * t * (1 - o) + n * o) / r);
}
function je(e, t) {
  Array.isArray(e) || (e = lo(e)), Array.isArray(t) || (t = lo(t));
  const n = e[3], o = t[3], r = Ro(n + o - n * o);
  return fs(Xa(e[0], n, t[0], o, r), Xa(e[1], n, t[1], o, r), Xa(e[2], n, t[2], o, r), r);
}
function Ee(e, t) {
  const [n, o, r, i = 1] = Array.isArray(e) ? e : lo(e);
  return typeof t.alpha == "number" ? fs(n, o, r, t.alpha) : fs(n, o, r, i);
}
function gi(e, t) {
  const [n, o, r, i = 1] = Array.isArray(e) ? e : lo(e), { lightness: a = 1, alpha: l = 1 } = t;
  return Db([n * a, o * a, r * a, i * l]);
}
function Ro(e) {
  const t = Math.round(Number(e) * 100) / 100;
  return t > 1 ? 1 : t < 0 ? 0 : t;
}
function fa(e) {
  const t = Math.round(Number(e));
  return t >= 360 || t < 0 ? 0 : t;
}
function Et(e) {
  const t = Math.round(Number(e));
  return t > 255 ? 255 : t < 0 ? 0 : t;
}
function ro(e) {
  const t = Math.round(Number(e));
  return t > 100 ? 100 : t < 0 ? 0 : t;
}
function Db(e) {
  const [t, n, o] = e;
  return 3 in e ? `rgba(${Et(t)}, ${Et(n)}, ${Et(o)}, ${Ro(e[3])})` : `rgba(${Et(t)}, ${Et(n)}, ${Et(o)}, 1)`;
}
function Jr(e = 8) {
  return Math.random().toString(16).slice(2, 2 + e);
}
function Nb(e, t) {
  const n = [];
  for (let o = 0; o < e; ++o)
    n.push(t);
  return n;
}
function ia(e) {
  return e.composedPath()[0];
}
const Hb = {
  mousemoveoutside: /* @__PURE__ */ new WeakMap(),
  clickoutside: /* @__PURE__ */ new WeakMap()
};
function jb(e, t, n) {
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
    const r = (a) => {
      o = !t.contains(ia(a));
    }, i = (a) => {
      o && (t.contains(ia(a)) || n(a));
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
function Lh(e, t, n) {
  const o = Hb[e];
  let r = o.get(t);
  r === void 0 && o.set(t, r = /* @__PURE__ */ new WeakMap());
  let i = r.get(n);
  return i === void 0 && r.set(n, i = jb(e, t, n)), i;
}
function Wb(e, t, n, o) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const r = Lh(e, t, n);
    return Object.keys(r).forEach((i) => {
      at(i, document, r[i], o);
    }), !0;
  }
  return !1;
}
function Ub(e, t, n, o) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const r = Lh(e, t, n);
    return Object.keys(r).forEach((i) => {
      Je(i, document, r[i], o);
    }), !0;
  }
  return !1;
}
function Kb() {
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
  function r(y, T, k) {
    const E = y[T];
    return y[T] = function() {
      return k.apply(y, arguments), E.apply(y, arguments);
    }, y;
  }
  function i(y, T) {
    y[T] = Event.prototype[T];
  }
  const a = /* @__PURE__ */ new WeakMap(), l = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
  function s() {
    var y;
    return (y = a.get(this)) !== null && y !== void 0 ? y : null;
  }
  function d(y, T) {
    l !== void 0 && Object.defineProperty(y, "currentTarget", {
      configurable: !0,
      enumerable: !0,
      get: T ?? l.get
    });
  }
  const c = {
    bubble: {},
    capture: {}
  }, h = {};
  function p() {
    const y = function(T) {
      const { type: k, eventPhase: E, bubbles: U } = T, _ = ia(T);
      if (E === 2)
        return;
      const M = E === 1 ? "capture" : "bubble";
      let I = _;
      const z = [];
      for (; I === null && (I = window), z.push(I), I !== window; )
        I = I.parentNode || null;
      const G = c.capture[k], L = c.bubble[k];
      if (r(T, "stopPropagation", n), r(T, "stopImmediatePropagation", o), d(T, s), M === "capture") {
        if (G === void 0)
          return;
        for (let Z = z.length - 1; Z >= 0 && !e.has(T); --Z) {
          const te = z[Z], q = G.get(te);
          if (q !== void 0) {
            a.set(T, te);
            for (const A of q) {
              if (t.has(T))
                break;
              A(T);
            }
          }
          if (Z === 0 && !U && L !== void 0) {
            const A = L.get(te);
            if (A !== void 0)
              for (const F of A) {
                if (t.has(T))
                  break;
                F(T);
              }
          }
        }
      } else if (M === "bubble") {
        if (L === void 0)
          return;
        for (let Z = 0; Z < z.length && !e.has(T); ++Z) {
          const te = z[Z], q = L.get(te);
          if (q !== void 0) {
            a.set(T, te);
            for (const A of q) {
              if (t.has(T))
                break;
              A(T);
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
      const { type: k, eventPhase: E } = T;
      if (E !== 2)
        return;
      const U = h[k];
      U !== void 0 && U.forEach((_) => _(T));
    };
    return y.displayName = "evtdUnifiedWindowEventHandler", y;
  }
  const f = p(), m = v();
  function g(y, T) {
    const k = c[y];
    return k[T] === void 0 && (k[T] = /* @__PURE__ */ new Map(), window.addEventListener(T, f, y === "capture")), k[T];
  }
  function u(y) {
    return h[y] === void 0 && (h[y] = /* @__PURE__ */ new Set(), window.addEventListener(y, m)), h[y];
  }
  function b(y, T) {
    let k = y.get(T);
    return k === void 0 && y.set(T, k = /* @__PURE__ */ new Set()), k;
  }
  function x(y, T, k, E) {
    const U = c[T][k];
    if (U !== void 0) {
      const _ = U.get(y);
      if (_ !== void 0 && _.has(E))
        return !0;
    }
    return !1;
  }
  function w(y, T) {
    const k = h[y];
    return !!(k !== void 0 && k.has(T));
  }
  function C(y, T, k, E) {
    let U;
    if (typeof E == "object" && E.once === !0 ? U = (G) => {
      S(y, T, U, E), k(G);
    } : U = k, Wb(y, T, U, E))
      return;
    const M = E === !0 || typeof E == "object" && E.capture === !0 ? "capture" : "bubble", I = g(M, y), z = b(I, T);
    if (z.has(U) || z.add(U), T === window) {
      const G = u(y);
      G.has(U) || G.add(U);
    }
  }
  function S(y, T, k, E) {
    if (Ub(y, T, k, E))
      return;
    const _ = E === !0 || typeof E == "object" && E.capture === !0, M = _ ? "capture" : "bubble", I = g(M, y), z = b(I, T);
    if (T === window && !x(T, _ ? "bubble" : "capture", y, k) && w(y, k)) {
      const L = h[y];
      L.delete(k), L.size === 0 && (window.removeEventListener(y, m), h[y] = void 0);
    }
    z.has(k) && z.delete(k), z.size === 0 && I.delete(T), I.size === 0 && (window.removeEventListener(y, f, M === "capture"), c[M][y] = void 0);
  }
  return {
    on: C,
    off: S
  };
}
const { on: at, off: Je } = Kb(), qb = window.Vue.ref, sc = window.Vue.readonly, Gb = window.Vue.watch;
function Xb(e) {
  const t = qb(!!e.value);
  if (t.value)
    return sc(t);
  const n = Gb(e, (o) => {
    o && (t.value = !0, n());
  });
  return sc(t);
}
const Yb = window.Vue.computed, Zb = window.Vue.ref, Jb = window.Vue.watch;
function ze(e) {
  const t = Yb(e), n = Zb(t.value);
  return Jb(t, (o) => {
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
const Qb = window.Vue.getCurrentInstance;
function ew() {
  return Qb() !== null;
}
const Dh = typeof window < "u", tw = window.Vue.onMounted, nw = window.Vue.onBeforeUnmount;
let Jo, Br;
const ow = () => {
  var e, t;
  Jo = Dh ? (t = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || t === void 0 ? void 0 : t.ready : void 0, Br = !1, Jo !== void 0 ? Jo.then(() => {
    Br = !0;
  }) : Br = !0;
};
ow();
function rw(e) {
  if (Br)
    return;
  let t = !1;
  tw(() => {
    Br || Jo == null || Jo.then(() => {
      t || e();
    });
  }), nw(() => {
    t = !0;
  });
}
const iw = window.Vue.watch, aw = window.Vue.computed;
function Ot(e, t) {
  return iw(e, (n) => {
    n !== void 0 && (t.value = n);
  }), aw(() => e.value === void 0 ? t.value : e.value);
}
const lw = window.Vue.ref, sw = window.Vue.onMounted, dw = window.Vue.readonly;
function Pa() {
  const e = lw(!1);
  return sw(() => {
    e.value = !0;
  }), dw(e);
}
const cw = window.Vue.computed;
function Nh(e, t) {
  return cw(() => {
    for (const n of t)
      if (e[n] !== void 0)
        return e[n];
    return e[t[t.length - 1]];
  });
}
const uw = (typeof window > "u" ? !1 : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
!window.MSStream;
function fw() {
  return uw;
}
const hw = window.Vue.ref, Ya = window.Vue.computed, pw = window.Vue.onBeforeUnmount, vw = {
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
function mw(e) {
  return `(min-width: ${e}px)`;
}
const yr = {};
function gw(e = vw) {
  if (!Dh)
    return Ya(() => []);
  if (typeof window.matchMedia != "function")
    return Ya(() => []);
  const t = hw({}), n = Object.keys(e), o = (r, i) => {
    r.matches ? t.value[i] = !0 : t.value[i] = !1;
  };
  return n.forEach((r) => {
    const i = e[r];
    let a, l;
    yr[i] === void 0 ? (a = window.matchMedia(mw(i)), a.addEventListener ? a.addEventListener("change", (s) => {
      l.forEach((d) => {
        d(s, r);
      });
    }) : a.addListener && a.addListener((s) => {
      l.forEach((d) => {
        d(s, r);
      });
    }), l = /* @__PURE__ */ new Set(), yr[i] = {
      mql: a,
      cbs: l
    }) : (a = yr[i].mql, l = yr[i].cbs), l.add(o), a.matches && l.forEach((s) => {
      s(a, r);
    });
  }), pw(() => {
    n.forEach((r) => {
      const { cbs: i } = yr[e[r]];
      i.has(o) && i.delete(o);
    });
  }), Ya(() => {
    const { value: r } = t;
    return n.filter((i) => r[i]);
  });
}
const bw = window.Vue.onBeforeMount, ww = window.Vue.onBeforeUnmount, yw = window.Vue.reactive, xw = window.Vue.readonly, Cw = window.Vue.watch;
function Sw(e = {}, t) {
  const n = yw({
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
  }, a = (s) => {
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
  }, l = () => {
    (t === void 0 || t.value) && (at("keydown", document, i), at("keyup", document, a)), t !== void 0 && Cw(t, (s) => {
      s ? (at("keydown", document, i), at("keyup", document, a)) : (Je("keydown", document, i), Je("keyup", document, a));
    });
  };
  return ew() ? (bw(l), ww(() => {
    (t === void 0 || t.value) && (Je("keydown", document, i), Je("keyup", document, a));
  })) : l(), xw(n);
}
const Gs = "n-internal-select-menu", Hh = "n-internal-select-menu-body", Xs = "n-drawer-body", Ys = "n-modal-body", _a = "n-popover-body", bi = window.Vue.inject, $w = window.Vue.onBeforeUnmount, kw = window.Vue.onMounted, Rw = window.Vue.ref, jh = "__disabled__";
function Pn(e) {
  const t = bi(Ys, null), n = bi(Xs, null), o = bi(_a, null), r = bi(Hh, null), i = Rw();
  if (typeof document < "u") {
    i.value = document.fullscreenElement;
    const a = () => {
      i.value = document.fullscreenElement;
    };
    kw(() => {
      at("fullscreenchange", document, a);
    }), $w(() => {
      Je("fullscreenchange", document, a);
    });
  }
  return ze(() => {
    var a;
    const {
      to: l
    } = e;
    return l !== void 0 ? l === !1 ? jh : l === !0 ? i.value || "body" : l : t != null && t.value ? (a = t.value.$el) !== null && a !== void 0 ? a : t.value : n != null && n.value ? n.value : o != null && o.value ? o.value : r != null && r.value ? r.value : l ?? (i.value || "body");
  });
}
Pn.tdkey = jh;
Pn.propTo = {
  type: [String, Object, Boolean],
  default: void 0
};
const Pw = window.Vue.getCurrentInstance, _w = window.Vue.inject, Tw = window.Vue.onBeforeUnmount;
window.Vue.onMounted;
const Fw = window.Vue.watch;
function Ew(e, t, n) {
  var o;
  const r = _w(e, null);
  if (r === null) return;
  const i = (o = Pw()) === null || o === void 0 ? void 0 : o.proxy;
  Fw(n, a), a(n.value), Tw(() => {
    a(void 0, n.value);
  });
  function a(d, c) {
    if (!r) return;
    const h = r[t];
    c !== void 0 && l(h, c), d !== void 0 && s(h, d);
  }
  function l(d, c) {
    d[c] || (d[c] = []), d[c].splice(d[c].findIndex((h) => h === i), 1);
  }
  function s(d, c) {
    d[c] || (d[c] = []), ~d[c].findIndex((h) => h === i) || d[c].push(i);
  }
}
const Ow = window.Vue.ref, zw = window.Vue.watch;
function Mw(e, t, n) {
  const o = Ow(e.value);
  let r = null;
  return zw(e, (i) => {
    r !== null && window.clearTimeout(r), i === !0 ? n && !n.value ? o.value = !0 : r = window.setTimeout(() => {
      o.value = !0;
    }, t) : o.value = !1;
  }), o;
}
const lr = typeof document < "u" && typeof window < "u", Iw = window.Vue.onActivated, Aw = window.Vue.onDeactivated;
function Vw(e) {
  const t = {
    isDeactivated: !1
  };
  let n = !1;
  return Iw(() => {
    if (t.isDeactivated = !1, !n) {
      n = !0;
      return;
    }
    e();
  }), Aw(() => {
    t.isDeactivated = !0, n || (n = !0);
  }), t;
}
const Bw = window.Vue.Fragment, Lw = window.Vue.createTextVNode, Dw = window.Vue.Comment;
function hs(e, t, n = "default") {
  const o = t[n];
  if (o === void 0)
    throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  return o();
}
function ps(e, t = !0, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(Lw(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        ps(o, t, n);
        return;
      }
      if (o.type === Bw) {
        if (o.children === null)
          return;
        Array.isArray(o.children) && ps(o.children, t, n);
      } else o.type !== Dw && n.push(o);
    }
  }), n;
}
function dc(e, t, n = "default") {
  const o = t[n];
  if (o === void 0)
    throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  const r = ps(o());
  if (r.length === 1)
    return r[0];
  throw new Error(`[vueuc/${e}]: slot[${n}] should have exactly one child.`);
}
let Gn = null;
function Wh() {
  if (Gn === null && (Gn = document.getElementById("v-binder-view-measurer"), Gn === null)) {
    Gn = document.createElement("div"), Gn.id = "v-binder-view-measurer";
    const { style: e } = Gn;
    e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(Gn);
  }
  return Gn.getBoundingClientRect();
}
function Nw(e, t) {
  const n = Wh();
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
  const t = e.getBoundingClientRect(), n = Wh();
  return {
    left: t.left - n.left,
    top: t.top - n.top,
    bottom: n.height + n.top - t.bottom,
    right: n.width + n.left - t.right,
    width: t.width,
    height: t.height
  };
}
function Hw(e) {
  return e.nodeType === 9 ? null : e.parentNode;
}
function Uh(e) {
  if (e === null)
    return null;
  const t = Hw(e);
  if (t === null)
    return null;
  if (t.nodeType === 9)
    return document;
  if (t.nodeType === 1) {
    const { overflow: n, overflowX: o, overflowY: r } = getComputedStyle(t);
    if (/(auto|scroll|overlay)/.test(n + r + o))
      return t;
  }
  return Uh(t);
}
const jw = window.Vue.defineComponent, Ww = window.Vue.provide, Uw = window.Vue.ref, Kw = window.Vue.inject, qw = window.Vue.getCurrentInstance, Gw = window.Vue.onBeforeUnmount, Zs = jw({
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
    Ww("VBinder", (t = qw()) === null || t === void 0 ? void 0 : t.proxy);
    const n = Kw("VBinder", null), o = Uw(null), r = (u) => {
      o.value = u, n && e.syncTargetWithParent && n.setTargetRef(u);
    };
    let i = [];
    const a = () => {
      let u = o.value;
      for (; u = Uh(u), u !== null; )
        i.push(u);
      for (const b of i)
        at("scroll", b, h, !0);
    }, l = () => {
      for (const u of i)
        Je("scroll", u, h, !0);
      i = [];
    }, s = /* @__PURE__ */ new Set(), d = (u) => {
      s.size === 0 && a(), s.has(u) || s.add(u);
    }, c = (u) => {
      s.has(u) && s.delete(u), s.size === 0 && l();
    }, h = () => {
      Yr(p);
    }, p = () => {
      s.forEach((u) => u());
    }, v = /* @__PURE__ */ new Set(), f = (u) => {
      v.size === 0 && at("resize", window, g), v.has(u) || v.add(u);
    }, m = (u) => {
      v.has(u) && v.delete(u), v.size === 0 && Je("resize", window, g);
    }, g = () => {
      v.forEach((u) => u());
    };
    return Gw(() => {
      Je("resize", window, g), l();
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
    return hs("binder", this.$slots);
  }
}), Xw = window.Vue.defineComponent, Yw = window.Vue.inject, Zw = window.Vue.withDirectives, Js = Xw({
  name: "Target",
  setup() {
    const { setTargetRef: e, syncTarget: t } = Yw("VBinder");
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
    return e ? Zw(dc("follower", this.$slots), [
      [t]
    ]) : dc("follower", this.$slots);
  }
}), Lo = "@@mmoContext", Jw = {
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
function Qw(e, t) {
  console.error(`[vdirs/${e}]: ${t}`);
}
class e0 {
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
    o.has(t) ? o.delete(t) : n === void 0 && Qw("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
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
const Ja = new e0(), No = "@@ziContext", Kh = {
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
}, t0 = window.Vue.inject, n0 = "@css-render/vue3-ssr";
function o0(e, t) {
  return `<style cssr-id="${e}">
${t}
</style>`;
}
function r0(e, t, n) {
  const { styles: o, ids: r } = n;
  r.has(e) || o !== null && (r.add(e), o.push(o0(e, t)));
}
const i0 = typeof document < "u";
function Oo() {
  if (i0)
    return;
  const e = t0(n0, null);
  if (e !== null)
    return {
      adapter: (t, n) => r0(t, n, e),
      context: e
    };
}
function cc(e, t) {
  console.error(`[vueuc/${e}]: ${t}`);
}
const { c: io } = Eh(), Qs = "vueuc-style";
function uc(e) {
  return e & -e;
}
class qh {
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
      r[t] += n, t += uc(t);
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
      i += n[t], t -= uc(t);
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
function fc(e) {
  return typeof e == "string" ? document.querySelector(e) : e() || null;
}
const a0 = window.Vue.Teleport, l0 = window.Vue.h, s0 = window.Vue.toRef, d0 = window.Vue.computed, c0 = window.Vue.defineComponent, u0 = c0({
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
      showTeleport: Xb(s0(e, "show")),
      mergedTo: d0(() => {
        const { to: t } = e;
        return t ?? "body";
      })
    };
  },
  render() {
    return this.showTeleport ? this.disabled ? hs("lazy-teleport", this.$slots) : l0(a0, {
      disabled: this.disabled,
      to: this.mergedTo
    }, hs("lazy-teleport", this.$slots)) : null;
  }
}), wi = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, hc = {
  start: "end",
  center: "center",
  end: "start"
}, Qa = {
  top: "height",
  bottom: "height",
  left: "width",
  right: "width"
}, f0 = {
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
}, h0 = {
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
}, p0 = {
  "bottom-start": "right",
  "bottom-end": "left",
  "top-start": "right",
  "top-end": "left",
  "right-start": "bottom",
  "right-end": "top",
  "left-start": "bottom",
  "left-end": "top"
}, pc = {
  top: !0,
  // top++
  bottom: !1,
  // top--
  left: !0,
  // left++
  right: !1
  // left--
}, vc = {
  top: "end",
  bottom: "start",
  left: "end",
  right: "start"
};
function v0(e, t, n, o, r, i) {
  if (!r || i)
    return { placement: e, top: 0, left: 0 };
  const [a, l] = e.split("-");
  let s = l ?? "center", d = {
    top: 0,
    left: 0
  };
  const c = (v, f, m) => {
    let g = 0, u = 0;
    const b = n[v] - t[f] - t[v];
    return b > 0 && o && (m ? u = pc[f] ? b : -b : g = pc[f] ? b : -b), {
      left: g,
      top: u
    };
  }, h = a === "left" || a === "right";
  if (s !== "center") {
    const v = p0[e], f = wi[v], m = Qa[v];
    if (n[m] > t[m]) {
      if (
        // current space is not enough
        // ----------[ target ]---------|
        // -------[     follower        ]
        t[v] + t[m] < n[m]
      ) {
        const g = (n[m] - t[m]) / 2;
        t[v] < g || t[f] < g ? t[v] < t[f] ? (s = hc[l], d = c(m, f, h)) : d = c(m, v, h) : s = "center";
      }
    } else n[m] < t[m] && t[f] < 0 && // opposite align has larger space
    // ------------[   target   ]
    // ----------------[follower]
    t[v] > t[f] && (s = hc[l]);
  } else {
    const v = a === "bottom" || a === "top" ? "left" : "top", f = wi[v], m = Qa[v], g = (n[m] - t[m]) / 2;
    // center is not enough
    // ----------- [ target ]--|
    // -------[     follower     ]
    (t[v] < g || t[f] < g) && (t[v] > t[f] ? (s = vc[v], d = c(m, v, h)) : (s = vc[f], d = c(m, f, h)));
  }
  let p = a;
  return (
    // space is not enough
    t[a] < n[Qa[a]] && // opposite position's space is larger
    t[a] < t[wi[a]] && (p = wi[a]), {
      placement: s !== "center" ? `${p}-${s}` : p,
      left: d.left,
      top: d.top
    }
  );
}
function m0(e, t) {
  return t ? h0[e] : f0[e];
}
function g0(e, t, n, o, r, i) {
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
const el = window.Vue.h, b0 = window.Vue.defineComponent, w0 = window.Vue.inject, y0 = window.Vue.nextTick, yi = window.Vue.watch, tl = window.Vue.toRef, mc = window.Vue.ref, x0 = window.Vue.onMounted, C0 = window.Vue.onBeforeUnmount, S0 = window.Vue.withDirectives, $0 = io([
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
]), ed = b0({
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
    const t = w0("VBinder"), n = ze(() => e.enabled !== void 0 ? e.enabled : e.show), o = mc(null), r = mc(null), i = () => {
      const { syncTrigger: p } = e;
      p.includes("scroll") && t.addScrollListener(s), p.includes("resize") && t.addResizeListener(s);
    }, a = () => {
      t.removeScrollListener(s), t.removeResizeListener(s);
    };
    x0(() => {
      n.value && (s(), i());
    });
    const l = Oo();
    $0.mount({
      id: "vueuc/binder",
      head: !0,
      anchorMetaName: Qs,
      ssr: l
    }), C0(() => {
      a();
    }), rw(() => {
      n.value && s();
    });
    const s = () => {
      if (!n.value)
        return;
      const p = o.value;
      if (p === null)
        return;
      const v = t.targetRef, { x: f, y: m, overlap: g } = e, u = f !== void 0 && m !== void 0 ? Nw(f, m) : Za(v);
      p.style.setProperty("--v-target-width", `${Math.round(u.width)}px`), p.style.setProperty("--v-target-height", `${Math.round(u.height)}px`);
      const { width: b, minWidth: x, placement: w, internalShift: C, flip: S } = e;
      p.setAttribute("v-placement", w), g ? p.setAttribute("v-overlap", "") : p.removeAttribute("v-overlap");
      const { style: y } = p;
      b === "target" ? y.width = `${u.width}px` : b !== void 0 ? y.width = b : y.width = "", x === "target" ? y.minWidth = `${u.width}px` : x !== void 0 ? y.minWidth = x : y.minWidth = "";
      const T = Za(p), k = Za(r.value), { left: E, top: U, placement: _ } = v0(w, u, T, C, S, g), M = m0(_, g), { left: I, top: z, transform: G } = g0(_, k, u, U, E, g);
      p.setAttribute("v-placement", _), p.style.setProperty("--v-offset-left", `${Math.round(E)}px`), p.style.setProperty("--v-offset-top", `${Math.round(U)}px`), p.style.transform = `translateX(${I}) translateY(${z}) ${G}`, p.style.setProperty("--v-transform-origin", M), p.style.transformOrigin = M;
    };
    yi(n, (p) => {
      p ? (i(), d()) : a();
    });
    const d = () => {
      y0().then(s).catch((p) => console.error(p));
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
      yi(tl(e, p), s);
    }), ["teleportDisabled"].forEach((p) => {
      yi(tl(e, p), d);
    }), yi(tl(e, "syncTrigger"), (p) => {
      p.includes("resize") ? t.addResizeListener(s) : t.removeResizeListener(s), p.includes("scroll") ? t.addScrollListener(s) : t.removeScrollListener(s);
    });
    const c = Pa(), h = ze(() => {
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
    return el(u0, {
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
        return this.zindexable ? S0(n, [
          [
            Kh,
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
var Po = [], k0 = function() {
  return Po.some(function(e) {
    return e.activeTargets.length > 0;
  });
}, R0 = function() {
  return Po.some(function(e) {
    return e.skippedTargets.length > 0;
  });
}, gc = "ResizeObserver loop completed with undelivered notifications.", P0 = function() {
  var e;
  typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
    message: gc
  }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = gc), window.dispatchEvent(e);
}, Qr;
(function(e) {
  e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
})(Qr || (Qr = {}));
var _o = function(e) {
  return Object.freeze(e);
}, _0 = /* @__PURE__ */ function() {
  function e(t, n) {
    this.inlineSize = t, this.blockSize = n, _o(this);
  }
  return e;
}(), Gh = function() {
  function e(t, n, o, r) {
    return this.x = t, this.y = n, this.width = o, this.height = r, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, _o(this);
  }
  return e.prototype.toJSON = function() {
    var t = this, n = t.x, o = t.y, r = t.top, i = t.right, a = t.bottom, l = t.left, s = t.width, d = t.height;
    return { x: n, y: o, top: r, right: i, bottom: a, left: l, width: s, height: d };
  }, e.fromRect = function(t) {
    return new e(t.x, t.y, t.width, t.height);
  }, e;
}(), td = function(e) {
  return e instanceof SVGElement && "getBBox" in e;
}, Xh = function(e) {
  if (td(e)) {
    var t = e.getBBox(), n = t.width, o = t.height;
    return !n && !o;
  }
  var r = e, i = r.offsetWidth, a = r.offsetHeight;
  return !(i || a || e.getClientRects().length);
}, bc = function(e) {
  var t;
  if (e instanceof Element)
    return !0;
  var n = (t = e == null ? void 0 : e.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
  return !!(n && e instanceof n.Element);
}, T0 = function(e) {
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
}, Lr = typeof window < "u" ? window : {}, xi = /* @__PURE__ */ new WeakMap(), wc = /auto|scroll/, F0 = /^tb|vertical/, E0 = /msie|trident/i.test(Lr.navigator && Lr.navigator.userAgent), wn = function(e) {
  return parseFloat(e || "0");
}, Qo = function(e, t, n) {
  return e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = !1), new _0((n ? t : e) || 0, (n ? e : t) || 0);
}, yc = _o({
  devicePixelContentBoxSize: Qo(),
  borderBoxSize: Qo(),
  contentBoxSize: Qo(),
  contentRect: new Gh(0, 0, 0, 0)
}), Yh = function(e, t) {
  if (t === void 0 && (t = !1), xi.has(e) && !t)
    return xi.get(e);
  if (Xh(e))
    return xi.set(e, yc), yc;
  var n = getComputedStyle(e), o = td(e) && e.ownerSVGElement && e.getBBox(), r = !E0 && n.boxSizing === "border-box", i = F0.test(n.writingMode || ""), a = !o && wc.test(n.overflowY || ""), l = !o && wc.test(n.overflowX || ""), s = o ? 0 : wn(n.paddingTop), d = o ? 0 : wn(n.paddingRight), c = o ? 0 : wn(n.paddingBottom), h = o ? 0 : wn(n.paddingLeft), p = o ? 0 : wn(n.borderTopWidth), v = o ? 0 : wn(n.borderRightWidth), f = o ? 0 : wn(n.borderBottomWidth), m = o ? 0 : wn(n.borderLeftWidth), g = h + d, u = s + c, b = m + v, x = p + f, w = l ? e.offsetHeight - x - e.clientHeight : 0, C = a ? e.offsetWidth - b - e.clientWidth : 0, S = r ? g + b : 0, y = r ? u + x : 0, T = o ? o.width : wn(n.width) - S - C, k = o ? o.height : wn(n.height) - y - w, E = T + g + C + b, U = k + u + w + x, _ = _o({
    devicePixelContentBoxSize: Qo(Math.round(T * devicePixelRatio), Math.round(k * devicePixelRatio), i),
    borderBoxSize: Qo(E, U, i),
    contentBoxSize: Qo(T, k, i),
    contentRect: new Gh(h, s, T, k)
  });
  return xi.set(e, _), _;
}, Zh = function(e, t, n) {
  var o = Yh(e, n), r = o.borderBoxSize, i = o.contentBoxSize, a = o.devicePixelContentBoxSize;
  switch (t) {
    case Qr.DEVICE_PIXEL_CONTENT_BOX:
      return a;
    case Qr.BORDER_BOX:
      return r;
    default:
      return i;
  }
}, O0 = /* @__PURE__ */ function() {
  function e(t) {
    var n = Yh(t);
    this.target = t, this.contentRect = n.contentRect, this.borderBoxSize = _o([n.borderBoxSize]), this.contentBoxSize = _o([n.contentBoxSize]), this.devicePixelContentBoxSize = _o([n.devicePixelContentBoxSize]);
  }
  return e;
}(), Jh = function(e) {
  if (Xh(e))
    return 1 / 0;
  for (var t = 0, n = e.parentNode; n; )
    t += 1, n = n.parentNode;
  return t;
}, z0 = function() {
  var e = 1 / 0, t = [];
  Po.forEach(function(a) {
    if (a.activeTargets.length !== 0) {
      var l = [];
      a.activeTargets.forEach(function(d) {
        var c = new O0(d.target), h = Jh(d.target);
        l.push(c), d.lastReportedSize = Zh(d.target, d.observedBox), h < e && (e = h);
      }), t.push(function() {
        a.callback.call(a.observer, l, a.observer);
      }), a.activeTargets.splice(0, a.activeTargets.length);
    }
  });
  for (var n = 0, o = t; n < o.length; n++) {
    var r = o[n];
    r();
  }
  return e;
}, xc = function(e) {
  Po.forEach(function(n) {
    n.activeTargets.splice(0, n.activeTargets.length), n.skippedTargets.splice(0, n.skippedTargets.length), n.observationTargets.forEach(function(r) {
      r.isActive() && (Jh(r.target) > e ? n.activeTargets.push(r) : n.skippedTargets.push(r));
    });
  });
}, M0 = function() {
  var e = 0;
  for (xc(e); k0(); )
    e = z0(), xc(e);
  return R0() && P0(), e > 0;
}, nl, Qh = [], I0 = function() {
  return Qh.splice(0).forEach(function(e) {
    return e();
  });
}, A0 = function(e) {
  if (!nl) {
    var t = 0, n = document.createTextNode(""), o = { characterData: !0 };
    new MutationObserver(function() {
      return I0();
    }).observe(n, o), nl = function() {
      n.textContent = "".concat(t ? t-- : t++);
    };
  }
  Qh.push(e), nl();
}, V0 = function(e) {
  A0(function() {
    requestAnimationFrame(e);
  });
}, aa = 0, B0 = function() {
  return !!aa;
}, L0 = 250, D0 = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, Cc = [
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
], Sc = function(e) {
  return e === void 0 && (e = 0), Date.now() + e;
}, ol = !1, N0 = function() {
  function e() {
    var t = this;
    this.stopped = !0, this.listener = function() {
      return t.schedule();
    };
  }
  return e.prototype.run = function(t) {
    var n = this;
    if (t === void 0 && (t = L0), !ol) {
      ol = !0;
      var o = Sc(t);
      V0(function() {
        var r = !1;
        try {
          r = M0();
        } finally {
          if (ol = !1, t = o - Sc(), !B0())
            return;
          r ? n.run(1e3) : t > 0 ? n.run(t) : n.start();
        }
      });
    }
  }, e.prototype.schedule = function() {
    this.stop(), this.run();
  }, e.prototype.observe = function() {
    var t = this, n = function() {
      return t.observer && t.observer.observe(document.body, D0);
    };
    document.body ? n() : Lr.addEventListener("DOMContentLoaded", n);
  }, e.prototype.start = function() {
    var t = this;
    this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), Cc.forEach(function(n) {
      return Lr.addEventListener(n, t.listener, !0);
    }));
  }, e.prototype.stop = function() {
    var t = this;
    this.stopped || (this.observer && this.observer.disconnect(), Cc.forEach(function(n) {
      return Lr.removeEventListener(n, t.listener, !0);
    }), this.stopped = !0);
  }, e;
}(), vs = new N0(), $c = function(e) {
  !aa && e > 0 && vs.start(), aa += e, !aa && vs.stop();
}, H0 = function(e) {
  return !td(e) && !T0(e) && getComputedStyle(e).display === "inline";
}, j0 = function() {
  function e(t, n) {
    this.target = t, this.observedBox = n || Qr.CONTENT_BOX, this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  return e.prototype.isActive = function() {
    var t = Zh(this.target, this.observedBox, !0);
    return H0(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
  }, e;
}(), W0 = /* @__PURE__ */ function() {
  function e(t, n) {
    this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = n;
  }
  return e;
}(), Ci = /* @__PURE__ */ new WeakMap(), kc = function(e, t) {
  for (var n = 0; n < e.length; n += 1)
    if (e[n].target === t)
      return n;
  return -1;
}, Si = function() {
  function e() {
  }
  return e.connect = function(t, n) {
    var o = new W0(t, n);
    Ci.set(t, o);
  }, e.observe = function(t, n, o) {
    var r = Ci.get(t), i = r.observationTargets.length === 0;
    kc(r.observationTargets, n) < 0 && (i && Po.push(r), r.observationTargets.push(new j0(n, o && o.box)), $c(1), vs.schedule());
  }, e.unobserve = function(t, n) {
    var o = Ci.get(t), r = kc(o.observationTargets, n), i = o.observationTargets.length === 1;
    r >= 0 && (i && Po.splice(Po.indexOf(o), 1), o.observationTargets.splice(r, 1), $c(-1));
  }, e.disconnect = function(t) {
    var n = this, o = Ci.get(t);
    o.observationTargets.slice().forEach(function(r) {
      return n.unobserve(t, r.target);
    }), o.activeTargets.splice(0, o.activeTargets.length);
  }, e;
}(), U0 = function() {
  function e(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    if (typeof t != "function")
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    Si.connect(this, t);
  }
  return e.prototype.observe = function(t, n) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!bc(t))
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Si.observe(this, t, n);
  }, e.prototype.unobserve = function(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!bc(t))
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Si.unobserve(this, t);
  }, e.prototype.disconnect = function() {
    Si.disconnect(this);
  }, e.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  }, e;
}();
class K0 {
  constructor() {
    this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || U0)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
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
const Dr = new K0(), q0 = window.Vue.defineComponent, G0 = window.Vue.renderSlot, X0 = window.Vue.getCurrentInstance, Y0 = window.Vue.onMounted, Z0 = window.Vue.onBeforeUnmount, To = q0({
  name: "ResizeObserver",
  props: {
    onResize: Function
  },
  setup(e) {
    let t = !1;
    const n = X0().proxy;
    function o(r) {
      const { onResize: i } = e;
      i !== void 0 && i(r);
    }
    Y0(() => {
      const r = n.$el;
      if (r === void 0) {
        cc("resize-observer", "$el does not exist.");
        return;
      }
      if (r.nextElementSibling !== r.nextSibling && r.nodeType === 3 && r.nodeValue !== "") {
        cc("resize-observer", "$el can not be observed (it may be a text node).");
        return;
      }
      r.nextElementSibling !== null && (Dr.registerHandler(r.nextElementSibling, o), t = !0);
    }), Z0(() => {
      t && Dr.unregisterHandler(n.$el.nextElementSibling);
    });
  },
  render() {
    return G0(this.$slots, "default");
  }
});
let $i;
function J0() {
  return typeof document > "u" ? !1 : ($i === void 0 && ("matchMedia" in window ? $i = window.matchMedia("(pointer:coarse)").matches : $i = !1), $i);
}
let rl;
function Rc() {
  return typeof document > "u" ? 1 : (rl === void 0 && (rl = "chrome" in window ? window.devicePixelRatio : 1), rl);
}
const ep = "VVirtualListXScroll", Q0 = window.Vue.computed, ey = window.Vue.provide, Pc = window.Vue.ref;
function ty({ columnsRef: e, renderColRef: t, renderItemWithColsRef: n }) {
  const o = Pc(0), r = Pc(0), i = Q0(() => {
    const d = e.value;
    if (d.length === 0)
      return null;
    const c = new qh(d.length, 0);
    return d.forEach((h, p) => {
      c.add(p, h.width);
    }), c;
  }), a = ze(() => {
    const d = i.value;
    return d !== null ? Math.max(d.getBound(r.value) - 1, 0) : 0;
  }), l = (d) => {
    const c = i.value;
    return c !== null ? c.sum(d) : 0;
  }, s = ze(() => {
    const d = i.value;
    return d !== null ? Math.min(d.getBound(r.value + o.value) + 1, e.value.length - 1) : 0;
  });
  return ey(ep, {
    startIndexRef: a,
    endIndexRef: s,
    columnsRef: e,
    renderColRef: t,
    renderItemWithColsRef: n,
    getLeft: l
  }), {
    listWidthRef: o,
    scrollLeftRef: r
  };
}
const ny = window.Vue.defineComponent, oy = window.Vue.inject, _c = ny({
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
      oy(ep)
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
    const { startIndex: e, endIndex: t, columns: n, renderCol: o, renderItemWithCols: r, getLeft: i, item: a } = this;
    if (r != null)
      return r({
        itemIndex: this.index,
        startColIndex: e,
        endColIndex: t,
        allColumns: n,
        item: a,
        getLeft: i
      });
    if (o != null) {
      const l = [];
      for (let s = e; s <= t; ++s) {
        const d = n[s];
        l.push(o({ column: d, left: i(s), item: a }));
      }
      return l;
    }
    return null;
  }
}), ry = window.Vue.mergeProps, xr = window.Vue.computed, iy = window.Vue.defineComponent, Cr = window.Vue.ref, ay = window.Vue.onMounted, mo = window.Vue.h, ly = window.Vue.onActivated, sy = window.Vue.onDeactivated, il = window.Vue.toRef, dy = io(".v-vl", {
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
]), nd = iy({
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
    dy.mount({
      id: "vueuc/virtual-list",
      head: !0,
      anchorMetaName: Qs,
      ssr: t
    }), ay(() => {
      const { defaultScrollIndex: M, defaultScrollKey: I } = e;
      M != null ? g({ index: M }) : I != null && g({ key: I });
    });
    let n = !1, o = !1;
    ly(() => {
      if (n = !1, !o) {
        o = !0;
        return;
      }
      g({ top: v.value, left: a.value });
    }), sy(() => {
      n = !0, o || (o = !0);
    });
    const r = ze(() => {
      if (e.renderCol == null && e.renderItemWithCols == null || e.columns.length === 0)
        return;
      let M = 0;
      return e.columns.forEach((I) => {
        M += I.width;
      }), M;
    }), i = xr(() => {
      const M = /* @__PURE__ */ new Map(), { keyField: I } = e;
      return e.items.forEach((z, G) => {
        M.set(z[I], G);
      }), M;
    }), { scrollLeftRef: a, listWidthRef: l } = ty({
      columnsRef: il(e, "columns"),
      renderColRef: il(e, "renderCol"),
      renderItemWithColsRef: il(e, "renderItemWithCols")
    }), s = Cr(null), d = Cr(void 0), c = /* @__PURE__ */ new Map(), h = xr(() => {
      const { items: M, itemSize: I, keyField: z } = e, G = new qh(M.length, I);
      return M.forEach((L, Z) => {
        const te = L[z], q = c.get(te);
        q !== void 0 && G.add(Z, q);
      }), G;
    }), p = Cr(0), v = Cr(0), f = ze(() => Math.max(h.value.getBound(v.value - xt(e.paddingTop)) - 1, 0)), m = xr(() => {
      const { value: M } = d;
      if (M === void 0)
        return [];
      const { items: I, itemSize: z } = e, G = f.value, L = Math.min(G + Math.ceil(M / z + 1), I.length - 1), Z = [];
      for (let te = G; te <= L; ++te)
        Z.push(I[te]);
      return Z;
    }), g = (M, I) => {
      if (typeof M == "number") {
        w(M, I, "auto");
        return;
      }
      const { left: z, top: G, index: L, key: Z, position: te, behavior: q, debounce: A = !0 } = M;
      if (z !== void 0 || G !== void 0)
        w(z, G, q);
      else if (L !== void 0)
        x(L, q, A);
      else if (Z !== void 0) {
        const F = i.value.get(Z);
        F !== void 0 && x(F, q, A);
      } else te === "bottom" ? w(0, Number.MAX_SAFE_INTEGER, q) : te === "top" && w(0, 0, q);
    };
    let u, b = null;
    function x(M, I, z) {
      const { value: G } = h, L = G.sum(M) + xt(e.paddingTop);
      if (!z)
        s.value.scrollTo({
          left: 0,
          top: L,
          behavior: I
        });
      else {
        u = M, b !== null && window.clearTimeout(b), b = window.setTimeout(() => {
          u = void 0, b = null;
        }, 16);
        const { scrollTop: Z, offsetHeight: te } = s.value;
        if (L > Z) {
          const q = G.get(M);
          L + q <= Z + te || s.value.scrollTo({
            left: 0,
            top: L + q - te,
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
    function w(M, I, z) {
      s.value.scrollTo({
        left: M,
        top: I,
        behavior: z
      });
    }
    function C(M, I) {
      var z, G, L;
      if (n || e.ignoreItemResize || _(I.target))
        return;
      const { value: Z } = h, te = i.value.get(M), q = Z.get(te), A = (L = (G = (z = I.borderBoxSize) === null || z === void 0 ? void 0 : z[0]) === null || G === void 0 ? void 0 : G.blockSize) !== null && L !== void 0 ? L : I.contentRect.height;
      if (A === q)
        return;
      A - e.itemSize === 0 ? c.delete(M) : c.set(M, A - e.itemSize);
      const j = A - q;
      if (j === 0)
        return;
      Z.add(te, j);
      const J = s.value;
      if (J != null) {
        if (u === void 0) {
          const Q = Z.sum(te);
          J.scrollTop > Q && J.scrollBy(0, j);
        } else if (te < u)
          J.scrollBy(0, j);
        else if (te === u) {
          const Q = Z.sum(te);
          A + Q > // Note, listEl shouldn't have border, nor offsetHeight won't be
          // correct
          J.scrollTop + J.offsetHeight && J.scrollBy(0, j);
        }
        U();
      }
      p.value++;
    }
    const S = !J0();
    let y = !1;
    function T(M) {
      var I;
      (I = e.onScroll) === null || I === void 0 || I.call(e, M), (!S || !y) && U();
    }
    function k(M) {
      var I;
      if ((I = e.onWheel) === null || I === void 0 || I.call(e, M), S) {
        const z = s.value;
        if (z != null) {
          if (M.deltaX === 0 && (z.scrollTop === 0 && M.deltaY <= 0 || z.scrollTop + z.offsetHeight >= z.scrollHeight && M.deltaY >= 0))
            return;
          M.preventDefault(), z.scrollTop += M.deltaY / Rc(), z.scrollLeft += M.deltaX / Rc(), U(), y = !0, Yr(() => {
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
      } else if (M.contentRect.height === d.value && M.contentRect.width === l.value)
        return;
      d.value = M.contentRect.height, l.value = M.contentRect.width;
      const { onResize: I } = e;
      I !== void 0 && I(M);
    }
    function U() {
      const { value: M } = s;
      M != null && (v.value = M.scrollTop, a.value = M.scrollLeft);
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
      itemsStyle: xr(() => {
        const { itemResizable: M } = e, I = it(h.value.sum());
        return p.value, [
          e.itemsStyle,
          {
            boxSizing: "content-box",
            width: it(r.value),
            height: M ? "" : I,
            minHeight: M ? I : "",
            paddingTop: it(e.paddingTop),
            paddingBottom: it(e.paddingBottom)
          }
        ];
      }),
      visibleItemsStyle: xr(() => (p.value, {
        transform: `translateY(${it(h.value.sum(f.value))})`
      })),
      viewportItems: m,
      listElRef: s,
      itemsElRef: Cr(null),
      scrollTo: g,
      handleListResize: E,
      handleListScroll: T,
      handleListWheel: k,
      handleItemResize: C
    };
  },
  render() {
    const { itemResizable: e, keyField: t, keyToIndex: n, visibleItemsTag: o } = this;
    return mo(To, {
      onResize: this.handleListResize
    }, {
      default: () => {
        var r, i;
        return mo("div", ry(this.$attrs, {
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
                const { renderCol: a, renderItemWithCols: l } = this;
                return this.viewportItems.map((s) => {
                  const d = s[t], c = n.get(d), h = a != null ? mo(_c, {
                    index: c,
                    item: s
                  }) : void 0, p = l != null ? mo(_c, {
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
}), cy = window.Vue.defineComponent, uy = window.Vue.renderSlot, Tc = window.Vue.h, fy = window.Vue.onMounted, Fc = window.Vue.ref, hy = window.Vue.nextTick, Mn = "v-hidden", py = io("[v-hidden]", {
  display: "none!important"
}), Ec = cy({
  name: "Overflow",
  props: {
    getCounter: Function,
    getTail: Function,
    updateCounter: Function,
    onUpdateCount: Function,
    onUpdateOverflow: Function
  },
  setup(e, { slots: t }) {
    const n = Fc(null), o = Fc(null);
    function r(a) {
      const { value: l } = n, { getCounter: s, getTail: d } = e;
      let c;
      if (s !== void 0 ? c = s() : c = o.value, !l || !c)
        return;
      c.hasAttribute(Mn) && c.removeAttribute(Mn);
      const { children: h } = l;
      if (a.showAllItemsBeforeCalculate)
        for (const x of h)
          x.hasAttribute(Mn) && x.removeAttribute(Mn);
      const p = l.offsetWidth, v = [], f = t.tail ? d == null ? void 0 : d() : null;
      let m = f ? f.offsetWidth : 0, g = !1;
      const u = l.children.length - (t.tail ? 1 : 0);
      for (let x = 0; x < u - 1; ++x) {
        if (x < 0)
          continue;
        const w = h[x];
        if (g) {
          w.hasAttribute(Mn) || w.setAttribute(Mn, "");
          continue;
        } else w.hasAttribute(Mn) && w.removeAttribute(Mn);
        const C = w.offsetWidth;
        if (m += C, v[x] = C, m > p) {
          const { updateCounter: S } = e;
          for (let y = x; y >= 0; --y) {
            const T = u - 1 - y;
            S !== void 0 ? S(T) : c.textContent = `${T}`;
            const k = c.offsetWidth;
            if (m -= v[y], m + k <= p || y === 0) {
              g = !0, x = y - 1, f && (x === -1 ? (f.style.maxWidth = `${p - k}px`, f.style.boxSizing = "border-box") : f.style.maxWidth = "");
              const { onUpdateCount: E } = e;
              E && E(T);
              break;
            }
          }
        }
      }
      const { onUpdateOverflow: b } = e;
      g ? b !== void 0 && b(!0) : (b !== void 0 && b(!1), c.setAttribute(Mn, ""));
    }
    const i = Oo();
    return py.mount({
      id: "vueuc/overflow",
      head: !0,
      anchorMetaName: Qs,
      ssr: i
    }), fy(() => r({
      showAllItemsBeforeCalculate: !1
    })), {
      selfRef: n,
      counterRef: o,
      sync: r
    };
  },
  render() {
    const { $slots: e } = this;
    return hy(() => this.sync({
      showAllItemsBeforeCalculate: !1
    })), Tc("div", {
      class: "v-overflow",
      ref: "selfRef"
    }, [
      uy(e, "default"),
      // $slots.counter should only has 1 element
      e.counter ? e.counter() : Tc("span", {
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
function tp(e) {
  return e instanceof HTMLElement;
}
function np(e) {
  for (let t = 0; t < e.childNodes.length; t++) {
    const n = e.childNodes[t];
    if (tp(n) && (rp(n) || np(n)))
      return !0;
  }
  return !1;
}
function op(e) {
  for (let t = e.childNodes.length - 1; t >= 0; t--) {
    const n = e.childNodes[t];
    if (tp(n) && (rp(n) || op(n)))
      return !0;
  }
  return !1;
}
function rp(e) {
  if (!vy(e))
    return !1;
  try {
    e.focus({ preventScroll: !0 });
  } catch {
  }
  return document.activeElement === e;
}
function vy(e) {
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
const al = window.Vue.h, my = window.Vue.defineComponent, Oc = window.Vue.ref, gy = window.Vue.Fragment, by = window.Vue.onMounted, wy = window.Vue.onBeforeUnmount, yy = window.Vue.watch;
let Sr = [];
const xy = my({
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
    const t = Jr(), n = Oc(null), o = Oc(null);
    let r = !1, i = !1;
    const a = typeof document > "u" ? null : document.activeElement;
    function l() {
      return Sr[Sr.length - 1] === t;
    }
    function s(g) {
      var u;
      g.code === "Escape" && l() && ((u = e.onEsc) === null || u === void 0 || u.call(e, g));
    }
    by(() => {
      yy(() => e.active, (g) => {
        g ? (h(), at("keydown", document, s)) : (Je("keydown", document, s), r && p());
      }, {
        immediate: !0
      });
    }), wy(() => {
      Je("keydown", document, s), r && p();
    });
    function d(g) {
      if (!i && l()) {
        const u = c();
        if (u === null || u.contains(Zr(g)))
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
        if (Sr.push(t), e.autoFocus) {
          const { initialFocusTo: u } = e;
          u === void 0 ? v("first") : (g = fc(u)) === null || g === void 0 || g.focus({ preventScroll: !0 });
        }
        r = !0, document.addEventListener("focus", d, !0);
      }
    }
    function p() {
      var g;
      if (e.disabled || (document.removeEventListener("focus", d, !0), Sr = Sr.filter((b) => b !== t), l()))
        return;
      const { finalFocusTo: u } = e;
      u !== void 0 ? (g = fc(u)) === null || g === void 0 || g.focus({ preventScroll: !0 }) : e.returnFocusOnDeactivated && a instanceof HTMLElement && (i = !0, a.focus({ preventScroll: !0 }), i = !1);
    }
    function v(g) {
      if (l() && e.active) {
        const u = n.value, b = o.value;
        if (u !== null && b !== null) {
          const x = c();
          if (x == null || x === b) {
            i = !0, u.focus({ preventScroll: !0 }), i = !1;
            return;
          }
          i = !0;
          const w = g === "first" ? np(x) : op(x);
          i = !1, w || (i = !0, u.focus({ preventScroll: !0 }), i = !1);
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
    return al(gy, null, [
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
}), Cy = window.Vue.onBeforeUnmount, Sy = window.Vue.onMounted, $y = window.Vue.watch;
function ip(e, t) {
  t && (Sy(() => {
    const {
      value: n
    } = e;
    n && Dr.registerHandler(n, t);
  }), $y(e, (n, o) => {
    o && Dr.unregisterHandler(o);
  }, {
    deep: !1
  }), Cy(() => {
    const {
      value: n
    } = e;
    n && Dr.unregisterHandler(n);
  }));
}
function pa(e) {
  return e.replace(/#|\(|\)|,|\s|\./g, "_");
}
const ky = /^(\d|\.)+$/, zc = /(\d|\.)+/;
function St(e, {
  c: t = 1,
  offset: n = 0,
  attachPx: o = !0
} = {}) {
  if (typeof e == "number") {
    const r = (e + n) * t;
    return r === 0 ? "0" : `${r}px`;
  } else if (typeof e == "string")
    if (ky.test(e)) {
      const r = (Number(e) + n) * t;
      return o ? r === 0 ? "0" : `${r}px` : `${r}`;
    } else {
      const r = zc.exec(e);
      return r ? e.replace(zc, String((Number(r[0]) + n) * t)) : e;
    }
  return e;
}
function Mc(e) {
  const {
    left: t,
    right: n,
    top: o,
    bottom: r
  } = Yt(e);
  return `${o} ${t} ${r} ${n}`;
}
function Ry(e, t) {
  if (!e) return;
  const n = document.createElement("a");
  n.href = e, t !== void 0 && (n.download = t), document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
let ll;
function Py() {
  return ll === void 0 && (ll = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), ll;
}
const _y = /* @__PURE__ */ new WeakSet();
function Ty(e) {
  _y.add(e);
}
function Ic(e) {
  switch (typeof e) {
    case "string":
      return e || void 0;
    case "number":
      return String(e);
    default:
      return;
  }
}
const Fy = {
  tiny: "mini",
  small: "tiny",
  medium: "small",
  large: "medium",
  huge: "large"
};
function Ac(e) {
  const t = Fy[e];
  if (t === void 0)
    throw new Error(`${e} has no smaller size.`);
  return t;
}
function so(e, t) {
  console.error(`[naive/${e}]: ${t}`);
}
function Ey(e, t) {
  throw new Error(`[naive/${e}]: ${t}`);
}
function le(e, ...t) {
  if (Array.isArray(e))
    e.forEach((n) => le(n, ...t));
  else
    return e(...t);
}
function ap(e) {
  return (t) => {
    t ? e.value = t.$el : e.value = null;
  };
}
const Oy = window.Vue.Comment, zy = window.Vue.createTextVNode, My = window.Vue.Fragment;
function or(e, t = !0, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(zy(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        or(o, t, n);
        return;
      }
      if (o.type === My) {
        if (o.children === null) return;
        Array.isArray(o.children) && or(o.children, t, n);
      } else {
        if (o.type === Oy && t) return;
        n.push(o);
      }
    }
  }), n;
}
function Iy(e, t = "default", n = void 0) {
  const o = e[t];
  if (!o)
    return so("getFirstSlotVNode", `slot[${t}] is empty`), null;
  const r = or(o(n));
  return r.length === 1 ? r[0] : (so("getFirstSlotVNode", `slot[${t}] should have exactly one child`), null);
}
function od(e, t = "default", n = []) {
  const r = e.$slots[t];
  return r === void 0 ? n : r();
}
const Ay = window.Vue.vShow;
function Vy(e) {
  var t;
  const n = (t = e.dirs) === null || t === void 0 ? void 0 : t.find(({
    dir: o
  }) => o === Ay);
  return !!(n && n.value === !1);
}
function ei(e, t = [], n) {
  const o = {};
  return t.forEach((r) => {
    o[r] = e[r];
  }), Object.assign(o, n);
}
function ti(e) {
  return Object.keys(e);
}
function Nr(e) {
  const t = e.filter((n) => n !== void 0);
  if (t.length !== 0)
    return t.length === 1 ? t[0] : (n) => {
      e.forEach((o) => {
        o && o(n);
      });
    };
}
function lp(e, t = [], n) {
  const o = {};
  return Object.getOwnPropertyNames(e).forEach((i) => {
    t.includes(i) || (o[i] = e[i]);
  }), Object.assign(o, n);
}
const Vc = window.Vue.createTextVNode;
function $n(e, ...t) {
  return typeof e == "function" ? e(...t) : typeof e == "string" ? Vc(e) : typeof e == "number" ? Vc(String(e)) : null;
}
const By = window.Vue.Comment, Ly = window.Vue.Fragment, Dy = window.Vue.isVNode;
function hn(e) {
  return e.some((t) => Dy(t) ? !(t.type === By || t.type === Ly && !hn(t.children)) : !0) ? e : null;
}
function vn(e, t) {
  return e && hn(e()) || t();
}
function Ny(e, t, n) {
  return e && hn(e(t)) || n(t);
}
function We(e, t) {
  const n = e && hn(e());
  return t(n || null);
}
function er(e) {
  return !(e && hn(e()));
}
const Hy = window.Vue.defineComponent, ms = Hy({
  render() {
    var e, t;
    return (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e);
  }
}), Hn = "n-config-provider", Bc = window.Vue.computed, sp = window.Vue.inject, dp = window.Vue.shallowRef, cp = "n";
function qe(e = {}, t = {
  defaultBordered: !0
}) {
  const n = sp(Hn, null);
  return {
    // NConfigProvider,
    inlineThemeDisabled: n == null ? void 0 : n.inlineThemeDisabled,
    mergedRtlRef: n == null ? void 0 : n.mergedRtlRef,
    mergedComponentPropsRef: n == null ? void 0 : n.mergedComponentPropsRef,
    mergedBreakpointsRef: n == null ? void 0 : n.mergedBreakpointsRef,
    mergedBorderedRef: Bc(() => {
      var o, r;
      const {
        bordered: i
      } = e;
      return i !== void 0 ? i : (r = (o = n == null ? void 0 : n.mergedBorderedRef.value) !== null && o !== void 0 ? o : t.defaultBordered) !== null && r !== void 0 ? r : !0;
    }),
    mergedClsPrefixRef: n ? n.mergedClsPrefixRef : dp(cp),
    namespaceRef: Bc(() => n == null ? void 0 : n.mergedNamespaceRef.value)
  };
}
function up() {
  const e = sp(Hn, null);
  return e ? e.mergedClsPrefixRef : dp(cp);
}
const jy = window.Vue.inject, Wy = window.Vue.ref, Uy = window.Vue.watchEffect;
function wt(e, t, n, o) {
  n || Ey("useThemeClass", "cssVarsRef is not passed");
  const r = jy(Hn, null), i = r == null ? void 0 : r.mergedThemeHashRef, a = r == null ? void 0 : r.styleMountTarget, l = Wy(""), s = Oo();
  let d;
  const c = `__${e}`, h = () => {
    let p = c;
    const v = t ? t.value : void 0, f = i == null ? void 0 : i.value;
    f && (p += `-${f}`), v && (p += `-${v}`);
    const {
      themeOverrides: m,
      builtinThemeOverrides: g
    } = o;
    m && (p += `-${us(JSON.stringify(m))}`), g && (p += `-${us(JSON.stringify(g))}`), l.value = p, d = () => {
      const u = n.value;
      let b = "";
      for (const x in u)
        b += `${x}: ${u[x]};`;
      W(`.${p}`, b).mount({
        id: p,
        ssr: s,
        parent: a
      }), d = void 0;
    };
  };
  return Uy(() => {
    h();
  }), {
    themeClass: l,
    onRender: () => {
      d == null || d();
    }
  };
}
const sl = window.Vue.computed, Ky = window.Vue.inject, qy = window.Vue.onBeforeUnmount, Gy = window.Vue.provide, gs = "n-form-item";
function jn(e, {
  defaultSize: t = "medium",
  mergedSize: n,
  mergedDisabled: o
} = {}) {
  const r = Ky(gs, null);
  Gy(gs, null);
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
  }), a = sl(o ? () => o(r) : () => {
    const {
      disabled: s
    } = e;
    return s !== void 0 ? s : r ? r.disabled.value : !1;
  }), l = sl(() => {
    const {
      status: s
    } = e;
    return s || (r == null ? void 0 : r.mergedValidationStatus.value);
  });
  return qy(() => {
    r && r.restoreValidation();
  }), {
    mergedSizeRef: i,
    mergedDisabledRef: a,
    mergedStatusRef: l,
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
const Xy = {
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
function $r(e) {
  return (t, n) => {
    const o = n != null && n.context ? String(n.context) : "standalone";
    let r;
    if (o === "formatting" && e.formattingValues) {
      const a = e.defaultFormattingWidth || e.defaultWidth, l = n != null && n.width ? String(n.width) : a;
      r = e.formattingValues[l] || e.formattingValues[a];
    } else {
      const a = e.defaultWidth, l = n != null && n.width ? String(n.width) : e.defaultWidth;
      r = e.values[l] || e.values[a];
    }
    const i = e.argumentCallback ? e.argumentCallback(t) : t;
    return r[i];
  };
}
function kr(e) {
  return (t, n = {}) => {
    const o = n.width, r = o && e.matchPatterns[o] || e.matchPatterns[e.defaultMatchWidth], i = t.match(r);
    if (!i)
      return null;
    const a = i[0], l = o && e.parsePatterns[o] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(l) ? Zy(l, (h) => h.test(a)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      Yy(l, (h) => h.test(a))
    );
    let d;
    d = e.valueCallback ? e.valueCallback(s) : s, d = n.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      n.valueCallback(d)
    ) : d;
    const c = t.slice(a.length);
    return { value: d, rest: c };
  };
}
function Yy(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function Zy(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function Jy(e) {
  return (t, n = {}) => {
    const o = t.match(e.matchPattern);
    if (!o) return null;
    const r = o[0], i = t.match(e.parsePattern);
    if (!i) return null;
    let a = e.valueCallback ? e.valueCallback(i[0]) : i[0];
    a = n.valueCallback ? n.valueCallback(a) : a;
    const l = t.slice(r.length);
    return { value: a, rest: l };
  };
}
const Qy = {
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
}, ex = (e, t, n) => {
  let o;
  const r = Qy[e];
  return typeof r == "string" ? o = r : t === 1 ? o = r.one : o = r.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + o : o + " ago" : o;
}, tx = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, nx = (e, t, n, o) => tx[e], ox = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, rx = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, ix = {
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
}, ax = {
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
}, lx = {
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
}, sx = {
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
}, dx = (e, t) => {
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
}, cx = {
  ordinalNumber: dx,
  era: $r({
    values: ox,
    defaultWidth: "wide"
  }),
  quarter: $r({
    values: rx,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: $r({
    values: ix,
    defaultWidth: "wide"
  }),
  day: $r({
    values: ax,
    defaultWidth: "wide"
  }),
  dayPeriod: $r({
    values: lx,
    defaultWidth: "wide",
    formattingValues: sx,
    defaultFormattingWidth: "wide"
  })
}, ux = /^(\d+)(th|st|nd|rd)?/i, fx = /\d+/i, hx = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, px = {
  any: [/^b/i, /^(a|c)/i]
}, vx = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, mx = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, gx = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, bx = {
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
}, wx = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, yx = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, xx = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Cx = {
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
}, Sx = {
  ordinalNumber: Jy({
    matchPattern: ux,
    parsePattern: fx,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: kr({
    matchPatterns: hx,
    defaultMatchWidth: "wide",
    parsePatterns: px,
    defaultParseWidth: "any"
  }),
  quarter: kr({
    matchPatterns: vx,
    defaultMatchWidth: "wide",
    parsePatterns: mx,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: kr({
    matchPatterns: gx,
    defaultMatchWidth: "wide",
    parsePatterns: bx,
    defaultParseWidth: "any"
  }),
  day: kr({
    matchPatterns: wx,
    defaultMatchWidth: "wide",
    parsePatterns: yx,
    defaultParseWidth: "any"
  }),
  dayPeriod: kr({
    matchPatterns: xx,
    defaultMatchWidth: "any",
    parsePatterns: Cx,
    defaultParseWidth: "any"
  })
}, $x = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, kx = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, Rx = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, Px = {
  date: dl({
    formats: $x,
    defaultWidth: "full"
  }),
  time: dl({
    formats: kx,
    defaultWidth: "full"
  }),
  dateTime: dl({
    formats: Rx,
    defaultWidth: "full"
  })
}, _x = {
  code: "en-US",
  formatDistance: ex,
  formatLong: Px,
  formatRelative: nx,
  localize: cx,
  match: Sx,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, Tx = {
  name: "en-US",
  locale: _x
};
var fp = typeof global == "object" && global && global.Object === Object && global, Fx = typeof self == "object" && self && self.Object === Object && self, Fn = fp || Fx || Function("return this")(), co = Fn.Symbol, hp = Object.prototype, Ex = hp.hasOwnProperty, Ox = hp.toString, Rr = co ? co.toStringTag : void 0;
function zx(e) {
  var t = Ex.call(e, Rr), n = e[Rr];
  try {
    e[Rr] = void 0;
    var o = !0;
  } catch {
  }
  var r = Ox.call(e);
  return o && (t ? e[Rr] = n : delete e[Rr]), r;
}
var Mx = Object.prototype, Ix = Mx.toString;
function Ax(e) {
  return Ix.call(e);
}
var Vx = "[object Null]", Bx = "[object Undefined]", Lc = co ? co.toStringTag : void 0;
function zo(e) {
  return e == null ? e === void 0 ? Bx : Vx : Lc && Lc in Object(e) ? zx(e) : Ax(e);
}
function uo(e) {
  return e != null && typeof e == "object";
}
var Lx = "[object Symbol]";
function rd(e) {
  return typeof e == "symbol" || uo(e) && zo(e) == Lx;
}
function pp(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = Array(o); ++n < o; )
    r[n] = t(e[n], n, e);
  return r;
}
var ln = Array.isArray, Dc = co ? co.prototype : void 0, Nc = Dc ? Dc.toString : void 0;
function vp(e) {
  if (typeof e == "string")
    return e;
  if (ln(e))
    return pp(e, vp) + "";
  if (rd(e))
    return Nc ? Nc.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function po(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function id(e) {
  return e;
}
var Dx = "[object AsyncFunction]", Nx = "[object Function]", Hx = "[object GeneratorFunction]", jx = "[object Proxy]";
function ad(e) {
  if (!po(e))
    return !1;
  var t = zo(e);
  return t == Nx || t == Hx || t == Dx || t == jx;
}
var cl = Fn["__core-js_shared__"], Hc = function() {
  var e = /[^.]+$/.exec(cl && cl.keys && cl.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Wx(e) {
  return !!Hc && Hc in e;
}
var Ux = Function.prototype, Kx = Ux.toString;
function Mo(e) {
  if (e != null) {
    try {
      return Kx.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var qx = /[\\^$.*+?()[\]{}|]/g, Gx = /^\[object .+?Constructor\]$/, Xx = Function.prototype, Yx = Object.prototype, Zx = Xx.toString, Jx = Yx.hasOwnProperty, Qx = RegExp(
  "^" + Zx.call(Jx).replace(qx, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function eC(e) {
  if (!po(e) || Wx(e))
    return !1;
  var t = ad(e) ? Qx : Gx;
  return t.test(Mo(e));
}
function tC(e, t) {
  return e == null ? void 0 : e[t];
}
function Io(e, t) {
  var n = tC(e, t);
  return eC(n) ? n : void 0;
}
var bs = Io(Fn, "WeakMap"), jc = Object.create, nC = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!po(t))
      return {};
    if (jc)
      return jc(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}();
function oC(e, t, n) {
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
function rC(e, t) {
  var n = -1, o = e.length;
  for (t || (t = Array(o)); ++n < o; )
    t[n] = e[n];
  return t;
}
var iC = 800, aC = 16, lC = Date.now;
function sC(e) {
  var t = 0, n = 0;
  return function() {
    var o = lC(), r = aC - (o - n);
    if (n = o, r > 0) {
      if (++t >= iC)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function dC(e) {
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
}(), cC = va ? function(e, t) {
  return va(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: dC(t),
    writable: !0
  });
} : id, uC = sC(cC), fC = 9007199254740991, hC = /^(?:0|[1-9]\d*)$/;
function ld(e, t) {
  var n = typeof e;
  return t = t ?? fC, !!t && (n == "number" || n != "symbol" && hC.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function sd(e, t, n) {
  t == "__proto__" && va ? va(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function li(e, t) {
  return e === t || e !== e && t !== t;
}
var pC = Object.prototype, vC = pC.hasOwnProperty;
function mC(e, t, n) {
  var o = e[t];
  (!(vC.call(e, t) && li(o, n)) || n === void 0 && !(t in e)) && sd(e, t, n);
}
function gC(e, t, n, o) {
  var r = !n;
  n || (n = {});
  for (var i = -1, a = t.length; ++i < a; ) {
    var l = t[i], s = void 0;
    s === void 0 && (s = e[l]), r ? sd(n, l, s) : mC(n, l, s);
  }
  return n;
}
var Wc = Math.max;
function bC(e, t, n) {
  return t = Wc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var o = arguments, r = -1, i = Wc(o.length - t, 0), a = Array(i); ++r < i; )
      a[r] = o[t + r];
    r = -1;
    for (var l = Array(t + 1); ++r < t; )
      l[r] = o[r];
    return l[t] = n(a), oC(e, this, l);
  };
}
function wC(e, t) {
  return uC(bC(e, t, id), e + "");
}
var yC = 9007199254740991;
function dd(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= yC;
}
function sr(e) {
  return e != null && dd(e.length) && !ad(e);
}
function xC(e, t, n) {
  if (!po(n))
    return !1;
  var o = typeof t;
  return (o == "number" ? sr(n) && ld(t, n.length) : o == "string" && t in n) ? li(n[t], e) : !1;
}
function CC(e) {
  return wC(function(t, n) {
    var o = -1, r = n.length, i = r > 1 ? n[r - 1] : void 0, a = r > 2 ? n[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (r--, i) : void 0, a && xC(n[0], n[1], a) && (i = r < 3 ? void 0 : i, r = 1), t = Object(t); ++o < r; ) {
      var l = n[o];
      l && e(t, l, o, i);
    }
    return t;
  });
}
var SC = Object.prototype;
function cd(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || SC;
  return e === n;
}
function $C(e, t) {
  for (var n = -1, o = Array(e); ++n < e; )
    o[n] = t(n);
  return o;
}
var kC = "[object Arguments]";
function Uc(e) {
  return uo(e) && zo(e) == kC;
}
var mp = Object.prototype, RC = mp.hasOwnProperty, PC = mp.propertyIsEnumerable, ma = Uc(/* @__PURE__ */ function() {
  return arguments;
}()) ? Uc : function(e) {
  return uo(e) && RC.call(e, "callee") && !PC.call(e, "callee");
};
function _C() {
  return !1;
}
var gp = typeof exports == "object" && exports && !exports.nodeType && exports, Kc = gp && typeof module == "object" && module && !module.nodeType && module, TC = Kc && Kc.exports === gp, qc = TC ? Fn.Buffer : void 0, FC = qc ? qc.isBuffer : void 0, ga = FC || _C, EC = "[object Arguments]", OC = "[object Array]", zC = "[object Boolean]", MC = "[object Date]", IC = "[object Error]", AC = "[object Function]", VC = "[object Map]", BC = "[object Number]", LC = "[object Object]", DC = "[object RegExp]", NC = "[object Set]", HC = "[object String]", jC = "[object WeakMap]", WC = "[object ArrayBuffer]", UC = "[object DataView]", KC = "[object Float32Array]", qC = "[object Float64Array]", GC = "[object Int8Array]", XC = "[object Int16Array]", YC = "[object Int32Array]", ZC = "[object Uint8Array]", JC = "[object Uint8ClampedArray]", QC = "[object Uint16Array]", e1 = "[object Uint32Array]", dt = {};
dt[KC] = dt[qC] = dt[GC] = dt[XC] = dt[YC] = dt[ZC] = dt[JC] = dt[QC] = dt[e1] = !0;
dt[EC] = dt[OC] = dt[WC] = dt[zC] = dt[UC] = dt[MC] = dt[IC] = dt[AC] = dt[VC] = dt[BC] = dt[LC] = dt[DC] = dt[NC] = dt[HC] = dt[jC] = !1;
function t1(e) {
  return uo(e) && dd(e.length) && !!dt[zo(e)];
}
function n1(e) {
  return function(t) {
    return e(t);
  };
}
var bp = typeof exports == "object" && exports && !exports.nodeType && exports, Hr = bp && typeof module == "object" && module && !module.nodeType && module, o1 = Hr && Hr.exports === bp, ul = o1 && fp.process, Gc = function() {
  try {
    var e = Hr && Hr.require && Hr.require("util").types;
    return e || ul && ul.binding && ul.binding("util");
  } catch {
  }
}(), Xc = Gc && Gc.isTypedArray, ud = Xc ? n1(Xc) : t1, r1 = Object.prototype, i1 = r1.hasOwnProperty;
function wp(e, t) {
  var n = ln(e), o = !n && ma(e), r = !n && !o && ga(e), i = !n && !o && !r && ud(e), a = n || o || r || i, l = a ? $C(e.length, String) : [], s = l.length;
  for (var d in e)
    (t || i1.call(e, d)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    r && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    ld(d, s))) && l.push(d);
  return l;
}
function yp(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var a1 = yp(Object.keys, Object), l1 = Object.prototype, s1 = l1.hasOwnProperty;
function d1(e) {
  if (!cd(e))
    return a1(e);
  var t = [];
  for (var n in Object(e))
    s1.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function fd(e) {
  return sr(e) ? wp(e) : d1(e);
}
function c1(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var u1 = Object.prototype, f1 = u1.hasOwnProperty;
function h1(e) {
  if (!po(e))
    return c1(e);
  var t = cd(e), n = [];
  for (var o in e)
    o == "constructor" && (t || !f1.call(e, o)) || n.push(o);
  return n;
}
function xp(e) {
  return sr(e) ? wp(e, !0) : h1(e);
}
var p1 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, v1 = /^\w*$/;
function hd(e, t) {
  if (ln(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || rd(e) ? !0 : v1.test(e) || !p1.test(e) || t != null && e in Object(t);
}
var ni = Io(Object, "create");
function m1() {
  this.__data__ = ni ? ni(null) : {}, this.size = 0;
}
function g1(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var b1 = "__lodash_hash_undefined__", w1 = Object.prototype, y1 = w1.hasOwnProperty;
function x1(e) {
  var t = this.__data__;
  if (ni) {
    var n = t[e];
    return n === b1 ? void 0 : n;
  }
  return y1.call(t, e) ? t[e] : void 0;
}
var C1 = Object.prototype, S1 = C1.hasOwnProperty;
function $1(e) {
  var t = this.__data__;
  return ni ? t[e] !== void 0 : S1.call(t, e);
}
var k1 = "__lodash_hash_undefined__";
function R1(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = ni && t === void 0 ? k1 : t, this;
}
function Fo(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Fo.prototype.clear = m1;
Fo.prototype.delete = g1;
Fo.prototype.get = x1;
Fo.prototype.has = $1;
Fo.prototype.set = R1;
function P1() {
  this.__data__ = [], this.size = 0;
}
function Ta(e, t) {
  for (var n = e.length; n--; )
    if (li(e[n][0], t))
      return n;
  return -1;
}
var _1 = Array.prototype, T1 = _1.splice;
function F1(e) {
  var t = this.__data__, n = Ta(t, e);
  if (n < 0)
    return !1;
  var o = t.length - 1;
  return n == o ? t.pop() : T1.call(t, n, 1), --this.size, !0;
}
function E1(e) {
  var t = this.__data__, n = Ta(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function O1(e) {
  return Ta(this.__data__, e) > -1;
}
function z1(e, t) {
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
Wn.prototype.clear = P1;
Wn.prototype.delete = F1;
Wn.prototype.get = E1;
Wn.prototype.has = O1;
Wn.prototype.set = z1;
var oi = Io(Fn, "Map");
function M1() {
  this.size = 0, this.__data__ = {
    hash: new Fo(),
    map: new (oi || Wn)(),
    string: new Fo()
  };
}
function I1(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Fa(e, t) {
  var n = e.__data__;
  return I1(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function A1(e) {
  var t = Fa(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function V1(e) {
  return Fa(this, e).get(e);
}
function B1(e) {
  return Fa(this, e).has(e);
}
function L1(e, t) {
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
Un.prototype.clear = M1;
Un.prototype.delete = A1;
Un.prototype.get = V1;
Un.prototype.has = B1;
Un.prototype.set = L1;
var D1 = "Expected a function";
function pd(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(D1);
  var n = function() {
    var o = arguments, r = t ? t.apply(this, o) : o[0], i = n.cache;
    if (i.has(r))
      return i.get(r);
    var a = e.apply(this, o);
    return n.cache = i.set(r, a) || i, a;
  };
  return n.cache = new (pd.Cache || Un)(), n;
}
pd.Cache = Un;
var N1 = 500;
function H1(e) {
  var t = pd(e, function(o) {
    return n.size === N1 && n.clear(), o;
  }), n = t.cache;
  return t;
}
var j1 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, W1 = /\\(\\)?/g, U1 = H1(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(j1, function(n, o, r, i) {
    t.push(r ? i.replace(W1, "$1") : o || n);
  }), t;
});
function Cp(e) {
  return e == null ? "" : vp(e);
}
function Sp(e, t) {
  return ln(e) ? e : hd(e, t) ? [e] : U1(Cp(e));
}
function Ea(e) {
  if (typeof e == "string" || rd(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function $p(e, t) {
  t = Sp(t, e);
  for (var n = 0, o = t.length; e != null && n < o; )
    e = e[Ea(t[n++])];
  return n && n == o ? e : void 0;
}
function ri(e, t, n) {
  var o = e == null ? void 0 : $p(e, t);
  return o === void 0 ? n : o;
}
function K1(e, t) {
  for (var n = -1, o = t.length, r = e.length; ++n < o; )
    e[r + n] = t[n];
  return e;
}
var kp = yp(Object.getPrototypeOf, Object), q1 = "[object Object]", G1 = Function.prototype, X1 = Object.prototype, Rp = G1.toString, Y1 = X1.hasOwnProperty, Z1 = Rp.call(Object);
function J1(e) {
  if (!uo(e) || zo(e) != q1)
    return !1;
  var t = kp(e);
  if (t === null)
    return !0;
  var n = Y1.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && Rp.call(n) == Z1;
}
function Q1(e, t, n) {
  var o = -1, r = e.length;
  t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var i = Array(r); ++o < r; )
    i[o] = e[o + t];
  return i;
}
function eS(e, t, n) {
  var o = e.length;
  return n = n === void 0 ? o : n, !t && n >= o ? e : Q1(e, t, n);
}
var tS = "\\ud800-\\udfff", nS = "\\u0300-\\u036f", oS = "\\ufe20-\\ufe2f", rS = "\\u20d0-\\u20ff", iS = nS + oS + rS, aS = "\\ufe0e\\ufe0f", lS = "\\u200d", sS = RegExp("[" + lS + tS + iS + aS + "]");
function Pp(e) {
  return sS.test(e);
}
function dS(e) {
  return e.split("");
}
var _p = "\\ud800-\\udfff", cS = "\\u0300-\\u036f", uS = "\\ufe20-\\ufe2f", fS = "\\u20d0-\\u20ff", hS = cS + uS + fS, pS = "\\ufe0e\\ufe0f", vS = "[" + _p + "]", ws = "[" + hS + "]", ys = "\\ud83c[\\udffb-\\udfff]", mS = "(?:" + ws + "|" + ys + ")", Tp = "[^" + _p + "]", Fp = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ep = "[\\ud800-\\udbff][\\udc00-\\udfff]", gS = "\\u200d", Op = mS + "?", zp = "[" + pS + "]?", bS = "(?:" + gS + "(?:" + [Tp, Fp, Ep].join("|") + ")" + zp + Op + ")*", wS = zp + Op + bS, yS = "(?:" + [Tp + ws + "?", ws, Fp, Ep, vS].join("|") + ")", xS = RegExp(ys + "(?=" + ys + ")|" + yS + wS, "g");
function CS(e) {
  return e.match(xS) || [];
}
function SS(e) {
  return Pp(e) ? CS(e) : dS(e);
}
function $S(e) {
  return function(t) {
    t = Cp(t);
    var n = Pp(t) ? SS(t) : void 0, o = n ? n[0] : t.charAt(0), r = n ? eS(n, 1).join("") : t.slice(1);
    return o[e]() + r;
  };
}
var kS = $S("toUpperCase");
function RS() {
  this.__data__ = new Wn(), this.size = 0;
}
function PS(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function _S(e) {
  return this.__data__.get(e);
}
function TS(e) {
  return this.__data__.has(e);
}
var FS = 200;
function ES(e, t) {
  var n = this.__data__;
  if (n instanceof Wn) {
    var o = n.__data__;
    if (!oi || o.length < FS - 1)
      return o.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new Un(o);
  }
  return n.set(e, t), this.size = n.size, this;
}
function Rn(e) {
  var t = this.__data__ = new Wn(e);
  this.size = t.size;
}
Rn.prototype.clear = RS;
Rn.prototype.delete = PS;
Rn.prototype.get = _S;
Rn.prototype.has = TS;
Rn.prototype.set = ES;
var Mp = typeof exports == "object" && exports && !exports.nodeType && exports, Yc = Mp && typeof module == "object" && module && !module.nodeType && module, OS = Yc && Yc.exports === Mp, Zc = OS ? Fn.Buffer : void 0;
Zc && Zc.allocUnsafe;
function zS(e, t) {
  return e.slice();
}
function MS(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = 0, i = []; ++n < o; ) {
    var a = e[n];
    t(a, n, e) && (i[r++] = a);
  }
  return i;
}
function IS() {
  return [];
}
var AS = Object.prototype, VS = AS.propertyIsEnumerable, Jc = Object.getOwnPropertySymbols, BS = Jc ? function(e) {
  return e == null ? [] : (e = Object(e), MS(Jc(e), function(t) {
    return VS.call(e, t);
  }));
} : IS;
function LS(e, t, n) {
  var o = t(e);
  return ln(e) ? o : K1(o, n(e));
}
function Qc(e) {
  return LS(e, fd, BS);
}
var xs = Io(Fn, "DataView"), Cs = Io(Fn, "Promise"), Ss = Io(Fn, "Set"), eu = "[object Map]", DS = "[object Object]", tu = "[object Promise]", nu = "[object Set]", ou = "[object WeakMap]", ru = "[object DataView]", NS = Mo(xs), HS = Mo(oi), jS = Mo(Cs), WS = Mo(Ss), US = Mo(bs), oo = zo;
(xs && oo(new xs(new ArrayBuffer(1))) != ru || oi && oo(new oi()) != eu || Cs && oo(Cs.resolve()) != tu || Ss && oo(new Ss()) != nu || bs && oo(new bs()) != ou) && (oo = function(e) {
  var t = zo(e), n = t == DS ? e.constructor : void 0, o = n ? Mo(n) : "";
  if (o)
    switch (o) {
      case NS:
        return ru;
      case HS:
        return eu;
      case jS:
        return tu;
      case WS:
        return nu;
      case US:
        return ou;
    }
  return t;
});
var ba = Fn.Uint8Array;
function KS(e) {
  var t = new e.constructor(e.byteLength);
  return new ba(t).set(new ba(e)), t;
}
function qS(e, t) {
  var n = KS(e.buffer);
  return new e.constructor(n, e.byteOffset, e.length);
}
function GS(e) {
  return typeof e.constructor == "function" && !cd(e) ? nC(kp(e)) : {};
}
var XS = "__lodash_hash_undefined__";
function YS(e) {
  return this.__data__.set(e, XS), this;
}
function ZS(e) {
  return this.__data__.has(e);
}
function wa(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new Un(); ++t < n; )
    this.add(e[t]);
}
wa.prototype.add = wa.prototype.push = YS;
wa.prototype.has = ZS;
function JS(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function QS(e, t) {
  return e.has(t);
}
var e$ = 1, t$ = 2;
function Ip(e, t, n, o, r, i) {
  var a = n & e$, l = e.length, s = t.length;
  if (l != s && !(a && s > l))
    return !1;
  var d = i.get(e), c = i.get(t);
  if (d && c)
    return d == t && c == e;
  var h = -1, p = !0, v = n & t$ ? new wa() : void 0;
  for (i.set(e, t), i.set(t, e); ++h < l; ) {
    var f = e[h], m = t[h];
    if (o)
      var g = a ? o(m, f, h, t, e, i) : o(f, m, h, e, t, i);
    if (g !== void 0) {
      if (g)
        continue;
      p = !1;
      break;
    }
    if (v) {
      if (!JS(t, function(u, b) {
        if (!QS(v, b) && (f === u || r(f, u, n, o, i)))
          return v.push(b);
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
function n$(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o, r) {
    n[++t] = [r, o];
  }), n;
}
function o$(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o) {
    n[++t] = o;
  }), n;
}
var r$ = 1, i$ = 2, a$ = "[object Boolean]", l$ = "[object Date]", s$ = "[object Error]", d$ = "[object Map]", c$ = "[object Number]", u$ = "[object RegExp]", f$ = "[object Set]", h$ = "[object String]", p$ = "[object Symbol]", v$ = "[object ArrayBuffer]", m$ = "[object DataView]", iu = co ? co.prototype : void 0, fl = iu ? iu.valueOf : void 0;
function g$(e, t, n, o, r, i, a) {
  switch (n) {
    case m$:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case v$:
      return !(e.byteLength != t.byteLength || !i(new ba(e), new ba(t)));
    case a$:
    case l$:
    case c$:
      return li(+e, +t);
    case s$:
      return e.name == t.name && e.message == t.message;
    case u$:
    case h$:
      return e == t + "";
    case d$:
      var l = n$;
    case f$:
      var s = o & r$;
      if (l || (l = o$), e.size != t.size && !s)
        return !1;
      var d = a.get(e);
      if (d)
        return d == t;
      o |= i$, a.set(e, t);
      var c = Ip(l(e), l(t), o, r, i, a);
      return a.delete(e), c;
    case p$:
      if (fl)
        return fl.call(e) == fl.call(t);
  }
  return !1;
}
var b$ = 1, w$ = Object.prototype, y$ = w$.hasOwnProperty;
function x$(e, t, n, o, r, i) {
  var a = n & b$, l = Qc(e), s = l.length, d = Qc(t), c = d.length;
  if (s != c && !a)
    return !1;
  for (var h = s; h--; ) {
    var p = l[h];
    if (!(a ? p in t : y$.call(t, p)))
      return !1;
  }
  var v = i.get(e), f = i.get(t);
  if (v && f)
    return v == t && f == e;
  var m = !0;
  i.set(e, t), i.set(t, e);
  for (var g = a; ++h < s; ) {
    p = l[h];
    var u = e[p], b = t[p];
    if (o)
      var x = a ? o(b, u, p, t, e, i) : o(u, b, p, e, t, i);
    if (!(x === void 0 ? u === b || r(u, b, n, o, i) : x)) {
      m = !1;
      break;
    }
    g || (g = p == "constructor");
  }
  if (m && !g) {
    var w = e.constructor, C = t.constructor;
    w != C && "constructor" in e && "constructor" in t && !(typeof w == "function" && w instanceof w && typeof C == "function" && C instanceof C) && (m = !1);
  }
  return i.delete(e), i.delete(t), m;
}
var C$ = 1, au = "[object Arguments]", lu = "[object Array]", ki = "[object Object]", S$ = Object.prototype, su = S$.hasOwnProperty;
function $$(e, t, n, o, r, i) {
  var a = ln(e), l = ln(t), s = a ? lu : oo(e), d = l ? lu : oo(t);
  s = s == au ? ki : s, d = d == au ? ki : d;
  var c = s == ki, h = d == ki, p = s == d;
  if (p && ga(e)) {
    if (!ga(t))
      return !1;
    a = !0, c = !1;
  }
  if (p && !c)
    return i || (i = new Rn()), a || ud(e) ? Ip(e, t, n, o, r, i) : g$(e, t, s, n, o, r, i);
  if (!(n & C$)) {
    var v = c && su.call(e, "__wrapped__"), f = h && su.call(t, "__wrapped__");
    if (v || f) {
      var m = v ? e.value() : e, g = f ? t.value() : t;
      return i || (i = new Rn()), r(m, g, n, o, i);
    }
  }
  return p ? (i || (i = new Rn()), x$(e, t, n, o, r, i)) : !1;
}
function vd(e, t, n, o, r) {
  return e === t ? !0 : e == null || t == null || !uo(e) && !uo(t) ? e !== e && t !== t : $$(e, t, n, o, vd, r);
}
var k$ = 1, R$ = 2;
function P$(e, t, n, o) {
  var r = n.length, i = r;
  if (e == null)
    return !i;
  for (e = Object(e); r--; ) {
    var a = n[r];
    if (a[2] ? a[1] !== e[a[0]] : !(a[0] in e))
      return !1;
  }
  for (; ++r < i; ) {
    a = n[r];
    var l = a[0], s = e[l], d = a[1];
    if (a[2]) {
      if (s === void 0 && !(l in e))
        return !1;
    } else {
      var c = new Rn(), h;
      if (!(h === void 0 ? vd(d, s, k$ | R$, o, c) : h))
        return !1;
    }
  }
  return !0;
}
function Ap(e) {
  return e === e && !po(e);
}
function _$(e) {
  for (var t = fd(e), n = t.length; n--; ) {
    var o = t[n], r = e[o];
    t[n] = [o, r, Ap(r)];
  }
  return t;
}
function Vp(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function T$(e) {
  var t = _$(e);
  return t.length == 1 && t[0][2] ? Vp(t[0][0], t[0][1]) : function(n) {
    return n === e || P$(n, e, t);
  };
}
function F$(e, t) {
  return e != null && t in Object(e);
}
function E$(e, t, n) {
  t = Sp(t, e);
  for (var o = -1, r = t.length, i = !1; ++o < r; ) {
    var a = Ea(t[o]);
    if (!(i = e != null && n(e, a)))
      break;
    e = e[a];
  }
  return i || ++o != r ? i : (r = e == null ? 0 : e.length, !!r && dd(r) && ld(a, r) && (ln(e) || ma(e)));
}
function O$(e, t) {
  return e != null && E$(e, t, F$);
}
var z$ = 1, M$ = 2;
function I$(e, t) {
  return hd(e) && Ap(t) ? Vp(Ea(e), t) : function(n) {
    var o = ri(n, e);
    return o === void 0 && o === t ? O$(n, e) : vd(t, o, z$ | M$);
  };
}
function A$(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function V$(e) {
  return function(t) {
    return $p(t, e);
  };
}
function B$(e) {
  return hd(e) ? A$(Ea(e)) : V$(e);
}
function L$(e) {
  return typeof e == "function" ? e : e == null ? id : typeof e == "object" ? ln(e) ? I$(e[0], e[1]) : T$(e) : B$(e);
}
function D$(e) {
  return function(t, n, o) {
    for (var r = -1, i = Object(t), a = o(t), l = a.length; l--; ) {
      var s = a[++r];
      if (n(i[s], s, i) === !1)
        break;
    }
    return t;
  };
}
var Bp = D$();
function N$(e, t) {
  return e && Bp(e, t, fd);
}
function H$(e, t) {
  return function(n, o) {
    if (n == null)
      return n;
    if (!sr(n))
      return e(n, o);
    for (var r = n.length, i = -1, a = Object(n); ++i < r && o(a[i], i, a) !== !1; )
      ;
    return n;
  };
}
var j$ = H$(N$);
function $s(e, t, n) {
  (n !== void 0 && !li(e[t], n) || n === void 0 && !(t in e)) && sd(e, t, n);
}
function W$(e) {
  return uo(e) && sr(e);
}
function ks(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function U$(e) {
  return gC(e, xp(e));
}
function K$(e, t, n, o, r, i, a) {
  var l = ks(e, n), s = ks(t, n), d = a.get(s);
  if (d) {
    $s(e, n, d);
    return;
  }
  var c = i ? i(l, s, n + "", e, t, a) : void 0, h = c === void 0;
  if (h) {
    var p = ln(s), v = !p && ga(s), f = !p && !v && ud(s);
    c = s, p || v || f ? ln(l) ? c = l : W$(l) ? c = rC(l) : v ? (h = !1, c = zS(s)) : f ? (h = !1, c = qS(s)) : c = [] : J1(s) || ma(s) ? (c = l, ma(l) ? c = U$(l) : (!po(l) || ad(l)) && (c = GS(s))) : h = !1;
  }
  h && (a.set(s, c), r(c, s, o, i, a), a.delete(s)), $s(e, n, c);
}
function Lp(e, t, n, o, r) {
  e !== t && Bp(t, function(i, a) {
    if (r || (r = new Rn()), po(i))
      K$(e, t, a, n, Lp, o, r);
    else {
      var l = o ? o(ks(e, a), i, a + "", e, t, r) : void 0;
      l === void 0 && (l = i), $s(e, a, l);
    }
  }, xp);
}
function q$(e, t) {
  var n = -1, o = sr(e) ? Array(e.length) : [];
  return j$(e, function(r, i, a) {
    o[++n] = t(r, i, a);
  }), o;
}
function G$(e, t) {
  var n = ln(e) ? pp : q$;
  return n(e, L$(t));
}
var Ri = CC(function(e, t, n) {
  Lp(e, t, n);
});
const du = window.Vue.computed, X$ = window.Vue.inject;
function dr(e) {
  const {
    mergedLocaleRef: t,
    mergedDateLocaleRef: n
  } = X$(Hn, null) || {}, o = du(() => {
    var i, a;
    return (a = (i = t == null ? void 0 : t.value) === null || i === void 0 ? void 0 : i[e]) !== null && a !== void 0 ? a : Xy[e];
  });
  return {
    dateLocaleRef: du(() => {
      var i;
      return (i = n == null ? void 0 : n.value) !== null && i !== void 0 ? i : Tx;
    }),
    localeRef: o
  };
}
const rr = "naive-ui-style", Y$ = window.Vue.computed, Z$ = window.Vue.inject, J$ = window.Vue.onBeforeMount, Q$ = window.Vue.watchEffect;
function zt(e, t, n) {
  if (!t) return;
  const o = Oo(), r = Y$(() => {
    const {
      value: l
    } = t;
    if (!l)
      return;
    const s = l[e];
    if (s)
      return s;
  }), i = Z$(Hn, null), a = () => {
    Q$(() => {
      const {
        value: l
      } = n, s = `${l}${e}Rtl`;
      if (yb(s, o)) return;
      const {
        value: d
      } = r;
      d && d.style.mount({
        id: s,
        head: !0,
        anchorMetaName: rr,
        props: {
          bPrefix: l ? `.${l}-` : void 0
        },
        ssr: o,
        parent: i == null ? void 0 : i.styleMountTarget
      });
    });
  };
  return o ? a() : J$(a), r;
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
  fontSize: ek,
  fontFamily: tk,
  lineHeight: nk
} = Ao, Dp = W("body", `
 margin: 0;
 font-size: ${ek};
 font-family: ${tk};
 line-height: ${nk};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [W("input", `
 font-family: inherit;
 font-size: inherit;
 `)]), ok = window.Vue.inject, rk = window.Vue.onBeforeMount;
function Vo(e, t, n) {
  if (!t)
    return;
  const o = Oo(), r = ok(Hn, null), i = () => {
    const a = n.value;
    t.mount({
      id: a === void 0 ? e : a + e,
      head: !0,
      anchorMetaName: rr,
      props: {
        bPrefix: a ? `.${a}-` : void 0
      },
      ssr: o,
      parent: r == null ? void 0 : r.styleMountTarget
    }), r != null && r.preflightStyleDisabled || Dp.mount({
      id: "n-global",
      head: !0,
      anchorMetaName: rr,
      ssr: o,
      parent: r == null ? void 0 : r.styleMountTarget
    });
  };
  o ? i() : rk(i);
}
const ik = window.Vue.computed, ak = window.Vue.inject, lk = window.Vue.onBeforeMount;
function _e(e, t, n, o, r, i) {
  const a = Oo(), l = ak(Hn, null);
  if (n) {
    const d = () => {
      const c = i == null ? void 0 : i.value;
      n.mount({
        id: c === void 0 ? t : c + t,
        head: !0,
        props: {
          bPrefix: c ? `.${c}-` : void 0
        },
        anchorMetaName: rr,
        ssr: a,
        parent: l == null ? void 0 : l.styleMountTarget
      }), l != null && l.preflightStyleDisabled || Dp.mount({
        id: "n-global",
        head: !0,
        anchorMetaName: rr,
        ssr: a,
        parent: l == null ? void 0 : l.styleMountTarget
      });
    };
    a ? d() : lk(d);
  }
  return ik(() => {
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
        common: b = void 0,
        self: x = void 0,
        peers: w = {}
      } = {}
    } = (l == null ? void 0 : l.mergedThemeRef.value) || {}, {
      common: C = void 0,
      [e]: S = {}
    } = (l == null ? void 0 : l.mergedThemeOverridesRef.value) || {}, {
      common: y,
      peers: T = {}
    } = S, k = Ri({}, c || b || u || o.common, C, y, m), E = Ri(
      // {}, executed every time, no need for empty obj
      (d = h || x || o.self) === null || d === void 0 ? void 0 : d(k),
      f,
      S,
      v
    );
    return {
      common: k,
      self: E,
      peers: Ri({}, o.peers, w, p),
      peerOverrides: Ri({}, f.peers, T, g)
    };
  });
}
_e.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object
};
const sk = V("base-icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [W("svg", `
 height: 1em;
 width: 1em;
 `)]), dk = window.Vue.defineComponent, ck = window.Vue.h, uk = window.Vue.toRef, Ct = dk({
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
    Vo("-base-icon", sk, uk(e, "clsPrefix"));
  },
  render() {
    return ck("i", {
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
}), fk = window.Vue.defineComponent, hk = window.Vue.h, pk = window.Vue.Transition, cr = fk({
  name: "BaseIconSwitchTransition",
  setup(e, {
    slots: t
  }) {
    const n = Pa();
    return () => hk(pk, {
      name: "icon-switch-transition",
      appear: n.value
    }, t);
  }
}), vk = window.Vue.defineComponent, cu = window.Vue.h, mk = vk({
  name: "Add",
  render() {
    return cu("svg", {
      width: "512",
      height: "512",
      viewBox: "0 0 512 512",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, cu("path", {
      d: "M256 112V400M400 256H112",
      stroke: "currentColor",
      "stroke-width": "32",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }));
  }
}), gk = window.Vue.defineComponent, Pi = window.Vue.h, bk = gk({
  name: "ArrowDown",
  render() {
    return Pi("svg", {
      viewBox: "0 0 28 28",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Pi("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, Pi("g", {
      "fill-rule": "nonzero"
    }, Pi("path", {
      d: "M23.7916,15.2664 C24.0788,14.9679 24.0696,14.4931 23.7711,14.206 C23.4726,13.9188 22.9978,13.928 22.7106,14.2265 L14.7511,22.5007 L14.7511,3.74792 C14.7511,3.33371 14.4153,2.99792 14.0011,2.99792 C13.5869,2.99792 13.2511,3.33371 13.2511,3.74793 L13.2511,22.4998 L5.29259,14.2265 C5.00543,13.928 4.53064,13.9188 4.23213,14.206 C3.93361,14.4931 3.9244,14.9679 4.21157,15.2664 L13.2809,24.6944 C13.6743,25.1034 14.3289,25.1034 14.7223,24.6944 L23.7916,15.2664 Z"
    }))));
  }
}), uu = window.Vue.defineComponent, wk = window.Vue.h, yk = window.Vue.inject;
function Np(e, t) {
  const n = uu({
    render() {
      return t();
    }
  });
  return uu({
    name: kS(e),
    setup() {
      var o;
      const r = (o = yk(Hn, null)) === null || o === void 0 ? void 0 : o.mergedIconsRef;
      return () => {
        var i;
        const a = (i = r == null ? void 0 : r.value) === null || i === void 0 ? void 0 : i[e];
        return a ? a() : wk(n, null);
      };
    }
  });
}
const xk = window.Vue.defineComponent, fu = window.Vue.h, hu = xk({
  name: "Backward",
  render() {
    return fu("svg", {
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, fu("path", {
      d: "M12.2674 15.793C11.9675 16.0787 11.4927 16.0672 11.2071 15.7673L6.20572 10.5168C5.9298 10.2271 5.9298 9.7719 6.20572 9.48223L11.2071 4.23177C11.4927 3.93184 11.9675 3.92031 12.2674 4.206C12.5673 4.49169 12.5789 4.96642 12.2932 5.26634L7.78458 9.99952L12.2932 14.7327C12.5789 15.0326 12.5673 15.5074 12.2674 15.793Z",
      fill: "currentColor"
    }));
  }
}), Ck = window.Vue.defineComponent, hl = window.Vue.h, Sk = Ck({
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
}), $k = window.Vue.defineComponent, pu = window.Vue.h, Hp = $k({
  name: "ChevronDown",
  render() {
    return pu("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, pu("path", {
      d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z",
      fill: "currentColor"
    }));
  }
}), kk = window.Vue.defineComponent, vu = window.Vue.h, jp = kk({
  name: "ChevronRight",
  render() {
    return vu("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, vu("path", {
      d: "M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z",
      fill: "currentColor"
    }));
  }
}), _i = window.Vue.h, Rk = Np("clear", () => _i("svg", {
  viewBox: "0 0 16 16",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, _i("g", {
  stroke: "none",
  "stroke-width": "1",
  fill: "none",
  "fill-rule": "evenodd"
}, _i("g", {
  fill: "currentColor",
  "fill-rule": "nonzero"
}, _i("path", {
  d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z"
}))))), Ti = window.Vue.h, Pk = Np("close", () => Ti("svg", {
  viewBox: "0 0 12 12",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": !0
}, Ti("g", {
  stroke: "none",
  "stroke-width": "1",
  fill: "none",
  "fill-rule": "evenodd"
}, Ti("g", {
  fill: "currentColor",
  "fill-rule": "nonzero"
}, Ti("path", {
  d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
}))))), _k = window.Vue.defineComponent, pl = window.Vue.h, Tk = _k({
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
}), Fk = window.Vue.defineComponent, vl = window.Vue.h, Ek = Fk({
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
}), Ok = window.Vue.defineComponent, Ho = window.Vue.h, zk = Ok({
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
}), Mk = window.Vue.defineComponent, Fi = window.Vue.h, mu = Mk({
  name: "FastBackward",
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
      d: "M8.73171,16.7949 C9.03264,17.0795 9.50733,17.0663 9.79196,16.7654 C10.0766,16.4644 10.0634,15.9897 9.76243,15.7051 L4.52339,10.75 L17.2471,10.75 C17.6613,10.75 17.9971,10.4142 17.9971,10 C17.9971,9.58579 17.6613,9.25 17.2471,9.25 L4.52112,9.25 L9.76243,4.29275 C10.0634,4.00812 10.0766,3.53343 9.79196,3.2325 C9.50733,2.93156 9.03264,2.91834 8.73171,3.20297 L2.31449,9.27241 C2.14819,9.4297 2.04819,9.62981 2.01448,9.8386 C2.00308,9.89058 1.99707,9.94459 1.99707,10 C1.99707,10.0576 2.00356,10.1137 2.01585,10.1675 C2.05084,10.3733 2.15039,10.5702 2.31449,10.7254 L8.73171,16.7949 Z"
    }))));
  }
}), Ik = window.Vue.defineComponent, Ei = window.Vue.h, gu = Ik({
  name: "FastForward",
  render() {
    return Ei("svg", {
      viewBox: "0 0 20 20",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Ei("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, Ei("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, Ei("path", {
      d: "M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z"
    }))));
  }
}), Ak = window.Vue.defineComponent, Oi = window.Vue.h, Vk = Ak({
  name: "Filter",
  render() {
    return Oi("svg", {
      viewBox: "0 0 28 28",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Oi("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, Oi("g", {
      "fill-rule": "nonzero"
    }, Oi("path", {
      d: "M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z"
    }))));
  }
}), Bk = window.Vue.defineComponent, bu = window.Vue.h, wu = Bk({
  name: "Forward",
  render() {
    return bu("svg", {
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, bu("path", {
      d: "M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z",
      fill: "currentColor"
    }));
  }
}), Lk = window.Vue.defineComponent, zi = window.Vue.h, yu = Lk({
  name: "More",
  render() {
    return zi("svg", {
      viewBox: "0 0 16 16",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, zi("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, zi("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, zi("path", {
      d: "M4,7 C4.55228,7 5,7.44772 5,8 C5,8.55229 4.55228,9 4,9 C3.44772,9 3,8.55229 3,8 C3,7.44772 3.44772,7 4,7 Z M8,7 C8.55229,7 9,7.44772 9,8 C9,8.55229 8.55229,9 8,9 C7.44772,9 7,8.55229 7,8 C7,7.44772 7.44772,7 8,7 Z M12,7 C12.5523,7 13,7.44772 13,8 C13,8.55229 12.5523,9 12,9 C11.4477,9 11,8.55229 11,8 C11,7.44772 11.4477,7 12,7 Z"
    }))));
  }
}), Dk = window.Vue.defineComponent, xu = window.Vue.h, Nk = Dk({
  name: "Remove",
  render() {
    return xu("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, xu("line", {
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
  cubicBezierEaseInOut: Hk
} = Ao;
function rn({
  originalTransform: e = "",
  left: t = 0,
  top: n = 0,
  transition: o = `all .3s ${Hk} !important`
} = {}) {
  return [W("&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to", {
    transform: `${e} scale(0.75)`,
    left: t,
    top: n,
    opacity: 0
  }), W("&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from", {
    transform: `scale(1) ${e}`,
    left: t,
    top: n,
    opacity: 1
  }), W("&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active", {
    transformOrigin: "center",
    position: "absolute",
    left: t,
    top: n,
    transition: o
  })];
}
const jk = V("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [W(">", [D("clear", `
 font-size: var(--n-clear-size);
 height: 1em;
 width: 1em;
 cursor: pointer;
 color: var(--n-clear-color);
 transition: color .3s var(--n-bezier);
 display: flex;
 `, [W("&:hover", `
 color: var(--n-clear-color-hover)!important;
 `), W("&:active", `
 color: var(--n-clear-color-pressed)!important;
 `)]), D("placeholder", `
 display: flex;
 `), D("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [rn({
  originalTransform: "translateX(-50%) translateY(-50%)",
  left: "50%",
  top: "50%"
})])])]), Wk = window.Vue.defineComponent, jo = window.Vue.h, Uk = window.Vue.toRef, Rs = Wk({
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
    return Vo("-base-clear", jk, Uk(e, "clsPrefix")), {
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
    }, jo(cr, null, {
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
          default: () => jo(Rk, null)
        })])) : jo("div", {
          key: "icon",
          class: `${e}-base-clear__placeholder`
        }, (n = (t = this.$slots).placeholder) === null || n === void 0 ? void 0 : n.call(t));
      }
    }));
  }
}), Kk = V("base-close", `
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
`, [X("absolute", `
 height: var(--n-close-icon-size);
 width: var(--n-close-icon-size);
 `), W("&::before", `
 content: "";
 position: absolute;
 width: var(--n-close-size);
 height: var(--n-close-size);
 left: 50%;
 top: 50%;
 transform: translateY(-50%) translateX(-50%);
 transition: inherit;
 border-radius: inherit;
 `), Qe("disabled", [W("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), W("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), W("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), W("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), W("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), X("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), X("round", [W("&::before", `
 border-radius: 50%;
 `)])]), qk = window.Vue.defineComponent, ml = window.Vue.h, Gk = window.Vue.toRef, Wp = qk({
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
    return Vo("-base-close", Kk, Gk(e, "clsPrefix")), () => {
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
        onMousedown: (l) => {
          e.focusable || l.preventDefault();
        },
        onClick: e.onClick
      }, ml(Ct, {
        clsPrefix: t
      }, {
        default: () => ml(Pk, null)
      }));
    };
  }
}), Xk = window.Vue.defineComponent, Yk = window.Vue.h, Zk = window.Vue.Transition, Jk = window.Vue.TransitionGroup, Qk = Xk({
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
    function n(l) {
      e.width ? l.style.maxWidth = `${l.offsetWidth}px` : l.style.maxHeight = `${l.offsetHeight}px`, l.offsetWidth;
    }
    function o(l) {
      e.width ? l.style.maxWidth = "0" : l.style.maxHeight = "0", l.offsetWidth;
      const {
        onLeave: s
      } = e;
      s && s();
    }
    function r(l) {
      e.width ? l.style.maxWidth = "" : l.style.maxHeight = "";
      const {
        onAfterLeave: s
      } = e;
      s && s();
    }
    function i(l) {
      if (l.style.transition = "none", e.width) {
        const s = l.offsetWidth;
        l.style.maxWidth = "0", l.offsetWidth, l.style.transition = "", l.style.maxWidth = `${s}px`;
      } else if (e.reverse)
        l.style.maxHeight = `${l.offsetHeight}px`, l.offsetHeight, l.style.transition = "", l.style.maxHeight = "0";
      else {
        const s = l.offsetHeight;
        l.style.maxHeight = "0", l.offsetWidth, l.style.transition = "", l.style.maxHeight = `${s}px`;
      }
      l.offsetWidth;
    }
    function a(l) {
      var s;
      e.width ? l.style.maxWidth = "" : e.reverse || (l.style.maxHeight = ""), (s = e.onAfterEnter) === null || s === void 0 || s.call(e);
    }
    return () => {
      const {
        group: l,
        width: s,
        appear: d,
        mode: c
      } = e, h = l ? Jk : Zk, p = {
        name: s ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
        appear: d,
        onEnter: i,
        onAfterEnter: a,
        onBeforeLeave: n,
        onLeave: o,
        onAfterLeave: r
      };
      return l || (p.mode = c), Yk(h, p, t);
    };
  }
}), eR = window.Vue.defineComponent, tR = window.Vue.h, nR = eR({
  props: {
    onFocus: Function,
    onBlur: Function
  },
  setup(e) {
    return () => tR("div", {
      style: "width: 0; height: 0",
      tabindex: 0,
      onFocus: e.onFocus,
      onBlur: e.onBlur
    });
  }
}), oR = W([W("@keyframes rotator", `
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`), V("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [D("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [rn()]), D("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [rn({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})]), D("container", `
 animation: rotator 3s linear infinite both;
 `, [D("icon", `
 height: 1em;
 width: 1em;
 `)])])]), rR = window.Vue.defineComponent, sn = window.Vue.h, iR = window.Vue.toRef, gl = "1.6s", aR = {
  strokeWidth: {
    type: Number,
    default: 28
  },
  stroke: {
    type: String,
    default: void 0
  }
}, ur = rR({
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
  }, aR),
  setup(e) {
    Vo("-base-loading", oR, iR(e, "clsPrefix"));
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
    }, sn(cr, null, {
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
  cubicBezierEaseInOut: Cu
} = Ao;
function lR({
  name: e = "fade-in",
  enterDuration: t = "0.2s",
  leaveDuration: n = "0.2s",
  enterCubicBezier: o = Cu,
  leaveCubicBezier: r = Cu
} = {}) {
  return [W(`&.${e}-transition-enter-active`, {
    transition: `all ${t} ${o}!important`
  }), W(`&.${e}-transition-leave-active`, {
    transition: `all ${n} ${r}!important`
  }), W(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
    opacity: 0
  }), W(`&.${e}-transition-leave-from, &.${e}-transition-enter-to`, {
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
}, sR = lo(Pe.neutralBase), Up = lo(Pe.neutralInvertBase), dR = `rgba(${Up.slice(0, 3).join(", ")}, `;
function Su(e) {
  return `${dR + String(e)})`;
}
function _t(e) {
  const t = Array.from(Up);
  return t[3] = Number(e), je(sR, t);
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
  iconColorHover: gi(_t(Pe.alpha4), {
    lightness: 0.75
  }),
  iconColorPressed: gi(_t(Pe.alpha4), {
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
  clearColorHover: gi(_t(Pe.alpha4), {
    lightness: 0.75
  }),
  clearColorPressed: gi(_t(Pe.alpha4), {
    lightness: 0.9
  }),
  scrollbarColor: Su(Pe.alphaScrollbar),
  scrollbarColorHover: Su(Pe.alphaScrollbarHover),
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
}), cR = {
  railInsetHorizontalBottom: "auto 2px 4px 2px",
  railInsetHorizontalTop: "4px 2px auto 2px",
  railInsetVerticalRight: "2px 4px 2px auto",
  railInsetVerticalLeft: "2px auto 2px 4px",
  railColor: "transparent"
};
function uR(e) {
  const {
    scrollbarColor: t,
    scrollbarColorHover: n,
    scrollbarHeight: o,
    scrollbarWidth: r,
    scrollbarBorderRadius: i
  } = e;
  return Object.assign(Object.assign({}, cR), {
    height: o,
    width: r,
    borderRadius: i,
    color: t,
    colorHover: n
  });
}
const si = {
  name: "Scrollbar",
  common: vt,
  self: uR
}, fR = V("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [W(">", [V("scrollbar-container", `
 width: 100%;
 overflow: scroll;
 height: 100%;
 min-height: inherit;
 max-height: inherit;
 scrollbar-width: none;
 `, [W("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), W(">", [
  // We can't set overflow hidden since it affects positioning.
  V("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)
])])]), W(">, +", [V("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `, [X("horizontal", `
 height: var(--n-scrollbar-height);
 `, [W(">", [D("scrollbar", `
 height: var(--n-scrollbar-height);
 border-radius: var(--n-scrollbar-border-radius);
 right: 0;
 `)])]), X("horizontal--top", `
 top: var(--n-scrollbar-rail-top-horizontal-top); 
 right: var(--n-scrollbar-rail-right-horizontal-top); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-top); 
 left: var(--n-scrollbar-rail-left-horizontal-top); 
 `), X("horizontal--bottom", `
 top: var(--n-scrollbar-rail-top-horizontal-bottom); 
 right: var(--n-scrollbar-rail-right-horizontal-bottom); 
 bottom: var(--n-scrollbar-rail-bottom-horizontal-bottom); 
 left: var(--n-scrollbar-rail-left-horizontal-bottom); 
 `), X("vertical", `
 width: var(--n-scrollbar-width);
 `, [W(">", [D("scrollbar", `
 width: var(--n-scrollbar-width);
 border-radius: var(--n-scrollbar-border-radius);
 bottom: 0;
 `)])]), X("vertical--left", `
 top: var(--n-scrollbar-rail-top-vertical-left); 
 right: var(--n-scrollbar-rail-right-vertical-left); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-left); 
 left: var(--n-scrollbar-rail-left-vertical-left); 
 `), X("vertical--right", `
 top: var(--n-scrollbar-rail-top-vertical-right); 
 right: var(--n-scrollbar-rail-right-vertical-right); 
 bottom: var(--n-scrollbar-rail-bottom-vertical-right); 
 left: var(--n-scrollbar-rail-left-vertical-right); 
 `), X("disabled", [W(">", [D("scrollbar", "pointer-events: none;")])]), W(">", [D("scrollbar", `
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [lR(), W("&:hover", "background-color: var(--n-scrollbar-color-hover);")])])])])]), At = window.Vue.computed, hR = window.Vue.defineComponent, pR = window.Vue.Fragment, en = window.Vue.h, vR = window.Vue.mergeProps, mR = window.Vue.onBeforeUnmount, gR = window.Vue.onMounted, Vt = window.Vue.ref, $u = window.Vue.Transition, bR = window.Vue.watchEffect, wR = Object.assign(Object.assign({}, _e.props), {
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
}), di = hR({
  name: "Scrollbar",
  props: wR,
  inheritAttrs: !1,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n,
      mergedRtlRef: o
    } = qe(e), r = zt("Scrollbar", o, t), i = Vt(null), a = Vt(null), l = Vt(null), s = Vt(null), d = Vt(null), c = Vt(null), h = Vt(null), p = Vt(null), v = Vt(null), f = Vt(null), m = Vt(null), g = Vt(0), u = Vt(0), b = Vt(!1), x = Vt(!1);
    let w = !1, C = !1, S, y, T = 0, k = 0, E = 0, U = 0;
    const _ = fw(), M = _e("Scrollbar", "-scrollbar", fR, si, e, t), I = At(() => {
      const {
        value: P
      } = p, {
        value: H
      } = c, {
        value: oe
      } = f;
      return P === null || H === null || oe === null ? 0 : Math.min(P, oe * P / H + xt(M.value.self.width) * 1.5);
    }), z = At(() => `${I.value}px`), G = At(() => {
      const {
        value: P
      } = v, {
        value: H
      } = h, {
        value: oe
      } = m;
      return P === null || H === null || oe === null ? 0 : oe * P / H + xt(M.value.self.height) * 1.5;
    }), L = At(() => `${G.value}px`), Z = At(() => {
      const {
        value: P
      } = p, {
        value: H
      } = g, {
        value: oe
      } = c, {
        value: ce
      } = f;
      if (P === null || oe === null || ce === null)
        return 0;
      {
        const ue = oe - P;
        return ue ? H / ue * (ce - I.value) : 0;
      }
    }), te = At(() => `${Z.value}px`), q = At(() => {
      const {
        value: P
      } = v, {
        value: H
      } = u, {
        value: oe
      } = h, {
        value: ce
      } = m;
      if (P === null || oe === null || ce === null)
        return 0;
      {
        const ue = oe - P;
        return ue ? H / ue * (ce - G.value) : 0;
      }
    }), A = At(() => `${q.value}px`), F = At(() => {
      const {
        value: P
      } = p, {
        value: H
      } = c;
      return P !== null && H !== null && H > P;
    }), j = At(() => {
      const {
        value: P
      } = v, {
        value: H
      } = h;
      return P !== null && H !== null && H > P;
    }), J = At(() => {
      const {
        trigger: P
      } = e;
      return P === "none" || b.value;
    }), Q = At(() => {
      const {
        trigger: P
      } = e;
      return P === "none" || x.value;
    }), ee = At(() => {
      const {
        container: P
      } = e;
      return P ? P() : a.value;
    }), de = At(() => {
      const {
        content: P
      } = e;
      return P ? P() : l.value;
    }), pe = (P, H) => {
      if (!e.scrollable) return;
      if (typeof P == "number") {
        be(P, H ?? 0, 0, !1, "auto");
        return;
      }
      const {
        left: oe,
        top: ce,
        index: ue,
        elSize: we,
        position: ye,
        behavior: ke,
        el: Ae,
        debounce: ot = !0
      } = P;
      (oe !== void 0 || ce !== void 0) && be(oe ?? 0, ce ?? 0, 0, !1, ke), Ae !== void 0 ? be(0, Ae.offsetTop, Ae.offsetHeight, ot, ke) : ue !== void 0 && we !== void 0 ? be(0, ue * we, we, ot, ke) : ye === "bottom" ? be(0, Number.MAX_SAFE_INTEGER, 0, !1, ke) : ye === "top" && be(0, 0, 0, !1, ke);
    }, Y = Vw(() => {
      e.container || pe({
        top: g.value,
        left: u.value
      });
    }), se = () => {
      Y.isDeactivated || K();
    }, $e = (P) => {
      if (Y.isDeactivated) return;
      const {
        onResize: H
      } = e;
      H && H(P), K();
    }, me = (P, H) => {
      if (!e.scrollable) return;
      const {
        value: oe
      } = ee;
      oe && (typeof P == "object" ? oe.scrollBy(P) : oe.scrollBy(P, H || 0));
    };
    function be(P, H, oe, ce, ue) {
      const {
        value: we
      } = ee;
      if (we) {
        if (ce) {
          const {
            scrollTop: ye,
            offsetHeight: ke
          } = we;
          if (H > ye) {
            H + oe <= ye + ke || we.scrollTo({
              left: P,
              top: H + oe - ke,
              behavior: ue
            });
            return;
          }
        }
        we.scrollTo({
          left: P,
          top: H,
          behavior: ue
        });
      }
    }
    function Ce() {
      $(), N(), K();
    }
    function Be() {
      Me();
    }
    function Me() {
      ie(), R();
    }
    function ie() {
      y !== void 0 && window.clearTimeout(y), y = window.setTimeout(() => {
        x.value = !1;
      }, e.duration);
    }
    function R() {
      S !== void 0 && window.clearTimeout(S), S = window.setTimeout(() => {
        b.value = !1;
      }, e.duration);
    }
    function $() {
      S !== void 0 && window.clearTimeout(S), b.value = !0;
    }
    function N() {
      y !== void 0 && window.clearTimeout(y), x.value = !0;
    }
    function ne(P) {
      const {
        onScroll: H
      } = e;
      H && H(P), ge();
    }
    function ge() {
      const {
        value: P
      } = ee;
      P && (g.value = P.scrollTop, u.value = P.scrollLeft * (r != null && r.value ? -1 : 1));
    }
    function he() {
      const {
        value: P
      } = de;
      P && (c.value = P.offsetHeight, h.value = P.offsetWidth);
      const {
        value: H
      } = ee;
      H && (p.value = H.offsetHeight, v.value = H.offsetWidth);
      const {
        value: oe
      } = d, {
        value: ce
      } = s;
      oe && (m.value = oe.offsetWidth), ce && (f.value = ce.offsetHeight);
    }
    function O() {
      const {
        value: P
      } = ee;
      P && (g.value = P.scrollTop, u.value = P.scrollLeft * (r != null && r.value ? -1 : 1), p.value = P.offsetHeight, v.value = P.offsetWidth, c.value = P.scrollHeight, h.value = P.scrollWidth);
      const {
        value: H
      } = d, {
        value: oe
      } = s;
      H && (m.value = H.offsetWidth), oe && (f.value = oe.offsetHeight);
    }
    function K() {
      e.scrollable && (e.useUnifiedContainer ? O() : (he(), ge()));
    }
    function ve(P) {
      var H;
      return !(!((H = i.value) === null || H === void 0) && H.contains(Zr(P)));
    }
    function Te(P) {
      P.preventDefault(), P.stopPropagation(), C = !0, at("mousemove", window, lt, !0), at("mouseup", window, pt, !0), k = u.value, E = r != null && r.value ? window.innerWidth - P.clientX : P.clientX;
    }
    function lt(P) {
      if (!C) return;
      S !== void 0 && window.clearTimeout(S), y !== void 0 && window.clearTimeout(y);
      const {
        value: H
      } = v, {
        value: oe
      } = h, {
        value: ce
      } = G;
      if (H === null || oe === null) return;
      const we = (r != null && r.value ? window.innerWidth - P.clientX - E : P.clientX - E) * (oe - H) / (H - ce), ye = oe - H;
      let ke = k + we;
      ke = Math.min(ye, ke), ke = Math.max(ke, 0);
      const {
        value: Ae
      } = ee;
      if (Ae) {
        Ae.scrollLeft = ke * (r != null && r.value ? -1 : 1);
        const {
          internalOnUpdateScrollLeft: ot
        } = e;
        ot && ot(ke);
      }
    }
    function pt(P) {
      P.preventDefault(), P.stopPropagation(), Je("mousemove", window, lt, !0), Je("mouseup", window, pt, !0), C = !1, K(), ve(P) && Me();
    }
    function Ye(P) {
      P.preventDefault(), P.stopPropagation(), w = !0, at("mousemove", window, Ze, !0), at("mouseup", window, mt, !0), T = g.value, U = P.clientY;
    }
    function Ze(P) {
      if (!w) return;
      S !== void 0 && window.clearTimeout(S), y !== void 0 && window.clearTimeout(y);
      const {
        value: H
      } = p, {
        value: oe
      } = c, {
        value: ce
      } = I;
      if (H === null || oe === null) return;
      const we = (P.clientY - U) * (oe - H) / (H - ce), ye = oe - H;
      let ke = T + we;
      ke = Math.min(ye, ke), ke = Math.max(ke, 0);
      const {
        value: Ae
      } = ee;
      Ae && (Ae.scrollTop = ke);
    }
    function mt(P) {
      P.preventDefault(), P.stopPropagation(), Je("mousemove", window, Ze, !0), Je("mouseup", window, mt, !0), w = !1, K(), ve(P) && Me();
    }
    bR(() => {
      const {
        value: P
      } = j, {
        value: H
      } = F, {
        value: oe
      } = t, {
        value: ce
      } = d, {
        value: ue
      } = s;
      ce && (P ? ce.classList.remove(`${oe}-scrollbar-rail--disabled`) : ce.classList.add(`${oe}-scrollbar-rail--disabled`)), ue && (H ? ue.classList.remove(`${oe}-scrollbar-rail--disabled`) : ue.classList.add(`${oe}-scrollbar-rail--disabled`));
    }), gR(() => {
      e.container || K();
    }), mR(() => {
      S !== void 0 && window.clearTimeout(S), y !== void 0 && window.clearTimeout(y), Je("mousemove", window, Ze, !0), Je("mouseup", window, mt, !0);
    });
    const et = At(() => {
      const {
        common: {
          cubicBezierEaseInOut: P
        },
        self: {
          color: H,
          colorHover: oe,
          height: ce,
          width: ue,
          borderRadius: we,
          railInsetHorizontalTop: ye,
          railInsetHorizontalBottom: ke,
          railInsetVerticalRight: Ae,
          railInsetVerticalLeft: ot,
          railColor: Ne
        }
      } = M.value, {
        top: Pt,
        right: Mt,
        bottom: It,
        left: Nt
      } = Yt(ye), {
        top: Ht,
        right: Qt,
        bottom: jt,
        left: B
      } = Yt(ke), {
        top: re,
        right: Se,
        bottom: Oe,
        left: He
      } = Yt(r != null && r.value ? Mc(Ae) : Ae), {
        top: Ve,
        right: rt,
        bottom: ct,
        left: Xt
      } = Yt(r != null && r.value ? Mc(ot) : ot);
      return {
        "--n-scrollbar-bezier": P,
        "--n-scrollbar-color": H,
        "--n-scrollbar-color-hover": oe,
        "--n-scrollbar-border-radius": we,
        "--n-scrollbar-width": ue,
        "--n-scrollbar-height": ce,
        "--n-scrollbar-rail-top-horizontal-top": Pt,
        "--n-scrollbar-rail-right-horizontal-top": Mt,
        "--n-scrollbar-rail-bottom-horizontal-top": It,
        "--n-scrollbar-rail-left-horizontal-top": Nt,
        "--n-scrollbar-rail-top-horizontal-bottom": Ht,
        "--n-scrollbar-rail-right-horizontal-bottom": Qt,
        "--n-scrollbar-rail-bottom-horizontal-bottom": jt,
        "--n-scrollbar-rail-left-horizontal-bottom": B,
        "--n-scrollbar-rail-top-vertical-right": re,
        "--n-scrollbar-rail-right-vertical-right": Se,
        "--n-scrollbar-rail-bottom-vertical-right": Oe,
        "--n-scrollbar-rail-left-vertical-right": He,
        "--n-scrollbar-rail-top-vertical-left": Ve,
        "--n-scrollbar-rail-right-vertical-left": rt,
        "--n-scrollbar-rail-bottom-vertical-left": ct,
        "--n-scrollbar-rail-left-vertical-left": Xt,
        "--n-scrollbar-rail-color": Ne
      };
    }), fe = n ? wt("scrollbar", void 0, et, e) : void 0;
    return Object.assign(Object.assign({}, {
      scrollTo: pe,
      scrollBy: me,
      sync: K,
      syncUnifiedContainer: O,
      handleMouseEnterWrapper: Ce,
      handleMouseLeaveWrapper: Be
    }), {
      mergedClsPrefix: t,
      rtlEnabled: r,
      containerScrollTop: g,
      wrapperRef: i,
      containerRef: a,
      contentRef: l,
      yRailRef: s,
      xRailRef: d,
      needYBar: F,
      needXBar: j,
      yBarSizePx: z,
      xBarSizePx: L,
      yBarTopPx: te,
      xBarLeftPx: A,
      isShowXBar: J,
      isShowYBar: Q,
      isIos: _,
      handleScroll: ne,
      handleContentResize: se,
      handleContainerResize: $e,
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
      yPlacement: a,
      xPlacement: l,
      xScrollable: s
    } = this;
    if (!this.scrollable) return (e = t.default) === null || e === void 0 ? void 0 : e.call(t);
    const d = this.trigger === "none", c = (v, f) => en("div", {
      ref: "yRailRef",
      class: [`${n}-scrollbar-rail`, `${n}-scrollbar-rail--vertical`, `${n}-scrollbar-rail--vertical--${a}`, v],
      "data-scrollbar-rail": !0,
      style: [f || "", this.verticalRailStyle],
      "aria-hidden": !0
    }, en(d ? ms : $u, d ? null : {
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
      return (v = this.onRender) === null || v === void 0 || v.call(this), en("div", vR(this.$attrs, {
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
        class: [`${n}-scrollbar-rail`, `${n}-scrollbar-rail--horizontal`, `${n}-scrollbar-rail--horizontal--${l}`],
        style: this.horizontalRailStyle,
        "data-scrollbar-rail": !0,
        "aria-hidden": !0
      }, en(d ? ms : $u, d ? null : {
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
    return i ? en(pR, null, p, c(this.themeClass, this.cssVars)) : p;
  }
}), Kp = di;
function ku(e) {
  return Array.isArray(e) ? e : [e];
}
const Ps = {
  STOP: "STOP"
};
function qp(e, t) {
  const n = t(e);
  e.children !== void 0 && n !== Ps.STOP && e.children.forEach((o) => qp(o, t));
}
function yR(e, t = {}) {
  const { preserveGroup: n = !1 } = t, o = [], r = n ? (a) => {
    a.isLeaf || (o.push(a.key), i(a.children));
  } : (a) => {
    a.isLeaf || (a.isGroup || o.push(a.key), i(a.children));
  };
  function i(a) {
    a.forEach(r);
  }
  return i(e), o;
}
function xR(e, t) {
  const { isLeaf: n } = e;
  return n !== void 0 ? n : !t(e);
}
function CR(e) {
  return e.children;
}
function SR(e) {
  return e.key;
}
function $R() {
  return !1;
}
function kR(e, t) {
  const { isLeaf: n } = e;
  return !(n === !1 && !Array.isArray(t(e)));
}
function RR(e) {
  return e.disabled === !0;
}
function PR(e, t) {
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
function _R(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) || n.add(o);
  }), Array.from(n);
}
function TR(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) && n.delete(o);
  }), Array.from(n);
}
function FR(e) {
  return (e == null ? void 0 : e.type) === "group";
}
function ER(e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((n, o) => {
    t.set(n.key, o);
  }), (n) => {
    var o;
    return (o = t.get(n)) !== null && o !== void 0 ? o : null;
  };
}
class OR extends Error {
  constructor() {
    super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
  }
}
function zR(e, t, n, o) {
  return ya(t.concat(e), n, o, !1);
}
function MR(e, t) {
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
function IR(e, t, n, o) {
  const r = ya(t, n, o, !1), i = ya(e, n, o, !0), a = MR(e, n), l = [];
  return r.forEach((s) => {
    (i.has(s) || a.has(s)) && l.push(s);
  }), l.forEach((s) => r.delete(s)), r;
}
function yl(e, t) {
  const { checkedKeys: n, keysToCheck: o, keysToUncheck: r, indeterminateKeys: i, cascade: a, leafOnly: l, checkStrategy: s, allowNotLoaded: d } = e;
  if (!a)
    return o !== void 0 ? {
      checkedKeys: _R(n, o),
      indeterminateKeys: Array.from(i)
    } : r !== void 0 ? {
      checkedKeys: TR(n, r),
      indeterminateKeys: Array.from(i)
    } : {
      checkedKeys: Array.from(n),
      indeterminateKeys: Array.from(i)
    };
  const { levelTreeNodeMap: c } = t;
  let h;
  r !== void 0 ? h = IR(r, n, t, d) : o !== void 0 ? h = zR(o, n, t, d) : h = ya(n, t, d, !1);
  const p = s === "parent", v = s === "child" || l, f = h, m = /* @__PURE__ */ new Set(), g = Math.max.apply(null, Array.from(c.keys()));
  for (let u = g; u >= 0; u -= 1) {
    const b = u === 0, x = c.get(u);
    for (const w of x) {
      if (w.isLeaf)
        continue;
      const { key: C, shallowLoaded: S } = w;
      if (v && S && w.children.forEach((E) => {
        !E.disabled && !E.isLeaf && E.shallowLoaded && f.has(E.key) && f.delete(E.key);
      }), w.disabled || !S)
        continue;
      let y = !0, T = !1, k = !0;
      for (const E of w.children) {
        const U = E.key;
        if (!E.disabled) {
          if (k && (k = !1), f.has(U))
            T = !0;
          else if (m.has(U)) {
            T = !0, y = !1;
            break;
          } else if (y = !1, T)
            break;
        }
      }
      y && !k ? (p && w.children.forEach((E) => {
        !E.disabled && f.has(E.key) && f.delete(E.key);
      }), f.add(C)) : T && m.add(C), b && v && f.has(C) && f.delete(C);
    }
  }
  return {
    checkedKeys: Array.from(f),
    indeterminateKeys: Array.from(m)
  };
}
function ya(e, t, n, o) {
  const { treeNodeMap: r, getChildren: i } = t, a = /* @__PURE__ */ new Set(), l = new Set(e);
  return e.forEach((s) => {
    const d = r.get(s);
    d !== void 0 && qp(d, (c) => {
      if (c.disabled)
        return Ps.STOP;
      const { key: h } = c;
      if (!a.has(h) && (a.add(h), l.add(h), PR(c.rawNode, i))) {
        if (o)
          return Ps.STOP;
        if (!n)
          throw new OR();
      }
    });
  }), l;
}
function AR(e, { includeGroup: t = !1, includeSelf: n = !0 }, o) {
  var r;
  const i = o.treeNodeMap;
  let a = e == null ? null : (r = i.get(e)) !== null && r !== void 0 ? r : null;
  const l = {
    keyPath: [],
    treeNodePath: [],
    treeNode: a
  };
  if (a != null && a.ignored)
    return l.treeNode = null, l;
  for (; a; )
    !a.ignored && (t || !a.isGroup) && l.treeNodePath.push(a), a = a.parent;
  return l.treeNodePath.reverse(), n || l.treeNodePath.pop(), l.keyPath = l.treeNodePath.map((s) => s.key), l;
}
function VR(e) {
  if (e.length === 0)
    return null;
  const t = e[0];
  return t.isGroup || t.ignored || t.disabled ? t.getNext() : t;
}
function BR(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r + 1) % o] : r === n.length - 1 ? null : n[r + 1];
}
function Ru(e, t, { loop: n = !1, includeDisabled: o = !1 } = {}) {
  const r = t === "prev" ? LR : BR, i = {
    reverse: t === "prev"
  };
  let a = !1, l = null;
  function s(d) {
    if (d !== null) {
      if (d === e) {
        if (!a)
          a = !0;
        else if (!e.disabled && !e.isGroup) {
          l = e;
          return;
        }
      } else if ((!d.disabled || o) && !d.ignored && !d.isGroup) {
        l = d;
        return;
      }
      if (d.isGroup) {
        const c = md(d, i);
        c !== null ? l = c : s(r(d, n));
      } else {
        const c = r(d, !1);
        if (c !== null)
          s(c);
        else {
          const h = DR(d);
          h != null && h.isGroup ? s(r(h, n)) : n && s(r(d, !0));
        }
      }
    }
  }
  return s(e), l;
}
function LR(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r - 1 + o) % o] : r === 0 ? null : n[r - 1];
}
function DR(e) {
  return e.parent;
}
function md(e, t = {}) {
  const { reverse: n = !1 } = t, { children: o } = e;
  if (o) {
    const { length: r } = o, i = n ? r - 1 : 0, a = n ? -1 : r, l = n ? -1 : 1;
    for (let s = i; s !== a; s += l) {
      const d = o[s];
      if (!d.disabled && !d.ignored)
        if (d.isGroup) {
          const c = md(d, t);
          if (c !== null)
            return c;
        } else
          return d;
    }
  }
  return null;
}
const NR = {
  getChild() {
    return this.ignored ? null : md(this);
  },
  getParent() {
    const { parent: e } = this;
    return e != null && e.isGroup ? e.getParent() : e;
  },
  getNext(e = {}) {
    return Ru(this, "next", e);
  },
  getPrev(e = {}) {
    return Ru(this, "prev", e);
  }
};
function HR(e, t) {
  const n = t ? new Set(t) : void 0, o = [];
  function r(i) {
    i.forEach((a) => {
      o.push(a), !(a.isLeaf || !a.children || a.ignored) && (a.isGroup || // normal non-leaf node
      n === void 0 || n.has(a.key)) && r(a.children);
    });
  }
  return r(e), o;
}
function jR(e, t) {
  const n = e.key;
  for (; t; ) {
    if (t.key === n)
      return !0;
    t = t.parent;
  }
  return !1;
}
function Gp(e, t, n, o, r, i = null, a = 0) {
  const l = [];
  return e.forEach((s, d) => {
    var c;
    const h = Object.create(o);
    if (h.rawNode = s, h.siblings = l, h.level = a, h.index = d, h.isFirstChild = d === 0, h.isLastChild = d + 1 === e.length, h.parent = i, !h.ignored) {
      const p = r(s);
      Array.isArray(p) && (h.children = Gp(p, t, n, o, r, h, a + 1));
    }
    l.push(h), t.set(h.key, h), n.has(a) || n.set(a, []), (c = n.get(a)) === null || c === void 0 || c.push(h);
  }), l;
}
function Oa(e, t = {}) {
  var n;
  const o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), { getDisabled: i = RR, getIgnored: a = $R, getIsGroup: l = FR, getKey: s = SR } = t, d = (n = t.getChildren) !== null && n !== void 0 ? n : CR, c = t.ignoreEmptyChildren ? (w) => {
    const C = d(w);
    return Array.isArray(C) ? C.length ? C : null : C;
  } : d, h = Object.assign({
    get key() {
      return s(this.rawNode);
    },
    get disabled() {
      return i(this.rawNode);
    },
    get isGroup() {
      return l(this.rawNode);
    },
    get isLeaf() {
      return xR(this.rawNode, c);
    },
    get shallowLoaded() {
      return kR(this.rawNode, c);
    },
    get ignored() {
      return a(this.rawNode);
    },
    contains(w) {
      return jR(this, w);
    }
  }, NR), p = Gp(e, o, r, h, c);
  function v(w) {
    if (w == null)
      return null;
    const C = o.get(w);
    return C && !C.isGroup && !C.ignored ? C : null;
  }
  function f(w) {
    if (w == null)
      return null;
    const C = o.get(w);
    return C && !C.ignored ? C : null;
  }
  function m(w, C) {
    const S = f(w);
    return S ? S.getPrev(C) : null;
  }
  function g(w, C) {
    const S = f(w);
    return S ? S.getNext(C) : null;
  }
  function u(w) {
    const C = f(w);
    return C ? C.getParent() : null;
  }
  function b(w) {
    const C = f(w);
    return C ? C.getChild() : null;
  }
  const x = {
    treeNodes: p,
    treeNodeMap: o,
    levelTreeNodeMap: r,
    maxLevel: Math.max(...r.keys()),
    getChildren: c,
    getFlattenedNodes(w) {
      return HR(p, w);
    },
    getNode: v,
    getPrev: m,
    getNext: g,
    getParent: u,
    getChild: b,
    getFirstAvailableNode() {
      return VR(p);
    },
    getPath(w, C = {}) {
      return AR(w, C, x);
    },
    getCheckedKeys(w, C = {}) {
      const { cascade: S = !0, leafOnly: y = !1, checkStrategy: T = "all", allowNotLoaded: k = !1 } = C;
      return yl({
        checkedKeys: bl(w),
        indeterminateKeys: wl(w),
        cascade: S,
        leafOnly: y,
        checkStrategy: T,
        allowNotLoaded: k
      }, x);
    },
    check(w, C, S = {}) {
      const { cascade: y = !0, leafOnly: T = !1, checkStrategy: k = "all", allowNotLoaded: E = !1 } = S;
      return yl({
        checkedKeys: bl(C),
        indeterminateKeys: wl(C),
        keysToCheck: w == null ? [] : ku(w),
        cascade: y,
        leafOnly: T,
        checkStrategy: k,
        allowNotLoaded: E
      }, x);
    },
    uncheck(w, C, S = {}) {
      const { cascade: y = !0, leafOnly: T = !1, checkStrategy: k = "all", allowNotLoaded: E = !1 } = S;
      return yl({
        checkedKeys: bl(C),
        indeterminateKeys: wl(C),
        keysToUncheck: w == null ? [] : ku(w),
        cascade: y,
        leafOnly: T,
        checkStrategy: k,
        allowNotLoaded: E
      }, x);
    },
    getNonLeafKeys(w = {}) {
      return yR(p, w);
    }
  };
  return x;
}
const WR = {
  iconSizeTiny: "28px",
  iconSizeSmall: "34px",
  iconSizeMedium: "40px",
  iconSizeLarge: "46px",
  iconSizeHuge: "52px"
};
function UR(e) {
  const {
    textColorDisabled: t,
    iconColor: n,
    textColor2: o,
    fontSizeTiny: r,
    fontSizeSmall: i,
    fontSizeMedium: a,
    fontSizeLarge: l,
    fontSizeHuge: s
  } = e;
  return Object.assign(Object.assign({}, WR), {
    fontSizeTiny: r,
    fontSizeSmall: i,
    fontSizeMedium: a,
    fontSizeLarge: l,
    fontSizeHuge: s,
    textColor: t,
    iconColor: n,
    extraTextColor: o
  });
}
const gd = {
  name: "Empty",
  common: vt,
  self: UR
}, KR = V("empty", `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [D("icon", `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [W("+", [D("description", `
 margin-top: 8px;
 `)])]), D("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), D("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]), Pr = window.Vue.computed, qR = window.Vue.defineComponent, Wo = window.Vue.h, GR = Object.assign(Object.assign({}, _e.props), {
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
}), Xp = qR({
  name: "Empty",
  props: GR,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n,
      mergedComponentPropsRef: o
    } = qe(e), r = _e("Empty", "-empty", KR, gd, e, t), {
      localeRef: i
    } = dr("Empty"), a = Pr(() => {
      var c, h, p;
      return (c = e.description) !== null && c !== void 0 ? c : (p = (h = o == null ? void 0 : o.value) === null || h === void 0 ? void 0 : h.Empty) === null || p === void 0 ? void 0 : p.description;
    }), l = Pr(() => {
      var c, h;
      return ((h = (c = o == null ? void 0 : o.value) === null || c === void 0 ? void 0 : c.Empty) === null || h === void 0 ? void 0 : h.renderIcon) || (() => Wo(Tk, null));
    }), s = Pr(() => {
      const {
        size: c
      } = e, {
        common: {
          cubicBezierEaseInOut: h
        },
        self: {
          [ae("iconSize", c)]: p,
          [ae("fontSize", c)]: v,
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
    }), d = n ? wt("empty", Pr(() => {
      let c = "";
      const {
        size: h
      } = e;
      return c += h[0], c;
    }), s, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedRenderIcon: l,
      localizedDescription: Pr(() => a.value || i.value.description),
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
}), XR = {
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
function YR(e) {
  const {
    borderRadius: t,
    popoverColor: n,
    textColor3: o,
    dividerColor: r,
    textColor2: i,
    primaryColorPressed: a,
    textColorDisabled: l,
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
    heightMedium: b,
    heightLarge: x,
    heightHuge: w
  } = e;
  return Object.assign(Object.assign({}, XR), {
    optionFontSizeTiny: h,
    optionFontSizeSmall: p,
    optionFontSizeMedium: v,
    optionFontSizeLarge: f,
    optionFontSizeHuge: m,
    optionHeightTiny: g,
    optionHeightSmall: u,
    optionHeightMedium: b,
    optionHeightLarge: x,
    optionHeightHuge: w,
    borderRadius: t,
    color: n,
    groupHeaderTextColor: o,
    actionDividerColor: r,
    optionTextColor: i,
    optionTextColorPressed: a,
    optionTextColorDisabled: l,
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
const bd = {
  name: "InternalSelectMenu",
  common: vt,
  peers: {
    Scrollbar: si,
    Empty: gd
  },
  self: YR
}, ZR = window.Vue.defineComponent, JR = window.Vue.h, QR = window.Vue.inject, Pu = ZR({
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
    } = QR(Gs);
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
    } = this, i = o == null ? void 0 : o(r), a = t ? t(r, !1) : $n(r[this.labelField], r, !1), l = JR("div", Object.assign({}, i, {
      class: [`${e}-base-select-group-header`, i == null ? void 0 : i.class]
    }), a);
    return r.render ? r.render({
      node: l,
      option: r
    }) : n ? n({
      node: l,
      option: r,
      selected: !1
    }) : l;
  }
}), eP = window.Vue.defineComponent, jr = window.Vue.h, tP = window.Vue.inject, nP = window.Vue.Transition;
function oP(e, t) {
  return jr(nP, {
    name: "fade-in-scale-up-transition"
  }, {
    default: () => e ? jr(Ct, {
      clsPrefix: t,
      class: `${t}-base-select-option__check`
    }, {
      default: () => jr(Sk)
    }) : null
  });
}
const _u = eP({
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
      renderOptionRef: a,
      labelFieldRef: l,
      valueFieldRef: s,
      showCheckmarkRef: d,
      nodePropsRef: c,
      handleOptionClick: h,
      handleOptionMouseEnter: p
    } = tP(Gs), v = ze(() => {
      const {
        value: u
      } = n;
      return u ? e.tmNode.key === u.key : !1;
    });
    function f(u) {
      const {
        tmNode: b
      } = e;
      b.disabled || h(u, b);
    }
    function m(u) {
      const {
        tmNode: b
      } = e;
      b.disabled || p(u, b);
    }
    function g(u) {
      const {
        tmNode: b
      } = e, {
        value: x
      } = v;
      b.disabled || x || p(u, b);
    }
    return {
      multiple: o,
      isGrouped: ze(() => {
        const {
          tmNode: u
        } = e, {
          parent: b
        } = u;
        return b && b.rawNode.type === "group";
      }),
      showCheckmark: d,
      nodeProps: c,
      isPending: v,
      isSelected: ze(() => {
        const {
          value: u
        } = t, {
          value: b
        } = o;
        if (u === null) return !1;
        const x = e.tmNode.rawNode[s.value];
        if (b) {
          const {
            value: w
          } = r;
          return w.has(x);
        } else
          return u === x;
      }),
      labelField: l,
      renderLabel: i,
      renderOption: a,
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
      nodeProps: a,
      renderOption: l,
      renderLabel: s,
      handleClick: d,
      handleMouseEnter: c,
      handleMouseMove: h
    } = this, p = oP(n, e), v = s ? [s(t, n), i && p] : [$n(t[this.labelField], t, n), i && p], f = a == null ? void 0 : a(t), m = jr("div", Object.assign({}, f, {
      class: [`${e}-base-select-option`, t.class, f == null ? void 0 : f.class, {
        [`${e}-base-select-option--disabled`]: t.disabled,
        [`${e}-base-select-option--selected`]: n,
        [`${e}-base-select-option--grouped`]: r,
        [`${e}-base-select-option--pending`]: o,
        [`${e}-base-select-option--show-checkmark`]: i
      }],
      style: [(f == null ? void 0 : f.style) || "", t.style || ""],
      onClick: Nr([d, f == null ? void 0 : f.onClick]),
      onMouseenter: Nr([c, f == null ? void 0 : f.onMouseenter]),
      onMousemove: Nr([h, f == null ? void 0 : f.onMousemove])
    }), jr("div", {
      class: `${e}-base-select-option__content`
    }, v));
    return t.render ? t.render({
      node: m,
      option: t,
      selected: n
    }) : l ? l({
      node: m,
      option: t,
      selected: n
    }) : m;
  }
}), {
  cubicBezierEaseIn: Tu,
  cubicBezierEaseOut: Fu
} = Ao;
function za({
  transformOrigin: e = "inherit",
  duration: t = ".2s",
  enterScale: n = ".9",
  originalTransform: o = "",
  originalTransition: r = ""
} = {}) {
  return [W("&.fade-in-scale-up-transition-leave-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${Tu}, transform ${t} ${Tu} ${r && `,${r}`}`
  }), W("&.fade-in-scale-up-transition-enter-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${Fu}, transform ${t} ${Fu} ${r && `,${r}`}`
  }), W("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
    opacity: 0,
    transform: `${o} scale(${n})`
  }), W("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
    opacity: 1,
    transform: `${o} scale(1)`
  })];
}
const rP = V("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [V("scrollbar", `
 max-height: var(--n-height);
 `), V("virtual-list", `
 max-height: var(--n-height);
 `), V("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [D("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), V("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), V("base-select-menu-option-wrapper", `
 position: relative;
 width: 100%;
 `), D("loading, empty", `
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `), D("loading", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `), D("header", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), D("action", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), V("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), V("base-select-option", `
 cursor: pointer;
 position: relative;
 padding: var(--n-option-padding);
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 box-sizing: border-box;
 color: var(--n-option-text-color);
 opacity: 1;
 `, [X("show-checkmark", `
 padding-right: calc(var(--n-option-padding-right) + 20px);
 `), W("&::before", `
 content: "";
 position: absolute;
 left: 4px;
 right: 4px;
 top: 0;
 bottom: 0;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `), W("&:active", `
 color: var(--n-option-text-color-pressed);
 `), X("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), X("pending", [W("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), X("selected", `
 color: var(--n-option-text-color-active);
 `, [W("&::before", `
 background-color: var(--n-option-color-active);
 `), X("pending", [W("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), X("disabled", `
 cursor: not-allowed;
 `, [Qe("selected", `
 color: var(--n-option-text-color-disabled);
 `), X("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), D("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [za({
  enterScale: "0.5"
})])])]), Xn = window.Vue.computed, iP = window.Vue.defineComponent, Bt = window.Vue.h, aP = window.Vue.nextTick, lP = window.Vue.onBeforeUnmount, sP = window.Vue.onMounted, Eu = window.Vue.provide, Mi = window.Vue.ref, In = window.Vue.toRef, Ou = window.Vue.watch, Yp = iP({
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
    } = qe(e), o = zt("InternalSelectMenu", n, t), r = _e("InternalSelectMenu", "-internal-select-menu", rP, bd, e, In(e, "clsPrefix")), i = Mi(null), a = Mi(null), l = Mi(null), s = Xn(() => e.treeMate.getFlattenedNodes()), d = Xn(() => ER(s.value)), c = Mi(null);
    function h() {
      const {
        treeMate: F
      } = e;
      let j = null;
      const {
        value: J
      } = e;
      J === null ? j = F.getFirstAvailableNode() : (e.multiple ? j = F.getNode((J || [])[(J || []).length - 1]) : j = F.getNode(J), (!j || j.disabled) && (j = F.getFirstAvailableNode())), I(j || null);
    }
    function p() {
      const {
        value: F
      } = c;
      F && !e.treeMate.getNode(F.key) && (c.value = null);
    }
    let v;
    Ou(() => e.show, (F) => {
      F ? v = Ou(() => e.treeMate, () => {
        e.resetMenuOnOptionsChange ? (e.autoPending ? h() : p(), aP(z)) : p();
      }, {
        immediate: !0
      }) : v == null || v();
    }, {
      immediate: !0
    }), lP(() => {
      v == null || v();
    });
    const f = Xn(() => xt(r.value.self[ae("optionHeight", e.size)])), m = Xn(() => Yt(r.value.self[ae("padding", e.size)])), g = Xn(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), u = Xn(() => {
      const F = s.value;
      return F && F.length === 0;
    });
    function b(F) {
      const {
        onToggle: j
      } = e;
      j && j(F);
    }
    function x(F) {
      const {
        onScroll: j
      } = e;
      j && j(F);
    }
    function w(F) {
      var j;
      (j = l.value) === null || j === void 0 || j.sync(), x(F);
    }
    function C() {
      var F;
      (F = l.value) === null || F === void 0 || F.sync();
    }
    function S() {
      const {
        value: F
      } = c;
      return F || null;
    }
    function y(F, j) {
      j.disabled || I(j, !1);
    }
    function T(F, j) {
      j.disabled || b(j);
    }
    function k(F) {
      var j;
      an(F, "action") || (j = e.onKeyup) === null || j === void 0 || j.call(e, F);
    }
    function E(F) {
      var j;
      an(F, "action") || (j = e.onKeydown) === null || j === void 0 || j.call(e, F);
    }
    function U(F) {
      var j;
      (j = e.onMousedown) === null || j === void 0 || j.call(e, F), !e.focusable && F.preventDefault();
    }
    function _() {
      const {
        value: F
      } = c;
      F && I(F.getNext({
        loop: !0
      }), !0);
    }
    function M() {
      const {
        value: F
      } = c;
      F && I(F.getPrev({
        loop: !0
      }), !0);
    }
    function I(F, j = !1) {
      c.value = F, j && z();
    }
    function z() {
      var F, j;
      const J = c.value;
      if (!J) return;
      const Q = d.value(J.key);
      Q !== null && (e.virtualScroll ? (F = a.value) === null || F === void 0 || F.scrollTo({
        index: Q
      }) : (j = l.value) === null || j === void 0 || j.scrollTo({
        index: Q,
        elSize: f.value
      }));
    }
    function G(F) {
      var j, J;
      !((j = i.value) === null || j === void 0) && j.contains(F.target) && ((J = e.onFocus) === null || J === void 0 || J.call(e, F));
    }
    function L(F) {
      var j, J;
      !((j = i.value) === null || j === void 0) && j.contains(F.relatedTarget) || (J = e.onBlur) === null || J === void 0 || J.call(e, F);
    }
    Eu(Gs, {
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
    }), Eu(Hh, i), sP(() => {
      const {
        value: F
      } = l;
      F && F.sync();
    });
    const Z = Xn(() => {
      const {
        size: F
      } = e, {
        common: {
          cubicBezierEaseInOut: j
        },
        self: {
          height: J,
          borderRadius: Q,
          color: ee,
          groupHeaderTextColor: de,
          actionDividerColor: pe,
          optionTextColorPressed: Y,
          optionTextColor: se,
          optionTextColorDisabled: $e,
          optionTextColorActive: me,
          optionOpacityDisabled: be,
          optionCheckColor: Ce,
          actionTextColor: Be,
          optionColorPending: Me,
          optionColorActive: ie,
          loadingColor: R,
          loadingSize: $,
          optionColorActivePending: N,
          [ae("optionFontSize", F)]: ne,
          [ae("optionHeight", F)]: ge,
          [ae("optionPadding", F)]: he
        }
      } = r.value;
      return {
        "--n-height": J,
        "--n-action-divider-color": pe,
        "--n-action-text-color": Be,
        "--n-bezier": j,
        "--n-border-radius": Q,
        "--n-color": ee,
        "--n-option-font-size": ne,
        "--n-group-header-text-color": de,
        "--n-option-check-color": Ce,
        "--n-option-color-pending": Me,
        "--n-option-color-active": ie,
        "--n-option-color-active-pending": N,
        "--n-option-height": ge,
        "--n-option-opacity-disabled": be,
        "--n-option-text-color": se,
        "--n-option-text-color-active": me,
        "--n-option-text-color-disabled": $e,
        "--n-option-text-color-pressed": Y,
        "--n-option-padding": he,
        "--n-option-padding-left": Yt(he, "left"),
        "--n-option-padding-right": Yt(he, "right"),
        "--n-loading-color": R,
        "--n-loading-size": $
      };
    }), {
      inlineThemeDisabled: te
    } = e, q = te ? wt("internal-select-menu", Xn(() => e.size[0]), Z, e) : void 0, A = {
      selfRef: i,
      next: _,
      prev: M,
      getPendingTmNode: S
    };
    return ip(i, e.onResize), Object.assign({
      mergedTheme: r,
      mergedClsPrefix: t,
      rtlEnabled: o,
      virtualListRef: a,
      scrollbarRef: l,
      itemSize: f,
      padding: m,
      flattenedNodes: s,
      empty: u,
      virtualListContainer() {
        const {
          value: F
        } = a;
        return F == null ? void 0 : F.listElRef;
      },
      virtualListContent() {
        const {
          value: F
        } = a;
        return F == null ? void 0 : F.itemsElRef;
      },
      doScroll: x,
      handleFocusin: G,
      handleFocusout: L,
      handleKeyUp: k,
      handleKeyDown: E,
      handleMouseDown: U,
      handleVirtualListResize: C,
      handleVirtualListScroll: w,
      cssVars: te ? void 0 : Z,
      themeClass: q == null ? void 0 : q.themeClass,
      onRender: q == null ? void 0 : q.onRender
    }, A);
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
    return i == null || i(), Bt("div", {
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
    }, We(e.header, (a) => a && Bt("div", {
      class: `${n}-base-select-menu__header`,
      "data-header": !0,
      key: "header"
    }, a)), this.loading ? Bt("div", {
      class: `${n}-base-select-menu__loading`
    }, Bt(ur, {
      clsPrefix: n,
      strokeWidth: 20
    })) : this.empty ? Bt("div", {
      class: `${n}-base-select-menu__empty`,
      "data-empty": !0
    }, vn(e.empty, () => [Bt(Xp, {
      theme: o.peers.Empty,
      themeOverrides: o.peerOverrides.Empty,
      size: this.size
    })])) : Bt(di, {
      ref: "scrollbarRef",
      theme: o.peers.Scrollbar,
      themeOverrides: o.peerOverrides.Scrollbar,
      scrollable: this.scrollable,
      container: t ? this.virtualListContainer : void 0,
      content: t ? this.virtualListContent : void 0,
      onScroll: t ? void 0 : this.doScroll
    }, {
      default: () => t ? Bt(nd, {
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
          item: a
        }) => a.isGroup ? Bt(Pu, {
          key: a.key,
          clsPrefix: n,
          tmNode: a
        }) : a.ignored ? null : Bt(_u, {
          clsPrefix: n,
          key: a.key,
          tmNode: a
        })
      }) : Bt("div", {
        class: `${n}-base-select-menu-option-wrapper`,
        style: {
          paddingTop: this.padding.top,
          paddingBottom: this.padding.bottom
        }
      }, this.flattenedNodes.map((a) => a.isGroup ? Bt(Pu, {
        key: a.key,
        clsPrefix: n,
        tmNode: a
      }) : Bt(_u, {
        clsPrefix: n,
        key: a.key,
        tmNode: a
      })))
    }), We(e.action, (a) => a && [Bt("div", {
      class: `${n}-base-select-menu__action`,
      "data-action": !0,
      key: "action"
    }, a), Bt(nR, {
      onFocus: this.onTabOut,
      key: "focus-detector"
    })]));
  }
}), dP = {
  space: "6px",
  spaceArrow: "10px",
  arrowOffset: "10px",
  arrowOffsetVertical: "10px",
  arrowHeight: "6px",
  padding: "8px 14px"
};
function cP(e) {
  const {
    boxShadow2: t,
    popoverColor: n,
    textColor2: o,
    borderRadius: r,
    fontSize: i,
    dividerColor: a
  } = e;
  return Object.assign(Object.assign({}, dP), {
    fontSize: i,
    borderRadius: r,
    color: n,
    dividerColor: a,
    textColor: o,
    boxShadow: t
  });
}
const fr = {
  name: "Popover",
  common: vt,
  peers: {
    Scrollbar: si
  },
  self: cP
}, xl = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, yt = "var(--n-arrow-height) * 1.414", uP = W([V("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [W(">", [V("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), Qe("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [Qe("scrollable", [Qe("show-header-or-footer", "padding: var(--n-padding);")])]), D("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), D("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), X("scrollable, show-header-or-footer", [D("content", `
 padding: var(--n-padding);
 `)])]), V("popover-shared", `
 transform-origin: inherit;
 `, [
  V("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [V("popover-arrow", `
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
  W("&.popover-transition-enter-from, &.popover-transition-leave-to", `
 opacity: 0;
 transform: scale(.85);
 `),
  W("&.popover-transition-enter-to, &.popover-transition-leave-from", `
 transform: scale(1);
 opacity: 1;
 `),
  W("&.popover-transition-enter-active", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),
  W("&.popover-transition-leave-active", `
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
 `), ...G$({
  top: ["right-start", "left-start"],
  right: ["top-end", "bottom-end"],
  bottom: ["right-end", "left-end"],
  left: ["top-start", "bottom-start"]
}, (e, t) => {
  const n = ["right", "left"].includes(t), o = n ? "width" : "height";
  return e.map((r) => {
    const i = r.split("-")[1] === "end", l = `calc((${`var(--v-target-${o}, 0px)`} - ${yt}) / 2)`, s = An(r);
    return W(`[v-placement="${r}"] >`, [V("popover-shared", [X("center-arrow", [V("popover-arrow", `${t}: calc(max(${l}, ${s}) ${i ? "+" : "-"} var(--v-offset-${n ? "left" : "top"}));`)])])]);
  });
})]);
function An(e) {
  return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function tn(e, t) {
  const n = e.split("-")[0], o = ["top", "bottom"].includes(n) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return W(`[v-placement="${e}"] >`, [V("popover-shared", `
 margin-${xl[n]}: var(--n-space);
 `, [X("show-arrow", `
 margin-${xl[n]}: var(--n-space-arrow);
 `), X("overlap", `
 margin: 0;
 `), kb("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${n}: 100%;
 ${xl[n]}: auto;
 ${o}
 `, [V("popover-arrow", t)])])]);
}
const Cl = window.Vue.computed, fP = window.Vue.defineComponent, hP = window.Vue.Fragment, nn = window.Vue.h, pP = window.Vue.inject, vP = window.Vue.mergeProps, mP = window.Vue.onBeforeUnmount, Sl = window.Vue.provide, Ii = window.Vue.ref, gP = window.Vue.toRef, bP = window.Vue.Transition, wP = window.Vue.vShow, yP = window.Vue.watch, xP = window.Vue.watchEffect, CP = window.Vue.withDirectives, Zp = Object.assign(Object.assign({}, _e.props), {
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
function Jp({
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
const SP = fP({
  name: "PopoverBody",
  inheritAttrs: !1,
  props: Zp,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    const {
      namespaceRef: o,
      mergedClsPrefixRef: r,
      inlineThemeDisabled: i,
      mergedRtlRef: a
    } = qe(e), l = _e("Popover", "-popover", uP, fr, e, r), s = zt("Popover", a, r), d = Ii(null), c = pP("NPopover"), h = Ii(null), p = Ii(e.show), v = Ii(!1);
    xP(() => {
      const {
        show: k
      } = e;
      k && !Py() && !e.internalDeactivateImmediately && (v.value = !0);
    });
    const f = Cl(() => {
      const {
        trigger: k,
        onClickoutside: E
      } = e, U = [], {
        positionManuallyRef: {
          value: _
        }
      } = c;
      return _ || (k === "click" && !E && U.push([ha, S, void 0, {
        capture: !0
      }]), k === "hover" && U.push([Jw, C])), E && U.push([ha, S, void 0, {
        capture: !0
      }]), (e.displayDirective === "show" || e.animated && v.value) && U.push([wP, e.show]), U;
    }), m = Cl(() => {
      const {
        common: {
          cubicBezierEaseInOut: k,
          cubicBezierEaseIn: E,
          cubicBezierEaseOut: U
        },
        self: {
          space: _,
          spaceArrow: M,
          padding: I,
          fontSize: z,
          textColor: G,
          dividerColor: L,
          color: Z,
          boxShadow: te,
          borderRadius: q,
          arrowHeight: A,
          arrowOffset: F,
          arrowOffsetVertical: j
        }
      } = l.value;
      return {
        "--n-box-shadow": te,
        "--n-bezier": k,
        "--n-bezier-ease-in": E,
        "--n-bezier-ease-out": U,
        "--n-font-size": z,
        "--n-text-color": G,
        "--n-color": Z,
        "--n-divider-color": L,
        "--n-border-radius": q,
        "--n-arrow-height": A,
        "--n-arrow-offset": F,
        "--n-arrow-offset-vertical": j,
        "--n-padding": I,
        "--n-space": _,
        "--n-space-arrow": M
      };
    }), g = Cl(() => {
      const k = e.width === "trigger" ? void 0 : St(e.width), E = [];
      k && E.push({
        width: k
      });
      const {
        maxWidth: U,
        minWidth: _
      } = e;
      return U && E.push({
        maxWidth: St(U)
      }), _ && E.push({
        maxWidth: St(_)
      }), i || E.push(m.value), E;
    }), u = i ? wt("popover", void 0, m, e) : void 0;
    c.setBodyInstance({
      syncPosition: b
    }), mP(() => {
      c.setBodyInstance(null);
    }), yP(gP(e, "show"), (k) => {
      e.animated || (k ? p.value = !0 : p.value = !1);
    });
    function b() {
      var k;
      (k = d.value) === null || k === void 0 || k.syncPosition();
    }
    function x(k) {
      e.trigger === "hover" && e.keepAliveOnHover && e.show && c.handleMouseEnter(k);
    }
    function w(k) {
      e.trigger === "hover" && e.keepAliveOnHover && c.handleMouseLeave(k);
    }
    function C(k) {
      e.trigger === "hover" && !y().contains(Zr(k)) && c.handleMouseMoveOutside(k);
    }
    function S(k) {
      (e.trigger === "click" && !y().contains(Zr(k)) || e.onClickoutside) && c.handleClickOutside(k);
    }
    function y() {
      return c.getTriggerElement();
    }
    Sl(_a, h), Sl(Xs, null), Sl(Ys, null);
    function T() {
      if (u == null || u.onRender(), !(e.displayDirective === "show" || e.show || e.animated && v.value))
        return null;
      let E;
      const U = c.internalRenderBodyRef.value, {
        value: _
      } = r;
      if (U)
        E = U(
          // The popover class and overlap class must exists, they will be used
          // to place the body & transition animation.
          // Shadow class exists for reuse box-shadow.
          [`${_}-popover-shared`, (s == null ? void 0 : s.value) && `${_}-popover--rtl`, u == null ? void 0 : u.themeClass.value, e.overlap && `${_}-popover-shared--overlap`, e.showArrow && `${_}-popover-shared--show-arrow`, e.arrowPointToCenter && `${_}-popover-shared--center-arrow`],
          h,
          g.value,
          x,
          w
        );
      else {
        const {
          value: M
        } = c.extraClassRef, {
          internalTrapFocus: I
        } = e, z = !er(t.header) || !er(t.footer), G = () => {
          var L, Z;
          const te = z ? nn(hP, null, We(t.header, (F) => F ? nn("div", {
            class: [`${_}-popover__header`, e.headerClass],
            style: e.headerStyle
          }, F) : null), We(t.default, (F) => F ? nn("div", {
            class: [`${_}-popover__content`, e.contentClass],
            style: e.contentStyle
          }, t) : null), We(t.footer, (F) => F ? nn("div", {
            class: [`${_}-popover__footer`, e.footerClass],
            style: e.footerStyle
          }, F) : null)) : e.scrollable ? (L = t.default) === null || L === void 0 ? void 0 : L.call(t) : nn("div", {
            class: [`${_}-popover__content`, e.contentClass],
            style: e.contentStyle
          }, t), q = e.scrollable ? nn(Kp, {
            themeOverrides: l.value.peerOverrides.Scrollbar,
            theme: l.value.peers.Scrollbar,
            contentClass: z ? void 0 : `${_}-popover__content ${(Z = e.contentClass) !== null && Z !== void 0 ? Z : ""}`,
            contentStyle: z ? void 0 : e.contentStyle
          }, {
            default: () => te
          }) : te, A = e.showArrow ? Jp({
            arrowClass: e.arrowClass,
            arrowStyle: e.arrowStyle,
            arrowWrapperClass: e.arrowWrapperClass,
            arrowWrapperStyle: e.arrowWrapperStyle,
            clsPrefix: _
          }) : null;
          return [q, A];
        };
        E = nn("div", vP({
          class: [`${_}-popover`, `${_}-popover-shared`, (s == null ? void 0 : s.value) && `${_}-popover--rtl`, u == null ? void 0 : u.themeClass.value, M.map((L) => `${_}-${L}`), {
            [`${_}-popover--scrollable`]: e.scrollable,
            [`${_}-popover--show-header-or-footer`]: z,
            [`${_}-popover--raw`]: e.raw,
            [`${_}-popover-shared--overlap`]: e.overlap,
            [`${_}-popover-shared--show-arrow`]: e.showArrow,
            [`${_}-popover-shared--center-arrow`]: e.arrowPointToCenter
          }],
          ref: h,
          style: g.value,
          onKeydown: c.handleKeydown,
          onMouseenter: x,
          onMouseleave: w
        }, n), I ? nn(xy, {
          active: e.show,
          autoFocus: !0
        }, {
          default: G
        }) : G());
      }
      return CP(E, f.value);
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
    return nn(ed, {
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
      default: () => this.animated ? nn(bP, {
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
}), $P = window.Vue.cloneVNode, zu = window.Vue.computed, kP = window.Vue.defineComponent, _r = window.Vue.h, RP = window.Vue.provide, Ai = window.Vue.ref, PP = window.Vue.Text, $l = window.Vue.toRef, _P = window.Vue.watchEffect, TP = window.Vue.withDirectives, FP = Object.keys(Zp), EP = {
  focus: ["onFocus", "onBlur"],
  click: ["onClick"],
  hover: ["onMouseenter", "onMouseleave"],
  manual: [],
  nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
};
function OP(e, t, n) {
  EP[t].forEach((o) => {
    e.props ? e.props = Object.assign({}, e.props) : e.props = {};
    const r = e.props[o], i = n[o];
    r ? e.props[o] = (...a) => {
      r(...a), i(...a);
    } : e.props[o] = i;
  });
}
const ir = {
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
}, zP = Object.assign(Object.assign(Object.assign({}, _e.props), ir), {
  internalOnAfterLeave: Function,
  internalRenderBody: Function
}), ci = kP({
  name: "Popover",
  inheritAttrs: !1,
  props: zP,
  slots: Object,
  __popover__: !0,
  setup(e) {
    const t = Pa(), n = Ai(null), o = zu(() => e.show), r = Ai(e.defaultShow), i = Ot(o, r), a = ze(() => e.disabled ? !1 : i.value), l = () => {
      if (e.disabled) return !0;
      const {
        getDisabled: z
      } = e;
      return !!(z != null && z());
    }, s = () => l() ? !1 : i.value, d = Nh(e, ["arrow", "showArrow"]), c = zu(() => e.overlap ? !1 : d.value);
    let h = null;
    const p = Ai(null), v = Ai(null), f = ze(() => e.x !== void 0 && e.y !== void 0);
    function m(z) {
      const {
        "onUpdate:show": G,
        onUpdateShow: L,
        onShow: Z,
        onHide: te
      } = e;
      r.value = z, G && le(G, z), L && le(L, z), z && Z && le(Z, !0), z && te && le(te, !1);
    }
    function g() {
      h && h.syncPosition();
    }
    function u() {
      const {
        value: z
      } = p;
      z && (window.clearTimeout(z), p.value = null);
    }
    function b() {
      const {
        value: z
      } = v;
      z && (window.clearTimeout(z), v.value = null);
    }
    function x() {
      const z = l();
      if (e.trigger === "focus" && !z) {
        if (s()) return;
        m(!0);
      }
    }
    function w() {
      const z = l();
      if (e.trigger === "focus" && !z) {
        if (!s()) return;
        m(!1);
      }
    }
    function C() {
      const z = l();
      if (e.trigger === "hover" && !z) {
        if (b(), p.value !== null || s()) return;
        const G = () => {
          m(!0), p.value = null;
        }, {
          delay: L
        } = e;
        L === 0 ? G() : p.value = window.setTimeout(G, L);
      }
    }
    function S() {
      const z = l();
      if (e.trigger === "hover" && !z) {
        if (u(), v.value !== null || !s()) return;
        const G = () => {
          m(!1), v.value = null;
        }, {
          duration: L
        } = e;
        L === 0 ? G() : v.value = window.setTimeout(G, L);
      }
    }
    function y() {
      S();
    }
    function T(z) {
      var G;
      s() && (e.trigger === "click" && (u(), b(), m(!1)), (G = e.onClickoutside) === null || G === void 0 || G.call(e, z));
    }
    function k() {
      if (e.trigger === "click" && !l()) {
        u(), b();
        const z = !s();
        m(z);
      }
    }
    function E(z) {
      e.internalTrapFocus && z.key === "Escape" && (u(), b(), m(!1));
    }
    function U(z) {
      r.value = z;
    }
    function _() {
      var z;
      return (z = n.value) === null || z === void 0 ? void 0 : z.targetRef;
    }
    function M(z) {
      h = z;
    }
    return RP("NPopover", {
      getTriggerElement: _,
      handleKeydown: E,
      handleMouseEnter: C,
      handleMouseLeave: S,
      handleClickOutside: T,
      handleMouseMoveOutside: y,
      setBodyInstance: M,
      positionManuallyRef: f,
      isMountedRef: t,
      zIndexRef: $l(e, "zIndex"),
      extraClassRef: $l(e, "internalExtraClass"),
      internalRenderBodyRef: $l(e, "internalRenderBody")
    }), _P(() => {
      i.value && l() && m(!1);
    }), {
      binderInstRef: n,
      positionManually: f,
      mergedShowConsideringDisabledProp: a,
      // if to show popover body
      uncontrolledShow: r,
      mergedShowArrow: c,
      getMergedShow: s,
      setShow: U,
      handleClick: k,
      handleMouseEnter: C,
      handleMouseLeave: S,
      handleFocus: x,
      handleBlur: w,
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
    if (!t && (o = Iy(n, "trigger"), o)) {
      o = $P(o), o = o.type === PP ? _r("span", [o]) : o;
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
          internalInheritedEventHandlers: a
        } = this, l = [i, ...a], s = {
          onBlur: (d) => {
            l.forEach((c) => {
              c.onBlur(d);
            });
          },
          onFocus: (d) => {
            l.forEach((c) => {
              c.onFocus(d);
            });
          },
          onClick: (d) => {
            l.forEach((c) => {
              c.onClick(d);
            });
          },
          onMouseenter: (d) => {
            l.forEach((c) => {
              c.onMouseenter(d);
            });
          },
          onMouseleave: (d) => {
            l.forEach((c) => {
              c.onMouseleave(d);
            });
          }
        };
        OP(o, a ? "nested" : t ? "manual" : this.trigger, s);
      }
    }
    return _r(Zs, {
      ref: "binderInstRef",
      syncTarget: !r,
      syncTargetWithParent: this.internalSyncTargetWithParent
    }, {
      default: () => {
        this.mergedShowConsideringDisabledProp;
        const i = this.getMergedShow();
        return [this.internalTrapFocus && i ? TP(_r("div", {
          style: {
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }), [[Kh, {
          enabled: i,
          zIndex: this.zIndex
        }]]) : null, t ? null : _r(Js, null, {
          default: () => o
        }), _r(SP, ei(this.$props, FP, Object.assign(Object.assign({}, this.$attrs), {
          showArrow: this.mergedShowArrow,
          show: i
        })), {
          default: () => {
            var a, l;
            return (l = (a = this.$slots).default) === null || l === void 0 ? void 0 : l.call(a);
          },
          header: () => {
            var a, l;
            return (l = (a = this.$slots).header) === null || l === void 0 ? void 0 : l.call(a);
          },
          footer: () => {
            var a, l;
            return (l = (a = this.$slots).footer) === null || l === void 0 ? void 0 : l.call(a);
          }
        })];
      }
    });
  }
}), MP = {
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
function IP(e) {
  const {
    textColor2: t,
    primaryColorHover: n,
    primaryColorPressed: o,
    primaryColor: r,
    infoColor: i,
    successColor: a,
    warningColor: l,
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
    fontSizeTiny: b,
    fontSizeSmall: x,
    fontSizeMedium: w,
    heightMini: C,
    heightTiny: S,
    heightSmall: y,
    heightMedium: T,
    closeColorHover: k,
    closeColorPressed: E,
    buttonColor2Hover: U,
    buttonColor2Pressed: _,
    fontWeightStrong: M
  } = e;
  return Object.assign(Object.assign({}, MP), {
    closeBorderRadius: g,
    heightTiny: C,
    heightSmall: S,
    heightMedium: y,
    heightLarge: T,
    borderRadius: g,
    opacityDisabled: h,
    fontSizeTiny: u,
    fontSizeSmall: b,
    fontSizeMedium: x,
    fontSizeLarge: w,
    fontWeightStrong: M,
    // checked
    textColorCheckable: t,
    textColorHoverCheckable: t,
    textColorPressedCheckable: t,
    textColorChecked: d,
    colorCheckable: "#0000",
    colorHoverCheckable: U,
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
    closeColorHover: k,
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
    borderSuccess: `1px solid ${Ee(a, {
      alpha: 0.3
    })}`,
    textColorSuccess: a,
    colorSuccess: Ee(a, {
      alpha: 0.12
    }),
    colorBorderedSuccess: Ee(a, {
      alpha: 0.1
    }),
    closeIconColorSuccess: a,
    closeIconColorHoverSuccess: a,
    closeIconColorPressedSuccess: a,
    closeColorHoverSuccess: Ee(a, {
      alpha: 0.12
    }),
    closeColorPressedSuccess: Ee(a, {
      alpha: 0.18
    }),
    borderWarning: `1px solid ${Ee(l, {
      alpha: 0.35
    })}`,
    textColorWarning: l,
    colorWarning: Ee(l, {
      alpha: 0.15
    }),
    colorBorderedWarning: Ee(l, {
      alpha: 0.12
    }),
    closeIconColorWarning: l,
    closeIconColorHoverWarning: l,
    closeIconColorPressedWarning: l,
    closeColorHoverWarning: Ee(l, {
      alpha: 0.12
    }),
    closeColorPressedWarning: Ee(l, {
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
const AP = {
  common: vt,
  self: IP
}, VP = {
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
}, BP = V("tag", `
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
`, [X("strong", `
 font-weight: var(--n-font-weight-strong);
 `), D("border", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `), D("icon", `
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `), D("avatar", `
 display: flex;
 margin: 0 6px 0 0;
 `), D("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), X("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [D("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), D("avatar", `
 margin: 0 6px 0 calc((var(--n-height) - 8px) / -2);
 `), X("closable", `
 padding: 0 calc(var(--n-height) / 4) 0 calc(var(--n-height) / 3);
 `)]), X("icon, avatar", [X("round", `
 padding: 0 calc(var(--n-height) / 3) 0 calc(var(--n-height) / 2);
 `)]), X("disabled", `
 cursor: not-allowed !important;
 opacity: var(--n-opacity-disabled);
 `), X("checkable", `
 cursor: pointer;
 box-shadow: none;
 color: var(--n-text-color-checkable);
 background-color: var(--n-color-checkable);
 `, [Qe("disabled", [W("&:hover", "background-color: var(--n-color-hover-checkable);", [Qe("checked", "color: var(--n-text-color-hover-checkable);")]), W("&:active", "background-color: var(--n-color-pressed-checkable);", [Qe("checked", "color: var(--n-text-color-pressed-checkable);")])]), X("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [Qe("disabled", [W("&:hover", "background-color: var(--n-color-checked-hover);"), W("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), Mu = window.Vue.computed, LP = window.Vue.defineComponent, Uo = window.Vue.h, DP = window.Vue.provide, NP = window.Vue.ref, HP = window.Vue.toRef;
window.Vue.watchEffect;
const jP = Object.assign(Object.assign(Object.assign({}, _e.props), VP), {
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
}), WP = "n-tag", la = LP({
  name: "Tag",
  props: jP,
  slots: Object,
  setup(e) {
    const t = NP(null), {
      mergedBorderedRef: n,
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = qe(e), a = _e("Tag", "-tag", BP, AP, e, o);
    DP(WP, {
      roundRef: HP(e, "round")
    });
    function l() {
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
        f && le(f, v);
      }
    }
    const d = {
      setTextContent(v) {
        const {
          value: f
        } = t;
        f && (f.textContent = v);
      }
    }, c = zt("Tag", i, o), h = Mu(() => {
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
          padding: b,
          closeMargin: x,
          borderRadius: w,
          opacityDisabled: C,
          textColorCheckable: S,
          textColorHoverCheckable: y,
          textColorPressedCheckable: T,
          textColorChecked: k,
          colorCheckable: E,
          colorHoverCheckable: U,
          colorPressedCheckable: _,
          colorChecked: M,
          colorCheckedHover: I,
          colorCheckedPressed: z,
          closeBorderRadius: G,
          fontWeightStrong: L,
          [ae("colorBordered", v)]: Z,
          [ae("closeSize", f)]: te,
          [ae("closeIconSize", f)]: q,
          [ae("fontSize", f)]: A,
          [ae("height", f)]: F,
          [ae("color", v)]: j,
          [ae("textColor", v)]: J,
          [ae("border", v)]: Q,
          [ae("closeIconColor", v)]: ee,
          [ae("closeIconColorHover", v)]: de,
          [ae("closeIconColorPressed", v)]: pe,
          [ae("closeColorHover", v)]: Y,
          [ae("closeColorPressed", v)]: se
        }
      } = a.value, $e = Yt(x);
      return {
        "--n-font-weight-strong": L,
        "--n-avatar-size-override": `calc(${F} - 8px)`,
        "--n-bezier": u,
        "--n-border-radius": w,
        "--n-border": Q,
        "--n-close-icon-size": q,
        "--n-close-color-pressed": se,
        "--n-close-color-hover": Y,
        "--n-close-border-radius": G,
        "--n-close-icon-color": ee,
        "--n-close-icon-color-hover": de,
        "--n-close-icon-color-pressed": pe,
        "--n-close-icon-color-disabled": ee,
        "--n-close-margin-top": $e.top,
        "--n-close-margin-right": $e.right,
        "--n-close-margin-bottom": $e.bottom,
        "--n-close-margin-left": $e.left,
        "--n-close-size": te,
        "--n-color": m || (n.value ? Z : j),
        "--n-color-checkable": E,
        "--n-color-checked": M,
        "--n-color-checked-hover": I,
        "--n-color-checked-pressed": z,
        "--n-color-hover-checkable": U,
        "--n-color-pressed-checkable": _,
        "--n-font-size": A,
        "--n-height": F,
        "--n-opacity-disabled": C,
        "--n-padding": b,
        "--n-text-color": g || J,
        "--n-text-color-checkable": S,
        "--n-text-color-checked": k,
        "--n-text-color-hover-checkable": y,
        "--n-text-color-pressed-checkable": T
      };
    }), p = r ? wt("tag", Mu(() => {
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
      handleClick: l,
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
      round: a,
      onRender: l,
      $slots: s
    } = this;
    l == null || l();
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
        [`${n}-tag--round`]: a,
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
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e)), !this.checkable && r ? Uo(Wp, {
      clsPrefix: n,
      class: `${n}-tag__close`,
      disabled: this.disabled,
      onClick: this.handleCloseClick,
      focusable: this.internalCloseFocusable,
      round: a,
      isButtonTag: this.internalCloseIsButtonTag,
      absolute: !0
    }) : null, !this.checkable && this.mergedBordered ? Uo("div", {
      class: `${n}-tag__border`,
      style: {
        borderColor: i
      }
    }) : null);
  }
}), UP = window.Vue.defineComponent, Vi = window.Vue.h, Qp = UP({
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
      return Vi(ur, {
        clsPrefix: n,
        class: `${n}-base-suffix`,
        strokeWidth: 24,
        scale: 0.85,
        show: e.loading
      }, {
        default: () => e.showArrow ? Vi(Rs, {
          clsPrefix: n,
          show: e.showClear,
          onClear: e.onClear
        }, {
          placeholder: () => Vi(Ct, {
            clsPrefix: n,
            class: `${n}-base-suffix__arrow`
          }, {
            default: () => vn(t.default, () => [Vi(Hp, null)])
          })
        }) : null
      });
    };
  }
}), KP = {
  paddingSingle: "0 26px 0 12px",
  paddingMultiple: "3px 26px 0 12px",
  clearSize: "16px",
  arrowSize: "16px"
};
function qP(e) {
  const {
    borderRadius: t,
    textColor2: n,
    textColorDisabled: o,
    inputColor: r,
    inputColorDisabled: i,
    primaryColor: a,
    primaryColorHover: l,
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
    placeholderColor: b,
    placeholderColorDisabled: x,
    fontSizeTiny: w,
    fontSizeSmall: C,
    fontSizeMedium: S,
    fontSizeLarge: y,
    heightTiny: T,
    heightSmall: k,
    heightMedium: E,
    heightLarge: U,
    fontWeight: _
  } = e;
  return Object.assign(Object.assign({}, KP), {
    fontSizeTiny: w,
    fontSizeSmall: C,
    fontSizeMedium: S,
    fontSizeLarge: y,
    heightTiny: T,
    heightSmall: k,
    heightMedium: E,
    heightLarge: U,
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
    borderHover: `1px solid ${l}`,
    borderActive: `1px solid ${a}`,
    borderFocus: `1px solid ${l}`,
    boxShadowHover: "none",
    boxShadowActive: `0 0 0 2px ${Ee(a, {
      alpha: 0.2
    })}`,
    boxShadowFocus: `0 0 0 2px ${Ee(a, {
      alpha: 0.2
    })}`,
    caretColor: a,
    arrowColor: v,
    arrowColorDisabled: f,
    loadingColor: a,
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
    clearColor: m,
    clearColorHover: g,
    clearColorPressed: u
  });
}
const ev = {
  name: "InternalSelection",
  common: vt,
  peers: {
    Popover: fr
  },
  self: qP
}, GP = W([V("base-selection", `
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
 `, [V("base-loading", `
 color: var(--n-loading-color);
 `), V("base-selection-tags", "min-height: var(--n-height);"), D("border, state-border", `
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
 `), D("state-border", `
 z-index: 1;
 border-color: #0000;
 `), V("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [D("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), V("base-selection-overlay", `
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
 `, [D("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), V("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [D("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), V("base-selection-tags", `
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
 `), V("base-selection-label", `
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
 `, [V("base-selection-input", `
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
 `, [D("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), D("render-label", `
 color: var(--n-text-color);
 `)]), Qe("disabled", [W("&:hover", [D("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), X("focus", [D("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), X("active", [D("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), V("base-selection-label", "background-color: var(--n-color-active);"), V("base-selection-tags", "background-color: var(--n-color-active);")])]), X("disabled", "cursor: not-allowed;", [D("arrow", `
 color: var(--n-arrow-color-disabled);
 `), V("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [V("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), D("render-label", `
 color: var(--n-text-color-disabled);
 `)]), V("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), V("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), V("base-selection-input-tag", `
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `, [D("input", `
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
 `), D("mirror", `
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]), ["warning", "error"].map((e) => X(`${e}-status`, [D("state-border", `border: var(--n-border-${e});`), Qe("disabled", [W("&:hover", [D("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), X("active", [D("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), V("base-selection-label", `background-color: var(--n-color-active-${e});`), V("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), X("focus", [D("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), V("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), V("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [W("&:last-child", "padding-right: 0;"), V("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [D("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), Ko = window.Vue.computed, XP = window.Vue.defineComponent, YP = window.Vue.Fragment, Le = window.Vue.h, ZP = window.Vue.nextTick, JP = window.Vue.onMounted, Ut = window.Vue.ref, kl = window.Vue.toRef, Rl = window.Vue.watch, QP = window.Vue.watchEffect, e_ = XP({
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
    } = qe(e), o = zt("InternalSelection", n, t), r = Ut(null), i = Ut(null), a = Ut(null), l = Ut(null), s = Ut(null), d = Ut(null), c = Ut(null), h = Ut(null), p = Ut(null), v = Ut(null), f = Ut(!1), m = Ut(!1), g = Ut(!1), u = _e("InternalSelection", "-internal-selection", GP, ev, e, kl(e, "clsPrefix")), b = Ko(() => e.clearable && !e.disabled && (g.value || e.active)), x = Ko(() => e.selectedOption ? e.renderTag ? e.renderTag({
      option: e.selectedOption,
      handleClose: () => {
      }
    }) : e.renderLabel ? e.renderLabel(e.selectedOption, !0) : $n(e.selectedOption[e.labelField], e.selectedOption, !0) : e.placeholder), w = Ko(() => {
      const O = e.selectedOption;
      if (O)
        return O[e.labelField];
    }), C = Ko(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
    function S() {
      var O;
      const {
        value: K
      } = r;
      if (K) {
        const {
          value: ve
        } = i;
        ve && (ve.style.width = `${K.offsetWidth}px`, e.maxTagCount !== "responsive" && ((O = p.value) === null || O === void 0 || O.sync({
          showAllItemsBeforeCalculate: !1
        })));
      }
    }
    function y() {
      const {
        value: O
      } = v;
      O && (O.style.display = "none");
    }
    function T() {
      const {
        value: O
      } = v;
      O && (O.style.display = "inline-block");
    }
    Rl(kl(e, "active"), (O) => {
      O || y();
    }), Rl(kl(e, "pattern"), () => {
      e.multiple && ZP(S);
    });
    function k(O) {
      const {
        onFocus: K
      } = e;
      K && K(O);
    }
    function E(O) {
      const {
        onBlur: K
      } = e;
      K && K(O);
    }
    function U(O) {
      const {
        onDeleteOption: K
      } = e;
      K && K(O);
    }
    function _(O) {
      const {
        onClear: K
      } = e;
      K && K(O);
    }
    function M(O) {
      const {
        onPatternInput: K
      } = e;
      K && K(O);
    }
    function I(O) {
      var K;
      (!O.relatedTarget || !(!((K = a.value) === null || K === void 0) && K.contains(O.relatedTarget))) && k(O);
    }
    function z(O) {
      var K;
      !((K = a.value) === null || K === void 0) && K.contains(O.relatedTarget) || E(O);
    }
    function G(O) {
      _(O);
    }
    function L() {
      g.value = !0;
    }
    function Z() {
      g.value = !1;
    }
    function te(O) {
      !e.active || !e.filterable || O.target !== i.value && O.preventDefault();
    }
    function q(O) {
      U(O);
    }
    const A = Ut(!1);
    function F(O) {
      if (O.key === "Backspace" && !A.value && !e.pattern.length) {
        const {
          selectedOptions: K
        } = e;
        K != null && K.length && q(K[K.length - 1]);
      }
    }
    let j = null;
    function J(O) {
      const {
        value: K
      } = r;
      if (K) {
        const ve = O.target.value;
        K.textContent = ve, S();
      }
      e.ignoreComposition && A.value ? j = O : M(O);
    }
    function Q() {
      A.value = !0;
    }
    function ee() {
      A.value = !1, e.ignoreComposition && M(j), j = null;
    }
    function de(O) {
      var K;
      m.value = !0, (K = e.onPatternFocus) === null || K === void 0 || K.call(e, O);
    }
    function pe(O) {
      var K;
      m.value = !1, (K = e.onPatternBlur) === null || K === void 0 || K.call(e, O);
    }
    function Y() {
      var O, K;
      if (e.filterable)
        m.value = !1, (O = d.value) === null || O === void 0 || O.blur(), (K = i.value) === null || K === void 0 || K.blur();
      else if (e.multiple) {
        const {
          value: ve
        } = l;
        ve == null || ve.blur();
      } else {
        const {
          value: ve
        } = s;
        ve == null || ve.blur();
      }
    }
    function se() {
      var O, K, ve;
      e.filterable ? (m.value = !1, (O = d.value) === null || O === void 0 || O.focus()) : e.multiple ? (K = l.value) === null || K === void 0 || K.focus() : (ve = s.value) === null || ve === void 0 || ve.focus();
    }
    function $e() {
      const {
        value: O
      } = i;
      O && (T(), O.focus());
    }
    function me() {
      const {
        value: O
      } = i;
      O && O.blur();
    }
    function be(O) {
      const {
        value: K
      } = c;
      K && K.setTextContent(`+${O}`);
    }
    function Ce() {
      const {
        value: O
      } = h;
      return O;
    }
    function Be() {
      return i.value;
    }
    let Me = null;
    function ie() {
      Me !== null && window.clearTimeout(Me);
    }
    function R() {
      e.active || (ie(), Me = window.setTimeout(() => {
        C.value && (f.value = !0);
      }, 100));
    }
    function $() {
      ie();
    }
    function N(O) {
      O || (ie(), f.value = !1);
    }
    Rl(C, (O) => {
      O || (f.value = !1);
    }), JP(() => {
      QP(() => {
        const O = d.value;
        O && (e.disabled ? O.removeAttribute("tabindex") : O.tabIndex = m.value ? -1 : 0);
      });
    }), ip(a, e.onResize);
    const {
      inlineThemeDisabled: ne
    } = e, ge = Ko(() => {
      const {
        size: O
      } = e, {
        common: {
          cubicBezierEaseInOut: K
        },
        self: {
          fontWeight: ve,
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
          colorActive: H,
          boxShadowFocus: oe,
          boxShadowActive: ce,
          boxShadowHover: ue,
          border: we,
          borderFocus: ye,
          borderHover: ke,
          borderActive: Ae,
          arrowColor: ot,
          arrowColorDisabled: Ne,
          loadingColor: Pt,
          // form warning
          colorActiveWarning: Mt,
          boxShadowFocusWarning: It,
          boxShadowActiveWarning: Nt,
          boxShadowHoverWarning: Ht,
          borderWarning: Qt,
          borderFocusWarning: jt,
          borderHoverWarning: B,
          borderActiveWarning: re,
          // form error
          colorActiveError: Se,
          boxShadowFocusError: Oe,
          boxShadowActiveError: He,
          boxShadowHoverError: Ve,
          borderError: rt,
          borderFocusError: ct,
          borderHoverError: Xt,
          borderActiveError: En,
          // clear
          clearColor: On,
          clearColorHover: vo,
          clearColorPressed: hr,
          clearSize: pr,
          // arrow
          arrowSize: vr,
          [ae("height", O)]: mr,
          [ae("fontSize", O)]: gr
        }
      } = u.value, Kn = Yt(Ze), qn = Yt(mt);
      return {
        "--n-bezier": K,
        "--n-border": we,
        "--n-border-active": Ae,
        "--n-border-focus": ye,
        "--n-border-hover": ke,
        "--n-border-radius": Te,
        "--n-box-shadow-active": ce,
        "--n-box-shadow-focus": oe,
        "--n-box-shadow-hover": ue,
        "--n-caret-color": et,
        "--n-color": lt,
        "--n-color-active": H,
        "--n-color-disabled": fe,
        "--n-font-size": gr,
        "--n-height": mr,
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
        "--n-color-active-warning": Mt,
        "--n-box-shadow-focus-warning": It,
        "--n-box-shadow-active-warning": Nt,
        "--n-box-shadow-hover-warning": Ht,
        "--n-border-warning": Qt,
        "--n-border-focus-warning": jt,
        "--n-border-hover-warning": B,
        "--n-border-active-warning": re,
        // form error
        "--n-color-active-error": Se,
        "--n-box-shadow-focus-error": Oe,
        "--n-box-shadow-active-error": He,
        "--n-box-shadow-hover-error": Ve,
        "--n-border-error": rt,
        "--n-border-focus-error": ct,
        "--n-border-hover-error": Xt,
        "--n-border-active-error": En,
        // clear
        "--n-clear-size": pr,
        "--n-clear-color": On,
        "--n-clear-color-hover": vo,
        "--n-clear-color-pressed": hr,
        // arrow-size
        "--n-arrow-size": vr,
        // font-weight
        "--n-font-weight": ve
      };
    }), he = ne ? wt("internal-selection", Ko(() => e.size[0]), ge, e) : void 0;
    return {
      mergedTheme: u,
      mergedClearable: b,
      mergedClsPrefix: t,
      rtlEnabled: o,
      patternInputFocused: m,
      filterablePlaceholder: x,
      label: w,
      selected: C,
      showTagsPanel: f,
      isComposing: A,
      // dom ref
      counterRef: c,
      counterWrapperRef: h,
      patternInputMirrorRef: r,
      patternInputRef: i,
      selfRef: a,
      multipleElRef: l,
      singleElRef: s,
      patternInputWrapperRef: d,
      overflowRef: p,
      inputTagElRef: v,
      handleMouseDown: te,
      handleFocusin: I,
      handleClear: G,
      handleMouseEnter: L,
      handleMouseLeave: Z,
      handleDeleteOption: q,
      handlePatternKeyDown: F,
      handlePatternInputInput: J,
      handlePatternInputBlur: pe,
      handlePatternInputFocus: de,
      handleMouseEnterCounter: R,
      handleMouseLeaveCounter: $,
      handleFocusout: z,
      handleCompositionEnd: ee,
      handleCompositionStart: Q,
      onPopoverUpdateShow: N,
      focus: se,
      focusInput: $e,
      blur: Y,
      blurInput: me,
      updateCounter: be,
      getCounter: Ce,
      getTail: Be,
      renderLabel: e.renderLabel,
      cssVars: ne ? void 0 : ge,
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
      bordered: a,
      clsPrefix: l,
      ellipsisTagPopoverProps: s,
      onRender: d,
      renderTag: c,
      renderLabel: h
    } = this;
    d == null || d();
    const p = i === "responsive", v = typeof i == "number", f = p || v, m = Le(ms, null, {
      default: () => Le(Qp, {
        clsPrefix: l,
        loading: this.loading,
        showArrow: this.showArrow,
        showClear: this.mergedClearable && this.selected,
        onClear: this.handleClear
      }, {
        default: () => {
          var u, b;
          return (b = (u = this.$slots).arrow) === null || b === void 0 ? void 0 : b.call(u);
        }
      })
    });
    let g;
    if (t) {
      const {
        labelField: u
      } = this, b = (M) => Le("div", {
        class: `${l}-base-selection-tag-wrapper`,
        key: M.value
      }, c ? c({
        option: M,
        handleClose: () => {
          this.handleDeleteOption(M);
        }
      }) : Le(la, {
        size: n,
        closable: !M.disabled,
        disabled: o,
        onClose: () => {
          this.handleDeleteOption(M);
        },
        internalCloseIsButtonTag: !1,
        internalCloseFocusable: !1
      }, {
        default: () => h ? h(M, !0) : $n(M[u], M, !0)
      })), x = () => (v ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(b), w = r ? Le("div", {
        class: `${l}-base-selection-input-tag`,
        ref: "inputTagElRef",
        key: "__input-tag__"
      }, Le("input", Object.assign({}, this.inputProps, {
        ref: "patternInputRef",
        tabindex: -1,
        disabled: o,
        value: this.pattern,
        autofocus: this.autofocus,
        class: `${l}-base-selection-input-tag__input`,
        onBlur: this.handlePatternInputBlur,
        onFocus: this.handlePatternInputFocus,
        onKeydown: this.handlePatternKeyDown,
        onInput: this.handlePatternInputInput,
        onCompositionstart: this.handleCompositionStart,
        onCompositionend: this.handleCompositionEnd
      })), Le("span", {
        ref: "patternInputMirrorRef",
        class: `${l}-base-selection-input-tag__mirror`
      }, this.pattern)) : null, C = p ? () => Le("div", {
        class: `${l}-base-selection-tag-wrapper`,
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
        const M = this.selectedOptions.length - i;
        M > 0 && (S = Le("div", {
          class: `${l}-base-selection-tag-wrapper`,
          key: "__counter__"
        }, Le(la, {
          size: n,
          ref: "counterRef",
          onMouseenter: this.handleMouseEnterCounter,
          disabled: o
        }, {
          default: () => `+${M}`
        })));
      }
      const y = p ? r ? Le(Ec, {
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
        tail: () => w
      }) : Le(Ec, {
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
      }) : v && S ? x().concat(S) : x(), T = f ? () => Le("div", {
        class: `${l}-base-selection-popover`
      }, p ? x() : this.selectedOptions.map(b)) : void 0, k = f ? Object.assign({
        show: this.showTagsPanel,
        trigger: "hover",
        overlap: !0,
        placement: "top",
        width: "trigger",
        onUpdateShow: this.onPopoverUpdateShow,
        theme: this.mergedTheme.peers.Popover,
        themeOverrides: this.mergedTheme.peerOverrides.Popover
      }, s) : null, U = (this.selected ? !1 : this.active ? !this.pattern && !this.isComposing : !0) ? Le("div", {
        class: `${l}-base-selection-placeholder ${l}-base-selection-overlay`
      }, Le("div", {
        class: `${l}-base-selection-placeholder__inner`
      }, this.placeholder)) : null, _ = r ? Le("div", {
        ref: "patternInputWrapperRef",
        class: `${l}-base-selection-tags`
      }, y, p ? null : w, m) : Le("div", {
        ref: "multipleElRef",
        class: `${l}-base-selection-tags`,
        tabindex: o ? void 0 : 0
      }, y, m);
      g = Le(YP, null, f ? Le(ci, Object.assign({}, k, {
        scrollable: !0,
        style: "max-height: calc(var(--v-target-height) * 6.6);"
      }), {
        trigger: () => _,
        default: T
      }) : _, U);
    } else if (r) {
      const u = this.pattern || this.isComposing, b = this.active ? !u : !this.selected, x = this.active ? !1 : this.selected;
      g = Le("div", {
        ref: "patternInputWrapperRef",
        class: `${l}-base-selection-label`,
        title: this.patternInputFocused ? void 0 : Ic(this.label)
      }, Le("input", Object.assign({}, this.inputProps, {
        ref: "patternInputRef",
        class: `${l}-base-selection-input`,
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
      })), x ? Le("div", {
        class: `${l}-base-selection-label__render-label ${l}-base-selection-overlay`,
        key: "input"
      }, Le("div", {
        class: `${l}-base-selection-overlay__wrapper`
      }, c ? c({
        option: this.selectedOption,
        handleClose: () => {
        }
      }) : h ? h(this.selectedOption, !0) : $n(this.label, this.selectedOption, !0))) : null, b ? Le("div", {
        class: `${l}-base-selection-placeholder ${l}-base-selection-overlay`,
        key: "placeholder"
      }, Le("div", {
        class: `${l}-base-selection-overlay__wrapper`
      }, this.filterablePlaceholder)) : null, m);
    } else
      g = Le("div", {
        ref: "singleElRef",
        class: `${l}-base-selection-label`,
        tabindex: this.disabled ? void 0 : 0
      }, this.label !== void 0 ? Le("div", {
        class: `${l}-base-selection-input`,
        title: Ic(this.label),
        key: "input"
      }, Le("div", {
        class: `${l}-base-selection-input__content`
      }, c ? c({
        option: this.selectedOption,
        handleClose: () => {
        }
      }) : h ? h(this.selectedOption, !0) : $n(this.label, this.selectedOption, !0))) : Le("div", {
        class: `${l}-base-selection-placeholder ${l}-base-selection-overlay`,
        key: "placeholder"
      }, Le("div", {
        class: `${l}-base-selection-placeholder__inner`
      }, this.placeholder)), m);
    return Le("div", {
      ref: "selfRef",
      class: [`${l}-base-selection`, this.rtlEnabled && `${l}-base-selection--rtl`, this.themeClass, e && `${l}-base-selection--${e}-status`, {
        [`${l}-base-selection--active`]: this.active,
        [`${l}-base-selection--selected`]: this.selected || this.active && this.pattern,
        [`${l}-base-selection--disabled`]: this.disabled,
        [`${l}-base-selection--multiple`]: this.multiple,
        // focus is not controlled by selection itself since it always need
        // to be managed together with menu. provide :focus style will cause
        // many redundant codes.
        [`${l}-base-selection--focus`]: this.focused
      }],
      style: this.cssVars,
      onClick: this.onClick,
      onMouseenter: this.handleMouseEnter,
      onMouseleave: this.handleMouseLeave,
      onKeydown: this.onKeydown,
      onFocusin: this.handleFocusin,
      onFocusout: this.handleFocusout,
      onMousedown: this.handleMouseDown
    }, g, a ? Le("div", {
      class: `${l}-base-selection__border`
    }) : null, a ? Le("div", {
      class: `${l}-base-selection__state-border`
    }) : null);
  }
}), {
  cubicBezierEaseInOut: Yn
} = Ao;
function t_({
  duration: e = ".2s",
  delay: t = ".1s"
} = {}) {
  return [W("&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to", {
    opacity: 1
  }), W("&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from", `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), W("&.fade-in-width-expand-transition-leave-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${Yn},
 max-width ${e} ${Yn} ${t},
 margin-left ${e} ${Yn} ${t},
 margin-right ${e} ${Yn} ${t};
 `), W("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${Yn} ${t},
 max-width ${e} ${Yn},
 margin-left ${e} ${Yn},
 margin-right ${e} ${Yn};
 `)];
}
const n_ = V("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`), o_ = window.Vue.defineComponent, r_ = window.Vue.h, i_ = window.Vue.nextTick, a_ = window.Vue.onBeforeUnmount, Iu = window.Vue.ref, l_ = window.Vue.toRef, s_ = o_({
  name: "BaseWave",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    Vo("-base-wave", n_, l_(e, "clsPrefix"));
    const t = Iu(null), n = Iu(!1);
    let o = null;
    return a_(() => {
      o !== null && window.clearTimeout(o);
    }), {
      active: n,
      selfRef: t,
      play() {
        o !== null && (window.clearTimeout(o), n.value = !1, o = null), i_(() => {
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
    return r_("div", {
      ref: "selfRef",
      "aria-hidden": !0,
      class: [`${e}-base-wave`, this.active && `${e}-base-wave--active`]
    });
  }
}), d_ = lr && "chrome" in window;
lr && navigator.userAgent.includes("Firefox");
const tv = lr && navigator.userAgent.includes("Safari") && !d_, c_ = {
  paddingTiny: "0 8px",
  paddingSmall: "0 10px",
  paddingMedium: "0 12px",
  paddingLarge: "0 14px",
  clearSize: "16px"
};
function u_(e) {
  const {
    textColor2: t,
    textColor3: n,
    textColorDisabled: o,
    primaryColor: r,
    primaryColorHover: i,
    inputColor: a,
    inputColorDisabled: l,
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
    fontSizeLarge: b,
    heightTiny: x,
    heightSmall: w,
    heightMedium: C,
    heightLarge: S,
    actionColor: y,
    clearColor: T,
    clearColorHover: k,
    clearColorPressed: E,
    placeholderColor: U,
    placeholderColorDisabled: _,
    iconColor: M,
    iconColorDisabled: I,
    iconColorHover: z,
    iconColorPressed: G,
    fontWeight: L
  } = e;
  return Object.assign(Object.assign({}, c_), {
    fontWeight: L,
    countTextColorDisabled: o,
    countTextColor: n,
    heightTiny: x,
    heightSmall: w,
    heightMedium: C,
    heightLarge: S,
    fontSizeTiny: m,
    fontSizeSmall: g,
    fontSizeMedium: u,
    fontSizeLarge: b,
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
    placeholderColor: U,
    placeholderColorDisabled: _,
    color: a,
    colorDisabled: l,
    colorFocus: a,
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
    colorFocusWarning: a,
    borderFocusWarning: `1px solid ${c}`,
    boxShadowFocusWarning: `0 0 0 2px ${Ee(d, {
      alpha: 0.2
    })}`,
    caretColorWarning: d,
    // error
    loadingColorError: h,
    borderError: `1px solid ${h}`,
    borderHoverError: `1px solid ${p}`,
    colorFocusError: a,
    borderFocusError: `1px solid ${p}`,
    boxShadowFocusError: `0 0 0 2px ${Ee(h, {
      alpha: 0.2
    })}`,
    caretColorError: h,
    clearColor: T,
    clearColorHover: k,
    clearColorPressed: E,
    iconColor: M,
    iconColorDisabled: I,
    iconColorHover: z,
    iconColorPressed: G,
    suffixTextColor: t
  });
}
const wd = {
  name: "Input",
  common: vt,
  peers: {
    Scrollbar: si
  },
  self: u_
}, nv = "n-input", f_ = V("input", `
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
  D("input, textarea", `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),
  D("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder", `
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
  D("input-el, textarea-el", `
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `, [W("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 width: 0;
 height: 0;
 display: none;
 `), W("&::placeholder", `
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `), W("&:-webkit-autofill ~", [D("placeholder", "display: none;")])]),
  X("round", [Qe("textarea", "border-radius: calc(var(--n-height) / 2);")]),
  D("placeholder", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `, [W("span", `
 width: 100%;
 display: inline-block;
 `)]),
  X("textarea", [D("placeholder", "overflow: visible;")]),
  Qe("autosize", "width: 100%;"),
  X("autosize", [D("textarea-el, input-el", `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),
  // input
  V("input-wrapper", `
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `),
  D("input-mirror", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `),
  D("input-el", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [W("&[type=password]::-ms-reveal", "display: none;"), W("+", [D("placeholder", `
 display: flex;
 align-items: center; 
 `)])]),
  Qe("textarea", [D("placeholder", "white-space: nowrap;")]),
  D("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `),
  // textarea
  X("textarea", "width: 100%;", [V("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), X("resizable", [V("input-wrapper", `
 resize: vertical;
 min-height: var(--n-height);
 `)]), D("textarea-el, textarea-mirror, placeholder", `
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
 `), D("textarea-mirror", `
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),
  // pair
  X("pair", [D("input-el, placeholder", "text-align: center;"), D("separator", `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `, [V("icon", `
 color: var(--n-icon-color);
 `), V("base-icon", `
 color: var(--n-icon-color);
 `)])]),
  X("disabled", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [D("border", "border: var(--n-border-disabled);"), D("input-el, textarea-el", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), D("placeholder", "color: var(--n-placeholder-color-disabled);"), D("separator", "color: var(--n-text-color-disabled);", [V("icon", `
 color: var(--n-icon-color-disabled);
 `), V("base-icon", `
 color: var(--n-icon-color-disabled);
 `)]), V("input-word-count", `
 color: var(--n-count-text-color-disabled);
 `), D("suffix, prefix", "color: var(--n-text-color-disabled);", [V("icon", `
 color: var(--n-icon-color-disabled);
 `), V("internal-icon", `
 color: var(--n-icon-color-disabled);
 `)])]),
  Qe("disabled", [D("eye", `
 color: var(--n-icon-color);
 cursor: pointer;
 `, [W("&:hover", `
 color: var(--n-icon-color-hover);
 `), W("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), W("&:hover", [D("state-border", "border: var(--n-border-hover);")]), X("focus", "background-color: var(--n-color-focus);", [D("state-border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),
  D("border, state-border", `
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
  D("state-border", `
 border-color: #0000;
 z-index: 1;
 `),
  D("prefix", "margin-right: 4px;"),
  D("suffix", `
 margin-left: 4px;
 `),
  D("suffix, prefix", `
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `, [V("base-loading", `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `), V("base-clear", `
 font-size: var(--n-icon-size);
 `, [D("placeholder", [V("base-icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), W(">", [V("icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), V("base-icon", `
 font-size: var(--n-icon-size);
 `)]),
  V("input-word-count", `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),
  ["warning", "error"].map((e) => X(`${e}-status`, [Qe("disabled", [V("base-loading", `
 color: var(--n-loading-color-${e})
 `), D("input-el, textarea-el", `
 caret-color: var(--n-caret-color-${e});
 `), D("state-border", `
 border: var(--n-border-${e});
 `), W("&:hover", [D("state-border", `
 border: var(--n-border-hover-${e});
 `)]), W("&:focus", `
 background-color: var(--n-color-focus-${e});
 `, [D("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)]), X("focus", `
 background-color: var(--n-color-focus-${e});
 `, [D("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))
]), h_ = V("input", [X("disabled", [D("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]), p_ = window.Vue.ref, v_ = window.Vue.watch;
function m_(e) {
  let t = 0;
  for (const n of e)
    t++;
  return t;
}
function Bi(e) {
  return e === "" || e == null;
}
function g_(e) {
  const t = p_(null);
  function n() {
    const {
      value: i
    } = e;
    if (!(i != null && i.focus)) {
      r();
      return;
    }
    const {
      selectionStart: a,
      selectionEnd: l,
      value: s
    } = i;
    if (a == null || l == null) {
      r();
      return;
    }
    t.value = {
      start: a,
      end: l,
      beforeText: s.slice(0, a),
      afterText: s.slice(l)
    };
  }
  function o() {
    var i;
    const {
      value: a
    } = t, {
      value: l
    } = e;
    if (!a || !l)
      return;
    const {
      value: s
    } = l, {
      start: d,
      beforeText: c,
      afterText: h
    } = a;
    let p = s.length;
    if (s.endsWith(h))
      p = s.length - h.length;
    else if (s.startsWith(c))
      p = c.length;
    else {
      const v = c[d - 1], f = s.indexOf(v, d - 1);
      f !== -1 && (p = f + 1);
    }
    (i = l.setSelectionRange) === null || i === void 0 || i.call(l, p, p);
  }
  function r() {
    t.value = null;
  }
  return v_(e, r), {
    recordCursor: n,
    restoreCursor: o
  };
}
const b_ = window.Vue.computed, w_ = window.Vue.defineComponent, y_ = window.Vue.h, x_ = window.Vue.inject, Au = w_({
  name: "InputWordCount",
  setup(e, {
    slots: t
  }) {
    const {
      mergedValueRef: n,
      maxlengthRef: o,
      mergedClsPrefixRef: r,
      countGraphemesRef: i
    } = x_(nv), a = b_(() => {
      const {
        value: l
      } = n;
      return l === null || Array.isArray(l) ? 0 : (i.value || m_)(l);
    });
    return () => {
      const {
        value: l
      } = o, {
        value: s
      } = n;
      return y_("span", {
        class: `${r.value}-input-word-count`
      }, Ny(t.default, {
        value: s === null || Array.isArray(s) ? "" : s
      }, () => [l === void 0 ? a.value : `${a.value} / ${l}`]));
    };
  }
}), Zn = window.Vue.computed, C_ = window.Vue.defineComponent, S_ = window.Vue.Fragment, $_ = window.Vue.getCurrentInstance, De = window.Vue.h, Vu = window.Vue.nextTick, k_ = window.Vue.onMounted, R_ = window.Vue.provide, Tt = window.Vue.ref, Bu = window.Vue.toRef, Lu = window.Vue.watch, Du = window.Vue.watchEffect, P_ = Object.assign(Object.assign({}, _e.props), {
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
}), $o = C_({
  name: "Input",
  props: P_,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBorderedRef: n,
      inlineThemeDisabled: o,
      mergedRtlRef: r
    } = qe(e), i = _e("Input", "-input", f_, wd, e, t);
    tv && Vo("-input-safari", h_, t);
    const a = Tt(null), l = Tt(null), s = Tt(null), d = Tt(null), c = Tt(null), h = Tt(null), p = Tt(null), v = g_(p), f = Tt(null), {
      localeRef: m
    } = dr("Input"), g = Tt(e.defaultValue), u = Bu(e, "value"), b = Ot(u, g), x = jn(e), {
      mergedSizeRef: w,
      mergedDisabledRef: C,
      mergedStatusRef: S
    } = x, y = Tt(!1), T = Tt(!1), k = Tt(!1), E = Tt(!1);
    let U = null;
    const _ = Zn(() => {
      const {
        placeholder: B,
        pair: re
      } = e;
      return re ? Array.isArray(B) ? B : B === void 0 ? ["", ""] : [B, B] : B === void 0 ? [m.value.placeholder] : [B];
    }), M = Zn(() => {
      const {
        value: B
      } = k, {
        value: re
      } = b, {
        value: Se
      } = _;
      return !B && (Bi(re) || Array.isArray(re) && Bi(re[0])) && Se[0];
    }), I = Zn(() => {
      const {
        value: B
      } = k, {
        value: re
      } = b, {
        value: Se
      } = _;
      return !B && Se[1] && (Bi(re) || Array.isArray(re) && Bi(re[1]));
    }), z = ze(() => e.internalForceFocus || y.value), G = ze(() => {
      if (C.value || e.readonly || !e.clearable || !z.value && !T.value)
        return !1;
      const {
        value: B
      } = b, {
        value: re
      } = z;
      return e.pair ? !!(Array.isArray(B) && (B[0] || B[1])) && (T.value || re) : !!B && (T.value || re);
    }), L = Zn(() => {
      const {
        showPasswordOn: B
      } = e;
      if (B)
        return B;
      if (e.showPasswordToggle) return "click";
    }), Z = Tt(!1), te = Zn(() => {
      const {
        textDecoration: B
      } = e;
      return B ? Array.isArray(B) ? B.map((re) => ({
        textDecoration: re
      })) : [{
        textDecoration: B
      }] : ["", ""];
    }), q = Tt(void 0), A = () => {
      var B, re;
      if (e.type === "textarea") {
        const {
          autosize: Se
        } = e;
        if (Se && (q.value = (re = (B = f.value) === null || B === void 0 ? void 0 : B.$el) === null || re === void 0 ? void 0 : re.offsetWidth), !l.value || typeof Se == "boolean") return;
        const {
          paddingTop: Oe,
          paddingBottom: He,
          lineHeight: Ve
        } = window.getComputedStyle(l.value), rt = Number(Oe.slice(0, -2)), ct = Number(He.slice(0, -2)), Xt = Number(Ve.slice(0, -2)), {
          value: En
        } = s;
        if (!En) return;
        if (Se.minRows) {
          const On = Math.max(Se.minRows, 1), vo = `${rt + ct + Xt * On}px`;
          En.style.minHeight = vo;
        }
        if (Se.maxRows) {
          const On = `${rt + ct + Xt * Se.maxRows}px`;
          En.style.maxHeight = On;
        }
      }
    }, F = Zn(() => {
      const {
        maxlength: B
      } = e;
      return B === void 0 ? void 0 : Number(B);
    });
    k_(() => {
      const {
        value: B
      } = b;
      Array.isArray(B) || Ae(B);
    });
    const j = $_().proxy;
    function J(B, re) {
      const {
        onUpdateValue: Se,
        "onUpdate:value": Oe,
        onInput: He
      } = e, {
        nTriggerFormInput: Ve
      } = x;
      Se && le(Se, B, re), Oe && le(Oe, B, re), He && le(He, B, re), g.value = B, Ve();
    }
    function Q(B, re) {
      const {
        onChange: Se
      } = e, {
        nTriggerFormChange: Oe
      } = x;
      Se && le(Se, B, re), g.value = B, Oe();
    }
    function ee(B) {
      const {
        onBlur: re
      } = e, {
        nTriggerFormBlur: Se
      } = x;
      re && le(re, B), Se();
    }
    function de(B) {
      const {
        onFocus: re
      } = e, {
        nTriggerFormFocus: Se
      } = x;
      re && le(re, B), Se();
    }
    function pe(B) {
      const {
        onClear: re
      } = e;
      re && le(re, B);
    }
    function Y(B) {
      const {
        onInputBlur: re
      } = e;
      re && le(re, B);
    }
    function se(B) {
      const {
        onInputFocus: re
      } = e;
      re && le(re, B);
    }
    function $e() {
      const {
        onDeactivate: B
      } = e;
      B && le(B);
    }
    function me() {
      const {
        onActivate: B
      } = e;
      B && le(B);
    }
    function be(B) {
      const {
        onClick: re
      } = e;
      re && le(re, B);
    }
    function Ce(B) {
      const {
        onWrapperFocus: re
      } = e;
      re && le(re, B);
    }
    function Be(B) {
      const {
        onWrapperBlur: re
      } = e;
      re && le(re, B);
    }
    function Me() {
      k.value = !0;
    }
    function ie(B) {
      k.value = !1, B.target === h.value ? R(B, 1) : R(B, 0);
    }
    function R(B, re = 0, Se = "input") {
      const Oe = B.target.value;
      if (Ae(Oe), B instanceof InputEvent && !B.isComposing && (k.value = !1), e.type === "textarea") {
        const {
          value: Ve
        } = f;
        Ve && Ve.syncUnifiedContainer();
      }
      if (U = Oe, k.value) return;
      v.recordCursor();
      const He = $(Oe);
      if (He)
        if (!e.pair)
          Se === "input" ? J(Oe, {
            source: re
          }) : Q(Oe, {
            source: re
          });
        else {
          let {
            value: Ve
          } = b;
          Array.isArray(Ve) ? Ve = [Ve[0], Ve[1]] : Ve = ["", ""], Ve[re] = Oe, Se === "input" ? J(Ve, {
            source: re
          }) : Q(Ve, {
            source: re
          });
        }
      j.$forceUpdate(), He || Vu(v.restoreCursor);
    }
    function $(B) {
      const {
        countGraphemes: re,
        maxlength: Se,
        minlength: Oe
      } = e;
      if (re) {
        let Ve;
        if (Se !== void 0 && (Ve === void 0 && (Ve = re(B)), Ve > Number(Se)) || Oe !== void 0 && (Ve === void 0 && (Ve = re(B)), Ve < Number(Se)))
          return !1;
      }
      const {
        allowInput: He
      } = e;
      return typeof He == "function" ? He(B) : !0;
    }
    function N(B) {
      Y(B), B.relatedTarget === a.value && $e(), B.relatedTarget !== null && (B.relatedTarget === c.value || B.relatedTarget === h.value || B.relatedTarget === l.value) || (E.value = !1), O(B, "blur"), p.value = null;
    }
    function ne(B, re) {
      se(B), y.value = !0, E.value = !0, me(), O(B, "focus"), re === 0 ? p.value = c.value : re === 1 ? p.value = h.value : re === 2 && (p.value = l.value);
    }
    function ge(B) {
      e.passivelyActivated && (Be(B), O(B, "blur"));
    }
    function he(B) {
      e.passivelyActivated && (y.value = !0, Ce(B), O(B, "focus"));
    }
    function O(B, re) {
      B.relatedTarget !== null && (B.relatedTarget === c.value || B.relatedTarget === h.value || B.relatedTarget === l.value || B.relatedTarget === a.value) || (re === "focus" ? (de(B), y.value = !0) : re === "blur" && (ee(B), y.value = !1));
    }
    function K(B, re) {
      R(B, re, "change");
    }
    function ve(B) {
      be(B);
    }
    function Te(B) {
      pe(B), lt();
    }
    function lt() {
      e.pair ? (J(["", ""], {
        source: "clear"
      }), Q(["", ""], {
        source: "clear"
      })) : (J("", {
        source: "clear"
      }), Q("", {
        source: "clear"
      }));
    }
    function pt(B) {
      const {
        onMousedown: re
      } = e;
      re && re(B);
      const {
        tagName: Se
      } = B.target;
      if (Se !== "INPUT" && Se !== "TEXTAREA") {
        if (e.resizable) {
          const {
            value: Oe
          } = a;
          if (Oe) {
            const {
              left: He,
              top: Ve,
              width: rt,
              height: ct
            } = Oe.getBoundingClientRect(), Xt = 14;
            if (He + rt - Xt < B.clientX && B.clientX < He + rt && Ve + ct - Xt < B.clientY && B.clientY < Ve + ct)
              return;
          }
        }
        B.preventDefault(), y.value || oe();
      }
    }
    function Ye() {
      var B;
      T.value = !0, e.type === "textarea" && ((B = f.value) === null || B === void 0 || B.handleMouseEnterWrapper());
    }
    function Ze() {
      var B;
      T.value = !1, e.type === "textarea" && ((B = f.value) === null || B === void 0 || B.handleMouseLeaveWrapper());
    }
    function mt() {
      C.value || L.value === "click" && (Z.value = !Z.value);
    }
    function et(B) {
      if (C.value) return;
      B.preventDefault();
      const re = (Oe) => {
        Oe.preventDefault(), Je("mouseup", document, re);
      };
      if (at("mouseup", document, re), L.value !== "mousedown") return;
      Z.value = !0;
      const Se = () => {
        Z.value = !1, Je("mouseup", document, Se);
      };
      at("mouseup", document, Se);
    }
    function fe(B) {
      e.onKeyup && le(e.onKeyup, B);
    }
    function Re(B) {
      switch (e.onKeydown && le(e.onKeydown, B), B.key) {
        case "Escape":
          H();
          break;
        case "Enter":
          P(B);
          break;
      }
    }
    function P(B) {
      var re, Se;
      if (e.passivelyActivated) {
        const {
          value: Oe
        } = E;
        if (Oe) {
          e.internalDeactivateOnEnter && H();
          return;
        }
        B.preventDefault(), e.type === "textarea" ? (re = l.value) === null || re === void 0 || re.focus() : (Se = c.value) === null || Se === void 0 || Se.focus();
      }
    }
    function H() {
      e.passivelyActivated && (E.value = !1, Vu(() => {
        var B;
        (B = a.value) === null || B === void 0 || B.focus();
      }));
    }
    function oe() {
      var B, re, Se;
      C.value || (e.passivelyActivated ? (B = a.value) === null || B === void 0 || B.focus() : ((re = l.value) === null || re === void 0 || re.focus(), (Se = c.value) === null || Se === void 0 || Se.focus()));
    }
    function ce() {
      var B;
      !((B = a.value) === null || B === void 0) && B.contains(document.activeElement) && document.activeElement.blur();
    }
    function ue() {
      var B, re;
      (B = l.value) === null || B === void 0 || B.select(), (re = c.value) === null || re === void 0 || re.select();
    }
    function we() {
      C.value || (l.value ? l.value.focus() : c.value && c.value.focus());
    }
    function ye() {
      const {
        value: B
      } = a;
      B != null && B.contains(document.activeElement) && B !== document.activeElement && H();
    }
    function ke(B) {
      if (e.type === "textarea") {
        const {
          value: re
        } = l;
        re == null || re.scrollTo(B);
      } else {
        const {
          value: re
        } = c;
        re == null || re.scrollTo(B);
      }
    }
    function Ae(B) {
      const {
        type: re,
        pair: Se,
        autosize: Oe
      } = e;
      if (!Se && Oe)
        if (re === "textarea") {
          const {
            value: He
          } = s;
          He && (He.textContent = `${B ?? ""}\r
`);
        } else {
          const {
            value: He
          } = d;
          He && (B ? He.textContent = B : He.innerHTML = "&nbsp;");
        }
    }
    function ot() {
      A();
    }
    const Ne = Tt({
      top: "0"
    });
    function Pt(B) {
      var re;
      const {
        scrollTop: Se
      } = B.target;
      Ne.value.top = `${-Se}px`, (re = f.value) === null || re === void 0 || re.syncUnifiedContainer();
    }
    let Mt = null;
    Du(() => {
      const {
        autosize: B,
        type: re
      } = e;
      B && re === "textarea" ? Mt = Lu(b, (Se) => {
        !Array.isArray(Se) && Se !== U && Ae(Se);
      }) : Mt == null || Mt();
    });
    let It = null;
    Du(() => {
      e.type === "textarea" ? It = Lu(b, (B) => {
        var re;
        !Array.isArray(B) && B !== U && ((re = f.value) === null || re === void 0 || re.syncUnifiedContainer());
      }) : It == null || It();
    }), R_(nv, {
      mergedValueRef: b,
      maxlengthRef: F,
      mergedClsPrefixRef: t,
      countGraphemesRef: Bu(e, "countGraphemes")
    });
    const Nt = {
      wrapperElRef: a,
      inputElRef: c,
      textareaElRef: l,
      isCompositing: k,
      clear: lt,
      focus: oe,
      blur: ce,
      select: ue,
      deactivate: ye,
      activate: we,
      scrollTo: ke
    }, Ht = zt("Input", r, t), Qt = Zn(() => {
      const {
        value: B
      } = w, {
        common: {
          cubicBezierEaseInOut: re
        },
        self: {
          color: Se,
          borderRadius: Oe,
          textColor: He,
          caretColor: Ve,
          caretColorError: rt,
          caretColorWarning: ct,
          textDecorationColor: Xt,
          border: En,
          borderDisabled: On,
          borderHover: vo,
          borderFocus: hr,
          placeholderColor: pr,
          placeholderColorDisabled: vr,
          lineHeightTextarea: mr,
          colorDisabled: gr,
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
          borderHoverError: Bv,
          clearSize: Lv,
          clearColor: Dv,
          clearColorHover: Nv,
          clearColorPressed: Hv,
          iconColor: jv,
          iconColorDisabled: Wv,
          suffixTextColor: Uv,
          countTextColor: Kv,
          countTextColorDisabled: qv,
          iconColorHover: Gv,
          iconColorPressed: Xv,
          loadingColor: Yv,
          loadingColorError: Zv,
          loadingColorWarning: Jv,
          fontWeight: Qv,
          [ae("padding", B)]: em,
          [ae("fontSize", B)]: tm,
          [ae("height", B)]: nm
        }
      } = i.value, {
        left: om,
        right: rm
      } = Yt(em);
      return {
        "--n-bezier": re,
        "--n-count-text-color": Kv,
        "--n-count-text-color-disabled": qv,
        "--n-color": Se,
        "--n-font-size": tm,
        "--n-font-weight": Qv,
        "--n-border-radius": Oe,
        "--n-height": nm,
        "--n-padding-left": om,
        "--n-padding-right": rm,
        "--n-text-color": He,
        "--n-caret-color": Ve,
        "--n-text-decoration-color": Xt,
        "--n-border": En,
        "--n-border-disabled": On,
        "--n-border-hover": vo,
        "--n-border-focus": hr,
        "--n-placeholder-color": pr,
        "--n-placeholder-color-disabled": vr,
        "--n-icon-size": Aa,
        "--n-line-height-textarea": mr,
        "--n-color-disabled": gr,
        "--n-color-focus": Kn,
        "--n-text-color-disabled": qn,
        "--n-box-shadow-focus": Ia,
        "--n-loading-color": Yv,
        // form warning
        "--n-caret-color-warning": ct,
        "--n-color-focus-warning": Va,
        "--n-box-shadow-focus-warning": Ba,
        "--n-border-warning": La,
        "--n-border-focus-warning": Da,
        "--n-border-hover-warning": Na,
        "--n-loading-color-warning": Jv,
        // form error
        "--n-caret-color-error": rt,
        "--n-color-focus-error": Ha,
        "--n-box-shadow-focus-error": ja,
        "--n-border-error": Wa,
        "--n-border-focus-error": Ua,
        "--n-border-hover-error": Bv,
        "--n-loading-color-error": Zv,
        // clear-button
        "--n-clear-color": Dv,
        "--n-clear-size": Lv,
        "--n-clear-color-hover": Nv,
        "--n-clear-color-pressed": Hv,
        "--n-icon-color": jv,
        "--n-icon-color-hover": Gv,
        "--n-icon-color-pressed": Xv,
        "--n-icon-color-disabled": Wv,
        "--n-suffix-text-color": Uv
      };
    }), jt = o ? wt("input", Zn(() => {
      const {
        value: B
      } = w;
      return B[0];
    }), Qt, e) : void 0;
    return Object.assign(Object.assign({}, Nt), {
      // DOM ref
      wrapperElRef: a,
      inputElRef: c,
      inputMirrorElRef: d,
      inputEl2Ref: h,
      textareaElRef: l,
      textareaMirrorElRef: s,
      textareaScrollbarInstRef: f,
      // value
      rtlEnabled: Ht,
      uncontrolledValue: g,
      mergedValue: b,
      passwordVisible: Z,
      mergedPlaceholder: _,
      showPlaceholder1: M,
      showPlaceholder2: I,
      mergedFocus: z,
      isComposing: k,
      activated: E,
      showClearButton: G,
      mergedSize: w,
      mergedDisabled: C,
      textDecorationStyle: te,
      mergedClsPrefix: t,
      mergedBordered: n,
      mergedShowPasswordOn: L,
      placeholderStyle: Ne,
      mergedStatus: S,
      textAreaScrollContainerWidth: q,
      // methods
      handleTextAreaScroll: Pt,
      handleCompositionStart: Me,
      handleCompositionEnd: ie,
      handleInput: R,
      handleInputBlur: N,
      handleInputFocus: ne,
      handleWrapperBlur: ge,
      handleWrapperFocus: he,
      handleMouseEnter: Ye,
      handleMouseLeave: Ze,
      handleMouseDown: pt,
      handleChange: K,
      handleClick: ve,
      handleClear: Te,
      handlePasswordToggleClick: mt,
      handlePasswordToggleMousedown: et,
      handleWrapperKeydown: Re,
      handleWrapperKeyup: fe,
      handleTextAreaMirrorResize: ot,
      getTextareaScrollContainer: () => l.value,
      mergedTheme: i,
      cssVars: o ? void 0 : Qt,
      themeClass: jt == null ? void 0 : jt.themeClass,
      onRender: jt == null ? void 0 : jt.onRender
    });
  },
  render() {
    var e, t, n, o, r, i, a;
    const {
      mergedClsPrefix: l,
      mergedStatus: s,
      themeClass: d,
      type: c,
      countGraphemes: h,
      onRender: p
    } = this, v = this.$slots;
    return p == null || p(), De("div", {
      ref: "wrapperElRef",
      class: [`${l}-input`, d, s && `${l}-input--${s}-status`, {
        [`${l}-input--rtl`]: this.rtlEnabled,
        [`${l}-input--disabled`]: this.mergedDisabled,
        [`${l}-input--textarea`]: c === "textarea",
        [`${l}-input--resizable`]: this.resizable && !this.autosize,
        [`${l}-input--autosize`]: this.autosize,
        [`${l}-input--round`]: this.round && c !== "textarea",
        [`${l}-input--pair`]: this.pair,
        [`${l}-input--focus`]: this.mergedFocus,
        [`${l}-input--stateful`]: this.stateful
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
      class: `${l}-input-wrapper`
    }, We(v.prefix, (f) => f && De("div", {
      class: `${l}-input__prefix`
    }, f)), c === "textarea" ? De(di, {
      ref: "textareaScrollbarInstRef",
      class: `${l}-input__textarea`,
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
        return De(S_, null, De("textarea", Object.assign({}, this.inputProps, {
          ref: "textareaElRef",
          class: [`${l}-input__textarea-el`, (f = this.inputProps) === null || f === void 0 ? void 0 : f.class],
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
          onFocus: (b) => {
            this.handleInputFocus(b, 2);
          },
          onInput: this.handleInput,
          onChange: this.handleChange,
          onScroll: this.handleTextAreaScroll
        })), this.showPlaceholder1 ? De("div", {
          class: `${l}-input__placeholder`,
          style: [this.placeholderStyle, u],
          key: "placeholder"
        }, this.mergedPlaceholder[0]) : null, this.autosize ? De(To, {
          onResize: this.handleTextAreaMirrorResize
        }, {
          default: () => De("div", {
            ref: "textareaMirrorElRef",
            class: `${l}-input__textarea-mirror`,
            key: "mirror"
          })
        }) : null);
      }
    }) : De("div", {
      class: `${l}-input__input`
    }, De("input", Object.assign({
      type: c === "password" && this.mergedShowPasswordOn && this.passwordVisible ? "text" : c
    }, this.inputProps, {
      ref: "inputElRef",
      class: [`${l}-input__input-el`, (r = this.inputProps) === null || r === void 0 ? void 0 : r.class],
      style: [this.textDecorationStyle[0], (i = this.inputProps) === null || i === void 0 ? void 0 : i.style],
      tabindex: this.passivelyActivated && !this.activated ? -1 : (a = this.inputProps) === null || a === void 0 ? void 0 : a.tabindex,
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
      class: `${l}-input__placeholder`
    }, De("span", null, this.mergedPlaceholder[0])) : null, this.autosize ? De("div", {
      class: `${l}-input__input-mirror`,
      key: "mirror",
      ref: "inputMirrorElRef"
    }, " ") : null), !this.pair && We(v.suffix, (f) => f || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? De("div", {
      class: `${l}-input__suffix`
    }, [We(v["clear-icon-placeholder"], (m) => (this.clearable || m) && De(Rs, {
      clsPrefix: l,
      show: this.showClearButton,
      onClear: this.handleClear
    }, {
      placeholder: () => m,
      icon: () => {
        var g, u;
        return (u = (g = this.$slots)["clear-icon"]) === null || u === void 0 ? void 0 : u.call(g);
      }
    })), this.internalLoadingBeforeSuffix ? null : f, this.loading !== void 0 ? De(Qp, {
      clsPrefix: l,
      loading: this.loading,
      showArrow: !1,
      showClear: !1,
      style: this.cssVars
    }) : null, this.internalLoadingBeforeSuffix ? f : null, this.showCount && this.type !== "textarea" ? De(Au, null, {
      default: (m) => {
        var g;
        const {
          renderCount: u
        } = this;
        return u ? u(m) : (g = v.count) === null || g === void 0 ? void 0 : g.call(v, m);
      }
    }) : null, this.mergedShowPasswordOn && this.type === "password" ? De("div", {
      class: `${l}-input__eye`,
      onMousedown: this.handlePasswordToggleMousedown,
      onClick: this.handlePasswordToggleClick
    }, this.passwordVisible ? vn(v["password-visible-icon"], () => [De(Ct, {
      clsPrefix: l
    }, {
      default: () => De(Ek, null)
    })]) : vn(v["password-invisible-icon"], () => [De(Ct, {
      clsPrefix: l
    }, {
      default: () => De(zk, null)
    })])) : null]) : null)), this.pair ? De("span", {
      class: `${l}-input__separator`
    }, vn(v.separator, () => [this.separator])) : null, this.pair ? De("div", {
      class: `${l}-input-wrapper`
    }, De("div", {
      class: `${l}-input__input`
    }, De("input", {
      ref: "inputEl2Ref",
      type: this.type,
      class: `${l}-input__input-el`,
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
      class: `${l}-input__placeholder`
    }, De("span", null, this.mergedPlaceholder[1])) : null), We(v.suffix, (f) => (this.clearable || f) && De("div", {
      class: `${l}-input__suffix`
    }, [this.clearable && De(Rs, {
      clsPrefix: l,
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
      class: `${l}-input__border`
    }) : null, this.mergedBordered ? De("div", {
      class: `${l}-input__state-border`
    }) : null, this.showCount && c === "textarea" ? De(Au, null, {
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
function ov(e) {
  return e.type === "ignored";
}
function Pl(e, t) {
  try {
    return !!(1 + t.toString().toLowerCase().indexOf(e.trim().toLowerCase()));
  } catch {
    return !1;
  }
}
function rv(e, t) {
  return {
    getIsGroup: xa,
    getIgnored: ov,
    getKey(o) {
      return xa(o) ? o.name || o.key || "key-required" : o[e];
    },
    getChildren(o) {
      return o[t];
    }
  };
}
function __(e, t, n, o) {
  if (!t) return e;
  function r(i) {
    if (!Array.isArray(i)) return [];
    const a = [];
    for (const l of i)
      if (xa(l)) {
        const s = r(l[o]);
        s.length && a.push(Object.assign({}, l, {
          [o]: s
        }));
      } else {
        if (ov(l))
          continue;
        t(n, l) && a.push(l);
      }
    return a;
  }
  return r(e);
}
function T_(e, t, n) {
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
function Li(e) {
  return je(e, [0, 0, 0, 0.12]);
}
const F_ = "n-button-group", E_ = {
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
function O_(e) {
  const {
    heightTiny: t,
    heightSmall: n,
    heightMedium: o,
    heightLarge: r,
    borderRadius: i,
    fontSizeTiny: a,
    fontSizeSmall: l,
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
    infoColor: b,
    infoColorHover: x,
    infoColorPressed: w,
    successColor: C,
    successColorHover: S,
    successColorPressed: y,
    warningColor: T,
    warningColorHover: k,
    warningColorPressed: E,
    errorColor: U,
    errorColorHover: _,
    errorColorPressed: M,
    fontWeight: I,
    buttonColor2: z,
    buttonColor2Hover: G,
    buttonColor2Pressed: L,
    fontWeightStrong: Z
  } = e;
  return Object.assign(Object.assign({}, E_), {
    heightTiny: t,
    heightSmall: n,
    heightMedium: o,
    heightLarge: r,
    borderRadiusTiny: i,
    borderRadiusSmall: i,
    borderRadiusMedium: i,
    borderRadiusLarge: i,
    fontSizeTiny: a,
    fontSizeSmall: l,
    fontSizeMedium: s,
    fontSizeLarge: d,
    opacityDisabled: c,
    // secondary
    colorOpacitySecondary: "0.16",
    colorOpacitySecondaryHover: "0.22",
    colorOpacitySecondaryPressed: "0.28",
    colorSecondary: z,
    colorSecondaryHover: G,
    colorSecondaryPressed: L,
    // tertiary
    colorTertiary: z,
    colorTertiaryHover: G,
    colorTertiaryPressed: L,
    // quaternary
    colorQuaternary: "#0000",
    colorQuaternaryHover: G,
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
    colorInfo: b,
    colorHoverInfo: x,
    colorPressedInfo: w,
    colorFocusInfo: x,
    colorDisabledInfo: b,
    textColorInfo: u,
    textColorHoverInfo: u,
    textColorPressedInfo: u,
    textColorFocusInfo: u,
    textColorDisabledInfo: u,
    textColorTextInfo: b,
    textColorTextHoverInfo: x,
    textColorTextPressedInfo: w,
    textColorTextFocusInfo: x,
    textColorTextDisabledInfo: h,
    textColorGhostInfo: b,
    textColorGhostHoverInfo: x,
    textColorGhostPressedInfo: w,
    textColorGhostFocusInfo: x,
    textColorGhostDisabledInfo: b,
    borderInfo: `1px solid ${b}`,
    borderHoverInfo: `1px solid ${x}`,
    borderPressedInfo: `1px solid ${w}`,
    borderFocusInfo: `1px solid ${x}`,
    borderDisabledInfo: `1px solid ${b}`,
    rippleColorInfo: b,
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
    colorHoverWarning: k,
    colorPressedWarning: E,
    colorFocusWarning: k,
    colorDisabledWarning: T,
    textColorWarning: u,
    textColorHoverWarning: u,
    textColorPressedWarning: u,
    textColorFocusWarning: u,
    textColorDisabledWarning: u,
    textColorTextWarning: T,
    textColorTextHoverWarning: k,
    textColorTextPressedWarning: E,
    textColorTextFocusWarning: k,
    textColorTextDisabledWarning: h,
    textColorGhostWarning: T,
    textColorGhostHoverWarning: k,
    textColorGhostPressedWarning: E,
    textColorGhostFocusWarning: k,
    textColorGhostDisabledWarning: T,
    borderWarning: `1px solid ${T}`,
    borderHoverWarning: `1px solid ${k}`,
    borderPressedWarning: `1px solid ${E}`,
    borderFocusWarning: `1px solid ${k}`,
    borderDisabledWarning: `1px solid ${T}`,
    rippleColorWarning: T,
    // error
    colorError: U,
    colorHoverError: _,
    colorPressedError: M,
    colorFocusError: _,
    colorDisabledError: U,
    textColorError: u,
    textColorHoverError: u,
    textColorPressedError: u,
    textColorFocusError: u,
    textColorDisabledError: u,
    textColorTextError: U,
    textColorTextHoverError: _,
    textColorTextPressedError: M,
    textColorTextFocusError: _,
    textColorTextDisabledError: h,
    textColorGhostError: U,
    textColorGhostHoverError: _,
    textColorGhostPressedError: M,
    textColorGhostFocusError: _,
    textColorGhostDisabledError: U,
    borderError: `1px solid ${U}`,
    borderHoverError: `1px solid ${_}`,
    borderPressedError: `1px solid ${M}`,
    borderFocusError: `1px solid ${_}`,
    borderDisabledError: `1px solid ${U}`,
    rippleColorError: U,
    waveOpacity: "0.6",
    fontWeight: I,
    fontWeightStrong: Z
  });
}
const yd = {
  name: "Button",
  common: vt,
  self: O_
}, z_ = W([V("button", `
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
 `, [X("color", [D("border", {
  borderColor: "var(--n-border-color)"
}), X("disabled", [D("border", {
  borderColor: "var(--n-border-color-disabled)"
})]), Qe("disabled", [W("&:focus", [D("state-border", {
  borderColor: "var(--n-border-color-focus)"
})]), W("&:hover", [D("state-border", {
  borderColor: "var(--n-border-color-hover)"
})]), W("&:active", [D("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})]), X("pressed", [D("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})])])]), X("disabled", {
  backgroundColor: "var(--n-color-disabled)",
  color: "var(--n-text-color-disabled)"
}, [D("border", {
  border: "var(--n-border-disabled)"
})]), Qe("disabled", [W("&:focus", {
  backgroundColor: "var(--n-color-focus)",
  color: "var(--n-text-color-focus)"
}, [D("state-border", {
  border: "var(--n-border-focus)"
})]), W("&:hover", {
  backgroundColor: "var(--n-color-hover)",
  color: "var(--n-text-color-hover)"
}, [D("state-border", {
  border: "var(--n-border-hover)"
})]), W("&:active", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [D("state-border", {
  border: "var(--n-border-pressed)"
})]), X("pressed", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [D("state-border", {
  border: "var(--n-border-pressed)"
})])]), X("loading", "cursor: wait;"), V("base-wave", `
 pointer-events: none;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 animation-iteration-count: 1;
 animation-duration: var(--n-ripple-duration);
 animation-timing-function: var(--n-bezier-ease-out), var(--n-bezier-ease-out);
 `, [X("active", {
  zIndex: 1,
  animationName: "button-wave-spread, button-wave-opacity"
})]), lr && "MozBoxSizing" in document.createElement("div").style ? W("&::moz-focus-inner", {
  border: 0
}) : null, D("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `), D("border", {
  border: "var(--n-border)"
}), D("state-border", {
  border: "var(--n-border)",
  borderColor: "#0000",
  zIndex: 1
}), D("icon", `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `, [V("icon-slot", `
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
})]), t_()]), D("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [W("~", [D("icon", {
  margin: "var(--n-icon-margin)",
  marginRight: 0
})])]), X("block", `
 display: flex;
 width: 100%;
 `), X("dashed", [D("border, state-border", {
  borderStyle: "dashed !important"
})]), X("disabled", {
  cursor: "not-allowed",
  opacity: "var(--n-opacity-disabled)"
})]), W("@keyframes button-wave-spread", {
  from: {
    boxShadow: "0 0 0.5px 0 var(--n-ripple-color)"
  },
  to: {
    // don't use exact 5px since chrome will display the animation with glitches
    boxShadow: "0 0 0.5px 4.5px var(--n-ripple-color)"
  }
}), W("@keyframes button-wave-opacity", {
  from: {
    opacity: "var(--n-wave-opacity)"
  },
  to: {
    opacity: 0
  }
})]), Di = window.Vue.computed, M_ = window.Vue.defineComponent, yn = window.Vue.h, I_ = window.Vue.inject, _l = window.Vue.ref;
window.Vue.watchEffect;
const A_ = Object.assign(Object.assign({}, _e.props), {
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
    default: !tv
  }
}), ii = M_({
  name: "Button",
  props: A_,
  slots: Object,
  setup(e) {
    const t = _l(null), n = _l(null), o = _l(!1), r = ze(() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered), i = I_(F_, {}), {
      mergedSizeRef: a
    } = jn({}, {
      defaultSize: "medium",
      mergedSize: (w) => {
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
        } = w || {};
        return y ? y.value : "medium";
      }
    }), l = Di(() => e.focusable && !e.disabled), s = (w) => {
      var C;
      l.value || w.preventDefault(), !e.nativeFocusBehavior && (w.preventDefault(), !e.disabled && l.value && ((C = t.value) === null || C === void 0 || C.focus({
        preventScroll: !0
      })));
    }, d = (w) => {
      var C;
      if (!e.disabled && !e.loading) {
        const {
          onClick: S
        } = e;
        S && le(S, w), e.text || (C = n.value) === null || C === void 0 || C.play();
      }
    }, c = (w) => {
      switch (w.key) {
        case "Enter":
          if (!e.keyboard)
            return;
          o.value = !1;
      }
    }, h = (w) => {
      switch (w.key) {
        case "Enter":
          if (!e.keyboard || e.loading) {
            w.preventDefault();
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
    } = qe(e), g = _e("Button", "-button", z_, yd, e, f), u = zt("Button", m, f), b = Di(() => {
      const w = g.value, {
        common: {
          cubicBezierEaseInOut: C,
          cubicBezierEaseOut: S
        },
        self: y
      } = w, {
        rippleDuration: T,
        opacityDisabled: k,
        fontWeight: E,
        fontWeightStrong: U
      } = y, _ = a.value, {
        dashed: M,
        type: I,
        ghost: z,
        text: G,
        color: L,
        round: Z,
        circle: te,
        textColor: q,
        secondary: A,
        tertiary: F,
        quaternary: j,
        strong: J
      } = e, Q = {
        "--n-font-weight": J ? U : E
      };
      let ee = {
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
      const de = I === "tertiary", pe = I === "default", Y = de ? "default" : I;
      if (G) {
        const N = q || L;
        ee = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": "#0000",
          "--n-text-color": N || y[ae("textColorText", Y)],
          "--n-text-color-hover": N ? go(N) : y[ae("textColorTextHover", Y)],
          "--n-text-color-pressed": N ? Li(N) : y[ae("textColorTextPressed", Y)],
          "--n-text-color-focus": N ? go(N) : y[ae("textColorTextHover", Y)],
          "--n-text-color-disabled": N || y[ae("textColorTextDisabled", Y)]
        };
      } else if (z || M) {
        const N = q || L;
        ee = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": L || y[ae("rippleColor", Y)],
          "--n-text-color": N || y[ae("textColorGhost", Y)],
          "--n-text-color-hover": N ? go(N) : y[ae("textColorGhostHover", Y)],
          "--n-text-color-pressed": N ? Li(N) : y[ae("textColorGhostPressed", Y)],
          "--n-text-color-focus": N ? go(N) : y[ae("textColorGhostHover", Y)],
          "--n-text-color-disabled": N || y[ae("textColorGhostDisabled", Y)]
        };
      } else if (A) {
        const N = pe ? y.textColor : de ? y.textColorTertiary : y[ae("color", Y)], ne = L || N, ge = I !== "default" && I !== "tertiary";
        ee = {
          "--n-color": ge ? Ee(ne, {
            alpha: Number(y.colorOpacitySecondary)
          }) : y.colorSecondary,
          "--n-color-hover": ge ? Ee(ne, {
            alpha: Number(y.colorOpacitySecondaryHover)
          }) : y.colorSecondaryHover,
          "--n-color-pressed": ge ? Ee(ne, {
            alpha: Number(y.colorOpacitySecondaryPressed)
          }) : y.colorSecondaryPressed,
          "--n-color-focus": ge ? Ee(ne, {
            alpha: Number(y.colorOpacitySecondaryHover)
          }) : y.colorSecondaryHover,
          "--n-color-disabled": y.colorSecondary,
          "--n-ripple-color": "#0000",
          "--n-text-color": ne,
          "--n-text-color-hover": ne,
          "--n-text-color-pressed": ne,
          "--n-text-color-focus": ne,
          "--n-text-color-disabled": ne
        };
      } else if (F || j) {
        const N = pe ? y.textColor : de ? y.textColorTertiary : y[ae("color", Y)], ne = L || N;
        F ? (ee["--n-color"] = y.colorTertiary, ee["--n-color-hover"] = y.colorTertiaryHover, ee["--n-color-pressed"] = y.colorTertiaryPressed, ee["--n-color-focus"] = y.colorSecondaryHover, ee["--n-color-disabled"] = y.colorTertiary) : (ee["--n-color"] = y.colorQuaternary, ee["--n-color-hover"] = y.colorQuaternaryHover, ee["--n-color-pressed"] = y.colorQuaternaryPressed, ee["--n-color-focus"] = y.colorQuaternaryHover, ee["--n-color-disabled"] = y.colorQuaternary), ee["--n-ripple-color"] = "#0000", ee["--n-text-color"] = ne, ee["--n-text-color-hover"] = ne, ee["--n-text-color-pressed"] = ne, ee["--n-text-color-focus"] = ne, ee["--n-text-color-disabled"] = ne;
      } else
        ee = {
          "--n-color": L || y[ae("color", Y)],
          "--n-color-hover": L ? go(L) : y[ae("colorHover", Y)],
          "--n-color-pressed": L ? Li(L) : y[ae("colorPressed", Y)],
          "--n-color-focus": L ? go(L) : y[ae("colorFocus", Y)],
          "--n-color-disabled": L || y[ae("colorDisabled", Y)],
          "--n-ripple-color": L || y[ae("rippleColor", Y)],
          "--n-text-color": q || (L ? y.textColorPrimary : de ? y.textColorTertiary : y[ae("textColor", Y)]),
          "--n-text-color-hover": q || (L ? y.textColorHoverPrimary : y[ae("textColorHover", Y)]),
          "--n-text-color-pressed": q || (L ? y.textColorPressedPrimary : y[ae("textColorPressed", Y)]),
          "--n-text-color-focus": q || (L ? y.textColorFocusPrimary : y[ae("textColorFocus", Y)]),
          "--n-text-color-disabled": q || (L ? y.textColorDisabledPrimary : y[ae("textColorDisabled", Y)])
        };
      let se = {
        "--n-border": "initial",
        "--n-border-hover": "initial",
        "--n-border-pressed": "initial",
        "--n-border-focus": "initial",
        "--n-border-disabled": "initial"
      };
      G ? se = {
        "--n-border": "none",
        "--n-border-hover": "none",
        "--n-border-pressed": "none",
        "--n-border-focus": "none",
        "--n-border-disabled": "none"
      } : se = {
        "--n-border": y[ae("border", Y)],
        "--n-border-hover": y[ae("borderHover", Y)],
        "--n-border-pressed": y[ae("borderPressed", Y)],
        "--n-border-focus": y[ae("borderFocus", Y)],
        "--n-border-disabled": y[ae("borderDisabled", Y)]
      };
      const {
        [ae("height", _)]: $e,
        [ae("fontSize", _)]: me,
        [ae("padding", _)]: be,
        [ae("paddingRound", _)]: Ce,
        [ae("iconSize", _)]: Be,
        [ae("borderRadius", _)]: Me,
        [ae("iconMargin", _)]: ie,
        waveOpacity: R
      } = y, $ = {
        "--n-width": te && !G ? $e : "initial",
        "--n-height": G ? "initial" : $e,
        "--n-font-size": me,
        "--n-padding": te || G ? "initial" : Z ? Ce : be,
        "--n-icon-size": Be,
        "--n-icon-margin": ie,
        "--n-border-radius": G ? "initial" : te || Z ? $e : Me
      };
      return Object.assign(Object.assign(Object.assign(Object.assign({
        "--n-bezier": C,
        "--n-bezier-ease-out": S,
        "--n-ripple-duration": T,
        "--n-opacity-disabled": k,
        "--n-wave-opacity": R
      }, Q), ee), se), $);
    }), x = v ? wt("button", Di(() => {
      let w = "";
      const {
        dashed: C,
        type: S,
        ghost: y,
        text: T,
        color: k,
        round: E,
        circle: U,
        textColor: _,
        secondary: M,
        tertiary: I,
        quaternary: z,
        strong: G
      } = e;
      C && (w += "a"), y && (w += "b"), T && (w += "c"), E && (w += "d"), U && (w += "e"), M && (w += "f"), I && (w += "g"), z && (w += "h"), G && (w += "i"), k && (w += `j${pa(k)}`), _ && (w += `k${pa(_)}`);
      const {
        value: L
      } = a;
      return w += `l${L[0]}`, w += `m${S[0]}`, w;
    }), b, e) : void 0;
    return {
      selfElRef: t,
      waveElRef: n,
      mergedClsPrefix: f,
      mergedFocusable: l,
      mergedSize: a,
      showBorder: r,
      enterPressed: o,
      rtlEnabled: u,
      handleMousedown: s,
      handleKeydown: h,
      handleBlur: p,
      handleKeyup: c,
      handleClick: d,
      customColorCssVars: Di(() => {
        const {
          color: w
        } = e;
        if (!w) return null;
        const C = go(w);
        return {
          "--n-border-color": w,
          "--n-border-color-hover": C,
          "--n-border-color-pressed": Li(w),
          "--n-border-color-focus": C,
          "--n-border-color-disabled": w
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
    }, this.iconPlacement === "right" && o, yn(Qk, {
      width: !0
    }, {
      default: () => We(this.$slots.icon, (r) => (this.loading || this.renderIcon || r) && yn("span", {
        class: `${e}-button__icon`,
        style: {
          margin: er(this.$slots.default) ? "0" : ""
        }
      }, yn(cr, null, {
        default: () => this.loading ? yn(ur, {
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
    }), this.iconPlacement === "left" && o, this.text ? null : yn(s_, {
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
}), Nu = ii, V_ = {
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
function B_(e) {
  const {
    primaryColor: t,
    borderRadius: n,
    lineHeight: o,
    fontSize: r,
    cardColor: i,
    textColor2: a,
    textColor1: l,
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
    actionColor: b
  } = e;
  return Object.assign(Object.assign({}, V_), {
    lineHeight: o,
    color: i,
    colorModal: m,
    colorPopover: u,
    colorTarget: t,
    colorEmbedded: b,
    colorEmbeddedModal: b,
    colorEmbeddedPopover: b,
    textColor: a,
    titleTextColor: l,
    borderColor: s,
    actionColor: b,
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
const L_ = {
  common: vt,
  self: B_
}, D_ = W([V("card", `
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
 `, [$b({
  background: "var(--n-color-modal)"
}), X("hoverable", [W("&:hover", "box-shadow: var(--n-box-shadow);")]), X("content-segmented", [W(">", [D("content", {
  paddingTop: "var(--n-padding-bottom)"
})])]), X("content-soft-segmented", [W(">", [D("content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])]), X("footer-segmented", [W(">", [D("footer", {
  paddingTop: "var(--n-padding-bottom)"
})])]), X("footer-soft-segmented", [W(">", [D("footer", `
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]), W(">", [V("card-header", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `, [D("main", `
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `), D("extra", `
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), D("close", `
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), D("action", `
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `), D("content", "flex: 1; min-width: 0;"), D("content, footer", `
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `, [W("&:first-child", {
  paddingTop: "var(--n-padding-bottom)"
})]), D("action", `
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]), V("card-cover", `
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `, [W("img", `
 display: block;
 width: 100%;
 `)]), X("bordered", `
 border: 1px solid var(--n-border-color);
 `, [W("&:target", "border-color: var(--n-color-target);")]), X("action-segmented", [W(">", [D("action", [W("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), X("content-segmented, content-soft-segmented", [W(">", [D("content", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [W("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), X("footer-segmented, footer-soft-segmented", [W(">", [D("footer", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [W("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), X("embedded", `
 background-color: var(--n-color-embedded);
 `)]), Ks(V("card", `
 background: var(--n-color-modal);
 `, [X("embedded", `
 background-color: var(--n-color-embedded-modal);
 `)])), qs(V("card", `
 background: var(--n-color-popover);
 `, [X("embedded", `
 background-color: var(--n-color-embedded-popover);
 `)]))]), Hu = window.Vue.computed, N_ = window.Vue.defineComponent, Vn = window.Vue.h, H_ = {
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
}, j_ = Object.assign(Object.assign({}, _e.props), H_), ju = N_({
  name: "Card",
  props: j_,
  slots: Object,
  setup(e) {
    const t = () => {
      const {
        onClose: d
      } = e;
      d && le(d);
    }, {
      inlineThemeDisabled: n,
      mergedClsPrefixRef: o,
      mergedRtlRef: r
    } = qe(e), i = _e("Card", "-card", D_, L_, e, o), a = zt("Card", r, o), l = Hu(() => {
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
          borderRadius: b,
          lineHeight: x,
          closeIconColor: w,
          closeIconColorHover: C,
          closeIconColorPressed: S,
          closeColorHover: y,
          closeColorPressed: T,
          closeBorderRadius: k,
          closeIconSize: E,
          closeSize: U,
          boxShadow: _,
          colorPopover: M,
          colorEmbedded: I,
          colorEmbeddedModal: z,
          colorEmbeddedPopover: G,
          [ae("padding", d)]: L,
          [ae("fontSize", d)]: Z,
          [ae("titleFontSize", d)]: te
        },
        common: {
          cubicBezierEaseInOut: q
        }
      } = i.value, {
        top: A,
        left: F,
        bottom: j
      } = Yt(L);
      return {
        "--n-bezier": q,
        "--n-border-radius": b,
        "--n-color": c,
        "--n-color-modal": h,
        "--n-color-popover": M,
        "--n-color-embedded": I,
        "--n-color-embedded-modal": z,
        "--n-color-embedded-popover": G,
        "--n-color-target": p,
        "--n-text-color": v,
        "--n-line-height": x,
        "--n-action-color": u,
        "--n-title-text-color": f,
        "--n-title-font-weight": m,
        "--n-close-icon-color": w,
        "--n-close-icon-color-hover": C,
        "--n-close-icon-color-pressed": S,
        "--n-close-color-hover": y,
        "--n-close-color-pressed": T,
        "--n-border-color": g,
        "--n-box-shadow": _,
        // size
        "--n-padding-top": A,
        "--n-padding-bottom": j,
        "--n-padding-left": F,
        "--n-font-size": Z,
        "--n-title-font-size": te,
        "--n-close-size": U,
        "--n-close-icon-size": E,
        "--n-close-border-radius": k
      };
    }), s = n ? wt("card", Hu(() => e.size[0]), l, e) : void 0;
    return {
      rtlEnabled: a,
      mergedClsPrefix: o,
      mergedTheme: i,
      handleCloseClick: t,
      cssVars: n ? void 0 : l,
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
      embedded: a,
      tag: l,
      $slots: s
    } = this;
    return i == null || i(), Vn(l, {
      class: [`${o}-card`, this.themeClass, a && `${o}-card--embedded`, {
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
      }), this.closable && Vn(Wp, {
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
}), W_ = {
  sizeSmall: "14px",
  sizeMedium: "16px",
  sizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function U_(e) {
  const {
    baseColor: t,
    inputColorDisabled: n,
    cardColor: o,
    modalColor: r,
    popoverColor: i,
    textColorDisabled: a,
    borderColor: l,
    primaryColor: s,
    textColor2: d,
    fontSizeSmall: c,
    fontSizeMedium: h,
    fontSizeLarge: p,
    borderRadiusSmall: v,
    lineHeight: f
  } = e;
  return Object.assign(Object.assign({}, W_), {
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
    checkMarkColorDisabled: a,
    checkMarkColorDisabledChecked: a,
    border: `1px solid ${l}`,
    borderDisabled: `1px solid ${l}`,
    borderDisabledChecked: `1px solid ${l}`,
    borderChecked: `1px solid ${s}`,
    borderFocus: `1px solid ${s}`,
    boxShadowFocus: `0 0 0 2px ${Ee(s, {
      alpha: 0.3
    })}`,
    textColor: d,
    textColorDisabled: a
  });
}
const iv = {
  name: "Checkbox",
  common: vt,
  self: U_
}, Tl = window.Vue.computed, K_ = window.Vue.defineComponent, q_ = window.Vue.h, G_ = window.Vue.provide, X_ = window.Vue.ref, Wu = window.Vue.toRef;
window.Vue.watchEffect;
const av = "n-checkbox-group", Y_ = {
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
}, Z_ = K_({
  name: "CheckboxGroup",
  props: Y_,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = qe(e), n = jn(e), {
      mergedSizeRef: o,
      mergedDisabledRef: r
    } = n, i = X_(e.defaultValue), a = Tl(() => e.value), l = Ot(a, i), s = Tl(() => {
      var h;
      return ((h = l.value) === null || h === void 0 ? void 0 : h.length) || 0;
    }), d = Tl(() => Array.isArray(l.value) ? new Set(l.value) : /* @__PURE__ */ new Set());
    function c(h, p) {
      const {
        nTriggerFormInput: v,
        nTriggerFormChange: f
      } = n, {
        onChange: m,
        "onUpdate:value": g,
        onUpdateValue: u
      } = e;
      if (Array.isArray(l.value)) {
        const b = Array.from(l.value), x = b.findIndex((w) => w === p);
        h ? ~x || (b.push(p), u && le(u, b, {
          actionType: "check",
          value: p
        }), g && le(g, b, {
          actionType: "check",
          value: p
        }), v(), f(), i.value = b, m && le(m, b)) : ~x && (b.splice(x, 1), u && le(u, b, {
          actionType: "uncheck",
          value: p
        }), g && le(g, b, {
          actionType: "uncheck",
          value: p
        }), m && le(m, b), i.value = b, v(), f());
      } else
        h ? (u && le(u, [p], {
          actionType: "check",
          value: p
        }), g && le(g, [p], {
          actionType: "check",
          value: p
        }), m && le(m, [p]), i.value = [p], v(), f()) : (u && le(u, [], {
          actionType: "uncheck",
          value: p
        }), g && le(g, [], {
          actionType: "uncheck",
          value: p
        }), m && le(m, []), i.value = [], v(), f());
    }
    return G_(av, {
      checkedCountRef: s,
      maxRef: Wu(e, "max"),
      minRef: Wu(e, "min"),
      valueSetRef: d,
      disabledRef: r,
      mergedSizeRef: o,
      toggleCheckbox: c
    }), {
      mergedClsPrefix: t
    };
  },
  render() {
    return q_("div", {
      class: `${this.mergedClsPrefix}-checkbox-group`,
      role: "group"
    }, this.$slots);
  }
}), Uu = window.Vue.h, J_ = () => Uu("svg", {
  viewBox: "0 0 64 64",
  class: "check-icon"
}, Uu("path", {
  d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"
})), Ku = window.Vue.h, Q_ = () => Ku("svg", {
  viewBox: "0 0 100 100",
  class: "line-icon"
}, Ku("path", {
  d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z"
})), eT = W([
  V("checkbox", `
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `, [X("show-label", "line-height: var(--n-label-line-height);"), W("&:hover", [V("checkbox-box", [D("border", "border: var(--n-border-checked);")])]), W("&:focus:not(:active)", [V("checkbox-box", [D("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), X("inside-table", [V("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), X("checked", [V("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [V("checkbox-icon", [
    // if not set width to 100%, safari & old chrome won't display the icon
    W(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)
  ])])]), X("indeterminate", [V("checkbox-box", [V("checkbox-icon", [W(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), W(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), X("checked, indeterminate", [W("&:focus:not(:active)", [V("checkbox-box", [D("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), V("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [D("border", {
    border: "var(--n-border-checked)"
  })])]), X("disabled", {
    cursor: "not-allowed"
  }, [X("checked", [V("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [D("border", {
    border: "var(--n-border-disabled-checked)"
  }), V("checkbox-icon", [W(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled-checked)"
  })])])]), V("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [D("border", `
 border: var(--n-border-disabled);
 `), V("checkbox-icon", [W(".check-icon, .line-icon", `
 fill: var(--n-check-mark-color-disabled);
 `)])]), D("label", `
 color: var(--n-text-color-disabled);
 `)]), V("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), V("checkbox-box", `
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
 `, [D("border", `
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
 `), V("checkbox-icon", `
 display: flex;
 align-items: center;
 justify-content: center;
 position: absolute;
 left: 1px;
 right: 1px;
 top: 1px;
 bottom: 1px;
 `, [W(".check-icon, .line-icon", `
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
  })])]), D("label", `
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 `, [W("&:empty", {
    display: "none"
  })])]),
  // modal table header checkbox
  Ks(V("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)),
  // popover table header checkbox
  qs(V("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))
]), qu = window.Vue.computed, tT = window.Vue.defineComponent, Jn = window.Vue.h, nT = window.Vue.inject, Gu = window.Vue.ref, oT = window.Vue.toRef;
window.Vue.watchEffect;
const rT = Object.assign(Object.assign({}, _e.props), {
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
}), xd = tT({
  name: "Checkbox",
  props: rT,
  setup(e) {
    const t = nT(av, null), n = Gu(null), {
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = qe(e), a = Gu(e.defaultChecked), l = oT(e, "checked"), s = Ot(l, a), d = ze(() => {
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
            checkedCountRef: k
          } = t;
          if (T !== void 0 && k.value >= T && !d.value)
            return !0;
          const {
            minRef: {
              value: E
            }
          } = t;
          if (E !== void 0 && k.value <= E && d.value)
            return !0;
        }
        return S ? S.disabled.value : !1;
      }
    }), {
      mergedDisabledRef: h,
      mergedSizeRef: p
    } = c, v = _e("Checkbox", "-checkbox", eT, iv, e, o);
    function f(S) {
      if (t && e.value !== void 0)
        t.toggleCheckbox(!d.value, e.value);
      else {
        const {
          onChange: y,
          "onUpdate:checked": T,
          onUpdateChecked: k
        } = e, {
          nTriggerFormInput: E,
          nTriggerFormChange: U
        } = c, _ = d.value ? e.uncheckedValue : e.checkedValue;
        T && le(T, _, S), k && le(k, _, S), y && le(y, _, S), E(), U(), a.value = _;
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
    const b = {
      focus: () => {
        var S;
        (S = n.value) === null || S === void 0 || S.focus();
      },
      blur: () => {
        var S;
        (S = n.value) === null || S === void 0 || S.blur();
      }
    }, x = zt("Checkbox", i, o), w = qu(() => {
      const {
        value: S
      } = p, {
        common: {
          cubicBezierEaseInOut: y
        },
        self: {
          borderRadius: T,
          color: k,
          colorChecked: E,
          colorDisabled: U,
          colorTableHeader: _,
          colorTableHeaderModal: M,
          colorTableHeaderPopover: I,
          checkMarkColor: z,
          checkMarkColorDisabled: G,
          border: L,
          borderFocus: Z,
          borderDisabled: te,
          borderChecked: q,
          boxShadowFocus: A,
          textColor: F,
          textColorDisabled: j,
          checkMarkColorDisabledChecked: J,
          colorDisabledChecked: Q,
          borderDisabledChecked: ee,
          labelPadding: de,
          labelLineHeight: pe,
          labelFontWeight: Y,
          [ae("fontSize", S)]: se,
          [ae("size", S)]: $e
        }
      } = v.value;
      return {
        "--n-label-line-height": pe,
        "--n-label-font-weight": Y,
        "--n-size": $e,
        "--n-bezier": y,
        "--n-border-radius": T,
        "--n-border": L,
        "--n-border-checked": q,
        "--n-border-focus": Z,
        "--n-border-disabled": te,
        "--n-border-disabled-checked": ee,
        "--n-box-shadow-focus": A,
        "--n-color": k,
        "--n-color-checked": E,
        "--n-color-table": _,
        "--n-color-table-modal": M,
        "--n-color-table-popover": I,
        "--n-color-disabled": U,
        "--n-color-disabled-checked": Q,
        "--n-text-color": F,
        "--n-text-color-disabled": j,
        "--n-check-mark-color": z,
        "--n-check-mark-color-disabled": G,
        "--n-check-mark-color-disabled-checked": J,
        "--n-font-size": se,
        "--n-label-padding": de
      };
    }), C = r ? wt("checkbox", qu(() => p.value[0]), w, e) : void 0;
    return Object.assign(c, b, {
      rtlEnabled: x,
      selfRef: n,
      mergedClsPrefix: o,
      mergedDisabled: h,
      renderedChecked: d,
      mergedTheme: v,
      labelId: Jr(),
      handleClick: m,
      handleKeyUp: g,
      handleKeyDown: u,
      cssVars: r ? void 0 : w,
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
      cssVars: a,
      labelId: l,
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
      id: l
    }, s || m) : null);
    return Jn("div", {
      ref: "selfRef",
      class: [`${d}-checkbox`, this.themeClass, this.rtlEnabled && `${d}-checkbox--rtl`, n && `${d}-checkbox--checked`, o && `${d}-checkbox--disabled`, r && `${d}-checkbox--indeterminate`, i && `${d}-checkbox--inside-table`, f && `${d}-checkbox--show-label`],
      tabindex: o || !c ? void 0 : 0,
      role: "checkbox",
      "aria-checked": r ? "mixed" : n,
      "aria-labelledby": l,
      style: a,
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
    }, Jn(cr, null, {
      default: () => this.indeterminate ? Jn("div", {
        key: "indeterminate",
        class: `${d}-checkbox-icon`
      }, Q_()) : Jn("div", {
        key: "check",
        class: `${d}-checkbox-icon`
      }, J_())
    }), Jn("div", {
      class: `${d}-checkbox-box__border`
    }))), f);
  }
});
function iT(e) {
  const {
    boxShadow2: t
  } = e;
  return {
    menuBoxShadow: t
  };
}
const Cd = {
  name: "Popselect",
  common: vt,
  peers: {
    Popover: fr,
    InternalSelectMenu: bd
  },
  self: iT
}, lv = "n-popselect", aT = V("popselect-menu", `
 box-shadow: var(--n-menu-box-shadow);
`), Xu = window.Vue.computed, lT = window.Vue.defineComponent, sT = window.Vue.h, dT = window.Vue.inject, Yu = window.Vue.nextTick, cT = window.Vue.toRef, uT = window.Vue.watch;
window.Vue.watchEffect;
const Sd = {
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
}, Zu = ti(Sd), fT = lT({
  name: "PopselectPanel",
  props: Sd,
  setup(e) {
    const t = dT(lv), {
      mergedClsPrefixRef: n,
      inlineThemeDisabled: o
    } = qe(e), r = _e("Popselect", "-pop-select", aT, Cd, t.props, n), i = Xu(() => Oa(e.options, rv("value", "children")));
    function a(p, v) {
      const {
        onUpdateValue: f,
        "onUpdate:value": m,
        onChange: g
      } = e;
      f && le(f, p, v), m && le(m, p, v), g && le(g, p, v);
    }
    function l(p) {
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
            const b = v(u);
            b && (f.push(b.key), m.push(b.rawNode));
          }), g && (f.push(p), m.push(v(p).rawNode)), a(f, m);
        } else {
          const f = v(p);
          f && a([p], [f.rawNode]);
        }
      else if (e.value === p && e.cancelable)
        a(null, null);
      else {
        const f = v(p);
        f && a(p, f.rawNode);
        const {
          "onUpdate:show": m,
          onUpdateShow: g
        } = t.props;
        m && le(m, !1), g && le(g, !1), t.setShow(!1);
      }
      Yu(() => {
        t.syncPosition();
      });
    }
    uT(cT(e, "options"), () => {
      Yu(() => {
        t.syncPosition();
      });
    });
    const c = Xu(() => {
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
      handleToggle: l,
      handleMenuMousedown: s,
      cssVars: o ? void 0 : c,
      themeClass: h == null ? void 0 : h.themeClass,
      onRender: h == null ? void 0 : h.onRender
    };
  },
  render() {
    var e;
    return (e = this.onRender) === null || e === void 0 || e.call(this), sT(Yp, {
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
}), hT = window.Vue.defineComponent, Ju = window.Vue.h, pT = window.Vue.provide, vT = window.Vue.ref, mT = Object.assign(Object.assign(Object.assign(Object.assign({}, _e.props), lp(ir, ["showArrow", "arrow"])), {
  placement: Object.assign(Object.assign({}, ir.placement), {
    default: "bottom"
  }),
  trigger: {
    type: String,
    default: "hover"
  }
}), Sd), gT = hT({
  name: "Popselect",
  props: mT,
  slots: Object,
  inheritAttrs: !1,
  __popover__: !0,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = qe(e), n = _e("Popselect", "-popselect", void 0, Cd, e, t), o = vT(null);
    function r() {
      var l;
      (l = o.value) === null || l === void 0 || l.syncPosition();
    }
    function i(l) {
      var s;
      (s = o.value) === null || s === void 0 || s.setShow(l);
    }
    return pT(lv, {
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
      internalRenderBody: (n, o, r, i, a) => {
        const {
          $attrs: l
        } = this;
        return Ju(fT, Object.assign({}, l, {
          class: [l.class, n],
          style: [l.style, ...r]
        }, ei(this.$props, Zu), {
          ref: ap(o),
          onMouseenter: Nr([i, l.onMouseenter]),
          onMouseleave: Nr([a, l.onMouseleave])
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
    return Ju(ci, Object.assign({}, lp(this.$props, Zu), t, {
      internalDeactivateImmediately: !0
    }), {
      trigger: () => {
        var n, o;
        return (o = (n = this.$slots).default) === null || o === void 0 ? void 0 : o.call(n);
      }
    });
  }
});
function bT(e) {
  const {
    boxShadow2: t
  } = e;
  return {
    menuBoxShadow: t
  };
}
const sv = {
  name: "Select",
  common: vt,
  peers: {
    InternalSelection: ev,
    InternalSelectMenu: bd
  },
  self: bT
}, wT = W([V("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `), V("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [za({
  originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
})])]), xn = window.Vue.computed, yT = window.Vue.defineComponent, bo = window.Vue.h, dn = window.Vue.ref, Fl = window.Vue.toRef, xT = window.Vue.Transition, CT = window.Vue.vShow, ST = window.Vue.watch;
window.Vue.watchEffect;
const $T = window.Vue.withDirectives, kT = Object.assign(Object.assign({}, _e.props), {
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
}), _s = yT({
  name: "Select",
  props: kT,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBorderedRef: n,
      namespaceRef: o,
      inlineThemeDisabled: r
    } = qe(e), i = _e("Select", "-select", wT, sv, e, t), a = dn(e.defaultValue), l = Fl(e, "value"), s = Ot(l, a), d = dn(!1), c = dn(""), h = Nh(e, ["items", "options"]), p = dn([]), v = dn([]), f = xn(() => v.value.concat(p.value).concat(h.value)), m = xn(() => {
      const {
        filter: P
      } = e;
      if (P) return P;
      const {
        labelField: H,
        valueField: oe
      } = e;
      return (ce, ue) => {
        if (!ue) return !1;
        const we = ue[H];
        if (typeof we == "string")
          return Pl(ce, we);
        const ye = ue[oe];
        return typeof ye == "string" ? Pl(ce, ye) : typeof ye == "number" ? Pl(ce, String(ye)) : !1;
      };
    }), g = xn(() => {
      if (e.remote)
        return h.value;
      {
        const {
          value: P
        } = f, {
          value: H
        } = c;
        return !H.length || !e.filterable ? P : __(P, m.value, H, e.childrenField);
      }
    }), u = xn(() => {
      const {
        valueField: P,
        childrenField: H
      } = e, oe = rv(P, H);
      return Oa(g.value, oe);
    }), b = xn(() => T_(f.value, e.valueField, e.childrenField)), x = dn(!1), w = Ot(Fl(e, "show"), x), C = dn(null), S = dn(null), y = dn(null), {
      localeRef: T
    } = dr("Select"), k = xn(() => {
      var P;
      return (P = e.placeholder) !== null && P !== void 0 ? P : T.value.placeholder;
    }), E = [], U = dn(/* @__PURE__ */ new Map()), _ = xn(() => {
      const {
        fallbackOption: P
      } = e;
      if (P === void 0) {
        const {
          labelField: H,
          valueField: oe
        } = e;
        return (ce) => ({
          [H]: String(ce),
          [oe]: ce
        });
      }
      return P === !1 ? !1 : (H) => Object.assign(P(H), {
        value: H
      });
    });
    function M(P) {
      const H = e.remote, {
        value: oe
      } = U, {
        value: ce
      } = b, {
        value: ue
      } = _, we = [];
      return P.forEach((ye) => {
        if (ce.has(ye))
          we.push(ce.get(ye));
        else if (H && oe.has(ye))
          we.push(oe.get(ye));
        else if (ue) {
          const ke = ue(ye);
          ke && we.push(ke);
        }
      }), we;
    }
    const I = xn(() => {
      if (e.multiple) {
        const {
          value: P
        } = s;
        return Array.isArray(P) ? M(P) : [];
      }
      return null;
    }), z = xn(() => {
      const {
        value: P
      } = s;
      return !e.multiple && !Array.isArray(P) ? P === null ? null : M([P])[0] || null : null;
    }), G = jn(e), {
      mergedSizeRef: L,
      mergedDisabledRef: Z,
      mergedStatusRef: te
    } = G;
    function q(P, H) {
      const {
        onChange: oe,
        "onUpdate:value": ce,
        onUpdateValue: ue
      } = e, {
        nTriggerFormChange: we,
        nTriggerFormInput: ye
      } = G;
      oe && le(oe, P, H), ue && le(ue, P, H), ce && le(ce, P, H), a.value = P, we(), ye();
    }
    function A(P) {
      const {
        onBlur: H
      } = e, {
        nTriggerFormBlur: oe
      } = G;
      H && le(H, P), oe();
    }
    function F() {
      const {
        onClear: P
      } = e;
      P && le(P);
    }
    function j(P) {
      const {
        onFocus: H,
        showOnFocus: oe
      } = e, {
        nTriggerFormFocus: ce
      } = G;
      H && le(H, P), ce(), oe && pe();
    }
    function J(P) {
      const {
        onSearch: H
      } = e;
      H && le(H, P);
    }
    function Q(P) {
      const {
        onScroll: H
      } = e;
      H && le(H, P);
    }
    function ee() {
      var P;
      const {
        remote: H,
        multiple: oe
      } = e;
      if (H) {
        const {
          value: ce
        } = U;
        if (oe) {
          const {
            valueField: ue
          } = e;
          (P = I.value) === null || P === void 0 || P.forEach((we) => {
            ce.set(we[ue], we);
          });
        } else {
          const ue = z.value;
          ue && ce.set(ue[e.valueField], ue);
        }
      }
    }
    function de(P) {
      const {
        onUpdateShow: H,
        "onUpdate:show": oe
      } = e;
      H && le(H, P), oe && le(oe, P), x.value = P;
    }
    function pe() {
      Z.value || (de(!0), x.value = !0, e.filterable && Ze());
    }
    function Y() {
      de(!1);
    }
    function se() {
      c.value = "", v.value = E;
    }
    const $e = dn(!1);
    function me() {
      e.filterable && ($e.value = !0);
    }
    function be() {
      e.filterable && ($e.value = !1, w.value || se());
    }
    function Ce() {
      Z.value || (w.value ? e.filterable ? Ze() : Y() : pe());
    }
    function Be(P) {
      var H, oe;
      !((oe = (H = y.value) === null || H === void 0 ? void 0 : H.selfRef) === null || oe === void 0) && oe.contains(P.relatedTarget) || (d.value = !1, A(P), Y());
    }
    function Me(P) {
      j(P), d.value = !0;
    }
    function ie() {
      d.value = !0;
    }
    function R(P) {
      var H;
      !((H = C.value) === null || H === void 0) && H.$el.contains(P.relatedTarget) || (d.value = !1, A(P), Y());
    }
    function $() {
      var P;
      (P = C.value) === null || P === void 0 || P.focus(), Y();
    }
    function N(P) {
      var H;
      w.value && (!((H = C.value) === null || H === void 0) && H.$el.contains(Zr(P)) || Y());
    }
    function ne(P) {
      if (!Array.isArray(P)) return [];
      if (_.value)
        return Array.from(P);
      {
        const {
          remote: H
        } = e, {
          value: oe
        } = b;
        if (H) {
          const {
            value: ce
          } = U;
          return P.filter((ue) => oe.has(ue) || ce.has(ue));
        } else
          return P.filter((ce) => oe.has(ce));
      }
    }
    function ge(P) {
      he(P.rawNode);
    }
    function he(P) {
      if (Z.value) return;
      const {
        tag: H,
        remote: oe,
        clearFilterAfterSelect: ce,
        valueField: ue
      } = e;
      if (H && !oe) {
        const {
          value: we
        } = v, ye = we[0] || null;
        if (ye) {
          const ke = p.value;
          ke.length ? ke.push(ye) : p.value = [ye], v.value = E;
        }
      }
      if (oe && U.value.set(P[ue], P), e.multiple) {
        const we = ne(s.value), ye = we.findIndex((ke) => ke === P[ue]);
        if (~ye) {
          if (we.splice(ye, 1), H && !oe) {
            const ke = O(P[ue]);
            ~ke && (p.value.splice(ke, 1), ce && (c.value = ""));
          }
        } else
          we.push(P[ue]), ce && (c.value = "");
        q(we, M(we));
      } else {
        if (H && !oe) {
          const we = O(P[ue]);
          ~we ? p.value = [p.value[we]] : p.value = E;
        }
        Ye(), Y(), q(P[ue], P);
      }
    }
    function O(P) {
      return p.value.findIndex((oe) => oe[e.valueField] === P);
    }
    function K(P) {
      w.value || pe();
      const {
        value: H
      } = P.target;
      c.value = H;
      const {
        tag: oe,
        remote: ce
      } = e;
      if (J(H), oe && !ce) {
        if (!H) {
          v.value = E;
          return;
        }
        const {
          onCreate: ue
        } = e, we = ue ? ue(H) : {
          [e.labelField]: H,
          [e.valueField]: H
        }, {
          valueField: ye,
          labelField: ke
        } = e;
        h.value.some((Ae) => Ae[ye] === we[ye] || Ae[ke] === we[ke]) || p.value.some((Ae) => Ae[ye] === we[ye] || Ae[ke] === we[ke]) ? v.value = E : v.value = [we];
      }
    }
    function ve(P) {
      P.stopPropagation();
      const {
        multiple: H
      } = e;
      !H && e.filterable && Y(), F(), H ? q([], []) : q(null, null);
    }
    function Te(P) {
      !an(P, "action") && !an(P, "empty") && !an(P, "header") && P.preventDefault();
    }
    function lt(P) {
      Q(P);
    }
    function pt(P) {
      var H, oe, ce, ue, we;
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
          if (!(!((H = C.value) === null || H === void 0) && H.isComposing)) {
            if (w.value) {
              const ye = (oe = y.value) === null || oe === void 0 ? void 0 : oe.getPendingTmNode();
              ye ? ge(ye) : e.filterable || (Y(), Ye());
            } else if (pe(), e.tag && $e.value) {
              const ye = v.value[0];
              if (ye) {
                const ke = ye[e.valueField], {
                  value: Ae
                } = s;
                e.multiple && Array.isArray(Ae) && Ae.includes(ke) || he(ye);
              }
            }
          }
          P.preventDefault();
          break;
        case "ArrowUp":
          if (P.preventDefault(), e.loading) return;
          w.value && ((ce = y.value) === null || ce === void 0 || ce.prev());
          break;
        case "ArrowDown":
          if (P.preventDefault(), e.loading) return;
          w.value ? (ue = y.value) === null || ue === void 0 || ue.next() : pe();
          break;
        case "Escape":
          w.value && (Ty(P), Y()), (we = C.value) === null || we === void 0 || we.focus();
          break;
      }
    }
    function Ye() {
      var P;
      (P = C.value) === null || P === void 0 || P.focus();
    }
    function Ze() {
      var P;
      (P = C.value) === null || P === void 0 || P.focusInput();
    }
    function mt() {
      var P;
      w.value && ((P = S.value) === null || P === void 0 || P.syncPosition());
    }
    ee(), ST(Fl(e, "options"), ee);
    const et = {
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
      mergedStatus: te,
      mergedClsPrefix: t,
      mergedBordered: n,
      namespace: o,
      treeMate: u,
      isMounted: Pa(),
      triggerRef: C,
      menuRef: y,
      pattern: c,
      uncontrolledShow: x,
      mergedShow: w,
      adjustedTo: Pn(e),
      uncontrolledValue: a,
      mergedValue: s,
      followerRef: S,
      localizedPlaceholder: k,
      selectedOption: z,
      selectedOptions: I,
      mergedSize: L,
      mergedDisabled: Z,
      focused: d,
      activeWithoutMenuOpen: $e,
      inlineThemeDisabled: r,
      onTriggerInputFocus: me,
      onTriggerInputBlur: be,
      handleTriggerOrMenuResize: mt,
      handleMenuFocus: ie,
      handleMenuBlur: R,
      handleMenuTabOut: $,
      handleTriggerClick: Ce,
      handleToggle: ge,
      handleDeleteOption: he,
      handlePatternInput: K,
      handleClear: ve,
      handleTriggerBlur: Be,
      handleTriggerFocus: Me,
      handleKeydown: pt,
      handleMenuAfterLeave: se,
      handleMenuClickOutside: N,
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
    }, bo(Zs, null, {
      default: () => [bo(Js, null, {
        default: () => bo(e_, {
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
      }), bo(ed, {
        ref: "followerRef",
        show: this.mergedShow,
        to: this.adjustedTo,
        teleportDisabled: this.adjustedTo === Pn.tdkey,
        containerClass: this.namespace,
        width: this.consistentMenuWidth ? "target" : void 0,
        minWidth: "target",
        placement: this.placement
      }, {
        default: () => bo(xT, {
          name: "fade-in-scale-up-transition",
          appear: this.isMounted,
          onAfterLeave: this.handleMenuAfterLeave
        }, {
          default: () => {
            var e, t, n;
            return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), $T(bo(Yp, Object.assign({}, this.menuProps, {
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
            }), this.displayDirective === "show" ? [[CT, this.mergedShow], [ha, this.handleMenuClickOutside, void 0, {
              capture: !0
            }]] : [[ha, this.handleMenuClickOutside, void 0, {
              capture: !0
            }]])) : null;
          }
        })
      })]
    }));
  }
}), RT = {
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
function PT(e) {
  const {
    textColor2: t,
    primaryColor: n,
    primaryColorHover: o,
    primaryColorPressed: r,
    inputColorDisabled: i,
    textColorDisabled: a,
    borderColor: l,
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
  return Object.assign(Object.assign({}, RT), {
    buttonColor: "#0000",
    buttonColorHover: "#0000",
    buttonColorPressed: "#0000",
    buttonBorder: `1px solid ${l}`,
    buttonBorderHover: `1px solid ${l}`,
    buttonBorderPressed: `1px solid ${l}`,
    buttonIconColor: t,
    buttonIconColorHover: t,
    buttonIconColorPressed: t,
    itemTextColor: t,
    itemTextColorHover: o,
    itemTextColorPressed: r,
    itemTextColorActive: n,
    itemTextColorDisabled: a,
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
    itemBorderDisabled: `1px solid ${l}`,
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
    jumperTextColorDisabled: a
  });
}
const dv = {
  name: "Pagination",
  common: vt,
  peers: {
    Select: sv,
    Input: wd,
    Popselect: Cd
  },
  self: PT
}, Qu = `
 background: var(--n-item-color-hover);
 color: var(--n-item-text-color-hover);
 border: var(--n-item-border-hover);
`, ef = [X("button", `
 background: var(--n-button-color-hover);
 border: var(--n-button-border-hover);
 color: var(--n-button-icon-color-hover);
 `)], _T = V("pagination", `
 display: flex;
 vertical-align: middle;
 font-size: var(--n-item-font-size);
 flex-wrap: nowrap;
`, [V("pagination-prefix", `
 display: flex;
 align-items: center;
 margin: var(--n-prefix-margin);
 `), V("pagination-suffix", `
 display: flex;
 align-items: center;
 margin: var(--n-suffix-margin);
 `), W("> *:not(:first-child)", `
 margin: var(--n-item-margin);
 `), V("select", `
 width: var(--n-select-width);
 `), W("&.transition-disabled", [V("pagination-item", "transition: none!important;")]), V("pagination-quick-jumper", `
 white-space: nowrap;
 display: flex;
 color: var(--n-jumper-text-color);
 transition: color .3s var(--n-bezier);
 align-items: center;
 font-size: var(--n-jumper-font-size);
 `, [V("input", `
 margin: var(--n-input-margin);
 width: var(--n-input-width);
 `)]), V("pagination-item", `
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
 `, [X("button", `
 background: var(--n-button-color);
 color: var(--n-button-icon-color);
 border: var(--n-button-border);
 padding: 0;
 `, [V("base-icon", `
 font-size: var(--n-button-icon-size);
 `)]), Qe("disabled", [X("hover", Qu, ef), W("&:hover", Qu, ef), W("&:active", `
 background: var(--n-item-color-pressed);
 color: var(--n-item-text-color-pressed);
 border: var(--n-item-border-pressed);
 `, [X("button", `
 background: var(--n-button-color-pressed);
 border: var(--n-button-border-pressed);
 color: var(--n-button-icon-color-pressed);
 `)]), X("active", `
 background: var(--n-item-color-active);
 color: var(--n-item-text-color-active);
 border: var(--n-item-border-active);
 `, [W("&:hover", `
 background: var(--n-item-color-active-hover);
 `)])]), X("disabled", `
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `, [X("active, button", `
 background-color: var(--n-item-color-disabled);
 border: var(--n-item-border-disabled);
 `)])]), X("disabled", `
 cursor: not-allowed;
 `, [V("pagination-quick-jumper", `
 color: var(--n-jumper-text-color-disabled);
 `)]), X("simple", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `, [V("pagination-quick-jumper", [V("input", `
 margin: 0;
 `)])])]);
function cv(e) {
  var t;
  if (!e) return 10;
  const {
    defaultPageSize: n
  } = e;
  if (n !== void 0) return n;
  const o = (t = e.pageSizes) === null || t === void 0 ? void 0 : t[0];
  return typeof o == "number" ? o : (o == null ? void 0 : o.value) || 10;
}
function TT(e, t, n, o) {
  let r = !1, i = !1, a = 1, l = t;
  if (t === 1)
    return {
      hasFastBackward: !1,
      hasFastForward: !1,
      fastForwardTo: l,
      fastBackwardTo: a,
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
      fastForwardTo: l,
      fastBackwardTo: a,
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
  }), v ? (r = !0, a = c - 1, m.push({
    type: "fast-backward",
    active: !1,
    label: void 0,
    options: o ? tf(s + 1, c - 1) : null
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
  return f ? (i = !0, l = h + 1, m.push({
    type: "fast-forward",
    active: !1,
    label: void 0,
    options: o ? tf(h + 1, d - 1) : null
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
    fastBackwardTo: a,
    fastForwardTo: l,
    items: m
  };
}
function tf(e, t) {
  const n = [];
  for (let o = e; o <= t; ++o)
    n.push({
      label: `${o}`,
      value: o
    });
  return n;
}
const cn = window.Vue.computed, FT = window.Vue.defineComponent, nf = window.Vue.Fragment, Ge = window.Vue.h, ET = window.Vue.nextTick, Qn = window.Vue.ref, of = window.Vue.toRef, El = window.Vue.watchEffect, OT = Object.assign(Object.assign({}, _e.props), {
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
}), zT = FT({
  name: "Pagination",
  props: OT,
  slots: Object,
  setup(e) {
    const {
      mergedComponentPropsRef: t,
      mergedClsPrefixRef: n,
      inlineThemeDisabled: o,
      mergedRtlRef: r
    } = qe(e), i = _e("Pagination", "-pagination", _T, dv, e, n), {
      localeRef: a
    } = dr("Pagination"), l = Qn(null), s = Qn(e.defaultPage), d = Qn(cv(e)), c = Ot(of(e, "page"), s), h = Ot(of(e, "pageSize"), d), p = cn(() => {
      const {
        itemCount: Y
      } = e;
      if (Y !== void 0)
        return Math.max(1, Math.ceil(Y / h.value));
      const {
        pageCount: se
      } = e;
      return se !== void 0 ? Math.max(se, 1) : 1;
    }), v = Qn("");
    El(() => {
      e.simple, v.value = String(c.value);
    });
    const f = Qn(!1), m = Qn(!1), g = Qn(!1), u = Qn(!1), b = () => {
      e.disabled || (f.value = !0, z());
    }, x = () => {
      e.disabled || (f.value = !1, z());
    }, w = () => {
      m.value = !0, z();
    }, C = () => {
      m.value = !1, z();
    }, S = (Y) => {
      G(Y);
    }, y = cn(() => TT(c.value, p.value, e.pageSlot, e.showQuickJumpDropdown));
    El(() => {
      y.value.hasFastBackward ? y.value.hasFastForward || (f.value = !1, g.value = !1) : (m.value = !1, u.value = !1);
    });
    const T = cn(() => {
      const Y = a.value.selectionSuffix;
      return e.pageSizes.map((se) => typeof se == "number" ? {
        label: `${se} / ${Y}`,
        value: se
      } : se);
    }), k = cn(() => {
      var Y, se;
      return ((se = (Y = t == null ? void 0 : t.value) === null || Y === void 0 ? void 0 : Y.Pagination) === null || se === void 0 ? void 0 : se.inputSize) || Ac(e.size);
    }), E = cn(() => {
      var Y, se;
      return ((se = (Y = t == null ? void 0 : t.value) === null || Y === void 0 ? void 0 : Y.Pagination) === null || se === void 0 ? void 0 : se.selectSize) || Ac(e.size);
    }), U = cn(() => (c.value - 1) * h.value), _ = cn(() => {
      const Y = c.value * h.value - 1, {
        itemCount: se
      } = e;
      return se !== void 0 && Y > se - 1 ? se - 1 : Y;
    }), M = cn(() => {
      const {
        itemCount: Y
      } = e;
      return Y !== void 0 ? Y : (e.pageCount || 1) * h.value;
    }), I = zt("Pagination", r, n);
    function z() {
      ET(() => {
        var Y;
        const {
          value: se
        } = l;
        se && (se.classList.add("transition-disabled"), (Y = l.value) === null || Y === void 0 || Y.offsetWidth, se.classList.remove("transition-disabled"));
      });
    }
    function G(Y) {
      if (Y === c.value) return;
      const {
        "onUpdate:page": se,
        onUpdatePage: $e,
        onChange: me,
        simple: be
      } = e;
      se && le(se, Y), $e && le($e, Y), me && le(me, Y), s.value = Y, be && (v.value = String(Y));
    }
    function L(Y) {
      if (Y === h.value) return;
      const {
        "onUpdate:pageSize": se,
        onUpdatePageSize: $e,
        onPageSizeChange: me
      } = e;
      se && le(se, Y), $e && le($e, Y), me && le(me, Y), d.value = Y, p.value < c.value && G(p.value);
    }
    function Z() {
      if (e.disabled) return;
      const Y = Math.min(c.value + 1, p.value);
      G(Y);
    }
    function te() {
      if (e.disabled) return;
      const Y = Math.max(c.value - 1, 1);
      G(Y);
    }
    function q() {
      if (e.disabled) return;
      const Y = Math.min(y.value.fastForwardTo, p.value);
      G(Y);
    }
    function A() {
      if (e.disabled) return;
      const Y = Math.max(y.value.fastBackwardTo, 1);
      G(Y);
    }
    function F(Y) {
      L(Y);
    }
    function j() {
      const Y = Number.parseInt(v.value);
      Number.isNaN(Y) || (G(Math.max(1, Math.min(Y, p.value))), e.simple || (v.value = ""));
    }
    function J() {
      j();
    }
    function Q(Y) {
      if (!e.disabled)
        switch (Y.type) {
          case "page":
            G(Y.label);
            break;
          case "fast-backward":
            A();
            break;
          case "fast-forward":
            q();
            break;
        }
    }
    function ee(Y) {
      v.value = Y.replace(/\D+/g, "");
    }
    El(() => {
      c.value, h.value, z();
    });
    const de = cn(() => {
      const {
        size: Y
      } = e, {
        self: {
          buttonBorder: se,
          buttonBorderHover: $e,
          buttonBorderPressed: me,
          buttonIconColor: be,
          buttonIconColorHover: Ce,
          buttonIconColorPressed: Be,
          itemTextColor: Me,
          itemTextColorHover: ie,
          itemTextColorPressed: R,
          itemTextColorActive: $,
          itemTextColorDisabled: N,
          itemColor: ne,
          itemColorHover: ge,
          itemColorPressed: he,
          itemColorActive: O,
          itemColorActiveHover: K,
          itemColorDisabled: ve,
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
          buttonColorPressed: H,
          [ae("itemPadding", Y)]: oe,
          [ae("itemMargin", Y)]: ce,
          [ae("inputWidth", Y)]: ue,
          [ae("selectWidth", Y)]: we,
          [ae("inputMargin", Y)]: ye,
          [ae("selectMargin", Y)]: ke,
          [ae("jumperFontSize", Y)]: Ae,
          [ae("prefixMargin", Y)]: ot,
          [ae("suffixMargin", Y)]: Ne,
          [ae("itemSize", Y)]: Pt,
          [ae("buttonIconSize", Y)]: Mt,
          [ae("itemFontSize", Y)]: It,
          [`${ae("itemMargin", Y)}Rtl`]: Nt,
          [`${ae("inputMargin", Y)}Rtl`]: Ht
        },
        common: {
          cubicBezierEaseInOut: Qt
        }
      } = i.value;
      return {
        "--n-prefix-margin": ot,
        "--n-suffix-margin": Ne,
        "--n-item-font-size": It,
        "--n-select-width": we,
        "--n-select-margin": ke,
        "--n-input-width": ue,
        "--n-input-margin": ye,
        "--n-input-margin-rtl": Ht,
        "--n-item-size": Pt,
        "--n-item-text-color": Me,
        "--n-item-text-color-disabled": N,
        "--n-item-text-color-hover": ie,
        "--n-item-text-color-active": $,
        "--n-item-text-color-pressed": R,
        "--n-item-color": ne,
        "--n-item-color-hover": ge,
        "--n-item-color-disabled": ve,
        "--n-item-color-active": O,
        "--n-item-color-active-hover": K,
        "--n-item-color-pressed": he,
        "--n-item-border": Te,
        "--n-item-border-hover": lt,
        "--n-item-border-disabled": Ze,
        "--n-item-border-active": Ye,
        "--n-item-border-pressed": pt,
        "--n-item-padding": oe,
        "--n-item-border-radius": mt,
        "--n-bezier": Qt,
        "--n-jumper-font-size": Ae,
        "--n-jumper-text-color": et,
        "--n-jumper-text-color-disabled": fe,
        "--n-item-margin": ce,
        "--n-item-margin-rtl": Nt,
        "--n-button-icon-size": Mt,
        "--n-button-icon-color": be,
        "--n-button-icon-color-hover": Ce,
        "--n-button-icon-color-pressed": Be,
        "--n-button-color-hover": P,
        "--n-button-color": Re,
        "--n-button-color-pressed": H,
        "--n-button-border": se,
        "--n-button-border-hover": $e,
        "--n-button-border-pressed": me
      };
    }), pe = o ? wt("pagination", cn(() => {
      let Y = "";
      const {
        size: se
      } = e;
      return Y += se[0], Y;
    }), de, e) : void 0;
    return {
      rtlEnabled: I,
      mergedClsPrefix: n,
      locale: a,
      selfRef: l,
      mergedPage: c,
      pageItems: cn(() => y.value.items),
      mergedItemCount: M,
      jumperValue: v,
      pageSizeOptions: T,
      mergedPageSize: h,
      inputSize: k,
      selectSize: E,
      mergedTheme: i,
      mergedPageCount: p,
      startIndex: U,
      endIndex: _,
      showFastForwardMenu: g,
      showFastBackwardMenu: u,
      fastForwardActive: f,
      fastBackwardActive: m,
      handleMenuSelect: S,
      handleFastForwardMouseenter: b,
      handleFastForwardMouseleave: x,
      handleFastBackwardMouseenter: w,
      handleFastBackwardMouseleave: C,
      handleJumperInput: ee,
      handleBackwardClick: te,
      handleForwardClick: Z,
      handlePageItemClick: Q,
      handleSizePickerChange: F,
      handleQuickJumperChange: J,
      cssVars: o ? void 0 : de,
      themeClass: pe == null ? void 0 : pe.themeClass,
      onRender: pe == null ? void 0 : pe.onRender
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
      pageItems: a,
      showSizePicker: l,
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
      next: b,
      prefix: x,
      suffix: w,
      label: C,
      goto: S,
      handleJumperInput: y,
      handleSizePickerChange: T,
      handleBackwardClick: k,
      handlePageItemClick: E,
      handleForwardClick: U,
      handleQuickJumperChange: _,
      onRender: M
    } = this;
    M == null || M();
    const I = x || e.prefix, z = w || e.suffix, G = u || e.prev, L = b || e.next, Z = C || e.label;
    return Ge("div", {
      ref: "selfRef",
      class: [`${t}-pagination`, this.themeClass, this.rtlEnabled && `${t}-pagination--rtl`, n && `${t}-pagination--disabled`, g && `${t}-pagination--simple`],
      style: o
    }, I ? Ge("div", {
      class: `${t}-pagination-prefix`
    }, I({
      page: r,
      pageSize: v,
      pageCount: i,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      itemCount: this.mergedItemCount
    })) : null, this.displayOrder.map((te) => {
      switch (te) {
        case "pages":
          return Ge(nf, null, Ge("div", {
            class: [`${t}-pagination-item`, !G && `${t}-pagination-item--button`, (r <= 1 || r > i || n) && `${t}-pagination-item--disabled`],
            onClick: k
          }, G ? G({
            page: r,
            pageSize: v,
            pageCount: i,
            startIndex: this.startIndex,
            endIndex: this.endIndex,
            itemCount: this.mergedItemCount
          }) : Ge(Ct, {
            clsPrefix: t
          }, {
            default: () => this.rtlEnabled ? Ge(wu, null) : Ge(hu, null)
          })), g ? Ge(nf, null, Ge("div", {
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
          })), " /", " ", i) : a.map((q, A) => {
            let F, j, J;
            const {
              type: Q
            } = q;
            switch (Q) {
              case "page":
                const de = q.label;
                Z ? F = Z({
                  type: "page",
                  node: de,
                  active: q.active
                }) : F = de;
                break;
              case "fast-forward":
                const pe = this.fastForwardActive ? Ge(Ct, {
                  clsPrefix: t
                }, {
                  default: () => this.rtlEnabled ? Ge(mu, null) : Ge(gu, null)
                }) : Ge(Ct, {
                  clsPrefix: t
                }, {
                  default: () => Ge(yu, null)
                });
                Z ? F = Z({
                  type: "fast-forward",
                  node: pe,
                  active: this.fastForwardActive || this.showFastForwardMenu
                }) : F = pe, j = this.handleFastForwardMouseenter, J = this.handleFastForwardMouseleave;
                break;
              case "fast-backward":
                const Y = this.fastBackwardActive ? Ge(Ct, {
                  clsPrefix: t
                }, {
                  default: () => this.rtlEnabled ? Ge(gu, null) : Ge(mu, null)
                }) : Ge(Ct, {
                  clsPrefix: t
                }, {
                  default: () => Ge(yu, null)
                });
                Z ? F = Z({
                  type: "fast-backward",
                  node: Y,
                  active: this.fastBackwardActive || this.showFastBackwardMenu
                }) : F = Y, j = this.handleFastBackwardMouseenter, J = this.handleFastBackwardMouseleave;
                break;
            }
            const ee = Ge("div", {
              key: A,
              class: [`${t}-pagination-item`, q.active && `${t}-pagination-item--active`, Q !== "page" && (Q === "fast-backward" && this.showFastBackwardMenu || Q === "fast-forward" && this.showFastForwardMenu) && `${t}-pagination-item--hover`, n && `${t}-pagination-item--disabled`, Q === "page" && `${t}-pagination-item--clickable`],
              onClick: () => {
                E(q);
              },
              onMouseenter: j,
              onMouseleave: J
            }, F);
            if (Q === "page" && !q.mayBeFastBackward && !q.mayBeFastForward)
              return ee;
            {
              const de = q.type === "page" ? q.mayBeFastBackward ? "fast-backward" : "fast-forward" : q.type;
              return q.type !== "page" && !q.options ? ee : Ge(gT, {
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
                show: Q === "page" ? !1 : Q === "fast-backward" ? this.showFastBackwardMenu : this.showFastForwardMenu,
                onUpdateShow: (pe) => {
                  Q !== "page" && (pe ? Q === "fast-backward" ? this.showFastBackwardMenu = pe : this.showFastForwardMenu = pe : (this.showFastBackwardMenu = !1, this.showFastForwardMenu = !1));
                },
                options: q.type !== "page" && q.options ? q.options : [],
                onUpdateValue: this.handleMenuSelect,
                scrollable: !0,
                showCheckmark: !1
              }, {
                default: () => ee
              });
            }
          }), Ge("div", {
            class: [`${t}-pagination-item`, !L && `${t}-pagination-item--button`, {
              [`${t}-pagination-item--disabled`]: r < 1 || r >= i || n
            }],
            onClick: U
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
            default: () => this.rtlEnabled ? Ge(hu, null) : Ge(wu, null)
          })));
        case "size-picker":
          return !g && l ? Ge(_s, Object.assign({
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
    }), z ? Ge("div", {
      class: `${t}-pagination-suffix`
    }, z({
      page: r,
      pageSize: v,
      pageCount: i,
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      itemCount: this.mergedItemCount
    })) : null);
  }
}), MT = {
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
function IT(e) {
  const {
    primaryColor: t,
    textColor2: n,
    dividerColor: o,
    hoverColor: r,
    popoverColor: i,
    invertedColor: a,
    borderRadius: l,
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
  return Object.assign(Object.assign({}, MT), {
    optionHeightSmall: p,
    optionHeightMedium: v,
    optionHeightLarge: f,
    optionHeightHuge: m,
    borderRadius: l,
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
    groupHeaderTextColor: g,
    // inverted
    optionTextColorInverted: "#BBB",
    optionTextColorHoverInverted: "#FFF",
    optionTextColorActiveInverted: "#FFF",
    optionTextColorChildActiveInverted: "#FFF",
    colorInverted: a,
    dividerColorInverted: "#BBB",
    suffixColorInverted: "#BBB",
    prefixColorInverted: "#BBB",
    optionColorHoverInverted: t,
    optionColorActiveInverted: t,
    groupHeaderTextColorInverted: "#AAA",
    optionOpacityDisabled: u
  });
}
const uv = {
  name: "Dropdown",
  common: vt,
  peers: {
    Popover: fr
  },
  self: IT
}, AT = {
  padding: "8px 14px"
};
function VT(e) {
  const {
    borderRadius: t,
    boxShadow2: n,
    baseColor: o
  } = e;
  return Object.assign(Object.assign({}, AT), {
    borderRadius: t,
    boxShadow: n,
    color: je(o, "rgba(0, 0, 0, .85)"),
    textColor: o
  });
}
const fv = {
  name: "Tooltip",
  common: vt,
  peers: {
    Popover: fr
  },
  self: VT
}, hv = {
  name: "Ellipsis",
  common: vt,
  peers: {
    Tooltip: fv
  }
}, BT = {
  radioSizeSmall: "14px",
  radioSizeMedium: "16px",
  radioSizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function LT(e) {
  const {
    borderColor: t,
    primaryColor: n,
    baseColor: o,
    textColorDisabled: r,
    inputColorDisabled: i,
    textColor2: a,
    opacityDisabled: l,
    borderRadius: s,
    fontSizeSmall: d,
    fontSizeMedium: c,
    fontSizeLarge: h,
    heightSmall: p,
    heightMedium: v,
    heightLarge: f,
    lineHeight: m
  } = e;
  return Object.assign(Object.assign({}, BT), {
    labelLineHeight: m,
    buttonHeightSmall: p,
    buttonHeightMedium: v,
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
    textColor: a,
    textColorDisabled: r,
    dotColorActive: n,
    dotColorDisabled: t,
    buttonBorderColor: t,
    buttonBorderColorActive: n,
    buttonBorderColorHover: t,
    buttonColor: o,
    buttonColorActive: o,
    buttonTextColor: a,
    buttonTextColorActive: n,
    buttonTextColorHover: n,
    opacityDisabled: l,
    buttonBoxShadowFocus: `inset 0 0 0 1px ${n}, 0 0 0 2px ${Ee(n, {
      alpha: 0.3
    })}`,
    buttonBoxShadowHover: "inset 0 0 0 1px #0000",
    buttonBoxShadow: "inset 0 0 0 1px #0000",
    buttonBorderRadius: s
  });
}
const $d = {
  name: "Radio",
  common: vt,
  self: LT
}, DT = {
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
function NT(e) {
  const {
    cardColor: t,
    modalColor: n,
    popoverColor: o,
    textColor2: r,
    textColor1: i,
    tableHeaderColor: a,
    tableColorHover: l,
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
    opacityDisabled: b,
    tableColorStriped: x
  } = e;
  return Object.assign(Object.assign({}, DT), {
    actionDividerColor: g,
    lineHeight: p,
    borderRadius: h,
    fontSizeSmall: v,
    fontSizeMedium: f,
    fontSizeLarge: m,
    borderColor: je(t, g),
    tdColorHover: je(t, l),
    tdColorSorting: je(t, l),
    tdColorStriped: je(t, x),
    thColor: je(t, a),
    thColorHover: je(je(t, a), l),
    thColorSorting: je(je(t, a), l),
    tdColor: t,
    tdTextColor: r,
    thTextColor: i,
    thFontWeight: c,
    thButtonColorHover: l,
    thIconColor: s,
    thIconColorActive: d,
    // modal
    borderColorModal: je(n, g),
    tdColorHoverModal: je(n, l),
    tdColorSortingModal: je(n, l),
    tdColorStripedModal: je(n, x),
    thColorModal: je(n, a),
    thColorHoverModal: je(je(n, a), l),
    thColorSortingModal: je(je(n, a), l),
    tdColorModal: n,
    // popover
    borderColorPopover: je(o, g),
    tdColorHoverPopover: je(o, l),
    tdColorSortingPopover: je(o, l),
    tdColorStripedPopover: je(o, x),
    thColorPopover: je(o, a),
    thColorHoverPopover: je(je(o, a), l),
    thColorSortingPopover: je(je(o, a), l),
    tdColorPopover: o,
    boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
    boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
    // loading
    loadingColor: d,
    loadingSize: u,
    opacityLoading: b
  });
}
const HT = {
  name: "DataTable",
  common: vt,
  peers: {
    Button: yd,
    Checkbox: iv,
    Radio: $d,
    Pagination: dv,
    Scrollbar: si,
    Empty: gd,
    Popover: fr,
    Ellipsis: hv,
    Dropdown: uv
  },
  self: NT
}, jT = Object.assign(Object.assign({}, _e.props), {
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
}), mn = "n-data-table", pv = 40, vv = 40;
function rf(e) {
  if (e.type === "selection")
    return e.width === void 0 ? pv : xt(e.width);
  if (e.type === "expand")
    return e.width === void 0 ? vv : xt(e.width);
  if (!("children" in e))
    return typeof e.width == "string" ? xt(e.width) : e.width;
}
function WT(e) {
  var t, n;
  if (e.type === "selection")
    return St((t = e.width) !== null && t !== void 0 ? t : pv);
  if (e.type === "expand")
    return St((n = e.width) !== null && n !== void 0 ? n : vv);
  if (!("children" in e))
    return St(e.width);
}
function fn(e) {
  return e.type === "selection" ? "__n_selection__" : e.type === "expand" ? "__n_expand__" : e.key;
}
function af(e) {
  return e && (typeof e == "object" ? Object.assign({}, e) : e);
}
function UT(e) {
  return e === "ascend" ? 1 : e === "descend" ? -1 : 0;
}
function KT(e, t, n) {
  return n !== void 0 && (e = Math.min(e, typeof n == "number" ? n : Number.parseFloat(n))), t !== void 0 && (e = Math.max(e, typeof t == "number" ? t : Number.parseFloat(t))), e;
}
function qT(e, t) {
  if (t !== void 0)
    return {
      width: t,
      minWidth: t,
      maxWidth: t
    };
  const n = WT(e), {
    minWidth: o,
    maxWidth: r
  } = e;
  return {
    width: n,
    minWidth: St(o) || n,
    maxWidth: St(r)
  };
}
function GT(e, t, n) {
  return typeof n == "function" ? n(e, t) : n || "";
}
function Ol(e) {
  return e.filterOptionValues !== void 0 || e.filterOptionValue === void 0 && e.defaultFilterOptionValues !== void 0;
}
function zl(e) {
  return "children" in e ? !1 : !!e.sorter;
}
function mv(e) {
  return "children" in e && e.children.length ? !1 : !!e.resizable;
}
function lf(e) {
  return "children" in e ? !1 : !!e.filter && (!!e.filterOptions || !!e.renderFilterMenu);
}
function sf(e) {
  if (e) {
    if (e === "descend") return "ascend";
  } else return "descend";
  return !1;
}
function XT(e, t) {
  if (e.sorter === void 0) return null;
  const {
    customNextSortOrder: n
  } = e;
  return t === null || t.columnKey !== e.key ? {
    columnKey: e.key,
    sorter: e.sorter,
    order: sf(!1)
  } : Object.assign(Object.assign({}, t), {
    order: (n || sf)(t.order)
  });
}
function gv(e, t) {
  return t.find((n) => n.columnKey === e.key && n.order) !== void 0;
}
function YT(e) {
  return typeof e == "string" ? e.replace(/,/g, "\\,") : e == null ? "" : `${e}`.replace(/,/g, "\\,");
}
function ZT(e, t, n, o) {
  const r = e.filter((l) => l.type !== "expand" && l.type !== "selection" && l.allowExport !== !1), i = r.map((l) => o ? o(l) : l.title).join(","), a = t.map((l) => r.map((s) => n ? n(l[s.key], l, s) : YT(l[s.key])).join(","));
  return [i, ...a].join(`
`);
}
const JT = window.Vue.defineComponent, QT = window.Vue.h, eF = window.Vue.inject, tF = JT({
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
    } = eF(mn);
    return () => {
      const {
        rowKey: o
      } = e;
      return QT(xd, {
        privateInsideTable: !0,
        disabled: e.disabled,
        indeterminate: n.value.has(o),
        checked: t.value.has(o),
        onUpdateChecked: e.onUpdateChecked
      });
    };
  }
}), nF = V("radio", `
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
`, [X("checked", [D("dot", `
 background-color: var(--n-color-active);
 `)]), D("dot-wrapper", `
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `), V("radio-input", `
 position: absolute;
 border: 0;
 width: 0;
 height: 0;
 opacity: 0;
 margin: 0;
 `), D("dot", `
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
 `, [W("&::before", `
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
 `), X("checked", {
  boxShadow: "var(--n-box-shadow-active)"
}, [W("&::before", `
 opacity: 1;
 transform: scale(1);
 `)])]), D("label", `
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `), Qe("disabled", `
 cursor: pointer;
 `, [W("&:hover", [D("dot", {
  boxShadow: "var(--n-box-shadow-hover)"
})]), X("focus", [W("&:not(:active)", [D("dot", {
  boxShadow: "var(--n-box-shadow-focus)"
})])])]), X("disabled", `
 cursor: not-allowed;
 `, [D("dot", {
  boxShadow: "var(--n-box-shadow-disabled)",
  backgroundColor: "var(--n-color-disabled)"
}, [W("&::before", {
  backgroundColor: "var(--n-dot-color-disabled)"
}), X("checked", `
 opacity: 1;
 `)]), D("label", {
  color: "var(--n-text-color-disabled)"
}), V("radio-input", `
 cursor: not-allowed;
 `)])]), oF = window.Vue.inject, Ni = window.Vue.ref, rF = window.Vue.toRef;
window.Vue.watchEffect;
const iF = {
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
}, bv = "n-radio-group";
function aF(e) {
  const t = oF(bv, null), n = jn(e, {
    mergedSize(b) {
      const {
        size: x
      } = e;
      if (x !== void 0) return x;
      if (t) {
        const {
          mergedSizeRef: {
            value: w
          }
        } = t;
        if (w !== void 0)
          return w;
      }
      return b ? b.mergedSize.value : "medium";
    },
    mergedDisabled(b) {
      return !!(e.disabled || t != null && t.disabledRef.value || b != null && b.disabled.value);
    }
  }), {
    mergedSizeRef: o,
    mergedDisabledRef: r
  } = n, i = Ni(null), a = Ni(null), l = Ni(e.defaultChecked), s = rF(e, "checked"), d = Ot(s, l), c = ze(() => t ? t.valueRef.value === e.value : d.value), h = ze(() => {
    const {
      name: b
    } = e;
    if (b !== void 0) return b;
    if (t) return t.nameRef.value;
  }), p = Ni(!1);
  function v() {
    if (t) {
      const {
        doUpdateValue: b
      } = t, {
        value: x
      } = e;
      le(b, x);
    } else {
      const {
        onUpdateChecked: b,
        "onUpdate:checked": x
      } = e, {
        nTriggerFormInput: w,
        nTriggerFormChange: C
      } = n;
      b && le(b, !0), x && le(x, !0), w(), C(), l.value = !0;
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
    labelRef: a,
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
const df = window.Vue.computed, lF = window.Vue.defineComponent, Tr = window.Vue.h, sF = Object.assign(Object.assign({}, _e.props), iF), wv = lF({
  name: "Radio",
  props: sF,
  setup(e) {
    const t = aF(e), n = _e("Radio", "-radio", nF, $d, e, t.mergedClsPrefix), o = df(() => {
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
          colorActive: b,
          textColor: x,
          textColorDisabled: w,
          dotColorActive: C,
          dotColorDisabled: S,
          labelPadding: y,
          labelLineHeight: T,
          labelFontWeight: k,
          [ae("fontSize", d)]: E,
          [ae("radioSize", d)]: U
        }
      } = n.value;
      return {
        "--n-bezier": c,
        "--n-label-line-height": T,
        "--n-label-font-weight": k,
        "--n-box-shadow": h,
        "--n-box-shadow-active": p,
        "--n-box-shadow-disabled": v,
        "--n-box-shadow-focus": f,
        "--n-box-shadow-hover": m,
        "--n-color": g,
        "--n-color-active": b,
        "--n-color-disabled": u,
        "--n-dot-color-active": C,
        "--n-dot-color-disabled": S,
        "--n-font-size": E,
        "--n-radio-size": U,
        "--n-text-color": x,
        "--n-text-color-disabled": w,
        "--n-label-padding": y
      };
    }), {
      inlineThemeDisabled: r,
      mergedClsPrefixRef: i,
      mergedRtlRef: a
    } = qe(e), l = zt("Radio", a, i), s = r ? wt("radio", df(() => t.mergedSize.value[0]), o, e) : void 0;
    return Object.assign(t, {
      rtlEnabled: l,
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
    return n == null || n(), Tr("label", {
      class: [`${t}-radio`, this.themeClass, this.rtlEnabled && `${t}-radio--rtl`, this.mergedDisabled && `${t}-radio--disabled`, this.renderSafeChecked && `${t}-radio--checked`, this.focus && `${t}-radio--focus`],
      style: this.cssVars
    }, Tr("div", {
      class: `${t}-radio__dot-wrapper`
    }, " ", Tr("div", {
      class: [`${t}-radio__dot`, this.renderSafeChecked && `${t}-radio__dot--checked`]
    }), Tr("input", {
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
    })), We(e.default, (r) => !r && !o ? null : Tr("div", {
      ref: "labelRef",
      class: `${t}-radio__label`
    }, r || o)));
  }
}), dF = V("radio-group", `
 display: inline-block;
 font-size: var(--n-font-size);
`, [D("splitor", `
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `, [X("checked", {
  backgroundColor: "var(--n-button-border-color-active)"
}), X("disabled", {
  opacity: "var(--n-opacity-disabled)"
})]), X("button-group", `
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [V("radio-button", {
  height: "var(--n-height)",
  lineHeight: "var(--n-height)"
}), D("splitor", {
  height: "var(--n-height)"
})]), V("radio-button", `
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
 `, [V("radio-input", `
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
 `), D("state-border", `
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `), W("&:first-child", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `, [D("state-border", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]), W("&:last-child", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `, [D("state-border", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]), Qe("disabled", `
 cursor: pointer;
 `, [W("&:hover", [D("state-border", `
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `), Qe("checked", {
  color: "var(--n-button-text-color-hover)"
})]), X("focus", [W("&:not(:active)", [D("state-border", {
  boxShadow: "var(--n-button-box-shadow-focus)"
})])])]), X("checked", `
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `), X("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]), cf = window.Vue.computed, cF = window.Vue.defineComponent, yv = window.Vue.h, uF = window.Vue.provide, uf = window.Vue.ref, ff = window.Vue.toRef;
function fF(e, t, n) {
  var o;
  const r = [];
  let i = !1;
  for (let a = 0; a < e.length; ++a) {
    const l = e[a], s = (o = l.type) === null || o === void 0 ? void 0 : o.name;
    s === "RadioButton" && (i = !0);
    const d = l.props;
    if (s !== "RadioButton") {
      r.push(l);
      continue;
    }
    if (a === 0)
      r.push(l);
    else {
      const c = r[r.length - 1].props, h = t === c.value, p = c.disabled, v = t === d.value, f = d.disabled, m = (h ? 2 : 0) + (p ? 0 : 1), g = (v ? 2 : 0) + (f ? 0 : 1), u = {
        [`${n}-radio-group__splitor--disabled`]: p,
        [`${n}-radio-group__splitor--checked`]: h
      }, b = {
        [`${n}-radio-group__splitor--disabled`]: f,
        [`${n}-radio-group__splitor--checked`]: v
      }, x = m < g ? b : u;
      r.push(yv("div", {
        class: [`${n}-radio-group__splitor`, x]
      }), l);
    }
  }
  return {
    children: r,
    isButtonGroup: i
  };
}
const hF = Object.assign(Object.assign({}, _e.props), {
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
}), pF = cF({
  name: "RadioGroup",
  props: hF,
  setup(e) {
    const t = uf(null), {
      mergedSizeRef: n,
      mergedDisabledRef: o,
      nTriggerFormChange: r,
      nTriggerFormInput: i,
      nTriggerFormBlur: a,
      nTriggerFormFocus: l
    } = jn(e), {
      mergedClsPrefixRef: s,
      inlineThemeDisabled: d,
      mergedRtlRef: c
    } = qe(e), h = _e("Radio", "-radio-group", dF, $d, e, s), p = uf(e.defaultValue), v = ff(e, "value"), f = Ot(v, p);
    function m(C) {
      const {
        onUpdateValue: S,
        "onUpdate:value": y
      } = e;
      S && le(S, C), y && le(y, C), p.value = C, r(), i();
    }
    function g(C) {
      const {
        value: S
      } = t;
      S && (S.contains(C.relatedTarget) || l());
    }
    function u(C) {
      const {
        value: S
      } = t;
      S && (S.contains(C.relatedTarget) || a());
    }
    uF(bv, {
      mergedClsPrefixRef: s,
      nameRef: ff(e, "name"),
      valueRef: f,
      disabledRef: o,
      mergedSizeRef: n,
      doUpdateValue: m
    });
    const b = zt("Radio", c, s), x = cf(() => {
      const {
        value: C
      } = n, {
        common: {
          cubicBezierEaseInOut: S
        },
        self: {
          buttonBorderColor: y,
          buttonBorderColorActive: T,
          buttonBorderRadius: k,
          buttonBoxShadow: E,
          buttonBoxShadowFocus: U,
          buttonBoxShadowHover: _,
          buttonColor: M,
          buttonColorActive: I,
          buttonTextColor: z,
          buttonTextColorActive: G,
          buttonTextColorHover: L,
          opacityDisabled: Z,
          [ae("buttonHeight", C)]: te,
          [ae("fontSize", C)]: q
        }
      } = h.value;
      return {
        "--n-font-size": q,
        "--n-bezier": S,
        "--n-button-border-color": y,
        "--n-button-border-color-active": T,
        "--n-button-border-radius": k,
        "--n-button-box-shadow": E,
        "--n-button-box-shadow-focus": U,
        "--n-button-box-shadow-hover": _,
        "--n-button-color": M,
        "--n-button-color-active": I,
        "--n-button-text-color": z,
        "--n-button-text-color-hover": L,
        "--n-button-text-color-active": G,
        "--n-height": te,
        "--n-opacity-disabled": Z
      };
    }), w = d ? wt("radio-group", cf(() => n.value[0]), x, e) : void 0;
    return {
      selfElRef: t,
      rtlEnabled: b,
      mergedClsPrefix: s,
      mergedValue: f,
      handleFocusout: u,
      handleFocusin: g,
      cssVars: d ? void 0 : x,
      themeClass: w == null ? void 0 : w.themeClass,
      onRender: w == null ? void 0 : w.onRender
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
      isButtonGroup: a
    } = fF(or(od(this)), t, n);
    return (e = this.onRender) === null || e === void 0 || e.call(this), yv("div", {
      onFocusin: o,
      onFocusout: r,
      ref: "selfElRef",
      class: [`${n}-radio-group`, this.rtlEnabled && `${n}-radio-group--rtl`, this.themeClass, a && `${n}-radio-group--button-group`],
      style: this.cssVars
    }, i);
  }
}), vF = window.Vue.defineComponent, mF = window.Vue.h, gF = window.Vue.inject, bF = vF({
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
    } = gF(mn);
    return () => {
      const {
        rowKey: o
      } = e;
      return mF(wv, {
        name: n,
        disabled: e.disabled,
        checked: t.value.has(o),
        onUpdateChecked: e.onUpdateChecked
      });
    };
  }
}), wF = window.Vue.computed, yF = window.Vue.defineComponent, xF = window.Vue.h, CF = window.Vue.ref, SF = Object.assign(Object.assign({}, ir), _e.props), $F = yF({
  name: "Tooltip",
  props: SF,
  slots: Object,
  __popover__: !0,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = qe(e), n = _e("Tooltip", "-tooltip", void 0, fv, e, t), o = CF(null);
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
      popoverThemeOverrides: wF(() => n.value.self)
    });
  },
  render() {
    const {
      mergedTheme: e,
      internalExtraClass: t
    } = this;
    return xF(ci, Object.assign(Object.assign({}, this.$props), {
      theme: e.peers.Popover,
      themeOverrides: e.peerOverrides.Popover,
      builtinThemeOverrides: this.popoverThemeOverrides,
      internalExtraClass: t.concat("tooltip"),
      ref: "popoverRef"
    }), this.$slots);
  }
}), xv = V("ellipsis", {
  overflow: "hidden"
}, [Qe("line-clamp", `
 white-space: nowrap;
 display: inline-block;
 vertical-align: bottom;
 max-width: 100%;
 `), X("line-clamp", `
 display: -webkit-inline-box;
 -webkit-box-orient: vertical;
 `), X("cursor-pointer", `
 cursor: pointer;
 `)]), hf = window.Vue.computed, kF = window.Vue.defineComponent, Ml = window.Vue.h, RF = window.Vue.mergeProps, PF = window.Vue.onDeactivated, Hi = window.Vue.ref;
function Ts(e) {
  return `${e}-ellipsis--line-clamp`;
}
function Fs(e, t) {
  return `${e}-ellipsis--cursor-${t}`;
}
const Cv = Object.assign(Object.assign({}, _e.props), {
  expandTrigger: String,
  lineClamp: [Number, String],
  tooltip: {
    type: [Boolean, Object],
    default: !0
  }
}), kd = kF({
  name: "Ellipsis",
  inheritAttrs: !1,
  props: Cv,
  slots: Object,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    const o = up(), r = _e("Ellipsis", "-ellipsis", xv, hv, e, o), i = Hi(null), a = Hi(null), l = Hi(null), s = Hi(!1), d = hf(() => {
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
        value: b
      } = i;
      if (b) {
        const {
          lineClamp: x
        } = e;
        if (v(b), x !== void 0)
          g = b.scrollHeight <= b.offsetHeight;
        else {
          const {
            value: w
          } = a;
          w && (g = w.getBoundingClientRect().width <= b.getBoundingClientRect().width);
        }
        f(b, g);
      }
      return g;
    }
    const h = hf(() => e.expandTrigger === "click" ? () => {
      var g;
      const {
        value: u
      } = s;
      u && ((g = l.value) === null || g === void 0 || g.setShow(!1)), s.value = !u;
    } : void 0);
    PF(() => {
      var g;
      e.tooltip && ((g = l.value) === null || g === void 0 || g.setShow(!1));
    });
    const p = () => Ml("span", Object.assign({}, RF(n, {
      class: [`${o.value}-ellipsis`, e.lineClamp !== void 0 ? Ts(o.value) : void 0, e.expandTrigger === "click" ? Fs(o.value, "pointer") : void 0],
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
      const u = d.value, b = Ts(o.value);
      e.lineClamp !== void 0 ? m(g, b, "add") : m(g, b, "remove");
      for (const x in u)
        g.style[x] !== u[x] && (g.style[x] = u[x]);
    }
    function f(g, u) {
      const b = Fs(o.value, "pointer");
      e.expandTrigger === "click" && !u ? m(g, b, "add") : m(g, b, "remove");
    }
    function m(g, u, b) {
      b === "add" ? g.classList.contains(u) || g.classList.add(u) : g.classList.contains(u) && g.classList.remove(u);
    }
    return {
      mergedTheme: r,
      triggerRef: i,
      triggerInnerRef: a,
      tooltipRef: l,
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
      return Ml($F, Object.assign({
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
}), _F = window.Vue.defineComponent, Il = window.Vue.h, pf = window.Vue.mergeProps, TF = window.Vue.ref, FF = _F({
  name: "PerformantEllipsis",
  props: Cv,
  inheritAttrs: !1,
  setup(e, {
    attrs: t,
    slots: n
  }) {
    const o = TF(!1), r = up();
    return Vo("-ellipsis", xv, r), {
      mouseEntered: o,
      renderTrigger: () => {
        const {
          lineClamp: a
        } = e, l = r.value;
        return Il("span", Object.assign({}, pf(t, {
          class: [`${l}-ellipsis`, a !== void 0 ? Ts(l) : void 0, e.expandTrigger === "click" ? Fs(l, "pointer") : void 0],
          style: a === void 0 ? {
            textOverflow: "ellipsis"
          } : {
            "-webkit-line-clamp": a
          }
        }), {
          onMouseenter: () => {
            o.value = !0;
          }
        }), a ? n : Il("span", null, n));
      }
    };
  },
  render() {
    return this.mouseEntered ? Il(kd, pf({}, this.$attrs, this.$props), this.$slots) : this.renderTrigger();
  }
}), EF = window.Vue.defineComponent, Al = window.Vue.h, OF = EF({
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
      render: a,
      key: l,
      ellipsis: s
    } = n;
    if (a && !t ? i = a(o, this.index) : t ? i = (e = o[l]) === null || e === void 0 ? void 0 : e.value : i = r ? r(ri(o, l), o, n) : ri(o, l), s)
      if (typeof s == "object") {
        const {
          mergedTheme: d
        } = this;
        return n.ellipsisComponent === "performant-ellipsis" ? Al(FF, Object.assign({}, s, {
          theme: d.peers.Ellipsis,
          themeOverrides: d.peerOverrides.Ellipsis
        }), {
          default: () => i
        }) : Al(kd, Object.assign({}, s, {
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
}), zF = window.Vue.defineComponent, Fr = window.Vue.h, vf = zF({
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
    return Fr("div", {
      class: [`${e}-data-table-expand-trigger`, this.expanded && `${e}-data-table-expand-trigger--expanded`],
      onClick: this.onClick,
      onMousedown: (t) => {
        t.preventDefault();
      }
    }, Fr(cr, null, {
      default: () => this.loading ? Fr(ur, {
        key: "loading",
        clsPrefix: this.clsPrefix,
        radius: 85,
        strokeWidth: 15,
        scale: 0.88
      }) : this.renderExpandIcon ? this.renderExpandIcon({
        expanded: this.expanded,
        rowData: this.rowData
      }) : Fr(Ct, {
        clsPrefix: e,
        key: "base-icon"
      }, {
        default: () => Fr(jp, null)
      })
    }));
  }
}), mf = window.Vue.computed, MF = window.Vue.defineComponent, Bn = window.Vue.h, IF = window.Vue.inject, AF = window.Vue.ref, VF = MF({
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
    } = qe(e), o = zt("DataTable", n, t), {
      mergedClsPrefixRef: r,
      mergedThemeRef: i,
      localeRef: a
    } = IF(mn), l = AF(e.value), s = mf(() => {
      const {
        value: f
      } = l;
      return Array.isArray(f) ? f : null;
    }), d = mf(() => {
      const {
        value: f
      } = l;
      return Ol(e.column) ? Array.isArray(f) && f.length && f[0] || null : Array.isArray(f) ? null : f;
    });
    function c(f) {
      e.onChange(f);
    }
    function h(f) {
      e.multiple && Array.isArray(f) ? l.value = f : Ol(e.column) && !Array.isArray(f) ? l.value = [f] : l.value = f;
    }
    function p() {
      c(l.value), e.onConfirm();
    }
    function v() {
      e.multiple || Ol(e.column) ? c([]) : c(null), e.onClear();
    }
    return {
      mergedClsPrefix: r,
      rtlEnabled: o,
      mergedTheme: i,
      locale: a,
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
    }, Bn(di, null, {
      default: () => {
        const {
          checkboxGroupValue: o,
          handleChange: r
        } = this;
        return this.multiple ? Bn(Z_, {
          value: o,
          class: `${n}-data-table-filter-menu__group`,
          onUpdateValue: r
        }, {
          default: () => this.options.map((i) => Bn(xd, {
            key: i.value,
            theme: e.peers.Checkbox,
            themeOverrides: e.peerOverrides.Checkbox,
            value: i.value
          }, {
            default: () => i.label
          }))
        }) : Bn(pF, {
          name: this.radioGroupName,
          class: `${n}-data-table-filter-menu__group`,
          value: this.radioGroupValue,
          onUpdateValue: this.handleChange
        }, {
          default: () => this.options.map((i) => Bn(wv, {
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
    }, Bn(ii, {
      size: "tiny",
      theme: e.peers.Button,
      themeOverrides: e.peerOverrides.Button,
      onClick: this.handleClearClick
    }, {
      default: () => t.clear
    }), Bn(ii, {
      theme: e.peers.Button,
      themeOverrides: e.peerOverrides.Button,
      type: "primary",
      size: "tiny",
      onClick: this.handleConfirmClick
    }, {
      default: () => t.confirm
    })));
  }
}), BF = window.Vue.defineComponent, LF = BF({
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
}), ji = window.Vue.computed, DF = window.Vue.defineComponent, qo = window.Vue.h, NF = window.Vue.inject, HF = window.Vue.ref;
function jF(e, t, n) {
  const o = Object.assign({}, e);
  return o[t] = n, o;
}
const WF = DF({
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
      paginationBehaviorOnFilterRef: a,
      doUpdatePage: l,
      doUpdateFilters: s,
      filterIconPopoverPropsRef: d
    } = NF(mn), c = HF(!1), h = r, p = ji(() => e.column.filterMultiple !== !1), v = ji(() => {
      const x = h.value[e.column.key];
      if (x === void 0) {
        const {
          value: w
        } = p;
        return w ? [] : null;
      }
      return x;
    }), f = ji(() => {
      const {
        value: x
      } = v;
      return Array.isArray(x) ? x.length > 0 : x !== null;
    }), m = ji(() => {
      var x, w;
      return ((w = (x = t == null ? void 0 : t.value) === null || x === void 0 ? void 0 : x.DataTable) === null || w === void 0 ? void 0 : w.renderFilter) || e.column.renderFilter;
    });
    function g(x) {
      const w = jF(h.value, e.column.key, x);
      s(w, e.column), a.value === "first" && l(1);
    }
    function u() {
      c.value = !1;
    }
    function b() {
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
      handleFilterMenuConfirm: b,
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
    return qo(ci, Object.assign({
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
          return qo(LF, {
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
          default: () => qo(Vk, null)
        }));
      },
      default: () => {
        const {
          renderFilterMenu: r
        } = this.column;
        return r ? r({
          hide: n
        }) : qo(VF, {
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
}), UF = window.Vue.defineComponent, KF = window.Vue.h, qF = window.Vue.inject, GF = window.Vue.onBeforeUnmount, XF = window.Vue.ref, YF = UF({
  name: "ColumnResizeButton",
  props: {
    onResizeStart: Function,
    onResize: Function,
    onResizeEnd: Function
  },
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = qF(mn), n = XF(!1);
    let o = 0;
    function r(s) {
      return s.clientX;
    }
    function i(s) {
      var d;
      s.preventDefault();
      const c = n.value;
      o = r(s), n.value = !0, c || (at("mousemove", window, a), at("mouseup", window, l), (d = e.onResizeStart) === null || d === void 0 || d.call(e));
    }
    function a(s) {
      var d;
      (d = e.onResize) === null || d === void 0 || d.call(e, r(s) - o);
    }
    function l() {
      var s;
      n.value = !1, (s = e.onResizeEnd) === null || s === void 0 || s.call(e), Je("mousemove", window, a), Je("mouseup", window, l);
    }
    return GF(() => {
      Je("mousemove", window, a), Je("mouseup", window, l);
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
    return KF("span", {
      "data-data-table-resizable": !0,
      class: [`${e}-data-table-resize-button`, this.active && `${e}-data-table-resize-button--active`],
      onMousedown: this.handleMousedown
    });
  }
}), ZF = window.Vue.defineComponent, JF = ZF({
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
}), Wi = window.Vue.computed, QF = window.Vue.defineComponent, Ui = window.Vue.h, eE = window.Vue.inject, tE = QF({
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
    } = eE(mn), r = Wi(() => n.value.find((s) => s.columnKey === e.column.key)), i = Wi(() => r.value !== void 0), a = Wi(() => {
      const {
        value: s
      } = r;
      return s && i.value ? s.order : !1;
    }), l = Wi(() => {
      var s, d;
      return ((d = (s = t == null ? void 0 : t.value) === null || s === void 0 ? void 0 : s.DataTable) === null || d === void 0 ? void 0 : d.renderSorter) || e.column.renderSorter;
    });
    return {
      mergedClsPrefix: o,
      active: i,
      mergedSortOrder: a,
      mergedRenderSorter: l
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
    return e ? Ui(JF, {
      render: e,
      order: t
    }) : Ui("span", {
      class: [`${n}-data-table-sorter`, t === "ascend" && `${n}-data-table-sorter--asc`, t === "descend" && `${n}-data-table-sorter--desc`]
    }, o ? o({
      order: t
    }) : Ui(Ct, {
      clsPrefix: n
    }, {
      default: () => Ui(bk, null)
    }));
  }
}), Rd = "n-dropdown-menu", Ma = "n-dropdown", gf = "n-dropdown-option", nE = window.Vue.defineComponent, oE = window.Vue.h, Sv = nE({
  name: "DropdownDivider",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  render() {
    return oE("div", {
      class: `${this.clsPrefix}-dropdown-divider`
    });
  }
}), rE = window.Vue.defineComponent, Er = window.Vue.h, bf = window.Vue.inject, iE = rE({
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
    } = bf(Rd), {
      renderLabelRef: n,
      labelFieldRef: o,
      nodePropsRef: r,
      renderOptionRef: i
    } = bf(Ma);
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
      renderOption: a
    } = this, {
      rawNode: l
    } = this.tmNode, s = Er("div", Object.assign({
      class: `${t}-dropdown-option`
    }, r == null ? void 0 : r(l)), Er("div", {
      class: `${t}-dropdown-option-body ${t}-dropdown-option-body--group`
    }, Er("div", {
      "data-dropdown-option": !0,
      class: [`${t}-dropdown-option-body__prefix`, o && `${t}-dropdown-option-body__prefix--show-icon`]
    }, $n(l.icon)), Er("div", {
      class: `${t}-dropdown-option-body__label`,
      "data-dropdown-option": !0
    }, i ? i(l) : $n((e = l.title) !== null && e !== void 0 ? e : l[this.labelField])), Er("div", {
      class: [`${t}-dropdown-option-body__suffix`, n && `${t}-dropdown-option-body__suffix--has-submenu`],
      "data-dropdown-option": !0
    })));
    return a ? a({
      node: s,
      option: l
    }) : s;
  }
});
function aE(e) {
  const {
    textColorBase: t,
    opacity1: n,
    opacity2: o,
    opacity3: r,
    opacity4: i,
    opacity5: a
  } = e;
  return {
    color: t,
    opacity1Depth: n,
    opacity2Depth: o,
    opacity3Depth: r,
    opacity4Depth: i,
    opacity5Depth: a
  };
}
const lE = {
  common: vt,
  self: aE
}, sE = V("icon", `
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
`, [X("color-transition", {
  transition: "color .3s var(--n-bezier)"
}), X("depth", {
  color: "var(--n-color)"
}, [W("svg", {
  opacity: "var(--n-opacity)",
  transition: "opacity .3s var(--n-bezier)"
})]), W("svg", {
  height: "1em",
  width: "1em"
})]), Vl = window.Vue.computed, dE = window.Vue.defineComponent, wf = window.Vue.h, cE = window.Vue.mergeProps, uE = Object.assign(Object.assign({}, _e.props), {
  depth: [String, Number],
  size: [Number, String],
  color: String,
  component: [Object, Function]
}), fE = dE({
  _n_icon__: !0,
  name: "Icon",
  inheritAttrs: !1,
  props: uE,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = qe(e), o = _e("Icon", "-icon", sE, lE, e, t), r = Vl(() => {
      const {
        depth: a
      } = e, {
        common: {
          cubicBezierEaseInOut: l
        },
        self: s
      } = o.value;
      if (a !== void 0) {
        const {
          color: d,
          [`opacity${a}Depth`]: c
        } = s;
        return {
          "--n-bezier": l,
          "--n-color": d,
          "--n-opacity": c
        };
      }
      return {
        "--n-bezier": l,
        "--n-color": "",
        "--n-opacity": ""
      };
    }), i = n ? wt("icon", Vl(() => `${e.depth || "d"}`), r, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedStyle: Vl(() => {
        const {
          size: a,
          color: l
        } = e;
        return {
          fontSize: St(a),
          color: l
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
      themeClass: a
    } = this;
    return !((e = t == null ? void 0 : t.$options) === null || e === void 0) && e._n_icon__ && so("icon", "don't wrap `n-icon` inside `n-icon`"), i == null || i(), wf("i", cE(this.$attrs, {
      role: "img",
      class: [`${o}-icon`, a, {
        [`${o}-icon--depth`]: n,
        [`${o}-icon--color-transition`]: n !== void 0
      }],
      style: [this.cssVars, this.mergedStyle]
    }), r ? wf(r) : this.$slots);
  }
});
function Es(e, t) {
  return e.type === "submenu" || e.type === void 0 && e[t] !== void 0;
}
function hE(e) {
  return e.type === "group";
}
function $v(e) {
  return e.type === "divider";
}
function pE(e) {
  return e.type === "render";
}
const wo = window.Vue.computed, vE = window.Vue.defineComponent, Kt = window.Vue.h, Ki = window.Vue.inject, mE = window.Vue.mergeProps, gE = window.Vue.provide, bE = window.Vue.ref, wE = window.Vue.Transition, kv = vE({
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
    const t = Ki(Ma), {
      hoverKeyRef: n,
      keyboardKeyRef: o,
      lastToggledSubmenuKeyRef: r,
      pendingKeyPathRef: i,
      activeKeyPathRef: a,
      animatedRef: l,
      mergedShowRef: s,
      renderLabelRef: d,
      renderIconRef: c,
      labelFieldRef: h,
      childrenFieldRef: p,
      renderOptionRef: v,
      nodePropsRef: f,
      menuPropsRef: m
    } = t, g = Ki(gf, null), u = Ki(Rd), b = Ki(_a), x = wo(() => e.tmNode.rawNode), w = wo(() => {
      const {
        value: L
      } = p;
      return Es(e.tmNode.rawNode, L);
    }), C = wo(() => {
      const {
        disabled: L
      } = e.tmNode;
      return L;
    }), S = wo(() => {
      if (!w.value) return !1;
      const {
        key: L,
        disabled: Z
      } = e.tmNode;
      if (Z) return !1;
      const {
        value: te
      } = n, {
        value: q
      } = o, {
        value: A
      } = r, {
        value: F
      } = i;
      return te !== null ? F.includes(L) : q !== null ? F.includes(L) && F[F.length - 1] !== L : A !== null ? F.includes(L) : !1;
    }), y = wo(() => o.value === null && !l.value), T = Mw(S, 300, y), k = wo(() => !!(g != null && g.enteringSubmenuRef.value)), E = bE(!1);
    gE(gf, {
      enteringSubmenuRef: E
    });
    function U() {
      E.value = !0;
    }
    function _() {
      E.value = !1;
    }
    function M() {
      const {
        parentKey: L,
        tmNode: Z
      } = e;
      Z.disabled || s.value && (r.value = L, o.value = null, n.value = Z.key);
    }
    function I() {
      const {
        tmNode: L
      } = e;
      L.disabled || s.value && n.value !== L.key && M();
    }
    function z(L) {
      if (e.tmNode.disabled || !s.value) return;
      const {
        relatedTarget: Z
      } = L;
      Z && !an({
        target: Z
      }, "dropdownOption") && !an({
        target: Z
      }, "scrollbarRail") && (n.value = null);
    }
    function G() {
      const {
        value: L
      } = w, {
        tmNode: Z
      } = e;
      s.value && !L && !Z.disabled && (t.doSelect(Z.key, Z.rawNode), t.doUpdateShow(!1));
    }
    return {
      labelField: h,
      renderLabel: d,
      renderIcon: c,
      siblingHasIcon: u.showIconRef,
      siblingHasSubmenu: u.hasSubmenuRef,
      menuProps: m,
      popoverBody: b,
      animated: l,
      mergedShowSubmenu: wo(() => T.value && !k.value),
      rawNode: x,
      hasSubmenu: w,
      pending: ze(() => {
        const {
          value: L
        } = i, {
          key: Z
        } = e.tmNode;
        return L.includes(Z);
      }),
      childActive: ze(() => {
        const {
          value: L
        } = a, {
          key: Z
        } = e.tmNode, te = L.findIndex((q) => Z === q);
        return te === -1 ? !1 : te < L.length - 1;
      }),
      active: ze(() => {
        const {
          value: L
        } = a, {
          key: Z
        } = e.tmNode, te = L.findIndex((q) => Z === q);
        return te === -1 ? !1 : te === L.length - 1;
      }),
      mergedDisabled: C,
      renderOption: v,
      nodeProps: f,
      handleClick: G,
      handleMouseMove: I,
      handleMouseEnter: M,
      handleMouseLeave: z,
      handleSubmenuBeforeEnter: U,
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
      siblingHasIcon: a,
      siblingHasSubmenu: l,
      renderLabel: s,
      renderIcon: d,
      renderOption: c,
      nodeProps: h,
      props: p,
      scrollable: v
    } = this;
    let f = null;
    if (r) {
      const b = (e = this.menuProps) === null || e === void 0 ? void 0 : e.call(this, o, o.children);
      f = Kt(Rv, Object.assign({}, b, {
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
    }, g), Kt("div", mE(m, p), [Kt("div", {
      class: [`${i}-dropdown-option-body__prefix`, a && `${i}-dropdown-option-body__prefix--show-icon`]
    }, [d ? d(o) : $n(o.icon)]), Kt("div", {
      "data-dropdown-option": !0,
      class: `${i}-dropdown-option-body__label`
    }, s ? s(o) : $n((t = o[this.labelField]) !== null && t !== void 0 ? t : o.title)), Kt("div", {
      "data-dropdown-option": !0,
      class: [`${i}-dropdown-option-body__suffix`, l && `${i}-dropdown-option-body__suffix--has-submenu`]
    }, this.hasSubmenu ? Kt(fE, null, {
      default: () => Kt(jp, null)
    }) : null)]), this.hasSubmenu ? Kt(Zs, null, {
      default: () => [Kt(Js, null, {
        default: () => Kt("div", {
          class: `${i}-dropdown-offset-container`
        }, Kt(ed, {
          show: this.mergedShowSubmenu,
          placement: this.placement,
          to: v && this.popoverBody || void 0,
          teleportDisabled: !v
        }, {
          default: () => Kt("div", {
            class: `${i}-dropdown-menu-wrapper`
          }, n ? Kt(wE, {
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
}), yE = window.Vue.defineComponent, xE = window.Vue.Fragment, qi = window.Vue.h, CE = yE({
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
    return qi(xE, null, qi(iE, {
      clsPrefix: n,
      tmNode: e,
      key: e.key
    }), o == null ? void 0 : o.map((r) => {
      const {
        rawNode: i
      } = r;
      return i.show === !1 ? null : $v(i) ? qi(Sv, {
        clsPrefix: n,
        key: r.key
      }) : r.isGroup ? (so("dropdown", "`group` node is not allowed to be put in `group` node."), null) : qi(kv, {
        clsPrefix: n,
        tmNode: r,
        parentKey: t,
        key: r.key
      });
    }));
  }
}), SE = window.Vue.defineComponent, $E = window.Vue.h, kE = SE({
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
    return $E("div", t, [e == null ? void 0 : e()]);
  }
}), yf = window.Vue.computed, RE = window.Vue.defineComponent, Go = window.Vue.h, PE = window.Vue.inject, Gi = window.Vue.provide, _E = window.Vue.ref, Rv = RE({
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
    } = PE(Ma);
    Gi(Rd, {
      showIconRef: yf(() => {
        const r = t.value;
        return e.tmNodes.some((i) => {
          var a;
          if (i.isGroup)
            return (a = i.children) === null || a === void 0 ? void 0 : a.some(({
              rawNode: s
            }) => r ? r(s) : s.icon);
          const {
            rawNode: l
          } = i;
          return r ? r(l) : l.icon;
        });
      }),
      hasSubmenuRef: yf(() => {
        const {
          value: r
        } = n;
        return e.tmNodes.some((i) => {
          var a;
          if (i.isGroup)
            return (a = i.children) === null || a === void 0 ? void 0 : a.some(({
              rawNode: s
            }) => Es(s, r));
          const {
            rawNode: l
          } = i;
          return Es(l, r);
        });
      })
    });
    const o = _E(null);
    return Gi(Ys, null), Gi(Xs, null), Gi(_a, o), {
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
      return i.show === !1 ? null : pE(i) ? Go(kE, {
        tmNode: r,
        key: r.key
      }) : $v(i) ? Go(Sv, {
        clsPrefix: t,
        key: r.key
      }) : hE(i) ? Go(CE, {
        clsPrefix: t,
        tmNode: r,
        parentKey: e,
        key: r.key
      }) : Go(kv, {
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
    }, n ? Go(Kp, {
      contentClass: `${t}-dropdown-menu__content`
    }, {
      default: () => o
    }) : o, this.showArrow ? Jp({
      clsPrefix: t,
      arrowStyle: this.arrowStyle,
      arrowClass: void 0,
      arrowWrapperClass: void 0,
      arrowWrapperStyle: void 0
    }) : null);
  }
}), TE = V("dropdown-menu", `
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`, [za(), V("dropdown-option", `
 position: relative;
 `, [W("a", `
 text-decoration: none;
 color: inherit;
 outline: none;
 `, [W("&::before", `
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]), V("dropdown-option-body", `
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `, [W("&::before", `
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `), Qe("disabled", [X("pending", `
 color: var(--n-option-text-color-hover);
 `, [D("prefix, suffix", `
 color: var(--n-option-text-color-hover);
 `), W("&::before", "background-color: var(--n-option-color-hover);")]), X("active", `
 color: var(--n-option-text-color-active);
 `, [D("prefix, suffix", `
 color: var(--n-option-text-color-active);
 `), W("&::before", "background-color: var(--n-option-color-active);")]), X("child-active", `
 color: var(--n-option-text-color-child-active);
 `, [D("prefix, suffix", `
 color: var(--n-option-text-color-child-active);
 `)])]), X("disabled", `
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `), X("group", `
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `, [D("prefix", `
 width: calc(var(--n-option-prefix-width) / 2);
 `, [X("show-icon", `
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]), D("prefix", `
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `, [X("show-icon", `
 width: var(--n-option-icon-prefix-width);
 `), V("icon", `
 font-size: var(--n-option-icon-size);
 `)]), D("label", `
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `), D("suffix", `
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
 `, [X("has-submenu", `
 width: var(--n-option-icon-suffix-width);
 `), V("icon", `
 font-size: var(--n-option-icon-size);
 `)]), V("dropdown-menu", "pointer-events: all;")]), V("dropdown-offset-container", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]), V("dropdown-divider", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `), V("dropdown-menu-wrapper", `
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `), W(">", [V("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), Qe("scrollable", `
 padding: var(--n-padding);
 `), X("scrollable", [D("content", `
 padding: var(--n-padding);
 `)])]), yo = window.Vue.computed, FE = window.Vue.defineComponent, xf = window.Vue.h, EE = window.Vue.mergeProps, OE = window.Vue.provide, Xi = window.Vue.ref, Ln = window.Vue.toRef, zE = window.Vue.watch, ME = {
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
}, IE = Object.keys(ir), AE = Object.assign(Object.assign(Object.assign({}, ir), ME), _e.props), VE = FE({
  name: "Dropdown",
  inheritAttrs: !1,
  props: AE,
  setup(e) {
    const t = Xi(!1), n = Ot(Ln(e, "show"), t), o = yo(() => {
      const {
        keyField: _,
        childrenField: M
      } = e;
      return Oa(e.options, {
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
    }), r = yo(() => o.value.treeNodes), i = Xi(null), a = Xi(null), l = Xi(null), s = yo(() => {
      var _, M, I;
      return (I = (M = (_ = i.value) !== null && _ !== void 0 ? _ : a.value) !== null && M !== void 0 ? M : l.value) !== null && I !== void 0 ? I : null;
    }), d = yo(() => o.value.getPath(s.value).keyPath), c = yo(() => o.value.getPath(e.value).keyPath), h = ze(() => e.keyboard && n.value);
    Sw({
      keydown: {
        ArrowUp: {
          prevent: !0,
          handler: C
        },
        ArrowRight: {
          prevent: !0,
          handler: w
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
        Escape: b
      }
    }, h);
    const {
      mergedClsPrefixRef: p,
      inlineThemeDisabled: v
    } = qe(e), f = _e("Dropdown", "-dropdown", TE, uv, e, p);
    OE(Ma, {
      labelFieldRef: Ln(e, "labelField"),
      childrenFieldRef: Ln(e, "childrenField"),
      renderLabelRef: Ln(e, "renderLabel"),
      renderIconRef: Ln(e, "renderIcon"),
      hoverKeyRef: i,
      keyboardKeyRef: a,
      lastToggledSubmenuKeyRef: l,
      pendingKeyPathRef: d,
      activeKeyPathRef: c,
      animatedRef: Ln(e, "animated"),
      mergedShowRef: n,
      nodePropsRef: Ln(e, "nodeProps"),
      renderOptionRef: Ln(e, "renderOption"),
      menuPropsRef: Ln(e, "menuProps"),
      doSelect: m,
      doUpdateShow: g
    }), zE(n, (_) => {
      !e.animated && !_ && u();
    });
    function m(_, M) {
      const {
        onSelect: I
      } = e;
      I && le(I, _, M);
    }
    function g(_) {
      const {
        "onUpdate:show": M,
        onUpdateShow: I
      } = e;
      M && le(M, _), I && le(I, _), t.value = _;
    }
    function u() {
      i.value = null, a.value = null, l.value = null;
    }
    function b() {
      g(!1);
    }
    function x() {
      k("left");
    }
    function w() {
      k("right");
    }
    function C() {
      k("up");
    }
    function S() {
      k("down");
    }
    function y() {
      const _ = T();
      _ != null && _.isLeaf && n.value && (m(_.key, _.rawNode), g(!1));
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
    function k(_) {
      const {
        value: M
      } = s, {
        value: {
          getFirstAvailableNode: I
        }
      } = o;
      let z = null;
      if (M === null) {
        const G = I();
        G !== null && (z = G.key);
      } else {
        const G = T();
        if (G) {
          let L;
          switch (_) {
            case "down":
              L = G.getNext();
              break;
            case "up":
              L = G.getPrev();
              break;
            case "right":
              L = G.getChild();
              break;
            case "left":
              L = G.getParent();
              break;
          }
          L && (z = L.key);
        }
      }
      z !== null && (i.value = null, a.value = z);
    }
    const E = yo(() => {
      const {
        size: _,
        inverted: M
      } = e, {
        common: {
          cubicBezierEaseInOut: I
        },
        self: z
      } = f.value, {
        padding: G,
        dividerColor: L,
        borderRadius: Z,
        optionOpacityDisabled: te,
        [ae("optionIconSuffixWidth", _)]: q,
        [ae("optionSuffixWidth", _)]: A,
        [ae("optionIconPrefixWidth", _)]: F,
        [ae("optionPrefixWidth", _)]: j,
        [ae("fontSize", _)]: J,
        [ae("optionHeight", _)]: Q,
        [ae("optionIconSize", _)]: ee
      } = z, de = {
        "--n-bezier": I,
        "--n-font-size": J,
        "--n-padding": G,
        "--n-border-radius": Z,
        "--n-option-height": Q,
        "--n-option-prefix-width": j,
        "--n-option-icon-prefix-width": F,
        "--n-option-suffix-width": A,
        "--n-option-icon-suffix-width": q,
        "--n-option-icon-size": ee,
        "--n-divider-color": L,
        "--n-option-opacity-disabled": te
      };
      return M ? (de["--n-color"] = z.colorInverted, de["--n-option-color-hover"] = z.optionColorHoverInverted, de["--n-option-color-active"] = z.optionColorActiveInverted, de["--n-option-text-color"] = z.optionTextColorInverted, de["--n-option-text-color-hover"] = z.optionTextColorHoverInverted, de["--n-option-text-color-active"] = z.optionTextColorActiveInverted, de["--n-option-text-color-child-active"] = z.optionTextColorChildActiveInverted, de["--n-prefix-color"] = z.prefixColorInverted, de["--n-suffix-color"] = z.suffixColorInverted, de["--n-group-header-text-color"] = z.groupHeaderTextColorInverted) : (de["--n-color"] = z.color, de["--n-option-color-hover"] = z.optionColorHover, de["--n-option-color-active"] = z.optionColorActive, de["--n-option-text-color"] = z.optionTextColor, de["--n-option-text-color-hover"] = z.optionTextColorHover, de["--n-option-text-color-active"] = z.optionTextColorActive, de["--n-option-text-color-child-active"] = z.optionTextColorChildActive, de["--n-prefix-color"] = z.prefixColor, de["--n-suffix-color"] = z.suffixColor, de["--n-group-header-text-color"] = z.groupHeaderTextColor), de;
    }), U = v ? wt("dropdown", yo(() => `${e.size[0]}${e.inverted ? "i" : ""}`), E, e) : void 0;
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
      themeClass: U == null ? void 0 : U.themeClass,
      onRender: U == null ? void 0 : U.onRender
    };
  },
  render() {
    const e = (o, r, i, a, l) => {
      var s;
      const {
        mergedClsPrefix: d,
        menuProps: c
      } = this;
      (s = this.onRender) === null || s === void 0 || s.call(this);
      const h = (c == null ? void 0 : c(void 0, this.tmNodes.map((v) => v.rawNode))) || {}, p = {
        ref: ap(r),
        class: [o, `${d}-dropdown`, this.themeClass],
        clsPrefix: d,
        tmNodes: this.tmNodes,
        style: [...i, this.cssVars],
        showArrow: this.showArrow,
        arrowStyle: this.arrowStyle,
        scrollable: this.scrollable,
        onMouseenter: a,
        onMouseleave: l
      };
      return xf(Rv, EE(this.$attrs, p, h));
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
    return xf(ci, Object.assign({}, ei(this.$props, IE), n), {
      trigger: () => {
        var o, r;
        return (r = (o = this.$slots).default) === null || r === void 0 ? void 0 : r.call(o);
      }
    });
  }
}), Cf = window.Vue.computed, BE = window.Vue.defineComponent, Bl = window.Vue.h, LE = window.Vue.inject, Pv = "_n_all__", _v = "_n_none__";
function DE(e, t, n, o) {
  return e ? (r) => {
    for (const i of e)
      switch (r) {
        case Pv:
          n(!0);
          return;
        case _v:
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
function NE(e, t) {
  return e ? e.map((n) => {
    switch (n) {
      case "all":
        return {
          label: t.checkTableAll,
          key: Pv
        };
      case "none":
        return {
          label: t.uncheckTableAll,
          key: _v
        };
      default:
        return n;
    }
  }) : [];
}
const HE = BE({
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
      doUncheckAll: a
    } = LE(mn), l = Cf(() => DE(o.value, r, i, a)), s = Cf(() => NE(o.value, n.value));
    return () => {
      var d, c, h, p;
      const {
        clsPrefix: v
      } = e;
      return Bl(VE, {
        theme: (c = (d = t.theme) === null || d === void 0 ? void 0 : d.peers) === null || c === void 0 ? void 0 : c.Dropdown,
        themeOverrides: (p = (h = t.themeOverrides) === null || h === void 0 ? void 0 : h.peers) === null || p === void 0 ? void 0 : p.Dropdown,
        options: s.value,
        onSelect: l.value
      }, {
        default: () => Bl(Ct, {
          clsPrefix: v,
          class: `${v}-data-table-check-extra`
        }, {
          default: () => Bl(Hp, null)
        })
      });
    };
  }
}), Tv = window.Vue.defineComponent, Sf = window.Vue.Fragment, st = window.Vue.h, jE = window.Vue.inject, $f = window.Vue.ref;
function Ll(e) {
  return typeof e.title == "function" ? e.title(e) : e.title;
}
const WE = Tv({
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
}), Fv = Tv({
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
      someRowsCheckedRef: a,
      rowsRef: l,
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
      doUpdateResizableWidth: b,
      handleTableHeaderScroll: x,
      deriveNextSorter: w,
      doUncheckAll: C,
      doCheckAll: S
    } = jE(mn), y = $f(), T = $f({});
    function k(z) {
      const G = T.value[z];
      return G == null ? void 0 : G.getBoundingClientRect().width;
    }
    function E() {
      i.value ? C() : S();
    }
    function U(z, G) {
      if (an(z, "dataTableFilter") || an(z, "dataTableResizable") || !zl(G)) return;
      const L = h.value.find((te) => te.columnKey === G.key) || null, Z = XT(G, L);
      w(Z);
    }
    const _ = /* @__PURE__ */ new Map();
    function M(z) {
      _.set(z.key, k(z.key));
    }
    function I(z, G) {
      const L = _.get(z.key);
      if (L === void 0)
        return;
      const Z = L + G, te = KT(Z, z.minWidth, z.maxWidth);
      u(Z, te, z, k), b(z, te);
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
      someRowsChecked: a,
      rows: l,
      cols: s,
      mergedTheme: d,
      checkOptions: c,
      mergedTableLayout: v,
      headerCheckboxDisabled: f,
      headerHeight: g,
      virtualScrollHeader: m,
      virtualListRef: y,
      handleCheckboxUpdateChecked: E,
      handleColHeaderClick: U,
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
      someRowsChecked: a,
      rows: l,
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
      handleCheckboxUpdateChecked: b,
      handleColumnResizeStart: x,
      handleColumnResize: w
    } = this, C = (k, E, U) => k.map(({
      column: _,
      colIndex: M,
      colSpan: I,
      rowSpan: z,
      isLast: G
    }) => {
      var L, Z;
      const te = fn(_), {
        ellipsis: q
      } = _, A = () => _.type === "selection" ? _.multiple !== !1 ? st(Sf, null, st(xd, {
        key: r,
        privateInsideTable: !0,
        checked: i,
        indeterminate: a,
        disabled: f,
        onUpdateChecked: b
      }), c ? st(HE, {
        clsPrefix: t
      }) : null) : null : st(Sf, null, st("div", {
        class: `${t}-data-table-th__title-wrapper`
      }, st("div", {
        class: `${t}-data-table-th__title`
      }, q === !0 || q && !q.tooltip ? st("div", {
        class: `${t}-data-table-th__ellipsis`
      }, Ll(_)) : q && typeof q == "object" ? st(kd, Object.assign({}, q, {
        theme: d.peers.Ellipsis,
        themeOverrides: d.peerOverrides.Ellipsis
      }), {
        default: () => Ll(_)
      }) : Ll(_)), zl(_) ? st(tE, {
        column: _
      }) : null), lf(_) ? st(WF, {
        column: _,
        options: _.filterOptions
      }) : null, mv(_) ? st(YF, {
        onResizeStart: () => {
          x(_);
        },
        onResize: (Q) => {
          w(_, Q);
        }
      }) : null), F = te in n, j = te in o, J = E && !_.fixed ? "div" : "th";
      return st(J, {
        ref: (Q) => e[te] = Q,
        key: te,
        style: [E && !_.fixed ? {
          position: "absolute",
          left: it(E(M)),
          top: 0,
          bottom: 0
        } : {
          left: it((L = n[te]) === null || L === void 0 ? void 0 : L.start),
          right: it((Z = o[te]) === null || Z === void 0 ? void 0 : Z.start)
        }, {
          width: it(_.width),
          textAlign: _.titleAlign || _.align,
          height: U
        }],
        colspan: I,
        rowspan: z,
        "data-col-key": te,
        class: [`${t}-data-table-th`, (F || j) && `${t}-data-table-th--fixed-${F ? "left" : "right"}`, {
          [`${t}-data-table-th--sorting`]: gv(_, m),
          [`${t}-data-table-th--filterable`]: lf(_),
          [`${t}-data-table-th--sortable`]: zl(_),
          [`${t}-data-table-th--selection`]: _.type === "selection",
          [`${t}-data-table-th--last`]: G
        }, _.className],
        onClick: _.type !== "selection" && _.type !== "expand" && !("children" in _) ? (Q) => {
          u(Q, _);
        } : void 0
      }, A());
    });
    if (g) {
      const {
        headerHeight: k
      } = this;
      let E = 0, U = 0;
      return s.forEach((_) => {
        _.column.fixed === "left" ? E++ : _.column.fixed === "right" && U++;
      }), st(nd, {
        ref: "virtualListRef",
        class: `${t}-data-table-base-table-header`,
        style: {
          height: it(k)
        },
        onScroll: this.handleTableHeaderScroll,
        columns: s,
        itemSize: k,
        showScrollbar: !1,
        items: [{}],
        itemResizable: !1,
        visibleItemsTag: WE,
        visibleItemsProps: {
          clsPrefix: t,
          id: h,
          cols: s,
          width: St(this.scrollX)
        },
        renderItemWithCols: ({
          startColIndex: _,
          endColIndex: M,
          getLeft: I
        }) => {
          const z = s.map((L, Z) => ({
            column: L.column,
            isLast: Z === s.length - 1,
            colIndex: L.index,
            colSpan: 1,
            rowSpan: 1
          })).filter(({
            column: L
          }, Z) => !!(_ <= Z && Z <= M || L.fixed)), G = C(z, I, it(k));
          return G.splice(E, 0, st("th", {
            colspan: s.length - E - U,
            style: {
              pointerEvents: "none",
              visibility: "hidden",
              height: 0
            }
          })), st("tr", {
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
    const S = st("thead", {
      class: `${t}-data-table-thead`,
      "data-n-id": h
    }, l.map((k) => st("tr", {
      class: `${t}-data-table-tr`
    }, C(k, null, void 0))));
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
    }, st("colgroup", null, s.map((k) => st("col", {
      key: k.key,
      style: k.style
    }))), S));
  }
}), kf = window.Vue.computed, Ev = window.Vue.defineComponent, UE = window.Vue.Fragment, tt = window.Vue.h, Rf = window.Vue.inject, KE = window.Vue.onUnmounted, Dl = window.Vue.ref, qE = window.Vue.watchEffect;
function GE(e, t) {
  const n = [];
  function o(r, i) {
    r.forEach((a) => {
      a.children && t.has(a.key) ? (n.push({
        tmNode: a,
        striped: !1,
        key: a.key,
        index: i
      }), o(a.children, i)) : n.push({
        key: a.key,
        tmNode: a,
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
const XE = Ev({
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
}), YE = Ev({
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
      scrollXRef: a,
      colsRef: l,
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
      renderExpandRef: b,
      hoverKeyRef: x,
      summaryRef: w,
      mergedSortStateRef: C,
      virtualScrollRef: S,
      virtualScrollXRef: y,
      heightForRowRef: T,
      minRowHeightRef: k,
      componentId: E,
      mergedTableLayoutRef: U,
      childTriggerColIndexRef: _,
      indentRef: M,
      rowPropsRef: I,
      maxHeightRef: z,
      stripedRef: G,
      loadingRef: L,
      onLoadRef: Z,
      loadingKeySetRef: te,
      expandableRef: q,
      stickyExpandedRowsRef: A,
      renderExpandIconRef: F,
      summaryPlacementRef: j,
      treeMateRef: J,
      scrollbarPropsRef: Q,
      setHeaderScrollLeft: ee,
      doUpdateExpandedRowKeys: de,
      handleTableBodyScroll: pe,
      doCheck: Y,
      doUncheck: se,
      renderCell: $e
    } = Rf(mn), me = Rf(Hn), be = Dl(null), Ce = Dl(null), Be = Dl(null), Me = ze(() => s.value.length === 0), ie = ze(() => e.showHeader || !Me.value), R = ze(() => e.showHeader || Me.value);
    let $ = "";
    const N = kf(() => new Set(o.value));
    function ne(fe) {
      var Re;
      return (Re = J.value.getNode(fe)) === null || Re === void 0 ? void 0 : Re.rawNode;
    }
    function ge(fe, Re, P) {
      const H = ne(fe.key);
      if (!H) {
        so("data-table", `fail to get row data with key ${fe.key}`);
        return;
      }
      if (P) {
        const oe = s.value.findIndex((ce) => ce.key === $);
        if (oe !== -1) {
          const ce = s.value.findIndex((ke) => ke.key === fe.key), ue = Math.min(oe, ce), we = Math.max(oe, ce), ye = [];
          s.value.slice(ue, we + 1).forEach((ke) => {
            ke.disabled || ye.push(ke.key);
          }), Re ? Y(ye, !1, H) : se(ye, H), $ = fe.key;
          return;
        }
      }
      Re ? Y(fe.key, !1, H) : se(fe.key, H), $ = fe.key;
    }
    function he(fe) {
      const Re = ne(fe.key);
      if (!Re) {
        so("data-table", `fail to get row data with key ${fe.key}`);
        return;
      }
      Y(fe.key, !0, Re);
    }
    function O() {
      if (!ie.value) {
        const {
          value: Re
        } = Be;
        return Re || null;
      }
      if (S.value)
        return Te();
      const {
        value: fe
      } = be;
      return fe ? fe.containerRef : null;
    }
    function K(fe, Re) {
      var P;
      if (te.value.has(fe)) return;
      const {
        value: H
      } = o, oe = H.indexOf(fe), ce = Array.from(H);
      ~oe ? (ce.splice(oe, 1), de(ce)) : Re && !Re.isLeaf && !Re.shallowLoaded ? (te.value.add(fe), (P = Z.value) === null || P === void 0 || P.call(Z, Re.rawNode).then(() => {
        const {
          value: ue
        } = o, we = Array.from(ue);
        ~we.indexOf(fe) || we.push(fe), de(we);
      }).finally(() => {
        te.value.delete(fe);
      })) : (ce.push(fe), de(ce));
    }
    function ve() {
      x.value = null;
    }
    function Te() {
      const {
        value: fe
      } = Ce;
      return (fe == null ? void 0 : fe.listElRef) || null;
    }
    function lt() {
      const {
        value: fe
      } = Ce;
      return (fe == null ? void 0 : fe.itemsElRef) || null;
    }
    function pt(fe) {
      var Re;
      pe(fe), (Re = be.value) === null || Re === void 0 || Re.sync();
    }
    function Ye(fe) {
      var Re;
      const {
        onResize: P
      } = e;
      P && P(fe), (Re = be.value) === null || Re === void 0 || Re.sync();
    }
    const Ze = {
      getScrollContainer: O,
      scrollTo(fe, Re) {
        var P, H;
        S.value ? (P = Ce.value) === null || P === void 0 || P.scrollTo(fe, Re) : (H = be.value) === null || H === void 0 || H.scrollTo(fe, Re);
      }
    }, mt = W([({
      props: fe
    }) => {
      const Re = (H) => H === null ? null : W(`[data-n-id="${fe.componentId}"] [data-col-key="${H}"]::after`, {
        boxShadow: "var(--n-box-shadow-after)"
      }), P = (H) => H === null ? null : W(`[data-n-id="${fe.componentId}"] [data-col-key="${H}"]::before`, {
        boxShadow: "var(--n-box-shadow-before)"
      });
      return W([Re(fe.leftActiveFixedColKey), P(fe.rightActiveFixedColKey), fe.leftActiveFixedChildrenColKeys.map((H) => Re(H)), fe.rightActiveFixedChildrenColKeys.map((H) => P(H))]);
    }]);
    let et = !1;
    return qE(() => {
      const {
        value: fe
      } = f, {
        value: Re
      } = m, {
        value: P
      } = g, {
        value: H
      } = u;
      if (!et && fe === null && P === null)
        return;
      const oe = {
        leftActiveFixedColKey: fe,
        leftActiveFixedChildrenColKeys: Re,
        rightActiveFixedColKey: P,
        rightActiveFixedChildrenColKeys: H,
        componentId: E
      };
      mt.mount({
        id: `n-${E}`,
        force: !0,
        props: oe,
        anchorMetaName: rr,
        parent: me == null ? void 0 : me.styleMountTarget
      }), et = !0;
    }), KE(() => {
      mt.unmount({
        id: `n-${E}`,
        parent: me == null ? void 0 : me.styleMountTarget
      });
    }), Object.assign({
      bodyWidth: n,
      summaryPlacement: j,
      dataTableSlots: t,
      componentId: E,
      scrollbarInstRef: be,
      virtualListRef: Ce,
      emptyElRef: Be,
      summary: w,
      mergedClsPrefix: r,
      mergedTheme: i,
      scrollX: a,
      cols: l,
      loading: L,
      bodyShowHeaderOnly: R,
      shouldDisplaySomeTablePart: ie,
      empty: Me,
      paginatedDataAndInfo: kf(() => {
        const {
          value: fe
        } = G;
        let Re = !1;
        return {
          data: s.value.map(fe ? (H, oe) => (H.isLeaf || (Re = !0), {
            tmNode: H,
            key: H.key,
            striped: oe % 2 === 1,
            index: oe
          }) : (H, oe) => (H.isLeaf || (Re = !0), {
            tmNode: H,
            key: H.key,
            striped: !1,
            index: oe
          })),
          hasChildren: Re
        };
      }),
      rawPaginatedData: d,
      fixedColumnLeftMap: c,
      fixedColumnRightMap: h,
      currentPage: p,
      rowClassName: v,
      renderExpand: b,
      mergedExpandedRowKeySet: N,
      hoverKey: x,
      mergedSortState: C,
      virtualScroll: S,
      virtualScrollX: y,
      heightForRow: T,
      minRowHeight: k,
      mergedTableLayout: U,
      childTriggerColIndex: _,
      indent: M,
      rowProps: I,
      maxHeight: z,
      loadingKeySet: te,
      expandable: q,
      stickyExpandedRows: A,
      renderExpandIcon: F,
      scrollbarProps: Q,
      setHeaderScrollLeft: ee,
      handleVirtualListScroll: pt,
      handleVirtualListResize: Ye,
      handleMouseleaveTable: ve,
      virtualListContainer: Te,
      virtualListContent: lt,
      handleTableBodyScroll: pe,
      handleCheckboxUpdateChecked: ge,
      handleRadioUpdateChecked: he,
      handleUpdateExpanded: K,
      renderCell: $e
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
      flexHeight: a,
      loadingKeySet: l,
      onResize: s,
      setHeaderScrollLeft: d
    } = this, c = t !== void 0 || r !== void 0 || a, h = !c && i === "auto", p = t !== void 0 || h, v = {
      minWidth: St(t) || "100%"
    };
    t && (v.width = "100%");
    const f = tt(di, Object.assign({}, this.scrollbarProps, {
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
          paginatedDataAndInfo: b,
          mergedTheme: x,
          fixedColumnLeftMap: w,
          fixedColumnRightMap: C,
          currentPage: S,
          rowClassName: y,
          mergedSortState: T,
          mergedExpandedRowKeySet: k,
          stickyExpandedRows: E,
          componentId: U,
          childTriggerColIndex: _,
          expandable: M,
          rowProps: I,
          handleMouseleaveTable: z,
          renderExpand: G,
          summary: L,
          handleCheckboxUpdateChecked: Z,
          handleRadioUpdateChecked: te,
          handleUpdateExpanded: q,
          heightForRow: A,
          minRowHeight: F,
          virtualScrollX: j
        } = this, {
          length: J
        } = u;
        let Q;
        const {
          data: ee,
          hasChildren: de
        } = b, pe = de ? GE(ee, k) : ee;
        if (L) {
          const $ = L(this.rawPaginatedData);
          if (Array.isArray($)) {
            const N = $.map((ne, ge) => ({
              isSummaryRow: !0,
              key: `__n_summary__${ge}`,
              tmNode: {
                rawNode: ne,
                disabled: !0
              },
              index: -1
            }));
            Q = this.summaryPlacement === "top" ? [...N, ...pe] : [...pe, ...N];
          } else {
            const N = {
              isSummaryRow: !0,
              key: "__n_summary__",
              tmNode: {
                rawNode: $,
                disabled: !0
              },
              index: -1
            };
            Q = this.summaryPlacement === "top" ? [N, ...pe] : [...pe, N];
          }
        } else
          Q = pe;
        const Y = de ? {
          width: it(this.indent)
        } : void 0, se = [];
        Q.forEach(($) => {
          G && k.has($.key) && (!M || M($.tmNode.rawNode)) ? se.push($, {
            isExpandedRow: !0,
            key: `${$.key}-expand`,
            // solve key repeat of the expanded row
            tmNode: $.tmNode,
            index: $.index
          }) : se.push($);
        });
        const {
          length: $e
        } = se, me = {};
        ee.forEach(({
          tmNode: $
        }, N) => {
          me[N] = $.key;
        });
        const be = E ? this.bodyWidth : null, Ce = be === null ? void 0 : `${be}px`, Be = this.virtualScrollX ? "div" : "td";
        let Me = 0, ie = 0;
        j && u.forEach(($) => {
          $.column.fixed === "left" ? Me++ : $.column.fixed === "right" && ie++;
        });
        const R = ({
          // Normal
          rowInfo: $,
          displayedRowIndex: N,
          isVirtual: ne,
          // Virtual X
          isVirtualX: ge,
          startColIndex: he,
          endColIndex: O,
          getLeft: K
        }) => {
          const {
            index: ve
          } = $;
          if ("isExpandedRow" in $) {
            const {
              tmNode: {
                key: ce,
                rawNode: ue
              }
            } = $;
            return tt("tr", {
              class: `${n}-data-table-tr ${n}-data-table-tr--expanded`,
              key: `${ce}__expand`
            }, tt("td", {
              class: [`${n}-data-table-td`, `${n}-data-table-td--last-col`, N + 1 === $e && `${n}-data-table-td--last-row`],
              colspan: J
            }, E ? tt("div", {
              class: `${n}-data-table-expand`,
              style: {
                width: Ce
              }
            }, G(ue, ve)) : G(ue, ve)));
          }
          const Te = "isSummaryRow" in $, lt = !Te && $.striped, {
            tmNode: pt,
            key: Ye
          } = $, {
            rawNode: Ze
          } = pt, mt = k.has(Ye), et = I ? I(Ze, ve) : void 0, fe = typeof y == "string" ? y : GT(Ze, ve, y), Re = ge ? u.filter((ce, ue) => !!(he <= ue && ue <= O || ce.column.fixed)) : u, P = ge ? it((A == null ? void 0 : A(Ze, ve)) || F) : void 0, H = Re.map((ce) => {
            var ue, we, ye, ke, Ae;
            const ot = ce.index;
            if (N in m) {
              const rt = m[N], ct = rt.indexOf(ot);
              if (~ct)
                return rt.splice(ct, 1), null;
            }
            const {
              column: Ne
            } = ce, Pt = fn(ce), {
              rowSpan: Mt,
              colSpan: It
            } = Ne, Nt = Te ? ((ue = $.tmNode.rawNode[Pt]) === null || ue === void 0 ? void 0 : ue.colSpan) || 1 : It ? It(Ze, ve) : 1, Ht = Te ? ((we = $.tmNode.rawNode[Pt]) === null || we === void 0 ? void 0 : we.rowSpan) || 1 : Mt ? Mt(Ze, ve) : 1, Qt = ot + Nt === J, jt = N + Ht === $e, B = Ht > 1;
            if (B && (g[N] = {
              [ot]: []
            }), Nt > 1 || B)
              for (let rt = N; rt < N + Ht; ++rt) {
                B && g[N][ot].push(me[rt]);
                for (let ct = ot; ct < ot + Nt; ++ct)
                  rt === N && ct === ot || (rt in m ? m[rt].push(ct) : m[rt] = [ct]);
              }
            const re = B ? this.hoverKey : null, {
              cellProps: Se
            } = Ne, Oe = Se == null ? void 0 : Se(Ze, ve), He = {
              "--indent-offset": ""
            }, Ve = Ne.fixed ? "td" : Be;
            return tt(Ve, Object.assign({}, Oe, {
              key: Pt,
              style: [{
                textAlign: Ne.align || void 0,
                width: it(Ne.width)
              }, ge && {
                height: P
              }, ge && !Ne.fixed ? {
                position: "absolute",
                left: it(K(ot)),
                top: 0,
                bottom: 0
              } : {
                left: it((ye = w[Pt]) === null || ye === void 0 ? void 0 : ye.start),
                right: it((ke = C[Pt]) === null || ke === void 0 ? void 0 : ke.start)
              }, He, (Oe == null ? void 0 : Oe.style) || ""],
              colspan: Nt,
              rowspan: ne ? void 0 : Ht,
              "data-col-key": Pt,
              class: [`${n}-data-table-td`, Ne.className, Oe == null ? void 0 : Oe.class, Te && `${n}-data-table-td--summary`, re !== null && g[N][ot].includes(re) && `${n}-data-table-td--hover`, gv(Ne, T) && `${n}-data-table-td--sorting`, Ne.fixed && `${n}-data-table-td--fixed-${Ne.fixed}`, Ne.align && `${n}-data-table-td--${Ne.align}-align`, Ne.type === "selection" && `${n}-data-table-td--selection`, Ne.type === "expand" && `${n}-data-table-td--expand`, Qt && `${n}-data-table-td--last-col`, jt && `${n}-data-table-td--last-row`]
            }), de && ot === _ ? [Nb(He["--indent-offset"] = Te ? 0 : $.tmNode.level, tt("div", {
              class: `${n}-data-table-indent`,
              style: Y
            })), Te || $.tmNode.isLeaf ? tt("div", {
              class: `${n}-data-table-expand-placeholder`
            }) : tt(vf, {
              class: `${n}-data-table-expand-trigger`,
              clsPrefix: n,
              expanded: mt,
              rowData: Ze,
              renderExpandIcon: this.renderExpandIcon,
              loading: l.has($.key),
              onClick: () => {
                q(Ye, $.tmNode);
              }
            })] : null, Ne.type === "selection" ? Te ? null : Ne.multiple === !1 ? tt(bF, {
              key: S,
              rowKey: Ye,
              disabled: $.tmNode.disabled,
              onUpdateChecked: () => {
                te($.tmNode);
              }
            }) : tt(tF, {
              key: S,
              rowKey: Ye,
              disabled: $.tmNode.disabled,
              onUpdateChecked: (rt, ct) => {
                Z($.tmNode, rt, ct.shiftKey);
              }
            }) : Ne.type === "expand" ? Te ? null : !Ne.expandable || !((Ae = Ne.expandable) === null || Ae === void 0) && Ae.call(Ne, Ze) ? tt(vf, {
              clsPrefix: n,
              rowData: Ze,
              expanded: mt,
              renderExpandIcon: this.renderExpandIcon,
              onClick: () => {
                q(Ye, null);
              }
            }) : null : tt(OF, {
              clsPrefix: n,
              index: ve,
              row: Ze,
              column: Ne,
              isSummary: Te,
              mergedTheme: x,
              renderCell: this.renderCell
            }));
          });
          return ge && Me && ie && H.splice(Me, 0, tt("td", {
            colspan: u.length - Me - ie,
            style: {
              pointerEvents: "none",
              visibility: "hidden",
              height: 0
            }
          })), tt("tr", Object.assign({}, et, {
            onMouseenter: (ce) => {
              var ue;
              this.hoverKey = Ye, (ue = et == null ? void 0 : et.onMouseenter) === null || ue === void 0 || ue.call(et, ce);
            },
            key: Ye,
            class: [`${n}-data-table-tr`, Te && `${n}-data-table-tr--summary`, lt && `${n}-data-table-tr--striped`, mt && `${n}-data-table-tr--expanded`, fe, et == null ? void 0 : et.class],
            style: [et == null ? void 0 : et.style, ge && {
              height: P
            }]
          }), H);
        };
        return o ? tt(nd, {
          ref: "virtualListRef",
          items: se,
          itemSize: this.minRowHeight,
          visibleItemsTag: XE,
          visibleItemsProps: {
            clsPrefix: n,
            id: U,
            cols: u,
            onMouseleave: z
          },
          showScrollbar: !1,
          onResize: this.handleVirtualListResize,
          onScroll: this.handleVirtualListScroll,
          itemsStyle: v,
          itemResizable: !j,
          columns: u,
          renderItemWithCols: j ? ({
            itemIndex: $,
            item: N,
            startColIndex: ne,
            endColIndex: ge,
            getLeft: he
          }) => R({
            displayedRowIndex: $,
            isVirtual: !0,
            isVirtualX: !0,
            rowInfo: N,
            startColIndex: ne,
            endColIndex: ge,
            getLeft: he
          }) : void 0
        }, {
          default: ({
            item: $,
            index: N,
            renderedItemWithCols: ne
          }) => ne || R({
            rowInfo: $,
            displayedRowIndex: N,
            isVirtual: !0,
            isVirtualX: !1,
            startColIndex: 0,
            endColIndex: 0,
            getLeft(ge) {
              return 0;
            }
          })
        }) : tt("table", {
          class: `${n}-data-table-table`,
          onMouseleave: z,
          style: {
            tableLayout: this.mergedTableLayout
          }
        }, tt("colgroup", null, u.map(($) => tt("col", {
          key: $.key,
          style: $.style
        }))), this.showHeader ? tt(Fv, {
          discrete: !1
        }) : null, this.empty ? null : tt("tbody", {
          "data-n-id": U,
          class: `${n}-data-table-tbody`
        }, se.map(($, N) => R({
          rowInfo: $,
          displayedRowIndex: N,
          isVirtual: !1,
          isVirtualX: !1,
          startColIndex: -1,
          endColIndex: -1,
          getLeft(ne) {
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
      }, vn(this.dataTableSlots.empty, () => [tt(Xp, {
        theme: this.mergedTheme.peers.Empty,
        themeOverrides: this.mergedTheme.peerOverrides.Empty
      })]));
      return this.shouldDisplaySomeTablePart ? tt(UE, null, f, m()) : tt(To, {
        onResize: this.onResize
      }, {
        default: m
      });
    }
    return f;
  }
}), ZE = window.Vue.computed, JE = window.Vue.defineComponent, Nl = window.Vue.h, QE = window.Vue.inject, Yi = window.Vue.ref, e2 = window.Vue.watchEffect, t2 = JE({
  name: "MainTable",
  setup() {
    const {
      mergedClsPrefixRef: e,
      rightFixedColumnsRef: t,
      leftFixedColumnsRef: n,
      bodyWidthRef: o,
      maxHeightRef: r,
      minHeightRef: i,
      flexHeightRef: a,
      virtualScrollHeaderRef: l,
      syncScrollState: s
    } = QE(mn), d = Yi(null), c = Yi(null), h = Yi(null), p = Yi(!(n.value.length || t.value.length)), v = ZE(() => ({
      maxHeight: St(r.value),
      minHeight: St(i.value)
    }));
    function f(b) {
      o.value = b.contentRect.width, s(), p.value || (p.value = !0);
    }
    function m() {
      var b;
      const {
        value: x
      } = d;
      return x ? l.value ? ((b = x.virtualListRef) === null || b === void 0 ? void 0 : b.listElRef) || null : x.$el : null;
    }
    function g() {
      const {
        value: b
      } = c;
      return b ? b.getScrollContainer() : null;
    }
    const u = {
      getBodyElement: g,
      getHeaderElement: m,
      scrollTo(b, x) {
        var w;
        (w = c.value) === null || w === void 0 || w.scrollTo(b, x);
      }
    };
    return e2(() => {
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
      flexHeight: a,
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
    }, o ? null : Nl(Fv, {
      ref: "headerInstRef"
    }), Nl(YE, {
      ref: "bodyInstRef",
      bodyStyle: this.bodyStyle,
      showHeader: o,
      flexHeight: n,
      onResize: this.handleBodyResize
    }));
  }
}), Pf = o2(), n2 = W([V("data-table", `
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
 `, [V("data-table-wrapper", `
 flex-grow: 1;
 display: flex;
 flex-direction: column;
 `), X("flex-height", [W(">", [V("data-table-wrapper", [W(">", [V("data-table-base-table", `
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 `, [W(">", [V("data-table-base-table-body", "flex-basis: 0;", [
  // last-child means there is no empty icon
  // body is a scrollbar, we need to override height 100%
  W("&:last-child", "flex-grow: 1;")
])])])])])])]), W(">", [V("data-table-loading-wrapper", `
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
})])]), V("data-table-expand-placeholder", `
 margin-right: 8px;
 display: inline-block;
 width: 16px;
 height: 1px;
 `), V("data-table-indent", `
 display: inline-block;
 height: 1px;
 `), V("data-table-expand-trigger", `
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
 `, [X("expanded", [V("icon", "transform: rotate(90deg);", [rn({
  originalTransform: "rotate(90deg)"
})]), V("base-icon", "transform: rotate(90deg);", [rn({
  originalTransform: "rotate(90deg)"
})])]), V("base-loading", `
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [rn()]), V("icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [rn()]), V("base-icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [rn()])]), V("data-table-thead", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-merged-th-color);
 `), V("data-table-tr", `
 position: relative;
 box-sizing: border-box;
 background-clip: padding-box;
 transition: background-color .3s var(--n-bezier);
 `, [V("data-table-expand", `
 position: sticky;
 left: 0;
 overflow: hidden;
 margin: calc(var(--n-th-padding) * -1);
 padding: var(--n-th-padding);
 box-sizing: border-box;
 `), X("striped", "background-color: var(--n-merged-td-color-striped);", [V("data-table-td", "background-color: var(--n-merged-td-color-striped);")]), Qe("summary", [W("&:hover", "background-color: var(--n-merged-td-color-hover);", [W(">", [V("data-table-td", "background-color: var(--n-merged-td-color-hover);")])])])]), V("data-table-th", `
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
 `, [X("filterable", `
 padding-right: 36px;
 `, [X("sortable", `
 padding-right: calc(var(--n-th-padding) + 36px);
 `)]), Pf, X("selection", `
 padding: 0;
 text-align: center;
 line-height: 0;
 z-index: 3;
 `), D("title-wrapper", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 max-width: 100%;
 `, [D("title", `
 flex: 1;
 min-width: 0;
 `)]), D("ellipsis", `
 display: inline-block;
 vertical-align: bottom;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 `), X("hover", `
 background-color: var(--n-merged-th-color-hover);
 `), X("sorting", `
 background-color: var(--n-merged-th-color-sorting);
 `), X("sortable", `
 cursor: pointer;
 `, [D("ellipsis", `
 max-width: calc(100% - 18px);
 `), W("&:hover", `
 background-color: var(--n-merged-th-color-hover);
 `)]), V("data-table-sorter", `
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
 `, [V("base-icon", "transition: transform .3s var(--n-bezier)"), X("desc", [V("base-icon", `
 transform: rotate(0deg);
 `)]), X("asc", [V("base-icon", `
 transform: rotate(-180deg);
 `)]), X("asc, desc", `
 color: var(--n-th-icon-color-active);
 `)]), V("data-table-resize-button", `
 width: var(--n-resizable-container-size);
 position: absolute;
 top: 0;
 right: calc(var(--n-resizable-container-size) / 2);
 bottom: 0;
 cursor: col-resize;
 user-select: none;
 `, [W("&::after", `
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
 `), X("active", [W("&::after", ` 
 background-color: var(--n-th-icon-color-active);
 `)]), W("&:hover::after", `
 background-color: var(--n-th-icon-color-active);
 `)]), V("data-table-filter", `
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
 `, [W("&:hover", `
 background-color: var(--n-th-button-color-hover);
 `), X("show", `
 background-color: var(--n-th-button-color-hover);
 `), X("active", `
 background-color: var(--n-th-button-color-hover);
 color: var(--n-th-icon-color-active);
 `)])]), V("data-table-td", `
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
 `, [X("expand", [V("data-table-expand-trigger", `
 margin-right: 0;
 `)]), X("last-row", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [
  // make sure there is no overlap between bottom border and
  // fixed column box shadow
  W("&::after", `
 bottom: 0 !important;
 `),
  W("&::before", `
 bottom: 0 !important;
 `)
]), X("summary", `
 background-color: var(--n-merged-th-color);
 `), X("hover", `
 background-color: var(--n-merged-td-color-hover);
 `), X("sorting", `
 background-color: var(--n-merged-td-color-sorting);
 `), D("ellipsis", `
 display: inline-block;
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
 max-width: 100%;
 vertical-align: bottom;
 max-width: calc(100% - var(--indent-offset, -1.5) * 16px - 24px);
 `), X("selection, expand", `
 text-align: center;
 padding: 0;
 line-height: 0;
 `), Pf]), V("data-table-empty", `
 box-sizing: border-box;
 padding: var(--n-empty-padding);
 flex-grow: 1;
 flex-shrink: 0;
 opacity: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 transition: opacity .3s var(--n-bezier);
 `, [X("hide", `
 opacity: 0;
 `)]), D("pagination", `
 margin: var(--n-pagination-margin);
 display: flex;
 justify-content: flex-end;
 `), V("data-table-wrapper", `
 position: relative;
 opacity: 1;
 transition: opacity .3s var(--n-bezier), border-color .3s var(--n-bezier);
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 line-height: var(--n-line-height);
 `), X("loading", [V("data-table-wrapper", `
 opacity: var(--n-opacity-loading);
 pointer-events: none;
 `)]), X("single-column", [V("data-table-td", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [W("&::after, &::before", `
 bottom: 0 !important;
 `)])]), Qe("single-line", [V("data-table-th", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [X("last", `
 border-right: 0 solid var(--n-merged-border-color);
 `)]), V("data-table-td", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [X("last-col", `
 border-right: 0 solid var(--n-merged-border-color);
 `)])]), X("bordered", [V("data-table-wrapper", `
 border: 1px solid var(--n-merged-border-color);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 overflow: hidden;
 `)]), V("data-table-base-table", [X("transition-disabled", [V("data-table-th", [W("&::after, &::before", "transition: none;")]), V("data-table-td", [W("&::after, &::before", "transition: none;")])])]), X("bottom-bordered", [V("data-table-td", [X("last-row", `
 border-bottom: 1px solid var(--n-merged-border-color);
 `)])]), V("data-table-table", `
 font-variant-numeric: tabular-nums;
 width: 100%;
 word-break: break-word;
 transition: background-color .3s var(--n-bezier);
 border-collapse: separate;
 border-spacing: 0;
 background-color: var(--n-merged-td-color);
 `), V("data-table-base-table-header", `
 border-top-left-radius: calc(var(--n-border-radius) - 1px);
 border-top-right-radius: calc(var(--n-border-radius) - 1px);
 z-index: 3;
 overflow: scroll;
 flex-shrink: 0;
 transition: border-color .3s var(--n-bezier);
 scrollbar-width: none;
 `, [W("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", `
 display: none;
 width: 0;
 height: 0;
 `)]), V("data-table-check-extra", `
 transition: color .3s var(--n-bezier);
 color: var(--n-th-icon-color);
 position: absolute;
 font-size: 14px;
 right: -4px;
 top: 50%;
 transform: translateY(-50%);
 z-index: 1;
 `)]), V("data-table-filter-menu", [V("scrollbar", `
 max-height: 240px;
 `), D("group", `
 display: flex;
 flex-direction: column;
 padding: 12px 12px 0 12px;
 `, [V("checkbox", `
 margin-bottom: 12px;
 margin-right: 0;
 `), V("radio", `
 margin-bottom: 12px;
 margin-right: 0;
 `)]), D("action", `
 padding: var(--n-action-padding);
 display: flex;
 flex-wrap: nowrap;
 justify-content: space-evenly;
 border-top: 1px solid var(--n-action-divider-color);
 `, [V("button", [W("&:not(:last-child)", `
 margin: var(--n-action-button-margin);
 `), W("&:last-child", `
 margin-right: 0;
 `)])]), V("divider", `
 margin: 0 !important;
 `)]), Ks(V("data-table", `
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 --n-merged-th-color-hover: var(--n-th-color-hover-modal);
 --n-merged-td-color-hover: var(--n-td-color-hover-modal);
 --n-merged-th-color-sorting: var(--n-th-color-hover-modal);
 --n-merged-td-color-sorting: var(--n-td-color-hover-modal);
 --n-merged-td-color-striped: var(--n-td-color-striped-modal);
 `)), qs(V("data-table", `
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 --n-merged-th-color-hover: var(--n-th-color-hover-popover);
 --n-merged-td-color-hover: var(--n-td-color-hover-popover);
 --n-merged-th-color-sorting: var(--n-th-color-hover-popover);
 --n-merged-td-color-sorting: var(--n-td-color-hover-popover);
 --n-merged-td-color-striped: var(--n-td-color-striped-popover);
 `))]);
function o2() {
  return [X("fixed-left", `
 left: 0;
 position: sticky;
 z-index: 2;
 `, [W("&::after", `
 pointer-events: none;
 content: "";
 width: 36px;
 display: inline-block;
 position: absolute;
 top: 0;
 bottom: -1px;
 transition: box-shadow .2s var(--n-bezier);
 right: -36px;
 `)]), X("fixed-right", `
 right: 0;
 position: sticky;
 z-index: 1;
 `, [W("&::before", `
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
const Cn = window.Vue.computed, r2 = window.Vue.ref;
function i2(e, t) {
  const {
    paginatedDataRef: n,
    treeMateRef: o,
    selectionColumnRef: r
  } = t, i = r2(e.defaultCheckedRowKeys), a = Cn(() => {
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
  }), l = Cn(() => a.value.checkedKeys), s = Cn(() => a.value.indeterminateKeys), d = Cn(() => new Set(l.value)), c = Cn(() => new Set(s.value)), h = Cn(() => {
    const {
      value: C
    } = d;
    return n.value.reduce((S, y) => {
      const {
        key: T,
        disabled: k
      } = y;
      return S + (!k && C.has(T) ? 1 : 0);
    }, 0);
  }), p = Cn(() => n.value.filter((C) => C.disabled).length), v = Cn(() => {
    const {
      length: C
    } = n.value, {
      value: S
    } = c;
    return h.value > 0 && h.value < C - p.value || n.value.some((y) => S.has(y.key));
  }), f = Cn(() => {
    const {
      length: C
    } = n.value;
    return h.value !== 0 && h.value === C - p.value;
  }), m = Cn(() => n.value.length === 0);
  function g(C, S, y) {
    const {
      "onUpdate:checkedRowKeys": T,
      onUpdateCheckedRowKeys: k,
      onCheckedRowKeysChange: E
    } = e, U = [], {
      value: {
        getNode: _
      }
    } = o;
    C.forEach((M) => {
      var I;
      const z = (I = _(M)) === null || I === void 0 ? void 0 : I.rawNode;
      U.push(z);
    }), T && le(T, C, U, {
      row: S,
      action: y
    }), k && le(k, C, U, {
      row: S,
      action: y
    }), E && le(E, C, U, {
      row: S,
      action: y
    }), i.value = C;
  }
  function u(C, S = !1, y) {
    if (!e.loading) {
      if (S) {
        g(Array.isArray(C) ? C.slice(0, 1) : [C], y, "check");
        return;
      }
      g(o.value.check(C, l.value, {
        cascade: e.cascade,
        allowNotLoaded: e.allowCheckingNotLoaded
      }).checkedKeys, y, "check");
    }
  }
  function b(C, S) {
    e.loading || g(o.value.uncheck(C, l.value, {
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
    }), g(o.value.check(y, l.value, {
      cascade: !0,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, void 0, "checkAll");
  }
  function w(C = !1) {
    const {
      value: S
    } = r;
    if (!S || e.loading) return;
    const y = [];
    (C ? o.value.treeNodes : n.value).forEach((T) => {
      T.disabled || y.push(T.key);
    }), g(o.value.uncheck(y, l.value, {
      cascade: !0,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, void 0, "uncheckAll");
  }
  return {
    mergedCheckedRowKeySetRef: d,
    mergedCheckedRowKeysRef: l,
    mergedInderminateRowKeySetRef: c,
    someRowsCheckedRef: v,
    allRowsCheckedRef: f,
    headerCheckboxDisabledRef: m,
    doUpdateCheckedRowKeys: g,
    doCheckAll: x,
    doUncheckAll: w,
    doCheck: u,
    doUncheck: b
  };
}
const a2 = window.Vue.ref, _f = window.Vue.toRef;
function l2(e, t) {
  const n = ze(() => {
    for (const d of e.columns)
      if (d.type === "expand")
        return d.renderExpand;
  }), o = ze(() => {
    let d;
    for (const c of e.columns)
      if (c.type === "expand") {
        d = c.expandable;
        break;
      }
    return d;
  }), r = a2(e.defaultExpandAll ? n != null && n.value ? (() => {
    const d = [];
    return t.value.treeNodes.forEach((c) => {
      var h;
      !((h = o.value) === null || h === void 0) && h.call(o, c.rawNode) && d.push(c.key);
    }), d;
  })() : t.value.getNonLeafKeys() : e.defaultExpandedRowKeys), i = _f(e, "expandedRowKeys"), a = _f(e, "stickyExpandedRows"), l = Ot(i, r);
  function s(d) {
    const {
      onUpdateExpandedRowKeys: c,
      "onUpdate:expandedRowKeys": h
    } = e;
    c && le(c, d), h && le(h, d), r.value = d;
  }
  return {
    stickyExpandedRowsRef: a,
    mergedExpandedRowKeysRef: l,
    renderExpandRef: n,
    expandableRef: o,
    doUpdateExpandedRowKeys: s
  };
}
const Or = window.Vue.computed;
function s2(e, t) {
  const n = [], o = [], r = [], i = /* @__PURE__ */ new WeakMap();
  let a = -1, l = 0, s = !1, d = 0;
  function c(p, v) {
    v > a && (n[v] = [], a = v), p.forEach((f) => {
      if ("children" in f)
        c(f.children, v + 1);
      else {
        const m = "key" in f ? f.key : void 0;
        o.push({
          key: fn(f),
          style: qT(f, m !== void 0 ? St(t(m)) : void 0),
          column: f,
          index: d++,
          // The width property is only applied to horizontally virtual scroll table
          width: f.width === void 0 ? 128 : Number(f.width)
        }), l += 1, s || (s = !!f.ellipsis), r.push(f);
      }
    });
  }
  c(e, 0), d = 0;
  function h(p, v) {
    let f = 0;
    p.forEach((m) => {
      var g;
      if ("children" in m) {
        const u = d, b = {
          column: m,
          colIndex: d,
          colSpan: 0,
          rowSpan: 1,
          isLast: !1
        };
        h(m.children, v + 1), m.children.forEach((x) => {
          var w, C;
          b.colSpan += (C = (w = i.get(x)) === null || w === void 0 ? void 0 : w.colSpan) !== null && C !== void 0 ? C : 0;
        }), u + b.colSpan === l && (b.isLast = !0), i.set(m, b), n[v].push(b);
      } else {
        if (d < f) {
          d += 1;
          return;
        }
        let u = 1;
        "titleColSpan" in m && (u = (g = m.titleColSpan) !== null && g !== void 0 ? g : 1), u > 1 && (f = d + u);
        const b = d + u === l, x = {
          column: m,
          colSpan: u,
          colIndex: d,
          rowSpan: a - v + 1,
          isLast: b
        };
        i.set(m, x), n[v].push(x), d += 1;
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
function d2(e, t) {
  const n = Or(() => s2(e.columns, t));
  return {
    rowsRef: Or(() => n.value.rows),
    colsRef: Or(() => n.value.cols),
    hasEllipsisRef: Or(() => n.value.hasEllipsis),
    dataRelatedColsRef: Or(() => n.value.dataRelatedCols)
  };
}
const c2 = window.Vue.ref;
function u2() {
  const e = c2({});
  function t(r) {
    return e.value[r];
  }
  function n(r, i) {
    mv(r) && "key" in r && (e.value[r.key] = i);
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
const zr = window.Vue.computed, Mr = window.Vue.ref, f2 = window.Vue.watch;
function h2(e, {
  mainTableInstRef: t,
  mergedCurrentPageRef: n,
  bodyWidthRef: o
}) {
  let r = 0;
  const i = Mr(), a = Mr(null), l = Mr([]), s = Mr(null), d = Mr([]), c = zr(() => St(e.scrollX)), h = zr(() => e.columns.filter((k) => k.fixed === "left")), p = zr(() => e.columns.filter((k) => k.fixed === "right")), v = zr(() => {
    const k = {};
    let E = 0;
    function U(_) {
      _.forEach((M) => {
        const I = {
          start: E,
          end: 0
        };
        k[fn(M)] = I, "children" in M ? (U(M.children), I.end = E) : (E += rf(M) || 0, I.end = E);
      });
    }
    return U(h.value), k;
  }), f = zr(() => {
    const k = {};
    let E = 0;
    function U(_) {
      for (let M = _.length - 1; M >= 0; --M) {
        const I = _[M], z = {
          start: E,
          end: 0
        };
        k[fn(I)] = z, "children" in I ? (U(I.children), z.end = E) : (E += rf(I) || 0, z.end = E);
      }
    }
    return U(p.value), k;
  });
  function m() {
    var k, E;
    const {
      value: U
    } = h;
    let _ = 0;
    const {
      value: M
    } = v;
    let I = null;
    for (let z = 0; z < U.length; ++z) {
      const G = fn(U[z]);
      if (r > (((k = M[G]) === null || k === void 0 ? void 0 : k.start) || 0) - _)
        I = G, _ = ((E = M[G]) === null || E === void 0 ? void 0 : E.end) || 0;
      else
        break;
    }
    a.value = I;
  }
  function g() {
    l.value = [];
    let k = e.columns.find((E) => fn(E) === a.value);
    for (; k && "children" in k; ) {
      const E = k.children.length;
      if (E === 0) break;
      const U = k.children[E - 1];
      l.value.push(fn(U)), k = U;
    }
  }
  function u() {
    var k, E;
    const {
      value: U
    } = p, _ = Number(e.scrollX), {
      value: M
    } = o;
    if (M === null) return;
    let I = 0, z = null;
    const {
      value: G
    } = f;
    for (let L = U.length - 1; L >= 0; --L) {
      const Z = fn(U[L]);
      if (Math.round(r + (((k = G[Z]) === null || k === void 0 ? void 0 : k.start) || 0) + M - I) < _)
        z = Z, I = ((E = G[Z]) === null || E === void 0 ? void 0 : E.end) || 0;
      else
        break;
    }
    s.value = z;
  }
  function b() {
    d.value = [];
    let k = e.columns.find((E) => fn(E) === s.value);
    for (; k && "children" in k && k.children.length; ) {
      const E = k.children[0];
      d.value.push(fn(E)), k = E;
    }
  }
  function x() {
    const k = t.value ? t.value.getHeaderElement() : null, E = t.value ? t.value.getBodyElement() : null;
    return {
      header: k,
      body: E
    };
  }
  function w() {
    const {
      body: k
    } = x();
    k && (k.scrollTop = 0);
  }
  function C() {
    i.value !== "body" ? Yr(y) : i.value = void 0;
  }
  function S(k) {
    var E;
    (E = e.onScroll) === null || E === void 0 || E.call(e, k), i.value !== "head" ? Yr(y) : i.value = void 0;
  }
  function y() {
    const {
      header: k,
      body: E
    } = x();
    if (!E) return;
    const {
      value: U
    } = o;
    if (U !== null) {
      if (e.maxHeight || e.flexHeight) {
        if (!k) return;
        const _ = r - k.scrollLeft;
        i.value = _ !== 0 ? "head" : "body", i.value === "head" ? (r = k.scrollLeft, E.scrollLeft = r) : (r = E.scrollLeft, k.scrollLeft = r);
      } else
        r = E.scrollLeft;
      m(), g(), u(), b();
    }
  }
  function T(k) {
    const {
      header: E
    } = x();
    E && (E.scrollLeft = k, y());
  }
  return f2(n, () => {
    w();
  }), {
    styleScrollXRef: c,
    fixedColumnLeftMapRef: v,
    fixedColumnRightMapRef: f,
    leftFixedColumnsRef: h,
    rightFixedColumnsRef: p,
    leftActiveFixedColKeyRef: a,
    leftActiveFixedChildrenColKeysRef: l,
    rightActiveFixedColKeyRef: s,
    rightActiveFixedChildrenColKeysRef: d,
    syncScrollState: y,
    handleTableBodyScroll: S,
    handleTableHeaderScroll: C,
    setHeaderScrollLeft: T
  };
}
const Tf = window.Vue.computed, p2 = window.Vue.ref;
function Zi(e) {
  return typeof e == "object" && typeof e.multiple == "number" ? e.multiple : !1;
}
function v2(e, t) {
  return t && (e === void 0 || e === "default" || typeof e == "object" && e.compare === "default") ? m2(t) : typeof e == "function" ? e : e && typeof e == "object" && e.compare && e.compare !== "default" ? e.compare : !1;
}
function m2(e) {
  return (t, n) => {
    const o = t[e], r = n[e];
    return o == null ? r == null ? 0 : -1 : r == null ? 1 : typeof o == "number" && typeof r == "number" ? o - r : typeof o == "string" && typeof r == "string" ? o.localeCompare(r) : 0;
  };
}
function g2(e, {
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
  const r = p2(o), i = Tf(() => {
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
  }), a = Tf(() => {
    const v = i.value.slice().sort((f, m) => {
      const g = Zi(f.sorter) || 0;
      return (Zi(m.sorter) || 0) - g;
    });
    return v.length ? n.value.slice().sort((m, g) => {
      let u = 0;
      return v.some((b) => {
        const {
          columnKey: x,
          sorter: w,
          order: C
        } = b, S = v2(w, x);
        return S && C && (u = S(m.rawNode, g.rawNode), u !== 0) ? (u = u * UT(C), !0) : !1;
      }), u;
    }) : n.value;
  });
  function l(v) {
    let f = i.value.slice();
    return v && Zi(v.sorter) !== !1 ? (f = f.filter((m) => Zi(m.sorter) !== !1), p(f, v), f) : v || null;
  }
  function s(v) {
    const f = l(v);
    d(f);
  }
  function d(v) {
    const {
      "onUpdate:sorter": f,
      onUpdateSorter: m,
      onSorterChange: g
    } = e;
    f && le(f, v), m && le(m, v), g && le(g, v), r.value = v;
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
    sortedDataRef: a,
    mergedSortStateRef: i,
    deriveNextSorter: s
  };
}
const un = window.Vue.computed, Ji = window.Vue.ref;
function b2(e, {
  dataRelatedColsRef: t
}) {
  const n = un(() => {
    const A = (F) => {
      for (let j = 0; j < F.length; ++j) {
        const J = F[j];
        if ("children" in J)
          return A(J.children);
        if (J.type === "selection")
          return J;
      }
      return null;
    };
    return A(e.columns);
  }), o = un(() => {
    const {
      childrenKey: A
    } = e;
    return Oa(e.data, {
      ignoreEmptyChildren: !0,
      getKey: e.rowKey,
      getChildren: (F) => F[A],
      getDisabled: (F) => {
        var j, J;
        return !!(!((J = (j = n.value) === null || j === void 0 ? void 0 : j.disabled) === null || J === void 0) && J.call(j, F));
      }
    });
  }), r = ze(() => {
    const {
      columns: A
    } = e, {
      length: F
    } = A;
    let j = null;
    for (let J = 0; J < F; ++J) {
      const Q = A[J];
      if (!Q.type && j === null && (j = J), "tree" in Q && Q.tree)
        return J;
    }
    return j || 0;
  }), i = Ji({}), {
    pagination: a
  } = e, l = Ji(a && a.defaultPage || 1), s = Ji(cv(a)), d = un(() => {
    const A = t.value.filter((J) => J.filterOptionValues !== void 0 || J.filterOptionValue !== void 0), F = {};
    return A.forEach((J) => {
      var Q;
      J.type === "selection" || J.type === "expand" || (J.filterOptionValues === void 0 ? F[J.key] = (Q = J.filterOptionValue) !== null && Q !== void 0 ? Q : null : F[J.key] = J.filterOptionValues);
    }), Object.assign(af(i.value), F);
  }), c = un(() => {
    const A = d.value, {
      columns: F
    } = e;
    function j(ee) {
      return (de, pe) => !!~String(pe[ee]).indexOf(String(de));
    }
    const {
      value: {
        treeNodes: J
      }
    } = o, Q = [];
    return F.forEach((ee) => {
      ee.type === "selection" || ee.type === "expand" || "children" in ee || Q.push([ee.key, ee]);
    }), J ? J.filter((ee) => {
      const {
        rawNode: de
      } = ee;
      for (const [pe, Y] of Q) {
        let se = A[pe];
        if (se == null || (Array.isArray(se) || (se = [se]), !se.length)) continue;
        const $e = Y.filter === "default" ? j(pe) : Y.filter;
        if (Y && typeof $e == "function")
          if (Y.filterMode === "and") {
            if (se.some((me) => !$e(me, de)))
              return !1;
          } else {
            if (se.some((me) => $e(me, de)))
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
  } = g2(e, {
    dataRelatedColsRef: t,
    filteredDataRef: c
  });
  t.value.forEach((A) => {
    var F;
    if (A.filter) {
      const j = A.defaultFilterOptionValues;
      A.filterMultiple ? i.value[A.key] = j || [] : j !== void 0 ? i.value[A.key] = j === null ? [] : j : i.value[A.key] = (F = A.defaultFilterOptionValue) !== null && F !== void 0 ? F : null;
    }
  });
  const g = un(() => {
    const {
      pagination: A
    } = e;
    if (A !== !1)
      return A.page;
  }), u = un(() => {
    const {
      pagination: A
    } = e;
    if (A !== !1)
      return A.pageSize;
  }), b = Ot(g, l), x = Ot(u, s), w = ze(() => {
    const A = b.value;
    return e.remote ? A : Math.max(1, Math.min(Math.ceil(c.value.length / x.value), A));
  }), C = un(() => {
    const {
      pagination: A
    } = e;
    if (A) {
      const {
        pageCount: F
      } = A;
      if (F !== void 0) return F;
    }
  }), S = un(() => {
    if (e.remote) return o.value.treeNodes;
    if (!e.pagination) return h.value;
    const A = x.value, F = (w.value - 1) * A;
    return h.value.slice(F, F + A);
  }), y = un(() => S.value.map((A) => A.rawNode));
  function T(A) {
    const {
      pagination: F
    } = e;
    if (F) {
      const {
        onChange: j,
        "onUpdate:page": J,
        onUpdatePage: Q
      } = F;
      j && le(j, A), Q && le(Q, A), J && le(J, A), _(A);
    }
  }
  function k(A) {
    const {
      pagination: F
    } = e;
    if (F) {
      const {
        onPageSizeChange: j,
        "onUpdate:pageSize": J,
        onUpdatePageSize: Q
      } = F;
      j && le(j, A), Q && le(Q, A), J && le(J, A), M(A);
    }
  }
  const E = un(() => {
    if (e.remote) {
      const {
        pagination: A
      } = e;
      if (A) {
        const {
          itemCount: F
        } = A;
        if (F !== void 0) return F;
      }
      return;
    }
    return c.value.length;
  }), U = un(() => Object.assign(Object.assign({}, e.pagination), {
    // reset deprecated methods
    onChange: void 0,
    onUpdatePage: void 0,
    onUpdatePageSize: void 0,
    onPageSizeChange: void 0,
    "onUpdate:page": T,
    "onUpdate:pageSize": k,
    // writing merged props after pagination to avoid
    // pagination[key] === undefined
    // key still exists but value is undefined
    page: w.value,
    pageSize: x.value,
    pageCount: E.value === void 0 ? C.value : void 0,
    itemCount: E.value
  }));
  function _(A) {
    const {
      "onUpdate:page": F,
      onPageChange: j,
      onUpdatePage: J
    } = e;
    J && le(J, A), F && le(F, A), j && le(j, A), l.value = A;
  }
  function M(A) {
    const {
      "onUpdate:pageSize": F,
      onPageSizeChange: j,
      onUpdatePageSize: J
    } = e;
    j && le(j, A), J && le(J, A), F && le(F, A), s.value = A;
  }
  function I(A, F) {
    const {
      onUpdateFilters: j,
      "onUpdate:filters": J,
      onFiltersChange: Q
    } = e;
    j && le(j, A, F), J && le(J, A, F), Q && le(Q, A, F), i.value = A;
  }
  function z(A, F, j, J) {
    var Q;
    (Q = e.onUnstableColumnResize) === null || Q === void 0 || Q.call(e, A, F, j, J);
  }
  function G(A) {
    _(A);
  }
  function L() {
    Z();
  }
  function Z() {
    te({});
  }
  function te(A) {
    q(A);
  }
  function q(A) {
    A ? A && (i.value = af(A)) : i.value = {};
  }
  return {
    treeMateRef: o,
    mergedCurrentPageRef: w,
    mergedPaginationRef: U,
    paginatedDataRef: S,
    rawPaginatedDataRef: y,
    mergedFilterStateRef: d,
    mergedSortStateRef: v,
    hoverKeyRef: Ji(null),
    selectionColumnRef: n,
    childTriggerColIndexRef: r,
    doUpdateFilters: I,
    deriveNextSorter: p,
    doUpdatePageSize: M,
    doUpdatePage: _,
    onUnstableColumnResize: z,
    // exported methods
    filter: q,
    filters: te,
    clearFilter: L,
    clearFilters: Z,
    clearSorter: m,
    page: G,
    sort: f
  };
}
const eo = window.Vue.computed, w2 = window.Vue.defineComponent, to = window.Vue.h, y2 = window.Vue.provide, Hl = window.Vue.ref, ut = window.Vue.toRef, x2 = window.Vue.Transition;
window.Vue.watchEffect;
const C2 = w2({
  name: "DataTable",
  alias: ["AdvancedTable"],
  props: jT,
  slots: Object,
  setup(e, {
    slots: t
  }) {
    const {
      mergedBorderedRef: n,
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = qe(e), a = zt("DataTable", i, o), l = eo(() => {
      const {
        bottomBordered: P
      } = e;
      return n.value ? !1 : P !== void 0 ? P : !0;
    }), s = _e("DataTable", "-data-table", n2, HT, e, o), d = Hl(null), c = Hl(null), {
      getResizableWidth: h,
      clearResizableWidth: p,
      doUpdateResizableWidth: v
    } = u2(), {
      rowsRef: f,
      colsRef: m,
      dataRelatedColsRef: g,
      hasEllipsisRef: u
    } = d2(e, h), {
      treeMateRef: b,
      mergedCurrentPageRef: x,
      paginatedDataRef: w,
      rawPaginatedDataRef: C,
      selectionColumnRef: S,
      hoverKeyRef: y,
      mergedPaginationRef: T,
      mergedFilterStateRef: k,
      mergedSortStateRef: E,
      childTriggerColIndexRef: U,
      doUpdatePage: _,
      doUpdateFilters: M,
      onUnstableColumnResize: I,
      deriveNextSorter: z,
      filter: G,
      filters: L,
      clearFilter: Z,
      clearFilters: te,
      clearSorter: q,
      page: A,
      sort: F
    } = b2(e, {
      dataRelatedColsRef: g
    }), j = (P) => {
      const {
        fileName: H = "data.csv",
        keepOriginalData: oe = !1
      } = P || {}, ce = oe ? e.data : C.value, ue = ZT(e.columns, ce, e.getCsvCell, e.getCsvHeader), we = new Blob([ue], {
        type: "text/csv;charset=utf-8"
      }), ye = URL.createObjectURL(we);
      Ry(ye, H.endsWith(".csv") ? H : `${H}.csv`), URL.revokeObjectURL(ye);
    }, {
      doCheckAll: J,
      doUncheckAll: Q,
      doCheck: ee,
      doUncheck: de,
      headerCheckboxDisabledRef: pe,
      someRowsCheckedRef: Y,
      allRowsCheckedRef: se,
      mergedCheckedRowKeySetRef: $e,
      mergedInderminateRowKeySetRef: me
    } = i2(e, {
      selectionColumnRef: S,
      treeMateRef: b,
      paginatedDataRef: w
    }), {
      stickyExpandedRowsRef: be,
      mergedExpandedRowKeysRef: Ce,
      renderExpandRef: Be,
      expandableRef: Me,
      doUpdateExpandedRowKeys: ie
    } = l2(e, b), {
      handleTableBodyScroll: R,
      handleTableHeaderScroll: $,
      syncScrollState: N,
      setHeaderScrollLeft: ne,
      leftActiveFixedColKeyRef: ge,
      leftActiveFixedChildrenColKeysRef: he,
      rightActiveFixedColKeyRef: O,
      rightActiveFixedChildrenColKeysRef: K,
      leftFixedColumnsRef: ve,
      rightFixedColumnsRef: Te,
      fixedColumnLeftMapRef: lt,
      fixedColumnRightMapRef: pt
    } = h2(e, {
      bodyWidthRef: d,
      mainTableInstRef: c,
      mergedCurrentPageRef: x
    }), {
      localeRef: Ye
    } = dr("DataTable"), Ze = eo(() => e.virtualScroll || e.flexHeight || e.maxHeight !== void 0 || u.value ? "fixed" : e.tableLayout);
    y2(mn, {
      props: e,
      treeMateRef: b,
      renderExpandIconRef: ut(e, "renderExpandIcon"),
      loadingKeySetRef: Hl(/* @__PURE__ */ new Set()),
      slots: t,
      indentRef: ut(e, "indent"),
      childTriggerColIndexRef: U,
      bodyWidthRef: d,
      componentId: Jr(),
      hoverKeyRef: y,
      mergedClsPrefixRef: o,
      mergedThemeRef: s,
      scrollXRef: eo(() => e.scrollX),
      rowsRef: f,
      colsRef: m,
      paginatedDataRef: w,
      leftActiveFixedColKeyRef: ge,
      leftActiveFixedChildrenColKeysRef: he,
      rightActiveFixedColKeyRef: O,
      rightActiveFixedChildrenColKeysRef: K,
      leftFixedColumnsRef: ve,
      rightFixedColumnsRef: Te,
      fixedColumnLeftMapRef: lt,
      fixedColumnRightMapRef: pt,
      mergedCurrentPageRef: x,
      someRowsCheckedRef: Y,
      allRowsCheckedRef: se,
      mergedSortStateRef: E,
      mergedFilterStateRef: k,
      loadingRef: ut(e, "loading"),
      rowClassNameRef: ut(e, "rowClassName"),
      mergedCheckedRowKeySetRef: $e,
      mergedExpandedRowKeysRef: Ce,
      mergedInderminateRowKeySetRef: me,
      localeRef: Ye,
      expandableRef: Me,
      stickyExpandedRowsRef: be,
      rowKeyRef: ut(e, "rowKey"),
      renderExpandRef: Be,
      summaryRef: ut(e, "summary"),
      virtualScrollRef: ut(e, "virtualScroll"),
      virtualScrollXRef: ut(e, "virtualScrollX"),
      heightForRowRef: ut(e, "heightForRow"),
      minRowHeightRef: ut(e, "minRowHeight"),
      virtualScrollHeaderRef: ut(e, "virtualScrollHeader"),
      headerHeightRef: ut(e, "headerHeight"),
      rowPropsRef: ut(e, "rowProps"),
      stripedRef: ut(e, "striped"),
      checkOptionsRef: eo(() => {
        const {
          value: P
        } = S;
        return P == null ? void 0 : P.options;
      }),
      rawPaginatedDataRef: C,
      filterMenuCssVarsRef: eo(() => {
        const {
          self: {
            actionDividerColor: P,
            actionPadding: H,
            actionButtonMargin: oe
          }
        } = s.value;
        return {
          "--n-action-padding": H,
          "--n-action-button-margin": oe,
          "--n-action-divider-color": P
        };
      }),
      onLoadRef: ut(e, "onLoad"),
      mergedTableLayoutRef: Ze,
      maxHeightRef: ut(e, "maxHeight"),
      minHeightRef: ut(e, "minHeight"),
      flexHeightRef: ut(e, "flexHeight"),
      headerCheckboxDisabledRef: pe,
      paginationBehaviorOnFilterRef: ut(e, "paginationBehaviorOnFilter"),
      summaryPlacementRef: ut(e, "summaryPlacement"),
      filterIconPopoverPropsRef: ut(e, "filterIconPopoverProps"),
      scrollbarPropsRef: ut(e, "scrollbarProps"),
      syncScrollState: N,
      doUpdatePage: _,
      doUpdateFilters: M,
      getResizableWidth: h,
      onUnstableColumnResize: I,
      clearResizableWidth: p,
      doUpdateResizableWidth: v,
      deriveNextSorter: z,
      doCheck: ee,
      doUncheck: de,
      doCheckAll: J,
      doUncheckAll: Q,
      doUpdateExpandedRowKeys: ie,
      handleTableHeaderScroll: $,
      handleTableBodyScroll: R,
      setHeaderScrollLeft: ne,
      renderCell: ut(e, "renderCell")
    });
    const mt = {
      filter: G,
      filters: L,
      clearFilters: te,
      clearSorter: q,
      page: A,
      sort: F,
      clearFilter: Z,
      downloadCsv: j,
      scrollTo: (P, H) => {
        var oe;
        (oe = c.value) === null || oe === void 0 || oe.scrollTo(P, H);
      }
    }, et = eo(() => {
      const {
        size: P
      } = e, {
        common: {
          cubicBezierEaseInOut: H
        },
        self: {
          borderColor: oe,
          tdColorHover: ce,
          tdColorSorting: ue,
          tdColorSortingModal: we,
          tdColorSortingPopover: ye,
          thColorSorting: ke,
          thColorSortingModal: Ae,
          thColorSortingPopover: ot,
          thColor: Ne,
          thColorHover: Pt,
          tdColor: Mt,
          tdTextColor: It,
          thTextColor: Nt,
          thFontWeight: Ht,
          thButtonColorHover: Qt,
          thIconColor: jt,
          thIconColorActive: B,
          filterSize: re,
          borderRadius: Se,
          lineHeight: Oe,
          tdColorModal: He,
          thColorModal: Ve,
          borderColorModal: rt,
          thColorHoverModal: ct,
          tdColorHoverModal: Xt,
          borderColorPopover: En,
          thColorPopover: On,
          tdColorPopover: vo,
          tdColorHoverPopover: hr,
          thColorHoverPopover: pr,
          paginationMargin: vr,
          emptyPadding: mr,
          boxShadowAfter: gr,
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
          [ae("fontSize", P)]: ja,
          [ae("thPadding", P)]: Wa,
          [ae("tdPadding", P)]: Ua
        }
      } = s.value;
      return {
        "--n-font-size": ja,
        "--n-th-padding": Wa,
        "--n-td-padding": Ua,
        "--n-bezier": H,
        "--n-border-radius": Se,
        "--n-line-height": Oe,
        "--n-border-color": oe,
        "--n-border-color-modal": rt,
        "--n-border-color-popover": En,
        "--n-th-color": Ne,
        "--n-th-color-hover": Pt,
        "--n-th-color-modal": Ve,
        "--n-th-color-hover-modal": ct,
        "--n-th-color-popover": On,
        "--n-th-color-hover-popover": pr,
        "--n-td-color": Mt,
        "--n-td-color-hover": ce,
        "--n-td-color-modal": He,
        "--n-td-color-hover-modal": Xt,
        "--n-td-color-popover": vo,
        "--n-td-color-hover-popover": hr,
        "--n-th-text-color": Nt,
        "--n-td-text-color": It,
        "--n-th-font-weight": Ht,
        "--n-th-button-color-hover": Qt,
        "--n-th-icon-color": jt,
        "--n-th-icon-color-active": B,
        "--n-filter-size": re,
        "--n-pagination-margin": vr,
        "--n-empty-padding": mr,
        "--n-box-shadow-before": Kn,
        "--n-box-shadow-after": gr,
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
        "--n-td-color-sorting-modal": we,
        "--n-td-color-sorting-popover": ye,
        "--n-th-color-sorting": ke,
        "--n-th-color-sorting-modal": Ae,
        "--n-th-color-sorting-popover": ot
      };
    }), fe = r ? wt("data-table", eo(() => e.size[0]), et, e) : void 0, Re = eo(() => {
      if (!e.pagination) return !1;
      if (e.paginateSinglePage) return !0;
      const P = T.value, {
        pageCount: H
      } = P;
      return H !== void 0 ? H > 1 : P.itemCount && P.pageSize && P.itemCount > P.pageSize;
    });
    return Object.assign({
      mainTableInstRef: c,
      mergedClsPrefix: o,
      rtlEnabled: a,
      mergedTheme: s,
      paginatedData: w,
      mergedBordered: n,
      mergedBottomBordered: l,
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
    }, to(t2, {
      ref: "mainTableInstRef"
    })), this.mergedShowPagination ? to("div", {
      class: `${e}-data-table__pagination`
    }, to(zT, Object.assign({
      theme: this.mergedTheme.peers.Pagination,
      themeOverrides: this.mergedTheme.peerOverrides.Pagination,
      disabled: this.loading
    }, this.mergedPagination))) : null, to(x2, {
      name: "fade-in-scale-up-transition"
    }, {
      default: () => this.loading ? to("div", {
        class: `${e}-data-table-loading-wrapper`
      }, vn(o.loading, () => [to(ur, Object.assign({
        clsPrefix: e,
        strokeWidth: 20
      }, r))])) : null
    }));
  }
}), S2 = {
  gapSmall: "4px 8px",
  gapMedium: "8px 12px",
  gapLarge: "12px 16px"
};
function $2() {
  return S2;
}
const k2 = {
  self: $2
};
let jl;
function R2() {
  if (!lr) return !0;
  if (jl === void 0) {
    const e = document.createElement("div");
    e.style.display = "flex", e.style.flexDirection = "column", e.style.rowGap = "1px", e.appendChild(document.createElement("div")), e.appendChild(document.createElement("div")), document.body.appendChild(e);
    const t = e.scrollHeight === 1;
    return document.body.removeChild(e), jl = t;
  }
  return jl;
}
const P2 = window.Vue.Comment, _2 = window.Vue.computed, T2 = window.Vue.defineComponent, Ff = window.Vue.h, F2 = Object.assign(Object.assign({}, _e.props), {
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
}), E2 = T2({
  name: "Space",
  props: F2,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedRtlRef: n
    } = qe(e), o = _e("Space", "-space", void 0, k2, e, t), r = zt("Space", n, t);
    return {
      useGap: R2(),
      rtlEnabled: r,
      mergedClsPrefix: t,
      margin: _2(() => {
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
            [ae("gap", i)]: a
          }
        } = o.value, {
          row: l,
          col: s
        } = _b(a);
        return {
          horizontal: xt(s),
          vertical: xt(l)
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
      itemStyle: a,
      margin: l,
      wrap: s,
      mergedClsPrefix: d,
      rtlEnabled: c,
      useGap: h,
      wrapItem: p,
      internalUseGap: v
    } = this, f = or(od(this), !1);
    if (!f.length) return null;
    const m = `${l.horizontal}px`, g = `${l.horizontal / 2}px`, u = `${l.vertical}px`, b = `${l.vertical / 2}px`, x = f.length - 1, w = r.startsWith("space-");
    return Ff("div", {
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
        gap: h ? `${l.vertical}px ${l.horizontal}px` : ""
      }
    }, !p && (h || v) ? f : f.map((C, S) => C.type === P2 ? C : Ff("div", {
      role: "none",
      class: i,
      style: [a, {
        maxWidth: "100%"
      }, h ? "" : e ? {
        marginBottom: S !== x ? u : ""
      } : c ? {
        marginLeft: w ? r === "space-between" && S === x ? "" : g : S !== x ? m : "",
        marginRight: w ? r === "space-between" && S === 0 ? "" : g : "",
        paddingTop: b,
        paddingBottom: b
      } : {
        marginRight: w ? r === "space-between" && S === x ? "" : g : S !== x ? m : "",
        marginLeft: w ? r === "space-between" && S === 0 ? "" : g : "",
        paddingTop: b,
        paddingBottom: b
      }]
    }, C)));
  }
}), O2 = {
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
function z2(e) {
  const {
    heightSmall: t,
    heightMedium: n,
    heightLarge: o,
    textColor1: r,
    errorColor: i,
    warningColor: a,
    lineHeight: l,
    textColor3: s
  } = e;
  return Object.assign(Object.assign({}, O2), {
    blankHeightSmall: t,
    blankHeightMedium: n,
    blankHeightLarge: o,
    lineHeight: l,
    labelTextColor: r,
    asteriskColor: i,
    feedbackTextColorError: i,
    feedbackTextColorWarning: a,
    feedbackTextColor: s
  });
}
const Ov = {
  common: vt,
  self: z2
};
function M2(e) {
  const {
    textColorDisabled: t
  } = e;
  return {
    iconColorDisabled: t
  };
}
const I2 = {
  name: "InputNumber",
  common: vt,
  peers: {
    Button: yd,
    Input: wd
  },
  self: M2
}, A2 = {
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
function V2(e) {
  const {
    primaryColor: t,
    opacityDisabled: n,
    borderRadius: o,
    textColor3: r
  } = e;
  return Object.assign(Object.assign({}, A2), {
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
const B2 = {
  common: vt,
  self: V2
}, ui = "n-form", zv = "n-form-item-insts", L2 = V("form", [X("inline", `
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `, [V("form-item", {
  width: "auto",
  marginRight: "18px"
}, [W("&:last-child", {
  marginRight: 0
})])])]);
var D2 = function(e, t, n, o) {
  function r(i) {
    return i instanceof n ? i : new n(function(a) {
      a(i);
    });
  }
  return new (n || (n = Promise))(function(i, a) {
    function l(c) {
      try {
        d(o.next(c));
      } catch (h) {
        a(h);
      }
    }
    function s(c) {
      try {
        d(o.throw(c));
      } catch (h) {
        a(h);
      }
    }
    function d(c) {
      c.done ? i(c.value) : r(c.value).then(l, s);
    }
    d((o = o.apply(e, t || [])).next());
  });
};
const N2 = window.Vue.defineComponent, H2 = window.Vue.h, Ef = window.Vue.provide, j2 = window.Vue.ref, W2 = Object.assign(Object.assign({}, _e.props), {
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
}), U2 = N2({
  name: "Form",
  props: W2,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = qe(e);
    _e("Form", "-form", L2, Ov, e, t);
    const n = {}, o = j2(void 0), r = (s) => {
      const d = o.value;
      (d === void 0 || s >= d) && (o.value = s);
    };
    function i(s) {
      return D2(this, arguments, void 0, function* (d, c = () => !0) {
        return yield new Promise((h, p) => {
          const v = [];
          for (const f of ti(n)) {
            const m = n[f];
            for (const g of m)
              g.path && v.push(g.internalValidate(null, c));
          }
          Promise.all(v).then((f) => {
            const m = f.some((b) => !b.valid), g = [], u = [];
            f.forEach((b) => {
              var x, w;
              !((x = b.errors) === null || x === void 0) && x.length && g.push(b.errors), !((w = b.warnings) === null || w === void 0) && w.length && u.push(b.warnings);
            }), d && d(g.length ? g : void 0, {
              warnings: u.length ? u : void 0
            }), m ? p(g.length ? g : void 0) : h({
              warnings: u.length ? u : void 0
            });
          });
        });
      });
    }
    function a() {
      for (const s of ti(n)) {
        const d = n[s];
        for (const c of d)
          c.restoreValidation();
      }
    }
    return Ef(ui, {
      props: e,
      maxChildLabelWidthRef: o,
      deriveMaxChildLabelWidth: r
    }), Ef(zv, {
      formItems: n
    }), Object.assign({
      validate: i,
      restoreValidation: a
    }, {
      mergedClsPrefix: t
    });
  },
  render() {
    const {
      mergedClsPrefix: e
    } = this;
    return H2("form", {
      class: [`${e}-form`, this.inline && `${e}-form--inline`],
      onSubmit: this.onSubmit
    }, this.$slots);
  }
});
function ko() {
  return ko = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n)
        Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
  }, ko.apply(this, arguments);
}
function K2(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, ai(e, t);
}
function Os(e) {
  return Os = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Os(e);
}
function ai(e, t) {
  return ai = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, r) {
    return o.__proto__ = r, o;
  }, ai(e, t);
}
function q2() {
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
  return q2() ? sa = Reflect.construct.bind() : sa = function(r, i, a) {
    var l = [null];
    l.push.apply(l, i);
    var s = Function.bind.apply(r, l), d = new s();
    return a && ai(d, a.prototype), d;
  }, sa.apply(null, arguments);
}
function G2(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function zs(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return zs = function(o) {
    if (o === null || !G2(o)) return o;
    if (typeof o != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(o)) return t.get(o);
      t.set(o, r);
    }
    function r() {
      return sa(o, arguments, Os(this).constructor);
    }
    return r.prototype = Object.create(o.prototype, {
      constructor: {
        value: r,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), ai(r, o);
  }, zs(e);
}
var X2 = /%[sdj%]/g, Y2 = function() {
};
function Ms(e) {
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
    var a = e.replace(X2, function(l) {
      if (l === "%%")
        return "%";
      if (r >= i)
        return l;
      switch (l) {
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
          return l;
      }
    });
    return a;
  }
  return e;
}
function Z2(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function $t(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || Z2(t) && typeof e == "string" && !e);
}
function J2(e, t, n) {
  var o = [], r = 0, i = e.length;
  function a(l) {
    o.push.apply(o, l || []), r++, r === i && n(o);
  }
  e.forEach(function(l) {
    t(l, a);
  });
}
function Of(e, t, n) {
  var o = 0, r = e.length;
  function i(a) {
    if (a && a.length) {
      n(a);
      return;
    }
    var l = o;
    o = o + 1, l < r ? t(e[l], i) : n([]);
  }
  i([]);
}
function Q2(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    t.push.apply(t, e[n] || []);
  }), t;
}
var zf = /* @__PURE__ */ function(e) {
  K2(t, e);
  function t(n, o) {
    var r;
    return r = e.call(this, "Async Validation Error") || this, r.errors = n, r.fields = o, r;
  }
  return t;
}(/* @__PURE__ */ zs(Error));
function eO(e, t, n, o, r) {
  if (t.first) {
    var i = new Promise(function(p, v) {
      var f = function(u) {
        return o(u), u.length ? v(new zf(u, Ms(u))) : p(r);
      }, m = Q2(e);
      Of(m, n, f);
    });
    return i.catch(function(p) {
      return p;
    }), i;
  }
  var a = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], l = Object.keys(e), s = l.length, d = 0, c = [], h = new Promise(function(p, v) {
    var f = function(g) {
      if (c.push.apply(c, g), d++, d === s)
        return o(c), c.length ? v(new zf(c, Ms(c))) : p(r);
    };
    l.length || (o(c), p(r)), l.forEach(function(m) {
      var g = e[m];
      a.indexOf(m) !== -1 ? Of(g, n, f) : J2(g, n, f);
    });
  });
  return h.catch(function(p) {
    return p;
  }), h;
}
function tO(e) {
  return !!(e && e.message !== void 0);
}
function nO(e, t) {
  for (var n = e, o = 0; o < t.length; o++) {
    if (n == null)
      return n;
    n = n[t[o]];
  }
  return n;
}
function Mf(e, t) {
  return function(n) {
    var o;
    return e.fullFields ? o = nO(t, e.fullFields) : o = t[n.field || e.fullField], tO(n) ? (n.field = n.field || e.fullField, n.fieldValue = o, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: o,
      field: n.field || e.fullField
    };
  };
}
function If(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var o = t[n];
        typeof o == "object" && typeof e[n] == "object" ? e[n] = ko({}, e[n], o) : e[n] = o;
      }
  }
  return e;
}
var Mv = function(t, n, o, r, i, a) {
  t.required && (!o.hasOwnProperty(t.field) || $t(n, a || t.type)) && r.push(Jt(i.messages.required, t.fullField));
}, oO = function(t, n, o, r, i) {
  (/^\s+$/.test(n) || n === "") && r.push(Jt(i.messages.whitespace, t.fullField));
}, Qi, rO = function() {
  if (Qi)
    return Qi;
  var e = "[a-fA-F\\d:]", t = function(w) {
    return w && w.includeBoundaries ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))" : "";
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
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), i = new RegExp("(?:^" + n + "$)|(?:^" + r + "$)"), a = new RegExp("^" + n + "$"), l = new RegExp("^" + r + "$"), s = function(w) {
    return w && w.exact ? i : new RegExp("(?:" + t(w) + n + t(w) + ")|(?:" + t(w) + r + t(w) + ")", "g");
  };
  s.v4 = function(x) {
    return x && x.exact ? a : new RegExp("" + t(x) + n + t(x), "g");
  }, s.v6 = function(x) {
    return x && x.exact ? l : new RegExp("" + t(x) + r + t(x), "g");
  };
  var d = "(?:(?:[a-z]+:)?//)", c = "(?:\\S+(?::\\S*)?@)?", h = s.v4().source, p = s.v6().source, v = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", f = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", m = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", g = "(?::\\d{2,5})?", u = '(?:[/?#][^\\s"]*)?', b = "(?:" + d + "|www\\.)" + c + "(?:localhost|" + h + "|" + p + "|" + v + f + m + ")" + g + u;
  return Qi = new RegExp("(?:^" + b + "$)", "i"), Qi;
}, Af = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, Vr = {
  integer: function(t) {
    return Vr.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return Vr.number(t) && !Vr.integer(t);
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
    return typeof t == "object" && !Vr.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(Af.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(rO());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(Af.hex);
  }
}, iO = function(t, n, o, r, i) {
  if (t.required && n === void 0) {
    Mv(t, n, o, r, i);
    return;
  }
  var a = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], l = t.type;
  a.indexOf(l) > -1 ? Vr[l](n) || r.push(Jt(i.messages.types[l], t.fullField, t.type)) : l && typeof n !== t.type && r.push(Jt(i.messages.types[l], t.fullField, t.type));
}, aO = function(t, n, o, r, i) {
  var a = typeof t.len == "number", l = typeof t.min == "number", s = typeof t.max == "number", d = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, c = n, h = null, p = typeof n == "number", v = typeof n == "string", f = Array.isArray(n);
  if (p ? h = "number" : v ? h = "string" : f && (h = "array"), !h)
    return !1;
  f && (c = n.length), v && (c = n.replace(d, "_").length), a ? c !== t.len && r.push(Jt(i.messages[h].len, t.fullField, t.len)) : l && !s && c < t.min ? r.push(Jt(i.messages[h].min, t.fullField, t.min)) : s && !l && c > t.max ? r.push(Jt(i.messages[h].max, t.fullField, t.max)) : l && s && (c < t.min || c > t.max) && r.push(Jt(i.messages[h].range, t.fullField, t.min, t.max));
}, Xo = "enum", lO = function(t, n, o, r, i) {
  t[Xo] = Array.isArray(t[Xo]) ? t[Xo] : [], t[Xo].indexOf(n) === -1 && r.push(Jt(i.messages[Xo], t.fullField, t[Xo].join(", ")));
}, sO = function(t, n, o, r, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(n) || r.push(Jt(i.messages.pattern.mismatch, t.fullField, n, t.pattern));
    else if (typeof t.pattern == "string") {
      var a = new RegExp(t.pattern);
      a.test(n) || r.push(Jt(i.messages.pattern.mismatch, t.fullField, n, t.pattern));
    }
  }
}, Ie = {
  required: Mv,
  whitespace: oO,
  type: iO,
  range: aO,
  enum: lO,
  pattern: sO
}, dO = function(t, n, o, r, i) {
  var a = [], l = t.required || !t.required && r.hasOwnProperty(t.field);
  if (l) {
    if ($t(n, "string") && !t.required)
      return o();
    Ie.required(t, n, r, a, i, "string"), $t(n, "string") || (Ie.type(t, n, r, a, i), Ie.range(t, n, r, a, i), Ie.pattern(t, n, r, a, i), t.whitespace === !0 && Ie.whitespace(t, n, r, a, i));
  }
  o(a);
}, cO = function(t, n, o, r, i) {
  var a = [], l = t.required || !t.required && r.hasOwnProperty(t.field);
  if (l) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, a, i), n !== void 0 && Ie.type(t, n, r, a, i);
  }
  o(a);
}, uO = function(t, n, o, r, i) {
  var a = [], l = t.required || !t.required && r.hasOwnProperty(t.field);
  if (l) {
    if (n === "" && (n = void 0), $t(n) && !t.required)
      return o();
    Ie.required(t, n, r, a, i), n !== void 0 && (Ie.type(t, n, r, a, i), Ie.range(t, n, r, a, i));
  }
  o(a);
}, fO = function(t, n, o, r, i) {
  var a = [], l = t.required || !t.required && r.hasOwnProperty(t.field);
  if (l) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, a, i), n !== void 0 && Ie.type(t, n, r, a, i);
  }
  o(a);
}, hO = function(t, n, o, r, i) {
  var a = [], l = t.required || !t.required && r.hasOwnProperty(t.field);
  if (l) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, a, i), $t(n) || Ie.type(t, n, r, a, i);
  }
  o(a);
}, pO = function(t, n, o, r, i) {
  var a = [], l = t.required || !t.required && r.hasOwnProperty(t.field);
  if (l) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, a, i), n !== void 0 && (Ie.type(t, n, r, a, i), Ie.range(t, n, r, a, i));
  }
  o(a);
}, vO = function(t, n, o, r, i) {
  var a = [], l = t.required || !t.required && r.hasOwnProperty(t.field);
  if (l) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, a, i), n !== void 0 && (Ie.type(t, n, r, a, i), Ie.range(t, n, r, a, i));
  }
  o(a);
}, mO = function(t, n, o, r, i) {
  var a = [], l = t.required || !t.required && r.hasOwnProperty(t.field);
  if (l) {
    if (n == null && !t.required)
      return o();
    Ie.required(t, n, r, a, i, "array"), n != null && (Ie.type(t, n, r, a, i), Ie.range(t, n, r, a, i));
  }
  o(a);
}, gO = function(t, n, o, r, i) {
  var a = [], l = t.required || !t.required && r.hasOwnProperty(t.field);
  if (l) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, a, i), n !== void 0 && Ie.type(t, n, r, a, i);
  }
  o(a);
}, bO = "enum", wO = function(t, n, o, r, i) {
  var a = [], l = t.required || !t.required && r.hasOwnProperty(t.field);
  if (l) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, a, i), n !== void 0 && Ie[bO](t, n, r, a, i);
  }
  o(a);
}, yO = function(t, n, o, r, i) {
  var a = [], l = t.required || !t.required && r.hasOwnProperty(t.field);
  if (l) {
    if ($t(n, "string") && !t.required)
      return o();
    Ie.required(t, n, r, a, i), $t(n, "string") || Ie.pattern(t, n, r, a, i);
  }
  o(a);
}, xO = function(t, n, o, r, i) {
  var a = [], l = t.required || !t.required && r.hasOwnProperty(t.field);
  if (l) {
    if ($t(n, "date") && !t.required)
      return o();
    if (Ie.required(t, n, r, a, i), !$t(n, "date")) {
      var s;
      n instanceof Date ? s = n : s = new Date(n), Ie.type(t, s, r, a, i), s && Ie.range(t, s.getTime(), r, a, i);
    }
  }
  o(a);
}, CO = function(t, n, o, r, i) {
  var a = [], l = Array.isArray(n) ? "array" : typeof n;
  Ie.required(t, n, r, a, i, l), o(a);
}, Wl = function(t, n, o, r, i) {
  var a = t.type, l = [], s = t.required || !t.required && r.hasOwnProperty(t.field);
  if (s) {
    if ($t(n, a) && !t.required)
      return o();
    Ie.required(t, n, r, l, i, a), $t(n, a) || Ie.type(t, n, r, l, i);
  }
  o(l);
}, SO = function(t, n, o, r, i) {
  var a = [], l = t.required || !t.required && r.hasOwnProperty(t.field);
  if (l) {
    if ($t(n) && !t.required)
      return o();
    Ie.required(t, n, r, a, i);
  }
  o(a);
}, Wr = {
  string: dO,
  method: cO,
  number: uO,
  boolean: fO,
  regexp: hO,
  integer: pO,
  float: vO,
  array: mO,
  object: gO,
  enum: wO,
  pattern: yO,
  date: xO,
  url: Wl,
  hex: Wl,
  email: Wl,
  required: CO,
  any: SO
};
function Is() {
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
var As = Is(), ar = /* @__PURE__ */ function() {
  function e(n) {
    this.rules = null, this._messages = As, this.define(n);
  }
  var t = e.prototype;
  return t.define = function(o) {
    var r = this;
    if (!o)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof o != "object" || Array.isArray(o))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(o).forEach(function(i) {
      var a = o[i];
      r.rules[i] = Array.isArray(a) ? a : [a];
    });
  }, t.messages = function(o) {
    return o && (this._messages = If(Is(), o)), this._messages;
  }, t.validate = function(o, r, i) {
    var a = this;
    r === void 0 && (r = {}), i === void 0 && (i = function() {
    });
    var l = o, s = r, d = i;
    if (typeof s == "function" && (d = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
      return d && d(null, l), Promise.resolve(l);
    function c(m) {
      var g = [], u = {};
      function b(w) {
        if (Array.isArray(w)) {
          var C;
          g = (C = g).concat.apply(C, w);
        } else
          g.push(w);
      }
      for (var x = 0; x < m.length; x++)
        b(m[x]);
      g.length ? (u = Ms(g), d(g, u)) : d(null, l);
    }
    if (s.messages) {
      var h = this.messages();
      h === As && (h = Is()), If(h, s.messages), s.messages = h;
    } else
      s.messages = this.messages();
    var p = {}, v = s.keys || Object.keys(this.rules);
    v.forEach(function(m) {
      var g = a.rules[m], u = l[m];
      g.forEach(function(b) {
        var x = b;
        typeof x.transform == "function" && (l === o && (l = ko({}, l)), u = l[m] = x.transform(u)), typeof x == "function" ? x = {
          validator: x
        } : x = ko({}, x), x.validator = a.getValidationMethod(x), x.validator && (x.field = m, x.fullField = x.fullField || m, x.type = a.getType(x), p[m] = p[m] || [], p[m].push({
          rule: x,
          value: u,
          source: l,
          field: m
        }));
      });
    });
    var f = {};
    return eO(p, s, function(m, g) {
      var u = m.rule, b = (u.type === "object" || u.type === "array") && (typeof u.fields == "object" || typeof u.defaultField == "object");
      b = b && (u.required || !u.required && m.value), u.field = m.field;
      function x(S, y) {
        return ko({}, y, {
          fullField: u.fullField + "." + S,
          fullFields: u.fullFields ? [].concat(u.fullFields, [S]) : [S]
        });
      }
      function w(S) {
        S === void 0 && (S = []);
        var y = Array.isArray(S) ? S : [S];
        !s.suppressWarning && y.length && e.warning("async-validator:", y), y.length && u.message !== void 0 && (y = [].concat(u.message));
        var T = y.map(Mf(u, l));
        if (s.first && T.length)
          return f[u.field] = 1, g(T);
        if (!b)
          g(T);
        else {
          if (u.required && !m.value)
            return u.message !== void 0 ? T = [].concat(u.message).map(Mf(u, l)) : s.error && (T = [s.error(u, Jt(s.messages.required, u.field))]), g(T);
          var k = {};
          u.defaultField && Object.keys(m.value).map(function(_) {
            k[_] = u.defaultField;
          }), k = ko({}, k, m.rule.fields);
          var E = {};
          Object.keys(k).forEach(function(_) {
            var M = k[_], I = Array.isArray(M) ? M : [M];
            E[_] = I.map(x.bind(null, _));
          });
          var U = new e(E);
          U.messages(s.messages), m.rule.options && (m.rule.options.messages = s.messages, m.rule.options.error = s.error), U.validate(m.value, m.rule.options || s, function(_) {
            var M = [];
            T && T.length && M.push.apply(M, T), _ && _.length && M.push.apply(M, _), g(M.length ? M : null);
          });
        }
      }
      var C;
      if (u.asyncValidator)
        C = u.asyncValidator(u, m.value, w, m.source, s);
      else if (u.validator) {
        try {
          C = u.validator(u, m.value, w, m.source, s);
        } catch (S) {
          console.error == null || console.error(S), s.suppressValidatorError || setTimeout(function() {
            throw S;
          }, 0), w(S.message);
        }
        C === !0 ? w() : C === !1 ? w(typeof u.message == "function" ? u.message(u.fullField || u.field) : u.message || (u.fullField || u.field) + " fails") : C instanceof Array ? w(C) : C instanceof Error && w(C.message);
      }
      C && C.then && C.then(function() {
        return w();
      }, function(S) {
        return w(S);
      });
    }, function(m) {
      c(m);
    }, l);
  }, t.getType = function(o) {
    if (o.type === void 0 && o.pattern instanceof RegExp && (o.type = "pattern"), typeof o.validator != "function" && o.type && !Wr.hasOwnProperty(o.type))
      throw new Error(Jt("Unknown rule type %s", o.type));
    return o.type || "string";
  }, t.getValidationMethod = function(o) {
    if (typeof o.validator == "function")
      return o.validator;
    var r = Object.keys(o), i = r.indexOf("message");
    return i !== -1 && r.splice(i, 1), r.length === 1 && r[0] === "required" ? Wr.required : Wr[this.getType(o)] || void 0;
  }, e;
}();
ar.register = function(t, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  Wr[t] = n;
};
ar.warning = Y2;
ar.messages = As;
ar.validators = Wr;
const {
  cubicBezierEaseInOut: Vf
} = Ao;
function $O({
  name: e = "fade-down",
  fromOffset: t = "-4px",
  enterDuration: n = ".3s",
  leaveDuration: o = ".3s",
  enterCubicBezier: r = Vf,
  leaveCubicBezier: i = Vf
} = {}) {
  return [W(`&.${e}-transition-enter-from, &.${e}-transition-leave-to`, {
    opacity: 0,
    transform: `translateY(${t})`
  }), W(`&.${e}-transition-enter-to, &.${e}-transition-leave-from`, {
    opacity: 1,
    transform: "translateY(0)"
  }), W(`&.${e}-transition-leave-active`, {
    transition: `opacity ${o} ${i}, transform ${o} ${i}`
  }), W(`&.${e}-transition-enter-active`, {
    transition: `opacity ${n} ${r}, transform ${n} ${r}`
  })];
}
const kO = V("form-item", `
 display: grid;
 line-height: var(--n-line-height);
`, [V("form-item-label", `
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
 `, [D("asterisk", `
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 color: var(--n-asterisk-color);
 transition: color .3s var(--n-bezier);
 `), D("asterisk-placeholder", `
 grid-area: mark;
 user-select: none;
 -webkit-user-select: none;
 visibility: hidden; 
 `)]), V("form-item-blank", `
 grid-area: blank;
 min-height: var(--n-blank-height);
 `), X("auto-label-width", [V("form-item-label", "white-space: nowrap;")]), X("left-labelled", `
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 grid-template-rows: auto 1fr;
 align-items: flex-start;
 `, [V("form-item-label", `
 display: grid;
 grid-template-columns: 1fr auto;
 min-height: var(--n-blank-height);
 height: auto;
 box-sizing: border-box;
 flex-shrink: 0;
 flex-grow: 0;
 `, [X("reverse-columns-space", `
 grid-template-columns: auto 1fr;
 `), X("left-mark", `
 grid-template-areas:
 "mark text"
 ". text";
 `), X("right-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), X("right-hanging-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), D("text", `
 grid-area: text; 
 `), D("asterisk", `
 grid-area: mark; 
 align-self: end;
 `)])]), X("top-labelled", `
 grid-template-areas:
 "label"
 "blank"
 "feedback";
 grid-template-rows: minmax(var(--n-label-height), auto) 1fr;
 grid-template-columns: minmax(0, 100%);
 `, [X("no-label", `
 grid-template-areas:
 "blank"
 "feedback";
 grid-template-rows: 1fr;
 `), V("form-item-label", `
 display: flex;
 align-items: flex-start;
 justify-content: var(--n-label-text-align);
 `)]), V("form-item-blank", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 position: relative;
 `), V("form-item-feedback-wrapper", `
 grid-area: feedback;
 box-sizing: border-box;
 min-height: var(--n-feedback-height);
 font-size: var(--n-feedback-font-size);
 line-height: 1.25;
 transform-origin: top left;
 `, [W("&:not(:empty)", `
 padding: var(--n-feedback-padding);
 `), V("form-item-feedback", {
  transition: "color .3s var(--n-bezier)",
  color: "var(--n-feedback-text-color)"
}, [X("warning", {
  color: "var(--n-feedback-text-color-warning)"
}), X("error", {
  color: "var(--n-feedback-text-color-error)"
}), $O({
  fromOffset: "-3px",
  enterDuration: ".3s",
  leaveDuration: ".2s"
})])])]), Dt = window.Vue.computed, Pd = window.Vue.inject, Bf = window.Vue.ref;
function RO(e) {
  const t = Pd(ui, null);
  return {
    mergedSize: Dt(() => e.size !== void 0 ? e.size : (t == null ? void 0 : t.props.size) !== void 0 ? t.props.size : "medium")
  };
}
function PO(e) {
  const t = Pd(ui, null), n = Dt(() => {
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
  }), a = Dt(() => {
    var f;
    return [(f = e.labelProps) === null || f === void 0 ? void 0 : f.style, e.labelStyle, {
      width: r.value
    }];
  }), l = Dt(() => {
    const {
      showRequireMark: f
    } = e;
    return f !== void 0 ? f : t == null ? void 0 : t.props.showRequireMark;
  }), s = Dt(() => {
    const {
      requireMarkPlacement: f
    } = e;
    return f !== void 0 ? f : (t == null ? void 0 : t.props.requireMarkPlacement) || "right";
  }), d = Bf(!1), c = Bf(!1), h = Dt(() => {
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
    mergedLabelStyle: a,
    mergedLabelPlacement: n,
    mergedLabelAlign: i,
    mergedShowRequireMark: l,
    mergedRequireMarkPlacement: s,
    mergedValidationStatus: h,
    mergedShowFeedback: p,
    mergedShowLabel: v,
    isAutoLabelWidth: o
  };
}
function _O(e) {
  const t = Pd(ui, null), n = Dt(() => {
    const {
      rulePath: a
    } = e;
    if (a !== void 0) return a;
    const {
      path: l
    } = e;
    if (l !== void 0) return l;
  }), o = Dt(() => {
    const a = [], {
      rule: l
    } = e;
    if (l !== void 0 && (Array.isArray(l) ? a.push(...l) : a.push(l)), t) {
      const {
        rules: s
      } = t.props, {
        value: d
      } = n;
      if (s !== void 0 && d !== void 0) {
        const c = ri(s, d);
        c !== void 0 && (Array.isArray(c) ? a.push(...c) : a.push(c));
      }
    }
    return a;
  }), r = Dt(() => o.value.some((a) => a.required)), i = Dt(() => r.value || e.required);
  return {
    mergedRules: o,
    mergedRequired: i
  };
}
var Lf = function(e, t, n, o) {
  function r(i) {
    return i instanceof n ? i : new n(function(a) {
      a(i);
    });
  }
  return new (n || (n = Promise))(function(i, a) {
    function l(c) {
      try {
        d(o.next(c));
      } catch (h) {
        a(h);
      }
    }
    function s(c) {
      try {
        d(o.throw(c));
      } catch (h) {
        a(h);
      }
    }
    function d(c) {
      c.done ? i(c.value) : r(c.value).then(l, s);
    }
    d((o = o.apply(e, t || [])).next());
  });
};
const Ul = window.Vue.computed, TO = window.Vue.defineComponent, qt = window.Vue.h, FO = window.Vue.inject, EO = window.Vue.onMounted, OO = window.Vue.provide, ea = window.Vue.ref, ta = window.Vue.toRef, zO = window.Vue.Transition, MO = window.Vue.watch, _d = Object.assign(Object.assign({}, _e.props), {
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
}), IO = ti(_d);
function Df(e, t) {
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
const AO = TO({
  name: "FormItem",
  props: _d,
  setup(e) {
    Ew(zv, "formItems", ta(e, "path"));
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = qe(e), o = FO(ui, null), r = RO(e), i = PO(e), {
      validationErrored: a,
      validationWarned: l
    } = i, {
      mergedRequired: s,
      mergedRules: d
    } = _O(e), {
      mergedSize: c
    } = r, {
      mergedLabelPlacement: h,
      mergedLabelAlign: p,
      mergedRequireMarkPlacement: v
    } = i, f = ea([]), m = ea(Jr()), g = o ? ta(o.props, "disabled") : ea(!1), u = _e("Form", "-form-item", kO, Ov, e, t);
    MO(ta(e, "path"), () => {
      e.ignorePathChange || b();
    });
    function b() {
      f.value = [], a.value = !1, l.value = !1, e.feedback && (m.value = Jr());
    }
    const x = (...I) => Lf(this, [...I], void 0, function* (z = null, G = () => !0, L = {
      suppressWarning: !0
    }) {
      const {
        path: Z
      } = e;
      L ? L.first || (L.first = e.first) : L = {};
      const {
        value: te
      } = d, q = o ? ri(o.props.model, Z || "") : void 0, A = {}, F = {}, j = (z ? te.filter((me) => Array.isArray(me.trigger) ? me.trigger.includes(z) : me.trigger === z) : te).filter(G).map((me, be) => {
        const Ce = Object.assign({}, me);
        if (Ce.validator && (Ce.validator = Df(Ce.validator, !1)), Ce.asyncValidator && (Ce.asyncValidator = Df(Ce.asyncValidator, !0)), Ce.renderMessage) {
          const Be = `__renderMessage__${be}`;
          F[Be] = Ce.message, Ce.message = Be, A[Be] = Ce.renderMessage;
        }
        return Ce;
      }), J = j.filter((me) => me.level !== "warning"), Q = j.filter((me) => me.level === "warning"), ee = {
        valid: !0,
        errors: void 0,
        warnings: void 0
      };
      if (!j.length) return ee;
      const de = Z ?? "__n_no_path__", pe = new ar({
        [de]: J
      }), Y = new ar({
        [de]: Q
      }), {
        validateMessages: se
      } = (o == null ? void 0 : o.props) || {};
      se && (pe.messages(se), Y.messages(se));
      const $e = (me) => {
        f.value = me.map((be) => {
          const Ce = (be == null ? void 0 : be.message) || "";
          return {
            key: Ce,
            render: () => Ce.startsWith("__renderMessage__") ? A[Ce]() : Ce
          };
        }), me.forEach((be) => {
          var Ce;
          !((Ce = be.message) === null || Ce === void 0) && Ce.startsWith("__renderMessage__") && (be.message = F[be.message]);
        });
      };
      if (J.length) {
        const me = yield new Promise((be) => {
          pe.validate({
            [de]: q
          }, L, be);
        });
        me != null && me.length && (ee.valid = !1, ee.errors = me, $e(me));
      }
      if (Q.length && !ee.errors) {
        const me = yield new Promise((be) => {
          Y.validate({
            [de]: q
          }, L, be);
        });
        me != null && me.length && ($e(me), ee.warnings = me);
      }
      return !ee.errors && !ee.warnings ? b() : (a.value = !!ee.errors, l.value = !!ee.warnings), ee;
    });
    function w() {
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
    function T(I, z) {
      return Lf(this, void 0, void 0, function* () {
        let G, L, Z, te;
        return typeof I == "string" ? (G = I, L = z) : I !== null && typeof I == "object" && (G = I.trigger, L = I.callback, Z = I.shouldRuleBeApplied, te = I.options), yield new Promise((q, A) => {
          x(G, Z, te).then(({
            valid: F,
            errors: j,
            warnings: J
          }) => {
            F ? (L && L(void 0, {
              warnings: J
            }), q({
              warnings: J
            })) : (L && L(j, {
              warnings: J
            }), A(j));
          });
        });
      });
    }
    OO(gs, {
      path: ta(e, "path"),
      disabled: g,
      mergedSize: r.mergedSize,
      mergedValidationStatus: i.mergedValidationStatus,
      restoreValidation: b,
      handleContentBlur: w,
      handleContentChange: C,
      handleContentFocus: S,
      handleContentInput: y
    });
    const k = {
      validate: T,
      restoreValidation: b,
      internalValidate: x
    }, E = ea(null);
    EO(() => {
      if (!i.isAutoLabelWidth.value) return;
      const I = E.value;
      if (I !== null) {
        const z = I.style.whiteSpace;
        I.style.whiteSpace = "nowrap", I.style.width = "", o == null || o.deriveMaxChildLabelWidth(Number(getComputedStyle(I).width.slice(0, -2))), I.style.whiteSpace = z;
      }
    });
    const U = Ul(() => {
      var I;
      const {
        value: z
      } = c, {
        value: G
      } = h, L = G === "top" ? "vertical" : "horizontal", {
        common: {
          cubicBezierEaseInOut: Z
        },
        self: {
          labelTextColor: te,
          asteriskColor: q,
          lineHeight: A,
          feedbackTextColor: F,
          feedbackTextColorWarning: j,
          feedbackTextColorError: J,
          feedbackPadding: Q,
          labelFontWeight: ee,
          [ae("labelHeight", z)]: de,
          [ae("blankHeight", z)]: pe,
          [ae("feedbackFontSize", z)]: Y,
          [ae("feedbackHeight", z)]: se,
          [ae("labelPadding", L)]: $e,
          [ae("labelTextAlign", L)]: me,
          [ae(ae("labelFontSize", G), z)]: be
        }
      } = u.value;
      let Ce = (I = p.value) !== null && I !== void 0 ? I : me;
      return G === "top" && (Ce = Ce === "right" ? "flex-end" : "flex-start"), {
        "--n-bezier": Z,
        "--n-line-height": A,
        "--n-blank-height": pe,
        "--n-label-font-size": be,
        "--n-label-text-align": Ce,
        "--n-label-height": de,
        "--n-label-padding": $e,
        "--n-label-font-weight": ee,
        "--n-asterisk-color": q,
        "--n-label-text-color": te,
        "--n-feedback-padding": Q,
        "--n-feedback-font-size": Y,
        "--n-feedback-height": se,
        "--n-feedback-text-color": F,
        "--n-feedback-text-color-warning": j,
        "--n-feedback-text-color-error": J
      };
    }), _ = n ? wt("form-item", Ul(() => {
      var I;
      return `${c.value[0]}${h.value[0]}${((I = p.value) === null || I === void 0 ? void 0 : I[0]) || ""}`;
    }), U, e) : void 0, M = Ul(() => h.value === "left" && v.value === "left" && p.value === "left");
    return Object.assign(Object.assign(Object.assign(Object.assign({
      labelElementRef: E,
      mergedClsPrefix: t,
      mergedRequired: s,
      feedbackId: m,
      renderExplains: f,
      reverseColSpace: M
    }, i), r), k), {
      cssVars: n ? void 0 : U,
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
    } = this, a = o !== void 0 ? o : this.mergedRequired;
    i == null || i();
    const l = () => {
      const s = this.$slots.label ? this.$slots.label() : this.label;
      if (!s) return null;
      const d = qt("span", {
        class: `${t}-form-item-label__text`
      }, s), c = a ? qt("span", {
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
    }, n && l(), qt("div", {
      class: [`${t}-form-item-blank`, this.contentClass, this.mergedValidationStatus && `${t}-form-item-blank--${this.mergedValidationStatus}`],
      style: this.contentStyle
    }, e), this.mergedShowFeedback ? qt("div", {
      key: this.feedbackId,
      style: this.feedbackStyle,
      class: [`${t}-form-item-feedback-wrapper`, this.feedbackClass]
    }, qt(zO, {
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
}), Nf = 1, Iv = "n-grid", VO = window.Vue.computed, BO = window.Vue.defineComponent, LO = window.Vue.getCurrentInstance, Hf = window.Vue.h, DO = window.Vue.inject, Av = 1, Td = {
  span: {
    type: [Number, String],
    default: Av
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
}, NO = ti(Td), HO = BO({
  __GRID_ITEM__: !0,
  name: "GridItem",
  alias: ["Gi"],
  props: Td,
  setup() {
    const {
      isSsrRef: e,
      xGapRef: t,
      itemStyleRef: n,
      overflowRef: o,
      layoutShiftDisabledRef: r
    } = DO(Iv), i = LO();
    return {
      overflow: o,
      itemStyle: n,
      layoutShiftDisabled: r,
      mergedXGap: VO(() => it(t.value || 0)),
      deriveStyle: () => {
        e.value;
        const {
          privateSpan: a = Av,
          privateShow: l = !0,
          privateColStart: s = void 0,
          privateOffset: d = 0
        } = i.vnode.props, {
          value: c
        } = t, h = it(c || 0);
        return {
          display: l ? "" : "none",
          gridColumn: `${s ?? `span ${a}`} / span ${a}`,
          marginLeft: d ? `calc((100% - (${a} - 1) * ${h}) / ${a} * ${d} + ${h} * ${d})` : ""
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
      return Hf("div", {
        style: {
          gridColumn: `span ${n} / span ${n}`,
          marginLeft: o ? `calc((100% - (${n} - 1) * ${r}) / ${n} * ${o} + ${r} * ${o})` : ""
        }
      }, this.$slots);
    }
    return Hf("div", {
      style: [this.itemStyle, this.deriveStyle()]
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e, {
      overflow: this.overflow
    }));
  }
}), jO = window.Vue.defineComponent, jf = window.Vue.h, WO = window.Vue.ref, UO = Object.assign(Object.assign({}, Td), _d), no = jO({
  __GRID_ITEM__: !0,
  name: "FormItemGridItem",
  alias: ["FormItemGi"],
  props: UO,
  setup() {
    const e = WO(null);
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
    return jf(HO, ei(this.$.vnode.props || {}, NO), {
      default: () => {
        const e = ei(this.$props, IO);
        return jf(AO, Object.assign({
          ref: "formItemInstRef"
        }, e), this.$slots);
      }
    });
  }
}), KO = {
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
}, Wf = window.Vue.cloneVNode, Kl = window.Vue.computed, qO = window.Vue.defineComponent, ql = window.Vue.h, Uf = window.Vue.mergeProps, GO = window.Vue.onMounted, XO = window.Vue.provide, na = window.Vue.ref, Kf = window.Vue.toRef, YO = window.Vue.vShow, Vv = 24, Gl = "__ssr__", ZO = {
  layoutShiftDisabled: Boolean,
  responsive: {
    type: [String, Boolean],
    default: "self"
  },
  cols: {
    type: [Number, String],
    default: Vv
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
}, JO = qO({
  name: "Grid",
  inheritAttrs: !1,
  props: ZO,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBreakpointsRef: n
    } = qe(e), o = /^\d+$/, r = na(void 0), i = gw((n == null ? void 0 : n.value) || KO), a = ze(() => !!(e.itemResponsive || !o.test(e.cols.toString()) || !o.test(e.xGap.toString()) || !o.test(e.yGap.toString()))), l = Kl(() => {
      if (a.value)
        return e.responsive === "self" ? r.value : i.value;
    }), s = ze(() => {
      var u;
      return (u = Number(Bo(e.cols.toString(), l.value))) !== null && u !== void 0 ? u : Vv;
    }), d = ze(() => Bo(e.xGap.toString(), l.value)), c = ze(() => Bo(e.yGap.toString(), l.value)), h = (u) => {
      r.value = u.contentRect.width;
    }, p = (u) => {
      Yr(h, u);
    }, v = na(!1), f = Kl(() => {
      if (e.responsive === "self")
        return p;
    }), m = na(!1), g = na();
    return GO(() => {
      const {
        value: u
      } = g;
      u && u.hasAttribute(Gl) && (u.removeAttribute(Gl), m.value = !0);
    }), XO(Iv, {
      layoutShiftDisabledRef: Kf(e, "layoutShiftDisabled"),
      isSsrRef: m,
      itemStyleRef: Kf(e, "itemStyle"),
      xGapRef: d,
      overflowRef: v
    }), {
      isSsr: !lr,
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
      isResponsive: a,
      responsiveQuery: l,
      responsiveCols: s,
      handleResize: f,
      overflow: v
    };
  },
  render() {
    if (this.layoutShiftDisabled)
      return ql("div", Uf({
        ref: "contentEl",
        class: `${this.mergedClsPrefix}-grid`,
        style: this.style
      }, this.$attrs), this.$slots);
    const e = () => {
      var t, n, o, r, i, a, l;
      this.overflow = !1;
      const s = or(od(this)), d = [], {
        collapsed: c,
        collapsedRows: h,
        responsiveCols: p,
        responsiveQuery: v
      } = this;
      s.forEach((b) => {
        var x, w, C, S, y;
        if (((x = b == null ? void 0 : b.type) === null || x === void 0 ? void 0 : x.__GRID_ITEM__) !== !0) return;
        if (Vy(b)) {
          const E = Wf(b);
          E.props ? E.props.privateShow = !1 : E.props = {
            privateShow: !1
          }, d.push({
            child: E,
            rawChildSpan: 0
          });
          return;
        }
        b.dirs = ((w = b.dirs) === null || w === void 0 ? void 0 : w.filter(({
          dir: E
        }) => E !== YO)) || null, ((C = b.dirs) === null || C === void 0 ? void 0 : C.length) === 0 && (b.dirs = null);
        const T = Wf(b), k = Number((y = Bo((S = T.props) === null || S === void 0 ? void 0 : S.span, v)) !== null && y !== void 0 ? y : Nf);
        k !== 0 && d.push({
          child: T,
          rawChildSpan: k
        });
      });
      let f = 0;
      const m = (t = d[d.length - 1]) === null || t === void 0 ? void 0 : t.child;
      if (m != null && m.props) {
        const b = (n = m.props) === null || n === void 0 ? void 0 : n.suffix;
        b !== void 0 && b !== !1 && (f = Number((r = Bo((o = m.props) === null || o === void 0 ? void 0 : o.span, v)) !== null && r !== void 0 ? r : Nf), m.props.privateSpan = f, m.props.privateColStart = p + 1 - f, m.props.privateShow = (i = m.props.privateShow) !== null && i !== void 0 ? i : !0);
      }
      let g = 0, u = !1;
      for (const {
        child: b,
        rawChildSpan: x
      } of d) {
        if (u && (this.overflow = !0), !u) {
          const w = Number((l = Bo((a = b.props) === null || a === void 0 ? void 0 : a.offset, v)) !== null && l !== void 0 ? l : 0), C = Math.min(x + w, p);
          if (b.props ? (b.props.privateSpan = C, b.props.privateOffset = w) : b.props = {
            privateSpan: C,
            privateOffset: w
          }, c) {
            const S = g % p;
            C + S > p && (g += p - S), C + g + f > h * p ? u = !0 : g += C;
          }
        }
        u && (b.props ? b.props.privateShow !== !0 && (b.props.privateShow = !1) : b.props = {
          privateShow: !1
        });
      }
      return ql("div", Uf({
        ref: "contentEl",
        class: `${this.mergedClsPrefix}-grid`,
        style: this.style,
        [Gl]: this.isSsr || void 0
      }, this.$attrs), d.map(({
        child: b
      }) => b));
    };
    return this.isResponsive && this.responsive === "self" ? ql(To, {
      onResize: this.handleResize
    }, {
      default: e
    }) : e();
  }
}), QO = W([V("input-number-suffix", `
 display: inline-block;
 margin-right: 10px;
 `), V("input-number-prefix", `
 display: inline-block;
 margin-left: 10px;
 `)]);
function ez(e) {
  return e == null || typeof e == "string" && e.trim() === "" ? null : Number(e);
}
function tz(e) {
  return e.includes(".") && (/^(-)?\d+.*(\.|0)$/.test(e) || /^-?\d*$/.test(e)) || e === "-" || e === "-0";
}
function Xl(e) {
  return e == null ? !0 : !Number.isNaN(e);
}
function qf(e, t) {
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
const nz = window.Vue.computed, oz = window.Vue.defineComponent, Sn = window.Vue.h, rz = window.Vue.nextTick, Ir = window.Vue.ref, iz = window.Vue.toRef, az = window.Vue.watch;
window.Vue.watchEffect;
const Gf = 800, Xf = 100, lz = Object.assign(Object.assign({}, _e.props), {
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
}), sz = oz({
  name: "InputNumber",
  props: lz,
  slots: Object,
  setup(e) {
    const {
      mergedBorderedRef: t,
      mergedClsPrefixRef: n,
      mergedRtlRef: o
    } = qe(e), r = _e("InputNumber", "-input-number", QO, I2, e, n), {
      localeRef: i
    } = dr("InputNumber"), a = jn(e), {
      mergedSizeRef: l,
      mergedDisabledRef: s,
      mergedStatusRef: d
    } = a, c = Ir(null), h = Ir(null), p = Ir(null), v = Ir(e.defaultValue), f = iz(e, "value"), m = Ot(f, v), g = Ir(""), u = (ie) => {
      const R = String(ie).split(".")[1];
      return R ? R.length : 0;
    }, b = (ie) => {
      const R = [e.min, e.max, e.step, ie].map(($) => $ === void 0 ? 0 : u($));
      return Math.max(...R);
    }, x = ze(() => {
      const {
        placeholder: ie
      } = e;
      return ie !== void 0 ? ie : i.value.placeholder;
    }), w = ze(() => {
      const ie = Yl(e.step);
      return ie !== null ? ie === 0 ? 1 : Math.abs(ie) : 1;
    }), C = ze(() => {
      const ie = Yl(e.min);
      return ie !== null ? ie : null;
    }), S = ze(() => {
      const ie = Yl(e.max);
      return ie !== null ? ie : null;
    }), y = () => {
      const {
        value: ie
      } = m;
      if (Xl(ie)) {
        const {
          format: R,
          precision: $
        } = e;
        R ? g.value = R(ie) : ie === null || $ === void 0 || u(ie) > $ ? g.value = qf(ie, void 0) : g.value = qf(ie, $);
      } else
        g.value = String(ie);
    };
    y();
    const T = (ie) => {
      const {
        value: R
      } = m;
      if (ie === R) {
        y();
        return;
      }
      const {
        "onUpdate:value": $,
        onUpdateValue: N,
        onChange: ne
      } = e, {
        nTriggerFormInput: ge,
        nTriggerFormChange: he
      } = a;
      ne && le(ne, ie), N && le(N, ie), $ && le($, ie), v.value = ie, ge(), he();
    }, k = ({
      offset: ie,
      doUpdateIfValid: R,
      fixPrecision: $,
      isInputing: N
    }) => {
      const {
        value: ne
      } = g;
      if (N && tz(ne))
        return !1;
      const ge = (e.parse || ez)(ne);
      if (ge === null)
        return R && T(null), null;
      if (Xl(ge)) {
        const he = u(ge), {
          precision: O
        } = e;
        if (O !== void 0 && O < he && !$)
          return !1;
        let K = Number.parseFloat((ge + ie).toFixed(O ?? b(ge)));
        if (Xl(K)) {
          const {
            value: ve
          } = S, {
            value: Te
          } = C;
          if (ve !== null && K > ve) {
            if (!R || N) return !1;
            K = ve;
          }
          if (Te !== null && K < Te) {
            if (!R || N) return !1;
            K = Te;
          }
          return e.validator && !e.validator(K) ? !1 : (R && T(K), K);
        }
      }
      return !1;
    }, E = ze(() => k({
      offset: 0,
      doUpdateIfValid: !1,
      isInputing: !1,
      fixPrecision: !1
    }) === !1), U = ze(() => {
      const {
        value: ie
      } = m;
      if (e.validator && ie === null)
        return !1;
      const {
        value: R
      } = w;
      return k({
        offset: -R,
        doUpdateIfValid: !1,
        isInputing: !1,
        fixPrecision: !1
      }) !== !1;
    }), _ = ze(() => {
      const {
        value: ie
      } = m;
      if (e.validator && ie === null)
        return !1;
      const {
        value: R
      } = w;
      return k({
        offset: +R,
        doUpdateIfValid: !1,
        isInputing: !1,
        fixPrecision: !1
      }) !== !1;
    });
    function M(ie) {
      const {
        onFocus: R
      } = e, {
        nTriggerFormFocus: $
      } = a;
      R && le(R, ie), $();
    }
    function I(ie) {
      var R, $;
      if (ie.target === ((R = c.value) === null || R === void 0 ? void 0 : R.wrapperElRef))
        return;
      const N = k({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !1,
        fixPrecision: !0
      });
      if (N !== !1) {
        const he = ($ = c.value) === null || $ === void 0 ? void 0 : $.inputElRef;
        he && (he.value = String(N || "")), m.value === N && y();
      } else
        y();
      const {
        onBlur: ne
      } = e, {
        nTriggerFormBlur: ge
      } = a;
      ne && le(ne, ie), ge(), rz(() => {
        y();
      });
    }
    function z(ie) {
      const {
        onClear: R
      } = e;
      R && le(R, ie);
    }
    function G() {
      const {
        value: ie
      } = _;
      if (!ie) {
        pe();
        return;
      }
      const {
        value: R
      } = m;
      if (R === null)
        e.validator || T(q());
      else {
        const {
          value: $
        } = w;
        k({
          offset: $,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        });
      }
    }
    function L() {
      const {
        value: ie
      } = U;
      if (!ie) {
        ee();
        return;
      }
      const {
        value: R
      } = m;
      if (R === null)
        e.validator || T(q());
      else {
        const {
          value: $
        } = w;
        k({
          offset: -$,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        });
      }
    }
    const Z = M, te = I;
    function q() {
      if (e.validator) return null;
      const {
        value: ie
      } = C, {
        value: R
      } = S;
      return ie !== null ? Math.max(0, ie) : R !== null ? Math.min(0, R) : 0;
    }
    function A(ie) {
      z(ie), T(null);
    }
    function F(ie) {
      var R, $, N;
      !((R = p.value) === null || R === void 0) && R.$el.contains(ie.target) && ie.preventDefault(), !(($ = h.value) === null || $ === void 0) && $.$el.contains(ie.target) && ie.preventDefault(), (N = c.value) === null || N === void 0 || N.activate();
    }
    let j = null, J = null, Q = null;
    function ee() {
      Q && (window.clearTimeout(Q), Q = null), j && (window.clearInterval(j), j = null);
    }
    let de = null;
    function pe() {
      de && (window.clearTimeout(de), de = null), J && (window.clearInterval(J), J = null);
    }
    function Y() {
      ee(), Q = window.setTimeout(() => {
        j = window.setInterval(() => {
          L();
        }, Xf);
      }, Gf), at("mouseup", document, ee, {
        once: !0
      });
    }
    function se() {
      pe(), de = window.setTimeout(() => {
        J = window.setInterval(() => {
          G();
        }, Xf);
      }, Gf), at("mouseup", document, pe, {
        once: !0
      });
    }
    const $e = () => {
      J || G();
    }, me = () => {
      j || L();
    };
    function be(ie) {
      var R, $;
      if (ie.key === "Enter") {
        if (ie.target === ((R = c.value) === null || R === void 0 ? void 0 : R.wrapperElRef))
          return;
        k({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && (($ = c.value) === null || $ === void 0 || $.deactivate());
      } else if (ie.key === "ArrowUp") {
        if (!_.value || e.keyboard.ArrowUp === !1) return;
        ie.preventDefault(), k({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && G();
      } else if (ie.key === "ArrowDown") {
        if (!U.value || e.keyboard.ArrowDown === !1) return;
        ie.preventDefault(), k({
          offset: 0,
          doUpdateIfValid: !0,
          isInputing: !1,
          fixPrecision: !0
        }) !== !1 && L();
      }
    }
    function Ce(ie) {
      g.value = ie, e.updateValueOnInput && !e.format && !e.parse && e.precision === void 0 && k({
        offset: 0,
        doUpdateIfValid: !0,
        isInputing: !0,
        fixPrecision: !1
      });
    }
    az(m, () => {
      y();
    });
    const Be = {
      focus: () => {
        var ie;
        return (ie = c.value) === null || ie === void 0 ? void 0 : ie.focus();
      },
      blur: () => {
        var ie;
        return (ie = c.value) === null || ie === void 0 ? void 0 : ie.blur();
      },
      select: () => {
        var ie;
        return (ie = c.value) === null || ie === void 0 ? void 0 : ie.select();
      }
    }, Me = zt("InputNumber", o, n);
    return Object.assign(Object.assign({}, Be), {
      rtlEnabled: Me,
      inputInstRef: c,
      minusButtonInstRef: h,
      addButtonInstRef: p,
      mergedClsPrefix: n,
      mergedBordered: t,
      uncontrolledValue: v,
      mergedValue: m,
      mergedPlaceholder: x,
      displayedValueInvalid: E,
      mergedSize: l,
      mergedDisabled: s,
      displayedValue: g,
      addable: _,
      minusable: U,
      mergedStatus: d,
      handleFocus: Z,
      handleBlur: te,
      handleClear: A,
      handleMouseDown: F,
      handleAddClick: $e,
      handleMinusClick: me,
      handleAddMousedown: se,
      handleMinusMousedown: Y,
      handleKeyDown: be,
      handleUpdateDisplayedValue: Ce,
      // theme
      mergedTheme: r,
      inputThemeOverrides: {
        paddingSmall: "0 8px 0 10px",
        paddingMedium: "0 8px 0 12px",
        paddingLarge: "0 8px 0 14px"
      },
      buttonThemeOverrides: nz(() => {
        const {
          self: {
            iconColorDisabled: ie
          }
        } = r.value, [R, $, N, ne] = lo(ie);
        return {
          textColorTextDisabled: `rgb(${R}, ${$}, ${N})`,
          opacityDisabled: `${ne}`
        };
      })
    });
  },
  render() {
    const {
      mergedClsPrefix: e,
      $slots: t
    } = this, n = () => Sn(Nu, {
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
        default: () => Sn(Nk, null)
      })])
    }), o = () => Sn(Nu, {
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
        default: () => Sn(mk, null)
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
}), dz = V("switch", `
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`, [D("children-placeholder", `
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `), D("rail-placeholder", `
 display: flex;
 flex-wrap: none;
 `), D("button-placeholder", `
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `), V("base-loading", `
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
})]), D("checked, unchecked", `
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
 `), D("checked", `
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), D("unchecked", `
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), W("&:focus", [D("rail", `
 box-shadow: var(--n-box-shadow-focus);
 `)]), X("round", [D("rail", "border-radius: calc(var(--n-rail-height) / 2);", [D("button", "border-radius: calc(var(--n-button-height) / 2);")])]), Qe("disabled", [Qe("icon", [X("rubber-band", [X("pressed", [D("rail", [D("button", "max-width: var(--n-button-width-pressed);")])]), D("rail", [W("&:active", [D("button", "max-width: var(--n-button-width-pressed);")])]), X("active", [X("pressed", [D("rail", [D("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]), D("rail", [W("&:active", [D("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]), X("active", [D("rail", [D("button", "left: calc(100% - var(--n-button-width) - var(--n-offset))")])]), D("rail", `
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
 `, [D("button-icon", `
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
 `, [rn()]), D("button", `
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
 `)]), X("active", [D("rail", "background-color: var(--n-rail-color-active);")]), X("loading", [D("rail", `
 cursor: wait;
 `)]), X("disabled", [D("rail", `
 cursor: not-allowed;
 opacity: .5;
 `)])]), oa = window.Vue.computed, cz = window.Vue.defineComponent, Gt = window.Vue.h, Zl = window.Vue.ref, uz = window.Vue.toRef;
window.Vue.watchEffect;
const fz = Object.assign(Object.assign({}, _e.props), {
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
let Ar;
const hz = cz({
  name: "Switch",
  props: fz,
  slots: Object,
  setup(e) {
    Ar === void 0 && (typeof CSS < "u" ? typeof CSS.supports < "u" ? Ar = CSS.supports("width", "max(1px)") : Ar = !1 : Ar = !0);
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = qe(e), o = _e("Switch", "-switch", dz, B2, e, t), r = jn(e), {
      mergedSizeRef: i,
      mergedDisabledRef: a
    } = r, l = Zl(e.defaultValue), s = uz(e, "value"), d = Ot(s, l), c = oa(() => d.value === e.checkedValue), h = Zl(!1), p = Zl(!1), v = oa(() => {
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
        "onUpdate:value": k,
        onChange: E,
        onUpdateValue: U
      } = e, {
        nTriggerFormInput: _,
        nTriggerFormChange: M
      } = r;
      k && le(k, T), U && le(U, T), E && le(E, T), l.value = T, _(), M();
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
      e.loading || a.value || (d.value !== e.checkedValue ? f(e.checkedValue) : f(e.uncheckedValue));
    }
    function b() {
      p.value = !0, m();
    }
    function x() {
      p.value = !1, g(), h.value = !1;
    }
    function w(T) {
      e.loading || a.value || T.key === " " && (d.value !== e.checkedValue ? f(e.checkedValue) : f(e.uncheckedValue), h.value = !1);
    }
    function C(T) {
      e.loading || a.value || T.key === " " && (T.preventDefault(), h.value = !0);
    }
    const S = oa(() => {
      const {
        value: T
      } = i, {
        self: {
          opacityDisabled: k,
          railColor: E,
          railColorActive: U,
          buttonBoxShadow: _,
          buttonColor: M,
          boxShadowFocus: I,
          loadingColor: z,
          textColor: G,
          iconColor: L,
          [ae("buttonHeight", T)]: Z,
          [ae("buttonWidth", T)]: te,
          [ae("buttonWidthPressed", T)]: q,
          [ae("railHeight", T)]: A,
          [ae("railWidth", T)]: F,
          [ae("railBorderRadius", T)]: j,
          [ae("buttonBorderRadius", T)]: J
        },
        common: {
          cubicBezierEaseInOut: Q
        }
      } = o.value;
      let ee, de, pe;
      return Ar ? (ee = `calc((${A} - ${Z}) / 2)`, de = `max(${A}, ${Z})`, pe = `max(${F}, calc(${F} + ${Z} - ${A}))`) : (ee = it((xt(A) - xt(Z)) / 2), de = it(Math.max(xt(A), xt(Z))), pe = xt(A) > xt(Z) ? F : it(xt(F) + xt(Z) - xt(A))), {
        "--n-bezier": Q,
        "--n-button-border-radius": J,
        "--n-button-box-shadow": _,
        "--n-button-color": M,
        "--n-button-width": te,
        "--n-button-width-pressed": q,
        "--n-button-height": Z,
        "--n-height": de,
        "--n-offset": ee,
        "--n-opacity-disabled": k,
        "--n-rail-border-radius": j,
        "--n-rail-color": E,
        "--n-rail-color-active": U,
        "--n-rail-height": A,
        "--n-rail-width": F,
        "--n-width": pe,
        "--n-box-shadow-focus": I,
        "--n-loading-color": z,
        "--n-text-color": G,
        "--n-icon-color": L
      };
    }), y = n ? wt("switch", oa(() => i.value[0]), S, e) : void 0;
    return {
      handleClick: u,
      handleBlur: x,
      handleFocus: b,
      handleKeyup: w,
      handleKeydown: C,
      mergedRailStyle: v,
      pressed: h,
      mergedClsPrefix: t,
      mergedValue: d,
      checked: c,
      mergedDisabled: a,
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
      checked: a,
      unchecked: l,
      icon: s,
      "checked-icon": d,
      "unchecked-icon": c
    } = i, h = !(er(s) && er(d) && er(c));
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
    }, We(a, (p) => We(l, (v) => p || v ? Gt("div", {
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
    }, We(s, (p) => We(d, (v) => We(c, (f) => Gt(cr, null, {
      default: () => this.loading ? Gt(ur, {
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
    })))), We(a, (p) => p && Gt("div", {
      key: "checked",
      class: `${e}-switch__checked`
    }, p)), We(l, (p) => p && Gt("div", {
      key: "unchecked",
      class: `${e}-switch__unchecked`
    }, p)))));
  }
}), pz = window.Vue.defineComponent, Fe = window.Vue.unref, ft = window.Vue.createVNode, Lt = window.Vue.withCtx, Jl = window.Vue.openBlock, Yf = window.Vue.createBlock, Zf = window.Vue.createCommentVNode, Jf = window.Vue.toDisplayString, Qf = window.Vue.createTextVNode, vz = window.Vue.resolveDynamicComponent, mz = window.Vue.isRef, gz = window.Vue.createElementBlock, bz = { class: "min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto" }, Ql = window.Vue.computed, wz = window.Vue.getCurrentInstance, yz = window.Vue.h, xz = window.Vue.onBeforeUnmount, eh = window.Vue.onMounted, es = window.Vue.reactive, Yo = window.Vue.ref, Cz = /* @__PURE__ */ pz({
  __name: "BackupView",
  setup(e) {
    const t = window.__TT_PLUGIN_API__, { t: n } = ka(), o = Yo(!1);
    let r = null;
    function i() {
      if (r) {
        o.value = r.matches;
        return;
      }
      typeof window < "u" && (o.value = window.innerWidth <= 640);
    }
    eh(() => {
      typeof window > "u" || (r = window.matchMedia("(max-width: 640px)"), i(), r.addEventListener ? r.addEventListener("change", i) : r.addListener && r.addListener(i));
    }), xz(() => {
      r && (r.removeEventListener ? r.removeEventListener("change", i) : r.removeListener && r.removeListener(i), r = null);
    });
    const a = es({
      dbType: "auto",
      backupType: "dump",
      customCommand: "",
      cron: "0 0 2 * * ?",
      enabled: "Y",
      retentionDays: 7,
      targetDir: ""
    }), l = [
      { label: "Auto", value: "auto" },
      { label: "MySQL", value: "mysql" },
      { label: "PostgreSQL", value: "postgresql" }
    ], s = [
      { label: "Dump", value: "dump" },
      { label: "Custom Command", value: "custom" }
    ], d = Yo(!1), c = Yo(!1), h = () => [
      { title: n("plugin.backup.fileName"), key: "fileName", ellipsis: { tooltip: !0 } },
      {
        title: n("plugin.backup.status"),
        key: "status",
        render: (q) => {
          const A = q.status === "1";
          return yz(la, { type: A ? "success" : "error" }, { default: () => A ? "OK" : "FAIL" });
        }
      },
      { title: n("plugin.backup.fileSize"), key: "fileSize", render: (q) => L(q.fileSize) },
      { title: n("plugin.backup.startTime"), key: "startTime" },
      { title: n("plugin.backup.endTime"), key: "endTime" },
      { title: n("plugin.backup.message"), key: "message", ellipsis: { tooltip: !0 } }
    ], p = {
      page: 1,
      pageSize: 10
    };
    function v() {
      return window.__TT_PLUGIN_API_BASE__ || "/proxy-default";
    }
    function f() {
      const A = Object.keys(localStorage).find((j) => /token$/i.test(j) && !/refresh/i.test(j));
      if (!A) return null;
      const F = localStorage.getItem(A);
      if (!F) return null;
      try {
        return JSON.parse(F);
      } catch {
        return F;
      }
    }
    function m(q, A) {
      if (!A) return q;
      const F = new URLSearchParams();
      Object.entries(A).forEach(([J, Q]) => {
        if (!(Q == null || Q === "")) {
          if (Array.isArray(Q)) {
            Q.forEach((ee) => {
              ee != null && ee !== "" && F.append(J, String(ee));
            });
            return;
          }
          F.append(J, String(Q));
        }
      });
      const j = F.toString();
      return j ? `${q}${q.includes("?") ? "&" : "?"}${j}` : q;
    }
    async function g(q) {
      var ee;
      const A = {
        "Content-Type": "application/json"
      }, F = f();
      F && (A.Authorization = F.startsWith("Bearer ") ? F : `Bearer ${F}`);
      const j = m(`${v()}${q.url}`, q.params), J = await fetch(j, {
        method: q.method || "GET",
        headers: A,
        body: q.data ? JSON.stringify(q.data) : void 0
      }), Q = await J.json();
      if (Q && typeof Q == "object" && "code" in Q) {
        if (Q.code !== 200) {
          const de = Q.message || n("common.error");
          return (ee = window.$message) == null || ee.error(de), { data: Q.data, error: de, response: J };
        }
        return { data: Q.data ?? Q, error: null, response: J };
      }
      return { data: Q, error: null, response: J };
    }
    async function u(q) {
      return t != null && t.request ? t.request(q) : g(q);
    }
    async function b(q) {
      const A = await u(q);
      if (A.error)
        throw new Error(A.error);
      return A.data;
    }
    async function x(q) {
      return await u({
        url: "/plugin/backup/records/page",
        method: "POST",
        data: q
      });
    }
    async function w() {
      const q = await b({ url: "/plugin/backup/config" });
      Object.assign(a, q);
    }
    async function C(q = !1) {
      var A;
      d.value = !0;
      try {
        const F = await b({ url: "/plugin/backup/config", method: "PUT", data: a });
        Object.assign(a, F), q || (A = window.$message) == null || A.success(n("common.saveSuccess"));
      } finally {
        d.value = !1;
      }
    }
    async function S() {
      var q;
      c.value = !0;
      try {
        await C(!0), await b({ url: "/plugin/backup/run", method: "POST" }), (q = window.$message) == null || q.success(n("plugin.backup.run")), await I(), await w();
      } finally {
        c.value = !1;
      }
    }
    const y = te(), T = (t == null ? void 0 : t.useTable) ?? y.useTable, { loading: k, data: E, columns: U, columnChecks: _, pagination: M, getData: I, getDataByPage: z } = T({
      apiFn: x,
      apiParams: p,
      columns: h,
      transformer: (q) => {
        const A = (q == null ? void 0 : q.data) || {}, { records: F = [], page: j = 1, pageSize: J = 10, total: Q = 0 } = A;
        return {
          data: F,
          pageNum: j,
          pageSize: J,
          total: Q
        };
      }
    }), G = Ql(() => {
      var A;
      const q = wz();
      return ((A = t == null ? void 0 : t.components) == null ? void 0 : A.TableHeaderOperation) || (q == null ? void 0 : q.appContext.components.TableHeaderOperation) || null;
    });
    function L(q) {
      if (!q) return "0 B";
      const A = ["B", "KB", "MB", "GB", "TB"];
      let F = 0, j = q;
      for (; j >= 1024 && F < A.length - 1; )
        j /= 1024, F += 1;
      return `${j.toFixed(2)} ${A[F]}`;
    }
    function Z(q) {
      return q || "--";
    }
    function te() {
      function q(j) {
        return j.map((J) => J.type === "selection" ? { key: "__selection__", title: n("common.check"), checked: !0 } : J.type === "expand" ? { key: "__expand__", title: n("common.expandColumn"), checked: !0 } : {
          key: J.key,
          title: J.title,
          checked: !0
        });
      }
      function A(j, J) {
        const Q = /* @__PURE__ */ new Map();
        return j.forEach((ee) => {
          if (ee.type === "selection") {
            Q.set("__selection__", ee);
            return;
          }
          if (ee.type === "expand") {
            Q.set("__expand__", ee);
            return;
          }
          Q.set(ee.key, ee);
        }), J.filter((ee) => ee.checked).map((ee) => Q.get(ee.key));
      }
      function F(j) {
        const J = Yo(!1), Q = Yo([]), ee = es({ ...j.apiParams || {} }), de = Ql(() => j.columns()), pe = Yo([]), Y = Ql(() => {
          const be = de.value || [];
          return pe.value.length === 0 && (pe.value = q(be)), A(be, pe.value);
        }), se = es({
          page: ee.page ?? 1,
          pageSize: ee.pageSize ?? 10,
          itemCount: 0,
          onChange: (be) => {
            se.page = be, ee.page = be, $e();
          },
          onUpdatePageSize: (be) => {
            se.pageSize = be, se.page = 1, ee.page = 1, ee.pageSize = be, $e();
          }
        });
        async function $e() {
          J.value = !0;
          try {
            const be = await j.apiFn({ ...ee }), Ce = j.transformer(be);
            Q.value = Ce.data || [], se.page = Ce.pageNum, se.pageSize = Ce.pageSize, se.itemCount = Ce.total;
          } finally {
            J.value = !1;
          }
        }
        async function me(be = 1) {
          se.page = be, ee.page = be, ee.pageSize = se.pageSize, await $e();
        }
        return j.immediate !== !1 && $e(), {
          loading: J,
          data: Q,
          columns: Y,
          columnChecks: pe,
          pagination: se,
          getData: $e,
          getDataByPage: me
        };
      }
      return { useTable: F };
    }
    return eh(async () => {
      await w(), await z(1);
    }), (q, A) => (Jl(), gz("div", bz, [
      ft(Fe(ju), {
        title: Fe(n)("plugin.backup.config"),
        size: "small",
        bordered: !1,
        class: "card-wrapper"
      }, {
        default: Lt(() => [
          ft(Fe(U2), {
            "label-placement": "left",
            "label-width": "120",
            model: a,
            size: "small"
          }, {
            default: Lt(() => [
              ft(Fe(JO), {
                cols: "2",
                "x-gap": "16",
                "y-gap": "8",
                responsive: "screen"
              }, {
                default: Lt(() => [
                  ft(Fe(no), {
                    label: Fe(n)("plugin.backup.enabled")
                  }, {
                    default: Lt(() => [
                      ft(Fe(hz), {
                        value: a.enabled,
                        "onUpdate:value": A[0] || (A[0] = (F) => a.enabled = F),
                        "checked-value": "Y",
                        "unchecked-value": "N"
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["label"]),
                  ft(Fe(no), {
                    label: Fe(n)("plugin.backup.cron")
                  }, {
                    default: Lt(() => [
                      ft(Fe($o), {
                        value: a.cron,
                        "onUpdate:value": A[1] || (A[1] = (F) => a.cron = F),
                        placeholder: "0 0 2 * * ?"
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["label"]),
                  ft(Fe(no), {
                    label: Fe(n)("plugin.backup.dbType")
                  }, {
                    default: Lt(() => [
                      ft(Fe(_s), {
                        value: a.dbType,
                        "onUpdate:value": A[2] || (A[2] = (F) => a.dbType = F),
                        options: l
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["label"]),
                  ft(Fe(no), {
                    label: Fe(n)("plugin.backup.backupType")
                  }, {
                    default: Lt(() => [
                      ft(Fe(_s), {
                        value: a.backupType,
                        "onUpdate:value": A[3] || (A[3] = (F) => a.backupType = F),
                        options: s
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["label"]),
                  ft(Fe(no), {
                    label: Fe(n)("plugin.backup.targetDir")
                  }, {
                    default: Lt(() => [
                      ft(Fe($o), {
                        value: a.targetDir,
                        "onUpdate:value": A[4] || (A[4] = (F) => a.targetDir = F),
                        placeholder: "C:\\\\backup"
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["label"]),
                  ft(Fe(no), {
                    label: Fe(n)("plugin.backup.retentionDays")
                  }, {
                    default: Lt(() => [
                      ft(Fe(sz), {
                        value: a.retentionDays,
                        "onUpdate:value": A[5] || (A[5] = (F) => a.retentionDays = F),
                        min: 1,
                        max: 365
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["label"]),
                  a.backupType === "custom" ? (Jl(), Yf(Fe(no), {
                    key: 0,
                    label: Fe(n)("plugin.backup.customCommand"),
                    span: "2"
                  }, {
                    default: Lt(() => [
                      ft(Fe($o), {
                        value: a.customCommand,
                        "onUpdate:value": A[6] || (A[6] = (F) => a.customCommand = F),
                        placeholder: "mysqldump -h {host} -P {port} -u {user} {database} --result-file={file}",
                        type: "textarea",
                        autosize: { minRows: 2, maxRows: 4 }
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["label"])) : Zf("v-if", !0),
                  ft(Fe(no), {
                    label: Fe(n)("plugin.backup.lastRunTime")
                  }, {
                    default: Lt(() => [
                      ft(Fe($o), {
                        value: Z(a.lastRunTime),
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
          ft(Fe(E2), {
            justify: "end",
            class: "action-row"
          }, {
            default: Lt(() => [
              ft(Fe(ii), {
                type: "primary",
                onClick: C,
                loading: d.value
              }, {
                default: Lt(() => [
                  Qf(
                    Jf(Fe(n)("plugin.backup.save")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }, 8, ["loading"]),
              ft(Fe(ii), {
                type: "success",
                onClick: S,
                loading: c.value
              }, {
                default: Lt(() => [
                  Qf(
                    Jf(Fe(n)("plugin.backup.run")),
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
      ft(Fe(ju), {
        title: Fe(n)("plugin.backup.records"),
        size: "small",
        bordered: !1,
        class: "sm:flex-1-hidden card-wrapper",
        "content-class": "flex-col"
      }, {
        default: Lt(() => [
          G.value ? (Jl(), Yf(vz(G.value), {
            key: 0,
            columns: Fe(_),
            "onUpdate:columns": A[7] || (A[7] = (F) => mz(_) ? _.value = F : null),
            loading: Fe(k),
            "disabled-add": !0,
            "disabled-delete": !0,
            onRefresh: Fe(I)
          }, null, 40, ["columns", "loading", "onRefresh"])) : Zf("v-if", !0),
          ft(Fe(C2), {
            remote: "",
            size: "small",
            class: "sm:h-full",
            columns: Fe(U),
            data: Fe(E),
            loading: Fe(k),
            pagination: Fe(M),
            "row-key": (F) => F.id,
            "single-line": !1,
            "flex-height": !o.value
          }, null, 8, ["columns", "data", "loading", "pagination", "row-key", "flex-height"])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["title"])
    ]));
  }
}), Sz = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, kz = /* @__PURE__ */ Sz(Cz, [["__scopeId", "data-v-49ac1313"]]);
export {
  kz as default
};
