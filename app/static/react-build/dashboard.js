var ex = Object.defineProperty;
var nx = (e, t, n) => t in e ? ex(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var q = (e, t, n) => nx(e, typeof t != "symbol" ? t + "" : t, n);
var ix = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function fg(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var pg = { exports: {} }, vl = {}, mg = { exports: {} }, pt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fo = Symbol.for("react.element"), sx = Symbol.for("react.portal"), rx = Symbol.for("react.fragment"), ox = Symbol.for("react.strict_mode"), ax = Symbol.for("react.profiler"), lx = Symbol.for("react.provider"), cx = Symbol.for("react.context"), ux = Symbol.for("react.forward_ref"), hx = Symbol.for("react.suspense"), dx = Symbol.for("react.memo"), fx = Symbol.for("react.lazy"), Tf = Symbol.iterator;
function px(e) {
  return e === null || typeof e != "object" ? null : (e = Tf && e[Tf] || e["@@iterator"], typeof e == "function" ? e : null);
}
var gg = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, _g = Object.assign, vg = {};
function Bs(e, t, n) {
  this.props = e, this.context = t, this.refs = vg, this.updater = n || gg;
}
Bs.prototype.isReactComponent = {};
Bs.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Bs.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function yg() {
}
yg.prototype = Bs.prototype;
function mh(e, t, n) {
  this.props = e, this.context = t, this.refs = vg, this.updater = n || gg;
}
var gh = mh.prototype = new yg();
gh.constructor = mh;
_g(gh, Bs.prototype);
gh.isPureReactComponent = !0;
var Nf = Array.isArray, xg = Object.prototype.hasOwnProperty, _h = { current: null }, wg = { key: !0, ref: !0, __self: !0, __source: !0 };
function bg(e, t, n) {
  var i, r = {}, o = null, a = null;
  if (t != null) for (i in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t) xg.call(t, i) && !wg.hasOwnProperty(i) && (r[i] = t[i]);
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    for (var u = Array(c), d = 0; d < c; d++) u[d] = arguments[d + 2];
    r.children = u;
  }
  if (e && e.defaultProps) for (i in c = e.defaultProps, c) r[i] === void 0 && (r[i] = c[i]);
  return { $$typeof: fo, type: e, key: o, ref: a, props: r, _owner: _h.current };
}
function mx(e, t) {
  return { $$typeof: fo, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function vh(e) {
  return typeof e == "object" && e !== null && e.$$typeof === fo;
}
function gx(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Ef = /\/+/g;
function vc(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? gx("" + e.key) : t.toString(36);
}
function xa(e, t, n, i, r) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var a = !1;
  if (e === null) a = !0;
  else switch (o) {
    case "string":
    case "number":
      a = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case fo:
        case sx:
          a = !0;
      }
  }
  if (a) return a = e, r = r(a), e = i === "" ? "." + vc(a, 0) : i, Nf(r) ? (n = "", e != null && (n = e.replace(Ef, "$&/") + "/"), xa(r, t, n, "", function(d) {
    return d;
  })) : r != null && (vh(r) && (r = mx(r, n + (!r.key || a && a.key === r.key ? "" : ("" + r.key).replace(Ef, "$&/") + "/") + e)), t.push(r)), 1;
  if (a = 0, i = i === "" ? "." : i + ":", Nf(e)) for (var c = 0; c < e.length; c++) {
    o = e[c];
    var u = i + vc(o, c);
    a += xa(o, t, n, u, r);
  }
  else if (u = px(e), typeof u == "function") for (e = u.call(e), c = 0; !(o = e.next()).done; ) o = o.value, u = i + vc(o, c++), a += xa(o, t, n, u, r);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function Wo(e, t, n) {
  if (e == null) return e;
  var i = [], r = 0;
  return xa(e, i, "", "", function(o) {
    return t.call(n, o, r++);
  }), i;
}
function _x(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var _e = { current: null }, wa = { transition: null }, vx = { ReactCurrentDispatcher: _e, ReactCurrentBatchConfig: wa, ReactCurrentOwner: _h };
function kg() {
  throw Error("act(...) is not supported in production builds of React.");
}
pt.Children = { map: Wo, forEach: function(e, t, n) {
  Wo(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Wo(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Wo(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!vh(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
pt.Component = Bs;
pt.Fragment = rx;
pt.Profiler = ax;
pt.PureComponent = mh;
pt.StrictMode = ox;
pt.Suspense = hx;
pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vx;
pt.act = kg;
pt.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var i = _g({}, e.props), r = e.key, o = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, a = _h.current), t.key !== void 0 && (r = "" + t.key), e.type && e.type.defaultProps) var c = e.type.defaultProps;
    for (u in t) xg.call(t, u) && !wg.hasOwnProperty(u) && (i[u] = t[u] === void 0 && c !== void 0 ? c[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) i.children = n;
  else if (1 < u) {
    c = Array(u);
    for (var d = 0; d < u; d++) c[d] = arguments[d + 2];
    i.children = c;
  }
  return { $$typeof: fo, type: e.type, key: r, ref: o, props: i, _owner: a };
};
pt.createContext = function(e) {
  return e = { $$typeof: cx, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: lx, _context: e }, e.Consumer = e;
};
pt.createElement = bg;
pt.createFactory = function(e) {
  var t = bg.bind(null, e);
  return t.type = e, t;
};
pt.createRef = function() {
  return { current: null };
};
pt.forwardRef = function(e) {
  return { $$typeof: ux, render: e };
};
pt.isValidElement = vh;
pt.lazy = function(e) {
  return { $$typeof: fx, _payload: { _status: -1, _result: e }, _init: _x };
};
pt.memo = function(e, t) {
  return { $$typeof: dx, type: e, compare: t === void 0 ? null : t };
};
pt.startTransition = function(e) {
  var t = wa.transition;
  wa.transition = {};
  try {
    e();
  } finally {
    wa.transition = t;
  }
};
pt.unstable_act = kg;
pt.useCallback = function(e, t) {
  return _e.current.useCallback(e, t);
};
pt.useContext = function(e) {
  return _e.current.useContext(e);
};
pt.useDebugValue = function() {
};
pt.useDeferredValue = function(e) {
  return _e.current.useDeferredValue(e);
};
pt.useEffect = function(e, t) {
  return _e.current.useEffect(e, t);
};
pt.useId = function() {
  return _e.current.useId();
};
pt.useImperativeHandle = function(e, t, n) {
  return _e.current.useImperativeHandle(e, t, n);
};
pt.useInsertionEffect = function(e, t) {
  return _e.current.useInsertionEffect(e, t);
};
pt.useLayoutEffect = function(e, t) {
  return _e.current.useLayoutEffect(e, t);
};
pt.useMemo = function(e, t) {
  return _e.current.useMemo(e, t);
};
pt.useReducer = function(e, t, n) {
  return _e.current.useReducer(e, t, n);
};
pt.useRef = function(e) {
  return _e.current.useRef(e);
};
pt.useState = function(e) {
  return _e.current.useState(e);
};
pt.useSyncExternalStore = function(e, t, n) {
  return _e.current.useSyncExternalStore(e, t, n);
};
pt.useTransition = function() {
  return _e.current.useTransition();
};
pt.version = "18.3.1";
mg.exports = pt;
var W = mg.exports;
const yx = /* @__PURE__ */ fg(W);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xx = W, wx = Symbol.for("react.element"), bx = Symbol.for("react.fragment"), kx = Object.prototype.hasOwnProperty, Sx = xx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Px = { key: !0, ref: !0, __self: !0, __source: !0 };
function Sg(e, t, n) {
  var i, r = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (i in t) kx.call(t, i) && !Px.hasOwnProperty(i) && (r[i] = t[i]);
  if (e && e.defaultProps) for (i in t = e.defaultProps, t) r[i] === void 0 && (r[i] = t[i]);
  return { $$typeof: wx, type: e, key: o, ref: a, props: r, _owner: Sx.current };
}
vl.Fragment = bx;
vl.jsx = Sg;
vl.jsxs = Sg;
pg.exports = vl;
var m = pg.exports, Pg = { exports: {} }, Ae = {}, Mg = { exports: {} }, Cg = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(I, U) {
    var D = I.length;
    I.push(U);
    t: for (; 0 < D; ) {
      var tt = D - 1 >>> 1, ot = I[tt];
      if (0 < r(ot, U)) I[tt] = U, I[D] = ot, D = tt;
      else break t;
    }
  }
  function n(I) {
    return I.length === 0 ? null : I[0];
  }
  function i(I) {
    if (I.length === 0) return null;
    var U = I[0], D = I.pop();
    if (D !== U) {
      I[0] = D;
      t: for (var tt = 0, ot = I.length, St = ot >>> 1; tt < St; ) {
        var dt = 2 * (tt + 1) - 1, at = I[dt], G = dt + 1, Dt = I[G];
        if (0 > r(at, D)) G < ot && 0 > r(Dt, at) ? (I[tt] = Dt, I[G] = D, tt = G) : (I[tt] = at, I[dt] = D, tt = dt);
        else if (G < ot && 0 > r(Dt, D)) I[tt] = Dt, I[G] = D, tt = G;
        else break t;
      }
    }
    return U;
  }
  function r(I, U) {
    var D = I.sortIndex - U.sortIndex;
    return D !== 0 ? D : I.id - U.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var a = Date, c = a.now();
    e.unstable_now = function() {
      return a.now() - c;
    };
  }
  var u = [], d = [], p = 1, g = null, v = 3, y = !1, S = !1, w = !1, M = typeof setTimeout == "function" ? setTimeout : null, b = typeof clearTimeout == "function" ? clearTimeout : null, k = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function P(I) {
    for (var U = n(d); U !== null; ) {
      if (U.callback === null) i(d);
      else if (U.startTime <= I) i(d), U.sortIndex = U.expirationTime, t(u, U);
      else break;
      U = n(d);
    }
  }
  function T(I) {
    if (w = !1, P(I), !S) if (n(u) !== null) S = !0, X(N);
    else {
      var U = n(d);
      U !== null && ht(T, U.startTime - I);
    }
  }
  function N(I, U) {
    S = !1, w && (w = !1, b(A), A = -1), y = !0;
    var D = v;
    try {
      for (P(U), g = n(u); g !== null && (!(g.expirationTime > U) || I && !V()); ) {
        var tt = g.callback;
        if (typeof tt == "function") {
          g.callback = null, v = g.priorityLevel;
          var ot = tt(g.expirationTime <= U);
          U = e.unstable_now(), typeof ot == "function" ? g.callback = ot : g === n(u) && i(u), P(U);
        } else i(u);
        g = n(u);
      }
      if (g !== null) var St = !0;
      else {
        var dt = n(d);
        dt !== null && ht(T, dt.startTime - U), St = !1;
      }
      return St;
    } finally {
      g = null, v = D, y = !1;
    }
  }
  var j = !1, O = null, A = -1, H = 5, F = -1;
  function V() {
    return !(e.unstable_now() - F < H);
  }
  function K() {
    if (O !== null) {
      var I = e.unstable_now();
      F = I;
      var U = !0;
      try {
        U = O(!0, I);
      } finally {
        U ? yt() : (j = !1, O = null);
      }
    } else j = !1;
  }
  var yt;
  if (typeof k == "function") yt = function() {
    k(K);
  };
  else if (typeof MessageChannel < "u") {
    var $ = new MessageChannel(), rt = $.port2;
    $.port1.onmessage = K, yt = function() {
      rt.postMessage(null);
    };
  } else yt = function() {
    M(K, 0);
  };
  function X(I) {
    O = I, j || (j = !0, yt());
  }
  function ht(I, U) {
    A = M(function() {
      I(e.unstable_now());
    }, U);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(I) {
    I.callback = null;
  }, e.unstable_continueExecution = function() {
    S || y || (S = !0, X(N));
  }, e.unstable_forceFrameRate = function(I) {
    0 > I || 125 < I ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : H = 0 < I ? Math.floor(1e3 / I) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return v;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(I) {
    switch (v) {
      case 1:
      case 2:
      case 3:
        var U = 3;
        break;
      default:
        U = v;
    }
    var D = v;
    v = U;
    try {
      return I();
    } finally {
      v = D;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(I, U) {
    switch (I) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        I = 3;
    }
    var D = v;
    v = I;
    try {
      return U();
    } finally {
      v = D;
    }
  }, e.unstable_scheduleCallback = function(I, U, D) {
    var tt = e.unstable_now();
    switch (typeof D == "object" && D !== null ? (D = D.delay, D = typeof D == "number" && 0 < D ? tt + D : tt) : D = tt, I) {
      case 1:
        var ot = -1;
        break;
      case 2:
        ot = 250;
        break;
      case 5:
        ot = 1073741823;
        break;
      case 4:
        ot = 1e4;
        break;
      default:
        ot = 5e3;
    }
    return ot = D + ot, I = { id: p++, callback: U, priorityLevel: I, startTime: D, expirationTime: ot, sortIndex: -1 }, D > tt ? (I.sortIndex = D, t(d, I), n(u) === null && I === n(d) && (w ? (b(A), A = -1) : w = !0, ht(T, D - tt))) : (I.sortIndex = ot, t(u, I), S || y || (S = !0, X(N))), I;
  }, e.unstable_shouldYield = V, e.unstable_wrapCallback = function(I) {
    var U = v;
    return function() {
      var D = v;
      v = U;
      try {
        return I.apply(this, arguments);
      } finally {
        v = D;
      }
    };
  };
})(Cg);
Mg.exports = Cg;
var Mx = Mg.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cx = W, Oe = Mx;
function B(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Lg = /* @__PURE__ */ new Set(), Wr = {};
function $i(e, t) {
  Es(e, t), Es(e + "Capture", t);
}
function Es(e, t) {
  for (Wr[e] = t, e = 0; e < t.length; e++) Lg.add(t[e]);
}
var An = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), au = Object.prototype.hasOwnProperty, Lx = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, zf = {}, jf = {};
function Tx(e) {
  return au.call(jf, e) ? !0 : au.call(zf, e) ? !1 : Lx.test(e) ? jf[e] = !0 : (zf[e] = !0, !1);
}
function Nx(e, t, n, i) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return i ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Ex(e, t, n, i) {
  if (t === null || typeof t > "u" || Nx(e, t, n, i)) return !0;
  if (i) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function ve(e, t, n, i, r, o, a) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = i, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = a;
}
var oe = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  oe[e] = new ve(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  oe[t] = new ve(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  oe[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  oe[e] = new ve(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  oe[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  oe[e] = new ve(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  oe[e] = new ve(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  oe[e] = new ve(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  oe[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var yh = /[\-:]([a-z])/g;
function xh(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    yh,
    xh
  );
  oe[t] = new ve(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(yh, xh);
  oe[t] = new ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(yh, xh);
  oe[t] = new ve(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  oe[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
oe.xlinkHref = new ve("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  oe[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function wh(e, t, n, i) {
  var r = oe.hasOwnProperty(t) ? oe[t] : null;
  (r !== null ? r.type !== 0 : i || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Ex(t, n, r, i) && (n = null), i || r === null ? Tx(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : r.mustUseProperty ? e[r.propertyName] = n === null ? r.type === 3 ? !1 : "" : n : (t = r.attributeName, i = r.attributeNamespace, n === null ? e.removeAttribute(t) : (r = r.type, n = r === 3 || r === 4 && n === !0 ? "" : "" + n, i ? e.setAttributeNS(i, t, n) : e.setAttribute(t, n))));
}
var Fn = Cx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Vo = Symbol.for("react.element"), us = Symbol.for("react.portal"), hs = Symbol.for("react.fragment"), bh = Symbol.for("react.strict_mode"), lu = Symbol.for("react.profiler"), Tg = Symbol.for("react.provider"), Ng = Symbol.for("react.context"), kh = Symbol.for("react.forward_ref"), cu = Symbol.for("react.suspense"), uu = Symbol.for("react.suspense_list"), Sh = Symbol.for("react.memo"), $n = Symbol.for("react.lazy"), Eg = Symbol.for("react.offscreen"), Of = Symbol.iterator;
function ar(e) {
  return e === null || typeof e != "object" ? null : (e = Of && e[Of] || e["@@iterator"], typeof e == "function" ? e : null);
}
var It = Object.assign, yc;
function xr(e) {
  if (yc === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    yc = t && t[1] || "";
  }
  return `
` + yc + e;
}
var xc = !1;
function wc(e, t) {
  if (!e || xc) return "";
  xc = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (d) {
        var i = d;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (d) {
        i = d;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (d) {
        i = d;
      }
      e();
    }
  } catch (d) {
    if (d && i && typeof d.stack == "string") {
      for (var r = d.stack.split(`
`), o = i.stack.split(`
`), a = r.length - 1, c = o.length - 1; 1 <= a && 0 <= c && r[a] !== o[c]; ) c--;
      for (; 1 <= a && 0 <= c; a--, c--) if (r[a] !== o[c]) {
        if (a !== 1 || c !== 1)
          do
            if (a--, c--, 0 > c || r[a] !== o[c]) {
              var u = `
` + r[a].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= a && 0 <= c);
        break;
      }
    }
  } finally {
    xc = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? xr(e) : "";
}
function zx(e) {
  switch (e.tag) {
    case 5:
      return xr(e.type);
    case 16:
      return xr("Lazy");
    case 13:
      return xr("Suspense");
    case 19:
      return xr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = wc(e.type, !1), e;
    case 11:
      return e = wc(e.type.render, !1), e;
    case 1:
      return e = wc(e.type, !0), e;
    default:
      return "";
  }
}
function hu(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case hs:
      return "Fragment";
    case us:
      return "Portal";
    case lu:
      return "Profiler";
    case bh:
      return "StrictMode";
    case cu:
      return "Suspense";
    case uu:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Ng:
      return (e.displayName || "Context") + ".Consumer";
    case Tg:
      return (e._context.displayName || "Context") + ".Provider";
    case kh:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Sh:
      return t = e.displayName || null, t !== null ? t : hu(e.type) || "Memo";
    case $n:
      t = e._payload, e = e._init;
      try {
        return hu(e(t));
      } catch {
      }
  }
  return null;
}
function jx(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return hu(t);
    case 8:
      return t === bh ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function di(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function zg(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Ox(e) {
  var t = zg(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), i = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var r = n.get, o = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return r.call(this);
    }, set: function(a) {
      i = "" + a, o.call(this, a);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return i;
    }, setValue: function(a) {
      i = "" + a;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function Zo(e) {
  e._valueTracker || (e._valueTracker = Ox(e));
}
function jg(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), i = "";
  return e && (i = zg(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), !0) : !1;
}
function Da(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function du(e, t) {
  var n = t.checked;
  return It({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Af(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, i = t.checked != null ? t.checked : t.defaultChecked;
  n = di(t.value != null ? t.value : n), e._wrapperState = { initialChecked: i, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Og(e, t) {
  t = t.checked, t != null && wh(e, "checked", t, !1);
}
function fu(e, t) {
  Og(e, t);
  var n = di(t.value), i = t.type;
  if (n != null) i === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (i === "submit" || i === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? pu(e, t.type, n) : t.hasOwnProperty("defaultValue") && pu(e, t.type, di(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function If(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var i = t.type;
    if (!(i !== "submit" && i !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function pu(e, t, n) {
  (t !== "number" || Da(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var wr = Array.isArray;
function bs(e, t, n, i) {
  if (e = e.options, t) {
    t = {};
    for (var r = 0; r < n.length; r++) t["$" + n[r]] = !0;
    for (n = 0; n < e.length; n++) r = t.hasOwnProperty("$" + e[n].value), e[n].selected !== r && (e[n].selected = r), r && i && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + di(n), t = null, r = 0; r < e.length; r++) {
      if (e[r].value === n) {
        e[r].selected = !0, i && (e[r].defaultSelected = !0);
        return;
      }
      t !== null || e[r].disabled || (t = e[r]);
    }
    t !== null && (t.selected = !0);
  }
}
function mu(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(B(91));
  return It({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Rf(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(B(92));
      if (wr(n)) {
        if (1 < n.length) throw Error(B(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: di(n) };
}
function Ag(e, t) {
  var n = di(t.value), i = di(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), i != null && (e.defaultValue = "" + i);
}
function Df(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ig(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function gu(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Ig(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Uo, Rg = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, i, r) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, i, r);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Uo = Uo || document.createElement("div"), Uo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Uo.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Vr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Tr = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, Ax = ["Webkit", "ms", "Moz", "O"];
Object.keys(Tr).forEach(function(e) {
  Ax.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Tr[t] = Tr[e];
  });
});
function Dg(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Tr.hasOwnProperty(e) && Tr[e] ? ("" + t).trim() : t + "px";
}
function Fg(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var i = n.indexOf("--") === 0, r = Dg(n, t[n], i);
    n === "float" && (n = "cssFloat"), i ? e.setProperty(n, r) : e[n] = r;
  }
}
var Ix = It({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function _u(e, t) {
  if (t) {
    if (Ix[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(B(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(B(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(B(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(B(62));
  }
}
function vu(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var yu = null;
function Ph(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var xu = null, ks = null, Ss = null;
function Ff(e) {
  if (e = go(e)) {
    if (typeof xu != "function") throw Error(B(280));
    var t = e.stateNode;
    t && (t = kl(t), xu(e.stateNode, e.type, t));
  }
}
function Bg(e) {
  ks ? Ss ? Ss.push(e) : Ss = [e] : ks = e;
}
function Hg() {
  if (ks) {
    var e = ks, t = Ss;
    if (Ss = ks = null, Ff(e), t) for (e = 0; e < t.length; e++) Ff(t[e]);
  }
}
function Wg(e, t) {
  return e(t);
}
function Vg() {
}
var bc = !1;
function Zg(e, t, n) {
  if (bc) return e(t, n);
  bc = !0;
  try {
    return Wg(e, t, n);
  } finally {
    bc = !1, (ks !== null || Ss !== null) && (Vg(), Hg());
  }
}
function Zr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var i = kl(n);
  if (i === null) return null;
  n = i[t];
  t: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
      break t;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(B(231, t, typeof n));
  return n;
}
var wu = !1;
if (An) try {
  var lr = {};
  Object.defineProperty(lr, "passive", { get: function() {
    wu = !0;
  } }), window.addEventListener("test", lr, lr), window.removeEventListener("test", lr, lr);
} catch {
  wu = !1;
}
function Rx(e, t, n, i, r, o, a, c, u) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (p) {
    this.onError(p);
  }
}
var Nr = !1, Fa = null, Ba = !1, bu = null, Dx = { onError: function(e) {
  Nr = !0, Fa = e;
} };
function Fx(e, t, n, i, r, o, a, c, u) {
  Nr = !1, Fa = null, Rx.apply(Dx, arguments);
}
function Bx(e, t, n, i, r, o, a, c, u) {
  if (Fx.apply(this, arguments), Nr) {
    if (Nr) {
      var d = Fa;
      Nr = !1, Fa = null;
    } else throw Error(B(198));
    Ba || (Ba = !0, bu = d);
  }
}
function Yi(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Ug(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Bf(e) {
  if (Yi(e) !== e) throw Error(B(188));
}
function Hx(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Yi(e), t === null) throw Error(B(188));
    return t !== e ? null : e;
  }
  for (var n = e, i = t; ; ) {
    var r = n.return;
    if (r === null) break;
    var o = r.alternate;
    if (o === null) {
      if (i = r.return, i !== null) {
        n = i;
        continue;
      }
      break;
    }
    if (r.child === o.child) {
      for (o = r.child; o; ) {
        if (o === n) return Bf(r), e;
        if (o === i) return Bf(r), t;
        o = o.sibling;
      }
      throw Error(B(188));
    }
    if (n.return !== i.return) n = r, i = o;
    else {
      for (var a = !1, c = r.child; c; ) {
        if (c === n) {
          a = !0, n = r, i = o;
          break;
        }
        if (c === i) {
          a = !0, i = r, n = o;
          break;
        }
        c = c.sibling;
      }
      if (!a) {
        for (c = o.child; c; ) {
          if (c === n) {
            a = !0, n = o, i = r;
            break;
          }
          if (c === i) {
            a = !0, i = o, n = r;
            break;
          }
          c = c.sibling;
        }
        if (!a) throw Error(B(189));
      }
    }
    if (n.alternate !== i) throw Error(B(190));
  }
  if (n.tag !== 3) throw Error(B(188));
  return n.stateNode.current === n ? e : t;
}
function $g(e) {
  return e = Hx(e), e !== null ? Yg(e) : null;
}
function Yg(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Yg(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var qg = Oe.unstable_scheduleCallback, Hf = Oe.unstable_cancelCallback, Wx = Oe.unstable_shouldYield, Vx = Oe.unstable_requestPaint, Ht = Oe.unstable_now, Zx = Oe.unstable_getCurrentPriorityLevel, Mh = Oe.unstable_ImmediatePriority, Kg = Oe.unstable_UserBlockingPriority, Ha = Oe.unstable_NormalPriority, Ux = Oe.unstable_LowPriority, Xg = Oe.unstable_IdlePriority, yl = null, _n = null;
function $x(e) {
  if (_n && typeof _n.onCommitFiberRoot == "function") try {
    _n.onCommitFiberRoot(yl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var en = Math.clz32 ? Math.clz32 : Kx, Yx = Math.log, qx = Math.LN2;
function Kx(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Yx(e) / qx | 0) | 0;
}
var $o = 64, Yo = 4194304;
function br(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Wa(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var i = 0, r = e.suspendedLanes, o = e.pingedLanes, a = n & 268435455;
  if (a !== 0) {
    var c = a & ~r;
    c !== 0 ? i = br(c) : (o &= a, o !== 0 && (i = br(o)));
  } else a = n & ~r, a !== 0 ? i = br(a) : o !== 0 && (i = br(o));
  if (i === 0) return 0;
  if (t !== 0 && t !== i && !(t & r) && (r = i & -i, o = t & -t, r >= o || r === 16 && (o & 4194240) !== 0)) return t;
  if (i & 4 && (i |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= i; 0 < t; ) n = 31 - en(t), r = 1 << n, i |= e[n], t &= ~r;
  return i;
}
function Xx(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Gx(e, t) {
  for (var n = e.suspendedLanes, i = e.pingedLanes, r = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var a = 31 - en(o), c = 1 << a, u = r[a];
    u === -1 ? (!(c & n) || c & i) && (r[a] = Xx(c, t)) : u <= t && (e.expiredLanes |= c), o &= ~c;
  }
}
function ku(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Gg() {
  var e = $o;
  return $o <<= 1, !($o & 4194240) && ($o = 64), e;
}
function kc(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function po(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - en(t), e[t] = n;
}
function Qx(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var i = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var r = 31 - en(n), o = 1 << r;
    t[r] = 0, i[r] = -1, e[r] = -1, n &= ~o;
  }
}
function Ch(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var i = 31 - en(n), r = 1 << i;
    r & t | e[i] & t && (e[i] |= t), n &= ~r;
  }
}
var kt = 0;
function Qg(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Jg, Lh, t_, e_, n_, Su = !1, qo = [], ii = null, si = null, ri = null, Ur = /* @__PURE__ */ new Map(), $r = /* @__PURE__ */ new Map(), qn = [], Jx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Wf(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ii = null;
      break;
    case "dragenter":
    case "dragleave":
      si = null;
      break;
    case "mouseover":
    case "mouseout":
      ri = null;
      break;
    case "pointerover":
    case "pointerout":
      Ur.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      $r.delete(t.pointerId);
  }
}
function cr(e, t, n, i, r, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: i, nativeEvent: o, targetContainers: [r] }, t !== null && (t = go(t), t !== null && Lh(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, r !== null && t.indexOf(r) === -1 && t.push(r), e);
}
function t1(e, t, n, i, r) {
  switch (t) {
    case "focusin":
      return ii = cr(ii, e, t, n, i, r), !0;
    case "dragenter":
      return si = cr(si, e, t, n, i, r), !0;
    case "mouseover":
      return ri = cr(ri, e, t, n, i, r), !0;
    case "pointerover":
      var o = r.pointerId;
      return Ur.set(o, cr(Ur.get(o) || null, e, t, n, i, r)), !0;
    case "gotpointercapture":
      return o = r.pointerId, $r.set(o, cr($r.get(o) || null, e, t, n, i, r)), !0;
  }
  return !1;
}
function i_(e) {
  var t = Ei(e.target);
  if (t !== null) {
    var n = Yi(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ug(n), t !== null) {
          e.blockedOn = t, n_(e.priority, function() {
            t_(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function ba(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Pu(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var i = new n.constructor(n.type, n);
      yu = i, n.target.dispatchEvent(i), yu = null;
    } else return t = go(n), t !== null && Lh(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Vf(e, t, n) {
  ba(e) && n.delete(t);
}
function e1() {
  Su = !1, ii !== null && ba(ii) && (ii = null), si !== null && ba(si) && (si = null), ri !== null && ba(ri) && (ri = null), Ur.forEach(Vf), $r.forEach(Vf);
}
function ur(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Su || (Su = !0, Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority, e1)));
}
function Yr(e) {
  function t(r) {
    return ur(r, e);
  }
  if (0 < qo.length) {
    ur(qo[0], e);
    for (var n = 1; n < qo.length; n++) {
      var i = qo[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
  }
  for (ii !== null && ur(ii, e), si !== null && ur(si, e), ri !== null && ur(ri, e), Ur.forEach(t), $r.forEach(t), n = 0; n < qn.length; n++) i = qn[n], i.blockedOn === e && (i.blockedOn = null);
  for (; 0 < qn.length && (n = qn[0], n.blockedOn === null); ) i_(n), n.blockedOn === null && qn.shift();
}
var Ps = Fn.ReactCurrentBatchConfig, Va = !0;
function n1(e, t, n, i) {
  var r = kt, o = Ps.transition;
  Ps.transition = null;
  try {
    kt = 1, Th(e, t, n, i);
  } finally {
    kt = r, Ps.transition = o;
  }
}
function i1(e, t, n, i) {
  var r = kt, o = Ps.transition;
  Ps.transition = null;
  try {
    kt = 4, Th(e, t, n, i);
  } finally {
    kt = r, Ps.transition = o;
  }
}
function Th(e, t, n, i) {
  if (Va) {
    var r = Pu(e, t, n, i);
    if (r === null) jc(e, t, i, Za, n), Wf(e, i);
    else if (t1(r, e, t, n, i)) i.stopPropagation();
    else if (Wf(e, i), t & 4 && -1 < Jx.indexOf(e)) {
      for (; r !== null; ) {
        var o = go(r);
        if (o !== null && Jg(o), o = Pu(e, t, n, i), o === null && jc(e, t, i, Za, n), o === r) break;
        r = o;
      }
      r !== null && i.stopPropagation();
    } else jc(e, t, i, null, n);
  }
}
var Za = null;
function Pu(e, t, n, i) {
  if (Za = null, e = Ph(i), e = Ei(e), e !== null) if (t = Yi(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ug(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Za = e, null;
}
function s_(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Zx()) {
        case Mh:
          return 1;
        case Kg:
          return 4;
        case Ha:
        case Ux:
          return 16;
        case Xg:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Xn = null, Nh = null, ka = null;
function r_() {
  if (ka) return ka;
  var e, t = Nh, n = t.length, i, r = "value" in Xn ? Xn.value : Xn.textContent, o = r.length;
  for (e = 0; e < n && t[e] === r[e]; e++) ;
  var a = n - e;
  for (i = 1; i <= a && t[n - i] === r[o - i]; i++) ;
  return ka = r.slice(e, 1 < i ? 1 - i : void 0);
}
function Sa(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Ko() {
  return !0;
}
function Zf() {
  return !1;
}
function Ie(e) {
  function t(n, i, r, o, a) {
    this._reactName = n, this._targetInst = r, this.type = i, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var c in e) e.hasOwnProperty(c) && (n = e[c], this[c] = n ? n(o) : o[c]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Ko : Zf, this.isPropagationStopped = Zf, this;
  }
  return It(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ko);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ko);
  }, persist: function() {
  }, isPersistent: Ko }), t;
}
var Hs = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Eh = Ie(Hs), mo = It({}, Hs, { view: 0, detail: 0 }), s1 = Ie(mo), Sc, Pc, hr, xl = It({}, mo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zh, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== hr && (hr && e.type === "mousemove" ? (Sc = e.screenX - hr.screenX, Pc = e.screenY - hr.screenY) : Pc = Sc = 0, hr = e), Sc);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Pc;
} }), Uf = Ie(xl), r1 = It({}, xl, { dataTransfer: 0 }), o1 = Ie(r1), a1 = It({}, mo, { relatedTarget: 0 }), Mc = Ie(a1), l1 = It({}, Hs, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), c1 = Ie(l1), u1 = It({}, Hs, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), h1 = Ie(u1), d1 = It({}, Hs, { data: 0 }), $f = Ie(d1), f1 = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, p1 = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, m1 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function g1(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = m1[e]) ? !!t[e] : !1;
}
function zh() {
  return g1;
}
var _1 = It({}, mo, { key: function(e) {
  if (e.key) {
    var t = f1[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Sa(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? p1[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zh, charCode: function(e) {
  return e.type === "keypress" ? Sa(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Sa(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), v1 = Ie(_1), y1 = It({}, xl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Yf = Ie(y1), x1 = It({}, mo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zh }), w1 = Ie(x1), b1 = It({}, Hs, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), k1 = Ie(b1), S1 = It({}, xl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), P1 = Ie(S1), M1 = [9, 13, 27, 32], jh = An && "CompositionEvent" in window, Er = null;
An && "documentMode" in document && (Er = document.documentMode);
var C1 = An && "TextEvent" in window && !Er, o_ = An && (!jh || Er && 8 < Er && 11 >= Er), qf = " ", Kf = !1;
function a_(e, t) {
  switch (e) {
    case "keyup":
      return M1.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function l_(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var ds = !1;
function L1(e, t) {
  switch (e) {
    case "compositionend":
      return l_(t);
    case "keypress":
      return t.which !== 32 ? null : (Kf = !0, qf);
    case "textInput":
      return e = t.data, e === qf && Kf ? null : e;
    default:
      return null;
  }
}
function T1(e, t) {
  if (ds) return e === "compositionend" || !jh && a_(e, t) ? (e = r_(), ka = Nh = Xn = null, ds = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return o_ && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var N1 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Xf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!N1[e.type] : t === "textarea";
}
function c_(e, t, n, i) {
  Bg(i), t = Ua(t, "onChange"), 0 < t.length && (n = new Eh("onChange", "change", null, n, i), e.push({ event: n, listeners: t }));
}
var zr = null, qr = null;
function E1(e) {
  x_(e, 0);
}
function wl(e) {
  var t = ms(e);
  if (jg(t)) return e;
}
function z1(e, t) {
  if (e === "change") return t;
}
var u_ = !1;
if (An) {
  var Cc;
  if (An) {
    var Lc = "oninput" in document;
    if (!Lc) {
      var Gf = document.createElement("div");
      Gf.setAttribute("oninput", "return;"), Lc = typeof Gf.oninput == "function";
    }
    Cc = Lc;
  } else Cc = !1;
  u_ = Cc && (!document.documentMode || 9 < document.documentMode);
}
function Qf() {
  zr && (zr.detachEvent("onpropertychange", h_), qr = zr = null);
}
function h_(e) {
  if (e.propertyName === "value" && wl(qr)) {
    var t = [];
    c_(t, qr, e, Ph(e)), Zg(E1, t);
  }
}
function j1(e, t, n) {
  e === "focusin" ? (Qf(), zr = t, qr = n, zr.attachEvent("onpropertychange", h_)) : e === "focusout" && Qf();
}
function O1(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return wl(qr);
}
function A1(e, t) {
  if (e === "click") return wl(t);
}
function I1(e, t) {
  if (e === "input" || e === "change") return wl(t);
}
function R1(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var sn = typeof Object.is == "function" ? Object.is : R1;
function Kr(e, t) {
  if (sn(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), i = Object.keys(t);
  if (n.length !== i.length) return !1;
  for (i = 0; i < n.length; i++) {
    var r = n[i];
    if (!au.call(t, r) || !sn(e[r], t[r])) return !1;
  }
  return !0;
}
function Jf(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function tp(e, t) {
  var n = Jf(e);
  e = 0;
  for (var i; n; ) {
    if (n.nodeType === 3) {
      if (i = e + n.textContent.length, e <= t && i >= t) return { node: n, offset: t - e };
      e = i;
    }
    t: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break t;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Jf(n);
  }
}
function d_(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? d_(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function f_() {
  for (var e = window, t = Da(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Da(e.document);
  }
  return t;
}
function Oh(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function D1(e) {
  var t = f_(), n = e.focusedElem, i = e.selectionRange;
  if (t !== n && n && n.ownerDocument && d_(n.ownerDocument.documentElement, n)) {
    if (i !== null && Oh(n)) {
      if (t = i.start, e = i.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var r = n.textContent.length, o = Math.min(i.start, r);
        i = i.end === void 0 ? o : Math.min(i.end, r), !e.extend && o > i && (r = i, i = o, o = r), r = tp(n, o);
        var a = tp(
          n,
          i
        );
        r && a && (e.rangeCount !== 1 || e.anchorNode !== r.node || e.anchorOffset !== r.offset || e.focusNode !== a.node || e.focusOffset !== a.offset) && (t = t.createRange(), t.setStart(r.node, r.offset), e.removeAllRanges(), o > i ? (e.addRange(t), e.extend(a.node, a.offset)) : (t.setEnd(a.node, a.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var F1 = An && "documentMode" in document && 11 >= document.documentMode, fs = null, Mu = null, jr = null, Cu = !1;
function ep(e, t, n) {
  var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Cu || fs == null || fs !== Da(i) || (i = fs, "selectionStart" in i && Oh(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = { anchorNode: i.anchorNode, anchorOffset: i.anchorOffset, focusNode: i.focusNode, focusOffset: i.focusOffset }), jr && Kr(jr, i) || (jr = i, i = Ua(Mu, "onSelect"), 0 < i.length && (t = new Eh("onSelect", "select", null, t, n), e.push({ event: t, listeners: i }), t.target = fs)));
}
function Xo(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var ps = { animationend: Xo("Animation", "AnimationEnd"), animationiteration: Xo("Animation", "AnimationIteration"), animationstart: Xo("Animation", "AnimationStart"), transitionend: Xo("Transition", "TransitionEnd") }, Tc = {}, p_ = {};
An && (p_ = document.createElement("div").style, "AnimationEvent" in window || (delete ps.animationend.animation, delete ps.animationiteration.animation, delete ps.animationstart.animation), "TransitionEvent" in window || delete ps.transitionend.transition);
function bl(e) {
  if (Tc[e]) return Tc[e];
  if (!ps[e]) return e;
  var t = ps[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in p_) return Tc[e] = t[n];
  return e;
}
var m_ = bl("animationend"), g_ = bl("animationiteration"), __ = bl("animationstart"), v_ = bl("transitionend"), y_ = /* @__PURE__ */ new Map(), np = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function mi(e, t) {
  y_.set(e, t), $i(t, [e]);
}
for (var Nc = 0; Nc < np.length; Nc++) {
  var Ec = np[Nc], B1 = Ec.toLowerCase(), H1 = Ec[0].toUpperCase() + Ec.slice(1);
  mi(B1, "on" + H1);
}
mi(m_, "onAnimationEnd");
mi(g_, "onAnimationIteration");
mi(__, "onAnimationStart");
mi("dblclick", "onDoubleClick");
mi("focusin", "onFocus");
mi("focusout", "onBlur");
mi(v_, "onTransitionEnd");
Es("onMouseEnter", ["mouseout", "mouseover"]);
Es("onMouseLeave", ["mouseout", "mouseover"]);
Es("onPointerEnter", ["pointerout", "pointerover"]);
Es("onPointerLeave", ["pointerout", "pointerover"]);
$i("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
$i("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
$i("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
$i("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
$i("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
$i("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var kr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), W1 = new Set("cancel close invalid load scroll toggle".split(" ").concat(kr));
function ip(e, t, n) {
  var i = e.type || "unknown-event";
  e.currentTarget = n, Bx(i, t, void 0, e), e.currentTarget = null;
}
function x_(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var i = e[n], r = i.event;
    i = i.listeners;
    t: {
      var o = void 0;
      if (t) for (var a = i.length - 1; 0 <= a; a--) {
        var c = i[a], u = c.instance, d = c.currentTarget;
        if (c = c.listener, u !== o && r.isPropagationStopped()) break t;
        ip(r, c, d), o = u;
      }
      else for (a = 0; a < i.length; a++) {
        if (c = i[a], u = c.instance, d = c.currentTarget, c = c.listener, u !== o && r.isPropagationStopped()) break t;
        ip(r, c, d), o = u;
      }
    }
  }
  if (Ba) throw e = bu, Ba = !1, bu = null, e;
}
function Lt(e, t) {
  var n = t[zu];
  n === void 0 && (n = t[zu] = /* @__PURE__ */ new Set());
  var i = e + "__bubble";
  n.has(i) || (w_(t, e, 2, !1), n.add(i));
}
function zc(e, t, n) {
  var i = 0;
  t && (i |= 4), w_(n, e, i, t);
}
var Go = "_reactListening" + Math.random().toString(36).slice(2);
function Xr(e) {
  if (!e[Go]) {
    e[Go] = !0, Lg.forEach(function(n) {
      n !== "selectionchange" && (W1.has(n) || zc(n, !1, e), zc(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Go] || (t[Go] = !0, zc("selectionchange", !1, t));
  }
}
function w_(e, t, n, i) {
  switch (s_(t)) {
    case 1:
      var r = n1;
      break;
    case 4:
      r = i1;
      break;
    default:
      r = Th;
  }
  n = r.bind(null, t, n, e), r = void 0, !wu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (r = !0), i ? r !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: r }) : e.addEventListener(t, n, !0) : r !== void 0 ? e.addEventListener(t, n, { passive: r }) : e.addEventListener(t, n, !1);
}
function jc(e, t, n, i, r) {
  var o = i;
  if (!(t & 1) && !(t & 2) && i !== null) t: for (; ; ) {
    if (i === null) return;
    var a = i.tag;
    if (a === 3 || a === 4) {
      var c = i.stateNode.containerInfo;
      if (c === r || c.nodeType === 8 && c.parentNode === r) break;
      if (a === 4) for (a = i.return; a !== null; ) {
        var u = a.tag;
        if ((u === 3 || u === 4) && (u = a.stateNode.containerInfo, u === r || u.nodeType === 8 && u.parentNode === r)) return;
        a = a.return;
      }
      for (; c !== null; ) {
        if (a = Ei(c), a === null) return;
        if (u = a.tag, u === 5 || u === 6) {
          i = o = a;
          continue t;
        }
        c = c.parentNode;
      }
    }
    i = i.return;
  }
  Zg(function() {
    var d = o, p = Ph(n), g = [];
    t: {
      var v = y_.get(e);
      if (v !== void 0) {
        var y = Eh, S = e;
        switch (e) {
          case "keypress":
            if (Sa(n) === 0) break t;
          case "keydown":
          case "keyup":
            y = v1;
            break;
          case "focusin":
            S = "focus", y = Mc;
            break;
          case "focusout":
            S = "blur", y = Mc;
            break;
          case "beforeblur":
          case "afterblur":
            y = Mc;
            break;
          case "click":
            if (n.button === 2) break t;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = Uf;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = o1;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = w1;
            break;
          case m_:
          case g_:
          case __:
            y = c1;
            break;
          case v_:
            y = k1;
            break;
          case "scroll":
            y = s1;
            break;
          case "wheel":
            y = P1;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = h1;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Yf;
        }
        var w = (t & 4) !== 0, M = !w && e === "scroll", b = w ? v !== null ? v + "Capture" : null : v;
        w = [];
        for (var k = d, P; k !== null; ) {
          P = k;
          var T = P.stateNode;
          if (P.tag === 5 && T !== null && (P = T, b !== null && (T = Zr(k, b), T != null && w.push(Gr(k, T, P)))), M) break;
          k = k.return;
        }
        0 < w.length && (v = new y(v, S, null, n, p), g.push({ event: v, listeners: w }));
      }
    }
    if (!(t & 7)) {
      t: {
        if (v = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", v && n !== yu && (S = n.relatedTarget || n.fromElement) && (Ei(S) || S[In])) break t;
        if ((y || v) && (v = p.window === p ? p : (v = p.ownerDocument) ? v.defaultView || v.parentWindow : window, y ? (S = n.relatedTarget || n.toElement, y = d, S = S ? Ei(S) : null, S !== null && (M = Yi(S), S !== M || S.tag !== 5 && S.tag !== 6) && (S = null)) : (y = null, S = d), y !== S)) {
          if (w = Uf, T = "onMouseLeave", b = "onMouseEnter", k = "mouse", (e === "pointerout" || e === "pointerover") && (w = Yf, T = "onPointerLeave", b = "onPointerEnter", k = "pointer"), M = y == null ? v : ms(y), P = S == null ? v : ms(S), v = new w(T, k + "leave", y, n, p), v.target = M, v.relatedTarget = P, T = null, Ei(p) === d && (w = new w(b, k + "enter", S, n, p), w.target = P, w.relatedTarget = M, T = w), M = T, y && S) e: {
            for (w = y, b = S, k = 0, P = w; P; P = os(P)) k++;
            for (P = 0, T = b; T; T = os(T)) P++;
            for (; 0 < k - P; ) w = os(w), k--;
            for (; 0 < P - k; ) b = os(b), P--;
            for (; k--; ) {
              if (w === b || b !== null && w === b.alternate) break e;
              w = os(w), b = os(b);
            }
            w = null;
          }
          else w = null;
          y !== null && sp(g, v, y, w, !1), S !== null && M !== null && sp(g, M, S, w, !0);
        }
      }
      t: {
        if (v = d ? ms(d) : window, y = v.nodeName && v.nodeName.toLowerCase(), y === "select" || y === "input" && v.type === "file") var N = z1;
        else if (Xf(v)) if (u_) N = I1;
        else {
          N = O1;
          var j = j1;
        }
        else (y = v.nodeName) && y.toLowerCase() === "input" && (v.type === "checkbox" || v.type === "radio") && (N = A1);
        if (N && (N = N(e, d))) {
          c_(g, N, n, p);
          break t;
        }
        j && j(e, v, d), e === "focusout" && (j = v._wrapperState) && j.controlled && v.type === "number" && pu(v, "number", v.value);
      }
      switch (j = d ? ms(d) : window, e) {
        case "focusin":
          (Xf(j) || j.contentEditable === "true") && (fs = j, Mu = d, jr = null);
          break;
        case "focusout":
          jr = Mu = fs = null;
          break;
        case "mousedown":
          Cu = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Cu = !1, ep(g, n, p);
          break;
        case "selectionchange":
          if (F1) break;
        case "keydown":
        case "keyup":
          ep(g, n, p);
      }
      var O;
      if (jh) t: {
        switch (e) {
          case "compositionstart":
            var A = "onCompositionStart";
            break t;
          case "compositionend":
            A = "onCompositionEnd";
            break t;
          case "compositionupdate":
            A = "onCompositionUpdate";
            break t;
        }
        A = void 0;
      }
      else ds ? a_(e, n) && (A = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (A = "onCompositionStart");
      A && (o_ && n.locale !== "ko" && (ds || A !== "onCompositionStart" ? A === "onCompositionEnd" && ds && (O = r_()) : (Xn = p, Nh = "value" in Xn ? Xn.value : Xn.textContent, ds = !0)), j = Ua(d, A), 0 < j.length && (A = new $f(A, e, null, n, p), g.push({ event: A, listeners: j }), O ? A.data = O : (O = l_(n), O !== null && (A.data = O)))), (O = C1 ? L1(e, n) : T1(e, n)) && (d = Ua(d, "onBeforeInput"), 0 < d.length && (p = new $f("onBeforeInput", "beforeinput", null, n, p), g.push({ event: p, listeners: d }), p.data = O));
    }
    x_(g, t);
  });
}
function Gr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ua(e, t) {
  for (var n = t + "Capture", i = []; e !== null; ) {
    var r = e, o = r.stateNode;
    r.tag === 5 && o !== null && (r = o, o = Zr(e, n), o != null && i.unshift(Gr(e, o, r)), o = Zr(e, t), o != null && i.push(Gr(e, o, r))), e = e.return;
  }
  return i;
}
function os(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function sp(e, t, n, i, r) {
  for (var o = t._reactName, a = []; n !== null && n !== i; ) {
    var c = n, u = c.alternate, d = c.stateNode;
    if (u !== null && u === i) break;
    c.tag === 5 && d !== null && (c = d, r ? (u = Zr(n, o), u != null && a.unshift(Gr(n, u, c))) : r || (u = Zr(n, o), u != null && a.push(Gr(n, u, c)))), n = n.return;
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var V1 = /\r\n?/g, Z1 = /\u0000|\uFFFD/g;
function rp(e) {
  return (typeof e == "string" ? e : "" + e).replace(V1, `
`).replace(Z1, "");
}
function Qo(e, t, n) {
  if (t = rp(t), rp(e) !== t && n) throw Error(B(425));
}
function $a() {
}
var Lu = null, Tu = null;
function Nu(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Eu = typeof setTimeout == "function" ? setTimeout : void 0, U1 = typeof clearTimeout == "function" ? clearTimeout : void 0, op = typeof Promise == "function" ? Promise : void 0, $1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof op < "u" ? function(e) {
  return op.resolve(null).then(e).catch(Y1);
} : Eu;
function Y1(e) {
  setTimeout(function() {
    throw e;
  });
}
function Oc(e, t) {
  var n = t, i = 0;
  do {
    var r = n.nextSibling;
    if (e.removeChild(n), r && r.nodeType === 8) if (n = r.data, n === "/$") {
      if (i === 0) {
        e.removeChild(r), Yr(t);
        return;
      }
      i--;
    } else n !== "$" && n !== "$?" && n !== "$!" || i++;
    n = r;
  } while (n);
  Yr(t);
}
function oi(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function ap(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Ws = Math.random().toString(36).slice(2), gn = "__reactFiber$" + Ws, Qr = "__reactProps$" + Ws, In = "__reactContainer$" + Ws, zu = "__reactEvents$" + Ws, q1 = "__reactListeners$" + Ws, K1 = "__reactHandles$" + Ws;
function Ei(e) {
  var t = e[gn];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[In] || n[gn]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ap(e); e !== null; ) {
        if (n = e[gn]) return n;
        e = ap(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function go(e) {
  return e = e[gn] || e[In], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function ms(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(B(33));
}
function kl(e) {
  return e[Qr] || null;
}
var ju = [], gs = -1;
function gi(e) {
  return { current: e };
}
function Nt(e) {
  0 > gs || (e.current = ju[gs], ju[gs] = null, gs--);
}
function Ct(e, t) {
  gs++, ju[gs] = e.current, e.current = t;
}
var fi = {}, he = gi(fi), Pe = gi(!1), Fi = fi;
function zs(e, t) {
  var n = e.type.contextTypes;
  if (!n) return fi;
  var i = e.stateNode;
  if (i && i.__reactInternalMemoizedUnmaskedChildContext === t) return i.__reactInternalMemoizedMaskedChildContext;
  var r = {}, o;
  for (o in n) r[o] = t[o];
  return i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = r), r;
}
function Me(e) {
  return e = e.childContextTypes, e != null;
}
function Ya() {
  Nt(Pe), Nt(he);
}
function lp(e, t, n) {
  if (he.current !== fi) throw Error(B(168));
  Ct(he, t), Ct(Pe, n);
}
function b_(e, t, n) {
  var i = e.stateNode;
  if (t = t.childContextTypes, typeof i.getChildContext != "function") return n;
  i = i.getChildContext();
  for (var r in i) if (!(r in t)) throw Error(B(108, jx(e) || "Unknown", r));
  return It({}, n, i);
}
function qa(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || fi, Fi = he.current, Ct(he, e), Ct(Pe, Pe.current), !0;
}
function cp(e, t, n) {
  var i = e.stateNode;
  if (!i) throw Error(B(169));
  n ? (e = b_(e, t, Fi), i.__reactInternalMemoizedMergedChildContext = e, Nt(Pe), Nt(he), Ct(he, e)) : Nt(Pe), Ct(Pe, n);
}
var Ln = null, Sl = !1, Ac = !1;
function k_(e) {
  Ln === null ? Ln = [e] : Ln.push(e);
}
function X1(e) {
  Sl = !0, k_(e);
}
function _i() {
  if (!Ac && Ln !== null) {
    Ac = !0;
    var e = 0, t = kt;
    try {
      var n = Ln;
      for (kt = 1; e < n.length; e++) {
        var i = n[e];
        do
          i = i(!0);
        while (i !== null);
      }
      Ln = null, Sl = !1;
    } catch (r) {
      throw Ln !== null && (Ln = Ln.slice(e + 1)), qg(Mh, _i), r;
    } finally {
      kt = t, Ac = !1;
    }
  }
  return null;
}
var _s = [], vs = 0, Ka = null, Xa = 0, Ve = [], Ze = 0, Bi = null, Nn = 1, En = "";
function Ci(e, t) {
  _s[vs++] = Xa, _s[vs++] = Ka, Ka = e, Xa = t;
}
function S_(e, t, n) {
  Ve[Ze++] = Nn, Ve[Ze++] = En, Ve[Ze++] = Bi, Bi = e;
  var i = Nn;
  e = En;
  var r = 32 - en(i) - 1;
  i &= ~(1 << r), n += 1;
  var o = 32 - en(t) + r;
  if (30 < o) {
    var a = r - r % 5;
    o = (i & (1 << a) - 1).toString(32), i >>= a, r -= a, Nn = 1 << 32 - en(t) + r | n << r | i, En = o + e;
  } else Nn = 1 << o | n << r | i, En = e;
}
function Ah(e) {
  e.return !== null && (Ci(e, 1), S_(e, 1, 0));
}
function Ih(e) {
  for (; e === Ka; ) Ka = _s[--vs], _s[vs] = null, Xa = _s[--vs], _s[vs] = null;
  for (; e === Bi; ) Bi = Ve[--Ze], Ve[Ze] = null, En = Ve[--Ze], Ve[Ze] = null, Nn = Ve[--Ze], Ve[Ze] = null;
}
var je = null, ze = null, Et = !1, tn = null;
function P_(e, t) {
  var n = Ue(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function up(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, je = e, ze = oi(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, je = e, ze = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Bi !== null ? { id: Nn, overflow: En } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ue(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, je = e, ze = null, !0) : !1;
    default:
      return !1;
  }
}
function Ou(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Au(e) {
  if (Et) {
    var t = ze;
    if (t) {
      var n = t;
      if (!up(e, t)) {
        if (Ou(e)) throw Error(B(418));
        t = oi(n.nextSibling);
        var i = je;
        t && up(e, t) ? P_(i, n) : (e.flags = e.flags & -4097 | 2, Et = !1, je = e);
      }
    } else {
      if (Ou(e)) throw Error(B(418));
      e.flags = e.flags & -4097 | 2, Et = !1, je = e;
    }
  }
}
function hp(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  je = e;
}
function Jo(e) {
  if (e !== je) return !1;
  if (!Et) return hp(e), Et = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Nu(e.type, e.memoizedProps)), t && (t = ze)) {
    if (Ou(e)) throw M_(), Error(B(418));
    for (; t; ) P_(e, t), t = oi(t.nextSibling);
  }
  if (hp(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(B(317));
    t: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ze = oi(e.nextSibling);
              break t;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      ze = null;
    }
  } else ze = je ? oi(e.stateNode.nextSibling) : null;
  return !0;
}
function M_() {
  for (var e = ze; e; ) e = oi(e.nextSibling);
}
function js() {
  ze = je = null, Et = !1;
}
function Rh(e) {
  tn === null ? tn = [e] : tn.push(e);
}
var G1 = Fn.ReactCurrentBatchConfig;
function dr(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(B(309));
        var i = n.stateNode;
      }
      if (!i) throw Error(B(147, e));
      var r = i, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(a) {
        var c = r.refs;
        a === null ? delete c[o] : c[o] = a;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(B(284));
    if (!n._owner) throw Error(B(290, e));
  }
  return e;
}
function ta(e, t) {
  throw e = Object.prototype.toString.call(t), Error(B(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function dp(e) {
  var t = e._init;
  return t(e._payload);
}
function C_(e) {
  function t(b, k) {
    if (e) {
      var P = b.deletions;
      P === null ? (b.deletions = [k], b.flags |= 16) : P.push(k);
    }
  }
  function n(b, k) {
    if (!e) return null;
    for (; k !== null; ) t(b, k), k = k.sibling;
    return null;
  }
  function i(b, k) {
    for (b = /* @__PURE__ */ new Map(); k !== null; ) k.key !== null ? b.set(k.key, k) : b.set(k.index, k), k = k.sibling;
    return b;
  }
  function r(b, k) {
    return b = ui(b, k), b.index = 0, b.sibling = null, b;
  }
  function o(b, k, P) {
    return b.index = P, e ? (P = b.alternate, P !== null ? (P = P.index, P < k ? (b.flags |= 2, k) : P) : (b.flags |= 2, k)) : (b.flags |= 1048576, k);
  }
  function a(b) {
    return e && b.alternate === null && (b.flags |= 2), b;
  }
  function c(b, k, P, T) {
    return k === null || k.tag !== 6 ? (k = Wc(P, b.mode, T), k.return = b, k) : (k = r(k, P), k.return = b, k);
  }
  function u(b, k, P, T) {
    var N = P.type;
    return N === hs ? p(b, k, P.props.children, T, P.key) : k !== null && (k.elementType === N || typeof N == "object" && N !== null && N.$$typeof === $n && dp(N) === k.type) ? (T = r(k, P.props), T.ref = dr(b, k, P), T.return = b, T) : (T = Ea(P.type, P.key, P.props, null, b.mode, T), T.ref = dr(b, k, P), T.return = b, T);
  }
  function d(b, k, P, T) {
    return k === null || k.tag !== 4 || k.stateNode.containerInfo !== P.containerInfo || k.stateNode.implementation !== P.implementation ? (k = Vc(P, b.mode, T), k.return = b, k) : (k = r(k, P.children || []), k.return = b, k);
  }
  function p(b, k, P, T, N) {
    return k === null || k.tag !== 7 ? (k = Ii(P, b.mode, T, N), k.return = b, k) : (k = r(k, P), k.return = b, k);
  }
  function g(b, k, P) {
    if (typeof k == "string" && k !== "" || typeof k == "number") return k = Wc("" + k, b.mode, P), k.return = b, k;
    if (typeof k == "object" && k !== null) {
      switch (k.$$typeof) {
        case Vo:
          return P = Ea(k.type, k.key, k.props, null, b.mode, P), P.ref = dr(b, null, k), P.return = b, P;
        case us:
          return k = Vc(k, b.mode, P), k.return = b, k;
        case $n:
          var T = k._init;
          return g(b, T(k._payload), P);
      }
      if (wr(k) || ar(k)) return k = Ii(k, b.mode, P, null), k.return = b, k;
      ta(b, k);
    }
    return null;
  }
  function v(b, k, P, T) {
    var N = k !== null ? k.key : null;
    if (typeof P == "string" && P !== "" || typeof P == "number") return N !== null ? null : c(b, k, "" + P, T);
    if (typeof P == "object" && P !== null) {
      switch (P.$$typeof) {
        case Vo:
          return P.key === N ? u(b, k, P, T) : null;
        case us:
          return P.key === N ? d(b, k, P, T) : null;
        case $n:
          return N = P._init, v(
            b,
            k,
            N(P._payload),
            T
          );
      }
      if (wr(P) || ar(P)) return N !== null ? null : p(b, k, P, T, null);
      ta(b, P);
    }
    return null;
  }
  function y(b, k, P, T, N) {
    if (typeof T == "string" && T !== "" || typeof T == "number") return b = b.get(P) || null, c(k, b, "" + T, N);
    if (typeof T == "object" && T !== null) {
      switch (T.$$typeof) {
        case Vo:
          return b = b.get(T.key === null ? P : T.key) || null, u(k, b, T, N);
        case us:
          return b = b.get(T.key === null ? P : T.key) || null, d(k, b, T, N);
        case $n:
          var j = T._init;
          return y(b, k, P, j(T._payload), N);
      }
      if (wr(T) || ar(T)) return b = b.get(P) || null, p(k, b, T, N, null);
      ta(k, T);
    }
    return null;
  }
  function S(b, k, P, T) {
    for (var N = null, j = null, O = k, A = k = 0, H = null; O !== null && A < P.length; A++) {
      O.index > A ? (H = O, O = null) : H = O.sibling;
      var F = v(b, O, P[A], T);
      if (F === null) {
        O === null && (O = H);
        break;
      }
      e && O && F.alternate === null && t(b, O), k = o(F, k, A), j === null ? N = F : j.sibling = F, j = F, O = H;
    }
    if (A === P.length) return n(b, O), Et && Ci(b, A), N;
    if (O === null) {
      for (; A < P.length; A++) O = g(b, P[A], T), O !== null && (k = o(O, k, A), j === null ? N = O : j.sibling = O, j = O);
      return Et && Ci(b, A), N;
    }
    for (O = i(b, O); A < P.length; A++) H = y(O, b, A, P[A], T), H !== null && (e && H.alternate !== null && O.delete(H.key === null ? A : H.key), k = o(H, k, A), j === null ? N = H : j.sibling = H, j = H);
    return e && O.forEach(function(V) {
      return t(b, V);
    }), Et && Ci(b, A), N;
  }
  function w(b, k, P, T) {
    var N = ar(P);
    if (typeof N != "function") throw Error(B(150));
    if (P = N.call(P), P == null) throw Error(B(151));
    for (var j = N = null, O = k, A = k = 0, H = null, F = P.next(); O !== null && !F.done; A++, F = P.next()) {
      O.index > A ? (H = O, O = null) : H = O.sibling;
      var V = v(b, O, F.value, T);
      if (V === null) {
        O === null && (O = H);
        break;
      }
      e && O && V.alternate === null && t(b, O), k = o(V, k, A), j === null ? N = V : j.sibling = V, j = V, O = H;
    }
    if (F.done) return n(
      b,
      O
    ), Et && Ci(b, A), N;
    if (O === null) {
      for (; !F.done; A++, F = P.next()) F = g(b, F.value, T), F !== null && (k = o(F, k, A), j === null ? N = F : j.sibling = F, j = F);
      return Et && Ci(b, A), N;
    }
    for (O = i(b, O); !F.done; A++, F = P.next()) F = y(O, b, A, F.value, T), F !== null && (e && F.alternate !== null && O.delete(F.key === null ? A : F.key), k = o(F, k, A), j === null ? N = F : j.sibling = F, j = F);
    return e && O.forEach(function(K) {
      return t(b, K);
    }), Et && Ci(b, A), N;
  }
  function M(b, k, P, T) {
    if (typeof P == "object" && P !== null && P.type === hs && P.key === null && (P = P.props.children), typeof P == "object" && P !== null) {
      switch (P.$$typeof) {
        case Vo:
          t: {
            for (var N = P.key, j = k; j !== null; ) {
              if (j.key === N) {
                if (N = P.type, N === hs) {
                  if (j.tag === 7) {
                    n(b, j.sibling), k = r(j, P.props.children), k.return = b, b = k;
                    break t;
                  }
                } else if (j.elementType === N || typeof N == "object" && N !== null && N.$$typeof === $n && dp(N) === j.type) {
                  n(b, j.sibling), k = r(j, P.props), k.ref = dr(b, j, P), k.return = b, b = k;
                  break t;
                }
                n(b, j);
                break;
              } else t(b, j);
              j = j.sibling;
            }
            P.type === hs ? (k = Ii(P.props.children, b.mode, T, P.key), k.return = b, b = k) : (T = Ea(P.type, P.key, P.props, null, b.mode, T), T.ref = dr(b, k, P), T.return = b, b = T);
          }
          return a(b);
        case us:
          t: {
            for (j = P.key; k !== null; ) {
              if (k.key === j) if (k.tag === 4 && k.stateNode.containerInfo === P.containerInfo && k.stateNode.implementation === P.implementation) {
                n(b, k.sibling), k = r(k, P.children || []), k.return = b, b = k;
                break t;
              } else {
                n(b, k);
                break;
              }
              else t(b, k);
              k = k.sibling;
            }
            k = Vc(P, b.mode, T), k.return = b, b = k;
          }
          return a(b);
        case $n:
          return j = P._init, M(b, k, j(P._payload), T);
      }
      if (wr(P)) return S(b, k, P, T);
      if (ar(P)) return w(b, k, P, T);
      ta(b, P);
    }
    return typeof P == "string" && P !== "" || typeof P == "number" ? (P = "" + P, k !== null && k.tag === 6 ? (n(b, k.sibling), k = r(k, P), k.return = b, b = k) : (n(b, k), k = Wc(P, b.mode, T), k.return = b, b = k), a(b)) : n(b, k);
  }
  return M;
}
var Os = C_(!0), L_ = C_(!1), Ga = gi(null), Qa = null, ys = null, Dh = null;
function Fh() {
  Dh = ys = Qa = null;
}
function Bh(e) {
  var t = Ga.current;
  Nt(Ga), e._currentValue = t;
}
function Iu(e, t, n) {
  for (; e !== null; ) {
    var i = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Ms(e, t) {
  Qa = e, Dh = ys = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (ke = !0), e.firstContext = null);
}
function Ye(e) {
  var t = e._currentValue;
  if (Dh !== e) if (e = { context: e, memoizedValue: t, next: null }, ys === null) {
    if (Qa === null) throw Error(B(308));
    ys = e, Qa.dependencies = { lanes: 0, firstContext: e };
  } else ys = ys.next = e;
  return t;
}
var zi = null;
function Hh(e) {
  zi === null ? zi = [e] : zi.push(e);
}
function T_(e, t, n, i) {
  var r = t.interleaved;
  return r === null ? (n.next = n, Hh(t)) : (n.next = r.next, r.next = n), t.interleaved = n, Rn(e, i);
}
function Rn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Yn = !1;
function Wh(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function N_(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function On(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ai(e, t, n) {
  var i = e.updateQueue;
  if (i === null) return null;
  if (i = i.shared, _t & 2) {
    var r = i.pending;
    return r === null ? t.next = t : (t.next = r.next, r.next = t), i.pending = t, Rn(e, n);
  }
  return r = i.interleaved, r === null ? (t.next = t, Hh(i)) : (t.next = r.next, r.next = t), i.interleaved = t, Rn(e, n);
}
function Pa(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, Ch(e, n);
  }
}
function fp(e, t) {
  var n = e.updateQueue, i = e.alternate;
  if (i !== null && (i = i.updateQueue, n === i)) {
    var r = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var a = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? r = o = a : o = o.next = a, n = n.next;
      } while (n !== null);
      o === null ? r = o = t : o = o.next = t;
    } else r = o = t;
    n = { baseState: i.baseState, firstBaseUpdate: r, lastBaseUpdate: o, shared: i.shared, effects: i.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Ja(e, t, n, i) {
  var r = e.updateQueue;
  Yn = !1;
  var o = r.firstBaseUpdate, a = r.lastBaseUpdate, c = r.shared.pending;
  if (c !== null) {
    r.shared.pending = null;
    var u = c, d = u.next;
    u.next = null, a === null ? o = d : a.next = d, a = u;
    var p = e.alternate;
    p !== null && (p = p.updateQueue, c = p.lastBaseUpdate, c !== a && (c === null ? p.firstBaseUpdate = d : c.next = d, p.lastBaseUpdate = u));
  }
  if (o !== null) {
    var g = r.baseState;
    a = 0, p = d = u = null, c = o;
    do {
      var v = c.lane, y = c.eventTime;
      if ((i & v) === v) {
        p !== null && (p = p.next = {
          eventTime: y,
          lane: 0,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        });
        t: {
          var S = e, w = c;
          switch (v = t, y = n, w.tag) {
            case 1:
              if (S = w.payload, typeof S == "function") {
                g = S.call(y, g, v);
                break t;
              }
              g = S;
              break t;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = w.payload, v = typeof S == "function" ? S.call(y, g, v) : S, v == null) break t;
              g = It({}, g, v);
              break t;
            case 2:
              Yn = !0;
          }
        }
        c.callback !== null && c.lane !== 0 && (e.flags |= 64, v = r.effects, v === null ? r.effects = [c] : v.push(c));
      } else y = { eventTime: y, lane: v, tag: c.tag, payload: c.payload, callback: c.callback, next: null }, p === null ? (d = p = y, u = g) : p = p.next = y, a |= v;
      if (c = c.next, c === null) {
        if (c = r.shared.pending, c === null) break;
        v = c, c = v.next, v.next = null, r.lastBaseUpdate = v, r.shared.pending = null;
      }
    } while (!0);
    if (p === null && (u = g), r.baseState = u, r.firstBaseUpdate = d, r.lastBaseUpdate = p, t = r.shared.interleaved, t !== null) {
      r = t;
      do
        a |= r.lane, r = r.next;
      while (r !== t);
    } else o === null && (r.shared.lanes = 0);
    Wi |= a, e.lanes = a, e.memoizedState = g;
  }
}
function pp(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var i = e[t], r = i.callback;
    if (r !== null) {
      if (i.callback = null, i = n, typeof r != "function") throw Error(B(191, r));
      r.call(i);
    }
  }
}
var _o = {}, vn = gi(_o), Jr = gi(_o), to = gi(_o);
function ji(e) {
  if (e === _o) throw Error(B(174));
  return e;
}
function Vh(e, t) {
  switch (Ct(to, t), Ct(Jr, e), Ct(vn, _o), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : gu(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = gu(t, e);
  }
  Nt(vn), Ct(vn, t);
}
function As() {
  Nt(vn), Nt(Jr), Nt(to);
}
function E_(e) {
  ji(to.current);
  var t = ji(vn.current), n = gu(t, e.type);
  t !== n && (Ct(Jr, e), Ct(vn, n));
}
function Zh(e) {
  Jr.current === e && (Nt(vn), Nt(Jr));
}
var jt = gi(0);
function tl(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var Ic = [];
function Uh() {
  for (var e = 0; e < Ic.length; e++) Ic[e]._workInProgressVersionPrimary = null;
  Ic.length = 0;
}
var Ma = Fn.ReactCurrentDispatcher, Rc = Fn.ReactCurrentBatchConfig, Hi = 0, At = null, Yt = null, te = null, el = !1, Or = !1, eo = 0, Q1 = 0;
function ae() {
  throw Error(B(321));
}
function $h(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!sn(e[n], t[n])) return !1;
  return !0;
}
function Yh(e, t, n, i, r, o) {
  if (Hi = o, At = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ma.current = e === null || e.memoizedState === null ? nw : iw, e = n(i, r), Or) {
    o = 0;
    do {
      if (Or = !1, eo = 0, 25 <= o) throw Error(B(301));
      o += 1, te = Yt = null, t.updateQueue = null, Ma.current = sw, e = n(i, r);
    } while (Or);
  }
  if (Ma.current = nl, t = Yt !== null && Yt.next !== null, Hi = 0, te = Yt = At = null, el = !1, t) throw Error(B(300));
  return e;
}
function qh() {
  var e = eo !== 0;
  return eo = 0, e;
}
function fn() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return te === null ? At.memoizedState = te = e : te = te.next = e, te;
}
function qe() {
  if (Yt === null) {
    var e = At.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Yt.next;
  var t = te === null ? At.memoizedState : te.next;
  if (t !== null) te = t, Yt = e;
  else {
    if (e === null) throw Error(B(310));
    Yt = e, e = { memoizedState: Yt.memoizedState, baseState: Yt.baseState, baseQueue: Yt.baseQueue, queue: Yt.queue, next: null }, te === null ? At.memoizedState = te = e : te = te.next = e;
  }
  return te;
}
function no(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Dc(e) {
  var t = qe(), n = t.queue;
  if (n === null) throw Error(B(311));
  n.lastRenderedReducer = e;
  var i = Yt, r = i.baseQueue, o = n.pending;
  if (o !== null) {
    if (r !== null) {
      var a = r.next;
      r.next = o.next, o.next = a;
    }
    i.baseQueue = r = o, n.pending = null;
  }
  if (r !== null) {
    o = r.next, i = i.baseState;
    var c = a = null, u = null, d = o;
    do {
      var p = d.lane;
      if ((Hi & p) === p) u !== null && (u = u.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), i = d.hasEagerState ? d.eagerState : e(i, d.action);
      else {
        var g = {
          lane: p,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        u === null ? (c = u = g, a = i) : u = u.next = g, At.lanes |= p, Wi |= p;
      }
      d = d.next;
    } while (d !== null && d !== o);
    u === null ? a = i : u.next = c, sn(i, t.memoizedState) || (ke = !0), t.memoizedState = i, t.baseState = a, t.baseQueue = u, n.lastRenderedState = i;
  }
  if (e = n.interleaved, e !== null) {
    r = e;
    do
      o = r.lane, At.lanes |= o, Wi |= o, r = r.next;
    while (r !== e);
  } else r === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Fc(e) {
  var t = qe(), n = t.queue;
  if (n === null) throw Error(B(311));
  n.lastRenderedReducer = e;
  var i = n.dispatch, r = n.pending, o = t.memoizedState;
  if (r !== null) {
    n.pending = null;
    var a = r = r.next;
    do
      o = e(o, a.action), a = a.next;
    while (a !== r);
    sn(o, t.memoizedState) || (ke = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, i];
}
function z_() {
}
function j_(e, t) {
  var n = At, i = qe(), r = t(), o = !sn(i.memoizedState, r);
  if (o && (i.memoizedState = r, ke = !0), i = i.queue, Kh(I_.bind(null, n, i, e), [e]), i.getSnapshot !== t || o || te !== null && te.memoizedState.tag & 1) {
    if (n.flags |= 2048, io(9, A_.bind(null, n, i, r, t), void 0, null), ee === null) throw Error(B(349));
    Hi & 30 || O_(n, t, r);
  }
  return r;
}
function O_(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = At.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, At.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function A_(e, t, n, i) {
  t.value = n, t.getSnapshot = i, R_(t) && D_(e);
}
function I_(e, t, n) {
  return n(function() {
    R_(t) && D_(e);
  });
}
function R_(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !sn(e, n);
  } catch {
    return !0;
  }
}
function D_(e) {
  var t = Rn(e, 1);
  t !== null && nn(t, e, 1, -1);
}
function mp(e) {
  var t = fn();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: no, lastRenderedState: e }, t.queue = e, e = e.dispatch = ew.bind(null, At, e), [t.memoizedState, e];
}
function io(e, t, n, i) {
  return e = { tag: e, create: t, destroy: n, deps: i, next: null }, t = At.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, At.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e)), e;
}
function F_() {
  return qe().memoizedState;
}
function Ca(e, t, n, i) {
  var r = fn();
  At.flags |= e, r.memoizedState = io(1 | t, n, void 0, i === void 0 ? null : i);
}
function Pl(e, t, n, i) {
  var r = qe();
  i = i === void 0 ? null : i;
  var o = void 0;
  if (Yt !== null) {
    var a = Yt.memoizedState;
    if (o = a.destroy, i !== null && $h(i, a.deps)) {
      r.memoizedState = io(t, n, o, i);
      return;
    }
  }
  At.flags |= e, r.memoizedState = io(1 | t, n, o, i);
}
function gp(e, t) {
  return Ca(8390656, 8, e, t);
}
function Kh(e, t) {
  return Pl(2048, 8, e, t);
}
function B_(e, t) {
  return Pl(4, 2, e, t);
}
function H_(e, t) {
  return Pl(4, 4, e, t);
}
function W_(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function V_(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Pl(4, 4, W_.bind(null, t, e), n);
}
function Xh() {
}
function Z_(e, t) {
  var n = qe();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && $h(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
}
function U_(e, t) {
  var n = qe();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && $h(t, i[1]) ? i[0] : (e = e(), n.memoizedState = [e, t], e);
}
function $_(e, t, n) {
  return Hi & 21 ? (sn(n, t) || (n = Gg(), At.lanes |= n, Wi |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ke = !0), e.memoizedState = n);
}
function J1(e, t) {
  var n = kt;
  kt = n !== 0 && 4 > n ? n : 4, e(!0);
  var i = Rc.transition;
  Rc.transition = {};
  try {
    e(!1), t();
  } finally {
    kt = n, Rc.transition = i;
  }
}
function Y_() {
  return qe().memoizedState;
}
function tw(e, t, n) {
  var i = ci(e);
  if (n = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null }, q_(e)) K_(t, n);
  else if (n = T_(e, t, n, i), n !== null) {
    var r = ge();
    nn(n, e, i, r), X_(n, t, i);
  }
}
function ew(e, t, n) {
  var i = ci(e), r = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (q_(e)) K_(t, r);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var a = t.lastRenderedState, c = o(a, n);
      if (r.hasEagerState = !0, r.eagerState = c, sn(c, a)) {
        var u = t.interleaved;
        u === null ? (r.next = r, Hh(t)) : (r.next = u.next, u.next = r), t.interleaved = r;
        return;
      }
    } catch {
    } finally {
    }
    n = T_(e, t, r, i), n !== null && (r = ge(), nn(n, e, i, r), X_(n, t, i));
  }
}
function q_(e) {
  var t = e.alternate;
  return e === At || t !== null && t === At;
}
function K_(e, t) {
  Or = el = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function X_(e, t, n) {
  if (n & 4194240) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, Ch(e, n);
  }
}
var nl = { readContext: Ye, useCallback: ae, useContext: ae, useEffect: ae, useImperativeHandle: ae, useInsertionEffect: ae, useLayoutEffect: ae, useMemo: ae, useReducer: ae, useRef: ae, useState: ae, useDebugValue: ae, useDeferredValue: ae, useTransition: ae, useMutableSource: ae, useSyncExternalStore: ae, useId: ae, unstable_isNewReconciler: !1 }, nw = { readContext: Ye, useCallback: function(e, t) {
  return fn().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Ye, useEffect: gp, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ca(
    4194308,
    4,
    W_.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Ca(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Ca(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = fn();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var i = fn();
  return t = n !== void 0 ? n(t) : t, i.memoizedState = i.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, i.queue = e, e = e.dispatch = tw.bind(null, At, e), [i.memoizedState, e];
}, useRef: function(e) {
  var t = fn();
  return e = { current: e }, t.memoizedState = e;
}, useState: mp, useDebugValue: Xh, useDeferredValue: function(e) {
  return fn().memoizedState = e;
}, useTransition: function() {
  var e = mp(!1), t = e[0];
  return e = J1.bind(null, e[1]), fn().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var i = At, r = fn();
  if (Et) {
    if (n === void 0) throw Error(B(407));
    n = n();
  } else {
    if (n = t(), ee === null) throw Error(B(349));
    Hi & 30 || O_(i, t, n);
  }
  r.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return r.queue = o, gp(I_.bind(
    null,
    i,
    o,
    e
  ), [e]), i.flags |= 2048, io(9, A_.bind(null, i, o, n, t), void 0, null), n;
}, useId: function() {
  var e = fn(), t = ee.identifierPrefix;
  if (Et) {
    var n = En, i = Nn;
    n = (i & ~(1 << 32 - en(i) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = eo++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Q1++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, iw = {
  readContext: Ye,
  useCallback: Z_,
  useContext: Ye,
  useEffect: Kh,
  useImperativeHandle: V_,
  useInsertionEffect: B_,
  useLayoutEffect: H_,
  useMemo: U_,
  useReducer: Dc,
  useRef: F_,
  useState: function() {
    return Dc(no);
  },
  useDebugValue: Xh,
  useDeferredValue: function(e) {
    var t = qe();
    return $_(t, Yt.memoizedState, e);
  },
  useTransition: function() {
    var e = Dc(no)[0], t = qe().memoizedState;
    return [e, t];
  },
  useMutableSource: z_,
  useSyncExternalStore: j_,
  useId: Y_,
  unstable_isNewReconciler: !1
}, sw = { readContext: Ye, useCallback: Z_, useContext: Ye, useEffect: Kh, useImperativeHandle: V_, useInsertionEffect: B_, useLayoutEffect: H_, useMemo: U_, useReducer: Fc, useRef: F_, useState: function() {
  return Fc(no);
}, useDebugValue: Xh, useDeferredValue: function(e) {
  var t = qe();
  return Yt === null ? t.memoizedState = e : $_(t, Yt.memoizedState, e);
}, useTransition: function() {
  var e = Fc(no)[0], t = qe().memoizedState;
  return [e, t];
}, useMutableSource: z_, useSyncExternalStore: j_, useId: Y_, unstable_isNewReconciler: !1 };
function Qe(e, t) {
  if (e && e.defaultProps) {
    t = It({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Ru(e, t, n, i) {
  t = e.memoizedState, n = n(i, t), n = n == null ? t : It({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Ml = { isMounted: function(e) {
  return (e = e._reactInternals) ? Yi(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var i = ge(), r = ci(e), o = On(i, r);
  o.payload = t, n != null && (o.callback = n), t = ai(e, o, r), t !== null && (nn(t, e, r, i), Pa(t, e, r));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var i = ge(), r = ci(e), o = On(i, r);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = ai(e, o, r), t !== null && (nn(t, e, r, i), Pa(t, e, r));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ge(), i = ci(e), r = On(n, i);
  r.tag = 2, t != null && (r.callback = t), t = ai(e, r, i), t !== null && (nn(t, e, i, n), Pa(t, e, i));
} };
function _p(e, t, n, i, r, o, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, o, a) : t.prototype && t.prototype.isPureReactComponent ? !Kr(n, i) || !Kr(r, o) : !0;
}
function G_(e, t, n) {
  var i = !1, r = fi, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Ye(o) : (r = Me(t) ? Fi : he.current, i = t.contextTypes, o = (i = i != null) ? zs(e, r) : fi), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Ml, e.stateNode = t, t._reactInternals = e, i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = r, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function vp(e, t, n, i) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== e && Ml.enqueueReplaceState(t, t.state, null);
}
function Du(e, t, n, i) {
  var r = e.stateNode;
  r.props = n, r.state = e.memoizedState, r.refs = {}, Wh(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? r.context = Ye(o) : (o = Me(t) ? Fi : he.current, r.context = zs(e, o)), r.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Ru(e, t, o, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (t = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), t !== r.state && Ml.enqueueReplaceState(r, r.state, null), Ja(e, n, r, i), r.state = e.memoizedState), typeof r.componentDidMount == "function" && (e.flags |= 4194308);
}
function Is(e, t) {
  try {
    var n = "", i = t;
    do
      n += zx(i), i = i.return;
    while (i);
    var r = n;
  } catch (o) {
    r = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: r, digest: null };
}
function Bc(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Fu(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var rw = typeof WeakMap == "function" ? WeakMap : Map;
function Q_(e, t, n) {
  n = On(-1, n), n.tag = 3, n.payload = { element: null };
  var i = t.value;
  return n.callback = function() {
    sl || (sl = !0, Ku = i), Fu(e, t);
  }, n;
}
function J_(e, t, n) {
  n = On(-1, n), n.tag = 3;
  var i = e.type.getDerivedStateFromError;
  if (typeof i == "function") {
    var r = t.value;
    n.payload = function() {
      return i(r);
    }, n.callback = function() {
      Fu(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Fu(e, t), typeof i != "function" && (li === null ? li = /* @__PURE__ */ new Set([this]) : li.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), n;
}
function yp(e, t, n) {
  var i = e.pingCache;
  if (i === null) {
    i = e.pingCache = new rw();
    var r = /* @__PURE__ */ new Set();
    i.set(t, r);
  } else r = i.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), i.set(t, r));
  r.has(n) || (r.add(n), e = yw.bind(null, e, t, n), t.then(e, e));
}
function xp(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function wp(e, t, n, i, r) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = r, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = On(-1, 1), t.tag = 2, ai(n, t, 1))), n.lanes |= 1), e);
}
var ow = Fn.ReactCurrentOwner, ke = !1;
function me(e, t, n, i) {
  t.child = e === null ? L_(t, null, n, i) : Os(t, e.child, n, i);
}
function bp(e, t, n, i, r) {
  n = n.render;
  var o = t.ref;
  return Ms(t, r), i = Yh(e, t, n, i, o, r), n = qh(), e !== null && !ke ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~r, Dn(e, t, r)) : (Et && n && Ah(t), t.flags |= 1, me(e, t, i, r), t.child);
}
function kp(e, t, n, i, r) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !sd(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, tv(e, t, o, i, r)) : (e = Ea(n.type, null, i, t, t.mode, r), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & r)) {
    var a = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Kr, n(a, i) && e.ref === t.ref) return Dn(e, t, r);
  }
  return t.flags |= 1, e = ui(o, i), e.ref = t.ref, e.return = t, t.child = e;
}
function tv(e, t, n, i, r) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Kr(o, i) && e.ref === t.ref) if (ke = !1, t.pendingProps = i = o, (e.lanes & r) !== 0) e.flags & 131072 && (ke = !0);
    else return t.lanes = e.lanes, Dn(e, t, r);
  }
  return Bu(e, t, n, i, r);
}
function ev(e, t, n) {
  var i = t.pendingProps, r = i.children, o = e !== null ? e.memoizedState : null;
  if (i.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ct(ws, Ne), Ne |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Ct(ws, Ne), Ne |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, i = o !== null ? o.baseLanes : n, Ct(ws, Ne), Ne |= i;
  }
  else o !== null ? (i = o.baseLanes | n, t.memoizedState = null) : i = n, Ct(ws, Ne), Ne |= i;
  return me(e, t, r, n), t.child;
}
function nv(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Bu(e, t, n, i, r) {
  var o = Me(n) ? Fi : he.current;
  return o = zs(t, o), Ms(t, r), n = Yh(e, t, n, i, o, r), i = qh(), e !== null && !ke ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~r, Dn(e, t, r)) : (Et && i && Ah(t), t.flags |= 1, me(e, t, n, r), t.child);
}
function Sp(e, t, n, i, r) {
  if (Me(n)) {
    var o = !0;
    qa(t);
  } else o = !1;
  if (Ms(t, r), t.stateNode === null) La(e, t), G_(t, n, i), Du(t, n, i, r), i = !0;
  else if (e === null) {
    var a = t.stateNode, c = t.memoizedProps;
    a.props = c;
    var u = a.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = Ye(d) : (d = Me(n) ? Fi : he.current, d = zs(t, d));
    var p = n.getDerivedStateFromProps, g = typeof p == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    g || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (c !== i || u !== d) && vp(t, a, i, d), Yn = !1;
    var v = t.memoizedState;
    a.state = v, Ja(t, i, a, r), u = t.memoizedState, c !== i || v !== u || Pe.current || Yn ? (typeof p == "function" && (Ru(t, n, p, i), u = t.memoizedState), (c = Yn || _p(t, n, c, i, v, u, d)) ? (g || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = u), a.props = i, a.state = u, a.context = d, i = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
  } else {
    a = t.stateNode, N_(e, t), c = t.memoizedProps, d = t.type === t.elementType ? c : Qe(t.type, c), a.props = d, g = t.pendingProps, v = a.context, u = n.contextType, typeof u == "object" && u !== null ? u = Ye(u) : (u = Me(n) ? Fi : he.current, u = zs(t, u));
    var y = n.getDerivedStateFromProps;
    (p = typeof y == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (c !== g || v !== u) && vp(t, a, i, u), Yn = !1, v = t.memoizedState, a.state = v, Ja(t, i, a, r);
    var S = t.memoizedState;
    c !== g || v !== S || Pe.current || Yn ? (typeof y == "function" && (Ru(t, n, y, i), S = t.memoizedState), (d = Yn || _p(t, n, d, i, v, S, u) || !1) ? (p || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(i, S, u), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(i, S, u)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || c === e.memoizedProps && v === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && v === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = S), a.props = i, a.state = S, a.context = u, i = d) : (typeof a.componentDidUpdate != "function" || c === e.memoizedProps && v === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && v === e.memoizedState || (t.flags |= 1024), i = !1);
  }
  return Hu(e, t, n, i, o, r);
}
function Hu(e, t, n, i, r, o) {
  nv(e, t);
  var a = (t.flags & 128) !== 0;
  if (!i && !a) return r && cp(t, n, !1), Dn(e, t, o);
  i = t.stateNode, ow.current = t;
  var c = a && typeof n.getDerivedStateFromError != "function" ? null : i.render();
  return t.flags |= 1, e !== null && a ? (t.child = Os(t, e.child, null, o), t.child = Os(t, null, c, o)) : me(e, t, c, o), t.memoizedState = i.state, r && cp(t, n, !0), t.child;
}
function iv(e) {
  var t = e.stateNode;
  t.pendingContext ? lp(e, t.pendingContext, t.pendingContext !== t.context) : t.context && lp(e, t.context, !1), Vh(e, t.containerInfo);
}
function Pp(e, t, n, i, r) {
  return js(), Rh(r), t.flags |= 256, me(e, t, n, i), t.child;
}
var Wu = { dehydrated: null, treeContext: null, retryLane: 0 };
function Vu(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function sv(e, t, n) {
  var i = t.pendingProps, r = jt.current, o = !1, a = (t.flags & 128) !== 0, c;
  if ((c = a) || (c = e !== null && e.memoizedState === null ? !1 : (r & 2) !== 0), c ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (r |= 1), Ct(jt, r & 1), e === null)
    return Au(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = i.children, e = i.fallback, o ? (i = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(i & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = Tl(a, i, 0, null), e = Ii(e, i, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Vu(n), t.memoizedState = Wu, e) : Gh(t, a));
  if (r = e.memoizedState, r !== null && (c = r.dehydrated, c !== null)) return aw(e, t, a, i, c, r, n);
  if (o) {
    o = i.fallback, a = t.mode, r = e.child, c = r.sibling;
    var u = { mode: "hidden", children: i.children };
    return !(a & 1) && t.child !== r ? (i = t.child, i.childLanes = 0, i.pendingProps = u, t.deletions = null) : (i = ui(r, u), i.subtreeFlags = r.subtreeFlags & 14680064), c !== null ? o = ui(c, o) : (o = Ii(o, a, n, null), o.flags |= 2), o.return = t, i.return = t, i.sibling = o, t.child = i, i = o, o = t.child, a = e.child.memoizedState, a = a === null ? Vu(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = Wu, i;
  }
  return o = e.child, e = o.sibling, i = ui(o, { mode: "visible", children: i.children }), !(t.mode & 1) && (i.lanes = n), i.return = t, i.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = i, t.memoizedState = null, i;
}
function Gh(e, t) {
  return t = Tl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function ea(e, t, n, i) {
  return i !== null && Rh(i), Os(t, e.child, null, n), e = Gh(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function aw(e, t, n, i, r, o, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, i = Bc(Error(B(422))), ea(e, t, a, i)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = i.fallback, r = t.mode, i = Tl({ mode: "visible", children: i.children }, r, 0, null), o = Ii(o, r, a, null), o.flags |= 2, i.return = t, o.return = t, i.sibling = o, t.child = i, t.mode & 1 && Os(t, e.child, null, a), t.child.memoizedState = Vu(a), t.memoizedState = Wu, o);
  if (!(t.mode & 1)) return ea(e, t, a, null);
  if (r.data === "$!") {
    if (i = r.nextSibling && r.nextSibling.dataset, i) var c = i.dgst;
    return i = c, o = Error(B(419)), i = Bc(o, i, void 0), ea(e, t, a, i);
  }
  if (c = (a & e.childLanes) !== 0, ke || c) {
    if (i = ee, i !== null) {
      switch (a & -a) {
        case 4:
          r = 2;
          break;
        case 16:
          r = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          r = 32;
          break;
        case 536870912:
          r = 268435456;
          break;
        default:
          r = 0;
      }
      r = r & (i.suspendedLanes | a) ? 0 : r, r !== 0 && r !== o.retryLane && (o.retryLane = r, Rn(e, r), nn(i, e, r, -1));
    }
    return id(), i = Bc(Error(B(421))), ea(e, t, a, i);
  }
  return r.data === "$?" ? (t.flags |= 128, t.child = e.child, t = xw.bind(null, e), r._reactRetry = t, null) : (e = o.treeContext, ze = oi(r.nextSibling), je = t, Et = !0, tn = null, e !== null && (Ve[Ze++] = Nn, Ve[Ze++] = En, Ve[Ze++] = Bi, Nn = e.id, En = e.overflow, Bi = t), t = Gh(t, i.children), t.flags |= 4096, t);
}
function Mp(e, t, n) {
  e.lanes |= t;
  var i = e.alternate;
  i !== null && (i.lanes |= t), Iu(e.return, t, n);
}
function Hc(e, t, n, i, r) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: i, tail: n, tailMode: r } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = i, o.tail = n, o.tailMode = r);
}
function rv(e, t, n) {
  var i = t.pendingProps, r = i.revealOrder, o = i.tail;
  if (me(e, t, i.children, n), i = jt.current, i & 2) i = i & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) t: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Mp(e, n, t);
      else if (e.tag === 19) Mp(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break t;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break t;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    i &= 1;
  }
  if (Ct(jt, i), !(t.mode & 1)) t.memoizedState = null;
  else switch (r) {
    case "forwards":
      for (n = t.child, r = null; n !== null; ) e = n.alternate, e !== null && tl(e) === null && (r = n), n = n.sibling;
      n = r, n === null ? (r = t.child, t.child = null) : (r = n.sibling, n.sibling = null), Hc(t, !1, r, n, o);
      break;
    case "backwards":
      for (n = null, r = t.child, t.child = null; r !== null; ) {
        if (e = r.alternate, e !== null && tl(e) === null) {
          t.child = r;
          break;
        }
        e = r.sibling, r.sibling = n, n = r, r = e;
      }
      Hc(t, !0, n, null, o);
      break;
    case "together":
      Hc(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function La(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Dn(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Wi |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(B(153));
  if (t.child !== null) {
    for (e = t.child, n = ui(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = ui(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function lw(e, t, n) {
  switch (t.tag) {
    case 3:
      iv(t), js();
      break;
    case 5:
      E_(t);
      break;
    case 1:
      Me(t.type) && qa(t);
      break;
    case 4:
      Vh(t, t.stateNode.containerInfo);
      break;
    case 10:
      var i = t.type._context, r = t.memoizedProps.value;
      Ct(Ga, i._currentValue), i._currentValue = r;
      break;
    case 13:
      if (i = t.memoizedState, i !== null)
        return i.dehydrated !== null ? (Ct(jt, jt.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? sv(e, t, n) : (Ct(jt, jt.current & 1), e = Dn(e, t, n), e !== null ? e.sibling : null);
      Ct(jt, jt.current & 1);
      break;
    case 19:
      if (i = (n & t.childLanes) !== 0, e.flags & 128) {
        if (i) return rv(e, t, n);
        t.flags |= 128;
      }
      if (r = t.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), Ct(jt, jt.current), i) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, ev(e, t, n);
  }
  return Dn(e, t, n);
}
var ov, Zu, av, lv;
ov = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
Zu = function() {
};
av = function(e, t, n, i) {
  var r = e.memoizedProps;
  if (r !== i) {
    e = t.stateNode, ji(vn.current);
    var o = null;
    switch (n) {
      case "input":
        r = du(e, r), i = du(e, i), o = [];
        break;
      case "select":
        r = It({}, r, { value: void 0 }), i = It({}, i, { value: void 0 }), o = [];
        break;
      case "textarea":
        r = mu(e, r), i = mu(e, i), o = [];
        break;
      default:
        typeof r.onClick != "function" && typeof i.onClick == "function" && (e.onclick = $a);
    }
    _u(n, i);
    var a;
    n = null;
    for (d in r) if (!i.hasOwnProperty(d) && r.hasOwnProperty(d) && r[d] != null) if (d === "style") {
      var c = r[d];
      for (a in c) c.hasOwnProperty(a) && (n || (n = {}), n[a] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Wr.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in i) {
      var u = i[d];
      if (c = r != null ? r[d] : void 0, i.hasOwnProperty(d) && u !== c && (u != null || c != null)) if (d === "style") if (c) {
        for (a in c) !c.hasOwnProperty(a) || u && u.hasOwnProperty(a) || (n || (n = {}), n[a] = "");
        for (a in u) u.hasOwnProperty(a) && c[a] !== u[a] && (n || (n = {}), n[a] = u[a]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = u;
      else d === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, c = c ? c.__html : void 0, u != null && c !== u && (o = o || []).push(d, u)) : d === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(d, "" + u) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Wr.hasOwnProperty(d) ? (u != null && d === "onScroll" && Lt("scroll", e), o || c === u || (o = [])) : (o = o || []).push(d, u));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
lv = function(e, t, n, i) {
  n !== i && (t.flags |= 4);
};
function fr(e, t) {
  if (!Et) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var i = null; n !== null; ) n.alternate !== null && (i = n), n = n.sibling;
      i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
  }
}
function le(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, i = 0;
  if (t) for (var r = e.child; r !== null; ) n |= r.lanes | r.childLanes, i |= r.subtreeFlags & 14680064, i |= r.flags & 14680064, r.return = e, r = r.sibling;
  else for (r = e.child; r !== null; ) n |= r.lanes | r.childLanes, i |= r.subtreeFlags, i |= r.flags, r.return = e, r = r.sibling;
  return e.subtreeFlags |= i, e.childLanes = n, t;
}
function cw(e, t, n) {
  var i = t.pendingProps;
  switch (Ih(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return le(t), null;
    case 1:
      return Me(t.type) && Ya(), le(t), null;
    case 3:
      return i = t.stateNode, As(), Nt(Pe), Nt(he), Uh(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Jo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, tn !== null && (Qu(tn), tn = null))), Zu(e, t), le(t), null;
    case 5:
      Zh(t);
      var r = ji(to.current);
      if (n = t.type, e !== null && t.stateNode != null) av(e, t, n, i, r), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!i) {
          if (t.stateNode === null) throw Error(B(166));
          return le(t), null;
        }
        if (e = ji(vn.current), Jo(t)) {
          i = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (i[gn] = t, i[Qr] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Lt("cancel", i), Lt("close", i);
              break;
            case "iframe":
            case "object":
            case "embed":
              Lt("load", i);
              break;
            case "video":
            case "audio":
              for (r = 0; r < kr.length; r++) Lt(kr[r], i);
              break;
            case "source":
              Lt("error", i);
              break;
            case "img":
            case "image":
            case "link":
              Lt(
                "error",
                i
              ), Lt("load", i);
              break;
            case "details":
              Lt("toggle", i);
              break;
            case "input":
              Af(i, o), Lt("invalid", i);
              break;
            case "select":
              i._wrapperState = { wasMultiple: !!o.multiple }, Lt("invalid", i);
              break;
            case "textarea":
              Rf(i, o), Lt("invalid", i);
          }
          _u(n, o), r = null;
          for (var a in o) if (o.hasOwnProperty(a)) {
            var c = o[a];
            a === "children" ? typeof c == "string" ? i.textContent !== c && (o.suppressHydrationWarning !== !0 && Qo(i.textContent, c, e), r = ["children", c]) : typeof c == "number" && i.textContent !== "" + c && (o.suppressHydrationWarning !== !0 && Qo(
              i.textContent,
              c,
              e
            ), r = ["children", "" + c]) : Wr.hasOwnProperty(a) && c != null && a === "onScroll" && Lt("scroll", i);
          }
          switch (n) {
            case "input":
              Zo(i), If(i, o, !0);
              break;
            case "textarea":
              Zo(i), Df(i);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (i.onclick = $a);
          }
          i = r, t.updateQueue = i, i !== null && (t.flags |= 4);
        } else {
          a = r.nodeType === 9 ? r : r.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Ig(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = a.createElement(n, { is: i.is }) : (e = a.createElement(n), n === "select" && (a = e, i.multiple ? a.multiple = !0 : i.size && (a.size = i.size))) : e = a.createElementNS(e, n), e[gn] = t, e[Qr] = i, ov(e, t, !1, !1), t.stateNode = e;
          t: {
            switch (a = vu(n, i), n) {
              case "dialog":
                Lt("cancel", e), Lt("close", e), r = i;
                break;
              case "iframe":
              case "object":
              case "embed":
                Lt("load", e), r = i;
                break;
              case "video":
              case "audio":
                for (r = 0; r < kr.length; r++) Lt(kr[r], e);
                r = i;
                break;
              case "source":
                Lt("error", e), r = i;
                break;
              case "img":
              case "image":
              case "link":
                Lt(
                  "error",
                  e
                ), Lt("load", e), r = i;
                break;
              case "details":
                Lt("toggle", e), r = i;
                break;
              case "input":
                Af(e, i), r = du(e, i), Lt("invalid", e);
                break;
              case "option":
                r = i;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!i.multiple }, r = It({}, i, { value: void 0 }), Lt("invalid", e);
                break;
              case "textarea":
                Rf(e, i), r = mu(e, i), Lt("invalid", e);
                break;
              default:
                r = i;
            }
            _u(n, r), c = r;
            for (o in c) if (c.hasOwnProperty(o)) {
              var u = c[o];
              o === "style" ? Fg(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Rg(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Vr(e, u) : typeof u == "number" && Vr(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Wr.hasOwnProperty(o) ? u != null && o === "onScroll" && Lt("scroll", e) : u != null && wh(e, o, u, a));
            }
            switch (n) {
              case "input":
                Zo(e), If(e, i, !1);
                break;
              case "textarea":
                Zo(e), Df(e);
                break;
              case "option":
                i.value != null && e.setAttribute("value", "" + di(i.value));
                break;
              case "select":
                e.multiple = !!i.multiple, o = i.value, o != null ? bs(e, !!i.multiple, o, !1) : i.defaultValue != null && bs(
                  e,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                );
                break;
              default:
                typeof r.onClick == "function" && (e.onclick = $a);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break t;
              case "img":
                i = !0;
                break t;
              default:
                i = !1;
            }
          }
          i && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return le(t), null;
    case 6:
      if (e && t.stateNode != null) lv(e, t, e.memoizedProps, i);
      else {
        if (typeof i != "string" && t.stateNode === null) throw Error(B(166));
        if (n = ji(to.current), ji(vn.current), Jo(t)) {
          if (i = t.stateNode, n = t.memoizedProps, i[gn] = t, (o = i.nodeValue !== n) && (e = je, e !== null)) switch (e.tag) {
            case 3:
              Qo(i.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Qo(i.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[gn] = t, t.stateNode = i;
      }
      return le(t), null;
    case 13:
      if (Nt(jt), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Et && ze !== null && t.mode & 1 && !(t.flags & 128)) M_(), js(), t.flags |= 98560, o = !1;
        else if (o = Jo(t), i !== null && i.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(B(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(B(317));
            o[gn] = t;
          } else js(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          le(t), o = !1;
        } else tn !== null && (Qu(tn), tn = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || jt.current & 1 ? Kt === 0 && (Kt = 3) : id())), t.updateQueue !== null && (t.flags |= 4), le(t), null);
    case 4:
      return As(), Zu(e, t), e === null && Xr(t.stateNode.containerInfo), le(t), null;
    case 10:
      return Bh(t.type._context), le(t), null;
    case 17:
      return Me(t.type) && Ya(), le(t), null;
    case 19:
      if (Nt(jt), o = t.memoizedState, o === null) return le(t), null;
      if (i = (t.flags & 128) !== 0, a = o.rendering, a === null) if (i) fr(o, !1);
      else {
        if (Kt !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = tl(e), a !== null) {
            for (t.flags |= 128, fr(o, !1), i = a.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = n, n = t.child; n !== null; ) o = n, e = i, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Ct(jt, jt.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && Ht() > Rs && (t.flags |= 128, i = !0, fr(o, !1), t.lanes = 4194304);
      }
      else {
        if (!i) if (e = tl(a), e !== null) {
          if (t.flags |= 128, i = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), fr(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !Et) return le(t), null;
        } else 2 * Ht() - o.renderingStartTime > Rs && n !== 1073741824 && (t.flags |= 128, i = !0, fr(o, !1), t.lanes = 4194304);
        o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Ht(), t.sibling = null, n = jt.current, Ct(jt, i ? n & 1 | 2 : n & 1), t) : (le(t), null);
    case 22:
    case 23:
      return nd(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? Ne & 1073741824 && (le(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : le(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(B(156, t.tag));
}
function uw(e, t) {
  switch (Ih(t), t.tag) {
    case 1:
      return Me(t.type) && Ya(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return As(), Nt(Pe), Nt(he), Uh(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Zh(t), null;
    case 13:
      if (Nt(jt), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(B(340));
        js();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Nt(jt), null;
    case 4:
      return As(), null;
    case 10:
      return Bh(t.type._context), null;
    case 22:
    case 23:
      return nd(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var na = !1, ce = !1, hw = typeof WeakSet == "function" ? WeakSet : Set, Y = null;
function xs(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (i) {
    Rt(e, t, i);
  }
  else n.current = null;
}
function Uu(e, t, n) {
  try {
    n();
  } catch (i) {
    Rt(e, t, i);
  }
}
var Cp = !1;
function dw(e, t) {
  if (Lu = Va, e = f_(), Oh(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else t: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var i = n.getSelection && n.getSelection();
      if (i && i.rangeCount !== 0) {
        n = i.anchorNode;
        var r = i.anchorOffset, o = i.focusNode;
        i = i.focusOffset;
        try {
          n.nodeType, o.nodeType;
        } catch {
          n = null;
          break t;
        }
        var a = 0, c = -1, u = -1, d = 0, p = 0, g = e, v = null;
        e: for (; ; ) {
          for (var y; g !== n || r !== 0 && g.nodeType !== 3 || (c = a + r), g !== o || i !== 0 && g.nodeType !== 3 || (u = a + i), g.nodeType === 3 && (a += g.nodeValue.length), (y = g.firstChild) !== null; )
            v = g, g = y;
          for (; ; ) {
            if (g === e) break e;
            if (v === n && ++d === r && (c = a), v === o && ++p === i && (u = a), (y = g.nextSibling) !== null) break;
            g = v, v = g.parentNode;
          }
          g = y;
        }
        n = c === -1 || u === -1 ? null : { start: c, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Tu = { focusedElem: e, selectionRange: n }, Va = !1, Y = t; Y !== null; ) if (t = Y, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Y = e;
  else for (; Y !== null; ) {
    t = Y;
    try {
      var S = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (S !== null) {
            var w = S.memoizedProps, M = S.memoizedState, b = t.stateNode, k = b.getSnapshotBeforeUpdate(t.elementType === t.type ? w : Qe(t.type, w), M);
            b.__reactInternalSnapshotBeforeUpdate = k;
          }
          break;
        case 3:
          var P = t.stateNode.containerInfo;
          P.nodeType === 1 ? P.textContent = "" : P.nodeType === 9 && P.documentElement && P.removeChild(P.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(B(163));
      }
    } catch (T) {
      Rt(t, t.return, T);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, Y = e;
      break;
    }
    Y = t.return;
  }
  return S = Cp, Cp = !1, S;
}
function Ar(e, t, n) {
  var i = t.updateQueue;
  if (i = i !== null ? i.lastEffect : null, i !== null) {
    var r = i = i.next;
    do {
      if ((r.tag & e) === e) {
        var o = r.destroy;
        r.destroy = void 0, o !== void 0 && Uu(t, n, o);
      }
      r = r.next;
    } while (r !== i);
  }
}
function Cl(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var i = n.create;
        n.destroy = i();
      }
      n = n.next;
    } while (n !== t);
  }
}
function $u(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function cv(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, cv(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[gn], delete t[Qr], delete t[zu], delete t[q1], delete t[K1])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function uv(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Lp(e) {
  t: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || uv(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue t;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Yu(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = $a));
  else if (i !== 4 && (e = e.child, e !== null)) for (Yu(e, t, n), e = e.sibling; e !== null; ) Yu(e, t, n), e = e.sibling;
}
function qu(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (i !== 4 && (e = e.child, e !== null)) for (qu(e, t, n), e = e.sibling; e !== null; ) qu(e, t, n), e = e.sibling;
}
var se = null, Je = !1;
function Zn(e, t, n) {
  for (n = n.child; n !== null; ) hv(e, t, n), n = n.sibling;
}
function hv(e, t, n) {
  if (_n && typeof _n.onCommitFiberUnmount == "function") try {
    _n.onCommitFiberUnmount(yl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ce || xs(n, t);
    case 6:
      var i = se, r = Je;
      se = null, Zn(e, t, n), se = i, Je = r, se !== null && (Je ? (e = se, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : se.removeChild(n.stateNode));
      break;
    case 18:
      se !== null && (Je ? (e = se, n = n.stateNode, e.nodeType === 8 ? Oc(e.parentNode, n) : e.nodeType === 1 && Oc(e, n), Yr(e)) : Oc(se, n.stateNode));
      break;
    case 4:
      i = se, r = Je, se = n.stateNode.containerInfo, Je = !0, Zn(e, t, n), se = i, Je = r;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ce && (i = n.updateQueue, i !== null && (i = i.lastEffect, i !== null))) {
        r = i = i.next;
        do {
          var o = r, a = o.destroy;
          o = o.tag, a !== void 0 && (o & 2 || o & 4) && Uu(n, t, a), r = r.next;
        } while (r !== i);
      }
      Zn(e, t, n);
      break;
    case 1:
      if (!ce && (xs(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function")) try {
        i.props = n.memoizedProps, i.state = n.memoizedState, i.componentWillUnmount();
      } catch (c) {
        Rt(n, t, c);
      }
      Zn(e, t, n);
      break;
    case 21:
      Zn(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ce = (i = ce) || n.memoizedState !== null, Zn(e, t, n), ce = i) : Zn(e, t, n);
      break;
    default:
      Zn(e, t, n);
  }
}
function Tp(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new hw()), t.forEach(function(i) {
      var r = ww.bind(null, e, i);
      n.has(i) || (n.add(i), i.then(r, r));
    });
  }
}
function Ge(e, t) {
  var n = t.deletions;
  if (n !== null) for (var i = 0; i < n.length; i++) {
    var r = n[i];
    try {
      var o = e, a = t, c = a;
      t: for (; c !== null; ) {
        switch (c.tag) {
          case 5:
            se = c.stateNode, Je = !1;
            break t;
          case 3:
            se = c.stateNode.containerInfo, Je = !0;
            break t;
          case 4:
            se = c.stateNode.containerInfo, Je = !0;
            break t;
        }
        c = c.return;
      }
      if (se === null) throw Error(B(160));
      hv(o, a, r), se = null, Je = !1;
      var u = r.alternate;
      u !== null && (u.return = null), r.return = null;
    } catch (d) {
      Rt(r, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) dv(t, e), t = t.sibling;
}
function dv(e, t) {
  var n = e.alternate, i = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Ge(t, e), un(e), i & 4) {
        try {
          Ar(3, e, e.return), Cl(3, e);
        } catch (w) {
          Rt(e, e.return, w);
        }
        try {
          Ar(5, e, e.return);
        } catch (w) {
          Rt(e, e.return, w);
        }
      }
      break;
    case 1:
      Ge(t, e), un(e), i & 512 && n !== null && xs(n, n.return);
      break;
    case 5:
      if (Ge(t, e), un(e), i & 512 && n !== null && xs(n, n.return), e.flags & 32) {
        var r = e.stateNode;
        try {
          Vr(r, "");
        } catch (w) {
          Rt(e, e.return, w);
        }
      }
      if (i & 4 && (r = e.stateNode, r != null)) {
        var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, c = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          c === "input" && o.type === "radio" && o.name != null && Og(r, o), vu(c, a);
          var d = vu(c, o);
          for (a = 0; a < u.length; a += 2) {
            var p = u[a], g = u[a + 1];
            p === "style" ? Fg(r, g) : p === "dangerouslySetInnerHTML" ? Rg(r, g) : p === "children" ? Vr(r, g) : wh(r, p, g, d);
          }
          switch (c) {
            case "input":
              fu(r, o);
              break;
            case "textarea":
              Ag(r, o);
              break;
            case "select":
              var v = r._wrapperState.wasMultiple;
              r._wrapperState.wasMultiple = !!o.multiple;
              var y = o.value;
              y != null ? bs(r, !!o.multiple, y, !1) : v !== !!o.multiple && (o.defaultValue != null ? bs(
                r,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : bs(r, !!o.multiple, o.multiple ? [] : "", !1));
          }
          r[Qr] = o;
        } catch (w) {
          Rt(e, e.return, w);
        }
      }
      break;
    case 6:
      if (Ge(t, e), un(e), i & 4) {
        if (e.stateNode === null) throw Error(B(162));
        r = e.stateNode, o = e.memoizedProps;
        try {
          r.nodeValue = o;
        } catch (w) {
          Rt(e, e.return, w);
        }
      }
      break;
    case 3:
      if (Ge(t, e), un(e), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Yr(t.containerInfo);
      } catch (w) {
        Rt(e, e.return, w);
      }
      break;
    case 4:
      Ge(t, e), un(e);
      break;
    case 13:
      Ge(t, e), un(e), r = e.child, r.flags & 8192 && (o = r.memoizedState !== null, r.stateNode.isHidden = o, !o || r.alternate !== null && r.alternate.memoizedState !== null || (td = Ht())), i & 4 && Tp(e);
      break;
    case 22:
      if (p = n !== null && n.memoizedState !== null, e.mode & 1 ? (ce = (d = ce) || p, Ge(t, e), ce = d) : Ge(t, e), un(e), i & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !p && e.mode & 1) for (Y = e, p = e.child; p !== null; ) {
          for (g = Y = p; Y !== null; ) {
            switch (v = Y, y = v.child, v.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Ar(4, v, v.return);
                break;
              case 1:
                xs(v, v.return);
                var S = v.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  i = v, n = v.return;
                  try {
                    t = i, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
                  } catch (w) {
                    Rt(i, n, w);
                  }
                }
                break;
              case 5:
                xs(v, v.return);
                break;
              case 22:
                if (v.memoizedState !== null) {
                  Ep(g);
                  continue;
                }
            }
            y !== null ? (y.return = v, Y = y) : Ep(g);
          }
          p = p.sibling;
        }
        t: for (p = null, g = e; ; ) {
          if (g.tag === 5) {
            if (p === null) {
              p = g;
              try {
                r = g.stateNode, d ? (o = r.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (c = g.stateNode, u = g.memoizedProps.style, a = u != null && u.hasOwnProperty("display") ? u.display : null, c.style.display = Dg("display", a));
              } catch (w) {
                Rt(e, e.return, w);
              }
            }
          } else if (g.tag === 6) {
            if (p === null) try {
              g.stateNode.nodeValue = d ? "" : g.memoizedProps;
            } catch (w) {
              Rt(e, e.return, w);
            }
          } else if ((g.tag !== 22 && g.tag !== 23 || g.memoizedState === null || g === e) && g.child !== null) {
            g.child.return = g, g = g.child;
            continue;
          }
          if (g === e) break t;
          for (; g.sibling === null; ) {
            if (g.return === null || g.return === e) break t;
            p === g && (p = null), g = g.return;
          }
          p === g && (p = null), g.sibling.return = g.return, g = g.sibling;
        }
      }
      break;
    case 19:
      Ge(t, e), un(e), i & 4 && Tp(e);
      break;
    case 21:
      break;
    default:
      Ge(
        t,
        e
      ), un(e);
  }
}
function un(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      t: {
        for (var n = e.return; n !== null; ) {
          if (uv(n)) {
            var i = n;
            break t;
          }
          n = n.return;
        }
        throw Error(B(160));
      }
      switch (i.tag) {
        case 5:
          var r = i.stateNode;
          i.flags & 32 && (Vr(r, ""), i.flags &= -33);
          var o = Lp(e);
          qu(e, o, r);
          break;
        case 3:
        case 4:
          var a = i.stateNode.containerInfo, c = Lp(e);
          Yu(e, c, a);
          break;
        default:
          throw Error(B(161));
      }
    } catch (u) {
      Rt(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function fw(e, t, n) {
  Y = e, fv(e);
}
function fv(e, t, n) {
  for (var i = (e.mode & 1) !== 0; Y !== null; ) {
    var r = Y, o = r.child;
    if (r.tag === 22 && i) {
      var a = r.memoizedState !== null || na;
      if (!a) {
        var c = r.alternate, u = c !== null && c.memoizedState !== null || ce;
        c = na;
        var d = ce;
        if (na = a, (ce = u) && !d) for (Y = r; Y !== null; ) a = Y, u = a.child, a.tag === 22 && a.memoizedState !== null ? zp(r) : u !== null ? (u.return = a, Y = u) : zp(r);
        for (; o !== null; ) Y = o, fv(o), o = o.sibling;
        Y = r, na = c, ce = d;
      }
      Np(e);
    } else r.subtreeFlags & 8772 && o !== null ? (o.return = r, Y = o) : Np(e);
  }
}
function Np(e) {
  for (; Y !== null; ) {
    var t = Y;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ce || Cl(5, t);
            break;
          case 1:
            var i = t.stateNode;
            if (t.flags & 4 && !ce) if (n === null) i.componentDidMount();
            else {
              var r = t.elementType === t.type ? n.memoizedProps : Qe(t.type, n.memoizedProps);
              i.componentDidUpdate(r, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && pp(t, o, i);
            break;
          case 3:
            var a = t.updateQueue;
            if (a !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              pp(t, a, n);
            }
            break;
          case 5:
            var c = t.stateNode;
            if (n === null && t.flags & 4) {
              n = c;
              var u = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  u.autoFocus && n.focus();
                  break;
                case "img":
                  u.src && (n.src = u.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var d = t.alternate;
              if (d !== null) {
                var p = d.memoizedState;
                if (p !== null) {
                  var g = p.dehydrated;
                  g !== null && Yr(g);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(B(163));
        }
        ce || t.flags & 512 && $u(t);
      } catch (v) {
        Rt(t, t.return, v);
      }
    }
    if (t === e) {
      Y = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, Y = n;
      break;
    }
    Y = t.return;
  }
}
function Ep(e) {
  for (; Y !== null; ) {
    var t = Y;
    if (t === e) {
      Y = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, Y = n;
      break;
    }
    Y = t.return;
  }
}
function zp(e) {
  for (; Y !== null; ) {
    var t = Y;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Cl(4, t);
          } catch (u) {
            Rt(t, n, u);
          }
          break;
        case 1:
          var i = t.stateNode;
          if (typeof i.componentDidMount == "function") {
            var r = t.return;
            try {
              i.componentDidMount();
            } catch (u) {
              Rt(t, r, u);
            }
          }
          var o = t.return;
          try {
            $u(t);
          } catch (u) {
            Rt(t, o, u);
          }
          break;
        case 5:
          var a = t.return;
          try {
            $u(t);
          } catch (u) {
            Rt(t, a, u);
          }
      }
    } catch (u) {
      Rt(t, t.return, u);
    }
    if (t === e) {
      Y = null;
      break;
    }
    var c = t.sibling;
    if (c !== null) {
      c.return = t.return, Y = c;
      break;
    }
    Y = t.return;
  }
}
var pw = Math.ceil, il = Fn.ReactCurrentDispatcher, Qh = Fn.ReactCurrentOwner, $e = Fn.ReactCurrentBatchConfig, _t = 0, ee = null, $t = null, re = 0, Ne = 0, ws = gi(0), Kt = 0, so = null, Wi = 0, Ll = 0, Jh = 0, Ir = null, we = null, td = 0, Rs = 1 / 0, Cn = null, sl = !1, Ku = null, li = null, ia = !1, Gn = null, rl = 0, Rr = 0, Xu = null, Ta = -1, Na = 0;
function ge() {
  return _t & 6 ? Ht() : Ta !== -1 ? Ta : Ta = Ht();
}
function ci(e) {
  return e.mode & 1 ? _t & 2 && re !== 0 ? re & -re : G1.transition !== null ? (Na === 0 && (Na = Gg()), Na) : (e = kt, e !== 0 || (e = window.event, e = e === void 0 ? 16 : s_(e.type)), e) : 1;
}
function nn(e, t, n, i) {
  if (50 < Rr) throw Rr = 0, Xu = null, Error(B(185));
  po(e, n, i), (!(_t & 2) || e !== ee) && (e === ee && (!(_t & 2) && (Ll |= n), Kt === 4 && Kn(e, re)), Ce(e, i), n === 1 && _t === 0 && !(t.mode & 1) && (Rs = Ht() + 500, Sl && _i()));
}
function Ce(e, t) {
  var n = e.callbackNode;
  Gx(e, t);
  var i = Wa(e, e === ee ? re : 0);
  if (i === 0) n !== null && Hf(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = i & -i, e.callbackPriority !== t) {
    if (n != null && Hf(n), t === 1) e.tag === 0 ? X1(jp.bind(null, e)) : k_(jp.bind(null, e)), $1(function() {
      !(_t & 6) && _i();
    }), n = null;
    else {
      switch (Qg(i)) {
        case 1:
          n = Mh;
          break;
        case 4:
          n = Kg;
          break;
        case 16:
          n = Ha;
          break;
        case 536870912:
          n = Xg;
          break;
        default:
          n = Ha;
      }
      n = wv(n, pv.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function pv(e, t) {
  if (Ta = -1, Na = 0, _t & 6) throw Error(B(327));
  var n = e.callbackNode;
  if (Cs() && e.callbackNode !== n) return null;
  var i = Wa(e, e === ee ? re : 0);
  if (i === 0) return null;
  if (i & 30 || i & e.expiredLanes || t) t = ol(e, i);
  else {
    t = i;
    var r = _t;
    _t |= 2;
    var o = gv();
    (ee !== e || re !== t) && (Cn = null, Rs = Ht() + 500, Ai(e, t));
    do
      try {
        _w();
        break;
      } catch (c) {
        mv(e, c);
      }
    while (!0);
    Fh(), il.current = o, _t = r, $t !== null ? t = 0 : (ee = null, re = 0, t = Kt);
  }
  if (t !== 0) {
    if (t === 2 && (r = ku(e), r !== 0 && (i = r, t = Gu(e, r))), t === 1) throw n = so, Ai(e, 0), Kn(e, i), Ce(e, Ht()), n;
    if (t === 6) Kn(e, i);
    else {
      if (r = e.current.alternate, !(i & 30) && !mw(r) && (t = ol(e, i), t === 2 && (o = ku(e), o !== 0 && (i = o, t = Gu(e, o))), t === 1)) throw n = so, Ai(e, 0), Kn(e, i), Ce(e, Ht()), n;
      switch (e.finishedWork = r, e.finishedLanes = i, t) {
        case 0:
        case 1:
          throw Error(B(345));
        case 2:
          Li(e, we, Cn);
          break;
        case 3:
          if (Kn(e, i), (i & 130023424) === i && (t = td + 500 - Ht(), 10 < t)) {
            if (Wa(e, 0) !== 0) break;
            if (r = e.suspendedLanes, (r & i) !== i) {
              ge(), e.pingedLanes |= e.suspendedLanes & r;
              break;
            }
            e.timeoutHandle = Eu(Li.bind(null, e, we, Cn), t);
            break;
          }
          Li(e, we, Cn);
          break;
        case 4:
          if (Kn(e, i), (i & 4194240) === i) break;
          for (t = e.eventTimes, r = -1; 0 < i; ) {
            var a = 31 - en(i);
            o = 1 << a, a = t[a], a > r && (r = a), i &= ~o;
          }
          if (i = r, i = Ht() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * pw(i / 1960)) - i, 10 < i) {
            e.timeoutHandle = Eu(Li.bind(null, e, we, Cn), i);
            break;
          }
          Li(e, we, Cn);
          break;
        case 5:
          Li(e, we, Cn);
          break;
        default:
          throw Error(B(329));
      }
    }
  }
  return Ce(e, Ht()), e.callbackNode === n ? pv.bind(null, e) : null;
}
function Gu(e, t) {
  var n = Ir;
  return e.current.memoizedState.isDehydrated && (Ai(e, t).flags |= 256), e = ol(e, t), e !== 2 && (t = we, we = n, t !== null && Qu(t)), e;
}
function Qu(e) {
  we === null ? we = e : we.push.apply(we, e);
}
function mw(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var i = 0; i < n.length; i++) {
        var r = n[i], o = r.getSnapshot;
        r = r.value;
        try {
          if (!sn(o(), r)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function Kn(e, t) {
  for (t &= ~Jh, t &= ~Ll, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - en(t), i = 1 << n;
    e[n] = -1, t &= ~i;
  }
}
function jp(e) {
  if (_t & 6) throw Error(B(327));
  Cs();
  var t = Wa(e, 0);
  if (!(t & 1)) return Ce(e, Ht()), null;
  var n = ol(e, t);
  if (e.tag !== 0 && n === 2) {
    var i = ku(e);
    i !== 0 && (t = i, n = Gu(e, i));
  }
  if (n === 1) throw n = so, Ai(e, 0), Kn(e, t), Ce(e, Ht()), n;
  if (n === 6) throw Error(B(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Li(e, we, Cn), Ce(e, Ht()), null;
}
function ed(e, t) {
  var n = _t;
  _t |= 1;
  try {
    return e(t);
  } finally {
    _t = n, _t === 0 && (Rs = Ht() + 500, Sl && _i());
  }
}
function Vi(e) {
  Gn !== null && Gn.tag === 0 && !(_t & 6) && Cs();
  var t = _t;
  _t |= 1;
  var n = $e.transition, i = kt;
  try {
    if ($e.transition = null, kt = 1, e) return e();
  } finally {
    kt = i, $e.transition = n, _t = t, !(_t & 6) && _i();
  }
}
function nd() {
  Ne = ws.current, Nt(ws);
}
function Ai(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, U1(n)), $t !== null) for (n = $t.return; n !== null; ) {
    var i = n;
    switch (Ih(i), i.tag) {
      case 1:
        i = i.type.childContextTypes, i != null && Ya();
        break;
      case 3:
        As(), Nt(Pe), Nt(he), Uh();
        break;
      case 5:
        Zh(i);
        break;
      case 4:
        As();
        break;
      case 13:
        Nt(jt);
        break;
      case 19:
        Nt(jt);
        break;
      case 10:
        Bh(i.type._context);
        break;
      case 22:
      case 23:
        nd();
    }
    n = n.return;
  }
  if (ee = e, $t = e = ui(e.current, null), re = Ne = t, Kt = 0, so = null, Jh = Ll = Wi = 0, we = Ir = null, zi !== null) {
    for (t = 0; t < zi.length; t++) if (n = zi[t], i = n.interleaved, i !== null) {
      n.interleaved = null;
      var r = i.next, o = n.pending;
      if (o !== null) {
        var a = o.next;
        o.next = r, i.next = a;
      }
      n.pending = i;
    }
    zi = null;
  }
  return e;
}
function mv(e, t) {
  do {
    var n = $t;
    try {
      if (Fh(), Ma.current = nl, el) {
        for (var i = At.memoizedState; i !== null; ) {
          var r = i.queue;
          r !== null && (r.pending = null), i = i.next;
        }
        el = !1;
      }
      if (Hi = 0, te = Yt = At = null, Or = !1, eo = 0, Qh.current = null, n === null || n.return === null) {
        Kt = 1, so = t, $t = null;
        break;
      }
      t: {
        var o = e, a = n.return, c = n, u = t;
        if (t = re, c.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var d = u, p = c, g = p.tag;
          if (!(p.mode & 1) && (g === 0 || g === 11 || g === 15)) {
            var v = p.alternate;
            v ? (p.updateQueue = v.updateQueue, p.memoizedState = v.memoizedState, p.lanes = v.lanes) : (p.updateQueue = null, p.memoizedState = null);
          }
          var y = xp(a);
          if (y !== null) {
            y.flags &= -257, wp(y, a, c, o, t), y.mode & 1 && yp(o, d, t), t = y, u = d;
            var S = t.updateQueue;
            if (S === null) {
              var w = /* @__PURE__ */ new Set();
              w.add(u), t.updateQueue = w;
            } else S.add(u);
            break t;
          } else {
            if (!(t & 1)) {
              yp(o, d, t), id();
              break t;
            }
            u = Error(B(426));
          }
        } else if (Et && c.mode & 1) {
          var M = xp(a);
          if (M !== null) {
            !(M.flags & 65536) && (M.flags |= 256), wp(M, a, c, o, t), Rh(Is(u, c));
            break t;
          }
        }
        o = u = Is(u, c), Kt !== 4 && (Kt = 2), Ir === null ? Ir = [o] : Ir.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var b = Q_(o, u, t);
              fp(o, b);
              break t;
            case 1:
              c = u;
              var k = o.type, P = o.stateNode;
              if (!(o.flags & 128) && (typeof k.getDerivedStateFromError == "function" || P !== null && typeof P.componentDidCatch == "function" && (li === null || !li.has(P)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var T = J_(o, c, t);
                fp(o, T);
                break t;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      vv(n);
    } catch (N) {
      t = N, $t === n && n !== null && ($t = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function gv() {
  var e = il.current;
  return il.current = nl, e === null ? nl : e;
}
function id() {
  (Kt === 0 || Kt === 3 || Kt === 2) && (Kt = 4), ee === null || !(Wi & 268435455) && !(Ll & 268435455) || Kn(ee, re);
}
function ol(e, t) {
  var n = _t;
  _t |= 2;
  var i = gv();
  (ee !== e || re !== t) && (Cn = null, Ai(e, t));
  do
    try {
      gw();
      break;
    } catch (r) {
      mv(e, r);
    }
  while (!0);
  if (Fh(), _t = n, il.current = i, $t !== null) throw Error(B(261));
  return ee = null, re = 0, Kt;
}
function gw() {
  for (; $t !== null; ) _v($t);
}
function _w() {
  for (; $t !== null && !Wx(); ) _v($t);
}
function _v(e) {
  var t = xv(e.alternate, e, Ne);
  e.memoizedProps = e.pendingProps, t === null ? vv(e) : $t = t, Qh.current = null;
}
function vv(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = uw(n, t), n !== null) {
        n.flags &= 32767, $t = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        Kt = 6, $t = null;
        return;
      }
    } else if (n = cw(n, t, Ne), n !== null) {
      $t = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      $t = t;
      return;
    }
    $t = t = e;
  } while (t !== null);
  Kt === 0 && (Kt = 5);
}
function Li(e, t, n) {
  var i = kt, r = $e.transition;
  try {
    $e.transition = null, kt = 1, vw(e, t, n, i);
  } finally {
    $e.transition = r, kt = i;
  }
  return null;
}
function vw(e, t, n, i) {
  do
    Cs();
  while (Gn !== null);
  if (_t & 6) throw Error(B(327));
  n = e.finishedWork;
  var r = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(B(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Qx(e, o), e === ee && ($t = ee = null, re = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || ia || (ia = !0, wv(Ha, function() {
    return Cs(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = $e.transition, $e.transition = null;
    var a = kt;
    kt = 1;
    var c = _t;
    _t |= 4, Qh.current = null, dw(e, n), dv(n, e), D1(Tu), Va = !!Lu, Tu = Lu = null, e.current = n, fw(n), Vx(), _t = c, kt = a, $e.transition = o;
  } else e.current = n;
  if (ia && (ia = !1, Gn = e, rl = r), o = e.pendingLanes, o === 0 && (li = null), $x(n.stateNode), Ce(e, Ht()), t !== null) for (i = e.onRecoverableError, n = 0; n < t.length; n++) r = t[n], i(r.value, { componentStack: r.stack, digest: r.digest });
  if (sl) throw sl = !1, e = Ku, Ku = null, e;
  return rl & 1 && e.tag !== 0 && Cs(), o = e.pendingLanes, o & 1 ? e === Xu ? Rr++ : (Rr = 0, Xu = e) : Rr = 0, _i(), null;
}
function Cs() {
  if (Gn !== null) {
    var e = Qg(rl), t = $e.transition, n = kt;
    try {
      if ($e.transition = null, kt = 16 > e ? 16 : e, Gn === null) var i = !1;
      else {
        if (e = Gn, Gn = null, rl = 0, _t & 6) throw Error(B(331));
        var r = _t;
        for (_t |= 4, Y = e.current; Y !== null; ) {
          var o = Y, a = o.child;
          if (Y.flags & 16) {
            var c = o.deletions;
            if (c !== null) {
              for (var u = 0; u < c.length; u++) {
                var d = c[u];
                for (Y = d; Y !== null; ) {
                  var p = Y;
                  switch (p.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ar(8, p, o);
                  }
                  var g = p.child;
                  if (g !== null) g.return = p, Y = g;
                  else for (; Y !== null; ) {
                    p = Y;
                    var v = p.sibling, y = p.return;
                    if (cv(p), p === d) {
                      Y = null;
                      break;
                    }
                    if (v !== null) {
                      v.return = y, Y = v;
                      break;
                    }
                    Y = y;
                  }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var w = S.child;
                if (w !== null) {
                  S.child = null;
                  do {
                    var M = w.sibling;
                    w.sibling = null, w = M;
                  } while (w !== null);
                }
              }
              Y = o;
            }
          }
          if (o.subtreeFlags & 2064 && a !== null) a.return = o, Y = a;
          else t: for (; Y !== null; ) {
            if (o = Y, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Ar(9, o, o.return);
            }
            var b = o.sibling;
            if (b !== null) {
              b.return = o.return, Y = b;
              break t;
            }
            Y = o.return;
          }
        }
        var k = e.current;
        for (Y = k; Y !== null; ) {
          a = Y;
          var P = a.child;
          if (a.subtreeFlags & 2064 && P !== null) P.return = a, Y = P;
          else t: for (a = k; Y !== null; ) {
            if (c = Y, c.flags & 2048) try {
              switch (c.tag) {
                case 0:
                case 11:
                case 15:
                  Cl(9, c);
              }
            } catch (N) {
              Rt(c, c.return, N);
            }
            if (c === a) {
              Y = null;
              break t;
            }
            var T = c.sibling;
            if (T !== null) {
              T.return = c.return, Y = T;
              break t;
            }
            Y = c.return;
          }
        }
        if (_t = r, _i(), _n && typeof _n.onPostCommitFiberRoot == "function") try {
          _n.onPostCommitFiberRoot(yl, e);
        } catch {
        }
        i = !0;
      }
      return i;
    } finally {
      kt = n, $e.transition = t;
    }
  }
  return !1;
}
function Op(e, t, n) {
  t = Is(n, t), t = Q_(e, t, 1), e = ai(e, t, 1), t = ge(), e !== null && (po(e, 1, t), Ce(e, t));
}
function Rt(e, t, n) {
  if (e.tag === 3) Op(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Op(t, e, n);
      break;
    } else if (t.tag === 1) {
      var i = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (li === null || !li.has(i))) {
        e = Is(n, e), e = J_(t, e, 1), t = ai(t, e, 1), e = ge(), t !== null && (po(t, 1, e), Ce(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function yw(e, t, n) {
  var i = e.pingCache;
  i !== null && i.delete(t), t = ge(), e.pingedLanes |= e.suspendedLanes & n, ee === e && (re & n) === n && (Kt === 4 || Kt === 3 && (re & 130023424) === re && 500 > Ht() - td ? Ai(e, 0) : Jh |= n), Ce(e, t);
}
function yv(e, t) {
  t === 0 && (e.mode & 1 ? (t = Yo, Yo <<= 1, !(Yo & 130023424) && (Yo = 4194304)) : t = 1);
  var n = ge();
  e = Rn(e, t), e !== null && (po(e, t, n), Ce(e, n));
}
function xw(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), yv(e, n);
}
function ww(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var i = e.stateNode, r = e.memoizedState;
      r !== null && (n = r.retryLane);
      break;
    case 19:
      i = e.stateNode;
      break;
    default:
      throw Error(B(314));
  }
  i !== null && i.delete(t), yv(e, n);
}
var xv;
xv = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Pe.current) ke = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return ke = !1, lw(e, t, n);
    ke = !!(e.flags & 131072);
  }
  else ke = !1, Et && t.flags & 1048576 && S_(t, Xa, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var i = t.type;
      La(e, t), e = t.pendingProps;
      var r = zs(t, he.current);
      Ms(t, n), r = Yh(null, t, i, e, r, n);
      var o = qh();
      return t.flags |= 1, typeof r == "object" && r !== null && typeof r.render == "function" && r.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Me(i) ? (o = !0, qa(t)) : o = !1, t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, Wh(t), r.updater = Ml, t.stateNode = r, r._reactInternals = t, Du(t, i, e, n), t = Hu(null, t, i, !0, o, n)) : (t.tag = 0, Et && o && Ah(t), me(null, t, r, n), t = t.child), t;
    case 16:
      i = t.elementType;
      t: {
        switch (La(e, t), e = t.pendingProps, r = i._init, i = r(i._payload), t.type = i, r = t.tag = kw(i), e = Qe(i, e), r) {
          case 0:
            t = Bu(null, t, i, e, n);
            break t;
          case 1:
            t = Sp(null, t, i, e, n);
            break t;
          case 11:
            t = bp(null, t, i, e, n);
            break t;
          case 14:
            t = kp(null, t, i, Qe(i.type, e), n);
            break t;
        }
        throw Error(B(
          306,
          i,
          ""
        ));
      }
      return t;
    case 0:
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Qe(i, r), Bu(e, t, i, r, n);
    case 1:
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Qe(i, r), Sp(e, t, i, r, n);
    case 3:
      t: {
        if (iv(t), e === null) throw Error(B(387));
        i = t.pendingProps, o = t.memoizedState, r = o.element, N_(e, t), Ja(t, i, null, n);
        var a = t.memoizedState;
        if (i = a.element, o.isDehydrated) if (o = { element: i, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          r = Is(Error(B(423)), t), t = Pp(e, t, i, n, r);
          break t;
        } else if (i !== r) {
          r = Is(Error(B(424)), t), t = Pp(e, t, i, n, r);
          break t;
        } else for (ze = oi(t.stateNode.containerInfo.firstChild), je = t, Et = !0, tn = null, n = L_(t, null, i, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (js(), i === r) {
            t = Dn(e, t, n);
            break t;
          }
          me(e, t, i, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return E_(t), e === null && Au(t), i = t.type, r = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = r.children, Nu(i, r) ? a = null : o !== null && Nu(i, o) && (t.flags |= 32), nv(e, t), me(e, t, a, n), t.child;
    case 6:
      return e === null && Au(t), null;
    case 13:
      return sv(e, t, n);
    case 4:
      return Vh(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = Os(t, null, i, n) : me(e, t, i, n), t.child;
    case 11:
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Qe(i, r), bp(e, t, i, r, n);
    case 7:
      return me(e, t, t.pendingProps, n), t.child;
    case 8:
      return me(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return me(e, t, t.pendingProps.children, n), t.child;
    case 10:
      t: {
        if (i = t.type._context, r = t.pendingProps, o = t.memoizedProps, a = r.value, Ct(Ga, i._currentValue), i._currentValue = a, o !== null) if (sn(o.value, a)) {
          if (o.children === r.children && !Pe.current) {
            t = Dn(e, t, n);
            break t;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var c = o.dependencies;
          if (c !== null) {
            a = o.child;
            for (var u = c.firstContext; u !== null; ) {
              if (u.context === i) {
                if (o.tag === 1) {
                  u = On(-1, n & -n), u.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var p = d.pending;
                    p === null ? u.next = u : (u.next = p.next, p.next = u), d.pending = u;
                  }
                }
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Iu(
                  o.return,
                  n,
                  t
                ), c.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (o.tag === 10) a = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (a = o.return, a === null) throw Error(B(341));
            a.lanes |= n, c = a.alternate, c !== null && (c.lanes |= n), Iu(a, n, t), a = o.sibling;
          } else a = o.child;
          if (a !== null) a.return = o;
          else for (a = o; a !== null; ) {
            if (a === t) {
              a = null;
              break;
            }
            if (o = a.sibling, o !== null) {
              o.return = a.return, a = o;
              break;
            }
            a = a.return;
          }
          o = a;
        }
        me(e, t, r.children, n), t = t.child;
      }
      return t;
    case 9:
      return r = t.type, i = t.pendingProps.children, Ms(t, n), r = Ye(r), i = i(r), t.flags |= 1, me(e, t, i, n), t.child;
    case 14:
      return i = t.type, r = Qe(i, t.pendingProps), r = Qe(i.type, r), kp(e, t, i, r, n);
    case 15:
      return tv(e, t, t.type, t.pendingProps, n);
    case 17:
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Qe(i, r), La(e, t), t.tag = 1, Me(i) ? (e = !0, qa(t)) : e = !1, Ms(t, n), G_(t, i, r), Du(t, i, r, n), Hu(null, t, i, !0, e, n);
    case 19:
      return rv(e, t, n);
    case 22:
      return ev(e, t, n);
  }
  throw Error(B(156, t.tag));
};
function wv(e, t) {
  return qg(e, t);
}
function bw(e, t, n, i) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ue(e, t, n, i) {
  return new bw(e, t, n, i);
}
function sd(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function kw(e) {
  if (typeof e == "function") return sd(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === kh) return 11;
    if (e === Sh) return 14;
  }
  return 2;
}
function ui(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ue(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Ea(e, t, n, i, r, o) {
  var a = 2;
  if (i = e, typeof e == "function") sd(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else t: switch (e) {
    case hs:
      return Ii(n.children, r, o, t);
    case bh:
      a = 8, r |= 8;
      break;
    case lu:
      return e = Ue(12, n, t, r | 2), e.elementType = lu, e.lanes = o, e;
    case cu:
      return e = Ue(13, n, t, r), e.elementType = cu, e.lanes = o, e;
    case uu:
      return e = Ue(19, n, t, r), e.elementType = uu, e.lanes = o, e;
    case Eg:
      return Tl(n, r, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Tg:
          a = 10;
          break t;
        case Ng:
          a = 9;
          break t;
        case kh:
          a = 11;
          break t;
        case Sh:
          a = 14;
          break t;
        case $n:
          a = 16, i = null;
          break t;
      }
      throw Error(B(130, e == null ? e : typeof e, ""));
  }
  return t = Ue(a, n, t, r), t.elementType = e, t.type = i, t.lanes = o, t;
}
function Ii(e, t, n, i) {
  return e = Ue(7, e, i, t), e.lanes = n, e;
}
function Tl(e, t, n, i) {
  return e = Ue(22, e, i, t), e.elementType = Eg, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Wc(e, t, n) {
  return e = Ue(6, e, null, t), e.lanes = n, e;
}
function Vc(e, t, n) {
  return t = Ue(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Sw(e, t, n, i, r) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = kc(0), this.expirationTimes = kc(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = kc(0), this.identifierPrefix = i, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null;
}
function rd(e, t, n, i, r, o, a, c, u) {
  return e = new Sw(e, t, n, c, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Ue(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: i, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Wh(o), e;
}
function Pw(e, t, n) {
  var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: us, key: i == null ? null : "" + i, children: e, containerInfo: t, implementation: n };
}
function bv(e) {
  if (!e) return fi;
  e = e._reactInternals;
  t: {
    if (Yi(e) !== e || e.tag !== 1) throw Error(B(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break t;
        case 1:
          if (Me(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break t;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(B(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Me(n)) return b_(e, n, t);
  }
  return t;
}
function kv(e, t, n, i, r, o, a, c, u) {
  return e = rd(n, i, !0, e, r, o, a, c, u), e.context = bv(null), n = e.current, i = ge(), r = ci(n), o = On(i, r), o.callback = t ?? null, ai(n, o, r), e.current.lanes = r, po(e, r, i), Ce(e, i), e;
}
function Nl(e, t, n, i) {
  var r = t.current, o = ge(), a = ci(r);
  return n = bv(n), t.context === null ? t.context = n : t.pendingContext = n, t = On(o, a), t.payload = { element: e }, i = i === void 0 ? null : i, i !== null && (t.callback = i), e = ai(r, t, a), e !== null && (nn(e, r, a, o), Pa(e, r, a)), a;
}
function al(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ap(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function od(e, t) {
  Ap(e, t), (e = e.alternate) && Ap(e, t);
}
function Mw() {
  return null;
}
var Sv = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function ad(e) {
  this._internalRoot = e;
}
El.prototype.render = ad.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(B(409));
  Nl(e, t, null, null);
};
El.prototype.unmount = ad.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Vi(function() {
      Nl(null, e, null, null);
    }), t[In] = null;
  }
};
function El(e) {
  this._internalRoot = e;
}
El.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = e_();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < qn.length && t !== 0 && t < qn[n].priority; n++) ;
    qn.splice(n, 0, e), n === 0 && i_(e);
  }
};
function ld(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function zl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Ip() {
}
function Cw(e, t, n, i, r) {
  if (r) {
    if (typeof i == "function") {
      var o = i;
      i = function() {
        var d = al(a);
        o.call(d);
      };
    }
    var a = kv(t, i, e, 0, null, !1, !1, "", Ip);
    return e._reactRootContainer = a, e[In] = a.current, Xr(e.nodeType === 8 ? e.parentNode : e), Vi(), a;
  }
  for (; r = e.lastChild; ) e.removeChild(r);
  if (typeof i == "function") {
    var c = i;
    i = function() {
      var d = al(u);
      c.call(d);
    };
  }
  var u = rd(e, 0, !1, null, null, !1, !1, "", Ip);
  return e._reactRootContainer = u, e[In] = u.current, Xr(e.nodeType === 8 ? e.parentNode : e), Vi(function() {
    Nl(t, u, n, i);
  }), u;
}
function jl(e, t, n, i, r) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof r == "function") {
      var c = r;
      r = function() {
        var u = al(a);
        c.call(u);
      };
    }
    Nl(t, a, e, r);
  } else a = Cw(n, t, e, r, i);
  return al(a);
}
Jg = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = br(t.pendingLanes);
        n !== 0 && (Ch(t, n | 1), Ce(t, Ht()), !(_t & 6) && (Rs = Ht() + 500, _i()));
      }
      break;
    case 13:
      Vi(function() {
        var i = Rn(e, 1);
        if (i !== null) {
          var r = ge();
          nn(i, e, 1, r);
        }
      }), od(e, 1);
  }
};
Lh = function(e) {
  if (e.tag === 13) {
    var t = Rn(e, 134217728);
    if (t !== null) {
      var n = ge();
      nn(t, e, 134217728, n);
    }
    od(e, 134217728);
  }
};
t_ = function(e) {
  if (e.tag === 13) {
    var t = ci(e), n = Rn(e, t);
    if (n !== null) {
      var i = ge();
      nn(n, e, t, i);
    }
    od(e, t);
  }
};
e_ = function() {
  return kt;
};
n_ = function(e, t) {
  var n = kt;
  try {
    return kt = e, t();
  } finally {
    kt = n;
  }
};
xu = function(e, t, n) {
  switch (t) {
    case "input":
      if (fu(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var i = n[t];
          if (i !== e && i.form === e.form) {
            var r = kl(i);
            if (!r) throw Error(B(90));
            jg(i), fu(i, r);
          }
        }
      }
      break;
    case "textarea":
      Ag(e, n);
      break;
    case "select":
      t = n.value, t != null && bs(e, !!n.multiple, t, !1);
  }
};
Wg = ed;
Vg = Vi;
var Lw = { usingClientEntryPoint: !1, Events: [go, ms, kl, Bg, Hg, ed] }, pr = { findFiberByHostInstance: Ei, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Tw = { bundleType: pr.bundleType, version: pr.version, rendererPackageName: pr.rendererPackageName, rendererConfig: pr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Fn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = $g(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: pr.findFiberByHostInstance || Mw, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var sa = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!sa.isDisabled && sa.supportsFiber) try {
    yl = sa.inject(Tw), _n = sa;
  } catch {
  }
}
Ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Lw;
Ae.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!ld(t)) throw Error(B(200));
  return Pw(e, t, null, n);
};
Ae.createRoot = function(e, t) {
  if (!ld(e)) throw Error(B(299));
  var n = !1, i = "", r = Sv;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (r = t.onRecoverableError)), t = rd(e, 1, !1, null, null, n, !1, i, r), e[In] = t.current, Xr(e.nodeType === 8 ? e.parentNode : e), new ad(t);
};
Ae.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(B(188)) : (e = Object.keys(e).join(","), Error(B(268, e)));
  return e = $g(t), e = e === null ? null : e.stateNode, e;
};
Ae.flushSync = function(e) {
  return Vi(e);
};
Ae.hydrate = function(e, t, n) {
  if (!zl(t)) throw Error(B(200));
  return jl(null, e, t, !0, n);
};
Ae.hydrateRoot = function(e, t, n) {
  if (!ld(e)) throw Error(B(405));
  var i = n != null && n.hydratedSources || null, r = !1, o = "", a = Sv;
  if (n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = kv(t, null, e, 1, n ?? null, r, !1, o, a), e[In] = t.current, Xr(e), i) for (e = 0; e < i.length; e++) n = i[e], r = n._getVersion, r = r(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, r] : t.mutableSourceEagerHydrationData.push(
    n,
    r
  );
  return new El(t);
};
Ae.render = function(e, t, n) {
  if (!zl(t)) throw Error(B(200));
  return jl(null, e, t, !1, n);
};
Ae.unmountComponentAtNode = function(e) {
  if (!zl(e)) throw Error(B(40));
  return e._reactRootContainer ? (Vi(function() {
    jl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[In] = null;
    });
  }), !0) : !1;
};
Ae.unstable_batchedUpdates = ed;
Ae.unstable_renderSubtreeIntoContainer = function(e, t, n, i) {
  if (!zl(n)) throw Error(B(200));
  if (e == null || e._reactInternals === void 0) throw Error(B(38));
  return jl(e, t, n, !1, i);
};
Ae.version = "18.3.1-next-f1338f8080-20240426";
function Pv() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Pv);
    } catch (e) {
      console.error(e);
    }
}
Pv(), Pg.exports = Ae;
var Nw = Pg.exports, Mv, Rp = Nw;
Mv = Rp.createRoot, Rp.hydrateRoot;
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function vo(e) {
  return e + 0.5 | 0;
}
const Qn = (e, t, n) => Math.max(Math.min(e, n), t);
function Sr(e) {
  return Qn(vo(e * 2.55), 0, 255);
}
function hi(e) {
  return Qn(vo(e * 255), 0, 255);
}
function Tn(e) {
  return Qn(vo(e / 2.55) / 100, 0, 1);
}
function Dp(e) {
  return Qn(vo(e * 100), 0, 100);
}
const We = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Ju = [..."0123456789ABCDEF"], Ew = (e) => Ju[e & 15], zw = (e) => Ju[(e & 240) >> 4] + Ju[e & 15], ra = (e) => (e & 240) >> 4 === (e & 15), jw = (e) => ra(e.r) && ra(e.g) && ra(e.b) && ra(e.a);
function Ow(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & We[e[1]] * 17,
    g: 255 & We[e[2]] * 17,
    b: 255 & We[e[3]] * 17,
    a: t === 5 ? We[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: We[e[1]] << 4 | We[e[2]],
    g: We[e[3]] << 4 | We[e[4]],
    b: We[e[5]] << 4 | We[e[6]],
    a: t === 9 ? We[e[7]] << 4 | We[e[8]] : 255
  })), n;
}
const Aw = (e, t) => e < 255 ? t(e) : "";
function Iw(e) {
  var t = jw(e) ? Ew : zw;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Aw(e.a, t) : void 0;
}
const Rw = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Cv(e, t, n) {
  const i = t * Math.min(n, 1 - n), r = (o, a = (o + e / 30) % 12) => n - i * Math.max(Math.min(a - 3, 9 - a, 1), -1);
  return [r(0), r(8), r(4)];
}
function Dw(e, t, n) {
  const i = (r, o = (r + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [i(5), i(3), i(1)];
}
function Fw(e, t, n) {
  const i = Cv(e, 1, 0.5);
  let r;
  for (t + n > 1 && (r = 1 / (t + n), t *= r, n *= r), r = 0; r < 3; r++)
    i[r] *= 1 - t - n, i[r] += t;
  return i;
}
function Bw(e, t, n, i, r) {
  return e === r ? (t - n) / i + (t < n ? 6 : 0) : t === r ? (n - e) / i + 2 : (e - t) / i + 4;
}
function cd(e) {
  const n = e.r / 255, i = e.g / 255, r = e.b / 255, o = Math.max(n, i, r), a = Math.min(n, i, r), c = (o + a) / 2;
  let u, d, p;
  return o !== a && (p = o - a, d = c > 0.5 ? p / (2 - o - a) : p / (o + a), u = Bw(n, i, r, p, o), u = u * 60 + 0.5), [u | 0, d || 0, c];
}
function ud(e, t, n, i) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, i)).map(hi);
}
function hd(e, t, n) {
  return ud(Cv, e, t, n);
}
function Hw(e, t, n) {
  return ud(Fw, e, t, n);
}
function Ww(e, t, n) {
  return ud(Dw, e, t, n);
}
function Lv(e) {
  return (e % 360 + 360) % 360;
}
function Vw(e) {
  const t = Rw.exec(e);
  let n = 255, i;
  if (!t)
    return;
  t[5] !== i && (n = t[6] ? Sr(+t[5]) : hi(+t[5]));
  const r = Lv(+t[2]), o = +t[3] / 100, a = +t[4] / 100;
  return t[1] === "hwb" ? i = Hw(r, o, a) : t[1] === "hsv" ? i = Ww(r, o, a) : i = hd(r, o, a), {
    r: i[0],
    g: i[1],
    b: i[2],
    a: n
  };
}
function Zw(e, t) {
  var n = cd(e);
  n[0] = Lv(n[0] + t), n = hd(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Uw(e) {
  if (!e)
    return;
  const t = cd(e), n = t[0], i = Dp(t[1]), r = Dp(t[2]);
  return e.a < 255 ? `hsla(${n}, ${i}%, ${r}%, ${Tn(e.a)})` : `hsl(${n}, ${i}%, ${r}%)`;
}
const Fp = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, Bp = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function $w() {
  const e = {}, t = Object.keys(Bp), n = Object.keys(Fp);
  let i, r, o, a, c;
  for (i = 0; i < t.length; i++) {
    for (a = c = t[i], r = 0; r < n.length; r++)
      o = n[r], c = c.replace(o, Fp[o]);
    o = parseInt(Bp[a], 16), e[c] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let oa;
function Yw(e) {
  oa || (oa = $w(), oa.transparent = [0, 0, 0, 0]);
  const t = oa[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const qw = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Kw(e) {
  const t = qw.exec(e);
  let n = 255, i, r, o;
  if (t) {
    if (t[7] !== i) {
      const a = +t[7];
      n = t[8] ? Sr(a) : Qn(a * 255, 0, 255);
    }
    return i = +t[1], r = +t[3], o = +t[5], i = 255 & (t[2] ? Sr(i) : Qn(i, 0, 255)), r = 255 & (t[4] ? Sr(r) : Qn(r, 0, 255)), o = 255 & (t[6] ? Sr(o) : Qn(o, 0, 255)), {
      r: i,
      g: r,
      b: o,
      a: n
    };
  }
}
function Xw(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Tn(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Zc = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, as = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Gw(e, t, n) {
  const i = as(Tn(e.r)), r = as(Tn(e.g)), o = as(Tn(e.b));
  return {
    r: hi(Zc(i + n * (as(Tn(t.r)) - i))),
    g: hi(Zc(r + n * (as(Tn(t.g)) - r))),
    b: hi(Zc(o + n * (as(Tn(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function aa(e, t, n) {
  if (e) {
    let i = cd(e);
    i[t] = Math.max(0, Math.min(i[t] + i[t] * n, t === 0 ? 360 : 1)), i = hd(i), e.r = i[0], e.g = i[1], e.b = i[2];
  }
}
function Tv(e, t) {
  return e && Object.assign(t || {}, e);
}
function Hp(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = hi(e[3]))) : (t = Tv(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = hi(t.a)), t;
}
function Qw(e) {
  return e.charAt(0) === "r" ? Kw(e) : Vw(e);
}
class ro {
  constructor(t) {
    if (t instanceof ro)
      return t;
    const n = typeof t;
    let i;
    n === "object" ? i = Hp(t) : n === "string" && (i = Ow(t) || Yw(t) || Qw(t)), this._rgb = i, this._valid = !!i;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Tv(this._rgb);
    return t && (t.a = Tn(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Hp(t);
  }
  rgbString() {
    return this._valid ? Xw(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Iw(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Uw(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const i = this.rgb, r = t.rgb;
      let o;
      const a = n === o ? 0.5 : n, c = 2 * a - 1, u = i.a - r.a, d = ((c * u === -1 ? c : (c + u) / (1 + c * u)) + 1) / 2;
      o = 1 - d, i.r = 255 & d * i.r + o * r.r + 0.5, i.g = 255 & d * i.g + o * r.g + 0.5, i.b = 255 & d * i.b + o * r.b + 0.5, i.a = a * i.a + (1 - a) * r.a, this.rgb = i;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = Gw(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new ro(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = hi(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = vo(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = n, this;
  }
  opaquer(t) {
    const n = this._rgb;
    return n.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return aa(this._rgb, 2, t), this;
  }
  darken(t) {
    return aa(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return aa(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return aa(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Zw(this._rgb, t), this;
  }
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function Sn() {
}
const Jw = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function wt(e) {
  return e == null;
}
function qt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function mt(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function de(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function hn(e, t) {
  return de(e) ? e : t;
}
function ut(e, t) {
  return typeof e > "u" ? t : e;
}
const tb = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, Nv = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Tt(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function bt(e, t, n, i) {
  let r, o, a;
  if (qt(e))
    for (o = e.length, r = 0; r < o; r++)
      t.call(n, e[r], r);
  else if (mt(e))
    for (a = Object.keys(e), o = a.length, r = 0; r < o; r++)
      t.call(n, e[a[r]], a[r]);
}
function ll(e, t) {
  let n, i, r, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, i = e.length; n < i; ++n)
    if (r = e[n], o = t[n], r.datasetIndex !== o.datasetIndex || r.index !== o.index)
      return !1;
  return !0;
}
function cl(e) {
  if (qt(e))
    return e.map(cl);
  if (mt(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), i = n.length;
    let r = 0;
    for (; r < i; ++r)
      t[n[r]] = cl(e[n[r]]);
    return t;
  }
  return e;
}
function Ev(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function eb(e, t, n, i) {
  if (!Ev(e))
    return;
  const r = t[e], o = n[e];
  mt(r) && mt(o) ? oo(r, o, i) : t[e] = cl(o);
}
function oo(e, t, n) {
  const i = qt(t) ? t : [
    t
  ], r = i.length;
  if (!mt(e))
    return e;
  n = n || {};
  const o = n.merger || eb;
  let a;
  for (let c = 0; c < r; ++c) {
    if (a = i[c], !mt(a))
      continue;
    const u = Object.keys(a);
    for (let d = 0, p = u.length; d < p; ++d)
      o(u[d], e, a, n);
  }
  return e;
}
function Dr(e, t) {
  return oo(e, t, {
    merger: nb
  });
}
function nb(e, t, n) {
  if (!Ev(e))
    return;
  const i = t[e], r = n[e];
  mt(i) && mt(r) ? Dr(i, r) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = cl(r));
}
const Wp = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function ib(e) {
  const t = e.split("."), n = [];
  let i = "";
  for (const r of t)
    i += r, i.endsWith("\\") ? i = i.slice(0, -1) + "." : (n.push(i), i = "");
  return n;
}
function sb(e) {
  const t = ib(e);
  return (n) => {
    for (const i of t) {
      if (i === "")
        break;
      n = n && n[i];
    }
    return n;
  };
}
function Zi(e, t) {
  return (Wp[t] || (Wp[t] = sb(t)))(e);
}
function dd(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const ao = (e) => typeof e < "u", pi = (e) => typeof e == "function", Vp = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function rb(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Pt = Math.PI, Ot = 2 * Pt, ob = Ot + Pt, ul = Number.POSITIVE_INFINITY, ab = Pt / 180, Xt = Pt / 2, Si = Pt / 4, Zp = Pt * 2 / 3, zv = Math.log10, yn = Math.sign;
function Fr(e, t, n) {
  return Math.abs(e - t) < n;
}
function Up(e) {
  const t = Math.round(e);
  e = Fr(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(zv(e))), i = e / n;
  return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * n;
}
function lb(e) {
  const t = [], n = Math.sqrt(e);
  let i;
  for (i = 1; i < n; i++)
    e % i === 0 && (t.push(i), t.push(e / i));
  return n === (n | 0) && t.push(n), t.sort((r, o) => r - o).pop(), t;
}
function cb(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function lo(e) {
  return !cb(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function ub(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function hb(e, t, n) {
  let i, r, o;
  for (i = 0, r = e.length; i < r; i++)
    o = e[i][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function zn(e) {
  return e * (Pt / 180);
}
function db(e) {
  return e * (180 / Pt);
}
function $p(e) {
  if (!de(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function jv(e, t) {
  const n = t.x - e.x, i = t.y - e.y, r = Math.sqrt(n * n + i * i);
  let o = Math.atan2(i, n);
  return o < -0.5 * Pt && (o += Ot), {
    angle: o,
    distance: r
  };
}
function th(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function fb(e, t) {
  return (e - t + ob) % Ot - Pt;
}
function Ee(e) {
  return (e % Ot + Ot) % Ot;
}
function co(e, t, n, i) {
  const r = Ee(e), o = Ee(t), a = Ee(n), c = Ee(o - r), u = Ee(a - r), d = Ee(r - o), p = Ee(r - a);
  return r === o || r === a || i && o === a || c > u && d < p;
}
function ue(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function pb(e) {
  return ue(e, -32768, 32767);
}
function jn(e, t, n, i = 1e-6) {
  return e >= Math.min(t, n) - i && e <= Math.max(t, n) + i;
}
function fd(e, t, n) {
  n = n || ((a) => e[a] < t);
  let i = e.length - 1, r = 0, o;
  for (; i - r > 1; )
    o = r + i >> 1, n(o) ? r = o : i = o;
  return {
    lo: r,
    hi: i
  };
}
const Oi = (e, t, n, i) => fd(e, n, i ? (r) => {
  const o = e[r][t];
  return o < n || o === n && e[r + 1][t] === n;
} : (r) => e[r][t] < n), mb = (e, t, n) => fd(e, n, (i) => e[i][t] >= n);
function gb(e, t, n) {
  let i = 0, r = e.length;
  for (; i < r && e[i] < t; )
    i++;
  for (; r > i && e[r - 1] > n; )
    r--;
  return i > 0 || r < e.length ? e.slice(i, r) : e;
}
const Ov = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function _b(e, t) {
  if (e._chartjs) {
    e._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(e, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), Ov.forEach((n) => {
    const i = "_onData" + dd(n), r = e[n];
    Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const a = r.apply(this, o);
        return e._chartjs.listeners.forEach((c) => {
          typeof c[i] == "function" && c[i](...o);
        }), a;
      }
    });
  });
}
function Yp(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const i = n.listeners, r = i.indexOf(t);
  r !== -1 && i.splice(r, 1), !(i.length > 0) && (Ov.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Av(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Iv = function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
}();
function Rv(e, t) {
  let n = [], i = !1;
  return function(...r) {
    n = r, i || (i = !0, Iv.call(window, () => {
      i = !1, e.apply(t, n);
    }));
  };
}
function vb(e, t) {
  let n;
  return function(...i) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, i)) : e.apply(this, i), t;
  };
}
const Dv = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Te = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, yb = (e, t, n, i) => e === (i ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function xb(e, t, n) {
  const i = t.length;
  let r = 0, o = i;
  if (e._sorted) {
    const { iScale: a, vScale: c, _parsed: u } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, p = a.axis, { min: g, max: v, minDefined: y, maxDefined: S } = a.getUserBounds();
    if (y) {
      if (r = Math.min(
        // @ts-expect-error Need to type _parsed
        Oi(u, p, g).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? i : Oi(t, p, a.getPixelForValue(g)).lo
      ), d) {
        const w = u.slice(0, r + 1).reverse().findIndex((M) => !wt(M[c.axis]));
        r -= Math.max(0, w);
      }
      r = ue(r, 0, i - 1);
    }
    if (S) {
      let w = Math.max(
        // @ts-expect-error Need to type _parsed
        Oi(u, a.axis, v, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Oi(t, p, a.getPixelForValue(v), !0).hi + 1
      );
      if (d) {
        const M = u.slice(w - 1).findIndex((b) => !wt(b[c.axis]));
        w += Math.max(0, M);
      }
      o = ue(w, r, i) - r;
    } else
      o = i - r;
  }
  return {
    start: r,
    count: o
  };
}
function wb(e) {
  const { xScale: t, yScale: n, _scaleRanges: i } = e, r = {
    xmin: t.min,
    xmax: t.max,
    ymin: n.min,
    ymax: n.max
  };
  if (!i)
    return e._scaleRanges = r, !0;
  const o = i.xmin !== t.min || i.xmax !== t.max || i.ymin !== n.min || i.ymax !== n.max;
  return Object.assign(i, r), o;
}
const la = (e) => e === 0 || e === 1, qp = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * Ot / n)), Kp = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * Ot / n) + 1, Br = {
  linear: (e) => e,
  easeInQuad: (e) => e * e,
  easeOutQuad: (e) => -e * (e - 2),
  easeInOutQuad: (e) => (e /= 0.5) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1),
  easeInCubic: (e) => e * e * e,
  easeOutCubic: (e) => (e -= 1) * e * e + 1,
  easeInOutCubic: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e : 0.5 * ((e -= 2) * e * e + 2),
  easeInQuart: (e) => e * e * e * e,
  easeOutQuart: (e) => -((e -= 1) * e * e * e - 1),
  easeInOutQuart: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2),
  easeInQuint: (e) => e * e * e * e * e,
  easeOutQuint: (e) => (e -= 1) * e * e * e * e + 1,
  easeInOutQuint: (e) => (e /= 0.5) < 1 ? 0.5 * e * e * e * e * e : 0.5 * ((e -= 2) * e * e * e * e + 2),
  easeInSine: (e) => -Math.cos(e * Xt) + 1,
  easeOutSine: (e) => Math.sin(e * Xt),
  easeInOutSine: (e) => -0.5 * (Math.cos(Pt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => la(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => la(e) ? e : qp(e, 0.075, 0.3),
  easeOutElastic: (e) => la(e) ? e : Kp(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return la(e) ? e : e < 0.5 ? 0.5 * qp(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Kp(e * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(e) {
    return e * e * ((1.70158 + 1) * e - 1.70158);
  },
  easeOutBack(e) {
    return (e -= 1) * e * ((1.70158 + 1) * e + 1.70158) + 1;
  },
  easeInOutBack(e) {
    let t = 1.70158;
    return (e /= 0.5) < 1 ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t)) : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  },
  easeInBounce: (e) => 1 - Br.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Br.easeInBounce(e * 2) * 0.5 : Br.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function pd(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Xp(e) {
  return pd(e) ? e : new ro(e);
}
function Uc(e) {
  return pd(e) ? e : new ro(e).saturate(0.5).darken(0.1).hexString();
}
const bb = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], kb = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Sb(e) {
  e.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), e.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), e.set("animations", {
    colors: {
      type: "color",
      properties: kb
    },
    numbers: {
      type: "number",
      properties: bb
    }
  }), e.describe("animations", {
    _fallback: "animation"
  }), e.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function Pb(e) {
  e.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const Gp = /* @__PURE__ */ new Map();
function Mb(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let i = Gp.get(n);
  return i || (i = new Intl.NumberFormat(e, t), Gp.set(n, i)), i;
}
function md(e, t, n) {
  return Mb(t, n).format(e);
}
const Cb = {
  values(e) {
    return qt(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const i = this.chart.options.locale;
    let r, o = e;
    if (n.length > 1) {
      const d = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (d < 1e-4 || d > 1e15) && (r = "scientific"), o = Lb(e, n);
    }
    const a = zv(Math.abs(o)), c = isNaN(a) ? 1 : Math.max(Math.min(-1 * Math.floor(a), 20), 0), u = {
      notation: r,
      minimumFractionDigits: c,
      maximumFractionDigits: c
    };
    return Object.assign(u, this.options.ticks.format), md(e, i, u);
  }
};
function Lb(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var Fv = {
  formatters: Cb
};
function Tb(e) {
  e.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, n) => n.lineWidth,
      tickColor: (t, n) => n.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Fv.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), e.route("scale.ticks", "color", "", "color"), e.route("scale.grid", "color", "", "borderColor"), e.route("scale.border", "color", "", "borderColor"), e.route("scale.title", "color", "", "color"), e.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), e.describe("scales", {
    _fallback: "scale"
  }), e.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const Ui = /* @__PURE__ */ Object.create(null), eh = /* @__PURE__ */ Object.create(null);
function Hr(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let i = 0, r = n.length; i < r; ++i) {
    const o = n[i];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function $c(e, t, n) {
  return typeof t == "string" ? oo(Hr(e, t), n) : oo(Hr(e, ""), t);
}
class Nb {
  constructor(t, n) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (i) => i.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (i, r) => Uc(r.backgroundColor), this.hoverBorderColor = (i, r) => Uc(r.borderColor), this.hoverColor = (i, r) => Uc(r.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return $c(this, t, n);
  }
  get(t) {
    return Hr(this, t);
  }
  describe(t, n) {
    return $c(eh, t, n);
  }
  override(t, n) {
    return $c(Ui, t, n);
  }
  route(t, n, i, r) {
    const o = Hr(this, t), a = Hr(this, i), c = "_" + n;
    Object.defineProperties(o, {
      [c]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const u = this[c], d = a[r];
          return mt(u) ? Object.assign({}, d, u) : ut(u, d);
        },
        set(u) {
          this[c] = u;
        }
      }
    });
  }
  apply(t) {
    t.forEach((n) => n(this));
  }
}
var Wt = /* @__PURE__ */ new Nb({
  _scriptable: (e) => !e.startsWith("on"),
  _indexable: (e) => e !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  Sb,
  Pb,
  Tb
]);
function Eb(e) {
  return !e || wt(e.size) || wt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Qp(e, t, n, i, r) {
  let o = t[r];
  return o || (o = t[r] = e.measureText(r).width, n.push(r)), o > i && (i = o), i;
}
function Pi(e, t, n) {
  const i = e.currentDevicePixelRatio, r = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - r) * i) / i + r;
}
function Jp(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function nh(e, t, n, i) {
  Bv(e, t, n, i, null);
}
function Bv(e, t, n, i, r) {
  let o, a, c, u, d, p, g, v;
  const y = t.pointStyle, S = t.rotation, w = t.radius;
  let M = (S || 0) * ab;
  if (y && typeof y == "object" && (o = y.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, i), e.rotate(M), e.drawImage(y, -y.width / 2, -y.height / 2, y.width, y.height), e.restore();
    return;
  }
  if (!(isNaN(w) || w <= 0)) {
    switch (e.beginPath(), y) {
      default:
        r ? e.ellipse(n, i, r / 2, w, 0, 0, Ot) : e.arc(n, i, w, 0, Ot), e.closePath();
        break;
      case "triangle":
        p = r ? r / 2 : w, e.moveTo(n + Math.sin(M) * p, i - Math.cos(M) * w), M += Zp, e.lineTo(n + Math.sin(M) * p, i - Math.cos(M) * w), M += Zp, e.lineTo(n + Math.sin(M) * p, i - Math.cos(M) * w), e.closePath();
        break;
      case "rectRounded":
        d = w * 0.516, u = w - d, a = Math.cos(M + Si) * u, g = Math.cos(M + Si) * (r ? r / 2 - d : u), c = Math.sin(M + Si) * u, v = Math.sin(M + Si) * (r ? r / 2 - d : u), e.arc(n - g, i - c, d, M - Pt, M - Xt), e.arc(n + v, i - a, d, M - Xt, M), e.arc(n + g, i + c, d, M, M + Xt), e.arc(n - v, i + a, d, M + Xt, M + Pt), e.closePath();
        break;
      case "rect":
        if (!S) {
          u = Math.SQRT1_2 * w, p = r ? r / 2 : u, e.rect(n - p, i - u, 2 * p, 2 * u);
          break;
        }
        M += Si;
      case "rectRot":
        g = Math.cos(M) * (r ? r / 2 : w), a = Math.cos(M) * w, c = Math.sin(M) * w, v = Math.sin(M) * (r ? r / 2 : w), e.moveTo(n - g, i - c), e.lineTo(n + v, i - a), e.lineTo(n + g, i + c), e.lineTo(n - v, i + a), e.closePath();
        break;
      case "crossRot":
        M += Si;
      case "cross":
        g = Math.cos(M) * (r ? r / 2 : w), a = Math.cos(M) * w, c = Math.sin(M) * w, v = Math.sin(M) * (r ? r / 2 : w), e.moveTo(n - g, i - c), e.lineTo(n + g, i + c), e.moveTo(n + v, i - a), e.lineTo(n - v, i + a);
        break;
      case "star":
        g = Math.cos(M) * (r ? r / 2 : w), a = Math.cos(M) * w, c = Math.sin(M) * w, v = Math.sin(M) * (r ? r / 2 : w), e.moveTo(n - g, i - c), e.lineTo(n + g, i + c), e.moveTo(n + v, i - a), e.lineTo(n - v, i + a), M += Si, g = Math.cos(M) * (r ? r / 2 : w), a = Math.cos(M) * w, c = Math.sin(M) * w, v = Math.sin(M) * (r ? r / 2 : w), e.moveTo(n - g, i - c), e.lineTo(n + g, i + c), e.moveTo(n + v, i - a), e.lineTo(n - v, i + a);
        break;
      case "line":
        a = r ? r / 2 : Math.cos(M) * w, c = Math.sin(M) * w, e.moveTo(n - a, i - c), e.lineTo(n + a, i + c);
        break;
      case "dash":
        e.moveTo(n, i), e.lineTo(n + Math.cos(M) * (r ? r / 2 : w), i + Math.sin(M) * w);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function uo(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function Ol(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Al(e) {
  e.restore();
}
function zb(e, t, n, i, r) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (r === "middle") {
    const o = (t.x + n.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, n.y);
  } else r === "after" != !!i ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function jb(e, t, n, i) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(i ? t.cp1x : t.cp2x, i ? t.cp1y : t.cp2y, i ? n.cp2x : n.cp1x, i ? n.cp2y : n.cp1y, n.x, n.y);
}
function Ob(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), wt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Ab(e, t, n, i, r) {
  if (r.strikethrough || r.underline) {
    const o = e.measureText(i), a = t - o.actualBoundingBoxLeft, c = t + o.actualBoundingBoxRight, u = n - o.actualBoundingBoxAscent, d = n + o.actualBoundingBoxDescent, p = r.strikethrough ? (u + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = r.decorationWidth || 2, e.moveTo(a, p), e.lineTo(c, p), e.stroke();
  }
}
function Ib(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function hl(e, t, n, i, r, o = {}) {
  const a = qt(t) ? t : [
    t
  ], c = o.strokeWidth > 0 && o.strokeColor !== "";
  let u, d;
  for (e.save(), e.font = r.string, Ob(e, o), u = 0; u < a.length; ++u)
    d = a[u], o.backdrop && Ib(e, o.backdrop), c && (o.strokeColor && (e.strokeStyle = o.strokeColor), wt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, n, i, o.maxWidth)), e.fillText(d, n, i, o.maxWidth), Ab(e, n, i, d, o), i += Number(r.lineHeight);
  e.restore();
}
function dl(e, t) {
  const { x: n, y: i, w: r, h: o, radius: a } = t;
  e.arc(n + a.topLeft, i + a.topLeft, a.topLeft, 1.5 * Pt, Pt, !0), e.lineTo(n, i + o - a.bottomLeft), e.arc(n + a.bottomLeft, i + o - a.bottomLeft, a.bottomLeft, Pt, Xt, !0), e.lineTo(n + r - a.bottomRight, i + o), e.arc(n + r - a.bottomRight, i + o - a.bottomRight, a.bottomRight, Xt, 0, !0), e.lineTo(n + r, i + a.topRight), e.arc(n + r - a.topRight, i + a.topRight, a.topRight, 0, -Xt, !0), e.lineTo(n + a.topLeft, i);
}
const Rb = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Db = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Fb(e, t) {
  const n = ("" + e).match(Rb);
  if (!n || n[1] === "normal")
    return t * 1.2;
  switch (e = +n[2], n[3]) {
    case "px":
      return e;
    case "%":
      e /= 100;
      break;
  }
  return t * e;
}
const Bb = (e) => +e || 0;
function gd(e, t) {
  const n = {}, i = mt(t), r = i ? Object.keys(t) : t, o = mt(e) ? i ? (a) => ut(e[a], e[t[a]]) : (a) => e[a] : () => e;
  for (const a of r)
    n[a] = Bb(o(a));
  return n;
}
function Hv(e) {
  return gd(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ls(e) {
  return gd(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function rn(e) {
  const t = Hv(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Se(e, t) {
  e = e || {}, t = t || Wt.font;
  let n = ut(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let i = ut(e.style, t.style);
  i && !("" + i).match(Db) && (console.warn('Invalid font style specified: "' + i + '"'), i = void 0);
  const r = {
    family: ut(e.family, t.family),
    lineHeight: Fb(ut(e.lineHeight, t.lineHeight), n),
    size: n,
    style: i,
    weight: ut(e.weight, t.weight),
    string: ""
  };
  return r.string = Eb(r), r;
}
function ca(e, t, n, i) {
  let r, o, a;
  for (r = 0, o = e.length; r < o; ++r)
    if (a = e[r], a !== void 0 && a !== void 0)
      return a;
}
function Hb(e, t, n) {
  const { min: i, max: r } = e, o = Nv(t, (r - i) / 2), a = (c, u) => n && c === 0 ? 0 : c + u;
  return {
    min: a(i, -Math.abs(o)),
    max: a(r, o)
  };
}
function qi(e, t) {
  return Object.assign(Object.create(e), t);
}
function _d(e, t = [
  ""
], n, i, r = () => e[0]) {
  const o = n || e;
  typeof i > "u" && (i = Uv("_fallback", e));
  const a = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: i,
    _getTarget: r,
    override: (c) => _d([
      c,
      ...e
    ], t, o, i)
  };
  return new Proxy(a, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(c, u) {
      return delete c[u], delete c._keys, delete e[0][u], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(c, u) {
      return Vv(c, u, () => Kb(u, t, e, c));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(c, u) {
      return Reflect.getOwnPropertyDescriptor(c._scopes[0], u);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(c, u) {
      return em(c).includes(u);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(c) {
      return em(c);
    },
    /**
    * A trap for setting property values.
    */
    set(c, u, d) {
      const p = c._storage || (c._storage = r());
      return c[u] = p[u] = d, delete c._keys, !0;
    }
  });
}
function Ds(e, t, n, i) {
  const r = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Wv(e, i),
    setContext: (o) => Ds(e, o, n, i),
    override: (o) => Ds(e.override(o), t, n, i)
  };
  return new Proxy(r, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, a) {
      return delete o[a], delete e[a], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, a, c) {
      return Vv(o, a, () => Vb(o, a, c));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, a) {
      return o._descriptors.allKeys ? Reflect.has(e, a) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(e, a);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(e);
    },
    /**
    * A trap for the in operator.
    */
    has(o, a) {
      return Reflect.has(e, a);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(e);
    },
    /**
    * A trap for setting property values.
    */
    set(o, a, c) {
      return e[a] = c, delete o[a], !0;
    }
  });
}
function Wv(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: i = t.indexable, _allKeys: r = t.allKeys } = e;
  return {
    allKeys: r,
    scriptable: n,
    indexable: i,
    isScriptable: pi(n) ? n : () => n,
    isIndexable: pi(i) ? i : () => i
  };
}
const Wb = (e, t) => e ? e + dd(t) : t, vd = (e, t) => mt(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Vv(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const i = n();
  return e[t] = i, i;
}
function Vb(e, t, n) {
  const { _proxy: i, _context: r, _subProxy: o, _descriptors: a } = e;
  let c = i[t];
  return pi(c) && a.isScriptable(t) && (c = Zb(t, c, e, n)), qt(c) && c.length && (c = Ub(t, c, e, a.isIndexable)), vd(t, c) && (c = Ds(c, r, o && o[t], a)), c;
}
function Zb(e, t, n, i) {
  const { _proxy: r, _context: o, _subProxy: a, _stack: c } = n;
  if (c.has(e))
    throw new Error("Recursion detected: " + Array.from(c).join("->") + "->" + e);
  c.add(e);
  let u = t(o, a || i);
  return c.delete(e), vd(e, u) && (u = yd(r._scopes, r, e, u)), u;
}
function Ub(e, t, n, i) {
  const { _proxy: r, _context: o, _subProxy: a, _descriptors: c } = n;
  if (typeof o.index < "u" && i(e))
    return t[o.index % t.length];
  if (mt(t[0])) {
    const u = t, d = r._scopes.filter((p) => p !== u);
    t = [];
    for (const p of u) {
      const g = yd(d, r, e, p);
      t.push(Ds(g, o, a && a[e], c));
    }
  }
  return t;
}
function Zv(e, t, n) {
  return pi(e) ? e(t, n) : e;
}
const $b = (e, t) => e === !0 ? t : typeof e == "string" ? Zi(t, e) : void 0;
function Yb(e, t, n, i, r) {
  for (const o of t) {
    const a = $b(n, o);
    if (a) {
      e.add(a);
      const c = Zv(a._fallback, n, r);
      if (typeof c < "u" && c !== n && c !== i)
        return c;
    } else if (a === !1 && typeof i < "u" && n !== i)
      return null;
  }
  return !1;
}
function yd(e, t, n, i) {
  const r = t._rootScopes, o = Zv(t._fallback, n, i), a = [
    ...e,
    ...r
  ], c = /* @__PURE__ */ new Set();
  c.add(i);
  let u = tm(c, a, n, o || n, i);
  return u === null || typeof o < "u" && o !== n && (u = tm(c, a, o, u, i), u === null) ? !1 : _d(Array.from(c), [
    ""
  ], r, o, () => qb(t, n, i));
}
function tm(e, t, n, i, r) {
  for (; n; )
    n = Yb(e, t, n, i, r);
  return n;
}
function qb(e, t, n) {
  const i = e._getTarget();
  t in i || (i[t] = {});
  const r = i[t];
  return qt(r) && mt(n) ? n : r || {};
}
function Kb(e, t, n, i) {
  let r;
  for (const o of t)
    if (r = Uv(Wb(o, e), n), typeof r < "u")
      return vd(e, r) ? yd(n, i, e, r) : r;
}
function Uv(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const i = n[e];
    if (typeof i < "u")
      return i;
  }
}
function em(e) {
  let t = e._keys;
  return t || (t = e._keys = Xb(e._scopes)), t;
}
function Xb(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const i of Object.keys(n).filter((r) => !r.startsWith("_")))
      t.add(i);
  return Array.from(t);
}
const Gb = Number.EPSILON || 1e-14, Fs = (e, t) => t < e.length && !e[t].skip && e[t], $v = (e) => e === "x" ? "y" : "x";
function Qb(e, t, n, i) {
  const r = e.skip ? t : e, o = t, a = n.skip ? t : n, c = th(o, r), u = th(a, o);
  let d = c / (c + u), p = u / (c + u);
  d = isNaN(d) ? 0 : d, p = isNaN(p) ? 0 : p;
  const g = i * d, v = i * p;
  return {
    previous: {
      x: o.x - g * (a.x - r.x),
      y: o.y - g * (a.y - r.y)
    },
    next: {
      x: o.x + v * (a.x - r.x),
      y: o.y + v * (a.y - r.y)
    }
  };
}
function Jb(e, t, n) {
  const i = e.length;
  let r, o, a, c, u, d = Fs(e, 0);
  for (let p = 0; p < i - 1; ++p)
    if (u = d, d = Fs(e, p + 1), !(!u || !d)) {
      if (Fr(t[p], 0, Gb)) {
        n[p] = n[p + 1] = 0;
        continue;
      }
      r = n[p] / t[p], o = n[p + 1] / t[p], c = Math.pow(r, 2) + Math.pow(o, 2), !(c <= 9) && (a = 3 / Math.sqrt(c), n[p] = r * a * t[p], n[p + 1] = o * a * t[p]);
    }
}
function tk(e, t, n = "x") {
  const i = $v(n), r = e.length;
  let o, a, c, u = Fs(e, 0);
  for (let d = 0; d < r; ++d) {
    if (a = c, c = u, u = Fs(e, d + 1), !c)
      continue;
    const p = c[n], g = c[i];
    a && (o = (p - a[n]) / 3, c[`cp1${n}`] = p - o, c[`cp1${i}`] = g - o * t[d]), u && (o = (u[n] - p) / 3, c[`cp2${n}`] = p + o, c[`cp2${i}`] = g + o * t[d]);
  }
}
function ek(e, t = "x") {
  const n = $v(t), i = e.length, r = Array(i).fill(0), o = Array(i);
  let a, c, u, d = Fs(e, 0);
  for (a = 0; a < i; ++a)
    if (c = u, u = d, d = Fs(e, a + 1), !!u) {
      if (d) {
        const p = d[t] - u[t];
        r[a] = p !== 0 ? (d[n] - u[n]) / p : 0;
      }
      o[a] = c ? d ? yn(r[a - 1]) !== yn(r[a]) ? 0 : (r[a - 1] + r[a]) / 2 : r[a - 1] : r[a];
    }
  Jb(e, r, o), tk(e, o, t);
}
function ua(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function nk(e, t) {
  let n, i, r, o, a, c = uo(e[0], t);
  for (n = 0, i = e.length; n < i; ++n)
    a = o, o = c, c = n < i - 1 && uo(e[n + 1], t), o && (r = e[n], a && (r.cp1x = ua(r.cp1x, t.left, t.right), r.cp1y = ua(r.cp1y, t.top, t.bottom)), c && (r.cp2x = ua(r.cp2x, t.left, t.right), r.cp2y = ua(r.cp2y, t.top, t.bottom)));
}
function ik(e, t, n, i, r) {
  let o, a, c, u;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    ek(e, r);
  else {
    let d = i ? e[e.length - 1] : e[0];
    for (o = 0, a = e.length; o < a; ++o)
      c = e[o], u = Qb(d, c, e[Math.min(o + 1, a - (i ? 0 : 1)) % a], t.tension), c.cp1x = u.previous.x, c.cp1y = u.previous.y, c.cp2x = u.next.x, c.cp2y = u.next.y, d = c;
  }
  t.capBezierPoints && nk(e, n);
}
function xd() {
  return typeof window < "u" && typeof document < "u";
}
function wd(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function fl(e, t, n) {
  let i;
  return typeof e == "string" ? (i = parseInt(e, 10), e.indexOf("%") !== -1 && (i = i / 100 * t.parentNode[n])) : i = e, i;
}
const Il = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function sk(e, t) {
  return Il(e).getPropertyValue(t);
}
const rk = [
  "top",
  "right",
  "bottom",
  "left"
];
function Ri(e, t, n) {
  const i = {};
  n = n ? "-" + n : "";
  for (let r = 0; r < 4; r++) {
    const o = rk[r];
    i[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return i.width = i.left + i.right, i.height = i.top + i.bottom, i;
}
const ok = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function ak(e, t) {
  const n = e.touches, i = n && n.length ? n[0] : e, { offsetX: r, offsetY: o } = i;
  let a = !1, c, u;
  if (ok(r, o, e.target))
    c = r, u = o;
  else {
    const d = t.getBoundingClientRect();
    c = i.clientX - d.left, u = i.clientY - d.top, a = !0;
  }
  return {
    x: c,
    y: u,
    box: a
  };
}
function Ti(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: i } = t, r = Il(n), o = r.boxSizing === "border-box", a = Ri(r, "padding"), c = Ri(r, "border", "width"), { x: u, y: d, box: p } = ak(e, n), g = a.left + (p && c.left), v = a.top + (p && c.top);
  let { width: y, height: S } = t;
  return o && (y -= a.width + c.width, S -= a.height + c.height), {
    x: Math.round((u - g) / y * n.width / i),
    y: Math.round((d - v) / S * n.height / i)
  };
}
function lk(e, t, n) {
  let i, r;
  if (t === void 0 || n === void 0) {
    const o = e && wd(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const a = o.getBoundingClientRect(), c = Il(o), u = Ri(c, "border", "width"), d = Ri(c, "padding");
      t = a.width - d.width - u.width, n = a.height - d.height - u.height, i = fl(c.maxWidth, o, "clientWidth"), r = fl(c.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: i || ul,
    maxHeight: r || ul
  };
}
const Jn = (e) => Math.round(e * 10) / 10;
function ck(e, t, n, i) {
  const r = Il(e), o = Ri(r, "margin"), a = fl(r.maxWidth, e, "clientWidth") || ul, c = fl(r.maxHeight, e, "clientHeight") || ul, u = lk(e, t, n);
  let { width: d, height: p } = u;
  if (r.boxSizing === "content-box") {
    const v = Ri(r, "border", "width"), y = Ri(r, "padding");
    d -= y.width + v.width, p -= y.height + v.height;
  }
  return d = Math.max(0, d - o.width), p = Math.max(0, i ? d / i : p - o.height), d = Jn(Math.min(d, a, u.maxWidth)), p = Jn(Math.min(p, c, u.maxHeight)), d && !p && (p = Jn(d / 2)), (t !== void 0 || n !== void 0) && i && u.height && p > u.height && (p = u.height, d = Jn(Math.floor(p * i))), {
    width: d,
    height: p
  };
}
function nm(e, t, n) {
  const i = t || 1, r = Jn(e.height * i), o = Jn(e.width * i);
  e.height = Jn(e.height), e.width = Jn(e.width);
  const a = e.canvas;
  return a.style && (n || !a.style.height && !a.style.width) && (a.style.height = `${e.height}px`, a.style.width = `${e.width}px`), e.currentDevicePixelRatio !== i || a.height !== r || a.width !== o ? (e.currentDevicePixelRatio = i, a.height = r, a.width = o, e.ctx.setTransform(i, 0, 0, i, 0, 0), !0) : !1;
}
const uk = function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    xd() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
}();
function im(e, t) {
  const n = sk(e, t), i = n && n.match(/^(\d+)(\.\d+)?px$/);
  return i ? +i[1] : void 0;
}
function Ni(e, t, n, i) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function hk(e, t, n, i) {
  return {
    x: e.x + n * (t.x - e.x),
    y: i === "middle" ? n < 0.5 ? e.y : t.y : i === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function dk(e, t, n, i) {
  const r = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, a = Ni(e, r, n), c = Ni(r, o, n), u = Ni(o, t, n), d = Ni(a, c, n), p = Ni(c, u, n);
  return Ni(d, p, n);
}
const fk = function(e, t) {
  return {
    x(n) {
      return e + e + t - n;
    },
    setWidth(n) {
      t = n;
    },
    textAlign(n) {
      return n === "center" ? n : n === "right" ? "left" : "right";
    },
    xPlus(n, i) {
      return n - i;
    },
    leftForLtr(n, i) {
      return n - i;
    }
  };
}, pk = function() {
  return {
    x(e) {
      return e;
    },
    setWidth(e) {
    },
    textAlign(e) {
      return e;
    },
    xPlus(e, t) {
      return e + t;
    },
    leftForLtr(e, t) {
      return e;
    }
  };
};
function Ts(e, t, n) {
  return e ? fk(t, n) : pk();
}
function Yv(e, t) {
  let n, i;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, i = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = i);
}
function qv(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Kv(e) {
  return e === "angle" ? {
    between: co,
    compare: fb,
    normalize: Ee
  } : {
    between: jn,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function sm({ start: e, end: t, count: n, loop: i, style: r }) {
  return {
    start: e % n,
    end: t % n,
    loop: i && (t - e + 1) % n === 0,
    style: r
  };
}
function mk(e, t, n) {
  const { property: i, start: r, end: o } = n, { between: a, normalize: c } = Kv(i), u = t.length;
  let { start: d, end: p, loop: g } = e, v, y;
  if (g) {
    for (d += u, p += u, v = 0, y = u; v < y && a(c(t[d % u][i]), r, o); ++v)
      d--, p--;
    d %= u, p %= u;
  }
  return p < d && (p += u), {
    start: d,
    end: p,
    loop: g,
    style: e.style
  };
}
function Xv(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: i, start: r, end: o } = n, a = t.length, { compare: c, between: u, normalize: d } = Kv(i), { start: p, end: g, loop: v, style: y } = mk(e, t, n), S = [];
  let w = !1, M = null, b, k, P;
  const T = () => u(r, P, b) && c(r, P) !== 0, N = () => c(o, b) === 0 || u(o, P, b), j = () => w || T(), O = () => !w || N();
  for (let A = p, H = p; A <= g; ++A)
    k = t[A % a], !k.skip && (b = d(k[i]), b !== P && (w = u(b, r, o), M === null && j() && (M = c(b, r) === 0 ? A : H), M !== null && O() && (S.push(sm({
      start: M,
      end: A,
      loop: v,
      count: a,
      style: y
    })), M = null), H = A, P = b));
  return M !== null && S.push(sm({
    start: M,
    end: g,
    loop: v,
    count: a,
    style: y
  })), S;
}
function Gv(e, t) {
  const n = [], i = e.segments;
  for (let r = 0; r < i.length; r++) {
    const o = Xv(i[r], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function gk(e, t, n, i) {
  let r = 0, o = t - 1;
  if (n && !i)
    for (; r < t && !e[r].skip; )
      r++;
  for (; r < t && e[r].skip; )
    r++;
  for (r %= t, n && (o += r); o > r && e[o % t].skip; )
    o--;
  return o %= t, {
    start: r,
    end: o
  };
}
function _k(e, t, n, i) {
  const r = e.length, o = [];
  let a = t, c = e[t], u;
  for (u = t + 1; u <= n; ++u) {
    const d = e[u % r];
    d.skip || d.stop ? c.skip || (i = !1, o.push({
      start: t % r,
      end: (u - 1) % r,
      loop: i
    }), t = a = d.stop ? u : null) : (a = u, c.skip && (t = u)), c = d;
  }
  return a !== null && o.push({
    start: t % r,
    end: a % r,
    loop: i
  }), o;
}
function vk(e, t) {
  const n = e.points, i = e.options.spanGaps, r = n.length;
  if (!r)
    return [];
  const o = !!e._loop, { start: a, end: c } = gk(n, r, o, i);
  if (i === !0)
    return rm(e, [
      {
        start: a,
        end: c,
        loop: o
      }
    ], n, t);
  const u = c < a ? c + r : c, d = !!e._fullLoop && a === 0 && c === r - 1;
  return rm(e, _k(n, a, u, d), n, t);
}
function rm(e, t, n, i) {
  return !i || !i.setContext || !n ? t : yk(e, t, n, i);
}
function yk(e, t, n, i) {
  const r = e._chart.getContext(), o = om(e.options), { _datasetIndex: a, options: { spanGaps: c } } = e, u = n.length, d = [];
  let p = o, g = t[0].start, v = g;
  function y(S, w, M, b) {
    const k = c ? -1 : 1;
    if (S !== w) {
      for (S += u; n[S % u].skip; )
        S -= k;
      for (; n[w % u].skip; )
        w += k;
      S % u !== w % u && (d.push({
        start: S % u,
        end: w % u,
        loop: M,
        style: b
      }), p = b, g = w % u);
    }
  }
  for (const S of t) {
    g = c ? g : S.start;
    let w = n[g % u], M;
    for (v = g + 1; v <= S.end; v++) {
      const b = n[v % u];
      M = om(i.setContext(qi(r, {
        type: "segment",
        p0: w,
        p1: b,
        p0DataIndex: (v - 1) % u,
        p1DataIndex: v % u,
        datasetIndex: a
      }))), xk(M, p) && y(g, v - 1, S.loop, p), w = b, p = M;
    }
    g < v - 1 && y(g, v - 1, S.loop, p);
  }
  return d;
}
function om(e) {
  return {
    backgroundColor: e.backgroundColor,
    borderCapStyle: e.borderCapStyle,
    borderDash: e.borderDash,
    borderDashOffset: e.borderDashOffset,
    borderJoinStyle: e.borderJoinStyle,
    borderWidth: e.borderWidth,
    borderColor: e.borderColor
  };
}
function xk(e, t) {
  if (!t)
    return !1;
  const n = [], i = function(r, o) {
    return pd(o) ? (n.includes(o) || n.push(o), n.indexOf(o)) : o;
  };
  return JSON.stringify(e, i) !== JSON.stringify(t, i);
}
function ha(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function wk(e, t) {
  const { xScale: n, yScale: i } = e;
  return n && i ? {
    left: ha(n, t, "left"),
    right: ha(n, t, "right"),
    top: ha(i, t, "top"),
    bottom: ha(i, t, "bottom")
  } : t;
}
function Qv(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const i = wk(t, e.chartArea);
  return {
    left: n.left === !1 ? 0 : i.left - (n.left === !0 ? 0 : n.left),
    right: n.right === !1 ? e.width : i.right + (n.right === !0 ? 0 : n.right),
    top: n.top === !1 ? 0 : i.top - (n.top === !0 ? 0 : n.top),
    bottom: n.bottom === !1 ? e.height : i.bottom + (n.bottom === !0 ? 0 : n.bottom)
  };
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
class bk {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, n, i, r) {
    const o = n.listeners[r], a = n.duration;
    o.forEach((c) => c({
      chart: t,
      initial: n.initial,
      numSteps: a,
      currentStep: Math.min(i - n.start, a)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = Iv.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((i, r) => {
      if (!i.running || !i.items.length)
        return;
      const o = i.items;
      let a = o.length - 1, c = !1, u;
      for (; a >= 0; --a)
        u = o[a], u._active ? (u._total > i.duration && (i.duration = u._total), u.tick(t), c = !0) : (o[a] = o[o.length - 1], o.pop());
      c && (r.draw(), this._notify(r, i, t, "progress")), o.length || (i.running = !1, this._notify(r, i, t, "complete"), i.initial = !1), n += o.length;
    }), this._lastDate = t, n === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const n = this._charts;
    let i = n.get(t);
    return i || (i = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, n.set(t, i)), i;
  }
  listen(t, n, i) {
    this._getAnims(t).listeners[n].push(i);
  }
  add(t, n) {
    !n || !n.length || this._getAnims(t).items.push(...n);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const n = this._charts.get(t);
    n && (n.running = !0, n.start = Date.now(), n.duration = n.items.reduce((i, r) => Math.max(i, r._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const n = this._charts.get(t);
    return !(!n || !n.running || !n.items.length);
  }
  stop(t) {
    const n = this._charts.get(t);
    if (!n || !n.items.length)
      return;
    const i = n.items;
    let r = i.length - 1;
    for (; r >= 0; --r)
      i[r].cancel();
    n.items = [], this._notify(t, n, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var Pn = /* @__PURE__ */ new bk();
const am = "transparent", kk = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const i = Xp(e || am), r = i.valid && Xp(t || am);
    return r && r.valid ? r.mix(i, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class Sk {
  constructor(t, n, i, r) {
    const o = n[i];
    r = ca([
      t.to,
      r,
      o,
      t.from
    ]);
    const a = ca([
      t.from,
      o,
      r
    ]);
    this._active = !0, this._fn = t.fn || kk[t.type || typeof a], this._easing = Br[t.easing] || Br.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = i, this._from = a, this._to = r, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, i) {
    if (this._active) {
      this._notify(!1);
      const r = this._target[this._prop], o = i - this._start, a = this._duration - o;
      this._start = i, this._duration = Math.floor(Math.max(a, t.duration)), this._total += o, this._loop = !!t.loop, this._to = ca([
        t.to,
        n,
        r,
        t.from
      ]), this._from = ca([
        t.from,
        r,
        n
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const n = t - this._start, i = this._duration, r = this._prop, o = this._from, a = this._loop, c = this._to;
    let u;
    if (this._active = o !== c && (a || n < i), !this._active) {
      this._target[r] = c, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[r] = o;
      return;
    }
    u = n / i % 2, u = a && u > 1 ? 2 - u : u, u = this._easing(Math.min(1, Math.max(0, u))), this._target[r] = this._fn(o, c, u);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((n, i) => {
      t.push({
        res: n,
        rej: i
      });
    });
  }
  _notify(t) {
    const n = t ? "res" : "rej", i = this._promises || [];
    for (let r = 0; r < i.length; r++)
      i[r][n]();
  }
}
class Jv {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!mt(t))
      return;
    const n = Object.keys(Wt.animation), i = this._properties;
    Object.getOwnPropertyNames(t).forEach((r) => {
      const o = t[r];
      if (!mt(o))
        return;
      const a = {};
      for (const c of n)
        a[c] = o[c];
      (qt(o.properties) && o.properties || [
        r
      ]).forEach((c) => {
        (c === r || !i.has(c)) && i.set(c, a);
      });
    });
  }
  _animateOptions(t, n) {
    const i = n.options, r = Mk(t, i);
    if (!r)
      return [];
    const o = this._createAnimations(r, i);
    return i.$shared && Pk(t.options.$animations, i).then(() => {
      t.options = i;
    }, () => {
    }), o;
  }
  _createAnimations(t, n) {
    const i = this._properties, r = [], o = t.$animations || (t.$animations = {}), a = Object.keys(n), c = Date.now();
    let u;
    for (u = a.length - 1; u >= 0; --u) {
      const d = a[u];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        r.push(...this._animateOptions(t, n));
        continue;
      }
      const p = n[d];
      let g = o[d];
      const v = i.get(d);
      if (g)
        if (v && g.active()) {
          g.update(v, p, c);
          continue;
        } else
          g.cancel();
      if (!v || !v.duration) {
        t[d] = p;
        continue;
      }
      o[d] = g = new Sk(v, t, d, p), r.push(g);
    }
    return r;
  }
  update(t, n) {
    if (this._properties.size === 0) {
      Object.assign(t, n);
      return;
    }
    const i = this._createAnimations(t, n);
    if (i.length)
      return Pn.add(this._chart, i), !0;
  }
}
function Pk(e, t) {
  const n = [], i = Object.keys(t);
  for (let r = 0; r < i.length; r++) {
    const o = e[i[r]];
    o && o.active() && n.push(o.wait());
  }
  return Promise.all(n);
}
function Mk(e, t) {
  if (!t)
    return;
  let n = e.options;
  if (!n) {
    e.options = t;
    return;
  }
  return n.$shared && (e.options = n = Object.assign({}, n, {
    $shared: !1,
    $animations: {}
  })), n;
}
function lm(e, t) {
  const n = e && e.options || {}, i = n.reverse, r = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: i ? o : r,
    end: i ? r : o
  };
}
function Ck(e, t, n) {
  if (n === !1)
    return !1;
  const i = lm(e, n), r = lm(t, n);
  return {
    top: r.end,
    right: i.end,
    bottom: r.start,
    left: i.start
  };
}
function Lk(e) {
  let t, n, i, r;
  return mt(e) ? (t = e.top, n = e.right, i = e.bottom, r = e.left) : t = n = i = r = e, {
    top: t,
    right: n,
    bottom: i,
    left: r,
    disabled: e === !1
  };
}
function ty(e, t) {
  const n = [], i = e._getSortedDatasetMetas(t);
  let r, o;
  for (r = 0, o = i.length; r < o; ++r)
    n.push(i[r].index);
  return n;
}
function cm(e, t, n, i = {}) {
  const r = e.keys, o = i.mode === "single";
  let a, c, u, d;
  if (t === null)
    return;
  let p = !1;
  for (a = 0, c = r.length; a < c; ++a) {
    if (u = +r[a], u === n) {
      if (p = !0, i.all)
        continue;
      break;
    }
    d = e.values[u], de(d) && (o || t === 0 || yn(t) === yn(d)) && (t += d);
  }
  return !p && !i.all ? 0 : t;
}
function Tk(e, t) {
  const { iScale: n, vScale: i } = t, r = n.axis === "x" ? "x" : "y", o = i.axis === "x" ? "x" : "y", a = Object.keys(e), c = new Array(a.length);
  let u, d, p;
  for (u = 0, d = a.length; u < d; ++u)
    p = a[u], c[u] = {
      [r]: p,
      [o]: e[p]
    };
  return c;
}
function Yc(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function Nk(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function Ek(e) {
  const { min: t, max: n, minDefined: i, maxDefined: r } = e.getUserBounds();
  return {
    min: i ? t : Number.NEGATIVE_INFINITY,
    max: r ? n : Number.POSITIVE_INFINITY
  };
}
function zk(e, t, n) {
  const i = e[t] || (e[t] = {});
  return i[n] || (i[n] = {});
}
function um(e, t, n, i) {
  for (const r of t.getMatchingVisibleMetas(i).reverse()) {
    const o = e[r.index];
    if (n && o > 0 || !n && o < 0)
      return r.index;
  }
  return null;
}
function hm(e, t) {
  const { chart: n, _cachedMeta: i } = e, r = n._stacks || (n._stacks = {}), { iScale: o, vScale: a, index: c } = i, u = o.axis, d = a.axis, p = Nk(o, a, i), g = t.length;
  let v;
  for (let y = 0; y < g; ++y) {
    const S = t[y], { [u]: w, [d]: M } = S, b = S._stacks || (S._stacks = {});
    v = b[d] = zk(r, p, w), v[c] = M, v._top = um(v, a, !0, i.type), v._bottom = um(v, a, !1, i.type);
    const k = v._visualValues || (v._visualValues = {});
    k[c] = M;
  }
}
function qc(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((i) => n[i].axis === t).shift();
}
function jk(e, t) {
  return qi(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Ok(e, t, n) {
  return qi(e, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: n,
    index: t,
    mode: "default",
    type: "data"
  });
}
function mr(e, t) {
  const n = e.controller.index, i = e.vScale && e.vScale.axis;
  if (i) {
    t = t || e._parsed;
    for (const r of t) {
      const o = r._stacks;
      if (!o || o[i] === void 0 || o[i][n] === void 0)
        return;
      delete o[i][n], o[i]._visualValues !== void 0 && o[i]._visualValues[n] !== void 0 && delete o[i]._visualValues[n];
    }
  }
}
const Kc = (e) => e === "reset" || e === "none", dm = (e, t) => t ? e : Object.assign({}, e), Ak = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: ty(n, !0),
  values: null
};
class Di {
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Yc(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && mr(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, i = this.getDataset(), r = (g, v, y, S) => g === "x" ? v : g === "r" ? S : y, o = n.xAxisID = ut(i.xAxisID, qc(t, "x")), a = n.yAxisID = ut(i.yAxisID, qc(t, "y")), c = n.rAxisID = ut(i.rAxisID, qc(t, "r")), u = n.indexAxis, d = n.iAxisID = r(u, o, a, c), p = n.vAxisID = r(u, a, o, c);
    n.xScale = this.getScaleForId(o), n.yScale = this.getScaleForId(a), n.rScale = this.getScaleForId(c), n.iScale = this.getScaleForId(d), n.vScale = this.getScaleForId(p);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const n = this._cachedMeta;
    return t === n.iScale ? n.vScale : n.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && Yp(this._data, this), t._stacked && mr(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), i = this._data;
    if (mt(n)) {
      const r = this._cachedMeta;
      this._data = Tk(n, r);
    } else if (i !== n) {
      if (i) {
        Yp(i, this);
        const r = this._cachedMeta;
        mr(r), r._parsed = [];
      }
      n && Object.isExtensible(n) && _b(n, this), this._syncList = [], this._data = n;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const n = this._cachedMeta, i = this.getDataset();
    let r = !1;
    this._dataCheck();
    const o = n._stacked;
    n._stacked = Yc(n.vScale, n), n.stack !== i.stack && (r = !0, mr(n), n.stack = i.stack), this._resyncElements(t), (r || o !== n._stacked) && (hm(this, n._parsed), n._stacked = Yc(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), i = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(i, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: i, _data: r } = this, { iScale: o, _stacked: a } = i, c = o.axis;
    let u = t === 0 && n === r.length ? !0 : i._sorted, d = t > 0 && i._parsed[t - 1], p, g, v;
    if (this._parsing === !1)
      i._parsed = r, i._sorted = !0, v = r;
    else {
      qt(r[t]) ? v = this.parseArrayData(i, r, t, n) : mt(r[t]) ? v = this.parseObjectData(i, r, t, n) : v = this.parsePrimitiveData(i, r, t, n);
      const y = () => g[c] === null || d && g[c] < d[c];
      for (p = 0; p < n; ++p)
        i._parsed[p + t] = g = v[p], u && (y() && (u = !1), d = g);
      i._sorted = u;
    }
    a && hm(this, v);
  }
  parsePrimitiveData(t, n, i, r) {
    const { iScale: o, vScale: a } = t, c = o.axis, u = a.axis, d = o.getLabels(), p = o === a, g = new Array(r);
    let v, y, S;
    for (v = 0, y = r; v < y; ++v)
      S = v + i, g[v] = {
        [c]: p || o.parse(d[S], S),
        [u]: a.parse(n[S], S)
      };
    return g;
  }
  parseArrayData(t, n, i, r) {
    const { xScale: o, yScale: a } = t, c = new Array(r);
    let u, d, p, g;
    for (u = 0, d = r; u < d; ++u)
      p = u + i, g = n[p], c[u] = {
        x: o.parse(g[0], p),
        y: a.parse(g[1], p)
      };
    return c;
  }
  parseObjectData(t, n, i, r) {
    const { xScale: o, yScale: a } = t, { xAxisKey: c = "x", yAxisKey: u = "y" } = this._parsing, d = new Array(r);
    let p, g, v, y;
    for (p = 0, g = r; p < g; ++p)
      v = p + i, y = n[v], d[p] = {
        x: o.parse(Zi(y, c), v),
        y: a.parse(Zi(y, u), v)
      };
    return d;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, n, i) {
    const r = this.chart, o = this._cachedMeta, a = n[t.axis], c = {
      keys: ty(r, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return cm(c, a, o.index, {
      mode: i
    });
  }
  updateRangeFromParsed(t, n, i, r) {
    const o = i[n.axis];
    let a = o === null ? NaN : o;
    const c = r && i._stacks[n.axis];
    r && c && (r.values = c, a = cm(r, o, this._cachedMeta.index)), t.min = Math.min(t.min, a), t.max = Math.max(t.max, a);
  }
  getMinMax(t, n) {
    const i = this._cachedMeta, r = i._parsed, o = i._sorted && t === i.iScale, a = r.length, c = this._getOtherScale(t), u = Ak(n, i, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: p, max: g } = Ek(c);
    let v, y;
    function S() {
      y = r[v];
      const w = y[c.axis];
      return !de(y[t.axis]) || p > w || g < w;
    }
    for (v = 0; v < a && !(!S() && (this.updateRangeFromParsed(d, t, y, u), o)); ++v)
      ;
    if (o) {
      for (v = a - 1; v >= 0; --v)
        if (!S()) {
          this.updateRangeFromParsed(d, t, y, u);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, i = [];
    let r, o, a;
    for (r = 0, o = n.length; r < o; ++r)
      a = n[r][t.axis], de(a) && i.push(a);
    return i;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, i = n.iScale, r = n.vScale, o = this.getParsed(t);
    return {
      label: i ? "" + i.getLabelForValue(o[i.axis]) : "",
      value: r ? "" + r.getLabelForValue(o[r.axis]) : ""
    };
  }
  _update(t) {
    const n = this._cachedMeta;
    this.update(t || "default"), n._clip = Lk(ut(this.options.clip, Ck(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, i = this._cachedMeta, r = i.data || [], o = n.chartArea, a = [], c = this._drawStart || 0, u = this._drawCount || r.length - c, d = this.options.drawActiveElementsOnTop;
    let p;
    for (i.dataset && i.dataset.draw(t, o, c, u), p = c; p < c + u; ++p) {
      const g = r[p];
      g.hidden || (g.active && d ? a.push(g) : g.draw(t, o));
    }
    for (p = 0; p < a.length; ++p)
      a[p].draw(t, o);
  }
  getStyle(t, n) {
    const i = n ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(i) : this.resolveDataElementOptions(t || 0, i);
  }
  getContext(t, n, i) {
    const r = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const a = this._cachedMeta.data[t];
      o = a.$context || (a.$context = Ok(this.getContext(), t, a)), o.parsed = this.getParsed(t), o.raw = r.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = jk(this.chart.getContext(), this.index)), o.dataset = r, o.index = o.datasetIndex = this.index;
    return o.active = !!n, o.mode = i, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", i) {
    const r = n === "active", o = this._cachedDataOpts, a = t + "-" + n, c = o[a], u = this.enableOptionSharing && ao(i);
    if (c)
      return dm(c, u);
    const d = this.chart.config, p = d.datasetElementScopeKeys(this._type, t), g = r ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], v = d.getOptionScopes(this.getDataset(), p), y = Object.keys(Wt.elements[t]), S = () => this.getContext(i, r, n), w = d.resolveNamedOptions(v, y, S, g);
    return w.$shared && (w.$shared = u, o[a] = Object.freeze(dm(w, u))), w;
  }
  _resolveAnimations(t, n, i) {
    const r = this.chart, o = this._cachedDataOpts, a = `animation-${n}`, c = o[a];
    if (c)
      return c;
    let u;
    if (r.options.animation !== !1) {
      const p = this.chart.config, g = p.datasetAnimationScopeKeys(this._type, n), v = p.getOptionScopes(this.getDataset(), g);
      u = p.createResolver(v, this.getContext(t, i, n));
    }
    const d = new Jv(r, u && u.animations);
    return u && u._cacheable && (o[a] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || Kc(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const i = this.resolveDataElementOptions(t, n), r = this._sharedOptions, o = this.getSharedOptions(i), a = this.includeOptions(n, o) || o !== r;
    return this.updateSharedOptions(o, n, i), {
      sharedOptions: o,
      includeOptions: a
    };
  }
  updateElement(t, n, i, r) {
    Kc(r) ? Object.assign(t, i) : this._resolveAnimations(n, r).update(t, i);
  }
  updateSharedOptions(t, n, i) {
    t && !Kc(n) && this._resolveAnimations(void 0, n).update(t, i);
  }
  _setStyle(t, n, i, r) {
    t.active = r;
    const o = this.getStyle(n, r);
    this._resolveAnimations(n, i, r).update(t, {
      options: !r && this.getSharedOptions(o) || o
    });
  }
  removeHoverStyle(t, n, i) {
    this._setStyle(t, i, "active", !1);
  }
  setHoverStyle(t, n, i) {
    this._setStyle(t, i, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const n = this._data, i = this._cachedMeta.data;
    for (const [c, u, d] of this._syncList)
      this[c](u, d);
    this._syncList = [];
    const r = i.length, o = n.length, a = Math.min(o, r);
    a && this.parse(0, a), o > r ? this._insertElements(r, o - r, t) : o < r && this._removeElements(o, r - o);
  }
  _insertElements(t, n, i = !0) {
    const r = this._cachedMeta, o = r.data, a = t + n;
    let c;
    const u = (d) => {
      for (d.length += n, c = d.length - 1; c >= a; c--)
        d[c] = d[c - n];
    };
    for (u(o), c = t; c < a; ++c)
      o[c] = new this.dataElementType();
    this._parsing && u(r._parsed), this.parse(t, n), i && this.updateElements(o, t, n, "reset");
  }
  updateElements(t, n, i, r) {
  }
  _removeElements(t, n) {
    const i = this._cachedMeta;
    if (this._parsing) {
      const r = i._parsed.splice(t, n);
      i._stacked && mr(i, r);
    }
    i.data.splice(t, n);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [n, i, r] = t;
      this[n](i, r);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(t, n) {
    n && this._sync([
      "_removeElements",
      t,
      n
    ]);
    const i = arguments.length - 2;
    i && this._sync([
      "_insertElements",
      t,
      i
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
q(Di, "defaults", {}), q(Di, "datasetElementType", null), q(Di, "dataElementType", null);
function Ik(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let i = [];
    for (let r = 0, o = n.length; r < o; r++)
      i = i.concat(n[r].controller.getAllParsedValues(e));
    e._cache.$bar = Av(i.sort((r, o) => r - o));
  }
  return e._cache.$bar;
}
function Rk(e) {
  const t = e.iScale, n = Ik(t, e.type);
  let i = t._length, r, o, a, c;
  const u = () => {
    a === 32767 || a === -32768 || (ao(c) && (i = Math.min(i, Math.abs(a - c) || i)), c = a);
  };
  for (r = 0, o = n.length; r < o; ++r)
    a = t.getPixelForValue(n[r]), u();
  for (c = void 0, r = 0, o = t.ticks.length; r < o; ++r)
    a = t.getPixelForTick(r), u();
  return i;
}
function Dk(e, t, n, i) {
  const r = n.barThickness;
  let o, a;
  return wt(r) ? (o = t.min * n.categoryPercentage, a = n.barPercentage) : (o = r * i, a = 1), {
    chunk: o / i,
    ratio: a,
    start: t.pixels[e] - o / 2
  };
}
function Fk(e, t, n, i) {
  const r = t.pixels, o = r[e];
  let a = e > 0 ? r[e - 1] : null, c = e < r.length - 1 ? r[e + 1] : null;
  const u = n.categoryPercentage;
  a === null && (a = o - (c === null ? t.end - t.start : c - o)), c === null && (c = o + o - a);
  const d = o - (o - Math.min(a, c)) / 2 * u;
  return {
    chunk: Math.abs(c - a) / 2 * u / i,
    ratio: n.barPercentage,
    start: d
  };
}
function Bk(e, t, n, i) {
  const r = n.parse(e[0], i), o = n.parse(e[1], i), a = Math.min(r, o), c = Math.max(r, o);
  let u = a, d = c;
  Math.abs(a) > Math.abs(c) && (u = c, d = a), t[n.axis] = d, t._custom = {
    barStart: u,
    barEnd: d,
    start: r,
    end: o,
    min: a,
    max: c
  };
}
function ey(e, t, n, i) {
  return qt(e) ? Bk(e, t, n, i) : t[n.axis] = n.parse(e, i), t;
}
function fm(e, t, n, i) {
  const r = e.iScale, o = e.vScale, a = r.getLabels(), c = r === o, u = [];
  let d, p, g, v;
  for (d = n, p = n + i; d < p; ++d)
    v = t[d], g = {}, g[r.axis] = c || r.parse(a[d], d), u.push(ey(v, g, o, d));
  return u;
}
function Xc(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Hk(e, t, n) {
  return e !== 0 ? yn(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Wk(e) {
  let t, n, i, r, o;
  return e.horizontal ? (t = e.base > e.x, n = "left", i = "right") : (t = e.base < e.y, n = "bottom", i = "top"), t ? (r = "end", o = "start") : (r = "start", o = "end"), {
    start: n,
    end: i,
    reverse: t,
    top: r,
    bottom: o
  };
}
function Vk(e, t, n, i) {
  let r = t.borderSkipped;
  const o = {};
  if (!r) {
    e.borderSkipped = o;
    return;
  }
  if (r === !0) {
    e.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: a, end: c, reverse: u, top: d, bottom: p } = Wk(e);
  r === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === i ? r = d : (n._bottom || 0) === i ? r = p : (o[pm(p, a, c, u)] = !0, r = d)), o[pm(r, a, c, u)] = !0, e.borderSkipped = o;
}
function pm(e, t, n, i) {
  return i ? (e = Zk(e, t, n), e = mm(e, n, t)) : e = mm(e, t, n), e;
}
function Zk(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function mm(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Uk(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class za extends Di {
  parsePrimitiveData(t, n, i, r) {
    return fm(t, n, i, r);
  }
  parseArrayData(t, n, i, r) {
    return fm(t, n, i, r);
  }
  parseObjectData(t, n, i, r) {
    const { iScale: o, vScale: a } = t, { xAxisKey: c = "x", yAxisKey: u = "y" } = this._parsing, d = o.axis === "x" ? c : u, p = a.axis === "x" ? c : u, g = [];
    let v, y, S, w;
    for (v = i, y = i + r; v < y; ++v)
      w = n[v], S = {}, S[o.axis] = o.parse(Zi(w, d), v), g.push(ey(Zi(w, p), S, a, v));
    return g;
  }
  updateRangeFromParsed(t, n, i, r) {
    super.updateRangeFromParsed(t, n, i, r);
    const o = i._custom;
    o && n === this._cachedMeta.vScale && (t.min = Math.min(t.min, o.min), t.max = Math.max(t.max, o.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, { iScale: i, vScale: r } = n, o = this.getParsed(t), a = o._custom, c = Xc(a) ? "[" + a.start + ", " + a.end + "]" : "" + r.getLabelForValue(o[r.axis]);
    return {
      label: "" + i.getLabelForValue(o[i.axis]),
      value: c
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const n = this._cachedMeta;
    this.updateElements(n.data, 0, n.data.length, t);
  }
  updateElements(t, n, i, r) {
    const o = r === "reset", { index: a, _cachedMeta: { vScale: c } } = this, u = c.getBasePixel(), d = c.isHorizontal(), p = this._getRuler(), { sharedOptions: g, includeOptions: v } = this._getSharedOptions(n, r);
    for (let y = n; y < n + i; y++) {
      const S = this.getParsed(y), w = o || wt(S[c.axis]) ? {
        base: u,
        head: u
      } : this._calculateBarValuePixels(y), M = this._calculateBarIndexPixels(y, p), b = (S._stacks || {})[c.axis], k = {
        horizontal: d,
        base: w.base,
        enableBorderRadius: !b || Xc(S._custom) || a === b._top || a === b._bottom,
        x: d ? w.head : M.center,
        y: d ? M.center : w.head,
        height: d ? M.size : Math.abs(w.size),
        width: d ? Math.abs(w.size) : M.size
      };
      v && (k.options = g || this.resolveDataElementOptions(y, t[y].active ? "active" : r));
      const P = k.options || t[y].options;
      Vk(k, P, b, a), Uk(k, P, p.ratio), this.updateElement(t[y], y, k, r);
    }
  }
  _getStacks(t, n) {
    const { iScale: i } = this._cachedMeta, r = i.getMatchingVisibleMetas(this._type).filter((p) => p.controller.options.grouped), o = i.options.stacked, a = [], c = this._cachedMeta.controller.getParsed(n), u = c && c[i.axis], d = (p) => {
      const g = p._parsed.find((y) => y[i.axis] === u), v = g && g[p.vScale.axis];
      if (wt(v) || isNaN(v))
        return !0;
    };
    for (const p of r)
      if (!(n !== void 0 && d(p)) && ((o === !1 || a.indexOf(p.stack) === -1 || o === void 0 && p.stack === void 0) && a.push(p.stack), p.index === t))
        break;
    return a.length || a.push(void 0), a;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const t = this.chart.scales, n = this.chart.options.indexAxis;
    return Object.keys(t).filter((i) => t[i].axis === n).shift();
  }
  _getAxis() {
    const t = {}, n = this.getFirstScaleIdForIndexAxis();
    for (const i of this.chart.data.datasets)
      t[ut(this.chart.options.indexAxis === "x" ? i.xAxisID : i.yAxisID, n)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, n, i) {
    const r = this._getStacks(t, i), o = n !== void 0 ? r.indexOf(n) : -1;
    return o === -1 ? r.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, n = this._cachedMeta, i = n.iScale, r = [];
    let o, a;
    for (o = 0, a = n.data.length; o < a; ++o)
      r.push(i.getPixelForValue(this.getParsed(o)[i.axis], o));
    const c = t.barThickness;
    return {
      min: c || Rk(n),
      pixels: r,
      start: i._startPixel,
      end: i._endPixel,
      stackCount: this._getStackCount(),
      scale: i,
      grouped: t.grouped,
      ratio: c ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: n, _stacked: i, index: r }, options: { base: o, minBarLength: a } } = this, c = o || 0, u = this.getParsed(t), d = u._custom, p = Xc(d);
    let g = u[n.axis], v = 0, y = i ? this.applyStack(n, u, i) : g, S, w;
    y !== g && (v = y - g, y = g), p && (g = d.barStart, y = d.barEnd - d.barStart, g !== 0 && yn(g) !== yn(d.barEnd) && (v = 0), v += g);
    const M = !wt(o) && !p ? o : v;
    let b = n.getPixelForValue(M);
    if (this.chart.getDataVisibility(t) ? S = n.getPixelForValue(v + y) : S = b, w = S - b, Math.abs(w) < a) {
      w = Hk(w, n, c) * a, g === c && (b -= w / 2);
      const k = n.getPixelForDecimal(0), P = n.getPixelForDecimal(1), T = Math.min(k, P), N = Math.max(k, P);
      b = Math.max(Math.min(b, N), T), S = b + w, i && !p && (u._stacks[n.axis]._visualValues[r] = n.getValueForPixel(S) - n.getValueForPixel(b));
    }
    if (b === n.getPixelForValue(c)) {
      const k = yn(w) * n.getLineWidthForValue(c) / 2;
      b += k, w -= k;
    }
    return {
      size: w,
      base: b,
      head: S,
      center: S + w / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const i = n.scale, r = this.options, o = r.skipNull, a = ut(r.maxBarThickness, 1 / 0);
    let c, u;
    const d = this._getAxisCount();
    if (n.grouped) {
      const p = o ? this._getStackCount(t) : n.stackCount, g = r.barThickness === "flex" ? Fk(t, n, r, p * d) : Dk(t, n, r, p * d), v = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, y = this._getAxis().indexOf(ut(v, this.getFirstScaleIdForIndexAxis())), S = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + y;
      c = g.start + g.chunk * S + g.chunk / 2, u = Math.min(a, g.chunk * g.ratio);
    } else
      c = i.getPixelForValue(this.getParsed(t)[i.axis], t), u = Math.min(a, n.min * n.ratio);
    return {
      base: c - u / 2,
      head: c + u / 2,
      center: c,
      size: u
    };
  }
  draw() {
    const t = this._cachedMeta, n = t.vScale, i = t.data, r = i.length;
    let o = 0;
    for (; o < r; ++o)
      this.getParsed(o)[n.axis] !== null && !i[o].hidden && i[o].draw(this._ctx);
  }
}
q(za, "id", "bar"), q(za, "defaults", {
  datasetElementType: !1,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: !0,
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "base",
        "width",
        "height"
      ]
    }
  }
}), q(za, "overrides", {
  scales: {
    _index_: {
      type: "category",
      offset: !0,
      grid: {
        offset: !0
      }
    },
    _value_: {
      type: "linear",
      beginAtZero: !0
    }
  }
});
function $k(e, t, n) {
  let i = 1, r = 1, o = 0, a = 0;
  if (t < Ot) {
    const c = e, u = c + t, d = Math.cos(c), p = Math.sin(c), g = Math.cos(u), v = Math.sin(u), y = (P, T, N) => co(P, c, u, !0) ? 1 : Math.max(T, T * n, N, N * n), S = (P, T, N) => co(P, c, u, !0) ? -1 : Math.min(T, T * n, N, N * n), w = y(0, d, g), M = y(Xt, p, v), b = S(Pt, d, g), k = S(Pt + Xt, p, v);
    i = (w - b) / 2, r = (M - k) / 2, o = -(w + b) / 2, a = -(M + k) / 2;
  }
  return {
    ratioX: i,
    ratioY: r,
    offsetX: o,
    offsetY: a
  };
}
class Pr extends Di {
  constructor(t, n) {
    super(t, n), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, n) {
    const i = this.getDataset().data, r = this._cachedMeta;
    if (this._parsing === !1)
      r._parsed = i;
    else {
      let o = (u) => +i[u];
      if (mt(i[t])) {
        const { key: u = "value" } = this._parsing;
        o = (d) => +Zi(i[d], u);
      }
      let a, c;
      for (a = t, c = t + n; a < c; ++a)
        r._parsed[a] = o(a);
    }
  }
  _getRotation() {
    return zn(this.options.rotation - 90);
  }
  _getCircumference() {
    return zn(this.options.circumference);
  }
  _getRotationExtents() {
    let t = Ot, n = -Ot;
    for (let i = 0; i < this.chart.data.datasets.length; ++i)
      if (this.chart.isDatasetVisible(i) && this.chart.getDatasetMeta(i).type === this._type) {
        const r = this.chart.getDatasetMeta(i).controller, o = r._getRotation(), a = r._getCircumference();
        t = Math.min(t, o), n = Math.max(n, o + a);
      }
    return {
      rotation: t,
      circumference: n - t
    };
  }
  update(t) {
    const n = this.chart, { chartArea: i } = n, r = this._cachedMeta, o = r.data, a = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, c = Math.max((Math.min(i.width, i.height) - a) / 2, 0), u = Math.min(tb(this.options.cutout, c), 1), d = this._getRingWeight(this.index), { circumference: p, rotation: g } = this._getRotationExtents(), { ratioX: v, ratioY: y, offsetX: S, offsetY: w } = $k(g, p, u), M = (i.width - a) / v, b = (i.height - a) / y, k = Math.max(Math.min(M, b) / 2, 0), P = Nv(this.options.radius, k), T = Math.max(P * u, 0), N = (P - T) / this._getVisibleDatasetWeightTotal();
    this.offsetX = S * P, this.offsetY = w * P, r.total = this.calculateTotal(), this.outerRadius = P - N * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - N * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const i = this.options, r = this._cachedMeta, o = this._getCircumference();
    return n && i.animation.animateRotate || !this.chart.getDataVisibility(t) || r._parsed[t] === null || r.data[t].hidden ? 0 : this.calculateCircumference(r._parsed[t] * o / Ot);
  }
  updateElements(t, n, i, r) {
    const o = r === "reset", a = this.chart, c = a.chartArea, d = a.options.animation, p = (c.left + c.right) / 2, g = (c.top + c.bottom) / 2, v = o && d.animateScale, y = v ? 0 : this.innerRadius, S = v ? 0 : this.outerRadius, { sharedOptions: w, includeOptions: M } = this._getSharedOptions(n, r);
    let b = this._getRotation(), k;
    for (k = 0; k < n; ++k)
      b += this._circumference(k, o);
    for (k = n; k < n + i; ++k) {
      const P = this._circumference(k, o), T = t[k], N = {
        x: p + this.offsetX,
        y: g + this.offsetY,
        startAngle: b,
        endAngle: b + P,
        circumference: P,
        outerRadius: S,
        innerRadius: y
      };
      M && (N.options = w || this.resolveDataElementOptions(k, T.active ? "active" : r)), b += P, this.updateElement(T, k, N, r);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, n = t.data;
    let i = 0, r;
    for (r = 0; r < n.length; r++) {
      const o = t._parsed[r];
      o !== null && !isNaN(o) && this.chart.getDataVisibility(r) && !n[r].hidden && (i += Math.abs(o));
    }
    return i;
  }
  calculateCircumference(t) {
    const n = this._cachedMeta.total;
    return n > 0 && !isNaN(t) ? Ot * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, i = this.chart, r = i.data.labels || [], o = md(n._parsed[t], i.options.locale);
    return {
      label: r[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const i = this.chart;
    let r, o, a, c, u;
    if (!t) {
      for (r = 0, o = i.data.datasets.length; r < o; ++r)
        if (i.isDatasetVisible(r)) {
          a = i.getDatasetMeta(r), t = a.data, c = a.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (r = 0, o = t.length; r < o; ++r)
      u = c.resolveDataElementOptions(r), u.borderAlign !== "inner" && (n = Math.max(n, u.borderWidth || 0, u.hoverBorderWidth || 0));
    return n;
  }
  getMaxOffset(t) {
    let n = 0;
    for (let i = 0, r = t.length; i < r; ++i) {
      const o = this.resolveDataElementOptions(i);
      n = Math.max(n, o.offset || 0, o.hoverOffset || 0);
    }
    return n;
  }
  _getRingWeightOffset(t) {
    let n = 0;
    for (let i = 0; i < t; ++i)
      this.chart.isDatasetVisible(i) && (n += this._getRingWeight(i));
    return n;
  }
  _getRingWeight(t) {
    return Math.max(ut(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
q(Pr, "id", "doughnut"), q(Pr, "defaults", {
  datasetElementType: !1,
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !1
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "circumference",
        "endAngle",
        "innerRadius",
        "outerRadius",
        "startAngle",
        "x",
        "y",
        "offset",
        "borderWidth",
        "spacing"
      ]
    }
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r"
}), q(Pr, "descriptors", {
  _scriptable: (t) => t !== "spacing",
  _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
}), q(Pr, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(t) {
          const n = t.data, { labels: { pointStyle: i, textAlign: r, color: o, useBorderRadius: a, borderRadius: c } } = t.legend.options;
          return n.labels.length && n.datasets.length ? n.labels.map((u, d) => {
            const g = t.getDatasetMeta(0).controller.getStyle(d);
            return {
              text: u,
              fillStyle: g.backgroundColor,
              fontColor: o,
              hidden: !t.getDataVisibility(d),
              lineDash: g.borderDash,
              lineDashOffset: g.borderDashOffset,
              lineJoin: g.borderJoinStyle,
              lineWidth: g.borderWidth,
              strokeStyle: g.borderColor,
              textAlign: r,
              pointStyle: i,
              borderRadius: a && (c || g.borderRadius),
              index: d
            };
          }) : [];
        }
      },
      onClick(t, n, i) {
        i.chart.toggleDataVisibility(n.index), i.chart.update();
      }
    }
  }
});
class ja extends Di {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const n = this._cachedMeta, { dataset: i, data: r = [], _dataset: o } = n, a = this.chart._animationsDisabled;
    let { start: c, count: u } = xb(n, r, a);
    this._drawStart = c, this._drawCount = u, wb(n) && (c = 0, u = r.length), i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!o._decimated, i.points = r;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(i, void 0, {
      animated: !a,
      options: d
    }, t), this.updateElements(r, c, u, t);
  }
  updateElements(t, n, i, r) {
    const o = r === "reset", { iScale: a, vScale: c, _stacked: u, _dataset: d } = this._cachedMeta, { sharedOptions: p, includeOptions: g } = this._getSharedOptions(n, r), v = a.axis, y = c.axis, { spanGaps: S, segment: w } = this.options, M = lo(S) ? S : Number.POSITIVE_INFINITY, b = this.chart._animationsDisabled || o || r === "none", k = n + i, P = t.length;
    let T = n > 0 && this.getParsed(n - 1);
    for (let N = 0; N < P; ++N) {
      const j = t[N], O = b ? j : {};
      if (N < n || N >= k) {
        O.skip = !0;
        continue;
      }
      const A = this.getParsed(N), H = wt(A[y]), F = O[v] = a.getPixelForValue(A[v], N), V = O[y] = o || H ? c.getBasePixel() : c.getPixelForValue(u ? this.applyStack(c, A, u) : A[y], N);
      O.skip = isNaN(F) || isNaN(V) || H, O.stop = N > 0 && Math.abs(A[v] - T[v]) > M, w && (O.parsed = A, O.raw = d.data[N]), g && (O.options = p || this.resolveDataElementOptions(N, j.active ? "active" : r)), b || this.updateElement(j, N, O, r), T = A;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.dataset, i = n.options && n.options.borderWidth || 0, r = t.data || [];
    if (!r.length)
      return i;
    const o = r[0].size(this.resolveDataElementOptions(0)), a = r[r.length - 1].size(this.resolveDataElementOptions(r.length - 1));
    return Math.max(i, o, a) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
q(ja, "id", "line"), q(ja, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), q(ja, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
function Mi() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class bd {
  constructor(t) {
    q(this, "options");
    this.options = t || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(bd.prototype, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Mi();
  }
  parse() {
    return Mi();
  }
  format() {
    return Mi();
  }
  add() {
    return Mi();
  }
  diff() {
    return Mi();
  }
  startOf() {
    return Mi();
  }
  endOf() {
    return Mi();
  }
}
var Yk = {
  _date: bd
};
function qk(e, t, n, i) {
  const { controller: r, data: o, _sorted: a } = e, c = r._cachedMeta.iScale, u = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (c && t === c.axis && t !== "r" && a && o.length) {
    const d = c._reversePixels ? mb : Oi;
    if (i) {
      if (r._sharedOptions) {
        const p = o[0], g = typeof p.getRange == "function" && p.getRange(t);
        if (g) {
          const v = d(o, t, n - g), y = d(o, t, n + g);
          return {
            lo: v.lo,
            hi: y.hi
          };
        }
      }
    } else {
      const p = d(o, t, n);
      if (u) {
        const { vScale: g } = r._cachedMeta, { _parsed: v } = e, y = v.slice(0, p.lo + 1).reverse().findIndex((w) => !wt(w[g.axis]));
        p.lo -= Math.max(0, y);
        const S = v.slice(p.hi).findIndex((w) => !wt(w[g.axis]));
        p.hi += Math.max(0, S);
      }
      return p;
    }
  }
  return {
    lo: 0,
    hi: o.length - 1
  };
}
function Rl(e, t, n, i, r) {
  const o = e.getSortedVisibleDatasetMetas(), a = n[t];
  for (let c = 0, u = o.length; c < u; ++c) {
    const { index: d, data: p } = o[c], { lo: g, hi: v } = qk(o[c], t, a, r);
    for (let y = g; y <= v; ++y) {
      const S = p[y];
      S.skip || i(S, d, y);
    }
  }
}
function Kk(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(i, r) {
    const o = t ? Math.abs(i.x - r.x) : 0, a = n ? Math.abs(i.y - r.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(a, 2));
  };
}
function Gc(e, t, n, i, r) {
  const o = [];
  return !r && !e.isPointInArea(t) || Rl(e, n, t, function(c, u, d) {
    !r && !uo(c, e.chartArea, 0) || c.inRange(t.x, t.y, i) && o.push({
      element: c,
      datasetIndex: u,
      index: d
    });
  }, !0), o;
}
function Xk(e, t, n, i) {
  let r = [];
  function o(a, c, u) {
    const { startAngle: d, endAngle: p } = a.getProps([
      "startAngle",
      "endAngle"
    ], i), { angle: g } = jv(a, {
      x: t.x,
      y: t.y
    });
    co(g, d, p) && r.push({
      element: a,
      datasetIndex: c,
      index: u
    });
  }
  return Rl(e, n, t, o), r;
}
function Gk(e, t, n, i, r, o) {
  let a = [];
  const c = Kk(n);
  let u = Number.POSITIVE_INFINITY;
  function d(p, g, v) {
    const y = p.inRange(t.x, t.y, r);
    if (i && !y)
      return;
    const S = p.getCenterPoint(r);
    if (!(!!o || e.isPointInArea(S)) && !y)
      return;
    const M = c(t, S);
    M < u ? (a = [
      {
        element: p,
        datasetIndex: g,
        index: v
      }
    ], u = M) : M === u && a.push({
      element: p,
      datasetIndex: g,
      index: v
    });
  }
  return Rl(e, n, t, d), a;
}
function Qc(e, t, n, i, r, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !i ? Xk(e, t, n, r) : Gk(e, t, n, i, r, o);
}
function gm(e, t, n, i, r) {
  const o = [], a = n === "x" ? "inXRange" : "inYRange";
  let c = !1;
  return Rl(e, n, t, (u, d, p) => {
    u[a] && u[a](t[n], r) && (o.push({
      element: u,
      datasetIndex: d,
      index: p
    }), c = c || u.inRange(t.x, t.y, r));
  }), i && !c ? [] : o;
}
var Qk = {
  modes: {
    index(e, t, n, i) {
      const r = Ti(t, e), o = n.axis || "x", a = n.includeInvisible || !1, c = n.intersect ? Gc(e, r, o, i, a) : Qc(e, r, o, !1, i, a), u = [];
      return c.length ? (e.getSortedVisibleDatasetMetas().forEach((d) => {
        const p = c[0].index, g = d.data[p];
        g && !g.skip && u.push({
          element: g,
          datasetIndex: d.index,
          index: p
        });
      }), u) : [];
    },
    dataset(e, t, n, i) {
      const r = Ti(t, e), o = n.axis || "xy", a = n.includeInvisible || !1;
      let c = n.intersect ? Gc(e, r, o, i, a) : Qc(e, r, o, !1, i, a);
      if (c.length > 0) {
        const u = c[0].datasetIndex, d = e.getDatasetMeta(u).data;
        c = [];
        for (let p = 0; p < d.length; ++p)
          c.push({
            element: d[p],
            datasetIndex: u,
            index: p
          });
      }
      return c;
    },
    point(e, t, n, i) {
      const r = Ti(t, e), o = n.axis || "xy", a = n.includeInvisible || !1;
      return Gc(e, r, o, i, a);
    },
    nearest(e, t, n, i) {
      const r = Ti(t, e), o = n.axis || "xy", a = n.includeInvisible || !1;
      return Qc(e, r, o, n.intersect, i, a);
    },
    x(e, t, n, i) {
      const r = Ti(t, e);
      return gm(e, r, "x", n.intersect, i);
    },
    y(e, t, n, i) {
      const r = Ti(t, e);
      return gm(e, r, "y", n.intersect, i);
    }
  }
};
const ny = [
  "left",
  "top",
  "right",
  "bottom"
];
function gr(e, t) {
  return e.filter((n) => n.pos === t);
}
function _m(e, t) {
  return e.filter((n) => ny.indexOf(n.pos) === -1 && n.box.axis === t);
}
function _r(e, t) {
  return e.sort((n, i) => {
    const r = t ? i : n, o = t ? n : i;
    return r.weight === o.weight ? r.index - o.index : r.weight - o.weight;
  });
}
function Jk(e) {
  const t = [];
  let n, i, r, o, a, c;
  for (n = 0, i = (e || []).length; n < i; ++n)
    r = e[n], { position: o, options: { stack: a, stackWeight: c = 1 } } = r, t.push({
      index: n,
      box: r,
      pos: o,
      horizontal: r.isHorizontal(),
      weight: r.weight,
      stack: a && o + a,
      stackWeight: c
    });
  return t;
}
function t2(e) {
  const t = {};
  for (const n of e) {
    const { stack: i, pos: r, stackWeight: o } = n;
    if (!i || !ny.includes(r))
      continue;
    const a = t[i] || (t[i] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    a.count++, a.weight += o;
  }
  return t;
}
function e2(e, t) {
  const n = t2(e), { vBoxMaxWidth: i, hBoxMaxHeight: r } = t;
  let o, a, c;
  for (o = 0, a = e.length; o < a; ++o) {
    c = e[o];
    const { fullSize: u } = c.box, d = n[c.stack], p = d && c.stackWeight / d.weight;
    c.horizontal ? (c.width = p ? p * i : u && t.availableWidth, c.height = r) : (c.width = i, c.height = p ? p * r : u && t.availableHeight);
  }
  return n;
}
function n2(e) {
  const t = Jk(e), n = _r(t.filter((d) => d.box.fullSize), !0), i = _r(gr(t, "left"), !0), r = _r(gr(t, "right")), o = _r(gr(t, "top"), !0), a = _r(gr(t, "bottom")), c = _m(t, "x"), u = _m(t, "y");
  return {
    fullSize: n,
    leftAndTop: i.concat(o),
    rightAndBottom: r.concat(u).concat(a).concat(c),
    chartArea: gr(t, "chartArea"),
    vertical: i.concat(r).concat(u),
    horizontal: o.concat(a).concat(c)
  };
}
function vm(e, t, n, i) {
  return Math.max(e[n], t[n]) + Math.max(e[i], t[i]);
}
function iy(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function i2(e, t, n, i) {
  const { pos: r, box: o } = n, a = e.maxPadding;
  if (!mt(r)) {
    n.size && (e[r] -= n.size);
    const g = i[n.stack] || {
      size: 0,
      count: 1
    };
    g.size = Math.max(g.size, n.horizontal ? o.height : o.width), n.size = g.size / g.count, e[r] += n.size;
  }
  o.getPadding && iy(a, o.getPadding());
  const c = Math.max(0, t.outerWidth - vm(a, e, "left", "right")), u = Math.max(0, t.outerHeight - vm(a, e, "top", "bottom")), d = c !== e.w, p = u !== e.h;
  return e.w = c, e.h = u, n.horizontal ? {
    same: d,
    other: p
  } : {
    same: p,
    other: d
  };
}
function s2(e) {
  const t = e.maxPadding;
  function n(i) {
    const r = Math.max(t[i] - e[i], 0);
    return e[i] += r, r;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function r2(e, t) {
  const n = t.maxPadding;
  function i(r) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return r.forEach((a) => {
      o[a] = Math.max(t[a], n[a]);
    }), o;
  }
  return i(e ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function Mr(e, t, n, i) {
  const r = [];
  let o, a, c, u, d, p;
  for (o = 0, a = e.length, d = 0; o < a; ++o) {
    c = e[o], u = c.box, u.update(c.width || t.w, c.height || t.h, r2(c.horizontal, t));
    const { same: g, other: v } = i2(t, n, c, i);
    d |= g && r.length, p = p || v, u.fullSize || r.push(c);
  }
  return d && Mr(r, t, n, i) || p;
}
function da(e, t, n, i, r) {
  e.top = n, e.left = t, e.right = t + i, e.bottom = n + r, e.width = i, e.height = r;
}
function ym(e, t, n, i) {
  const r = n.padding;
  let { x: o, y: a } = t;
  for (const c of e) {
    const u = c.box, d = i[c.stack] || {
      placed: 0,
      weight: 1
    }, p = c.stackWeight / d.weight || 1;
    if (c.horizontal) {
      const g = t.w * p, v = d.size || u.height;
      ao(d.start) && (a = d.start), u.fullSize ? da(u, r.left, a, n.outerWidth - r.right - r.left, v) : da(u, t.left + d.placed, a, g, v), d.start = a, d.placed += g, a = u.bottom;
    } else {
      const g = t.h * p, v = d.size || u.width;
      ao(d.start) && (o = d.start), u.fullSize ? da(u, o, r.top, v, n.outerHeight - r.bottom - r.top) : da(u, o, t.top + d.placed, v, g), d.start = o, d.placed += g, o = u.right;
    }
  }
  t.x = o, t.y = a;
}
var ti = {
  addBox(e, t) {
    e.boxes || (e.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(n) {
            t.draw(n);
          }
        }
      ];
    }, e.boxes.push(t);
  },
  removeBox(e, t) {
    const n = e.boxes ? e.boxes.indexOf(t) : -1;
    n !== -1 && e.boxes.splice(n, 1);
  },
  configure(e, t, n) {
    t.fullSize = n.fullSize, t.position = n.position, t.weight = n.weight;
  },
  update(e, t, n, i) {
    if (!e)
      return;
    const r = rn(e.options.layout.padding), o = Math.max(t - r.width, 0), a = Math.max(n - r.height, 0), c = n2(e.boxes), u = c.vertical, d = c.horizontal;
    bt(e.boxes, (w) => {
      typeof w.beforeLayout == "function" && w.beforeLayout();
    });
    const p = u.reduce((w, M) => M.box.options && M.box.options.display === !1 ? w : w + 1, 0) || 1, g = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: r,
      availableWidth: o,
      availableHeight: a,
      vBoxMaxWidth: o / 2 / p,
      hBoxMaxHeight: a / 2
    }), v = Object.assign({}, r);
    iy(v, rn(i));
    const y = Object.assign({
      maxPadding: v,
      w: o,
      h: a,
      x: r.left,
      y: r.top
    }, r), S = e2(u.concat(d), g);
    Mr(c.fullSize, y, g, S), Mr(u, y, g, S), Mr(d, y, g, S) && Mr(u, y, g, S), s2(y), ym(c.leftAndTop, y, g, S), y.x += y.w, y.y += y.h, ym(c.rightAndBottom, y, g, S), e.chartArea = {
      left: y.left,
      top: y.top,
      right: y.left + y.w,
      bottom: y.top + y.h,
      height: y.h,
      width: y.w
    }, bt(c.chartArea, (w) => {
      const M = w.box;
      Object.assign(M, e.chartArea), M.update(y.w, y.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class sy {
  acquireContext(t, n) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, n, i) {
  }
  removeEventListener(t, n, i) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, n, i, r) {
    return n = Math.max(0, n || t.width), i = i || t.height, {
      width: n,
      height: Math.max(0, r ? Math.floor(n / r) : i)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class o2 extends sy {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Oa = "$chartjs", a2 = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, xm = (e) => e === null || e === "";
function l2(e, t) {
  const n = e.style, i = e.getAttribute("height"), r = e.getAttribute("width");
  if (e[Oa] = {
    initial: {
      height: i,
      width: r,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", xm(r)) {
    const o = im(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (xm(i))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = im(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const ry = uk ? {
  passive: !0
} : !1;
function c2(e, t, n) {
  e && e.addEventListener(t, n, ry);
}
function u2(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, ry);
}
function h2(e, t) {
  const n = a2[e.type] || e.type, { x: i, y: r } = Ti(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: i !== void 0 ? i : null,
    y: r !== void 0 ? r : null
  };
}
function pl(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function d2(e, t, n) {
  const i = e.canvas, r = new MutationObserver((o) => {
    let a = !1;
    for (const c of o)
      a = a || pl(c.addedNodes, i), a = a && !pl(c.removedNodes, i);
    a && n();
  });
  return r.observe(document, {
    childList: !0,
    subtree: !0
  }), r;
}
function f2(e, t, n) {
  const i = e.canvas, r = new MutationObserver((o) => {
    let a = !1;
    for (const c of o)
      a = a || pl(c.removedNodes, i), a = a && !pl(c.addedNodes, i);
    a && n();
  });
  return r.observe(document, {
    childList: !0,
    subtree: !0
  }), r;
}
const ho = /* @__PURE__ */ new Map();
let wm = 0;
function oy() {
  const e = window.devicePixelRatio;
  e !== wm && (wm = e, ho.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function p2(e, t) {
  ho.size || window.addEventListener("resize", oy), ho.set(e, t);
}
function m2(e) {
  ho.delete(e), ho.size || window.removeEventListener("resize", oy);
}
function g2(e, t, n) {
  const i = e.canvas, r = i && wd(i);
  if (!r)
    return;
  const o = Rv((c, u) => {
    const d = r.clientWidth;
    n(c, u), d < r.clientWidth && n();
  }, window), a = new ResizeObserver((c) => {
    const u = c[0], d = u.contentRect.width, p = u.contentRect.height;
    d === 0 && p === 0 || o(d, p);
  });
  return a.observe(r), p2(e, o), a;
}
function Jc(e, t, n) {
  n && n.disconnect(), t === "resize" && m2(e);
}
function _2(e, t, n) {
  const i = e.canvas, r = Rv((o) => {
    e.ctx !== null && n(h2(o, e));
  }, e);
  return c2(i, t, r), r;
}
class v2 extends sy {
  acquireContext(t, n) {
    const i = t && t.getContext && t.getContext("2d");
    return i && i.canvas === t ? (l2(t, n), i) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[Oa])
      return !1;
    const i = n[Oa].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const a = i[o];
      wt(a) ? n.removeAttribute(o) : n.setAttribute(o, a);
    });
    const r = i.style || {};
    return Object.keys(r).forEach((o) => {
      n.style[o] = r[o];
    }), n.width = n.width, delete n[Oa], !0;
  }
  addEventListener(t, n, i) {
    this.removeEventListener(t, n);
    const r = t.$proxies || (t.$proxies = {}), a = {
      attach: d2,
      detach: f2,
      resize: g2
    }[n] || _2;
    r[n] = a(t, n, i);
  }
  removeEventListener(t, n) {
    const i = t.$proxies || (t.$proxies = {}), r = i[n];
    if (!r)
      return;
    ({
      attach: Jc,
      detach: Jc,
      resize: Jc
    }[n] || u2)(t, n, r), i[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, i, r) {
    return ck(t, n, i, r);
  }
  isAttached(t) {
    const n = t && wd(t);
    return !!(n && n.isConnected);
  }
}
function y2(e) {
  return !xd() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? o2 : v2;
}
var ya;
let vi = (ya = class {
  constructor() {
    q(this, "x");
    q(this, "y");
    q(this, "active", !1);
    q(this, "options");
    q(this, "$animations");
  }
  tooltipPosition(t) {
    const { x: n, y: i } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: n,
      y: i
    };
  }
  hasValue() {
    return lo(this.x) && lo(this.y);
  }
  getProps(t, n) {
    const i = this.$animations;
    if (!n || !i)
      return this;
    const r = {};
    return t.forEach((o) => {
      r[o] = i[o] && i[o].active() ? i[o]._to : this[o];
    }), r;
  }
}, q(ya, "defaults", {}), q(ya, "defaultRoutes"), ya);
function x2(e, t) {
  const n = e.options.ticks, i = w2(e), r = Math.min(n.maxTicksLimit || i, i), o = n.major.enabled ? k2(t) : [], a = o.length, c = o[0], u = o[a - 1], d = [];
  if (a > r)
    return S2(t, d, o, a / r), d;
  const p = b2(o, t, r);
  if (a > 0) {
    let g, v;
    const y = a > 1 ? Math.round((u - c) / (a - 1)) : null;
    for (fa(t, d, p, wt(y) ? 0 : c - y, c), g = 0, v = a - 1; g < v; g++)
      fa(t, d, p, o[g], o[g + 1]);
    return fa(t, d, p, u, wt(y) ? t.length : u + y), d;
  }
  return fa(t, d, p), d;
}
function w2(e) {
  const t = e.options.offset, n = e._tickSize(), i = e._length / n + (t ? 0 : 1), r = e._maxLength / n;
  return Math.floor(Math.min(i, r));
}
function b2(e, t, n) {
  const i = P2(e), r = t.length / n;
  if (!i)
    return Math.max(r, 1);
  const o = lb(i);
  for (let a = 0, c = o.length - 1; a < c; a++) {
    const u = o[a];
    if (u > r)
      return u;
  }
  return Math.max(r, 1);
}
function k2(e) {
  const t = [];
  let n, i;
  for (n = 0, i = e.length; n < i; n++)
    e[n].major && t.push(n);
  return t;
}
function S2(e, t, n, i) {
  let r = 0, o = n[0], a;
  for (i = Math.ceil(i), a = 0; a < e.length; a++)
    a === o && (t.push(e[a]), r++, o = n[r * i]);
}
function fa(e, t, n, i, r) {
  const o = ut(i, 0), a = Math.min(ut(r, e.length), e.length);
  let c = 0, u, d, p;
  for (n = Math.ceil(n), r && (u = r - i, n = u / Math.floor(u / n)), p = o; p < 0; )
    c++, p = Math.round(o + c * n);
  for (d = Math.max(o, 0); d < a; d++)
    d === p && (t.push(e[d]), c++, p = Math.round(o + c * n));
}
function P2(e) {
  const t = e.length;
  let n, i;
  if (t < 2)
    return !1;
  for (i = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== i)
      return !1;
  return i;
}
const M2 = (e) => e === "left" ? "right" : e === "right" ? "left" : e, bm = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, km = (e, t) => Math.min(t || e, e);
function Sm(e, t) {
  const n = [], i = e.length / t, r = e.length;
  let o = 0;
  for (; o < r; o += i)
    n.push(e[Math.floor(o)]);
  return n;
}
function C2(e, t, n) {
  const i = e.ticks.length, r = Math.min(t, i - 1), o = e._startPixel, a = e._endPixel, c = 1e-6;
  let u = e.getPixelForTick(r), d;
  if (!(n && (i === 1 ? d = Math.max(u - o, a - u) : t === 0 ? d = (e.getPixelForTick(1) - u) / 2 : d = (u - e.getPixelForTick(r - 1)) / 2, u += r < t ? d : -d, u < o - c || u > a + c)))
    return u;
}
function L2(e, t) {
  bt(e, (n) => {
    const i = n.gc, r = i.length / 2;
    let o;
    if (r > t) {
      for (o = 0; o < r; ++o)
        delete n.data[i[o]];
      i.splice(0, r);
    }
  });
}
function vr(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Pm(e, t) {
  if (!e.display)
    return 0;
  const n = Se(e.font, t), i = rn(e.padding);
  return (qt(e.text) ? e.text.length : 1) * n.lineHeight + i.height;
}
function T2(e, t) {
  return qi(e, {
    scale: t,
    type: "scale"
  });
}
function N2(e, t, n) {
  return qi(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function E2(e, t, n) {
  let i = Dv(e);
  return (n && t !== "right" || !n && t === "right") && (i = M2(i)), i;
}
function z2(e, t, n, i) {
  const { top: r, left: o, bottom: a, right: c, chart: u } = e, { chartArea: d, scales: p } = u;
  let g = 0, v, y, S;
  const w = a - r, M = c - o;
  if (e.isHorizontal()) {
    if (y = Te(i, o, c), mt(n)) {
      const b = Object.keys(n)[0], k = n[b];
      S = p[b].getPixelForValue(k) + w - t;
    } else n === "center" ? S = (d.bottom + d.top) / 2 + w - t : S = bm(e, n, t);
    v = c - o;
  } else {
    if (mt(n)) {
      const b = Object.keys(n)[0], k = n[b];
      y = p[b].getPixelForValue(k) - M + t;
    } else n === "center" ? y = (d.left + d.right) / 2 - M + t : y = bm(e, n, t);
    S = Te(i, a, r), g = n === "left" ? -Xt : Xt;
  }
  return {
    titleX: y,
    titleY: S,
    maxWidth: v,
    rotation: g
  };
}
class Vs extends vi {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, n) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: n, _suggestedMin: i, _suggestedMax: r } = this;
    return t = hn(t, Number.POSITIVE_INFINITY), n = hn(n, Number.NEGATIVE_INFINITY), i = hn(i, Number.POSITIVE_INFINITY), r = hn(r, Number.NEGATIVE_INFINITY), {
      min: hn(t, i),
      max: hn(n, r),
      minDefined: de(t),
      maxDefined: de(n)
    };
  }
  getMinMax(t) {
    let { min: n, max: i, minDefined: r, maxDefined: o } = this.getUserBounds(), a;
    if (r && o)
      return {
        min: n,
        max: i
      };
    const c = this.getMatchingVisibleMetas();
    for (let u = 0, d = c.length; u < d; ++u)
      a = c[u].controller.getMinMax(this, t), r || (n = Math.min(n, a.min)), o || (i = Math.max(i, a.max));
    return n = o && n > i ? i : n, i = r && n > i ? n : i, {
      min: hn(n, hn(i, n)),
      max: hn(i, hn(n, i))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    Tt(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, n, i) {
    const { beginAtZero: r, grace: o, ticks: a } = this.options, c = a.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = n, this._margins = i = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, i), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + i.left + i.right : this.height + i.top + i.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Hb(this, o, r), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const u = c < this.ticks.length;
    this._convertTicksToLabels(u ? Sm(this.ticks, c) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), a.display && (a.autoSkip || a.source === "auto") && (this.ticks = x2(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), u && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, i;
    this.isHorizontal() ? (n = this.left, i = this.right) : (n = this.top, i = this.bottom, t = !t), this._startPixel = n, this._endPixel = i, this._reversePixels = t, this._length = i - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Tt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Tt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Tt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Tt(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    Tt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let i, r, o;
    for (i = 0, r = t.length; i < r; i++)
      o = t[i], o.label = Tt(n.callback, [
        o.value,
        i,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Tt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Tt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, i = km(this.ticks.length, t.ticks.maxTicksLimit), r = n.minRotation || 0, o = n.maxRotation;
    let a = r, c, u, d;
    if (!this._isVisible() || !n.display || r >= o || i <= 1 || !this.isHorizontal()) {
      this.labelRotation = r;
      return;
    }
    const p = this._getLabelSizes(), g = p.widest.width, v = p.highest.height, y = ue(this.chart.width - g, 0, this.maxWidth);
    c = t.offset ? this.maxWidth / i : y / (i - 1), g + 6 > c && (c = y / (i - (t.offset ? 0.5 : 1)), u = this.maxHeight - vr(t.grid) - n.padding - Pm(t.title, this.chart.options.font), d = Math.sqrt(g * g + v * v), a = db(Math.min(Math.asin(ue((p.highest.height + 6) / c, -1, 1)), Math.asin(ue(u / d, -1, 1)) - Math.asin(ue(v / d, -1, 1)))), a = Math.max(r, Math.min(o, a))), this.labelRotation = a;
  }
  afterCalculateLabelRotation() {
    Tt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Tt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: i, title: r, grid: o } } = this, a = this._isVisible(), c = this.isHorizontal();
    if (a) {
      const u = Pm(r, n.options.font);
      if (c ? (t.width = this.maxWidth, t.height = vr(o) + u) : (t.height = this.maxHeight, t.width = vr(o) + u), i.display && this.ticks.length) {
        const { first: d, last: p, widest: g, highest: v } = this._getLabelSizes(), y = i.padding * 2, S = zn(this.labelRotation), w = Math.cos(S), M = Math.sin(S);
        if (c) {
          const b = i.mirror ? 0 : M * g.width + w * v.height;
          t.height = Math.min(this.maxHeight, t.height + b + y);
        } else {
          const b = i.mirror ? 0 : w * g.width + M * v.height;
          t.width = Math.min(this.maxWidth, t.width + b + y);
        }
        this._calculatePadding(d, p, M, w);
      }
    }
    this._handleMargins(), c ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, i, r) {
    const { ticks: { align: o, padding: a }, position: c } = this.options, u = this.labelRotation !== 0, d = c !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const p = this.getPixelForTick(0) - this.left, g = this.right - this.getPixelForTick(this.ticks.length - 1);
      let v = 0, y = 0;
      u ? d ? (v = r * t.width, y = i * n.height) : (v = i * t.height, y = r * n.width) : o === "start" ? y = n.width : o === "end" ? v = t.width : o !== "inner" && (v = t.width / 2, y = n.width / 2), this.paddingLeft = Math.max((v - p + a) * this.width / (this.width - p), 0), this.paddingRight = Math.max((y - g + a) * this.width / (this.width - g), 0);
    } else {
      let p = n.height / 2, g = t.height / 2;
      o === "start" ? (p = 0, g = t.height) : o === "end" && (p = n.height, g = 0), this.paddingTop = p + a, this.paddingBottom = g + a;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Tt(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: n } = this.options;
    return n === "top" || n === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let n, i;
    for (n = 0, i = t.length; n < i; n++)
      wt(t[n].label) && (t.splice(n, 1), i--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let i = this.ticks;
      n < i.length && (i = Sm(i, n)), this._labelSizes = t = this._computeLabelSizes(i, i.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, i) {
    const { ctx: r, _longestTextCache: o } = this, a = [], c = [], u = Math.floor(n / km(n, i));
    let d = 0, p = 0, g, v, y, S, w, M, b, k, P, T, N;
    for (g = 0; g < n; g += u) {
      if (S = t[g].label, w = this._resolveTickFontOptions(g), r.font = M = w.string, b = o[M] = o[M] || {
        data: {},
        gc: []
      }, k = w.lineHeight, P = T = 0, !wt(S) && !qt(S))
        P = Qp(r, b.data, b.gc, P, S), T = k;
      else if (qt(S))
        for (v = 0, y = S.length; v < y; ++v)
          N = S[v], !wt(N) && !qt(N) && (P = Qp(r, b.data, b.gc, P, N), T += k);
      a.push(P), c.push(T), d = Math.max(P, d), p = Math.max(T, p);
    }
    L2(o, n);
    const j = a.indexOf(d), O = c.indexOf(p), A = (H) => ({
      width: a[H] || 0,
      height: c[H] || 0
    });
    return {
      first: A(0),
      last: A(n - 1),
      widest: A(j),
      highest: A(O),
      widths: a,
      heights: c
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, n) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const n = this._startPixel + t * this._length;
    return pb(this._alignToPixels ? Pi(this.chart, n, 0) : n);
  }
  getDecimalForPixel(t) {
    const n = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - n : n;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: n } = this;
    return t < 0 && n < 0 ? n : t > 0 && n > 0 ? t : 0;
  }
  getContext(t) {
    const n = this.ticks || [];
    if (t >= 0 && t < n.length) {
      const i = n[t];
      return i.$context || (i.$context = N2(this.getContext(), t, i));
    }
    return this.$context || (this.$context = T2(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = zn(this.labelRotation), i = Math.abs(Math.cos(n)), r = Math.abs(Math.sin(n)), o = this._getLabelSizes(), a = t.autoSkipPadding || 0, c = o ? o.widest.width + a : 0, u = o ? o.highest.height + a : 0;
    return this.isHorizontal() ? u * i > c * r ? c / i : u / r : u * r < c * i ? u / i : c / r;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, i = this.chart, r = this.options, { grid: o, position: a, border: c } = r, u = o.offset, d = this.isHorizontal(), g = this.ticks.length + (u ? 1 : 0), v = vr(o), y = [], S = c.setContext(this.getContext()), w = S.display ? S.width : 0, M = w / 2, b = function(X) {
      return Pi(i, X, w);
    };
    let k, P, T, N, j, O, A, H, F, V, K, yt;
    if (a === "top")
      k = b(this.bottom), O = this.bottom - v, H = k - M, V = b(t.top) + M, yt = t.bottom;
    else if (a === "bottom")
      k = b(this.top), V = t.top, yt = b(t.bottom) - M, O = k + M, H = this.top + v;
    else if (a === "left")
      k = b(this.right), j = this.right - v, A = k - M, F = b(t.left) + M, K = t.right;
    else if (a === "right")
      k = b(this.left), F = t.left, K = b(t.right) - M, j = k + M, A = this.left + v;
    else if (n === "x") {
      if (a === "center")
        k = b((t.top + t.bottom) / 2 + 0.5);
      else if (mt(a)) {
        const X = Object.keys(a)[0], ht = a[X];
        k = b(this.chart.scales[X].getPixelForValue(ht));
      }
      V = t.top, yt = t.bottom, O = k + M, H = O + v;
    } else if (n === "y") {
      if (a === "center")
        k = b((t.left + t.right) / 2);
      else if (mt(a)) {
        const X = Object.keys(a)[0], ht = a[X];
        k = b(this.chart.scales[X].getPixelForValue(ht));
      }
      j = k - M, A = j - v, F = t.left, K = t.right;
    }
    const $ = ut(r.ticks.maxTicksLimit, g), rt = Math.max(1, Math.ceil(g / $));
    for (P = 0; P < g; P += rt) {
      const X = this.getContext(P), ht = o.setContext(X), I = c.setContext(X), U = ht.lineWidth, D = ht.color, tt = I.dash || [], ot = I.dashOffset, St = ht.tickWidth, dt = ht.tickColor, at = ht.tickBorderDash || [], G = ht.tickBorderDashOffset;
      T = C2(this, P, u), T !== void 0 && (N = Pi(i, T, U), d ? j = A = F = K = N : O = H = V = yt = N, y.push({
        tx1: j,
        ty1: O,
        tx2: A,
        ty2: H,
        x1: F,
        y1: V,
        x2: K,
        y2: yt,
        width: U,
        color: D,
        borderDash: tt,
        borderDashOffset: ot,
        tickWidth: St,
        tickColor: dt,
        tickBorderDash: at,
        tickBorderDashOffset: G
      }));
    }
    return this._ticksLength = g, this._borderValue = k, y;
  }
  _computeLabelItems(t) {
    const n = this.axis, i = this.options, { position: r, ticks: o } = i, a = this.isHorizontal(), c = this.ticks, { align: u, crossAlign: d, padding: p, mirror: g } = o, v = vr(i.grid), y = v + p, S = g ? -p : y, w = -zn(this.labelRotation), M = [];
    let b, k, P, T, N, j, O, A, H, F, V, K, yt = "middle";
    if (r === "top")
      j = this.bottom - S, O = this._getXAxisLabelAlignment();
    else if (r === "bottom")
      j = this.top + S, O = this._getXAxisLabelAlignment();
    else if (r === "left") {
      const rt = this._getYAxisLabelAlignment(v);
      O = rt.textAlign, N = rt.x;
    } else if (r === "right") {
      const rt = this._getYAxisLabelAlignment(v);
      O = rt.textAlign, N = rt.x;
    } else if (n === "x") {
      if (r === "center")
        j = (t.top + t.bottom) / 2 + y;
      else if (mt(r)) {
        const rt = Object.keys(r)[0], X = r[rt];
        j = this.chart.scales[rt].getPixelForValue(X) + y;
      }
      O = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (r === "center")
        N = (t.left + t.right) / 2 - y;
      else if (mt(r)) {
        const rt = Object.keys(r)[0], X = r[rt];
        N = this.chart.scales[rt].getPixelForValue(X);
      }
      O = this._getYAxisLabelAlignment(v).textAlign;
    }
    n === "y" && (u === "start" ? yt = "top" : u === "end" && (yt = "bottom"));
    const $ = this._getLabelSizes();
    for (b = 0, k = c.length; b < k; ++b) {
      P = c[b], T = P.label;
      const rt = o.setContext(this.getContext(b));
      A = this.getPixelForTick(b) + o.labelOffset, H = this._resolveTickFontOptions(b), F = H.lineHeight, V = qt(T) ? T.length : 1;
      const X = V / 2, ht = rt.color, I = rt.textStrokeColor, U = rt.textStrokeWidth;
      let D = O;
      a ? (N = A, O === "inner" && (b === k - 1 ? D = this.options.reverse ? "left" : "right" : b === 0 ? D = this.options.reverse ? "right" : "left" : D = "center"), r === "top" ? d === "near" || w !== 0 ? K = -V * F + F / 2 : d === "center" ? K = -$.highest.height / 2 - X * F + F : K = -$.highest.height + F / 2 : d === "near" || w !== 0 ? K = F / 2 : d === "center" ? K = $.highest.height / 2 - X * F : K = $.highest.height - V * F, g && (K *= -1), w !== 0 && !rt.showLabelBackdrop && (N += F / 2 * Math.sin(w))) : (j = A, K = (1 - V) * F / 2);
      let tt;
      if (rt.showLabelBackdrop) {
        const ot = rn(rt.backdropPadding), St = $.heights[b], dt = $.widths[b];
        let at = K - ot.top, G = 0 - ot.left;
        switch (yt) {
          case "middle":
            at -= St / 2;
            break;
          case "bottom":
            at -= St;
            break;
        }
        switch (O) {
          case "center":
            G -= dt / 2;
            break;
          case "right":
            G -= dt;
            break;
          case "inner":
            b === k - 1 ? G -= dt : b > 0 && (G -= dt / 2);
            break;
        }
        tt = {
          left: G,
          top: at,
          width: dt + ot.width,
          height: St + ot.height,
          color: rt.backdropColor
        };
      }
      M.push({
        label: T,
        font: H,
        textOffset: K,
        options: {
          rotation: w,
          color: ht,
          strokeColor: I,
          strokeWidth: U,
          textAlign: D,
          textBaseline: yt,
          translation: [
            N,
            j
          ],
          backdrop: tt
        }
      });
    }
    return M;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-zn(this.labelRotation))
      return t === "top" ? "left" : "right";
    let r = "center";
    return n.align === "start" ? r = "left" : n.align === "end" ? r = "right" : n.align === "inner" && (r = "inner"), r;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: i, mirror: r, padding: o } } = this.options, a = this._getLabelSizes(), c = t + o, u = a.widest.width;
    let d, p;
    return n === "left" ? r ? (p = this.right + o, i === "near" ? d = "left" : i === "center" ? (d = "center", p += u / 2) : (d = "right", p += u)) : (p = this.right - c, i === "near" ? d = "right" : i === "center" ? (d = "center", p -= u / 2) : (d = "left", p = this.left)) : n === "right" ? r ? (p = this.left + o, i === "near" ? d = "right" : i === "center" ? (d = "center", p -= u / 2) : (d = "left", p -= u)) : (p = this.left + c, i === "near" ? d = "left" : i === "center" ? (d = "center", p += u / 2) : (d = "right", p = this.right)) : d = "right", {
      textAlign: d,
      x: p
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, n = this.options.position;
    if (n === "left" || n === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (n === "top" || n === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: n }, left: i, top: r, width: o, height: a } = this;
    n && (t.save(), t.fillStyle = n, t.fillRect(i, r, o, a), t.restore());
  }
  getLineWidthForValue(t) {
    const n = this.options.grid;
    if (!this._isVisible() || !n.display)
      return 0;
    const r = this.ticks.findIndex((o) => o.value === t);
    return r >= 0 ? n.setContext(this.getContext(r)).lineWidth : 0;
  }
  drawGrid(t) {
    const n = this.options.grid, i = this.ctx, r = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let o, a;
    const c = (u, d, p) => {
      !p.width || !p.color || (i.save(), i.lineWidth = p.width, i.strokeStyle = p.color, i.setLineDash(p.borderDash || []), i.lineDashOffset = p.borderDashOffset, i.beginPath(), i.moveTo(u.x, u.y), i.lineTo(d.x, d.y), i.stroke(), i.restore());
    };
    if (n.display)
      for (o = 0, a = r.length; o < a; ++o) {
        const u = r[o];
        n.drawOnChartArea && c({
          x: u.x1,
          y: u.y1
        }, {
          x: u.x2,
          y: u.y2
        }, u), n.drawTicks && c({
          x: u.tx1,
          y: u.ty1
        }, {
          x: u.tx2,
          y: u.ty2
        }, {
          color: u.tickColor,
          width: u.tickWidth,
          borderDash: u.tickBorderDash,
          borderDashOffset: u.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: n, options: { border: i, grid: r } } = this, o = i.setContext(this.getContext()), a = i.display ? o.width : 0;
    if (!a)
      return;
    const c = r.setContext(this.getContext(0)).lineWidth, u = this._borderValue;
    let d, p, g, v;
    this.isHorizontal() ? (d = Pi(t, this.left, a) - a / 2, p = Pi(t, this.right, c) + c / 2, g = v = u) : (g = Pi(t, this.top, a) - a / 2, v = Pi(t, this.bottom, c) + c / 2, d = p = u), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(d, g), n.lineTo(p, v), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const i = this.ctx, r = this._computeLabelArea();
    r && Ol(i, r);
    const o = this.getLabelItems(t);
    for (const a of o) {
      const c = a.options, u = a.font, d = a.label, p = a.textOffset;
      hl(i, d, 0, p, u, c);
    }
    r && Al(i);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: i, reverse: r } } = this;
    if (!i.display)
      return;
    const o = Se(i.font), a = rn(i.padding), c = i.align;
    let u = o.lineHeight / 2;
    n === "bottom" || n === "center" || mt(n) ? (u += a.bottom, qt(i.text) && (u += o.lineHeight * (i.text.length - 1))) : u += a.top;
    const { titleX: d, titleY: p, maxWidth: g, rotation: v } = z2(this, u, n, c);
    hl(t, i.text, 0, 0, o, {
      color: i.color,
      maxWidth: g,
      rotation: v,
      textAlign: E2(c, n, r),
      textBaseline: "middle",
      translation: [
        d,
        p
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, n = t.ticks && t.ticks.z || 0, i = ut(t.grid && t.grid.z, -1), r = ut(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Vs.prototype.draw ? [
      {
        z: n,
        draw: (o) => {
          this.draw(o);
        }
      }
    ] : [
      {
        z: i,
        draw: (o) => {
          this.drawBackground(), this.drawGrid(o), this.drawTitle();
        }
      },
      {
        z: r,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: n,
        draw: (o) => {
          this.drawLabels(o);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const n = this.chart.getSortedVisibleDatasetMetas(), i = this.axis + "AxisID", r = [];
    let o, a;
    for (o = 0, a = n.length; o < a; ++o) {
      const c = n[o];
      c[i] === this.id && (!t || c.type === t) && r.push(c);
    }
    return r;
  }
  _resolveTickFontOptions(t) {
    const n = this.options.ticks.setContext(this.getContext(t));
    return Se(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class pa {
  constructor(t, n, i) {
    this.type = t, this.scope = n, this.override = i, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let i;
    A2(n) && (i = this.register(n));
    const r = this.items, o = t.id, a = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in r || (r[o] = t, j2(t, a, i), this.override && Wt.override(t.id, t.overrides)), a;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, i = t.id, r = this.scope;
    i in n && delete n[i], r && i in Wt[r] && (delete Wt[r][i], this.override && delete Ui[i]);
  }
}
function j2(e, t, n) {
  const i = oo(/* @__PURE__ */ Object.create(null), [
    n ? Wt.get(n) : {},
    Wt.get(t),
    e.defaults
  ]);
  Wt.set(t, i), e.defaultRoutes && O2(t, e.defaultRoutes), e.descriptors && Wt.describe(t, e.descriptors);
}
function O2(e, t) {
  Object.keys(t).forEach((n) => {
    const i = n.split("."), r = i.pop(), o = [
      e
    ].concat(i).join("."), a = t[n].split("."), c = a.pop(), u = a.join(".");
    Wt.route(o, r, u, c);
  });
}
function A2(e) {
  return "id" in e && "defaults" in e;
}
class I2 {
  constructor() {
    this.controllers = new pa(Di, "datasets", !0), this.elements = new pa(vi, "elements"), this.plugins = new pa(Object, "plugins"), this.scales = new pa(Vs, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, n, i) {
    [
      ...n
    ].forEach((r) => {
      const o = i || this._getRegistryForType(r);
      i || o.isForType(r) || o === this.plugins && r.id ? this._exec(t, o, r) : bt(r, (a) => {
        const c = i || this._getRegistryForType(a);
        this._exec(t, c, a);
      });
    });
  }
  _exec(t, n, i) {
    const r = dd(t);
    Tt(i["before" + r], [], i), n[t](i), Tt(i["after" + r], [], i);
  }
  _getRegistryForType(t) {
    for (let n = 0; n < this._typedRegistries.length; n++) {
      const i = this._typedRegistries[n];
      if (i.isForType(t))
        return i;
    }
    return this.plugins;
  }
  _get(t, n, i) {
    const r = n.get(t);
    if (r === void 0)
      throw new Error('"' + t + '" is not a registered ' + i + ".");
    return r;
  }
}
var pn = /* @__PURE__ */ new I2();
class R2 {
  constructor() {
    this._init = void 0;
  }
  notify(t, n, i, r) {
    if (n === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = r ? this._descriptors(t).filter(r) : this._descriptors(t), a = this._notify(o, t, n, i);
    return n === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), a;
  }
  _notify(t, n, i, r) {
    r = r || {};
    for (const o of t) {
      const a = o.plugin, c = a[i], u = [
        n,
        r,
        o.options
      ];
      if (Tt(c, u, a) === !1 && r.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    wt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const i = t && t.config, r = ut(i.options && i.options.plugins, {}), o = D2(i);
    return r === !1 && !n ? [] : B2(t, o, r, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], i = this._cache, r = (o, a) => o.filter((c) => !a.some((u) => c.plugin.id === u.plugin.id));
    this._notify(r(n, i), t, "stop"), this._notify(r(i, n), t, "start");
  }
}
function D2(e) {
  const t = {}, n = [], i = Object.keys(pn.plugins.items);
  for (let o = 0; o < i.length; o++)
    n.push(pn.getPlugin(i[o]));
  const r = e.plugins || [];
  for (let o = 0; o < r.length; o++) {
    const a = r[o];
    n.indexOf(a) === -1 && (n.push(a), t[a.id] = !0);
  }
  return {
    plugins: n,
    localIds: t
  };
}
function F2(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function B2(e, { plugins: t, localIds: n }, i, r) {
  const o = [], a = e.getContext();
  for (const c of t) {
    const u = c.id, d = F2(i[u], r);
    d !== null && o.push({
      plugin: c,
      options: H2(e.config, {
        plugin: c,
        local: n[u]
      }, d, a)
    });
  }
  return o;
}
function H2(e, { plugin: t, local: n }, i, r) {
  const o = e.pluginScopeKeys(t), a = e.getOptionScopes(i, o);
  return n && t.defaults && a.push(t.defaults), e.createResolver(a, r, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function ih(e, t) {
  const n = Wt.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function W2(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function V2(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Mm(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Z2(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function sh(e, ...t) {
  if (Mm(e))
    return e;
  for (const n of t) {
    const i = n.axis || Z2(n.position) || e.length > 1 && Mm(e[0].toLowerCase());
    if (i)
      return i;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Cm(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function U2(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((i) => i.xAxisID === e || i.yAxisID === e);
    if (n.length)
      return Cm(e, "x", n[0]) || Cm(e, "y", n[0]);
  }
  return {};
}
function $2(e, t) {
  const n = Ui[e.type] || {
    scales: {}
  }, i = t.scales || {}, r = ih(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(i).forEach((a) => {
    const c = i[a];
    if (!mt(c))
      return console.error(`Invalid scale configuration for scale: ${a}`);
    if (c._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${a}`);
    const u = sh(a, c, U2(a, e), Wt.scales[c.type]), d = V2(u, r), p = n.scales || {};
    o[a] = Dr(/* @__PURE__ */ Object.create(null), [
      {
        axis: u
      },
      c,
      p[u],
      p[d]
    ]);
  }), e.data.datasets.forEach((a) => {
    const c = a.type || e.type, u = a.indexAxis || ih(c, t), p = (Ui[c] || {}).scales || {};
    Object.keys(p).forEach((g) => {
      const v = W2(g, u), y = a[v + "AxisID"] || v;
      o[y] = o[y] || /* @__PURE__ */ Object.create(null), Dr(o[y], [
        {
          axis: v
        },
        i[y],
        p[g]
      ]);
    });
  }), Object.keys(o).forEach((a) => {
    const c = o[a];
    Dr(c, [
      Wt.scales[c.type],
      Wt.scale
    ]);
  }), o;
}
function ay(e) {
  const t = e.options || (e.options = {});
  t.plugins = ut(t.plugins, {}), t.scales = $2(e, t);
}
function ly(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function Y2(e) {
  return e = e || {}, e.data = ly(e.data), ay(e), e;
}
const Lm = /* @__PURE__ */ new Map(), cy = /* @__PURE__ */ new Set();
function ma(e, t) {
  let n = Lm.get(e);
  return n || (n = t(), Lm.set(e, n), cy.add(n)), n;
}
const yr = (e, t, n) => {
  const i = Zi(t, n);
  i !== void 0 && e.add(i);
};
class q2 {
  constructor(t) {
    this._config = Y2(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = ly(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), ay(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return ma(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return ma(`${t}.transition.${n}`, () => [
      [
        `datasets.${t}.transitions.${n}`,
        `transitions.${n}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, n) {
    return ma(`${t}-${n}`, () => [
      [
        `datasets.${t}.elements.${n}`,
        `datasets.${t}`,
        `elements.${n}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const n = t.id, i = this.type;
    return ma(`${i}-plugin-${n}`, () => [
      [
        `plugins.${n}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, n) {
    const i = this._scopeCache;
    let r = i.get(t);
    return (!r || n) && (r = /* @__PURE__ */ new Map(), i.set(t, r)), r;
  }
  getOptionScopes(t, n, i) {
    const { options: r, type: o } = this, a = this._cachedScopes(t, i), c = a.get(n);
    if (c)
      return c;
    const u = /* @__PURE__ */ new Set();
    n.forEach((p) => {
      t && (u.add(t), p.forEach((g) => yr(u, t, g))), p.forEach((g) => yr(u, r, g)), p.forEach((g) => yr(u, Ui[o] || {}, g)), p.forEach((g) => yr(u, Wt, g)), p.forEach((g) => yr(u, eh, g));
    });
    const d = Array.from(u);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), cy.has(n) && a.set(n, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      Ui[n] || {},
      Wt.datasets[n] || {},
      {
        type: n
      },
      Wt,
      eh
    ];
  }
  resolveNamedOptions(t, n, i, r = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: a, subPrefixes: c } = Tm(this._resolverCache, t, r);
    let u = a;
    if (X2(a, n)) {
      o.$shared = !1, i = pi(i) ? i() : i;
      const d = this.createResolver(t, i, c);
      u = Ds(a, i, d);
    }
    for (const d of n)
      o[d] = u[d];
    return o;
  }
  createResolver(t, n, i = [
    ""
  ], r) {
    const { resolver: o } = Tm(this._resolverCache, t, i);
    return mt(n) ? Ds(o, n, void 0, r) : o;
  }
}
function Tm(e, t, n) {
  let i = e.get(t);
  i || (i = /* @__PURE__ */ new Map(), e.set(t, i));
  const r = n.join();
  let o = i.get(r);
  return o || (o = {
    resolver: _d(t, n),
    subPrefixes: n.filter((c) => !c.toLowerCase().includes("hover"))
  }, i.set(r, o)), o;
}
const K2 = (e) => mt(e) && Object.getOwnPropertyNames(e).some((t) => pi(e[t]));
function X2(e, t) {
  const { isScriptable: n, isIndexable: i } = Wv(e);
  for (const r of t) {
    const o = n(r), a = i(r), c = (a || o) && e[r];
    if (o && (pi(c) || K2(c)) || a && qt(c))
      return !0;
  }
  return !1;
}
var G2 = "4.5.1";
const Q2 = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Nm(e, t) {
  return e === "top" || e === "bottom" || Q2.indexOf(e) === -1 && t === "x";
}
function Em(e, t) {
  return function(n, i) {
    return n[e] === i[e] ? n[t] - i[t] : n[e] - i[e];
  };
}
function zm(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Tt(n && n.onComplete, [
    e
  ], t);
}
function J2(e) {
  const t = e.chart, n = t.options.animation;
  Tt(n && n.onProgress, [
    e
  ], t);
}
function uy(e) {
  return xd() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Aa = {}, jm = (e) => {
  const t = uy(e);
  return Object.values(Aa).filter((n) => n.canvas === t).pop();
};
function tS(e, t, n) {
  const i = Object.keys(e);
  for (const r of i) {
    const o = +r;
    if (o >= t) {
      const a = e[r];
      delete e[r], (n > 0 || o > t) && (e[o + n] = a);
    }
  }
}
function eS(e, t, n, i) {
  return !n || e.type === "mouseout" ? null : i ? t : e;
}
var Un;
let Dl = (Un = class {
  static register(...t) {
    pn.add(...t), Om();
  }
  static unregister(...t) {
    pn.remove(...t), Om();
  }
  constructor(t, n) {
    const i = this.config = new q2(n), r = uy(t), o = jm(r);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const a = i.createResolver(i.chartOptionScopes(), this.getContext());
    this.platform = new (i.platform || y2(r))(), this.platform.updateConfig(i);
    const c = this.platform.acquireContext(r, a.aspectRatio), u = c && c.canvas, d = u && u.height, p = u && u.width;
    if (this.id = Jw(), this.ctx = c, this.canvas = u, this.width = p, this.height = d, this._options = a, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new R2(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = vb((g) => this.update(g), a.resizeDelay || 0), this._dataChanges = [], Aa[this.id] = this, !c || !u) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Pn.listen(this, "complete", zm), Pn.listen(this, "progress", J2), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: i, height: r, _aspectRatio: o } = this;
    return wt(t) ? n && o ? o : r ? i / r : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return pn;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : nm(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Jp(this.canvas, this.ctx), this;
  }
  stop() {
    return Pn.stop(this), this;
  }
  resize(t, n) {
    Pn.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const i = this.options, r = this.canvas, o = i.maintainAspectRatio && this.aspectRatio, a = this.platform.getMaximumSize(r, t, n, o), c = i.devicePixelRatio || this.platform.getDevicePixelRatio(), u = this.width ? "resize" : "attach";
    this.width = a.width, this.height = a.height, this._aspectRatio = this.aspectRatio, nm(this, c, !0) && (this.notifyPlugins("resize", {
      size: a
    }), Tt(i.onResize, [
      this,
      a
    ], this), this.attached && this._doResize(u) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    bt(n, (i, r) => {
      i.id = r;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, i = this.scales, r = Object.keys(i).reduce((a, c) => (a[c] = !1, a), {});
    let o = [];
    n && (o = o.concat(Object.keys(n).map((a) => {
      const c = n[a], u = sh(a, c), d = u === "r", p = u === "x";
      return {
        options: c,
        dposition: d ? "chartArea" : p ? "bottom" : "left",
        dtype: d ? "radialLinear" : p ? "category" : "linear"
      };
    }))), bt(o, (a) => {
      const c = a.options, u = c.id, d = sh(u, c), p = ut(c.type, a.dtype);
      (c.position === void 0 || Nm(c.position, d) !== Nm(a.dposition)) && (c.position = a.dposition), r[u] = !0;
      let g = null;
      if (u in i && i[u].type === p)
        g = i[u];
      else {
        const v = pn.getScale(p);
        g = new v({
          id: u,
          type: p,
          ctx: this.ctx,
          chart: this
        }), i[g.id] = g;
      }
      g.init(c, t);
    }), bt(r, (a, c) => {
      a || delete i[c];
    }), bt(i, (a) => {
      ti.configure(this, a, a.options), ti.addBox(this, a);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, i = t.length;
    if (t.sort((r, o) => r.index - o.index), i > n) {
      for (let r = n; r < i; ++r)
        this._destroyDatasetMeta(r);
      t.splice(n, i - n);
    }
    this._sortedMetasets = t.slice(0).sort(Em("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: n } } = this;
    t.length > n.length && delete this._stacks, t.forEach((i, r) => {
      n.filter((o) => o === i._dataset).length === 0 && this._destroyDatasetMeta(r);
    });
  }
  buildOrUpdateControllers() {
    const t = [], n = this.data.datasets;
    let i, r;
    for (this._removeUnreferencedMetasets(), i = 0, r = n.length; i < r; i++) {
      const o = n[i];
      let a = this.getDatasetMeta(i);
      const c = o.type || this.config.type;
      if (a.type && a.type !== c && (this._destroyDatasetMeta(i), a = this.getDatasetMeta(i)), a.type = c, a.indexAxis = o.indexAxis || ih(c, this.options), a.order = o.order || 0, a.index = i, a.label = "" + o.label, a.visible = this.isDatasetVisible(i), a.controller)
        a.controller.updateIndex(i), a.controller.linkScales();
      else {
        const u = pn.getController(c), { datasetElementType: d, dataElementType: p } = Wt.datasets[c];
        Object.assign(u, {
          dataElementType: pn.getElement(p),
          datasetElementType: d && pn.getElement(d)
        }), a.controller = new u(this, i), t.push(a.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    bt(this.data.datasets, (t, n) => {
      this.getDatasetMeta(n).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const n = this.config;
    n.update();
    const i = this._options = n.createResolver(n.chartOptionScopes(), this.getContext()), r = this._animationsDisabled = !i.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const o = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let a = 0;
    for (let d = 0, p = this.data.datasets.length; d < p; d++) {
      const { controller: g } = this.getDatasetMeta(d), v = !r && o.indexOf(g) === -1;
      g.buildOrUpdateElements(v), a = Math.max(+g.getMaxOverflow(), a);
    }
    a = this._minPadding = i.layout.autoPadding ? a : 0, this._updateLayout(a), r || bt(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(Em("z", "_idx"));
    const { _active: c, _lastEvent: u } = this;
    u ? this._eventHandler(u, !0) : c.length && this._updateHoverStyles(c, c, !0), this.render();
  }
  _updateScales() {
    bt(this.scales, (t) => {
      ti.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), i = new Set(t.events);
    (!Vp(n, i) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: i, start: r, count: o } of n) {
      const a = i === "_removeElements" ? -o : o;
      tS(t, r, a);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, i = (o) => new Set(t.filter((a) => a[0] === o).map((a, c) => c + "," + a.splice(1).join(","))), r = i(0);
    for (let o = 1; o < n; o++)
      if (!Vp(r, i(o)))
        return;
    return Array.from(r).map((o) => o.split(",")).map((o) => ({
      method: o[1],
      start: +o[2],
      count: +o[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    ti.update(this, this.width, this.height, t);
    const n = this.chartArea, i = n.width <= 0 || n.height <= 0;
    this._layers = [], bt(this.boxes, (r) => {
      i && r.position === "chartArea" || (r.configure && r.configure(), this._layers.push(...r._layers()));
    }, this), this._layers.forEach((r, o) => {
      r._idx = o;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let n = 0, i = this.data.datasets.length; n < i; ++n)
        this.getDatasetMeta(n).controller.configure();
      for (let n = 0, i = this.data.datasets.length; n < i; ++n)
        this._updateDataset(n, pi(t) ? t({
          datasetIndex: n
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, n) {
    const i = this.getDatasetMeta(t), r = {
      meta: i,
      index: t,
      mode: n,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", r) !== !1 && (i.controller._update(n), r.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", r));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && (Pn.has(this) ? this.attached && !Pn.running(this) && Pn.start(this) : (this.draw(), zm({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: i, height: r } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(i, r);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const n = this._layers;
    for (t = 0; t < n.length && n[t].z <= 0; ++t)
      n[t].draw(this.chartArea);
    for (this._drawDatasets(); t < n.length; ++t)
      n[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const n = this._sortedMetasets, i = [];
    let r, o;
    for (r = 0, o = n.length; r < o; ++r) {
      const a = n[r];
      (!t || a.visible) && i.push(a);
    }
    return i;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let n = t.length - 1; n >= 0; --n)
      this._drawDataset(t[n]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const n = this.ctx, i = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, r = Qv(this, t);
    this.notifyPlugins("beforeDatasetDraw", i) !== !1 && (r && Ol(n, r), t.controller.draw(), r && Al(n), i.cancelable = !1, this.notifyPlugins("afterDatasetDraw", i));
  }
  isPointInArea(t) {
    return uo(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, i, r) {
    const o = Qk.modes[n];
    return typeof o == "function" ? o(this, t, i, r) : [];
  }
  getDatasetMeta(t) {
    const n = this.data.datasets[t], i = this._metasets;
    let r = i.filter((o) => o && o._dataset === n).pop();
    return r || (r = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: n && n.order || 0,
      index: t,
      _dataset: n,
      _parsed: [],
      _sorted: !1
    }, i.push(r)), r;
  }
  getContext() {
    return this.$context || (this.$context = qi(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const n = this.data.datasets[t];
    if (!n)
      return !1;
    const i = this.getDatasetMeta(t);
    return typeof i.hidden == "boolean" ? !i.hidden : !n.hidden;
  }
  setDatasetVisibility(t, n) {
    const i = this.getDatasetMeta(t);
    i.hidden = !n;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, n, i) {
    const r = i ? "show" : "hide", o = this.getDatasetMeta(t), a = o.controller._resolveAnimations(void 0, r);
    ao(n) ? (o.data[n].hidden = !i, this.update()) : (this.setDatasetVisibility(t, i), a.update(o, {
      visible: i
    }), this.update((c) => c.datasetIndex === t ? r : void 0));
  }
  hide(t, n) {
    this._updateVisibility(t, n, !1);
  }
  show(t, n) {
    this._updateVisibility(t, n, !0);
  }
  _destroyDatasetMeta(t) {
    const n = this._metasets[t];
    n && n.controller && n.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, n;
    for (this.stop(), Pn.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Jp(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete Aa[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, n = this.platform, i = (o, a) => {
      n.addEventListener(this, o, a), t[o] = a;
    }, r = (o, a, c) => {
      o.offsetX = a, o.offsetY = c, this._eventHandler(o);
    };
    bt(this.options.events, (o) => i(o, r));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, i = (u, d) => {
      n.addEventListener(this, u, d), t[u] = d;
    }, r = (u, d) => {
      t[u] && (n.removeEventListener(this, u, d), delete t[u]);
    }, o = (u, d) => {
      this.canvas && this.resize(u, d);
    };
    let a;
    const c = () => {
      r("attach", c), this.attached = !0, this.resize(), i("resize", o), i("detach", a);
    };
    a = () => {
      this.attached = !1, r("resize", o), this._stop(), this._resize(0, 0), i("attach", c);
    }, n.isAttached(this.canvas) ? c() : a();
  }
  unbindEvents() {
    bt(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, bt(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, i) {
    const r = i ? "set" : "remove";
    let o, a, c, u;
    for (n === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + r + "DatasetHoverStyle"]()), c = 0, u = t.length; c < u; ++c) {
      a = t[c];
      const d = a && this.getDatasetMeta(a.datasetIndex).controller;
      d && d[r + "HoverStyle"](a.element, a.datasetIndex, a.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const n = this._active || [], i = t.map(({ datasetIndex: o, index: a }) => {
      const c = this.getDatasetMeta(o);
      if (!c)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: c.data[a],
        index: a
      };
    });
    !ll(i, n) && (this._active = i, this._lastEvent = null, this._updateHoverStyles(i, n));
  }
  notifyPlugins(t, n, i) {
    return this._plugins.notify(this, t, n, i);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, i) {
    const r = this.options.hover, o = (u, d) => u.filter((p) => !d.some((g) => p.datasetIndex === g.datasetIndex && p.index === g.index)), a = o(n, t), c = i ? t : o(t, n);
    a.length && this.updateHoverStyle(a, r.mode, !1), c.length && r.mode && this.updateHoverStyle(c, r.mode, !0);
  }
  _eventHandler(t, n) {
    const i = {
      event: t,
      replay: n,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, r = (a) => (a.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", i, r) === !1)
      return;
    const o = this._handleEvent(t, n, i.inChartArea);
    return i.cancelable = !1, this.notifyPlugins("afterEvent", i, r), (o || i.changed) && this.render(), this;
  }
  _handleEvent(t, n, i) {
    const { _active: r = [], options: o } = this, a = n, c = this._getActiveElements(t, r, i, a), u = rb(t), d = eS(t, this._lastEvent, i, u);
    i && (this._lastEvent = null, Tt(o.onHover, [
      t,
      c,
      this
    ], this), u && Tt(o.onClick, [
      t,
      c,
      this
    ], this));
    const p = !ll(c, r);
    return (p || n) && (this._active = c, this._updateHoverStyles(c, r, n)), this._lastEvent = d, p;
  }
  _getActiveElements(t, n, i, r) {
    if (t.type === "mouseout")
      return [];
    if (!i)
      return n;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, r);
  }
}, q(Un, "defaults", Wt), q(Un, "instances", Aa), q(Un, "overrides", Ui), q(Un, "registry", pn), q(Un, "version", G2), q(Un, "getChart", jm), Un);
function Om() {
  return bt(Dl.instances, (e) => e._plugins.invalidate());
}
function nS(e, t, n) {
  const { startAngle: i, x: r, y: o, outerRadius: a, innerRadius: c, options: u } = t, { borderWidth: d, borderJoinStyle: p } = u, g = Math.min(d / a, Ee(i - n));
  if (e.beginPath(), e.arc(r, o, a - d / 2, i + g / 2, n - g / 2), c > 0) {
    const v = Math.min(d / c, Ee(i - n));
    e.arc(r, o, c + d / 2, n - v / 2, i + v / 2, !0);
  } else {
    const v = Math.min(d / 2, a * Ee(i - n));
    if (p === "round")
      e.arc(r, o, v, n - Pt / 2, i + Pt / 2, !0);
    else if (p === "bevel") {
      const y = 2 * v * v, S = -y * Math.cos(n + Pt / 2) + r, w = -y * Math.sin(n + Pt / 2) + o, M = y * Math.cos(i + Pt / 2) + r, b = y * Math.sin(i + Pt / 2) + o;
      e.lineTo(S, w), e.lineTo(M, b);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function iS(e, t, n) {
  const { startAngle: i, pixelMargin: r, x: o, y: a, outerRadius: c, innerRadius: u } = t;
  let d = r / c;
  e.beginPath(), e.arc(o, a, c, i - d, n + d), u > r ? (d = r / u, e.arc(o, a, u, n + d, i - d, !0)) : e.arc(o, a, r, n + Xt, i - Xt), e.closePath(), e.clip();
}
function sS(e) {
  return gd(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function rS(e, t, n, i) {
  const r = sS(e.options.borderRadius), o = (n - t) / 2, a = Math.min(o, i * t / 2), c = (u) => {
    const d = (n - Math.min(o, u)) * i / 2;
    return ue(u, 0, Math.min(o, d));
  };
  return {
    outerStart: c(r.outerStart),
    outerEnd: c(r.outerEnd),
    innerStart: ue(r.innerStart, 0, a),
    innerEnd: ue(r.innerEnd, 0, a)
  };
}
function ls(e, t, n, i) {
  return {
    x: n + e * Math.cos(t),
    y: i + e * Math.sin(t)
  };
}
function ml(e, t, n, i, r, o) {
  const { x: a, y: c, startAngle: u, pixelMargin: d, innerRadius: p } = t, g = Math.max(t.outerRadius + i + n - d, 0), v = p > 0 ? p + i + n + d : 0;
  let y = 0;
  const S = r - u;
  if (i) {
    const rt = p > 0 ? p - i : 0, X = g > 0 ? g - i : 0, ht = (rt + X) / 2, I = ht !== 0 ? S * ht / (ht + i) : S;
    y = (S - I) / 2;
  }
  const w = Math.max(1e-3, S * g - n / Pt) / g, M = (S - w) / 2, b = u + M + y, k = r - M - y, { outerStart: P, outerEnd: T, innerStart: N, innerEnd: j } = rS(t, v, g, k - b), O = g - P, A = g - T, H = b + P / O, F = k - T / A, V = v + N, K = v + j, yt = b + N / V, $ = k - j / K;
  if (e.beginPath(), o) {
    const rt = (H + F) / 2;
    if (e.arc(a, c, g, H, rt), e.arc(a, c, g, rt, F), T > 0) {
      const U = ls(A, F, a, c);
      e.arc(U.x, U.y, T, F, k + Xt);
    }
    const X = ls(K, k, a, c);
    if (e.lineTo(X.x, X.y), j > 0) {
      const U = ls(K, $, a, c);
      e.arc(U.x, U.y, j, k + Xt, $ + Math.PI);
    }
    const ht = (k - j / v + (b + N / v)) / 2;
    if (e.arc(a, c, v, k - j / v, ht, !0), e.arc(a, c, v, ht, b + N / v, !0), N > 0) {
      const U = ls(V, yt, a, c);
      e.arc(U.x, U.y, N, yt + Math.PI, b - Xt);
    }
    const I = ls(O, b, a, c);
    if (e.lineTo(I.x, I.y), P > 0) {
      const U = ls(O, H, a, c);
      e.arc(U.x, U.y, P, b - Xt, H);
    }
  } else {
    e.moveTo(a, c);
    const rt = Math.cos(H) * g + a, X = Math.sin(H) * g + c;
    e.lineTo(rt, X);
    const ht = Math.cos(F) * g + a, I = Math.sin(F) * g + c;
    e.lineTo(ht, I);
  }
  e.closePath();
}
function oS(e, t, n, i, r) {
  const { fullCircles: o, startAngle: a, circumference: c } = t;
  let u = t.endAngle;
  if (o) {
    ml(e, t, n, i, u, r);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(c) || (u = a + (c % Ot || Ot));
  }
  return ml(e, t, n, i, u, r), e.fill(), u;
}
function aS(e, t, n, i, r) {
  const { fullCircles: o, startAngle: a, circumference: c, options: u } = t, { borderWidth: d, borderJoinStyle: p, borderDash: g, borderDashOffset: v, borderRadius: y } = u, S = u.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(g || []), e.lineDashOffset = v, S ? (e.lineWidth = d * 2, e.lineJoin = p || "round") : (e.lineWidth = d, e.lineJoin = p || "bevel");
  let w = t.endAngle;
  if (o) {
    ml(e, t, n, i, w, r);
    for (let M = 0; M < o; ++M)
      e.stroke();
    isNaN(c) || (w = a + (c % Ot || Ot));
  }
  S && iS(e, t, w), u.selfJoin && w - a >= Pt && y === 0 && p !== "miter" && nS(e, t, w), o || (ml(e, t, n, i, w, r), e.stroke());
}
class Cr extends vi {
  constructor(n) {
    super();
    q(this, "circumference");
    q(this, "endAngle");
    q(this, "fullCircles");
    q(this, "innerRadius");
    q(this, "outerRadius");
    q(this, "pixelMargin");
    q(this, "startAngle");
    this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, n && Object.assign(this, n);
  }
  inRange(n, i, r) {
    const o = this.getProps([
      "x",
      "y"
    ], r), { angle: a, distance: c } = jv(o, {
      x: n,
      y: i
    }), { startAngle: u, endAngle: d, innerRadius: p, outerRadius: g, circumference: v } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], r), y = (this.options.spacing + this.options.borderWidth) / 2, S = ut(v, d - u), w = co(a, u, d) && u !== d, M = S >= Ot || w, b = jn(c, p + y, g + y);
    return M && b;
  }
  getCenterPoint(n) {
    const { x: i, y: r, startAngle: o, endAngle: a, innerRadius: c, outerRadius: u } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], n), { offset: d, spacing: p } = this.options, g = (o + a) / 2, v = (c + u + p + d) / 2;
    return {
      x: i + Math.cos(g) * v,
      y: r + Math.sin(g) * v
    };
  }
  tooltipPosition(n) {
    return this.getCenterPoint(n);
  }
  draw(n) {
    const { options: i, circumference: r } = this, o = (i.offset || 0) / 4, a = (i.spacing || 0) / 2, c = i.circular;
    if (this.pixelMargin = i.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = r > Ot ? Math.floor(r / Ot) : 0, r === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    n.save();
    const u = (this.startAngle + this.endAngle) / 2;
    n.translate(Math.cos(u) * o, Math.sin(u) * o);
    const d = 1 - Math.sin(Math.min(Pt, r || 0)), p = o * d;
    n.fillStyle = i.backgroundColor, n.strokeStyle = i.borderColor, oS(n, this, p, a, c), aS(n, this, p, a, c), n.restore();
  }
}
q(Cr, "id", "arc"), q(Cr, "defaults", {
  borderAlign: "center",
  borderColor: "#fff",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: void 0,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: void 0,
  circular: !0,
  selfJoin: !1
}), q(Cr, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), q(Cr, "descriptors", {
  _scriptable: !0,
  _indexable: (n) => n !== "borderDash"
});
function hy(e, t, n = t) {
  e.lineCap = ut(n.borderCapStyle, t.borderCapStyle), e.setLineDash(ut(n.borderDash, t.borderDash)), e.lineDashOffset = ut(n.borderDashOffset, t.borderDashOffset), e.lineJoin = ut(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = ut(n.borderWidth, t.borderWidth), e.strokeStyle = ut(n.borderColor, t.borderColor);
}
function lS(e, t, n) {
  e.lineTo(n.x, n.y);
}
function cS(e) {
  return e.stepped ? zb : e.tension || e.cubicInterpolationMode === "monotone" ? jb : lS;
}
function dy(e, t, n = {}) {
  const i = e.length, { start: r = 0, end: o = i - 1 } = n, { start: a, end: c } = t, u = Math.max(r, a), d = Math.min(o, c), p = r < a && o < a || r > c && o > c;
  return {
    count: i,
    start: u,
    loop: t.loop,
    ilen: d < u && !p ? i + d - u : d - u
  };
}
function uS(e, t, n, i) {
  const { points: r, options: o } = t, { count: a, start: c, loop: u, ilen: d } = dy(r, n, i), p = cS(o);
  let { move: g = !0, reverse: v } = i || {}, y, S, w;
  for (y = 0; y <= d; ++y)
    S = r[(c + (v ? d - y : y)) % a], !S.skip && (g ? (e.moveTo(S.x, S.y), g = !1) : p(e, w, S, v, o.stepped), w = S);
  return u && (S = r[(c + (v ? d : 0)) % a], p(e, w, S, v, o.stepped)), !!u;
}
function hS(e, t, n, i) {
  const r = t.points, { count: o, start: a, ilen: c } = dy(r, n, i), { move: u = !0, reverse: d } = i || {};
  let p = 0, g = 0, v, y, S, w, M, b;
  const k = (T) => (a + (d ? c - T : T)) % o, P = () => {
    w !== M && (e.lineTo(p, M), e.lineTo(p, w), e.lineTo(p, b));
  };
  for (u && (y = r[k(0)], e.moveTo(y.x, y.y)), v = 0; v <= c; ++v) {
    if (y = r[k(v)], y.skip)
      continue;
    const T = y.x, N = y.y, j = T | 0;
    j === S ? (N < w ? w = N : N > M && (M = N), p = (g * p + T) / ++g) : (P(), e.lineTo(T, N), S = j, g = 0, w = M = N), b = N;
  }
  P();
}
function rh(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? hS : uS;
}
function dS(e) {
  return e.stepped ? hk : e.tension || e.cubicInterpolationMode === "monotone" ? dk : Ni;
}
function fS(e, t, n, i) {
  let r = t._path;
  r || (r = t._path = new Path2D(), t.path(r, n, i) && r.closePath()), hy(e, t.options), e.stroke(r);
}
function pS(e, t, n, i) {
  const { segments: r, options: o } = t, a = rh(t);
  for (const c of r)
    hy(e, o, c.style), e.beginPath(), a(e, t, c, {
      start: n,
      end: n + i - 1
    }) && e.closePath(), e.stroke();
}
const mS = typeof Path2D == "function";
function gS(e, t, n, i) {
  mS && !t.options.segment ? fS(e, t, n, i) : pS(e, t, n, i);
}
class ei extends vi {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, n) {
    const i = this.options;
    if ((i.tension || i.cubicInterpolationMode === "monotone") && !i.stepped && !this._pointsUpdated) {
      const r = i.spanGaps ? this._loop : this._fullLoop;
      ik(this._points, i, t, r, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = vk(this, this.options.segment));
  }
  first() {
    const t = this.segments, n = this.points;
    return t.length && n[t[0].start];
  }
  last() {
    const t = this.segments, n = this.points, i = t.length;
    return i && n[t[i - 1].end];
  }
  interpolate(t, n) {
    const i = this.options, r = t[n], o = this.points, a = Gv(this, {
      property: n,
      start: r,
      end: r
    });
    if (!a.length)
      return;
    const c = [], u = dS(i);
    let d, p;
    for (d = 0, p = a.length; d < p; ++d) {
      const { start: g, end: v } = a[d], y = o[g], S = o[v];
      if (y === S) {
        c.push(y);
        continue;
      }
      const w = Math.abs((r - y[n]) / (S[n] - y[n])), M = u(y, S, w, i.stepped);
      M[n] = t[n], c.push(M);
    }
    return c.length === 1 ? c[0] : c;
  }
  pathSegment(t, n, i) {
    return rh(this)(t, this, n, i);
  }
  path(t, n, i) {
    const r = this.segments, o = rh(this);
    let a = this._loop;
    n = n || 0, i = i || this.points.length - n;
    for (const c of r)
      a &= o(t, this, c, {
        start: n,
        end: n + i - 1
      });
    return !!a;
  }
  draw(t, n, i, r) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), gS(t, this, i, r), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
q(ei, "id", "line"), q(ei, "defaults", {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: !0,
  cubicInterpolationMode: "default",
  fill: !1,
  spanGaps: !1,
  stepped: !1,
  tension: 0
}), q(ei, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), q(ei, "descriptors", {
  _scriptable: !0,
  _indexable: (t) => t !== "borderDash" && t !== "fill"
});
function Am(e, t, n, i) {
  const r = e.options, { [n]: o } = e.getProps([
    n
  ], i);
  return Math.abs(t - o) < r.radius + r.hitRadius;
}
class Ia extends vi {
  constructor(n) {
    super();
    q(this, "parsed");
    q(this, "skip");
    q(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, n && Object.assign(this, n);
  }
  inRange(n, i, r) {
    const o = this.options, { x: a, y: c } = this.getProps([
      "x",
      "y"
    ], r);
    return Math.pow(n - a, 2) + Math.pow(i - c, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(n, i) {
    return Am(this, n, "x", i);
  }
  inYRange(n, i) {
    return Am(this, n, "y", i);
  }
  getCenterPoint(n) {
    const { x: i, y: r } = this.getProps([
      "x",
      "y"
    ], n);
    return {
      x: i,
      y: r
    };
  }
  size(n) {
    n = n || this.options || {};
    let i = n.radius || 0;
    i = Math.max(i, i && n.hoverRadius || 0);
    const r = i && n.borderWidth || 0;
    return (i + r) * 2;
  }
  draw(n, i) {
    const r = this.options;
    this.skip || r.radius < 0.1 || !uo(this, i, this.size(r) / 2) || (n.strokeStyle = r.borderColor, n.lineWidth = r.borderWidth, n.fillStyle = r.backgroundColor, nh(n, r, this.x, this.y));
  }
  getRange() {
    const n = this.options || {};
    return n.radius + n.hitRadius;
  }
}
q(Ia, "id", "point"), /**
* @type {any}
*/
q(Ia, "defaults", {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
}), /**
* @type {any}
*/
q(Ia, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function fy(e, t) {
  const { x: n, y: i, base: r, width: o, height: a } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let c, u, d, p, g;
  return e.horizontal ? (g = a / 2, c = Math.min(n, r), u = Math.max(n, r), d = i - g, p = i + g) : (g = o / 2, c = n - g, u = n + g, d = Math.min(i, r), p = Math.max(i, r)), {
    left: c,
    top: d,
    right: u,
    bottom: p
  };
}
function ni(e, t, n, i) {
  return e ? 0 : ue(t, n, i);
}
function _S(e, t, n) {
  const i = e.options.borderWidth, r = e.borderSkipped, o = Hv(i);
  return {
    t: ni(r.top, o.top, 0, n),
    r: ni(r.right, o.right, 0, t),
    b: ni(r.bottom, o.bottom, 0, n),
    l: ni(r.left, o.left, 0, t)
  };
}
function vS(e, t, n) {
  const { enableBorderRadius: i } = e.getProps([
    "enableBorderRadius"
  ]), r = e.options.borderRadius, o = Ls(r), a = Math.min(t, n), c = e.borderSkipped, u = i || mt(r);
  return {
    topLeft: ni(!u || c.top || c.left, o.topLeft, 0, a),
    topRight: ni(!u || c.top || c.right, o.topRight, 0, a),
    bottomLeft: ni(!u || c.bottom || c.left, o.bottomLeft, 0, a),
    bottomRight: ni(!u || c.bottom || c.right, o.bottomRight, 0, a)
  };
}
function yS(e) {
  const t = fy(e), n = t.right - t.left, i = t.bottom - t.top, r = _S(e, n / 2, i / 2), o = vS(e, n / 2, i / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: n,
      h: i,
      radius: o
    },
    inner: {
      x: t.left + r.l,
      y: t.top + r.t,
      w: n - r.l - r.r,
      h: i - r.t - r.b,
      radius: {
        topLeft: Math.max(0, o.topLeft - Math.max(r.t, r.l)),
        topRight: Math.max(0, o.topRight - Math.max(r.t, r.r)),
        bottomLeft: Math.max(0, o.bottomLeft - Math.max(r.b, r.l)),
        bottomRight: Math.max(0, o.bottomRight - Math.max(r.b, r.r))
      }
    }
  };
}
function tu(e, t, n, i) {
  const r = t === null, o = n === null, c = e && !(r && o) && fy(e, i);
  return c && (r || jn(t, c.left, c.right)) && (o || jn(n, c.top, c.bottom));
}
function xS(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function wS(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function eu(e, t, n = {}) {
  const i = e.x !== n.x ? -t : 0, r = e.y !== n.y ? -t : 0, o = (e.x + e.w !== n.x + n.w ? t : 0) - i, a = (e.y + e.h !== n.y + n.h ? t : 0) - r;
  return {
    x: e.x + i,
    y: e.y + r,
    w: e.w + o,
    h: e.h + a,
    radius: e.radius
  };
}
class Ra extends vi {
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: n, options: { borderColor: i, backgroundColor: r } } = this, { inner: o, outer: a } = yS(this), c = xS(a.radius) ? dl : wS;
    t.save(), (a.w !== o.w || a.h !== o.h) && (t.beginPath(), c(t, eu(a, n, o)), t.clip(), c(t, eu(o, -n, a)), t.fillStyle = i, t.fill("evenodd")), t.beginPath(), c(t, eu(o, n)), t.fillStyle = r, t.fill(), t.restore();
  }
  inRange(t, n, i) {
    return tu(this, t, n, i);
  }
  inXRange(t, n) {
    return tu(this, t, null, n);
  }
  inYRange(t, n) {
    return tu(this, null, t, n);
  }
  getCenterPoint(t) {
    const { x: n, y: i, base: r, horizontal: o } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: o ? (n + r) / 2 : n,
      y: o ? i : (i + r) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
q(Ra, "id", "bar"), q(Ra, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), q(Ra, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function bS(e, t, n) {
  const i = e.segments, r = e.points, o = t.points, a = [];
  for (const c of i) {
    let { start: u, end: d } = c;
    d = Fl(u, d, r);
    const p = oh(n, r[u], r[d], c.loop);
    if (!t.segments) {
      a.push({
        source: c,
        target: p,
        start: r[u],
        end: r[d]
      });
      continue;
    }
    const g = Gv(t, p);
    for (const v of g) {
      const y = oh(n, o[v.start], o[v.end], v.loop), S = Xv(c, r, y);
      for (const w of S)
        a.push({
          source: w,
          target: v,
          start: {
            [n]: Im(p, y, "start", Math.max)
          },
          end: {
            [n]: Im(p, y, "end", Math.min)
          }
        });
    }
  }
  return a;
}
function oh(e, t, n, i) {
  if (i)
    return;
  let r = t[e], o = n[e];
  return e === "angle" && (r = Ee(r), o = Ee(o)), {
    property: e,
    start: r,
    end: o
  };
}
function kS(e, t) {
  const { x: n = null, y: i = null } = e || {}, r = t.points, o = [];
  return t.segments.forEach(({ start: a, end: c }) => {
    c = Fl(a, c, r);
    const u = r[a], d = r[c];
    i !== null ? (o.push({
      x: u.x,
      y: i
    }), o.push({
      x: d.x,
      y: i
    })) : n !== null && (o.push({
      x: n,
      y: u.y
    }), o.push({
      x: n,
      y: d.y
    }));
  }), o;
}
function Fl(e, t, n) {
  for (; t > e; t--) {
    const i = n[t];
    if (!isNaN(i.x) && !isNaN(i.y))
      break;
  }
  return t;
}
function Im(e, t, n, i) {
  return e && t ? i(e[n], t[n]) : e ? e[n] : t ? t[n] : 0;
}
function py(e, t) {
  let n = [], i = !1;
  return qt(e) ? (i = !0, n = e) : n = kS(e, t), n.length ? new ei({
    points: n,
    options: {
      tension: 0
    },
    _loop: i,
    _fullLoop: i
  }) : null;
}
function Rm(e) {
  return e && e.fill !== !1;
}
function SS(e, t, n) {
  let r = e[t].fill;
  const o = [
    t
  ];
  let a;
  if (!n)
    return r;
  for (; r !== !1 && o.indexOf(r) === -1; ) {
    if (!de(r))
      return r;
    if (a = e[r], !a)
      return !1;
    if (a.visible)
      return r;
    o.push(r), r = a.fill;
  }
  return !1;
}
function PS(e, t, n) {
  const i = TS(e);
  if (mt(i))
    return isNaN(i.value) ? !1 : i;
  let r = parseFloat(i);
  return de(r) && Math.floor(r) === r ? MS(i[0], t, r, n) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(i) >= 0 && i;
}
function MS(e, t, n, i) {
  return (e === "-" || e === "+") && (n = t + n), n === t || n < 0 || n >= i ? !1 : n;
}
function CS(e, t) {
  let n = null;
  return e === "start" ? n = t.bottom : e === "end" ? n = t.top : mt(e) ? n = t.getPixelForValue(e.value) : t.getBasePixel && (n = t.getBasePixel()), n;
}
function LS(e, t, n) {
  let i;
  return e === "start" ? i = n : e === "end" ? i = t.options.reverse ? t.min : t.max : mt(e) ? i = e.value : i = t.getBaseValue(), i;
}
function TS(e) {
  const t = e.options, n = t.fill;
  let i = ut(n && n.target, n);
  return i === void 0 && (i = !!t.backgroundColor), i === !1 || i === null ? !1 : i === !0 ? "origin" : i;
}
function NS(e) {
  const { scale: t, index: n, line: i } = e, r = [], o = i.segments, a = i.points, c = ES(t, n);
  c.push(py({
    x: null,
    y: t.bottom
  }, i));
  for (let u = 0; u < o.length; u++) {
    const d = o[u];
    for (let p = d.start; p <= d.end; p++)
      zS(r, a[p], c);
  }
  return new ei({
    points: r,
    options: {}
  });
}
function ES(e, t) {
  const n = [], i = e.getMatchingVisibleMetas("line");
  for (let r = 0; r < i.length; r++) {
    const o = i[r];
    if (o.index === t)
      break;
    o.hidden || n.unshift(o.dataset);
  }
  return n;
}
function zS(e, t, n) {
  const i = [];
  for (let r = 0; r < n.length; r++) {
    const o = n[r], { first: a, last: c, point: u } = jS(o, t, "x");
    if (!(!u || a && c)) {
      if (a)
        i.unshift(u);
      else if (e.push(u), !c)
        break;
    }
  }
  e.push(...i);
}
function jS(e, t, n) {
  const i = e.interpolate(t, n);
  if (!i)
    return {};
  const r = i[n], o = e.segments, a = e.points;
  let c = !1, u = !1;
  for (let d = 0; d < o.length; d++) {
    const p = o[d], g = a[p.start][n], v = a[p.end][n];
    if (jn(r, g, v)) {
      c = r === g, u = r === v;
      break;
    }
  }
  return {
    first: c,
    last: u,
    point: i
  };
}
class my {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, n, i) {
    const { x: r, y: o, radius: a } = this;
    return n = n || {
      start: 0,
      end: Ot
    }, t.arc(r, o, a, n.end, n.start, !0), !i.bounds;
  }
  interpolate(t) {
    const { x: n, y: i, radius: r } = this, o = t.angle;
    return {
      x: n + Math.cos(o) * r,
      y: i + Math.sin(o) * r,
      angle: o
    };
  }
}
function OS(e) {
  const { chart: t, fill: n, line: i } = e;
  if (de(n))
    return AS(t, n);
  if (n === "stack")
    return NS(e);
  if (n === "shape")
    return !0;
  const r = IS(e);
  return r instanceof my ? r : py(r, i);
}
function AS(e, t) {
  const n = e.getDatasetMeta(t);
  return n && e.isDatasetVisible(t) ? n.dataset : null;
}
function IS(e) {
  return (e.scale || {}).getPointPositionForValue ? DS(e) : RS(e);
}
function RS(e) {
  const { scale: t = {}, fill: n } = e, i = CS(n, t);
  if (de(i)) {
    const r = t.isHorizontal();
    return {
      x: r ? i : null,
      y: r ? null : i
    };
  }
  return null;
}
function DS(e) {
  const { scale: t, fill: n } = e, i = t.options, r = t.getLabels().length, o = i.reverse ? t.max : t.min, a = LS(n, t, o), c = [];
  if (i.grid.circular) {
    const u = t.getPointPositionForValue(0, o);
    return new my({
      x: u.x,
      y: u.y,
      radius: t.getDistanceFromCenterForValue(a)
    });
  }
  for (let u = 0; u < r; ++u)
    c.push(t.getPointPositionForValue(u, a));
  return c;
}
function nu(e, t, n) {
  const i = OS(t), { chart: r, index: o, line: a, scale: c, axis: u } = t, d = a.options, p = d.fill, g = d.backgroundColor, { above: v = g, below: y = g } = p || {}, S = r.getDatasetMeta(o), w = Qv(r, S);
  i && a.points.length && (Ol(e, n), FS(e, {
    line: a,
    target: i,
    above: v,
    below: y,
    area: n,
    scale: c,
    axis: u,
    clip: w
  }), Al(e));
}
function FS(e, t) {
  const { line: n, target: i, above: r, below: o, area: a, scale: c, clip: u } = t, d = n._loop ? "angle" : t.axis;
  e.save();
  let p = o;
  o !== r && (d === "x" ? (Dm(e, i, a.top), iu(e, {
    line: n,
    target: i,
    color: r,
    scale: c,
    property: d,
    clip: u
  }), e.restore(), e.save(), Dm(e, i, a.bottom)) : d === "y" && (Fm(e, i, a.left), iu(e, {
    line: n,
    target: i,
    color: o,
    scale: c,
    property: d,
    clip: u
  }), e.restore(), e.save(), Fm(e, i, a.right), p = r)), iu(e, {
    line: n,
    target: i,
    color: p,
    scale: c,
    property: d,
    clip: u
  }), e.restore();
}
function Dm(e, t, n) {
  const { segments: i, points: r } = t;
  let o = !0, a = !1;
  e.beginPath();
  for (const c of i) {
    const { start: u, end: d } = c, p = r[u], g = r[Fl(u, d, r)];
    o ? (e.moveTo(p.x, p.y), o = !1) : (e.lineTo(p.x, n), e.lineTo(p.x, p.y)), a = !!t.pathSegment(e, c, {
      move: a
    }), a ? e.closePath() : e.lineTo(g.x, n);
  }
  e.lineTo(t.first().x, n), e.closePath(), e.clip();
}
function Fm(e, t, n) {
  const { segments: i, points: r } = t;
  let o = !0, a = !1;
  e.beginPath();
  for (const c of i) {
    const { start: u, end: d } = c, p = r[u], g = r[Fl(u, d, r)];
    o ? (e.moveTo(p.x, p.y), o = !1) : (e.lineTo(n, p.y), e.lineTo(p.x, p.y)), a = !!t.pathSegment(e, c, {
      move: a
    }), a ? e.closePath() : e.lineTo(n, g.y);
  }
  e.lineTo(n, t.first().y), e.closePath(), e.clip();
}
function iu(e, t) {
  const { line: n, target: i, property: r, color: o, scale: a, clip: c } = t, u = bS(n, i, r);
  for (const { source: d, target: p, start: g, end: v } of u) {
    const { style: { backgroundColor: y = o } = {} } = d, S = i !== !0;
    e.save(), e.fillStyle = y, BS(e, a, c, S && oh(r, g, v)), e.beginPath();
    const w = !!n.pathSegment(e, d);
    let M;
    if (S) {
      w ? e.closePath() : Bm(e, i, v, r);
      const b = !!i.pathSegment(e, p, {
        move: w,
        reverse: !0
      });
      M = w && b, M || Bm(e, i, g, r);
    }
    e.closePath(), e.fill(M ? "evenodd" : "nonzero"), e.restore();
  }
}
function BS(e, t, n, i) {
  const r = t.chart.chartArea, { property: o, start: a, end: c } = i || {};
  if (o === "x" || o === "y") {
    let u, d, p, g;
    o === "x" ? (u = a, d = r.top, p = c, g = r.bottom) : (u = r.left, d = a, p = r.right, g = c), e.beginPath(), n && (u = Math.max(u, n.left), p = Math.min(p, n.right), d = Math.max(d, n.top), g = Math.min(g, n.bottom)), e.rect(u, d, p - u, g - d), e.clip();
  }
}
function Bm(e, t, n, i) {
  const r = t.interpolate(n, i);
  r && e.lineTo(r.x, r.y);
}
var HS = {
  id: "filler",
  afterDatasetsUpdate(e, t, n) {
    const i = (e.data.datasets || []).length, r = [];
    let o, a, c, u;
    for (a = 0; a < i; ++a)
      o = e.getDatasetMeta(a), c = o.dataset, u = null, c && c.options && c instanceof ei && (u = {
        visible: e.isDatasetVisible(a),
        index: a,
        fill: PS(c, a, i),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: c
      }), o.$filler = u, r.push(u);
    for (a = 0; a < i; ++a)
      u = r[a], !(!u || u.fill === !1) && (u.fill = SS(r, a, n.propagate));
  },
  beforeDraw(e, t, n) {
    const i = n.drawTime === "beforeDraw", r = e.getSortedVisibleDatasetMetas(), o = e.chartArea;
    for (let a = r.length - 1; a >= 0; --a) {
      const c = r[a].$filler;
      c && (c.line.updateControlPoints(o, c.axis), i && c.fill && nu(e.ctx, c, o));
    }
  },
  beforeDatasetsDraw(e, t, n) {
    if (n.drawTime !== "beforeDatasetsDraw")
      return;
    const i = e.getSortedVisibleDatasetMetas();
    for (let r = i.length - 1; r >= 0; --r) {
      const o = i[r].$filler;
      Rm(o) && nu(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, n) {
    const i = t.meta.$filler;
    !Rm(i) || n.drawTime !== "beforeDatasetDraw" || nu(e.ctx, i, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Hm = (e, t) => {
  let { boxHeight: n = t, boxWidth: i = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), i = e.pointStyleWidth || Math.min(i, t)), {
    boxWidth: i,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, WS = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Wm extends vi {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, n, i) {
    this.maxWidth = t, this.maxHeight = n, this._margins = i, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let n = Tt(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (n = n.filter((i) => t.filter(i, this.chart.data))), t.sort && (n = n.sort((i, r) => t.sort(i, r, this.chart.data))), this.options.reverse && n.reverse(), this.legendItems = n;
  }
  fit() {
    const { options: t, ctx: n } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const i = t.labels, r = Se(i.font), o = r.size, a = this._computeTitleHeight(), { boxWidth: c, itemHeight: u } = Hm(i, o);
    let d, p;
    n.font = r.string, this.isHorizontal() ? (d = this.maxWidth, p = this._fitRows(a, o, c, u) + 10) : (p = this.maxHeight, d = this._fitCols(a, r, c, u) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(p, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, i, r) {
    const { ctx: o, maxWidth: a, options: { labels: { padding: c } } } = this, u = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], p = r + c;
    let g = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let v = -1, y = -p;
    return this.legendItems.forEach((S, w) => {
      const M = i + n / 2 + o.measureText(S.text).width;
      (w === 0 || d[d.length - 1] + M + 2 * c > a) && (g += p, d[d.length - (w > 0 ? 0 : 1)] = 0, y += p, v++), u[w] = {
        left: 0,
        top: y,
        row: v,
        width: M,
        height: r
      }, d[d.length - 1] += M + c;
    }), g;
  }
  _fitCols(t, n, i, r) {
    const { ctx: o, maxHeight: a, options: { labels: { padding: c } } } = this, u = this.legendHitBoxes = [], d = this.columnSizes = [], p = a - t;
    let g = c, v = 0, y = 0, S = 0, w = 0;
    return this.legendItems.forEach((M, b) => {
      const { itemWidth: k, itemHeight: P } = VS(i, n, o, M, r);
      b > 0 && y + P + 2 * c > p && (g += v + c, d.push({
        width: v,
        height: y
      }), S += v + c, w++, v = y = 0), u[b] = {
        left: S,
        top: y,
        col: w,
        width: k,
        height: P
      }, v = Math.max(v, k), y += P + c;
    }), g += v, d.push({
      width: v,
      height: y
    }), g;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: i, labels: { padding: r }, rtl: o } } = this, a = Ts(o, this.left, this.width);
    if (this.isHorizontal()) {
      let c = 0, u = Te(i, this.left + r, this.right - this.lineWidths[c]);
      for (const d of n)
        c !== d.row && (c = d.row, u = Te(i, this.left + r, this.right - this.lineWidths[c])), d.top += this.top + t + r, d.left = a.leftForLtr(a.x(u), d.width), u += d.width + r;
    } else {
      let c = 0, u = Te(i, this.top + t + r, this.bottom - this.columnSizes[c].height);
      for (const d of n)
        d.col !== c && (c = d.col, u = Te(i, this.top + t + r, this.bottom - this.columnSizes[c].height)), d.top = u, d.left += this.left + r, d.left = a.leftForLtr(a.x(d.left), d.width), u += d.height + r;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Ol(t, this), this._draw(), Al(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: i, ctx: r } = this, { align: o, labels: a } = t, c = Wt.color, u = Ts(t.rtl, this.left, this.width), d = Se(a.font), { padding: p } = a, g = d.size, v = g / 2;
    let y;
    this.drawTitle(), r.textAlign = u.textAlign("left"), r.textBaseline = "middle", r.lineWidth = 0.5, r.font = d.string;
    const { boxWidth: S, boxHeight: w, itemHeight: M } = Hm(a, g), b = function(j, O, A) {
      if (isNaN(S) || S <= 0 || isNaN(w) || w < 0)
        return;
      r.save();
      const H = ut(A.lineWidth, 1);
      if (r.fillStyle = ut(A.fillStyle, c), r.lineCap = ut(A.lineCap, "butt"), r.lineDashOffset = ut(A.lineDashOffset, 0), r.lineJoin = ut(A.lineJoin, "miter"), r.lineWidth = H, r.strokeStyle = ut(A.strokeStyle, c), r.setLineDash(ut(A.lineDash, [])), a.usePointStyle) {
        const F = {
          radius: w * Math.SQRT2 / 2,
          pointStyle: A.pointStyle,
          rotation: A.rotation,
          borderWidth: H
        }, V = u.xPlus(j, S / 2), K = O + v;
        Bv(r, F, V, K, a.pointStyleWidth && S);
      } else {
        const F = O + Math.max((g - w) / 2, 0), V = u.leftForLtr(j, S), K = Ls(A.borderRadius);
        r.beginPath(), Object.values(K).some((yt) => yt !== 0) ? dl(r, {
          x: V,
          y: F,
          w: S,
          h: w,
          radius: K
        }) : r.rect(V, F, S, w), r.fill(), H !== 0 && r.stroke();
      }
      r.restore();
    }, k = function(j, O, A) {
      hl(r, A.text, j, O + M / 2, d, {
        strikethrough: A.hidden,
        textAlign: u.textAlign(A.textAlign)
      });
    }, P = this.isHorizontal(), T = this._computeTitleHeight();
    P ? y = {
      x: Te(o, this.left + p, this.right - i[0]),
      y: this.top + p + T,
      line: 0
    } : y = {
      x: this.left + p,
      y: Te(o, this.top + T + p, this.bottom - n[0].height),
      line: 0
    }, Yv(this.ctx, t.textDirection);
    const N = M + p;
    this.legendItems.forEach((j, O) => {
      r.strokeStyle = j.fontColor, r.fillStyle = j.fontColor;
      const A = r.measureText(j.text).width, H = u.textAlign(j.textAlign || (j.textAlign = a.textAlign)), F = S + v + A;
      let V = y.x, K = y.y;
      u.setWidth(this.width), P ? O > 0 && V + F + p > this.right && (K = y.y += N, y.line++, V = y.x = Te(o, this.left + p, this.right - i[y.line])) : O > 0 && K + N > this.bottom && (V = y.x = V + n[y.line].width + p, y.line++, K = y.y = Te(o, this.top + T + p, this.bottom - n[y.line].height));
      const yt = u.x(V);
      if (b(yt, K, j), V = yb(H, V + S + v, P ? V + F : this.right, t.rtl), k(u.x(V), K, j), P)
        y.x += F + p;
      else if (typeof j.text != "string") {
        const $ = d.lineHeight;
        y.y += gy(j, $) + p;
      } else
        y.y += N;
    }), qv(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, i = Se(n.font), r = rn(n.padding);
    if (!n.display)
      return;
    const o = Ts(t.rtl, this.left, this.width), a = this.ctx, c = n.position, u = i.size / 2, d = r.top + u;
    let p, g = this.left, v = this.width;
    if (this.isHorizontal())
      v = Math.max(...this.lineWidths), p = this.top + d, g = Te(t.align, g, this.right - v);
    else {
      const S = this.columnSizes.reduce((w, M) => Math.max(w, M.height), 0);
      p = d + Te(t.align, this.top, this.bottom - S - t.labels.padding - this._computeTitleHeight());
    }
    const y = Te(c, g, g + v);
    a.textAlign = o.textAlign(Dv(c)), a.textBaseline = "middle", a.strokeStyle = n.color, a.fillStyle = n.color, a.font = i.string, hl(a, n.text, y, p, i);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Se(t.font), i = rn(t.padding);
    return t.display ? n.lineHeight + i.height : 0;
  }
  _getLegendItemAt(t, n) {
    let i, r, o;
    if (jn(t, this.left, this.right) && jn(n, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, i = 0; i < o.length; ++i)
        if (r = o[i], jn(t, r.left, r.left + r.width) && jn(n, r.top, r.top + r.height))
          return this.legendItems[i];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!$S(t.type, n))
      return;
    const i = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const r = this._hoveredItem, o = WS(r, i);
      r && !o && Tt(n.onLeave, [
        t,
        r,
        this
      ], this), this._hoveredItem = i, i && !o && Tt(n.onHover, [
        t,
        i,
        this
      ], this);
    } else i && Tt(n.onClick, [
      t,
      i,
      this
    ], this);
  }
}
function VS(e, t, n, i, r) {
  const o = ZS(i, e, t, n), a = US(r, i, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: a
  };
}
function ZS(e, t, n, i) {
  let r = e.text;
  return r && typeof r != "string" && (r = r.reduce((o, a) => o.length > a.length ? o : a)), t + n.size / 2 + i.measureText(r).width;
}
function US(e, t, n) {
  let i = e;
  return typeof t.text != "string" && (i = gy(t, n)), i;
}
function gy(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function $S(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var YS = {
  id: "legend",
  _element: Wm,
  start(e, t, n) {
    const i = e.legend = new Wm({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    ti.configure(e, i, n), ti.addBox(e, i);
  },
  stop(e) {
    ti.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const i = e.legend;
    ti.configure(e, i, n), i.options = n;
  },
  afterUpdate(e) {
    const t = e.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(e, t) {
    t.replay || e.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(e, t, n) {
      const i = t.datasetIndex, r = n.chart;
      r.isDatasetVisible(i) ? (r.hide(i), t.hidden = !0) : (r.show(i), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (e) => e.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(e) {
        const t = e.data.datasets, { labels: { usePointStyle: n, pointStyle: i, textAlign: r, color: o, useBorderRadius: a, borderRadius: c } } = e.legend.options;
        return e._getSortedDatasetMetas().map((u) => {
          const d = u.controller.getStyle(n ? 0 : void 0), p = rn(d.borderWidth);
          return {
            text: t[u.index].label,
            fillStyle: d.backgroundColor,
            fontColor: o,
            hidden: !u.visible,
            lineCap: d.borderCapStyle,
            lineDash: d.borderDash,
            lineDashOffset: d.borderDashOffset,
            lineJoin: d.borderJoinStyle,
            lineWidth: (p.width + p.height) / 4,
            strokeStyle: d.borderColor,
            pointStyle: i || d.pointStyle,
            rotation: d.rotation,
            textAlign: r || d.textAlign,
            borderRadius: a && (c || d.borderRadius),
            datasetIndex: u.index
          };
        }, this);
      }
    },
    title: {
      color: (e) => e.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (e) => !e.startsWith("on"),
    labels: {
      _scriptable: (e) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(e)
    }
  }
};
const Lr = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, i = /* @__PURE__ */ new Set(), r = 0, o = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const c = e[t].element;
      if (c && c.hasValue()) {
        const u = c.tooltipPosition();
        i.add(u.x), r += u.y, ++o;
      }
    }
    return o === 0 || i.size === 0 ? !1 : {
      x: [
        ...i
      ].reduce((c, u) => c + u) / i.size,
      y: r / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, i = t.y, r = Number.POSITIVE_INFINITY, o, a, c;
    for (o = 0, a = e.length; o < a; ++o) {
      const u = e[o].element;
      if (u && u.hasValue()) {
        const d = u.getCenterPoint(), p = th(t, d);
        p < r && (r = p, c = u);
      }
    }
    if (c) {
      const u = c.tooltipPosition();
      n = u.x, i = u.y;
    }
    return {
      x: n,
      y: i
    };
  }
};
function dn(e, t) {
  return t && (qt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Mn(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function qS(e, t) {
  const { element: n, datasetIndex: i, index: r } = t, o = e.getDatasetMeta(i).controller, { label: a, value: c } = o.getLabelAndValue(r);
  return {
    chart: e,
    label: a,
    parsed: o.getParsed(r),
    raw: e.data.datasets[i].data[r],
    formattedValue: c,
    dataset: o.getDataset(),
    dataIndex: r,
    datasetIndex: i,
    element: n
  };
}
function Vm(e, t) {
  const n = e.chart.ctx, { body: i, footer: r, title: o } = e, { boxWidth: a, boxHeight: c } = t, u = Se(t.bodyFont), d = Se(t.titleFont), p = Se(t.footerFont), g = o.length, v = r.length, y = i.length, S = rn(t.padding);
  let w = S.height, M = 0, b = i.reduce((T, N) => T + N.before.length + N.lines.length + N.after.length, 0);
  if (b += e.beforeBody.length + e.afterBody.length, g && (w += g * d.lineHeight + (g - 1) * t.titleSpacing + t.titleMarginBottom), b) {
    const T = t.displayColors ? Math.max(c, u.lineHeight) : u.lineHeight;
    w += y * T + (b - y) * u.lineHeight + (b - 1) * t.bodySpacing;
  }
  v && (w += t.footerMarginTop + v * p.lineHeight + (v - 1) * t.footerSpacing);
  let k = 0;
  const P = function(T) {
    M = Math.max(M, n.measureText(T).width + k);
  };
  return n.save(), n.font = d.string, bt(e.title, P), n.font = u.string, bt(e.beforeBody.concat(e.afterBody), P), k = t.displayColors ? a + 2 + t.boxPadding : 0, bt(i, (T) => {
    bt(T.before, P), bt(T.lines, P), bt(T.after, P);
  }), k = 0, n.font = p.string, bt(e.footer, P), n.restore(), M += S.width, {
    width: M,
    height: w
  };
}
function KS(e, t) {
  const { y: n, height: i } = t;
  return n < i / 2 ? "top" : n > e.height - i / 2 ? "bottom" : "center";
}
function XS(e, t, n, i) {
  const { x: r, width: o } = i, a = n.caretSize + n.caretPadding;
  if (e === "left" && r + o + a > t.width || e === "right" && r - o - a < 0)
    return !0;
}
function GS(e, t, n, i) {
  const { x: r, width: o } = n, { width: a, chartArea: { left: c, right: u } } = e;
  let d = "center";
  return i === "center" ? d = r <= (c + u) / 2 ? "left" : "right" : r <= o / 2 ? d = "left" : r >= a - o / 2 && (d = "right"), XS(d, e, t, n) && (d = "center"), d;
}
function Zm(e, t, n) {
  const i = n.yAlign || t.yAlign || KS(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || GS(e, t, n, i),
    yAlign: i
  };
}
function QS(e, t) {
  let { x: n, width: i } = e;
  return t === "right" ? n -= i : t === "center" && (n -= i / 2), n;
}
function JS(e, t, n) {
  let { y: i, height: r } = e;
  return t === "top" ? i += n : t === "bottom" ? i -= r + n : i -= r / 2, i;
}
function Um(e, t, n, i) {
  const { caretSize: r, caretPadding: o, cornerRadius: a } = e, { xAlign: c, yAlign: u } = n, d = r + o, { topLeft: p, topRight: g, bottomLeft: v, bottomRight: y } = Ls(a);
  let S = QS(t, c);
  const w = JS(t, u, d);
  return u === "center" ? c === "left" ? S += d : c === "right" && (S -= d) : c === "left" ? S -= Math.max(p, v) + r : c === "right" && (S += Math.max(g, y) + r), {
    x: ue(S, 0, i.width - t.width),
    y: ue(w, 0, i.height - t.height)
  };
}
function ga(e, t, n) {
  const i = rn(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - i.right : e.x + i.left;
}
function $m(e) {
  return dn([], Mn(e));
}
function tP(e, t, n) {
  return qi(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function Ym(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const _y = {
  beforeTitle: Sn,
  title(e) {
    if (e.length > 0) {
      const t = e[0], n = t.chart.data.labels, i = n ? n.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (i > 0 && t.dataIndex < i)
        return n[t.dataIndex];
    }
    return "";
  },
  afterTitle: Sn,
  beforeBody: Sn,
  beforeLabel: Sn,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return wt(n) || (t += n), t;
  },
  labelColor(e) {
    const n = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      borderColor: n.borderColor,
      backgroundColor: n.backgroundColor,
      borderWidth: n.borderWidth,
      borderDash: n.borderDash,
      borderDashOffset: n.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(e) {
    const n = e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);
    return {
      pointStyle: n.pointStyle,
      rotation: n.rotation
    };
  },
  afterLabel: Sn,
  afterBody: Sn,
  beforeFooter: Sn,
  footer: Sn,
  afterFooter: Sn
};
function xe(e, t, n, i) {
  const r = e[t].call(n, i);
  return typeof r > "u" ? _y[t].call(n, i) : r;
}
class ah extends vi {
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const n = this.chart, i = this.options.setContext(this.getContext()), r = i.enabled && n.options.animation && i.animations, o = new Jv(this.chart, r);
    return r._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = tP(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: i } = n, r = xe(i, "beforeTitle", this, t), o = xe(i, "title", this, t), a = xe(i, "afterTitle", this, t);
    let c = [];
    return c = dn(c, Mn(r)), c = dn(c, Mn(o)), c = dn(c, Mn(a)), c;
  }
  getBeforeBody(t, n) {
    return $m(xe(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: i } = n, r = [];
    return bt(t, (o) => {
      const a = {
        before: [],
        lines: [],
        after: []
      }, c = Ym(i, o);
      dn(a.before, Mn(xe(c, "beforeLabel", this, o))), dn(a.lines, xe(c, "label", this, o)), dn(a.after, Mn(xe(c, "afterLabel", this, o))), r.push(a);
    }), r;
  }
  getAfterBody(t, n) {
    return $m(xe(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: i } = n, r = xe(i, "beforeFooter", this, t), o = xe(i, "footer", this, t), a = xe(i, "afterFooter", this, t);
    let c = [];
    return c = dn(c, Mn(r)), c = dn(c, Mn(o)), c = dn(c, Mn(a)), c;
  }
  _createItems(t) {
    const n = this._active, i = this.chart.data, r = [], o = [], a = [];
    let c = [], u, d;
    for (u = 0, d = n.length; u < d; ++u)
      c.push(qS(this.chart, n[u]));
    return t.filter && (c = c.filter((p, g, v) => t.filter(p, g, v, i))), t.itemSort && (c = c.sort((p, g) => t.itemSort(p, g, i))), bt(c, (p) => {
      const g = Ym(t.callbacks, p);
      r.push(xe(g, "labelColor", this, p)), o.push(xe(g, "labelPointStyle", this, p)), a.push(xe(g, "labelTextColor", this, p));
    }), this.labelColors = r, this.labelPointStyles = o, this.labelTextColors = a, this.dataPoints = c, c;
  }
  update(t, n) {
    const i = this.options.setContext(this.getContext()), r = this._active;
    let o, a = [];
    if (!r.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const c = Lr[i.position].call(this, r, this._eventPosition);
      a = this._createItems(i), this.title = this.getTitle(a, i), this.beforeBody = this.getBeforeBody(a, i), this.body = this.getBody(a, i), this.afterBody = this.getAfterBody(a, i), this.footer = this.getFooter(a, i);
      const u = this._size = Vm(this, i), d = Object.assign({}, c, u), p = Zm(this.chart, i, d), g = Um(i, d, p, this.chart);
      this.xAlign = p.xAlign, this.yAlign = p.yAlign, o = {
        opacity: 1,
        x: g.x,
        y: g.y,
        width: u.width,
        height: u.height,
        caretX: c.x,
        caretY: c.y
      };
    }
    this._tooltipItems = a, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && i.external && i.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: n
    });
  }
  drawCaret(t, n, i, r) {
    const o = this.getCaretPosition(t, i, r);
    n.lineTo(o.x1, o.y1), n.lineTo(o.x2, o.y2), n.lineTo(o.x3, o.y3);
  }
  getCaretPosition(t, n, i) {
    const { xAlign: r, yAlign: o } = this, { caretSize: a, cornerRadius: c } = i, { topLeft: u, topRight: d, bottomLeft: p, bottomRight: g } = Ls(c), { x: v, y } = t, { width: S, height: w } = n;
    let M, b, k, P, T, N;
    return o === "center" ? (T = y + w / 2, r === "left" ? (M = v, b = M - a, P = T + a, N = T - a) : (M = v + S, b = M + a, P = T - a, N = T + a), k = M) : (r === "left" ? b = v + Math.max(u, p) + a : r === "right" ? b = v + S - Math.max(d, g) - a : b = this.caretX, o === "top" ? (P = y, T = P - a, M = b - a, k = b + a) : (P = y + w, T = P + a, M = b + a, k = b - a), N = P), {
      x1: M,
      x2: b,
      x3: k,
      y1: P,
      y2: T,
      y3: N
    };
  }
  drawTitle(t, n, i) {
    const r = this.title, o = r.length;
    let a, c, u;
    if (o) {
      const d = Ts(i.rtl, this.x, this.width);
      for (t.x = ga(this, i.titleAlign, i), n.textAlign = d.textAlign(i.titleAlign), n.textBaseline = "middle", a = Se(i.titleFont), c = i.titleSpacing, n.fillStyle = i.titleColor, n.font = a.string, u = 0; u < o; ++u)
        n.fillText(r[u], d.x(t.x), t.y + a.lineHeight / 2), t.y += a.lineHeight + c, u + 1 === o && (t.y += i.titleMarginBottom - c);
    }
  }
  _drawColorBox(t, n, i, r, o) {
    const a = this.labelColors[i], c = this.labelPointStyles[i], { boxHeight: u, boxWidth: d } = o, p = Se(o.bodyFont), g = ga(this, "left", o), v = r.x(g), y = u < p.lineHeight ? (p.lineHeight - u) / 2 : 0, S = n.y + y;
    if (o.usePointStyle) {
      const w = {
        radius: Math.min(d, u) / 2,
        pointStyle: c.pointStyle,
        rotation: c.rotation,
        borderWidth: 1
      }, M = r.leftForLtr(v, d) + d / 2, b = S + u / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, nh(t, w, M, b), t.strokeStyle = a.borderColor, t.fillStyle = a.backgroundColor, nh(t, w, M, b);
    } else {
      t.lineWidth = mt(a.borderWidth) ? Math.max(...Object.values(a.borderWidth)) : a.borderWidth || 1, t.strokeStyle = a.borderColor, t.setLineDash(a.borderDash || []), t.lineDashOffset = a.borderDashOffset || 0;
      const w = r.leftForLtr(v, d), M = r.leftForLtr(r.xPlus(v, 1), d - 2), b = Ls(a.borderRadius);
      Object.values(b).some((k) => k !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, dl(t, {
        x: w,
        y: S,
        w: d,
        h: u,
        radius: b
      }), t.fill(), t.stroke(), t.fillStyle = a.backgroundColor, t.beginPath(), dl(t, {
        x: M,
        y: S + 1,
        w: d - 2,
        h: u - 2,
        radius: b
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(w, S, d, u), t.strokeRect(w, S, d, u), t.fillStyle = a.backgroundColor, t.fillRect(M, S + 1, d - 2, u - 2));
    }
    t.fillStyle = this.labelTextColors[i];
  }
  drawBody(t, n, i) {
    const { body: r } = this, { bodySpacing: o, bodyAlign: a, displayColors: c, boxHeight: u, boxWidth: d, boxPadding: p } = i, g = Se(i.bodyFont);
    let v = g.lineHeight, y = 0;
    const S = Ts(i.rtl, this.x, this.width), w = function(A) {
      n.fillText(A, S.x(t.x + y), t.y + v / 2), t.y += v + o;
    }, M = S.textAlign(a);
    let b, k, P, T, N, j, O;
    for (n.textAlign = a, n.textBaseline = "middle", n.font = g.string, t.x = ga(this, M, i), n.fillStyle = i.bodyColor, bt(this.beforeBody, w), y = c && M !== "right" ? a === "center" ? d / 2 + p : d + 2 + p : 0, T = 0, j = r.length; T < j; ++T) {
      for (b = r[T], k = this.labelTextColors[T], n.fillStyle = k, bt(b.before, w), P = b.lines, c && P.length && (this._drawColorBox(n, t, T, S, i), v = Math.max(g.lineHeight, u)), N = 0, O = P.length; N < O; ++N)
        w(P[N]), v = g.lineHeight;
      bt(b.after, w);
    }
    y = 0, v = g.lineHeight, bt(this.afterBody, w), t.y -= o;
  }
  drawFooter(t, n, i) {
    const r = this.footer, o = r.length;
    let a, c;
    if (o) {
      const u = Ts(i.rtl, this.x, this.width);
      for (t.x = ga(this, i.footerAlign, i), t.y += i.footerMarginTop, n.textAlign = u.textAlign(i.footerAlign), n.textBaseline = "middle", a = Se(i.footerFont), n.fillStyle = i.footerColor, n.font = a.string, c = 0; c < o; ++c)
        n.fillText(r[c], u.x(t.x), t.y + a.lineHeight / 2), t.y += a.lineHeight + i.footerSpacing;
    }
  }
  drawBackground(t, n, i, r) {
    const { xAlign: o, yAlign: a } = this, { x: c, y: u } = t, { width: d, height: p } = i, { topLeft: g, topRight: v, bottomLeft: y, bottomRight: S } = Ls(r.cornerRadius);
    n.fillStyle = r.backgroundColor, n.strokeStyle = r.borderColor, n.lineWidth = r.borderWidth, n.beginPath(), n.moveTo(c + g, u), a === "top" && this.drawCaret(t, n, i, r), n.lineTo(c + d - v, u), n.quadraticCurveTo(c + d, u, c + d, u + v), a === "center" && o === "right" && this.drawCaret(t, n, i, r), n.lineTo(c + d, u + p - S), n.quadraticCurveTo(c + d, u + p, c + d - S, u + p), a === "bottom" && this.drawCaret(t, n, i, r), n.lineTo(c + y, u + p), n.quadraticCurveTo(c, u + p, c, u + p - y), a === "center" && o === "left" && this.drawCaret(t, n, i, r), n.lineTo(c, u + g), n.quadraticCurveTo(c, u, c + g, u), n.closePath(), n.fill(), r.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, i = this.$animations, r = i && i.x, o = i && i.y;
    if (r || o) {
      const a = Lr[t.position].call(this, this._active, this._eventPosition);
      if (!a)
        return;
      const c = this._size = Vm(this, t), u = Object.assign({}, a, this._size), d = Zm(n, t, u), p = Um(t, u, d, n);
      (r._to !== p.x || o._to !== p.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = c.width, this.height = c.height, this.caretX = a.x, this.caretY = a.y, this._resolveAnimations().update(this, p));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const n = this.options.setContext(this.getContext());
    let i = this.opacity;
    if (!i)
      return;
    this._updateAnimationTarget(n);
    const r = {
      width: this.width,
      height: this.height
    }, o = {
      x: this.x,
      y: this.y
    };
    i = Math.abs(i) < 1e-3 ? 0 : i;
    const a = rn(n.padding), c = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && c && (t.save(), t.globalAlpha = i, this.drawBackground(o, t, r, n), Yv(t, n.textDirection), o.y += a.top, this.drawTitle(o, t, n), this.drawBody(o, t, n), this.drawFooter(o, t, n), qv(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const i = this._active, r = t.map(({ datasetIndex: c, index: u }) => {
      const d = this.chart.getDatasetMeta(c);
      if (!d)
        throw new Error("Cannot find a dataset at index " + c);
      return {
        datasetIndex: c,
        element: d.data[u],
        index: u
      };
    }), o = !ll(i, r), a = this._positionChanged(r, n);
    (o || a) && (this._active = r, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, i = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const r = this.options, o = this._active || [], a = this._getActiveElements(t, o, n, i), c = this._positionChanged(a, t), u = n || !ll(a, o) || c;
    return u && (this._active = a, (r.enabled || r.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), u;
  }
  _getActiveElements(t, n, i, r) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!r)
      return n.filter((c) => this.chart.data.datasets[c.datasetIndex] && this.chart.getDatasetMeta(c.datasetIndex).controller.getParsed(c.index) !== void 0);
    const a = this.chart.getElementsAtEventForMode(t, o.mode, o, i);
    return o.reverse && a.reverse(), a;
  }
  _positionChanged(t, n) {
    const { caretX: i, caretY: r, options: o } = this, a = Lr[o.position].call(this, t, n);
    return a !== !1 && (i !== a.x || r !== a.y);
  }
}
q(ah, "positioners", Lr);
var eP = {
  id: "tooltip",
  _element: ah,
  positioners: Lr,
  afterInit(e, t, n) {
    n && (e.tooltip = new ah({
      chart: e,
      options: n
    }));
  },
  beforeUpdate(e, t, n) {
    e.tooltip && e.tooltip.initialize(n);
  },
  reset(e, t, n) {
    e.tooltip && e.tooltip.initialize(n);
  },
  afterDraw(e) {
    const t = e.tooltip;
    if (t && t._willRender()) {
      const n = {
        tooltip: t
      };
      if (e.notifyPlugins("beforeTooltipDraw", {
        ...n,
        cancelable: !0
      }) === !1)
        return;
      t.draw(e.ctx), e.notifyPlugins("afterTooltipDraw", n);
    }
  },
  afterEvent(e, t) {
    if (e.tooltip) {
      const n = t.replay;
      e.tooltip.handleEvent(t.event, n, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (e, t) => t.bodyFont.size,
    boxWidth: (e, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: _y
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (e) => e !== "filter" && e !== "itemSort" && e !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
};
const nP = (e, t, n, i) => (typeof t == "string" ? (n = e.push(t) - 1, i.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function iP(e, t, n, i) {
  const r = e.indexOf(t);
  if (r === -1)
    return nP(e, t, n, i);
  const o = e.lastIndexOf(t);
  return r !== o ? n : r;
}
const sP = (e, t) => e === null ? null : ue(Math.round(e), 0, t);
function qm(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class lh extends Vs {
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const n = this._addedLabels;
    if (n.length) {
      const i = this.getLabels();
      for (const { index: r, label: o } of n)
        i[r] === o && i.splice(r, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, n) {
    if (wt(t))
      return null;
    const i = this.getLabels();
    return n = isFinite(n) && i[n] === t ? n : iP(i, t, ut(n, t), this._addedLabels), sP(n, i.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: n } = this.getUserBounds();
    let { min: i, max: r } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (i = 0), n || (r = this.getLabels().length - 1)), this.min = i, this.max = r;
  }
  buildTicks() {
    const t = this.min, n = this.max, i = this.options.offset, r = [];
    let o = this.getLabels();
    o = t === 0 && n === o.length - 1 ? o : o.slice(t, n + 1), this._valueRange = Math.max(o.length - (i ? 0 : 1), 1), this._startValue = this.min - (i ? 0.5 : 0);
    for (let a = t; a <= n; a++)
      r.push({
        value: a
      });
    return r;
  }
  getLabelForValue(t) {
    return qm.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const n = this.ticks;
    return t < 0 || t > n.length - 1 ? null : this.getPixelForValue(n[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
q(lh, "id", "category"), q(lh, "defaults", {
  ticks: {
    callback: qm
  }
});
function rP(e, t) {
  const n = [], { bounds: r, step: o, min: a, max: c, precision: u, count: d, maxTicks: p, maxDigits: g, includeBounds: v } = e, y = o || 1, S = p - 1, { min: w, max: M } = t, b = !wt(a), k = !wt(c), P = !wt(d), T = (M - w) / (g + 1);
  let N = Up((M - w) / S / y) * y, j, O, A, H;
  if (N < 1e-14 && !b && !k)
    return [
      {
        value: w
      },
      {
        value: M
      }
    ];
  H = Math.ceil(M / N) - Math.floor(w / N), H > S && (N = Up(H * N / S / y) * y), wt(u) || (j = Math.pow(10, u), N = Math.ceil(N * j) / j), r === "ticks" ? (O = Math.floor(w / N) * N, A = Math.ceil(M / N) * N) : (O = w, A = M), b && k && o && ub((c - a) / o, N / 1e3) ? (H = Math.round(Math.min((c - a) / N, p)), N = (c - a) / H, O = a, A = c) : P ? (O = b ? a : O, A = k ? c : A, H = d - 1, N = (A - O) / H) : (H = (A - O) / N, Fr(H, Math.round(H), N / 1e3) ? H = Math.round(H) : H = Math.ceil(H));
  const F = Math.max($p(N), $p(O));
  j = Math.pow(10, wt(u) ? F : u), O = Math.round(O * j) / j, A = Math.round(A * j) / j;
  let V = 0;
  for (b && (v && O !== a ? (n.push({
    value: a
  }), O < a && V++, Fr(Math.round((O + V * N) * j) / j, a, Km(a, T, e)) && V++) : O < a && V++); V < H; ++V) {
    const K = Math.round((O + V * N) * j) / j;
    if (k && K > c)
      break;
    n.push({
      value: K
    });
  }
  return k && v && A !== c ? n.length && Fr(n[n.length - 1].value, c, Km(c, T, e)) ? n[n.length - 1].value = c : n.push({
    value: c
  }) : (!k || A === c) && n.push({
    value: A
  }), n;
}
function Km(e, t, { horizontal: n, minRotation: i }) {
  const r = zn(i), o = (n ? Math.sin(r) : Math.cos(r)) || 1e-3, a = 0.75 * t * ("" + e).length;
  return Math.min(t / o, a);
}
class oP extends Vs {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return wt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: i } = this.getUserBounds();
    let { min: r, max: o } = this;
    const a = (u) => r = n ? r : u, c = (u) => o = i ? o : u;
    if (t) {
      const u = yn(r), d = yn(o);
      u < 0 && d < 0 ? c(0) : u > 0 && d > 0 && a(0);
    }
    if (r === o) {
      let u = o === 0 ? 1 : Math.abs(o * 0.05);
      c(o + u), t || a(r - u);
    }
    this.min = r, this.max = o;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: n, stepSize: i } = t, r;
    return i ? (r = Math.ceil(this.max / i) - Math.floor(this.min / i) + 1, r > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${r} ticks. Limiting to 1000.`), r = 1e3)) : (r = this.computeTickLimit(), n = n || 11), n && (r = Math.min(n, r)), r;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, n = t.ticks;
    let i = this.getTickLimit();
    i = Math.max(2, i);
    const r = {
      maxTicks: i,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: n.precision,
      step: n.stepSize,
      count: n.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: n.minRotation || 0,
      includeBounds: n.includeBounds !== !1
    }, o = this._range || this, a = rP(r, o);
    return t.bounds === "ticks" && hb(a, this, "value"), t.reverse ? (a.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), a;
  }
  configure() {
    const t = this.ticks;
    let n = this.min, i = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const r = (i - n) / Math.max(t.length - 1, 1) / 2;
      n -= r, i += r;
    }
    this._startValue = n, this._endValue = i, this._valueRange = i - n;
  }
  getLabelForValue(t) {
    return md(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class ch extends oP {
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = de(t) ? t : 0, this.max = de(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, i = zn(this.options.ticks.minRotation), r = (t ? Math.sin(i) : Math.cos(i)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, o.lineHeight / r));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
q(ch, "id", "linear"), q(ch, "defaults", {
  ticks: {
    callback: Fv.formatters.numeric
  }
});
const Bl = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, be = /* @__PURE__ */ Object.keys(Bl);
function Xm(e, t) {
  return e - t;
}
function Gm(e, t) {
  if (wt(t))
    return null;
  const n = e._adapter, { parser: i, round: r, isoWeekday: o } = e._parseOpts;
  let a = t;
  return typeof i == "function" && (a = i(a)), de(a) || (a = typeof i == "string" ? n.parse(a, i) : n.parse(a)), a === null ? null : (r && (a = r === "week" && (lo(o) || o === !0) ? n.startOf(a, "isoWeek", o) : n.startOf(a, r)), +a);
}
function Qm(e, t, n, i) {
  const r = be.length;
  for (let o = be.indexOf(e); o < r - 1; ++o) {
    const a = Bl[be[o]], c = a.steps ? a.steps : Number.MAX_SAFE_INTEGER;
    if (a.common && Math.ceil((n - t) / (c * a.size)) <= i)
      return be[o];
  }
  return be[r - 1];
}
function aP(e, t, n, i, r) {
  for (let o = be.length - 1; o >= be.indexOf(n); o--) {
    const a = be[o];
    if (Bl[a].common && e._adapter.diff(r, i, a) >= t - 1)
      return a;
  }
  return be[n ? be.indexOf(n) : 0];
}
function lP(e) {
  for (let t = be.indexOf(e) + 1, n = be.length; t < n; ++t)
    if (Bl[be[t]].common)
      return be[t];
}
function Jm(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: i, hi: r } = fd(n, t), o = n[i] >= t ? n[i] : n[r];
    e[o] = !0;
  }
}
function cP(e, t, n, i) {
  const r = e._adapter, o = +r.startOf(t[0].value, i), a = t[t.length - 1].value;
  let c, u;
  for (c = o; c <= a; c = +r.add(c, 1, i))
    u = n[c], u >= 0 && (t[u].major = !0);
  return t;
}
function tg(e, t, n) {
  const i = [], r = {}, o = t.length;
  let a, c;
  for (a = 0; a < o; ++a)
    c = t[a], r[c] = a, i.push({
      value: c,
      major: !1
    });
  return o === 0 || !n ? i : cP(e, i, r, n);
}
class gl extends Vs {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, n = {}) {
    const i = t.time || (t.time = {}), r = this._adapter = new Yk._date(t.adapters.date);
    r.init(n), Dr(i.displayFormats, r.formats()), this._parseOpts = {
      parser: i.parser,
      round: i.round,
      isoWeekday: i.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Gm(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, n = this._adapter, i = t.time.unit || "day";
    let { min: r, max: o, minDefined: a, maxDefined: c } = this.getUserBounds();
    function u(d) {
      !a && !isNaN(d.min) && (r = Math.min(r, d.min)), !c && !isNaN(d.max) && (o = Math.max(o, d.max));
    }
    (!a || !c) && (u(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && u(this.getMinMax(!1))), r = de(r) && !isNaN(r) ? r : +n.startOf(Date.now(), i), o = de(o) && !isNaN(o) ? o : +n.endOf(Date.now(), i) + 1, this.min = Math.min(r, o - 1), this.max = Math.max(r + 1, o);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let n = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
    return t.length && (n = t[0], i = t[t.length - 1]), {
      min: n,
      max: i
    };
  }
  buildTicks() {
    const t = this.options, n = t.time, i = t.ticks, r = i.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && r.length && (this.min = this._userMin || r[0], this.max = this._userMax || r[r.length - 1]);
    const o = this.min, a = this.max, c = gb(r, o, a);
    return this._unit = n.unit || (i.autoSkip ? Qm(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : aP(this, c.length, n.minUnit, this.min, this.max)), this._majorUnit = !i.major.enabled || this._unit === "year" ? void 0 : lP(this._unit), this.initOffsets(r), t.reverse && c.reverse(), tg(this, c, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, i = 0, r, o;
    this.options.offset && t.length && (r = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - r : n = (this.getDecimalForValue(t[1]) - r) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? i = o : i = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const a = t.length < 3 ? 0.5 : 0.25;
    n = ue(n, 0, a), i = ue(i, 0, a), this._offsets = {
      start: n,
      end: i,
      factor: 1 / (n + 1 + i)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, i = this.max, r = this.options, o = r.time, a = o.unit || Qm(o.minUnit, n, i, this._getLabelCapacity(n)), c = ut(r.ticks.stepSize, 1), u = a === "week" ? o.isoWeekday : !1, d = lo(u) || u === !0, p = {};
    let g = n, v, y;
    if (d && (g = +t.startOf(g, "isoWeek", u)), g = +t.startOf(g, d ? "day" : a), t.diff(i, n, a) > 1e5 * c)
      throw new Error(n + " and " + i + " are too far apart with stepSize of " + c + " " + a);
    const S = r.ticks.source === "data" && this.getDataTimestamps();
    for (v = g, y = 0; v < i; v = +t.add(v, c, a), y++)
      Jm(p, v, S);
    return (v === i || r.bounds === "ticks" || y === 1) && Jm(p, v, S), Object.keys(p).sort(Xm).map((w) => +w);
  }
  getLabelForValue(t) {
    const n = this._adapter, i = this.options.time;
    return i.tooltipFormat ? n.format(t, i.tooltipFormat) : n.format(t, i.displayFormats.datetime);
  }
  format(t, n) {
    const r = this.options.time.displayFormats, o = this._unit, a = n || r[o];
    return this._adapter.format(t, a);
  }
  _tickFormatFunction(t, n, i, r) {
    const o = this.options, a = o.ticks.callback;
    if (a)
      return Tt(a, [
        t,
        n,
        i
      ], this);
    const c = o.time.displayFormats, u = this._unit, d = this._majorUnit, p = u && c[u], g = d && c[d], v = i[n], y = d && g && v && v.major;
    return this._adapter.format(t, r || (y ? g : p));
  }
  generateTickLabels(t) {
    let n, i, r;
    for (n = 0, i = t.length; n < i; ++n)
      r = t[n], r.label = this._tickFormatFunction(r.value, n, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const n = this._offsets, i = this.getDecimalForValue(t);
    return this.getPixelForDecimal((n.start + i) * n.factor);
  }
  getValueForPixel(t) {
    const n = this._offsets, i = this.getDecimalForPixel(t) / n.factor - n.end;
    return this.min + i * (this.max - this.min);
  }
  _getLabelSize(t) {
    const n = this.options.ticks, i = this.ctx.measureText(t).width, r = zn(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(r), a = Math.sin(r), c = this._resolveTickFontOptions(0).size;
    return {
      w: i * o + c * a,
      h: i * a + c * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, i = n.displayFormats, r = i[n.unit] || i.millisecond, o = this._tickFormatFunction(t, 0, tg(this, [
      t
    ], this._majorUnit), r), a = this._getLabelSize(o), c = Math.floor(this.isHorizontal() ? this.width / a.w : this.height / a.h) - 1;
    return c > 0 ? c : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], n, i;
    if (t.length)
      return t;
    const r = this.getMatchingVisibleMetas();
    if (this._normalized && r.length)
      return this._cache.data = r[0].controller.getAllParsedValues(this);
    for (n = 0, i = r.length; n < i; ++n)
      t = t.concat(r[n].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let n, i;
    if (t.length)
      return t;
    const r = this.getLabels();
    for (n = 0, i = r.length; n < i; ++n)
      t.push(Gm(this, r[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Av(t.sort(Xm));
  }
}
q(gl, "id", "time"), q(gl, "defaults", {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: !1,
    major: {
      enabled: !1
    }
  }
});
function _a(e, t, n) {
  let i = 0, r = e.length - 1, o, a, c, u;
  n ? (t >= e[i].pos && t <= e[r].pos && ({ lo: i, hi: r } = Oi(e, "pos", t)), { pos: o, time: c } = e[i], { pos: a, time: u } = e[r]) : (t >= e[i].time && t <= e[r].time && ({ lo: i, hi: r } = Oi(e, "time", t)), { time: o, pos: c } = e[i], { time: a, pos: u } = e[r]);
  const d = a - o;
  return d ? c + (u - c) * (t - o) / d : c;
}
class eg extends gl {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = _a(n, this.min), this._tableRange = _a(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: i } = this, r = [], o = [];
    let a, c, u, d, p;
    for (a = 0, c = t.length; a < c; ++a)
      d = t[a], d >= n && d <= i && r.push(d);
    if (r.length < 2)
      return [
        {
          time: n,
          pos: 0
        },
        {
          time: i,
          pos: 1
        }
      ];
    for (a = 0, c = r.length; a < c; ++a)
      p = r[a + 1], u = r[a - 1], d = r[a], Math.round((p + u) / 2) !== d && o.push({
        time: d,
        pos: a / (c - 1)
      });
    return o;
  }
  _generate() {
    const t = this.min, n = this.max;
    let i = super.getDataTimestamps();
    return (!i.includes(t) || !i.length) && i.splice(0, 0, t), (!i.includes(n) || i.length === 1) && i.push(n), i.sort((r, o) => r - o);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const n = this.getDataTimestamps(), i = this.getLabelTimestamps();
    return n.length && i.length ? t = this.normalize(n.concat(i)) : t = n.length ? n : i, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (_a(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, i = this.getDecimalForPixel(t) / n.factor - n.end;
    return _a(this._table, i * this._tableRange + this._minPos, !0);
  }
}
q(eg, "id", "timeseries"), q(eg, "defaults", gl.defaults);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vy = (...e) => e.filter((t, n, i) => !!t && t.trim() !== "" && i.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uP = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hP = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, i) => i ? i.toUpperCase() : n.toLowerCase()
);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ng = (e) => {
  const t = hP(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var su = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dP = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, fP = W.createContext({}), pP = () => W.useContext(fP), mP = W.forwardRef(
  ({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: i, className: r = "", children: o, iconNode: a, ...c }, u) => {
    const {
      size: d = 24,
      strokeWidth: p = 2,
      absoluteStrokeWidth: g = !1,
      color: v = "currentColor",
      className: y = ""
    } = pP() ?? {}, S = i ?? g ? Number(n ?? p) * 24 / Number(t ?? d) : n ?? p;
    return W.createElement(
      "svg",
      {
        ref: u,
        ...su,
        width: t ?? d ?? su.width,
        height: t ?? d ?? su.height,
        stroke: e ?? v,
        strokeWidth: S,
        className: vy("lucide", y, r),
        ...!o && !dP(c) && { "aria-hidden": "true" },
        ...c
      },
      [
        ...a.map(([w, M]) => W.createElement(w, M)),
        ...Array.isArray(o) ? o : [o]
      ]
    );
  }
);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const st = (e, t) => {
  const n = W.forwardRef(
    ({ className: i, ...r }, o) => W.createElement(mP, {
      ref: o,
      iconNode: t,
      className: vy(
        `lucide-${uP(ng(e))}`,
        `lucide-${e}`,
        i
      ),
      ...r
    })
  );
  return n.displayName = ng(e), n;
};
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gP = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
], yy = st("activity", gP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _P = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], vP = st("arrow-right", _P);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yP = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
], xy = st("briefcase", yP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xP = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
], wy = st("chart-column", xP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wP = [
  [
    "path",
    {
      d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
      key: "pzmjnu"
    }
  ],
  ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83", key: "k2fpak" }]
], bP = st("chart-pie", wP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kP = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], ig = st("chevron-down", kP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const SP = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], PP = st("chevron-right", SP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MP = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], sg = st("circle-alert", MP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CP = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], LP = st("database", CP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TP = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], ru = st("download", TP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NP = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], yo = st("external-link", NP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EP = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
], rg = st("file-spreadsheet", EP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zP = [
  [
    "path",
    {
      d: "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",
      key: "15baut"
    }
  ],
  ["path", { d: "M18 12v.5", key: "18hhni" }],
  ["path", { d: "M16 17.93a9.77 9.77 0 0 1 0-11.86", key: "16dt7o" }],
  [
    "path",
    {
      d: "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",
      key: "l9di03"
    }
  ],
  [
    "path",
    { d: "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4", key: "1kjonw" }
  ],
  [
    "path",
    { d: "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98", key: "1zlm23" }
  ]
], jP = st("fish", zP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const OP = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
], AP = st("flame", OP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IP = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
], og = st("funnel", IP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RP = [
  ["path", { d: "M10 16h.01", key: "1bzywj" }],
  [
    "path",
    {
      d: "M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "18tbho"
    }
  ],
  ["path", { d: "M21.946 12.013H2.054", key: "zqlbp7" }],
  ["path", { d: "M6 16h.01", key: "1pmjb7" }]
], DP = st("hard-drive", RP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FP = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
], by = st("inbox", FP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const BP = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], HP = st("info", BP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WP = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], VP = st("layout-dashboard", WP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ZP = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
], uh = st("lightbulb", ZP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const UP = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], $P = st("loader-circle", UP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const YP = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], qP = st("lock", YP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KP = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
], XP = st("log-out", KP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GP = [
  [
    "path",
    {
      d: "M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0",
      key: "11u0oz"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }],
  [
    "path",
    {
      d: "M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712",
      key: "q8zwxj"
    }
  ]
], ky = st("map-pinned", GP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QP = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
], Sy = st("map-pin", QP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const JP = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], tM = st("menu", JP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eM = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ]
], nM = st("message-square", eM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iM = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
], hh = st("network", iM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sM = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  [
    "path",
    {
      d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
      key: "1fd625"
    }
  ]
], rM = st("octagon-alert", sM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oM = [
  ["path", { d: "M16.247 7.761a6 6 0 0 1 0 8.478", key: "1fwjs5" }],
  ["path", { d: "M19.075 4.933a10 10 0 0 1 0 14.134", key: "ehdyv1" }],
  ["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134", key: "1q22gi" }],
  ["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478", key: "r2q7qm" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
], Py = st("radio", oM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aM = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], _l = st("refresh-cw", aM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lM = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], cM = st("rotate-ccw", lM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uM = [
  [
    "path",
    {
      d: "m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5",
      key: "dzhfyz"
    }
  ],
  ["path", { d: "M16.5 7.5 19 5", key: "1ltcjm" }],
  [
    "path",
    {
      d: "m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5",
      key: "nfoymv"
    }
  ],
  ["path", { d: "M9 21a6 6 0 0 0-6-6", key: "1iajcf" }],
  [
    "path",
    {
      d: "M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z",
      key: "nv9zqy"
    }
  ]
], My = st("satellite", uM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hM = [
  ["path", { d: "m13.5 8.5-5 5", key: "1cs55j" }],
  ["path", { d: "m8.5 8.5 5 5", key: "a8mexj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], dM = st("search-x", hM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fM = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], pM = st("search", fM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mM = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], Cy = st("shield-check", mM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gM = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], _M = st("shield", gM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vM = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
], yM = st("sparkles", vM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xM = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }]
], Ly = st("table", xM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wM = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
], bM = st("trending-down", wM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kM = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
], SM = st("trending-up", kM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const PM = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], MM = st("triangle-alert", PM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CM = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], LM = st("upload", CM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TM = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
], NM = st("user", TM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const EM = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
], zM = st("users", EM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jM = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], OM = st("x", jM);
function Ty(e) {
  if (!e) return "-";
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : t.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function AM(e) {
  if (!e) return "-";
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : t.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
function Hl(e) {
  const t = Number(e || 0);
  return t > 80 ? "high" : t >= 50 ? "medium" : "low";
}
const IM = [
  {
    title: "Monitoring",
    items: [
      { id: "overview", label: "Overview", icon: VP },
      { id: "map", label: "Threat Map", icon: ky },
      { id: "alerts", label: "Live Alerts", icon: Py }
    ]
  },
  {
    title: "Analysis",
    items: [
      { id: "networks", label: "Network", icon: hh },
      { id: "analytics", label: "Analytics", icon: wy },
      { id: "incidents", label: "Incidents", icon: Ly }
    ]
  },
  {
    title: "Intelligence",
    items: [
      { id: "osint", label: "OSINT Feed", icon: My },
      { id: "reco", label: "Recommendations", icon: uh }
    ]
  }
];
function RM({ activeSection: e, onSelect: t, isOpen: n, syncStatus: i, lastSync: r }) {
  function o(c) {
    t == null || t(c);
    const u = document.getElementById(`section-${c}`);
    u && u.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  const a = !!(i != null && i.running);
  return /* @__PURE__ */ m.jsxs("aside", { className: `sidebar ${n ? "is-open" : ""}`, "aria-label": "Primary navigation", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "sidebar-head", children: [
      /* @__PURE__ */ m.jsx("div", { className: "brand-mark", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx(_M, { size: 20, strokeWidth: 2 }) }),
      /* @__PURE__ */ m.jsxs("div", { className: "brand-copy", children: [
        /* @__PURE__ */ m.jsx("div", { className: "brand-title", children: "Wildlife Intelligence" }),
        /* @__PURE__ */ m.jsx("div", { className: "brand-sub", children: "Command Center" })
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("nav", { className: "sidebar-body", children: IM.map((c) => /* @__PURE__ */ m.jsxs("div", { className: "nav-group", children: [
      /* @__PURE__ */ m.jsx("div", { className: "nav-group-title", children: c.title }),
      c.items.map(({ id: u, label: d, icon: p }) => {
        const g = e === u;
        return /* @__PURE__ */ m.jsxs(
          "button",
          {
            type: "button",
            className: `nav-item ${g ? "is-active" : ""}`,
            onClick: () => o(u),
            "aria-current": g ? "page" : void 0,
            children: [
              /* @__PURE__ */ m.jsx(p, { size: 16, className: "nav-icon", strokeWidth: 2 }),
              /* @__PURE__ */ m.jsx("span", { children: d }),
              /* @__PURE__ */ m.jsx("span", { className: "nav-dot", "aria-hidden": "true" })
            ]
          },
          u
        );
      })
    ] }, c.title)) }),
    /* @__PURE__ */ m.jsx("div", { className: "sidebar-foot", children: /* @__PURE__ */ m.jsxs("div", { className: "sync-card", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "sync-row", children: [
        /* @__PURE__ */ m.jsx("span", { children: "Data sync" }),
        /* @__PURE__ */ m.jsxs("span", { className: `pulse ${a ? "" : "is-idle"}`, children: [
          /* @__PURE__ */ m.jsx("span", { className: "pulse-dot" }),
          a ? "Live" : "Idle"
        ] })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "sync-row", children: [
        /* @__PURE__ */ m.jsx("span", { children: "Last update" }),
        /* @__PURE__ */ m.jsx("strong", { className: "mono", children: AM(r) })
      ] })
    ] }) })
  ] });
}
function DM({
  activeSection: e,
  busy: t,
  syncStatus: n,
  onRefresh: i,
  onExport: r,
  onToggleMenu: o,
  onLogout: a,
  onReanalyze: c
}) {
  const u = {
    overview: "Overview",
    map: "Threat Map",
    alerts: "Live Alerts",
    analytics: "Analytics",
    incidents: "Incidents",
    osint: "OSINT Feed",
    reco: "Recommendations"
  }, d = !!(n != null && n.running), p = d ? "Search in progress" : "Auto search active", g = (n == null ? void 0 : n.progress) || {}, v = String((n == null ? void 0 : n.message) || "").trim(), y = typeof g.stage == "string" && g.stage !== "-" ? g.stage : "", S = typeof g.provider == "string" && g.provider !== "-" ? g.provider : "", w = typeof g.language == "string" && g.language !== "-" ? g.language : "", M = typeof g.query == "string" && g.query !== "-" ? g.query : "", b = [S, w].filter(Boolean).join(" / "), k = [];
  y && k.push(`stage: ${y}`), b && k.push(b), M && k.push(`q: ${M}`);
  const P = d ? k.join(" • ") || v || "Collecting live reports" : "", [T, N] = W.useState(null), j = W.useRef(null), O = W.useRef(null);
  W.useEffect(() => {
    function $(X) {
      j.current && !j.current.contains(X.target) && O.current && !O.current.contains(X.target) && N(null);
    }
    function rt(X) {
      X.key === "Escape" && N(null);
    }
    return T && (document.addEventListener("mousedown", $), document.addEventListener("keydown", rt)), () => {
      document.removeEventListener("mousedown", $), document.removeEventListener("keydown", rt);
    };
  }, [T]);
  const A = () => typeof import.meta < "u" ? "".trim().replace(/\/$/, "") : "", H = ($) => {
    r($), N(null);
  }, F = () => {
    window.location.href = `${A()}/api/public/download-csv`, N(null);
  }, V = () => {
    window.location.href = `${A()}/api/public/download-db`, N(null);
  }, K = () => {
    N(null);
    const $ = document.createElement("input");
    $.type = "file", $.accept = ".db,.sqlite,.sqlite3", $.onchange = async (rt) => {
      var I;
      const X = (I = rt.target.files) == null ? void 0 : I[0];
      if (!X || !confirm(`Restore database from "${X.name}"? This will replace all current data.`)) return;
      const ht = new FormData();
      ht.append("file", X);
      try {
        const D = await (await fetch(`${A()}/api/public/upload-db`, { method: "POST", body: ht })).json();
        D.ok ? (alert(`Database restored!

Total rows: ${D.total_rows}
Poaching articles: ${D.poaching_rows}
Predictor retrained: ${D.predictor_retrained ? "Yes" : "No"}`), window.location.reload()) : alert(`Restore failed: ${D.detail || "Unknown error"}`);
      } catch (U) {
        alert(`Upload failed: ${U.message}`);
      }
    }, $.click();
  }, yt = () => {
    N(null), c();
  };
  return /* @__PURE__ */ m.jsxs("header", { className: "topbar", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "topbar-left", children: [
      /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: "mobile-menu",
          onClick: o,
          "aria-label": "Open navigation menu",
          children: /* @__PURE__ */ m.jsx(tM, { size: 18 })
        }
      ),
      /* @__PURE__ */ m.jsxs("div", { className: "breadcrumb", children: [
        /* @__PURE__ */ m.jsx("span", { children: "Wildlife Intelligence" }),
        /* @__PURE__ */ m.jsx("span", { className: "sep", children: "/" }),
        /* @__PURE__ */ m.jsx("strong", { children: u[e] || "Overview" })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "india-exclusive-badge hidden md:flex", children: [
        /* @__PURE__ */ m.jsx("span", { className: "dot animate-pulse" }),
        /* @__PURE__ */ m.jsx("span", { children: "India Exclusive Intelligence" })
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "topbar-center", children: /* @__PURE__ */ m.jsxs("div", { className: `sync-pill ${d ? "is-running" : "is-idle"}`, role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ m.jsx("span", { className: "sync-pill-dot", "aria-hidden": "true" }),
      /* @__PURE__ */ m.jsx("span", { className: "sync-pill-label", children: p }),
      P ? /* @__PURE__ */ m.jsx("span", { className: "sync-pill-meta", children: P }) : null
    ] }) }),
    /* @__PURE__ */ m.jsxs("div", { className: "topbar-right", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "dropdown", ref: j, children: [
        /* @__PURE__ */ m.jsxs(
          "button",
          {
            type: "button",
            className: "btn",
            onClick: () => N(T === "export" ? null : "export"),
            "aria-haspopup": "menu",
            "aria-expanded": T === "export",
            children: [
              /* @__PURE__ */ m.jsx(ru, { size: 15 }),
              /* @__PURE__ */ m.jsx("span", { className: "btn-label", children: "Export" }),
              /* @__PURE__ */ m.jsx(ig, { size: 13, className: `dropdown-caret ${T === "export" ? "is-open" : ""}` })
            ]
          }
        ),
        T === "export" && /* @__PURE__ */ m.jsxs("div", { className: "dropdown-menu", role: "menu", children: [
          /* @__PURE__ */ m.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: () => H("csv"), children: [
            /* @__PURE__ */ m.jsx(ru, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Export as CSV" })
          ] }),
          /* @__PURE__ */ m.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: () => H("excel"), children: [
            /* @__PURE__ */ m.jsx(rg, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Export as Excel" })
          ] }),
          /* @__PURE__ */ m.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: () => H("excel_incidents_reports"), children: [
            /* @__PURE__ */ m.jsx(rg, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Excel (2-Sheet)" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "dropdown", ref: O, children: [
        /* @__PURE__ */ m.jsxs(
          "button",
          {
            type: "button",
            className: "btn",
            onClick: () => N(T === "database" ? null : "database"),
            "aria-haspopup": "menu",
            "aria-expanded": T === "database",
            children: [
              /* @__PURE__ */ m.jsx(LP, { size: 15 }),
              /* @__PURE__ */ m.jsx("span", { className: "btn-label", children: "Database" }),
              /* @__PURE__ */ m.jsx(ig, { size: 13, className: `dropdown-caret ${T === "database" ? "is-open" : ""}` })
            ]
          }
        ),
        T === "database" && /* @__PURE__ */ m.jsxs("div", { className: "dropdown-menu", role: "menu", children: [
          /* @__PURE__ */ m.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: F, children: [
            /* @__PURE__ */ m.jsx(ru, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Download All Data (CSV)" })
          ] }),
          /* @__PURE__ */ m.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: V, children: [
            /* @__PURE__ */ m.jsx(DP, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Download Database" })
          ] }),
          /* @__PURE__ */ m.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: K, children: [
            /* @__PURE__ */ m.jsx(LM, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Upload Database" })
          ] }),
          /* @__PURE__ */ m.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: yt, children: [
            /* @__PURE__ */ m.jsx(_l, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Re-analyze Database" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ m.jsx("div", { className: "topbar-divider" }),
      /* @__PURE__ */ m.jsxs(
        "button",
        {
          type: "button",
          className: "btn btn-ghost",
          onClick: i,
          disabled: t,
          "aria-label": "Refresh data",
          children: [
            /* @__PURE__ */ m.jsx(_l, { size: 15, className: t ? "spin" : "" }),
            /* @__PURE__ */ m.jsx("span", { className: "btn-label", children: "Refresh" })
          ]
        }
      ),
      /* @__PURE__ */ m.jsxs("button", { type: "button", className: "btn btn-ghost", onClick: a, "aria-label": "Logout", children: [
        /* @__PURE__ */ m.jsx(XP, { size: 15 }),
        /* @__PURE__ */ m.jsx("span", { className: "btn-label", children: "Logout" })
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("style", { children: `
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      ` })
  ] });
}
function FM(e) {
  const t = Number(e || 0);
  return Number.isFinite(t) ? t >= 1e3 ? t.toLocaleString("en-US") : t.toString() : "0";
}
function BM({ value: e }) {
  if (e == null) return null;
  const t = e >= 0, n = t ? SM : bM;
  return /* @__PURE__ */ m.jsxs("span", { className: `kpi-trend ${t ? "is-up" : "is-down"}`, children: [
    /* @__PURE__ */ m.jsx(n, { size: 12 }),
    Math.abs(e).toFixed(1),
    "%"
  ] });
}
function HM({ summary: e, loading: t }) {
  const n = (e == null ? void 0 : e.kpis) || e || {}, i = [
    {
      id: "total",
      label: "Total Incidents",
      value: n.total_incidents ?? 0,
      trend: n.trend_incidents,
      icon: rM,
      tone: "primary",
      hint: "All tracked events"
    },
    {
      id: "high",
      label: "High Risk",
      value: n.high_risk_count ?? n.high_risk ?? 0,
      trend: n.trend_high_risk,
      icon: AP,
      tone: "danger",
      hint: "Risk score above 80"
    },
    {
      id: "states",
      label: "States Affected",
      value: n.states_affected ?? n.states_active ?? 0,
      trend: n.trend_states,
      icon: Sy,
      tone: "default",
      hint: "With recent activity"
    },
    {
      id: "species",
      label: "Species Impacted",
      value: n.species_impacted ?? n.species_tracked ?? 0,
      trend: n.trend_species,
      icon: jP,
      tone: "warn",
      hint: "Unique species tracked"
    }
  ];
  return t && !e ? /* @__PURE__ */ m.jsx("div", { className: "kpi-grid", "aria-busy": "true", children: Array.from({ length: 4 }).map((r, o) => /* @__PURE__ */ m.jsx("div", { className: "skel skel-kpi" }, o)) }) : /* @__PURE__ */ m.jsx("div", { className: "kpi-grid", children: i.map(({ id: r, label: o, value: a, trend: c, icon: u, tone: d, hint: p }) => /* @__PURE__ */ m.jsxs(
    "article",
    {
      className: `kpi-card ${d === "danger" ? "is-danger" : d === "primary" ? "is-primary" : d === "warn" ? "is-warn" : ""}`,
      children: [
        /* @__PURE__ */ m.jsxs("div", { className: "kpi-head", children: [
          /* @__PURE__ */ m.jsx("div", { className: "kpi-label", children: o }),
          /* @__PURE__ */ m.jsx("div", { className: "kpi-icon", children: /* @__PURE__ */ m.jsx(u, { size: 16, strokeWidth: 2 }) })
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "kpi-body", children: [
          /* @__PURE__ */ m.jsx("div", { className: "kpi-value", children: FM(a) }),
          /* @__PURE__ */ m.jsx(BM, { value: c })
        ] }),
        /* @__PURE__ */ m.jsx("div", { className: "kpi-meta", children: p })
      ]
    },
    r
  )) });
}
var dh = { exports: {} };
/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
(function(e, t) {
  (function(n, i) {
    i(t);
  })(ix, function(n) {
    var i = "1.9.4";
    function r(s) {
      var l, h, f, _;
      for (h = 1, f = arguments.length; h < f; h++) {
        _ = arguments[h];
        for (l in _)
          s[l] = _[l];
      }
      return s;
    }
    var o = Object.create || /* @__PURE__ */ function() {
      function s() {
      }
      return function(l) {
        return s.prototype = l, new s();
      };
    }();
    function a(s, l) {
      var h = Array.prototype.slice;
      if (s.bind)
        return s.bind.apply(s, h.call(arguments, 1));
      var f = h.call(arguments, 2);
      return function() {
        return s.apply(l, f.length ? f.concat(h.call(arguments)) : arguments);
      };
    }
    var c = 0;
    function u(s) {
      return "_leaflet_id" in s || (s._leaflet_id = ++c), s._leaflet_id;
    }
    function d(s, l, h) {
      var f, _, x, C;
      return C = function() {
        f = !1, _ && (x.apply(h, _), _ = !1);
      }, x = function() {
        f ? _ = arguments : (s.apply(h, arguments), setTimeout(C, l), f = !0);
      }, x;
    }
    function p(s, l, h) {
      var f = l[1], _ = l[0], x = f - _;
      return s === f && h ? s : ((s - _) % x + x) % x + _;
    }
    function g() {
      return !1;
    }
    function v(s, l) {
      if (l === !1)
        return s;
      var h = Math.pow(10, l === void 0 ? 6 : l);
      return Math.round(s * h) / h;
    }
    function y(s) {
      return s.trim ? s.trim() : s.replace(/^\s+|\s+$/g, "");
    }
    function S(s) {
      return y(s).split(/\s+/);
    }
    function w(s, l) {
      Object.prototype.hasOwnProperty.call(s, "options") || (s.options = s.options ? o(s.options) : {});
      for (var h in l)
        s.options[h] = l[h];
      return s.options;
    }
    function M(s, l, h) {
      var f = [];
      for (var _ in s)
        f.push(encodeURIComponent(h ? _.toUpperCase() : _) + "=" + encodeURIComponent(s[_]));
      return (!l || l.indexOf("?") === -1 ? "?" : "&") + f.join("&");
    }
    var b = /\{ *([\w_ -]+) *\}/g;
    function k(s, l) {
      return s.replace(b, function(h, f) {
        var _ = l[f];
        if (_ === void 0)
          throw new Error("No value provided for variable " + h);
        return typeof _ == "function" && (_ = _(l)), _;
      });
    }
    var P = Array.isArray || function(s) {
      return Object.prototype.toString.call(s) === "[object Array]";
    };
    function T(s, l) {
      for (var h = 0; h < s.length; h++)
        if (s[h] === l)
          return h;
      return -1;
    }
    var N = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    function j(s) {
      return window["webkit" + s] || window["moz" + s] || window["ms" + s];
    }
    var O = 0;
    function A(s) {
      var l = +/* @__PURE__ */ new Date(), h = Math.max(0, 16 - (l - O));
      return O = l + h, window.setTimeout(s, h);
    }
    var H = window.requestAnimationFrame || j("RequestAnimationFrame") || A, F = window.cancelAnimationFrame || j("CancelAnimationFrame") || j("CancelRequestAnimationFrame") || function(s) {
      window.clearTimeout(s);
    };
    function V(s, l, h) {
      if (h && H === A)
        s.call(l);
      else
        return H.call(window, a(s, l));
    }
    function K(s) {
      s && F.call(window, s);
    }
    var yt = {
      __proto__: null,
      extend: r,
      create: o,
      bind: a,
      get lastId() {
        return c;
      },
      stamp: u,
      throttle: d,
      wrapNum: p,
      falseFn: g,
      formatNum: v,
      trim: y,
      splitWords: S,
      setOptions: w,
      getParamString: M,
      template: k,
      isArray: P,
      indexOf: T,
      emptyImageUrl: N,
      requestFn: H,
      cancelFn: F,
      requestAnimFrame: V,
      cancelAnimFrame: K
    };
    function $() {
    }
    $.extend = function(s) {
      var l = function() {
        w(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
      }, h = l.__super__ = this.prototype, f = o(h);
      f.constructor = l, l.prototype = f;
      for (var _ in this)
        Object.prototype.hasOwnProperty.call(this, _) && _ !== "prototype" && _ !== "__super__" && (l[_] = this[_]);
      return s.statics && r(l, s.statics), s.includes && (rt(s.includes), r.apply(null, [f].concat(s.includes))), r(f, s), delete f.statics, delete f.includes, f.options && (f.options = h.options ? o(h.options) : {}, r(f.options, s.options)), f._initHooks = [], f.callInitHooks = function() {
        if (!this._initHooksCalled) {
          h.callInitHooks && h.callInitHooks.call(this), this._initHooksCalled = !0;
          for (var x = 0, C = f._initHooks.length; x < C; x++)
            f._initHooks[x].call(this);
        }
      }, l;
    }, $.include = function(s) {
      var l = this.prototype.options;
      return r(this.prototype, s), s.options && (this.prototype.options = l, this.mergeOptions(s.options)), this;
    }, $.mergeOptions = function(s) {
      return r(this.prototype.options, s), this;
    }, $.addInitHook = function(s) {
      var l = Array.prototype.slice.call(arguments, 1), h = typeof s == "function" ? s : function() {
        this[s].apply(this, l);
      };
      return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(h), this;
    };
    function rt(s) {
      if (!(typeof L > "u" || !L || !L.Mixin)) {
        s = P(s) ? s : [s];
        for (var l = 0; l < s.length; l++)
          s[l] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
      }
    }
    var X = {
      /* @method on(type: String, fn: Function, context?: Object): this
       * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
       *
       * @alternative
       * @method on(eventMap: Object): this
       * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
       */
      on: function(s, l, h) {
        if (typeof s == "object")
          for (var f in s)
            this._on(f, s[f], l);
        else {
          s = S(s);
          for (var _ = 0, x = s.length; _ < x; _++)
            this._on(s[_], l, h);
        }
        return this;
      },
      /* @method off(type: String, fn?: Function, context?: Object): this
       * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
       *
       * @alternative
       * @method off(eventMap: Object): this
       * Removes a set of type/listener pairs.
       *
       * @alternative
       * @method off: this
       * Removes all listeners to all events on the object. This includes implicitly attached events.
       */
      off: function(s, l, h) {
        if (!arguments.length)
          delete this._events;
        else if (typeof s == "object")
          for (var f in s)
            this._off(f, s[f], l);
        else {
          s = S(s);
          for (var _ = arguments.length === 1, x = 0, C = s.length; x < C; x++)
            _ ? this._off(s[x]) : this._off(s[x], l, h);
        }
        return this;
      },
      // attach listener (without syntactic sugar now)
      _on: function(s, l, h, f) {
        if (typeof l != "function") {
          console.warn("wrong listener type: " + typeof l);
          return;
        }
        if (this._listens(s, l, h) === !1) {
          h === this && (h = void 0);
          var _ = { fn: l, ctx: h };
          f && (_.once = !0), this._events = this._events || {}, this._events[s] = this._events[s] || [], this._events[s].push(_);
        }
      },
      _off: function(s, l, h) {
        var f, _, x;
        if (this._events && (f = this._events[s], !!f)) {
          if (arguments.length === 1) {
            if (this._firingCount)
              for (_ = 0, x = f.length; _ < x; _++)
                f[_].fn = g;
            delete this._events[s];
            return;
          }
          if (typeof l != "function") {
            console.warn("wrong listener type: " + typeof l);
            return;
          }
          var C = this._listens(s, l, h);
          if (C !== !1) {
            var E = f[C];
            this._firingCount && (E.fn = g, this._events[s] = f = f.slice()), f.splice(C, 1);
          }
        }
      },
      // @method fire(type: String, data?: Object, propagate?: Boolean): this
      // Fires an event of the specified type. You can optionally provide a data
      // object — the first argument of the listener function will contain its
      // properties. The event can optionally be propagated to event parents.
      fire: function(s, l, h) {
        if (!this.listens(s, h))
          return this;
        var f = r({}, l, {
          type: s,
          target: this,
          sourceTarget: l && l.sourceTarget || this
        });
        if (this._events) {
          var _ = this._events[s];
          if (_) {
            this._firingCount = this._firingCount + 1 || 1;
            for (var x = 0, C = _.length; x < C; x++) {
              var E = _[x], z = E.fn;
              E.once && this.off(s, z, E.ctx), z.call(E.ctx || this, f);
            }
            this._firingCount--;
          }
        }
        return h && this._propagateEvent(f), this;
      },
      // @method listens(type: String, propagate?: Boolean): Boolean
      // @method listens(type: String, fn: Function, context?: Object, propagate?: Boolean): Boolean
      // Returns `true` if a particular event type has any listeners attached to it.
      // The verification can optionally be propagated, it will return `true` if parents have the listener attached to it.
      listens: function(s, l, h, f) {
        typeof s != "string" && console.warn('"string" type argument expected');
        var _ = l;
        typeof l != "function" && (f = !!l, _ = void 0, h = void 0);
        var x = this._events && this._events[s];
        if (x && x.length && this._listens(s, _, h) !== !1)
          return !0;
        if (f) {
          for (var C in this._eventParents)
            if (this._eventParents[C].listens(s, l, h, f))
              return !0;
        }
        return !1;
      },
      // returns the index (number) or false
      _listens: function(s, l, h) {
        if (!this._events)
          return !1;
        var f = this._events[s] || [];
        if (!l)
          return !!f.length;
        h === this && (h = void 0);
        for (var _ = 0, x = f.length; _ < x; _++)
          if (f[_].fn === l && f[_].ctx === h)
            return _;
        return !1;
      },
      // @method once(…): this
      // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
      once: function(s, l, h) {
        if (typeof s == "object")
          for (var f in s)
            this._on(f, s[f], l, !0);
        else {
          s = S(s);
          for (var _ = 0, x = s.length; _ < x; _++)
            this._on(s[_], l, h, !0);
        }
        return this;
      },
      // @method addEventParent(obj: Evented): this
      // Adds an event parent - an `Evented` that will receive propagated events
      addEventParent: function(s) {
        return this._eventParents = this._eventParents || {}, this._eventParents[u(s)] = s, this;
      },
      // @method removeEventParent(obj: Evented): this
      // Removes an event parent, so it will stop receiving propagated events
      removeEventParent: function(s) {
        return this._eventParents && delete this._eventParents[u(s)], this;
      },
      _propagateEvent: function(s) {
        for (var l in this._eventParents)
          this._eventParents[l].fire(s.type, r({
            layer: s.target,
            propagatedFrom: s.target
          }, s), !0);
      }
    };
    X.addEventListener = X.on, X.removeEventListener = X.clearAllEventListeners = X.off, X.addOneTimeEventListener = X.once, X.fireEvent = X.fire, X.hasEventListeners = X.listens;
    var ht = $.extend(X);
    function I(s, l, h) {
      this.x = h ? Math.round(s) : s, this.y = h ? Math.round(l) : l;
    }
    var U = Math.trunc || function(s) {
      return s > 0 ? Math.floor(s) : Math.ceil(s);
    };
    I.prototype = {
      // @method clone(): Point
      // Returns a copy of the current point.
      clone: function() {
        return new I(this.x, this.y);
      },
      // @method add(otherPoint: Point): Point
      // Returns the result of addition of the current and the given points.
      add: function(s) {
        return this.clone()._add(D(s));
      },
      _add: function(s) {
        return this.x += s.x, this.y += s.y, this;
      },
      // @method subtract(otherPoint: Point): Point
      // Returns the result of subtraction of the given point from the current.
      subtract: function(s) {
        return this.clone()._subtract(D(s));
      },
      _subtract: function(s) {
        return this.x -= s.x, this.y -= s.y, this;
      },
      // @method divideBy(num: Number): Point
      // Returns the result of division of the current point by the given number.
      divideBy: function(s) {
        return this.clone()._divideBy(s);
      },
      _divideBy: function(s) {
        return this.x /= s, this.y /= s, this;
      },
      // @method multiplyBy(num: Number): Point
      // Returns the result of multiplication of the current point by the given number.
      multiplyBy: function(s) {
        return this.clone()._multiplyBy(s);
      },
      _multiplyBy: function(s) {
        return this.x *= s, this.y *= s, this;
      },
      // @method scaleBy(scale: Point): Point
      // Multiply each coordinate of the current point by each coordinate of
      // `scale`. In linear algebra terms, multiply the point by the
      // [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
      // defined by `scale`.
      scaleBy: function(s) {
        return new I(this.x * s.x, this.y * s.y);
      },
      // @method unscaleBy(scale: Point): Point
      // Inverse of `scaleBy`. Divide each coordinate of the current point by
      // each coordinate of `scale`.
      unscaleBy: function(s) {
        return new I(this.x / s.x, this.y / s.y);
      },
      // @method round(): Point
      // Returns a copy of the current point with rounded coordinates.
      round: function() {
        return this.clone()._round();
      },
      _round: function() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
      },
      // @method floor(): Point
      // Returns a copy of the current point with floored coordinates (rounded down).
      floor: function() {
        return this.clone()._floor();
      },
      _floor: function() {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
      },
      // @method ceil(): Point
      // Returns a copy of the current point with ceiled coordinates (rounded up).
      ceil: function() {
        return this.clone()._ceil();
      },
      _ceil: function() {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
      },
      // @method trunc(): Point
      // Returns a copy of the current point with truncated coordinates (rounded towards zero).
      trunc: function() {
        return this.clone()._trunc();
      },
      _trunc: function() {
        return this.x = U(this.x), this.y = U(this.y), this;
      },
      // @method distanceTo(otherPoint: Point): Number
      // Returns the cartesian distance between the current and the given points.
      distanceTo: function(s) {
        s = D(s);
        var l = s.x - this.x, h = s.y - this.y;
        return Math.sqrt(l * l + h * h);
      },
      // @method equals(otherPoint: Point): Boolean
      // Returns `true` if the given point has the same coordinates.
      equals: function(s) {
        return s = D(s), s.x === this.x && s.y === this.y;
      },
      // @method contains(otherPoint: Point): Boolean
      // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
      contains: function(s) {
        return s = D(s), Math.abs(s.x) <= Math.abs(this.x) && Math.abs(s.y) <= Math.abs(this.y);
      },
      // @method toString(): String
      // Returns a string representation of the point for debugging purposes.
      toString: function() {
        return "Point(" + v(this.x) + ", " + v(this.y) + ")";
      }
    };
    function D(s, l, h) {
      return s instanceof I ? s : P(s) ? new I(s[0], s[1]) : s == null ? s : typeof s == "object" && "x" in s && "y" in s ? new I(s.x, s.y) : new I(s, l, h);
    }
    function tt(s, l) {
      if (s)
        for (var h = l ? [s, l] : s, f = 0, _ = h.length; f < _; f++)
          this.extend(h[f]);
    }
    tt.prototype = {
      // @method extend(point: Point): this
      // Extends the bounds to contain the given point.
      // @alternative
      // @method extend(otherBounds: Bounds): this
      // Extend the bounds to contain the given bounds
      extend: function(s) {
        var l, h;
        if (!s)
          return this;
        if (s instanceof I || typeof s[0] == "number" || "x" in s)
          l = h = D(s);
        else if (s = ot(s), l = s.min, h = s.max, !l || !h)
          return this;
        return !this.min && !this.max ? (this.min = l.clone(), this.max = h.clone()) : (this.min.x = Math.min(l.x, this.min.x), this.max.x = Math.max(h.x, this.max.x), this.min.y = Math.min(l.y, this.min.y), this.max.y = Math.max(h.y, this.max.y)), this;
      },
      // @method getCenter(round?: Boolean): Point
      // Returns the center point of the bounds.
      getCenter: function(s) {
        return D(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          s
        );
      },
      // @method getBottomLeft(): Point
      // Returns the bottom-left point of the bounds.
      getBottomLeft: function() {
        return D(this.min.x, this.max.y);
      },
      // @method getTopRight(): Point
      // Returns the top-right point of the bounds.
      getTopRight: function() {
        return D(this.max.x, this.min.y);
      },
      // @method getTopLeft(): Point
      // Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
      getTopLeft: function() {
        return this.min;
      },
      // @method getBottomRight(): Point
      // Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
      getBottomRight: function() {
        return this.max;
      },
      // @method getSize(): Point
      // Returns the size of the given bounds
      getSize: function() {
        return this.max.subtract(this.min);
      },
      // @method contains(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle contains the given one.
      // @alternative
      // @method contains(point: Point): Boolean
      // Returns `true` if the rectangle contains the given point.
      contains: function(s) {
        var l, h;
        return typeof s[0] == "number" || s instanceof I ? s = D(s) : s = ot(s), s instanceof tt ? (l = s.min, h = s.max) : l = h = s, l.x >= this.min.x && h.x <= this.max.x && l.y >= this.min.y && h.y <= this.max.y;
      },
      // @method intersects(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds
      // intersect if they have at least one point in common.
      intersects: function(s) {
        s = ot(s);
        var l = this.min, h = this.max, f = s.min, _ = s.max, x = _.x >= l.x && f.x <= h.x, C = _.y >= l.y && f.y <= h.y;
        return x && C;
      },
      // @method overlaps(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds
      // overlap if their intersection is an area.
      overlaps: function(s) {
        s = ot(s);
        var l = this.min, h = this.max, f = s.min, _ = s.max, x = _.x > l.x && f.x < h.x, C = _.y > l.y && f.y < h.y;
        return x && C;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this.min && this.max);
      },
      // @method pad(bufferRatio: Number): Bounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(s) {
        var l = this.min, h = this.max, f = Math.abs(l.x - h.x) * s, _ = Math.abs(l.y - h.y) * s;
        return ot(
          D(l.x - f, l.y - _),
          D(h.x + f, h.y + _)
        );
      },
      // @method equals(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle is equivalent to the given bounds.
      equals: function(s) {
        return s ? (s = ot(s), this.min.equals(s.getTopLeft()) && this.max.equals(s.getBottomRight())) : !1;
      }
    };
    function ot(s, l) {
      return !s || s instanceof tt ? s : new tt(s, l);
    }
    function St(s, l) {
      if (s)
        for (var h = l ? [s, l] : s, f = 0, _ = h.length; f < _; f++)
          this.extend(h[f]);
    }
    St.prototype = {
      // @method extend(latlng: LatLng): this
      // Extend the bounds to contain the given point
      // @alternative
      // @method extend(otherBounds: LatLngBounds): this
      // Extend the bounds to contain the given bounds
      extend: function(s) {
        var l = this._southWest, h = this._northEast, f, _;
        if (s instanceof at)
          f = s, _ = s;
        else if (s instanceof St) {
          if (f = s._southWest, _ = s._northEast, !f || !_)
            return this;
        } else
          return s ? this.extend(G(s) || dt(s)) : this;
        return !l && !h ? (this._southWest = new at(f.lat, f.lng), this._northEast = new at(_.lat, _.lng)) : (l.lat = Math.min(f.lat, l.lat), l.lng = Math.min(f.lng, l.lng), h.lat = Math.max(_.lat, h.lat), h.lng = Math.max(_.lng, h.lng)), this;
      },
      // @method pad(bufferRatio: Number): LatLngBounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(s) {
        var l = this._southWest, h = this._northEast, f = Math.abs(l.lat - h.lat) * s, _ = Math.abs(l.lng - h.lng) * s;
        return new St(
          new at(l.lat - f, l.lng - _),
          new at(h.lat + f, h.lng + _)
        );
      },
      // @method getCenter(): LatLng
      // Returns the center point of the bounds.
      getCenter: function() {
        return new at(
          (this._southWest.lat + this._northEast.lat) / 2,
          (this._southWest.lng + this._northEast.lng) / 2
        );
      },
      // @method getSouthWest(): LatLng
      // Returns the south-west point of the bounds.
      getSouthWest: function() {
        return this._southWest;
      },
      // @method getNorthEast(): LatLng
      // Returns the north-east point of the bounds.
      getNorthEast: function() {
        return this._northEast;
      },
      // @method getNorthWest(): LatLng
      // Returns the north-west point of the bounds.
      getNorthWest: function() {
        return new at(this.getNorth(), this.getWest());
      },
      // @method getSouthEast(): LatLng
      // Returns the south-east point of the bounds.
      getSouthEast: function() {
        return new at(this.getSouth(), this.getEast());
      },
      // @method getWest(): Number
      // Returns the west longitude of the bounds
      getWest: function() {
        return this._southWest.lng;
      },
      // @method getSouth(): Number
      // Returns the south latitude of the bounds
      getSouth: function() {
        return this._southWest.lat;
      },
      // @method getEast(): Number
      // Returns the east longitude of the bounds
      getEast: function() {
        return this._northEast.lng;
      },
      // @method getNorth(): Number
      // Returns the north latitude of the bounds
      getNorth: function() {
        return this._northEast.lat;
      },
      // @method contains(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle contains the given one.
      // @alternative
      // @method contains (latlng: LatLng): Boolean
      // Returns `true` if the rectangle contains the given point.
      contains: function(s) {
        typeof s[0] == "number" || s instanceof at || "lat" in s ? s = G(s) : s = dt(s);
        var l = this._southWest, h = this._northEast, f, _;
        return s instanceof St ? (f = s.getSouthWest(), _ = s.getNorthEast()) : f = _ = s, f.lat >= l.lat && _.lat <= h.lat && f.lng >= l.lng && _.lng <= h.lng;
      },
      // @method intersects(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
      intersects: function(s) {
        s = dt(s);
        var l = this._southWest, h = this._northEast, f = s.getSouthWest(), _ = s.getNorthEast(), x = _.lat >= l.lat && f.lat <= h.lat, C = _.lng >= l.lng && f.lng <= h.lng;
        return x && C;
      },
      // @method overlaps(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
      overlaps: function(s) {
        s = dt(s);
        var l = this._southWest, h = this._northEast, f = s.getSouthWest(), _ = s.getNorthEast(), x = _.lat > l.lat && f.lat < h.lat, C = _.lng > l.lng && f.lng < h.lng;
        return x && C;
      },
      // @method toBBoxString(): String
      // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
      toBBoxString: function() {
        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
      },
      // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
      // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(s, l) {
        return s ? (s = dt(s), this._southWest.equals(s.getSouthWest(), l) && this._northEast.equals(s.getNorthEast(), l)) : !1;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this._southWest && this._northEast);
      }
    };
    function dt(s, l) {
      return s instanceof St ? s : new St(s, l);
    }
    function at(s, l, h) {
      if (isNaN(s) || isNaN(l))
        throw new Error("Invalid LatLng object: (" + s + ", " + l + ")");
      this.lat = +s, this.lng = +l, h !== void 0 && (this.alt = +h);
    }
    at.prototype = {
      // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
      // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(s, l) {
        if (!s)
          return !1;
        s = G(s);
        var h = Math.max(
          Math.abs(this.lat - s.lat),
          Math.abs(this.lng - s.lng)
        );
        return h <= (l === void 0 ? 1e-9 : l);
      },
      // @method toString(): String
      // Returns a string representation of the point (for debugging purposes).
      toString: function(s) {
        return "LatLng(" + v(this.lat, s) + ", " + v(this.lng, s) + ")";
      },
      // @method distanceTo(otherLatLng: LatLng): Number
      // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
      distanceTo: function(s) {
        return fe.distance(this, G(s));
      },
      // @method wrap(): LatLng
      // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
      wrap: function() {
        return fe.wrapLatLng(this);
      },
      // @method toBounds(sizeInMeters: Number): LatLngBounds
      // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
      toBounds: function(s) {
        var l = 180 * s / 40075017, h = l / Math.cos(Math.PI / 180 * this.lat);
        return dt(
          [this.lat - l, this.lng - h],
          [this.lat + l, this.lng + h]
        );
      },
      clone: function() {
        return new at(this.lat, this.lng, this.alt);
      }
    };
    function G(s, l, h) {
      return s instanceof at ? s : P(s) && typeof s[0] != "object" ? s.length === 3 ? new at(s[0], s[1], s[2]) : s.length === 2 ? new at(s[0], s[1]) : null : s == null ? s : typeof s == "object" && "lat" in s ? new at(s.lat, "lng" in s ? s.lng : s.lon, s.alt) : l === void 0 ? null : new at(s, l, h);
    }
    var Dt = {
      // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
      // Projects geographical coordinates into pixel coordinates for a given zoom.
      latLngToPoint: function(s, l) {
        var h = this.projection.project(s), f = this.scale(l);
        return this.transformation._transform(h, f);
      },
      // @method pointToLatLng(point: Point, zoom: Number): LatLng
      // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
      // zoom into geographical coordinates.
      pointToLatLng: function(s, l) {
        var h = this.scale(l), f = this.transformation.untransform(s, h);
        return this.projection.unproject(f);
      },
      // @method project(latlng: LatLng): Point
      // Projects geographical coordinates into coordinates in units accepted for
      // this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
      project: function(s) {
        return this.projection.project(s);
      },
      // @method unproject(point: Point): LatLng
      // Given a projected coordinate returns the corresponding LatLng.
      // The inverse of `project`.
      unproject: function(s) {
        return this.projection.unproject(s);
      },
      // @method scale(zoom: Number): Number
      // Returns the scale used when transforming projected coordinates into
      // pixel coordinates for a particular zoom. For example, it returns
      // `256 * 2^zoom` for Mercator-based CRS.
      scale: function(s) {
        return 256 * Math.pow(2, s);
      },
      // @method zoom(scale: Number): Number
      // Inverse of `scale()`, returns the zoom level corresponding to a scale
      // factor of `scale`.
      zoom: function(s) {
        return Math.log(s / 256) / Math.LN2;
      },
      // @method getProjectedBounds(zoom: Number): Bounds
      // Returns the projection's bounds scaled and transformed for the provided `zoom`.
      getProjectedBounds: function(s) {
        if (this.infinite)
          return null;
        var l = this.projection.bounds, h = this.scale(s), f = this.transformation.transform(l.min, h), _ = this.transformation.transform(l.max, h);
        return new tt(f, _);
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates.
      // @property code: String
      // Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
      //
      // @property wrapLng: Number[]
      // An array of two numbers defining whether the longitude (horizontal) coordinate
      // axis wraps around a given range and how. Defaults to `[-180, 180]` in most
      // geographical CRSs. If `undefined`, the longitude axis does not wrap around.
      //
      // @property wrapLat: Number[]
      // Like `wrapLng`, but for the latitude (vertical) axis.
      // wrapLng: [min, max],
      // wrapLat: [min, max],
      // @property infinite: Boolean
      // If true, the coordinate space will be unbounded (infinite in both axes)
      infinite: !1,
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where lat and lng has been wrapped according to the
      // CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
      wrapLatLng: function(s) {
        var l = this.wrapLng ? p(s.lng, this.wrapLng, !0) : s.lng, h = this.wrapLat ? p(s.lat, this.wrapLat, !0) : s.lat, f = s.alt;
        return new at(h, l, f);
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring
      // that its center is within the CRS's bounds.
      // Only accepts actual `L.LatLngBounds` instances, not arrays.
      wrapLatLngBounds: function(s) {
        var l = s.getCenter(), h = this.wrapLatLng(l), f = l.lat - h.lat, _ = l.lng - h.lng;
        if (f === 0 && _ === 0)
          return s;
        var x = s.getSouthWest(), C = s.getNorthEast(), E = new at(x.lat - f, x.lng - _), z = new at(C.lat - f, C.lng - _);
        return new St(E, z);
      }
    }, fe = r({}, Dt, {
      wrapLng: [-180, 180],
      // Mean Earth Radius, as recommended for use by
      // the International Union of Geodesy and Geophysics,
      // see https://rosettacode.org/wiki/Haversine_formula
      R: 6371e3,
      // distance between two geographical points using spherical law of cosines approximation
      distance: function(s, l) {
        var h = Math.PI / 180, f = s.lat * h, _ = l.lat * h, x = Math.sin((l.lat - s.lat) * h / 2), C = Math.sin((l.lng - s.lng) * h / 2), E = x * x + Math.cos(f) * Math.cos(_) * C * C, z = 2 * Math.atan2(Math.sqrt(E), Math.sqrt(1 - E));
        return this.R * z;
      }
    }), xo = 6378137, Us = {
      R: xo,
      MAX_LATITUDE: 85.0511287798,
      project: function(s) {
        var l = Math.PI / 180, h = this.MAX_LATITUDE, f = Math.max(Math.min(h, s.lat), -h), _ = Math.sin(f * l);
        return new I(
          this.R * s.lng * l,
          this.R * Math.log((1 + _) / (1 - _)) / 2
        );
      },
      unproject: function(s) {
        var l = 180 / Math.PI;
        return new at(
          (2 * Math.atan(Math.exp(s.y / this.R)) - Math.PI / 2) * l,
          s.x * l / this.R
        );
      },
      bounds: function() {
        var s = xo * Math.PI;
        return new tt([-s, -s], [s, s]);
      }()
    };
    function $s(s, l, h, f) {
      if (P(s)) {
        this._a = s[0], this._b = s[1], this._c = s[2], this._d = s[3];
        return;
      }
      this._a = s, this._b = l, this._c = h, this._d = f;
    }
    $s.prototype = {
      // @method transform(point: Point, scale?: Number): Point
      // Returns a transformed point, optionally multiplied by the given scale.
      // Only accepts actual `L.Point` instances, not arrays.
      transform: function(s, l) {
        return this._transform(s.clone(), l);
      },
      // destructive transform (faster)
      _transform: function(s, l) {
        return l = l || 1, s.x = l * (this._a * s.x + this._b), s.y = l * (this._c * s.y + this._d), s;
      },
      // @method untransform(point: Point, scale?: Number): Point
      // Returns the reverse transformation of the given point, optionally divided
      // by the given scale. Only accepts actual `L.Point` instances, not arrays.
      untransform: function(s, l) {
        return l = l || 1, new I(
          (s.x / l - this._b) / this._a,
          (s.y / l - this._d) / this._c
        );
      }
    };
    function Bn(s, l, h, f) {
      return new $s(s, l, h, f);
    }
    var Ki = r({}, fe, {
      code: "EPSG:3857",
      projection: Us,
      transformation: function() {
        var s = 0.5 / (Math.PI * Us.R);
        return Bn(s, 0.5, -s, 0.5);
      }()
    }), wo = r({}, Ki, {
      code: "EPSG:900913"
    });
    function bo(s) {
      return document.createElementNS("http://www.w3.org/2000/svg", s);
    }
    function ko(s, l) {
      var h = "", f, _, x, C, E, z;
      for (f = 0, x = s.length; f < x; f++) {
        for (E = s[f], _ = 0, C = E.length; _ < C; _++)
          z = E[_], h += (_ ? "L" : "M") + z.x + " " + z.y;
        h += l ? Q.svg ? "z" : "x" : "";
      }
      return h || "M0 0";
    }
    var Ys = document.documentElement.style, Xi = "ActiveXObject" in window, Vl = Xi && !document.addEventListener, et = "msLaunchUri" in navigator && !("documentMode" in document), J = on("webkit"), it = on("android"), Vt = on("android 2") || on("android 3"), Gt = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), ne = it && on("Google") && Gt < 537 && !("AudioNode" in window), Qt = !!window.opera, Le = !et && on("chrome"), Re = on("gecko") && !J && !Qt && !Xi, De = !Le && on("safari"), Hn = on("phantom"), Cd = "OTransition" in Ys, Iy = navigator.platform.indexOf("Win") === 0, Ld = Xi && "transition" in Ys, Zl = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !Vt, Td = "MozPerspective" in Ys, Ry = !window.L_DISABLE_3D && (Ld || Zl || Td) && !Cd && !Hn, qs = typeof orientation < "u" || on("mobile"), Dy = qs && J, Fy = qs && Zl, Nd = !window.PointerEvent && window.MSPointerEvent, Ed = !!(window.PointerEvent || Nd), zd = "ontouchstart" in window || !!window.TouchEvent, By = !window.L_NO_TOUCH && (zd || Ed), Hy = qs && Qt, Wy = qs && Re, Vy = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Zy = function() {
      var s = !1;
      try {
        var l = Object.defineProperty({}, "passive", {
          get: function() {
            s = !0;
          }
        });
        window.addEventListener("testPassiveEventSupport", g, l), window.removeEventListener("testPassiveEventSupport", g, l);
      } catch {
      }
      return s;
    }(), Uy = function() {
      return !!document.createElement("canvas").getContext;
    }(), Ul = !!(document.createElementNS && bo("svg").createSVGRect), $y = !!Ul && function() {
      var s = document.createElement("div");
      return s.innerHTML = "<svg/>", (s.firstChild && s.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
    }(), Yy = !Ul && function() {
      try {
        var s = document.createElement("div");
        s.innerHTML = '<v:shape adj="1"/>';
        var l = s.firstChild;
        return l.style.behavior = "url(#default#VML)", l && typeof l.adj == "object";
      } catch {
        return !1;
      }
    }(), qy = navigator.platform.indexOf("Mac") === 0, Ky = navigator.platform.indexOf("Linux") === 0;
    function on(s) {
      return navigator.userAgent.toLowerCase().indexOf(s) >= 0;
    }
    var Q = {
      ie: Xi,
      ielt9: Vl,
      edge: et,
      webkit: J,
      android: it,
      android23: Vt,
      androidStock: ne,
      opera: Qt,
      chrome: Le,
      gecko: Re,
      safari: De,
      phantom: Hn,
      opera12: Cd,
      win: Iy,
      ie3d: Ld,
      webkit3d: Zl,
      gecko3d: Td,
      any3d: Ry,
      mobile: qs,
      mobileWebkit: Dy,
      mobileWebkit3d: Fy,
      msPointer: Nd,
      pointer: Ed,
      touch: By,
      touchNative: zd,
      mobileOpera: Hy,
      mobileGecko: Wy,
      retina: Vy,
      passiveEvents: Zy,
      canvas: Uy,
      svg: Ul,
      vml: Yy,
      inlineSvg: $y,
      mac: qy,
      linux: Ky
    }, jd = Q.msPointer ? "MSPointerDown" : "pointerdown", Od = Q.msPointer ? "MSPointerMove" : "pointermove", Ad = Q.msPointer ? "MSPointerUp" : "pointerup", Id = Q.msPointer ? "MSPointerCancel" : "pointercancel", $l = {
      touchstart: jd,
      touchmove: Od,
      touchend: Ad,
      touchcancel: Id
    }, Rd = {
      touchstart: e0,
      touchmove: So,
      touchend: So,
      touchcancel: So
    }, Gi = {}, Dd = !1;
    function Xy(s, l, h) {
      return l === "touchstart" && t0(), Rd[l] ? (h = Rd[l].bind(this, h), s.addEventListener($l[l], h, !1), h) : (console.warn("wrong event specified:", l), g);
    }
    function Gy(s, l, h) {
      if (!$l[l]) {
        console.warn("wrong event specified:", l);
        return;
      }
      s.removeEventListener($l[l], h, !1);
    }
    function Qy(s) {
      Gi[s.pointerId] = s;
    }
    function Jy(s) {
      Gi[s.pointerId] && (Gi[s.pointerId] = s);
    }
    function Fd(s) {
      delete Gi[s.pointerId];
    }
    function t0() {
      Dd || (document.addEventListener(jd, Qy, !0), document.addEventListener(Od, Jy, !0), document.addEventListener(Ad, Fd, !0), document.addEventListener(Id, Fd, !0), Dd = !0);
    }
    function So(s, l) {
      if (l.pointerType !== (l.MSPOINTER_TYPE_MOUSE || "mouse")) {
        l.touches = [];
        for (var h in Gi)
          l.touches.push(Gi[h]);
        l.changedTouches = [l], s(l);
      }
    }
    function e0(s, l) {
      l.MSPOINTER_TYPE_TOUCH && l.pointerType === l.MSPOINTER_TYPE_TOUCH && ie(l), So(s, l);
    }
    function n0(s) {
      var l = {}, h, f;
      for (f in s)
        h = s[f], l[f] = h && h.bind ? h.bind(s) : h;
      return s = l, l.type = "dblclick", l.detail = 2, l.isTrusted = !1, l._simulated = !0, l;
    }
    var i0 = 200;
    function s0(s, l) {
      s.addEventListener("dblclick", l);
      var h = 0, f;
      function _(x) {
        if (x.detail !== 1) {
          f = x.detail;
          return;
        }
        if (!(x.pointerType === "mouse" || x.sourceCapabilities && !x.sourceCapabilities.firesTouchEvents)) {
          var C = Zd(x);
          if (!(C.some(function(z) {
            return z instanceof HTMLLabelElement && z.attributes.for;
          }) && !C.some(function(z) {
            return z instanceof HTMLInputElement || z instanceof HTMLSelectElement;
          }))) {
            var E = Date.now();
            E - h <= i0 ? (f++, f === 2 && l(n0(x))) : f = 1, h = E;
          }
        }
      }
      return s.addEventListener("click", _), {
        dblclick: l,
        simDblclick: _
      };
    }
    function r0(s, l) {
      s.removeEventListener("dblclick", l.dblclick), s.removeEventListener("click", l.simDblclick);
    }
    var Yl = Co(
      ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
    ), Ks = Co(
      ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
    ), Bd = Ks === "webkitTransition" || Ks === "OTransition" ? Ks + "End" : "transitionend";
    function Hd(s) {
      return typeof s == "string" ? document.getElementById(s) : s;
    }
    function Xs(s, l) {
      var h = s.style[l] || s.currentStyle && s.currentStyle[l];
      if ((!h || h === "auto") && document.defaultView) {
        var f = document.defaultView.getComputedStyle(s, null);
        h = f ? f[l] : null;
      }
      return h === "auto" ? null : h;
    }
    function vt(s, l, h) {
      var f = document.createElement(s);
      return f.className = l || "", h && h.appendChild(f), f;
    }
    function zt(s) {
      var l = s.parentNode;
      l && l.removeChild(s);
    }
    function Po(s) {
      for (; s.firstChild; )
        s.removeChild(s.firstChild);
    }
    function Qi(s) {
      var l = s.parentNode;
      l && l.lastChild !== s && l.appendChild(s);
    }
    function Ji(s) {
      var l = s.parentNode;
      l && l.firstChild !== s && l.insertBefore(s, l.firstChild);
    }
    function ql(s, l) {
      if (s.classList !== void 0)
        return s.classList.contains(l);
      var h = Mo(s);
      return h.length > 0 && new RegExp("(^|\\s)" + l + "(\\s|$)").test(h);
    }
    function ct(s, l) {
      if (s.classList !== void 0)
        for (var h = S(l), f = 0, _ = h.length; f < _; f++)
          s.classList.add(h[f]);
      else if (!ql(s, l)) {
        var x = Mo(s);
        Kl(s, (x ? x + " " : "") + l);
      }
    }
    function Ft(s, l) {
      s.classList !== void 0 ? s.classList.remove(l) : Kl(s, y((" " + Mo(s) + " ").replace(" " + l + " ", " ")));
    }
    function Kl(s, l) {
      s.className.baseVal === void 0 ? s.className = l : s.className.baseVal = l;
    }
    function Mo(s) {
      return s.correspondingElement && (s = s.correspondingElement), s.className.baseVal === void 0 ? s.className : s.className.baseVal;
    }
    function Fe(s, l) {
      "opacity" in s.style ? s.style.opacity = l : "filter" in s.style && o0(s, l);
    }
    function o0(s, l) {
      var h = !1, f = "DXImageTransform.Microsoft.Alpha";
      try {
        h = s.filters.item(f);
      } catch {
        if (l === 1)
          return;
      }
      l = Math.round(l * 100), h ? (h.Enabled = l !== 100, h.Opacity = l) : s.style.filter += " progid:" + f + "(opacity=" + l + ")";
    }
    function Co(s) {
      for (var l = document.documentElement.style, h = 0; h < s.length; h++)
        if (s[h] in l)
          return s[h];
      return !1;
    }
    function yi(s, l, h) {
      var f = l || new I(0, 0);
      s.style[Yl] = (Q.ie3d ? "translate(" + f.x + "px," + f.y + "px)" : "translate3d(" + f.x + "px," + f.y + "px,0)") + (h ? " scale(" + h + ")" : "");
    }
    function Zt(s, l) {
      s._leaflet_pos = l, Q.any3d ? yi(s, l) : (s.style.left = l.x + "px", s.style.top = l.y + "px");
    }
    function xi(s) {
      return s._leaflet_pos || new I(0, 0);
    }
    var Gs, Qs, Xl;
    if ("onselectstart" in document)
      Gs = function() {
        lt(window, "selectstart", ie);
      }, Qs = function() {
        Mt(window, "selectstart", ie);
      };
    else {
      var Js = Co(
        ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
      );
      Gs = function() {
        if (Js) {
          var s = document.documentElement.style;
          Xl = s[Js], s[Js] = "none";
        }
      }, Qs = function() {
        Js && (document.documentElement.style[Js] = Xl, Xl = void 0);
      };
    }
    function Gl() {
      lt(window, "dragstart", ie);
    }
    function Ql() {
      Mt(window, "dragstart", ie);
    }
    var Lo, Jl;
    function tc(s) {
      for (; s.tabIndex === -1; )
        s = s.parentNode;
      s.style && (To(), Lo = s, Jl = s.style.outlineStyle, s.style.outlineStyle = "none", lt(window, "keydown", To));
    }
    function To() {
      Lo && (Lo.style.outlineStyle = Jl, Lo = void 0, Jl = void 0, Mt(window, "keydown", To));
    }
    function Wd(s) {
      do
        s = s.parentNode;
      while ((!s.offsetWidth || !s.offsetHeight) && s !== document.body);
      return s;
    }
    function ec(s) {
      var l = s.getBoundingClientRect();
      return {
        x: l.width / s.offsetWidth || 1,
        y: l.height / s.offsetHeight || 1,
        boundingClientRect: l
      };
    }
    var a0 = {
      __proto__: null,
      TRANSFORM: Yl,
      TRANSITION: Ks,
      TRANSITION_END: Bd,
      get: Hd,
      getStyle: Xs,
      create: vt,
      remove: zt,
      empty: Po,
      toFront: Qi,
      toBack: Ji,
      hasClass: ql,
      addClass: ct,
      removeClass: Ft,
      setClass: Kl,
      getClass: Mo,
      setOpacity: Fe,
      testProp: Co,
      setTransform: yi,
      setPosition: Zt,
      getPosition: xi,
      get disableTextSelection() {
        return Gs;
      },
      get enableTextSelection() {
        return Qs;
      },
      disableImageDrag: Gl,
      enableImageDrag: Ql,
      preventOutline: tc,
      restoreOutline: To,
      getSizedParentNode: Wd,
      getScale: ec
    };
    function lt(s, l, h, f) {
      if (l && typeof l == "object")
        for (var _ in l)
          ic(s, _, l[_], h);
      else {
        l = S(l);
        for (var x = 0, C = l.length; x < C; x++)
          ic(s, l[x], h, f);
      }
      return this;
    }
    var an = "_leaflet_events";
    function Mt(s, l, h, f) {
      if (arguments.length === 1)
        Vd(s), delete s[an];
      else if (l && typeof l == "object")
        for (var _ in l)
          sc(s, _, l[_], h);
      else if (l = S(l), arguments.length === 2)
        Vd(s, function(E) {
          return T(l, E) !== -1;
        });
      else
        for (var x = 0, C = l.length; x < C; x++)
          sc(s, l[x], h, f);
      return this;
    }
    function Vd(s, l) {
      for (var h in s[an]) {
        var f = h.split(/\d/)[0];
        (!l || l(f)) && sc(s, f, null, null, h);
      }
    }
    var nc = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      wheel: !("onwheel" in window) && "mousewheel"
    };
    function ic(s, l, h, f) {
      var _ = l + u(h) + (f ? "_" + u(f) : "");
      if (s[an] && s[an][_])
        return this;
      var x = function(E) {
        return h.call(f || s, E || window.event);
      }, C = x;
      !Q.touchNative && Q.pointer && l.indexOf("touch") === 0 ? x = Xy(s, l, x) : Q.touch && l === "dblclick" ? x = s0(s, x) : "addEventListener" in s ? l === "touchstart" || l === "touchmove" || l === "wheel" || l === "mousewheel" ? s.addEventListener(nc[l] || l, x, Q.passiveEvents ? { passive: !1 } : !1) : l === "mouseenter" || l === "mouseleave" ? (x = function(E) {
        E = E || window.event, oc(s, E) && C(E);
      }, s.addEventListener(nc[l], x, !1)) : s.addEventListener(l, C, !1) : s.attachEvent("on" + l, x), s[an] = s[an] || {}, s[an][_] = x;
    }
    function sc(s, l, h, f, _) {
      _ = _ || l + u(h) + (f ? "_" + u(f) : "");
      var x = s[an] && s[an][_];
      if (!x)
        return this;
      !Q.touchNative && Q.pointer && l.indexOf("touch") === 0 ? Gy(s, l, x) : Q.touch && l === "dblclick" ? r0(s, x) : "removeEventListener" in s ? s.removeEventListener(nc[l] || l, x, !1) : s.detachEvent("on" + l, x), s[an][_] = null;
    }
    function wi(s) {
      return s.stopPropagation ? s.stopPropagation() : s.originalEvent ? s.originalEvent._stopped = !0 : s.cancelBubble = !0, this;
    }
    function rc(s) {
      return ic(s, "wheel", wi), this;
    }
    function tr(s) {
      return lt(s, "mousedown touchstart dblclick contextmenu", wi), s._leaflet_disable_click = !0, this;
    }
    function ie(s) {
      return s.preventDefault ? s.preventDefault() : s.returnValue = !1, this;
    }
    function bi(s) {
      return ie(s), wi(s), this;
    }
    function Zd(s) {
      if (s.composedPath)
        return s.composedPath();
      for (var l = [], h = s.target; h; )
        l.push(h), h = h.parentNode;
      return l;
    }
    function Ud(s, l) {
      if (!l)
        return new I(s.clientX, s.clientY);
      var h = ec(l), f = h.boundingClientRect;
      return new I(
        // offset.left/top values are in page scale (like clientX/Y),
        // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
        (s.clientX - f.left) / h.x - l.clientLeft,
        (s.clientY - f.top) / h.y - l.clientTop
      );
    }
    var l0 = Q.linux && Q.chrome ? window.devicePixelRatio : Q.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
    function $d(s) {
      return Q.edge ? s.wheelDeltaY / 2 : (
        // Don't trust window-geometry-based delta
        s.deltaY && s.deltaMode === 0 ? -s.deltaY / l0 : (
          // Pixels
          s.deltaY && s.deltaMode === 1 ? -s.deltaY * 20 : (
            // Lines
            s.deltaY && s.deltaMode === 2 ? -s.deltaY * 60 : (
              // Pages
              s.deltaX || s.deltaZ ? 0 : (
                // Skip horizontal/depth wheel events
                s.wheelDelta ? (s.wheelDeltaY || s.wheelDelta) / 2 : (
                  // Legacy IE pixels
                  s.detail && Math.abs(s.detail) < 32765 ? -s.detail * 20 : (
                    // Legacy Moz lines
                    s.detail ? s.detail / -32765 * 60 : (
                      // Legacy Moz pages
                      0
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
    function oc(s, l) {
      var h = l.relatedTarget;
      if (!h)
        return !0;
      try {
        for (; h && h !== s; )
          h = h.parentNode;
      } catch {
        return !1;
      }
      return h !== s;
    }
    var c0 = {
      __proto__: null,
      on: lt,
      off: Mt,
      stopPropagation: wi,
      disableScrollPropagation: rc,
      disableClickPropagation: tr,
      preventDefault: ie,
      stop: bi,
      getPropagationPath: Zd,
      getMousePosition: Ud,
      getWheelDelta: $d,
      isExternalTarget: oc,
      addListener: lt,
      removeListener: Mt
    }, Yd = ht.extend({
      // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
      // Run an animation of a given element to a new position, optionally setting
      // duration in seconds (`0.25` by default) and easing linearity factor (3rd
      // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
      // `0.5` by default).
      run: function(s, l, h, f) {
        this.stop(), this._el = s, this._inProgress = !0, this._duration = h || 0.25, this._easeOutPower = 1 / Math.max(f || 0.5, 0.2), this._startPos = xi(s), this._offset = l.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
      },
      // @method stop()
      // Stops the animation (if currently running).
      stop: function() {
        this._inProgress && (this._step(!0), this._complete());
      },
      _animate: function() {
        this._animId = V(this._animate, this), this._step();
      },
      _step: function(s) {
        var l = +/* @__PURE__ */ new Date() - this._startTime, h = this._duration * 1e3;
        l < h ? this._runFrame(this._easeOut(l / h), s) : (this._runFrame(1), this._complete());
      },
      _runFrame: function(s, l) {
        var h = this._startPos.add(this._offset.multiplyBy(s));
        l && h._round(), Zt(this._el, h), this.fire("step");
      },
      _complete: function() {
        K(this._animId), this._inProgress = !1, this.fire("end");
      },
      _easeOut: function(s) {
        return 1 - Math.pow(1 - s, this._easeOutPower);
      }
    }), gt = ht.extend({
      options: {
        // @section Map State Options
        // @option crs: CRS = L.CRS.EPSG3857
        // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
        // sure what it means.
        crs: Ki,
        // @option center: LatLng = undefined
        // Initial geographic center of the map
        center: void 0,
        // @option zoom: Number = undefined
        // Initial map zoom level
        zoom: void 0,
        // @option minZoom: Number = *
        // Minimum zoom level of the map.
        // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
        // the lowest of their `minZoom` options will be used instead.
        minZoom: void 0,
        // @option maxZoom: Number = *
        // Maximum zoom level of the map.
        // If not specified and at least one `GridLayer` or `TileLayer` is in the map,
        // the highest of their `maxZoom` options will be used instead.
        maxZoom: void 0,
        // @option layers: Layer[] = []
        // Array of layers that will be added to the map initially
        layers: [],
        // @option maxBounds: LatLngBounds = null
        // When this option is set, the map restricts the view to the given
        // geographical bounds, bouncing the user back if the user tries to pan
        // outside the view. To set the restriction dynamically, use
        // [`setMaxBounds`](#map-setmaxbounds) method.
        maxBounds: void 0,
        // @option renderer: Renderer = *
        // The default method for drawing vector layers on the map. `L.SVG`
        // or `L.Canvas` by default depending on browser support.
        renderer: void 0,
        // @section Animation Options
        // @option zoomAnimation: Boolean = true
        // Whether the map zoom animation is enabled. By default it's enabled
        // in all browsers that support CSS3 Transitions except Android.
        zoomAnimation: !0,
        // @option zoomAnimationThreshold: Number = 4
        // Won't animate zoom if the zoom difference exceeds this value.
        zoomAnimationThreshold: 4,
        // @option fadeAnimation: Boolean = true
        // Whether the tile fade animation is enabled. By default it's enabled
        // in all browsers that support CSS3 Transitions except Android.
        fadeAnimation: !0,
        // @option markerZoomAnimation: Boolean = true
        // Whether markers animate their zoom with the zoom animation, if disabled
        // they will disappear for the length of the animation. By default it's
        // enabled in all browsers that support CSS3 Transitions except Android.
        markerZoomAnimation: !0,
        // @option transform3DLimit: Number = 2^23
        // Defines the maximum size of a CSS translation transform. The default
        // value should not be changed unless a web browser positions layers in
        // the wrong place after doing a large `panBy`.
        transform3DLimit: 8388608,
        // Precision limit of a 32-bit float
        // @section Interaction Options
        // @option zoomSnap: Number = 1
        // Forces the map's zoom level to always be a multiple of this, particularly
        // right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
        // By default, the zoom level snaps to the nearest integer; lower values
        // (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
        // means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
        zoomSnap: 1,
        // @option zoomDelta: Number = 1
        // Controls how much the map's zoom level will change after a
        // [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
        // or `-` on the keyboard, or using the [zoom controls](#control-zoom).
        // Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
        zoomDelta: 1,
        // @option trackResize: Boolean = true
        // Whether the map automatically handles browser window resize to update itself.
        trackResize: !0
      },
      initialize: function(s, l) {
        l = w(this, l), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(s), this._initLayout(), this._onResize = a(this._onResize, this), this._initEvents(), l.maxBounds && this.setMaxBounds(l.maxBounds), l.zoom !== void 0 && (this._zoom = this._limitZoom(l.zoom)), l.center && l.zoom !== void 0 && this.setView(G(l.center), l.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = Ks && Q.any3d && !Q.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), lt(this._proxy, Bd, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
      },
      // @section Methods for modifying map state
      // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) with the given
      // animation options.
      setView: function(s, l, h) {
        if (l = l === void 0 ? this._zoom : this._limitZoom(l), s = this._limitCenter(G(s), l, this.options.maxBounds), h = h || {}, this._stop(), this._loaded && !h.reset && h !== !0) {
          h.animate !== void 0 && (h.zoom = r({ animate: h.animate }, h.zoom), h.pan = r({ animate: h.animate, duration: h.duration }, h.pan));
          var f = this._zoom !== l ? this._tryAnimatedZoom && this._tryAnimatedZoom(s, l, h.zoom) : this._tryAnimatedPan(s, h.pan);
          if (f)
            return clearTimeout(this._sizeTimer), this;
        }
        return this._resetView(s, l, h.pan && h.pan.noMoveStart), this;
      },
      // @method setZoom(zoom: Number, options?: Zoom/pan options): this
      // Sets the zoom of the map.
      setZoom: function(s, l) {
        return this._loaded ? this.setView(this.getCenter(), s, { zoom: l }) : (this._zoom = s, this);
      },
      // @method zoomIn(delta?: Number, options?: Zoom options): this
      // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomIn: function(s, l) {
        return s = s || (Q.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + s, l);
      },
      // @method zoomOut(delta?: Number, options?: Zoom options): this
      // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomOut: function(s, l) {
        return s = s || (Q.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - s, l);
      },
      // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified geographical point on the map
      // stationary (e.g. used internally for scroll zoom and double-click zoom).
      // @alternative
      // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
      setZoomAround: function(s, l, h) {
        var f = this.getZoomScale(l), _ = this.getSize().divideBy(2), x = s instanceof I ? s : this.latLngToContainerPoint(s), C = x.subtract(_).multiplyBy(1 - 1 / f), E = this.containerPointToLatLng(_.add(C));
        return this.setView(E, l, { zoom: h });
      },
      _getBoundsCenterZoom: function(s, l) {
        l = l || {}, s = s.getBounds ? s.getBounds() : dt(s);
        var h = D(l.paddingTopLeft || l.padding || [0, 0]), f = D(l.paddingBottomRight || l.padding || [0, 0]), _ = this.getBoundsZoom(s, !1, h.add(f));
        if (_ = typeof l.maxZoom == "number" ? Math.min(l.maxZoom, _) : _, _ === 1 / 0)
          return {
            center: s.getCenter(),
            zoom: _
          };
        var x = f.subtract(h).divideBy(2), C = this.project(s.getSouthWest(), _), E = this.project(s.getNorthEast(), _), z = this.unproject(C.add(E).divideBy(2).add(x), _);
        return {
          center: z,
          zoom: _
        };
      },
      // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets a map view that contains the given geographical bounds with the
      // maximum zoom level possible.
      fitBounds: function(s, l) {
        if (s = dt(s), !s.isValid())
          throw new Error("Bounds are not valid.");
        var h = this._getBoundsCenterZoom(s, l);
        return this.setView(h.center, h.zoom, l);
      },
      // @method fitWorld(options?: fitBounds options): this
      // Sets a map view that mostly contains the whole world with the maximum
      // zoom level possible.
      fitWorld: function(s) {
        return this.fitBounds([[-90, -180], [90, 180]], s);
      },
      // @method panTo(latlng: LatLng, options?: Pan options): this
      // Pans the map to a given center.
      panTo: function(s, l) {
        return this.setView(s, this._zoom, { pan: l });
      },
      // @method panBy(offset: Point, options?: Pan options): this
      // Pans the map by a given number of pixels (animated).
      panBy: function(s, l) {
        if (s = D(s).round(), l = l || {}, !s.x && !s.y)
          return this.fire("moveend");
        if (l.animate !== !0 && !this.getSize().contains(s))
          return this._resetView(this.unproject(this.project(this.getCenter()).add(s)), this.getZoom()), this;
        if (this._panAnim || (this._panAnim = new Yd(), this._panAnim.on({
          step: this._onPanTransitionStep,
          end: this._onPanTransitionEnd
        }, this)), l.noMoveStart || this.fire("movestart"), l.animate !== !1) {
          ct(this._mapPane, "leaflet-pan-anim");
          var h = this._getMapPanePos().subtract(s).round();
          this._panAnim.run(this._mapPane, h, l.duration || 0.25, l.easeLinearity);
        } else
          this._rawPanBy(s), this.fire("move").fire("moveend");
        return this;
      },
      // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) performing a smooth
      // pan-zoom animation.
      flyTo: function(s, l, h) {
        if (h = h || {}, h.animate === !1 || !Q.any3d)
          return this.setView(s, l, h);
        this._stop();
        var f = this.project(this.getCenter()), _ = this.project(s), x = this.getSize(), C = this._zoom;
        s = G(s), l = l === void 0 ? C : l;
        var E = Math.max(x.x, x.y), z = E * this.getZoomScale(C, l), R = _.distanceTo(f) || 1, Z = 1.42, nt = Z * Z;
        function ft(Ut) {
          var Ho = Ut ? -1 : 1, G0 = Ut ? z : E, Q0 = z * z - E * E + Ho * nt * nt * R * R, J0 = 2 * G0 * nt * R, _c = Q0 / J0, Lf = Math.sqrt(_c * _c + 1) - _c, tx = Lf < 1e-9 ? -18 : Math.log(Lf);
          return tx;
        }
        function pe(Ut) {
          return (Math.exp(Ut) - Math.exp(-Ut)) / 2;
        }
        function Jt(Ut) {
          return (Math.exp(Ut) + Math.exp(-Ut)) / 2;
        }
        function He(Ut) {
          return pe(Ut) / Jt(Ut);
        }
        var ye = ft(0);
        function rs(Ut) {
          return E * (Jt(ye) / Jt(ye + Z * Ut));
        }
        function Y0(Ut) {
          return E * (Jt(ye) * He(ye + Z * Ut) - pe(ye)) / nt;
        }
        function q0(Ut) {
          return 1 - Math.pow(1 - Ut, 1.5);
        }
        var K0 = Date.now(), Mf = (ft(1) - ye) / Z, X0 = h.duration ? 1e3 * h.duration : 1e3 * Mf * 0.8;
        function Cf() {
          var Ut = (Date.now() - K0) / X0, Ho = q0(Ut) * Mf;
          Ut <= 1 ? (this._flyToFrame = V(Cf, this), this._move(
            this.unproject(f.add(_.subtract(f).multiplyBy(Y0(Ho) / R)), C),
            this.getScaleZoom(E / rs(Ho), C),
            { flyTo: !0 }
          )) : this._move(s, l)._moveEnd(!0);
        }
        return this._moveStart(!0, h.noMoveStart), Cf.call(this), this;
      },
      // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
      // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
      flyToBounds: function(s, l) {
        var h = this._getBoundsCenterZoom(s, l);
        return this.flyTo(h.center, h.zoom, l);
      },
      // @method setMaxBounds(bounds: LatLngBounds): this
      // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
      setMaxBounds: function(s) {
        return s = dt(s), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), s.isValid() ? (this.options.maxBounds = s, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
      },
      // @method setMinZoom(zoom: Number): this
      // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
      setMinZoom: function(s) {
        var l = this.options.minZoom;
        return this.options.minZoom = s, this._loaded && l !== s && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(s) : this;
      },
      // @method setMaxZoom(zoom: Number): this
      // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
      setMaxZoom: function(s) {
        var l = this.options.maxZoom;
        return this.options.maxZoom = s, this._loaded && l !== s && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(s) : this;
      },
      // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
      // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
      panInsideBounds: function(s, l) {
        this._enforcingBounds = !0;
        var h = this.getCenter(), f = this._limitCenter(h, this._zoom, dt(s));
        return h.equals(f) || this.panTo(f, l), this._enforcingBounds = !1, this;
      },
      // @method panInside(latlng: LatLng, options?: padding options): this
      // Pans the map the minimum amount to make the `latlng` visible. Use
      // padding options to fit the display to more restricted bounds.
      // If `latlng` is already within the (optionally padded) display bounds,
      // the map will not be panned.
      panInside: function(s, l) {
        l = l || {};
        var h = D(l.paddingTopLeft || l.padding || [0, 0]), f = D(l.paddingBottomRight || l.padding || [0, 0]), _ = this.project(this.getCenter()), x = this.project(s), C = this.getPixelBounds(), E = ot([C.min.add(h), C.max.subtract(f)]), z = E.getSize();
        if (!E.contains(x)) {
          this._enforcingBounds = !0;
          var R = x.subtract(E.getCenter()), Z = E.extend(x).getSize().subtract(z);
          _.x += R.x < 0 ? -Z.x : Z.x, _.y += R.y < 0 ? -Z.y : Z.y, this.panTo(this.unproject(_), l), this._enforcingBounds = !1;
        }
        return this;
      },
      // @method invalidateSize(options: Zoom/pan options): this
      // Checks if the map container size changed and updates the map if so —
      // call it after you've changed the map size dynamically, also animating
      // pan by default. If `options.pan` is `false`, panning will not occur.
      // If `options.debounceMoveend` is `true`, it will delay `moveend` event so
      // that it doesn't happen often even if the method is called many
      // times in a row.
      // @alternative
      // @method invalidateSize(animate: Boolean): this
      // Checks if the map container size changed and updates the map if so —
      // call it after you've changed the map size dynamically, also animating
      // pan by default.
      invalidateSize: function(s) {
        if (!this._loaded)
          return this;
        s = r({
          animate: !1,
          pan: !0
        }, s === !0 ? { animate: !0 } : s);
        var l = this.getSize();
        this._sizeChanged = !0, this._lastCenter = null;
        var h = this.getSize(), f = l.divideBy(2).round(), _ = h.divideBy(2).round(), x = f.subtract(_);
        return !x.x && !x.y ? this : (s.animate && s.pan ? this.panBy(x) : (s.pan && this._rawPanBy(x), this.fire("move"), s.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(a(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
          oldSize: l,
          newSize: h
        }));
      },
      // @section Methods for modifying map state
      // @method stop(): this
      // Stops the currently running `panTo` or `flyTo` animation, if any.
      stop: function() {
        return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop();
      },
      // @section Geolocation methods
      // @method locate(options?: Locate options): this
      // Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
      // event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
      // and optionally sets the map view to the user's location with respect to
      // detection accuracy (or to the world view if geolocation failed).
      // Note that, if your page doesn't use HTTPS, this method will fail in
      // modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
      // See `Locate options` for more details.
      locate: function(s) {
        if (s = this._locateOptions = r({
          timeout: 1e4,
          watch: !1
          // setView: false
          // maxZoom: <Number>
          // maximumAge: 0
          // enableHighAccuracy: false
        }, s), !("geolocation" in navigator))
          return this._handleGeolocationError({
            code: 0,
            message: "Geolocation not supported."
          }), this;
        var l = a(this._handleGeolocationResponse, this), h = a(this._handleGeolocationError, this);
        return s.watch ? this._locationWatchId = navigator.geolocation.watchPosition(l, h, s) : navigator.geolocation.getCurrentPosition(l, h, s), this;
      },
      // @method stopLocate(): this
      // Stops watching location previously initiated by `map.locate({watch: true})`
      // and aborts resetting the map view if map.locate was called with
      // `{setView: true}`.
      stopLocate: function() {
        return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this;
      },
      _handleGeolocationError: function(s) {
        if (this._container._leaflet_id) {
          var l = s.code, h = s.message || (l === 1 ? "permission denied" : l === 2 ? "position unavailable" : "timeout");
          this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
            code: l,
            message: "Geolocation error: " + h + "."
          });
        }
      },
      _handleGeolocationResponse: function(s) {
        if (this._container._leaflet_id) {
          var l = s.coords.latitude, h = s.coords.longitude, f = new at(l, h), _ = f.toBounds(s.coords.accuracy * 2), x = this._locateOptions;
          if (x.setView) {
            var C = this.getBoundsZoom(_);
            this.setView(f, x.maxZoom ? Math.min(C, x.maxZoom) : C);
          }
          var E = {
            latlng: f,
            bounds: _,
            timestamp: s.timestamp
          };
          for (var z in s.coords)
            typeof s.coords[z] == "number" && (E[z] = s.coords[z]);
          this.fire("locationfound", E);
        }
      },
      // TODO Appropriate docs section?
      // @section Other Methods
      // @method addHandler(name: String, HandlerClass: Function): this
      // Adds a new `Handler` to the map, given its name and constructor function.
      addHandler: function(s, l) {
        if (!l)
          return this;
        var h = this[s] = new l(this);
        return this._handlers.push(h), this.options[s] && h.enable(), this;
      },
      // @method remove(): this
      // Destroys the map and clears all related event listeners.
      remove: function() {
        if (this._initEvents(!0), this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this._containerId !== this._container._leaflet_id)
          throw new Error("Map container is being reused by another instance");
        try {
          delete this._container._leaflet_id, delete this._containerId;
        } catch {
          this._container._leaflet_id = void 0, this._containerId = void 0;
        }
        this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), zt(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (K(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
        var s;
        for (s in this._layers)
          this._layers[s].remove();
        for (s in this._panes)
          zt(this._panes[s]);
        return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
      },
      // @section Other Methods
      // @method createPane(name: String, container?: HTMLElement): HTMLElement
      // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
      // then returns it. The pane is created as a child of `container`, or
      // as a child of the main map pane if not set.
      createPane: function(s, l) {
        var h = "leaflet-pane" + (s ? " leaflet-" + s.replace("Pane", "") + "-pane" : ""), f = vt("div", h, l || this._mapPane);
        return s && (this._panes[s] = f), f;
      },
      // @section Methods for Getting Map State
      // @method getCenter(): LatLng
      // Returns the geographical center of the map view
      getCenter: function() {
        return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter.clone() : this.layerPointToLatLng(this._getCenterLayerPoint());
      },
      // @method getZoom(): Number
      // Returns the current zoom level of the map view
      getZoom: function() {
        return this._zoom;
      },
      // @method getBounds(): LatLngBounds
      // Returns the geographical bounds visible in the current map view
      getBounds: function() {
        var s = this.getPixelBounds(), l = this.unproject(s.getBottomLeft()), h = this.unproject(s.getTopRight());
        return new St(l, h);
      },
      // @method getMinZoom(): Number
      // Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
      getMinZoom: function() {
        return this.options.minZoom === void 0 ? this._layersMinZoom || 0 : this.options.minZoom;
      },
      // @method getMaxZoom(): Number
      // Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
      getMaxZoom: function() {
        return this.options.maxZoom === void 0 ? this._layersMaxZoom === void 0 ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom;
      },
      // @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean, padding?: Point): Number
      // Returns the maximum zoom level on which the given bounds fit to the map
      // view in its entirety. If `inside` (optional) is set to `true`, the method
      // instead returns the minimum zoom level on which the map view fits into
      // the given bounds in its entirety.
      getBoundsZoom: function(s, l, h) {
        s = dt(s), h = D(h || [0, 0]);
        var f = this.getZoom() || 0, _ = this.getMinZoom(), x = this.getMaxZoom(), C = s.getNorthWest(), E = s.getSouthEast(), z = this.getSize().subtract(h), R = ot(this.project(E, f), this.project(C, f)).getSize(), Z = Q.any3d ? this.options.zoomSnap : 1, nt = z.x / R.x, ft = z.y / R.y, pe = l ? Math.max(nt, ft) : Math.min(nt, ft);
        return f = this.getScaleZoom(pe, f), Z && (f = Math.round(f / (Z / 100)) * (Z / 100), f = l ? Math.ceil(f / Z) * Z : Math.floor(f / Z) * Z), Math.max(_, Math.min(x, f));
      },
      // @method getSize(): Point
      // Returns the current size of the map container (in pixels).
      getSize: function() {
        return (!this._size || this._sizeChanged) && (this._size = new I(
          this._container.clientWidth || 0,
          this._container.clientHeight || 0
        ), this._sizeChanged = !1), this._size.clone();
      },
      // @method getPixelBounds(): Bounds
      // Returns the bounds of the current map view in projected pixel
      // coordinates (sometimes useful in layer and overlay implementations).
      getPixelBounds: function(s, l) {
        var h = this._getTopLeftPoint(s, l);
        return new tt(h, h.add(this.getSize()));
      },
      // TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
      // the map pane? "left point of the map layer" can be confusing, specially
      // since there can be negative offsets.
      // @method getPixelOrigin(): Point
      // Returns the projected pixel coordinates of the top left point of
      // the map layer (useful in custom layer and overlay implementations).
      getPixelOrigin: function() {
        return this._checkIfLoaded(), this._pixelOrigin;
      },
      // @method getPixelWorldBounds(zoom?: Number): Bounds
      // Returns the world's bounds in pixel coordinates for zoom level `zoom`.
      // If `zoom` is omitted, the map's current zoom level is used.
      getPixelWorldBounds: function(s) {
        return this.options.crs.getProjectedBounds(s === void 0 ? this.getZoom() : s);
      },
      // @section Other Methods
      // @method getPane(pane: String|HTMLElement): HTMLElement
      // Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
      getPane: function(s) {
        return typeof s == "string" ? this._panes[s] : s;
      },
      // @method getPanes(): Object
      // Returns a plain object containing the names of all [panes](#map-pane) as keys and
      // the panes as values.
      getPanes: function() {
        return this._panes;
      },
      // @method getContainer: HTMLElement
      // Returns the HTML element that contains the map.
      getContainer: function() {
        return this._container;
      },
      // @section Conversion Methods
      // @method getZoomScale(toZoom: Number, fromZoom: Number): Number
      // Returns the scale factor to be applied to a map transition from zoom level
      // `fromZoom` to `toZoom`. Used internally to help with zoom animations.
      getZoomScale: function(s, l) {
        var h = this.options.crs;
        return l = l === void 0 ? this._zoom : l, h.scale(s) / h.scale(l);
      },
      // @method getScaleZoom(scale: Number, fromZoom: Number): Number
      // Returns the zoom level that the map would end up at, if it is at `fromZoom`
      // level and everything is scaled by a factor of `scale`. Inverse of
      // [`getZoomScale`](#map-getZoomScale).
      getScaleZoom: function(s, l) {
        var h = this.options.crs;
        l = l === void 0 ? this._zoom : l;
        var f = h.zoom(s * h.scale(l));
        return isNaN(f) ? 1 / 0 : f;
      },
      // @method project(latlng: LatLng, zoom: Number): Point
      // Projects a geographical coordinate `LatLng` according to the projection
      // of the map's CRS, then scales it according to `zoom` and the CRS's
      // `Transformation`. The result is pixel coordinate relative to
      // the CRS origin.
      project: function(s, l) {
        return l = l === void 0 ? this._zoom : l, this.options.crs.latLngToPoint(G(s), l);
      },
      // @method unproject(point: Point, zoom: Number): LatLng
      // Inverse of [`project`](#map-project).
      unproject: function(s, l) {
        return l = l === void 0 ? this._zoom : l, this.options.crs.pointToLatLng(D(s), l);
      },
      // @method layerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding geographical coordinate (for the current zoom level).
      layerPointToLatLng: function(s) {
        var l = D(s).add(this.getPixelOrigin());
        return this.unproject(l);
      },
      // @method latLngToLayerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the [origin pixel](#map-getpixelorigin).
      latLngToLayerPoint: function(s) {
        var l = this.project(G(s))._round();
        return l._subtract(this.getPixelOrigin());
      },
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
      // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
      // CRS's bounds.
      // By default this means longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees.
      wrapLatLng: function(s) {
        return this.options.crs.wrapLatLng(G(s));
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring that
      // its center is within the CRS's bounds.
      // By default this means the center longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees, and the majority of the bounds
      // overlaps the CRS's bounds.
      wrapLatLngBounds: function(s) {
        return this.options.crs.wrapLatLngBounds(dt(s));
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates according to
      // the map's CRS. By default this measures distance in meters.
      distance: function(s, l) {
        return this.options.crs.distance(G(s), G(l));
      },
      // @method containerPointToLayerPoint(point: Point): Point
      // Given a pixel coordinate relative to the map container, returns the corresponding
      // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
      containerPointToLayerPoint: function(s) {
        return D(s).subtract(this._getMapPanePos());
      },
      // @method layerPointToContainerPoint(point: Point): Point
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding pixel coordinate relative to the map container.
      layerPointToContainerPoint: function(s) {
        return D(s).add(this._getMapPanePos());
      },
      // @method containerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the map container, returns
      // the corresponding geographical coordinate (for the current zoom level).
      containerPointToLatLng: function(s) {
        var l = this.containerPointToLayerPoint(D(s));
        return this.layerPointToLatLng(l);
      },
      // @method latLngToContainerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the map container.
      latLngToContainerPoint: function(s) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(G(s)));
      },
      // @method mouseEventToContainerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to the
      // map container where the event took place.
      mouseEventToContainerPoint: function(s) {
        return Ud(s, this._container);
      },
      // @method mouseEventToLayerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to
      // the [origin pixel](#map-getpixelorigin) where the event took place.
      mouseEventToLayerPoint: function(s) {
        return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(s));
      },
      // @method mouseEventToLatLng(ev: MouseEvent): LatLng
      // Given a MouseEvent object, returns geographical coordinate where the
      // event took place.
      mouseEventToLatLng: function(s) {
        return this.layerPointToLatLng(this.mouseEventToLayerPoint(s));
      },
      // map initialization methods
      _initContainer: function(s) {
        var l = this._container = Hd(s);
        if (l) {
          if (l._leaflet_id)
            throw new Error("Map container is already initialized.");
        } else throw new Error("Map container not found.");
        lt(l, "scroll", this._onScroll, this), this._containerId = u(l);
      },
      _initLayout: function() {
        var s = this._container;
        this._fadeAnimated = this.options.fadeAnimation && Q.any3d, ct(s, "leaflet-container" + (Q.touch ? " leaflet-touch" : "") + (Q.retina ? " leaflet-retina" : "") + (Q.ielt9 ? " leaflet-oldie" : "") + (Q.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
        var l = Xs(s, "position");
        l !== "absolute" && l !== "relative" && l !== "fixed" && l !== "sticky" && (s.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
      },
      _initPanes: function() {
        var s = this._panes = {};
        this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), Zt(this._mapPane, new I(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (ct(s.markerPane, "leaflet-zoom-hide"), ct(s.shadowPane, "leaflet-zoom-hide"));
      },
      // private methods that modify map state
      // @section Map state change events
      _resetView: function(s, l, h) {
        Zt(this._mapPane, new I(0, 0));
        var f = !this._loaded;
        this._loaded = !0, l = this._limitZoom(l), this.fire("viewprereset");
        var _ = this._zoom !== l;
        this._moveStart(_, h)._move(s, l)._moveEnd(_), this.fire("viewreset"), f && this.fire("load");
      },
      _moveStart: function(s, l) {
        return s && this.fire("zoomstart"), l || this.fire("movestart"), this;
      },
      _move: function(s, l, h, f) {
        l === void 0 && (l = this._zoom);
        var _ = this._zoom !== l;
        return this._zoom = l, this._lastCenter = s, this._pixelOrigin = this._getNewPixelOrigin(s), f ? h && h.pinch && this.fire("zoom", h) : ((_ || h && h.pinch) && this.fire("zoom", h), this.fire("move", h)), this;
      },
      _moveEnd: function(s) {
        return s && this.fire("zoomend"), this.fire("moveend");
      },
      _stop: function() {
        return K(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
      },
      _rawPanBy: function(s) {
        Zt(this._mapPane, this._getMapPanePos().subtract(s));
      },
      _getZoomSpan: function() {
        return this.getMaxZoom() - this.getMinZoom();
      },
      _panInsideMaxBounds: function() {
        this._enforcingBounds || this.panInsideBounds(this.options.maxBounds);
      },
      _checkIfLoaded: function() {
        if (!this._loaded)
          throw new Error("Set map center and zoom first.");
      },
      // DOM event handling
      // @section Interaction events
      _initEvents: function(s) {
        this._targets = {}, this._targets[u(this._container)] = this;
        var l = s ? Mt : lt;
        l(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && l(window, "resize", this._onResize, this), Q.any3d && this.options.transform3DLimit && (s ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
      },
      _onResize: function() {
        K(this._resizeRequest), this._resizeRequest = V(
          function() {
            this.invalidateSize({ debounceMoveend: !0 });
          },
          this
        );
      },
      _onScroll: function() {
        this._container.scrollTop = 0, this._container.scrollLeft = 0;
      },
      _onMoveEnd: function() {
        var s = this._getMapPanePos();
        Math.max(Math.abs(s.x), Math.abs(s.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom());
      },
      _findEventTargets: function(s, l) {
        for (var h = [], f, _ = l === "mouseout" || l === "mouseover", x = s.target || s.srcElement, C = !1; x; ) {
          if (f = this._targets[u(x)], f && (l === "click" || l === "preclick") && this._draggableMoved(f)) {
            C = !0;
            break;
          }
          if (f && f.listens(l, !0) && (_ && !oc(x, s) || (h.push(f), _)) || x === this._container)
            break;
          x = x.parentNode;
        }
        return !h.length && !C && !_ && this.listens(l, !0) && (h = [this]), h;
      },
      _isClickDisabled: function(s) {
        for (; s && s !== this._container; ) {
          if (s._leaflet_disable_click)
            return !0;
          s = s.parentNode;
        }
      },
      _handleDOMEvent: function(s) {
        var l = s.target || s.srcElement;
        if (!(!this._loaded || l._leaflet_disable_events || s.type === "click" && this._isClickDisabled(l))) {
          var h = s.type;
          h === "mousedown" && tc(l), this._fireDOMEvent(s, h);
        }
      },
      _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
      _fireDOMEvent: function(s, l, h) {
        if (s.type === "click") {
          var f = r({}, s);
          f.type = "preclick", this._fireDOMEvent(f, f.type, h);
        }
        var _ = this._findEventTargets(s, l);
        if (h) {
          for (var x = [], C = 0; C < h.length; C++)
            h[C].listens(l, !0) && x.push(h[C]);
          _ = x.concat(_);
        }
        if (_.length) {
          l === "contextmenu" && ie(s);
          var E = _[0], z = {
            originalEvent: s
          };
          if (s.type !== "keypress" && s.type !== "keydown" && s.type !== "keyup") {
            var R = E.getLatLng && (!E._radius || E._radius <= 10);
            z.containerPoint = R ? this.latLngToContainerPoint(E.getLatLng()) : this.mouseEventToContainerPoint(s), z.layerPoint = this.containerPointToLayerPoint(z.containerPoint), z.latlng = R ? E.getLatLng() : this.layerPointToLatLng(z.layerPoint);
          }
          for (C = 0; C < _.length; C++)
            if (_[C].fire(l, z, !0), z.originalEvent._stopped || _[C].options.bubblingMouseEvents === !1 && T(this._mouseEvents, l) !== -1)
              return;
        }
      },
      _draggableMoved: function(s) {
        return s = s.dragging && s.dragging.enabled() ? s : this, s.dragging && s.dragging.moved() || this.boxZoom && this.boxZoom.moved();
      },
      _clearHandlers: function() {
        for (var s = 0, l = this._handlers.length; s < l; s++)
          this._handlers[s].disable();
      },
      // @section Other Methods
      // @method whenReady(fn: Function, context?: Object): this
      // Runs the given function `fn` when the map gets initialized with
      // a view (center and zoom) and at least one layer, or immediately
      // if it's already initialized, optionally passing a function context.
      whenReady: function(s, l) {
        return this._loaded ? s.call(l || this, { target: this }) : this.on("load", s, l), this;
      },
      // private methods for getting map state
      _getMapPanePos: function() {
        return xi(this._mapPane) || new I(0, 0);
      },
      _moved: function() {
        var s = this._getMapPanePos();
        return s && !s.equals([0, 0]);
      },
      _getTopLeftPoint: function(s, l) {
        var h = s && l !== void 0 ? this._getNewPixelOrigin(s, l) : this.getPixelOrigin();
        return h.subtract(this._getMapPanePos());
      },
      _getNewPixelOrigin: function(s, l) {
        var h = this.getSize()._divideBy(2);
        return this.project(s, l)._subtract(h)._add(this._getMapPanePos())._round();
      },
      _latLngToNewLayerPoint: function(s, l, h) {
        var f = this._getNewPixelOrigin(h, l);
        return this.project(s, l)._subtract(f);
      },
      _latLngBoundsToNewLayerBounds: function(s, l, h) {
        var f = this._getNewPixelOrigin(h, l);
        return ot([
          this.project(s.getSouthWest(), l)._subtract(f),
          this.project(s.getNorthWest(), l)._subtract(f),
          this.project(s.getSouthEast(), l)._subtract(f),
          this.project(s.getNorthEast(), l)._subtract(f)
        ]);
      },
      // layer point of the current center
      _getCenterLayerPoint: function() {
        return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
      },
      // offset of the specified place to the current center in pixels
      _getCenterOffset: function(s) {
        return this.latLngToLayerPoint(s).subtract(this._getCenterLayerPoint());
      },
      // adjust center for view to get inside bounds
      _limitCenter: function(s, l, h) {
        if (!h)
          return s;
        var f = this.project(s, l), _ = this.getSize().divideBy(2), x = new tt(f.subtract(_), f.add(_)), C = this._getBoundsOffset(x, h, l);
        return Math.abs(C.x) <= 1 && Math.abs(C.y) <= 1 ? s : this.unproject(f.add(C), l);
      },
      // adjust offset for view to get inside bounds
      _limitOffset: function(s, l) {
        if (!l)
          return s;
        var h = this.getPixelBounds(), f = new tt(h.min.add(s), h.max.add(s));
        return s.add(this._getBoundsOffset(f, l));
      },
      // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
      _getBoundsOffset: function(s, l, h) {
        var f = ot(
          this.project(l.getNorthEast(), h),
          this.project(l.getSouthWest(), h)
        ), _ = f.min.subtract(s.min), x = f.max.subtract(s.max), C = this._rebound(_.x, -x.x), E = this._rebound(_.y, -x.y);
        return new I(C, E);
      },
      _rebound: function(s, l) {
        return s + l > 0 ? Math.round(s - l) / 2 : Math.max(0, Math.ceil(s)) - Math.max(0, Math.floor(l));
      },
      _limitZoom: function(s) {
        var l = this.getMinZoom(), h = this.getMaxZoom(), f = Q.any3d ? this.options.zoomSnap : 1;
        return f && (s = Math.round(s / f) * f), Math.max(l, Math.min(h, s));
      },
      _onPanTransitionStep: function() {
        this.fire("move");
      },
      _onPanTransitionEnd: function() {
        Ft(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
      },
      _tryAnimatedPan: function(s, l) {
        var h = this._getCenterOffset(s)._trunc();
        return (l && l.animate) !== !0 && !this.getSize().contains(h) ? !1 : (this.panBy(h, l), !0);
      },
      _createAnimProxy: function() {
        var s = this._proxy = vt("div", "leaflet-proxy leaflet-zoom-animated");
        this._panes.mapPane.appendChild(s), this.on("zoomanim", function(l) {
          var h = Yl, f = this._proxy.style[h];
          yi(this._proxy, this.project(l.center, l.zoom), this.getZoomScale(l.zoom, 1)), f === this._proxy.style[h] && this._animatingZoom && this._onZoomTransitionEnd();
        }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
      },
      _destroyAnimProxy: function() {
        zt(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
      },
      _animMoveEnd: function() {
        var s = this.getCenter(), l = this.getZoom();
        yi(this._proxy, this.project(s, l), this.getZoomScale(l, 1));
      },
      _catchTransitionEnd: function(s) {
        this._animatingZoom && s.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
      },
      _nothingToAnimate: function() {
        return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
      },
      _tryAnimatedZoom: function(s, l, h) {
        if (this._animatingZoom)
          return !0;
        if (h = h || {}, !this._zoomAnimated || h.animate === !1 || this._nothingToAnimate() || Math.abs(l - this._zoom) > this.options.zoomAnimationThreshold)
          return !1;
        var f = this.getZoomScale(l), _ = this._getCenterOffset(s)._divideBy(1 - 1 / f);
        return h.animate !== !0 && !this.getSize().contains(_) ? !1 : (V(function() {
          this._moveStart(!0, h.noMoveStart || !1)._animateZoom(s, l, !0);
        }, this), !0);
      },
      _animateZoom: function(s, l, h, f) {
        this._mapPane && (h && (this._animatingZoom = !0, this._animateToCenter = s, this._animateToZoom = l, ct(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
          center: s,
          zoom: l,
          noUpdate: f
        }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(a(this._onZoomTransitionEnd, this), 250));
      },
      _onZoomTransitionEnd: function() {
        this._animatingZoom && (this._mapPane && Ft(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
      }
    });
    function u0(s, l) {
      return new gt(s, l);
    }
    var Ke = $.extend({
      // @section
      // @aka Control Options
      options: {
        // @option position: String = 'topright'
        // The position of the control (one of the map corners). Possible values are `'topleft'`,
        // `'topright'`, `'bottomleft'` or `'bottomright'`
        position: "topright"
      },
      initialize: function(s) {
        w(this, s);
      },
      /* @section
       * Classes extending L.Control will inherit the following methods:
       *
       * @method getPosition: string
       * Returns the position of the control.
       */
      getPosition: function() {
        return this.options.position;
      },
      // @method setPosition(position: string): this
      // Sets the position of the control.
      setPosition: function(s) {
        var l = this._map;
        return l && l.removeControl(this), this.options.position = s, l && l.addControl(this), this;
      },
      // @method getContainer: HTMLElement
      // Returns the HTMLElement that contains the control.
      getContainer: function() {
        return this._container;
      },
      // @method addTo(map: Map): this
      // Adds the control to the given map.
      addTo: function(s) {
        this.remove(), this._map = s;
        var l = this._container = this.onAdd(s), h = this.getPosition(), f = s._controlCorners[h];
        return ct(l, "leaflet-control"), h.indexOf("bottom") !== -1 ? f.insertBefore(l, f.firstChild) : f.appendChild(l), this._map.on("unload", this.remove, this), this;
      },
      // @method remove: this
      // Removes the control from the map it is currently active on.
      remove: function() {
        return this._map ? (zt(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
      },
      _refocusOnMap: function(s) {
        this._map && s && s.screenX > 0 && s.screenY > 0 && this._map.getContainer().focus();
      }
    }), er = function(s) {
      return new Ke(s);
    };
    gt.include({
      // @method addControl(control: Control): this
      // Adds the given control to the map
      addControl: function(s) {
        return s.addTo(this), this;
      },
      // @method removeControl(control: Control): this
      // Removes the given control from the map
      removeControl: function(s) {
        return s.remove(), this;
      },
      _initControlPos: function() {
        var s = this._controlCorners = {}, l = "leaflet-", h = this._controlContainer = vt("div", l + "control-container", this._container);
        function f(_, x) {
          var C = l + _ + " " + l + x;
          s[_ + x] = vt("div", C, h);
        }
        f("top", "left"), f("top", "right"), f("bottom", "left"), f("bottom", "right");
      },
      _clearControlPos: function() {
        for (var s in this._controlCorners)
          zt(this._controlCorners[s]);
        zt(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
      }
    });
    var qd = Ke.extend({
      // @section
      // @aka Control.Layers options
      options: {
        // @option collapsed: Boolean = true
        // If `true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.
        collapsed: !0,
        position: "topright",
        // @option autoZIndex: Boolean = true
        // If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
        autoZIndex: !0,
        // @option hideSingleBase: Boolean = false
        // If `true`, the base layers in the control will be hidden when there is only one.
        hideSingleBase: !1,
        // @option sortLayers: Boolean = false
        // Whether to sort the layers. When `false`, layers will keep the order
        // in which they were added to the control.
        sortLayers: !1,
        // @option sortFunction: Function = *
        // A [compare function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
        // that will be used for sorting the layers, when `sortLayers` is `true`.
        // The function receives both the `L.Layer` instances and their names, as in
        // `sortFunction(layerA, layerB, nameA, nameB)`.
        // By default, it sorts layers alphabetically by their name.
        sortFunction: function(s, l, h, f) {
          return h < f ? -1 : f < h ? 1 : 0;
        }
      },
      initialize: function(s, l, h) {
        w(this, h), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
        for (var f in s)
          this._addLayer(s[f], f);
        for (f in l)
          this._addLayer(l[f], f, !0);
      },
      onAdd: function(s) {
        this._initLayout(), this._update(), this._map = s, s.on("zoomend", this._checkDisabledLayers, this);
        for (var l = 0; l < this._layers.length; l++)
          this._layers[l].layer.on("add remove", this._onLayerChange, this);
        return this._container;
      },
      addTo: function(s) {
        return Ke.prototype.addTo.call(this, s), this._expandIfNotCollapsed();
      },
      onRemove: function() {
        this._map.off("zoomend", this._checkDisabledLayers, this);
        for (var s = 0; s < this._layers.length; s++)
          this._layers[s].layer.off("add remove", this._onLayerChange, this);
      },
      // @method addBaseLayer(layer: Layer, name: String): this
      // Adds a base layer (radio button entry) with the given name to the control.
      addBaseLayer: function(s, l) {
        return this._addLayer(s, l), this._map ? this._update() : this;
      },
      // @method addOverlay(layer: Layer, name: String): this
      // Adds an overlay (checkbox entry) with the given name to the control.
      addOverlay: function(s, l) {
        return this._addLayer(s, l, !0), this._map ? this._update() : this;
      },
      // @method removeLayer(layer: Layer): this
      // Remove the given layer from the control.
      removeLayer: function(s) {
        s.off("add remove", this._onLayerChange, this);
        var l = this._getLayer(u(s));
        return l && this._layers.splice(this._layers.indexOf(l), 1), this._map ? this._update() : this;
      },
      // @method expand(): this
      // Expand the control container if collapsed.
      expand: function() {
        ct(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
        var s = this._map.getSize().y - (this._container.offsetTop + 50);
        return s < this._section.clientHeight ? (ct(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = s + "px") : Ft(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
      },
      // @method collapse(): this
      // Collapse the control container if expanded.
      collapse: function() {
        return Ft(this._container, "leaflet-control-layers-expanded"), this;
      },
      _initLayout: function() {
        var s = "leaflet-control-layers", l = this._container = vt("div", s), h = this.options.collapsed;
        l.setAttribute("aria-haspopup", !0), tr(l), rc(l);
        var f = this._section = vt("section", s + "-list");
        h && (this._map.on("click", this.collapse, this), lt(l, {
          mouseenter: this._expandSafely,
          mouseleave: this.collapse
        }, this));
        var _ = this._layersLink = vt("a", s + "-toggle", l);
        _.href = "#", _.title = "Layers", _.setAttribute("role", "button"), lt(_, {
          keydown: function(x) {
            x.keyCode === 13 && this._expandSafely();
          },
          // Certain screen readers intercept the key event and instead send a click event
          click: function(x) {
            ie(x), this._expandSafely();
          }
        }, this), h || this.expand(), this._baseLayersList = vt("div", s + "-base", f), this._separator = vt("div", s + "-separator", f), this._overlaysList = vt("div", s + "-overlays", f), l.appendChild(f);
      },
      _getLayer: function(s) {
        for (var l = 0; l < this._layers.length; l++)
          if (this._layers[l] && u(this._layers[l].layer) === s)
            return this._layers[l];
      },
      _addLayer: function(s, l, h) {
        this._map && s.on("add remove", this._onLayerChange, this), this._layers.push({
          layer: s,
          name: l,
          overlay: h
        }), this.options.sortLayers && this._layers.sort(a(function(f, _) {
          return this.options.sortFunction(f.layer, _.layer, f.name, _.name);
        }, this)), this.options.autoZIndex && s.setZIndex && (this._lastZIndex++, s.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
      },
      _update: function() {
        if (!this._container)
          return this;
        Po(this._baseLayersList), Po(this._overlaysList), this._layerControlInputs = [];
        var s, l, h, f, _ = 0;
        for (h = 0; h < this._layers.length; h++)
          f = this._layers[h], this._addItem(f), l = l || f.overlay, s = s || !f.overlay, _ += f.overlay ? 0 : 1;
        return this.options.hideSingleBase && (s = s && _ > 1, this._baseLayersList.style.display = s ? "" : "none"), this._separator.style.display = l && s ? "" : "none", this;
      },
      _onLayerChange: function(s) {
        this._handlingClick || this._update();
        var l = this._getLayer(u(s.target)), h = l.overlay ? s.type === "add" ? "overlayadd" : "overlayremove" : s.type === "add" ? "baselayerchange" : null;
        h && this._map.fire(h, l);
      },
      // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
      _createRadioElement: function(s, l) {
        var h = '<input type="radio" class="leaflet-control-layers-selector" name="' + s + '"' + (l ? ' checked="checked"' : "") + "/>", f = document.createElement("div");
        return f.innerHTML = h, f.firstChild;
      },
      _addItem: function(s) {
        var l = document.createElement("label"), h = this._map.hasLayer(s.layer), f;
        s.overlay ? (f = document.createElement("input"), f.type = "checkbox", f.className = "leaflet-control-layers-selector", f.defaultChecked = h) : f = this._createRadioElement("leaflet-base-layers_" + u(this), h), this._layerControlInputs.push(f), f.layerId = u(s.layer), lt(f, "click", this._onInputClick, this);
        var _ = document.createElement("span");
        _.innerHTML = " " + s.name;
        var x = document.createElement("span");
        l.appendChild(x), x.appendChild(f), x.appendChild(_);
        var C = s.overlay ? this._overlaysList : this._baseLayersList;
        return C.appendChild(l), this._checkDisabledLayers(), l;
      },
      _onInputClick: function() {
        if (!this._preventClick) {
          var s = this._layerControlInputs, l, h, f = [], _ = [];
          this._handlingClick = !0;
          for (var x = s.length - 1; x >= 0; x--)
            l = s[x], h = this._getLayer(l.layerId).layer, l.checked ? f.push(h) : l.checked || _.push(h);
          for (x = 0; x < _.length; x++)
            this._map.hasLayer(_[x]) && this._map.removeLayer(_[x]);
          for (x = 0; x < f.length; x++)
            this._map.hasLayer(f[x]) || this._map.addLayer(f[x]);
          this._handlingClick = !1, this._refocusOnMap();
        }
      },
      _checkDisabledLayers: function() {
        for (var s = this._layerControlInputs, l, h, f = this._map.getZoom(), _ = s.length - 1; _ >= 0; _--)
          l = s[_], h = this._getLayer(l.layerId).layer, l.disabled = h.options.minZoom !== void 0 && f < h.options.minZoom || h.options.maxZoom !== void 0 && f > h.options.maxZoom;
      },
      _expandIfNotCollapsed: function() {
        return this._map && !this.options.collapsed && this.expand(), this;
      },
      _expandSafely: function() {
        var s = this._section;
        this._preventClick = !0, lt(s, "click", ie), this.expand();
        var l = this;
        setTimeout(function() {
          Mt(s, "click", ie), l._preventClick = !1;
        });
      }
    }), h0 = function(s, l, h) {
      return new qd(s, l, h);
    }, ac = Ke.extend({
      // @section
      // @aka Control.Zoom options
      options: {
        position: "topleft",
        // @option zoomInText: String = '<span aria-hidden="true">+</span>'
        // The text set on the 'zoom in' button.
        zoomInText: '<span aria-hidden="true">+</span>',
        // @option zoomInTitle: String = 'Zoom in'
        // The title set on the 'zoom in' button.
        zoomInTitle: "Zoom in",
        // @option zoomOutText: String = '<span aria-hidden="true">&#x2212;</span>'
        // The text set on the 'zoom out' button.
        zoomOutText: '<span aria-hidden="true">&#x2212;</span>',
        // @option zoomOutTitle: String = 'Zoom out'
        // The title set on the 'zoom out' button.
        zoomOutTitle: "Zoom out"
      },
      onAdd: function(s) {
        var l = "leaflet-control-zoom", h = vt("div", l + " leaflet-bar"), f = this.options;
        return this._zoomInButton = this._createButton(
          f.zoomInText,
          f.zoomInTitle,
          l + "-in",
          h,
          this._zoomIn
        ), this._zoomOutButton = this._createButton(
          f.zoomOutText,
          f.zoomOutTitle,
          l + "-out",
          h,
          this._zoomOut
        ), this._updateDisabled(), s.on("zoomend zoomlevelschange", this._updateDisabled, this), h;
      },
      onRemove: function(s) {
        s.off("zoomend zoomlevelschange", this._updateDisabled, this);
      },
      disable: function() {
        return this._disabled = !0, this._updateDisabled(), this;
      },
      enable: function() {
        return this._disabled = !1, this._updateDisabled(), this;
      },
      _zoomIn: function(s) {
        !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (s.shiftKey ? 3 : 1));
      },
      _zoomOut: function(s) {
        !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (s.shiftKey ? 3 : 1));
      },
      _createButton: function(s, l, h, f, _) {
        var x = vt("a", h, f);
        return x.innerHTML = s, x.href = "#", x.title = l, x.setAttribute("role", "button"), x.setAttribute("aria-label", l), tr(x), lt(x, "click", bi), lt(x, "click", _, this), lt(x, "click", this._refocusOnMap, this), x;
      },
      _updateDisabled: function() {
        var s = this._map, l = "leaflet-disabled";
        Ft(this._zoomInButton, l), Ft(this._zoomOutButton, l), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || s._zoom === s.getMinZoom()) && (ct(this._zoomOutButton, l), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || s._zoom === s.getMaxZoom()) && (ct(this._zoomInButton, l), this._zoomInButton.setAttribute("aria-disabled", "true"));
      }
    });
    gt.mergeOptions({
      zoomControl: !0
    }), gt.addInitHook(function() {
      this.options.zoomControl && (this.zoomControl = new ac(), this.addControl(this.zoomControl));
    });
    var d0 = function(s) {
      return new ac(s);
    }, Kd = Ke.extend({
      // @section
      // @aka Control.Scale options
      options: {
        position: "bottomleft",
        // @option maxWidth: Number = 100
        // Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500).
        maxWidth: 100,
        // @option metric: Boolean = True
        // Whether to show the metric scale line (m/km).
        metric: !0,
        // @option imperial: Boolean = True
        // Whether to show the imperial scale line (mi/ft).
        imperial: !0
        // @option updateWhenIdle: Boolean = false
        // If `true`, the control is updated on [`moveend`](#map-moveend), otherwise it's always up-to-date (updated on [`move`](#map-move)).
      },
      onAdd: function(s) {
        var l = "leaflet-control-scale", h = vt("div", l), f = this.options;
        return this._addScales(f, l + "-line", h), s.on(f.updateWhenIdle ? "moveend" : "move", this._update, this), s.whenReady(this._update, this), h;
      },
      onRemove: function(s) {
        s.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
      },
      _addScales: function(s, l, h) {
        s.metric && (this._mScale = vt("div", l, h)), s.imperial && (this._iScale = vt("div", l, h));
      },
      _update: function() {
        var s = this._map, l = s.getSize().y / 2, h = s.distance(
          s.containerPointToLatLng([0, l]),
          s.containerPointToLatLng([this.options.maxWidth, l])
        );
        this._updateScales(h);
      },
      _updateScales: function(s) {
        this.options.metric && s && this._updateMetric(s), this.options.imperial && s && this._updateImperial(s);
      },
      _updateMetric: function(s) {
        var l = this._getRoundNum(s), h = l < 1e3 ? l + " m" : l / 1e3 + " km";
        this._updateScale(this._mScale, h, l / s);
      },
      _updateImperial: function(s) {
        var l = s * 3.2808399, h, f, _;
        l > 5280 ? (h = l / 5280, f = this._getRoundNum(h), this._updateScale(this._iScale, f + " mi", f / h)) : (_ = this._getRoundNum(l), this._updateScale(this._iScale, _ + " ft", _ / l));
      },
      _updateScale: function(s, l, h) {
        s.style.width = Math.round(this.options.maxWidth * h) + "px", s.innerHTML = l;
      },
      _getRoundNum: function(s) {
        var l = Math.pow(10, (Math.floor(s) + "").length - 1), h = s / l;
        return h = h >= 10 ? 10 : h >= 5 ? 5 : h >= 3 ? 3 : h >= 2 ? 2 : 1, l * h;
      }
    }), f0 = function(s) {
      return new Kd(s);
    }, p0 = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', lc = Ke.extend({
      // @section
      // @aka Control.Attribution options
      options: {
        position: "bottomright",
        // @option prefix: String|false = 'Leaflet'
        // The HTML text shown before the attributions. Pass `false` to disable.
        prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (Q.inlineSvg ? p0 + " " : "") + "Leaflet</a>"
      },
      initialize: function(s) {
        w(this, s), this._attributions = {};
      },
      onAdd: function(s) {
        s.attributionControl = this, this._container = vt("div", "leaflet-control-attribution"), tr(this._container);
        for (var l in s._layers)
          s._layers[l].getAttribution && this.addAttribution(s._layers[l].getAttribution());
        return this._update(), s.on("layeradd", this._addAttribution, this), this._container;
      },
      onRemove: function(s) {
        s.off("layeradd", this._addAttribution, this);
      },
      _addAttribution: function(s) {
        s.layer.getAttribution && (this.addAttribution(s.layer.getAttribution()), s.layer.once("remove", function() {
          this.removeAttribution(s.layer.getAttribution());
        }, this));
      },
      // @method setPrefix(prefix: String|false): this
      // The HTML text shown before the attributions. Pass `false` to disable.
      setPrefix: function(s) {
        return this.options.prefix = s, this._update(), this;
      },
      // @method addAttribution(text: String): this
      // Adds an attribution text (e.g. `'&copy; OpenStreetMap contributors'`).
      addAttribution: function(s) {
        return s ? (this._attributions[s] || (this._attributions[s] = 0), this._attributions[s]++, this._update(), this) : this;
      },
      // @method removeAttribution(text: String): this
      // Removes an attribution text.
      removeAttribution: function(s) {
        return s ? (this._attributions[s] && (this._attributions[s]--, this._update()), this) : this;
      },
      _update: function() {
        if (this._map) {
          var s = [];
          for (var l in this._attributions)
            this._attributions[l] && s.push(l);
          var h = [];
          this.options.prefix && h.push(this.options.prefix), s.length && h.push(s.join(", ")), this._container.innerHTML = h.join(' <span aria-hidden="true">|</span> ');
        }
      }
    });
    gt.mergeOptions({
      attributionControl: !0
    }), gt.addInitHook(function() {
      this.options.attributionControl && new lc().addTo(this);
    });
    var m0 = function(s) {
      return new lc(s);
    };
    Ke.Layers = qd, Ke.Zoom = ac, Ke.Scale = Kd, Ke.Attribution = lc, er.layers = h0, er.zoom = d0, er.scale = f0, er.attribution = m0;
    var ln = $.extend({
      initialize: function(s) {
        this._map = s;
      },
      // @method enable(): this
      // Enables the handler
      enable: function() {
        return this._enabled ? this : (this._enabled = !0, this.addHooks(), this);
      },
      // @method disable(): this
      // Disables the handler
      disable: function() {
        return this._enabled ? (this._enabled = !1, this.removeHooks(), this) : this;
      },
      // @method enabled(): Boolean
      // Returns `true` if the handler is enabled
      enabled: function() {
        return !!this._enabled;
      }
      // @section Extension methods
      // Classes inheriting from `Handler` must implement the two following methods:
      // @method addHooks()
      // Called when the handler is enabled, should add event hooks.
      // @method removeHooks()
      // Called when the handler is disabled, should remove the event hooks added previously.
    });
    ln.addTo = function(s, l) {
      return s.addHandler(l, this), this;
    };
    var g0 = { Events: X }, Xd = Q.touch ? "touchstart mousedown" : "mousedown", Wn = ht.extend({
      options: {
        // @section
        // @aka Draggable options
        // @option clickTolerance: Number = 3
        // The max number of pixels a user can shift the mouse pointer during a click
        // for it to be considered a valid click (as opposed to a mouse drag).
        clickTolerance: 3
      },
      // @constructor L.Draggable(el: HTMLElement, dragHandle?: HTMLElement, preventOutline?: Boolean, options?: Draggable options)
      // Creates a `Draggable` object for moving `el` when you start dragging the `dragHandle` element (equals `el` itself by default).
      initialize: function(s, l, h, f) {
        w(this, f), this._element = s, this._dragStartTarget = l || s, this._preventOutline = h;
      },
      // @method enable()
      // Enables the dragging ability
      enable: function() {
        this._enabled || (lt(this._dragStartTarget, Xd, this._onDown, this), this._enabled = !0);
      },
      // @method disable()
      // Disables the dragging ability
      disable: function() {
        this._enabled && (Wn._dragging === this && this.finishDrag(!0), Mt(this._dragStartTarget, Xd, this._onDown, this), this._enabled = !1, this._moved = !1);
      },
      _onDown: function(s) {
        if (this._enabled && (this._moved = !1, !ql(this._element, "leaflet-zoom-anim"))) {
          if (s.touches && s.touches.length !== 1) {
            Wn._dragging === this && this.finishDrag();
            return;
          }
          if (!(Wn._dragging || s.shiftKey || s.which !== 1 && s.button !== 1 && !s.touches) && (Wn._dragging = this, this._preventOutline && tc(this._element), Gl(), Gs(), !this._moving)) {
            this.fire("down");
            var l = s.touches ? s.touches[0] : s, h = Wd(this._element);
            this._startPoint = new I(l.clientX, l.clientY), this._startPos = xi(this._element), this._parentScale = ec(h);
            var f = s.type === "mousedown";
            lt(document, f ? "mousemove" : "touchmove", this._onMove, this), lt(document, f ? "mouseup" : "touchend touchcancel", this._onUp, this);
          }
        }
      },
      _onMove: function(s) {
        if (this._enabled) {
          if (s.touches && s.touches.length > 1) {
            this._moved = !0;
            return;
          }
          var l = s.touches && s.touches.length === 1 ? s.touches[0] : s, h = new I(l.clientX, l.clientY)._subtract(this._startPoint);
          !h.x && !h.y || Math.abs(h.x) + Math.abs(h.y) < this.options.clickTolerance || (h.x /= this._parentScale.x, h.y /= this._parentScale.y, ie(s), this._moved || (this.fire("dragstart"), this._moved = !0, ct(document.body, "leaflet-dragging"), this._lastTarget = s.target || s.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), ct(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(h), this._moving = !0, this._lastEvent = s, this._updatePosition());
        }
      },
      _updatePosition: function() {
        var s = { originalEvent: this._lastEvent };
        this.fire("predrag", s), Zt(this._element, this._newPos), this.fire("drag", s);
      },
      _onUp: function() {
        this._enabled && this.finishDrag();
      },
      finishDrag: function(s) {
        Ft(document.body, "leaflet-dragging"), this._lastTarget && (Ft(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), Mt(document, "mousemove touchmove", this._onMove, this), Mt(document, "mouseup touchend touchcancel", this._onUp, this), Ql(), Qs();
        var l = this._moved && this._moving;
        this._moving = !1, Wn._dragging = !1, l && this.fire("dragend", {
          noInertia: s,
          distance: this._newPos.distanceTo(this._startPos)
        });
      }
    });
    function Gd(s, l, h) {
      var f, _ = [1, 4, 2, 8], x, C, E, z, R, Z, nt, ft;
      for (x = 0, Z = s.length; x < Z; x++)
        s[x]._code = ki(s[x], l);
      for (E = 0; E < 4; E++) {
        for (nt = _[E], f = [], x = 0, Z = s.length, C = Z - 1; x < Z; C = x++)
          z = s[x], R = s[C], z._code & nt ? R._code & nt || (ft = No(R, z, nt, l, h), ft._code = ki(ft, l), f.push(ft)) : (R._code & nt && (ft = No(R, z, nt, l, h), ft._code = ki(ft, l), f.push(ft)), f.push(z));
        s = f;
      }
      return s;
    }
    function Qd(s, l) {
      var h, f, _, x, C, E, z, R, Z;
      if (!s || s.length === 0)
        throw new Error("latlngs not passed");
      Be(s) || (console.warn("latlngs are not flat! Only the first ring will be used"), s = s[0]);
      var nt = G([0, 0]), ft = dt(s), pe = ft.getNorthWest().distanceTo(ft.getSouthWest()) * ft.getNorthEast().distanceTo(ft.getNorthWest());
      pe < 1700 && (nt = cc(s));
      var Jt = s.length, He = [];
      for (h = 0; h < Jt; h++) {
        var ye = G(s[h]);
        He.push(l.project(G([ye.lat - nt.lat, ye.lng - nt.lng])));
      }
      for (E = z = R = 0, h = 0, f = Jt - 1; h < Jt; f = h++)
        _ = He[h], x = He[f], C = _.y * x.x - x.y * _.x, z += (_.x + x.x) * C, R += (_.y + x.y) * C, E += C * 3;
      E === 0 ? Z = He[0] : Z = [z / E, R / E];
      var rs = l.unproject(D(Z));
      return G([rs.lat + nt.lat, rs.lng + nt.lng]);
    }
    function cc(s) {
      for (var l = 0, h = 0, f = 0, _ = 0; _ < s.length; _++) {
        var x = G(s[_]);
        l += x.lat, h += x.lng, f++;
      }
      return G([l / f, h / f]);
    }
    var _0 = {
      __proto__: null,
      clipPolygon: Gd,
      polygonCenter: Qd,
      centroid: cc
    };
    function Jd(s, l) {
      if (!l || !s.length)
        return s.slice();
      var h = l * l;
      return s = x0(s, h), s = y0(s, h), s;
    }
    function tf(s, l, h) {
      return Math.sqrt(nr(s, l, h, !0));
    }
    function v0(s, l, h) {
      return nr(s, l, h);
    }
    function y0(s, l) {
      var h = s.length, f = typeof Uint8Array < "u" ? Uint8Array : Array, _ = new f(h);
      _[0] = _[h - 1] = 1, uc(s, _, l, 0, h - 1);
      var x, C = [];
      for (x = 0; x < h; x++)
        _[x] && C.push(s[x]);
      return C;
    }
    function uc(s, l, h, f, _) {
      var x = 0, C, E, z;
      for (E = f + 1; E <= _ - 1; E++)
        z = nr(s[E], s[f], s[_], !0), z > x && (C = E, x = z);
      x > h && (l[C] = 1, uc(s, l, h, f, C), uc(s, l, h, C, _));
    }
    function x0(s, l) {
      for (var h = [s[0]], f = 1, _ = 0, x = s.length; f < x; f++)
        w0(s[f], s[_]) > l && (h.push(s[f]), _ = f);
      return _ < x - 1 && h.push(s[x - 1]), h;
    }
    var ef;
    function nf(s, l, h, f, _) {
      var x = f ? ef : ki(s, h), C = ki(l, h), E, z, R;
      for (ef = C; ; ) {
        if (!(x | C))
          return [s, l];
        if (x & C)
          return !1;
        E = x || C, z = No(s, l, E, h, _), R = ki(z, h), E === x ? (s = z, x = R) : (l = z, C = R);
      }
    }
    function No(s, l, h, f, _) {
      var x = l.x - s.x, C = l.y - s.y, E = f.min, z = f.max, R, Z;
      return h & 8 ? (R = s.x + x * (z.y - s.y) / C, Z = z.y) : h & 4 ? (R = s.x + x * (E.y - s.y) / C, Z = E.y) : h & 2 ? (R = z.x, Z = s.y + C * (z.x - s.x) / x) : h & 1 && (R = E.x, Z = s.y + C * (E.x - s.x) / x), new I(R, Z, _);
    }
    function ki(s, l) {
      var h = 0;
      return s.x < l.min.x ? h |= 1 : s.x > l.max.x && (h |= 2), s.y < l.min.y ? h |= 4 : s.y > l.max.y && (h |= 8), h;
    }
    function w0(s, l) {
      var h = l.x - s.x, f = l.y - s.y;
      return h * h + f * f;
    }
    function nr(s, l, h, f) {
      var _ = l.x, x = l.y, C = h.x - _, E = h.y - x, z = C * C + E * E, R;
      return z > 0 && (R = ((s.x - _) * C + (s.y - x) * E) / z, R > 1 ? (_ = h.x, x = h.y) : R > 0 && (_ += C * R, x += E * R)), C = s.x - _, E = s.y - x, f ? C * C + E * E : new I(_, x);
    }
    function Be(s) {
      return !P(s[0]) || typeof s[0][0] != "object" && typeof s[0][0] < "u";
    }
    function sf(s) {
      return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), Be(s);
    }
    function rf(s, l) {
      var h, f, _, x, C, E, z, R;
      if (!s || s.length === 0)
        throw new Error("latlngs not passed");
      Be(s) || (console.warn("latlngs are not flat! Only the first ring will be used"), s = s[0]);
      var Z = G([0, 0]), nt = dt(s), ft = nt.getNorthWest().distanceTo(nt.getSouthWest()) * nt.getNorthEast().distanceTo(nt.getNorthWest());
      ft < 1700 && (Z = cc(s));
      var pe = s.length, Jt = [];
      for (h = 0; h < pe; h++) {
        var He = G(s[h]);
        Jt.push(l.project(G([He.lat - Z.lat, He.lng - Z.lng])));
      }
      for (h = 0, f = 0; h < pe - 1; h++)
        f += Jt[h].distanceTo(Jt[h + 1]) / 2;
      if (f === 0)
        R = Jt[0];
      else
        for (h = 0, x = 0; h < pe - 1; h++)
          if (C = Jt[h], E = Jt[h + 1], _ = C.distanceTo(E), x += _, x > f) {
            z = (x - f) / _, R = [
              E.x - z * (E.x - C.x),
              E.y - z * (E.y - C.y)
            ];
            break;
          }
      var ye = l.unproject(D(R));
      return G([ye.lat + Z.lat, ye.lng + Z.lng]);
    }
    var b0 = {
      __proto__: null,
      simplify: Jd,
      pointToSegmentDistance: tf,
      closestPointOnSegment: v0,
      clipSegment: nf,
      _getEdgeIntersection: No,
      _getBitCode: ki,
      _sqClosestPointOnSegment: nr,
      isFlat: Be,
      _flat: sf,
      polylineCenter: rf
    }, hc = {
      project: function(s) {
        return new I(s.lng, s.lat);
      },
      unproject: function(s) {
        return new at(s.y, s.x);
      },
      bounds: new tt([-180, -90], [180, 90])
    }, dc = {
      R: 6378137,
      R_MINOR: 6356752314245179e-9,
      bounds: new tt([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
      project: function(s) {
        var l = Math.PI / 180, h = this.R, f = s.lat * l, _ = this.R_MINOR / h, x = Math.sqrt(1 - _ * _), C = x * Math.sin(f), E = Math.tan(Math.PI / 4 - f / 2) / Math.pow((1 - C) / (1 + C), x / 2);
        return f = -h * Math.log(Math.max(E, 1e-10)), new I(s.lng * l * h, f);
      },
      unproject: function(s) {
        for (var l = 180 / Math.PI, h = this.R, f = this.R_MINOR / h, _ = Math.sqrt(1 - f * f), x = Math.exp(-s.y / h), C = Math.PI / 2 - 2 * Math.atan(x), E = 0, z = 0.1, R; E < 15 && Math.abs(z) > 1e-7; E++)
          R = _ * Math.sin(C), R = Math.pow((1 - R) / (1 + R), _ / 2), z = Math.PI / 2 - 2 * Math.atan(x * R) - C, C += z;
        return new at(C * l, s.x * l / h);
      }
    }, k0 = {
      __proto__: null,
      LonLat: hc,
      Mercator: dc,
      SphericalMercator: Us
    }, S0 = r({}, fe, {
      code: "EPSG:3395",
      projection: dc,
      transformation: function() {
        var s = 0.5 / (Math.PI * dc.R);
        return Bn(s, 0.5, -s, 0.5);
      }()
    }), of = r({}, fe, {
      code: "EPSG:4326",
      projection: hc,
      transformation: Bn(1 / 180, 1, -1 / 180, 0.5)
    }), P0 = r({}, Dt, {
      projection: hc,
      transformation: Bn(1, 0, -1, 0),
      scale: function(s) {
        return Math.pow(2, s);
      },
      zoom: function(s) {
        return Math.log(s) / Math.LN2;
      },
      distance: function(s, l) {
        var h = l.lng - s.lng, f = l.lat - s.lat;
        return Math.sqrt(h * h + f * f);
      },
      infinite: !0
    });
    Dt.Earth = fe, Dt.EPSG3395 = S0, Dt.EPSG3857 = Ki, Dt.EPSG900913 = wo, Dt.EPSG4326 = of, Dt.Simple = P0;
    var Xe = ht.extend({
      // Classes extending `L.Layer` will inherit the following options:
      options: {
        // @option pane: String = 'overlayPane'
        // By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
        pane: "overlayPane",
        // @option attribution: String = null
        // String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers.
        attribution: null,
        bubblingMouseEvents: !0
      },
      /* @section
       * Classes extending `L.Layer` will inherit the following methods:
       *
       * @method addTo(map: Map|LayerGroup): this
       * Adds the layer to the given map or layer group.
       */
      addTo: function(s) {
        return s.addLayer(this), this;
      },
      // @method remove: this
      // Removes the layer from the map it is currently active on.
      remove: function() {
        return this.removeFrom(this._map || this._mapToAdd);
      },
      // @method removeFrom(map: Map): this
      // Removes the layer from the given map
      //
      // @alternative
      // @method removeFrom(group: LayerGroup): this
      // Removes the layer from the given `LayerGroup`
      removeFrom: function(s) {
        return s && s.removeLayer(this), this;
      },
      // @method getPane(name? : String): HTMLElement
      // Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
      getPane: function(s) {
        return this._map.getPane(s ? this.options[s] || s : this.options.pane);
      },
      addInteractiveTarget: function(s) {
        return this._map._targets[u(s)] = this, this;
      },
      removeInteractiveTarget: function(s) {
        return delete this._map._targets[u(s)], this;
      },
      // @method getAttribution: String
      // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
      getAttribution: function() {
        return this.options.attribution;
      },
      _layerAdd: function(s) {
        var l = s.target;
        if (l.hasLayer(this)) {
          if (this._map = l, this._zoomAnimated = l._zoomAnimated, this.getEvents) {
            var h = this.getEvents();
            l.on(h, this), this.once("remove", function() {
              l.off(h, this);
            }, this);
          }
          this.onAdd(l), this.fire("add"), l.fire("layeradd", { layer: this });
        }
      }
    });
    gt.include({
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the map
      addLayer: function(s) {
        if (!s._layerAdd)
          throw new Error("The provided object is not a Layer.");
        var l = u(s);
        return this._layers[l] ? this : (this._layers[l] = s, s._mapToAdd = this, s.beforeAdd && s.beforeAdd(this), this.whenReady(s._layerAdd, s), this);
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the map.
      removeLayer: function(s) {
        var l = u(s);
        return this._layers[l] ? (this._loaded && s.onRemove(this), delete this._layers[l], this._loaded && (this.fire("layerremove", { layer: s }), s.fire("remove")), s._map = s._mapToAdd = null, this) : this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the map
      hasLayer: function(s) {
        return u(s) in this._layers;
      },
      /* @method eachLayer(fn: Function, context?: Object): this
       * Iterates over the layers of the map, optionally specifying context of the iterator function.
       * ```
       * map.eachLayer(function(layer){
       *     layer.bindPopup('Hello');
       * });
       * ```
       */
      eachLayer: function(s, l) {
        for (var h in this._layers)
          s.call(l, this._layers[h]);
        return this;
      },
      _addLayers: function(s) {
        s = s ? P(s) ? s : [s] : [];
        for (var l = 0, h = s.length; l < h; l++)
          this.addLayer(s[l]);
      },
      _addZoomLimit: function(s) {
        (!isNaN(s.options.maxZoom) || !isNaN(s.options.minZoom)) && (this._zoomBoundLayers[u(s)] = s, this._updateZoomLevels());
      },
      _removeZoomLimit: function(s) {
        var l = u(s);
        this._zoomBoundLayers[l] && (delete this._zoomBoundLayers[l], this._updateZoomLevels());
      },
      _updateZoomLevels: function() {
        var s = 1 / 0, l = -1 / 0, h = this._getZoomSpan();
        for (var f in this._zoomBoundLayers) {
          var _ = this._zoomBoundLayers[f].options;
          s = _.minZoom === void 0 ? s : Math.min(s, _.minZoom), l = _.maxZoom === void 0 ? l : Math.max(l, _.maxZoom);
        }
        this._layersMaxZoom = l === -1 / 0 ? void 0 : l, this._layersMinZoom = s === 1 / 0 ? void 0 : s, h !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
      }
    });
    var ts = Xe.extend({
      initialize: function(s, l) {
        w(this, l), this._layers = {};
        var h, f;
        if (s)
          for (h = 0, f = s.length; h < f; h++)
            this.addLayer(s[h]);
      },
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the group.
      addLayer: function(s) {
        var l = this.getLayerId(s);
        return this._layers[l] = s, this._map && this._map.addLayer(s), this;
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the group.
      // @alternative
      // @method removeLayer(id: Number): this
      // Removes the layer with the given internal ID from the group.
      removeLayer: function(s) {
        var l = s in this._layers ? s : this.getLayerId(s);
        return this._map && this._layers[l] && this._map.removeLayer(this._layers[l]), delete this._layers[l], this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the group.
      // @alternative
      // @method hasLayer(id: Number): Boolean
      // Returns `true` if the given internal ID is currently added to the group.
      hasLayer: function(s) {
        var l = typeof s == "number" ? s : this.getLayerId(s);
        return l in this._layers;
      },
      // @method clearLayers(): this
      // Removes all the layers from the group.
      clearLayers: function() {
        return this.eachLayer(this.removeLayer, this);
      },
      // @method invoke(methodName: String, …): this
      // Calls `methodName` on every layer contained in this group, passing any
      // additional parameters. Has no effect if the layers contained do not
      // implement `methodName`.
      invoke: function(s) {
        var l = Array.prototype.slice.call(arguments, 1), h, f;
        for (h in this._layers)
          f = this._layers[h], f[s] && f[s].apply(f, l);
        return this;
      },
      onAdd: function(s) {
        this.eachLayer(s.addLayer, s);
      },
      onRemove: function(s) {
        this.eachLayer(s.removeLayer, s);
      },
      // @method eachLayer(fn: Function, context?: Object): this
      // Iterates over the layers of the group, optionally specifying context of the iterator function.
      // ```js
      // group.eachLayer(function (layer) {
      // 	layer.bindPopup('Hello');
      // });
      // ```
      eachLayer: function(s, l) {
        for (var h in this._layers)
          s.call(l, this._layers[h]);
        return this;
      },
      // @method getLayer(id: Number): Layer
      // Returns the layer with the given internal ID.
      getLayer: function(s) {
        return this._layers[s];
      },
      // @method getLayers(): Layer[]
      // Returns an array of all the layers added to the group.
      getLayers: function() {
        var s = [];
        return this.eachLayer(s.push, s), s;
      },
      // @method setZIndex(zIndex: Number): this
      // Calls `setZIndex` on every layer contained in this group, passing the z-index.
      setZIndex: function(s) {
        return this.invoke("setZIndex", s);
      },
      // @method getLayerId(layer: Layer): Number
      // Returns the internal ID for a layer
      getLayerId: function(s) {
        return u(s);
      }
    }), M0 = function(s, l) {
      return new ts(s, l);
    }, xn = ts.extend({
      addLayer: function(s) {
        return this.hasLayer(s) ? this : (s.addEventParent(this), ts.prototype.addLayer.call(this, s), this.fire("layeradd", { layer: s }));
      },
      removeLayer: function(s) {
        return this.hasLayer(s) ? (s in this._layers && (s = this._layers[s]), s.removeEventParent(this), ts.prototype.removeLayer.call(this, s), this.fire("layerremove", { layer: s })) : this;
      },
      // @method setStyle(style: Path options): this
      // Sets the given path options to each layer of the group that has a `setStyle` method.
      setStyle: function(s) {
        return this.invoke("setStyle", s);
      },
      // @method bringToFront(): this
      // Brings the layer group to the top of all other layers
      bringToFront: function() {
        return this.invoke("bringToFront");
      },
      // @method bringToBack(): this
      // Brings the layer group to the back of all other layers
      bringToBack: function() {
        return this.invoke("bringToBack");
      },
      // @method getBounds(): LatLngBounds
      // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
      getBounds: function() {
        var s = new St();
        for (var l in this._layers) {
          var h = this._layers[l];
          s.extend(h.getBounds ? h.getBounds() : h.getLatLng());
        }
        return s;
      }
    }), C0 = function(s, l) {
      return new xn(s, l);
    }, es = $.extend({
      /* @section
       * @aka Icon options
       *
       * @option iconUrl: String = null
       * **(required)** The URL to the icon image (absolute or relative to your script path).
       *
       * @option iconRetinaUrl: String = null
       * The URL to a retina sized version of the icon image (absolute or relative to your
       * script path). Used for Retina screen devices.
       *
       * @option iconSize: Point = null
       * Size of the icon image in pixels.
       *
       * @option iconAnchor: Point = null
       * The coordinates of the "tip" of the icon (relative to its top left corner). The icon
       * will be aligned so that this point is at the marker's geographical location. Centered
       * by default if size is specified, also can be set in CSS with negative margins.
       *
       * @option popupAnchor: Point = [0, 0]
       * The coordinates of the point from which popups will "open", relative to the icon anchor.
       *
       * @option tooltipAnchor: Point = [0, 0]
       * The coordinates of the point from which tooltips will "open", relative to the icon anchor.
       *
       * @option shadowUrl: String = null
       * The URL to the icon shadow image. If not specified, no shadow image will be created.
       *
       * @option shadowRetinaUrl: String = null
       *
       * @option shadowSize: Point = null
       * Size of the shadow image in pixels.
       *
       * @option shadowAnchor: Point = null
       * The coordinates of the "tip" of the shadow (relative to its top left corner) (the same
       * as iconAnchor if not specified).
       *
       * @option className: String = ''
       * A custom class name to assign to both icon and shadow images. Empty by default.
       */
      options: {
        popupAnchor: [0, 0],
        tooltipAnchor: [0, 0],
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1
      },
      initialize: function(s) {
        w(this, s);
      },
      // @method createIcon(oldIcon?: HTMLElement): HTMLElement
      // Called internally when the icon has to be shown, returns a `<img>` HTML element
      // styled according to the options.
      createIcon: function(s) {
        return this._createIcon("icon", s);
      },
      // @method createShadow(oldIcon?: HTMLElement): HTMLElement
      // As `createIcon`, but for the shadow beneath it.
      createShadow: function(s) {
        return this._createIcon("shadow", s);
      },
      _createIcon: function(s, l) {
        var h = this._getIconUrl(s);
        if (!h) {
          if (s === "icon")
            throw new Error("iconUrl not set in Icon options (see the docs).");
          return null;
        }
        var f = this._createImg(h, l && l.tagName === "IMG" ? l : null);
        return this._setIconStyles(f, s), (this.options.crossOrigin || this.options.crossOrigin === "") && (f.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), f;
      },
      _setIconStyles: function(s, l) {
        var h = this.options, f = h[l + "Size"];
        typeof f == "number" && (f = [f, f]);
        var _ = D(f), x = D(l === "shadow" && h.shadowAnchor || h.iconAnchor || _ && _.divideBy(2, !0));
        s.className = "leaflet-marker-" + l + " " + (h.className || ""), x && (s.style.marginLeft = -x.x + "px", s.style.marginTop = -x.y + "px"), _ && (s.style.width = _.x + "px", s.style.height = _.y + "px");
      },
      _createImg: function(s, l) {
        return l = l || document.createElement("img"), l.src = s, l;
      },
      _getIconUrl: function(s) {
        return Q.retina && this.options[s + "RetinaUrl"] || this.options[s + "Url"];
      }
    });
    function L0(s) {
      return new es(s);
    }
    var ir = es.extend({
      options: {
        iconUrl: "marker-icon.png",
        iconRetinaUrl: "marker-icon-2x.png",
        shadowUrl: "marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      },
      _getIconUrl: function(s) {
        return typeof ir.imagePath != "string" && (ir.imagePath = this._detectIconPath()), (this.options.imagePath || ir.imagePath) + es.prototype._getIconUrl.call(this, s);
      },
      _stripUrl: function(s) {
        var l = function(h, f, _) {
          var x = f.exec(h);
          return x && x[_];
        };
        return s = l(s, /^url\((['"])?(.+)\1\)$/, 2), s && l(s, /^(.*)marker-icon\.png$/, 1);
      },
      _detectIconPath: function() {
        var s = vt("div", "leaflet-default-icon-path", document.body), l = Xs(s, "background-image") || Xs(s, "backgroundImage");
        if (document.body.removeChild(s), l = this._stripUrl(l), l)
          return l;
        var h = document.querySelector('link[href$="leaflet.css"]');
        return h ? h.href.substring(0, h.href.length - 11 - 1) : "";
      }
    }), af = ln.extend({
      initialize: function(s) {
        this._marker = s;
      },
      addHooks: function() {
        var s = this._marker._icon;
        this._draggable || (this._draggable = new Wn(s, s, !0)), this._draggable.on({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).enable(), ct(s, "leaflet-marker-draggable");
      },
      removeHooks: function() {
        this._draggable.off({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).disable(), this._marker._icon && Ft(this._marker._icon, "leaflet-marker-draggable");
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      _adjustPan: function(s) {
        var l = this._marker, h = l._map, f = this._marker.options.autoPanSpeed, _ = this._marker.options.autoPanPadding, x = xi(l._icon), C = h.getPixelBounds(), E = h.getPixelOrigin(), z = ot(
          C.min._subtract(E).add(_),
          C.max._subtract(E).subtract(_)
        );
        if (!z.contains(x)) {
          var R = D(
            (Math.max(z.max.x, x.x) - z.max.x) / (C.max.x - z.max.x) - (Math.min(z.min.x, x.x) - z.min.x) / (C.min.x - z.min.x),
            (Math.max(z.max.y, x.y) - z.max.y) / (C.max.y - z.max.y) - (Math.min(z.min.y, x.y) - z.min.y) / (C.min.y - z.min.y)
          ).multiplyBy(f);
          h.panBy(R, { animate: !1 }), this._draggable._newPos._add(R), this._draggable._startPos._add(R), Zt(l._icon, this._draggable._newPos), this._onDrag(s), this._panRequest = V(this._adjustPan.bind(this, s));
        }
      },
      _onDragStart: function() {
        this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
      },
      _onPreDrag: function(s) {
        this._marker.options.autoPan && (K(this._panRequest), this._panRequest = V(this._adjustPan.bind(this, s)));
      },
      _onDrag: function(s) {
        var l = this._marker, h = l._shadow, f = xi(l._icon), _ = l._map.layerPointToLatLng(f);
        h && Zt(h, f), l._latlng = _, s.latlng = _, s.oldLatLng = this._oldLatLng, l.fire("move", s).fire("drag", s);
      },
      _onDragEnd: function(s) {
        K(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", s);
      }
    }), Eo = Xe.extend({
      // @section
      // @aka Marker options
      options: {
        // @option icon: Icon = *
        // Icon instance to use for rendering the marker.
        // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
        // If not specified, a common instance of `L.Icon.Default` is used.
        icon: new ir(),
        // Option inherited from "Interactive layer" abstract class
        interactive: !0,
        // @option keyboard: Boolean = true
        // Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.
        keyboard: !0,
        // @option title: String = ''
        // Text for the browser tooltip that appear on marker hover (no tooltip by default).
        // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
        title: "",
        // @option alt: String = 'Marker'
        // Text for the `alt` attribute of the icon image.
        // [Useful for accessibility](https://leafletjs.com/examples/accessibility/#markers-must-be-labelled).
        alt: "Marker",
        // @option zIndexOffset: Number = 0
        // By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
        zIndexOffset: 0,
        // @option opacity: Number = 1.0
        // The opacity of the marker.
        opacity: 1,
        // @option riseOnHover: Boolean = false
        // If `true`, the marker will get on top of others when you hover the mouse over it.
        riseOnHover: !1,
        // @option riseOffset: Number = 250
        // The z-index offset used for the `riseOnHover` feature.
        riseOffset: 250,
        // @option pane: String = 'markerPane'
        // `Map pane` where the markers icon will be added.
        pane: "markerPane",
        // @option shadowPane: String = 'shadowPane'
        // `Map pane` where the markers shadow will be added.
        shadowPane: "shadowPane",
        // @option bubblingMouseEvents: Boolean = false
        // When `true`, a mouse event on this marker will trigger the same event on the map
        // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
        bubblingMouseEvents: !1,
        // @option autoPanOnFocus: Boolean = true
        // When `true`, the map will pan whenever the marker is focused (via
        // e.g. pressing `tab` on the keyboard) to ensure the marker is
        // visible within the map's bounds
        autoPanOnFocus: !0,
        // @section Draggable marker options
        // @option draggable: Boolean = false
        // Whether the marker is draggable with mouse/touch or not.
        draggable: !1,
        // @option autoPan: Boolean = false
        // Whether to pan the map when dragging this marker near its edge or not.
        autoPan: !1,
        // @option autoPanPadding: Point = Point(50, 50)
        // Distance (in pixels to the left/right and to the top/bottom) of the
        // map edge to start panning the map.
        autoPanPadding: [50, 50],
        // @option autoPanSpeed: Number = 10
        // Number of pixels the map should pan by.
        autoPanSpeed: 10
      },
      /* @section
       *
       * In addition to [shared layer methods](#Layer) like `addTo()` and `remove()` and [popup methods](#Popup) like bindPopup() you can also use the following methods:
       */
      initialize: function(s, l) {
        w(this, l), this._latlng = G(s);
      },
      onAdd: function(s) {
        this._zoomAnimated = this._zoomAnimated && s.options.markerZoomAnimation, this._zoomAnimated && s.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update();
      },
      onRemove: function(s) {
        this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && s.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow();
      },
      getEvents: function() {
        return {
          zoom: this.update,
          viewreset: this.update
        };
      },
      // @method getLatLng: LatLng
      // Returns the current geographical position of the marker.
      getLatLng: function() {
        return this._latlng;
      },
      // @method setLatLng(latlng: LatLng): this
      // Changes the marker position to the given point.
      setLatLng: function(s) {
        var l = this._latlng;
        return this._latlng = G(s), this.update(), this.fire("move", { oldLatLng: l, latlng: this._latlng });
      },
      // @method setZIndexOffset(offset: Number): this
      // Changes the [zIndex offset](#marker-zindexoffset) of the marker.
      setZIndexOffset: function(s) {
        return this.options.zIndexOffset = s, this.update();
      },
      // @method getIcon: Icon
      // Returns the current icon used by the marker
      getIcon: function() {
        return this.options.icon;
      },
      // @method setIcon(icon: Icon): this
      // Changes the marker icon.
      setIcon: function(s) {
        return this.options.icon = s, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this;
      },
      getElement: function() {
        return this._icon;
      },
      update: function() {
        if (this._icon && this._map) {
          var s = this._map.latLngToLayerPoint(this._latlng).round();
          this._setPos(s);
        }
        return this;
      },
      _initIcon: function() {
        var s = this.options, l = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), h = s.icon.createIcon(this._icon), f = !1;
        h !== this._icon && (this._icon && this._removeIcon(), f = !0, s.title && (h.title = s.title), h.tagName === "IMG" && (h.alt = s.alt || "")), ct(h, l), s.keyboard && (h.tabIndex = "0", h.setAttribute("role", "button")), this._icon = h, s.riseOnHover && this.on({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && lt(h, "focus", this._panOnFocus, this);
        var _ = s.icon.createShadow(this._shadow), x = !1;
        _ !== this._shadow && (this._removeShadow(), x = !0), _ && (ct(_, l), _.alt = ""), this._shadow = _, s.opacity < 1 && this._updateOpacity(), f && this.getPane().appendChild(this._icon), this._initInteraction(), _ && x && this.getPane(s.shadowPane).appendChild(this._shadow);
      },
      _removeIcon: function() {
        this.options.riseOnHover && this.off({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && Mt(this._icon, "focus", this._panOnFocus, this), zt(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
      },
      _removeShadow: function() {
        this._shadow && zt(this._shadow), this._shadow = null;
      },
      _setPos: function(s) {
        this._icon && Zt(this._icon, s), this._shadow && Zt(this._shadow, s), this._zIndex = s.y + this.options.zIndexOffset, this._resetZIndex();
      },
      _updateZIndex: function(s) {
        this._icon && (this._icon.style.zIndex = this._zIndex + s);
      },
      _animateZoom: function(s) {
        var l = this._map._latLngToNewLayerPoint(this._latlng, s.zoom, s.center).round();
        this._setPos(l);
      },
      _initInteraction: function() {
        if (this.options.interactive && (ct(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), af)) {
          var s = this.options.draggable;
          this.dragging && (s = this.dragging.enabled(), this.dragging.disable()), this.dragging = new af(this), s && this.dragging.enable();
        }
      },
      // @method setOpacity(opacity: Number): this
      // Changes the opacity of the marker.
      setOpacity: function(s) {
        return this.options.opacity = s, this._map && this._updateOpacity(), this;
      },
      _updateOpacity: function() {
        var s = this.options.opacity;
        this._icon && Fe(this._icon, s), this._shadow && Fe(this._shadow, s);
      },
      _bringToFront: function() {
        this._updateZIndex(this.options.riseOffset);
      },
      _resetZIndex: function() {
        this._updateZIndex(0);
      },
      _panOnFocus: function() {
        var s = this._map;
        if (s) {
          var l = this.options.icon.options, h = l.iconSize ? D(l.iconSize) : D(0, 0), f = l.iconAnchor ? D(l.iconAnchor) : D(0, 0);
          s.panInside(this._latlng, {
            paddingTopLeft: f,
            paddingBottomRight: h.subtract(f)
          });
        }
      },
      _getPopupAnchor: function() {
        return this.options.icon.options.popupAnchor;
      },
      _getTooltipAnchor: function() {
        return this.options.icon.options.tooltipAnchor;
      }
    });
    function T0(s, l) {
      return new Eo(s, l);
    }
    var Vn = Xe.extend({
      // @section
      // @aka Path options
      options: {
        // @option stroke: Boolean = true
        // Whether to draw stroke along the path. Set it to `false` to disable borders on polygons or circles.
        stroke: !0,
        // @option color: String = '#3388ff'
        // Stroke color
        color: "#3388ff",
        // @option weight: Number = 3
        // Stroke width in pixels
        weight: 3,
        // @option opacity: Number = 1.0
        // Stroke opacity
        opacity: 1,
        // @option lineCap: String= 'round'
        // A string that defines [shape to be used at the end](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) of the stroke.
        lineCap: "round",
        // @option lineJoin: String = 'round'
        // A string that defines [shape to be used at the corners](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linejoin) of the stroke.
        lineJoin: "round",
        // @option dashArray: String = null
        // A string that defines the stroke [dash pattern](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dasharray). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
        dashArray: null,
        // @option dashOffset: String = null
        // A string that defines the [distance into the dash pattern to start the dash](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-dashoffset). Doesn't work on `Canvas`-powered layers in [some old browsers](https://developer.mozilla.org/docs/Web/API/CanvasRenderingContext2D/setLineDash#Browser_compatibility).
        dashOffset: null,
        // @option fill: Boolean = depends
        // Whether to fill the path with color. Set it to `false` to disable filling on polygons or circles.
        fill: !1,
        // @option fillColor: String = *
        // Fill color. Defaults to the value of the [`color`](#path-color) option
        fillColor: null,
        // @option fillOpacity: Number = 0.2
        // Fill opacity.
        fillOpacity: 0.2,
        // @option fillRule: String = 'evenodd'
        // A string that defines [how the inside of a shape](https://developer.mozilla.org/docs/Web/SVG/Attribute/fill-rule) is determined.
        fillRule: "evenodd",
        // className: '',
        // Option inherited from "Interactive layer" abstract class
        interactive: !0,
        // @option bubblingMouseEvents: Boolean = true
        // When `true`, a mouse event on this path will trigger the same event on the map
        // (unless [`L.DomEvent.stopPropagation`](#domevent-stoppropagation) is used).
        bubblingMouseEvents: !0
      },
      beforeAdd: function(s) {
        this._renderer = s.getRenderer(this);
      },
      onAdd: function() {
        this._renderer._initPath(this), this._reset(), this._renderer._addPath(this);
      },
      onRemove: function() {
        this._renderer._removePath(this);
      },
      // @method redraw(): this
      // Redraws the layer. Sometimes useful after you changed the coordinates that the path uses.
      redraw: function() {
        return this._map && this._renderer._updatePath(this), this;
      },
      // @method setStyle(style: Path options): this
      // Changes the appearance of a Path based on the options in the `Path options` object.
      setStyle: function(s) {
        return w(this, s), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && s && Object.prototype.hasOwnProperty.call(s, "weight") && this._updateBounds()), this;
      },
      // @method bringToFront(): this
      // Brings the layer to the top of all path layers.
      bringToFront: function() {
        return this._renderer && this._renderer._bringToFront(this), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all path layers.
      bringToBack: function() {
        return this._renderer && this._renderer._bringToBack(this), this;
      },
      getElement: function() {
        return this._path;
      },
      _reset: function() {
        this._project(), this._update();
      },
      _clickTolerance: function() {
        return (this.options.stroke ? this.options.weight / 2 : 0) + (this._renderer.options.tolerance || 0);
      }
    }), zo = Vn.extend({
      // @section
      // @aka CircleMarker options
      options: {
        fill: !0,
        // @option radius: Number = 10
        // Radius of the circle marker, in pixels
        radius: 10
      },
      initialize: function(s, l) {
        w(this, l), this._latlng = G(s), this._radius = this.options.radius;
      },
      // @method setLatLng(latLng: LatLng): this
      // Sets the position of a circle marker to a new location.
      setLatLng: function(s) {
        var l = this._latlng;
        return this._latlng = G(s), this.redraw(), this.fire("move", { oldLatLng: l, latlng: this._latlng });
      },
      // @method getLatLng(): LatLng
      // Returns the current geographical position of the circle marker
      getLatLng: function() {
        return this._latlng;
      },
      // @method setRadius(radius: Number): this
      // Sets the radius of a circle marker. Units are in pixels.
      setRadius: function(s) {
        return this.options.radius = this._radius = s, this.redraw();
      },
      // @method getRadius(): Number
      // Returns the current radius of the circle
      getRadius: function() {
        return this._radius;
      },
      setStyle: function(s) {
        var l = s && s.radius || this._radius;
        return Vn.prototype.setStyle.call(this, s), this.setRadius(l), this;
      },
      _project: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
      },
      _updateBounds: function() {
        var s = this._radius, l = this._radiusY || s, h = this._clickTolerance(), f = [s + h, l + h];
        this._pxBounds = new tt(this._point.subtract(f), this._point.add(f));
      },
      _update: function() {
        this._map && this._updatePath();
      },
      _updatePath: function() {
        this._renderer._updateCircle(this);
      },
      _empty: function() {
        return this._radius && !this._renderer._bounds.intersects(this._pxBounds);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(s) {
        return s.distanceTo(this._point) <= this._radius + this._clickTolerance();
      }
    });
    function N0(s, l) {
      return new zo(s, l);
    }
    var fc = zo.extend({
      initialize: function(s, l, h) {
        if (typeof l == "number" && (l = r({}, h, { radius: l })), w(this, l), this._latlng = G(s), isNaN(this.options.radius))
          throw new Error("Circle radius cannot be NaN");
        this._mRadius = this.options.radius;
      },
      // @method setRadius(radius: Number): this
      // Sets the radius of a circle. Units are in meters.
      setRadius: function(s) {
        return this._mRadius = s, this.redraw();
      },
      // @method getRadius(): Number
      // Returns the current radius of a circle. Units are in meters.
      getRadius: function() {
        return this._mRadius;
      },
      // @method getBounds(): LatLngBounds
      // Returns the `LatLngBounds` of the path.
      getBounds: function() {
        var s = [this._radius, this._radiusY || this._radius];
        return new St(
          this._map.layerPointToLatLng(this._point.subtract(s)),
          this._map.layerPointToLatLng(this._point.add(s))
        );
      },
      setStyle: Vn.prototype.setStyle,
      _project: function() {
        var s = this._latlng.lng, l = this._latlng.lat, h = this._map, f = h.options.crs;
        if (f.distance === fe.distance) {
          var _ = Math.PI / 180, x = this._mRadius / fe.R / _, C = h.project([l + x, s]), E = h.project([l - x, s]), z = C.add(E).divideBy(2), R = h.unproject(z).lat, Z = Math.acos((Math.cos(x * _) - Math.sin(l * _) * Math.sin(R * _)) / (Math.cos(l * _) * Math.cos(R * _))) / _;
          (isNaN(Z) || Z === 0) && (Z = x / Math.cos(Math.PI / 180 * l)), this._point = z.subtract(h.getPixelOrigin()), this._radius = isNaN(Z) ? 0 : z.x - h.project([R, s - Z]).x, this._radiusY = z.y - C.y;
        } else {
          var nt = f.unproject(f.project(this._latlng).subtract([this._mRadius, 0]));
          this._point = h.latLngToLayerPoint(this._latlng), this._radius = this._point.x - h.latLngToLayerPoint(nt).x;
        }
        this._updateBounds();
      }
    });
    function E0(s, l, h) {
      return new fc(s, l, h);
    }
    var wn = Vn.extend({
      // @section
      // @aka Polyline options
      options: {
        // @option smoothFactor: Number = 1.0
        // How much to simplify the polyline on each zoom level. More means
        // better performance and smoother look, and less means more accurate representation.
        smoothFactor: 1,
        // @option noClip: Boolean = false
        // Disable polyline clipping.
        noClip: !1
      },
      initialize: function(s, l) {
        w(this, l), this._setLatLngs(s);
      },
      // @method getLatLngs(): LatLng[]
      // Returns an array of the points in the path, or nested arrays of points in case of multi-polyline.
      getLatLngs: function() {
        return this._latlngs;
      },
      // @method setLatLngs(latlngs: LatLng[]): this
      // Replaces all the points in the polyline with the given array of geographical points.
      setLatLngs: function(s) {
        return this._setLatLngs(s), this.redraw();
      },
      // @method isEmpty(): Boolean
      // Returns `true` if the Polyline has no LatLngs.
      isEmpty: function() {
        return !this._latlngs.length;
      },
      // @method closestLayerPoint(p: Point): Point
      // Returns the point closest to `p` on the Polyline.
      closestLayerPoint: function(s) {
        for (var l = 1 / 0, h = null, f = nr, _, x, C = 0, E = this._parts.length; C < E; C++)
          for (var z = this._parts[C], R = 1, Z = z.length; R < Z; R++) {
            _ = z[R - 1], x = z[R];
            var nt = f(s, _, x, !0);
            nt < l && (l = nt, h = f(s, _, x));
          }
        return h && (h.distance = Math.sqrt(l)), h;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return rf(this._defaultShape(), this._map.options.crs);
      },
      // @method getBounds(): LatLngBounds
      // Returns the `LatLngBounds` of the path.
      getBounds: function() {
        return this._bounds;
      },
      // @method addLatLng(latlng: LatLng, latlngs?: LatLng[]): this
      // Adds a given point to the polyline. By default, adds to the first ring of
      // the polyline in case of a multi-polyline, but can be overridden by passing
      // a specific ring as a LatLng array (that you can earlier access with [`getLatLngs`](#polyline-getlatlngs)).
      addLatLng: function(s, l) {
        return l = l || this._defaultShape(), s = G(s), l.push(s), this._bounds.extend(s), this.redraw();
      },
      _setLatLngs: function(s) {
        this._bounds = new St(), this._latlngs = this._convertLatLngs(s);
      },
      _defaultShape: function() {
        return Be(this._latlngs) ? this._latlngs : this._latlngs[0];
      },
      // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
      _convertLatLngs: function(s) {
        for (var l = [], h = Be(s), f = 0, _ = s.length; f < _; f++)
          h ? (l[f] = G(s[f]), this._bounds.extend(l[f])) : l[f] = this._convertLatLngs(s[f]);
        return l;
      },
      _project: function() {
        var s = new tt();
        this._rings = [], this._projectLatlngs(this._latlngs, this._rings, s), this._bounds.isValid() && s.isValid() && (this._rawPxBounds = s, this._updateBounds());
      },
      _updateBounds: function() {
        var s = this._clickTolerance(), l = new I(s, s);
        this._rawPxBounds && (this._pxBounds = new tt([
          this._rawPxBounds.min.subtract(l),
          this._rawPxBounds.max.add(l)
        ]));
      },
      // recursively turns latlngs into a set of rings with projected coordinates
      _projectLatlngs: function(s, l, h) {
        var f = s[0] instanceof at, _ = s.length, x, C;
        if (f) {
          for (C = [], x = 0; x < _; x++)
            C[x] = this._map.latLngToLayerPoint(s[x]), h.extend(C[x]);
          l.push(C);
        } else
          for (x = 0; x < _; x++)
            this._projectLatlngs(s[x], l, h);
      },
      // clip polyline by renderer bounds so that we have less to render for performance
      _clipPoints: function() {
        var s = this._renderer._bounds;
        if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(s))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          var l = this._parts, h, f, _, x, C, E, z;
          for (h = 0, _ = 0, x = this._rings.length; h < x; h++)
            for (z = this._rings[h], f = 0, C = z.length; f < C - 1; f++)
              E = nf(z[f], z[f + 1], s, f, !0), E && (l[_] = l[_] || [], l[_].push(E[0]), (E[1] !== z[f + 1] || f === C - 2) && (l[_].push(E[1]), _++));
        }
      },
      // simplify each clipped part of the polyline for performance
      _simplifyPoints: function() {
        for (var s = this._parts, l = this.options.smoothFactor, h = 0, f = s.length; h < f; h++)
          s[h] = Jd(s[h], l);
      },
      _update: function() {
        this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
      },
      _updatePath: function() {
        this._renderer._updatePoly(this);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(s, l) {
        var h, f, _, x, C, E, z = this._clickTolerance();
        if (!this._pxBounds || !this._pxBounds.contains(s))
          return !1;
        for (h = 0, x = this._parts.length; h < x; h++)
          for (E = this._parts[h], f = 0, C = E.length, _ = C - 1; f < C; _ = f++)
            if (!(!l && f === 0) && tf(s, E[_], E[f]) <= z)
              return !0;
        return !1;
      }
    });
    function z0(s, l) {
      return new wn(s, l);
    }
    wn._flat = sf;
    var ns = wn.extend({
      options: {
        fill: !0
      },
      isEmpty: function() {
        return !this._latlngs.length || !this._latlngs[0].length;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](http://en.wikipedia.org/wiki/Centroid)) of the Polygon.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return Qd(this._defaultShape(), this._map.options.crs);
      },
      _convertLatLngs: function(s) {
        var l = wn.prototype._convertLatLngs.call(this, s), h = l.length;
        return h >= 2 && l[0] instanceof at && l[0].equals(l[h - 1]) && l.pop(), l;
      },
      _setLatLngs: function(s) {
        wn.prototype._setLatLngs.call(this, s), Be(this._latlngs) && (this._latlngs = [this._latlngs]);
      },
      _defaultShape: function() {
        return Be(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
      },
      _clipPoints: function() {
        var s = this._renderer._bounds, l = this.options.weight, h = new I(l, l);
        if (s = new tt(s.min.subtract(h), s.max.add(h)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(s))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var f = 0, _ = this._rings.length, x; f < _; f++)
            x = Gd(this._rings[f], s, !0), x.length && this._parts.push(x);
        }
      },
      _updatePath: function() {
        this._renderer._updatePoly(this, !0);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(s) {
        var l = !1, h, f, _, x, C, E, z, R;
        if (!this._pxBounds || !this._pxBounds.contains(s))
          return !1;
        for (x = 0, z = this._parts.length; x < z; x++)
          for (h = this._parts[x], C = 0, R = h.length, E = R - 1; C < R; E = C++)
            f = h[C], _ = h[E], f.y > s.y != _.y > s.y && s.x < (_.x - f.x) * (s.y - f.y) / (_.y - f.y) + f.x && (l = !l);
        return l || wn.prototype._containsPoint.call(this, s, !0);
      }
    });
    function j0(s, l) {
      return new ns(s, l);
    }
    var bn = xn.extend({
      /* @section
       * @aka GeoJSON options
       *
       * @option pointToLayer: Function = *
       * A `Function` defining how GeoJSON points spawn Leaflet layers. It is internally
       * called when data is added, passing the GeoJSON point feature and its `LatLng`.
       * The default is to spawn a default `Marker`:
       * ```js
       * function(geoJsonPoint, latlng) {
       * 	return L.marker(latlng);
       * }
       * ```
       *
       * @option style: Function = *
       * A `Function` defining the `Path options` for styling GeoJSON lines and polygons,
       * called internally when data is added.
       * The default value is to not override any defaults:
       * ```js
       * function (geoJsonFeature) {
       * 	return {}
       * }
       * ```
       *
       * @option onEachFeature: Function = *
       * A `Function` that will be called once for each created `Feature`, after it has
       * been created and styled. Useful for attaching events and popups to features.
       * The default is to do nothing with the newly created layers:
       * ```js
       * function (feature, layer) {}
       * ```
       *
       * @option filter: Function = *
       * A `Function` that will be used to decide whether to include a feature or not.
       * The default is to include all features:
       * ```js
       * function (geoJsonFeature) {
       * 	return true;
       * }
       * ```
       * Note: dynamically changing the `filter` option will have effect only on newly
       * added data. It will _not_ re-evaluate already included features.
       *
       * @option coordsToLatLng: Function = *
       * A `Function` that will be used for converting GeoJSON coordinates to `LatLng`s.
       * The default is the `coordsToLatLng` static method.
       *
       * @option markersInheritOptions: Boolean = false
       * Whether default Markers for "Point" type Features inherit from group options.
       */
      initialize: function(s, l) {
        w(this, l), this._layers = {}, s && this.addData(s);
      },
      // @method addData( <GeoJSON> data ): this
      // Adds a GeoJSON object to the layer.
      addData: function(s) {
        var l = P(s) ? s : s.features, h, f, _;
        if (l) {
          for (h = 0, f = l.length; h < f; h++)
            _ = l[h], (_.geometries || _.geometry || _.features || _.coordinates) && this.addData(_);
          return this;
        }
        var x = this.options;
        if (x.filter && !x.filter(s))
          return this;
        var C = jo(s, x);
        return C ? (C.feature = Io(s), C.defaultOptions = C.options, this.resetStyle(C), x.onEachFeature && x.onEachFeature(s, C), this.addLayer(C)) : this;
      },
      // @method resetStyle( <Path> layer? ): this
      // Resets the given vector layer's style to the original GeoJSON style, useful for resetting style after hover events.
      // If `layer` is omitted, the style of all features in the current layer is reset.
      resetStyle: function(s) {
        return s === void 0 ? this.eachLayer(this.resetStyle, this) : (s.options = r({}, s.defaultOptions), this._setLayerStyle(s, this.options.style), this);
      },
      // @method setStyle( <Function> style ): this
      // Changes styles of GeoJSON vector layers with the given style function.
      setStyle: function(s) {
        return this.eachLayer(function(l) {
          this._setLayerStyle(l, s);
        }, this);
      },
      _setLayerStyle: function(s, l) {
        s.setStyle && (typeof l == "function" && (l = l(s.feature)), s.setStyle(l));
      }
    });
    function jo(s, l) {
      var h = s.type === "Feature" ? s.geometry : s, f = h ? h.coordinates : null, _ = [], x = l && l.pointToLayer, C = l && l.coordsToLatLng || pc, E, z, R, Z;
      if (!f && !h)
        return null;
      switch (h.type) {
        case "Point":
          return E = C(f), lf(x, s, E, l);
        case "MultiPoint":
          for (R = 0, Z = f.length; R < Z; R++)
            E = C(f[R]), _.push(lf(x, s, E, l));
          return new xn(_);
        case "LineString":
        case "MultiLineString":
          return z = Oo(f, h.type === "LineString" ? 0 : 1, C), new wn(z, l);
        case "Polygon":
        case "MultiPolygon":
          return z = Oo(f, h.type === "Polygon" ? 1 : 2, C), new ns(z, l);
        case "GeometryCollection":
          for (R = 0, Z = h.geometries.length; R < Z; R++) {
            var nt = jo({
              geometry: h.geometries[R],
              type: "Feature",
              properties: s.properties
            }, l);
            nt && _.push(nt);
          }
          return new xn(_);
        case "FeatureCollection":
          for (R = 0, Z = h.features.length; R < Z; R++) {
            var ft = jo(h.features[R], l);
            ft && _.push(ft);
          }
          return new xn(_);
        default:
          throw new Error("Invalid GeoJSON object.");
      }
    }
    function lf(s, l, h, f) {
      return s ? s(l, h) : new Eo(h, f && f.markersInheritOptions && f);
    }
    function pc(s) {
      return new at(s[1], s[0], s[2]);
    }
    function Oo(s, l, h) {
      for (var f = [], _ = 0, x = s.length, C; _ < x; _++)
        C = l ? Oo(s[_], l - 1, h) : (h || pc)(s[_]), f.push(C);
      return f;
    }
    function mc(s, l) {
      return s = G(s), s.alt !== void 0 ? [v(s.lng, l), v(s.lat, l), v(s.alt, l)] : [v(s.lng, l), v(s.lat, l)];
    }
    function Ao(s, l, h, f) {
      for (var _ = [], x = 0, C = s.length; x < C; x++)
        _.push(l ? Ao(s[x], Be(s[x]) ? 0 : l - 1, h, f) : mc(s[x], f));
      return !l && h && _.length > 0 && _.push(_[0].slice()), _;
    }
    function is(s, l) {
      return s.feature ? r({}, s.feature, { geometry: l }) : Io(l);
    }
    function Io(s) {
      return s.type === "Feature" || s.type === "FeatureCollection" ? s : {
        type: "Feature",
        properties: {},
        geometry: s
      };
    }
    var gc = {
      toGeoJSON: function(s) {
        return is(this, {
          type: "Point",
          coordinates: mc(this.getLatLng(), s)
        });
      }
    };
    Eo.include(gc), fc.include(gc), zo.include(gc), wn.include({
      toGeoJSON: function(s) {
        var l = !Be(this._latlngs), h = Ao(this._latlngs, l ? 1 : 0, !1, s);
        return is(this, {
          type: (l ? "Multi" : "") + "LineString",
          coordinates: h
        });
      }
    }), ns.include({
      toGeoJSON: function(s) {
        var l = !Be(this._latlngs), h = l && !Be(this._latlngs[0]), f = Ao(this._latlngs, h ? 2 : l ? 1 : 0, !0, s);
        return l || (f = [f]), is(this, {
          type: (h ? "Multi" : "") + "Polygon",
          coordinates: f
        });
      }
    }), ts.include({
      toMultiPoint: function(s) {
        var l = [];
        return this.eachLayer(function(h) {
          l.push(h.toGeoJSON(s).geometry.coordinates);
        }), is(this, {
          type: "MultiPoint",
          coordinates: l
        });
      },
      // @method toGeoJSON(precision?: Number|false): Object
      // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
      // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
      toGeoJSON: function(s) {
        var l = this.feature && this.feature.geometry && this.feature.geometry.type;
        if (l === "MultiPoint")
          return this.toMultiPoint(s);
        var h = l === "GeometryCollection", f = [];
        return this.eachLayer(function(_) {
          if (_.toGeoJSON) {
            var x = _.toGeoJSON(s);
            if (h)
              f.push(x.geometry);
            else {
              var C = Io(x);
              C.type === "FeatureCollection" ? f.push.apply(f, C.features) : f.push(C);
            }
          }
        }), h ? is(this, {
          geometries: f,
          type: "GeometryCollection"
        }) : {
          type: "FeatureCollection",
          features: f
        };
      }
    });
    function cf(s, l) {
      return new bn(s, l);
    }
    var O0 = cf, Ro = Xe.extend({
      // @section
      // @aka ImageOverlay options
      options: {
        // @option opacity: Number = 1.0
        // The opacity of the image overlay.
        opacity: 1,
        // @option alt: String = ''
        // Text for the `alt` attribute of the image (useful for accessibility).
        alt: "",
        // @option interactive: Boolean = false
        // If `true`, the image overlay will emit [mouse events](#interactive-layer) when clicked or hovered.
        interactive: !1,
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the image.
        // If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1,
        // @option errorOverlayUrl: String = ''
        // URL to the overlay image to show in place of the overlay that failed to load.
        errorOverlayUrl: "",
        // @option zIndex: Number = 1
        // The explicit [zIndex](https://developer.mozilla.org/docs/Web/CSS/CSS_Positioning/Understanding_z_index) of the overlay layer.
        zIndex: 1,
        // @option className: String = ''
        // A custom class name to assign to the image. Empty by default.
        className: ""
      },
      initialize: function(s, l, h) {
        this._url = s, this._bounds = dt(l), w(this, h);
      },
      onAdd: function() {
        this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (ct(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
      },
      onRemove: function() {
        zt(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
      },
      // @method setOpacity(opacity: Number): this
      // Sets the opacity of the overlay.
      setOpacity: function(s) {
        return this.options.opacity = s, this._image && this._updateOpacity(), this;
      },
      setStyle: function(s) {
        return s.opacity && this.setOpacity(s.opacity), this;
      },
      // @method bringToFront(): this
      // Brings the layer to the top of all overlays.
      bringToFront: function() {
        return this._map && Qi(this._image), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all overlays.
      bringToBack: function() {
        return this._map && Ji(this._image), this;
      },
      // @method setUrl(url: String): this
      // Changes the URL of the image.
      setUrl: function(s) {
        return this._url = s, this._image && (this._image.src = s), this;
      },
      // @method setBounds(bounds: LatLngBounds): this
      // Update the bounds that this ImageOverlay covers
      setBounds: function(s) {
        return this._bounds = dt(s), this._map && this._reset(), this;
      },
      getEvents: function() {
        var s = {
          zoom: this._reset,
          viewreset: this._reset
        };
        return this._zoomAnimated && (s.zoomanim = this._animateZoom), s;
      },
      // @method setZIndex(value: Number): this
      // Changes the [zIndex](#imageoverlay-zindex) of the image overlay.
      setZIndex: function(s) {
        return this.options.zIndex = s, this._updateZIndex(), this;
      },
      // @method getBounds(): LatLngBounds
      // Get the bounds that this ImageOverlay covers
      getBounds: function() {
        return this._bounds;
      },
      // @method getElement(): HTMLElement
      // Returns the instance of [`HTMLImageElement`](https://developer.mozilla.org/docs/Web/API/HTMLImageElement)
      // used by this overlay.
      getElement: function() {
        return this._image;
      },
      _initImage: function() {
        var s = this._url.tagName === "IMG", l = this._image = s ? this._url : vt("img");
        if (ct(l, "leaflet-image-layer"), this._zoomAnimated && ct(l, "leaflet-zoom-animated"), this.options.className && ct(l, this.options.className), l.onselectstart = g, l.onmousemove = g, l.onload = a(this.fire, this, "load"), l.onerror = a(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (l.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), s) {
          this._url = l.src;
          return;
        }
        l.src = this._url, l.alt = this.options.alt;
      },
      _animateZoom: function(s) {
        var l = this._map.getZoomScale(s.zoom), h = this._map._latLngBoundsToNewLayerBounds(this._bounds, s.zoom, s.center).min;
        yi(this._image, h, l);
      },
      _reset: function() {
        var s = this._image, l = new tt(
          this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
          this._map.latLngToLayerPoint(this._bounds.getSouthEast())
        ), h = l.getSize();
        Zt(s, l.min), s.style.width = h.x + "px", s.style.height = h.y + "px";
      },
      _updateOpacity: function() {
        Fe(this._image, this.options.opacity);
      },
      _updateZIndex: function() {
        this._image && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._image.style.zIndex = this.options.zIndex);
      },
      _overlayOnError: function() {
        this.fire("error");
        var s = this.options.errorOverlayUrl;
        s && this._url !== s && (this._url = s, this._image.src = s);
      },
      // @method getCenter(): LatLng
      // Returns the center of the ImageOverlay.
      getCenter: function() {
        return this._bounds.getCenter();
      }
    }), A0 = function(s, l, h) {
      return new Ro(s, l, h);
    }, uf = Ro.extend({
      // @section
      // @aka VideoOverlay options
      options: {
        // @option autoplay: Boolean = true
        // Whether the video starts playing automatically when loaded.
        // On some browsers autoplay will only work with `muted: true`
        autoplay: !0,
        // @option loop: Boolean = true
        // Whether the video will loop back to the beginning when played.
        loop: !0,
        // @option keepAspectRatio: Boolean = true
        // Whether the video will save aspect ratio after the projection.
        // Relevant for supported browsers. See [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
        keepAspectRatio: !0,
        // @option muted: Boolean = false
        // Whether the video starts on mute when loaded.
        muted: !1,
        // @option playsInline: Boolean = true
        // Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.
        playsInline: !0
      },
      _initImage: function() {
        var s = this._url.tagName === "VIDEO", l = this._image = s ? this._url : vt("video");
        if (ct(l, "leaflet-image-layer"), this._zoomAnimated && ct(l, "leaflet-zoom-animated"), this.options.className && ct(l, this.options.className), l.onselectstart = g, l.onmousemove = g, l.onloadeddata = a(this.fire, this, "load"), s) {
          for (var h = l.getElementsByTagName("source"), f = [], _ = 0; _ < h.length; _++)
            f.push(h[_].src);
          this._url = h.length > 0 ? f : [l.src];
          return;
        }
        P(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(l.style, "objectFit") && (l.style.objectFit = "fill"), l.autoplay = !!this.options.autoplay, l.loop = !!this.options.loop, l.muted = !!this.options.muted, l.playsInline = !!this.options.playsInline;
        for (var x = 0; x < this._url.length; x++) {
          var C = vt("source");
          C.src = this._url[x], l.appendChild(C);
        }
      }
      // @method getElement(): HTMLVideoElement
      // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
      // used by this overlay.
    });
    function I0(s, l, h) {
      return new uf(s, l, h);
    }
    var hf = Ro.extend({
      _initImage: function() {
        var s = this._image = this._url;
        ct(s, "leaflet-image-layer"), this._zoomAnimated && ct(s, "leaflet-zoom-animated"), this.options.className && ct(s, this.options.className), s.onselectstart = g, s.onmousemove = g;
      }
      // @method getElement(): SVGElement
      // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
      // used by this overlay.
    });
    function R0(s, l, h) {
      return new hf(s, l, h);
    }
    var cn = Xe.extend({
      // @section
      // @aka DivOverlay options
      options: {
        // @option interactive: Boolean = false
        // If true, the popup/tooltip will listen to the mouse events.
        interactive: !1,
        // @option offset: Point = Point(0, 0)
        // The offset of the overlay position.
        offset: [0, 0],
        // @option className: String = ''
        // A custom CSS class name to assign to the overlay.
        className: "",
        // @option pane: String = undefined
        // `Map pane` where the overlay will be added.
        pane: void 0,
        // @option content: String|HTMLElement|Function = ''
        // Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be
        // passed to the function. The function should return a `String` or `HTMLElement` to be used in the overlay.
        content: ""
      },
      initialize: function(s, l) {
        s && (s instanceof at || P(s)) ? (this._latlng = G(s), w(this, l)) : (w(this, s), this._source = l), this.options.content && (this._content = this.options.content);
      },
      // @method openOn(map: Map): this
      // Adds the overlay to the map.
      // Alternative to `map.openPopup(popup)`/`.openTooltip(tooltip)`.
      openOn: function(s) {
        return s = arguments.length ? s : this._source._map, s.hasLayer(this) || s.addLayer(this), this;
      },
      // @method close(): this
      // Closes the overlay.
      // Alternative to `map.closePopup(popup)`/`.closeTooltip(tooltip)`
      // and `layer.closePopup()`/`.closeTooltip()`.
      close: function() {
        return this._map && this._map.removeLayer(this), this;
      },
      // @method toggle(layer?: Layer): this
      // Opens or closes the overlay bound to layer depending on its current state.
      // Argument may be omitted only for overlay bound to layer.
      // Alternative to `layer.togglePopup()`/`.toggleTooltip()`.
      toggle: function(s) {
        return this._map ? this.close() : (arguments.length ? this._source = s : s = this._source, this._prepareOpen(), this.openOn(s._map)), this;
      },
      onAdd: function(s) {
        this._zoomAnimated = s._zoomAnimated, this._container || this._initLayout(), s._fadeAnimated && Fe(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), s._fadeAnimated && Fe(this._container, 1), this.bringToFront(), this.options.interactive && (ct(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
      },
      onRemove: function(s) {
        s._fadeAnimated ? (Fe(this._container, 0), this._removeTimeout = setTimeout(a(zt, void 0, this._container), 200)) : zt(this._container), this.options.interactive && (Ft(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
      },
      // @namespace DivOverlay
      // @method getLatLng: LatLng
      // Returns the geographical point of the overlay.
      getLatLng: function() {
        return this._latlng;
      },
      // @method setLatLng(latlng: LatLng): this
      // Sets the geographical point where the overlay will open.
      setLatLng: function(s) {
        return this._latlng = G(s), this._map && (this._updatePosition(), this._adjustPan()), this;
      },
      // @method getContent: String|HTMLElement
      // Returns the content of the overlay.
      getContent: function() {
        return this._content;
      },
      // @method setContent(htmlContent: String|HTMLElement|Function): this
      // Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function.
      // The function should return a `String` or `HTMLElement` to be used in the overlay.
      setContent: function(s) {
        return this._content = s, this.update(), this;
      },
      // @method getElement: String|HTMLElement
      // Returns the HTML container of the overlay.
      getElement: function() {
        return this._container;
      },
      // @method update: null
      // Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.
      update: function() {
        this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan());
      },
      getEvents: function() {
        var s = {
          zoom: this._updatePosition,
          viewreset: this._updatePosition
        };
        return this._zoomAnimated && (s.zoomanim = this._animateZoom), s;
      },
      // @method isOpen: Boolean
      // Returns `true` when the overlay is visible on the map.
      isOpen: function() {
        return !!this._map && this._map.hasLayer(this);
      },
      // @method bringToFront: this
      // Brings this overlay in front of other overlays (in the same map pane).
      bringToFront: function() {
        return this._map && Qi(this._container), this;
      },
      // @method bringToBack: this
      // Brings this overlay to the back of other overlays (in the same map pane).
      bringToBack: function() {
        return this._map && Ji(this._container), this;
      },
      // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
      _prepareOpen: function(s) {
        var l = this._source;
        if (!l._map)
          return !1;
        if (l instanceof xn) {
          l = null;
          var h = this._source._layers;
          for (var f in h)
            if (h[f]._map) {
              l = h[f];
              break;
            }
          if (!l)
            return !1;
          this._source = l;
        }
        if (!s)
          if (l.getCenter)
            s = l.getCenter();
          else if (l.getLatLng)
            s = l.getLatLng();
          else if (l.getBounds)
            s = l.getBounds().getCenter();
          else
            throw new Error("Unable to get source layer LatLng.");
        return this.setLatLng(s), this._map && this.update(), !0;
      },
      _updateContent: function() {
        if (this._content) {
          var s = this._contentNode, l = typeof this._content == "function" ? this._content(this._source || this) : this._content;
          if (typeof l == "string")
            s.innerHTML = l;
          else {
            for (; s.hasChildNodes(); )
              s.removeChild(s.firstChild);
            s.appendChild(l);
          }
          this.fire("contentupdate");
        }
      },
      _updatePosition: function() {
        if (this._map) {
          var s = this._map.latLngToLayerPoint(this._latlng), l = D(this.options.offset), h = this._getAnchor();
          this._zoomAnimated ? Zt(this._container, s.add(h)) : l = l.add(s).add(h);
          var f = this._containerBottom = -l.y, _ = this._containerLeft = -Math.round(this._containerWidth / 2) + l.x;
          this._container.style.bottom = f + "px", this._container.style.left = _ + "px";
        }
      },
      _getAnchor: function() {
        return [0, 0];
      }
    });
    gt.include({
      _initOverlay: function(s, l, h, f) {
        var _ = l;
        return _ instanceof s || (_ = new s(f).setContent(l)), h && _.setLatLng(h), _;
      }
    }), Xe.include({
      _initOverlay: function(s, l, h, f) {
        var _ = h;
        return _ instanceof s ? (w(_, f), _._source = this) : (_ = l && !f ? l : new s(f, this), _.setContent(h)), _;
      }
    });
    var Do = cn.extend({
      // @section
      // @aka Popup options
      options: {
        // @option pane: String = 'popupPane'
        // `Map pane` where the popup will be added.
        pane: "popupPane",
        // @option offset: Point = Point(0, 7)
        // The offset of the popup position.
        offset: [0, 7],
        // @option maxWidth: Number = 300
        // Max width of the popup, in pixels.
        maxWidth: 300,
        // @option minWidth: Number = 50
        // Min width of the popup, in pixels.
        minWidth: 50,
        // @option maxHeight: Number = null
        // If set, creates a scrollable container of the given height
        // inside a popup if its content exceeds it.
        // The scrollable container can be styled using the
        // `leaflet-popup-scrolled` CSS class selector.
        maxHeight: null,
        // @option autoPan: Boolean = true
        // Set it to `false` if you don't want the map to do panning animation
        // to fit the opened popup.
        autoPan: !0,
        // @option autoPanPaddingTopLeft: Point = null
        // The margin between the popup and the top left corner of the map
        // view after autopanning was performed.
        autoPanPaddingTopLeft: null,
        // @option autoPanPaddingBottomRight: Point = null
        // The margin between the popup and the bottom right corner of the map
        // view after autopanning was performed.
        autoPanPaddingBottomRight: null,
        // @option autoPanPadding: Point = Point(5, 5)
        // Equivalent of setting both top left and bottom right autopan padding to the same value.
        autoPanPadding: [5, 5],
        // @option keepInView: Boolean = false
        // Set it to `true` if you want to prevent users from panning the popup
        // off of the screen while it is open.
        keepInView: !1,
        // @option closeButton: Boolean = true
        // Controls the presence of a close button in the popup.
        closeButton: !0,
        // @option autoClose: Boolean = true
        // Set it to `false` if you want to override the default behavior of
        // the popup closing when another popup is opened.
        autoClose: !0,
        // @option closeOnEscapeKey: Boolean = true
        // Set it to `false` if you want to override the default behavior of
        // the ESC key for closing of the popup.
        closeOnEscapeKey: !0,
        // @option closeOnClick: Boolean = *
        // Set it if you want to override the default behavior of the popup closing when user clicks
        // on the map. Defaults to the map's [`closePopupOnClick`](#map-closepopuponclick) option.
        // @option className: String = ''
        // A custom CSS class name to assign to the popup.
        className: ""
      },
      // @namespace Popup
      // @method openOn(map: Map): this
      // Alternative to `map.openPopup(popup)`.
      // Adds the popup to the map and closes the previous one.
      openOn: function(s) {
        return s = arguments.length ? s : this._source._map, !s.hasLayer(this) && s._popup && s._popup.options.autoClose && s.removeLayer(s._popup), s._popup = this, cn.prototype.openOn.call(this, s);
      },
      onAdd: function(s) {
        cn.prototype.onAdd.call(this, s), s.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof Vn || this._source.on("preclick", wi));
      },
      onRemove: function(s) {
        cn.prototype.onRemove.call(this, s), s.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof Vn || this._source.off("preclick", wi));
      },
      getEvents: function() {
        var s = cn.prototype.getEvents.call(this);
        return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (s.preclick = this.close), this.options.keepInView && (s.moveend = this._adjustPan), s;
      },
      _initLayout: function() {
        var s = "leaflet-popup", l = this._container = vt(
          "div",
          s + " " + (this.options.className || "") + " leaflet-zoom-animated"
        ), h = this._wrapper = vt("div", s + "-content-wrapper", l);
        if (this._contentNode = vt("div", s + "-content", h), tr(l), rc(this._contentNode), lt(l, "contextmenu", wi), this._tipContainer = vt("div", s + "-tip-container", l), this._tip = vt("div", s + "-tip", this._tipContainer), this.options.closeButton) {
          var f = this._closeButton = vt("a", s + "-close-button", l);
          f.setAttribute("role", "button"), f.setAttribute("aria-label", "Close popup"), f.href = "#close", f.innerHTML = '<span aria-hidden="true">&#215;</span>', lt(f, "click", function(_) {
            ie(_), this.close();
          }, this);
        }
      },
      _updateLayout: function() {
        var s = this._contentNode, l = s.style;
        l.width = "", l.whiteSpace = "nowrap";
        var h = s.offsetWidth;
        h = Math.min(h, this.options.maxWidth), h = Math.max(h, this.options.minWidth), l.width = h + 1 + "px", l.whiteSpace = "", l.height = "";
        var f = s.offsetHeight, _ = this.options.maxHeight, x = "leaflet-popup-scrolled";
        _ && f > _ ? (l.height = _ + "px", ct(s, x)) : Ft(s, x), this._containerWidth = this._container.offsetWidth;
      },
      _animateZoom: function(s) {
        var l = this._map._latLngToNewLayerPoint(this._latlng, s.zoom, s.center), h = this._getAnchor();
        Zt(this._container, l.add(h));
      },
      _adjustPan: function() {
        if (this.options.autoPan) {
          if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
            this._autopanning = !1;
            return;
          }
          var s = this._map, l = parseInt(Xs(this._container, "marginBottom"), 10) || 0, h = this._container.offsetHeight + l, f = this._containerWidth, _ = new I(this._containerLeft, -h - this._containerBottom);
          _._add(xi(this._container));
          var x = s.layerPointToContainerPoint(_), C = D(this.options.autoPanPadding), E = D(this.options.autoPanPaddingTopLeft || C), z = D(this.options.autoPanPaddingBottomRight || C), R = s.getSize(), Z = 0, nt = 0;
          x.x + f + z.x > R.x && (Z = x.x + f - R.x + z.x), x.x - Z - E.x < 0 && (Z = x.x - E.x), x.y + h + z.y > R.y && (nt = x.y + h - R.y + z.y), x.y - nt - E.y < 0 && (nt = x.y - E.y), (Z || nt) && (this.options.keepInView && (this._autopanning = !0), s.fire("autopanstart").panBy([Z, nt]));
        }
      },
      _getAnchor: function() {
        return D(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
      }
    }), D0 = function(s, l) {
      return new Do(s, l);
    };
    gt.mergeOptions({
      closePopupOnClick: !0
    }), gt.include({
      // @method openPopup(popup: Popup): this
      // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
      // @alternative
      // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
      // Creates a popup with the specified content and options and opens it in the given point on a map.
      openPopup: function(s, l, h) {
        return this._initOverlay(Do, s, l, h).openOn(this), this;
      },
      // @method closePopup(popup?: Popup): this
      // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
      closePopup: function(s) {
        return s = arguments.length ? s : this._popup, s && s.close(), this;
      }
    }), Xe.include({
      // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
      // Binds a popup to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindPopup: function(s, l) {
        return this._popup = this._initOverlay(Do, this._popup, s, l), this._popupHandlersAdded || (this.on({
          click: this._openPopup,
          keypress: this._onKeyPress,
          remove: this.closePopup,
          move: this._movePopup
        }), this._popupHandlersAdded = !0), this;
      },
      // @method unbindPopup(): this
      // Removes the popup previously bound with `bindPopup`.
      unbindPopup: function() {
        return this._popup && (this.off({
          click: this._openPopup,
          keypress: this._onKeyPress,
          remove: this.closePopup,
          move: this._movePopup
        }), this._popupHandlersAdded = !1, this._popup = null), this;
      },
      // @method openPopup(latlng?: LatLng): this
      // Opens the bound popup at the specified `latlng` or at the default popup anchor if no `latlng` is passed.
      openPopup: function(s) {
        return this._popup && (this instanceof xn || (this._popup._source = this), this._popup._prepareOpen(s || this._latlng) && this._popup.openOn(this._map)), this;
      },
      // @method closePopup(): this
      // Closes the popup bound to this layer if it is open.
      closePopup: function() {
        return this._popup && this._popup.close(), this;
      },
      // @method togglePopup(): this
      // Opens or closes the popup bound to this layer depending on its current state.
      togglePopup: function() {
        return this._popup && this._popup.toggle(this), this;
      },
      // @method isPopupOpen(): boolean
      // Returns `true` if the popup bound to this layer is currently open.
      isPopupOpen: function() {
        return this._popup ? this._popup.isOpen() : !1;
      },
      // @method setPopupContent(content: String|HTMLElement|Popup): this
      // Sets the content of the popup bound to this layer.
      setPopupContent: function(s) {
        return this._popup && this._popup.setContent(s), this;
      },
      // @method getPopup(): Popup
      // Returns the popup bound to this layer.
      getPopup: function() {
        return this._popup;
      },
      _openPopup: function(s) {
        if (!(!this._popup || !this._map)) {
          bi(s);
          var l = s.layer || s.target;
          if (this._popup._source === l && !(l instanceof Vn)) {
            this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(s.latlng);
            return;
          }
          this._popup._source = l, this.openPopup(s.latlng);
        }
      },
      _movePopup: function(s) {
        this._popup.setLatLng(s.latlng);
      },
      _onKeyPress: function(s) {
        s.originalEvent.keyCode === 13 && this._openPopup(s);
      }
    });
    var Fo = cn.extend({
      // @section
      // @aka Tooltip options
      options: {
        // @option pane: String = 'tooltipPane'
        // `Map pane` where the tooltip will be added.
        pane: "tooltipPane",
        // @option offset: Point = Point(0, 0)
        // Optional offset of the tooltip position.
        offset: [0, 0],
        // @option direction: String = 'auto'
        // Direction where to open the tooltip. Possible values are: `right`, `left`,
        // `top`, `bottom`, `center`, `auto`.
        // `auto` will dynamically switch between `right` and `left` according to the tooltip
        // position on the map.
        direction: "auto",
        // @option permanent: Boolean = false
        // Whether to open the tooltip permanently or only on mouseover.
        permanent: !1,
        // @option sticky: Boolean = false
        // If true, the tooltip will follow the mouse instead of being fixed at the feature center.
        sticky: !1,
        // @option opacity: Number = 0.9
        // Tooltip container opacity.
        opacity: 0.9
      },
      onAdd: function(s) {
        cn.prototype.onAdd.call(this, s), this.setOpacity(this.options.opacity), s.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
      },
      onRemove: function(s) {
        cn.prototype.onRemove.call(this, s), s.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
      },
      getEvents: function() {
        var s = cn.prototype.getEvents.call(this);
        return this.options.permanent || (s.preclick = this.close), s;
      },
      _initLayout: function() {
        var s = "leaflet-tooltip", l = s + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
        this._contentNode = this._container = vt("div", l), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + u(this));
      },
      _updateLayout: function() {
      },
      _adjustPan: function() {
      },
      _setPosition: function(s) {
        var l, h, f = this._map, _ = this._container, x = f.latLngToContainerPoint(f.getCenter()), C = f.layerPointToContainerPoint(s), E = this.options.direction, z = _.offsetWidth, R = _.offsetHeight, Z = D(this.options.offset), nt = this._getAnchor();
        E === "top" ? (l = z / 2, h = R) : E === "bottom" ? (l = z / 2, h = 0) : E === "center" ? (l = z / 2, h = R / 2) : E === "right" ? (l = 0, h = R / 2) : E === "left" ? (l = z, h = R / 2) : C.x < x.x ? (E = "right", l = 0, h = R / 2) : (E = "left", l = z + (Z.x + nt.x) * 2, h = R / 2), s = s.subtract(D(l, h, !0)).add(Z).add(nt), Ft(_, "leaflet-tooltip-right"), Ft(_, "leaflet-tooltip-left"), Ft(_, "leaflet-tooltip-top"), Ft(_, "leaflet-tooltip-bottom"), ct(_, "leaflet-tooltip-" + E), Zt(_, s);
      },
      _updatePosition: function() {
        var s = this._map.latLngToLayerPoint(this._latlng);
        this._setPosition(s);
      },
      setOpacity: function(s) {
        this.options.opacity = s, this._container && Fe(this._container, s);
      },
      _animateZoom: function(s) {
        var l = this._map._latLngToNewLayerPoint(this._latlng, s.zoom, s.center);
        this._setPosition(l);
      },
      _getAnchor: function() {
        return D(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
      }
    }), F0 = function(s, l) {
      return new Fo(s, l);
    };
    gt.include({
      // @method openTooltip(tooltip: Tooltip): this
      // Opens the specified tooltip.
      // @alternative
      // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
      // Creates a tooltip with the specified content and options and open it.
      openTooltip: function(s, l, h) {
        return this._initOverlay(Fo, s, l, h).openOn(this), this;
      },
      // @method closeTooltip(tooltip: Tooltip): this
      // Closes the tooltip given as parameter.
      closeTooltip: function(s) {
        return s.close(), this;
      }
    }), Xe.include({
      // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
      // Binds a tooltip to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindTooltip: function(s, l) {
        return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Fo, this._tooltip, s, l), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
      },
      // @method unbindTooltip(): this
      // Removes the tooltip previously bound with `bindTooltip`.
      unbindTooltip: function() {
        return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this;
      },
      _initTooltipInteractions: function(s) {
        if (!(!s && this._tooltipHandlersAdded)) {
          var l = s ? "off" : "on", h = {
            remove: this.closeTooltip,
            move: this._moveTooltip
          };
          this._tooltip.options.permanent ? h.add = this._openTooltip : (h.mouseover = this._openTooltip, h.mouseout = this.closeTooltip, h.click = this._openTooltip, this._map ? this._addFocusListeners() : h.add = this._addFocusListeners), this._tooltip.options.sticky && (h.mousemove = this._moveTooltip), this[l](h), this._tooltipHandlersAdded = !s;
        }
      },
      // @method openTooltip(latlng?: LatLng): this
      // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
      openTooltip: function(s) {
        return this._tooltip && (this instanceof xn || (this._tooltip._source = this), this._tooltip._prepareOpen(s) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
      },
      // @method closeTooltip(): this
      // Closes the tooltip bound to this layer if it is open.
      closeTooltip: function() {
        if (this._tooltip)
          return this._tooltip.close();
      },
      // @method toggleTooltip(): this
      // Opens or closes the tooltip bound to this layer depending on its current state.
      toggleTooltip: function() {
        return this._tooltip && this._tooltip.toggle(this), this;
      },
      // @method isTooltipOpen(): boolean
      // Returns `true` if the tooltip bound to this layer is currently open.
      isTooltipOpen: function() {
        return this._tooltip.isOpen();
      },
      // @method setTooltipContent(content: String|HTMLElement|Tooltip): this
      // Sets the content of the tooltip bound to this layer.
      setTooltipContent: function(s) {
        return this._tooltip && this._tooltip.setContent(s), this;
      },
      // @method getTooltip(): Tooltip
      // Returns the tooltip bound to this layer.
      getTooltip: function() {
        return this._tooltip;
      },
      _addFocusListeners: function() {
        this.getElement ? this._addFocusListenersOnLayer(this) : this.eachLayer && this.eachLayer(this._addFocusListenersOnLayer, this);
      },
      _addFocusListenersOnLayer: function(s) {
        var l = typeof s.getElement == "function" && s.getElement();
        l && (lt(l, "focus", function() {
          this._tooltip._source = s, this.openTooltip();
        }, this), lt(l, "blur", this.closeTooltip, this));
      },
      _setAriaDescribedByOnLayer: function(s) {
        var l = typeof s.getElement == "function" && s.getElement();
        l && l.setAttribute("aria-describedby", this._tooltip._container.id);
      },
      _openTooltip: function(s) {
        if (!(!this._tooltip || !this._map)) {
          if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
            this._openOnceFlag = !0;
            var l = this;
            this._map.once("moveend", function() {
              l._openOnceFlag = !1, l._openTooltip(s);
            });
            return;
          }
          this._tooltip._source = s.layer || s.target, this.openTooltip(this._tooltip.options.sticky ? s.latlng : void 0);
        }
      },
      _moveTooltip: function(s) {
        var l = s.latlng, h, f;
        this._tooltip.options.sticky && s.originalEvent && (h = this._map.mouseEventToContainerPoint(s.originalEvent), f = this._map.containerPointToLayerPoint(h), l = this._map.layerPointToLatLng(f)), this._tooltip.setLatLng(l);
      }
    });
    var df = es.extend({
      options: {
        // @section
        // @aka DivIcon options
        iconSize: [12, 12],
        // also can be set through CSS
        // iconAnchor: (Point),
        // popupAnchor: (Point),
        // @option html: String|HTMLElement = ''
        // Custom HTML code to put inside the div element, empty by default. Alternatively,
        // an instance of `HTMLElement`.
        html: !1,
        // @option bgPos: Point = [0, 0]
        // Optional relative position of the background, in pixels
        bgPos: null,
        className: "leaflet-div-icon"
      },
      createIcon: function(s) {
        var l = s && s.tagName === "DIV" ? s : document.createElement("div"), h = this.options;
        if (h.html instanceof Element ? (Po(l), l.appendChild(h.html)) : l.innerHTML = h.html !== !1 ? h.html : "", h.bgPos) {
          var f = D(h.bgPos);
          l.style.backgroundPosition = -f.x + "px " + -f.y + "px";
        }
        return this._setIconStyles(l, "icon"), l;
      },
      createShadow: function() {
        return null;
      }
    });
    function B0(s) {
      return new df(s);
    }
    es.Default = ir;
    var sr = Xe.extend({
      // @section
      // @aka GridLayer options
      options: {
        // @option tileSize: Number|Point = 256
        // Width and height of tiles in the grid. Use a number if width and height are equal, or `L.point(width, height)` otherwise.
        tileSize: 256,
        // @option opacity: Number = 1.0
        // Opacity of the tiles. Can be used in the `createTile()` function.
        opacity: 1,
        // @option updateWhenIdle: Boolean = (depends)
        // Load new tiles only when panning ends.
        // `true` by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.
        // `false` otherwise in order to display new tiles _during_ panning, since it is easy to pan outside the
        // [`keepBuffer`](#gridlayer-keepbuffer) option in desktop browsers.
        updateWhenIdle: Q.mobile,
        // @option updateWhenZooming: Boolean = true
        // By default, a smooth zoom animation (during a [touch zoom](#map-touchzoom) or a [`flyTo()`](#map-flyto)) will update grid layers every integer zoom level. Setting this option to `false` will update the grid layer only when the smooth animation ends.
        updateWhenZooming: !0,
        // @option updateInterval: Number = 200
        // Tiles will not update more than once every `updateInterval` milliseconds when panning.
        updateInterval: 200,
        // @option zIndex: Number = 1
        // The explicit zIndex of the tile layer.
        zIndex: 1,
        // @option bounds: LatLngBounds = undefined
        // If set, tiles will only be loaded inside the set `LatLngBounds`.
        bounds: null,
        // @option minZoom: Number = 0
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 0,
        // @option maxZoom: Number = undefined
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: void 0,
        // @option maxNativeZoom: Number = undefined
        // Maximum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels higher than `maxNativeZoom` will be loaded
        // from `maxNativeZoom` level and auto-scaled.
        maxNativeZoom: void 0,
        // @option minNativeZoom: Number = undefined
        // Minimum zoom number the tile source has available. If it is specified,
        // the tiles on all zoom levels lower than `minNativeZoom` will be loaded
        // from `minNativeZoom` level and auto-scaled.
        minNativeZoom: void 0,
        // @option noWrap: Boolean = false
        // Whether the layer is wrapped around the antimeridian. If `true`, the
        // GridLayer will only be displayed once at low zoom levels. Has no
        // effect when the [map CRS](#map-crs) doesn't wrap around. Can be used
        // in combination with [`bounds`](#gridlayer-bounds) to prevent requesting
        // tiles outside the CRS limits.
        noWrap: !1,
        // @option pane: String = 'tilePane'
        // `Map pane` where the grid layer will be added.
        pane: "tilePane",
        // @option className: String = ''
        // A custom class name to assign to the tile layer. Empty by default.
        className: "",
        // @option keepBuffer: Number = 2
        // When panning the map, keep this many rows and columns of tiles before unloading them.
        keepBuffer: 2
      },
      initialize: function(s) {
        w(this, s);
      },
      onAdd: function() {
        this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView();
      },
      beforeAdd: function(s) {
        s._addZoomLimit(this);
      },
      onRemove: function(s) {
        this._removeAllTiles(), zt(this._container), s._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
      },
      // @method bringToFront: this
      // Brings the tile layer to the top of all tile layers.
      bringToFront: function() {
        return this._map && (Qi(this._container), this._setAutoZIndex(Math.max)), this;
      },
      // @method bringToBack: this
      // Brings the tile layer to the bottom of all tile layers.
      bringToBack: function() {
        return this._map && (Ji(this._container), this._setAutoZIndex(Math.min)), this;
      },
      // @method getContainer: HTMLElement
      // Returns the HTML element that contains the tiles for this layer.
      getContainer: function() {
        return this._container;
      },
      // @method setOpacity(opacity: Number): this
      // Changes the [opacity](#gridlayer-opacity) of the grid layer.
      setOpacity: function(s) {
        return this.options.opacity = s, this._updateOpacity(), this;
      },
      // @method setZIndex(zIndex: Number): this
      // Changes the [zIndex](#gridlayer-zindex) of the grid layer.
      setZIndex: function(s) {
        return this.options.zIndex = s, this._updateZIndex(), this;
      },
      // @method isLoading: Boolean
      // Returns `true` if any tile in the grid layer has not finished loading.
      isLoading: function() {
        return this._loading;
      },
      // @method redraw: this
      // Causes the layer to clear all the tiles and request them again.
      redraw: function() {
        if (this._map) {
          this._removeAllTiles();
          var s = this._clampZoom(this._map.getZoom());
          s !== this._tileZoom && (this._tileZoom = s, this._updateLevels()), this._update();
        }
        return this;
      },
      getEvents: function() {
        var s = {
          viewprereset: this._invalidateAll,
          viewreset: this._resetView,
          zoom: this._resetView,
          moveend: this._onMoveEnd
        };
        return this.options.updateWhenIdle || (this._onMove || (this._onMove = d(this._onMoveEnd, this.options.updateInterval, this)), s.move = this._onMove), this._zoomAnimated && (s.zoomanim = this._animateZoom), s;
      },
      // @section Extension methods
      // Layers extending `GridLayer` shall reimplement the following method.
      // @method createTile(coords: Object, done?: Function): HTMLElement
      // Called only internally, must be overridden by classes extending `GridLayer`.
      // Returns the `HTMLElement` corresponding to the given `coords`. If the `done` callback
      // is specified, it must be called when the tile has finished loading and drawing.
      createTile: function() {
        return document.createElement("div");
      },
      // @section
      // @method getTileSize: Point
      // Normalizes the [tileSize option](#gridlayer-tilesize) into a point. Used by the `createTile()` method.
      getTileSize: function() {
        var s = this.options.tileSize;
        return s instanceof I ? s : new I(s, s);
      },
      _updateZIndex: function() {
        this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
      },
      _setAutoZIndex: function(s) {
        for (var l = this.getPane().children, h = -s(-1 / 0, 1 / 0), f = 0, _ = l.length, x; f < _; f++)
          x = l[f].style.zIndex, l[f] !== this._container && x && (h = s(h, +x));
        isFinite(h) && (this.options.zIndex = h + s(-1, 1), this._updateZIndex());
      },
      _updateOpacity: function() {
        if (this._map && !Q.ielt9) {
          Fe(this._container, this.options.opacity);
          var s = +/* @__PURE__ */ new Date(), l = !1, h = !1;
          for (var f in this._tiles) {
            var _ = this._tiles[f];
            if (!(!_.current || !_.loaded)) {
              var x = Math.min(1, (s - _.loaded) / 200);
              Fe(_.el, x), x < 1 ? l = !0 : (_.active ? h = !0 : this._onOpaqueTile(_), _.active = !0);
            }
          }
          h && !this._noPrune && this._pruneTiles(), l && (K(this._fadeFrame), this._fadeFrame = V(this._updateOpacity, this));
        }
      },
      _onOpaqueTile: g,
      _initContainer: function() {
        this._container || (this._container = vt("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
      },
      _updateLevels: function() {
        var s = this._tileZoom, l = this.options.maxZoom;
        if (s !== void 0) {
          for (var h in this._levels)
            h = Number(h), this._levels[h].el.children.length || h === s ? (this._levels[h].el.style.zIndex = l - Math.abs(s - h), this._onUpdateLevel(h)) : (zt(this._levels[h].el), this._removeTilesAtZoom(h), this._onRemoveLevel(h), delete this._levels[h]);
          var f = this._levels[s], _ = this._map;
          return f || (f = this._levels[s] = {}, f.el = vt("div", "leaflet-tile-container leaflet-zoom-animated", this._container), f.el.style.zIndex = l, f.origin = _.project(_.unproject(_.getPixelOrigin()), s).round(), f.zoom = s, this._setZoomTransform(f, _.getCenter(), _.getZoom()), g(f.el.offsetWidth), this._onCreateLevel(f)), this._level = f, f;
        }
      },
      _onUpdateLevel: g,
      _onRemoveLevel: g,
      _onCreateLevel: g,
      _pruneTiles: function() {
        if (this._map) {
          var s, l, h = this._map.getZoom();
          if (h > this.options.maxZoom || h < this.options.minZoom) {
            this._removeAllTiles();
            return;
          }
          for (s in this._tiles)
            l = this._tiles[s], l.retain = l.current;
          for (s in this._tiles)
            if (l = this._tiles[s], l.current && !l.active) {
              var f = l.coords;
              this._retainParent(f.x, f.y, f.z, f.z - 5) || this._retainChildren(f.x, f.y, f.z, f.z + 2);
            }
          for (s in this._tiles)
            this._tiles[s].retain || this._removeTile(s);
        }
      },
      _removeTilesAtZoom: function(s) {
        for (var l in this._tiles)
          this._tiles[l].coords.z === s && this._removeTile(l);
      },
      _removeAllTiles: function() {
        for (var s in this._tiles)
          this._removeTile(s);
      },
      _invalidateAll: function() {
        for (var s in this._levels)
          zt(this._levels[s].el), this._onRemoveLevel(Number(s)), delete this._levels[s];
        this._removeAllTiles(), this._tileZoom = void 0;
      },
      _retainParent: function(s, l, h, f) {
        var _ = Math.floor(s / 2), x = Math.floor(l / 2), C = h - 1, E = new I(+_, +x);
        E.z = +C;
        var z = this._tileCoordsToKey(E), R = this._tiles[z];
        return R && R.active ? (R.retain = !0, !0) : (R && R.loaded && (R.retain = !0), C > f ? this._retainParent(_, x, C, f) : !1);
      },
      _retainChildren: function(s, l, h, f) {
        for (var _ = 2 * s; _ < 2 * s + 2; _++)
          for (var x = 2 * l; x < 2 * l + 2; x++) {
            var C = new I(_, x);
            C.z = h + 1;
            var E = this._tileCoordsToKey(C), z = this._tiles[E];
            if (z && z.active) {
              z.retain = !0;
              continue;
            } else z && z.loaded && (z.retain = !0);
            h + 1 < f && this._retainChildren(_, x, h + 1, f);
          }
      },
      _resetView: function(s) {
        var l = s && (s.pinch || s.flyTo);
        this._setView(this._map.getCenter(), this._map.getZoom(), l, l);
      },
      _animateZoom: function(s) {
        this._setView(s.center, s.zoom, !0, s.noUpdate);
      },
      _clampZoom: function(s) {
        var l = this.options;
        return l.minNativeZoom !== void 0 && s < l.minNativeZoom ? l.minNativeZoom : l.maxNativeZoom !== void 0 && l.maxNativeZoom < s ? l.maxNativeZoom : s;
      },
      _setView: function(s, l, h, f) {
        var _ = Math.round(l);
        this.options.maxZoom !== void 0 && _ > this.options.maxZoom || this.options.minZoom !== void 0 && _ < this.options.minZoom ? _ = void 0 : _ = this._clampZoom(_);
        var x = this.options.updateWhenZooming && _ !== this._tileZoom;
        (!f || x) && (this._tileZoom = _, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), _ !== void 0 && this._update(s), h || this._pruneTiles(), this._noPrune = !!h), this._setZoomTransforms(s, l);
      },
      _setZoomTransforms: function(s, l) {
        for (var h in this._levels)
          this._setZoomTransform(this._levels[h], s, l);
      },
      _setZoomTransform: function(s, l, h) {
        var f = this._map.getZoomScale(h, s.zoom), _ = s.origin.multiplyBy(f).subtract(this._map._getNewPixelOrigin(l, h)).round();
        Q.any3d ? yi(s.el, _, f) : Zt(s.el, _);
      },
      _resetGrid: function() {
        var s = this._map, l = s.options.crs, h = this._tileSize = this.getTileSize(), f = this._tileZoom, _ = this._map.getPixelWorldBounds(this._tileZoom);
        _ && (this._globalTileRange = this._pxBoundsToTileRange(_)), this._wrapX = l.wrapLng && !this.options.noWrap && [
          Math.floor(s.project([0, l.wrapLng[0]], f).x / h.x),
          Math.ceil(s.project([0, l.wrapLng[1]], f).x / h.y)
        ], this._wrapY = l.wrapLat && !this.options.noWrap && [
          Math.floor(s.project([l.wrapLat[0], 0], f).y / h.x),
          Math.ceil(s.project([l.wrapLat[1], 0], f).y / h.y)
        ];
      },
      _onMoveEnd: function() {
        !this._map || this._map._animatingZoom || this._update();
      },
      _getTiledPixelBounds: function(s) {
        var l = this._map, h = l._animatingZoom ? Math.max(l._animateToZoom, l.getZoom()) : l.getZoom(), f = l.getZoomScale(h, this._tileZoom), _ = l.project(s, this._tileZoom).floor(), x = l.getSize().divideBy(f * 2);
        return new tt(_.subtract(x), _.add(x));
      },
      // Private method to load tiles in the grid's active zoom level according to map bounds
      _update: function(s) {
        var l = this._map;
        if (l) {
          var h = this._clampZoom(l.getZoom());
          if (s === void 0 && (s = l.getCenter()), this._tileZoom !== void 0) {
            var f = this._getTiledPixelBounds(s), _ = this._pxBoundsToTileRange(f), x = _.getCenter(), C = [], E = this.options.keepBuffer, z = new tt(
              _.getBottomLeft().subtract([E, -E]),
              _.getTopRight().add([E, -E])
            );
            if (!(isFinite(_.min.x) && isFinite(_.min.y) && isFinite(_.max.x) && isFinite(_.max.y)))
              throw new Error("Attempted to load an infinite number of tiles");
            for (var R in this._tiles) {
              var Z = this._tiles[R].coords;
              (Z.z !== this._tileZoom || !z.contains(new I(Z.x, Z.y))) && (this._tiles[R].current = !1);
            }
            if (Math.abs(h - this._tileZoom) > 1) {
              this._setView(s, h);
              return;
            }
            for (var nt = _.min.y; nt <= _.max.y; nt++)
              for (var ft = _.min.x; ft <= _.max.x; ft++) {
                var pe = new I(ft, nt);
                if (pe.z = this._tileZoom, !!this._isValidTile(pe)) {
                  var Jt = this._tiles[this._tileCoordsToKey(pe)];
                  Jt ? Jt.current = !0 : C.push(pe);
                }
              }
            if (C.sort(function(ye, rs) {
              return ye.distanceTo(x) - rs.distanceTo(x);
            }), C.length !== 0) {
              this._loading || (this._loading = !0, this.fire("loading"));
              var He = document.createDocumentFragment();
              for (ft = 0; ft < C.length; ft++)
                this._addTile(C[ft], He);
              this._level.el.appendChild(He);
            }
          }
        }
      },
      _isValidTile: function(s) {
        var l = this._map.options.crs;
        if (!l.infinite) {
          var h = this._globalTileRange;
          if (!l.wrapLng && (s.x < h.min.x || s.x > h.max.x) || !l.wrapLat && (s.y < h.min.y || s.y > h.max.y))
            return !1;
        }
        if (!this.options.bounds)
          return !0;
        var f = this._tileCoordsToBounds(s);
        return dt(this.options.bounds).overlaps(f);
      },
      _keyToBounds: function(s) {
        return this._tileCoordsToBounds(this._keyToTileCoords(s));
      },
      _tileCoordsToNwSe: function(s) {
        var l = this._map, h = this.getTileSize(), f = s.scaleBy(h), _ = f.add(h), x = l.unproject(f, s.z), C = l.unproject(_, s.z);
        return [x, C];
      },
      // converts tile coordinates to its geographical bounds
      _tileCoordsToBounds: function(s) {
        var l = this._tileCoordsToNwSe(s), h = new St(l[0], l[1]);
        return this.options.noWrap || (h = this._map.wrapLatLngBounds(h)), h;
      },
      // converts tile coordinates to key for the tile cache
      _tileCoordsToKey: function(s) {
        return s.x + ":" + s.y + ":" + s.z;
      },
      // converts tile cache key to coordinates
      _keyToTileCoords: function(s) {
        var l = s.split(":"), h = new I(+l[0], +l[1]);
        return h.z = +l[2], h;
      },
      _removeTile: function(s) {
        var l = this._tiles[s];
        l && (zt(l.el), delete this._tiles[s], this.fire("tileunload", {
          tile: l.el,
          coords: this._keyToTileCoords(s)
        }));
      },
      _initTile: function(s) {
        ct(s, "leaflet-tile");
        var l = this.getTileSize();
        s.style.width = l.x + "px", s.style.height = l.y + "px", s.onselectstart = g, s.onmousemove = g, Q.ielt9 && this.options.opacity < 1 && Fe(s, this.options.opacity);
      },
      _addTile: function(s, l) {
        var h = this._getTilePos(s), f = this._tileCoordsToKey(s), _ = this.createTile(this._wrapCoords(s), a(this._tileReady, this, s));
        this._initTile(_), this.createTile.length < 2 && V(a(this._tileReady, this, s, null, _)), Zt(_, h), this._tiles[f] = {
          el: _,
          coords: s,
          current: !0
        }, l.appendChild(_), this.fire("tileloadstart", {
          tile: _,
          coords: s
        });
      },
      _tileReady: function(s, l, h) {
        l && this.fire("tileerror", {
          error: l,
          tile: h,
          coords: s
        });
        var f = this._tileCoordsToKey(s);
        h = this._tiles[f], h && (h.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (Fe(h.el, 0), K(this._fadeFrame), this._fadeFrame = V(this._updateOpacity, this)) : (h.active = !0, this._pruneTiles()), l || (ct(h.el, "leaflet-tile-loaded"), this.fire("tileload", {
          tile: h.el,
          coords: s
        })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), Q.ielt9 || !this._map._fadeAnimated ? V(this._pruneTiles, this) : setTimeout(a(this._pruneTiles, this), 250)));
      },
      _getTilePos: function(s) {
        return s.scaleBy(this.getTileSize()).subtract(this._level.origin);
      },
      _wrapCoords: function(s) {
        var l = new I(
          this._wrapX ? p(s.x, this._wrapX) : s.x,
          this._wrapY ? p(s.y, this._wrapY) : s.y
        );
        return l.z = s.z, l;
      },
      _pxBoundsToTileRange: function(s) {
        var l = this.getTileSize();
        return new tt(
          s.min.unscaleBy(l).floor(),
          s.max.unscaleBy(l).ceil().subtract([1, 1])
        );
      },
      _noTilesToLoad: function() {
        for (var s in this._tiles)
          if (!this._tiles[s].loaded)
            return !1;
        return !0;
      }
    });
    function H0(s) {
      return new sr(s);
    }
    var ss = sr.extend({
      // @section
      // @aka TileLayer options
      options: {
        // @option minZoom: Number = 0
        // The minimum zoom level down to which this layer will be displayed (inclusive).
        minZoom: 0,
        // @option maxZoom: Number = 18
        // The maximum zoom level up to which this layer will be displayed (inclusive).
        maxZoom: 18,
        // @option subdomains: String|String[] = 'abc'
        // Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.
        subdomains: "abc",
        // @option errorTileUrl: String = ''
        // URL to the tile image to show in place of the tile that failed to load.
        errorTileUrl: "",
        // @option zoomOffset: Number = 0
        // The zoom number used in tile URLs will be offset with this value.
        zoomOffset: 0,
        // @option tms: Boolean = false
        // If `true`, inverses Y axis numbering for tiles (turn this on for [TMS](https://en.wikipedia.org/wiki/Tile_Map_Service) services).
        tms: !1,
        // @option zoomReverse: Boolean = false
        // If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom` instead of `zoom`)
        zoomReverse: !1,
        // @option detectRetina: Boolean = false
        // If `true` and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.
        detectRetina: !1,
        // @option crossOrigin: Boolean|String = false
        // Whether the crossOrigin attribute will be added to the tiles.
        // If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data.
        // Refer to [CORS Settings](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for valid String values.
        crossOrigin: !1,
        // @option referrerPolicy: Boolean|String = false
        // Whether the referrerPolicy attribute will be added to the tiles.
        // If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided.
        // This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer
        // (e.g. to validate an API token).
        // Refer to [HTMLImageElement.referrerPolicy](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy) for valid String values.
        referrerPolicy: !1
      },
      initialize: function(s, l) {
        this._url = s, l = w(this, l), l.detectRetina && Q.retina && l.maxZoom > 0 ? (l.tileSize = Math.floor(l.tileSize / 2), l.zoomReverse ? (l.zoomOffset--, l.minZoom = Math.min(l.maxZoom, l.minZoom + 1)) : (l.zoomOffset++, l.maxZoom = Math.max(l.minZoom, l.maxZoom - 1)), l.minZoom = Math.max(0, l.minZoom)) : l.zoomReverse ? l.minZoom = Math.min(l.maxZoom, l.minZoom) : l.maxZoom = Math.max(l.minZoom, l.maxZoom), typeof l.subdomains == "string" && (l.subdomains = l.subdomains.split("")), this.on("tileunload", this._onTileRemove);
      },
      // @method setUrl(url: String, noRedraw?: Boolean): this
      // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
      // If the URL does not change, the layer will not be redrawn unless
      // the noRedraw parameter is set to false.
      setUrl: function(s, l) {
        return this._url === s && l === void 0 && (l = !0), this._url = s, l || this.redraw(), this;
      },
      // @method createTile(coords: Object, done?: Function): HTMLElement
      // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
      // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
      // callback is called when the tile has been loaded.
      createTile: function(s, l) {
        var h = document.createElement("img");
        return lt(h, "load", a(this._tileOnLoad, this, l, h)), lt(h, "error", a(this._tileOnError, this, l, h)), (this.options.crossOrigin || this.options.crossOrigin === "") && (h.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (h.referrerPolicy = this.options.referrerPolicy), h.alt = "", h.src = this.getTileUrl(s), h;
      },
      // @section Extension methods
      // @uninheritable
      // Layers extending `TileLayer` might reimplement the following method.
      // @method getTileUrl(coords: Object): String
      // Called only internally, returns the URL for a tile given its coordinates.
      // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
      getTileUrl: function(s) {
        var l = {
          r: Q.retina ? "@2x" : "",
          s: this._getSubdomain(s),
          x: s.x,
          y: s.y,
          z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
          var h = this._globalTileRange.max.y - s.y;
          this.options.tms && (l.y = h), l["-y"] = h;
        }
        return k(this._url, r(l, this.options));
      },
      _tileOnLoad: function(s, l) {
        Q.ielt9 ? setTimeout(a(s, this, null, l), 0) : s(null, l);
      },
      _tileOnError: function(s, l, h) {
        var f = this.options.errorTileUrl;
        f && l.getAttribute("src") !== f && (l.src = f), s(h, l);
      },
      _onTileRemove: function(s) {
        s.tile.onload = null;
      },
      _getZoomForUrl: function() {
        var s = this._tileZoom, l = this.options.maxZoom, h = this.options.zoomReverse, f = this.options.zoomOffset;
        return h && (s = l - s), s + f;
      },
      _getSubdomain: function(s) {
        var l = Math.abs(s.x + s.y) % this.options.subdomains.length;
        return this.options.subdomains[l];
      },
      // stops loading all tiles in the background layer
      _abortLoading: function() {
        var s, l;
        for (s in this._tiles)
          if (this._tiles[s].coords.z !== this._tileZoom && (l = this._tiles[s].el, l.onload = g, l.onerror = g, !l.complete)) {
            l.src = N;
            var h = this._tiles[s].coords;
            zt(l), delete this._tiles[s], this.fire("tileabort", {
              tile: l,
              coords: h
            });
          }
      },
      _removeTile: function(s) {
        var l = this._tiles[s];
        if (l)
          return l.el.setAttribute("src", N), sr.prototype._removeTile.call(this, s);
      },
      _tileReady: function(s, l, h) {
        if (!(!this._map || h && h.getAttribute("src") === N))
          return sr.prototype._tileReady.call(this, s, l, h);
      }
    });
    function ff(s, l) {
      return new ss(s, l);
    }
    var pf = ss.extend({
      // @section
      // @aka TileLayer.WMS options
      // If any custom options not documented here are used, they will be sent to the
      // WMS server as extra parameters in each request URL. This can be useful for
      // [non-standard vendor WMS parameters](https://docs.geoserver.org/stable/en/user/services/wms/vendor.html).
      defaultWmsParams: {
        service: "WMS",
        request: "GetMap",
        // @option layers: String = ''
        // **(required)** Comma-separated list of WMS layers to show.
        layers: "",
        // @option styles: String = ''
        // Comma-separated list of WMS styles.
        styles: "",
        // @option format: String = 'image/jpeg'
        // WMS image format (use `'image/png'` for layers with transparency).
        format: "image/jpeg",
        // @option transparent: Boolean = false
        // If `true`, the WMS service will return images with transparency.
        transparent: !1,
        // @option version: String = '1.1.1'
        // Version of the WMS service to use
        version: "1.1.1"
      },
      options: {
        // @option crs: CRS = null
        // Coordinate Reference System to use for the WMS requests, defaults to
        // map CRS. Don't change this if you're not sure what it means.
        crs: null,
        // @option uppercase: Boolean = false
        // If `true`, WMS request parameter keys will be uppercase.
        uppercase: !1
      },
      initialize: function(s, l) {
        this._url = s;
        var h = r({}, this.defaultWmsParams);
        for (var f in l)
          f in this.options || (h[f] = l[f]);
        l = w(this, l);
        var _ = l.detectRetina && Q.retina ? 2 : 1, x = this.getTileSize();
        h.width = x.x * _, h.height = x.y * _, this.wmsParams = h;
      },
      onAdd: function(s) {
        this._crs = this.options.crs || s.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
        var l = this._wmsVersion >= 1.3 ? "crs" : "srs";
        this.wmsParams[l] = this._crs.code, ss.prototype.onAdd.call(this, s);
      },
      getTileUrl: function(s) {
        var l = this._tileCoordsToNwSe(s), h = this._crs, f = ot(h.project(l[0]), h.project(l[1])), _ = f.min, x = f.max, C = (this._wmsVersion >= 1.3 && this._crs === of ? [_.y, _.x, x.y, x.x] : [_.x, _.y, x.x, x.y]).join(","), E = ss.prototype.getTileUrl.call(this, s);
        return E + M(this.wmsParams, E, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + C;
      },
      // @method setParams(params: Object, noRedraw?: Boolean): this
      // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
      setParams: function(s, l) {
        return r(this.wmsParams, s), l || this.redraw(), this;
      }
    });
    function W0(s, l) {
      return new pf(s, l);
    }
    ss.WMS = pf, ff.wms = W0;
    var kn = Xe.extend({
      // @section
      // @aka Renderer options
      options: {
        // @option padding: Number = 0.1
        // How much to extend the clip area around the map view (relative to its size)
        // e.g. 0.1 would be 10% of map view in each direction
        padding: 0.1
      },
      initialize: function(s) {
        w(this, s), u(this), this._layers = this._layers || {};
      },
      onAdd: function() {
        this._container || (this._initContainer(), ct(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
      },
      onRemove: function() {
        this.off("update", this._updatePaths, this), this._destroyContainer();
      },
      getEvents: function() {
        var s = {
          viewreset: this._reset,
          zoom: this._onZoom,
          moveend: this._update,
          zoomend: this._onZoomEnd
        };
        return this._zoomAnimated && (s.zoomanim = this._onAnimZoom), s;
      },
      _onAnimZoom: function(s) {
        this._updateTransform(s.center, s.zoom);
      },
      _onZoom: function() {
        this._updateTransform(this._map.getCenter(), this._map.getZoom());
      },
      _updateTransform: function(s, l) {
        var h = this._map.getZoomScale(l, this._zoom), f = this._map.getSize().multiplyBy(0.5 + this.options.padding), _ = this._map.project(this._center, l), x = f.multiplyBy(-h).add(_).subtract(this._map._getNewPixelOrigin(s, l));
        Q.any3d ? yi(this._container, x, h) : Zt(this._container, x);
      },
      _reset: function() {
        this._update(), this._updateTransform(this._center, this._zoom);
        for (var s in this._layers)
          this._layers[s]._reset();
      },
      _onZoomEnd: function() {
        for (var s in this._layers)
          this._layers[s]._project();
      },
      _updatePaths: function() {
        for (var s in this._layers)
          this._layers[s]._update();
      },
      _update: function() {
        var s = this.options.padding, l = this._map.getSize(), h = this._map.containerPointToLayerPoint(l.multiplyBy(-s)).round();
        this._bounds = new tt(h, h.add(l.multiplyBy(1 + s * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
      }
    }), mf = kn.extend({
      // @section
      // @aka Canvas options
      options: {
        // @option tolerance: Number = 0
        // How much to extend the click tolerance around a path/object on the map.
        tolerance: 0
      },
      getEvents: function() {
        var s = kn.prototype.getEvents.call(this);
        return s.viewprereset = this._onViewPreReset, s;
      },
      _onViewPreReset: function() {
        this._postponeUpdatePaths = !0;
      },
      onAdd: function() {
        kn.prototype.onAdd.call(this), this._draw();
      },
      _initContainer: function() {
        var s = this._container = document.createElement("canvas");
        lt(s, "mousemove", this._onMouseMove, this), lt(s, "click dblclick mousedown mouseup contextmenu", this._onClick, this), lt(s, "mouseout", this._handleMouseOut, this), s._leaflet_disable_events = !0, this._ctx = s.getContext("2d");
      },
      _destroyContainer: function() {
        K(this._redrawRequest), delete this._ctx, zt(this._container), Mt(this._container), delete this._container;
      },
      _updatePaths: function() {
        if (!this._postponeUpdatePaths) {
          var s;
          this._redrawBounds = null;
          for (var l in this._layers)
            s = this._layers[l], s._update();
          this._redraw();
        }
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          kn.prototype._update.call(this);
          var s = this._bounds, l = this._container, h = s.getSize(), f = Q.retina ? 2 : 1;
          Zt(l, s.min), l.width = f * h.x, l.height = f * h.y, l.style.width = h.x + "px", l.style.height = h.y + "px", Q.retina && this._ctx.scale(2, 2), this._ctx.translate(-s.min.x, -s.min.y), this.fire("update");
        }
      },
      _reset: function() {
        kn.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
      },
      _initPath: function(s) {
        this._updateDashArray(s), this._layers[u(s)] = s;
        var l = s._order = {
          layer: s,
          prev: this._drawLast,
          next: null
        };
        this._drawLast && (this._drawLast.next = l), this._drawLast = l, this._drawFirst = this._drawFirst || this._drawLast;
      },
      _addPath: function(s) {
        this._requestRedraw(s);
      },
      _removePath: function(s) {
        var l = s._order, h = l.next, f = l.prev;
        h ? h.prev = f : this._drawLast = f, f ? f.next = h : this._drawFirst = h, delete s._order, delete this._layers[u(s)], this._requestRedraw(s);
      },
      _updatePath: function(s) {
        this._extendRedrawBounds(s), s._project(), s._update(), this._requestRedraw(s);
      },
      _updateStyle: function(s) {
        this._updateDashArray(s), this._requestRedraw(s);
      },
      _updateDashArray: function(s) {
        if (typeof s.options.dashArray == "string") {
          var l = s.options.dashArray.split(/[, ]+/), h = [], f, _;
          for (_ = 0; _ < l.length; _++) {
            if (f = Number(l[_]), isNaN(f))
              return;
            h.push(f);
          }
          s.options._dashArray = h;
        } else
          s.options._dashArray = s.options.dashArray;
      },
      _requestRedraw: function(s) {
        this._map && (this._extendRedrawBounds(s), this._redrawRequest = this._redrawRequest || V(this._redraw, this));
      },
      _extendRedrawBounds: function(s) {
        if (s._pxBounds) {
          var l = (s.options.weight || 0) + 1;
          this._redrawBounds = this._redrawBounds || new tt(), this._redrawBounds.extend(s._pxBounds.min.subtract([l, l])), this._redrawBounds.extend(s._pxBounds.max.add([l, l]));
        }
      },
      _redraw: function() {
        this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
      },
      _clear: function() {
        var s = this._redrawBounds;
        if (s) {
          var l = s.getSize();
          this._ctx.clearRect(s.min.x, s.min.y, l.x, l.y);
        } else
          this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
      },
      _draw: function() {
        var s, l = this._redrawBounds;
        if (this._ctx.save(), l) {
          var h = l.getSize();
          this._ctx.beginPath(), this._ctx.rect(l.min.x, l.min.y, h.x, h.y), this._ctx.clip();
        }
        this._drawing = !0;
        for (var f = this._drawFirst; f; f = f.next)
          s = f.layer, (!l || s._pxBounds && s._pxBounds.intersects(l)) && s._updatePath();
        this._drawing = !1, this._ctx.restore();
      },
      _updatePoly: function(s, l) {
        if (this._drawing) {
          var h, f, _, x, C = s._parts, E = C.length, z = this._ctx;
          if (E) {
            for (z.beginPath(), h = 0; h < E; h++) {
              for (f = 0, _ = C[h].length; f < _; f++)
                x = C[h][f], z[f ? "lineTo" : "moveTo"](x.x, x.y);
              l && z.closePath();
            }
            this._fillStroke(z, s);
          }
        }
      },
      _updateCircle: function(s) {
        if (!(!this._drawing || s._empty())) {
          var l = s._point, h = this._ctx, f = Math.max(Math.round(s._radius), 1), _ = (Math.max(Math.round(s._radiusY), 1) || f) / f;
          _ !== 1 && (h.save(), h.scale(1, _)), h.beginPath(), h.arc(l.x, l.y / _, f, 0, Math.PI * 2, !1), _ !== 1 && h.restore(), this._fillStroke(h, s);
        }
      },
      _fillStroke: function(s, l) {
        var h = l.options;
        h.fill && (s.globalAlpha = h.fillOpacity, s.fillStyle = h.fillColor || h.color, s.fill(h.fillRule || "evenodd")), h.stroke && h.weight !== 0 && (s.setLineDash && s.setLineDash(l.options && l.options._dashArray || []), s.globalAlpha = h.opacity, s.lineWidth = h.weight, s.strokeStyle = h.color, s.lineCap = h.lineCap, s.lineJoin = h.lineJoin, s.stroke());
      },
      // Canvas obviously doesn't have mouse events for individual drawn objects,
      // so we emulate that by calculating what's under the mouse on mousemove/click manually
      _onClick: function(s) {
        for (var l = this._map.mouseEventToLayerPoint(s), h, f, _ = this._drawFirst; _; _ = _.next)
          h = _.layer, h.options.interactive && h._containsPoint(l) && (!(s.type === "click" || s.type === "preclick") || !this._map._draggableMoved(h)) && (f = h);
        this._fireEvent(f ? [f] : !1, s);
      },
      _onMouseMove: function(s) {
        if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
          var l = this._map.mouseEventToLayerPoint(s);
          this._handleMouseHover(s, l);
        }
      },
      _handleMouseOut: function(s) {
        var l = this._hoveredLayer;
        l && (Ft(this._container, "leaflet-interactive"), this._fireEvent([l], s, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
      },
      _handleMouseHover: function(s, l) {
        if (!this._mouseHoverThrottled) {
          for (var h, f, _ = this._drawFirst; _; _ = _.next)
            h = _.layer, h.options.interactive && h._containsPoint(l) && (f = h);
          f !== this._hoveredLayer && (this._handleMouseOut(s), f && (ct(this._container, "leaflet-interactive"), this._fireEvent([f], s, "mouseover"), this._hoveredLayer = f)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, s), this._mouseHoverThrottled = !0, setTimeout(a(function() {
            this._mouseHoverThrottled = !1;
          }, this), 32);
        }
      },
      _fireEvent: function(s, l, h) {
        this._map._fireDOMEvent(l, h || l.type, s);
      },
      _bringToFront: function(s) {
        var l = s._order;
        if (l) {
          var h = l.next, f = l.prev;
          if (h)
            h.prev = f;
          else
            return;
          f ? f.next = h : h && (this._drawFirst = h), l.prev = this._drawLast, this._drawLast.next = l, l.next = null, this._drawLast = l, this._requestRedraw(s);
        }
      },
      _bringToBack: function(s) {
        var l = s._order;
        if (l) {
          var h = l.next, f = l.prev;
          if (f)
            f.next = h;
          else
            return;
          h ? h.prev = f : f && (this._drawLast = f), l.prev = null, l.next = this._drawFirst, this._drawFirst.prev = l, this._drawFirst = l, this._requestRedraw(s);
        }
      }
    });
    function gf(s) {
      return Q.canvas ? new mf(s) : null;
    }
    var rr = function() {
      try {
        return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(s) {
          return document.createElement("<lvml:" + s + ' class="lvml">');
        };
      } catch {
      }
      return function(s) {
        return document.createElement("<" + s + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
      };
    }(), V0 = {
      _initContainer: function() {
        this._container = vt("div", "leaflet-vml-container");
      },
      _update: function() {
        this._map._animatingZoom || (kn.prototype._update.call(this), this.fire("update"));
      },
      _initPath: function(s) {
        var l = s._container = rr("shape");
        ct(l, "leaflet-vml-shape " + (this.options.className || "")), l.coordsize = "1 1", s._path = rr("path"), l.appendChild(s._path), this._updateStyle(s), this._layers[u(s)] = s;
      },
      _addPath: function(s) {
        var l = s._container;
        this._container.appendChild(l), s.options.interactive && s.addInteractiveTarget(l);
      },
      _removePath: function(s) {
        var l = s._container;
        zt(l), s.removeInteractiveTarget(l), delete this._layers[u(s)];
      },
      _updateStyle: function(s) {
        var l = s._stroke, h = s._fill, f = s.options, _ = s._container;
        _.stroked = !!f.stroke, _.filled = !!f.fill, f.stroke ? (l || (l = s._stroke = rr("stroke")), _.appendChild(l), l.weight = f.weight + "px", l.color = f.color, l.opacity = f.opacity, f.dashArray ? l.dashStyle = P(f.dashArray) ? f.dashArray.join(" ") : f.dashArray.replace(/( *, *)/g, " ") : l.dashStyle = "", l.endcap = f.lineCap.replace("butt", "flat"), l.joinstyle = f.lineJoin) : l && (_.removeChild(l), s._stroke = null), f.fill ? (h || (h = s._fill = rr("fill")), _.appendChild(h), h.color = f.fillColor || f.color, h.opacity = f.fillOpacity) : h && (_.removeChild(h), s._fill = null);
      },
      _updateCircle: function(s) {
        var l = s._point.round(), h = Math.round(s._radius), f = Math.round(s._radiusY || h);
        this._setPath(s, s._empty() ? "M0 0" : "AL " + l.x + "," + l.y + " " + h + "," + f + " 0," + 65535 * 360);
      },
      _setPath: function(s, l) {
        s._path.v = l;
      },
      _bringToFront: function(s) {
        Qi(s._container);
      },
      _bringToBack: function(s) {
        Ji(s._container);
      }
    }, Bo = Q.vml ? rr : bo, or = kn.extend({
      _initContainer: function() {
        this._container = Bo("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Bo("g"), this._container.appendChild(this._rootGroup);
      },
      _destroyContainer: function() {
        zt(this._container), Mt(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          kn.prototype._update.call(this);
          var s = this._bounds, l = s.getSize(), h = this._container;
          (!this._svgSize || !this._svgSize.equals(l)) && (this._svgSize = l, h.setAttribute("width", l.x), h.setAttribute("height", l.y)), Zt(h, s.min), h.setAttribute("viewBox", [s.min.x, s.min.y, l.x, l.y].join(" ")), this.fire("update");
        }
      },
      // methods below are called by vector layers implementations
      _initPath: function(s) {
        var l = s._path = Bo("path");
        s.options.className && ct(l, s.options.className), s.options.interactive && ct(l, "leaflet-interactive"), this._updateStyle(s), this._layers[u(s)] = s;
      },
      _addPath: function(s) {
        this._rootGroup || this._initContainer(), this._rootGroup.appendChild(s._path), s.addInteractiveTarget(s._path);
      },
      _removePath: function(s) {
        zt(s._path), s.removeInteractiveTarget(s._path), delete this._layers[u(s)];
      },
      _updatePath: function(s) {
        s._project(), s._update();
      },
      _updateStyle: function(s) {
        var l = s._path, h = s.options;
        l && (h.stroke ? (l.setAttribute("stroke", h.color), l.setAttribute("stroke-opacity", h.opacity), l.setAttribute("stroke-width", h.weight), l.setAttribute("stroke-linecap", h.lineCap), l.setAttribute("stroke-linejoin", h.lineJoin), h.dashArray ? l.setAttribute("stroke-dasharray", h.dashArray) : l.removeAttribute("stroke-dasharray"), h.dashOffset ? l.setAttribute("stroke-dashoffset", h.dashOffset) : l.removeAttribute("stroke-dashoffset")) : l.setAttribute("stroke", "none"), h.fill ? (l.setAttribute("fill", h.fillColor || h.color), l.setAttribute("fill-opacity", h.fillOpacity), l.setAttribute("fill-rule", h.fillRule || "evenodd")) : l.setAttribute("fill", "none"));
      },
      _updatePoly: function(s, l) {
        this._setPath(s, ko(s._parts, l));
      },
      _updateCircle: function(s) {
        var l = s._point, h = Math.max(Math.round(s._radius), 1), f = Math.max(Math.round(s._radiusY), 1) || h, _ = "a" + h + "," + f + " 0 1,0 ", x = s._empty() ? "M0 0" : "M" + (l.x - h) + "," + l.y + _ + h * 2 + ",0 " + _ + -h * 2 + ",0 ";
        this._setPath(s, x);
      },
      _setPath: function(s, l) {
        s._path.setAttribute("d", l);
      },
      // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
      _bringToFront: function(s) {
        Qi(s._path);
      },
      _bringToBack: function(s) {
        Ji(s._path);
      }
    });
    Q.vml && or.include(V0);
    function _f(s) {
      return Q.svg || Q.vml ? new or(s) : null;
    }
    gt.include({
      // @namespace Map; @method getRenderer(layer: Path): Renderer
      // Returns the instance of `Renderer` that should be used to render the given
      // `Path`. It will ensure that the `renderer` options of the map and paths
      // are respected, and that the renderers do exist on the map.
      getRenderer: function(s) {
        var l = s.options.renderer || this._getPaneRenderer(s.options.pane) || this.options.renderer || this._renderer;
        return l || (l = this._renderer = this._createRenderer()), this.hasLayer(l) || this.addLayer(l), l;
      },
      _getPaneRenderer: function(s) {
        if (s === "overlayPane" || s === void 0)
          return !1;
        var l = this._paneRenderers[s];
        return l === void 0 && (l = this._createRenderer({ pane: s }), this._paneRenderers[s] = l), l;
      },
      _createRenderer: function(s) {
        return this.options.preferCanvas && gf(s) || _f(s);
      }
    });
    var vf = ns.extend({
      initialize: function(s, l) {
        ns.prototype.initialize.call(this, this._boundsToLatLngs(s), l);
      },
      // @method setBounds(latLngBounds: LatLngBounds): this
      // Redraws the rectangle with the passed bounds.
      setBounds: function(s) {
        return this.setLatLngs(this._boundsToLatLngs(s));
      },
      _boundsToLatLngs: function(s) {
        return s = dt(s), [
          s.getSouthWest(),
          s.getNorthWest(),
          s.getNorthEast(),
          s.getSouthEast()
        ];
      }
    });
    function Z0(s, l) {
      return new vf(s, l);
    }
    or.create = Bo, or.pointsToPath = ko, bn.geometryToLayer = jo, bn.coordsToLatLng = pc, bn.coordsToLatLngs = Oo, bn.latLngToCoords = mc, bn.latLngsToCoords = Ao, bn.getFeature = is, bn.asFeature = Io, gt.mergeOptions({
      // @option boxZoom: Boolean = true
      // Whether the map can be zoomed to a rectangular area specified by
      // dragging the mouse while pressing the shift key.
      boxZoom: !0
    });
    var yf = ln.extend({
      initialize: function(s) {
        this._map = s, this._container = s._container, this._pane = s._panes.overlayPane, this._resetStateTimeout = 0, s.on("unload", this._destroy, this);
      },
      addHooks: function() {
        lt(this._container, "mousedown", this._onMouseDown, this);
      },
      removeHooks: function() {
        Mt(this._container, "mousedown", this._onMouseDown, this);
      },
      moved: function() {
        return this._moved;
      },
      _destroy: function() {
        zt(this._pane), delete this._pane;
      },
      _resetState: function() {
        this._resetStateTimeout = 0, this._moved = !1;
      },
      _clearDeferredResetState: function() {
        this._resetStateTimeout !== 0 && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0);
      },
      _onMouseDown: function(s) {
        if (!s.shiftKey || s.which !== 1 && s.button !== 1)
          return !1;
        this._clearDeferredResetState(), this._resetState(), Gs(), Gl(), this._startPoint = this._map.mouseEventToContainerPoint(s), lt(document, {
          contextmenu: bi,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseMove: function(s) {
        this._moved || (this._moved = !0, this._box = vt("div", "leaflet-zoom-box", this._container), ct(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(s);
        var l = new tt(this._point, this._startPoint), h = l.getSize();
        Zt(this._box, l.min), this._box.style.width = h.x + "px", this._box.style.height = h.y + "px";
      },
      _finish: function() {
        this._moved && (zt(this._box), Ft(this._container, "leaflet-crosshair")), Qs(), Ql(), Mt(document, {
          contextmenu: bi,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseUp: function(s) {
        if (!(s.which !== 1 && s.button !== 1) && (this._finish(), !!this._moved)) {
          this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(a(this._resetState, this), 0);
          var l = new St(
            this._map.containerPointToLatLng(this._startPoint),
            this._map.containerPointToLatLng(this._point)
          );
          this._map.fitBounds(l).fire("boxzoomend", { boxZoomBounds: l });
        }
      },
      _onKeyDown: function(s) {
        s.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
      }
    });
    gt.addInitHook("addHandler", "boxZoom", yf), gt.mergeOptions({
      // @option doubleClickZoom: Boolean|String = true
      // Whether the map can be zoomed in by double clicking on it and
      // zoomed out by double clicking while holding shift. If passed
      // `'center'`, double-click zoom will zoom to the center of the
      //  view regardless of where the mouse was.
      doubleClickZoom: !0
    });
    var xf = ln.extend({
      addHooks: function() {
        this._map.on("dblclick", this._onDoubleClick, this);
      },
      removeHooks: function() {
        this._map.off("dblclick", this._onDoubleClick, this);
      },
      _onDoubleClick: function(s) {
        var l = this._map, h = l.getZoom(), f = l.options.zoomDelta, _ = s.originalEvent.shiftKey ? h - f : h + f;
        l.options.doubleClickZoom === "center" ? l.setZoom(_) : l.setZoomAround(s.containerPoint, _);
      }
    });
    gt.addInitHook("addHandler", "doubleClickZoom", xf), gt.mergeOptions({
      // @option dragging: Boolean = true
      // Whether the map is draggable with mouse/touch or not.
      dragging: !0,
      // @section Panning Inertia Options
      // @option inertia: Boolean = *
      // If enabled, panning of the map will have an inertia effect where
      // the map builds momentum while dragging and continues moving in
      // the same direction for some time. Feels especially nice on touch
      // devices. Enabled by default.
      inertia: !0,
      // @option inertiaDeceleration: Number = 3000
      // The rate with which the inertial movement slows down, in pixels/second².
      inertiaDeceleration: 3400,
      // px/s^2
      // @option inertiaMaxSpeed: Number = Infinity
      // Max speed of the inertial movement, in pixels/second.
      inertiaMaxSpeed: 1 / 0,
      // px/s
      // @option easeLinearity: Number = 0.2
      easeLinearity: 0.2,
      // TODO refactor, move to CRS
      // @option worldCopyJump: Boolean = false
      // With this option enabled, the map tracks when you pan to another "copy"
      // of the world and seamlessly jumps to the original one so that all overlays
      // like markers and vector layers are still visible.
      worldCopyJump: !1,
      // @option maxBoundsViscosity: Number = 0.0
      // If `maxBounds` is set, this option will control how solid the bounds
      // are when dragging the map around. The default value of `0.0` allows the
      // user to drag outside the bounds at normal speed, higher values will
      // slow down map dragging outside bounds, and `1.0` makes the bounds fully
      // solid, preventing the user from dragging outside the bounds.
      maxBoundsViscosity: 0
    });
    var wf = ln.extend({
      addHooks: function() {
        if (!this._draggable) {
          var s = this._map;
          this._draggable = new Wn(s._mapPane, s._container), this._draggable.on({
            dragstart: this._onDragStart,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this), this._draggable.on("predrag", this._onPreDragLimit, this), s.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), s.on("zoomend", this._onZoomEnd, this), s.whenReady(this._onZoomEnd, this));
        }
        ct(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
      },
      removeHooks: function() {
        Ft(this._map._container, "leaflet-grab"), Ft(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      moving: function() {
        return this._draggable && this._draggable._moving;
      },
      _onDragStart: function() {
        var s = this._map;
        if (s._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
          var l = dt(this._map.options.maxBounds);
          this._offsetLimit = ot(
            this._map.latLngToContainerPoint(l.getNorthWest()).multiplyBy(-1),
            this._map.latLngToContainerPoint(l.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
          ), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
        } else
          this._offsetLimit = null;
        s.fire("movestart").fire("dragstart"), s.options.inertia && (this._positions = [], this._times = []);
      },
      _onDrag: function(s) {
        if (this._map.options.inertia) {
          var l = this._lastTime = +/* @__PURE__ */ new Date(), h = this._lastPos = this._draggable._absPos || this._draggable._newPos;
          this._positions.push(h), this._times.push(l), this._prunePositions(l);
        }
        this._map.fire("move", s).fire("drag", s);
      },
      _prunePositions: function(s) {
        for (; this._positions.length > 1 && s - this._times[0] > 50; )
          this._positions.shift(), this._times.shift();
      },
      _onZoomEnd: function() {
        var s = this._map.getSize().divideBy(2), l = this._map.latLngToLayerPoint([0, 0]);
        this._initialWorldOffset = l.subtract(s).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
      },
      _viscousLimit: function(s, l) {
        return s - (s - l) * this._viscosity;
      },
      _onPreDragLimit: function() {
        if (!(!this._viscosity || !this._offsetLimit)) {
          var s = this._draggable._newPos.subtract(this._draggable._startPos), l = this._offsetLimit;
          s.x < l.min.x && (s.x = this._viscousLimit(s.x, l.min.x)), s.y < l.min.y && (s.y = this._viscousLimit(s.y, l.min.y)), s.x > l.max.x && (s.x = this._viscousLimit(s.x, l.max.x)), s.y > l.max.y && (s.y = this._viscousLimit(s.y, l.max.y)), this._draggable._newPos = this._draggable._startPos.add(s);
        }
      },
      _onPreDragWrap: function() {
        var s = this._worldWidth, l = Math.round(s / 2), h = this._initialWorldOffset, f = this._draggable._newPos.x, _ = (f - l + h) % s + l - h, x = (f + l + h) % s - l - h, C = Math.abs(_ + h) < Math.abs(x + h) ? _ : x;
        this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = C;
      },
      _onDragEnd: function(s) {
        var l = this._map, h = l.options, f = !h.inertia || s.noInertia || this._times.length < 2;
        if (l.fire("dragend", s), f)
          l.fire("moveend");
        else {
          this._prunePositions(+/* @__PURE__ */ new Date());
          var _ = this._lastPos.subtract(this._positions[0]), x = (this._lastTime - this._times[0]) / 1e3, C = h.easeLinearity, E = _.multiplyBy(C / x), z = E.distanceTo([0, 0]), R = Math.min(h.inertiaMaxSpeed, z), Z = E.multiplyBy(R / z), nt = R / (h.inertiaDeceleration * C), ft = Z.multiplyBy(-nt / 2).round();
          !ft.x && !ft.y ? l.fire("moveend") : (ft = l._limitOffset(ft, l.options.maxBounds), V(function() {
            l.panBy(ft, {
              duration: nt,
              easeLinearity: C,
              noMoveStart: !0,
              animate: !0
            });
          }));
        }
      }
    });
    gt.addInitHook("addHandler", "dragging", wf), gt.mergeOptions({
      // @option keyboard: Boolean = true
      // Makes the map focusable and allows users to navigate the map with keyboard
      // arrows and `+`/`-` keys.
      keyboard: !0,
      // @option keyboardPanDelta: Number = 80
      // Amount of pixels to pan when pressing an arrow key.
      keyboardPanDelta: 80
    });
    var bf = ln.extend({
      keyCodes: {
        left: [37],
        right: [39],
        down: [40],
        up: [38],
        zoomIn: [187, 107, 61, 171],
        zoomOut: [189, 109, 54, 173]
      },
      initialize: function(s) {
        this._map = s, this._setPanDelta(s.options.keyboardPanDelta), this._setZoomDelta(s.options.zoomDelta);
      },
      addHooks: function() {
        var s = this._map._container;
        s.tabIndex <= 0 && (s.tabIndex = "0"), lt(s, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this), this._map.on({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      removeHooks: function() {
        this._removeHooks(), Mt(this._map._container, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this), this._map.off({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      _onMouseDown: function() {
        if (!this._focused) {
          var s = document.body, l = document.documentElement, h = s.scrollTop || l.scrollTop, f = s.scrollLeft || l.scrollLeft;
          this._map._container.focus(), window.scrollTo(f, h);
        }
      },
      _onFocus: function() {
        this._focused = !0, this._map.fire("focus");
      },
      _onBlur: function() {
        this._focused = !1, this._map.fire("blur");
      },
      _setPanDelta: function(s) {
        var l = this._panKeys = {}, h = this.keyCodes, f, _;
        for (f = 0, _ = h.left.length; f < _; f++)
          l[h.left[f]] = [-1 * s, 0];
        for (f = 0, _ = h.right.length; f < _; f++)
          l[h.right[f]] = [s, 0];
        for (f = 0, _ = h.down.length; f < _; f++)
          l[h.down[f]] = [0, s];
        for (f = 0, _ = h.up.length; f < _; f++)
          l[h.up[f]] = [0, -1 * s];
      },
      _setZoomDelta: function(s) {
        var l = this._zoomKeys = {}, h = this.keyCodes, f, _;
        for (f = 0, _ = h.zoomIn.length; f < _; f++)
          l[h.zoomIn[f]] = s;
        for (f = 0, _ = h.zoomOut.length; f < _; f++)
          l[h.zoomOut[f]] = -s;
      },
      _addHooks: function() {
        lt(document, "keydown", this._onKeyDown, this);
      },
      _removeHooks: function() {
        Mt(document, "keydown", this._onKeyDown, this);
      },
      _onKeyDown: function(s) {
        if (!(s.altKey || s.ctrlKey || s.metaKey)) {
          var l = s.keyCode, h = this._map, f;
          if (l in this._panKeys) {
            if (!h._panAnim || !h._panAnim._inProgress)
              if (f = this._panKeys[l], s.shiftKey && (f = D(f).multiplyBy(3)), h.options.maxBounds && (f = h._limitOffset(D(f), h.options.maxBounds)), h.options.worldCopyJump) {
                var _ = h.wrapLatLng(h.unproject(h.project(h.getCenter()).add(f)));
                h.panTo(_);
              } else
                h.panBy(f);
          } else if (l in this._zoomKeys)
            h.setZoom(h.getZoom() + (s.shiftKey ? 3 : 1) * this._zoomKeys[l]);
          else if (l === 27 && h._popup && h._popup.options.closeOnEscapeKey)
            h.closePopup();
          else
            return;
          bi(s);
        }
      }
    });
    gt.addInitHook("addHandler", "keyboard", bf), gt.mergeOptions({
      // @section Mouse wheel options
      // @option scrollWheelZoom: Boolean|String = true
      // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,
      // it will zoom to the center of the view regardless of where the mouse was.
      scrollWheelZoom: !0,
      // @option wheelDebounceTime: Number = 40
      // Limits the rate at which a wheel can fire (in milliseconds). By default
      // user can't zoom via wheel more often than once per 40 ms.
      wheelDebounceTime: 40,
      // @option wheelPxPerZoomLevel: Number = 60
      // How many scroll pixels (as reported by [L.DomEvent.getWheelDelta](#domevent-getwheeldelta))
      // mean a change of one full zoom level. Smaller values will make wheel-zooming
      // faster (and vice versa).
      wheelPxPerZoomLevel: 60
    });
    var kf = ln.extend({
      addHooks: function() {
        lt(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
      },
      removeHooks: function() {
        Mt(this._map._container, "wheel", this._onWheelScroll, this);
      },
      _onWheelScroll: function(s) {
        var l = $d(s), h = this._map.options.wheelDebounceTime;
        this._delta += l, this._lastMousePos = this._map.mouseEventToContainerPoint(s), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
        var f = Math.max(h - (+/* @__PURE__ */ new Date() - this._startTime), 0);
        clearTimeout(this._timer), this._timer = setTimeout(a(this._performZoom, this), f), bi(s);
      },
      _performZoom: function() {
        var s = this._map, l = s.getZoom(), h = this._map.options.zoomSnap || 0;
        s._stop();
        var f = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), _ = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(f)))) / Math.LN2, x = h ? Math.ceil(_ / h) * h : _, C = s._limitZoom(l + (this._delta > 0 ? x : -x)) - l;
        this._delta = 0, this._startTime = null, C && (s.options.scrollWheelZoom === "center" ? s.setZoom(l + C) : s.setZoomAround(this._lastMousePos, l + C));
      }
    });
    gt.addInitHook("addHandler", "scrollWheelZoom", kf);
    var U0 = 600;
    gt.mergeOptions({
      // @section Touch interaction options
      // @option tapHold: Boolean
      // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
      tapHold: Q.touchNative && Q.safari && Q.mobile,
      // @option tapTolerance: Number = 15
      // The max number of pixels a user can shift his finger during touch
      // for it to be considered a valid tap.
      tapTolerance: 15
    });
    var Sf = ln.extend({
      addHooks: function() {
        lt(this._map._container, "touchstart", this._onDown, this);
      },
      removeHooks: function() {
        Mt(this._map._container, "touchstart", this._onDown, this);
      },
      _onDown: function(s) {
        if (clearTimeout(this._holdTimeout), s.touches.length === 1) {
          var l = s.touches[0];
          this._startPos = this._newPos = new I(l.clientX, l.clientY), this._holdTimeout = setTimeout(a(function() {
            this._cancel(), this._isTapValid() && (lt(document, "touchend", ie), lt(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", l));
          }, this), U0), lt(document, "touchend touchcancel contextmenu", this._cancel, this), lt(document, "touchmove", this._onMove, this);
        }
      },
      _cancelClickPrevent: function s() {
        Mt(document, "touchend", ie), Mt(document, "touchend touchcancel", s);
      },
      _cancel: function() {
        clearTimeout(this._holdTimeout), Mt(document, "touchend touchcancel contextmenu", this._cancel, this), Mt(document, "touchmove", this._onMove, this);
      },
      _onMove: function(s) {
        var l = s.touches[0];
        this._newPos = new I(l.clientX, l.clientY);
      },
      _isTapValid: function() {
        return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
      },
      _simulateEvent: function(s, l) {
        var h = new MouseEvent(s, {
          bubbles: !0,
          cancelable: !0,
          view: window,
          // detail: 1,
          screenX: l.screenX,
          screenY: l.screenY,
          clientX: l.clientX,
          clientY: l.clientY
          // button: 2,
          // buttons: 2
        });
        h._simulated = !0, l.target.dispatchEvent(h);
      }
    });
    gt.addInitHook("addHandler", "tapHold", Sf), gt.mergeOptions({
      // @section Touch interaction options
      // @option touchZoom: Boolean|String = *
      // Whether the map can be zoomed by touch-dragging with two fingers. If
      // passed `'center'`, it will zoom to the center of the view regardless of
      // where the touch events (fingers) were. Enabled for touch-capable web
      // browsers.
      touchZoom: Q.touch,
      // @option bounceAtZoomLimits: Boolean = true
      // Set it to false if you don't want the map to zoom beyond min/max zoom
      // and then bounce back when pinch-zooming.
      bounceAtZoomLimits: !0
    });
    var Pf = ln.extend({
      addHooks: function() {
        ct(this._map._container, "leaflet-touch-zoom"), lt(this._map._container, "touchstart", this._onTouchStart, this);
      },
      removeHooks: function() {
        Ft(this._map._container, "leaflet-touch-zoom"), Mt(this._map._container, "touchstart", this._onTouchStart, this);
      },
      _onTouchStart: function(s) {
        var l = this._map;
        if (!(!s.touches || s.touches.length !== 2 || l._animatingZoom || this._zooming)) {
          var h = l.mouseEventToContainerPoint(s.touches[0]), f = l.mouseEventToContainerPoint(s.touches[1]);
          this._centerPoint = l.getSize()._divideBy(2), this._startLatLng = l.containerPointToLatLng(this._centerPoint), l.options.touchZoom !== "center" && (this._pinchStartLatLng = l.containerPointToLatLng(h.add(f)._divideBy(2))), this._startDist = h.distanceTo(f), this._startZoom = l.getZoom(), this._moved = !1, this._zooming = !0, l._stop(), lt(document, "touchmove", this._onTouchMove, this), lt(document, "touchend touchcancel", this._onTouchEnd, this), ie(s);
        }
      },
      _onTouchMove: function(s) {
        if (!(!s.touches || s.touches.length !== 2 || !this._zooming)) {
          var l = this._map, h = l.mouseEventToContainerPoint(s.touches[0]), f = l.mouseEventToContainerPoint(s.touches[1]), _ = h.distanceTo(f) / this._startDist;
          if (this._zoom = l.getScaleZoom(_, this._startZoom), !l.options.bounceAtZoomLimits && (this._zoom < l.getMinZoom() && _ < 1 || this._zoom > l.getMaxZoom() && _ > 1) && (this._zoom = l._limitZoom(this._zoom)), l.options.touchZoom === "center") {
            if (this._center = this._startLatLng, _ === 1)
              return;
          } else {
            var x = h._add(f)._divideBy(2)._subtract(this._centerPoint);
            if (_ === 1 && x.x === 0 && x.y === 0)
              return;
            this._center = l.unproject(l.project(this._pinchStartLatLng, this._zoom).subtract(x), this._zoom);
          }
          this._moved || (l._moveStart(!0, !1), this._moved = !0), K(this._animRequest);
          var C = a(l._move, l, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
          this._animRequest = V(C, this, !0), ie(s);
        }
      },
      _onTouchEnd: function() {
        if (!this._moved || !this._zooming) {
          this._zooming = !1;
          return;
        }
        this._zooming = !1, K(this._animRequest), Mt(document, "touchmove", this._onTouchMove, this), Mt(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
      }
    });
    gt.addInitHook("addHandler", "touchZoom", Pf), gt.BoxZoom = yf, gt.DoubleClickZoom = xf, gt.Drag = wf, gt.Keyboard = bf, gt.ScrollWheelZoom = kf, gt.TapHold = Sf, gt.TouchZoom = Pf, n.Bounds = tt, n.Browser = Q, n.CRS = Dt, n.Canvas = mf, n.Circle = fc, n.CircleMarker = zo, n.Class = $, n.Control = Ke, n.DivIcon = df, n.DivOverlay = cn, n.DomEvent = c0, n.DomUtil = a0, n.Draggable = Wn, n.Evented = ht, n.FeatureGroup = xn, n.GeoJSON = bn, n.GridLayer = sr, n.Handler = ln, n.Icon = es, n.ImageOverlay = Ro, n.LatLng = at, n.LatLngBounds = St, n.Layer = Xe, n.LayerGroup = ts, n.LineUtil = b0, n.Map = gt, n.Marker = Eo, n.Mixin = g0, n.Path = Vn, n.Point = I, n.PolyUtil = _0, n.Polygon = ns, n.Polyline = wn, n.Popup = Do, n.PosAnimation = Yd, n.Projection = k0, n.Rectangle = vf, n.Renderer = kn, n.SVG = or, n.SVGOverlay = hf, n.TileLayer = ss, n.Tooltip = Fo, n.Transformation = $s, n.Util = yt, n.VideoOverlay = uf, n.bind = a, n.bounds = ot, n.canvas = gf, n.circle = E0, n.circleMarker = N0, n.control = er, n.divIcon = B0, n.extend = r, n.featureGroup = C0, n.geoJSON = cf, n.geoJson = O0, n.gridLayer = H0, n.icon = L0, n.imageOverlay = A0, n.latLng = G, n.latLngBounds = dt, n.layerGroup = M0, n.map = u0, n.marker = T0, n.point = D, n.polygon = j0, n.polyline = z0, n.popup = D0, n.rectangle = Z0, n.setOptions = w, n.stamp = u, n.svg = _f, n.svgOverlay = R0, n.tileLayer = ff, n.tooltip = F0, n.transformation = Bn, n.version = i, n.videoOverlay = I0;
    var $0 = window.L;
    n.noConflict = function() {
      return window.L = $0, this;
    }, window.L = n;
  });
})(dh, dh.exports);
var WM = dh.exports;
const va = /* @__PURE__ */ fg(WM), fh = "".trim().replace(/\/$/, ""), xt = (e) => fh ? `${fh}${e}` : e, kd = "wildlife_admin_token", ag = fh.replace(/^http/, "ws"), VM = (e) => ag ? `${ag}${e}` : `ws://${window.location.host}${e}`, ZM = 2e4, Bt = {
  adminLogin: xt("/api/admin/login"),
  adminLogout: xt("/api/admin/logout"),
  adminRefresh: xt("/api/admin/refresh"),
  summary: xt("/api/dashboard-summary"),
  chart: xt("/api/chart-data"),
  map: xt("/api/map-data"),
  alerts: xt("/api/alerts?limit=60"),
  reports: xt("/api/reports?limit=50"),
  osint: xt("/api/osint-feed?limit=30"),
  syncStatus: xt("/api/sync-status"),
  filterNews: xt("/api/filter-news"),
  exportCsv: xt("/api/export/csv"),
  exportPdf: xt("/api/export/pdf"),
  exportExcel: xt("/api/export/excel"),
  exportExcelIncidentsReports: xt("/api/export/excel-incidents-reports"),
  exportBriefing: xt("/api/export/briefing-pack"),
  publicDownloadCsv: xt("/api/public/download-csv"),
  publicDownloadDb: xt("/api/public/download-db"),
  publicUploadDb: xt("/api/public/upload-db"),
  predictions: xt("/api/predictions"),
  predictionsTrain: xt("/api/predictions/train"),
  predictionsHotspots: xt("/api/predictions/hotspots"),
  predictionsPersons: xt("/api/predictions/persons"),
  graphNetworks: xt("/api/graph/networks"),
  graphPersonProfile: (e) => xt(`/api/graph/person/${encodeURIComponent(e)}`),
  ragQuery: xt("/api/rag/query"),
  searchSemantic: xt("/api/search/semantic"),
  adminReanalyze: xt("/api/admin/reanalyze"),
  reviewIncident: (e) => xt(`/api/incidents/${e}/review`),
  wsLive: (e) => VM(`/api/ws/live?token=${e}`)
};
function Zs(e, t = "") {
  const n = String(e || "").trim() || String(t || "").trim();
  return n ? /^https?:\/\//i.test(n) ? n : n.startsWith("//") ? `https:${n}` : n.startsWith("/") ? xt(n) : n.startsWith("www.") ? `https://${n}` : /^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(n) ? `https://${n}` : "#" : "#";
}
async function Sd(e, t = {}, n = ZM) {
  const i = new AbortController(), r = new AbortController(), o = [i.signal, t.signal].filter(Boolean), a = () => r.abort(), c = setTimeout(() => i.abort(), n);
  o.forEach((u) => {
    if (u.aborted) {
      a();
      return;
    }
    u.addEventListener("abort", a, { once: !0 });
  });
  try {
    return await fetch(e, { ...t, signal: r.signal });
  } finally {
    clearTimeout(c), o.forEach((u) => u.removeEventListener("abort", a));
  }
}
async function mn(e, { retry: t = !0, signal: n } = {}) {
  const i = Wl(), r = i ? { Authorization: `Bearer ${i}` } : {}, o = await Sd(e, { cache: "no-store", headers: r, signal: n });
  if (o.status === 401 && t && i && await Pd())
    return mn(e, { retry: !1, signal: n });
  if (!o.ok) {
    let a = "";
    try {
      const u = await o.json();
      a = String((u == null ? void 0 : u.detail) || "").trim();
    } catch {
      a = "";
    }
    const c = new Error(a || `HTTP ${o.status}`);
    throw c.status = o.status, c;
  }
  return o.json();
}
async function Ns(e, t, { includeAuth: n = !0, retry: i = !0, signal: r } = {}) {
  const o = n ? Wl() : "", a = { "Content-Type": "application/json" };
  o && (a.Authorization = `Bearer ${o}`);
  const c = await Sd(e, {
    method: "POST",
    headers: a,
    body: JSON.stringify(t || {}),
    signal: r
  });
  if (c.status === 401 && i && o && n && await Pd())
    return Ns(e, t, { includeAuth: n, retry: !1, signal: r });
  if (!c.ok) {
    let u = "";
    try {
      const p = await c.json();
      u = String((p == null ? void 0 : p.detail) || "").trim();
    } catch {
      u = "";
    }
    const d = new Error(u || `HTTP ${c.status}`);
    throw d.status = c.status, d;
  }
  return c.json();
}
async function Ny(e, t, { includeAuth: n = !0, retry: i = !0, signal: r } = {}) {
  const o = n ? Wl() : "", a = { "Content-Type": "application/json" };
  o && (a.Authorization = `Bearer ${o}`);
  const c = await Sd(e, {
    method: "PATCH",
    headers: a,
    body: JSON.stringify(t || {}),
    signal: r
  });
  if (c.status === 401 && i && o && n && await Pd())
    return Ny(e, t, { includeAuth: n, retry: !1, signal: r });
  if (!c.ok) {
    let u = "";
    try {
      const p = await c.json();
      u = String((p == null ? void 0 : p.detail) || "").trim();
    } catch {
      u = "";
    }
    const d = new Error(u || `HTTP ${c.status}`);
    throw d.status = c.status, d;
  }
  return c.json();
}
async function Pd() {
  try {
    const e = await Ns(Bt.adminRefresh, {}, { includeAuth: !1 });
    if (e != null && e.access_token)
      return Ey(e.access_token), !0;
  } catch (e) {
    console.error("Token refresh failed:", e);
  }
  return !1;
}
function Wl() {
  return String(localStorage.getItem(kd) || "").trim();
}
function Ey(e) {
  const t = String(e || "").trim();
  t && localStorage.setItem(kd, t);
}
function UM() {
  localStorage.removeItem(kd);
}
function lg(e) {
  const t = new URLSearchParams();
  return Object.entries(e).forEach(([n, i]) => {
    String(i || "").trim() !== "" && t.set(n, i);
  }), t.toString();
}
function $M({ mapData: e, onMapError: t }) {
  var a;
  const n = W.useRef(null), i = W.useRef(null), r = W.useRef(null);
  W.useEffect(() => {
    var c, u;
    if (!(!n.current || !e))
      try {
        i.current || (i.current = va.map(n.current, { zoomControl: !0, attributionControl: !0 }).setView(
          [((c = e.center) == null ? void 0 : c.lat) || 22.97, ((u = e.center) == null ? void 0 : u.lng) || 78.65],
          5
        ), va.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 12,
          attribution: "&copy; OpenStreetMap contributors"
        }).addTo(i.current), r.current = va.layerGroup().addTo(i.current));
        const d = r.current;
        if (!d) return;
        d.clearLayers(), (e.markers || []).slice(0, 600).forEach((p) => {
          if (typeof p.lat != "number" || typeof p.lng != "number") return;
          const g = Hl(p.risk_score), v = g === "high" ? "#C75050" : g === "medium" ? "#C9933D" : "#5A9E6F", y = va.circleMarker([p.lat, p.lng], {
            radius: g === "high" ? 8 : g === "medium" ? 7 : 6,
            color: v,
            fillColor: v,
            fillOpacity: 0.8,
            weight: 2
          }), S = (p.title || "Incident").replace(/</g, "&lt;"), w = Zs(p.open_url, p.url).replace(/"/g, "&quot;");
          y.bindPopup(
            `<div style="min-width:240px;font-family:Inter,sans-serif">
            <b style="font-size:14px;color:#1A1917">${S}</b>
            <div style="margin-top:6px;color:#6B6966;font-size:12px">${p.state || "-"} · ${p.district || "-"}</div>
            <div style="margin-top:8px;font-size:13px;color:#1A1917">Risk <b style="color:${v}">${Number(p.risk_score || 0)}</b> · ${p.species || "—"}</div>
            <a href="${w}" target="_blank" rel="noopener" style="display:inline-block;margin-top:10px;color:#C17F59;font-weight:500">Open article →</a>
          </div>`
          ), y.addTo(d);
        });
      } catch (d) {
        console.error("Map rendering failed:", d), t == null || t("Map failed to render on this browser. Use legacy view as fallback.");
      }
  }, [e, t]);
  const o = ((a = e == null ? void 0 : e.markers) == null ? void 0 : a.length) || 0;
  return /* @__PURE__ */ m.jsxs("article", { className: "card map-card", id: "section-map", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ m.jsx(ky, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ m.jsx("h2", { children: "National Threat Map" })
      ] }),
      /* @__PURE__ */ m.jsxs("span", { className: "card-count mono", children: [
        o,
        " markers"
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "card-body-flush", style: { position: "relative", minHeight: 460 }, children: /* @__PURE__ */ m.jsx("div", { className: "map-surface", ref: n }) }),
    /* @__PURE__ */ m.jsxs("div", { className: "map-legend", children: [
      /* @__PURE__ */ m.jsx("span", { className: "legend-dot high", children: "High risk" }),
      /* @__PURE__ */ m.jsx("span", { className: "legend-dot medium", children: "Medium" }),
      /* @__PURE__ */ m.jsx("span", { className: "legend-dot low", children: "Low" }),
      /* @__PURE__ */ m.jsx("span", { style: { marginLeft: "auto", color: "var(--dim)" }, children: "Tap a marker for details" })
    ] })
  ] });
}
const zy = "label";
function cg(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
function YM(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function jy(e, t) {
  e.labels = t;
}
function Oy(e, t, n = zy) {
  const i = [];
  e.datasets = t.map((r) => {
    const o = e.datasets.find((a) => a[n] === r[n]);
    return !o || !r.data || i.includes(o) ? {
      ...r
    } : (i.push(o), Object.assign(o, r), o);
  });
}
function qM(e, t = zy) {
  const n = {
    labels: [],
    datasets: []
  };
  return jy(n, e.labels), Oy(n, e.datasets, t), n;
}
function KM(e, t) {
  const { height: n = 150, width: i = 300, redraw: r = !1, datasetIdKey: o, type: a, data: c, options: u, plugins: d = [], fallbackContent: p, updateMode: g, ...v } = e, y = W.useRef(null), S = W.useRef(null), w = () => {
    y.current && (S.current = new Dl(y.current, {
      type: a,
      data: qM(c, o),
      options: u && {
        ...u
      },
      plugins: d
    }), cg(t, S.current));
  }, M = () => {
    cg(t, null), S.current && (S.current.destroy(), S.current = null);
  };
  return W.useEffect(() => {
    !r && S.current && u && YM(S.current, u);
  }, [
    r,
    u
  ]), W.useEffect(() => {
    !r && S.current && jy(S.current.config.data, c.labels);
  }, [
    r,
    c.labels
  ]), W.useEffect(() => {
    !r && S.current && c.datasets && Oy(S.current.config.data, c.datasets, o);
  }, [
    r,
    c.datasets
  ]), W.useEffect(() => {
    S.current && (r ? (M(), setTimeout(w)) : S.current.update(g));
  }, [
    r,
    u,
    c.labels,
    c.datasets,
    g
  ]), W.useEffect(() => {
    S.current && (M(), setTimeout(w));
  }, [
    a
  ]), W.useEffect(() => (w(), () => M()), []), /* @__PURE__ */ m.jsx("canvas", {
    ref: y,
    role: "img",
    height: n,
    width: i,
    ...v,
    children: p
  });
}
const XM = /* @__PURE__ */ W.forwardRef(KM);
function Md(e, t) {
  return Dl.register(t), /* @__PURE__ */ W.forwardRef((n, i) => /* @__PURE__ */ m.jsx(XM, {
    ...n,
    ref: i,
    type: e
  }));
}
const GM = /* @__PURE__ */ Md("line", ja), ug = /* @__PURE__ */ Md("bar", za), QM = /* @__PURE__ */ Md("doughnut", Pr), ph = "#6B6966", hg = "rgba(26, 25, 23, 0.06)", Ay = "#6B6966", cs = {
  responsive: !0,
  maintainAspectRatio: !1,
  interaction: { mode: "index", intersect: !1 },
  plugins: {
    legend: {
      labels: {
        color: Ay,
        font: { family: "Inter, sans-serif", size: 11, weight: "500" },
        usePointStyle: !0,
        boxWidth: 8,
        padding: 14
      }
    },
    tooltip: {
      backgroundColor: "#FFFFFF",
      borderColor: "rgba(26, 25, 23, 0.12)",
      borderWidth: 1,
      titleColor: "#1A1917",
      bodyColor: "#6B6966",
      padding: 12,
      boxPadding: 6,
      cornerRadius: 12,
      titleFont: { family: "Inter, sans-serif", size: 13, weight: "600" },
      bodyFont: { family: "JetBrains Mono, monospace", size: 11 }
    }
  },
  scales: {
    x: {
      ticks: { color: ph, font: { family: "Inter, sans-serif", size: 10 } },
      grid: { color: hg, drawBorder: !1 },
      border: { display: !1 }
    },
    y: {
      ticks: { color: ph, font: { family: "JetBrains Mono, monospace", size: 10 } },
      grid: { color: hg, drawBorder: !1 },
      border: { display: !1 }
    }
  }
}, JM = {
  responsive: !0,
  maintainAspectRatio: !1,
  cutout: "62%",
  plugins: {
    legend: {
      position: "right",
      labels: {
        color: Ay,
        font: { family: "Inter, sans-serif", size: 11 },
        usePointStyle: !0,
        boxWidth: 8,
        padding: 10
      }
    },
    tooltip: cs.plugins.tooltip
  }
};
function tC({ chartData: e }) {
  const t = (e == null ? void 0 : e.timeline) || { labels: [], incidents: [], high_risk: [], granularity: "monthly" }, n = (e == null ? void 0 : e.top_states) || [], i = (e == null ? void 0 : e.species_dist) || (e == null ? void 0 : e.species_distribution) || [], r = (e == null ? void 0 : e.source_rank) || (e == null ? void 0 : e.source_rankings) || [], o = {
    labels: t.labels,
    datasets: [
      {
        label: "Incidents",
        data: t.incidents,
        borderColor: "#C17F59",
        backgroundColor: (g) => {
          const { ctx: v, chartArea: y } = g.chart;
          if (!y) return "rgba(193, 127, 89, 0.12)";
          const S = v.createLinearGradient(0, y.top, 0, y.bottom);
          return S.addColorStop(0, "rgba(193, 127, 89, 0.2)"), S.addColorStop(1, "rgba(193, 127, 89, 0)"), S;
        },
        fill: !0,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#C17F59"
      },
      {
        label: "High Risk",
        data: t.high_risk,
        borderColor: "#C75050",
        backgroundColor: (g) => {
          const { ctx: v, chartArea: y } = g.chart;
          if (!y) return "rgba(199, 80, 80, 0.1)";
          const S = v.createLinearGradient(0, y.top, 0, y.bottom);
          return S.addColorStop(0, "rgba(199, 80, 80, 0.18)"), S.addColorStop(1, "rgba(199, 80, 80, 0)"), S;
        },
        fill: !0,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#C75050"
      }
    ]
  }, a = {
    labels: n.map((g) => g.state),
    datasets: [
      {
        label: "Incidents",
        data: n.map((g) => g.count),
        backgroundColor: "rgba(193, 127, 89, 0.75)",
        hoverBackgroundColor: "#C17F59",
        borderRadius: 6,
        borderSkipped: !1,
        barThickness: 16
      }
    ]
  }, c = [
    "#C17F59",
    "#D4956F",
    "#C9933D",
    "#C75050",
    "#5B7BA8",
    "#5A9E6F",
    "#8B7355",
    "#A67B5B",
    "#9C7B56",
    "#7D7471"
  ], u = {
    labels: i.slice(0, 10).map((g) => g.species),
    datasets: [
      {
        data: i.slice(0, 10).map((g) => g.count),
        backgroundColor: c,
        borderColor: "#FFFFFF",
        borderWidth: 3,
        hoverOffset: 8
      }
    ]
  }, d = {
    labels: r.slice(0, 10).map((g) => g.source),
    datasets: [
      {
        label: "Reliability",
        data: r.slice(0, 10).map((g) => Number(g.reliability_score || 0)),
        backgroundColor: "rgba(91, 123, 168, 0.75)",
        hoverBackgroundColor: "#5B7BA8",
        borderRadius: 6,
        borderSkipped: !1,
        barThickness: 14
      }
    ]
  }, p = {
    ...cs,
    indexAxis: "y",
    scales: {
      ...cs.scales,
      y: {
        ...cs.scales.y,
        ticks: { color: ph, font: { family: "Inter, sans-serif", size: 10 } }
      }
    }
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "charts-grid", id: "section-analytics", children: [
    /* @__PURE__ */ m.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ m.jsx(yy, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ m.jsx("h2", { children: "Incident Timeline" })
        ] }),
        /* @__PURE__ */ m.jsx("span", { className: "badge", children: t.granularity || "daily" })
      ] }),
      /* @__PURE__ */ m.jsx("div", { className: "card-body", children: /* @__PURE__ */ m.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ m.jsx(GM, { data: o, options: cs }) }) })
    ] }),
    /* @__PURE__ */ m.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ m.jsx(wy, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ m.jsx("h2", { children: "Top States" })
        ] }),
        /* @__PURE__ */ m.jsx("span", { className: "card-count mono", children: n.length })
      ] }),
      /* @__PURE__ */ m.jsx("div", { className: "card-body", children: /* @__PURE__ */ m.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ m.jsx(ug, { data: a, options: cs }) }) })
    ] }),
    /* @__PURE__ */ m.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ m.jsx(bP, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ m.jsx("h2", { children: "Species Distribution" })
        ] }),
        /* @__PURE__ */ m.jsx("span", { className: "card-count mono", children: i.length })
      ] }),
      /* @__PURE__ */ m.jsx("div", { className: "card-body", children: /* @__PURE__ */ m.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ m.jsx(QM, { data: u, options: JM }) }) })
    ] }),
    /* @__PURE__ */ m.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ m.jsx(Cy, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ m.jsx("h2", { children: "Source Reliability" })
        ] }),
        /* @__PURE__ */ m.jsx("span", { className: "card-count mono", children: r.length })
      ] }),
      /* @__PURE__ */ m.jsx("div", { className: "card-body", children: /* @__PURE__ */ m.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ m.jsx(ug, { data: d, options: p }) }) })
    ] })
  ] });
}
const eC = {
  q: "",
  species: "",
  state: "",
  date_from: "",
  date_to: "",
  crime_type: "",
  severity: "",
  source: ""
};
function nC({ filters: e, filterOptions: t, onChange: n, onApply: i, onBriefing: r }) {
  const o = Object.values(e).filter((u) => String(u || "").trim() !== "").length;
  function a(u, d) {
    n({ ...e, [u]: d });
  }
  function c() {
    n(eC);
  }
  return /* @__PURE__ */ m.jsxs("article", { className: "card filters-card", id: "section-incidents", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ m.jsx(og, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ m.jsx("h2", { children: "Analyst Filters" }),
        o > 0 ? /* @__PURE__ */ m.jsxs("span", { className: "badge", children: [
          o,
          " active"
        ] }) : null
      ] }),
      /* @__PURE__ */ m.jsxs("button", { type: "button", className: "btn btn-ghost", onClick: c, children: [
        /* @__PURE__ */ m.jsx(cM, { size: 14 }),
        /* @__PURE__ */ m.jsx("span", { className: "btn-label", children: "Reset" })
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "filter-grid", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "filter-field", style: { gridColumn: "span 2" }, children: [
          /* @__PURE__ */ m.jsx("label", { className: "filter-label", htmlFor: "f-search", children: "Search" }),
          /* @__PURE__ */ m.jsxs("div", { className: "input-with-icon", children: [
            /* @__PURE__ */ m.jsx(pM, { size: 14, className: "icon" }),
            /* @__PURE__ */ m.jsx(
              "input",
              {
                id: "f-search",
                className: "input",
                placeholder: "Search title, summary, or keywords",
                value: e.q,
                onChange: (u) => a("q", u.target.value),
                onKeyDown: (u) => {
                  u.key === "Enter" && i();
                }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ m.jsx("label", { className: "filter-label", htmlFor: "f-species", children: "Species" }),
          /* @__PURE__ */ m.jsxs(
            "select",
            {
              id: "f-species",
              className: "select",
              value: e.species,
              onChange: (u) => a("species", u.target.value),
              children: [
                /* @__PURE__ */ m.jsx("option", { value: "", children: "All species" }),
                (t.species || []).map((u) => /* @__PURE__ */ m.jsx("option", { value: u, children: u }, u))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ m.jsx("label", { className: "filter-label", htmlFor: "f-state", children: "State" }),
          /* @__PURE__ */ m.jsxs(
            "select",
            {
              id: "f-state",
              className: "select",
              value: e.state,
              onChange: (u) => a("state", u.target.value),
              children: [
                /* @__PURE__ */ m.jsx("option", { value: "", children: "All states" }),
                (t.states || []).map((u) => /* @__PURE__ */ m.jsx("option", { value: u, children: u }, u))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ m.jsx("label", { className: "filter-label", htmlFor: "f-crime", children: "Crime type" }),
          /* @__PURE__ */ m.jsxs(
            "select",
            {
              id: "f-crime",
              className: "select",
              value: e.crime_type,
              onChange: (u) => a("crime_type", u.target.value),
              children: [
                /* @__PURE__ */ m.jsx("option", { value: "", children: "All types" }),
                (t.crime_types || []).map((u) => /* @__PURE__ */ m.jsx("option", { value: u, children: u }, u))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ m.jsx("label", { className: "filter-label", htmlFor: "f-source", children: "Source" }),
          /* @__PURE__ */ m.jsxs(
            "select",
            {
              id: "f-source",
              className: "select",
              value: e.source,
              onChange: (u) => a("source", u.target.value),
              children: [
                /* @__PURE__ */ m.jsx("option", { value: "", children: "All sources" }),
                (t.sources || []).map((u) => /* @__PURE__ */ m.jsx("option", { value: u, children: u }, u))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ m.jsx("label", { className: "filter-label", htmlFor: "f-severity", children: "Severity" }),
          /* @__PURE__ */ m.jsxs(
            "select",
            {
              id: "f-severity",
              className: "select",
              value: e.severity,
              onChange: (u) => a("severity", u.target.value),
              children: [
                /* @__PURE__ */ m.jsx("option", { value: "", children: "All severity" }),
                /* @__PURE__ */ m.jsx("option", { value: "high", children: "High" }),
                /* @__PURE__ */ m.jsx("option", { value: "medium", children: "Medium" }),
                /* @__PURE__ */ m.jsx("option", { value: "low", children: "Low" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ m.jsx("label", { className: "filter-label", htmlFor: "f-from", children: "Date from" }),
          /* @__PURE__ */ m.jsx(
            "input",
            {
              id: "f-from",
              type: "date",
              className: "input",
              value: e.date_from,
              onChange: (u) => a("date_from", u.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ m.jsx("label", { className: "filter-label", htmlFor: "f-to", children: "Date to" }),
          /* @__PURE__ */ m.jsx(
            "input",
            {
              id: "f-to",
              type: "date",
              className: "input",
              value: e.date_to,
              onChange: (u) => a("date_to", u.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "filter-actions", children: [
        /* @__PURE__ */ m.jsx("div", { className: "filter-actions-left", children: o > 0 ? `${o} filter${o === 1 ? "" : "s"} applied` : "No filters applied" }),
        /* @__PURE__ */ m.jsxs("div", { className: "filter-actions-right", children: [
          /* @__PURE__ */ m.jsxs("button", { type: "button", className: "btn", onClick: r, children: [
            /* @__PURE__ */ m.jsx(xy, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Briefing Pack" })
          ] }),
          /* @__PURE__ */ m.jsxs("button", { type: "button", className: "btn btn-primary", onClick: i, children: [
            /* @__PURE__ */ m.jsx(og, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Apply Filters" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function iC({ rows: e, loading: t, onSelectRow: n }) {
  return /* @__PURE__ */ m.jsxs("article", { className: "card table-card", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ m.jsx(Ly, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ m.jsx("h2", { children: "Incident Intelligence" })
      ] }),
      /* @__PURE__ */ m.jsxs("span", { className: "card-count mono", children: [
        e.length,
        " rows"
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "card-body-flush", style: { maxHeight: "600px", overflowY: "auto" }, children: /* @__PURE__ */ m.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ m.jsxs("table", { className: "data-table", children: [
      /* @__PURE__ */ m.jsx("thead", { children: /* @__PURE__ */ m.jsxs("tr", { children: [
        /* @__PURE__ */ m.jsx("th", { children: "Date" }),
        /* @__PURE__ */ m.jsx("th", { children: "Risk" }),
        /* @__PURE__ */ m.jsx("th", { children: "Status" }),
        /* @__PURE__ */ m.jsx("th", { children: "Title" }),
        /* @__PURE__ */ m.jsx("th", { children: "Species" }),
        /* @__PURE__ */ m.jsx("th", { children: "State" }),
        /* @__PURE__ */ m.jsx("th", { children: "District" }),
        /* @__PURE__ */ m.jsx("th", { children: "Involved persons" }),
        /* @__PURE__ */ m.jsx("th", { children: "Crime type" }),
        /* @__PURE__ */ m.jsx("th", { children: "Source" }),
        /* @__PURE__ */ m.jsx("th", { children: "Conf." }),
        /* @__PURE__ */ m.jsx("th", { children: "Link" })
      ] }) }),
      /* @__PURE__ */ m.jsxs("tbody", { children: [
        e.map((i) => {
          const r = Hl(i.risk_score), o = i.review_status || "pending";
          return /* @__PURE__ */ m.jsxs(
            "tr",
            {
              onClick: () => n && n(i),
              style: { cursor: "pointer" },
              className: "clickable-row",
              children: [
                /* @__PURE__ */ m.jsx("td", { className: "cell-mono", children: Ty(i.date) }),
                /* @__PURE__ */ m.jsx("td", { children: /* @__PURE__ */ m.jsx("span", { className: `risk-pill ${r}`, children: i.risk_score }) }),
                /* @__PURE__ */ m.jsx("td", { children: /* @__PURE__ */ m.jsx("span", { className: `status-pill ${o}`, children: o }) }),
                /* @__PURE__ */ m.jsx("td", { className: "cell-title", children: i.title }),
                /* @__PURE__ */ m.jsx("td", { className: "cell-muted", children: i.species || "—" }),
                /* @__PURE__ */ m.jsx("td", { className: "cell-muted", children: i.state || "—" }),
                /* @__PURE__ */ m.jsx("td", { className: "cell-muted", children: i.district || "—" }),
                /* @__PURE__ */ m.jsx("td", { className: "cell-muted", children: i.involved_persons || "—" }),
                /* @__PURE__ */ m.jsx("td", { className: "cell-muted", children: i.crime_type || "—" }),
                /* @__PURE__ */ m.jsx("td", { className: "cell-muted", children: i.source || "—" }),
                /* @__PURE__ */ m.jsx("td", { className: "cell-mono", children: Number(i.confidence || 0).toFixed(2) }),
                /* @__PURE__ */ m.jsx("td", { children: /* @__PURE__ */ m.jsxs(
                  "a",
                  {
                    href: Zs(i.open_url, i.url),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "feed-link",
                    "aria-label": "Open source article",
                    onClick: (a) => a.stopPropagation(),
                    children: [
                      "Open ",
                      /* @__PURE__ */ m.jsx(yo, { size: 12 })
                    ]
                  }
                ) })
              ]
            },
            i.id
          );
        }),
        !e.length && !t ? /* @__PURE__ */ m.jsx("tr", { children: /* @__PURE__ */ m.jsxs("td", { colSpan: 12, className: "empty-cell", children: [
          /* @__PURE__ */ m.jsx("div", { className: "empty-cell-icon", children: /* @__PURE__ */ m.jsx(dM, { size: 20 }) }),
          "No incidents match the current filters."
        ] }) }) : null
      ] })
    ] }) }) })
  ] });
}
function sC() {
  var g, v, y, S;
  const [e, t] = W.useState(null), [n, i] = W.useState(!0), [r, o] = W.useState(null), [a, c] = W.useState(null), u = W.useRef(null), d = W.useRef(0), p = W.useCallback(async () => {
    var b;
    d.current += 1;
    const w = d.current;
    (b = u.current) == null || b.abort();
    const M = new AbortController();
    u.current = M, i(!0);
    try {
      const k = new URLSearchParams({ limit: "10000", min_size: "2", incident_limit: "10000" }), P = await mn(`${Bt.graphNetworks}?${k.toString()}`, { signal: M.signal });
      if (w !== d.current) return;
      t(P), c((T) => {
        if (!P.networks || P.networks.length === 0) return null;
        if (T != null && T.network_id) {
          const N = P.networks.find((j) => j.network_id === T.network_id);
          if (N) return N;
        }
        return P.networks[0];
      }), o(null);
    } catch (k) {
      if ((k == null ? void 0 : k.name) === "AbortError" || w !== d.current) return;
      o("Failed to load intelligence networks."), console.error("Failed to load intelligence networks:", k);
    } finally {
      w === d.current && i(!1);
    }
  }, []);
  return W.useEffect(() => (p(), () => {
    var w;
    d.current += 1, (w = u.current) == null || w.abort();
  }), [p]), n && !e ? /* @__PURE__ */ m.jsxs("div", { className: "network-loading", children: [
    /* @__PURE__ */ m.jsx(_l, { size: 24, className: "spin" }),
    /* @__PURE__ */ m.jsx("p", { children: "Analyzing criminal networks..." })
  ] }) : /* @__PURE__ */ m.jsxs("div", { className: "network-container", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "network-header", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "header-info", children: [
        /* @__PURE__ */ m.jsx(hh, { size: 24, className: "accent-icon" }),
        /* @__PURE__ */ m.jsxs("div", { children: [
          /* @__PURE__ */ m.jsx("h1", { children: "Intelligence Network Browser" }),
          /* @__PURE__ */ m.jsxs("p", { className: "subtitle", children: [
            "Visualizing ",
            (e == null ? void 0 : e.person_nodes) || 0,
            " actors across ",
            (e == null ? void 0 : e.incidents_analyzed) || 0,
            " incidents and ",
            (e == null ? void 0 : e.total_network_count) || 0,
            " networks"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ m.jsxs("button", { className: "btn-secondary", onClick: p, disabled: n, children: [
        /* @__PURE__ */ m.jsx(_l, { size: 14, className: n ? "spin" : "" }),
        "Refresh Analysis"
      ] })
    ] }),
    r ? /* @__PURE__ */ m.jsx("div", { className: "network-error", role: "alert", children: r }) : null,
    /* @__PURE__ */ m.jsxs("div", { className: "network-layout", children: [
      /* @__PURE__ */ m.jsxs("aside", { className: "network-sidebar", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "sidebar-label", children: [
          "Detected Clusters (",
          (e == null ? void 0 : e.network_count) || 0,
          " shown / ",
          (e == null ? void 0 : e.total_network_count) || (e == null ? void 0 : e.network_count) || 0,
          " total)"
        ] }),
        /* @__PURE__ */ m.jsx("div", { className: "cluster-list", children: (g = e == null ? void 0 : e.networks) == null ? void 0 : g.map((w) => /* @__PURE__ */ m.jsxs(
          "button",
          {
            className: `cluster-item ${(a == null ? void 0 : a.network_id) === w.network_id ? "active" : ""}`,
            onClick: () => c(w),
            children: [
              /* @__PURE__ */ m.jsx("div", { className: "cluster-id", children: w.network_id }),
              /* @__PURE__ */ m.jsxs("div", { className: "cluster-info", children: [
                /* @__PURE__ */ m.jsxs("span", { className: "cluster-stats", children: [
                  /* @__PURE__ */ m.jsx(zM, { size: 12 }),
                  " ",
                  w.suspect_count,
                  " Suspects"
                ] }),
                /* @__PURE__ */ m.jsxs("span", { className: "cluster-stats", children: [
                  /* @__PURE__ */ m.jsx(MM, { size: 12 }),
                  " ",
                  w.incident_count,
                  " Incidents"
                ] }),
                /* @__PURE__ */ m.jsxs("span", { className: "cluster-stats", children: [
                  "Score ",
                  Number(w.network_score || 0).toFixed(1),
                  " • Avg risk ",
                  Number(w.avg_risk_score || 0).toFixed(1)
                ] })
              ] }),
              /* @__PURE__ */ m.jsx(PP, { size: 14, className: "chevron" })
            ]
          },
          w.network_id
        )) })
      ] }),
      /* @__PURE__ */ m.jsx("main", { className: "network-details", children: a ? /* @__PURE__ */ m.jsxs("div", { className: "network-view animate-fade-in", children: [
        /* @__PURE__ */ m.jsx("div", { className: "network-hero", children: /* @__PURE__ */ m.jsxs("div", { className: "hero-stats", children: [
          /* @__PURE__ */ m.jsxs("div", { className: "stat-card", children: [
            /* @__PURE__ */ m.jsx("label", { children: "Threat Score" }),
            /* @__PURE__ */ m.jsx("div", { className: "value", children: Number(a.network_score || 0).toFixed(1) })
          ] }),
          /* @__PURE__ */ m.jsxs("div", { className: "stat-card", children: [
            /* @__PURE__ */ m.jsx("label", { children: "Avg Incident Risk" }),
            /* @__PURE__ */ m.jsx("div", { className: "value", children: Number(a.avg_risk_score || 0).toFixed(1) })
          ] }),
          /* @__PURE__ */ m.jsxs("div", { className: "stat-card", children: [
            /* @__PURE__ */ m.jsx("label", { children: "Link Density" }),
            /* @__PURE__ */ m.jsx("div", { className: "value", children: Number(a.edge_density || 0).toFixed(3) })
          ] })
        ] }) }),
        /* @__PURE__ */ m.jsxs("div", { className: "network-grid", children: [
          /* @__PURE__ */ m.jsxs("section", { className: "actors-section", children: [
            /* @__PURE__ */ m.jsxs("h3", { children: [
              /* @__PURE__ */ m.jsx(NM, { size: 18 }),
              " Network Actors (",
              a.actor_count || a.suspect_count || 0,
              ")"
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "actor-list", children: [
              (a.actors || a.top_actors || []).map((w, M) => /* @__PURE__ */ m.jsxs("div", { className: "actor-card animate-fade-in", style: { animationDelay: `${M * 0.05}s` }, children: [
                /* @__PURE__ */ m.jsxs("div", { className: "actor-main", children: [
                  /* @__PURE__ */ m.jsx("div", { className: "actor-name", children: w.name }),
                  /* @__PURE__ */ m.jsxs("div", { className: "actor-meta", children: [
                    /* @__PURE__ */ m.jsxs("span", { children: [
                      "Centrality: ",
                      w.centrality
                    ] }),
                    /* @__PURE__ */ m.jsx("span", { children: "•" }),
                    /* @__PURE__ */ m.jsxs("span", { children: [
                      w.incident_count,
                      " Incidents"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ m.jsx("div", { className: "actor-risk-bar", children: /* @__PURE__ */ m.jsx("div", { className: "bar-fill", style: { width: `${w.centrality * 100}%` } }) })
              ] }, `${w.name || "actor"}-${w.incident_count || 0}-${M}`)),
              (!a.actors || a.actors.length === 0) && (!a.top_actors || a.top_actors.length === 0) && /* @__PURE__ */ m.jsx("div", { className: "empty-state", children: /* @__PURE__ */ m.jsx("p", { children: "No actor nodes found for this network." }) })
            ] })
          ] }),
          /* @__PURE__ */ m.jsxs("section", { className: "intel-section", children: [
            /* @__PURE__ */ m.jsxs("h3", { children: [
              /* @__PURE__ */ m.jsx(Sy, { size: 18 }),
              " Operation Areas"
            ] }),
            /* @__PURE__ */ m.jsx("div", { className: "pill-cloud", children: (v = a.top_states) == null ? void 0 : v.map((w, M) => /* @__PURE__ */ m.jsxs("span", { className: "location-pill", children: [
              w.state,
              " ",
              /* @__PURE__ */ m.jsx("span", { className: "pill-count", children: w.count })
            ] }, `${w.state || "state"}-${M}`)) }),
            /* @__PURE__ */ m.jsxs("h3", { style: { marginTop: "24px" }, children: [
              /* @__PURE__ */ m.jsx(xy, { size: 18 }),
              " Species Targeted"
            ] }),
            /* @__PURE__ */ m.jsx("div", { className: "pill-cloud", children: (y = a.top_species) == null ? void 0 : y.map((w, M) => /* @__PURE__ */ m.jsxs("span", { className: "species-pill", children: [
              w.species,
              " ",
              /* @__PURE__ */ m.jsx("span", { className: "pill-count", children: w.count })
            ] }, `${w.species || "species"}-${M}`)) }),
            /* @__PURE__ */ m.jsxs("h3", { style: { marginTop: "24px" }, children: [
              /* @__PURE__ */ m.jsx(yo, { size: 18 }),
              " Linked Incidents"
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "incident-list", children: [
              (S = a.linked_incidents) == null ? void 0 : S.map((w, M) => {
                const b = Zs(w.url, w.open_url), k = /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
                  /* @__PURE__ */ m.jsx("div", { className: "incident-title", children: w.title }),
                  /* @__PURE__ */ m.jsxs("div", { className: "incident-meta", children: [
                    "Risk ",
                    w.risk_score,
                    " • ",
                    w.state || "Unknown",
                    w.district ? `, ${w.district}` : ""
                  ] })
                ] }), P = w.id || `${w.title || "incident"}-${M}`;
                return b === "#" ? /* @__PURE__ */ m.jsx("div", { className: "incident-item incident-item-disabled", children: k }, P) : /* @__PURE__ */ m.jsx("a", { className: "incident-item", href: b, target: "_blank", rel: "noopener noreferrer", children: k }, P);
              }),
              (!a.linked_incidents || a.linked_incidents.length === 0) && /* @__PURE__ */ m.jsx("div", { className: "empty-state", children: /* @__PURE__ */ m.jsx("p", { children: "No linked incidents found for this network." }) })
            ] })
          ] })
        ] })
      ] }) : /* @__PURE__ */ m.jsxs("div", { className: "empty-state", children: [
        /* @__PURE__ */ m.jsx(hh, { size: 48, className: "faint-icon" }),
        /* @__PURE__ */ m.jsx("p", { children: "Select a cluster to view intelligence details" })
      ] }) })
    ] }),
    /* @__PURE__ */ m.jsx("style", { dangerouslySetInnerHTML: { __html: `
        .network-container {
          padding: 24px;
          color: #1A1917;
        }
        .network-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }
        .header-info {
          display: flex;
          gap: 16px;
          align-items: center;
          min-width: 0;
          flex: 1;
        }
        .header-info > div {
          min-width: 0;
        }
        .header-info h1 {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          overflow-wrap: anywhere;
        }
        .subtitle {
          color: #6B6966;
          font-size: 13px;
          margin: 4px 0 0;
          overflow-wrap: anywhere;
        }
        .network-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          height: 600px;
        }
        .network-sidebar {
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid rgba(26, 25, 23, 0.08);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          backdrop-filter: blur(8px);
        }
        .sidebar-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6B6966;
          font-weight: 600;
          padding-left: 8px;
        }
        .cluster-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
        }
        .cluster-item {
          display: grid;
          grid-template-columns: 56px minmax(0, 1fr) 20px;
          column-gap: 8px;
          align-items: center;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid transparent;
          background: transparent;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cluster-item:hover {
          background: rgba(193, 127, 89, 0.05);
          border-color: rgba(193, 127, 89, 0.1);
        }
        .cluster-item.active {
          background: #C17F59;
          color: white;
          box-shadow: 0 4px 12px rgba(193, 127, 89, 0.25);
        }
        .cluster-id {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cluster-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }
        .cluster-stats {
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 4px;
          opacity: 0.8;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .network-details {
          background: #FFFFFF;
          border: 1px solid rgba(26, 25, 23, 0.08);
          border-radius: 20px;
          padding: 32px;
          box-shadow: 0 8px 32px rgba(26, 25, 23, 0.04);
          overflow-y: auto;
          min-width: 0;
        }
        .network-hero {
          background: linear-gradient(135deg, #1A1917 0%, #3D3B38 100%);
          border-radius: 16px;
          padding: 24px;
          color: white;
          margin-bottom: 32px;
        }
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .stat-card label {
          font-size: 11px;
          text-transform: uppercase;
          opacity: 0.6;
          display: block;
          margin-bottom: 4px;
        }
        .stat-card .value {
          font-size: 24px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
        }
        .network-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
        }
        .network-grid h3 {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .actor-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-bottom: 1px solid rgba(26, 25, 23, 0.06);
          position: relative;
        }
        .actor-rank {
          font-family: 'JetBrains Mono', monospace;
          color: #C17F59;
          font-weight: 700;
          font-size: 14px;
        }
        .actor-name {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 2px;
          overflow-wrap: anywhere;
        }
        .actor-meta {
          font-size: 11px;
          color: #6B6966;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          overflow-wrap: anywhere;
        }
        .actor-risk-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 100%;
          background: rgba(26, 25, 23, 0.03);
        }
        .bar-fill {
          height: 100%;
          background: #C17F59;
          opacity: 0.6;
        }
        .pill-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .location-pill, .species-pill {
          padding: 6px 12px;
          background: rgba(26, 25, 23, 0.04);
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
        }
        .pill-count {
          font-size: 10px;
          opacity: 0.5;
          margin-left: 4px;
        }
        .incident-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .incident-item {
          display: block;
          text-decoration: none;
          color: inherit;
          border: 1px solid rgba(26, 25, 23, 0.08);
          border-radius: 10px;
          padding: 10px 12px;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .incident-item:hover {
          background: rgba(193, 127, 89, 0.06);
          border-color: rgba(193, 127, 89, 0.25);
        }
        .incident-title {
          font-size: 13px;
          font-weight: 600;
          line-height: 1.35;
          margin-bottom: 2px;
          overflow-wrap: anywhere;
        }
        .incident-meta {
          font-size: 11px;
          color: #6B6966;
          overflow-wrap: anywhere;
        }
        .incident-item-disabled {
          opacity: 0.7;
          cursor: default;
        }
        .incident-item-disabled:hover {
          background: #FFFFFF;
          border-color: rgba(26, 25, 23, 0.08);
        }
        .network-error {
          margin: 0 0 16px;
          padding: 10px 12px;
          border: 1px solid rgba(199, 80, 80, 0.2);
          border-radius: 10px;
          background: rgba(199, 80, 80, 0.06);
          color: #A03434;
          font-size: 13px;
        }
        @media (max-width: 1280px) {
          .network-layout {
            grid-template-columns: 1fr;
            height: auto;
          }
          .network-sidebar {
            max-height: 260px;
          }
          .network-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        @media (max-width: 900px) {
          .network-container {
            padding: 20px;
          }
          .network-details {
            padding: 20px;
          }
          .hero-stats {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
        .spin { animation: rotate 2s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      ` } })
  ] });
}
function rC({ onSelectIncident: e }) {
  var p, g;
  const [t, n] = W.useState(""), [i, r] = W.useState(!1), [o, a] = W.useState(null), [c, u] = W.useState(null), d = async (v) => {
    if (v.preventDefault(), !!t.trim()) {
      r(!0), u(null);
      try {
        const y = await Ns(Bt.ragQuery, {
          query: t.trim(),
          top_k: 5
        });
        a(y);
      } catch (y) {
        u(y.message || "Failed to process natural language query."), console.error(y);
      } finally {
        r(!1);
      }
    }
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "semantic-search-container", children: [
    /* @__PURE__ */ m.jsxs("form", { onSubmit: d, className: "semantic-input-group", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "input-with-icon", children: [
        /* @__PURE__ */ m.jsx(yM, { size: 18, className: "sparkle-icon" }),
        /* @__PURE__ */ m.jsx(
          "input",
          {
            type: "text",
            placeholder: "Ask anything (e.g. 'What are the main smuggling routes for pangolins in Odisha?')",
            value: t,
            onChange: (v) => n(v.target.value),
            disabled: i
          }
        )
      ] }),
      /* @__PURE__ */ m.jsx("button", { type: "submit", className: "btn-primary semantic-btn", disabled: i || !t.trim(), children: i ? /* @__PURE__ */ m.jsx($P, { size: 18, className: "spin" }) : /* @__PURE__ */ m.jsx(vP, { size: 18 }) })
    ] }),
    c && /* @__PURE__ */ m.jsxs("div", { className: "semantic-error", children: [
      /* @__PURE__ */ m.jsx(HP, { size: 14 }),
      /* @__PURE__ */ m.jsx("span", { children: c })
    ] }),
    o && /* @__PURE__ */ m.jsxs("div", { className: "semantic-result-area animate-fade-in", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "result-answer", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "answer-header", children: [
          /* @__PURE__ */ m.jsx(nM, { size: 16 }),
          /* @__PURE__ */ m.jsx("span", { children: "Intelligence Analysis" })
        ] }),
        /* @__PURE__ */ m.jsx("div", { className: "answer-text", children: o.answer })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "result-sources", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "sources-label", children: [
          "Citations (",
          ((p = o.sources) == null ? void 0 : p.length) || 0,
          ")"
        ] }),
        /* @__PURE__ */ m.jsx("div", { className: "sources-list", children: (g = o.sources) == null ? void 0 : g.map((v, y) => /* @__PURE__ */ m.jsxs("div", { className: "source-item", onClick: () => e == null ? void 0 : e(v.id), children: [
          /* @__PURE__ */ m.jsx("div", { className: "source-title", children: v.title }),
          /* @__PURE__ */ m.jsxs("div", { className: "source-meta", children: [
            /* @__PURE__ */ m.jsxs("span", { className: "source-score", children: [
              "Relevance: ",
              (v.relevance * 100).toFixed(0),
              "%"
            ] }),
            /* @__PURE__ */ m.jsx("span", { children: "•" }),
            /* @__PURE__ */ m.jsx("span", { children: v.date })
          ] })
        ] }, y)) })
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("style", { dangerouslySetInnerHTML: { __html: `
        .semantic-search-container {
          margin-bottom: 24px;
        }
        .semantic-input-group {
          display: flex;
          gap: 12px;
          position: relative;
        }
        .input-with-icon {
          flex: 1;
          position: relative;
        }
        .sparkle-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #C17F59;
        }
        .semantic-input-group input {
          width: 100%;
          padding: 14px 14px 14px 48px;
          border-radius: 12px;
          border: 2px solid rgba(193, 127, 89, 0.15);
          background: rgba(255, 255, 255, 0.8);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(193, 127, 89, 0.04);
        }
        .semantic-input-group input:focus {
          outline: none;
          border-color: #C17F59;
          background: #FFFFFF;
          box-shadow: 0 8px 24px rgba(193, 127, 89, 0.08);
        }
        .semantic-btn {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          padding: 0;
        }
        .semantic-error {
          margin-top: 12px;
          padding: 12px 16px;
          background: rgba(199, 80, 80, 0.05);
          border: 1px solid rgba(199, 80, 80, 0.1);
          border-radius: 8px;
          color: #C75050;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .semantic-result-area {
          margin-top: 20px;
          background: #FFFFFF;
          border: 1px solid rgba(26, 25, 23, 0.08);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(26, 25, 23, 0.06);
        }
        .result-answer {
          padding: 24px;
          border-bottom: 1px solid rgba(26, 25, 23, 0.06);
          background: linear-gradient(to bottom right, rgba(193, 127, 89, 0.03), transparent);
        }
        .answer-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #C17F59;
          margin-bottom: 12px;
        }
        .answer-text {
          font-size: 15px;
          line-height: 1.6;
          color: #1A1917;
          white-space: pre-wrap;
        }
        .result-sources {
          padding: 20px 24px;
          background: rgba(26, 25, 23, 0.01);
        }
        .sources-label {
          font-size: 11px;
          font-weight: 600;
          color: #6B6966;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .sources-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .source-item {
          padding: 12px;
          border-radius: 8px;
          background: #FFFFFF;
          border: 1px solid rgba(26, 25, 23, 0.06);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .source-item:hover {
          border-color: #C17F59;
          background: rgba(193, 127, 89, 0.02);
          transform: translateX(4px);
        }
        .source-title {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .source-meta {
          font-size: 11px;
          color: #6B6966;
          display: flex;
          gap: 8px;
        }
        .source-score {
          color: #C17F59;
          font-weight: 600;
        }
        .spin { animation: rotate 1s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      ` } })
  ] });
}
function oC({ alerts: e }) {
  return /* @__PURE__ */ m.jsxs("article", { className: "card", id: "section-alerts", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ m.jsx(Py, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ m.jsx("h2", { children: "Live High-Risk Alerts" })
      ] }),
      /* @__PURE__ */ m.jsxs("span", { className: "card-count mono", children: [
        e.length,
        " active"
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "card-body-flush", children: e.length === 0 ? /* @__PURE__ */ m.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ m.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ m.jsx(by, { size: 20 }) }),
      /* @__PURE__ */ m.jsx("div", { children: "No active alerts" })
    ] }) : /* @__PURE__ */ m.jsx("div", { className: "feed", children: e.slice(0, 25).map((t) => {
      const n = Hl(t.risk_score);
      return /* @__PURE__ */ m.jsxs("div", { className: `feed-row is-${n}`, children: [
        /* @__PURE__ */ m.jsxs("div", { className: "feed-row-head", children: [
          /* @__PURE__ */ m.jsx("div", { className: "feed-title", children: t.title || "Alert" }),
          /* @__PURE__ */ m.jsx("span", { className: `risk-pill ${n}`, children: t.risk_score || 0 })
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "feed-meta", children: [
          /* @__PURE__ */ m.jsx("span", { children: t.state || "Unknown state" }),
          /* @__PURE__ */ m.jsx("span", { className: "dot" }),
          /* @__PURE__ */ m.jsx("span", { children: t.district || "—" }),
          t.species ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
            /* @__PURE__ */ m.jsx("span", { className: "dot" }),
            /* @__PURE__ */ m.jsx("span", { children: t.species })
          ] }) : null
        ] }),
        /* @__PURE__ */ m.jsxs(
          "a",
          {
            href: Zs(t.open_url, t.url),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "feed-link",
            children: [
              "Open source ",
              /* @__PURE__ */ m.jsx(yo, { size: 12 })
            ]
          }
        )
      ] }, t.id);
    }) }) })
  ] });
}
function aC({ items: e }) {
  return /* @__PURE__ */ m.jsxs("article", { className: "card", id: "section-osint", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ m.jsx(My, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ m.jsx("h2", { children: "OSINT Signal Feed" })
      ] }),
      /* @__PURE__ */ m.jsxs("span", { className: "card-count mono", children: [
        e.length,
        " signals"
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "card-body-flush", children: e.length === 0 ? /* @__PURE__ */ m.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ m.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ m.jsx(by, { size: 20 }) }),
      /* @__PURE__ */ m.jsx("div", { children: "No OSINT signals yet" })
    ] }) : /* @__PURE__ */ m.jsx("div", { className: "feed", children: e.slice(0, 16).map((t) => {
      const n = Number(t.signal_strength || 0);
      return /* @__PURE__ */ m.jsxs("div", { className: "feed-row", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "feed-row-head", children: [
          /* @__PURE__ */ m.jsx("div", { className: "feed-title", children: t.title }),
          /* @__PURE__ */ m.jsx("span", { className: "badge mono", children: n.toFixed(2) })
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "feed-meta", children: [
          /* @__PURE__ */ m.jsx("span", { children: t.source_type || "source" }),
          /* @__PURE__ */ m.jsx("span", { className: "dot" }),
          /* @__PURE__ */ m.jsx("span", { children: "Signal strength" })
        ] }),
        /* @__PURE__ */ m.jsxs(
          "a",
          {
            href: Zs(t.open_url, t.url),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "feed-link",
            children: [
              "Open source ",
              /* @__PURE__ */ m.jsx(yo, { size: 12 })
            ]
          }
        )
      ] }, t.id);
    }) }) })
  ] });
}
function lC({ items: e }) {
  return /* @__PURE__ */ m.jsxs("article", { className: "card", id: "section-reco", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ m.jsx(uh, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ m.jsx("h2", { children: "Top Recommendations" })
      ] }),
      /* @__PURE__ */ m.jsx("span", { className: "card-count mono", children: e.length })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "card-body-flush", children: e.length === 0 ? /* @__PURE__ */ m.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ m.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ m.jsx(uh, { size: 20 }) }),
      /* @__PURE__ */ m.jsx("div", { children: "No recommendations generated yet" })
    ] }) : /* @__PURE__ */ m.jsx("div", { className: "feed", children: e.map(([t, n]) => /* @__PURE__ */ m.jsxs("div", { className: "reco-row", children: [
      /* @__PURE__ */ m.jsx("span", { children: t }),
      /* @__PURE__ */ m.jsx("span", { className: "reco-count", children: n })
    ] }, t)) }) })
  ] });
}
Dl.register(lh, ch, Ia, ei, Cr, Ra, eP, YS, HS);
const cC = 15e3, uC = {
  q: "",
  species: "",
  state: "",
  date_from: "",
  date_to: "",
  crime_type: "",
  severity: "",
  source: ""
}, dg = !1;
(/* @__PURE__ */ new Date()).toISOString();
function hC() {
  const [e, t] = W.useState(!0), [n, i] = W.useState(""), [r, o] = W.useState(!1), [a, c] = W.useState(() => Wl()), [u, d] = W.useState(""), [p, g] = W.useState(!1), [v, y] = W.useState({ username: "", password: "" }), [S, w] = W.useState(null), [M, b] = W.useState(null), [k, P] = W.useState(null), [T, N] = W.useState([]), [j, O] = W.useState([]), [A, H] = W.useState([]), [F, V] = W.useState(null), [K, yt] = W.useState([]), [$, rt] = W.useState(null), [X, ht] = W.useState("pending"), [I, U] = W.useState("");
  W.useEffect(() => {
    $ && (ht($.review_status || "pending"), U($.review_notes || ""));
  }, [$]);
  const [D, tt] = W.useState(uC), [ot, St] = W.useState("overview"), [dt, at] = W.useState(!1), G = W.useCallback((et = "Please log in to continue.") => {
    UM(), c(""), d(et), i(""), o(!1), t(!1);
  }, []), Dt = W.useCallback(async () => {
    if (!a || dg) return;
    o(!0);
    const et = await Promise.allSettled([
      mn(Bt.summary),
      mn(Bt.chart),
      mn(Bt.map),
      mn(Bt.alerts),
      mn(Bt.reports),
      mn(Bt.osint),
      mn(Bt.syncStatus)
    ]);
    if (et.some(
      (De) => {
        var Hn;
        return De.status === "rejected" && Number((Hn = De.reason) == null ? void 0 : Hn.status) === 401;
      }
    )) {
      G("Session expired. Please sign in again.");
      return;
    }
    const [it, Vt, Gt, ne, Qt, Le, Re] = et;
    it.status === "fulfilled" && w(it.value), Vt.status === "fulfilled" && b(Vt.value), Gt.status === "fulfilled" && P(Gt.value), ne.status === "fulfilled" && N(Array.isArray(ne.value) ? ne.value : []), Qt.status === "fulfilled" && H(Array.isArray(Qt.value) ? Qt.value : []), Le.status === "fulfilled" && O(Array.isArray(Le.value) ? Le.value : []), Re.status === "fulfilled" && V(Re.value), et.every((De) => De.status === "rejected") ? i("Unable to load dashboard data right now.") : i(""), t(!1), o(!1);
  }, [a, G]), fe = W.useCallback(async () => {
    if (!a || dg) return;
    const et = lg({ ...D, min_confidence: 0, limit: 120 });
    try {
      const J = await mn(`${Bt.filterNews}?${et}`);
      yt(Array.isArray(J.items) ? J.items : []);
    } catch (J) {
      Number(J == null ? void 0 : J.status) === 401 ? G("Session expired. Please sign in again.") : (console.error("Failed to refresh filtered incidents:", J), i((it) => it || "Incident feed is temporarily unavailable."));
    }
  }, [a, D, G]);
  W.useEffect(() => {
    if (!a) {
      t(!1);
      return;
    }
    const et = Bt.wsLive(a);
    let J = null, it = null;
    function Vt() {
      J = new WebSocket(et), J.onmessage = (ne) => {
        try {
          const { channel: Qt, data: Le } = JSON.parse(ne.data);
          Qt === "alerts" ? N((Re) => [Le, ...Re].slice(0, 100)) : Qt === "incidents" ? yt((Re) => [Le, ...Re].slice(0, 200)) : Qt === "sync_status" && V(Le);
        } catch (Qt) {
          console.error("WS parse error:", Qt);
        }
      }, J.onclose = () => {
        it = window.setTimeout(Vt, 5e3);
      }, J.onerror = (ne) => {
        console.error("WS error:", ne), J.close();
      };
    }
    Vt(), t(!0), Dt(), fe();
    const Gt = window.setInterval(() => {
      Dt(), fe();
    }, cC);
    return () => {
      window.clearInterval(Gt), it && window.clearTimeout(it), J && (J.onclose = null, J.close());
    };
  }, [a, Dt, fe]), W.useEffect(() => {
    const et = ["overview", "map", "alerts", "networks", "analytics", "incidents", "osint", "reco"], J = [];
    return et.forEach((it) => {
      const Vt = document.getElementById(`section-${it}`);
      if (!Vt) return;
      const Gt = new IntersectionObserver(
        (ne) => {
          ne.forEach((Qt) => {
            Qt.isIntersecting && St(it);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      Gt.observe(Vt), J.push(Gt);
    }), () => J.forEach((it) => it.disconnect());
  }, [e]);
  const xo = W.useMemo(() => {
    const et = /* @__PURE__ */ new Map();
    return A.forEach((J) => {
      const it = (J.recommendation || "").trim();
      it && et.set(it, (et.get(it) || 0) + 1);
    }), [...et.entries()].sort((J, it) => it[1] - J[1]).slice(0, 8);
  }, [A]), Us = (M == null ? void 0 : M.filters) || { states: [], species: [], crime_types: [], sources: [] }, $s = (S == null ? void 0 : S.last_sync_time) || (F == null ? void 0 : F.finished_at), Bn = W.useCallback((et, { last: J = !1 } = {}) => {
    const it = et || {}, Vt = typeof it.stage == "string" && it.stage !== "-" ? it.stage : "", Gt = typeof it.provider == "string" && it.provider !== "-" ? it.provider : "", ne = typeof it.language == "string" && it.language !== "-" ? it.language : "", Qt = typeof it.query == "string" && it.query !== "-" ? it.query : "", Le = Number.isFinite(Number(it.scanned)) ? Number(it.scanned) : null, Re = Number.isFinite(Number(it.kept)) ? Number(it.kept) : null, De = [];
    Vt && De.push(`stage: ${J ? `last ${Vt}` : Vt}`);
    const Hn = [Gt, ne].filter(Boolean).join(" / ");
    return Hn && De.push(`source: ${Hn}`), Qt && De.push(`query: ${Qt}`), Le !== null && Re !== null && De.push(`scanned ${Le}, kept ${Re}`), De.join(" • ");
  }, []), Ki = W.useMemo(() => F != null && F.running ? Bn(F == null ? void 0 : F.progress, { last: !1 }) : "", [F, Bn]);
  function wo(et) {
    if (!a) return;
    const J = lg({ ...D, min_confidence: 0, admin_token: a }), it = et === "pdf" ? Bt.exportPdf : et === "excel" ? Bt.exportExcel : et === "excel_incidents_reports" ? Bt.exportExcelIncidentsReports : et === "briefing" ? Bt.exportBriefing : Bt.exportCsv;
    window.location.href = J ? `${it}?${J}` : it;
  }
  const bo = W.useCallback(async () => {
    if (confirm(`Re-analyze the entire historical database?

This will trigger the AI pipeline in the background to classify WPA 1972 protection schedules, offence categories, and penalty classes for all historical records.`))
      try {
        o(!0);
        const et = await Ns(Bt.adminReanalyze, {});
        alert(`Historical analysis queued successfully!

Status: ${et.status || "queued"}
Message: ${et.message || "Historical analysis pipeline has been triggered in the background."}`), Dt(), fe();
      } catch (et) {
        alert(`Failed to trigger database re-analysis: ${et.message}`);
      } finally {
        o(!1);
      }
  }, [Dt, fe]), ko = W.useCallback(async (et, J, it) => {
    try {
      o(!0);
      const Vt = await Ny(Bt.reviewIncident(et), {
        review_status: J,
        review_notes: it
      });
      yt(
        (Gt) => Gt.map((ne) => ne.id === et ? { ...ne, ...Vt } : ne)
      ), rt((Gt) => Gt && Gt.id === et ? { ...Gt, ...Vt } : Gt), alert(`Incident review updated to: ${J.toUpperCase()}`);
    } catch (Vt) {
      alert(`Failed to submit review: ${Vt.message}`);
    } finally {
      o(!1);
    }
  }, []);
  async function Ys(et) {
    et.preventDefault(), g(!0), d("");
    try {
      const J = await Ns(
        Bt.adminLogin,
        { username: v.username.trim(), password: v.password },
        { includeAuth: !1 }
      ), it = String((J == null ? void 0 : J.access_token) || "").trim();
      if (!it) {
        d("Login failed. Missing access token.");
        return;
      }
      Ey(it), c(it), y({ username: "", password: "" }), t(!0);
    } catch (J) {
      Number(J == null ? void 0 : J.status) === 401 ? d("Invalid username or password.") : Number(J == null ? void 0 : J.status) === 429 ? d("Too many login attempts. Try again in a minute.") : d(String((J == null ? void 0 : J.message) || "Unable to login right now."));
    } finally {
      g(!1);
    }
  }
  async function Xi() {
    try {
      await Ns(Bt.adminLogout, {}, { includeAuth: !0 });
    } catch {
    }
    G("Signed out.");
  }
  function Vl(et) {
    St(et), at(!1);
  }
  return a ? /* @__PURE__ */ m.jsxs("div", { className: "app", children: [
    /* @__PURE__ */ m.jsx(
      RM,
      {
        activeSection: ot,
        onSelect: Vl,
        isOpen: dt,
        syncStatus: F,
        lastSync: $s
      }
    ),
    /* @__PURE__ */ m.jsx(
      "div",
      {
        className: `scrim ${dt ? "is-visible" : ""}`,
        onClick: () => at(!1),
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ m.jsxs("div", { className: "main", children: [
      /* @__PURE__ */ m.jsx(
        DM,
        {
          activeSection: ot,
          busy: r,
          syncStatus: F,
          onRefresh: Dt,
          onExport: wo,
          onToggleMenu: () => at((et) => !et),
          onLogout: Xi,
          onReanalyze: bo
        }
      ),
      /* @__PURE__ */ m.jsxs("div", { className: "content", children: [
        n ? /* @__PURE__ */ m.jsxs("div", { className: "status error", role: "alert", children: [
          /* @__PURE__ */ m.jsx(sg, { size: 16 }),
          /* @__PURE__ */ m.jsx("span", { children: n })
        ] }) : null,
        F != null && F.running ? /* @__PURE__ */ m.jsxs("div", { className: "status info", role: "status", children: [
          /* @__PURE__ */ m.jsx(yy, { size: 16 }),
          /* @__PURE__ */ m.jsxs("span", { children: [
            F.message || "Search in progress...",
            Ki ? ` - ${Ki}` : ""
          ] })
        ] }) : null,
        /* @__PURE__ */ m.jsxs("section", { className: "dashboard-section", id: "section-overview", children: [
          /* @__PURE__ */ m.jsx("div", { className: "section-header", children: /* @__PURE__ */ m.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ m.jsx("span", { className: "section-number", children: "01" }),
            /* @__PURE__ */ m.jsxs("div", { children: [
              /* @__PURE__ */ m.jsx("h2", { children: "National Overview" }),
              /* @__PURE__ */ m.jsx("p", { children: "Real-time wildlife threat monitoring across India" })
            ] })
          ] }) }),
          /* @__PURE__ */ m.jsx(HM, { summary: S, loading: e })
        ] }),
        /* @__PURE__ */ m.jsxs("section", { className: "dashboard-section", id: "section-map", children: [
          /* @__PURE__ */ m.jsx("div", { className: "section-header", children: /* @__PURE__ */ m.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ m.jsx("span", { className: "section-number", children: "02" }),
            /* @__PURE__ */ m.jsxs("div", { children: [
              /* @__PURE__ */ m.jsx("h2", { children: "Operations Center" }),
              /* @__PURE__ */ m.jsx("p", { children: "Geographic incident mapping" })
            ] })
          ] }) }),
          /* @__PURE__ */ m.jsx($M, { mapData: k, onMapError: i })
        ] }),
        /* @__PURE__ */ m.jsxs("section", { className: "dashboard-section", id: "section-alerts", children: [
          /* @__PURE__ */ m.jsx("div", { className: "section-header", children: /* @__PURE__ */ m.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ m.jsx("span", { className: "section-number", children: "03" }),
            /* @__PURE__ */ m.jsxs("div", { children: [
              /* @__PURE__ */ m.jsx("h2", { children: "Live High-Risk Alerts" }),
              /* @__PURE__ */ m.jsx("p", { children: "Immediate notifications for critical poaching and trafficking signals" })
            ] })
          ] }) }),
          /* @__PURE__ */ m.jsx(oC, { alerts: T })
        ] }),
        /* @__PURE__ */ m.jsxs("section", { className: "dashboard-section", id: "section-networks", children: [
          /* @__PURE__ */ m.jsx("div", { className: "section-header", children: /* @__PURE__ */ m.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ m.jsx("span", { className: "section-number", children: "04" }),
            /* @__PURE__ */ m.jsxs("div", { children: [
              /* @__PURE__ */ m.jsx("h2", { children: "Network Intelligence" }),
              /* @__PURE__ */ m.jsx("p", { children: "Analyzing connections between suspects and organized crime groups" })
            ] })
          ] }) }),
          /* @__PURE__ */ m.jsx("article", { className: "card network-card", children: /* @__PURE__ */ m.jsx(sC, {}) })
        ] }),
        /* @__PURE__ */ m.jsxs("section", { className: "dashboard-section", id: "section-analytics", children: [
          /* @__PURE__ */ m.jsx("div", { className: "section-header", children: /* @__PURE__ */ m.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ m.jsx("span", { className: "section-number", children: "05" }),
            /* @__PURE__ */ m.jsxs("div", { children: [
              /* @__PURE__ */ m.jsx("h2", { children: "Intelligence Analytics" }),
              /* @__PURE__ */ m.jsx("p", { children: "Trends, distributions, and source reliability metrics" })
            ] })
          ] }) }),
          /* @__PURE__ */ m.jsx(tC, { chartData: M })
        ] }),
        /* @__PURE__ */ m.jsxs("section", { className: "dashboard-section", id: "section-incidents", children: [
          /* @__PURE__ */ m.jsx("div", { className: "section-header", children: /* @__PURE__ */ m.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ m.jsx("span", { className: "section-number", children: "06" }),
            /* @__PURE__ */ m.jsxs("div", { children: [
              /* @__PURE__ */ m.jsx("h2", { children: "Incident Database" }),
              /* @__PURE__ */ m.jsx("p", { children: "Search and filter wildlife crime reports" })
            ] })
          ] }) }),
          /* @__PURE__ */ m.jsx(rC, {}),
          /* @__PURE__ */ m.jsx(
            nC,
            {
              filters: D,
              filterOptions: Us,
              onChange: tt,
              onApply: () => fe(),
              onBriefing: () => wo("briefing")
            }
          ),
          /* @__PURE__ */ m.jsx(
            iC,
            {
              rows: K,
              loading: e,
              onSelectRow: (et) => rt(et)
            }
          )
        ] }),
        /* @__PURE__ */ m.jsxs("section", { className: "dashboard-section", id: "section-osint", children: [
          /* @__PURE__ */ m.jsx("div", { className: "section-header", children: /* @__PURE__ */ m.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ m.jsx("span", { className: "section-number", children: "07" }),
            /* @__PURE__ */ m.jsxs("div", { children: [
              /* @__PURE__ */ m.jsx("h2", { children: "Intelligence Feed" }),
              /* @__PURE__ */ m.jsx("p", { children: "External sources and strategic recommendations" })
            ] })
          ] }) }),
          /* @__PURE__ */ m.jsxs("div", { className: "bottom-grid", children: [
            /* @__PURE__ */ m.jsx(aC, { items: j }),
            /* @__PURE__ */ m.jsx(lC, { items: xo })
          ] })
        ] })
      ] })
    ] }),
    $ && /* @__PURE__ */ m.jsx("div", { className: "modal-overlay", onClick: () => rt(null), children: /* @__PURE__ */ m.jsxs("div", { className: "modal-container", onClick: (et) => et.stopPropagation(), children: [
      /* @__PURE__ */ m.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "modal-title-area", children: [
          /* @__PURE__ */ m.jsxs("div", { className: "modal-title-pills", children: [
            /* @__PURE__ */ m.jsxs("span", { className: `risk-pill ${Hl($.risk_score)}`, children: [
              "Risk: ",
              $.risk_score
            ] }),
            /* @__PURE__ */ m.jsx("span", { className: `status-pill ${$.review_status || "pending"}`, children: $.review_status || "pending" })
          ] }),
          /* @__PURE__ */ m.jsx("h1", { className: "modal-title", children: $.title })
        ] }),
        /* @__PURE__ */ m.jsx(
          "button",
          {
            type: "button",
            className: "modal-close-btn",
            onClick: () => rt(null),
            "aria-label": "Close modal",
            children: /* @__PURE__ */ m.jsx(OM, { size: 20 })
          }
        )
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "modal-body", children: [
        /* @__PURE__ */ m.jsxs("div", { children: [
          /* @__PURE__ */ m.jsx("h3", { className: "modal-section-title", children: "General Intelligence" }),
          /* @__PURE__ */ m.jsxs("div", { className: "metadata-grid", children: [
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "Date" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value cell-mono", children: Ty($.date) })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "Species" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value", children: $.species || "—" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "State" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value", children: $.state || "—" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "District" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value", children: $.district || "—" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "Crime Type" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value", children: $.crime_type || "—" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "Involved Persons" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value", children: $.involved_persons || "—" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "Source" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value", children: $.source || "—" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "AI Confidence" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value cell-mono", children: Number($.confidence || 0).toFixed(2) })
            ] })
          ] })
        ] }),
        $.summary && /* @__PURE__ */ m.jsxs("div", { children: [
          /* @__PURE__ */ m.jsx("h3", { className: "modal-section-title", children: "Incident Summary" }),
          /* @__PURE__ */ m.jsx("div", { className: "description-box", children: $.summary })
        ] }),
        /* @__PURE__ */ m.jsxs("div", { children: [
          /* @__PURE__ */ m.jsx("h3", { className: "modal-section-title", children: "Wildlife Protection Act (WPA) 1972 Classification" }),
          /* @__PURE__ */ m.jsxs("div", { className: "classification-grid", children: [
            /* @__PURE__ */ m.jsxs("div", { className: "classification-card", children: [
              /* @__PURE__ */ m.jsx("span", { className: "label", children: "WPA Schedule" }),
              /* @__PURE__ */ m.jsx("span", { className: "value", children: $.wpa_schedule || "Not Classified" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "classification-card", children: [
              /* @__PURE__ */ m.jsx("span", { className: "label", children: "WPA Section" }),
              /* @__PURE__ */ m.jsx("span", { className: "value", children: $.wpa_section || "Not Classified" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "classification-card", children: [
              /* @__PURE__ */ m.jsx("span", { className: "label", children: "Offence Type" }),
              /* @__PURE__ */ m.jsx("span", { className: "value", children: $.wpa_offence_type || "Not Classified" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "classification-card", children: [
              /* @__PURE__ */ m.jsx("span", { className: "label", children: "Penalty Class" }),
              /* @__PURE__ */ m.jsx("span", { className: "value", children: $.wpa_penalty_class || "Not Classified" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "classification-card", children: [
              /* @__PURE__ */ m.jsx("span", { className: "label", children: "Protected Area Type" }),
              /* @__PURE__ */ m.jsx("span", { className: "value", children: $.protected_area_type || "None / Not Applicable" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "classification-card", children: [
              /* @__PURE__ */ m.jsx("span", { className: "label", children: "Enforcement Authority" }),
              /* @__PURE__ */ m.jsx("span", { className: "value", children: $.enforcement_authority || "Local Police / Forest Dept." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ m.jsxs("div", { className: "review-section", children: [
          /* @__PURE__ */ m.jsx("h3", { className: "modal-section-title", style: { margin: 0, border: "none", padding: 0 }, children: "Manual Checking & Verification" }),
          /* @__PURE__ */ m.jsxs("div", { className: "review-status-selector", children: [
            /* @__PURE__ */ m.jsx(
              "button",
              {
                type: "button",
                className: `review-status-btn pending ${X === "pending" ? "active" : ""}`,
                onClick: () => ht("pending"),
                children: "Pending"
              }
            ),
            /* @__PURE__ */ m.jsx(
              "button",
              {
                type: "button",
                className: `review-status-btn approved ${X === "approved" ? "active" : ""}`,
                onClick: () => ht("approved"),
                children: "Approve"
              }
            ),
            /* @__PURE__ */ m.jsx(
              "button",
              {
                type: "button",
                className: `review-status-btn rejected ${X === "rejected" ? "active" : ""}`,
                onClick: () => ht("rejected"),
                children: "Reject"
              }
            )
          ] }),
          /* @__PURE__ */ m.jsx(
            "textarea",
            {
              className: "review-notes-input",
              placeholder: "Add manual checking notes, comments, or corrections...",
              value: I,
              onChange: (et) => U(et.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "modal-footer", children: [
        /* @__PURE__ */ m.jsx(
          "button",
          {
            type: "button",
            className: "btn btn-ghost",
            onClick: () => rt(null),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ m.jsxs(
          "a",
          {
            href: Zs($.open_url, $.url),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "btn",
            style: { marginRight: "auto" },
            children: [
              "Open Article ",
              /* @__PURE__ */ m.jsx(yo, { size: 14, style: { marginLeft: "4px" } })
            ]
          }
        ),
        /* @__PURE__ */ m.jsx(
          "button",
          {
            type: "button",
            className: "btn btn-primary",
            onClick: () => ko($.id, X, I),
            disabled: r,
            children: r ? "Saving..." : "Save Review"
          }
        )
      ] })
    ] }) })
  ] }) : /* @__PURE__ */ m.jsx("div", { className: "auth-shell", children: /* @__PURE__ */ m.jsxs("article", { className: "card auth-card", children: [
    /* @__PURE__ */ m.jsx("div", { className: "card-head", children: /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
      /* @__PURE__ */ m.jsx(Cy, { size: 16, className: "card-head-icon" }),
      /* @__PURE__ */ m.jsx("h2", { children: "Authorized Access" })
    ] }) }),
    /* @__PURE__ */ m.jsxs("div", { className: "card-body auth-card-body", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "auth-brand", children: [
        /* @__PURE__ */ m.jsx("h1", { children: "Wildlife Crime Intelligence Center" }),
        /* @__PURE__ */ m.jsx("p", { children: "Sign in with authorized credentials to continue." })
      ] }),
      /* @__PURE__ */ m.jsxs("form", { className: "auth-form", onSubmit: Ys, children: [
        /* @__PURE__ */ m.jsxs("label", { className: "auth-field", children: [
          /* @__PURE__ */ m.jsx("span", { children: "Username" }),
          /* @__PURE__ */ m.jsx(
            "input",
            {
              value: v.username,
              onChange: (et) => y((J) => ({ ...J, username: et.target.value })),
              autoComplete: "username",
              required: !0
            }
          )
        ] }),
        /* @__PURE__ */ m.jsxs("label", { className: "auth-field", children: [
          /* @__PURE__ */ m.jsx("span", { children: "Password" }),
          /* @__PURE__ */ m.jsx(
            "input",
            {
              type: "password",
              value: v.password,
              onChange: (et) => y((J) => ({ ...J, password: et.target.value })),
              autoComplete: "current-password",
              required: !0
            }
          )
        ] }),
        u ? /* @__PURE__ */ m.jsxs("div", { className: "status error auth-status", role: "alert", children: [
          /* @__PURE__ */ m.jsx(sg, { size: 16 }),
          /* @__PURE__ */ m.jsx("span", { children: u })
        ] }) : null,
        /* @__PURE__ */ m.jsxs("button", { className: "btn btn-primary auth-submit", type: "submit", disabled: p, children: [
          /* @__PURE__ */ m.jsx(qP, { size: 14 }),
          p ? "Signing in..." : "Sign in"
        ] })
      ] })
    ] })
  ] }) });
}
class dC extends yx.Component {
  constructor(t) {
    super(t), this.state = { hasError: !1, message: "" };
  }
  static getDerivedStateFromError(t) {
    return { hasError: !0, message: t instanceof Error ? t.message : "Unknown runtime error" };
  }
  componentDidCatch(t) {
    console.error("Dashboard runtime error:", t);
  }
  render() {
    return this.state.hasError ? /* @__PURE__ */ m.jsxs("div", { style: { padding: "24px", color: "#e8edff", fontFamily: "Inter, sans-serif" }, children: [
      /* @__PURE__ */ m.jsx("h2", { style: { marginTop: 0 }, children: "Dashboard failed to load" }),
      /* @__PURE__ */ m.jsx("p", { style: { opacity: 0.9 }, children: this.state.message || "Unexpected client error." }),
      /* @__PURE__ */ m.jsxs("p", { style: { opacity: 0.8 }, children: [
        "Open ",
        /* @__PURE__ */ m.jsx("a", { href: "/legacy?legacy=1", style: { color: "#9ec2ff" }, children: "legacy dashboard" }),
        " while this is being fixed."
      ] })
    ] }) : this.props.children;
  }
}
const ou = document.getElementById("root");
if (ou) {
  window.addEventListener("error", (e) => {
    console.error("Window error:", e.error || e.message);
  }), window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled promise rejection:", e.reason);
  });
  try {
    window.__WILDLIFE_DASHBOARD_BOOTED__ = !0, Mv(ou).render(
      /* @__PURE__ */ m.jsx(dC, { children: /* @__PURE__ */ m.jsx(hC, {}) })
    );
  } catch (e) {
    console.error("Fatal dashboard bootstrap error:", e), ou.innerHTML = `
      <div style="padding:24px;color:#e8edff;font-family:Inter,sans-serif">
        <h2 style="margin-top:0">Dashboard failed to initialize</h2>
        <p>${e instanceof Error ? e.message : "Unknown bootstrap error"}</p>
        <p><a href="/legacy?legacy=1" style="color:#9ec2ff">Open legacy dashboard</a></p>
      </div>
    `;
  }
}
