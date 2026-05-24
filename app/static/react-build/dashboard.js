var sx = Object.defineProperty;
var rx = (e, t, n) => t in e ? sx(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Y = (e, t, n) => rx(e, typeof t != "symbol" ? t + "" : t, n);
var ox = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function mg(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var gg = { exports: {} }, bl = {}, _g = { exports: {} }, pt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yo = Symbol.for("react.element"), ax = Symbol.for("react.portal"), lx = Symbol.for("react.fragment"), cx = Symbol.for("react.strict_mode"), ux = Symbol.for("react.profiler"), hx = Symbol.for("react.provider"), dx = Symbol.for("react.context"), fx = Symbol.for("react.forward_ref"), px = Symbol.for("react.suspense"), mx = Symbol.for("react.memo"), gx = Symbol.for("react.lazy"), Nf = Symbol.iterator;
function _x(e) {
  return e === null || typeof e != "object" ? null : (e = Nf && e[Nf] || e["@@iterator"], typeof e == "function" ? e : null);
}
var vg = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, yg = Object.assign, xg = {};
function Hs(e, t, n) {
  this.props = e, this.context = t, this.refs = xg, this.updater = n || vg;
}
Hs.prototype.isReactComponent = {};
Hs.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Hs.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function wg() {
}
wg.prototype = Hs.prototype;
function vh(e, t, n) {
  this.props = e, this.context = t, this.refs = xg, this.updater = n || vg;
}
var yh = vh.prototype = new wg();
yh.constructor = vh;
yg(yh, Hs.prototype);
yh.isPureReactComponent = !0;
var Ef = Array.isArray, bg = Object.prototype.hasOwnProperty, xh = { current: null }, kg = { key: !0, ref: !0, __self: !0, __source: !0 };
function Sg(e, t, n) {
  var i, r = {}, o = null, a = null;
  if (t != null) for (i in t.ref !== void 0 && (a = t.ref), t.key !== void 0 && (o = "" + t.key), t) bg.call(t, i) && !kg.hasOwnProperty(i) && (r[i] = t[i]);
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    for (var u = Array(c), d = 0; d < c; d++) u[d] = arguments[d + 2];
    r.children = u;
  }
  if (e && e.defaultProps) for (i in c = e.defaultProps, c) r[i] === void 0 && (r[i] = c[i]);
  return { $$typeof: yo, type: e, key: o, ref: a, props: r, _owner: xh.current };
}
function vx(e, t) {
  return { $$typeof: yo, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function wh(e) {
  return typeof e == "object" && e !== null && e.$$typeof === yo;
}
function yx(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var zf = /\/+/g;
function bc(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? yx("" + e.key) : t.toString(36);
}
function Sa(e, t, n, i, r) {
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
        case yo:
        case ax:
          a = !0;
      }
  }
  if (a) return a = e, r = r(a), e = i === "" ? "." + bc(a, 0) : i, Ef(r) ? (n = "", e != null && (n = e.replace(zf, "$&/") + "/"), Sa(r, t, n, "", function(d) {
    return d;
  })) : r != null && (wh(r) && (r = vx(r, n + (!r.key || a && a.key === r.key ? "" : ("" + r.key).replace(zf, "$&/") + "/") + e)), t.push(r)), 1;
  if (a = 0, i = i === "" ? "." : i + ":", Ef(e)) for (var c = 0; c < e.length; c++) {
    o = e[c];
    var u = i + bc(o, c);
    a += Sa(o, t, n, u, r);
  }
  else if (u = _x(e), typeof u == "function") for (e = u.call(e), c = 0; !(o = e.next()).done; ) o = o.value, u = i + bc(o, c++), a += Sa(o, t, n, u, r);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return a;
}
function $o(e, t, n) {
  if (e == null) return e;
  var i = [], r = 0;
  return Sa(e, i, "", "", function(o) {
    return t.call(n, o, r++);
  }), i;
}
function xx(e) {
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
var ye = { current: null }, Pa = { transition: null }, wx = { ReactCurrentDispatcher: ye, ReactCurrentBatchConfig: Pa, ReactCurrentOwner: xh };
function Pg() {
  throw Error("act(...) is not supported in production builds of React.");
}
pt.Children = { map: $o, forEach: function(e, t, n) {
  $o(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return $o(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return $o(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!wh(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
pt.Component = Hs;
pt.Fragment = lx;
pt.Profiler = ux;
pt.PureComponent = vh;
pt.StrictMode = cx;
pt.Suspense = px;
pt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = wx;
pt.act = Pg;
pt.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var i = yg({}, e.props), r = e.key, o = e.ref, a = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, a = xh.current), t.key !== void 0 && (r = "" + t.key), e.type && e.type.defaultProps) var c = e.type.defaultProps;
    for (u in t) bg.call(t, u) && !kg.hasOwnProperty(u) && (i[u] = t[u] === void 0 && c !== void 0 ? c[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) i.children = n;
  else if (1 < u) {
    c = Array(u);
    for (var d = 0; d < u; d++) c[d] = arguments[d + 2];
    i.children = c;
  }
  return { $$typeof: yo, type: e.type, key: r, ref: o, props: i, _owner: a };
};
pt.createContext = function(e) {
  return e = { $$typeof: dx, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: hx, _context: e }, e.Consumer = e;
};
pt.createElement = Sg;
pt.createFactory = function(e) {
  var t = Sg.bind(null, e);
  return t.type = e, t;
};
pt.createRef = function() {
  return { current: null };
};
pt.forwardRef = function(e) {
  return { $$typeof: fx, render: e };
};
pt.isValidElement = wh;
pt.lazy = function(e) {
  return { $$typeof: gx, _payload: { _status: -1, _result: e }, _init: xx };
};
pt.memo = function(e, t) {
  return { $$typeof: mx, type: e, compare: t === void 0 ? null : t };
};
pt.startTransition = function(e) {
  var t = Pa.transition;
  Pa.transition = {};
  try {
    e();
  } finally {
    Pa.transition = t;
  }
};
pt.unstable_act = Pg;
pt.useCallback = function(e, t) {
  return ye.current.useCallback(e, t);
};
pt.useContext = function(e) {
  return ye.current.useContext(e);
};
pt.useDebugValue = function() {
};
pt.useDeferredValue = function(e) {
  return ye.current.useDeferredValue(e);
};
pt.useEffect = function(e, t) {
  return ye.current.useEffect(e, t);
};
pt.useId = function() {
  return ye.current.useId();
};
pt.useImperativeHandle = function(e, t, n) {
  return ye.current.useImperativeHandle(e, t, n);
};
pt.useInsertionEffect = function(e, t) {
  return ye.current.useInsertionEffect(e, t);
};
pt.useLayoutEffect = function(e, t) {
  return ye.current.useLayoutEffect(e, t);
};
pt.useMemo = function(e, t) {
  return ye.current.useMemo(e, t);
};
pt.useReducer = function(e, t, n) {
  return ye.current.useReducer(e, t, n);
};
pt.useRef = function(e) {
  return ye.current.useRef(e);
};
pt.useState = function(e) {
  return ye.current.useState(e);
};
pt.useSyncExternalStore = function(e, t, n) {
  return ye.current.useSyncExternalStore(e, t, n);
};
pt.useTransition = function() {
  return ye.current.useTransition();
};
pt.version = "18.3.1";
_g.exports = pt;
var W = _g.exports;
const bx = /* @__PURE__ */ mg(W);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kx = W, Sx = Symbol.for("react.element"), Px = Symbol.for("react.fragment"), Mx = Object.prototype.hasOwnProperty, Cx = kx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Lx = { key: !0, ref: !0, __self: !0, __source: !0 };
function Mg(e, t, n) {
  var i, r = {}, o = null, a = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (a = t.ref);
  for (i in t) Mx.call(t, i) && !Lx.hasOwnProperty(i) && (r[i] = t[i]);
  if (e && e.defaultProps) for (i in t = e.defaultProps, t) r[i] === void 0 && (r[i] = t[i]);
  return { $$typeof: Sx, type: e, key: o, ref: a, props: r, _owner: Cx.current };
}
bl.Fragment = Px;
bl.jsx = Mg;
bl.jsxs = Mg;
gg.exports = bl;
var m = gg.exports, Cg = { exports: {} }, Re = {}, Lg = { exports: {} }, Tg = {};
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
  function t(I, Z) {
    var F = I.length;
    I.push(Z);
    t: for (; 0 < F; ) {
      var G = F - 1 >>> 1, rt = I[G];
      if (0 < r(rt, Z)) I[G] = Z, I[F] = rt, F = G;
      else break t;
    }
  }
  function n(I) {
    return I.length === 0 ? null : I[0];
  }
  function i(I) {
    if (I.length === 0) return null;
    var Z = I[0], F = I.pop();
    if (F !== Z) {
      I[0] = F;
      t: for (var G = 0, rt = I.length, _t = rt >>> 1; G < _t; ) {
        var dt = 2 * (G + 1) - 1, lt = I[dt], J = dt + 1, Qt = I[J];
        if (0 > r(lt, F)) J < rt && 0 > r(Qt, lt) ? (I[G] = Qt, I[J] = F, G = J) : (I[G] = lt, I[dt] = F, G = dt);
        else if (J < rt && 0 > r(Qt, F)) I[G] = Qt, I[J] = F, G = J;
        else break t;
      }
    }
    return Z;
  }
  function r(I, Z) {
    var F = I.sortIndex - Z.sortIndex;
    return F !== 0 ? F : I.id - Z.id;
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
    for (var Z = n(d); Z !== null; ) {
      if (Z.callback === null) i(d);
      else if (Z.startTime <= I) i(d), Z.sortIndex = Z.expirationTime, t(u, Z);
      else break;
      Z = n(d);
    }
  }
  function T(I) {
    if (w = !1, P(I), !S) if (n(u) !== null) S = !0, et(N);
    else {
      var Z = n(d);
      Z !== null && st(T, Z.startTime - I);
    }
  }
  function N(I, Z) {
    S = !1, w && (w = !1, b(O), O = -1), y = !0;
    var F = v;
    try {
      for (P(Z), g = n(u); g !== null && (!(g.expirationTime > Z) || I && !V()); ) {
        var G = g.callback;
        if (typeof G == "function") {
          g.callback = null, v = g.priorityLevel;
          var rt = G(g.expirationTime <= Z);
          Z = e.unstable_now(), typeof rt == "function" ? g.callback = rt : g === n(u) && i(u), P(Z);
        } else i(u);
        g = n(u);
      }
      if (g !== null) var _t = !0;
      else {
        var dt = n(d);
        dt !== null && st(T, dt.startTime - Z), _t = !1;
      }
      return _t;
    } finally {
      g = null, v = F, y = !1;
    }
  }
  var A = !1, j = null, O = -1, H = 5, R = -1;
  function V() {
    return !(e.unstable_now() - R < H);
  }
  function q() {
    if (j !== null) {
      var I = e.unstable_now();
      R = I;
      var Z = !0;
      try {
        Z = j(!0, I);
      } finally {
        Z ? xt() : (A = !1, j = null);
      }
    } else A = !1;
  }
  var xt;
  if (typeof k == "function") xt = function() {
    k(q);
  };
  else if (typeof MessageChannel < "u") {
    var K = new MessageChannel(), ct = K.port2;
    K.port1.onmessage = q, xt = function() {
      ct.postMessage(null);
    };
  } else xt = function() {
    M(q, 0);
  };
  function et(I) {
    j = I, A || (A = !0, xt());
  }
  function st(I, Z) {
    O = M(function() {
      I(e.unstable_now());
    }, Z);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(I) {
    I.callback = null;
  }, e.unstable_continueExecution = function() {
    S || y || (S = !0, et(N));
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
        var Z = 3;
        break;
      default:
        Z = v;
    }
    var F = v;
    v = Z;
    try {
      return I();
    } finally {
      v = F;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(I, Z) {
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
    var F = v;
    v = I;
    try {
      return Z();
    } finally {
      v = F;
    }
  }, e.unstable_scheduleCallback = function(I, Z, F) {
    var G = e.unstable_now();
    switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? G + F : G) : F = G, I) {
      case 1:
        var rt = -1;
        break;
      case 2:
        rt = 250;
        break;
      case 5:
        rt = 1073741823;
        break;
      case 4:
        rt = 1e4;
        break;
      default:
        rt = 5e3;
    }
    return rt = F + rt, I = { id: p++, callback: Z, priorityLevel: I, startTime: F, expirationTime: rt, sortIndex: -1 }, F > G ? (I.sortIndex = F, t(d, I), n(u) === null && I === n(d) && (w ? (b(O), O = -1) : w = !0, st(T, F - G))) : (I.sortIndex = rt, t(u, I), S || y || (S = !0, et(N))), I;
  }, e.unstable_shouldYield = V, e.unstable_wrapCallback = function(I) {
    var Z = v;
    return function() {
      var F = v;
      v = Z;
      try {
        return I.apply(this, arguments);
      } finally {
        v = F;
      }
    };
  };
})(Tg);
Lg.exports = Tg;
var Tx = Lg.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nx = W, Ie = Tx;
function B(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Ng = /* @__PURE__ */ new Set(), qr = {};
function qi(e, t) {
  zs(e, t), zs(e + "Capture", t);
}
function zs(e, t) {
  for (qr[e] = t, e = 0; e < t.length; e++) Ng.add(t[e]);
}
var Rn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), hu = Object.prototype.hasOwnProperty, Ex = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, jf = {}, Of = {};
function zx(e) {
  return hu.call(Of, e) ? !0 : hu.call(jf, e) ? !1 : Ex.test(e) ? Of[e] = !0 : (jf[e] = !0, !1);
}
function jx(e, t, n, i) {
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
function Ox(e, t, n, i) {
  if (t === null || typeof t > "u" || jx(e, t, n, i)) return !0;
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
function xe(e, t, n, i, r, o, a) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = i, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = a;
}
var ae = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ae[e] = new xe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ae[t] = new xe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ae[e] = new xe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ae[e] = new xe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ae[e] = new xe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ae[e] = new xe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ae[e] = new xe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ae[e] = new xe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ae[e] = new xe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var bh = /[\-:]([a-z])/g;
function kh(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    bh,
    kh
  );
  ae[t] = new xe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(bh, kh);
  ae[t] = new xe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(bh, kh);
  ae[t] = new xe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ae[e] = new xe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ae.xlinkHref = new xe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ae[e] = new xe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Sh(e, t, n, i) {
  var r = ae.hasOwnProperty(t) ? ae[t] : null;
  (r !== null ? r.type !== 0 : i || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Ox(t, n, r, i) && (n = null), i || r === null ? zx(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : r.mustUseProperty ? e[r.propertyName] = n === null ? r.type === 3 ? !1 : "" : n : (t = r.attributeName, i = r.attributeNamespace, n === null ? e.removeAttribute(t) : (r = r.type, n = r === 3 || r === 4 && n === !0 ? "" : "" + n, i ? e.setAttributeNS(i, t, n) : e.setAttribute(t, n))));
}
var Hn = Nx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Yo = Symbol.for("react.element"), hs = Symbol.for("react.portal"), ds = Symbol.for("react.fragment"), Ph = Symbol.for("react.strict_mode"), du = Symbol.for("react.profiler"), Eg = Symbol.for("react.provider"), zg = Symbol.for("react.context"), Mh = Symbol.for("react.forward_ref"), fu = Symbol.for("react.suspense"), pu = Symbol.for("react.suspense_list"), Ch = Symbol.for("react.memo"), Yn = Symbol.for("react.lazy"), jg = Symbol.for("react.offscreen"), Af = Symbol.iterator;
function dr(e) {
  return e === null || typeof e != "object" ? null : (e = Af && e[Af] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Rt = Object.assign, kc;
function Pr(e) {
  if (kc === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    kc = t && t[1] || "";
  }
  return `
` + kc + e;
}
var Sc = !1;
function Pc(e, t) {
  if (!e || Sc) return "";
  Sc = !0;
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
    Sc = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Pr(e) : "";
}
function Ax(e) {
  switch (e.tag) {
    case 5:
      return Pr(e.type);
    case 16:
      return Pr("Lazy");
    case 13:
      return Pr("Suspense");
    case 19:
      return Pr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Pc(e.type, !1), e;
    case 11:
      return e = Pc(e.type.render, !1), e;
    case 1:
      return e = Pc(e.type, !0), e;
    default:
      return "";
  }
}
function mu(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case ds:
      return "Fragment";
    case hs:
      return "Portal";
    case du:
      return "Profiler";
    case Ph:
      return "StrictMode";
    case fu:
      return "Suspense";
    case pu:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case zg:
      return (e.displayName || "Context") + ".Consumer";
    case Eg:
      return (e._context.displayName || "Context") + ".Provider";
    case Mh:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Ch:
      return t = e.displayName || null, t !== null ? t : mu(e.type) || "Memo";
    case Yn:
      t = e._payload, e = e._init;
      try {
        return mu(e(t));
      } catch {
      }
  }
  return null;
}
function Ix(e) {
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
      return mu(t);
    case 8:
      return t === Ph ? "StrictMode" : "Mode";
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
function fi(e) {
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
function Og(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Rx(e) {
  var t = Og(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), i = "" + e[t];
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
function qo(e) {
  e._valueTracker || (e._valueTracker = Rx(e));
}
function Ag(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), i = "";
  return e && (i = Og(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), !0) : !1;
}
function Wa(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function gu(e, t) {
  var n = t.checked;
  return Rt({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function If(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, i = t.checked != null ? t.checked : t.defaultChecked;
  n = fi(t.value != null ? t.value : n), e._wrapperState = { initialChecked: i, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Ig(e, t) {
  t = t.checked, t != null && Sh(e, "checked", t, !1);
}
function _u(e, t) {
  Ig(e, t);
  var n = fi(t.value), i = t.type;
  if (n != null) i === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (i === "submit" || i === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? vu(e, t.type, n) : t.hasOwnProperty("defaultValue") && vu(e, t.type, fi(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Rf(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var i = t.type;
    if (!(i !== "submit" && i !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function vu(e, t, n) {
  (t !== "number" || Wa(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Mr = Array.isArray;
function ks(e, t, n, i) {
  if (e = e.options, t) {
    t = {};
    for (var r = 0; r < n.length; r++) t["$" + n[r]] = !0;
    for (n = 0; n < e.length; n++) r = t.hasOwnProperty("$" + e[n].value), e[n].selected !== r && (e[n].selected = r), r && i && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + fi(n), t = null, r = 0; r < e.length; r++) {
      if (e[r].value === n) {
        e[r].selected = !0, i && (e[r].defaultSelected = !0);
        return;
      }
      t !== null || e[r].disabled || (t = e[r]);
    }
    t !== null && (t.selected = !0);
  }
}
function yu(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(B(91));
  return Rt({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Df(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(B(92));
      if (Mr(n)) {
        if (1 < n.length) throw Error(B(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: fi(n) };
}
function Rg(e, t) {
  var n = fi(t.value), i = fi(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), i != null && (e.defaultValue = "" + i);
}
function Ff(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Dg(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function xu(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Dg(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Ko, Fg = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, i, r) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, i, r);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Ko = Ko || document.createElement("div"), Ko.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Ko.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Kr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Or = {
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
}, Dx = ["Webkit", "ms", "Moz", "O"];
Object.keys(Or).forEach(function(e) {
  Dx.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Or[t] = Or[e];
  });
});
function Bg(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Or.hasOwnProperty(e) && Or[e] ? ("" + t).trim() : t + "px";
}
function Hg(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var i = n.indexOf("--") === 0, r = Bg(n, t[n], i);
    n === "float" && (n = "cssFloat"), i ? e.setProperty(n, r) : e[n] = r;
  }
}
var Fx = Rt({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function wu(e, t) {
  if (t) {
    if (Fx[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(B(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(B(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(B(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(B(62));
  }
}
function bu(e, t) {
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
var ku = null;
function Lh(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Su = null, Ss = null, Ps = null;
function Bf(e) {
  if (e = bo(e)) {
    if (typeof Su != "function") throw Error(B(280));
    var t = e.stateNode;
    t && (t = Cl(t), Su(e.stateNode, e.type, t));
  }
}
function Wg(e) {
  Ss ? Ps ? Ps.push(e) : Ps = [e] : Ss = e;
}
function Vg() {
  if (Ss) {
    var e = Ss, t = Ps;
    if (Ps = Ss = null, Bf(e), t) for (e = 0; e < t.length; e++) Bf(t[e]);
  }
}
function Zg(e, t) {
  return e(t);
}
function Ug() {
}
var Mc = !1;
function $g(e, t, n) {
  if (Mc) return e(t, n);
  Mc = !0;
  try {
    return Zg(e, t, n);
  } finally {
    Mc = !1, (Ss !== null || Ps !== null) && (Ug(), Vg());
  }
}
function Xr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var i = Cl(n);
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
var Pu = !1;
if (Rn) try {
  var fr = {};
  Object.defineProperty(fr, "passive", { get: function() {
    Pu = !0;
  } }), window.addEventListener("test", fr, fr), window.removeEventListener("test", fr, fr);
} catch {
  Pu = !1;
}
function Bx(e, t, n, i, r, o, a, c, u) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (p) {
    this.onError(p);
  }
}
var Ar = !1, Va = null, Za = !1, Mu = null, Hx = { onError: function(e) {
  Ar = !0, Va = e;
} };
function Wx(e, t, n, i, r, o, a, c, u) {
  Ar = !1, Va = null, Bx.apply(Hx, arguments);
}
function Vx(e, t, n, i, r, o, a, c, u) {
  if (Wx.apply(this, arguments), Ar) {
    if (Ar) {
      var d = Va;
      Ar = !1, Va = null;
    } else throw Error(B(198));
    Za || (Za = !0, Mu = d);
  }
}
function Ki(e) {
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
function Yg(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Hf(e) {
  if (Ki(e) !== e) throw Error(B(188));
}
function Zx(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Ki(e), t === null) throw Error(B(188));
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
        if (o === n) return Hf(r), e;
        if (o === i) return Hf(r), t;
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
function qg(e) {
  return e = Zx(e), e !== null ? Kg(e) : null;
}
function Kg(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Kg(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Xg = Ie.unstable_scheduleCallback, Wf = Ie.unstable_cancelCallback, Ux = Ie.unstable_shouldYield, $x = Ie.unstable_requestPaint, Wt = Ie.unstable_now, Yx = Ie.unstable_getCurrentPriorityLevel, Th = Ie.unstable_ImmediatePriority, Gg = Ie.unstable_UserBlockingPriority, Ua = Ie.unstable_NormalPriority, qx = Ie.unstable_LowPriority, Qg = Ie.unstable_IdlePriority, kl = null, _n = null;
function Kx(e) {
  if (_n && typeof _n.onCommitFiberRoot == "function") try {
    _n.onCommitFiberRoot(kl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var en = Math.clz32 ? Math.clz32 : Qx, Xx = Math.log, Gx = Math.LN2;
function Qx(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Xx(e) / Gx | 0) | 0;
}
var Xo = 64, Go = 4194304;
function Cr(e) {
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
function $a(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var i = 0, r = e.suspendedLanes, o = e.pingedLanes, a = n & 268435455;
  if (a !== 0) {
    var c = a & ~r;
    c !== 0 ? i = Cr(c) : (o &= a, o !== 0 && (i = Cr(o)));
  } else a = n & ~r, a !== 0 ? i = Cr(a) : o !== 0 && (i = Cr(o));
  if (i === 0) return 0;
  if (t !== 0 && t !== i && !(t & r) && (r = i & -i, o = t & -t, r >= o || r === 16 && (o & 4194240) !== 0)) return t;
  if (i & 4 && (i |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= i; 0 < t; ) n = 31 - en(t), r = 1 << n, i |= e[n], t &= ~r;
  return i;
}
function Jx(e, t) {
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
function t1(e, t) {
  for (var n = e.suspendedLanes, i = e.pingedLanes, r = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var a = 31 - en(o), c = 1 << a, u = r[a];
    u === -1 ? (!(c & n) || c & i) && (r[a] = Jx(c, t)) : u <= t && (e.expiredLanes |= c), o &= ~c;
  }
}
function Cu(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Jg() {
  var e = Xo;
  return Xo <<= 1, !(Xo & 4194240) && (Xo = 64), e;
}
function Cc(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function xo(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - en(t), e[t] = n;
}
function e1(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var i = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var r = 31 - en(n), o = 1 << r;
    t[r] = 0, i[r] = -1, e[r] = -1, n &= ~o;
  }
}
function Nh(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var i = 31 - en(n), r = 1 << i;
    r & t | e[i] & t && (e[i] |= t), n &= ~r;
  }
}
var Pt = 0;
function t_(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var e_, Eh, n_, i_, s_, Lu = !1, Qo = [], si = null, ri = null, oi = null, Gr = /* @__PURE__ */ new Map(), Qr = /* @__PURE__ */ new Map(), Kn = [], n1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Vf(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      si = null;
      break;
    case "dragenter":
    case "dragleave":
      ri = null;
      break;
    case "mouseover":
    case "mouseout":
      oi = null;
      break;
    case "pointerover":
    case "pointerout":
      Gr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Qr.delete(t.pointerId);
  }
}
function pr(e, t, n, i, r, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: i, nativeEvent: o, targetContainers: [r] }, t !== null && (t = bo(t), t !== null && Eh(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, r !== null && t.indexOf(r) === -1 && t.push(r), e);
}
function i1(e, t, n, i, r) {
  switch (t) {
    case "focusin":
      return si = pr(si, e, t, n, i, r), !0;
    case "dragenter":
      return ri = pr(ri, e, t, n, i, r), !0;
    case "mouseover":
      return oi = pr(oi, e, t, n, i, r), !0;
    case "pointerover":
      var o = r.pointerId;
      return Gr.set(o, pr(Gr.get(o) || null, e, t, n, i, r)), !0;
    case "gotpointercapture":
      return o = r.pointerId, Qr.set(o, pr(Qr.get(o) || null, e, t, n, i, r)), !0;
  }
  return !1;
}
function r_(e) {
  var t = ji(e.target);
  if (t !== null) {
    var n = Ki(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Yg(n), t !== null) {
          e.blockedOn = t, s_(e.priority, function() {
            n_(n);
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
function Ma(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Tu(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var i = new n.constructor(n.type, n);
      ku = i, n.target.dispatchEvent(i), ku = null;
    } else return t = bo(n), t !== null && Eh(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Zf(e, t, n) {
  Ma(e) && n.delete(t);
}
function s1() {
  Lu = !1, si !== null && Ma(si) && (si = null), ri !== null && Ma(ri) && (ri = null), oi !== null && Ma(oi) && (oi = null), Gr.forEach(Zf), Qr.forEach(Zf);
}
function mr(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Lu || (Lu = !0, Ie.unstable_scheduleCallback(Ie.unstable_NormalPriority, s1)));
}
function Jr(e) {
  function t(r) {
    return mr(r, e);
  }
  if (0 < Qo.length) {
    mr(Qo[0], e);
    for (var n = 1; n < Qo.length; n++) {
      var i = Qo[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
  }
  for (si !== null && mr(si, e), ri !== null && mr(ri, e), oi !== null && mr(oi, e), Gr.forEach(t), Qr.forEach(t), n = 0; n < Kn.length; n++) i = Kn[n], i.blockedOn === e && (i.blockedOn = null);
  for (; 0 < Kn.length && (n = Kn[0], n.blockedOn === null); ) r_(n), n.blockedOn === null && Kn.shift();
}
var Ms = Hn.ReactCurrentBatchConfig, Ya = !0;
function r1(e, t, n, i) {
  var r = Pt, o = Ms.transition;
  Ms.transition = null;
  try {
    Pt = 1, zh(e, t, n, i);
  } finally {
    Pt = r, Ms.transition = o;
  }
}
function o1(e, t, n, i) {
  var r = Pt, o = Ms.transition;
  Ms.transition = null;
  try {
    Pt = 4, zh(e, t, n, i);
  } finally {
    Pt = r, Ms.transition = o;
  }
}
function zh(e, t, n, i) {
  if (Ya) {
    var r = Tu(e, t, n, i);
    if (r === null) Rc(e, t, i, qa, n), Vf(e, i);
    else if (i1(r, e, t, n, i)) i.stopPropagation();
    else if (Vf(e, i), t & 4 && -1 < n1.indexOf(e)) {
      for (; r !== null; ) {
        var o = bo(r);
        if (o !== null && e_(o), o = Tu(e, t, n, i), o === null && Rc(e, t, i, qa, n), o === r) break;
        r = o;
      }
      r !== null && i.stopPropagation();
    } else Rc(e, t, i, null, n);
  }
}
var qa = null;
function Tu(e, t, n, i) {
  if (qa = null, e = Lh(i), e = ji(e), e !== null) if (t = Ki(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Yg(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return qa = e, null;
}
function o_(e) {
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
      switch (Yx()) {
        case Th:
          return 1;
        case Gg:
          return 4;
        case Ua:
        case qx:
          return 16;
        case Qg:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Gn = null, jh = null, Ca = null;
function a_() {
  if (Ca) return Ca;
  var e, t = jh, n = t.length, i, r = "value" in Gn ? Gn.value : Gn.textContent, o = r.length;
  for (e = 0; e < n && t[e] === r[e]; e++) ;
  var a = n - e;
  for (i = 1; i <= a && t[n - i] === r[o - i]; i++) ;
  return Ca = r.slice(e, 1 < i ? 1 - i : void 0);
}
function La(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Jo() {
  return !0;
}
function Uf() {
  return !1;
}
function De(e) {
  function t(n, i, r, o, a) {
    this._reactName = n, this._targetInst = r, this.type = i, this.nativeEvent = o, this.target = a, this.currentTarget = null;
    for (var c in e) e.hasOwnProperty(c) && (n = e[c], this[c] = n ? n(o) : o[c]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Jo : Uf, this.isPropagationStopped = Uf, this;
  }
  return Rt(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Jo);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Jo);
  }, persist: function() {
  }, isPersistent: Jo }), t;
}
var Ws = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Oh = De(Ws), wo = Rt({}, Ws, { view: 0, detail: 0 }), a1 = De(wo), Lc, Tc, gr, Sl = Rt({}, wo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ah, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== gr && (gr && e.type === "mousemove" ? (Lc = e.screenX - gr.screenX, Tc = e.screenY - gr.screenY) : Tc = Lc = 0, gr = e), Lc);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Tc;
} }), $f = De(Sl), l1 = Rt({}, Sl, { dataTransfer: 0 }), c1 = De(l1), u1 = Rt({}, wo, { relatedTarget: 0 }), Nc = De(u1), h1 = Rt({}, Ws, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), d1 = De(h1), f1 = Rt({}, Ws, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), p1 = De(f1), m1 = Rt({}, Ws, { data: 0 }), Yf = De(m1), g1 = {
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
}, _1 = {
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
}, v1 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function y1(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = v1[e]) ? !!t[e] : !1;
}
function Ah() {
  return y1;
}
var x1 = Rt({}, wo, { key: function(e) {
  if (e.key) {
    var t = g1[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = La(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? _1[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ah, charCode: function(e) {
  return e.type === "keypress" ? La(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? La(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), w1 = De(x1), b1 = Rt({}, Sl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), qf = De(b1), k1 = Rt({}, wo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ah }), S1 = De(k1), P1 = Rt({}, Ws, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), M1 = De(P1), C1 = Rt({}, Sl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), L1 = De(C1), T1 = [9, 13, 27, 32], Ih = Rn && "CompositionEvent" in window, Ir = null;
Rn && "documentMode" in document && (Ir = document.documentMode);
var N1 = Rn && "TextEvent" in window && !Ir, l_ = Rn && (!Ih || Ir && 8 < Ir && 11 >= Ir), Kf = " ", Xf = !1;
function c_(e, t) {
  switch (e) {
    case "keyup":
      return T1.indexOf(t.keyCode) !== -1;
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
function u_(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var fs = !1;
function E1(e, t) {
  switch (e) {
    case "compositionend":
      return u_(t);
    case "keypress":
      return t.which !== 32 ? null : (Xf = !0, Kf);
    case "textInput":
      return e = t.data, e === Kf && Xf ? null : e;
    default:
      return null;
  }
}
function z1(e, t) {
  if (fs) return e === "compositionend" || !Ih && c_(e, t) ? (e = a_(), Ca = jh = Gn = null, fs = !1, e) : null;
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
      return l_ && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var j1 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Gf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!j1[e.type] : t === "textarea";
}
function h_(e, t, n, i) {
  Wg(i), t = Ka(t, "onChange"), 0 < t.length && (n = new Oh("onChange", "change", null, n, i), e.push({ event: n, listeners: t }));
}
var Rr = null, to = null;
function O1(e) {
  b_(e, 0);
}
function Pl(e) {
  var t = gs(e);
  if (Ag(t)) return e;
}
function A1(e, t) {
  if (e === "change") return t;
}
var d_ = !1;
if (Rn) {
  var Ec;
  if (Rn) {
    var zc = "oninput" in document;
    if (!zc) {
      var Qf = document.createElement("div");
      Qf.setAttribute("oninput", "return;"), zc = typeof Qf.oninput == "function";
    }
    Ec = zc;
  } else Ec = !1;
  d_ = Ec && (!document.documentMode || 9 < document.documentMode);
}
function Jf() {
  Rr && (Rr.detachEvent("onpropertychange", f_), to = Rr = null);
}
function f_(e) {
  if (e.propertyName === "value" && Pl(to)) {
    var t = [];
    h_(t, to, e, Lh(e)), $g(O1, t);
  }
}
function I1(e, t, n) {
  e === "focusin" ? (Jf(), Rr = t, to = n, Rr.attachEvent("onpropertychange", f_)) : e === "focusout" && Jf();
}
function R1(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Pl(to);
}
function D1(e, t) {
  if (e === "click") return Pl(t);
}
function F1(e, t) {
  if (e === "input" || e === "change") return Pl(t);
}
function B1(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var sn = typeof Object.is == "function" ? Object.is : B1;
function eo(e, t) {
  if (sn(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), i = Object.keys(t);
  if (n.length !== i.length) return !1;
  for (i = 0; i < n.length; i++) {
    var r = n[i];
    if (!hu.call(t, r) || !sn(e[r], t[r])) return !1;
  }
  return !0;
}
function tp(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ep(e, t) {
  var n = tp(e);
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
    n = tp(n);
  }
}
function p_(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? p_(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function m_() {
  for (var e = window, t = Wa(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Wa(e.document);
  }
  return t;
}
function Rh(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function H1(e) {
  var t = m_(), n = e.focusedElem, i = e.selectionRange;
  if (t !== n && n && n.ownerDocument && p_(n.ownerDocument.documentElement, n)) {
    if (i !== null && Rh(n)) {
      if (t = i.start, e = i.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var r = n.textContent.length, o = Math.min(i.start, r);
        i = i.end === void 0 ? o : Math.min(i.end, r), !e.extend && o > i && (r = i, i = o, o = r), r = ep(n, o);
        var a = ep(
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
var W1 = Rn && "documentMode" in document && 11 >= document.documentMode, ps = null, Nu = null, Dr = null, Eu = !1;
function np(e, t, n) {
  var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Eu || ps == null || ps !== Wa(i) || (i = ps, "selectionStart" in i && Rh(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = { anchorNode: i.anchorNode, anchorOffset: i.anchorOffset, focusNode: i.focusNode, focusOffset: i.focusOffset }), Dr && eo(Dr, i) || (Dr = i, i = Ka(Nu, "onSelect"), 0 < i.length && (t = new Oh("onSelect", "select", null, t, n), e.push({ event: t, listeners: i }), t.target = ps)));
}
function ta(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var ms = { animationend: ta("Animation", "AnimationEnd"), animationiteration: ta("Animation", "AnimationIteration"), animationstart: ta("Animation", "AnimationStart"), transitionend: ta("Transition", "TransitionEnd") }, jc = {}, g_ = {};
Rn && (g_ = document.createElement("div").style, "AnimationEvent" in window || (delete ms.animationend.animation, delete ms.animationiteration.animation, delete ms.animationstart.animation), "TransitionEvent" in window || delete ms.transitionend.transition);
function Ml(e) {
  if (jc[e]) return jc[e];
  if (!ms[e]) return e;
  var t = ms[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in g_) return jc[e] = t[n];
  return e;
}
var __ = Ml("animationend"), v_ = Ml("animationiteration"), y_ = Ml("animationstart"), x_ = Ml("transitionend"), w_ = /* @__PURE__ */ new Map(), ip = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function gi(e, t) {
  w_.set(e, t), qi(t, [e]);
}
for (var Oc = 0; Oc < ip.length; Oc++) {
  var Ac = ip[Oc], V1 = Ac.toLowerCase(), Z1 = Ac[0].toUpperCase() + Ac.slice(1);
  gi(V1, "on" + Z1);
}
gi(__, "onAnimationEnd");
gi(v_, "onAnimationIteration");
gi(y_, "onAnimationStart");
gi("dblclick", "onDoubleClick");
gi("focusin", "onFocus");
gi("focusout", "onBlur");
gi(x_, "onTransitionEnd");
zs("onMouseEnter", ["mouseout", "mouseover"]);
zs("onMouseLeave", ["mouseout", "mouseover"]);
zs("onPointerEnter", ["pointerout", "pointerover"]);
zs("onPointerLeave", ["pointerout", "pointerover"]);
qi("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
qi("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
qi("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
qi("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
qi("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
qi("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Lr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), U1 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Lr));
function sp(e, t, n) {
  var i = e.type || "unknown-event";
  e.currentTarget = n, Vx(i, t, void 0, e), e.currentTarget = null;
}
function b_(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var i = e[n], r = i.event;
    i = i.listeners;
    t: {
      var o = void 0;
      if (t) for (var a = i.length - 1; 0 <= a; a--) {
        var c = i[a], u = c.instance, d = c.currentTarget;
        if (c = c.listener, u !== o && r.isPropagationStopped()) break t;
        sp(r, c, d), o = u;
      }
      else for (a = 0; a < i.length; a++) {
        if (c = i[a], u = c.instance, d = c.currentTarget, c = c.listener, u !== o && r.isPropagationStopped()) break t;
        sp(r, c, d), o = u;
      }
    }
  }
  if (Za) throw e = Mu, Za = !1, Mu = null, e;
}
function Tt(e, t) {
  var n = t[Iu];
  n === void 0 && (n = t[Iu] = /* @__PURE__ */ new Set());
  var i = e + "__bubble";
  n.has(i) || (k_(t, e, 2, !1), n.add(i));
}
function Ic(e, t, n) {
  var i = 0;
  t && (i |= 4), k_(n, e, i, t);
}
var ea = "_reactListening" + Math.random().toString(36).slice(2);
function no(e) {
  if (!e[ea]) {
    e[ea] = !0, Ng.forEach(function(n) {
      n !== "selectionchange" && (U1.has(n) || Ic(n, !1, e), Ic(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[ea] || (t[ea] = !0, Ic("selectionchange", !1, t));
  }
}
function k_(e, t, n, i) {
  switch (o_(t)) {
    case 1:
      var r = r1;
      break;
    case 4:
      r = o1;
      break;
    default:
      r = zh;
  }
  n = r.bind(null, t, n, e), r = void 0, !Pu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (r = !0), i ? r !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: r }) : e.addEventListener(t, n, !0) : r !== void 0 ? e.addEventListener(t, n, { passive: r }) : e.addEventListener(t, n, !1);
}
function Rc(e, t, n, i, r) {
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
        if (a = ji(c), a === null) return;
        if (u = a.tag, u === 5 || u === 6) {
          i = o = a;
          continue t;
        }
        c = c.parentNode;
      }
    }
    i = i.return;
  }
  $g(function() {
    var d = o, p = Lh(n), g = [];
    t: {
      var v = w_.get(e);
      if (v !== void 0) {
        var y = Oh, S = e;
        switch (e) {
          case "keypress":
            if (La(n) === 0) break t;
          case "keydown":
          case "keyup":
            y = w1;
            break;
          case "focusin":
            S = "focus", y = Nc;
            break;
          case "focusout":
            S = "blur", y = Nc;
            break;
          case "beforeblur":
          case "afterblur":
            y = Nc;
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
            y = $f;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = c1;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = S1;
            break;
          case __:
          case v_:
          case y_:
            y = d1;
            break;
          case x_:
            y = M1;
            break;
          case "scroll":
            y = a1;
            break;
          case "wheel":
            y = L1;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = p1;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = qf;
        }
        var w = (t & 4) !== 0, M = !w && e === "scroll", b = w ? v !== null ? v + "Capture" : null : v;
        w = [];
        for (var k = d, P; k !== null; ) {
          P = k;
          var T = P.stateNode;
          if (P.tag === 5 && T !== null && (P = T, b !== null && (T = Xr(k, b), T != null && w.push(io(k, T, P)))), M) break;
          k = k.return;
        }
        0 < w.length && (v = new y(v, S, null, n, p), g.push({ event: v, listeners: w }));
      }
    }
    if (!(t & 7)) {
      t: {
        if (v = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", v && n !== ku && (S = n.relatedTarget || n.fromElement) && (ji(S) || S[Dn])) break t;
        if ((y || v) && (v = p.window === p ? p : (v = p.ownerDocument) ? v.defaultView || v.parentWindow : window, y ? (S = n.relatedTarget || n.toElement, y = d, S = S ? ji(S) : null, S !== null && (M = Ki(S), S !== M || S.tag !== 5 && S.tag !== 6) && (S = null)) : (y = null, S = d), y !== S)) {
          if (w = $f, T = "onMouseLeave", b = "onMouseEnter", k = "mouse", (e === "pointerout" || e === "pointerover") && (w = qf, T = "onPointerLeave", b = "onPointerEnter", k = "pointer"), M = y == null ? v : gs(y), P = S == null ? v : gs(S), v = new w(T, k + "leave", y, n, p), v.target = M, v.relatedTarget = P, T = null, ji(p) === d && (w = new w(b, k + "enter", S, n, p), w.target = P, w.relatedTarget = M, T = w), M = T, y && S) e: {
            for (w = y, b = S, k = 0, P = w; P; P = as(P)) k++;
            for (P = 0, T = b; T; T = as(T)) P++;
            for (; 0 < k - P; ) w = as(w), k--;
            for (; 0 < P - k; ) b = as(b), P--;
            for (; k--; ) {
              if (w === b || b !== null && w === b.alternate) break e;
              w = as(w), b = as(b);
            }
            w = null;
          }
          else w = null;
          y !== null && rp(g, v, y, w, !1), S !== null && M !== null && rp(g, M, S, w, !0);
        }
      }
      t: {
        if (v = d ? gs(d) : window, y = v.nodeName && v.nodeName.toLowerCase(), y === "select" || y === "input" && v.type === "file") var N = A1;
        else if (Gf(v)) if (d_) N = F1;
        else {
          N = R1;
          var A = I1;
        }
        else (y = v.nodeName) && y.toLowerCase() === "input" && (v.type === "checkbox" || v.type === "radio") && (N = D1);
        if (N && (N = N(e, d))) {
          h_(g, N, n, p);
          break t;
        }
        A && A(e, v, d), e === "focusout" && (A = v._wrapperState) && A.controlled && v.type === "number" && vu(v, "number", v.value);
      }
      switch (A = d ? gs(d) : window, e) {
        case "focusin":
          (Gf(A) || A.contentEditable === "true") && (ps = A, Nu = d, Dr = null);
          break;
        case "focusout":
          Dr = Nu = ps = null;
          break;
        case "mousedown":
          Eu = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Eu = !1, np(g, n, p);
          break;
        case "selectionchange":
          if (W1) break;
        case "keydown":
        case "keyup":
          np(g, n, p);
      }
      var j;
      if (Ih) t: {
        switch (e) {
          case "compositionstart":
            var O = "onCompositionStart";
            break t;
          case "compositionend":
            O = "onCompositionEnd";
            break t;
          case "compositionupdate":
            O = "onCompositionUpdate";
            break t;
        }
        O = void 0;
      }
      else fs ? c_(e, n) && (O = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (O = "onCompositionStart");
      O && (l_ && n.locale !== "ko" && (fs || O !== "onCompositionStart" ? O === "onCompositionEnd" && fs && (j = a_()) : (Gn = p, jh = "value" in Gn ? Gn.value : Gn.textContent, fs = !0)), A = Ka(d, O), 0 < A.length && (O = new Yf(O, e, null, n, p), g.push({ event: O, listeners: A }), j ? O.data = j : (j = u_(n), j !== null && (O.data = j)))), (j = N1 ? E1(e, n) : z1(e, n)) && (d = Ka(d, "onBeforeInput"), 0 < d.length && (p = new Yf("onBeforeInput", "beforeinput", null, n, p), g.push({ event: p, listeners: d }), p.data = j));
    }
    b_(g, t);
  });
}
function io(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ka(e, t) {
  for (var n = t + "Capture", i = []; e !== null; ) {
    var r = e, o = r.stateNode;
    r.tag === 5 && o !== null && (r = o, o = Xr(e, n), o != null && i.unshift(io(e, o, r)), o = Xr(e, t), o != null && i.push(io(e, o, r))), e = e.return;
  }
  return i;
}
function as(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function rp(e, t, n, i, r) {
  for (var o = t._reactName, a = []; n !== null && n !== i; ) {
    var c = n, u = c.alternate, d = c.stateNode;
    if (u !== null && u === i) break;
    c.tag === 5 && d !== null && (c = d, r ? (u = Xr(n, o), u != null && a.unshift(io(n, u, c))) : r || (u = Xr(n, o), u != null && a.push(io(n, u, c)))), n = n.return;
  }
  a.length !== 0 && e.push({ event: t, listeners: a });
}
var $1 = /\r\n?/g, Y1 = /\u0000|\uFFFD/g;
function op(e) {
  return (typeof e == "string" ? e : "" + e).replace($1, `
`).replace(Y1, "");
}
function na(e, t, n) {
  if (t = op(t), op(e) !== t && n) throw Error(B(425));
}
function Xa() {
}
var zu = null, ju = null;
function Ou(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Au = typeof setTimeout == "function" ? setTimeout : void 0, q1 = typeof clearTimeout == "function" ? clearTimeout : void 0, ap = typeof Promise == "function" ? Promise : void 0, K1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof ap < "u" ? function(e) {
  return ap.resolve(null).then(e).catch(X1);
} : Au;
function X1(e) {
  setTimeout(function() {
    throw e;
  });
}
function Dc(e, t) {
  var n = t, i = 0;
  do {
    var r = n.nextSibling;
    if (e.removeChild(n), r && r.nodeType === 8) if (n = r.data, n === "/$") {
      if (i === 0) {
        e.removeChild(r), Jr(t);
        return;
      }
      i--;
    } else n !== "$" && n !== "$?" && n !== "$!" || i++;
    n = r;
  } while (n);
  Jr(t);
}
function ai(e) {
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
function lp(e) {
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
var Vs = Math.random().toString(36).slice(2), gn = "__reactFiber$" + Vs, so = "__reactProps$" + Vs, Dn = "__reactContainer$" + Vs, Iu = "__reactEvents$" + Vs, G1 = "__reactListeners$" + Vs, Q1 = "__reactHandles$" + Vs;
function ji(e) {
  var t = e[gn];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Dn] || n[gn]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = lp(e); e !== null; ) {
        if (n = e[gn]) return n;
        e = lp(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function bo(e) {
  return e = e[gn] || e[Dn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function gs(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(B(33));
}
function Cl(e) {
  return e[so] || null;
}
var Ru = [], _s = -1;
function _i(e) {
  return { current: e };
}
function Et(e) {
  0 > _s || (e.current = Ru[_s], Ru[_s] = null, _s--);
}
function Lt(e, t) {
  _s++, Ru[_s] = e.current, e.current = t;
}
var pi = {}, pe = _i(pi), Le = _i(!1), Hi = pi;
function js(e, t) {
  var n = e.type.contextTypes;
  if (!n) return pi;
  var i = e.stateNode;
  if (i && i.__reactInternalMemoizedUnmaskedChildContext === t) return i.__reactInternalMemoizedMaskedChildContext;
  var r = {}, o;
  for (o in n) r[o] = t[o];
  return i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = r), r;
}
function Te(e) {
  return e = e.childContextTypes, e != null;
}
function Ga() {
  Et(Le), Et(pe);
}
function cp(e, t, n) {
  if (pe.current !== pi) throw Error(B(168));
  Lt(pe, t), Lt(Le, n);
}
function S_(e, t, n) {
  var i = e.stateNode;
  if (t = t.childContextTypes, typeof i.getChildContext != "function") return n;
  i = i.getChildContext();
  for (var r in i) if (!(r in t)) throw Error(B(108, Ix(e) || "Unknown", r));
  return Rt({}, n, i);
}
function Qa(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || pi, Hi = pe.current, Lt(pe, e), Lt(Le, Le.current), !0;
}
function up(e, t, n) {
  var i = e.stateNode;
  if (!i) throw Error(B(169));
  n ? (e = S_(e, t, Hi), i.__reactInternalMemoizedMergedChildContext = e, Et(Le), Et(pe), Lt(pe, e)) : Et(Le), Lt(Le, n);
}
var Nn = null, Ll = !1, Fc = !1;
function P_(e) {
  Nn === null ? Nn = [e] : Nn.push(e);
}
function J1(e) {
  Ll = !0, P_(e);
}
function vi() {
  if (!Fc && Nn !== null) {
    Fc = !0;
    var e = 0, t = Pt;
    try {
      var n = Nn;
      for (Pt = 1; e < n.length; e++) {
        var i = n[e];
        do
          i = i(!0);
        while (i !== null);
      }
      Nn = null, Ll = !1;
    } catch (r) {
      throw Nn !== null && (Nn = Nn.slice(e + 1)), Xg(Th, vi), r;
    } finally {
      Pt = t, Fc = !1;
    }
  }
  return null;
}
var vs = [], ys = 0, Ja = null, tl = 0, Ve = [], Ze = 0, Wi = null, zn = 1, jn = "";
function Ti(e, t) {
  vs[ys++] = tl, vs[ys++] = Ja, Ja = e, tl = t;
}
function M_(e, t, n) {
  Ve[Ze++] = zn, Ve[Ze++] = jn, Ve[Ze++] = Wi, Wi = e;
  var i = zn;
  e = jn;
  var r = 32 - en(i) - 1;
  i &= ~(1 << r), n += 1;
  var o = 32 - en(t) + r;
  if (30 < o) {
    var a = r - r % 5;
    o = (i & (1 << a) - 1).toString(32), i >>= a, r -= a, zn = 1 << 32 - en(t) + r | n << r | i, jn = o + e;
  } else zn = 1 << o | n << r | i, jn = e;
}
function Dh(e) {
  e.return !== null && (Ti(e, 1), M_(e, 1, 0));
}
function Fh(e) {
  for (; e === Ja; ) Ja = vs[--ys], vs[ys] = null, tl = vs[--ys], vs[ys] = null;
  for (; e === Wi; ) Wi = Ve[--Ze], Ve[Ze] = null, jn = Ve[--Ze], Ve[Ze] = null, zn = Ve[--Ze], Ve[Ze] = null;
}
var Ae = null, Oe = null, zt = !1, tn = null;
function C_(e, t) {
  var n = Ue(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function hp(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Ae = e, Oe = ai(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ae = e, Oe = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Wi !== null ? { id: zn, overflow: jn } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ue(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ae = e, Oe = null, !0) : !1;
    default:
      return !1;
  }
}
function Du(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Fu(e) {
  if (zt) {
    var t = Oe;
    if (t) {
      var n = t;
      if (!hp(e, t)) {
        if (Du(e)) throw Error(B(418));
        t = ai(n.nextSibling);
        var i = Ae;
        t && hp(e, t) ? C_(i, n) : (e.flags = e.flags & -4097 | 2, zt = !1, Ae = e);
      }
    } else {
      if (Du(e)) throw Error(B(418));
      e.flags = e.flags & -4097 | 2, zt = !1, Ae = e;
    }
  }
}
function dp(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Ae = e;
}
function ia(e) {
  if (e !== Ae) return !1;
  if (!zt) return dp(e), zt = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !Ou(e.type, e.memoizedProps)), t && (t = Oe)) {
    if (Du(e)) throw L_(), Error(B(418));
    for (; t; ) C_(e, t), t = ai(t.nextSibling);
  }
  if (dp(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(B(317));
    t: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Oe = ai(e.nextSibling);
              break t;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Oe = null;
    }
  } else Oe = Ae ? ai(e.stateNode.nextSibling) : null;
  return !0;
}
function L_() {
  for (var e = Oe; e; ) e = ai(e.nextSibling);
}
function Os() {
  Oe = Ae = null, zt = !1;
}
function Bh(e) {
  tn === null ? tn = [e] : tn.push(e);
}
var tw = Hn.ReactCurrentBatchConfig;
function _r(e, t, n) {
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
function sa(e, t) {
  throw e = Object.prototype.toString.call(t), Error(B(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function fp(e) {
  var t = e._init;
  return t(e._payload);
}
function T_(e) {
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
    return b = hi(b, k), b.index = 0, b.sibling = null, b;
  }
  function o(b, k, P) {
    return b.index = P, e ? (P = b.alternate, P !== null ? (P = P.index, P < k ? (b.flags |= 2, k) : P) : (b.flags |= 2, k)) : (b.flags |= 1048576, k);
  }
  function a(b) {
    return e && b.alternate === null && (b.flags |= 2), b;
  }
  function c(b, k, P, T) {
    return k === null || k.tag !== 6 ? (k = $c(P, b.mode, T), k.return = b, k) : (k = r(k, P), k.return = b, k);
  }
  function u(b, k, P, T) {
    var N = P.type;
    return N === ds ? p(b, k, P.props.children, T, P.key) : k !== null && (k.elementType === N || typeof N == "object" && N !== null && N.$$typeof === Yn && fp(N) === k.type) ? (T = r(k, P.props), T.ref = _r(b, k, P), T.return = b, T) : (T = Aa(P.type, P.key, P.props, null, b.mode, T), T.ref = _r(b, k, P), T.return = b, T);
  }
  function d(b, k, P, T) {
    return k === null || k.tag !== 4 || k.stateNode.containerInfo !== P.containerInfo || k.stateNode.implementation !== P.implementation ? (k = Yc(P, b.mode, T), k.return = b, k) : (k = r(k, P.children || []), k.return = b, k);
  }
  function p(b, k, P, T, N) {
    return k === null || k.tag !== 7 ? (k = Di(P, b.mode, T, N), k.return = b, k) : (k = r(k, P), k.return = b, k);
  }
  function g(b, k, P) {
    if (typeof k == "string" && k !== "" || typeof k == "number") return k = $c("" + k, b.mode, P), k.return = b, k;
    if (typeof k == "object" && k !== null) {
      switch (k.$$typeof) {
        case Yo:
          return P = Aa(k.type, k.key, k.props, null, b.mode, P), P.ref = _r(b, null, k), P.return = b, P;
        case hs:
          return k = Yc(k, b.mode, P), k.return = b, k;
        case Yn:
          var T = k._init;
          return g(b, T(k._payload), P);
      }
      if (Mr(k) || dr(k)) return k = Di(k, b.mode, P, null), k.return = b, k;
      sa(b, k);
    }
    return null;
  }
  function v(b, k, P, T) {
    var N = k !== null ? k.key : null;
    if (typeof P == "string" && P !== "" || typeof P == "number") return N !== null ? null : c(b, k, "" + P, T);
    if (typeof P == "object" && P !== null) {
      switch (P.$$typeof) {
        case Yo:
          return P.key === N ? u(b, k, P, T) : null;
        case hs:
          return P.key === N ? d(b, k, P, T) : null;
        case Yn:
          return N = P._init, v(
            b,
            k,
            N(P._payload),
            T
          );
      }
      if (Mr(P) || dr(P)) return N !== null ? null : p(b, k, P, T, null);
      sa(b, P);
    }
    return null;
  }
  function y(b, k, P, T, N) {
    if (typeof T == "string" && T !== "" || typeof T == "number") return b = b.get(P) || null, c(k, b, "" + T, N);
    if (typeof T == "object" && T !== null) {
      switch (T.$$typeof) {
        case Yo:
          return b = b.get(T.key === null ? P : T.key) || null, u(k, b, T, N);
        case hs:
          return b = b.get(T.key === null ? P : T.key) || null, d(k, b, T, N);
        case Yn:
          var A = T._init;
          return y(b, k, P, A(T._payload), N);
      }
      if (Mr(T) || dr(T)) return b = b.get(P) || null, p(k, b, T, N, null);
      sa(k, T);
    }
    return null;
  }
  function S(b, k, P, T) {
    for (var N = null, A = null, j = k, O = k = 0, H = null; j !== null && O < P.length; O++) {
      j.index > O ? (H = j, j = null) : H = j.sibling;
      var R = v(b, j, P[O], T);
      if (R === null) {
        j === null && (j = H);
        break;
      }
      e && j && R.alternate === null && t(b, j), k = o(R, k, O), A === null ? N = R : A.sibling = R, A = R, j = H;
    }
    if (O === P.length) return n(b, j), zt && Ti(b, O), N;
    if (j === null) {
      for (; O < P.length; O++) j = g(b, P[O], T), j !== null && (k = o(j, k, O), A === null ? N = j : A.sibling = j, A = j);
      return zt && Ti(b, O), N;
    }
    for (j = i(b, j); O < P.length; O++) H = y(j, b, O, P[O], T), H !== null && (e && H.alternate !== null && j.delete(H.key === null ? O : H.key), k = o(H, k, O), A === null ? N = H : A.sibling = H, A = H);
    return e && j.forEach(function(V) {
      return t(b, V);
    }), zt && Ti(b, O), N;
  }
  function w(b, k, P, T) {
    var N = dr(P);
    if (typeof N != "function") throw Error(B(150));
    if (P = N.call(P), P == null) throw Error(B(151));
    for (var A = N = null, j = k, O = k = 0, H = null, R = P.next(); j !== null && !R.done; O++, R = P.next()) {
      j.index > O ? (H = j, j = null) : H = j.sibling;
      var V = v(b, j, R.value, T);
      if (V === null) {
        j === null && (j = H);
        break;
      }
      e && j && V.alternate === null && t(b, j), k = o(V, k, O), A === null ? N = V : A.sibling = V, A = V, j = H;
    }
    if (R.done) return n(
      b,
      j
    ), zt && Ti(b, O), N;
    if (j === null) {
      for (; !R.done; O++, R = P.next()) R = g(b, R.value, T), R !== null && (k = o(R, k, O), A === null ? N = R : A.sibling = R, A = R);
      return zt && Ti(b, O), N;
    }
    for (j = i(b, j); !R.done; O++, R = P.next()) R = y(j, b, O, R.value, T), R !== null && (e && R.alternate !== null && j.delete(R.key === null ? O : R.key), k = o(R, k, O), A === null ? N = R : A.sibling = R, A = R);
    return e && j.forEach(function(q) {
      return t(b, q);
    }), zt && Ti(b, O), N;
  }
  function M(b, k, P, T) {
    if (typeof P == "object" && P !== null && P.type === ds && P.key === null && (P = P.props.children), typeof P == "object" && P !== null) {
      switch (P.$$typeof) {
        case Yo:
          t: {
            for (var N = P.key, A = k; A !== null; ) {
              if (A.key === N) {
                if (N = P.type, N === ds) {
                  if (A.tag === 7) {
                    n(b, A.sibling), k = r(A, P.props.children), k.return = b, b = k;
                    break t;
                  }
                } else if (A.elementType === N || typeof N == "object" && N !== null && N.$$typeof === Yn && fp(N) === A.type) {
                  n(b, A.sibling), k = r(A, P.props), k.ref = _r(b, A, P), k.return = b, b = k;
                  break t;
                }
                n(b, A);
                break;
              } else t(b, A);
              A = A.sibling;
            }
            P.type === ds ? (k = Di(P.props.children, b.mode, T, P.key), k.return = b, b = k) : (T = Aa(P.type, P.key, P.props, null, b.mode, T), T.ref = _r(b, k, P), T.return = b, b = T);
          }
          return a(b);
        case hs:
          t: {
            for (A = P.key; k !== null; ) {
              if (k.key === A) if (k.tag === 4 && k.stateNode.containerInfo === P.containerInfo && k.stateNode.implementation === P.implementation) {
                n(b, k.sibling), k = r(k, P.children || []), k.return = b, b = k;
                break t;
              } else {
                n(b, k);
                break;
              }
              else t(b, k);
              k = k.sibling;
            }
            k = Yc(P, b.mode, T), k.return = b, b = k;
          }
          return a(b);
        case Yn:
          return A = P._init, M(b, k, A(P._payload), T);
      }
      if (Mr(P)) return S(b, k, P, T);
      if (dr(P)) return w(b, k, P, T);
      sa(b, P);
    }
    return typeof P == "string" && P !== "" || typeof P == "number" ? (P = "" + P, k !== null && k.tag === 6 ? (n(b, k.sibling), k = r(k, P), k.return = b, b = k) : (n(b, k), k = $c(P, b.mode, T), k.return = b, b = k), a(b)) : n(b, k);
  }
  return M;
}
var As = T_(!0), N_ = T_(!1), el = _i(null), nl = null, xs = null, Hh = null;
function Wh() {
  Hh = xs = nl = null;
}
function Vh(e) {
  var t = el.current;
  Et(el), e._currentValue = t;
}
function Bu(e, t, n) {
  for (; e !== null; ) {
    var i = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Cs(e, t) {
  nl = e, Hh = xs = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Me = !0), e.firstContext = null);
}
function Ye(e) {
  var t = e._currentValue;
  if (Hh !== e) if (e = { context: e, memoizedValue: t, next: null }, xs === null) {
    if (nl === null) throw Error(B(308));
    xs = e, nl.dependencies = { lanes: 0, firstContext: e };
  } else xs = xs.next = e;
  return t;
}
var Oi = null;
function Zh(e) {
  Oi === null ? Oi = [e] : Oi.push(e);
}
function E_(e, t, n, i) {
  var r = t.interleaved;
  return r === null ? (n.next = n, Zh(t)) : (n.next = r.next, r.next = n), t.interleaved = n, Fn(e, i);
}
function Fn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var qn = !1;
function Uh(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function z_(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function In(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function li(e, t, n) {
  var i = e.updateQueue;
  if (i === null) return null;
  if (i = i.shared, vt & 2) {
    var r = i.pending;
    return r === null ? t.next = t : (t.next = r.next, r.next = t), i.pending = t, Fn(e, n);
  }
  return r = i.interleaved, r === null ? (t.next = t, Zh(i)) : (t.next = r.next, r.next = t), i.interleaved = t, Fn(e, n);
}
function Ta(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, Nh(e, n);
  }
}
function pp(e, t) {
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
function il(e, t, n, i) {
  var r = e.updateQueue;
  qn = !1;
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
              g = Rt({}, g, v);
              break t;
            case 2:
              qn = !0;
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
    Zi |= a, e.lanes = a, e.memoizedState = g;
  }
}
function mp(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var i = e[t], r = i.callback;
    if (r !== null) {
      if (i.callback = null, i = n, typeof r != "function") throw Error(B(191, r));
      r.call(i);
    }
  }
}
var ko = {}, vn = _i(ko), ro = _i(ko), oo = _i(ko);
function Ai(e) {
  if (e === ko) throw Error(B(174));
  return e;
}
function $h(e, t) {
  switch (Lt(oo, t), Lt(ro, e), Lt(vn, ko), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : xu(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = xu(t, e);
  }
  Et(vn), Lt(vn, t);
}
function Is() {
  Et(vn), Et(ro), Et(oo);
}
function j_(e) {
  Ai(oo.current);
  var t = Ai(vn.current), n = xu(t, e.type);
  t !== n && (Lt(ro, e), Lt(vn, n));
}
function Yh(e) {
  ro.current === e && (Et(vn), Et(ro));
}
var Ot = _i(0);
function sl(e) {
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
var Bc = [];
function qh() {
  for (var e = 0; e < Bc.length; e++) Bc[e]._workInProgressVersionPrimary = null;
  Bc.length = 0;
}
var Na = Hn.ReactCurrentDispatcher, Hc = Hn.ReactCurrentBatchConfig, Vi = 0, It = null, qt = null, ee = null, rl = !1, Fr = !1, ao = 0, ew = 0;
function ue() {
  throw Error(B(321));
}
function Kh(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!sn(e[n], t[n])) return !1;
  return !0;
}
function Xh(e, t, n, i, r, o) {
  if (Vi = o, It = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Na.current = e === null || e.memoizedState === null ? rw : ow, e = n(i, r), Fr) {
    o = 0;
    do {
      if (Fr = !1, ao = 0, 25 <= o) throw Error(B(301));
      o += 1, ee = qt = null, t.updateQueue = null, Na.current = aw, e = n(i, r);
    } while (Fr);
  }
  if (Na.current = ol, t = qt !== null && qt.next !== null, Vi = 0, ee = qt = It = null, rl = !1, t) throw Error(B(300));
  return e;
}
function Gh() {
  var e = ao !== 0;
  return ao = 0, e;
}
function fn() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ee === null ? It.memoizedState = ee = e : ee = ee.next = e, ee;
}
function qe() {
  if (qt === null) {
    var e = It.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = qt.next;
  var t = ee === null ? It.memoizedState : ee.next;
  if (t !== null) ee = t, qt = e;
  else {
    if (e === null) throw Error(B(310));
    qt = e, e = { memoizedState: qt.memoizedState, baseState: qt.baseState, baseQueue: qt.baseQueue, queue: qt.queue, next: null }, ee === null ? It.memoizedState = ee = e : ee = ee.next = e;
  }
  return ee;
}
function lo(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Wc(e) {
  var t = qe(), n = t.queue;
  if (n === null) throw Error(B(311));
  n.lastRenderedReducer = e;
  var i = qt, r = i.baseQueue, o = n.pending;
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
      if ((Vi & p) === p) u !== null && (u = u.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), i = d.hasEagerState ? d.eagerState : e(i, d.action);
      else {
        var g = {
          lane: p,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        u === null ? (c = u = g, a = i) : u = u.next = g, It.lanes |= p, Zi |= p;
      }
      d = d.next;
    } while (d !== null && d !== o);
    u === null ? a = i : u.next = c, sn(i, t.memoizedState) || (Me = !0), t.memoizedState = i, t.baseState = a, t.baseQueue = u, n.lastRenderedState = i;
  }
  if (e = n.interleaved, e !== null) {
    r = e;
    do
      o = r.lane, It.lanes |= o, Zi |= o, r = r.next;
    while (r !== e);
  } else r === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Vc(e) {
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
    sn(o, t.memoizedState) || (Me = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, i];
}
function O_() {
}
function A_(e, t) {
  var n = It, i = qe(), r = t(), o = !sn(i.memoizedState, r);
  if (o && (i.memoizedState = r, Me = !0), i = i.queue, Qh(D_.bind(null, n, i, e), [e]), i.getSnapshot !== t || o || ee !== null && ee.memoizedState.tag & 1) {
    if (n.flags |= 2048, co(9, R_.bind(null, n, i, r, t), void 0, null), ne === null) throw Error(B(349));
    Vi & 30 || I_(n, t, r);
  }
  return r;
}
function I_(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = It.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, It.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function R_(e, t, n, i) {
  t.value = n, t.getSnapshot = i, F_(t) && B_(e);
}
function D_(e, t, n) {
  return n(function() {
    F_(t) && B_(e);
  });
}
function F_(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !sn(e, n);
  } catch {
    return !0;
  }
}
function B_(e) {
  var t = Fn(e, 1);
  t !== null && nn(t, e, 1, -1);
}
function gp(e) {
  var t = fn();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: lo, lastRenderedState: e }, t.queue = e, e = e.dispatch = sw.bind(null, It, e), [t.memoizedState, e];
}
function co(e, t, n, i) {
  return e = { tag: e, create: t, destroy: n, deps: i, next: null }, t = It.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, It.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e)), e;
}
function H_() {
  return qe().memoizedState;
}
function Ea(e, t, n, i) {
  var r = fn();
  It.flags |= e, r.memoizedState = co(1 | t, n, void 0, i === void 0 ? null : i);
}
function Tl(e, t, n, i) {
  var r = qe();
  i = i === void 0 ? null : i;
  var o = void 0;
  if (qt !== null) {
    var a = qt.memoizedState;
    if (o = a.destroy, i !== null && Kh(i, a.deps)) {
      r.memoizedState = co(t, n, o, i);
      return;
    }
  }
  It.flags |= e, r.memoizedState = co(1 | t, n, o, i);
}
function _p(e, t) {
  return Ea(8390656, 8, e, t);
}
function Qh(e, t) {
  return Tl(2048, 8, e, t);
}
function W_(e, t) {
  return Tl(4, 2, e, t);
}
function V_(e, t) {
  return Tl(4, 4, e, t);
}
function Z_(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function U_(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Tl(4, 4, Z_.bind(null, t, e), n);
}
function Jh() {
}
function $_(e, t) {
  var n = qe();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && Kh(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
}
function Y_(e, t) {
  var n = qe();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && Kh(t, i[1]) ? i[0] : (e = e(), n.memoizedState = [e, t], e);
}
function q_(e, t, n) {
  return Vi & 21 ? (sn(n, t) || (n = Jg(), It.lanes |= n, Zi |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Me = !0), e.memoizedState = n);
}
function nw(e, t) {
  var n = Pt;
  Pt = n !== 0 && 4 > n ? n : 4, e(!0);
  var i = Hc.transition;
  Hc.transition = {};
  try {
    e(!1), t();
  } finally {
    Pt = n, Hc.transition = i;
  }
}
function K_() {
  return qe().memoizedState;
}
function iw(e, t, n) {
  var i = ui(e);
  if (n = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null }, X_(e)) G_(t, n);
  else if (n = E_(e, t, n, i), n !== null) {
    var r = ve();
    nn(n, e, i, r), Q_(n, t, i);
  }
}
function sw(e, t, n) {
  var i = ui(e), r = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (X_(e)) G_(t, r);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var a = t.lastRenderedState, c = o(a, n);
      if (r.hasEagerState = !0, r.eagerState = c, sn(c, a)) {
        var u = t.interleaved;
        u === null ? (r.next = r, Zh(t)) : (r.next = u.next, u.next = r), t.interleaved = r;
        return;
      }
    } catch {
    } finally {
    }
    n = E_(e, t, r, i), n !== null && (r = ve(), nn(n, e, i, r), Q_(n, t, i));
  }
}
function X_(e) {
  var t = e.alternate;
  return e === It || t !== null && t === It;
}
function G_(e, t) {
  Fr = rl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Q_(e, t, n) {
  if (n & 4194240) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, Nh(e, n);
  }
}
var ol = { readContext: Ye, useCallback: ue, useContext: ue, useEffect: ue, useImperativeHandle: ue, useInsertionEffect: ue, useLayoutEffect: ue, useMemo: ue, useReducer: ue, useRef: ue, useState: ue, useDebugValue: ue, useDeferredValue: ue, useTransition: ue, useMutableSource: ue, useSyncExternalStore: ue, useId: ue, unstable_isNewReconciler: !1 }, rw = { readContext: Ye, useCallback: function(e, t) {
  return fn().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Ye, useEffect: _p, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ea(
    4194308,
    4,
    Z_.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Ea(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Ea(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = fn();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var i = fn();
  return t = n !== void 0 ? n(t) : t, i.memoizedState = i.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, i.queue = e, e = e.dispatch = iw.bind(null, It, e), [i.memoizedState, e];
}, useRef: function(e) {
  var t = fn();
  return e = { current: e }, t.memoizedState = e;
}, useState: gp, useDebugValue: Jh, useDeferredValue: function(e) {
  return fn().memoizedState = e;
}, useTransition: function() {
  var e = gp(!1), t = e[0];
  return e = nw.bind(null, e[1]), fn().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var i = It, r = fn();
  if (zt) {
    if (n === void 0) throw Error(B(407));
    n = n();
  } else {
    if (n = t(), ne === null) throw Error(B(349));
    Vi & 30 || I_(i, t, n);
  }
  r.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return r.queue = o, _p(D_.bind(
    null,
    i,
    o,
    e
  ), [e]), i.flags |= 2048, co(9, R_.bind(null, i, o, n, t), void 0, null), n;
}, useId: function() {
  var e = fn(), t = ne.identifierPrefix;
  if (zt) {
    var n = jn, i = zn;
    n = (i & ~(1 << 32 - en(i) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = ao++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = ew++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, ow = {
  readContext: Ye,
  useCallback: $_,
  useContext: Ye,
  useEffect: Qh,
  useImperativeHandle: U_,
  useInsertionEffect: W_,
  useLayoutEffect: V_,
  useMemo: Y_,
  useReducer: Wc,
  useRef: H_,
  useState: function() {
    return Wc(lo);
  },
  useDebugValue: Jh,
  useDeferredValue: function(e) {
    var t = qe();
    return q_(t, qt.memoizedState, e);
  },
  useTransition: function() {
    var e = Wc(lo)[0], t = qe().memoizedState;
    return [e, t];
  },
  useMutableSource: O_,
  useSyncExternalStore: A_,
  useId: K_,
  unstable_isNewReconciler: !1
}, aw = { readContext: Ye, useCallback: $_, useContext: Ye, useEffect: Qh, useImperativeHandle: U_, useInsertionEffect: W_, useLayoutEffect: V_, useMemo: Y_, useReducer: Vc, useRef: H_, useState: function() {
  return Vc(lo);
}, useDebugValue: Jh, useDeferredValue: function(e) {
  var t = qe();
  return qt === null ? t.memoizedState = e : q_(t, qt.memoizedState, e);
}, useTransition: function() {
  var e = Vc(lo)[0], t = qe().memoizedState;
  return [e, t];
}, useMutableSource: O_, useSyncExternalStore: A_, useId: K_, unstable_isNewReconciler: !1 };
function Qe(e, t) {
  if (e && e.defaultProps) {
    t = Rt({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Hu(e, t, n, i) {
  t = e.memoizedState, n = n(i, t), n = n == null ? t : Rt({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Nl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Ki(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var i = ve(), r = ui(e), o = In(i, r);
  o.payload = t, n != null && (o.callback = n), t = li(e, o, r), t !== null && (nn(t, e, r, i), Ta(t, e, r));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var i = ve(), r = ui(e), o = In(i, r);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = li(e, o, r), t !== null && (nn(t, e, r, i), Ta(t, e, r));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ve(), i = ui(e), r = In(n, i);
  r.tag = 2, t != null && (r.callback = t), t = li(e, r, i), t !== null && (nn(t, e, i, n), Ta(t, e, i));
} };
function vp(e, t, n, i, r, o, a) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, o, a) : t.prototype && t.prototype.isPureReactComponent ? !eo(n, i) || !eo(r, o) : !0;
}
function J_(e, t, n) {
  var i = !1, r = pi, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Ye(o) : (r = Te(t) ? Hi : pe.current, i = t.contextTypes, o = (i = i != null) ? js(e, r) : pi), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Nl, e.stateNode = t, t._reactInternals = e, i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = r, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function yp(e, t, n, i) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== e && Nl.enqueueReplaceState(t, t.state, null);
}
function Wu(e, t, n, i) {
  var r = e.stateNode;
  r.props = n, r.state = e.memoizedState, r.refs = {}, Uh(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? r.context = Ye(o) : (o = Te(t) ? Hi : pe.current, r.context = js(e, o)), r.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Hu(e, t, o, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (t = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), t !== r.state && Nl.enqueueReplaceState(r, r.state, null), il(e, n, r, i), r.state = e.memoizedState), typeof r.componentDidMount == "function" && (e.flags |= 4194308);
}
function Rs(e, t) {
  try {
    var n = "", i = t;
    do
      n += Ax(i), i = i.return;
    while (i);
    var r = n;
  } catch (o) {
    r = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: r, digest: null };
}
function Zc(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Vu(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var lw = typeof WeakMap == "function" ? WeakMap : Map;
function tv(e, t, n) {
  n = In(-1, n), n.tag = 3, n.payload = { element: null };
  var i = t.value;
  return n.callback = function() {
    ll || (ll = !0, Ju = i), Vu(e, t);
  }, n;
}
function ev(e, t, n) {
  n = In(-1, n), n.tag = 3;
  var i = e.type.getDerivedStateFromError;
  if (typeof i == "function") {
    var r = t.value;
    n.payload = function() {
      return i(r);
    }, n.callback = function() {
      Vu(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Vu(e, t), typeof i != "function" && (ci === null ? ci = /* @__PURE__ */ new Set([this]) : ci.add(this));
    var a = t.stack;
    this.componentDidCatch(t.value, { componentStack: a !== null ? a : "" });
  }), n;
}
function xp(e, t, n) {
  var i = e.pingCache;
  if (i === null) {
    i = e.pingCache = new lw();
    var r = /* @__PURE__ */ new Set();
    i.set(t, r);
  } else r = i.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), i.set(t, r));
  r.has(n) || (r.add(n), e = bw.bind(null, e, t, n), t.then(e, e));
}
function wp(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function bp(e, t, n, i, r) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = r, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = In(-1, 1), t.tag = 2, li(n, t, 1))), n.lanes |= 1), e);
}
var cw = Hn.ReactCurrentOwner, Me = !1;
function _e(e, t, n, i) {
  t.child = e === null ? N_(t, null, n, i) : As(t, e.child, n, i);
}
function kp(e, t, n, i, r) {
  n = n.render;
  var o = t.ref;
  return Cs(t, r), i = Xh(e, t, n, i, o, r), n = Gh(), e !== null && !Me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~r, Bn(e, t, r)) : (zt && n && Dh(t), t.flags |= 1, _e(e, t, i, r), t.child);
}
function Sp(e, t, n, i, r) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !ad(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, nv(e, t, o, i, r)) : (e = Aa(n.type, null, i, t, t.mode, r), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & r)) {
    var a = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : eo, n(a, i) && e.ref === t.ref) return Bn(e, t, r);
  }
  return t.flags |= 1, e = hi(o, i), e.ref = t.ref, e.return = t, t.child = e;
}
function nv(e, t, n, i, r) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (eo(o, i) && e.ref === t.ref) if (Me = !1, t.pendingProps = i = o, (e.lanes & r) !== 0) e.flags & 131072 && (Me = !0);
    else return t.lanes = e.lanes, Bn(e, t, r);
  }
  return Zu(e, t, n, i, r);
}
function iv(e, t, n) {
  var i = t.pendingProps, r = i.children, o = e !== null ? e.memoizedState : null;
  if (i.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Lt(bs, ze), ze |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Lt(bs, ze), ze |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, i = o !== null ? o.baseLanes : n, Lt(bs, ze), ze |= i;
  }
  else o !== null ? (i = o.baseLanes | n, t.memoizedState = null) : i = n, Lt(bs, ze), ze |= i;
  return _e(e, t, r, n), t.child;
}
function sv(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Zu(e, t, n, i, r) {
  var o = Te(n) ? Hi : pe.current;
  return o = js(t, o), Cs(t, r), n = Xh(e, t, n, i, o, r), i = Gh(), e !== null && !Me ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~r, Bn(e, t, r)) : (zt && i && Dh(t), t.flags |= 1, _e(e, t, n, r), t.child);
}
function Pp(e, t, n, i, r) {
  if (Te(n)) {
    var o = !0;
    Qa(t);
  } else o = !1;
  if (Cs(t, r), t.stateNode === null) za(e, t), J_(t, n, i), Wu(t, n, i, r), i = !0;
  else if (e === null) {
    var a = t.stateNode, c = t.memoizedProps;
    a.props = c;
    var u = a.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = Ye(d) : (d = Te(n) ? Hi : pe.current, d = js(t, d));
    var p = n.getDerivedStateFromProps, g = typeof p == "function" || typeof a.getSnapshotBeforeUpdate == "function";
    g || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (c !== i || u !== d) && yp(t, a, i, d), qn = !1;
    var v = t.memoizedState;
    a.state = v, il(t, i, a, r), u = t.memoizedState, c !== i || v !== u || Le.current || qn ? (typeof p == "function" && (Hu(t, n, p, i), u = t.memoizedState), (c = qn || vp(t, n, c, i, v, u, d)) ? (g || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = u), a.props = i, a.state = u, a.context = d, i = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
  } else {
    a = t.stateNode, z_(e, t), c = t.memoizedProps, d = t.type === t.elementType ? c : Qe(t.type, c), a.props = d, g = t.pendingProps, v = a.context, u = n.contextType, typeof u == "object" && u !== null ? u = Ye(u) : (u = Te(n) ? Hi : pe.current, u = js(t, u));
    var y = n.getDerivedStateFromProps;
    (p = typeof y == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (c !== g || v !== u) && yp(t, a, i, u), qn = !1, v = t.memoizedState, a.state = v, il(t, i, a, r);
    var S = t.memoizedState;
    c !== g || v !== S || Le.current || qn ? (typeof y == "function" && (Hu(t, n, y, i), S = t.memoizedState), (d = qn || vp(t, n, d, i, v, S, u) || !1) ? (p || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(i, S, u), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(i, S, u)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || c === e.memoizedProps && v === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && v === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = S), a.props = i, a.state = S, a.context = u, i = d) : (typeof a.componentDidUpdate != "function" || c === e.memoizedProps && v === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || c === e.memoizedProps && v === e.memoizedState || (t.flags |= 1024), i = !1);
  }
  return Uu(e, t, n, i, o, r);
}
function Uu(e, t, n, i, r, o) {
  sv(e, t);
  var a = (t.flags & 128) !== 0;
  if (!i && !a) return r && up(t, n, !1), Bn(e, t, o);
  i = t.stateNode, cw.current = t;
  var c = a && typeof n.getDerivedStateFromError != "function" ? null : i.render();
  return t.flags |= 1, e !== null && a ? (t.child = As(t, e.child, null, o), t.child = As(t, null, c, o)) : _e(e, t, c, o), t.memoizedState = i.state, r && up(t, n, !0), t.child;
}
function rv(e) {
  var t = e.stateNode;
  t.pendingContext ? cp(e, t.pendingContext, t.pendingContext !== t.context) : t.context && cp(e, t.context, !1), $h(e, t.containerInfo);
}
function Mp(e, t, n, i, r) {
  return Os(), Bh(r), t.flags |= 256, _e(e, t, n, i), t.child;
}
var $u = { dehydrated: null, treeContext: null, retryLane: 0 };
function Yu(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function ov(e, t, n) {
  var i = t.pendingProps, r = Ot.current, o = !1, a = (t.flags & 128) !== 0, c;
  if ((c = a) || (c = e !== null && e.memoizedState === null ? !1 : (r & 2) !== 0), c ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (r |= 1), Lt(Ot, r & 1), e === null)
    return Fu(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (a = i.children, e = i.fallback, o ? (i = t.mode, o = t.child, a = { mode: "hidden", children: a }, !(i & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = a) : o = jl(a, i, 0, null), e = Di(e, i, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Yu(n), t.memoizedState = $u, e) : td(t, a));
  if (r = e.memoizedState, r !== null && (c = r.dehydrated, c !== null)) return uw(e, t, a, i, c, r, n);
  if (o) {
    o = i.fallback, a = t.mode, r = e.child, c = r.sibling;
    var u = { mode: "hidden", children: i.children };
    return !(a & 1) && t.child !== r ? (i = t.child, i.childLanes = 0, i.pendingProps = u, t.deletions = null) : (i = hi(r, u), i.subtreeFlags = r.subtreeFlags & 14680064), c !== null ? o = hi(c, o) : (o = Di(o, a, n, null), o.flags |= 2), o.return = t, i.return = t, i.sibling = o, t.child = i, i = o, o = t.child, a = e.child.memoizedState, a = a === null ? Yu(n) : { baseLanes: a.baseLanes | n, cachePool: null, transitions: a.transitions }, o.memoizedState = a, o.childLanes = e.childLanes & ~n, t.memoizedState = $u, i;
  }
  return o = e.child, e = o.sibling, i = hi(o, { mode: "visible", children: i.children }), !(t.mode & 1) && (i.lanes = n), i.return = t, i.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = i, t.memoizedState = null, i;
}
function td(e, t) {
  return t = jl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function ra(e, t, n, i) {
  return i !== null && Bh(i), As(t, e.child, null, n), e = td(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function uw(e, t, n, i, r, o, a) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, i = Zc(Error(B(422))), ra(e, t, a, i)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = i.fallback, r = t.mode, i = jl({ mode: "visible", children: i.children }, r, 0, null), o = Di(o, r, a, null), o.flags |= 2, i.return = t, o.return = t, i.sibling = o, t.child = i, t.mode & 1 && As(t, e.child, null, a), t.child.memoizedState = Yu(a), t.memoizedState = $u, o);
  if (!(t.mode & 1)) return ra(e, t, a, null);
  if (r.data === "$!") {
    if (i = r.nextSibling && r.nextSibling.dataset, i) var c = i.dgst;
    return i = c, o = Error(B(419)), i = Zc(o, i, void 0), ra(e, t, a, i);
  }
  if (c = (a & e.childLanes) !== 0, Me || c) {
    if (i = ne, i !== null) {
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
      r = r & (i.suspendedLanes | a) ? 0 : r, r !== 0 && r !== o.retryLane && (o.retryLane = r, Fn(e, r), nn(i, e, r, -1));
    }
    return od(), i = Zc(Error(B(421))), ra(e, t, a, i);
  }
  return r.data === "$?" ? (t.flags |= 128, t.child = e.child, t = kw.bind(null, e), r._reactRetry = t, null) : (e = o.treeContext, Oe = ai(r.nextSibling), Ae = t, zt = !0, tn = null, e !== null && (Ve[Ze++] = zn, Ve[Ze++] = jn, Ve[Ze++] = Wi, zn = e.id, jn = e.overflow, Wi = t), t = td(t, i.children), t.flags |= 4096, t);
}
function Cp(e, t, n) {
  e.lanes |= t;
  var i = e.alternate;
  i !== null && (i.lanes |= t), Bu(e.return, t, n);
}
function Uc(e, t, n, i, r) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: i, tail: n, tailMode: r } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = i, o.tail = n, o.tailMode = r);
}
function av(e, t, n) {
  var i = t.pendingProps, r = i.revealOrder, o = i.tail;
  if (_e(e, t, i.children, n), i = Ot.current, i & 2) i = i & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) t: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Cp(e, n, t);
      else if (e.tag === 19) Cp(e, n, t);
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
  if (Lt(Ot, i), !(t.mode & 1)) t.memoizedState = null;
  else switch (r) {
    case "forwards":
      for (n = t.child, r = null; n !== null; ) e = n.alternate, e !== null && sl(e) === null && (r = n), n = n.sibling;
      n = r, n === null ? (r = t.child, t.child = null) : (r = n.sibling, n.sibling = null), Uc(t, !1, r, n, o);
      break;
    case "backwards":
      for (n = null, r = t.child, t.child = null; r !== null; ) {
        if (e = r.alternate, e !== null && sl(e) === null) {
          t.child = r;
          break;
        }
        e = r.sibling, r.sibling = n, n = r, r = e;
      }
      Uc(t, !0, n, null, o);
      break;
    case "together":
      Uc(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function za(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Bn(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Zi |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(B(153));
  if (t.child !== null) {
    for (e = t.child, n = hi(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = hi(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function hw(e, t, n) {
  switch (t.tag) {
    case 3:
      rv(t), Os();
      break;
    case 5:
      j_(t);
      break;
    case 1:
      Te(t.type) && Qa(t);
      break;
    case 4:
      $h(t, t.stateNode.containerInfo);
      break;
    case 10:
      var i = t.type._context, r = t.memoizedProps.value;
      Lt(el, i._currentValue), i._currentValue = r;
      break;
    case 13:
      if (i = t.memoizedState, i !== null)
        return i.dehydrated !== null ? (Lt(Ot, Ot.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? ov(e, t, n) : (Lt(Ot, Ot.current & 1), e = Bn(e, t, n), e !== null ? e.sibling : null);
      Lt(Ot, Ot.current & 1);
      break;
    case 19:
      if (i = (n & t.childLanes) !== 0, e.flags & 128) {
        if (i) return av(e, t, n);
        t.flags |= 128;
      }
      if (r = t.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), Lt(Ot, Ot.current), i) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, iv(e, t, n);
  }
  return Bn(e, t, n);
}
var lv, qu, cv, uv;
lv = function(e, t) {
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
qu = function() {
};
cv = function(e, t, n, i) {
  var r = e.memoizedProps;
  if (r !== i) {
    e = t.stateNode, Ai(vn.current);
    var o = null;
    switch (n) {
      case "input":
        r = gu(e, r), i = gu(e, i), o = [];
        break;
      case "select":
        r = Rt({}, r, { value: void 0 }), i = Rt({}, i, { value: void 0 }), o = [];
        break;
      case "textarea":
        r = yu(e, r), i = yu(e, i), o = [];
        break;
      default:
        typeof r.onClick != "function" && typeof i.onClick == "function" && (e.onclick = Xa);
    }
    wu(n, i);
    var a;
    n = null;
    for (d in r) if (!i.hasOwnProperty(d) && r.hasOwnProperty(d) && r[d] != null) if (d === "style") {
      var c = r[d];
      for (a in c) c.hasOwnProperty(a) && (n || (n = {}), n[a] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (qr.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in i) {
      var u = i[d];
      if (c = r != null ? r[d] : void 0, i.hasOwnProperty(d) && u !== c && (u != null || c != null)) if (d === "style") if (c) {
        for (a in c) !c.hasOwnProperty(a) || u && u.hasOwnProperty(a) || (n || (n = {}), n[a] = "");
        for (a in u) u.hasOwnProperty(a) && c[a] !== u[a] && (n || (n = {}), n[a] = u[a]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = u;
      else d === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, c = c ? c.__html : void 0, u != null && c !== u && (o = o || []).push(d, u)) : d === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(d, "" + u) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (qr.hasOwnProperty(d) ? (u != null && d === "onScroll" && Tt("scroll", e), o || c === u || (o = [])) : (o = o || []).push(d, u));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
uv = function(e, t, n, i) {
  n !== i && (t.flags |= 4);
};
function vr(e, t) {
  if (!zt) switch (e.tailMode) {
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
function he(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, i = 0;
  if (t) for (var r = e.child; r !== null; ) n |= r.lanes | r.childLanes, i |= r.subtreeFlags & 14680064, i |= r.flags & 14680064, r.return = e, r = r.sibling;
  else for (r = e.child; r !== null; ) n |= r.lanes | r.childLanes, i |= r.subtreeFlags, i |= r.flags, r.return = e, r = r.sibling;
  return e.subtreeFlags |= i, e.childLanes = n, t;
}
function dw(e, t, n) {
  var i = t.pendingProps;
  switch (Fh(t), t.tag) {
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
      return he(t), null;
    case 1:
      return Te(t.type) && Ga(), he(t), null;
    case 3:
      return i = t.stateNode, Is(), Et(Le), Et(pe), qh(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (ia(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, tn !== null && (nh(tn), tn = null))), qu(e, t), he(t), null;
    case 5:
      Yh(t);
      var r = Ai(oo.current);
      if (n = t.type, e !== null && t.stateNode != null) cv(e, t, n, i, r), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!i) {
          if (t.stateNode === null) throw Error(B(166));
          return he(t), null;
        }
        if (e = Ai(vn.current), ia(t)) {
          i = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (i[gn] = t, i[so] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Tt("cancel", i), Tt("close", i);
              break;
            case "iframe":
            case "object":
            case "embed":
              Tt("load", i);
              break;
            case "video":
            case "audio":
              for (r = 0; r < Lr.length; r++) Tt(Lr[r], i);
              break;
            case "source":
              Tt("error", i);
              break;
            case "img":
            case "image":
            case "link":
              Tt(
                "error",
                i
              ), Tt("load", i);
              break;
            case "details":
              Tt("toggle", i);
              break;
            case "input":
              If(i, o), Tt("invalid", i);
              break;
            case "select":
              i._wrapperState = { wasMultiple: !!o.multiple }, Tt("invalid", i);
              break;
            case "textarea":
              Df(i, o), Tt("invalid", i);
          }
          wu(n, o), r = null;
          for (var a in o) if (o.hasOwnProperty(a)) {
            var c = o[a];
            a === "children" ? typeof c == "string" ? i.textContent !== c && (o.suppressHydrationWarning !== !0 && na(i.textContent, c, e), r = ["children", c]) : typeof c == "number" && i.textContent !== "" + c && (o.suppressHydrationWarning !== !0 && na(
              i.textContent,
              c,
              e
            ), r = ["children", "" + c]) : qr.hasOwnProperty(a) && c != null && a === "onScroll" && Tt("scroll", i);
          }
          switch (n) {
            case "input":
              qo(i), Rf(i, o, !0);
              break;
            case "textarea":
              qo(i), Ff(i);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (i.onclick = Xa);
          }
          i = r, t.updateQueue = i, i !== null && (t.flags |= 4);
        } else {
          a = r.nodeType === 9 ? r : r.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Dg(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = a.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = a.createElement(n, { is: i.is }) : (e = a.createElement(n), n === "select" && (a = e, i.multiple ? a.multiple = !0 : i.size && (a.size = i.size))) : e = a.createElementNS(e, n), e[gn] = t, e[so] = i, lv(e, t, !1, !1), t.stateNode = e;
          t: {
            switch (a = bu(n, i), n) {
              case "dialog":
                Tt("cancel", e), Tt("close", e), r = i;
                break;
              case "iframe":
              case "object":
              case "embed":
                Tt("load", e), r = i;
                break;
              case "video":
              case "audio":
                for (r = 0; r < Lr.length; r++) Tt(Lr[r], e);
                r = i;
                break;
              case "source":
                Tt("error", e), r = i;
                break;
              case "img":
              case "image":
              case "link":
                Tt(
                  "error",
                  e
                ), Tt("load", e), r = i;
                break;
              case "details":
                Tt("toggle", e), r = i;
                break;
              case "input":
                If(e, i), r = gu(e, i), Tt("invalid", e);
                break;
              case "option":
                r = i;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!i.multiple }, r = Rt({}, i, { value: void 0 }), Tt("invalid", e);
                break;
              case "textarea":
                Df(e, i), r = yu(e, i), Tt("invalid", e);
                break;
              default:
                r = i;
            }
            wu(n, r), c = r;
            for (o in c) if (c.hasOwnProperty(o)) {
              var u = c[o];
              o === "style" ? Hg(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Fg(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Kr(e, u) : typeof u == "number" && Kr(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (qr.hasOwnProperty(o) ? u != null && o === "onScroll" && Tt("scroll", e) : u != null && Sh(e, o, u, a));
            }
            switch (n) {
              case "input":
                qo(e), Rf(e, i, !1);
                break;
              case "textarea":
                qo(e), Ff(e);
                break;
              case "option":
                i.value != null && e.setAttribute("value", "" + fi(i.value));
                break;
              case "select":
                e.multiple = !!i.multiple, o = i.value, o != null ? ks(e, !!i.multiple, o, !1) : i.defaultValue != null && ks(
                  e,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                );
                break;
              default:
                typeof r.onClick == "function" && (e.onclick = Xa);
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
      return he(t), null;
    case 6:
      if (e && t.stateNode != null) uv(e, t, e.memoizedProps, i);
      else {
        if (typeof i != "string" && t.stateNode === null) throw Error(B(166));
        if (n = Ai(oo.current), Ai(vn.current), ia(t)) {
          if (i = t.stateNode, n = t.memoizedProps, i[gn] = t, (o = i.nodeValue !== n) && (e = Ae, e !== null)) switch (e.tag) {
            case 3:
              na(i.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && na(i.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[gn] = t, t.stateNode = i;
      }
      return he(t), null;
    case 13:
      if (Et(Ot), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (zt && Oe !== null && t.mode & 1 && !(t.flags & 128)) L_(), Os(), t.flags |= 98560, o = !1;
        else if (o = ia(t), i !== null && i.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(B(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(B(317));
            o[gn] = t;
          } else Os(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          he(t), o = !1;
        } else tn !== null && (nh(tn), tn = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || Ot.current & 1 ? Xt === 0 && (Xt = 3) : od())), t.updateQueue !== null && (t.flags |= 4), he(t), null);
    case 4:
      return Is(), qu(e, t), e === null && no(t.stateNode.containerInfo), he(t), null;
    case 10:
      return Vh(t.type._context), he(t), null;
    case 17:
      return Te(t.type) && Ga(), he(t), null;
    case 19:
      if (Et(Ot), o = t.memoizedState, o === null) return he(t), null;
      if (i = (t.flags & 128) !== 0, a = o.rendering, a === null) if (i) vr(o, !1);
      else {
        if (Xt !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (a = sl(e), a !== null) {
            for (t.flags |= 128, vr(o, !1), i = a.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = n, n = t.child; n !== null; ) o = n, e = i, o.flags &= 14680066, a = o.alternate, a === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = a.childLanes, o.lanes = a.lanes, o.child = a.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = a.memoizedProps, o.memoizedState = a.memoizedState, o.updateQueue = a.updateQueue, o.type = a.type, e = a.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Lt(Ot, Ot.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && Wt() > Ds && (t.flags |= 128, i = !0, vr(o, !1), t.lanes = 4194304);
      }
      else {
        if (!i) if (e = sl(a), e !== null) {
          if (t.flags |= 128, i = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), vr(o, !0), o.tail === null && o.tailMode === "hidden" && !a.alternate && !zt) return he(t), null;
        } else 2 * Wt() - o.renderingStartTime > Ds && n !== 1073741824 && (t.flags |= 128, i = !0, vr(o, !1), t.lanes = 4194304);
        o.isBackwards ? (a.sibling = t.child, t.child = a) : (n = o.last, n !== null ? n.sibling = a : t.child = a, o.last = a);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Wt(), t.sibling = null, n = Ot.current, Lt(Ot, i ? n & 1 | 2 : n & 1), t) : (he(t), null);
    case 22:
    case 23:
      return rd(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? ze & 1073741824 && (he(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : he(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(B(156, t.tag));
}
function fw(e, t) {
  switch (Fh(t), t.tag) {
    case 1:
      return Te(t.type) && Ga(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Is(), Et(Le), Et(pe), qh(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Yh(t), null;
    case 13:
      if (Et(Ot), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(B(340));
        Os();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Et(Ot), null;
    case 4:
      return Is(), null;
    case 10:
      return Vh(t.type._context), null;
    case 22:
    case 23:
      return rd(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var oa = !1, de = !1, pw = typeof WeakSet == "function" ? WeakSet : Set, $ = null;
function ws(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (i) {
    Dt(e, t, i);
  }
  else n.current = null;
}
function Ku(e, t, n) {
  try {
    n();
  } catch (i) {
    Dt(e, t, i);
  }
}
var Lp = !1;
function mw(e, t) {
  if (zu = Ya, e = m_(), Rh(e)) {
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
  for (ju = { focusedElem: e, selectionRange: n }, Ya = !1, $ = t; $ !== null; ) if (t = $, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, $ = e;
  else for (; $ !== null; ) {
    t = $;
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
      Dt(t, t.return, T);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, $ = e;
      break;
    }
    $ = t.return;
  }
  return S = Lp, Lp = !1, S;
}
function Br(e, t, n) {
  var i = t.updateQueue;
  if (i = i !== null ? i.lastEffect : null, i !== null) {
    var r = i = i.next;
    do {
      if ((r.tag & e) === e) {
        var o = r.destroy;
        r.destroy = void 0, o !== void 0 && Ku(t, n, o);
      }
      r = r.next;
    } while (r !== i);
  }
}
function El(e, t) {
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
function Xu(e) {
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
function hv(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, hv(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[gn], delete t[so], delete t[Iu], delete t[G1], delete t[Q1])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function dv(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Tp(e) {
  t: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || dv(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue t;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Gu(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Xa));
  else if (i !== 4 && (e = e.child, e !== null)) for (Gu(e, t, n), e = e.sibling; e !== null; ) Gu(e, t, n), e = e.sibling;
}
function Qu(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (i !== 4 && (e = e.child, e !== null)) for (Qu(e, t, n), e = e.sibling; e !== null; ) Qu(e, t, n), e = e.sibling;
}
var re = null, Je = !1;
function Un(e, t, n) {
  for (n = n.child; n !== null; ) fv(e, t, n), n = n.sibling;
}
function fv(e, t, n) {
  if (_n && typeof _n.onCommitFiberUnmount == "function") try {
    _n.onCommitFiberUnmount(kl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      de || ws(n, t);
    case 6:
      var i = re, r = Je;
      re = null, Un(e, t, n), re = i, Je = r, re !== null && (Je ? (e = re, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : re.removeChild(n.stateNode));
      break;
    case 18:
      re !== null && (Je ? (e = re, n = n.stateNode, e.nodeType === 8 ? Dc(e.parentNode, n) : e.nodeType === 1 && Dc(e, n), Jr(e)) : Dc(re, n.stateNode));
      break;
    case 4:
      i = re, r = Je, re = n.stateNode.containerInfo, Je = !0, Un(e, t, n), re = i, Je = r;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!de && (i = n.updateQueue, i !== null && (i = i.lastEffect, i !== null))) {
        r = i = i.next;
        do {
          var o = r, a = o.destroy;
          o = o.tag, a !== void 0 && (o & 2 || o & 4) && Ku(n, t, a), r = r.next;
        } while (r !== i);
      }
      Un(e, t, n);
      break;
    case 1:
      if (!de && (ws(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function")) try {
        i.props = n.memoizedProps, i.state = n.memoizedState, i.componentWillUnmount();
      } catch (c) {
        Dt(n, t, c);
      }
      Un(e, t, n);
      break;
    case 21:
      Un(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (de = (i = de) || n.memoizedState !== null, Un(e, t, n), de = i) : Un(e, t, n);
      break;
    default:
      Un(e, t, n);
  }
}
function Np(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new pw()), t.forEach(function(i) {
      var r = Sw.bind(null, e, i);
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
            re = c.stateNode, Je = !1;
            break t;
          case 3:
            re = c.stateNode.containerInfo, Je = !0;
            break t;
          case 4:
            re = c.stateNode.containerInfo, Je = !0;
            break t;
        }
        c = c.return;
      }
      if (re === null) throw Error(B(160));
      fv(o, a, r), re = null, Je = !1;
      var u = r.alternate;
      u !== null && (u.return = null), r.return = null;
    } catch (d) {
      Dt(r, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) pv(t, e), t = t.sibling;
}
function pv(e, t) {
  var n = e.alternate, i = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Ge(t, e), un(e), i & 4) {
        try {
          Br(3, e, e.return), El(3, e);
        } catch (w) {
          Dt(e, e.return, w);
        }
        try {
          Br(5, e, e.return);
        } catch (w) {
          Dt(e, e.return, w);
        }
      }
      break;
    case 1:
      Ge(t, e), un(e), i & 512 && n !== null && ws(n, n.return);
      break;
    case 5:
      if (Ge(t, e), un(e), i & 512 && n !== null && ws(n, n.return), e.flags & 32) {
        var r = e.stateNode;
        try {
          Kr(r, "");
        } catch (w) {
          Dt(e, e.return, w);
        }
      }
      if (i & 4 && (r = e.stateNode, r != null)) {
        var o = e.memoizedProps, a = n !== null ? n.memoizedProps : o, c = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          c === "input" && o.type === "radio" && o.name != null && Ig(r, o), bu(c, a);
          var d = bu(c, o);
          for (a = 0; a < u.length; a += 2) {
            var p = u[a], g = u[a + 1];
            p === "style" ? Hg(r, g) : p === "dangerouslySetInnerHTML" ? Fg(r, g) : p === "children" ? Kr(r, g) : Sh(r, p, g, d);
          }
          switch (c) {
            case "input":
              _u(r, o);
              break;
            case "textarea":
              Rg(r, o);
              break;
            case "select":
              var v = r._wrapperState.wasMultiple;
              r._wrapperState.wasMultiple = !!o.multiple;
              var y = o.value;
              y != null ? ks(r, !!o.multiple, y, !1) : v !== !!o.multiple && (o.defaultValue != null ? ks(
                r,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : ks(r, !!o.multiple, o.multiple ? [] : "", !1));
          }
          r[so] = o;
        } catch (w) {
          Dt(e, e.return, w);
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
          Dt(e, e.return, w);
        }
      }
      break;
    case 3:
      if (Ge(t, e), un(e), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Jr(t.containerInfo);
      } catch (w) {
        Dt(e, e.return, w);
      }
      break;
    case 4:
      Ge(t, e), un(e);
      break;
    case 13:
      Ge(t, e), un(e), r = e.child, r.flags & 8192 && (o = r.memoizedState !== null, r.stateNode.isHidden = o, !o || r.alternate !== null && r.alternate.memoizedState !== null || (id = Wt())), i & 4 && Np(e);
      break;
    case 22:
      if (p = n !== null && n.memoizedState !== null, e.mode & 1 ? (de = (d = de) || p, Ge(t, e), de = d) : Ge(t, e), un(e), i & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !p && e.mode & 1) for ($ = e, p = e.child; p !== null; ) {
          for (g = $ = p; $ !== null; ) {
            switch (v = $, y = v.child, v.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Br(4, v, v.return);
                break;
              case 1:
                ws(v, v.return);
                var S = v.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  i = v, n = v.return;
                  try {
                    t = i, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
                  } catch (w) {
                    Dt(i, n, w);
                  }
                }
                break;
              case 5:
                ws(v, v.return);
                break;
              case 22:
                if (v.memoizedState !== null) {
                  zp(g);
                  continue;
                }
            }
            y !== null ? (y.return = v, $ = y) : zp(g);
          }
          p = p.sibling;
        }
        t: for (p = null, g = e; ; ) {
          if (g.tag === 5) {
            if (p === null) {
              p = g;
              try {
                r = g.stateNode, d ? (o = r.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (c = g.stateNode, u = g.memoizedProps.style, a = u != null && u.hasOwnProperty("display") ? u.display : null, c.style.display = Bg("display", a));
              } catch (w) {
                Dt(e, e.return, w);
              }
            }
          } else if (g.tag === 6) {
            if (p === null) try {
              g.stateNode.nodeValue = d ? "" : g.memoizedProps;
            } catch (w) {
              Dt(e, e.return, w);
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
      Ge(t, e), un(e), i & 4 && Np(e);
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
          if (dv(n)) {
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
          i.flags & 32 && (Kr(r, ""), i.flags &= -33);
          var o = Tp(e);
          Qu(e, o, r);
          break;
        case 3:
        case 4:
          var a = i.stateNode.containerInfo, c = Tp(e);
          Gu(e, c, a);
          break;
        default:
          throw Error(B(161));
      }
    } catch (u) {
      Dt(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function gw(e, t, n) {
  $ = e, mv(e);
}
function mv(e, t, n) {
  for (var i = (e.mode & 1) !== 0; $ !== null; ) {
    var r = $, o = r.child;
    if (r.tag === 22 && i) {
      var a = r.memoizedState !== null || oa;
      if (!a) {
        var c = r.alternate, u = c !== null && c.memoizedState !== null || de;
        c = oa;
        var d = de;
        if (oa = a, (de = u) && !d) for ($ = r; $ !== null; ) a = $, u = a.child, a.tag === 22 && a.memoizedState !== null ? jp(r) : u !== null ? (u.return = a, $ = u) : jp(r);
        for (; o !== null; ) $ = o, mv(o), o = o.sibling;
        $ = r, oa = c, de = d;
      }
      Ep(e);
    } else r.subtreeFlags & 8772 && o !== null ? (o.return = r, $ = o) : Ep(e);
  }
}
function Ep(e) {
  for (; $ !== null; ) {
    var t = $;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            de || El(5, t);
            break;
          case 1:
            var i = t.stateNode;
            if (t.flags & 4 && !de) if (n === null) i.componentDidMount();
            else {
              var r = t.elementType === t.type ? n.memoizedProps : Qe(t.type, n.memoizedProps);
              i.componentDidUpdate(r, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && mp(t, o, i);
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
              mp(t, a, n);
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
                  g !== null && Jr(g);
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
        de || t.flags & 512 && Xu(t);
      } catch (v) {
        Dt(t, t.return, v);
      }
    }
    if (t === e) {
      $ = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, $ = n;
      break;
    }
    $ = t.return;
  }
}
function zp(e) {
  for (; $ !== null; ) {
    var t = $;
    if (t === e) {
      $ = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, $ = n;
      break;
    }
    $ = t.return;
  }
}
function jp(e) {
  for (; $ !== null; ) {
    var t = $;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            El(4, t);
          } catch (u) {
            Dt(t, n, u);
          }
          break;
        case 1:
          var i = t.stateNode;
          if (typeof i.componentDidMount == "function") {
            var r = t.return;
            try {
              i.componentDidMount();
            } catch (u) {
              Dt(t, r, u);
            }
          }
          var o = t.return;
          try {
            Xu(t);
          } catch (u) {
            Dt(t, o, u);
          }
          break;
        case 5:
          var a = t.return;
          try {
            Xu(t);
          } catch (u) {
            Dt(t, a, u);
          }
      }
    } catch (u) {
      Dt(t, t.return, u);
    }
    if (t === e) {
      $ = null;
      break;
    }
    var c = t.sibling;
    if (c !== null) {
      c.return = t.return, $ = c;
      break;
    }
    $ = t.return;
  }
}
var _w = Math.ceil, al = Hn.ReactCurrentDispatcher, ed = Hn.ReactCurrentOwner, $e = Hn.ReactCurrentBatchConfig, vt = 0, ne = null, $t = null, oe = 0, ze = 0, bs = _i(0), Xt = 0, uo = null, Zi = 0, zl = 0, nd = 0, Hr = null, Se = null, id = 0, Ds = 1 / 0, Tn = null, ll = !1, Ju = null, ci = null, aa = !1, Qn = null, cl = 0, Wr = 0, th = null, ja = -1, Oa = 0;
function ve() {
  return vt & 6 ? Wt() : ja !== -1 ? ja : ja = Wt();
}
function ui(e) {
  return e.mode & 1 ? vt & 2 && oe !== 0 ? oe & -oe : tw.transition !== null ? (Oa === 0 && (Oa = Jg()), Oa) : (e = Pt, e !== 0 || (e = window.event, e = e === void 0 ? 16 : o_(e.type)), e) : 1;
}
function nn(e, t, n, i) {
  if (50 < Wr) throw Wr = 0, th = null, Error(B(185));
  xo(e, n, i), (!(vt & 2) || e !== ne) && (e === ne && (!(vt & 2) && (zl |= n), Xt === 4 && Xn(e, oe)), Ne(e, i), n === 1 && vt === 0 && !(t.mode & 1) && (Ds = Wt() + 500, Ll && vi()));
}
function Ne(e, t) {
  var n = e.callbackNode;
  t1(e, t);
  var i = $a(e, e === ne ? oe : 0);
  if (i === 0) n !== null && Wf(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = i & -i, e.callbackPriority !== t) {
    if (n != null && Wf(n), t === 1) e.tag === 0 ? J1(Op.bind(null, e)) : P_(Op.bind(null, e)), K1(function() {
      !(vt & 6) && vi();
    }), n = null;
    else {
      switch (t_(i)) {
        case 1:
          n = Th;
          break;
        case 4:
          n = Gg;
          break;
        case 16:
          n = Ua;
          break;
        case 536870912:
          n = Qg;
          break;
        default:
          n = Ua;
      }
      n = kv(n, gv.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function gv(e, t) {
  if (ja = -1, Oa = 0, vt & 6) throw Error(B(327));
  var n = e.callbackNode;
  if (Ls() && e.callbackNode !== n) return null;
  var i = $a(e, e === ne ? oe : 0);
  if (i === 0) return null;
  if (i & 30 || i & e.expiredLanes || t) t = ul(e, i);
  else {
    t = i;
    var r = vt;
    vt |= 2;
    var o = vv();
    (ne !== e || oe !== t) && (Tn = null, Ds = Wt() + 500, Ri(e, t));
    do
      try {
        xw();
        break;
      } catch (c) {
        _v(e, c);
      }
    while (!0);
    Wh(), al.current = o, vt = r, $t !== null ? t = 0 : (ne = null, oe = 0, t = Xt);
  }
  if (t !== 0) {
    if (t === 2 && (r = Cu(e), r !== 0 && (i = r, t = eh(e, r))), t === 1) throw n = uo, Ri(e, 0), Xn(e, i), Ne(e, Wt()), n;
    if (t === 6) Xn(e, i);
    else {
      if (r = e.current.alternate, !(i & 30) && !vw(r) && (t = ul(e, i), t === 2 && (o = Cu(e), o !== 0 && (i = o, t = eh(e, o))), t === 1)) throw n = uo, Ri(e, 0), Xn(e, i), Ne(e, Wt()), n;
      switch (e.finishedWork = r, e.finishedLanes = i, t) {
        case 0:
        case 1:
          throw Error(B(345));
        case 2:
          Ni(e, Se, Tn);
          break;
        case 3:
          if (Xn(e, i), (i & 130023424) === i && (t = id + 500 - Wt(), 10 < t)) {
            if ($a(e, 0) !== 0) break;
            if (r = e.suspendedLanes, (r & i) !== i) {
              ve(), e.pingedLanes |= e.suspendedLanes & r;
              break;
            }
            e.timeoutHandle = Au(Ni.bind(null, e, Se, Tn), t);
            break;
          }
          Ni(e, Se, Tn);
          break;
        case 4:
          if (Xn(e, i), (i & 4194240) === i) break;
          for (t = e.eventTimes, r = -1; 0 < i; ) {
            var a = 31 - en(i);
            o = 1 << a, a = t[a], a > r && (r = a), i &= ~o;
          }
          if (i = r, i = Wt() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * _w(i / 1960)) - i, 10 < i) {
            e.timeoutHandle = Au(Ni.bind(null, e, Se, Tn), i);
            break;
          }
          Ni(e, Se, Tn);
          break;
        case 5:
          Ni(e, Se, Tn);
          break;
        default:
          throw Error(B(329));
      }
    }
  }
  return Ne(e, Wt()), e.callbackNode === n ? gv.bind(null, e) : null;
}
function eh(e, t) {
  var n = Hr;
  return e.current.memoizedState.isDehydrated && (Ri(e, t).flags |= 256), e = ul(e, t), e !== 2 && (t = Se, Se = n, t !== null && nh(t)), e;
}
function nh(e) {
  Se === null ? Se = e : Se.push.apply(Se, e);
}
function vw(e) {
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
function Xn(e, t) {
  for (t &= ~nd, t &= ~zl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - en(t), i = 1 << n;
    e[n] = -1, t &= ~i;
  }
}
function Op(e) {
  if (vt & 6) throw Error(B(327));
  Ls();
  var t = $a(e, 0);
  if (!(t & 1)) return Ne(e, Wt()), null;
  var n = ul(e, t);
  if (e.tag !== 0 && n === 2) {
    var i = Cu(e);
    i !== 0 && (t = i, n = eh(e, i));
  }
  if (n === 1) throw n = uo, Ri(e, 0), Xn(e, t), Ne(e, Wt()), n;
  if (n === 6) throw Error(B(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ni(e, Se, Tn), Ne(e, Wt()), null;
}
function sd(e, t) {
  var n = vt;
  vt |= 1;
  try {
    return e(t);
  } finally {
    vt = n, vt === 0 && (Ds = Wt() + 500, Ll && vi());
  }
}
function Ui(e) {
  Qn !== null && Qn.tag === 0 && !(vt & 6) && Ls();
  var t = vt;
  vt |= 1;
  var n = $e.transition, i = Pt;
  try {
    if ($e.transition = null, Pt = 1, e) return e();
  } finally {
    Pt = i, $e.transition = n, vt = t, !(vt & 6) && vi();
  }
}
function rd() {
  ze = bs.current, Et(bs);
}
function Ri(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, q1(n)), $t !== null) for (n = $t.return; n !== null; ) {
    var i = n;
    switch (Fh(i), i.tag) {
      case 1:
        i = i.type.childContextTypes, i != null && Ga();
        break;
      case 3:
        Is(), Et(Le), Et(pe), qh();
        break;
      case 5:
        Yh(i);
        break;
      case 4:
        Is();
        break;
      case 13:
        Et(Ot);
        break;
      case 19:
        Et(Ot);
        break;
      case 10:
        Vh(i.type._context);
        break;
      case 22:
      case 23:
        rd();
    }
    n = n.return;
  }
  if (ne = e, $t = e = hi(e.current, null), oe = ze = t, Xt = 0, uo = null, nd = zl = Zi = 0, Se = Hr = null, Oi !== null) {
    for (t = 0; t < Oi.length; t++) if (n = Oi[t], i = n.interleaved, i !== null) {
      n.interleaved = null;
      var r = i.next, o = n.pending;
      if (o !== null) {
        var a = o.next;
        o.next = r, i.next = a;
      }
      n.pending = i;
    }
    Oi = null;
  }
  return e;
}
function _v(e, t) {
  do {
    var n = $t;
    try {
      if (Wh(), Na.current = ol, rl) {
        for (var i = It.memoizedState; i !== null; ) {
          var r = i.queue;
          r !== null && (r.pending = null), i = i.next;
        }
        rl = !1;
      }
      if (Vi = 0, ee = qt = It = null, Fr = !1, ao = 0, ed.current = null, n === null || n.return === null) {
        Xt = 1, uo = t, $t = null;
        break;
      }
      t: {
        var o = e, a = n.return, c = n, u = t;
        if (t = oe, c.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var d = u, p = c, g = p.tag;
          if (!(p.mode & 1) && (g === 0 || g === 11 || g === 15)) {
            var v = p.alternate;
            v ? (p.updateQueue = v.updateQueue, p.memoizedState = v.memoizedState, p.lanes = v.lanes) : (p.updateQueue = null, p.memoizedState = null);
          }
          var y = wp(a);
          if (y !== null) {
            y.flags &= -257, bp(y, a, c, o, t), y.mode & 1 && xp(o, d, t), t = y, u = d;
            var S = t.updateQueue;
            if (S === null) {
              var w = /* @__PURE__ */ new Set();
              w.add(u), t.updateQueue = w;
            } else S.add(u);
            break t;
          } else {
            if (!(t & 1)) {
              xp(o, d, t), od();
              break t;
            }
            u = Error(B(426));
          }
        } else if (zt && c.mode & 1) {
          var M = wp(a);
          if (M !== null) {
            !(M.flags & 65536) && (M.flags |= 256), bp(M, a, c, o, t), Bh(Rs(u, c));
            break t;
          }
        }
        o = u = Rs(u, c), Xt !== 4 && (Xt = 2), Hr === null ? Hr = [o] : Hr.push(o), o = a;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var b = tv(o, u, t);
              pp(o, b);
              break t;
            case 1:
              c = u;
              var k = o.type, P = o.stateNode;
              if (!(o.flags & 128) && (typeof k.getDerivedStateFromError == "function" || P !== null && typeof P.componentDidCatch == "function" && (ci === null || !ci.has(P)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var T = ev(o, c, t);
                pp(o, T);
                break t;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      xv(n);
    } catch (N) {
      t = N, $t === n && n !== null && ($t = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function vv() {
  var e = al.current;
  return al.current = ol, e === null ? ol : e;
}
function od() {
  (Xt === 0 || Xt === 3 || Xt === 2) && (Xt = 4), ne === null || !(Zi & 268435455) && !(zl & 268435455) || Xn(ne, oe);
}
function ul(e, t) {
  var n = vt;
  vt |= 2;
  var i = vv();
  (ne !== e || oe !== t) && (Tn = null, Ri(e, t));
  do
    try {
      yw();
      break;
    } catch (r) {
      _v(e, r);
    }
  while (!0);
  if (Wh(), vt = n, al.current = i, $t !== null) throw Error(B(261));
  return ne = null, oe = 0, Xt;
}
function yw() {
  for (; $t !== null; ) yv($t);
}
function xw() {
  for (; $t !== null && !Ux(); ) yv($t);
}
function yv(e) {
  var t = bv(e.alternate, e, ze);
  e.memoizedProps = e.pendingProps, t === null ? xv(e) : $t = t, ed.current = null;
}
function xv(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = fw(n, t), n !== null) {
        n.flags &= 32767, $t = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        Xt = 6, $t = null;
        return;
      }
    } else if (n = dw(n, t, ze), n !== null) {
      $t = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      $t = t;
      return;
    }
    $t = t = e;
  } while (t !== null);
  Xt === 0 && (Xt = 5);
}
function Ni(e, t, n) {
  var i = Pt, r = $e.transition;
  try {
    $e.transition = null, Pt = 1, ww(e, t, n, i);
  } finally {
    $e.transition = r, Pt = i;
  }
  return null;
}
function ww(e, t, n, i) {
  do
    Ls();
  while (Qn !== null);
  if (vt & 6) throw Error(B(327));
  n = e.finishedWork;
  var r = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(B(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (e1(e, o), e === ne && ($t = ne = null, oe = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || aa || (aa = !0, kv(Ua, function() {
    return Ls(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = $e.transition, $e.transition = null;
    var a = Pt;
    Pt = 1;
    var c = vt;
    vt |= 4, ed.current = null, mw(e, n), pv(n, e), H1(ju), Ya = !!zu, ju = zu = null, e.current = n, gw(n), $x(), vt = c, Pt = a, $e.transition = o;
  } else e.current = n;
  if (aa && (aa = !1, Qn = e, cl = r), o = e.pendingLanes, o === 0 && (ci = null), Kx(n.stateNode), Ne(e, Wt()), t !== null) for (i = e.onRecoverableError, n = 0; n < t.length; n++) r = t[n], i(r.value, { componentStack: r.stack, digest: r.digest });
  if (ll) throw ll = !1, e = Ju, Ju = null, e;
  return cl & 1 && e.tag !== 0 && Ls(), o = e.pendingLanes, o & 1 ? e === th ? Wr++ : (Wr = 0, th = e) : Wr = 0, vi(), null;
}
function Ls() {
  if (Qn !== null) {
    var e = t_(cl), t = $e.transition, n = Pt;
    try {
      if ($e.transition = null, Pt = 16 > e ? 16 : e, Qn === null) var i = !1;
      else {
        if (e = Qn, Qn = null, cl = 0, vt & 6) throw Error(B(331));
        var r = vt;
        for (vt |= 4, $ = e.current; $ !== null; ) {
          var o = $, a = o.child;
          if ($.flags & 16) {
            var c = o.deletions;
            if (c !== null) {
              for (var u = 0; u < c.length; u++) {
                var d = c[u];
                for ($ = d; $ !== null; ) {
                  var p = $;
                  switch (p.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Br(8, p, o);
                  }
                  var g = p.child;
                  if (g !== null) g.return = p, $ = g;
                  else for (; $ !== null; ) {
                    p = $;
                    var v = p.sibling, y = p.return;
                    if (hv(p), p === d) {
                      $ = null;
                      break;
                    }
                    if (v !== null) {
                      v.return = y, $ = v;
                      break;
                    }
                    $ = y;
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
              $ = o;
            }
          }
          if (o.subtreeFlags & 2064 && a !== null) a.return = o, $ = a;
          else t: for (; $ !== null; ) {
            if (o = $, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Br(9, o, o.return);
            }
            var b = o.sibling;
            if (b !== null) {
              b.return = o.return, $ = b;
              break t;
            }
            $ = o.return;
          }
        }
        var k = e.current;
        for ($ = k; $ !== null; ) {
          a = $;
          var P = a.child;
          if (a.subtreeFlags & 2064 && P !== null) P.return = a, $ = P;
          else t: for (a = k; $ !== null; ) {
            if (c = $, c.flags & 2048) try {
              switch (c.tag) {
                case 0:
                case 11:
                case 15:
                  El(9, c);
              }
            } catch (N) {
              Dt(c, c.return, N);
            }
            if (c === a) {
              $ = null;
              break t;
            }
            var T = c.sibling;
            if (T !== null) {
              T.return = c.return, $ = T;
              break t;
            }
            $ = c.return;
          }
        }
        if (vt = r, vi(), _n && typeof _n.onPostCommitFiberRoot == "function") try {
          _n.onPostCommitFiberRoot(kl, e);
        } catch {
        }
        i = !0;
      }
      return i;
    } finally {
      Pt = n, $e.transition = t;
    }
  }
  return !1;
}
function Ap(e, t, n) {
  t = Rs(n, t), t = tv(e, t, 1), e = li(e, t, 1), t = ve(), e !== null && (xo(e, 1, t), Ne(e, t));
}
function Dt(e, t, n) {
  if (e.tag === 3) Ap(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Ap(t, e, n);
      break;
    } else if (t.tag === 1) {
      var i = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (ci === null || !ci.has(i))) {
        e = Rs(n, e), e = ev(t, e, 1), t = li(t, e, 1), e = ve(), t !== null && (xo(t, 1, e), Ne(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function bw(e, t, n) {
  var i = e.pingCache;
  i !== null && i.delete(t), t = ve(), e.pingedLanes |= e.suspendedLanes & n, ne === e && (oe & n) === n && (Xt === 4 || Xt === 3 && (oe & 130023424) === oe && 500 > Wt() - id ? Ri(e, 0) : nd |= n), Ne(e, t);
}
function wv(e, t) {
  t === 0 && (e.mode & 1 ? (t = Go, Go <<= 1, !(Go & 130023424) && (Go = 4194304)) : t = 1);
  var n = ve();
  e = Fn(e, t), e !== null && (xo(e, t, n), Ne(e, n));
}
function kw(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), wv(e, n);
}
function Sw(e, t) {
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
  i !== null && i.delete(t), wv(e, n);
}
var bv;
bv = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Le.current) Me = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Me = !1, hw(e, t, n);
    Me = !!(e.flags & 131072);
  }
  else Me = !1, zt && t.flags & 1048576 && M_(t, tl, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var i = t.type;
      za(e, t), e = t.pendingProps;
      var r = js(t, pe.current);
      Cs(t, n), r = Xh(null, t, i, e, r, n);
      var o = Gh();
      return t.flags |= 1, typeof r == "object" && r !== null && typeof r.render == "function" && r.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Te(i) ? (o = !0, Qa(t)) : o = !1, t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, Uh(t), r.updater = Nl, t.stateNode = r, r._reactInternals = t, Wu(t, i, e, n), t = Uu(null, t, i, !0, o, n)) : (t.tag = 0, zt && o && Dh(t), _e(null, t, r, n), t = t.child), t;
    case 16:
      i = t.elementType;
      t: {
        switch (za(e, t), e = t.pendingProps, r = i._init, i = r(i._payload), t.type = i, r = t.tag = Mw(i), e = Qe(i, e), r) {
          case 0:
            t = Zu(null, t, i, e, n);
            break t;
          case 1:
            t = Pp(null, t, i, e, n);
            break t;
          case 11:
            t = kp(null, t, i, e, n);
            break t;
          case 14:
            t = Sp(null, t, i, Qe(i.type, e), n);
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
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Qe(i, r), Zu(e, t, i, r, n);
    case 1:
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Qe(i, r), Pp(e, t, i, r, n);
    case 3:
      t: {
        if (rv(t), e === null) throw Error(B(387));
        i = t.pendingProps, o = t.memoizedState, r = o.element, z_(e, t), il(t, i, null, n);
        var a = t.memoizedState;
        if (i = a.element, o.isDehydrated) if (o = { element: i, isDehydrated: !1, cache: a.cache, pendingSuspenseBoundaries: a.pendingSuspenseBoundaries, transitions: a.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          r = Rs(Error(B(423)), t), t = Mp(e, t, i, n, r);
          break t;
        } else if (i !== r) {
          r = Rs(Error(B(424)), t), t = Mp(e, t, i, n, r);
          break t;
        } else for (Oe = ai(t.stateNode.containerInfo.firstChild), Ae = t, zt = !0, tn = null, n = N_(t, null, i, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Os(), i === r) {
            t = Bn(e, t, n);
            break t;
          }
          _e(e, t, i, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return j_(t), e === null && Fu(t), i = t.type, r = t.pendingProps, o = e !== null ? e.memoizedProps : null, a = r.children, Ou(i, r) ? a = null : o !== null && Ou(i, o) && (t.flags |= 32), sv(e, t), _e(e, t, a, n), t.child;
    case 6:
      return e === null && Fu(t), null;
    case 13:
      return ov(e, t, n);
    case 4:
      return $h(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = As(t, null, i, n) : _e(e, t, i, n), t.child;
    case 11:
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Qe(i, r), kp(e, t, i, r, n);
    case 7:
      return _e(e, t, t.pendingProps, n), t.child;
    case 8:
      return _e(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return _e(e, t, t.pendingProps.children, n), t.child;
    case 10:
      t: {
        if (i = t.type._context, r = t.pendingProps, o = t.memoizedProps, a = r.value, Lt(el, i._currentValue), i._currentValue = a, o !== null) if (sn(o.value, a)) {
          if (o.children === r.children && !Le.current) {
            t = Bn(e, t, n);
            break t;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var c = o.dependencies;
          if (c !== null) {
            a = o.child;
            for (var u = c.firstContext; u !== null; ) {
              if (u.context === i) {
                if (o.tag === 1) {
                  u = In(-1, n & -n), u.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var p = d.pending;
                    p === null ? u.next = u : (u.next = p.next, p.next = u), d.pending = u;
                  }
                }
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Bu(
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
            a.lanes |= n, c = a.alternate, c !== null && (c.lanes |= n), Bu(a, n, t), a = o.sibling;
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
        _e(e, t, r.children, n), t = t.child;
      }
      return t;
    case 9:
      return r = t.type, i = t.pendingProps.children, Cs(t, n), r = Ye(r), i = i(r), t.flags |= 1, _e(e, t, i, n), t.child;
    case 14:
      return i = t.type, r = Qe(i, t.pendingProps), r = Qe(i.type, r), Sp(e, t, i, r, n);
    case 15:
      return nv(e, t, t.type, t.pendingProps, n);
    case 17:
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Qe(i, r), za(e, t), t.tag = 1, Te(i) ? (e = !0, Qa(t)) : e = !1, Cs(t, n), J_(t, i, r), Wu(t, i, r, n), Uu(null, t, i, !0, e, n);
    case 19:
      return av(e, t, n);
    case 22:
      return iv(e, t, n);
  }
  throw Error(B(156, t.tag));
};
function kv(e, t) {
  return Xg(e, t);
}
function Pw(e, t, n, i) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ue(e, t, n, i) {
  return new Pw(e, t, n, i);
}
function ad(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Mw(e) {
  if (typeof e == "function") return ad(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Mh) return 11;
    if (e === Ch) return 14;
  }
  return 2;
}
function hi(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ue(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Aa(e, t, n, i, r, o) {
  var a = 2;
  if (i = e, typeof e == "function") ad(e) && (a = 1);
  else if (typeof e == "string") a = 5;
  else t: switch (e) {
    case ds:
      return Di(n.children, r, o, t);
    case Ph:
      a = 8, r |= 8;
      break;
    case du:
      return e = Ue(12, n, t, r | 2), e.elementType = du, e.lanes = o, e;
    case fu:
      return e = Ue(13, n, t, r), e.elementType = fu, e.lanes = o, e;
    case pu:
      return e = Ue(19, n, t, r), e.elementType = pu, e.lanes = o, e;
    case jg:
      return jl(n, r, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Eg:
          a = 10;
          break t;
        case zg:
          a = 9;
          break t;
        case Mh:
          a = 11;
          break t;
        case Ch:
          a = 14;
          break t;
        case Yn:
          a = 16, i = null;
          break t;
      }
      throw Error(B(130, e == null ? e : typeof e, ""));
  }
  return t = Ue(a, n, t, r), t.elementType = e, t.type = i, t.lanes = o, t;
}
function Di(e, t, n, i) {
  return e = Ue(7, e, i, t), e.lanes = n, e;
}
function jl(e, t, n, i) {
  return e = Ue(22, e, i, t), e.elementType = jg, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function $c(e, t, n) {
  return e = Ue(6, e, null, t), e.lanes = n, e;
}
function Yc(e, t, n) {
  return t = Ue(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function Cw(e, t, n, i, r) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Cc(0), this.expirationTimes = Cc(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Cc(0), this.identifierPrefix = i, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null;
}
function ld(e, t, n, i, r, o, a, c, u) {
  return e = new Cw(e, t, n, c, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Ue(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: i, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Uh(o), e;
}
function Lw(e, t, n) {
  var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: hs, key: i == null ? null : "" + i, children: e, containerInfo: t, implementation: n };
}
function Sv(e) {
  if (!e) return pi;
  e = e._reactInternals;
  t: {
    if (Ki(e) !== e || e.tag !== 1) throw Error(B(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break t;
        case 1:
          if (Te(t.type)) {
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
    if (Te(n)) return S_(e, n, t);
  }
  return t;
}
function Pv(e, t, n, i, r, o, a, c, u) {
  return e = ld(n, i, !0, e, r, o, a, c, u), e.context = Sv(null), n = e.current, i = ve(), r = ui(n), o = In(i, r), o.callback = t ?? null, li(n, o, r), e.current.lanes = r, xo(e, r, i), Ne(e, i), e;
}
function Ol(e, t, n, i) {
  var r = t.current, o = ve(), a = ui(r);
  return n = Sv(n), t.context === null ? t.context = n : t.pendingContext = n, t = In(o, a), t.payload = { element: e }, i = i === void 0 ? null : i, i !== null && (t.callback = i), e = li(r, t, a), e !== null && (nn(e, r, a, o), Ta(e, r, a)), a;
}
function hl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ip(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function cd(e, t) {
  Ip(e, t), (e = e.alternate) && Ip(e, t);
}
function Tw() {
  return null;
}
var Mv = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function ud(e) {
  this._internalRoot = e;
}
Al.prototype.render = ud.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(B(409));
  Ol(e, t, null, null);
};
Al.prototype.unmount = ud.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ui(function() {
      Ol(null, e, null, null);
    }), t[Dn] = null;
  }
};
function Al(e) {
  this._internalRoot = e;
}
Al.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = i_();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Kn.length && t !== 0 && t < Kn[n].priority; n++) ;
    Kn.splice(n, 0, e), n === 0 && r_(e);
  }
};
function hd(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Il(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Rp() {
}
function Nw(e, t, n, i, r) {
  if (r) {
    if (typeof i == "function") {
      var o = i;
      i = function() {
        var d = hl(a);
        o.call(d);
      };
    }
    var a = Pv(t, i, e, 0, null, !1, !1, "", Rp);
    return e._reactRootContainer = a, e[Dn] = a.current, no(e.nodeType === 8 ? e.parentNode : e), Ui(), a;
  }
  for (; r = e.lastChild; ) e.removeChild(r);
  if (typeof i == "function") {
    var c = i;
    i = function() {
      var d = hl(u);
      c.call(d);
    };
  }
  var u = ld(e, 0, !1, null, null, !1, !1, "", Rp);
  return e._reactRootContainer = u, e[Dn] = u.current, no(e.nodeType === 8 ? e.parentNode : e), Ui(function() {
    Ol(t, u, n, i);
  }), u;
}
function Rl(e, t, n, i, r) {
  var o = n._reactRootContainer;
  if (o) {
    var a = o;
    if (typeof r == "function") {
      var c = r;
      r = function() {
        var u = hl(a);
        c.call(u);
      };
    }
    Ol(t, a, e, r);
  } else a = Nw(n, t, e, r, i);
  return hl(a);
}
e_ = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Cr(t.pendingLanes);
        n !== 0 && (Nh(t, n | 1), Ne(t, Wt()), !(vt & 6) && (Ds = Wt() + 500, vi()));
      }
      break;
    case 13:
      Ui(function() {
        var i = Fn(e, 1);
        if (i !== null) {
          var r = ve();
          nn(i, e, 1, r);
        }
      }), cd(e, 1);
  }
};
Eh = function(e) {
  if (e.tag === 13) {
    var t = Fn(e, 134217728);
    if (t !== null) {
      var n = ve();
      nn(t, e, 134217728, n);
    }
    cd(e, 134217728);
  }
};
n_ = function(e) {
  if (e.tag === 13) {
    var t = ui(e), n = Fn(e, t);
    if (n !== null) {
      var i = ve();
      nn(n, e, t, i);
    }
    cd(e, t);
  }
};
i_ = function() {
  return Pt;
};
s_ = function(e, t) {
  var n = Pt;
  try {
    return Pt = e, t();
  } finally {
    Pt = n;
  }
};
Su = function(e, t, n) {
  switch (t) {
    case "input":
      if (_u(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var i = n[t];
          if (i !== e && i.form === e.form) {
            var r = Cl(i);
            if (!r) throw Error(B(90));
            Ag(i), _u(i, r);
          }
        }
      }
      break;
    case "textarea":
      Rg(e, n);
      break;
    case "select":
      t = n.value, t != null && ks(e, !!n.multiple, t, !1);
  }
};
Zg = sd;
Ug = Ui;
var Ew = { usingClientEntryPoint: !1, Events: [bo, gs, Cl, Wg, Vg, sd] }, yr = { findFiberByHostInstance: ji, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, zw = { bundleType: yr.bundleType, version: yr.version, rendererPackageName: yr.rendererPackageName, rendererConfig: yr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Hn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = qg(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: yr.findFiberByHostInstance || Tw, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var la = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!la.isDisabled && la.supportsFiber) try {
    kl = la.inject(zw), _n = la;
  } catch {
  }
}
Re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ew;
Re.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!hd(t)) throw Error(B(200));
  return Lw(e, t, null, n);
};
Re.createRoot = function(e, t) {
  if (!hd(e)) throw Error(B(299));
  var n = !1, i = "", r = Mv;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (r = t.onRecoverableError)), t = ld(e, 1, !1, null, null, n, !1, i, r), e[Dn] = t.current, no(e.nodeType === 8 ? e.parentNode : e), new ud(t);
};
Re.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(B(188)) : (e = Object.keys(e).join(","), Error(B(268, e)));
  return e = qg(t), e = e === null ? null : e.stateNode, e;
};
Re.flushSync = function(e) {
  return Ui(e);
};
Re.hydrate = function(e, t, n) {
  if (!Il(t)) throw Error(B(200));
  return Rl(null, e, t, !0, n);
};
Re.hydrateRoot = function(e, t, n) {
  if (!hd(e)) throw Error(B(405));
  var i = n != null && n.hydratedSources || null, r = !1, o = "", a = Mv;
  if (n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (a = n.onRecoverableError)), t = Pv(t, null, e, 1, n ?? null, r, !1, o, a), e[Dn] = t.current, no(e), i) for (e = 0; e < i.length; e++) n = i[e], r = n._getVersion, r = r(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, r] : t.mutableSourceEagerHydrationData.push(
    n,
    r
  );
  return new Al(t);
};
Re.render = function(e, t, n) {
  if (!Il(t)) throw Error(B(200));
  return Rl(null, e, t, !1, n);
};
Re.unmountComponentAtNode = function(e) {
  if (!Il(e)) throw Error(B(40));
  return e._reactRootContainer ? (Ui(function() {
    Rl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Dn] = null;
    });
  }), !0) : !1;
};
Re.unstable_batchedUpdates = sd;
Re.unstable_renderSubtreeIntoContainer = function(e, t, n, i) {
  if (!Il(n)) throw Error(B(200));
  if (e == null || e._reactInternals === void 0) throw Error(B(38));
  return Rl(e, t, n, !1, i);
};
Re.version = "18.3.1-next-f1338f8080-20240426";
function Cv() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Cv);
    } catch (e) {
      console.error(e);
    }
}
Cv(), Cg.exports = Re;
var jw = Cg.exports, Lv, Dp = jw;
Lv = Dp.createRoot, Dp.hydrateRoot;
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function So(e) {
  return e + 0.5 | 0;
}
const Jn = (e, t, n) => Math.max(Math.min(e, n), t);
function Tr(e) {
  return Jn(So(e * 2.55), 0, 255);
}
function di(e) {
  return Jn(So(e * 255), 0, 255);
}
function En(e) {
  return Jn(So(e / 2.55) / 100, 0, 1);
}
function Fp(e) {
  return Jn(So(e * 100), 0, 100);
}
const We = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, ih = [..."0123456789ABCDEF"], Ow = (e) => ih[e & 15], Aw = (e) => ih[(e & 240) >> 4] + ih[e & 15], ca = (e) => (e & 240) >> 4 === (e & 15), Iw = (e) => ca(e.r) && ca(e.g) && ca(e.b) && ca(e.a);
function Rw(e) {
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
const Dw = (e, t) => e < 255 ? t(e) : "";
function Fw(e) {
  var t = Iw(e) ? Ow : Aw;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + Dw(e.a, t) : void 0;
}
const Bw = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function Tv(e, t, n) {
  const i = t * Math.min(n, 1 - n), r = (o, a = (o + e / 30) % 12) => n - i * Math.max(Math.min(a - 3, 9 - a, 1), -1);
  return [r(0), r(8), r(4)];
}
function Hw(e, t, n) {
  const i = (r, o = (r + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [i(5), i(3), i(1)];
}
function Ww(e, t, n) {
  const i = Tv(e, 1, 0.5);
  let r;
  for (t + n > 1 && (r = 1 / (t + n), t *= r, n *= r), r = 0; r < 3; r++)
    i[r] *= 1 - t - n, i[r] += t;
  return i;
}
function Vw(e, t, n, i, r) {
  return e === r ? (t - n) / i + (t < n ? 6 : 0) : t === r ? (n - e) / i + 2 : (e - t) / i + 4;
}
function dd(e) {
  const n = e.r / 255, i = e.g / 255, r = e.b / 255, o = Math.max(n, i, r), a = Math.min(n, i, r), c = (o + a) / 2;
  let u, d, p;
  return o !== a && (p = o - a, d = c > 0.5 ? p / (2 - o - a) : p / (o + a), u = Vw(n, i, r, p, o), u = u * 60 + 0.5), [u | 0, d || 0, c];
}
function fd(e, t, n, i) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, i)).map(di);
}
function pd(e, t, n) {
  return fd(Tv, e, t, n);
}
function Zw(e, t, n) {
  return fd(Ww, e, t, n);
}
function Uw(e, t, n) {
  return fd(Hw, e, t, n);
}
function Nv(e) {
  return (e % 360 + 360) % 360;
}
function $w(e) {
  const t = Bw.exec(e);
  let n = 255, i;
  if (!t)
    return;
  t[5] !== i && (n = t[6] ? Tr(+t[5]) : di(+t[5]));
  const r = Nv(+t[2]), o = +t[3] / 100, a = +t[4] / 100;
  return t[1] === "hwb" ? i = Zw(r, o, a) : t[1] === "hsv" ? i = Uw(r, o, a) : i = pd(r, o, a), {
    r: i[0],
    g: i[1],
    b: i[2],
    a: n
  };
}
function Yw(e, t) {
  var n = dd(e);
  n[0] = Nv(n[0] + t), n = pd(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function qw(e) {
  if (!e)
    return;
  const t = dd(e), n = t[0], i = Fp(t[1]), r = Fp(t[2]);
  return e.a < 255 ? `hsla(${n}, ${i}%, ${r}%, ${En(e.a)})` : `hsl(${n}, ${i}%, ${r}%)`;
}
const Bp = {
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
}, Hp = {
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
function Kw() {
  const e = {}, t = Object.keys(Hp), n = Object.keys(Bp);
  let i, r, o, a, c;
  for (i = 0; i < t.length; i++) {
    for (a = c = t[i], r = 0; r < n.length; r++)
      o = n[r], c = c.replace(o, Bp[o]);
    o = parseInt(Hp[a], 16), e[c] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let ua;
function Xw(e) {
  ua || (ua = Kw(), ua.transparent = [0, 0, 0, 0]);
  const t = ua[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Gw = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Qw(e) {
  const t = Gw.exec(e);
  let n = 255, i, r, o;
  if (t) {
    if (t[7] !== i) {
      const a = +t[7];
      n = t[8] ? Tr(a) : Jn(a * 255, 0, 255);
    }
    return i = +t[1], r = +t[3], o = +t[5], i = 255 & (t[2] ? Tr(i) : Jn(i, 0, 255)), r = 255 & (t[4] ? Tr(r) : Jn(r, 0, 255)), o = 255 & (t[6] ? Tr(o) : Jn(o, 0, 255)), {
      r: i,
      g: r,
      b: o,
      a: n
    };
  }
}
function Jw(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${En(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const qc = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ls = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function tb(e, t, n) {
  const i = ls(En(e.r)), r = ls(En(e.g)), o = ls(En(e.b));
  return {
    r: di(qc(i + n * (ls(En(t.r)) - i))),
    g: di(qc(r + n * (ls(En(t.g)) - r))),
    b: di(qc(o + n * (ls(En(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function ha(e, t, n) {
  if (e) {
    let i = dd(e);
    i[t] = Math.max(0, Math.min(i[t] + i[t] * n, t === 0 ? 360 : 1)), i = pd(i), e.r = i[0], e.g = i[1], e.b = i[2];
  }
}
function Ev(e, t) {
  return e && Object.assign(t || {}, e);
}
function Wp(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = di(e[3]))) : (t = Ev(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = di(t.a)), t;
}
function eb(e) {
  return e.charAt(0) === "r" ? Qw(e) : $w(e);
}
class ho {
  constructor(t) {
    if (t instanceof ho)
      return t;
    const n = typeof t;
    let i;
    n === "object" ? i = Wp(t) : n === "string" && (i = Rw(t) || Xw(t) || eb(t)), this._rgb = i, this._valid = !!i;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = Ev(this._rgb);
    return t && (t.a = En(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Wp(t);
  }
  rgbString() {
    return this._valid ? Jw(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Fw(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? qw(this._rgb) : void 0;
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
    return t && (this._rgb = tb(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new ho(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = di(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = So(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return ha(this._rgb, 2, t), this;
  }
  darken(t) {
    return ha(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ha(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ha(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Yw(this._rgb, t), this;
  }
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function Mn() {
}
const nb = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function kt(e) {
  return e == null;
}
function Kt(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function mt(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function me(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function hn(e, t) {
  return me(e) ? e : t;
}
function ht(e, t) {
  return typeof e > "u" ? t : e;
}
const ib = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, zv = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Nt(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function St(e, t, n, i) {
  let r, o, a;
  if (Kt(e))
    for (o = e.length, r = 0; r < o; r++)
      t.call(n, e[r], r);
  else if (mt(e))
    for (a = Object.keys(e), o = a.length, r = 0; r < o; r++)
      t.call(n, e[a[r]], a[r]);
}
function dl(e, t) {
  let n, i, r, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, i = e.length; n < i; ++n)
    if (r = e[n], o = t[n], r.datasetIndex !== o.datasetIndex || r.index !== o.index)
      return !1;
  return !0;
}
function fl(e) {
  if (Kt(e))
    return e.map(fl);
  if (mt(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), i = n.length;
    let r = 0;
    for (; r < i; ++r)
      t[n[r]] = fl(e[n[r]]);
    return t;
  }
  return e;
}
function jv(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function sb(e, t, n, i) {
  if (!jv(e))
    return;
  const r = t[e], o = n[e];
  mt(r) && mt(o) ? fo(r, o, i) : t[e] = fl(o);
}
function fo(e, t, n) {
  const i = Kt(t) ? t : [
    t
  ], r = i.length;
  if (!mt(e))
    return e;
  n = n || {};
  const o = n.merger || sb;
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
function Vr(e, t) {
  return fo(e, t, {
    merger: rb
  });
}
function rb(e, t, n) {
  if (!jv(e))
    return;
  const i = t[e], r = n[e];
  mt(i) && mt(r) ? Vr(i, r) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = fl(r));
}
const Vp = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function ob(e) {
  const t = e.split("."), n = [];
  let i = "";
  for (const r of t)
    i += r, i.endsWith("\\") ? i = i.slice(0, -1) + "." : (n.push(i), i = "");
  return n;
}
function ab(e) {
  const t = ob(e);
  return (n) => {
    for (const i of t) {
      if (i === "")
        break;
      n = n && n[i];
    }
    return n;
  };
}
function $i(e, t) {
  return (Vp[t] || (Vp[t] = ab(t)))(e);
}
function md(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const po = (e) => typeof e < "u", mi = (e) => typeof e == "function", Zp = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function lb(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const Mt = Math.PI, At = 2 * Mt, cb = At + Mt, pl = Number.POSITIVE_INFINITY, ub = Mt / 180, Gt = Mt / 2, Mi = Mt / 4, Up = Mt * 2 / 3, Ov = Math.log10, yn = Math.sign;
function Zr(e, t, n) {
  return Math.abs(e - t) < n;
}
function $p(e) {
  const t = Math.round(e);
  e = Zr(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(Ov(e))), i = e / n;
  return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * n;
}
function hb(e) {
  const t = [], n = Math.sqrt(e);
  let i;
  for (i = 1; i < n; i++)
    e % i === 0 && (t.push(i), t.push(e / i));
  return n === (n | 0) && t.push(n), t.sort((r, o) => r - o).pop(), t;
}
function db(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function mo(e) {
  return !db(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function fb(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function pb(e, t, n) {
  let i, r, o;
  for (i = 0, r = e.length; i < r; i++)
    o = e[i][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function On(e) {
  return e * (Mt / 180);
}
function mb(e) {
  return e * (180 / Mt);
}
function Yp(e) {
  if (!me(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function Av(e, t) {
  const n = t.x - e.x, i = t.y - e.y, r = Math.sqrt(n * n + i * i);
  let o = Math.atan2(i, n);
  return o < -0.5 * Mt && (o += At), {
    angle: o,
    distance: r
  };
}
function sh(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function gb(e, t) {
  return (e - t + cb) % At - Mt;
}
function je(e) {
  return (e % At + At) % At;
}
function go(e, t, n, i) {
  const r = je(e), o = je(t), a = je(n), c = je(o - r), u = je(a - r), d = je(r - o), p = je(r - a);
  return r === o || r === a || i && o === a || c > u && d < p;
}
function fe(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function _b(e) {
  return fe(e, -32768, 32767);
}
function An(e, t, n, i = 1e-6) {
  return e >= Math.min(t, n) - i && e <= Math.max(t, n) + i;
}
function gd(e, t, n) {
  n = n || ((a) => e[a] < t);
  let i = e.length - 1, r = 0, o;
  for (; i - r > 1; )
    o = r + i >> 1, n(o) ? r = o : i = o;
  return {
    lo: r,
    hi: i
  };
}
const Ii = (e, t, n, i) => gd(e, n, i ? (r) => {
  const o = e[r][t];
  return o < n || o === n && e[r + 1][t] === n;
} : (r) => e[r][t] < n), vb = (e, t, n) => gd(e, n, (i) => e[i][t] >= n);
function yb(e, t, n) {
  let i = 0, r = e.length;
  for (; i < r && e[i] < t; )
    i++;
  for (; r > i && e[r - 1] > n; )
    r--;
  return i > 0 || r < e.length ? e.slice(i, r) : e;
}
const Iv = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function xb(e, t) {
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
  }), Iv.forEach((n) => {
    const i = "_onData" + md(n), r = e[n];
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
function qp(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const i = n.listeners, r = i.indexOf(t);
  r !== -1 && i.splice(r, 1), !(i.length > 0) && (Iv.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Rv(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Dv = function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
}();
function Fv(e, t) {
  let n = [], i = !1;
  return function(...r) {
    n = r, i || (i = !0, Dv.call(window, () => {
      i = !1, e.apply(t, n);
    }));
  };
}
function wb(e, t) {
  let n;
  return function(...i) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, i)) : e.apply(this, i), t;
  };
}
const Bv = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Ee = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, bb = (e, t, n, i) => e === (i ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function kb(e, t, n) {
  const i = t.length;
  let r = 0, o = i;
  if (e._sorted) {
    const { iScale: a, vScale: c, _parsed: u } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, p = a.axis, { min: g, max: v, minDefined: y, maxDefined: S } = a.getUserBounds();
    if (y) {
      if (r = Math.min(
        // @ts-expect-error Need to type _parsed
        Ii(u, p, g).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? i : Ii(t, p, a.getPixelForValue(g)).lo
      ), d) {
        const w = u.slice(0, r + 1).reverse().findIndex((M) => !kt(M[c.axis]));
        r -= Math.max(0, w);
      }
      r = fe(r, 0, i - 1);
    }
    if (S) {
      let w = Math.max(
        // @ts-expect-error Need to type _parsed
        Ii(u, a.axis, v, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Ii(t, p, a.getPixelForValue(v), !0).hi + 1
      );
      if (d) {
        const M = u.slice(w - 1).findIndex((b) => !kt(b[c.axis]));
        w += Math.max(0, M);
      }
      o = fe(w, r, i) - r;
    } else
      o = i - r;
  }
  return {
    start: r,
    count: o
  };
}
function Sb(e) {
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
const da = (e) => e === 0 || e === 1, Kp = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * At / n)), Xp = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * At / n) + 1, Ur = {
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
  easeInSine: (e) => -Math.cos(e * Gt) + 1,
  easeOutSine: (e) => Math.sin(e * Gt),
  easeInOutSine: (e) => -0.5 * (Math.cos(Mt * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => da(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => da(e) ? e : Kp(e, 0.075, 0.3),
  easeOutElastic: (e) => da(e) ? e : Xp(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return da(e) ? e : e < 0.5 ? 0.5 * Kp(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Xp(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Ur.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Ur.easeInBounce(e * 2) * 0.5 : Ur.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function _d(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Gp(e) {
  return _d(e) ? e : new ho(e);
}
function Kc(e) {
  return _d(e) ? e : new ho(e).saturate(0.5).darken(0.1).hexString();
}
const Pb = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Mb = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Cb(e) {
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
      properties: Mb
    },
    numbers: {
      type: "number",
      properties: Pb
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
function Lb(e) {
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
const Qp = /* @__PURE__ */ new Map();
function Tb(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let i = Qp.get(n);
  return i || (i = new Intl.NumberFormat(e, t), Qp.set(n, i)), i;
}
function vd(e, t, n) {
  return Tb(t, n).format(e);
}
const Nb = {
  values(e) {
    return Kt(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const i = this.chart.options.locale;
    let r, o = e;
    if (n.length > 1) {
      const d = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (d < 1e-4 || d > 1e15) && (r = "scientific"), o = Eb(e, n);
    }
    const a = Ov(Math.abs(o)), c = isNaN(a) ? 1 : Math.max(Math.min(-1 * Math.floor(a), 20), 0), u = {
      notation: r,
      minimumFractionDigits: c,
      maximumFractionDigits: c
    };
    return Object.assign(u, this.options.ticks.format), vd(e, i, u);
  }
};
function Eb(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var Hv = {
  formatters: Nb
};
function zb(e) {
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
      callback: Hv.formatters.values,
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
const Yi = /* @__PURE__ */ Object.create(null), rh = /* @__PURE__ */ Object.create(null);
function $r(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let i = 0, r = n.length; i < r; ++i) {
    const o = n[i];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Xc(e, t, n) {
  return typeof t == "string" ? fo($r(e, t), n) : fo($r(e, ""), t);
}
class jb {
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
    }, this.hover = {}, this.hoverBackgroundColor = (i, r) => Kc(r.backgroundColor), this.hoverBorderColor = (i, r) => Kc(r.borderColor), this.hoverColor = (i, r) => Kc(r.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return Xc(this, t, n);
  }
  get(t) {
    return $r(this, t);
  }
  describe(t, n) {
    return Xc(rh, t, n);
  }
  override(t, n) {
    return Xc(Yi, t, n);
  }
  route(t, n, i, r) {
    const o = $r(this, t), a = $r(this, i), c = "_" + n;
    Object.defineProperties(o, {
      [c]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const u = this[c], d = a[r];
          return mt(u) ? Object.assign({}, d, u) : ht(u, d);
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
var Vt = /* @__PURE__ */ new jb({
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
  Cb,
  Lb,
  zb
]);
function Ob(e) {
  return !e || kt(e.size) || kt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Jp(e, t, n, i, r) {
  let o = t[r];
  return o || (o = t[r] = e.measureText(r).width, n.push(r)), o > i && (i = o), i;
}
function Ci(e, t, n) {
  const i = e.currentDevicePixelRatio, r = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - r) * i) / i + r;
}
function tm(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function oh(e, t, n, i) {
  Wv(e, t, n, i, null);
}
function Wv(e, t, n, i, r) {
  let o, a, c, u, d, p, g, v;
  const y = t.pointStyle, S = t.rotation, w = t.radius;
  let M = (S || 0) * ub;
  if (y && typeof y == "object" && (o = y.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, i), e.rotate(M), e.drawImage(y, -y.width / 2, -y.height / 2, y.width, y.height), e.restore();
    return;
  }
  if (!(isNaN(w) || w <= 0)) {
    switch (e.beginPath(), y) {
      default:
        r ? e.ellipse(n, i, r / 2, w, 0, 0, At) : e.arc(n, i, w, 0, At), e.closePath();
        break;
      case "triangle":
        p = r ? r / 2 : w, e.moveTo(n + Math.sin(M) * p, i - Math.cos(M) * w), M += Up, e.lineTo(n + Math.sin(M) * p, i - Math.cos(M) * w), M += Up, e.lineTo(n + Math.sin(M) * p, i - Math.cos(M) * w), e.closePath();
        break;
      case "rectRounded":
        d = w * 0.516, u = w - d, a = Math.cos(M + Mi) * u, g = Math.cos(M + Mi) * (r ? r / 2 - d : u), c = Math.sin(M + Mi) * u, v = Math.sin(M + Mi) * (r ? r / 2 - d : u), e.arc(n - g, i - c, d, M - Mt, M - Gt), e.arc(n + v, i - a, d, M - Gt, M), e.arc(n + g, i + c, d, M, M + Gt), e.arc(n - v, i + a, d, M + Gt, M + Mt), e.closePath();
        break;
      case "rect":
        if (!S) {
          u = Math.SQRT1_2 * w, p = r ? r / 2 : u, e.rect(n - p, i - u, 2 * p, 2 * u);
          break;
        }
        M += Mi;
      case "rectRot":
        g = Math.cos(M) * (r ? r / 2 : w), a = Math.cos(M) * w, c = Math.sin(M) * w, v = Math.sin(M) * (r ? r / 2 : w), e.moveTo(n - g, i - c), e.lineTo(n + v, i - a), e.lineTo(n + g, i + c), e.lineTo(n - v, i + a), e.closePath();
        break;
      case "crossRot":
        M += Mi;
      case "cross":
        g = Math.cos(M) * (r ? r / 2 : w), a = Math.cos(M) * w, c = Math.sin(M) * w, v = Math.sin(M) * (r ? r / 2 : w), e.moveTo(n - g, i - c), e.lineTo(n + g, i + c), e.moveTo(n + v, i - a), e.lineTo(n - v, i + a);
        break;
      case "star":
        g = Math.cos(M) * (r ? r / 2 : w), a = Math.cos(M) * w, c = Math.sin(M) * w, v = Math.sin(M) * (r ? r / 2 : w), e.moveTo(n - g, i - c), e.lineTo(n + g, i + c), e.moveTo(n + v, i - a), e.lineTo(n - v, i + a), M += Mi, g = Math.cos(M) * (r ? r / 2 : w), a = Math.cos(M) * w, c = Math.sin(M) * w, v = Math.sin(M) * (r ? r / 2 : w), e.moveTo(n - g, i - c), e.lineTo(n + g, i + c), e.moveTo(n + v, i - a), e.lineTo(n - v, i + a);
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
function _o(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function Dl(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Fl(e) {
  e.restore();
}
function Ab(e, t, n, i, r) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (r === "middle") {
    const o = (t.x + n.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, n.y);
  } else r === "after" != !!i ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function Ib(e, t, n, i) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(i ? t.cp1x : t.cp2x, i ? t.cp1y : t.cp2y, i ? n.cp2x : n.cp1x, i ? n.cp2y : n.cp1y, n.x, n.y);
}
function Rb(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), kt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function Db(e, t, n, i, r) {
  if (r.strikethrough || r.underline) {
    const o = e.measureText(i), a = t - o.actualBoundingBoxLeft, c = t + o.actualBoundingBoxRight, u = n - o.actualBoundingBoxAscent, d = n + o.actualBoundingBoxDescent, p = r.strikethrough ? (u + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = r.decorationWidth || 2, e.moveTo(a, p), e.lineTo(c, p), e.stroke();
  }
}
function Fb(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function ml(e, t, n, i, r, o = {}) {
  const a = Kt(t) ? t : [
    t
  ], c = o.strokeWidth > 0 && o.strokeColor !== "";
  let u, d;
  for (e.save(), e.font = r.string, Rb(e, o), u = 0; u < a.length; ++u)
    d = a[u], o.backdrop && Fb(e, o.backdrop), c && (o.strokeColor && (e.strokeStyle = o.strokeColor), kt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, n, i, o.maxWidth)), e.fillText(d, n, i, o.maxWidth), Db(e, n, i, d, o), i += Number(r.lineHeight);
  e.restore();
}
function gl(e, t) {
  const { x: n, y: i, w: r, h: o, radius: a } = t;
  e.arc(n + a.topLeft, i + a.topLeft, a.topLeft, 1.5 * Mt, Mt, !0), e.lineTo(n, i + o - a.bottomLeft), e.arc(n + a.bottomLeft, i + o - a.bottomLeft, a.bottomLeft, Mt, Gt, !0), e.lineTo(n + r - a.bottomRight, i + o), e.arc(n + r - a.bottomRight, i + o - a.bottomRight, a.bottomRight, Gt, 0, !0), e.lineTo(n + r, i + a.topRight), e.arc(n + r - a.topRight, i + a.topRight, a.topRight, 0, -Gt, !0), e.lineTo(n + a.topLeft, i);
}
const Bb = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Hb = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Wb(e, t) {
  const n = ("" + e).match(Bb);
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
const Vb = (e) => +e || 0;
function yd(e, t) {
  const n = {}, i = mt(t), r = i ? Object.keys(t) : t, o = mt(e) ? i ? (a) => ht(e[a], e[t[a]]) : (a) => e[a] : () => e;
  for (const a of r)
    n[a] = Vb(o(a));
  return n;
}
function Vv(e) {
  return yd(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ts(e) {
  return yd(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function rn(e) {
  const t = Vv(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function Ce(e, t) {
  e = e || {}, t = t || Vt.font;
  let n = ht(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let i = ht(e.style, t.style);
  i && !("" + i).match(Hb) && (console.warn('Invalid font style specified: "' + i + '"'), i = void 0);
  const r = {
    family: ht(e.family, t.family),
    lineHeight: Wb(ht(e.lineHeight, t.lineHeight), n),
    size: n,
    style: i,
    weight: ht(e.weight, t.weight),
    string: ""
  };
  return r.string = Ob(r), r;
}
function fa(e, t, n, i) {
  let r, o, a;
  for (r = 0, o = e.length; r < o; ++r)
    if (a = e[r], a !== void 0 && a !== void 0)
      return a;
}
function Zb(e, t, n) {
  const { min: i, max: r } = e, o = zv(t, (r - i) / 2), a = (c, u) => n && c === 0 ? 0 : c + u;
  return {
    min: a(i, -Math.abs(o)),
    max: a(r, o)
  };
}
function Xi(e, t) {
  return Object.assign(Object.create(e), t);
}
function xd(e, t = [
  ""
], n, i, r = () => e[0]) {
  const o = n || e;
  typeof i > "u" && (i = Yv("_fallback", e));
  const a = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: i,
    _getTarget: r,
    override: (c) => xd([
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
      return Uv(c, u, () => Qb(u, t, e, c));
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
      return nm(c).includes(u);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(c) {
      return nm(c);
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
function Fs(e, t, n, i) {
  const r = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Zv(e, i),
    setContext: (o) => Fs(e, o, n, i),
    override: (o) => Fs(e.override(o), t, n, i)
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
      return Uv(o, a, () => $b(o, a, c));
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
function Zv(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: i = t.indexable, _allKeys: r = t.allKeys } = e;
  return {
    allKeys: r,
    scriptable: n,
    indexable: i,
    isScriptable: mi(n) ? n : () => n,
    isIndexable: mi(i) ? i : () => i
  };
}
const Ub = (e, t) => e ? e + md(t) : t, wd = (e, t) => mt(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Uv(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const i = n();
  return e[t] = i, i;
}
function $b(e, t, n) {
  const { _proxy: i, _context: r, _subProxy: o, _descriptors: a } = e;
  let c = i[t];
  return mi(c) && a.isScriptable(t) && (c = Yb(t, c, e, n)), Kt(c) && c.length && (c = qb(t, c, e, a.isIndexable)), wd(t, c) && (c = Fs(c, r, o && o[t], a)), c;
}
function Yb(e, t, n, i) {
  const { _proxy: r, _context: o, _subProxy: a, _stack: c } = n;
  if (c.has(e))
    throw new Error("Recursion detected: " + Array.from(c).join("->") + "->" + e);
  c.add(e);
  let u = t(o, a || i);
  return c.delete(e), wd(e, u) && (u = bd(r._scopes, r, e, u)), u;
}
function qb(e, t, n, i) {
  const { _proxy: r, _context: o, _subProxy: a, _descriptors: c } = n;
  if (typeof o.index < "u" && i(e))
    return t[o.index % t.length];
  if (mt(t[0])) {
    const u = t, d = r._scopes.filter((p) => p !== u);
    t = [];
    for (const p of u) {
      const g = bd(d, r, e, p);
      t.push(Fs(g, o, a && a[e], c));
    }
  }
  return t;
}
function $v(e, t, n) {
  return mi(e) ? e(t, n) : e;
}
const Kb = (e, t) => e === !0 ? t : typeof e == "string" ? $i(t, e) : void 0;
function Xb(e, t, n, i, r) {
  for (const o of t) {
    const a = Kb(n, o);
    if (a) {
      e.add(a);
      const c = $v(a._fallback, n, r);
      if (typeof c < "u" && c !== n && c !== i)
        return c;
    } else if (a === !1 && typeof i < "u" && n !== i)
      return null;
  }
  return !1;
}
function bd(e, t, n, i) {
  const r = t._rootScopes, o = $v(t._fallback, n, i), a = [
    ...e,
    ...r
  ], c = /* @__PURE__ */ new Set();
  c.add(i);
  let u = em(c, a, n, o || n, i);
  return u === null || typeof o < "u" && o !== n && (u = em(c, a, o, u, i), u === null) ? !1 : xd(Array.from(c), [
    ""
  ], r, o, () => Gb(t, n, i));
}
function em(e, t, n, i, r) {
  for (; n; )
    n = Xb(e, t, n, i, r);
  return n;
}
function Gb(e, t, n) {
  const i = e._getTarget();
  t in i || (i[t] = {});
  const r = i[t];
  return Kt(r) && mt(n) ? n : r || {};
}
function Qb(e, t, n, i) {
  let r;
  for (const o of t)
    if (r = Yv(Ub(o, e), n), typeof r < "u")
      return wd(e, r) ? bd(n, i, e, r) : r;
}
function Yv(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const i = n[e];
    if (typeof i < "u")
      return i;
  }
}
function nm(e) {
  let t = e._keys;
  return t || (t = e._keys = Jb(e._scopes)), t;
}
function Jb(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const i of Object.keys(n).filter((r) => !r.startsWith("_")))
      t.add(i);
  return Array.from(t);
}
const tk = Number.EPSILON || 1e-14, Bs = (e, t) => t < e.length && !e[t].skip && e[t], qv = (e) => e === "x" ? "y" : "x";
function ek(e, t, n, i) {
  const r = e.skip ? t : e, o = t, a = n.skip ? t : n, c = sh(o, r), u = sh(a, o);
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
function nk(e, t, n) {
  const i = e.length;
  let r, o, a, c, u, d = Bs(e, 0);
  for (let p = 0; p < i - 1; ++p)
    if (u = d, d = Bs(e, p + 1), !(!u || !d)) {
      if (Zr(t[p], 0, tk)) {
        n[p] = n[p + 1] = 0;
        continue;
      }
      r = n[p] / t[p], o = n[p + 1] / t[p], c = Math.pow(r, 2) + Math.pow(o, 2), !(c <= 9) && (a = 3 / Math.sqrt(c), n[p] = r * a * t[p], n[p + 1] = o * a * t[p]);
    }
}
function ik(e, t, n = "x") {
  const i = qv(n), r = e.length;
  let o, a, c, u = Bs(e, 0);
  for (let d = 0; d < r; ++d) {
    if (a = c, c = u, u = Bs(e, d + 1), !c)
      continue;
    const p = c[n], g = c[i];
    a && (o = (p - a[n]) / 3, c[`cp1${n}`] = p - o, c[`cp1${i}`] = g - o * t[d]), u && (o = (u[n] - p) / 3, c[`cp2${n}`] = p + o, c[`cp2${i}`] = g + o * t[d]);
  }
}
function sk(e, t = "x") {
  const n = qv(t), i = e.length, r = Array(i).fill(0), o = Array(i);
  let a, c, u, d = Bs(e, 0);
  for (a = 0; a < i; ++a)
    if (c = u, u = d, d = Bs(e, a + 1), !!u) {
      if (d) {
        const p = d[t] - u[t];
        r[a] = p !== 0 ? (d[n] - u[n]) / p : 0;
      }
      o[a] = c ? d ? yn(r[a - 1]) !== yn(r[a]) ? 0 : (r[a - 1] + r[a]) / 2 : r[a - 1] : r[a];
    }
  nk(e, r, o), ik(e, o, t);
}
function pa(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function rk(e, t) {
  let n, i, r, o, a, c = _o(e[0], t);
  for (n = 0, i = e.length; n < i; ++n)
    a = o, o = c, c = n < i - 1 && _o(e[n + 1], t), o && (r = e[n], a && (r.cp1x = pa(r.cp1x, t.left, t.right), r.cp1y = pa(r.cp1y, t.top, t.bottom)), c && (r.cp2x = pa(r.cp2x, t.left, t.right), r.cp2y = pa(r.cp2y, t.top, t.bottom)));
}
function ok(e, t, n, i, r) {
  let o, a, c, u;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    sk(e, r);
  else {
    let d = i ? e[e.length - 1] : e[0];
    for (o = 0, a = e.length; o < a; ++o)
      c = e[o], u = ek(d, c, e[Math.min(o + 1, a - (i ? 0 : 1)) % a], t.tension), c.cp1x = u.previous.x, c.cp1y = u.previous.y, c.cp2x = u.next.x, c.cp2y = u.next.y, d = c;
  }
  t.capBezierPoints && rk(e, n);
}
function kd() {
  return typeof window < "u" && typeof document < "u";
}
function Sd(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function _l(e, t, n) {
  let i;
  return typeof e == "string" ? (i = parseInt(e, 10), e.indexOf("%") !== -1 && (i = i / 100 * t.parentNode[n])) : i = e, i;
}
const Bl = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function ak(e, t) {
  return Bl(e).getPropertyValue(t);
}
const lk = [
  "top",
  "right",
  "bottom",
  "left"
];
function Fi(e, t, n) {
  const i = {};
  n = n ? "-" + n : "";
  for (let r = 0; r < 4; r++) {
    const o = lk[r];
    i[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return i.width = i.left + i.right, i.height = i.top + i.bottom, i;
}
const ck = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function uk(e, t) {
  const n = e.touches, i = n && n.length ? n[0] : e, { offsetX: r, offsetY: o } = i;
  let a = !1, c, u;
  if (ck(r, o, e.target))
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
function Ei(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: i } = t, r = Bl(n), o = r.boxSizing === "border-box", a = Fi(r, "padding"), c = Fi(r, "border", "width"), { x: u, y: d, box: p } = uk(e, n), g = a.left + (p && c.left), v = a.top + (p && c.top);
  let { width: y, height: S } = t;
  return o && (y -= a.width + c.width, S -= a.height + c.height), {
    x: Math.round((u - g) / y * n.width / i),
    y: Math.round((d - v) / S * n.height / i)
  };
}
function hk(e, t, n) {
  let i, r;
  if (t === void 0 || n === void 0) {
    const o = e && Sd(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const a = o.getBoundingClientRect(), c = Bl(o), u = Fi(c, "border", "width"), d = Fi(c, "padding");
      t = a.width - d.width - u.width, n = a.height - d.height - u.height, i = _l(c.maxWidth, o, "clientWidth"), r = _l(c.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: i || pl,
    maxHeight: r || pl
  };
}
const ti = (e) => Math.round(e * 10) / 10;
function dk(e, t, n, i) {
  const r = Bl(e), o = Fi(r, "margin"), a = _l(r.maxWidth, e, "clientWidth") || pl, c = _l(r.maxHeight, e, "clientHeight") || pl, u = hk(e, t, n);
  let { width: d, height: p } = u;
  if (r.boxSizing === "content-box") {
    const v = Fi(r, "border", "width"), y = Fi(r, "padding");
    d -= y.width + v.width, p -= y.height + v.height;
  }
  return d = Math.max(0, d - o.width), p = Math.max(0, i ? d / i : p - o.height), d = ti(Math.min(d, a, u.maxWidth)), p = ti(Math.min(p, c, u.maxHeight)), d && !p && (p = ti(d / 2)), (t !== void 0 || n !== void 0) && i && u.height && p > u.height && (p = u.height, d = ti(Math.floor(p * i))), {
    width: d,
    height: p
  };
}
function im(e, t, n) {
  const i = t || 1, r = ti(e.height * i), o = ti(e.width * i);
  e.height = ti(e.height), e.width = ti(e.width);
  const a = e.canvas;
  return a.style && (n || !a.style.height && !a.style.width) && (a.style.height = `${e.height}px`, a.style.width = `${e.width}px`), e.currentDevicePixelRatio !== i || a.height !== r || a.width !== o ? (e.currentDevicePixelRatio = i, a.height = r, a.width = o, e.ctx.setTransform(i, 0, 0, i, 0, 0), !0) : !1;
}
const fk = function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    kd() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
}();
function sm(e, t) {
  const n = ak(e, t), i = n && n.match(/^(\d+)(\.\d+)?px$/);
  return i ? +i[1] : void 0;
}
function zi(e, t, n, i) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function pk(e, t, n, i) {
  return {
    x: e.x + n * (t.x - e.x),
    y: i === "middle" ? n < 0.5 ? e.y : t.y : i === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function mk(e, t, n, i) {
  const r = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, a = zi(e, r, n), c = zi(r, o, n), u = zi(o, t, n), d = zi(a, c, n), p = zi(c, u, n);
  return zi(d, p, n);
}
const gk = function(e, t) {
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
}, _k = function() {
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
function Ns(e, t, n) {
  return e ? gk(t, n) : _k();
}
function Kv(e, t) {
  let n, i;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, i = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = i);
}
function Xv(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Gv(e) {
  return e === "angle" ? {
    between: go,
    compare: gb,
    normalize: je
  } : {
    between: An,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function rm({ start: e, end: t, count: n, loop: i, style: r }) {
  return {
    start: e % n,
    end: t % n,
    loop: i && (t - e + 1) % n === 0,
    style: r
  };
}
function vk(e, t, n) {
  const { property: i, start: r, end: o } = n, { between: a, normalize: c } = Gv(i), u = t.length;
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
function Qv(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: i, start: r, end: o } = n, a = t.length, { compare: c, between: u, normalize: d } = Gv(i), { start: p, end: g, loop: v, style: y } = vk(e, t, n), S = [];
  let w = !1, M = null, b, k, P;
  const T = () => u(r, P, b) && c(r, P) !== 0, N = () => c(o, b) === 0 || u(o, P, b), A = () => w || T(), j = () => !w || N();
  for (let O = p, H = p; O <= g; ++O)
    k = t[O % a], !k.skip && (b = d(k[i]), b !== P && (w = u(b, r, o), M === null && A() && (M = c(b, r) === 0 ? O : H), M !== null && j() && (S.push(rm({
      start: M,
      end: O,
      loop: v,
      count: a,
      style: y
    })), M = null), H = O, P = b));
  return M !== null && S.push(rm({
    start: M,
    end: g,
    loop: v,
    count: a,
    style: y
  })), S;
}
function Jv(e, t) {
  const n = [], i = e.segments;
  for (let r = 0; r < i.length; r++) {
    const o = Qv(i[r], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function yk(e, t, n, i) {
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
function xk(e, t, n, i) {
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
function wk(e, t) {
  const n = e.points, i = e.options.spanGaps, r = n.length;
  if (!r)
    return [];
  const o = !!e._loop, { start: a, end: c } = yk(n, r, o, i);
  if (i === !0)
    return om(e, [
      {
        start: a,
        end: c,
        loop: o
      }
    ], n, t);
  const u = c < a ? c + r : c, d = !!e._fullLoop && a === 0 && c === r - 1;
  return om(e, xk(n, a, u, d), n, t);
}
function om(e, t, n, i) {
  return !i || !i.setContext || !n ? t : bk(e, t, n, i);
}
function bk(e, t, n, i) {
  const r = e._chart.getContext(), o = am(e.options), { _datasetIndex: a, options: { spanGaps: c } } = e, u = n.length, d = [];
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
      M = am(i.setContext(Xi(r, {
        type: "segment",
        p0: w,
        p1: b,
        p0DataIndex: (v - 1) % u,
        p1DataIndex: v % u,
        datasetIndex: a
      }))), kk(M, p) && y(g, v - 1, S.loop, p), w = b, p = M;
    }
    g < v - 1 && y(g, v - 1, S.loop, p);
  }
  return d;
}
function am(e) {
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
function kk(e, t) {
  if (!t)
    return !1;
  const n = [], i = function(r, o) {
    return _d(o) ? (n.includes(o) || n.push(o), n.indexOf(o)) : o;
  };
  return JSON.stringify(e, i) !== JSON.stringify(t, i);
}
function ma(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function Sk(e, t) {
  const { xScale: n, yScale: i } = e;
  return n && i ? {
    left: ma(n, t, "left"),
    right: ma(n, t, "right"),
    top: ma(i, t, "top"),
    bottom: ma(i, t, "bottom")
  } : t;
}
function ty(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const i = Sk(t, e.chartArea);
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
class Pk {
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
    this._request || (this._running = !0, this._request = Dv.call(window, () => {
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
var Cn = /* @__PURE__ */ new Pk();
const lm = "transparent", Mk = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const i = Gp(e || lm), r = i.valid && Gp(t || lm);
    return r && r.valid ? r.mix(i, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class Ck {
  constructor(t, n, i, r) {
    const o = n[i];
    r = fa([
      t.to,
      r,
      o,
      t.from
    ]);
    const a = fa([
      t.from,
      o,
      r
    ]);
    this._active = !0, this._fn = t.fn || Mk[t.type || typeof a], this._easing = Ur[t.easing] || Ur.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = i, this._from = a, this._to = r, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, i) {
    if (this._active) {
      this._notify(!1);
      const r = this._target[this._prop], o = i - this._start, a = this._duration - o;
      this._start = i, this._duration = Math.floor(Math.max(a, t.duration)), this._total += o, this._loop = !!t.loop, this._to = fa([
        t.to,
        n,
        r,
        t.from
      ]), this._from = fa([
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
class ey {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!mt(t))
      return;
    const n = Object.keys(Vt.animation), i = this._properties;
    Object.getOwnPropertyNames(t).forEach((r) => {
      const o = t[r];
      if (!mt(o))
        return;
      const a = {};
      for (const c of n)
        a[c] = o[c];
      (Kt(o.properties) && o.properties || [
        r
      ]).forEach((c) => {
        (c === r || !i.has(c)) && i.set(c, a);
      });
    });
  }
  _animateOptions(t, n) {
    const i = n.options, r = Tk(t, i);
    if (!r)
      return [];
    const o = this._createAnimations(r, i);
    return i.$shared && Lk(t.options.$animations, i).then(() => {
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
      o[d] = g = new Ck(v, t, d, p), r.push(g);
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
      return Cn.add(this._chart, i), !0;
  }
}
function Lk(e, t) {
  const n = [], i = Object.keys(t);
  for (let r = 0; r < i.length; r++) {
    const o = e[i[r]];
    o && o.active() && n.push(o.wait());
  }
  return Promise.all(n);
}
function Tk(e, t) {
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
function cm(e, t) {
  const n = e && e.options || {}, i = n.reverse, r = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: i ? o : r,
    end: i ? r : o
  };
}
function Nk(e, t, n) {
  if (n === !1)
    return !1;
  const i = cm(e, n), r = cm(t, n);
  return {
    top: r.end,
    right: i.end,
    bottom: r.start,
    left: i.start
  };
}
function Ek(e) {
  let t, n, i, r;
  return mt(e) ? (t = e.top, n = e.right, i = e.bottom, r = e.left) : t = n = i = r = e, {
    top: t,
    right: n,
    bottom: i,
    left: r,
    disabled: e === !1
  };
}
function ny(e, t) {
  const n = [], i = e._getSortedDatasetMetas(t);
  let r, o;
  for (r = 0, o = i.length; r < o; ++r)
    n.push(i[r].index);
  return n;
}
function um(e, t, n, i = {}) {
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
    d = e.values[u], me(d) && (o || t === 0 || yn(t) === yn(d)) && (t += d);
  }
  return !p && !i.all ? 0 : t;
}
function zk(e, t) {
  const { iScale: n, vScale: i } = t, r = n.axis === "x" ? "x" : "y", o = i.axis === "x" ? "x" : "y", a = Object.keys(e), c = new Array(a.length);
  let u, d, p;
  for (u = 0, d = a.length; u < d; ++u)
    p = a[u], c[u] = {
      [r]: p,
      [o]: e[p]
    };
  return c;
}
function Gc(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function jk(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function Ok(e) {
  const { min: t, max: n, minDefined: i, maxDefined: r } = e.getUserBounds();
  return {
    min: i ? t : Number.NEGATIVE_INFINITY,
    max: r ? n : Number.POSITIVE_INFINITY
  };
}
function Ak(e, t, n) {
  const i = e[t] || (e[t] = {});
  return i[n] || (i[n] = {});
}
function hm(e, t, n, i) {
  for (const r of t.getMatchingVisibleMetas(i).reverse()) {
    const o = e[r.index];
    if (n && o > 0 || !n && o < 0)
      return r.index;
  }
  return null;
}
function dm(e, t) {
  const { chart: n, _cachedMeta: i } = e, r = n._stacks || (n._stacks = {}), { iScale: o, vScale: a, index: c } = i, u = o.axis, d = a.axis, p = jk(o, a, i), g = t.length;
  let v;
  for (let y = 0; y < g; ++y) {
    const S = t[y], { [u]: w, [d]: M } = S, b = S._stacks || (S._stacks = {});
    v = b[d] = Ak(r, p, w), v[c] = M, v._top = hm(v, a, !0, i.type), v._bottom = hm(v, a, !1, i.type);
    const k = v._visualValues || (v._visualValues = {});
    k[c] = M;
  }
}
function Qc(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((i) => n[i].axis === t).shift();
}
function Ik(e, t) {
  return Xi(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Rk(e, t, n) {
  return Xi(e, {
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
function xr(e, t) {
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
const Jc = (e) => e === "reset" || e === "none", fm = (e, t) => t ? e : Object.assign({}, e), Dk = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: ny(n, !0),
  values: null
};
class Bi {
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Gc(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && xr(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, i = this.getDataset(), r = (g, v, y, S) => g === "x" ? v : g === "r" ? S : y, o = n.xAxisID = ht(i.xAxisID, Qc(t, "x")), a = n.yAxisID = ht(i.yAxisID, Qc(t, "y")), c = n.rAxisID = ht(i.rAxisID, Qc(t, "r")), u = n.indexAxis, d = n.iAxisID = r(u, o, a, c), p = n.vAxisID = r(u, a, o, c);
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
    this._data && qp(this._data, this), t._stacked && xr(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), i = this._data;
    if (mt(n)) {
      const r = this._cachedMeta;
      this._data = zk(n, r);
    } else if (i !== n) {
      if (i) {
        qp(i, this);
        const r = this._cachedMeta;
        xr(r), r._parsed = [];
      }
      n && Object.isExtensible(n) && xb(n, this), this._syncList = [], this._data = n;
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
    n._stacked = Gc(n.vScale, n), n.stack !== i.stack && (r = !0, xr(n), n.stack = i.stack), this._resyncElements(t), (r || o !== n._stacked) && (dm(this, n._parsed), n._stacked = Gc(n.vScale, n));
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
      Kt(r[t]) ? v = this.parseArrayData(i, r, t, n) : mt(r[t]) ? v = this.parseObjectData(i, r, t, n) : v = this.parsePrimitiveData(i, r, t, n);
      const y = () => g[c] === null || d && g[c] < d[c];
      for (p = 0; p < n; ++p)
        i._parsed[p + t] = g = v[p], u && (y() && (u = !1), d = g);
      i._sorted = u;
    }
    a && dm(this, v);
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
        x: o.parse($i(y, c), v),
        y: a.parse($i(y, u), v)
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
      keys: ny(r, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return um(c, a, o.index, {
      mode: i
    });
  }
  updateRangeFromParsed(t, n, i, r) {
    const o = i[n.axis];
    let a = o === null ? NaN : o;
    const c = r && i._stacks[n.axis];
    r && c && (r.values = c, a = um(r, o, this._cachedMeta.index)), t.min = Math.min(t.min, a), t.max = Math.max(t.max, a);
  }
  getMinMax(t, n) {
    const i = this._cachedMeta, r = i._parsed, o = i._sorted && t === i.iScale, a = r.length, c = this._getOtherScale(t), u = Dk(n, i, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: p, max: g } = Ok(c);
    let v, y;
    function S() {
      y = r[v];
      const w = y[c.axis];
      return !me(y[t.axis]) || p > w || g < w;
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
      a = n[r][t.axis], me(a) && i.push(a);
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
    this.update(t || "default"), n._clip = Ek(ht(this.options.clip, Nk(n.xScale, n.yScale, this.getMaxOverflow())));
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
      o = a.$context || (a.$context = Rk(this.getContext(), t, a)), o.parsed = this.getParsed(t), o.raw = r.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = Ik(this.chart.getContext(), this.index)), o.dataset = r, o.index = o.datasetIndex = this.index;
    return o.active = !!n, o.mode = i, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", i) {
    const r = n === "active", o = this._cachedDataOpts, a = t + "-" + n, c = o[a], u = this.enableOptionSharing && po(i);
    if (c)
      return fm(c, u);
    const d = this.chart.config, p = d.datasetElementScopeKeys(this._type, t), g = r ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], v = d.getOptionScopes(this.getDataset(), p), y = Object.keys(Vt.elements[t]), S = () => this.getContext(i, r, n), w = d.resolveNamedOptions(v, y, S, g);
    return w.$shared && (w.$shared = u, o[a] = Object.freeze(fm(w, u))), w;
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
    const d = new ey(r, u && u.animations);
    return u && u._cacheable && (o[a] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || Jc(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const i = this.resolveDataElementOptions(t, n), r = this._sharedOptions, o = this.getSharedOptions(i), a = this.includeOptions(n, o) || o !== r;
    return this.updateSharedOptions(o, n, i), {
      sharedOptions: o,
      includeOptions: a
    };
  }
  updateElement(t, n, i, r) {
    Jc(r) ? Object.assign(t, i) : this._resolveAnimations(n, r).update(t, i);
  }
  updateSharedOptions(t, n, i) {
    t && !Jc(n) && this._resolveAnimations(void 0, n).update(t, i);
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
      i._stacked && xr(i, r);
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
Y(Bi, "defaults", {}), Y(Bi, "datasetElementType", null), Y(Bi, "dataElementType", null);
function Fk(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let i = [];
    for (let r = 0, o = n.length; r < o; r++)
      i = i.concat(n[r].controller.getAllParsedValues(e));
    e._cache.$bar = Rv(i.sort((r, o) => r - o));
  }
  return e._cache.$bar;
}
function Bk(e) {
  const t = e.iScale, n = Fk(t, e.type);
  let i = t._length, r, o, a, c;
  const u = () => {
    a === 32767 || a === -32768 || (po(c) && (i = Math.min(i, Math.abs(a - c) || i)), c = a);
  };
  for (r = 0, o = n.length; r < o; ++r)
    a = t.getPixelForValue(n[r]), u();
  for (c = void 0, r = 0, o = t.ticks.length; r < o; ++r)
    a = t.getPixelForTick(r), u();
  return i;
}
function Hk(e, t, n, i) {
  const r = n.barThickness;
  let o, a;
  return kt(r) ? (o = t.min * n.categoryPercentage, a = n.barPercentage) : (o = r * i, a = 1), {
    chunk: o / i,
    ratio: a,
    start: t.pixels[e] - o / 2
  };
}
function Wk(e, t, n, i) {
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
function Vk(e, t, n, i) {
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
function iy(e, t, n, i) {
  return Kt(e) ? Vk(e, t, n, i) : t[n.axis] = n.parse(e, i), t;
}
function pm(e, t, n, i) {
  const r = e.iScale, o = e.vScale, a = r.getLabels(), c = r === o, u = [];
  let d, p, g, v;
  for (d = n, p = n + i; d < p; ++d)
    v = t[d], g = {}, g[r.axis] = c || r.parse(a[d], d), u.push(iy(v, g, o, d));
  return u;
}
function tu(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Zk(e, t, n) {
  return e !== 0 ? yn(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Uk(e) {
  let t, n, i, r, o;
  return e.horizontal ? (t = e.base > e.x, n = "left", i = "right") : (t = e.base < e.y, n = "bottom", i = "top"), t ? (r = "end", o = "start") : (r = "start", o = "end"), {
    start: n,
    end: i,
    reverse: t,
    top: r,
    bottom: o
  };
}
function $k(e, t, n, i) {
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
  const { start: a, end: c, reverse: u, top: d, bottom: p } = Uk(e);
  r === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === i ? r = d : (n._bottom || 0) === i ? r = p : (o[mm(p, a, c, u)] = !0, r = d)), o[mm(r, a, c, u)] = !0, e.borderSkipped = o;
}
function mm(e, t, n, i) {
  return i ? (e = Yk(e, t, n), e = gm(e, n, t)) : e = gm(e, t, n), e;
}
function Yk(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function gm(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function qk(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class Ia extends Bi {
  parsePrimitiveData(t, n, i, r) {
    return pm(t, n, i, r);
  }
  parseArrayData(t, n, i, r) {
    return pm(t, n, i, r);
  }
  parseObjectData(t, n, i, r) {
    const { iScale: o, vScale: a } = t, { xAxisKey: c = "x", yAxisKey: u = "y" } = this._parsing, d = o.axis === "x" ? c : u, p = a.axis === "x" ? c : u, g = [];
    let v, y, S, w;
    for (v = i, y = i + r; v < y; ++v)
      w = n[v], S = {}, S[o.axis] = o.parse($i(w, d), v), g.push(iy($i(w, p), S, a, v));
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
    const n = this._cachedMeta, { iScale: i, vScale: r } = n, o = this.getParsed(t), a = o._custom, c = tu(a) ? "[" + a.start + ", " + a.end + "]" : "" + r.getLabelForValue(o[r.axis]);
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
      const S = this.getParsed(y), w = o || kt(S[c.axis]) ? {
        base: u,
        head: u
      } : this._calculateBarValuePixels(y), M = this._calculateBarIndexPixels(y, p), b = (S._stacks || {})[c.axis], k = {
        horizontal: d,
        base: w.base,
        enableBorderRadius: !b || tu(S._custom) || a === b._top || a === b._bottom,
        x: d ? w.head : M.center,
        y: d ? M.center : w.head,
        height: d ? M.size : Math.abs(w.size),
        width: d ? Math.abs(w.size) : M.size
      };
      v && (k.options = g || this.resolveDataElementOptions(y, t[y].active ? "active" : r));
      const P = k.options || t[y].options;
      $k(k, P, b, a), qk(k, P, p.ratio), this.updateElement(t[y], y, k, r);
    }
  }
  _getStacks(t, n) {
    const { iScale: i } = this._cachedMeta, r = i.getMatchingVisibleMetas(this._type).filter((p) => p.controller.options.grouped), o = i.options.stacked, a = [], c = this._cachedMeta.controller.getParsed(n), u = c && c[i.axis], d = (p) => {
      const g = p._parsed.find((y) => y[i.axis] === u), v = g && g[p.vScale.axis];
      if (kt(v) || isNaN(v))
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
      t[ht(this.chart.options.indexAxis === "x" ? i.xAxisID : i.yAxisID, n)] = !0;
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
      min: c || Bk(n),
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
    const { _cachedMeta: { vScale: n, _stacked: i, index: r }, options: { base: o, minBarLength: a } } = this, c = o || 0, u = this.getParsed(t), d = u._custom, p = tu(d);
    let g = u[n.axis], v = 0, y = i ? this.applyStack(n, u, i) : g, S, w;
    y !== g && (v = y - g, y = g), p && (g = d.barStart, y = d.barEnd - d.barStart, g !== 0 && yn(g) !== yn(d.barEnd) && (v = 0), v += g);
    const M = !kt(o) && !p ? o : v;
    let b = n.getPixelForValue(M);
    if (this.chart.getDataVisibility(t) ? S = n.getPixelForValue(v + y) : S = b, w = S - b, Math.abs(w) < a) {
      w = Zk(w, n, c) * a, g === c && (b -= w / 2);
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
    const i = n.scale, r = this.options, o = r.skipNull, a = ht(r.maxBarThickness, 1 / 0);
    let c, u;
    const d = this._getAxisCount();
    if (n.grouped) {
      const p = o ? this._getStackCount(t) : n.stackCount, g = r.barThickness === "flex" ? Wk(t, n, r, p * d) : Hk(t, n, r, p * d), v = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, y = this._getAxis().indexOf(ht(v, this.getFirstScaleIdForIndexAxis())), S = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + y;
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
Y(Ia, "id", "bar"), Y(Ia, "defaults", {
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
}), Y(Ia, "overrides", {
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
function Kk(e, t, n) {
  let i = 1, r = 1, o = 0, a = 0;
  if (t < At) {
    const c = e, u = c + t, d = Math.cos(c), p = Math.sin(c), g = Math.cos(u), v = Math.sin(u), y = (P, T, N) => go(P, c, u, !0) ? 1 : Math.max(T, T * n, N, N * n), S = (P, T, N) => go(P, c, u, !0) ? -1 : Math.min(T, T * n, N, N * n), w = y(0, d, g), M = y(Gt, p, v), b = S(Mt, d, g), k = S(Mt + Gt, p, v);
    i = (w - b) / 2, r = (M - k) / 2, o = -(w + b) / 2, a = -(M + k) / 2;
  }
  return {
    ratioX: i,
    ratioY: r,
    offsetX: o,
    offsetY: a
  };
}
class Nr extends Bi {
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
        o = (d) => +$i(i[d], u);
      }
      let a, c;
      for (a = t, c = t + n; a < c; ++a)
        r._parsed[a] = o(a);
    }
  }
  _getRotation() {
    return On(this.options.rotation - 90);
  }
  _getCircumference() {
    return On(this.options.circumference);
  }
  _getRotationExtents() {
    let t = At, n = -At;
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
    const n = this.chart, { chartArea: i } = n, r = this._cachedMeta, o = r.data, a = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, c = Math.max((Math.min(i.width, i.height) - a) / 2, 0), u = Math.min(ib(this.options.cutout, c), 1), d = this._getRingWeight(this.index), { circumference: p, rotation: g } = this._getRotationExtents(), { ratioX: v, ratioY: y, offsetX: S, offsetY: w } = Kk(g, p, u), M = (i.width - a) / v, b = (i.height - a) / y, k = Math.max(Math.min(M, b) / 2, 0), P = zv(this.options.radius, k), T = Math.max(P * u, 0), N = (P - T) / this._getVisibleDatasetWeightTotal();
    this.offsetX = S * P, this.offsetY = w * P, r.total = this.calculateTotal(), this.outerRadius = P - N * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - N * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const i = this.options, r = this._cachedMeta, o = this._getCircumference();
    return n && i.animation.animateRotate || !this.chart.getDataVisibility(t) || r._parsed[t] === null || r.data[t].hidden ? 0 : this.calculateCircumference(r._parsed[t] * o / At);
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
    return n > 0 && !isNaN(t) ? At * (Math.abs(t) / n) : 0;
  }
  getLabelAndValue(t) {
    const n = this._cachedMeta, i = this.chart, r = i.data.labels || [], o = vd(n._parsed[t], i.options.locale);
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
    return Math.max(ht(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
Y(Nr, "id", "doughnut"), Y(Nr, "defaults", {
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
}), Y(Nr, "descriptors", {
  _scriptable: (t) => t !== "spacing",
  _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
}), Y(Nr, "overrides", {
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
class Ra extends Bi {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const n = this._cachedMeta, { dataset: i, data: r = [], _dataset: o } = n, a = this.chart._animationsDisabled;
    let { start: c, count: u } = kb(n, r, a);
    this._drawStart = c, this._drawCount = u, Sb(n) && (c = 0, u = r.length), i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!o._decimated, i.points = r;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(i, void 0, {
      animated: !a,
      options: d
    }, t), this.updateElements(r, c, u, t);
  }
  updateElements(t, n, i, r) {
    const o = r === "reset", { iScale: a, vScale: c, _stacked: u, _dataset: d } = this._cachedMeta, { sharedOptions: p, includeOptions: g } = this._getSharedOptions(n, r), v = a.axis, y = c.axis, { spanGaps: S, segment: w } = this.options, M = mo(S) ? S : Number.POSITIVE_INFINITY, b = this.chart._animationsDisabled || o || r === "none", k = n + i, P = t.length;
    let T = n > 0 && this.getParsed(n - 1);
    for (let N = 0; N < P; ++N) {
      const A = t[N], j = b ? A : {};
      if (N < n || N >= k) {
        j.skip = !0;
        continue;
      }
      const O = this.getParsed(N), H = kt(O[y]), R = j[v] = a.getPixelForValue(O[v], N), V = j[y] = o || H ? c.getBasePixel() : c.getPixelForValue(u ? this.applyStack(c, O, u) : O[y], N);
      j.skip = isNaN(R) || isNaN(V) || H, j.stop = N > 0 && Math.abs(O[v] - T[v]) > M, w && (j.parsed = O, j.raw = d.data[N]), g && (j.options = p || this.resolveDataElementOptions(N, A.active ? "active" : r)), b || this.updateElement(A, N, j, r), T = O;
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
Y(Ra, "id", "line"), Y(Ra, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), Y(Ra, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
function Li() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Pd {
  constructor(t) {
    Y(this, "options");
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
    Object.assign(Pd.prototype, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Li();
  }
  parse() {
    return Li();
  }
  format() {
    return Li();
  }
  add() {
    return Li();
  }
  diff() {
    return Li();
  }
  startOf() {
    return Li();
  }
  endOf() {
    return Li();
  }
}
var Xk = {
  _date: Pd
};
function Gk(e, t, n, i) {
  const { controller: r, data: o, _sorted: a } = e, c = r._cachedMeta.iScale, u = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (c && t === c.axis && t !== "r" && a && o.length) {
    const d = c._reversePixels ? vb : Ii;
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
        const { vScale: g } = r._cachedMeta, { _parsed: v } = e, y = v.slice(0, p.lo + 1).reverse().findIndex((w) => !kt(w[g.axis]));
        p.lo -= Math.max(0, y);
        const S = v.slice(p.hi).findIndex((w) => !kt(w[g.axis]));
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
function Hl(e, t, n, i, r) {
  const o = e.getSortedVisibleDatasetMetas(), a = n[t];
  for (let c = 0, u = o.length; c < u; ++c) {
    const { index: d, data: p } = o[c], { lo: g, hi: v } = Gk(o[c], t, a, r);
    for (let y = g; y <= v; ++y) {
      const S = p[y];
      S.skip || i(S, d, y);
    }
  }
}
function Qk(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(i, r) {
    const o = t ? Math.abs(i.x - r.x) : 0, a = n ? Math.abs(i.y - r.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(a, 2));
  };
}
function eu(e, t, n, i, r) {
  const o = [];
  return !r && !e.isPointInArea(t) || Hl(e, n, t, function(c, u, d) {
    !r && !_o(c, e.chartArea, 0) || c.inRange(t.x, t.y, i) && o.push({
      element: c,
      datasetIndex: u,
      index: d
    });
  }, !0), o;
}
function Jk(e, t, n, i) {
  let r = [];
  function o(a, c, u) {
    const { startAngle: d, endAngle: p } = a.getProps([
      "startAngle",
      "endAngle"
    ], i), { angle: g } = Av(a, {
      x: t.x,
      y: t.y
    });
    go(g, d, p) && r.push({
      element: a,
      datasetIndex: c,
      index: u
    });
  }
  return Hl(e, n, t, o), r;
}
function t2(e, t, n, i, r, o) {
  let a = [];
  const c = Qk(n);
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
  return Hl(e, n, t, d), a;
}
function nu(e, t, n, i, r, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !i ? Jk(e, t, n, r) : t2(e, t, n, i, r, o);
}
function _m(e, t, n, i, r) {
  const o = [], a = n === "x" ? "inXRange" : "inYRange";
  let c = !1;
  return Hl(e, n, t, (u, d, p) => {
    u[a] && u[a](t[n], r) && (o.push({
      element: u,
      datasetIndex: d,
      index: p
    }), c = c || u.inRange(t.x, t.y, r));
  }), i && !c ? [] : o;
}
var e2 = {
  modes: {
    index(e, t, n, i) {
      const r = Ei(t, e), o = n.axis || "x", a = n.includeInvisible || !1, c = n.intersect ? eu(e, r, o, i, a) : nu(e, r, o, !1, i, a), u = [];
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
      const r = Ei(t, e), o = n.axis || "xy", a = n.includeInvisible || !1;
      let c = n.intersect ? eu(e, r, o, i, a) : nu(e, r, o, !1, i, a);
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
      const r = Ei(t, e), o = n.axis || "xy", a = n.includeInvisible || !1;
      return eu(e, r, o, i, a);
    },
    nearest(e, t, n, i) {
      const r = Ei(t, e), o = n.axis || "xy", a = n.includeInvisible || !1;
      return nu(e, r, o, n.intersect, i, a);
    },
    x(e, t, n, i) {
      const r = Ei(t, e);
      return _m(e, r, "x", n.intersect, i);
    },
    y(e, t, n, i) {
      const r = Ei(t, e);
      return _m(e, r, "y", n.intersect, i);
    }
  }
};
const sy = [
  "left",
  "top",
  "right",
  "bottom"
];
function wr(e, t) {
  return e.filter((n) => n.pos === t);
}
function vm(e, t) {
  return e.filter((n) => sy.indexOf(n.pos) === -1 && n.box.axis === t);
}
function br(e, t) {
  return e.sort((n, i) => {
    const r = t ? i : n, o = t ? n : i;
    return r.weight === o.weight ? r.index - o.index : r.weight - o.weight;
  });
}
function n2(e) {
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
function i2(e) {
  const t = {};
  for (const n of e) {
    const { stack: i, pos: r, stackWeight: o } = n;
    if (!i || !sy.includes(r))
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
function s2(e, t) {
  const n = i2(e), { vBoxMaxWidth: i, hBoxMaxHeight: r } = t;
  let o, a, c;
  for (o = 0, a = e.length; o < a; ++o) {
    c = e[o];
    const { fullSize: u } = c.box, d = n[c.stack], p = d && c.stackWeight / d.weight;
    c.horizontal ? (c.width = p ? p * i : u && t.availableWidth, c.height = r) : (c.width = i, c.height = p ? p * r : u && t.availableHeight);
  }
  return n;
}
function r2(e) {
  const t = n2(e), n = br(t.filter((d) => d.box.fullSize), !0), i = br(wr(t, "left"), !0), r = br(wr(t, "right")), o = br(wr(t, "top"), !0), a = br(wr(t, "bottom")), c = vm(t, "x"), u = vm(t, "y");
  return {
    fullSize: n,
    leftAndTop: i.concat(o),
    rightAndBottom: r.concat(u).concat(a).concat(c),
    chartArea: wr(t, "chartArea"),
    vertical: i.concat(r).concat(u),
    horizontal: o.concat(a).concat(c)
  };
}
function ym(e, t, n, i) {
  return Math.max(e[n], t[n]) + Math.max(e[i], t[i]);
}
function ry(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function o2(e, t, n, i) {
  const { pos: r, box: o } = n, a = e.maxPadding;
  if (!mt(r)) {
    n.size && (e[r] -= n.size);
    const g = i[n.stack] || {
      size: 0,
      count: 1
    };
    g.size = Math.max(g.size, n.horizontal ? o.height : o.width), n.size = g.size / g.count, e[r] += n.size;
  }
  o.getPadding && ry(a, o.getPadding());
  const c = Math.max(0, t.outerWidth - ym(a, e, "left", "right")), u = Math.max(0, t.outerHeight - ym(a, e, "top", "bottom")), d = c !== e.w, p = u !== e.h;
  return e.w = c, e.h = u, n.horizontal ? {
    same: d,
    other: p
  } : {
    same: p,
    other: d
  };
}
function a2(e) {
  const t = e.maxPadding;
  function n(i) {
    const r = Math.max(t[i] - e[i], 0);
    return e[i] += r, r;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function l2(e, t) {
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
function Er(e, t, n, i) {
  const r = [];
  let o, a, c, u, d, p;
  for (o = 0, a = e.length, d = 0; o < a; ++o) {
    c = e[o], u = c.box, u.update(c.width || t.w, c.height || t.h, l2(c.horizontal, t));
    const { same: g, other: v } = o2(t, n, c, i);
    d |= g && r.length, p = p || v, u.fullSize || r.push(c);
  }
  return d && Er(r, t, n, i) || p;
}
function ga(e, t, n, i, r) {
  e.top = n, e.left = t, e.right = t + i, e.bottom = n + r, e.width = i, e.height = r;
}
function xm(e, t, n, i) {
  const r = n.padding;
  let { x: o, y: a } = t;
  for (const c of e) {
    const u = c.box, d = i[c.stack] || {
      placed: 0,
      weight: 1
    }, p = c.stackWeight / d.weight || 1;
    if (c.horizontal) {
      const g = t.w * p, v = d.size || u.height;
      po(d.start) && (a = d.start), u.fullSize ? ga(u, r.left, a, n.outerWidth - r.right - r.left, v) : ga(u, t.left + d.placed, a, g, v), d.start = a, d.placed += g, a = u.bottom;
    } else {
      const g = t.h * p, v = d.size || u.width;
      po(d.start) && (o = d.start), u.fullSize ? ga(u, o, r.top, v, n.outerHeight - r.bottom - r.top) : ga(u, o, t.top + d.placed, v, g), d.start = o, d.placed += g, o = u.right;
    }
  }
  t.x = o, t.y = a;
}
var ei = {
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
    const r = rn(e.options.layout.padding), o = Math.max(t - r.width, 0), a = Math.max(n - r.height, 0), c = r2(e.boxes), u = c.vertical, d = c.horizontal;
    St(e.boxes, (w) => {
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
    ry(v, rn(i));
    const y = Object.assign({
      maxPadding: v,
      w: o,
      h: a,
      x: r.left,
      y: r.top
    }, r), S = s2(u.concat(d), g);
    Er(c.fullSize, y, g, S), Er(u, y, g, S), Er(d, y, g, S) && Er(u, y, g, S), a2(y), xm(c.leftAndTop, y, g, S), y.x += y.w, y.y += y.h, xm(c.rightAndBottom, y, g, S), e.chartArea = {
      left: y.left,
      top: y.top,
      right: y.left + y.w,
      bottom: y.top + y.h,
      height: y.h,
      width: y.w
    }, St(c.chartArea, (w) => {
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
class oy {
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
class c2 extends oy {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Da = "$chartjs", u2 = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, wm = (e) => e === null || e === "";
function h2(e, t) {
  const n = e.style, i = e.getAttribute("height"), r = e.getAttribute("width");
  if (e[Da] = {
    initial: {
      height: i,
      width: r,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", wm(r)) {
    const o = sm(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (wm(i))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = sm(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const ay = fk ? {
  passive: !0
} : !1;
function d2(e, t, n) {
  e && e.addEventListener(t, n, ay);
}
function f2(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, ay);
}
function p2(e, t) {
  const n = u2[e.type] || e.type, { x: i, y: r } = Ei(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: i !== void 0 ? i : null,
    y: r !== void 0 ? r : null
  };
}
function vl(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function m2(e, t, n) {
  const i = e.canvas, r = new MutationObserver((o) => {
    let a = !1;
    for (const c of o)
      a = a || vl(c.addedNodes, i), a = a && !vl(c.removedNodes, i);
    a && n();
  });
  return r.observe(document, {
    childList: !0,
    subtree: !0
  }), r;
}
function g2(e, t, n) {
  const i = e.canvas, r = new MutationObserver((o) => {
    let a = !1;
    for (const c of o)
      a = a || vl(c.removedNodes, i), a = a && !vl(c.addedNodes, i);
    a && n();
  });
  return r.observe(document, {
    childList: !0,
    subtree: !0
  }), r;
}
const vo = /* @__PURE__ */ new Map();
let bm = 0;
function ly() {
  const e = window.devicePixelRatio;
  e !== bm && (bm = e, vo.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function _2(e, t) {
  vo.size || window.addEventListener("resize", ly), vo.set(e, t);
}
function v2(e) {
  vo.delete(e), vo.size || window.removeEventListener("resize", ly);
}
function y2(e, t, n) {
  const i = e.canvas, r = i && Sd(i);
  if (!r)
    return;
  const o = Fv((c, u) => {
    const d = r.clientWidth;
    n(c, u), d < r.clientWidth && n();
  }, window), a = new ResizeObserver((c) => {
    const u = c[0], d = u.contentRect.width, p = u.contentRect.height;
    d === 0 && p === 0 || o(d, p);
  });
  return a.observe(r), _2(e, o), a;
}
function iu(e, t, n) {
  n && n.disconnect(), t === "resize" && v2(e);
}
function x2(e, t, n) {
  const i = e.canvas, r = Fv((o) => {
    e.ctx !== null && n(p2(o, e));
  }, e);
  return d2(i, t, r), r;
}
class w2 extends oy {
  acquireContext(t, n) {
    const i = t && t.getContext && t.getContext("2d");
    return i && i.canvas === t ? (h2(t, n), i) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[Da])
      return !1;
    const i = n[Da].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const a = i[o];
      kt(a) ? n.removeAttribute(o) : n.setAttribute(o, a);
    });
    const r = i.style || {};
    return Object.keys(r).forEach((o) => {
      n.style[o] = r[o];
    }), n.width = n.width, delete n[Da], !0;
  }
  addEventListener(t, n, i) {
    this.removeEventListener(t, n);
    const r = t.$proxies || (t.$proxies = {}), a = {
      attach: m2,
      detach: g2,
      resize: y2
    }[n] || x2;
    r[n] = a(t, n, i);
  }
  removeEventListener(t, n) {
    const i = t.$proxies || (t.$proxies = {}), r = i[n];
    if (!r)
      return;
    ({
      attach: iu,
      detach: iu,
      resize: iu
    }[n] || f2)(t, n, r), i[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, i, r) {
    return dk(t, n, i, r);
  }
  isAttached(t) {
    const n = t && Sd(t);
    return !!(n && n.isConnected);
  }
}
function b2(e) {
  return !kd() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? c2 : w2;
}
var ka;
let yi = (ka = class {
  constructor() {
    Y(this, "x");
    Y(this, "y");
    Y(this, "active", !1);
    Y(this, "options");
    Y(this, "$animations");
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
    return mo(this.x) && mo(this.y);
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
}, Y(ka, "defaults", {}), Y(ka, "defaultRoutes"), ka);
function k2(e, t) {
  const n = e.options.ticks, i = S2(e), r = Math.min(n.maxTicksLimit || i, i), o = n.major.enabled ? M2(t) : [], a = o.length, c = o[0], u = o[a - 1], d = [];
  if (a > r)
    return C2(t, d, o, a / r), d;
  const p = P2(o, t, r);
  if (a > 0) {
    let g, v;
    const y = a > 1 ? Math.round((u - c) / (a - 1)) : null;
    for (_a(t, d, p, kt(y) ? 0 : c - y, c), g = 0, v = a - 1; g < v; g++)
      _a(t, d, p, o[g], o[g + 1]);
    return _a(t, d, p, u, kt(y) ? t.length : u + y), d;
  }
  return _a(t, d, p), d;
}
function S2(e) {
  const t = e.options.offset, n = e._tickSize(), i = e._length / n + (t ? 0 : 1), r = e._maxLength / n;
  return Math.floor(Math.min(i, r));
}
function P2(e, t, n) {
  const i = L2(e), r = t.length / n;
  if (!i)
    return Math.max(r, 1);
  const o = hb(i);
  for (let a = 0, c = o.length - 1; a < c; a++) {
    const u = o[a];
    if (u > r)
      return u;
  }
  return Math.max(r, 1);
}
function M2(e) {
  const t = [];
  let n, i;
  for (n = 0, i = e.length; n < i; n++)
    e[n].major && t.push(n);
  return t;
}
function C2(e, t, n, i) {
  let r = 0, o = n[0], a;
  for (i = Math.ceil(i), a = 0; a < e.length; a++)
    a === o && (t.push(e[a]), r++, o = n[r * i]);
}
function _a(e, t, n, i, r) {
  const o = ht(i, 0), a = Math.min(ht(r, e.length), e.length);
  let c = 0, u, d, p;
  for (n = Math.ceil(n), r && (u = r - i, n = u / Math.floor(u / n)), p = o; p < 0; )
    c++, p = Math.round(o + c * n);
  for (d = Math.max(o, 0); d < a; d++)
    d === p && (t.push(e[d]), c++, p = Math.round(o + c * n));
}
function L2(e) {
  const t = e.length;
  let n, i;
  if (t < 2)
    return !1;
  for (i = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== i)
      return !1;
  return i;
}
const T2 = (e) => e === "left" ? "right" : e === "right" ? "left" : e, km = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, Sm = (e, t) => Math.min(t || e, e);
function Pm(e, t) {
  const n = [], i = e.length / t, r = e.length;
  let o = 0;
  for (; o < r; o += i)
    n.push(e[Math.floor(o)]);
  return n;
}
function N2(e, t, n) {
  const i = e.ticks.length, r = Math.min(t, i - 1), o = e._startPixel, a = e._endPixel, c = 1e-6;
  let u = e.getPixelForTick(r), d;
  if (!(n && (i === 1 ? d = Math.max(u - o, a - u) : t === 0 ? d = (e.getPixelForTick(1) - u) / 2 : d = (u - e.getPixelForTick(r - 1)) / 2, u += r < t ? d : -d, u < o - c || u > a + c)))
    return u;
}
function E2(e, t) {
  St(e, (n) => {
    const i = n.gc, r = i.length / 2;
    let o;
    if (r > t) {
      for (o = 0; o < r; ++o)
        delete n.data[i[o]];
      i.splice(0, r);
    }
  });
}
function kr(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function Mm(e, t) {
  if (!e.display)
    return 0;
  const n = Ce(e.font, t), i = rn(e.padding);
  return (Kt(e.text) ? e.text.length : 1) * n.lineHeight + i.height;
}
function z2(e, t) {
  return Xi(e, {
    scale: t,
    type: "scale"
  });
}
function j2(e, t, n) {
  return Xi(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function O2(e, t, n) {
  let i = Bv(e);
  return (n && t !== "right" || !n && t === "right") && (i = T2(i)), i;
}
function A2(e, t, n, i) {
  const { top: r, left: o, bottom: a, right: c, chart: u } = e, { chartArea: d, scales: p } = u;
  let g = 0, v, y, S;
  const w = a - r, M = c - o;
  if (e.isHorizontal()) {
    if (y = Ee(i, o, c), mt(n)) {
      const b = Object.keys(n)[0], k = n[b];
      S = p[b].getPixelForValue(k) + w - t;
    } else n === "center" ? S = (d.bottom + d.top) / 2 + w - t : S = km(e, n, t);
    v = c - o;
  } else {
    if (mt(n)) {
      const b = Object.keys(n)[0], k = n[b];
      y = p[b].getPixelForValue(k) - M + t;
    } else n === "center" ? y = (d.left + d.right) / 2 - M + t : y = km(e, n, t);
    S = Ee(i, a, r), g = n === "left" ? -Gt : Gt;
  }
  return {
    titleX: y,
    titleY: S,
    maxWidth: v,
    rotation: g
  };
}
class Zs extends yi {
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
      minDefined: me(t),
      maxDefined: me(n)
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
    Nt(this.options.beforeUpdate, [
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
    }, i), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + i.left + i.right : this.height + i.top + i.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Zb(this, o, r), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const u = c < this.ticks.length;
    this._convertTicksToLabels(u ? Pm(this.ticks, c) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), a.display && (a.autoSkip || a.source === "auto") && (this.ticks = k2(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), u && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, i;
    this.isHorizontal() ? (n = this.left, i = this.right) : (n = this.top, i = this.bottom, t = !t), this._startPixel = n, this._endPixel = i, this._reversePixels = t, this._length = i - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Nt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Nt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Nt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Nt(this.options[t], [
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
    Nt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let i, r, o;
    for (i = 0, r = t.length; i < r; i++)
      o = t[i], o.label = Nt(n.callback, [
        o.value,
        i,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Nt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Nt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, i = Sm(this.ticks.length, t.ticks.maxTicksLimit), r = n.minRotation || 0, o = n.maxRotation;
    let a = r, c, u, d;
    if (!this._isVisible() || !n.display || r >= o || i <= 1 || !this.isHorizontal()) {
      this.labelRotation = r;
      return;
    }
    const p = this._getLabelSizes(), g = p.widest.width, v = p.highest.height, y = fe(this.chart.width - g, 0, this.maxWidth);
    c = t.offset ? this.maxWidth / i : y / (i - 1), g + 6 > c && (c = y / (i - (t.offset ? 0.5 : 1)), u = this.maxHeight - kr(t.grid) - n.padding - Mm(t.title, this.chart.options.font), d = Math.sqrt(g * g + v * v), a = mb(Math.min(Math.asin(fe((p.highest.height + 6) / c, -1, 1)), Math.asin(fe(u / d, -1, 1)) - Math.asin(fe(v / d, -1, 1)))), a = Math.max(r, Math.min(o, a))), this.labelRotation = a;
  }
  afterCalculateLabelRotation() {
    Nt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Nt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: i, title: r, grid: o } } = this, a = this._isVisible(), c = this.isHorizontal();
    if (a) {
      const u = Mm(r, n.options.font);
      if (c ? (t.width = this.maxWidth, t.height = kr(o) + u) : (t.height = this.maxHeight, t.width = kr(o) + u), i.display && this.ticks.length) {
        const { first: d, last: p, widest: g, highest: v } = this._getLabelSizes(), y = i.padding * 2, S = On(this.labelRotation), w = Math.cos(S), M = Math.sin(S);
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
    Nt(this.options.afterFit, [
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
      kt(t[n].label) && (t.splice(n, 1), i--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let i = this.ticks;
      n < i.length && (i = Pm(i, n)), this._labelSizes = t = this._computeLabelSizes(i, i.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, i) {
    const { ctx: r, _longestTextCache: o } = this, a = [], c = [], u = Math.floor(n / Sm(n, i));
    let d = 0, p = 0, g, v, y, S, w, M, b, k, P, T, N;
    for (g = 0; g < n; g += u) {
      if (S = t[g].label, w = this._resolveTickFontOptions(g), r.font = M = w.string, b = o[M] = o[M] || {
        data: {},
        gc: []
      }, k = w.lineHeight, P = T = 0, !kt(S) && !Kt(S))
        P = Jp(r, b.data, b.gc, P, S), T = k;
      else if (Kt(S))
        for (v = 0, y = S.length; v < y; ++v)
          N = S[v], !kt(N) && !Kt(N) && (P = Jp(r, b.data, b.gc, P, N), T += k);
      a.push(P), c.push(T), d = Math.max(P, d), p = Math.max(T, p);
    }
    E2(o, n);
    const A = a.indexOf(d), j = c.indexOf(p), O = (H) => ({
      width: a[H] || 0,
      height: c[H] || 0
    });
    return {
      first: O(0),
      last: O(n - 1),
      widest: O(A),
      highest: O(j),
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
    return _b(this._alignToPixels ? Ci(this.chart, n, 0) : n);
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
      return i.$context || (i.$context = j2(this.getContext(), t, i));
    }
    return this.$context || (this.$context = z2(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = On(this.labelRotation), i = Math.abs(Math.cos(n)), r = Math.abs(Math.sin(n)), o = this._getLabelSizes(), a = t.autoSkipPadding || 0, c = o ? o.widest.width + a : 0, u = o ? o.highest.height + a : 0;
    return this.isHorizontal() ? u * i > c * r ? c / i : u / r : u * r < c * i ? u / i : c / r;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, i = this.chart, r = this.options, { grid: o, position: a, border: c } = r, u = o.offset, d = this.isHorizontal(), g = this.ticks.length + (u ? 1 : 0), v = kr(o), y = [], S = c.setContext(this.getContext()), w = S.display ? S.width : 0, M = w / 2, b = function(et) {
      return Ci(i, et, w);
    };
    let k, P, T, N, A, j, O, H, R, V, q, xt;
    if (a === "top")
      k = b(this.bottom), j = this.bottom - v, H = k - M, V = b(t.top) + M, xt = t.bottom;
    else if (a === "bottom")
      k = b(this.top), V = t.top, xt = b(t.bottom) - M, j = k + M, H = this.top + v;
    else if (a === "left")
      k = b(this.right), A = this.right - v, O = k - M, R = b(t.left) + M, q = t.right;
    else if (a === "right")
      k = b(this.left), R = t.left, q = b(t.right) - M, A = k + M, O = this.left + v;
    else if (n === "x") {
      if (a === "center")
        k = b((t.top + t.bottom) / 2 + 0.5);
      else if (mt(a)) {
        const et = Object.keys(a)[0], st = a[et];
        k = b(this.chart.scales[et].getPixelForValue(st));
      }
      V = t.top, xt = t.bottom, j = k + M, H = j + v;
    } else if (n === "y") {
      if (a === "center")
        k = b((t.left + t.right) / 2);
      else if (mt(a)) {
        const et = Object.keys(a)[0], st = a[et];
        k = b(this.chart.scales[et].getPixelForValue(st));
      }
      A = k - M, O = A - v, R = t.left, q = t.right;
    }
    const K = ht(r.ticks.maxTicksLimit, g), ct = Math.max(1, Math.ceil(g / K));
    for (P = 0; P < g; P += ct) {
      const et = this.getContext(P), st = o.setContext(et), I = c.setContext(et), Z = st.lineWidth, F = st.color, G = I.dash || [], rt = I.dashOffset, _t = st.tickWidth, dt = st.tickColor, lt = st.tickBorderDash || [], J = st.tickBorderDashOffset;
      T = N2(this, P, u), T !== void 0 && (N = Ci(i, T, Z), d ? A = O = R = q = N : j = H = V = xt = N, y.push({
        tx1: A,
        ty1: j,
        tx2: O,
        ty2: H,
        x1: R,
        y1: V,
        x2: q,
        y2: xt,
        width: Z,
        color: F,
        borderDash: G,
        borderDashOffset: rt,
        tickWidth: _t,
        tickColor: dt,
        tickBorderDash: lt,
        tickBorderDashOffset: J
      }));
    }
    return this._ticksLength = g, this._borderValue = k, y;
  }
  _computeLabelItems(t) {
    const n = this.axis, i = this.options, { position: r, ticks: o } = i, a = this.isHorizontal(), c = this.ticks, { align: u, crossAlign: d, padding: p, mirror: g } = o, v = kr(i.grid), y = v + p, S = g ? -p : y, w = -On(this.labelRotation), M = [];
    let b, k, P, T, N, A, j, O, H, R, V, q, xt = "middle";
    if (r === "top")
      A = this.bottom - S, j = this._getXAxisLabelAlignment();
    else if (r === "bottom")
      A = this.top + S, j = this._getXAxisLabelAlignment();
    else if (r === "left") {
      const ct = this._getYAxisLabelAlignment(v);
      j = ct.textAlign, N = ct.x;
    } else if (r === "right") {
      const ct = this._getYAxisLabelAlignment(v);
      j = ct.textAlign, N = ct.x;
    } else if (n === "x") {
      if (r === "center")
        A = (t.top + t.bottom) / 2 + y;
      else if (mt(r)) {
        const ct = Object.keys(r)[0], et = r[ct];
        A = this.chart.scales[ct].getPixelForValue(et) + y;
      }
      j = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (r === "center")
        N = (t.left + t.right) / 2 - y;
      else if (mt(r)) {
        const ct = Object.keys(r)[0], et = r[ct];
        N = this.chart.scales[ct].getPixelForValue(et);
      }
      j = this._getYAxisLabelAlignment(v).textAlign;
    }
    n === "y" && (u === "start" ? xt = "top" : u === "end" && (xt = "bottom"));
    const K = this._getLabelSizes();
    for (b = 0, k = c.length; b < k; ++b) {
      P = c[b], T = P.label;
      const ct = o.setContext(this.getContext(b));
      O = this.getPixelForTick(b) + o.labelOffset, H = this._resolveTickFontOptions(b), R = H.lineHeight, V = Kt(T) ? T.length : 1;
      const et = V / 2, st = ct.color, I = ct.textStrokeColor, Z = ct.textStrokeWidth;
      let F = j;
      a ? (N = O, j === "inner" && (b === k - 1 ? F = this.options.reverse ? "left" : "right" : b === 0 ? F = this.options.reverse ? "right" : "left" : F = "center"), r === "top" ? d === "near" || w !== 0 ? q = -V * R + R / 2 : d === "center" ? q = -K.highest.height / 2 - et * R + R : q = -K.highest.height + R / 2 : d === "near" || w !== 0 ? q = R / 2 : d === "center" ? q = K.highest.height / 2 - et * R : q = K.highest.height - V * R, g && (q *= -1), w !== 0 && !ct.showLabelBackdrop && (N += R / 2 * Math.sin(w))) : (A = O, q = (1 - V) * R / 2);
      let G;
      if (ct.showLabelBackdrop) {
        const rt = rn(ct.backdropPadding), _t = K.heights[b], dt = K.widths[b];
        let lt = q - rt.top, J = 0 - rt.left;
        switch (xt) {
          case "middle":
            lt -= _t / 2;
            break;
          case "bottom":
            lt -= _t;
            break;
        }
        switch (j) {
          case "center":
            J -= dt / 2;
            break;
          case "right":
            J -= dt;
            break;
          case "inner":
            b === k - 1 ? J -= dt : b > 0 && (J -= dt / 2);
            break;
        }
        G = {
          left: J,
          top: lt,
          width: dt + rt.width,
          height: _t + rt.height,
          color: ct.backdropColor
        };
      }
      M.push({
        label: T,
        font: H,
        textOffset: q,
        options: {
          rotation: w,
          color: st,
          strokeColor: I,
          strokeWidth: Z,
          textAlign: F,
          textBaseline: xt,
          translation: [
            N,
            A
          ],
          backdrop: G
        }
      });
    }
    return M;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-On(this.labelRotation))
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
    this.isHorizontal() ? (d = Ci(t, this.left, a) - a / 2, p = Ci(t, this.right, c) + c / 2, g = v = u) : (g = Ci(t, this.top, a) - a / 2, v = Ci(t, this.bottom, c) + c / 2, d = p = u), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(d, g), n.lineTo(p, v), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const i = this.ctx, r = this._computeLabelArea();
    r && Dl(i, r);
    const o = this.getLabelItems(t);
    for (const a of o) {
      const c = a.options, u = a.font, d = a.label, p = a.textOffset;
      ml(i, d, 0, p, u, c);
    }
    r && Fl(i);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: i, reverse: r } } = this;
    if (!i.display)
      return;
    const o = Ce(i.font), a = rn(i.padding), c = i.align;
    let u = o.lineHeight / 2;
    n === "bottom" || n === "center" || mt(n) ? (u += a.bottom, Kt(i.text) && (u += o.lineHeight * (i.text.length - 1))) : u += a.top;
    const { titleX: d, titleY: p, maxWidth: g, rotation: v } = A2(this, u, n, c);
    ml(t, i.text, 0, 0, o, {
      color: i.color,
      maxWidth: g,
      rotation: v,
      textAlign: O2(c, n, r),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, i = ht(t.grid && t.grid.z, -1), r = ht(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Zs.prototype.draw ? [
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
    return Ce(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class va {
  constructor(t, n, i) {
    this.type = t, this.scope = n, this.override = i, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let i;
    D2(n) && (i = this.register(n));
    const r = this.items, o = t.id, a = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in r || (r[o] = t, I2(t, a, i), this.override && Vt.override(t.id, t.overrides)), a;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, i = t.id, r = this.scope;
    i in n && delete n[i], r && i in Vt[r] && (delete Vt[r][i], this.override && delete Yi[i]);
  }
}
function I2(e, t, n) {
  const i = fo(/* @__PURE__ */ Object.create(null), [
    n ? Vt.get(n) : {},
    Vt.get(t),
    e.defaults
  ]);
  Vt.set(t, i), e.defaultRoutes && R2(t, e.defaultRoutes), e.descriptors && Vt.describe(t, e.descriptors);
}
function R2(e, t) {
  Object.keys(t).forEach((n) => {
    const i = n.split("."), r = i.pop(), o = [
      e
    ].concat(i).join("."), a = t[n].split("."), c = a.pop(), u = a.join(".");
    Vt.route(o, r, u, c);
  });
}
function D2(e) {
  return "id" in e && "defaults" in e;
}
class F2 {
  constructor() {
    this.controllers = new va(Bi, "datasets", !0), this.elements = new va(yi, "elements"), this.plugins = new va(Object, "plugins"), this.scales = new va(Zs, "scales"), this._typedRegistries = [
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
      i || o.isForType(r) || o === this.plugins && r.id ? this._exec(t, o, r) : St(r, (a) => {
        const c = i || this._getRegistryForType(a);
        this._exec(t, c, a);
      });
    });
  }
  _exec(t, n, i) {
    const r = md(t);
    Nt(i["before" + r], [], i), n[t](i), Nt(i["after" + r], [], i);
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
var pn = /* @__PURE__ */ new F2();
class B2 {
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
      if (Nt(c, u, a) === !1 && r.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    kt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const i = t && t.config, r = ht(i.options && i.options.plugins, {}), o = H2(i);
    return r === !1 && !n ? [] : V2(t, o, r, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], i = this._cache, r = (o, a) => o.filter((c) => !a.some((u) => c.plugin.id === u.plugin.id));
    this._notify(r(n, i), t, "stop"), this._notify(r(i, n), t, "start");
  }
}
function H2(e) {
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
function W2(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function V2(e, { plugins: t, localIds: n }, i, r) {
  const o = [], a = e.getContext();
  for (const c of t) {
    const u = c.id, d = W2(i[u], r);
    d !== null && o.push({
      plugin: c,
      options: Z2(e.config, {
        plugin: c,
        local: n[u]
      }, d, a)
    });
  }
  return o;
}
function Z2(e, { plugin: t, local: n }, i, r) {
  const o = e.pluginScopeKeys(t), a = e.getOptionScopes(i, o);
  return n && t.defaults && a.push(t.defaults), e.createResolver(a, r, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function ah(e, t) {
  const n = Vt.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function U2(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function $2(e, t) {
  return e === t ? "_index_" : "_value_";
}
function Cm(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function Y2(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function lh(e, ...t) {
  if (Cm(e))
    return e;
  for (const n of t) {
    const i = n.axis || Y2(n.position) || e.length > 1 && Cm(e[0].toLowerCase());
    if (i)
      return i;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function Lm(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function q2(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((i) => i.xAxisID === e || i.yAxisID === e);
    if (n.length)
      return Lm(e, "x", n[0]) || Lm(e, "y", n[0]);
  }
  return {};
}
function K2(e, t) {
  const n = Yi[e.type] || {
    scales: {}
  }, i = t.scales || {}, r = ah(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(i).forEach((a) => {
    const c = i[a];
    if (!mt(c))
      return console.error(`Invalid scale configuration for scale: ${a}`);
    if (c._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${a}`);
    const u = lh(a, c, q2(a, e), Vt.scales[c.type]), d = $2(u, r), p = n.scales || {};
    o[a] = Vr(/* @__PURE__ */ Object.create(null), [
      {
        axis: u
      },
      c,
      p[u],
      p[d]
    ]);
  }), e.data.datasets.forEach((a) => {
    const c = a.type || e.type, u = a.indexAxis || ah(c, t), p = (Yi[c] || {}).scales || {};
    Object.keys(p).forEach((g) => {
      const v = U2(g, u), y = a[v + "AxisID"] || v;
      o[y] = o[y] || /* @__PURE__ */ Object.create(null), Vr(o[y], [
        {
          axis: v
        },
        i[y],
        p[g]
      ]);
    });
  }), Object.keys(o).forEach((a) => {
    const c = o[a];
    Vr(c, [
      Vt.scales[c.type],
      Vt.scale
    ]);
  }), o;
}
function cy(e) {
  const t = e.options || (e.options = {});
  t.plugins = ht(t.plugins, {}), t.scales = K2(e, t);
}
function uy(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function X2(e) {
  return e = e || {}, e.data = uy(e.data), cy(e), e;
}
const Tm = /* @__PURE__ */ new Map(), hy = /* @__PURE__ */ new Set();
function ya(e, t) {
  let n = Tm.get(e);
  return n || (n = t(), Tm.set(e, n), hy.add(n)), n;
}
const Sr = (e, t, n) => {
  const i = $i(t, n);
  i !== void 0 && e.add(i);
};
class G2 {
  constructor(t) {
    this._config = X2(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = uy(t);
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
    this.clearCache(), cy(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return ya(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return ya(`${t}.transition.${n}`, () => [
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
    return ya(`${t}-${n}`, () => [
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
    return ya(`${i}-plugin-${n}`, () => [
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
      t && (u.add(t), p.forEach((g) => Sr(u, t, g))), p.forEach((g) => Sr(u, r, g)), p.forEach((g) => Sr(u, Yi[o] || {}, g)), p.forEach((g) => Sr(u, Vt, g)), p.forEach((g) => Sr(u, rh, g));
    });
    const d = Array.from(u);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), hy.has(n) && a.set(n, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      Yi[n] || {},
      Vt.datasets[n] || {},
      {
        type: n
      },
      Vt,
      rh
    ];
  }
  resolveNamedOptions(t, n, i, r = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: a, subPrefixes: c } = Nm(this._resolverCache, t, r);
    let u = a;
    if (J2(a, n)) {
      o.$shared = !1, i = mi(i) ? i() : i;
      const d = this.createResolver(t, i, c);
      u = Fs(a, i, d);
    }
    for (const d of n)
      o[d] = u[d];
    return o;
  }
  createResolver(t, n, i = [
    ""
  ], r) {
    const { resolver: o } = Nm(this._resolverCache, t, i);
    return mt(n) ? Fs(o, n, void 0, r) : o;
  }
}
function Nm(e, t, n) {
  let i = e.get(t);
  i || (i = /* @__PURE__ */ new Map(), e.set(t, i));
  const r = n.join();
  let o = i.get(r);
  return o || (o = {
    resolver: xd(t, n),
    subPrefixes: n.filter((c) => !c.toLowerCase().includes("hover"))
  }, i.set(r, o)), o;
}
const Q2 = (e) => mt(e) && Object.getOwnPropertyNames(e).some((t) => mi(e[t]));
function J2(e, t) {
  const { isScriptable: n, isIndexable: i } = Zv(e);
  for (const r of t) {
    const o = n(r), a = i(r), c = (a || o) && e[r];
    if (o && (mi(c) || Q2(c)) || a && Kt(c))
      return !0;
  }
  return !1;
}
var tS = "4.5.1";
const eS = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function Em(e, t) {
  return e === "top" || e === "bottom" || eS.indexOf(e) === -1 && t === "x";
}
function zm(e, t) {
  return function(n, i) {
    return n[e] === i[e] ? n[t] - i[t] : n[e] - i[e];
  };
}
function jm(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Nt(n && n.onComplete, [
    e
  ], t);
}
function nS(e) {
  const t = e.chart, n = t.options.animation;
  Nt(n && n.onProgress, [
    e
  ], t);
}
function dy(e) {
  return kd() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Fa = {}, Om = (e) => {
  const t = dy(e);
  return Object.values(Fa).filter((n) => n.canvas === t).pop();
};
function iS(e, t, n) {
  const i = Object.keys(e);
  for (const r of i) {
    const o = +r;
    if (o >= t) {
      const a = e[r];
      delete e[r], (n > 0 || o > t) && (e[o + n] = a);
    }
  }
}
function sS(e, t, n, i) {
  return !n || e.type === "mouseout" ? null : i ? t : e;
}
var $n;
let Wl = ($n = class {
  static register(...t) {
    pn.add(...t), Am();
  }
  static unregister(...t) {
    pn.remove(...t), Am();
  }
  constructor(t, n) {
    const i = this.config = new G2(n), r = dy(t), o = Om(r);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const a = i.createResolver(i.chartOptionScopes(), this.getContext());
    this.platform = new (i.platform || b2(r))(), this.platform.updateConfig(i);
    const c = this.platform.acquireContext(r, a.aspectRatio), u = c && c.canvas, d = u && u.height, p = u && u.width;
    if (this.id = nb(), this.ctx = c, this.canvas = u, this.width = p, this.height = d, this._options = a, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new B2(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = wb((g) => this.update(g), a.resizeDelay || 0), this._dataChanges = [], Fa[this.id] = this, !c || !u) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    Cn.listen(this, "complete", jm), Cn.listen(this, "progress", nS), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: i, height: r, _aspectRatio: o } = this;
    return kt(t) ? n && o ? o : r ? i / r : null : t;
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
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : im(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return tm(this.canvas, this.ctx), this;
  }
  stop() {
    return Cn.stop(this), this;
  }
  resize(t, n) {
    Cn.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const i = this.options, r = this.canvas, o = i.maintainAspectRatio && this.aspectRatio, a = this.platform.getMaximumSize(r, t, n, o), c = i.devicePixelRatio || this.platform.getDevicePixelRatio(), u = this.width ? "resize" : "attach";
    this.width = a.width, this.height = a.height, this._aspectRatio = this.aspectRatio, im(this, c, !0) && (this.notifyPlugins("resize", {
      size: a
    }), Nt(i.onResize, [
      this,
      a
    ], this), this.attached && this._doResize(u) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    St(n, (i, r) => {
      i.id = r;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, i = this.scales, r = Object.keys(i).reduce((a, c) => (a[c] = !1, a), {});
    let o = [];
    n && (o = o.concat(Object.keys(n).map((a) => {
      const c = n[a], u = lh(a, c), d = u === "r", p = u === "x";
      return {
        options: c,
        dposition: d ? "chartArea" : p ? "bottom" : "left",
        dtype: d ? "radialLinear" : p ? "category" : "linear"
      };
    }))), St(o, (a) => {
      const c = a.options, u = c.id, d = lh(u, c), p = ht(c.type, a.dtype);
      (c.position === void 0 || Em(c.position, d) !== Em(a.dposition)) && (c.position = a.dposition), r[u] = !0;
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
    }), St(r, (a, c) => {
      a || delete i[c];
    }), St(i, (a) => {
      ei.configure(this, a, a.options), ei.addBox(this, a);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, i = t.length;
    if (t.sort((r, o) => r.index - o.index), i > n) {
      for (let r = n; r < i; ++r)
        this._destroyDatasetMeta(r);
      t.splice(n, i - n);
    }
    this._sortedMetasets = t.slice(0).sort(zm("order", "index"));
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
      if (a.type && a.type !== c && (this._destroyDatasetMeta(i), a = this.getDatasetMeta(i)), a.type = c, a.indexAxis = o.indexAxis || ah(c, this.options), a.order = o.order || 0, a.index = i, a.label = "" + o.label, a.visible = this.isDatasetVisible(i), a.controller)
        a.controller.updateIndex(i), a.controller.linkScales();
      else {
        const u = pn.getController(c), { datasetElementType: d, dataElementType: p } = Vt.datasets[c];
        Object.assign(u, {
          dataElementType: pn.getElement(p),
          datasetElementType: d && pn.getElement(d)
        }), a.controller = new u(this, i), t.push(a.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    St(this.data.datasets, (t, n) => {
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
    a = this._minPadding = i.layout.autoPadding ? a : 0, this._updateLayout(a), r || St(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(zm("z", "_idx"));
    const { _active: c, _lastEvent: u } = this;
    u ? this._eventHandler(u, !0) : c.length && this._updateHoverStyles(c, c, !0), this.render();
  }
  _updateScales() {
    St(this.scales, (t) => {
      ei.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), i = new Set(t.events);
    (!Zp(n, i) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: i, start: r, count: o } of n) {
      const a = i === "_removeElements" ? -o : o;
      iS(t, r, a);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, i = (o) => new Set(t.filter((a) => a[0] === o).map((a, c) => c + "," + a.splice(1).join(","))), r = i(0);
    for (let o = 1; o < n; o++)
      if (!Zp(r, i(o)))
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
    ei.update(this, this.width, this.height, t);
    const n = this.chartArea, i = n.width <= 0 || n.height <= 0;
    this._layers = [], St(this.boxes, (r) => {
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
        this._updateDataset(n, mi(t) ? t({
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
    }) !== !1 && (Cn.has(this) ? this.attached && !Cn.running(this) && Cn.start(this) : (this.draw(), jm({
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
    }, r = ty(this, t);
    this.notifyPlugins("beforeDatasetDraw", i) !== !1 && (r && Dl(n, r), t.controller.draw(), r && Fl(n), i.cancelable = !1, this.notifyPlugins("afterDatasetDraw", i));
  }
  isPointInArea(t) {
    return _o(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, i, r) {
    const o = e2.modes[n];
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
    return this.$context || (this.$context = Xi(null, {
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
    po(n) ? (o.data[n].hidden = !i, this.update()) : (this.setDatasetVisibility(t, i), a.update(o, {
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
    for (this.stop(), Cn.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), tm(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete Fa[this.id], this.notifyPlugins("afterDestroy");
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
    St(this.options.events, (o) => i(o, r));
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
    St(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, St(this._responsiveListeners, (t, n) => {
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
    !dl(i, n) && (this._active = i, this._lastEvent = null, this._updateHoverStyles(i, n));
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
    const { _active: r = [], options: o } = this, a = n, c = this._getActiveElements(t, r, i, a), u = lb(t), d = sS(t, this._lastEvent, i, u);
    i && (this._lastEvent = null, Nt(o.onHover, [
      t,
      c,
      this
    ], this), u && Nt(o.onClick, [
      t,
      c,
      this
    ], this));
    const p = !dl(c, r);
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
}, Y($n, "defaults", Vt), Y($n, "instances", Fa), Y($n, "overrides", Yi), Y($n, "registry", pn), Y($n, "version", tS), Y($n, "getChart", Om), $n);
function Am() {
  return St(Wl.instances, (e) => e._plugins.invalidate());
}
function rS(e, t, n) {
  const { startAngle: i, x: r, y: o, outerRadius: a, innerRadius: c, options: u } = t, { borderWidth: d, borderJoinStyle: p } = u, g = Math.min(d / a, je(i - n));
  if (e.beginPath(), e.arc(r, o, a - d / 2, i + g / 2, n - g / 2), c > 0) {
    const v = Math.min(d / c, je(i - n));
    e.arc(r, o, c + d / 2, n - v / 2, i + v / 2, !0);
  } else {
    const v = Math.min(d / 2, a * je(i - n));
    if (p === "round")
      e.arc(r, o, v, n - Mt / 2, i + Mt / 2, !0);
    else if (p === "bevel") {
      const y = 2 * v * v, S = -y * Math.cos(n + Mt / 2) + r, w = -y * Math.sin(n + Mt / 2) + o, M = y * Math.cos(i + Mt / 2) + r, b = y * Math.sin(i + Mt / 2) + o;
      e.lineTo(S, w), e.lineTo(M, b);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function oS(e, t, n) {
  const { startAngle: i, pixelMargin: r, x: o, y: a, outerRadius: c, innerRadius: u } = t;
  let d = r / c;
  e.beginPath(), e.arc(o, a, c, i - d, n + d), u > r ? (d = r / u, e.arc(o, a, u, n + d, i - d, !0)) : e.arc(o, a, r, n + Gt, i - Gt), e.closePath(), e.clip();
}
function aS(e) {
  return yd(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function lS(e, t, n, i) {
  const r = aS(e.options.borderRadius), o = (n - t) / 2, a = Math.min(o, i * t / 2), c = (u) => {
    const d = (n - Math.min(o, u)) * i / 2;
    return fe(u, 0, Math.min(o, d));
  };
  return {
    outerStart: c(r.outerStart),
    outerEnd: c(r.outerEnd),
    innerStart: fe(r.innerStart, 0, a),
    innerEnd: fe(r.innerEnd, 0, a)
  };
}
function cs(e, t, n, i) {
  return {
    x: n + e * Math.cos(t),
    y: i + e * Math.sin(t)
  };
}
function yl(e, t, n, i, r, o) {
  const { x: a, y: c, startAngle: u, pixelMargin: d, innerRadius: p } = t, g = Math.max(t.outerRadius + i + n - d, 0), v = p > 0 ? p + i + n + d : 0;
  let y = 0;
  const S = r - u;
  if (i) {
    const ct = p > 0 ? p - i : 0, et = g > 0 ? g - i : 0, st = (ct + et) / 2, I = st !== 0 ? S * st / (st + i) : S;
    y = (S - I) / 2;
  }
  const w = Math.max(1e-3, S * g - n / Mt) / g, M = (S - w) / 2, b = u + M + y, k = r - M - y, { outerStart: P, outerEnd: T, innerStart: N, innerEnd: A } = lS(t, v, g, k - b), j = g - P, O = g - T, H = b + P / j, R = k - T / O, V = v + N, q = v + A, xt = b + N / V, K = k - A / q;
  if (e.beginPath(), o) {
    const ct = (H + R) / 2;
    if (e.arc(a, c, g, H, ct), e.arc(a, c, g, ct, R), T > 0) {
      const Z = cs(O, R, a, c);
      e.arc(Z.x, Z.y, T, R, k + Gt);
    }
    const et = cs(q, k, a, c);
    if (e.lineTo(et.x, et.y), A > 0) {
      const Z = cs(q, K, a, c);
      e.arc(Z.x, Z.y, A, k + Gt, K + Math.PI);
    }
    const st = (k - A / v + (b + N / v)) / 2;
    if (e.arc(a, c, v, k - A / v, st, !0), e.arc(a, c, v, st, b + N / v, !0), N > 0) {
      const Z = cs(V, xt, a, c);
      e.arc(Z.x, Z.y, N, xt + Math.PI, b - Gt);
    }
    const I = cs(j, b, a, c);
    if (e.lineTo(I.x, I.y), P > 0) {
      const Z = cs(j, H, a, c);
      e.arc(Z.x, Z.y, P, b - Gt, H);
    }
  } else {
    e.moveTo(a, c);
    const ct = Math.cos(H) * g + a, et = Math.sin(H) * g + c;
    e.lineTo(ct, et);
    const st = Math.cos(R) * g + a, I = Math.sin(R) * g + c;
    e.lineTo(st, I);
  }
  e.closePath();
}
function cS(e, t, n, i, r) {
  const { fullCircles: o, startAngle: a, circumference: c } = t;
  let u = t.endAngle;
  if (o) {
    yl(e, t, n, i, u, r);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(c) || (u = a + (c % At || At));
  }
  return yl(e, t, n, i, u, r), e.fill(), u;
}
function uS(e, t, n, i, r) {
  const { fullCircles: o, startAngle: a, circumference: c, options: u } = t, { borderWidth: d, borderJoinStyle: p, borderDash: g, borderDashOffset: v, borderRadius: y } = u, S = u.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(g || []), e.lineDashOffset = v, S ? (e.lineWidth = d * 2, e.lineJoin = p || "round") : (e.lineWidth = d, e.lineJoin = p || "bevel");
  let w = t.endAngle;
  if (o) {
    yl(e, t, n, i, w, r);
    for (let M = 0; M < o; ++M)
      e.stroke();
    isNaN(c) || (w = a + (c % At || At));
  }
  S && oS(e, t, w), u.selfJoin && w - a >= Mt && y === 0 && p !== "miter" && rS(e, t, w), o || (yl(e, t, n, i, w, r), e.stroke());
}
class zr extends yi {
  constructor(n) {
    super();
    Y(this, "circumference");
    Y(this, "endAngle");
    Y(this, "fullCircles");
    Y(this, "innerRadius");
    Y(this, "outerRadius");
    Y(this, "pixelMargin");
    Y(this, "startAngle");
    this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, n && Object.assign(this, n);
  }
  inRange(n, i, r) {
    const o = this.getProps([
      "x",
      "y"
    ], r), { angle: a, distance: c } = Av(o, {
      x: n,
      y: i
    }), { startAngle: u, endAngle: d, innerRadius: p, outerRadius: g, circumference: v } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], r), y = (this.options.spacing + this.options.borderWidth) / 2, S = ht(v, d - u), w = go(a, u, d) && u !== d, M = S >= At || w, b = An(c, p + y, g + y);
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
    if (this.pixelMargin = i.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = r > At ? Math.floor(r / At) : 0, r === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    n.save();
    const u = (this.startAngle + this.endAngle) / 2;
    n.translate(Math.cos(u) * o, Math.sin(u) * o);
    const d = 1 - Math.sin(Math.min(Mt, r || 0)), p = o * d;
    n.fillStyle = i.backgroundColor, n.strokeStyle = i.borderColor, cS(n, this, p, a, c), uS(n, this, p, a, c), n.restore();
  }
}
Y(zr, "id", "arc"), Y(zr, "defaults", {
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
}), Y(zr, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), Y(zr, "descriptors", {
  _scriptable: !0,
  _indexable: (n) => n !== "borderDash"
});
function fy(e, t, n = t) {
  e.lineCap = ht(n.borderCapStyle, t.borderCapStyle), e.setLineDash(ht(n.borderDash, t.borderDash)), e.lineDashOffset = ht(n.borderDashOffset, t.borderDashOffset), e.lineJoin = ht(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = ht(n.borderWidth, t.borderWidth), e.strokeStyle = ht(n.borderColor, t.borderColor);
}
function hS(e, t, n) {
  e.lineTo(n.x, n.y);
}
function dS(e) {
  return e.stepped ? Ab : e.tension || e.cubicInterpolationMode === "monotone" ? Ib : hS;
}
function py(e, t, n = {}) {
  const i = e.length, { start: r = 0, end: o = i - 1 } = n, { start: a, end: c } = t, u = Math.max(r, a), d = Math.min(o, c), p = r < a && o < a || r > c && o > c;
  return {
    count: i,
    start: u,
    loop: t.loop,
    ilen: d < u && !p ? i + d - u : d - u
  };
}
function fS(e, t, n, i) {
  const { points: r, options: o } = t, { count: a, start: c, loop: u, ilen: d } = py(r, n, i), p = dS(o);
  let { move: g = !0, reverse: v } = i || {}, y, S, w;
  for (y = 0; y <= d; ++y)
    S = r[(c + (v ? d - y : y)) % a], !S.skip && (g ? (e.moveTo(S.x, S.y), g = !1) : p(e, w, S, v, o.stepped), w = S);
  return u && (S = r[(c + (v ? d : 0)) % a], p(e, w, S, v, o.stepped)), !!u;
}
function pS(e, t, n, i) {
  const r = t.points, { count: o, start: a, ilen: c } = py(r, n, i), { move: u = !0, reverse: d } = i || {};
  let p = 0, g = 0, v, y, S, w, M, b;
  const k = (T) => (a + (d ? c - T : T)) % o, P = () => {
    w !== M && (e.lineTo(p, M), e.lineTo(p, w), e.lineTo(p, b));
  };
  for (u && (y = r[k(0)], e.moveTo(y.x, y.y)), v = 0; v <= c; ++v) {
    if (y = r[k(v)], y.skip)
      continue;
    const T = y.x, N = y.y, A = T | 0;
    A === S ? (N < w ? w = N : N > M && (M = N), p = (g * p + T) / ++g) : (P(), e.lineTo(T, N), S = A, g = 0, w = M = N), b = N;
  }
  P();
}
function ch(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? pS : fS;
}
function mS(e) {
  return e.stepped ? pk : e.tension || e.cubicInterpolationMode === "monotone" ? mk : zi;
}
function gS(e, t, n, i) {
  let r = t._path;
  r || (r = t._path = new Path2D(), t.path(r, n, i) && r.closePath()), fy(e, t.options), e.stroke(r);
}
function _S(e, t, n, i) {
  const { segments: r, options: o } = t, a = ch(t);
  for (const c of r)
    fy(e, o, c.style), e.beginPath(), a(e, t, c, {
      start: n,
      end: n + i - 1
    }) && e.closePath(), e.stroke();
}
const vS = typeof Path2D == "function";
function yS(e, t, n, i) {
  vS && !t.options.segment ? gS(e, t, n, i) : _S(e, t, n, i);
}
class ni extends yi {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, n) {
    const i = this.options;
    if ((i.tension || i.cubicInterpolationMode === "monotone") && !i.stepped && !this._pointsUpdated) {
      const r = i.spanGaps ? this._loop : this._fullLoop;
      ok(this._points, i, t, r, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = wk(this, this.options.segment));
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
    const i = this.options, r = t[n], o = this.points, a = Jv(this, {
      property: n,
      start: r,
      end: r
    });
    if (!a.length)
      return;
    const c = [], u = mS(i);
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
    return ch(this)(t, this, n, i);
  }
  path(t, n, i) {
    const r = this.segments, o = ch(this);
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
    (this.points || []).length && o.borderWidth && (t.save(), yS(t, this, i, r), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
Y(ni, "id", "line"), Y(ni, "defaults", {
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
}), Y(ni, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), Y(ni, "descriptors", {
  _scriptable: !0,
  _indexable: (t) => t !== "borderDash" && t !== "fill"
});
function Im(e, t, n, i) {
  const r = e.options, { [n]: o } = e.getProps([
    n
  ], i);
  return Math.abs(t - o) < r.radius + r.hitRadius;
}
class Ba extends yi {
  constructor(n) {
    super();
    Y(this, "parsed");
    Y(this, "skip");
    Y(this, "stop");
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
    return Im(this, n, "x", i);
  }
  inYRange(n, i) {
    return Im(this, n, "y", i);
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
    this.skip || r.radius < 0.1 || !_o(this, i, this.size(r) / 2) || (n.strokeStyle = r.borderColor, n.lineWidth = r.borderWidth, n.fillStyle = r.backgroundColor, oh(n, r, this.x, this.y));
  }
  getRange() {
    const n = this.options || {};
    return n.radius + n.hitRadius;
  }
}
Y(Ba, "id", "point"), /**
* @type {any}
*/
Y(Ba, "defaults", {
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
Y(Ba, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function my(e, t) {
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
function ii(e, t, n, i) {
  return e ? 0 : fe(t, n, i);
}
function xS(e, t, n) {
  const i = e.options.borderWidth, r = e.borderSkipped, o = Vv(i);
  return {
    t: ii(r.top, o.top, 0, n),
    r: ii(r.right, o.right, 0, t),
    b: ii(r.bottom, o.bottom, 0, n),
    l: ii(r.left, o.left, 0, t)
  };
}
function wS(e, t, n) {
  const { enableBorderRadius: i } = e.getProps([
    "enableBorderRadius"
  ]), r = e.options.borderRadius, o = Ts(r), a = Math.min(t, n), c = e.borderSkipped, u = i || mt(r);
  return {
    topLeft: ii(!u || c.top || c.left, o.topLeft, 0, a),
    topRight: ii(!u || c.top || c.right, o.topRight, 0, a),
    bottomLeft: ii(!u || c.bottom || c.left, o.bottomLeft, 0, a),
    bottomRight: ii(!u || c.bottom || c.right, o.bottomRight, 0, a)
  };
}
function bS(e) {
  const t = my(e), n = t.right - t.left, i = t.bottom - t.top, r = xS(e, n / 2, i / 2), o = wS(e, n / 2, i / 2);
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
function su(e, t, n, i) {
  const r = t === null, o = n === null, c = e && !(r && o) && my(e, i);
  return c && (r || An(t, c.left, c.right)) && (o || An(n, c.top, c.bottom));
}
function kS(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function SS(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function ru(e, t, n = {}) {
  const i = e.x !== n.x ? -t : 0, r = e.y !== n.y ? -t : 0, o = (e.x + e.w !== n.x + n.w ? t : 0) - i, a = (e.y + e.h !== n.y + n.h ? t : 0) - r;
  return {
    x: e.x + i,
    y: e.y + r,
    w: e.w + o,
    h: e.h + a,
    radius: e.radius
  };
}
class Ha extends yi {
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: n, options: { borderColor: i, backgroundColor: r } } = this, { inner: o, outer: a } = bS(this), c = kS(a.radius) ? gl : SS;
    t.save(), (a.w !== o.w || a.h !== o.h) && (t.beginPath(), c(t, ru(a, n, o)), t.clip(), c(t, ru(o, -n, a)), t.fillStyle = i, t.fill("evenodd")), t.beginPath(), c(t, ru(o, n)), t.fillStyle = r, t.fill(), t.restore();
  }
  inRange(t, n, i) {
    return su(this, t, n, i);
  }
  inXRange(t, n) {
    return su(this, t, null, n);
  }
  inYRange(t, n) {
    return su(this, null, t, n);
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
Y(Ha, "id", "bar"), Y(Ha, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), Y(Ha, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function PS(e, t, n) {
  const i = e.segments, r = e.points, o = t.points, a = [];
  for (const c of i) {
    let { start: u, end: d } = c;
    d = Vl(u, d, r);
    const p = uh(n, r[u], r[d], c.loop);
    if (!t.segments) {
      a.push({
        source: c,
        target: p,
        start: r[u],
        end: r[d]
      });
      continue;
    }
    const g = Jv(t, p);
    for (const v of g) {
      const y = uh(n, o[v.start], o[v.end], v.loop), S = Qv(c, r, y);
      for (const w of S)
        a.push({
          source: w,
          target: v,
          start: {
            [n]: Rm(p, y, "start", Math.max)
          },
          end: {
            [n]: Rm(p, y, "end", Math.min)
          }
        });
    }
  }
  return a;
}
function uh(e, t, n, i) {
  if (i)
    return;
  let r = t[e], o = n[e];
  return e === "angle" && (r = je(r), o = je(o)), {
    property: e,
    start: r,
    end: o
  };
}
function MS(e, t) {
  const { x: n = null, y: i = null } = e || {}, r = t.points, o = [];
  return t.segments.forEach(({ start: a, end: c }) => {
    c = Vl(a, c, r);
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
function Vl(e, t, n) {
  for (; t > e; t--) {
    const i = n[t];
    if (!isNaN(i.x) && !isNaN(i.y))
      break;
  }
  return t;
}
function Rm(e, t, n, i) {
  return e && t ? i(e[n], t[n]) : e ? e[n] : t ? t[n] : 0;
}
function gy(e, t) {
  let n = [], i = !1;
  return Kt(e) ? (i = !0, n = e) : n = MS(e, t), n.length ? new ni({
    points: n,
    options: {
      tension: 0
    },
    _loop: i,
    _fullLoop: i
  }) : null;
}
function Dm(e) {
  return e && e.fill !== !1;
}
function CS(e, t, n) {
  let r = e[t].fill;
  const o = [
    t
  ];
  let a;
  if (!n)
    return r;
  for (; r !== !1 && o.indexOf(r) === -1; ) {
    if (!me(r))
      return r;
    if (a = e[r], !a)
      return !1;
    if (a.visible)
      return r;
    o.push(r), r = a.fill;
  }
  return !1;
}
function LS(e, t, n) {
  const i = zS(e);
  if (mt(i))
    return isNaN(i.value) ? !1 : i;
  let r = parseFloat(i);
  return me(r) && Math.floor(r) === r ? TS(i[0], t, r, n) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(i) >= 0 && i;
}
function TS(e, t, n, i) {
  return (e === "-" || e === "+") && (n = t + n), n === t || n < 0 || n >= i ? !1 : n;
}
function NS(e, t) {
  let n = null;
  return e === "start" ? n = t.bottom : e === "end" ? n = t.top : mt(e) ? n = t.getPixelForValue(e.value) : t.getBasePixel && (n = t.getBasePixel()), n;
}
function ES(e, t, n) {
  let i;
  return e === "start" ? i = n : e === "end" ? i = t.options.reverse ? t.min : t.max : mt(e) ? i = e.value : i = t.getBaseValue(), i;
}
function zS(e) {
  const t = e.options, n = t.fill;
  let i = ht(n && n.target, n);
  return i === void 0 && (i = !!t.backgroundColor), i === !1 || i === null ? !1 : i === !0 ? "origin" : i;
}
function jS(e) {
  const { scale: t, index: n, line: i } = e, r = [], o = i.segments, a = i.points, c = OS(t, n);
  c.push(gy({
    x: null,
    y: t.bottom
  }, i));
  for (let u = 0; u < o.length; u++) {
    const d = o[u];
    for (let p = d.start; p <= d.end; p++)
      AS(r, a[p], c);
  }
  return new ni({
    points: r,
    options: {}
  });
}
function OS(e, t) {
  const n = [], i = e.getMatchingVisibleMetas("line");
  for (let r = 0; r < i.length; r++) {
    const o = i[r];
    if (o.index === t)
      break;
    o.hidden || n.unshift(o.dataset);
  }
  return n;
}
function AS(e, t, n) {
  const i = [];
  for (let r = 0; r < n.length; r++) {
    const o = n[r], { first: a, last: c, point: u } = IS(o, t, "x");
    if (!(!u || a && c)) {
      if (a)
        i.unshift(u);
      else if (e.push(u), !c)
        break;
    }
  }
  e.push(...i);
}
function IS(e, t, n) {
  const i = e.interpolate(t, n);
  if (!i)
    return {};
  const r = i[n], o = e.segments, a = e.points;
  let c = !1, u = !1;
  for (let d = 0; d < o.length; d++) {
    const p = o[d], g = a[p.start][n], v = a[p.end][n];
    if (An(r, g, v)) {
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
class _y {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, n, i) {
    const { x: r, y: o, radius: a } = this;
    return n = n || {
      start: 0,
      end: At
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
function RS(e) {
  const { chart: t, fill: n, line: i } = e;
  if (me(n))
    return DS(t, n);
  if (n === "stack")
    return jS(e);
  if (n === "shape")
    return !0;
  const r = FS(e);
  return r instanceof _y ? r : gy(r, i);
}
function DS(e, t) {
  const n = e.getDatasetMeta(t);
  return n && e.isDatasetVisible(t) ? n.dataset : null;
}
function FS(e) {
  return (e.scale || {}).getPointPositionForValue ? HS(e) : BS(e);
}
function BS(e) {
  const { scale: t = {}, fill: n } = e, i = NS(n, t);
  if (me(i)) {
    const r = t.isHorizontal();
    return {
      x: r ? i : null,
      y: r ? null : i
    };
  }
  return null;
}
function HS(e) {
  const { scale: t, fill: n } = e, i = t.options, r = t.getLabels().length, o = i.reverse ? t.max : t.min, a = ES(n, t, o), c = [];
  if (i.grid.circular) {
    const u = t.getPointPositionForValue(0, o);
    return new _y({
      x: u.x,
      y: u.y,
      radius: t.getDistanceFromCenterForValue(a)
    });
  }
  for (let u = 0; u < r; ++u)
    c.push(t.getPointPositionForValue(u, a));
  return c;
}
function ou(e, t, n) {
  const i = RS(t), { chart: r, index: o, line: a, scale: c, axis: u } = t, d = a.options, p = d.fill, g = d.backgroundColor, { above: v = g, below: y = g } = p || {}, S = r.getDatasetMeta(o), w = ty(r, S);
  i && a.points.length && (Dl(e, n), WS(e, {
    line: a,
    target: i,
    above: v,
    below: y,
    area: n,
    scale: c,
    axis: u,
    clip: w
  }), Fl(e));
}
function WS(e, t) {
  const { line: n, target: i, above: r, below: o, area: a, scale: c, clip: u } = t, d = n._loop ? "angle" : t.axis;
  e.save();
  let p = o;
  o !== r && (d === "x" ? (Fm(e, i, a.top), au(e, {
    line: n,
    target: i,
    color: r,
    scale: c,
    property: d,
    clip: u
  }), e.restore(), e.save(), Fm(e, i, a.bottom)) : d === "y" && (Bm(e, i, a.left), au(e, {
    line: n,
    target: i,
    color: o,
    scale: c,
    property: d,
    clip: u
  }), e.restore(), e.save(), Bm(e, i, a.right), p = r)), au(e, {
    line: n,
    target: i,
    color: p,
    scale: c,
    property: d,
    clip: u
  }), e.restore();
}
function Fm(e, t, n) {
  const { segments: i, points: r } = t;
  let o = !0, a = !1;
  e.beginPath();
  for (const c of i) {
    const { start: u, end: d } = c, p = r[u], g = r[Vl(u, d, r)];
    o ? (e.moveTo(p.x, p.y), o = !1) : (e.lineTo(p.x, n), e.lineTo(p.x, p.y)), a = !!t.pathSegment(e, c, {
      move: a
    }), a ? e.closePath() : e.lineTo(g.x, n);
  }
  e.lineTo(t.first().x, n), e.closePath(), e.clip();
}
function Bm(e, t, n) {
  const { segments: i, points: r } = t;
  let o = !0, a = !1;
  e.beginPath();
  for (const c of i) {
    const { start: u, end: d } = c, p = r[u], g = r[Vl(u, d, r)];
    o ? (e.moveTo(p.x, p.y), o = !1) : (e.lineTo(n, p.y), e.lineTo(p.x, p.y)), a = !!t.pathSegment(e, c, {
      move: a
    }), a ? e.closePath() : e.lineTo(n, g.y);
  }
  e.lineTo(n, t.first().y), e.closePath(), e.clip();
}
function au(e, t) {
  const { line: n, target: i, property: r, color: o, scale: a, clip: c } = t, u = PS(n, i, r);
  for (const { source: d, target: p, start: g, end: v } of u) {
    const { style: { backgroundColor: y = o } = {} } = d, S = i !== !0;
    e.save(), e.fillStyle = y, VS(e, a, c, S && uh(r, g, v)), e.beginPath();
    const w = !!n.pathSegment(e, d);
    let M;
    if (S) {
      w ? e.closePath() : Hm(e, i, v, r);
      const b = !!i.pathSegment(e, p, {
        move: w,
        reverse: !0
      });
      M = w && b, M || Hm(e, i, g, r);
    }
    e.closePath(), e.fill(M ? "evenodd" : "nonzero"), e.restore();
  }
}
function VS(e, t, n, i) {
  const r = t.chart.chartArea, { property: o, start: a, end: c } = i || {};
  if (o === "x" || o === "y") {
    let u, d, p, g;
    o === "x" ? (u = a, d = r.top, p = c, g = r.bottom) : (u = r.left, d = a, p = r.right, g = c), e.beginPath(), n && (u = Math.max(u, n.left), p = Math.min(p, n.right), d = Math.max(d, n.top), g = Math.min(g, n.bottom)), e.rect(u, d, p - u, g - d), e.clip();
  }
}
function Hm(e, t, n, i) {
  const r = t.interpolate(n, i);
  r && e.lineTo(r.x, r.y);
}
var ZS = {
  id: "filler",
  afterDatasetsUpdate(e, t, n) {
    const i = (e.data.datasets || []).length, r = [];
    let o, a, c, u;
    for (a = 0; a < i; ++a)
      o = e.getDatasetMeta(a), c = o.dataset, u = null, c && c.options && c instanceof ni && (u = {
        visible: e.isDatasetVisible(a),
        index: a,
        fill: LS(c, a, i),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: c
      }), o.$filler = u, r.push(u);
    for (a = 0; a < i; ++a)
      u = r[a], !(!u || u.fill === !1) && (u.fill = CS(r, a, n.propagate));
  },
  beforeDraw(e, t, n) {
    const i = n.drawTime === "beforeDraw", r = e.getSortedVisibleDatasetMetas(), o = e.chartArea;
    for (let a = r.length - 1; a >= 0; --a) {
      const c = r[a].$filler;
      c && (c.line.updateControlPoints(o, c.axis), i && c.fill && ou(e.ctx, c, o));
    }
  },
  beforeDatasetsDraw(e, t, n) {
    if (n.drawTime !== "beforeDatasetsDraw")
      return;
    const i = e.getSortedVisibleDatasetMetas();
    for (let r = i.length - 1; r >= 0; --r) {
      const o = i[r].$filler;
      Dm(o) && ou(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, n) {
    const i = t.meta.$filler;
    !Dm(i) || n.drawTime !== "beforeDatasetDraw" || ou(e.ctx, i, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Wm = (e, t) => {
  let { boxHeight: n = t, boxWidth: i = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), i = e.pointStyleWidth || Math.min(i, t)), {
    boxWidth: i,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, US = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Vm extends yi {
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
    let n = Nt(t.generateLabels, [
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
    const i = t.labels, r = Ce(i.font), o = r.size, a = this._computeTitleHeight(), { boxWidth: c, itemHeight: u } = Wm(i, o);
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
      const { itemWidth: k, itemHeight: P } = $S(i, n, o, M, r);
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
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: i, labels: { padding: r }, rtl: o } } = this, a = Ns(o, this.left, this.width);
    if (this.isHorizontal()) {
      let c = 0, u = Ee(i, this.left + r, this.right - this.lineWidths[c]);
      for (const d of n)
        c !== d.row && (c = d.row, u = Ee(i, this.left + r, this.right - this.lineWidths[c])), d.top += this.top + t + r, d.left = a.leftForLtr(a.x(u), d.width), u += d.width + r;
    } else {
      let c = 0, u = Ee(i, this.top + t + r, this.bottom - this.columnSizes[c].height);
      for (const d of n)
        d.col !== c && (c = d.col, u = Ee(i, this.top + t + r, this.bottom - this.columnSizes[c].height)), d.top = u, d.left += this.left + r, d.left = a.leftForLtr(a.x(d.left), d.width), u += d.height + r;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      Dl(t, this), this._draw(), Fl(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: i, ctx: r } = this, { align: o, labels: a } = t, c = Vt.color, u = Ns(t.rtl, this.left, this.width), d = Ce(a.font), { padding: p } = a, g = d.size, v = g / 2;
    let y;
    this.drawTitle(), r.textAlign = u.textAlign("left"), r.textBaseline = "middle", r.lineWidth = 0.5, r.font = d.string;
    const { boxWidth: S, boxHeight: w, itemHeight: M } = Wm(a, g), b = function(A, j, O) {
      if (isNaN(S) || S <= 0 || isNaN(w) || w < 0)
        return;
      r.save();
      const H = ht(O.lineWidth, 1);
      if (r.fillStyle = ht(O.fillStyle, c), r.lineCap = ht(O.lineCap, "butt"), r.lineDashOffset = ht(O.lineDashOffset, 0), r.lineJoin = ht(O.lineJoin, "miter"), r.lineWidth = H, r.strokeStyle = ht(O.strokeStyle, c), r.setLineDash(ht(O.lineDash, [])), a.usePointStyle) {
        const R = {
          radius: w * Math.SQRT2 / 2,
          pointStyle: O.pointStyle,
          rotation: O.rotation,
          borderWidth: H
        }, V = u.xPlus(A, S / 2), q = j + v;
        Wv(r, R, V, q, a.pointStyleWidth && S);
      } else {
        const R = j + Math.max((g - w) / 2, 0), V = u.leftForLtr(A, S), q = Ts(O.borderRadius);
        r.beginPath(), Object.values(q).some((xt) => xt !== 0) ? gl(r, {
          x: V,
          y: R,
          w: S,
          h: w,
          radius: q
        }) : r.rect(V, R, S, w), r.fill(), H !== 0 && r.stroke();
      }
      r.restore();
    }, k = function(A, j, O) {
      ml(r, O.text, A, j + M / 2, d, {
        strikethrough: O.hidden,
        textAlign: u.textAlign(O.textAlign)
      });
    }, P = this.isHorizontal(), T = this._computeTitleHeight();
    P ? y = {
      x: Ee(o, this.left + p, this.right - i[0]),
      y: this.top + p + T,
      line: 0
    } : y = {
      x: this.left + p,
      y: Ee(o, this.top + T + p, this.bottom - n[0].height),
      line: 0
    }, Kv(this.ctx, t.textDirection);
    const N = M + p;
    this.legendItems.forEach((A, j) => {
      r.strokeStyle = A.fontColor, r.fillStyle = A.fontColor;
      const O = r.measureText(A.text).width, H = u.textAlign(A.textAlign || (A.textAlign = a.textAlign)), R = S + v + O;
      let V = y.x, q = y.y;
      u.setWidth(this.width), P ? j > 0 && V + R + p > this.right && (q = y.y += N, y.line++, V = y.x = Ee(o, this.left + p, this.right - i[y.line])) : j > 0 && q + N > this.bottom && (V = y.x = V + n[y.line].width + p, y.line++, q = y.y = Ee(o, this.top + T + p, this.bottom - n[y.line].height));
      const xt = u.x(V);
      if (b(xt, q, A), V = bb(H, V + S + v, P ? V + R : this.right, t.rtl), k(u.x(V), q, A), P)
        y.x += R + p;
      else if (typeof A.text != "string") {
        const K = d.lineHeight;
        y.y += vy(A, K) + p;
      } else
        y.y += N;
    }), Xv(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, i = Ce(n.font), r = rn(n.padding);
    if (!n.display)
      return;
    const o = Ns(t.rtl, this.left, this.width), a = this.ctx, c = n.position, u = i.size / 2, d = r.top + u;
    let p, g = this.left, v = this.width;
    if (this.isHorizontal())
      v = Math.max(...this.lineWidths), p = this.top + d, g = Ee(t.align, g, this.right - v);
    else {
      const S = this.columnSizes.reduce((w, M) => Math.max(w, M.height), 0);
      p = d + Ee(t.align, this.top, this.bottom - S - t.labels.padding - this._computeTitleHeight());
    }
    const y = Ee(c, g, g + v);
    a.textAlign = o.textAlign(Bv(c)), a.textBaseline = "middle", a.strokeStyle = n.color, a.fillStyle = n.color, a.font = i.string, ml(a, n.text, y, p, i);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = Ce(t.font), i = rn(t.padding);
    return t.display ? n.lineHeight + i.height : 0;
  }
  _getLegendItemAt(t, n) {
    let i, r, o;
    if (An(t, this.left, this.right) && An(n, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, i = 0; i < o.length; ++i)
        if (r = o[i], An(t, r.left, r.left + r.width) && An(n, r.top, r.top + r.height))
          return this.legendItems[i];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!KS(t.type, n))
      return;
    const i = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const r = this._hoveredItem, o = US(r, i);
      r && !o && Nt(n.onLeave, [
        t,
        r,
        this
      ], this), this._hoveredItem = i, i && !o && Nt(n.onHover, [
        t,
        i,
        this
      ], this);
    } else i && Nt(n.onClick, [
      t,
      i,
      this
    ], this);
  }
}
function $S(e, t, n, i, r) {
  const o = YS(i, e, t, n), a = qS(r, i, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: a
  };
}
function YS(e, t, n, i) {
  let r = e.text;
  return r && typeof r != "string" && (r = r.reduce((o, a) => o.length > a.length ? o : a)), t + n.size / 2 + i.measureText(r).width;
}
function qS(e, t, n) {
  let i = e;
  return typeof t.text != "string" && (i = vy(t, n)), i;
}
function vy(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function KS(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var XS = {
  id: "legend",
  _element: Vm,
  start(e, t, n) {
    const i = e.legend = new Vm({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    ei.configure(e, i, n), ei.addBox(e, i);
  },
  stop(e) {
    ei.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const i = e.legend;
    ei.configure(e, i, n), i.options = n;
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
const jr = {
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
        const d = u.getCenterPoint(), p = sh(t, d);
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
  return t && (Kt(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function Ln(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function GS(e, t) {
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
function Zm(e, t) {
  const n = e.chart.ctx, { body: i, footer: r, title: o } = e, { boxWidth: a, boxHeight: c } = t, u = Ce(t.bodyFont), d = Ce(t.titleFont), p = Ce(t.footerFont), g = o.length, v = r.length, y = i.length, S = rn(t.padding);
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
  return n.save(), n.font = d.string, St(e.title, P), n.font = u.string, St(e.beforeBody.concat(e.afterBody), P), k = t.displayColors ? a + 2 + t.boxPadding : 0, St(i, (T) => {
    St(T.before, P), St(T.lines, P), St(T.after, P);
  }), k = 0, n.font = p.string, St(e.footer, P), n.restore(), M += S.width, {
    width: M,
    height: w
  };
}
function QS(e, t) {
  const { y: n, height: i } = t;
  return n < i / 2 ? "top" : n > e.height - i / 2 ? "bottom" : "center";
}
function JS(e, t, n, i) {
  const { x: r, width: o } = i, a = n.caretSize + n.caretPadding;
  if (e === "left" && r + o + a > t.width || e === "right" && r - o - a < 0)
    return !0;
}
function tP(e, t, n, i) {
  const { x: r, width: o } = n, { width: a, chartArea: { left: c, right: u } } = e;
  let d = "center";
  return i === "center" ? d = r <= (c + u) / 2 ? "left" : "right" : r <= o / 2 ? d = "left" : r >= a - o / 2 && (d = "right"), JS(d, e, t, n) && (d = "center"), d;
}
function Um(e, t, n) {
  const i = n.yAlign || t.yAlign || QS(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || tP(e, t, n, i),
    yAlign: i
  };
}
function eP(e, t) {
  let { x: n, width: i } = e;
  return t === "right" ? n -= i : t === "center" && (n -= i / 2), n;
}
function nP(e, t, n) {
  let { y: i, height: r } = e;
  return t === "top" ? i += n : t === "bottom" ? i -= r + n : i -= r / 2, i;
}
function $m(e, t, n, i) {
  const { caretSize: r, caretPadding: o, cornerRadius: a } = e, { xAlign: c, yAlign: u } = n, d = r + o, { topLeft: p, topRight: g, bottomLeft: v, bottomRight: y } = Ts(a);
  let S = eP(t, c);
  const w = nP(t, u, d);
  return u === "center" ? c === "left" ? S += d : c === "right" && (S -= d) : c === "left" ? S -= Math.max(p, v) + r : c === "right" && (S += Math.max(g, y) + r), {
    x: fe(S, 0, i.width - t.width),
    y: fe(w, 0, i.height - t.height)
  };
}
function xa(e, t, n) {
  const i = rn(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - i.right : e.x + i.left;
}
function Ym(e) {
  return dn([], Ln(e));
}
function iP(e, t, n) {
  return Xi(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function qm(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const yy = {
  beforeTitle: Mn,
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
  afterTitle: Mn,
  beforeBody: Mn,
  beforeLabel: Mn,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return kt(n) || (t += n), t;
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
  afterLabel: Mn,
  afterBody: Mn,
  beforeFooter: Mn,
  footer: Mn,
  afterFooter: Mn
};
function ke(e, t, n, i) {
  const r = e[t].call(n, i);
  return typeof r > "u" ? yy[t].call(n, i) : r;
}
class hh extends yi {
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
    const n = this.chart, i = this.options.setContext(this.getContext()), r = i.enabled && n.options.animation && i.animations, o = new ey(this.chart, r);
    return r._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = iP(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: i } = n, r = ke(i, "beforeTitle", this, t), o = ke(i, "title", this, t), a = ke(i, "afterTitle", this, t);
    let c = [];
    return c = dn(c, Ln(r)), c = dn(c, Ln(o)), c = dn(c, Ln(a)), c;
  }
  getBeforeBody(t, n) {
    return Ym(ke(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: i } = n, r = [];
    return St(t, (o) => {
      const a = {
        before: [],
        lines: [],
        after: []
      }, c = qm(i, o);
      dn(a.before, Ln(ke(c, "beforeLabel", this, o))), dn(a.lines, ke(c, "label", this, o)), dn(a.after, Ln(ke(c, "afterLabel", this, o))), r.push(a);
    }), r;
  }
  getAfterBody(t, n) {
    return Ym(ke(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: i } = n, r = ke(i, "beforeFooter", this, t), o = ke(i, "footer", this, t), a = ke(i, "afterFooter", this, t);
    let c = [];
    return c = dn(c, Ln(r)), c = dn(c, Ln(o)), c = dn(c, Ln(a)), c;
  }
  _createItems(t) {
    const n = this._active, i = this.chart.data, r = [], o = [], a = [];
    let c = [], u, d;
    for (u = 0, d = n.length; u < d; ++u)
      c.push(GS(this.chart, n[u]));
    return t.filter && (c = c.filter((p, g, v) => t.filter(p, g, v, i))), t.itemSort && (c = c.sort((p, g) => t.itemSort(p, g, i))), St(c, (p) => {
      const g = qm(t.callbacks, p);
      r.push(ke(g, "labelColor", this, p)), o.push(ke(g, "labelPointStyle", this, p)), a.push(ke(g, "labelTextColor", this, p));
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
      const c = jr[i.position].call(this, r, this._eventPosition);
      a = this._createItems(i), this.title = this.getTitle(a, i), this.beforeBody = this.getBeforeBody(a, i), this.body = this.getBody(a, i), this.afterBody = this.getAfterBody(a, i), this.footer = this.getFooter(a, i);
      const u = this._size = Zm(this, i), d = Object.assign({}, c, u), p = Um(this.chart, i, d), g = $m(i, d, p, this.chart);
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
    const { xAlign: r, yAlign: o } = this, { caretSize: a, cornerRadius: c } = i, { topLeft: u, topRight: d, bottomLeft: p, bottomRight: g } = Ts(c), { x: v, y } = t, { width: S, height: w } = n;
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
      const d = Ns(i.rtl, this.x, this.width);
      for (t.x = xa(this, i.titleAlign, i), n.textAlign = d.textAlign(i.titleAlign), n.textBaseline = "middle", a = Ce(i.titleFont), c = i.titleSpacing, n.fillStyle = i.titleColor, n.font = a.string, u = 0; u < o; ++u)
        n.fillText(r[u], d.x(t.x), t.y + a.lineHeight / 2), t.y += a.lineHeight + c, u + 1 === o && (t.y += i.titleMarginBottom - c);
    }
  }
  _drawColorBox(t, n, i, r, o) {
    const a = this.labelColors[i], c = this.labelPointStyles[i], { boxHeight: u, boxWidth: d } = o, p = Ce(o.bodyFont), g = xa(this, "left", o), v = r.x(g), y = u < p.lineHeight ? (p.lineHeight - u) / 2 : 0, S = n.y + y;
    if (o.usePointStyle) {
      const w = {
        radius: Math.min(d, u) / 2,
        pointStyle: c.pointStyle,
        rotation: c.rotation,
        borderWidth: 1
      }, M = r.leftForLtr(v, d) + d / 2, b = S + u / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, oh(t, w, M, b), t.strokeStyle = a.borderColor, t.fillStyle = a.backgroundColor, oh(t, w, M, b);
    } else {
      t.lineWidth = mt(a.borderWidth) ? Math.max(...Object.values(a.borderWidth)) : a.borderWidth || 1, t.strokeStyle = a.borderColor, t.setLineDash(a.borderDash || []), t.lineDashOffset = a.borderDashOffset || 0;
      const w = r.leftForLtr(v, d), M = r.leftForLtr(r.xPlus(v, 1), d - 2), b = Ts(a.borderRadius);
      Object.values(b).some((k) => k !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, gl(t, {
        x: w,
        y: S,
        w: d,
        h: u,
        radius: b
      }), t.fill(), t.stroke(), t.fillStyle = a.backgroundColor, t.beginPath(), gl(t, {
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
    const { body: r } = this, { bodySpacing: o, bodyAlign: a, displayColors: c, boxHeight: u, boxWidth: d, boxPadding: p } = i, g = Ce(i.bodyFont);
    let v = g.lineHeight, y = 0;
    const S = Ns(i.rtl, this.x, this.width), w = function(O) {
      n.fillText(O, S.x(t.x + y), t.y + v / 2), t.y += v + o;
    }, M = S.textAlign(a);
    let b, k, P, T, N, A, j;
    for (n.textAlign = a, n.textBaseline = "middle", n.font = g.string, t.x = xa(this, M, i), n.fillStyle = i.bodyColor, St(this.beforeBody, w), y = c && M !== "right" ? a === "center" ? d / 2 + p : d + 2 + p : 0, T = 0, A = r.length; T < A; ++T) {
      for (b = r[T], k = this.labelTextColors[T], n.fillStyle = k, St(b.before, w), P = b.lines, c && P.length && (this._drawColorBox(n, t, T, S, i), v = Math.max(g.lineHeight, u)), N = 0, j = P.length; N < j; ++N)
        w(P[N]), v = g.lineHeight;
      St(b.after, w);
    }
    y = 0, v = g.lineHeight, St(this.afterBody, w), t.y -= o;
  }
  drawFooter(t, n, i) {
    const r = this.footer, o = r.length;
    let a, c;
    if (o) {
      const u = Ns(i.rtl, this.x, this.width);
      for (t.x = xa(this, i.footerAlign, i), t.y += i.footerMarginTop, n.textAlign = u.textAlign(i.footerAlign), n.textBaseline = "middle", a = Ce(i.footerFont), n.fillStyle = i.footerColor, n.font = a.string, c = 0; c < o; ++c)
        n.fillText(r[c], u.x(t.x), t.y + a.lineHeight / 2), t.y += a.lineHeight + i.footerSpacing;
    }
  }
  drawBackground(t, n, i, r) {
    const { xAlign: o, yAlign: a } = this, { x: c, y: u } = t, { width: d, height: p } = i, { topLeft: g, topRight: v, bottomLeft: y, bottomRight: S } = Ts(r.cornerRadius);
    n.fillStyle = r.backgroundColor, n.strokeStyle = r.borderColor, n.lineWidth = r.borderWidth, n.beginPath(), n.moveTo(c + g, u), a === "top" && this.drawCaret(t, n, i, r), n.lineTo(c + d - v, u), n.quadraticCurveTo(c + d, u, c + d, u + v), a === "center" && o === "right" && this.drawCaret(t, n, i, r), n.lineTo(c + d, u + p - S), n.quadraticCurveTo(c + d, u + p, c + d - S, u + p), a === "bottom" && this.drawCaret(t, n, i, r), n.lineTo(c + y, u + p), n.quadraticCurveTo(c, u + p, c, u + p - y), a === "center" && o === "left" && this.drawCaret(t, n, i, r), n.lineTo(c, u + g), n.quadraticCurveTo(c, u, c + g, u), n.closePath(), n.fill(), r.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, i = this.$animations, r = i && i.x, o = i && i.y;
    if (r || o) {
      const a = jr[t.position].call(this, this._active, this._eventPosition);
      if (!a)
        return;
      const c = this._size = Zm(this, t), u = Object.assign({}, a, this._size), d = Um(n, t, u), p = $m(t, u, d, n);
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
    n.enabled && c && (t.save(), t.globalAlpha = i, this.drawBackground(o, t, r, n), Kv(t, n.textDirection), o.y += a.top, this.drawTitle(o, t, n), this.drawBody(o, t, n), this.drawFooter(o, t, n), Xv(t, n.textDirection), t.restore());
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
    }), o = !dl(i, r), a = this._positionChanged(r, n);
    (o || a) && (this._active = r, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, i = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const r = this.options, o = this._active || [], a = this._getActiveElements(t, o, n, i), c = this._positionChanged(a, t), u = n || !dl(a, o) || c;
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
    const { caretX: i, caretY: r, options: o } = this, a = jr[o.position].call(this, t, n);
    return a !== !1 && (i !== a.x || r !== a.y);
  }
}
Y(hh, "positioners", jr);
var sP = {
  id: "tooltip",
  _element: hh,
  positioners: jr,
  afterInit(e, t, n) {
    n && (e.tooltip = new hh({
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
    callbacks: yy
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
const rP = (e, t, n, i) => (typeof t == "string" ? (n = e.push(t) - 1, i.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function oP(e, t, n, i) {
  const r = e.indexOf(t);
  if (r === -1)
    return rP(e, t, n, i);
  const o = e.lastIndexOf(t);
  return r !== o ? n : r;
}
const aP = (e, t) => e === null ? null : fe(Math.round(e), 0, t);
function Km(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class dh extends Zs {
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
    if (kt(t))
      return null;
    const i = this.getLabels();
    return n = isFinite(n) && i[n] === t ? n : oP(i, t, ht(n, t), this._addedLabels), aP(n, i.length - 1);
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
    return Km.call(this, t);
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
Y(dh, "id", "category"), Y(dh, "defaults", {
  ticks: {
    callback: Km
  }
});
function lP(e, t) {
  const n = [], { bounds: r, step: o, min: a, max: c, precision: u, count: d, maxTicks: p, maxDigits: g, includeBounds: v } = e, y = o || 1, S = p - 1, { min: w, max: M } = t, b = !kt(a), k = !kt(c), P = !kt(d), T = (M - w) / (g + 1);
  let N = $p((M - w) / S / y) * y, A, j, O, H;
  if (N < 1e-14 && !b && !k)
    return [
      {
        value: w
      },
      {
        value: M
      }
    ];
  H = Math.ceil(M / N) - Math.floor(w / N), H > S && (N = $p(H * N / S / y) * y), kt(u) || (A = Math.pow(10, u), N = Math.ceil(N * A) / A), r === "ticks" ? (j = Math.floor(w / N) * N, O = Math.ceil(M / N) * N) : (j = w, O = M), b && k && o && fb((c - a) / o, N / 1e3) ? (H = Math.round(Math.min((c - a) / N, p)), N = (c - a) / H, j = a, O = c) : P ? (j = b ? a : j, O = k ? c : O, H = d - 1, N = (O - j) / H) : (H = (O - j) / N, Zr(H, Math.round(H), N / 1e3) ? H = Math.round(H) : H = Math.ceil(H));
  const R = Math.max(Yp(N), Yp(j));
  A = Math.pow(10, kt(u) ? R : u), j = Math.round(j * A) / A, O = Math.round(O * A) / A;
  let V = 0;
  for (b && (v && j !== a ? (n.push({
    value: a
  }), j < a && V++, Zr(Math.round((j + V * N) * A) / A, a, Xm(a, T, e)) && V++) : j < a && V++); V < H; ++V) {
    const q = Math.round((j + V * N) * A) / A;
    if (k && q > c)
      break;
    n.push({
      value: q
    });
  }
  return k && v && O !== c ? n.length && Zr(n[n.length - 1].value, c, Xm(c, T, e)) ? n[n.length - 1].value = c : n.push({
    value: c
  }) : (!k || O === c) && n.push({
    value: O
  }), n;
}
function Xm(e, t, { horizontal: n, minRotation: i }) {
  const r = On(i), o = (n ? Math.sin(r) : Math.cos(r)) || 1e-3, a = 0.75 * t * ("" + e).length;
  return Math.min(t / o, a);
}
class cP extends Zs {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return kt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
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
    }, o = this._range || this, a = lP(r, o);
    return t.bounds === "ticks" && pb(a, this, "value"), t.reverse ? (a.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), a;
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
    return vd(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class fh extends cP {
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = me(t) ? t : 0, this.max = me(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, i = On(this.options.ticks.minRotation), r = (t ? Math.sin(i) : Math.cos(i)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, o.lineHeight / r));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
Y(fh, "id", "linear"), Y(fh, "defaults", {
  ticks: {
    callback: Hv.formatters.numeric
  }
});
const Zl = {
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
}, Pe = /* @__PURE__ */ Object.keys(Zl);
function Gm(e, t) {
  return e - t;
}
function Qm(e, t) {
  if (kt(t))
    return null;
  const n = e._adapter, { parser: i, round: r, isoWeekday: o } = e._parseOpts;
  let a = t;
  return typeof i == "function" && (a = i(a)), me(a) || (a = typeof i == "string" ? n.parse(a, i) : n.parse(a)), a === null ? null : (r && (a = r === "week" && (mo(o) || o === !0) ? n.startOf(a, "isoWeek", o) : n.startOf(a, r)), +a);
}
function Jm(e, t, n, i) {
  const r = Pe.length;
  for (let o = Pe.indexOf(e); o < r - 1; ++o) {
    const a = Zl[Pe[o]], c = a.steps ? a.steps : Number.MAX_SAFE_INTEGER;
    if (a.common && Math.ceil((n - t) / (c * a.size)) <= i)
      return Pe[o];
  }
  return Pe[r - 1];
}
function uP(e, t, n, i, r) {
  for (let o = Pe.length - 1; o >= Pe.indexOf(n); o--) {
    const a = Pe[o];
    if (Zl[a].common && e._adapter.diff(r, i, a) >= t - 1)
      return a;
  }
  return Pe[n ? Pe.indexOf(n) : 0];
}
function hP(e) {
  for (let t = Pe.indexOf(e) + 1, n = Pe.length; t < n; ++t)
    if (Zl[Pe[t]].common)
      return Pe[t];
}
function tg(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: i, hi: r } = gd(n, t), o = n[i] >= t ? n[i] : n[r];
    e[o] = !0;
  }
}
function dP(e, t, n, i) {
  const r = e._adapter, o = +r.startOf(t[0].value, i), a = t[t.length - 1].value;
  let c, u;
  for (c = o; c <= a; c = +r.add(c, 1, i))
    u = n[c], u >= 0 && (t[u].major = !0);
  return t;
}
function eg(e, t, n) {
  const i = [], r = {}, o = t.length;
  let a, c;
  for (a = 0; a < o; ++a)
    c = t[a], r[c] = a, i.push({
      value: c,
      major: !1
    });
  return o === 0 || !n ? i : dP(e, i, r, n);
}
class xl extends Zs {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, n = {}) {
    const i = t.time || (t.time = {}), r = this._adapter = new Xk._date(t.adapters.date);
    r.init(n), Vr(i.displayFormats, r.formats()), this._parseOpts = {
      parser: i.parser,
      round: i.round,
      isoWeekday: i.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Qm(this, t);
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
    (!a || !c) && (u(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && u(this.getMinMax(!1))), r = me(r) && !isNaN(r) ? r : +n.startOf(Date.now(), i), o = me(o) && !isNaN(o) ? o : +n.endOf(Date.now(), i) + 1, this.min = Math.min(r, o - 1), this.max = Math.max(r + 1, o);
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
    const o = this.min, a = this.max, c = yb(r, o, a);
    return this._unit = n.unit || (i.autoSkip ? Jm(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : uP(this, c.length, n.minUnit, this.min, this.max)), this._majorUnit = !i.major.enabled || this._unit === "year" ? void 0 : hP(this._unit), this.initOffsets(r), t.reverse && c.reverse(), eg(this, c, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, i = 0, r, o;
    this.options.offset && t.length && (r = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - r : n = (this.getDecimalForValue(t[1]) - r) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? i = o : i = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const a = t.length < 3 ? 0.5 : 0.25;
    n = fe(n, 0, a), i = fe(i, 0, a), this._offsets = {
      start: n,
      end: i,
      factor: 1 / (n + 1 + i)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, i = this.max, r = this.options, o = r.time, a = o.unit || Jm(o.minUnit, n, i, this._getLabelCapacity(n)), c = ht(r.ticks.stepSize, 1), u = a === "week" ? o.isoWeekday : !1, d = mo(u) || u === !0, p = {};
    let g = n, v, y;
    if (d && (g = +t.startOf(g, "isoWeek", u)), g = +t.startOf(g, d ? "day" : a), t.diff(i, n, a) > 1e5 * c)
      throw new Error(n + " and " + i + " are too far apart with stepSize of " + c + " " + a);
    const S = r.ticks.source === "data" && this.getDataTimestamps();
    for (v = g, y = 0; v < i; v = +t.add(v, c, a), y++)
      tg(p, v, S);
    return (v === i || r.bounds === "ticks" || y === 1) && tg(p, v, S), Object.keys(p).sort(Gm).map((w) => +w);
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
      return Nt(a, [
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
    const n = this.options.ticks, i = this.ctx.measureText(t).width, r = On(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(r), a = Math.sin(r), c = this._resolveTickFontOptions(0).size;
    return {
      w: i * o + c * a,
      h: i * a + c * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, i = n.displayFormats, r = i[n.unit] || i.millisecond, o = this._tickFormatFunction(t, 0, eg(this, [
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
      t.push(Qm(this, r[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Rv(t.sort(Gm));
  }
}
Y(xl, "id", "time"), Y(xl, "defaults", {
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
function wa(e, t, n) {
  let i = 0, r = e.length - 1, o, a, c, u;
  n ? (t >= e[i].pos && t <= e[r].pos && ({ lo: i, hi: r } = Ii(e, "pos", t)), { pos: o, time: c } = e[i], { pos: a, time: u } = e[r]) : (t >= e[i].time && t <= e[r].time && ({ lo: i, hi: r } = Ii(e, "time", t)), { time: o, pos: c } = e[i], { time: a, pos: u } = e[r]);
  const d = a - o;
  return d ? c + (u - c) * (t - o) / d : c;
}
class ng extends xl {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = wa(n, this.min), this._tableRange = wa(n, this.max) - this._minPos, super.initOffsets(t);
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
    return (wa(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, i = this.getDecimalForPixel(t) / n.factor - n.end;
    return wa(this._table, i * this._tableRange + this._minPos, !0);
  }
}
Y(ng, "id", "timeseries"), Y(ng, "defaults", xl.defaults);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xy = (...e) => e.filter((t, n, i) => !!t && t.trim() !== "" && i.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fP = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pP = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, i) => i ? i.toUpperCase() : n.toLowerCase()
);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ig = (e) => {
  const t = pP(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var lu = {
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
const mP = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, gP = W.createContext({}), _P = () => W.useContext(gP), vP = W.forwardRef(
  ({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: i, className: r = "", children: o, iconNode: a, ...c }, u) => {
    const {
      size: d = 24,
      strokeWidth: p = 2,
      absoluteStrokeWidth: g = !1,
      color: v = "currentColor",
      className: y = ""
    } = _P() ?? {}, S = i ?? g ? Number(n ?? p) * 24 / Number(t ?? d) : n ?? p;
    return W.createElement(
      "svg",
      {
        ref: u,
        ...lu,
        width: t ?? d ?? lu.width,
        height: t ?? d ?? lu.height,
        stroke: e ?? v,
        strokeWidth: S,
        className: xy("lucide", y, r),
        ...!o && !mP(c) && { "aria-hidden": "true" },
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
const ot = (e, t) => {
  const n = W.forwardRef(
    ({ className: i, ...r }, o) => W.createElement(vP, {
      ref: o,
      iconNode: t,
      className: xy(
        `lucide-${fP(ig(e))}`,
        `lucide-${e}`,
        i
      ),
      ...r
    })
  );
  return n.displayName = ig(e), n;
};
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yP = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
], wy = ot("activity", yP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xP = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
], wP = ot("arrow-right", xP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bP = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
], by = ot("briefcase", bP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kP = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
], ky = ot("chart-column", kP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const SP = [
  [
    "path",
    {
      d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
      key: "pzmjnu"
    }
  ],
  ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83", key: "k2fpak" }]
], PP = ot("chart-pie", SP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MP = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], sg = ot("chevron-down", MP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CP = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], LP = ot("chevron-right", CP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TP = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], rg = ot("circle-alert", TP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NP = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], EP = ot("database", NP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zP = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], cu = ot("download", zP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jP = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], Po = ot("external-link", jP);
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
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
], og = ot("file-spreadsheet", OP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AP = [
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
], IP = ot("fish", AP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const RP = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
], DP = ot("flame", RP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FP = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
], ag = ot("funnel", FP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const BP = [
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
], HP = ot("hard-drive", BP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WP = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
], Sy = ot("inbox", WP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const VP = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], ZP = ot("info", VP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const UP = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], $P = ot("layout-dashboard", UP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const YP = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
], ph = ot("lightbulb", YP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qP = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], KP = ot("loader-circle", qP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const XP = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], GP = ot("lock", XP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QP = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
], JP = ot("log-out", QP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tM = [
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
], Py = ot("map-pinned", tM);
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
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
], My = ot("map-pin", eM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nM = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], iM = ot("menu", nM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sM = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ]
], rM = ot("message-square", sM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oM = [
  ["rect", { x: "16", y: "16", width: "6", height: "6", rx: "1", key: "4q2zg0" }],
  ["rect", { x: "2", y: "16", width: "6", height: "6", rx: "1", key: "8cvhb9" }],
  ["rect", { x: "9", y: "2", width: "6", height: "6", rx: "1", key: "1egb70" }],
  ["path", { d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3", key: "1jsf9p" }],
  ["path", { d: "M12 12V8", key: "2874zd" }]
], mh = ot("network", oM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aM = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  [
    "path",
    {
      d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
      key: "1fd625"
    }
  ]
], lM = ot("octagon-alert", aM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cM = [
  ["path", { d: "M16.247 7.761a6 6 0 0 1 0 8.478", key: "1fwjs5" }],
  ["path", { d: "M19.075 4.933a10 10 0 0 1 0 14.134", key: "ehdyv1" }],
  ["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134", key: "1q22gi" }],
  ["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478", key: "r2q7qm" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
], Cy = ot("radio", cM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uM = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], wl = ot("refresh-cw", uM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hM = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], dM = ot("rotate-ccw", hM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fM = [
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
], Ly = ot("satellite", fM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pM = [
  ["path", { d: "m13.5 8.5-5 5", key: "1cs55j" }],
  ["path", { d: "m8.5 8.5 5 5", key: "a8mexj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], mM = ot("search-x", pM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gM = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], _M = ot("search", gM);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], Ty = ot("shield-check", vM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yM = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], xM = ot("shield", yM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wM = [
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
], bM = ot("sparkles", wM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kM = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }]
], Ny = ot("table", kM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const SM = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
], PM = ot("trending-down", SM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MM = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
], CM = ot("trending-up", MM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LM = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], TM = ot("triangle-alert", LM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NM = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], EM = ot("upload", NM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zM = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
], jM = ot("user", zM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const OM = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
], AM = ot("users", OM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const IM = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], RM = ot("x", IM);
function Ey(e) {
  if (!e) return "-";
  const t = String(e).replace(/^(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2}:\d{2})/, "$1T$2"), n = new Date(t);
  return Number.isNaN(n.getTime()) ? e : n.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function zy(e) {
  if (!e) return "-";
  const t = String(e).replace(/^(\d{4}-\d{2}-\d{2})\s(\d{2}:\d{2}:\d{2})/, "$1T$2"), n = new Date(t);
  return Number.isNaN(n.getTime()) ? e : n.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
function Ul(e) {
  const t = Number(e || 0);
  return t > 80 ? "high" : t >= 50 ? "medium" : "low";
}
const DM = [
  {
    title: "Monitoring",
    items: [
      { id: "overview", label: "Overview", icon: $P },
      { id: "map", label: "Threat Map", icon: Py },
      { id: "alerts", label: "Live Alerts", icon: Cy }
    ]
  },
  {
    title: "Analysis",
    items: [
      { id: "networks", label: "Network", icon: mh },
      { id: "analytics", label: "Analytics", icon: ky },
      { id: "incidents", label: "Incidents", icon: Ny }
    ]
  },
  {
    title: "Intelligence",
    items: [
      { id: "osint", label: "OSINT Feed", icon: Ly },
      { id: "reco", label: "Recommendations", icon: ph }
    ]
  }
];
function FM({ activeSection: e, onSelect: t, isOpen: n, syncStatus: i, lastSync: r }) {
  function o(c) {
    t == null || t(c);
    const u = document.getElementById(`section-${c}`);
    u && u.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  const a = !!(i != null && i.running);
  return /* @__PURE__ */ m.jsxs("aside", { className: `sidebar ${n ? "is-open" : ""}`, "aria-label": "Primary navigation", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "sidebar-head", children: [
      /* @__PURE__ */ m.jsx("div", { className: "brand-mark", "aria-hidden": "true", children: /* @__PURE__ */ m.jsx(xM, { size: 20, strokeWidth: 2 }) }),
      /* @__PURE__ */ m.jsxs("div", { className: "brand-copy", children: [
        /* @__PURE__ */ m.jsx("div", { className: "brand-title", children: "Wildlife Intelligence" }),
        /* @__PURE__ */ m.jsx("div", { className: "brand-sub", children: "Command Center" })
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("nav", { className: "sidebar-body", children: DM.map((c) => /* @__PURE__ */ m.jsxs("div", { className: "nav-group", children: [
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
        /* @__PURE__ */ m.jsx("strong", { className: "mono", children: zy(r) })
      ] })
    ] }) })
  ] });
}
function BM({
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
  }, d = !!(n != null && n.running), p = d ? "Search in progress" : "Auto search active", g = d ? (n == null ? void 0 : n.progress) || {} : (n == null ? void 0 : n.last_search) || {}, v = String((n == null ? void 0 : n.message) || "").trim(), y = typeof g.stage == "string" && g.stage !== "-" ? g.stage : "", S = typeof g.provider == "string" && g.provider !== "-" ? g.provider : "", w = typeof g.language == "string" && g.language !== "-" ? g.language : "", M = typeof g.query == "string" && g.query !== "-" ? g.query : "", b = g.scanned !== void 0 ? g.scanned : null, k = g.kept !== void 0 ? g.kept : null, P = typeof g.updated_at == "string" && g.updated_at !== "-" ? g.updated_at : "", T = [S, w].filter(Boolean).join(" / "), N = [];
  y && N.push(`stage: ${d ? y : `last ${y}`}`), T && N.push(T), M && N.push(`q: ${M}`), b !== null && k !== null && N.push(`scanned ${b}, kept ${k}`), !d && P && N.push(`updated ${zy(P)}`);
  const A = N.length ? N.join(" • ") : v || (d ? "Collecting live reports" : ""), [j, O] = W.useState(null), H = W.useRef(null), R = W.useRef(null);
  W.useEffect(() => {
    function st(Z) {
      H.current && !H.current.contains(Z.target) && R.current && !R.current.contains(Z.target) && O(null);
    }
    function I(Z) {
      Z.key === "Escape" && O(null);
    }
    return j && (document.addEventListener("mousedown", st), document.addEventListener("keydown", I)), () => {
      document.removeEventListener("mousedown", st), document.removeEventListener("keydown", I);
    };
  }, [j]);
  const V = () => typeof import.meta < "u" ? "".trim().replace(/\/$/, "") : "", q = (st) => {
    r(st), O(null);
  }, xt = () => {
    window.location.href = `${V()}/api/public/download-csv`, O(null);
  }, K = () => {
    window.location.href = `${V()}/api/public/download-db`, O(null);
  }, ct = () => {
    O(null);
    const st = document.createElement("input");
    st.type = "file", st.accept = ".db,.sqlite,.sqlite3", st.onchange = async (I) => {
      var G;
      const Z = (G = I.target.files) == null ? void 0 : G[0];
      if (!Z || !confirm(`Restore database from "${Z.name}"? This will replace all current data.`)) return;
      const F = new FormData();
      F.append("file", Z);
      try {
        const _t = await (await fetch(`${V()}/api/public/upload-db`, { method: "POST", body: F })).json();
        _t.ok ? (alert(`Database restored!

Total rows: ${_t.total_rows}
Poaching articles: ${_t.poaching_rows}
Predictor retrained: ${_t.predictor_retrained ? "Yes" : "No"}`), window.location.reload()) : alert(`Restore failed: ${_t.detail || "Unknown error"}`);
      } catch (rt) {
        alert(`Upload failed: ${rt.message}`);
      }
    }, st.click();
  }, et = () => {
    O(null), c();
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
          children: /* @__PURE__ */ m.jsx(iM, { size: 18 })
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
      A ? /* @__PURE__ */ m.jsx("span", { className: "sync-pill-meta", children: A }) : null
    ] }) }),
    /* @__PURE__ */ m.jsxs("div", { className: "topbar-right", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "dropdown", ref: H, children: [
        /* @__PURE__ */ m.jsxs(
          "button",
          {
            type: "button",
            className: "btn",
            onClick: () => O(j === "export" ? null : "export"),
            "aria-haspopup": "menu",
            "aria-expanded": j === "export",
            children: [
              /* @__PURE__ */ m.jsx(cu, { size: 15 }),
              /* @__PURE__ */ m.jsx("span", { className: "btn-label", children: "Export" }),
              /* @__PURE__ */ m.jsx(sg, { size: 13, className: `dropdown-caret ${j === "export" ? "is-open" : ""}` })
            ]
          }
        ),
        j === "export" && /* @__PURE__ */ m.jsxs("div", { className: "dropdown-menu", role: "menu", children: [
          /* @__PURE__ */ m.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: () => q("csv"), children: [
            /* @__PURE__ */ m.jsx(cu, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Export as CSV" })
          ] }),
          /* @__PURE__ */ m.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: () => q("excel"), children: [
            /* @__PURE__ */ m.jsx(og, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Export as Excel" })
          ] }),
          /* @__PURE__ */ m.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: () => q("excel_incidents_reports"), children: [
            /* @__PURE__ */ m.jsx(og, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Excel (2-Sheet)" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "dropdown", ref: R, children: [
        /* @__PURE__ */ m.jsxs(
          "button",
          {
            type: "button",
            className: "btn",
            onClick: () => O(j === "database" ? null : "database"),
            "aria-haspopup": "menu",
            "aria-expanded": j === "database",
            children: [
              /* @__PURE__ */ m.jsx(EP, { size: 15 }),
              /* @__PURE__ */ m.jsx("span", { className: "btn-label", children: "Database" }),
              /* @__PURE__ */ m.jsx(sg, { size: 13, className: `dropdown-caret ${j === "database" ? "is-open" : ""}` })
            ]
          }
        ),
        j === "database" && /* @__PURE__ */ m.jsxs("div", { className: "dropdown-menu", role: "menu", children: [
          /* @__PURE__ */ m.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: xt, children: [
            /* @__PURE__ */ m.jsx(cu, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Download All Data (CSV)" })
          ] }),
          /* @__PURE__ */ m.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: K, children: [
            /* @__PURE__ */ m.jsx(HP, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Download Database" })
          ] }),
          /* @__PURE__ */ m.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: ct, children: [
            /* @__PURE__ */ m.jsx(EM, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Upload Database" })
          ] }),
          /* @__PURE__ */ m.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: et, children: [
            /* @__PURE__ */ m.jsx(wl, { size: 14 }),
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
            /* @__PURE__ */ m.jsx(wl, { size: 15, className: t ? "spin" : "" }),
            /* @__PURE__ */ m.jsx("span", { className: "btn-label", children: "Refresh" })
          ]
        }
      ),
      /* @__PURE__ */ m.jsxs("button", { type: "button", className: "btn btn-ghost", onClick: a, "aria-label": "Logout", children: [
        /* @__PURE__ */ m.jsx(JP, { size: 15 }),
        /* @__PURE__ */ m.jsx("span", { className: "btn-label", children: "Logout" })
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("style", { children: `
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      ` })
  ] });
}
function HM(e) {
  const t = Number(e || 0);
  return Number.isFinite(t) ? t >= 1e3 ? t.toLocaleString("en-US") : t.toString() : "0";
}
function WM({ value: e }) {
  if (e == null) return null;
  const t = e >= 0, n = t ? CM : PM;
  return /* @__PURE__ */ m.jsxs("span", { className: `kpi-trend ${t ? "is-up" : "is-down"}`, children: [
    /* @__PURE__ */ m.jsx(n, { size: 12 }),
    Math.abs(e).toFixed(1),
    "%"
  ] });
}
function VM({ summary: e, loading: t }) {
  const n = (e == null ? void 0 : e.kpis) || e || {}, i = [
    {
      id: "total",
      label: "Total Incidents",
      value: n.total_incidents ?? 0,
      trend: n.trend_incidents,
      icon: lM,
      tone: "primary",
      hint: "All tracked events"
    },
    {
      id: "high",
      label: "High Risk",
      value: n.high_risk_count ?? n.high_risk ?? 0,
      trend: n.trend_high_risk,
      icon: DP,
      tone: "danger",
      hint: "Risk score above 80"
    },
    {
      id: "states",
      label: "States Affected",
      value: n.states_affected ?? n.states_active ?? 0,
      trend: n.trend_states,
      icon: My,
      tone: "default",
      hint: "With recent activity"
    },
    {
      id: "species",
      label: "Species Impacted",
      value: n.species_impacted ?? n.species_tracked ?? 0,
      trend: n.trend_species,
      icon: IP,
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
          /* @__PURE__ */ m.jsx("div", { className: "kpi-value", children: HM(a) }),
          /* @__PURE__ */ m.jsx(WM, { value: c })
        ] }),
        /* @__PURE__ */ m.jsx("div", { className: "kpi-meta", children: p })
      ]
    },
    r
  )) });
}
var gh = { exports: {} };
/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
(function(e, t) {
  (function(n, i) {
    i(t);
  })(ox, function(n) {
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
    function A(s) {
      return window["webkit" + s] || window["moz" + s] || window["ms" + s];
    }
    var j = 0;
    function O(s) {
      var l = +/* @__PURE__ */ new Date(), h = Math.max(0, 16 - (l - j));
      return j = l + h, window.setTimeout(s, h);
    }
    var H = window.requestAnimationFrame || A("RequestAnimationFrame") || O, R = window.cancelAnimationFrame || A("CancelAnimationFrame") || A("CancelRequestAnimationFrame") || function(s) {
      window.clearTimeout(s);
    };
    function V(s, l, h) {
      if (h && H === O)
        s.call(l);
      else
        return H.call(window, a(s, l));
    }
    function q(s) {
      s && R.call(window, s);
    }
    var xt = {
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
      cancelFn: R,
      requestAnimFrame: V,
      cancelAnimFrame: q
    };
    function K() {
    }
    K.extend = function(s) {
      var l = function() {
        w(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
      }, h = l.__super__ = this.prototype, f = o(h);
      f.constructor = l, l.prototype = f;
      for (var _ in this)
        Object.prototype.hasOwnProperty.call(this, _) && _ !== "prototype" && _ !== "__super__" && (l[_] = this[_]);
      return s.statics && r(l, s.statics), s.includes && (ct(s.includes), r.apply(null, [f].concat(s.includes))), r(f, s), delete f.statics, delete f.includes, f.options && (f.options = h.options ? o(h.options) : {}, r(f.options, s.options)), f._initHooks = [], f.callInitHooks = function() {
        if (!this._initHooksCalled) {
          h.callInitHooks && h.callInitHooks.call(this), this._initHooksCalled = !0;
          for (var x = 0, C = f._initHooks.length; x < C; x++)
            f._initHooks[x].call(this);
        }
      }, l;
    }, K.include = function(s) {
      var l = this.prototype.options;
      return r(this.prototype, s), s.options && (this.prototype.options = l, this.mergeOptions(s.options)), this;
    }, K.mergeOptions = function(s) {
      return r(this.prototype.options, s), this;
    }, K.addInitHook = function(s) {
      var l = Array.prototype.slice.call(arguments, 1), h = typeof s == "function" ? s : function() {
        this[s].apply(this, l);
      };
      return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(h), this;
    };
    function ct(s) {
      if (!(typeof L > "u" || !L || !L.Mixin)) {
        s = P(s) ? s : [s];
        for (var l = 0; l < s.length; l++)
          s[l] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
      }
    }
    var et = {
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
    et.addEventListener = et.on, et.removeEventListener = et.clearAllEventListeners = et.off, et.addOneTimeEventListener = et.once, et.fireEvent = et.fire, et.hasEventListeners = et.listens;
    var st = K.extend(et);
    function I(s, l, h) {
      this.x = h ? Math.round(s) : s, this.y = h ? Math.round(l) : l;
    }
    var Z = Math.trunc || function(s) {
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
        return this.clone()._add(F(s));
      },
      _add: function(s) {
        return this.x += s.x, this.y += s.y, this;
      },
      // @method subtract(otherPoint: Point): Point
      // Returns the result of subtraction of the given point from the current.
      subtract: function(s) {
        return this.clone()._subtract(F(s));
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
        return this.x = Z(this.x), this.y = Z(this.y), this;
      },
      // @method distanceTo(otherPoint: Point): Number
      // Returns the cartesian distance between the current and the given points.
      distanceTo: function(s) {
        s = F(s);
        var l = s.x - this.x, h = s.y - this.y;
        return Math.sqrt(l * l + h * h);
      },
      // @method equals(otherPoint: Point): Boolean
      // Returns `true` if the given point has the same coordinates.
      equals: function(s) {
        return s = F(s), s.x === this.x && s.y === this.y;
      },
      // @method contains(otherPoint: Point): Boolean
      // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
      contains: function(s) {
        return s = F(s), Math.abs(s.x) <= Math.abs(this.x) && Math.abs(s.y) <= Math.abs(this.y);
      },
      // @method toString(): String
      // Returns a string representation of the point for debugging purposes.
      toString: function() {
        return "Point(" + v(this.x) + ", " + v(this.y) + ")";
      }
    };
    function F(s, l, h) {
      return s instanceof I ? s : P(s) ? new I(s[0], s[1]) : s == null ? s : typeof s == "object" && "x" in s && "y" in s ? new I(s.x, s.y) : new I(s, l, h);
    }
    function G(s, l) {
      if (s)
        for (var h = l ? [s, l] : s, f = 0, _ = h.length; f < _; f++)
          this.extend(h[f]);
    }
    G.prototype = {
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
          l = h = F(s);
        else if (s = rt(s), l = s.min, h = s.max, !l || !h)
          return this;
        return !this.min && !this.max ? (this.min = l.clone(), this.max = h.clone()) : (this.min.x = Math.min(l.x, this.min.x), this.max.x = Math.max(h.x, this.max.x), this.min.y = Math.min(l.y, this.min.y), this.max.y = Math.max(h.y, this.max.y)), this;
      },
      // @method getCenter(round?: Boolean): Point
      // Returns the center point of the bounds.
      getCenter: function(s) {
        return F(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          s
        );
      },
      // @method getBottomLeft(): Point
      // Returns the bottom-left point of the bounds.
      getBottomLeft: function() {
        return F(this.min.x, this.max.y);
      },
      // @method getTopRight(): Point
      // Returns the top-right point of the bounds.
      getTopRight: function() {
        return F(this.max.x, this.min.y);
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
        return typeof s[0] == "number" || s instanceof I ? s = F(s) : s = rt(s), s instanceof G ? (l = s.min, h = s.max) : l = h = s, l.x >= this.min.x && h.x <= this.max.x && l.y >= this.min.y && h.y <= this.max.y;
      },
      // @method intersects(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds
      // intersect if they have at least one point in common.
      intersects: function(s) {
        s = rt(s);
        var l = this.min, h = this.max, f = s.min, _ = s.max, x = _.x >= l.x && f.x <= h.x, C = _.y >= l.y && f.y <= h.y;
        return x && C;
      },
      // @method overlaps(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds
      // overlap if their intersection is an area.
      overlaps: function(s) {
        s = rt(s);
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
        return rt(
          F(l.x - f, l.y - _),
          F(h.x + f, h.y + _)
        );
      },
      // @method equals(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle is equivalent to the given bounds.
      equals: function(s) {
        return s ? (s = rt(s), this.min.equals(s.getTopLeft()) && this.max.equals(s.getBottomRight())) : !1;
      }
    };
    function rt(s, l) {
      return !s || s instanceof G ? s : new G(s, l);
    }
    function _t(s, l) {
      if (s)
        for (var h = l ? [s, l] : s, f = 0, _ = h.length; f < _; f++)
          this.extend(h[f]);
    }
    _t.prototype = {
      // @method extend(latlng: LatLng): this
      // Extend the bounds to contain the given point
      // @alternative
      // @method extend(otherBounds: LatLngBounds): this
      // Extend the bounds to contain the given bounds
      extend: function(s) {
        var l = this._southWest, h = this._northEast, f, _;
        if (s instanceof lt)
          f = s, _ = s;
        else if (s instanceof _t) {
          if (f = s._southWest, _ = s._northEast, !f || !_)
            return this;
        } else
          return s ? this.extend(J(s) || dt(s)) : this;
        return !l && !h ? (this._southWest = new lt(f.lat, f.lng), this._northEast = new lt(_.lat, _.lng)) : (l.lat = Math.min(f.lat, l.lat), l.lng = Math.min(f.lng, l.lng), h.lat = Math.max(_.lat, h.lat), h.lng = Math.max(_.lng, h.lng)), this;
      },
      // @method pad(bufferRatio: Number): LatLngBounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(s) {
        var l = this._southWest, h = this._northEast, f = Math.abs(l.lat - h.lat) * s, _ = Math.abs(l.lng - h.lng) * s;
        return new _t(
          new lt(l.lat - f, l.lng - _),
          new lt(h.lat + f, h.lng + _)
        );
      },
      // @method getCenter(): LatLng
      // Returns the center point of the bounds.
      getCenter: function() {
        return new lt(
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
        return new lt(this.getNorth(), this.getWest());
      },
      // @method getSouthEast(): LatLng
      // Returns the south-east point of the bounds.
      getSouthEast: function() {
        return new lt(this.getSouth(), this.getEast());
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
        typeof s[0] == "number" || s instanceof lt || "lat" in s ? s = J(s) : s = dt(s);
        var l = this._southWest, h = this._northEast, f, _;
        return s instanceof _t ? (f = s.getSouthWest(), _ = s.getNorthEast()) : f = _ = s, f.lat >= l.lat && _.lat <= h.lat && f.lng >= l.lng && _.lng <= h.lng;
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
      return s instanceof _t ? s : new _t(s, l);
    }
    function lt(s, l, h) {
      if (isNaN(s) || isNaN(l))
        throw new Error("Invalid LatLng object: (" + s + ", " + l + ")");
      this.lat = +s, this.lng = +l, h !== void 0 && (this.alt = +h);
    }
    lt.prototype = {
      // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
      // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(s, l) {
        if (!s)
          return !1;
        s = J(s);
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
        return we.distance(this, J(s));
      },
      // @method wrap(): LatLng
      // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
      wrap: function() {
        return we.wrapLatLng(this);
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
        return new lt(this.lat, this.lng, this.alt);
      }
    };
    function J(s, l, h) {
      return s instanceof lt ? s : P(s) && typeof s[0] != "object" ? s.length === 3 ? new lt(s[0], s[1], s[2]) : s.length === 2 ? new lt(s[0], s[1]) : null : s == null ? s : typeof s == "object" && "lat" in s ? new lt(s.lat, "lng" in s ? s.lng : s.lon, s.alt) : l === void 0 ? null : new lt(s, l, h);
    }
    var Qt = {
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
        return new G(f, _);
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
        return new lt(h, l, f);
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring
      // that its center is within the CRS's bounds.
      // Only accepts actual `L.LatLngBounds` instances, not arrays.
      wrapLatLngBounds: function(s) {
        var l = s.getCenter(), h = this.wrapLatLng(l), f = l.lat - h.lat, _ = l.lng - h.lng;
        if (f === 0 && _ === 0)
          return s;
        var x = s.getSouthWest(), C = s.getNorthEast(), E = new lt(x.lat - f, x.lng - _), z = new lt(C.lat - f, C.lng - _);
        return new _t(E, z);
      }
    }, we = r({}, Qt, {
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
    }), xn = 6378137, wn = {
      R: xn,
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
        return new lt(
          (2 * Math.atan(Math.exp(s.y / this.R)) - Math.PI / 2) * l,
          s.x * l / this.R
        );
      },
      bounds: function() {
        var s = xn * Math.PI;
        return new G([-s, -s], [s, s]);
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
    function xi(s, l, h, f) {
      return new $s(s, l, h, f);
    }
    var Ys = r({}, we, {
      code: "EPSG:3857",
      projection: wn,
      transformation: function() {
        var s = 0.5 / (Math.PI * wn.R);
        return xi(s, 0.5, -s, 0.5);
      }()
    }), Mo = r({}, Ys, {
      code: "EPSG:900913"
    });
    function qs(s) {
      return document.createElementNS("http://www.w3.org/2000/svg", s);
    }
    function Ks(s, l) {
      var h = "", f, _, x, C, E, z;
      for (f = 0, x = s.length; f < x; f++) {
        for (E = s[f], _ = 0, C = E.length; _ < C; _++)
          z = E[_], h += (_ ? "L" : "M") + z.x + " " + z.y;
        h += l ? X.svg ? "z" : "x" : "";
      }
      return h || "M0 0";
    }
    var Xs = document.documentElement.style, Gi = "ActiveXObject" in window, Yl = Gi && !document.addEventListener, Co = "msLaunchUri" in navigator && !("documentMode" in document), Gs = on("webkit"), Qs = on("android"), Q = on("android 2") || on("android 3"), tt = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), it = Qs && on("Google") && tt < 537 && !("AudioNode" in window), Ft = !!window.opera, Yt = !Co && on("chrome"), Jt = on("gecko") && !Gs && !Ft && !Gi, le = !Yt && on("safari"), wt = on("phantom"), ie = "OTransition" in Xs, ce = navigator.platform.indexOf("Win") === 0, Wn = Gi && "transition" in Xs, ql = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !Q, Nd = "MozPerspective" in Xs, By = !window.L_DISABLE_3D && (Wn || ql || Nd) && !ie && !wt, Js = typeof orientation < "u" || on("mobile"), Hy = Js && Gs, Wy = Js && ql, Ed = !window.PointerEvent && window.MSPointerEvent, zd = !!(window.PointerEvent || Ed), jd = "ontouchstart" in window || !!window.TouchEvent, Vy = !window.L_NO_TOUCH && (jd || zd), Zy = Js && Ft, Uy = Js && Jt, $y = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Yy = function() {
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
    }(), qy = function() {
      return !!document.createElement("canvas").getContext;
    }(), Kl = !!(document.createElementNS && qs("svg").createSVGRect), Ky = !!Kl && function() {
      var s = document.createElement("div");
      return s.innerHTML = "<svg/>", (s.firstChild && s.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
    }(), Xy = !Kl && function() {
      try {
        var s = document.createElement("div");
        s.innerHTML = '<v:shape adj="1"/>';
        var l = s.firstChild;
        return l.style.behavior = "url(#default#VML)", l && typeof l.adj == "object";
      } catch {
        return !1;
      }
    }(), Gy = navigator.platform.indexOf("Mac") === 0, Qy = navigator.platform.indexOf("Linux") === 0;
    function on(s) {
      return navigator.userAgent.toLowerCase().indexOf(s) >= 0;
    }
    var X = {
      ie: Gi,
      ielt9: Yl,
      edge: Co,
      webkit: Gs,
      android: Qs,
      android23: Q,
      androidStock: it,
      opera: Ft,
      chrome: Yt,
      gecko: Jt,
      safari: le,
      phantom: wt,
      opera12: ie,
      win: ce,
      ie3d: Wn,
      webkit3d: ql,
      gecko3d: Nd,
      any3d: By,
      mobile: Js,
      mobileWebkit: Hy,
      mobileWebkit3d: Wy,
      msPointer: Ed,
      pointer: zd,
      touch: Vy,
      touchNative: jd,
      mobileOpera: Zy,
      mobileGecko: Uy,
      retina: $y,
      passiveEvents: Yy,
      canvas: qy,
      svg: Kl,
      vml: Xy,
      inlineSvg: Ky,
      mac: Gy,
      linux: Qy
    }, Od = X.msPointer ? "MSPointerDown" : "pointerdown", Ad = X.msPointer ? "MSPointerMove" : "pointermove", Id = X.msPointer ? "MSPointerUp" : "pointerup", Rd = X.msPointer ? "MSPointerCancel" : "pointercancel", Xl = {
      touchstart: Od,
      touchmove: Ad,
      touchend: Id,
      touchcancel: Rd
    }, Dd = {
      touchstart: s0,
      touchmove: Lo,
      touchend: Lo,
      touchcancel: Lo
    }, Qi = {}, Fd = !1;
    function Jy(s, l, h) {
      return l === "touchstart" && i0(), Dd[l] ? (h = Dd[l].bind(this, h), s.addEventListener(Xl[l], h, !1), h) : (console.warn("wrong event specified:", l), g);
    }
    function t0(s, l, h) {
      if (!Xl[l]) {
        console.warn("wrong event specified:", l);
        return;
      }
      s.removeEventListener(Xl[l], h, !1);
    }
    function e0(s) {
      Qi[s.pointerId] = s;
    }
    function n0(s) {
      Qi[s.pointerId] && (Qi[s.pointerId] = s);
    }
    function Bd(s) {
      delete Qi[s.pointerId];
    }
    function i0() {
      Fd || (document.addEventListener(Od, e0, !0), document.addEventListener(Ad, n0, !0), document.addEventListener(Id, Bd, !0), document.addEventListener(Rd, Bd, !0), Fd = !0);
    }
    function Lo(s, l) {
      if (l.pointerType !== (l.MSPOINTER_TYPE_MOUSE || "mouse")) {
        l.touches = [];
        for (var h in Qi)
          l.touches.push(Qi[h]);
        l.changedTouches = [l], s(l);
      }
    }
    function s0(s, l) {
      l.MSPOINTER_TYPE_TOUCH && l.pointerType === l.MSPOINTER_TYPE_TOUCH && se(l), Lo(s, l);
    }
    function r0(s) {
      var l = {}, h, f;
      for (f in s)
        h = s[f], l[f] = h && h.bind ? h.bind(s) : h;
      return s = l, l.type = "dblclick", l.detail = 2, l.isTrusted = !1, l._simulated = !0, l;
    }
    var o0 = 200;
    function a0(s, l) {
      s.addEventListener("dblclick", l);
      var h = 0, f;
      function _(x) {
        if (x.detail !== 1) {
          f = x.detail;
          return;
        }
        if (!(x.pointerType === "mouse" || x.sourceCapabilities && !x.sourceCapabilities.firesTouchEvents)) {
          var C = Ud(x);
          if (!(C.some(function(z) {
            return z instanceof HTMLLabelElement && z.attributes.for;
          }) && !C.some(function(z) {
            return z instanceof HTMLInputElement || z instanceof HTMLSelectElement;
          }))) {
            var E = Date.now();
            E - h <= o0 ? (f++, f === 2 && l(r0(x))) : f = 1, h = E;
          }
        }
      }
      return s.addEventListener("click", _), {
        dblclick: l,
        simDblclick: _
      };
    }
    function l0(s, l) {
      s.removeEventListener("dblclick", l.dblclick), s.removeEventListener("click", l.simDblclick);
    }
    var Gl = Eo(
      ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
    ), tr = Eo(
      ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
    ), Hd = tr === "webkitTransition" || tr === "OTransition" ? tr + "End" : "transitionend";
    function Wd(s) {
      return typeof s == "string" ? document.getElementById(s) : s;
    }
    function er(s, l) {
      var h = s.style[l] || s.currentStyle && s.currentStyle[l];
      if ((!h || h === "auto") && document.defaultView) {
        var f = document.defaultView.getComputedStyle(s, null);
        h = f ? f[l] : null;
      }
      return h === "auto" ? null : h;
    }
    function yt(s, l, h) {
      var f = document.createElement(s);
      return f.className = l || "", h && h.appendChild(f), f;
    }
    function jt(s) {
      var l = s.parentNode;
      l && l.removeChild(s);
    }
    function To(s) {
      for (; s.firstChild; )
        s.removeChild(s.firstChild);
    }
    function Ji(s) {
      var l = s.parentNode;
      l && l.lastChild !== s && l.appendChild(s);
    }
    function ts(s) {
      var l = s.parentNode;
      l && l.firstChild !== s && l.insertBefore(s, l.firstChild);
    }
    function Ql(s, l) {
      if (s.classList !== void 0)
        return s.classList.contains(l);
      var h = No(s);
      return h.length > 0 && new RegExp("(^|\\s)" + l + "(\\s|$)").test(h);
    }
    function ut(s, l) {
      if (s.classList !== void 0)
        for (var h = S(l), f = 0, _ = h.length; f < _; f++)
          s.classList.add(h[f]);
      else if (!Ql(s, l)) {
        var x = No(s);
        Jl(s, (x ? x + " " : "") + l);
      }
    }
    function Bt(s, l) {
      s.classList !== void 0 ? s.classList.remove(l) : Jl(s, y((" " + No(s) + " ").replace(" " + l + " ", " ")));
    }
    function Jl(s, l) {
      s.className.baseVal === void 0 ? s.className = l : s.className.baseVal = l;
    }
    function No(s) {
      return s.correspondingElement && (s = s.correspondingElement), s.className.baseVal === void 0 ? s.className : s.className.baseVal;
    }
    function Fe(s, l) {
      "opacity" in s.style ? s.style.opacity = l : "filter" in s.style && c0(s, l);
    }
    function c0(s, l) {
      var h = !1, f = "DXImageTransform.Microsoft.Alpha";
      try {
        h = s.filters.item(f);
      } catch {
        if (l === 1)
          return;
      }
      l = Math.round(l * 100), h ? (h.Enabled = l !== 100, h.Opacity = l) : s.style.filter += " progid:" + f + "(opacity=" + l + ")";
    }
    function Eo(s) {
      for (var l = document.documentElement.style, h = 0; h < s.length; h++)
        if (s[h] in l)
          return s[h];
      return !1;
    }
    function wi(s, l, h) {
      var f = l || new I(0, 0);
      s.style[Gl] = (X.ie3d ? "translate(" + f.x + "px," + f.y + "px)" : "translate3d(" + f.x + "px," + f.y + "px,0)") + (h ? " scale(" + h + ")" : "");
    }
    function Zt(s, l) {
      s._leaflet_pos = l, X.any3d ? wi(s, l) : (s.style.left = l.x + "px", s.style.top = l.y + "px");
    }
    function bi(s) {
      return s._leaflet_pos || new I(0, 0);
    }
    var nr, ir, tc;
    if ("onselectstart" in document)
      nr = function() {
        at(window, "selectstart", se);
      }, ir = function() {
        Ct(window, "selectstart", se);
      };
    else {
      var sr = Eo(
        ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
      );
      nr = function() {
        if (sr) {
          var s = document.documentElement.style;
          tc = s[sr], s[sr] = "none";
        }
      }, ir = function() {
        sr && (document.documentElement.style[sr] = tc, tc = void 0);
      };
    }
    function ec() {
      at(window, "dragstart", se);
    }
    function nc() {
      Ct(window, "dragstart", se);
    }
    var zo, ic;
    function sc(s) {
      for (; s.tabIndex === -1; )
        s = s.parentNode;
      s.style && (jo(), zo = s, ic = s.style.outlineStyle, s.style.outlineStyle = "none", at(window, "keydown", jo));
    }
    function jo() {
      zo && (zo.style.outlineStyle = ic, zo = void 0, ic = void 0, Ct(window, "keydown", jo));
    }
    function Vd(s) {
      do
        s = s.parentNode;
      while ((!s.offsetWidth || !s.offsetHeight) && s !== document.body);
      return s;
    }
    function rc(s) {
      var l = s.getBoundingClientRect();
      return {
        x: l.width / s.offsetWidth || 1,
        y: l.height / s.offsetHeight || 1,
        boundingClientRect: l
      };
    }
    var u0 = {
      __proto__: null,
      TRANSFORM: Gl,
      TRANSITION: tr,
      TRANSITION_END: Hd,
      get: Wd,
      getStyle: er,
      create: yt,
      remove: jt,
      empty: To,
      toFront: Ji,
      toBack: ts,
      hasClass: Ql,
      addClass: ut,
      removeClass: Bt,
      setClass: Jl,
      getClass: No,
      setOpacity: Fe,
      testProp: Eo,
      setTransform: wi,
      setPosition: Zt,
      getPosition: bi,
      get disableTextSelection() {
        return nr;
      },
      get enableTextSelection() {
        return ir;
      },
      disableImageDrag: ec,
      enableImageDrag: nc,
      preventOutline: sc,
      restoreOutline: jo,
      getSizedParentNode: Vd,
      getScale: rc
    };
    function at(s, l, h, f) {
      if (l && typeof l == "object")
        for (var _ in l)
          ac(s, _, l[_], h);
      else {
        l = S(l);
        for (var x = 0, C = l.length; x < C; x++)
          ac(s, l[x], h, f);
      }
      return this;
    }
    var an = "_leaflet_events";
    function Ct(s, l, h, f) {
      if (arguments.length === 1)
        Zd(s), delete s[an];
      else if (l && typeof l == "object")
        for (var _ in l)
          lc(s, _, l[_], h);
      else if (l = S(l), arguments.length === 2)
        Zd(s, function(E) {
          return T(l, E) !== -1;
        });
      else
        for (var x = 0, C = l.length; x < C; x++)
          lc(s, l[x], h, f);
      return this;
    }
    function Zd(s, l) {
      for (var h in s[an]) {
        var f = h.split(/\d/)[0];
        (!l || l(f)) && lc(s, f, null, null, h);
      }
    }
    var oc = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      wheel: !("onwheel" in window) && "mousewheel"
    };
    function ac(s, l, h, f) {
      var _ = l + u(h) + (f ? "_" + u(f) : "");
      if (s[an] && s[an][_])
        return this;
      var x = function(E) {
        return h.call(f || s, E || window.event);
      }, C = x;
      !X.touchNative && X.pointer && l.indexOf("touch") === 0 ? x = Jy(s, l, x) : X.touch && l === "dblclick" ? x = a0(s, x) : "addEventListener" in s ? l === "touchstart" || l === "touchmove" || l === "wheel" || l === "mousewheel" ? s.addEventListener(oc[l] || l, x, X.passiveEvents ? { passive: !1 } : !1) : l === "mouseenter" || l === "mouseleave" ? (x = function(E) {
        E = E || window.event, uc(s, E) && C(E);
      }, s.addEventListener(oc[l], x, !1)) : s.addEventListener(l, C, !1) : s.attachEvent("on" + l, x), s[an] = s[an] || {}, s[an][_] = x;
    }
    function lc(s, l, h, f, _) {
      _ = _ || l + u(h) + (f ? "_" + u(f) : "");
      var x = s[an] && s[an][_];
      if (!x)
        return this;
      !X.touchNative && X.pointer && l.indexOf("touch") === 0 ? t0(s, l, x) : X.touch && l === "dblclick" ? l0(s, x) : "removeEventListener" in s ? s.removeEventListener(oc[l] || l, x, !1) : s.detachEvent("on" + l, x), s[an][_] = null;
    }
    function ki(s) {
      return s.stopPropagation ? s.stopPropagation() : s.originalEvent ? s.originalEvent._stopped = !0 : s.cancelBubble = !0, this;
    }
    function cc(s) {
      return ac(s, "wheel", ki), this;
    }
    function rr(s) {
      return at(s, "mousedown touchstart dblclick contextmenu", ki), s._leaflet_disable_click = !0, this;
    }
    function se(s) {
      return s.preventDefault ? s.preventDefault() : s.returnValue = !1, this;
    }
    function Si(s) {
      return se(s), ki(s), this;
    }
    function Ud(s) {
      if (s.composedPath)
        return s.composedPath();
      for (var l = [], h = s.target; h; )
        l.push(h), h = h.parentNode;
      return l;
    }
    function $d(s, l) {
      if (!l)
        return new I(s.clientX, s.clientY);
      var h = rc(l), f = h.boundingClientRect;
      return new I(
        // offset.left/top values are in page scale (like clientX/Y),
        // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
        (s.clientX - f.left) / h.x - l.clientLeft,
        (s.clientY - f.top) / h.y - l.clientTop
      );
    }
    var h0 = X.linux && X.chrome ? window.devicePixelRatio : X.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
    function Yd(s) {
      return X.edge ? s.wheelDeltaY / 2 : (
        // Don't trust window-geometry-based delta
        s.deltaY && s.deltaMode === 0 ? -s.deltaY / h0 : (
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
    function uc(s, l) {
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
    var d0 = {
      __proto__: null,
      on: at,
      off: Ct,
      stopPropagation: ki,
      disableScrollPropagation: cc,
      disableClickPropagation: rr,
      preventDefault: se,
      stop: Si,
      getPropagationPath: Ud,
      getMousePosition: $d,
      getWheelDelta: Yd,
      isExternalTarget: uc,
      addListener: at,
      removeListener: Ct
    }, qd = st.extend({
      // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
      // Run an animation of a given element to a new position, optionally setting
      // duration in seconds (`0.25` by default) and easing linearity factor (3rd
      // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
      // `0.5` by default).
      run: function(s, l, h, f) {
        this.stop(), this._el = s, this._inProgress = !0, this._duration = h || 0.25, this._easeOutPower = 1 / Math.max(f || 0.5, 0.2), this._startPos = bi(s), this._offset = l.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
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
        q(this._animId), this._inProgress = !1, this.fire("end");
      },
      _easeOut: function(s) {
        return 1 - Math.pow(1 - s, this._easeOutPower);
      }
    }), gt = st.extend({
      options: {
        // @section Map State Options
        // @option crs: CRS = L.CRS.EPSG3857
        // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
        // sure what it means.
        crs: Ys,
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
        l = w(this, l), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(s), this._initLayout(), this._onResize = a(this._onResize, this), this._initEvents(), l.maxBounds && this.setMaxBounds(l.maxBounds), l.zoom !== void 0 && (this._zoom = this._limitZoom(l.zoom)), l.center && l.zoom !== void 0 && this.setView(J(l.center), l.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = tr && X.any3d && !X.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), at(this._proxy, Hd, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
      },
      // @section Methods for modifying map state
      // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) with the given
      // animation options.
      setView: function(s, l, h) {
        if (l = l === void 0 ? this._zoom : this._limitZoom(l), s = this._limitCenter(J(s), l, this.options.maxBounds), h = h || {}, this._stop(), this._loaded && !h.reset && h !== !0) {
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
        return s = s || (X.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + s, l);
      },
      // @method zoomOut(delta?: Number, options?: Zoom options): this
      // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomOut: function(s, l) {
        return s = s || (X.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - s, l);
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
        var h = F(l.paddingTopLeft || l.padding || [0, 0]), f = F(l.paddingBottomRight || l.padding || [0, 0]), _ = this.getBoundsZoom(s, !1, h.add(f));
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
        if (s = F(s).round(), l = l || {}, !s.x && !s.y)
          return this.fire("moveend");
        if (l.animate !== !0 && !this.getSize().contains(s))
          return this._resetView(this.unproject(this.project(this.getCenter()).add(s)), this.getZoom()), this;
        if (this._panAnim || (this._panAnim = new qd(), this._panAnim.on({
          step: this._onPanTransitionStep,
          end: this._onPanTransitionEnd
        }, this)), l.noMoveStart || this.fire("movestart"), l.animate !== !1) {
          ut(this._mapPane, "leaflet-pan-anim");
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
        if (h = h || {}, h.animate === !1 || !X.any3d)
          return this.setView(s, l, h);
        this._stop();
        var f = this.project(this.getCenter()), _ = this.project(s), x = this.getSize(), C = this._zoom;
        s = J(s), l = l === void 0 ? C : l;
        var E = Math.max(x.x, x.y), z = E * this.getZoomScale(C, l), D = _.distanceTo(f) || 1, U = 1.42, nt = U * U;
        function ft(Ut) {
          var Uo = Ut ? -1 : 1, tx = Ut ? z : E, ex = z * z - E * E + Uo * nt * nt * D * D, nx = 2 * tx * nt * D, wc = ex / nx, Tf = Math.sqrt(wc * wc + 1) - wc, ix = Tf < 1e-9 ? -18 : Math.log(Tf);
          return ix;
        }
        function ge(Ut) {
          return (Math.exp(Ut) - Math.exp(-Ut)) / 2;
        }
        function te(Ut) {
          return (Math.exp(Ut) + Math.exp(-Ut)) / 2;
        }
        function He(Ut) {
          return ge(Ut) / te(Ut);
        }
        var be = ft(0);
        function os(Ut) {
          return E * (te(be) / te(be + U * Ut));
        }
        function X0(Ut) {
          return E * (te(be) * He(be + U * Ut) - ge(be)) / nt;
        }
        function G0(Ut) {
          return 1 - Math.pow(1 - Ut, 1.5);
        }
        var Q0 = Date.now(), Cf = (ft(1) - be) / U, J0 = h.duration ? 1e3 * h.duration : 1e3 * Cf * 0.8;
        function Lf() {
          var Ut = (Date.now() - Q0) / J0, Uo = G0(Ut) * Cf;
          Ut <= 1 ? (this._flyToFrame = V(Lf, this), this._move(
            this.unproject(f.add(_.subtract(f).multiplyBy(X0(Uo) / D)), C),
            this.getScaleZoom(E / os(Uo), C),
            { flyTo: !0 }
          )) : this._move(s, l)._moveEnd(!0);
        }
        return this._moveStart(!0, h.noMoveStart), Lf.call(this), this;
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
        var h = F(l.paddingTopLeft || l.padding || [0, 0]), f = F(l.paddingBottomRight || l.padding || [0, 0]), _ = this.project(this.getCenter()), x = this.project(s), C = this.getPixelBounds(), E = rt([C.min.add(h), C.max.subtract(f)]), z = E.getSize();
        if (!E.contains(x)) {
          this._enforcingBounds = !0;
          var D = x.subtract(E.getCenter()), U = E.extend(x).getSize().subtract(z);
          _.x += D.x < 0 ? -U.x : U.x, _.y += D.y < 0 ? -U.y : U.y, this.panTo(this.unproject(_), l), this._enforcingBounds = !1;
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
          var l = s.coords.latitude, h = s.coords.longitude, f = new lt(l, h), _ = f.toBounds(s.coords.accuracy * 2), x = this._locateOptions;
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
        this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), jt(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (q(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
        var s;
        for (s in this._layers)
          this._layers[s].remove();
        for (s in this._panes)
          jt(this._panes[s]);
        return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this;
      },
      // @section Other Methods
      // @method createPane(name: String, container?: HTMLElement): HTMLElement
      // Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
      // then returns it. The pane is created as a child of `container`, or
      // as a child of the main map pane if not set.
      createPane: function(s, l) {
        var h = "leaflet-pane" + (s ? " leaflet-" + s.replace("Pane", "") + "-pane" : ""), f = yt("div", h, l || this._mapPane);
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
        return new _t(l, h);
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
        s = dt(s), h = F(h || [0, 0]);
        var f = this.getZoom() || 0, _ = this.getMinZoom(), x = this.getMaxZoom(), C = s.getNorthWest(), E = s.getSouthEast(), z = this.getSize().subtract(h), D = rt(this.project(E, f), this.project(C, f)).getSize(), U = X.any3d ? this.options.zoomSnap : 1, nt = z.x / D.x, ft = z.y / D.y, ge = l ? Math.max(nt, ft) : Math.min(nt, ft);
        return f = this.getScaleZoom(ge, f), U && (f = Math.round(f / (U / 100)) * (U / 100), f = l ? Math.ceil(f / U) * U : Math.floor(f / U) * U), Math.max(_, Math.min(x, f));
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
        return new G(h, h.add(this.getSize()));
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
        return l = l === void 0 ? this._zoom : l, this.options.crs.latLngToPoint(J(s), l);
      },
      // @method unproject(point: Point, zoom: Number): LatLng
      // Inverse of [`project`](#map-project).
      unproject: function(s, l) {
        return l = l === void 0 ? this._zoom : l, this.options.crs.pointToLatLng(F(s), l);
      },
      // @method layerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding geographical coordinate (for the current zoom level).
      layerPointToLatLng: function(s) {
        var l = F(s).add(this.getPixelOrigin());
        return this.unproject(l);
      },
      // @method latLngToLayerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the [origin pixel](#map-getpixelorigin).
      latLngToLayerPoint: function(s) {
        var l = this.project(J(s))._round();
        return l._subtract(this.getPixelOrigin());
      },
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
      // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
      // CRS's bounds.
      // By default this means longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees.
      wrapLatLng: function(s) {
        return this.options.crs.wrapLatLng(J(s));
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
        return this.options.crs.distance(J(s), J(l));
      },
      // @method containerPointToLayerPoint(point: Point): Point
      // Given a pixel coordinate relative to the map container, returns the corresponding
      // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
      containerPointToLayerPoint: function(s) {
        return F(s).subtract(this._getMapPanePos());
      },
      // @method layerPointToContainerPoint(point: Point): Point
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding pixel coordinate relative to the map container.
      layerPointToContainerPoint: function(s) {
        return F(s).add(this._getMapPanePos());
      },
      // @method containerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the map container, returns
      // the corresponding geographical coordinate (for the current zoom level).
      containerPointToLatLng: function(s) {
        var l = this.containerPointToLayerPoint(F(s));
        return this.layerPointToLatLng(l);
      },
      // @method latLngToContainerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the map container.
      latLngToContainerPoint: function(s) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(J(s)));
      },
      // @method mouseEventToContainerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to the
      // map container where the event took place.
      mouseEventToContainerPoint: function(s) {
        return $d(s, this._container);
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
        var l = this._container = Wd(s);
        if (l) {
          if (l._leaflet_id)
            throw new Error("Map container is already initialized.");
        } else throw new Error("Map container not found.");
        at(l, "scroll", this._onScroll, this), this._containerId = u(l);
      },
      _initLayout: function() {
        var s = this._container;
        this._fadeAnimated = this.options.fadeAnimation && X.any3d, ut(s, "leaflet-container" + (X.touch ? " leaflet-touch" : "") + (X.retina ? " leaflet-retina" : "") + (X.ielt9 ? " leaflet-oldie" : "") + (X.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
        var l = er(s, "position");
        l !== "absolute" && l !== "relative" && l !== "fixed" && l !== "sticky" && (s.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
      },
      _initPanes: function() {
        var s = this._panes = {};
        this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), Zt(this._mapPane, new I(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (ut(s.markerPane, "leaflet-zoom-hide"), ut(s.shadowPane, "leaflet-zoom-hide"));
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
        return q(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
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
        var l = s ? Ct : at;
        l(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && l(window, "resize", this._onResize, this), X.any3d && this.options.transform3DLimit && (s ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
      },
      _onResize: function() {
        q(this._resizeRequest), this._resizeRequest = V(
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
          if (f && f.listens(l, !0) && (_ && !uc(x, s) || (h.push(f), _)) || x === this._container)
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
          h === "mousedown" && sc(l), this._fireDOMEvent(s, h);
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
          l === "contextmenu" && se(s);
          var E = _[0], z = {
            originalEvent: s
          };
          if (s.type !== "keypress" && s.type !== "keydown" && s.type !== "keyup") {
            var D = E.getLatLng && (!E._radius || E._radius <= 10);
            z.containerPoint = D ? this.latLngToContainerPoint(E.getLatLng()) : this.mouseEventToContainerPoint(s), z.layerPoint = this.containerPointToLayerPoint(z.containerPoint), z.latlng = D ? E.getLatLng() : this.layerPointToLatLng(z.layerPoint);
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
        return bi(this._mapPane) || new I(0, 0);
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
        return rt([
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
        var f = this.project(s, l), _ = this.getSize().divideBy(2), x = new G(f.subtract(_), f.add(_)), C = this._getBoundsOffset(x, h, l);
        return Math.abs(C.x) <= 1 && Math.abs(C.y) <= 1 ? s : this.unproject(f.add(C), l);
      },
      // adjust offset for view to get inside bounds
      _limitOffset: function(s, l) {
        if (!l)
          return s;
        var h = this.getPixelBounds(), f = new G(h.min.add(s), h.max.add(s));
        return s.add(this._getBoundsOffset(f, l));
      },
      // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
      _getBoundsOffset: function(s, l, h) {
        var f = rt(
          this.project(l.getNorthEast(), h),
          this.project(l.getSouthWest(), h)
        ), _ = f.min.subtract(s.min), x = f.max.subtract(s.max), C = this._rebound(_.x, -x.x), E = this._rebound(_.y, -x.y);
        return new I(C, E);
      },
      _rebound: function(s, l) {
        return s + l > 0 ? Math.round(s - l) / 2 : Math.max(0, Math.ceil(s)) - Math.max(0, Math.floor(l));
      },
      _limitZoom: function(s) {
        var l = this.getMinZoom(), h = this.getMaxZoom(), f = X.any3d ? this.options.zoomSnap : 1;
        return f && (s = Math.round(s / f) * f), Math.max(l, Math.min(h, s));
      },
      _onPanTransitionStep: function() {
        this.fire("move");
      },
      _onPanTransitionEnd: function() {
        Bt(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
      },
      _tryAnimatedPan: function(s, l) {
        var h = this._getCenterOffset(s)._trunc();
        return (l && l.animate) !== !0 && !this.getSize().contains(h) ? !1 : (this.panBy(h, l), !0);
      },
      _createAnimProxy: function() {
        var s = this._proxy = yt("div", "leaflet-proxy leaflet-zoom-animated");
        this._panes.mapPane.appendChild(s), this.on("zoomanim", function(l) {
          var h = Gl, f = this._proxy.style[h];
          wi(this._proxy, this.project(l.center, l.zoom), this.getZoomScale(l.zoom, 1)), f === this._proxy.style[h] && this._animatingZoom && this._onZoomTransitionEnd();
        }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
      },
      _destroyAnimProxy: function() {
        jt(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
      },
      _animMoveEnd: function() {
        var s = this.getCenter(), l = this.getZoom();
        wi(this._proxy, this.project(s, l), this.getZoomScale(l, 1));
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
        this._mapPane && (h && (this._animatingZoom = !0, this._animateToCenter = s, this._animateToZoom = l, ut(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
          center: s,
          zoom: l,
          noUpdate: f
        }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(a(this._onZoomTransitionEnd, this), 250));
      },
      _onZoomTransitionEnd: function() {
        this._animatingZoom && (this._mapPane && Bt(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
      }
    });
    function f0(s, l) {
      return new gt(s, l);
    }
    var Ke = K.extend({
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
        return ut(l, "leaflet-control"), h.indexOf("bottom") !== -1 ? f.insertBefore(l, f.firstChild) : f.appendChild(l), this._map.on("unload", this.remove, this), this;
      },
      // @method remove: this
      // Removes the control from the map it is currently active on.
      remove: function() {
        return this._map ? (jt(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
      },
      _refocusOnMap: function(s) {
        this._map && s && s.screenX > 0 && s.screenY > 0 && this._map.getContainer().focus();
      }
    }), or = function(s) {
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
        var s = this._controlCorners = {}, l = "leaflet-", h = this._controlContainer = yt("div", l + "control-container", this._container);
        function f(_, x) {
          var C = l + _ + " " + l + x;
          s[_ + x] = yt("div", C, h);
        }
        f("top", "left"), f("top", "right"), f("bottom", "left"), f("bottom", "right");
      },
      _clearControlPos: function() {
        for (var s in this._controlCorners)
          jt(this._controlCorners[s]);
        jt(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
      }
    });
    var Kd = Ke.extend({
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
        ut(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
        var s = this._map.getSize().y - (this._container.offsetTop + 50);
        return s < this._section.clientHeight ? (ut(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = s + "px") : Bt(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
      },
      // @method collapse(): this
      // Collapse the control container if expanded.
      collapse: function() {
        return Bt(this._container, "leaflet-control-layers-expanded"), this;
      },
      _initLayout: function() {
        var s = "leaflet-control-layers", l = this._container = yt("div", s), h = this.options.collapsed;
        l.setAttribute("aria-haspopup", !0), rr(l), cc(l);
        var f = this._section = yt("section", s + "-list");
        h && (this._map.on("click", this.collapse, this), at(l, {
          mouseenter: this._expandSafely,
          mouseleave: this.collapse
        }, this));
        var _ = this._layersLink = yt("a", s + "-toggle", l);
        _.href = "#", _.title = "Layers", _.setAttribute("role", "button"), at(_, {
          keydown: function(x) {
            x.keyCode === 13 && this._expandSafely();
          },
          // Certain screen readers intercept the key event and instead send a click event
          click: function(x) {
            se(x), this._expandSafely();
          }
        }, this), h || this.expand(), this._baseLayersList = yt("div", s + "-base", f), this._separator = yt("div", s + "-separator", f), this._overlaysList = yt("div", s + "-overlays", f), l.appendChild(f);
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
        To(this._baseLayersList), To(this._overlaysList), this._layerControlInputs = [];
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
        s.overlay ? (f = document.createElement("input"), f.type = "checkbox", f.className = "leaflet-control-layers-selector", f.defaultChecked = h) : f = this._createRadioElement("leaflet-base-layers_" + u(this), h), this._layerControlInputs.push(f), f.layerId = u(s.layer), at(f, "click", this._onInputClick, this);
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
        this._preventClick = !0, at(s, "click", se), this.expand();
        var l = this;
        setTimeout(function() {
          Ct(s, "click", se), l._preventClick = !1;
        });
      }
    }), p0 = function(s, l, h) {
      return new Kd(s, l, h);
    }, hc = Ke.extend({
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
        var l = "leaflet-control-zoom", h = yt("div", l + " leaflet-bar"), f = this.options;
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
        var x = yt("a", h, f);
        return x.innerHTML = s, x.href = "#", x.title = l, x.setAttribute("role", "button"), x.setAttribute("aria-label", l), rr(x), at(x, "click", Si), at(x, "click", _, this), at(x, "click", this._refocusOnMap, this), x;
      },
      _updateDisabled: function() {
        var s = this._map, l = "leaflet-disabled";
        Bt(this._zoomInButton, l), Bt(this._zoomOutButton, l), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || s._zoom === s.getMinZoom()) && (ut(this._zoomOutButton, l), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || s._zoom === s.getMaxZoom()) && (ut(this._zoomInButton, l), this._zoomInButton.setAttribute("aria-disabled", "true"));
      }
    });
    gt.mergeOptions({
      zoomControl: !0
    }), gt.addInitHook(function() {
      this.options.zoomControl && (this.zoomControl = new hc(), this.addControl(this.zoomControl));
    });
    var m0 = function(s) {
      return new hc(s);
    }, Xd = Ke.extend({
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
        var l = "leaflet-control-scale", h = yt("div", l), f = this.options;
        return this._addScales(f, l + "-line", h), s.on(f.updateWhenIdle ? "moveend" : "move", this._update, this), s.whenReady(this._update, this), h;
      },
      onRemove: function(s) {
        s.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
      },
      _addScales: function(s, l, h) {
        s.metric && (this._mScale = yt("div", l, h)), s.imperial && (this._iScale = yt("div", l, h));
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
    }), g0 = function(s) {
      return new Xd(s);
    }, _0 = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', dc = Ke.extend({
      // @section
      // @aka Control.Attribution options
      options: {
        position: "bottomright",
        // @option prefix: String|false = 'Leaflet'
        // The HTML text shown before the attributions. Pass `false` to disable.
        prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (X.inlineSvg ? _0 + " " : "") + "Leaflet</a>"
      },
      initialize: function(s) {
        w(this, s), this._attributions = {};
      },
      onAdd: function(s) {
        s.attributionControl = this, this._container = yt("div", "leaflet-control-attribution"), rr(this._container);
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
      this.options.attributionControl && new dc().addTo(this);
    });
    var v0 = function(s) {
      return new dc(s);
    };
    Ke.Layers = Kd, Ke.Zoom = hc, Ke.Scale = Xd, Ke.Attribution = dc, or.layers = p0, or.zoom = m0, or.scale = g0, or.attribution = v0;
    var ln = K.extend({
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
    var y0 = { Events: et }, Gd = X.touch ? "touchstart mousedown" : "mousedown", Vn = st.extend({
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
        this._enabled || (at(this._dragStartTarget, Gd, this._onDown, this), this._enabled = !0);
      },
      // @method disable()
      // Disables the dragging ability
      disable: function() {
        this._enabled && (Vn._dragging === this && this.finishDrag(!0), Ct(this._dragStartTarget, Gd, this._onDown, this), this._enabled = !1, this._moved = !1);
      },
      _onDown: function(s) {
        if (this._enabled && (this._moved = !1, !Ql(this._element, "leaflet-zoom-anim"))) {
          if (s.touches && s.touches.length !== 1) {
            Vn._dragging === this && this.finishDrag();
            return;
          }
          if (!(Vn._dragging || s.shiftKey || s.which !== 1 && s.button !== 1 && !s.touches) && (Vn._dragging = this, this._preventOutline && sc(this._element), ec(), nr(), !this._moving)) {
            this.fire("down");
            var l = s.touches ? s.touches[0] : s, h = Vd(this._element);
            this._startPoint = new I(l.clientX, l.clientY), this._startPos = bi(this._element), this._parentScale = rc(h);
            var f = s.type === "mousedown";
            at(document, f ? "mousemove" : "touchmove", this._onMove, this), at(document, f ? "mouseup" : "touchend touchcancel", this._onUp, this);
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
          !h.x && !h.y || Math.abs(h.x) + Math.abs(h.y) < this.options.clickTolerance || (h.x /= this._parentScale.x, h.y /= this._parentScale.y, se(s), this._moved || (this.fire("dragstart"), this._moved = !0, ut(document.body, "leaflet-dragging"), this._lastTarget = s.target || s.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), ut(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(h), this._moving = !0, this._lastEvent = s, this._updatePosition());
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
        Bt(document.body, "leaflet-dragging"), this._lastTarget && (Bt(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), Ct(document, "mousemove touchmove", this._onMove, this), Ct(document, "mouseup touchend touchcancel", this._onUp, this), nc(), ir();
        var l = this._moved && this._moving;
        this._moving = !1, Vn._dragging = !1, l && this.fire("dragend", {
          noInertia: s,
          distance: this._newPos.distanceTo(this._startPos)
        });
      }
    });
    function Qd(s, l, h) {
      var f, _ = [1, 4, 2, 8], x, C, E, z, D, U, nt, ft;
      for (x = 0, U = s.length; x < U; x++)
        s[x]._code = Pi(s[x], l);
      for (E = 0; E < 4; E++) {
        for (nt = _[E], f = [], x = 0, U = s.length, C = U - 1; x < U; C = x++)
          z = s[x], D = s[C], z._code & nt ? D._code & nt || (ft = Oo(D, z, nt, l, h), ft._code = Pi(ft, l), f.push(ft)) : (D._code & nt && (ft = Oo(D, z, nt, l, h), ft._code = Pi(ft, l), f.push(ft)), f.push(z));
        s = f;
      }
      return s;
    }
    function Jd(s, l) {
      var h, f, _, x, C, E, z, D, U;
      if (!s || s.length === 0)
        throw new Error("latlngs not passed");
      Be(s) || (console.warn("latlngs are not flat! Only the first ring will be used"), s = s[0]);
      var nt = J([0, 0]), ft = dt(s), ge = ft.getNorthWest().distanceTo(ft.getSouthWest()) * ft.getNorthEast().distanceTo(ft.getNorthWest());
      ge < 1700 && (nt = fc(s));
      var te = s.length, He = [];
      for (h = 0; h < te; h++) {
        var be = J(s[h]);
        He.push(l.project(J([be.lat - nt.lat, be.lng - nt.lng])));
      }
      for (E = z = D = 0, h = 0, f = te - 1; h < te; f = h++)
        _ = He[h], x = He[f], C = _.y * x.x - x.y * _.x, z += (_.x + x.x) * C, D += (_.y + x.y) * C, E += C * 3;
      E === 0 ? U = He[0] : U = [z / E, D / E];
      var os = l.unproject(F(U));
      return J([os.lat + nt.lat, os.lng + nt.lng]);
    }
    function fc(s) {
      for (var l = 0, h = 0, f = 0, _ = 0; _ < s.length; _++) {
        var x = J(s[_]);
        l += x.lat, h += x.lng, f++;
      }
      return J([l / f, h / f]);
    }
    var x0 = {
      __proto__: null,
      clipPolygon: Qd,
      polygonCenter: Jd,
      centroid: fc
    };
    function tf(s, l) {
      if (!l || !s.length)
        return s.slice();
      var h = l * l;
      return s = k0(s, h), s = b0(s, h), s;
    }
    function ef(s, l, h) {
      return Math.sqrt(ar(s, l, h, !0));
    }
    function w0(s, l, h) {
      return ar(s, l, h);
    }
    function b0(s, l) {
      var h = s.length, f = typeof Uint8Array < "u" ? Uint8Array : Array, _ = new f(h);
      _[0] = _[h - 1] = 1, pc(s, _, l, 0, h - 1);
      var x, C = [];
      for (x = 0; x < h; x++)
        _[x] && C.push(s[x]);
      return C;
    }
    function pc(s, l, h, f, _) {
      var x = 0, C, E, z;
      for (E = f + 1; E <= _ - 1; E++)
        z = ar(s[E], s[f], s[_], !0), z > x && (C = E, x = z);
      x > h && (l[C] = 1, pc(s, l, h, f, C), pc(s, l, h, C, _));
    }
    function k0(s, l) {
      for (var h = [s[0]], f = 1, _ = 0, x = s.length; f < x; f++)
        S0(s[f], s[_]) > l && (h.push(s[f]), _ = f);
      return _ < x - 1 && h.push(s[x - 1]), h;
    }
    var nf;
    function sf(s, l, h, f, _) {
      var x = f ? nf : Pi(s, h), C = Pi(l, h), E, z, D;
      for (nf = C; ; ) {
        if (!(x | C))
          return [s, l];
        if (x & C)
          return !1;
        E = x || C, z = Oo(s, l, E, h, _), D = Pi(z, h), E === x ? (s = z, x = D) : (l = z, C = D);
      }
    }
    function Oo(s, l, h, f, _) {
      var x = l.x - s.x, C = l.y - s.y, E = f.min, z = f.max, D, U;
      return h & 8 ? (D = s.x + x * (z.y - s.y) / C, U = z.y) : h & 4 ? (D = s.x + x * (E.y - s.y) / C, U = E.y) : h & 2 ? (D = z.x, U = s.y + C * (z.x - s.x) / x) : h & 1 && (D = E.x, U = s.y + C * (E.x - s.x) / x), new I(D, U, _);
    }
    function Pi(s, l) {
      var h = 0;
      return s.x < l.min.x ? h |= 1 : s.x > l.max.x && (h |= 2), s.y < l.min.y ? h |= 4 : s.y > l.max.y && (h |= 8), h;
    }
    function S0(s, l) {
      var h = l.x - s.x, f = l.y - s.y;
      return h * h + f * f;
    }
    function ar(s, l, h, f) {
      var _ = l.x, x = l.y, C = h.x - _, E = h.y - x, z = C * C + E * E, D;
      return z > 0 && (D = ((s.x - _) * C + (s.y - x) * E) / z, D > 1 ? (_ = h.x, x = h.y) : D > 0 && (_ += C * D, x += E * D)), C = s.x - _, E = s.y - x, f ? C * C + E * E : new I(_, x);
    }
    function Be(s) {
      return !P(s[0]) || typeof s[0][0] != "object" && typeof s[0][0] < "u";
    }
    function rf(s) {
      return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), Be(s);
    }
    function of(s, l) {
      var h, f, _, x, C, E, z, D;
      if (!s || s.length === 0)
        throw new Error("latlngs not passed");
      Be(s) || (console.warn("latlngs are not flat! Only the first ring will be used"), s = s[0]);
      var U = J([0, 0]), nt = dt(s), ft = nt.getNorthWest().distanceTo(nt.getSouthWest()) * nt.getNorthEast().distanceTo(nt.getNorthWest());
      ft < 1700 && (U = fc(s));
      var ge = s.length, te = [];
      for (h = 0; h < ge; h++) {
        var He = J(s[h]);
        te.push(l.project(J([He.lat - U.lat, He.lng - U.lng])));
      }
      for (h = 0, f = 0; h < ge - 1; h++)
        f += te[h].distanceTo(te[h + 1]) / 2;
      if (f === 0)
        D = te[0];
      else
        for (h = 0, x = 0; h < ge - 1; h++)
          if (C = te[h], E = te[h + 1], _ = C.distanceTo(E), x += _, x > f) {
            z = (x - f) / _, D = [
              E.x - z * (E.x - C.x),
              E.y - z * (E.y - C.y)
            ];
            break;
          }
      var be = l.unproject(F(D));
      return J([be.lat + U.lat, be.lng + U.lng]);
    }
    var P0 = {
      __proto__: null,
      simplify: tf,
      pointToSegmentDistance: ef,
      closestPointOnSegment: w0,
      clipSegment: sf,
      _getEdgeIntersection: Oo,
      _getBitCode: Pi,
      _sqClosestPointOnSegment: ar,
      isFlat: Be,
      _flat: rf,
      polylineCenter: of
    }, mc = {
      project: function(s) {
        return new I(s.lng, s.lat);
      },
      unproject: function(s) {
        return new lt(s.y, s.x);
      },
      bounds: new G([-180, -90], [180, 90])
    }, gc = {
      R: 6378137,
      R_MINOR: 6356752314245179e-9,
      bounds: new G([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
      project: function(s) {
        var l = Math.PI / 180, h = this.R, f = s.lat * l, _ = this.R_MINOR / h, x = Math.sqrt(1 - _ * _), C = x * Math.sin(f), E = Math.tan(Math.PI / 4 - f / 2) / Math.pow((1 - C) / (1 + C), x / 2);
        return f = -h * Math.log(Math.max(E, 1e-10)), new I(s.lng * l * h, f);
      },
      unproject: function(s) {
        for (var l = 180 / Math.PI, h = this.R, f = this.R_MINOR / h, _ = Math.sqrt(1 - f * f), x = Math.exp(-s.y / h), C = Math.PI / 2 - 2 * Math.atan(x), E = 0, z = 0.1, D; E < 15 && Math.abs(z) > 1e-7; E++)
          D = _ * Math.sin(C), D = Math.pow((1 - D) / (1 + D), _ / 2), z = Math.PI / 2 - 2 * Math.atan(x * D) - C, C += z;
        return new lt(C * l, s.x * l / h);
      }
    }, M0 = {
      __proto__: null,
      LonLat: mc,
      Mercator: gc,
      SphericalMercator: wn
    }, C0 = r({}, we, {
      code: "EPSG:3395",
      projection: gc,
      transformation: function() {
        var s = 0.5 / (Math.PI * gc.R);
        return xi(s, 0.5, -s, 0.5);
      }()
    }), af = r({}, we, {
      code: "EPSG:4326",
      projection: mc,
      transformation: xi(1 / 180, 1, -1 / 180, 0.5)
    }), L0 = r({}, Qt, {
      projection: mc,
      transformation: xi(1, 0, -1, 0),
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
    Qt.Earth = we, Qt.EPSG3395 = C0, Qt.EPSG3857 = Ys, Qt.EPSG900913 = Mo, Qt.EPSG4326 = af, Qt.Simple = L0;
    var Xe = st.extend({
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
    var es = Xe.extend({
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
    }), T0 = function(s, l) {
      return new es(s, l);
    }, bn = es.extend({
      addLayer: function(s) {
        return this.hasLayer(s) ? this : (s.addEventParent(this), es.prototype.addLayer.call(this, s), this.fire("layeradd", { layer: s }));
      },
      removeLayer: function(s) {
        return this.hasLayer(s) ? (s in this._layers && (s = this._layers[s]), s.removeEventParent(this), es.prototype.removeLayer.call(this, s), this.fire("layerremove", { layer: s })) : this;
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
        var s = new _t();
        for (var l in this._layers) {
          var h = this._layers[l];
          s.extend(h.getBounds ? h.getBounds() : h.getLatLng());
        }
        return s;
      }
    }), N0 = function(s, l) {
      return new bn(s, l);
    }, ns = K.extend({
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
        var _ = F(f), x = F(l === "shadow" && h.shadowAnchor || h.iconAnchor || _ && _.divideBy(2, !0));
        s.className = "leaflet-marker-" + l + " " + (h.className || ""), x && (s.style.marginLeft = -x.x + "px", s.style.marginTop = -x.y + "px"), _ && (s.style.width = _.x + "px", s.style.height = _.y + "px");
      },
      _createImg: function(s, l) {
        return l = l || document.createElement("img"), l.src = s, l;
      },
      _getIconUrl: function(s) {
        return X.retina && this.options[s + "RetinaUrl"] || this.options[s + "Url"];
      }
    });
    function E0(s) {
      return new ns(s);
    }
    var lr = ns.extend({
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
        return typeof lr.imagePath != "string" && (lr.imagePath = this._detectIconPath()), (this.options.imagePath || lr.imagePath) + ns.prototype._getIconUrl.call(this, s);
      },
      _stripUrl: function(s) {
        var l = function(h, f, _) {
          var x = f.exec(h);
          return x && x[_];
        };
        return s = l(s, /^url\((['"])?(.+)\1\)$/, 2), s && l(s, /^(.*)marker-icon\.png$/, 1);
      },
      _detectIconPath: function() {
        var s = yt("div", "leaflet-default-icon-path", document.body), l = er(s, "background-image") || er(s, "backgroundImage");
        if (document.body.removeChild(s), l = this._stripUrl(l), l)
          return l;
        var h = document.querySelector('link[href$="leaflet.css"]');
        return h ? h.href.substring(0, h.href.length - 11 - 1) : "";
      }
    }), lf = ln.extend({
      initialize: function(s) {
        this._marker = s;
      },
      addHooks: function() {
        var s = this._marker._icon;
        this._draggable || (this._draggable = new Vn(s, s, !0)), this._draggable.on({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).enable(), ut(s, "leaflet-marker-draggable");
      },
      removeHooks: function() {
        this._draggable.off({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).disable(), this._marker._icon && Bt(this._marker._icon, "leaflet-marker-draggable");
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      _adjustPan: function(s) {
        var l = this._marker, h = l._map, f = this._marker.options.autoPanSpeed, _ = this._marker.options.autoPanPadding, x = bi(l._icon), C = h.getPixelBounds(), E = h.getPixelOrigin(), z = rt(
          C.min._subtract(E).add(_),
          C.max._subtract(E).subtract(_)
        );
        if (!z.contains(x)) {
          var D = F(
            (Math.max(z.max.x, x.x) - z.max.x) / (C.max.x - z.max.x) - (Math.min(z.min.x, x.x) - z.min.x) / (C.min.x - z.min.x),
            (Math.max(z.max.y, x.y) - z.max.y) / (C.max.y - z.max.y) - (Math.min(z.min.y, x.y) - z.min.y) / (C.min.y - z.min.y)
          ).multiplyBy(f);
          h.panBy(D, { animate: !1 }), this._draggable._newPos._add(D), this._draggable._startPos._add(D), Zt(l._icon, this._draggable._newPos), this._onDrag(s), this._panRequest = V(this._adjustPan.bind(this, s));
        }
      },
      _onDragStart: function() {
        this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
      },
      _onPreDrag: function(s) {
        this._marker.options.autoPan && (q(this._panRequest), this._panRequest = V(this._adjustPan.bind(this, s)));
      },
      _onDrag: function(s) {
        var l = this._marker, h = l._shadow, f = bi(l._icon), _ = l._map.layerPointToLatLng(f);
        h && Zt(h, f), l._latlng = _, s.latlng = _, s.oldLatLng = this._oldLatLng, l.fire("move", s).fire("drag", s);
      },
      _onDragEnd: function(s) {
        q(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", s);
      }
    }), Ao = Xe.extend({
      // @section
      // @aka Marker options
      options: {
        // @option icon: Icon = *
        // Icon instance to use for rendering the marker.
        // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
        // If not specified, a common instance of `L.Icon.Default` is used.
        icon: new lr(),
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
        w(this, l), this._latlng = J(s);
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
        return this._latlng = J(s), this.update(), this.fire("move", { oldLatLng: l, latlng: this._latlng });
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
        h !== this._icon && (this._icon && this._removeIcon(), f = !0, s.title && (h.title = s.title), h.tagName === "IMG" && (h.alt = s.alt || "")), ut(h, l), s.keyboard && (h.tabIndex = "0", h.setAttribute("role", "button")), this._icon = h, s.riseOnHover && this.on({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && at(h, "focus", this._panOnFocus, this);
        var _ = s.icon.createShadow(this._shadow), x = !1;
        _ !== this._shadow && (this._removeShadow(), x = !0), _ && (ut(_, l), _.alt = ""), this._shadow = _, s.opacity < 1 && this._updateOpacity(), f && this.getPane().appendChild(this._icon), this._initInteraction(), _ && x && this.getPane(s.shadowPane).appendChild(this._shadow);
      },
      _removeIcon: function() {
        this.options.riseOnHover && this.off({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && Ct(this._icon, "focus", this._panOnFocus, this), jt(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
      },
      _removeShadow: function() {
        this._shadow && jt(this._shadow), this._shadow = null;
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
        if (this.options.interactive && (ut(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), lf)) {
          var s = this.options.draggable;
          this.dragging && (s = this.dragging.enabled(), this.dragging.disable()), this.dragging = new lf(this), s && this.dragging.enable();
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
          var l = this.options.icon.options, h = l.iconSize ? F(l.iconSize) : F(0, 0), f = l.iconAnchor ? F(l.iconAnchor) : F(0, 0);
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
    function z0(s, l) {
      return new Ao(s, l);
    }
    var Zn = Xe.extend({
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
    }), Io = Zn.extend({
      // @section
      // @aka CircleMarker options
      options: {
        fill: !0,
        // @option radius: Number = 10
        // Radius of the circle marker, in pixels
        radius: 10
      },
      initialize: function(s, l) {
        w(this, l), this._latlng = J(s), this._radius = this.options.radius;
      },
      // @method setLatLng(latLng: LatLng): this
      // Sets the position of a circle marker to a new location.
      setLatLng: function(s) {
        var l = this._latlng;
        return this._latlng = J(s), this.redraw(), this.fire("move", { oldLatLng: l, latlng: this._latlng });
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
        return Zn.prototype.setStyle.call(this, s), this.setRadius(l), this;
      },
      _project: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
      },
      _updateBounds: function() {
        var s = this._radius, l = this._radiusY || s, h = this._clickTolerance(), f = [s + h, l + h];
        this._pxBounds = new G(this._point.subtract(f), this._point.add(f));
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
    function j0(s, l) {
      return new Io(s, l);
    }
    var _c = Io.extend({
      initialize: function(s, l, h) {
        if (typeof l == "number" && (l = r({}, h, { radius: l })), w(this, l), this._latlng = J(s), isNaN(this.options.radius))
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
        return new _t(
          this._map.layerPointToLatLng(this._point.subtract(s)),
          this._map.layerPointToLatLng(this._point.add(s))
        );
      },
      setStyle: Zn.prototype.setStyle,
      _project: function() {
        var s = this._latlng.lng, l = this._latlng.lat, h = this._map, f = h.options.crs;
        if (f.distance === we.distance) {
          var _ = Math.PI / 180, x = this._mRadius / we.R / _, C = h.project([l + x, s]), E = h.project([l - x, s]), z = C.add(E).divideBy(2), D = h.unproject(z).lat, U = Math.acos((Math.cos(x * _) - Math.sin(l * _) * Math.sin(D * _)) / (Math.cos(l * _) * Math.cos(D * _))) / _;
          (isNaN(U) || U === 0) && (U = x / Math.cos(Math.PI / 180 * l)), this._point = z.subtract(h.getPixelOrigin()), this._radius = isNaN(U) ? 0 : z.x - h.project([D, s - U]).x, this._radiusY = z.y - C.y;
        } else {
          var nt = f.unproject(f.project(this._latlng).subtract([this._mRadius, 0]));
          this._point = h.latLngToLayerPoint(this._latlng), this._radius = this._point.x - h.latLngToLayerPoint(nt).x;
        }
        this._updateBounds();
      }
    });
    function O0(s, l, h) {
      return new _c(s, l, h);
    }
    var kn = Zn.extend({
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
        for (var l = 1 / 0, h = null, f = ar, _, x, C = 0, E = this._parts.length; C < E; C++)
          for (var z = this._parts[C], D = 1, U = z.length; D < U; D++) {
            _ = z[D - 1], x = z[D];
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
        return of(this._defaultShape(), this._map.options.crs);
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
        return l = l || this._defaultShape(), s = J(s), l.push(s), this._bounds.extend(s), this.redraw();
      },
      _setLatLngs: function(s) {
        this._bounds = new _t(), this._latlngs = this._convertLatLngs(s);
      },
      _defaultShape: function() {
        return Be(this._latlngs) ? this._latlngs : this._latlngs[0];
      },
      // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
      _convertLatLngs: function(s) {
        for (var l = [], h = Be(s), f = 0, _ = s.length; f < _; f++)
          h ? (l[f] = J(s[f]), this._bounds.extend(l[f])) : l[f] = this._convertLatLngs(s[f]);
        return l;
      },
      _project: function() {
        var s = new G();
        this._rings = [], this._projectLatlngs(this._latlngs, this._rings, s), this._bounds.isValid() && s.isValid() && (this._rawPxBounds = s, this._updateBounds());
      },
      _updateBounds: function() {
        var s = this._clickTolerance(), l = new I(s, s);
        this._rawPxBounds && (this._pxBounds = new G([
          this._rawPxBounds.min.subtract(l),
          this._rawPxBounds.max.add(l)
        ]));
      },
      // recursively turns latlngs into a set of rings with projected coordinates
      _projectLatlngs: function(s, l, h) {
        var f = s[0] instanceof lt, _ = s.length, x, C;
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
              E = sf(z[f], z[f + 1], s, f, !0), E && (l[_] = l[_] || [], l[_].push(E[0]), (E[1] !== z[f + 1] || f === C - 2) && (l[_].push(E[1]), _++));
        }
      },
      // simplify each clipped part of the polyline for performance
      _simplifyPoints: function() {
        for (var s = this._parts, l = this.options.smoothFactor, h = 0, f = s.length; h < f; h++)
          s[h] = tf(s[h], l);
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
            if (!(!l && f === 0) && ef(s, E[_], E[f]) <= z)
              return !0;
        return !1;
      }
    });
    function A0(s, l) {
      return new kn(s, l);
    }
    kn._flat = rf;
    var is = kn.extend({
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
        return Jd(this._defaultShape(), this._map.options.crs);
      },
      _convertLatLngs: function(s) {
        var l = kn.prototype._convertLatLngs.call(this, s), h = l.length;
        return h >= 2 && l[0] instanceof lt && l[0].equals(l[h - 1]) && l.pop(), l;
      },
      _setLatLngs: function(s) {
        kn.prototype._setLatLngs.call(this, s), Be(this._latlngs) && (this._latlngs = [this._latlngs]);
      },
      _defaultShape: function() {
        return Be(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
      },
      _clipPoints: function() {
        var s = this._renderer._bounds, l = this.options.weight, h = new I(l, l);
        if (s = new G(s.min.subtract(h), s.max.add(h)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(s))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var f = 0, _ = this._rings.length, x; f < _; f++)
            x = Qd(this._rings[f], s, !0), x.length && this._parts.push(x);
        }
      },
      _updatePath: function() {
        this._renderer._updatePoly(this, !0);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(s) {
        var l = !1, h, f, _, x, C, E, z, D;
        if (!this._pxBounds || !this._pxBounds.contains(s))
          return !1;
        for (x = 0, z = this._parts.length; x < z; x++)
          for (h = this._parts[x], C = 0, D = h.length, E = D - 1; C < D; E = C++)
            f = h[C], _ = h[E], f.y > s.y != _.y > s.y && s.x < (_.x - f.x) * (s.y - f.y) / (_.y - f.y) + f.x && (l = !l);
        return l || kn.prototype._containsPoint.call(this, s, !0);
      }
    });
    function I0(s, l) {
      return new is(s, l);
    }
    var Sn = bn.extend({
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
        var C = Ro(s, x);
        return C ? (C.feature = Bo(s), C.defaultOptions = C.options, this.resetStyle(C), x.onEachFeature && x.onEachFeature(s, C), this.addLayer(C)) : this;
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
    function Ro(s, l) {
      var h = s.type === "Feature" ? s.geometry : s, f = h ? h.coordinates : null, _ = [], x = l && l.pointToLayer, C = l && l.coordsToLatLng || vc, E, z, D, U;
      if (!f && !h)
        return null;
      switch (h.type) {
        case "Point":
          return E = C(f), cf(x, s, E, l);
        case "MultiPoint":
          for (D = 0, U = f.length; D < U; D++)
            E = C(f[D]), _.push(cf(x, s, E, l));
          return new bn(_);
        case "LineString":
        case "MultiLineString":
          return z = Do(f, h.type === "LineString" ? 0 : 1, C), new kn(z, l);
        case "Polygon":
        case "MultiPolygon":
          return z = Do(f, h.type === "Polygon" ? 1 : 2, C), new is(z, l);
        case "GeometryCollection":
          for (D = 0, U = h.geometries.length; D < U; D++) {
            var nt = Ro({
              geometry: h.geometries[D],
              type: "Feature",
              properties: s.properties
            }, l);
            nt && _.push(nt);
          }
          return new bn(_);
        case "FeatureCollection":
          for (D = 0, U = h.features.length; D < U; D++) {
            var ft = Ro(h.features[D], l);
            ft && _.push(ft);
          }
          return new bn(_);
        default:
          throw new Error("Invalid GeoJSON object.");
      }
    }
    function cf(s, l, h, f) {
      return s ? s(l, h) : new Ao(h, f && f.markersInheritOptions && f);
    }
    function vc(s) {
      return new lt(s[1], s[0], s[2]);
    }
    function Do(s, l, h) {
      for (var f = [], _ = 0, x = s.length, C; _ < x; _++)
        C = l ? Do(s[_], l - 1, h) : (h || vc)(s[_]), f.push(C);
      return f;
    }
    function yc(s, l) {
      return s = J(s), s.alt !== void 0 ? [v(s.lng, l), v(s.lat, l), v(s.alt, l)] : [v(s.lng, l), v(s.lat, l)];
    }
    function Fo(s, l, h, f) {
      for (var _ = [], x = 0, C = s.length; x < C; x++)
        _.push(l ? Fo(s[x], Be(s[x]) ? 0 : l - 1, h, f) : yc(s[x], f));
      return !l && h && _.length > 0 && _.push(_[0].slice()), _;
    }
    function ss(s, l) {
      return s.feature ? r({}, s.feature, { geometry: l }) : Bo(l);
    }
    function Bo(s) {
      return s.type === "Feature" || s.type === "FeatureCollection" ? s : {
        type: "Feature",
        properties: {},
        geometry: s
      };
    }
    var xc = {
      toGeoJSON: function(s) {
        return ss(this, {
          type: "Point",
          coordinates: yc(this.getLatLng(), s)
        });
      }
    };
    Ao.include(xc), _c.include(xc), Io.include(xc), kn.include({
      toGeoJSON: function(s) {
        var l = !Be(this._latlngs), h = Fo(this._latlngs, l ? 1 : 0, !1, s);
        return ss(this, {
          type: (l ? "Multi" : "") + "LineString",
          coordinates: h
        });
      }
    }), is.include({
      toGeoJSON: function(s) {
        var l = !Be(this._latlngs), h = l && !Be(this._latlngs[0]), f = Fo(this._latlngs, h ? 2 : l ? 1 : 0, !0, s);
        return l || (f = [f]), ss(this, {
          type: (h ? "Multi" : "") + "Polygon",
          coordinates: f
        });
      }
    }), es.include({
      toMultiPoint: function(s) {
        var l = [];
        return this.eachLayer(function(h) {
          l.push(h.toGeoJSON(s).geometry.coordinates);
        }), ss(this, {
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
              var C = Bo(x);
              C.type === "FeatureCollection" ? f.push.apply(f, C.features) : f.push(C);
            }
          }
        }), h ? ss(this, {
          geometries: f,
          type: "GeometryCollection"
        }) : {
          type: "FeatureCollection",
          features: f
        };
      }
    });
    function uf(s, l) {
      return new Sn(s, l);
    }
    var R0 = uf, Ho = Xe.extend({
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
        this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (ut(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
      },
      onRemove: function() {
        jt(this._image), this.options.interactive && this.removeInteractiveTarget(this._image);
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
        return this._map && Ji(this._image), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all overlays.
      bringToBack: function() {
        return this._map && ts(this._image), this;
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
        var s = this._url.tagName === "IMG", l = this._image = s ? this._url : yt("img");
        if (ut(l, "leaflet-image-layer"), this._zoomAnimated && ut(l, "leaflet-zoom-animated"), this.options.className && ut(l, this.options.className), l.onselectstart = g, l.onmousemove = g, l.onload = a(this.fire, this, "load"), l.onerror = a(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (l.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), s) {
          this._url = l.src;
          return;
        }
        l.src = this._url, l.alt = this.options.alt;
      },
      _animateZoom: function(s) {
        var l = this._map.getZoomScale(s.zoom), h = this._map._latLngBoundsToNewLayerBounds(this._bounds, s.zoom, s.center).min;
        wi(this._image, h, l);
      },
      _reset: function() {
        var s = this._image, l = new G(
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
    }), D0 = function(s, l, h) {
      return new Ho(s, l, h);
    }, hf = Ho.extend({
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
        var s = this._url.tagName === "VIDEO", l = this._image = s ? this._url : yt("video");
        if (ut(l, "leaflet-image-layer"), this._zoomAnimated && ut(l, "leaflet-zoom-animated"), this.options.className && ut(l, this.options.className), l.onselectstart = g, l.onmousemove = g, l.onloadeddata = a(this.fire, this, "load"), s) {
          for (var h = l.getElementsByTagName("source"), f = [], _ = 0; _ < h.length; _++)
            f.push(h[_].src);
          this._url = h.length > 0 ? f : [l.src];
          return;
        }
        P(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(l.style, "objectFit") && (l.style.objectFit = "fill"), l.autoplay = !!this.options.autoplay, l.loop = !!this.options.loop, l.muted = !!this.options.muted, l.playsInline = !!this.options.playsInline;
        for (var x = 0; x < this._url.length; x++) {
          var C = yt("source");
          C.src = this._url[x], l.appendChild(C);
        }
      }
      // @method getElement(): HTMLVideoElement
      // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
      // used by this overlay.
    });
    function F0(s, l, h) {
      return new hf(s, l, h);
    }
    var df = Ho.extend({
      _initImage: function() {
        var s = this._image = this._url;
        ut(s, "leaflet-image-layer"), this._zoomAnimated && ut(s, "leaflet-zoom-animated"), this.options.className && ut(s, this.options.className), s.onselectstart = g, s.onmousemove = g;
      }
      // @method getElement(): SVGElement
      // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
      // used by this overlay.
    });
    function B0(s, l, h) {
      return new df(s, l, h);
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
        s && (s instanceof lt || P(s)) ? (this._latlng = J(s), w(this, l)) : (w(this, s), this._source = l), this.options.content && (this._content = this.options.content);
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
        this._zoomAnimated = s._zoomAnimated, this._container || this._initLayout(), s._fadeAnimated && Fe(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), s._fadeAnimated && Fe(this._container, 1), this.bringToFront(), this.options.interactive && (ut(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
      },
      onRemove: function(s) {
        s._fadeAnimated ? (Fe(this._container, 0), this._removeTimeout = setTimeout(a(jt, void 0, this._container), 200)) : jt(this._container), this.options.interactive && (Bt(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
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
        return this._latlng = J(s), this._map && (this._updatePosition(), this._adjustPan()), this;
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
        return this._map && Ji(this._container), this;
      },
      // @method bringToBack: this
      // Brings this overlay to the back of other overlays (in the same map pane).
      bringToBack: function() {
        return this._map && ts(this._container), this;
      },
      // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
      _prepareOpen: function(s) {
        var l = this._source;
        if (!l._map)
          return !1;
        if (l instanceof bn) {
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
          var s = this._map.latLngToLayerPoint(this._latlng), l = F(this.options.offset), h = this._getAnchor();
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
    var Wo = cn.extend({
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
        cn.prototype.onAdd.call(this, s), s.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof Zn || this._source.on("preclick", ki));
      },
      onRemove: function(s) {
        cn.prototype.onRemove.call(this, s), s.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof Zn || this._source.off("preclick", ki));
      },
      getEvents: function() {
        var s = cn.prototype.getEvents.call(this);
        return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (s.preclick = this.close), this.options.keepInView && (s.moveend = this._adjustPan), s;
      },
      _initLayout: function() {
        var s = "leaflet-popup", l = this._container = yt(
          "div",
          s + " " + (this.options.className || "") + " leaflet-zoom-animated"
        ), h = this._wrapper = yt("div", s + "-content-wrapper", l);
        if (this._contentNode = yt("div", s + "-content", h), rr(l), cc(this._contentNode), at(l, "contextmenu", ki), this._tipContainer = yt("div", s + "-tip-container", l), this._tip = yt("div", s + "-tip", this._tipContainer), this.options.closeButton) {
          var f = this._closeButton = yt("a", s + "-close-button", l);
          f.setAttribute("role", "button"), f.setAttribute("aria-label", "Close popup"), f.href = "#close", f.innerHTML = '<span aria-hidden="true">&#215;</span>', at(f, "click", function(_) {
            se(_), this.close();
          }, this);
        }
      },
      _updateLayout: function() {
        var s = this._contentNode, l = s.style;
        l.width = "", l.whiteSpace = "nowrap";
        var h = s.offsetWidth;
        h = Math.min(h, this.options.maxWidth), h = Math.max(h, this.options.minWidth), l.width = h + 1 + "px", l.whiteSpace = "", l.height = "";
        var f = s.offsetHeight, _ = this.options.maxHeight, x = "leaflet-popup-scrolled";
        _ && f > _ ? (l.height = _ + "px", ut(s, x)) : Bt(s, x), this._containerWidth = this._container.offsetWidth;
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
          var s = this._map, l = parseInt(er(this._container, "marginBottom"), 10) || 0, h = this._container.offsetHeight + l, f = this._containerWidth, _ = new I(this._containerLeft, -h - this._containerBottom);
          _._add(bi(this._container));
          var x = s.layerPointToContainerPoint(_), C = F(this.options.autoPanPadding), E = F(this.options.autoPanPaddingTopLeft || C), z = F(this.options.autoPanPaddingBottomRight || C), D = s.getSize(), U = 0, nt = 0;
          x.x + f + z.x > D.x && (U = x.x + f - D.x + z.x), x.x - U - E.x < 0 && (U = x.x - E.x), x.y + h + z.y > D.y && (nt = x.y + h - D.y + z.y), x.y - nt - E.y < 0 && (nt = x.y - E.y), (U || nt) && (this.options.keepInView && (this._autopanning = !0), s.fire("autopanstart").panBy([U, nt]));
        }
      },
      _getAnchor: function() {
        return F(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
      }
    }), H0 = function(s, l) {
      return new Wo(s, l);
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
        return this._initOverlay(Wo, s, l, h).openOn(this), this;
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
        return this._popup = this._initOverlay(Wo, this._popup, s, l), this._popupHandlersAdded || (this.on({
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
        return this._popup && (this instanceof bn || (this._popup._source = this), this._popup._prepareOpen(s || this._latlng) && this._popup.openOn(this._map)), this;
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
          Si(s);
          var l = s.layer || s.target;
          if (this._popup._source === l && !(l instanceof Zn)) {
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
    var Vo = cn.extend({
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
        this._contentNode = this._container = yt("div", l), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + u(this));
      },
      _updateLayout: function() {
      },
      _adjustPan: function() {
      },
      _setPosition: function(s) {
        var l, h, f = this._map, _ = this._container, x = f.latLngToContainerPoint(f.getCenter()), C = f.layerPointToContainerPoint(s), E = this.options.direction, z = _.offsetWidth, D = _.offsetHeight, U = F(this.options.offset), nt = this._getAnchor();
        E === "top" ? (l = z / 2, h = D) : E === "bottom" ? (l = z / 2, h = 0) : E === "center" ? (l = z / 2, h = D / 2) : E === "right" ? (l = 0, h = D / 2) : E === "left" ? (l = z, h = D / 2) : C.x < x.x ? (E = "right", l = 0, h = D / 2) : (E = "left", l = z + (U.x + nt.x) * 2, h = D / 2), s = s.subtract(F(l, h, !0)).add(U).add(nt), Bt(_, "leaflet-tooltip-right"), Bt(_, "leaflet-tooltip-left"), Bt(_, "leaflet-tooltip-top"), Bt(_, "leaflet-tooltip-bottom"), ut(_, "leaflet-tooltip-" + E), Zt(_, s);
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
        return F(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
      }
    }), W0 = function(s, l) {
      return new Vo(s, l);
    };
    gt.include({
      // @method openTooltip(tooltip: Tooltip): this
      // Opens the specified tooltip.
      // @alternative
      // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
      // Creates a tooltip with the specified content and options and open it.
      openTooltip: function(s, l, h) {
        return this._initOverlay(Vo, s, l, h).openOn(this), this;
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
        return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Vo, this._tooltip, s, l), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
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
        return this._tooltip && (this instanceof bn || (this._tooltip._source = this), this._tooltip._prepareOpen(s) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
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
        l && (at(l, "focus", function() {
          this._tooltip._source = s, this.openTooltip();
        }, this), at(l, "blur", this.closeTooltip, this));
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
    var ff = ns.extend({
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
        if (h.html instanceof Element ? (To(l), l.appendChild(h.html)) : l.innerHTML = h.html !== !1 ? h.html : "", h.bgPos) {
          var f = F(h.bgPos);
          l.style.backgroundPosition = -f.x + "px " + -f.y + "px";
        }
        return this._setIconStyles(l, "icon"), l;
      },
      createShadow: function() {
        return null;
      }
    });
    function V0(s) {
      return new ff(s);
    }
    ns.Default = lr;
    var cr = Xe.extend({
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
        updateWhenIdle: X.mobile,
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
        this._removeAllTiles(), jt(this._container), s._removeZoomLimit(this), this._container = null, this._tileZoom = void 0;
      },
      // @method bringToFront: this
      // Brings the tile layer to the top of all tile layers.
      bringToFront: function() {
        return this._map && (Ji(this._container), this._setAutoZIndex(Math.max)), this;
      },
      // @method bringToBack: this
      // Brings the tile layer to the bottom of all tile layers.
      bringToBack: function() {
        return this._map && (ts(this._container), this._setAutoZIndex(Math.min)), this;
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
        if (this._map && !X.ielt9) {
          Fe(this._container, this.options.opacity);
          var s = +/* @__PURE__ */ new Date(), l = !1, h = !1;
          for (var f in this._tiles) {
            var _ = this._tiles[f];
            if (!(!_.current || !_.loaded)) {
              var x = Math.min(1, (s - _.loaded) / 200);
              Fe(_.el, x), x < 1 ? l = !0 : (_.active ? h = !0 : this._onOpaqueTile(_), _.active = !0);
            }
          }
          h && !this._noPrune && this._pruneTiles(), l && (q(this._fadeFrame), this._fadeFrame = V(this._updateOpacity, this));
        }
      },
      _onOpaqueTile: g,
      _initContainer: function() {
        this._container || (this._container = yt("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
      },
      _updateLevels: function() {
        var s = this._tileZoom, l = this.options.maxZoom;
        if (s !== void 0) {
          for (var h in this._levels)
            h = Number(h), this._levels[h].el.children.length || h === s ? (this._levels[h].el.style.zIndex = l - Math.abs(s - h), this._onUpdateLevel(h)) : (jt(this._levels[h].el), this._removeTilesAtZoom(h), this._onRemoveLevel(h), delete this._levels[h]);
          var f = this._levels[s], _ = this._map;
          return f || (f = this._levels[s] = {}, f.el = yt("div", "leaflet-tile-container leaflet-zoom-animated", this._container), f.el.style.zIndex = l, f.origin = _.project(_.unproject(_.getPixelOrigin()), s).round(), f.zoom = s, this._setZoomTransform(f, _.getCenter(), _.getZoom()), g(f.el.offsetWidth), this._onCreateLevel(f)), this._level = f, f;
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
          jt(this._levels[s].el), this._onRemoveLevel(Number(s)), delete this._levels[s];
        this._removeAllTiles(), this._tileZoom = void 0;
      },
      _retainParent: function(s, l, h, f) {
        var _ = Math.floor(s / 2), x = Math.floor(l / 2), C = h - 1, E = new I(+_, +x);
        E.z = +C;
        var z = this._tileCoordsToKey(E), D = this._tiles[z];
        return D && D.active ? (D.retain = !0, !0) : (D && D.loaded && (D.retain = !0), C > f ? this._retainParent(_, x, C, f) : !1);
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
        X.any3d ? wi(s.el, _, f) : Zt(s.el, _);
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
        return new G(_.subtract(x), _.add(x));
      },
      // Private method to load tiles in the grid's active zoom level according to map bounds
      _update: function(s) {
        var l = this._map;
        if (l) {
          var h = this._clampZoom(l.getZoom());
          if (s === void 0 && (s = l.getCenter()), this._tileZoom !== void 0) {
            var f = this._getTiledPixelBounds(s), _ = this._pxBoundsToTileRange(f), x = _.getCenter(), C = [], E = this.options.keepBuffer, z = new G(
              _.getBottomLeft().subtract([E, -E]),
              _.getTopRight().add([E, -E])
            );
            if (!(isFinite(_.min.x) && isFinite(_.min.y) && isFinite(_.max.x) && isFinite(_.max.y)))
              throw new Error("Attempted to load an infinite number of tiles");
            for (var D in this._tiles) {
              var U = this._tiles[D].coords;
              (U.z !== this._tileZoom || !z.contains(new I(U.x, U.y))) && (this._tiles[D].current = !1);
            }
            if (Math.abs(h - this._tileZoom) > 1) {
              this._setView(s, h);
              return;
            }
            for (var nt = _.min.y; nt <= _.max.y; nt++)
              for (var ft = _.min.x; ft <= _.max.x; ft++) {
                var ge = new I(ft, nt);
                if (ge.z = this._tileZoom, !!this._isValidTile(ge)) {
                  var te = this._tiles[this._tileCoordsToKey(ge)];
                  te ? te.current = !0 : C.push(ge);
                }
              }
            if (C.sort(function(be, os) {
              return be.distanceTo(x) - os.distanceTo(x);
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
        var l = this._tileCoordsToNwSe(s), h = new _t(l[0], l[1]);
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
        l && (jt(l.el), delete this._tiles[s], this.fire("tileunload", {
          tile: l.el,
          coords: this._keyToTileCoords(s)
        }));
      },
      _initTile: function(s) {
        ut(s, "leaflet-tile");
        var l = this.getTileSize();
        s.style.width = l.x + "px", s.style.height = l.y + "px", s.onselectstart = g, s.onmousemove = g, X.ielt9 && this.options.opacity < 1 && Fe(s, this.options.opacity);
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
        h = this._tiles[f], h && (h.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (Fe(h.el, 0), q(this._fadeFrame), this._fadeFrame = V(this._updateOpacity, this)) : (h.active = !0, this._pruneTiles()), l || (ut(h.el, "leaflet-tile-loaded"), this.fire("tileload", {
          tile: h.el,
          coords: s
        })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), X.ielt9 || !this._map._fadeAnimated ? V(this._pruneTiles, this) : setTimeout(a(this._pruneTiles, this), 250)));
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
        return new G(
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
    function Z0(s) {
      return new cr(s);
    }
    var rs = cr.extend({
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
        this._url = s, l = w(this, l), l.detectRetina && X.retina && l.maxZoom > 0 ? (l.tileSize = Math.floor(l.tileSize / 2), l.zoomReverse ? (l.zoomOffset--, l.minZoom = Math.min(l.maxZoom, l.minZoom + 1)) : (l.zoomOffset++, l.maxZoom = Math.max(l.minZoom, l.maxZoom - 1)), l.minZoom = Math.max(0, l.minZoom)) : l.zoomReverse ? l.minZoom = Math.min(l.maxZoom, l.minZoom) : l.maxZoom = Math.max(l.minZoom, l.maxZoom), typeof l.subdomains == "string" && (l.subdomains = l.subdomains.split("")), this.on("tileunload", this._onTileRemove);
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
        return at(h, "load", a(this._tileOnLoad, this, l, h)), at(h, "error", a(this._tileOnError, this, l, h)), (this.options.crossOrigin || this.options.crossOrigin === "") && (h.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (h.referrerPolicy = this.options.referrerPolicy), h.alt = "", h.src = this.getTileUrl(s), h;
      },
      // @section Extension methods
      // @uninheritable
      // Layers extending `TileLayer` might reimplement the following method.
      // @method getTileUrl(coords: Object): String
      // Called only internally, returns the URL for a tile given its coordinates.
      // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
      getTileUrl: function(s) {
        var l = {
          r: X.retina ? "@2x" : "",
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
        X.ielt9 ? setTimeout(a(s, this, null, l), 0) : s(null, l);
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
            jt(l), delete this._tiles[s], this.fire("tileabort", {
              tile: l,
              coords: h
            });
          }
      },
      _removeTile: function(s) {
        var l = this._tiles[s];
        if (l)
          return l.el.setAttribute("src", N), cr.prototype._removeTile.call(this, s);
      },
      _tileReady: function(s, l, h) {
        if (!(!this._map || h && h.getAttribute("src") === N))
          return cr.prototype._tileReady.call(this, s, l, h);
      }
    });
    function pf(s, l) {
      return new rs(s, l);
    }
    var mf = rs.extend({
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
        var _ = l.detectRetina && X.retina ? 2 : 1, x = this.getTileSize();
        h.width = x.x * _, h.height = x.y * _, this.wmsParams = h;
      },
      onAdd: function(s) {
        this._crs = this.options.crs || s.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
        var l = this._wmsVersion >= 1.3 ? "crs" : "srs";
        this.wmsParams[l] = this._crs.code, rs.prototype.onAdd.call(this, s);
      },
      getTileUrl: function(s) {
        var l = this._tileCoordsToNwSe(s), h = this._crs, f = rt(h.project(l[0]), h.project(l[1])), _ = f.min, x = f.max, C = (this._wmsVersion >= 1.3 && this._crs === af ? [_.y, _.x, x.y, x.x] : [_.x, _.y, x.x, x.y]).join(","), E = rs.prototype.getTileUrl.call(this, s);
        return E + M(this.wmsParams, E, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + C;
      },
      // @method setParams(params: Object, noRedraw?: Boolean): this
      // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
      setParams: function(s, l) {
        return r(this.wmsParams, s), l || this.redraw(), this;
      }
    });
    function U0(s, l) {
      return new mf(s, l);
    }
    rs.WMS = mf, pf.wms = U0;
    var Pn = Xe.extend({
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
        this._container || (this._initContainer(), ut(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
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
        X.any3d ? wi(this._container, x, h) : Zt(this._container, x);
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
        this._bounds = new G(h, h.add(l.multiplyBy(1 + s * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
      }
    }), gf = Pn.extend({
      // @section
      // @aka Canvas options
      options: {
        // @option tolerance: Number = 0
        // How much to extend the click tolerance around a path/object on the map.
        tolerance: 0
      },
      getEvents: function() {
        var s = Pn.prototype.getEvents.call(this);
        return s.viewprereset = this._onViewPreReset, s;
      },
      _onViewPreReset: function() {
        this._postponeUpdatePaths = !0;
      },
      onAdd: function() {
        Pn.prototype.onAdd.call(this), this._draw();
      },
      _initContainer: function() {
        var s = this._container = document.createElement("canvas");
        at(s, "mousemove", this._onMouseMove, this), at(s, "click dblclick mousedown mouseup contextmenu", this._onClick, this), at(s, "mouseout", this._handleMouseOut, this), s._leaflet_disable_events = !0, this._ctx = s.getContext("2d");
      },
      _destroyContainer: function() {
        q(this._redrawRequest), delete this._ctx, jt(this._container), Ct(this._container), delete this._container;
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
          Pn.prototype._update.call(this);
          var s = this._bounds, l = this._container, h = s.getSize(), f = X.retina ? 2 : 1;
          Zt(l, s.min), l.width = f * h.x, l.height = f * h.y, l.style.width = h.x + "px", l.style.height = h.y + "px", X.retina && this._ctx.scale(2, 2), this._ctx.translate(-s.min.x, -s.min.y), this.fire("update");
        }
      },
      _reset: function() {
        Pn.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
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
          this._redrawBounds = this._redrawBounds || new G(), this._redrawBounds.extend(s._pxBounds.min.subtract([l, l])), this._redrawBounds.extend(s._pxBounds.max.add([l, l]));
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
        l && (Bt(this._container, "leaflet-interactive"), this._fireEvent([l], s, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
      },
      _handleMouseHover: function(s, l) {
        if (!this._mouseHoverThrottled) {
          for (var h, f, _ = this._drawFirst; _; _ = _.next)
            h = _.layer, h.options.interactive && h._containsPoint(l) && (f = h);
          f !== this._hoveredLayer && (this._handleMouseOut(s), f && (ut(this._container, "leaflet-interactive"), this._fireEvent([f], s, "mouseover"), this._hoveredLayer = f)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, s), this._mouseHoverThrottled = !0, setTimeout(a(function() {
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
    function _f(s) {
      return X.canvas ? new gf(s) : null;
    }
    var ur = function() {
      try {
        return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(s) {
          return document.createElement("<lvml:" + s + ' class="lvml">');
        };
      } catch {
      }
      return function(s) {
        return document.createElement("<" + s + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
      };
    }(), $0 = {
      _initContainer: function() {
        this._container = yt("div", "leaflet-vml-container");
      },
      _update: function() {
        this._map._animatingZoom || (Pn.prototype._update.call(this), this.fire("update"));
      },
      _initPath: function(s) {
        var l = s._container = ur("shape");
        ut(l, "leaflet-vml-shape " + (this.options.className || "")), l.coordsize = "1 1", s._path = ur("path"), l.appendChild(s._path), this._updateStyle(s), this._layers[u(s)] = s;
      },
      _addPath: function(s) {
        var l = s._container;
        this._container.appendChild(l), s.options.interactive && s.addInteractiveTarget(l);
      },
      _removePath: function(s) {
        var l = s._container;
        jt(l), s.removeInteractiveTarget(l), delete this._layers[u(s)];
      },
      _updateStyle: function(s) {
        var l = s._stroke, h = s._fill, f = s.options, _ = s._container;
        _.stroked = !!f.stroke, _.filled = !!f.fill, f.stroke ? (l || (l = s._stroke = ur("stroke")), _.appendChild(l), l.weight = f.weight + "px", l.color = f.color, l.opacity = f.opacity, f.dashArray ? l.dashStyle = P(f.dashArray) ? f.dashArray.join(" ") : f.dashArray.replace(/( *, *)/g, " ") : l.dashStyle = "", l.endcap = f.lineCap.replace("butt", "flat"), l.joinstyle = f.lineJoin) : l && (_.removeChild(l), s._stroke = null), f.fill ? (h || (h = s._fill = ur("fill")), _.appendChild(h), h.color = f.fillColor || f.color, h.opacity = f.fillOpacity) : h && (_.removeChild(h), s._fill = null);
      },
      _updateCircle: function(s) {
        var l = s._point.round(), h = Math.round(s._radius), f = Math.round(s._radiusY || h);
        this._setPath(s, s._empty() ? "M0 0" : "AL " + l.x + "," + l.y + " " + h + "," + f + " 0," + 65535 * 360);
      },
      _setPath: function(s, l) {
        s._path.v = l;
      },
      _bringToFront: function(s) {
        Ji(s._container);
      },
      _bringToBack: function(s) {
        ts(s._container);
      }
    }, Zo = X.vml ? ur : qs, hr = Pn.extend({
      _initContainer: function() {
        this._container = Zo("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Zo("g"), this._container.appendChild(this._rootGroup);
      },
      _destroyContainer: function() {
        jt(this._container), Ct(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          Pn.prototype._update.call(this);
          var s = this._bounds, l = s.getSize(), h = this._container;
          (!this._svgSize || !this._svgSize.equals(l)) && (this._svgSize = l, h.setAttribute("width", l.x), h.setAttribute("height", l.y)), Zt(h, s.min), h.setAttribute("viewBox", [s.min.x, s.min.y, l.x, l.y].join(" ")), this.fire("update");
        }
      },
      // methods below are called by vector layers implementations
      _initPath: function(s) {
        var l = s._path = Zo("path");
        s.options.className && ut(l, s.options.className), s.options.interactive && ut(l, "leaflet-interactive"), this._updateStyle(s), this._layers[u(s)] = s;
      },
      _addPath: function(s) {
        this._rootGroup || this._initContainer(), this._rootGroup.appendChild(s._path), s.addInteractiveTarget(s._path);
      },
      _removePath: function(s) {
        jt(s._path), s.removeInteractiveTarget(s._path), delete this._layers[u(s)];
      },
      _updatePath: function(s) {
        s._project(), s._update();
      },
      _updateStyle: function(s) {
        var l = s._path, h = s.options;
        l && (h.stroke ? (l.setAttribute("stroke", h.color), l.setAttribute("stroke-opacity", h.opacity), l.setAttribute("stroke-width", h.weight), l.setAttribute("stroke-linecap", h.lineCap), l.setAttribute("stroke-linejoin", h.lineJoin), h.dashArray ? l.setAttribute("stroke-dasharray", h.dashArray) : l.removeAttribute("stroke-dasharray"), h.dashOffset ? l.setAttribute("stroke-dashoffset", h.dashOffset) : l.removeAttribute("stroke-dashoffset")) : l.setAttribute("stroke", "none"), h.fill ? (l.setAttribute("fill", h.fillColor || h.color), l.setAttribute("fill-opacity", h.fillOpacity), l.setAttribute("fill-rule", h.fillRule || "evenodd")) : l.setAttribute("fill", "none"));
      },
      _updatePoly: function(s, l) {
        this._setPath(s, Ks(s._parts, l));
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
        Ji(s._path);
      },
      _bringToBack: function(s) {
        ts(s._path);
      }
    });
    X.vml && hr.include($0);
    function vf(s) {
      return X.svg || X.vml ? new hr(s) : null;
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
        return this.options.preferCanvas && _f(s) || vf(s);
      }
    });
    var yf = is.extend({
      initialize: function(s, l) {
        is.prototype.initialize.call(this, this._boundsToLatLngs(s), l);
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
    function Y0(s, l) {
      return new yf(s, l);
    }
    hr.create = Zo, hr.pointsToPath = Ks, Sn.geometryToLayer = Ro, Sn.coordsToLatLng = vc, Sn.coordsToLatLngs = Do, Sn.latLngToCoords = yc, Sn.latLngsToCoords = Fo, Sn.getFeature = ss, Sn.asFeature = Bo, gt.mergeOptions({
      // @option boxZoom: Boolean = true
      // Whether the map can be zoomed to a rectangular area specified by
      // dragging the mouse while pressing the shift key.
      boxZoom: !0
    });
    var xf = ln.extend({
      initialize: function(s) {
        this._map = s, this._container = s._container, this._pane = s._panes.overlayPane, this._resetStateTimeout = 0, s.on("unload", this._destroy, this);
      },
      addHooks: function() {
        at(this._container, "mousedown", this._onMouseDown, this);
      },
      removeHooks: function() {
        Ct(this._container, "mousedown", this._onMouseDown, this);
      },
      moved: function() {
        return this._moved;
      },
      _destroy: function() {
        jt(this._pane), delete this._pane;
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
        this._clearDeferredResetState(), this._resetState(), nr(), ec(), this._startPoint = this._map.mouseEventToContainerPoint(s), at(document, {
          contextmenu: Si,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseMove: function(s) {
        this._moved || (this._moved = !0, this._box = yt("div", "leaflet-zoom-box", this._container), ut(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(s);
        var l = new G(this._point, this._startPoint), h = l.getSize();
        Zt(this._box, l.min), this._box.style.width = h.x + "px", this._box.style.height = h.y + "px";
      },
      _finish: function() {
        this._moved && (jt(this._box), Bt(this._container, "leaflet-crosshair")), ir(), nc(), Ct(document, {
          contextmenu: Si,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseUp: function(s) {
        if (!(s.which !== 1 && s.button !== 1) && (this._finish(), !!this._moved)) {
          this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(a(this._resetState, this), 0);
          var l = new _t(
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
    gt.addInitHook("addHandler", "boxZoom", xf), gt.mergeOptions({
      // @option doubleClickZoom: Boolean|String = true
      // Whether the map can be zoomed in by double clicking on it and
      // zoomed out by double clicking while holding shift. If passed
      // `'center'`, double-click zoom will zoom to the center of the
      //  view regardless of where the mouse was.
      doubleClickZoom: !0
    });
    var wf = ln.extend({
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
    gt.addInitHook("addHandler", "doubleClickZoom", wf), gt.mergeOptions({
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
    var bf = ln.extend({
      addHooks: function() {
        if (!this._draggable) {
          var s = this._map;
          this._draggable = new Vn(s._mapPane, s._container), this._draggable.on({
            dragstart: this._onDragStart,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this), this._draggable.on("predrag", this._onPreDragLimit, this), s.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), s.on("zoomend", this._onZoomEnd, this), s.whenReady(this._onZoomEnd, this));
        }
        ut(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
      },
      removeHooks: function() {
        Bt(this._map._container, "leaflet-grab"), Bt(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
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
          this._offsetLimit = rt(
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
          var _ = this._lastPos.subtract(this._positions[0]), x = (this._lastTime - this._times[0]) / 1e3, C = h.easeLinearity, E = _.multiplyBy(C / x), z = E.distanceTo([0, 0]), D = Math.min(h.inertiaMaxSpeed, z), U = E.multiplyBy(D / z), nt = D / (h.inertiaDeceleration * C), ft = U.multiplyBy(-nt / 2).round();
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
    gt.addInitHook("addHandler", "dragging", bf), gt.mergeOptions({
      // @option keyboard: Boolean = true
      // Makes the map focusable and allows users to navigate the map with keyboard
      // arrows and `+`/`-` keys.
      keyboard: !0,
      // @option keyboardPanDelta: Number = 80
      // Amount of pixels to pan when pressing an arrow key.
      keyboardPanDelta: 80
    });
    var kf = ln.extend({
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
        s.tabIndex <= 0 && (s.tabIndex = "0"), at(s, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this), this._map.on({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      removeHooks: function() {
        this._removeHooks(), Ct(this._map._container, {
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
        at(document, "keydown", this._onKeyDown, this);
      },
      _removeHooks: function() {
        Ct(document, "keydown", this._onKeyDown, this);
      },
      _onKeyDown: function(s) {
        if (!(s.altKey || s.ctrlKey || s.metaKey)) {
          var l = s.keyCode, h = this._map, f;
          if (l in this._panKeys) {
            if (!h._panAnim || !h._panAnim._inProgress)
              if (f = this._panKeys[l], s.shiftKey && (f = F(f).multiplyBy(3)), h.options.maxBounds && (f = h._limitOffset(F(f), h.options.maxBounds)), h.options.worldCopyJump) {
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
          Si(s);
        }
      }
    });
    gt.addInitHook("addHandler", "keyboard", kf), gt.mergeOptions({
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
    var Sf = ln.extend({
      addHooks: function() {
        at(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
      },
      removeHooks: function() {
        Ct(this._map._container, "wheel", this._onWheelScroll, this);
      },
      _onWheelScroll: function(s) {
        var l = Yd(s), h = this._map.options.wheelDebounceTime;
        this._delta += l, this._lastMousePos = this._map.mouseEventToContainerPoint(s), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
        var f = Math.max(h - (+/* @__PURE__ */ new Date() - this._startTime), 0);
        clearTimeout(this._timer), this._timer = setTimeout(a(this._performZoom, this), f), Si(s);
      },
      _performZoom: function() {
        var s = this._map, l = s.getZoom(), h = this._map.options.zoomSnap || 0;
        s._stop();
        var f = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), _ = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(f)))) / Math.LN2, x = h ? Math.ceil(_ / h) * h : _, C = s._limitZoom(l + (this._delta > 0 ? x : -x)) - l;
        this._delta = 0, this._startTime = null, C && (s.options.scrollWheelZoom === "center" ? s.setZoom(l + C) : s.setZoomAround(this._lastMousePos, l + C));
      }
    });
    gt.addInitHook("addHandler", "scrollWheelZoom", Sf);
    var q0 = 600;
    gt.mergeOptions({
      // @section Touch interaction options
      // @option tapHold: Boolean
      // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
      tapHold: X.touchNative && X.safari && X.mobile,
      // @option tapTolerance: Number = 15
      // The max number of pixels a user can shift his finger during touch
      // for it to be considered a valid tap.
      tapTolerance: 15
    });
    var Pf = ln.extend({
      addHooks: function() {
        at(this._map._container, "touchstart", this._onDown, this);
      },
      removeHooks: function() {
        Ct(this._map._container, "touchstart", this._onDown, this);
      },
      _onDown: function(s) {
        if (clearTimeout(this._holdTimeout), s.touches.length === 1) {
          var l = s.touches[0];
          this._startPos = this._newPos = new I(l.clientX, l.clientY), this._holdTimeout = setTimeout(a(function() {
            this._cancel(), this._isTapValid() && (at(document, "touchend", se), at(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", l));
          }, this), q0), at(document, "touchend touchcancel contextmenu", this._cancel, this), at(document, "touchmove", this._onMove, this);
        }
      },
      _cancelClickPrevent: function s() {
        Ct(document, "touchend", se), Ct(document, "touchend touchcancel", s);
      },
      _cancel: function() {
        clearTimeout(this._holdTimeout), Ct(document, "touchend touchcancel contextmenu", this._cancel, this), Ct(document, "touchmove", this._onMove, this);
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
    gt.addInitHook("addHandler", "tapHold", Pf), gt.mergeOptions({
      // @section Touch interaction options
      // @option touchZoom: Boolean|String = *
      // Whether the map can be zoomed by touch-dragging with two fingers. If
      // passed `'center'`, it will zoom to the center of the view regardless of
      // where the touch events (fingers) were. Enabled for touch-capable web
      // browsers.
      touchZoom: X.touch,
      // @option bounceAtZoomLimits: Boolean = true
      // Set it to false if you don't want the map to zoom beyond min/max zoom
      // and then bounce back when pinch-zooming.
      bounceAtZoomLimits: !0
    });
    var Mf = ln.extend({
      addHooks: function() {
        ut(this._map._container, "leaflet-touch-zoom"), at(this._map._container, "touchstart", this._onTouchStart, this);
      },
      removeHooks: function() {
        Bt(this._map._container, "leaflet-touch-zoom"), Ct(this._map._container, "touchstart", this._onTouchStart, this);
      },
      _onTouchStart: function(s) {
        var l = this._map;
        if (!(!s.touches || s.touches.length !== 2 || l._animatingZoom || this._zooming)) {
          var h = l.mouseEventToContainerPoint(s.touches[0]), f = l.mouseEventToContainerPoint(s.touches[1]);
          this._centerPoint = l.getSize()._divideBy(2), this._startLatLng = l.containerPointToLatLng(this._centerPoint), l.options.touchZoom !== "center" && (this._pinchStartLatLng = l.containerPointToLatLng(h.add(f)._divideBy(2))), this._startDist = h.distanceTo(f), this._startZoom = l.getZoom(), this._moved = !1, this._zooming = !0, l._stop(), at(document, "touchmove", this._onTouchMove, this), at(document, "touchend touchcancel", this._onTouchEnd, this), se(s);
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
          this._moved || (l._moveStart(!0, !1), this._moved = !0), q(this._animRequest);
          var C = a(l._move, l, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
          this._animRequest = V(C, this, !0), se(s);
        }
      },
      _onTouchEnd: function() {
        if (!this._moved || !this._zooming) {
          this._zooming = !1;
          return;
        }
        this._zooming = !1, q(this._animRequest), Ct(document, "touchmove", this._onTouchMove, this), Ct(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
      }
    });
    gt.addInitHook("addHandler", "touchZoom", Mf), gt.BoxZoom = xf, gt.DoubleClickZoom = wf, gt.Drag = bf, gt.Keyboard = kf, gt.ScrollWheelZoom = Sf, gt.TapHold = Pf, gt.TouchZoom = Mf, n.Bounds = G, n.Browser = X, n.CRS = Qt, n.Canvas = gf, n.Circle = _c, n.CircleMarker = Io, n.Class = K, n.Control = Ke, n.DivIcon = ff, n.DivOverlay = cn, n.DomEvent = d0, n.DomUtil = u0, n.Draggable = Vn, n.Evented = st, n.FeatureGroup = bn, n.GeoJSON = Sn, n.GridLayer = cr, n.Handler = ln, n.Icon = ns, n.ImageOverlay = Ho, n.LatLng = lt, n.LatLngBounds = _t, n.Layer = Xe, n.LayerGroup = es, n.LineUtil = P0, n.Map = gt, n.Marker = Ao, n.Mixin = y0, n.Path = Zn, n.Point = I, n.PolyUtil = x0, n.Polygon = is, n.Polyline = kn, n.Popup = Wo, n.PosAnimation = qd, n.Projection = M0, n.Rectangle = yf, n.Renderer = Pn, n.SVG = hr, n.SVGOverlay = df, n.TileLayer = rs, n.Tooltip = Vo, n.Transformation = $s, n.Util = xt, n.VideoOverlay = hf, n.bind = a, n.bounds = rt, n.canvas = _f, n.circle = O0, n.circleMarker = j0, n.control = or, n.divIcon = V0, n.extend = r, n.featureGroup = N0, n.geoJSON = uf, n.geoJson = R0, n.gridLayer = Z0, n.icon = E0, n.imageOverlay = D0, n.latLng = J, n.latLngBounds = dt, n.layerGroup = T0, n.map = f0, n.marker = z0, n.point = F, n.polygon = I0, n.polyline = A0, n.popup = H0, n.rectangle = Y0, n.setOptions = w, n.stamp = u, n.svg = vf, n.svgOverlay = B0, n.tileLayer = pf, n.tooltip = W0, n.transformation = xi, n.version = i, n.videoOverlay = F0;
    var K0 = window.L;
    n.noConflict = function() {
      return window.L = K0, this;
    }, window.L = n;
  });
})(gh, gh.exports);
var ZM = gh.exports;
const ba = /* @__PURE__ */ mg(ZM), UM = "".trim(), jy = (e) => e.replace(/\/$/, ""), $M = () => {
  const e = jy(UM);
  return e ? typeof window > "u" || !/^https?:\/\//i.test(e) ? e : window.location.protocol === "https:" && e.startsWith("http://") ? e.replace(/^http:\/\//i, "https://") : e : "";
}, Yr = $M(), bt = (e) => Yr ? `${Yr}${e}` : e, Md = "wildlife_admin_token", YM = () => {
  if (!Yr) return "";
  const e = typeof window < "u", t = e && window.location.protocol === "https:";
  try {
    const n = e ? window.location.origin : "http://localhost", i = new URL(Yr, n), r = t || i.protocol === "https:" ? "wss:" : "ws:";
    return i.protocol = r, jy(i.toString());
  } catch {
    let n = Yr.replace(
      /^https?:\/\//i,
      (i) => i.toLowerCase().startsWith("https") ? "wss://" : "ws://"
    );
    return t && (n = n.replace(/^ws:\/\//i, "wss://")), n;
  }
}, lg = YM(), qM = (e) => lg ? `${lg}${e}` : `${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}${e}`, KM = 2e4, Ht = {
  adminLogin: bt("/api/admin/login"),
  adminLogout: bt("/api/admin/logout"),
  adminRefresh: bt("/api/admin/refresh"),
  summary: bt("/api/dashboard-summary"),
  chart: bt("/api/chart-data"),
  map: bt("/api/map-data"),
  alerts: bt("/api/alerts?limit=60"),
  reports: bt("/api/reports?limit=50"),
  osint: bt("/api/osint-feed?limit=30"),
  syncStatus: bt("/api/sync-status"),
  filterNews: bt("/api/filter-news"),
  exportCsv: bt("/api/export/csv"),
  exportPdf: bt("/api/export/pdf"),
  exportExcel: bt("/api/export/excel"),
  exportExcelIncidentsReports: bt("/api/export/excel-incidents-reports"),
  exportBriefing: bt("/api/export/briefing-pack"),
  publicDownloadCsv: bt("/api/public/download-csv"),
  publicDownloadDb: bt("/api/public/download-db"),
  publicUploadDb: bt("/api/public/upload-db"),
  predictions: bt("/api/predictions"),
  predictionsTrain: bt("/api/predictions/train"),
  predictionsHotspots: bt("/api/predictions/hotspots"),
  predictionsPersons: bt("/api/predictions/persons"),
  graphNetworks: bt("/api/graph/networks"),
  graphPersonProfile: (e) => bt(`/api/graph/person/${encodeURIComponent(e)}`),
  ragQuery: bt("/api/rag/query"),
  searchSemantic: bt("/api/search/semantic"),
  adminReanalyze: bt("/api/admin/reanalyze"),
  reviewIncident: (e) => bt(`/api/incidents/${e}/review`),
  wsLive: (e) => qM(`/api/ws/live?token=${e}`)
};
function Us(e, t = "") {
  const n = String(e || "").trim() || String(t || "").trim();
  return n ? /^https?:\/\//i.test(n) ? n : n.startsWith("//") ? `https:${n}` : n.startsWith("/") ? bt(n) : n.startsWith("www.") ? `https://${n}` : /^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(n) ? `https://${n}` : "#" : "#";
}
async function Cd(e, t = {}, n = KM) {
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
  const i = $l(), r = i ? { Authorization: `Bearer ${i}` } : {}, o = await Cd(e, { cache: "no-store", headers: r, signal: n });
  if (o.status === 401 && t && i && await Ld())
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
async function Es(e, t, { includeAuth: n = !0, retry: i = !0, signal: r } = {}) {
  const o = n ? $l() : "", a = { "Content-Type": "application/json" };
  o && (a.Authorization = `Bearer ${o}`);
  const c = await Cd(e, {
    method: "POST",
    headers: a,
    body: JSON.stringify(t || {}),
    signal: r
  });
  if (c.status === 401 && i && o && n && await Ld())
    return Es(e, t, { includeAuth: n, retry: !1, signal: r });
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
async function Oy(e, t, { includeAuth: n = !0, retry: i = !0, signal: r } = {}) {
  const o = n ? $l() : "", a = { "Content-Type": "application/json" };
  o && (a.Authorization = `Bearer ${o}`);
  const c = await Cd(e, {
    method: "PATCH",
    headers: a,
    body: JSON.stringify(t || {}),
    signal: r
  });
  if (c.status === 401 && i && o && n && await Ld())
    return Oy(e, t, { includeAuth: n, retry: !1, signal: r });
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
async function Ld() {
  try {
    const e = await Es(Ht.adminRefresh, {}, { includeAuth: !1 });
    if (e != null && e.access_token)
      return Ay(e.access_token), !0;
  } catch (e) {
    console.error("Token refresh failed:", e);
  }
  return !1;
}
function $l() {
  return String(localStorage.getItem(Md) || "").trim();
}
function Ay(e) {
  const t = String(e || "").trim();
  t && localStorage.setItem(Md, t);
}
function XM() {
  localStorage.removeItem(Md);
}
function cg(e) {
  const t = new URLSearchParams();
  return Object.entries(e).forEach(([n, i]) => {
    String(i || "").trim() !== "" && t.set(n, i);
  }), t.toString();
}
function GM({ mapData: e, onMapError: t }) {
  var a;
  const n = W.useRef(null), i = W.useRef(null), r = W.useRef(null);
  W.useEffect(() => {
    var c, u;
    if (!(!n.current || !e))
      try {
        i.current || (i.current = ba.map(n.current, { zoomControl: !0, attributionControl: !0 }).setView(
          [((c = e.center) == null ? void 0 : c.lat) || 22.97, ((u = e.center) == null ? void 0 : u.lng) || 78.65],
          5
        ), ba.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 12,
          attribution: "&copy; OpenStreetMap contributors"
        }).addTo(i.current), r.current = ba.layerGroup().addTo(i.current));
        const d = r.current;
        if (!d) return;
        d.clearLayers(), (e.markers || []).slice(0, 600).forEach((p) => {
          if (typeof p.lat != "number" || typeof p.lng != "number") return;
          const g = Ul(p.risk_score), v = g === "high" ? "#C75050" : g === "medium" ? "#C9933D" : "#5A9E6F", y = ba.circleMarker([p.lat, p.lng], {
            radius: g === "high" ? 8 : g === "medium" ? 7 : 6,
            color: v,
            fillColor: v,
            fillOpacity: 0.8,
            weight: 2
          }), S = (p.title || "Incident").replace(/</g, "&lt;"), w = Us(p.open_url, p.url).replace(/"/g, "&quot;");
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
        /* @__PURE__ */ m.jsx(Py, { size: 16, className: "card-head-icon" }),
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
const Iy = "label";
function ug(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
function QM(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function Ry(e, t) {
  e.labels = t;
}
function Dy(e, t, n = Iy) {
  const i = [];
  e.datasets = t.map((r) => {
    const o = e.datasets.find((a) => a[n] === r[n]);
    return !o || !r.data || i.includes(o) ? {
      ...r
    } : (i.push(o), Object.assign(o, r), o);
  });
}
function JM(e, t = Iy) {
  const n = {
    labels: [],
    datasets: []
  };
  return Ry(n, e.labels), Dy(n, e.datasets, t), n;
}
function tC(e, t) {
  const { height: n = 150, width: i = 300, redraw: r = !1, datasetIdKey: o, type: a, data: c, options: u, plugins: d = [], fallbackContent: p, updateMode: g, ...v } = e, y = W.useRef(null), S = W.useRef(null), w = () => {
    y.current && (S.current = new Wl(y.current, {
      type: a,
      data: JM(c, o),
      options: u && {
        ...u
      },
      plugins: d
    }), ug(t, S.current));
  }, M = () => {
    ug(t, null), S.current && (S.current.destroy(), S.current = null);
  };
  return W.useEffect(() => {
    !r && S.current && u && QM(S.current, u);
  }, [
    r,
    u
  ]), W.useEffect(() => {
    !r && S.current && Ry(S.current.config.data, c.labels);
  }, [
    r,
    c.labels
  ]), W.useEffect(() => {
    !r && S.current && c.datasets && Dy(S.current.config.data, c.datasets, o);
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
const eC = /* @__PURE__ */ W.forwardRef(tC);
function Td(e, t) {
  return Wl.register(t), /* @__PURE__ */ W.forwardRef((n, i) => /* @__PURE__ */ m.jsx(eC, {
    ...n,
    ref: i,
    type: e
  }));
}
const nC = /* @__PURE__ */ Td("line", Ra), hg = /* @__PURE__ */ Td("bar", Ia), iC = /* @__PURE__ */ Td("doughnut", Nr), _h = "#6B6966", dg = "rgba(26, 25, 23, 0.06)", Fy = "#6B6966", us = {
  responsive: !0,
  maintainAspectRatio: !1,
  interaction: { mode: "index", intersect: !1 },
  plugins: {
    legend: {
      labels: {
        color: Fy,
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
      ticks: { color: _h, font: { family: "Inter, sans-serif", size: 10 } },
      grid: { color: dg, drawBorder: !1 },
      border: { display: !1 }
    },
    y: {
      ticks: { color: _h, font: { family: "JetBrains Mono, monospace", size: 10 } },
      grid: { color: dg, drawBorder: !1 },
      border: { display: !1 }
    }
  }
}, sC = {
  responsive: !0,
  maintainAspectRatio: !1,
  cutout: "62%",
  plugins: {
    legend: {
      position: "right",
      labels: {
        color: Fy,
        font: { family: "Inter, sans-serif", size: 11 },
        usePointStyle: !0,
        boxWidth: 8,
        padding: 10
      }
    },
    tooltip: us.plugins.tooltip
  }
};
function rC({ chartData: e }) {
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
    ...us,
    indexAxis: "y",
    scales: {
      ...us.scales,
      y: {
        ...us.scales.y,
        ticks: { color: _h, font: { family: "Inter, sans-serif", size: 10 } }
      }
    }
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "charts-grid", id: "section-analytics", children: [
    /* @__PURE__ */ m.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ m.jsx(wy, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ m.jsx("h2", { children: "Incident Timeline" })
        ] }),
        /* @__PURE__ */ m.jsx("span", { className: "badge", children: t.granularity || "daily" })
      ] }),
      /* @__PURE__ */ m.jsx("div", { className: "card-body", children: /* @__PURE__ */ m.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ m.jsx(nC, { data: o, options: us }) }) })
    ] }),
    /* @__PURE__ */ m.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ m.jsx(ky, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ m.jsx("h2", { children: "Top States" })
        ] }),
        /* @__PURE__ */ m.jsx("span", { className: "card-count mono", children: n.length })
      ] }),
      /* @__PURE__ */ m.jsx("div", { className: "card-body", children: /* @__PURE__ */ m.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ m.jsx(hg, { data: a, options: us }) }) })
    ] }),
    /* @__PURE__ */ m.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ m.jsx(PP, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ m.jsx("h2", { children: "Species Distribution" })
        ] }),
        /* @__PURE__ */ m.jsx("span", { className: "card-count mono", children: i.length })
      ] }),
      /* @__PURE__ */ m.jsx("div", { className: "card-body", children: /* @__PURE__ */ m.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ m.jsx(iC, { data: u, options: sC }) }) })
    ] }),
    /* @__PURE__ */ m.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ m.jsx(Ty, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ m.jsx("h2", { children: "Source Reliability" })
        ] }),
        /* @__PURE__ */ m.jsx("span", { className: "card-count mono", children: r.length })
      ] }),
      /* @__PURE__ */ m.jsx("div", { className: "card-body", children: /* @__PURE__ */ m.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ m.jsx(hg, { data: d, options: p }) }) })
    ] })
  ] });
}
const oC = {
  q: "",
  species: "",
  state: "",
  date_from: "",
  date_to: "",
  crime_type: "",
  severity: "",
  source: ""
};
function aC({ filters: e, filterOptions: t, onChange: n, onApply: i, onBriefing: r }) {
  const o = Object.values(e).filter((u) => String(u || "").trim() !== "").length;
  function a(u, d) {
    n({ ...e, [u]: d });
  }
  function c() {
    n(oC);
  }
  return /* @__PURE__ */ m.jsxs("article", { className: "card filters-card", id: "section-incidents", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ m.jsx(ag, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ m.jsx("h2", { children: "Analyst Filters" }),
        o > 0 ? /* @__PURE__ */ m.jsxs("span", { className: "badge", children: [
          o,
          " active"
        ] }) : null
      ] }),
      /* @__PURE__ */ m.jsxs("button", { type: "button", className: "btn btn-ghost", onClick: c, children: [
        /* @__PURE__ */ m.jsx(dM, { size: 14 }),
        /* @__PURE__ */ m.jsx("span", { className: "btn-label", children: "Reset" })
      ] })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "filter-grid", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "filter-field", style: { gridColumn: "span 2" }, children: [
          /* @__PURE__ */ m.jsx("label", { className: "filter-label", htmlFor: "f-search", children: "Search" }),
          /* @__PURE__ */ m.jsxs("div", { className: "input-with-icon", children: [
            /* @__PURE__ */ m.jsx(_M, { size: 14, className: "icon" }),
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
            /* @__PURE__ */ m.jsx(by, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Briefing Pack" })
          ] }),
          /* @__PURE__ */ m.jsxs("button", { type: "button", className: "btn btn-primary", onClick: i, children: [
            /* @__PURE__ */ m.jsx(ag, { size: 14 }),
            /* @__PURE__ */ m.jsx("span", { children: "Apply Filters" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function lC({ rows: e, loading: t, onSelectRow: n }) {
  return /* @__PURE__ */ m.jsxs("article", { className: "card table-card", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ m.jsx(Ny, { size: 16, className: "card-head-icon" }),
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
          const r = Ul(i.risk_score), o = i.review_status || "pending";
          return /* @__PURE__ */ m.jsxs(
            "tr",
            {
              onClick: () => n && n(i),
              style: { cursor: "pointer" },
              className: "clickable-row",
              children: [
                /* @__PURE__ */ m.jsx("td", { className: "cell-mono", children: Ey(i.date) }),
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
                    href: Us(i.open_url, i.url),
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "feed-link",
                    "aria-label": "Open source article",
                    onClick: (a) => a.stopPropagation(),
                    children: [
                      "Open ",
                      /* @__PURE__ */ m.jsx(Po, { size: 12 })
                    ]
                  }
                ) })
              ]
            },
            i.id
          );
        }),
        !e.length && !t ? /* @__PURE__ */ m.jsx("tr", { children: /* @__PURE__ */ m.jsxs("td", { colSpan: 12, className: "empty-cell", children: [
          /* @__PURE__ */ m.jsx("div", { className: "empty-cell-icon", children: /* @__PURE__ */ m.jsx(mM, { size: 20 }) }),
          "No incidents match the current filters."
        ] }) }) : null
      ] })
    ] }) }) })
  ] });
}
function cC() {
  var g, v, y, S;
  const [e, t] = W.useState(null), [n, i] = W.useState(!0), [r, o] = W.useState(null), [a, c] = W.useState(null), u = W.useRef(null), d = W.useRef(0), p = W.useCallback(async () => {
    var b;
    d.current += 1;
    const w = d.current;
    (b = u.current) == null || b.abort();
    const M = new AbortController();
    u.current = M, i(!0);
    try {
      const k = new URLSearchParams({ limit: "10000", min_size: "2", incident_limit: "10000" }), P = await mn(`${Ht.graphNetworks}?${k.toString()}`, { signal: M.signal });
      if (w !== d.current) return;
      t(P), c((T) => {
        if (!P.networks || P.networks.length === 0) return null;
        if (T != null && T.network_id) {
          const N = P.networks.find((A) => A.network_id === T.network_id);
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
    /* @__PURE__ */ m.jsx(wl, { size: 24, className: "spin" }),
    /* @__PURE__ */ m.jsx("p", { children: "Analyzing criminal networks..." })
  ] }) : /* @__PURE__ */ m.jsxs("div", { className: "network-container", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "network-header", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "header-info", children: [
        /* @__PURE__ */ m.jsx(mh, { size: 24, className: "accent-icon" }),
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
        /* @__PURE__ */ m.jsx(wl, { size: 14, className: n ? "spin" : "" }),
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
                  /* @__PURE__ */ m.jsx(AM, { size: 12 }),
                  " ",
                  w.suspect_count,
                  " Suspects"
                ] }),
                /* @__PURE__ */ m.jsxs("span", { className: "cluster-stats", children: [
                  /* @__PURE__ */ m.jsx(TM, { size: 12 }),
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
              /* @__PURE__ */ m.jsx(LP, { size: 14, className: "chevron" })
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
              /* @__PURE__ */ m.jsx(jM, { size: 18 }),
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
              /* @__PURE__ */ m.jsx(My, { size: 18 }),
              " Operation Areas"
            ] }),
            /* @__PURE__ */ m.jsx("div", { className: "pill-cloud", children: (v = a.top_states) == null ? void 0 : v.map((w, M) => /* @__PURE__ */ m.jsxs("span", { className: "location-pill", children: [
              w.state,
              " ",
              /* @__PURE__ */ m.jsx("span", { className: "pill-count", children: w.count })
            ] }, `${w.state || "state"}-${M}`)) }),
            /* @__PURE__ */ m.jsxs("h3", { style: { marginTop: "24px" }, children: [
              /* @__PURE__ */ m.jsx(by, { size: 18 }),
              " Species Targeted"
            ] }),
            /* @__PURE__ */ m.jsx("div", { className: "pill-cloud", children: (y = a.top_species) == null ? void 0 : y.map((w, M) => /* @__PURE__ */ m.jsxs("span", { className: "species-pill", children: [
              w.species,
              " ",
              /* @__PURE__ */ m.jsx("span", { className: "pill-count", children: w.count })
            ] }, `${w.species || "species"}-${M}`)) }),
            /* @__PURE__ */ m.jsxs("h3", { style: { marginTop: "24px" }, children: [
              /* @__PURE__ */ m.jsx(Po, { size: 18 }),
              " Linked Incidents"
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "incident-list", children: [
              (S = a.linked_incidents) == null ? void 0 : S.map((w, M) => {
                const b = Us(w.url, w.open_url), k = /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
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
        /* @__PURE__ */ m.jsx(mh, { size: 48, className: "faint-icon" }),
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
function uC({ onSelectIncident: e }) {
  var p, g;
  const [t, n] = W.useState(""), [i, r] = W.useState(!1), [o, a] = W.useState(null), [c, u] = W.useState(null), d = async (v) => {
    if (v.preventDefault(), !!t.trim()) {
      r(!0), u(null);
      try {
        const y = await Es(Ht.ragQuery, {
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
        /* @__PURE__ */ m.jsx(bM, { size: 18, className: "sparkle-icon" }),
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
      /* @__PURE__ */ m.jsx("button", { type: "submit", className: "btn-primary semantic-btn", disabled: i || !t.trim(), children: i ? /* @__PURE__ */ m.jsx(KP, { size: 18, className: "spin" }) : /* @__PURE__ */ m.jsx(wP, { size: 18 }) })
    ] }),
    c && /* @__PURE__ */ m.jsxs("div", { className: "semantic-error", children: [
      /* @__PURE__ */ m.jsx(ZP, { size: 14 }),
      /* @__PURE__ */ m.jsx("span", { children: c })
    ] }),
    o && /* @__PURE__ */ m.jsxs("div", { className: "semantic-result-area animate-fade-in", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "result-answer", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "answer-header", children: [
          /* @__PURE__ */ m.jsx(rM, { size: 16 }),
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
function hC({ alerts: e }) {
  return /* @__PURE__ */ m.jsxs("article", { className: "card", id: "section-alerts", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ m.jsx(Cy, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ m.jsx("h2", { children: "Live High-Risk Alerts" })
      ] }),
      /* @__PURE__ */ m.jsxs("span", { className: "card-count mono", children: [
        e.length,
        " active"
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "card-body-flush", children: e.length === 0 ? /* @__PURE__ */ m.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ m.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ m.jsx(Sy, { size: 20 }) }),
      /* @__PURE__ */ m.jsx("div", { children: "No active alerts" })
    ] }) : /* @__PURE__ */ m.jsx("div", { className: "feed", children: e.slice(0, 25).map((t) => {
      const n = Ul(t.risk_score);
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
            href: Us(t.open_url, t.url),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "feed-link",
            children: [
              "Open source ",
              /* @__PURE__ */ m.jsx(Po, { size: 12 })
            ]
          }
        )
      ] }, t.id);
    }) }) })
  ] });
}
function dC({ items: e }) {
  return /* @__PURE__ */ m.jsxs("article", { className: "card", id: "section-osint", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ m.jsx(Ly, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ m.jsx("h2", { children: "OSINT Signal Feed" })
      ] }),
      /* @__PURE__ */ m.jsxs("span", { className: "card-count mono", children: [
        e.length,
        " signals"
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "card-body-flush", children: e.length === 0 ? /* @__PURE__ */ m.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ m.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ m.jsx(Sy, { size: 20 }) }),
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
            href: Us(t.open_url, t.url),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "feed-link",
            children: [
              "Open source ",
              /* @__PURE__ */ m.jsx(Po, { size: 12 })
            ]
          }
        )
      ] }, t.id);
    }) }) })
  ] });
}
function fC({ items: e }) {
  return /* @__PURE__ */ m.jsxs("article", { className: "card", id: "section-reco", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ m.jsx(ph, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ m.jsx("h2", { children: "Top Recommendations" })
      ] }),
      /* @__PURE__ */ m.jsx("span", { className: "card-count mono", children: e.length })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "card-body-flush", children: e.length === 0 ? /* @__PURE__ */ m.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ m.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ m.jsx(ph, { size: 20 }) }),
      /* @__PURE__ */ m.jsx("div", { children: "No recommendations generated yet" })
    ] }) : /* @__PURE__ */ m.jsx("div", { className: "feed", children: e.map(([t, n]) => /* @__PURE__ */ m.jsxs("div", { className: "reco-row", children: [
      /* @__PURE__ */ m.jsx("span", { children: t }),
      /* @__PURE__ */ m.jsx("span", { className: "reco-count", children: n })
    ] }, t)) }) })
  ] });
}
Wl.register(dh, fh, Ba, ni, zr, Ha, sP, XS, ZS);
const pC = 15e3, fg = {
  q: "",
  species: "",
  state: "",
  date_from: "",
  date_to: "",
  crime_type: "",
  severity: "",
  source: ""
}, pg = !1;
(/* @__PURE__ */ new Date()).toISOString();
const mC = (e) => {
  let t = "", n = null;
  return e.forEach((i) => {
    if (!i) return;
    const r = Date.parse(i);
    Number.isNaN(r) || (n === null || r > n) && (n = r, t = i);
  }), t;
};
function gC() {
  return /* @__PURE__ */ m.jsx(_C, {});
}
function _C() {
  var Qs;
  const [e, t] = W.useState(!0), [n, i] = W.useState(""), [r, o] = W.useState(!1), [a, c] = W.useState(() => $l()), [u, d] = W.useState(""), [p, g] = W.useState(!1), [v, y] = W.useState({ username: "", password: "" }), [S, w] = W.useState(null), [M, b] = W.useState(null), [k, P] = W.useState(null), [T, N] = W.useState([]), [A, j] = W.useState([]), [O, H] = W.useState([]), [R, V] = W.useState(null), [q, xt] = W.useState([]), [K, ct] = W.useState(null), [et, st] = W.useState("pending"), [I, Z] = W.useState("");
  W.useEffect(() => {
    K && (st(K.review_status || "pending"), Z(K.review_notes || ""));
  }, [K]);
  const [F, G] = W.useState(fg), [rt, _t] = W.useState(fg);
  W.useEffect(() => {
    const Q = setTimeout(() => {
      _t(F);
    }, 300);
    return () => clearTimeout(Q);
  }, [F]);
  const [dt, lt] = W.useState("overview"), [J, Qt] = W.useState(!1), we = W.useCallback((Q = "Please log in to continue.") => {
    XM(), c(""), d(Q), i(""), o(!1), t(!1);
  }, []), xn = W.useCallback(async () => {
    if (!a || pg) return;
    o(!0);
    const Q = await Promise.allSettled([
      mn(Ht.summary),
      mn(Ht.chart),
      mn(Ht.map),
      mn(Ht.alerts),
      mn(Ht.reports),
      mn(Ht.osint),
      mn(Ht.syncStatus)
    ]);
    if (Q.some(
      (ce) => {
        var Wn;
        return ce.status === "rejected" && Number((Wn = ce.reason) == null ? void 0 : Wn.status) === 401;
      }
    )) {
      we("Session expired. Please sign in again.");
      return;
    }
    const [it, Ft, Yt, Jt, le, wt, ie] = Q;
    it.status === "fulfilled" && w(it.value), Ft.status === "fulfilled" && b(Ft.value), Yt.status === "fulfilled" && P(Yt.value), Jt.status === "fulfilled" && N(Array.isArray(Jt.value) ? Jt.value : []), le.status === "fulfilled" && H(Array.isArray(le.value) ? le.value : []), wt.status === "fulfilled" && j(Array.isArray(wt.value) ? wt.value : []), ie.status === "fulfilled" && V(ie.value), Q.every((ce) => ce.status === "rejected") ? i("Unable to load dashboard data right now.") : i(""), t(!1), o(!1);
  }, [a, we]), wn = W.useCallback(async () => {
    if (!a || pg) return;
    const Q = cg({ ...rt, min_confidence: 0, limit: 120 });
    try {
      const tt = await mn(`${Ht.filterNews}?${Q}`);
      xt(Array.isArray(tt.items) ? tt.items : []);
    } catch (tt) {
      Number(tt == null ? void 0 : tt.status) === 401 ? we("Session expired. Please sign in again.") : (console.error("Failed to refresh filtered incidents:", tt), i((it) => it || "Incident feed is temporarily unavailable."));
    }
  }, [a, rt, we]);
  W.useEffect(() => {
    if (!a) {
      t(!1);
      return;
    }
    const Q = Ht.wsLive(a);
    let tt = null, it = null;
    function Ft() {
      tt = new WebSocket(Q), tt.onmessage = (Jt) => {
        try {
          const { channel: le, data: wt } = JSON.parse(Jt.data);
          if (le === "alerts") {
            const ie = (wt == null ? void 0 : wt.payload) || wt;
            N((ce) => [ie, ...ce].slice(0, 100));
          } else if (le === "incidents") {
            const ie = (wt == null ? void 0 : wt.payload) || wt;
            xt((ce) => [ie, ...ce].slice(0, 200));
          } else le === "sync_status" && ((wt == null ? void 0 : wt.type) === "sync_snapshot" && wt.snapshot ? V(wt.snapshot) : (wt == null ? void 0 : wt.type) === "sync_completed" ? V((ie) => ({
            ...ie,
            running: !1,
            finished_at: wt.finished_at || (/* @__PURE__ */ new Date()).toISOString(),
            duration_seconds: wt.duration_seconds,
            stats: wt.stats || (ie == null ? void 0 : ie.stats),
            message: `Completed in ${(wt.duration_seconds || 0).toFixed(1)}s`
          })) : V(wt));
        } catch (le) {
          console.error("WS parse error:", le);
        }
      }, tt.onclose = () => {
        it = window.setTimeout(Ft, 5e3);
      }, tt.onerror = (Jt) => {
        console.error("WS error:", Jt), tt.close();
      };
    }
    Ft(), t(!0), xn();
    const Yt = window.setInterval(() => {
      xn();
    }, pC);
    return () => {
      window.clearInterval(Yt), it && window.clearTimeout(it), tt && (tt.onclose = null, tt.close());
    };
  }, [a, xn]), W.useEffect(() => {
    wn();
  }, [wn]), W.useEffect(() => {
    const Q = ["overview", "map", "alerts", "networks", "analytics", "incidents", "osint", "reco"], tt = [];
    return Q.forEach((it) => {
      const Ft = document.getElementById(`section-${it}`);
      if (!Ft) return;
      const Yt = new IntersectionObserver(
        (Jt) => {
          Jt.forEach((le) => {
            le.isIntersecting && lt(it);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      Yt.observe(Ft), tt.push(Yt);
    }), () => tt.forEach((it) => it.disconnect());
  }, [e]);
  const $s = W.useMemo(() => {
    const Q = /* @__PURE__ */ new Map();
    return O.forEach((tt) => {
      const it = (tt.recommendation || "").trim();
      it && Q.set(it, (Q.get(it) || 0) + 1);
    }), [...Q.entries()].sort((tt, it) => it[1] - tt[1]).slice(0, 8);
  }, [O]), xi = (M == null ? void 0 : M.filters) || { states: [], species: [], crime_types: [], sources: [] }, Ys = W.useMemo(
    () => {
      var Q;
      return mC([
        S == null ? void 0 : S.last_sync_time,
        R == null ? void 0 : R.finished_at,
        (Q = R == null ? void 0 : R.last_search) == null ? void 0 : Q.updated_at,
        R == null ? void 0 : R.started_at
      ]);
    },
    [S == null ? void 0 : S.last_sync_time, R == null ? void 0 : R.finished_at, (Qs = R == null ? void 0 : R.last_search) == null ? void 0 : Qs.updated_at, R == null ? void 0 : R.started_at]
  ), Mo = W.useCallback((Q, { last: tt = !1 } = {}) => {
    const it = Q || {}, Ft = typeof it.stage == "string" && it.stage !== "-" ? it.stage : "", Yt = typeof it.provider == "string" && it.provider !== "-" ? it.provider : "", Jt = typeof it.language == "string" && it.language !== "-" ? it.language : "", le = typeof it.query == "string" && it.query !== "-" ? it.query : "", wt = Number.isFinite(Number(it.scanned)) ? Number(it.scanned) : null, ie = Number.isFinite(Number(it.kept)) ? Number(it.kept) : null, ce = [];
    Ft && ce.push(`stage: ${tt ? `last ${Ft}` : Ft}`);
    const Wn = [Yt, Jt].filter(Boolean).join(" / ");
    return Wn && ce.push(`source: ${Wn}`), le && ce.push(`query: ${le}`), wt !== null && ie !== null && ce.push(`scanned ${wt}, kept ${ie}`), ce.join(" • ");
  }, []), qs = W.useMemo(() => R != null && R.running ? Mo(R == null ? void 0 : R.progress, { last: !1 }) : "", [R, Mo]);
  function Ks(Q) {
    if (!a) return;
    const tt = cg({ ...F, min_confidence: 0, admin_token: a }), it = Q === "pdf" ? Ht.exportPdf : Q === "excel" ? Ht.exportExcel : Q === "excel_incidents_reports" ? Ht.exportExcelIncidentsReports : Q === "briefing" ? Ht.exportBriefing : Ht.exportCsv;
    window.location.href = tt ? `${it}?${tt}` : it;
  }
  const Xs = W.useCallback(async () => {
    if (confirm(`Re-analyze the entire historical database?

This will trigger the AI pipeline in the background to classify WPA 1972 protection schedules, offence categories, and penalty classes for all historical records.`))
      try {
        o(!0);
        const Q = await Es(Ht.adminReanalyze, {});
        alert(`Historical analysis queued successfully!

Status: ${Q.status || "queued"}
Message: ${Q.message || "Historical analysis pipeline has been triggered in the background."}`), xn(), wn();
      } catch (Q) {
        alert(`Failed to trigger database re-analysis: ${Q.message}`);
      } finally {
        o(!1);
      }
  }, [xn, wn]), Gi = W.useCallback(async (Q, tt, it) => {
    try {
      o(!0);
      const Ft = await Oy(Ht.reviewIncident(Q), {
        review_status: tt,
        review_notes: it
      });
      xt(
        (Yt) => Yt.map((Jt) => Jt.id === Q ? { ...Jt, ...Ft } : Jt)
      ), ct((Yt) => Yt && Yt.id === Q ? { ...Yt, ...Ft } : Yt), alert(`Incident review updated to: ${tt.toUpperCase()}`);
    } catch (Ft) {
      alert(`Failed to submit review: ${Ft.message}`);
    } finally {
      o(!1);
    }
  }, []);
  async function Yl(Q) {
    Q.preventDefault(), g(!0), d("");
    try {
      const tt = await Es(
        Ht.adminLogin,
        { username: v.username.trim(), password: v.password },
        { includeAuth: !1 }
      ), it = String((tt == null ? void 0 : tt.access_token) || "").trim();
      if (!it) {
        d("Login failed. Missing access token.");
        return;
      }
      Ay(it), c(it), y({ username: "", password: "" }), t(!0);
    } catch (tt) {
      Number(tt == null ? void 0 : tt.status) === 401 ? d("Invalid username or password.") : Number(tt == null ? void 0 : tt.status) === 429 ? d("Too many login attempts. Try again in a minute.") : d(String((tt == null ? void 0 : tt.message) || "Unable to login right now."));
    } finally {
      g(!1);
    }
  }
  async function Co() {
    try {
      await Es(Ht.adminLogout, {}, { includeAuth: !0 });
    } catch {
    }
    we("Signed out.");
  }
  function Gs(Q) {
    lt(Q), Qt(!1);
  }
  return a ? /* @__PURE__ */ m.jsxs("div", { className: "app", children: [
    /* @__PURE__ */ m.jsx(
      FM,
      {
        activeSection: dt,
        onSelect: Gs,
        isOpen: J,
        syncStatus: R,
        lastSync: Ys
      }
    ),
    /* @__PURE__ */ m.jsx(
      "div",
      {
        className: `scrim ${J ? "is-visible" : ""}`,
        onClick: () => Qt(!1),
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ m.jsxs("div", { className: "main", children: [
      /* @__PURE__ */ m.jsx(
        BM,
        {
          activeSection: dt,
          busy: r,
          syncStatus: R,
          onRefresh: xn,
          onExport: Ks,
          onToggleMenu: () => Qt((Q) => !Q),
          onLogout: Co,
          onReanalyze: Xs
        }
      ),
      /* @__PURE__ */ m.jsxs("div", { className: "content", children: [
        n ? /* @__PURE__ */ m.jsxs("div", { className: "status error", role: "alert", children: [
          /* @__PURE__ */ m.jsx(rg, { size: 16 }),
          /* @__PURE__ */ m.jsx("span", { children: n })
        ] }) : null,
        R != null && R.running ? /* @__PURE__ */ m.jsxs("div", { className: "status info", role: "status", children: [
          /* @__PURE__ */ m.jsx(wy, { size: 16 }),
          /* @__PURE__ */ m.jsxs("span", { children: [
            R.message || "Search in progress...",
            qs ? ` - ${qs}` : ""
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
          /* @__PURE__ */ m.jsx(VM, { summary: S, loading: e })
        ] }),
        /* @__PURE__ */ m.jsxs("section", { className: "dashboard-section", id: "section-map", children: [
          /* @__PURE__ */ m.jsx("div", { className: "section-header", children: /* @__PURE__ */ m.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ m.jsx("span", { className: "section-number", children: "02" }),
            /* @__PURE__ */ m.jsxs("div", { children: [
              /* @__PURE__ */ m.jsx("h2", { children: "Operations Center" }),
              /* @__PURE__ */ m.jsx("p", { children: "Geographic incident mapping" })
            ] })
          ] }) }),
          /* @__PURE__ */ m.jsx(GM, { mapData: k, onMapError: i })
        ] }),
        /* @__PURE__ */ m.jsxs("section", { className: "dashboard-section", id: "section-alerts", children: [
          /* @__PURE__ */ m.jsx("div", { className: "section-header", children: /* @__PURE__ */ m.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ m.jsx("span", { className: "section-number", children: "03" }),
            /* @__PURE__ */ m.jsxs("div", { children: [
              /* @__PURE__ */ m.jsx("h2", { children: "Live High-Risk Alerts" }),
              /* @__PURE__ */ m.jsx("p", { children: "Immediate notifications for critical poaching and trafficking signals" })
            ] })
          ] }) }),
          /* @__PURE__ */ m.jsx(hC, { alerts: T })
        ] }),
        /* @__PURE__ */ m.jsxs("section", { className: "dashboard-section", id: "section-networks", children: [
          /* @__PURE__ */ m.jsx("div", { className: "section-header", children: /* @__PURE__ */ m.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ m.jsx("span", { className: "section-number", children: "04" }),
            /* @__PURE__ */ m.jsxs("div", { children: [
              /* @__PURE__ */ m.jsx("h2", { children: "Network Intelligence" }),
              /* @__PURE__ */ m.jsx("p", { children: "Analyzing connections between suspects and organized crime groups" })
            ] })
          ] }) }),
          /* @__PURE__ */ m.jsx("article", { className: "card network-card", children: /* @__PURE__ */ m.jsx(cC, {}) })
        ] }),
        /* @__PURE__ */ m.jsxs("section", { className: "dashboard-section", id: "section-analytics", children: [
          /* @__PURE__ */ m.jsx("div", { className: "section-header", children: /* @__PURE__ */ m.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ m.jsx("span", { className: "section-number", children: "05" }),
            /* @__PURE__ */ m.jsxs("div", { children: [
              /* @__PURE__ */ m.jsx("h2", { children: "Intelligence Analytics" }),
              /* @__PURE__ */ m.jsx("p", { children: "Trends, distributions, and source reliability metrics" })
            ] })
          ] }) }),
          /* @__PURE__ */ m.jsx(rC, { chartData: M })
        ] }),
        /* @__PURE__ */ m.jsxs("section", { className: "dashboard-section", id: "section-incidents", children: [
          /* @__PURE__ */ m.jsx("div", { className: "section-header", children: /* @__PURE__ */ m.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ m.jsx("span", { className: "section-number", children: "06" }),
            /* @__PURE__ */ m.jsxs("div", { children: [
              /* @__PURE__ */ m.jsx("h2", { children: "Incident Database" }),
              /* @__PURE__ */ m.jsx("p", { children: "Search and filter wildlife crime reports" })
            ] })
          ] }) }),
          /* @__PURE__ */ m.jsx(uC, {}),
          /* @__PURE__ */ m.jsx(
            aC,
            {
              filters: F,
              filterOptions: xi,
              onChange: G,
              onApply: () => wn(),
              onBriefing: () => Ks("briefing")
            }
          ),
          /* @__PURE__ */ m.jsx(
            lC,
            {
              rows: q,
              loading: e,
              onSelectRow: (Q) => ct(Q)
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
            /* @__PURE__ */ m.jsx(dC, { items: A }),
            /* @__PURE__ */ m.jsx(fC, { items: $s })
          ] })
        ] })
      ] })
    ] }),
    K && /* @__PURE__ */ m.jsx("div", { className: "modal-overlay", onClick: () => ct(null), children: /* @__PURE__ */ m.jsxs("div", { className: "modal-container", onClick: (Q) => Q.stopPropagation(), children: [
      /* @__PURE__ */ m.jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ m.jsxs("div", { className: "modal-title-area", children: [
          /* @__PURE__ */ m.jsxs("div", { className: "modal-title-pills", children: [
            /* @__PURE__ */ m.jsxs("span", { className: `risk-pill ${Ul(K.risk_score)}`, children: [
              "Risk: ",
              K.risk_score
            ] }),
            /* @__PURE__ */ m.jsx("span", { className: `status-pill ${K.review_status || "pending"}`, children: K.review_status || "pending" })
          ] }),
          /* @__PURE__ */ m.jsx("h1", { className: "modal-title", children: K.title })
        ] }),
        /* @__PURE__ */ m.jsx(
          "button",
          {
            type: "button",
            className: "modal-close-btn",
            onClick: () => ct(null),
            "aria-label": "Close modal",
            children: /* @__PURE__ */ m.jsx(RM, { size: 20 })
          }
        )
      ] }),
      /* @__PURE__ */ m.jsxs("div", { className: "modal-body", children: [
        /* @__PURE__ */ m.jsxs("div", { children: [
          /* @__PURE__ */ m.jsx("h3", { className: "modal-section-title", children: "General Intelligence" }),
          /* @__PURE__ */ m.jsxs("div", { className: "metadata-grid", children: [
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "Date" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value cell-mono", children: Ey(K.date) })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "Species" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value", children: K.species || "—" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "State" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value", children: K.state || "—" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "District" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value", children: K.district || "—" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "Crime Type" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value", children: K.crime_type || "—" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "Involved Persons" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value", children: K.involved_persons || "—" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "Source" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value", children: K.source || "—" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "metadata-item", children: [
              /* @__PURE__ */ m.jsx("span", { className: "metadata-label", children: "AI Confidence" }),
              /* @__PURE__ */ m.jsx("span", { className: "metadata-value cell-mono", children: Number(K.confidence || 0).toFixed(2) })
            ] })
          ] })
        ] }),
        K.summary && /* @__PURE__ */ m.jsxs("div", { children: [
          /* @__PURE__ */ m.jsx("h3", { className: "modal-section-title", children: "Incident Summary" }),
          /* @__PURE__ */ m.jsx("div", { className: "description-box", children: K.summary })
        ] }),
        /* @__PURE__ */ m.jsxs("div", { children: [
          /* @__PURE__ */ m.jsx("h3", { className: "modal-section-title", children: "Wildlife Protection Act (WPA) 1972 Classification" }),
          /* @__PURE__ */ m.jsxs("div", { className: "classification-grid", children: [
            /* @__PURE__ */ m.jsxs("div", { className: "classification-card", children: [
              /* @__PURE__ */ m.jsx("span", { className: "label", children: "WPA Schedule" }),
              /* @__PURE__ */ m.jsx("span", { className: "value", children: K.wpa_schedule || "Not Classified" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "classification-card", children: [
              /* @__PURE__ */ m.jsx("span", { className: "label", children: "WPA Section" }),
              /* @__PURE__ */ m.jsx("span", { className: "value", children: K.wpa_section || "Not Classified" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "classification-card", children: [
              /* @__PURE__ */ m.jsx("span", { className: "label", children: "Offence Type" }),
              /* @__PURE__ */ m.jsx("span", { className: "value", children: K.wpa_offence_type || "Not Classified" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "classification-card", children: [
              /* @__PURE__ */ m.jsx("span", { className: "label", children: "Penalty Class" }),
              /* @__PURE__ */ m.jsx("span", { className: "value", children: K.wpa_penalty_class || "Not Classified" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "classification-card", children: [
              /* @__PURE__ */ m.jsx("span", { className: "label", children: "Protected Area Type" }),
              /* @__PURE__ */ m.jsx("span", { className: "value", children: K.protected_area_type || "None / Not Applicable" })
            ] }),
            /* @__PURE__ */ m.jsxs("div", { className: "classification-card", children: [
              /* @__PURE__ */ m.jsx("span", { className: "label", children: "Enforcement Authority" }),
              /* @__PURE__ */ m.jsx("span", { className: "value", children: K.enforcement_authority || "Local Police / Forest Dept." })
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
                className: `review-status-btn pending ${et === "pending" ? "active" : ""}`,
                onClick: () => st("pending"),
                children: "Pending"
              }
            ),
            /* @__PURE__ */ m.jsx(
              "button",
              {
                type: "button",
                className: `review-status-btn approved ${et === "approved" ? "active" : ""}`,
                onClick: () => st("approved"),
                children: "Approve"
              }
            ),
            /* @__PURE__ */ m.jsx(
              "button",
              {
                type: "button",
                className: `review-status-btn rejected ${et === "rejected" ? "active" : ""}`,
                onClick: () => st("rejected"),
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
              onChange: (Q) => Z(Q.target.value)
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
            onClick: () => ct(null),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ m.jsxs(
          "a",
          {
            href: Us(K.open_url, K.url),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "btn",
            style: { marginRight: "auto" },
            children: [
              "Open Article ",
              /* @__PURE__ */ m.jsx(Po, { size: 14, style: { marginLeft: "4px" } })
            ]
          }
        ),
        /* @__PURE__ */ m.jsx(
          "button",
          {
            type: "button",
            className: "btn btn-primary",
            onClick: () => Gi(K.id, et, I),
            disabled: r,
            children: r ? "Saving..." : "Save Review"
          }
        )
      ] })
    ] }) })
  ] }) : /* @__PURE__ */ m.jsx("div", { className: "auth-shell", children: /* @__PURE__ */ m.jsxs("article", { className: "card auth-card", children: [
    /* @__PURE__ */ m.jsx("div", { className: "card-head", children: /* @__PURE__ */ m.jsxs("div", { className: "card-head-left", children: [
      /* @__PURE__ */ m.jsx(Ty, { size: 16, className: "card-head-icon" }),
      /* @__PURE__ */ m.jsx("h2", { children: "Authorized Access" })
    ] }) }),
    /* @__PURE__ */ m.jsxs("div", { className: "card-body auth-card-body", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "auth-brand", children: [
        /* @__PURE__ */ m.jsx("h1", { children: "Wildlife Crime Intelligence Center" }),
        /* @__PURE__ */ m.jsx("p", { children: "Sign in with authorized credentials to continue." })
      ] }),
      /* @__PURE__ */ m.jsxs("form", { className: "auth-form", onSubmit: Yl, children: [
        /* @__PURE__ */ m.jsxs("label", { className: "auth-field", children: [
          /* @__PURE__ */ m.jsx("span", { children: "Username" }),
          /* @__PURE__ */ m.jsx(
            "input",
            {
              value: v.username,
              onChange: (Q) => y((tt) => ({ ...tt, username: Q.target.value })),
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
              onChange: (Q) => y((tt) => ({ ...tt, password: Q.target.value })),
              autoComplete: "current-password",
              required: !0
            }
          )
        ] }),
        u ? /* @__PURE__ */ m.jsxs("div", { className: "status error auth-status", role: "alert", children: [
          /* @__PURE__ */ m.jsx(rg, { size: 16 }),
          /* @__PURE__ */ m.jsx("span", { children: u })
        ] }) : null,
        /* @__PURE__ */ m.jsxs("button", { className: "btn btn-primary auth-submit", type: "submit", disabled: p, children: [
          /* @__PURE__ */ m.jsx(GP, { size: 14 }),
          p ? "Signing in..." : "Sign in"
        ] })
      ] })
    ] })
  ] }) });
}
class vC extends bx.Component {
  constructor(t) {
    super(t), this.state = { hasError: !1, message: "", redirecting: !1 };
  }
  static getDerivedStateFromError(t) {
    return { hasError: !0, message: t instanceof Error ? t.message : "Unknown runtime error" };
  }
  componentDidCatch(t) {
    console.error("Dashboard runtime error:", t);
    const n = t instanceof Error ? t.message : "";
    typeof window < "u" && /WebSocket/i.test(n) && /insecure/i.test(n) && (this.setState({ redirecting: !0 }), window.setTimeout(() => {
      window.location.replace("/legacy?legacy=1");
    }, 1500));
  }
  render() {
    return this.state.hasError ? /* @__PURE__ */ m.jsxs("div", { style: { padding: "24px", color: "#e8edff", fontFamily: "Inter, sans-serif" }, children: [
      /* @__PURE__ */ m.jsx("h2", { style: { marginTop: 0 }, children: "Dashboard failed to load" }),
      /* @__PURE__ */ m.jsx("p", { style: { opacity: 0.9 }, children: this.state.message || "Unexpected client error." }),
      /* @__PURE__ */ m.jsx("p", { style: { opacity: 0.8 }, children: this.state.redirecting ? "Redirecting to the legacy dashboard..." : /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
        "Open ",
        /* @__PURE__ */ m.jsx("a", { href: "/legacy?legacy=1", style: { color: "#9ec2ff" }, children: "legacy dashboard" }),
        " while this is being fixed."
      ] }) })
    ] }) : this.props.children;
  }
}
const uu = document.getElementById("root");
if (uu) {
  window.addEventListener("error", (e) => {
    console.error("Window error:", e.error || e.message);
  }), window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled promise rejection:", e.reason);
  });
  try {
    window.__WILDLIFE_DASHBOARD_BOOTED__ = !0, Lv(uu).render(
      /* @__PURE__ */ m.jsx(vC, { children: /* @__PURE__ */ m.jsx(gC, {}) })
    );
  } catch (e) {
    console.error("Fatal dashboard bootstrap error:", e), uu.innerHTML = `
      <div style="padding:24px;color:#e8edff;font-family:Inter,sans-serif">
        <h2 style="margin-top:0">Dashboard failed to initialize</h2>
        <p>${e instanceof Error ? e.message : "Unknown bootstrap error"}</p>
        <p><a href="/legacy?legacy=1" style="color:#9ec2ff">Open legacy dashboard</a></p>
      </div>
    `;
  }
}
