var B0 = Object.defineProperty;
var F0 = (e, t, n) => t in e ? B0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Y = (e, t, n) => F0(e, typeof t != "symbol" ? t + "" : t, n);
var H0 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Jm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var tg = { exports: {} }, ol = {}, eg = { exports: {} }, ct = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var so = Symbol.for("react.element"), W0 = Symbol.for("react.portal"), V0 = Symbol.for("react.fragment"), Z0 = Symbol.for("react.strict_mode"), U0 = Symbol.for("react.profiler"), $0 = Symbol.for("react.provider"), Y0 = Symbol.for("react.context"), K0 = Symbol.for("react.forward_ref"), G0 = Symbol.for("react.suspense"), X0 = Symbol.for("react.memo"), q0 = Symbol.for("react.lazy"), gf = Symbol.iterator;
function Q0(e) {
  return e === null || typeof e != "object" ? null : (e = gf && e[gf] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ng = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ig = Object.assign, sg = {};
function Os(e, t, n) {
  this.props = e, this.context = t, this.refs = sg, this.updater = n || ng;
}
Os.prototype.isReactComponent = {};
Os.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Os.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function rg() {
}
rg.prototype = Os.prototype;
function Jc(e, t, n) {
  this.props = e, this.context = t, this.refs = sg, this.updater = n || ng;
}
var th = Jc.prototype = new rg();
th.constructor = Jc;
ig(th, Os.prototype);
th.isPureReactComponent = !0;
var _f = Array.isArray, og = Object.prototype.hasOwnProperty, eh = { current: null }, ag = { key: !0, ref: !0, __self: !0, __source: !0 };
function lg(e, t, n) {
  var i, r = {}, o = null, l = null;
  if (t != null) for (i in t.ref !== void 0 && (l = t.ref), t.key !== void 0 && (o = "" + t.key), t) og.call(t, i) && !ag.hasOwnProperty(i) && (r[i] = t[i]);
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    for (var c = Array(u), d = 0; d < u; d++) c[d] = arguments[d + 2];
    r.children = c;
  }
  if (e && e.defaultProps) for (i in u = e.defaultProps, u) r[i] === void 0 && (r[i] = u[i]);
  return { $$typeof: so, type: e, key: o, ref: l, props: r, _owner: eh.current };
}
function J0(e, t) {
  return { $$typeof: so, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function nh(e) {
  return typeof e == "object" && e !== null && e.$$typeof === so;
}
function tx(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var vf = /\/+/g;
function su(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? tx("" + e.key) : t.toString(36);
}
function ua(e, t, n, i, r) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var l = !1;
  if (e === null) l = !0;
  else switch (o) {
    case "string":
    case "number":
      l = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case so:
        case W0:
          l = !0;
      }
  }
  if (l) return l = e, r = r(l), e = i === "" ? "." + su(l, 0) : i, _f(r) ? (n = "", e != null && (n = e.replace(vf, "$&/") + "/"), ua(r, t, n, "", function(d) {
    return d;
  })) : r != null && (nh(r) && (r = J0(r, n + (!r.key || l && l.key === r.key ? "" : ("" + r.key).replace(vf, "$&/") + "/") + e)), t.push(r)), 1;
  if (l = 0, i = i === "" ? "." : i + ":", _f(e)) for (var u = 0; u < e.length; u++) {
    o = e[u];
    var c = i + su(o, u);
    l += ua(o, t, n, c, r);
  }
  else if (c = Q0(e), typeof c == "function") for (e = c.call(e), u = 0; !(o = e.next()).done; ) o = o.value, c = i + su(o, u++), l += ua(o, t, n, c, r);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return l;
}
function zo(e, t, n) {
  if (e == null) return e;
  var i = [], r = 0;
  return ua(e, i, "", "", function(o) {
    return t.call(n, o, r++);
  }), i;
}
function ex(e) {
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
var he = { current: null }, ca = { transition: null }, nx = { ReactCurrentDispatcher: he, ReactCurrentBatchConfig: ca, ReactCurrentOwner: eh };
function ug() {
  throw Error("act(...) is not supported in production builds of React.");
}
ct.Children = { map: zo, forEach: function(e, t, n) {
  zo(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return zo(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return zo(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!nh(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
ct.Component = Os;
ct.Fragment = V0;
ct.Profiler = U0;
ct.PureComponent = Jc;
ct.StrictMode = Z0;
ct.Suspense = G0;
ct.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = nx;
ct.act = ug;
ct.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var i = ig({}, e.props), r = e.key, o = e.ref, l = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, l = eh.current), t.key !== void 0 && (r = "" + t.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (c in t) og.call(t, c) && !ag.hasOwnProperty(c) && (i[c] = t[c] === void 0 && u !== void 0 ? u[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) i.children = n;
  else if (1 < c) {
    u = Array(c);
    for (var d = 0; d < c; d++) u[d] = arguments[d + 2];
    i.children = u;
  }
  return { $$typeof: so, type: e.type, key: r, ref: o, props: i, _owner: l };
};
ct.createContext = function(e) {
  return e = { $$typeof: Y0, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: $0, _context: e }, e.Consumer = e;
};
ct.createElement = lg;
ct.createFactory = function(e) {
  var t = lg.bind(null, e);
  return t.type = e, t;
};
ct.createRef = function() {
  return { current: null };
};
ct.forwardRef = function(e) {
  return { $$typeof: K0, render: e };
};
ct.isValidElement = nh;
ct.lazy = function(e) {
  return { $$typeof: q0, _payload: { _status: -1, _result: e }, _init: ex };
};
ct.memo = function(e, t) {
  return { $$typeof: X0, type: e, compare: t === void 0 ? null : t };
};
ct.startTransition = function(e) {
  var t = ca.transition;
  ca.transition = {};
  try {
    e();
  } finally {
    ca.transition = t;
  }
};
ct.unstable_act = ug;
ct.useCallback = function(e, t) {
  return he.current.useCallback(e, t);
};
ct.useContext = function(e) {
  return he.current.useContext(e);
};
ct.useDebugValue = function() {
};
ct.useDeferredValue = function(e) {
  return he.current.useDeferredValue(e);
};
ct.useEffect = function(e, t) {
  return he.current.useEffect(e, t);
};
ct.useId = function() {
  return he.current.useId();
};
ct.useImperativeHandle = function(e, t, n) {
  return he.current.useImperativeHandle(e, t, n);
};
ct.useInsertionEffect = function(e, t) {
  return he.current.useInsertionEffect(e, t);
};
ct.useLayoutEffect = function(e, t) {
  return he.current.useLayoutEffect(e, t);
};
ct.useMemo = function(e, t) {
  return he.current.useMemo(e, t);
};
ct.useReducer = function(e, t, n) {
  return he.current.useReducer(e, t, n);
};
ct.useRef = function(e) {
  return he.current.useRef(e);
};
ct.useState = function(e) {
  return he.current.useState(e);
};
ct.useSyncExternalStore = function(e, t, n) {
  return he.current.useSyncExternalStore(e, t, n);
};
ct.useTransition = function() {
  return he.current.useTransition();
};
ct.version = "18.3.1";
eg.exports = ct;
var G = eg.exports;
const ix = /* @__PURE__ */ Jm(G);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sx = G, rx = Symbol.for("react.element"), ox = Symbol.for("react.fragment"), ax = Object.prototype.hasOwnProperty, lx = sx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ux = { key: !0, ref: !0, __self: !0, __source: !0 };
function cg(e, t, n) {
  var i, r = {}, o = null, l = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (l = t.ref);
  for (i in t) ax.call(t, i) && !ux.hasOwnProperty(i) && (r[i] = t[i]);
  if (e && e.defaultProps) for (i in t = e.defaultProps, t) r[i] === void 0 && (r[i] = t[i]);
  return { $$typeof: rx, type: e, key: o, ref: l, props: r, _owner: lx.current };
}
ol.Fragment = ox;
ol.jsx = cg;
ol.jsxs = cg;
tg.exports = ol;
var v = tg.exports, hg = { exports: {} }, Le = {}, dg = { exports: {} }, fg = {};
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
  function t(I, $) {
    var B = I.length;
    I.push($);
    t: for (; 0 < B; ) {
      var X = B - 1 >>> 1, tt = I[X];
      if (0 < r(tt, $)) I[X] = $, I[B] = tt, B = X;
      else break t;
    }
  }
  function n(I) {
    return I.length === 0 ? null : I[0];
  }
  function i(I) {
    if (I.length === 0) return null;
    var $ = I[0], B = I.pop();
    if (B !== $) {
      I[0] = B;
      t: for (var X = 0, tt = I.length, bt = tt >>> 1; X < bt; ) {
        var ot = 2 * (X + 1) - 1, nt = I[ot], q = ot + 1, qt = I[q];
        if (0 > r(nt, B)) q < tt && 0 > r(qt, nt) ? (I[X] = qt, I[q] = B, X = q) : (I[X] = nt, I[ot] = B, X = ot);
        else if (q < tt && 0 > r(qt, B)) I[X] = qt, I[q] = B, X = q;
        else break t;
      }
    }
    return $;
  }
  function r(I, $) {
    var B = I.sortIndex - $.sortIndex;
    return B !== 0 ? B : I.id - $.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var l = Date, u = l.now();
    e.unstable_now = function() {
      return l.now() - u;
    };
  }
  var c = [], d = [], p = 1, g = null, _ = 3, x = !1, S = !1, k = !1, C = typeof setTimeout == "function" ? setTimeout : null, w = typeof clearTimeout == "function" ? clearTimeout : null, b = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function P(I) {
    for (var $ = n(d); $ !== null; ) {
      if ($.callback === null) i(d);
      else if ($.startTime <= I) i(d), $.sortIndex = $.expirationTime, t(c, $);
      else break;
      $ = n(d);
    }
  }
  function T(I) {
    if (k = !1, P(I), !S) if (n(c) !== null) S = !0, J(E);
    else {
      var $ = n(d);
      $ !== null && ut(T, $.startTime - I);
    }
  }
  function E(I, $) {
    S = !1, k && (k = !1, w(A), A = -1), x = !0;
    var B = _;
    try {
      for (P($), g = n(c); g !== null && (!(g.expirationTime > $) || I && !V()); ) {
        var X = g.callback;
        if (typeof X == "function") {
          g.callback = null, _ = g.priorityLevel;
          var tt = X(g.expirationTime <= $);
          $ = e.unstable_now(), typeof tt == "function" ? g.callback = tt : g === n(c) && i(c), P($);
        } else i(c);
        g = n(c);
      }
      if (g !== null) var bt = !0;
      else {
        var ot = n(d);
        ot !== null && ut(T, ot.startTime - $), bt = !1;
      }
      return bt;
    } finally {
      g = null, _ = B, x = !1;
    }
  }
  var N = !1, D = null, A = -1, H = 5, j = -1;
  function V() {
    return !(e.unstable_now() - j < H);
  }
  function U() {
    if (D !== null) {
      var I = e.unstable_now();
      j = I;
      var $ = !0;
      try {
        $ = D(!0, I);
      } finally {
        $ ? vt() : (N = !1, D = null);
      }
    } else N = !1;
  }
  var vt;
  if (typeof b == "function") vt = function() {
    b(U);
  };
  else if (typeof MessageChannel < "u") {
    var rt = new MessageChannel(), lt = rt.port2;
    rt.port1.onmessage = U, vt = function() {
      lt.postMessage(null);
    };
  } else vt = function() {
    C(U, 0);
  };
  function J(I) {
    D = I, N || (N = !0, vt());
  }
  function ut(I, $) {
    A = C(function() {
      I(e.unstable_now());
    }, $);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(I) {
    I.callback = null;
  }, e.unstable_continueExecution = function() {
    S || x || (S = !0, J(E));
  }, e.unstable_forceFrameRate = function(I) {
    0 > I || 125 < I ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : H = 0 < I ? Math.floor(1e3 / I) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return _;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(I) {
    switch (_) {
      case 1:
      case 2:
      case 3:
        var $ = 3;
        break;
      default:
        $ = _;
    }
    var B = _;
    _ = $;
    try {
      return I();
    } finally {
      _ = B;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(I, $) {
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
    var B = _;
    _ = I;
    try {
      return $();
    } finally {
      _ = B;
    }
  }, e.unstable_scheduleCallback = function(I, $, B) {
    var X = e.unstable_now();
    switch (typeof B == "object" && B !== null ? (B = B.delay, B = typeof B == "number" && 0 < B ? X + B : X) : B = X, I) {
      case 1:
        var tt = -1;
        break;
      case 2:
        tt = 250;
        break;
      case 5:
        tt = 1073741823;
        break;
      case 4:
        tt = 1e4;
        break;
      default:
        tt = 5e3;
    }
    return tt = B + tt, I = { id: p++, callback: $, priorityLevel: I, startTime: B, expirationTime: tt, sortIndex: -1 }, B > X ? (I.sortIndex = B, t(d, I), n(c) === null && I === n(d) && (k ? (w(A), A = -1) : k = !0, ut(T, B - X))) : (I.sortIndex = tt, t(c, I), S || x || (S = !0, J(E))), I;
  }, e.unstable_shouldYield = V, e.unstable_wrapCallback = function(I) {
    var $ = _;
    return function() {
      var B = _;
      _ = $;
      try {
        return I.apply(this, arguments);
      } finally {
        _ = B;
      }
    };
  };
})(fg);
dg.exports = fg;
var cx = dg.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hx = G, Ce = cx;
function F(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var pg = /* @__PURE__ */ new Set(), Ar = {};
function Hi(e, t) {
  bs(e, t), bs(e + "Capture", t);
}
function bs(e, t) {
  for (Ar[e] = t, e = 0; e < t.length; e++) pg.add(t[e]);
}
var Tn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Yu = Object.prototype.hasOwnProperty, dx = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, yf = {}, xf = {};
function fx(e) {
  return Yu.call(xf, e) ? !0 : Yu.call(yf, e) ? !1 : dx.test(e) ? xf[e] = !0 : (yf[e] = !0, !1);
}
function px(e, t, n, i) {
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
function mx(e, t, n, i) {
  if (t === null || typeof t > "u" || px(e, t, n, i)) return !0;
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
function de(e, t, n, i, r, o, l) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = i, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = l;
}
var ee = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ee[e] = new de(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ee[t] = new de(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ee[e] = new de(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ee[e] = new de(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ee[e] = new de(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ee[e] = new de(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ee[e] = new de(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ee[e] = new de(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ee[e] = new de(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ih = /[\-:]([a-z])/g;
function sh(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ih,
    sh
  );
  ee[t] = new de(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ih, sh);
  ee[t] = new de(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ih, sh);
  ee[t] = new de(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ee[e] = new de(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ee.xlinkHref = new de("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ee[e] = new de(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function rh(e, t, n, i) {
  var r = ee.hasOwnProperty(t) ? ee[t] : null;
  (r !== null ? r.type !== 0 : i || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (mx(t, n, r, i) && (n = null), i || r === null ? fx(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : r.mustUseProperty ? e[r.propertyName] = n === null ? r.type === 3 ? !1 : "" : n : (t = r.attributeName, i = r.attributeNamespace, n === null ? e.removeAttribute(t) : (r = r.type, n = r === 3 || r === 4 && n === !0 ? "" : "" + n, i ? e.setAttributeNS(i, t, n) : e.setAttribute(t, n))));
}
var Nn = hx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Oo = Symbol.for("react.element"), is = Symbol.for("react.portal"), ss = Symbol.for("react.fragment"), oh = Symbol.for("react.strict_mode"), Ku = Symbol.for("react.profiler"), mg = Symbol.for("react.provider"), gg = Symbol.for("react.context"), ah = Symbol.for("react.forward_ref"), Gu = Symbol.for("react.suspense"), Xu = Symbol.for("react.suspense_list"), lh = Symbol.for("react.memo"), jn = Symbol.for("react.lazy"), _g = Symbol.for("react.offscreen"), wf = Symbol.iterator;
function Js(e) {
  return e === null || typeof e != "object" ? null : (e = wf && e[wf] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Dt = Object.assign, ru;
function dr(e) {
  if (ru === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    ru = t && t[1] || "";
  }
  return `
` + ru + e;
}
var ou = !1;
function au(e, t) {
  if (!e || ou) return "";
  ou = !0;
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
`), l = r.length - 1, u = o.length - 1; 1 <= l && 0 <= u && r[l] !== o[u]; ) u--;
      for (; 1 <= l && 0 <= u; l--, u--) if (r[l] !== o[u]) {
        if (l !== 1 || u !== 1)
          do
            if (l--, u--, 0 > u || r[l] !== o[u]) {
              var c = `
` + r[l].replace(" at new ", " at ");
              return e.displayName && c.includes("<anonymous>") && (c = c.replace("<anonymous>", e.displayName)), c;
            }
          while (1 <= l && 0 <= u);
        break;
      }
    }
  } finally {
    ou = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? dr(e) : "";
}
function gx(e) {
  switch (e.tag) {
    case 5:
      return dr(e.type);
    case 16:
      return dr("Lazy");
    case 13:
      return dr("Suspense");
    case 19:
      return dr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = au(e.type, !1), e;
    case 11:
      return e = au(e.type.render, !1), e;
    case 1:
      return e = au(e.type, !0), e;
    default:
      return "";
  }
}
function qu(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case ss:
      return "Fragment";
    case is:
      return "Portal";
    case Ku:
      return "Profiler";
    case oh:
      return "StrictMode";
    case Gu:
      return "Suspense";
    case Xu:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case gg:
      return (e.displayName || "Context") + ".Consumer";
    case mg:
      return (e._context.displayName || "Context") + ".Provider";
    case ah:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case lh:
      return t = e.displayName || null, t !== null ? t : qu(e.type) || "Memo";
    case jn:
      t = e._payload, e = e._init;
      try {
        return qu(e(t));
      } catch {
      }
  }
  return null;
}
function _x(e) {
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
      return qu(t);
    case 8:
      return t === oh ? "StrictMode" : "Mode";
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
function si(e) {
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
function vg(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function vx(e) {
  var t = vg(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), i = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var r = n.get, o = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return r.call(this);
    }, set: function(l) {
      i = "" + l, o.call(this, l);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return i;
    }, setValue: function(l) {
      i = "" + l;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function No(e) {
  e._valueTracker || (e._valueTracker = vx(e));
}
function yg(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), i = "";
  return e && (i = vg(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), !0) : !1;
}
function Ca(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Qu(e, t) {
  var n = t.checked;
  return Dt({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function kf(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, i = t.checked != null ? t.checked : t.defaultChecked;
  n = si(t.value != null ? t.value : n), e._wrapperState = { initialChecked: i, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function xg(e, t) {
  t = t.checked, t != null && rh(e, "checked", t, !1);
}
function Ju(e, t) {
  xg(e, t);
  var n = si(t.value), i = t.type;
  if (n != null) i === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (i === "submit" || i === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? tc(e, t.type, n) : t.hasOwnProperty("defaultValue") && tc(e, t.type, si(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function bf(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var i = t.type;
    if (!(i !== "submit" && i !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function tc(e, t, n) {
  (t !== "number" || Ca(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var fr = Array.isArray;
function ms(e, t, n, i) {
  if (e = e.options, t) {
    t = {};
    for (var r = 0; r < n.length; r++) t["$" + n[r]] = !0;
    for (n = 0; n < e.length; n++) r = t.hasOwnProperty("$" + e[n].value), e[n].selected !== r && (e[n].selected = r), r && i && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + si(n), t = null, r = 0; r < e.length; r++) {
      if (e[r].value === n) {
        e[r].selected = !0, i && (e[r].defaultSelected = !0);
        return;
      }
      t !== null || e[r].disabled || (t = e[r]);
    }
    t !== null && (t.selected = !0);
  }
}
function ec(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(F(91));
  return Dt({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Sf(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(F(92));
      if (fr(n)) {
        if (1 < n.length) throw Error(F(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: si(n) };
}
function wg(e, t) {
  var n = si(t.value), i = si(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), i != null && (e.defaultValue = "" + i);
}
function Pf(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function kg(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function nc(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? kg(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Ao, bg = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, i, r) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, i, r);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Ao = Ao || document.createElement("div"), Ao.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Ao.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Ir(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var wr = {
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
}, yx = ["Webkit", "ms", "Moz", "O"];
Object.keys(wr).forEach(function(e) {
  yx.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), wr[t] = wr[e];
  });
});
function Sg(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || wr.hasOwnProperty(e) && wr[e] ? ("" + t).trim() : t + "px";
}
function Pg(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var i = n.indexOf("--") === 0, r = Sg(n, t[n], i);
    n === "float" && (n = "cssFloat"), i ? e.setProperty(n, r) : e[n] = r;
  }
}
var xx = Dt({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function ic(e, t) {
  if (t) {
    if (xx[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(F(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(F(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(F(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(F(62));
  }
}
function sc(e, t) {
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
var rc = null;
function uh(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var oc = null, gs = null, _s = null;
function Mf(e) {
  if (e = ao(e)) {
    if (typeof oc != "function") throw Error(F(280));
    var t = e.stateNode;
    t && (t = hl(t), oc(e.stateNode, e.type, t));
  }
}
function Mg(e) {
  gs ? _s ? _s.push(e) : _s = [e] : gs = e;
}
function Cg() {
  if (gs) {
    var e = gs, t = _s;
    if (_s = gs = null, Mf(e), t) for (e = 0; e < t.length; e++) Mf(t[e]);
  }
}
function Lg(e, t) {
  return e(t);
}
function Tg() {
}
var lu = !1;
function Eg(e, t, n) {
  if (lu) return e(t, n);
  lu = !0;
  try {
    return Lg(e, t, n);
  } finally {
    lu = !1, (gs !== null || _s !== null) && (Tg(), Cg());
  }
}
function Dr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var i = hl(n);
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
  if (n && typeof n != "function") throw Error(F(231, t, typeof n));
  return n;
}
var ac = !1;
if (Tn) try {
  var tr = {};
  Object.defineProperty(tr, "passive", { get: function() {
    ac = !0;
  } }), window.addEventListener("test", tr, tr), window.removeEventListener("test", tr, tr);
} catch {
  ac = !1;
}
function wx(e, t, n, i, r, o, l, u, c) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (p) {
    this.onError(p);
  }
}
var kr = !1, La = null, Ta = !1, lc = null, kx = { onError: function(e) {
  kr = !0, La = e;
} };
function bx(e, t, n, i, r, o, l, u, c) {
  kr = !1, La = null, wx.apply(kx, arguments);
}
function Sx(e, t, n, i, r, o, l, u, c) {
  if (bx.apply(this, arguments), kr) {
    if (kr) {
      var d = La;
      kr = !1, La = null;
    } else throw Error(F(198));
    Ta || (Ta = !0, lc = d);
  }
}
function Wi(e) {
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
function zg(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Cf(e) {
  if (Wi(e) !== e) throw Error(F(188));
}
function Px(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Wi(e), t === null) throw Error(F(188));
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
        if (o === n) return Cf(r), e;
        if (o === i) return Cf(r), t;
        o = o.sibling;
      }
      throw Error(F(188));
    }
    if (n.return !== i.return) n = r, i = o;
    else {
      for (var l = !1, u = r.child; u; ) {
        if (u === n) {
          l = !0, n = r, i = o;
          break;
        }
        if (u === i) {
          l = !0, i = r, n = o;
          break;
        }
        u = u.sibling;
      }
      if (!l) {
        for (u = o.child; u; ) {
          if (u === n) {
            l = !0, n = o, i = r;
            break;
          }
          if (u === i) {
            l = !0, i = o, n = r;
            break;
          }
          u = u.sibling;
        }
        if (!l) throw Error(F(189));
      }
    }
    if (n.alternate !== i) throw Error(F(190));
  }
  if (n.tag !== 3) throw Error(F(188));
  return n.stateNode.current === n ? e : t;
}
function Og(e) {
  return e = Px(e), e !== null ? Ng(e) : null;
}
function Ng(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ng(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ag = Ce.unstable_scheduleCallback, Lf = Ce.unstable_cancelCallback, Mx = Ce.unstable_shouldYield, Cx = Ce.unstable_requestPaint, Bt = Ce.unstable_now, Lx = Ce.unstable_getCurrentPriorityLevel, ch = Ce.unstable_ImmediatePriority, Ig = Ce.unstable_UserBlockingPriority, Ea = Ce.unstable_NormalPriority, Tx = Ce.unstable_LowPriority, Dg = Ce.unstable_IdlePriority, al = null, ln = null;
function Ex(e) {
  if (ln && typeof ln.onCommitFiberRoot == "function") try {
    ln.onCommitFiberRoot(al, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ye = Math.clz32 ? Math.clz32 : Nx, zx = Math.log, Ox = Math.LN2;
function Nx(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (zx(e) / Ox | 0) | 0;
}
var Io = 64, Do = 4194304;
function pr(e) {
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
function za(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var i = 0, r = e.suspendedLanes, o = e.pingedLanes, l = n & 268435455;
  if (l !== 0) {
    var u = l & ~r;
    u !== 0 ? i = pr(u) : (o &= l, o !== 0 && (i = pr(o)));
  } else l = n & ~r, l !== 0 ? i = pr(l) : o !== 0 && (i = pr(o));
  if (i === 0) return 0;
  if (t !== 0 && t !== i && !(t & r) && (r = i & -i, o = t & -t, r >= o || r === 16 && (o & 4194240) !== 0)) return t;
  if (i & 4 && (i |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= i; 0 < t; ) n = 31 - Ye(t), r = 1 << n, i |= e[n], t &= ~r;
  return i;
}
function Ax(e, t) {
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
function Ix(e, t) {
  for (var n = e.suspendedLanes, i = e.pingedLanes, r = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var l = 31 - Ye(o), u = 1 << l, c = r[l];
    c === -1 ? (!(u & n) || u & i) && (r[l] = Ax(u, t)) : c <= t && (e.expiredLanes |= u), o &= ~u;
  }
}
function uc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Rg() {
  var e = Io;
  return Io <<= 1, !(Io & 4194240) && (Io = 64), e;
}
function uu(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ro(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ye(t), e[t] = n;
}
function Dx(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var i = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var r = 31 - Ye(n), o = 1 << r;
    t[r] = 0, i[r] = -1, e[r] = -1, n &= ~o;
  }
}
function hh(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var i = 31 - Ye(n), r = 1 << i;
    r & t | e[i] & t && (e[i] |= t), n &= ~r;
  }
}
var kt = 0;
function jg(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Bg, dh, Fg, Hg, Wg, cc = !1, Ro = [], Gn = null, Xn = null, qn = null, Rr = /* @__PURE__ */ new Map(), jr = /* @__PURE__ */ new Map(), Fn = [], Rx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Tf(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Gn = null;
      break;
    case "dragenter":
    case "dragleave":
      Xn = null;
      break;
    case "mouseover":
    case "mouseout":
      qn = null;
      break;
    case "pointerover":
    case "pointerout":
      Rr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      jr.delete(t.pointerId);
  }
}
function er(e, t, n, i, r, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: i, nativeEvent: o, targetContainers: [r] }, t !== null && (t = ao(t), t !== null && dh(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, r !== null && t.indexOf(r) === -1 && t.push(r), e);
}
function jx(e, t, n, i, r) {
  switch (t) {
    case "focusin":
      return Gn = er(Gn, e, t, n, i, r), !0;
    case "dragenter":
      return Xn = er(Xn, e, t, n, i, r), !0;
    case "mouseover":
      return qn = er(qn, e, t, n, i, r), !0;
    case "pointerover":
      var o = r.pointerId;
      return Rr.set(o, er(Rr.get(o) || null, e, t, n, i, r)), !0;
    case "gotpointercapture":
      return o = r.pointerId, jr.set(o, er(jr.get(o) || null, e, t, n, i, r)), !0;
  }
  return !1;
}
function Vg(e) {
  var t = Mi(e.target);
  if (t !== null) {
    var n = Wi(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = zg(n), t !== null) {
          e.blockedOn = t, Wg(e.priority, function() {
            Fg(n);
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
function ha(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = hc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var i = new n.constructor(n.type, n);
      rc = i, n.target.dispatchEvent(i), rc = null;
    } else return t = ao(n), t !== null && dh(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Ef(e, t, n) {
  ha(e) && n.delete(t);
}
function Bx() {
  cc = !1, Gn !== null && ha(Gn) && (Gn = null), Xn !== null && ha(Xn) && (Xn = null), qn !== null && ha(qn) && (qn = null), Rr.forEach(Ef), jr.forEach(Ef);
}
function nr(e, t) {
  e.blockedOn === t && (e.blockedOn = null, cc || (cc = !0, Ce.unstable_scheduleCallback(Ce.unstable_NormalPriority, Bx)));
}
function Br(e) {
  function t(r) {
    return nr(r, e);
  }
  if (0 < Ro.length) {
    nr(Ro[0], e);
    for (var n = 1; n < Ro.length; n++) {
      var i = Ro[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
  }
  for (Gn !== null && nr(Gn, e), Xn !== null && nr(Xn, e), qn !== null && nr(qn, e), Rr.forEach(t), jr.forEach(t), n = 0; n < Fn.length; n++) i = Fn[n], i.blockedOn === e && (i.blockedOn = null);
  for (; 0 < Fn.length && (n = Fn[0], n.blockedOn === null); ) Vg(n), n.blockedOn === null && Fn.shift();
}
var vs = Nn.ReactCurrentBatchConfig, Oa = !0;
function Fx(e, t, n, i) {
  var r = kt, o = vs.transition;
  vs.transition = null;
  try {
    kt = 1, fh(e, t, n, i);
  } finally {
    kt = r, vs.transition = o;
  }
}
function Hx(e, t, n, i) {
  var r = kt, o = vs.transition;
  vs.transition = null;
  try {
    kt = 4, fh(e, t, n, i);
  } finally {
    kt = r, vs.transition = o;
  }
}
function fh(e, t, n, i) {
  if (Oa) {
    var r = hc(e, t, n, i);
    if (r === null) yu(e, t, i, Na, n), Tf(e, i);
    else if (jx(r, e, t, n, i)) i.stopPropagation();
    else if (Tf(e, i), t & 4 && -1 < Rx.indexOf(e)) {
      for (; r !== null; ) {
        var o = ao(r);
        if (o !== null && Bg(o), o = hc(e, t, n, i), o === null && yu(e, t, i, Na, n), o === r) break;
        r = o;
      }
      r !== null && i.stopPropagation();
    } else yu(e, t, i, null, n);
  }
}
var Na = null;
function hc(e, t, n, i) {
  if (Na = null, e = uh(i), e = Mi(e), e !== null) if (t = Wi(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = zg(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Na = e, null;
}
function Zg(e) {
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
      switch (Lx()) {
        case ch:
          return 1;
        case Ig:
          return 4;
        case Ea:
        case Tx:
          return 16;
        case Dg:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Wn = null, ph = null, da = null;
function Ug() {
  if (da) return da;
  var e, t = ph, n = t.length, i, r = "value" in Wn ? Wn.value : Wn.textContent, o = r.length;
  for (e = 0; e < n && t[e] === r[e]; e++) ;
  var l = n - e;
  for (i = 1; i <= l && t[n - i] === r[o - i]; i++) ;
  return da = r.slice(e, 1 < i ? 1 - i : void 0);
}
function fa(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function jo() {
  return !0;
}
function zf() {
  return !1;
}
function Te(e) {
  function t(n, i, r, o, l) {
    this._reactName = n, this._targetInst = r, this.type = i, this.nativeEvent = o, this.target = l, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(o) : o[u]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? jo : zf, this.isPropagationStopped = zf, this;
  }
  return Dt(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = jo);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = jo);
  }, persist: function() {
  }, isPersistent: jo }), t;
}
var Ns = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, mh = Te(Ns), oo = Dt({}, Ns, { view: 0, detail: 0 }), Wx = Te(oo), cu, hu, ir, ll = Dt({}, oo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: gh, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== ir && (ir && e.type === "mousemove" ? (cu = e.screenX - ir.screenX, hu = e.screenY - ir.screenY) : hu = cu = 0, ir = e), cu);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : hu;
} }), Of = Te(ll), Vx = Dt({}, ll, { dataTransfer: 0 }), Zx = Te(Vx), Ux = Dt({}, oo, { relatedTarget: 0 }), du = Te(Ux), $x = Dt({}, Ns, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Yx = Te($x), Kx = Dt({}, Ns, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Gx = Te(Kx), Xx = Dt({}, Ns, { data: 0 }), Nf = Te(Xx), qx = {
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
}, Qx = {
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
}, Jx = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function t1(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Jx[e]) ? !!t[e] : !1;
}
function gh() {
  return t1;
}
var e1 = Dt({}, oo, { key: function(e) {
  if (e.key) {
    var t = qx[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = fa(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Qx[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: gh, charCode: function(e) {
  return e.type === "keypress" ? fa(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? fa(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), n1 = Te(e1), i1 = Dt({}, ll, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Af = Te(i1), s1 = Dt({}, oo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: gh }), r1 = Te(s1), o1 = Dt({}, Ns, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), a1 = Te(o1), l1 = Dt({}, ll, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), u1 = Te(l1), c1 = [9, 13, 27, 32], _h = Tn && "CompositionEvent" in window, br = null;
Tn && "documentMode" in document && (br = document.documentMode);
var h1 = Tn && "TextEvent" in window && !br, $g = Tn && (!_h || br && 8 < br && 11 >= br), If = " ", Df = !1;
function Yg(e, t) {
  switch (e) {
    case "keyup":
      return c1.indexOf(t.keyCode) !== -1;
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
function Kg(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var rs = !1;
function d1(e, t) {
  switch (e) {
    case "compositionend":
      return Kg(t);
    case "keypress":
      return t.which !== 32 ? null : (Df = !0, If);
    case "textInput":
      return e = t.data, e === If && Df ? null : e;
    default:
      return null;
  }
}
function f1(e, t) {
  if (rs) return e === "compositionend" || !_h && Yg(e, t) ? (e = Ug(), da = ph = Wn = null, rs = !1, e) : null;
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
      return $g && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var p1 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Rf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!p1[e.type] : t === "textarea";
}
function Gg(e, t, n, i) {
  Mg(i), t = Aa(t, "onChange"), 0 < t.length && (n = new mh("onChange", "change", null, n, i), e.push({ event: n, listeners: t }));
}
var Sr = null, Fr = null;
function m1(e) {
  o_(e, 0);
}
function ul(e) {
  var t = ls(e);
  if (yg(t)) return e;
}
function g1(e, t) {
  if (e === "change") return t;
}
var Xg = !1;
if (Tn) {
  var fu;
  if (Tn) {
    var pu = "oninput" in document;
    if (!pu) {
      var jf = document.createElement("div");
      jf.setAttribute("oninput", "return;"), pu = typeof jf.oninput == "function";
    }
    fu = pu;
  } else fu = !1;
  Xg = fu && (!document.documentMode || 9 < document.documentMode);
}
function Bf() {
  Sr && (Sr.detachEvent("onpropertychange", qg), Fr = Sr = null);
}
function qg(e) {
  if (e.propertyName === "value" && ul(Fr)) {
    var t = [];
    Gg(t, Fr, e, uh(e)), Eg(m1, t);
  }
}
function _1(e, t, n) {
  e === "focusin" ? (Bf(), Sr = t, Fr = n, Sr.attachEvent("onpropertychange", qg)) : e === "focusout" && Bf();
}
function v1(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return ul(Fr);
}
function y1(e, t) {
  if (e === "click") return ul(t);
}
function x1(e, t) {
  if (e === "input" || e === "change") return ul(t);
}
function w1(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ge = typeof Object.is == "function" ? Object.is : w1;
function Hr(e, t) {
  if (Ge(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), i = Object.keys(t);
  if (n.length !== i.length) return !1;
  for (i = 0; i < n.length; i++) {
    var r = n[i];
    if (!Yu.call(t, r) || !Ge(e[r], t[r])) return !1;
  }
  return !0;
}
function Ff(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Hf(e, t) {
  var n = Ff(e);
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
    n = Ff(n);
  }
}
function Qg(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Qg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Jg() {
  for (var e = window, t = Ca(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ca(e.document);
  }
  return t;
}
function vh(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function k1(e) {
  var t = Jg(), n = e.focusedElem, i = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Qg(n.ownerDocument.documentElement, n)) {
    if (i !== null && vh(n)) {
      if (t = i.start, e = i.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var r = n.textContent.length, o = Math.min(i.start, r);
        i = i.end === void 0 ? o : Math.min(i.end, r), !e.extend && o > i && (r = i, i = o, o = r), r = Hf(n, o);
        var l = Hf(
          n,
          i
        );
        r && l && (e.rangeCount !== 1 || e.anchorNode !== r.node || e.anchorOffset !== r.offset || e.focusNode !== l.node || e.focusOffset !== l.offset) && (t = t.createRange(), t.setStart(r.node, r.offset), e.removeAllRanges(), o > i ? (e.addRange(t), e.extend(l.node, l.offset)) : (t.setEnd(l.node, l.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var b1 = Tn && "documentMode" in document && 11 >= document.documentMode, os = null, dc = null, Pr = null, fc = !1;
function Wf(e, t, n) {
  var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  fc || os == null || os !== Ca(i) || (i = os, "selectionStart" in i && vh(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = { anchorNode: i.anchorNode, anchorOffset: i.anchorOffset, focusNode: i.focusNode, focusOffset: i.focusOffset }), Pr && Hr(Pr, i) || (Pr = i, i = Aa(dc, "onSelect"), 0 < i.length && (t = new mh("onSelect", "select", null, t, n), e.push({ event: t, listeners: i }), t.target = os)));
}
function Bo(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var as = { animationend: Bo("Animation", "AnimationEnd"), animationiteration: Bo("Animation", "AnimationIteration"), animationstart: Bo("Animation", "AnimationStart"), transitionend: Bo("Transition", "TransitionEnd") }, mu = {}, t_ = {};
Tn && (t_ = document.createElement("div").style, "AnimationEvent" in window || (delete as.animationend.animation, delete as.animationiteration.animation, delete as.animationstart.animation), "TransitionEvent" in window || delete as.transitionend.transition);
function cl(e) {
  if (mu[e]) return mu[e];
  if (!as[e]) return e;
  var t = as[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in t_) return mu[e] = t[n];
  return e;
}
var e_ = cl("animationend"), n_ = cl("animationiteration"), i_ = cl("animationstart"), s_ = cl("transitionend"), r_ = /* @__PURE__ */ new Map(), Vf = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ai(e, t) {
  r_.set(e, t), Hi(t, [e]);
}
for (var gu = 0; gu < Vf.length; gu++) {
  var _u = Vf[gu], S1 = _u.toLowerCase(), P1 = _u[0].toUpperCase() + _u.slice(1);
  ai(S1, "on" + P1);
}
ai(e_, "onAnimationEnd");
ai(n_, "onAnimationIteration");
ai(i_, "onAnimationStart");
ai("dblclick", "onDoubleClick");
ai("focusin", "onFocus");
ai("focusout", "onBlur");
ai(s_, "onTransitionEnd");
bs("onMouseEnter", ["mouseout", "mouseover"]);
bs("onMouseLeave", ["mouseout", "mouseover"]);
bs("onPointerEnter", ["pointerout", "pointerover"]);
bs("onPointerLeave", ["pointerout", "pointerover"]);
Hi("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Hi("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Hi("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Hi("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Hi("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Hi("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var mr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), M1 = new Set("cancel close invalid load scroll toggle".split(" ").concat(mr));
function Zf(e, t, n) {
  var i = e.type || "unknown-event";
  e.currentTarget = n, Sx(i, t, void 0, e), e.currentTarget = null;
}
function o_(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var i = e[n], r = i.event;
    i = i.listeners;
    t: {
      var o = void 0;
      if (t) for (var l = i.length - 1; 0 <= l; l--) {
        var u = i[l], c = u.instance, d = u.currentTarget;
        if (u = u.listener, c !== o && r.isPropagationStopped()) break t;
        Zf(r, u, d), o = c;
      }
      else for (l = 0; l < i.length; l++) {
        if (u = i[l], c = u.instance, d = u.currentTarget, u = u.listener, c !== o && r.isPropagationStopped()) break t;
        Zf(r, u, d), o = c;
      }
    }
  }
  if (Ta) throw e = lc, Ta = !1, lc = null, e;
}
function Ct(e, t) {
  var n = t[vc];
  n === void 0 && (n = t[vc] = /* @__PURE__ */ new Set());
  var i = e + "__bubble";
  n.has(i) || (a_(t, e, 2, !1), n.add(i));
}
function vu(e, t, n) {
  var i = 0;
  t && (i |= 4), a_(n, e, i, t);
}
var Fo = "_reactListening" + Math.random().toString(36).slice(2);
function Wr(e) {
  if (!e[Fo]) {
    e[Fo] = !0, pg.forEach(function(n) {
      n !== "selectionchange" && (M1.has(n) || vu(n, !1, e), vu(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Fo] || (t[Fo] = !0, vu("selectionchange", !1, t));
  }
}
function a_(e, t, n, i) {
  switch (Zg(t)) {
    case 1:
      var r = Fx;
      break;
    case 4:
      r = Hx;
      break;
    default:
      r = fh;
  }
  n = r.bind(null, t, n, e), r = void 0, !ac || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (r = !0), i ? r !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: r }) : e.addEventListener(t, n, !0) : r !== void 0 ? e.addEventListener(t, n, { passive: r }) : e.addEventListener(t, n, !1);
}
function yu(e, t, n, i, r) {
  var o = i;
  if (!(t & 1) && !(t & 2) && i !== null) t: for (; ; ) {
    if (i === null) return;
    var l = i.tag;
    if (l === 3 || l === 4) {
      var u = i.stateNode.containerInfo;
      if (u === r || u.nodeType === 8 && u.parentNode === r) break;
      if (l === 4) for (l = i.return; l !== null; ) {
        var c = l.tag;
        if ((c === 3 || c === 4) && (c = l.stateNode.containerInfo, c === r || c.nodeType === 8 && c.parentNode === r)) return;
        l = l.return;
      }
      for (; u !== null; ) {
        if (l = Mi(u), l === null) return;
        if (c = l.tag, c === 5 || c === 6) {
          i = o = l;
          continue t;
        }
        u = u.parentNode;
      }
    }
    i = i.return;
  }
  Eg(function() {
    var d = o, p = uh(n), g = [];
    t: {
      var _ = r_.get(e);
      if (_ !== void 0) {
        var x = mh, S = e;
        switch (e) {
          case "keypress":
            if (fa(n) === 0) break t;
          case "keydown":
          case "keyup":
            x = n1;
            break;
          case "focusin":
            S = "focus", x = du;
            break;
          case "focusout":
            S = "blur", x = du;
            break;
          case "beforeblur":
          case "afterblur":
            x = du;
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
            x = Of;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            x = Zx;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            x = r1;
            break;
          case e_:
          case n_:
          case i_:
            x = Yx;
            break;
          case s_:
            x = a1;
            break;
          case "scroll":
            x = Wx;
            break;
          case "wheel":
            x = u1;
            break;
          case "copy":
          case "cut":
          case "paste":
            x = Gx;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            x = Af;
        }
        var k = (t & 4) !== 0, C = !k && e === "scroll", w = k ? _ !== null ? _ + "Capture" : null : _;
        k = [];
        for (var b = d, P; b !== null; ) {
          P = b;
          var T = P.stateNode;
          if (P.tag === 5 && T !== null && (P = T, w !== null && (T = Dr(b, w), T != null && k.push(Vr(b, T, P)))), C) break;
          b = b.return;
        }
        0 < k.length && (_ = new x(_, S, null, n, p), g.push({ event: _, listeners: k }));
      }
    }
    if (!(t & 7)) {
      t: {
        if (_ = e === "mouseover" || e === "pointerover", x = e === "mouseout" || e === "pointerout", _ && n !== rc && (S = n.relatedTarget || n.fromElement) && (Mi(S) || S[En])) break t;
        if ((x || _) && (_ = p.window === p ? p : (_ = p.ownerDocument) ? _.defaultView || _.parentWindow : window, x ? (S = n.relatedTarget || n.toElement, x = d, S = S ? Mi(S) : null, S !== null && (C = Wi(S), S !== C || S.tag !== 5 && S.tag !== 6) && (S = null)) : (x = null, S = d), x !== S)) {
          if (k = Of, T = "onMouseLeave", w = "onMouseEnter", b = "mouse", (e === "pointerout" || e === "pointerover") && (k = Af, T = "onPointerLeave", w = "onPointerEnter", b = "pointer"), C = x == null ? _ : ls(x), P = S == null ? _ : ls(S), _ = new k(T, b + "leave", x, n, p), _.target = C, _.relatedTarget = P, T = null, Mi(p) === d && (k = new k(w, b + "enter", S, n, p), k.target = P, k.relatedTarget = C, T = k), C = T, x && S) e: {
            for (k = x, w = S, b = 0, P = k; P; P = Ji(P)) b++;
            for (P = 0, T = w; T; T = Ji(T)) P++;
            for (; 0 < b - P; ) k = Ji(k), b--;
            for (; 0 < P - b; ) w = Ji(w), P--;
            for (; b--; ) {
              if (k === w || w !== null && k === w.alternate) break e;
              k = Ji(k), w = Ji(w);
            }
            k = null;
          }
          else k = null;
          x !== null && Uf(g, _, x, k, !1), S !== null && C !== null && Uf(g, C, S, k, !0);
        }
      }
      t: {
        if (_ = d ? ls(d) : window, x = _.nodeName && _.nodeName.toLowerCase(), x === "select" || x === "input" && _.type === "file") var E = g1;
        else if (Rf(_)) if (Xg) E = x1;
        else {
          E = v1;
          var N = _1;
        }
        else (x = _.nodeName) && x.toLowerCase() === "input" && (_.type === "checkbox" || _.type === "radio") && (E = y1);
        if (E && (E = E(e, d))) {
          Gg(g, E, n, p);
          break t;
        }
        N && N(e, _, d), e === "focusout" && (N = _._wrapperState) && N.controlled && _.type === "number" && tc(_, "number", _.value);
      }
      switch (N = d ? ls(d) : window, e) {
        case "focusin":
          (Rf(N) || N.contentEditable === "true") && (os = N, dc = d, Pr = null);
          break;
        case "focusout":
          Pr = dc = os = null;
          break;
        case "mousedown":
          fc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          fc = !1, Wf(g, n, p);
          break;
        case "selectionchange":
          if (b1) break;
        case "keydown":
        case "keyup":
          Wf(g, n, p);
      }
      var D;
      if (_h) t: {
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
      else rs ? Yg(e, n) && (A = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (A = "onCompositionStart");
      A && ($g && n.locale !== "ko" && (rs || A !== "onCompositionStart" ? A === "onCompositionEnd" && rs && (D = Ug()) : (Wn = p, ph = "value" in Wn ? Wn.value : Wn.textContent, rs = !0)), N = Aa(d, A), 0 < N.length && (A = new Nf(A, e, null, n, p), g.push({ event: A, listeners: N }), D ? A.data = D : (D = Kg(n), D !== null && (A.data = D)))), (D = h1 ? d1(e, n) : f1(e, n)) && (d = Aa(d, "onBeforeInput"), 0 < d.length && (p = new Nf("onBeforeInput", "beforeinput", null, n, p), g.push({ event: p, listeners: d }), p.data = D));
    }
    o_(g, t);
  });
}
function Vr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Aa(e, t) {
  for (var n = t + "Capture", i = []; e !== null; ) {
    var r = e, o = r.stateNode;
    r.tag === 5 && o !== null && (r = o, o = Dr(e, n), o != null && i.unshift(Vr(e, o, r)), o = Dr(e, t), o != null && i.push(Vr(e, o, r))), e = e.return;
  }
  return i;
}
function Ji(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Uf(e, t, n, i, r) {
  for (var o = t._reactName, l = []; n !== null && n !== i; ) {
    var u = n, c = u.alternate, d = u.stateNode;
    if (c !== null && c === i) break;
    u.tag === 5 && d !== null && (u = d, r ? (c = Dr(n, o), c != null && l.unshift(Vr(n, c, u))) : r || (c = Dr(n, o), c != null && l.push(Vr(n, c, u)))), n = n.return;
  }
  l.length !== 0 && e.push({ event: t, listeners: l });
}
var C1 = /\r\n?/g, L1 = /\u0000|\uFFFD/g;
function $f(e) {
  return (typeof e == "string" ? e : "" + e).replace(C1, `
`).replace(L1, "");
}
function Ho(e, t, n) {
  if (t = $f(t), $f(e) !== t && n) throw Error(F(425));
}
function Ia() {
}
var pc = null, mc = null;
function gc(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var _c = typeof setTimeout == "function" ? setTimeout : void 0, T1 = typeof clearTimeout == "function" ? clearTimeout : void 0, Yf = typeof Promise == "function" ? Promise : void 0, E1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yf < "u" ? function(e) {
  return Yf.resolve(null).then(e).catch(z1);
} : _c;
function z1(e) {
  setTimeout(function() {
    throw e;
  });
}
function xu(e, t) {
  var n = t, i = 0;
  do {
    var r = n.nextSibling;
    if (e.removeChild(n), r && r.nodeType === 8) if (n = r.data, n === "/$") {
      if (i === 0) {
        e.removeChild(r), Br(t);
        return;
      }
      i--;
    } else n !== "$" && n !== "$?" && n !== "$!" || i++;
    n = r;
  } while (n);
  Br(t);
}
function Qn(e) {
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
function Kf(e) {
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
var As = Math.random().toString(36).slice(2), an = "__reactFiber$" + As, Zr = "__reactProps$" + As, En = "__reactContainer$" + As, vc = "__reactEvents$" + As, O1 = "__reactListeners$" + As, N1 = "__reactHandles$" + As;
function Mi(e) {
  var t = e[an];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[En] || n[an]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Kf(e); e !== null; ) {
        if (n = e[an]) return n;
        e = Kf(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function ao(e) {
  return e = e[an] || e[En], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function ls(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(F(33));
}
function hl(e) {
  return e[Zr] || null;
}
var yc = [], us = -1;
function li(e) {
  return { current: e };
}
function Tt(e) {
  0 > us || (e.current = yc[us], yc[us] = null, us--);
}
function Mt(e, t) {
  us++, yc[us] = e.current, e.current = t;
}
var ri = {}, oe = li(ri), ye = li(!1), Ai = ri;
function Ss(e, t) {
  var n = e.type.contextTypes;
  if (!n) return ri;
  var i = e.stateNode;
  if (i && i.__reactInternalMemoizedUnmaskedChildContext === t) return i.__reactInternalMemoizedMaskedChildContext;
  var r = {}, o;
  for (o in n) r[o] = t[o];
  return i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = r), r;
}
function xe(e) {
  return e = e.childContextTypes, e != null;
}
function Da() {
  Tt(ye), Tt(oe);
}
function Gf(e, t, n) {
  if (oe.current !== ri) throw Error(F(168));
  Mt(oe, t), Mt(ye, n);
}
function l_(e, t, n) {
  var i = e.stateNode;
  if (t = t.childContextTypes, typeof i.getChildContext != "function") return n;
  i = i.getChildContext();
  for (var r in i) if (!(r in t)) throw Error(F(108, _x(e) || "Unknown", r));
  return Dt({}, n, i);
}
function Ra(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || ri, Ai = oe.current, Mt(oe, e), Mt(ye, ye.current), !0;
}
function Xf(e, t, n) {
  var i = e.stateNode;
  if (!i) throw Error(F(169));
  n ? (e = l_(e, t, Ai), i.__reactInternalMemoizedMergedChildContext = e, Tt(ye), Tt(oe), Mt(oe, e)) : Tt(ye), Mt(ye, n);
}
var kn = null, dl = !1, wu = !1;
function u_(e) {
  kn === null ? kn = [e] : kn.push(e);
}
function A1(e) {
  dl = !0, u_(e);
}
function ui() {
  if (!wu && kn !== null) {
    wu = !0;
    var e = 0, t = kt;
    try {
      var n = kn;
      for (kt = 1; e < n.length; e++) {
        var i = n[e];
        do
          i = i(!0);
        while (i !== null);
      }
      kn = null, dl = !1;
    } catch (r) {
      throw kn !== null && (kn = kn.slice(e + 1)), Ag(ch, ui), r;
    } finally {
      kt = t, wu = !1;
    }
  }
  return null;
}
var cs = [], hs = 0, ja = null, Ba = 0, Ae = [], Ie = 0, Ii = null, Sn = 1, Pn = "";
function ki(e, t) {
  cs[hs++] = Ba, cs[hs++] = ja, ja = e, Ba = t;
}
function c_(e, t, n) {
  Ae[Ie++] = Sn, Ae[Ie++] = Pn, Ae[Ie++] = Ii, Ii = e;
  var i = Sn;
  e = Pn;
  var r = 32 - Ye(i) - 1;
  i &= ~(1 << r), n += 1;
  var o = 32 - Ye(t) + r;
  if (30 < o) {
    var l = r - r % 5;
    o = (i & (1 << l) - 1).toString(32), i >>= l, r -= l, Sn = 1 << 32 - Ye(t) + r | n << r | i, Pn = o + e;
  } else Sn = 1 << o | n << r | i, Pn = e;
}
function yh(e) {
  e.return !== null && (ki(e, 1), c_(e, 1, 0));
}
function xh(e) {
  for (; e === ja; ) ja = cs[--hs], cs[hs] = null, Ba = cs[--hs], cs[hs] = null;
  for (; e === Ii; ) Ii = Ae[--Ie], Ae[Ie] = null, Pn = Ae[--Ie], Ae[Ie] = null, Sn = Ae[--Ie], Ae[Ie] = null;
}
var Me = null, Pe = null, Et = !1, $e = null;
function h_(e, t) {
  var n = De(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function qf(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Me = e, Pe = Qn(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Me = e, Pe = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Ii !== null ? { id: Sn, overflow: Pn } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = De(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Me = e, Pe = null, !0) : !1;
    default:
      return !1;
  }
}
function xc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function wc(e) {
  if (Et) {
    var t = Pe;
    if (t) {
      var n = t;
      if (!qf(e, t)) {
        if (xc(e)) throw Error(F(418));
        t = Qn(n.nextSibling);
        var i = Me;
        t && qf(e, t) ? h_(i, n) : (e.flags = e.flags & -4097 | 2, Et = !1, Me = e);
      }
    } else {
      if (xc(e)) throw Error(F(418));
      e.flags = e.flags & -4097 | 2, Et = !1, Me = e;
    }
  }
}
function Qf(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Me = e;
}
function Wo(e) {
  if (e !== Me) return !1;
  if (!Et) return Qf(e), Et = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !gc(e.type, e.memoizedProps)), t && (t = Pe)) {
    if (xc(e)) throw d_(), Error(F(418));
    for (; t; ) h_(e, t), t = Qn(t.nextSibling);
  }
  if (Qf(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(F(317));
    t: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Pe = Qn(e.nextSibling);
              break t;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Pe = null;
    }
  } else Pe = Me ? Qn(e.stateNode.nextSibling) : null;
  return !0;
}
function d_() {
  for (var e = Pe; e; ) e = Qn(e.nextSibling);
}
function Ps() {
  Pe = Me = null, Et = !1;
}
function wh(e) {
  $e === null ? $e = [e] : $e.push(e);
}
var I1 = Nn.ReactCurrentBatchConfig;
function sr(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(F(309));
        var i = n.stateNode;
      }
      if (!i) throw Error(F(147, e));
      var r = i, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(l) {
        var u = r.refs;
        l === null ? delete u[o] : u[o] = l;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(F(284));
    if (!n._owner) throw Error(F(290, e));
  }
  return e;
}
function Vo(e, t) {
  throw e = Object.prototype.toString.call(t), Error(F(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Jf(e) {
  var t = e._init;
  return t(e._payload);
}
function f_(e) {
  function t(w, b) {
    if (e) {
      var P = w.deletions;
      P === null ? (w.deletions = [b], w.flags |= 16) : P.push(b);
    }
  }
  function n(w, b) {
    if (!e) return null;
    for (; b !== null; ) t(w, b), b = b.sibling;
    return null;
  }
  function i(w, b) {
    for (w = /* @__PURE__ */ new Map(); b !== null; ) b.key !== null ? w.set(b.key, b) : w.set(b.index, b), b = b.sibling;
    return w;
  }
  function r(w, b) {
    return w = ni(w, b), w.index = 0, w.sibling = null, w;
  }
  function o(w, b, P) {
    return w.index = P, e ? (P = w.alternate, P !== null ? (P = P.index, P < b ? (w.flags |= 2, b) : P) : (w.flags |= 2, b)) : (w.flags |= 1048576, b);
  }
  function l(w) {
    return e && w.alternate === null && (w.flags |= 2), w;
  }
  function u(w, b, P, T) {
    return b === null || b.tag !== 6 ? (b = Lu(P, w.mode, T), b.return = w, b) : (b = r(b, P), b.return = w, b);
  }
  function c(w, b, P, T) {
    var E = P.type;
    return E === ss ? p(w, b, P.props.children, T, P.key) : b !== null && (b.elementType === E || typeof E == "object" && E !== null && E.$$typeof === jn && Jf(E) === b.type) ? (T = r(b, P.props), T.ref = sr(w, b, P), T.return = w, T) : (T = xa(P.type, P.key, P.props, null, w.mode, T), T.ref = sr(w, b, P), T.return = w, T);
  }
  function d(w, b, P, T) {
    return b === null || b.tag !== 4 || b.stateNode.containerInfo !== P.containerInfo || b.stateNode.implementation !== P.implementation ? (b = Tu(P, w.mode, T), b.return = w, b) : (b = r(b, P.children || []), b.return = w, b);
  }
  function p(w, b, P, T, E) {
    return b === null || b.tag !== 7 ? (b = zi(P, w.mode, T, E), b.return = w, b) : (b = r(b, P), b.return = w, b);
  }
  function g(w, b, P) {
    if (typeof b == "string" && b !== "" || typeof b == "number") return b = Lu("" + b, w.mode, P), b.return = w, b;
    if (typeof b == "object" && b !== null) {
      switch (b.$$typeof) {
        case Oo:
          return P = xa(b.type, b.key, b.props, null, w.mode, P), P.ref = sr(w, null, b), P.return = w, P;
        case is:
          return b = Tu(b, w.mode, P), b.return = w, b;
        case jn:
          var T = b._init;
          return g(w, T(b._payload), P);
      }
      if (fr(b) || Js(b)) return b = zi(b, w.mode, P, null), b.return = w, b;
      Vo(w, b);
    }
    return null;
  }
  function _(w, b, P, T) {
    var E = b !== null ? b.key : null;
    if (typeof P == "string" && P !== "" || typeof P == "number") return E !== null ? null : u(w, b, "" + P, T);
    if (typeof P == "object" && P !== null) {
      switch (P.$$typeof) {
        case Oo:
          return P.key === E ? c(w, b, P, T) : null;
        case is:
          return P.key === E ? d(w, b, P, T) : null;
        case jn:
          return E = P._init, _(
            w,
            b,
            E(P._payload),
            T
          );
      }
      if (fr(P) || Js(P)) return E !== null ? null : p(w, b, P, T, null);
      Vo(w, P);
    }
    return null;
  }
  function x(w, b, P, T, E) {
    if (typeof T == "string" && T !== "" || typeof T == "number") return w = w.get(P) || null, u(b, w, "" + T, E);
    if (typeof T == "object" && T !== null) {
      switch (T.$$typeof) {
        case Oo:
          return w = w.get(T.key === null ? P : T.key) || null, c(b, w, T, E);
        case is:
          return w = w.get(T.key === null ? P : T.key) || null, d(b, w, T, E);
        case jn:
          var N = T._init;
          return x(w, b, P, N(T._payload), E);
      }
      if (fr(T) || Js(T)) return w = w.get(P) || null, p(b, w, T, E, null);
      Vo(b, T);
    }
    return null;
  }
  function S(w, b, P, T) {
    for (var E = null, N = null, D = b, A = b = 0, H = null; D !== null && A < P.length; A++) {
      D.index > A ? (H = D, D = null) : H = D.sibling;
      var j = _(w, D, P[A], T);
      if (j === null) {
        D === null && (D = H);
        break;
      }
      e && D && j.alternate === null && t(w, D), b = o(j, b, A), N === null ? E = j : N.sibling = j, N = j, D = H;
    }
    if (A === P.length) return n(w, D), Et && ki(w, A), E;
    if (D === null) {
      for (; A < P.length; A++) D = g(w, P[A], T), D !== null && (b = o(D, b, A), N === null ? E = D : N.sibling = D, N = D);
      return Et && ki(w, A), E;
    }
    for (D = i(w, D); A < P.length; A++) H = x(D, w, A, P[A], T), H !== null && (e && H.alternate !== null && D.delete(H.key === null ? A : H.key), b = o(H, b, A), N === null ? E = H : N.sibling = H, N = H);
    return e && D.forEach(function(V) {
      return t(w, V);
    }), Et && ki(w, A), E;
  }
  function k(w, b, P, T) {
    var E = Js(P);
    if (typeof E != "function") throw Error(F(150));
    if (P = E.call(P), P == null) throw Error(F(151));
    for (var N = E = null, D = b, A = b = 0, H = null, j = P.next(); D !== null && !j.done; A++, j = P.next()) {
      D.index > A ? (H = D, D = null) : H = D.sibling;
      var V = _(w, D, j.value, T);
      if (V === null) {
        D === null && (D = H);
        break;
      }
      e && D && V.alternate === null && t(w, D), b = o(V, b, A), N === null ? E = V : N.sibling = V, N = V, D = H;
    }
    if (j.done) return n(
      w,
      D
    ), Et && ki(w, A), E;
    if (D === null) {
      for (; !j.done; A++, j = P.next()) j = g(w, j.value, T), j !== null && (b = o(j, b, A), N === null ? E = j : N.sibling = j, N = j);
      return Et && ki(w, A), E;
    }
    for (D = i(w, D); !j.done; A++, j = P.next()) j = x(D, w, A, j.value, T), j !== null && (e && j.alternate !== null && D.delete(j.key === null ? A : j.key), b = o(j, b, A), N === null ? E = j : N.sibling = j, N = j);
    return e && D.forEach(function(U) {
      return t(w, U);
    }), Et && ki(w, A), E;
  }
  function C(w, b, P, T) {
    if (typeof P == "object" && P !== null && P.type === ss && P.key === null && (P = P.props.children), typeof P == "object" && P !== null) {
      switch (P.$$typeof) {
        case Oo:
          t: {
            for (var E = P.key, N = b; N !== null; ) {
              if (N.key === E) {
                if (E = P.type, E === ss) {
                  if (N.tag === 7) {
                    n(w, N.sibling), b = r(N, P.props.children), b.return = w, w = b;
                    break t;
                  }
                } else if (N.elementType === E || typeof E == "object" && E !== null && E.$$typeof === jn && Jf(E) === N.type) {
                  n(w, N.sibling), b = r(N, P.props), b.ref = sr(w, N, P), b.return = w, w = b;
                  break t;
                }
                n(w, N);
                break;
              } else t(w, N);
              N = N.sibling;
            }
            P.type === ss ? (b = zi(P.props.children, w.mode, T, P.key), b.return = w, w = b) : (T = xa(P.type, P.key, P.props, null, w.mode, T), T.ref = sr(w, b, P), T.return = w, w = T);
          }
          return l(w);
        case is:
          t: {
            for (N = P.key; b !== null; ) {
              if (b.key === N) if (b.tag === 4 && b.stateNode.containerInfo === P.containerInfo && b.stateNode.implementation === P.implementation) {
                n(w, b.sibling), b = r(b, P.children || []), b.return = w, w = b;
                break t;
              } else {
                n(w, b);
                break;
              }
              else t(w, b);
              b = b.sibling;
            }
            b = Tu(P, w.mode, T), b.return = w, w = b;
          }
          return l(w);
        case jn:
          return N = P._init, C(w, b, N(P._payload), T);
      }
      if (fr(P)) return S(w, b, P, T);
      if (Js(P)) return k(w, b, P, T);
      Vo(w, P);
    }
    return typeof P == "string" && P !== "" || typeof P == "number" ? (P = "" + P, b !== null && b.tag === 6 ? (n(w, b.sibling), b = r(b, P), b.return = w, w = b) : (n(w, b), b = Lu(P, w.mode, T), b.return = w, w = b), l(w)) : n(w, b);
  }
  return C;
}
var Ms = f_(!0), p_ = f_(!1), Fa = li(null), Ha = null, ds = null, kh = null;
function bh() {
  kh = ds = Ha = null;
}
function Sh(e) {
  var t = Fa.current;
  Tt(Fa), e._currentValue = t;
}
function kc(e, t, n) {
  for (; e !== null; ) {
    var i = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function ys(e, t) {
  Ha = e, kh = ds = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (_e = !0), e.firstContext = null);
}
function je(e) {
  var t = e._currentValue;
  if (kh !== e) if (e = { context: e, memoizedValue: t, next: null }, ds === null) {
    if (Ha === null) throw Error(F(308));
    ds = e, Ha.dependencies = { lanes: 0, firstContext: e };
  } else ds = ds.next = e;
  return t;
}
var Ci = null;
function Ph(e) {
  Ci === null ? Ci = [e] : Ci.push(e);
}
function m_(e, t, n, i) {
  var r = t.interleaved;
  return r === null ? (n.next = n, Ph(t)) : (n.next = r.next, r.next = n), t.interleaved = n, zn(e, i);
}
function zn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Bn = !1;
function Mh(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function g_(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Ln(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Jn(e, t, n) {
  var i = e.updateQueue;
  if (i === null) return null;
  if (i = i.shared, gt & 2) {
    var r = i.pending;
    return r === null ? t.next = t : (t.next = r.next, r.next = t), i.pending = t, zn(e, n);
  }
  return r = i.interleaved, r === null ? (t.next = t, Ph(i)) : (t.next = r.next, r.next = t), i.interleaved = t, zn(e, n);
}
function pa(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, hh(e, n);
  }
}
function tp(e, t) {
  var n = e.updateQueue, i = e.alternate;
  if (i !== null && (i = i.updateQueue, n === i)) {
    var r = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var l = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? r = o = l : o = o.next = l, n = n.next;
      } while (n !== null);
      o === null ? r = o = t : o = o.next = t;
    } else r = o = t;
    n = { baseState: i.baseState, firstBaseUpdate: r, lastBaseUpdate: o, shared: i.shared, effects: i.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Wa(e, t, n, i) {
  var r = e.updateQueue;
  Bn = !1;
  var o = r.firstBaseUpdate, l = r.lastBaseUpdate, u = r.shared.pending;
  if (u !== null) {
    r.shared.pending = null;
    var c = u, d = c.next;
    c.next = null, l === null ? o = d : l.next = d, l = c;
    var p = e.alternate;
    p !== null && (p = p.updateQueue, u = p.lastBaseUpdate, u !== l && (u === null ? p.firstBaseUpdate = d : u.next = d, p.lastBaseUpdate = c));
  }
  if (o !== null) {
    var g = r.baseState;
    l = 0, p = d = c = null, u = o;
    do {
      var _ = u.lane, x = u.eventTime;
      if ((i & _) === _) {
        p !== null && (p = p.next = {
          eventTime: x,
          lane: 0,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null
        });
        t: {
          var S = e, k = u;
          switch (_ = t, x = n, k.tag) {
            case 1:
              if (S = k.payload, typeof S == "function") {
                g = S.call(x, g, _);
                break t;
              }
              g = S;
              break t;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = k.payload, _ = typeof S == "function" ? S.call(x, g, _) : S, _ == null) break t;
              g = Dt({}, g, _);
              break t;
            case 2:
              Bn = !0;
          }
        }
        u.callback !== null && u.lane !== 0 && (e.flags |= 64, _ = r.effects, _ === null ? r.effects = [u] : _.push(u));
      } else x = { eventTime: x, lane: _, tag: u.tag, payload: u.payload, callback: u.callback, next: null }, p === null ? (d = p = x, c = g) : p = p.next = x, l |= _;
      if (u = u.next, u === null) {
        if (u = r.shared.pending, u === null) break;
        _ = u, u = _.next, _.next = null, r.lastBaseUpdate = _, r.shared.pending = null;
      }
    } while (!0);
    if (p === null && (c = g), r.baseState = c, r.firstBaseUpdate = d, r.lastBaseUpdate = p, t = r.shared.interleaved, t !== null) {
      r = t;
      do
        l |= r.lane, r = r.next;
      while (r !== t);
    } else o === null && (r.shared.lanes = 0);
    Ri |= l, e.lanes = l, e.memoizedState = g;
  }
}
function ep(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var i = e[t], r = i.callback;
    if (r !== null) {
      if (i.callback = null, i = n, typeof r != "function") throw Error(F(191, r));
      r.call(i);
    }
  }
}
var lo = {}, un = li(lo), Ur = li(lo), $r = li(lo);
function Li(e) {
  if (e === lo) throw Error(F(174));
  return e;
}
function Ch(e, t) {
  switch (Mt($r, t), Mt(Ur, e), Mt(un, lo), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : nc(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = nc(t, e);
  }
  Tt(un), Mt(un, t);
}
function Cs() {
  Tt(un), Tt(Ur), Tt($r);
}
function __(e) {
  Li($r.current);
  var t = Li(un.current), n = nc(t, e.type);
  t !== n && (Mt(Ur, e), Mt(un, n));
}
function Lh(e) {
  Ur.current === e && (Tt(un), Tt(Ur));
}
var Nt = li(0);
function Va(e) {
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
var ku = [];
function Th() {
  for (var e = 0; e < ku.length; e++) ku[e]._workInProgressVersionPrimary = null;
  ku.length = 0;
}
var ma = Nn.ReactCurrentDispatcher, bu = Nn.ReactCurrentBatchConfig, Di = 0, It = null, Zt = null, Gt = null, Za = !1, Mr = !1, Yr = 0, D1 = 0;
function ne() {
  throw Error(F(321));
}
function Eh(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ge(e[n], t[n])) return !1;
  return !0;
}
function zh(e, t, n, i, r, o) {
  if (Di = o, It = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ma.current = e === null || e.memoizedState === null ? F1 : H1, e = n(i, r), Mr) {
    o = 0;
    do {
      if (Mr = !1, Yr = 0, 25 <= o) throw Error(F(301));
      o += 1, Gt = Zt = null, t.updateQueue = null, ma.current = W1, e = n(i, r);
    } while (Mr);
  }
  if (ma.current = Ua, t = Zt !== null && Zt.next !== null, Di = 0, Gt = Zt = It = null, Za = !1, t) throw Error(F(300));
  return e;
}
function Oh() {
  var e = Yr !== 0;
  return Yr = 0, e;
}
function rn() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return Gt === null ? It.memoizedState = Gt = e : Gt = Gt.next = e, Gt;
}
function Be() {
  if (Zt === null) {
    var e = It.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Zt.next;
  var t = Gt === null ? It.memoizedState : Gt.next;
  if (t !== null) Gt = t, Zt = e;
  else {
    if (e === null) throw Error(F(310));
    Zt = e, e = { memoizedState: Zt.memoizedState, baseState: Zt.baseState, baseQueue: Zt.baseQueue, queue: Zt.queue, next: null }, Gt === null ? It.memoizedState = Gt = e : Gt = Gt.next = e;
  }
  return Gt;
}
function Kr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Su(e) {
  var t = Be(), n = t.queue;
  if (n === null) throw Error(F(311));
  n.lastRenderedReducer = e;
  var i = Zt, r = i.baseQueue, o = n.pending;
  if (o !== null) {
    if (r !== null) {
      var l = r.next;
      r.next = o.next, o.next = l;
    }
    i.baseQueue = r = o, n.pending = null;
  }
  if (r !== null) {
    o = r.next, i = i.baseState;
    var u = l = null, c = null, d = o;
    do {
      var p = d.lane;
      if ((Di & p) === p) c !== null && (c = c.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), i = d.hasEagerState ? d.eagerState : e(i, d.action);
      else {
        var g = {
          lane: p,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        c === null ? (u = c = g, l = i) : c = c.next = g, It.lanes |= p, Ri |= p;
      }
      d = d.next;
    } while (d !== null && d !== o);
    c === null ? l = i : c.next = u, Ge(i, t.memoizedState) || (_e = !0), t.memoizedState = i, t.baseState = l, t.baseQueue = c, n.lastRenderedState = i;
  }
  if (e = n.interleaved, e !== null) {
    r = e;
    do
      o = r.lane, It.lanes |= o, Ri |= o, r = r.next;
    while (r !== e);
  } else r === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Pu(e) {
  var t = Be(), n = t.queue;
  if (n === null) throw Error(F(311));
  n.lastRenderedReducer = e;
  var i = n.dispatch, r = n.pending, o = t.memoizedState;
  if (r !== null) {
    n.pending = null;
    var l = r = r.next;
    do
      o = e(o, l.action), l = l.next;
    while (l !== r);
    Ge(o, t.memoizedState) || (_e = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, i];
}
function v_() {
}
function y_(e, t) {
  var n = It, i = Be(), r = t(), o = !Ge(i.memoizedState, r);
  if (o && (i.memoizedState = r, _e = !0), i = i.queue, Nh(k_.bind(null, n, i, e), [e]), i.getSnapshot !== t || o || Gt !== null && Gt.memoizedState.tag & 1) {
    if (n.flags |= 2048, Gr(9, w_.bind(null, n, i, r, t), void 0, null), Xt === null) throw Error(F(349));
    Di & 30 || x_(n, t, r);
  }
  return r;
}
function x_(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = It.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, It.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function w_(e, t, n, i) {
  t.value = n, t.getSnapshot = i, b_(t) && S_(e);
}
function k_(e, t, n) {
  return n(function() {
    b_(t) && S_(e);
  });
}
function b_(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ge(e, n);
  } catch {
    return !0;
  }
}
function S_(e) {
  var t = zn(e, 1);
  t !== null && Ke(t, e, 1, -1);
}
function np(e) {
  var t = rn();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Kr, lastRenderedState: e }, t.queue = e, e = e.dispatch = B1.bind(null, It, e), [t.memoizedState, e];
}
function Gr(e, t, n, i) {
  return e = { tag: e, create: t, destroy: n, deps: i, next: null }, t = It.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, It.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e)), e;
}
function P_() {
  return Be().memoizedState;
}
function ga(e, t, n, i) {
  var r = rn();
  It.flags |= e, r.memoizedState = Gr(1 | t, n, void 0, i === void 0 ? null : i);
}
function fl(e, t, n, i) {
  var r = Be();
  i = i === void 0 ? null : i;
  var o = void 0;
  if (Zt !== null) {
    var l = Zt.memoizedState;
    if (o = l.destroy, i !== null && Eh(i, l.deps)) {
      r.memoizedState = Gr(t, n, o, i);
      return;
    }
  }
  It.flags |= e, r.memoizedState = Gr(1 | t, n, o, i);
}
function ip(e, t) {
  return ga(8390656, 8, e, t);
}
function Nh(e, t) {
  return fl(2048, 8, e, t);
}
function M_(e, t) {
  return fl(4, 2, e, t);
}
function C_(e, t) {
  return fl(4, 4, e, t);
}
function L_(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function T_(e, t, n) {
  return n = n != null ? n.concat([e]) : null, fl(4, 4, L_.bind(null, t, e), n);
}
function Ah() {
}
function E_(e, t) {
  var n = Be();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && Eh(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
}
function z_(e, t) {
  var n = Be();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && Eh(t, i[1]) ? i[0] : (e = e(), n.memoizedState = [e, t], e);
}
function O_(e, t, n) {
  return Di & 21 ? (Ge(n, t) || (n = Rg(), It.lanes |= n, Ri |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, _e = !0), e.memoizedState = n);
}
function R1(e, t) {
  var n = kt;
  kt = n !== 0 && 4 > n ? n : 4, e(!0);
  var i = bu.transition;
  bu.transition = {};
  try {
    e(!1), t();
  } finally {
    kt = n, bu.transition = i;
  }
}
function N_() {
  return Be().memoizedState;
}
function j1(e, t, n) {
  var i = ei(e);
  if (n = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null }, A_(e)) I_(t, n);
  else if (n = m_(e, t, n, i), n !== null) {
    var r = ce();
    Ke(n, e, i, r), D_(n, t, i);
  }
}
function B1(e, t, n) {
  var i = ei(e), r = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (A_(e)) I_(t, r);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var l = t.lastRenderedState, u = o(l, n);
      if (r.hasEagerState = !0, r.eagerState = u, Ge(u, l)) {
        var c = t.interleaved;
        c === null ? (r.next = r, Ph(t)) : (r.next = c.next, c.next = r), t.interleaved = r;
        return;
      }
    } catch {
    } finally {
    }
    n = m_(e, t, r, i), n !== null && (r = ce(), Ke(n, e, i, r), D_(n, t, i));
  }
}
function A_(e) {
  var t = e.alternate;
  return e === It || t !== null && t === It;
}
function I_(e, t) {
  Mr = Za = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function D_(e, t, n) {
  if (n & 4194240) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, hh(e, n);
  }
}
var Ua = { readContext: je, useCallback: ne, useContext: ne, useEffect: ne, useImperativeHandle: ne, useInsertionEffect: ne, useLayoutEffect: ne, useMemo: ne, useReducer: ne, useRef: ne, useState: ne, useDebugValue: ne, useDeferredValue: ne, useTransition: ne, useMutableSource: ne, useSyncExternalStore: ne, useId: ne, unstable_isNewReconciler: !1 }, F1 = { readContext: je, useCallback: function(e, t) {
  return rn().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: je, useEffect: ip, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ga(
    4194308,
    4,
    L_.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return ga(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return ga(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = rn();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var i = rn();
  return t = n !== void 0 ? n(t) : t, i.memoizedState = i.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, i.queue = e, e = e.dispatch = j1.bind(null, It, e), [i.memoizedState, e];
}, useRef: function(e) {
  var t = rn();
  return e = { current: e }, t.memoizedState = e;
}, useState: np, useDebugValue: Ah, useDeferredValue: function(e) {
  return rn().memoizedState = e;
}, useTransition: function() {
  var e = np(!1), t = e[0];
  return e = R1.bind(null, e[1]), rn().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var i = It, r = rn();
  if (Et) {
    if (n === void 0) throw Error(F(407));
    n = n();
  } else {
    if (n = t(), Xt === null) throw Error(F(349));
    Di & 30 || x_(i, t, n);
  }
  r.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return r.queue = o, ip(k_.bind(
    null,
    i,
    o,
    e
  ), [e]), i.flags |= 2048, Gr(9, w_.bind(null, i, o, n, t), void 0, null), n;
}, useId: function() {
  var e = rn(), t = Xt.identifierPrefix;
  if (Et) {
    var n = Pn, i = Sn;
    n = (i & ~(1 << 32 - Ye(i) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Yr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = D1++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, H1 = {
  readContext: je,
  useCallback: E_,
  useContext: je,
  useEffect: Nh,
  useImperativeHandle: T_,
  useInsertionEffect: M_,
  useLayoutEffect: C_,
  useMemo: z_,
  useReducer: Su,
  useRef: P_,
  useState: function() {
    return Su(Kr);
  },
  useDebugValue: Ah,
  useDeferredValue: function(e) {
    var t = Be();
    return O_(t, Zt.memoizedState, e);
  },
  useTransition: function() {
    var e = Su(Kr)[0], t = Be().memoizedState;
    return [e, t];
  },
  useMutableSource: v_,
  useSyncExternalStore: y_,
  useId: N_,
  unstable_isNewReconciler: !1
}, W1 = { readContext: je, useCallback: E_, useContext: je, useEffect: Nh, useImperativeHandle: T_, useInsertionEffect: M_, useLayoutEffect: C_, useMemo: z_, useReducer: Pu, useRef: P_, useState: function() {
  return Pu(Kr);
}, useDebugValue: Ah, useDeferredValue: function(e) {
  var t = Be();
  return Zt === null ? t.memoizedState = e : O_(t, Zt.memoizedState, e);
}, useTransition: function() {
  var e = Pu(Kr)[0], t = Be().memoizedState;
  return [e, t];
}, useMutableSource: v_, useSyncExternalStore: y_, useId: N_, unstable_isNewReconciler: !1 };
function Ze(e, t) {
  if (e && e.defaultProps) {
    t = Dt({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function bc(e, t, n, i) {
  t = e.memoizedState, n = n(i, t), n = n == null ? t : Dt({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var pl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Wi(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var i = ce(), r = ei(e), o = Ln(i, r);
  o.payload = t, n != null && (o.callback = n), t = Jn(e, o, r), t !== null && (Ke(t, e, r, i), pa(t, e, r));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var i = ce(), r = ei(e), o = Ln(i, r);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Jn(e, o, r), t !== null && (Ke(t, e, r, i), pa(t, e, r));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ce(), i = ei(e), r = Ln(n, i);
  r.tag = 2, t != null && (r.callback = t), t = Jn(e, r, i), t !== null && (Ke(t, e, i, n), pa(t, e, i));
} };
function sp(e, t, n, i, r, o, l) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, o, l) : t.prototype && t.prototype.isPureReactComponent ? !Hr(n, i) || !Hr(r, o) : !0;
}
function R_(e, t, n) {
  var i = !1, r = ri, o = t.contextType;
  return typeof o == "object" && o !== null ? o = je(o) : (r = xe(t) ? Ai : oe.current, i = t.contextTypes, o = (i = i != null) ? Ss(e, r) : ri), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = pl, e.stateNode = t, t._reactInternals = e, i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = r, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function rp(e, t, n, i) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== e && pl.enqueueReplaceState(t, t.state, null);
}
function Sc(e, t, n, i) {
  var r = e.stateNode;
  r.props = n, r.state = e.memoizedState, r.refs = {}, Mh(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? r.context = je(o) : (o = xe(t) ? Ai : oe.current, r.context = Ss(e, o)), r.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (bc(e, t, o, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (t = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), t !== r.state && pl.enqueueReplaceState(r, r.state, null), Wa(e, n, r, i), r.state = e.memoizedState), typeof r.componentDidMount == "function" && (e.flags |= 4194308);
}
function Ls(e, t) {
  try {
    var n = "", i = t;
    do
      n += gx(i), i = i.return;
    while (i);
    var r = n;
  } catch (o) {
    r = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: r, digest: null };
}
function Mu(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Pc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var V1 = typeof WeakMap == "function" ? WeakMap : Map;
function j_(e, t, n) {
  n = Ln(-1, n), n.tag = 3, n.payload = { element: null };
  var i = t.value;
  return n.callback = function() {
    Ya || (Ya = !0, Ic = i), Pc(e, t);
  }, n;
}
function B_(e, t, n) {
  n = Ln(-1, n), n.tag = 3;
  var i = e.type.getDerivedStateFromError;
  if (typeof i == "function") {
    var r = t.value;
    n.payload = function() {
      return i(r);
    }, n.callback = function() {
      Pc(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Pc(e, t), typeof i != "function" && (ti === null ? ti = /* @__PURE__ */ new Set([this]) : ti.add(this));
    var l = t.stack;
    this.componentDidCatch(t.value, { componentStack: l !== null ? l : "" });
  }), n;
}
function op(e, t, n) {
  var i = e.pingCache;
  if (i === null) {
    i = e.pingCache = new V1();
    var r = /* @__PURE__ */ new Set();
    i.set(t, r);
  } else r = i.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), i.set(t, r));
  r.has(n) || (r.add(n), e = iw.bind(null, e, t, n), t.then(e, e));
}
function ap(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function lp(e, t, n, i, r) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = r, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ln(-1, 1), t.tag = 2, Jn(n, t, 1))), n.lanes |= 1), e);
}
var Z1 = Nn.ReactCurrentOwner, _e = !1;
function ue(e, t, n, i) {
  t.child = e === null ? p_(t, null, n, i) : Ms(t, e.child, n, i);
}
function up(e, t, n, i, r) {
  n = n.render;
  var o = t.ref;
  return ys(t, r), i = zh(e, t, n, i, o, r), n = Oh(), e !== null && !_e ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~r, On(e, t, r)) : (Et && n && yh(t), t.flags |= 1, ue(e, t, i, r), t.child);
}
function cp(e, t, n, i, r) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Wh(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, F_(e, t, o, i, r)) : (e = xa(n.type, null, i, t, t.mode, r), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & r)) {
    var l = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Hr, n(l, i) && e.ref === t.ref) return On(e, t, r);
  }
  return t.flags |= 1, e = ni(o, i), e.ref = t.ref, e.return = t, t.child = e;
}
function F_(e, t, n, i, r) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Hr(o, i) && e.ref === t.ref) if (_e = !1, t.pendingProps = i = o, (e.lanes & r) !== 0) e.flags & 131072 && (_e = !0);
    else return t.lanes = e.lanes, On(e, t, r);
  }
  return Mc(e, t, n, i, r);
}
function H_(e, t, n) {
  var i = t.pendingProps, r = i.children, o = e !== null ? e.memoizedState : null;
  if (i.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Mt(ps, be), be |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Mt(ps, be), be |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, i = o !== null ? o.baseLanes : n, Mt(ps, be), be |= i;
  }
  else o !== null ? (i = o.baseLanes | n, t.memoizedState = null) : i = n, Mt(ps, be), be |= i;
  return ue(e, t, r, n), t.child;
}
function W_(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Mc(e, t, n, i, r) {
  var o = xe(n) ? Ai : oe.current;
  return o = Ss(t, o), ys(t, r), n = zh(e, t, n, i, o, r), i = Oh(), e !== null && !_e ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~r, On(e, t, r)) : (Et && i && yh(t), t.flags |= 1, ue(e, t, n, r), t.child);
}
function hp(e, t, n, i, r) {
  if (xe(n)) {
    var o = !0;
    Ra(t);
  } else o = !1;
  if (ys(t, r), t.stateNode === null) _a(e, t), R_(t, n, i), Sc(t, n, i, r), i = !0;
  else if (e === null) {
    var l = t.stateNode, u = t.memoizedProps;
    l.props = u;
    var c = l.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = je(d) : (d = xe(n) ? Ai : oe.current, d = Ss(t, d));
    var p = n.getDerivedStateFromProps, g = typeof p == "function" || typeof l.getSnapshotBeforeUpdate == "function";
    g || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (u !== i || c !== d) && rp(t, l, i, d), Bn = !1;
    var _ = t.memoizedState;
    l.state = _, Wa(t, i, l, r), c = t.memoizedState, u !== i || _ !== c || ye.current || Bn ? (typeof p == "function" && (bc(t, n, p, i), c = t.memoizedState), (u = Bn || sp(t, n, u, i, _, c, d)) ? (g || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), typeof l.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = c), l.props = i, l.state = c, l.context = d, i = u) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
  } else {
    l = t.stateNode, g_(e, t), u = t.memoizedProps, d = t.type === t.elementType ? u : Ze(t.type, u), l.props = d, g = t.pendingProps, _ = l.context, c = n.contextType, typeof c == "object" && c !== null ? c = je(c) : (c = xe(n) ? Ai : oe.current, c = Ss(t, c));
    var x = n.getDerivedStateFromProps;
    (p = typeof x == "function" || typeof l.getSnapshotBeforeUpdate == "function") || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (u !== g || _ !== c) && rp(t, l, i, c), Bn = !1, _ = t.memoizedState, l.state = _, Wa(t, i, l, r);
    var S = t.memoizedState;
    u !== g || _ !== S || ye.current || Bn ? (typeof x == "function" && (bc(t, n, x, i), S = t.memoizedState), (d = Bn || sp(t, n, d, i, _, S, c) || !1) ? (p || typeof l.UNSAFE_componentWillUpdate != "function" && typeof l.componentWillUpdate != "function" || (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(i, S, c), typeof l.UNSAFE_componentWillUpdate == "function" && l.UNSAFE_componentWillUpdate(i, S, c)), typeof l.componentDidUpdate == "function" && (t.flags |= 4), typeof l.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof l.componentDidUpdate != "function" || u === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = S), l.props = i, l.state = S, l.context = c, i = d) : (typeof l.componentDidUpdate != "function" || u === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), i = !1);
  }
  return Cc(e, t, n, i, o, r);
}
function Cc(e, t, n, i, r, o) {
  W_(e, t);
  var l = (t.flags & 128) !== 0;
  if (!i && !l) return r && Xf(t, n, !1), On(e, t, o);
  i = t.stateNode, Z1.current = t;
  var u = l && typeof n.getDerivedStateFromError != "function" ? null : i.render();
  return t.flags |= 1, e !== null && l ? (t.child = Ms(t, e.child, null, o), t.child = Ms(t, null, u, o)) : ue(e, t, u, o), t.memoizedState = i.state, r && Xf(t, n, !0), t.child;
}
function V_(e) {
  var t = e.stateNode;
  t.pendingContext ? Gf(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Gf(e, t.context, !1), Ch(e, t.containerInfo);
}
function dp(e, t, n, i, r) {
  return Ps(), wh(r), t.flags |= 256, ue(e, t, n, i), t.child;
}
var Lc = { dehydrated: null, treeContext: null, retryLane: 0 };
function Tc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Z_(e, t, n) {
  var i = t.pendingProps, r = Nt.current, o = !1, l = (t.flags & 128) !== 0, u;
  if ((u = l) || (u = e !== null && e.memoizedState === null ? !1 : (r & 2) !== 0), u ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (r |= 1), Mt(Nt, r & 1), e === null)
    return wc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (l = i.children, e = i.fallback, o ? (i = t.mode, o = t.child, l = { mode: "hidden", children: l }, !(i & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = l) : o = _l(l, i, 0, null), e = zi(e, i, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Tc(n), t.memoizedState = Lc, e) : Ih(t, l));
  if (r = e.memoizedState, r !== null && (u = r.dehydrated, u !== null)) return U1(e, t, l, i, u, r, n);
  if (o) {
    o = i.fallback, l = t.mode, r = e.child, u = r.sibling;
    var c = { mode: "hidden", children: i.children };
    return !(l & 1) && t.child !== r ? (i = t.child, i.childLanes = 0, i.pendingProps = c, t.deletions = null) : (i = ni(r, c), i.subtreeFlags = r.subtreeFlags & 14680064), u !== null ? o = ni(u, o) : (o = zi(o, l, n, null), o.flags |= 2), o.return = t, i.return = t, i.sibling = o, t.child = i, i = o, o = t.child, l = e.child.memoizedState, l = l === null ? Tc(n) : { baseLanes: l.baseLanes | n, cachePool: null, transitions: l.transitions }, o.memoizedState = l, o.childLanes = e.childLanes & ~n, t.memoizedState = Lc, i;
  }
  return o = e.child, e = o.sibling, i = ni(o, { mode: "visible", children: i.children }), !(t.mode & 1) && (i.lanes = n), i.return = t, i.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = i, t.memoizedState = null, i;
}
function Ih(e, t) {
  return t = _l({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Zo(e, t, n, i) {
  return i !== null && wh(i), Ms(t, e.child, null, n), e = Ih(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function U1(e, t, n, i, r, o, l) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, i = Mu(Error(F(422))), Zo(e, t, l, i)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = i.fallback, r = t.mode, i = _l({ mode: "visible", children: i.children }, r, 0, null), o = zi(o, r, l, null), o.flags |= 2, i.return = t, o.return = t, i.sibling = o, t.child = i, t.mode & 1 && Ms(t, e.child, null, l), t.child.memoizedState = Tc(l), t.memoizedState = Lc, o);
  if (!(t.mode & 1)) return Zo(e, t, l, null);
  if (r.data === "$!") {
    if (i = r.nextSibling && r.nextSibling.dataset, i) var u = i.dgst;
    return i = u, o = Error(F(419)), i = Mu(o, i, void 0), Zo(e, t, l, i);
  }
  if (u = (l & e.childLanes) !== 0, _e || u) {
    if (i = Xt, i !== null) {
      switch (l & -l) {
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
      r = r & (i.suspendedLanes | l) ? 0 : r, r !== 0 && r !== o.retryLane && (o.retryLane = r, zn(e, r), Ke(i, e, r, -1));
    }
    return Hh(), i = Mu(Error(F(421))), Zo(e, t, l, i);
  }
  return r.data === "$?" ? (t.flags |= 128, t.child = e.child, t = sw.bind(null, e), r._reactRetry = t, null) : (e = o.treeContext, Pe = Qn(r.nextSibling), Me = t, Et = !0, $e = null, e !== null && (Ae[Ie++] = Sn, Ae[Ie++] = Pn, Ae[Ie++] = Ii, Sn = e.id, Pn = e.overflow, Ii = t), t = Ih(t, i.children), t.flags |= 4096, t);
}
function fp(e, t, n) {
  e.lanes |= t;
  var i = e.alternate;
  i !== null && (i.lanes |= t), kc(e.return, t, n);
}
function Cu(e, t, n, i, r) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: i, tail: n, tailMode: r } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = i, o.tail = n, o.tailMode = r);
}
function U_(e, t, n) {
  var i = t.pendingProps, r = i.revealOrder, o = i.tail;
  if (ue(e, t, i.children, n), i = Nt.current, i & 2) i = i & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) t: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && fp(e, n, t);
      else if (e.tag === 19) fp(e, n, t);
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
  if (Mt(Nt, i), !(t.mode & 1)) t.memoizedState = null;
  else switch (r) {
    case "forwards":
      for (n = t.child, r = null; n !== null; ) e = n.alternate, e !== null && Va(e) === null && (r = n), n = n.sibling;
      n = r, n === null ? (r = t.child, t.child = null) : (r = n.sibling, n.sibling = null), Cu(t, !1, r, n, o);
      break;
    case "backwards":
      for (n = null, r = t.child, t.child = null; r !== null; ) {
        if (e = r.alternate, e !== null && Va(e) === null) {
          t.child = r;
          break;
        }
        e = r.sibling, r.sibling = n, n = r, r = e;
      }
      Cu(t, !0, n, null, o);
      break;
    case "together":
      Cu(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function _a(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function On(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Ri |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(F(153));
  if (t.child !== null) {
    for (e = t.child, n = ni(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = ni(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function $1(e, t, n) {
  switch (t.tag) {
    case 3:
      V_(t), Ps();
      break;
    case 5:
      __(t);
      break;
    case 1:
      xe(t.type) && Ra(t);
      break;
    case 4:
      Ch(t, t.stateNode.containerInfo);
      break;
    case 10:
      var i = t.type._context, r = t.memoizedProps.value;
      Mt(Fa, i._currentValue), i._currentValue = r;
      break;
    case 13:
      if (i = t.memoizedState, i !== null)
        return i.dehydrated !== null ? (Mt(Nt, Nt.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Z_(e, t, n) : (Mt(Nt, Nt.current & 1), e = On(e, t, n), e !== null ? e.sibling : null);
      Mt(Nt, Nt.current & 1);
      break;
    case 19:
      if (i = (n & t.childLanes) !== 0, e.flags & 128) {
        if (i) return U_(e, t, n);
        t.flags |= 128;
      }
      if (r = t.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), Mt(Nt, Nt.current), i) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, H_(e, t, n);
  }
  return On(e, t, n);
}
var $_, Ec, Y_, K_;
$_ = function(e, t) {
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
Ec = function() {
};
Y_ = function(e, t, n, i) {
  var r = e.memoizedProps;
  if (r !== i) {
    e = t.stateNode, Li(un.current);
    var o = null;
    switch (n) {
      case "input":
        r = Qu(e, r), i = Qu(e, i), o = [];
        break;
      case "select":
        r = Dt({}, r, { value: void 0 }), i = Dt({}, i, { value: void 0 }), o = [];
        break;
      case "textarea":
        r = ec(e, r), i = ec(e, i), o = [];
        break;
      default:
        typeof r.onClick != "function" && typeof i.onClick == "function" && (e.onclick = Ia);
    }
    ic(n, i);
    var l;
    n = null;
    for (d in r) if (!i.hasOwnProperty(d) && r.hasOwnProperty(d) && r[d] != null) if (d === "style") {
      var u = r[d];
      for (l in u) u.hasOwnProperty(l) && (n || (n = {}), n[l] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Ar.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in i) {
      var c = i[d];
      if (u = r != null ? r[d] : void 0, i.hasOwnProperty(d) && c !== u && (c != null || u != null)) if (d === "style") if (u) {
        for (l in u) !u.hasOwnProperty(l) || c && c.hasOwnProperty(l) || (n || (n = {}), n[l] = "");
        for (l in c) c.hasOwnProperty(l) && u[l] !== c[l] && (n || (n = {}), n[l] = c[l]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = c;
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, u = u ? u.__html : void 0, c != null && u !== c && (o = o || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Ar.hasOwnProperty(d) ? (c != null && d === "onScroll" && Ct("scroll", e), o || u === c || (o = [])) : (o = o || []).push(d, c));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
K_ = function(e, t, n, i) {
  n !== i && (t.flags |= 4);
};
function rr(e, t) {
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
function ie(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, i = 0;
  if (t) for (var r = e.child; r !== null; ) n |= r.lanes | r.childLanes, i |= r.subtreeFlags & 14680064, i |= r.flags & 14680064, r.return = e, r = r.sibling;
  else for (r = e.child; r !== null; ) n |= r.lanes | r.childLanes, i |= r.subtreeFlags, i |= r.flags, r.return = e, r = r.sibling;
  return e.subtreeFlags |= i, e.childLanes = n, t;
}
function Y1(e, t, n) {
  var i = t.pendingProps;
  switch (xh(t), t.tag) {
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
      return ie(t), null;
    case 1:
      return xe(t.type) && Da(), ie(t), null;
    case 3:
      return i = t.stateNode, Cs(), Tt(ye), Tt(oe), Th(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Wo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, $e !== null && (jc($e), $e = null))), Ec(e, t), ie(t), null;
    case 5:
      Lh(t);
      var r = Li($r.current);
      if (n = t.type, e !== null && t.stateNode != null) Y_(e, t, n, i, r), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!i) {
          if (t.stateNode === null) throw Error(F(166));
          return ie(t), null;
        }
        if (e = Li(un.current), Wo(t)) {
          i = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (i[an] = t, i[Zr] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Ct("cancel", i), Ct("close", i);
              break;
            case "iframe":
            case "object":
            case "embed":
              Ct("load", i);
              break;
            case "video":
            case "audio":
              for (r = 0; r < mr.length; r++) Ct(mr[r], i);
              break;
            case "source":
              Ct("error", i);
              break;
            case "img":
            case "image":
            case "link":
              Ct(
                "error",
                i
              ), Ct("load", i);
              break;
            case "details":
              Ct("toggle", i);
              break;
            case "input":
              kf(i, o), Ct("invalid", i);
              break;
            case "select":
              i._wrapperState = { wasMultiple: !!o.multiple }, Ct("invalid", i);
              break;
            case "textarea":
              Sf(i, o), Ct("invalid", i);
          }
          ic(n, o), r = null;
          for (var l in o) if (o.hasOwnProperty(l)) {
            var u = o[l];
            l === "children" ? typeof u == "string" ? i.textContent !== u && (o.suppressHydrationWarning !== !0 && Ho(i.textContent, u, e), r = ["children", u]) : typeof u == "number" && i.textContent !== "" + u && (o.suppressHydrationWarning !== !0 && Ho(
              i.textContent,
              u,
              e
            ), r = ["children", "" + u]) : Ar.hasOwnProperty(l) && u != null && l === "onScroll" && Ct("scroll", i);
          }
          switch (n) {
            case "input":
              No(i), bf(i, o, !0);
              break;
            case "textarea":
              No(i), Pf(i);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (i.onclick = Ia);
          }
          i = r, t.updateQueue = i, i !== null && (t.flags |= 4);
        } else {
          l = r.nodeType === 9 ? r : r.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = kg(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = l.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = l.createElement(n, { is: i.is }) : (e = l.createElement(n), n === "select" && (l = e, i.multiple ? l.multiple = !0 : i.size && (l.size = i.size))) : e = l.createElementNS(e, n), e[an] = t, e[Zr] = i, $_(e, t, !1, !1), t.stateNode = e;
          t: {
            switch (l = sc(n, i), n) {
              case "dialog":
                Ct("cancel", e), Ct("close", e), r = i;
                break;
              case "iframe":
              case "object":
              case "embed":
                Ct("load", e), r = i;
                break;
              case "video":
              case "audio":
                for (r = 0; r < mr.length; r++) Ct(mr[r], e);
                r = i;
                break;
              case "source":
                Ct("error", e), r = i;
                break;
              case "img":
              case "image":
              case "link":
                Ct(
                  "error",
                  e
                ), Ct("load", e), r = i;
                break;
              case "details":
                Ct("toggle", e), r = i;
                break;
              case "input":
                kf(e, i), r = Qu(e, i), Ct("invalid", e);
                break;
              case "option":
                r = i;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!i.multiple }, r = Dt({}, i, { value: void 0 }), Ct("invalid", e);
                break;
              case "textarea":
                Sf(e, i), r = ec(e, i), Ct("invalid", e);
                break;
              default:
                r = i;
            }
            ic(n, r), u = r;
            for (o in u) if (u.hasOwnProperty(o)) {
              var c = u[o];
              o === "style" ? Pg(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && bg(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Ir(e, c) : typeof c == "number" && Ir(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Ar.hasOwnProperty(o) ? c != null && o === "onScroll" && Ct("scroll", e) : c != null && rh(e, o, c, l));
            }
            switch (n) {
              case "input":
                No(e), bf(e, i, !1);
                break;
              case "textarea":
                No(e), Pf(e);
                break;
              case "option":
                i.value != null && e.setAttribute("value", "" + si(i.value));
                break;
              case "select":
                e.multiple = !!i.multiple, o = i.value, o != null ? ms(e, !!i.multiple, o, !1) : i.defaultValue != null && ms(
                  e,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                );
                break;
              default:
                typeof r.onClick == "function" && (e.onclick = Ia);
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
      return ie(t), null;
    case 6:
      if (e && t.stateNode != null) K_(e, t, e.memoizedProps, i);
      else {
        if (typeof i != "string" && t.stateNode === null) throw Error(F(166));
        if (n = Li($r.current), Li(un.current), Wo(t)) {
          if (i = t.stateNode, n = t.memoizedProps, i[an] = t, (o = i.nodeValue !== n) && (e = Me, e !== null)) switch (e.tag) {
            case 3:
              Ho(i.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Ho(i.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[an] = t, t.stateNode = i;
      }
      return ie(t), null;
    case 13:
      if (Tt(Nt), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Et && Pe !== null && t.mode & 1 && !(t.flags & 128)) d_(), Ps(), t.flags |= 98560, o = !1;
        else if (o = Wo(t), i !== null && i.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(F(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(F(317));
            o[an] = t;
          } else Ps(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ie(t), o = !1;
        } else $e !== null && (jc($e), $e = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || Nt.current & 1 ? $t === 0 && ($t = 3) : Hh())), t.updateQueue !== null && (t.flags |= 4), ie(t), null);
    case 4:
      return Cs(), Ec(e, t), e === null && Wr(t.stateNode.containerInfo), ie(t), null;
    case 10:
      return Sh(t.type._context), ie(t), null;
    case 17:
      return xe(t.type) && Da(), ie(t), null;
    case 19:
      if (Tt(Nt), o = t.memoizedState, o === null) return ie(t), null;
      if (i = (t.flags & 128) !== 0, l = o.rendering, l === null) if (i) rr(o, !1);
      else {
        if ($t !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (l = Va(e), l !== null) {
            for (t.flags |= 128, rr(o, !1), i = l.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = n, n = t.child; n !== null; ) o = n, e = i, o.flags &= 14680066, l = o.alternate, l === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = l.childLanes, o.lanes = l.lanes, o.child = l.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = l.memoizedProps, o.memoizedState = l.memoizedState, o.updateQueue = l.updateQueue, o.type = l.type, e = l.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Mt(Nt, Nt.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && Bt() > Ts && (t.flags |= 128, i = !0, rr(o, !1), t.lanes = 4194304);
      }
      else {
        if (!i) if (e = Va(l), e !== null) {
          if (t.flags |= 128, i = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), rr(o, !0), o.tail === null && o.tailMode === "hidden" && !l.alternate && !Et) return ie(t), null;
        } else 2 * Bt() - o.renderingStartTime > Ts && n !== 1073741824 && (t.flags |= 128, i = !0, rr(o, !1), t.lanes = 4194304);
        o.isBackwards ? (l.sibling = t.child, t.child = l) : (n = o.last, n !== null ? n.sibling = l : t.child = l, o.last = l);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Bt(), t.sibling = null, n = Nt.current, Mt(Nt, i ? n & 1 | 2 : n & 1), t) : (ie(t), null);
    case 22:
    case 23:
      return Fh(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? be & 1073741824 && (ie(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ie(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(F(156, t.tag));
}
function K1(e, t) {
  switch (xh(t), t.tag) {
    case 1:
      return xe(t.type) && Da(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Cs(), Tt(ye), Tt(oe), Th(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Lh(t), null;
    case 13:
      if (Tt(Nt), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(F(340));
        Ps();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Tt(Nt), null;
    case 4:
      return Cs(), null;
    case 10:
      return Sh(t.type._context), null;
    case 22:
    case 23:
      return Fh(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Uo = !1, se = !1, G1 = typeof WeakSet == "function" ? WeakSet : Set, Z = null;
function fs(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (i) {
    Rt(e, t, i);
  }
  else n.current = null;
}
function zc(e, t, n) {
  try {
    n();
  } catch (i) {
    Rt(e, t, i);
  }
}
var pp = !1;
function X1(e, t) {
  if (pc = Oa, e = Jg(), vh(e)) {
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
        var l = 0, u = -1, c = -1, d = 0, p = 0, g = e, _ = null;
        e: for (; ; ) {
          for (var x; g !== n || r !== 0 && g.nodeType !== 3 || (u = l + r), g !== o || i !== 0 && g.nodeType !== 3 || (c = l + i), g.nodeType === 3 && (l += g.nodeValue.length), (x = g.firstChild) !== null; )
            _ = g, g = x;
          for (; ; ) {
            if (g === e) break e;
            if (_ === n && ++d === r && (u = l), _ === o && ++p === i && (c = l), (x = g.nextSibling) !== null) break;
            g = _, _ = g.parentNode;
          }
          g = x;
        }
        n = u === -1 || c === -1 ? null : { start: u, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (mc = { focusedElem: e, selectionRange: n }, Oa = !1, Z = t; Z !== null; ) if (t = Z, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Z = e;
  else for (; Z !== null; ) {
    t = Z;
    try {
      var S = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (S !== null) {
            var k = S.memoizedProps, C = S.memoizedState, w = t.stateNode, b = w.getSnapshotBeforeUpdate(t.elementType === t.type ? k : Ze(t.type, k), C);
            w.__reactInternalSnapshotBeforeUpdate = b;
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
          throw Error(F(163));
      }
    } catch (T) {
      Rt(t, t.return, T);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, Z = e;
      break;
    }
    Z = t.return;
  }
  return S = pp, pp = !1, S;
}
function Cr(e, t, n) {
  var i = t.updateQueue;
  if (i = i !== null ? i.lastEffect : null, i !== null) {
    var r = i = i.next;
    do {
      if ((r.tag & e) === e) {
        var o = r.destroy;
        r.destroy = void 0, o !== void 0 && zc(t, n, o);
      }
      r = r.next;
    } while (r !== i);
  }
}
function ml(e, t) {
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
function Oc(e) {
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
function G_(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, G_(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[an], delete t[Zr], delete t[vc], delete t[O1], delete t[N1])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function X_(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function mp(e) {
  t: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || X_(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue t;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Nc(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ia));
  else if (i !== 4 && (e = e.child, e !== null)) for (Nc(e, t, n), e = e.sibling; e !== null; ) Nc(e, t, n), e = e.sibling;
}
function Ac(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (i !== 4 && (e = e.child, e !== null)) for (Ac(e, t, n), e = e.sibling; e !== null; ) Ac(e, t, n), e = e.sibling;
}
var Jt = null, Ue = !1;
function Dn(e, t, n) {
  for (n = n.child; n !== null; ) q_(e, t, n), n = n.sibling;
}
function q_(e, t, n) {
  if (ln && typeof ln.onCommitFiberUnmount == "function") try {
    ln.onCommitFiberUnmount(al, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      se || fs(n, t);
    case 6:
      var i = Jt, r = Ue;
      Jt = null, Dn(e, t, n), Jt = i, Ue = r, Jt !== null && (Ue ? (e = Jt, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Jt.removeChild(n.stateNode));
      break;
    case 18:
      Jt !== null && (Ue ? (e = Jt, n = n.stateNode, e.nodeType === 8 ? xu(e.parentNode, n) : e.nodeType === 1 && xu(e, n), Br(e)) : xu(Jt, n.stateNode));
      break;
    case 4:
      i = Jt, r = Ue, Jt = n.stateNode.containerInfo, Ue = !0, Dn(e, t, n), Jt = i, Ue = r;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!se && (i = n.updateQueue, i !== null && (i = i.lastEffect, i !== null))) {
        r = i = i.next;
        do {
          var o = r, l = o.destroy;
          o = o.tag, l !== void 0 && (o & 2 || o & 4) && zc(n, t, l), r = r.next;
        } while (r !== i);
      }
      Dn(e, t, n);
      break;
    case 1:
      if (!se && (fs(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function")) try {
        i.props = n.memoizedProps, i.state = n.memoizedState, i.componentWillUnmount();
      } catch (u) {
        Rt(n, t, u);
      }
      Dn(e, t, n);
      break;
    case 21:
      Dn(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (se = (i = se) || n.memoizedState !== null, Dn(e, t, n), se = i) : Dn(e, t, n);
      break;
    default:
      Dn(e, t, n);
  }
}
function gp(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new G1()), t.forEach(function(i) {
      var r = rw.bind(null, e, i);
      n.has(i) || (n.add(i), i.then(r, r));
    });
  }
}
function Ve(e, t) {
  var n = t.deletions;
  if (n !== null) for (var i = 0; i < n.length; i++) {
    var r = n[i];
    try {
      var o = e, l = t, u = l;
      t: for (; u !== null; ) {
        switch (u.tag) {
          case 5:
            Jt = u.stateNode, Ue = !1;
            break t;
          case 3:
            Jt = u.stateNode.containerInfo, Ue = !0;
            break t;
          case 4:
            Jt = u.stateNode.containerInfo, Ue = !0;
            break t;
        }
        u = u.return;
      }
      if (Jt === null) throw Error(F(160));
      q_(o, l, r), Jt = null, Ue = !1;
      var c = r.alternate;
      c !== null && (c.return = null), r.return = null;
    } catch (d) {
      Rt(r, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Q_(t, e), t = t.sibling;
}
function Q_(e, t) {
  var n = e.alternate, i = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Ve(t, e), en(e), i & 4) {
        try {
          Cr(3, e, e.return), ml(3, e);
        } catch (k) {
          Rt(e, e.return, k);
        }
        try {
          Cr(5, e, e.return);
        } catch (k) {
          Rt(e, e.return, k);
        }
      }
      break;
    case 1:
      Ve(t, e), en(e), i & 512 && n !== null && fs(n, n.return);
      break;
    case 5:
      if (Ve(t, e), en(e), i & 512 && n !== null && fs(n, n.return), e.flags & 32) {
        var r = e.stateNode;
        try {
          Ir(r, "");
        } catch (k) {
          Rt(e, e.return, k);
        }
      }
      if (i & 4 && (r = e.stateNode, r != null)) {
        var o = e.memoizedProps, l = n !== null ? n.memoizedProps : o, u = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          u === "input" && o.type === "radio" && o.name != null && xg(r, o), sc(u, l);
          var d = sc(u, o);
          for (l = 0; l < c.length; l += 2) {
            var p = c[l], g = c[l + 1];
            p === "style" ? Pg(r, g) : p === "dangerouslySetInnerHTML" ? bg(r, g) : p === "children" ? Ir(r, g) : rh(r, p, g, d);
          }
          switch (u) {
            case "input":
              Ju(r, o);
              break;
            case "textarea":
              wg(r, o);
              break;
            case "select":
              var _ = r._wrapperState.wasMultiple;
              r._wrapperState.wasMultiple = !!o.multiple;
              var x = o.value;
              x != null ? ms(r, !!o.multiple, x, !1) : _ !== !!o.multiple && (o.defaultValue != null ? ms(
                r,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : ms(r, !!o.multiple, o.multiple ? [] : "", !1));
          }
          r[Zr] = o;
        } catch (k) {
          Rt(e, e.return, k);
        }
      }
      break;
    case 6:
      if (Ve(t, e), en(e), i & 4) {
        if (e.stateNode === null) throw Error(F(162));
        r = e.stateNode, o = e.memoizedProps;
        try {
          r.nodeValue = o;
        } catch (k) {
          Rt(e, e.return, k);
        }
      }
      break;
    case 3:
      if (Ve(t, e), en(e), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Br(t.containerInfo);
      } catch (k) {
        Rt(e, e.return, k);
      }
      break;
    case 4:
      Ve(t, e), en(e);
      break;
    case 13:
      Ve(t, e), en(e), r = e.child, r.flags & 8192 && (o = r.memoizedState !== null, r.stateNode.isHidden = o, !o || r.alternate !== null && r.alternate.memoizedState !== null || (jh = Bt())), i & 4 && gp(e);
      break;
    case 22:
      if (p = n !== null && n.memoizedState !== null, e.mode & 1 ? (se = (d = se) || p, Ve(t, e), se = d) : Ve(t, e), en(e), i & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !p && e.mode & 1) for (Z = e, p = e.child; p !== null; ) {
          for (g = Z = p; Z !== null; ) {
            switch (_ = Z, x = _.child, _.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Cr(4, _, _.return);
                break;
              case 1:
                fs(_, _.return);
                var S = _.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  i = _, n = _.return;
                  try {
                    t = i, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
                  } catch (k) {
                    Rt(i, n, k);
                  }
                }
                break;
              case 5:
                fs(_, _.return);
                break;
              case 22:
                if (_.memoizedState !== null) {
                  vp(g);
                  continue;
                }
            }
            x !== null ? (x.return = _, Z = x) : vp(g);
          }
          p = p.sibling;
        }
        t: for (p = null, g = e; ; ) {
          if (g.tag === 5) {
            if (p === null) {
              p = g;
              try {
                r = g.stateNode, d ? (o = r.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = g.stateNode, c = g.memoizedProps.style, l = c != null && c.hasOwnProperty("display") ? c.display : null, u.style.display = Sg("display", l));
              } catch (k) {
                Rt(e, e.return, k);
              }
            }
          } else if (g.tag === 6) {
            if (p === null) try {
              g.stateNode.nodeValue = d ? "" : g.memoizedProps;
            } catch (k) {
              Rt(e, e.return, k);
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
      Ve(t, e), en(e), i & 4 && gp(e);
      break;
    case 21:
      break;
    default:
      Ve(
        t,
        e
      ), en(e);
  }
}
function en(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      t: {
        for (var n = e.return; n !== null; ) {
          if (X_(n)) {
            var i = n;
            break t;
          }
          n = n.return;
        }
        throw Error(F(160));
      }
      switch (i.tag) {
        case 5:
          var r = i.stateNode;
          i.flags & 32 && (Ir(r, ""), i.flags &= -33);
          var o = mp(e);
          Ac(e, o, r);
          break;
        case 3:
        case 4:
          var l = i.stateNode.containerInfo, u = mp(e);
          Nc(e, u, l);
          break;
        default:
          throw Error(F(161));
      }
    } catch (c) {
      Rt(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function q1(e, t, n) {
  Z = e, J_(e);
}
function J_(e, t, n) {
  for (var i = (e.mode & 1) !== 0; Z !== null; ) {
    var r = Z, o = r.child;
    if (r.tag === 22 && i) {
      var l = r.memoizedState !== null || Uo;
      if (!l) {
        var u = r.alternate, c = u !== null && u.memoizedState !== null || se;
        u = Uo;
        var d = se;
        if (Uo = l, (se = c) && !d) for (Z = r; Z !== null; ) l = Z, c = l.child, l.tag === 22 && l.memoizedState !== null ? yp(r) : c !== null ? (c.return = l, Z = c) : yp(r);
        for (; o !== null; ) Z = o, J_(o), o = o.sibling;
        Z = r, Uo = u, se = d;
      }
      _p(e);
    } else r.subtreeFlags & 8772 && o !== null ? (o.return = r, Z = o) : _p(e);
  }
}
function _p(e) {
  for (; Z !== null; ) {
    var t = Z;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            se || ml(5, t);
            break;
          case 1:
            var i = t.stateNode;
            if (t.flags & 4 && !se) if (n === null) i.componentDidMount();
            else {
              var r = t.elementType === t.type ? n.memoizedProps : Ze(t.type, n.memoizedProps);
              i.componentDidUpdate(r, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && ep(t, o, i);
            break;
          case 3:
            var l = t.updateQueue;
            if (l !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              ep(t, l, n);
            }
            break;
          case 5:
            var u = t.stateNode;
            if (n === null && t.flags & 4) {
              n = u;
              var c = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  c.autoFocus && n.focus();
                  break;
                case "img":
                  c.src && (n.src = c.src);
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
                  g !== null && Br(g);
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
            throw Error(F(163));
        }
        se || t.flags & 512 && Oc(t);
      } catch (_) {
        Rt(t, t.return, _);
      }
    }
    if (t === e) {
      Z = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, Z = n;
      break;
    }
    Z = t.return;
  }
}
function vp(e) {
  for (; Z !== null; ) {
    var t = Z;
    if (t === e) {
      Z = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, Z = n;
      break;
    }
    Z = t.return;
  }
}
function yp(e) {
  for (; Z !== null; ) {
    var t = Z;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ml(4, t);
          } catch (c) {
            Rt(t, n, c);
          }
          break;
        case 1:
          var i = t.stateNode;
          if (typeof i.componentDidMount == "function") {
            var r = t.return;
            try {
              i.componentDidMount();
            } catch (c) {
              Rt(t, r, c);
            }
          }
          var o = t.return;
          try {
            Oc(t);
          } catch (c) {
            Rt(t, o, c);
          }
          break;
        case 5:
          var l = t.return;
          try {
            Oc(t);
          } catch (c) {
            Rt(t, l, c);
          }
      }
    } catch (c) {
      Rt(t, t.return, c);
    }
    if (t === e) {
      Z = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      u.return = t.return, Z = u;
      break;
    }
    Z = t.return;
  }
}
var Q1 = Math.ceil, $a = Nn.ReactCurrentDispatcher, Dh = Nn.ReactCurrentOwner, Re = Nn.ReactCurrentBatchConfig, gt = 0, Xt = null, Vt = null, te = 0, be = 0, ps = li(0), $t = 0, Xr = null, Ri = 0, gl = 0, Rh = 0, Lr = null, me = null, jh = 0, Ts = 1 / 0, wn = null, Ya = !1, Ic = null, ti = null, $o = !1, Vn = null, Ka = 0, Tr = 0, Dc = null, va = -1, ya = 0;
function ce() {
  return gt & 6 ? Bt() : va !== -1 ? va : va = Bt();
}
function ei(e) {
  return e.mode & 1 ? gt & 2 && te !== 0 ? te & -te : I1.transition !== null ? (ya === 0 && (ya = Rg()), ya) : (e = kt, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Zg(e.type)), e) : 1;
}
function Ke(e, t, n, i) {
  if (50 < Tr) throw Tr = 0, Dc = null, Error(F(185));
  ro(e, n, i), (!(gt & 2) || e !== Xt) && (e === Xt && (!(gt & 2) && (gl |= n), $t === 4 && Hn(e, te)), we(e, i), n === 1 && gt === 0 && !(t.mode & 1) && (Ts = Bt() + 500, dl && ui()));
}
function we(e, t) {
  var n = e.callbackNode;
  Ix(e, t);
  var i = za(e, e === Xt ? te : 0);
  if (i === 0) n !== null && Lf(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = i & -i, e.callbackPriority !== t) {
    if (n != null && Lf(n), t === 1) e.tag === 0 ? A1(xp.bind(null, e)) : u_(xp.bind(null, e)), E1(function() {
      !(gt & 6) && ui();
    }), n = null;
    else {
      switch (jg(i)) {
        case 1:
          n = ch;
          break;
        case 4:
          n = Ig;
          break;
        case 16:
          n = Ea;
          break;
        case 536870912:
          n = Dg;
          break;
        default:
          n = Ea;
      }
      n = av(n, tv.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function tv(e, t) {
  if (va = -1, ya = 0, gt & 6) throw Error(F(327));
  var n = e.callbackNode;
  if (xs() && e.callbackNode !== n) return null;
  var i = za(e, e === Xt ? te : 0);
  if (i === 0) return null;
  if (i & 30 || i & e.expiredLanes || t) t = Ga(e, i);
  else {
    t = i;
    var r = gt;
    gt |= 2;
    var o = nv();
    (Xt !== e || te !== t) && (wn = null, Ts = Bt() + 500, Ei(e, t));
    do
      try {
        ew();
        break;
      } catch (u) {
        ev(e, u);
      }
    while (!0);
    bh(), $a.current = o, gt = r, Vt !== null ? t = 0 : (Xt = null, te = 0, t = $t);
  }
  if (t !== 0) {
    if (t === 2 && (r = uc(e), r !== 0 && (i = r, t = Rc(e, r))), t === 1) throw n = Xr, Ei(e, 0), Hn(e, i), we(e, Bt()), n;
    if (t === 6) Hn(e, i);
    else {
      if (r = e.current.alternate, !(i & 30) && !J1(r) && (t = Ga(e, i), t === 2 && (o = uc(e), o !== 0 && (i = o, t = Rc(e, o))), t === 1)) throw n = Xr, Ei(e, 0), Hn(e, i), we(e, Bt()), n;
      switch (e.finishedWork = r, e.finishedLanes = i, t) {
        case 0:
        case 1:
          throw Error(F(345));
        case 2:
          bi(e, me, wn);
          break;
        case 3:
          if (Hn(e, i), (i & 130023424) === i && (t = jh + 500 - Bt(), 10 < t)) {
            if (za(e, 0) !== 0) break;
            if (r = e.suspendedLanes, (r & i) !== i) {
              ce(), e.pingedLanes |= e.suspendedLanes & r;
              break;
            }
            e.timeoutHandle = _c(bi.bind(null, e, me, wn), t);
            break;
          }
          bi(e, me, wn);
          break;
        case 4:
          if (Hn(e, i), (i & 4194240) === i) break;
          for (t = e.eventTimes, r = -1; 0 < i; ) {
            var l = 31 - Ye(i);
            o = 1 << l, l = t[l], l > r && (r = l), i &= ~o;
          }
          if (i = r, i = Bt() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * Q1(i / 1960)) - i, 10 < i) {
            e.timeoutHandle = _c(bi.bind(null, e, me, wn), i);
            break;
          }
          bi(e, me, wn);
          break;
        case 5:
          bi(e, me, wn);
          break;
        default:
          throw Error(F(329));
      }
    }
  }
  return we(e, Bt()), e.callbackNode === n ? tv.bind(null, e) : null;
}
function Rc(e, t) {
  var n = Lr;
  return e.current.memoizedState.isDehydrated && (Ei(e, t).flags |= 256), e = Ga(e, t), e !== 2 && (t = me, me = n, t !== null && jc(t)), e;
}
function jc(e) {
  me === null ? me = e : me.push.apply(me, e);
}
function J1(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var i = 0; i < n.length; i++) {
        var r = n[i], o = r.getSnapshot;
        r = r.value;
        try {
          if (!Ge(o(), r)) return !1;
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
function Hn(e, t) {
  for (t &= ~Rh, t &= ~gl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ye(t), i = 1 << n;
    e[n] = -1, t &= ~i;
  }
}
function xp(e) {
  if (gt & 6) throw Error(F(327));
  xs();
  var t = za(e, 0);
  if (!(t & 1)) return we(e, Bt()), null;
  var n = Ga(e, t);
  if (e.tag !== 0 && n === 2) {
    var i = uc(e);
    i !== 0 && (t = i, n = Rc(e, i));
  }
  if (n === 1) throw n = Xr, Ei(e, 0), Hn(e, t), we(e, Bt()), n;
  if (n === 6) throw Error(F(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, bi(e, me, wn), we(e, Bt()), null;
}
function Bh(e, t) {
  var n = gt;
  gt |= 1;
  try {
    return e(t);
  } finally {
    gt = n, gt === 0 && (Ts = Bt() + 500, dl && ui());
  }
}
function ji(e) {
  Vn !== null && Vn.tag === 0 && !(gt & 6) && xs();
  var t = gt;
  gt |= 1;
  var n = Re.transition, i = kt;
  try {
    if (Re.transition = null, kt = 1, e) return e();
  } finally {
    kt = i, Re.transition = n, gt = t, !(gt & 6) && ui();
  }
}
function Fh() {
  be = ps.current, Tt(ps);
}
function Ei(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, T1(n)), Vt !== null) for (n = Vt.return; n !== null; ) {
    var i = n;
    switch (xh(i), i.tag) {
      case 1:
        i = i.type.childContextTypes, i != null && Da();
        break;
      case 3:
        Cs(), Tt(ye), Tt(oe), Th();
        break;
      case 5:
        Lh(i);
        break;
      case 4:
        Cs();
        break;
      case 13:
        Tt(Nt);
        break;
      case 19:
        Tt(Nt);
        break;
      case 10:
        Sh(i.type._context);
        break;
      case 22:
      case 23:
        Fh();
    }
    n = n.return;
  }
  if (Xt = e, Vt = e = ni(e.current, null), te = be = t, $t = 0, Xr = null, Rh = gl = Ri = 0, me = Lr = null, Ci !== null) {
    for (t = 0; t < Ci.length; t++) if (n = Ci[t], i = n.interleaved, i !== null) {
      n.interleaved = null;
      var r = i.next, o = n.pending;
      if (o !== null) {
        var l = o.next;
        o.next = r, i.next = l;
      }
      n.pending = i;
    }
    Ci = null;
  }
  return e;
}
function ev(e, t) {
  do {
    var n = Vt;
    try {
      if (bh(), ma.current = Ua, Za) {
        for (var i = It.memoizedState; i !== null; ) {
          var r = i.queue;
          r !== null && (r.pending = null), i = i.next;
        }
        Za = !1;
      }
      if (Di = 0, Gt = Zt = It = null, Mr = !1, Yr = 0, Dh.current = null, n === null || n.return === null) {
        $t = 1, Xr = t, Vt = null;
        break;
      }
      t: {
        var o = e, l = n.return, u = n, c = t;
        if (t = te, u.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var d = c, p = u, g = p.tag;
          if (!(p.mode & 1) && (g === 0 || g === 11 || g === 15)) {
            var _ = p.alternate;
            _ ? (p.updateQueue = _.updateQueue, p.memoizedState = _.memoizedState, p.lanes = _.lanes) : (p.updateQueue = null, p.memoizedState = null);
          }
          var x = ap(l);
          if (x !== null) {
            x.flags &= -257, lp(x, l, u, o, t), x.mode & 1 && op(o, d, t), t = x, c = d;
            var S = t.updateQueue;
            if (S === null) {
              var k = /* @__PURE__ */ new Set();
              k.add(c), t.updateQueue = k;
            } else S.add(c);
            break t;
          } else {
            if (!(t & 1)) {
              op(o, d, t), Hh();
              break t;
            }
            c = Error(F(426));
          }
        } else if (Et && u.mode & 1) {
          var C = ap(l);
          if (C !== null) {
            !(C.flags & 65536) && (C.flags |= 256), lp(C, l, u, o, t), wh(Ls(c, u));
            break t;
          }
        }
        o = c = Ls(c, u), $t !== 4 && ($t = 2), Lr === null ? Lr = [o] : Lr.push(o), o = l;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var w = j_(o, c, t);
              tp(o, w);
              break t;
            case 1:
              u = c;
              var b = o.type, P = o.stateNode;
              if (!(o.flags & 128) && (typeof b.getDerivedStateFromError == "function" || P !== null && typeof P.componentDidCatch == "function" && (ti === null || !ti.has(P)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var T = B_(o, u, t);
                tp(o, T);
                break t;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      sv(n);
    } catch (E) {
      t = E, Vt === n && n !== null && (Vt = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function nv() {
  var e = $a.current;
  return $a.current = Ua, e === null ? Ua : e;
}
function Hh() {
  ($t === 0 || $t === 3 || $t === 2) && ($t = 4), Xt === null || !(Ri & 268435455) && !(gl & 268435455) || Hn(Xt, te);
}
function Ga(e, t) {
  var n = gt;
  gt |= 2;
  var i = nv();
  (Xt !== e || te !== t) && (wn = null, Ei(e, t));
  do
    try {
      tw();
      break;
    } catch (r) {
      ev(e, r);
    }
  while (!0);
  if (bh(), gt = n, $a.current = i, Vt !== null) throw Error(F(261));
  return Xt = null, te = 0, $t;
}
function tw() {
  for (; Vt !== null; ) iv(Vt);
}
function ew() {
  for (; Vt !== null && !Mx(); ) iv(Vt);
}
function iv(e) {
  var t = ov(e.alternate, e, be);
  e.memoizedProps = e.pendingProps, t === null ? sv(e) : Vt = t, Dh.current = null;
}
function sv(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = K1(n, t), n !== null) {
        n.flags &= 32767, Vt = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        $t = 6, Vt = null;
        return;
      }
    } else if (n = Y1(n, t, be), n !== null) {
      Vt = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      Vt = t;
      return;
    }
    Vt = t = e;
  } while (t !== null);
  $t === 0 && ($t = 5);
}
function bi(e, t, n) {
  var i = kt, r = Re.transition;
  try {
    Re.transition = null, kt = 1, nw(e, t, n, i);
  } finally {
    Re.transition = r, kt = i;
  }
  return null;
}
function nw(e, t, n, i) {
  do
    xs();
  while (Vn !== null);
  if (gt & 6) throw Error(F(327));
  n = e.finishedWork;
  var r = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(F(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Dx(e, o), e === Xt && (Vt = Xt = null, te = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || $o || ($o = !0, av(Ea, function() {
    return xs(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Re.transition, Re.transition = null;
    var l = kt;
    kt = 1;
    var u = gt;
    gt |= 4, Dh.current = null, X1(e, n), Q_(n, e), k1(mc), Oa = !!pc, mc = pc = null, e.current = n, q1(n), Cx(), gt = u, kt = l, Re.transition = o;
  } else e.current = n;
  if ($o && ($o = !1, Vn = e, Ka = r), o = e.pendingLanes, o === 0 && (ti = null), Ex(n.stateNode), we(e, Bt()), t !== null) for (i = e.onRecoverableError, n = 0; n < t.length; n++) r = t[n], i(r.value, { componentStack: r.stack, digest: r.digest });
  if (Ya) throw Ya = !1, e = Ic, Ic = null, e;
  return Ka & 1 && e.tag !== 0 && xs(), o = e.pendingLanes, o & 1 ? e === Dc ? Tr++ : (Tr = 0, Dc = e) : Tr = 0, ui(), null;
}
function xs() {
  if (Vn !== null) {
    var e = jg(Ka), t = Re.transition, n = kt;
    try {
      if (Re.transition = null, kt = 16 > e ? 16 : e, Vn === null) var i = !1;
      else {
        if (e = Vn, Vn = null, Ka = 0, gt & 6) throw Error(F(331));
        var r = gt;
        for (gt |= 4, Z = e.current; Z !== null; ) {
          var o = Z, l = o.child;
          if (Z.flags & 16) {
            var u = o.deletions;
            if (u !== null) {
              for (var c = 0; c < u.length; c++) {
                var d = u[c];
                for (Z = d; Z !== null; ) {
                  var p = Z;
                  switch (p.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Cr(8, p, o);
                  }
                  var g = p.child;
                  if (g !== null) g.return = p, Z = g;
                  else for (; Z !== null; ) {
                    p = Z;
                    var _ = p.sibling, x = p.return;
                    if (G_(p), p === d) {
                      Z = null;
                      break;
                    }
                    if (_ !== null) {
                      _.return = x, Z = _;
                      break;
                    }
                    Z = x;
                  }
                }
              }
              var S = o.alternate;
              if (S !== null) {
                var k = S.child;
                if (k !== null) {
                  S.child = null;
                  do {
                    var C = k.sibling;
                    k.sibling = null, k = C;
                  } while (k !== null);
                }
              }
              Z = o;
            }
          }
          if (o.subtreeFlags & 2064 && l !== null) l.return = o, Z = l;
          else t: for (; Z !== null; ) {
            if (o = Z, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Cr(9, o, o.return);
            }
            var w = o.sibling;
            if (w !== null) {
              w.return = o.return, Z = w;
              break t;
            }
            Z = o.return;
          }
        }
        var b = e.current;
        for (Z = b; Z !== null; ) {
          l = Z;
          var P = l.child;
          if (l.subtreeFlags & 2064 && P !== null) P.return = l, Z = P;
          else t: for (l = b; Z !== null; ) {
            if (u = Z, u.flags & 2048) try {
              switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  ml(9, u);
              }
            } catch (E) {
              Rt(u, u.return, E);
            }
            if (u === l) {
              Z = null;
              break t;
            }
            var T = u.sibling;
            if (T !== null) {
              T.return = u.return, Z = T;
              break t;
            }
            Z = u.return;
          }
        }
        if (gt = r, ui(), ln && typeof ln.onPostCommitFiberRoot == "function") try {
          ln.onPostCommitFiberRoot(al, e);
        } catch {
        }
        i = !0;
      }
      return i;
    } finally {
      kt = n, Re.transition = t;
    }
  }
  return !1;
}
function wp(e, t, n) {
  t = Ls(n, t), t = j_(e, t, 1), e = Jn(e, t, 1), t = ce(), e !== null && (ro(e, 1, t), we(e, t));
}
function Rt(e, t, n) {
  if (e.tag === 3) wp(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      wp(t, e, n);
      break;
    } else if (t.tag === 1) {
      var i = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (ti === null || !ti.has(i))) {
        e = Ls(n, e), e = B_(t, e, 1), t = Jn(t, e, 1), e = ce(), t !== null && (ro(t, 1, e), we(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function iw(e, t, n) {
  var i = e.pingCache;
  i !== null && i.delete(t), t = ce(), e.pingedLanes |= e.suspendedLanes & n, Xt === e && (te & n) === n && ($t === 4 || $t === 3 && (te & 130023424) === te && 500 > Bt() - jh ? Ei(e, 0) : Rh |= n), we(e, t);
}
function rv(e, t) {
  t === 0 && (e.mode & 1 ? (t = Do, Do <<= 1, !(Do & 130023424) && (Do = 4194304)) : t = 1);
  var n = ce();
  e = zn(e, t), e !== null && (ro(e, t, n), we(e, n));
}
function sw(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), rv(e, n);
}
function rw(e, t) {
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
      throw Error(F(314));
  }
  i !== null && i.delete(t), rv(e, n);
}
var ov;
ov = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ye.current) _e = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return _e = !1, $1(e, t, n);
    _e = !!(e.flags & 131072);
  }
  else _e = !1, Et && t.flags & 1048576 && c_(t, Ba, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var i = t.type;
      _a(e, t), e = t.pendingProps;
      var r = Ss(t, oe.current);
      ys(t, n), r = zh(null, t, i, e, r, n);
      var o = Oh();
      return t.flags |= 1, typeof r == "object" && r !== null && typeof r.render == "function" && r.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, xe(i) ? (o = !0, Ra(t)) : o = !1, t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, Mh(t), r.updater = pl, t.stateNode = r, r._reactInternals = t, Sc(t, i, e, n), t = Cc(null, t, i, !0, o, n)) : (t.tag = 0, Et && o && yh(t), ue(null, t, r, n), t = t.child), t;
    case 16:
      i = t.elementType;
      t: {
        switch (_a(e, t), e = t.pendingProps, r = i._init, i = r(i._payload), t.type = i, r = t.tag = aw(i), e = Ze(i, e), r) {
          case 0:
            t = Mc(null, t, i, e, n);
            break t;
          case 1:
            t = hp(null, t, i, e, n);
            break t;
          case 11:
            t = up(null, t, i, e, n);
            break t;
          case 14:
            t = cp(null, t, i, Ze(i.type, e), n);
            break t;
        }
        throw Error(F(
          306,
          i,
          ""
        ));
      }
      return t;
    case 0:
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Ze(i, r), Mc(e, t, i, r, n);
    case 1:
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Ze(i, r), hp(e, t, i, r, n);
    case 3:
      t: {
        if (V_(t), e === null) throw Error(F(387));
        i = t.pendingProps, o = t.memoizedState, r = o.element, g_(e, t), Wa(t, i, null, n);
        var l = t.memoizedState;
        if (i = l.element, o.isDehydrated) if (o = { element: i, isDehydrated: !1, cache: l.cache, pendingSuspenseBoundaries: l.pendingSuspenseBoundaries, transitions: l.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          r = Ls(Error(F(423)), t), t = dp(e, t, i, n, r);
          break t;
        } else if (i !== r) {
          r = Ls(Error(F(424)), t), t = dp(e, t, i, n, r);
          break t;
        } else for (Pe = Qn(t.stateNode.containerInfo.firstChild), Me = t, Et = !0, $e = null, n = p_(t, null, i, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Ps(), i === r) {
            t = On(e, t, n);
            break t;
          }
          ue(e, t, i, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return __(t), e === null && wc(t), i = t.type, r = t.pendingProps, o = e !== null ? e.memoizedProps : null, l = r.children, gc(i, r) ? l = null : o !== null && gc(i, o) && (t.flags |= 32), W_(e, t), ue(e, t, l, n), t.child;
    case 6:
      return e === null && wc(t), null;
    case 13:
      return Z_(e, t, n);
    case 4:
      return Ch(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = Ms(t, null, i, n) : ue(e, t, i, n), t.child;
    case 11:
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Ze(i, r), up(e, t, i, r, n);
    case 7:
      return ue(e, t, t.pendingProps, n), t.child;
    case 8:
      return ue(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ue(e, t, t.pendingProps.children, n), t.child;
    case 10:
      t: {
        if (i = t.type._context, r = t.pendingProps, o = t.memoizedProps, l = r.value, Mt(Fa, i._currentValue), i._currentValue = l, o !== null) if (Ge(o.value, l)) {
          if (o.children === r.children && !ye.current) {
            t = On(e, t, n);
            break t;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var u = o.dependencies;
          if (u !== null) {
            l = o.child;
            for (var c = u.firstContext; c !== null; ) {
              if (c.context === i) {
                if (o.tag === 1) {
                  c = Ln(-1, n & -n), c.tag = 2;
                  var d = o.updateQueue;
                  if (d !== null) {
                    d = d.shared;
                    var p = d.pending;
                    p === null ? c.next = c : (c.next = p.next, p.next = c), d.pending = c;
                  }
                }
                o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), kc(
                  o.return,
                  n,
                  t
                ), u.lanes |= n;
                break;
              }
              c = c.next;
            }
          } else if (o.tag === 10) l = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (l = o.return, l === null) throw Error(F(341));
            l.lanes |= n, u = l.alternate, u !== null && (u.lanes |= n), kc(l, n, t), l = o.sibling;
          } else l = o.child;
          if (l !== null) l.return = o;
          else for (l = o; l !== null; ) {
            if (l === t) {
              l = null;
              break;
            }
            if (o = l.sibling, o !== null) {
              o.return = l.return, l = o;
              break;
            }
            l = l.return;
          }
          o = l;
        }
        ue(e, t, r.children, n), t = t.child;
      }
      return t;
    case 9:
      return r = t.type, i = t.pendingProps.children, ys(t, n), r = je(r), i = i(r), t.flags |= 1, ue(e, t, i, n), t.child;
    case 14:
      return i = t.type, r = Ze(i, t.pendingProps), r = Ze(i.type, r), cp(e, t, i, r, n);
    case 15:
      return F_(e, t, t.type, t.pendingProps, n);
    case 17:
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Ze(i, r), _a(e, t), t.tag = 1, xe(i) ? (e = !0, Ra(t)) : e = !1, ys(t, n), R_(t, i, r), Sc(t, i, r, n), Cc(null, t, i, !0, e, n);
    case 19:
      return U_(e, t, n);
    case 22:
      return H_(e, t, n);
  }
  throw Error(F(156, t.tag));
};
function av(e, t) {
  return Ag(e, t);
}
function ow(e, t, n, i) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function De(e, t, n, i) {
  return new ow(e, t, n, i);
}
function Wh(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function aw(e) {
  if (typeof e == "function") return Wh(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ah) return 11;
    if (e === lh) return 14;
  }
  return 2;
}
function ni(e, t) {
  var n = e.alternate;
  return n === null ? (n = De(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function xa(e, t, n, i, r, o) {
  var l = 2;
  if (i = e, typeof e == "function") Wh(e) && (l = 1);
  else if (typeof e == "string") l = 5;
  else t: switch (e) {
    case ss:
      return zi(n.children, r, o, t);
    case oh:
      l = 8, r |= 8;
      break;
    case Ku:
      return e = De(12, n, t, r | 2), e.elementType = Ku, e.lanes = o, e;
    case Gu:
      return e = De(13, n, t, r), e.elementType = Gu, e.lanes = o, e;
    case Xu:
      return e = De(19, n, t, r), e.elementType = Xu, e.lanes = o, e;
    case _g:
      return _l(n, r, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case mg:
          l = 10;
          break t;
        case gg:
          l = 9;
          break t;
        case ah:
          l = 11;
          break t;
        case lh:
          l = 14;
          break t;
        case jn:
          l = 16, i = null;
          break t;
      }
      throw Error(F(130, e == null ? e : typeof e, ""));
  }
  return t = De(l, n, t, r), t.elementType = e, t.type = i, t.lanes = o, t;
}
function zi(e, t, n, i) {
  return e = De(7, e, i, t), e.lanes = n, e;
}
function _l(e, t, n, i) {
  return e = De(22, e, i, t), e.elementType = _g, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Lu(e, t, n) {
  return e = De(6, e, null, t), e.lanes = n, e;
}
function Tu(e, t, n) {
  return t = De(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function lw(e, t, n, i, r) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = uu(0), this.expirationTimes = uu(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = uu(0), this.identifierPrefix = i, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null;
}
function Vh(e, t, n, i, r, o, l, u, c) {
  return e = new lw(e, t, n, u, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = De(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: i, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Mh(o), e;
}
function uw(e, t, n) {
  var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: is, key: i == null ? null : "" + i, children: e, containerInfo: t, implementation: n };
}
function lv(e) {
  if (!e) return ri;
  e = e._reactInternals;
  t: {
    if (Wi(e) !== e || e.tag !== 1) throw Error(F(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break t;
        case 1:
          if (xe(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break t;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(F(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (xe(n)) return l_(e, n, t);
  }
  return t;
}
function uv(e, t, n, i, r, o, l, u, c) {
  return e = Vh(n, i, !0, e, r, o, l, u, c), e.context = lv(null), n = e.current, i = ce(), r = ei(n), o = Ln(i, r), o.callback = t ?? null, Jn(n, o, r), e.current.lanes = r, ro(e, r, i), we(e, i), e;
}
function vl(e, t, n, i) {
  var r = t.current, o = ce(), l = ei(r);
  return n = lv(n), t.context === null ? t.context = n : t.pendingContext = n, t = Ln(o, l), t.payload = { element: e }, i = i === void 0 ? null : i, i !== null && (t.callback = i), e = Jn(r, t, l), e !== null && (Ke(e, r, l, o), pa(e, r, l)), l;
}
function Xa(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function kp(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Zh(e, t) {
  kp(e, t), (e = e.alternate) && kp(e, t);
}
function cw() {
  return null;
}
var cv = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Uh(e) {
  this._internalRoot = e;
}
yl.prototype.render = Uh.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(F(409));
  vl(e, t, null, null);
};
yl.prototype.unmount = Uh.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    ji(function() {
      vl(null, e, null, null);
    }), t[En] = null;
  }
};
function yl(e) {
  this._internalRoot = e;
}
yl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Hg();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Fn.length && t !== 0 && t < Fn[n].priority; n++) ;
    Fn.splice(n, 0, e), n === 0 && Vg(e);
  }
};
function $h(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function xl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function bp() {
}
function hw(e, t, n, i, r) {
  if (r) {
    if (typeof i == "function") {
      var o = i;
      i = function() {
        var d = Xa(l);
        o.call(d);
      };
    }
    var l = uv(t, i, e, 0, null, !1, !1, "", bp);
    return e._reactRootContainer = l, e[En] = l.current, Wr(e.nodeType === 8 ? e.parentNode : e), ji(), l;
  }
  for (; r = e.lastChild; ) e.removeChild(r);
  if (typeof i == "function") {
    var u = i;
    i = function() {
      var d = Xa(c);
      u.call(d);
    };
  }
  var c = Vh(e, 0, !1, null, null, !1, !1, "", bp);
  return e._reactRootContainer = c, e[En] = c.current, Wr(e.nodeType === 8 ? e.parentNode : e), ji(function() {
    vl(t, c, n, i);
  }), c;
}
function wl(e, t, n, i, r) {
  var o = n._reactRootContainer;
  if (o) {
    var l = o;
    if (typeof r == "function") {
      var u = r;
      r = function() {
        var c = Xa(l);
        u.call(c);
      };
    }
    vl(t, l, e, r);
  } else l = hw(n, t, e, r, i);
  return Xa(l);
}
Bg = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = pr(t.pendingLanes);
        n !== 0 && (hh(t, n | 1), we(t, Bt()), !(gt & 6) && (Ts = Bt() + 500, ui()));
      }
      break;
    case 13:
      ji(function() {
        var i = zn(e, 1);
        if (i !== null) {
          var r = ce();
          Ke(i, e, 1, r);
        }
      }), Zh(e, 1);
  }
};
dh = function(e) {
  if (e.tag === 13) {
    var t = zn(e, 134217728);
    if (t !== null) {
      var n = ce();
      Ke(t, e, 134217728, n);
    }
    Zh(e, 134217728);
  }
};
Fg = function(e) {
  if (e.tag === 13) {
    var t = ei(e), n = zn(e, t);
    if (n !== null) {
      var i = ce();
      Ke(n, e, t, i);
    }
    Zh(e, t);
  }
};
Hg = function() {
  return kt;
};
Wg = function(e, t) {
  var n = kt;
  try {
    return kt = e, t();
  } finally {
    kt = n;
  }
};
oc = function(e, t, n) {
  switch (t) {
    case "input":
      if (Ju(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var i = n[t];
          if (i !== e && i.form === e.form) {
            var r = hl(i);
            if (!r) throw Error(F(90));
            yg(i), Ju(i, r);
          }
        }
      }
      break;
    case "textarea":
      wg(e, n);
      break;
    case "select":
      t = n.value, t != null && ms(e, !!n.multiple, t, !1);
  }
};
Lg = Bh;
Tg = ji;
var dw = { usingClientEntryPoint: !1, Events: [ao, ls, hl, Mg, Cg, Bh] }, or = { findFiberByHostInstance: Mi, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, fw = { bundleType: or.bundleType, version: or.version, rendererPackageName: or.rendererPackageName, rendererConfig: or.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Nn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Og(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: or.findFiberByHostInstance || cw, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Yo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Yo.isDisabled && Yo.supportsFiber) try {
    al = Yo.inject(fw), ln = Yo;
  } catch {
  }
}
Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = dw;
Le.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!$h(t)) throw Error(F(200));
  return uw(e, t, null, n);
};
Le.createRoot = function(e, t) {
  if (!$h(e)) throw Error(F(299));
  var n = !1, i = "", r = cv;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (r = t.onRecoverableError)), t = Vh(e, 1, !1, null, null, n, !1, i, r), e[En] = t.current, Wr(e.nodeType === 8 ? e.parentNode : e), new Uh(t);
};
Le.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(F(188)) : (e = Object.keys(e).join(","), Error(F(268, e)));
  return e = Og(t), e = e === null ? null : e.stateNode, e;
};
Le.flushSync = function(e) {
  return ji(e);
};
Le.hydrate = function(e, t, n) {
  if (!xl(t)) throw Error(F(200));
  return wl(null, e, t, !0, n);
};
Le.hydrateRoot = function(e, t, n) {
  if (!$h(e)) throw Error(F(405));
  var i = n != null && n.hydratedSources || null, r = !1, o = "", l = cv;
  if (n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), t = uv(t, null, e, 1, n ?? null, r, !1, o, l), e[En] = t.current, Wr(e), i) for (e = 0; e < i.length; e++) n = i[e], r = n._getVersion, r = r(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, r] : t.mutableSourceEagerHydrationData.push(
    n,
    r
  );
  return new yl(t);
};
Le.render = function(e, t, n) {
  if (!xl(t)) throw Error(F(200));
  return wl(null, e, t, !1, n);
};
Le.unmountComponentAtNode = function(e) {
  if (!xl(e)) throw Error(F(40));
  return e._reactRootContainer ? (ji(function() {
    wl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[En] = null;
    });
  }), !0) : !1;
};
Le.unstable_batchedUpdates = Bh;
Le.unstable_renderSubtreeIntoContainer = function(e, t, n, i) {
  if (!xl(n)) throw Error(F(200));
  if (e == null || e._reactInternals === void 0) throw Error(F(38));
  return wl(e, t, n, !1, i);
};
Le.version = "18.3.1-next-f1338f8080-20240426";
function hv() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(hv);
    } catch (e) {
      console.error(e);
    }
}
hv(), hg.exports = Le;
var pw = hg.exports, dv, Sp = pw;
dv = Sp.createRoot, Sp.hydrateRoot;
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function uo(e) {
  return e + 0.5 | 0;
}
const Zn = (e, t, n) => Math.max(Math.min(e, n), t);
function gr(e) {
  return Zn(uo(e * 2.55), 0, 255);
}
function ii(e) {
  return Zn(uo(e * 255), 0, 255);
}
function bn(e) {
  return Zn(uo(e / 2.55) / 100, 0, 1);
}
function Pp(e) {
  return Zn(uo(e * 100), 0, 100);
}
const Ne = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Bc = [..."0123456789ABCDEF"], mw = (e) => Bc[e & 15], gw = (e) => Bc[(e & 240) >> 4] + Bc[e & 15], Ko = (e) => (e & 240) >> 4 === (e & 15), _w = (e) => Ko(e.r) && Ko(e.g) && Ko(e.b) && Ko(e.a);
function vw(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & Ne[e[1]] * 17,
    g: 255 & Ne[e[2]] * 17,
    b: 255 & Ne[e[3]] * 17,
    a: t === 5 ? Ne[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: Ne[e[1]] << 4 | Ne[e[2]],
    g: Ne[e[3]] << 4 | Ne[e[4]],
    b: Ne[e[5]] << 4 | Ne[e[6]],
    a: t === 9 ? Ne[e[7]] << 4 | Ne[e[8]] : 255
  })), n;
}
const yw = (e, t) => e < 255 ? t(e) : "";
function xw(e) {
  var t = _w(e) ? mw : gw;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + yw(e.a, t) : void 0;
}
const ww = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function fv(e, t, n) {
  const i = t * Math.min(n, 1 - n), r = (o, l = (o + e / 30) % 12) => n - i * Math.max(Math.min(l - 3, 9 - l, 1), -1);
  return [r(0), r(8), r(4)];
}
function kw(e, t, n) {
  const i = (r, o = (r + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [i(5), i(3), i(1)];
}
function bw(e, t, n) {
  const i = fv(e, 1, 0.5);
  let r;
  for (t + n > 1 && (r = 1 / (t + n), t *= r, n *= r), r = 0; r < 3; r++)
    i[r] *= 1 - t - n, i[r] += t;
  return i;
}
function Sw(e, t, n, i, r) {
  return e === r ? (t - n) / i + (t < n ? 6 : 0) : t === r ? (n - e) / i + 2 : (e - t) / i + 4;
}
function Yh(e) {
  const n = e.r / 255, i = e.g / 255, r = e.b / 255, o = Math.max(n, i, r), l = Math.min(n, i, r), u = (o + l) / 2;
  let c, d, p;
  return o !== l && (p = o - l, d = u > 0.5 ? p / (2 - o - l) : p / (o + l), c = Sw(n, i, r, p, o), c = c * 60 + 0.5), [c | 0, d || 0, u];
}
function Kh(e, t, n, i) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, i)).map(ii);
}
function Gh(e, t, n) {
  return Kh(fv, e, t, n);
}
function Pw(e, t, n) {
  return Kh(bw, e, t, n);
}
function Mw(e, t, n) {
  return Kh(kw, e, t, n);
}
function pv(e) {
  return (e % 360 + 360) % 360;
}
function Cw(e) {
  const t = ww.exec(e);
  let n = 255, i;
  if (!t)
    return;
  t[5] !== i && (n = t[6] ? gr(+t[5]) : ii(+t[5]));
  const r = pv(+t[2]), o = +t[3] / 100, l = +t[4] / 100;
  return t[1] === "hwb" ? i = Pw(r, o, l) : t[1] === "hsv" ? i = Mw(r, o, l) : i = Gh(r, o, l), {
    r: i[0],
    g: i[1],
    b: i[2],
    a: n
  };
}
function Lw(e, t) {
  var n = Yh(e);
  n[0] = pv(n[0] + t), n = Gh(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Tw(e) {
  if (!e)
    return;
  const t = Yh(e), n = t[0], i = Pp(t[1]), r = Pp(t[2]);
  return e.a < 255 ? `hsla(${n}, ${i}%, ${r}%, ${bn(e.a)})` : `hsl(${n}, ${i}%, ${r}%)`;
}
const Mp = {
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
}, Cp = {
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
function Ew() {
  const e = {}, t = Object.keys(Cp), n = Object.keys(Mp);
  let i, r, o, l, u;
  for (i = 0; i < t.length; i++) {
    for (l = u = t[i], r = 0; r < n.length; r++)
      o = n[r], u = u.replace(o, Mp[o]);
    o = parseInt(Cp[l], 16), e[u] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let Go;
function zw(e) {
  Go || (Go = Ew(), Go.transparent = [0, 0, 0, 0]);
  const t = Go[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Ow = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Nw(e) {
  const t = Ow.exec(e);
  let n = 255, i, r, o;
  if (t) {
    if (t[7] !== i) {
      const l = +t[7];
      n = t[8] ? gr(l) : Zn(l * 255, 0, 255);
    }
    return i = +t[1], r = +t[3], o = +t[5], i = 255 & (t[2] ? gr(i) : Zn(i, 0, 255)), r = 255 & (t[4] ? gr(r) : Zn(r, 0, 255)), o = 255 & (t[6] ? gr(o) : Zn(o, 0, 255)), {
      r: i,
      g: r,
      b: o,
      a: n
    };
  }
}
function Aw(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${bn(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const Eu = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ts = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Iw(e, t, n) {
  const i = ts(bn(e.r)), r = ts(bn(e.g)), o = ts(bn(e.b));
  return {
    r: ii(Eu(i + n * (ts(bn(t.r)) - i))),
    g: ii(Eu(r + n * (ts(bn(t.g)) - r))),
    b: ii(Eu(o + n * (ts(bn(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function Xo(e, t, n) {
  if (e) {
    let i = Yh(e);
    i[t] = Math.max(0, Math.min(i[t] + i[t] * n, t === 0 ? 360 : 1)), i = Gh(i), e.r = i[0], e.g = i[1], e.b = i[2];
  }
}
function mv(e, t) {
  return e && Object.assign(t || {}, e);
}
function Lp(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = ii(e[3]))) : (t = mv(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = ii(t.a)), t;
}
function Dw(e) {
  return e.charAt(0) === "r" ? Nw(e) : Cw(e);
}
class qr {
  constructor(t) {
    if (t instanceof qr)
      return t;
    const n = typeof t;
    let i;
    n === "object" ? i = Lp(t) : n === "string" && (i = vw(t) || zw(t) || Dw(t)), this._rgb = i, this._valid = !!i;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = mv(this._rgb);
    return t && (t.a = bn(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Lp(t);
  }
  rgbString() {
    return this._valid ? Aw(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? xw(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Tw(this._rgb) : void 0;
  }
  mix(t, n) {
    if (t) {
      const i = this.rgb, r = t.rgb;
      let o;
      const l = n === o ? 0.5 : n, u = 2 * l - 1, c = i.a - r.a, d = ((u * c === -1 ? u : (u + c) / (1 + u * c)) + 1) / 2;
      o = 1 - d, i.r = 255 & d * i.r + o * r.r + 0.5, i.g = 255 & d * i.g + o * r.g + 0.5, i.b = 255 & d * i.b + o * r.b + 0.5, i.a = l * i.a + (1 - l) * r.a, this.rgb = i;
    }
    return this;
  }
  interpolate(t, n) {
    return t && (this._rgb = Iw(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new qr(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = ii(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = uo(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return Xo(this._rgb, 2, t), this;
  }
  darken(t) {
    return Xo(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return Xo(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return Xo(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Lw(this._rgb, t), this;
  }
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function vn() {
}
const Rw = /* @__PURE__ */ (() => {
  let e = 0;
  return () => e++;
})();
function xt(e) {
  return e == null;
}
function Ut(e) {
  if (Array.isArray && Array.isArray(e))
    return !0;
  const t = Object.prototype.toString.call(e);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function dt(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function ae(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function nn(e, t) {
  return ae(e) ? e : t;
}
function st(e, t) {
  return typeof e > "u" ? t : e;
}
const jw = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, gv = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Lt(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function wt(e, t, n, i) {
  let r, o, l;
  if (Ut(e))
    for (o = e.length, r = 0; r < o; r++)
      t.call(n, e[r], r);
  else if (dt(e))
    for (l = Object.keys(e), o = l.length, r = 0; r < o; r++)
      t.call(n, e[l[r]], l[r]);
}
function qa(e, t) {
  let n, i, r, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, i = e.length; n < i; ++n)
    if (r = e[n], o = t[n], r.datasetIndex !== o.datasetIndex || r.index !== o.index)
      return !1;
  return !0;
}
function Qa(e) {
  if (Ut(e))
    return e.map(Qa);
  if (dt(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), i = n.length;
    let r = 0;
    for (; r < i; ++r)
      t[n[r]] = Qa(e[n[r]]);
    return t;
  }
  return e;
}
function _v(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Bw(e, t, n, i) {
  if (!_v(e))
    return;
  const r = t[e], o = n[e];
  dt(r) && dt(o) ? Qr(r, o, i) : t[e] = Qa(o);
}
function Qr(e, t, n) {
  const i = Ut(t) ? t : [
    t
  ], r = i.length;
  if (!dt(e))
    return e;
  n = n || {};
  const o = n.merger || Bw;
  let l;
  for (let u = 0; u < r; ++u) {
    if (l = i[u], !dt(l))
      continue;
    const c = Object.keys(l);
    for (let d = 0, p = c.length; d < p; ++d)
      o(c[d], e, l, n);
  }
  return e;
}
function Er(e, t) {
  return Qr(e, t, {
    merger: Fw
  });
}
function Fw(e, t, n) {
  if (!_v(e))
    return;
  const i = t[e], r = n[e];
  dt(i) && dt(r) ? Er(i, r) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Qa(r));
}
const Tp = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Hw(e) {
  const t = e.split("."), n = [];
  let i = "";
  for (const r of t)
    i += r, i.endsWith("\\") ? i = i.slice(0, -1) + "." : (n.push(i), i = "");
  return n;
}
function Ww(e) {
  const t = Hw(e);
  return (n) => {
    for (const i of t) {
      if (i === "")
        break;
      n = n && n[i];
    }
    return n;
  };
}
function Bi(e, t) {
  return (Tp[t] || (Tp[t] = Ww(t)))(e);
}
function Xh(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const Jr = (e) => typeof e < "u", oi = (e) => typeof e == "function", Ep = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function Vw(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const St = Math.PI, At = 2 * St, Zw = At + St, Ja = Number.POSITIVE_INFINITY, Uw = St / 180, Yt = St / 2, vi = St / 4, zp = St * 2 / 3, vv = Math.log10, cn = Math.sign;
function zr(e, t, n) {
  return Math.abs(e - t) < n;
}
function Op(e) {
  const t = Math.round(e);
  e = zr(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(vv(e))), i = e / n;
  return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * n;
}
function $w(e) {
  const t = [], n = Math.sqrt(e);
  let i;
  for (i = 1; i < n; i++)
    e % i === 0 && (t.push(i), t.push(e / i));
  return n === (n | 0) && t.push(n), t.sort((r, o) => r - o).pop(), t;
}
function Yw(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function to(e) {
  return !Yw(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Kw(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function Gw(e, t, n) {
  let i, r, o;
  for (i = 0, r = e.length; i < r; i++)
    o = e[i][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function Mn(e) {
  return e * (St / 180);
}
function Xw(e) {
  return e * (180 / St);
}
function Np(e) {
  if (!ae(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function yv(e, t) {
  const n = t.x - e.x, i = t.y - e.y, r = Math.sqrt(n * n + i * i);
  let o = Math.atan2(i, n);
  return o < -0.5 * St && (o += At), {
    angle: o,
    distance: r
  };
}
function Fc(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function qw(e, t) {
  return (e - t + Zw) % At - St;
}
function Se(e) {
  return (e % At + At) % At;
}
function eo(e, t, n, i) {
  const r = Se(e), o = Se(t), l = Se(n), u = Se(o - r), c = Se(l - r), d = Se(r - o), p = Se(r - l);
  return r === o || r === l || i && o === l || u > c && d < p;
}
function re(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function Qw(e) {
  return re(e, -32768, 32767);
}
function Cn(e, t, n, i = 1e-6) {
  return e >= Math.min(t, n) - i && e <= Math.max(t, n) + i;
}
function qh(e, t, n) {
  n = n || ((l) => e[l] < t);
  let i = e.length - 1, r = 0, o;
  for (; i - r > 1; )
    o = r + i >> 1, n(o) ? r = o : i = o;
  return {
    lo: r,
    hi: i
  };
}
const Ti = (e, t, n, i) => qh(e, n, i ? (r) => {
  const o = e[r][t];
  return o < n || o === n && e[r + 1][t] === n;
} : (r) => e[r][t] < n), Jw = (e, t, n) => qh(e, n, (i) => e[i][t] >= n);
function tk(e, t, n) {
  let i = 0, r = e.length;
  for (; i < r && e[i] < t; )
    i++;
  for (; r > i && e[r - 1] > n; )
    r--;
  return i > 0 || r < e.length ? e.slice(i, r) : e;
}
const xv = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function ek(e, t) {
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
  }), xv.forEach((n) => {
    const i = "_onData" + Xh(n), r = e[n];
    Object.defineProperty(e, n, {
      configurable: !0,
      enumerable: !1,
      value(...o) {
        const l = r.apply(this, o);
        return e._chartjs.listeners.forEach((u) => {
          typeof u[i] == "function" && u[i](...o);
        }), l;
      }
    });
  });
}
function Ap(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const i = n.listeners, r = i.indexOf(t);
  r !== -1 && i.splice(r, 1), !(i.length > 0) && (xv.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function wv(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const kv = function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
}();
function bv(e, t) {
  let n = [], i = !1;
  return function(...r) {
    n = r, i || (i = !0, kv.call(window, () => {
      i = !1, e.apply(t, n);
    }));
  };
}
function nk(e, t) {
  let n;
  return function(...i) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, i)) : e.apply(this, i), t;
  };
}
const Sv = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", ke = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, ik = (e, t, n, i) => e === (i ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function sk(e, t, n) {
  const i = t.length;
  let r = 0, o = i;
  if (e._sorted) {
    const { iScale: l, vScale: u, _parsed: c } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, p = l.axis, { min: g, max: _, minDefined: x, maxDefined: S } = l.getUserBounds();
    if (x) {
      if (r = Math.min(
        // @ts-expect-error Need to type _parsed
        Ti(c, p, g).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? i : Ti(t, p, l.getPixelForValue(g)).lo
      ), d) {
        const k = c.slice(0, r + 1).reverse().findIndex((C) => !xt(C[u.axis]));
        r -= Math.max(0, k);
      }
      r = re(r, 0, i - 1);
    }
    if (S) {
      let k = Math.max(
        // @ts-expect-error Need to type _parsed
        Ti(c, l.axis, _, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Ti(t, p, l.getPixelForValue(_), !0).hi + 1
      );
      if (d) {
        const C = c.slice(k - 1).findIndex((w) => !xt(w[u.axis]));
        k += Math.max(0, C);
      }
      o = re(k, r, i) - r;
    } else
      o = i - r;
  }
  return {
    start: r,
    count: o
  };
}
function rk(e) {
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
const qo = (e) => e === 0 || e === 1, Ip = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * At / n)), Dp = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * At / n) + 1, Or = {
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
  easeInSine: (e) => -Math.cos(e * Yt) + 1,
  easeOutSine: (e) => Math.sin(e * Yt),
  easeInOutSine: (e) => -0.5 * (Math.cos(St * e) - 1),
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  easeOutExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  easeInOutExpo: (e) => qo(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => qo(e) ? e : Ip(e, 0.075, 0.3),
  easeOutElastic: (e) => qo(e) ? e : Dp(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return qo(e) ? e : e < 0.5 ? 0.5 * Ip(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * Dp(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Or.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Or.easeInBounce(e * 2) * 0.5 : Or.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Qh(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Rp(e) {
  return Qh(e) ? e : new qr(e);
}
function zu(e) {
  return Qh(e) ? e : new qr(e).saturate(0.5).darken(0.1).hexString();
}
const ok = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], ak = [
  "color",
  "borderColor",
  "backgroundColor"
];
function lk(e) {
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
      properties: ak
    },
    numbers: {
      type: "number",
      properties: ok
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
function uk(e) {
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
const jp = /* @__PURE__ */ new Map();
function ck(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let i = jp.get(n);
  return i || (i = new Intl.NumberFormat(e, t), jp.set(n, i)), i;
}
function Jh(e, t, n) {
  return ck(t, n).format(e);
}
const hk = {
  values(e) {
    return Ut(e) ? e : "" + e;
  },
  numeric(e, t, n) {
    if (e === 0)
      return "0";
    const i = this.chart.options.locale;
    let r, o = e;
    if (n.length > 1) {
      const d = Math.max(Math.abs(n[0].value), Math.abs(n[n.length - 1].value));
      (d < 1e-4 || d > 1e15) && (r = "scientific"), o = dk(e, n);
    }
    const l = vv(Math.abs(o)), u = isNaN(l) ? 1 : Math.max(Math.min(-1 * Math.floor(l), 20), 0), c = {
      notation: r,
      minimumFractionDigits: u,
      maximumFractionDigits: u
    };
    return Object.assign(c, this.options.ticks.format), Jh(e, i, c);
  }
};
function dk(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var Pv = {
  formatters: hk
};
function fk(e) {
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
      callback: Pv.formatters.values,
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
const Fi = /* @__PURE__ */ Object.create(null), Hc = /* @__PURE__ */ Object.create(null);
function Nr(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let i = 0, r = n.length; i < r; ++i) {
    const o = n[i];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Ou(e, t, n) {
  return typeof t == "string" ? Qr(Nr(e, t), n) : Qr(Nr(e, ""), t);
}
class pk {
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
    }, this.hover = {}, this.hoverBackgroundColor = (i, r) => zu(r.backgroundColor), this.hoverBorderColor = (i, r) => zu(r.borderColor), this.hoverColor = (i, r) => zu(r.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return Ou(this, t, n);
  }
  get(t) {
    return Nr(this, t);
  }
  describe(t, n) {
    return Ou(Hc, t, n);
  }
  override(t, n) {
    return Ou(Fi, t, n);
  }
  route(t, n, i, r) {
    const o = Nr(this, t), l = Nr(this, i), u = "_" + n;
    Object.defineProperties(o, {
      [u]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const c = this[u], d = l[r];
          return dt(c) ? Object.assign({}, d, c) : st(c, d);
        },
        set(c) {
          this[u] = c;
        }
      }
    });
  }
  apply(t) {
    t.forEach((n) => n(this));
  }
}
var Ft = /* @__PURE__ */ new pk({
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
  lk,
  uk,
  fk
]);
function mk(e) {
  return !e || xt(e.size) || xt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Bp(e, t, n, i, r) {
  let o = t[r];
  return o || (o = t[r] = e.measureText(r).width, n.push(r)), o > i && (i = o), i;
}
function yi(e, t, n) {
  const i = e.currentDevicePixelRatio, r = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - r) * i) / i + r;
}
function Fp(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Wc(e, t, n, i) {
  Mv(e, t, n, i, null);
}
function Mv(e, t, n, i, r) {
  let o, l, u, c, d, p, g, _;
  const x = t.pointStyle, S = t.rotation, k = t.radius;
  let C = (S || 0) * Uw;
  if (x && typeof x == "object" && (o = x.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, i), e.rotate(C), e.drawImage(x, -x.width / 2, -x.height / 2, x.width, x.height), e.restore();
    return;
  }
  if (!(isNaN(k) || k <= 0)) {
    switch (e.beginPath(), x) {
      default:
        r ? e.ellipse(n, i, r / 2, k, 0, 0, At) : e.arc(n, i, k, 0, At), e.closePath();
        break;
      case "triangle":
        p = r ? r / 2 : k, e.moveTo(n + Math.sin(C) * p, i - Math.cos(C) * k), C += zp, e.lineTo(n + Math.sin(C) * p, i - Math.cos(C) * k), C += zp, e.lineTo(n + Math.sin(C) * p, i - Math.cos(C) * k), e.closePath();
        break;
      case "rectRounded":
        d = k * 0.516, c = k - d, l = Math.cos(C + vi) * c, g = Math.cos(C + vi) * (r ? r / 2 - d : c), u = Math.sin(C + vi) * c, _ = Math.sin(C + vi) * (r ? r / 2 - d : c), e.arc(n - g, i - u, d, C - St, C - Yt), e.arc(n + _, i - l, d, C - Yt, C), e.arc(n + g, i + u, d, C, C + Yt), e.arc(n - _, i + l, d, C + Yt, C + St), e.closePath();
        break;
      case "rect":
        if (!S) {
          c = Math.SQRT1_2 * k, p = r ? r / 2 : c, e.rect(n - p, i - c, 2 * p, 2 * c);
          break;
        }
        C += vi;
      case "rectRot":
        g = Math.cos(C) * (r ? r / 2 : k), l = Math.cos(C) * k, u = Math.sin(C) * k, _ = Math.sin(C) * (r ? r / 2 : k), e.moveTo(n - g, i - u), e.lineTo(n + _, i - l), e.lineTo(n + g, i + u), e.lineTo(n - _, i + l), e.closePath();
        break;
      case "crossRot":
        C += vi;
      case "cross":
        g = Math.cos(C) * (r ? r / 2 : k), l = Math.cos(C) * k, u = Math.sin(C) * k, _ = Math.sin(C) * (r ? r / 2 : k), e.moveTo(n - g, i - u), e.lineTo(n + g, i + u), e.moveTo(n + _, i - l), e.lineTo(n - _, i + l);
        break;
      case "star":
        g = Math.cos(C) * (r ? r / 2 : k), l = Math.cos(C) * k, u = Math.sin(C) * k, _ = Math.sin(C) * (r ? r / 2 : k), e.moveTo(n - g, i - u), e.lineTo(n + g, i + u), e.moveTo(n + _, i - l), e.lineTo(n - _, i + l), C += vi, g = Math.cos(C) * (r ? r / 2 : k), l = Math.cos(C) * k, u = Math.sin(C) * k, _ = Math.sin(C) * (r ? r / 2 : k), e.moveTo(n - g, i - u), e.lineTo(n + g, i + u), e.moveTo(n + _, i - l), e.lineTo(n - _, i + l);
        break;
      case "line":
        l = r ? r / 2 : Math.cos(C) * k, u = Math.sin(C) * k, e.moveTo(n - l, i - u), e.lineTo(n + l, i + u);
        break;
      case "dash":
        e.moveTo(n, i), e.lineTo(n + Math.cos(C) * (r ? r / 2 : k), i + Math.sin(C) * k);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function no(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function kl(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function bl(e) {
  e.restore();
}
function gk(e, t, n, i, r) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (r === "middle") {
    const o = (t.x + n.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, n.y);
  } else r === "after" != !!i ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function _k(e, t, n, i) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(i ? t.cp1x : t.cp2x, i ? t.cp1y : t.cp2y, i ? n.cp2x : n.cp1x, i ? n.cp2y : n.cp1y, n.x, n.y);
}
function vk(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), xt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function yk(e, t, n, i, r) {
  if (r.strikethrough || r.underline) {
    const o = e.measureText(i), l = t - o.actualBoundingBoxLeft, u = t + o.actualBoundingBoxRight, c = n - o.actualBoundingBoxAscent, d = n + o.actualBoundingBoxDescent, p = r.strikethrough ? (c + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = r.decorationWidth || 2, e.moveTo(l, p), e.lineTo(u, p), e.stroke();
  }
}
function xk(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function tl(e, t, n, i, r, o = {}) {
  const l = Ut(t) ? t : [
    t
  ], u = o.strokeWidth > 0 && o.strokeColor !== "";
  let c, d;
  for (e.save(), e.font = r.string, vk(e, o), c = 0; c < l.length; ++c)
    d = l[c], o.backdrop && xk(e, o.backdrop), u && (o.strokeColor && (e.strokeStyle = o.strokeColor), xt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, n, i, o.maxWidth)), e.fillText(d, n, i, o.maxWidth), yk(e, n, i, d, o), i += Number(r.lineHeight);
  e.restore();
}
function el(e, t) {
  const { x: n, y: i, w: r, h: o, radius: l } = t;
  e.arc(n + l.topLeft, i + l.topLeft, l.topLeft, 1.5 * St, St, !0), e.lineTo(n, i + o - l.bottomLeft), e.arc(n + l.bottomLeft, i + o - l.bottomLeft, l.bottomLeft, St, Yt, !0), e.lineTo(n + r - l.bottomRight, i + o), e.arc(n + r - l.bottomRight, i + o - l.bottomRight, l.bottomRight, Yt, 0, !0), e.lineTo(n + r, i + l.topRight), e.arc(n + r - l.topRight, i + l.topRight, l.topRight, 0, -Yt, !0), e.lineTo(n + l.topLeft, i);
}
const wk = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, kk = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function bk(e, t) {
  const n = ("" + e).match(wk);
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
const Sk = (e) => +e || 0;
function td(e, t) {
  const n = {}, i = dt(t), r = i ? Object.keys(t) : t, o = dt(e) ? i ? (l) => st(e[l], e[t[l]]) : (l) => e[l] : () => e;
  for (const l of r)
    n[l] = Sk(o(l));
  return n;
}
function Cv(e) {
  return td(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function ws(e) {
  return td(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Xe(e) {
  const t = Cv(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function ve(e, t) {
  e = e || {}, t = t || Ft.font;
  let n = st(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let i = st(e.style, t.style);
  i && !("" + i).match(kk) && (console.warn('Invalid font style specified: "' + i + '"'), i = void 0);
  const r = {
    family: st(e.family, t.family),
    lineHeight: bk(st(e.lineHeight, t.lineHeight), n),
    size: n,
    style: i,
    weight: st(e.weight, t.weight),
    string: ""
  };
  return r.string = mk(r), r;
}
function Qo(e, t, n, i) {
  let r, o, l;
  for (r = 0, o = e.length; r < o; ++r)
    if (l = e[r], l !== void 0 && l !== void 0)
      return l;
}
function Pk(e, t, n) {
  const { min: i, max: r } = e, o = gv(t, (r - i) / 2), l = (u, c) => n && u === 0 ? 0 : u + c;
  return {
    min: l(i, -Math.abs(o)),
    max: l(r, o)
  };
}
function Vi(e, t) {
  return Object.assign(Object.create(e), t);
}
function ed(e, t = [
  ""
], n, i, r = () => e[0]) {
  const o = n || e;
  typeof i > "u" && (i = zv("_fallback", e));
  const l = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: i,
    _getTarget: r,
    override: (u) => ed([
      u,
      ...e
    ], t, o, i)
  };
  return new Proxy(l, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(u, c) {
      return delete u[c], delete u._keys, delete e[0][c], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(u, c) {
      return Tv(u, c, () => Nk(c, t, e, u));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(u, c) {
      return Reflect.getOwnPropertyDescriptor(u._scopes[0], c);
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
    has(u, c) {
      return Wp(u).includes(c);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(u) {
      return Wp(u);
    },
    /**
    * A trap for setting property values.
    */
    set(u, c, d) {
      const p = u._storage || (u._storage = r());
      return u[c] = p[c] = d, delete u._keys, !0;
    }
  });
}
function Es(e, t, n, i) {
  const r = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Lv(e, i),
    setContext: (o) => Es(e, o, n, i),
    override: (o) => Es(e.override(o), t, n, i)
  };
  return new Proxy(r, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(o, l) {
      return delete o[l], delete e[l], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(o, l, u) {
      return Tv(o, l, () => Ck(o, l, u));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(o, l) {
      return o._descriptors.allKeys ? Reflect.has(e, l) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(e, l);
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
    has(o, l) {
      return Reflect.has(e, l);
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
    set(o, l, u) {
      return e[l] = u, delete o[l], !0;
    }
  });
}
function Lv(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: i = t.indexable, _allKeys: r = t.allKeys } = e;
  return {
    allKeys: r,
    scriptable: n,
    indexable: i,
    isScriptable: oi(n) ? n : () => n,
    isIndexable: oi(i) ? i : () => i
  };
}
const Mk = (e, t) => e ? e + Xh(t) : t, nd = (e, t) => dt(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Tv(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const i = n();
  return e[t] = i, i;
}
function Ck(e, t, n) {
  const { _proxy: i, _context: r, _subProxy: o, _descriptors: l } = e;
  let u = i[t];
  return oi(u) && l.isScriptable(t) && (u = Lk(t, u, e, n)), Ut(u) && u.length && (u = Tk(t, u, e, l.isIndexable)), nd(t, u) && (u = Es(u, r, o && o[t], l)), u;
}
function Lk(e, t, n, i) {
  const { _proxy: r, _context: o, _subProxy: l, _stack: u } = n;
  if (u.has(e))
    throw new Error("Recursion detected: " + Array.from(u).join("->") + "->" + e);
  u.add(e);
  let c = t(o, l || i);
  return u.delete(e), nd(e, c) && (c = id(r._scopes, r, e, c)), c;
}
function Tk(e, t, n, i) {
  const { _proxy: r, _context: o, _subProxy: l, _descriptors: u } = n;
  if (typeof o.index < "u" && i(e))
    return t[o.index % t.length];
  if (dt(t[0])) {
    const c = t, d = r._scopes.filter((p) => p !== c);
    t = [];
    for (const p of c) {
      const g = id(d, r, e, p);
      t.push(Es(g, o, l && l[e], u));
    }
  }
  return t;
}
function Ev(e, t, n) {
  return oi(e) ? e(t, n) : e;
}
const Ek = (e, t) => e === !0 ? t : typeof e == "string" ? Bi(t, e) : void 0;
function zk(e, t, n, i, r) {
  for (const o of t) {
    const l = Ek(n, o);
    if (l) {
      e.add(l);
      const u = Ev(l._fallback, n, r);
      if (typeof u < "u" && u !== n && u !== i)
        return u;
    } else if (l === !1 && typeof i < "u" && n !== i)
      return null;
  }
  return !1;
}
function id(e, t, n, i) {
  const r = t._rootScopes, o = Ev(t._fallback, n, i), l = [
    ...e,
    ...r
  ], u = /* @__PURE__ */ new Set();
  u.add(i);
  let c = Hp(u, l, n, o || n, i);
  return c === null || typeof o < "u" && o !== n && (c = Hp(u, l, o, c, i), c === null) ? !1 : ed(Array.from(u), [
    ""
  ], r, o, () => Ok(t, n, i));
}
function Hp(e, t, n, i, r) {
  for (; n; )
    n = zk(e, t, n, i, r);
  return n;
}
function Ok(e, t, n) {
  const i = e._getTarget();
  t in i || (i[t] = {});
  const r = i[t];
  return Ut(r) && dt(n) ? n : r || {};
}
function Nk(e, t, n, i) {
  let r;
  for (const o of t)
    if (r = zv(Mk(o, e), n), typeof r < "u")
      return nd(e, r) ? id(n, i, e, r) : r;
}
function zv(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const i = n[e];
    if (typeof i < "u")
      return i;
  }
}
function Wp(e) {
  let t = e._keys;
  return t || (t = e._keys = Ak(e._scopes)), t;
}
function Ak(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const i of Object.keys(n).filter((r) => !r.startsWith("_")))
      t.add(i);
  return Array.from(t);
}
const Ik = Number.EPSILON || 1e-14, zs = (e, t) => t < e.length && !e[t].skip && e[t], Ov = (e) => e === "x" ? "y" : "x";
function Dk(e, t, n, i) {
  const r = e.skip ? t : e, o = t, l = n.skip ? t : n, u = Fc(o, r), c = Fc(l, o);
  let d = u / (u + c), p = c / (u + c);
  d = isNaN(d) ? 0 : d, p = isNaN(p) ? 0 : p;
  const g = i * d, _ = i * p;
  return {
    previous: {
      x: o.x - g * (l.x - r.x),
      y: o.y - g * (l.y - r.y)
    },
    next: {
      x: o.x + _ * (l.x - r.x),
      y: o.y + _ * (l.y - r.y)
    }
  };
}
function Rk(e, t, n) {
  const i = e.length;
  let r, o, l, u, c, d = zs(e, 0);
  for (let p = 0; p < i - 1; ++p)
    if (c = d, d = zs(e, p + 1), !(!c || !d)) {
      if (zr(t[p], 0, Ik)) {
        n[p] = n[p + 1] = 0;
        continue;
      }
      r = n[p] / t[p], o = n[p + 1] / t[p], u = Math.pow(r, 2) + Math.pow(o, 2), !(u <= 9) && (l = 3 / Math.sqrt(u), n[p] = r * l * t[p], n[p + 1] = o * l * t[p]);
    }
}
function jk(e, t, n = "x") {
  const i = Ov(n), r = e.length;
  let o, l, u, c = zs(e, 0);
  for (let d = 0; d < r; ++d) {
    if (l = u, u = c, c = zs(e, d + 1), !u)
      continue;
    const p = u[n], g = u[i];
    l && (o = (p - l[n]) / 3, u[`cp1${n}`] = p - o, u[`cp1${i}`] = g - o * t[d]), c && (o = (c[n] - p) / 3, u[`cp2${n}`] = p + o, u[`cp2${i}`] = g + o * t[d]);
  }
}
function Bk(e, t = "x") {
  const n = Ov(t), i = e.length, r = Array(i).fill(0), o = Array(i);
  let l, u, c, d = zs(e, 0);
  for (l = 0; l < i; ++l)
    if (u = c, c = d, d = zs(e, l + 1), !!c) {
      if (d) {
        const p = d[t] - c[t];
        r[l] = p !== 0 ? (d[n] - c[n]) / p : 0;
      }
      o[l] = u ? d ? cn(r[l - 1]) !== cn(r[l]) ? 0 : (r[l - 1] + r[l]) / 2 : r[l - 1] : r[l];
    }
  Rk(e, r, o), jk(e, o, t);
}
function Jo(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function Fk(e, t) {
  let n, i, r, o, l, u = no(e[0], t);
  for (n = 0, i = e.length; n < i; ++n)
    l = o, o = u, u = n < i - 1 && no(e[n + 1], t), o && (r = e[n], l && (r.cp1x = Jo(r.cp1x, t.left, t.right), r.cp1y = Jo(r.cp1y, t.top, t.bottom)), u && (r.cp2x = Jo(r.cp2x, t.left, t.right), r.cp2y = Jo(r.cp2y, t.top, t.bottom)));
}
function Hk(e, t, n, i, r) {
  let o, l, u, c;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    Bk(e, r);
  else {
    let d = i ? e[e.length - 1] : e[0];
    for (o = 0, l = e.length; o < l; ++o)
      u = e[o], c = Dk(d, u, e[Math.min(o + 1, l - (i ? 0 : 1)) % l], t.tension), u.cp1x = c.previous.x, u.cp1y = c.previous.y, u.cp2x = c.next.x, u.cp2y = c.next.y, d = u;
  }
  t.capBezierPoints && Fk(e, n);
}
function sd() {
  return typeof window < "u" && typeof document < "u";
}
function rd(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function nl(e, t, n) {
  let i;
  return typeof e == "string" ? (i = parseInt(e, 10), e.indexOf("%") !== -1 && (i = i / 100 * t.parentNode[n])) : i = e, i;
}
const Sl = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function Wk(e, t) {
  return Sl(e).getPropertyValue(t);
}
const Vk = [
  "top",
  "right",
  "bottom",
  "left"
];
function Oi(e, t, n) {
  const i = {};
  n = n ? "-" + n : "";
  for (let r = 0; r < 4; r++) {
    const o = Vk[r];
    i[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return i.width = i.left + i.right, i.height = i.top + i.bottom, i;
}
const Zk = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function Uk(e, t) {
  const n = e.touches, i = n && n.length ? n[0] : e, { offsetX: r, offsetY: o } = i;
  let l = !1, u, c;
  if (Zk(r, o, e.target))
    u = r, c = o;
  else {
    const d = t.getBoundingClientRect();
    u = i.clientX - d.left, c = i.clientY - d.top, l = !0;
  }
  return {
    x: u,
    y: c,
    box: l
  };
}
function Si(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: i } = t, r = Sl(n), o = r.boxSizing === "border-box", l = Oi(r, "padding"), u = Oi(r, "border", "width"), { x: c, y: d, box: p } = Uk(e, n), g = l.left + (p && u.left), _ = l.top + (p && u.top);
  let { width: x, height: S } = t;
  return o && (x -= l.width + u.width, S -= l.height + u.height), {
    x: Math.round((c - g) / x * n.width / i),
    y: Math.round((d - _) / S * n.height / i)
  };
}
function $k(e, t, n) {
  let i, r;
  if (t === void 0 || n === void 0) {
    const o = e && rd(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const l = o.getBoundingClientRect(), u = Sl(o), c = Oi(u, "border", "width"), d = Oi(u, "padding");
      t = l.width - d.width - c.width, n = l.height - d.height - c.height, i = nl(u.maxWidth, o, "clientWidth"), r = nl(u.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: i || Ja,
    maxHeight: r || Ja
  };
}
const Un = (e) => Math.round(e * 10) / 10;
function Yk(e, t, n, i) {
  const r = Sl(e), o = Oi(r, "margin"), l = nl(r.maxWidth, e, "clientWidth") || Ja, u = nl(r.maxHeight, e, "clientHeight") || Ja, c = $k(e, t, n);
  let { width: d, height: p } = c;
  if (r.boxSizing === "content-box") {
    const _ = Oi(r, "border", "width"), x = Oi(r, "padding");
    d -= x.width + _.width, p -= x.height + _.height;
  }
  return d = Math.max(0, d - o.width), p = Math.max(0, i ? d / i : p - o.height), d = Un(Math.min(d, l, c.maxWidth)), p = Un(Math.min(p, u, c.maxHeight)), d && !p && (p = Un(d / 2)), (t !== void 0 || n !== void 0) && i && c.height && p > c.height && (p = c.height, d = Un(Math.floor(p * i))), {
    width: d,
    height: p
  };
}
function Vp(e, t, n) {
  const i = t || 1, r = Un(e.height * i), o = Un(e.width * i);
  e.height = Un(e.height), e.width = Un(e.width);
  const l = e.canvas;
  return l.style && (n || !l.style.height && !l.style.width) && (l.style.height = `${e.height}px`, l.style.width = `${e.width}px`), e.currentDevicePixelRatio !== i || l.height !== r || l.width !== o ? (e.currentDevicePixelRatio = i, l.height = r, l.width = o, e.ctx.setTransform(i, 0, 0, i, 0, 0), !0) : !1;
}
const Kk = function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    sd() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
}();
function Zp(e, t) {
  const n = Wk(e, t), i = n && n.match(/^(\d+)(\.\d+)?px$/);
  return i ? +i[1] : void 0;
}
function Pi(e, t, n, i) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function Gk(e, t, n, i) {
  return {
    x: e.x + n * (t.x - e.x),
    y: i === "middle" ? n < 0.5 ? e.y : t.y : i === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function Xk(e, t, n, i) {
  const r = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, l = Pi(e, r, n), u = Pi(r, o, n), c = Pi(o, t, n), d = Pi(l, u, n), p = Pi(u, c, n);
  return Pi(d, p, n);
}
const qk = function(e, t) {
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
}, Qk = function() {
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
function ks(e, t, n) {
  return e ? qk(t, n) : Qk();
}
function Nv(e, t) {
  let n, i;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, i = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = i);
}
function Av(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Iv(e) {
  return e === "angle" ? {
    between: eo,
    compare: qw,
    normalize: Se
  } : {
    between: Cn,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Up({ start: e, end: t, count: n, loop: i, style: r }) {
  return {
    start: e % n,
    end: t % n,
    loop: i && (t - e + 1) % n === 0,
    style: r
  };
}
function Jk(e, t, n) {
  const { property: i, start: r, end: o } = n, { between: l, normalize: u } = Iv(i), c = t.length;
  let { start: d, end: p, loop: g } = e, _, x;
  if (g) {
    for (d += c, p += c, _ = 0, x = c; _ < x && l(u(t[d % c][i]), r, o); ++_)
      d--, p--;
    d %= c, p %= c;
  }
  return p < d && (p += c), {
    start: d,
    end: p,
    loop: g,
    style: e.style
  };
}
function Dv(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: i, start: r, end: o } = n, l = t.length, { compare: u, between: c, normalize: d } = Iv(i), { start: p, end: g, loop: _, style: x } = Jk(e, t, n), S = [];
  let k = !1, C = null, w, b, P;
  const T = () => c(r, P, w) && u(r, P) !== 0, E = () => u(o, w) === 0 || c(o, P, w), N = () => k || T(), D = () => !k || E();
  for (let A = p, H = p; A <= g; ++A)
    b = t[A % l], !b.skip && (w = d(b[i]), w !== P && (k = c(w, r, o), C === null && N() && (C = u(w, r) === 0 ? A : H), C !== null && D() && (S.push(Up({
      start: C,
      end: A,
      loop: _,
      count: l,
      style: x
    })), C = null), H = A, P = w));
  return C !== null && S.push(Up({
    start: C,
    end: g,
    loop: _,
    count: l,
    style: x
  })), S;
}
function Rv(e, t) {
  const n = [], i = e.segments;
  for (let r = 0; r < i.length; r++) {
    const o = Dv(i[r], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function tb(e, t, n, i) {
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
function eb(e, t, n, i) {
  const r = e.length, o = [];
  let l = t, u = e[t], c;
  for (c = t + 1; c <= n; ++c) {
    const d = e[c % r];
    d.skip || d.stop ? u.skip || (i = !1, o.push({
      start: t % r,
      end: (c - 1) % r,
      loop: i
    }), t = l = d.stop ? c : null) : (l = c, u.skip && (t = c)), u = d;
  }
  return l !== null && o.push({
    start: t % r,
    end: l % r,
    loop: i
  }), o;
}
function nb(e, t) {
  const n = e.points, i = e.options.spanGaps, r = n.length;
  if (!r)
    return [];
  const o = !!e._loop, { start: l, end: u } = tb(n, r, o, i);
  if (i === !0)
    return $p(e, [
      {
        start: l,
        end: u,
        loop: o
      }
    ], n, t);
  const c = u < l ? u + r : u, d = !!e._fullLoop && l === 0 && u === r - 1;
  return $p(e, eb(n, l, c, d), n, t);
}
function $p(e, t, n, i) {
  return !i || !i.setContext || !n ? t : ib(e, t, n, i);
}
function ib(e, t, n, i) {
  const r = e._chart.getContext(), o = Yp(e.options), { _datasetIndex: l, options: { spanGaps: u } } = e, c = n.length, d = [];
  let p = o, g = t[0].start, _ = g;
  function x(S, k, C, w) {
    const b = u ? -1 : 1;
    if (S !== k) {
      for (S += c; n[S % c].skip; )
        S -= b;
      for (; n[k % c].skip; )
        k += b;
      S % c !== k % c && (d.push({
        start: S % c,
        end: k % c,
        loop: C,
        style: w
      }), p = w, g = k % c);
    }
  }
  for (const S of t) {
    g = u ? g : S.start;
    let k = n[g % c], C;
    for (_ = g + 1; _ <= S.end; _++) {
      const w = n[_ % c];
      C = Yp(i.setContext(Vi(r, {
        type: "segment",
        p0: k,
        p1: w,
        p0DataIndex: (_ - 1) % c,
        p1DataIndex: _ % c,
        datasetIndex: l
      }))), sb(C, p) && x(g, _ - 1, S.loop, p), k = w, p = C;
    }
    g < _ - 1 && x(g, _ - 1, S.loop, p);
  }
  return d;
}
function Yp(e) {
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
function sb(e, t) {
  if (!t)
    return !1;
  const n = [], i = function(r, o) {
    return Qh(o) ? (n.includes(o) || n.push(o), n.indexOf(o)) : o;
  };
  return JSON.stringify(e, i) !== JSON.stringify(t, i);
}
function ta(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function rb(e, t) {
  const { xScale: n, yScale: i } = e;
  return n && i ? {
    left: ta(n, t, "left"),
    right: ta(n, t, "right"),
    top: ta(i, t, "top"),
    bottom: ta(i, t, "bottom")
  } : t;
}
function jv(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const i = rb(t, e.chartArea);
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
class ob {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, n, i, r) {
    const o = n.listeners[r], l = n.duration;
    o.forEach((u) => u({
      chart: t,
      initial: n.initial,
      numSteps: l,
      currentStep: Math.min(i - n.start, l)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = kv.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let n = 0;
    this._charts.forEach((i, r) => {
      if (!i.running || !i.items.length)
        return;
      const o = i.items;
      let l = o.length - 1, u = !1, c;
      for (; l >= 0; --l)
        c = o[l], c._active ? (c._total > i.duration && (i.duration = c._total), c.tick(t), u = !0) : (o[l] = o[o.length - 1], o.pop());
      u && (r.draw(), this._notify(r, i, t, "progress")), o.length || (i.running = !1, this._notify(r, i, t, "complete"), i.initial = !1), n += o.length;
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
var yn = /* @__PURE__ */ new ob();
const Kp = "transparent", ab = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const i = Rp(e || Kp), r = i.valid && Rp(t || Kp);
    return r && r.valid ? r.mix(i, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class lb {
  constructor(t, n, i, r) {
    const o = n[i];
    r = Qo([
      t.to,
      r,
      o,
      t.from
    ]);
    const l = Qo([
      t.from,
      o,
      r
    ]);
    this._active = !0, this._fn = t.fn || ab[t.type || typeof l], this._easing = Or[t.easing] || Or.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = i, this._from = l, this._to = r, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, i) {
    if (this._active) {
      this._notify(!1);
      const r = this._target[this._prop], o = i - this._start, l = this._duration - o;
      this._start = i, this._duration = Math.floor(Math.max(l, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Qo([
        t.to,
        n,
        r,
        t.from
      ]), this._from = Qo([
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
    const n = t - this._start, i = this._duration, r = this._prop, o = this._from, l = this._loop, u = this._to;
    let c;
    if (this._active = o !== u && (l || n < i), !this._active) {
      this._target[r] = u, this._notify(!0);
      return;
    }
    if (n < 0) {
      this._target[r] = o;
      return;
    }
    c = n / i % 2, c = l && c > 1 ? 2 - c : c, c = this._easing(Math.min(1, Math.max(0, c))), this._target[r] = this._fn(o, u, c);
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
class Bv {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!dt(t))
      return;
    const n = Object.keys(Ft.animation), i = this._properties;
    Object.getOwnPropertyNames(t).forEach((r) => {
      const o = t[r];
      if (!dt(o))
        return;
      const l = {};
      for (const u of n)
        l[u] = o[u];
      (Ut(o.properties) && o.properties || [
        r
      ]).forEach((u) => {
        (u === r || !i.has(u)) && i.set(u, l);
      });
    });
  }
  _animateOptions(t, n) {
    const i = n.options, r = cb(t, i);
    if (!r)
      return [];
    const o = this._createAnimations(r, i);
    return i.$shared && ub(t.options.$animations, i).then(() => {
      t.options = i;
    }, () => {
    }), o;
  }
  _createAnimations(t, n) {
    const i = this._properties, r = [], o = t.$animations || (t.$animations = {}), l = Object.keys(n), u = Date.now();
    let c;
    for (c = l.length - 1; c >= 0; --c) {
      const d = l[c];
      if (d.charAt(0) === "$")
        continue;
      if (d === "options") {
        r.push(...this._animateOptions(t, n));
        continue;
      }
      const p = n[d];
      let g = o[d];
      const _ = i.get(d);
      if (g)
        if (_ && g.active()) {
          g.update(_, p, u);
          continue;
        } else
          g.cancel();
      if (!_ || !_.duration) {
        t[d] = p;
        continue;
      }
      o[d] = g = new lb(_, t, d, p), r.push(g);
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
      return yn.add(this._chart, i), !0;
  }
}
function ub(e, t) {
  const n = [], i = Object.keys(t);
  for (let r = 0; r < i.length; r++) {
    const o = e[i[r]];
    o && o.active() && n.push(o.wait());
  }
  return Promise.all(n);
}
function cb(e, t) {
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
function Gp(e, t) {
  const n = e && e.options || {}, i = n.reverse, r = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: i ? o : r,
    end: i ? r : o
  };
}
function hb(e, t, n) {
  if (n === !1)
    return !1;
  const i = Gp(e, n), r = Gp(t, n);
  return {
    top: r.end,
    right: i.end,
    bottom: r.start,
    left: i.start
  };
}
function db(e) {
  let t, n, i, r;
  return dt(e) ? (t = e.top, n = e.right, i = e.bottom, r = e.left) : t = n = i = r = e, {
    top: t,
    right: n,
    bottom: i,
    left: r,
    disabled: e === !1
  };
}
function Fv(e, t) {
  const n = [], i = e._getSortedDatasetMetas(t);
  let r, o;
  for (r = 0, o = i.length; r < o; ++r)
    n.push(i[r].index);
  return n;
}
function Xp(e, t, n, i = {}) {
  const r = e.keys, o = i.mode === "single";
  let l, u, c, d;
  if (t === null)
    return;
  let p = !1;
  for (l = 0, u = r.length; l < u; ++l) {
    if (c = +r[l], c === n) {
      if (p = !0, i.all)
        continue;
      break;
    }
    d = e.values[c], ae(d) && (o || t === 0 || cn(t) === cn(d)) && (t += d);
  }
  return !p && !i.all ? 0 : t;
}
function fb(e, t) {
  const { iScale: n, vScale: i } = t, r = n.axis === "x" ? "x" : "y", o = i.axis === "x" ? "x" : "y", l = Object.keys(e), u = new Array(l.length);
  let c, d, p;
  for (c = 0, d = l.length; c < d; ++c)
    p = l[c], u[c] = {
      [r]: p,
      [o]: e[p]
    };
  return u;
}
function Nu(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function pb(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function mb(e) {
  const { min: t, max: n, minDefined: i, maxDefined: r } = e.getUserBounds();
  return {
    min: i ? t : Number.NEGATIVE_INFINITY,
    max: r ? n : Number.POSITIVE_INFINITY
  };
}
function gb(e, t, n) {
  const i = e[t] || (e[t] = {});
  return i[n] || (i[n] = {});
}
function qp(e, t, n, i) {
  for (const r of t.getMatchingVisibleMetas(i).reverse()) {
    const o = e[r.index];
    if (n && o > 0 || !n && o < 0)
      return r.index;
  }
  return null;
}
function Qp(e, t) {
  const { chart: n, _cachedMeta: i } = e, r = n._stacks || (n._stacks = {}), { iScale: o, vScale: l, index: u } = i, c = o.axis, d = l.axis, p = pb(o, l, i), g = t.length;
  let _;
  for (let x = 0; x < g; ++x) {
    const S = t[x], { [c]: k, [d]: C } = S, w = S._stacks || (S._stacks = {});
    _ = w[d] = gb(r, p, k), _[u] = C, _._top = qp(_, l, !0, i.type), _._bottom = qp(_, l, !1, i.type);
    const b = _._visualValues || (_._visualValues = {});
    b[u] = C;
  }
}
function Au(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((i) => n[i].axis === t).shift();
}
function _b(e, t) {
  return Vi(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function vb(e, t, n) {
  return Vi(e, {
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
function ar(e, t) {
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
const Iu = (e) => e === "reset" || e === "none", Jp = (e, t) => t ? e : Object.assign({}, e), yb = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: Fv(n, !0),
  values: null
};
class Ni {
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Nu(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && ar(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, i = this.getDataset(), r = (g, _, x, S) => g === "x" ? _ : g === "r" ? S : x, o = n.xAxisID = st(i.xAxisID, Au(t, "x")), l = n.yAxisID = st(i.yAxisID, Au(t, "y")), u = n.rAxisID = st(i.rAxisID, Au(t, "r")), c = n.indexAxis, d = n.iAxisID = r(c, o, l, u), p = n.vAxisID = r(c, l, o, u);
    n.xScale = this.getScaleForId(o), n.yScale = this.getScaleForId(l), n.rScale = this.getScaleForId(u), n.iScale = this.getScaleForId(d), n.vScale = this.getScaleForId(p);
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
    this._data && Ap(this._data, this), t._stacked && ar(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), i = this._data;
    if (dt(n)) {
      const r = this._cachedMeta;
      this._data = fb(n, r);
    } else if (i !== n) {
      if (i) {
        Ap(i, this);
        const r = this._cachedMeta;
        ar(r), r._parsed = [];
      }
      n && Object.isExtensible(n) && ek(n, this), this._syncList = [], this._data = n;
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
    n._stacked = Nu(n.vScale, n), n.stack !== i.stack && (r = !0, ar(n), n.stack = i.stack), this._resyncElements(t), (r || o !== n._stacked) && (Qp(this, n._parsed), n._stacked = Nu(n.vScale, n));
  }
  configure() {
    const t = this.chart.config, n = t.datasetScopeKeys(this._type), i = t.getOptionScopes(this.getDataset(), n, !0);
    this.options = t.createResolver(i, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, n) {
    const { _cachedMeta: i, _data: r } = this, { iScale: o, _stacked: l } = i, u = o.axis;
    let c = t === 0 && n === r.length ? !0 : i._sorted, d = t > 0 && i._parsed[t - 1], p, g, _;
    if (this._parsing === !1)
      i._parsed = r, i._sorted = !0, _ = r;
    else {
      Ut(r[t]) ? _ = this.parseArrayData(i, r, t, n) : dt(r[t]) ? _ = this.parseObjectData(i, r, t, n) : _ = this.parsePrimitiveData(i, r, t, n);
      const x = () => g[u] === null || d && g[u] < d[u];
      for (p = 0; p < n; ++p)
        i._parsed[p + t] = g = _[p], c && (x() && (c = !1), d = g);
      i._sorted = c;
    }
    l && Qp(this, _);
  }
  parsePrimitiveData(t, n, i, r) {
    const { iScale: o, vScale: l } = t, u = o.axis, c = l.axis, d = o.getLabels(), p = o === l, g = new Array(r);
    let _, x, S;
    for (_ = 0, x = r; _ < x; ++_)
      S = _ + i, g[_] = {
        [u]: p || o.parse(d[S], S),
        [c]: l.parse(n[S], S)
      };
    return g;
  }
  parseArrayData(t, n, i, r) {
    const { xScale: o, yScale: l } = t, u = new Array(r);
    let c, d, p, g;
    for (c = 0, d = r; c < d; ++c)
      p = c + i, g = n[p], u[c] = {
        x: o.parse(g[0], p),
        y: l.parse(g[1], p)
      };
    return u;
  }
  parseObjectData(t, n, i, r) {
    const { xScale: o, yScale: l } = t, { xAxisKey: u = "x", yAxisKey: c = "y" } = this._parsing, d = new Array(r);
    let p, g, _, x;
    for (p = 0, g = r; p < g; ++p)
      _ = p + i, x = n[_], d[p] = {
        x: o.parse(Bi(x, u), _),
        y: l.parse(Bi(x, c), _)
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
    const r = this.chart, o = this._cachedMeta, l = n[t.axis], u = {
      keys: Fv(r, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return Xp(u, l, o.index, {
      mode: i
    });
  }
  updateRangeFromParsed(t, n, i, r) {
    const o = i[n.axis];
    let l = o === null ? NaN : o;
    const u = r && i._stacks[n.axis];
    r && u && (r.values = u, l = Xp(r, o, this._cachedMeta.index)), t.min = Math.min(t.min, l), t.max = Math.max(t.max, l);
  }
  getMinMax(t, n) {
    const i = this._cachedMeta, r = i._parsed, o = i._sorted && t === i.iScale, l = r.length, u = this._getOtherScale(t), c = yb(n, i, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: p, max: g } = mb(u);
    let _, x;
    function S() {
      x = r[_];
      const k = x[u.axis];
      return !ae(x[t.axis]) || p > k || g < k;
    }
    for (_ = 0; _ < l && !(!S() && (this.updateRangeFromParsed(d, t, x, c), o)); ++_)
      ;
    if (o) {
      for (_ = l - 1; _ >= 0; --_)
        if (!S()) {
          this.updateRangeFromParsed(d, t, x, c);
          break;
        }
    }
    return d;
  }
  getAllParsedValues(t) {
    const n = this._cachedMeta._parsed, i = [];
    let r, o, l;
    for (r = 0, o = n.length; r < o; ++r)
      l = n[r][t.axis], ae(l) && i.push(l);
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
    this.update(t || "default"), n._clip = db(st(this.options.clip, hb(n.xScale, n.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, n = this.chart, i = this._cachedMeta, r = i.data || [], o = n.chartArea, l = [], u = this._drawStart || 0, c = this._drawCount || r.length - u, d = this.options.drawActiveElementsOnTop;
    let p;
    for (i.dataset && i.dataset.draw(t, o, u, c), p = u; p < u + c; ++p) {
      const g = r[p];
      g.hidden || (g.active && d ? l.push(g) : g.draw(t, o));
    }
    for (p = 0; p < l.length; ++p)
      l[p].draw(t, o);
  }
  getStyle(t, n) {
    const i = n ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(i) : this.resolveDataElementOptions(t || 0, i);
  }
  getContext(t, n, i) {
    const r = this.getDataset();
    let o;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const l = this._cachedMeta.data[t];
      o = l.$context || (l.$context = vb(this.getContext(), t, l)), o.parsed = this.getParsed(t), o.raw = r.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = _b(this.chart.getContext(), this.index)), o.dataset = r, o.index = o.datasetIndex = this.index;
    return o.active = !!n, o.mode = i, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", i) {
    const r = n === "active", o = this._cachedDataOpts, l = t + "-" + n, u = o[l], c = this.enableOptionSharing && Jr(i);
    if (u)
      return Jp(u, c);
    const d = this.chart.config, p = d.datasetElementScopeKeys(this._type, t), g = r ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], _ = d.getOptionScopes(this.getDataset(), p), x = Object.keys(Ft.elements[t]), S = () => this.getContext(i, r, n), k = d.resolveNamedOptions(_, x, S, g);
    return k.$shared && (k.$shared = c, o[l] = Object.freeze(Jp(k, c))), k;
  }
  _resolveAnimations(t, n, i) {
    const r = this.chart, o = this._cachedDataOpts, l = `animation-${n}`, u = o[l];
    if (u)
      return u;
    let c;
    if (r.options.animation !== !1) {
      const p = this.chart.config, g = p.datasetAnimationScopeKeys(this._type, n), _ = p.getOptionScopes(this.getDataset(), g);
      c = p.createResolver(_, this.getContext(t, i, n));
    }
    const d = new Bv(r, c && c.animations);
    return c && c._cacheable && (o[l] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || Iu(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const i = this.resolveDataElementOptions(t, n), r = this._sharedOptions, o = this.getSharedOptions(i), l = this.includeOptions(n, o) || o !== r;
    return this.updateSharedOptions(o, n, i), {
      sharedOptions: o,
      includeOptions: l
    };
  }
  updateElement(t, n, i, r) {
    Iu(r) ? Object.assign(t, i) : this._resolveAnimations(n, r).update(t, i);
  }
  updateSharedOptions(t, n, i) {
    t && !Iu(n) && this._resolveAnimations(void 0, n).update(t, i);
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
    for (const [u, c, d] of this._syncList)
      this[u](c, d);
    this._syncList = [];
    const r = i.length, o = n.length, l = Math.min(o, r);
    l && this.parse(0, l), o > r ? this._insertElements(r, o - r, t) : o < r && this._removeElements(o, r - o);
  }
  _insertElements(t, n, i = !0) {
    const r = this._cachedMeta, o = r.data, l = t + n;
    let u;
    const c = (d) => {
      for (d.length += n, u = d.length - 1; u >= l; u--)
        d[u] = d[u - n];
    };
    for (c(o), u = t; u < l; ++u)
      o[u] = new this.dataElementType();
    this._parsing && c(r._parsed), this.parse(t, n), i && this.updateElements(o, t, n, "reset");
  }
  updateElements(t, n, i, r) {
  }
  _removeElements(t, n) {
    const i = this._cachedMeta;
    if (this._parsing) {
      const r = i._parsed.splice(t, n);
      i._stacked && ar(i, r);
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
Y(Ni, "defaults", {}), Y(Ni, "datasetElementType", null), Y(Ni, "dataElementType", null);
function xb(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let i = [];
    for (let r = 0, o = n.length; r < o; r++)
      i = i.concat(n[r].controller.getAllParsedValues(e));
    e._cache.$bar = wv(i.sort((r, o) => r - o));
  }
  return e._cache.$bar;
}
function wb(e) {
  const t = e.iScale, n = xb(t, e.type);
  let i = t._length, r, o, l, u;
  const c = () => {
    l === 32767 || l === -32768 || (Jr(u) && (i = Math.min(i, Math.abs(l - u) || i)), u = l);
  };
  for (r = 0, o = n.length; r < o; ++r)
    l = t.getPixelForValue(n[r]), c();
  for (u = void 0, r = 0, o = t.ticks.length; r < o; ++r)
    l = t.getPixelForTick(r), c();
  return i;
}
function kb(e, t, n, i) {
  const r = n.barThickness;
  let o, l;
  return xt(r) ? (o = t.min * n.categoryPercentage, l = n.barPercentage) : (o = r * i, l = 1), {
    chunk: o / i,
    ratio: l,
    start: t.pixels[e] - o / 2
  };
}
function bb(e, t, n, i) {
  const r = t.pixels, o = r[e];
  let l = e > 0 ? r[e - 1] : null, u = e < r.length - 1 ? r[e + 1] : null;
  const c = n.categoryPercentage;
  l === null && (l = o - (u === null ? t.end - t.start : u - o)), u === null && (u = o + o - l);
  const d = o - (o - Math.min(l, u)) / 2 * c;
  return {
    chunk: Math.abs(u - l) / 2 * c / i,
    ratio: n.barPercentage,
    start: d
  };
}
function Sb(e, t, n, i) {
  const r = n.parse(e[0], i), o = n.parse(e[1], i), l = Math.min(r, o), u = Math.max(r, o);
  let c = l, d = u;
  Math.abs(l) > Math.abs(u) && (c = u, d = l), t[n.axis] = d, t._custom = {
    barStart: c,
    barEnd: d,
    start: r,
    end: o,
    min: l,
    max: u
  };
}
function Hv(e, t, n, i) {
  return Ut(e) ? Sb(e, t, n, i) : t[n.axis] = n.parse(e, i), t;
}
function tm(e, t, n, i) {
  const r = e.iScale, o = e.vScale, l = r.getLabels(), u = r === o, c = [];
  let d, p, g, _;
  for (d = n, p = n + i; d < p; ++d)
    _ = t[d], g = {}, g[r.axis] = u || r.parse(l[d], d), c.push(Hv(_, g, o, d));
  return c;
}
function Du(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Pb(e, t, n) {
  return e !== 0 ? cn(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Mb(e) {
  let t, n, i, r, o;
  return e.horizontal ? (t = e.base > e.x, n = "left", i = "right") : (t = e.base < e.y, n = "bottom", i = "top"), t ? (r = "end", o = "start") : (r = "start", o = "end"), {
    start: n,
    end: i,
    reverse: t,
    top: r,
    bottom: o
  };
}
function Cb(e, t, n, i) {
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
  const { start: l, end: u, reverse: c, top: d, bottom: p } = Mb(e);
  r === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === i ? r = d : (n._bottom || 0) === i ? r = p : (o[em(p, l, u, c)] = !0, r = d)), o[em(r, l, u, c)] = !0, e.borderSkipped = o;
}
function em(e, t, n, i) {
  return i ? (e = Lb(e, t, n), e = nm(e, n, t)) : e = nm(e, t, n), e;
}
function Lb(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function nm(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Tb(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class wa extends Ni {
  parsePrimitiveData(t, n, i, r) {
    return tm(t, n, i, r);
  }
  parseArrayData(t, n, i, r) {
    return tm(t, n, i, r);
  }
  parseObjectData(t, n, i, r) {
    const { iScale: o, vScale: l } = t, { xAxisKey: u = "x", yAxisKey: c = "y" } = this._parsing, d = o.axis === "x" ? u : c, p = l.axis === "x" ? u : c, g = [];
    let _, x, S, k;
    for (_ = i, x = i + r; _ < x; ++_)
      k = n[_], S = {}, S[o.axis] = o.parse(Bi(k, d), _), g.push(Hv(Bi(k, p), S, l, _));
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
    const n = this._cachedMeta, { iScale: i, vScale: r } = n, o = this.getParsed(t), l = o._custom, u = Du(l) ? "[" + l.start + ", " + l.end + "]" : "" + r.getLabelForValue(o[r.axis]);
    return {
      label: "" + i.getLabelForValue(o[i.axis]),
      value: u
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
    const o = r === "reset", { index: l, _cachedMeta: { vScale: u } } = this, c = u.getBasePixel(), d = u.isHorizontal(), p = this._getRuler(), { sharedOptions: g, includeOptions: _ } = this._getSharedOptions(n, r);
    for (let x = n; x < n + i; x++) {
      const S = this.getParsed(x), k = o || xt(S[u.axis]) ? {
        base: c,
        head: c
      } : this._calculateBarValuePixels(x), C = this._calculateBarIndexPixels(x, p), w = (S._stacks || {})[u.axis], b = {
        horizontal: d,
        base: k.base,
        enableBorderRadius: !w || Du(S._custom) || l === w._top || l === w._bottom,
        x: d ? k.head : C.center,
        y: d ? C.center : k.head,
        height: d ? C.size : Math.abs(k.size),
        width: d ? Math.abs(k.size) : C.size
      };
      _ && (b.options = g || this.resolveDataElementOptions(x, t[x].active ? "active" : r));
      const P = b.options || t[x].options;
      Cb(b, P, w, l), Tb(b, P, p.ratio), this.updateElement(t[x], x, b, r);
    }
  }
  _getStacks(t, n) {
    const { iScale: i } = this._cachedMeta, r = i.getMatchingVisibleMetas(this._type).filter((p) => p.controller.options.grouped), o = i.options.stacked, l = [], u = this._cachedMeta.controller.getParsed(n), c = u && u[i.axis], d = (p) => {
      const g = p._parsed.find((x) => x[i.axis] === c), _ = g && g[p.vScale.axis];
      if (xt(_) || isNaN(_))
        return !0;
    };
    for (const p of r)
      if (!(n !== void 0 && d(p)) && ((o === !1 || l.indexOf(p.stack) === -1 || o === void 0 && p.stack === void 0) && l.push(p.stack), p.index === t))
        break;
    return l.length || l.push(void 0), l;
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
      t[st(this.chart.options.indexAxis === "x" ? i.xAxisID : i.yAxisID, n)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, n, i) {
    const r = this._getStacks(t, i), o = n !== void 0 ? r.indexOf(n) : -1;
    return o === -1 ? r.length - 1 : o;
  }
  _getRuler() {
    const t = this.options, n = this._cachedMeta, i = n.iScale, r = [];
    let o, l;
    for (o = 0, l = n.data.length; o < l; ++o)
      r.push(i.getPixelForValue(this.getParsed(o)[i.axis], o));
    const u = t.barThickness;
    return {
      min: u || wb(n),
      pixels: r,
      start: i._startPixel,
      end: i._endPixel,
      stackCount: this._getStackCount(),
      scale: i,
      grouped: t.grouped,
      ratio: u ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: n, _stacked: i, index: r }, options: { base: o, minBarLength: l } } = this, u = o || 0, c = this.getParsed(t), d = c._custom, p = Du(d);
    let g = c[n.axis], _ = 0, x = i ? this.applyStack(n, c, i) : g, S, k;
    x !== g && (_ = x - g, x = g), p && (g = d.barStart, x = d.barEnd - d.barStart, g !== 0 && cn(g) !== cn(d.barEnd) && (_ = 0), _ += g);
    const C = !xt(o) && !p ? o : _;
    let w = n.getPixelForValue(C);
    if (this.chart.getDataVisibility(t) ? S = n.getPixelForValue(_ + x) : S = w, k = S - w, Math.abs(k) < l) {
      k = Pb(k, n, u) * l, g === u && (w -= k / 2);
      const b = n.getPixelForDecimal(0), P = n.getPixelForDecimal(1), T = Math.min(b, P), E = Math.max(b, P);
      w = Math.max(Math.min(w, E), T), S = w + k, i && !p && (c._stacks[n.axis]._visualValues[r] = n.getValueForPixel(S) - n.getValueForPixel(w));
    }
    if (w === n.getPixelForValue(u)) {
      const b = cn(k) * n.getLineWidthForValue(u) / 2;
      w += b, k -= b;
    }
    return {
      size: k,
      base: w,
      head: S,
      center: S + k / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const i = n.scale, r = this.options, o = r.skipNull, l = st(r.maxBarThickness, 1 / 0);
    let u, c;
    const d = this._getAxisCount();
    if (n.grouped) {
      const p = o ? this._getStackCount(t) : n.stackCount, g = r.barThickness === "flex" ? bb(t, n, r, p * d) : kb(t, n, r, p * d), _ = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, x = this._getAxis().indexOf(st(_, this.getFirstScaleIdForIndexAxis())), S = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + x;
      u = g.start + g.chunk * S + g.chunk / 2, c = Math.min(l, g.chunk * g.ratio);
    } else
      u = i.getPixelForValue(this.getParsed(t)[i.axis], t), c = Math.min(l, n.min * n.ratio);
    return {
      base: u - c / 2,
      head: u + c / 2,
      center: u,
      size: c
    };
  }
  draw() {
    const t = this._cachedMeta, n = t.vScale, i = t.data, r = i.length;
    let o = 0;
    for (; o < r; ++o)
      this.getParsed(o)[n.axis] !== null && !i[o].hidden && i[o].draw(this._ctx);
  }
}
Y(wa, "id", "bar"), Y(wa, "defaults", {
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
}), Y(wa, "overrides", {
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
function Eb(e, t, n) {
  let i = 1, r = 1, o = 0, l = 0;
  if (t < At) {
    const u = e, c = u + t, d = Math.cos(u), p = Math.sin(u), g = Math.cos(c), _ = Math.sin(c), x = (P, T, E) => eo(P, u, c, !0) ? 1 : Math.max(T, T * n, E, E * n), S = (P, T, E) => eo(P, u, c, !0) ? -1 : Math.min(T, T * n, E, E * n), k = x(0, d, g), C = x(Yt, p, _), w = S(St, d, g), b = S(St + Yt, p, _);
    i = (k - w) / 2, r = (C - b) / 2, o = -(k + w) / 2, l = -(C + b) / 2;
  }
  return {
    ratioX: i,
    ratioY: r,
    offsetX: o,
    offsetY: l
  };
}
class _r extends Ni {
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
      let o = (c) => +i[c];
      if (dt(i[t])) {
        const { key: c = "value" } = this._parsing;
        o = (d) => +Bi(i[d], c);
      }
      let l, u;
      for (l = t, u = t + n; l < u; ++l)
        r._parsed[l] = o(l);
    }
  }
  _getRotation() {
    return Mn(this.options.rotation - 90);
  }
  _getCircumference() {
    return Mn(this.options.circumference);
  }
  _getRotationExtents() {
    let t = At, n = -At;
    for (let i = 0; i < this.chart.data.datasets.length; ++i)
      if (this.chart.isDatasetVisible(i) && this.chart.getDatasetMeta(i).type === this._type) {
        const r = this.chart.getDatasetMeta(i).controller, o = r._getRotation(), l = r._getCircumference();
        t = Math.min(t, o), n = Math.max(n, o + l);
      }
    return {
      rotation: t,
      circumference: n - t
    };
  }
  update(t) {
    const n = this.chart, { chartArea: i } = n, r = this._cachedMeta, o = r.data, l = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, u = Math.max((Math.min(i.width, i.height) - l) / 2, 0), c = Math.min(jw(this.options.cutout, u), 1), d = this._getRingWeight(this.index), { circumference: p, rotation: g } = this._getRotationExtents(), { ratioX: _, ratioY: x, offsetX: S, offsetY: k } = Eb(g, p, c), C = (i.width - l) / _, w = (i.height - l) / x, b = Math.max(Math.min(C, w) / 2, 0), P = gv(this.options.radius, b), T = Math.max(P * c, 0), E = (P - T) / this._getVisibleDatasetWeightTotal();
    this.offsetX = S * P, this.offsetY = k * P, r.total = this.calculateTotal(), this.outerRadius = P - E * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - E * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const i = this.options, r = this._cachedMeta, o = this._getCircumference();
    return n && i.animation.animateRotate || !this.chart.getDataVisibility(t) || r._parsed[t] === null || r.data[t].hidden ? 0 : this.calculateCircumference(r._parsed[t] * o / At);
  }
  updateElements(t, n, i, r) {
    const o = r === "reset", l = this.chart, u = l.chartArea, d = l.options.animation, p = (u.left + u.right) / 2, g = (u.top + u.bottom) / 2, _ = o && d.animateScale, x = _ ? 0 : this.innerRadius, S = _ ? 0 : this.outerRadius, { sharedOptions: k, includeOptions: C } = this._getSharedOptions(n, r);
    let w = this._getRotation(), b;
    for (b = 0; b < n; ++b)
      w += this._circumference(b, o);
    for (b = n; b < n + i; ++b) {
      const P = this._circumference(b, o), T = t[b], E = {
        x: p + this.offsetX,
        y: g + this.offsetY,
        startAngle: w,
        endAngle: w + P,
        circumference: P,
        outerRadius: S,
        innerRadius: x
      };
      C && (E.options = k || this.resolveDataElementOptions(b, T.active ? "active" : r)), w += P, this.updateElement(T, b, E, r);
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
    const n = this._cachedMeta, i = this.chart, r = i.data.labels || [], o = Jh(n._parsed[t], i.options.locale);
    return {
      label: r[t] || "",
      value: o
    };
  }
  getMaxBorderWidth(t) {
    let n = 0;
    const i = this.chart;
    let r, o, l, u, c;
    if (!t) {
      for (r = 0, o = i.data.datasets.length; r < o; ++r)
        if (i.isDatasetVisible(r)) {
          l = i.getDatasetMeta(r), t = l.data, u = l.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (r = 0, o = t.length; r < o; ++r)
      c = u.resolveDataElementOptions(r), c.borderAlign !== "inner" && (n = Math.max(n, c.borderWidth || 0, c.hoverBorderWidth || 0));
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
    return Math.max(st(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
Y(_r, "id", "doughnut"), Y(_r, "defaults", {
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
}), Y(_r, "descriptors", {
  _scriptable: (t) => t !== "spacing",
  _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
}), Y(_r, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(t) {
          const n = t.data, { labels: { pointStyle: i, textAlign: r, color: o, useBorderRadius: l, borderRadius: u } } = t.legend.options;
          return n.labels.length && n.datasets.length ? n.labels.map((c, d) => {
            const g = t.getDatasetMeta(0).controller.getStyle(d);
            return {
              text: c,
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
              borderRadius: l && (u || g.borderRadius),
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
class ka extends Ni {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const n = this._cachedMeta, { dataset: i, data: r = [], _dataset: o } = n, l = this.chart._animationsDisabled;
    let { start: u, count: c } = sk(n, r, l);
    this._drawStart = u, this._drawCount = c, rk(n) && (u = 0, c = r.length), i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!o._decimated, i.points = r;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(i, void 0, {
      animated: !l,
      options: d
    }, t), this.updateElements(r, u, c, t);
  }
  updateElements(t, n, i, r) {
    const o = r === "reset", { iScale: l, vScale: u, _stacked: c, _dataset: d } = this._cachedMeta, { sharedOptions: p, includeOptions: g } = this._getSharedOptions(n, r), _ = l.axis, x = u.axis, { spanGaps: S, segment: k } = this.options, C = to(S) ? S : Number.POSITIVE_INFINITY, w = this.chart._animationsDisabled || o || r === "none", b = n + i, P = t.length;
    let T = n > 0 && this.getParsed(n - 1);
    for (let E = 0; E < P; ++E) {
      const N = t[E], D = w ? N : {};
      if (E < n || E >= b) {
        D.skip = !0;
        continue;
      }
      const A = this.getParsed(E), H = xt(A[x]), j = D[_] = l.getPixelForValue(A[_], E), V = D[x] = o || H ? u.getBasePixel() : u.getPixelForValue(c ? this.applyStack(u, A, c) : A[x], E);
      D.skip = isNaN(j) || isNaN(V) || H, D.stop = E > 0 && Math.abs(A[_] - T[_]) > C, k && (D.parsed = A, D.raw = d.data[E]), g && (D.options = p || this.resolveDataElementOptions(E, N.active ? "active" : r)), w || this.updateElement(N, E, D, r), T = A;
    }
  }
  getMaxOverflow() {
    const t = this._cachedMeta, n = t.dataset, i = n.options && n.options.borderWidth || 0, r = t.data || [];
    if (!r.length)
      return i;
    const o = r[0].size(this.resolveDataElementOptions(0)), l = r[r.length - 1].size(this.resolveDataElementOptions(r.length - 1));
    return Math.max(i, o, l) / 2;
  }
  draw() {
    const t = this._cachedMeta;
    t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), super.draw();
  }
}
Y(ka, "id", "line"), Y(ka, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: !0,
  spanGaps: !1
}), Y(ka, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
function xi() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class od {
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
    Object.assign(od.prototype, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return xi();
  }
  parse() {
    return xi();
  }
  format() {
    return xi();
  }
  add() {
    return xi();
  }
  diff() {
    return xi();
  }
  startOf() {
    return xi();
  }
  endOf() {
    return xi();
  }
}
var zb = {
  _date: od
};
function Ob(e, t, n, i) {
  const { controller: r, data: o, _sorted: l } = e, u = r._cachedMeta.iScale, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (u && t === u.axis && t !== "r" && l && o.length) {
    const d = u._reversePixels ? Jw : Ti;
    if (i) {
      if (r._sharedOptions) {
        const p = o[0], g = typeof p.getRange == "function" && p.getRange(t);
        if (g) {
          const _ = d(o, t, n - g), x = d(o, t, n + g);
          return {
            lo: _.lo,
            hi: x.hi
          };
        }
      }
    } else {
      const p = d(o, t, n);
      if (c) {
        const { vScale: g } = r._cachedMeta, { _parsed: _ } = e, x = _.slice(0, p.lo + 1).reverse().findIndex((k) => !xt(k[g.axis]));
        p.lo -= Math.max(0, x);
        const S = _.slice(p.hi).findIndex((k) => !xt(k[g.axis]));
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
function Pl(e, t, n, i, r) {
  const o = e.getSortedVisibleDatasetMetas(), l = n[t];
  for (let u = 0, c = o.length; u < c; ++u) {
    const { index: d, data: p } = o[u], { lo: g, hi: _ } = Ob(o[u], t, l, r);
    for (let x = g; x <= _; ++x) {
      const S = p[x];
      S.skip || i(S, d, x);
    }
  }
}
function Nb(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(i, r) {
    const o = t ? Math.abs(i.x - r.x) : 0, l = n ? Math.abs(i.y - r.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(l, 2));
  };
}
function Ru(e, t, n, i, r) {
  const o = [];
  return !r && !e.isPointInArea(t) || Pl(e, n, t, function(u, c, d) {
    !r && !no(u, e.chartArea, 0) || u.inRange(t.x, t.y, i) && o.push({
      element: u,
      datasetIndex: c,
      index: d
    });
  }, !0), o;
}
function Ab(e, t, n, i) {
  let r = [];
  function o(l, u, c) {
    const { startAngle: d, endAngle: p } = l.getProps([
      "startAngle",
      "endAngle"
    ], i), { angle: g } = yv(l, {
      x: t.x,
      y: t.y
    });
    eo(g, d, p) && r.push({
      element: l,
      datasetIndex: u,
      index: c
    });
  }
  return Pl(e, n, t, o), r;
}
function Ib(e, t, n, i, r, o) {
  let l = [];
  const u = Nb(n);
  let c = Number.POSITIVE_INFINITY;
  function d(p, g, _) {
    const x = p.inRange(t.x, t.y, r);
    if (i && !x)
      return;
    const S = p.getCenterPoint(r);
    if (!(!!o || e.isPointInArea(S)) && !x)
      return;
    const C = u(t, S);
    C < c ? (l = [
      {
        element: p,
        datasetIndex: g,
        index: _
      }
    ], c = C) : C === c && l.push({
      element: p,
      datasetIndex: g,
      index: _
    });
  }
  return Pl(e, n, t, d), l;
}
function ju(e, t, n, i, r, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !i ? Ab(e, t, n, r) : Ib(e, t, n, i, r, o);
}
function im(e, t, n, i, r) {
  const o = [], l = n === "x" ? "inXRange" : "inYRange";
  let u = !1;
  return Pl(e, n, t, (c, d, p) => {
    c[l] && c[l](t[n], r) && (o.push({
      element: c,
      datasetIndex: d,
      index: p
    }), u = u || c.inRange(t.x, t.y, r));
  }), i && !u ? [] : o;
}
var Db = {
  modes: {
    index(e, t, n, i) {
      const r = Si(t, e), o = n.axis || "x", l = n.includeInvisible || !1, u = n.intersect ? Ru(e, r, o, i, l) : ju(e, r, o, !1, i, l), c = [];
      return u.length ? (e.getSortedVisibleDatasetMetas().forEach((d) => {
        const p = u[0].index, g = d.data[p];
        g && !g.skip && c.push({
          element: g,
          datasetIndex: d.index,
          index: p
        });
      }), c) : [];
    },
    dataset(e, t, n, i) {
      const r = Si(t, e), o = n.axis || "xy", l = n.includeInvisible || !1;
      let u = n.intersect ? Ru(e, r, o, i, l) : ju(e, r, o, !1, i, l);
      if (u.length > 0) {
        const c = u[0].datasetIndex, d = e.getDatasetMeta(c).data;
        u = [];
        for (let p = 0; p < d.length; ++p)
          u.push({
            element: d[p],
            datasetIndex: c,
            index: p
          });
      }
      return u;
    },
    point(e, t, n, i) {
      const r = Si(t, e), o = n.axis || "xy", l = n.includeInvisible || !1;
      return Ru(e, r, o, i, l);
    },
    nearest(e, t, n, i) {
      const r = Si(t, e), o = n.axis || "xy", l = n.includeInvisible || !1;
      return ju(e, r, o, n.intersect, i, l);
    },
    x(e, t, n, i) {
      const r = Si(t, e);
      return im(e, r, "x", n.intersect, i);
    },
    y(e, t, n, i) {
      const r = Si(t, e);
      return im(e, r, "y", n.intersect, i);
    }
  }
};
const Wv = [
  "left",
  "top",
  "right",
  "bottom"
];
function lr(e, t) {
  return e.filter((n) => n.pos === t);
}
function sm(e, t) {
  return e.filter((n) => Wv.indexOf(n.pos) === -1 && n.box.axis === t);
}
function ur(e, t) {
  return e.sort((n, i) => {
    const r = t ? i : n, o = t ? n : i;
    return r.weight === o.weight ? r.index - o.index : r.weight - o.weight;
  });
}
function Rb(e) {
  const t = [];
  let n, i, r, o, l, u;
  for (n = 0, i = (e || []).length; n < i; ++n)
    r = e[n], { position: o, options: { stack: l, stackWeight: u = 1 } } = r, t.push({
      index: n,
      box: r,
      pos: o,
      horizontal: r.isHorizontal(),
      weight: r.weight,
      stack: l && o + l,
      stackWeight: u
    });
  return t;
}
function jb(e) {
  const t = {};
  for (const n of e) {
    const { stack: i, pos: r, stackWeight: o } = n;
    if (!i || !Wv.includes(r))
      continue;
    const l = t[i] || (t[i] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    l.count++, l.weight += o;
  }
  return t;
}
function Bb(e, t) {
  const n = jb(e), { vBoxMaxWidth: i, hBoxMaxHeight: r } = t;
  let o, l, u;
  for (o = 0, l = e.length; o < l; ++o) {
    u = e[o];
    const { fullSize: c } = u.box, d = n[u.stack], p = d && u.stackWeight / d.weight;
    u.horizontal ? (u.width = p ? p * i : c && t.availableWidth, u.height = r) : (u.width = i, u.height = p ? p * r : c && t.availableHeight);
  }
  return n;
}
function Fb(e) {
  const t = Rb(e), n = ur(t.filter((d) => d.box.fullSize), !0), i = ur(lr(t, "left"), !0), r = ur(lr(t, "right")), o = ur(lr(t, "top"), !0), l = ur(lr(t, "bottom")), u = sm(t, "x"), c = sm(t, "y");
  return {
    fullSize: n,
    leftAndTop: i.concat(o),
    rightAndBottom: r.concat(c).concat(l).concat(u),
    chartArea: lr(t, "chartArea"),
    vertical: i.concat(r).concat(c),
    horizontal: o.concat(l).concat(u)
  };
}
function rm(e, t, n, i) {
  return Math.max(e[n], t[n]) + Math.max(e[i], t[i]);
}
function Vv(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Hb(e, t, n, i) {
  const { pos: r, box: o } = n, l = e.maxPadding;
  if (!dt(r)) {
    n.size && (e[r] -= n.size);
    const g = i[n.stack] || {
      size: 0,
      count: 1
    };
    g.size = Math.max(g.size, n.horizontal ? o.height : o.width), n.size = g.size / g.count, e[r] += n.size;
  }
  o.getPadding && Vv(l, o.getPadding());
  const u = Math.max(0, t.outerWidth - rm(l, e, "left", "right")), c = Math.max(0, t.outerHeight - rm(l, e, "top", "bottom")), d = u !== e.w, p = c !== e.h;
  return e.w = u, e.h = c, n.horizontal ? {
    same: d,
    other: p
  } : {
    same: p,
    other: d
  };
}
function Wb(e) {
  const t = e.maxPadding;
  function n(i) {
    const r = Math.max(t[i] - e[i], 0);
    return e[i] += r, r;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Vb(e, t) {
  const n = t.maxPadding;
  function i(r) {
    const o = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return r.forEach((l) => {
      o[l] = Math.max(t[l], n[l]);
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
function vr(e, t, n, i) {
  const r = [];
  let o, l, u, c, d, p;
  for (o = 0, l = e.length, d = 0; o < l; ++o) {
    u = e[o], c = u.box, c.update(u.width || t.w, u.height || t.h, Vb(u.horizontal, t));
    const { same: g, other: _ } = Hb(t, n, u, i);
    d |= g && r.length, p = p || _, c.fullSize || r.push(u);
  }
  return d && vr(r, t, n, i) || p;
}
function ea(e, t, n, i, r) {
  e.top = n, e.left = t, e.right = t + i, e.bottom = n + r, e.width = i, e.height = r;
}
function om(e, t, n, i) {
  const r = n.padding;
  let { x: o, y: l } = t;
  for (const u of e) {
    const c = u.box, d = i[u.stack] || {
      placed: 0,
      weight: 1
    }, p = u.stackWeight / d.weight || 1;
    if (u.horizontal) {
      const g = t.w * p, _ = d.size || c.height;
      Jr(d.start) && (l = d.start), c.fullSize ? ea(c, r.left, l, n.outerWidth - r.right - r.left, _) : ea(c, t.left + d.placed, l, g, _), d.start = l, d.placed += g, l = c.bottom;
    } else {
      const g = t.h * p, _ = d.size || c.width;
      Jr(d.start) && (o = d.start), c.fullSize ? ea(c, o, r.top, _, n.outerHeight - r.bottom - r.top) : ea(c, o, t.top + d.placed, _, g), d.start = o, d.placed += g, o = c.right;
    }
  }
  t.x = o, t.y = l;
}
var $n = {
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
    const r = Xe(e.options.layout.padding), o = Math.max(t - r.width, 0), l = Math.max(n - r.height, 0), u = Fb(e.boxes), c = u.vertical, d = u.horizontal;
    wt(e.boxes, (k) => {
      typeof k.beforeLayout == "function" && k.beforeLayout();
    });
    const p = c.reduce((k, C) => C.box.options && C.box.options.display === !1 ? k : k + 1, 0) || 1, g = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: r,
      availableWidth: o,
      availableHeight: l,
      vBoxMaxWidth: o / 2 / p,
      hBoxMaxHeight: l / 2
    }), _ = Object.assign({}, r);
    Vv(_, Xe(i));
    const x = Object.assign({
      maxPadding: _,
      w: o,
      h: l,
      x: r.left,
      y: r.top
    }, r), S = Bb(c.concat(d), g);
    vr(u.fullSize, x, g, S), vr(c, x, g, S), vr(d, x, g, S) && vr(c, x, g, S), Wb(x), om(u.leftAndTop, x, g, S), x.x += x.w, x.y += x.h, om(u.rightAndBottom, x, g, S), e.chartArea = {
      left: x.left,
      top: x.top,
      right: x.left + x.w,
      bottom: x.top + x.h,
      height: x.h,
      width: x.w
    }, wt(u.chartArea, (k) => {
      const C = k.box;
      Object.assign(C, e.chartArea), C.update(x.w, x.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Zv {
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
class Zb extends Zv {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const ba = "$chartjs", Ub = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, am = (e) => e === null || e === "";
function $b(e, t) {
  const n = e.style, i = e.getAttribute("height"), r = e.getAttribute("width");
  if (e[ba] = {
    initial: {
      height: i,
      width: r,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", am(r)) {
    const o = Zp(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (am(i))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = Zp(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const Uv = Kk ? {
  passive: !0
} : !1;
function Yb(e, t, n) {
  e && e.addEventListener(t, n, Uv);
}
function Kb(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, Uv);
}
function Gb(e, t) {
  const n = Ub[e.type] || e.type, { x: i, y: r } = Si(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: i !== void 0 ? i : null,
    y: r !== void 0 ? r : null
  };
}
function il(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function Xb(e, t, n) {
  const i = e.canvas, r = new MutationObserver((o) => {
    let l = !1;
    for (const u of o)
      l = l || il(u.addedNodes, i), l = l && !il(u.removedNodes, i);
    l && n();
  });
  return r.observe(document, {
    childList: !0,
    subtree: !0
  }), r;
}
function qb(e, t, n) {
  const i = e.canvas, r = new MutationObserver((o) => {
    let l = !1;
    for (const u of o)
      l = l || il(u.removedNodes, i), l = l && !il(u.addedNodes, i);
    l && n();
  });
  return r.observe(document, {
    childList: !0,
    subtree: !0
  }), r;
}
const io = /* @__PURE__ */ new Map();
let lm = 0;
function $v() {
  const e = window.devicePixelRatio;
  e !== lm && (lm = e, io.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function Qb(e, t) {
  io.size || window.addEventListener("resize", $v), io.set(e, t);
}
function Jb(e) {
  io.delete(e), io.size || window.removeEventListener("resize", $v);
}
function tS(e, t, n) {
  const i = e.canvas, r = i && rd(i);
  if (!r)
    return;
  const o = bv((u, c) => {
    const d = r.clientWidth;
    n(u, c), d < r.clientWidth && n();
  }, window), l = new ResizeObserver((u) => {
    const c = u[0], d = c.contentRect.width, p = c.contentRect.height;
    d === 0 && p === 0 || o(d, p);
  });
  return l.observe(r), Qb(e, o), l;
}
function Bu(e, t, n) {
  n && n.disconnect(), t === "resize" && Jb(e);
}
function eS(e, t, n) {
  const i = e.canvas, r = bv((o) => {
    e.ctx !== null && n(Gb(o, e));
  }, e);
  return Yb(i, t, r), r;
}
class nS extends Zv {
  acquireContext(t, n) {
    const i = t && t.getContext && t.getContext("2d");
    return i && i.canvas === t ? ($b(t, n), i) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[ba])
      return !1;
    const i = n[ba].initial;
    [
      "height",
      "width"
    ].forEach((o) => {
      const l = i[o];
      xt(l) ? n.removeAttribute(o) : n.setAttribute(o, l);
    });
    const r = i.style || {};
    return Object.keys(r).forEach((o) => {
      n.style[o] = r[o];
    }), n.width = n.width, delete n[ba], !0;
  }
  addEventListener(t, n, i) {
    this.removeEventListener(t, n);
    const r = t.$proxies || (t.$proxies = {}), l = {
      attach: Xb,
      detach: qb,
      resize: tS
    }[n] || eS;
    r[n] = l(t, n, i);
  }
  removeEventListener(t, n) {
    const i = t.$proxies || (t.$proxies = {}), r = i[n];
    if (!r)
      return;
    ({
      attach: Bu,
      detach: Bu,
      resize: Bu
    }[n] || Kb)(t, n, r), i[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, i, r) {
    return Yk(t, n, i, r);
  }
  isAttached(t) {
    const n = t && rd(t);
    return !!(n && n.isConnected);
  }
}
function iS(e) {
  return !sd() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Zb : nS;
}
var la;
let ci = (la = class {
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
    return to(this.x) && to(this.y);
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
}, Y(la, "defaults", {}), Y(la, "defaultRoutes"), la);
function sS(e, t) {
  const n = e.options.ticks, i = rS(e), r = Math.min(n.maxTicksLimit || i, i), o = n.major.enabled ? aS(t) : [], l = o.length, u = o[0], c = o[l - 1], d = [];
  if (l > r)
    return lS(t, d, o, l / r), d;
  const p = oS(o, t, r);
  if (l > 0) {
    let g, _;
    const x = l > 1 ? Math.round((c - u) / (l - 1)) : null;
    for (na(t, d, p, xt(x) ? 0 : u - x, u), g = 0, _ = l - 1; g < _; g++)
      na(t, d, p, o[g], o[g + 1]);
    return na(t, d, p, c, xt(x) ? t.length : c + x), d;
  }
  return na(t, d, p), d;
}
function rS(e) {
  const t = e.options.offset, n = e._tickSize(), i = e._length / n + (t ? 0 : 1), r = e._maxLength / n;
  return Math.floor(Math.min(i, r));
}
function oS(e, t, n) {
  const i = uS(e), r = t.length / n;
  if (!i)
    return Math.max(r, 1);
  const o = $w(i);
  for (let l = 0, u = o.length - 1; l < u; l++) {
    const c = o[l];
    if (c > r)
      return c;
  }
  return Math.max(r, 1);
}
function aS(e) {
  const t = [];
  let n, i;
  for (n = 0, i = e.length; n < i; n++)
    e[n].major && t.push(n);
  return t;
}
function lS(e, t, n, i) {
  let r = 0, o = n[0], l;
  for (i = Math.ceil(i), l = 0; l < e.length; l++)
    l === o && (t.push(e[l]), r++, o = n[r * i]);
}
function na(e, t, n, i, r) {
  const o = st(i, 0), l = Math.min(st(r, e.length), e.length);
  let u = 0, c, d, p;
  for (n = Math.ceil(n), r && (c = r - i, n = c / Math.floor(c / n)), p = o; p < 0; )
    u++, p = Math.round(o + u * n);
  for (d = Math.max(o, 0); d < l; d++)
    d === p && (t.push(e[d]), u++, p = Math.round(o + u * n));
}
function uS(e) {
  const t = e.length;
  let n, i;
  if (t < 2)
    return !1;
  for (i = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== i)
      return !1;
  return i;
}
const cS = (e) => e === "left" ? "right" : e === "right" ? "left" : e, um = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, cm = (e, t) => Math.min(t || e, e);
function hm(e, t) {
  const n = [], i = e.length / t, r = e.length;
  let o = 0;
  for (; o < r; o += i)
    n.push(e[Math.floor(o)]);
  return n;
}
function hS(e, t, n) {
  const i = e.ticks.length, r = Math.min(t, i - 1), o = e._startPixel, l = e._endPixel, u = 1e-6;
  let c = e.getPixelForTick(r), d;
  if (!(n && (i === 1 ? d = Math.max(c - o, l - c) : t === 0 ? d = (e.getPixelForTick(1) - c) / 2 : d = (c - e.getPixelForTick(r - 1)) / 2, c += r < t ? d : -d, c < o - u || c > l + u)))
    return c;
}
function dS(e, t) {
  wt(e, (n) => {
    const i = n.gc, r = i.length / 2;
    let o;
    if (r > t) {
      for (o = 0; o < r; ++o)
        delete n.data[i[o]];
      i.splice(0, r);
    }
  });
}
function cr(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function dm(e, t) {
  if (!e.display)
    return 0;
  const n = ve(e.font, t), i = Xe(e.padding);
  return (Ut(e.text) ? e.text.length : 1) * n.lineHeight + i.height;
}
function fS(e, t) {
  return Vi(e, {
    scale: t,
    type: "scale"
  });
}
function pS(e, t, n) {
  return Vi(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function mS(e, t, n) {
  let i = Sv(e);
  return (n && t !== "right" || !n && t === "right") && (i = cS(i)), i;
}
function gS(e, t, n, i) {
  const { top: r, left: o, bottom: l, right: u, chart: c } = e, { chartArea: d, scales: p } = c;
  let g = 0, _, x, S;
  const k = l - r, C = u - o;
  if (e.isHorizontal()) {
    if (x = ke(i, o, u), dt(n)) {
      const w = Object.keys(n)[0], b = n[w];
      S = p[w].getPixelForValue(b) + k - t;
    } else n === "center" ? S = (d.bottom + d.top) / 2 + k - t : S = um(e, n, t);
    _ = u - o;
  } else {
    if (dt(n)) {
      const w = Object.keys(n)[0], b = n[w];
      x = p[w].getPixelForValue(b) - C + t;
    } else n === "center" ? x = (d.left + d.right) / 2 - C + t : x = um(e, n, t);
    S = ke(i, l, r), g = n === "left" ? -Yt : Yt;
  }
  return {
    titleX: x,
    titleY: S,
    maxWidth: _,
    rotation: g
  };
}
class Is extends ci {
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
    return t = nn(t, Number.POSITIVE_INFINITY), n = nn(n, Number.NEGATIVE_INFINITY), i = nn(i, Number.POSITIVE_INFINITY), r = nn(r, Number.NEGATIVE_INFINITY), {
      min: nn(t, i),
      max: nn(n, r),
      minDefined: ae(t),
      maxDefined: ae(n)
    };
  }
  getMinMax(t) {
    let { min: n, max: i, minDefined: r, maxDefined: o } = this.getUserBounds(), l;
    if (r && o)
      return {
        min: n,
        max: i
      };
    const u = this.getMatchingVisibleMetas();
    for (let c = 0, d = u.length; c < d; ++c)
      l = u[c].controller.getMinMax(this, t), r || (n = Math.min(n, l.min)), o || (i = Math.max(i, l.max));
    return n = o && n > i ? i : n, i = r && n > i ? n : i, {
      min: nn(n, nn(i, n)),
      max: nn(i, nn(n, i))
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
    Lt(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, n, i) {
    const { beginAtZero: r, grace: o, ticks: l } = this.options, u = l.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = n, this._margins = i = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, i), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + i.left + i.right : this.height + i.top + i.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Pk(this, o, r), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const c = u < this.ticks.length;
    this._convertTicksToLabels(c ? hm(this.ticks, u) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), l.display && (l.autoSkip || l.source === "auto") && (this.ticks = sS(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, n, i;
    this.isHorizontal() ? (n = this.left, i = this.right) : (n = this.top, i = this.bottom, t = !t), this._startPixel = n, this._endPixel = i, this._reversePixels = t, this._length = i - n, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    Lt(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    Lt(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    Lt(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), Lt(this.options[t], [
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
    Lt(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const n = this.options.ticks;
    let i, r, o;
    for (i = 0, r = t.length; i < r; i++)
      o = t[i], o.label = Lt(n.callback, [
        o.value,
        i,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    Lt(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    Lt(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, n = t.ticks, i = cm(this.ticks.length, t.ticks.maxTicksLimit), r = n.minRotation || 0, o = n.maxRotation;
    let l = r, u, c, d;
    if (!this._isVisible() || !n.display || r >= o || i <= 1 || !this.isHorizontal()) {
      this.labelRotation = r;
      return;
    }
    const p = this._getLabelSizes(), g = p.widest.width, _ = p.highest.height, x = re(this.chart.width - g, 0, this.maxWidth);
    u = t.offset ? this.maxWidth / i : x / (i - 1), g + 6 > u && (u = x / (i - (t.offset ? 0.5 : 1)), c = this.maxHeight - cr(t.grid) - n.padding - dm(t.title, this.chart.options.font), d = Math.sqrt(g * g + _ * _), l = Xw(Math.min(Math.asin(re((p.highest.height + 6) / u, -1, 1)), Math.asin(re(c / d, -1, 1)) - Math.asin(re(_ / d, -1, 1)))), l = Math.max(r, Math.min(o, l))), this.labelRotation = l;
  }
  afterCalculateLabelRotation() {
    Lt(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    Lt(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: n, options: { ticks: i, title: r, grid: o } } = this, l = this._isVisible(), u = this.isHorizontal();
    if (l) {
      const c = dm(r, n.options.font);
      if (u ? (t.width = this.maxWidth, t.height = cr(o) + c) : (t.height = this.maxHeight, t.width = cr(o) + c), i.display && this.ticks.length) {
        const { first: d, last: p, widest: g, highest: _ } = this._getLabelSizes(), x = i.padding * 2, S = Mn(this.labelRotation), k = Math.cos(S), C = Math.sin(S);
        if (u) {
          const w = i.mirror ? 0 : C * g.width + k * _.height;
          t.height = Math.min(this.maxHeight, t.height + w + x);
        } else {
          const w = i.mirror ? 0 : k * g.width + C * _.height;
          t.width = Math.min(this.maxWidth, t.width + w + x);
        }
        this._calculatePadding(d, p, C, k);
      }
    }
    this._handleMargins(), u ? (this.width = this._length = n.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = n.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, n, i, r) {
    const { ticks: { align: o, padding: l }, position: u } = this.options, c = this.labelRotation !== 0, d = u !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const p = this.getPixelForTick(0) - this.left, g = this.right - this.getPixelForTick(this.ticks.length - 1);
      let _ = 0, x = 0;
      c ? d ? (_ = r * t.width, x = i * n.height) : (_ = i * t.height, x = r * n.width) : o === "start" ? x = n.width : o === "end" ? _ = t.width : o !== "inner" && (_ = t.width / 2, x = n.width / 2), this.paddingLeft = Math.max((_ - p + l) * this.width / (this.width - p), 0), this.paddingRight = Math.max((x - g + l) * this.width / (this.width - g), 0);
    } else {
      let p = n.height / 2, g = t.height / 2;
      o === "start" ? (p = 0, g = t.height) : o === "end" && (p = n.height, g = 0), this.paddingTop = p + l, this.paddingBottom = g + l;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    Lt(this.options.afterFit, [
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
      xt(t[n].label) && (t.splice(n, 1), i--, n--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const n = this.options.ticks.sampleSize;
      let i = this.ticks;
      n < i.length && (i = hm(i, n)), this._labelSizes = t = this._computeLabelSizes(i, i.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, i) {
    const { ctx: r, _longestTextCache: o } = this, l = [], u = [], c = Math.floor(n / cm(n, i));
    let d = 0, p = 0, g, _, x, S, k, C, w, b, P, T, E;
    for (g = 0; g < n; g += c) {
      if (S = t[g].label, k = this._resolveTickFontOptions(g), r.font = C = k.string, w = o[C] = o[C] || {
        data: {},
        gc: []
      }, b = k.lineHeight, P = T = 0, !xt(S) && !Ut(S))
        P = Bp(r, w.data, w.gc, P, S), T = b;
      else if (Ut(S))
        for (_ = 0, x = S.length; _ < x; ++_)
          E = S[_], !xt(E) && !Ut(E) && (P = Bp(r, w.data, w.gc, P, E), T += b);
      l.push(P), u.push(T), d = Math.max(P, d), p = Math.max(T, p);
    }
    dS(o, n);
    const N = l.indexOf(d), D = u.indexOf(p), A = (H) => ({
      width: l[H] || 0,
      height: u[H] || 0
    });
    return {
      first: A(0),
      last: A(n - 1),
      widest: A(N),
      highest: A(D),
      widths: l,
      heights: u
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
    return Qw(this._alignToPixels ? yi(this.chart, n, 0) : n);
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
      return i.$context || (i.$context = pS(this.getContext(), t, i));
    }
    return this.$context || (this.$context = fS(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = Mn(this.labelRotation), i = Math.abs(Math.cos(n)), r = Math.abs(Math.sin(n)), o = this._getLabelSizes(), l = t.autoSkipPadding || 0, u = o ? o.widest.width + l : 0, c = o ? o.highest.height + l : 0;
    return this.isHorizontal() ? c * i > u * r ? u / i : c / r : c * r < u * i ? c / i : u / r;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, i = this.chart, r = this.options, { grid: o, position: l, border: u } = r, c = o.offset, d = this.isHorizontal(), g = this.ticks.length + (c ? 1 : 0), _ = cr(o), x = [], S = u.setContext(this.getContext()), k = S.display ? S.width : 0, C = k / 2, w = function(J) {
      return yi(i, J, k);
    };
    let b, P, T, E, N, D, A, H, j, V, U, vt;
    if (l === "top")
      b = w(this.bottom), D = this.bottom - _, H = b - C, V = w(t.top) + C, vt = t.bottom;
    else if (l === "bottom")
      b = w(this.top), V = t.top, vt = w(t.bottom) - C, D = b + C, H = this.top + _;
    else if (l === "left")
      b = w(this.right), N = this.right - _, A = b - C, j = w(t.left) + C, U = t.right;
    else if (l === "right")
      b = w(this.left), j = t.left, U = w(t.right) - C, N = b + C, A = this.left + _;
    else if (n === "x") {
      if (l === "center")
        b = w((t.top + t.bottom) / 2 + 0.5);
      else if (dt(l)) {
        const J = Object.keys(l)[0], ut = l[J];
        b = w(this.chart.scales[J].getPixelForValue(ut));
      }
      V = t.top, vt = t.bottom, D = b + C, H = D + _;
    } else if (n === "y") {
      if (l === "center")
        b = w((t.left + t.right) / 2);
      else if (dt(l)) {
        const J = Object.keys(l)[0], ut = l[J];
        b = w(this.chart.scales[J].getPixelForValue(ut));
      }
      N = b - C, A = N - _, j = t.left, U = t.right;
    }
    const rt = st(r.ticks.maxTicksLimit, g), lt = Math.max(1, Math.ceil(g / rt));
    for (P = 0; P < g; P += lt) {
      const J = this.getContext(P), ut = o.setContext(J), I = u.setContext(J), $ = ut.lineWidth, B = ut.color, X = I.dash || [], tt = I.dashOffset, bt = ut.tickWidth, ot = ut.tickColor, nt = ut.tickBorderDash || [], q = ut.tickBorderDashOffset;
      T = hS(this, P, c), T !== void 0 && (E = yi(i, T, $), d ? N = A = j = U = E : D = H = V = vt = E, x.push({
        tx1: N,
        ty1: D,
        tx2: A,
        ty2: H,
        x1: j,
        y1: V,
        x2: U,
        y2: vt,
        width: $,
        color: B,
        borderDash: X,
        borderDashOffset: tt,
        tickWidth: bt,
        tickColor: ot,
        tickBorderDash: nt,
        tickBorderDashOffset: q
      }));
    }
    return this._ticksLength = g, this._borderValue = b, x;
  }
  _computeLabelItems(t) {
    const n = this.axis, i = this.options, { position: r, ticks: o } = i, l = this.isHorizontal(), u = this.ticks, { align: c, crossAlign: d, padding: p, mirror: g } = o, _ = cr(i.grid), x = _ + p, S = g ? -p : x, k = -Mn(this.labelRotation), C = [];
    let w, b, P, T, E, N, D, A, H, j, V, U, vt = "middle";
    if (r === "top")
      N = this.bottom - S, D = this._getXAxisLabelAlignment();
    else if (r === "bottom")
      N = this.top + S, D = this._getXAxisLabelAlignment();
    else if (r === "left") {
      const lt = this._getYAxisLabelAlignment(_);
      D = lt.textAlign, E = lt.x;
    } else if (r === "right") {
      const lt = this._getYAxisLabelAlignment(_);
      D = lt.textAlign, E = lt.x;
    } else if (n === "x") {
      if (r === "center")
        N = (t.top + t.bottom) / 2 + x;
      else if (dt(r)) {
        const lt = Object.keys(r)[0], J = r[lt];
        N = this.chart.scales[lt].getPixelForValue(J) + x;
      }
      D = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (r === "center")
        E = (t.left + t.right) / 2 - x;
      else if (dt(r)) {
        const lt = Object.keys(r)[0], J = r[lt];
        E = this.chart.scales[lt].getPixelForValue(J);
      }
      D = this._getYAxisLabelAlignment(_).textAlign;
    }
    n === "y" && (c === "start" ? vt = "top" : c === "end" && (vt = "bottom"));
    const rt = this._getLabelSizes();
    for (w = 0, b = u.length; w < b; ++w) {
      P = u[w], T = P.label;
      const lt = o.setContext(this.getContext(w));
      A = this.getPixelForTick(w) + o.labelOffset, H = this._resolveTickFontOptions(w), j = H.lineHeight, V = Ut(T) ? T.length : 1;
      const J = V / 2, ut = lt.color, I = lt.textStrokeColor, $ = lt.textStrokeWidth;
      let B = D;
      l ? (E = A, D === "inner" && (w === b - 1 ? B = this.options.reverse ? "left" : "right" : w === 0 ? B = this.options.reverse ? "right" : "left" : B = "center"), r === "top" ? d === "near" || k !== 0 ? U = -V * j + j / 2 : d === "center" ? U = -rt.highest.height / 2 - J * j + j : U = -rt.highest.height + j / 2 : d === "near" || k !== 0 ? U = j / 2 : d === "center" ? U = rt.highest.height / 2 - J * j : U = rt.highest.height - V * j, g && (U *= -1), k !== 0 && !lt.showLabelBackdrop && (E += j / 2 * Math.sin(k))) : (N = A, U = (1 - V) * j / 2);
      let X;
      if (lt.showLabelBackdrop) {
        const tt = Xe(lt.backdropPadding), bt = rt.heights[w], ot = rt.widths[w];
        let nt = U - tt.top, q = 0 - tt.left;
        switch (vt) {
          case "middle":
            nt -= bt / 2;
            break;
          case "bottom":
            nt -= bt;
            break;
        }
        switch (D) {
          case "center":
            q -= ot / 2;
            break;
          case "right":
            q -= ot;
            break;
          case "inner":
            w === b - 1 ? q -= ot : w > 0 && (q -= ot / 2);
            break;
        }
        X = {
          left: q,
          top: nt,
          width: ot + tt.width,
          height: bt + tt.height,
          color: lt.backdropColor
        };
      }
      C.push({
        label: T,
        font: H,
        textOffset: U,
        options: {
          rotation: k,
          color: ut,
          strokeColor: I,
          strokeWidth: $,
          textAlign: B,
          textBaseline: vt,
          translation: [
            E,
            N
          ],
          backdrop: X
        }
      });
    }
    return C;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: n } = this.options;
    if (-Mn(this.labelRotation))
      return t === "top" ? "left" : "right";
    let r = "center";
    return n.align === "start" ? r = "left" : n.align === "end" ? r = "right" : n.align === "inner" && (r = "inner"), r;
  }
  _getYAxisLabelAlignment(t) {
    const { position: n, ticks: { crossAlign: i, mirror: r, padding: o } } = this.options, l = this._getLabelSizes(), u = t + o, c = l.widest.width;
    let d, p;
    return n === "left" ? r ? (p = this.right + o, i === "near" ? d = "left" : i === "center" ? (d = "center", p += c / 2) : (d = "right", p += c)) : (p = this.right - u, i === "near" ? d = "right" : i === "center" ? (d = "center", p -= c / 2) : (d = "left", p = this.left)) : n === "right" ? r ? (p = this.left + o, i === "near" ? d = "right" : i === "center" ? (d = "center", p -= c / 2) : (d = "left", p -= c)) : (p = this.left + u, i === "near" ? d = "left" : i === "center" ? (d = "center", p += c / 2) : (d = "right", p = this.right)) : d = "right", {
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
    const { ctx: t, options: { backgroundColor: n }, left: i, top: r, width: o, height: l } = this;
    n && (t.save(), t.fillStyle = n, t.fillRect(i, r, o, l), t.restore());
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
    let o, l;
    const u = (c, d, p) => {
      !p.width || !p.color || (i.save(), i.lineWidth = p.width, i.strokeStyle = p.color, i.setLineDash(p.borderDash || []), i.lineDashOffset = p.borderDashOffset, i.beginPath(), i.moveTo(c.x, c.y), i.lineTo(d.x, d.y), i.stroke(), i.restore());
    };
    if (n.display)
      for (o = 0, l = r.length; o < l; ++o) {
        const c = r[o];
        n.drawOnChartArea && u({
          x: c.x1,
          y: c.y1
        }, {
          x: c.x2,
          y: c.y2
        }, c), n.drawTicks && u({
          x: c.tx1,
          y: c.ty1
        }, {
          x: c.tx2,
          y: c.ty2
        }, {
          color: c.tickColor,
          width: c.tickWidth,
          borderDash: c.tickBorderDash,
          borderDashOffset: c.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: n, options: { border: i, grid: r } } = this, o = i.setContext(this.getContext()), l = i.display ? o.width : 0;
    if (!l)
      return;
    const u = r.setContext(this.getContext(0)).lineWidth, c = this._borderValue;
    let d, p, g, _;
    this.isHorizontal() ? (d = yi(t, this.left, l) - l / 2, p = yi(t, this.right, u) + u / 2, g = _ = c) : (g = yi(t, this.top, l) - l / 2, _ = yi(t, this.bottom, u) + u / 2, d = p = c), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(d, g), n.lineTo(p, _), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const i = this.ctx, r = this._computeLabelArea();
    r && kl(i, r);
    const o = this.getLabelItems(t);
    for (const l of o) {
      const u = l.options, c = l.font, d = l.label, p = l.textOffset;
      tl(i, d, 0, p, c, u);
    }
    r && bl(i);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: i, reverse: r } } = this;
    if (!i.display)
      return;
    const o = ve(i.font), l = Xe(i.padding), u = i.align;
    let c = o.lineHeight / 2;
    n === "bottom" || n === "center" || dt(n) ? (c += l.bottom, Ut(i.text) && (c += o.lineHeight * (i.text.length - 1))) : c += l.top;
    const { titleX: d, titleY: p, maxWidth: g, rotation: _ } = gS(this, c, n, u);
    tl(t, i.text, 0, 0, o, {
      color: i.color,
      maxWidth: g,
      rotation: _,
      textAlign: mS(u, n, r),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, i = st(t.grid && t.grid.z, -1), r = st(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Is.prototype.draw ? [
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
    let o, l;
    for (o = 0, l = n.length; o < l; ++o) {
      const u = n[o];
      u[i] === this.id && (!t || u.type === t) && r.push(u);
    }
    return r;
  }
  _resolveTickFontOptions(t) {
    const n = this.options.ticks.setContext(this.getContext(t));
    return ve(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class ia {
  constructor(t, n, i) {
    this.type = t, this.scope = n, this.override = i, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let i;
    yS(n) && (i = this.register(n));
    const r = this.items, o = t.id, l = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in r || (r[o] = t, _S(t, l, i), this.override && Ft.override(t.id, t.overrides)), l;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, i = t.id, r = this.scope;
    i in n && delete n[i], r && i in Ft[r] && (delete Ft[r][i], this.override && delete Fi[i]);
  }
}
function _S(e, t, n) {
  const i = Qr(/* @__PURE__ */ Object.create(null), [
    n ? Ft.get(n) : {},
    Ft.get(t),
    e.defaults
  ]);
  Ft.set(t, i), e.defaultRoutes && vS(t, e.defaultRoutes), e.descriptors && Ft.describe(t, e.descriptors);
}
function vS(e, t) {
  Object.keys(t).forEach((n) => {
    const i = n.split("."), r = i.pop(), o = [
      e
    ].concat(i).join("."), l = t[n].split("."), u = l.pop(), c = l.join(".");
    Ft.route(o, r, c, u);
  });
}
function yS(e) {
  return "id" in e && "defaults" in e;
}
class xS {
  constructor() {
    this.controllers = new ia(Ni, "datasets", !0), this.elements = new ia(ci, "elements"), this.plugins = new ia(Object, "plugins"), this.scales = new ia(Is, "scales"), this._typedRegistries = [
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
      i || o.isForType(r) || o === this.plugins && r.id ? this._exec(t, o, r) : wt(r, (l) => {
        const u = i || this._getRegistryForType(l);
        this._exec(t, u, l);
      });
    });
  }
  _exec(t, n, i) {
    const r = Xh(t);
    Lt(i["before" + r], [], i), n[t](i), Lt(i["after" + r], [], i);
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
var on = /* @__PURE__ */ new xS();
class wS {
  constructor() {
    this._init = void 0;
  }
  notify(t, n, i, r) {
    if (n === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")), this._init === void 0)
      return;
    const o = r ? this._descriptors(t).filter(r) : this._descriptors(t), l = this._notify(o, t, n, i);
    return n === "afterDestroy" && (this._notify(o, t, "stop"), this._notify(this._init, t, "uninstall"), this._init = void 0), l;
  }
  _notify(t, n, i, r) {
    r = r || {};
    for (const o of t) {
      const l = o.plugin, u = l[i], c = [
        n,
        r,
        o.options
      ];
      if (Lt(u, c, l) === !1 && r.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    xt(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const n = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), n;
  }
  _createDescriptors(t, n) {
    const i = t && t.config, r = st(i.options && i.options.plugins, {}), o = kS(i);
    return r === !1 && !n ? [] : SS(t, o, r, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], i = this._cache, r = (o, l) => o.filter((u) => !l.some((c) => u.plugin.id === c.plugin.id));
    this._notify(r(n, i), t, "stop"), this._notify(r(i, n), t, "start");
  }
}
function kS(e) {
  const t = {}, n = [], i = Object.keys(on.plugins.items);
  for (let o = 0; o < i.length; o++)
    n.push(on.getPlugin(i[o]));
  const r = e.plugins || [];
  for (let o = 0; o < r.length; o++) {
    const l = r[o];
    n.indexOf(l) === -1 && (n.push(l), t[l.id] = !0);
  }
  return {
    plugins: n,
    localIds: t
  };
}
function bS(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function SS(e, { plugins: t, localIds: n }, i, r) {
  const o = [], l = e.getContext();
  for (const u of t) {
    const c = u.id, d = bS(i[c], r);
    d !== null && o.push({
      plugin: u,
      options: PS(e.config, {
        plugin: u,
        local: n[c]
      }, d, l)
    });
  }
  return o;
}
function PS(e, { plugin: t, local: n }, i, r) {
  const o = e.pluginScopeKeys(t), l = e.getOptionScopes(i, o);
  return n && t.defaults && l.push(t.defaults), e.createResolver(l, r, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Vc(e, t) {
  const n = Ft.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function MS(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function CS(e, t) {
  return e === t ? "_index_" : "_value_";
}
function fm(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function LS(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Zc(e, ...t) {
  if (fm(e))
    return e;
  for (const n of t) {
    const i = n.axis || LS(n.position) || e.length > 1 && fm(e[0].toLowerCase());
    if (i)
      return i;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function pm(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function TS(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((i) => i.xAxisID === e || i.yAxisID === e);
    if (n.length)
      return pm(e, "x", n[0]) || pm(e, "y", n[0]);
  }
  return {};
}
function ES(e, t) {
  const n = Fi[e.type] || {
    scales: {}
  }, i = t.scales || {}, r = Vc(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(i).forEach((l) => {
    const u = i[l];
    if (!dt(u))
      return console.error(`Invalid scale configuration for scale: ${l}`);
    if (u._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${l}`);
    const c = Zc(l, u, TS(l, e), Ft.scales[u.type]), d = CS(c, r), p = n.scales || {};
    o[l] = Er(/* @__PURE__ */ Object.create(null), [
      {
        axis: c
      },
      u,
      p[c],
      p[d]
    ]);
  }), e.data.datasets.forEach((l) => {
    const u = l.type || e.type, c = l.indexAxis || Vc(u, t), p = (Fi[u] || {}).scales || {};
    Object.keys(p).forEach((g) => {
      const _ = MS(g, c), x = l[_ + "AxisID"] || _;
      o[x] = o[x] || /* @__PURE__ */ Object.create(null), Er(o[x], [
        {
          axis: _
        },
        i[x],
        p[g]
      ]);
    });
  }), Object.keys(o).forEach((l) => {
    const u = o[l];
    Er(u, [
      Ft.scales[u.type],
      Ft.scale
    ]);
  }), o;
}
function Yv(e) {
  const t = e.options || (e.options = {});
  t.plugins = st(t.plugins, {}), t.scales = ES(e, t);
}
function Kv(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function zS(e) {
  return e = e || {}, e.data = Kv(e.data), Yv(e), e;
}
const mm = /* @__PURE__ */ new Map(), Gv = /* @__PURE__ */ new Set();
function sa(e, t) {
  let n = mm.get(e);
  return n || (n = t(), mm.set(e, n), Gv.add(n)), n;
}
const hr = (e, t, n) => {
  const i = Bi(t, n);
  i !== void 0 && e.add(i);
};
class OS {
  constructor(t) {
    this._config = zS(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = Kv(t);
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
    this.clearCache(), Yv(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return sa(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return sa(`${t}.transition.${n}`, () => [
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
    return sa(`${t}-${n}`, () => [
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
    return sa(`${i}-plugin-${n}`, () => [
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
    const { options: r, type: o } = this, l = this._cachedScopes(t, i), u = l.get(n);
    if (u)
      return u;
    const c = /* @__PURE__ */ new Set();
    n.forEach((p) => {
      t && (c.add(t), p.forEach((g) => hr(c, t, g))), p.forEach((g) => hr(c, r, g)), p.forEach((g) => hr(c, Fi[o] || {}, g)), p.forEach((g) => hr(c, Ft, g)), p.forEach((g) => hr(c, Hc, g));
    });
    const d = Array.from(c);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), Gv.has(n) && l.set(n, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      Fi[n] || {},
      Ft.datasets[n] || {},
      {
        type: n
      },
      Ft,
      Hc
    ];
  }
  resolveNamedOptions(t, n, i, r = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: l, subPrefixes: u } = gm(this._resolverCache, t, r);
    let c = l;
    if (AS(l, n)) {
      o.$shared = !1, i = oi(i) ? i() : i;
      const d = this.createResolver(t, i, u);
      c = Es(l, i, d);
    }
    for (const d of n)
      o[d] = c[d];
    return o;
  }
  createResolver(t, n, i = [
    ""
  ], r) {
    const { resolver: o } = gm(this._resolverCache, t, i);
    return dt(n) ? Es(o, n, void 0, r) : o;
  }
}
function gm(e, t, n) {
  let i = e.get(t);
  i || (i = /* @__PURE__ */ new Map(), e.set(t, i));
  const r = n.join();
  let o = i.get(r);
  return o || (o = {
    resolver: ed(t, n),
    subPrefixes: n.filter((u) => !u.toLowerCase().includes("hover"))
  }, i.set(r, o)), o;
}
const NS = (e) => dt(e) && Object.getOwnPropertyNames(e).some((t) => oi(e[t]));
function AS(e, t) {
  const { isScriptable: n, isIndexable: i } = Lv(e);
  for (const r of t) {
    const o = n(r), l = i(r), u = (l || o) && e[r];
    if (o && (oi(u) || NS(u)) || l && Ut(u))
      return !0;
  }
  return !1;
}
var IS = "4.5.1";
const DS = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function _m(e, t) {
  return e === "top" || e === "bottom" || DS.indexOf(e) === -1 && t === "x";
}
function vm(e, t) {
  return function(n, i) {
    return n[e] === i[e] ? n[t] - i[t] : n[e] - i[e];
  };
}
function ym(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Lt(n && n.onComplete, [
    e
  ], t);
}
function RS(e) {
  const t = e.chart, n = t.options.animation;
  Lt(n && n.onProgress, [
    e
  ], t);
}
function Xv(e) {
  return sd() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Sa = {}, xm = (e) => {
  const t = Xv(e);
  return Object.values(Sa).filter((n) => n.canvas === t).pop();
};
function jS(e, t, n) {
  const i = Object.keys(e);
  for (const r of i) {
    const o = +r;
    if (o >= t) {
      const l = e[r];
      delete e[r], (n > 0 || o > t) && (e[o + n] = l);
    }
  }
}
function BS(e, t, n, i) {
  return !n || e.type === "mouseout" ? null : i ? t : e;
}
var Rn;
let Ml = (Rn = class {
  static register(...t) {
    on.add(...t), wm();
  }
  static unregister(...t) {
    on.remove(...t), wm();
  }
  constructor(t, n) {
    const i = this.config = new OS(n), r = Xv(t), o = xm(r);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const l = i.createResolver(i.chartOptionScopes(), this.getContext());
    this.platform = new (i.platform || iS(r))(), this.platform.updateConfig(i);
    const u = this.platform.acquireContext(r, l.aspectRatio), c = u && u.canvas, d = c && c.height, p = c && c.width;
    if (this.id = Rw(), this.ctx = u, this.canvas = c, this.width = p, this.height = d, this._options = l, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new wS(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = nk((g) => this.update(g), l.resizeDelay || 0), this._dataChanges = [], Sa[this.id] = this, !u || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    yn.listen(this, "complete", ym), yn.listen(this, "progress", RS), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: n }, width: i, height: r, _aspectRatio: o } = this;
    return xt(t) ? n && o ? o : r ? i / r : null : t;
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
    return on;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Vp(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Fp(this.canvas, this.ctx), this;
  }
  stop() {
    return yn.stop(this), this;
  }
  resize(t, n) {
    yn.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const i = this.options, r = this.canvas, o = i.maintainAspectRatio && this.aspectRatio, l = this.platform.getMaximumSize(r, t, n, o), u = i.devicePixelRatio || this.platform.getDevicePixelRatio(), c = this.width ? "resize" : "attach";
    this.width = l.width, this.height = l.height, this._aspectRatio = this.aspectRatio, Vp(this, u, !0) && (this.notifyPlugins("resize", {
      size: l
    }), Lt(i.onResize, [
      this,
      l
    ], this), this.attached && this._doResize(c) && this.render());
  }
  ensureScalesHaveIDs() {
    const n = this.options.scales || {};
    wt(n, (i, r) => {
      i.id = r;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, n = t.scales, i = this.scales, r = Object.keys(i).reduce((l, u) => (l[u] = !1, l), {});
    let o = [];
    n && (o = o.concat(Object.keys(n).map((l) => {
      const u = n[l], c = Zc(l, u), d = c === "r", p = c === "x";
      return {
        options: u,
        dposition: d ? "chartArea" : p ? "bottom" : "left",
        dtype: d ? "radialLinear" : p ? "category" : "linear"
      };
    }))), wt(o, (l) => {
      const u = l.options, c = u.id, d = Zc(c, u), p = st(u.type, l.dtype);
      (u.position === void 0 || _m(u.position, d) !== _m(l.dposition)) && (u.position = l.dposition), r[c] = !0;
      let g = null;
      if (c in i && i[c].type === p)
        g = i[c];
      else {
        const _ = on.getScale(p);
        g = new _({
          id: c,
          type: p,
          ctx: this.ctx,
          chart: this
        }), i[g.id] = g;
      }
      g.init(u, t);
    }), wt(r, (l, u) => {
      l || delete i[u];
    }), wt(i, (l) => {
      $n.configure(this, l, l.options), $n.addBox(this, l);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, i = t.length;
    if (t.sort((r, o) => r.index - o.index), i > n) {
      for (let r = n; r < i; ++r)
        this._destroyDatasetMeta(r);
      t.splice(n, i - n);
    }
    this._sortedMetasets = t.slice(0).sort(vm("order", "index"));
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
      let l = this.getDatasetMeta(i);
      const u = o.type || this.config.type;
      if (l.type && l.type !== u && (this._destroyDatasetMeta(i), l = this.getDatasetMeta(i)), l.type = u, l.indexAxis = o.indexAxis || Vc(u, this.options), l.order = o.order || 0, l.index = i, l.label = "" + o.label, l.visible = this.isDatasetVisible(i), l.controller)
        l.controller.updateIndex(i), l.controller.linkScales();
      else {
        const c = on.getController(u), { datasetElementType: d, dataElementType: p } = Ft.datasets[u];
        Object.assign(c, {
          dataElementType: on.getElement(p),
          datasetElementType: d && on.getElement(d)
        }), l.controller = new c(this, i), t.push(l.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    wt(this.data.datasets, (t, n) => {
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
    let l = 0;
    for (let d = 0, p = this.data.datasets.length; d < p; d++) {
      const { controller: g } = this.getDatasetMeta(d), _ = !r && o.indexOf(g) === -1;
      g.buildOrUpdateElements(_), l = Math.max(+g.getMaxOverflow(), l);
    }
    l = this._minPadding = i.layout.autoPadding ? l : 0, this._updateLayout(l), r || wt(o, (d) => {
      d.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(vm("z", "_idx"));
    const { _active: u, _lastEvent: c } = this;
    c ? this._eventHandler(c, !0) : u.length && this._updateHoverStyles(u, u, !0), this.render();
  }
  _updateScales() {
    wt(this.scales, (t) => {
      $n.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), i = new Set(t.events);
    (!Ep(n, i) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: i, start: r, count: o } of n) {
      const l = i === "_removeElements" ? -o : o;
      jS(t, r, l);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, i = (o) => new Set(t.filter((l) => l[0] === o).map((l, u) => u + "," + l.splice(1).join(","))), r = i(0);
    for (let o = 1; o < n; o++)
      if (!Ep(r, i(o)))
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
    $n.update(this, this.width, this.height, t);
    const n = this.chartArea, i = n.width <= 0 || n.height <= 0;
    this._layers = [], wt(this.boxes, (r) => {
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
        this._updateDataset(n, oi(t) ? t({
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
    }) !== !1 && (yn.has(this) ? this.attached && !yn.running(this) && yn.start(this) : (this.draw(), ym({
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
      const l = n[r];
      (!t || l.visible) && i.push(l);
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
    }, r = jv(this, t);
    this.notifyPlugins("beforeDatasetDraw", i) !== !1 && (r && kl(n, r), t.controller.draw(), r && bl(n), i.cancelable = !1, this.notifyPlugins("afterDatasetDraw", i));
  }
  isPointInArea(t) {
    return no(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, i, r) {
    const o = Db.modes[n];
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
    return this.$context || (this.$context = Vi(null, {
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
    const r = i ? "show" : "hide", o = this.getDatasetMeta(t), l = o.controller._resolveAnimations(void 0, r);
    Jr(n) ? (o.data[n].hidden = !i, this.update()) : (this.setDatasetVisibility(t, i), l.update(o, {
      visible: i
    }), this.update((u) => u.datasetIndex === t ? r : void 0));
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
    for (this.stop(), yn.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Fp(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete Sa[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, n = this.platform, i = (o, l) => {
      n.addEventListener(this, o, l), t[o] = l;
    }, r = (o, l, u) => {
      o.offsetX = l, o.offsetY = u, this._eventHandler(o);
    };
    wt(this.options.events, (o) => i(o, r));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, n = this.platform, i = (c, d) => {
      n.addEventListener(this, c, d), t[c] = d;
    }, r = (c, d) => {
      t[c] && (n.removeEventListener(this, c, d), delete t[c]);
    }, o = (c, d) => {
      this.canvas && this.resize(c, d);
    };
    let l;
    const u = () => {
      r("attach", u), this.attached = !0, this.resize(), i("resize", o), i("detach", l);
    };
    l = () => {
      this.attached = !1, r("resize", o), this._stop(), this._resize(0, 0), i("attach", u);
    }, n.isAttached(this.canvas) ? u() : l();
  }
  unbindEvents() {
    wt(this._listeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._listeners = {}, wt(this._responsiveListeners, (t, n) => {
      this.platform.removeEventListener(this, n, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, n, i) {
    const r = i ? "set" : "remove";
    let o, l, u, c;
    for (n === "dataset" && (o = this.getDatasetMeta(t[0].datasetIndex), o.controller["_" + r + "DatasetHoverStyle"]()), u = 0, c = t.length; u < c; ++u) {
      l = t[u];
      const d = l && this.getDatasetMeta(l.datasetIndex).controller;
      d && d[r + "HoverStyle"](l.element, l.datasetIndex, l.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const n = this._active || [], i = t.map(({ datasetIndex: o, index: l }) => {
      const u = this.getDatasetMeta(o);
      if (!u)
        throw new Error("No dataset found at index " + o);
      return {
        datasetIndex: o,
        element: u.data[l],
        index: l
      };
    });
    !qa(i, n) && (this._active = i, this._lastEvent = null, this._updateHoverStyles(i, n));
  }
  notifyPlugins(t, n, i) {
    return this._plugins.notify(this, t, n, i);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((n) => n.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, n, i) {
    const r = this.options.hover, o = (c, d) => c.filter((p) => !d.some((g) => p.datasetIndex === g.datasetIndex && p.index === g.index)), l = o(n, t), u = i ? t : o(t, n);
    l.length && this.updateHoverStyle(l, r.mode, !1), u.length && r.mode && this.updateHoverStyle(u, r.mode, !0);
  }
  _eventHandler(t, n) {
    const i = {
      event: t,
      replay: n,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, r = (l) => (l.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", i, r) === !1)
      return;
    const o = this._handleEvent(t, n, i.inChartArea);
    return i.cancelable = !1, this.notifyPlugins("afterEvent", i, r), (o || i.changed) && this.render(), this;
  }
  _handleEvent(t, n, i) {
    const { _active: r = [], options: o } = this, l = n, u = this._getActiveElements(t, r, i, l), c = Vw(t), d = BS(t, this._lastEvent, i, c);
    i && (this._lastEvent = null, Lt(o.onHover, [
      t,
      u,
      this
    ], this), c && Lt(o.onClick, [
      t,
      u,
      this
    ], this));
    const p = !qa(u, r);
    return (p || n) && (this._active = u, this._updateHoverStyles(u, r, n)), this._lastEvent = d, p;
  }
  _getActiveElements(t, n, i, r) {
    if (t.type === "mouseout")
      return [];
    if (!i)
      return n;
    const o = this.options.hover;
    return this.getElementsAtEventForMode(t, o.mode, o, r);
  }
}, Y(Rn, "defaults", Ft), Y(Rn, "instances", Sa), Y(Rn, "overrides", Fi), Y(Rn, "registry", on), Y(Rn, "version", IS), Y(Rn, "getChart", xm), Rn);
function wm() {
  return wt(Ml.instances, (e) => e._plugins.invalidate());
}
function FS(e, t, n) {
  const { startAngle: i, x: r, y: o, outerRadius: l, innerRadius: u, options: c } = t, { borderWidth: d, borderJoinStyle: p } = c, g = Math.min(d / l, Se(i - n));
  if (e.beginPath(), e.arc(r, o, l - d / 2, i + g / 2, n - g / 2), u > 0) {
    const _ = Math.min(d / u, Se(i - n));
    e.arc(r, o, u + d / 2, n - _ / 2, i + _ / 2, !0);
  } else {
    const _ = Math.min(d / 2, l * Se(i - n));
    if (p === "round")
      e.arc(r, o, _, n - St / 2, i + St / 2, !0);
    else if (p === "bevel") {
      const x = 2 * _ * _, S = -x * Math.cos(n + St / 2) + r, k = -x * Math.sin(n + St / 2) + o, C = x * Math.cos(i + St / 2) + r, w = x * Math.sin(i + St / 2) + o;
      e.lineTo(S, k), e.lineTo(C, w);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function HS(e, t, n) {
  const { startAngle: i, pixelMargin: r, x: o, y: l, outerRadius: u, innerRadius: c } = t;
  let d = r / u;
  e.beginPath(), e.arc(o, l, u, i - d, n + d), c > r ? (d = r / c, e.arc(o, l, c, n + d, i - d, !0)) : e.arc(o, l, r, n + Yt, i - Yt), e.closePath(), e.clip();
}
function WS(e) {
  return td(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function VS(e, t, n, i) {
  const r = WS(e.options.borderRadius), o = (n - t) / 2, l = Math.min(o, i * t / 2), u = (c) => {
    const d = (n - Math.min(o, c)) * i / 2;
    return re(c, 0, Math.min(o, d));
  };
  return {
    outerStart: u(r.outerStart),
    outerEnd: u(r.outerEnd),
    innerStart: re(r.innerStart, 0, l),
    innerEnd: re(r.innerEnd, 0, l)
  };
}
function es(e, t, n, i) {
  return {
    x: n + e * Math.cos(t),
    y: i + e * Math.sin(t)
  };
}
function sl(e, t, n, i, r, o) {
  const { x: l, y: u, startAngle: c, pixelMargin: d, innerRadius: p } = t, g = Math.max(t.outerRadius + i + n - d, 0), _ = p > 0 ? p + i + n + d : 0;
  let x = 0;
  const S = r - c;
  if (i) {
    const lt = p > 0 ? p - i : 0, J = g > 0 ? g - i : 0, ut = (lt + J) / 2, I = ut !== 0 ? S * ut / (ut + i) : S;
    x = (S - I) / 2;
  }
  const k = Math.max(1e-3, S * g - n / St) / g, C = (S - k) / 2, w = c + C + x, b = r - C - x, { outerStart: P, outerEnd: T, innerStart: E, innerEnd: N } = VS(t, _, g, b - w), D = g - P, A = g - T, H = w + P / D, j = b - T / A, V = _ + E, U = _ + N, vt = w + E / V, rt = b - N / U;
  if (e.beginPath(), o) {
    const lt = (H + j) / 2;
    if (e.arc(l, u, g, H, lt), e.arc(l, u, g, lt, j), T > 0) {
      const $ = es(A, j, l, u);
      e.arc($.x, $.y, T, j, b + Yt);
    }
    const J = es(U, b, l, u);
    if (e.lineTo(J.x, J.y), N > 0) {
      const $ = es(U, rt, l, u);
      e.arc($.x, $.y, N, b + Yt, rt + Math.PI);
    }
    const ut = (b - N / _ + (w + E / _)) / 2;
    if (e.arc(l, u, _, b - N / _, ut, !0), e.arc(l, u, _, ut, w + E / _, !0), E > 0) {
      const $ = es(V, vt, l, u);
      e.arc($.x, $.y, E, vt + Math.PI, w - Yt);
    }
    const I = es(D, w, l, u);
    if (e.lineTo(I.x, I.y), P > 0) {
      const $ = es(D, H, l, u);
      e.arc($.x, $.y, P, w - Yt, H);
    }
  } else {
    e.moveTo(l, u);
    const lt = Math.cos(H) * g + l, J = Math.sin(H) * g + u;
    e.lineTo(lt, J);
    const ut = Math.cos(j) * g + l, I = Math.sin(j) * g + u;
    e.lineTo(ut, I);
  }
  e.closePath();
}
function ZS(e, t, n, i, r) {
  const { fullCircles: o, startAngle: l, circumference: u } = t;
  let c = t.endAngle;
  if (o) {
    sl(e, t, n, i, c, r);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(u) || (c = l + (u % At || At));
  }
  return sl(e, t, n, i, c, r), e.fill(), c;
}
function US(e, t, n, i, r) {
  const { fullCircles: o, startAngle: l, circumference: u, options: c } = t, { borderWidth: d, borderJoinStyle: p, borderDash: g, borderDashOffset: _, borderRadius: x } = c, S = c.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(g || []), e.lineDashOffset = _, S ? (e.lineWidth = d * 2, e.lineJoin = p || "round") : (e.lineWidth = d, e.lineJoin = p || "bevel");
  let k = t.endAngle;
  if (o) {
    sl(e, t, n, i, k, r);
    for (let C = 0; C < o; ++C)
      e.stroke();
    isNaN(u) || (k = l + (u % At || At));
  }
  S && HS(e, t, k), c.selfJoin && k - l >= St && x === 0 && p !== "miter" && FS(e, t, k), o || (sl(e, t, n, i, k, r), e.stroke());
}
class yr extends ci {
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
    ], r), { angle: l, distance: u } = yv(o, {
      x: n,
      y: i
    }), { startAngle: c, endAngle: d, innerRadius: p, outerRadius: g, circumference: _ } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], r), x = (this.options.spacing + this.options.borderWidth) / 2, S = st(_, d - c), k = eo(l, c, d) && c !== d, C = S >= At || k, w = Cn(u, p + x, g + x);
    return C && w;
  }
  getCenterPoint(n) {
    const { x: i, y: r, startAngle: o, endAngle: l, innerRadius: u, outerRadius: c } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], n), { offset: d, spacing: p } = this.options, g = (o + l) / 2, _ = (u + c + p + d) / 2;
    return {
      x: i + Math.cos(g) * _,
      y: r + Math.sin(g) * _
    };
  }
  tooltipPosition(n) {
    return this.getCenterPoint(n);
  }
  draw(n) {
    const { options: i, circumference: r } = this, o = (i.offset || 0) / 4, l = (i.spacing || 0) / 2, u = i.circular;
    if (this.pixelMargin = i.borderAlign === "inner" ? 0.33 : 0, this.fullCircles = r > At ? Math.floor(r / At) : 0, r === 0 || this.innerRadius < 0 || this.outerRadius < 0)
      return;
    n.save();
    const c = (this.startAngle + this.endAngle) / 2;
    n.translate(Math.cos(c) * o, Math.sin(c) * o);
    const d = 1 - Math.sin(Math.min(St, r || 0)), p = o * d;
    n.fillStyle = i.backgroundColor, n.strokeStyle = i.borderColor, ZS(n, this, p, l, u), US(n, this, p, l, u), n.restore();
  }
}
Y(yr, "id", "arc"), Y(yr, "defaults", {
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
}), Y(yr, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), Y(yr, "descriptors", {
  _scriptable: !0,
  _indexable: (n) => n !== "borderDash"
});
function qv(e, t, n = t) {
  e.lineCap = st(n.borderCapStyle, t.borderCapStyle), e.setLineDash(st(n.borderDash, t.borderDash)), e.lineDashOffset = st(n.borderDashOffset, t.borderDashOffset), e.lineJoin = st(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = st(n.borderWidth, t.borderWidth), e.strokeStyle = st(n.borderColor, t.borderColor);
}
function $S(e, t, n) {
  e.lineTo(n.x, n.y);
}
function YS(e) {
  return e.stepped ? gk : e.tension || e.cubicInterpolationMode === "monotone" ? _k : $S;
}
function Qv(e, t, n = {}) {
  const i = e.length, { start: r = 0, end: o = i - 1 } = n, { start: l, end: u } = t, c = Math.max(r, l), d = Math.min(o, u), p = r < l && o < l || r > u && o > u;
  return {
    count: i,
    start: c,
    loop: t.loop,
    ilen: d < c && !p ? i + d - c : d - c
  };
}
function KS(e, t, n, i) {
  const { points: r, options: o } = t, { count: l, start: u, loop: c, ilen: d } = Qv(r, n, i), p = YS(o);
  let { move: g = !0, reverse: _ } = i || {}, x, S, k;
  for (x = 0; x <= d; ++x)
    S = r[(u + (_ ? d - x : x)) % l], !S.skip && (g ? (e.moveTo(S.x, S.y), g = !1) : p(e, k, S, _, o.stepped), k = S);
  return c && (S = r[(u + (_ ? d : 0)) % l], p(e, k, S, _, o.stepped)), !!c;
}
function GS(e, t, n, i) {
  const r = t.points, { count: o, start: l, ilen: u } = Qv(r, n, i), { move: c = !0, reverse: d } = i || {};
  let p = 0, g = 0, _, x, S, k, C, w;
  const b = (T) => (l + (d ? u - T : T)) % o, P = () => {
    k !== C && (e.lineTo(p, C), e.lineTo(p, k), e.lineTo(p, w));
  };
  for (c && (x = r[b(0)], e.moveTo(x.x, x.y)), _ = 0; _ <= u; ++_) {
    if (x = r[b(_)], x.skip)
      continue;
    const T = x.x, E = x.y, N = T | 0;
    N === S ? (E < k ? k = E : E > C && (C = E), p = (g * p + T) / ++g) : (P(), e.lineTo(T, E), S = N, g = 0, k = C = E), w = E;
  }
  P();
}
function Uc(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? GS : KS;
}
function XS(e) {
  return e.stepped ? Gk : e.tension || e.cubicInterpolationMode === "monotone" ? Xk : Pi;
}
function qS(e, t, n, i) {
  let r = t._path;
  r || (r = t._path = new Path2D(), t.path(r, n, i) && r.closePath()), qv(e, t.options), e.stroke(r);
}
function QS(e, t, n, i) {
  const { segments: r, options: o } = t, l = Uc(t);
  for (const u of r)
    qv(e, o, u.style), e.beginPath(), l(e, t, u, {
      start: n,
      end: n + i - 1
    }) && e.closePath(), e.stroke();
}
const JS = typeof Path2D == "function";
function t2(e, t, n, i) {
  JS && !t.options.segment ? qS(e, t, n, i) : QS(e, t, n, i);
}
class Yn extends ci {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, n) {
    const i = this.options;
    if ((i.tension || i.cubicInterpolationMode === "monotone") && !i.stepped && !this._pointsUpdated) {
      const r = i.spanGaps ? this._loop : this._fullLoop;
      Hk(this._points, i, t, r, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = nb(this, this.options.segment));
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
    const i = this.options, r = t[n], o = this.points, l = Rv(this, {
      property: n,
      start: r,
      end: r
    });
    if (!l.length)
      return;
    const u = [], c = XS(i);
    let d, p;
    for (d = 0, p = l.length; d < p; ++d) {
      const { start: g, end: _ } = l[d], x = o[g], S = o[_];
      if (x === S) {
        u.push(x);
        continue;
      }
      const k = Math.abs((r - x[n]) / (S[n] - x[n])), C = c(x, S, k, i.stepped);
      C[n] = t[n], u.push(C);
    }
    return u.length === 1 ? u[0] : u;
  }
  pathSegment(t, n, i) {
    return Uc(this)(t, this, n, i);
  }
  path(t, n, i) {
    const r = this.segments, o = Uc(this);
    let l = this._loop;
    n = n || 0, i = i || this.points.length - n;
    for (const u of r)
      l &= o(t, this, u, {
        start: n,
        end: n + i - 1
      });
    return !!l;
  }
  draw(t, n, i, r) {
    const o = this.options || {};
    (this.points || []).length && o.borderWidth && (t.save(), t2(t, this, i, r), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
Y(Yn, "id", "line"), Y(Yn, "defaults", {
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
}), Y(Yn, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), Y(Yn, "descriptors", {
  _scriptable: !0,
  _indexable: (t) => t !== "borderDash" && t !== "fill"
});
function km(e, t, n, i) {
  const r = e.options, { [n]: o } = e.getProps([
    n
  ], i);
  return Math.abs(t - o) < r.radius + r.hitRadius;
}
class Pa extends ci {
  constructor(n) {
    super();
    Y(this, "parsed");
    Y(this, "skip");
    Y(this, "stop");
    this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, n && Object.assign(this, n);
  }
  inRange(n, i, r) {
    const o = this.options, { x: l, y: u } = this.getProps([
      "x",
      "y"
    ], r);
    return Math.pow(n - l, 2) + Math.pow(i - u, 2) < Math.pow(o.hitRadius + o.radius, 2);
  }
  inXRange(n, i) {
    return km(this, n, "x", i);
  }
  inYRange(n, i) {
    return km(this, n, "y", i);
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
    this.skip || r.radius < 0.1 || !no(this, i, this.size(r) / 2) || (n.strokeStyle = r.borderColor, n.lineWidth = r.borderWidth, n.fillStyle = r.backgroundColor, Wc(n, r, this.x, this.y));
  }
  getRange() {
    const n = this.options || {};
    return n.radius + n.hitRadius;
  }
}
Y(Pa, "id", "point"), /**
* @type {any}
*/
Y(Pa, "defaults", {
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
Y(Pa, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function Jv(e, t) {
  const { x: n, y: i, base: r, width: o, height: l } = e.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let u, c, d, p, g;
  return e.horizontal ? (g = l / 2, u = Math.min(n, r), c = Math.max(n, r), d = i - g, p = i + g) : (g = o / 2, u = n - g, c = n + g, d = Math.min(i, r), p = Math.max(i, r)), {
    left: u,
    top: d,
    right: c,
    bottom: p
  };
}
function Kn(e, t, n, i) {
  return e ? 0 : re(t, n, i);
}
function e2(e, t, n) {
  const i = e.options.borderWidth, r = e.borderSkipped, o = Cv(i);
  return {
    t: Kn(r.top, o.top, 0, n),
    r: Kn(r.right, o.right, 0, t),
    b: Kn(r.bottom, o.bottom, 0, n),
    l: Kn(r.left, o.left, 0, t)
  };
}
function n2(e, t, n) {
  const { enableBorderRadius: i } = e.getProps([
    "enableBorderRadius"
  ]), r = e.options.borderRadius, o = ws(r), l = Math.min(t, n), u = e.borderSkipped, c = i || dt(r);
  return {
    topLeft: Kn(!c || u.top || u.left, o.topLeft, 0, l),
    topRight: Kn(!c || u.top || u.right, o.topRight, 0, l),
    bottomLeft: Kn(!c || u.bottom || u.left, o.bottomLeft, 0, l),
    bottomRight: Kn(!c || u.bottom || u.right, o.bottomRight, 0, l)
  };
}
function i2(e) {
  const t = Jv(e), n = t.right - t.left, i = t.bottom - t.top, r = e2(e, n / 2, i / 2), o = n2(e, n / 2, i / 2);
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
function Fu(e, t, n, i) {
  const r = t === null, o = n === null, u = e && !(r && o) && Jv(e, i);
  return u && (r || Cn(t, u.left, u.right)) && (o || Cn(n, u.top, u.bottom));
}
function s2(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function r2(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Hu(e, t, n = {}) {
  const i = e.x !== n.x ? -t : 0, r = e.y !== n.y ? -t : 0, o = (e.x + e.w !== n.x + n.w ? t : 0) - i, l = (e.y + e.h !== n.y + n.h ? t : 0) - r;
  return {
    x: e.x + i,
    y: e.y + r,
    w: e.w + o,
    h: e.h + l,
    radius: e.radius
  };
}
class Ma extends ci {
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: n, options: { borderColor: i, backgroundColor: r } } = this, { inner: o, outer: l } = i2(this), u = s2(l.radius) ? el : r2;
    t.save(), (l.w !== o.w || l.h !== o.h) && (t.beginPath(), u(t, Hu(l, n, o)), t.clip(), u(t, Hu(o, -n, l)), t.fillStyle = i, t.fill("evenodd")), t.beginPath(), u(t, Hu(o, n)), t.fillStyle = r, t.fill(), t.restore();
  }
  inRange(t, n, i) {
    return Fu(this, t, n, i);
  }
  inXRange(t, n) {
    return Fu(this, t, null, n);
  }
  inYRange(t, n) {
    return Fu(this, null, t, n);
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
Y(Ma, "id", "bar"), Y(Ma, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), Y(Ma, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function o2(e, t, n) {
  const i = e.segments, r = e.points, o = t.points, l = [];
  for (const u of i) {
    let { start: c, end: d } = u;
    d = Cl(c, d, r);
    const p = $c(n, r[c], r[d], u.loop);
    if (!t.segments) {
      l.push({
        source: u,
        target: p,
        start: r[c],
        end: r[d]
      });
      continue;
    }
    const g = Rv(t, p);
    for (const _ of g) {
      const x = $c(n, o[_.start], o[_.end], _.loop), S = Dv(u, r, x);
      for (const k of S)
        l.push({
          source: k,
          target: _,
          start: {
            [n]: bm(p, x, "start", Math.max)
          },
          end: {
            [n]: bm(p, x, "end", Math.min)
          }
        });
    }
  }
  return l;
}
function $c(e, t, n, i) {
  if (i)
    return;
  let r = t[e], o = n[e];
  return e === "angle" && (r = Se(r), o = Se(o)), {
    property: e,
    start: r,
    end: o
  };
}
function a2(e, t) {
  const { x: n = null, y: i = null } = e || {}, r = t.points, o = [];
  return t.segments.forEach(({ start: l, end: u }) => {
    u = Cl(l, u, r);
    const c = r[l], d = r[u];
    i !== null ? (o.push({
      x: c.x,
      y: i
    }), o.push({
      x: d.x,
      y: i
    })) : n !== null && (o.push({
      x: n,
      y: c.y
    }), o.push({
      x: n,
      y: d.y
    }));
  }), o;
}
function Cl(e, t, n) {
  for (; t > e; t--) {
    const i = n[t];
    if (!isNaN(i.x) && !isNaN(i.y))
      break;
  }
  return t;
}
function bm(e, t, n, i) {
  return e && t ? i(e[n], t[n]) : e ? e[n] : t ? t[n] : 0;
}
function ty(e, t) {
  let n = [], i = !1;
  return Ut(e) ? (i = !0, n = e) : n = a2(e, t), n.length ? new Yn({
    points: n,
    options: {
      tension: 0
    },
    _loop: i,
    _fullLoop: i
  }) : null;
}
function Sm(e) {
  return e && e.fill !== !1;
}
function l2(e, t, n) {
  let r = e[t].fill;
  const o = [
    t
  ];
  let l;
  if (!n)
    return r;
  for (; r !== !1 && o.indexOf(r) === -1; ) {
    if (!ae(r))
      return r;
    if (l = e[r], !l)
      return !1;
    if (l.visible)
      return r;
    o.push(r), r = l.fill;
  }
  return !1;
}
function u2(e, t, n) {
  const i = f2(e);
  if (dt(i))
    return isNaN(i.value) ? !1 : i;
  let r = parseFloat(i);
  return ae(r) && Math.floor(r) === r ? c2(i[0], t, r, n) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(i) >= 0 && i;
}
function c2(e, t, n, i) {
  return (e === "-" || e === "+") && (n = t + n), n === t || n < 0 || n >= i ? !1 : n;
}
function h2(e, t) {
  let n = null;
  return e === "start" ? n = t.bottom : e === "end" ? n = t.top : dt(e) ? n = t.getPixelForValue(e.value) : t.getBasePixel && (n = t.getBasePixel()), n;
}
function d2(e, t, n) {
  let i;
  return e === "start" ? i = n : e === "end" ? i = t.options.reverse ? t.min : t.max : dt(e) ? i = e.value : i = t.getBaseValue(), i;
}
function f2(e) {
  const t = e.options, n = t.fill;
  let i = st(n && n.target, n);
  return i === void 0 && (i = !!t.backgroundColor), i === !1 || i === null ? !1 : i === !0 ? "origin" : i;
}
function p2(e) {
  const { scale: t, index: n, line: i } = e, r = [], o = i.segments, l = i.points, u = m2(t, n);
  u.push(ty({
    x: null,
    y: t.bottom
  }, i));
  for (let c = 0; c < o.length; c++) {
    const d = o[c];
    for (let p = d.start; p <= d.end; p++)
      g2(r, l[p], u);
  }
  return new Yn({
    points: r,
    options: {}
  });
}
function m2(e, t) {
  const n = [], i = e.getMatchingVisibleMetas("line");
  for (let r = 0; r < i.length; r++) {
    const o = i[r];
    if (o.index === t)
      break;
    o.hidden || n.unshift(o.dataset);
  }
  return n;
}
function g2(e, t, n) {
  const i = [];
  for (let r = 0; r < n.length; r++) {
    const o = n[r], { first: l, last: u, point: c } = _2(o, t, "x");
    if (!(!c || l && u)) {
      if (l)
        i.unshift(c);
      else if (e.push(c), !u)
        break;
    }
  }
  e.push(...i);
}
function _2(e, t, n) {
  const i = e.interpolate(t, n);
  if (!i)
    return {};
  const r = i[n], o = e.segments, l = e.points;
  let u = !1, c = !1;
  for (let d = 0; d < o.length; d++) {
    const p = o[d], g = l[p.start][n], _ = l[p.end][n];
    if (Cn(r, g, _)) {
      u = r === g, c = r === _;
      break;
    }
  }
  return {
    first: u,
    last: c,
    point: i
  };
}
class ey {
  constructor(t) {
    this.x = t.x, this.y = t.y, this.radius = t.radius;
  }
  pathSegment(t, n, i) {
    const { x: r, y: o, radius: l } = this;
    return n = n || {
      start: 0,
      end: At
    }, t.arc(r, o, l, n.end, n.start, !0), !i.bounds;
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
function v2(e) {
  const { chart: t, fill: n, line: i } = e;
  if (ae(n))
    return y2(t, n);
  if (n === "stack")
    return p2(e);
  if (n === "shape")
    return !0;
  const r = x2(e);
  return r instanceof ey ? r : ty(r, i);
}
function y2(e, t) {
  const n = e.getDatasetMeta(t);
  return n && e.isDatasetVisible(t) ? n.dataset : null;
}
function x2(e) {
  return (e.scale || {}).getPointPositionForValue ? k2(e) : w2(e);
}
function w2(e) {
  const { scale: t = {}, fill: n } = e, i = h2(n, t);
  if (ae(i)) {
    const r = t.isHorizontal();
    return {
      x: r ? i : null,
      y: r ? null : i
    };
  }
  return null;
}
function k2(e) {
  const { scale: t, fill: n } = e, i = t.options, r = t.getLabels().length, o = i.reverse ? t.max : t.min, l = d2(n, t, o), u = [];
  if (i.grid.circular) {
    const c = t.getPointPositionForValue(0, o);
    return new ey({
      x: c.x,
      y: c.y,
      radius: t.getDistanceFromCenterForValue(l)
    });
  }
  for (let c = 0; c < r; ++c)
    u.push(t.getPointPositionForValue(c, l));
  return u;
}
function Wu(e, t, n) {
  const i = v2(t), { chart: r, index: o, line: l, scale: u, axis: c } = t, d = l.options, p = d.fill, g = d.backgroundColor, { above: _ = g, below: x = g } = p || {}, S = r.getDatasetMeta(o), k = jv(r, S);
  i && l.points.length && (kl(e, n), b2(e, {
    line: l,
    target: i,
    above: _,
    below: x,
    area: n,
    scale: u,
    axis: c,
    clip: k
  }), bl(e));
}
function b2(e, t) {
  const { line: n, target: i, above: r, below: o, area: l, scale: u, clip: c } = t, d = n._loop ? "angle" : t.axis;
  e.save();
  let p = o;
  o !== r && (d === "x" ? (Pm(e, i, l.top), Vu(e, {
    line: n,
    target: i,
    color: r,
    scale: u,
    property: d,
    clip: c
  }), e.restore(), e.save(), Pm(e, i, l.bottom)) : d === "y" && (Mm(e, i, l.left), Vu(e, {
    line: n,
    target: i,
    color: o,
    scale: u,
    property: d,
    clip: c
  }), e.restore(), e.save(), Mm(e, i, l.right), p = r)), Vu(e, {
    line: n,
    target: i,
    color: p,
    scale: u,
    property: d,
    clip: c
  }), e.restore();
}
function Pm(e, t, n) {
  const { segments: i, points: r } = t;
  let o = !0, l = !1;
  e.beginPath();
  for (const u of i) {
    const { start: c, end: d } = u, p = r[c], g = r[Cl(c, d, r)];
    o ? (e.moveTo(p.x, p.y), o = !1) : (e.lineTo(p.x, n), e.lineTo(p.x, p.y)), l = !!t.pathSegment(e, u, {
      move: l
    }), l ? e.closePath() : e.lineTo(g.x, n);
  }
  e.lineTo(t.first().x, n), e.closePath(), e.clip();
}
function Mm(e, t, n) {
  const { segments: i, points: r } = t;
  let o = !0, l = !1;
  e.beginPath();
  for (const u of i) {
    const { start: c, end: d } = u, p = r[c], g = r[Cl(c, d, r)];
    o ? (e.moveTo(p.x, p.y), o = !1) : (e.lineTo(n, p.y), e.lineTo(p.x, p.y)), l = !!t.pathSegment(e, u, {
      move: l
    }), l ? e.closePath() : e.lineTo(n, g.y);
  }
  e.lineTo(n, t.first().y), e.closePath(), e.clip();
}
function Vu(e, t) {
  const { line: n, target: i, property: r, color: o, scale: l, clip: u } = t, c = o2(n, i, r);
  for (const { source: d, target: p, start: g, end: _ } of c) {
    const { style: { backgroundColor: x = o } = {} } = d, S = i !== !0;
    e.save(), e.fillStyle = x, S2(e, l, u, S && $c(r, g, _)), e.beginPath();
    const k = !!n.pathSegment(e, d);
    let C;
    if (S) {
      k ? e.closePath() : Cm(e, i, _, r);
      const w = !!i.pathSegment(e, p, {
        move: k,
        reverse: !0
      });
      C = k && w, C || Cm(e, i, g, r);
    }
    e.closePath(), e.fill(C ? "evenodd" : "nonzero"), e.restore();
  }
}
function S2(e, t, n, i) {
  const r = t.chart.chartArea, { property: o, start: l, end: u } = i || {};
  if (o === "x" || o === "y") {
    let c, d, p, g;
    o === "x" ? (c = l, d = r.top, p = u, g = r.bottom) : (c = r.left, d = l, p = r.right, g = u), e.beginPath(), n && (c = Math.max(c, n.left), p = Math.min(p, n.right), d = Math.max(d, n.top), g = Math.min(g, n.bottom)), e.rect(c, d, p - c, g - d), e.clip();
  }
}
function Cm(e, t, n, i) {
  const r = t.interpolate(n, i);
  r && e.lineTo(r.x, r.y);
}
var P2 = {
  id: "filler",
  afterDatasetsUpdate(e, t, n) {
    const i = (e.data.datasets || []).length, r = [];
    let o, l, u, c;
    for (l = 0; l < i; ++l)
      o = e.getDatasetMeta(l), u = o.dataset, c = null, u && u.options && u instanceof Yn && (c = {
        visible: e.isDatasetVisible(l),
        index: l,
        fill: u2(u, l, i),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: u
      }), o.$filler = c, r.push(c);
    for (l = 0; l < i; ++l)
      c = r[l], !(!c || c.fill === !1) && (c.fill = l2(r, l, n.propagate));
  },
  beforeDraw(e, t, n) {
    const i = n.drawTime === "beforeDraw", r = e.getSortedVisibleDatasetMetas(), o = e.chartArea;
    for (let l = r.length - 1; l >= 0; --l) {
      const u = r[l].$filler;
      u && (u.line.updateControlPoints(o, u.axis), i && u.fill && Wu(e.ctx, u, o));
    }
  },
  beforeDatasetsDraw(e, t, n) {
    if (n.drawTime !== "beforeDatasetsDraw")
      return;
    const i = e.getSortedVisibleDatasetMetas();
    for (let r = i.length - 1; r >= 0; --r) {
      const o = i[r].$filler;
      Sm(o) && Wu(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, n) {
    const i = t.meta.$filler;
    !Sm(i) || n.drawTime !== "beforeDatasetDraw" || Wu(e.ctx, i, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Lm = (e, t) => {
  let { boxHeight: n = t, boxWidth: i = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), i = e.pointStyleWidth || Math.min(i, t)), {
    boxWidth: i,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, M2 = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class Tm extends ci {
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
    let n = Lt(t.generateLabels, [
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
    const i = t.labels, r = ve(i.font), o = r.size, l = this._computeTitleHeight(), { boxWidth: u, itemHeight: c } = Lm(i, o);
    let d, p;
    n.font = r.string, this.isHorizontal() ? (d = this.maxWidth, p = this._fitRows(l, o, u, c) + 10) : (p = this.maxHeight, d = this._fitCols(l, r, u, c) + 10), this.width = Math.min(d, t.maxWidth || this.maxWidth), this.height = Math.min(p, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, n, i, r) {
    const { ctx: o, maxWidth: l, options: { labels: { padding: u } } } = this, c = this.legendHitBoxes = [], d = this.lineWidths = [
      0
    ], p = r + u;
    let g = t;
    o.textAlign = "left", o.textBaseline = "middle";
    let _ = -1, x = -p;
    return this.legendItems.forEach((S, k) => {
      const C = i + n / 2 + o.measureText(S.text).width;
      (k === 0 || d[d.length - 1] + C + 2 * u > l) && (g += p, d[d.length - (k > 0 ? 0 : 1)] = 0, x += p, _++), c[k] = {
        left: 0,
        top: x,
        row: _,
        width: C,
        height: r
      }, d[d.length - 1] += C + u;
    }), g;
  }
  _fitCols(t, n, i, r) {
    const { ctx: o, maxHeight: l, options: { labels: { padding: u } } } = this, c = this.legendHitBoxes = [], d = this.columnSizes = [], p = l - t;
    let g = u, _ = 0, x = 0, S = 0, k = 0;
    return this.legendItems.forEach((C, w) => {
      const { itemWidth: b, itemHeight: P } = C2(i, n, o, C, r);
      w > 0 && x + P + 2 * u > p && (g += _ + u, d.push({
        width: _,
        height: x
      }), S += _ + u, k++, _ = x = 0), c[w] = {
        left: S,
        top: x,
        col: k,
        width: b,
        height: P
      }, _ = Math.max(_, b), x += P + u;
    }), g += _, d.push({
      width: _,
      height: x
    }), g;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: i, labels: { padding: r }, rtl: o } } = this, l = ks(o, this.left, this.width);
    if (this.isHorizontal()) {
      let u = 0, c = ke(i, this.left + r, this.right - this.lineWidths[u]);
      for (const d of n)
        u !== d.row && (u = d.row, c = ke(i, this.left + r, this.right - this.lineWidths[u])), d.top += this.top + t + r, d.left = l.leftForLtr(l.x(c), d.width), c += d.width + r;
    } else {
      let u = 0, c = ke(i, this.top + t + r, this.bottom - this.columnSizes[u].height);
      for (const d of n)
        d.col !== u && (u = d.col, c = ke(i, this.top + t + r, this.bottom - this.columnSizes[u].height)), d.top = c, d.left += this.left + r, d.left = l.leftForLtr(l.x(d.left), d.width), c += d.height + r;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      kl(t, this), this._draw(), bl(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: i, ctx: r } = this, { align: o, labels: l } = t, u = Ft.color, c = ks(t.rtl, this.left, this.width), d = ve(l.font), { padding: p } = l, g = d.size, _ = g / 2;
    let x;
    this.drawTitle(), r.textAlign = c.textAlign("left"), r.textBaseline = "middle", r.lineWidth = 0.5, r.font = d.string;
    const { boxWidth: S, boxHeight: k, itemHeight: C } = Lm(l, g), w = function(N, D, A) {
      if (isNaN(S) || S <= 0 || isNaN(k) || k < 0)
        return;
      r.save();
      const H = st(A.lineWidth, 1);
      if (r.fillStyle = st(A.fillStyle, u), r.lineCap = st(A.lineCap, "butt"), r.lineDashOffset = st(A.lineDashOffset, 0), r.lineJoin = st(A.lineJoin, "miter"), r.lineWidth = H, r.strokeStyle = st(A.strokeStyle, u), r.setLineDash(st(A.lineDash, [])), l.usePointStyle) {
        const j = {
          radius: k * Math.SQRT2 / 2,
          pointStyle: A.pointStyle,
          rotation: A.rotation,
          borderWidth: H
        }, V = c.xPlus(N, S / 2), U = D + _;
        Mv(r, j, V, U, l.pointStyleWidth && S);
      } else {
        const j = D + Math.max((g - k) / 2, 0), V = c.leftForLtr(N, S), U = ws(A.borderRadius);
        r.beginPath(), Object.values(U).some((vt) => vt !== 0) ? el(r, {
          x: V,
          y: j,
          w: S,
          h: k,
          radius: U
        }) : r.rect(V, j, S, k), r.fill(), H !== 0 && r.stroke();
      }
      r.restore();
    }, b = function(N, D, A) {
      tl(r, A.text, N, D + C / 2, d, {
        strikethrough: A.hidden,
        textAlign: c.textAlign(A.textAlign)
      });
    }, P = this.isHorizontal(), T = this._computeTitleHeight();
    P ? x = {
      x: ke(o, this.left + p, this.right - i[0]),
      y: this.top + p + T,
      line: 0
    } : x = {
      x: this.left + p,
      y: ke(o, this.top + T + p, this.bottom - n[0].height),
      line: 0
    }, Nv(this.ctx, t.textDirection);
    const E = C + p;
    this.legendItems.forEach((N, D) => {
      r.strokeStyle = N.fontColor, r.fillStyle = N.fontColor;
      const A = r.measureText(N.text).width, H = c.textAlign(N.textAlign || (N.textAlign = l.textAlign)), j = S + _ + A;
      let V = x.x, U = x.y;
      c.setWidth(this.width), P ? D > 0 && V + j + p > this.right && (U = x.y += E, x.line++, V = x.x = ke(o, this.left + p, this.right - i[x.line])) : D > 0 && U + E > this.bottom && (V = x.x = V + n[x.line].width + p, x.line++, U = x.y = ke(o, this.top + T + p, this.bottom - n[x.line].height));
      const vt = c.x(V);
      if (w(vt, U, N), V = ik(H, V + S + _, P ? V + j : this.right, t.rtl), b(c.x(V), U, N), P)
        x.x += j + p;
      else if (typeof N.text != "string") {
        const rt = d.lineHeight;
        x.y += ny(N, rt) + p;
      } else
        x.y += E;
    }), Av(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, i = ve(n.font), r = Xe(n.padding);
    if (!n.display)
      return;
    const o = ks(t.rtl, this.left, this.width), l = this.ctx, u = n.position, c = i.size / 2, d = r.top + c;
    let p, g = this.left, _ = this.width;
    if (this.isHorizontal())
      _ = Math.max(...this.lineWidths), p = this.top + d, g = ke(t.align, g, this.right - _);
    else {
      const S = this.columnSizes.reduce((k, C) => Math.max(k, C.height), 0);
      p = d + ke(t.align, this.top, this.bottom - S - t.labels.padding - this._computeTitleHeight());
    }
    const x = ke(u, g, g + _);
    l.textAlign = o.textAlign(Sv(u)), l.textBaseline = "middle", l.strokeStyle = n.color, l.fillStyle = n.color, l.font = i.string, tl(l, n.text, x, p, i);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = ve(t.font), i = Xe(t.padding);
    return t.display ? n.lineHeight + i.height : 0;
  }
  _getLegendItemAt(t, n) {
    let i, r, o;
    if (Cn(t, this.left, this.right) && Cn(n, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, i = 0; i < o.length; ++i)
        if (r = o[i], Cn(t, r.left, r.left + r.width) && Cn(n, r.top, r.top + r.height))
          return this.legendItems[i];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!E2(t.type, n))
      return;
    const i = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const r = this._hoveredItem, o = M2(r, i);
      r && !o && Lt(n.onLeave, [
        t,
        r,
        this
      ], this), this._hoveredItem = i, i && !o && Lt(n.onHover, [
        t,
        i,
        this
      ], this);
    } else i && Lt(n.onClick, [
      t,
      i,
      this
    ], this);
  }
}
function C2(e, t, n, i, r) {
  const o = L2(i, e, t, n), l = T2(r, i, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: l
  };
}
function L2(e, t, n, i) {
  let r = e.text;
  return r && typeof r != "string" && (r = r.reduce((o, l) => o.length > l.length ? o : l)), t + n.size / 2 + i.measureText(r).width;
}
function T2(e, t, n) {
  let i = e;
  return typeof t.text != "string" && (i = ny(t, n)), i;
}
function ny(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function E2(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var z2 = {
  id: "legend",
  _element: Tm,
  start(e, t, n) {
    const i = e.legend = new Tm({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    $n.configure(e, i, n), $n.addBox(e, i);
  },
  stop(e) {
    $n.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const i = e.legend;
    $n.configure(e, i, n), i.options = n;
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
        const t = e.data.datasets, { labels: { usePointStyle: n, pointStyle: i, textAlign: r, color: o, useBorderRadius: l, borderRadius: u } } = e.legend.options;
        return e._getSortedDatasetMetas().map((c) => {
          const d = c.controller.getStyle(n ? 0 : void 0), p = Xe(d.borderWidth);
          return {
            text: t[c.index].label,
            fillStyle: d.backgroundColor,
            fontColor: o,
            hidden: !c.visible,
            lineCap: d.borderCapStyle,
            lineDash: d.borderDash,
            lineDashOffset: d.borderDashOffset,
            lineJoin: d.borderJoinStyle,
            lineWidth: (p.width + p.height) / 4,
            strokeStyle: d.borderColor,
            pointStyle: i || d.pointStyle,
            rotation: d.rotation,
            textAlign: r || d.textAlign,
            borderRadius: l && (u || d.borderRadius),
            datasetIndex: c.index
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
const xr = {
  average(e) {
    if (!e.length)
      return !1;
    let t, n, i = /* @__PURE__ */ new Set(), r = 0, o = 0;
    for (t = 0, n = e.length; t < n; ++t) {
      const u = e[t].element;
      if (u && u.hasValue()) {
        const c = u.tooltipPosition();
        i.add(c.x), r += c.y, ++o;
      }
    }
    return o === 0 || i.size === 0 ? !1 : {
      x: [
        ...i
      ].reduce((u, c) => u + c) / i.size,
      y: r / o
    };
  },
  nearest(e, t) {
    if (!e.length)
      return !1;
    let n = t.x, i = t.y, r = Number.POSITIVE_INFINITY, o, l, u;
    for (o = 0, l = e.length; o < l; ++o) {
      const c = e[o].element;
      if (c && c.hasValue()) {
        const d = c.getCenterPoint(), p = Fc(t, d);
        p < r && (r = p, u = c);
      }
    }
    if (u) {
      const c = u.tooltipPosition();
      n = c.x, i = c.y;
    }
    return {
      x: n,
      y: i
    };
  }
};
function sn(e, t) {
  return t && (Ut(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function xn(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function O2(e, t) {
  const { element: n, datasetIndex: i, index: r } = t, o = e.getDatasetMeta(i).controller, { label: l, value: u } = o.getLabelAndValue(r);
  return {
    chart: e,
    label: l,
    parsed: o.getParsed(r),
    raw: e.data.datasets[i].data[r],
    formattedValue: u,
    dataset: o.getDataset(),
    dataIndex: r,
    datasetIndex: i,
    element: n
  };
}
function Em(e, t) {
  const n = e.chart.ctx, { body: i, footer: r, title: o } = e, { boxWidth: l, boxHeight: u } = t, c = ve(t.bodyFont), d = ve(t.titleFont), p = ve(t.footerFont), g = o.length, _ = r.length, x = i.length, S = Xe(t.padding);
  let k = S.height, C = 0, w = i.reduce((T, E) => T + E.before.length + E.lines.length + E.after.length, 0);
  if (w += e.beforeBody.length + e.afterBody.length, g && (k += g * d.lineHeight + (g - 1) * t.titleSpacing + t.titleMarginBottom), w) {
    const T = t.displayColors ? Math.max(u, c.lineHeight) : c.lineHeight;
    k += x * T + (w - x) * c.lineHeight + (w - 1) * t.bodySpacing;
  }
  _ && (k += t.footerMarginTop + _ * p.lineHeight + (_ - 1) * t.footerSpacing);
  let b = 0;
  const P = function(T) {
    C = Math.max(C, n.measureText(T).width + b);
  };
  return n.save(), n.font = d.string, wt(e.title, P), n.font = c.string, wt(e.beforeBody.concat(e.afterBody), P), b = t.displayColors ? l + 2 + t.boxPadding : 0, wt(i, (T) => {
    wt(T.before, P), wt(T.lines, P), wt(T.after, P);
  }), b = 0, n.font = p.string, wt(e.footer, P), n.restore(), C += S.width, {
    width: C,
    height: k
  };
}
function N2(e, t) {
  const { y: n, height: i } = t;
  return n < i / 2 ? "top" : n > e.height - i / 2 ? "bottom" : "center";
}
function A2(e, t, n, i) {
  const { x: r, width: o } = i, l = n.caretSize + n.caretPadding;
  if (e === "left" && r + o + l > t.width || e === "right" && r - o - l < 0)
    return !0;
}
function I2(e, t, n, i) {
  const { x: r, width: o } = n, { width: l, chartArea: { left: u, right: c } } = e;
  let d = "center";
  return i === "center" ? d = r <= (u + c) / 2 ? "left" : "right" : r <= o / 2 ? d = "left" : r >= l - o / 2 && (d = "right"), A2(d, e, t, n) && (d = "center"), d;
}
function zm(e, t, n) {
  const i = n.yAlign || t.yAlign || N2(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || I2(e, t, n, i),
    yAlign: i
  };
}
function D2(e, t) {
  let { x: n, width: i } = e;
  return t === "right" ? n -= i : t === "center" && (n -= i / 2), n;
}
function R2(e, t, n) {
  let { y: i, height: r } = e;
  return t === "top" ? i += n : t === "bottom" ? i -= r + n : i -= r / 2, i;
}
function Om(e, t, n, i) {
  const { caretSize: r, caretPadding: o, cornerRadius: l } = e, { xAlign: u, yAlign: c } = n, d = r + o, { topLeft: p, topRight: g, bottomLeft: _, bottomRight: x } = ws(l);
  let S = D2(t, u);
  const k = R2(t, c, d);
  return c === "center" ? u === "left" ? S += d : u === "right" && (S -= d) : u === "left" ? S -= Math.max(p, _) + r : u === "right" && (S += Math.max(g, x) + r), {
    x: re(S, 0, i.width - t.width),
    y: re(k, 0, i.height - t.height)
  };
}
function ra(e, t, n) {
  const i = Xe(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - i.right : e.x + i.left;
}
function Nm(e) {
  return sn([], xn(e));
}
function j2(e, t, n) {
  return Vi(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function Am(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const iy = {
  beforeTitle: vn,
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
  afterTitle: vn,
  beforeBody: vn,
  beforeLabel: vn,
  label(e) {
    if (this && this.options && this.options.mode === "dataset")
      return e.label + ": " + e.formattedValue || e.formattedValue;
    let t = e.dataset.label || "";
    t && (t += ": ");
    const n = e.formattedValue;
    return xt(n) || (t += n), t;
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
  afterLabel: vn,
  afterBody: vn,
  beforeFooter: vn,
  footer: vn,
  afterFooter: vn
};
function pe(e, t, n, i) {
  const r = e[t].call(n, i);
  return typeof r > "u" ? iy[t].call(n, i) : r;
}
class Yc extends ci {
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
    const n = this.chart, i = this.options.setContext(this.getContext()), r = i.enabled && n.options.animation && i.animations, o = new Bv(this.chart, r);
    return r._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = j2(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: i } = n, r = pe(i, "beforeTitle", this, t), o = pe(i, "title", this, t), l = pe(i, "afterTitle", this, t);
    let u = [];
    return u = sn(u, xn(r)), u = sn(u, xn(o)), u = sn(u, xn(l)), u;
  }
  getBeforeBody(t, n) {
    return Nm(pe(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: i } = n, r = [];
    return wt(t, (o) => {
      const l = {
        before: [],
        lines: [],
        after: []
      }, u = Am(i, o);
      sn(l.before, xn(pe(u, "beforeLabel", this, o))), sn(l.lines, pe(u, "label", this, o)), sn(l.after, xn(pe(u, "afterLabel", this, o))), r.push(l);
    }), r;
  }
  getAfterBody(t, n) {
    return Nm(pe(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: i } = n, r = pe(i, "beforeFooter", this, t), o = pe(i, "footer", this, t), l = pe(i, "afterFooter", this, t);
    let u = [];
    return u = sn(u, xn(r)), u = sn(u, xn(o)), u = sn(u, xn(l)), u;
  }
  _createItems(t) {
    const n = this._active, i = this.chart.data, r = [], o = [], l = [];
    let u = [], c, d;
    for (c = 0, d = n.length; c < d; ++c)
      u.push(O2(this.chart, n[c]));
    return t.filter && (u = u.filter((p, g, _) => t.filter(p, g, _, i))), t.itemSort && (u = u.sort((p, g) => t.itemSort(p, g, i))), wt(u, (p) => {
      const g = Am(t.callbacks, p);
      r.push(pe(g, "labelColor", this, p)), o.push(pe(g, "labelPointStyle", this, p)), l.push(pe(g, "labelTextColor", this, p));
    }), this.labelColors = r, this.labelPointStyles = o, this.labelTextColors = l, this.dataPoints = u, u;
  }
  update(t, n) {
    const i = this.options.setContext(this.getContext()), r = this._active;
    let o, l = [];
    if (!r.length)
      this.opacity !== 0 && (o = {
        opacity: 0
      });
    else {
      const u = xr[i.position].call(this, r, this._eventPosition);
      l = this._createItems(i), this.title = this.getTitle(l, i), this.beforeBody = this.getBeforeBody(l, i), this.body = this.getBody(l, i), this.afterBody = this.getAfterBody(l, i), this.footer = this.getFooter(l, i);
      const c = this._size = Em(this, i), d = Object.assign({}, u, c), p = zm(this.chart, i, d), g = Om(i, d, p, this.chart);
      this.xAlign = p.xAlign, this.yAlign = p.yAlign, o = {
        opacity: 1,
        x: g.x,
        y: g.y,
        width: c.width,
        height: c.height,
        caretX: u.x,
        caretY: u.y
      };
    }
    this._tooltipItems = l, this.$context = void 0, o && this._resolveAnimations().update(this, o), t && i.external && i.external.call(this, {
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
    const { xAlign: r, yAlign: o } = this, { caretSize: l, cornerRadius: u } = i, { topLeft: c, topRight: d, bottomLeft: p, bottomRight: g } = ws(u), { x: _, y: x } = t, { width: S, height: k } = n;
    let C, w, b, P, T, E;
    return o === "center" ? (T = x + k / 2, r === "left" ? (C = _, w = C - l, P = T + l, E = T - l) : (C = _ + S, w = C + l, P = T - l, E = T + l), b = C) : (r === "left" ? w = _ + Math.max(c, p) + l : r === "right" ? w = _ + S - Math.max(d, g) - l : w = this.caretX, o === "top" ? (P = x, T = P - l, C = w - l, b = w + l) : (P = x + k, T = P + l, C = w + l, b = w - l), E = P), {
      x1: C,
      x2: w,
      x3: b,
      y1: P,
      y2: T,
      y3: E
    };
  }
  drawTitle(t, n, i) {
    const r = this.title, o = r.length;
    let l, u, c;
    if (o) {
      const d = ks(i.rtl, this.x, this.width);
      for (t.x = ra(this, i.titleAlign, i), n.textAlign = d.textAlign(i.titleAlign), n.textBaseline = "middle", l = ve(i.titleFont), u = i.titleSpacing, n.fillStyle = i.titleColor, n.font = l.string, c = 0; c < o; ++c)
        n.fillText(r[c], d.x(t.x), t.y + l.lineHeight / 2), t.y += l.lineHeight + u, c + 1 === o && (t.y += i.titleMarginBottom - u);
    }
  }
  _drawColorBox(t, n, i, r, o) {
    const l = this.labelColors[i], u = this.labelPointStyles[i], { boxHeight: c, boxWidth: d } = o, p = ve(o.bodyFont), g = ra(this, "left", o), _ = r.x(g), x = c < p.lineHeight ? (p.lineHeight - c) / 2 : 0, S = n.y + x;
    if (o.usePointStyle) {
      const k = {
        radius: Math.min(d, c) / 2,
        pointStyle: u.pointStyle,
        rotation: u.rotation,
        borderWidth: 1
      }, C = r.leftForLtr(_, d) + d / 2, w = S + c / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Wc(t, k, C, w), t.strokeStyle = l.borderColor, t.fillStyle = l.backgroundColor, Wc(t, k, C, w);
    } else {
      t.lineWidth = dt(l.borderWidth) ? Math.max(...Object.values(l.borderWidth)) : l.borderWidth || 1, t.strokeStyle = l.borderColor, t.setLineDash(l.borderDash || []), t.lineDashOffset = l.borderDashOffset || 0;
      const k = r.leftForLtr(_, d), C = r.leftForLtr(r.xPlus(_, 1), d - 2), w = ws(l.borderRadius);
      Object.values(w).some((b) => b !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, el(t, {
        x: k,
        y: S,
        w: d,
        h: c,
        radius: w
      }), t.fill(), t.stroke(), t.fillStyle = l.backgroundColor, t.beginPath(), el(t, {
        x: C,
        y: S + 1,
        w: d - 2,
        h: c - 2,
        radius: w
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(k, S, d, c), t.strokeRect(k, S, d, c), t.fillStyle = l.backgroundColor, t.fillRect(C, S + 1, d - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[i];
  }
  drawBody(t, n, i) {
    const { body: r } = this, { bodySpacing: o, bodyAlign: l, displayColors: u, boxHeight: c, boxWidth: d, boxPadding: p } = i, g = ve(i.bodyFont);
    let _ = g.lineHeight, x = 0;
    const S = ks(i.rtl, this.x, this.width), k = function(A) {
      n.fillText(A, S.x(t.x + x), t.y + _ / 2), t.y += _ + o;
    }, C = S.textAlign(l);
    let w, b, P, T, E, N, D;
    for (n.textAlign = l, n.textBaseline = "middle", n.font = g.string, t.x = ra(this, C, i), n.fillStyle = i.bodyColor, wt(this.beforeBody, k), x = u && C !== "right" ? l === "center" ? d / 2 + p : d + 2 + p : 0, T = 0, N = r.length; T < N; ++T) {
      for (w = r[T], b = this.labelTextColors[T], n.fillStyle = b, wt(w.before, k), P = w.lines, u && P.length && (this._drawColorBox(n, t, T, S, i), _ = Math.max(g.lineHeight, c)), E = 0, D = P.length; E < D; ++E)
        k(P[E]), _ = g.lineHeight;
      wt(w.after, k);
    }
    x = 0, _ = g.lineHeight, wt(this.afterBody, k), t.y -= o;
  }
  drawFooter(t, n, i) {
    const r = this.footer, o = r.length;
    let l, u;
    if (o) {
      const c = ks(i.rtl, this.x, this.width);
      for (t.x = ra(this, i.footerAlign, i), t.y += i.footerMarginTop, n.textAlign = c.textAlign(i.footerAlign), n.textBaseline = "middle", l = ve(i.footerFont), n.fillStyle = i.footerColor, n.font = l.string, u = 0; u < o; ++u)
        n.fillText(r[u], c.x(t.x), t.y + l.lineHeight / 2), t.y += l.lineHeight + i.footerSpacing;
    }
  }
  drawBackground(t, n, i, r) {
    const { xAlign: o, yAlign: l } = this, { x: u, y: c } = t, { width: d, height: p } = i, { topLeft: g, topRight: _, bottomLeft: x, bottomRight: S } = ws(r.cornerRadius);
    n.fillStyle = r.backgroundColor, n.strokeStyle = r.borderColor, n.lineWidth = r.borderWidth, n.beginPath(), n.moveTo(u + g, c), l === "top" && this.drawCaret(t, n, i, r), n.lineTo(u + d - _, c), n.quadraticCurveTo(u + d, c, u + d, c + _), l === "center" && o === "right" && this.drawCaret(t, n, i, r), n.lineTo(u + d, c + p - S), n.quadraticCurveTo(u + d, c + p, u + d - S, c + p), l === "bottom" && this.drawCaret(t, n, i, r), n.lineTo(u + x, c + p), n.quadraticCurveTo(u, c + p, u, c + p - x), l === "center" && o === "left" && this.drawCaret(t, n, i, r), n.lineTo(u, c + g), n.quadraticCurveTo(u, c, u + g, c), n.closePath(), n.fill(), r.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, i = this.$animations, r = i && i.x, o = i && i.y;
    if (r || o) {
      const l = xr[t.position].call(this, this._active, this._eventPosition);
      if (!l)
        return;
      const u = this._size = Em(this, t), c = Object.assign({}, l, this._size), d = zm(n, t, c), p = Om(t, c, d, n);
      (r._to !== p.x || o._to !== p.y) && (this.xAlign = d.xAlign, this.yAlign = d.yAlign, this.width = u.width, this.height = u.height, this.caretX = l.x, this.caretY = l.y, this._resolveAnimations().update(this, p));
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
    const l = Xe(n.padding), u = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && u && (t.save(), t.globalAlpha = i, this.drawBackground(o, t, r, n), Nv(t, n.textDirection), o.y += l.top, this.drawTitle(o, t, n), this.drawBody(o, t, n), this.drawFooter(o, t, n), Av(t, n.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, n) {
    const i = this._active, r = t.map(({ datasetIndex: u, index: c }) => {
      const d = this.chart.getDatasetMeta(u);
      if (!d)
        throw new Error("Cannot find a dataset at index " + u);
      return {
        datasetIndex: u,
        element: d.data[c],
        index: c
      };
    }), o = !qa(i, r), l = this._positionChanged(r, n);
    (o || l) && (this._active = r, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, i = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const r = this.options, o = this._active || [], l = this._getActiveElements(t, o, n, i), u = this._positionChanged(l, t), c = n || !qa(l, o) || u;
    return c && (this._active = l, (r.enabled || r.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, n))), c;
  }
  _getActiveElements(t, n, i, r) {
    const o = this.options;
    if (t.type === "mouseout")
      return [];
    if (!r)
      return n.filter((u) => this.chart.data.datasets[u.datasetIndex] && this.chart.getDatasetMeta(u.datasetIndex).controller.getParsed(u.index) !== void 0);
    const l = this.chart.getElementsAtEventForMode(t, o.mode, o, i);
    return o.reverse && l.reverse(), l;
  }
  _positionChanged(t, n) {
    const { caretX: i, caretY: r, options: o } = this, l = xr[o.position].call(this, t, n);
    return l !== !1 && (i !== l.x || r !== l.y);
  }
}
Y(Yc, "positioners", xr);
var B2 = {
  id: "tooltip",
  _element: Yc,
  positioners: xr,
  afterInit(e, t, n) {
    n && (e.tooltip = new Yc({
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
    callbacks: iy
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
const F2 = (e, t, n, i) => (typeof t == "string" ? (n = e.push(t) - 1, i.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function H2(e, t, n, i) {
  const r = e.indexOf(t);
  if (r === -1)
    return F2(e, t, n, i);
  const o = e.lastIndexOf(t);
  return r !== o ? n : r;
}
const W2 = (e, t) => e === null ? null : re(Math.round(e), 0, t);
function Im(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Kc extends Is {
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
    if (xt(t))
      return null;
    const i = this.getLabels();
    return n = isFinite(n) && i[n] === t ? n : H2(i, t, st(n, t), this._addedLabels), W2(n, i.length - 1);
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
    for (let l = t; l <= n; l++)
      r.push({
        value: l
      });
    return r;
  }
  getLabelForValue(t) {
    return Im.call(this, t);
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
Y(Kc, "id", "category"), Y(Kc, "defaults", {
  ticks: {
    callback: Im
  }
});
function V2(e, t) {
  const n = [], { bounds: r, step: o, min: l, max: u, precision: c, count: d, maxTicks: p, maxDigits: g, includeBounds: _ } = e, x = o || 1, S = p - 1, { min: k, max: C } = t, w = !xt(l), b = !xt(u), P = !xt(d), T = (C - k) / (g + 1);
  let E = Op((C - k) / S / x) * x, N, D, A, H;
  if (E < 1e-14 && !w && !b)
    return [
      {
        value: k
      },
      {
        value: C
      }
    ];
  H = Math.ceil(C / E) - Math.floor(k / E), H > S && (E = Op(H * E / S / x) * x), xt(c) || (N = Math.pow(10, c), E = Math.ceil(E * N) / N), r === "ticks" ? (D = Math.floor(k / E) * E, A = Math.ceil(C / E) * E) : (D = k, A = C), w && b && o && Kw((u - l) / o, E / 1e3) ? (H = Math.round(Math.min((u - l) / E, p)), E = (u - l) / H, D = l, A = u) : P ? (D = w ? l : D, A = b ? u : A, H = d - 1, E = (A - D) / H) : (H = (A - D) / E, zr(H, Math.round(H), E / 1e3) ? H = Math.round(H) : H = Math.ceil(H));
  const j = Math.max(Np(E), Np(D));
  N = Math.pow(10, xt(c) ? j : c), D = Math.round(D * N) / N, A = Math.round(A * N) / N;
  let V = 0;
  for (w && (_ && D !== l ? (n.push({
    value: l
  }), D < l && V++, zr(Math.round((D + V * E) * N) / N, l, Dm(l, T, e)) && V++) : D < l && V++); V < H; ++V) {
    const U = Math.round((D + V * E) * N) / N;
    if (b && U > u)
      break;
    n.push({
      value: U
    });
  }
  return b && _ && A !== u ? n.length && zr(n[n.length - 1].value, u, Dm(u, T, e)) ? n[n.length - 1].value = u : n.push({
    value: u
  }) : (!b || A === u) && n.push({
    value: A
  }), n;
}
function Dm(e, t, { horizontal: n, minRotation: i }) {
  const r = Mn(i), o = (n ? Math.sin(r) : Math.cos(r)) || 1e-3, l = 0.75 * t * ("" + e).length;
  return Math.min(t / o, l);
}
class Z2 extends Is {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, n) {
    return xt(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: n, maxDefined: i } = this.getUserBounds();
    let { min: r, max: o } = this;
    const l = (c) => r = n ? r : c, u = (c) => o = i ? o : c;
    if (t) {
      const c = cn(r), d = cn(o);
      c < 0 && d < 0 ? u(0) : c > 0 && d > 0 && l(0);
    }
    if (r === o) {
      let c = o === 0 ? 1 : Math.abs(o * 0.05);
      u(o + c), t || l(r - c);
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
    }, o = this._range || this, l = V2(r, o);
    return t.bounds === "ticks" && Gw(l, this, "value"), t.reverse ? (l.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), l;
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
    return Jh(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Gc extends Z2 {
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = ae(t) ? t : 0, this.max = ae(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, i = Mn(this.options.ticks.minRotation), r = (t ? Math.sin(i) : Math.cos(i)) || 1e-3, o = this._resolveTickFontOptions(0);
    return Math.ceil(n / Math.min(40, o.lineHeight / r));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
Y(Gc, "id", "linear"), Y(Gc, "defaults", {
  ticks: {
    callback: Pv.formatters.numeric
  }
});
const Ll = {
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
}, ge = /* @__PURE__ */ Object.keys(Ll);
function Rm(e, t) {
  return e - t;
}
function jm(e, t) {
  if (xt(t))
    return null;
  const n = e._adapter, { parser: i, round: r, isoWeekday: o } = e._parseOpts;
  let l = t;
  return typeof i == "function" && (l = i(l)), ae(l) || (l = typeof i == "string" ? n.parse(l, i) : n.parse(l)), l === null ? null : (r && (l = r === "week" && (to(o) || o === !0) ? n.startOf(l, "isoWeek", o) : n.startOf(l, r)), +l);
}
function Bm(e, t, n, i) {
  const r = ge.length;
  for (let o = ge.indexOf(e); o < r - 1; ++o) {
    const l = Ll[ge[o]], u = l.steps ? l.steps : Number.MAX_SAFE_INTEGER;
    if (l.common && Math.ceil((n - t) / (u * l.size)) <= i)
      return ge[o];
  }
  return ge[r - 1];
}
function U2(e, t, n, i, r) {
  for (let o = ge.length - 1; o >= ge.indexOf(n); o--) {
    const l = ge[o];
    if (Ll[l].common && e._adapter.diff(r, i, l) >= t - 1)
      return l;
  }
  return ge[n ? ge.indexOf(n) : 0];
}
function $2(e) {
  for (let t = ge.indexOf(e) + 1, n = ge.length; t < n; ++t)
    if (Ll[ge[t]].common)
      return ge[t];
}
function Fm(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: i, hi: r } = qh(n, t), o = n[i] >= t ? n[i] : n[r];
    e[o] = !0;
  }
}
function Y2(e, t, n, i) {
  const r = e._adapter, o = +r.startOf(t[0].value, i), l = t[t.length - 1].value;
  let u, c;
  for (u = o; u <= l; u = +r.add(u, 1, i))
    c = n[u], c >= 0 && (t[c].major = !0);
  return t;
}
function Hm(e, t, n) {
  const i = [], r = {}, o = t.length;
  let l, u;
  for (l = 0; l < o; ++l)
    u = t[l], r[u] = l, i.push({
      value: u,
      major: !1
    });
  return o === 0 || !n ? i : Y2(e, i, r, n);
}
class rl extends Is {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, n = {}) {
    const i = t.time || (t.time = {}), r = this._adapter = new zb._date(t.adapters.date);
    r.init(n), Er(i.displayFormats, r.formats()), this._parseOpts = {
      parser: i.parser,
      round: i.round,
      isoWeekday: i.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : jm(this, t);
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
    let { min: r, max: o, minDefined: l, maxDefined: u } = this.getUserBounds();
    function c(d) {
      !l && !isNaN(d.min) && (r = Math.min(r, d.min)), !u && !isNaN(d.max) && (o = Math.max(o, d.max));
    }
    (!l || !u) && (c(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && c(this.getMinMax(!1))), r = ae(r) && !isNaN(r) ? r : +n.startOf(Date.now(), i), o = ae(o) && !isNaN(o) ? o : +n.endOf(Date.now(), i) + 1, this.min = Math.min(r, o - 1), this.max = Math.max(r + 1, o);
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
    const o = this.min, l = this.max, u = tk(r, o, l);
    return this._unit = n.unit || (i.autoSkip ? Bm(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : U2(this, u.length, n.minUnit, this.min, this.max)), this._majorUnit = !i.major.enabled || this._unit === "year" ? void 0 : $2(this._unit), this.initOffsets(r), t.reverse && u.reverse(), Hm(this, u, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let n = 0, i = 0, r, o;
    this.options.offset && t.length && (r = this.getDecimalForValue(t[0]), t.length === 1 ? n = 1 - r : n = (this.getDecimalForValue(t[1]) - r) / 2, o = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? i = o : i = (o - this.getDecimalForValue(t[t.length - 2])) / 2);
    const l = t.length < 3 ? 0.5 : 0.25;
    n = re(n, 0, l), i = re(i, 0, l), this._offsets = {
      start: n,
      end: i,
      factor: 1 / (n + 1 + i)
    };
  }
  _generate() {
    const t = this._adapter, n = this.min, i = this.max, r = this.options, o = r.time, l = o.unit || Bm(o.minUnit, n, i, this._getLabelCapacity(n)), u = st(r.ticks.stepSize, 1), c = l === "week" ? o.isoWeekday : !1, d = to(c) || c === !0, p = {};
    let g = n, _, x;
    if (d && (g = +t.startOf(g, "isoWeek", c)), g = +t.startOf(g, d ? "day" : l), t.diff(i, n, l) > 1e5 * u)
      throw new Error(n + " and " + i + " are too far apart with stepSize of " + u + " " + l);
    const S = r.ticks.source === "data" && this.getDataTimestamps();
    for (_ = g, x = 0; _ < i; _ = +t.add(_, u, l), x++)
      Fm(p, _, S);
    return (_ === i || r.bounds === "ticks" || x === 1) && Fm(p, _, S), Object.keys(p).sort(Rm).map((k) => +k);
  }
  getLabelForValue(t) {
    const n = this._adapter, i = this.options.time;
    return i.tooltipFormat ? n.format(t, i.tooltipFormat) : n.format(t, i.displayFormats.datetime);
  }
  format(t, n) {
    const r = this.options.time.displayFormats, o = this._unit, l = n || r[o];
    return this._adapter.format(t, l);
  }
  _tickFormatFunction(t, n, i, r) {
    const o = this.options, l = o.ticks.callback;
    if (l)
      return Lt(l, [
        t,
        n,
        i
      ], this);
    const u = o.time.displayFormats, c = this._unit, d = this._majorUnit, p = c && u[c], g = d && u[d], _ = i[n], x = d && g && _ && _.major;
    return this._adapter.format(t, r || (x ? g : p));
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
    const n = this.options.ticks, i = this.ctx.measureText(t).width, r = Mn(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(r), l = Math.sin(r), u = this._resolveTickFontOptions(0).size;
    return {
      w: i * o + u * l,
      h: i * l + u * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, i = n.displayFormats, r = i[n.unit] || i.millisecond, o = this._tickFormatFunction(t, 0, Hm(this, [
      t
    ], this._majorUnit), r), l = this._getLabelSize(o), u = Math.floor(this.isHorizontal() ? this.width / l.w : this.height / l.h) - 1;
    return u > 0 ? u : 1;
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
      t.push(jm(this, r[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return wv(t.sort(Rm));
  }
}
Y(rl, "id", "time"), Y(rl, "defaults", {
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
function oa(e, t, n) {
  let i = 0, r = e.length - 1, o, l, u, c;
  n ? (t >= e[i].pos && t <= e[r].pos && ({ lo: i, hi: r } = Ti(e, "pos", t)), { pos: o, time: u } = e[i], { pos: l, time: c } = e[r]) : (t >= e[i].time && t <= e[r].time && ({ lo: i, hi: r } = Ti(e, "time", t)), { time: o, pos: u } = e[i], { time: l, pos: c } = e[r]);
  const d = l - o;
  return d ? u + (c - u) * (t - o) / d : u;
}
class Wm extends rl {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = oa(n, this.min), this._tableRange = oa(n, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: n, max: i } = this, r = [], o = [];
    let l, u, c, d, p;
    for (l = 0, u = t.length; l < u; ++l)
      d = t[l], d >= n && d <= i && r.push(d);
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
    for (l = 0, u = r.length; l < u; ++l)
      p = r[l + 1], c = r[l - 1], d = r[l], Math.round((p + c) / 2) !== d && o.push({
        time: d,
        pos: l / (u - 1)
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
    return (oa(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, i = this.getDecimalForPixel(t) / n.factor - n.end;
    return oa(this._table, i * this._tableRange + this._minPos, !0);
  }
}
Y(Wm, "id", "timeseries"), Y(Wm, "defaults", rl.defaults);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sy = (...e) => e.filter((t, n, i) => !!t && t.trim() !== "" && i.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const K2 = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const G2 = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, i) => i ? i.toUpperCase() : n.toLowerCase()
);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vm = (e) => {
  const t = G2(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Zu = {
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
const X2 = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, q2 = G.createContext({}), Q2 = () => G.useContext(q2), J2 = G.forwardRef(
  ({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: i, className: r = "", children: o, iconNode: l, ...u }, c) => {
    const {
      size: d = 24,
      strokeWidth: p = 2,
      absoluteStrokeWidth: g = !1,
      color: _ = "currentColor",
      className: x = ""
    } = Q2() ?? {}, S = i ?? g ? Number(n ?? p) * 24 / Number(t ?? d) : n ?? p;
    return G.createElement(
      "svg",
      {
        ref: c,
        ...Zu,
        width: t ?? d ?? Zu.width,
        height: t ?? d ?? Zu.height,
        stroke: e ?? _,
        strokeWidth: S,
        className: sy("lucide", x, r),
        ...!o && !X2(u) && { "aria-hidden": "true" },
        ...u
      },
      [
        ...l.map(([k, C]) => G.createElement(k, C)),
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
const ft = (e, t) => {
  const n = G.forwardRef(
    ({ className: i, ...r }, o) => G.createElement(J2, {
      ref: o,
      iconNode: t,
      className: sy(
        `lucide-${K2(Vm(e))}`,
        `lucide-${e}`,
        i
      ),
      ...r
    })
  );
  return n.displayName = Vm(e), n;
};
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tP = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
], ry = ft("activity", tP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eP = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
], nP = ft("briefcase", eP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iP = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
], oy = ft("chart-column", iP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sP = [
  [
    "path",
    {
      d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
      key: "pzmjnu"
    }
  ],
  ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83", key: "k2fpak" }]
], rP = ft("chart-pie", sP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oP = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Zm = ft("chevron-down", oP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aP = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], Um = ft("circle-alert", aP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lP = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], uP = ft("database", lP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cP = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], Uu = ft("download", cP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hP = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], ay = ft("external-link", hP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dP = [
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
], $m = ft("file-spreadsheet", dP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fP = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
], pP = ft("file-text", fP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mP = [
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
], gP = ft("fish", mP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _P = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
], vP = ft("flame", _P);
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
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
], Ym = ft("funnel", yP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xP = [
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
], wP = ft("hard-drive", xP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kP = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
], bP = ft("inbox", kP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const SP = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], PP = ft("layout-dashboard", SP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MP = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
], Xc = ft("lightbulb", MP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CP = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], LP = ft("lock", CP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TP = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
], EP = ft("log-out", TP);
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
], ly = ft("map-pinned", zP);
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
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
], NP = ft("map-pin", OP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const AP = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], IP = ft("menu", AP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DP = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  [
    "path",
    {
      d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
      key: "1fd625"
    }
  ]
], RP = ft("octagon-alert", DP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jP = [
  ["path", { d: "M16.247 7.761a6 6 0 0 1 0 8.478", key: "1fwjs5" }],
  ["path", { d: "M19.075 4.933a10 10 0 0 1 0 14.134", key: "ehdyv1" }],
  ["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134", key: "1q22gi" }],
  ["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478", key: "r2q7qm" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
], BP = ft("radio", jP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FP = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], HP = ft("refresh-cw", FP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WP = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], VP = ft("rotate-ccw", WP);
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
], uy = ft("satellite", ZP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const UP = [
  ["path", { d: "m13.5 8.5-5 5", key: "1cs55j" }],
  ["path", { d: "m8.5 8.5 5 5", key: "a8mexj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], $P = ft("search-x", UP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const YP = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], KP = ft("search", YP);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], cy = ft("shield-check", GP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const XP = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], qP = ft("shield", XP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QP = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }]
], hy = ft("table", QP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const JP = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
], tM = ft("trending-down", JP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eM = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
], nM = ft("trending-up", eM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iM = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], sM = ft("upload", iM);
function rM(e) {
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
function oM(e) {
  if (!e) return "-";
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : t.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
function dy(e) {
  const t = Number(e || 0);
  return t > 80 ? "high" : t >= 50 ? "medium" : "low";
}
const aM = [
  {
    title: "Monitoring",
    items: [
      { id: "overview", label: "Overview", icon: PP },
      { id: "map", label: "Threat Map", icon: ly },
      { id: "alerts", label: "Live Alerts", icon: BP }
    ]
  },
  {
    title: "Analysis",
    items: [
      { id: "analytics", label: "Analytics", icon: oy },
      { id: "incidents", label: "Incidents", icon: hy }
    ]
  },
  {
    title: "Intelligence",
    items: [
      { id: "osint", label: "OSINT Feed", icon: uy },
      { id: "reco", label: "Recommendations", icon: Xc }
    ]
  }
];
function lM({ activeSection: e, onSelect: t, isOpen: n, syncStatus: i, lastSync: r }) {
  function o(u) {
    t == null || t(u);
    const c = document.getElementById(`section-${u}`);
    c && c.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  const l = !!(i != null && i.running);
  return /* @__PURE__ */ v.jsxs("aside", { className: `sidebar ${n ? "is-open" : ""}`, "aria-label": "Primary navigation", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "sidebar-head", children: [
      /* @__PURE__ */ v.jsx("div", { className: "brand-mark", "aria-hidden": "true", children: /* @__PURE__ */ v.jsx(qP, { size: 20, strokeWidth: 2 }) }),
      /* @__PURE__ */ v.jsxs("div", { className: "brand-copy", children: [
        /* @__PURE__ */ v.jsx("div", { className: "brand-title", children: "Wildlife Intelligence" }),
        /* @__PURE__ */ v.jsx("div", { className: "brand-sub", children: "Command Center" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("nav", { className: "sidebar-body", children: aM.map((u) => /* @__PURE__ */ v.jsxs("div", { className: "nav-group", children: [
      /* @__PURE__ */ v.jsx("div", { className: "nav-group-title", children: u.title }),
      u.items.map(({ id: c, label: d, icon: p }) => {
        const g = e === c;
        return /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            className: `nav-item ${g ? "is-active" : ""}`,
            onClick: () => o(c),
            "aria-current": g ? "page" : void 0,
            children: [
              /* @__PURE__ */ v.jsx(p, { size: 16, className: "nav-icon", strokeWidth: 2 }),
              /* @__PURE__ */ v.jsx("span", { children: d }),
              /* @__PURE__ */ v.jsx("span", { className: "nav-dot", "aria-hidden": "true" })
            ]
          },
          c
        );
      })
    ] }, u.title)) }),
    /* @__PURE__ */ v.jsx("div", { className: "sidebar-foot", children: /* @__PURE__ */ v.jsxs("div", { className: "sync-card", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "sync-row", children: [
        /* @__PURE__ */ v.jsx("span", { children: "Data sync" }),
        /* @__PURE__ */ v.jsxs("span", { className: `pulse ${l ? "" : "is-idle"}`, children: [
          /* @__PURE__ */ v.jsx("span", { className: "pulse-dot" }),
          l ? "Live" : "Idle"
        ] })
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: "sync-row", children: [
        /* @__PURE__ */ v.jsx("span", { children: "Last update" }),
        /* @__PURE__ */ v.jsx("strong", { className: "mono", children: oM(r) })
      ] })
    ] }) })
  ] });
}
function uM({
  activeSection: e,
  busy: t,
  syncStatus: n,
  onRefresh: i,
  onExport: r,
  onToggleMenu: o,
  onLogout: l
}) {
  const u = {
    overview: "Overview",
    map: "Threat Map",
    alerts: "Live Alerts",
    analytics: "Analytics",
    incidents: "Incidents",
    osint: "OSINT Feed",
    reco: "Recommendations"
  }, c = !!(n != null && n.running), d = c ? "Search in progress" : "Auto search active", p = (n == null ? void 0 : n.progress) || {}, g = String((n == null ? void 0 : n.message) || "").trim(), _ = typeof p.stage == "string" && p.stage !== "-" ? p.stage : "", x = typeof p.provider == "string" && p.provider !== "-" ? p.provider : "", S = typeof p.language == "string" && p.language !== "-" ? p.language : "", k = typeof p.query == "string" && p.query !== "-" ? p.query : "", C = [x, S].filter(Boolean).join(" / "), w = [];
  _ && w.push(`stage: ${_}`), C && w.push(C), k && w.push(`q: ${k}`);
  const b = c ? w.join(" • ") || g || "Collecting live reports" : "", [P, T] = G.useState(null), E = G.useRef(null), N = G.useRef(null);
  G.useEffect(() => {
    function U(rt) {
      E.current && !E.current.contains(rt.target) && N.current && !N.current.contains(rt.target) && T(null);
    }
    function vt(rt) {
      rt.key === "Escape" && T(null);
    }
    return P && (document.addEventListener("mousedown", U), document.addEventListener("keydown", vt)), () => {
      document.removeEventListener("mousedown", U), document.removeEventListener("keydown", vt);
    };
  }, [P]);
  const D = () => typeof import.meta < "u" ? "".trim().replace(/\/$/, "") : "", A = (U) => {
    r(U), T(null);
  }, H = () => {
    window.location.href = `${D()}/api/public/download-csv`, T(null);
  }, j = () => {
    window.location.href = `${D()}/api/public/download-db`, T(null);
  }, V = () => {
    T(null);
    const U = document.createElement("input");
    U.type = "file", U.accept = ".db,.sqlite,.sqlite3", U.onchange = async (vt) => {
      var J;
      const rt = (J = vt.target.files) == null ? void 0 : J[0];
      if (!rt || !confirm(`Restore database from "${rt.name}"? This will replace all current data.`)) return;
      const lt = new FormData();
      lt.append("file", rt);
      try {
        const I = await (await fetch(`${D()}/api/public/upload-db`, { method: "POST", body: lt })).json();
        I.ok ? (alert(`Database restored!

Total rows: ${I.total_rows}
Poaching articles: ${I.poaching_rows}
Predictor retrained: ${I.predictor_retrained ? "Yes" : "No"}`), window.location.reload()) : alert(`Restore failed: ${I.detail || "Unknown error"}`);
      } catch (ut) {
        alert(`Upload failed: ${ut.message}`);
      }
    }, U.click();
  };
  return /* @__PURE__ */ v.jsxs("header", { className: "topbar", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "topbar-left", children: [
      /* @__PURE__ */ v.jsx(
        "button",
        {
          type: "button",
          className: "mobile-menu",
          onClick: o,
          "aria-label": "Open navigation menu",
          children: /* @__PURE__ */ v.jsx(IP, { size: 18 })
        }
      ),
      /* @__PURE__ */ v.jsxs("div", { className: "breadcrumb", children: [
        /* @__PURE__ */ v.jsx("span", { children: "Wildlife Intelligence" }),
        /* @__PURE__ */ v.jsx("span", { className: "sep", children: "/" }),
        /* @__PURE__ */ v.jsx("strong", { children: u[e] || "Overview" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: "topbar-center", children: /* @__PURE__ */ v.jsxs("div", { className: `sync-pill ${c ? "is-running" : "is-idle"}`, role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ v.jsx("span", { className: "sync-pill-dot", "aria-hidden": "true" }),
      /* @__PURE__ */ v.jsx("span", { className: "sync-pill-label", children: d }),
      b ? /* @__PURE__ */ v.jsx("span", { className: "sync-pill-meta", children: b }) : null
    ] }) }),
    /* @__PURE__ */ v.jsxs("div", { className: "topbar-right", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "dropdown", ref: E, children: [
        /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            className: "btn",
            onClick: () => T(P === "export" ? null : "export"),
            "aria-haspopup": "menu",
            "aria-expanded": P === "export",
            children: [
              /* @__PURE__ */ v.jsx(Uu, { size: 15 }),
              /* @__PURE__ */ v.jsx("span", { className: "btn-label", children: "Export" }),
              /* @__PURE__ */ v.jsx(Zm, { size: 13, className: `dropdown-caret ${P === "export" ? "is-open" : ""}` })
            ]
          }
        ),
        P === "export" && /* @__PURE__ */ v.jsxs("div", { className: "dropdown-menu", role: "menu", children: [
          /* @__PURE__ */ v.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: () => A("csv"), children: [
            /* @__PURE__ */ v.jsx(Uu, { size: 14 }),
            /* @__PURE__ */ v.jsx("span", { children: "Export as CSV" })
          ] }),
          /* @__PURE__ */ v.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: () => A("excel"), children: [
            /* @__PURE__ */ v.jsx($m, { size: 14 }),
            /* @__PURE__ */ v.jsx("span", { children: "Export as Excel" })
          ] }),
          /* @__PURE__ */ v.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: () => A("excel_incidents_reports"), children: [
            /* @__PURE__ */ v.jsx($m, { size: 14 }),
            /* @__PURE__ */ v.jsx("span", { children: "Excel (2-Sheet)" })
          ] }),
          /* @__PURE__ */ v.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: () => A("pdf"), children: [
            /* @__PURE__ */ v.jsx(pP, { size: 14 }),
            /* @__PURE__ */ v.jsx("span", { children: "Export as PDF" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: "dropdown", ref: N, children: [
        /* @__PURE__ */ v.jsxs(
          "button",
          {
            type: "button",
            className: "btn",
            onClick: () => T(P === "database" ? null : "database"),
            "aria-haspopup": "menu",
            "aria-expanded": P === "database",
            children: [
              /* @__PURE__ */ v.jsx(uP, { size: 15 }),
              /* @__PURE__ */ v.jsx("span", { className: "btn-label", children: "Database" }),
              /* @__PURE__ */ v.jsx(Zm, { size: 13, className: `dropdown-caret ${P === "database" ? "is-open" : ""}` })
            ]
          }
        ),
        P === "database" && /* @__PURE__ */ v.jsxs("div", { className: "dropdown-menu", role: "menu", children: [
          /* @__PURE__ */ v.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: H, children: [
            /* @__PURE__ */ v.jsx(Uu, { size: 14 }),
            /* @__PURE__ */ v.jsx("span", { children: "Download All Data (CSV)" })
          ] }),
          /* @__PURE__ */ v.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: j, children: [
            /* @__PURE__ */ v.jsx(wP, { size: 14 }),
            /* @__PURE__ */ v.jsx("span", { children: "Download Database" })
          ] }),
          /* @__PURE__ */ v.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: V, children: [
            /* @__PURE__ */ v.jsx(sM, { size: 14 }),
            /* @__PURE__ */ v.jsx("span", { children: "Upload Database" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: "topbar-divider" }),
      /* @__PURE__ */ v.jsxs(
        "button",
        {
          type: "button",
          className: "btn btn-ghost",
          onClick: i,
          disabled: t,
          "aria-label": "Refresh data",
          children: [
            /* @__PURE__ */ v.jsx(HP, { size: 15, className: t ? "spin" : "" }),
            /* @__PURE__ */ v.jsx("span", { className: "btn-label", children: "Refresh" })
          ]
        }
      ),
      /* @__PURE__ */ v.jsxs("button", { type: "button", className: "btn btn-ghost", onClick: l, "aria-label": "Logout", children: [
        /* @__PURE__ */ v.jsx(EP, { size: 15 }),
        /* @__PURE__ */ v.jsx("span", { className: "btn-label", children: "Logout" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("style", { children: `
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      ` })
  ] });
}
function cM(e) {
  const t = Number(e || 0);
  return Number.isFinite(t) ? t >= 1e3 ? t.toLocaleString("en-US") : t.toString() : "0";
}
function hM({ value: e }) {
  if (e == null) return null;
  const t = e >= 0, n = t ? nM : tM;
  return /* @__PURE__ */ v.jsxs("span", { className: `kpi-trend ${t ? "is-up" : "is-down"}`, children: [
    /* @__PURE__ */ v.jsx(n, { size: 12 }),
    Math.abs(e).toFixed(1),
    "%"
  ] });
}
function dM({ summary: e, loading: t }) {
  const n = (e == null ? void 0 : e.kpis) || e || {}, i = [
    {
      id: "total",
      label: "Total Incidents",
      value: n.total_incidents ?? 0,
      trend: n.trend_incidents,
      icon: RP,
      tone: "primary",
      hint: "All tracked events"
    },
    {
      id: "high",
      label: "High Risk",
      value: n.high_risk_count ?? n.high_risk ?? 0,
      trend: n.trend_high_risk,
      icon: vP,
      tone: "danger",
      hint: "Risk score above 80"
    },
    {
      id: "states",
      label: "States Affected",
      value: n.states_affected ?? n.states_active ?? 0,
      trend: n.trend_states,
      icon: NP,
      tone: "default",
      hint: "With recent activity"
    },
    {
      id: "species",
      label: "Species Impacted",
      value: n.species_impacted ?? n.species_tracked ?? 0,
      trend: n.trend_species,
      icon: gP,
      tone: "warn",
      hint: "Unique species tracked"
    }
  ];
  return t && !e ? /* @__PURE__ */ v.jsx("div", { className: "kpi-grid", "aria-busy": "true", children: Array.from({ length: 4 }).map((r, o) => /* @__PURE__ */ v.jsx("div", { className: "skel skel-kpi" }, o)) }) : /* @__PURE__ */ v.jsx("div", { className: "kpi-grid", children: i.map(({ id: r, label: o, value: l, trend: u, icon: c, tone: d, hint: p }) => /* @__PURE__ */ v.jsxs(
    "article",
    {
      className: `kpi-card ${d === "danger" ? "is-danger" : d === "primary" ? "is-primary" : d === "warn" ? "is-warn" : ""}`,
      children: [
        /* @__PURE__ */ v.jsxs("div", { className: "kpi-head", children: [
          /* @__PURE__ */ v.jsx("div", { className: "kpi-label", children: o }),
          /* @__PURE__ */ v.jsx("div", { className: "kpi-icon", children: /* @__PURE__ */ v.jsx(c, { size: 16, strokeWidth: 2 }) })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "kpi-body", children: [
          /* @__PURE__ */ v.jsx("div", { className: "kpi-value", children: cM(l) }),
          /* @__PURE__ */ v.jsx(hM, { value: u })
        ] }),
        /* @__PURE__ */ v.jsx("div", { className: "kpi-meta", children: p })
      ]
    },
    r
  )) });
}
var qc = { exports: {} };
/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
(function(e, t) {
  (function(n, i) {
    i(t);
  })(H0, function(n) {
    var i = "1.9.4";
    function r(s) {
      var a, h, f, m;
      for (h = 1, f = arguments.length; h < f; h++) {
        m = arguments[h];
        for (a in m)
          s[a] = m[a];
      }
      return s;
    }
    var o = Object.create || /* @__PURE__ */ function() {
      function s() {
      }
      return function(a) {
        return s.prototype = a, new s();
      };
    }();
    function l(s, a) {
      var h = Array.prototype.slice;
      if (s.bind)
        return s.bind.apply(s, h.call(arguments, 1));
      var f = h.call(arguments, 2);
      return function() {
        return s.apply(a, f.length ? f.concat(h.call(arguments)) : arguments);
      };
    }
    var u = 0;
    function c(s) {
      return "_leaflet_id" in s || (s._leaflet_id = ++u), s._leaflet_id;
    }
    function d(s, a, h) {
      var f, m, y, M;
      return M = function() {
        f = !1, m && (y.apply(h, m), m = !1);
      }, y = function() {
        f ? m = arguments : (s.apply(h, arguments), setTimeout(M, a), f = !0);
      }, y;
    }
    function p(s, a, h) {
      var f = a[1], m = a[0], y = f - m;
      return s === f && h ? s : ((s - m) % y + y) % y + m;
    }
    function g() {
      return !1;
    }
    function _(s, a) {
      if (a === !1)
        return s;
      var h = Math.pow(10, a === void 0 ? 6 : a);
      return Math.round(s * h) / h;
    }
    function x(s) {
      return s.trim ? s.trim() : s.replace(/^\s+|\s+$/g, "");
    }
    function S(s) {
      return x(s).split(/\s+/);
    }
    function k(s, a) {
      Object.prototype.hasOwnProperty.call(s, "options") || (s.options = s.options ? o(s.options) : {});
      for (var h in a)
        s.options[h] = a[h];
      return s.options;
    }
    function C(s, a, h) {
      var f = [];
      for (var m in s)
        f.push(encodeURIComponent(h ? m.toUpperCase() : m) + "=" + encodeURIComponent(s[m]));
      return (!a || a.indexOf("?") === -1 ? "?" : "&") + f.join("&");
    }
    var w = /\{ *([\w_ -]+) *\}/g;
    function b(s, a) {
      return s.replace(w, function(h, f) {
        var m = a[f];
        if (m === void 0)
          throw new Error("No value provided for variable " + h);
        return typeof m == "function" && (m = m(a)), m;
      });
    }
    var P = Array.isArray || function(s) {
      return Object.prototype.toString.call(s) === "[object Array]";
    };
    function T(s, a) {
      for (var h = 0; h < s.length; h++)
        if (s[h] === a)
          return h;
      return -1;
    }
    var E = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    function N(s) {
      return window["webkit" + s] || window["moz" + s] || window["ms" + s];
    }
    var D = 0;
    function A(s) {
      var a = +/* @__PURE__ */ new Date(), h = Math.max(0, 16 - (a - D));
      return D = a + h, window.setTimeout(s, h);
    }
    var H = window.requestAnimationFrame || N("RequestAnimationFrame") || A, j = window.cancelAnimationFrame || N("CancelAnimationFrame") || N("CancelRequestAnimationFrame") || function(s) {
      window.clearTimeout(s);
    };
    function V(s, a, h) {
      if (h && H === A)
        s.call(a);
      else
        return H.call(window, l(s, a));
    }
    function U(s) {
      s && j.call(window, s);
    }
    var vt = {
      __proto__: null,
      extend: r,
      create: o,
      bind: l,
      get lastId() {
        return u;
      },
      stamp: c,
      throttle: d,
      wrapNum: p,
      falseFn: g,
      formatNum: _,
      trim: x,
      splitWords: S,
      setOptions: k,
      getParamString: C,
      template: b,
      isArray: P,
      indexOf: T,
      emptyImageUrl: E,
      requestFn: H,
      cancelFn: j,
      requestAnimFrame: V,
      cancelAnimFrame: U
    };
    function rt() {
    }
    rt.extend = function(s) {
      var a = function() {
        k(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
      }, h = a.__super__ = this.prototype, f = o(h);
      f.constructor = a, a.prototype = f;
      for (var m in this)
        Object.prototype.hasOwnProperty.call(this, m) && m !== "prototype" && m !== "__super__" && (a[m] = this[m]);
      return s.statics && r(a, s.statics), s.includes && (lt(s.includes), r.apply(null, [f].concat(s.includes))), r(f, s), delete f.statics, delete f.includes, f.options && (f.options = h.options ? o(h.options) : {}, r(f.options, s.options)), f._initHooks = [], f.callInitHooks = function() {
        if (!this._initHooksCalled) {
          h.callInitHooks && h.callInitHooks.call(this), this._initHooksCalled = !0;
          for (var y = 0, M = f._initHooks.length; y < M; y++)
            f._initHooks[y].call(this);
        }
      }, a;
    }, rt.include = function(s) {
      var a = this.prototype.options;
      return r(this.prototype, s), s.options && (this.prototype.options = a, this.mergeOptions(s.options)), this;
    }, rt.mergeOptions = function(s) {
      return r(this.prototype.options, s), this;
    }, rt.addInitHook = function(s) {
      var a = Array.prototype.slice.call(arguments, 1), h = typeof s == "function" ? s : function() {
        this[s].apply(this, a);
      };
      return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(h), this;
    };
    function lt(s) {
      if (!(typeof L > "u" || !L || !L.Mixin)) {
        s = P(s) ? s : [s];
        for (var a = 0; a < s.length; a++)
          s[a] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", new Error().stack);
      }
    }
    var J = {
      /* @method on(type: String, fn: Function, context?: Object): this
       * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
       *
       * @alternative
       * @method on(eventMap: Object): this
       * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
       */
      on: function(s, a, h) {
        if (typeof s == "object")
          for (var f in s)
            this._on(f, s[f], a);
        else {
          s = S(s);
          for (var m = 0, y = s.length; m < y; m++)
            this._on(s[m], a, h);
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
      off: function(s, a, h) {
        if (!arguments.length)
          delete this._events;
        else if (typeof s == "object")
          for (var f in s)
            this._off(f, s[f], a);
        else {
          s = S(s);
          for (var m = arguments.length === 1, y = 0, M = s.length; y < M; y++)
            m ? this._off(s[y]) : this._off(s[y], a, h);
        }
        return this;
      },
      // attach listener (without syntactic sugar now)
      _on: function(s, a, h, f) {
        if (typeof a != "function") {
          console.warn("wrong listener type: " + typeof a);
          return;
        }
        if (this._listens(s, a, h) === !1) {
          h === this && (h = void 0);
          var m = { fn: a, ctx: h };
          f && (m.once = !0), this._events = this._events || {}, this._events[s] = this._events[s] || [], this._events[s].push(m);
        }
      },
      _off: function(s, a, h) {
        var f, m, y;
        if (this._events && (f = this._events[s], !!f)) {
          if (arguments.length === 1) {
            if (this._firingCount)
              for (m = 0, y = f.length; m < y; m++)
                f[m].fn = g;
            delete this._events[s];
            return;
          }
          if (typeof a != "function") {
            console.warn("wrong listener type: " + typeof a);
            return;
          }
          var M = this._listens(s, a, h);
          if (M !== !1) {
            var z = f[M];
            this._firingCount && (z.fn = g, this._events[s] = f = f.slice()), f.splice(M, 1);
          }
        }
      },
      // @method fire(type: String, data?: Object, propagate?: Boolean): this
      // Fires an event of the specified type. You can optionally provide a data
      // object — the first argument of the listener function will contain its
      // properties. The event can optionally be propagated to event parents.
      fire: function(s, a, h) {
        if (!this.listens(s, h))
          return this;
        var f = r({}, a, {
          type: s,
          target: this,
          sourceTarget: a && a.sourceTarget || this
        });
        if (this._events) {
          var m = this._events[s];
          if (m) {
            this._firingCount = this._firingCount + 1 || 1;
            for (var y = 0, M = m.length; y < M; y++) {
              var z = m[y], O = z.fn;
              z.once && this.off(s, O, z.ctx), O.call(z.ctx || this, f);
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
      listens: function(s, a, h, f) {
        typeof s != "string" && console.warn('"string" type argument expected');
        var m = a;
        typeof a != "function" && (f = !!a, m = void 0, h = void 0);
        var y = this._events && this._events[s];
        if (y && y.length && this._listens(s, m, h) !== !1)
          return !0;
        if (f) {
          for (var M in this._eventParents)
            if (this._eventParents[M].listens(s, a, h, f))
              return !0;
        }
        return !1;
      },
      // returns the index (number) or false
      _listens: function(s, a, h) {
        if (!this._events)
          return !1;
        var f = this._events[s] || [];
        if (!a)
          return !!f.length;
        h === this && (h = void 0);
        for (var m = 0, y = f.length; m < y; m++)
          if (f[m].fn === a && f[m].ctx === h)
            return m;
        return !1;
      },
      // @method once(…): this
      // Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
      once: function(s, a, h) {
        if (typeof s == "object")
          for (var f in s)
            this._on(f, s[f], a, !0);
        else {
          s = S(s);
          for (var m = 0, y = s.length; m < y; m++)
            this._on(s[m], a, h, !0);
        }
        return this;
      },
      // @method addEventParent(obj: Evented): this
      // Adds an event parent - an `Evented` that will receive propagated events
      addEventParent: function(s) {
        return this._eventParents = this._eventParents || {}, this._eventParents[c(s)] = s, this;
      },
      // @method removeEventParent(obj: Evented): this
      // Removes an event parent, so it will stop receiving propagated events
      removeEventParent: function(s) {
        return this._eventParents && delete this._eventParents[c(s)], this;
      },
      _propagateEvent: function(s) {
        for (var a in this._eventParents)
          this._eventParents[a].fire(s.type, r({
            layer: s.target,
            propagatedFrom: s.target
          }, s), !0);
      }
    };
    J.addEventListener = J.on, J.removeEventListener = J.clearAllEventListeners = J.off, J.addOneTimeEventListener = J.once, J.fireEvent = J.fire, J.hasEventListeners = J.listens;
    var ut = rt.extend(J);
    function I(s, a, h) {
      this.x = h ? Math.round(s) : s, this.y = h ? Math.round(a) : a;
    }
    var $ = Math.trunc || function(s) {
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
        return this.clone()._add(B(s));
      },
      _add: function(s) {
        return this.x += s.x, this.y += s.y, this;
      },
      // @method subtract(otherPoint: Point): Point
      // Returns the result of subtraction of the given point from the current.
      subtract: function(s) {
        return this.clone()._subtract(B(s));
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
        return this.x = $(this.x), this.y = $(this.y), this;
      },
      // @method distanceTo(otherPoint: Point): Number
      // Returns the cartesian distance between the current and the given points.
      distanceTo: function(s) {
        s = B(s);
        var a = s.x - this.x, h = s.y - this.y;
        return Math.sqrt(a * a + h * h);
      },
      // @method equals(otherPoint: Point): Boolean
      // Returns `true` if the given point has the same coordinates.
      equals: function(s) {
        return s = B(s), s.x === this.x && s.y === this.y;
      },
      // @method contains(otherPoint: Point): Boolean
      // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
      contains: function(s) {
        return s = B(s), Math.abs(s.x) <= Math.abs(this.x) && Math.abs(s.y) <= Math.abs(this.y);
      },
      // @method toString(): String
      // Returns a string representation of the point for debugging purposes.
      toString: function() {
        return "Point(" + _(this.x) + ", " + _(this.y) + ")";
      }
    };
    function B(s, a, h) {
      return s instanceof I ? s : P(s) ? new I(s[0], s[1]) : s == null ? s : typeof s == "object" && "x" in s && "y" in s ? new I(s.x, s.y) : new I(s, a, h);
    }
    function X(s, a) {
      if (s)
        for (var h = a ? [s, a] : s, f = 0, m = h.length; f < m; f++)
          this.extend(h[f]);
    }
    X.prototype = {
      // @method extend(point: Point): this
      // Extends the bounds to contain the given point.
      // @alternative
      // @method extend(otherBounds: Bounds): this
      // Extend the bounds to contain the given bounds
      extend: function(s) {
        var a, h;
        if (!s)
          return this;
        if (s instanceof I || typeof s[0] == "number" || "x" in s)
          a = h = B(s);
        else if (s = tt(s), a = s.min, h = s.max, !a || !h)
          return this;
        return !this.min && !this.max ? (this.min = a.clone(), this.max = h.clone()) : (this.min.x = Math.min(a.x, this.min.x), this.max.x = Math.max(h.x, this.max.x), this.min.y = Math.min(a.y, this.min.y), this.max.y = Math.max(h.y, this.max.y)), this;
      },
      // @method getCenter(round?: Boolean): Point
      // Returns the center point of the bounds.
      getCenter: function(s) {
        return B(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          s
        );
      },
      // @method getBottomLeft(): Point
      // Returns the bottom-left point of the bounds.
      getBottomLeft: function() {
        return B(this.min.x, this.max.y);
      },
      // @method getTopRight(): Point
      // Returns the top-right point of the bounds.
      getTopRight: function() {
        return B(this.max.x, this.min.y);
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
        var a, h;
        return typeof s[0] == "number" || s instanceof I ? s = B(s) : s = tt(s), s instanceof X ? (a = s.min, h = s.max) : a = h = s, a.x >= this.min.x && h.x <= this.max.x && a.y >= this.min.y && h.y <= this.max.y;
      },
      // @method intersects(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds
      // intersect if they have at least one point in common.
      intersects: function(s) {
        s = tt(s);
        var a = this.min, h = this.max, f = s.min, m = s.max, y = m.x >= a.x && f.x <= h.x, M = m.y >= a.y && f.y <= h.y;
        return y && M;
      },
      // @method overlaps(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds
      // overlap if their intersection is an area.
      overlaps: function(s) {
        s = tt(s);
        var a = this.min, h = this.max, f = s.min, m = s.max, y = m.x > a.x && f.x < h.x, M = m.y > a.y && f.y < h.y;
        return y && M;
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
        var a = this.min, h = this.max, f = Math.abs(a.x - h.x) * s, m = Math.abs(a.y - h.y) * s;
        return tt(
          B(a.x - f, a.y - m),
          B(h.x + f, h.y + m)
        );
      },
      // @method equals(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle is equivalent to the given bounds.
      equals: function(s) {
        return s ? (s = tt(s), this.min.equals(s.getTopLeft()) && this.max.equals(s.getBottomRight())) : !1;
      }
    };
    function tt(s, a) {
      return !s || s instanceof X ? s : new X(s, a);
    }
    function bt(s, a) {
      if (s)
        for (var h = a ? [s, a] : s, f = 0, m = h.length; f < m; f++)
          this.extend(h[f]);
    }
    bt.prototype = {
      // @method extend(latlng: LatLng): this
      // Extend the bounds to contain the given point
      // @alternative
      // @method extend(otherBounds: LatLngBounds): this
      // Extend the bounds to contain the given bounds
      extend: function(s) {
        var a = this._southWest, h = this._northEast, f, m;
        if (s instanceof nt)
          f = s, m = s;
        else if (s instanceof bt) {
          if (f = s._southWest, m = s._northEast, !f || !m)
            return this;
        } else
          return s ? this.extend(q(s) || ot(s)) : this;
        return !a && !h ? (this._southWest = new nt(f.lat, f.lng), this._northEast = new nt(m.lat, m.lng)) : (a.lat = Math.min(f.lat, a.lat), a.lng = Math.min(f.lng, a.lng), h.lat = Math.max(m.lat, h.lat), h.lng = Math.max(m.lng, h.lng)), this;
      },
      // @method pad(bufferRatio: Number): LatLngBounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(s) {
        var a = this._southWest, h = this._northEast, f = Math.abs(a.lat - h.lat) * s, m = Math.abs(a.lng - h.lng) * s;
        return new bt(
          new nt(a.lat - f, a.lng - m),
          new nt(h.lat + f, h.lng + m)
        );
      },
      // @method getCenter(): LatLng
      // Returns the center point of the bounds.
      getCenter: function() {
        return new nt(
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
        return new nt(this.getNorth(), this.getWest());
      },
      // @method getSouthEast(): LatLng
      // Returns the south-east point of the bounds.
      getSouthEast: function() {
        return new nt(this.getSouth(), this.getEast());
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
        typeof s[0] == "number" || s instanceof nt || "lat" in s ? s = q(s) : s = ot(s);
        var a = this._southWest, h = this._northEast, f, m;
        return s instanceof bt ? (f = s.getSouthWest(), m = s.getNorthEast()) : f = m = s, f.lat >= a.lat && m.lat <= h.lat && f.lng >= a.lng && m.lng <= h.lng;
      },
      // @method intersects(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
      intersects: function(s) {
        s = ot(s);
        var a = this._southWest, h = this._northEast, f = s.getSouthWest(), m = s.getNorthEast(), y = m.lat >= a.lat && f.lat <= h.lat, M = m.lng >= a.lng && f.lng <= h.lng;
        return y && M;
      },
      // @method overlaps(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
      overlaps: function(s) {
        s = ot(s);
        var a = this._southWest, h = this._northEast, f = s.getSouthWest(), m = s.getNorthEast(), y = m.lat > a.lat && f.lat < h.lat, M = m.lng > a.lng && f.lng < h.lng;
        return y && M;
      },
      // @method toBBoxString(): String
      // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
      toBBoxString: function() {
        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
      },
      // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
      // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(s, a) {
        return s ? (s = ot(s), this._southWest.equals(s.getSouthWest(), a) && this._northEast.equals(s.getNorthEast(), a)) : !1;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this._southWest && this._northEast);
      }
    };
    function ot(s, a) {
      return s instanceof bt ? s : new bt(s, a);
    }
    function nt(s, a, h) {
      if (isNaN(s) || isNaN(a))
        throw new Error("Invalid LatLng object: (" + s + ", " + a + ")");
      this.lat = +s, this.lng = +a, h !== void 0 && (this.alt = +h);
    }
    nt.prototype = {
      // @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
      // Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(s, a) {
        if (!s)
          return !1;
        s = q(s);
        var h = Math.max(
          Math.abs(this.lat - s.lat),
          Math.abs(this.lng - s.lng)
        );
        return h <= (a === void 0 ? 1e-9 : a);
      },
      // @method toString(): String
      // Returns a string representation of the point (for debugging purposes).
      toString: function(s) {
        return "LatLng(" + _(this.lat, s) + ", " + _(this.lng, s) + ")";
      },
      // @method distanceTo(otherLatLng: LatLng): Number
      // Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
      distanceTo: function(s) {
        return Fe.distance(this, q(s));
      },
      // @method wrap(): LatLng
      // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
      wrap: function() {
        return Fe.wrapLatLng(this);
      },
      // @method toBounds(sizeInMeters: Number): LatLngBounds
      // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
      toBounds: function(s) {
        var a = 180 * s / 40075017, h = a / Math.cos(Math.PI / 180 * this.lat);
        return ot(
          [this.lat - a, this.lng - h],
          [this.lat + a, this.lng + h]
        );
      },
      clone: function() {
        return new nt(this.lat, this.lng, this.alt);
      }
    };
    function q(s, a, h) {
      return s instanceof nt ? s : P(s) && typeof s[0] != "object" ? s.length === 3 ? new nt(s[0], s[1], s[2]) : s.length === 2 ? new nt(s[0], s[1]) : null : s == null ? s : typeof s == "object" && "lat" in s ? new nt(s.lat, "lng" in s ? s.lng : s.lon, s.alt) : a === void 0 ? null : new nt(s, a, h);
    }
    var qt = {
      // @method latLngToPoint(latlng: LatLng, zoom: Number): Point
      // Projects geographical coordinates into pixel coordinates for a given zoom.
      latLngToPoint: function(s, a) {
        var h = this.projection.project(s), f = this.scale(a);
        return this.transformation._transform(h, f);
      },
      // @method pointToLatLng(point: Point, zoom: Number): LatLng
      // The inverse of `latLngToPoint`. Projects pixel coordinates on a given
      // zoom into geographical coordinates.
      pointToLatLng: function(s, a) {
        var h = this.scale(a), f = this.transformation.untransform(s, h);
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
        var a = this.projection.bounds, h = this.scale(s), f = this.transformation.transform(a.min, h), m = this.transformation.transform(a.max, h);
        return new X(f, m);
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
        var a = this.wrapLng ? p(s.lng, this.wrapLng, !0) : s.lng, h = this.wrapLat ? p(s.lat, this.wrapLat, !0) : s.lat, f = s.alt;
        return new nt(h, a, f);
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring
      // that its center is within the CRS's bounds.
      // Only accepts actual `L.LatLngBounds` instances, not arrays.
      wrapLatLngBounds: function(s) {
        var a = s.getCenter(), h = this.wrapLatLng(a), f = a.lat - h.lat, m = a.lng - h.lng;
        if (f === 0 && m === 0)
          return s;
        var y = s.getSouthWest(), M = s.getNorthEast(), z = new nt(y.lat - f, y.lng - m), O = new nt(M.lat - f, M.lng - m);
        return new bt(z, O);
      }
    }, Fe = r({}, qt, {
      wrapLng: [-180, 180],
      // Mean Earth Radius, as recommended for use by
      // the International Union of Geodesy and Geophysics,
      // see https://rosettacode.org/wiki/Haversine_formula
      R: 6371e3,
      // distance between two geographical points using spherical law of cosines approximation
      distance: function(s, a) {
        var h = Math.PI / 180, f = s.lat * h, m = a.lat * h, y = Math.sin((a.lat - s.lat) * h / 2), M = Math.sin((a.lng - s.lng) * h / 2), z = y * y + Math.cos(f) * Math.cos(m) * M * M, O = 2 * Math.atan2(Math.sqrt(z), Math.sqrt(1 - z));
        return this.R * O;
      }
    }), co = 6378137, Ds = {
      R: co,
      MAX_LATITUDE: 85.0511287798,
      project: function(s) {
        var a = Math.PI / 180, h = this.MAX_LATITUDE, f = Math.max(Math.min(h, s.lat), -h), m = Math.sin(f * a);
        return new I(
          this.R * s.lng * a,
          this.R * Math.log((1 + m) / (1 - m)) / 2
        );
      },
      unproject: function(s) {
        var a = 180 / Math.PI;
        return new nt(
          (2 * Math.atan(Math.exp(s.y / this.R)) - Math.PI / 2) * a,
          s.x * a / this.R
        );
      },
      bounds: function() {
        var s = co * Math.PI;
        return new X([-s, -s], [s, s]);
      }()
    };
    function Rs(s, a, h, f) {
      if (P(s)) {
        this._a = s[0], this._b = s[1], this._c = s[2], this._d = s[3];
        return;
      }
      this._a = s, this._b = a, this._c = h, this._d = f;
    }
    Rs.prototype = {
      // @method transform(point: Point, scale?: Number): Point
      // Returns a transformed point, optionally multiplied by the given scale.
      // Only accepts actual `L.Point` instances, not arrays.
      transform: function(s, a) {
        return this._transform(s.clone(), a);
      },
      // destructive transform (faster)
      _transform: function(s, a) {
        return a = a || 1, s.x = a * (this._a * s.x + this._b), s.y = a * (this._c * s.y + this._d), s;
      },
      // @method untransform(point: Point, scale?: Number): Point
      // Returns the reverse transformation of the given point, optionally divided
      // by the given scale. Only accepts actual `L.Point` instances, not arrays.
      untransform: function(s, a) {
        return a = a || 1, new I(
          (s.x / a - this._b) / this._a,
          (s.y / a - this._d) / this._c
        );
      }
    };
    function yt(s, a, h, f) {
      return new Rs(s, a, h, f);
    }
    var mt = r({}, Fe, {
      code: "EPSG:3857",
      projection: Ds,
      transformation: function() {
        var s = 0.5 / (Math.PI * Ds.R);
        return yt(s, 0.5, -s, 0.5);
      }()
    }), ht = r({}, mt, {
      code: "EPSG:900913"
    });
    function hn(s) {
      return document.createElementNS("http://www.w3.org/2000/svg", s);
    }
    function hi(s, a) {
      var h = "", f, m, y, M, z, O;
      for (f = 0, y = s.length; f < y; f++) {
        for (z = s[f], m = 0, M = z.length; m < M; m++)
          O = z[m], h += (m ? "L" : "M") + O.x + " " + O.y;
        h += a ? K.svg ? "z" : "x" : "";
      }
      return h || "M0 0";
    }
    var di = document.documentElement.style, dn = "ActiveXObject" in window, ho = dn && !document.addEventListener, js = "msLaunchUri" in navigator && !("documentMode" in document), fn = qe("webkit"), Bs = qe("android"), cd = qe("android 2") || qe("android 3"), _y = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), vy = Bs && qe("Google") && _y < 537 && !("AudioNode" in window), Tl = !!window.opera, hd = !js && qe("chrome"), dd = qe("gecko") && !fn && !Tl && !dn, yy = !hd && qe("safari"), fd = qe("phantom"), pd = "OTransition" in di, xy = navigator.platform.indexOf("Win") === 0, md = dn && "transition" in di, El = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !cd, gd = "MozPerspective" in di, wy = !window.L_DISABLE_3D && (md || El || gd) && !pd && !fd, Fs = typeof orientation < "u" || qe("mobile"), ky = Fs && fn, by = Fs && El, _d = !window.PointerEvent && window.MSPointerEvent, vd = !!(window.PointerEvent || _d), yd = "ontouchstart" in window || !!window.TouchEvent, Sy = !window.L_NO_TOUCH && (yd || vd), Py = Fs && Tl, My = Fs && dd, Cy = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Ly = function() {
      var s = !1;
      try {
        var a = Object.defineProperty({}, "passive", {
          get: function() {
            s = !0;
          }
        });
        window.addEventListener("testPassiveEventSupport", g, a), window.removeEventListener("testPassiveEventSupport", g, a);
      } catch {
      }
      return s;
    }(), Ty = function() {
      return !!document.createElement("canvas").getContext;
    }(), zl = !!(document.createElementNS && hn("svg").createSVGRect), Ey = !!zl && function() {
      var s = document.createElement("div");
      return s.innerHTML = "<svg/>", (s.firstChild && s.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
    }(), zy = !zl && function() {
      try {
        var s = document.createElement("div");
        s.innerHTML = '<v:shape adj="1"/>';
        var a = s.firstChild;
        return a.style.behavior = "url(#default#VML)", a && typeof a.adj == "object";
      } catch {
        return !1;
      }
    }(), Oy = navigator.platform.indexOf("Mac") === 0, Ny = navigator.platform.indexOf("Linux") === 0;
    function qe(s) {
      return navigator.userAgent.toLowerCase().indexOf(s) >= 0;
    }
    var K = {
      ie: dn,
      ielt9: ho,
      edge: js,
      webkit: fn,
      android: Bs,
      android23: cd,
      androidStock: vy,
      opera: Tl,
      chrome: hd,
      gecko: dd,
      safari: yy,
      phantom: fd,
      opera12: pd,
      win: xy,
      ie3d: md,
      webkit3d: El,
      gecko3d: gd,
      any3d: wy,
      mobile: Fs,
      mobileWebkit: ky,
      mobileWebkit3d: by,
      msPointer: _d,
      pointer: vd,
      touch: Sy,
      touchNative: yd,
      mobileOpera: Py,
      mobileGecko: My,
      retina: Cy,
      passiveEvents: Ly,
      canvas: Ty,
      svg: zl,
      vml: zy,
      inlineSvg: Ey,
      mac: Oy,
      linux: Ny
    }, xd = K.msPointer ? "MSPointerDown" : "pointerdown", wd = K.msPointer ? "MSPointerMove" : "pointermove", kd = K.msPointer ? "MSPointerUp" : "pointerup", bd = K.msPointer ? "MSPointerCancel" : "pointercancel", Ol = {
      touchstart: xd,
      touchmove: wd,
      touchend: kd,
      touchcancel: bd
    }, Sd = {
      touchstart: By,
      touchmove: fo,
      touchend: fo,
      touchcancel: fo
    }, Zi = {}, Pd = !1;
    function Ay(s, a, h) {
      return a === "touchstart" && jy(), Sd[a] ? (h = Sd[a].bind(this, h), s.addEventListener(Ol[a], h, !1), h) : (console.warn("wrong event specified:", a), g);
    }
    function Iy(s, a, h) {
      if (!Ol[a]) {
        console.warn("wrong event specified:", a);
        return;
      }
      s.removeEventListener(Ol[a], h, !1);
    }
    function Dy(s) {
      Zi[s.pointerId] = s;
    }
    function Ry(s) {
      Zi[s.pointerId] && (Zi[s.pointerId] = s);
    }
    function Md(s) {
      delete Zi[s.pointerId];
    }
    function jy() {
      Pd || (document.addEventListener(xd, Dy, !0), document.addEventListener(wd, Ry, !0), document.addEventListener(kd, Md, !0), document.addEventListener(bd, Md, !0), Pd = !0);
    }
    function fo(s, a) {
      if (a.pointerType !== (a.MSPOINTER_TYPE_MOUSE || "mouse")) {
        a.touches = [];
        for (var h in Zi)
          a.touches.push(Zi[h]);
        a.changedTouches = [a], s(a);
      }
    }
    function By(s, a) {
      a.MSPOINTER_TYPE_TOUCH && a.pointerType === a.MSPOINTER_TYPE_TOUCH && Qt(a), fo(s, a);
    }
    function Fy(s) {
      var a = {}, h, f;
      for (f in s)
        h = s[f], a[f] = h && h.bind ? h.bind(s) : h;
      return s = a, a.type = "dblclick", a.detail = 2, a.isTrusted = !1, a._simulated = !0, a;
    }
    var Hy = 200;
    function Wy(s, a) {
      s.addEventListener("dblclick", a);
      var h = 0, f;
      function m(y) {
        if (y.detail !== 1) {
          f = y.detail;
          return;
        }
        if (!(y.pointerType === "mouse" || y.sourceCapabilities && !y.sourceCapabilities.firesTouchEvents)) {
          var M = zd(y);
          if (!(M.some(function(O) {
            return O instanceof HTMLLabelElement && O.attributes.for;
          }) && !M.some(function(O) {
            return O instanceof HTMLInputElement || O instanceof HTMLSelectElement;
          }))) {
            var z = Date.now();
            z - h <= Hy ? (f++, f === 2 && a(Fy(y))) : f = 1, h = z;
          }
        }
      }
      return s.addEventListener("click", m), {
        dblclick: a,
        simDblclick: m
      };
    }
    function Vy(s, a) {
      s.removeEventListener("dblclick", a.dblclick), s.removeEventListener("click", a.simDblclick);
    }
    var Nl = go(
      ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
    ), Hs = go(
      ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
    ), Cd = Hs === "webkitTransition" || Hs === "OTransition" ? Hs + "End" : "transitionend";
    function Ld(s) {
      return typeof s == "string" ? document.getElementById(s) : s;
    }
    function Ws(s, a) {
      var h = s.style[a] || s.currentStyle && s.currentStyle[a];
      if ((!h || h === "auto") && document.defaultView) {
        var f = document.defaultView.getComputedStyle(s, null);
        h = f ? f[a] : null;
      }
      return h === "auto" ? null : h;
    }
    function _t(s, a, h) {
      var f = document.createElement(s);
      return f.className = a || "", h && h.appendChild(f), f;
    }
    function zt(s) {
      var a = s.parentNode;
      a && a.removeChild(s);
    }
    function po(s) {
      for (; s.firstChild; )
        s.removeChild(s.firstChild);
    }
    function Ui(s) {
      var a = s.parentNode;
      a && a.lastChild !== s && a.appendChild(s);
    }
    function $i(s) {
      var a = s.parentNode;
      a && a.firstChild !== s && a.insertBefore(s, a.firstChild);
    }
    function Al(s, a) {
      if (s.classList !== void 0)
        return s.classList.contains(a);
      var h = mo(s);
      return h.length > 0 && new RegExp("(^|\\s)" + a + "(\\s|$)").test(h);
    }
    function it(s, a) {
      if (s.classList !== void 0)
        for (var h = S(a), f = 0, m = h.length; f < m; f++)
          s.classList.add(h[f]);
      else if (!Al(s, a)) {
        var y = mo(s);
        Il(s, (y ? y + " " : "") + a);
      }
    }
    function jt(s, a) {
      s.classList !== void 0 ? s.classList.remove(a) : Il(s, x((" " + mo(s) + " ").replace(" " + a + " ", " ")));
    }
    function Il(s, a) {
      s.className.baseVal === void 0 ? s.className = a : s.className.baseVal = a;
    }
    function mo(s) {
      return s.correspondingElement && (s = s.correspondingElement), s.className.baseVal === void 0 ? s.className : s.className.baseVal;
    }
    function Ee(s, a) {
      "opacity" in s.style ? s.style.opacity = a : "filter" in s.style && Zy(s, a);
    }
    function Zy(s, a) {
      var h = !1, f = "DXImageTransform.Microsoft.Alpha";
      try {
        h = s.filters.item(f);
      } catch {
        if (a === 1)
          return;
      }
      a = Math.round(a * 100), h ? (h.Enabled = a !== 100, h.Opacity = a) : s.style.filter += " progid:" + f + "(opacity=" + a + ")";
    }
    function go(s) {
      for (var a = document.documentElement.style, h = 0; h < s.length; h++)
        if (s[h] in a)
          return s[h];
      return !1;
    }
    function fi(s, a, h) {
      var f = a || new I(0, 0);
      s.style[Nl] = (K.ie3d ? "translate(" + f.x + "px," + f.y + "px)" : "translate3d(" + f.x + "px," + f.y + "px,0)") + (h ? " scale(" + h + ")" : "");
    }
    function Ht(s, a) {
      s._leaflet_pos = a, K.any3d ? fi(s, a) : (s.style.left = a.x + "px", s.style.top = a.y + "px");
    }
    function pi(s) {
      return s._leaflet_pos || new I(0, 0);
    }
    var Vs, Zs, Dl;
    if ("onselectstart" in document)
      Vs = function() {
        et(window, "selectstart", Qt);
      }, Zs = function() {
        Pt(window, "selectstart", Qt);
      };
    else {
      var Us = go(
        ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
      );
      Vs = function() {
        if (Us) {
          var s = document.documentElement.style;
          Dl = s[Us], s[Us] = "none";
        }
      }, Zs = function() {
        Us && (document.documentElement.style[Us] = Dl, Dl = void 0);
      };
    }
    function Rl() {
      et(window, "dragstart", Qt);
    }
    function jl() {
      Pt(window, "dragstart", Qt);
    }
    var _o, Bl;
    function Fl(s) {
      for (; s.tabIndex === -1; )
        s = s.parentNode;
      s.style && (vo(), _o = s, Bl = s.style.outlineStyle, s.style.outlineStyle = "none", et(window, "keydown", vo));
    }
    function vo() {
      _o && (_o.style.outlineStyle = Bl, _o = void 0, Bl = void 0, Pt(window, "keydown", vo));
    }
    function Td(s) {
      do
        s = s.parentNode;
      while ((!s.offsetWidth || !s.offsetHeight) && s !== document.body);
      return s;
    }
    function Hl(s) {
      var a = s.getBoundingClientRect();
      return {
        x: a.width / s.offsetWidth || 1,
        y: a.height / s.offsetHeight || 1,
        boundingClientRect: a
      };
    }
    var Uy = {
      __proto__: null,
      TRANSFORM: Nl,
      TRANSITION: Hs,
      TRANSITION_END: Cd,
      get: Ld,
      getStyle: Ws,
      create: _t,
      remove: zt,
      empty: po,
      toFront: Ui,
      toBack: $i,
      hasClass: Al,
      addClass: it,
      removeClass: jt,
      setClass: Il,
      getClass: mo,
      setOpacity: Ee,
      testProp: go,
      setTransform: fi,
      setPosition: Ht,
      getPosition: pi,
      get disableTextSelection() {
        return Vs;
      },
      get enableTextSelection() {
        return Zs;
      },
      disableImageDrag: Rl,
      enableImageDrag: jl,
      preventOutline: Fl,
      restoreOutline: vo,
      getSizedParentNode: Td,
      getScale: Hl
    };
    function et(s, a, h, f) {
      if (a && typeof a == "object")
        for (var m in a)
          Vl(s, m, a[m], h);
      else {
        a = S(a);
        for (var y = 0, M = a.length; y < M; y++)
          Vl(s, a[y], h, f);
      }
      return this;
    }
    var Qe = "_leaflet_events";
    function Pt(s, a, h, f) {
      if (arguments.length === 1)
        Ed(s), delete s[Qe];
      else if (a && typeof a == "object")
        for (var m in a)
          Zl(s, m, a[m], h);
      else if (a = S(a), arguments.length === 2)
        Ed(s, function(z) {
          return T(a, z) !== -1;
        });
      else
        for (var y = 0, M = a.length; y < M; y++)
          Zl(s, a[y], h, f);
      return this;
    }
    function Ed(s, a) {
      for (var h in s[Qe]) {
        var f = h.split(/\d/)[0];
        (!a || a(f)) && Zl(s, f, null, null, h);
      }
    }
    var Wl = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      wheel: !("onwheel" in window) && "mousewheel"
    };
    function Vl(s, a, h, f) {
      var m = a + c(h) + (f ? "_" + c(f) : "");
      if (s[Qe] && s[Qe][m])
        return this;
      var y = function(z) {
        return h.call(f || s, z || window.event);
      }, M = y;
      !K.touchNative && K.pointer && a.indexOf("touch") === 0 ? y = Ay(s, a, y) : K.touch && a === "dblclick" ? y = Wy(s, y) : "addEventListener" in s ? a === "touchstart" || a === "touchmove" || a === "wheel" || a === "mousewheel" ? s.addEventListener(Wl[a] || a, y, K.passiveEvents ? { passive: !1 } : !1) : a === "mouseenter" || a === "mouseleave" ? (y = function(z) {
        z = z || window.event, $l(s, z) && M(z);
      }, s.addEventListener(Wl[a], y, !1)) : s.addEventListener(a, M, !1) : s.attachEvent("on" + a, y), s[Qe] = s[Qe] || {}, s[Qe][m] = y;
    }
    function Zl(s, a, h, f, m) {
      m = m || a + c(h) + (f ? "_" + c(f) : "");
      var y = s[Qe] && s[Qe][m];
      if (!y)
        return this;
      !K.touchNative && K.pointer && a.indexOf("touch") === 0 ? Iy(s, a, y) : K.touch && a === "dblclick" ? Vy(s, y) : "removeEventListener" in s ? s.removeEventListener(Wl[a] || a, y, !1) : s.detachEvent("on" + a, y), s[Qe][m] = null;
    }
    function mi(s) {
      return s.stopPropagation ? s.stopPropagation() : s.originalEvent ? s.originalEvent._stopped = !0 : s.cancelBubble = !0, this;
    }
    function Ul(s) {
      return Vl(s, "wheel", mi), this;
    }
    function $s(s) {
      return et(s, "mousedown touchstart dblclick contextmenu", mi), s._leaflet_disable_click = !0, this;
    }
    function Qt(s) {
      return s.preventDefault ? s.preventDefault() : s.returnValue = !1, this;
    }
    function gi(s) {
      return Qt(s), mi(s), this;
    }
    function zd(s) {
      if (s.composedPath)
        return s.composedPath();
      for (var a = [], h = s.target; h; )
        a.push(h), h = h.parentNode;
      return a;
    }
    function Od(s, a) {
      if (!a)
        return new I(s.clientX, s.clientY);
      var h = Hl(a), f = h.boundingClientRect;
      return new I(
        // offset.left/top values are in page scale (like clientX/Y),
        // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
        (s.clientX - f.left) / h.x - a.clientLeft,
        (s.clientY - f.top) / h.y - a.clientTop
      );
    }
    var $y = K.linux && K.chrome ? window.devicePixelRatio : K.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
    function Nd(s) {
      return K.edge ? s.wheelDeltaY / 2 : (
        // Don't trust window-geometry-based delta
        s.deltaY && s.deltaMode === 0 ? -s.deltaY / $y : (
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
    function $l(s, a) {
      var h = a.relatedTarget;
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
    var Yy = {
      __proto__: null,
      on: et,
      off: Pt,
      stopPropagation: mi,
      disableScrollPropagation: Ul,
      disableClickPropagation: $s,
      preventDefault: Qt,
      stop: gi,
      getPropagationPath: zd,
      getMousePosition: Od,
      getWheelDelta: Nd,
      isExternalTarget: $l,
      addListener: et,
      removeListener: Pt
    }, Ad = ut.extend({
      // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
      // Run an animation of a given element to a new position, optionally setting
      // duration in seconds (`0.25` by default) and easing linearity factor (3rd
      // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
      // `0.5` by default).
      run: function(s, a, h, f) {
        this.stop(), this._el = s, this._inProgress = !0, this._duration = h || 0.25, this._easeOutPower = 1 / Math.max(f || 0.5, 0.2), this._startPos = pi(s), this._offset = a.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
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
        var a = +/* @__PURE__ */ new Date() - this._startTime, h = this._duration * 1e3;
        a < h ? this._runFrame(this._easeOut(a / h), s) : (this._runFrame(1), this._complete());
      },
      _runFrame: function(s, a) {
        var h = this._startPos.add(this._offset.multiplyBy(s));
        a && h._round(), Ht(this._el, h), this.fire("step");
      },
      _complete: function() {
        U(this._animId), this._inProgress = !1, this.fire("end");
      },
      _easeOut: function(s) {
        return 1 - Math.pow(1 - s, this._easeOutPower);
      }
    }), pt = ut.extend({
      options: {
        // @section Map State Options
        // @option crs: CRS = L.CRS.EPSG3857
        // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
        // sure what it means.
        crs: mt,
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
      initialize: function(s, a) {
        a = k(this, a), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(s), this._initLayout(), this._onResize = l(this._onResize, this), this._initEvents(), a.maxBounds && this.setMaxBounds(a.maxBounds), a.zoom !== void 0 && (this._zoom = this._limitZoom(a.zoom)), a.center && a.zoom !== void 0 && this.setView(q(a.center), a.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = Hs && K.any3d && !K.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), et(this._proxy, Cd, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
      },
      // @section Methods for modifying map state
      // @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) with the given
      // animation options.
      setView: function(s, a, h) {
        if (a = a === void 0 ? this._zoom : this._limitZoom(a), s = this._limitCenter(q(s), a, this.options.maxBounds), h = h || {}, this._stop(), this._loaded && !h.reset && h !== !0) {
          h.animate !== void 0 && (h.zoom = r({ animate: h.animate }, h.zoom), h.pan = r({ animate: h.animate, duration: h.duration }, h.pan));
          var f = this._zoom !== a ? this._tryAnimatedZoom && this._tryAnimatedZoom(s, a, h.zoom) : this._tryAnimatedPan(s, h.pan);
          if (f)
            return clearTimeout(this._sizeTimer), this;
        }
        return this._resetView(s, a, h.pan && h.pan.noMoveStart), this;
      },
      // @method setZoom(zoom: Number, options?: Zoom/pan options): this
      // Sets the zoom of the map.
      setZoom: function(s, a) {
        return this._loaded ? this.setView(this.getCenter(), s, { zoom: a }) : (this._zoom = s, this);
      },
      // @method zoomIn(delta?: Number, options?: Zoom options): this
      // Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomIn: function(s, a) {
        return s = s || (K.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom + s, a);
      },
      // @method zoomOut(delta?: Number, options?: Zoom options): this
      // Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
      zoomOut: function(s, a) {
        return s = s || (K.any3d ? this.options.zoomDelta : 1), this.setZoom(this._zoom - s, a);
      },
      // @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified geographical point on the map
      // stationary (e.g. used internally for scroll zoom and double-click zoom).
      // @alternative
      // @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
      // Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
      setZoomAround: function(s, a, h) {
        var f = this.getZoomScale(a), m = this.getSize().divideBy(2), y = s instanceof I ? s : this.latLngToContainerPoint(s), M = y.subtract(m).multiplyBy(1 - 1 / f), z = this.containerPointToLatLng(m.add(M));
        return this.setView(z, a, { zoom: h });
      },
      _getBoundsCenterZoom: function(s, a) {
        a = a || {}, s = s.getBounds ? s.getBounds() : ot(s);
        var h = B(a.paddingTopLeft || a.padding || [0, 0]), f = B(a.paddingBottomRight || a.padding || [0, 0]), m = this.getBoundsZoom(s, !1, h.add(f));
        if (m = typeof a.maxZoom == "number" ? Math.min(a.maxZoom, m) : m, m === 1 / 0)
          return {
            center: s.getCenter(),
            zoom: m
          };
        var y = f.subtract(h).divideBy(2), M = this.project(s.getSouthWest(), m), z = this.project(s.getNorthEast(), m), O = this.unproject(M.add(z).divideBy(2).add(y), m);
        return {
          center: O,
          zoom: m
        };
      },
      // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets a map view that contains the given geographical bounds with the
      // maximum zoom level possible.
      fitBounds: function(s, a) {
        if (s = ot(s), !s.isValid())
          throw new Error("Bounds are not valid.");
        var h = this._getBoundsCenterZoom(s, a);
        return this.setView(h.center, h.zoom, a);
      },
      // @method fitWorld(options?: fitBounds options): this
      // Sets a map view that mostly contains the whole world with the maximum
      // zoom level possible.
      fitWorld: function(s) {
        return this.fitBounds([[-90, -180], [90, 180]], s);
      },
      // @method panTo(latlng: LatLng, options?: Pan options): this
      // Pans the map to a given center.
      panTo: function(s, a) {
        return this.setView(s, this._zoom, { pan: a });
      },
      // @method panBy(offset: Point, options?: Pan options): this
      // Pans the map by a given number of pixels (animated).
      panBy: function(s, a) {
        if (s = B(s).round(), a = a || {}, !s.x && !s.y)
          return this.fire("moveend");
        if (a.animate !== !0 && !this.getSize().contains(s))
          return this._resetView(this.unproject(this.project(this.getCenter()).add(s)), this.getZoom()), this;
        if (this._panAnim || (this._panAnim = new Ad(), this._panAnim.on({
          step: this._onPanTransitionStep,
          end: this._onPanTransitionEnd
        }, this)), a.noMoveStart || this.fire("movestart"), a.animate !== !1) {
          it(this._mapPane, "leaflet-pan-anim");
          var h = this._getMapPanePos().subtract(s).round();
          this._panAnim.run(this._mapPane, h, a.duration || 0.25, a.easeLinearity);
        } else
          this._rawPanBy(s), this.fire("move").fire("moveend");
        return this;
      },
      // @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
      // Sets the view of the map (geographical center and zoom) performing a smooth
      // pan-zoom animation.
      flyTo: function(s, a, h) {
        if (h = h || {}, h.animate === !1 || !K.any3d)
          return this.setView(s, a, h);
        this._stop();
        var f = this.project(this.getCenter()), m = this.project(s), y = this.getSize(), M = this._zoom;
        s = q(s), a = a === void 0 ? M : a;
        var z = Math.max(y.x, y.y), O = z * this.getZoomScale(M, a), R = m.distanceTo(f) || 1, W = 1.42, Q = W * W;
        function at(Wt) {
          var Eo = Wt ? -1 : 1, I0 = Wt ? O : z, D0 = O * O - z * z + Eo * Q * Q * R * R, R0 = 2 * I0 * Q * R, iu = D0 / R0, mf = Math.sqrt(iu * iu + 1) - iu, j0 = mf < 1e-9 ? -18 : Math.log(mf);
          return j0;
        }
        function le(Wt) {
          return (Math.exp(Wt) - Math.exp(-Wt)) / 2;
        }
        function Kt(Wt) {
          return (Math.exp(Wt) + Math.exp(-Wt)) / 2;
        }
        function Oe(Wt) {
          return le(Wt) / Kt(Wt);
        }
        var fe = at(0);
        function Qi(Wt) {
          return z * (Kt(fe) / Kt(fe + W * Wt));
        }
        function z0(Wt) {
          return z * (Kt(fe) * Oe(fe + W * Wt) - le(fe)) / Q;
        }
        function O0(Wt) {
          return 1 - Math.pow(1 - Wt, 1.5);
        }
        var N0 = Date.now(), ff = (at(1) - fe) / W, A0 = h.duration ? 1e3 * h.duration : 1e3 * ff * 0.8;
        function pf() {
          var Wt = (Date.now() - N0) / A0, Eo = O0(Wt) * ff;
          Wt <= 1 ? (this._flyToFrame = V(pf, this), this._move(
            this.unproject(f.add(m.subtract(f).multiplyBy(z0(Eo) / R)), M),
            this.getScaleZoom(z / Qi(Eo), M),
            { flyTo: !0 }
          )) : this._move(s, a)._moveEnd(!0);
        }
        return this._moveStart(!0, h.noMoveStart), pf.call(this), this;
      },
      // @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
      // but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
      flyToBounds: function(s, a) {
        var h = this._getBoundsCenterZoom(s, a);
        return this.flyTo(h.center, h.zoom, a);
      },
      // @method setMaxBounds(bounds: LatLngBounds): this
      // Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
      setMaxBounds: function(s) {
        return s = ot(s), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), s.isValid() ? (this.options.maxBounds = s, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
      },
      // @method setMinZoom(zoom: Number): this
      // Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
      setMinZoom: function(s) {
        var a = this.options.minZoom;
        return this.options.minZoom = s, this._loaded && a !== s && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(s) : this;
      },
      // @method setMaxZoom(zoom: Number): this
      // Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
      setMaxZoom: function(s) {
        var a = this.options.maxZoom;
        return this.options.maxZoom = s, this._loaded && a !== s && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(s) : this;
      },
      // @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
      // Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
      panInsideBounds: function(s, a) {
        this._enforcingBounds = !0;
        var h = this.getCenter(), f = this._limitCenter(h, this._zoom, ot(s));
        return h.equals(f) || this.panTo(f, a), this._enforcingBounds = !1, this;
      },
      // @method panInside(latlng: LatLng, options?: padding options): this
      // Pans the map the minimum amount to make the `latlng` visible. Use
      // padding options to fit the display to more restricted bounds.
      // If `latlng` is already within the (optionally padded) display bounds,
      // the map will not be panned.
      panInside: function(s, a) {
        a = a || {};
        var h = B(a.paddingTopLeft || a.padding || [0, 0]), f = B(a.paddingBottomRight || a.padding || [0, 0]), m = this.project(this.getCenter()), y = this.project(s), M = this.getPixelBounds(), z = tt([M.min.add(h), M.max.subtract(f)]), O = z.getSize();
        if (!z.contains(y)) {
          this._enforcingBounds = !0;
          var R = y.subtract(z.getCenter()), W = z.extend(y).getSize().subtract(O);
          m.x += R.x < 0 ? -W.x : W.x, m.y += R.y < 0 ? -W.y : W.y, this.panTo(this.unproject(m), a), this._enforcingBounds = !1;
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
        var a = this.getSize();
        this._sizeChanged = !0, this._lastCenter = null;
        var h = this.getSize(), f = a.divideBy(2).round(), m = h.divideBy(2).round(), y = f.subtract(m);
        return !y.x && !y.y ? this : (s.animate && s.pan ? this.panBy(y) : (s.pan && this._rawPanBy(y), this.fire("move"), s.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(l(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
          oldSize: a,
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
        var a = l(this._handleGeolocationResponse, this), h = l(this._handleGeolocationError, this);
        return s.watch ? this._locationWatchId = navigator.geolocation.watchPosition(a, h, s) : navigator.geolocation.getCurrentPosition(a, h, s), this;
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
          var a = s.code, h = s.message || (a === 1 ? "permission denied" : a === 2 ? "position unavailable" : "timeout");
          this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
            code: a,
            message: "Geolocation error: " + h + "."
          });
        }
      },
      _handleGeolocationResponse: function(s) {
        if (this._container._leaflet_id) {
          var a = s.coords.latitude, h = s.coords.longitude, f = new nt(a, h), m = f.toBounds(s.coords.accuracy * 2), y = this._locateOptions;
          if (y.setView) {
            var M = this.getBoundsZoom(m);
            this.setView(f, y.maxZoom ? Math.min(M, y.maxZoom) : M);
          }
          var z = {
            latlng: f,
            bounds: m,
            timestamp: s.timestamp
          };
          for (var O in s.coords)
            typeof s.coords[O] == "number" && (z[O] = s.coords[O]);
          this.fire("locationfound", z);
        }
      },
      // TODO Appropriate docs section?
      // @section Other Methods
      // @method addHandler(name: String, HandlerClass: Function): this
      // Adds a new `Handler` to the map, given its name and constructor function.
      addHandler: function(s, a) {
        if (!a)
          return this;
        var h = this[s] = new a(this);
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
        this._locationWatchId !== void 0 && this.stopLocate(), this._stop(), zt(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (U(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload");
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
      createPane: function(s, a) {
        var h = "leaflet-pane" + (s ? " leaflet-" + s.replace("Pane", "") + "-pane" : ""), f = _t("div", h, a || this._mapPane);
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
        var s = this.getPixelBounds(), a = this.unproject(s.getBottomLeft()), h = this.unproject(s.getTopRight());
        return new bt(a, h);
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
      getBoundsZoom: function(s, a, h) {
        s = ot(s), h = B(h || [0, 0]);
        var f = this.getZoom() || 0, m = this.getMinZoom(), y = this.getMaxZoom(), M = s.getNorthWest(), z = s.getSouthEast(), O = this.getSize().subtract(h), R = tt(this.project(z, f), this.project(M, f)).getSize(), W = K.any3d ? this.options.zoomSnap : 1, Q = O.x / R.x, at = O.y / R.y, le = a ? Math.max(Q, at) : Math.min(Q, at);
        return f = this.getScaleZoom(le, f), W && (f = Math.round(f / (W / 100)) * (W / 100), f = a ? Math.ceil(f / W) * W : Math.floor(f / W) * W), Math.max(m, Math.min(y, f));
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
      getPixelBounds: function(s, a) {
        var h = this._getTopLeftPoint(s, a);
        return new X(h, h.add(this.getSize()));
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
      getZoomScale: function(s, a) {
        var h = this.options.crs;
        return a = a === void 0 ? this._zoom : a, h.scale(s) / h.scale(a);
      },
      // @method getScaleZoom(scale: Number, fromZoom: Number): Number
      // Returns the zoom level that the map would end up at, if it is at `fromZoom`
      // level and everything is scaled by a factor of `scale`. Inverse of
      // [`getZoomScale`](#map-getZoomScale).
      getScaleZoom: function(s, a) {
        var h = this.options.crs;
        a = a === void 0 ? this._zoom : a;
        var f = h.zoom(s * h.scale(a));
        return isNaN(f) ? 1 / 0 : f;
      },
      // @method project(latlng: LatLng, zoom: Number): Point
      // Projects a geographical coordinate `LatLng` according to the projection
      // of the map's CRS, then scales it according to `zoom` and the CRS's
      // `Transformation`. The result is pixel coordinate relative to
      // the CRS origin.
      project: function(s, a) {
        return a = a === void 0 ? this._zoom : a, this.options.crs.latLngToPoint(q(s), a);
      },
      // @method unproject(point: Point, zoom: Number): LatLng
      // Inverse of [`project`](#map-project).
      unproject: function(s, a) {
        return a = a === void 0 ? this._zoom : a, this.options.crs.pointToLatLng(B(s), a);
      },
      // @method layerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding geographical coordinate (for the current zoom level).
      layerPointToLatLng: function(s) {
        var a = B(s).add(this.getPixelOrigin());
        return this.unproject(a);
      },
      // @method latLngToLayerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the [origin pixel](#map-getpixelorigin).
      latLngToLayerPoint: function(s) {
        var a = this.project(q(s))._round();
        return a._subtract(this.getPixelOrigin());
      },
      // @method wrapLatLng(latlng: LatLng): LatLng
      // Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
      // map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
      // CRS's bounds.
      // By default this means longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees.
      wrapLatLng: function(s) {
        return this.options.crs.wrapLatLng(q(s));
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring that
      // its center is within the CRS's bounds.
      // By default this means the center longitude is wrapped around the dateline so its
      // value is between -180 and +180 degrees, and the majority of the bounds
      // overlaps the CRS's bounds.
      wrapLatLngBounds: function(s) {
        return this.options.crs.wrapLatLngBounds(ot(s));
      },
      // @method distance(latlng1: LatLng, latlng2: LatLng): Number
      // Returns the distance between two geographical coordinates according to
      // the map's CRS. By default this measures distance in meters.
      distance: function(s, a) {
        return this.options.crs.distance(q(s), q(a));
      },
      // @method containerPointToLayerPoint(point: Point): Point
      // Given a pixel coordinate relative to the map container, returns the corresponding
      // pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
      containerPointToLayerPoint: function(s) {
        return B(s).subtract(this._getMapPanePos());
      },
      // @method layerPointToContainerPoint(point: Point): Point
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding pixel coordinate relative to the map container.
      layerPointToContainerPoint: function(s) {
        return B(s).add(this._getMapPanePos());
      },
      // @method containerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the map container, returns
      // the corresponding geographical coordinate (for the current zoom level).
      containerPointToLatLng: function(s) {
        var a = this.containerPointToLayerPoint(B(s));
        return this.layerPointToLatLng(a);
      },
      // @method latLngToContainerPoint(latlng: LatLng): Point
      // Given a geographical coordinate, returns the corresponding pixel coordinate
      // relative to the map container.
      latLngToContainerPoint: function(s) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(q(s)));
      },
      // @method mouseEventToContainerPoint(ev: MouseEvent): Point
      // Given a MouseEvent object, returns the pixel coordinate relative to the
      // map container where the event took place.
      mouseEventToContainerPoint: function(s) {
        return Od(s, this._container);
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
        var a = this._container = Ld(s);
        if (a) {
          if (a._leaflet_id)
            throw new Error("Map container is already initialized.");
        } else throw new Error("Map container not found.");
        et(a, "scroll", this._onScroll, this), this._containerId = c(a);
      },
      _initLayout: function() {
        var s = this._container;
        this._fadeAnimated = this.options.fadeAnimation && K.any3d, it(s, "leaflet-container" + (K.touch ? " leaflet-touch" : "") + (K.retina ? " leaflet-retina" : "") + (K.ielt9 ? " leaflet-oldie" : "") + (K.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
        var a = Ws(s, "position");
        a !== "absolute" && a !== "relative" && a !== "fixed" && a !== "sticky" && (s.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
      },
      _initPanes: function() {
        var s = this._panes = {};
        this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), Ht(this._mapPane, new I(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (it(s.markerPane, "leaflet-zoom-hide"), it(s.shadowPane, "leaflet-zoom-hide"));
      },
      // private methods that modify map state
      // @section Map state change events
      _resetView: function(s, a, h) {
        Ht(this._mapPane, new I(0, 0));
        var f = !this._loaded;
        this._loaded = !0, a = this._limitZoom(a), this.fire("viewprereset");
        var m = this._zoom !== a;
        this._moveStart(m, h)._move(s, a)._moveEnd(m), this.fire("viewreset"), f && this.fire("load");
      },
      _moveStart: function(s, a) {
        return s && this.fire("zoomstart"), a || this.fire("movestart"), this;
      },
      _move: function(s, a, h, f) {
        a === void 0 && (a = this._zoom);
        var m = this._zoom !== a;
        return this._zoom = a, this._lastCenter = s, this._pixelOrigin = this._getNewPixelOrigin(s), f ? h && h.pinch && this.fire("zoom", h) : ((m || h && h.pinch) && this.fire("zoom", h), this.fire("move", h)), this;
      },
      _moveEnd: function(s) {
        return s && this.fire("zoomend"), this.fire("moveend");
      },
      _stop: function() {
        return U(this._flyToFrame), this._panAnim && this._panAnim.stop(), this;
      },
      _rawPanBy: function(s) {
        Ht(this._mapPane, this._getMapPanePos().subtract(s));
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
        this._targets = {}, this._targets[c(this._container)] = this;
        var a = s ? Pt : et;
        a(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && a(window, "resize", this._onResize, this), K.any3d && this.options.transform3DLimit && (s ? this.off : this.on).call(this, "moveend", this._onMoveEnd);
      },
      _onResize: function() {
        U(this._resizeRequest), this._resizeRequest = V(
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
      _findEventTargets: function(s, a) {
        for (var h = [], f, m = a === "mouseout" || a === "mouseover", y = s.target || s.srcElement, M = !1; y; ) {
          if (f = this._targets[c(y)], f && (a === "click" || a === "preclick") && this._draggableMoved(f)) {
            M = !0;
            break;
          }
          if (f && f.listens(a, !0) && (m && !$l(y, s) || (h.push(f), m)) || y === this._container)
            break;
          y = y.parentNode;
        }
        return !h.length && !M && !m && this.listens(a, !0) && (h = [this]), h;
      },
      _isClickDisabled: function(s) {
        for (; s && s !== this._container; ) {
          if (s._leaflet_disable_click)
            return !0;
          s = s.parentNode;
        }
      },
      _handleDOMEvent: function(s) {
        var a = s.target || s.srcElement;
        if (!(!this._loaded || a._leaflet_disable_events || s.type === "click" && this._isClickDisabled(a))) {
          var h = s.type;
          h === "mousedown" && Fl(a), this._fireDOMEvent(s, h);
        }
      },
      _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
      _fireDOMEvent: function(s, a, h) {
        if (s.type === "click") {
          var f = r({}, s);
          f.type = "preclick", this._fireDOMEvent(f, f.type, h);
        }
        var m = this._findEventTargets(s, a);
        if (h) {
          for (var y = [], M = 0; M < h.length; M++)
            h[M].listens(a, !0) && y.push(h[M]);
          m = y.concat(m);
        }
        if (m.length) {
          a === "contextmenu" && Qt(s);
          var z = m[0], O = {
            originalEvent: s
          };
          if (s.type !== "keypress" && s.type !== "keydown" && s.type !== "keyup") {
            var R = z.getLatLng && (!z._radius || z._radius <= 10);
            O.containerPoint = R ? this.latLngToContainerPoint(z.getLatLng()) : this.mouseEventToContainerPoint(s), O.layerPoint = this.containerPointToLayerPoint(O.containerPoint), O.latlng = R ? z.getLatLng() : this.layerPointToLatLng(O.layerPoint);
          }
          for (M = 0; M < m.length; M++)
            if (m[M].fire(a, O, !0), O.originalEvent._stopped || m[M].options.bubblingMouseEvents === !1 && T(this._mouseEvents, a) !== -1)
              return;
        }
      },
      _draggableMoved: function(s) {
        return s = s.dragging && s.dragging.enabled() ? s : this, s.dragging && s.dragging.moved() || this.boxZoom && this.boxZoom.moved();
      },
      _clearHandlers: function() {
        for (var s = 0, a = this._handlers.length; s < a; s++)
          this._handlers[s].disable();
      },
      // @section Other Methods
      // @method whenReady(fn: Function, context?: Object): this
      // Runs the given function `fn` when the map gets initialized with
      // a view (center and zoom) and at least one layer, or immediately
      // if it's already initialized, optionally passing a function context.
      whenReady: function(s, a) {
        return this._loaded ? s.call(a || this, { target: this }) : this.on("load", s, a), this;
      },
      // private methods for getting map state
      _getMapPanePos: function() {
        return pi(this._mapPane) || new I(0, 0);
      },
      _moved: function() {
        var s = this._getMapPanePos();
        return s && !s.equals([0, 0]);
      },
      _getTopLeftPoint: function(s, a) {
        var h = s && a !== void 0 ? this._getNewPixelOrigin(s, a) : this.getPixelOrigin();
        return h.subtract(this._getMapPanePos());
      },
      _getNewPixelOrigin: function(s, a) {
        var h = this.getSize()._divideBy(2);
        return this.project(s, a)._subtract(h)._add(this._getMapPanePos())._round();
      },
      _latLngToNewLayerPoint: function(s, a, h) {
        var f = this._getNewPixelOrigin(h, a);
        return this.project(s, a)._subtract(f);
      },
      _latLngBoundsToNewLayerBounds: function(s, a, h) {
        var f = this._getNewPixelOrigin(h, a);
        return tt([
          this.project(s.getSouthWest(), a)._subtract(f),
          this.project(s.getNorthWest(), a)._subtract(f),
          this.project(s.getSouthEast(), a)._subtract(f),
          this.project(s.getNorthEast(), a)._subtract(f)
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
      _limitCenter: function(s, a, h) {
        if (!h)
          return s;
        var f = this.project(s, a), m = this.getSize().divideBy(2), y = new X(f.subtract(m), f.add(m)), M = this._getBoundsOffset(y, h, a);
        return Math.abs(M.x) <= 1 && Math.abs(M.y) <= 1 ? s : this.unproject(f.add(M), a);
      },
      // adjust offset for view to get inside bounds
      _limitOffset: function(s, a) {
        if (!a)
          return s;
        var h = this.getPixelBounds(), f = new X(h.min.add(s), h.max.add(s));
        return s.add(this._getBoundsOffset(f, a));
      },
      // returns offset needed for pxBounds to get inside maxBounds at a specified zoom
      _getBoundsOffset: function(s, a, h) {
        var f = tt(
          this.project(a.getNorthEast(), h),
          this.project(a.getSouthWest(), h)
        ), m = f.min.subtract(s.min), y = f.max.subtract(s.max), M = this._rebound(m.x, -y.x), z = this._rebound(m.y, -y.y);
        return new I(M, z);
      },
      _rebound: function(s, a) {
        return s + a > 0 ? Math.round(s - a) / 2 : Math.max(0, Math.ceil(s)) - Math.max(0, Math.floor(a));
      },
      _limitZoom: function(s) {
        var a = this.getMinZoom(), h = this.getMaxZoom(), f = K.any3d ? this.options.zoomSnap : 1;
        return f && (s = Math.round(s / f) * f), Math.max(a, Math.min(h, s));
      },
      _onPanTransitionStep: function() {
        this.fire("move");
      },
      _onPanTransitionEnd: function() {
        jt(this._mapPane, "leaflet-pan-anim"), this.fire("moveend");
      },
      _tryAnimatedPan: function(s, a) {
        var h = this._getCenterOffset(s)._trunc();
        return (a && a.animate) !== !0 && !this.getSize().contains(h) ? !1 : (this.panBy(h, a), !0);
      },
      _createAnimProxy: function() {
        var s = this._proxy = _t("div", "leaflet-proxy leaflet-zoom-animated");
        this._panes.mapPane.appendChild(s), this.on("zoomanim", function(a) {
          var h = Nl, f = this._proxy.style[h];
          fi(this._proxy, this.project(a.center, a.zoom), this.getZoomScale(a.zoom, 1)), f === this._proxy.style[h] && this._animatingZoom && this._onZoomTransitionEnd();
        }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
      },
      _destroyAnimProxy: function() {
        zt(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
      },
      _animMoveEnd: function() {
        var s = this.getCenter(), a = this.getZoom();
        fi(this._proxy, this.project(s, a), this.getZoomScale(a, 1));
      },
      _catchTransitionEnd: function(s) {
        this._animatingZoom && s.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd();
      },
      _nothingToAnimate: function() {
        return !this._container.getElementsByClassName("leaflet-zoom-animated").length;
      },
      _tryAnimatedZoom: function(s, a, h) {
        if (this._animatingZoom)
          return !0;
        if (h = h || {}, !this._zoomAnimated || h.animate === !1 || this._nothingToAnimate() || Math.abs(a - this._zoom) > this.options.zoomAnimationThreshold)
          return !1;
        var f = this.getZoomScale(a), m = this._getCenterOffset(s)._divideBy(1 - 1 / f);
        return h.animate !== !0 && !this.getSize().contains(m) ? !1 : (V(function() {
          this._moveStart(!0, h.noMoveStart || !1)._animateZoom(s, a, !0);
        }, this), !0);
      },
      _animateZoom: function(s, a, h, f) {
        this._mapPane && (h && (this._animatingZoom = !0, this._animateToCenter = s, this._animateToZoom = a, it(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
          center: s,
          zoom: a,
          noUpdate: f
        }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(l(this._onZoomTransitionEnd, this), 250));
      },
      _onZoomTransitionEnd: function() {
        this._animatingZoom && (this._mapPane && jt(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
      }
    });
    function Ky(s, a) {
      return new pt(s, a);
    }
    var He = rt.extend({
      // @section
      // @aka Control Options
      options: {
        // @option position: String = 'topright'
        // The position of the control (one of the map corners). Possible values are `'topleft'`,
        // `'topright'`, `'bottomleft'` or `'bottomright'`
        position: "topright"
      },
      initialize: function(s) {
        k(this, s);
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
        var a = this._map;
        return a && a.removeControl(this), this.options.position = s, a && a.addControl(this), this;
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
        var a = this._container = this.onAdd(s), h = this.getPosition(), f = s._controlCorners[h];
        return it(a, "leaflet-control"), h.indexOf("bottom") !== -1 ? f.insertBefore(a, f.firstChild) : f.appendChild(a), this._map.on("unload", this.remove, this), this;
      },
      // @method remove: this
      // Removes the control from the map it is currently active on.
      remove: function() {
        return this._map ? (zt(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
      },
      _refocusOnMap: function(s) {
        this._map && s && s.screenX > 0 && s.screenY > 0 && this._map.getContainer().focus();
      }
    }), Ys = function(s) {
      return new He(s);
    };
    pt.include({
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
        var s = this._controlCorners = {}, a = "leaflet-", h = this._controlContainer = _t("div", a + "control-container", this._container);
        function f(m, y) {
          var M = a + m + " " + a + y;
          s[m + y] = _t("div", M, h);
        }
        f("top", "left"), f("top", "right"), f("bottom", "left"), f("bottom", "right");
      },
      _clearControlPos: function() {
        for (var s in this._controlCorners)
          zt(this._controlCorners[s]);
        zt(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
      }
    });
    var Id = He.extend({
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
        sortFunction: function(s, a, h, f) {
          return h < f ? -1 : f < h ? 1 : 0;
        }
      },
      initialize: function(s, a, h) {
        k(this, h), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
        for (var f in s)
          this._addLayer(s[f], f);
        for (f in a)
          this._addLayer(a[f], f, !0);
      },
      onAdd: function(s) {
        this._initLayout(), this._update(), this._map = s, s.on("zoomend", this._checkDisabledLayers, this);
        for (var a = 0; a < this._layers.length; a++)
          this._layers[a].layer.on("add remove", this._onLayerChange, this);
        return this._container;
      },
      addTo: function(s) {
        return He.prototype.addTo.call(this, s), this._expandIfNotCollapsed();
      },
      onRemove: function() {
        this._map.off("zoomend", this._checkDisabledLayers, this);
        for (var s = 0; s < this._layers.length; s++)
          this._layers[s].layer.off("add remove", this._onLayerChange, this);
      },
      // @method addBaseLayer(layer: Layer, name: String): this
      // Adds a base layer (radio button entry) with the given name to the control.
      addBaseLayer: function(s, a) {
        return this._addLayer(s, a), this._map ? this._update() : this;
      },
      // @method addOverlay(layer: Layer, name: String): this
      // Adds an overlay (checkbox entry) with the given name to the control.
      addOverlay: function(s, a) {
        return this._addLayer(s, a, !0), this._map ? this._update() : this;
      },
      // @method removeLayer(layer: Layer): this
      // Remove the given layer from the control.
      removeLayer: function(s) {
        s.off("add remove", this._onLayerChange, this);
        var a = this._getLayer(c(s));
        return a && this._layers.splice(this._layers.indexOf(a), 1), this._map ? this._update() : this;
      },
      // @method expand(): this
      // Expand the control container if collapsed.
      expand: function() {
        it(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
        var s = this._map.getSize().y - (this._container.offsetTop + 50);
        return s < this._section.clientHeight ? (it(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = s + "px") : jt(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
      },
      // @method collapse(): this
      // Collapse the control container if expanded.
      collapse: function() {
        return jt(this._container, "leaflet-control-layers-expanded"), this;
      },
      _initLayout: function() {
        var s = "leaflet-control-layers", a = this._container = _t("div", s), h = this.options.collapsed;
        a.setAttribute("aria-haspopup", !0), $s(a), Ul(a);
        var f = this._section = _t("section", s + "-list");
        h && (this._map.on("click", this.collapse, this), et(a, {
          mouseenter: this._expandSafely,
          mouseleave: this.collapse
        }, this));
        var m = this._layersLink = _t("a", s + "-toggle", a);
        m.href = "#", m.title = "Layers", m.setAttribute("role", "button"), et(m, {
          keydown: function(y) {
            y.keyCode === 13 && this._expandSafely();
          },
          // Certain screen readers intercept the key event and instead send a click event
          click: function(y) {
            Qt(y), this._expandSafely();
          }
        }, this), h || this.expand(), this._baseLayersList = _t("div", s + "-base", f), this._separator = _t("div", s + "-separator", f), this._overlaysList = _t("div", s + "-overlays", f), a.appendChild(f);
      },
      _getLayer: function(s) {
        for (var a = 0; a < this._layers.length; a++)
          if (this._layers[a] && c(this._layers[a].layer) === s)
            return this._layers[a];
      },
      _addLayer: function(s, a, h) {
        this._map && s.on("add remove", this._onLayerChange, this), this._layers.push({
          layer: s,
          name: a,
          overlay: h
        }), this.options.sortLayers && this._layers.sort(l(function(f, m) {
          return this.options.sortFunction(f.layer, m.layer, f.name, m.name);
        }, this)), this.options.autoZIndex && s.setZIndex && (this._lastZIndex++, s.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed();
      },
      _update: function() {
        if (!this._container)
          return this;
        po(this._baseLayersList), po(this._overlaysList), this._layerControlInputs = [];
        var s, a, h, f, m = 0;
        for (h = 0; h < this._layers.length; h++)
          f = this._layers[h], this._addItem(f), a = a || f.overlay, s = s || !f.overlay, m += f.overlay ? 0 : 1;
        return this.options.hideSingleBase && (s = s && m > 1, this._baseLayersList.style.display = s ? "" : "none"), this._separator.style.display = a && s ? "" : "none", this;
      },
      _onLayerChange: function(s) {
        this._handlingClick || this._update();
        var a = this._getLayer(c(s.target)), h = a.overlay ? s.type === "add" ? "overlayadd" : "overlayremove" : s.type === "add" ? "baselayerchange" : null;
        h && this._map.fire(h, a);
      },
      // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see https://stackoverflow.com/a/119079)
      _createRadioElement: function(s, a) {
        var h = '<input type="radio" class="leaflet-control-layers-selector" name="' + s + '"' + (a ? ' checked="checked"' : "") + "/>", f = document.createElement("div");
        return f.innerHTML = h, f.firstChild;
      },
      _addItem: function(s) {
        var a = document.createElement("label"), h = this._map.hasLayer(s.layer), f;
        s.overlay ? (f = document.createElement("input"), f.type = "checkbox", f.className = "leaflet-control-layers-selector", f.defaultChecked = h) : f = this._createRadioElement("leaflet-base-layers_" + c(this), h), this._layerControlInputs.push(f), f.layerId = c(s.layer), et(f, "click", this._onInputClick, this);
        var m = document.createElement("span");
        m.innerHTML = " " + s.name;
        var y = document.createElement("span");
        a.appendChild(y), y.appendChild(f), y.appendChild(m);
        var M = s.overlay ? this._overlaysList : this._baseLayersList;
        return M.appendChild(a), this._checkDisabledLayers(), a;
      },
      _onInputClick: function() {
        if (!this._preventClick) {
          var s = this._layerControlInputs, a, h, f = [], m = [];
          this._handlingClick = !0;
          for (var y = s.length - 1; y >= 0; y--)
            a = s[y], h = this._getLayer(a.layerId).layer, a.checked ? f.push(h) : a.checked || m.push(h);
          for (y = 0; y < m.length; y++)
            this._map.hasLayer(m[y]) && this._map.removeLayer(m[y]);
          for (y = 0; y < f.length; y++)
            this._map.hasLayer(f[y]) || this._map.addLayer(f[y]);
          this._handlingClick = !1, this._refocusOnMap();
        }
      },
      _checkDisabledLayers: function() {
        for (var s = this._layerControlInputs, a, h, f = this._map.getZoom(), m = s.length - 1; m >= 0; m--)
          a = s[m], h = this._getLayer(a.layerId).layer, a.disabled = h.options.minZoom !== void 0 && f < h.options.minZoom || h.options.maxZoom !== void 0 && f > h.options.maxZoom;
      },
      _expandIfNotCollapsed: function() {
        return this._map && !this.options.collapsed && this.expand(), this;
      },
      _expandSafely: function() {
        var s = this._section;
        this._preventClick = !0, et(s, "click", Qt), this.expand();
        var a = this;
        setTimeout(function() {
          Pt(s, "click", Qt), a._preventClick = !1;
        });
      }
    }), Gy = function(s, a, h) {
      return new Id(s, a, h);
    }, Yl = He.extend({
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
        var a = "leaflet-control-zoom", h = _t("div", a + " leaflet-bar"), f = this.options;
        return this._zoomInButton = this._createButton(
          f.zoomInText,
          f.zoomInTitle,
          a + "-in",
          h,
          this._zoomIn
        ), this._zoomOutButton = this._createButton(
          f.zoomOutText,
          f.zoomOutTitle,
          a + "-out",
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
      _createButton: function(s, a, h, f, m) {
        var y = _t("a", h, f);
        return y.innerHTML = s, y.href = "#", y.title = a, y.setAttribute("role", "button"), y.setAttribute("aria-label", a), $s(y), et(y, "click", gi), et(y, "click", m, this), et(y, "click", this._refocusOnMap, this), y;
      },
      _updateDisabled: function() {
        var s = this._map, a = "leaflet-disabled";
        jt(this._zoomInButton, a), jt(this._zoomOutButton, a), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || s._zoom === s.getMinZoom()) && (it(this._zoomOutButton, a), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || s._zoom === s.getMaxZoom()) && (it(this._zoomInButton, a), this._zoomInButton.setAttribute("aria-disabled", "true"));
      }
    });
    pt.mergeOptions({
      zoomControl: !0
    }), pt.addInitHook(function() {
      this.options.zoomControl && (this.zoomControl = new Yl(), this.addControl(this.zoomControl));
    });
    var Xy = function(s) {
      return new Yl(s);
    }, Dd = He.extend({
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
        var a = "leaflet-control-scale", h = _t("div", a), f = this.options;
        return this._addScales(f, a + "-line", h), s.on(f.updateWhenIdle ? "moveend" : "move", this._update, this), s.whenReady(this._update, this), h;
      },
      onRemove: function(s) {
        s.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
      },
      _addScales: function(s, a, h) {
        s.metric && (this._mScale = _t("div", a, h)), s.imperial && (this._iScale = _t("div", a, h));
      },
      _update: function() {
        var s = this._map, a = s.getSize().y / 2, h = s.distance(
          s.containerPointToLatLng([0, a]),
          s.containerPointToLatLng([this.options.maxWidth, a])
        );
        this._updateScales(h);
      },
      _updateScales: function(s) {
        this.options.metric && s && this._updateMetric(s), this.options.imperial && s && this._updateImperial(s);
      },
      _updateMetric: function(s) {
        var a = this._getRoundNum(s), h = a < 1e3 ? a + " m" : a / 1e3 + " km";
        this._updateScale(this._mScale, h, a / s);
      },
      _updateImperial: function(s) {
        var a = s * 3.2808399, h, f, m;
        a > 5280 ? (h = a / 5280, f = this._getRoundNum(h), this._updateScale(this._iScale, f + " mi", f / h)) : (m = this._getRoundNum(a), this._updateScale(this._iScale, m + " ft", m / a));
      },
      _updateScale: function(s, a, h) {
        s.style.width = Math.round(this.options.maxWidth * h) + "px", s.innerHTML = a;
      },
      _getRoundNum: function(s) {
        var a = Math.pow(10, (Math.floor(s) + "").length - 1), h = s / a;
        return h = h >= 10 ? 10 : h >= 5 ? 5 : h >= 3 ? 3 : h >= 2 ? 2 : 1, a * h;
      }
    }), qy = function(s) {
      return new Dd(s);
    }, Qy = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Kl = He.extend({
      // @section
      // @aka Control.Attribution options
      options: {
        position: "bottomright",
        // @option prefix: String|false = 'Leaflet'
        // The HTML text shown before the attributions. Pass `false` to disable.
        prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (K.inlineSvg ? Qy + " " : "") + "Leaflet</a>"
      },
      initialize: function(s) {
        k(this, s), this._attributions = {};
      },
      onAdd: function(s) {
        s.attributionControl = this, this._container = _t("div", "leaflet-control-attribution"), $s(this._container);
        for (var a in s._layers)
          s._layers[a].getAttribution && this.addAttribution(s._layers[a].getAttribution());
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
          for (var a in this._attributions)
            this._attributions[a] && s.push(a);
          var h = [];
          this.options.prefix && h.push(this.options.prefix), s.length && h.push(s.join(", ")), this._container.innerHTML = h.join(' <span aria-hidden="true">|</span> ');
        }
      }
    });
    pt.mergeOptions({
      attributionControl: !0
    }), pt.addInitHook(function() {
      this.options.attributionControl && new Kl().addTo(this);
    });
    var Jy = function(s) {
      return new Kl(s);
    };
    He.Layers = Id, He.Zoom = Yl, He.Scale = Dd, He.Attribution = Kl, Ys.layers = Gy, Ys.zoom = Xy, Ys.scale = qy, Ys.attribution = Jy;
    var Je = rt.extend({
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
    Je.addTo = function(s, a) {
      return s.addHandler(a, this), this;
    };
    var t0 = { Events: J }, Rd = K.touch ? "touchstart mousedown" : "mousedown", An = ut.extend({
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
      initialize: function(s, a, h, f) {
        k(this, f), this._element = s, this._dragStartTarget = a || s, this._preventOutline = h;
      },
      // @method enable()
      // Enables the dragging ability
      enable: function() {
        this._enabled || (et(this._dragStartTarget, Rd, this._onDown, this), this._enabled = !0);
      },
      // @method disable()
      // Disables the dragging ability
      disable: function() {
        this._enabled && (An._dragging === this && this.finishDrag(!0), Pt(this._dragStartTarget, Rd, this._onDown, this), this._enabled = !1, this._moved = !1);
      },
      _onDown: function(s) {
        if (this._enabled && (this._moved = !1, !Al(this._element, "leaflet-zoom-anim"))) {
          if (s.touches && s.touches.length !== 1) {
            An._dragging === this && this.finishDrag();
            return;
          }
          if (!(An._dragging || s.shiftKey || s.which !== 1 && s.button !== 1 && !s.touches) && (An._dragging = this, this._preventOutline && Fl(this._element), Rl(), Vs(), !this._moving)) {
            this.fire("down");
            var a = s.touches ? s.touches[0] : s, h = Td(this._element);
            this._startPoint = new I(a.clientX, a.clientY), this._startPos = pi(this._element), this._parentScale = Hl(h);
            var f = s.type === "mousedown";
            et(document, f ? "mousemove" : "touchmove", this._onMove, this), et(document, f ? "mouseup" : "touchend touchcancel", this._onUp, this);
          }
        }
      },
      _onMove: function(s) {
        if (this._enabled) {
          if (s.touches && s.touches.length > 1) {
            this._moved = !0;
            return;
          }
          var a = s.touches && s.touches.length === 1 ? s.touches[0] : s, h = new I(a.clientX, a.clientY)._subtract(this._startPoint);
          !h.x && !h.y || Math.abs(h.x) + Math.abs(h.y) < this.options.clickTolerance || (h.x /= this._parentScale.x, h.y /= this._parentScale.y, Qt(s), this._moved || (this.fire("dragstart"), this._moved = !0, it(document.body, "leaflet-dragging"), this._lastTarget = s.target || s.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), it(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(h), this._moving = !0, this._lastEvent = s, this._updatePosition());
        }
      },
      _updatePosition: function() {
        var s = { originalEvent: this._lastEvent };
        this.fire("predrag", s), Ht(this._element, this._newPos), this.fire("drag", s);
      },
      _onUp: function() {
        this._enabled && this.finishDrag();
      },
      finishDrag: function(s) {
        jt(document.body, "leaflet-dragging"), this._lastTarget && (jt(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), Pt(document, "mousemove touchmove", this._onMove, this), Pt(document, "mouseup touchend touchcancel", this._onUp, this), jl(), Zs();
        var a = this._moved && this._moving;
        this._moving = !1, An._dragging = !1, a && this.fire("dragend", {
          noInertia: s,
          distance: this._newPos.distanceTo(this._startPos)
        });
      }
    });
    function jd(s, a, h) {
      var f, m = [1, 4, 2, 8], y, M, z, O, R, W, Q, at;
      for (y = 0, W = s.length; y < W; y++)
        s[y]._code = _i(s[y], a);
      for (z = 0; z < 4; z++) {
        for (Q = m[z], f = [], y = 0, W = s.length, M = W - 1; y < W; M = y++)
          O = s[y], R = s[M], O._code & Q ? R._code & Q || (at = yo(R, O, Q, a, h), at._code = _i(at, a), f.push(at)) : (R._code & Q && (at = yo(R, O, Q, a, h), at._code = _i(at, a), f.push(at)), f.push(O));
        s = f;
      }
      return s;
    }
    function Bd(s, a) {
      var h, f, m, y, M, z, O, R, W;
      if (!s || s.length === 0)
        throw new Error("latlngs not passed");
      ze(s) || (console.warn("latlngs are not flat! Only the first ring will be used"), s = s[0]);
      var Q = q([0, 0]), at = ot(s), le = at.getNorthWest().distanceTo(at.getSouthWest()) * at.getNorthEast().distanceTo(at.getNorthWest());
      le < 1700 && (Q = Gl(s));
      var Kt = s.length, Oe = [];
      for (h = 0; h < Kt; h++) {
        var fe = q(s[h]);
        Oe.push(a.project(q([fe.lat - Q.lat, fe.lng - Q.lng])));
      }
      for (z = O = R = 0, h = 0, f = Kt - 1; h < Kt; f = h++)
        m = Oe[h], y = Oe[f], M = m.y * y.x - y.y * m.x, O += (m.x + y.x) * M, R += (m.y + y.y) * M, z += M * 3;
      z === 0 ? W = Oe[0] : W = [O / z, R / z];
      var Qi = a.unproject(B(W));
      return q([Qi.lat + Q.lat, Qi.lng + Q.lng]);
    }
    function Gl(s) {
      for (var a = 0, h = 0, f = 0, m = 0; m < s.length; m++) {
        var y = q(s[m]);
        a += y.lat, h += y.lng, f++;
      }
      return q([a / f, h / f]);
    }
    var e0 = {
      __proto__: null,
      clipPolygon: jd,
      polygonCenter: Bd,
      centroid: Gl
    };
    function Fd(s, a) {
      if (!a || !s.length)
        return s.slice();
      var h = a * a;
      return s = s0(s, h), s = i0(s, h), s;
    }
    function Hd(s, a, h) {
      return Math.sqrt(Ks(s, a, h, !0));
    }
    function n0(s, a, h) {
      return Ks(s, a, h);
    }
    function i0(s, a) {
      var h = s.length, f = typeof Uint8Array < "u" ? Uint8Array : Array, m = new f(h);
      m[0] = m[h - 1] = 1, Xl(s, m, a, 0, h - 1);
      var y, M = [];
      for (y = 0; y < h; y++)
        m[y] && M.push(s[y]);
      return M;
    }
    function Xl(s, a, h, f, m) {
      var y = 0, M, z, O;
      for (z = f + 1; z <= m - 1; z++)
        O = Ks(s[z], s[f], s[m], !0), O > y && (M = z, y = O);
      y > h && (a[M] = 1, Xl(s, a, h, f, M), Xl(s, a, h, M, m));
    }
    function s0(s, a) {
      for (var h = [s[0]], f = 1, m = 0, y = s.length; f < y; f++)
        r0(s[f], s[m]) > a && (h.push(s[f]), m = f);
      return m < y - 1 && h.push(s[y - 1]), h;
    }
    var Wd;
    function Vd(s, a, h, f, m) {
      var y = f ? Wd : _i(s, h), M = _i(a, h), z, O, R;
      for (Wd = M; ; ) {
        if (!(y | M))
          return [s, a];
        if (y & M)
          return !1;
        z = y || M, O = yo(s, a, z, h, m), R = _i(O, h), z === y ? (s = O, y = R) : (a = O, M = R);
      }
    }
    function yo(s, a, h, f, m) {
      var y = a.x - s.x, M = a.y - s.y, z = f.min, O = f.max, R, W;
      return h & 8 ? (R = s.x + y * (O.y - s.y) / M, W = O.y) : h & 4 ? (R = s.x + y * (z.y - s.y) / M, W = z.y) : h & 2 ? (R = O.x, W = s.y + M * (O.x - s.x) / y) : h & 1 && (R = z.x, W = s.y + M * (z.x - s.x) / y), new I(R, W, m);
    }
    function _i(s, a) {
      var h = 0;
      return s.x < a.min.x ? h |= 1 : s.x > a.max.x && (h |= 2), s.y < a.min.y ? h |= 4 : s.y > a.max.y && (h |= 8), h;
    }
    function r0(s, a) {
      var h = a.x - s.x, f = a.y - s.y;
      return h * h + f * f;
    }
    function Ks(s, a, h, f) {
      var m = a.x, y = a.y, M = h.x - m, z = h.y - y, O = M * M + z * z, R;
      return O > 0 && (R = ((s.x - m) * M + (s.y - y) * z) / O, R > 1 ? (m = h.x, y = h.y) : R > 0 && (m += M * R, y += z * R)), M = s.x - m, z = s.y - y, f ? M * M + z * z : new I(m, y);
    }
    function ze(s) {
      return !P(s[0]) || typeof s[0][0] != "object" && typeof s[0][0] < "u";
    }
    function Zd(s) {
      return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), ze(s);
    }
    function Ud(s, a) {
      var h, f, m, y, M, z, O, R;
      if (!s || s.length === 0)
        throw new Error("latlngs not passed");
      ze(s) || (console.warn("latlngs are not flat! Only the first ring will be used"), s = s[0]);
      var W = q([0, 0]), Q = ot(s), at = Q.getNorthWest().distanceTo(Q.getSouthWest()) * Q.getNorthEast().distanceTo(Q.getNorthWest());
      at < 1700 && (W = Gl(s));
      var le = s.length, Kt = [];
      for (h = 0; h < le; h++) {
        var Oe = q(s[h]);
        Kt.push(a.project(q([Oe.lat - W.lat, Oe.lng - W.lng])));
      }
      for (h = 0, f = 0; h < le - 1; h++)
        f += Kt[h].distanceTo(Kt[h + 1]) / 2;
      if (f === 0)
        R = Kt[0];
      else
        for (h = 0, y = 0; h < le - 1; h++)
          if (M = Kt[h], z = Kt[h + 1], m = M.distanceTo(z), y += m, y > f) {
            O = (y - f) / m, R = [
              z.x - O * (z.x - M.x),
              z.y - O * (z.y - M.y)
            ];
            break;
          }
      var fe = a.unproject(B(R));
      return q([fe.lat + W.lat, fe.lng + W.lng]);
    }
    var o0 = {
      __proto__: null,
      simplify: Fd,
      pointToSegmentDistance: Hd,
      closestPointOnSegment: n0,
      clipSegment: Vd,
      _getEdgeIntersection: yo,
      _getBitCode: _i,
      _sqClosestPointOnSegment: Ks,
      isFlat: ze,
      _flat: Zd,
      polylineCenter: Ud
    }, ql = {
      project: function(s) {
        return new I(s.lng, s.lat);
      },
      unproject: function(s) {
        return new nt(s.y, s.x);
      },
      bounds: new X([-180, -90], [180, 90])
    }, Ql = {
      R: 6378137,
      R_MINOR: 6356752314245179e-9,
      bounds: new X([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
      project: function(s) {
        var a = Math.PI / 180, h = this.R, f = s.lat * a, m = this.R_MINOR / h, y = Math.sqrt(1 - m * m), M = y * Math.sin(f), z = Math.tan(Math.PI / 4 - f / 2) / Math.pow((1 - M) / (1 + M), y / 2);
        return f = -h * Math.log(Math.max(z, 1e-10)), new I(s.lng * a * h, f);
      },
      unproject: function(s) {
        for (var a = 180 / Math.PI, h = this.R, f = this.R_MINOR / h, m = Math.sqrt(1 - f * f), y = Math.exp(-s.y / h), M = Math.PI / 2 - 2 * Math.atan(y), z = 0, O = 0.1, R; z < 15 && Math.abs(O) > 1e-7; z++)
          R = m * Math.sin(M), R = Math.pow((1 - R) / (1 + R), m / 2), O = Math.PI / 2 - 2 * Math.atan(y * R) - M, M += O;
        return new nt(M * a, s.x * a / h);
      }
    }, a0 = {
      __proto__: null,
      LonLat: ql,
      Mercator: Ql,
      SphericalMercator: Ds
    }, l0 = r({}, Fe, {
      code: "EPSG:3395",
      projection: Ql,
      transformation: function() {
        var s = 0.5 / (Math.PI * Ql.R);
        return yt(s, 0.5, -s, 0.5);
      }()
    }), $d = r({}, Fe, {
      code: "EPSG:4326",
      projection: ql,
      transformation: yt(1 / 180, 1, -1 / 180, 0.5)
    }), u0 = r({}, qt, {
      projection: ql,
      transformation: yt(1, 0, -1, 0),
      scale: function(s) {
        return Math.pow(2, s);
      },
      zoom: function(s) {
        return Math.log(s) / Math.LN2;
      },
      distance: function(s, a) {
        var h = a.lng - s.lng, f = a.lat - s.lat;
        return Math.sqrt(h * h + f * f);
      },
      infinite: !0
    });
    qt.Earth = Fe, qt.EPSG3395 = l0, qt.EPSG3857 = mt, qt.EPSG900913 = ht, qt.EPSG4326 = $d, qt.Simple = u0;
    var We = ut.extend({
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
        return this._map._targets[c(s)] = this, this;
      },
      removeInteractiveTarget: function(s) {
        return delete this._map._targets[c(s)], this;
      },
      // @method getAttribution: String
      // Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
      getAttribution: function() {
        return this.options.attribution;
      },
      _layerAdd: function(s) {
        var a = s.target;
        if (a.hasLayer(this)) {
          if (this._map = a, this._zoomAnimated = a._zoomAnimated, this.getEvents) {
            var h = this.getEvents();
            a.on(h, this), this.once("remove", function() {
              a.off(h, this);
            }, this);
          }
          this.onAdd(a), this.fire("add"), a.fire("layeradd", { layer: this });
        }
      }
    });
    pt.include({
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the map
      addLayer: function(s) {
        if (!s._layerAdd)
          throw new Error("The provided object is not a Layer.");
        var a = c(s);
        return this._layers[a] ? this : (this._layers[a] = s, s._mapToAdd = this, s.beforeAdd && s.beforeAdd(this), this.whenReady(s._layerAdd, s), this);
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the map.
      removeLayer: function(s) {
        var a = c(s);
        return this._layers[a] ? (this._loaded && s.onRemove(this), delete this._layers[a], this._loaded && (this.fire("layerremove", { layer: s }), s.fire("remove")), s._map = s._mapToAdd = null, this) : this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the map
      hasLayer: function(s) {
        return c(s) in this._layers;
      },
      /* @method eachLayer(fn: Function, context?: Object): this
       * Iterates over the layers of the map, optionally specifying context of the iterator function.
       * ```
       * map.eachLayer(function(layer){
       *     layer.bindPopup('Hello');
       * });
       * ```
       */
      eachLayer: function(s, a) {
        for (var h in this._layers)
          s.call(a, this._layers[h]);
        return this;
      },
      _addLayers: function(s) {
        s = s ? P(s) ? s : [s] : [];
        for (var a = 0, h = s.length; a < h; a++)
          this.addLayer(s[a]);
      },
      _addZoomLimit: function(s) {
        (!isNaN(s.options.maxZoom) || !isNaN(s.options.minZoom)) && (this._zoomBoundLayers[c(s)] = s, this._updateZoomLevels());
      },
      _removeZoomLimit: function(s) {
        var a = c(s);
        this._zoomBoundLayers[a] && (delete this._zoomBoundLayers[a], this._updateZoomLevels());
      },
      _updateZoomLevels: function() {
        var s = 1 / 0, a = -1 / 0, h = this._getZoomSpan();
        for (var f in this._zoomBoundLayers) {
          var m = this._zoomBoundLayers[f].options;
          s = m.minZoom === void 0 ? s : Math.min(s, m.minZoom), a = m.maxZoom === void 0 ? a : Math.max(a, m.maxZoom);
        }
        this._layersMaxZoom = a === -1 / 0 ? void 0 : a, this._layersMinZoom = s === 1 / 0 ? void 0 : s, h !== this._getZoomSpan() && this.fire("zoomlevelschange"), this.options.maxZoom === void 0 && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), this.options.minZoom === void 0 && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom);
      }
    });
    var Yi = We.extend({
      initialize: function(s, a) {
        k(this, a), this._layers = {};
        var h, f;
        if (s)
          for (h = 0, f = s.length; h < f; h++)
            this.addLayer(s[h]);
      },
      // @method addLayer(layer: Layer): this
      // Adds the given layer to the group.
      addLayer: function(s) {
        var a = this.getLayerId(s);
        return this._layers[a] = s, this._map && this._map.addLayer(s), this;
      },
      // @method removeLayer(layer: Layer): this
      // Removes the given layer from the group.
      // @alternative
      // @method removeLayer(id: Number): this
      // Removes the layer with the given internal ID from the group.
      removeLayer: function(s) {
        var a = s in this._layers ? s : this.getLayerId(s);
        return this._map && this._layers[a] && this._map.removeLayer(this._layers[a]), delete this._layers[a], this;
      },
      // @method hasLayer(layer: Layer): Boolean
      // Returns `true` if the given layer is currently added to the group.
      // @alternative
      // @method hasLayer(id: Number): Boolean
      // Returns `true` if the given internal ID is currently added to the group.
      hasLayer: function(s) {
        var a = typeof s == "number" ? s : this.getLayerId(s);
        return a in this._layers;
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
        var a = Array.prototype.slice.call(arguments, 1), h, f;
        for (h in this._layers)
          f = this._layers[h], f[s] && f[s].apply(f, a);
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
      eachLayer: function(s, a) {
        for (var h in this._layers)
          s.call(a, this._layers[h]);
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
        return c(s);
      }
    }), c0 = function(s, a) {
      return new Yi(s, a);
    }, pn = Yi.extend({
      addLayer: function(s) {
        return this.hasLayer(s) ? this : (s.addEventParent(this), Yi.prototype.addLayer.call(this, s), this.fire("layeradd", { layer: s }));
      },
      removeLayer: function(s) {
        return this.hasLayer(s) ? (s in this._layers && (s = this._layers[s]), s.removeEventParent(this), Yi.prototype.removeLayer.call(this, s), this.fire("layerremove", { layer: s })) : this;
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
        var s = new bt();
        for (var a in this._layers) {
          var h = this._layers[a];
          s.extend(h.getBounds ? h.getBounds() : h.getLatLng());
        }
        return s;
      }
    }), h0 = function(s, a) {
      return new pn(s, a);
    }, Ki = rt.extend({
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
        k(this, s);
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
      _createIcon: function(s, a) {
        var h = this._getIconUrl(s);
        if (!h) {
          if (s === "icon")
            throw new Error("iconUrl not set in Icon options (see the docs).");
          return null;
        }
        var f = this._createImg(h, a && a.tagName === "IMG" ? a : null);
        return this._setIconStyles(f, s), (this.options.crossOrigin || this.options.crossOrigin === "") && (f.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), f;
      },
      _setIconStyles: function(s, a) {
        var h = this.options, f = h[a + "Size"];
        typeof f == "number" && (f = [f, f]);
        var m = B(f), y = B(a === "shadow" && h.shadowAnchor || h.iconAnchor || m && m.divideBy(2, !0));
        s.className = "leaflet-marker-" + a + " " + (h.className || ""), y && (s.style.marginLeft = -y.x + "px", s.style.marginTop = -y.y + "px"), m && (s.style.width = m.x + "px", s.style.height = m.y + "px");
      },
      _createImg: function(s, a) {
        return a = a || document.createElement("img"), a.src = s, a;
      },
      _getIconUrl: function(s) {
        return K.retina && this.options[s + "RetinaUrl"] || this.options[s + "Url"];
      }
    });
    function d0(s) {
      return new Ki(s);
    }
    var Gs = Ki.extend({
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
        return typeof Gs.imagePath != "string" && (Gs.imagePath = this._detectIconPath()), (this.options.imagePath || Gs.imagePath) + Ki.prototype._getIconUrl.call(this, s);
      },
      _stripUrl: function(s) {
        var a = function(h, f, m) {
          var y = f.exec(h);
          return y && y[m];
        };
        return s = a(s, /^url\((['"])?(.+)\1\)$/, 2), s && a(s, /^(.*)marker-icon\.png$/, 1);
      },
      _detectIconPath: function() {
        var s = _t("div", "leaflet-default-icon-path", document.body), a = Ws(s, "background-image") || Ws(s, "backgroundImage");
        if (document.body.removeChild(s), a = this._stripUrl(a), a)
          return a;
        var h = document.querySelector('link[href$="leaflet.css"]');
        return h ? h.href.substring(0, h.href.length - 11 - 1) : "";
      }
    }), Yd = Je.extend({
      initialize: function(s) {
        this._marker = s;
      },
      addHooks: function() {
        var s = this._marker._icon;
        this._draggable || (this._draggable = new An(s, s, !0)), this._draggable.on({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).enable(), it(s, "leaflet-marker-draggable");
      },
      removeHooks: function() {
        this._draggable.off({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).disable(), this._marker._icon && jt(this._marker._icon, "leaflet-marker-draggable");
      },
      moved: function() {
        return this._draggable && this._draggable._moved;
      },
      _adjustPan: function(s) {
        var a = this._marker, h = a._map, f = this._marker.options.autoPanSpeed, m = this._marker.options.autoPanPadding, y = pi(a._icon), M = h.getPixelBounds(), z = h.getPixelOrigin(), O = tt(
          M.min._subtract(z).add(m),
          M.max._subtract(z).subtract(m)
        );
        if (!O.contains(y)) {
          var R = B(
            (Math.max(O.max.x, y.x) - O.max.x) / (M.max.x - O.max.x) - (Math.min(O.min.x, y.x) - O.min.x) / (M.min.x - O.min.x),
            (Math.max(O.max.y, y.y) - O.max.y) / (M.max.y - O.max.y) - (Math.min(O.min.y, y.y) - O.min.y) / (M.min.y - O.min.y)
          ).multiplyBy(f);
          h.panBy(R, { animate: !1 }), this._draggable._newPos._add(R), this._draggable._startPos._add(R), Ht(a._icon, this._draggable._newPos), this._onDrag(s), this._panRequest = V(this._adjustPan.bind(this, s));
        }
      },
      _onDragStart: function() {
        this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
      },
      _onPreDrag: function(s) {
        this._marker.options.autoPan && (U(this._panRequest), this._panRequest = V(this._adjustPan.bind(this, s)));
      },
      _onDrag: function(s) {
        var a = this._marker, h = a._shadow, f = pi(a._icon), m = a._map.layerPointToLatLng(f);
        h && Ht(h, f), a._latlng = m, s.latlng = m, s.oldLatLng = this._oldLatLng, a.fire("move", s).fire("drag", s);
      },
      _onDragEnd: function(s) {
        U(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", s);
      }
    }), xo = We.extend({
      // @section
      // @aka Marker options
      options: {
        // @option icon: Icon = *
        // Icon instance to use for rendering the marker.
        // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
        // If not specified, a common instance of `L.Icon.Default` is used.
        icon: new Gs(),
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
      initialize: function(s, a) {
        k(this, a), this._latlng = q(s);
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
        var a = this._latlng;
        return this._latlng = q(s), this.update(), this.fire("move", { oldLatLng: a, latlng: this._latlng });
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
        var s = this.options, a = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"), h = s.icon.createIcon(this._icon), f = !1;
        h !== this._icon && (this._icon && this._removeIcon(), f = !0, s.title && (h.title = s.title), h.tagName === "IMG" && (h.alt = s.alt || "")), it(h, a), s.keyboard && (h.tabIndex = "0", h.setAttribute("role", "button")), this._icon = h, s.riseOnHover && this.on({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && et(h, "focus", this._panOnFocus, this);
        var m = s.icon.createShadow(this._shadow), y = !1;
        m !== this._shadow && (this._removeShadow(), y = !0), m && (it(m, a), m.alt = ""), this._shadow = m, s.opacity < 1 && this._updateOpacity(), f && this.getPane().appendChild(this._icon), this._initInteraction(), m && y && this.getPane(s.shadowPane).appendChild(this._shadow);
      },
      _removeIcon: function() {
        this.options.riseOnHover && this.off({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && Pt(this._icon, "focus", this._panOnFocus, this), zt(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null;
      },
      _removeShadow: function() {
        this._shadow && zt(this._shadow), this._shadow = null;
      },
      _setPos: function(s) {
        this._icon && Ht(this._icon, s), this._shadow && Ht(this._shadow, s), this._zIndex = s.y + this.options.zIndexOffset, this._resetZIndex();
      },
      _updateZIndex: function(s) {
        this._icon && (this._icon.style.zIndex = this._zIndex + s);
      },
      _animateZoom: function(s) {
        var a = this._map._latLngToNewLayerPoint(this._latlng, s.zoom, s.center).round();
        this._setPos(a);
      },
      _initInteraction: function() {
        if (this.options.interactive && (it(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), Yd)) {
          var s = this.options.draggable;
          this.dragging && (s = this.dragging.enabled(), this.dragging.disable()), this.dragging = new Yd(this), s && this.dragging.enable();
        }
      },
      // @method setOpacity(opacity: Number): this
      // Changes the opacity of the marker.
      setOpacity: function(s) {
        return this.options.opacity = s, this._map && this._updateOpacity(), this;
      },
      _updateOpacity: function() {
        var s = this.options.opacity;
        this._icon && Ee(this._icon, s), this._shadow && Ee(this._shadow, s);
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
          var a = this.options.icon.options, h = a.iconSize ? B(a.iconSize) : B(0, 0), f = a.iconAnchor ? B(a.iconAnchor) : B(0, 0);
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
    function f0(s, a) {
      return new xo(s, a);
    }
    var In = We.extend({
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
        return k(this, s), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && s && Object.prototype.hasOwnProperty.call(s, "weight") && this._updateBounds()), this;
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
    }), wo = In.extend({
      // @section
      // @aka CircleMarker options
      options: {
        fill: !0,
        // @option radius: Number = 10
        // Radius of the circle marker, in pixels
        radius: 10
      },
      initialize: function(s, a) {
        k(this, a), this._latlng = q(s), this._radius = this.options.radius;
      },
      // @method setLatLng(latLng: LatLng): this
      // Sets the position of a circle marker to a new location.
      setLatLng: function(s) {
        var a = this._latlng;
        return this._latlng = q(s), this.redraw(), this.fire("move", { oldLatLng: a, latlng: this._latlng });
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
        var a = s && s.radius || this._radius;
        return In.prototype.setStyle.call(this, s), this.setRadius(a), this;
      },
      _project: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds();
      },
      _updateBounds: function() {
        var s = this._radius, a = this._radiusY || s, h = this._clickTolerance(), f = [s + h, a + h];
        this._pxBounds = new X(this._point.subtract(f), this._point.add(f));
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
    function p0(s, a) {
      return new wo(s, a);
    }
    var Jl = wo.extend({
      initialize: function(s, a, h) {
        if (typeof a == "number" && (a = r({}, h, { radius: a })), k(this, a), this._latlng = q(s), isNaN(this.options.radius))
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
        return new bt(
          this._map.layerPointToLatLng(this._point.subtract(s)),
          this._map.layerPointToLatLng(this._point.add(s))
        );
      },
      setStyle: In.prototype.setStyle,
      _project: function() {
        var s = this._latlng.lng, a = this._latlng.lat, h = this._map, f = h.options.crs;
        if (f.distance === Fe.distance) {
          var m = Math.PI / 180, y = this._mRadius / Fe.R / m, M = h.project([a + y, s]), z = h.project([a - y, s]), O = M.add(z).divideBy(2), R = h.unproject(O).lat, W = Math.acos((Math.cos(y * m) - Math.sin(a * m) * Math.sin(R * m)) / (Math.cos(a * m) * Math.cos(R * m))) / m;
          (isNaN(W) || W === 0) && (W = y / Math.cos(Math.PI / 180 * a)), this._point = O.subtract(h.getPixelOrigin()), this._radius = isNaN(W) ? 0 : O.x - h.project([R, s - W]).x, this._radiusY = O.y - M.y;
        } else {
          var Q = f.unproject(f.project(this._latlng).subtract([this._mRadius, 0]));
          this._point = h.latLngToLayerPoint(this._latlng), this._radius = this._point.x - h.latLngToLayerPoint(Q).x;
        }
        this._updateBounds();
      }
    });
    function m0(s, a, h) {
      return new Jl(s, a, h);
    }
    var mn = In.extend({
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
      initialize: function(s, a) {
        k(this, a), this._setLatLngs(s);
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
        for (var a = 1 / 0, h = null, f = Ks, m, y, M = 0, z = this._parts.length; M < z; M++)
          for (var O = this._parts[M], R = 1, W = O.length; R < W; R++) {
            m = O[R - 1], y = O[R];
            var Q = f(s, m, y, !0);
            Q < a && (a = Q, h = f(s, m, y));
          }
        return h && (h.distance = Math.sqrt(a)), h;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return Ud(this._defaultShape(), this._map.options.crs);
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
      addLatLng: function(s, a) {
        return a = a || this._defaultShape(), s = q(s), a.push(s), this._bounds.extend(s), this.redraw();
      },
      _setLatLngs: function(s) {
        this._bounds = new bt(), this._latlngs = this._convertLatLngs(s);
      },
      _defaultShape: function() {
        return ze(this._latlngs) ? this._latlngs : this._latlngs[0];
      },
      // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
      _convertLatLngs: function(s) {
        for (var a = [], h = ze(s), f = 0, m = s.length; f < m; f++)
          h ? (a[f] = q(s[f]), this._bounds.extend(a[f])) : a[f] = this._convertLatLngs(s[f]);
        return a;
      },
      _project: function() {
        var s = new X();
        this._rings = [], this._projectLatlngs(this._latlngs, this._rings, s), this._bounds.isValid() && s.isValid() && (this._rawPxBounds = s, this._updateBounds());
      },
      _updateBounds: function() {
        var s = this._clickTolerance(), a = new I(s, s);
        this._rawPxBounds && (this._pxBounds = new X([
          this._rawPxBounds.min.subtract(a),
          this._rawPxBounds.max.add(a)
        ]));
      },
      // recursively turns latlngs into a set of rings with projected coordinates
      _projectLatlngs: function(s, a, h) {
        var f = s[0] instanceof nt, m = s.length, y, M;
        if (f) {
          for (M = [], y = 0; y < m; y++)
            M[y] = this._map.latLngToLayerPoint(s[y]), h.extend(M[y]);
          a.push(M);
        } else
          for (y = 0; y < m; y++)
            this._projectLatlngs(s[y], a, h);
      },
      // clip polyline by renderer bounds so that we have less to render for performance
      _clipPoints: function() {
        var s = this._renderer._bounds;
        if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(s))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          var a = this._parts, h, f, m, y, M, z, O;
          for (h = 0, m = 0, y = this._rings.length; h < y; h++)
            for (O = this._rings[h], f = 0, M = O.length; f < M - 1; f++)
              z = Vd(O[f], O[f + 1], s, f, !0), z && (a[m] = a[m] || [], a[m].push(z[0]), (z[1] !== O[f + 1] || f === M - 2) && (a[m].push(z[1]), m++));
        }
      },
      // simplify each clipped part of the polyline for performance
      _simplifyPoints: function() {
        for (var s = this._parts, a = this.options.smoothFactor, h = 0, f = s.length; h < f; h++)
          s[h] = Fd(s[h], a);
      },
      _update: function() {
        this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
      },
      _updatePath: function() {
        this._renderer._updatePoly(this);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(s, a) {
        var h, f, m, y, M, z, O = this._clickTolerance();
        if (!this._pxBounds || !this._pxBounds.contains(s))
          return !1;
        for (h = 0, y = this._parts.length; h < y; h++)
          for (z = this._parts[h], f = 0, M = z.length, m = M - 1; f < M; m = f++)
            if (!(!a && f === 0) && Hd(s, z[m], z[f]) <= O)
              return !0;
        return !1;
      }
    });
    function g0(s, a) {
      return new mn(s, a);
    }
    mn._flat = Zd;
    var Gi = mn.extend({
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
        return Bd(this._defaultShape(), this._map.options.crs);
      },
      _convertLatLngs: function(s) {
        var a = mn.prototype._convertLatLngs.call(this, s), h = a.length;
        return h >= 2 && a[0] instanceof nt && a[0].equals(a[h - 1]) && a.pop(), a;
      },
      _setLatLngs: function(s) {
        mn.prototype._setLatLngs.call(this, s), ze(this._latlngs) && (this._latlngs = [this._latlngs]);
      },
      _defaultShape: function() {
        return ze(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
      },
      _clipPoints: function() {
        var s = this._renderer._bounds, a = this.options.weight, h = new I(a, a);
        if (s = new X(s.min.subtract(h), s.max.add(h)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(s))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var f = 0, m = this._rings.length, y; f < m; f++)
            y = jd(this._rings[f], s, !0), y.length && this._parts.push(y);
        }
      },
      _updatePath: function() {
        this._renderer._updatePoly(this, !0);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(s) {
        var a = !1, h, f, m, y, M, z, O, R;
        if (!this._pxBounds || !this._pxBounds.contains(s))
          return !1;
        for (y = 0, O = this._parts.length; y < O; y++)
          for (h = this._parts[y], M = 0, R = h.length, z = R - 1; M < R; z = M++)
            f = h[M], m = h[z], f.y > s.y != m.y > s.y && s.x < (m.x - f.x) * (s.y - f.y) / (m.y - f.y) + f.x && (a = !a);
        return a || mn.prototype._containsPoint.call(this, s, !0);
      }
    });
    function _0(s, a) {
      return new Gi(s, a);
    }
    var gn = pn.extend({
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
      initialize: function(s, a) {
        k(this, a), this._layers = {}, s && this.addData(s);
      },
      // @method addData( <GeoJSON> data ): this
      // Adds a GeoJSON object to the layer.
      addData: function(s) {
        var a = P(s) ? s : s.features, h, f, m;
        if (a) {
          for (h = 0, f = a.length; h < f; h++)
            m = a[h], (m.geometries || m.geometry || m.features || m.coordinates) && this.addData(m);
          return this;
        }
        var y = this.options;
        if (y.filter && !y.filter(s))
          return this;
        var M = ko(s, y);
        return M ? (M.feature = Po(s), M.defaultOptions = M.options, this.resetStyle(M), y.onEachFeature && y.onEachFeature(s, M), this.addLayer(M)) : this;
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
        return this.eachLayer(function(a) {
          this._setLayerStyle(a, s);
        }, this);
      },
      _setLayerStyle: function(s, a) {
        s.setStyle && (typeof a == "function" && (a = a(s.feature)), s.setStyle(a));
      }
    });
    function ko(s, a) {
      var h = s.type === "Feature" ? s.geometry : s, f = h ? h.coordinates : null, m = [], y = a && a.pointToLayer, M = a && a.coordsToLatLng || tu, z, O, R, W;
      if (!f && !h)
        return null;
      switch (h.type) {
        case "Point":
          return z = M(f), Kd(y, s, z, a);
        case "MultiPoint":
          for (R = 0, W = f.length; R < W; R++)
            z = M(f[R]), m.push(Kd(y, s, z, a));
          return new pn(m);
        case "LineString":
        case "MultiLineString":
          return O = bo(f, h.type === "LineString" ? 0 : 1, M), new mn(O, a);
        case "Polygon":
        case "MultiPolygon":
          return O = bo(f, h.type === "Polygon" ? 1 : 2, M), new Gi(O, a);
        case "GeometryCollection":
          for (R = 0, W = h.geometries.length; R < W; R++) {
            var Q = ko({
              geometry: h.geometries[R],
              type: "Feature",
              properties: s.properties
            }, a);
            Q && m.push(Q);
          }
          return new pn(m);
        case "FeatureCollection":
          for (R = 0, W = h.features.length; R < W; R++) {
            var at = ko(h.features[R], a);
            at && m.push(at);
          }
          return new pn(m);
        default:
          throw new Error("Invalid GeoJSON object.");
      }
    }
    function Kd(s, a, h, f) {
      return s ? s(a, h) : new xo(h, f && f.markersInheritOptions && f);
    }
    function tu(s) {
      return new nt(s[1], s[0], s[2]);
    }
    function bo(s, a, h) {
      for (var f = [], m = 0, y = s.length, M; m < y; m++)
        M = a ? bo(s[m], a - 1, h) : (h || tu)(s[m]), f.push(M);
      return f;
    }
    function eu(s, a) {
      return s = q(s), s.alt !== void 0 ? [_(s.lng, a), _(s.lat, a), _(s.alt, a)] : [_(s.lng, a), _(s.lat, a)];
    }
    function So(s, a, h, f) {
      for (var m = [], y = 0, M = s.length; y < M; y++)
        m.push(a ? So(s[y], ze(s[y]) ? 0 : a - 1, h, f) : eu(s[y], f));
      return !a && h && m.length > 0 && m.push(m[0].slice()), m;
    }
    function Xi(s, a) {
      return s.feature ? r({}, s.feature, { geometry: a }) : Po(a);
    }
    function Po(s) {
      return s.type === "Feature" || s.type === "FeatureCollection" ? s : {
        type: "Feature",
        properties: {},
        geometry: s
      };
    }
    var nu = {
      toGeoJSON: function(s) {
        return Xi(this, {
          type: "Point",
          coordinates: eu(this.getLatLng(), s)
        });
      }
    };
    xo.include(nu), Jl.include(nu), wo.include(nu), mn.include({
      toGeoJSON: function(s) {
        var a = !ze(this._latlngs), h = So(this._latlngs, a ? 1 : 0, !1, s);
        return Xi(this, {
          type: (a ? "Multi" : "") + "LineString",
          coordinates: h
        });
      }
    }), Gi.include({
      toGeoJSON: function(s) {
        var a = !ze(this._latlngs), h = a && !ze(this._latlngs[0]), f = So(this._latlngs, h ? 2 : a ? 1 : 0, !0, s);
        return a || (f = [f]), Xi(this, {
          type: (h ? "Multi" : "") + "Polygon",
          coordinates: f
        });
      }
    }), Yi.include({
      toMultiPoint: function(s) {
        var a = [];
        return this.eachLayer(function(h) {
          a.push(h.toGeoJSON(s).geometry.coordinates);
        }), Xi(this, {
          type: "MultiPoint",
          coordinates: a
        });
      },
      // @method toGeoJSON(precision?: Number|false): Object
      // Coordinates values are rounded with [`formatNum`](#util-formatnum) function with given `precision`.
      // Returns a [`GeoJSON`](https://en.wikipedia.org/wiki/GeoJSON) representation of the layer group (as a GeoJSON `FeatureCollection`, `GeometryCollection`, or `MultiPoint`).
      toGeoJSON: function(s) {
        var a = this.feature && this.feature.geometry && this.feature.geometry.type;
        if (a === "MultiPoint")
          return this.toMultiPoint(s);
        var h = a === "GeometryCollection", f = [];
        return this.eachLayer(function(m) {
          if (m.toGeoJSON) {
            var y = m.toGeoJSON(s);
            if (h)
              f.push(y.geometry);
            else {
              var M = Po(y);
              M.type === "FeatureCollection" ? f.push.apply(f, M.features) : f.push(M);
            }
          }
        }), h ? Xi(this, {
          geometries: f,
          type: "GeometryCollection"
        }) : {
          type: "FeatureCollection",
          features: f
        };
      }
    });
    function Gd(s, a) {
      return new gn(s, a);
    }
    var v0 = Gd, Mo = We.extend({
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
      initialize: function(s, a, h) {
        this._url = s, this._bounds = ot(a), k(this, h);
      },
      onAdd: function() {
        this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (it(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
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
        return this._map && Ui(this._image), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all overlays.
      bringToBack: function() {
        return this._map && $i(this._image), this;
      },
      // @method setUrl(url: String): this
      // Changes the URL of the image.
      setUrl: function(s) {
        return this._url = s, this._image && (this._image.src = s), this;
      },
      // @method setBounds(bounds: LatLngBounds): this
      // Update the bounds that this ImageOverlay covers
      setBounds: function(s) {
        return this._bounds = ot(s), this._map && this._reset(), this;
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
        var s = this._url.tagName === "IMG", a = this._image = s ? this._url : _t("img");
        if (it(a, "leaflet-image-layer"), this._zoomAnimated && it(a, "leaflet-zoom-animated"), this.options.className && it(a, this.options.className), a.onselectstart = g, a.onmousemove = g, a.onload = l(this.fire, this, "load"), a.onerror = l(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (a.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), s) {
          this._url = a.src;
          return;
        }
        a.src = this._url, a.alt = this.options.alt;
      },
      _animateZoom: function(s) {
        var a = this._map.getZoomScale(s.zoom), h = this._map._latLngBoundsToNewLayerBounds(this._bounds, s.zoom, s.center).min;
        fi(this._image, h, a);
      },
      _reset: function() {
        var s = this._image, a = new X(
          this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
          this._map.latLngToLayerPoint(this._bounds.getSouthEast())
        ), h = a.getSize();
        Ht(s, a.min), s.style.width = h.x + "px", s.style.height = h.y + "px";
      },
      _updateOpacity: function() {
        Ee(this._image, this.options.opacity);
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
    }), y0 = function(s, a, h) {
      return new Mo(s, a, h);
    }, Xd = Mo.extend({
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
        var s = this._url.tagName === "VIDEO", a = this._image = s ? this._url : _t("video");
        if (it(a, "leaflet-image-layer"), this._zoomAnimated && it(a, "leaflet-zoom-animated"), this.options.className && it(a, this.options.className), a.onselectstart = g, a.onmousemove = g, a.onloadeddata = l(this.fire, this, "load"), s) {
          for (var h = a.getElementsByTagName("source"), f = [], m = 0; m < h.length; m++)
            f.push(h[m].src);
          this._url = h.length > 0 ? f : [a.src];
          return;
        }
        P(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(a.style, "objectFit") && (a.style.objectFit = "fill"), a.autoplay = !!this.options.autoplay, a.loop = !!this.options.loop, a.muted = !!this.options.muted, a.playsInline = !!this.options.playsInline;
        for (var y = 0; y < this._url.length; y++) {
          var M = _t("source");
          M.src = this._url[y], a.appendChild(M);
        }
      }
      // @method getElement(): HTMLVideoElement
      // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
      // used by this overlay.
    });
    function x0(s, a, h) {
      return new Xd(s, a, h);
    }
    var qd = Mo.extend({
      _initImage: function() {
        var s = this._image = this._url;
        it(s, "leaflet-image-layer"), this._zoomAnimated && it(s, "leaflet-zoom-animated"), this.options.className && it(s, this.options.className), s.onselectstart = g, s.onmousemove = g;
      }
      // @method getElement(): SVGElement
      // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
      // used by this overlay.
    });
    function w0(s, a, h) {
      return new qd(s, a, h);
    }
    var tn = We.extend({
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
      initialize: function(s, a) {
        s && (s instanceof nt || P(s)) ? (this._latlng = q(s), k(this, a)) : (k(this, s), this._source = a), this.options.content && (this._content = this.options.content);
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
        this._zoomAnimated = s._zoomAnimated, this._container || this._initLayout(), s._fadeAnimated && Ee(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), s._fadeAnimated && Ee(this._container, 1), this.bringToFront(), this.options.interactive && (it(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
      },
      onRemove: function(s) {
        s._fadeAnimated ? (Ee(this._container, 0), this._removeTimeout = setTimeout(l(zt, void 0, this._container), 200)) : zt(this._container), this.options.interactive && (jt(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
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
        return this._latlng = q(s), this._map && (this._updatePosition(), this._adjustPan()), this;
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
        return this._map && Ui(this._container), this;
      },
      // @method bringToBack: this
      // Brings this overlay to the back of other overlays (in the same map pane).
      bringToBack: function() {
        return this._map && $i(this._container), this;
      },
      // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
      _prepareOpen: function(s) {
        var a = this._source;
        if (!a._map)
          return !1;
        if (a instanceof pn) {
          a = null;
          var h = this._source._layers;
          for (var f in h)
            if (h[f]._map) {
              a = h[f];
              break;
            }
          if (!a)
            return !1;
          this._source = a;
        }
        if (!s)
          if (a.getCenter)
            s = a.getCenter();
          else if (a.getLatLng)
            s = a.getLatLng();
          else if (a.getBounds)
            s = a.getBounds().getCenter();
          else
            throw new Error("Unable to get source layer LatLng.");
        return this.setLatLng(s), this._map && this.update(), !0;
      },
      _updateContent: function() {
        if (this._content) {
          var s = this._contentNode, a = typeof this._content == "function" ? this._content(this._source || this) : this._content;
          if (typeof a == "string")
            s.innerHTML = a;
          else {
            for (; s.hasChildNodes(); )
              s.removeChild(s.firstChild);
            s.appendChild(a);
          }
          this.fire("contentupdate");
        }
      },
      _updatePosition: function() {
        if (this._map) {
          var s = this._map.latLngToLayerPoint(this._latlng), a = B(this.options.offset), h = this._getAnchor();
          this._zoomAnimated ? Ht(this._container, s.add(h)) : a = a.add(s).add(h);
          var f = this._containerBottom = -a.y, m = this._containerLeft = -Math.round(this._containerWidth / 2) + a.x;
          this._container.style.bottom = f + "px", this._container.style.left = m + "px";
        }
      },
      _getAnchor: function() {
        return [0, 0];
      }
    });
    pt.include({
      _initOverlay: function(s, a, h, f) {
        var m = a;
        return m instanceof s || (m = new s(f).setContent(a)), h && m.setLatLng(h), m;
      }
    }), We.include({
      _initOverlay: function(s, a, h, f) {
        var m = h;
        return m instanceof s ? (k(m, f), m._source = this) : (m = a && !f ? a : new s(f, this), m.setContent(h)), m;
      }
    });
    var Co = tn.extend({
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
        return s = arguments.length ? s : this._source._map, !s.hasLayer(this) && s._popup && s._popup.options.autoClose && s.removeLayer(s._popup), s._popup = this, tn.prototype.openOn.call(this, s);
      },
      onAdd: function(s) {
        tn.prototype.onAdd.call(this, s), s.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof In || this._source.on("preclick", mi));
      },
      onRemove: function(s) {
        tn.prototype.onRemove.call(this, s), s.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof In || this._source.off("preclick", mi));
      },
      getEvents: function() {
        var s = tn.prototype.getEvents.call(this);
        return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (s.preclick = this.close), this.options.keepInView && (s.moveend = this._adjustPan), s;
      },
      _initLayout: function() {
        var s = "leaflet-popup", a = this._container = _t(
          "div",
          s + " " + (this.options.className || "") + " leaflet-zoom-animated"
        ), h = this._wrapper = _t("div", s + "-content-wrapper", a);
        if (this._contentNode = _t("div", s + "-content", h), $s(a), Ul(this._contentNode), et(a, "contextmenu", mi), this._tipContainer = _t("div", s + "-tip-container", a), this._tip = _t("div", s + "-tip", this._tipContainer), this.options.closeButton) {
          var f = this._closeButton = _t("a", s + "-close-button", a);
          f.setAttribute("role", "button"), f.setAttribute("aria-label", "Close popup"), f.href = "#close", f.innerHTML = '<span aria-hidden="true">&#215;</span>', et(f, "click", function(m) {
            Qt(m), this.close();
          }, this);
        }
      },
      _updateLayout: function() {
        var s = this._contentNode, a = s.style;
        a.width = "", a.whiteSpace = "nowrap";
        var h = s.offsetWidth;
        h = Math.min(h, this.options.maxWidth), h = Math.max(h, this.options.minWidth), a.width = h + 1 + "px", a.whiteSpace = "", a.height = "";
        var f = s.offsetHeight, m = this.options.maxHeight, y = "leaflet-popup-scrolled";
        m && f > m ? (a.height = m + "px", it(s, y)) : jt(s, y), this._containerWidth = this._container.offsetWidth;
      },
      _animateZoom: function(s) {
        var a = this._map._latLngToNewLayerPoint(this._latlng, s.zoom, s.center), h = this._getAnchor();
        Ht(this._container, a.add(h));
      },
      _adjustPan: function() {
        if (this.options.autoPan) {
          if (this._map._panAnim && this._map._panAnim.stop(), this._autopanning) {
            this._autopanning = !1;
            return;
          }
          var s = this._map, a = parseInt(Ws(this._container, "marginBottom"), 10) || 0, h = this._container.offsetHeight + a, f = this._containerWidth, m = new I(this._containerLeft, -h - this._containerBottom);
          m._add(pi(this._container));
          var y = s.layerPointToContainerPoint(m), M = B(this.options.autoPanPadding), z = B(this.options.autoPanPaddingTopLeft || M), O = B(this.options.autoPanPaddingBottomRight || M), R = s.getSize(), W = 0, Q = 0;
          y.x + f + O.x > R.x && (W = y.x + f - R.x + O.x), y.x - W - z.x < 0 && (W = y.x - z.x), y.y + h + O.y > R.y && (Q = y.y + h - R.y + O.y), y.y - Q - z.y < 0 && (Q = y.y - z.y), (W || Q) && (this.options.keepInView && (this._autopanning = !0), s.fire("autopanstart").panBy([W, Q]));
        }
      },
      _getAnchor: function() {
        return B(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
      }
    }), k0 = function(s, a) {
      return new Co(s, a);
    };
    pt.mergeOptions({
      closePopupOnClick: !0
    }), pt.include({
      // @method openPopup(popup: Popup): this
      // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
      // @alternative
      // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
      // Creates a popup with the specified content and options and opens it in the given point on a map.
      openPopup: function(s, a, h) {
        return this._initOverlay(Co, s, a, h).openOn(this), this;
      },
      // @method closePopup(popup?: Popup): this
      // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
      closePopup: function(s) {
        return s = arguments.length ? s : this._popup, s && s.close(), this;
      }
    }), We.include({
      // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
      // Binds a popup to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindPopup: function(s, a) {
        return this._popup = this._initOverlay(Co, this._popup, s, a), this._popupHandlersAdded || (this.on({
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
        return this._popup && (this instanceof pn || (this._popup._source = this), this._popup._prepareOpen(s || this._latlng) && this._popup.openOn(this._map)), this;
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
          gi(s);
          var a = s.layer || s.target;
          if (this._popup._source === a && !(a instanceof In)) {
            this._map.hasLayer(this._popup) ? this.closePopup() : this.openPopup(s.latlng);
            return;
          }
          this._popup._source = a, this.openPopup(s.latlng);
        }
      },
      _movePopup: function(s) {
        this._popup.setLatLng(s.latlng);
      },
      _onKeyPress: function(s) {
        s.originalEvent.keyCode === 13 && this._openPopup(s);
      }
    });
    var Lo = tn.extend({
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
        tn.prototype.onAdd.call(this, s), this.setOpacity(this.options.opacity), s.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
      },
      onRemove: function(s) {
        tn.prototype.onRemove.call(this, s), s.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
      },
      getEvents: function() {
        var s = tn.prototype.getEvents.call(this);
        return this.options.permanent || (s.preclick = this.close), s;
      },
      _initLayout: function() {
        var s = "leaflet-tooltip", a = s + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
        this._contentNode = this._container = _t("div", a), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + c(this));
      },
      _updateLayout: function() {
      },
      _adjustPan: function() {
      },
      _setPosition: function(s) {
        var a, h, f = this._map, m = this._container, y = f.latLngToContainerPoint(f.getCenter()), M = f.layerPointToContainerPoint(s), z = this.options.direction, O = m.offsetWidth, R = m.offsetHeight, W = B(this.options.offset), Q = this._getAnchor();
        z === "top" ? (a = O / 2, h = R) : z === "bottom" ? (a = O / 2, h = 0) : z === "center" ? (a = O / 2, h = R / 2) : z === "right" ? (a = 0, h = R / 2) : z === "left" ? (a = O, h = R / 2) : M.x < y.x ? (z = "right", a = 0, h = R / 2) : (z = "left", a = O + (W.x + Q.x) * 2, h = R / 2), s = s.subtract(B(a, h, !0)).add(W).add(Q), jt(m, "leaflet-tooltip-right"), jt(m, "leaflet-tooltip-left"), jt(m, "leaflet-tooltip-top"), jt(m, "leaflet-tooltip-bottom"), it(m, "leaflet-tooltip-" + z), Ht(m, s);
      },
      _updatePosition: function() {
        var s = this._map.latLngToLayerPoint(this._latlng);
        this._setPosition(s);
      },
      setOpacity: function(s) {
        this.options.opacity = s, this._container && Ee(this._container, s);
      },
      _animateZoom: function(s) {
        var a = this._map._latLngToNewLayerPoint(this._latlng, s.zoom, s.center);
        this._setPosition(a);
      },
      _getAnchor: function() {
        return B(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
      }
    }), b0 = function(s, a) {
      return new Lo(s, a);
    };
    pt.include({
      // @method openTooltip(tooltip: Tooltip): this
      // Opens the specified tooltip.
      // @alternative
      // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
      // Creates a tooltip with the specified content and options and open it.
      openTooltip: function(s, a, h) {
        return this._initOverlay(Lo, s, a, h).openOn(this), this;
      },
      // @method closeTooltip(tooltip: Tooltip): this
      // Closes the tooltip given as parameter.
      closeTooltip: function(s) {
        return s.close(), this;
      }
    }), We.include({
      // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
      // Binds a tooltip to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindTooltip: function(s, a) {
        return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(Lo, this._tooltip, s, a), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
      },
      // @method unbindTooltip(): this
      // Removes the tooltip previously bound with `bindTooltip`.
      unbindTooltip: function() {
        return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this;
      },
      _initTooltipInteractions: function(s) {
        if (!(!s && this._tooltipHandlersAdded)) {
          var a = s ? "off" : "on", h = {
            remove: this.closeTooltip,
            move: this._moveTooltip
          };
          this._tooltip.options.permanent ? h.add = this._openTooltip : (h.mouseover = this._openTooltip, h.mouseout = this.closeTooltip, h.click = this._openTooltip, this._map ? this._addFocusListeners() : h.add = this._addFocusListeners), this._tooltip.options.sticky && (h.mousemove = this._moveTooltip), this[a](h), this._tooltipHandlersAdded = !s;
        }
      },
      // @method openTooltip(latlng?: LatLng): this
      // Opens the bound tooltip at the specified `latlng` or at the default tooltip anchor if no `latlng` is passed.
      openTooltip: function(s) {
        return this._tooltip && (this instanceof pn || (this._tooltip._source = this), this._tooltip._prepareOpen(s) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
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
        var a = typeof s.getElement == "function" && s.getElement();
        a && (et(a, "focus", function() {
          this._tooltip._source = s, this.openTooltip();
        }, this), et(a, "blur", this.closeTooltip, this));
      },
      _setAriaDescribedByOnLayer: function(s) {
        var a = typeof s.getElement == "function" && s.getElement();
        a && a.setAttribute("aria-describedby", this._tooltip._container.id);
      },
      _openTooltip: function(s) {
        if (!(!this._tooltip || !this._map)) {
          if (this._map.dragging && this._map.dragging.moving() && !this._openOnceFlag) {
            this._openOnceFlag = !0;
            var a = this;
            this._map.once("moveend", function() {
              a._openOnceFlag = !1, a._openTooltip(s);
            });
            return;
          }
          this._tooltip._source = s.layer || s.target, this.openTooltip(this._tooltip.options.sticky ? s.latlng : void 0);
        }
      },
      _moveTooltip: function(s) {
        var a = s.latlng, h, f;
        this._tooltip.options.sticky && s.originalEvent && (h = this._map.mouseEventToContainerPoint(s.originalEvent), f = this._map.containerPointToLayerPoint(h), a = this._map.layerPointToLatLng(f)), this._tooltip.setLatLng(a);
      }
    });
    var Qd = Ki.extend({
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
        var a = s && s.tagName === "DIV" ? s : document.createElement("div"), h = this.options;
        if (h.html instanceof Element ? (po(a), a.appendChild(h.html)) : a.innerHTML = h.html !== !1 ? h.html : "", h.bgPos) {
          var f = B(h.bgPos);
          a.style.backgroundPosition = -f.x + "px " + -f.y + "px";
        }
        return this._setIconStyles(a, "icon"), a;
      },
      createShadow: function() {
        return null;
      }
    });
    function S0(s) {
      return new Qd(s);
    }
    Ki.Default = Gs;
    var Xs = We.extend({
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
        updateWhenIdle: K.mobile,
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
        k(this, s);
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
        return this._map && (Ui(this._container), this._setAutoZIndex(Math.max)), this;
      },
      // @method bringToBack: this
      // Brings the tile layer to the bottom of all tile layers.
      bringToBack: function() {
        return this._map && ($i(this._container), this._setAutoZIndex(Math.min)), this;
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
        for (var a = this.getPane().children, h = -s(-1 / 0, 1 / 0), f = 0, m = a.length, y; f < m; f++)
          y = a[f].style.zIndex, a[f] !== this._container && y && (h = s(h, +y));
        isFinite(h) && (this.options.zIndex = h + s(-1, 1), this._updateZIndex());
      },
      _updateOpacity: function() {
        if (this._map && !K.ielt9) {
          Ee(this._container, this.options.opacity);
          var s = +/* @__PURE__ */ new Date(), a = !1, h = !1;
          for (var f in this._tiles) {
            var m = this._tiles[f];
            if (!(!m.current || !m.loaded)) {
              var y = Math.min(1, (s - m.loaded) / 200);
              Ee(m.el, y), y < 1 ? a = !0 : (m.active ? h = !0 : this._onOpaqueTile(m), m.active = !0);
            }
          }
          h && !this._noPrune && this._pruneTiles(), a && (U(this._fadeFrame), this._fadeFrame = V(this._updateOpacity, this));
        }
      },
      _onOpaqueTile: g,
      _initContainer: function() {
        this._container || (this._container = _t("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
      },
      _updateLevels: function() {
        var s = this._tileZoom, a = this.options.maxZoom;
        if (s !== void 0) {
          for (var h in this._levels)
            h = Number(h), this._levels[h].el.children.length || h === s ? (this._levels[h].el.style.zIndex = a - Math.abs(s - h), this._onUpdateLevel(h)) : (zt(this._levels[h].el), this._removeTilesAtZoom(h), this._onRemoveLevel(h), delete this._levels[h]);
          var f = this._levels[s], m = this._map;
          return f || (f = this._levels[s] = {}, f.el = _t("div", "leaflet-tile-container leaflet-zoom-animated", this._container), f.el.style.zIndex = a, f.origin = m.project(m.unproject(m.getPixelOrigin()), s).round(), f.zoom = s, this._setZoomTransform(f, m.getCenter(), m.getZoom()), g(f.el.offsetWidth), this._onCreateLevel(f)), this._level = f, f;
        }
      },
      _onUpdateLevel: g,
      _onRemoveLevel: g,
      _onCreateLevel: g,
      _pruneTiles: function() {
        if (this._map) {
          var s, a, h = this._map.getZoom();
          if (h > this.options.maxZoom || h < this.options.minZoom) {
            this._removeAllTiles();
            return;
          }
          for (s in this._tiles)
            a = this._tiles[s], a.retain = a.current;
          for (s in this._tiles)
            if (a = this._tiles[s], a.current && !a.active) {
              var f = a.coords;
              this._retainParent(f.x, f.y, f.z, f.z - 5) || this._retainChildren(f.x, f.y, f.z, f.z + 2);
            }
          for (s in this._tiles)
            this._tiles[s].retain || this._removeTile(s);
        }
      },
      _removeTilesAtZoom: function(s) {
        for (var a in this._tiles)
          this._tiles[a].coords.z === s && this._removeTile(a);
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
      _retainParent: function(s, a, h, f) {
        var m = Math.floor(s / 2), y = Math.floor(a / 2), M = h - 1, z = new I(+m, +y);
        z.z = +M;
        var O = this._tileCoordsToKey(z), R = this._tiles[O];
        return R && R.active ? (R.retain = !0, !0) : (R && R.loaded && (R.retain = !0), M > f ? this._retainParent(m, y, M, f) : !1);
      },
      _retainChildren: function(s, a, h, f) {
        for (var m = 2 * s; m < 2 * s + 2; m++)
          for (var y = 2 * a; y < 2 * a + 2; y++) {
            var M = new I(m, y);
            M.z = h + 1;
            var z = this._tileCoordsToKey(M), O = this._tiles[z];
            if (O && O.active) {
              O.retain = !0;
              continue;
            } else O && O.loaded && (O.retain = !0);
            h + 1 < f && this._retainChildren(m, y, h + 1, f);
          }
      },
      _resetView: function(s) {
        var a = s && (s.pinch || s.flyTo);
        this._setView(this._map.getCenter(), this._map.getZoom(), a, a);
      },
      _animateZoom: function(s) {
        this._setView(s.center, s.zoom, !0, s.noUpdate);
      },
      _clampZoom: function(s) {
        var a = this.options;
        return a.minNativeZoom !== void 0 && s < a.minNativeZoom ? a.minNativeZoom : a.maxNativeZoom !== void 0 && a.maxNativeZoom < s ? a.maxNativeZoom : s;
      },
      _setView: function(s, a, h, f) {
        var m = Math.round(a);
        this.options.maxZoom !== void 0 && m > this.options.maxZoom || this.options.minZoom !== void 0 && m < this.options.minZoom ? m = void 0 : m = this._clampZoom(m);
        var y = this.options.updateWhenZooming && m !== this._tileZoom;
        (!f || y) && (this._tileZoom = m, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), m !== void 0 && this._update(s), h || this._pruneTiles(), this._noPrune = !!h), this._setZoomTransforms(s, a);
      },
      _setZoomTransforms: function(s, a) {
        for (var h in this._levels)
          this._setZoomTransform(this._levels[h], s, a);
      },
      _setZoomTransform: function(s, a, h) {
        var f = this._map.getZoomScale(h, s.zoom), m = s.origin.multiplyBy(f).subtract(this._map._getNewPixelOrigin(a, h)).round();
        K.any3d ? fi(s.el, m, f) : Ht(s.el, m);
      },
      _resetGrid: function() {
        var s = this._map, a = s.options.crs, h = this._tileSize = this.getTileSize(), f = this._tileZoom, m = this._map.getPixelWorldBounds(this._tileZoom);
        m && (this._globalTileRange = this._pxBoundsToTileRange(m)), this._wrapX = a.wrapLng && !this.options.noWrap && [
          Math.floor(s.project([0, a.wrapLng[0]], f).x / h.x),
          Math.ceil(s.project([0, a.wrapLng[1]], f).x / h.y)
        ], this._wrapY = a.wrapLat && !this.options.noWrap && [
          Math.floor(s.project([a.wrapLat[0], 0], f).y / h.x),
          Math.ceil(s.project([a.wrapLat[1], 0], f).y / h.y)
        ];
      },
      _onMoveEnd: function() {
        !this._map || this._map._animatingZoom || this._update();
      },
      _getTiledPixelBounds: function(s) {
        var a = this._map, h = a._animatingZoom ? Math.max(a._animateToZoom, a.getZoom()) : a.getZoom(), f = a.getZoomScale(h, this._tileZoom), m = a.project(s, this._tileZoom).floor(), y = a.getSize().divideBy(f * 2);
        return new X(m.subtract(y), m.add(y));
      },
      // Private method to load tiles in the grid's active zoom level according to map bounds
      _update: function(s) {
        var a = this._map;
        if (a) {
          var h = this._clampZoom(a.getZoom());
          if (s === void 0 && (s = a.getCenter()), this._tileZoom !== void 0) {
            var f = this._getTiledPixelBounds(s), m = this._pxBoundsToTileRange(f), y = m.getCenter(), M = [], z = this.options.keepBuffer, O = new X(
              m.getBottomLeft().subtract([z, -z]),
              m.getTopRight().add([z, -z])
            );
            if (!(isFinite(m.min.x) && isFinite(m.min.y) && isFinite(m.max.x) && isFinite(m.max.y)))
              throw new Error("Attempted to load an infinite number of tiles");
            for (var R in this._tiles) {
              var W = this._tiles[R].coords;
              (W.z !== this._tileZoom || !O.contains(new I(W.x, W.y))) && (this._tiles[R].current = !1);
            }
            if (Math.abs(h - this._tileZoom) > 1) {
              this._setView(s, h);
              return;
            }
            for (var Q = m.min.y; Q <= m.max.y; Q++)
              for (var at = m.min.x; at <= m.max.x; at++) {
                var le = new I(at, Q);
                if (le.z = this._tileZoom, !!this._isValidTile(le)) {
                  var Kt = this._tiles[this._tileCoordsToKey(le)];
                  Kt ? Kt.current = !0 : M.push(le);
                }
              }
            if (M.sort(function(fe, Qi) {
              return fe.distanceTo(y) - Qi.distanceTo(y);
            }), M.length !== 0) {
              this._loading || (this._loading = !0, this.fire("loading"));
              var Oe = document.createDocumentFragment();
              for (at = 0; at < M.length; at++)
                this._addTile(M[at], Oe);
              this._level.el.appendChild(Oe);
            }
          }
        }
      },
      _isValidTile: function(s) {
        var a = this._map.options.crs;
        if (!a.infinite) {
          var h = this._globalTileRange;
          if (!a.wrapLng && (s.x < h.min.x || s.x > h.max.x) || !a.wrapLat && (s.y < h.min.y || s.y > h.max.y))
            return !1;
        }
        if (!this.options.bounds)
          return !0;
        var f = this._tileCoordsToBounds(s);
        return ot(this.options.bounds).overlaps(f);
      },
      _keyToBounds: function(s) {
        return this._tileCoordsToBounds(this._keyToTileCoords(s));
      },
      _tileCoordsToNwSe: function(s) {
        var a = this._map, h = this.getTileSize(), f = s.scaleBy(h), m = f.add(h), y = a.unproject(f, s.z), M = a.unproject(m, s.z);
        return [y, M];
      },
      // converts tile coordinates to its geographical bounds
      _tileCoordsToBounds: function(s) {
        var a = this._tileCoordsToNwSe(s), h = new bt(a[0], a[1]);
        return this.options.noWrap || (h = this._map.wrapLatLngBounds(h)), h;
      },
      // converts tile coordinates to key for the tile cache
      _tileCoordsToKey: function(s) {
        return s.x + ":" + s.y + ":" + s.z;
      },
      // converts tile cache key to coordinates
      _keyToTileCoords: function(s) {
        var a = s.split(":"), h = new I(+a[0], +a[1]);
        return h.z = +a[2], h;
      },
      _removeTile: function(s) {
        var a = this._tiles[s];
        a && (zt(a.el), delete this._tiles[s], this.fire("tileunload", {
          tile: a.el,
          coords: this._keyToTileCoords(s)
        }));
      },
      _initTile: function(s) {
        it(s, "leaflet-tile");
        var a = this.getTileSize();
        s.style.width = a.x + "px", s.style.height = a.y + "px", s.onselectstart = g, s.onmousemove = g, K.ielt9 && this.options.opacity < 1 && Ee(s, this.options.opacity);
      },
      _addTile: function(s, a) {
        var h = this._getTilePos(s), f = this._tileCoordsToKey(s), m = this.createTile(this._wrapCoords(s), l(this._tileReady, this, s));
        this._initTile(m), this.createTile.length < 2 && V(l(this._tileReady, this, s, null, m)), Ht(m, h), this._tiles[f] = {
          el: m,
          coords: s,
          current: !0
        }, a.appendChild(m), this.fire("tileloadstart", {
          tile: m,
          coords: s
        });
      },
      _tileReady: function(s, a, h) {
        a && this.fire("tileerror", {
          error: a,
          tile: h,
          coords: s
        });
        var f = this._tileCoordsToKey(s);
        h = this._tiles[f], h && (h.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (Ee(h.el, 0), U(this._fadeFrame), this._fadeFrame = V(this._updateOpacity, this)) : (h.active = !0, this._pruneTiles()), a || (it(h.el, "leaflet-tile-loaded"), this.fire("tileload", {
          tile: h.el,
          coords: s
        })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), K.ielt9 || !this._map._fadeAnimated ? V(this._pruneTiles, this) : setTimeout(l(this._pruneTiles, this), 250)));
      },
      _getTilePos: function(s) {
        return s.scaleBy(this.getTileSize()).subtract(this._level.origin);
      },
      _wrapCoords: function(s) {
        var a = new I(
          this._wrapX ? p(s.x, this._wrapX) : s.x,
          this._wrapY ? p(s.y, this._wrapY) : s.y
        );
        return a.z = s.z, a;
      },
      _pxBoundsToTileRange: function(s) {
        var a = this.getTileSize();
        return new X(
          s.min.unscaleBy(a).floor(),
          s.max.unscaleBy(a).ceil().subtract([1, 1])
        );
      },
      _noTilesToLoad: function() {
        for (var s in this._tiles)
          if (!this._tiles[s].loaded)
            return !1;
        return !0;
      }
    });
    function P0(s) {
      return new Xs(s);
    }
    var qi = Xs.extend({
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
      initialize: function(s, a) {
        this._url = s, a = k(this, a), a.detectRetina && K.retina && a.maxZoom > 0 ? (a.tileSize = Math.floor(a.tileSize / 2), a.zoomReverse ? (a.zoomOffset--, a.minZoom = Math.min(a.maxZoom, a.minZoom + 1)) : (a.zoomOffset++, a.maxZoom = Math.max(a.minZoom, a.maxZoom - 1)), a.minZoom = Math.max(0, a.minZoom)) : a.zoomReverse ? a.minZoom = Math.min(a.maxZoom, a.minZoom) : a.maxZoom = Math.max(a.minZoom, a.maxZoom), typeof a.subdomains == "string" && (a.subdomains = a.subdomains.split("")), this.on("tileunload", this._onTileRemove);
      },
      // @method setUrl(url: String, noRedraw?: Boolean): this
      // Updates the layer's URL template and redraws it (unless `noRedraw` is set to `true`).
      // If the URL does not change, the layer will not be redrawn unless
      // the noRedraw parameter is set to false.
      setUrl: function(s, a) {
        return this._url === s && a === void 0 && (a = !0), this._url = s, a || this.redraw(), this;
      },
      // @method createTile(coords: Object, done?: Function): HTMLElement
      // Called only internally, overrides GridLayer's [`createTile()`](#gridlayer-createtile)
      // to return an `<img>` HTML element with the appropriate image URL given `coords`. The `done`
      // callback is called when the tile has been loaded.
      createTile: function(s, a) {
        var h = document.createElement("img");
        return et(h, "load", l(this._tileOnLoad, this, a, h)), et(h, "error", l(this._tileOnError, this, a, h)), (this.options.crossOrigin || this.options.crossOrigin === "") && (h.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), typeof this.options.referrerPolicy == "string" && (h.referrerPolicy = this.options.referrerPolicy), h.alt = "", h.src = this.getTileUrl(s), h;
      },
      // @section Extension methods
      // @uninheritable
      // Layers extending `TileLayer` might reimplement the following method.
      // @method getTileUrl(coords: Object): String
      // Called only internally, returns the URL for a tile given its coordinates.
      // Classes extending `TileLayer` can override this function to provide custom tile URL naming schemes.
      getTileUrl: function(s) {
        var a = {
          r: K.retina ? "@2x" : "",
          s: this._getSubdomain(s),
          x: s.x,
          y: s.y,
          z: this._getZoomForUrl()
        };
        if (this._map && !this._map.options.crs.infinite) {
          var h = this._globalTileRange.max.y - s.y;
          this.options.tms && (a.y = h), a["-y"] = h;
        }
        return b(this._url, r(a, this.options));
      },
      _tileOnLoad: function(s, a) {
        K.ielt9 ? setTimeout(l(s, this, null, a), 0) : s(null, a);
      },
      _tileOnError: function(s, a, h) {
        var f = this.options.errorTileUrl;
        f && a.getAttribute("src") !== f && (a.src = f), s(h, a);
      },
      _onTileRemove: function(s) {
        s.tile.onload = null;
      },
      _getZoomForUrl: function() {
        var s = this._tileZoom, a = this.options.maxZoom, h = this.options.zoomReverse, f = this.options.zoomOffset;
        return h && (s = a - s), s + f;
      },
      _getSubdomain: function(s) {
        var a = Math.abs(s.x + s.y) % this.options.subdomains.length;
        return this.options.subdomains[a];
      },
      // stops loading all tiles in the background layer
      _abortLoading: function() {
        var s, a;
        for (s in this._tiles)
          if (this._tiles[s].coords.z !== this._tileZoom && (a = this._tiles[s].el, a.onload = g, a.onerror = g, !a.complete)) {
            a.src = E;
            var h = this._tiles[s].coords;
            zt(a), delete this._tiles[s], this.fire("tileabort", {
              tile: a,
              coords: h
            });
          }
      },
      _removeTile: function(s) {
        var a = this._tiles[s];
        if (a)
          return a.el.setAttribute("src", E), Xs.prototype._removeTile.call(this, s);
      },
      _tileReady: function(s, a, h) {
        if (!(!this._map || h && h.getAttribute("src") === E))
          return Xs.prototype._tileReady.call(this, s, a, h);
      }
    });
    function Jd(s, a) {
      return new qi(s, a);
    }
    var tf = qi.extend({
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
      initialize: function(s, a) {
        this._url = s;
        var h = r({}, this.defaultWmsParams);
        for (var f in a)
          f in this.options || (h[f] = a[f]);
        a = k(this, a);
        var m = a.detectRetina && K.retina ? 2 : 1, y = this.getTileSize();
        h.width = y.x * m, h.height = y.y * m, this.wmsParams = h;
      },
      onAdd: function(s) {
        this._crs = this.options.crs || s.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
        var a = this._wmsVersion >= 1.3 ? "crs" : "srs";
        this.wmsParams[a] = this._crs.code, qi.prototype.onAdd.call(this, s);
      },
      getTileUrl: function(s) {
        var a = this._tileCoordsToNwSe(s), h = this._crs, f = tt(h.project(a[0]), h.project(a[1])), m = f.min, y = f.max, M = (this._wmsVersion >= 1.3 && this._crs === $d ? [m.y, m.x, y.y, y.x] : [m.x, m.y, y.x, y.y]).join(","), z = qi.prototype.getTileUrl.call(this, s);
        return z + C(this.wmsParams, z, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + M;
      },
      // @method setParams(params: Object, noRedraw?: Boolean): this
      // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
      setParams: function(s, a) {
        return r(this.wmsParams, s), a || this.redraw(), this;
      }
    });
    function M0(s, a) {
      return new tf(s, a);
    }
    qi.WMS = tf, Jd.wms = M0;
    var _n = We.extend({
      // @section
      // @aka Renderer options
      options: {
        // @option padding: Number = 0.1
        // How much to extend the clip area around the map view (relative to its size)
        // e.g. 0.1 would be 10% of map view in each direction
        padding: 0.1
      },
      initialize: function(s) {
        k(this, s), c(this), this._layers = this._layers || {};
      },
      onAdd: function() {
        this._container || (this._initContainer(), it(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
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
      _updateTransform: function(s, a) {
        var h = this._map.getZoomScale(a, this._zoom), f = this._map.getSize().multiplyBy(0.5 + this.options.padding), m = this._map.project(this._center, a), y = f.multiplyBy(-h).add(m).subtract(this._map._getNewPixelOrigin(s, a));
        K.any3d ? fi(this._container, y, h) : Ht(this._container, y);
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
        var s = this.options.padding, a = this._map.getSize(), h = this._map.containerPointToLayerPoint(a.multiplyBy(-s)).round();
        this._bounds = new X(h, h.add(a.multiplyBy(1 + s * 2)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom();
      }
    }), ef = _n.extend({
      // @section
      // @aka Canvas options
      options: {
        // @option tolerance: Number = 0
        // How much to extend the click tolerance around a path/object on the map.
        tolerance: 0
      },
      getEvents: function() {
        var s = _n.prototype.getEvents.call(this);
        return s.viewprereset = this._onViewPreReset, s;
      },
      _onViewPreReset: function() {
        this._postponeUpdatePaths = !0;
      },
      onAdd: function() {
        _n.prototype.onAdd.call(this), this._draw();
      },
      _initContainer: function() {
        var s = this._container = document.createElement("canvas");
        et(s, "mousemove", this._onMouseMove, this), et(s, "click dblclick mousedown mouseup contextmenu", this._onClick, this), et(s, "mouseout", this._handleMouseOut, this), s._leaflet_disable_events = !0, this._ctx = s.getContext("2d");
      },
      _destroyContainer: function() {
        U(this._redrawRequest), delete this._ctx, zt(this._container), Pt(this._container), delete this._container;
      },
      _updatePaths: function() {
        if (!this._postponeUpdatePaths) {
          var s;
          this._redrawBounds = null;
          for (var a in this._layers)
            s = this._layers[a], s._update();
          this._redraw();
        }
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          _n.prototype._update.call(this);
          var s = this._bounds, a = this._container, h = s.getSize(), f = K.retina ? 2 : 1;
          Ht(a, s.min), a.width = f * h.x, a.height = f * h.y, a.style.width = h.x + "px", a.style.height = h.y + "px", K.retina && this._ctx.scale(2, 2), this._ctx.translate(-s.min.x, -s.min.y), this.fire("update");
        }
      },
      _reset: function() {
        _n.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
      },
      _initPath: function(s) {
        this._updateDashArray(s), this._layers[c(s)] = s;
        var a = s._order = {
          layer: s,
          prev: this._drawLast,
          next: null
        };
        this._drawLast && (this._drawLast.next = a), this._drawLast = a, this._drawFirst = this._drawFirst || this._drawLast;
      },
      _addPath: function(s) {
        this._requestRedraw(s);
      },
      _removePath: function(s) {
        var a = s._order, h = a.next, f = a.prev;
        h ? h.prev = f : this._drawLast = f, f ? f.next = h : this._drawFirst = h, delete s._order, delete this._layers[c(s)], this._requestRedraw(s);
      },
      _updatePath: function(s) {
        this._extendRedrawBounds(s), s._project(), s._update(), this._requestRedraw(s);
      },
      _updateStyle: function(s) {
        this._updateDashArray(s), this._requestRedraw(s);
      },
      _updateDashArray: function(s) {
        if (typeof s.options.dashArray == "string") {
          var a = s.options.dashArray.split(/[, ]+/), h = [], f, m;
          for (m = 0; m < a.length; m++) {
            if (f = Number(a[m]), isNaN(f))
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
          var a = (s.options.weight || 0) + 1;
          this._redrawBounds = this._redrawBounds || new X(), this._redrawBounds.extend(s._pxBounds.min.subtract([a, a])), this._redrawBounds.extend(s._pxBounds.max.add([a, a]));
        }
      },
      _redraw: function() {
        this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null;
      },
      _clear: function() {
        var s = this._redrawBounds;
        if (s) {
          var a = s.getSize();
          this._ctx.clearRect(s.min.x, s.min.y, a.x, a.y);
        } else
          this._ctx.save(), this._ctx.setTransform(1, 0, 0, 1, 0, 0), this._ctx.clearRect(0, 0, this._container.width, this._container.height), this._ctx.restore();
      },
      _draw: function() {
        var s, a = this._redrawBounds;
        if (this._ctx.save(), a) {
          var h = a.getSize();
          this._ctx.beginPath(), this._ctx.rect(a.min.x, a.min.y, h.x, h.y), this._ctx.clip();
        }
        this._drawing = !0;
        for (var f = this._drawFirst; f; f = f.next)
          s = f.layer, (!a || s._pxBounds && s._pxBounds.intersects(a)) && s._updatePath();
        this._drawing = !1, this._ctx.restore();
      },
      _updatePoly: function(s, a) {
        if (this._drawing) {
          var h, f, m, y, M = s._parts, z = M.length, O = this._ctx;
          if (z) {
            for (O.beginPath(), h = 0; h < z; h++) {
              for (f = 0, m = M[h].length; f < m; f++)
                y = M[h][f], O[f ? "lineTo" : "moveTo"](y.x, y.y);
              a && O.closePath();
            }
            this._fillStroke(O, s);
          }
        }
      },
      _updateCircle: function(s) {
        if (!(!this._drawing || s._empty())) {
          var a = s._point, h = this._ctx, f = Math.max(Math.round(s._radius), 1), m = (Math.max(Math.round(s._radiusY), 1) || f) / f;
          m !== 1 && (h.save(), h.scale(1, m)), h.beginPath(), h.arc(a.x, a.y / m, f, 0, Math.PI * 2, !1), m !== 1 && h.restore(), this._fillStroke(h, s);
        }
      },
      _fillStroke: function(s, a) {
        var h = a.options;
        h.fill && (s.globalAlpha = h.fillOpacity, s.fillStyle = h.fillColor || h.color, s.fill(h.fillRule || "evenodd")), h.stroke && h.weight !== 0 && (s.setLineDash && s.setLineDash(a.options && a.options._dashArray || []), s.globalAlpha = h.opacity, s.lineWidth = h.weight, s.strokeStyle = h.color, s.lineCap = h.lineCap, s.lineJoin = h.lineJoin, s.stroke());
      },
      // Canvas obviously doesn't have mouse events for individual drawn objects,
      // so we emulate that by calculating what's under the mouse on mousemove/click manually
      _onClick: function(s) {
        for (var a = this._map.mouseEventToLayerPoint(s), h, f, m = this._drawFirst; m; m = m.next)
          h = m.layer, h.options.interactive && h._containsPoint(a) && (!(s.type === "click" || s.type === "preclick") || !this._map._draggableMoved(h)) && (f = h);
        this._fireEvent(f ? [f] : !1, s);
      },
      _onMouseMove: function(s) {
        if (!(!this._map || this._map.dragging.moving() || this._map._animatingZoom)) {
          var a = this._map.mouseEventToLayerPoint(s);
          this._handleMouseHover(s, a);
        }
      },
      _handleMouseOut: function(s) {
        var a = this._hoveredLayer;
        a && (jt(this._container, "leaflet-interactive"), this._fireEvent([a], s, "mouseout"), this._hoveredLayer = null, this._mouseHoverThrottled = !1);
      },
      _handleMouseHover: function(s, a) {
        if (!this._mouseHoverThrottled) {
          for (var h, f, m = this._drawFirst; m; m = m.next)
            h = m.layer, h.options.interactive && h._containsPoint(a) && (f = h);
          f !== this._hoveredLayer && (this._handleMouseOut(s), f && (it(this._container, "leaflet-interactive"), this._fireEvent([f], s, "mouseover"), this._hoveredLayer = f)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, s), this._mouseHoverThrottled = !0, setTimeout(l(function() {
            this._mouseHoverThrottled = !1;
          }, this), 32);
        }
      },
      _fireEvent: function(s, a, h) {
        this._map._fireDOMEvent(a, h || a.type, s);
      },
      _bringToFront: function(s) {
        var a = s._order;
        if (a) {
          var h = a.next, f = a.prev;
          if (h)
            h.prev = f;
          else
            return;
          f ? f.next = h : h && (this._drawFirst = h), a.prev = this._drawLast, this._drawLast.next = a, a.next = null, this._drawLast = a, this._requestRedraw(s);
        }
      },
      _bringToBack: function(s) {
        var a = s._order;
        if (a) {
          var h = a.next, f = a.prev;
          if (f)
            f.next = h;
          else
            return;
          h ? h.prev = f : f && (this._drawLast = f), a.prev = null, a.next = this._drawFirst, this._drawFirst.prev = a, this._drawFirst = a, this._requestRedraw(s);
        }
      }
    });
    function nf(s) {
      return K.canvas ? new ef(s) : null;
    }
    var qs = function() {
      try {
        return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(s) {
          return document.createElement("<lvml:" + s + ' class="lvml">');
        };
      } catch {
      }
      return function(s) {
        return document.createElement("<" + s + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
      };
    }(), C0 = {
      _initContainer: function() {
        this._container = _t("div", "leaflet-vml-container");
      },
      _update: function() {
        this._map._animatingZoom || (_n.prototype._update.call(this), this.fire("update"));
      },
      _initPath: function(s) {
        var a = s._container = qs("shape");
        it(a, "leaflet-vml-shape " + (this.options.className || "")), a.coordsize = "1 1", s._path = qs("path"), a.appendChild(s._path), this._updateStyle(s), this._layers[c(s)] = s;
      },
      _addPath: function(s) {
        var a = s._container;
        this._container.appendChild(a), s.options.interactive && s.addInteractiveTarget(a);
      },
      _removePath: function(s) {
        var a = s._container;
        zt(a), s.removeInteractiveTarget(a), delete this._layers[c(s)];
      },
      _updateStyle: function(s) {
        var a = s._stroke, h = s._fill, f = s.options, m = s._container;
        m.stroked = !!f.stroke, m.filled = !!f.fill, f.stroke ? (a || (a = s._stroke = qs("stroke")), m.appendChild(a), a.weight = f.weight + "px", a.color = f.color, a.opacity = f.opacity, f.dashArray ? a.dashStyle = P(f.dashArray) ? f.dashArray.join(" ") : f.dashArray.replace(/( *, *)/g, " ") : a.dashStyle = "", a.endcap = f.lineCap.replace("butt", "flat"), a.joinstyle = f.lineJoin) : a && (m.removeChild(a), s._stroke = null), f.fill ? (h || (h = s._fill = qs("fill")), m.appendChild(h), h.color = f.fillColor || f.color, h.opacity = f.fillOpacity) : h && (m.removeChild(h), s._fill = null);
      },
      _updateCircle: function(s) {
        var a = s._point.round(), h = Math.round(s._radius), f = Math.round(s._radiusY || h);
        this._setPath(s, s._empty() ? "M0 0" : "AL " + a.x + "," + a.y + " " + h + "," + f + " 0," + 65535 * 360);
      },
      _setPath: function(s, a) {
        s._path.v = a;
      },
      _bringToFront: function(s) {
        Ui(s._container);
      },
      _bringToBack: function(s) {
        $i(s._container);
      }
    }, To = K.vml ? qs : hn, Qs = _n.extend({
      _initContainer: function() {
        this._container = To("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = To("g"), this._container.appendChild(this._rootGroup);
      },
      _destroyContainer: function() {
        zt(this._container), Pt(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          _n.prototype._update.call(this);
          var s = this._bounds, a = s.getSize(), h = this._container;
          (!this._svgSize || !this._svgSize.equals(a)) && (this._svgSize = a, h.setAttribute("width", a.x), h.setAttribute("height", a.y)), Ht(h, s.min), h.setAttribute("viewBox", [s.min.x, s.min.y, a.x, a.y].join(" ")), this.fire("update");
        }
      },
      // methods below are called by vector layers implementations
      _initPath: function(s) {
        var a = s._path = To("path");
        s.options.className && it(a, s.options.className), s.options.interactive && it(a, "leaflet-interactive"), this._updateStyle(s), this._layers[c(s)] = s;
      },
      _addPath: function(s) {
        this._rootGroup || this._initContainer(), this._rootGroup.appendChild(s._path), s.addInteractiveTarget(s._path);
      },
      _removePath: function(s) {
        zt(s._path), s.removeInteractiveTarget(s._path), delete this._layers[c(s)];
      },
      _updatePath: function(s) {
        s._project(), s._update();
      },
      _updateStyle: function(s) {
        var a = s._path, h = s.options;
        a && (h.stroke ? (a.setAttribute("stroke", h.color), a.setAttribute("stroke-opacity", h.opacity), a.setAttribute("stroke-width", h.weight), a.setAttribute("stroke-linecap", h.lineCap), a.setAttribute("stroke-linejoin", h.lineJoin), h.dashArray ? a.setAttribute("stroke-dasharray", h.dashArray) : a.removeAttribute("stroke-dasharray"), h.dashOffset ? a.setAttribute("stroke-dashoffset", h.dashOffset) : a.removeAttribute("stroke-dashoffset")) : a.setAttribute("stroke", "none"), h.fill ? (a.setAttribute("fill", h.fillColor || h.color), a.setAttribute("fill-opacity", h.fillOpacity), a.setAttribute("fill-rule", h.fillRule || "evenodd")) : a.setAttribute("fill", "none"));
      },
      _updatePoly: function(s, a) {
        this._setPath(s, hi(s._parts, a));
      },
      _updateCircle: function(s) {
        var a = s._point, h = Math.max(Math.round(s._radius), 1), f = Math.max(Math.round(s._radiusY), 1) || h, m = "a" + h + "," + f + " 0 1,0 ", y = s._empty() ? "M0 0" : "M" + (a.x - h) + "," + a.y + m + h * 2 + ",0 " + m + -h * 2 + ",0 ";
        this._setPath(s, y);
      },
      _setPath: function(s, a) {
        s._path.setAttribute("d", a);
      },
      // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
      _bringToFront: function(s) {
        Ui(s._path);
      },
      _bringToBack: function(s) {
        $i(s._path);
      }
    });
    K.vml && Qs.include(C0);
    function sf(s) {
      return K.svg || K.vml ? new Qs(s) : null;
    }
    pt.include({
      // @namespace Map; @method getRenderer(layer: Path): Renderer
      // Returns the instance of `Renderer` that should be used to render the given
      // `Path`. It will ensure that the `renderer` options of the map and paths
      // are respected, and that the renderers do exist on the map.
      getRenderer: function(s) {
        var a = s.options.renderer || this._getPaneRenderer(s.options.pane) || this.options.renderer || this._renderer;
        return a || (a = this._renderer = this._createRenderer()), this.hasLayer(a) || this.addLayer(a), a;
      },
      _getPaneRenderer: function(s) {
        if (s === "overlayPane" || s === void 0)
          return !1;
        var a = this._paneRenderers[s];
        return a === void 0 && (a = this._createRenderer({ pane: s }), this._paneRenderers[s] = a), a;
      },
      _createRenderer: function(s) {
        return this.options.preferCanvas && nf(s) || sf(s);
      }
    });
    var rf = Gi.extend({
      initialize: function(s, a) {
        Gi.prototype.initialize.call(this, this._boundsToLatLngs(s), a);
      },
      // @method setBounds(latLngBounds: LatLngBounds): this
      // Redraws the rectangle with the passed bounds.
      setBounds: function(s) {
        return this.setLatLngs(this._boundsToLatLngs(s));
      },
      _boundsToLatLngs: function(s) {
        return s = ot(s), [
          s.getSouthWest(),
          s.getNorthWest(),
          s.getNorthEast(),
          s.getSouthEast()
        ];
      }
    });
    function L0(s, a) {
      return new rf(s, a);
    }
    Qs.create = To, Qs.pointsToPath = hi, gn.geometryToLayer = ko, gn.coordsToLatLng = tu, gn.coordsToLatLngs = bo, gn.latLngToCoords = eu, gn.latLngsToCoords = So, gn.getFeature = Xi, gn.asFeature = Po, pt.mergeOptions({
      // @option boxZoom: Boolean = true
      // Whether the map can be zoomed to a rectangular area specified by
      // dragging the mouse while pressing the shift key.
      boxZoom: !0
    });
    var of = Je.extend({
      initialize: function(s) {
        this._map = s, this._container = s._container, this._pane = s._panes.overlayPane, this._resetStateTimeout = 0, s.on("unload", this._destroy, this);
      },
      addHooks: function() {
        et(this._container, "mousedown", this._onMouseDown, this);
      },
      removeHooks: function() {
        Pt(this._container, "mousedown", this._onMouseDown, this);
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
        this._clearDeferredResetState(), this._resetState(), Vs(), Rl(), this._startPoint = this._map.mouseEventToContainerPoint(s), et(document, {
          contextmenu: gi,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseMove: function(s) {
        this._moved || (this._moved = !0, this._box = _t("div", "leaflet-zoom-box", this._container), it(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(s);
        var a = new X(this._point, this._startPoint), h = a.getSize();
        Ht(this._box, a.min), this._box.style.width = h.x + "px", this._box.style.height = h.y + "px";
      },
      _finish: function() {
        this._moved && (zt(this._box), jt(this._container, "leaflet-crosshair")), Zs(), jl(), Pt(document, {
          contextmenu: gi,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseUp: function(s) {
        if (!(s.which !== 1 && s.button !== 1) && (this._finish(), !!this._moved)) {
          this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(l(this._resetState, this), 0);
          var a = new bt(
            this._map.containerPointToLatLng(this._startPoint),
            this._map.containerPointToLatLng(this._point)
          );
          this._map.fitBounds(a).fire("boxzoomend", { boxZoomBounds: a });
        }
      },
      _onKeyDown: function(s) {
        s.keyCode === 27 && (this._finish(), this._clearDeferredResetState(), this._resetState());
      }
    });
    pt.addInitHook("addHandler", "boxZoom", of), pt.mergeOptions({
      // @option doubleClickZoom: Boolean|String = true
      // Whether the map can be zoomed in by double clicking on it and
      // zoomed out by double clicking while holding shift. If passed
      // `'center'`, double-click zoom will zoom to the center of the
      //  view regardless of where the mouse was.
      doubleClickZoom: !0
    });
    var af = Je.extend({
      addHooks: function() {
        this._map.on("dblclick", this._onDoubleClick, this);
      },
      removeHooks: function() {
        this._map.off("dblclick", this._onDoubleClick, this);
      },
      _onDoubleClick: function(s) {
        var a = this._map, h = a.getZoom(), f = a.options.zoomDelta, m = s.originalEvent.shiftKey ? h - f : h + f;
        a.options.doubleClickZoom === "center" ? a.setZoom(m) : a.setZoomAround(s.containerPoint, m);
      }
    });
    pt.addInitHook("addHandler", "doubleClickZoom", af), pt.mergeOptions({
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
    var lf = Je.extend({
      addHooks: function() {
        if (!this._draggable) {
          var s = this._map;
          this._draggable = new An(s._mapPane, s._container), this._draggable.on({
            dragstart: this._onDragStart,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this), this._draggable.on("predrag", this._onPreDragLimit, this), s.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), s.on("zoomend", this._onZoomEnd, this), s.whenReady(this._onZoomEnd, this));
        }
        it(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
      },
      removeHooks: function() {
        jt(this._map._container, "leaflet-grab"), jt(this._map._container, "leaflet-touch-drag"), this._draggable.disable();
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
          var a = ot(this._map.options.maxBounds);
          this._offsetLimit = tt(
            this._map.latLngToContainerPoint(a.getNorthWest()).multiplyBy(-1),
            this._map.latLngToContainerPoint(a.getSouthEast()).multiplyBy(-1).add(this._map.getSize())
          ), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity));
        } else
          this._offsetLimit = null;
        s.fire("movestart").fire("dragstart"), s.options.inertia && (this._positions = [], this._times = []);
      },
      _onDrag: function(s) {
        if (this._map.options.inertia) {
          var a = this._lastTime = +/* @__PURE__ */ new Date(), h = this._lastPos = this._draggable._absPos || this._draggable._newPos;
          this._positions.push(h), this._times.push(a), this._prunePositions(a);
        }
        this._map.fire("move", s).fire("drag", s);
      },
      _prunePositions: function(s) {
        for (; this._positions.length > 1 && s - this._times[0] > 50; )
          this._positions.shift(), this._times.shift();
      },
      _onZoomEnd: function() {
        var s = this._map.getSize().divideBy(2), a = this._map.latLngToLayerPoint([0, 0]);
        this._initialWorldOffset = a.subtract(s).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x;
      },
      _viscousLimit: function(s, a) {
        return s - (s - a) * this._viscosity;
      },
      _onPreDragLimit: function() {
        if (!(!this._viscosity || !this._offsetLimit)) {
          var s = this._draggable._newPos.subtract(this._draggable._startPos), a = this._offsetLimit;
          s.x < a.min.x && (s.x = this._viscousLimit(s.x, a.min.x)), s.y < a.min.y && (s.y = this._viscousLimit(s.y, a.min.y)), s.x > a.max.x && (s.x = this._viscousLimit(s.x, a.max.x)), s.y > a.max.y && (s.y = this._viscousLimit(s.y, a.max.y)), this._draggable._newPos = this._draggable._startPos.add(s);
        }
      },
      _onPreDragWrap: function() {
        var s = this._worldWidth, a = Math.round(s / 2), h = this._initialWorldOffset, f = this._draggable._newPos.x, m = (f - a + h) % s + a - h, y = (f + a + h) % s - a - h, M = Math.abs(m + h) < Math.abs(y + h) ? m : y;
        this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = M;
      },
      _onDragEnd: function(s) {
        var a = this._map, h = a.options, f = !h.inertia || s.noInertia || this._times.length < 2;
        if (a.fire("dragend", s), f)
          a.fire("moveend");
        else {
          this._prunePositions(+/* @__PURE__ */ new Date());
          var m = this._lastPos.subtract(this._positions[0]), y = (this._lastTime - this._times[0]) / 1e3, M = h.easeLinearity, z = m.multiplyBy(M / y), O = z.distanceTo([0, 0]), R = Math.min(h.inertiaMaxSpeed, O), W = z.multiplyBy(R / O), Q = R / (h.inertiaDeceleration * M), at = W.multiplyBy(-Q / 2).round();
          !at.x && !at.y ? a.fire("moveend") : (at = a._limitOffset(at, a.options.maxBounds), V(function() {
            a.panBy(at, {
              duration: Q,
              easeLinearity: M,
              noMoveStart: !0,
              animate: !0
            });
          }));
        }
      }
    });
    pt.addInitHook("addHandler", "dragging", lf), pt.mergeOptions({
      // @option keyboard: Boolean = true
      // Makes the map focusable and allows users to navigate the map with keyboard
      // arrows and `+`/`-` keys.
      keyboard: !0,
      // @option keyboardPanDelta: Number = 80
      // Amount of pixels to pan when pressing an arrow key.
      keyboardPanDelta: 80
    });
    var uf = Je.extend({
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
        s.tabIndex <= 0 && (s.tabIndex = "0"), et(s, {
          focus: this._onFocus,
          blur: this._onBlur,
          mousedown: this._onMouseDown
        }, this), this._map.on({
          focus: this._addHooks,
          blur: this._removeHooks
        }, this);
      },
      removeHooks: function() {
        this._removeHooks(), Pt(this._map._container, {
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
          var s = document.body, a = document.documentElement, h = s.scrollTop || a.scrollTop, f = s.scrollLeft || a.scrollLeft;
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
        var a = this._panKeys = {}, h = this.keyCodes, f, m;
        for (f = 0, m = h.left.length; f < m; f++)
          a[h.left[f]] = [-1 * s, 0];
        for (f = 0, m = h.right.length; f < m; f++)
          a[h.right[f]] = [s, 0];
        for (f = 0, m = h.down.length; f < m; f++)
          a[h.down[f]] = [0, s];
        for (f = 0, m = h.up.length; f < m; f++)
          a[h.up[f]] = [0, -1 * s];
      },
      _setZoomDelta: function(s) {
        var a = this._zoomKeys = {}, h = this.keyCodes, f, m;
        for (f = 0, m = h.zoomIn.length; f < m; f++)
          a[h.zoomIn[f]] = s;
        for (f = 0, m = h.zoomOut.length; f < m; f++)
          a[h.zoomOut[f]] = -s;
      },
      _addHooks: function() {
        et(document, "keydown", this._onKeyDown, this);
      },
      _removeHooks: function() {
        Pt(document, "keydown", this._onKeyDown, this);
      },
      _onKeyDown: function(s) {
        if (!(s.altKey || s.ctrlKey || s.metaKey)) {
          var a = s.keyCode, h = this._map, f;
          if (a in this._panKeys) {
            if (!h._panAnim || !h._panAnim._inProgress)
              if (f = this._panKeys[a], s.shiftKey && (f = B(f).multiplyBy(3)), h.options.maxBounds && (f = h._limitOffset(B(f), h.options.maxBounds)), h.options.worldCopyJump) {
                var m = h.wrapLatLng(h.unproject(h.project(h.getCenter()).add(f)));
                h.panTo(m);
              } else
                h.panBy(f);
          } else if (a in this._zoomKeys)
            h.setZoom(h.getZoom() + (s.shiftKey ? 3 : 1) * this._zoomKeys[a]);
          else if (a === 27 && h._popup && h._popup.options.closeOnEscapeKey)
            h.closePopup();
          else
            return;
          gi(s);
        }
      }
    });
    pt.addInitHook("addHandler", "keyboard", uf), pt.mergeOptions({
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
    var cf = Je.extend({
      addHooks: function() {
        et(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
      },
      removeHooks: function() {
        Pt(this._map._container, "wheel", this._onWheelScroll, this);
      },
      _onWheelScroll: function(s) {
        var a = Nd(s), h = this._map.options.wheelDebounceTime;
        this._delta += a, this._lastMousePos = this._map.mouseEventToContainerPoint(s), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
        var f = Math.max(h - (+/* @__PURE__ */ new Date() - this._startTime), 0);
        clearTimeout(this._timer), this._timer = setTimeout(l(this._performZoom, this), f), gi(s);
      },
      _performZoom: function() {
        var s = this._map, a = s.getZoom(), h = this._map.options.zoomSnap || 0;
        s._stop();
        var f = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), m = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(f)))) / Math.LN2, y = h ? Math.ceil(m / h) * h : m, M = s._limitZoom(a + (this._delta > 0 ? y : -y)) - a;
        this._delta = 0, this._startTime = null, M && (s.options.scrollWheelZoom === "center" ? s.setZoom(a + M) : s.setZoomAround(this._lastMousePos, a + M));
      }
    });
    pt.addInitHook("addHandler", "scrollWheelZoom", cf);
    var T0 = 600;
    pt.mergeOptions({
      // @section Touch interaction options
      // @option tapHold: Boolean
      // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
      tapHold: K.touchNative && K.safari && K.mobile,
      // @option tapTolerance: Number = 15
      // The max number of pixels a user can shift his finger during touch
      // for it to be considered a valid tap.
      tapTolerance: 15
    });
    var hf = Je.extend({
      addHooks: function() {
        et(this._map._container, "touchstart", this._onDown, this);
      },
      removeHooks: function() {
        Pt(this._map._container, "touchstart", this._onDown, this);
      },
      _onDown: function(s) {
        if (clearTimeout(this._holdTimeout), s.touches.length === 1) {
          var a = s.touches[0];
          this._startPos = this._newPos = new I(a.clientX, a.clientY), this._holdTimeout = setTimeout(l(function() {
            this._cancel(), this._isTapValid() && (et(document, "touchend", Qt), et(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", a));
          }, this), T0), et(document, "touchend touchcancel contextmenu", this._cancel, this), et(document, "touchmove", this._onMove, this);
        }
      },
      _cancelClickPrevent: function s() {
        Pt(document, "touchend", Qt), Pt(document, "touchend touchcancel", s);
      },
      _cancel: function() {
        clearTimeout(this._holdTimeout), Pt(document, "touchend touchcancel contextmenu", this._cancel, this), Pt(document, "touchmove", this._onMove, this);
      },
      _onMove: function(s) {
        var a = s.touches[0];
        this._newPos = new I(a.clientX, a.clientY);
      },
      _isTapValid: function() {
        return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
      },
      _simulateEvent: function(s, a) {
        var h = new MouseEvent(s, {
          bubbles: !0,
          cancelable: !0,
          view: window,
          // detail: 1,
          screenX: a.screenX,
          screenY: a.screenY,
          clientX: a.clientX,
          clientY: a.clientY
          // button: 2,
          // buttons: 2
        });
        h._simulated = !0, a.target.dispatchEvent(h);
      }
    });
    pt.addInitHook("addHandler", "tapHold", hf), pt.mergeOptions({
      // @section Touch interaction options
      // @option touchZoom: Boolean|String = *
      // Whether the map can be zoomed by touch-dragging with two fingers. If
      // passed `'center'`, it will zoom to the center of the view regardless of
      // where the touch events (fingers) were. Enabled for touch-capable web
      // browsers.
      touchZoom: K.touch,
      // @option bounceAtZoomLimits: Boolean = true
      // Set it to false if you don't want the map to zoom beyond min/max zoom
      // and then bounce back when pinch-zooming.
      bounceAtZoomLimits: !0
    });
    var df = Je.extend({
      addHooks: function() {
        it(this._map._container, "leaflet-touch-zoom"), et(this._map._container, "touchstart", this._onTouchStart, this);
      },
      removeHooks: function() {
        jt(this._map._container, "leaflet-touch-zoom"), Pt(this._map._container, "touchstart", this._onTouchStart, this);
      },
      _onTouchStart: function(s) {
        var a = this._map;
        if (!(!s.touches || s.touches.length !== 2 || a._animatingZoom || this._zooming)) {
          var h = a.mouseEventToContainerPoint(s.touches[0]), f = a.mouseEventToContainerPoint(s.touches[1]);
          this._centerPoint = a.getSize()._divideBy(2), this._startLatLng = a.containerPointToLatLng(this._centerPoint), a.options.touchZoom !== "center" && (this._pinchStartLatLng = a.containerPointToLatLng(h.add(f)._divideBy(2))), this._startDist = h.distanceTo(f), this._startZoom = a.getZoom(), this._moved = !1, this._zooming = !0, a._stop(), et(document, "touchmove", this._onTouchMove, this), et(document, "touchend touchcancel", this._onTouchEnd, this), Qt(s);
        }
      },
      _onTouchMove: function(s) {
        if (!(!s.touches || s.touches.length !== 2 || !this._zooming)) {
          var a = this._map, h = a.mouseEventToContainerPoint(s.touches[0]), f = a.mouseEventToContainerPoint(s.touches[1]), m = h.distanceTo(f) / this._startDist;
          if (this._zoom = a.getScaleZoom(m, this._startZoom), !a.options.bounceAtZoomLimits && (this._zoom < a.getMinZoom() && m < 1 || this._zoom > a.getMaxZoom() && m > 1) && (this._zoom = a._limitZoom(this._zoom)), a.options.touchZoom === "center") {
            if (this._center = this._startLatLng, m === 1)
              return;
          } else {
            var y = h._add(f)._divideBy(2)._subtract(this._centerPoint);
            if (m === 1 && y.x === 0 && y.y === 0)
              return;
            this._center = a.unproject(a.project(this._pinchStartLatLng, this._zoom).subtract(y), this._zoom);
          }
          this._moved || (a._moveStart(!0, !1), this._moved = !0), U(this._animRequest);
          var M = l(a._move, a, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
          this._animRequest = V(M, this, !0), Qt(s);
        }
      },
      _onTouchEnd: function() {
        if (!this._moved || !this._zooming) {
          this._zooming = !1;
          return;
        }
        this._zooming = !1, U(this._animRequest), Pt(document, "touchmove", this._onTouchMove, this), Pt(document, "touchend touchcancel", this._onTouchEnd, this), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom));
      }
    });
    pt.addInitHook("addHandler", "touchZoom", df), pt.BoxZoom = of, pt.DoubleClickZoom = af, pt.Drag = lf, pt.Keyboard = uf, pt.ScrollWheelZoom = cf, pt.TapHold = hf, pt.TouchZoom = df, n.Bounds = X, n.Browser = K, n.CRS = qt, n.Canvas = ef, n.Circle = Jl, n.CircleMarker = wo, n.Class = rt, n.Control = He, n.DivIcon = Qd, n.DivOverlay = tn, n.DomEvent = Yy, n.DomUtil = Uy, n.Draggable = An, n.Evented = ut, n.FeatureGroup = pn, n.GeoJSON = gn, n.GridLayer = Xs, n.Handler = Je, n.Icon = Ki, n.ImageOverlay = Mo, n.LatLng = nt, n.LatLngBounds = bt, n.Layer = We, n.LayerGroup = Yi, n.LineUtil = o0, n.Map = pt, n.Marker = xo, n.Mixin = t0, n.Path = In, n.Point = I, n.PolyUtil = e0, n.Polygon = Gi, n.Polyline = mn, n.Popup = Co, n.PosAnimation = Ad, n.Projection = a0, n.Rectangle = rf, n.Renderer = _n, n.SVG = Qs, n.SVGOverlay = qd, n.TileLayer = qi, n.Tooltip = Lo, n.Transformation = Rs, n.Util = vt, n.VideoOverlay = Xd, n.bind = l, n.bounds = tt, n.canvas = nf, n.circle = m0, n.circleMarker = p0, n.control = Ys, n.divIcon = S0, n.extend = r, n.featureGroup = h0, n.geoJSON = Gd, n.geoJson = v0, n.gridLayer = P0, n.icon = d0, n.imageOverlay = y0, n.latLng = q, n.latLngBounds = ot, n.layerGroup = c0, n.map = Ky, n.marker = f0, n.point = B, n.polygon = _0, n.polyline = g0, n.popup = k0, n.rectangle = L0, n.setOptions = k, n.stamp = c, n.svg = sf, n.svgOverlay = w0, n.tileLayer = Jd, n.tooltip = b0, n.transformation = yt, n.version = i, n.videoOverlay = x0;
    var E0 = window.L;
    n.noConflict = function() {
      return window.L = E0, this;
    }, window.L = n;
  });
})(qc, qc.exports);
var fM = qc.exports;
const aa = /* @__PURE__ */ Jm(fM), Km = "".trim().replace(/\/$/, ""), Ot = (e) => Km ? `${Km}${e}` : e, ad = "wildlife_admin_token", wi = {
  adminLogin: Ot("/api/admin/login"),
  adminLogout: Ot("/api/admin/logout"),
  summary: Ot("/api/dashboard-summary"),
  chart: Ot("/api/chart-data"),
  map: Ot("/api/map-data"),
  alerts: Ot("/api/alerts?limit=60"),
  reports: Ot("/api/reports?limit=50"),
  osint: Ot("/api/osint-feed?limit=30"),
  syncStatus: Ot("/api/sync-status"),
  filterNews: Ot("/api/filter-news"),
  exportCsv: Ot("/api/export/csv"),
  exportPdf: Ot("/api/export/pdf"),
  exportExcel: Ot("/api/export/excel"),
  exportExcelIncidentsReports: Ot("/api/export/excel-incidents-reports"),
  exportBriefing: Ot("/api/export/briefing-pack"),
  publicDownloadCsv: Ot("/api/public/download-csv"),
  publicDownloadDb: Ot("/api/public/download-db"),
  publicUploadDb: Ot("/api/public/upload-db"),
  predictions: Ot("/api/predictions"),
  predictionsTrain: Ot("/api/predictions/train"),
  predictionsHotspots: Ot("/api/predictions/hotspots"),
  predictionsPersons: Ot("/api/predictions/persons")
};
function ld(e, t = "") {
  const n = String(e || "").trim() || String(t || "").trim();
  return n ? /^https?:\/\//i.test(n) ? n : n.startsWith("//") ? `https:${n}` : n.startsWith("/") ? Ot(n) : n.startsWith("www.") ? `https://${n}` : /^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(n) ? `https://${n}` : "#" : "#";
}
async function Gm(e, t, { includeAuth: n = !0 } = {}) {
  const i = n ? pM() : "", r = { "Content-Type": "application/json" };
  i && (r.Authorization = `Bearer ${i}`);
  const o = await fetch(e, {
    method: "POST",
    credentials: "same-origin",
    headers: r,
    body: JSON.stringify(t || {})
  });
  if (!o.ok) {
    let l = "";
    try {
      const c = await o.json();
      l = String((c == null ? void 0 : c.detail) || "").trim();
    } catch {
      l = "";
    }
    const u = new Error(l || `HTTP ${o.status}`);
    throw u.status = o.status, u;
  }
  return o.json();
}
function pM() {
  return String(localStorage.getItem(ad) || "").trim();
}
function mM(e) {
  const t = String(e || "").trim();
  t && localStorage.setItem(ad, t);
}
function gM() {
  localStorage.removeItem(ad);
}
function _M(e) {
  const t = new URLSearchParams();
  return Object.entries(e).forEach(([n, i]) => {
    String(i || "").trim() !== "" && t.set(n, i);
  }), t.toString();
}
function vM({ mapData: e, onMapError: t }) {
  var l;
  const n = G.useRef(null), i = G.useRef(null), r = G.useRef(null);
  G.useEffect(() => {
    var u, c;
    if (!(!n.current || !e))
      try {
        i.current || (i.current = aa.map(n.current, { zoomControl: !0, attributionControl: !0 }).setView(
          [((u = e.center) == null ? void 0 : u.lat) || 22.97, ((c = e.center) == null ? void 0 : c.lng) || 78.65],
          5
        ), aa.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 12,
          attribution: "&copy; OpenStreetMap contributors"
        }).addTo(i.current), r.current = aa.layerGroup().addTo(i.current));
        const d = r.current;
        if (!d) return;
        d.clearLayers(), (e.markers || []).slice(0, 600).forEach((p) => {
          if (typeof p.lat != "number" || typeof p.lng != "number") return;
          const g = dy(p.risk_score), _ = g === "high" ? "#C75050" : g === "medium" ? "#C9933D" : "#5A9E6F", x = aa.circleMarker([p.lat, p.lng], {
            radius: g === "high" ? 8 : g === "medium" ? 7 : 6,
            color: _,
            fillColor: _,
            fillOpacity: 0.8,
            weight: 2
          }), S = (p.title || "Incident").replace(/</g, "&lt;"), k = ld(p.open_url, p.url).replace(/"/g, "&quot;");
          x.bindPopup(
            `<div style="min-width:240px;font-family:Inter,sans-serif">
            <b style="font-size:14px;color:#1A1917">${S}</b>
            <div style="margin-top:6px;color:#6B6966;font-size:12px">${p.state || "-"} · ${p.district || "-"}</div>
            <div style="margin-top:8px;font-size:13px;color:#1A1917">Risk <b style="color:${_}">${Number(p.risk_score || 0)}</b> · ${p.species || "—"}</div>
            <a href="${k}" target="_blank" rel="noopener" style="display:inline-block;margin-top:10px;color:#C17F59;font-weight:500">Open article →</a>
          </div>`
          ), x.addTo(d);
        });
      } catch (d) {
        console.error("Map rendering failed:", d), t == null || t("Map failed to render on this browser. Use legacy view as fallback.");
      }
  }, [e, t]);
  const o = ((l = e == null ? void 0 : e.markers) == null ? void 0 : l.length) || 0;
  return /* @__PURE__ */ v.jsxs("article", { className: "card map-card", id: "section-map", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ v.jsx(ly, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ v.jsx("h2", { children: "National Threat Map" })
      ] }),
      /* @__PURE__ */ v.jsxs("span", { className: "card-count mono", children: [
        o,
        " markers"
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: "card-body-flush", style: { position: "relative", minHeight: 460 }, children: /* @__PURE__ */ v.jsx("div", { className: "map-surface", ref: n }) }),
    /* @__PURE__ */ v.jsxs("div", { className: "map-legend", children: [
      /* @__PURE__ */ v.jsx("span", { className: "legend-dot high", children: "High risk" }),
      /* @__PURE__ */ v.jsx("span", { className: "legend-dot medium", children: "Medium" }),
      /* @__PURE__ */ v.jsx("span", { className: "legend-dot low", children: "Low" }),
      /* @__PURE__ */ v.jsx("span", { style: { marginLeft: "auto", color: "var(--dim)" }, children: "Tap a marker for details" })
    ] })
  ] });
}
const fy = "label";
function Xm(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
function yM(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function py(e, t) {
  e.labels = t;
}
function my(e, t, n = fy) {
  const i = [];
  e.datasets = t.map((r) => {
    const o = e.datasets.find((l) => l[n] === r[n]);
    return !o || !r.data || i.includes(o) ? {
      ...r
    } : (i.push(o), Object.assign(o, r), o);
  });
}
function xM(e, t = fy) {
  const n = {
    labels: [],
    datasets: []
  };
  return py(n, e.labels), my(n, e.datasets, t), n;
}
function wM(e, t) {
  const { height: n = 150, width: i = 300, redraw: r = !1, datasetIdKey: o, type: l, data: u, options: c, plugins: d = [], fallbackContent: p, updateMode: g, ..._ } = e, x = G.useRef(null), S = G.useRef(null), k = () => {
    x.current && (S.current = new Ml(x.current, {
      type: l,
      data: xM(u, o),
      options: c && {
        ...c
      },
      plugins: d
    }), Xm(t, S.current));
  }, C = () => {
    Xm(t, null), S.current && (S.current.destroy(), S.current = null);
  };
  return G.useEffect(() => {
    !r && S.current && c && yM(S.current, c);
  }, [
    r,
    c
  ]), G.useEffect(() => {
    !r && S.current && py(S.current.config.data, u.labels);
  }, [
    r,
    u.labels
  ]), G.useEffect(() => {
    !r && S.current && u.datasets && my(S.current.config.data, u.datasets, o);
  }, [
    r,
    u.datasets
  ]), G.useEffect(() => {
    S.current && (r ? (C(), setTimeout(k)) : S.current.update(g));
  }, [
    r,
    c,
    u.labels,
    u.datasets,
    g
  ]), G.useEffect(() => {
    S.current && (C(), setTimeout(k));
  }, [
    l
  ]), G.useEffect(() => (k(), () => C()), []), /* @__PURE__ */ v.jsx("canvas", {
    ref: x,
    role: "img",
    height: n,
    width: i,
    ..._,
    children: p
  });
}
const kM = /* @__PURE__ */ G.forwardRef(wM);
function ud(e, t) {
  return Ml.register(t), /* @__PURE__ */ G.forwardRef((n, i) => /* @__PURE__ */ v.jsx(kM, {
    ...n,
    ref: i,
    type: e
  }));
}
const bM = /* @__PURE__ */ ud("line", ka), qm = /* @__PURE__ */ ud("bar", wa), SM = /* @__PURE__ */ ud("doughnut", _r), Qc = "#6B6966", Qm = "rgba(26, 25, 23, 0.06)", gy = "#6B6966", ns = {
  responsive: !0,
  maintainAspectRatio: !1,
  interaction: { mode: "index", intersect: !1 },
  plugins: {
    legend: {
      labels: {
        color: gy,
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
      ticks: { color: Qc, font: { family: "Inter, sans-serif", size: 10 } },
      grid: { color: Qm, drawBorder: !1 },
      border: { display: !1 }
    },
    y: {
      ticks: { color: Qc, font: { family: "JetBrains Mono, monospace", size: 10 } },
      grid: { color: Qm, drawBorder: !1 },
      border: { display: !1 }
    }
  }
}, PM = {
  responsive: !0,
  maintainAspectRatio: !1,
  cutout: "62%",
  plugins: {
    legend: {
      position: "right",
      labels: {
        color: gy,
        font: { family: "Inter, sans-serif", size: 11 },
        usePointStyle: !0,
        boxWidth: 8,
        padding: 10
      }
    },
    tooltip: ns.plugins.tooltip
  }
};
function MM({ chartData: e }) {
  const t = (e == null ? void 0 : e.timeline) || { labels: [], incidents: [], high_risk: [], granularity: "monthly" }, n = (e == null ? void 0 : e.top_states) || [], i = (e == null ? void 0 : e.species_dist) || (e == null ? void 0 : e.species_distribution) || [], r = (e == null ? void 0 : e.source_rank) || (e == null ? void 0 : e.source_rankings) || [], o = {
    labels: t.labels,
    datasets: [
      {
        label: "Incidents",
        data: t.incidents,
        borderColor: "#C17F59",
        backgroundColor: (g) => {
          const { ctx: _, chartArea: x } = g.chart;
          if (!x) return "rgba(193, 127, 89, 0.12)";
          const S = _.createLinearGradient(0, x.top, 0, x.bottom);
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
          const { ctx: _, chartArea: x } = g.chart;
          if (!x) return "rgba(199, 80, 80, 0.1)";
          const S = _.createLinearGradient(0, x.top, 0, x.bottom);
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
  }, l = {
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
  }, u = [
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
  ], c = {
    labels: i.slice(0, 10).map((g) => g.species),
    datasets: [
      {
        data: i.slice(0, 10).map((g) => g.count),
        backgroundColor: u,
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
    ...ns,
    indexAxis: "y",
    scales: {
      ...ns.scales,
      y: {
        ...ns.scales.y,
        ticks: { color: Qc, font: { family: "Inter, sans-serif", size: 10 } }
      }
    }
  };
  return /* @__PURE__ */ v.jsxs("div", { className: "charts-grid", id: "section-analytics", children: [
    /* @__PURE__ */ v.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ v.jsx(ry, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ v.jsx("h2", { children: "Incident Timeline" })
        ] }),
        /* @__PURE__ */ v.jsx("span", { className: "badge", children: t.granularity || "daily" })
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: "card-body", children: /* @__PURE__ */ v.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ v.jsx(bM, { data: o, options: ns }) }) })
    ] }),
    /* @__PURE__ */ v.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ v.jsx(oy, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ v.jsx("h2", { children: "Top States" })
        ] }),
        /* @__PURE__ */ v.jsx("span", { className: "card-count mono", children: n.length })
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: "card-body", children: /* @__PURE__ */ v.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ v.jsx(qm, { data: l, options: ns }) }) })
    ] }),
    /* @__PURE__ */ v.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ v.jsx(rP, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ v.jsx("h2", { children: "Species Distribution" })
        ] }),
        /* @__PURE__ */ v.jsx("span", { className: "card-count mono", children: i.length })
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: "card-body", children: /* @__PURE__ */ v.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ v.jsx(SM, { data: c, options: PM }) }) })
    ] }),
    /* @__PURE__ */ v.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ v.jsx(cy, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ v.jsx("h2", { children: "Source Reliability" })
        ] }),
        /* @__PURE__ */ v.jsx("span", { className: "card-count mono", children: r.length })
      ] }),
      /* @__PURE__ */ v.jsx("div", { className: "card-body", children: /* @__PURE__ */ v.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ v.jsx(qm, { data: d, options: p }) }) })
    ] })
  ] });
}
const CM = {
  q: "",
  species: "",
  state: "",
  date_from: "",
  date_to: "",
  crime_type: "",
  severity: "",
  source: ""
};
function LM({ filters: e, filterOptions: t, onChange: n, onApply: i, onBriefing: r }) {
  const o = Object.values(e).filter((c) => String(c || "").trim() !== "").length;
  function l(c, d) {
    n({ ...e, [c]: d });
  }
  function u() {
    n(CM);
  }
  return /* @__PURE__ */ v.jsxs("article", { className: "card filters-card", id: "section-incidents", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ v.jsx(Ym, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ v.jsx("h2", { children: "Analyst Filters" }),
        o > 0 ? /* @__PURE__ */ v.jsxs("span", { className: "badge", children: [
          o,
          " active"
        ] }) : null
      ] }),
      /* @__PURE__ */ v.jsxs("button", { type: "button", className: "btn btn-ghost", onClick: u, children: [
        /* @__PURE__ */ v.jsx(VP, { size: 14 }),
        /* @__PURE__ */ v.jsx("span", { className: "btn-label", children: "Reset" })
      ] })
    ] }),
    /* @__PURE__ */ v.jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "filter-grid", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "filter-field", style: { gridColumn: "span 2" }, children: [
          /* @__PURE__ */ v.jsx("label", { className: "filter-label", htmlFor: "f-search", children: "Search" }),
          /* @__PURE__ */ v.jsxs("div", { className: "input-with-icon", children: [
            /* @__PURE__ */ v.jsx(KP, { size: 14, className: "icon" }),
            /* @__PURE__ */ v.jsx(
              "input",
              {
                id: "f-search",
                className: "input",
                placeholder: "Search title, summary, or keywords",
                value: e.q,
                onChange: (c) => l("q", c.target.value),
                onKeyDown: (c) => {
                  c.key === "Enter" && i();
                }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ v.jsx("label", { className: "filter-label", htmlFor: "f-species", children: "Species" }),
          /* @__PURE__ */ v.jsxs(
            "select",
            {
              id: "f-species",
              className: "select",
              value: e.species,
              onChange: (c) => l("species", c.target.value),
              children: [
                /* @__PURE__ */ v.jsx("option", { value: "", children: "All species" }),
                (t.species || []).map((c) => /* @__PURE__ */ v.jsx("option", { value: c, children: c }, c))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ v.jsx("label", { className: "filter-label", htmlFor: "f-state", children: "State" }),
          /* @__PURE__ */ v.jsxs(
            "select",
            {
              id: "f-state",
              className: "select",
              value: e.state,
              onChange: (c) => l("state", c.target.value),
              children: [
                /* @__PURE__ */ v.jsx("option", { value: "", children: "All states" }),
                (t.states || []).map((c) => /* @__PURE__ */ v.jsx("option", { value: c, children: c }, c))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ v.jsx("label", { className: "filter-label", htmlFor: "f-crime", children: "Crime type" }),
          /* @__PURE__ */ v.jsxs(
            "select",
            {
              id: "f-crime",
              className: "select",
              value: e.crime_type,
              onChange: (c) => l("crime_type", c.target.value),
              children: [
                /* @__PURE__ */ v.jsx("option", { value: "", children: "All types" }),
                (t.crime_types || []).map((c) => /* @__PURE__ */ v.jsx("option", { value: c, children: c }, c))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ v.jsx("label", { className: "filter-label", htmlFor: "f-source", children: "Source" }),
          /* @__PURE__ */ v.jsxs(
            "select",
            {
              id: "f-source",
              className: "select",
              value: e.source,
              onChange: (c) => l("source", c.target.value),
              children: [
                /* @__PURE__ */ v.jsx("option", { value: "", children: "All sources" }),
                (t.sources || []).map((c) => /* @__PURE__ */ v.jsx("option", { value: c, children: c }, c))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ v.jsx("label", { className: "filter-label", htmlFor: "f-severity", children: "Severity" }),
          /* @__PURE__ */ v.jsxs(
            "select",
            {
              id: "f-severity",
              className: "select",
              value: e.severity,
              onChange: (c) => l("severity", c.target.value),
              children: [
                /* @__PURE__ */ v.jsx("option", { value: "", children: "All severity" }),
                /* @__PURE__ */ v.jsx("option", { value: "high", children: "High" }),
                /* @__PURE__ */ v.jsx("option", { value: "medium", children: "Medium" }),
                /* @__PURE__ */ v.jsx("option", { value: "low", children: "Low" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ v.jsx("label", { className: "filter-label", htmlFor: "f-from", children: "Date from" }),
          /* @__PURE__ */ v.jsx(
            "input",
            {
              id: "f-from",
              type: "date",
              className: "input",
              value: e.date_from,
              onChange: (c) => l("date_from", c.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ v.jsx("label", { className: "filter-label", htmlFor: "f-to", children: "Date to" }),
          /* @__PURE__ */ v.jsx(
            "input",
            {
              id: "f-to",
              type: "date",
              className: "input",
              value: e.date_to,
              onChange: (c) => l("date_to", c.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ v.jsxs("div", { className: "filter-actions", children: [
        /* @__PURE__ */ v.jsx("div", { className: "filter-actions-left", children: o > 0 ? `${o} filter${o === 1 ? "" : "s"} applied` : "No filters applied" }),
        /* @__PURE__ */ v.jsxs("div", { className: "filter-actions-right", children: [
          /* @__PURE__ */ v.jsxs("button", { type: "button", className: "btn", onClick: r, children: [
            /* @__PURE__ */ v.jsx(nP, { size: 14 }),
            /* @__PURE__ */ v.jsx("span", { children: "Briefing Pack" })
          ] }),
          /* @__PURE__ */ v.jsxs("button", { type: "button", className: "btn btn-primary", onClick: i, children: [
            /* @__PURE__ */ v.jsx(Ym, { size: 14 }),
            /* @__PURE__ */ v.jsx("span", { children: "Apply Filters" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function TM({ rows: e, loading: t }) {
  return /* @__PURE__ */ v.jsxs("article", { className: "card table-card", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ v.jsx(hy, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ v.jsx("h2", { children: "Incident Intelligence" })
      ] }),
      /* @__PURE__ */ v.jsxs("span", { className: "card-count mono", children: [
        e.length,
        " rows"
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: "card-body-flush", style: { maxHeight: "600px", overflowY: "auto" }, children: /* @__PURE__ */ v.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ v.jsxs("table", { className: "data-table", children: [
      /* @__PURE__ */ v.jsx("thead", { children: /* @__PURE__ */ v.jsxs("tr", { children: [
        /* @__PURE__ */ v.jsx("th", { children: "Date" }),
        /* @__PURE__ */ v.jsx("th", { children: "Risk" }),
        /* @__PURE__ */ v.jsx("th", { children: "Title" }),
        /* @__PURE__ */ v.jsx("th", { children: "Species" }),
        /* @__PURE__ */ v.jsx("th", { children: "State" }),
        /* @__PURE__ */ v.jsx("th", { children: "District" }),
        /* @__PURE__ */ v.jsx("th", { children: "Involved persons" }),
        /* @__PURE__ */ v.jsx("th", { children: "Crime type" }),
        /* @__PURE__ */ v.jsx("th", { children: "Source" }),
        /* @__PURE__ */ v.jsx("th", { children: "Conf." }),
        /* @__PURE__ */ v.jsx("th", { children: "Link" })
      ] }) }),
      /* @__PURE__ */ v.jsxs("tbody", { children: [
        e.map((n) => {
          const i = dy(n.risk_score);
          return /* @__PURE__ */ v.jsxs("tr", { children: [
            /* @__PURE__ */ v.jsx("td", { className: "cell-mono", children: rM(n.date) }),
            /* @__PURE__ */ v.jsx("td", { children: /* @__PURE__ */ v.jsx("span", { className: `risk-pill ${i}`, children: n.risk_score }) }),
            /* @__PURE__ */ v.jsx("td", { className: "cell-title", children: n.title }),
            /* @__PURE__ */ v.jsx("td", { className: "cell-muted", children: n.species || "—" }),
            /* @__PURE__ */ v.jsx("td", { className: "cell-muted", children: n.state || "—" }),
            /* @__PURE__ */ v.jsx("td", { className: "cell-muted", children: n.district || "—" }),
            /* @__PURE__ */ v.jsx("td", { className: "cell-muted", children: n.involved_persons || "—" }),
            /* @__PURE__ */ v.jsx("td", { className: "cell-muted", children: n.crime_type || "—" }),
            /* @__PURE__ */ v.jsx("td", { className: "cell-muted", children: n.source || "—" }),
            /* @__PURE__ */ v.jsx("td", { className: "cell-mono", children: Number(n.confidence || 0).toFixed(2) }),
            /* @__PURE__ */ v.jsx("td", { children: /* @__PURE__ */ v.jsxs(
              "a",
              {
                href: ld(n.open_url, n.url),
                target: "_blank",
                rel: "noopener noreferrer",
                className: "feed-link",
                "aria-label": "Open source article",
                children: [
                  "Open ",
                  /* @__PURE__ */ v.jsx(ay, { size: 12 })
                ]
              }
            ) })
          ] }, n.id);
        }),
        !e.length && !t ? /* @__PURE__ */ v.jsx("tr", { children: /* @__PURE__ */ v.jsxs("td", { colSpan: 11, className: "empty-cell", children: [
          /* @__PURE__ */ v.jsx("div", { className: "empty-cell-icon", children: /* @__PURE__ */ v.jsx($P, { size: 20 }) }),
          "No incidents match the current filters."
        ] }) }) : null
      ] })
    ] }) }) })
  ] });
}
function EM({ items: e }) {
  return /* @__PURE__ */ v.jsxs("article", { className: "card", id: "section-osint", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ v.jsx(uy, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ v.jsx("h2", { children: "OSINT Signal Feed" })
      ] }),
      /* @__PURE__ */ v.jsxs("span", { className: "card-count mono", children: [
        e.length,
        " signals"
      ] })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: "card-body-flush", children: e.length === 0 ? /* @__PURE__ */ v.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ v.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ v.jsx(bP, { size: 20 }) }),
      /* @__PURE__ */ v.jsx("div", { children: "No OSINT signals yet" })
    ] }) : /* @__PURE__ */ v.jsx("div", { className: "feed", children: e.slice(0, 16).map((t) => {
      const n = Number(t.signal_strength || 0);
      return /* @__PURE__ */ v.jsxs("div", { className: "feed-row", children: [
        /* @__PURE__ */ v.jsxs("div", { className: "feed-row-head", children: [
          /* @__PURE__ */ v.jsx("div", { className: "feed-title", children: t.title }),
          /* @__PURE__ */ v.jsx("span", { className: "badge mono", children: n.toFixed(2) })
        ] }),
        /* @__PURE__ */ v.jsxs("div", { className: "feed-meta", children: [
          /* @__PURE__ */ v.jsx("span", { children: t.source_type || "source" }),
          /* @__PURE__ */ v.jsx("span", { className: "dot" }),
          /* @__PURE__ */ v.jsx("span", { children: "Signal strength" })
        ] }),
        /* @__PURE__ */ v.jsxs(
          "a",
          {
            href: ld(t.open_url, t.url),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "feed-link",
            children: [
              "Open source ",
              /* @__PURE__ */ v.jsx(ay, { size: 12 })
            ]
          }
        )
      ] }, t.id);
    }) }) })
  ] });
}
function zM({ items: e }) {
  return /* @__PURE__ */ v.jsxs("article", { className: "card", id: "section-reco", children: [
    /* @__PURE__ */ v.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ v.jsx(Xc, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ v.jsx("h2", { children: "Top Recommendations" })
      ] }),
      /* @__PURE__ */ v.jsx("span", { className: "card-count mono", children: e.length })
    ] }),
    /* @__PURE__ */ v.jsx("div", { className: "card-body-flush", children: e.length === 0 ? /* @__PURE__ */ v.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ v.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ v.jsx(Xc, { size: 20 }) }),
      /* @__PURE__ */ v.jsx("div", { children: "No recommendations generated yet" })
    ] }) : /* @__PURE__ */ v.jsx("div", { className: "feed", children: e.map(([t, n]) => /* @__PURE__ */ v.jsxs("div", { className: "reco-row", children: [
      /* @__PURE__ */ v.jsx("span", { children: t }),
      /* @__PURE__ */ v.jsx("span", { className: "reco-count", children: n })
    ] }, t)) }) })
  ] });
}
Ml.register(Kc, Gc, Pa, Yn, yr, Ma, B2, z2, P2);
const OM = {
  q: "",
  species: "",
  state: "",
  date_from: "",
  date_to: "",
  crime_type: "",
  severity: "",
  source: ""
}, NM = {
  total_incidents: 2847,
  high_risk_count: 342,
  states_affected: 28,
  species_impacted: 156,
  last_sync_time: (/* @__PURE__ */ new Date()).toISOString(),
  trend_incidents: 12.5,
  trend_high_risk: -8.2,
  trend_states: 3,
  trend_species: 7.1
}, AM = {
  timeline: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    incidents: [120, 145, 132, 178, 156, 189, 201, 234, 198, 267, 245, 282],
    high_risk: [23, 31, 28, 42, 35, 48, 52, 61, 45, 72, 58, 68]
  },
  top_states: [
    { state: "Maharashtra", count: 423 },
    { state: "Karnataka", count: 387 },
    { state: "Tamil Nadu", count: 312 },
    { state: "Kerala", count: 278 },
    { state: "Madhya Pradesh", count: 245 },
    { state: "Assam", count: 198 },
    { state: "West Bengal", count: 176 },
    { state: "Rajasthan", count: 154 }
  ],
  species_dist: [
    { species: "Tiger", count: 89 },
    { species: "Elephant", count: 156 },
    { species: "Leopard", count: 134 },
    { species: "Rhinoceros", count: 45 },
    { species: "Pangolin", count: 234 },
    { species: "Red Sanders", count: 312 },
    { species: "Sea Turtle", count: 67 },
    { species: "Lion", count: 23 },
    { species: "Deer", count: 189 },
    { species: "Bear", count: 78 }
  ],
  source_rank: [
    { source: "TOI", reliability_score: 92 },
    { source: "Hindu", reliability_score: 89 },
    { source: "NDTV", reliability_score: 87 },
    { source: "Indian Express", reliability_score: 85 },
    { source: "Hindustan Times", reliability_score: 83 },
    { source: "Deccan Herald", reliability_score: 81 },
    { source: "Tribune", reliability_score: 78 },
    { source: "Telegraph", reliability_score: 76 }
  ],
  filters: {
    states: ["Maharashtra", "Karnataka", "Tamil Nadu", "Kerala", "Madhya Pradesh", "Assam", "West Bengal", "Rajasthan"],
    species: ["Tiger", "Elephant", "Leopard", "Rhinoceros", "Pangolin", "Red Sanders", "Sea Turtle", "Lion"],
    crime_types: ["Poaching", "Trafficking", "Habitat Destruction", "Illegal Trade", "Smuggling"],
    sources: ["TOI", "Hindu", "NDTV", "Indian Express", "Hindustan Times"]
  }
}, IM = {
  markers: [
    { lat: 19.076, lng: 72.8777, title: "Tiger poaching attempt foiled in Tadoba", state: "Maharashtra", district: "Chandrapur", risk_score: 85, species: "Tiger" },
    { lat: 12.9716, lng: 77.5946, title: "Elephant corridor protection initiative", state: "Karnataka", district: "Bangalore Rural", risk_score: 45, species: "Elephant" },
    { lat: 13.0827, lng: 80.2707, title: "Sea turtle nesting site secured", state: "Tamil Nadu", district: "Chennai", risk_score: 32, species: "Sea Turtle" },
    { lat: 9.9312, lng: 76.2673, title: "Pangolin trafficking ring busted", state: "Kerala", district: "Kochi", risk_score: 92, species: "Pangolin" },
    { lat: 23.2599, lng: 77.4126, title: "Leopard sighting near village", state: "Madhya Pradesh", district: "Bhopal", risk_score: 67, species: "Leopard" },
    { lat: 26.1445, lng: 91.7362, title: "Rhinoceros protection patrol", state: "Assam", district: "Guwahati", risk_score: 78, species: "Rhinoceros" },
    { lat: 22.5726, lng: 88.3639, title: "Illegal wildlife trade investigation", state: "West Bengal", district: "Kolkata", risk_score: 71, species: "Various" },
    { lat: 26.9124, lng: 75.7873, title: "Desert wildlife monitoring", state: "Rajasthan", district: "Jaipur", risk_score: 38, species: "Deer" },
    { lat: 21.1702, lng: 72.8311, title: "Lion habitat assessment", state: "Gujarat", district: "Surat", risk_score: 55, species: "Lion" },
    { lat: 15.2993, lng: 74.124, title: "Red Sanders seizure operation", state: "Goa", district: "Panaji", risk_score: 88, species: "Red Sanders" }
  ]
}, DM = [
  { id: 1, title: "Critical: Tiger poaching network identified in Western Ghats", severity: "high", time: "2 hours ago", state: "Karnataka" },
  { id: 2, title: "Urgent: Elephant herd approaching human settlement", severity: "high", time: "4 hours ago", state: "Kerala" },
  { id: 3, title: "Warning: Unusual pangolin trade activity detected", severity: "medium", time: "6 hours ago", state: "Assam" },
  { id: 4, title: "Alert: Leopard spotted near school premises", severity: "medium", time: "8 hours ago", state: "Maharashtra" },
  { id: 5, title: "Notice: Seasonal migration pattern shift observed", severity: "low", time: "12 hours ago", state: "Rajasthan" },
  { id: 6, title: "Info: New wildlife corridor proposal submitted", severity: "low", time: "1 day ago", state: "Madhya Pradesh" }
], RM = [
  { id: 1, title: "International wildlife trafficking ring exposed", source: "Interpol", date: "Today", url: "#" },
  { id: 2, title: "New conservation technology deployed in reserves", source: "WWF", date: "Yesterday", url: "#" },
  { id: 3, title: "Climate change impact on migration patterns", source: "IUCN", date: "2 days ago", url: "#" },
  { id: 4, title: "Community-led conservation success story", source: "Wildlife Trust", date: "3 days ago", url: "#" }
], jM = [
  { id: 1, title: "Forest department seizes illegal wildlife products worth Rs 50 lakh", state: "Maharashtra", species: "Pangolin", risk_score: 87, date: "2024-01-15", source: "TOI" },
  { id: 2, title: "Tiger census reveals population increase in Corbett", state: "Uttarakhand", species: "Tiger", risk_score: 34, date: "2024-01-14", source: "Hindu" },
  { id: 3, title: "Elephant tramples crops, villagers demand compensation", state: "Karnataka", species: "Elephant", risk_score: 56, date: "2024-01-14", source: "NDTV" },
  { id: 4, title: "Red Sanders smugglers arrested at Chennai airport", state: "Tamil Nadu", species: "Red Sanders", risk_score: 91, date: "2024-01-13", source: "Indian Express" },
  { id: 5, title: "Leopard rescued from well in Pune suburbs", state: "Maharashtra", species: "Leopard", risk_score: 42, date: "2024-01-13", source: "Hindustan Times" },
  { id: 6, title: "Rhino horn trafficking case: Two more arrests", state: "Assam", species: "Rhinoceros", risk_score: 95, date: "2024-01-12", source: "Telegraph" },
  { id: 7, title: "Sea turtle nesting season begins on Kerala coast", state: "Kerala", species: "Sea Turtle", risk_score: 28, date: "2024-01-12", source: "Deccan Herald" },
  { id: 8, title: "Wildlife sanctuary expansion approved by state", state: "Madhya Pradesh", species: "Various", risk_score: 15, date: "2024-01-11", source: "Tribune" }
];
function BM() {
  const [e, t] = G.useState(!1), [n, i] = G.useState(""), [r, o] = G.useState(!1), [l, u] = G.useState(() => "demo"), [c, d] = G.useState(""), [p, g] = G.useState(!1), [_, x] = G.useState({ username: "", password: "" }), [S, k] = G.useState(NM), [C, w] = G.useState(AM), [b, P] = G.useState(IM), [T, E] = G.useState(DM), [N, D] = G.useState(RM), [A, H] = G.useState([]), [j, V] = G.useState(null), [U, vt] = G.useState(jM), [rt, lt] = G.useState(OM), [J, ut] = G.useState("overview"), [I, $] = G.useState(!1), B = G.useCallback((yt = "Please log in to continue.") => {
    gM(), u(""), d(yt), i(""), o(!1), t(!1);
  }, []), X = G.useCallback(async () => {
  }, [l, B]), tt = G.useCallback(async () => {
  }, [l, rt, B]);
  G.useEffect(() => {
  }, [l, X, tt]), G.useEffect(() => {
    const yt = ["overview", "map", "alerts", "analytics", "incidents", "osint", "reco"], mt = [];
    return yt.forEach((ht) => {
      const hn = document.getElementById(`section-${ht}`);
      if (!hn) return;
      const hi = new IntersectionObserver(
        (di) => {
          di.forEach((dn) => {
            dn.isIntersecting && ut(ht);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      hi.observe(hn), mt.push(hi);
    }), () => mt.forEach((ht) => ht.disconnect());
  }, [e]);
  const bt = G.useMemo(() => {
    const yt = /* @__PURE__ */ new Map();
    return A.forEach((mt) => {
      const ht = (mt.recommendation || "").trim();
      ht && yt.set(ht, (yt.get(ht) || 0) + 1);
    }), [...yt.entries()].sort((mt, ht) => ht[1] - mt[1]).slice(0, 8);
  }, [A]), ot = (C == null ? void 0 : C.filters) || { states: [], species: [], crime_types: [], sources: [] }, nt = (S == null ? void 0 : S.last_sync_time) || (j == null ? void 0 : j.finished_at), q = G.useCallback((yt, { last: mt = !1 } = {}) => {
    const ht = yt || {}, hn = typeof ht.stage == "string" && ht.stage !== "-" ? ht.stage : "", hi = typeof ht.provider == "string" && ht.provider !== "-" ? ht.provider : "", di = typeof ht.language == "string" && ht.language !== "-" ? ht.language : "", dn = typeof ht.query == "string" && ht.query !== "-" ? ht.query : "", ho = Number.isFinite(Number(ht.scanned)) ? Number(ht.scanned) : null, js = Number.isFinite(Number(ht.kept)) ? Number(ht.kept) : null, fn = [];
    hn && fn.push(`stage: ${mt ? `last ${hn}` : hn}`);
    const Bs = [hi, di].filter(Boolean).join(" / ");
    return Bs && fn.push(`source: ${Bs}`), dn && fn.push(`query: ${dn}`), ho !== null && js !== null && fn.push(`scanned ${ho}, kept ${js}`), fn.join(" • ");
  }, []), qt = G.useMemo(() => j != null && j.running ? q(j == null ? void 0 : j.progress, { last: !1 }) : "", [j, q]);
  function Fe(yt) {
    if (!l) return;
    const mt = _M({ ...rt, min_confidence: 0, admin_token: l }), ht = yt === "pdf" ? wi.exportPdf : yt === "excel" ? wi.exportExcel : yt === "excel_incidents_reports" ? wi.exportExcelIncidentsReports : yt === "briefing" ? wi.exportBriefing : wi.exportCsv;
    window.location.href = mt ? `${ht}?${mt}` : ht;
  }
  async function co(yt) {
    yt.preventDefault(), g(!0), d("");
    try {
      const mt = await Gm(
        wi.adminLogin,
        { username: _.username.trim(), password: _.password },
        { includeAuth: !1 }
      ), ht = String((mt == null ? void 0 : mt.access_token) || "").trim();
      if (!ht) {
        d("Login failed. Missing access token.");
        return;
      }
      mM(ht), u(ht), x({ username: "", password: "" }), t(!0);
    } catch (mt) {
      Number(mt == null ? void 0 : mt.status) === 401 ? d("Invalid username or password.") : Number(mt == null ? void 0 : mt.status) === 429 ? d("Too many login attempts. Try again in a minute.") : d(String((mt == null ? void 0 : mt.message) || "Unable to login right now."));
    } finally {
      g(!1);
    }
  }
  async function Ds() {
    try {
      await Gm(wi.adminLogout, {}, { includeAuth: !0 });
    } catch {
    }
    B("Signed out.");
  }
  function Rs(yt) {
    ut(yt), $(!1);
  }
  return l ? /* @__PURE__ */ v.jsxs("div", { className: "app", children: [
    /* @__PURE__ */ v.jsx(
      lM,
      {
        activeSection: J,
        onSelect: Rs,
        isOpen: I,
        syncStatus: j,
        lastSync: nt
      }
    ),
    /* @__PURE__ */ v.jsx(
      "div",
      {
        className: `scrim ${I ? "is-visible" : ""}`,
        onClick: () => $(!1),
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ v.jsxs("div", { className: "main", children: [
      /* @__PURE__ */ v.jsx(
        uM,
        {
          activeSection: J,
          busy: r,
          syncStatus: j,
          onRefresh: X,
          onExport: Fe,
          onToggleMenu: () => $((yt) => !yt),
          onLogout: Ds
        }
      ),
      /* @__PURE__ */ v.jsxs("div", { className: "content", children: [
        n ? /* @__PURE__ */ v.jsxs("div", { className: "status error", role: "alert", children: [
          /* @__PURE__ */ v.jsx(Um, { size: 16 }),
          /* @__PURE__ */ v.jsx("span", { children: n })
        ] }) : null,
        j != null && j.running ? /* @__PURE__ */ v.jsxs("div", { className: "status info", role: "status", children: [
          /* @__PURE__ */ v.jsx(ry, { size: 16 }),
          /* @__PURE__ */ v.jsxs("span", { children: [
            j.message || "Search in progress...",
            qt ? ` - ${qt}` : ""
          ] })
        ] }) : null,
        /* @__PURE__ */ v.jsxs("section", { className: "dashboard-section", id: "section-overview", children: [
          /* @__PURE__ */ v.jsx("div", { className: "section-header", children: /* @__PURE__ */ v.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ v.jsx("span", { className: "section-number", children: "01" }),
            /* @__PURE__ */ v.jsxs("div", { children: [
              /* @__PURE__ */ v.jsx("h2", { children: "National Overview" }),
              /* @__PURE__ */ v.jsx("p", { children: "Real-time wildlife threat monitoring across India" })
            ] })
          ] }) }),
          /* @__PURE__ */ v.jsx(dM, { summary: S, loading: e })
        ] }),
        /* @__PURE__ */ v.jsxs("section", { className: "dashboard-section", id: "section-map", children: [
          /* @__PURE__ */ v.jsx("div", { className: "section-header", children: /* @__PURE__ */ v.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ v.jsx("span", { className: "section-number", children: "02" }),
            /* @__PURE__ */ v.jsxs("div", { children: [
              /* @__PURE__ */ v.jsx("h2", { children: "Operations Center" }),
              /* @__PURE__ */ v.jsx("p", { children: "Geographic incident mapping" })
            ] })
          ] }) }),
          /* @__PURE__ */ v.jsx(vM, { mapData: b, onMapError: i })
        ] }),
        /* @__PURE__ */ v.jsxs("section", { className: "dashboard-section", id: "section-analytics", children: [
          /* @__PURE__ */ v.jsx("div", { className: "section-header", children: /* @__PURE__ */ v.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ v.jsx("span", { className: "section-number", children: "03" }),
            /* @__PURE__ */ v.jsxs("div", { children: [
              /* @__PURE__ */ v.jsx("h2", { children: "Intelligence Analytics" }),
              /* @__PURE__ */ v.jsx("p", { children: "Trends, distributions, and source reliability metrics" })
            ] })
          ] }) }),
          /* @__PURE__ */ v.jsx(MM, { chartData: C })
        ] }),
        /* @__PURE__ */ v.jsxs("section", { className: "dashboard-section", id: "section-incidents", children: [
          /* @__PURE__ */ v.jsx("div", { className: "section-header", children: /* @__PURE__ */ v.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ v.jsx("span", { className: "section-number", children: "04" }),
            /* @__PURE__ */ v.jsxs("div", { children: [
              /* @__PURE__ */ v.jsx("h2", { children: "Incident Database" }),
              /* @__PURE__ */ v.jsx("p", { children: "Search and filter wildlife crime reports" })
            ] })
          ] }) }),
          /* @__PURE__ */ v.jsx(
            LM,
            {
              filters: rt,
              filterOptions: ot,
              onChange: lt,
              onApply: () => tt(),
              onBriefing: () => Fe("briefing")
            }
          ),
          /* @__PURE__ */ v.jsx(TM, { rows: U, loading: e })
        ] }),
        /* @__PURE__ */ v.jsxs("section", { className: "dashboard-section", id: "section-osint", children: [
          /* @__PURE__ */ v.jsx("div", { className: "section-header", children: /* @__PURE__ */ v.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ v.jsx("span", { className: "section-number", children: "05" }),
            /* @__PURE__ */ v.jsxs("div", { children: [
              /* @__PURE__ */ v.jsx("h2", { children: "Intelligence Feed" }),
              /* @__PURE__ */ v.jsx("p", { children: "External sources and strategic recommendations" })
            ] })
          ] }) }),
          /* @__PURE__ */ v.jsxs("div", { className: "bottom-grid", children: [
            /* @__PURE__ */ v.jsx(EM, { items: N }),
            /* @__PURE__ */ v.jsx(zM, { items: bt })
          ] })
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ v.jsx("div", { className: "auth-shell", children: /* @__PURE__ */ v.jsxs("article", { className: "card auth-card", children: [
    /* @__PURE__ */ v.jsx("div", { className: "card-head", children: /* @__PURE__ */ v.jsxs("div", { className: "card-head-left", children: [
      /* @__PURE__ */ v.jsx(cy, { size: 16, className: "card-head-icon" }),
      /* @__PURE__ */ v.jsx("h2", { children: "Authorized Access" })
    ] }) }),
    /* @__PURE__ */ v.jsxs("div", { className: "card-body auth-card-body", children: [
      /* @__PURE__ */ v.jsxs("div", { className: "auth-brand", children: [
        /* @__PURE__ */ v.jsx("h1", { children: "Wildlife Crime Intelligence Center" }),
        /* @__PURE__ */ v.jsx("p", { children: "Sign in with authorized credentials to continue." })
      ] }),
      /* @__PURE__ */ v.jsxs("form", { className: "auth-form", onSubmit: co, children: [
        /* @__PURE__ */ v.jsxs("label", { className: "auth-field", children: [
          /* @__PURE__ */ v.jsx("span", { children: "Username" }),
          /* @__PURE__ */ v.jsx(
            "input",
            {
              value: _.username,
              onChange: (yt) => x((mt) => ({ ...mt, username: yt.target.value })),
              autoComplete: "username",
              required: !0
            }
          )
        ] }),
        /* @__PURE__ */ v.jsxs("label", { className: "auth-field", children: [
          /* @__PURE__ */ v.jsx("span", { children: "Password" }),
          /* @__PURE__ */ v.jsx(
            "input",
            {
              type: "password",
              value: _.password,
              onChange: (yt) => x((mt) => ({ ...mt, password: yt.target.value })),
              autoComplete: "current-password",
              required: !0
            }
          )
        ] }),
        c ? /* @__PURE__ */ v.jsxs("div", { className: "status error auth-status", role: "alert", children: [
          /* @__PURE__ */ v.jsx(Um, { size: 16 }),
          /* @__PURE__ */ v.jsx("span", { children: c })
        ] }) : null,
        /* @__PURE__ */ v.jsxs("button", { className: "btn btn-primary auth-submit", type: "submit", disabled: p, children: [
          /* @__PURE__ */ v.jsx(LP, { size: 14 }),
          p ? "Signing in..." : "Sign in"
        ] })
      ] })
    ] })
  ] }) });
}
class FM extends ix.Component {
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
    return this.state.hasError ? /* @__PURE__ */ v.jsxs("div", { style: { padding: "24px", color: "#e8edff", fontFamily: "Inter, sans-serif" }, children: [
      /* @__PURE__ */ v.jsx("h2", { style: { marginTop: 0 }, children: "Dashboard failed to load" }),
      /* @__PURE__ */ v.jsx("p", { style: { opacity: 0.9 }, children: this.state.message || "Unexpected client error." }),
      /* @__PURE__ */ v.jsxs("p", { style: { opacity: 0.8 }, children: [
        "Open ",
        /* @__PURE__ */ v.jsx("a", { href: "/legacy?legacy=1", style: { color: "#9ec2ff" }, children: "legacy dashboard" }),
        " while this is being fixed."
      ] })
    ] }) : this.props.children;
  }
}
const $u = document.getElementById("root");
if ($u) {
  window.addEventListener("error", (e) => {
    console.error("Window error:", e.error || e.message);
  }), window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled promise rejection:", e.reason);
  });
  try {
    window.__WILDLIFE_DASHBOARD_BOOTED__ = !0, dv($u).render(
      /* @__PURE__ */ v.jsx(FM, { children: /* @__PURE__ */ v.jsx(BM, {}) })
    );
  } catch (e) {
    console.error("Fatal dashboard bootstrap error:", e), $u.innerHTML = `
      <div style="padding:24px;color:#e8edff;font-family:Inter,sans-serif">
        <h2 style="margin-top:0">Dashboard failed to initialize</h2>
        <p>${e instanceof Error ? e.message : "Unknown bootstrap error"}</p>
        <p><a href="/legacy?legacy=1" style="color:#9ec2ff">Open legacy dashboard</a></p>
      </div>
    `;
  }
}
