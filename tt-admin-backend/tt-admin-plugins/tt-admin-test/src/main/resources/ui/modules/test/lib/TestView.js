/*!
  * shared v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Ym(e, t) {
  typeof console < "u" && (console.warn("[intlify] " + e), t && console.warn(t.stack));
}
const nc = typeof window < "u", Oo = (e, t = !1) => t ? Symbol.for(e) : Symbol(e), Zm = (e, t, n) => Jm({ l: e, k: t, s: n }), Jm = (e) => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027"), Rt = (e) => typeof e == "number" && isFinite(e), Qm = (e) => ad(e) === "[object Date]", ka = (e) => ad(e) === "[object RegExp]", Ba = (e) => Ue(e) && Object.keys(e).length === 0, kt = Object.assign, eg = Object.create, tt = (e = null) => eg(e);
let oc;
const xo = () => oc || (oc = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : tt());
function rc(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function ic(e) {
  return e.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function tg(e) {
  return e = e.replace(/(\w+)\s*=\s*"([^"]*)"/g, (o, r, i) => `${r}="${ic(i)}"`), e = e.replace(/(\w+)\s*=\s*'([^']*)'/g, (o, r, i) => `${r}='${ic(i)}'`), /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi.test(e) && (e = e.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3")), [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ].forEach((o) => {
    e = e.replace(o, "$1javascript&#58;");
  }), e;
}
const ng = Object.prototype.hasOwnProperty;
function pn(e, t) {
  return ng.call(e, t);
}
const wt = Array.isArray, ht = (e) => typeof e == "function", ge = (e) => typeof e == "string", bt = (e) => typeof e == "boolean", Ke = (e) => e !== null && typeof e == "object", og = (e) => Ke(e) && ht(e.then) && ht(e.catch), Lh = Object.prototype.toString, ad = (e) => Lh.call(e), Ue = (e) => ad(e) === "[object Object]", rg = (e) => e == null ? "" : wt(e) || Ue(e) && e.toString === Lh ? JSON.stringify(e, null, 2) : String(e);
function ld(e, t = "") {
  return e.reduce((n, o, r) => r === 0 ? n + o : n + t + o, "");
}
const Ci = (e) => !Ke(e) || wt(e);
function Ca(e, t) {
  if (Ci(e) || Ci(t))
    throw new Error("Invalid value");
  const n = [{ src: e, des: t }];
  for (; n.length; ) {
    const { src: o, des: r } = n.pop();
    Object.keys(o).forEach((i) => {
      i !== "__proto__" && (Ke(o[i]) && !Ke(r[i]) && (r[i] = Array.isArray(o[i]) ? [] : tt()), Ci(r[i]) || Ci(o[i]) ? r[i] = o[i] : n.push({ src: o[i], des: r[i] }));
    });
  }
}
/*!
  * message-compiler v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function ig(e, t, n) {
  return { line: e, column: t, offset: n };
}
function Cs(e, t, n) {
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
}, ag = 17;
function La(e, t, n = {}) {
  const { domain: o, messages: r, args: i } = n, l = e, a = new SyntaxError(String(l));
  return a.code = e, t && (a.location = t), a.domain = o, a;
}
function lg(e) {
  throw e;
}
const gn = " ", sg = "\r", Ft = `
`, dg = "\u2028", cg = "\u2029";
function ug(e) {
  const t = e;
  let n = 0, o = 1, r = 1, i = 0;
  const l = (b) => t[b] === sg && t[b + 1] === Ft, a = (b) => t[b] === Ft, s = (b) => t[b] === cg, d = (b) => t[b] === dg, c = (b) => l(b) || a(b) || s(b) || d(b), h = () => n, p = () => o, v = () => r, f = () => i, m = (b) => l(b) || s(b) || d(b) ? Ft : t[b], g = () => m(n), u = () => m(n + i);
  function w() {
    return i = 0, c(n) && (o++, r = 0), l(n) && n++, n++, r++, t[n];
  }
  function x() {
    return l(n + i) && i++, i++, t[n + i];
  }
  function y() {
    n = 0, o = 1, r = 1, i = 0;
  }
  function C(b = 0) {
    i = b;
  }
  function S() {
    const b = n + i;
    for (; b !== n; )
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
    peek: x,
    reset: y,
    resetPeek: C,
    skipToPeek: S
  };
}
const Mn = void 0, fg = ".", ac = "'", hg = "tokenizer";
function pg(e, t = {}) {
  const n = t.location !== !1, o = ug(e), r = () => o.index(), i = () => ig(o.line(), o.column(), o.index()), l = i(), a = r(), s = {
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
  function h(F, _, W, ...ne) {
    const ye = d();
    if (_.column += W, _.offset += W, c) {
      const he = n ? Cs(ye.startLoc, _) : null, E = La(F, he, {
        domain: hg,
        args: ne
      });
      c(E);
    }
  }
  function p(F, _, W) {
    F.endLoc = i(), F.currentType = _;
    const ne = { type: _ };
    return n && (ne.loc = Cs(F.startLoc, F.endLoc)), W != null && (ne.value = W), ne;
  }
  const v = (F) => p(
    F,
    13
    /* TokenTypes.EOF */
  );
  function f(F, _) {
    return F.currentChar() === _ ? (F.next(), _) : (h(Xe.EXPECTED_TOKEN, i(), 0, _), "");
  }
  function m(F) {
    let _ = "";
    for (; F.currentPeek() === gn || F.currentPeek() === Ft; )
      _ += F.currentPeek(), F.peek();
    return _;
  }
  function g(F) {
    const _ = m(F);
    return F.skipToPeek(), _;
  }
  function u(F) {
    if (F === Mn)
      return !1;
    const _ = F.charCodeAt(0);
    return _ >= 97 && _ <= 122 || // a-z
    _ >= 65 && _ <= 90 || // A-Z
    _ === 95;
  }
  function w(F) {
    if (F === Mn)
      return !1;
    const _ = F.charCodeAt(0);
    return _ >= 48 && _ <= 57;
  }
  function x(F, _) {
    const { currentType: W } = _;
    if (W !== 2)
      return !1;
    m(F);
    const ne = u(F.currentPeek());
    return F.resetPeek(), ne;
  }
  function y(F, _) {
    const { currentType: W } = _;
    if (W !== 2)
      return !1;
    m(F);
    const ne = F.currentPeek() === "-" ? F.peek() : F.currentPeek(), ye = w(ne);
    return F.resetPeek(), ye;
  }
  function C(F, _) {
    const { currentType: W } = _;
    if (W !== 2)
      return !1;
    m(F);
    const ne = F.currentPeek() === ac;
    return F.resetPeek(), ne;
  }
  function S(F, _) {
    const { currentType: W } = _;
    if (W !== 7)
      return !1;
    m(F);
    const ne = F.currentPeek() === ".";
    return F.resetPeek(), ne;
  }
  function b(F, _) {
    const { currentType: W } = _;
    if (W !== 8)
      return !1;
    m(F);
    const ne = u(F.currentPeek());
    return F.resetPeek(), ne;
  }
  function R(F, _) {
    const { currentType: W } = _;
    if (!(W === 7 || W === 11))
      return !1;
    m(F);
    const ne = F.currentPeek() === ":";
    return F.resetPeek(), ne;
  }
  function $(F, _) {
    const { currentType: W } = _;
    if (W !== 9)
      return !1;
    const ne = () => {
      const he = F.currentPeek();
      return he === "{" ? u(F.peek()) : he === "@" || he === "|" || he === ":" || he === "." || he === gn || !he ? !1 : he === Ft ? (F.peek(), ne()) : H(F, !1);
    }, ye = ne();
    return F.resetPeek(), ye;
  }
  function T(F) {
    m(F);
    const _ = F.currentPeek() === "|";
    return F.resetPeek(), _;
  }
  function H(F, _ = !0) {
    const W = (ye = !1, he = "") => {
      const E = F.currentPeek();
      return E === "{" || E === "@" || !E ? ye : E === "|" ? !(he === gn || he === Ft) : E === gn ? (F.peek(), W(!0, gn)) : E === Ft ? (F.peek(), W(!0, Ft)) : !0;
    }, ne = W();
    return _ && F.resetPeek(), ne;
  }
  function P(F, _) {
    const W = F.currentChar();
    return W === Mn ? Mn : _(W) ? (F.next(), W) : null;
  }
  function z(F) {
    const _ = F.charCodeAt(0);
    return _ >= 97 && _ <= 122 || // a-z
    _ >= 65 && _ <= 90 || // A-Z
    _ >= 48 && _ <= 57 || // 0-9
    _ === 95 || // _
    _ === 36;
  }
  function M(F) {
    return P(F, z);
  }
  function O(F) {
    const _ = F.charCodeAt(0);
    return _ >= 97 && _ <= 122 || // a-z
    _ >= 65 && _ <= 90 || // A-Z
    _ >= 48 && _ <= 57 || // 0-9
    _ === 95 || // _
    _ === 36 || // $
    _ === 45;
  }
  function U(F) {
    return P(F, O);
  }
  function L(F) {
    const _ = F.charCodeAt(0);
    return _ >= 48 && _ <= 57;
  }
  function Y(F) {
    return P(F, L);
  }
  function te(F) {
    const _ = F.charCodeAt(0);
    return _ >= 48 && _ <= 57 || // 0-9
    _ >= 65 && _ <= 70 || // A-F
    _ >= 97 && _ <= 102;
  }
  function J(F) {
    return P(F, te);
  }
  function X(F) {
    let _ = "", W = "";
    for (; _ = Y(F); )
      W += _;
    return W;
  }
  function A(F) {
    let _ = "";
    for (; ; ) {
      const W = F.currentChar();
      if (W === "{" || W === "}" || W === "@" || W === "|" || !W)
        break;
      if (W === gn || W === Ft)
        if (H(F))
          _ += W, F.next();
        else {
          if (T(F))
            break;
          _ += W, F.next();
        }
      else
        _ += W, F.next();
    }
    return _;
  }
  function G(F) {
    g(F);
    let _ = "", W = "";
    for (; _ = U(F); )
      W += _;
    const ne = F.currentChar();
    if (ne && ne !== "}" && ne !== Mn && ne !== gn && ne !== Ft && ne !== "　") {
      const ye = se(F);
      return h(Xe.INVALID_TOKEN_IN_PLACEHOLDER, i(), 0, W + ye), W + ye;
    }
    return F.currentChar() === Mn && h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), W;
  }
  function Z(F) {
    g(F);
    let _ = "";
    return F.currentChar() === "-" ? (F.next(), _ += `-${X(F)}`) : _ += X(F), F.currentChar() === Mn && h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), _;
  }
  function ie(F) {
    return F !== ac && F !== Ft;
  }
  function ae(F) {
    g(F), f(F, "'");
    let _ = "", W = "";
    for (; _ = P(F, ie); )
      _ === "\\" ? W += ue(F) : W += _;
    const ne = F.currentChar();
    return ne === Ft || ne === Mn ? (h(Xe.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, i(), 0), ne === Ft && (F.next(), f(F, "'")), W) : (f(F, "'"), W);
  }
  function ue(F) {
    const _ = F.currentChar();
    switch (_) {
      case "\\":
      case "'":
        return F.next(), `\\${_}`;
      case "u":
        return be(F, _, 4);
      case "U":
        return be(F, _, 6);
      default:
        return h(Xe.UNKNOWN_ESCAPE_SEQUENCE, i(), 0, _), "";
    }
  }
  function be(F, _, W) {
    f(F, _);
    let ne = "";
    for (let ye = 0; ye < W; ye++) {
      const he = J(F);
      if (!he) {
        h(Xe.INVALID_UNICODE_ESCAPE_SEQUENCE, i(), 0, `\\${_}${ne}${F.currentChar()}`);
        break;
      }
      ne += he;
    }
    return `\\${_}${ne}`;
  }
  function q(F) {
    return F !== "{" && F !== "}" && F !== gn && F !== Ft;
  }
  function se(F) {
    g(F);
    let _ = "", W = "";
    for (; _ = P(F, q); )
      W += _;
    return W;
  }
  function Pe(F) {
    let _ = "", W = "";
    for (; _ = M(F); )
      W += _;
    return W;
  }
  function ve(F) {
    const _ = (W) => {
      const ne = F.currentChar();
      return ne === "{" || ne === "@" || ne === "|" || ne === "(" || ne === ")" || !ne || ne === gn ? W : (W += ne, F.next(), _(W));
    };
    return _("");
  }
  function $e(F) {
    g(F);
    const _ = f(
      F,
      "|"
      /* TokenChars.Pipe */
    );
    return g(F), _;
  }
  function Se(F, _) {
    let W = null;
    switch (F.currentChar()) {
      case "{":
        return _.braceNest >= 1 && h(Xe.NOT_ALLOW_NEST_PLACEHOLDER, i(), 0), F.next(), W = p(
          _,
          2,
          "{"
          /* TokenChars.BraceLeft */
        ), g(F), _.braceNest++, W;
      case "}":
        return _.braceNest > 0 && _.currentType === 2 && h(Xe.EMPTY_PLACEHOLDER, i(), 0), F.next(), W = p(
          _,
          3,
          "}"
          /* TokenChars.BraceRight */
        ), _.braceNest--, _.braceNest > 0 && g(F), _.inLinked && _.braceNest === 0 && (_.inLinked = !1), W;
      case "@":
        return _.braceNest > 0 && h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), W = De(F, _) || v(_), _.braceNest = 0, W;
      default: {
        let ye = !0, he = !0, E = !0;
        if (T(F))
          return _.braceNest > 0 && h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), W = p(_, 1, $e(F)), _.braceNest = 0, _.inLinked = !1, W;
        if (_.braceNest > 0 && (_.currentType === 4 || _.currentType === 5 || _.currentType === 6))
          return h(Xe.UNTERMINATED_CLOSING_BRACE, i(), 0), _.braceNest = 0, Ie(F, _);
        if (ye = x(F, _))
          return W = p(_, 4, G(F)), g(F), W;
        if (he = y(F, _))
          return W = p(_, 5, Z(F)), g(F), W;
        if (E = C(F, _))
          return W = p(_, 6, ae(F)), g(F), W;
        if (!ye && !he && !E)
          return W = p(_, 12, se(F)), h(Xe.INVALID_TOKEN_IN_PLACEHOLDER, i(), 0, W.value), g(F), W;
        break;
      }
    }
    return W;
  }
  function De(F, _) {
    const { currentType: W } = _;
    let ne = null;
    const ye = F.currentChar();
    switch ((W === 7 || W === 8 || W === 11 || W === 9) && (ye === Ft || ye === gn) && h(Xe.INVALID_LINKED_FORMAT, i(), 0), ye) {
      case "@":
        return F.next(), ne = p(
          _,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        ), _.inLinked = !0, ne;
      case ".":
        return g(F), F.next(), p(
          _,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        return g(F), F.next(), p(
          _,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        return T(F) ? (ne = p(_, 1, $e(F)), _.braceNest = 0, _.inLinked = !1, ne) : S(F, _) || R(F, _) ? (g(F), De(F, _)) : b(F, _) ? (g(F), p(_, 11, Pe(F))) : $(F, _) ? (g(F), ye === "{" ? Se(F, _) || ne : p(_, 10, ve(F))) : (W === 7 && h(Xe.INVALID_LINKED_FORMAT, i(), 0), _.braceNest = 0, _.inLinked = !1, Ie(F, _));
    }
  }
  function Ie(F, _) {
    let W = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (_.braceNest > 0)
      return Se(F, _) || v(_);
    if (_.inLinked)
      return De(F, _) || v(_);
    switch (F.currentChar()) {
      case "{":
        return Se(F, _) || v(_);
      case "}":
        return h(Xe.UNBALANCED_CLOSING_BRACE, i(), 0), F.next(), p(
          _,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return De(F, _) || v(_);
      default: {
        if (T(F))
          return W = p(_, 1, $e(F)), _.braceNest = 0, _.inLinked = !1, W;
        if (H(F))
          return p(_, 0, A(F));
        break;
      }
    }
    return W;
  }
  function Je() {
    const { currentType: F, offset: _, startLoc: W, endLoc: ne } = s;
    return s.lastType = F, s.lastOffset = _, s.lastStartLoc = W, s.lastEndLoc = ne, s.offset = r(), s.startLoc = i(), o.currentChar() === Mn ? p(
      s,
      13
      /* TokenTypes.EOF */
    ) : Ie(o, s);
  }
  return {
    nextToken: Je,
    currentOffset: r,
    currentPosition: i,
    context: d
  };
}
const vg = "parser", mg = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function gg(e, t, n) {
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
function bg(e = {}) {
  const t = e.location !== !1, { onError: n } = e;
  function o(u, w, x, y, ...C) {
    const S = u.currentPosition();
    if (S.offset += y, S.column += y, n) {
      const b = t ? Cs(x, S) : null, R = La(w, b, {
        domain: vg,
        args: C
      });
      n(R);
    }
  }
  function r(u, w, x) {
    const y = { type: u };
    return t && (y.start = w, y.end = w, y.loc = { start: x, end: x }), y;
  }
  function i(u, w, x, y) {
    t && (u.end = w, u.loc && (u.loc.end = x));
  }
  function l(u, w) {
    const x = u.context(), y = r(3, x.offset, x.startLoc);
    return y.value = w, i(y, u.currentOffset(), u.currentPosition()), y;
  }
  function a(u, w) {
    const x = u.context(), { lastOffset: y, lastStartLoc: C } = x, S = r(5, y, C);
    return S.index = parseInt(w, 10), u.nextToken(), i(S, u.currentOffset(), u.currentPosition()), S;
  }
  function s(u, w) {
    const x = u.context(), { lastOffset: y, lastStartLoc: C } = x, S = r(4, y, C);
    return S.key = w, u.nextToken(), i(S, u.currentOffset(), u.currentPosition()), S;
  }
  function d(u, w) {
    const x = u.context(), { lastOffset: y, lastStartLoc: C } = x, S = r(9, y, C);
    return S.value = w.replace(mg, gg), u.nextToken(), i(S, u.currentOffset(), u.currentPosition()), S;
  }
  function c(u) {
    const w = u.nextToken(), x = u.context(), { lastOffset: y, lastStartLoc: C } = x, S = r(8, y, C);
    return w.type !== 11 ? (o(u, Xe.UNEXPECTED_EMPTY_LINKED_MODIFIER, x.lastStartLoc, 0), S.value = "", i(S, y, C), {
      nextConsumeToken: w,
      node: S
    }) : (w.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, bn(w)), S.value = w.value || "", i(S, u.currentOffset(), u.currentPosition()), {
      node: S
    });
  }
  function h(u, w) {
    const x = u.context(), y = r(7, x.offset, x.startLoc);
    return y.value = w, i(y, u.currentOffset(), u.currentPosition()), y;
  }
  function p(u) {
    const w = u.context(), x = r(6, w.offset, w.startLoc);
    let y = u.nextToken();
    if (y.type === 8) {
      const C = c(u);
      x.modifier = C.node, y = C.nextConsumeToken || u.nextToken();
    }
    switch (y.type !== 9 && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn(y)), y = u.nextToken(), y.type === 2 && (y = u.nextToken()), y.type) {
      case 10:
        y.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn(y)), x.key = h(u, y.value || "");
        break;
      case 4:
        y.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn(y)), x.key = s(u, y.value || "");
        break;
      case 5:
        y.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn(y)), x.key = a(u, y.value || "");
        break;
      case 6:
        y.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn(y)), x.key = d(u, y.value || "");
        break;
      default: {
        o(u, Xe.UNEXPECTED_EMPTY_LINKED_KEY, w.lastStartLoc, 0);
        const C = u.context(), S = r(7, C.offset, C.startLoc);
        return S.value = "", i(S, C.offset, C.startLoc), x.key = S, i(x, C.offset, C.startLoc), {
          nextConsumeToken: y,
          node: x
        };
      }
    }
    return i(x, u.currentOffset(), u.currentPosition()), {
      node: x
    };
  }
  function v(u) {
    const w = u.context(), x = w.currentType === 1 ? u.currentOffset() : w.offset, y = w.currentType === 1 ? w.endLoc : w.startLoc, C = r(2, x, y);
    C.items = [];
    let S = null;
    do {
      const $ = S || u.nextToken();
      switch (S = null, $.type) {
        case 0:
          $.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn($)), C.items.push(l(u, $.value || ""));
          break;
        case 5:
          $.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn($)), C.items.push(a(u, $.value || ""));
          break;
        case 4:
          $.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn($)), C.items.push(s(u, $.value || ""));
          break;
        case 6:
          $.value == null && o(u, Xe.UNEXPECTED_LEXICAL_ANALYSIS, w.lastStartLoc, 0, bn($)), C.items.push(d(u, $.value || ""));
          break;
        case 7: {
          const T = p(u);
          C.items.push(T.node), S = T.nextConsumeToken || null;
          break;
        }
      }
    } while (w.currentType !== 13 && w.currentType !== 1);
    const b = w.currentType === 1 ? w.lastOffset : u.currentOffset(), R = w.currentType === 1 ? w.lastEndLoc : u.currentPosition();
    return i(C, b, R), C;
  }
  function f(u, w, x, y) {
    const C = u.context();
    let S = y.items.length === 0;
    const b = r(1, w, x);
    b.cases = [], b.cases.push(y);
    do {
      const R = v(u);
      S || (S = R.items.length === 0), b.cases.push(R);
    } while (C.currentType !== 13);
    return S && o(u, Xe.MUST_HAVE_MESSAGES_IN_PLURAL, x, 0), i(b, u.currentOffset(), u.currentPosition()), b;
  }
  function m(u) {
    const w = u.context(), { offset: x, startLoc: y } = w, C = v(u);
    return w.currentType === 13 ? C : f(u, x, y, C);
  }
  function g(u) {
    const w = pg(u, kt({}, e)), x = w.context(), y = r(0, x.offset, x.startLoc);
    return t && y.loc && (y.loc.source = u), y.body = m(w), e.onCacheKey && (y.cacheKey = e.onCacheKey(u)), x.currentType !== 13 && o(w, Xe.UNEXPECTED_LEXICAL_ANALYSIS, x.lastStartLoc, 0, u[x.offset] || ""), i(y, w.currentOffset(), w.currentPosition()), y;
  }
  return { parse: g };
}
function bn(e) {
  if (e.type === 13)
    return "EOF";
  const t = (e.value || "").replace(/\r?\n/gu, "\\n");
  return t.length > 10 ? t.slice(0, 9) + "…" : t;
}
function wg(e, t = {}) {
  const n = {
    ast: e,
    helpers: /* @__PURE__ */ new Set()
  };
  return { context: () => n, helper: (i) => (n.helpers.add(i), i) };
}
function lc(e, t) {
  for (let n = 0; n < e.length; n++)
    sd(e[n], t);
}
function sd(e, t) {
  switch (e.type) {
    case 1:
      lc(e.cases, t), t.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      lc(e.items, t);
      break;
    case 6: {
      sd(e.key, t), t.helper(
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
function yg(e, t = {}) {
  const n = wg(e);
  n.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  ), e.body && sd(e.body, n);
  const o = n.context();
  e.helpers = Array.from(o.helpers);
}
function xg(e) {
  const t = e.body;
  return t.type === 2 ? sc(t) : t.cases.forEach((n) => sc(n)), e;
}
function sc(e) {
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
      e.static = ld(t);
      for (let n = 0; n < e.items.length; n++) {
        const o = e.items[n];
        (o.type === 3 || o.type === 9) && delete o.value;
      }
    }
  }
}
function ar(e) {
  switch (e.t = e.type, e.type) {
    case 0: {
      const t = e;
      ar(t.body), t.b = t.body, delete t.body;
      break;
    }
    case 1: {
      const t = e, n = t.cases;
      for (let o = 0; o < n.length; o++)
        ar(n[o]);
      t.c = n, delete t.cases;
      break;
    }
    case 2: {
      const t = e, n = t.items;
      for (let o = 0; o < n.length; o++)
        ar(n[o]);
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
      ar(t.key), t.k = t.key, delete t.key, t.modifier && (ar(t.modifier), t.m = t.modifier, delete t.modifier);
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
function Cg(e, t) {
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
function Sg(e, t) {
  const { helper: n } = e;
  e.push(`${n(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`), dr(e, t.key), t.modifier ? (e.push(", "), dr(e, t.modifier), e.push(", _type")) : e.push(", undefined, _type"), e.push(")");
}
function $g(e, t) {
  const { helper: n, needIndent: o } = e;
  e.push(`${n(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`), e.indent(o());
  const r = t.items.length;
  for (let i = 0; i < r && (dr(e, t.items[i]), i !== r - 1); i++)
    e.push(", ");
  e.deindent(o()), e.push("])");
}
function Rg(e, t) {
  const { helper: n, needIndent: o } = e;
  if (t.cases.length > 1) {
    e.push(`${n(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`), e.indent(o());
    const r = t.cases.length;
    for (let i = 0; i < r && (dr(e, t.cases[i]), i !== r - 1); i++)
      e.push(", ");
    e.deindent(o()), e.push("])");
  }
}
function kg(e, t) {
  t.body ? dr(e, t.body) : e.push("null");
}
function dr(e, t) {
  const { helper: n } = e;
  switch (t.type) {
    case 0:
      kg(e, t);
      break;
    case 1:
      Rg(e, t);
      break;
    case 2:
      $g(e, t);
      break;
    case 6:
      Sg(e, t);
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
const Pg = (e, t = {}) => {
  const n = ge(t.mode) ? t.mode : "normal", o = ge(t.filename) ? t.filename : "message.intl";
  t.sourceMap;
  const r = t.breakLineCode != null ? t.breakLineCode : n === "arrow" ? ";" : `
`, i = t.needIndent ? t.needIndent : n !== "arrow", l = e.helpers || [], a = Cg(e, {
    filename: o,
    breakLineCode: r,
    needIndent: i
  });
  a.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"), a.indent(i), l.length > 0 && (a.push(`const { ${ld(l.map((c) => `${c}: _${c}`), ", ")} } = ctx`), a.newline()), a.push("return "), dr(a, e), a.deindent(i), a.push("}"), delete e.helpers;
  const { code: s, map: d } = a.context();
  return {
    ast: e,
    code: s,
    map: d ? d.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function _g(e, t = {}) {
  const n = kt({}, t), o = !!n.jit, r = !!n.minify, i = n.optimize == null ? !0 : n.optimize, a = bg(n).parse(e);
  return o ? (i && xg(a), r && ar(a), { ast: a, code: "" }) : (yg(a, n), Pg(a, n));
}
/*!
  * core-base v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
function Tg() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (xo().__INTLIFY_PROD_DEVTOOLS__ = !1), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (xo().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1);
}
function $n(e) {
  return Ke(e) && dd(e) === 0 && (pn(e, "b") || pn(e, "body"));
}
const Dh = ["b", "body"];
function Fg(e) {
  return uo(e, Dh);
}
const Nh = ["c", "cases"];
function Eg(e) {
  return uo(e, Nh, []);
}
const Hh = ["s", "static"];
function Og(e) {
  return uo(e, Hh);
}
const jh = ["i", "items"];
function zg(e) {
  return uo(e, jh, []);
}
const Wh = ["t", "type"];
function dd(e) {
  return uo(e, Wh);
}
const Uh = ["v", "value"];
function Si(e, t) {
  const n = uo(e, Uh);
  if (n != null)
    return n;
  throw ei(t);
}
const Kh = ["m", "modifier"];
function Mg(e) {
  return uo(e, Kh);
}
const qh = ["k", "key"];
function Ig(e) {
  const t = uo(e, qh);
  if (t)
    return t;
  throw ei(
    6
    /* NodeTypes.Linked */
  );
}
function uo(e, t, n) {
  for (let o = 0; o < t.length; o++) {
    const r = t[o];
    if (pn(e, r) && e[r] != null)
      return e[r];
  }
  return n;
}
const Gh = [
  ...Dh,
  ...Nh,
  ...Hh,
  ...jh,
  ...qh,
  ...Kh,
  ...Uh,
  ...Wh
];
function ei(e) {
  return new Error(`unhandled node type: ${e}`);
}
function dl(e) {
  return (n) => Ag(n, e);
}
function Ag(e, t) {
  const n = Fg(t);
  if (n == null)
    throw ei(
      0
      /* NodeTypes.Resource */
    );
  if (dd(n) === 1) {
    const i = Eg(n);
    return e.plural(i.reduce((l, a) => [
      ...l,
      dc(e, a)
    ], []));
  } else
    return dc(e, n);
}
function dc(e, t) {
  const n = Og(t);
  if (n != null)
    return e.type === "text" ? n : e.normalize([n]);
  {
    const o = zg(t).reduce((r, i) => [...r, Ss(e, i)], []);
    return e.normalize(o);
  }
}
function Ss(e, t) {
  const n = dd(t);
  switch (n) {
    case 3:
      return Si(t, n);
    case 9:
      return Si(t, n);
    case 4: {
      const o = t;
      if (pn(o, "k") && o.k)
        return e.interpolate(e.named(o.k));
      if (pn(o, "key") && o.key)
        return e.interpolate(e.named(o.key));
      throw ei(n);
    }
    case 5: {
      const o = t;
      if (pn(o, "i") && Rt(o.i))
        return e.interpolate(e.list(o.i));
      if (pn(o, "index") && Rt(o.index))
        return e.interpolate(e.list(o.index));
      throw ei(n);
    }
    case 6: {
      const o = t, r = Mg(o), i = Ig(o);
      return e.linked(Ss(e, i), r ? Ss(e, r) : void 0, e.type);
    }
    case 7:
      return Si(t, n);
    case 8:
      return Si(t, n);
    default:
      throw new Error(`unhandled node on format message part: ${n}`);
  }
}
const Vg = (e) => e;
let $i = tt();
function Bg(e, t = {}) {
  let n = !1;
  const o = t.onError || lg;
  return t.onError = (r) => {
    n = !0, o(r);
  }, { ..._g(e, t), detectError: n };
}
// @__NO_SIDE_EFFECTS__
function Lg(e, t) {
  if (!__INTLIFY_DROP_MESSAGE_COMPILER__ && ge(e)) {
    bt(t.warnHtmlMessage) && t.warnHtmlMessage;
    const o = (t.onCacheKey || Vg)(e), r = $i[o];
    if (r)
      return r;
    const { ast: i, detectError: l } = Bg(e, {
      ...t,
      location: !1,
      jit: !0
    }), a = dl(i);
    return l ? a : $i[o] = a;
  } else {
    const n = e.cacheKey;
    if (n) {
      const o = $i[n];
      return o || ($i[n] = dl(e));
    } else
      return dl(e);
  }
}
let ti = null;
function Dg(e) {
  ti = e;
}
function Ng(e, t, n) {
  ti && ti.emit("i18n:init", {
    timestamp: Date.now(),
    i18n: e,
    version: t,
    meta: n
  });
}
const Hg = /* @__PURE__ */ jg("function:translate");
function jg(e) {
  return (t) => ti && ti.emit(e, t);
}
const Nn = {
  INVALID_ARGUMENT: ag,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
}, Wg = 24;
function Hn(e) {
  return La(e, null, void 0);
}
function cd(e, t) {
  return t.locale != null ? cc(t.locale) : cc(e.locale);
}
let cl;
function cc(e) {
  if (ge(e))
    return e;
  if (ht(e)) {
    if (e.resolvedOnce && cl != null)
      return cl;
    if (e.constructor.name === "Function") {
      const t = e();
      if (og(t))
        throw Hn(Nn.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
      return cl = t;
    } else
      throw Hn(Nn.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
  } else
    throw Hn(Nn.NOT_SUPPORT_LOCALE_TYPE);
}
function Ug(e, t, n) {
  return [.../* @__PURE__ */ new Set([
    n,
    ...wt(t) ? t : Ke(t) ? Object.keys(t) : ge(t) ? [t] : [n]
  ])];
}
function Xh(e, t, n) {
  const o = ge(n) ? n : Pa, r = e;
  r.__localeChainCache || (r.__localeChainCache = /* @__PURE__ */ new Map());
  let i = r.__localeChainCache.get(o);
  if (!i) {
    i = [];
    let l = [n];
    for (; wt(l); )
      l = uc(i, l, t);
    const a = wt(t) || !Ue(t) ? t : t.default ? t.default : null;
    l = ge(a) ? [a] : a, wt(l) && uc(i, l, !1), r.__localeChainCache.set(o, i);
  }
  return i;
}
function uc(e, t, n) {
  let o = !0;
  for (let r = 0; r < t.length && bt(o); r++) {
    const i = t[r];
    ge(i) && (o = Kg(e, t[r], n));
  }
  return o;
}
function Kg(e, t, n) {
  let o;
  const r = t.split("-");
  do {
    const i = r.join("-");
    o = qg(e, i, n), r.splice(-1, 1);
  } while (r.length && o === !0);
  return o;
}
function qg(e, t, n) {
  let o = !1;
  if (!e.includes(t) && (o = !0, t)) {
    o = t[t.length - 1] !== "!";
    const r = t.replace(/!/g, "");
    e.push(r), (wt(n) || Ue(n)) && n[r] && (o = n[r]);
  }
  return o;
}
const fo = [];
fo[
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
fo[
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
fo[
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
fo[
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
fo[
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
fo[
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
fo[
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
const Gg = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function Xg(e) {
  return Gg.test(e);
}
function Yg(e) {
  const t = e.charCodeAt(0), n = e.charCodeAt(e.length - 1);
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e;
}
function Zg(e) {
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
function Jg(e) {
  const t = e.trim();
  return e.charAt(0) === "0" && isNaN(parseInt(e)) ? !1 : Xg(t) ? Yg(t) : "*" + t;
}
function Qg(e) {
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
      if (r = 0, l === void 0 || (l = Jg(l), l === !1))
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
      if (s = Zg(i), h = fo[o], d = h[s] || h.l || 8, d === 8 || (o = d[0], d[1] !== void 0 && (c = p[d[1]], c && (a = i, c() === !1))))
        return;
      if (o === 7)
        return t;
    }
}
const fc = /* @__PURE__ */ new Map();
function eb(e, t) {
  return Ke(e) ? e[t] : null;
}
function tb(e, t) {
  if (!Ke(e))
    return null;
  let n = fc.get(t);
  if (n || (n = Qg(t), n && fc.set(t, n)), !n)
    return null;
  const o = n.length;
  let r = e, i = 0;
  for (; i < o; ) {
    const l = n[i];
    if (Gh.includes(l) && $n(r))
      return null;
    const a = r[l];
    if (a === void 0 || ht(r))
      return null;
    r = a, i++;
  }
  return r;
}
const nb = "11.1.12", Da = -1, Pa = "en-US", hc = "", pc = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
function ob() {
  return {
    upper: (e, t) => t === "text" && ge(e) ? e.toUpperCase() : t === "vnode" && Ke(e) && "__v_isVNode" in e ? e.children.toUpperCase() : e,
    lower: (e, t) => t === "text" && ge(e) ? e.toLowerCase() : t === "vnode" && Ke(e) && "__v_isVNode" in e ? e.children.toLowerCase() : e,
    capitalize: (e, t) => t === "text" && ge(e) ? pc(e) : t === "vnode" && Ke(e) && "__v_isVNode" in e ? pc(e.children) : e
  };
}
let Yh;
function rb(e) {
  Yh = e;
}
let Zh;
function ib(e) {
  Zh = e;
}
let Jh;
function ab(e) {
  Jh = e;
}
let Qh = null;
const lb = /* @__NO_SIDE_EFFECTS__ */ (e) => {
  Qh = e;
}, sb = /* @__NO_SIDE_EFFECTS__ */ () => Qh;
let ep = null;
const vc = (e) => {
  ep = e;
}, db = () => ep;
let mc = 0;
function cb(e = {}) {
  const t = ht(e.onWarn) ? e.onWarn : Ym, n = ge(e.version) ? e.version : nb, o = ge(e.locale) || ht(e.locale) ? e.locale : Pa, r = ht(o) ? Pa : o, i = wt(e.fallbackLocale) || Ue(e.fallbackLocale) || ge(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : r, l = Ue(e.messages) ? e.messages : ul(r), a = Ue(e.datetimeFormats) ? e.datetimeFormats : ul(r), s = Ue(e.numberFormats) ? e.numberFormats : ul(r), d = kt(tt(), e.modifiers, ob()), c = e.pluralRules || tt(), h = ht(e.missing) ? e.missing : null, p = bt(e.missingWarn) || ka(e.missingWarn) ? e.missingWarn : !0, v = bt(e.fallbackWarn) || ka(e.fallbackWarn) ? e.fallbackWarn : !0, f = !!e.fallbackFormat, m = !!e.unresolving, g = ht(e.postTranslation) ? e.postTranslation : null, u = Ue(e.processor) ? e.processor : null, w = bt(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, x = !!e.escapeParameter, y = ht(e.messageCompiler) ? e.messageCompiler : Yh, C = ht(e.messageResolver) ? e.messageResolver : Zh || eb, S = ht(e.localeFallbacker) ? e.localeFallbacker : Jh || Ug, b = Ke(e.fallbackContext) ? e.fallbackContext : void 0, R = e, $ = Ke(R.__datetimeFormatters) ? R.__datetimeFormatters : /* @__PURE__ */ new Map(), T = Ke(R.__numberFormatters) ? R.__numberFormatters : /* @__PURE__ */ new Map(), H = Ke(R.__meta) ? R.__meta : {};
  mc++;
  const P = {
    version: n,
    cid: mc,
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
    escapeParameter: x,
    messageCompiler: y,
    messageResolver: C,
    localeFallbacker: S,
    fallbackContext: b,
    onWarn: t,
    __meta: H
  };
  return P.datetimeFormats = a, P.numberFormats = s, P.__datetimeFormatters = $, P.__numberFormatters = T, __INTLIFY_PROD_DEVTOOLS__ && Ng(P, n, H), P;
}
const ul = (e) => ({ [e]: tt() });
function ud(e, t, n, o, r) {
  const { missing: i, onWarn: l } = e;
  if (i !== null) {
    const a = i(e, n, t, r);
    return ge(a) ? a : t;
  } else
    return t;
}
function Rr(e, t, n) {
  const o = e;
  o.__localeChainCache = /* @__PURE__ */ new Map(), e.localeFallbacker(e, n, t);
}
function ub(e, t) {
  return e === t ? !1 : e.split("-")[0] === t.split("-")[0];
}
function fb(e, t) {
  const n = t.indexOf(e);
  if (n === -1)
    return !1;
  for (let o = n + 1; o < t.length; o++)
    if (ub(e, t[o]))
      return !0;
  return !1;
}
function gc(e, ...t) {
  const { datetimeFormats: n, unresolving: o, fallbackLocale: r, onWarn: i, localeFallbacker: l } = e, { __datetimeFormatters: a } = e, [s, d, c, h] = $s(...t), p = bt(c.missingWarn) ? c.missingWarn : e.missingWarn;
  bt(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const v = !!c.part, f = cd(e, c), m = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    f
  );
  if (!ge(s) || s === "")
    return new Intl.DateTimeFormat(f, h).format(d);
  let g = {}, u, w = null;
  const x = "datetime format";
  for (let S = 0; S < m.length && (u = m[S], g = n[u] || {}, w = g[s], !Ue(w)); S++)
    ud(e, s, u, p, x);
  if (!Ue(w) || !ge(u))
    return o ? Da : s;
  let y = `${u}__${s}`;
  Ba(h) || (y = `${y}__${JSON.stringify(h)}`);
  let C = a.get(y);
  return C || (C = new Intl.DateTimeFormat(u, kt({}, w, h)), a.set(y, C)), v ? C.formatToParts(d) : C.format(d);
}
const tp = [
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
function $s(...e) {
  const [t, n, o, r] = e, i = tt();
  let l = tt(), a;
  if (ge(t)) {
    const s = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!s)
      throw Hn(Nn.INVALID_ISO_DATE_ARGUMENT);
    const d = s[3] ? s[3].trim().startsWith("T") ? `${s[1].trim()}${s[3].trim()}` : `${s[1].trim()}T${s[3].trim()}` : s[1].trim();
    a = new Date(d);
    try {
      a.toISOString();
    } catch {
      throw Hn(Nn.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (Qm(t)) {
    if (isNaN(t.getTime()))
      throw Hn(Nn.INVALID_DATE_ARGUMENT);
    a = t;
  } else if (Rt(t))
    a = t;
  else
    throw Hn(Nn.INVALID_ARGUMENT);
  return ge(n) ? i.key = n : Ue(n) && Object.keys(n).forEach((s) => {
    tp.includes(s) ? l[s] = n[s] : i[s] = n[s];
  }), ge(o) ? i.locale = o : Ue(o) && (l = o), Ue(r) && (l = r), [i.key || "", a, i, l];
}
function bc(e, t, n) {
  const o = e;
  for (const r in n) {
    const i = `${t}__${r}`;
    o.__datetimeFormatters.has(i) && o.__datetimeFormatters.delete(i);
  }
}
function wc(e, ...t) {
  const { numberFormats: n, unresolving: o, fallbackLocale: r, onWarn: i, localeFallbacker: l } = e, { __numberFormatters: a } = e, [s, d, c, h] = Rs(...t), p = bt(c.missingWarn) ? c.missingWarn : e.missingWarn;
  bt(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn;
  const v = !!c.part, f = cd(e, c), m = l(
    e,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    r,
    f
  );
  if (!ge(s) || s === "")
    return new Intl.NumberFormat(f, h).format(d);
  let g = {}, u, w = null;
  const x = "number format";
  for (let S = 0; S < m.length && (u = m[S], g = n[u] || {}, w = g[s], !Ue(w)); S++)
    ud(e, s, u, p, x);
  if (!Ue(w) || !ge(u))
    return o ? Da : s;
  let y = `${u}__${s}`;
  Ba(h) || (y = `${y}__${JSON.stringify(h)}`);
  let C = a.get(y);
  return C || (C = new Intl.NumberFormat(u, kt({}, w, h)), a.set(y, C)), v ? C.formatToParts(d) : C.format(d);
}
const np = [
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
function Rs(...e) {
  const [t, n, o, r] = e, i = tt();
  let l = tt();
  if (!Rt(t))
    throw Hn(Nn.INVALID_ARGUMENT);
  const a = t;
  return ge(n) ? i.key = n : Ue(n) && Object.keys(n).forEach((s) => {
    np.includes(s) ? l[s] = n[s] : i[s] = n[s];
  }), ge(o) ? i.locale = o : Ue(o) && (l = o), Ue(r) && (l = r), [i.key || "", a, i, l];
}
function yc(e, t, n) {
  const o = e;
  for (const r in n) {
    const i = `${t}__${r}`;
    o.__numberFormatters.has(i) && o.__numberFormatters.delete(i);
  }
}
const hb = (e) => e, pb = (e) => "", vb = "text", mb = (e) => e.length === 0 ? "" : ld(e), gb = rg;
function xc(e, t) {
  return e = Math.abs(e), t === 2 ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0;
}
function bb(e) {
  const t = Rt(e.pluralIndex) ? e.pluralIndex : -1;
  return e.named && (Rt(e.named.count) || Rt(e.named.n)) ? Rt(e.named.count) ? e.named.count : Rt(e.named.n) ? e.named.n : t : t;
}
function wb(e, t) {
  t.count || (t.count = e), t.n || (t.n = e);
}
function yb(e = {}) {
  const t = e.locale, n = bb(e), o = Ke(e.pluralRules) && ge(t) && ht(e.pluralRules[t]) ? e.pluralRules[t] : xc, r = Ke(e.pluralRules) && ge(t) && ht(e.pluralRules[t]) ? xc : void 0, i = (u) => u[o(n, u.length, r)], l = e.list || [], a = (u) => l[u], s = e.named || tt();
  Rt(e.pluralIndex) && wb(n, s);
  const d = (u) => s[u];
  function c(u, w) {
    const x = ht(e.messages) ? e.messages(u, !!w) : Ke(e.messages) ? e.messages[u] : !1;
    return x || (e.parent ? e.parent.message(u) : pb);
  }
  const h = (u) => e.modifiers ? e.modifiers[u] : hb, p = Ue(e.processor) && ht(e.processor.normalize) ? e.processor.normalize : mb, v = Ue(e.processor) && ht(e.processor.interpolate) ? e.processor.interpolate : gb, f = Ue(e.processor) && ge(e.processor.type) ? e.processor.type : vb, g = {
    list: a,
    named: d,
    plural: i,
    linked: (u, ...w) => {
      const [x, y] = w;
      let C = "text", S = "";
      w.length === 1 ? Ke(x) ? (S = x.modifier || S, C = x.type || C) : ge(x) && (S = x || S) : w.length === 2 && (ge(x) && (S = x || S), ge(y) && (C = y || C));
      const b = c(u, !0)(g), R = (
        // The message in vnode resolved with linked are returned as an array by processor.nomalize
        C === "vnode" && wt(b) && S ? b[0] : b
      );
      return S ? h(S)(R, C) : R;
    },
    message: c,
    type: f,
    interpolate: v,
    normalize: p,
    values: kt(tt(), l, s)
  };
  return g;
}
const Cc = () => "", rn = (e) => ht(e);
function Sc(e, ...t) {
  const { fallbackFormat: n, postTranslation: o, unresolving: r, messageCompiler: i, fallbackLocale: l, messages: a } = e, [s, d] = ks(...t), c = bt(d.missingWarn) ? d.missingWarn : e.missingWarn, h = bt(d.fallbackWarn) ? d.fallbackWarn : e.fallbackWarn, p = bt(d.escapeParameter) ? d.escapeParameter : e.escapeParameter, v = !!d.resolvedMessage, f = ge(d.default) || bt(d.default) ? bt(d.default) ? i ? s : () => s : d.default : n ? i ? s : () => s : null, m = n || f != null && (ge(f) || ht(f)), g = cd(e, d);
  p && xb(d);
  let [u, w, x] = v ? [
    s,
    g,
    a[g] || tt()
  ] : op(e, s, g, l, h, c), y = u, C = s;
  if (!v && !(ge(y) || $n(y) || rn(y)) && m && (y = f, C = y), !v && (!(ge(y) || $n(y) || rn(y)) || !ge(w)))
    return r ? Da : s;
  let S = !1;
  const b = () => {
    S = !0;
  }, R = rn(y) ? y : rp(e, s, w, y, C, b);
  if (S)
    return y;
  const $ = $b(e, w, x, d), T = yb($), H = Cb(e, R, T);
  let P = o ? o(H, s) : H;
  if (p && ge(P) && (P = tg(P)), __INTLIFY_PROD_DEVTOOLS__) {
    const z = {
      timestamp: Date.now(),
      key: ge(s) ? s : rn(y) ? y.key : "",
      locale: w || (rn(y) ? y.locale : ""),
      format: ge(y) ? y : rn(y) ? y.source : "",
      message: P
    };
    z.meta = kt({}, e.__meta, /* @__PURE__ */ sb() || {}), Hg(z);
  }
  return P;
}
function xb(e) {
  wt(e.list) ? e.list = e.list.map((t) => ge(t) ? rc(t) : t) : Ke(e.named) && Object.keys(e.named).forEach((t) => {
    ge(e.named[t]) && (e.named[t] = rc(e.named[t]));
  });
}
function op(e, t, n, o, r, i) {
  const { messages: l, onWarn: a, messageResolver: s, localeFallbacker: d } = e, c = d(e, o, n);
  let h = tt(), p, v = null;
  const f = "translate";
  for (let m = 0; m < c.length && (p = c[m], h = l[p] || tt(), (v = s(h, t)) === null && (v = h[t]), !(ge(v) || $n(v) || rn(v))); m++)
    if (!fb(p, c)) {
      const g = ud(
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
function rp(e, t, n, o, r, i) {
  const { messageCompiler: l, warnHtmlMessage: a } = e;
  if (rn(o)) {
    const d = o;
    return d.locale = d.locale || n, d.key = d.key || t, d;
  }
  if (l == null) {
    const d = () => o;
    return d.locale = n, d.key = t, d;
  }
  const s = l(o, Sb(e, n, r, o, a, i));
  return s.locale = n, s.key = t, s.source = o, s;
}
function Cb(e, t, n) {
  return t(n);
}
function ks(...e) {
  const [t, n, o] = e, r = tt();
  if (!ge(t) && !Rt(t) && !rn(t) && !$n(t))
    throw Hn(Nn.INVALID_ARGUMENT);
  const i = Rt(t) ? String(t) : (rn(t), t);
  return Rt(n) ? r.plural = n : ge(n) ? r.default = n : Ue(n) && !Ba(n) ? r.named = n : wt(n) && (r.list = n), Rt(o) ? r.plural = o : ge(o) ? r.default = o : Ue(o) && kt(r, o), [i, r];
}
function Sb(e, t, n, o, r, i) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: r,
    onError: (l) => {
      throw i && i(l), l;
    },
    onCacheKey: (l) => Zm(t, n, l)
  };
}
function $b(e, t, n, o) {
  const { modifiers: r, pluralRules: i, messageResolver: l, fallbackLocale: a, fallbackWarn: s, missingWarn: d, fallbackContext: c } = e, p = {
    locale: t,
    modifiers: r,
    pluralRules: i,
    messages: (v, f) => {
      let m = l(n, v);
      if (m == null && (c || f)) {
        const [, , g] = op(
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
      if (ge(m) || $n(m)) {
        let g = !1;
        const w = rp(e, v, t, m, v, () => {
          g = !0;
        });
        return g ? Cc : w;
      } else return rn(m) ? m : Cc;
    }
  };
  return e.processor && (p.processor = e.processor), o.list && (p.list = o.list), o.named && (p.named = o.named), Rt(o.plural) && (p.pluralIndex = o.plural), p;
}
Tg();
/*!
  * vue-i18n v11.1.12
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const Rb = window.Vue.createVNode, kb = window.Vue.Text, kr = window.Vue.computed, $c = window.Vue.watch, fd = window.Vue.getCurrentInstance, Pb = window.Vue.ref, _b = window.Vue.shallowRef, ip = window.Vue.Fragment, hd = window.Vue.defineComponent, ap = window.Vue.h;
window.Vue.effectScope;
const Tb = window.Vue.inject, Fb = window.Vue.onMounted, Eb = window.Vue.onUnmounted;
window.Vue.isRef;
const Ob = "11.1.12";
function zb() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" && (xo().__VUE_I18N_FULL_INSTALL__ = !0), typeof __VUE_I18N_LEGACY_API__ != "boolean" && (xo().__VUE_I18N_LEGACY_API__ = !0), typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" && (xo().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1), typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" && (xo().__INTLIFY_PROD_DEVTOOLS__ = !1);
}
const cr = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: Wg,
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
function ni(e, ...t) {
  return La(e, null, void 0);
}
const Ps = /* @__PURE__ */ Oo("__translateVNode"), _s = /* @__PURE__ */ Oo("__datetimeParts"), Ts = /* @__PURE__ */ Oo("__numberParts"), Mb = Oo("__setPluralRules"), lp = /* @__PURE__ */ Oo("__injectWithOption"), Fs = /* @__PURE__ */ Oo("__dispose");
function oi(e) {
  if (!Ke(e) || $n(e))
    return e;
  for (const t in e)
    if (pn(e, t))
      if (!t.includes("."))
        Ke(e[t]) && oi(e[t]);
      else {
        const n = t.split("."), o = n.length - 1;
        let r = e, i = !1;
        for (let l = 0; l < o; l++) {
          if (n[l] === "__proto__")
            throw new Error(`unsafe key: ${n[l]}`);
          if (n[l] in r || (r[n[l]] = tt()), !Ke(r[n[l]])) {
            i = !0;
            break;
          }
          r = r[n[l]];
        }
        if (i || ($n(r) ? Gh.includes(n[o]) || delete e[t] : (r[n[o]] = e[t], delete e[t])), !$n(r)) {
          const l = r[n[o]];
          Ke(l) && oi(l);
        }
      }
  return e;
}
function sp(e, t) {
  const { messages: n, __i18n: o, messageResolver: r, flatJson: i } = t, l = Ue(n) ? n : wt(o) ? tt() : { [e]: tt() };
  if (wt(o) && o.forEach((a) => {
    if ("locale" in a && "resource" in a) {
      const { locale: s, resource: d } = a;
      s ? (l[s] = l[s] || tt(), Ca(d, l[s])) : Ca(d, l);
    } else
      ge(a) && Ca(JSON.parse(a), l);
  }), r == null && i)
    for (const a in l)
      pn(l, a) && oi(l[a]);
  return l;
}
function dp(e) {
  return e.type;
}
function Ib(e, t, n) {
  let o = Ke(t.messages) ? t.messages : tt();
  "__i18nGlobal" in n && (o = sp(e.locale.value, {
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
function Rc(e) {
  return Rb(kb, null, e, 0);
}
const kc = "__INTLIFY_META__", Pc = () => [], Ab = () => !1;
let _c = 0;
function Tc(e) {
  return (t, n, o, r) => e(n, o, fd() || void 0, r);
}
const Vb = /* @__NO_SIDE_EFFECTS__ */ () => {
  const e = fd();
  let t = null;
  return e && (t = dp(e)[kc]) ? { [kc]: t } : null;
};
function Bb(e = {}) {
  const { __root: t, __injectWithOption: n } = e, o = t === void 0, r = e.flatJson, i = nc ? Pb : _b;
  let l = bt(e.inheritLocale) ? e.inheritLocale : !0;
  const a = i(
    // prettier-ignore
    t && l ? t.locale.value : ge(e.locale) ? e.locale : Pa
  ), s = i(
    // prettier-ignore
    t && l ? t.fallbackLocale.value : ge(e.fallbackLocale) || wt(e.fallbackLocale) || Ue(e.fallbackLocale) || e.fallbackLocale === !1 ? e.fallbackLocale : a.value
  ), d = i(sp(a.value, e)), c = i(Ue(e.datetimeFormats) ? e.datetimeFormats : { [a.value]: {} }), h = i(Ue(e.numberFormats) ? e.numberFormats : { [a.value]: {} });
  let p = t ? t.missingWarn : bt(e.missingWarn) || ka(e.missingWarn) ? e.missingWarn : !0, v = t ? t.fallbackWarn : bt(e.fallbackWarn) || ka(e.fallbackWarn) ? e.fallbackWarn : !0, f = t ? t.fallbackRoot : bt(e.fallbackRoot) ? e.fallbackRoot : !0, m = !!e.fallbackFormat, g = ht(e.missing) ? e.missing : null, u = ht(e.missing) ? Tc(e.missing) : null, w = ht(e.postTranslation) ? e.postTranslation : null, x = t ? t.warnHtmlMessage : bt(e.warnHtmlMessage) ? e.warnHtmlMessage : !0, y = !!e.escapeParameter;
  const C = t ? t.modifiers : Ue(e.modifiers) ? e.modifiers : {};
  let S = e.pluralRules || t && t.pluralRules, b;
  b = (() => {
    o && vc(null);
    const E = {
      version: Ob,
      locale: a.value,
      fallbackLocale: s.value,
      messages: d.value,
      modifiers: C,
      pluralRules: S,
      missing: u === null ? void 0 : u,
      missingWarn: p,
      fallbackWarn: v,
      fallbackFormat: m,
      unresolving: !0,
      postTranslation: w === null ? void 0 : w,
      warnHtmlMessage: x,
      escapeParameter: y,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" }
    };
    E.datetimeFormats = c.value, E.numberFormats = h.value, E.__datetimeFormatters = Ue(b) ? b.__datetimeFormatters : void 0, E.__numberFormatters = Ue(b) ? b.__numberFormatters : void 0;
    const j = cb(E);
    return o && vc(j), j;
  })(), Rr(b, a.value, s.value);
  function $() {
    return [
      a.value,
      s.value,
      d.value,
      c.value,
      h.value
    ];
  }
  const T = kr({
    get: () => a.value,
    set: (E) => {
      b.locale = E, a.value = E;
    }
  }), H = kr({
    get: () => s.value,
    set: (E) => {
      b.fallbackLocale = E, s.value = E, Rr(b, a.value, E);
    }
  }), P = kr(() => d.value), z = /* @__PURE__ */ kr(() => c.value), M = /* @__PURE__ */ kr(() => h.value);
  function O() {
    return ht(w) ? w : null;
  }
  function U(E) {
    w = E, b.postTranslation = E;
  }
  function L() {
    return g;
  }
  function Y(E) {
    E !== null && (u = Tc(E)), g = E, b.missing = u;
  }
  const te = (E, j, fe, _e, at, vt) => {
    $();
    let Ye;
    try {
      __INTLIFY_PROD_DEVTOOLS__, o || (b.fallbackContext = t ? db() : void 0), Ye = E(b);
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, o || (b.fallbackContext = void 0);
    }
    if (fe !== "translate exists" && // for not `te` (e.g `t`)
    Rt(Ye) && Ye === Da || fe === "translate exists" && !Ye) {
      const [Ze, gt] = j();
      return t && f ? _e(t) : at(Ze);
    } else {
      if (vt(Ye))
        return Ye;
      throw ni(cr.UNEXPECTED_RETURN_TYPE);
    }
  };
  function J(...E) {
    return te((j) => Reflect.apply(Sc, null, [j, ...E]), () => ks(...E), "translate", (j) => Reflect.apply(j.t, j, [...E]), (j) => j, (j) => ge(j));
  }
  function X(...E) {
    const [j, fe, _e] = E;
    if (_e && !Ke(_e))
      throw ni(cr.INVALID_ARGUMENT);
    return J(j, fe, kt({ resolvedMessage: !0 }, _e || {}));
  }
  function A(...E) {
    return te((j) => Reflect.apply(gc, null, [j, ...E]), () => $s(...E), "datetime format", (j) => Reflect.apply(j.d, j, [...E]), () => hc, (j) => ge(j) || wt(j));
  }
  function G(...E) {
    return te((j) => Reflect.apply(wc, null, [j, ...E]), () => Rs(...E), "number format", (j) => Reflect.apply(j.n, j, [...E]), () => hc, (j) => ge(j) || wt(j));
  }
  function Z(E) {
    return E.map((j) => ge(j) || Rt(j) || bt(j) ? Rc(String(j)) : j);
  }
  const ae = {
    normalize: Z,
    interpolate: (E) => E,
    type: "vnode"
  };
  function ue(...E) {
    return te((j) => {
      let fe;
      const _e = j;
      try {
        _e.processor = ae, fe = Reflect.apply(Sc, null, [_e, ...E]);
      } finally {
        _e.processor = null;
      }
      return fe;
    }, () => ks(...E), "translate", (j) => j[Ps](...E), (j) => [Rc(j)], (j) => wt(j));
  }
  function be(...E) {
    return te((j) => Reflect.apply(wc, null, [j, ...E]), () => Rs(...E), "number format", (j) => j[Ts](...E), Pc, (j) => ge(j) || wt(j));
  }
  function q(...E) {
    return te((j) => Reflect.apply(gc, null, [j, ...E]), () => $s(...E), "datetime format", (j) => j[_s](...E), Pc, (j) => ge(j) || wt(j));
  }
  function se(E) {
    S = E, b.pluralRules = S;
  }
  function Pe(E, j) {
    return te(() => {
      if (!E)
        return !1;
      const fe = ge(j) ? j : a.value, _e = Se(fe), at = b.messageResolver(_e, E);
      return $n(at) || rn(at) || ge(at);
    }, () => [E], "translate exists", (fe) => Reflect.apply(fe.te, fe, [E, j]), Ab, (fe) => bt(fe));
  }
  function ve(E) {
    let j = null;
    const fe = Xh(b, s.value, a.value);
    for (let _e = 0; _e < fe.length; _e++) {
      const at = d.value[fe[_e]] || {}, vt = b.messageResolver(at, E);
      if (vt != null) {
        j = vt;
        break;
      }
    }
    return j;
  }
  function $e(E) {
    const j = ve(E);
    return j ?? (t ? t.tm(E) || {} : {});
  }
  function Se(E) {
    return d.value[E] || {};
  }
  function De(E, j) {
    if (r) {
      const fe = { [E]: j };
      for (const _e in fe)
        pn(fe, _e) && oi(fe[_e]);
      j = fe[E];
    }
    d.value[E] = j, b.messages = d.value;
  }
  function Ie(E, j) {
    d.value[E] = d.value[E] || {};
    const fe = { [E]: j };
    if (r)
      for (const _e in fe)
        pn(fe, _e) && oi(fe[_e]);
    j = fe[E], Ca(j, d.value[E]), b.messages = d.value;
  }
  function Je(E) {
    return c.value[E] || {};
  }
  function F(E, j) {
    c.value[E] = j, b.datetimeFormats = c.value, bc(b, E, j);
  }
  function _(E, j) {
    c.value[E] = kt(c.value[E] || {}, j), b.datetimeFormats = c.value, bc(b, E, j);
  }
  function W(E) {
    return h.value[E] || {};
  }
  function ne(E, j) {
    h.value[E] = j, b.numberFormats = h.value, yc(b, E, j);
  }
  function ye(E, j) {
    h.value[E] = kt(h.value[E] || {}, j), b.numberFormats = h.value, yc(b, E, j);
  }
  _c++, t && nc && ($c(t.locale, (E) => {
    l && (a.value = E, b.locale = E, Rr(b, a.value, s.value));
  }), $c(t.fallbackLocale, (E) => {
    l && (s.value = E, b.fallbackLocale = E, Rr(b, a.value, s.value));
  }));
  const he = {
    id: _c,
    locale: T,
    fallbackLocale: H,
    get inheritLocale() {
      return l;
    },
    set inheritLocale(E) {
      l = E, E && t && (a.value = t.locale.value, s.value = t.fallbackLocale.value, Rr(b, a.value, s.value));
    },
    get availableLocales() {
      return Object.keys(d.value).sort();
    },
    messages: P,
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
    set missingWarn(E) {
      p = E, b.missingWarn = p;
    },
    get fallbackWarn() {
      return v;
    },
    set fallbackWarn(E) {
      v = E, b.fallbackWarn = v;
    },
    get fallbackRoot() {
      return f;
    },
    set fallbackRoot(E) {
      f = E;
    },
    get fallbackFormat() {
      return m;
    },
    set fallbackFormat(E) {
      m = E, b.fallbackFormat = m;
    },
    get warnHtmlMessage() {
      return x;
    },
    set warnHtmlMessage(E) {
      x = E, b.warnHtmlMessage = E;
    },
    get escapeParameter() {
      return y;
    },
    set escapeParameter(E) {
      y = E, b.escapeParameter = E;
    },
    t: J,
    getLocaleMessage: Se,
    setLocaleMessage: De,
    mergeLocaleMessage: Ie,
    getPostTranslationHandler: O,
    setPostTranslationHandler: U,
    getMissingHandler: L,
    setMissingHandler: Y,
    [Mb]: se
  };
  return he.datetimeFormats = z, he.numberFormats = M, he.rt = X, he.te = Pe, he.tm = $e, he.d = A, he.n = G, he.getDateTimeFormat = Je, he.setDateTimeFormat = F, he.mergeDateTimeFormat = _, he.getNumberFormat = W, he.setNumberFormat = ne, he.mergeNumberFormat = ye, he[lp] = n, he[Ps] = ue, he[_s] = q, he[Ts] = be, he;
}
const pd = {
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
function Lb({ slots: e }, t) {
  return t.length === 1 && t[0] === "default" ? (e.default ? e.default() : []).reduce((o, r) => [
    ...o,
    // prettier-ignore
    ...r.type === ip ? r.children : [r]
  ], []) : t.reduce((n, o) => {
    const r = e[o];
    return r && (n[o] = r()), n;
  }, tt());
}
function cp() {
  return ip;
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
}, pd);
function Db(e) {
  return wt(e) && !ge(e[0]);
}
function up(e, t, n, o) {
  const { slots: r, attrs: i } = t;
  return () => {
    const l = { part: !0 };
    let a = tt();
    e.locale && (l.locale = e.locale), ge(e.format) ? l.key = e.format : Ke(e.format) && (ge(e.format.key) && (l.key = e.format.key), a = Object.keys(e.format).reduce((p, v) => n.includes(v) ? kt(tt(), p, { [v]: e.format[v] }) : p, tt()));
    const s = o(e.value, l, a);
    let d = [l.key];
    wt(s) ? d = s.map((p, v) => {
      const f = r[p.type], m = f ? f({ [p.type]: p.value, index: v, parts: s }) : [p.value];
      return Db(m) && (m[0].key = `${p.type}-${v}`), m;
    }) : ge(s) && (d = [s]);
    const c = kt(tt(), i), h = ge(e.tag) || Ke(e.tag) ? e.tag : cp();
    return ap(h, c, d);
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
}, pd);
const Nb = /* @__PURE__ */ Oo("global-vue-i18n");
function Na(e = {}) {
  const t = fd();
  if (t == null)
    throw ni(cr.MUST_BE_CALL_SETUP_TOP);
  if (!t.isCE && t.appContext.app != null && !t.appContext.app.__VUE_I18N_SYMBOL__)
    throw ni(cr.NOT_INSTALLED);
  const n = Hb(t), o = Wb(n), r = dp(t), i = jb(e, r);
  if (i === "global")
    return Ib(o, e, r), o;
  if (i === "parent") {
    let s = Ub(n, t, e.__useComponent);
    return s == null && (s = o), s;
  }
  const l = n;
  let a = l.__getInstance(t);
  if (a == null) {
    const s = kt({}, e);
    "__i18n" in r && (s.__i18n = r.__i18n), o && (s.__root = o), a = Bb(s), l.__composerExtend && (a[Fs] = l.__composerExtend(a)), qb(l, t, a), l.__setInstance(t, a);
  }
  return a;
}
function Hb(e) {
  const t = Tb(e.isCE ? Nb : e.appContext.app.__VUE_I18N_SYMBOL__);
  if (!t)
    throw ni(e.isCE ? cr.NOT_INSTALLED_WITH_PROVIDE : cr.UNEXPECTED_ERROR);
  return t;
}
function jb(e, t) {
  return Ba(e) ? "__i18n" in t ? "local" : "global" : e.useScope ? e.useScope : "local";
}
function Wb(e) {
  return e.mode === "composition" ? e.global : e.global.__composer;
}
function Ub(e, t, n = !1) {
  let o = null;
  const r = t.root;
  let i = Kb(t, n);
  for (; i != null; ) {
    const l = e;
    if (e.mode === "composition")
      o = l.__getInstance(i);
    else if (__VUE_I18N_LEGACY_API__) {
      const a = l.__getInstance(i);
      a != null && (o = a.__composer, n && o && !o[lp] && (o = null));
    }
    if (o != null || r === i)
      break;
    i = i.parent;
  }
  return o;
}
function Kb(e, t = !1) {
  return e == null ? null : t && e.vnode.ctx || e.parent;
}
function qb(e, t, n) {
  Fb(() => {
  }, t), Eb(() => {
    const o = n;
    e.__deleteInstance(t);
    const r = o[Fs];
    r && (r(), delete o[Fs]);
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
}, pd);
zb();
rb(Lg);
ib(tb);
ab(Xh);
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = xo();
  e.__INTLIFY__ = !0, Dg(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
function Gb(e) {
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
        const u = f.split(",").map((y) => y.trim());
        function w(y) {
          return u.map((C) => `&${(g == null ? void 0 : g.bPrefix) || t}${m.bem.b}${y !== void 0 ? `${n}${y}` : ""}${o}${C}`).join(", ");
        }
        const x = m.bem.els;
        return x !== null ? w(x[0]) : w();
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
function Xb(e) {
  let t = 0;
  for (let n = 0; n < e.length; ++n)
    e[n] === "&" && ++t;
  return t;
}
const fp = /\s*,(?![^(]*\))\s*/g, Yb = /\s+/g;
function Zb(e, t) {
  const n = [];
  return t.split(fp).forEach((o) => {
    let r = Xb(o);
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
function Jb(e, t) {
  const n = [];
  return t.split(fp).forEach((o) => {
    e.forEach((r) => {
      n.push((r && r + " ") + o);
    });
  }), n;
}
function Qb(e) {
  let t = [""];
  return e.forEach((n) => {
    n = n && n.trim(), // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    n && (n.includes("&") ? t = Zb(t, n) : t = Jb(t, n));
  }), t.join(", ").replace(Yb, " ");
}
function Fc(e) {
  if (!e)
    return;
  const t = e.parentElement;
  t && t.removeChild(e);
}
function Ha(e, t) {
  return (t ?? document.head).querySelector(`style[cssr-id="${e}"]`);
}
function ew(e) {
  const t = document.createElement("style");
  return t.setAttribute("cssr-id", e), t;
}
function Ri(e) {
  return e ? /^\s*@(s|m)/.test(e) : !1;
}
const tw = /[A-Z]/g;
function hp(e) {
  return e.replace(tw, (t) => "-" + t.toLowerCase());
}
function nw(e, t = "  ") {
  return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((n) => t + `  ${hp(n[0])}: ${n[1]};`).join(`
`) + `
` + t + "}" : `: ${e};`;
}
function ow(e, t, n) {
  return typeof e == "function" ? e({
    context: t.context,
    props: n
  }) : e;
}
function Ec(e, t, n, o) {
  if (!t)
    return "";
  const r = ow(t, n, o);
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
    a = hp(a), s != null && l.push(`  ${a}${nw(s)}`);
  }), e && l.push("}"), l.join(`
`);
}
function Es(e, t, n) {
  e && e.forEach((o) => {
    if (Array.isArray(o))
      Es(o, t, n);
    else if (typeof o == "function") {
      const r = o(t);
      Array.isArray(r) ? Es(r, t, n) : r && n(r);
    } else o && n(o);
  });
}
function pp(e, t, n, o, r) {
  const i = e.$;
  let l = "";
  if (!i || typeof i == "string")
    Ri(i) ? l = i : t.push(i);
  else if (typeof i == "function") {
    const d = i({
      context: o.context,
      props: r
    });
    Ri(d) ? l = d : t.push(d);
  } else if (i.before && i.before(o.context), !i.$ || typeof i.$ == "string")
    Ri(i.$) ? l = i.$ : t.push(i.$);
  else if (i.$) {
    const d = i.$({
      context: o.context,
      props: r
    });
    Ri(d) ? l = d : t.push(d);
  }
  const a = Qb(t), s = Ec(a, e.props, o, r);
  l ? n.push(`${l} {`) : s.length && n.push(s), e.children && Es(e.children, {
    context: o.context,
    props: r
  }, (d) => {
    if (typeof d == "string") {
      const c = Ec(a, { raw: d }, o, r);
      n.push(c);
    } else
      pp(d, t, n, o, r);
  }), t.pop(), l && n.push("}"), i && i.after && i.after(o.context);
}
function rw(e, t, n) {
  const o = [];
  return pp(e, [], o, t, n), o.join(`

`);
}
function Os(e) {
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
function iw(e, t, n, o) {
  const { els: r } = t;
  if (n === void 0)
    r.forEach(Fc), t.els = [];
  else {
    const i = Ha(n, o);
    i && r.includes(i) && (Fc(i), t.els = r.filter((l) => l !== i));
  }
}
function Oc(e, t) {
  e.push(t);
}
function aw(e, t, n, o, r, i, l, a, s) {
  let d;
  if (n === void 0 && (d = t.render(o), n = Os(d)), s) {
    s.adapter(n, d ?? t.render(o));
    return;
  }
  a === void 0 && (a = document.head);
  const c = Ha(n, a);
  if (c !== null && !i)
    return c;
  const h = c ?? ew(n);
  if (d === void 0 && (d = t.render(o)), h.textContent = d, c !== null)
    return c;
  if (l) {
    const p = a.querySelector(`meta[name="${l}"]`);
    if (p)
      return a.insertBefore(h, p), Oc(t.els, h), h;
  }
  return r ? a.insertBefore(h, a.querySelector("style, link")) : a.appendChild(h), Oc(t.els, h), h;
}
function lw(e) {
  return rw(this, this.instance, e);
}
function sw(e = {}) {
  const { id: t, ssr: n, props: o, head: r = !1, force: i = !1, anchorMetaName: l, parent: a } = e;
  return aw(this.instance, this, t, o, r, i, l, a, n);
}
function dw(e = {}) {
  const { id: t, parent: n } = e;
  iw(this.instance, this, t, n);
}
const ki = function(e, t, n, o) {
  return {
    instance: e,
    $: t,
    props: n,
    children: o,
    els: [],
    render: lw,
    mount: sw,
    unmount: dw
  };
}, cw = function(e, t, n, o) {
  return Array.isArray(t) ? ki(e, { $: null }, null, t) : Array.isArray(n) ? ki(e, t, null, n) : Array.isArray(o) ? ki(e, t, n, o) : ki(e, t, n, null);
};
function vp(e = {}) {
  const t = {
    c: (...n) => cw(t, ...n),
    use: (n, ...o) => n.install(t, ...o),
    find: Ha,
    context: {},
    config: e
  };
  return t;
}
function uw(e, t) {
  if (e === void 0)
    return !1;
  if (t) {
    const { context: { ids: n } } = t;
    return n.has(e);
  }
  return Ha(e) !== null;
}
const fw = "n", ri = `.${fw}-`, hw = "__", pw = "--", mp = vp(), gp = Gb({
  blockPrefix: ri,
  elementPrefix: hw,
  modifierPrefix: pw
});
mp.use(gp);
const {
  c: D,
  find: PO
} = mp, {
  cB: I,
  cE: N,
  cM: K,
  cNotM: ot
} = gp;
function ja(e) {
  return D(({
    props: {
      bPrefix: t
    }
  }) => `${t || ri}modal, ${t || ri}drawer`, [e]);
}
function vd(e) {
  return D(({
    props: {
      bPrefix: t
    }
  }) => `${t || ri}popover`, [e]);
}
function bp(e) {
  return D(({
    props: {
      bPrefix: t
    }
  }) => `&${t || ri}modal`, e);
}
const vw = (...e) => D(">", [I(...e)]);
function oe(e, t) {
  return e + (t === "default" ? "" : t.replace(/^[a-z]/, (n) => n.toUpperCase()));
}
let _a = [];
const wp = /* @__PURE__ */ new WeakMap();
function mw() {
  _a.forEach((e) => e(...wp.get(e))), _a = [];
}
function ii(e, ...t) {
  wp.set(e, t), !_a.includes(e) && _a.push(e) === 1 && requestAnimationFrame(mw);
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
function ur(e) {
  return e.composedPath()[0] || null;
}
function gw(e) {
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
function No(e, t) {
  var n;
  if (e == null)
    return;
  const o = gw(e);
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
function Rn(e) {
  return typeof e == "string" ? e.endsWith("px") ? Number(e.slice(0, e.length - 2)) : Number(e) : e;
}
function pt(e) {
  if (e != null)
    return typeof e == "number" ? `${e}px` : e.endsWith("px") ? e : `${e}px`;
}
function Gt(e, t) {
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
function bw(e, t) {
  const [n, o] = e.split(" ");
  return {
    row: n,
    col: o || n
  };
}
const zc = {
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
function ww(e, t, n) {
  t /= 100, n /= 100;
  let o = (r, i = (r + e / 60) % 6) => n - n * t * Math.max(Math.min(i, 4 - i, 1), 0);
  return [o(5) * 255, o(3) * 255, o(1) * 255];
}
function yw(e, t, n) {
  t /= 100, n /= 100;
  let o = t * Math.min(n, 1 - n), r = (i, l = (i + e / 30) % 12) => n - o * Math.max(Math.min(l - 3, 9 - l, 1), -1);
  return [r(0) * 255, r(8) * 255, r(4) * 255];
}
const Tn = "^\\s*", Fn = "\\s*$", io = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))%\\s*", Zt = "\\s*((\\.\\d+)|(\\d+(\\.\\d*)?))\\s*", Co = "([0-9A-Fa-f])", So = "([0-9A-Fa-f]{2})", yp = new RegExp(`${Tn}hsl\\s*\\(${Zt},${io},${io}\\)${Fn}`), xp = new RegExp(`${Tn}hsv\\s*\\(${Zt},${io},${io}\\)${Fn}`), Cp = new RegExp(`${Tn}hsla\\s*\\(${Zt},${io},${io},${Zt}\\)${Fn}`), Sp = new RegExp(`${Tn}hsva\\s*\\(${Zt},${io},${io},${Zt}\\)${Fn}`), xw = new RegExp(`${Tn}rgb\\s*\\(${Zt},${Zt},${Zt}\\)${Fn}`), Cw = new RegExp(`${Tn}rgba\\s*\\(${Zt},${Zt},${Zt},${Zt}\\)${Fn}`), Sw = new RegExp(`${Tn}#${Co}${Co}${Co}${Fn}`), $w = new RegExp(`${Tn}#${So}${So}${So}${Fn}`), Rw = new RegExp(`${Tn}#${Co}${Co}${Co}${Co}${Fn}`), kw = new RegExp(`${Tn}#${So}${So}${So}${So}${Fn}`);
function Wt(e) {
  return parseInt(e, 16);
}
function Pw(e) {
  try {
    let t;
    if (t = Cp.exec(e))
      return [
        Ta(t[1]),
        oo(t[5]),
        oo(t[9]),
        Ro(t[13])
      ];
    if (t = yp.exec(e))
      return [Ta(t[1]), oo(t[5]), oo(t[9]), 1];
    throw new Error(`[seemly/hsla]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function _w(e) {
  try {
    let t;
    if (t = Sp.exec(e))
      return [
        Ta(t[1]),
        oo(t[5]),
        oo(t[9]),
        Ro(t[13])
      ];
    if (t = xp.exec(e))
      return [Ta(t[1]), oo(t[5]), oo(t[9]), 1];
    throw new Error(`[seemly/hsva]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function _o(e) {
  try {
    let t;
    if (t = $w.exec(e))
      return [Wt(t[1]), Wt(t[2]), Wt(t[3]), 1];
    if (t = xw.exec(e))
      return [Et(t[1]), Et(t[5]), Et(t[9]), 1];
    if (t = Cw.exec(e))
      return [
        Et(t[1]),
        Et(t[5]),
        Et(t[9]),
        Ro(t[13])
      ];
    if (t = Sw.exec(e))
      return [
        Wt(t[1] + t[1]),
        Wt(t[2] + t[2]),
        Wt(t[3] + t[3]),
        1
      ];
    if (t = kw.exec(e))
      return [
        Wt(t[1]),
        Wt(t[2]),
        Wt(t[3]),
        Ro(Wt(t[4]) / 255)
      ];
    if (t = Rw.exec(e))
      return [
        Wt(t[1] + t[1]),
        Wt(t[2] + t[2]),
        Wt(t[3] + t[3]),
        Ro(Wt(t[4] + t[4]) / 255)
      ];
    if (e in zc)
      return _o(zc[e]);
    if (yp.test(e) || Cp.test(e)) {
      const [n, o, r, i] = Pw(e);
      return [...yw(n, o, r), i];
    } else if (xp.test(e) || Sp.test(e)) {
      const [n, o, r, i] = _w(e);
      return [...ww(n, o, r), i];
    }
    throw new Error(`[seemly/rgba]: Invalid color value ${e}.`);
  } catch (t) {
    throw t;
  }
}
function Tw(e) {
  return e > 1 ? 1 : e < 0 ? 0 : e;
}
function zs(e, t, n, o) {
  return `rgba(${Et(e)}, ${Et(t)}, ${Et(n)}, ${Tw(o)})`;
}
function fl(e, t, n, o, r) {
  return Et((e * t * (1 - o) + n * o) / r);
}
function We(e, t) {
  Array.isArray(e) || (e = _o(e)), Array.isArray(t) || (t = _o(t));
  const n = e[3], o = t[3], r = Ro(n + o - n * o);
  return zs(fl(e[0], n, t[0], o, r), fl(e[1], n, t[1], o, r), fl(e[2], n, t[2], o, r), r);
}
function Te(e, t) {
  const [n, o, r, i = 1] = Array.isArray(e) ? e : _o(e);
  return typeof t.alpha == "number" ? zs(n, o, r, t.alpha) : zs(n, o, r, i);
}
function Pi(e, t) {
  const [n, o, r, i = 1] = Array.isArray(e) ? e : _o(e), { lightness: l = 1, alpha: a = 1 } = t;
  return Fw([n * l, o * l, r * l, i * a]);
}
function Ro(e) {
  const t = Math.round(Number(e) * 100) / 100;
  return t > 1 ? 1 : t < 0 ? 0 : t;
}
function Ta(e) {
  const t = Math.round(Number(e));
  return t >= 360 || t < 0 ? 0 : t;
}
function Et(e) {
  const t = Math.round(Number(e));
  return t > 255 ? 255 : t < 0 ? 0 : t;
}
function oo(e) {
  const t = Math.round(Number(e));
  return t > 100 ? 100 : t < 0 ? 0 : t;
}
function Fw(e) {
  const [t, n, o] = e;
  return 3 in e ? `rgba(${Et(t)}, ${Et(n)}, ${Et(o)}, ${Ro(e[3])})` : `rgba(${Et(t)}, ${Et(n)}, ${Et(o)}, 1)`;
}
function ai(e = 8) {
  return Math.random().toString(16).slice(2, 2 + e);
}
function Ew(e, t) {
  const n = [];
  for (let o = 0; o < e; ++o)
    n.push(t);
  return n;
}
function Sa(e) {
  return e.composedPath()[0];
}
const Ow = {
  mousemoveoutside: /* @__PURE__ */ new WeakMap(),
  clickoutside: /* @__PURE__ */ new WeakMap()
};
function zw(e, t, n) {
  if (e === "mousemoveoutside") {
    const o = (r) => {
      t.contains(Sa(r)) || n(r);
    };
    return {
      mousemove: o,
      touchstart: o
    };
  } else if (e === "clickoutside") {
    let o = !1;
    const r = (l) => {
      o = !t.contains(Sa(l));
    }, i = (l) => {
      o && (t.contains(Sa(l)) || n(l));
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
function $p(e, t, n) {
  const o = Ow[e];
  let r = o.get(t);
  r === void 0 && o.set(t, r = /* @__PURE__ */ new WeakMap());
  let i = r.get(n);
  return i === void 0 && r.set(n, i = zw(e, t, n)), i;
}
function Mw(e, t, n, o) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const r = $p(e, t, n);
    return Object.keys(r).forEach((i) => {
      He(i, document, r[i], o);
    }), !0;
  }
  return !1;
}
function Iw(e, t, n, o) {
  if (e === "mousemoveoutside" || e === "clickoutside") {
    const r = $p(e, t, n);
    return Object.keys(r).forEach((i) => {
      Be(i, document, r[i], o);
    }), !0;
  }
  return !1;
}
function Aw() {
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
  function r(b, R, $) {
    const T = b[R];
    return b[R] = function() {
      return $.apply(b, arguments), T.apply(b, arguments);
    }, b;
  }
  function i(b, R) {
    b[R] = Event.prototype[R];
  }
  const l = /* @__PURE__ */ new WeakMap(), a = Object.getOwnPropertyDescriptor(Event.prototype, "currentTarget");
  function s() {
    var b;
    return (b = l.get(this)) !== null && b !== void 0 ? b : null;
  }
  function d(b, R) {
    a !== void 0 && Object.defineProperty(b, "currentTarget", {
      configurable: !0,
      enumerable: !0,
      get: R ?? a.get
    });
  }
  const c = {
    bubble: {},
    capture: {}
  }, h = {};
  function p() {
    const b = function(R) {
      const { type: $, eventPhase: T, bubbles: H } = R, P = Sa(R);
      if (T === 2)
        return;
      const z = T === 1 ? "capture" : "bubble";
      let M = P;
      const O = [];
      for (; M === null && (M = window), O.push(M), M !== window; )
        M = M.parentNode || null;
      const U = c.capture[$], L = c.bubble[$];
      if (r(R, "stopPropagation", n), r(R, "stopImmediatePropagation", o), d(R, s), z === "capture") {
        if (U === void 0)
          return;
        for (let Y = O.length - 1; Y >= 0 && !e.has(R); --Y) {
          const te = O[Y], J = U.get(te);
          if (J !== void 0) {
            l.set(R, te);
            for (const X of J) {
              if (t.has(R))
                break;
              X(R);
            }
          }
          if (Y === 0 && !H && L !== void 0) {
            const X = L.get(te);
            if (X !== void 0)
              for (const A of X) {
                if (t.has(R))
                  break;
                A(R);
              }
          }
        }
      } else if (z === "bubble") {
        if (L === void 0)
          return;
        for (let Y = 0; Y < O.length && !e.has(R); ++Y) {
          const te = O[Y], J = L.get(te);
          if (J !== void 0) {
            l.set(R, te);
            for (const X of J) {
              if (t.has(R))
                break;
              X(R);
            }
          }
        }
      }
      i(R, "stopPropagation"), i(R, "stopImmediatePropagation"), d(R);
    };
    return b.displayName = "evtdUnifiedHandler", b;
  }
  function v() {
    const b = function(R) {
      const { type: $, eventPhase: T } = R;
      if (T !== 2)
        return;
      const H = h[$];
      H !== void 0 && H.forEach((P) => P(R));
    };
    return b.displayName = "evtdUnifiedWindowEventHandler", b;
  }
  const f = p(), m = v();
  function g(b, R) {
    const $ = c[b];
    return $[R] === void 0 && ($[R] = /* @__PURE__ */ new Map(), window.addEventListener(R, f, b === "capture")), $[R];
  }
  function u(b) {
    return h[b] === void 0 && (h[b] = /* @__PURE__ */ new Set(), window.addEventListener(b, m)), h[b];
  }
  function w(b, R) {
    let $ = b.get(R);
    return $ === void 0 && b.set(R, $ = /* @__PURE__ */ new Set()), $;
  }
  function x(b, R, $, T) {
    const H = c[R][$];
    if (H !== void 0) {
      const P = H.get(b);
      if (P !== void 0 && P.has(T))
        return !0;
    }
    return !1;
  }
  function y(b, R) {
    const $ = h[b];
    return !!($ !== void 0 && $.has(R));
  }
  function C(b, R, $, T) {
    let H;
    if (typeof T == "object" && T.once === !0 ? H = (U) => {
      S(b, R, H, T), $(U);
    } : H = $, Mw(b, R, H, T))
      return;
    const z = T === !0 || typeof T == "object" && T.capture === !0 ? "capture" : "bubble", M = g(z, b), O = w(M, R);
    if (O.has(H) || O.add(H), R === window) {
      const U = u(b);
      U.has(H) || U.add(H);
    }
  }
  function S(b, R, $, T) {
    if (Iw(b, R, $, T))
      return;
    const P = T === !0 || typeof T == "object" && T.capture === !0, z = P ? "capture" : "bubble", M = g(z, b), O = w(M, R);
    if (R === window && !x(R, P ? "bubble" : "capture", b, $) && y(b, $)) {
      const L = h[b];
      L.delete($), L.size === 0 && (window.removeEventListener(b, m), h[b] = void 0);
    }
    O.has($) && O.delete($), O.size === 0 && M.delete(R), M.size === 0 && (window.removeEventListener(b, f, z === "capture"), c[z][b] = void 0);
  }
  return {
    on: C,
    off: S
  };
}
const { on: He, off: Be } = Aw(), Vw = window.Vue.ref, Mc = window.Vue.readonly, Bw = window.Vue.watch;
function Lw(e) {
  const t = Vw(!!e.value);
  if (t.value)
    return Mc(t);
  const n = Bw(e, (o) => {
    o && (t.value = !0, n());
  });
  return Mc(t);
}
const Dw = window.Vue.computed, Nw = window.Vue.ref, Hw = window.Vue.watch;
function Le(e) {
  const t = Dw(e), n = Nw(t.value);
  return Hw(t, (o) => {
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
const jw = window.Vue.getCurrentInstance;
function md() {
  return jw() !== null;
}
const Wa = typeof window < "u", Ww = window.Vue.onMounted, Uw = window.Vue.onBeforeUnmount;
let lr, qr;
const Kw = () => {
  var e, t;
  lr = Wa ? (t = (e = document) === null || e === void 0 ? void 0 : e.fonts) === null || t === void 0 ? void 0 : t.ready : void 0, qr = !1, lr !== void 0 ? lr.then(() => {
    qr = !0;
  }) : qr = !0;
};
Kw();
function qw(e) {
  if (qr)
    return;
  let t = !1;
  Ww(() => {
    qr || lr == null || lr.then(() => {
      t || e();
    });
  }), Uw(() => {
    t = !0;
  });
}
const Rp = window.Vue.ref, Ic = window.Vue.readonly, Gw = window.Vue.onBeforeMount, Xw = window.Vue.onBeforeUnmount, Ur = Rp(null);
function Ac(e) {
  if (e.clientX > 0 || e.clientY > 0)
    Ur.value = {
      x: e.clientX,
      y: e.clientY
    };
  else {
    const { target: t } = e;
    if (t instanceof Element) {
      const { left: n, top: o, width: r, height: i } = t.getBoundingClientRect();
      n > 0 || o > 0 ? Ur.value = {
        x: n + r / 2,
        y: o + i / 2
      } : Ur.value = { x: 0, y: 0 };
    } else
      Ur.value = null;
  }
}
let _i = 0, Vc = !0;
function Yw() {
  if (!Wa)
    return Ic(Rp(null));
  _i === 0 && He("click", document, Ac, !0);
  const e = () => {
    _i += 1;
  };
  return Vc && (Vc = md()) ? (Gw(e), Xw(() => {
    _i -= 1, _i === 0 && Be("click", document, Ac, !0);
  })) : e(), Ic(Ur);
}
const Zw = window.Vue.onBeforeMount, Jw = window.Vue.onBeforeUnmount, Ms = window.Vue.ref, Bc = window.Vue.readonly, Qw = Ms(void 0);
let Ti = 0;
function Lc() {
  Qw.value = Date.now();
}
let Dc = !0;
function e0(e) {
  if (!Wa)
    return Bc(Ms(!1));
  const t = Ms(!1);
  let n = null;
  function o() {
    n !== null && window.clearTimeout(n);
  }
  function r() {
    o(), t.value = !0, n = window.setTimeout(() => {
      t.value = !1;
    }, e);
  }
  Ti === 0 && He("click", window, Lc, !0);
  const i = () => {
    Ti += 1, He("click", window, r, !0);
  };
  return Dc && (Dc = md()) ? (Zw(i), Jw(() => {
    Ti -= 1, Ti === 0 && Be("click", window, Lc, !0), Be("click", window, r, !0), o();
  })) : i(), Bc(t);
}
const t0 = window.Vue.watch, n0 = window.Vue.computed;
function Xt(e, t) {
  return t0(e, (n) => {
    n !== void 0 && (t.value = n);
  }), n0(() => e.value === void 0 ? t.value : e.value);
}
const o0 = window.Vue.ref, r0 = window.Vue.onMounted, i0 = window.Vue.readonly;
function hi() {
  const e = o0(!1);
  return r0(() => {
    e.value = !0;
  }), i0(e);
}
const a0 = window.Vue.computed;
function kp(e, t) {
  return a0(() => {
    for (const n of t)
      if (e[n] !== void 0)
        return e[n];
    return e[t[t.length - 1]];
  });
}
const l0 = (typeof window > "u" ? !1 : /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) && // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
!window.MSStream;
function s0() {
  return l0;
}
const d0 = window.Vue.ref, hl = window.Vue.computed, c0 = window.Vue.onBeforeUnmount, u0 = {
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
function f0(e) {
  return `(min-width: ${e}px)`;
}
const Pr = {};
function h0(e = u0) {
  if (!Wa)
    return hl(() => []);
  if (typeof window.matchMedia != "function")
    return hl(() => []);
  const t = d0({}), n = Object.keys(e), o = (r, i) => {
    r.matches ? t.value[i] = !0 : t.value[i] = !1;
  };
  return n.forEach((r) => {
    const i = e[r];
    let l, a;
    Pr[i] === void 0 ? (l = window.matchMedia(f0(i)), l.addEventListener ? l.addEventListener("change", (s) => {
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
  }), c0(() => {
    n.forEach((r) => {
      const { cbs: i } = Pr[e[r]];
      i.has(o) && i.delete(o);
    });
  }), hl(() => {
    const { value: r } = t;
    return n.filter((i) => r[i]);
  });
}
const p0 = window.Vue.onBeforeMount, v0 = window.Vue.onBeforeUnmount, m0 = window.Vue.reactive, g0 = window.Vue.readonly, b0 = window.Vue.watch;
function w0(e = {}, t) {
  const n = m0({
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
    (t === void 0 || t.value) && (He("keydown", document, i), He("keyup", document, l)), t !== void 0 && b0(t, (s) => {
      s ? (He("keydown", document, i), He("keyup", document, l)) : (Be("keydown", document, i), Be("keyup", document, l));
    });
  };
  return md() ? (p0(a), v0(() => {
    (t === void 0 || t.value) && (Be("keydown", document, i), Be("keyup", document, l));
  })) : a(), g0(n);
}
const gd = "n-internal-select-menu", Pp = "n-internal-select-menu-body", Ua = "n-drawer-body", Ka = "n-modal-body", y0 = "n-modal-provider", _p = "n-modal", pi = "n-popover-body", Fi = window.Vue.inject, x0 = window.Vue.onBeforeUnmount, C0 = window.Vue.onMounted, S0 = window.Vue.ref, Tp = "__disabled__";
function Pn(e) {
  const t = Fi(Ka, null), n = Fi(Ua, null), o = Fi(pi, null), r = Fi(Pp, null), i = S0();
  if (typeof document < "u") {
    i.value = document.fullscreenElement;
    const l = () => {
      i.value = document.fullscreenElement;
    };
    C0(() => {
      He("fullscreenchange", document, l);
    }), x0(() => {
      Be("fullscreenchange", document, l);
    });
  }
  return Le(() => {
    var l;
    const {
      to: a
    } = e;
    return a !== void 0 ? a === !1 ? Tp : a === !0 ? i.value || "body" : a : t != null && t.value ? (l = t.value.$el) !== null && l !== void 0 ? l : t.value : n != null && n.value ? n.value : o != null && o.value ? o.value : r != null && r.value ? r.value : a ?? (i.value || "body");
  });
}
Pn.tdkey = Tp;
Pn.propTo = {
  type: [String, Object, Boolean],
  default: void 0
};
const $0 = window.Vue.getCurrentInstance, R0 = window.Vue.inject, k0 = window.Vue.onBeforeUnmount;
window.Vue.onMounted;
const P0 = window.Vue.watch;
function _0(e, t, n) {
  var o;
  const r = R0(e, null);
  if (r === null) return;
  const i = (o = $0()) === null || o === void 0 ? void 0 : o.proxy;
  P0(n, l), l(n.value), k0(() => {
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
const T0 = window.Vue.ref, F0 = window.Vue.watch;
function E0(e, t, n) {
  const o = T0(e.value);
  let r = null;
  return F0(e, (i) => {
    r !== null && window.clearTimeout(r), i === !0 ? n && !n.value ? o.value = !0 : r = window.setTimeout(() => {
      o.value = !0;
    }, t) : o.value = !1;
  }), o;
}
const zo = typeof document < "u" && typeof window < "u", O0 = window.Vue.onBeforeMount, z0 = window.Vue.onBeforeUnmount, M0 = window.Vue.ref, bd = M0(!1);
function Nc() {
  bd.value = !0;
}
function Hc() {
  bd.value = !1;
}
let _r = 0;
function I0() {
  return zo && (O0(() => {
    _r || (window.addEventListener("compositionstart", Nc), window.addEventListener("compositionend", Hc)), _r++;
  }), z0(() => {
    _r <= 1 ? (window.removeEventListener("compositionstart", Nc), window.removeEventListener("compositionend", Hc), _r = 0) : _r--;
  })), bd;
}
const A0 = window.Vue.onBeforeUnmount, V0 = window.Vue.onMounted, B0 = window.Vue.ref, L0 = window.Vue.watch;
let Ho = 0, jc = "", Wc = "", Uc = "", Kc = "";
const qc = B0("0px");
function D0(e) {
  if (typeof document > "u") return;
  const t = document.documentElement;
  let n, o = !1;
  const r = () => {
    t.style.marginRight = jc, t.style.overflow = Wc, t.style.overflowX = Uc, t.style.overflowY = Kc, qc.value = "0px";
  };
  V0(() => {
    n = L0(e, (i) => {
      if (i) {
        if (!Ho) {
          const l = window.innerWidth - t.offsetWidth;
          l > 0 && (jc = t.style.marginRight, t.style.marginRight = `${l}px`, qc.value = `${l}px`), Wc = t.style.overflow, Uc = t.style.overflowX, Kc = t.style.overflowY, t.style.overflow = "hidden", t.style.overflowX = "hidden", t.style.overflowY = "hidden";
        }
        o = !0, Ho++;
      } else
        Ho--, Ho || r(), o = !1;
    }, {
      immediate: !0
    });
  }), A0(() => {
    n == null || n(), o && (Ho--, Ho || r(), o = !1);
  });
}
const N0 = window.Vue.onActivated, H0 = window.Vue.onDeactivated;
function j0(e) {
  const t = {
    isDeactivated: !1
  };
  let n = !1;
  return N0(() => {
    if (t.isDeactivated = !1, !n) {
      n = !0;
      return;
    }
    e();
  }), H0(() => {
    t.isDeactivated = !0, n || (n = !0);
  }), t;
}
const W0 = window.Vue.Fragment, U0 = window.Vue.createTextVNode, K0 = window.Vue.Comment;
function Is(e, t, n = "default") {
  const o = t[n];
  if (o === void 0)
    throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  return o();
}
function As(e, t = !0, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(U0(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        As(o, t, n);
        return;
      }
      if (o.type === W0) {
        if (o.children === null)
          return;
        Array.isArray(o.children) && As(o.children, t, n);
      } else o.type !== K0 && n.push(o);
    }
  }), n;
}
function Gc(e, t, n = "default") {
  const o = t[n];
  if (o === void 0)
    throw new Error(`[vueuc/${e}]: slot[${n}] is empty.`);
  const r = As(o());
  if (r.length === 1)
    return r[0];
  throw new Error(`[vueuc/${e}]: slot[${n}] should have exactly one child.`);
}
let Gn = null;
function Fp() {
  if (Gn === null && (Gn = document.getElementById("v-binder-view-measurer"), Gn === null)) {
    Gn = document.createElement("div"), Gn.id = "v-binder-view-measurer";
    const { style: e } = Gn;
    e.position = "fixed", e.left = "0", e.right = "0", e.top = "0", e.bottom = "0", e.pointerEvents = "none", e.visibility = "hidden", document.body.appendChild(Gn);
  }
  return Gn.getBoundingClientRect();
}
function q0(e, t) {
  const n = Fp();
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
  const t = e.getBoundingClientRect(), n = Fp();
  return {
    left: t.left - n.left,
    top: t.top - n.top,
    bottom: n.height + n.top - t.bottom,
    right: n.width + n.left - t.right,
    width: t.width,
    height: t.height
  };
}
function G0(e) {
  return e.nodeType === 9 ? null : e.parentNode;
}
function Ep(e) {
  if (e === null)
    return null;
  const t = G0(e);
  if (t === null)
    return null;
  if (t.nodeType === 9)
    return document;
  if (t.nodeType === 1) {
    const { overflow: n, overflowX: o, overflowY: r } = getComputedStyle(t);
    if (/(auto|scroll|overlay)/.test(n + r + o))
      return t;
  }
  return Ep(t);
}
const X0 = window.Vue.defineComponent, Y0 = window.Vue.provide, Z0 = window.Vue.ref, J0 = window.Vue.inject, Q0 = window.Vue.getCurrentInstance, ey = window.Vue.onBeforeUnmount, wd = X0({
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
    Y0("VBinder", (t = Q0()) === null || t === void 0 ? void 0 : t.proxy);
    const n = J0("VBinder", null), o = Z0(null), r = (u) => {
      o.value = u, n && e.syncTargetWithParent && n.setTargetRef(u);
    };
    let i = [];
    const l = () => {
      let u = o.value;
      for (; u = Ep(u), u !== null; )
        i.push(u);
      for (const w of i)
        He("scroll", w, h, !0);
    }, a = () => {
      for (const u of i)
        Be("scroll", u, h, !0);
      i = [];
    }, s = /* @__PURE__ */ new Set(), d = (u) => {
      s.size === 0 && l(), s.has(u) || s.add(u);
    }, c = (u) => {
      s.has(u) && s.delete(u), s.size === 0 && a();
    }, h = () => {
      ii(p);
    }, p = () => {
      s.forEach((u) => u());
    }, v = /* @__PURE__ */ new Set(), f = (u) => {
      v.size === 0 && He("resize", window, g), v.has(u) || v.add(u);
    }, m = (u) => {
      v.has(u) && v.delete(u), v.size === 0 && Be("resize", window, g);
    }, g = () => {
      v.forEach((u) => u());
    };
    return ey(() => {
      Be("resize", window, g), a();
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
    return Is("binder", this.$slots);
  }
}), ty = window.Vue.defineComponent, ny = window.Vue.inject, oy = window.Vue.withDirectives, yd = ty({
  name: "Target",
  setup() {
    const { setTargetRef: e, syncTarget: t } = ny("VBinder");
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
    return e ? oy(Gc("follower", this.$slots), [
      [t]
    ]) : Gc("follower", this.$slots);
  }
}), jo = "@@mmoContext", ry = {
  mounted(e, { value: t }) {
    e[jo] = {
      handler: void 0
    }, typeof t == "function" && (e[jo].handler = t, He("mousemoveoutside", e, t));
  },
  updated(e, { value: t }) {
    const n = e[jo];
    typeof t == "function" ? n.handler ? n.handler !== t && (Be("mousemoveoutside", e, n.handler), n.handler = t, He("mousemoveoutside", e, t)) : (e[jo].handler = t, He("mousemoveoutside", e, t)) : n.handler && (Be("mousemoveoutside", e, n.handler), n.handler = void 0);
  },
  unmounted(e) {
    const { handler: t } = e[jo];
    t && Be("mousemoveoutside", e, t), e[jo].handler = void 0;
  }
}, Wo = "@@coContext", li = {
  mounted(e, { value: t, modifiers: n }) {
    e[Wo] = {
      handler: void 0
    }, typeof t == "function" && (e[Wo].handler = t, He("clickoutside", e, t, {
      capture: n.capture
    }));
  },
  updated(e, { value: t, modifiers: n }) {
    const o = e[Wo];
    typeof t == "function" ? o.handler ? o.handler !== t && (Be("clickoutside", e, o.handler, {
      capture: n.capture
    }), o.handler = t, He("clickoutside", e, t, {
      capture: n.capture
    })) : (e[Wo].handler = t, He("clickoutside", e, t, {
      capture: n.capture
    })) : o.handler && (Be("clickoutside", e, o.handler, {
      capture: n.capture
    }), o.handler = void 0);
  },
  unmounted(e, { modifiers: t }) {
    const { handler: n } = e[Wo];
    n && Be("clickoutside", e, n, {
      capture: t.capture
    }), e[Wo].handler = void 0;
  }
};
function iy(e, t) {
  console.error(`[vdirs/${e}]: ${t}`);
}
class ay {
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
    o.has(t) ? o.delete(t) : n === void 0 && iy("z-index-manager/unregister-element", "Element not found when unregistering."), this.squashState();
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
const vl = new ay(), Uo = "@@ziContext", xd = {
  mounted(e, t) {
    const { value: n = {} } = t, { zIndex: o, enabled: r } = n;
    e[Uo] = {
      enabled: !!r,
      initialized: !1
    }, r && (vl.ensureZIndex(e, o), e[Uo].initialized = !0);
  },
  updated(e, t) {
    const { value: n = {} } = t, { zIndex: o, enabled: r } = n, i = e[Uo].enabled;
    r && !i && (vl.ensureZIndex(e, o), e[Uo].initialized = !0), e[Uo].enabled = !!r;
  },
  unmounted(e, t) {
    if (!e[Uo].initialized)
      return;
    const { value: n = {} } = t, { zIndex: o } = n;
    vl.unregister(e, o);
  }
}, ly = window.Vue.inject, sy = "@css-render/vue3-ssr";
function dy(e, t) {
  return `<style cssr-id="${e}">
${t}
</style>`;
}
function cy(e, t, n) {
  const { styles: o, ids: r } = n;
  r.has(e) || o !== null && (r.add(e), o.push(dy(e, t)));
}
const uy = typeof document < "u";
function Mo() {
  if (uy)
    return;
  const e = ly(sy, null);
  if (e !== null)
    return {
      adapter: (t, n) => cy(t, n, e),
      context: e
    };
}
function Xc(e, t) {
  console.error(`[vueuc/${e}]: ${t}`);
}
const { c: ro } = vp(), Cd = "vueuc-style";
function Yc(e) {
  return e & -e;
}
class Op {
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
      r[t] += n, t += Yc(t);
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
      i += n[t], t -= Yc(t);
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
function Zc(e) {
  return typeof e == "string" ? document.querySelector(e) : e() || null;
}
const fy = window.Vue.Teleport, hy = window.Vue.h, py = window.Vue.toRef, vy = window.Vue.computed, my = window.Vue.defineComponent, zp = my({
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
      showTeleport: Lw(py(e, "show")),
      mergedTo: vy(() => {
        const { to: t } = e;
        return t ?? "body";
      })
    };
  },
  render() {
    return this.showTeleport ? this.disabled ? Is("lazy-teleport", this.$slots) : hy(fy, {
      disabled: this.disabled,
      to: this.mergedTo
    }, Is("lazy-teleport", this.$slots)) : null;
  }
}), Ei = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, Jc = {
  start: "end",
  center: "center",
  end: "start"
}, ml = {
  top: "height",
  bottom: "height",
  left: "width",
  right: "width"
}, gy = {
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
}, by = {
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
}, wy = {
  "bottom-start": "right",
  "bottom-end": "left",
  "top-start": "right",
  "top-end": "left",
  "right-start": "bottom",
  "right-end": "top",
  "left-start": "bottom",
  "left-end": "top"
}, Qc = {
  top: !0,
  // top++
  bottom: !1,
  // top--
  left: !0,
  // left++
  right: !1
  // left--
}, eu = {
  top: "end",
  bottom: "start",
  left: "end",
  right: "start"
};
function yy(e, t, n, o, r, i) {
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
    return w > 0 && o && (m ? u = Qc[f] ? w : -w : g = Qc[f] ? w : -w), {
      left: g,
      top: u
    };
  }, h = l === "left" || l === "right";
  if (s !== "center") {
    const v = wy[e], f = Ei[v], m = ml[v];
    if (n[m] > t[m]) {
      if (
        // current space is not enough
        // ----------[ target ]---------|
        // -------[     follower        ]
        t[v] + t[m] < n[m]
      ) {
        const g = (n[m] - t[m]) / 2;
        t[v] < g || t[f] < g ? t[v] < t[f] ? (s = Jc[a], d = c(m, f, h)) : d = c(m, v, h) : s = "center";
      }
    } else n[m] < t[m] && t[f] < 0 && // opposite align has larger space
    // ------------[   target   ]
    // ----------------[follower]
    t[v] > t[f] && (s = Jc[a]);
  } else {
    const v = l === "bottom" || l === "top" ? "left" : "top", f = Ei[v], m = ml[v], g = (n[m] - t[m]) / 2;
    // center is not enough
    // ----------- [ target ]--|
    // -------[     follower     ]
    (t[v] < g || t[f] < g) && (t[v] > t[f] ? (s = eu[v], d = c(m, v, h)) : (s = eu[f], d = c(m, f, h)));
  }
  let p = l;
  return (
    // space is not enough
    t[l] < n[ml[l]] && // opposite position's space is larger
    t[l] < t[Ei[l]] && (p = Ei[l]), {
      placement: s !== "center" ? `${p}-${s}` : p,
      left: d.left,
      top: d.top
    }
  );
}
function xy(e, t) {
  return t ? by[e] : gy[e];
}
function Cy(e, t, n, o, r, i) {
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
const gl = window.Vue.h, Sy = window.Vue.defineComponent, $y = window.Vue.inject, Ry = window.Vue.nextTick, Oi = window.Vue.watch, bl = window.Vue.toRef, tu = window.Vue.ref, ky = window.Vue.onMounted, Py = window.Vue.onBeforeUnmount, _y = window.Vue.withDirectives, Ty = ro([
  ro(".v-binder-follower-container", {
    position: "absolute",
    left: "0",
    right: "0",
    top: "0",
    height: "0",
    pointerEvents: "none",
    zIndex: "auto"
  }),
  ro(".v-binder-follower-content", {
    position: "absolute",
    zIndex: "auto"
  }, [
    ro("> *", {
      pointerEvents: "all"
    })
  ])
]), Sd = Sy({
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
    const t = $y("VBinder"), n = Le(() => e.enabled !== void 0 ? e.enabled : e.show), o = tu(null), r = tu(null), i = () => {
      const { syncTrigger: p } = e;
      p.includes("scroll") && t.addScrollListener(s), p.includes("resize") && t.addResizeListener(s);
    }, l = () => {
      t.removeScrollListener(s), t.removeResizeListener(s);
    };
    ky(() => {
      n.value && (s(), i());
    });
    const a = Mo();
    Ty.mount({
      id: "vueuc/binder",
      head: !0,
      anchorMetaName: Cd,
      ssr: a
    }), Py(() => {
      l();
    }), qw(() => {
      n.value && s();
    });
    const s = () => {
      if (!n.value)
        return;
      const p = o.value;
      if (p === null)
        return;
      const v = t.targetRef, { x: f, y: m, overlap: g } = e, u = f !== void 0 && m !== void 0 ? q0(f, m) : pl(v);
      p.style.setProperty("--v-target-width", `${Math.round(u.width)}px`), p.style.setProperty("--v-target-height", `${Math.round(u.height)}px`);
      const { width: w, minWidth: x, placement: y, internalShift: C, flip: S } = e;
      p.setAttribute("v-placement", y), g ? p.setAttribute("v-overlap", "") : p.removeAttribute("v-overlap");
      const { style: b } = p;
      w === "target" ? b.width = `${u.width}px` : w !== void 0 ? b.width = w : b.width = "", x === "target" ? b.minWidth = `${u.width}px` : x !== void 0 ? b.minWidth = x : b.minWidth = "";
      const R = pl(p), $ = pl(r.value), { left: T, top: H, placement: P } = yy(y, u, R, C, S, g), z = xy(P, g), { left: M, top: O, transform: U } = Cy(P, $, u, H, T, g);
      p.setAttribute("v-placement", P), p.style.setProperty("--v-offset-left", `${Math.round(T)}px`), p.style.setProperty("--v-offset-top", `${Math.round(H)}px`), p.style.transform = `translateX(${M}) translateY(${O}) ${U}`, p.style.setProperty("--v-transform-origin", z), p.style.transformOrigin = z;
    };
    Oi(n, (p) => {
      p ? (i(), d()) : l();
    });
    const d = () => {
      Ry().then(s).catch((p) => console.error(p));
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
      Oi(bl(e, p), s);
    }), ["teleportDisabled"].forEach((p) => {
      Oi(bl(e, p), d);
    }), Oi(bl(e, "syncTrigger"), (p) => {
      p.includes("resize") ? t.addResizeListener(s) : t.removeResizeListener(s), p.includes("scroll") ? t.addScrollListener(s) : t.removeScrollListener(s);
    });
    const c = hi(), h = Le(() => {
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
    return gl(zp, {
      show: this.show,
      to: this.mergedTo,
      disabled: this.teleportDisabled
    }, {
      default: () => {
        var e, t;
        const n = gl("div", {
          class: ["v-binder-follower-container", this.containerClass],
          ref: "offsetContainerRef"
        }, [
          gl("div", {
            class: "v-binder-follower-content",
            ref: "followerRef"
          }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e))
        ]);
        return this.zindexable ? _y(n, [
          [
            xd,
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
var ko = [], Fy = function() {
  return ko.some(function(e) {
    return e.activeTargets.length > 0;
  });
}, Ey = function() {
  return ko.some(function(e) {
    return e.skippedTargets.length > 0;
  });
}, nu = "ResizeObserver loop completed with undelivered notifications.", Oy = function() {
  var e;
  typeof ErrorEvent == "function" ? e = new ErrorEvent("error", {
    message: nu
  }) : (e = document.createEvent("Event"), e.initEvent("error", !1, !1), e.message = nu), window.dispatchEvent(e);
}, si;
(function(e) {
  e.BORDER_BOX = "border-box", e.CONTENT_BOX = "content-box", e.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box";
})(si || (si = {}));
var Po = function(e) {
  return Object.freeze(e);
}, zy = /* @__PURE__ */ function() {
  function e(t, n) {
    this.inlineSize = t, this.blockSize = n, Po(this);
  }
  return e;
}(), Mp = function() {
  function e(t, n, o, r) {
    return this.x = t, this.y = n, this.width = o, this.height = r, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Po(this);
  }
  return e.prototype.toJSON = function() {
    var t = this, n = t.x, o = t.y, r = t.top, i = t.right, l = t.bottom, a = t.left, s = t.width, d = t.height;
    return { x: n, y: o, top: r, right: i, bottom: l, left: a, width: s, height: d };
  }, e.fromRect = function(t) {
    return new e(t.x, t.y, t.width, t.height);
  }, e;
}(), $d = function(e) {
  return e instanceof SVGElement && "getBBox" in e;
}, Ip = function(e) {
  if ($d(e)) {
    var t = e.getBBox(), n = t.width, o = t.height;
    return !n && !o;
  }
  var r = e, i = r.offsetWidth, l = r.offsetHeight;
  return !(i || l || e.getClientRects().length);
}, ou = function(e) {
  var t;
  if (e instanceof Element)
    return !0;
  var n = (t = e == null ? void 0 : e.ownerDocument) === null || t === void 0 ? void 0 : t.defaultView;
  return !!(n && e instanceof n.Element);
}, My = function(e) {
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
}, Gr = typeof window < "u" ? window : {}, zi = /* @__PURE__ */ new WeakMap(), ru = /auto|scroll/, Iy = /^tb|vertical/, Ay = /msie|trident/i.test(Gr.navigator && Gr.navigator.userAgent), wn = function(e) {
  return parseFloat(e || "0");
}, sr = function(e, t, n) {
  return e === void 0 && (e = 0), t === void 0 && (t = 0), n === void 0 && (n = !1), new zy((n ? t : e) || 0, (n ? e : t) || 0);
}, iu = Po({
  devicePixelContentBoxSize: sr(),
  borderBoxSize: sr(),
  contentBoxSize: sr(),
  contentRect: new Mp(0, 0, 0, 0)
}), Ap = function(e, t) {
  if (t === void 0 && (t = !1), zi.has(e) && !t)
    return zi.get(e);
  if (Ip(e))
    return zi.set(e, iu), iu;
  var n = getComputedStyle(e), o = $d(e) && e.ownerSVGElement && e.getBBox(), r = !Ay && n.boxSizing === "border-box", i = Iy.test(n.writingMode || ""), l = !o && ru.test(n.overflowY || ""), a = !o && ru.test(n.overflowX || ""), s = o ? 0 : wn(n.paddingTop), d = o ? 0 : wn(n.paddingRight), c = o ? 0 : wn(n.paddingBottom), h = o ? 0 : wn(n.paddingLeft), p = o ? 0 : wn(n.borderTopWidth), v = o ? 0 : wn(n.borderRightWidth), f = o ? 0 : wn(n.borderBottomWidth), m = o ? 0 : wn(n.borderLeftWidth), g = h + d, u = s + c, w = m + v, x = p + f, y = a ? e.offsetHeight - x - e.clientHeight : 0, C = l ? e.offsetWidth - w - e.clientWidth : 0, S = r ? g + w : 0, b = r ? u + x : 0, R = o ? o.width : wn(n.width) - S - C, $ = o ? o.height : wn(n.height) - b - y, T = R + g + C + w, H = $ + u + y + x, P = Po({
    devicePixelContentBoxSize: sr(Math.round(R * devicePixelRatio), Math.round($ * devicePixelRatio), i),
    borderBoxSize: sr(T, H, i),
    contentBoxSize: sr(R, $, i),
    contentRect: new Mp(h, s, R, $)
  });
  return zi.set(e, P), P;
}, Vp = function(e, t, n) {
  var o = Ap(e, n), r = o.borderBoxSize, i = o.contentBoxSize, l = o.devicePixelContentBoxSize;
  switch (t) {
    case si.DEVICE_PIXEL_CONTENT_BOX:
      return l;
    case si.BORDER_BOX:
      return r;
    default:
      return i;
  }
}, Vy = /* @__PURE__ */ function() {
  function e(t) {
    var n = Ap(t);
    this.target = t, this.contentRect = n.contentRect, this.borderBoxSize = Po([n.borderBoxSize]), this.contentBoxSize = Po([n.contentBoxSize]), this.devicePixelContentBoxSize = Po([n.devicePixelContentBoxSize]);
  }
  return e;
}(), Bp = function(e) {
  if (Ip(e))
    return 1 / 0;
  for (var t = 0, n = e.parentNode; n; )
    t += 1, n = n.parentNode;
  return t;
}, By = function() {
  var e = 1 / 0, t = [];
  ko.forEach(function(l) {
    if (l.activeTargets.length !== 0) {
      var a = [];
      l.activeTargets.forEach(function(d) {
        var c = new Vy(d.target), h = Bp(d.target);
        a.push(c), d.lastReportedSize = Vp(d.target, d.observedBox), h < e && (e = h);
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
}, au = function(e) {
  ko.forEach(function(n) {
    n.activeTargets.splice(0, n.activeTargets.length), n.skippedTargets.splice(0, n.skippedTargets.length), n.observationTargets.forEach(function(r) {
      r.isActive() && (Bp(r.target) > e ? n.activeTargets.push(r) : n.skippedTargets.push(r));
    });
  });
}, Ly = function() {
  var e = 0;
  for (au(e); Fy(); )
    e = By(), au(e);
  return Ey() && Oy(), e > 0;
}, wl, Lp = [], Dy = function() {
  return Lp.splice(0).forEach(function(e) {
    return e();
  });
}, Ny = function(e) {
  if (!wl) {
    var t = 0, n = document.createTextNode(""), o = { characterData: !0 };
    new MutationObserver(function() {
      return Dy();
    }).observe(n, o), wl = function() {
      n.textContent = "".concat(t ? t-- : t++);
    };
  }
  Lp.push(e), wl();
}, Hy = function(e) {
  Ny(function() {
    requestAnimationFrame(e);
  });
}, $a = 0, jy = function() {
  return !!$a;
}, Wy = 250, Uy = { attributes: !0, characterData: !0, childList: !0, subtree: !0 }, lu = [
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
], su = function(e) {
  return e === void 0 && (e = 0), Date.now() + e;
}, yl = !1, Ky = function() {
  function e() {
    var t = this;
    this.stopped = !0, this.listener = function() {
      return t.schedule();
    };
  }
  return e.prototype.run = function(t) {
    var n = this;
    if (t === void 0 && (t = Wy), !yl) {
      yl = !0;
      var o = su(t);
      Hy(function() {
        var r = !1;
        try {
          r = Ly();
        } finally {
          if (yl = !1, t = o - su(), !jy())
            return;
          r ? n.run(1e3) : t > 0 ? n.run(t) : n.start();
        }
      });
    }
  }, e.prototype.schedule = function() {
    this.stop(), this.run();
  }, e.prototype.observe = function() {
    var t = this, n = function() {
      return t.observer && t.observer.observe(document.body, Uy);
    };
    document.body ? n() : Gr.addEventListener("DOMContentLoaded", n);
  }, e.prototype.start = function() {
    var t = this;
    this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), lu.forEach(function(n) {
      return Gr.addEventListener(n, t.listener, !0);
    }));
  }, e.prototype.stop = function() {
    var t = this;
    this.stopped || (this.observer && this.observer.disconnect(), lu.forEach(function(n) {
      return Gr.removeEventListener(n, t.listener, !0);
    }), this.stopped = !0);
  }, e;
}(), Vs = new Ky(), du = function(e) {
  !$a && e > 0 && Vs.start(), $a += e, !$a && Vs.stop();
}, qy = function(e) {
  return !$d(e) && !My(e) && getComputedStyle(e).display === "inline";
}, Gy = function() {
  function e(t, n) {
    this.target = t, this.observedBox = n || si.CONTENT_BOX, this.lastReportedSize = {
      inlineSize: 0,
      blockSize: 0
    };
  }
  return e.prototype.isActive = function() {
    var t = Vp(this.target, this.observedBox, !0);
    return qy(this.target) && (this.lastReportedSize = t), this.lastReportedSize.inlineSize !== t.inlineSize || this.lastReportedSize.blockSize !== t.blockSize;
  }, e;
}(), Xy = /* @__PURE__ */ function() {
  function e(t, n) {
    this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = n;
  }
  return e;
}(), Mi = /* @__PURE__ */ new WeakMap(), cu = function(e, t) {
  for (var n = 0; n < e.length; n += 1)
    if (e[n].target === t)
      return n;
  return -1;
}, Ii = function() {
  function e() {
  }
  return e.connect = function(t, n) {
    var o = new Xy(t, n);
    Mi.set(t, o);
  }, e.observe = function(t, n, o) {
    var r = Mi.get(t), i = r.observationTargets.length === 0;
    cu(r.observationTargets, n) < 0 && (i && ko.push(r), r.observationTargets.push(new Gy(n, o && o.box)), du(1), Vs.schedule());
  }, e.unobserve = function(t, n) {
    var o = Mi.get(t), r = cu(o.observationTargets, n), i = o.observationTargets.length === 1;
    r >= 0 && (i && ko.splice(ko.indexOf(o), 1), o.observationTargets.splice(r, 1), du(-1));
  }, e.disconnect = function(t) {
    var n = this, o = Mi.get(t);
    o.observationTargets.slice().forEach(function(r) {
      return n.unobserve(t, r.target);
    }), o.activeTargets.splice(0, o.activeTargets.length);
  }, e;
}(), Yy = function() {
  function e(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
    if (typeof t != "function")
      throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
    Ii.connect(this, t);
  }
  return e.prototype.observe = function(t, n) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!ou(t))
      throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Ii.observe(this, t, n);
  }, e.prototype.unobserve = function(t) {
    if (arguments.length === 0)
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
    if (!ou(t))
      throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
    Ii.unobserve(this, t);
  }, e.prototype.disconnect = function() {
    Ii.disconnect(this);
  }, e.toString = function() {
    return "function ResizeObserver () { [polyfill code] }";
  }, e;
}();
class Zy {
  constructor() {
    this.handleResize = this.handleResize.bind(this), this.observer = new (typeof window < "u" && window.ResizeObserver || Yy)(this.handleResize), this.elHandlersMap = /* @__PURE__ */ new Map();
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
const Xr = new Zy(), Jy = window.Vue.defineComponent, Qy = window.Vue.renderSlot, ex = window.Vue.getCurrentInstance, tx = window.Vue.onMounted, nx = window.Vue.onBeforeUnmount, To = Jy({
  name: "ResizeObserver",
  props: {
    onResize: Function
  },
  setup(e) {
    let t = !1;
    const n = ex().proxy;
    function o(r) {
      const { onResize: i } = e;
      i !== void 0 && i(r);
    }
    tx(() => {
      const r = n.$el;
      if (r === void 0) {
        Xc("resize-observer", "$el does not exist.");
        return;
      }
      if (r.nextElementSibling !== r.nextSibling && r.nodeType === 3 && r.nodeValue !== "") {
        Xc("resize-observer", "$el can not be observed (it may be a text node).");
        return;
      }
      r.nextElementSibling !== null && (Xr.registerHandler(r.nextElementSibling, o), t = !0);
    }), nx(() => {
      t && Xr.unregisterHandler(n.$el.nextElementSibling);
    });
  },
  render() {
    return Qy(this.$slots, "default");
  }
});
let Ai;
function ox() {
  return typeof document > "u" ? !1 : (Ai === void 0 && ("matchMedia" in window ? Ai = window.matchMedia("(pointer:coarse)").matches : Ai = !1), Ai);
}
let xl;
function uu() {
  return typeof document > "u" ? 1 : (xl === void 0 && (xl = "chrome" in window ? window.devicePixelRatio : 1), xl);
}
const Dp = "VVirtualListXScroll", rx = window.Vue.computed, ix = window.Vue.provide, fu = window.Vue.ref;
function ax({ columnsRef: e, renderColRef: t, renderItemWithColsRef: n }) {
  const o = fu(0), r = fu(0), i = rx(() => {
    const d = e.value;
    if (d.length === 0)
      return null;
    const c = new Op(d.length, 0);
    return d.forEach((h, p) => {
      c.add(p, h.width);
    }), c;
  }), l = Le(() => {
    const d = i.value;
    return d !== null ? Math.max(d.getBound(r.value) - 1, 0) : 0;
  }), a = (d) => {
    const c = i.value;
    return c !== null ? c.sum(d) : 0;
  }, s = Le(() => {
    const d = i.value;
    return d !== null ? Math.min(d.getBound(r.value + o.value) + 1, e.value.length - 1) : 0;
  });
  return ix(Dp, {
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
const lx = window.Vue.defineComponent, sx = window.Vue.inject, hu = lx({
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
      sx(Dp)
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
}), dx = window.Vue.mergeProps, Tr = window.Vue.computed, cx = window.Vue.defineComponent, Fr = window.Vue.ref, ux = window.Vue.onMounted, vo = window.Vue.h, fx = window.Vue.onActivated, hx = window.Vue.onDeactivated, Cl = window.Vue.toRef, px = ro(".v-vl", {
  maxHeight: "inherit",
  height: "100%",
  overflow: "auto",
  minWidth: "1px"
  // a zero width container won't be scrollable
}, [
  ro("&:not(.v-vl--show-scrollbar)", {
    scrollbarWidth: "none"
  }, [
    ro("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb", {
      width: 0,
      height: 0,
      display: "none"
    })
  ])
]), Rd = cx({
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
    const t = Mo();
    px.mount({
      id: "vueuc/virtual-list",
      head: !0,
      anchorMetaName: Cd,
      ssr: t
    }), ux(() => {
      const { defaultScrollIndex: z, defaultScrollKey: M } = e;
      z != null ? g({ index: z }) : M != null && g({ key: M });
    });
    let n = !1, o = !1;
    fx(() => {
      if (n = !1, !o) {
        o = !0;
        return;
      }
      g({ top: v.value, left: l.value });
    }), hx(() => {
      n = !0, o || (o = !0);
    });
    const r = Le(() => {
      if (e.renderCol == null && e.renderItemWithCols == null || e.columns.length === 0)
        return;
      let z = 0;
      return e.columns.forEach((M) => {
        z += M.width;
      }), z;
    }), i = Tr(() => {
      const z = /* @__PURE__ */ new Map(), { keyField: M } = e;
      return e.items.forEach((O, U) => {
        z.set(O[M], U);
      }), z;
    }), { scrollLeftRef: l, listWidthRef: a } = ax({
      columnsRef: Cl(e, "columns"),
      renderColRef: Cl(e, "renderCol"),
      renderItemWithColsRef: Cl(e, "renderItemWithCols")
    }), s = Fr(null), d = Fr(void 0), c = /* @__PURE__ */ new Map(), h = Tr(() => {
      const { items: z, itemSize: M, keyField: O } = e, U = new Op(z.length, M);
      return z.forEach((L, Y) => {
        const te = L[O], J = c.get(te);
        J !== void 0 && U.add(Y, J);
      }), U;
    }), p = Fr(0), v = Fr(0), f = Le(() => Math.max(h.value.getBound(v.value - Rn(e.paddingTop)) - 1, 0)), m = Tr(() => {
      const { value: z } = d;
      if (z === void 0)
        return [];
      const { items: M, itemSize: O } = e, U = f.value, L = Math.min(U + Math.ceil(z / O + 1), M.length - 1), Y = [];
      for (let te = U; te <= L; ++te)
        Y.push(M[te]);
      return Y;
    }), g = (z, M) => {
      if (typeof z == "number") {
        y(z, M, "auto");
        return;
      }
      const { left: O, top: U, index: L, key: Y, position: te, behavior: J, debounce: X = !0 } = z;
      if (O !== void 0 || U !== void 0)
        y(O, U, J);
      else if (L !== void 0)
        x(L, J, X);
      else if (Y !== void 0) {
        const A = i.value.get(Y);
        A !== void 0 && x(A, J, X);
      } else te === "bottom" ? y(0, Number.MAX_SAFE_INTEGER, J) : te === "top" && y(0, 0, J);
    };
    let u, w = null;
    function x(z, M, O) {
      const { value: U } = h, L = U.sum(z) + Rn(e.paddingTop);
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
        const { scrollTop: Y, offsetHeight: te } = s.value;
        if (L > Y) {
          const J = U.get(z);
          L + J <= Y + te || s.value.scrollTo({
            left: 0,
            top: L + J - te,
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
    function y(z, M, O) {
      s.value.scrollTo({
        left: z,
        top: M,
        behavior: O
      });
    }
    function C(z, M) {
      var O, U, L;
      if (n || e.ignoreItemResize || P(M.target))
        return;
      const { value: Y } = h, te = i.value.get(z), J = Y.get(te), X = (L = (U = (O = M.borderBoxSize) === null || O === void 0 ? void 0 : O[0]) === null || U === void 0 ? void 0 : U.blockSize) !== null && L !== void 0 ? L : M.contentRect.height;
      if (X === J)
        return;
      X - e.itemSize === 0 ? c.delete(z) : c.set(z, X - e.itemSize);
      const G = X - J;
      if (G === 0)
        return;
      Y.add(te, G);
      const Z = s.value;
      if (Z != null) {
        if (u === void 0) {
          const ie = Y.sum(te);
          Z.scrollTop > ie && Z.scrollBy(0, G);
        } else if (te < u)
          Z.scrollBy(0, G);
        else if (te === u) {
          const ie = Y.sum(te);
          X + ie > // Note, listEl shouldn't have border, nor offsetHeight won't be
          // correct
          Z.scrollTop + Z.offsetHeight && Z.scrollBy(0, G);
        }
        H();
      }
      p.value++;
    }
    const S = !ox();
    let b = !1;
    function R(z) {
      var M;
      (M = e.onScroll) === null || M === void 0 || M.call(e, z), (!S || !b) && H();
    }
    function $(z) {
      var M;
      if ((M = e.onWheel) === null || M === void 0 || M.call(e, z), S) {
        const O = s.value;
        if (O != null) {
          if (z.deltaX === 0 && (O.scrollTop === 0 && z.deltaY <= 0 || O.scrollTop + O.offsetHeight >= O.scrollHeight && z.deltaY >= 0))
            return;
          z.preventDefault(), O.scrollTop += z.deltaY / uu(), O.scrollLeft += z.deltaX / uu(), H(), b = !0, ii(() => {
            b = !1;
          });
        }
      }
    }
    function T(z) {
      if (n || P(z.target))
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
    function H() {
      const { value: z } = s;
      z != null && (v.value = z.scrollTop, l.value = z.scrollLeft);
    }
    function P(z) {
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
      itemsStyle: Tr(() => {
        const { itemResizable: z } = e, M = pt(h.value.sum());
        return p.value, [
          e.itemsStyle,
          {
            boxSizing: "content-box",
            width: pt(r.value),
            height: z ? "" : M,
            minHeight: z ? M : "",
            paddingTop: pt(e.paddingTop),
            paddingBottom: pt(e.paddingBottom)
          }
        ];
      }),
      visibleItemsStyle: Tr(() => (p.value, {
        transform: `translateY(${pt(h.value.sum(f.value))})`
      })),
      viewportItems: m,
      listElRef: s,
      itemsElRef: Fr(null),
      scrollTo: g,
      handleListResize: T,
      handleListScroll: R,
      handleListWheel: $,
      handleItemResize: C
    };
  },
  render() {
    const { itemResizable: e, keyField: t, keyToIndex: n, visibleItemsTag: o } = this;
    return vo(To, {
      onResize: this.handleListResize
    }, {
      default: () => {
        var r, i;
        return vo("div", dx(this.$attrs, {
          class: ["v-vl", this.showScrollbar && "v-vl--show-scrollbar"],
          onScroll: this.handleListScroll,
          onWheel: this.handleListWheel,
          ref: "listElRef"
        }), [
          this.items.length !== 0 ? vo("div", {
            ref: "itemsElRef",
            class: "v-vl-items",
            style: this.itemsStyle
          }, [
            vo(o, Object.assign({
              class: "v-vl-visible-items",
              style: this.visibleItemsStyle
            }, this.visibleItemsProps), {
              default: () => {
                const { renderCol: l, renderItemWithCols: a } = this;
                return this.viewportItems.map((s) => {
                  const d = s[t], c = n.get(d), h = l != null ? vo(hu, {
                    index: c,
                    item: s
                  }) : void 0, p = a != null ? vo(hu, {
                    index: c,
                    item: s
                  }) : void 0, v = this.$slots.default({
                    item: s,
                    renderedCols: h,
                    renderedItemWithCols: p,
                    index: c
                  })[0];
                  return e ? vo(To, {
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
}), vx = window.Vue.defineComponent, mx = window.Vue.renderSlot, pu = window.Vue.h, gx = window.Vue.onMounted, vu = window.Vue.ref, bx = window.Vue.nextTick, In = "v-hidden", wx = ro("[v-hidden]", {
  display: "none!important"
}), mu = vx({
  name: "Overflow",
  props: {
    getCounter: Function,
    getTail: Function,
    updateCounter: Function,
    onUpdateCount: Function,
    onUpdateOverflow: Function
  },
  setup(e, { slots: t }) {
    const n = vu(null), o = vu(null);
    function r(l) {
      const { value: a } = n, { getCounter: s, getTail: d } = e;
      let c;
      if (s !== void 0 ? c = s() : c = o.value, !a || !c)
        return;
      c.hasAttribute(In) && c.removeAttribute(In);
      const { children: h } = a;
      if (l.showAllItemsBeforeCalculate)
        for (const x of h)
          x.hasAttribute(In) && x.removeAttribute(In);
      const p = a.offsetWidth, v = [], f = t.tail ? d == null ? void 0 : d() : null;
      let m = f ? f.offsetWidth : 0, g = !1;
      const u = a.children.length - (t.tail ? 1 : 0);
      for (let x = 0; x < u - 1; ++x) {
        if (x < 0)
          continue;
        const y = h[x];
        if (g) {
          y.hasAttribute(In) || y.setAttribute(In, "");
          continue;
        } else y.hasAttribute(In) && y.removeAttribute(In);
        const C = y.offsetWidth;
        if (m += C, v[x] = C, m > p) {
          const { updateCounter: S } = e;
          for (let b = x; b >= 0; --b) {
            const R = u - 1 - b;
            S !== void 0 ? S(R) : c.textContent = `${R}`;
            const $ = c.offsetWidth;
            if (m -= v[b], m + $ <= p || b === 0) {
              g = !0, x = b - 1, f && (x === -1 ? (f.style.maxWidth = `${p - $}px`, f.style.boxSizing = "border-box") : f.style.maxWidth = "");
              const { onUpdateCount: T } = e;
              T && T(R);
              break;
            }
          }
        }
      }
      const { onUpdateOverflow: w } = e;
      g ? w !== void 0 && w(!0) : (w !== void 0 && w(!1), c.setAttribute(In, ""));
    }
    const i = Mo();
    return wx.mount({
      id: "vueuc/overflow",
      head: !0,
      anchorMetaName: Cd,
      ssr: i
    }), gx(() => r({
      showAllItemsBeforeCalculate: !1
    })), {
      selfRef: n,
      counterRef: o,
      sync: r
    };
  },
  render() {
    const { $slots: e } = this;
    return bx(() => this.sync({
      showAllItemsBeforeCalculate: !1
    })), pu("div", {
      class: "v-overflow",
      ref: "selfRef"
    }, [
      mx(e, "default"),
      // $slots.counter should only has 1 element
      e.counter ? e.counter() : pu("span", {
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
function Np(e) {
  return e instanceof HTMLElement;
}
function Hp(e) {
  for (let t = 0; t < e.childNodes.length; t++) {
    const n = e.childNodes[t];
    if (Np(n) && (Wp(n) || Hp(n)))
      return !0;
  }
  return !1;
}
function jp(e) {
  for (let t = e.childNodes.length - 1; t >= 0; t--) {
    const n = e.childNodes[t];
    if (Np(n) && (Wp(n) || jp(n)))
      return !0;
  }
  return !1;
}
function Wp(e) {
  if (!yx(e))
    return !1;
  try {
    e.focus({ preventScroll: !0 });
  } catch {
  }
  return document.activeElement === e;
}
function yx(e) {
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
const Sl = window.Vue.h, xx = window.Vue.defineComponent, gu = window.Vue.ref, Cx = window.Vue.Fragment, Sx = window.Vue.onMounted, $x = window.Vue.onBeforeUnmount, Rx = window.Vue.watch;
let Er = [];
const Up = xx({
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
    const t = ai(), n = gu(null), o = gu(null);
    let r = !1, i = !1;
    const l = typeof document > "u" ? null : document.activeElement;
    function a() {
      return Er[Er.length - 1] === t;
    }
    function s(g) {
      var u;
      g.code === "Escape" && a() && ((u = e.onEsc) === null || u === void 0 || u.call(e, g));
    }
    Sx(() => {
      Rx(() => e.active, (g) => {
        g ? (h(), He("keydown", document, s)) : (Be("keydown", document, s), r && p());
      }, {
        immediate: !0
      });
    }), $x(() => {
      Be("keydown", document, s), r && p();
    });
    function d(g) {
      if (!i && a()) {
        const u = c();
        if (u === null || u.contains(ur(g)))
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
        if (Er.push(t), e.autoFocus) {
          const { initialFocusTo: u } = e;
          u === void 0 ? v("first") : (g = Zc(u)) === null || g === void 0 || g.focus({ preventScroll: !0 });
        }
        r = !0, document.addEventListener("focus", d, !0);
      }
    }
    function p() {
      var g;
      if (e.disabled || (document.removeEventListener("focus", d, !0), Er = Er.filter((w) => w !== t), a()))
        return;
      const { finalFocusTo: u } = e;
      u !== void 0 ? (g = Zc(u)) === null || g === void 0 || g.focus({ preventScroll: !0 }) : e.returnFocusOnDeactivated && l instanceof HTMLElement && (i = !0, l.focus({ preventScroll: !0 }), i = !1);
    }
    function v(g) {
      if (a() && e.active) {
        const u = n.value, w = o.value;
        if (u !== null && w !== null) {
          const x = c();
          if (x == null || x === w) {
            i = !0, u.focus({ preventScroll: !0 }), i = !1;
            return;
          }
          i = !0;
          const y = g === "first" ? Hp(x) : jp(x);
          i = !1, y || (i = !0, u.focus({ preventScroll: !0 }), i = !1);
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
    return Sl(Cx, null, [
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
}), kx = window.Vue.onBeforeUnmount, Px = window.Vue.onMounted, _x = window.Vue.watch;
function Kp(e, t) {
  t && (Px(() => {
    const {
      value: n
    } = e;
    n && Xr.registerHandler(n, t);
  }), _x(e, (n, o) => {
    o && Xr.unregisterHandler(o);
  }, {
    deep: !1
  }), kx(() => {
    const {
      value: n
    } = e;
    n && Xr.unregisterHandler(n);
  }));
}
function Fa(e) {
  return e.replace(/#|\(|\)|,|\s|\./g, "_");
}
const Tx = /^(\d|\.)+$/, bu = /(\d|\.)+/;
function Ct(e, {
  c: t = 1,
  offset: n = 0,
  attachPx: o = !0
} = {}) {
  if (typeof e == "number") {
    const r = (e + n) * t;
    return r === 0 ? "0" : `${r}px`;
  } else if (typeof e == "string")
    if (Tx.test(e)) {
      const r = (Number(e) + n) * t;
      return o ? r === 0 ? "0" : `${r}px` : `${r}`;
    } else {
      const r = bu.exec(e);
      return r ? e.replace(bu, String((Number(r[0]) + n) * t)) : e;
    }
  return e;
}
function wu(e) {
  const {
    left: t,
    right: n,
    top: o,
    bottom: r
  } = Gt(e);
  return `${o} ${t} ${r} ${n}`;
}
function Fx(e, t) {
  if (!e) return;
  const n = document.createElement("a");
  n.href = e, t !== void 0 && (n.download = t), document.body.appendChild(n), n.click(), document.body.removeChild(n);
}
let $l;
function Ex() {
  return $l === void 0 && ($l = navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")), $l;
}
const qp = /* @__PURE__ */ new WeakSet();
function Ox(e) {
  qp.add(e);
}
function zx(e) {
  return !qp.has(e);
}
function yu(e) {
  switch (typeof e) {
    case "string":
      return e || void 0;
    case "number":
      return String(e);
    default:
      return;
  }
}
const Mx = {
  tiny: "mini",
  small: "tiny",
  medium: "small",
  large: "medium",
  huge: "large"
};
function xu(e) {
  const t = Mx[e];
  if (t === void 0)
    throw new Error(`${e} has no smaller size.`);
  return t;
}
function _n(e, t) {
  console.error(`[naive/${e}]: ${t}`);
}
function Ix(e, t) {
  throw new Error(`[naive/${e}]: ${t}`);
}
function re(e, ...t) {
  if (Array.isArray(e))
    e.forEach((n) => re(n, ...t));
  else
    return e(...t);
}
function Gp(e) {
  return (t) => {
    t ? e.value = t.$el : e.value = null;
  };
}
const Ax = window.Vue.Comment, Vx = window.Vue.createTextVNode, Bx = window.Vue.Fragment;
function Fo(e, t = !0, n = []) {
  return e.forEach((o) => {
    if (o !== null) {
      if (typeof o != "object") {
        (typeof o == "string" || typeof o == "number") && n.push(Vx(String(o)));
        return;
      }
      if (Array.isArray(o)) {
        Fo(o, t, n);
        return;
      }
      if (o.type === Bx) {
        if (o.children === null) return;
        Array.isArray(o.children) && Fo(o.children, t, n);
      } else {
        if (o.type === Ax && t) return;
        n.push(o);
      }
    }
  }), n;
}
function Lx(e, t = "default", n = void 0) {
  const o = e[t];
  if (!o)
    return _n("getFirstSlotVNode", `slot[${t}] is empty`), null;
  const r = Fo(o(n));
  return r.length === 1 ? r[0] : (_n("getFirstSlotVNode", `slot[${t}] should have exactly one child`), null);
}
function Dx(e, t, n) {
  if (!t)
    return null;
  const o = Fo(t(n));
  return o.length === 1 ? o[0] : (_n("getFirstSlotVNode", `slot[${e}] should have exactly one child`), null);
}
function kd(e, t = "default", n = []) {
  const r = e.$slots[t];
  return r === void 0 ? n : r();
}
const Nx = window.Vue.vShow;
function Hx(e) {
  var t;
  const n = (t = e.dirs) === null || t === void 0 ? void 0 : t.find(({
    dir: o
  }) => o === Nx);
  return !!(n && n.value === !1);
}
function ao(e, t = [], n) {
  const o = {};
  return t.forEach((r) => {
    o[r] = e[r];
  }), Object.assign(o, n);
}
function lo(e) {
  return Object.keys(e);
}
function Yr(e) {
  const t = e.filter((n) => n !== void 0);
  if (t.length !== 0)
    return t.length === 1 ? t[0] : (n) => {
      e.forEach((o) => {
        o && o(n);
      });
    };
}
function Xp(e, t = [], n) {
  const o = {};
  return Object.getOwnPropertyNames(e).forEach((i) => {
    t.includes(i) || (o[i] = e[i]);
  }), Object.assign(o, n);
}
const Cu = window.Vue.createTextVNode;
function Ot(e, ...t) {
  return typeof e == "function" ? e(...t) : typeof e == "string" ? Cu(e) : typeof e == "number" ? Cu(String(e)) : null;
}
const jx = window.Vue.Comment, Wx = window.Vue.Fragment, Ux = window.Vue.isVNode;
function hn(e) {
  return e.some((t) => Ux(t) ? !(t.type === jx || t.type === Wx && !hn(t.children)) : !0) ? e : null;
}
function vn(e, t) {
  return e && hn(e()) || t();
}
function Kx(e, t, n) {
  return e && hn(e(t)) || n(t);
}
function dt(e, t) {
  const n = e && hn(e());
  return t(n || null);
}
function Bs(e) {
  return !(e && hn(e()));
}
const qx = window.Vue.defineComponent, Ls = qx({
  render() {
    var e, t;
    return (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e);
  }
}), jn = "n-config-provider", Su = window.Vue.computed, Yp = window.Vue.inject, Zp = window.Vue.shallowRef, Jp = "n";
function qe(e = {}, t = {
  defaultBordered: !0
}) {
  const n = Yp(jn, null);
  return {
    // NConfigProvider,
    inlineThemeDisabled: n == null ? void 0 : n.inlineThemeDisabled,
    mergedRtlRef: n == null ? void 0 : n.mergedRtlRef,
    mergedComponentPropsRef: n == null ? void 0 : n.mergedComponentPropsRef,
    mergedBreakpointsRef: n == null ? void 0 : n.mergedBreakpointsRef,
    mergedBorderedRef: Su(() => {
      var o, r;
      const {
        bordered: i
      } = e;
      return i !== void 0 ? i : (r = (o = n == null ? void 0 : n.mergedBorderedRef.value) !== null && o !== void 0 ? o : t.defaultBordered) !== null && r !== void 0 ? r : !0;
    }),
    mergedClsPrefixRef: n ? n.mergedClsPrefixRef : Zp(Jp),
    namespaceRef: Su(() => n == null ? void 0 : n.mergedNamespaceRef.value)
  };
}
function Qp() {
  const e = Yp(jn, null);
  return e ? e.mergedClsPrefixRef : Zp(Jp);
}
const Gx = window.Vue.inject, Xx = window.Vue.ref, Yx = window.Vue.watchEffect;
function yt(e, t, n, o) {
  n || Ix("useThemeClass", "cssVarsRef is not passed");
  const r = Gx(jn, null), i = r == null ? void 0 : r.mergedThemeHashRef, l = r == null ? void 0 : r.styleMountTarget, a = Xx(""), s = Mo();
  let d;
  const c = `__${e}`, h = () => {
    let p = c;
    const v = t ? t.value : void 0, f = i == null ? void 0 : i.value;
    f && (p += `-${f}`), v && (p += `-${v}`);
    const {
      themeOverrides: m,
      builtinThemeOverrides: g
    } = o;
    m && (p += `-${Os(JSON.stringify(m))}`), g && (p += `-${Os(JSON.stringify(g))}`), a.value = p, d = () => {
      const u = n.value;
      let w = "";
      for (const x in u)
        w += `${x}: ${u[x]};`;
      D(`.${p}`, w).mount({
        id: p,
        ssr: s,
        parent: l
      }), d = void 0;
    };
  };
  return Yx(() => {
    h();
  }), {
    themeClass: a,
    onRender: () => {
      d == null || d();
    }
  };
}
const Rl = window.Vue.computed, Zx = window.Vue.inject, Jx = window.Vue.onBeforeUnmount, Qx = window.Vue.provide, Ds = "n-form-item";
function Io(e, {
  defaultSize: t = "medium",
  mergedSize: n,
  mergedDisabled: o
} = {}) {
  const r = Zx(Ds, null);
  Qx(Ds, null);
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
  return Jx(() => {
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
const eC = {
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
function Or(e) {
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
    const l = i[0], a = o && e.parsePatterns[o] || e.parsePatterns[e.defaultParseWidth], s = Array.isArray(a) ? nC(a, (h) => h.test(l)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      tC(a, (h) => h.test(l))
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
function tC(e, t) {
  for (const n in e)
    if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n]))
      return n;
}
function nC(e, t) {
  for (let n = 0; n < e.length; n++)
    if (t(e[n]))
      return n;
}
function oC(e) {
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
const rC = {
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
}, iC = (e, t, n) => {
  let o;
  const r = rC[e];
  return typeof r == "string" ? o = r : t === 1 ? o = r.one : o = r.other.replace("{{count}}", t.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + o : o + " ago" : o;
}, aC = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, lC = (e, t, n, o) => aC[e], sC = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, dC = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, cC = {
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
}, uC = {
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
}, fC = {
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
}, hC = {
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
}, pC = (e, t) => {
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
}, vC = {
  ordinalNumber: pC,
  era: Or({
    values: sC,
    defaultWidth: "wide"
  }),
  quarter: Or({
    values: dC,
    defaultWidth: "wide",
    argumentCallback: (e) => e - 1
  }),
  month: Or({
    values: cC,
    defaultWidth: "wide"
  }),
  day: Or({
    values: uC,
    defaultWidth: "wide"
  }),
  dayPeriod: Or({
    values: fC,
    defaultWidth: "wide",
    formattingValues: hC,
    defaultFormattingWidth: "wide"
  })
}, mC = /^(\d+)(th|st|nd|rd)?/i, gC = /\d+/i, bC = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, wC = {
  any: [/^b/i, /^(a|c)/i]
}, yC = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, xC = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, CC = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, SC = {
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
}, $C = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, RC = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, kC = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, PC = {
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
}, _C = {
  ordinalNumber: oC({
    matchPattern: mC,
    parsePattern: gC,
    valueCallback: (e) => parseInt(e, 10)
  }),
  era: zr({
    matchPatterns: bC,
    defaultMatchWidth: "wide",
    parsePatterns: wC,
    defaultParseWidth: "any"
  }),
  quarter: zr({
    matchPatterns: yC,
    defaultMatchWidth: "wide",
    parsePatterns: xC,
    defaultParseWidth: "any",
    valueCallback: (e) => e + 1
  }),
  month: zr({
    matchPatterns: CC,
    defaultMatchWidth: "wide",
    parsePatterns: SC,
    defaultParseWidth: "any"
  }),
  day: zr({
    matchPatterns: $C,
    defaultMatchWidth: "wide",
    parsePatterns: RC,
    defaultParseWidth: "any"
  }),
  dayPeriod: zr({
    matchPatterns: kC,
    defaultMatchWidth: "any",
    parsePatterns: PC,
    defaultParseWidth: "any"
  })
}, TC = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, FC = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, EC = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, OC = {
  date: kl({
    formats: TC,
    defaultWidth: "full"
  }),
  time: kl({
    formats: FC,
    defaultWidth: "full"
  }),
  dateTime: kl({
    formats: EC,
    defaultWidth: "full"
  })
}, zC = {
  code: "en-US",
  formatDistance: iC,
  formatLong: OC,
  formatRelative: lC,
  localize: vC,
  match: _C,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
}, MC = {
  name: "en-US",
  locale: zC
};
var ev = typeof global == "object" && global && global.Object === Object && global, IC = typeof self == "object" && self && self.Object === Object && self, En = ev || IC || Function("return this")(), so = En.Symbol, tv = Object.prototype, AC = tv.hasOwnProperty, VC = tv.toString, Mr = so ? so.toStringTag : void 0;
function BC(e) {
  var t = AC.call(e, Mr), n = e[Mr];
  try {
    e[Mr] = void 0;
    var o = !0;
  } catch {
  }
  var r = VC.call(e);
  return o && (t ? e[Mr] = n : delete e[Mr]), r;
}
var LC = Object.prototype, DC = LC.toString;
function NC(e) {
  return DC.call(e);
}
var HC = "[object Null]", jC = "[object Undefined]", $u = so ? so.toStringTag : void 0;
function Ao(e) {
  return e == null ? e === void 0 ? jC : HC : $u && $u in Object(e) ? BC(e) : NC(e);
}
function co(e) {
  return e != null && typeof e == "object";
}
var WC = "[object Symbol]";
function Pd(e) {
  return typeof e == "symbol" || co(e) && Ao(e) == WC;
}
function nv(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = Array(o); ++n < o; )
    r[n] = t(e[n], n, e);
  return r;
}
var ln = Array.isArray, Ru = so ? so.prototype : void 0, ku = Ru ? Ru.toString : void 0;
function ov(e) {
  if (typeof e == "string")
    return e;
  if (ln(e))
    return nv(e, ov) + "";
  if (Pd(e))
    return ku ? ku.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function ho(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
function _d(e) {
  return e;
}
var UC = "[object AsyncFunction]", KC = "[object Function]", qC = "[object GeneratorFunction]", GC = "[object Proxy]";
function Td(e) {
  if (!ho(e))
    return !1;
  var t = Ao(e);
  return t == KC || t == qC || t == UC || t == GC;
}
var Pl = En["__core-js_shared__"], Pu = function() {
  var e = /[^.]+$/.exec(Pl && Pl.keys && Pl.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function XC(e) {
  return !!Pu && Pu in e;
}
var YC = Function.prototype, ZC = YC.toString;
function Vo(e) {
  if (e != null) {
    try {
      return ZC.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var JC = /[\\^$.*+?()[\]{}|]/g, QC = /^\[object .+?Constructor\]$/, e1 = Function.prototype, t1 = Object.prototype, n1 = e1.toString, o1 = t1.hasOwnProperty, r1 = RegExp(
  "^" + n1.call(o1).replace(JC, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function i1(e) {
  if (!ho(e) || XC(e))
    return !1;
  var t = Td(e) ? r1 : QC;
  return t.test(Vo(e));
}
function a1(e, t) {
  return e == null ? void 0 : e[t];
}
function Bo(e, t) {
  var n = a1(e, t);
  return i1(n) ? n : void 0;
}
var Ns = Bo(En, "WeakMap"), _u = Object.create, l1 = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!ho(t))
      return {};
    if (_u)
      return _u(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}();
function s1(e, t, n) {
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
function d1(e, t) {
  var n = -1, o = e.length;
  for (t || (t = Array(o)); ++n < o; )
    t[n] = e[n];
  return t;
}
var c1 = 800, u1 = 16, f1 = Date.now;
function h1(e) {
  var t = 0, n = 0;
  return function() {
    var o = f1(), r = u1 - (o - n);
    if (n = o, r > 0) {
      if (++t >= c1)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function p1(e) {
  return function() {
    return e;
  };
}
var Ea = function() {
  try {
    var e = Bo(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), v1 = Ea ? function(e, t) {
  return Ea(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: p1(t),
    writable: !0
  });
} : _d, m1 = h1(v1), g1 = 9007199254740991, b1 = /^(?:0|[1-9]\d*)$/;
function Fd(e, t) {
  var n = typeof e;
  return t = t ?? g1, !!t && (n == "number" || n != "symbol" && b1.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Ed(e, t, n) {
  t == "__proto__" && Ea ? Ea(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function vi(e, t) {
  return e === t || e !== e && t !== t;
}
var w1 = Object.prototype, y1 = w1.hasOwnProperty;
function x1(e, t, n) {
  var o = e[t];
  (!(y1.call(e, t) && vi(o, n)) || n === void 0 && !(t in e)) && Ed(e, t, n);
}
function C1(e, t, n, o) {
  var r = !n;
  n || (n = {});
  for (var i = -1, l = t.length; ++i < l; ) {
    var a = t[i], s = void 0;
    s === void 0 && (s = e[a]), r ? Ed(n, a, s) : x1(n, a, s);
  }
  return n;
}
var Tu = Math.max;
function S1(e, t, n) {
  return t = Tu(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var o = arguments, r = -1, i = Tu(o.length - t, 0), l = Array(i); ++r < i; )
      l[r] = o[t + r];
    r = -1;
    for (var a = Array(t + 1); ++r < t; )
      a[r] = o[r];
    return a[t] = n(l), s1(e, this, a);
  };
}
function $1(e, t) {
  return m1(S1(e, t, _d), e + "");
}
var R1 = 9007199254740991;
function Od(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= R1;
}
function vr(e) {
  return e != null && Od(e.length) && !Td(e);
}
function k1(e, t, n) {
  if (!ho(n))
    return !1;
  var o = typeof t;
  return (o == "number" ? vr(n) && Fd(t, n.length) : o == "string" && t in n) ? vi(n[t], e) : !1;
}
function P1(e) {
  return $1(function(t, n) {
    var o = -1, r = n.length, i = r > 1 ? n[r - 1] : void 0, l = r > 2 ? n[2] : void 0;
    for (i = e.length > 3 && typeof i == "function" ? (r--, i) : void 0, l && k1(n[0], n[1], l) && (i = r < 3 ? void 0 : i, r = 1), t = Object(t); ++o < r; ) {
      var a = n[o];
      a && e(t, a, o, i);
    }
    return t;
  });
}
var _1 = Object.prototype;
function zd(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || _1;
  return e === n;
}
function T1(e, t) {
  for (var n = -1, o = Array(e); ++n < e; )
    o[n] = t(n);
  return o;
}
var F1 = "[object Arguments]";
function Fu(e) {
  return co(e) && Ao(e) == F1;
}
var rv = Object.prototype, E1 = rv.hasOwnProperty, O1 = rv.propertyIsEnumerable, Oa = Fu(/* @__PURE__ */ function() {
  return arguments;
}()) ? Fu : function(e) {
  return co(e) && E1.call(e, "callee") && !O1.call(e, "callee");
};
function z1() {
  return !1;
}
var iv = typeof exports == "object" && exports && !exports.nodeType && exports, Eu = iv && typeof module == "object" && module && !module.nodeType && module, M1 = Eu && Eu.exports === iv, Ou = M1 ? En.Buffer : void 0, I1 = Ou ? Ou.isBuffer : void 0, za = I1 || z1, A1 = "[object Arguments]", V1 = "[object Array]", B1 = "[object Boolean]", L1 = "[object Date]", D1 = "[object Error]", N1 = "[object Function]", H1 = "[object Map]", j1 = "[object Number]", W1 = "[object Object]", U1 = "[object RegExp]", K1 = "[object Set]", q1 = "[object String]", G1 = "[object WeakMap]", X1 = "[object ArrayBuffer]", Y1 = "[object DataView]", Z1 = "[object Float32Array]", J1 = "[object Float64Array]", Q1 = "[object Int8Array]", eS = "[object Int16Array]", tS = "[object Int32Array]", nS = "[object Uint8Array]", oS = "[object Uint8ClampedArray]", rS = "[object Uint16Array]", iS = "[object Uint32Array]", st = {};
st[Z1] = st[J1] = st[Q1] = st[eS] = st[tS] = st[nS] = st[oS] = st[rS] = st[iS] = !0;
st[A1] = st[V1] = st[X1] = st[B1] = st[Y1] = st[L1] = st[D1] = st[N1] = st[H1] = st[j1] = st[W1] = st[U1] = st[K1] = st[q1] = st[G1] = !1;
function aS(e) {
  return co(e) && Od(e.length) && !!st[Ao(e)];
}
function lS(e) {
  return function(t) {
    return e(t);
  };
}
var av = typeof exports == "object" && exports && !exports.nodeType && exports, Zr = av && typeof module == "object" && module && !module.nodeType && module, sS = Zr && Zr.exports === av, _l = sS && ev.process, zu = function() {
  try {
    var e = Zr && Zr.require && Zr.require("util").types;
    return e || _l && _l.binding && _l.binding("util");
  } catch {
  }
}(), Mu = zu && zu.isTypedArray, Md = Mu ? lS(Mu) : aS, dS = Object.prototype, cS = dS.hasOwnProperty;
function lv(e, t) {
  var n = ln(e), o = !n && Oa(e), r = !n && !o && za(e), i = !n && !o && !r && Md(e), l = n || o || r || i, a = l ? T1(e.length, String) : [], s = a.length;
  for (var d in e)
    (t || cS.call(e, d)) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
    (d == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    r && (d == "offset" || d == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (d == "buffer" || d == "byteLength" || d == "byteOffset") || // Skip index properties.
    Fd(d, s))) && a.push(d);
  return a;
}
function sv(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var uS = sv(Object.keys, Object), fS = Object.prototype, hS = fS.hasOwnProperty;
function pS(e) {
  if (!zd(e))
    return uS(e);
  var t = [];
  for (var n in Object(e))
    hS.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function Id(e) {
  return vr(e) ? lv(e) : pS(e);
}
function vS(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var mS = Object.prototype, gS = mS.hasOwnProperty;
function bS(e) {
  if (!ho(e))
    return vS(e);
  var t = zd(e), n = [];
  for (var o in e)
    o == "constructor" && (t || !gS.call(e, o)) || n.push(o);
  return n;
}
function dv(e) {
  return vr(e) ? lv(e, !0) : bS(e);
}
var wS = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, yS = /^\w*$/;
function Ad(e, t) {
  if (ln(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || Pd(e) ? !0 : yS.test(e) || !wS.test(e) || t != null && e in Object(t);
}
var di = Bo(Object, "create");
function xS() {
  this.__data__ = di ? di(null) : {}, this.size = 0;
}
function CS(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var SS = "__lodash_hash_undefined__", $S = Object.prototype, RS = $S.hasOwnProperty;
function kS(e) {
  var t = this.__data__;
  if (di) {
    var n = t[e];
    return n === SS ? void 0 : n;
  }
  return RS.call(t, e) ? t[e] : void 0;
}
var PS = Object.prototype, _S = PS.hasOwnProperty;
function TS(e) {
  var t = this.__data__;
  return di ? t[e] !== void 0 : _S.call(t, e);
}
var FS = "__lodash_hash_undefined__";
function ES(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = di && t === void 0 ? FS : t, this;
}
function Eo(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Eo.prototype.clear = xS;
Eo.prototype.delete = CS;
Eo.prototype.get = kS;
Eo.prototype.has = TS;
Eo.prototype.set = ES;
function OS() {
  this.__data__ = [], this.size = 0;
}
function qa(e, t) {
  for (var n = e.length; n--; )
    if (vi(e[n][0], t))
      return n;
  return -1;
}
var zS = Array.prototype, MS = zS.splice;
function IS(e) {
  var t = this.__data__, n = qa(t, e);
  if (n < 0)
    return !1;
  var o = t.length - 1;
  return n == o ? t.pop() : MS.call(t, n, 1), --this.size, !0;
}
function AS(e) {
  var t = this.__data__, n = qa(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function VS(e) {
  return qa(this.__data__, e) > -1;
}
function BS(e, t) {
  var n = this.__data__, o = qa(n, e);
  return o < 0 ? (++this.size, n.push([e, t])) : n[o][1] = t, this;
}
function Wn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Wn.prototype.clear = OS;
Wn.prototype.delete = IS;
Wn.prototype.get = AS;
Wn.prototype.has = VS;
Wn.prototype.set = BS;
var ci = Bo(En, "Map");
function LS() {
  this.size = 0, this.__data__ = {
    hash: new Eo(),
    map: new (ci || Wn)(),
    string: new Eo()
  };
}
function DS(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Ga(e, t) {
  var n = e.__data__;
  return DS(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function NS(e) {
  var t = Ga(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function HS(e) {
  return Ga(this, e).get(e);
}
function jS(e) {
  return Ga(this, e).has(e);
}
function WS(e, t) {
  var n = Ga(this, e), o = n.size;
  return n.set(e, t), this.size += n.size == o ? 0 : 1, this;
}
function Un(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var o = e[t];
    this.set(o[0], o[1]);
  }
}
Un.prototype.clear = LS;
Un.prototype.delete = NS;
Un.prototype.get = HS;
Un.prototype.has = jS;
Un.prototype.set = WS;
var US = "Expected a function";
function Vd(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(US);
  var n = function() {
    var o = arguments, r = t ? t.apply(this, o) : o[0], i = n.cache;
    if (i.has(r))
      return i.get(r);
    var l = e.apply(this, o);
    return n.cache = i.set(r, l) || i, l;
  };
  return n.cache = new (Vd.Cache || Un)(), n;
}
Vd.Cache = Un;
var KS = 500;
function qS(e) {
  var t = Vd(e, function(o) {
    return n.size === KS && n.clear(), o;
  }), n = t.cache;
  return t;
}
var GS = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, XS = /\\(\\)?/g, YS = qS(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(GS, function(n, o, r, i) {
    t.push(r ? i.replace(XS, "$1") : o || n);
  }), t;
});
function cv(e) {
  return e == null ? "" : ov(e);
}
function uv(e, t) {
  return ln(e) ? e : Ad(e, t) ? [e] : YS(cv(e));
}
function Xa(e) {
  if (typeof e == "string" || Pd(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function fv(e, t) {
  t = uv(t, e);
  for (var n = 0, o = t.length; e != null && n < o; )
    e = e[Xa(t[n++])];
  return n && n == o ? e : void 0;
}
function ui(e, t, n) {
  var o = e == null ? void 0 : fv(e, t);
  return o === void 0 ? n : o;
}
function ZS(e, t) {
  for (var n = -1, o = t.length, r = e.length; ++n < o; )
    e[r + n] = t[n];
  return e;
}
var hv = sv(Object.getPrototypeOf, Object), JS = "[object Object]", QS = Function.prototype, e$ = Object.prototype, pv = QS.toString, t$ = e$.hasOwnProperty, n$ = pv.call(Object);
function o$(e) {
  if (!co(e) || Ao(e) != JS)
    return !1;
  var t = hv(e);
  if (t === null)
    return !0;
  var n = t$.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && pv.call(n) == n$;
}
function r$(e, t, n) {
  var o = -1, r = e.length;
  t < 0 && (t = -t > r ? 0 : r + t), n = n > r ? r : n, n < 0 && (n += r), r = t > n ? 0 : n - t >>> 0, t >>>= 0;
  for (var i = Array(r); ++o < r; )
    i[o] = e[o + t];
  return i;
}
function i$(e, t, n) {
  var o = e.length;
  return n = n === void 0 ? o : n, !t && n >= o ? e : r$(e, t, n);
}
var a$ = "\\ud800-\\udfff", l$ = "\\u0300-\\u036f", s$ = "\\ufe20-\\ufe2f", d$ = "\\u20d0-\\u20ff", c$ = l$ + s$ + d$, u$ = "\\ufe0e\\ufe0f", f$ = "\\u200d", h$ = RegExp("[" + f$ + a$ + c$ + u$ + "]");
function vv(e) {
  return h$.test(e);
}
function p$(e) {
  return e.split("");
}
var mv = "\\ud800-\\udfff", v$ = "\\u0300-\\u036f", m$ = "\\ufe20-\\ufe2f", g$ = "\\u20d0-\\u20ff", b$ = v$ + m$ + g$, w$ = "\\ufe0e\\ufe0f", y$ = "[" + mv + "]", Hs = "[" + b$ + "]", js = "\\ud83c[\\udffb-\\udfff]", x$ = "(?:" + Hs + "|" + js + ")", gv = "[^" + mv + "]", bv = "(?:\\ud83c[\\udde6-\\uddff]){2}", wv = "[\\ud800-\\udbff][\\udc00-\\udfff]", C$ = "\\u200d", yv = x$ + "?", xv = "[" + w$ + "]?", S$ = "(?:" + C$ + "(?:" + [gv, bv, wv].join("|") + ")" + xv + yv + ")*", $$ = xv + yv + S$, R$ = "(?:" + [gv + Hs + "?", Hs, bv, wv, y$].join("|") + ")", k$ = RegExp(js + "(?=" + js + ")|" + R$ + $$, "g");
function P$(e) {
  return e.match(k$) || [];
}
function _$(e) {
  return vv(e) ? P$(e) : p$(e);
}
function T$(e) {
  return function(t) {
    t = cv(t);
    var n = vv(t) ? _$(t) : void 0, o = n ? n[0] : t.charAt(0), r = n ? i$(n, 1).join("") : t.slice(1);
    return o[e]() + r;
  };
}
var F$ = T$("toUpperCase");
function E$() {
  this.__data__ = new Wn(), this.size = 0;
}
function O$(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function z$(e) {
  return this.__data__.get(e);
}
function M$(e) {
  return this.__data__.has(e);
}
var I$ = 200;
function A$(e, t) {
  var n = this.__data__;
  if (n instanceof Wn) {
    var o = n.__data__;
    if (!ci || o.length < I$ - 1)
      return o.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new Un(o);
  }
  return n.set(e, t), this.size = n.size, this;
}
function kn(e) {
  var t = this.__data__ = new Wn(e);
  this.size = t.size;
}
kn.prototype.clear = E$;
kn.prototype.delete = O$;
kn.prototype.get = z$;
kn.prototype.has = M$;
kn.prototype.set = A$;
var Cv = typeof exports == "object" && exports && !exports.nodeType && exports, Iu = Cv && typeof module == "object" && module && !module.nodeType && module, V$ = Iu && Iu.exports === Cv, Au = V$ ? En.Buffer : void 0;
Au && Au.allocUnsafe;
function B$(e, t) {
  return e.slice();
}
function L$(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length, r = 0, i = []; ++n < o; ) {
    var l = e[n];
    t(l, n, e) && (i[r++] = l);
  }
  return i;
}
function D$() {
  return [];
}
var N$ = Object.prototype, H$ = N$.propertyIsEnumerable, Vu = Object.getOwnPropertySymbols, j$ = Vu ? function(e) {
  return e == null ? [] : (e = Object(e), L$(Vu(e), function(t) {
    return H$.call(e, t);
  }));
} : D$;
function W$(e, t, n) {
  var o = t(e);
  return ln(e) ? o : ZS(o, n(e));
}
function Bu(e) {
  return W$(e, Id, j$);
}
var Ws = Bo(En, "DataView"), Us = Bo(En, "Promise"), Ks = Bo(En, "Set"), Lu = "[object Map]", U$ = "[object Object]", Du = "[object Promise]", Nu = "[object Set]", Hu = "[object WeakMap]", ju = "[object DataView]", K$ = Vo(Ws), q$ = Vo(ci), G$ = Vo(Us), X$ = Vo(Ks), Y$ = Vo(Ns), no = Ao;
(Ws && no(new Ws(new ArrayBuffer(1))) != ju || ci && no(new ci()) != Lu || Us && no(Us.resolve()) != Du || Ks && no(new Ks()) != Nu || Ns && no(new Ns()) != Hu) && (no = function(e) {
  var t = Ao(e), n = t == U$ ? e.constructor : void 0, o = n ? Vo(n) : "";
  if (o)
    switch (o) {
      case K$:
        return ju;
      case q$:
        return Lu;
      case G$:
        return Du;
      case X$:
        return Nu;
      case Y$:
        return Hu;
    }
  return t;
});
var Ma = En.Uint8Array;
function Z$(e) {
  var t = new e.constructor(e.byteLength);
  return new Ma(t).set(new Ma(e)), t;
}
function J$(e, t) {
  var n = Z$(e.buffer);
  return new e.constructor(n, e.byteOffset, e.length);
}
function Q$(e) {
  return typeof e.constructor == "function" && !zd(e) ? l1(hv(e)) : {};
}
var eR = "__lodash_hash_undefined__";
function tR(e) {
  return this.__data__.set(e, eR), this;
}
function nR(e) {
  return this.__data__.has(e);
}
function Ia(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new Un(); ++t < n; )
    this.add(e[t]);
}
Ia.prototype.add = Ia.prototype.push = tR;
Ia.prototype.has = nR;
function oR(e, t) {
  for (var n = -1, o = e == null ? 0 : e.length; ++n < o; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function rR(e, t) {
  return e.has(t);
}
var iR = 1, aR = 2;
function Sv(e, t, n, o, r, i) {
  var l = n & iR, a = e.length, s = t.length;
  if (a != s && !(l && s > a))
    return !1;
  var d = i.get(e), c = i.get(t);
  if (d && c)
    return d == t && c == e;
  var h = -1, p = !0, v = n & aR ? new Ia() : void 0;
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
      if (!oR(t, function(u, w) {
        if (!rR(v, w) && (f === u || r(f, u, n, o, i)))
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
function lR(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o, r) {
    n[++t] = [r, o];
  }), n;
}
function sR(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(o) {
    n[++t] = o;
  }), n;
}
var dR = 1, cR = 2, uR = "[object Boolean]", fR = "[object Date]", hR = "[object Error]", pR = "[object Map]", vR = "[object Number]", mR = "[object RegExp]", gR = "[object Set]", bR = "[object String]", wR = "[object Symbol]", yR = "[object ArrayBuffer]", xR = "[object DataView]", Wu = so ? so.prototype : void 0, Tl = Wu ? Wu.valueOf : void 0;
function CR(e, t, n, o, r, i, l) {
  switch (n) {
    case xR:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case yR:
      return !(e.byteLength != t.byteLength || !i(new Ma(e), new Ma(t)));
    case uR:
    case fR:
    case vR:
      return vi(+e, +t);
    case hR:
      return e.name == t.name && e.message == t.message;
    case mR:
    case bR:
      return e == t + "";
    case pR:
      var a = lR;
    case gR:
      var s = o & dR;
      if (a || (a = sR), e.size != t.size && !s)
        return !1;
      var d = l.get(e);
      if (d)
        return d == t;
      o |= cR, l.set(e, t);
      var c = Sv(a(e), a(t), o, r, i, l);
      return l.delete(e), c;
    case wR:
      if (Tl)
        return Tl.call(e) == Tl.call(t);
  }
  return !1;
}
var SR = 1, $R = Object.prototype, RR = $R.hasOwnProperty;
function kR(e, t, n, o, r, i) {
  var l = n & SR, a = Bu(e), s = a.length, d = Bu(t), c = d.length;
  if (s != c && !l)
    return !1;
  for (var h = s; h--; ) {
    var p = a[h];
    if (!(l ? p in t : RR.call(t, p)))
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
      var x = l ? o(w, u, p, t, e, i) : o(u, w, p, e, t, i);
    if (!(x === void 0 ? u === w || r(u, w, n, o, i) : x)) {
      m = !1;
      break;
    }
    g || (g = p == "constructor");
  }
  if (m && !g) {
    var y = e.constructor, C = t.constructor;
    y != C && "constructor" in e && "constructor" in t && !(typeof y == "function" && y instanceof y && typeof C == "function" && C instanceof C) && (m = !1);
  }
  return i.delete(e), i.delete(t), m;
}
var PR = 1, Uu = "[object Arguments]", Ku = "[object Array]", Vi = "[object Object]", _R = Object.prototype, qu = _R.hasOwnProperty;
function TR(e, t, n, o, r, i) {
  var l = ln(e), a = ln(t), s = l ? Ku : no(e), d = a ? Ku : no(t);
  s = s == Uu ? Vi : s, d = d == Uu ? Vi : d;
  var c = s == Vi, h = d == Vi, p = s == d;
  if (p && za(e)) {
    if (!za(t))
      return !1;
    l = !0, c = !1;
  }
  if (p && !c)
    return i || (i = new kn()), l || Md(e) ? Sv(e, t, n, o, r, i) : CR(e, t, s, n, o, r, i);
  if (!(n & PR)) {
    var v = c && qu.call(e, "__wrapped__"), f = h && qu.call(t, "__wrapped__");
    if (v || f) {
      var m = v ? e.value() : e, g = f ? t.value() : t;
      return i || (i = new kn()), r(m, g, n, o, i);
    }
  }
  return p ? (i || (i = new kn()), kR(e, t, n, o, r, i)) : !1;
}
function Bd(e, t, n, o, r) {
  return e === t ? !0 : e == null || t == null || !co(e) && !co(t) ? e !== e && t !== t : TR(e, t, n, o, Bd, r);
}
var FR = 1, ER = 2;
function OR(e, t, n, o) {
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
      if (!(h === void 0 ? Bd(d, s, FR | ER, o, c) : h))
        return !1;
    }
  }
  return !0;
}
function $v(e) {
  return e === e && !ho(e);
}
function zR(e) {
  for (var t = Id(e), n = t.length; n--; ) {
    var o = t[n], r = e[o];
    t[n] = [o, r, $v(r)];
  }
  return t;
}
function Rv(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function MR(e) {
  var t = zR(e);
  return t.length == 1 && t[0][2] ? Rv(t[0][0], t[0][1]) : function(n) {
    return n === e || OR(n, e, t);
  };
}
function IR(e, t) {
  return e != null && t in Object(e);
}
function AR(e, t, n) {
  t = uv(t, e);
  for (var o = -1, r = t.length, i = !1; ++o < r; ) {
    var l = Xa(t[o]);
    if (!(i = e != null && n(e, l)))
      break;
    e = e[l];
  }
  return i || ++o != r ? i : (r = e == null ? 0 : e.length, !!r && Od(r) && Fd(l, r) && (ln(e) || Oa(e)));
}
function VR(e, t) {
  return e != null && AR(e, t, IR);
}
var BR = 1, LR = 2;
function DR(e, t) {
  return Ad(e) && $v(t) ? Rv(Xa(e), t) : function(n) {
    var o = ui(n, e);
    return o === void 0 && o === t ? VR(n, e) : Bd(t, o, BR | LR);
  };
}
function NR(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function HR(e) {
  return function(t) {
    return fv(t, e);
  };
}
function jR(e) {
  return Ad(e) ? NR(Xa(e)) : HR(e);
}
function WR(e) {
  return typeof e == "function" ? e : e == null ? _d : typeof e == "object" ? ln(e) ? DR(e[0], e[1]) : MR(e) : jR(e);
}
function UR(e) {
  return function(t, n, o) {
    for (var r = -1, i = Object(t), l = o(t), a = l.length; a--; ) {
      var s = l[++r];
      if (n(i[s], s, i) === !1)
        break;
    }
    return t;
  };
}
var kv = UR();
function KR(e, t) {
  return e && kv(e, t, Id);
}
function qR(e, t) {
  return function(n, o) {
    if (n == null)
      return n;
    if (!vr(n))
      return e(n, o);
    for (var r = n.length, i = -1, l = Object(n); ++i < r && o(l[i], i, l) !== !1; )
      ;
    return n;
  };
}
var GR = qR(KR);
function qs(e, t, n) {
  (n !== void 0 && !vi(e[t], n) || n === void 0 && !(t in e)) && Ed(e, t, n);
}
function XR(e) {
  return co(e) && vr(e);
}
function Gs(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
function YR(e) {
  return C1(e, dv(e));
}
function ZR(e, t, n, o, r, i, l) {
  var a = Gs(e, n), s = Gs(t, n), d = l.get(s);
  if (d) {
    qs(e, n, d);
    return;
  }
  var c = i ? i(a, s, n + "", e, t, l) : void 0, h = c === void 0;
  if (h) {
    var p = ln(s), v = !p && za(s), f = !p && !v && Md(s);
    c = s, p || v || f ? ln(a) ? c = a : XR(a) ? c = d1(a) : v ? (h = !1, c = B$(s)) : f ? (h = !1, c = J$(s)) : c = [] : o$(s) || Oa(s) ? (c = a, Oa(a) ? c = YR(a) : (!ho(a) || Td(a)) && (c = Q$(s))) : h = !1;
  }
  h && (l.set(s, c), r(c, s, o, i, l), l.delete(s)), qs(e, n, c);
}
function Pv(e, t, n, o, r) {
  e !== t && kv(t, function(i, l) {
    if (r || (r = new kn()), ho(i))
      ZR(e, t, l, n, Pv, o, r);
    else {
      var a = o ? o(Gs(e, l), i, l + "", e, t, r) : void 0;
      a === void 0 && (a = i), qs(e, l, a);
    }
  }, dv);
}
function JR(e, t) {
  var n = -1, o = vr(e) ? Array(e.length) : [];
  return GR(e, function(r, i, l) {
    o[++n] = t(r, i, l);
  }), o;
}
function QR(e, t) {
  var n = ln(e) ? nv : JR;
  return n(e, WR(t));
}
var Bi = P1(function(e, t, n) {
  Pv(e, t, n);
});
const Gu = window.Vue.computed, ek = window.Vue.inject;
function mi(e) {
  const {
    mergedLocaleRef: t,
    mergedDateLocaleRef: n
  } = ek(jn, null) || {}, o = Gu(() => {
    var i, l;
    return (l = (i = t == null ? void 0 : t.value) === null || i === void 0 ? void 0 : i[e]) !== null && l !== void 0 ? l : eC[e];
  });
  return {
    dateLocaleRef: Gu(() => {
      var i;
      return (i = n == null ? void 0 : n.value) !== null && i !== void 0 ? i : MC;
    }),
    localeRef: o
  };
}
const fr = "naive-ui-style", tk = window.Vue.computed, nk = window.Vue.inject, ok = window.Vue.onBeforeMount, rk = window.Vue.watchEffect;
function zt(e, t, n) {
  if (!t) return;
  const o = Mo(), r = tk(() => {
    const {
      value: a
    } = t;
    if (!a)
      return;
    const s = a[e];
    if (s)
      return s;
  }), i = nk(jn, null), l = () => {
    rk(() => {
      const {
        value: a
      } = n, s = `${a}${e}Rtl`;
      if (uw(s, o)) return;
      const {
        value: d
      } = r;
      d && d.style.mount({
        id: s,
        head: !0,
        anchorMetaName: fr,
        props: {
          bPrefix: a ? `.${a}-` : void 0
        },
        ssr: o,
        parent: i == null ? void 0 : i.styleMountTarget
      });
    });
  };
  return o ? l() : ok(l), r;
}
const Lo = {
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
  fontSize: ik,
  fontFamily: ak,
  lineHeight: lk
} = Lo, _v = D("body", `
 margin: 0;
 font-size: ${ik};
 font-family: ${ak};
 line-height: ${lk};
 -webkit-text-size-adjust: 100%;
 -webkit-tap-highlight-color: transparent;
`, [D("input", `
 font-family: inherit;
 font-size: inherit;
 `)]), sk = window.Vue.inject, dk = window.Vue.onBeforeMount;
function Do(e, t, n) {
  if (!t)
    return;
  const o = Mo(), r = sk(jn, null), i = () => {
    const l = n.value;
    t.mount({
      id: l === void 0 ? e : l + e,
      head: !0,
      anchorMetaName: fr,
      props: {
        bPrefix: l ? `.${l}-` : void 0
      },
      ssr: o,
      parent: r == null ? void 0 : r.styleMountTarget
    }), r != null && r.preflightStyleDisabled || _v.mount({
      id: "n-global",
      head: !0,
      anchorMetaName: fr,
      ssr: o,
      parent: r == null ? void 0 : r.styleMountTarget
    });
  };
  o ? i() : dk(i);
}
const ck = window.Vue.computed, uk = window.Vue.inject, fk = window.Vue.onBeforeMount;
function ke(e, t, n, o, r, i) {
  const l = Mo(), a = uk(jn, null);
  if (n) {
    const d = () => {
      const c = i == null ? void 0 : i.value;
      n.mount({
        id: c === void 0 ? t : c + t,
        head: !0,
        props: {
          bPrefix: c ? `.${c}-` : void 0
        },
        anchorMetaName: fr,
        ssr: l,
        parent: a == null ? void 0 : a.styleMountTarget
      }), a != null && a.preflightStyleDisabled || _v.mount({
        id: "n-global",
        head: !0,
        anchorMetaName: fr,
        ssr: l,
        parent: a == null ? void 0 : a.styleMountTarget
      });
    };
    l ? d() : fk(d);
  }
  return ck(() => {
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
        self: x = void 0,
        peers: y = {}
      } = {}
    } = (a == null ? void 0 : a.mergedThemeRef.value) || {}, {
      common: C = void 0,
      [e]: S = {}
    } = (a == null ? void 0 : a.mergedThemeOverridesRef.value) || {}, {
      common: b,
      peers: R = {}
    } = S, $ = Bi({}, c || w || u || o.common, C, b, m), T = Bi(
      // {}, executed every time, no need for empty obj
      (d = h || x || o.self) === null || d === void 0 ? void 0 : d($),
      f,
      S,
      v
    );
    return {
      common: $,
      self: T,
      peers: Bi({}, o.peers, y, p),
      peerOverrides: Bi({}, f.peers, R, g)
    };
  });
}
ke.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object
};
const hk = I("base-icon", `
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
 `)]), pk = window.Vue.defineComponent, vk = window.Vue.h, mk = window.Vue.toRef, $t = pk({
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
    Do("-base-icon", hk, mk(e, "clsPrefix"));
  },
  render() {
    return vk("i", {
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
}), gk = window.Vue.defineComponent, bk = window.Vue.h, wk = window.Vue.Transition, gi = gk({
  name: "BaseIconSwitchTransition",
  setup(e, {
    slots: t
  }) {
    const n = hi();
    return () => bk(wk, {
      name: "icon-switch-transition",
      appear: n.value
    }, t);
  }
}), yk = window.Vue.defineComponent, Li = window.Vue.h, xk = yk({
  name: "ArrowDown",
  render() {
    return Li("svg", {
      viewBox: "0 0 28 28",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Li("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, Li("g", {
      "fill-rule": "nonzero"
    }, Li("path", {
      d: "M23.7916,15.2664 C24.0788,14.9679 24.0696,14.4931 23.7711,14.206 C23.4726,13.9188 22.9978,13.928 22.7106,14.2265 L14.7511,22.5007 L14.7511,3.74792 C14.7511,3.33371 14.4153,2.99792 14.0011,2.99792 C13.5869,2.99792 13.2511,3.33371 13.2511,3.74793 L13.2511,22.4998 L5.29259,14.2265 C5.00543,13.928 4.53064,13.9188 4.23213,14.206 C3.93361,14.4931 3.9244,14.9679 4.21157,15.2664 L13.2809,24.6944 C13.6743,25.1034 14.3289,25.1034 14.7223,24.6944 L23.7916,15.2664 Z"
    }))));
  }
}), Xu = window.Vue.defineComponent, Ck = window.Vue.h, Sk = window.Vue.inject;
function mr(e, t) {
  const n = Xu({
    render() {
      return t();
    }
  });
  return Xu({
    name: F$(e),
    setup() {
      var o;
      const r = (o = Sk(jn, null)) === null || o === void 0 ? void 0 : o.mergedIconsRef;
      return () => {
        var i;
        const l = (i = r == null ? void 0 : r.value) === null || i === void 0 ? void 0 : i[e];
        return l ? l() : Ck(n, null);
      };
    }
  });
}
const $k = window.Vue.defineComponent, Yu = window.Vue.h, Zu = $k({
  name: "Backward",
  render() {
    return Yu("svg", {
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, Yu("path", {
      d: "M12.2674 15.793C11.9675 16.0787 11.4927 16.0672 11.2071 15.7673L6.20572 10.5168C5.9298 10.2271 5.9298 9.7719 6.20572 9.48223L11.2071 4.23177C11.4927 3.93184 11.9675 3.92031 12.2674 4.206C12.5673 4.49169 12.5789 4.96642 12.2932 5.26634L7.78458 9.99952L12.2932 14.7327C12.5789 15.0326 12.5673 15.5074 12.2674 15.793Z",
      fill: "currentColor"
    }));
  }
}), Rk = window.Vue.defineComponent, Fl = window.Vue.h, kk = Rk({
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
}), Pk = window.Vue.defineComponent, Ju = window.Vue.h, Tv = Pk({
  name: "ChevronDown",
  render() {
    return Ju("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, Ju("path", {
      d: "M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z",
      fill: "currentColor"
    }));
  }
}), _k = window.Vue.defineComponent, Qu = window.Vue.h, Fv = _k({
  name: "ChevronRight",
  render() {
    return Qu("svg", {
      viewBox: "0 0 16 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, Qu("path", {
      d: "M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z",
      fill: "currentColor"
    }));
  }
}), Di = window.Vue.h, Tk = mr("clear", () => Di("svg", {
  viewBox: "0 0 16 16",
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
  d: "M8,2 C11.3137085,2 14,4.6862915 14,8 C14,11.3137085 11.3137085,14 8,14 C4.6862915,14 2,11.3137085 2,8 C2,4.6862915 4.6862915,2 8,2 Z M6.5343055,5.83859116 C6.33943736,5.70359511 6.07001296,5.72288026 5.89644661,5.89644661 L5.89644661,5.89644661 L5.83859116,5.9656945 C5.70359511,6.16056264 5.72288026,6.42998704 5.89644661,6.60355339 L5.89644661,6.60355339 L7.293,8 L5.89644661,9.39644661 L5.83859116,9.4656945 C5.70359511,9.66056264 5.72288026,9.92998704 5.89644661,10.1035534 L5.89644661,10.1035534 L5.9656945,10.1614088 C6.16056264,10.2964049 6.42998704,10.2771197 6.60355339,10.1035534 L6.60355339,10.1035534 L8,8.707 L9.39644661,10.1035534 L9.4656945,10.1614088 C9.66056264,10.2964049 9.92998704,10.2771197 10.1035534,10.1035534 L10.1035534,10.1035534 L10.1614088,10.0343055 C10.2964049,9.83943736 10.2771197,9.57001296 10.1035534,9.39644661 L10.1035534,9.39644661 L8.707,8 L10.1035534,6.60355339 L10.1614088,6.5343055 C10.2964049,6.33943736 10.2771197,6.07001296 10.1035534,5.89644661 L10.1035534,5.89644661 L10.0343055,5.83859116 C9.83943736,5.70359511 9.57001296,5.72288026 9.39644661,5.89644661 L9.39644661,5.89644661 L8,7.293 L6.60355339,5.89644661 Z"
}))))), Ni = window.Vue.h, Fk = mr("close", () => Ni("svg", {
  viewBox: "0 0 12 12",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": !0
}, Ni("g", {
  stroke: "none",
  "stroke-width": "1",
  fill: "none",
  "fill-rule": "evenodd"
}, Ni("g", {
  fill: "currentColor",
  "fill-rule": "nonzero"
}, Ni("path", {
  d: "M2.08859116,2.2156945 L2.14644661,2.14644661 C2.32001296,1.97288026 2.58943736,1.95359511 2.7843055,2.08859116 L2.85355339,2.14644661 L6,5.293 L9.14644661,2.14644661 C9.34170876,1.95118446 9.65829124,1.95118446 9.85355339,2.14644661 C10.0488155,2.34170876 10.0488155,2.65829124 9.85355339,2.85355339 L6.707,6 L9.85355339,9.14644661 C10.0271197,9.32001296 10.0464049,9.58943736 9.91140884,9.7843055 L9.85355339,9.85355339 C9.67998704,10.0271197 9.41056264,10.0464049 9.2156945,9.91140884 L9.14644661,9.85355339 L6,6.707 L2.85355339,9.85355339 C2.65829124,10.0488155 2.34170876,10.0488155 2.14644661,9.85355339 C1.95118446,9.65829124 1.95118446,9.34170876 2.14644661,9.14644661 L5.293,6 L2.14644661,2.85355339 C1.97288026,2.67998704 1.95359511,2.41056264 2.08859116,2.2156945 L2.14644661,2.14644661 L2.08859116,2.2156945 Z"
}))))), Ek = window.Vue.defineComponent, El = window.Vue.h, Ok = Ek({
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
}), Hi = window.Vue.h, zk = mr("error", () => Hi("svg", {
  viewBox: "0 0 48 48",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, Hi("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, Hi("g", {
  "fill-rule": "nonzero"
}, Hi("path", {
  d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M17.8838835,16.1161165 L17.7823881,16.0249942 C17.3266086,15.6583353 16.6733914,15.6583353 16.2176119,16.0249942 L16.1161165,16.1161165 L16.0249942,16.2176119 C15.6583353,16.6733914 15.6583353,17.3266086 16.0249942,17.7823881 L16.1161165,17.8838835 L22.233,24 L16.1161165,30.1161165 L16.0249942,30.2176119 C15.6583353,30.6733914 15.6583353,31.3266086 16.0249942,31.7823881 L16.1161165,31.8838835 L16.2176119,31.9750058 C16.6733914,32.3416647 17.3266086,32.3416647 17.7823881,31.9750058 L17.8838835,31.8838835 L24,25.767 L30.1161165,31.8838835 L30.2176119,31.9750058 C30.6733914,32.3416647 31.3266086,32.3416647 31.7823881,31.9750058 L31.8838835,31.8838835 L31.9750058,31.7823881 C32.3416647,31.3266086 32.3416647,30.6733914 31.9750058,30.2176119 L31.8838835,30.1161165 L25.767,24 L31.8838835,17.8838835 L31.9750058,17.7823881 C32.3416647,17.3266086 32.3416647,16.6733914 31.9750058,16.2176119 L31.8838835,16.1161165 L31.7823881,16.0249942 C31.3266086,15.6583353 30.6733914,15.6583353 30.2176119,16.0249942 L30.1161165,16.1161165 L24,22.233 L17.8838835,16.1161165 L17.7823881,16.0249942 L17.8838835,16.1161165 Z"
}))))), Mk = window.Vue.defineComponent, Ol = window.Vue.h, Ik = Mk({
  name: "Eye",
  render() {
    return Ol("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, Ol("path", {
      d: "M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",
      fill: "none",
      stroke: "currentColor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "32"
    }), Ol("circle", {
      cx: "256",
      cy: "256",
      r: "80",
      fill: "none",
      stroke: "currentColor",
      "stroke-miterlimit": "10",
      "stroke-width": "32"
    }));
  }
}), Ak = window.Vue.defineComponent, Ko = window.Vue.h, Vk = Ak({
  name: "EyeOff",
  render() {
    return Ko("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512"
    }, Ko("path", {
      d: "M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z",
      fill: "currentColor"
    }), Ko("path", {
      d: "M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z",
      fill: "currentColor"
    }), Ko("path", {
      d: "M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z",
      fill: "currentColor"
    }), Ko("path", {
      d: "M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z",
      fill: "currentColor"
    }), Ko("path", {
      d: "M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z",
      fill: "currentColor"
    }));
  }
}), Bk = window.Vue.defineComponent, ji = window.Vue.h, ef = Bk({
  name: "FastBackward",
  render() {
    return ji("svg", {
      viewBox: "0 0 20 20",
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
      d: "M8.73171,16.7949 C9.03264,17.0795 9.50733,17.0663 9.79196,16.7654 C10.0766,16.4644 10.0634,15.9897 9.76243,15.7051 L4.52339,10.75 L17.2471,10.75 C17.6613,10.75 17.9971,10.4142 17.9971,10 C17.9971,9.58579 17.6613,9.25 17.2471,9.25 L4.52112,9.25 L9.76243,4.29275 C10.0634,4.00812 10.0766,3.53343 9.79196,3.2325 C9.50733,2.93156 9.03264,2.91834 8.73171,3.20297 L2.31449,9.27241 C2.14819,9.4297 2.04819,9.62981 2.01448,9.8386 C2.00308,9.89058 1.99707,9.94459 1.99707,10 C1.99707,10.0576 2.00356,10.1137 2.01585,10.1675 C2.05084,10.3733 2.15039,10.5702 2.31449,10.7254 L8.73171,16.7949 Z"
    }))));
  }
}), Lk = window.Vue.defineComponent, Wi = window.Vue.h, tf = Lk({
  name: "FastForward",
  render() {
    return Wi("svg", {
      viewBox: "0 0 20 20",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Wi("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, Wi("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, Wi("path", {
      d: "M11.2654,3.20511 C10.9644,2.92049 10.4897,2.93371 10.2051,3.23464 C9.92049,3.53558 9.93371,4.01027 10.2346,4.29489 L15.4737,9.25 L2.75,9.25 C2.33579,9.25 2,9.58579 2,10.0000012 C2,10.4142 2.33579,10.75 2.75,10.75 L15.476,10.75 L10.2346,15.7073 C9.93371,15.9919 9.92049,16.4666 10.2051,16.7675 C10.4897,17.0684 10.9644,17.0817 11.2654,16.797 L17.6826,10.7276 C17.8489,10.5703 17.9489,10.3702 17.9826,10.1614 C17.994,10.1094 18,10.0554 18,10.0000012 C18,9.94241 17.9935,9.88633 17.9812,9.83246 C17.9462,9.62667 17.8467,9.42976 17.6826,9.27455 L11.2654,3.20511 Z"
    }))));
  }
}), Dk = window.Vue.defineComponent, Ui = window.Vue.h, Nk = Dk({
  name: "Filter",
  render() {
    return Ui("svg", {
      viewBox: "0 0 28 28",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, Ui("g", {
      stroke: "none",
      "stroke-width": "1",
      "fill-rule": "evenodd"
    }, Ui("g", {
      "fill-rule": "nonzero"
    }, Ui("path", {
      d: "M17,19 C17.5522847,19 18,19.4477153 18,20 C18,20.5522847 17.5522847,21 17,21 L11,21 C10.4477153,21 10,20.5522847 10,20 C10,19.4477153 10.4477153,19 11,19 L17,19 Z M21,13 C21.5522847,13 22,13.4477153 22,14 C22,14.5522847 21.5522847,15 21,15 L7,15 C6.44771525,15 6,14.5522847 6,14 C6,13.4477153 6.44771525,13 7,13 L21,13 Z M24,7 C24.5522847,7 25,7.44771525 25,8 C25,8.55228475 24.5522847,9 24,9 L4,9 C3.44771525,9 3,8.55228475 3,8 C3,7.44771525 3.44771525,7 4,7 L24,7 Z"
    }))));
  }
}), Hk = window.Vue.defineComponent, nf = window.Vue.h, of = Hk({
  name: "Forward",
  render() {
    return nf("svg", {
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, nf("path", {
      d: "M7.73271 4.20694C8.03263 3.92125 8.50737 3.93279 8.79306 4.23271L13.7944 9.48318C14.0703 9.77285 14.0703 10.2281 13.7944 10.5178L8.79306 15.7682C8.50737 16.0681 8.03263 16.0797 7.73271 15.794C7.43279 15.5083 7.42125 15.0336 7.70694 14.7336L12.2155 10.0005L7.70694 5.26729C7.42125 4.96737 7.43279 4.49264 7.73271 4.20694Z",
      fill: "currentColor"
    }));
  }
}), Ki = window.Vue.h, rf = mr("info", () => Ki("svg", {
  viewBox: "0 0 28 28",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, Ki("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, Ki("g", {
  "fill-rule": "nonzero"
}, Ki("path", {
  d: "M14,2 C20.6274,2 26,7.37258 26,14 C26,20.6274 20.6274,26 14,26 C7.37258,26 2,20.6274 2,14 C2,7.37258 7.37258,2 14,2 Z M14,11 C13.4477,11 13,11.4477 13,12 L13,12 L13,20 C13,20.5523 13.4477,21 14,21 C14.5523,21 15,20.5523 15,20 L15,20 L15,12 C15,11.4477 14.5523,11 14,11 Z M14,6.75 C13.3096,6.75 12.75,7.30964 12.75,8 C12.75,8.69036 13.3096,9.25 14,9.25 C14.6904,9.25 15.25,8.69036 15.25,8 C15.25,7.30964 14.6904,6.75 14,6.75 Z"
}))))), jk = window.Vue.defineComponent, qi = window.Vue.h, af = jk({
  name: "More",
  render() {
    return qi("svg", {
      viewBox: "0 0 16 16",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg"
    }, qi("g", {
      stroke: "none",
      "stroke-width": "1",
      fill: "none",
      "fill-rule": "evenodd"
    }, qi("g", {
      fill: "currentColor",
      "fill-rule": "nonzero"
    }, qi("path", {
      d: "M4,7 C4.55228,7 5,7.44772 5,8 C5,8.55229 4.55228,9 4,9 C3.44772,9 3,8.55229 3,8 C3,7.44772 3.44772,7 4,7 Z M8,7 C8.55229,7 9,7.44772 9,8 C9,8.55229 8.55229,9 8,9 C7.44772,9 7,8.55229 7,8 C7,7.44772 7.44772,7 8,7 Z M12,7 C12.5523,7 13,7.44772 13,8 C13,8.55229 12.5523,9 12,9 C11.4477,9 11,8.55229 11,8 C11,7.44772 11.4477,7 12,7 Z"
    }))));
  }
}), Gi = window.Vue.h, Wk = mr("success", () => Gi("svg", {
  viewBox: "0 0 48 48",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, Gi("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, Gi("g", {
  "fill-rule": "nonzero"
}, Gi("path", {
  d: "M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.6338835,17.6161165 C32.1782718,17.1605048 31.4584514,17.1301307 30.9676119,17.5249942 L30.8661165,17.6161165 L20.75,27.732233 L17.1338835,24.1161165 C16.6457281,23.6279612 15.8542719,23.6279612 15.3661165,24.1161165 C14.9105048,24.5717282 14.8801307,25.2915486 15.2749942,25.7823881 L15.3661165,25.8838835 L19.8661165,30.3838835 C20.3217282,30.8394952 21.0415486,30.8698693 21.5323881,30.4750058 L21.6338835,30.3838835 L32.6338835,19.3838835 C33.1220388,18.8957281 33.1220388,18.1042719 32.6338835,17.6161165 Z"
}))))), Xi = window.Vue.h, Uk = mr("warning", () => Xi("svg", {
  viewBox: "0 0 24 24",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, Xi("g", {
  stroke: "none",
  "stroke-width": "1",
  "fill-rule": "evenodd"
}, Xi("g", {
  "fill-rule": "nonzero"
}, Xi("path", {
  d: "M12,2 C17.523,2 22,6.478 22,12 C22,17.522 17.523,22 12,22 C6.477,22 2,17.522 2,12 C2,6.478 6.477,2 12,2 Z M12.0018002,15.0037242 C11.450254,15.0037242 11.0031376,15.4508407 11.0031376,16.0023869 C11.0031376,16.553933 11.450254,17.0010495 12.0018002,17.0010495 C12.5533463,17.0010495 13.0004628,16.553933 13.0004628,16.0023869 C13.0004628,15.4508407 12.5533463,15.0037242 12.0018002,15.0037242 Z M11.99964,7 C11.4868042,7.00018474 11.0642719,7.38637706 11.0066858,7.8837365 L11,8.00036004 L11.0018003,13.0012393 L11.00857,13.117858 C11.0665141,13.6151758 11.4893244,14.0010638 12.0021602,14.0008793 C12.514996,14.0006946 12.9375283,13.6145023 12.9951144,13.1171428 L13.0018002,13.0005193 L13,7.99964009 L12.9932303,7.8830214 C12.9352861,7.38570354 12.5124758,6.99981552 11.99964,7 Z"
}))))), {
  cubicBezierEaseInOut: Kk
} = Lo;
function Sn({
  originalTransform: e = "",
  left: t = 0,
  top: n = 0,
  transition: o = `all .3s ${Kk} !important`
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
const qk = I("base-clear", `
 flex-shrink: 0;
 height: 1em;
 width: 1em;
 position: relative;
`, [D(">", [N("clear", `
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
 `)]), N("placeholder", `
 display: flex;
 `), N("clear, placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [Sn({
  originalTransform: "translateX(-50%) translateY(-50%)",
  left: "50%",
  top: "50%"
})])])]), Gk = window.Vue.defineComponent, qo = window.Vue.h, Xk = window.Vue.toRef, Xs = Gk({
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
    return Do("-base-clear", qk, Xk(e, "clsPrefix")), {
      handleMouseDown(t) {
        t.preventDefault();
      }
    };
  },
  render() {
    const {
      clsPrefix: e
    } = this;
    return qo("div", {
      class: `${e}-base-clear`
    }, qo(gi, null, {
      default: () => {
        var t, n;
        return this.show ? qo("div", {
          key: "dismiss",
          class: `${e}-base-clear__clear`,
          onClick: this.onClear,
          onMousedown: this.handleMouseDown,
          "data-clear": !0
        }, vn(this.$slots.icon, () => [qo($t, {
          clsPrefix: e
        }, {
          default: () => qo(Tk, null)
        })])) : qo("div", {
          key: "icon",
          class: `${e}-base-clear__placeholder`
        }, (n = (t = this.$slots).placeholder) === null || n === void 0 ? void 0 : n.call(t));
      }
    }));
  }
}), Yk = I("base-close", `
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
 `), ot("disabled", [D("&:hover", `
 color: var(--n-close-icon-color-hover);
 `), D("&:hover::before", `
 background-color: var(--n-close-color-hover);
 `), D("&:focus::before", `
 background-color: var(--n-close-color-hover);
 `), D("&:active", `
 color: var(--n-close-icon-color-pressed);
 `), D("&:active::before", `
 background-color: var(--n-close-color-pressed);
 `)]), K("disabled", `
 cursor: not-allowed;
 color: var(--n-close-icon-color-disabled);
 background-color: transparent;
 `), K("round", [D("&::before", `
 border-radius: 50%;
 `)])]), Zk = window.Vue.defineComponent, zl = window.Vue.h, Jk = window.Vue.toRef, Ld = Zk({
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
    return Do("-base-close", Yk, Jk(e, "clsPrefix")), () => {
      const {
        clsPrefix: t,
        disabled: n,
        absolute: o,
        round: r,
        isButtonTag: i
      } = e;
      return zl(i ? "button" : "div", {
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
      }, zl($t, {
        clsPrefix: t
      }, {
        default: () => zl(Fk, null)
      }));
    };
  }
}), Qk = window.Vue.defineComponent, e2 = window.Vue.h, t2 = window.Vue.Transition, n2 = window.Vue.TransitionGroup, o2 = Qk({
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
      } = e, h = a ? n2 : t2, p = {
        name: s ? "fade-in-width-expand-transition" : "fade-in-height-expand-transition",
        appear: d,
        onEnter: i,
        onAfterEnter: l,
        onBeforeLeave: n,
        onLeave: o,
        onAfterLeave: r
      };
      return a || (p.mode = c), e2(h, p, t);
    };
  }
}), r2 = window.Vue.defineComponent, i2 = window.Vue.h, a2 = r2({
  props: {
    onFocus: Function,
    onBlur: Function
  },
  setup(e) {
    return () => i2("div", {
      style: "width: 0; height: 0",
      tabindex: 0,
      onFocus: e.onFocus,
      onBlur: e.onBlur
    });
  }
}), l2 = D([D("@keyframes rotator", `
 0% {
 -webkit-transform: rotate(0deg);
 transform: rotate(0deg);
 }
 100% {
 -webkit-transform: rotate(360deg);
 transform: rotate(360deg);
 }`), I("base-loading", `
 position: relative;
 line-height: 0;
 width: 1em;
 height: 1em;
 `, [N("transition-wrapper", `
 position: absolute;
 width: 100%;
 height: 100%;
 `, [Sn()]), N("placeholder", `
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 `, [Sn({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})]), N("container", `
 animation: rotator 3s linear infinite both;
 `, [N("icon", `
 height: 1em;
 width: 1em;
 `)])])]), s2 = window.Vue.defineComponent, sn = window.Vue.h, d2 = window.Vue.toRef, Ml = "1.6s", c2 = {
  strokeWidth: {
    type: Number,
    default: 28
  },
  stroke: {
    type: String,
    default: void 0
  }
}, bi = s2({
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
  }, c2),
  setup(e) {
    Do("-base-loading", l2, d2(e, "clsPrefix"));
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
    }, sn(gi, null, {
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
        dur: Ml,
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
        dur: Ml,
        fill: "freeze",
        repeatCount: "indefinite"
      }), sn("animate", {
        attributeName: "stroke-dashoffset",
        values: `${5.67 * t};${1.42 * t};${5.67 * t}`,
        begin: "0s",
        dur: Ml,
        fill: "freeze",
        repeatCount: "indefinite"
      })))))) : sn("div", {
        key: "placeholder",
        class: `${e}-base-loading__placeholder`
      }, this.$slots)
    }));
  }
}), {
  cubicBezierEaseInOut: lf
} = Lo;
function Ev({
  name: e = "fade-in",
  enterDuration: t = "0.2s",
  leaveDuration: n = "0.2s",
  enterCubicBezier: o = lf,
  leaveCubicBezier: r = lf
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
const Re = {
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
}, u2 = _o(Re.neutralBase), Ov = _o(Re.neutralInvertBase), f2 = `rgba(${Ov.slice(0, 3).join(", ")}, `;
function sf(e) {
  return `${f2 + String(e)})`;
}
function _t(e) {
  const t = Array.from(Ov);
  return t[3] = Number(e), We(u2, t);
}
const mt = Object.assign(Object.assign({
  name: "common"
}, Lo), {
  baseColor: Re.neutralBase,
  // primary color
  primaryColor: Re.primaryDefault,
  primaryColorHover: Re.primaryHover,
  primaryColorPressed: Re.primaryActive,
  primaryColorSuppl: Re.primarySuppl,
  // info color
  infoColor: Re.infoDefault,
  infoColorHover: Re.infoHover,
  infoColorPressed: Re.infoActive,
  infoColorSuppl: Re.infoSuppl,
  // success color
  successColor: Re.successDefault,
  successColorHover: Re.successHover,
  successColorPressed: Re.successActive,
  successColorSuppl: Re.successSuppl,
  // warning color
  warningColor: Re.warningDefault,
  warningColorHover: Re.warningHover,
  warningColorPressed: Re.warningActive,
  warningColorSuppl: Re.warningSuppl,
  // error color
  errorColor: Re.errorDefault,
  errorColorHover: Re.errorHover,
  errorColorPressed: Re.errorActive,
  errorColorSuppl: Re.errorSuppl,
  // text color
  textColorBase: Re.neutralTextBase,
  textColor1: "rgb(31, 34, 37)",
  textColor2: "rgb(51, 54, 57)",
  textColor3: "rgb(118, 124, 130)",
  // textColor4: neutral(base.alpha4), // disabled, placeholder, icon
  // textColor5: neutral(base.alpha5),
  textColorDisabled: _t(Re.alpha4),
  placeholderColor: _t(Re.alpha4),
  placeholderColorDisabled: _t(Re.alpha5),
  iconColor: _t(Re.alpha4),
  iconColorHover: Pi(_t(Re.alpha4), {
    lightness: 0.75
  }),
  iconColorPressed: Pi(_t(Re.alpha4), {
    lightness: 0.9
  }),
  iconColorDisabled: _t(Re.alpha5),
  opacity1: Re.alpha1,
  opacity2: Re.alpha2,
  opacity3: Re.alpha3,
  opacity4: Re.alpha4,
  opacity5: Re.alpha5,
  dividerColor: "rgb(239, 239, 245)",
  borderColor: "rgb(224, 224, 230)",
  // close
  closeIconColor: _t(Number(Re.alphaClose)),
  closeIconColorHover: _t(Number(Re.alphaClose)),
  closeIconColorPressed: _t(Number(Re.alphaClose)),
  closeColorHover: "rgba(0, 0, 0, .09)",
  closeColorPressed: "rgba(0, 0, 0, .13)",
  // clear
  clearColor: _t(Re.alpha4),
  clearColorHover: Pi(_t(Re.alpha4), {
    lightness: 0.75
  }),
  clearColorPressed: Pi(_t(Re.alpha4), {
    lightness: 0.9
  }),
  scrollbarColor: sf(Re.alphaScrollbar),
  scrollbarColorHover: sf(Re.alphaScrollbarHover),
  scrollbarWidth: "5px",
  scrollbarHeight: "5px",
  scrollbarBorderRadius: "5px",
  progressRailColor: _t(Re.alphaProgressRail),
  railColor: "rgb(219, 219, 223)",
  popoverColor: Re.neutralPopover,
  tableColor: Re.neutralCard,
  cardColor: Re.neutralCard,
  modalColor: Re.neutralModal,
  bodyColor: Re.neutralBody,
  tagColor: "#eee",
  avatarColor: _t(Re.alphaAvatar),
  invertedColor: "rgb(0, 20, 40)",
  inputColor: _t(Re.alphaInput),
  codeColor: "rgb(244, 244, 248)",
  tabColor: "rgb(247, 247, 250)",
  actionColor: "rgb(250, 250, 252)",
  tableHeaderColor: "rgb(250, 250, 252)",
  hoverColor: "rgb(243, 243, 245)",
  // use color with alpha since it can be nested with header filter & sorter effect
  tableColorHover: "rgba(0, 0, 100, 0.03)",
  tableColorStriped: "rgba(0, 0, 100, 0.02)",
  pressedColor: "rgb(237, 237, 239)",
  opacityDisabled: Re.alphaDisabled,
  inputColorDisabled: "rgb(250, 250, 252)",
  // secondary button color
  // can also be used in tertiary button & quaternary button
  buttonColor2: "rgba(46, 51, 56, .05)",
  buttonColor2Hover: "rgba(46, 51, 56, .09)",
  buttonColor2Pressed: "rgba(46, 51, 56, .13)",
  boxShadow1: "0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04)",
  boxShadow2: "0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05)",
  boxShadow3: "0 6px 16px -9px rgba(0, 0, 0, .08), 0 9px 28px 0 rgba(0, 0, 0, .05), 0 12px 48px 16px rgba(0, 0, 0, .03)"
}), h2 = {
  railInsetHorizontalBottom: "auto 2px 4px 2px",
  railInsetHorizontalTop: "4px 2px auto 2px",
  railInsetVerticalRight: "2px 4px 2px auto",
  railInsetVerticalLeft: "2px auto 2px 4px",
  railColor: "transparent"
};
function p2(e) {
  const {
    scrollbarColor: t,
    scrollbarColorHover: n,
    scrollbarHeight: o,
    scrollbarWidth: r,
    scrollbarBorderRadius: i
  } = e;
  return Object.assign(Object.assign({}, h2), {
    height: o,
    width: r,
    borderRadius: i,
    color: t,
    colorHover: n
  });
}
const gr = {
  name: "Scrollbar",
  common: mt,
  self: p2
}, v2 = I("scrollbar", `
 overflow: hidden;
 position: relative;
 z-index: auto;
 height: 100%;
 width: 100%;
`, [D(">", [I("scrollbar-container", `
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
  I("scrollbar-content", `
 box-sizing: border-box;
 min-width: 100%;
 `)
])])]), D(">, +", [I("scrollbar-rail", `
 position: absolute;
 pointer-events: none;
 user-select: none;
 background: var(--n-scrollbar-rail-color);
 -webkit-user-select: none;
 `, [K("horizontal", `
 height: var(--n-scrollbar-height);
 `, [D(">", [N("scrollbar", `
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
 `, [D(">", [N("scrollbar", `
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
 `), K("disabled", [D(">", [N("scrollbar", "pointer-events: none;")])]), D(">", [N("scrollbar", `
 z-index: 1;
 position: absolute;
 cursor: pointer;
 pointer-events: all;
 background-color: var(--n-scrollbar-color);
 transition: background-color .2s var(--n-scrollbar-bezier);
 `, [Ev(), D("&:hover", "background-color: var(--n-scrollbar-color-hover);")])])])])]), At = window.Vue.computed, m2 = window.Vue.defineComponent, g2 = window.Vue.Fragment, en = window.Vue.h, b2 = window.Vue.mergeProps, w2 = window.Vue.onBeforeUnmount, y2 = window.Vue.onMounted, Vt = window.Vue.ref, df = window.Vue.Transition, x2 = window.Vue.watchEffect, C2 = Object.assign(Object.assign({}, ke.props), {
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
}), br = m2({
  name: "Scrollbar",
  props: C2,
  inheritAttrs: !1,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n,
      mergedRtlRef: o
    } = qe(e), r = zt("Scrollbar", o, t), i = Vt(null), l = Vt(null), a = Vt(null), s = Vt(null), d = Vt(null), c = Vt(null), h = Vt(null), p = Vt(null), v = Vt(null), f = Vt(null), m = Vt(null), g = Vt(0), u = Vt(0), w = Vt(!1), x = Vt(!1);
    let y = !1, C = !1, S, b, R = 0, $ = 0, T = 0, H = 0;
    const P = s0(), z = ke("Scrollbar", "-scrollbar", v2, gr, e, t), M = At(() => {
      const {
        value: k
      } = p, {
        value: B
      } = c, {
        value: Q
      } = f;
      return k === null || B === null || Q === null ? 0 : Math.min(k, Q * k / B + Rn(z.value.self.width) * 1.5);
    }), O = At(() => `${M.value}px`), U = At(() => {
      const {
        value: k
      } = v, {
        value: B
      } = h, {
        value: Q
      } = m;
      return k === null || B === null || Q === null ? 0 : Q * k / B + Rn(z.value.self.height) * 1.5;
    }), L = At(() => `${U.value}px`), Y = At(() => {
      const {
        value: k
      } = p, {
        value: B
      } = g, {
        value: Q
      } = c, {
        value: le
      } = f;
      if (k === null || Q === null || le === null)
        return 0;
      {
        const de = Q - k;
        return de ? B / de * (le - M.value) : 0;
      }
    }), te = At(() => `${Y.value}px`), J = At(() => {
      const {
        value: k
      } = v, {
        value: B
      } = u, {
        value: Q
      } = h, {
        value: le
      } = m;
      if (k === null || Q === null || le === null)
        return 0;
      {
        const de = Q - k;
        return de ? B / de * (le - U.value) : 0;
      }
    }), X = At(() => `${J.value}px`), A = At(() => {
      const {
        value: k
      } = p, {
        value: B
      } = c;
      return k !== null && B !== null && B > k;
    }), G = At(() => {
      const {
        value: k
      } = v, {
        value: B
      } = h;
      return k !== null && B !== null && B > k;
    }), Z = At(() => {
      const {
        trigger: k
      } = e;
      return k === "none" || w.value;
    }), ie = At(() => {
      const {
        trigger: k
      } = e;
      return k === "none" || x.value;
    }), ae = At(() => {
      const {
        container: k
      } = e;
      return k ? k() : l.value;
    }), ue = At(() => {
      const {
        content: k
      } = e;
      return k ? k() : a.value;
    }), be = (k, B) => {
      if (!e.scrollable) return;
      if (typeof k == "number") {
        $e(k, B ?? 0, 0, !1, "auto");
        return;
      }
      const {
        left: Q,
        top: le,
        index: de,
        elSize: pe,
        position: me,
        behavior: xe,
        el: ze,
        debounce: nt = !0
      } = k;
      (Q !== void 0 || le !== void 0) && $e(Q ?? 0, le ?? 0, 0, !1, xe), ze !== void 0 ? $e(0, ze.offsetTop, ze.offsetHeight, nt, xe) : de !== void 0 && pe !== void 0 ? $e(0, de * pe, pe, nt, xe) : me === "bottom" ? $e(0, Number.MAX_SAFE_INTEGER, 0, !1, xe) : me === "top" && $e(0, 0, 0, !1, xe);
    }, q = j0(() => {
      e.container || be({
        top: g.value,
        left: u.value
      });
    }), se = () => {
      q.isDeactivated || j();
    }, Pe = (k) => {
      if (q.isDeactivated) return;
      const {
        onResize: B
      } = e;
      B && B(k), j();
    }, ve = (k, B) => {
      if (!e.scrollable) return;
      const {
        value: Q
      } = ae;
      Q && (typeof k == "object" ? Q.scrollBy(k) : Q.scrollBy(k, B || 0));
    };
    function $e(k, B, Q, le, de) {
      const {
        value: pe
      } = ae;
      if (pe) {
        if (le) {
          const {
            scrollTop: me,
            offsetHeight: xe
          } = pe;
          if (B > me) {
            B + Q <= me + xe || pe.scrollTo({
              left: k,
              top: B + Q - xe,
              behavior: de
            });
            return;
          }
        }
        pe.scrollTo({
          left: k,
          top: B,
          behavior: de
        });
      }
    }
    function Se() {
      _(), W(), j();
    }
    function De() {
      Ie();
    }
    function Ie() {
      Je(), F();
    }
    function Je() {
      b !== void 0 && window.clearTimeout(b), b = window.setTimeout(() => {
        x.value = !1;
      }, e.duration);
    }
    function F() {
      S !== void 0 && window.clearTimeout(S), S = window.setTimeout(() => {
        w.value = !1;
      }, e.duration);
    }
    function _() {
      S !== void 0 && window.clearTimeout(S), w.value = !0;
    }
    function W() {
      b !== void 0 && window.clearTimeout(b), x.value = !0;
    }
    function ne(k) {
      const {
        onScroll: B
      } = e;
      B && B(k), ye();
    }
    function ye() {
      const {
        value: k
      } = ae;
      k && (g.value = k.scrollTop, u.value = k.scrollLeft * (r != null && r.value ? -1 : 1));
    }
    function he() {
      const {
        value: k
      } = ue;
      k && (c.value = k.offsetHeight, h.value = k.offsetWidth);
      const {
        value: B
      } = ae;
      B && (p.value = B.offsetHeight, v.value = B.offsetWidth);
      const {
        value: Q
      } = d, {
        value: le
      } = s;
      Q && (m.value = Q.offsetWidth), le && (f.value = le.offsetHeight);
    }
    function E() {
      const {
        value: k
      } = ae;
      k && (g.value = k.scrollTop, u.value = k.scrollLeft * (r != null && r.value ? -1 : 1), p.value = k.offsetHeight, v.value = k.offsetWidth, c.value = k.scrollHeight, h.value = k.scrollWidth);
      const {
        value: B
      } = d, {
        value: Q
      } = s;
      B && (m.value = B.offsetWidth), Q && (f.value = Q.offsetHeight);
    }
    function j() {
      e.scrollable && (e.useUnifiedContainer ? E() : (he(), ye()));
    }
    function fe(k) {
      var B;
      return !(!((B = i.value) === null || B === void 0) && B.contains(ur(k)));
    }
    function _e(k) {
      k.preventDefault(), k.stopPropagation(), C = !0, He("mousemove", window, at, !0), He("mouseup", window, vt, !0), $ = u.value, T = r != null && r.value ? window.innerWidth - k.clientX : k.clientX;
    }
    function at(k) {
      if (!C) return;
      S !== void 0 && window.clearTimeout(S), b !== void 0 && window.clearTimeout(b);
      const {
        value: B
      } = v, {
        value: Q
      } = h, {
        value: le
      } = U;
      if (B === null || Q === null) return;
      const pe = (r != null && r.value ? window.innerWidth - k.clientX - T : k.clientX - T) * (Q - B) / (B - le), me = Q - B;
      let xe = $ + pe;
      xe = Math.min(me, xe), xe = Math.max(xe, 0);
      const {
        value: ze
      } = ae;
      if (ze) {
        ze.scrollLeft = xe * (r != null && r.value ? -1 : 1);
        const {
          internalOnUpdateScrollLeft: nt
        } = e;
        nt && nt(xe);
      }
    }
    function vt(k) {
      k.preventDefault(), k.stopPropagation(), Be("mousemove", window, at, !0), Be("mouseup", window, vt, !0), C = !1, j(), fe(k) && Ie();
    }
    function Ye(k) {
      k.preventDefault(), k.stopPropagation(), y = !0, He("mousemove", window, Ze, !0), He("mouseup", window, gt, !0), R = g.value, H = k.clientY;
    }
    function Ze(k) {
      if (!y) return;
      S !== void 0 && window.clearTimeout(S), b !== void 0 && window.clearTimeout(b);
      const {
        value: B
      } = p, {
        value: Q
      } = c, {
        value: le
      } = M;
      if (B === null || Q === null) return;
      const pe = (k.clientY - H) * (Q - B) / (B - le), me = Q - B;
      let xe = R + pe;
      xe = Math.min(me, xe), xe = Math.max(xe, 0);
      const {
        value: ze
      } = ae;
      ze && (ze.scrollTop = xe);
    }
    function gt(k) {
      k.preventDefault(), k.stopPropagation(), Be("mousemove", window, Ze, !0), Be("mouseup", window, gt, !0), y = !1, j(), fe(k) && Ie();
    }
    x2(() => {
      const {
        value: k
      } = G, {
        value: B
      } = A, {
        value: Q
      } = t, {
        value: le
      } = d, {
        value: de
      } = s;
      le && (k ? le.classList.remove(`${Q}-scrollbar-rail--disabled`) : le.classList.add(`${Q}-scrollbar-rail--disabled`)), de && (B ? de.classList.remove(`${Q}-scrollbar-rail--disabled`) : de.classList.add(`${Q}-scrollbar-rail--disabled`));
    }), y2(() => {
      e.container || j();
    }), w2(() => {
      S !== void 0 && window.clearTimeout(S), b !== void 0 && window.clearTimeout(b), Be("mousemove", window, Ze, !0), Be("mouseup", window, gt, !0);
    });
    const Qe = At(() => {
      const {
        common: {
          cubicBezierEaseInOut: k
        },
        self: {
          color: B,
          colorHover: Q,
          height: le,
          width: de,
          borderRadius: pe,
          railInsetHorizontalTop: me,
          railInsetHorizontalBottom: xe,
          railInsetVerticalRight: ze,
          railInsetVerticalLeft: nt,
          railColor: Ne
        }
      } = z.value, {
        top: Pt,
        right: Mt,
        bottom: It,
        left: Nt
      } = Gt(me), {
        top: Ht,
        right: Qt,
        bottom: jt,
        left: V
      } = Gt(xe), {
        top: ee,
        right: we,
        bottom: Ee,
        left: je
      } = Gt(r != null && r.value ? wu(ze) : ze), {
        top: Me,
        right: rt,
        bottom: ct,
        left: Yt
      } = Gt(r != null && r.value ? wu(nt) : nt);
      return {
        "--n-scrollbar-bezier": k,
        "--n-scrollbar-color": B,
        "--n-scrollbar-color-hover": Q,
        "--n-scrollbar-border-radius": pe,
        "--n-scrollbar-width": de,
        "--n-scrollbar-height": le,
        "--n-scrollbar-rail-top-horizontal-top": Pt,
        "--n-scrollbar-rail-right-horizontal-top": Mt,
        "--n-scrollbar-rail-bottom-horizontal-top": It,
        "--n-scrollbar-rail-left-horizontal-top": Nt,
        "--n-scrollbar-rail-top-horizontal-bottom": Ht,
        "--n-scrollbar-rail-right-horizontal-bottom": Qt,
        "--n-scrollbar-rail-bottom-horizontal-bottom": jt,
        "--n-scrollbar-rail-left-horizontal-bottom": V,
        "--n-scrollbar-rail-top-vertical-right": ee,
        "--n-scrollbar-rail-right-vertical-right": we,
        "--n-scrollbar-rail-bottom-vertical-right": Ee,
        "--n-scrollbar-rail-left-vertical-right": je,
        "--n-scrollbar-rail-top-vertical-left": Me,
        "--n-scrollbar-rail-right-vertical-left": rt,
        "--n-scrollbar-rail-bottom-vertical-left": ct,
        "--n-scrollbar-rail-left-vertical-left": Yt,
        "--n-scrollbar-rail-color": Ne
      };
    }), ce = n ? yt("scrollbar", void 0, Qe, e) : void 0;
    return Object.assign(Object.assign({}, {
      scrollTo: be,
      scrollBy: ve,
      sync: j,
      syncUnifiedContainer: E,
      handleMouseEnterWrapper: Se,
      handleMouseLeaveWrapper: De
    }), {
      mergedClsPrefix: t,
      rtlEnabled: r,
      containerScrollTop: g,
      wrapperRef: i,
      containerRef: l,
      contentRef: a,
      yRailRef: s,
      xRailRef: d,
      needYBar: A,
      needXBar: G,
      yBarSizePx: O,
      xBarSizePx: L,
      yBarTopPx: te,
      xBarLeftPx: X,
      isShowXBar: Z,
      isShowYBar: ie,
      isIos: P,
      handleScroll: ne,
      handleContentResize: se,
      handleContainerResize: Pe,
      handleYScrollMouseDown: Ye,
      handleXScrollMouseDown: _e,
      cssVars: n ? void 0 : Qe,
      themeClass: ce == null ? void 0 : ce.themeClass,
      onRender: ce == null ? void 0 : ce.onRender
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
    }, en(d ? Ls : df, d ? null : {
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
      return (v = this.onRender) === null || v === void 0 || v.call(this), en("div", b2(this.$attrs, {
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
      }, en(d ? Ls : df, d ? null : {
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
    return i ? en(g2, null, p, c(this.themeClass, this.cssVars)) : p;
  }
}), zv = br;
function cf(e) {
  return Array.isArray(e) ? e : [e];
}
const Ys = {
  STOP: "STOP"
};
function Mv(e, t) {
  const n = t(e);
  e.children !== void 0 && n !== Ys.STOP && e.children.forEach((o) => Mv(o, t));
}
function S2(e, t = {}) {
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
function $2(e, t) {
  const { isLeaf: n } = e;
  return n !== void 0 ? n : !t(e);
}
function R2(e) {
  return e.children;
}
function k2(e) {
  return e.key;
}
function P2() {
  return !1;
}
function _2(e, t) {
  const { isLeaf: n } = e;
  return !(n === !1 && !Array.isArray(t(e)));
}
function T2(e) {
  return e.disabled === !0;
}
function F2(e, t) {
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
function E2(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) || n.add(o);
  }), Array.from(n);
}
function O2(e, t) {
  const n = new Set(e);
  return t.forEach((o) => {
    n.has(o) && n.delete(o);
  }), Array.from(n);
}
function z2(e) {
  return (e == null ? void 0 : e.type) === "group";
}
function M2(e) {
  const t = /* @__PURE__ */ new Map();
  return e.forEach((n, o) => {
    t.set(n.key, o);
  }), (n) => {
    var o;
    return (o = t.get(n)) !== null && o !== void 0 ? o : null;
  };
}
class I2 extends Error {
  constructor() {
    super(), this.message = "SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded.";
  }
}
function A2(e, t, n, o) {
  return Aa(t.concat(e), n, o, !1);
}
function V2(e, t) {
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
function B2(e, t, n, o) {
  const r = Aa(t, n, o, !1), i = Aa(e, n, o, !0), l = V2(e, n), a = [];
  return r.forEach((s) => {
    (i.has(s) || l.has(s)) && a.push(s);
  }), a.forEach((s) => r.delete(s)), r;
}
function Vl(e, t) {
  const { checkedKeys: n, keysToCheck: o, keysToUncheck: r, indeterminateKeys: i, cascade: l, leafOnly: a, checkStrategy: s, allowNotLoaded: d } = e;
  if (!l)
    return o !== void 0 ? {
      checkedKeys: E2(n, o),
      indeterminateKeys: Array.from(i)
    } : r !== void 0 ? {
      checkedKeys: O2(n, r),
      indeterminateKeys: Array.from(i)
    } : {
      checkedKeys: Array.from(n),
      indeterminateKeys: Array.from(i)
    };
  const { levelTreeNodeMap: c } = t;
  let h;
  r !== void 0 ? h = B2(r, n, t, d) : o !== void 0 ? h = A2(o, n, t, d) : h = Aa(n, t, d, !1);
  const p = s === "parent", v = s === "child" || a, f = h, m = /* @__PURE__ */ new Set(), g = Math.max.apply(null, Array.from(c.keys()));
  for (let u = g; u >= 0; u -= 1) {
    const w = u === 0, x = c.get(u);
    for (const y of x) {
      if (y.isLeaf)
        continue;
      const { key: C, shallowLoaded: S } = y;
      if (v && S && y.children.forEach((T) => {
        !T.disabled && !T.isLeaf && T.shallowLoaded && f.has(T.key) && f.delete(T.key);
      }), y.disabled || !S)
        continue;
      let b = !0, R = !1, $ = !0;
      for (const T of y.children) {
        const H = T.key;
        if (!T.disabled) {
          if ($ && ($ = !1), f.has(H))
            R = !0;
          else if (m.has(H)) {
            R = !0, b = !1;
            break;
          } else if (b = !1, R)
            break;
        }
      }
      b && !$ ? (p && y.children.forEach((T) => {
        !T.disabled && f.has(T.key) && f.delete(T.key);
      }), f.add(C)) : R && m.add(C), w && v && f.has(C) && f.delete(C);
    }
  }
  return {
    checkedKeys: Array.from(f),
    indeterminateKeys: Array.from(m)
  };
}
function Aa(e, t, n, o) {
  const { treeNodeMap: r, getChildren: i } = t, l = /* @__PURE__ */ new Set(), a = new Set(e);
  return e.forEach((s) => {
    const d = r.get(s);
    d !== void 0 && Mv(d, (c) => {
      if (c.disabled)
        return Ys.STOP;
      const { key: h } = c;
      if (!l.has(h) && (l.add(h), a.add(h), F2(c.rawNode, i))) {
        if (o)
          return Ys.STOP;
        if (!n)
          throw new I2();
      }
    });
  }), a;
}
function L2(e, { includeGroup: t = !1, includeSelf: n = !0 }, o) {
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
function D2(e) {
  if (e.length === 0)
    return null;
  const t = e[0];
  return t.isGroup || t.ignored || t.disabled ? t.getNext() : t;
}
function N2(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r + 1) % o] : r === n.length - 1 ? null : n[r + 1];
}
function uf(e, t, { loop: n = !1, includeDisabled: o = !1 } = {}) {
  const r = t === "prev" ? H2 : N2, i = {
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
        const c = Dd(d, i);
        c !== null ? a = c : s(r(d, n));
      } else {
        const c = r(d, !1);
        if (c !== null)
          s(c);
        else {
          const h = j2(d);
          h != null && h.isGroup ? s(r(h, n)) : n && s(r(d, !0));
        }
      }
    }
  }
  return s(e), a;
}
function H2(e, t) {
  const n = e.siblings, o = n.length, { index: r } = e;
  return t ? n[(r - 1 + o) % o] : r === 0 ? null : n[r - 1];
}
function j2(e) {
  return e.parent;
}
function Dd(e, t = {}) {
  const { reverse: n = !1 } = t, { children: o } = e;
  if (o) {
    const { length: r } = o, i = n ? r - 1 : 0, l = n ? -1 : r, a = n ? -1 : 1;
    for (let s = i; s !== l; s += a) {
      const d = o[s];
      if (!d.disabled && !d.ignored)
        if (d.isGroup) {
          const c = Dd(d, t);
          if (c !== null)
            return c;
        } else
          return d;
    }
  }
  return null;
}
const W2 = {
  getChild() {
    return this.ignored ? null : Dd(this);
  },
  getParent() {
    const { parent: e } = this;
    return e != null && e.isGroup ? e.getParent() : e;
  },
  getNext(e = {}) {
    return uf(this, "next", e);
  },
  getPrev(e = {}) {
    return uf(this, "prev", e);
  }
};
function U2(e, t) {
  const n = t ? new Set(t) : void 0, o = [];
  function r(i) {
    i.forEach((l) => {
      o.push(l), !(l.isLeaf || !l.children || l.ignored) && (l.isGroup || // normal non-leaf node
      n === void 0 || n.has(l.key)) && r(l.children);
    });
  }
  return r(e), o;
}
function K2(e, t) {
  const n = e.key;
  for (; t; ) {
    if (t.key === n)
      return !0;
    t = t.parent;
  }
  return !1;
}
function Iv(e, t, n, o, r, i = null, l = 0) {
  const a = [];
  return e.forEach((s, d) => {
    var c;
    const h = Object.create(o);
    if (h.rawNode = s, h.siblings = a, h.level = l, h.index = d, h.isFirstChild = d === 0, h.isLastChild = d + 1 === e.length, h.parent = i, !h.ignored) {
      const p = r(s);
      Array.isArray(p) && (h.children = Iv(p, t, n, o, r, h, l + 1));
    }
    a.push(h), t.set(h.key, h), n.has(l) || n.set(l, []), (c = n.get(l)) === null || c === void 0 || c.push(h);
  }), a;
}
function Ya(e, t = {}) {
  var n;
  const o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), { getDisabled: i = T2, getIgnored: l = P2, getIsGroup: a = z2, getKey: s = k2 } = t, d = (n = t.getChildren) !== null && n !== void 0 ? n : R2, c = t.ignoreEmptyChildren ? (y) => {
    const C = d(y);
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
      return $2(this.rawNode, c);
    },
    get shallowLoaded() {
      return _2(this.rawNode, c);
    },
    get ignored() {
      return l(this.rawNode);
    },
    contains(y) {
      return K2(this, y);
    }
  }, W2), p = Iv(e, o, r, h, c);
  function v(y) {
    if (y == null)
      return null;
    const C = o.get(y);
    return C && !C.isGroup && !C.ignored ? C : null;
  }
  function f(y) {
    if (y == null)
      return null;
    const C = o.get(y);
    return C && !C.ignored ? C : null;
  }
  function m(y, C) {
    const S = f(y);
    return S ? S.getPrev(C) : null;
  }
  function g(y, C) {
    const S = f(y);
    return S ? S.getNext(C) : null;
  }
  function u(y) {
    const C = f(y);
    return C ? C.getParent() : null;
  }
  function w(y) {
    const C = f(y);
    return C ? C.getChild() : null;
  }
  const x = {
    treeNodes: p,
    treeNodeMap: o,
    levelTreeNodeMap: r,
    maxLevel: Math.max(...r.keys()),
    getChildren: c,
    getFlattenedNodes(y) {
      return U2(p, y);
    },
    getNode: v,
    getPrev: m,
    getNext: g,
    getParent: u,
    getChild: w,
    getFirstAvailableNode() {
      return D2(p);
    },
    getPath(y, C = {}) {
      return L2(y, C, x);
    },
    getCheckedKeys(y, C = {}) {
      const { cascade: S = !0, leafOnly: b = !1, checkStrategy: R = "all", allowNotLoaded: $ = !1 } = C;
      return Vl({
        checkedKeys: Il(y),
        indeterminateKeys: Al(y),
        cascade: S,
        leafOnly: b,
        checkStrategy: R,
        allowNotLoaded: $
      }, x);
    },
    check(y, C, S = {}) {
      const { cascade: b = !0, leafOnly: R = !1, checkStrategy: $ = "all", allowNotLoaded: T = !1 } = S;
      return Vl({
        checkedKeys: Il(C),
        indeterminateKeys: Al(C),
        keysToCheck: y == null ? [] : cf(y),
        cascade: b,
        leafOnly: R,
        checkStrategy: $,
        allowNotLoaded: T
      }, x);
    },
    uncheck(y, C, S = {}) {
      const { cascade: b = !0, leafOnly: R = !1, checkStrategy: $ = "all", allowNotLoaded: T = !1 } = S;
      return Vl({
        checkedKeys: Il(C),
        indeterminateKeys: Al(C),
        keysToUncheck: y == null ? [] : cf(y),
        cascade: b,
        leafOnly: R,
        checkStrategy: $,
        allowNotLoaded: T
      }, x);
    },
    getNonLeafKeys(y = {}) {
      return S2(p, y);
    }
  };
  return x;
}
const q2 = {
  iconSizeTiny: "28px",
  iconSizeSmall: "34px",
  iconSizeMedium: "40px",
  iconSizeLarge: "46px",
  iconSizeHuge: "52px"
};
function G2(e) {
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
  return Object.assign(Object.assign({}, q2), {
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
const Nd = {
  name: "Empty",
  common: mt,
  self: G2
}, X2 = I("empty", `
 display: flex;
 flex-direction: column;
 align-items: center;
 font-size: var(--n-font-size);
`, [N("icon", `
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 font-size: var(--n-icon-size);
 line-height: var(--n-icon-size);
 color: var(--n-icon-color);
 transition:
 color .3s var(--n-bezier);
 `, [D("+", [N("description", `
 margin-top: 8px;
 `)])]), N("description", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), N("extra", `
 text-align: center;
 transition: color .3s var(--n-bezier);
 margin-top: 12px;
 color: var(--n-extra-text-color);
 `)]), Ir = window.Vue.computed, Y2 = window.Vue.defineComponent, Go = window.Vue.h, Z2 = Object.assign(Object.assign({}, ke.props), {
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
}), Av = Y2({
  name: "Empty",
  props: Z2,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n,
      mergedComponentPropsRef: o
    } = qe(e), r = ke("Empty", "-empty", X2, Nd, e, t), {
      localeRef: i
    } = mi("Empty"), l = Ir(() => {
      var c, h, p;
      return (c = e.description) !== null && c !== void 0 ? c : (p = (h = o == null ? void 0 : o.value) === null || h === void 0 ? void 0 : h.Empty) === null || p === void 0 ? void 0 : p.description;
    }), a = Ir(() => {
      var c, h;
      return ((h = (c = o == null ? void 0 : o.value) === null || c === void 0 ? void 0 : c.Empty) === null || h === void 0 ? void 0 : h.renderIcon) || (() => Go(Ok, null));
    }), s = Ir(() => {
      const {
        size: c
      } = e, {
        common: {
          cubicBezierEaseInOut: h
        },
        self: {
          [oe("iconSize", c)]: p,
          [oe("fontSize", c)]: v,
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
    }), d = n ? yt("empty", Ir(() => {
      let c = "";
      const {
        size: h
      } = e;
      return c += h[0], c;
    }), s, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedRenderIcon: a,
      localizedDescription: Ir(() => l.value || i.value.description),
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
    return n == null || n(), Go("div", {
      class: [`${t}-empty`, this.themeClass],
      style: this.cssVars
    }, this.showIcon ? Go("div", {
      class: `${t}-empty__icon`
    }, e.icon ? e.icon() : Go($t, {
      clsPrefix: t
    }, {
      default: this.mergedRenderIcon
    })) : null, this.showDescription ? Go("div", {
      class: `${t}-empty__description`
    }, e.default ? e.default() : this.localizedDescription) : null, e.extra ? Go("div", {
      class: `${t}-empty__extra`
    }, e.extra()) : null);
  }
}), J2 = {
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
function Q2(e) {
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
    heightLarge: x,
    heightHuge: y
  } = e;
  return Object.assign(Object.assign({}, J2), {
    optionFontSizeTiny: h,
    optionFontSizeSmall: p,
    optionFontSizeMedium: v,
    optionFontSizeLarge: f,
    optionFontSizeHuge: m,
    optionHeightTiny: g,
    optionHeightSmall: u,
    optionHeightMedium: w,
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
const Hd = {
  name: "InternalSelectMenu",
  common: mt,
  peers: {
    Scrollbar: gr,
    Empty: Nd
  },
  self: Q2
}, eP = window.Vue.defineComponent, tP = window.Vue.h, nP = window.Vue.inject, ff = eP({
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
    } = nP(gd);
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
    } = this, i = o == null ? void 0 : o(r), l = t ? t(r, !1) : Ot(r[this.labelField], r, !1), a = tP("div", Object.assign({}, i, {
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
}), oP = window.Vue.defineComponent, Jr = window.Vue.h, rP = window.Vue.inject, iP = window.Vue.Transition;
function aP(e, t) {
  return Jr(iP, {
    name: "fade-in-scale-up-transition"
  }, {
    default: () => e ? Jr($t, {
      clsPrefix: t,
      class: `${t}-base-select-option__check`
    }, {
      default: () => Jr(kk)
    }) : null
  });
}
const hf = oP({
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
    } = rP(gd), v = Le(() => {
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
        value: x
      } = v;
      w.disabled || x || p(u, w);
    }
    return {
      multiple: o,
      isGrouped: Le(() => {
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
      isSelected: Le(() => {
        const {
          value: u
        } = t, {
          value: w
        } = o;
        if (u === null) return !1;
        const x = e.tmNode.rawNode[s.value];
        if (w) {
          const {
            value: y
          } = r;
          return y.has(x);
        } else
          return u === x;
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
    } = this, p = aP(n, e), v = s ? [s(t, n), i && p] : [Ot(t[this.labelField], t, n), i && p], f = l == null ? void 0 : l(t), m = Jr("div", Object.assign({}, f, {
      class: [`${e}-base-select-option`, t.class, f == null ? void 0 : f.class, {
        [`${e}-base-select-option--disabled`]: t.disabled,
        [`${e}-base-select-option--selected`]: n,
        [`${e}-base-select-option--grouped`]: r,
        [`${e}-base-select-option--pending`]: o,
        [`${e}-base-select-option--show-checkmark`]: i
      }],
      style: [(f == null ? void 0 : f.style) || "", t.style || ""],
      onClick: Yr([d, f == null ? void 0 : f.onClick]),
      onMouseenter: Yr([c, f == null ? void 0 : f.onMouseenter]),
      onMousemove: Yr([h, f == null ? void 0 : f.onMousemove])
    }), Jr("div", {
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
  cubicBezierEaseIn: pf,
  cubicBezierEaseOut: vf
} = Lo;
function wi({
  transformOrigin: e = "inherit",
  duration: t = ".2s",
  enterScale: n = ".9",
  originalTransform: o = "",
  originalTransition: r = ""
} = {}) {
  return [D("&.fade-in-scale-up-transition-leave-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${pf}, transform ${t} ${pf} ${r && `,${r}`}`
  }), D("&.fade-in-scale-up-transition-enter-active", {
    transformOrigin: e,
    transition: `opacity ${t} ${vf}, transform ${t} ${vf} ${r && `,${r}`}`
  }), D("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to", {
    opacity: 0,
    transform: `${o} scale(${n})`
  }), D("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to", {
    opacity: 1,
    transform: `${o} scale(1)`
  })];
}
const lP = I("base-select-menu", `
 line-height: 1.5;
 outline: none;
 z-index: 0;
 position: relative;
 border-radius: var(--n-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-color);
`, [I("scrollbar", `
 max-height: var(--n-height);
 `), I("virtual-list", `
 max-height: var(--n-height);
 `), I("base-select-option", `
 min-height: var(--n-option-height);
 font-size: var(--n-option-font-size);
 display: flex;
 align-items: center;
 `, [N("content", `
 z-index: 1;
 white-space: nowrap;
 text-overflow: ellipsis;
 overflow: hidden;
 `)]), I("base-select-group-header", `
 min-height: var(--n-option-height);
 font-size: .93em;
 display: flex;
 align-items: center;
 `), I("base-select-menu-option-wrapper", `
 position: relative;
 width: 100%;
 `), N("loading, empty", `
 display: flex;
 padding: 12px 32px;
 flex: 1;
 justify-content: center;
 `), N("loading", `
 color: var(--n-loading-color);
 font-size: var(--n-loading-size);
 `), N("header", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), N("action", `
 padding: 8px var(--n-option-padding-left);
 font-size: var(--n-option-font-size);
 transition: 
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 border-top: 1px solid var(--n-action-divider-color);
 color: var(--n-action-text-color);
 `), I("base-select-group-header", `
 position: relative;
 cursor: default;
 padding: var(--n-option-padding);
 color: var(--n-group-header-text-color);
 `), I("base-select-option", `
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
 `), K("grouped", `
 padding-left: calc(var(--n-option-padding-left) * 1.5);
 `), K("pending", [D("&::before", `
 background-color: var(--n-option-color-pending);
 `)]), K("selected", `
 color: var(--n-option-text-color-active);
 `, [D("&::before", `
 background-color: var(--n-option-color-active);
 `), K("pending", [D("&::before", `
 background-color: var(--n-option-color-active-pending);
 `)])]), K("disabled", `
 cursor: not-allowed;
 `, [ot("selected", `
 color: var(--n-option-text-color-disabled);
 `), K("selected", `
 opacity: var(--n-option-opacity-disabled);
 `)]), N("check", `
 font-size: 16px;
 position: absolute;
 right: calc(var(--n-option-padding-right) - 4px);
 top: calc(50% - 7px);
 color: var(--n-option-check-color);
 transition: color .3s var(--n-bezier);
 `, [wi({
  enterScale: "0.5"
})])])]), Xn = window.Vue.computed, sP = window.Vue.defineComponent, Bt = window.Vue.h, dP = window.Vue.nextTick, cP = window.Vue.onBeforeUnmount, uP = window.Vue.onMounted, mf = window.Vue.provide, Yi = window.Vue.ref, An = window.Vue.toRef, gf = window.Vue.watch, Vv = sP({
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
    } = qe(e), o = zt("InternalSelectMenu", n, t), r = ke("InternalSelectMenu", "-internal-select-menu", lP, Hd, e, An(e, "clsPrefix")), i = Yi(null), l = Yi(null), a = Yi(null), s = Xn(() => e.treeMate.getFlattenedNodes()), d = Xn(() => M2(s.value)), c = Yi(null);
    function h() {
      const {
        treeMate: A
      } = e;
      let G = null;
      const {
        value: Z
      } = e;
      Z === null ? G = A.getFirstAvailableNode() : (e.multiple ? G = A.getNode((Z || [])[(Z || []).length - 1]) : G = A.getNode(Z), (!G || G.disabled) && (G = A.getFirstAvailableNode())), M(G || null);
    }
    function p() {
      const {
        value: A
      } = c;
      A && !e.treeMate.getNode(A.key) && (c.value = null);
    }
    let v;
    gf(() => e.show, (A) => {
      A ? v = gf(() => e.treeMate, () => {
        e.resetMenuOnOptionsChange ? (e.autoPending ? h() : p(), dP(O)) : p();
      }, {
        immediate: !0
      }) : v == null || v();
    }, {
      immediate: !0
    }), cP(() => {
      v == null || v();
    });
    const f = Xn(() => Rn(r.value.self[oe("optionHeight", e.size)])), m = Xn(() => Gt(r.value.self[oe("padding", e.size)])), g = Xn(() => e.multiple && Array.isArray(e.value) ? new Set(e.value) : /* @__PURE__ */ new Set()), u = Xn(() => {
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
    function y(A) {
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
    function b(A, G) {
      G.disabled || M(G, !1);
    }
    function R(A, G) {
      G.disabled || w(G);
    }
    function $(A) {
      var G;
      an(A, "action") || (G = e.onKeyup) === null || G === void 0 || G.call(e, A);
    }
    function T(A) {
      var G;
      an(A, "action") || (G = e.onKeydown) === null || G === void 0 || G.call(e, A);
    }
    function H(A) {
      var G;
      (G = e.onMousedown) === null || G === void 0 || G.call(e, A), !e.focusable && A.preventDefault();
    }
    function P() {
      const {
        value: A
      } = c;
      A && M(A.getNext({
        loop: !0
      }), !0);
    }
    function z() {
      const {
        value: A
      } = c;
      A && M(A.getPrev({
        loop: !0
      }), !0);
    }
    function M(A, G = !1) {
      c.value = A, G && O();
    }
    function O() {
      var A, G;
      const Z = c.value;
      if (!Z) return;
      const ie = d.value(Z.key);
      ie !== null && (e.virtualScroll ? (A = l.value) === null || A === void 0 || A.scrollTo({
        index: ie
      }) : (G = a.value) === null || G === void 0 || G.scrollTo({
        index: ie,
        elSize: f.value
      }));
    }
    function U(A) {
      var G, Z;
      !((G = i.value) === null || G === void 0) && G.contains(A.target) && ((Z = e.onFocus) === null || Z === void 0 || Z.call(e, A));
    }
    function L(A) {
      var G, Z;
      !((G = i.value) === null || G === void 0) && G.contains(A.relatedTarget) || (Z = e.onBlur) === null || Z === void 0 || Z.call(e, A);
    }
    mf(gd, {
      handleOptionMouseEnter: b,
      handleOptionClick: R,
      valueSetRef: g,
      pendingTmNodeRef: c,
      nodePropsRef: An(e, "nodeProps"),
      showCheckmarkRef: An(e, "showCheckmark"),
      multipleRef: An(e, "multiple"),
      valueRef: An(e, "value"),
      renderLabelRef: An(e, "renderLabel"),
      renderOptionRef: An(e, "renderOption"),
      labelFieldRef: An(e, "labelField"),
      valueFieldRef: An(e, "valueField")
    }), mf(Pp, i), uP(() => {
      const {
        value: A
      } = a;
      A && A.sync();
    });
    const Y = Xn(() => {
      const {
        size: A
      } = e, {
        common: {
          cubicBezierEaseInOut: G
        },
        self: {
          height: Z,
          borderRadius: ie,
          color: ae,
          groupHeaderTextColor: ue,
          actionDividerColor: be,
          optionTextColorPressed: q,
          optionTextColor: se,
          optionTextColorDisabled: Pe,
          optionTextColorActive: ve,
          optionOpacityDisabled: $e,
          optionCheckColor: Se,
          actionTextColor: De,
          optionColorPending: Ie,
          optionColorActive: Je,
          loadingColor: F,
          loadingSize: _,
          optionColorActivePending: W,
          [oe("optionFontSize", A)]: ne,
          [oe("optionHeight", A)]: ye,
          [oe("optionPadding", A)]: he
        }
      } = r.value;
      return {
        "--n-height": Z,
        "--n-action-divider-color": be,
        "--n-action-text-color": De,
        "--n-bezier": G,
        "--n-border-radius": ie,
        "--n-color": ae,
        "--n-option-font-size": ne,
        "--n-group-header-text-color": ue,
        "--n-option-check-color": Se,
        "--n-option-color-pending": Ie,
        "--n-option-color-active": Je,
        "--n-option-color-active-pending": W,
        "--n-option-height": ye,
        "--n-option-opacity-disabled": $e,
        "--n-option-text-color": se,
        "--n-option-text-color-active": ve,
        "--n-option-text-color-disabled": Pe,
        "--n-option-text-color-pressed": q,
        "--n-option-padding": he,
        "--n-option-padding-left": Gt(he, "left"),
        "--n-option-padding-right": Gt(he, "right"),
        "--n-loading-color": F,
        "--n-loading-size": _
      };
    }), {
      inlineThemeDisabled: te
    } = e, J = te ? yt("internal-select-menu", Xn(() => e.size[0]), Y, e) : void 0, X = {
      selfRef: i,
      next: P,
      prev: z,
      getPendingTmNode: S
    };
    return Kp(i, e.onResize), Object.assign({
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
      handleFocusin: U,
      handleFocusout: L,
      handleKeyUp: $,
      handleKeyDown: T,
      handleMouseDown: H,
      handleVirtualListResize: C,
      handleVirtualListScroll: y,
      cssVars: te ? void 0 : Y,
      themeClass: J == null ? void 0 : J.themeClass,
      onRender: J == null ? void 0 : J.onRender
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
    }, dt(e.header, (l) => l && Bt("div", {
      class: `${n}-base-select-menu__header`,
      "data-header": !0,
      key: "header"
    }, l)), this.loading ? Bt("div", {
      class: `${n}-base-select-menu__loading`
    }, Bt(bi, {
      clsPrefix: n,
      strokeWidth: 20
    })) : this.empty ? Bt("div", {
      class: `${n}-base-select-menu__empty`,
      "data-empty": !0
    }, vn(e.empty, () => [Bt(Av, {
      theme: o.peers.Empty,
      themeOverrides: o.peerOverrides.Empty,
      size: this.size
    })])) : Bt(br, {
      ref: "scrollbarRef",
      theme: o.peers.Scrollbar,
      themeOverrides: o.peerOverrides.Scrollbar,
      scrollable: this.scrollable,
      container: t ? this.virtualListContainer : void 0,
      content: t ? this.virtualListContent : void 0,
      onScroll: t ? void 0 : this.doScroll
    }, {
      default: () => t ? Bt(Rd, {
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
        }) => l.isGroup ? Bt(ff, {
          key: l.key,
          clsPrefix: n,
          tmNode: l
        }) : l.ignored ? null : Bt(hf, {
          clsPrefix: n,
          key: l.key,
          tmNode: l
        })
      }) : Bt("div", {
        class: `${n}-base-select-menu-option-wrapper`,
        style: {
          paddingTop: this.padding.top,
          paddingBottom: this.padding.bottom
        }
      }, this.flattenedNodes.map((l) => l.isGroup ? Bt(ff, {
        key: l.key,
        clsPrefix: n,
        tmNode: l
      }) : Bt(hf, {
        clsPrefix: n,
        key: l.key,
        tmNode: l
      })))
    }), dt(e.action, (l) => l && [Bt("div", {
      class: `${n}-base-select-menu__action`,
      "data-action": !0,
      key: "action"
    }, l), Bt(a2, {
      onFocus: this.onTabOut,
      key: "focus-detector"
    })]));
  }
}), fP = {
  space: "6px",
  spaceArrow: "10px",
  arrowOffset: "10px",
  arrowOffsetVertical: "10px",
  arrowHeight: "6px",
  padding: "8px 14px"
};
function hP(e) {
  const {
    boxShadow2: t,
    popoverColor: n,
    textColor2: o,
    borderRadius: r,
    fontSize: i,
    dividerColor: l
  } = e;
  return Object.assign(Object.assign({}, fP), {
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
    Scrollbar: gr
  },
  self: hP
}, Bl = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
}, xt = "var(--n-arrow-height) * 1.414", pP = D([I("popover", `
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `, [D(">", [I("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), ot("raw", `
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `, [ot("scrollable", [ot("show-header-or-footer", "padding: var(--n-padding);")])]), N("header", `
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), N("footer", `
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `), K("scrollable, show-header-or-footer", [N("content", `
 padding: var(--n-padding);
 `)])]), I("popover-shared", `
 transform-origin: inherit;
 `, [
  I("popover-arrow-wrapper", `
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `, [I("popover-arrow", `
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${xt});
 height: calc(${xt});
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
]), tn("top-start", `
 top: calc(${xt} / -2);
 left: calc(${Vn("top-start")} - var(--v-offset-left));
 `), tn("top", `
 top: calc(${xt} / -2);
 transform: translateX(calc(${xt} / -2)) rotate(45deg);
 left: 50%;
 `), tn("top-end", `
 top: calc(${xt} / -2);
 right: calc(${Vn("top-end")} + var(--v-offset-left));
 `), tn("bottom-start", `
 bottom: calc(${xt} / -2);
 left: calc(${Vn("bottom-start")} - var(--v-offset-left));
 `), tn("bottom", `
 bottom: calc(${xt} / -2);
 transform: translateX(calc(${xt} / -2)) rotate(45deg);
 left: 50%;
 `), tn("bottom-end", `
 bottom: calc(${xt} / -2);
 right: calc(${Vn("bottom-end")} + var(--v-offset-left));
 `), tn("left-start", `
 left: calc(${xt} / -2);
 top: calc(${Vn("left-start")} - var(--v-offset-top));
 `), tn("left", `
 left: calc(${xt} / -2);
 transform: translateY(calc(${xt} / -2)) rotate(45deg);
 top: 50%;
 `), tn("left-end", `
 left: calc(${xt} / -2);
 bottom: calc(${Vn("left-end")} + var(--v-offset-top));
 `), tn("right-start", `
 right: calc(${xt} / -2);
 top: calc(${Vn("right-start")} - var(--v-offset-top));
 `), tn("right", `
 right: calc(${xt} / -2);
 transform: translateY(calc(${xt} / -2)) rotate(45deg);
 top: 50%;
 `), tn("right-end", `
 right: calc(${xt} / -2);
 bottom: calc(${Vn("right-end")} + var(--v-offset-top));
 `), ...QR({
  top: ["right-start", "left-start"],
  right: ["top-end", "bottom-end"],
  bottom: ["right-end", "left-end"],
  left: ["top-start", "bottom-start"]
}, (e, t) => {
  const n = ["right", "left"].includes(t), o = n ? "width" : "height";
  return e.map((r) => {
    const i = r.split("-")[1] === "end", a = `calc((${`var(--v-target-${o}, 0px)`} - ${xt}) / 2)`, s = Vn(r);
    return D(`[v-placement="${r}"] >`, [I("popover-shared", [K("center-arrow", [I("popover-arrow", `${t}: calc(max(${a}, ${s}) ${i ? "+" : "-"} var(--v-offset-${n ? "left" : "top"}));`)])])]);
  });
})]);
function Vn(e) {
  return ["top", "bottom"].includes(e.split("-")[0]) ? "var(--n-arrow-offset)" : "var(--n-arrow-offset-vertical)";
}
function tn(e, t) {
  const n = e.split("-")[0], o = ["top", "bottom"].includes(n) ? "height: var(--n-space-arrow);" : "width: var(--n-space-arrow);";
  return D(`[v-placement="${e}"] >`, [I("popover-shared", `
 margin-${Bl[n]}: var(--n-space);
 `, [K("show-arrow", `
 margin-${Bl[n]}: var(--n-space-arrow);
 `), K("overlap", `
 margin: 0;
 `), vw("popover-arrow-wrapper", `
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${n}: 100%;
 ${Bl[n]}: auto;
 ${o}
 `, [I("popover-arrow", t)])])]);
}
const Ll = window.Vue.computed, vP = window.Vue.defineComponent, mP = window.Vue.Fragment, nn = window.Vue.h, gP = window.Vue.inject, bP = window.Vue.mergeProps, wP = window.Vue.onBeforeUnmount, Dl = window.Vue.provide, Zi = window.Vue.ref, yP = window.Vue.toRef, xP = window.Vue.Transition, CP = window.Vue.vShow, SP = window.Vue.watch, $P = window.Vue.watchEffect, RP = window.Vue.withDirectives, Bv = Object.assign(Object.assign({}, ke.props), {
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
function Lv({
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
const kP = vP({
  name: "PopoverBody",
  inheritAttrs: !1,
  props: Bv,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    const {
      namespaceRef: o,
      mergedClsPrefixRef: r,
      inlineThemeDisabled: i,
      mergedRtlRef: l
    } = qe(e), a = ke("Popover", "-popover", pP, wr, e, r), s = zt("Popover", l, r), d = Zi(null), c = gP("NPopover"), h = Zi(null), p = Zi(e.show), v = Zi(!1);
    $P(() => {
      const {
        show: $
      } = e;
      $ && !Ex() && !e.internalDeactivateImmediately && (v.value = !0);
    });
    const f = Ll(() => {
      const {
        trigger: $,
        onClickoutside: T
      } = e, H = [], {
        positionManuallyRef: {
          value: P
        }
      } = c;
      return P || ($ === "click" && !T && H.push([li, S, void 0, {
        capture: !0
      }]), $ === "hover" && H.push([ry, C])), T && H.push([li, S, void 0, {
        capture: !0
      }]), (e.displayDirective === "show" || e.animated && v.value) && H.push([CP, e.show]), H;
    }), m = Ll(() => {
      const {
        common: {
          cubicBezierEaseInOut: $,
          cubicBezierEaseIn: T,
          cubicBezierEaseOut: H
        },
        self: {
          space: P,
          spaceArrow: z,
          padding: M,
          fontSize: O,
          textColor: U,
          dividerColor: L,
          color: Y,
          boxShadow: te,
          borderRadius: J,
          arrowHeight: X,
          arrowOffset: A,
          arrowOffsetVertical: G
        }
      } = a.value;
      return {
        "--n-box-shadow": te,
        "--n-bezier": $,
        "--n-bezier-ease-in": T,
        "--n-bezier-ease-out": H,
        "--n-font-size": O,
        "--n-text-color": U,
        "--n-color": Y,
        "--n-divider-color": L,
        "--n-border-radius": J,
        "--n-arrow-height": X,
        "--n-arrow-offset": A,
        "--n-arrow-offset-vertical": G,
        "--n-padding": M,
        "--n-space": P,
        "--n-space-arrow": z
      };
    }), g = Ll(() => {
      const $ = e.width === "trigger" ? void 0 : Ct(e.width), T = [];
      $ && T.push({
        width: $
      });
      const {
        maxWidth: H,
        minWidth: P
      } = e;
      return H && T.push({
        maxWidth: Ct(H)
      }), P && T.push({
        maxWidth: Ct(P)
      }), i || T.push(m.value), T;
    }), u = i ? yt("popover", void 0, m, e) : void 0;
    c.setBodyInstance({
      syncPosition: w
    }), wP(() => {
      c.setBodyInstance(null);
    }), SP(yP(e, "show"), ($) => {
      e.animated || ($ ? p.value = !0 : p.value = !1);
    });
    function w() {
      var $;
      ($ = d.value) === null || $ === void 0 || $.syncPosition();
    }
    function x($) {
      e.trigger === "hover" && e.keepAliveOnHover && e.show && c.handleMouseEnter($);
    }
    function y($) {
      e.trigger === "hover" && e.keepAliveOnHover && c.handleMouseLeave($);
    }
    function C($) {
      e.trigger === "hover" && !b().contains(ur($)) && c.handleMouseMoveOutside($);
    }
    function S($) {
      (e.trigger === "click" && !b().contains(ur($)) || e.onClickoutside) && c.handleClickOutside($);
    }
    function b() {
      return c.getTriggerElement();
    }
    Dl(pi, h), Dl(Ua, null), Dl(Ka, null);
    function R() {
      if (u == null || u.onRender(), !(e.displayDirective === "show" || e.show || e.animated && v.value))
        return null;
      let T;
      const H = c.internalRenderBodyRef.value, {
        value: P
      } = r;
      if (H)
        T = H(
          // The popover class and overlap class must exists, they will be used
          // to place the body & transition animation.
          // Shadow class exists for reuse box-shadow.
          [`${P}-popover-shared`, (s == null ? void 0 : s.value) && `${P}-popover--rtl`, u == null ? void 0 : u.themeClass.value, e.overlap && `${P}-popover-shared--overlap`, e.showArrow && `${P}-popover-shared--show-arrow`, e.arrowPointToCenter && `${P}-popover-shared--center-arrow`],
          h,
          g.value,
          x,
          y
        );
      else {
        const {
          value: z
        } = c.extraClassRef, {
          internalTrapFocus: M
        } = e, O = !Bs(t.header) || !Bs(t.footer), U = () => {
          var L, Y;
          const te = O ? nn(mP, null, dt(t.header, (A) => A ? nn("div", {
            class: [`${P}-popover__header`, e.headerClass],
            style: e.headerStyle
          }, A) : null), dt(t.default, (A) => A ? nn("div", {
            class: [`${P}-popover__content`, e.contentClass],
            style: e.contentStyle
          }, t) : null), dt(t.footer, (A) => A ? nn("div", {
            class: [`${P}-popover__footer`, e.footerClass],
            style: e.footerStyle
          }, A) : null)) : e.scrollable ? (L = t.default) === null || L === void 0 ? void 0 : L.call(t) : nn("div", {
            class: [`${P}-popover__content`, e.contentClass],
            style: e.contentStyle
          }, t), J = e.scrollable ? nn(zv, {
            themeOverrides: a.value.peerOverrides.Scrollbar,
            theme: a.value.peers.Scrollbar,
            contentClass: O ? void 0 : `${P}-popover__content ${(Y = e.contentClass) !== null && Y !== void 0 ? Y : ""}`,
            contentStyle: O ? void 0 : e.contentStyle
          }, {
            default: () => te
          }) : te, X = e.showArrow ? Lv({
            arrowClass: e.arrowClass,
            arrowStyle: e.arrowStyle,
            arrowWrapperClass: e.arrowWrapperClass,
            arrowWrapperStyle: e.arrowWrapperStyle,
            clsPrefix: P
          }) : null;
          return [J, X];
        };
        T = nn("div", bP({
          class: [`${P}-popover`, `${P}-popover-shared`, (s == null ? void 0 : s.value) && `${P}-popover--rtl`, u == null ? void 0 : u.themeClass.value, z.map((L) => `${P}-${L}`), {
            [`${P}-popover--scrollable`]: e.scrollable,
            [`${P}-popover--show-header-or-footer`]: O,
            [`${P}-popover--raw`]: e.raw,
            [`${P}-popover-shared--overlap`]: e.overlap,
            [`${P}-popover-shared--show-arrow`]: e.showArrow,
            [`${P}-popover-shared--center-arrow`]: e.arrowPointToCenter
          }],
          ref: h,
          style: g.value,
          onKeydown: c.handleKeydown,
          onMouseenter: x,
          onMouseleave: y
        }, n), M ? nn(Up, {
          active: e.show,
          autoFocus: !0
        }, {
          default: U
        }) : U());
      }
      return RP(T, f.value);
    }
    return {
      displayed: v,
      namespace: o,
      isMounted: c.isMountedRef,
      zIndex: c.zIndexRef,
      followerRef: d,
      adjustedTo: Pn(e),
      followerEnabled: p,
      renderContentNode: R
    };
  },
  render() {
    return nn(Sd, {
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
      default: () => this.animated ? nn(xP, {
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
}), PP = window.Vue.cloneVNode, bf = window.Vue.computed, _P = window.Vue.defineComponent, Ar = window.Vue.h, TP = window.Vue.provide, Ji = window.Vue.ref, FP = window.Vue.Text, Nl = window.Vue.toRef, EP = window.Vue.watchEffect, OP = window.Vue.withDirectives, zP = Object.keys(Bv), MP = {
  focus: ["onFocus", "onBlur"],
  click: ["onClick"],
  hover: ["onMouseenter", "onMouseleave"],
  manual: [],
  nested: ["onFocus", "onBlur", "onMouseenter", "onMouseleave", "onClick"]
};
function IP(e, t, n) {
  MP[t].forEach((o) => {
    e.props ? e.props = Object.assign({}, e.props) : e.props = {};
    const r = e.props[o], i = n[o];
    r ? e.props[o] = (...l) => {
      r(...l), i(...l);
    } : e.props[o] = i;
  });
}
const hr = {
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
}, AP = Object.assign(Object.assign(Object.assign({}, ke.props), hr), {
  internalOnAfterLeave: Function,
  internalRenderBody: Function
}), yi = _P({
  name: "Popover",
  inheritAttrs: !1,
  props: AP,
  slots: Object,
  __popover__: !0,
  setup(e) {
    const t = hi(), n = Ji(null), o = bf(() => e.show), r = Ji(e.defaultShow), i = Xt(o, r), l = Le(() => e.disabled ? !1 : i.value), a = () => {
      if (e.disabled) return !0;
      const {
        getDisabled: O
      } = e;
      return !!(O != null && O());
    }, s = () => a() ? !1 : i.value, d = kp(e, ["arrow", "showArrow"]), c = bf(() => e.overlap ? !1 : d.value);
    let h = null;
    const p = Ji(null), v = Ji(null), f = Le(() => e.x !== void 0 && e.y !== void 0);
    function m(O) {
      const {
        "onUpdate:show": U,
        onUpdateShow: L,
        onShow: Y,
        onHide: te
      } = e;
      r.value = O, U && re(U, O), L && re(L, O), O && Y && re(Y, !0), O && te && re(te, !1);
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
    function x() {
      const O = a();
      if (e.trigger === "focus" && !O) {
        if (s()) return;
        m(!0);
      }
    }
    function y() {
      const O = a();
      if (e.trigger === "focus" && !O) {
        if (!s()) return;
        m(!1);
      }
    }
    function C() {
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
    function b() {
      S();
    }
    function R(O) {
      var U;
      s() && (e.trigger === "click" && (u(), w(), m(!1)), (U = e.onClickoutside) === null || U === void 0 || U.call(e, O));
    }
    function $() {
      if (e.trigger === "click" && !a()) {
        u(), w();
        const O = !s();
        m(O);
      }
    }
    function T(O) {
      e.internalTrapFocus && O.key === "Escape" && (u(), w(), m(!1));
    }
    function H(O) {
      r.value = O;
    }
    function P() {
      var O;
      return (O = n.value) === null || O === void 0 ? void 0 : O.targetRef;
    }
    function z(O) {
      h = O;
    }
    return TP("NPopover", {
      getTriggerElement: P,
      handleKeydown: T,
      handleMouseEnter: C,
      handleMouseLeave: S,
      handleClickOutside: R,
      handleMouseMoveOutside: b,
      setBodyInstance: z,
      positionManuallyRef: f,
      isMountedRef: t,
      zIndexRef: Nl(e, "zIndex"),
      extraClassRef: Nl(e, "internalExtraClass"),
      internalRenderBodyRef: Nl(e, "internalRenderBody")
    }), EP(() => {
      i.value && a() && m(!1);
    }), {
      binderInstRef: n,
      positionManually: f,
      mergedShowConsideringDisabledProp: l,
      // if to show popover body
      uncontrolledShow: r,
      mergedShowArrow: c,
      getMergedShow: s,
      setShow: H,
      handleClick: $,
      handleMouseEnter: C,
      handleMouseLeave: S,
      handleFocus: x,
      handleBlur: y,
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
    if (!t && (o = Lx(n, "trigger"), o)) {
      o = PP(o), o = o.type === FP ? Ar("span", [o]) : o;
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
        IP(o, l ? "nested" : t ? "manual" : this.trigger, s);
      }
    }
    return Ar(wd, {
      ref: "binderInstRef",
      syncTarget: !r,
      syncTargetWithParent: this.internalSyncTargetWithParent
    }, {
      default: () => {
        this.mergedShowConsideringDisabledProp;
        const i = this.getMergedShow();
        return [this.internalTrapFocus && i ? OP(Ar("div", {
          style: {
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }), [[xd, {
          enabled: i,
          zIndex: this.zIndex
        }]]) : null, t ? null : Ar(yd, null, {
          default: () => o
        }), Ar(kP, ao(this.$props, zP, Object.assign(Object.assign({}, this.$attrs), {
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
}), VP = {
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
function BP(e) {
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
    fontSizeSmall: x,
    fontSizeMedium: y,
    heightMini: C,
    heightTiny: S,
    heightSmall: b,
    heightMedium: R,
    closeColorHover: $,
    closeColorPressed: T,
    buttonColor2Hover: H,
    buttonColor2Pressed: P,
    fontWeightStrong: z
  } = e;
  return Object.assign(Object.assign({}, VP), {
    closeBorderRadius: g,
    heightTiny: C,
    heightSmall: S,
    heightMedium: b,
    heightLarge: R,
    borderRadius: g,
    opacityDisabled: h,
    fontSizeTiny: u,
    fontSizeSmall: w,
    fontSizeMedium: x,
    fontSizeLarge: y,
    fontWeightStrong: z,
    // checked
    textColorCheckable: t,
    textColorHoverCheckable: t,
    textColorPressedCheckable: t,
    textColorChecked: d,
    colorCheckable: "#0000",
    colorHoverCheckable: H,
    colorPressedCheckable: P,
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
    closeColorHover: $,
    closeColorPressed: T,
    borderPrimary: `1px solid ${Te(r, {
      alpha: 0.3
    })}`,
    textColorPrimary: r,
    colorPrimary: Te(r, {
      alpha: 0.12
    }),
    colorBorderedPrimary: Te(r, {
      alpha: 0.1
    }),
    closeIconColorPrimary: r,
    closeIconColorHoverPrimary: r,
    closeIconColorPressedPrimary: r,
    closeColorHoverPrimary: Te(r, {
      alpha: 0.12
    }),
    closeColorPressedPrimary: Te(r, {
      alpha: 0.18
    }),
    borderInfo: `1px solid ${Te(i, {
      alpha: 0.3
    })}`,
    textColorInfo: i,
    colorInfo: Te(i, {
      alpha: 0.12
    }),
    colorBorderedInfo: Te(i, {
      alpha: 0.1
    }),
    closeIconColorInfo: i,
    closeIconColorHoverInfo: i,
    closeIconColorPressedInfo: i,
    closeColorHoverInfo: Te(i, {
      alpha: 0.12
    }),
    closeColorPressedInfo: Te(i, {
      alpha: 0.18
    }),
    borderSuccess: `1px solid ${Te(l, {
      alpha: 0.3
    })}`,
    textColorSuccess: l,
    colorSuccess: Te(l, {
      alpha: 0.12
    }),
    colorBorderedSuccess: Te(l, {
      alpha: 0.1
    }),
    closeIconColorSuccess: l,
    closeIconColorHoverSuccess: l,
    closeIconColorPressedSuccess: l,
    closeColorHoverSuccess: Te(l, {
      alpha: 0.12
    }),
    closeColorPressedSuccess: Te(l, {
      alpha: 0.18
    }),
    borderWarning: `1px solid ${Te(a, {
      alpha: 0.35
    })}`,
    textColorWarning: a,
    colorWarning: Te(a, {
      alpha: 0.15
    }),
    colorBorderedWarning: Te(a, {
      alpha: 0.12
    }),
    closeIconColorWarning: a,
    closeIconColorHoverWarning: a,
    closeIconColorPressedWarning: a,
    closeColorHoverWarning: Te(a, {
      alpha: 0.12
    }),
    closeColorPressedWarning: Te(a, {
      alpha: 0.18
    }),
    borderError: `1px solid ${Te(s, {
      alpha: 0.23
    })}`,
    textColorError: s,
    colorError: Te(s, {
      alpha: 0.1
    }),
    colorBorderedError: Te(s, {
      alpha: 0.08
    }),
    closeIconColorError: s,
    closeIconColorHoverError: s,
    closeIconColorPressedError: s,
    closeColorHoverError: Te(s, {
      alpha: 0.12
    }),
    closeColorPressedError: Te(s, {
      alpha: 0.18
    })
  });
}
const LP = {
  common: mt,
  self: BP
}, DP = {
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
}, NP = I("tag", `
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
 `), N("border", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-border);
 transition: border-color .3s var(--n-bezier);
 `), N("icon", `
 display: flex;
 margin: 0 4px 0 0;
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 font-size: var(--n-avatar-size-override);
 `), N("avatar", `
 display: flex;
 margin: 0 6px 0 0;
 `), N("close", `
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `), K("round", `
 padding: 0 calc(var(--n-height) / 3);
 border-radius: calc(var(--n-height) / 2);
 `, [N("icon", `
 margin: 0 4px 0 calc((var(--n-height) - 8px) / -2);
 `), N("avatar", `
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
 `, [ot("disabled", [D("&:hover", "background-color: var(--n-color-hover-checkable);", [ot("checked", "color: var(--n-text-color-hover-checkable);")]), D("&:active", "background-color: var(--n-color-pressed-checkable);", [ot("checked", "color: var(--n-text-color-pressed-checkable);")])]), K("checked", `
 color: var(--n-text-color-checked);
 background-color: var(--n-color-checked);
 `, [ot("disabled", [D("&:hover", "background-color: var(--n-color-checked-hover);"), D("&:active", "background-color: var(--n-color-checked-pressed);")])])])]), wf = window.Vue.computed, HP = window.Vue.defineComponent, Xo = window.Vue.h, jP = window.Vue.provide, WP = window.Vue.ref, UP = window.Vue.toRef;
window.Vue.watchEffect;
const KP = Object.assign(Object.assign(Object.assign({}, ke.props), DP), {
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
}), qP = "n-tag", Hl = HP({
  name: "Tag",
  props: KP,
  slots: Object,
  setup(e) {
    const t = WP(null), {
      mergedBorderedRef: n,
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = qe(e), l = ke("Tag", "-tag", NP, LP, e, o);
    jP(qP, {
      roundRef: UP(e, "round")
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
        f && re(f, v);
      }
    }
    const d = {
      setTextContent(v) {
        const {
          value: f
        } = t;
        f && (f.textContent = v);
      }
    }, c = zt("Tag", i, o), h = wf(() => {
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
          closeMargin: x,
          borderRadius: y,
          opacityDisabled: C,
          textColorCheckable: S,
          textColorHoverCheckable: b,
          textColorPressedCheckable: R,
          textColorChecked: $,
          colorCheckable: T,
          colorHoverCheckable: H,
          colorPressedCheckable: P,
          colorChecked: z,
          colorCheckedHover: M,
          colorCheckedPressed: O,
          closeBorderRadius: U,
          fontWeightStrong: L,
          [oe("colorBordered", v)]: Y,
          [oe("closeSize", f)]: te,
          [oe("closeIconSize", f)]: J,
          [oe("fontSize", f)]: X,
          [oe("height", f)]: A,
          [oe("color", v)]: G,
          [oe("textColor", v)]: Z,
          [oe("border", v)]: ie,
          [oe("closeIconColor", v)]: ae,
          [oe("closeIconColorHover", v)]: ue,
          [oe("closeIconColorPressed", v)]: be,
          [oe("closeColorHover", v)]: q,
          [oe("closeColorPressed", v)]: se
        }
      } = l.value, Pe = Gt(x);
      return {
        "--n-font-weight-strong": L,
        "--n-avatar-size-override": `calc(${A} - 8px)`,
        "--n-bezier": u,
        "--n-border-radius": y,
        "--n-border": ie,
        "--n-close-icon-size": J,
        "--n-close-color-pressed": se,
        "--n-close-color-hover": q,
        "--n-close-border-radius": U,
        "--n-close-icon-color": ae,
        "--n-close-icon-color-hover": ue,
        "--n-close-icon-color-pressed": be,
        "--n-close-icon-color-disabled": ae,
        "--n-close-margin-top": Pe.top,
        "--n-close-margin-right": Pe.right,
        "--n-close-margin-bottom": Pe.bottom,
        "--n-close-margin-left": Pe.left,
        "--n-close-size": te,
        "--n-color": m || (n.value ? Y : G),
        "--n-color-checkable": T,
        "--n-color-checked": z,
        "--n-color-checked-hover": M,
        "--n-color-checked-pressed": O,
        "--n-color-hover-checkable": H,
        "--n-color-pressed-checkable": P,
        "--n-font-size": X,
        "--n-height": A,
        "--n-opacity-disabled": C,
        "--n-padding": w,
        "--n-text-color": g || Z,
        "--n-text-color-checkable": S,
        "--n-text-color-checked": $,
        "--n-text-color-hover-checkable": b,
        "--n-text-color-pressed-checkable": R
      };
    }), p = r ? yt("tag", wf(() => {
      let v = "";
      const {
        type: f,
        size: m,
        color: {
          color: g,
          textColor: u
        } = {}
      } = e;
      return v += f[0], v += m[0], g && (v += `a${Fa(g)}`), u && (v += `b${Fa(u)}`), n.value && (v += "c"), v;
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
    const d = dt(s.avatar, (h) => h && Xo("div", {
      class: `${n}-tag__avatar`
    }, h)), c = dt(s.icon, (h) => h && Xo("div", {
      class: `${n}-tag__icon`
    }, h));
    return Xo("div", {
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
    }, c || d, Xo("span", {
      class: `${n}-tag__content`,
      ref: "contentRef"
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e)), !this.checkable && r ? Xo(Ld, {
      clsPrefix: n,
      class: `${n}-tag__close`,
      disabled: this.disabled,
      onClick: this.handleCloseClick,
      focusable: this.internalCloseFocusable,
      round: l,
      isButtonTag: this.internalCloseIsButtonTag,
      absolute: !0
    }) : null, !this.checkable && this.mergedBordered ? Xo("div", {
      class: `${n}-tag__border`,
      style: {
        borderColor: i
      }
    }) : null);
  }
}), GP = window.Vue.defineComponent, Qi = window.Vue.h, Dv = GP({
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
      return Qi(bi, {
        clsPrefix: n,
        class: `${n}-base-suffix`,
        strokeWidth: 24,
        scale: 0.85,
        show: e.loading
      }, {
        default: () => e.showArrow ? Qi(Xs, {
          clsPrefix: n,
          show: e.showClear,
          onClear: e.onClear
        }, {
          placeholder: () => Qi($t, {
            clsPrefix: n,
            class: `${n}-base-suffix__arrow`
          }, {
            default: () => vn(t.default, () => [Qi(Tv, null)])
          })
        }) : null
      });
    };
  }
}), XP = {
  paddingSingle: "0 26px 0 12px",
  paddingMultiple: "3px 26px 0 12px",
  clearSize: "16px",
  arrowSize: "16px"
};
function YP(e) {
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
    placeholderColorDisabled: x,
    fontSizeTiny: y,
    fontSizeSmall: C,
    fontSizeMedium: S,
    fontSizeLarge: b,
    heightTiny: R,
    heightSmall: $,
    heightMedium: T,
    heightLarge: H,
    fontWeight: P
  } = e;
  return Object.assign(Object.assign({}, XP), {
    fontSizeTiny: y,
    fontSizeSmall: C,
    fontSizeMedium: S,
    fontSizeLarge: b,
    heightTiny: R,
    heightSmall: $,
    heightMedium: T,
    heightLarge: H,
    borderRadius: t,
    fontWeight: P,
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
    boxShadowActive: `0 0 0 2px ${Te(l, {
      alpha: 0.2
    })}`,
    boxShadowFocus: `0 0 0 2px ${Te(l, {
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
    boxShadowActiveWarning: `0 0 0 2px ${Te(s, {
      alpha: 0.2
    })}`,
    boxShadowFocusWarning: `0 0 0 2px ${Te(s, {
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
    boxShadowActiveError: `0 0 0 2px ${Te(c, {
      alpha: 0.2
    })}`,
    boxShadowFocusError: `0 0 0 2px ${Te(c, {
      alpha: 0.2
    })}`,
    colorActiveError: r,
    caretColorError: c,
    clearColor: m,
    clearColorHover: g,
    clearColorPressed: u
  });
}
const Nv = {
  name: "InternalSelection",
  common: mt,
  peers: {
    Popover: wr
  },
  self: YP
}, ZP = D([I("base-selection", `
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
 `, [I("base-loading", `
 color: var(--n-loading-color);
 `), I("base-selection-tags", "min-height: var(--n-height);"), N("border, state-border", `
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
 `), N("state-border", `
 z-index: 1;
 border-color: #0000;
 `), I("base-suffix", `
 cursor: pointer;
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 right: 10px;
 `, [N("arrow", `
 font-size: var(--n-arrow-size);
 color: var(--n-arrow-color);
 transition: color .3s var(--n-bezier);
 `)]), I("base-selection-overlay", `
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
 `, [N("wrapper", `
 flex-basis: 0;
 flex-grow: 1;
 overflow: hidden;
 text-overflow: ellipsis;
 `)]), I("base-selection-placeholder", `
 color: var(--n-placeholder-color);
 `, [N("inner", `
 max-width: 100%;
 overflow: hidden;
 `)]), I("base-selection-tags", `
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
 `), I("base-selection-label", `
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
 `, [I("base-selection-input", `
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
 `, [N("content", `
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap; 
 `)]), N("render-label", `
 color: var(--n-text-color);
 `)]), ot("disabled", [D("&:hover", [N("state-border", `
 box-shadow: var(--n-box-shadow-hover);
 border: var(--n-border-hover);
 `)]), K("focus", [N("state-border", `
 box-shadow: var(--n-box-shadow-focus);
 border: var(--n-border-focus);
 `)]), K("active", [N("state-border", `
 box-shadow: var(--n-box-shadow-active);
 border: var(--n-border-active);
 `), I("base-selection-label", "background-color: var(--n-color-active);"), I("base-selection-tags", "background-color: var(--n-color-active);")])]), K("disabled", "cursor: not-allowed;", [N("arrow", `
 color: var(--n-arrow-color-disabled);
 `), I("base-selection-label", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [I("base-selection-input", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 `), N("render-label", `
 color: var(--n-text-color-disabled);
 `)]), I("base-selection-tags", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `), I("base-selection-placeholder", `
 cursor: not-allowed;
 color: var(--n-placeholder-color-disabled);
 `)]), I("base-selection-input-tag", `
 height: calc(var(--n-height) - 6px);
 line-height: calc(var(--n-height) - 6px);
 outline: none;
 display: none;
 position: relative;
 margin-bottom: 3px;
 max-width: 100%;
 vertical-align: bottom;
 `, [N("input", `
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
 `), N("mirror", `
 position: absolute;
 left: 0;
 top: 0;
 white-space: pre;
 visibility: hidden;
 user-select: none;
 -webkit-user-select: none;
 opacity: 0;
 `)]), ["warning", "error"].map((e) => K(`${e}-status`, [N("state-border", `border: var(--n-border-${e});`), ot("disabled", [D("&:hover", [N("state-border", `
 box-shadow: var(--n-box-shadow-hover-${e});
 border: var(--n-border-hover-${e});
 `)]), K("active", [N("state-border", `
 box-shadow: var(--n-box-shadow-active-${e});
 border: var(--n-border-active-${e});
 `), I("base-selection-label", `background-color: var(--n-color-active-${e});`), I("base-selection-tags", `background-color: var(--n-color-active-${e});`)]), K("focus", [N("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))]), I("base-selection-popover", `
 margin-bottom: -3px;
 display: flex;
 flex-wrap: wrap;
 margin-right: -8px;
 `), I("base-selection-tag-wrapper", `
 max-width: 100%;
 display: inline-flex;
 padding: 0 7px 3px 0;
 `, [D("&:last-child", "padding-right: 0;"), I("tag", `
 font-size: 14px;
 max-width: 100%;
 `, [N("content", `
 line-height: 1.25;
 text-overflow: ellipsis;
 overflow: hidden;
 `)])])]), Yo = window.Vue.computed, JP = window.Vue.defineComponent, QP = window.Vue.Fragment, Ae = window.Vue.h, e_ = window.Vue.nextTick, t_ = window.Vue.onMounted, Ut = window.Vue.ref, jl = window.Vue.toRef, Wl = window.Vue.watch, n_ = window.Vue.watchEffect, o_ = JP({
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
    } = qe(e), o = zt("InternalSelection", n, t), r = Ut(null), i = Ut(null), l = Ut(null), a = Ut(null), s = Ut(null), d = Ut(null), c = Ut(null), h = Ut(null), p = Ut(null), v = Ut(null), f = Ut(!1), m = Ut(!1), g = Ut(!1), u = ke("InternalSelection", "-internal-selection", ZP, Nv, e, jl(e, "clsPrefix")), w = Yo(() => e.clearable && !e.disabled && (g.value || e.active)), x = Yo(() => e.selectedOption ? e.renderTag ? e.renderTag({
      option: e.selectedOption,
      handleClose: () => {
      }
    }) : e.renderLabel ? e.renderLabel(e.selectedOption, !0) : Ot(e.selectedOption[e.labelField], e.selectedOption, !0) : e.placeholder), y = Yo(() => {
      const E = e.selectedOption;
      if (E)
        return E[e.labelField];
    }), C = Yo(() => e.multiple ? !!(Array.isArray(e.selectedOptions) && e.selectedOptions.length) : e.selectedOption !== null);
    function S() {
      var E;
      const {
        value: j
      } = r;
      if (j) {
        const {
          value: fe
        } = i;
        fe && (fe.style.width = `${j.offsetWidth}px`, e.maxTagCount !== "responsive" && ((E = p.value) === null || E === void 0 || E.sync({
          showAllItemsBeforeCalculate: !1
        })));
      }
    }
    function b() {
      const {
        value: E
      } = v;
      E && (E.style.display = "none");
    }
    function R() {
      const {
        value: E
      } = v;
      E && (E.style.display = "inline-block");
    }
    Wl(jl(e, "active"), (E) => {
      E || b();
    }), Wl(jl(e, "pattern"), () => {
      e.multiple && e_(S);
    });
    function $(E) {
      const {
        onFocus: j
      } = e;
      j && j(E);
    }
    function T(E) {
      const {
        onBlur: j
      } = e;
      j && j(E);
    }
    function H(E) {
      const {
        onDeleteOption: j
      } = e;
      j && j(E);
    }
    function P(E) {
      const {
        onClear: j
      } = e;
      j && j(E);
    }
    function z(E) {
      const {
        onPatternInput: j
      } = e;
      j && j(E);
    }
    function M(E) {
      var j;
      (!E.relatedTarget || !(!((j = l.value) === null || j === void 0) && j.contains(E.relatedTarget))) && $(E);
    }
    function O(E) {
      var j;
      !((j = l.value) === null || j === void 0) && j.contains(E.relatedTarget) || T(E);
    }
    function U(E) {
      P(E);
    }
    function L() {
      g.value = !0;
    }
    function Y() {
      g.value = !1;
    }
    function te(E) {
      !e.active || !e.filterable || E.target !== i.value && E.preventDefault();
    }
    function J(E) {
      H(E);
    }
    const X = Ut(!1);
    function A(E) {
      if (E.key === "Backspace" && !X.value && !e.pattern.length) {
        const {
          selectedOptions: j
        } = e;
        j != null && j.length && J(j[j.length - 1]);
      }
    }
    let G = null;
    function Z(E) {
      const {
        value: j
      } = r;
      if (j) {
        const fe = E.target.value;
        j.textContent = fe, S();
      }
      e.ignoreComposition && X.value ? G = E : z(E);
    }
    function ie() {
      X.value = !0;
    }
    function ae() {
      X.value = !1, e.ignoreComposition && z(G), G = null;
    }
    function ue(E) {
      var j;
      m.value = !0, (j = e.onPatternFocus) === null || j === void 0 || j.call(e, E);
    }
    function be(E) {
      var j;
      m.value = !1, (j = e.onPatternBlur) === null || j === void 0 || j.call(e, E);
    }
    function q() {
      var E, j;
      if (e.filterable)
        m.value = !1, (E = d.value) === null || E === void 0 || E.blur(), (j = i.value) === null || j === void 0 || j.blur();
      else if (e.multiple) {
        const {
          value: fe
        } = a;
        fe == null || fe.blur();
      } else {
        const {
          value: fe
        } = s;
        fe == null || fe.blur();
      }
    }
    function se() {
      var E, j, fe;
      e.filterable ? (m.value = !1, (E = d.value) === null || E === void 0 || E.focus()) : e.multiple ? (j = a.value) === null || j === void 0 || j.focus() : (fe = s.value) === null || fe === void 0 || fe.focus();
    }
    function Pe() {
      const {
        value: E
      } = i;
      E && (R(), E.focus());
    }
    function ve() {
      const {
        value: E
      } = i;
      E && E.blur();
    }
    function $e(E) {
      const {
        value: j
      } = c;
      j && j.setTextContent(`+${E}`);
    }
    function Se() {
      const {
        value: E
      } = h;
      return E;
    }
    function De() {
      return i.value;
    }
    let Ie = null;
    function Je() {
      Ie !== null && window.clearTimeout(Ie);
    }
    function F() {
      e.active || (Je(), Ie = window.setTimeout(() => {
        C.value && (f.value = !0);
      }, 100));
    }
    function _() {
      Je();
    }
    function W(E) {
      E || (Je(), f.value = !1);
    }
    Wl(C, (E) => {
      E || (f.value = !1);
    }), t_(() => {
      n_(() => {
        const E = d.value;
        E && (e.disabled ? E.removeAttribute("tabindex") : E.tabIndex = m.value ? -1 : 0);
      });
    }), Kp(l, e.onResize);
    const {
      inlineThemeDisabled: ne
    } = e, ye = Yo(() => {
      const {
        size: E
      } = e, {
        common: {
          cubicBezierEaseInOut: j
        },
        self: {
          fontWeight: fe,
          borderRadius: _e,
          color: at,
          placeholderColor: vt,
          textColor: Ye,
          paddingSingle: Ze,
          paddingMultiple: gt,
          caretColor: Qe,
          colorDisabled: ce,
          textColorDisabled: Ce,
          placeholderColorDisabled: k,
          colorActive: B,
          boxShadowFocus: Q,
          boxShadowActive: le,
          boxShadowHover: de,
          border: pe,
          borderFocus: me,
          borderHover: xe,
          borderActive: ze,
          arrowColor: nt,
          arrowColorDisabled: Ne,
          loadingColor: Pt,
          // form warning
          colorActiveWarning: Mt,
          boxShadowFocusWarning: It,
          boxShadowActiveWarning: Nt,
          boxShadowHoverWarning: Ht,
          borderWarning: Qt,
          borderFocusWarning: jt,
          borderHoverWarning: V,
          borderActiveWarning: ee,
          // form error
          colorActiveError: we,
          boxShadowFocusError: Ee,
          boxShadowActiveError: je,
          boxShadowHoverError: Me,
          borderError: rt,
          borderFocusError: ct,
          borderHoverError: Yt,
          borderActiveError: On,
          // clear
          clearColor: zn,
          clearColorHover: po,
          clearColorPressed: yr,
          clearSize: xr,
          // arrow
          arrowSize: Cr,
          [oe("height", E)]: Sr,
          [oe("fontSize", E)]: $r
        }
      } = u.value, Kn = Gt(Ze), qn = Gt(gt);
      return {
        "--n-bezier": j,
        "--n-border": pe,
        "--n-border-active": ze,
        "--n-border-focus": me,
        "--n-border-hover": xe,
        "--n-border-radius": _e,
        "--n-box-shadow-active": le,
        "--n-box-shadow-focus": Q,
        "--n-box-shadow-hover": de,
        "--n-caret-color": Qe,
        "--n-color": at,
        "--n-color-active": B,
        "--n-color-disabled": ce,
        "--n-font-size": $r,
        "--n-height": Sr,
        "--n-padding-single-top": Kn.top,
        "--n-padding-multiple-top": qn.top,
        "--n-padding-single-right": Kn.right,
        "--n-padding-multiple-right": qn.right,
        "--n-padding-single-left": Kn.left,
        "--n-padding-multiple-left": qn.left,
        "--n-padding-single-bottom": Kn.bottom,
        "--n-padding-multiple-bottom": qn.bottom,
        "--n-placeholder-color": vt,
        "--n-placeholder-color-disabled": k,
        "--n-text-color": Ye,
        "--n-text-color-disabled": Ce,
        "--n-arrow-color": nt,
        "--n-arrow-color-disabled": Ne,
        "--n-loading-color": Pt,
        // form warning
        "--n-color-active-warning": Mt,
        "--n-box-shadow-focus-warning": It,
        "--n-box-shadow-active-warning": Nt,
        "--n-box-shadow-hover-warning": Ht,
        "--n-border-warning": Qt,
        "--n-border-focus-warning": jt,
        "--n-border-hover-warning": V,
        "--n-border-active-warning": ee,
        // form error
        "--n-color-active-error": we,
        "--n-box-shadow-focus-error": Ee,
        "--n-box-shadow-active-error": je,
        "--n-box-shadow-hover-error": Me,
        "--n-border-error": rt,
        "--n-border-focus-error": ct,
        "--n-border-hover-error": Yt,
        "--n-border-active-error": On,
        // clear
        "--n-clear-size": xr,
        "--n-clear-color": zn,
        "--n-clear-color-hover": po,
        "--n-clear-color-pressed": yr,
        // arrow-size
        "--n-arrow-size": Cr,
        // font-weight
        "--n-font-weight": fe
      };
    }), he = ne ? yt("internal-selection", Yo(() => e.size[0]), ye, e) : void 0;
    return {
      mergedTheme: u,
      mergedClearable: w,
      mergedClsPrefix: t,
      rtlEnabled: o,
      patternInputFocused: m,
      filterablePlaceholder: x,
      label: y,
      selected: C,
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
      handleMouseDown: te,
      handleFocusin: M,
      handleClear: U,
      handleMouseEnter: L,
      handleMouseLeave: Y,
      handleDeleteOption: J,
      handlePatternKeyDown: A,
      handlePatternInputInput: Z,
      handlePatternInputBlur: be,
      handlePatternInputFocus: ue,
      handleMouseEnterCounter: F,
      handleMouseLeaveCounter: _,
      handleFocusout: O,
      handleCompositionEnd: ae,
      handleCompositionStart: ie,
      onPopoverUpdateShow: W,
      focus: se,
      focusInput: Pe,
      blur: q,
      blurInput: ve,
      updateCounter: $e,
      getCounter: Se,
      getTail: De,
      renderLabel: e.renderLabel,
      cssVars: ne ? void 0 : ye,
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
    const p = i === "responsive", v = typeof i == "number", f = p || v, m = Ae(Ls, null, {
      default: () => Ae(Dv, {
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
      } = this, w = (z) => Ae("div", {
        class: `${a}-base-selection-tag-wrapper`,
        key: z.value
      }, c ? c({
        option: z,
        handleClose: () => {
          this.handleDeleteOption(z);
        }
      }) : Ae(Hl, {
        size: n,
        closable: !z.disabled,
        disabled: o,
        onClose: () => {
          this.handleDeleteOption(z);
        },
        internalCloseIsButtonTag: !1,
        internalCloseFocusable: !1
      }, {
        default: () => h ? h(z, !0) : Ot(z[u], z, !0)
      })), x = () => (v ? this.selectedOptions.slice(0, i) : this.selectedOptions).map(w), y = r ? Ae("div", {
        class: `${a}-base-selection-input-tag`,
        ref: "inputTagElRef",
        key: "__input-tag__"
      }, Ae("input", Object.assign({}, this.inputProps, {
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
      })), Ae("span", {
        ref: "patternInputMirrorRef",
        class: `${a}-base-selection-input-tag__mirror`
      }, this.pattern)) : null, C = p ? () => Ae("div", {
        class: `${a}-base-selection-tag-wrapper`,
        ref: "counterWrapperRef"
      }, Ae(Hl, {
        size: n,
        ref: "counterRef",
        onMouseenter: this.handleMouseEnterCounter,
        onMouseleave: this.handleMouseLeaveCounter,
        disabled: o
      })) : void 0;
      let S;
      if (v) {
        const z = this.selectedOptions.length - i;
        z > 0 && (S = Ae("div", {
          class: `${a}-base-selection-tag-wrapper`,
          key: "__counter__"
        }, Ae(Hl, {
          size: n,
          ref: "counterRef",
          onMouseenter: this.handleMouseEnterCounter,
          disabled: o
        }, {
          default: () => `+${z}`
        })));
      }
      const b = p ? r ? Ae(mu, {
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
        tail: () => y
      }) : Ae(mu, {
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
      }) : v && S ? x().concat(S) : x(), R = f ? () => Ae("div", {
        class: `${a}-base-selection-popover`
      }, p ? x() : this.selectedOptions.map(w)) : void 0, $ = f ? Object.assign({
        show: this.showTagsPanel,
        trigger: "hover",
        overlap: !0,
        placement: "top",
        width: "trigger",
        onUpdateShow: this.onPopoverUpdateShow,
        theme: this.mergedTheme.peers.Popover,
        themeOverrides: this.mergedTheme.peerOverrides.Popover
      }, s) : null, H = (this.selected ? !1 : this.active ? !this.pattern && !this.isComposing : !0) ? Ae("div", {
        class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`
      }, Ae("div", {
        class: `${a}-base-selection-placeholder__inner`
      }, this.placeholder)) : null, P = r ? Ae("div", {
        ref: "patternInputWrapperRef",
        class: `${a}-base-selection-tags`
      }, b, p ? null : y, m) : Ae("div", {
        ref: "multipleElRef",
        class: `${a}-base-selection-tags`,
        tabindex: o ? void 0 : 0
      }, b, m);
      g = Ae(QP, null, f ? Ae(yi, Object.assign({}, $, {
        scrollable: !0,
        style: "max-height: calc(var(--v-target-height) * 6.6);"
      }), {
        trigger: () => P,
        default: R
      }) : P, H);
    } else if (r) {
      const u = this.pattern || this.isComposing, w = this.active ? !u : !this.selected, x = this.active ? !1 : this.selected;
      g = Ae("div", {
        ref: "patternInputWrapperRef",
        class: `${a}-base-selection-label`,
        title: this.patternInputFocused ? void 0 : yu(this.label)
      }, Ae("input", Object.assign({}, this.inputProps, {
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
      })), x ? Ae("div", {
        class: `${a}-base-selection-label__render-label ${a}-base-selection-overlay`,
        key: "input"
      }, Ae("div", {
        class: `${a}-base-selection-overlay__wrapper`
      }, c ? c({
        option: this.selectedOption,
        handleClose: () => {
        }
      }) : h ? h(this.selectedOption, !0) : Ot(this.label, this.selectedOption, !0))) : null, w ? Ae("div", {
        class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`,
        key: "placeholder"
      }, Ae("div", {
        class: `${a}-base-selection-overlay__wrapper`
      }, this.filterablePlaceholder)) : null, m);
    } else
      g = Ae("div", {
        ref: "singleElRef",
        class: `${a}-base-selection-label`,
        tabindex: this.disabled ? void 0 : 0
      }, this.label !== void 0 ? Ae("div", {
        class: `${a}-base-selection-input`,
        title: yu(this.label),
        key: "input"
      }, Ae("div", {
        class: `${a}-base-selection-input__content`
      }, c ? c({
        option: this.selectedOption,
        handleClose: () => {
        }
      }) : h ? h(this.selectedOption, !0) : Ot(this.label, this.selectedOption, !0))) : Ae("div", {
        class: `${a}-base-selection-placeholder ${a}-base-selection-overlay`,
        key: "placeholder"
      }, Ae("div", {
        class: `${a}-base-selection-placeholder__inner`
      }, this.placeholder)), m);
    return Ae("div", {
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
    }, g, l ? Ae("div", {
      class: `${a}-base-selection__border`
    }) : null, l ? Ae("div", {
      class: `${a}-base-selection__state-border`
    }) : null);
  }
}), {
  cubicBezierEaseInOut: Yn
} = Lo;
function r_({
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
 opacity ${e} ${Yn},
 max-width ${e} ${Yn} ${t},
 margin-left ${e} ${Yn} ${t},
 margin-right ${e} ${Yn} ${t};
 `), D("&.fade-in-width-expand-transition-enter-active", `
 overflow: hidden;
 transition:
 opacity ${e} ${Yn} ${t},
 max-width ${e} ${Yn},
 margin-left ${e} ${Yn},
 margin-right ${e} ${Yn};
 `)];
}
const i_ = I("base-wave", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
`), a_ = window.Vue.defineComponent, l_ = window.Vue.h, s_ = window.Vue.nextTick, d_ = window.Vue.onBeforeUnmount, yf = window.Vue.ref, c_ = window.Vue.toRef, u_ = a_({
  name: "BaseWave",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  setup(e) {
    Do("-base-wave", i_, c_(e, "clsPrefix"));
    const t = yf(null), n = yf(!1);
    let o = null;
    return d_(() => {
      o !== null && window.clearTimeout(o);
    }), {
      active: n,
      selfRef: t,
      play() {
        o !== null && (window.clearTimeout(o), n.value = !1, o = null), s_(() => {
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
    return l_("div", {
      ref: "selfRef",
      "aria-hidden": !0,
      class: [`${e}-base-wave`, this.active && `${e}-base-wave--active`]
    });
  }
}), f_ = zo && "chrome" in window;
zo && navigator.userAgent.includes("Firefox");
const Hv = zo && navigator.userAgent.includes("Safari") && !f_, h_ = {
  paddingTiny: "0 8px",
  paddingSmall: "0 10px",
  paddingMedium: "0 12px",
  paddingLarge: "0 14px",
  clearSize: "16px"
};
function p_(e) {
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
    heightTiny: x,
    heightSmall: y,
    heightMedium: C,
    heightLarge: S,
    actionColor: b,
    clearColor: R,
    clearColorHover: $,
    clearColorPressed: T,
    placeholderColor: H,
    placeholderColorDisabled: P,
    iconColor: z,
    iconColorDisabled: M,
    iconColorHover: O,
    iconColorPressed: U,
    fontWeight: L
  } = e;
  return Object.assign(Object.assign({}, h_), {
    fontWeight: L,
    countTextColorDisabled: o,
    countTextColor: n,
    heightTiny: x,
    heightSmall: y,
    heightMedium: C,
    heightLarge: S,
    fontSizeTiny: m,
    fontSizeSmall: g,
    fontSizeMedium: u,
    fontSizeLarge: w,
    lineHeight: f,
    lineHeightTextarea: f,
    borderRadius: v,
    iconSize: "16px",
    groupLabelColor: b,
    groupLabelTextColor: t,
    textColor: t,
    textColorDisabled: o,
    textDecorationColor: t,
    caretColor: r,
    placeholderColor: H,
    placeholderColorDisabled: P,
    color: l,
    colorDisabled: a,
    colorFocus: l,
    groupLabelBorder: `1px solid ${s}`,
    border: `1px solid ${s}`,
    borderHover: `1px solid ${i}`,
    borderDisabled: `1px solid ${s}`,
    borderFocus: `1px solid ${i}`,
    boxShadowFocus: `0 0 0 2px ${Te(r, {
      alpha: 0.2
    })}`,
    loadingColor: r,
    // warning
    loadingColorWarning: d,
    borderWarning: `1px solid ${d}`,
    borderHoverWarning: `1px solid ${c}`,
    colorFocusWarning: l,
    borderFocusWarning: `1px solid ${c}`,
    boxShadowFocusWarning: `0 0 0 2px ${Te(d, {
      alpha: 0.2
    })}`,
    caretColorWarning: d,
    // error
    loadingColorError: h,
    borderError: `1px solid ${h}`,
    borderHoverError: `1px solid ${p}`,
    colorFocusError: l,
    borderFocusError: `1px solid ${p}`,
    boxShadowFocusError: `0 0 0 2px ${Te(h, {
      alpha: 0.2
    })}`,
    caretColorError: h,
    clearColor: R,
    clearColorHover: $,
    clearColorPressed: T,
    iconColor: z,
    iconColorDisabled: M,
    iconColorHover: O,
    iconColorPressed: U,
    suffixTextColor: t
  });
}
const jv = {
  name: "Input",
  common: mt,
  peers: {
    Scrollbar: gr
  },
  self: p_
}, Wv = "n-input", v_ = I("input", `
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
  N("input, textarea", `
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),
  N("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder", `
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
  N("input-el, textarea-el", `
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
 `), D("&:-webkit-autofill ~", [N("placeholder", "display: none;")])]),
  K("round", [ot("textarea", "border-radius: calc(var(--n-height) / 2);")]),
  N("placeholder", `
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
  K("textarea", [N("placeholder", "overflow: visible;")]),
  ot("autosize", "width: 100%;"),
  K("autosize", [N("textarea-el, input-el", `
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),
  // input
  I("input-wrapper", `
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `),
  N("input-mirror", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre;
 pointer-events: none;
 `),
  N("input-el", `
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `, [D("&[type=password]::-ms-reveal", "display: none;"), D("+", [N("placeholder", `
 display: flex;
 align-items: center; 
 `)])]),
  ot("textarea", [N("placeholder", "white-space: nowrap;")]),
  N("eye", `
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `),
  // textarea
  K("textarea", "width: 100%;", [I("input-word-count", `
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `), K("resizable", [I("input-wrapper", `
 resize: vertical;
 min-height: var(--n-height);
 `)]), N("textarea-el, textarea-mirror, placeholder", `
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
 `), N("textarea-mirror", `
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),
  // pair
  K("pair", [N("input-el, placeholder", "text-align: center;"), N("separator", `
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `, [I("icon", `
 color: var(--n-icon-color);
 `), I("base-icon", `
 color: var(--n-icon-color);
 `)])]),
  K("disabled", `
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `, [N("border", "border: var(--n-border-disabled);"), N("input-el, textarea-el", `
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `), N("placeholder", "color: var(--n-placeholder-color-disabled);"), N("separator", "color: var(--n-text-color-disabled);", [I("icon", `
 color: var(--n-icon-color-disabled);
 `), I("base-icon", `
 color: var(--n-icon-color-disabled);
 `)]), I("input-word-count", `
 color: var(--n-count-text-color-disabled);
 `), N("suffix, prefix", "color: var(--n-text-color-disabled);", [I("icon", `
 color: var(--n-icon-color-disabled);
 `), I("internal-icon", `
 color: var(--n-icon-color-disabled);
 `)])]),
  ot("disabled", [N("eye", `
 color: var(--n-icon-color);
 cursor: pointer;
 `, [D("&:hover", `
 color: var(--n-icon-color-hover);
 `), D("&:active", `
 color: var(--n-icon-color-pressed);
 `)]), D("&:hover", [N("state-border", "border: var(--n-border-hover);")]), K("focus", "background-color: var(--n-color-focus);", [N("state-border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),
  N("border, state-border", `
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
  N("state-border", `
 border-color: #0000;
 z-index: 1;
 `),
  N("prefix", "margin-right: 4px;"),
  N("suffix", `
 margin-left: 4px;
 `),
  N("suffix, prefix", `
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `, [I("base-loading", `
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `), I("base-clear", `
 font-size: var(--n-icon-size);
 `, [N("placeholder", [I("base-icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]), D(">", [I("icon", `
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]), I("base-icon", `
 font-size: var(--n-icon-size);
 `)]),
  I("input-word-count", `
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),
  ["warning", "error"].map((e) => K(`${e}-status`, [ot("disabled", [I("base-loading", `
 color: var(--n-loading-color-${e})
 `), N("input-el, textarea-el", `
 caret-color: var(--n-caret-color-${e});
 `), N("state-border", `
 border: var(--n-border-${e});
 `), D("&:hover", [N("state-border", `
 border: var(--n-border-hover-${e});
 `)]), D("&:focus", `
 background-color: var(--n-color-focus-${e});
 `, [N("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)]), K("focus", `
 background-color: var(--n-color-focus-${e});
 `, [N("state-border", `
 box-shadow: var(--n-box-shadow-focus-${e});
 border: var(--n-border-focus-${e});
 `)])])]))
]), m_ = I("input", [K("disabled", [N("input-el, textarea-el", `
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]), g_ = window.Vue.ref, b_ = window.Vue.watch;
function w_(e) {
  let t = 0;
  for (const n of e)
    t++;
  return t;
}
function ea(e) {
  return e === "" || e == null;
}
function y_(e) {
  const t = g_(null);
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
  return b_(e, r), {
    recordCursor: n,
    restoreCursor: o
  };
}
const x_ = window.Vue.computed, C_ = window.Vue.defineComponent, S_ = window.Vue.h, $_ = window.Vue.inject, xf = C_({
  name: "InputWordCount",
  setup(e, {
    slots: t
  }) {
    const {
      mergedValueRef: n,
      maxlengthRef: o,
      mergedClsPrefixRef: r,
      countGraphemesRef: i
    } = $_(Wv), l = x_(() => {
      const {
        value: a
      } = n;
      return a === null || Array.isArray(a) ? 0 : (i.value || w_)(a);
    });
    return () => {
      const {
        value: a
      } = o, {
        value: s
      } = n;
      return S_("span", {
        class: `${r.value}-input-word-count`
      }, Kx(t.default, {
        value: s === null || Array.isArray(s) ? "" : s
      }, () => [a === void 0 ? l.value : `${l.value} / ${a}`]));
    };
  }
}), Zn = window.Vue.computed, R_ = window.Vue.defineComponent, k_ = window.Vue.Fragment, P_ = window.Vue.getCurrentInstance, Ve = window.Vue.h, Cf = window.Vue.nextTick, __ = window.Vue.onMounted, T_ = window.Vue.provide, Tt = window.Vue.ref, Sf = window.Vue.toRef, $f = window.Vue.watch, Rf = window.Vue.watchEffect, F_ = Object.assign(Object.assign({}, ke.props), {
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
}), yo = R_({
  name: "Input",
  props: F_,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBorderedRef: n,
      inlineThemeDisabled: o,
      mergedRtlRef: r
    } = qe(e), i = ke("Input", "-input", v_, jv, e, t);
    Hv && Do("-input-safari", m_, t);
    const l = Tt(null), a = Tt(null), s = Tt(null), d = Tt(null), c = Tt(null), h = Tt(null), p = Tt(null), v = y_(p), f = Tt(null), {
      localeRef: m
    } = mi("Input"), g = Tt(e.defaultValue), u = Sf(e, "value"), w = Xt(u, g), x = Io(e), {
      mergedSizeRef: y,
      mergedDisabledRef: C,
      mergedStatusRef: S
    } = x, b = Tt(!1), R = Tt(!1), $ = Tt(!1), T = Tt(!1);
    let H = null;
    const P = Zn(() => {
      const {
        placeholder: V,
        pair: ee
      } = e;
      return ee ? Array.isArray(V) ? V : V === void 0 ? ["", ""] : [V, V] : V === void 0 ? [m.value.placeholder] : [V];
    }), z = Zn(() => {
      const {
        value: V
      } = $, {
        value: ee
      } = w, {
        value: we
      } = P;
      return !V && (ea(ee) || Array.isArray(ee) && ea(ee[0])) && we[0];
    }), M = Zn(() => {
      const {
        value: V
      } = $, {
        value: ee
      } = w, {
        value: we
      } = P;
      return !V && we[1] && (ea(ee) || Array.isArray(ee) && ea(ee[1]));
    }), O = Le(() => e.internalForceFocus || b.value), U = Le(() => {
      if (C.value || e.readonly || !e.clearable || !O.value && !R.value)
        return !1;
      const {
        value: V
      } = w, {
        value: ee
      } = O;
      return e.pair ? !!(Array.isArray(V) && (V[0] || V[1])) && (R.value || ee) : !!V && (R.value || ee);
    }), L = Zn(() => {
      const {
        showPasswordOn: V
      } = e;
      if (V)
        return V;
      if (e.showPasswordToggle) return "click";
    }), Y = Tt(!1), te = Zn(() => {
      const {
        textDecoration: V
      } = e;
      return V ? Array.isArray(V) ? V.map((ee) => ({
        textDecoration: ee
      })) : [{
        textDecoration: V
      }] : ["", ""];
    }), J = Tt(void 0), X = () => {
      var V, ee;
      if (e.type === "textarea") {
        const {
          autosize: we
        } = e;
        if (we && (J.value = (ee = (V = f.value) === null || V === void 0 ? void 0 : V.$el) === null || ee === void 0 ? void 0 : ee.offsetWidth), !a.value || typeof we == "boolean") return;
        const {
          paddingTop: Ee,
          paddingBottom: je,
          lineHeight: Me
        } = window.getComputedStyle(a.value), rt = Number(Ee.slice(0, -2)), ct = Number(je.slice(0, -2)), Yt = Number(Me.slice(0, -2)), {
          value: On
        } = s;
        if (!On) return;
        if (we.minRows) {
          const zn = Math.max(we.minRows, 1), po = `${rt + ct + Yt * zn}px`;
          On.style.minHeight = po;
        }
        if (we.maxRows) {
          const zn = `${rt + ct + Yt * we.maxRows}px`;
          On.style.maxHeight = zn;
        }
      }
    }, A = Zn(() => {
      const {
        maxlength: V
      } = e;
      return V === void 0 ? void 0 : Number(V);
    });
    __(() => {
      const {
        value: V
      } = w;
      Array.isArray(V) || ze(V);
    });
    const G = P_().proxy;
    function Z(V, ee) {
      const {
        onUpdateValue: we,
        "onUpdate:value": Ee,
        onInput: je
      } = e, {
        nTriggerFormInput: Me
      } = x;
      we && re(we, V, ee), Ee && re(Ee, V, ee), je && re(je, V, ee), g.value = V, Me();
    }
    function ie(V, ee) {
      const {
        onChange: we
      } = e, {
        nTriggerFormChange: Ee
      } = x;
      we && re(we, V, ee), g.value = V, Ee();
    }
    function ae(V) {
      const {
        onBlur: ee
      } = e, {
        nTriggerFormBlur: we
      } = x;
      ee && re(ee, V), we();
    }
    function ue(V) {
      const {
        onFocus: ee
      } = e, {
        nTriggerFormFocus: we
      } = x;
      ee && re(ee, V), we();
    }
    function be(V) {
      const {
        onClear: ee
      } = e;
      ee && re(ee, V);
    }
    function q(V) {
      const {
        onInputBlur: ee
      } = e;
      ee && re(ee, V);
    }
    function se(V) {
      const {
        onInputFocus: ee
      } = e;
      ee && re(ee, V);
    }
    function Pe() {
      const {
        onDeactivate: V
      } = e;
      V && re(V);
    }
    function ve() {
      const {
        onActivate: V
      } = e;
      V && re(V);
    }
    function $e(V) {
      const {
        onClick: ee
      } = e;
      ee && re(ee, V);
    }
    function Se(V) {
      const {
        onWrapperFocus: ee
      } = e;
      ee && re(ee, V);
    }
    function De(V) {
      const {
        onWrapperBlur: ee
      } = e;
      ee && re(ee, V);
    }
    function Ie() {
      $.value = !0;
    }
    function Je(V) {
      $.value = !1, V.target === h.value ? F(V, 1) : F(V, 0);
    }
    function F(V, ee = 0, we = "input") {
      const Ee = V.target.value;
      if (ze(Ee), V instanceof InputEvent && !V.isComposing && ($.value = !1), e.type === "textarea") {
        const {
          value: Me
        } = f;
        Me && Me.syncUnifiedContainer();
      }
      if (H = Ee, $.value) return;
      v.recordCursor();
      const je = _(Ee);
      if (je)
        if (!e.pair)
          we === "input" ? Z(Ee, {
            source: ee
          }) : ie(Ee, {
            source: ee
          });
        else {
          let {
            value: Me
          } = w;
          Array.isArray(Me) ? Me = [Me[0], Me[1]] : Me = ["", ""], Me[ee] = Ee, we === "input" ? Z(Me, {
            source: ee
          }) : ie(Me, {
            source: ee
          });
        }
      G.$forceUpdate(), je || Cf(v.restoreCursor);
    }
    function _(V) {
      const {
        countGraphemes: ee,
        maxlength: we,
        minlength: Ee
      } = e;
      if (ee) {
        let Me;
        if (we !== void 0 && (Me === void 0 && (Me = ee(V)), Me > Number(we)) || Ee !== void 0 && (Me === void 0 && (Me = ee(V)), Me < Number(we)))
          return !1;
      }
      const {
        allowInput: je
      } = e;
      return typeof je == "function" ? je(V) : !0;
    }
    function W(V) {
      q(V), V.relatedTarget === l.value && Pe(), V.relatedTarget !== null && (V.relatedTarget === c.value || V.relatedTarget === h.value || V.relatedTarget === a.value) || (T.value = !1), E(V, "blur"), p.value = null;
    }
    function ne(V, ee) {
      se(V), b.value = !0, T.value = !0, ve(), E(V, "focus"), ee === 0 ? p.value = c.value : ee === 1 ? p.value = h.value : ee === 2 && (p.value = a.value);
    }
    function ye(V) {
      e.passivelyActivated && (De(V), E(V, "blur"));
    }
    function he(V) {
      e.passivelyActivated && (b.value = !0, Se(V), E(V, "focus"));
    }
    function E(V, ee) {
      V.relatedTarget !== null && (V.relatedTarget === c.value || V.relatedTarget === h.value || V.relatedTarget === a.value || V.relatedTarget === l.value) || (ee === "focus" ? (ue(V), b.value = !0) : ee === "blur" && (ae(V), b.value = !1));
    }
    function j(V, ee) {
      F(V, ee, "change");
    }
    function fe(V) {
      $e(V);
    }
    function _e(V) {
      be(V), at();
    }
    function at() {
      e.pair ? (Z(["", ""], {
        source: "clear"
      }), ie(["", ""], {
        source: "clear"
      })) : (Z("", {
        source: "clear"
      }), ie("", {
        source: "clear"
      }));
    }
    function vt(V) {
      const {
        onMousedown: ee
      } = e;
      ee && ee(V);
      const {
        tagName: we
      } = V.target;
      if (we !== "INPUT" && we !== "TEXTAREA") {
        if (e.resizable) {
          const {
            value: Ee
          } = l;
          if (Ee) {
            const {
              left: je,
              top: Me,
              width: rt,
              height: ct
            } = Ee.getBoundingClientRect(), Yt = 14;
            if (je + rt - Yt < V.clientX && V.clientX < je + rt && Me + ct - Yt < V.clientY && V.clientY < Me + ct)
              return;
          }
        }
        V.preventDefault(), b.value || Q();
      }
    }
    function Ye() {
      var V;
      R.value = !0, e.type === "textarea" && ((V = f.value) === null || V === void 0 || V.handleMouseEnterWrapper());
    }
    function Ze() {
      var V;
      R.value = !1, e.type === "textarea" && ((V = f.value) === null || V === void 0 || V.handleMouseLeaveWrapper());
    }
    function gt() {
      C.value || L.value === "click" && (Y.value = !Y.value);
    }
    function Qe(V) {
      if (C.value) return;
      V.preventDefault();
      const ee = (Ee) => {
        Ee.preventDefault(), Be("mouseup", document, ee);
      };
      if (He("mouseup", document, ee), L.value !== "mousedown") return;
      Y.value = !0;
      const we = () => {
        Y.value = !1, Be("mouseup", document, we);
      };
      He("mouseup", document, we);
    }
    function ce(V) {
      e.onKeyup && re(e.onKeyup, V);
    }
    function Ce(V) {
      switch (e.onKeydown && re(e.onKeydown, V), V.key) {
        case "Escape":
          B();
          break;
        case "Enter":
          k(V);
          break;
      }
    }
    function k(V) {
      var ee, we;
      if (e.passivelyActivated) {
        const {
          value: Ee
        } = T;
        if (Ee) {
          e.internalDeactivateOnEnter && B();
          return;
        }
        V.preventDefault(), e.type === "textarea" ? (ee = a.value) === null || ee === void 0 || ee.focus() : (we = c.value) === null || we === void 0 || we.focus();
      }
    }
    function B() {
      e.passivelyActivated && (T.value = !1, Cf(() => {
        var V;
        (V = l.value) === null || V === void 0 || V.focus();
      }));
    }
    function Q() {
      var V, ee, we;
      C.value || (e.passivelyActivated ? (V = l.value) === null || V === void 0 || V.focus() : ((ee = a.value) === null || ee === void 0 || ee.focus(), (we = c.value) === null || we === void 0 || we.focus()));
    }
    function le() {
      var V;
      !((V = l.value) === null || V === void 0) && V.contains(document.activeElement) && document.activeElement.blur();
    }
    function de() {
      var V, ee;
      (V = a.value) === null || V === void 0 || V.select(), (ee = c.value) === null || ee === void 0 || ee.select();
    }
    function pe() {
      C.value || (a.value ? a.value.focus() : c.value && c.value.focus());
    }
    function me() {
      const {
        value: V
      } = l;
      V != null && V.contains(document.activeElement) && V !== document.activeElement && B();
    }
    function xe(V) {
      if (e.type === "textarea") {
        const {
          value: ee
        } = a;
        ee == null || ee.scrollTo(V);
      } else {
        const {
          value: ee
        } = c;
        ee == null || ee.scrollTo(V);
      }
    }
    function ze(V) {
      const {
        type: ee,
        pair: we,
        autosize: Ee
      } = e;
      if (!we && Ee)
        if (ee === "textarea") {
          const {
            value: je
          } = s;
          je && (je.textContent = `${V ?? ""}\r
`);
        } else {
          const {
            value: je
          } = d;
          je && (V ? je.textContent = V : je.innerHTML = "&nbsp;");
        }
    }
    function nt() {
      X();
    }
    const Ne = Tt({
      top: "0"
    });
    function Pt(V) {
      var ee;
      const {
        scrollTop: we
      } = V.target;
      Ne.value.top = `${-we}px`, (ee = f.value) === null || ee === void 0 || ee.syncUnifiedContainer();
    }
    let Mt = null;
    Rf(() => {
      const {
        autosize: V,
        type: ee
      } = e;
      V && ee === "textarea" ? Mt = $f(w, (we) => {
        !Array.isArray(we) && we !== H && ze(we);
      }) : Mt == null || Mt();
    });
    let It = null;
    Rf(() => {
      e.type === "textarea" ? It = $f(w, (V) => {
        var ee;
        !Array.isArray(V) && V !== H && ((ee = f.value) === null || ee === void 0 || ee.syncUnifiedContainer());
      }) : It == null || It();
    }), T_(Wv, {
      mergedValueRef: w,
      maxlengthRef: A,
      mergedClsPrefixRef: t,
      countGraphemesRef: Sf(e, "countGraphemes")
    });
    const Nt = {
      wrapperElRef: l,
      inputElRef: c,
      textareaElRef: a,
      isCompositing: $,
      clear: at,
      focus: Q,
      blur: le,
      select: de,
      deactivate: me,
      activate: pe,
      scrollTo: xe
    }, Ht = zt("Input", r, t), Qt = Zn(() => {
      const {
        value: V
      } = y, {
        common: {
          cubicBezierEaseInOut: ee
        },
        self: {
          color: we,
          borderRadius: Ee,
          textColor: je,
          caretColor: Me,
          caretColorError: rt,
          caretColorWarning: ct,
          textDecorationColor: Yt,
          border: On,
          borderDisabled: zn,
          borderHover: po,
          borderFocus: yr,
          placeholderColor: xr,
          placeholderColorDisabled: Cr,
          lineHeightTextarea: Sr,
          colorDisabled: $r,
          colorFocus: Kn,
          textColorDisabled: qn,
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
          borderHoverError: Tm,
          clearSize: Fm,
          clearColor: Em,
          clearColorHover: Om,
          clearColorPressed: zm,
          iconColor: Mm,
          iconColorDisabled: Im,
          suffixTextColor: Am,
          countTextColor: Vm,
          countTextColorDisabled: Bm,
          iconColorHover: Lm,
          iconColorPressed: Dm,
          loadingColor: Nm,
          loadingColorError: Hm,
          loadingColorWarning: jm,
          fontWeight: Wm,
          [oe("padding", V)]: Um,
          [oe("fontSize", V)]: Km,
          [oe("height", V)]: qm
        }
      } = i.value, {
        left: Gm,
        right: Xm
      } = Gt(Um);
      return {
        "--n-bezier": ee,
        "--n-count-text-color": Vm,
        "--n-count-text-color-disabled": Bm,
        "--n-color": we,
        "--n-font-size": Km,
        "--n-font-weight": Wm,
        "--n-border-radius": Ee,
        "--n-height": qm,
        "--n-padding-left": Gm,
        "--n-padding-right": Xm,
        "--n-text-color": je,
        "--n-caret-color": Me,
        "--n-text-decoration-color": Yt,
        "--n-border": On,
        "--n-border-disabled": zn,
        "--n-border-hover": po,
        "--n-border-focus": yr,
        "--n-placeholder-color": xr,
        "--n-placeholder-color-disabled": Cr,
        "--n-icon-size": Qa,
        "--n-line-height-textarea": Sr,
        "--n-color-disabled": $r,
        "--n-color-focus": Kn,
        "--n-text-color-disabled": qn,
        "--n-box-shadow-focus": Ja,
        "--n-loading-color": Nm,
        // form warning
        "--n-caret-color-warning": ct,
        "--n-color-focus-warning": el,
        "--n-box-shadow-focus-warning": tl,
        "--n-border-warning": nl,
        "--n-border-focus-warning": ol,
        "--n-border-hover-warning": rl,
        "--n-loading-color-warning": jm,
        // form error
        "--n-caret-color-error": rt,
        "--n-color-focus-error": il,
        "--n-box-shadow-focus-error": al,
        "--n-border-error": ll,
        "--n-border-focus-error": sl,
        "--n-border-hover-error": Tm,
        "--n-loading-color-error": Hm,
        // clear-button
        "--n-clear-color": Em,
        "--n-clear-size": Fm,
        "--n-clear-color-hover": Om,
        "--n-clear-color-pressed": zm,
        "--n-icon-color": Mm,
        "--n-icon-color-hover": Lm,
        "--n-icon-color-pressed": Dm,
        "--n-icon-color-disabled": Im,
        "--n-suffix-text-color": Am
      };
    }), jt = o ? yt("input", Zn(() => {
      const {
        value: V
      } = y;
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
      mergedPlaceholder: P,
      showPlaceholder1: z,
      showPlaceholder2: M,
      mergedFocus: O,
      isComposing: $,
      activated: T,
      showClearButton: U,
      mergedSize: y,
      mergedDisabled: C,
      textDecorationStyle: te,
      mergedClsPrefix: t,
      mergedBordered: n,
      mergedShowPasswordOn: L,
      placeholderStyle: Ne,
      mergedStatus: S,
      textAreaScrollContainerWidth: J,
      // methods
      handleTextAreaScroll: Pt,
      handleCompositionStart: Ie,
      handleCompositionEnd: Je,
      handleInput: F,
      handleInputBlur: W,
      handleInputFocus: ne,
      handleWrapperBlur: ye,
      handleWrapperFocus: he,
      handleMouseEnter: Ye,
      handleMouseLeave: Ze,
      handleMouseDown: vt,
      handleChange: j,
      handleClick: fe,
      handleClear: _e,
      handlePasswordToggleClick: gt,
      handlePasswordToggleMousedown: Qe,
      handleWrapperKeydown: Ce,
      handleWrapperKeyup: ce,
      handleTextAreaMirrorResize: nt,
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
    return p == null || p(), Ve("div", {
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
    }, Ve("div", {
      class: `${a}-input-wrapper`
    }, dt(v.prefix, (f) => f && Ve("div", {
      class: `${a}-input__prefix`
    }, f)), c === "textarea" ? Ve(br, {
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
        return Ve(k_, null, Ve("textarea", Object.assign({}, this.inputProps, {
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
        })), this.showPlaceholder1 ? Ve("div", {
          class: `${a}-input__placeholder`,
          style: [this.placeholderStyle, u],
          key: "placeholder"
        }, this.mergedPlaceholder[0]) : null, this.autosize ? Ve(To, {
          onResize: this.handleTextAreaMirrorResize
        }, {
          default: () => Ve("div", {
            ref: "textareaMirrorElRef",
            class: `${a}-input__textarea-mirror`,
            key: "mirror"
          })
        }) : null);
      }
    }) : Ve("div", {
      class: `${a}-input__input`
    }, Ve("input", Object.assign({
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
    })), this.showPlaceholder1 ? Ve("div", {
      class: `${a}-input__placeholder`
    }, Ve("span", null, this.mergedPlaceholder[0])) : null, this.autosize ? Ve("div", {
      class: `${a}-input__input-mirror`,
      key: "mirror",
      ref: "inputMirrorElRef"
    }, " ") : null), !this.pair && dt(v.suffix, (f) => f || this.clearable || this.showCount || this.mergedShowPasswordOn || this.loading !== void 0 ? Ve("div", {
      class: `${a}-input__suffix`
    }, [dt(v["clear-icon-placeholder"], (m) => (this.clearable || m) && Ve(Xs, {
      clsPrefix: a,
      show: this.showClearButton,
      onClear: this.handleClear
    }, {
      placeholder: () => m,
      icon: () => {
        var g, u;
        return (u = (g = this.$slots)["clear-icon"]) === null || u === void 0 ? void 0 : u.call(g);
      }
    })), this.internalLoadingBeforeSuffix ? null : f, this.loading !== void 0 ? Ve(Dv, {
      clsPrefix: a,
      loading: this.loading,
      showArrow: !1,
      showClear: !1,
      style: this.cssVars
    }) : null, this.internalLoadingBeforeSuffix ? f : null, this.showCount && this.type !== "textarea" ? Ve(xf, null, {
      default: (m) => {
        var g;
        const {
          renderCount: u
        } = this;
        return u ? u(m) : (g = v.count) === null || g === void 0 ? void 0 : g.call(v, m);
      }
    }) : null, this.mergedShowPasswordOn && this.type === "password" ? Ve("div", {
      class: `${a}-input__eye`,
      onMousedown: this.handlePasswordToggleMousedown,
      onClick: this.handlePasswordToggleClick
    }, this.passwordVisible ? vn(v["password-visible-icon"], () => [Ve($t, {
      clsPrefix: a
    }, {
      default: () => Ve(Ik, null)
    })]) : vn(v["password-invisible-icon"], () => [Ve($t, {
      clsPrefix: a
    }, {
      default: () => Ve(Vk, null)
    })])) : null]) : null)), this.pair ? Ve("span", {
      class: `${a}-input__separator`
    }, vn(v.separator, () => [this.separator])) : null, this.pair ? Ve("div", {
      class: `${a}-input-wrapper`
    }, Ve("div", {
      class: `${a}-input__input`
    }, Ve("input", {
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
    }), this.showPlaceholder2 ? Ve("div", {
      class: `${a}-input__placeholder`
    }, Ve("span", null, this.mergedPlaceholder[1])) : null), dt(v.suffix, (f) => (this.clearable || f) && Ve("div", {
      class: `${a}-input__suffix`
    }, [this.clearable && Ve(Xs, {
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
    }), f]))) : null, this.mergedBordered ? Ve("div", {
      class: `${a}-input__border`
    }) : null, this.mergedBordered ? Ve("div", {
      class: `${a}-input__state-border`
    }) : null, this.showCount && c === "textarea" ? Ve(xf, null, {
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
function Va(e) {
  return e.type === "group";
}
function Uv(e) {
  return e.type === "ignored";
}
function Ul(e, t) {
  try {
    return !!(1 + t.toString().toLowerCase().indexOf(e.trim().toLowerCase()));
  } catch {
    return !1;
  }
}
function Kv(e, t) {
  return {
    getIsGroup: Va,
    getIgnored: Uv,
    getKey(o) {
      return Va(o) ? o.name || o.key || "key-required" : o[e];
    },
    getChildren(o) {
      return o[t];
    }
  };
}
function E_(e, t, n, o) {
  if (!t) return e;
  function r(i) {
    if (!Array.isArray(i)) return [];
    const l = [];
    for (const a of i)
      if (Va(a)) {
        const s = r(a[o]);
        s.length && l.push(Object.assign({}, a, {
          [o]: s
        }));
      } else {
        if (Uv(a))
          continue;
        t(n, a) && l.push(a);
      }
    return l;
  }
  return r(e);
}
function O_(e, t, n) {
  const o = /* @__PURE__ */ new Map();
  return e.forEach((r) => {
    Va(r) ? r[n].forEach((i) => {
      o.set(i[t], i);
    }) : o.set(r[t], r);
  }), o;
}
function mo(e) {
  return We(e, [255, 255, 255, 0.16]);
}
function ta(e) {
  return We(e, [0, 0, 0, 0.12]);
}
const z_ = "n-button-group", M_ = {
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
function I_(e) {
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
    infoColorHover: x,
    infoColorPressed: y,
    successColor: C,
    successColorHover: S,
    successColorPressed: b,
    warningColor: R,
    warningColorHover: $,
    warningColorPressed: T,
    errorColor: H,
    errorColorHover: P,
    errorColorPressed: z,
    fontWeight: M,
    buttonColor2: O,
    buttonColor2Hover: U,
    buttonColor2Pressed: L,
    fontWeightStrong: Y
  } = e;
  return Object.assign(Object.assign({}, M_), {
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
    colorHoverInfo: x,
    colorPressedInfo: y,
    colorFocusInfo: x,
    colorDisabledInfo: w,
    textColorInfo: u,
    textColorHoverInfo: u,
    textColorPressedInfo: u,
    textColorFocusInfo: u,
    textColorDisabledInfo: u,
    textColorTextInfo: w,
    textColorTextHoverInfo: x,
    textColorTextPressedInfo: y,
    textColorTextFocusInfo: x,
    textColorTextDisabledInfo: h,
    textColorGhostInfo: w,
    textColorGhostHoverInfo: x,
    textColorGhostPressedInfo: y,
    textColorGhostFocusInfo: x,
    textColorGhostDisabledInfo: w,
    borderInfo: `1px solid ${w}`,
    borderHoverInfo: `1px solid ${x}`,
    borderPressedInfo: `1px solid ${y}`,
    borderFocusInfo: `1px solid ${x}`,
    borderDisabledInfo: `1px solid ${w}`,
    rippleColorInfo: w,
    // success
    colorSuccess: C,
    colorHoverSuccess: S,
    colorPressedSuccess: b,
    colorFocusSuccess: S,
    colorDisabledSuccess: C,
    textColorSuccess: u,
    textColorHoverSuccess: u,
    textColorPressedSuccess: u,
    textColorFocusSuccess: u,
    textColorDisabledSuccess: u,
    textColorTextSuccess: C,
    textColorTextHoverSuccess: S,
    textColorTextPressedSuccess: b,
    textColorTextFocusSuccess: S,
    textColorTextDisabledSuccess: h,
    textColorGhostSuccess: C,
    textColorGhostHoverSuccess: S,
    textColorGhostPressedSuccess: b,
    textColorGhostFocusSuccess: S,
    textColorGhostDisabledSuccess: C,
    borderSuccess: `1px solid ${C}`,
    borderHoverSuccess: `1px solid ${S}`,
    borderPressedSuccess: `1px solid ${b}`,
    borderFocusSuccess: `1px solid ${S}`,
    borderDisabledSuccess: `1px solid ${C}`,
    rippleColorSuccess: C,
    // warning
    colorWarning: R,
    colorHoverWarning: $,
    colorPressedWarning: T,
    colorFocusWarning: $,
    colorDisabledWarning: R,
    textColorWarning: u,
    textColorHoverWarning: u,
    textColorPressedWarning: u,
    textColorFocusWarning: u,
    textColorDisabledWarning: u,
    textColorTextWarning: R,
    textColorTextHoverWarning: $,
    textColorTextPressedWarning: T,
    textColorTextFocusWarning: $,
    textColorTextDisabledWarning: h,
    textColorGhostWarning: R,
    textColorGhostHoverWarning: $,
    textColorGhostPressedWarning: T,
    textColorGhostFocusWarning: $,
    textColorGhostDisabledWarning: R,
    borderWarning: `1px solid ${R}`,
    borderHoverWarning: `1px solid ${$}`,
    borderPressedWarning: `1px solid ${T}`,
    borderFocusWarning: `1px solid ${$}`,
    borderDisabledWarning: `1px solid ${R}`,
    rippleColorWarning: R,
    // error
    colorError: H,
    colorHoverError: P,
    colorPressedError: z,
    colorFocusError: P,
    colorDisabledError: H,
    textColorError: u,
    textColorHoverError: u,
    textColorPressedError: u,
    textColorFocusError: u,
    textColorDisabledError: u,
    textColorTextError: H,
    textColorTextHoverError: P,
    textColorTextPressedError: z,
    textColorTextFocusError: P,
    textColorTextDisabledError: h,
    textColorGhostError: H,
    textColorGhostHoverError: P,
    textColorGhostPressedError: z,
    textColorGhostFocusError: P,
    textColorGhostDisabledError: H,
    borderError: `1px solid ${H}`,
    borderHoverError: `1px solid ${P}`,
    borderPressedError: `1px solid ${z}`,
    borderFocusError: `1px solid ${P}`,
    borderDisabledError: `1px solid ${H}`,
    rippleColorError: H,
    waveOpacity: "0.6",
    fontWeight: M,
    fontWeightStrong: Y
  });
}
const jd = {
  name: "Button",
  common: mt,
  self: I_
}, A_ = D([I("button", `
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
 `, [K("color", [N("border", {
  borderColor: "var(--n-border-color)"
}), K("disabled", [N("border", {
  borderColor: "var(--n-border-color-disabled)"
})]), ot("disabled", [D("&:focus", [N("state-border", {
  borderColor: "var(--n-border-color-focus)"
})]), D("&:hover", [N("state-border", {
  borderColor: "var(--n-border-color-hover)"
})]), D("&:active", [N("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})]), K("pressed", [N("state-border", {
  borderColor: "var(--n-border-color-pressed)"
})])])]), K("disabled", {
  backgroundColor: "var(--n-color-disabled)",
  color: "var(--n-text-color-disabled)"
}, [N("border", {
  border: "var(--n-border-disabled)"
})]), ot("disabled", [D("&:focus", {
  backgroundColor: "var(--n-color-focus)",
  color: "var(--n-text-color-focus)"
}, [N("state-border", {
  border: "var(--n-border-focus)"
})]), D("&:hover", {
  backgroundColor: "var(--n-color-hover)",
  color: "var(--n-text-color-hover)"
}, [N("state-border", {
  border: "var(--n-border-hover)"
})]), D("&:active", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [N("state-border", {
  border: "var(--n-border-pressed)"
})]), K("pressed", {
  backgroundColor: "var(--n-color-pressed)",
  color: "var(--n-text-color-pressed)"
}, [N("state-border", {
  border: "var(--n-border-pressed)"
})])]), K("loading", "cursor: wait;"), I("base-wave", `
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
})]), zo && "MozBoxSizing" in document.createElement("div").style ? D("&::moz-focus-inner", {
  border: 0
}) : null, N("border, state-border", `
 position: absolute;
 left: 0;
 top: 0;
 right: 0;
 bottom: 0;
 border-radius: inherit;
 transition: border-color .3s var(--n-bezier);
 pointer-events: none;
 `), N("border", {
  border: "var(--n-border)"
}), N("state-border", {
  border: "var(--n-border)",
  borderColor: "#0000",
  zIndex: 1
}), N("icon", `
 margin: var(--n-icon-margin);
 margin-left: 0;
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 max-width: var(--n-icon-size);
 font-size: var(--n-icon-size);
 position: relative;
 flex-shrink: 0;
 `, [I("icon-slot", `
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 position: absolute;
 left: 0;
 top: 50%;
 transform: translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `, [Sn({
  top: "50%",
  originalTransform: "translateY(-50%)"
})]), r_()]), N("content", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 min-width: 0;
 `, [D("~", [N("icon", {
  margin: "var(--n-icon-margin)",
  marginRight: 0
})])]), K("block", `
 display: flex;
 width: 100%;
 `), K("dashed", [N("border, state-border", {
  borderStyle: "dashed !important"
})]), K("disabled", {
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
})]), na = window.Vue.computed, V_ = window.Vue.defineComponent, yn = window.Vue.h, B_ = window.Vue.inject, Kl = window.Vue.ref;
window.Vue.watchEffect;
const L_ = Object.assign(Object.assign({}, ke.props), {
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
    default: !Hv
  }
}), on = V_({
  name: "Button",
  props: L_,
  slots: Object,
  setup(e) {
    const t = Kl(null), n = Kl(null), o = Kl(!1), r = Le(() => !e.quaternary && !e.tertiary && !e.secondary && !e.text && (!e.color || e.ghost || e.dashed) && e.bordered), i = B_(z_, {}), {
      mergedSizeRef: l
    } = Io({}, {
      defaultSize: "medium",
      mergedSize: (y) => {
        const {
          size: C
        } = e;
        if (C) return C;
        const {
          size: S
        } = i;
        if (S) return S;
        const {
          mergedSize: b
        } = y || {};
        return b ? b.value : "medium";
      }
    }), a = na(() => e.focusable && !e.disabled), s = (y) => {
      var C;
      a.value || y.preventDefault(), !e.nativeFocusBehavior && (y.preventDefault(), !e.disabled && a.value && ((C = t.value) === null || C === void 0 || C.focus({
        preventScroll: !0
      })));
    }, d = (y) => {
      var C;
      if (!e.disabled && !e.loading) {
        const {
          onClick: S
        } = e;
        S && re(S, y), e.text || (C = n.value) === null || C === void 0 || C.play();
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
      mergedClsPrefixRef: f,
      mergedRtlRef: m
    } = qe(e), g = ke("Button", "-button", A_, jd, e, f), u = zt("Button", m, f), w = na(() => {
      const y = g.value, {
        common: {
          cubicBezierEaseInOut: C,
          cubicBezierEaseOut: S
        },
        self: b
      } = y, {
        rippleDuration: R,
        opacityDisabled: $,
        fontWeight: T,
        fontWeightStrong: H
      } = b, P = l.value, {
        dashed: z,
        type: M,
        ghost: O,
        text: U,
        color: L,
        round: Y,
        circle: te,
        textColor: J,
        secondary: X,
        tertiary: A,
        quaternary: G,
        strong: Z
      } = e, ie = {
        "--n-font-weight": Z ? H : T
      };
      let ae = {
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
      const ue = M === "tertiary", be = M === "default", q = ue ? "default" : M;
      if (U) {
        const W = J || L;
        ae = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": "#0000",
          "--n-text-color": W || b[oe("textColorText", q)],
          "--n-text-color-hover": W ? mo(W) : b[oe("textColorTextHover", q)],
          "--n-text-color-pressed": W ? ta(W) : b[oe("textColorTextPressed", q)],
          "--n-text-color-focus": W ? mo(W) : b[oe("textColorTextHover", q)],
          "--n-text-color-disabled": W || b[oe("textColorTextDisabled", q)]
        };
      } else if (O || z) {
        const W = J || L;
        ae = {
          "--n-color": "#0000",
          "--n-color-hover": "#0000",
          "--n-color-pressed": "#0000",
          "--n-color-focus": "#0000",
          "--n-color-disabled": "#0000",
          "--n-ripple-color": L || b[oe("rippleColor", q)],
          "--n-text-color": W || b[oe("textColorGhost", q)],
          "--n-text-color-hover": W ? mo(W) : b[oe("textColorGhostHover", q)],
          "--n-text-color-pressed": W ? ta(W) : b[oe("textColorGhostPressed", q)],
          "--n-text-color-focus": W ? mo(W) : b[oe("textColorGhostHover", q)],
          "--n-text-color-disabled": W || b[oe("textColorGhostDisabled", q)]
        };
      } else if (X) {
        const W = be ? b.textColor : ue ? b.textColorTertiary : b[oe("color", q)], ne = L || W, ye = M !== "default" && M !== "tertiary";
        ae = {
          "--n-color": ye ? Te(ne, {
            alpha: Number(b.colorOpacitySecondary)
          }) : b.colorSecondary,
          "--n-color-hover": ye ? Te(ne, {
            alpha: Number(b.colorOpacitySecondaryHover)
          }) : b.colorSecondaryHover,
          "--n-color-pressed": ye ? Te(ne, {
            alpha: Number(b.colorOpacitySecondaryPressed)
          }) : b.colorSecondaryPressed,
          "--n-color-focus": ye ? Te(ne, {
            alpha: Number(b.colorOpacitySecondaryHover)
          }) : b.colorSecondaryHover,
          "--n-color-disabled": b.colorSecondary,
          "--n-ripple-color": "#0000",
          "--n-text-color": ne,
          "--n-text-color-hover": ne,
          "--n-text-color-pressed": ne,
          "--n-text-color-focus": ne,
          "--n-text-color-disabled": ne
        };
      } else if (A || G) {
        const W = be ? b.textColor : ue ? b.textColorTertiary : b[oe("color", q)], ne = L || W;
        A ? (ae["--n-color"] = b.colorTertiary, ae["--n-color-hover"] = b.colorTertiaryHover, ae["--n-color-pressed"] = b.colorTertiaryPressed, ae["--n-color-focus"] = b.colorSecondaryHover, ae["--n-color-disabled"] = b.colorTertiary) : (ae["--n-color"] = b.colorQuaternary, ae["--n-color-hover"] = b.colorQuaternaryHover, ae["--n-color-pressed"] = b.colorQuaternaryPressed, ae["--n-color-focus"] = b.colorQuaternaryHover, ae["--n-color-disabled"] = b.colorQuaternary), ae["--n-ripple-color"] = "#0000", ae["--n-text-color"] = ne, ae["--n-text-color-hover"] = ne, ae["--n-text-color-pressed"] = ne, ae["--n-text-color-focus"] = ne, ae["--n-text-color-disabled"] = ne;
      } else
        ae = {
          "--n-color": L || b[oe("color", q)],
          "--n-color-hover": L ? mo(L) : b[oe("colorHover", q)],
          "--n-color-pressed": L ? ta(L) : b[oe("colorPressed", q)],
          "--n-color-focus": L ? mo(L) : b[oe("colorFocus", q)],
          "--n-color-disabled": L || b[oe("colorDisabled", q)],
          "--n-ripple-color": L || b[oe("rippleColor", q)],
          "--n-text-color": J || (L ? b.textColorPrimary : ue ? b.textColorTertiary : b[oe("textColor", q)]),
          "--n-text-color-hover": J || (L ? b.textColorHoverPrimary : b[oe("textColorHover", q)]),
          "--n-text-color-pressed": J || (L ? b.textColorPressedPrimary : b[oe("textColorPressed", q)]),
          "--n-text-color-focus": J || (L ? b.textColorFocusPrimary : b[oe("textColorFocus", q)]),
          "--n-text-color-disabled": J || (L ? b.textColorDisabledPrimary : b[oe("textColorDisabled", q)])
        };
      let se = {
        "--n-border": "initial",
        "--n-border-hover": "initial",
        "--n-border-pressed": "initial",
        "--n-border-focus": "initial",
        "--n-border-disabled": "initial"
      };
      U ? se = {
        "--n-border": "none",
        "--n-border-hover": "none",
        "--n-border-pressed": "none",
        "--n-border-focus": "none",
        "--n-border-disabled": "none"
      } : se = {
        "--n-border": b[oe("border", q)],
        "--n-border-hover": b[oe("borderHover", q)],
        "--n-border-pressed": b[oe("borderPressed", q)],
        "--n-border-focus": b[oe("borderFocus", q)],
        "--n-border-disabled": b[oe("borderDisabled", q)]
      };
      const {
        [oe("height", P)]: Pe,
        [oe("fontSize", P)]: ve,
        [oe("padding", P)]: $e,
        [oe("paddingRound", P)]: Se,
        [oe("iconSize", P)]: De,
        [oe("borderRadius", P)]: Ie,
        [oe("iconMargin", P)]: Je,
        waveOpacity: F
      } = b, _ = {
        "--n-width": te && !U ? Pe : "initial",
        "--n-height": U ? "initial" : Pe,
        "--n-font-size": ve,
        "--n-padding": te || U ? "initial" : Y ? Se : $e,
        "--n-icon-size": De,
        "--n-icon-margin": Je,
        "--n-border-radius": U ? "initial" : te || Y ? Pe : Ie
      };
      return Object.assign(Object.assign(Object.assign(Object.assign({
        "--n-bezier": C,
        "--n-bezier-ease-out": S,
        "--n-ripple-duration": R,
        "--n-opacity-disabled": $,
        "--n-wave-opacity": F
      }, ie), ae), se), _);
    }), x = v ? yt("button", na(() => {
      let y = "";
      const {
        dashed: C,
        type: S,
        ghost: b,
        text: R,
        color: $,
        round: T,
        circle: H,
        textColor: P,
        secondary: z,
        tertiary: M,
        quaternary: O,
        strong: U
      } = e;
      C && (y += "a"), b && (y += "b"), R && (y += "c"), T && (y += "d"), H && (y += "e"), z && (y += "f"), M && (y += "g"), O && (y += "h"), U && (y += "i"), $ && (y += `j${Fa($)}`), P && (y += `k${Fa(P)}`);
      const {
        value: L
      } = l;
      return y += `l${L[0]}`, y += `m${S[0]}`, y;
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
      customColorCssVars: na(() => {
        const {
          color: y
        } = e;
        if (!y) return null;
        const C = mo(y);
        return {
          "--n-border-color": y,
          "--n-border-color-hover": C,
          "--n-border-color-pressed": ta(y),
          "--n-border-color-focus": C,
          "--n-border-color-disabled": y
        };
      }),
      cssVars: v ? void 0 : w,
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
    const o = dt(this.$slots.default, (r) => r && yn("span", {
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
    }, this.iconPlacement === "right" && o, yn(o2, {
      width: !0
    }, {
      default: () => dt(this.$slots.icon, (r) => (this.loading || this.renderIcon || r) && yn("span", {
        class: `${e}-button__icon`,
        style: {
          margin: Bs(this.$slots.default) ? "0" : ""
        }
      }, yn(gi, null, {
        default: () => this.loading ? yn(bi, {
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
    }), this.iconPlacement === "left" && o, this.text ? null : yn(u_, {
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
}), D_ = {
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
function N_(e) {
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
  return Object.assign(Object.assign({}, D_), {
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
const qv = {
  name: "Card",
  common: mt,
  self: N_
}, H_ = D([I("card", `
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
 `, [bp({
  background: "var(--n-color-modal)"
}), K("hoverable", [D("&:hover", "box-shadow: var(--n-box-shadow);")]), K("content-segmented", [D(">", [N("content", {
  paddingTop: "var(--n-padding-bottom)"
})])]), K("content-soft-segmented", [D(">", [N("content", `
 margin: 0 var(--n-padding-left);
 padding: var(--n-padding-bottom) 0;
 `)])]), K("footer-segmented", [D(">", [N("footer", {
  paddingTop: "var(--n-padding-bottom)"
})])]), K("footer-soft-segmented", [D(">", [N("footer", `
 padding: var(--n-padding-bottom) 0;
 margin: 0 var(--n-padding-left);
 `)])]), D(">", [I("card-header", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 padding:
 var(--n-padding-top)
 var(--n-padding-left)
 var(--n-padding-bottom)
 var(--n-padding-left);
 `, [N("main", `
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 min-width: 0;
 color: var(--n-title-text-color);
 `), N("extra", `
 display: flex;
 align-items: center;
 font-size: var(--n-font-size);
 font-weight: 400;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `), N("close", `
 margin: 0 0 0 8px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]), N("action", `
 box-sizing: border-box;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 background-clip: padding-box;
 background-color: var(--n-action-color);
 `), N("content", "flex: 1; min-width: 0;"), N("content, footer", `
 box-sizing: border-box;
 padding: 0 var(--n-padding-left) var(--n-padding-bottom) var(--n-padding-left);
 font-size: var(--n-font-size);
 `, [D("&:first-child", {
  paddingTop: "var(--n-padding-bottom)"
})]), N("action", `
 background-color: var(--n-action-color);
 padding: var(--n-padding-bottom) var(--n-padding-left);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `)]), I("card-cover", `
 overflow: hidden;
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 `, [D("img", `
 display: block;
 width: 100%;
 `)]), K("bordered", `
 border: 1px solid var(--n-border-color);
 `, [D("&:target", "border-color: var(--n-color-target);")]), K("action-segmented", [D(">", [N("action", [D("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), K("content-segmented, content-soft-segmented", [D(">", [N("content", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [D("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), K("footer-segmented, footer-soft-segmented", [D(">", [N("footer", {
  transition: "border-color 0.3s var(--n-bezier)"
}, [D("&:not(:first-child)", {
  borderTop: "1px solid var(--n-border-color)"
})])])]), K("embedded", `
 background-color: var(--n-color-embedded);
 `)]), ja(I("card", `
 background: var(--n-color-modal);
 `, [K("embedded", `
 background-color: var(--n-color-embedded-modal);
 `)])), vd(I("card", `
 background: var(--n-color-popover);
 `, [K("embedded", `
 background-color: var(--n-color-embedded-popover);
 `)]))]), kf = window.Vue.computed, j_ = window.Vue.defineComponent, Bn = window.Vue.h, Wd = {
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
}, W_ = lo(Wd), U_ = Object.assign(Object.assign({}, ke.props), Wd), Gv = j_({
  name: "Card",
  props: U_,
  slots: Object,
  setup(e) {
    const t = () => {
      const {
        onClose: d
      } = e;
      d && re(d);
    }, {
      inlineThemeDisabled: n,
      mergedClsPrefixRef: o,
      mergedRtlRef: r
    } = qe(e), i = ke("Card", "-card", H_, qv, e, o), l = zt("Card", r, o), a = kf(() => {
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
          lineHeight: x,
          closeIconColor: y,
          closeIconColorHover: C,
          closeIconColorPressed: S,
          closeColorHover: b,
          closeColorPressed: R,
          closeBorderRadius: $,
          closeIconSize: T,
          closeSize: H,
          boxShadow: P,
          colorPopover: z,
          colorEmbedded: M,
          colorEmbeddedModal: O,
          colorEmbeddedPopover: U,
          [oe("padding", d)]: L,
          [oe("fontSize", d)]: Y,
          [oe("titleFontSize", d)]: te
        },
        common: {
          cubicBezierEaseInOut: J
        }
      } = i.value, {
        top: X,
        left: A,
        bottom: G
      } = Gt(L);
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
        "--n-line-height": x,
        "--n-action-color": u,
        "--n-title-text-color": f,
        "--n-title-font-weight": m,
        "--n-close-icon-color": y,
        "--n-close-icon-color-hover": C,
        "--n-close-icon-color-pressed": S,
        "--n-close-color-hover": b,
        "--n-close-color-pressed": R,
        "--n-border-color": g,
        "--n-box-shadow": P,
        // size
        "--n-padding-top": X,
        "--n-padding-bottom": G,
        "--n-padding-left": A,
        "--n-font-size": Y,
        "--n-title-font-size": te,
        "--n-close-size": H,
        "--n-close-icon-size": T,
        "--n-close-border-radius": $
      };
    }), s = n ? yt("card", kf(() => e.size[0]), a, e) : void 0;
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
    return i == null || i(), Bn(a, {
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
    }, dt(s.cover, (d) => {
      const c = this.cover ? hn([this.cover()]) : d;
      return c && Bn("div", {
        class: `${o}-card-cover`,
        role: "none"
      }, c);
    }), dt(s.header, (d) => {
      const {
        title: c
      } = this, h = c ? hn(typeof c == "function" ? [c()] : [c]) : d;
      return h || this.closable ? Bn("div", {
        class: [`${o}-card-header`, this.headerClass],
        style: this.headerStyle,
        role: "heading"
      }, Bn("div", {
        class: `${o}-card-header__main`,
        role: "heading"
      }, h), dt(s["header-extra"], (p) => {
        const v = this.headerExtra ? hn([this.headerExtra()]) : p;
        return v && Bn("div", {
          class: [`${o}-card-header__extra`, this.headerExtraClass],
          style: this.headerExtraStyle
        }, v);
      }), this.closable && Bn(Ld, {
        clsPrefix: o,
        class: `${o}-card-header__close`,
        onClick: this.handleCloseClick,
        focusable: this.closeFocusable,
        absolute: !0
      })) : null;
    }), dt(s.default, (d) => {
      const {
        content: c
      } = this, h = c ? hn(typeof c == "function" ? [c()] : [c]) : d;
      return h && Bn("div", {
        class: [`${o}-card__content`, this.contentClass],
        style: this.contentStyle,
        role: "none"
      }, h);
    }), dt(s.footer, (d) => {
      const c = this.footer ? hn([this.footer()]) : d;
      return c && Bn("div", {
        class: [`${o}-card__footer`, this.footerClass],
        style: this.footerStyle,
        role: "none"
      }, c);
    }), dt(s.action, (d) => {
      const c = this.action ? hn([this.action()]) : d;
      return c && Bn("div", {
        class: `${o}-card__action`,
        role: "none"
      }, c);
    }));
  }
}), K_ = {
  sizeSmall: "14px",
  sizeMedium: "16px",
  sizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function q_(e) {
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
  return Object.assign(Object.assign({}, K_), {
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
    boxShadowFocus: `0 0 0 2px ${Te(s, {
      alpha: 0.3
    })}`,
    textColor: d,
    textColorDisabled: l
  });
}
const Xv = {
  name: "Checkbox",
  common: mt,
  self: q_
}, ql = window.Vue.computed, G_ = window.Vue.defineComponent, X_ = window.Vue.h, Y_ = window.Vue.provide, Z_ = window.Vue.ref, Pf = window.Vue.toRef;
window.Vue.watchEffect;
const Yv = "n-checkbox-group", J_ = {
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
}, Q_ = G_({
  name: "CheckboxGroup",
  props: J_,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = qe(e), n = Io(e), {
      mergedSizeRef: o,
      mergedDisabledRef: r
    } = n, i = Z_(e.defaultValue), l = ql(() => e.value), a = Xt(l, i), s = ql(() => {
      var h;
      return ((h = a.value) === null || h === void 0 ? void 0 : h.length) || 0;
    }), d = ql(() => Array.isArray(a.value) ? new Set(a.value) : /* @__PURE__ */ new Set());
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
        const w = Array.from(a.value), x = w.findIndex((y) => y === p);
        h ? ~x || (w.push(p), u && re(u, w, {
          actionType: "check",
          value: p
        }), g && re(g, w, {
          actionType: "check",
          value: p
        }), v(), f(), i.value = w, m && re(m, w)) : ~x && (w.splice(x, 1), u && re(u, w, {
          actionType: "uncheck",
          value: p
        }), g && re(g, w, {
          actionType: "uncheck",
          value: p
        }), m && re(m, w), i.value = w, v(), f());
      } else
        h ? (u && re(u, [p], {
          actionType: "check",
          value: p
        }), g && re(g, [p], {
          actionType: "check",
          value: p
        }), m && re(m, [p]), i.value = [p], v(), f()) : (u && re(u, [], {
          actionType: "uncheck",
          value: p
        }), g && re(g, [], {
          actionType: "uncheck",
          value: p
        }), m && re(m, []), i.value = [], v(), f());
    }
    return Y_(Yv, {
      checkedCountRef: s,
      maxRef: Pf(e, "max"),
      minRef: Pf(e, "min"),
      valueSetRef: d,
      disabledRef: r,
      mergedSizeRef: o,
      toggleCheckbox: c
    }), {
      mergedClsPrefix: t
    };
  },
  render() {
    return X_("div", {
      class: `${this.mergedClsPrefix}-checkbox-group`,
      role: "group"
    }, this.$slots);
  }
}), _f = window.Vue.h, eT = () => _f("svg", {
  viewBox: "0 0 64 64",
  class: "check-icon"
}, _f("path", {
  d: "M50.42,16.76L22.34,39.45l-8.1-11.46c-1.12-1.58-3.3-1.96-4.88-0.84c-1.58,1.12-1.95,3.3-0.84,4.88l10.26,14.51  c0.56,0.79,1.42,1.31,2.38,1.45c0.16,0.02,0.32,0.03,0.48,0.03c0.8,0,1.57-0.27,2.2-0.78l30.99-25.03c1.5-1.21,1.74-3.42,0.52-4.92  C54.13,15.78,51.93,15.55,50.42,16.76z"
})), Tf = window.Vue.h, tT = () => Tf("svg", {
  viewBox: "0 0 100 100",
  class: "line-icon"
}, Tf("path", {
  d: "M80.2,55.5H21.4c-2.8,0-5.1-2.5-5.1-5.5l0,0c0-3,2.3-5.5,5.1-5.5h58.7c2.8,0,5.1,2.5,5.1,5.5l0,0C85.2,53.1,82.9,55.5,80.2,55.5z"
})), nT = D([
  I("checkbox", `
 font-size: var(--n-font-size);
 outline: none;
 cursor: pointer;
 display: inline-flex;
 flex-wrap: nowrap;
 align-items: flex-start;
 word-break: break-word;
 line-height: var(--n-size);
 --n-merged-color-table: var(--n-color-table);
 `, [K("show-label", "line-height: var(--n-label-line-height);"), D("&:hover", [I("checkbox-box", [N("border", "border: var(--n-border-checked);")])]), D("&:focus:not(:active)", [I("checkbox-box", [N("border", `
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), K("inside-table", [I("checkbox-box", `
 background-color: var(--n-merged-color-table);
 `)]), K("checked", [I("checkbox-box", `
 background-color: var(--n-color-checked);
 `, [I("checkbox-icon", [
    // if not set width to 100%, safari & old chrome won't display the icon
    D(".check-icon", `
 opacity: 1;
 transform: scale(1);
 `)
  ])])]), K("indeterminate", [I("checkbox-box", [I("checkbox-icon", [D(".check-icon", `
 opacity: 0;
 transform: scale(.5);
 `), D(".line-icon", `
 opacity: 1;
 transform: scale(1);
 `)])])]), K("checked, indeterminate", [D("&:focus:not(:active)", [I("checkbox-box", [N("border", `
 border: var(--n-border-checked);
 box-shadow: var(--n-box-shadow-focus);
 `)])]), I("checkbox-box", `
 background-color: var(--n-color-checked);
 border-left: 0;
 border-top: 0;
 `, [N("border", {
    border: "var(--n-border-checked)"
  })])]), K("disabled", {
    cursor: "not-allowed"
  }, [K("checked", [I("checkbox-box", `
 background-color: var(--n-color-disabled-checked);
 `, [N("border", {
    border: "var(--n-border-disabled-checked)"
  }), I("checkbox-icon", [D(".check-icon, .line-icon", {
    fill: "var(--n-check-mark-color-disabled-checked)"
  })])])]), I("checkbox-box", `
 background-color: var(--n-color-disabled);
 `, [N("border", `
 border: var(--n-border-disabled);
 `), I("checkbox-icon", [D(".check-icon, .line-icon", `
 fill: var(--n-check-mark-color-disabled);
 `)])]), N("label", `
 color: var(--n-text-color-disabled);
 `)]), I("checkbox-box-wrapper", `
 position: relative;
 width: var(--n-size);
 flex-shrink: 0;
 flex-grow: 0;
 user-select: none;
 -webkit-user-select: none;
 `), I("checkbox-box", `
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
 `, [N("border", `
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
 `), I("checkbox-icon", `
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
 `), Sn({
    left: "1px",
    top: "1px"
  })])]), N("label", `
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
  ja(I("checkbox", `
 --n-merged-color-table: var(--n-color-table-modal);
 `)),
  // popover table header checkbox
  vd(I("checkbox", `
 --n-merged-color-table: var(--n-color-table-popover);
 `))
]), Ff = window.Vue.computed, oT = window.Vue.defineComponent, Jn = window.Vue.h, rT = window.Vue.inject, Ef = window.Vue.ref, iT = window.Vue.toRef;
window.Vue.watchEffect;
const aT = Object.assign(Object.assign({}, ke.props), {
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
}), Ud = oT({
  name: "Checkbox",
  props: aT,
  setup(e) {
    const t = rT(Yv, null), n = Ef(null), {
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = qe(e), l = Ef(e.defaultChecked), a = iT(e, "checked"), s = Xt(a, l), d = Le(() => {
      if (t) {
        const S = t.valueSetRef.value;
        return S && e.value !== void 0 ? S.has(e.value) : !1;
      } else
        return s.value === e.checkedValue;
    }), c = Io(e, {
      mergedSize(S) {
        const {
          size: b
        } = e;
        if (b !== void 0) return b;
        if (t) {
          const {
            value: R
          } = t.mergedSizeRef;
          if (R !== void 0)
            return R;
        }
        if (S) {
          const {
            mergedSize: R
          } = S;
          if (R !== void 0) return R.value;
        }
        return "medium";
      },
      mergedDisabled(S) {
        const {
          disabled: b
        } = e;
        if (b !== void 0) return b;
        if (t) {
          if (t.disabledRef.value) return !0;
          const {
            maxRef: {
              value: R
            },
            checkedCountRef: $
          } = t;
          if (R !== void 0 && $.value >= R && !d.value)
            return !0;
          const {
            minRef: {
              value: T
            }
          } = t;
          if (T !== void 0 && $.value <= T && d.value)
            return !0;
        }
        return S ? S.disabled.value : !1;
      }
    }), {
      mergedDisabledRef: h,
      mergedSizeRef: p
    } = c, v = ke("Checkbox", "-checkbox", nT, Xv, e, o);
    function f(S) {
      if (t && e.value !== void 0)
        t.toggleCheckbox(!d.value, e.value);
      else {
        const {
          onChange: b,
          "onUpdate:checked": R,
          onUpdateChecked: $
        } = e, {
          nTriggerFormInput: T,
          nTriggerFormChange: H
        } = c, P = d.value ? e.uncheckedValue : e.checkedValue;
        R && re(R, P, S), $ && re($, P, S), b && re(b, P, S), T(), H(), l.value = P;
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
    }, x = zt("Checkbox", i, o), y = Ff(() => {
      const {
        value: S
      } = p, {
        common: {
          cubicBezierEaseInOut: b
        },
        self: {
          borderRadius: R,
          color: $,
          colorChecked: T,
          colorDisabled: H,
          colorTableHeader: P,
          colorTableHeaderModal: z,
          colorTableHeaderPopover: M,
          checkMarkColor: O,
          checkMarkColorDisabled: U,
          border: L,
          borderFocus: Y,
          borderDisabled: te,
          borderChecked: J,
          boxShadowFocus: X,
          textColor: A,
          textColorDisabled: G,
          checkMarkColorDisabledChecked: Z,
          colorDisabledChecked: ie,
          borderDisabledChecked: ae,
          labelPadding: ue,
          labelLineHeight: be,
          labelFontWeight: q,
          [oe("fontSize", S)]: se,
          [oe("size", S)]: Pe
        }
      } = v.value;
      return {
        "--n-label-line-height": be,
        "--n-label-font-weight": q,
        "--n-size": Pe,
        "--n-bezier": b,
        "--n-border-radius": R,
        "--n-border": L,
        "--n-border-checked": J,
        "--n-border-focus": Y,
        "--n-border-disabled": te,
        "--n-border-disabled-checked": ae,
        "--n-box-shadow-focus": X,
        "--n-color": $,
        "--n-color-checked": T,
        "--n-color-table": P,
        "--n-color-table-modal": z,
        "--n-color-table-popover": M,
        "--n-color-disabled": H,
        "--n-color-disabled-checked": ie,
        "--n-text-color": A,
        "--n-text-color-disabled": G,
        "--n-check-mark-color": O,
        "--n-check-mark-color-disabled": U,
        "--n-check-mark-color-disabled-checked": Z,
        "--n-font-size": se,
        "--n-label-padding": ue
      };
    }), C = r ? yt("checkbox", Ff(() => p.value[0]), y, e) : void 0;
    return Object.assign(c, w, {
      rtlEnabled: x,
      selfRef: n,
      mergedClsPrefix: o,
      mergedDisabled: h,
      renderedChecked: d,
      mergedTheme: v,
      labelId: ai(),
      handleClick: m,
      handleKeyUp: g,
      handleKeyDown: u,
      cssVars: r ? void 0 : y,
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
      handleClick: v
    } = this;
    (e = this.onRender) === null || e === void 0 || e.call(this);
    const f = dt(t.default, (m) => s || m ? Jn("span", {
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
        He("selectstart", window, (m) => {
          m.preventDefault();
        }, {
          once: !0
        });
      }
    }, Jn("div", {
      class: `${d}-checkbox-box-wrapper`
    }, " ", Jn("div", {
      class: `${d}-checkbox-box`
    }, Jn(gi, null, {
      default: () => this.indeterminate ? Jn("div", {
        key: "indeterminate",
        class: `${d}-checkbox-icon`
      }, tT()) : Jn("div", {
        key: "check",
        class: `${d}-checkbox-icon`
      }, eT())
    }), Jn("div", {
      class: `${d}-checkbox-box__border`
    }))), f);
  }
});
function lT(e) {
  const {
    boxShadow2: t
  } = e;
  return {
    menuBoxShadow: t
  };
}
const Kd = {
  name: "Popselect",
  common: mt,
  peers: {
    Popover: wr,
    InternalSelectMenu: Hd
  },
  self: lT
}, Zv = "n-popselect", sT = I("popselect-menu", `
 box-shadow: var(--n-menu-box-shadow);
`), Of = window.Vue.computed, dT = window.Vue.defineComponent, cT = window.Vue.h, uT = window.Vue.inject, zf = window.Vue.nextTick, fT = window.Vue.toRef, hT = window.Vue.watch;
window.Vue.watchEffect;
const qd = {
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
}, Mf = lo(qd), pT = dT({
  name: "PopselectPanel",
  props: qd,
  setup(e) {
    const t = uT(Zv), {
      mergedClsPrefixRef: n,
      inlineThemeDisabled: o
    } = qe(e), r = ke("Popselect", "-pop-select", sT, Kd, t.props, n), i = Of(() => Ya(e.options, Kv("value", "children")));
    function l(p, v) {
      const {
        onUpdateValue: f,
        "onUpdate:value": m,
        onChange: g
      } = e;
      f && re(f, p, v), m && re(m, p, v), g && re(g, p, v);
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
        m && re(m, !1), g && re(g, !1), t.setShow(!1);
      }
      zf(() => {
        t.syncPosition();
      });
    }
    hT(fT(e, "options"), () => {
      zf(() => {
        t.syncPosition();
      });
    });
    const c = Of(() => {
      const {
        self: {
          menuBoxShadow: p
        }
      } = r.value;
      return {
        "--n-menu-box-shadow": p
      };
    }), h = o ? yt("select", void 0, c, t.props) : void 0;
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
    return (e = this.onRender) === null || e === void 0 || e.call(this), cT(Vv, {
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
}), vT = window.Vue.defineComponent, If = window.Vue.h, mT = window.Vue.provide, gT = window.Vue.ref, bT = Object.assign(Object.assign(Object.assign(Object.assign({}, ke.props), Xp(hr, ["showArrow", "arrow"])), {
  placement: Object.assign(Object.assign({}, hr.placement), {
    default: "bottom"
  }),
  trigger: {
    type: String,
    default: "hover"
  }
}), qd), wT = vT({
  name: "Popselect",
  props: bT,
  slots: Object,
  inheritAttrs: !1,
  __popover__: !0,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = qe(e), n = ke("Popselect", "-popselect", void 0, Kd, e, t), o = gT(null);
    function r() {
      var a;
      (a = o.value) === null || a === void 0 || a.syncPosition();
    }
    function i(a) {
      var s;
      (s = o.value) === null || s === void 0 || s.setShow(a);
    }
    return mT(Zv, {
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
        return If(pT, Object.assign({}, a, {
          class: [a.class, n],
          style: [a.style, ...r]
        }, ao(this.$props, Mf), {
          ref: Gp(o),
          onMouseenter: Yr([i, a.onMouseenter]),
          onMouseleave: Yr([l, a.onMouseleave])
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
    return If(yi, Object.assign({}, Xp(this.$props, Mf), t, {
      internalDeactivateImmediately: !0
    }), {
      trigger: () => {
        var n, o;
        return (o = (n = this.$slots).default) === null || o === void 0 ? void 0 : o.call(n);
      }
    });
  }
});
function yT(e) {
  const {
    boxShadow2: t
  } = e;
  return {
    menuBoxShadow: t
  };
}
const Jv = {
  name: "Select",
  common: mt,
  peers: {
    InternalSelection: Nv,
    InternalSelectMenu: Hd
  },
  self: yT
}, xT = D([I("select", `
 z-index: auto;
 outline: none;
 width: 100%;
 position: relative;
 font-weight: var(--n-font-weight);
 `), I("select-menu", `
 margin: 4px 0;
 box-shadow: var(--n-menu-box-shadow);
 `, [wi({
  originalTransition: "background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier)"
})])]), xn = window.Vue.computed, CT = window.Vue.defineComponent, go = window.Vue.h, dn = window.Vue.ref, Gl = window.Vue.toRef, ST = window.Vue.Transition, $T = window.Vue.vShow, RT = window.Vue.watch;
window.Vue.watchEffect;
const kT = window.Vue.withDirectives, PT = Object.assign(Object.assign({}, ke.props), {
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
}), _T = CT({
  name: "Select",
  props: PT,
  slots: Object,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBorderedRef: n,
      namespaceRef: o,
      inlineThemeDisabled: r
    } = qe(e), i = ke("Select", "-select", xT, Jv, e, t), l = dn(e.defaultValue), a = Gl(e, "value"), s = Xt(a, l), d = dn(!1), c = dn(""), h = kp(e, ["items", "options"]), p = dn([]), v = dn([]), f = xn(() => v.value.concat(p.value).concat(h.value)), m = xn(() => {
      const {
        filter: k
      } = e;
      if (k) return k;
      const {
        labelField: B,
        valueField: Q
      } = e;
      return (le, de) => {
        if (!de) return !1;
        const pe = de[B];
        if (typeof pe == "string")
          return Ul(le, pe);
        const me = de[Q];
        return typeof me == "string" ? Ul(le, me) : typeof me == "number" ? Ul(le, String(me)) : !1;
      };
    }), g = xn(() => {
      if (e.remote)
        return h.value;
      {
        const {
          value: k
        } = f, {
          value: B
        } = c;
        return !B.length || !e.filterable ? k : E_(k, m.value, B, e.childrenField);
      }
    }), u = xn(() => {
      const {
        valueField: k,
        childrenField: B
      } = e, Q = Kv(k, B);
      return Ya(g.value, Q);
    }), w = xn(() => O_(f.value, e.valueField, e.childrenField)), x = dn(!1), y = Xt(Gl(e, "show"), x), C = dn(null), S = dn(null), b = dn(null), {
      localeRef: R
    } = mi("Select"), $ = xn(() => {
      var k;
      return (k = e.placeholder) !== null && k !== void 0 ? k : R.value.placeholder;
    }), T = [], H = dn(/* @__PURE__ */ new Map()), P = xn(() => {
      const {
        fallbackOption: k
      } = e;
      if (k === void 0) {
        const {
          labelField: B,
          valueField: Q
        } = e;
        return (le) => ({
          [B]: String(le),
          [Q]: le
        });
      }
      return k === !1 ? !1 : (B) => Object.assign(k(B), {
        value: B
      });
    });
    function z(k) {
      const B = e.remote, {
        value: Q
      } = H, {
        value: le
      } = w, {
        value: de
      } = P, pe = [];
      return k.forEach((me) => {
        if (le.has(me))
          pe.push(le.get(me));
        else if (B && Q.has(me))
          pe.push(Q.get(me));
        else if (de) {
          const xe = de(me);
          xe && pe.push(xe);
        }
      }), pe;
    }
    const M = xn(() => {
      if (e.multiple) {
        const {
          value: k
        } = s;
        return Array.isArray(k) ? z(k) : [];
      }
      return null;
    }), O = xn(() => {
      const {
        value: k
      } = s;
      return !e.multiple && !Array.isArray(k) ? k === null ? null : z([k])[0] || null : null;
    }), U = Io(e), {
      mergedSizeRef: L,
      mergedDisabledRef: Y,
      mergedStatusRef: te
    } = U;
    function J(k, B) {
      const {
        onChange: Q,
        "onUpdate:value": le,
        onUpdateValue: de
      } = e, {
        nTriggerFormChange: pe,
        nTriggerFormInput: me
      } = U;
      Q && re(Q, k, B), de && re(de, k, B), le && re(le, k, B), l.value = k, pe(), me();
    }
    function X(k) {
      const {
        onBlur: B
      } = e, {
        nTriggerFormBlur: Q
      } = U;
      B && re(B, k), Q();
    }
    function A() {
      const {
        onClear: k
      } = e;
      k && re(k);
    }
    function G(k) {
      const {
        onFocus: B,
        showOnFocus: Q
      } = e, {
        nTriggerFormFocus: le
      } = U;
      B && re(B, k), le(), Q && be();
    }
    function Z(k) {
      const {
        onSearch: B
      } = e;
      B && re(B, k);
    }
    function ie(k) {
      const {
        onScroll: B
      } = e;
      B && re(B, k);
    }
    function ae() {
      var k;
      const {
        remote: B,
        multiple: Q
      } = e;
      if (B) {
        const {
          value: le
        } = H;
        if (Q) {
          const {
            valueField: de
          } = e;
          (k = M.value) === null || k === void 0 || k.forEach((pe) => {
            le.set(pe[de], pe);
          });
        } else {
          const de = O.value;
          de && le.set(de[e.valueField], de);
        }
      }
    }
    function ue(k) {
      const {
        onUpdateShow: B,
        "onUpdate:show": Q
      } = e;
      B && re(B, k), Q && re(Q, k), x.value = k;
    }
    function be() {
      Y.value || (ue(!0), x.value = !0, e.filterable && Ze());
    }
    function q() {
      ue(!1);
    }
    function se() {
      c.value = "", v.value = T;
    }
    const Pe = dn(!1);
    function ve() {
      e.filterable && (Pe.value = !0);
    }
    function $e() {
      e.filterable && (Pe.value = !1, y.value || se());
    }
    function Se() {
      Y.value || (y.value ? e.filterable ? Ze() : q() : be());
    }
    function De(k) {
      var B, Q;
      !((Q = (B = b.value) === null || B === void 0 ? void 0 : B.selfRef) === null || Q === void 0) && Q.contains(k.relatedTarget) || (d.value = !1, X(k), q());
    }
    function Ie(k) {
      G(k), d.value = !0;
    }
    function Je() {
      d.value = !0;
    }
    function F(k) {
      var B;
      !((B = C.value) === null || B === void 0) && B.$el.contains(k.relatedTarget) || (d.value = !1, X(k), q());
    }
    function _() {
      var k;
      (k = C.value) === null || k === void 0 || k.focus(), q();
    }
    function W(k) {
      var B;
      y.value && (!((B = C.value) === null || B === void 0) && B.$el.contains(ur(k)) || q());
    }
    function ne(k) {
      if (!Array.isArray(k)) return [];
      if (P.value)
        return Array.from(k);
      {
        const {
          remote: B
        } = e, {
          value: Q
        } = w;
        if (B) {
          const {
            value: le
          } = H;
          return k.filter((de) => Q.has(de) || le.has(de));
        } else
          return k.filter((le) => Q.has(le));
      }
    }
    function ye(k) {
      he(k.rawNode);
    }
    function he(k) {
      if (Y.value) return;
      const {
        tag: B,
        remote: Q,
        clearFilterAfterSelect: le,
        valueField: de
      } = e;
      if (B && !Q) {
        const {
          value: pe
        } = v, me = pe[0] || null;
        if (me) {
          const xe = p.value;
          xe.length ? xe.push(me) : p.value = [me], v.value = T;
        }
      }
      if (Q && H.value.set(k[de], k), e.multiple) {
        const pe = ne(s.value), me = pe.findIndex((xe) => xe === k[de]);
        if (~me) {
          if (pe.splice(me, 1), B && !Q) {
            const xe = E(k[de]);
            ~xe && (p.value.splice(xe, 1), le && (c.value = ""));
          }
        } else
          pe.push(k[de]), le && (c.value = "");
        J(pe, z(pe));
      } else {
        if (B && !Q) {
          const pe = E(k[de]);
          ~pe ? p.value = [p.value[pe]] : p.value = T;
        }
        Ye(), q(), J(k[de], k);
      }
    }
    function E(k) {
      return p.value.findIndex((Q) => Q[e.valueField] === k);
    }
    function j(k) {
      y.value || be();
      const {
        value: B
      } = k.target;
      c.value = B;
      const {
        tag: Q,
        remote: le
      } = e;
      if (Z(B), Q && !le) {
        if (!B) {
          v.value = T;
          return;
        }
        const {
          onCreate: de
        } = e, pe = de ? de(B) : {
          [e.labelField]: B,
          [e.valueField]: B
        }, {
          valueField: me,
          labelField: xe
        } = e;
        h.value.some((ze) => ze[me] === pe[me] || ze[xe] === pe[xe]) || p.value.some((ze) => ze[me] === pe[me] || ze[xe] === pe[xe]) ? v.value = T : v.value = [pe];
      }
    }
    function fe(k) {
      k.stopPropagation();
      const {
        multiple: B
      } = e;
      !B && e.filterable && q(), A(), B ? J([], []) : J(null, null);
    }
    function _e(k) {
      !an(k, "action") && !an(k, "empty") && !an(k, "header") && k.preventDefault();
    }
    function at(k) {
      ie(k);
    }
    function vt(k) {
      var B, Q, le, de, pe;
      if (!e.keyboard) {
        k.preventDefault();
        return;
      }
      switch (k.key) {
        case " ":
          if (e.filterable)
            break;
          k.preventDefault();
        case "Enter":
          if (!(!((B = C.value) === null || B === void 0) && B.isComposing)) {
            if (y.value) {
              const me = (Q = b.value) === null || Q === void 0 ? void 0 : Q.getPendingTmNode();
              me ? ye(me) : e.filterable || (q(), Ye());
            } else if (be(), e.tag && Pe.value) {
              const me = v.value[0];
              if (me) {
                const xe = me[e.valueField], {
                  value: ze
                } = s;
                e.multiple && Array.isArray(ze) && ze.includes(xe) || he(me);
              }
            }
          }
          k.preventDefault();
          break;
        case "ArrowUp":
          if (k.preventDefault(), e.loading) return;
          y.value && ((le = b.value) === null || le === void 0 || le.prev());
          break;
        case "ArrowDown":
          if (k.preventDefault(), e.loading) return;
          y.value ? (de = b.value) === null || de === void 0 || de.next() : be();
          break;
        case "Escape":
          y.value && (Ox(k), q()), (pe = C.value) === null || pe === void 0 || pe.focus();
          break;
      }
    }
    function Ye() {
      var k;
      (k = C.value) === null || k === void 0 || k.focus();
    }
    function Ze() {
      var k;
      (k = C.value) === null || k === void 0 || k.focusInput();
    }
    function gt() {
      var k;
      y.value && ((k = S.value) === null || k === void 0 || k.syncPosition());
    }
    ae(), RT(Gl(e, "options"), ae);
    const Qe = {
      focus: () => {
        var k;
        (k = C.value) === null || k === void 0 || k.focus();
      },
      focusInput: () => {
        var k;
        (k = C.value) === null || k === void 0 || k.focusInput();
      },
      blur: () => {
        var k;
        (k = C.value) === null || k === void 0 || k.blur();
      },
      blurInput: () => {
        var k;
        (k = C.value) === null || k === void 0 || k.blurInput();
      }
    }, ce = xn(() => {
      const {
        self: {
          menuBoxShadow: k
        }
      } = i.value;
      return {
        "--n-menu-box-shadow": k
      };
    }), Ce = r ? yt("select", void 0, ce, e) : void 0;
    return Object.assign(Object.assign({}, Qe), {
      mergedStatus: te,
      mergedClsPrefix: t,
      mergedBordered: n,
      namespace: o,
      treeMate: u,
      isMounted: hi(),
      triggerRef: C,
      menuRef: b,
      pattern: c,
      uncontrolledShow: x,
      mergedShow: y,
      adjustedTo: Pn(e),
      uncontrolledValue: l,
      mergedValue: s,
      followerRef: S,
      localizedPlaceholder: $,
      selectedOption: O,
      selectedOptions: M,
      mergedSize: L,
      mergedDisabled: Y,
      focused: d,
      activeWithoutMenuOpen: Pe,
      inlineThemeDisabled: r,
      onTriggerInputFocus: ve,
      onTriggerInputBlur: $e,
      handleTriggerOrMenuResize: gt,
      handleMenuFocus: Je,
      handleMenuBlur: F,
      handleMenuTabOut: _,
      handleTriggerClick: Se,
      handleToggle: ye,
      handleDeleteOption: he,
      handlePatternInput: j,
      handleClear: fe,
      handleTriggerBlur: De,
      handleTriggerFocus: Ie,
      handleKeydown: vt,
      handleMenuAfterLeave: se,
      handleMenuClickOutside: W,
      handleMenuScroll: at,
      handleMenuKeydown: vt,
      handleMenuMousedown: _e,
      mergedTheme: i,
      cssVars: r ? void 0 : ce,
      themeClass: Ce == null ? void 0 : Ce.themeClass,
      onRender: Ce == null ? void 0 : Ce.onRender
    });
  },
  render() {
    return go("div", {
      class: `${this.mergedClsPrefix}-select`
    }, go(wd, null, {
      default: () => [go(yd, null, {
        default: () => go(o_, {
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
      }), go(Sd, {
        ref: "followerRef",
        show: this.mergedShow,
        to: this.adjustedTo,
        teleportDisabled: this.adjustedTo === Pn.tdkey,
        containerClass: this.namespace,
        width: this.consistentMenuWidth ? "target" : void 0,
        minWidth: "target",
        placement: this.placement
      }, {
        default: () => go(ST, {
          name: "fade-in-scale-up-transition",
          appear: this.isMounted,
          onAfterLeave: this.handleMenuAfterLeave
        }, {
          default: () => {
            var e, t, n;
            return this.mergedShow || this.displayDirective === "show" ? ((e = this.onRender) === null || e === void 0 || e.call(this), kT(go(Vv, Object.assign({}, this.menuProps, {
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
            }), this.displayDirective === "show" ? [[$T, this.mergedShow], [li, this.handleMenuClickOutside, void 0, {
              capture: !0
            }]] : [[li, this.handleMenuClickOutside, void 0, {
              capture: !0
            }]])) : null;
          }
        })
      })]
    }));
  }
}), TT = {
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
function FT(e) {
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
  return Object.assign(Object.assign({}, TT), {
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
const Qv = {
  name: "Pagination",
  common: mt,
  peers: {
    Select: Jv,
    Input: jv,
    Popselect: Kd
  },
  self: FT
}, Af = `
 background: var(--n-item-color-hover);
 color: var(--n-item-text-color-hover);
 border: var(--n-item-border-hover);
`, Vf = [K("button", `
 background: var(--n-button-color-hover);
 border: var(--n-button-border-hover);
 color: var(--n-button-icon-color-hover);
 `)], ET = I("pagination", `
 display: flex;
 vertical-align: middle;
 font-size: var(--n-item-font-size);
 flex-wrap: nowrap;
`, [I("pagination-prefix", `
 display: flex;
 align-items: center;
 margin: var(--n-prefix-margin);
 `), I("pagination-suffix", `
 display: flex;
 align-items: center;
 margin: var(--n-suffix-margin);
 `), D("> *:not(:first-child)", `
 margin: var(--n-item-margin);
 `), I("select", `
 width: var(--n-select-width);
 `), D("&.transition-disabled", [I("pagination-item", "transition: none!important;")]), I("pagination-quick-jumper", `
 white-space: nowrap;
 display: flex;
 color: var(--n-jumper-text-color);
 transition: color .3s var(--n-bezier);
 align-items: center;
 font-size: var(--n-jumper-font-size);
 `, [I("input", `
 margin: var(--n-input-margin);
 width: var(--n-input-width);
 `)]), I("pagination-item", `
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
 `, [I("base-icon", `
 font-size: var(--n-button-icon-size);
 `)]), ot("disabled", [K("hover", Af, Vf), D("&:hover", Af, Vf), D("&:active", `
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
 `, [D("&:hover", `
 background: var(--n-item-color-active-hover);
 `)])]), K("disabled", `
 cursor: not-allowed;
 color: var(--n-item-text-color-disabled);
 `, [K("active, button", `
 background-color: var(--n-item-color-disabled);
 border: var(--n-item-border-disabled);
 `)])]), K("disabled", `
 cursor: not-allowed;
 `, [I("pagination-quick-jumper", `
 color: var(--n-jumper-text-color-disabled);
 `)]), K("simple", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 `, [I("pagination-quick-jumper", [I("input", `
 margin: 0;
 `)])])]);
function em(e) {
  var t;
  if (!e) return 10;
  const {
    defaultPageSize: n
  } = e;
  if (n !== void 0) return n;
  const o = (t = e.pageSizes) === null || t === void 0 ? void 0 : t[0];
  return typeof o == "number" ? o : (o == null ? void 0 : o.value) || 10;
}
function OT(e, t, n, o) {
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
    options: o ? Bf(s + 1, c - 1) : null
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
    options: o ? Bf(h + 1, d - 1) : null
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
function Bf(e, t) {
  const n = [];
  for (let o = e; o <= t; ++o)
    n.push({
      label: `${o}`,
      value: o
    });
  return n;
}
const cn = window.Vue.computed, zT = window.Vue.defineComponent, Lf = window.Vue.Fragment, Ge = window.Vue.h, MT = window.Vue.nextTick, Qn = window.Vue.ref, Df = window.Vue.toRef, Xl = window.Vue.watchEffect, IT = Object.assign(Object.assign({}, ke.props), {
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
}), AT = zT({
  name: "Pagination",
  props: IT,
  slots: Object,
  setup(e) {
    const {
      mergedComponentPropsRef: t,
      mergedClsPrefixRef: n,
      inlineThemeDisabled: o,
      mergedRtlRef: r
    } = qe(e), i = ke("Pagination", "-pagination", ET, Qv, e, n), {
      localeRef: l
    } = mi("Pagination"), a = Qn(null), s = Qn(e.defaultPage), d = Qn(em(e)), c = Xt(Df(e, "page"), s), h = Xt(Df(e, "pageSize"), d), p = cn(() => {
      const {
        itemCount: q
      } = e;
      if (q !== void 0)
        return Math.max(1, Math.ceil(q / h.value));
      const {
        pageCount: se
      } = e;
      return se !== void 0 ? Math.max(se, 1) : 1;
    }), v = Qn("");
    Xl(() => {
      e.simple, v.value = String(c.value);
    });
    const f = Qn(!1), m = Qn(!1), g = Qn(!1), u = Qn(!1), w = () => {
      e.disabled || (f.value = !0, O());
    }, x = () => {
      e.disabled || (f.value = !1, O());
    }, y = () => {
      m.value = !0, O();
    }, C = () => {
      m.value = !1, O();
    }, S = (q) => {
      U(q);
    }, b = cn(() => OT(c.value, p.value, e.pageSlot, e.showQuickJumpDropdown));
    Xl(() => {
      b.value.hasFastBackward ? b.value.hasFastForward || (f.value = !1, g.value = !1) : (m.value = !1, u.value = !1);
    });
    const R = cn(() => {
      const q = l.value.selectionSuffix;
      return e.pageSizes.map((se) => typeof se == "number" ? {
        label: `${se} / ${q}`,
        value: se
      } : se);
    }), $ = cn(() => {
      var q, se;
      return ((se = (q = t == null ? void 0 : t.value) === null || q === void 0 ? void 0 : q.Pagination) === null || se === void 0 ? void 0 : se.inputSize) || xu(e.size);
    }), T = cn(() => {
      var q, se;
      return ((se = (q = t == null ? void 0 : t.value) === null || q === void 0 ? void 0 : q.Pagination) === null || se === void 0 ? void 0 : se.selectSize) || xu(e.size);
    }), H = cn(() => (c.value - 1) * h.value), P = cn(() => {
      const q = c.value * h.value - 1, {
        itemCount: se
      } = e;
      return se !== void 0 && q > se - 1 ? se - 1 : q;
    }), z = cn(() => {
      const {
        itemCount: q
      } = e;
      return q !== void 0 ? q : (e.pageCount || 1) * h.value;
    }), M = zt("Pagination", r, n);
    function O() {
      MT(() => {
        var q;
        const {
          value: se
        } = a;
        se && (se.classList.add("transition-disabled"), (q = a.value) === null || q === void 0 || q.offsetWidth, se.classList.remove("transition-disabled"));
      });
    }
    function U(q) {
      if (q === c.value) return;
      const {
        "onUpdate:page": se,
        onUpdatePage: Pe,
        onChange: ve,
        simple: $e
      } = e;
      se && re(se, q), Pe && re(Pe, q), ve && re(ve, q), s.value = q, $e && (v.value = String(q));
    }
    function L(q) {
      if (q === h.value) return;
      const {
        "onUpdate:pageSize": se,
        onUpdatePageSize: Pe,
        onPageSizeChange: ve
      } = e;
      se && re(se, q), Pe && re(Pe, q), ve && re(ve, q), d.value = q, p.value < c.value && U(p.value);
    }
    function Y() {
      if (e.disabled) return;
      const q = Math.min(c.value + 1, p.value);
      U(q);
    }
    function te() {
      if (e.disabled) return;
      const q = Math.max(c.value - 1, 1);
      U(q);
    }
    function J() {
      if (e.disabled) return;
      const q = Math.min(b.value.fastForwardTo, p.value);
      U(q);
    }
    function X() {
      if (e.disabled) return;
      const q = Math.max(b.value.fastBackwardTo, 1);
      U(q);
    }
    function A(q) {
      L(q);
    }
    function G() {
      const q = Number.parseInt(v.value);
      Number.isNaN(q) || (U(Math.max(1, Math.min(q, p.value))), e.simple || (v.value = ""));
    }
    function Z() {
      G();
    }
    function ie(q) {
      if (!e.disabled)
        switch (q.type) {
          case "page":
            U(q.label);
            break;
          case "fast-backward":
            X();
            break;
          case "fast-forward":
            J();
            break;
        }
    }
    function ae(q) {
      v.value = q.replace(/\D+/g, "");
    }
    Xl(() => {
      c.value, h.value, O();
    });
    const ue = cn(() => {
      const {
        size: q
      } = e, {
        self: {
          buttonBorder: se,
          buttonBorderHover: Pe,
          buttonBorderPressed: ve,
          buttonIconColor: $e,
          buttonIconColorHover: Se,
          buttonIconColorPressed: De,
          itemTextColor: Ie,
          itemTextColorHover: Je,
          itemTextColorPressed: F,
          itemTextColorActive: _,
          itemTextColorDisabled: W,
          itemColor: ne,
          itemColorHover: ye,
          itemColorPressed: he,
          itemColorActive: E,
          itemColorActiveHover: j,
          itemColorDisabled: fe,
          itemBorder: _e,
          itemBorderHover: at,
          itemBorderPressed: vt,
          itemBorderActive: Ye,
          itemBorderDisabled: Ze,
          itemBorderRadius: gt,
          jumperTextColor: Qe,
          jumperTextColorDisabled: ce,
          buttonColor: Ce,
          buttonColorHover: k,
          buttonColorPressed: B,
          [oe("itemPadding", q)]: Q,
          [oe("itemMargin", q)]: le,
          [oe("inputWidth", q)]: de,
          [oe("selectWidth", q)]: pe,
          [oe("inputMargin", q)]: me,
          [oe("selectMargin", q)]: xe,
          [oe("jumperFontSize", q)]: ze,
          [oe("prefixMargin", q)]: nt,
          [oe("suffixMargin", q)]: Ne,
          [oe("itemSize", q)]: Pt,
          [oe("buttonIconSize", q)]: Mt,
          [oe("itemFontSize", q)]: It,
          [`${oe("itemMargin", q)}Rtl`]: Nt,
          [`${oe("inputMargin", q)}Rtl`]: Ht
        },
        common: {
          cubicBezierEaseInOut: Qt
        }
      } = i.value;
      return {
        "--n-prefix-margin": nt,
        "--n-suffix-margin": Ne,
        "--n-item-font-size": It,
        "--n-select-width": pe,
        "--n-select-margin": xe,
        "--n-input-width": de,
        "--n-input-margin": me,
        "--n-input-margin-rtl": Ht,
        "--n-item-size": Pt,
        "--n-item-text-color": Ie,
        "--n-item-text-color-disabled": W,
        "--n-item-text-color-hover": Je,
        "--n-item-text-color-active": _,
        "--n-item-text-color-pressed": F,
        "--n-item-color": ne,
        "--n-item-color-hover": ye,
        "--n-item-color-disabled": fe,
        "--n-item-color-active": E,
        "--n-item-color-active-hover": j,
        "--n-item-color-pressed": he,
        "--n-item-border": _e,
        "--n-item-border-hover": at,
        "--n-item-border-disabled": Ze,
        "--n-item-border-active": Ye,
        "--n-item-border-pressed": vt,
        "--n-item-padding": Q,
        "--n-item-border-radius": gt,
        "--n-bezier": Qt,
        "--n-jumper-font-size": ze,
        "--n-jumper-text-color": Qe,
        "--n-jumper-text-color-disabled": ce,
        "--n-item-margin": le,
        "--n-item-margin-rtl": Nt,
        "--n-button-icon-size": Mt,
        "--n-button-icon-color": $e,
        "--n-button-icon-color-hover": Se,
        "--n-button-icon-color-pressed": De,
        "--n-button-color-hover": k,
        "--n-button-color": Ce,
        "--n-button-color-pressed": B,
        "--n-button-border": se,
        "--n-button-border-hover": Pe,
        "--n-button-border-pressed": ve
      };
    }), be = o ? yt("pagination", cn(() => {
      let q = "";
      const {
        size: se
      } = e;
      return q += se[0], q;
    }), ue, e) : void 0;
    return {
      rtlEnabled: M,
      mergedClsPrefix: n,
      locale: l,
      selfRef: a,
      mergedPage: c,
      pageItems: cn(() => b.value.items),
      mergedItemCount: z,
      jumperValue: v,
      pageSizeOptions: R,
      mergedPageSize: h,
      inputSize: $,
      selectSize: T,
      mergedTheme: i,
      mergedPageCount: p,
      startIndex: H,
      endIndex: P,
      showFastForwardMenu: g,
      showFastBackwardMenu: u,
      fastForwardActive: f,
      fastBackwardActive: m,
      handleMenuSelect: S,
      handleFastForwardMouseenter: w,
      handleFastForwardMouseleave: x,
      handleFastBackwardMouseenter: y,
      handleFastBackwardMouseleave: C,
      handleJumperInput: ae,
      handleBackwardClick: te,
      handleForwardClick: Y,
      handlePageItemClick: ie,
      handleSizePickerChange: A,
      handleQuickJumperChange: Z,
      cssVars: o ? void 0 : ue,
      themeClass: be == null ? void 0 : be.themeClass,
      onRender: be == null ? void 0 : be.onRender
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
      prefix: x,
      suffix: y,
      label: C,
      goto: S,
      handleJumperInput: b,
      handleSizePickerChange: R,
      handleBackwardClick: $,
      handlePageItemClick: T,
      handleForwardClick: H,
      handleQuickJumperChange: P,
      onRender: z
    } = this;
    z == null || z();
    const M = x || e.prefix, O = y || e.suffix, U = u || e.prev, L = w || e.next, Y = C || e.label;
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
    })) : null, this.displayOrder.map((te) => {
      switch (te) {
        case "pages":
          return Ge(Lf, null, Ge("div", {
            class: [`${t}-pagination-item`, !U && `${t}-pagination-item--button`, (r <= 1 || r > i || n) && `${t}-pagination-item--disabled`],
            onClick: $
          }, U ? U({
            page: r,
            pageSize: v,
            pageCount: i,
            startIndex: this.startIndex,
            endIndex: this.endIndex,
            itemCount: this.mergedItemCount
          }) : Ge($t, {
            clsPrefix: t
          }, {
            default: () => this.rtlEnabled ? Ge(of, null) : Ge(Zu, null)
          })), g ? Ge(Lf, null, Ge("div", {
            class: `${t}-pagination-quick-jumper`
          }, Ge(yo, {
            value: m,
            onUpdateValue: b,
            size: h,
            placeholder: "",
            disabled: n,
            theme: d.peers.Input,
            themeOverrides: d.peerOverrides.Input,
            onChange: P
          })), " /", " ", i) : l.map((J, X) => {
            let A, G, Z;
            const {
              type: ie
            } = J;
            switch (ie) {
              case "page":
                const ue = J.label;
                Y ? A = Y({
                  type: "page",
                  node: ue,
                  active: J.active
                }) : A = ue;
                break;
              case "fast-forward":
                const be = this.fastForwardActive ? Ge($t, {
                  clsPrefix: t
                }, {
                  default: () => this.rtlEnabled ? Ge(ef, null) : Ge(tf, null)
                }) : Ge($t, {
                  clsPrefix: t
                }, {
                  default: () => Ge(af, null)
                });
                Y ? A = Y({
                  type: "fast-forward",
                  node: be,
                  active: this.fastForwardActive || this.showFastForwardMenu
                }) : A = be, G = this.handleFastForwardMouseenter, Z = this.handleFastForwardMouseleave;
                break;
              case "fast-backward":
                const q = this.fastBackwardActive ? Ge($t, {
                  clsPrefix: t
                }, {
                  default: () => this.rtlEnabled ? Ge(tf, null) : Ge(ef, null)
                }) : Ge($t, {
                  clsPrefix: t
                }, {
                  default: () => Ge(af, null)
                });
                Y ? A = Y({
                  type: "fast-backward",
                  node: q,
                  active: this.fastBackwardActive || this.showFastBackwardMenu
                }) : A = q, G = this.handleFastBackwardMouseenter, Z = this.handleFastBackwardMouseleave;
                break;
            }
            const ae = Ge("div", {
              key: X,
              class: [`${t}-pagination-item`, J.active && `${t}-pagination-item--active`, ie !== "page" && (ie === "fast-backward" && this.showFastBackwardMenu || ie === "fast-forward" && this.showFastForwardMenu) && `${t}-pagination-item--hover`, n && `${t}-pagination-item--disabled`, ie === "page" && `${t}-pagination-item--clickable`],
              onClick: () => {
                T(J);
              },
              onMouseenter: G,
              onMouseleave: Z
            }, A);
            if (ie === "page" && !J.mayBeFastBackward && !J.mayBeFastForward)
              return ae;
            {
              const ue = J.type === "page" ? J.mayBeFastBackward ? "fast-backward" : "fast-forward" : J.type;
              return J.type !== "page" && !J.options ? ae : Ge(wT, {
                to: this.to,
                key: ue,
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
                show: ie === "page" ? !1 : ie === "fast-backward" ? this.showFastBackwardMenu : this.showFastForwardMenu,
                onUpdateShow: (be) => {
                  ie !== "page" && (be ? ie === "fast-backward" ? this.showFastBackwardMenu = be : this.showFastForwardMenu = be : (this.showFastBackwardMenu = !1, this.showFastForwardMenu = !1));
                },
                options: J.type !== "page" && J.options ? J.options : [],
                onUpdateValue: this.handleMenuSelect,
                scrollable: !0,
                showCheckmark: !1
              }, {
                default: () => ae
              });
            }
          }), Ge("div", {
            class: [`${t}-pagination-item`, !L && `${t}-pagination-item--button`, {
              [`${t}-pagination-item--disabled`]: r < 1 || r >= i || n
            }],
            onClick: H
          }, L ? L({
            page: r,
            pageSize: v,
            pageCount: i,
            itemCount: this.mergedItemCount,
            startIndex: this.startIndex,
            endIndex: this.endIndex
          }) : Ge($t, {
            clsPrefix: t
          }, {
            default: () => this.rtlEnabled ? Ge(Zu, null) : Ge(of, null)
          })));
        case "size-picker":
          return !g && a ? Ge(_T, Object.assign({
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
            onUpdateValue: R
          })) : null;
        case "quick-jumper":
          return !g && s ? Ge("div", {
            class: `${t}-pagination-quick-jumper`
          }, S ? S() : vn(this.$slots.goto, () => [c.goto]), Ge(yo, {
            value: m,
            onUpdateValue: b,
            size: h,
            placeholder: "",
            disabled: n,
            theme: d.peers.Input,
            themeOverrides: d.peerOverrides.Input,
            onChange: P
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
}), VT = {
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
function BT(e) {
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
  return Object.assign(Object.assign({}, VT), {
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
    optionColorActive: Te(t, {
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
const tm = {
  name: "Dropdown",
  common: mt,
  peers: {
    Popover: wr
  },
  self: BT
}, LT = {
  padding: "8px 14px"
};
function DT(e) {
  const {
    borderRadius: t,
    boxShadow2: n,
    baseColor: o
  } = e;
  return Object.assign(Object.assign({}, LT), {
    borderRadius: t,
    boxShadow: n,
    color: We(o, "rgba(0, 0, 0, .85)"),
    textColor: o
  });
}
const nm = {
  name: "Tooltip",
  common: mt,
  peers: {
    Popover: wr
  },
  self: DT
}, om = {
  name: "Ellipsis",
  common: mt,
  peers: {
    Tooltip: nm
  }
}, NT = {
  radioSizeSmall: "14px",
  radioSizeMedium: "16px",
  radioSizeLarge: "18px",
  labelPadding: "0 8px",
  labelFontWeight: "400"
};
function HT(e) {
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
  return Object.assign(Object.assign({}, NT), {
    labelLineHeight: m,
    buttonHeightSmall: p,
    buttonHeightMedium: v,
    buttonHeightLarge: f,
    fontSizeSmall: d,
    fontSizeMedium: c,
    fontSizeLarge: h,
    boxShadow: `inset 0 0 0 1px ${t}`,
    boxShadowActive: `inset 0 0 0 1px ${n}`,
    boxShadowFocus: `inset 0 0 0 1px ${n}, 0 0 0 2px ${Te(n, {
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
    buttonBoxShadowFocus: `inset 0 0 0 1px ${n}, 0 0 0 2px ${Te(n, {
      alpha: 0.3
    })}`,
    buttonBoxShadowHover: "inset 0 0 0 1px #0000",
    buttonBoxShadow: "inset 0 0 0 1px #0000",
    buttonBorderRadius: s
  });
}
const Gd = {
  name: "Radio",
  common: mt,
  self: HT
}, jT = {
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
function WT(e) {
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
    tableColorStriped: x
  } = e;
  return Object.assign(Object.assign({}, jT), {
    actionDividerColor: g,
    lineHeight: p,
    borderRadius: h,
    fontSizeSmall: v,
    fontSizeMedium: f,
    fontSizeLarge: m,
    borderColor: We(t, g),
    tdColorHover: We(t, a),
    tdColorSorting: We(t, a),
    tdColorStriped: We(t, x),
    thColor: We(t, l),
    thColorHover: We(We(t, l), a),
    thColorSorting: We(We(t, l), a),
    tdColor: t,
    tdTextColor: r,
    thTextColor: i,
    thFontWeight: c,
    thButtonColorHover: a,
    thIconColor: s,
    thIconColorActive: d,
    // modal
    borderColorModal: We(n, g),
    tdColorHoverModal: We(n, a),
    tdColorSortingModal: We(n, a),
    tdColorStripedModal: We(n, x),
    thColorModal: We(n, l),
    thColorHoverModal: We(We(n, l), a),
    thColorSortingModal: We(We(n, l), a),
    tdColorModal: n,
    // popover
    borderColorPopover: We(o, g),
    tdColorHoverPopover: We(o, a),
    tdColorSortingPopover: We(o, a),
    tdColorStripedPopover: We(o, x),
    thColorPopover: We(o, l),
    thColorHoverPopover: We(We(o, l), a),
    thColorSortingPopover: We(We(o, l), a),
    tdColorPopover: o,
    boxShadowBefore: "inset -12px 0 8px -12px rgba(0, 0, 0, .18)",
    boxShadowAfter: "inset 12px 0 8px -12px rgba(0, 0, 0, .18)",
    // loading
    loadingColor: d,
    loadingSize: u,
    opacityLoading: w
  });
}
const UT = {
  name: "DataTable",
  common: mt,
  peers: {
    Button: jd,
    Checkbox: Xv,
    Radio: Gd,
    Pagination: Qv,
    Scrollbar: gr,
    Empty: Nd,
    Popover: wr,
    Ellipsis: om,
    Dropdown: tm
  },
  self: WT
}, KT = Object.assign(Object.assign({}, ke.props), {
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
}), mn = "n-data-table", rm = 40, im = 40;
function Nf(e) {
  if (e.type === "selection")
    return e.width === void 0 ? rm : Rn(e.width);
  if (e.type === "expand")
    return e.width === void 0 ? im : Rn(e.width);
  if (!("children" in e))
    return typeof e.width == "string" ? Rn(e.width) : e.width;
}
function qT(e) {
  var t, n;
  if (e.type === "selection")
    return Ct((t = e.width) !== null && t !== void 0 ? t : rm);
  if (e.type === "expand")
    return Ct((n = e.width) !== null && n !== void 0 ? n : im);
  if (!("children" in e))
    return Ct(e.width);
}
function fn(e) {
  return e.type === "selection" ? "__n_selection__" : e.type === "expand" ? "__n_expand__" : e.key;
}
function Hf(e) {
  return e && (typeof e == "object" ? Object.assign({}, e) : e);
}
function GT(e) {
  return e === "ascend" ? 1 : e === "descend" ? -1 : 0;
}
function XT(e, t, n) {
  return n !== void 0 && (e = Math.min(e, typeof n == "number" ? n : Number.parseFloat(n))), t !== void 0 && (e = Math.max(e, typeof t == "number" ? t : Number.parseFloat(t))), e;
}
function YT(e, t) {
  if (t !== void 0)
    return {
      width: t,
      minWidth: t,
      maxWidth: t
    };
  const n = qT(e), {
    minWidth: o,
    maxWidth: r
  } = e;
  return {
    width: n,
    minWidth: Ct(o) || n,
    maxWidth: Ct(r)
  };
}
function ZT(e, t, n) {
  return typeof n == "function" ? n(e, t) : n || "";
}
function Yl(e) {
  return e.filterOptionValues !== void 0 || e.filterOptionValue === void 0 && e.defaultFilterOptionValues !== void 0;
}
function Zl(e) {
  return "children" in e ? !1 : !!e.sorter;
}
function am(e) {
  return "children" in e && e.children.length ? !1 : !!e.resizable;
}
function jf(e) {
  return "children" in e ? !1 : !!e.filter && (!!e.filterOptions || !!e.renderFilterMenu);
}
function Wf(e) {
  if (e) {
    if (e === "descend") return "ascend";
  } else return "descend";
  return !1;
}
function JT(e, t) {
  if (e.sorter === void 0) return null;
  const {
    customNextSortOrder: n
  } = e;
  return t === null || t.columnKey !== e.key ? {
    columnKey: e.key,
    sorter: e.sorter,
    order: Wf(!1)
  } : Object.assign(Object.assign({}, t), {
    order: (n || Wf)(t.order)
  });
}
function lm(e, t) {
  return t.find((n) => n.columnKey === e.key && n.order) !== void 0;
}
function QT(e) {
  return typeof e == "string" ? e.replace(/,/g, "\\,") : e == null ? "" : `${e}`.replace(/,/g, "\\,");
}
function eF(e, t, n, o) {
  const r = e.filter((a) => a.type !== "expand" && a.type !== "selection" && a.allowExport !== !1), i = r.map((a) => o ? o(a) : a.title).join(","), l = t.map((a) => r.map((s) => n ? n(a[s.key], a, s) : QT(a[s.key])).join(","));
  return [i, ...l].join(`
`);
}
const tF = window.Vue.defineComponent, nF = window.Vue.h, oF = window.Vue.inject, rF = tF({
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
    } = oF(mn);
    return () => {
      const {
        rowKey: o
      } = e;
      return nF(Ud, {
        privateInsideTable: !0,
        disabled: e.disabled,
        indeterminate: n.value.has(o),
        checked: t.value.has(o),
        onUpdateChecked: e.onUpdateChecked
      });
    };
  }
}), iF = I("radio", `
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
`, [K("checked", [N("dot", `
 background-color: var(--n-color-active);
 `)]), N("dot-wrapper", `
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `), I("radio-input", `
 position: absolute;
 border: 0;
 width: 0;
 height: 0;
 opacity: 0;
 margin: 0;
 `), N("dot", `
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
 `), K("checked", {
  boxShadow: "var(--n-box-shadow-active)"
}, [D("&::before", `
 opacity: 1;
 transform: scale(1);
 `)])]), N("label", `
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `), ot("disabled", `
 cursor: pointer;
 `, [D("&:hover", [N("dot", {
  boxShadow: "var(--n-box-shadow-hover)"
})]), K("focus", [D("&:not(:active)", [N("dot", {
  boxShadow: "var(--n-box-shadow-focus)"
})])])]), K("disabled", `
 cursor: not-allowed;
 `, [N("dot", {
  boxShadow: "var(--n-box-shadow-disabled)",
  backgroundColor: "var(--n-color-disabled)"
}, [D("&::before", {
  backgroundColor: "var(--n-dot-color-disabled)"
}), K("checked", `
 opacity: 1;
 `)]), N("label", {
  color: "var(--n-text-color-disabled)"
}), I("radio-input", `
 cursor: not-allowed;
 `)])]), aF = window.Vue.inject, oa = window.Vue.ref, lF = window.Vue.toRef;
window.Vue.watchEffect;
const sF = {
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
}, sm = "n-radio-group";
function dF(e) {
  const t = aF(sm, null), n = Io(e, {
    mergedSize(w) {
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
      return w ? w.mergedSize.value : "medium";
    },
    mergedDisabled(w) {
      return !!(e.disabled || t != null && t.disabledRef.value || w != null && w.disabled.value);
    }
  }), {
    mergedSizeRef: o,
    mergedDisabledRef: r
  } = n, i = oa(null), l = oa(null), a = oa(e.defaultChecked), s = lF(e, "checked"), d = Xt(s, a), c = Le(() => t ? t.valueRef.value === e.value : d.value), h = Le(() => {
    const {
      name: w
    } = e;
    if (w !== void 0) return w;
    if (t) return t.nameRef.value;
  }), p = oa(!1);
  function v() {
    if (t) {
      const {
        doUpdateValue: w
      } = t, {
        value: x
      } = e;
      re(w, x);
    } else {
      const {
        onUpdateChecked: w,
        "onUpdate:checked": x
      } = e, {
        nTriggerFormInput: y,
        nTriggerFormChange: C
      } = n;
      w && re(w, !0), x && re(x, !0), y(), C(), a.value = !0;
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
const Uf = window.Vue.computed, cF = window.Vue.defineComponent, Vr = window.Vue.h, uF = Object.assign(Object.assign({}, ke.props), sF), dm = cF({
  name: "Radio",
  props: uF,
  setup(e) {
    const t = dF(e), n = ke("Radio", "-radio", iF, Gd, e, t.mergedClsPrefix), o = Uf(() => {
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
          textColor: x,
          textColorDisabled: y,
          dotColorActive: C,
          dotColorDisabled: S,
          labelPadding: b,
          labelLineHeight: R,
          labelFontWeight: $,
          [oe("fontSize", d)]: T,
          [oe("radioSize", d)]: H
        }
      } = n.value;
      return {
        "--n-bezier": c,
        "--n-label-line-height": R,
        "--n-label-font-weight": $,
        "--n-box-shadow": h,
        "--n-box-shadow-active": p,
        "--n-box-shadow-disabled": v,
        "--n-box-shadow-focus": f,
        "--n-box-shadow-hover": m,
        "--n-color": g,
        "--n-color-active": w,
        "--n-color-disabled": u,
        "--n-dot-color-active": C,
        "--n-dot-color-disabled": S,
        "--n-font-size": T,
        "--n-radio-size": H,
        "--n-text-color": x,
        "--n-text-color-disabled": y,
        "--n-label-padding": b
      };
    }), {
      inlineThemeDisabled: r,
      mergedClsPrefixRef: i,
      mergedRtlRef: l
    } = qe(e), a = zt("Radio", l, i), s = r ? yt("radio", Uf(() => t.mergedSize.value[0]), o, e) : void 0;
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
    return n == null || n(), Vr("label", {
      class: [`${t}-radio`, this.themeClass, this.rtlEnabled && `${t}-radio--rtl`, this.mergedDisabled && `${t}-radio--disabled`, this.renderSafeChecked && `${t}-radio--checked`, this.focus && `${t}-radio--focus`],
      style: this.cssVars
    }, Vr("div", {
      class: `${t}-radio__dot-wrapper`
    }, " ", Vr("div", {
      class: [`${t}-radio__dot`, this.renderSafeChecked && `${t}-radio__dot--checked`]
    }), Vr("input", {
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
    })), dt(e.default, (r) => !r && !o ? null : Vr("div", {
      ref: "labelRef",
      class: `${t}-radio__label`
    }, r || o)));
  }
}), fF = I("radio-group", `
 display: inline-block;
 font-size: var(--n-font-size);
`, [N("splitor", `
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
 `, [I("radio-button", {
  height: "var(--n-height)",
  lineHeight: "var(--n-height)"
}), N("splitor", {
  height: "var(--n-height)"
})]), I("radio-button", `
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
 `, [I("radio-input", `
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
 `), N("state-border", `
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
 `, [N("state-border", `
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]), D("&:last-child", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `, [N("state-border", `
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]), ot("disabled", `
 cursor: pointer;
 `, [D("&:hover", [N("state-border", `
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `), ot("checked", {
  color: "var(--n-button-text-color-hover)"
})]), K("focus", [D("&:not(:active)", [N("state-border", {
  boxShadow: "var(--n-button-box-shadow-focus)"
})])])]), K("checked", `
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `), K("disabled", `
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]), Kf = window.Vue.computed, hF = window.Vue.defineComponent, cm = window.Vue.h, pF = window.Vue.provide, qf = window.Vue.ref, Gf = window.Vue.toRef;
function vF(e, t, n) {
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
      }, x = m < g ? w : u;
      r.push(cm("div", {
        class: [`${n}-radio-group__splitor`, x]
      }), a);
    }
  }
  return {
    children: r,
    isButtonGroup: i
  };
}
const mF = Object.assign(Object.assign({}, ke.props), {
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
}), gF = hF({
  name: "RadioGroup",
  props: mF,
  setup(e) {
    const t = qf(null), {
      mergedSizeRef: n,
      mergedDisabledRef: o,
      nTriggerFormChange: r,
      nTriggerFormInput: i,
      nTriggerFormBlur: l,
      nTriggerFormFocus: a
    } = Io(e), {
      mergedClsPrefixRef: s,
      inlineThemeDisabled: d,
      mergedRtlRef: c
    } = qe(e), h = ke("Radio", "-radio-group", fF, Gd, e, s), p = qf(e.defaultValue), v = Gf(e, "value"), f = Xt(v, p);
    function m(C) {
      const {
        onUpdateValue: S,
        "onUpdate:value": b
      } = e;
      S && re(S, C), b && re(b, C), p.value = C, r(), i();
    }
    function g(C) {
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
    pF(sm, {
      mergedClsPrefixRef: s,
      nameRef: Gf(e, "name"),
      valueRef: f,
      disabledRef: o,
      mergedSizeRef: n,
      doUpdateValue: m
    });
    const w = zt("Radio", c, s), x = Kf(() => {
      const {
        value: C
      } = n, {
        common: {
          cubicBezierEaseInOut: S
        },
        self: {
          buttonBorderColor: b,
          buttonBorderColorActive: R,
          buttonBorderRadius: $,
          buttonBoxShadow: T,
          buttonBoxShadowFocus: H,
          buttonBoxShadowHover: P,
          buttonColor: z,
          buttonColorActive: M,
          buttonTextColor: O,
          buttonTextColorActive: U,
          buttonTextColorHover: L,
          opacityDisabled: Y,
          [oe("buttonHeight", C)]: te,
          [oe("fontSize", C)]: J
        }
      } = h.value;
      return {
        "--n-font-size": J,
        "--n-bezier": S,
        "--n-button-border-color": b,
        "--n-button-border-color-active": R,
        "--n-button-border-radius": $,
        "--n-button-box-shadow": T,
        "--n-button-box-shadow-focus": H,
        "--n-button-box-shadow-hover": P,
        "--n-button-color": z,
        "--n-button-color-active": M,
        "--n-button-text-color": O,
        "--n-button-text-color-hover": L,
        "--n-button-text-color-active": U,
        "--n-height": te,
        "--n-opacity-disabled": Y
      };
    }), y = d ? yt("radio-group", Kf(() => n.value[0]), x, e) : void 0;
    return {
      selfElRef: t,
      rtlEnabled: w,
      mergedClsPrefix: s,
      mergedValue: f,
      handleFocusout: u,
      handleFocusin: g,
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
    } = vF(Fo(kd(this)), t, n);
    return (e = this.onRender) === null || e === void 0 || e.call(this), cm("div", {
      onFocusin: o,
      onFocusout: r,
      ref: "selfElRef",
      class: [`${n}-radio-group`, this.rtlEnabled && `${n}-radio-group--rtl`, this.themeClass, l && `${n}-radio-group--button-group`],
      style: this.cssVars
    }, i);
  }
}), bF = window.Vue.defineComponent, wF = window.Vue.h, yF = window.Vue.inject, xF = bF({
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
    } = yF(mn);
    return () => {
      const {
        rowKey: o
      } = e;
      return wF(dm, {
        name: n,
        disabled: e.disabled,
        checked: t.value.has(o),
        onUpdateChecked: e.onUpdateChecked
      });
    };
  }
}), CF = window.Vue.computed, SF = window.Vue.defineComponent, $F = window.Vue.h, RF = window.Vue.ref, kF = Object.assign(Object.assign({}, hr), ke.props), PF = SF({
  name: "Tooltip",
  props: kF,
  slots: Object,
  __popover__: !0,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = qe(e), n = ke("Tooltip", "-tooltip", void 0, nm, e, t), o = RF(null);
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
      popoverThemeOverrides: CF(() => n.value.self)
    });
  },
  render() {
    const {
      mergedTheme: e,
      internalExtraClass: t
    } = this;
    return $F(yi, Object.assign(Object.assign({}, this.$props), {
      theme: e.peers.Popover,
      themeOverrides: e.peerOverrides.Popover,
      builtinThemeOverrides: this.popoverThemeOverrides,
      internalExtraClass: t.concat("tooltip"),
      ref: "popoverRef"
    }), this.$slots);
  }
}), um = I("ellipsis", {
  overflow: "hidden"
}, [ot("line-clamp", `
 white-space: nowrap;
 display: inline-block;
 vertical-align: bottom;
 max-width: 100%;
 `), K("line-clamp", `
 display: -webkit-inline-box;
 -webkit-box-orient: vertical;
 `), K("cursor-pointer", `
 cursor: pointer;
 `)]), Xf = window.Vue.computed, _F = window.Vue.defineComponent, Jl = window.Vue.h, TF = window.Vue.mergeProps, FF = window.Vue.onDeactivated, ra = window.Vue.ref;
function Zs(e) {
  return `${e}-ellipsis--line-clamp`;
}
function Js(e, t) {
  return `${e}-ellipsis--cursor-${t}`;
}
const fm = Object.assign(Object.assign({}, ke.props), {
  expandTrigger: String,
  lineClamp: [Number, String],
  tooltip: {
    type: [Boolean, Object],
    default: !0
  }
}), Xd = _F({
  name: "Ellipsis",
  inheritAttrs: !1,
  props: fm,
  slots: Object,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    const o = Qp(), r = ke("Ellipsis", "-ellipsis", um, om, e, o), i = ra(null), l = ra(null), a = ra(null), s = ra(!1), d = Xf(() => {
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
          lineClamp: x
        } = e;
        if (v(w), x !== void 0)
          g = w.scrollHeight <= w.offsetHeight;
        else {
          const {
            value: y
          } = l;
          y && (g = y.getBoundingClientRect().width <= w.getBoundingClientRect().width);
        }
        f(w, g);
      }
      return g;
    }
    const h = Xf(() => e.expandTrigger === "click" ? () => {
      var g;
      const {
        value: u
      } = s;
      u && ((g = a.value) === null || g === void 0 || g.setShow(!1)), s.value = !u;
    } : void 0);
    FF(() => {
      var g;
      e.tooltip && ((g = a.value) === null || g === void 0 || g.setShow(!1));
    });
    const p = () => Jl("span", Object.assign({}, TF(n, {
      class: [`${o.value}-ellipsis`, e.lineClamp !== void 0 ? Zs(o.value) : void 0, e.expandTrigger === "click" ? Js(o.value, "pointer") : void 0],
      style: d.value
    }), {
      ref: "triggerRef",
      onClick: h.value,
      onMouseenter: (
        // get tooltip disabled will derive cursor style
        e.expandTrigger === "click" ? c : void 0
      )
    }), e.lineClamp ? t : Jl("span", {
      ref: "triggerInnerRef"
    }, t));
    function v(g) {
      if (!g) return;
      const u = d.value, w = Zs(o.value);
      e.lineClamp !== void 0 ? m(g, w, "add") : m(g, w, "remove");
      for (const x in u)
        g.style[x] !== u[x] && (g.style[x] = u[x]);
    }
    function f(g, u) {
      const w = Js(o.value, "pointer");
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
      return Jl(PF, Object.assign({
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
}), EF = window.Vue.defineComponent, Ql = window.Vue.h, Yf = window.Vue.mergeProps, OF = window.Vue.ref, zF = EF({
  name: "PerformantEllipsis",
  props: fm,
  inheritAttrs: !1,
  setup(e, {
    attrs: t,
    slots: n
  }) {
    const o = OF(!1), r = Qp();
    return Do("-ellipsis", um, r), {
      mouseEntered: o,
      renderTrigger: () => {
        const {
          lineClamp: l
        } = e, a = r.value;
        return Ql("span", Object.assign({}, Yf(t, {
          class: [`${a}-ellipsis`, l !== void 0 ? Zs(a) : void 0, e.expandTrigger === "click" ? Js(a, "pointer") : void 0],
          style: l === void 0 ? {
            textOverflow: "ellipsis"
          } : {
            "-webkit-line-clamp": l
          }
        }), {
          onMouseenter: () => {
            o.value = !0;
          }
        }), l ? n : Ql("span", null, n));
      }
    };
  },
  render() {
    return this.mouseEntered ? Ql(Xd, Yf({}, this.$attrs, this.$props), this.$slots) : this.renderTrigger();
  }
}), MF = window.Vue.defineComponent, es = window.Vue.h, IF = MF({
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
    if (l && !t ? i = l(o, this.index) : t ? i = (e = o[a]) === null || e === void 0 ? void 0 : e.value : i = r ? r(ui(o, a), o, n) : ui(o, a), s)
      if (typeof s == "object") {
        const {
          mergedTheme: d
        } = this;
        return n.ellipsisComponent === "performant-ellipsis" ? es(zF, Object.assign({}, s, {
          theme: d.peers.Ellipsis,
          themeOverrides: d.peerOverrides.Ellipsis
        }), {
          default: () => i
        }) : es(Xd, Object.assign({}, s, {
          theme: d.peers.Ellipsis,
          themeOverrides: d.peerOverrides.Ellipsis
        }), {
          default: () => i
        });
      } else
        return es("span", {
          class: `${this.clsPrefix}-data-table-td__ellipsis`
        }, i);
    return i;
  }
}), AF = window.Vue.defineComponent, Br = window.Vue.h, Zf = AF({
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
    return Br("div", {
      class: [`${e}-data-table-expand-trigger`, this.expanded && `${e}-data-table-expand-trigger--expanded`],
      onClick: this.onClick,
      onMousedown: (t) => {
        t.preventDefault();
      }
    }, Br(gi, null, {
      default: () => this.loading ? Br(bi, {
        key: "loading",
        clsPrefix: this.clsPrefix,
        radius: 85,
        strokeWidth: 15,
        scale: 0.88
      }) : this.renderExpandIcon ? this.renderExpandIcon({
        expanded: this.expanded,
        rowData: this.rowData
      }) : Br($t, {
        clsPrefix: e,
        key: "base-icon"
      }, {
        default: () => Br(Fv, null)
      })
    }));
  }
}), Jf = window.Vue.computed, VF = window.Vue.defineComponent, Ln = window.Vue.h, BF = window.Vue.inject, LF = window.Vue.ref, DF = VF({
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
      localeRef: l
    } = BF(mn), a = LF(e.value), s = Jf(() => {
      const {
        value: f
      } = a;
      return Array.isArray(f) ? f : null;
    }), d = Jf(() => {
      const {
        value: f
      } = a;
      return Yl(e.column) ? Array.isArray(f) && f.length && f[0] || null : Array.isArray(f) ? null : f;
    });
    function c(f) {
      e.onChange(f);
    }
    function h(f) {
      e.multiple && Array.isArray(f) ? a.value = f : Yl(e.column) && !Array.isArray(f) ? a.value = [f] : a.value = f;
    }
    function p() {
      c(a.value), e.onConfirm();
    }
    function v() {
      e.multiple || Yl(e.column) ? c([]) : c(null), e.onClear();
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
    return Ln("div", {
      class: [`${n}-data-table-filter-menu`, this.rtlEnabled && `${n}-data-table-filter-menu--rtl`]
    }, Ln(br, null, {
      default: () => {
        const {
          checkboxGroupValue: o,
          handleChange: r
        } = this;
        return this.multiple ? Ln(Q_, {
          value: o,
          class: `${n}-data-table-filter-menu__group`,
          onUpdateValue: r
        }, {
          default: () => this.options.map((i) => Ln(Ud, {
            key: i.value,
            theme: e.peers.Checkbox,
            themeOverrides: e.peerOverrides.Checkbox,
            value: i.value
          }, {
            default: () => i.label
          }))
        }) : Ln(gF, {
          name: this.radioGroupName,
          class: `${n}-data-table-filter-menu__group`,
          value: this.radioGroupValue,
          onUpdateValue: this.handleChange
        }, {
          default: () => this.options.map((i) => Ln(dm, {
            key: i.value,
            value: i.value,
            theme: e.peers.Radio,
            themeOverrides: e.peerOverrides.Radio
          }, {
            default: () => i.label
          }))
        });
      }
    }), Ln("div", {
      class: `${n}-data-table-filter-menu__action`
    }, Ln(on, {
      size: "tiny",
      theme: e.peers.Button,
      themeOverrides: e.peerOverrides.Button,
      onClick: this.handleClearClick
    }, {
      default: () => t.clear
    }), Ln(on, {
      theme: e.peers.Button,
      themeOverrides: e.peerOverrides.Button,
      type: "primary",
      size: "tiny",
      onClick: this.handleConfirmClick
    }, {
      default: () => t.confirm
    })));
  }
}), NF = window.Vue.defineComponent, HF = NF({
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
}), ia = window.Vue.computed, jF = window.Vue.defineComponent, Zo = window.Vue.h, WF = window.Vue.inject, UF = window.Vue.ref;
function KF(e, t, n) {
  const o = Object.assign({}, e);
  return o[t] = n, o;
}
const qF = jF({
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
    } = WF(mn), c = UF(!1), h = r, p = ia(() => e.column.filterMultiple !== !1), v = ia(() => {
      const x = h.value[e.column.key];
      if (x === void 0) {
        const {
          value: y
        } = p;
        return y ? [] : null;
      }
      return x;
    }), f = ia(() => {
      const {
        value: x
      } = v;
      return Array.isArray(x) ? x.length > 0 : x !== null;
    }), m = ia(() => {
      var x, y;
      return ((y = (x = t == null ? void 0 : t.value) === null || x === void 0 ? void 0 : x.DataTable) === null || y === void 0 ? void 0 : y.renderFilter) || e.column.renderFilter;
    });
    function g(x) {
      const y = KF(h.value, e.column.key, x);
      s(y, e.column), l.value === "first" && a(1);
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
    return Zo(yi, Object.assign({
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
          return Zo(HF, {
            "data-data-table-filter": !0,
            render: r,
            active: this.active,
            show: this.showPopover
          });
        const {
          renderFilterIcon: i
        } = this.column;
        return Zo("div", {
          "data-data-table-filter": !0,
          class: [`${t}-data-table-filter`, {
            [`${t}-data-table-filter--active`]: this.active,
            [`${t}-data-table-filter--show`]: this.showPopover
          }]
        }, i ? i({
          active: this.active,
          show: this.showPopover
        }) : Zo($t, {
          clsPrefix: t
        }, {
          default: () => Zo(Nk, null)
        }));
      },
      default: () => {
        const {
          renderFilterMenu: r
        } = this.column;
        return r ? r({
          hide: n
        }) : Zo(DF, {
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
}), GF = window.Vue.defineComponent, XF = window.Vue.h, YF = window.Vue.inject, ZF = window.Vue.onBeforeUnmount, JF = window.Vue.ref, QF = GF({
  name: "ColumnResizeButton",
  props: {
    onResizeStart: Function,
    onResize: Function,
    onResizeEnd: Function
  },
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = YF(mn), n = JF(!1);
    let o = 0;
    function r(s) {
      return s.clientX;
    }
    function i(s) {
      var d;
      s.preventDefault();
      const c = n.value;
      o = r(s), n.value = !0, c || (He("mousemove", window, l), He("mouseup", window, a), (d = e.onResizeStart) === null || d === void 0 || d.call(e));
    }
    function l(s) {
      var d;
      (d = e.onResize) === null || d === void 0 || d.call(e, r(s) - o);
    }
    function a() {
      var s;
      n.value = !1, (s = e.onResizeEnd) === null || s === void 0 || s.call(e), Be("mousemove", window, l), Be("mouseup", window, a);
    }
    return ZF(() => {
      Be("mousemove", window, l), Be("mouseup", window, a);
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
    return XF("span", {
      "data-data-table-resizable": !0,
      class: [`${e}-data-table-resize-button`, this.active && `${e}-data-table-resize-button--active`],
      onMousedown: this.handleMousedown
    });
  }
}), eE = window.Vue.defineComponent, tE = eE({
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
}), aa = window.Vue.computed, nE = window.Vue.defineComponent, la = window.Vue.h, oE = window.Vue.inject, rE = nE({
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
    } = oE(mn), r = aa(() => n.value.find((s) => s.columnKey === e.column.key)), i = aa(() => r.value !== void 0), l = aa(() => {
      const {
        value: s
      } = r;
      return s && i.value ? s.order : !1;
    }), a = aa(() => {
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
    return e ? la(tE, {
      render: e,
      order: t
    }) : la("span", {
      class: [`${n}-data-table-sorter`, t === "ascend" && `${n}-data-table-sorter--asc`, t === "descend" && `${n}-data-table-sorter--desc`]
    }, o ? o({
      order: t
    }) : la($t, {
      clsPrefix: n
    }, {
      default: () => la(xk, null)
    }));
  }
}), Yd = "n-dropdown-menu", Za = "n-dropdown", Qf = "n-dropdown-option", iE = window.Vue.defineComponent, aE = window.Vue.h, hm = iE({
  name: "DropdownDivider",
  props: {
    clsPrefix: {
      type: String,
      required: !0
    }
  },
  render() {
    return aE("div", {
      class: `${this.clsPrefix}-dropdown-divider`
    });
  }
}), lE = window.Vue.defineComponent, Lr = window.Vue.h, eh = window.Vue.inject, sE = lE({
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
    } = eh(Yd), {
      renderLabelRef: n,
      labelFieldRef: o,
      nodePropsRef: r,
      renderOptionRef: i
    } = eh(Za);
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
    } = this.tmNode, s = Lr("div", Object.assign({
      class: `${t}-dropdown-option`
    }, r == null ? void 0 : r(a)), Lr("div", {
      class: `${t}-dropdown-option-body ${t}-dropdown-option-body--group`
    }, Lr("div", {
      "data-dropdown-option": !0,
      class: [`${t}-dropdown-option-body__prefix`, o && `${t}-dropdown-option-body__prefix--show-icon`]
    }, Ot(a.icon)), Lr("div", {
      class: `${t}-dropdown-option-body__label`,
      "data-dropdown-option": !0
    }, i ? i(a) : Ot((e = a.title) !== null && e !== void 0 ? e : a[this.labelField])), Lr("div", {
      class: [`${t}-dropdown-option-body__suffix`, n && `${t}-dropdown-option-body__suffix--has-submenu`],
      "data-dropdown-option": !0
    })));
    return l ? l({
      node: s,
      option: a
    }) : s;
  }
});
function dE(e) {
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
const cE = {
  common: mt,
  self: dE
}, uE = I("icon", `
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
}, [D("svg", {
  opacity: "var(--n-opacity)",
  transition: "opacity .3s var(--n-bezier)"
})]), D("svg", {
  height: "1em",
  width: "1em"
})]), ts = window.Vue.computed, fE = window.Vue.defineComponent, th = window.Vue.h, hE = window.Vue.mergeProps, pE = Object.assign(Object.assign({}, ke.props), {
  depth: [String, Number],
  size: [Number, String],
  color: String,
  component: [Object, Function]
}), vE = fE({
  _n_icon__: !0,
  name: "Icon",
  inheritAttrs: !1,
  props: pE,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = qe(e), o = ke("Icon", "-icon", uE, cE, e, t), r = ts(() => {
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
    }), i = n ? yt("icon", ts(() => `${e.depth || "d"}`), r, e) : void 0;
    return {
      mergedClsPrefix: t,
      mergedStyle: ts(() => {
        const {
          size: l,
          color: a
        } = e;
        return {
          fontSize: Ct(l),
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
    return !((e = t == null ? void 0 : t.$options) === null || e === void 0) && e._n_icon__ && _n("icon", "don't wrap `n-icon` inside `n-icon`"), i == null || i(), th("i", hE(this.$attrs, {
      role: "img",
      class: [`${o}-icon`, l, {
        [`${o}-icon--depth`]: n,
        [`${o}-icon--color-transition`]: n !== void 0
      }],
      style: [this.cssVars, this.mergedStyle]
    }), r ? th(r) : this.$slots);
  }
});
function Qs(e, t) {
  return e.type === "submenu" || e.type === void 0 && e[t] !== void 0;
}
function mE(e) {
  return e.type === "group";
}
function pm(e) {
  return e.type === "divider";
}
function gE(e) {
  return e.type === "render";
}
const bo = window.Vue.computed, bE = window.Vue.defineComponent, Kt = window.Vue.h, sa = window.Vue.inject, wE = window.Vue.mergeProps, yE = window.Vue.provide, xE = window.Vue.ref, CE = window.Vue.Transition, vm = bE({
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
    const t = sa(Za), {
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
    } = t, g = sa(Qf, null), u = sa(Yd), w = sa(pi), x = bo(() => e.tmNode.rawNode), y = bo(() => {
      const {
        value: L
      } = p;
      return Qs(e.tmNode.rawNode, L);
    }), C = bo(() => {
      const {
        disabled: L
      } = e.tmNode;
      return L;
    }), S = bo(() => {
      if (!y.value) return !1;
      const {
        key: L,
        disabled: Y
      } = e.tmNode;
      if (Y) return !1;
      const {
        value: te
      } = n, {
        value: J
      } = o, {
        value: X
      } = r, {
        value: A
      } = i;
      return te !== null ? A.includes(L) : J !== null ? A.includes(L) && A[A.length - 1] !== L : X !== null ? A.includes(L) : !1;
    }), b = bo(() => o.value === null && !a.value), R = E0(S, 300, b), $ = bo(() => !!(g != null && g.enteringSubmenuRef.value)), T = xE(!1);
    yE(Qf, {
      enteringSubmenuRef: T
    });
    function H() {
      T.value = !0;
    }
    function P() {
      T.value = !1;
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
      } = y, {
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
      mergedShowSubmenu: bo(() => R.value && !$.value),
      rawNode: x,
      hasSubmenu: y,
      pending: Le(() => {
        const {
          value: L
        } = i, {
          key: Y
        } = e.tmNode;
        return L.includes(Y);
      }),
      childActive: Le(() => {
        const {
          value: L
        } = l, {
          key: Y
        } = e.tmNode, te = L.findIndex((J) => Y === J);
        return te === -1 ? !1 : te < L.length - 1;
      }),
      active: Le(() => {
        const {
          value: L
        } = l, {
          key: Y
        } = e.tmNode, te = L.findIndex((J) => Y === J);
        return te === -1 ? !1 : te === L.length - 1;
      }),
      mergedDisabled: C,
      renderOption: v,
      nodeProps: f,
      handleClick: U,
      handleMouseMove: M,
      handleMouseEnter: z,
      handleMouseLeave: O,
      handleSubmenuBeforeEnter: H,
      handleSubmenuAfterEnter: P
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
      f = Kt(mm, Object.assign({}, w, {
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
    }, g), Kt("div", wE(m, p), [Kt("div", {
      class: [`${i}-dropdown-option-body__prefix`, l && `${i}-dropdown-option-body__prefix--show-icon`]
    }, [d ? d(o) : Ot(o.icon)]), Kt("div", {
      "data-dropdown-option": !0,
      class: `${i}-dropdown-option-body__label`
    }, s ? s(o) : Ot((t = o[this.labelField]) !== null && t !== void 0 ? t : o.title)), Kt("div", {
      "data-dropdown-option": !0,
      class: [`${i}-dropdown-option-body__suffix`, a && `${i}-dropdown-option-body__suffix--has-submenu`]
    }, this.hasSubmenu ? Kt(vE, null, {
      default: () => Kt(Fv, null)
    }) : null)]), this.hasSubmenu ? Kt(wd, null, {
      default: () => [Kt(yd, null, {
        default: () => Kt("div", {
          class: `${i}-dropdown-offset-container`
        }, Kt(Sd, {
          show: this.mergedShowSubmenu,
          placement: this.placement,
          to: v && this.popoverBody || void 0,
          teleportDisabled: !v
        }, {
          default: () => Kt("div", {
            class: `${i}-dropdown-menu-wrapper`
          }, n ? Kt(CE, {
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
}), SE = window.Vue.defineComponent, $E = window.Vue.Fragment, da = window.Vue.h, RE = SE({
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
    return da($E, null, da(sE, {
      clsPrefix: n,
      tmNode: e,
      key: e.key
    }), o == null ? void 0 : o.map((r) => {
      const {
        rawNode: i
      } = r;
      return i.show === !1 ? null : pm(i) ? da(hm, {
        clsPrefix: n,
        key: r.key
      }) : r.isGroup ? (_n("dropdown", "`group` node is not allowed to be put in `group` node."), null) : da(vm, {
        clsPrefix: n,
        tmNode: r,
        parentKey: t,
        key: r.key
      });
    }));
  }
}), kE = window.Vue.defineComponent, PE = window.Vue.h, _E = kE({
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
    return PE("div", t, [e == null ? void 0 : e()]);
  }
}), nh = window.Vue.computed, TE = window.Vue.defineComponent, Jo = window.Vue.h, FE = window.Vue.inject, ca = window.Vue.provide, EE = window.Vue.ref, mm = TE({
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
    } = FE(Za);
    ca(Yd, {
      showIconRef: nh(() => {
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
      hasSubmenuRef: nh(() => {
        const {
          value: r
        } = n;
        return e.tmNodes.some((i) => {
          var l;
          if (i.isGroup)
            return (l = i.children) === null || l === void 0 ? void 0 : l.some(({
              rawNode: s
            }) => Qs(s, r));
          const {
            rawNode: a
          } = i;
          return Qs(a, r);
        });
      })
    });
    const o = EE(null);
    return ca(Ka, null), ca(Ua, null), ca(pi, o), {
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
      return i.show === !1 ? null : gE(i) ? Jo(_E, {
        tmNode: r,
        key: r.key
      }) : pm(i) ? Jo(hm, {
        clsPrefix: t,
        key: r.key
      }) : mE(i) ? Jo(RE, {
        clsPrefix: t,
        tmNode: r,
        parentKey: e,
        key: r.key
      }) : Jo(vm, {
        clsPrefix: t,
        tmNode: r,
        parentKey: e,
        key: r.key,
        props: i.props,
        scrollable: n
      });
    });
    return Jo("div", {
      class: [`${t}-dropdown-menu`, n && `${t}-dropdown-menu--scrollable`],
      ref: "bodyRef"
    }, n ? Jo(zv, {
      contentClass: `${t}-dropdown-menu__content`
    }, {
      default: () => o
    }) : o, this.showArrow ? Lv({
      clsPrefix: t,
      arrowStyle: this.arrowStyle,
      arrowClass: void 0,
      arrowWrapperClass: void 0,
      arrowWrapperStyle: void 0
    }) : null);
  }
}), OE = I("dropdown-menu", `
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`, [wi(), I("dropdown-option", `
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
 `)]), I("dropdown-option-body", `
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
 `), ot("disabled", [K("pending", `
 color: var(--n-option-text-color-hover);
 `, [N("prefix, suffix", `
 color: var(--n-option-text-color-hover);
 `), D("&::before", "background-color: var(--n-option-color-hover);")]), K("active", `
 color: var(--n-option-text-color-active);
 `, [N("prefix, suffix", `
 color: var(--n-option-text-color-active);
 `), D("&::before", "background-color: var(--n-option-color-active);")]), K("child-active", `
 color: var(--n-option-text-color-child-active);
 `, [N("prefix, suffix", `
 color: var(--n-option-text-color-child-active);
 `)])]), K("disabled", `
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `), K("group", `
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `, [N("prefix", `
 width: calc(var(--n-option-prefix-width) / 2);
 `, [K("show-icon", `
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]), N("prefix", `
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `, [K("show-icon", `
 width: var(--n-option-icon-prefix-width);
 `), I("icon", `
 font-size: var(--n-option-icon-size);
 `)]), N("label", `
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `), N("suffix", `
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
 `), I("icon", `
 font-size: var(--n-option-icon-size);
 `)]), I("dropdown-menu", "pointer-events: all;")]), I("dropdown-offset-container", `
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]), I("dropdown-divider", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `), I("dropdown-menu-wrapper", `
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `), D(">", [I("scrollbar", `
 height: inherit;
 max-height: inherit;
 `)]), ot("scrollable", `
 padding: var(--n-padding);
 `), K("scrollable", [N("content", `
 padding: var(--n-padding);
 `)])]), wo = window.Vue.computed, zE = window.Vue.defineComponent, oh = window.Vue.h, ME = window.Vue.mergeProps, IE = window.Vue.provide, ua = window.Vue.ref, Dn = window.Vue.toRef, AE = window.Vue.watch, VE = {
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
}, BE = Object.keys(hr), LE = Object.assign(Object.assign(Object.assign({}, hr), VE), ke.props), DE = zE({
  name: "Dropdown",
  inheritAttrs: !1,
  props: LE,
  setup(e) {
    const t = ua(!1), n = Xt(Dn(e, "show"), t), o = wo(() => {
      const {
        keyField: P,
        childrenField: z
      } = e;
      return Ya(e.options, {
        getKey(M) {
          return M[P];
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
    }), r = wo(() => o.value.treeNodes), i = ua(null), l = ua(null), a = ua(null), s = wo(() => {
      var P, z, M;
      return (M = (z = (P = i.value) !== null && P !== void 0 ? P : l.value) !== null && z !== void 0 ? z : a.value) !== null && M !== void 0 ? M : null;
    }), d = wo(() => o.value.getPath(s.value).keyPath), c = wo(() => o.value.getPath(e.value).keyPath), h = Le(() => e.keyboard && n.value);
    w0({
      keydown: {
        ArrowUp: {
          prevent: !0,
          handler: C
        },
        ArrowRight: {
          prevent: !0,
          handler: y
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
          handler: b
        },
        Escape: w
      }
    }, h);
    const {
      mergedClsPrefixRef: p,
      inlineThemeDisabled: v
    } = qe(e), f = ke("Dropdown", "-dropdown", OE, tm, e, p);
    IE(Za, {
      labelFieldRef: Dn(e, "labelField"),
      childrenFieldRef: Dn(e, "childrenField"),
      renderLabelRef: Dn(e, "renderLabel"),
      renderIconRef: Dn(e, "renderIcon"),
      hoverKeyRef: i,
      keyboardKeyRef: l,
      lastToggledSubmenuKeyRef: a,
      pendingKeyPathRef: d,
      activeKeyPathRef: c,
      animatedRef: Dn(e, "animated"),
      mergedShowRef: n,
      nodePropsRef: Dn(e, "nodeProps"),
      renderOptionRef: Dn(e, "renderOption"),
      menuPropsRef: Dn(e, "menuProps"),
      doSelect: m,
      doUpdateShow: g
    }), AE(n, (P) => {
      !e.animated && !P && u();
    });
    function m(P, z) {
      const {
        onSelect: M
      } = e;
      M && re(M, P, z);
    }
    function g(P) {
      const {
        "onUpdate:show": z,
        onUpdateShow: M
      } = e;
      z && re(z, P), M && re(M, P), t.value = P;
    }
    function u() {
      i.value = null, l.value = null, a.value = null;
    }
    function w() {
      g(!1);
    }
    function x() {
      $("left");
    }
    function y() {
      $("right");
    }
    function C() {
      $("up");
    }
    function S() {
      $("down");
    }
    function b() {
      const P = R();
      P != null && P.isLeaf && n.value && (m(P.key, P.rawNode), g(!1));
    }
    function R() {
      var P;
      const {
        value: z
      } = o, {
        value: M
      } = s;
      return !z || M === null ? null : (P = z.getNode(M)) !== null && P !== void 0 ? P : null;
    }
    function $(P) {
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
        const U = R();
        if (U) {
          let L;
          switch (P) {
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
    const T = wo(() => {
      const {
        size: P,
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
        optionOpacityDisabled: te,
        [oe("optionIconSuffixWidth", P)]: J,
        [oe("optionSuffixWidth", P)]: X,
        [oe("optionIconPrefixWidth", P)]: A,
        [oe("optionPrefixWidth", P)]: G,
        [oe("fontSize", P)]: Z,
        [oe("optionHeight", P)]: ie,
        [oe("optionIconSize", P)]: ae
      } = O, ue = {
        "--n-bezier": M,
        "--n-font-size": Z,
        "--n-padding": U,
        "--n-border-radius": Y,
        "--n-option-height": ie,
        "--n-option-prefix-width": G,
        "--n-option-icon-prefix-width": A,
        "--n-option-suffix-width": X,
        "--n-option-icon-suffix-width": J,
        "--n-option-icon-size": ae,
        "--n-divider-color": L,
        "--n-option-opacity-disabled": te
      };
      return z ? (ue["--n-color"] = O.colorInverted, ue["--n-option-color-hover"] = O.optionColorHoverInverted, ue["--n-option-color-active"] = O.optionColorActiveInverted, ue["--n-option-text-color"] = O.optionTextColorInverted, ue["--n-option-text-color-hover"] = O.optionTextColorHoverInverted, ue["--n-option-text-color-active"] = O.optionTextColorActiveInverted, ue["--n-option-text-color-child-active"] = O.optionTextColorChildActiveInverted, ue["--n-prefix-color"] = O.prefixColorInverted, ue["--n-suffix-color"] = O.suffixColorInverted, ue["--n-group-header-text-color"] = O.groupHeaderTextColorInverted) : (ue["--n-color"] = O.color, ue["--n-option-color-hover"] = O.optionColorHover, ue["--n-option-color-active"] = O.optionColorActive, ue["--n-option-text-color"] = O.optionTextColor, ue["--n-option-text-color-hover"] = O.optionTextColorHover, ue["--n-option-text-color-active"] = O.optionTextColorActive, ue["--n-option-text-color-child-active"] = O.optionTextColorChildActive, ue["--n-prefix-color"] = O.prefixColor, ue["--n-suffix-color"] = O.suffixColor, ue["--n-group-header-text-color"] = O.groupHeaderTextColor), ue;
    }), H = v ? yt("dropdown", wo(() => `${e.size[0]}${e.inverted ? "i" : ""}`), T, e) : void 0;
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
      cssVars: v ? void 0 : T,
      themeClass: H == null ? void 0 : H.themeClass,
      onRender: H == null ? void 0 : H.onRender
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
        ref: Gp(r),
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
      return oh(mm, ME(this.$attrs, p, h));
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
    return oh(yi, Object.assign({}, ao(this.$props, BE), n), {
      trigger: () => {
        var o, r;
        return (r = (o = this.$slots).default) === null || r === void 0 ? void 0 : r.call(o);
      }
    });
  }
}), rh = window.Vue.computed, NE = window.Vue.defineComponent, ns = window.Vue.h, HE = window.Vue.inject, gm = "_n_all__", bm = "_n_none__";
function jE(e, t, n, o) {
  return e ? (r) => {
    for (const i of e)
      switch (r) {
        case gm:
          n(!0);
          return;
        case bm:
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
function WE(e, t) {
  return e ? e.map((n) => {
    switch (n) {
      case "all":
        return {
          label: t.checkTableAll,
          key: gm
        };
      case "none":
        return {
          label: t.uncheckTableAll,
          key: bm
        };
      default:
        return n;
    }
  }) : [];
}
const UE = NE({
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
    } = HE(mn), a = rh(() => jE(o.value, r, i, l)), s = rh(() => WE(o.value, n.value));
    return () => {
      var d, c, h, p;
      const {
        clsPrefix: v
      } = e;
      return ns(DE, {
        theme: (c = (d = t.theme) === null || d === void 0 ? void 0 : d.peers) === null || c === void 0 ? void 0 : c.Dropdown,
        themeOverrides: (p = (h = t.themeOverrides) === null || h === void 0 ? void 0 : h.peers) === null || p === void 0 ? void 0 : p.Dropdown,
        options: s.value,
        onSelect: a.value
      }, {
        default: () => ns($t, {
          clsPrefix: v,
          class: `${v}-data-table-check-extra`
        }, {
          default: () => ns(Tv, null)
        })
      });
    };
  }
}), wm = window.Vue.defineComponent, ih = window.Vue.Fragment, lt = window.Vue.h, KE = window.Vue.inject, ah = window.Vue.ref;
function os(e) {
  return typeof e.title == "function" ? e.title(e) : e.title;
}
const qE = wm({
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
    return lt("table", {
      style: {
        tableLayout: "fixed",
        width: o
      },
      class: `${e}-data-table-table`
    }, lt("colgroup", null, n.map((r) => lt("col", {
      key: r.key,
      style: r.style
    }))), lt("thead", {
      "data-n-id": t,
      class: `${e}-data-table-thead`
    }, this.$slots));
  }
}), ym = wm({
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
      handleTableHeaderScroll: x,
      deriveNextSorter: y,
      doUncheckAll: C,
      doCheckAll: S
    } = KE(mn), b = ah(), R = ah({});
    function $(O) {
      const U = R.value[O];
      return U == null ? void 0 : U.getBoundingClientRect().width;
    }
    function T() {
      i.value ? C() : S();
    }
    function H(O, U) {
      if (an(O, "dataTableFilter") || an(O, "dataTableResizable") || !Zl(U)) return;
      const L = h.value.find((te) => te.columnKey === U.key) || null, Y = JT(U, L);
      y(Y);
    }
    const P = /* @__PURE__ */ new Map();
    function z(O) {
      P.set(O.key, $(O.key));
    }
    function M(O, U) {
      const L = P.get(O.key);
      if (L === void 0)
        return;
      const Y = L + U, te = XT(Y, O.minWidth, O.maxWidth);
      u(Y, te, O, $), w(O, te);
    }
    return {
      cellElsRef: R,
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
      virtualListRef: b,
      handleCheckboxUpdateChecked: T,
      handleColHeaderClick: H,
      handleTableHeaderScroll: x,
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
      handleColumnResizeStart: x,
      handleColumnResize: y
    } = this, C = ($, T, H) => $.map(({
      column: P,
      colIndex: z,
      colSpan: M,
      rowSpan: O,
      isLast: U
    }) => {
      var L, Y;
      const te = fn(P), {
        ellipsis: J
      } = P, X = () => P.type === "selection" ? P.multiple !== !1 ? lt(ih, null, lt(Ud, {
        key: r,
        privateInsideTable: !0,
        checked: i,
        indeterminate: l,
        disabled: f,
        onUpdateChecked: w
      }), c ? lt(UE, {
        clsPrefix: t
      }) : null) : null : lt(ih, null, lt("div", {
        class: `${t}-data-table-th__title-wrapper`
      }, lt("div", {
        class: `${t}-data-table-th__title`
      }, J === !0 || J && !J.tooltip ? lt("div", {
        class: `${t}-data-table-th__ellipsis`
      }, os(P)) : J && typeof J == "object" ? lt(Xd, Object.assign({}, J, {
        theme: d.peers.Ellipsis,
        themeOverrides: d.peerOverrides.Ellipsis
      }), {
        default: () => os(P)
      }) : os(P)), Zl(P) ? lt(rE, {
        column: P
      }) : null), jf(P) ? lt(qF, {
        column: P,
        options: P.filterOptions
      }) : null, am(P) ? lt(QF, {
        onResizeStart: () => {
          x(P);
        },
        onResize: (ie) => {
          y(P, ie);
        }
      }) : null), A = te in n, G = te in o, Z = T && !P.fixed ? "div" : "th";
      return lt(Z, {
        ref: (ie) => e[te] = ie,
        key: te,
        style: [T && !P.fixed ? {
          position: "absolute",
          left: pt(T(z)),
          top: 0,
          bottom: 0
        } : {
          left: pt((L = n[te]) === null || L === void 0 ? void 0 : L.start),
          right: pt((Y = o[te]) === null || Y === void 0 ? void 0 : Y.start)
        }, {
          width: pt(P.width),
          textAlign: P.titleAlign || P.align,
          height: H
        }],
        colspan: M,
        rowspan: O,
        "data-col-key": te,
        class: [`${t}-data-table-th`, (A || G) && `${t}-data-table-th--fixed-${A ? "left" : "right"}`, {
          [`${t}-data-table-th--sorting`]: lm(P, m),
          [`${t}-data-table-th--filterable`]: jf(P),
          [`${t}-data-table-th--sortable`]: Zl(P),
          [`${t}-data-table-th--selection`]: P.type === "selection",
          [`${t}-data-table-th--last`]: U
        }, P.className],
        onClick: P.type !== "selection" && P.type !== "expand" && !("children" in P) ? (ie) => {
          u(ie, P);
        } : void 0
      }, X());
    });
    if (g) {
      const {
        headerHeight: $
      } = this;
      let T = 0, H = 0;
      return s.forEach((P) => {
        P.column.fixed === "left" ? T++ : P.column.fixed === "right" && H++;
      }), lt(Rd, {
        ref: "virtualListRef",
        class: `${t}-data-table-base-table-header`,
        style: {
          height: pt($)
        },
        onScroll: this.handleTableHeaderScroll,
        columns: s,
        itemSize: $,
        showScrollbar: !1,
        items: [{}],
        itemResizable: !1,
        visibleItemsTag: qE,
        visibleItemsProps: {
          clsPrefix: t,
          id: h,
          cols: s,
          width: Ct(this.scrollX)
        },
        renderItemWithCols: ({
          startColIndex: P,
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
          }, Y) => !!(P <= Y && Y <= z || L.fixed)), U = C(O, M, pt($));
          return U.splice(T, 0, lt("th", {
            colspan: s.length - T - H,
            style: {
              pointerEvents: "none",
              visibility: "hidden",
              height: 0
            }
          })), lt("tr", {
            style: {
              position: "relative"
            }
          }, U);
        }
      }, {
        default: ({
          renderedItemWithCols: P
        }) => P
      });
    }
    const S = lt("thead", {
      class: `${t}-data-table-thead`,
      "data-n-id": h
    }, a.map(($) => lt("tr", {
      class: `${t}-data-table-tr`
    }, C($, null, void 0))));
    if (!p)
      return S;
    const {
      handleTableHeaderScroll: b,
      scrollX: R
    } = this;
    return lt("div", {
      class: `${t}-data-table-base-table-header`,
      onScroll: b
    }, lt("table", {
      class: `${t}-data-table-table`,
      style: {
        minWidth: Ct(R),
        tableLayout: v
      }
    }, lt("colgroup", null, s.map(($) => lt("col", {
      key: $.key,
      style: $.style
    }))), S));
  }
}), lh = window.Vue.computed, xm = window.Vue.defineComponent, GE = window.Vue.Fragment, et = window.Vue.h, sh = window.Vue.inject, XE = window.Vue.onUnmounted, rs = window.Vue.ref, YE = window.Vue.watchEffect;
function ZE(e, t) {
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
const JE = xm({
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
    return et("table", {
      style: {
        tableLayout: "fixed"
      },
      class: `${e}-data-table-table`,
      onMouseenter: o,
      onMouseleave: r
    }, et("colgroup", null, n.map((i) => et("col", {
      key: i.key,
      style: i.style
    }))), et("tbody", {
      "data-n-id": t,
      class: `${e}-data-table-tbody`
    }, this.$slots));
  }
}), QE = xm({
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
      hoverKeyRef: x,
      summaryRef: y,
      mergedSortStateRef: C,
      virtualScrollRef: S,
      virtualScrollXRef: b,
      heightForRowRef: R,
      minRowHeightRef: $,
      componentId: T,
      mergedTableLayoutRef: H,
      childTriggerColIndexRef: P,
      indentRef: z,
      rowPropsRef: M,
      maxHeightRef: O,
      stripedRef: U,
      loadingRef: L,
      onLoadRef: Y,
      loadingKeySetRef: te,
      expandableRef: J,
      stickyExpandedRowsRef: X,
      renderExpandIconRef: A,
      summaryPlacementRef: G,
      treeMateRef: Z,
      scrollbarPropsRef: ie,
      setHeaderScrollLeft: ae,
      doUpdateExpandedRowKeys: ue,
      handleTableBodyScroll: be,
      doCheck: q,
      doUncheck: se,
      renderCell: Pe
    } = sh(mn), ve = sh(jn), $e = rs(null), Se = rs(null), De = rs(null), Ie = Le(() => s.value.length === 0), Je = Le(() => e.showHeader || !Ie.value), F = Le(() => e.showHeader || Ie.value);
    let _ = "";
    const W = lh(() => new Set(o.value));
    function ne(ce) {
      var Ce;
      return (Ce = Z.value.getNode(ce)) === null || Ce === void 0 ? void 0 : Ce.rawNode;
    }
    function ye(ce, Ce, k) {
      const B = ne(ce.key);
      if (!B) {
        _n("data-table", `fail to get row data with key ${ce.key}`);
        return;
      }
      if (k) {
        const Q = s.value.findIndex((le) => le.key === _);
        if (Q !== -1) {
          const le = s.value.findIndex((xe) => xe.key === ce.key), de = Math.min(Q, le), pe = Math.max(Q, le), me = [];
          s.value.slice(de, pe + 1).forEach((xe) => {
            xe.disabled || me.push(xe.key);
          }), Ce ? q(me, !1, B) : se(me, B), _ = ce.key;
          return;
        }
      }
      Ce ? q(ce.key, !1, B) : se(ce.key, B), _ = ce.key;
    }
    function he(ce) {
      const Ce = ne(ce.key);
      if (!Ce) {
        _n("data-table", `fail to get row data with key ${ce.key}`);
        return;
      }
      q(ce.key, !0, Ce);
    }
    function E() {
      if (!Je.value) {
        const {
          value: Ce
        } = De;
        return Ce || null;
      }
      if (S.value)
        return _e();
      const {
        value: ce
      } = $e;
      return ce ? ce.containerRef : null;
    }
    function j(ce, Ce) {
      var k;
      if (te.value.has(ce)) return;
      const {
        value: B
      } = o, Q = B.indexOf(ce), le = Array.from(B);
      ~Q ? (le.splice(Q, 1), ue(le)) : Ce && !Ce.isLeaf && !Ce.shallowLoaded ? (te.value.add(ce), (k = Y.value) === null || k === void 0 || k.call(Y, Ce.rawNode).then(() => {
        const {
          value: de
        } = o, pe = Array.from(de);
        ~pe.indexOf(ce) || pe.push(ce), ue(pe);
      }).finally(() => {
        te.value.delete(ce);
      })) : (le.push(ce), ue(le));
    }
    function fe() {
      x.value = null;
    }
    function _e() {
      const {
        value: ce
      } = Se;
      return (ce == null ? void 0 : ce.listElRef) || null;
    }
    function at() {
      const {
        value: ce
      } = Se;
      return (ce == null ? void 0 : ce.itemsElRef) || null;
    }
    function vt(ce) {
      var Ce;
      be(ce), (Ce = $e.value) === null || Ce === void 0 || Ce.sync();
    }
    function Ye(ce) {
      var Ce;
      const {
        onResize: k
      } = e;
      k && k(ce), (Ce = $e.value) === null || Ce === void 0 || Ce.sync();
    }
    const Ze = {
      getScrollContainer: E,
      scrollTo(ce, Ce) {
        var k, B;
        S.value ? (k = Se.value) === null || k === void 0 || k.scrollTo(ce, Ce) : (B = $e.value) === null || B === void 0 || B.scrollTo(ce, Ce);
      }
    }, gt = D([({
      props: ce
    }) => {
      const Ce = (B) => B === null ? null : D(`[data-n-id="${ce.componentId}"] [data-col-key="${B}"]::after`, {
        boxShadow: "var(--n-box-shadow-after)"
      }), k = (B) => B === null ? null : D(`[data-n-id="${ce.componentId}"] [data-col-key="${B}"]::before`, {
        boxShadow: "var(--n-box-shadow-before)"
      });
      return D([Ce(ce.leftActiveFixedColKey), k(ce.rightActiveFixedColKey), ce.leftActiveFixedChildrenColKeys.map((B) => Ce(B)), ce.rightActiveFixedChildrenColKeys.map((B) => k(B))]);
    }]);
    let Qe = !1;
    return YE(() => {
      const {
        value: ce
      } = f, {
        value: Ce
      } = m, {
        value: k
      } = g, {
        value: B
      } = u;
      if (!Qe && ce === null && k === null)
        return;
      const Q = {
        leftActiveFixedColKey: ce,
        leftActiveFixedChildrenColKeys: Ce,
        rightActiveFixedColKey: k,
        rightActiveFixedChildrenColKeys: B,
        componentId: T
      };
      gt.mount({
        id: `n-${T}`,
        force: !0,
        props: Q,
        anchorMetaName: fr,
        parent: ve == null ? void 0 : ve.styleMountTarget
      }), Qe = !0;
    }), XE(() => {
      gt.unmount({
        id: `n-${T}`,
        parent: ve == null ? void 0 : ve.styleMountTarget
      });
    }), Object.assign({
      bodyWidth: n,
      summaryPlacement: G,
      dataTableSlots: t,
      componentId: T,
      scrollbarInstRef: $e,
      virtualListRef: Se,
      emptyElRef: De,
      summary: y,
      mergedClsPrefix: r,
      mergedTheme: i,
      scrollX: l,
      cols: a,
      loading: L,
      bodyShowHeaderOnly: F,
      shouldDisplaySomeTablePart: Je,
      empty: Ie,
      paginatedDataAndInfo: lh(() => {
        const {
          value: ce
        } = U;
        let Ce = !1;
        return {
          data: s.value.map(ce ? (B, Q) => (B.isLeaf || (Ce = !0), {
            tmNode: B,
            key: B.key,
            striped: Q % 2 === 1,
            index: Q
          }) : (B, Q) => (B.isLeaf || (Ce = !0), {
            tmNode: B,
            key: B.key,
            striped: !1,
            index: Q
          })),
          hasChildren: Ce
        };
      }),
      rawPaginatedData: d,
      fixedColumnLeftMap: c,
      fixedColumnRightMap: h,
      currentPage: p,
      rowClassName: v,
      renderExpand: w,
      mergedExpandedRowKeySet: W,
      hoverKey: x,
      mergedSortState: C,
      virtualScroll: S,
      virtualScrollX: b,
      heightForRow: R,
      minRowHeight: $,
      mergedTableLayout: H,
      childTriggerColIndex: P,
      indent: z,
      rowProps: M,
      maxHeight: O,
      loadingKeySet: te,
      expandable: J,
      stickyExpandedRows: X,
      renderExpandIcon: A,
      scrollbarProps: ie,
      setHeaderScrollLeft: ae,
      handleVirtualListScroll: vt,
      handleVirtualListResize: Ye,
      handleMouseleaveTable: fe,
      virtualListContainer: _e,
      virtualListContent: at,
      handleTableBodyScroll: be,
      handleCheckboxUpdateChecked: ye,
      handleRadioUpdateChecked: he,
      handleUpdateExpanded: j,
      renderCell: Pe
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
      minWidth: Ct(t) || "100%"
    };
    t && (v.width = "100%");
    const f = et(br, Object.assign({}, this.scrollbarProps, {
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
          mergedTheme: x,
          fixedColumnLeftMap: y,
          fixedColumnRightMap: C,
          currentPage: S,
          rowClassName: b,
          mergedSortState: R,
          mergedExpandedRowKeySet: $,
          stickyExpandedRows: T,
          componentId: H,
          childTriggerColIndex: P,
          expandable: z,
          rowProps: M,
          handleMouseleaveTable: O,
          renderExpand: U,
          summary: L,
          handleCheckboxUpdateChecked: Y,
          handleRadioUpdateChecked: te,
          handleUpdateExpanded: J,
          heightForRow: X,
          minRowHeight: A,
          virtualScrollX: G
        } = this, {
          length: Z
        } = u;
        let ie;
        const {
          data: ae,
          hasChildren: ue
        } = w, be = ue ? ZE(ae, $) : ae;
        if (L) {
          const _ = L(this.rawPaginatedData);
          if (Array.isArray(_)) {
            const W = _.map((ne, ye) => ({
              isSummaryRow: !0,
              key: `__n_summary__${ye}`,
              tmNode: {
                rawNode: ne,
                disabled: !0
              },
              index: -1
            }));
            ie = this.summaryPlacement === "top" ? [...W, ...be] : [...be, ...W];
          } else {
            const W = {
              isSummaryRow: !0,
              key: "__n_summary__",
              tmNode: {
                rawNode: _,
                disabled: !0
              },
              index: -1
            };
            ie = this.summaryPlacement === "top" ? [W, ...be] : [...be, W];
          }
        } else
          ie = be;
        const q = ue ? {
          width: pt(this.indent)
        } : void 0, se = [];
        ie.forEach((_) => {
          U && $.has(_.key) && (!z || z(_.tmNode.rawNode)) ? se.push(_, {
            isExpandedRow: !0,
            key: `${_.key}-expand`,
            // solve key repeat of the expanded row
            tmNode: _.tmNode,
            index: _.index
          }) : se.push(_);
        });
        const {
          length: Pe
        } = se, ve = {};
        ae.forEach(({
          tmNode: _
        }, W) => {
          ve[W] = _.key;
        });
        const $e = T ? this.bodyWidth : null, Se = $e === null ? void 0 : `${$e}px`, De = this.virtualScrollX ? "div" : "td";
        let Ie = 0, Je = 0;
        G && u.forEach((_) => {
          _.column.fixed === "left" ? Ie++ : _.column.fixed === "right" && Je++;
        });
        const F = ({
          // Normal
          rowInfo: _,
          displayedRowIndex: W,
          isVirtual: ne,
          // Virtual X
          isVirtualX: ye,
          startColIndex: he,
          endColIndex: E,
          getLeft: j
        }) => {
          const {
            index: fe
          } = _;
          if ("isExpandedRow" in _) {
            const {
              tmNode: {
                key: le,
                rawNode: de
              }
            } = _;
            return et("tr", {
              class: `${n}-data-table-tr ${n}-data-table-tr--expanded`,
              key: `${le}__expand`
            }, et("td", {
              class: [`${n}-data-table-td`, `${n}-data-table-td--last-col`, W + 1 === Pe && `${n}-data-table-td--last-row`],
              colspan: Z
            }, T ? et("div", {
              class: `${n}-data-table-expand`,
              style: {
                width: Se
              }
            }, U(de, fe)) : U(de, fe)));
          }
          const _e = "isSummaryRow" in _, at = !_e && _.striped, {
            tmNode: vt,
            key: Ye
          } = _, {
            rawNode: Ze
          } = vt, gt = $.has(Ye), Qe = M ? M(Ze, fe) : void 0, ce = typeof b == "string" ? b : ZT(Ze, fe, b), Ce = ye ? u.filter((le, de) => !!(he <= de && de <= E || le.column.fixed)) : u, k = ye ? pt((X == null ? void 0 : X(Ze, fe)) || A) : void 0, B = Ce.map((le) => {
            var de, pe, me, xe, ze;
            const nt = le.index;
            if (W in m) {
              const rt = m[W], ct = rt.indexOf(nt);
              if (~ct)
                return rt.splice(ct, 1), null;
            }
            const {
              column: Ne
            } = le, Pt = fn(le), {
              rowSpan: Mt,
              colSpan: It
            } = Ne, Nt = _e ? ((de = _.tmNode.rawNode[Pt]) === null || de === void 0 ? void 0 : de.colSpan) || 1 : It ? It(Ze, fe) : 1, Ht = _e ? ((pe = _.tmNode.rawNode[Pt]) === null || pe === void 0 ? void 0 : pe.rowSpan) || 1 : Mt ? Mt(Ze, fe) : 1, Qt = nt + Nt === Z, jt = W + Ht === Pe, V = Ht > 1;
            if (V && (g[W] = {
              [nt]: []
            }), Nt > 1 || V)
              for (let rt = W; rt < W + Ht; ++rt) {
                V && g[W][nt].push(ve[rt]);
                for (let ct = nt; ct < nt + Nt; ++ct)
                  rt === W && ct === nt || (rt in m ? m[rt].push(ct) : m[rt] = [ct]);
              }
            const ee = V ? this.hoverKey : null, {
              cellProps: we
            } = Ne, Ee = we == null ? void 0 : we(Ze, fe), je = {
              "--indent-offset": ""
            }, Me = Ne.fixed ? "td" : De;
            return et(Me, Object.assign({}, Ee, {
              key: Pt,
              style: [{
                textAlign: Ne.align || void 0,
                width: pt(Ne.width)
              }, ye && {
                height: k
              }, ye && !Ne.fixed ? {
                position: "absolute",
                left: pt(j(nt)),
                top: 0,
                bottom: 0
              } : {
                left: pt((me = y[Pt]) === null || me === void 0 ? void 0 : me.start),
                right: pt((xe = C[Pt]) === null || xe === void 0 ? void 0 : xe.start)
              }, je, (Ee == null ? void 0 : Ee.style) || ""],
              colspan: Nt,
              rowspan: ne ? void 0 : Ht,
              "data-col-key": Pt,
              class: [`${n}-data-table-td`, Ne.className, Ee == null ? void 0 : Ee.class, _e && `${n}-data-table-td--summary`, ee !== null && g[W][nt].includes(ee) && `${n}-data-table-td--hover`, lm(Ne, R) && `${n}-data-table-td--sorting`, Ne.fixed && `${n}-data-table-td--fixed-${Ne.fixed}`, Ne.align && `${n}-data-table-td--${Ne.align}-align`, Ne.type === "selection" && `${n}-data-table-td--selection`, Ne.type === "expand" && `${n}-data-table-td--expand`, Qt && `${n}-data-table-td--last-col`, jt && `${n}-data-table-td--last-row`]
            }), ue && nt === P ? [Ew(je["--indent-offset"] = _e ? 0 : _.tmNode.level, et("div", {
              class: `${n}-data-table-indent`,
              style: q
            })), _e || _.tmNode.isLeaf ? et("div", {
              class: `${n}-data-table-expand-placeholder`
            }) : et(Zf, {
              class: `${n}-data-table-expand-trigger`,
              clsPrefix: n,
              expanded: gt,
              rowData: Ze,
              renderExpandIcon: this.renderExpandIcon,
              loading: a.has(_.key),
              onClick: () => {
                J(Ye, _.tmNode);
              }
            })] : null, Ne.type === "selection" ? _e ? null : Ne.multiple === !1 ? et(xF, {
              key: S,
              rowKey: Ye,
              disabled: _.tmNode.disabled,
              onUpdateChecked: () => {
                te(_.tmNode);
              }
            }) : et(rF, {
              key: S,
              rowKey: Ye,
              disabled: _.tmNode.disabled,
              onUpdateChecked: (rt, ct) => {
                Y(_.tmNode, rt, ct.shiftKey);
              }
            }) : Ne.type === "expand" ? _e ? null : !Ne.expandable || !((ze = Ne.expandable) === null || ze === void 0) && ze.call(Ne, Ze) ? et(Zf, {
              clsPrefix: n,
              rowData: Ze,
              expanded: gt,
              renderExpandIcon: this.renderExpandIcon,
              onClick: () => {
                J(Ye, null);
              }
            }) : null : et(IF, {
              clsPrefix: n,
              index: fe,
              row: Ze,
              column: Ne,
              isSummary: _e,
              mergedTheme: x,
              renderCell: this.renderCell
            }));
          });
          return ye && Ie && Je && B.splice(Ie, 0, et("td", {
            colspan: u.length - Ie - Je,
            style: {
              pointerEvents: "none",
              visibility: "hidden",
              height: 0
            }
          })), et("tr", Object.assign({}, Qe, {
            onMouseenter: (le) => {
              var de;
              this.hoverKey = Ye, (de = Qe == null ? void 0 : Qe.onMouseenter) === null || de === void 0 || de.call(Qe, le);
            },
            key: Ye,
            class: [`${n}-data-table-tr`, _e && `${n}-data-table-tr--summary`, at && `${n}-data-table-tr--striped`, gt && `${n}-data-table-tr--expanded`, ce, Qe == null ? void 0 : Qe.class],
            style: [Qe == null ? void 0 : Qe.style, ye && {
              height: k
            }]
          }), B);
        };
        return o ? et(Rd, {
          ref: "virtualListRef",
          items: se,
          itemSize: this.minRowHeight,
          visibleItemsTag: JE,
          visibleItemsProps: {
            clsPrefix: n,
            id: H,
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
            itemIndex: _,
            item: W,
            startColIndex: ne,
            endColIndex: ye,
            getLeft: he
          }) => F({
            displayedRowIndex: _,
            isVirtual: !0,
            isVirtualX: !0,
            rowInfo: W,
            startColIndex: ne,
            endColIndex: ye,
            getLeft: he
          }) : void 0
        }, {
          default: ({
            item: _,
            index: W,
            renderedItemWithCols: ne
          }) => ne || F({
            rowInfo: _,
            displayedRowIndex: W,
            isVirtual: !0,
            isVirtualX: !1,
            startColIndex: 0,
            endColIndex: 0,
            getLeft(ye) {
              return 0;
            }
          })
        }) : et("table", {
          class: `${n}-data-table-table`,
          onMouseleave: O,
          style: {
            tableLayout: this.mergedTableLayout
          }
        }, et("colgroup", null, u.map((_) => et("col", {
          key: _.key,
          style: _.style
        }))), this.showHeader ? et(ym, {
          discrete: !1
        }) : null, this.empty ? null : et("tbody", {
          "data-n-id": H,
          class: `${n}-data-table-tbody`
        }, se.map((_, W) => F({
          rowInfo: _,
          displayedRowIndex: W,
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
      const m = () => et("div", {
        class: [`${n}-data-table-empty`, this.loading && `${n}-data-table-empty--hide`],
        style: this.bodyStyle,
        ref: "emptyElRef"
      }, vn(this.dataTableSlots.empty, () => [et(Av, {
        theme: this.mergedTheme.peers.Empty,
        themeOverrides: this.mergedTheme.peerOverrides.Empty
      })]));
      return this.shouldDisplaySomeTablePart ? et(GE, null, f, m()) : et(To, {
        onResize: this.onResize
      }, {
        default: m
      });
    }
    return f;
  }
}), e3 = window.Vue.computed, t3 = window.Vue.defineComponent, is = window.Vue.h, n3 = window.Vue.inject, fa = window.Vue.ref, o3 = window.Vue.watchEffect, r3 = t3({
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
    } = n3(mn), d = fa(null), c = fa(null), h = fa(null), p = fa(!(n.value.length || t.value.length)), v = e3(() => ({
      maxHeight: Ct(r.value),
      minHeight: Ct(i.value)
    }));
    function f(w) {
      o.value = w.contentRect.width, s(), p.value || (p.value = !0);
    }
    function m() {
      var w;
      const {
        value: x
      } = d;
      return x ? a.value ? ((w = x.virtualListRef) === null || w === void 0 ? void 0 : w.listElRef) || null : x.$el : null;
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
      scrollTo(w, x) {
        var y;
        (y = c.value) === null || y === void 0 || y.scrollTo(w, x);
      }
    };
    return o3(() => {
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
    return is("div", {
      class: `${e}-data-table-base-table`,
      ref: "selfElRef"
    }, o ? null : is(ym, {
      ref: "headerInstRef"
    }), is(QE, {
      ref: "bodyInstRef",
      bodyStyle: this.bodyStyle,
      showHeader: o,
      flexHeight: n,
      onResize: this.handleBodyResize
    }));
  }
}), dh = a3(), i3 = D([I("data-table", `
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
 `, [I("data-table-wrapper", `
 flex-grow: 1;
 display: flex;
 flex-direction: column;
 `), K("flex-height", [D(">", [I("data-table-wrapper", [D(">", [I("data-table-base-table", `
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 `, [D(">", [I("data-table-base-table-body", "flex-basis: 0;", [
  // last-child means there is no empty icon
  // body is a scrollbar, we need to override height 100%
  D("&:last-child", "flex-grow: 1;")
])])])])])])]), D(">", [I("data-table-loading-wrapper", `
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
 `, [wi({
  originalTransform: "translateX(-50%) translateY(-50%)"
})])]), I("data-table-expand-placeholder", `
 margin-right: 8px;
 display: inline-block;
 width: 16px;
 height: 1px;
 `), I("data-table-indent", `
 display: inline-block;
 height: 1px;
 `), I("data-table-expand-trigger", `
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
 `, [K("expanded", [I("icon", "transform: rotate(90deg);", [Sn({
  originalTransform: "rotate(90deg)"
})]), I("base-icon", "transform: rotate(90deg);", [Sn({
  originalTransform: "rotate(90deg)"
})])]), I("base-loading", `
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [Sn()]), I("icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [Sn()]), I("base-icon", `
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `, [Sn()])]), I("data-table-thead", `
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-merged-th-color);
 `), I("data-table-tr", `
 position: relative;
 box-sizing: border-box;
 background-clip: padding-box;
 transition: background-color .3s var(--n-bezier);
 `, [I("data-table-expand", `
 position: sticky;
 left: 0;
 overflow: hidden;
 margin: calc(var(--n-th-padding) * -1);
 padding: var(--n-th-padding);
 box-sizing: border-box;
 `), K("striped", "background-color: var(--n-merged-td-color-striped);", [I("data-table-td", "background-color: var(--n-merged-td-color-striped);")]), ot("summary", [D("&:hover", "background-color: var(--n-merged-td-color-hover);", [D(">", [I("data-table-td", "background-color: var(--n-merged-td-color-hover);")])])])]), I("data-table-th", `
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
 `)]), dh, K("selection", `
 padding: 0;
 text-align: center;
 line-height: 0;
 z-index: 3;
 `), N("title-wrapper", `
 display: flex;
 align-items: center;
 flex-wrap: nowrap;
 max-width: 100%;
 `, [N("title", `
 flex: 1;
 min-width: 0;
 `)]), N("ellipsis", `
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
 `, [N("ellipsis", `
 max-width: calc(100% - 18px);
 `), D("&:hover", `
 background-color: var(--n-merged-th-color-hover);
 `)]), I("data-table-sorter", `
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
 `, [I("base-icon", "transition: transform .3s var(--n-bezier)"), K("desc", [I("base-icon", `
 transform: rotate(0deg);
 `)]), K("asc", [I("base-icon", `
 transform: rotate(-180deg);
 `)]), K("asc, desc", `
 color: var(--n-th-icon-color-active);
 `)]), I("data-table-resize-button", `
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
 `), K("active", [D("&::after", ` 
 background-color: var(--n-th-icon-color-active);
 `)]), D("&:hover::after", `
 background-color: var(--n-th-icon-color-active);
 `)]), I("data-table-filter", `
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
 `), K("show", `
 background-color: var(--n-th-button-color-hover);
 `), K("active", `
 background-color: var(--n-th-button-color-hover);
 color: var(--n-th-icon-color-active);
 `)])]), I("data-table-td", `
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
 `, [K("expand", [I("data-table-expand-trigger", `
 margin-right: 0;
 `)]), K("last-row", `
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
]), K("summary", `
 background-color: var(--n-merged-th-color);
 `), K("hover", `
 background-color: var(--n-merged-td-color-hover);
 `), K("sorting", `
 background-color: var(--n-merged-td-color-sorting);
 `), N("ellipsis", `
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
 `), dh]), I("data-table-empty", `
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
 `)]), N("pagination", `
 margin: var(--n-pagination-margin);
 display: flex;
 justify-content: flex-end;
 `), I("data-table-wrapper", `
 position: relative;
 opacity: 1;
 transition: opacity .3s var(--n-bezier), border-color .3s var(--n-bezier);
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 line-height: var(--n-line-height);
 `), K("loading", [I("data-table-wrapper", `
 opacity: var(--n-opacity-loading);
 pointer-events: none;
 `)]), K("single-column", [I("data-table-td", `
 border-bottom: 0 solid var(--n-merged-border-color);
 `, [D("&::after, &::before", `
 bottom: 0 !important;
 `)])]), ot("single-line", [I("data-table-th", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [K("last", `
 border-right: 0 solid var(--n-merged-border-color);
 `)]), I("data-table-td", `
 border-right: 1px solid var(--n-merged-border-color);
 `, [K("last-col", `
 border-right: 0 solid var(--n-merged-border-color);
 `)])]), K("bordered", [I("data-table-wrapper", `
 border: 1px solid var(--n-merged-border-color);
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 overflow: hidden;
 `)]), I("data-table-base-table", [K("transition-disabled", [I("data-table-th", [D("&::after, &::before", "transition: none;")]), I("data-table-td", [D("&::after, &::before", "transition: none;")])])]), K("bottom-bordered", [I("data-table-td", [K("last-row", `
 border-bottom: 1px solid var(--n-merged-border-color);
 `)])]), I("data-table-table", `
 font-variant-numeric: tabular-nums;
 width: 100%;
 word-break: break-word;
 transition: background-color .3s var(--n-bezier);
 border-collapse: separate;
 border-spacing: 0;
 background-color: var(--n-merged-td-color);
 `), I("data-table-base-table-header", `
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
 `)]), I("data-table-check-extra", `
 transition: color .3s var(--n-bezier);
 color: var(--n-th-icon-color);
 position: absolute;
 font-size: 14px;
 right: -4px;
 top: 50%;
 transform: translateY(-50%);
 z-index: 1;
 `)]), I("data-table-filter-menu", [I("scrollbar", `
 max-height: 240px;
 `), N("group", `
 display: flex;
 flex-direction: column;
 padding: 12px 12px 0 12px;
 `, [I("checkbox", `
 margin-bottom: 12px;
 margin-right: 0;
 `), I("radio", `
 margin-bottom: 12px;
 margin-right: 0;
 `)]), N("action", `
 padding: var(--n-action-padding);
 display: flex;
 flex-wrap: nowrap;
 justify-content: space-evenly;
 border-top: 1px solid var(--n-action-divider-color);
 `, [I("button", [D("&:not(:last-child)", `
 margin: var(--n-action-button-margin);
 `), D("&:last-child", `
 margin-right: 0;
 `)])]), I("divider", `
 margin: 0 !important;
 `)]), ja(I("data-table", `
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 --n-merged-th-color-hover: var(--n-th-color-hover-modal);
 --n-merged-td-color-hover: var(--n-td-color-hover-modal);
 --n-merged-th-color-sorting: var(--n-th-color-hover-modal);
 --n-merged-td-color-sorting: var(--n-td-color-hover-modal);
 --n-merged-td-color-striped: var(--n-td-color-striped-modal);
 `)), vd(I("data-table", `
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 --n-merged-th-color-hover: var(--n-th-color-hover-popover);
 --n-merged-td-color-hover: var(--n-td-color-hover-popover);
 --n-merged-th-color-sorting: var(--n-th-color-hover-popover);
 --n-merged-td-color-sorting: var(--n-td-color-hover-popover);
 --n-merged-td-color-striped: var(--n-td-color-striped-popover);
 `))]);
function a3() {
  return [K("fixed-left", `
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
 `)]), K("fixed-right", `
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
const Cn = window.Vue.computed, l3 = window.Vue.ref;
function s3(e, t) {
  const {
    paginatedDataRef: n,
    treeMateRef: o,
    selectionColumnRef: r
  } = t, i = l3(e.defaultCheckedRowKeys), l = Cn(() => {
    var C;
    const {
      checkedRowKeys: S
    } = e, b = S === void 0 ? i.value : S;
    return ((C = r.value) === null || C === void 0 ? void 0 : C.multiple) === !1 ? {
      checkedKeys: b.slice(0, 1),
      indeterminateKeys: []
    } : o.value.getCheckedKeys(b, {
      cascade: e.cascade,
      allowNotLoaded: e.allowCheckingNotLoaded
    });
  }), a = Cn(() => l.value.checkedKeys), s = Cn(() => l.value.indeterminateKeys), d = Cn(() => new Set(a.value)), c = Cn(() => new Set(s.value)), h = Cn(() => {
    const {
      value: C
    } = d;
    return n.value.reduce((S, b) => {
      const {
        key: R,
        disabled: $
      } = b;
      return S + (!$ && C.has(R) ? 1 : 0);
    }, 0);
  }), p = Cn(() => n.value.filter((C) => C.disabled).length), v = Cn(() => {
    const {
      length: C
    } = n.value, {
      value: S
    } = c;
    return h.value > 0 && h.value < C - p.value || n.value.some((b) => S.has(b.key));
  }), f = Cn(() => {
    const {
      length: C
    } = n.value;
    return h.value !== 0 && h.value === C - p.value;
  }), m = Cn(() => n.value.length === 0);
  function g(C, S, b) {
    const {
      "onUpdate:checkedRowKeys": R,
      onUpdateCheckedRowKeys: $,
      onCheckedRowKeysChange: T
    } = e, H = [], {
      value: {
        getNode: P
      }
    } = o;
    C.forEach((z) => {
      var M;
      const O = (M = P(z)) === null || M === void 0 ? void 0 : M.rawNode;
      H.push(O);
    }), R && re(R, C, H, {
      row: S,
      action: b
    }), $ && re($, C, H, {
      row: S,
      action: b
    }), T && re(T, C, H, {
      row: S,
      action: b
    }), i.value = C;
  }
  function u(C, S = !1, b) {
    if (!e.loading) {
      if (S) {
        g(Array.isArray(C) ? C.slice(0, 1) : [C], b, "check");
        return;
      }
      g(o.value.check(C, a.value, {
        cascade: e.cascade,
        allowNotLoaded: e.allowCheckingNotLoaded
      }).checkedKeys, b, "check");
    }
  }
  function w(C, S) {
    e.loading || g(o.value.uncheck(C, a.value, {
      cascade: e.cascade,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, S, "uncheck");
  }
  function x(C = !1) {
    const {
      value: S
    } = r;
    if (!S || e.loading) return;
    const b = [];
    (C ? o.value.treeNodes : n.value).forEach((R) => {
      R.disabled || b.push(R.key);
    }), g(o.value.check(b, a.value, {
      cascade: !0,
      allowNotLoaded: e.allowCheckingNotLoaded
    }).checkedKeys, void 0, "checkAll");
  }
  function y(C = !1) {
    const {
      value: S
    } = r;
    if (!S || e.loading) return;
    const b = [];
    (C ? o.value.treeNodes : n.value).forEach((R) => {
      R.disabled || b.push(R.key);
    }), g(o.value.uncheck(b, a.value, {
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
    doCheckAll: x,
    doUncheckAll: y,
    doCheck: u,
    doUncheck: w
  };
}
const d3 = window.Vue.ref, ch = window.Vue.toRef;
function c3(e, t) {
  const n = Le(() => {
    for (const d of e.columns)
      if (d.type === "expand")
        return d.renderExpand;
  }), o = Le(() => {
    let d;
    for (const c of e.columns)
      if (c.type === "expand") {
        d = c.expandable;
        break;
      }
    return d;
  }), r = d3(e.defaultExpandAll ? n != null && n.value ? (() => {
    const d = [];
    return t.value.treeNodes.forEach((c) => {
      var h;
      !((h = o.value) === null || h === void 0) && h.call(o, c.rawNode) && d.push(c.key);
    }), d;
  })() : t.value.getNonLeafKeys() : e.defaultExpandedRowKeys), i = ch(e, "expandedRowKeys"), l = ch(e, "stickyExpandedRows"), a = Xt(i, r);
  function s(d) {
    const {
      onUpdateExpandedRowKeys: c,
      "onUpdate:expandedRowKeys": h
    } = e;
    c && re(c, d), h && re(h, d), r.value = d;
  }
  return {
    stickyExpandedRowsRef: l,
    mergedExpandedRowKeysRef: a,
    renderExpandRef: n,
    expandableRef: o,
    doUpdateExpandedRowKeys: s
  };
}
const Dr = window.Vue.computed;
function u3(e, t) {
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
          style: YT(f, m !== void 0 ? Ct(t(m)) : void 0),
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
        h(m.children, v + 1), m.children.forEach((x) => {
          var y, C;
          w.colSpan += (C = (y = i.get(x)) === null || y === void 0 ? void 0 : y.colSpan) !== null && C !== void 0 ? C : 0;
        }), u + w.colSpan === a && (w.isLast = !0), i.set(m, w), n[v].push(w);
      } else {
        if (d < f) {
          d += 1;
          return;
        }
        let u = 1;
        "titleColSpan" in m && (u = (g = m.titleColSpan) !== null && g !== void 0 ? g : 1), u > 1 && (f = d + u);
        const w = d + u === a, x = {
          column: m,
          colSpan: u,
          colIndex: d,
          rowSpan: l - v + 1,
          isLast: w
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
function f3(e, t) {
  const n = Dr(() => u3(e.columns, t));
  return {
    rowsRef: Dr(() => n.value.rows),
    colsRef: Dr(() => n.value.cols),
    hasEllipsisRef: Dr(() => n.value.hasEllipsis),
    dataRelatedColsRef: Dr(() => n.value.dataRelatedCols)
  };
}
const h3 = window.Vue.ref;
function p3() {
  const e = h3({});
  function t(r) {
    return e.value[r];
  }
  function n(r, i) {
    am(r) && "key" in r && (e.value[r.key] = i);
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
const Nr = window.Vue.computed, Hr = window.Vue.ref, v3 = window.Vue.watch;
function m3(e, {
  mainTableInstRef: t,
  mergedCurrentPageRef: n,
  bodyWidthRef: o
}) {
  let r = 0;
  const i = Hr(), l = Hr(null), a = Hr([]), s = Hr(null), d = Hr([]), c = Nr(() => Ct(e.scrollX)), h = Nr(() => e.columns.filter(($) => $.fixed === "left")), p = Nr(() => e.columns.filter(($) => $.fixed === "right")), v = Nr(() => {
    const $ = {};
    let T = 0;
    function H(P) {
      P.forEach((z) => {
        const M = {
          start: T,
          end: 0
        };
        $[fn(z)] = M, "children" in z ? (H(z.children), M.end = T) : (T += Nf(z) || 0, M.end = T);
      });
    }
    return H(h.value), $;
  }), f = Nr(() => {
    const $ = {};
    let T = 0;
    function H(P) {
      for (let z = P.length - 1; z >= 0; --z) {
        const M = P[z], O = {
          start: T,
          end: 0
        };
        $[fn(M)] = O, "children" in M ? (H(M.children), O.end = T) : (T += Nf(M) || 0, O.end = T);
      }
    }
    return H(p.value), $;
  });
  function m() {
    var $, T;
    const {
      value: H
    } = h;
    let P = 0;
    const {
      value: z
    } = v;
    let M = null;
    for (let O = 0; O < H.length; ++O) {
      const U = fn(H[O]);
      if (r > ((($ = z[U]) === null || $ === void 0 ? void 0 : $.start) || 0) - P)
        M = U, P = ((T = z[U]) === null || T === void 0 ? void 0 : T.end) || 0;
      else
        break;
    }
    l.value = M;
  }
  function g() {
    a.value = [];
    let $ = e.columns.find((T) => fn(T) === l.value);
    for (; $ && "children" in $; ) {
      const T = $.children.length;
      if (T === 0) break;
      const H = $.children[T - 1];
      a.value.push(fn(H)), $ = H;
    }
  }
  function u() {
    var $, T;
    const {
      value: H
    } = p, P = Number(e.scrollX), {
      value: z
    } = o;
    if (z === null) return;
    let M = 0, O = null;
    const {
      value: U
    } = f;
    for (let L = H.length - 1; L >= 0; --L) {
      const Y = fn(H[L]);
      if (Math.round(r + ((($ = U[Y]) === null || $ === void 0 ? void 0 : $.start) || 0) + z - M) < P)
        O = Y, M = ((T = U[Y]) === null || T === void 0 ? void 0 : T.end) || 0;
      else
        break;
    }
    s.value = O;
  }
  function w() {
    d.value = [];
    let $ = e.columns.find((T) => fn(T) === s.value);
    for (; $ && "children" in $ && $.children.length; ) {
      const T = $.children[0];
      d.value.push(fn(T)), $ = T;
    }
  }
  function x() {
    const $ = t.value ? t.value.getHeaderElement() : null, T = t.value ? t.value.getBodyElement() : null;
    return {
      header: $,
      body: T
    };
  }
  function y() {
    const {
      body: $
    } = x();
    $ && ($.scrollTop = 0);
  }
  function C() {
    i.value !== "body" ? ii(b) : i.value = void 0;
  }
  function S($) {
    var T;
    (T = e.onScroll) === null || T === void 0 || T.call(e, $), i.value !== "head" ? ii(b) : i.value = void 0;
  }
  function b() {
    const {
      header: $,
      body: T
    } = x();
    if (!T) return;
    const {
      value: H
    } = o;
    if (H !== null) {
      if (e.maxHeight || e.flexHeight) {
        if (!$) return;
        const P = r - $.scrollLeft;
        i.value = P !== 0 ? "head" : "body", i.value === "head" ? (r = $.scrollLeft, T.scrollLeft = r) : (r = T.scrollLeft, $.scrollLeft = r);
      } else
        r = T.scrollLeft;
      m(), g(), u(), w();
    }
  }
  function R($) {
    const {
      header: T
    } = x();
    T && (T.scrollLeft = $, b());
  }
  return v3(n, () => {
    y();
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
    syncScrollState: b,
    handleTableBodyScroll: S,
    handleTableHeaderScroll: C,
    setHeaderScrollLeft: R
  };
}
const uh = window.Vue.computed, g3 = window.Vue.ref;
function ha(e) {
  return typeof e == "object" && typeof e.multiple == "number" ? e.multiple : !1;
}
function b3(e, t) {
  return t && (e === void 0 || e === "default" || typeof e == "object" && e.compare === "default") ? w3(t) : typeof e == "function" ? e : e && typeof e == "object" && e.compare && e.compare !== "default" ? e.compare : !1;
}
function w3(e) {
  return (t, n) => {
    const o = t[e], r = n[e];
    return o == null ? r == null ? 0 : -1 : r == null ? 1 : typeof o == "number" && typeof r == "number" ? o - r : typeof o == "string" && typeof r == "string" ? o.localeCompare(r) : 0;
  };
}
function y3(e, {
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
  const r = g3(o), i = uh(() => {
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
  }), l = uh(() => {
    const v = i.value.slice().sort((f, m) => {
      const g = ha(f.sorter) || 0;
      return (ha(m.sorter) || 0) - g;
    });
    return v.length ? n.value.slice().sort((m, g) => {
      let u = 0;
      return v.some((w) => {
        const {
          columnKey: x,
          sorter: y,
          order: C
        } = w, S = b3(y, x);
        return S && C && (u = S(m.rawNode, g.rawNode), u !== 0) ? (u = u * GT(C), !0) : !1;
      }), u;
    }) : n.value;
  });
  function a(v) {
    let f = i.value.slice();
    return v && ha(v.sorter) !== !1 ? (f = f.filter((m) => ha(m.sorter) !== !1), p(f, v), f) : v || null;
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
    f && re(f, v), m && re(m, v), g && re(g, v), r.value = v;
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
const un = window.Vue.computed, pa = window.Vue.ref;
function x3(e, {
  dataRelatedColsRef: t
}) {
  const n = un(() => {
    const X = (A) => {
      for (let G = 0; G < A.length; ++G) {
        const Z = A[G];
        if ("children" in Z)
          return X(Z.children);
        if (Z.type === "selection")
          return Z;
      }
      return null;
    };
    return X(e.columns);
  }), o = un(() => {
    const {
      childrenKey: X
    } = e;
    return Ya(e.data, {
      ignoreEmptyChildren: !0,
      getKey: e.rowKey,
      getChildren: (A) => A[X],
      getDisabled: (A) => {
        var G, Z;
        return !!(!((Z = (G = n.value) === null || G === void 0 ? void 0 : G.disabled) === null || Z === void 0) && Z.call(G, A));
      }
    });
  }), r = Le(() => {
    const {
      columns: X
    } = e, {
      length: A
    } = X;
    let G = null;
    for (let Z = 0; Z < A; ++Z) {
      const ie = X[Z];
      if (!ie.type && G === null && (G = Z), "tree" in ie && ie.tree)
        return Z;
    }
    return G || 0;
  }), i = pa({}), {
    pagination: l
  } = e, a = pa(l && l.defaultPage || 1), s = pa(em(l)), d = un(() => {
    const X = t.value.filter((Z) => Z.filterOptionValues !== void 0 || Z.filterOptionValue !== void 0), A = {};
    return X.forEach((Z) => {
      var ie;
      Z.type === "selection" || Z.type === "expand" || (Z.filterOptionValues === void 0 ? A[Z.key] = (ie = Z.filterOptionValue) !== null && ie !== void 0 ? ie : null : A[Z.key] = Z.filterOptionValues);
    }), Object.assign(Hf(i.value), A);
  }), c = un(() => {
    const X = d.value, {
      columns: A
    } = e;
    function G(ae) {
      return (ue, be) => !!~String(be[ae]).indexOf(String(ue));
    }
    const {
      value: {
        treeNodes: Z
      }
    } = o, ie = [];
    return A.forEach((ae) => {
      ae.type === "selection" || ae.type === "expand" || "children" in ae || ie.push([ae.key, ae]);
    }), Z ? Z.filter((ae) => {
      const {
        rawNode: ue
      } = ae;
      for (const [be, q] of ie) {
        let se = X[be];
        if (se == null || (Array.isArray(se) || (se = [se]), !se.length)) continue;
        const Pe = q.filter === "default" ? G(be) : q.filter;
        if (q && typeof Pe == "function")
          if (q.filterMode === "and") {
            if (se.some((ve) => !Pe(ve, ue)))
              return !1;
          } else {
            if (se.some((ve) => Pe(ve, ue)))
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
  } = y3(e, {
    dataRelatedColsRef: t,
    filteredDataRef: c
  });
  t.value.forEach((X) => {
    var A;
    if (X.filter) {
      const G = X.defaultFilterOptionValues;
      X.filterMultiple ? i.value[X.key] = G || [] : G !== void 0 ? i.value[X.key] = G === null ? [] : G : i.value[X.key] = (A = X.defaultFilterOptionValue) !== null && A !== void 0 ? A : null;
    }
  });
  const g = un(() => {
    const {
      pagination: X
    } = e;
    if (X !== !1)
      return X.page;
  }), u = un(() => {
    const {
      pagination: X
    } = e;
    if (X !== !1)
      return X.pageSize;
  }), w = Xt(g, a), x = Xt(u, s), y = Le(() => {
    const X = w.value;
    return e.remote ? X : Math.max(1, Math.min(Math.ceil(c.value.length / x.value), X));
  }), C = un(() => {
    const {
      pagination: X
    } = e;
    if (X) {
      const {
        pageCount: A
      } = X;
      if (A !== void 0) return A;
    }
  }), S = un(() => {
    if (e.remote) return o.value.treeNodes;
    if (!e.pagination) return h.value;
    const X = x.value, A = (y.value - 1) * X;
    return h.value.slice(A, A + X);
  }), b = un(() => S.value.map((X) => X.rawNode));
  function R(X) {
    const {
      pagination: A
    } = e;
    if (A) {
      const {
        onChange: G,
        "onUpdate:page": Z,
        onUpdatePage: ie
      } = A;
      G && re(G, X), ie && re(ie, X), Z && re(Z, X), P(X);
    }
  }
  function $(X) {
    const {
      pagination: A
    } = e;
    if (A) {
      const {
        onPageSizeChange: G,
        "onUpdate:pageSize": Z,
        onUpdatePageSize: ie
      } = A;
      G && re(G, X), ie && re(ie, X), Z && re(Z, X), z(X);
    }
  }
  const T = un(() => {
    if (e.remote) {
      const {
        pagination: X
      } = e;
      if (X) {
        const {
          itemCount: A
        } = X;
        if (A !== void 0) return A;
      }
      return;
    }
    return c.value.length;
  }), H = un(() => Object.assign(Object.assign({}, e.pagination), {
    // reset deprecated methods
    onChange: void 0,
    onUpdatePage: void 0,
    onUpdatePageSize: void 0,
    onPageSizeChange: void 0,
    "onUpdate:page": R,
    "onUpdate:pageSize": $,
    // writing merged props after pagination to avoid
    // pagination[key] === undefined
    // key still exists but value is undefined
    page: y.value,
    pageSize: x.value,
    pageCount: T.value === void 0 ? C.value : void 0,
    itemCount: T.value
  }));
  function P(X) {
    const {
      "onUpdate:page": A,
      onPageChange: G,
      onUpdatePage: Z
    } = e;
    Z && re(Z, X), A && re(A, X), G && re(G, X), a.value = X;
  }
  function z(X) {
    const {
      "onUpdate:pageSize": A,
      onPageSizeChange: G,
      onUpdatePageSize: Z
    } = e;
    G && re(G, X), Z && re(Z, X), A && re(A, X), s.value = X;
  }
  function M(X, A) {
    const {
      onUpdateFilters: G,
      "onUpdate:filters": Z,
      onFiltersChange: ie
    } = e;
    G && re(G, X, A), Z && re(Z, X, A), ie && re(ie, X, A), i.value = X;
  }
  function O(X, A, G, Z) {
    var ie;
    (ie = e.onUnstableColumnResize) === null || ie === void 0 || ie.call(e, X, A, G, Z);
  }
  function U(X) {
    P(X);
  }
  function L() {
    Y();
  }
  function Y() {
    te({});
  }
  function te(X) {
    J(X);
  }
  function J(X) {
    X ? X && (i.value = Hf(X)) : i.value = {};
  }
  return {
    treeMateRef: o,
    mergedCurrentPageRef: y,
    mergedPaginationRef: H,
    paginatedDataRef: S,
    rawPaginatedDataRef: b,
    mergedFilterStateRef: d,
    mergedSortStateRef: v,
    hoverKeyRef: pa(null),
    selectionColumnRef: n,
    childTriggerColIndexRef: r,
    doUpdateFilters: M,
    deriveNextSorter: p,
    doUpdatePageSize: z,
    doUpdatePage: P,
    onUnstableColumnResize: O,
    // exported methods
    filter: J,
    filters: te,
    clearFilter: L,
    clearFilters: Y,
    clearSorter: m,
    page: U,
    sort: f
  };
}
const eo = window.Vue.computed, C3 = window.Vue.defineComponent, to = window.Vue.h, S3 = window.Vue.provide, as = window.Vue.ref, ft = window.Vue.toRef, $3 = window.Vue.Transition;
window.Vue.watchEffect;
const R3 = C3({
  name: "DataTable",
  alias: ["AdvancedTable"],
  props: KT,
  slots: Object,
  setup(e, {
    slots: t
  }) {
    const {
      mergedBorderedRef: n,
      mergedClsPrefixRef: o,
      inlineThemeDisabled: r,
      mergedRtlRef: i
    } = qe(e), l = zt("DataTable", i, o), a = eo(() => {
      const {
        bottomBordered: k
      } = e;
      return n.value ? !1 : k !== void 0 ? k : !0;
    }), s = ke("DataTable", "-data-table", i3, UT, e, o), d = as(null), c = as(null), {
      getResizableWidth: h,
      clearResizableWidth: p,
      doUpdateResizableWidth: v
    } = p3(), {
      rowsRef: f,
      colsRef: m,
      dataRelatedColsRef: g,
      hasEllipsisRef: u
    } = f3(e, h), {
      treeMateRef: w,
      mergedCurrentPageRef: x,
      paginatedDataRef: y,
      rawPaginatedDataRef: C,
      selectionColumnRef: S,
      hoverKeyRef: b,
      mergedPaginationRef: R,
      mergedFilterStateRef: $,
      mergedSortStateRef: T,
      childTriggerColIndexRef: H,
      doUpdatePage: P,
      doUpdateFilters: z,
      onUnstableColumnResize: M,
      deriveNextSorter: O,
      filter: U,
      filters: L,
      clearFilter: Y,
      clearFilters: te,
      clearSorter: J,
      page: X,
      sort: A
    } = x3(e, {
      dataRelatedColsRef: g
    }), G = (k) => {
      const {
        fileName: B = "data.csv",
        keepOriginalData: Q = !1
      } = k || {}, le = Q ? e.data : C.value, de = eF(e.columns, le, e.getCsvCell, e.getCsvHeader), pe = new Blob([de], {
        type: "text/csv;charset=utf-8"
      }), me = URL.createObjectURL(pe);
      Fx(me, B.endsWith(".csv") ? B : `${B}.csv`), URL.revokeObjectURL(me);
    }, {
      doCheckAll: Z,
      doUncheckAll: ie,
      doCheck: ae,
      doUncheck: ue,
      headerCheckboxDisabledRef: be,
      someRowsCheckedRef: q,
      allRowsCheckedRef: se,
      mergedCheckedRowKeySetRef: Pe,
      mergedInderminateRowKeySetRef: ve
    } = s3(e, {
      selectionColumnRef: S,
      treeMateRef: w,
      paginatedDataRef: y
    }), {
      stickyExpandedRowsRef: $e,
      mergedExpandedRowKeysRef: Se,
      renderExpandRef: De,
      expandableRef: Ie,
      doUpdateExpandedRowKeys: Je
    } = c3(e, w), {
      handleTableBodyScroll: F,
      handleTableHeaderScroll: _,
      syncScrollState: W,
      setHeaderScrollLeft: ne,
      leftActiveFixedColKeyRef: ye,
      leftActiveFixedChildrenColKeysRef: he,
      rightActiveFixedColKeyRef: E,
      rightActiveFixedChildrenColKeysRef: j,
      leftFixedColumnsRef: fe,
      rightFixedColumnsRef: _e,
      fixedColumnLeftMapRef: at,
      fixedColumnRightMapRef: vt
    } = m3(e, {
      bodyWidthRef: d,
      mainTableInstRef: c,
      mergedCurrentPageRef: x
    }), {
      localeRef: Ye
    } = mi("DataTable"), Ze = eo(() => e.virtualScroll || e.flexHeight || e.maxHeight !== void 0 || u.value ? "fixed" : e.tableLayout);
    S3(mn, {
      props: e,
      treeMateRef: w,
      renderExpandIconRef: ft(e, "renderExpandIcon"),
      loadingKeySetRef: as(/* @__PURE__ */ new Set()),
      slots: t,
      indentRef: ft(e, "indent"),
      childTriggerColIndexRef: H,
      bodyWidthRef: d,
      componentId: ai(),
      hoverKeyRef: b,
      mergedClsPrefixRef: o,
      mergedThemeRef: s,
      scrollXRef: eo(() => e.scrollX),
      rowsRef: f,
      colsRef: m,
      paginatedDataRef: y,
      leftActiveFixedColKeyRef: ye,
      leftActiveFixedChildrenColKeysRef: he,
      rightActiveFixedColKeyRef: E,
      rightActiveFixedChildrenColKeysRef: j,
      leftFixedColumnsRef: fe,
      rightFixedColumnsRef: _e,
      fixedColumnLeftMapRef: at,
      fixedColumnRightMapRef: vt,
      mergedCurrentPageRef: x,
      someRowsCheckedRef: q,
      allRowsCheckedRef: se,
      mergedSortStateRef: T,
      mergedFilterStateRef: $,
      loadingRef: ft(e, "loading"),
      rowClassNameRef: ft(e, "rowClassName"),
      mergedCheckedRowKeySetRef: Pe,
      mergedExpandedRowKeysRef: Se,
      mergedInderminateRowKeySetRef: ve,
      localeRef: Ye,
      expandableRef: Ie,
      stickyExpandedRowsRef: $e,
      rowKeyRef: ft(e, "rowKey"),
      renderExpandRef: De,
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
          value: k
        } = S;
        return k == null ? void 0 : k.options;
      }),
      rawPaginatedDataRef: C,
      filterMenuCssVarsRef: eo(() => {
        const {
          self: {
            actionDividerColor: k,
            actionPadding: B,
            actionButtonMargin: Q
          }
        } = s.value;
        return {
          "--n-action-padding": B,
          "--n-action-button-margin": Q,
          "--n-action-divider-color": k
        };
      }),
      onLoadRef: ft(e, "onLoad"),
      mergedTableLayoutRef: Ze,
      maxHeightRef: ft(e, "maxHeight"),
      minHeightRef: ft(e, "minHeight"),
      flexHeightRef: ft(e, "flexHeight"),
      headerCheckboxDisabledRef: be,
      paginationBehaviorOnFilterRef: ft(e, "paginationBehaviorOnFilter"),
      summaryPlacementRef: ft(e, "summaryPlacement"),
      filterIconPopoverPropsRef: ft(e, "filterIconPopoverProps"),
      scrollbarPropsRef: ft(e, "scrollbarProps"),
      syncScrollState: W,
      doUpdatePage: P,
      doUpdateFilters: z,
      getResizableWidth: h,
      onUnstableColumnResize: M,
      clearResizableWidth: p,
      doUpdateResizableWidth: v,
      deriveNextSorter: O,
      doCheck: ae,
      doUncheck: ue,
      doCheckAll: Z,
      doUncheckAll: ie,
      doUpdateExpandedRowKeys: Je,
      handleTableHeaderScroll: _,
      handleTableBodyScroll: F,
      setHeaderScrollLeft: ne,
      renderCell: ft(e, "renderCell")
    });
    const gt = {
      filter: U,
      filters: L,
      clearFilters: te,
      clearSorter: J,
      page: X,
      sort: A,
      clearFilter: Y,
      downloadCsv: G,
      scrollTo: (k, B) => {
        var Q;
        (Q = c.value) === null || Q === void 0 || Q.scrollTo(k, B);
      }
    }, Qe = eo(() => {
      const {
        size: k
      } = e, {
        common: {
          cubicBezierEaseInOut: B
        },
        self: {
          borderColor: Q,
          tdColorHover: le,
          tdColorSorting: de,
          tdColorSortingModal: pe,
          tdColorSortingPopover: me,
          thColorSorting: xe,
          thColorSortingModal: ze,
          thColorSortingPopover: nt,
          thColor: Ne,
          thColorHover: Pt,
          tdColor: Mt,
          tdTextColor: It,
          thTextColor: Nt,
          thFontWeight: Ht,
          thButtonColorHover: Qt,
          thIconColor: jt,
          thIconColorActive: V,
          filterSize: ee,
          borderRadius: we,
          lineHeight: Ee,
          tdColorModal: je,
          thColorModal: Me,
          borderColorModal: rt,
          thColorHoverModal: ct,
          tdColorHoverModal: Yt,
          borderColorPopover: On,
          thColorPopover: zn,
          tdColorPopover: po,
          tdColorHoverPopover: yr,
          thColorHoverPopover: xr,
          paginationMargin: Cr,
          emptyPadding: Sr,
          boxShadowAfter: $r,
          boxShadowBefore: Kn,
          sorterSize: qn,
          resizableContainerSize: Ja,
          resizableSize: Qa,
          loadingColor: el,
          loadingSize: tl,
          opacityLoading: nl,
          tdColorStriped: ol,
          tdColorStripedModal: rl,
          tdColorStripedPopover: il,
          [oe("fontSize", k)]: al,
          [oe("thPadding", k)]: ll,
          [oe("tdPadding", k)]: sl
        }
      } = s.value;
      return {
        "--n-font-size": al,
        "--n-th-padding": ll,
        "--n-td-padding": sl,
        "--n-bezier": B,
        "--n-border-radius": we,
        "--n-line-height": Ee,
        "--n-border-color": Q,
        "--n-border-color-modal": rt,
        "--n-border-color-popover": On,
        "--n-th-color": Ne,
        "--n-th-color-hover": Pt,
        "--n-th-color-modal": Me,
        "--n-th-color-hover-modal": ct,
        "--n-th-color-popover": zn,
        "--n-th-color-hover-popover": xr,
        "--n-td-color": Mt,
        "--n-td-color-hover": le,
        "--n-td-color-modal": je,
        "--n-td-color-hover-modal": Yt,
        "--n-td-color-popover": po,
        "--n-td-color-hover-popover": yr,
        "--n-th-text-color": Nt,
        "--n-td-text-color": It,
        "--n-th-font-weight": Ht,
        "--n-th-button-color-hover": Qt,
        "--n-th-icon-color": jt,
        "--n-th-icon-color-active": V,
        "--n-filter-size": ee,
        "--n-pagination-margin": Cr,
        "--n-empty-padding": Sr,
        "--n-box-shadow-before": Kn,
        "--n-box-shadow-after": $r,
        "--n-sorter-size": qn,
        "--n-resizable-container-size": Ja,
        "--n-resizable-size": Qa,
        "--n-loading-size": tl,
        "--n-loading-color": el,
        "--n-opacity-loading": nl,
        "--n-td-color-striped": ol,
        "--n-td-color-striped-modal": rl,
        "--n-td-color-striped-popover": il,
        "--n-td-color-sorting": de,
        "--n-td-color-sorting-modal": pe,
        "--n-td-color-sorting-popover": me,
        "--n-th-color-sorting": xe,
        "--n-th-color-sorting-modal": ze,
        "--n-th-color-sorting-popover": nt
      };
    }), ce = r ? yt("data-table", eo(() => e.size[0]), Qe, e) : void 0, Ce = eo(() => {
      if (!e.pagination) return !1;
      if (e.paginateSinglePage) return !0;
      const k = R.value, {
        pageCount: B
      } = k;
      return B !== void 0 ? B > 1 : k.itemCount && k.pageSize && k.itemCount > k.pageSize;
    });
    return Object.assign({
      mainTableInstRef: c,
      mergedClsPrefix: o,
      rtlEnabled: l,
      mergedTheme: s,
      paginatedData: y,
      mergedBordered: n,
      mergedBottomBordered: a,
      mergedPagination: R,
      mergedShowPagination: Ce,
      cssVars: r ? void 0 : Qe,
      themeClass: ce == null ? void 0 : ce.themeClass,
      onRender: ce == null ? void 0 : ce.onRender
    }, gt);
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
    }, to(r3, {
      ref: "mainTableInstRef"
    })), this.mergedShowPagination ? to("div", {
      class: `${e}-data-table__pagination`
    }, to(AT, Object.assign({
      theme: this.mergedTheme.peers.Pagination,
      themeOverrides: this.mergedTheme.peerOverrides.Pagination,
      disabled: this.loading
    }, this.mergedPagination))) : null, to($3, {
      name: "fade-in-scale-up-transition"
    }, {
      default: () => this.loading ? to("div", {
        class: `${e}-data-table-loading-wrapper`
      }, vn(o.loading, () => [to(bi, Object.assign({
        clsPrefix: e,
        strokeWidth: 20
      }, r))])) : null
    }));
  }
}), k3 = "n-dialog-provider", P3 = {
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
function _3(e) {
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
    dividerColor: f,
    borderRadius: m,
    fontWeightStrong: g,
    lineHeight: u,
    fontSize: w
  } = e;
  return Object.assign(Object.assign({}, P3), {
    fontSize: w,
    lineHeight: u,
    border: `1px solid ${f}`,
    titleTextColor: t,
    textColor: n,
    color: o,
    closeColorHover: a,
    closeColorPressed: s,
    closeIconColor: r,
    closeIconColorHover: i,
    closeIconColorPressed: l,
    closeBorderRadius: m,
    iconColor: v,
    iconColorInfo: d,
    iconColorSuccess: c,
    iconColorWarning: h,
    iconColorError: p,
    borderRadius: m,
    titleFontWeight: g
  });
}
const Cm = {
  name: "Dialog",
  common: mt,
  peers: {
    Button: jd
  },
  self: _3
}, Zd = {
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
}, T3 = lo(Zd), F3 = D([I("dialog", `
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
 `, [N("icon", {
  color: "var(--n-icon-color)"
}), K("bordered", {
  border: "var(--n-border)"
}), K("icon-top", [N("close", {
  margin: "var(--n-close-margin)"
}), N("icon", {
  margin: "var(--n-icon-margin)"
}), N("content", {
  textAlign: "center"
}), N("title", {
  justifyContent: "center"
}), N("action", {
  justifyContent: "center"
})]), K("icon-left", [N("icon", {
  margin: "var(--n-icon-margin)"
}), K("closable", [N("title", `
 padding-right: calc(var(--n-close-size) + 6px);
 `)])]), N("close", `
 position: absolute;
 right: 0;
 top: 0;
 margin: var(--n-close-margin);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 z-index: 1;
 `), N("content", `
 font-size: var(--n-font-size);
 margin: var(--n-content-margin);
 position: relative;
 word-break: break-word;
 `, [K("last", "margin-bottom: 0;")]), N("action", `
 display: flex;
 justify-content: flex-end;
 `, [D("> *:not(:last-child)", `
 margin-right: var(--n-action-space);
 `)]), N("icon", `
 font-size: var(--n-icon-size);
 transition: color .3s var(--n-bezier);
 `), N("title", `
 transition: color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 font-size: var(--n-title-font-size);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `), I("dialog-icon-container", `
 display: flex;
 justify-content: center;
 `)]), ja(I("dialog", `
 width: 446px;
 max-width: calc(100vw - 32px);
 `)), I("dialog", [bp(`
 width: 446px;
 max-width: calc(100vw - 32px);
 `)])]), ls = window.Vue.computed, E3 = window.Vue.defineComponent, Lt = window.Vue.h, O3 = {
  default: () => Lt(rf, null),
  info: () => Lt(rf, null),
  success: () => Lt(Wk, null),
  warning: () => Lt(Uk, null),
  error: () => Lt(zk, null)
}, z3 = E3({
  name: "Dialog",
  alias: [
    "NimbusConfirmCard",
    // deprecated
    "Confirm"
    // deprecated
  ],
  props: Object.assign(Object.assign({}, ke.props), Zd),
  slots: Object,
  setup(e) {
    const {
      mergedComponentPropsRef: t,
      mergedClsPrefixRef: n,
      inlineThemeDisabled: o,
      mergedRtlRef: r
    } = qe(e), i = zt("Dialog", r, n), l = ls(() => {
      var v, f;
      const {
        iconPlacement: m
      } = e;
      return m || ((f = (v = t == null ? void 0 : t.value) === null || v === void 0 ? void 0 : v.Dialog) === null || f === void 0 ? void 0 : f.iconPlacement) || "left";
    });
    function a(v) {
      const {
        onPositiveClick: f
      } = e;
      f && f(v);
    }
    function s(v) {
      const {
        onNegativeClick: f
      } = e;
      f && f(v);
    }
    function d() {
      const {
        onClose: v
      } = e;
      v && v();
    }
    const c = ke("Dialog", "-dialog", F3, Cm, e, n), h = ls(() => {
      const {
        type: v
      } = e, f = l.value, {
        common: {
          cubicBezierEaseInOut: m
        },
        self: {
          fontSize: g,
          lineHeight: u,
          border: w,
          titleTextColor: x,
          textColor: y,
          color: C,
          closeBorderRadius: S,
          closeColorHover: b,
          closeColorPressed: R,
          closeIconColor: $,
          closeIconColorHover: T,
          closeIconColorPressed: H,
          closeIconSize: P,
          borderRadius: z,
          titleFontWeight: M,
          titleFontSize: O,
          padding: U,
          iconSize: L,
          actionSpace: Y,
          contentMargin: te,
          closeSize: J,
          [f === "top" ? "iconMarginIconTop" : "iconMargin"]: X,
          [f === "top" ? "closeMarginIconTop" : "closeMargin"]: A,
          [oe("iconColor", v)]: G
        }
      } = c.value, Z = Gt(X);
      return {
        "--n-font-size": g,
        "--n-icon-color": G,
        "--n-bezier": m,
        "--n-close-margin": A,
        "--n-icon-margin-top": Z.top,
        "--n-icon-margin-right": Z.right,
        "--n-icon-margin-bottom": Z.bottom,
        "--n-icon-margin-left": Z.left,
        "--n-icon-size": L,
        "--n-close-size": J,
        "--n-close-icon-size": P,
        "--n-close-border-radius": S,
        "--n-close-color-hover": b,
        "--n-close-color-pressed": R,
        "--n-close-icon-color": $,
        "--n-close-icon-color-hover": T,
        "--n-close-icon-color-pressed": H,
        "--n-color": C,
        "--n-text-color": y,
        "--n-border-radius": z,
        "--n-padding": U,
        "--n-line-height": u,
        "--n-border": w,
        "--n-content-margin": te,
        "--n-title-font-size": O,
        "--n-title-font-weight": M,
        "--n-title-text-color": x,
        "--n-action-space": Y
      };
    }), p = o ? yt("dialog", ls(() => `${e.type[0]}${l.value[0]}`), h, e) : void 0;
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
      handleNegativeClick: f,
      mergedTheme: m,
      loading: g,
      type: u,
      mergedClsPrefix: w
    } = this;
    (e = this.onRender) === null || e === void 0 || e.call(this);
    const x = i ? Lt($t, {
      clsPrefix: w,
      class: `${w}-dialog__icon`
    }, {
      default: () => dt(this.$slots.icon, (C) => C || (this.icon ? Ot(this.icon) : O3[this.type]()))
    }) : null, y = dt(this.$slots.action, (C) => C || c || d || s ? Lt("div", {
      class: [`${w}-dialog__action`, this.actionClass],
      style: this.actionStyle
    }, C || (s ? [Ot(s)] : [this.negativeText && Lt(on, Object.assign({
      theme: m.peers.Button,
      themeOverrides: m.peerOverrides.Button,
      ghost: !0,
      size: "small",
      onClick: f
    }, p), {
      default: () => Ot(this.negativeText)
    }), this.positiveText && Lt(on, Object.assign({
      theme: m.peers.Button,
      themeOverrides: m.peerOverrides.Button,
      size: "small",
      type: u === "default" ? "primary" : u,
      disabled: g,
      loading: g,
      onClick: v
    }, h), {
      default: () => Ot(this.positiveText)
    })])) : null);
    return Lt("div", {
      class: [`${w}-dialog`, this.themeClass, this.closable && `${w}-dialog--closable`, `${w}-dialog--icon-${n}`, t && `${w}-dialog--bordered`, this.rtlEnabled && `${w}-dialog--rtl`],
      style: o,
      role: "dialog"
    }, r ? dt(this.$slots.close, (C) => {
      const S = [`${w}-dialog__close`, this.rtlEnabled && `${w}-dialog--rtl`];
      return C ? Lt("div", {
        class: S
      }, C) : Lt(Ld, {
        focusable: this.closeFocusable,
        clsPrefix: w,
        class: S,
        onClick: this.handleCloseClick
      });
    }) : null, i && n === "top" ? Lt("div", {
      class: `${w}-dialog-icon-container`
    }, x) : null, Lt("div", {
      class: [`${w}-dialog__title`, this.titleClass],
      style: this.titleStyle
    }, i && n === "left" ? x : null, vn(this.$slots.header, () => [Ot(l)])), Lt("div", {
      class: [`${w}-dialog__content`, y ? "" : `${w}-dialog__content--last`, this.contentClass],
      style: this.contentStyle
    }, vn(this.$slots.default, () => [Ot(a)])), y);
  }
});
function M3(e) {
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
const I3 = {
  name: "Modal",
  common: mt,
  peers: {
    Scrollbar: gr,
    Dialog: Cm,
    Card: qv
  },
  self: M3
}, ss = window.Vue.computed;
window.Vue.inject;
const A3 = window.Vue.onUnmounted, ed = "n-draggable";
function V3(e, t) {
  let n;
  const o = ss(() => e.value !== !1), r = ss(() => o.value ? ed : ""), i = ss(() => {
    const s = e.value;
    return s === !0 || s === !1 ? !0 : s ? s.bounds !== "none" : !0;
  });
  function l(s) {
    const d = s.querySelector(`.${ed}`);
    if (!d || !r.value)
      return;
    let c = 0, h = 0, p = 0, v = 0, f = 0, m = 0, g;
    function u(y) {
      y.preventDefault(), g = y;
      const {
        x: C,
        y: S,
        right: b,
        bottom: R
      } = s.getBoundingClientRect();
      h = C, v = S, c = window.innerWidth - b, p = window.innerHeight - R;
      const {
        left: $,
        top: T
      } = s.style;
      f = +T.slice(0, -2), m = +$.slice(0, -2);
    }
    function w(y) {
      if (!g) return;
      const {
        clientX: C,
        clientY: S
      } = g;
      let b = y.clientX - C, R = y.clientY - S;
      i.value && (b > c ? b = c : -b > h && (b = -h), R > p ? R = p : -R > v && (R = -v));
      const $ = b + m, T = R + f;
      s.style.top = `${T}px`, s.style.left = `${$}px`;
    }
    function x() {
      g = void 0, t.onEnd(s);
    }
    He("mousedown", d, u), He("mousemove", window, w), He("mouseup", window, x), n = () => {
      Be("mousedown", d, u), He("mousemove", window, w), He("mouseup", window, x);
    };
  }
  function a() {
    n && (n(), n = void 0);
  }
  return A3(a), {
    stopDrag: a,
    startDrag: l,
    draggableRef: o,
    draggableClassRef: r
  };
}
const Jd = Object.assign(Object.assign({}, Wd), Zd), B3 = lo(Jd), L3 = window.Vue.cloneVNode, ds = window.Vue.computed, D3 = window.Vue.defineComponent, Qo = window.Vue.h, N3 = window.Vue.inject, H3 = window.Vue.mergeProps, fh = window.Vue.nextTick, hh = window.Vue.normalizeClass, cs = window.Vue.provide, er = window.Vue.ref, us = window.Vue.toRef, j3 = window.Vue.Transition, ph = window.Vue.vShow, fs = window.Vue.watch, vh = window.Vue.withDirectives, W3 = D3({
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
  }, Jd), {
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
    const t = er(null), n = er(null), o = er(e.show), r = er(null), i = er(null), l = N3(_p);
    let a = null;
    fs(us(e, "show"), (R) => {
      R && (a = l.getMousePosition());
    }, {
      immediate: !0
    });
    const {
      stopDrag: s,
      startDrag: d,
      draggableRef: c,
      draggableClassRef: h
    } = V3(us(e, "draggable"), {
      onEnd: (R) => {
        m(R);
      }
    }), p = ds(() => hh([e.titleClass, h.value])), v = ds(() => hh([e.headerClass, h.value]));
    fs(us(e, "show"), (R) => {
      R && (o.value = !0);
    }), D0(ds(() => e.blockScroll && o.value));
    function f() {
      if (l.transformOriginRef.value === "center")
        return "";
      const {
        value: R
      } = r, {
        value: $
      } = i;
      if (R === null || $ === null)
        return "";
      if (n.value) {
        const T = n.value.containerScrollTop;
        return `${R}px ${$ + T}px`;
      }
      return "";
    }
    function m(R) {
      if (l.transformOriginRef.value === "center" || !a || !n.value) return;
      const $ = n.value.containerScrollTop, {
        offsetLeft: T,
        offsetTop: H
      } = R, P = a.y, z = a.x;
      r.value = -(T - z), i.value = -(H - P - $), R.style.transformOrigin = f();
    }
    function g(R) {
      fh(() => {
        m(R);
      });
    }
    function u(R) {
      R.style.transformOrigin = f(), e.onBeforeLeave();
    }
    function w(R) {
      const $ = R;
      c.value && d($), e.onAfterEnter && e.onAfterEnter($);
    }
    function x() {
      o.value = !1, r.value = null, i.value = null, s(), e.onAfterLeave();
    }
    function y() {
      const {
        onClose: R
      } = e;
      R && R();
    }
    function C() {
      e.onNegativeClick();
    }
    function S() {
      e.onPositiveClick();
    }
    const b = er(null);
    return fs(b, (R) => {
      R && fh(() => {
        const $ = R.el;
        $ && t.value !== $ && (t.value = $);
      });
    }), cs(Ka, t), cs(Ua, null), cs(pi, null), {
      mergedTheme: l.mergedThemeRef,
      appear: l.appearRef,
      isMounted: l.isMountedRef,
      mergedClsPrefix: l.mergedClsPrefixRef,
      bodyRef: t,
      scrollbarRef: n,
      draggableClass: h,
      displayed: o,
      childNodeRef: b,
      cardHeaderClass: v,
      dialogTitleClass: p,
      handlePositiveClick: S,
      handleNegativeClick: C,
      handleCloseClick: y,
      handleAfterEnter: w,
      handleAfterLeave: x,
      handleBeforeLeave: u,
      handleEnter: g
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
      if (s = Dx("default", e.default, {
        draggableClass: this.draggableClass
      }), !s) {
        _n("modal", "default slot is empty");
        return;
      }
      s = L3(s), s.props = H3({
        class: `${a}-modal`
      }, t, s.props || {});
    }
    return this.displayDirective === "show" || this.displayed || this.show ? vh(Qo("div", {
      role: "none",
      class: [`${a}-modal-body-wrapper`, this.maskHidden && `${a}-modal-body-wrapper--mask-hidden`]
    }, Qo(br, {
      ref: "scrollbarRef",
      theme: this.mergedTheme.peers.Scrollbar,
      themeOverrides: this.mergedTheme.peerOverrides.Scrollbar,
      contentClass: `${a}-modal-scroll-content`
    }, {
      default: () => {
        var d;
        return [(d = this.renderMask) === null || d === void 0 ? void 0 : d.call(this), Qo(Up, {
          disabled: !this.trapFocus || this.maskHidden,
          active: this.show,
          onEsc: this.onEsc,
          autoFocus: this.autoFocus
        }, {
          default: () => {
            var c;
            return Qo(j3, {
              name: "fade-in-scale-up-transition",
              appear: (c = this.appear) !== null && c !== void 0 ? c : this.isMounted,
              onEnter: n,
              onAfterEnter: o,
              onAfterLeave: r,
              onBeforeLeave: i
            }, {
              default: () => {
                const h = [[ph, this.show]], {
                  onClickoutside: p
                } = this;
                return p && h.push([li, this.onClickoutside, void 0, {
                  capture: !0
                }]), vh(this.preset === "confirm" || this.preset === "dialog" ? Qo(z3, Object.assign({}, this.$attrs, {
                  class: [`${a}-modal`, this.$attrs.class],
                  ref: "bodyRef",
                  theme: this.mergedTheme.peers.Dialog,
                  themeOverrides: this.mergedTheme.peerOverrides.Dialog
                }, ao(this.$props, T3), {
                  titleClass: this.dialogTitleClass,
                  "aria-modal": "true"
                }), e) : this.preset === "card" ? Qo(Gv, Object.assign({}, this.$attrs, {
                  ref: "bodyRef",
                  class: [`${a}-modal`, this.$attrs.class],
                  theme: this.mergedTheme.peers.Card,
                  themeOverrides: this.mergedTheme.peerOverrides.Card
                }, ao(this.$props, W_), {
                  headerClass: this.cardHeaderClass,
                  "aria-modal": "true",
                  role: "dialog"
                }), e) : this.childNodeRef = s, h);
              }
            });
          }
        })];
      }
    })), [[ph, this.displayDirective === "if" || this.displayed || this.show]]) : null;
  }
}), U3 = D([I("modal-container", `
 position: fixed;
 left: 0;
 top: 0;
 height: 0;
 width: 0;
 display: flex;
 `), I("modal-mask", `
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 background-color: rgba(0, 0, 0, .4);
 `, [Ev({
  enterDuration: ".25s",
  leaveDuration: ".25s",
  enterCubicBezier: "var(--n-bezier-ease-out)",
  leaveCubicBezier: "var(--n-bezier-ease-out)"
})]), I("modal-body-wrapper", `
 position: fixed;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: visible;
 `, [I("modal-scroll-content", `
 min-height: 100%;
 display: flex;
 position: relative;
 `), K("mask-hidden", "pointer-events: none;", [D("> *", `
 pointer-events: all;
 `)])]), I("modal", `
 position: relative;
 align-self: center;
 color: var(--n-text-color);
 margin: auto;
 box-shadow: var(--n-box-shadow);
 `, [wi({
  duration: ".25s",
  enterScale: ".5"
}), D(`.${ed}`, `
 cursor: move;
 user-select: none;
 `)])]), mh = window.Vue.computed, K3 = window.Vue.defineComponent, jr = window.Vue.h, gh = window.Vue.inject, q3 = window.Vue.provide, G3 = window.Vue.ref, bh = window.Vue.toRef, X3 = window.Vue.Transition, Y3 = window.Vue.withDirectives, Z3 = Object.assign(Object.assign(Object.assign(Object.assign({}, ke.props), {
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
}), Jd), {
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
}), J3 = K3({
  name: "Modal",
  inheritAttrs: !1,
  props: Z3,
  slots: Object,
  setup(e) {
    const t = G3(null), {
      mergedClsPrefixRef: n,
      namespaceRef: o,
      inlineThemeDisabled: r
    } = qe(e), i = ke("Modal", "-modal", U3, I3, e, n), l = e0(64), a = Yw(), s = hi(), d = e.internalDialog ? gh(k3, null) : null, c = e.internalModal ? gh(y0, null) : null, h = I0();
    function p(S) {
      const {
        onUpdateShow: b,
        "onUpdate:show": R,
        onHide: $
      } = e;
      b && re(b, S), R && re(R, S), $ && !S && $(S);
    }
    function v() {
      const {
        onClose: S
      } = e;
      S ? Promise.resolve(S()).then((b) => {
        b !== !1 && p(!1);
      }) : p(!1);
    }
    function f() {
      const {
        onPositiveClick: S
      } = e;
      S ? Promise.resolve(S()).then((b) => {
        b !== !1 && p(!1);
      }) : p(!1);
    }
    function m() {
      const {
        onNegativeClick: S
      } = e;
      S ? Promise.resolve(S()).then((b) => {
        b !== !1 && p(!1);
      }) : p(!1);
    }
    function g() {
      const {
        onBeforeLeave: S,
        onBeforeHide: b
      } = e;
      S && re(S), b && b();
    }
    function u() {
      const {
        onAfterLeave: S,
        onAfterHide: b
      } = e;
      S && re(S), b && b();
    }
    function w(S) {
      var b;
      const {
        onMaskClick: R
      } = e;
      R && R(S), e.maskClosable && !((b = t.value) === null || b === void 0) && b.contains(ur(S)) && p(!1);
    }
    function x(S) {
      var b;
      (b = e.onEsc) === null || b === void 0 || b.call(e), e.show && e.closeOnEsc && zx(S) && (h.value || p(!1));
    }
    q3(_p, {
      getMousePosition: () => {
        const S = d || c;
        if (S) {
          const {
            clickedRef: b,
            clickedPositionRef: R
          } = S;
          if (b.value && R.value)
            return R.value;
        }
        return l.value ? a.value : null;
      },
      mergedClsPrefixRef: n,
      mergedThemeRef: i,
      isMountedRef: s,
      appearRef: bh(e, "internalAppear"),
      transformOriginRef: bh(e, "transformOrigin")
    });
    const y = mh(() => {
      const {
        common: {
          cubicBezierEaseOut: S
        },
        self: {
          boxShadow: b,
          color: R,
          textColor: $
        }
      } = i.value;
      return {
        "--n-bezier-ease-out": S,
        "--n-box-shadow": b,
        "--n-color": R,
        "--n-text-color": $
      };
    }), C = r ? yt("theme-class", void 0, y, e) : void 0;
    return {
      mergedClsPrefix: n,
      namespace: o,
      isMounted: s,
      containerRef: t,
      presetProps: mh(() => ao(e, B3)),
      handleEsc: x,
      handleAfterLeave: u,
      handleClickoutside: w,
      handleBeforeLeave: g,
      doUpdateShow: p,
      handleNegativeClick: m,
      handlePositiveClick: f,
      handleCloseClick: v,
      cssVars: r ? void 0 : y,
      themeClass: C == null ? void 0 : C.themeClass,
      onRender: C == null ? void 0 : C.onRender
    };
  },
  render() {
    const {
      mergedClsPrefix: e
    } = this;
    return jr(zp, {
      to: this.to,
      show: this.show
    }, {
      default: () => {
        var t;
        (t = this.onRender) === null || t === void 0 || t.call(this);
        const {
          showMask: n
        } = this;
        return Y3(jr("div", {
          role: "none",
          ref: "containerRef",
          class: [`${e}-modal-container`, this.themeClass, this.namespace],
          style: this.cssVars
        }, jr(W3, Object.assign({
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
            return jr(X3, {
              name: "fade-in-transition",
              key: "mask",
              appear: (o = this.internalAppear) !== null && o !== void 0 ? o : this.isMounted
            }, {
              default: () => this.show ? jr("div", {
                "aria-hidden": !0,
                ref: "containerRef",
                class: `${e}-modal-mask`,
                onClick: this.handleClickoutside
              }) : null
            });
          } : void 0
        }), this.$slots)), [[xd, {
          zIndex: this.zIndex,
          enabled: this.show
        }]]);
      }
    });
  }
}), Q3 = {
  gapSmall: "4px 8px",
  gapMedium: "8px 12px",
  gapLarge: "12px 16px"
};
function e5() {
  return Q3;
}
const t5 = {
  self: e5
};
let hs;
function n5() {
  if (!zo) return !0;
  if (hs === void 0) {
    const e = document.createElement("div");
    e.style.display = "flex", e.style.flexDirection = "column", e.style.rowGap = "1px", e.appendChild(document.createElement("div")), e.appendChild(document.createElement("div")), document.body.appendChild(e);
    const t = e.scrollHeight === 1;
    return document.body.removeChild(e), hs = t;
  }
  return hs;
}
const o5 = window.Vue.Comment, r5 = window.Vue.computed, i5 = window.Vue.defineComponent, wh = window.Vue.h, a5 = Object.assign(Object.assign({}, ke.props), {
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
}), tr = i5({
  name: "Space",
  props: a5,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedRtlRef: n
    } = qe(e), o = ke("Space", "-space", void 0, t5, e, t), r = zt("Space", n, t);
    return {
      useGap: n5(),
      rtlEnabled: r,
      mergedClsPrefix: t,
      margin: r5(() => {
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
        } = bw(l);
        return {
          horizontal: Rn(s),
          vertical: Rn(a)
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
    } = this, f = Fo(kd(this), !1);
    if (!f.length) return null;
    const m = `${a.horizontal}px`, g = `${a.horizontal / 2}px`, u = `${a.vertical}px`, w = `${a.vertical / 2}px`, x = f.length - 1, y = r.startsWith("space-");
    return wh("div", {
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
    }, !p && (h || v) ? f : f.map((C, S) => C.type === o5 ? C : wh("div", {
      role: "none",
      class: i,
      style: [l, {
        maxWidth: "100%"
      }, h ? "" : e ? {
        marginBottom: S !== x ? u : ""
      } : c ? {
        marginLeft: y ? r === "space-between" && S === x ? "" : g : S !== x ? m : "",
        marginRight: y ? r === "space-between" && S === 0 ? "" : g : "",
        paddingTop: w,
        paddingBottom: w
      } : {
        marginRight: y ? r === "space-between" && S === x ? "" : g : S !== x ? m : "",
        marginLeft: y ? r === "space-between" && S === 0 ? "" : g : "",
        paddingTop: w,
        paddingBottom: w
      }]
    }, C)));
  }
}), l5 = {
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
function s5(e) {
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
  return Object.assign(Object.assign({}, l5), {
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
const Sm = {
  common: mt,
  self: s5
}, xi = "n-form", $m = "n-form-item-insts", d5 = I("form", [K("inline", `
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `, [I("form-item", {
  width: "auto",
  marginRight: "18px"
}, [D("&:last-child", {
  marginRight: 0
})])])]);
var c5 = function(e, t, n, o) {
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
const u5 = window.Vue.defineComponent, f5 = window.Vue.h, yh = window.Vue.provide, h5 = window.Vue.ref, p5 = Object.assign(Object.assign({}, ke.props), {
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
}), xh = u5({
  name: "Form",
  props: p5,
  setup(e) {
    const {
      mergedClsPrefixRef: t
    } = qe(e);
    ke("Form", "-form", d5, Sm, e, t);
    const n = {}, o = h5(void 0), r = (s) => {
      const d = o.value;
      (d === void 0 || s >= d) && (o.value = s);
    };
    function i(s) {
      return c5(this, arguments, void 0, function* (d, c = () => !0) {
        return yield new Promise((h, p) => {
          const v = [];
          for (const f of lo(n)) {
            const m = n[f];
            for (const g of m)
              g.path && v.push(g.internalValidate(null, c));
          }
          Promise.all(v).then((f) => {
            const m = f.some((w) => !w.valid), g = [], u = [];
            f.forEach((w) => {
              var x, y;
              !((x = w.errors) === null || x === void 0) && x.length && g.push(w.errors), !((y = w.warnings) === null || y === void 0) && y.length && u.push(w.warnings);
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
      for (const s of lo(n)) {
        const d = n[s];
        for (const c of d)
          c.restoreValidation();
      }
    }
    return yh(xi, {
      props: e,
      maxChildLabelWidthRef: o,
      deriveMaxChildLabelWidth: r
    }), yh($m, {
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
    return f5("form", {
      class: [`${e}-form`, this.inline && `${e}-form--inline`],
      onSubmit: this.onSubmit
    }, this.$slots);
  }
});
function $o() {
  return $o = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n)
        Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
  }, $o.apply(this, arguments);
}
function v5(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, fi(e, t);
}
function td(e) {
  return td = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, td(e);
}
function fi(e, t) {
  return fi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, r) {
    return o.__proto__ = r, o;
  }, fi(e, t);
}
function m5() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Ra(e, t, n) {
  return m5() ? Ra = Reflect.construct.bind() : Ra = function(r, i, l) {
    var a = [null];
    a.push.apply(a, i);
    var s = Function.bind.apply(r, a), d = new s();
    return l && fi(d, l.prototype), d;
  }, Ra.apply(null, arguments);
}
function g5(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function nd(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return nd = function(o) {
    if (o === null || !g5(o)) return o;
    if (typeof o != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(o)) return t.get(o);
      t.set(o, r);
    }
    function r() {
      return Ra(o, arguments, td(this).constructor);
    }
    return r.prototype = Object.create(o.prototype, {
      constructor: {
        value: r,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), fi(r, o);
  }, nd(e);
}
var b5 = /%[sdj%]/g, w5 = function() {
};
function od(e) {
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
    var l = e.replace(b5, function(a) {
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
function y5(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function St(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || y5(t) && typeof e == "string" && !e);
}
function x5(e, t, n) {
  var o = [], r = 0, i = e.length;
  function l(a) {
    o.push.apply(o, a || []), r++, r === i && n(o);
  }
  e.forEach(function(a) {
    t(a, l);
  });
}
function Ch(e, t, n) {
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
function C5(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    t.push.apply(t, e[n] || []);
  }), t;
}
var Sh = /* @__PURE__ */ function(e) {
  v5(t, e);
  function t(n, o) {
    var r;
    return r = e.call(this, "Async Validation Error") || this, r.errors = n, r.fields = o, r;
  }
  return t;
}(/* @__PURE__ */ nd(Error));
function S5(e, t, n, o, r) {
  if (t.first) {
    var i = new Promise(function(p, v) {
      var f = function(u) {
        return o(u), u.length ? v(new Sh(u, od(u))) : p(r);
      }, m = C5(e);
      Ch(m, n, f);
    });
    return i.catch(function(p) {
      return p;
    }), i;
  }
  var l = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], a = Object.keys(e), s = a.length, d = 0, c = [], h = new Promise(function(p, v) {
    var f = function(g) {
      if (c.push.apply(c, g), d++, d === s)
        return o(c), c.length ? v(new Sh(c, od(c))) : p(r);
    };
    a.length || (o(c), p(r)), a.forEach(function(m) {
      var g = e[m];
      l.indexOf(m) !== -1 ? Ch(g, n, f) : x5(g, n, f);
    });
  });
  return h.catch(function(p) {
    return p;
  }), h;
}
function $5(e) {
  return !!(e && e.message !== void 0);
}
function R5(e, t) {
  for (var n = e, o = 0; o < t.length; o++) {
    if (n == null)
      return n;
    n = n[t[o]];
  }
  return n;
}
function $h(e, t) {
  return function(n) {
    var o;
    return e.fullFields ? o = R5(t, e.fullFields) : o = t[n.field || e.fullField], $5(n) ? (n.field = n.field || e.fullField, n.fieldValue = o, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: o,
      field: n.field || e.fullField
    };
  };
}
function Rh(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var o = t[n];
        typeof o == "object" && typeof e[n] == "object" ? e[n] = $o({}, e[n], o) : e[n] = o;
      }
  }
  return e;
}
var Rm = function(t, n, o, r, i, l) {
  t.required && (!o.hasOwnProperty(t.field) || St(n, l || t.type)) && r.push(Jt(i.messages.required, t.fullField));
}, k5 = function(t, n, o, r, i) {
  (/^\s+$/.test(n) || n === "") && r.push(Jt(i.messages.whitespace, t.fullField));
}, va, P5 = function() {
  if (va)
    return va;
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
  var d = "(?:(?:[a-z]+:)?//)", c = "(?:\\S+(?::\\S*)?@)?", h = s.v4().source, p = s.v6().source, v = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", f = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", m = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", g = "(?::\\d{2,5})?", u = '(?:[/?#][^\\s"]*)?', w = "(?:" + d + "|www\\.)" + c + "(?:localhost|" + h + "|" + p + "|" + v + f + m + ")" + g + u;
  return va = new RegExp("(?:^" + w + "$)", "i"), va;
}, kh = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, Kr = {
  integer: function(t) {
    return Kr.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return Kr.number(t) && !Kr.integer(t);
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
    return typeof t == "object" && !Kr.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(kh.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(P5());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(kh.hex);
  }
}, _5 = function(t, n, o, r, i) {
  if (t.required && n === void 0) {
    Rm(t, n, o, r, i);
    return;
  }
  var l = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], a = t.type;
  l.indexOf(a) > -1 ? Kr[a](n) || r.push(Jt(i.messages.types[a], t.fullField, t.type)) : a && typeof n !== t.type && r.push(Jt(i.messages.types[a], t.fullField, t.type));
}, T5 = function(t, n, o, r, i) {
  var l = typeof t.len == "number", a = typeof t.min == "number", s = typeof t.max == "number", d = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, c = n, h = null, p = typeof n == "number", v = typeof n == "string", f = Array.isArray(n);
  if (p ? h = "number" : v ? h = "string" : f && (h = "array"), !h)
    return !1;
  f && (c = n.length), v && (c = n.replace(d, "_").length), l ? c !== t.len && r.push(Jt(i.messages[h].len, t.fullField, t.len)) : a && !s && c < t.min ? r.push(Jt(i.messages[h].min, t.fullField, t.min)) : s && !a && c > t.max ? r.push(Jt(i.messages[h].max, t.fullField, t.max)) : a && s && (c < t.min || c > t.max) && r.push(Jt(i.messages[h].range, t.fullField, t.min, t.max));
}, nr = "enum", F5 = function(t, n, o, r, i) {
  t[nr] = Array.isArray(t[nr]) ? t[nr] : [], t[nr].indexOf(n) === -1 && r.push(Jt(i.messages[nr], t.fullField, t[nr].join(", ")));
}, E5 = function(t, n, o, r, i) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(n) || r.push(Jt(i.messages.pattern.mismatch, t.fullField, n, t.pattern));
    else if (typeof t.pattern == "string") {
      var l = new RegExp(t.pattern);
      l.test(n) || r.push(Jt(i.messages.pattern.mismatch, t.fullField, n, t.pattern));
    }
  }
}, Oe = {
  required: Rm,
  whitespace: k5,
  type: _5,
  range: T5,
  enum: F5,
  pattern: E5
}, O5 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (St(n, "string") && !t.required)
      return o();
    Oe.required(t, n, r, l, i, "string"), St(n, "string") || (Oe.type(t, n, r, l, i), Oe.range(t, n, r, l, i), Oe.pattern(t, n, r, l, i), t.whitespace === !0 && Oe.whitespace(t, n, r, l, i));
  }
  o(l);
}, z5 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (St(n) && !t.required)
      return o();
    Oe.required(t, n, r, l, i), n !== void 0 && Oe.type(t, n, r, l, i);
  }
  o(l);
}, M5 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (n === "" && (n = void 0), St(n) && !t.required)
      return o();
    Oe.required(t, n, r, l, i), n !== void 0 && (Oe.type(t, n, r, l, i), Oe.range(t, n, r, l, i));
  }
  o(l);
}, I5 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (St(n) && !t.required)
      return o();
    Oe.required(t, n, r, l, i), n !== void 0 && Oe.type(t, n, r, l, i);
  }
  o(l);
}, A5 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (St(n) && !t.required)
      return o();
    Oe.required(t, n, r, l, i), St(n) || Oe.type(t, n, r, l, i);
  }
  o(l);
}, V5 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (St(n) && !t.required)
      return o();
    Oe.required(t, n, r, l, i), n !== void 0 && (Oe.type(t, n, r, l, i), Oe.range(t, n, r, l, i));
  }
  o(l);
}, B5 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (St(n) && !t.required)
      return o();
    Oe.required(t, n, r, l, i), n !== void 0 && (Oe.type(t, n, r, l, i), Oe.range(t, n, r, l, i));
  }
  o(l);
}, L5 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (n == null && !t.required)
      return o();
    Oe.required(t, n, r, l, i, "array"), n != null && (Oe.type(t, n, r, l, i), Oe.range(t, n, r, l, i));
  }
  o(l);
}, D5 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (St(n) && !t.required)
      return o();
    Oe.required(t, n, r, l, i), n !== void 0 && Oe.type(t, n, r, l, i);
  }
  o(l);
}, N5 = "enum", H5 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (St(n) && !t.required)
      return o();
    Oe.required(t, n, r, l, i), n !== void 0 && Oe[N5](t, n, r, l, i);
  }
  o(l);
}, j5 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (St(n, "string") && !t.required)
      return o();
    Oe.required(t, n, r, l, i), St(n, "string") || Oe.pattern(t, n, r, l, i);
  }
  o(l);
}, W5 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (St(n, "date") && !t.required)
      return o();
    if (Oe.required(t, n, r, l, i), !St(n, "date")) {
      var s;
      n instanceof Date ? s = n : s = new Date(n), Oe.type(t, s, r, l, i), s && Oe.range(t, s.getTime(), r, l, i);
    }
  }
  o(l);
}, U5 = function(t, n, o, r, i) {
  var l = [], a = Array.isArray(n) ? "array" : typeof n;
  Oe.required(t, n, r, l, i, a), o(l);
}, ps = function(t, n, o, r, i) {
  var l = t.type, a = [], s = t.required || !t.required && r.hasOwnProperty(t.field);
  if (s) {
    if (St(n, l) && !t.required)
      return o();
    Oe.required(t, n, r, a, i, l), St(n, l) || Oe.type(t, n, r, a, i);
  }
  o(a);
}, K5 = function(t, n, o, r, i) {
  var l = [], a = t.required || !t.required && r.hasOwnProperty(t.field);
  if (a) {
    if (St(n) && !t.required)
      return o();
    Oe.required(t, n, r, l, i);
  }
  o(l);
}, Qr = {
  string: O5,
  method: z5,
  number: M5,
  boolean: I5,
  regexp: A5,
  integer: V5,
  float: B5,
  array: L5,
  object: D5,
  enum: H5,
  pattern: j5,
  date: W5,
  url: ps,
  hex: ps,
  email: ps,
  required: U5,
  any: K5
};
function rd() {
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
var id = rd(), pr = /* @__PURE__ */ function() {
  function e(n) {
    this.rules = null, this._messages = id, this.define(n);
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
    return o && (this._messages = Rh(rd(), o)), this._messages;
  }, t.validate = function(o, r, i) {
    var l = this;
    r === void 0 && (r = {}), i === void 0 && (i = function() {
    });
    var a = o, s = r, d = i;
    if (typeof s == "function" && (d = s, s = {}), !this.rules || Object.keys(this.rules).length === 0)
      return d && d(null, a), Promise.resolve(a);
    function c(m) {
      var g = [], u = {};
      function w(y) {
        if (Array.isArray(y)) {
          var C;
          g = (C = g).concat.apply(C, y);
        } else
          g.push(y);
      }
      for (var x = 0; x < m.length; x++)
        w(m[x]);
      g.length ? (u = od(g), d(g, u)) : d(null, a);
    }
    if (s.messages) {
      var h = this.messages();
      h === id && (h = rd()), Rh(h, s.messages), s.messages = h;
    } else
      s.messages = this.messages();
    var p = {}, v = s.keys || Object.keys(this.rules);
    v.forEach(function(m) {
      var g = l.rules[m], u = a[m];
      g.forEach(function(w) {
        var x = w;
        typeof x.transform == "function" && (a === o && (a = $o({}, a)), u = a[m] = x.transform(u)), typeof x == "function" ? x = {
          validator: x
        } : x = $o({}, x), x.validator = l.getValidationMethod(x), x.validator && (x.field = m, x.fullField = x.fullField || m, x.type = l.getType(x), p[m] = p[m] || [], p[m].push({
          rule: x,
          value: u,
          source: a,
          field: m
        }));
      });
    });
    var f = {};
    return S5(p, s, function(m, g) {
      var u = m.rule, w = (u.type === "object" || u.type === "array") && (typeof u.fields == "object" || typeof u.defaultField == "object");
      w = w && (u.required || !u.required && m.value), u.field = m.field;
      function x(S, b) {
        return $o({}, b, {
          fullField: u.fullField + "." + S,
          fullFields: u.fullFields ? [].concat(u.fullFields, [S]) : [S]
        });
      }
      function y(S) {
        S === void 0 && (S = []);
        var b = Array.isArray(S) ? S : [S];
        !s.suppressWarning && b.length && e.warning("async-validator:", b), b.length && u.message !== void 0 && (b = [].concat(u.message));
        var R = b.map($h(u, a));
        if (s.first && R.length)
          return f[u.field] = 1, g(R);
        if (!w)
          g(R);
        else {
          if (u.required && !m.value)
            return u.message !== void 0 ? R = [].concat(u.message).map($h(u, a)) : s.error && (R = [s.error(u, Jt(s.messages.required, u.field))]), g(R);
          var $ = {};
          u.defaultField && Object.keys(m.value).map(function(P) {
            $[P] = u.defaultField;
          }), $ = $o({}, $, m.rule.fields);
          var T = {};
          Object.keys($).forEach(function(P) {
            var z = $[P], M = Array.isArray(z) ? z : [z];
            T[P] = M.map(x.bind(null, P));
          });
          var H = new e(T);
          H.messages(s.messages), m.rule.options && (m.rule.options.messages = s.messages, m.rule.options.error = s.error), H.validate(m.value, m.rule.options || s, function(P) {
            var z = [];
            R && R.length && z.push.apply(z, R), P && P.length && z.push.apply(z, P), g(z.length ? z : null);
          });
        }
      }
      var C;
      if (u.asyncValidator)
        C = u.asyncValidator(u, m.value, y, m.source, s);
      else if (u.validator) {
        try {
          C = u.validator(u, m.value, y, m.source, s);
        } catch (S) {
          console.error == null || console.error(S), s.suppressValidatorError || setTimeout(function() {
            throw S;
          }, 0), y(S.message);
        }
        C === !0 ? y() : C === !1 ? y(typeof u.message == "function" ? u.message(u.fullField || u.field) : u.message || (u.fullField || u.field) + " fails") : C instanceof Array ? y(C) : C instanceof Error && y(C.message);
      }
      C && C.then && C.then(function() {
        return y();
      }, function(S) {
        return y(S);
      });
    }, function(m) {
      c(m);
    }, a);
  }, t.getType = function(o) {
    if (o.type === void 0 && o.pattern instanceof RegExp && (o.type = "pattern"), typeof o.validator != "function" && o.type && !Qr.hasOwnProperty(o.type))
      throw new Error(Jt("Unknown rule type %s", o.type));
    return o.type || "string";
  }, t.getValidationMethod = function(o) {
    if (typeof o.validator == "function")
      return o.validator;
    var r = Object.keys(o), i = r.indexOf("message");
    return i !== -1 && r.splice(i, 1), r.length === 1 && r[0] === "required" ? Qr.required : Qr[this.getType(o)] || void 0;
  }, e;
}();
pr.register = function(t, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  Qr[t] = n;
};
pr.warning = w5;
pr.messages = id;
pr.validators = Qr;
const {
  cubicBezierEaseInOut: Ph
} = Lo;
function q5({
  name: e = "fade-down",
  fromOffset: t = "-4px",
  enterDuration: n = ".3s",
  leaveDuration: o = ".3s",
  enterCubicBezier: r = Ph,
  leaveCubicBezier: i = Ph
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
const G5 = I("form-item", `
 display: grid;
 line-height: var(--n-line-height);
`, [I("form-item-label", `
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
 `, [N("asterisk", `
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 color: var(--n-asterisk-color);
 transition: color .3s var(--n-bezier);
 `), N("asterisk-placeholder", `
 grid-area: mark;
 user-select: none;
 -webkit-user-select: none;
 visibility: hidden; 
 `)]), I("form-item-blank", `
 grid-area: blank;
 min-height: var(--n-blank-height);
 `), K("auto-label-width", [I("form-item-label", "white-space: nowrap;")]), K("left-labelled", `
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 grid-template-rows: auto 1fr;
 align-items: flex-start;
 `, [I("form-item-label", `
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
 `), N("text", `
 grid-area: text; 
 `), N("asterisk", `
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
 `), I("form-item-label", `
 display: flex;
 align-items: flex-start;
 justify-content: var(--n-label-text-align);
 `)]), I("form-item-blank", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 position: relative;
 `), I("form-item-feedback-wrapper", `
 grid-area: feedback;
 box-sizing: border-box;
 min-height: var(--n-feedback-height);
 font-size: var(--n-feedback-font-size);
 line-height: 1.25;
 transform-origin: top left;
 `, [D("&:not(:empty)", `
 padding: var(--n-feedback-padding);
 `), I("form-item-feedback", {
  transition: "color .3s var(--n-bezier)",
  color: "var(--n-feedback-text-color)"
}, [K("warning", {
  color: "var(--n-feedback-text-color-warning)"
}), K("error", {
  color: "var(--n-feedback-text-color-error)"
}), q5({
  fromOffset: "-3px",
  enterDuration: ".3s",
  leaveDuration: ".2s"
})])])]), Dt = window.Vue.computed, Qd = window.Vue.inject, _h = window.Vue.ref;
function X5(e) {
  const t = Qd(xi, null);
  return {
    mergedSize: Dt(() => e.size !== void 0 ? e.size : (t == null ? void 0 : t.props.size) !== void 0 ? t.props.size : "medium")
  };
}
function Y5(e) {
  const t = Qd(xi, null), n = Dt(() => {
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
      return Ct(f);
    if (o.value) {
      const m = t == null ? void 0 : t.maxChildLabelWidthRef.value;
      return m !== void 0 ? Ct(m) : void 0;
    }
    if ((t == null ? void 0 : t.props.labelWidth) !== void 0)
      return Ct(t.props.labelWidth);
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
  }), d = _h(!1), c = _h(!1), h = Dt(() => {
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
function Z5(e) {
  const t = Qd(xi, null), n = Dt(() => {
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
        const c = ui(s, d);
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
var Th = function(e, t, n, o) {
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
const vs = window.Vue.computed, J5 = window.Vue.defineComponent, qt = window.Vue.h, Q5 = window.Vue.inject, eO = window.Vue.onMounted, tO = window.Vue.provide, ma = window.Vue.ref, ga = window.Vue.toRef, nO = window.Vue.Transition, oO = window.Vue.watch, ec = Object.assign(Object.assign({}, ke.props), {
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
}), rO = lo(ec);
function Fh(e, t) {
  return (...n) => {
    try {
      const o = e(...n);
      return !t && (typeof o == "boolean" || o instanceof Error || Array.isArray(o)) || o != null && o.then ? o : (o === void 0 || _n("form-item/validate", `You return a ${typeof o} typed value in the validator method, which is not recommended. Please use ${t ? "`Promise`" : "`boolean`, `Error` or `Promise`"} typed value instead.`), !0);
    } catch (o) {
      _n("form-item/validate", "An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation."), console.error(o);
      return;
    }
  };
}
const iO = J5({
  name: "FormItem",
  props: ec,
  setup(e) {
    _0($m, "formItems", ga(e, "path"));
    const {
      mergedClsPrefixRef: t,
      inlineThemeDisabled: n
    } = qe(e), o = Q5(xi, null), r = X5(e), i = Y5(e), {
      validationErrored: l,
      validationWarned: a
    } = i, {
      mergedRequired: s,
      mergedRules: d
    } = Z5(e), {
      mergedSize: c
    } = r, {
      mergedLabelPlacement: h,
      mergedLabelAlign: p,
      mergedRequireMarkPlacement: v
    } = i, f = ma([]), m = ma(ai()), g = o ? ga(o.props, "disabled") : ma(!1), u = ke("Form", "-form-item", G5, Sm, e, t);
    oO(ga(e, "path"), () => {
      e.ignorePathChange || w();
    });
    function w() {
      f.value = [], l.value = !1, a.value = !1, e.feedback && (m.value = ai());
    }
    const x = (...M) => Th(this, [...M], void 0, function* (O = null, U = () => !0, L = {
      suppressWarning: !0
    }) {
      const {
        path: Y
      } = e;
      L ? L.first || (L.first = e.first) : L = {};
      const {
        value: te
      } = d, J = o ? ui(o.props.model, Y || "") : void 0, X = {}, A = {}, G = (O ? te.filter((ve) => Array.isArray(ve.trigger) ? ve.trigger.includes(O) : ve.trigger === O) : te).filter(U).map((ve, $e) => {
        const Se = Object.assign({}, ve);
        if (Se.validator && (Se.validator = Fh(Se.validator, !1)), Se.asyncValidator && (Se.asyncValidator = Fh(Se.asyncValidator, !0)), Se.renderMessage) {
          const De = `__renderMessage__${$e}`;
          A[De] = Se.message, Se.message = De, X[De] = Se.renderMessage;
        }
        return Se;
      }), Z = G.filter((ve) => ve.level !== "warning"), ie = G.filter((ve) => ve.level === "warning"), ae = {
        valid: !0,
        errors: void 0,
        warnings: void 0
      };
      if (!G.length) return ae;
      const ue = Y ?? "__n_no_path__", be = new pr({
        [ue]: Z
      }), q = new pr({
        [ue]: ie
      }), {
        validateMessages: se
      } = (o == null ? void 0 : o.props) || {};
      se && (be.messages(se), q.messages(se));
      const Pe = (ve) => {
        f.value = ve.map(($e) => {
          const Se = ($e == null ? void 0 : $e.message) || "";
          return {
            key: Se,
            render: () => Se.startsWith("__renderMessage__") ? X[Se]() : Se
          };
        }), ve.forEach(($e) => {
          var Se;
          !((Se = $e.message) === null || Se === void 0) && Se.startsWith("__renderMessage__") && ($e.message = A[$e.message]);
        });
      };
      if (Z.length) {
        const ve = yield new Promise(($e) => {
          be.validate({
            [ue]: J
          }, L, $e);
        });
        ve != null && ve.length && (ae.valid = !1, ae.errors = ve, Pe(ve));
      }
      if (ie.length && !ae.errors) {
        const ve = yield new Promise(($e) => {
          q.validate({
            [ue]: J
          }, L, $e);
        });
        ve != null && ve.length && (Pe(ve), ae.warnings = ve);
      }
      return !ae.errors && !ae.warnings ? w() : (l.value = !!ae.errors, a.value = !!ae.warnings), ae;
    });
    function y() {
      x("blur");
    }
    function C() {
      x("change");
    }
    function S() {
      x("focus");
    }
    function b() {
      x("input");
    }
    function R(M, O) {
      return Th(this, void 0, void 0, function* () {
        let U, L, Y, te;
        return typeof M == "string" ? (U = M, L = O) : M !== null && typeof M == "object" && (U = M.trigger, L = M.callback, Y = M.shouldRuleBeApplied, te = M.options), yield new Promise((J, X) => {
          x(U, Y, te).then(({
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
            }), X(G));
          });
        });
      });
    }
    tO(Ds, {
      path: ga(e, "path"),
      disabled: g,
      mergedSize: r.mergedSize,
      mergedValidationStatus: i.mergedValidationStatus,
      restoreValidation: w,
      handleContentBlur: y,
      handleContentChange: C,
      handleContentFocus: S,
      handleContentInput: b
    });
    const $ = {
      validate: R,
      restoreValidation: w,
      internalValidate: x
    }, T = ma(null);
    eO(() => {
      if (!i.isAutoLabelWidth.value) return;
      const M = T.value;
      if (M !== null) {
        const O = M.style.whiteSpace;
        M.style.whiteSpace = "nowrap", M.style.width = "", o == null || o.deriveMaxChildLabelWidth(Number(getComputedStyle(M).width.slice(0, -2))), M.style.whiteSpace = O;
      }
    });
    const H = vs(() => {
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
          labelTextColor: te,
          asteriskColor: J,
          lineHeight: X,
          feedbackTextColor: A,
          feedbackTextColorWarning: G,
          feedbackTextColorError: Z,
          feedbackPadding: ie,
          labelFontWeight: ae,
          [oe("labelHeight", O)]: ue,
          [oe("blankHeight", O)]: be,
          [oe("feedbackFontSize", O)]: q,
          [oe("feedbackHeight", O)]: se,
          [oe("labelPadding", L)]: Pe,
          [oe("labelTextAlign", L)]: ve,
          [oe(oe("labelFontSize", U), O)]: $e
        }
      } = u.value;
      let Se = (M = p.value) !== null && M !== void 0 ? M : ve;
      return U === "top" && (Se = Se === "right" ? "flex-end" : "flex-start"), {
        "--n-bezier": Y,
        "--n-line-height": X,
        "--n-blank-height": be,
        "--n-label-font-size": $e,
        "--n-label-text-align": Se,
        "--n-label-height": ue,
        "--n-label-padding": Pe,
        "--n-label-font-weight": ae,
        "--n-asterisk-color": J,
        "--n-label-text-color": te,
        "--n-feedback-padding": ie,
        "--n-feedback-font-size": q,
        "--n-feedback-height": se,
        "--n-feedback-text-color": A,
        "--n-feedback-text-color-warning": G,
        "--n-feedback-text-color-error": Z
      };
    }), P = n ? yt("form-item", vs(() => {
      var M;
      return `${c.value[0]}${h.value[0]}${((M = p.value) === null || M === void 0 ? void 0 : M[0]) || ""}`;
    }), H, e) : void 0, z = vs(() => h.value === "left" && v.value === "left" && p.value === "left");
    return Object.assign(Object.assign(Object.assign(Object.assign({
      labelElementRef: T,
      mergedClsPrefix: t,
      mergedRequired: s,
      feedbackId: m,
      renderExplains: f,
      reverseColSpace: z
    }, i), r), $), {
      cssVars: n ? void 0 : H,
      themeClass: P == null ? void 0 : P.themeClass,
      onRender: P == null ? void 0 : P.onRender
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
    }, qt(nO, {
      name: "fade-down-transition",
      mode: "out-in"
    }, {
      default: () => {
        const {
          mergedValidationStatus: s
        } = this;
        return dt(e.feedback, (d) => {
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
}), Eh = 1, km = "n-grid", aO = window.Vue.computed, lO = window.Vue.defineComponent, sO = window.Vue.getCurrentInstance, Oh = window.Vue.h, dO = window.Vue.inject, Pm = 1, tc = {
  span: {
    type: [Number, String],
    default: Pm
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
}, cO = lo(tc), uO = lO({
  __GRID_ITEM__: !0,
  name: "GridItem",
  alias: ["Gi"],
  props: tc,
  setup() {
    const {
      isSsrRef: e,
      xGapRef: t,
      itemStyleRef: n,
      overflowRef: o,
      layoutShiftDisabledRef: r
    } = dO(km), i = sO();
    return {
      overflow: o,
      itemStyle: n,
      layoutShiftDisabled: r,
      mergedXGap: aO(() => pt(t.value || 0)),
      deriveStyle: () => {
        e.value;
        const {
          privateSpan: l = Pm,
          privateShow: a = !0,
          privateColStart: s = void 0,
          privateOffset: d = 0
        } = i.vnode.props, {
          value: c
        } = t, h = pt(c || 0);
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
      return Oh("div", {
        style: {
          gridColumn: `span ${n} / span ${n}`,
          marginLeft: o ? `calc((100% - (${n} - 1) * ${r}) / ${n} * ${o} + ${r} * ${o})` : ""
        }
      }, this.$slots);
    }
    return Oh("div", {
      style: [this.itemStyle, this.deriveStyle()]
    }, (t = (e = this.$slots).default) === null || t === void 0 ? void 0 : t.call(e, {
      overflow: this.overflow
    }));
  }
}), fO = window.Vue.defineComponent, zh = window.Vue.h, hO = window.Vue.ref, pO = Object.assign(Object.assign({}, tc), ec), or = fO({
  __GRID_ITEM__: !0,
  name: "FormItemGridItem",
  alias: ["FormItemGi"],
  props: pO,
  setup() {
    const e = hO(null);
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
    return zh(uO, ao(this.$.vnode.props || {}, cO), {
      default: () => {
        const e = ao(this.$props, rO);
        return zh(iO, Object.assign({
          ref: "formItemInstRef"
        }, e), this.$slots);
      }
    });
  }
}), vO = {
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
}, Mh = window.Vue.cloneVNode, ms = window.Vue.computed, mO = window.Vue.defineComponent, gs = window.Vue.h, Ih = window.Vue.mergeProps, gO = window.Vue.onMounted, bO = window.Vue.provide, ba = window.Vue.ref, Ah = window.Vue.toRef, wO = window.Vue.vShow, _m = 24, bs = "__ssr__", yO = {
  layoutShiftDisabled: Boolean,
  responsive: {
    type: [String, Boolean],
    default: "self"
  },
  cols: {
    type: [Number, String],
    default: _m
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
}, Vh = mO({
  name: "Grid",
  inheritAttrs: !1,
  props: yO,
  setup(e) {
    const {
      mergedClsPrefixRef: t,
      mergedBreakpointsRef: n
    } = qe(e), o = /^\d+$/, r = ba(void 0), i = h0((n == null ? void 0 : n.value) || vO), l = Le(() => !!(e.itemResponsive || !o.test(e.cols.toString()) || !o.test(e.xGap.toString()) || !o.test(e.yGap.toString()))), a = ms(() => {
      if (l.value)
        return e.responsive === "self" ? r.value : i.value;
    }), s = Le(() => {
      var u;
      return (u = Number(No(e.cols.toString(), a.value))) !== null && u !== void 0 ? u : _m;
    }), d = Le(() => No(e.xGap.toString(), a.value)), c = Le(() => No(e.yGap.toString(), a.value)), h = (u) => {
      r.value = u.contentRect.width;
    }, p = (u) => {
      ii(h, u);
    }, v = ba(!1), f = ms(() => {
      if (e.responsive === "self")
        return p;
    }), m = ba(!1), g = ba();
    return gO(() => {
      const {
        value: u
      } = g;
      u && u.hasAttribute(bs) && (u.removeAttribute(bs), m.value = !0);
    }), bO(km, {
      layoutShiftDisabledRef: Ah(e, "layoutShiftDisabled"),
      isSsrRef: m,
      itemStyleRef: Ah(e, "itemStyle"),
      xGapRef: d,
      overflowRef: v
    }), {
      isSsr: !zo,
      contentEl: g,
      mergedClsPrefix: t,
      style: ms(() => e.layoutShiftDisabled ? {
        width: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${e.cols}, minmax(0, 1fr))`,
        columnGap: pt(e.xGap),
        rowGap: pt(e.yGap)
      } : {
        width: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${s.value}, minmax(0, 1fr))`,
        columnGap: pt(d.value),
        rowGap: pt(c.value)
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
      return gs("div", Ih({
        ref: "contentEl",
        class: `${this.mergedClsPrefix}-grid`,
        style: this.style
      }, this.$attrs), this.$slots);
    const e = () => {
      var t, n, o, r, i, l, a;
      this.overflow = !1;
      const s = Fo(kd(this)), d = [], {
        collapsed: c,
        collapsedRows: h,
        responsiveCols: p,
        responsiveQuery: v
      } = this;
      s.forEach((w) => {
        var x, y, C, S, b;
        if (((x = w == null ? void 0 : w.type) === null || x === void 0 ? void 0 : x.__GRID_ITEM__) !== !0) return;
        if (Hx(w)) {
          const T = Mh(w);
          T.props ? T.props.privateShow = !1 : T.props = {
            privateShow: !1
          }, d.push({
            child: T,
            rawChildSpan: 0
          });
          return;
        }
        w.dirs = ((y = w.dirs) === null || y === void 0 ? void 0 : y.filter(({
          dir: T
        }) => T !== wO)) || null, ((C = w.dirs) === null || C === void 0 ? void 0 : C.length) === 0 && (w.dirs = null);
        const R = Mh(w), $ = Number((b = No((S = R.props) === null || S === void 0 ? void 0 : S.span, v)) !== null && b !== void 0 ? b : Eh);
        $ !== 0 && d.push({
          child: R,
          rawChildSpan: $
        });
      });
      let f = 0;
      const m = (t = d[d.length - 1]) === null || t === void 0 ? void 0 : t.child;
      if (m != null && m.props) {
        const w = (n = m.props) === null || n === void 0 ? void 0 : n.suffix;
        w !== void 0 && w !== !1 && (f = Number((r = No((o = m.props) === null || o === void 0 ? void 0 : o.span, v)) !== null && r !== void 0 ? r : Eh), m.props.privateSpan = f, m.props.privateColStart = p + 1 - f, m.props.privateShow = (i = m.props.privateShow) !== null && i !== void 0 ? i : !0);
      }
      let g = 0, u = !1;
      for (const {
        child: w,
        rawChildSpan: x
      } of d) {
        if (u && (this.overflow = !0), !u) {
          const y = Number((a = No((l = w.props) === null || l === void 0 ? void 0 : l.offset, v)) !== null && a !== void 0 ? a : 0), C = Math.min(x + y, p);
          if (w.props ? (w.props.privateSpan = C, w.props.privateOffset = y) : w.props = {
            privateSpan: C,
            privateOffset: y
          }, c) {
            const S = g % p;
            C + S > p && (g += p - S), C + g + f > h * p ? u = !0 : g += C;
          }
        }
        u && (w.props ? w.props.privateShow !== !0 && (w.props.privateShow = !1) : w.props = {
          privateShow: !1
        });
      }
      return gs("div", Ih({
        ref: "contentEl",
        class: `${this.mergedClsPrefix}-grid`,
        style: this.style,
        [bs]: this.isSsr || void 0
      }, this.$attrs), d.map(({
        child: w
      }) => w));
    };
    return this.isResponsive && this.responsive === "self" ? gs(To, {
      onResize: this.handleResize
    }, {
      default: e
    }) : e();
  }
}), xO = window.Vue.defineComponent, Fe = window.Vue.unref, Wr = window.Vue.mergeProps, it = window.Vue.createVNode, ut = window.Vue.withCtx, rr = window.Vue.toDisplayString, ir = window.Vue.createTextVNode, wa = window.Vue.openBlock, ws = window.Vue.createBlock, ys = window.Vue.createCommentVNode, CO = window.Vue.createElementBlock, SO = { class: "plugin-page" }, Bh = window.Vue.computed, xs = window.Vue.h, $O = window.Vue.onMounted, ya = window.Vue.reactive, xa = window.Vue.ref, RO = /* @__PURE__ */ xO({
  __name: "TestView",
  setup(e) {
    const { t } = Na(), n = xa(!1), o = xa(!1), r = xa(!1), i = xa([]), l = ya({
      name: "",
      sex: ""
    }), a = ya({
      name: "",
      sex: "",
      age: null,
      id: null
    }), s = {
      name: [
        {
          type: "string",
          min: 0,
          max: 0,
          message: "姓名长度不符合要求",
          trigger: ["input", "blur"]
        }
      ],
      sex: [
        {
          type: "string",
          min: 0,
          max: 0,
          message: "性别长度不符合要求",
          trigger: ["input", "blur"]
        }
      ],
      age: [
        {
          type: "string",
          min: 0,
          max: 0,
          message: "年龄长度不符合要求",
          trigger: ["input", "blur"]
        },
        {
          type: "number",
          min: 0,
          max: 0,
          message: "年龄超出范围",
          trigger: ["input", "blur"]
        }
      ]
    };
    function d(b) {
      return {};
    }
    const c = ya({
      page: 1,
      pageSize: 10,
      itemCount: 0,
      onChange: (b) => {
        c.page = b, u();
      },
      onUpdatePageSize: (b) => {
        c.pageSize = b, c.page = 1, u();
      }
    }), h = Bh(() => [
      { title: t("plugin.test.name"), key: "name", width: 160, ellipsis: { tooltip: !0 } },
      { title: t("plugin.test.sex"), key: "sex", width: 160, ellipsis: { tooltip: !0 } },
      { title: t("plugin.test.age"), key: "age", width: 160, ellipsis: { tooltip: !0 } },
      {
        title: t("common.action"),
        key: "action",
        render: (b) => xs(tr, {}, {
          default: () => [
            xs(on, { size: "small", onClick: () => y(b) }, { default: () => t("common.edit") }),
            xs(on, { size: "small", type: "error", onClick: () => S(b) }, { default: () => t("common.delete") })
          ]
        })
      }
    ]), p = Bh(() => r.value ? t("common.edit") : t("common.add"));
    ya({});
    function v() {
      return "/proxy-default";
    }
    function f() {
      const R = Object.keys(localStorage).find((T) => /token$/i.test(T) && !/refresh/i.test(T));
      if (!R) return null;
      const $ = localStorage.getItem(R);
      if (!$) return null;
      try {
        return JSON.parse($);
      } catch {
        return $;
      }
    }
    async function m(b, R = {}) {
      const $ = {
        "Content-Type": "application/json"
      }, T = f();
      T && ($.Authorization = T.startsWith("Bearer ") ? T : "Bearer ");
      const P = await (await fetch(`${v()}${b}`, {
        ...R,
        headers: {
          ...$,
          ...R.headers
        }
      })).json();
      return P.data ?? P;
    }
    function g() {
      l.name = "", l.sex = "", c.page = 1, u();
    }
    async function u() {
      n.value = !0;
      try {
        const b = await m("/plugin/test/page", {
          method: "POST",
          body: JSON.stringify({
            page: c.page,
            pageSize: c.pageSize,
            ...l
          })
        });
        i.value = b.records ?? [], c.itemCount = b.total ?? 0;
      } finally {
        n.value = !1;
      }
    }
    function w(b) {
      a.name = (b == null ? void 0 : b.name) ?? "", a.sex = (b == null ? void 0 : b.sex) ?? "", a.age = (b == null ? void 0 : b.age) ?? null, a.id = (b == null ? void 0 : b.id) ?? null;
    }
    function x() {
      r.value = !1, w(), o.value = !0;
    }
    function y(b) {
      r.value = !0, w(b), o.value = !0;
    }
    async function C() {
      var $;
      const b = { ...a }, R = r.value ? "PUT" : "POST";
      await m("/plugin/test", {
        method: R,
        body: JSON.stringify(b)
      }), ($ = window.$message) == null || $.success(t("common.saveSuccess")), o.value = !1, await u();
    }
    async function S(b) {
      window.confirm(t("common.deleteConfirm")) && (await m("/plugin/test/" + b.id, { method: "DELETE" }), await u());
    }
    return $O(() => {
      u();
    }), (b, R) => (wa(), CO("div", SO, [
      it(Fe(tr), {
        vertical: "",
        size: "large"
      }, {
        default: ut(() => [
          it(Fe(Gv), {
            title: Fe(t)("plugin.test.title"),
            size: "small",
            bordered: ""
          }, {
            default: ut(() => [
              it(Fe(xh), {
                model: l,
                "label-width": "80",
                "label-placement": "left"
              }, {
                default: ut(() => [
                  it(Fe(Vh), {
                    cols: "24",
                    "x-gap": "16",
                    "y-gap": "8",
                    responsive: "screen"
                  }, {
                    default: ut(() => [
                      it(Fe(or), {
                        span: 12,
                        label: Fe(t)("plugin.test.name")
                      }, {
                        default: ut(() => [
                          it(Fe(yo), Wr({
                            value: l.name,
                            "onUpdate:value": R[0] || (R[0] = ($) => l.name = $),
                            placeholder: "姓名",
                            maxlength: 0
                          }, d()), null, 16, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      it(Fe(or), {
                        span: 12,
                        label: Fe(t)("plugin.test.sex")
                      }, {
                        default: ut(() => [
                          it(Fe(yo), Wr({
                            value: l.sex,
                            "onUpdate:value": R[1] || (R[1] = ($) => l.sex = $),
                            placeholder: "性别",
                            maxlength: 0
                          }, d()), null, 16, ["value"])
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["label"]),
                      it(Fe(or), { span: "24" }, {
                        default: ut(() => [
                          it(Fe(tr), {
                            justify: "end",
                            class: "w-full"
                          }, {
                            default: ut(() => [
                              it(Fe(on), {
                                type: "primary",
                                onClick: u
                              }, {
                                default: ut(() => [
                                  ir(
                                    rr(Fe(t)("common.search")),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                _: 1
                                /* STABLE */
                              }),
                              it(Fe(on), { onClick: g }, {
                                default: ut(() => [
                                  ir(
                                    rr(Fe(t)("common.reset")),
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
              it(Fe(tr), {
                justify: "space-between",
                align: "center",
                class: "toolbar"
              }, {
                default: ut(() => [
                  it(Fe(tr), null, {
                    default: ut(() => [
                      it(Fe(on), {
                        type: "primary",
                        onClick: x
                      }, {
                        default: ut(() => [
                          ir(
                            rr(Fe(t)("common.add")),
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
                  it(Fe(on), { onClick: u }, {
                    default: ut(() => [
                      ir(
                        rr(Fe(t)("common.search")),
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
              it(Fe(R3), {
                columns: h.value,
                data: i.value,
                loading: n.value,
                pagination: c
              }, null, 8, ["columns", "data", "loading", "pagination"])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["title"])
        ]),
        _: 1
        /* STABLE */
      }),
      it(Fe(J3), {
        show: o.value,
        "onUpdate:show": R[6] || (R[6] = ($) => o.value = $),
        preset: "card",
        title: p.value,
        class: "modal-card"
      }, {
        footer: ut(() => [
          it(Fe(tr), { justify: "end" }, {
            default: ut(() => [
              it(Fe(on), {
                onClick: R[5] || (R[5] = ($) => o.value = !1)
              }, {
                default: ut(() => [
                  ir(
                    rr(Fe(t)("common.cancel")),
                    1
                    /* TEXT */
                  )
                ]),
                _: 1
                /* STABLE */
              }),
              it(Fe(on), {
                type: "primary",
                onClick: C
              }, {
                default: ut(() => [
                  ir(
                    rr(Fe(t)("common.confirm")),
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
        default: ut(() => [
          it(Fe(xh), {
            model: a,
            rules: s,
            "label-width": "100"
          }, {
            default: ut(() => [
              it(Fe(Vh), {
                cols: "24",
                "x-gap": "16",
                "y-gap": "8",
                responsive: "screen"
              }, {
                default: ut(() => [
                  r.value || !r.value ? (wa(), ws(Fe(or), {
                    key: 0,
                    span: 12,
                    label: Fe(t)("plugin.test.name"),
                    path: "name"
                  }, {
                    default: ut(() => [
                      it(Fe(yo), Wr({
                        value: a.name,
                        "onUpdate:value": R[2] || (R[2] = ($) => a.name = $),
                        placeholder: "姓名",
                        disabled: !1,
                        readonly: !1,
                        maxlength: 0
                      }, d()), null, 16, ["value"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["label"])) : ys("v-if", !0),
                  r.value || !r.value ? (wa(), ws(Fe(or), {
                    key: 1,
                    span: 12,
                    label: Fe(t)("plugin.test.sex"),
                    path: "sex"
                  }, {
                    default: ut(() => [
                      it(Fe(yo), Wr({
                        value: a.sex,
                        "onUpdate:value": R[3] || (R[3] = ($) => a.sex = $),
                        placeholder: "性别",
                        disabled: !1,
                        readonly: !1,
                        maxlength: 0
                      }, d()), null, 16, ["value"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["label"])) : ys("v-if", !0),
                  r.value || !r.value ? (wa(), ws(Fe(or), {
                    key: 2,
                    span: 12,
                    label: Fe(t)("plugin.test.age"),
                    path: "age"
                  }, {
                    default: ut(() => [
                      it(Fe(yo), Wr({
                        value: a.age,
                        "onUpdate:value": R[4] || (R[4] = ($) => a.age = $),
                        placeholder: "年龄",
                        disabled: !1,
                        readonly: !1,
                        maxlength: 0
                      }, d()), null, 16, ["value"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["label"])) : ys("v-if", !0)
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
      }, 8, ["show", "title"])
    ]));
  }
}), kO = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, _O = /* @__PURE__ */ kO(RO, [["__scopeId", "data-v-66184cd1"]]);
export {
  _O as default
};
