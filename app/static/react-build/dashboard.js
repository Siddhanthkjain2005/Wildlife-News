var V0 = Object.defineProperty;
var Z0 = (e, t, n) => t in e ? V0(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Y = (e, t, n) => Z0(e, typeof t != "symbol" ? t + "" : t, n);
var U0 = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ig(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var sg = { exports: {} }, al = {}, rg = { exports: {} }, ft = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oo = Symbol.for("react.element"), $0 = Symbol.for("react.portal"), Y0 = Symbol.for("react.fragment"), K0 = Symbol.for("react.strict_mode"), X0 = Symbol.for("react.profiler"), G0 = Symbol.for("react.provider"), q0 = Symbol.for("react.context"), Q0 = Symbol.for("react.forward_ref"), J0 = Symbol.for("react.suspense"), tx = Symbol.for("react.memo"), ex = Symbol.for("react.lazy"), vf = Symbol.iterator;
function nx(e) {
  return e === null || typeof e != "object" ? null : (e = vf && e[vf] || e["@@iterator"], typeof e == "function" ? e : null);
}
var og = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, ag = Object.assign, lg = {};
function Ds(e, t, n) {
  this.props = e, this.context = t, this.refs = lg, this.updater = n || og;
}
Ds.prototype.isReactComponent = {};
Ds.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Ds.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ug() {
}
ug.prototype = Ds.prototype;
function th(e, t, n) {
  this.props = e, this.context = t, this.refs = lg, this.updater = n || og;
}
var eh = th.prototype = new ug();
eh.constructor = th;
ag(eh, Ds.prototype);
eh.isPureReactComponent = !0;
var yf = Array.isArray, cg = Object.prototype.hasOwnProperty, nh = { current: null }, hg = { key: !0, ref: !0, __self: !0, __source: !0 };
function dg(e, t, n) {
  var i, r = {}, o = null, l = null;
  if (t != null) for (i in t.ref !== void 0 && (l = t.ref), t.key !== void 0 && (o = "" + t.key), t) cg.call(t, i) && !hg.hasOwnProperty(i) && (r[i] = t[i]);
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    for (var c = Array(u), d = 0; d < u; d++) c[d] = arguments[d + 2];
    r.children = c;
  }
  if (e && e.defaultProps) for (i in u = e.defaultProps, u) r[i] === void 0 && (r[i] = u[i]);
  return { $$typeof: oo, type: e, key: o, ref: l, props: r, _owner: nh.current };
}
function ix(e, t) {
  return { $$typeof: oo, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ih(e) {
  return typeof e == "object" && e !== null && e.$$typeof === oo;
}
function sx(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var xf = /\/+/g;
function ru(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? sx("" + e.key) : t.toString(36);
}
function ca(e, t, n, i, r) {
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
        case oo:
        case $0:
          l = !0;
      }
  }
  if (l) return l = e, r = r(l), e = i === "" ? "." + ru(l, 0) : i, yf(r) ? (n = "", e != null && (n = e.replace(xf, "$&/") + "/"), ca(r, t, n, "", function(d) {
    return d;
  })) : r != null && (ih(r) && (r = ix(r, n + (!r.key || l && l.key === r.key ? "" : ("" + r.key).replace(xf, "$&/") + "/") + e)), t.push(r)), 1;
  if (l = 0, i = i === "" ? "." : i + ":", yf(e)) for (var u = 0; u < e.length; u++) {
    o = e[u];
    var c = i + ru(o, u);
    l += ca(o, t, n, c, r);
  }
  else if (c = nx(e), typeof c == "function") for (e = c.call(e), u = 0; !(o = e.next()).done; ) o = o.value, c = i + ru(o, u++), l += ca(o, t, n, c, r);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return l;
}
function Oo(e, t, n) {
  if (e == null) return e;
  var i = [], r = 0;
  return ca(e, i, "", "", function(o) {
    return t.call(n, o, r++);
  }), i;
}
function rx(e) {
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
var de = { current: null }, ha = { transition: null }, ox = { ReactCurrentDispatcher: de, ReactCurrentBatchConfig: ha, ReactCurrentOwner: nh };
function fg() {
  throw Error("act(...) is not supported in production builds of React.");
}
ft.Children = { map: Oo, forEach: function(e, t, n) {
  Oo(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Oo(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Oo(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!ih(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
ft.Component = Ds;
ft.Fragment = Y0;
ft.Profiler = X0;
ft.PureComponent = th;
ft.StrictMode = K0;
ft.Suspense = J0;
ft.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ox;
ft.act = fg;
ft.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var i = ag({}, e.props), r = e.key, o = e.ref, l = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, l = nh.current), t.key !== void 0 && (r = "" + t.key), e.type && e.type.defaultProps) var u = e.type.defaultProps;
    for (c in t) cg.call(t, c) && !hg.hasOwnProperty(c) && (i[c] = t[c] === void 0 && u !== void 0 ? u[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) i.children = n;
  else if (1 < c) {
    u = Array(c);
    for (var d = 0; d < c; d++) u[d] = arguments[d + 2];
    i.children = u;
  }
  return { $$typeof: oo, type: e.type, key: r, ref: o, props: i, _owner: l };
};
ft.createContext = function(e) {
  return e = { $$typeof: q0, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: G0, _context: e }, e.Consumer = e;
};
ft.createElement = dg;
ft.createFactory = function(e) {
  var t = dg.bind(null, e);
  return t.type = e, t;
};
ft.createRef = function() {
  return { current: null };
};
ft.forwardRef = function(e) {
  return { $$typeof: Q0, render: e };
};
ft.isValidElement = ih;
ft.lazy = function(e) {
  return { $$typeof: ex, _payload: { _status: -1, _result: e }, _init: rx };
};
ft.memo = function(e, t) {
  return { $$typeof: tx, type: e, compare: t === void 0 ? null : t };
};
ft.startTransition = function(e) {
  var t = ha.transition;
  ha.transition = {};
  try {
    e();
  } finally {
    ha.transition = t;
  }
};
ft.unstable_act = fg;
ft.useCallback = function(e, t) {
  return de.current.useCallback(e, t);
};
ft.useContext = function(e) {
  return de.current.useContext(e);
};
ft.useDebugValue = function() {
};
ft.useDeferredValue = function(e) {
  return de.current.useDeferredValue(e);
};
ft.useEffect = function(e, t) {
  return de.current.useEffect(e, t);
};
ft.useId = function() {
  return de.current.useId();
};
ft.useImperativeHandle = function(e, t, n) {
  return de.current.useImperativeHandle(e, t, n);
};
ft.useInsertionEffect = function(e, t) {
  return de.current.useInsertionEffect(e, t);
};
ft.useLayoutEffect = function(e, t) {
  return de.current.useLayoutEffect(e, t);
};
ft.useMemo = function(e, t) {
  return de.current.useMemo(e, t);
};
ft.useReducer = function(e, t, n) {
  return de.current.useReducer(e, t, n);
};
ft.useRef = function(e) {
  return de.current.useRef(e);
};
ft.useState = function(e) {
  return de.current.useState(e);
};
ft.useSyncExternalStore = function(e, t, n) {
  return de.current.useSyncExternalStore(e, t, n);
};
ft.useTransition = function() {
  return de.current.useTransition();
};
ft.version = "18.3.1";
rg.exports = ft;
var G = rg.exports;
const ax = /* @__PURE__ */ ig(G);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lx = G, ux = Symbol.for("react.element"), cx = Symbol.for("react.fragment"), hx = Object.prototype.hasOwnProperty, dx = lx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, fx = { key: !0, ref: !0, __self: !0, __source: !0 };
function pg(e, t, n) {
  var i, r = {}, o = null, l = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (l = t.ref);
  for (i in t) hx.call(t, i) && !fx.hasOwnProperty(i) && (r[i] = t[i]);
  if (e && e.defaultProps) for (i in t = e.defaultProps, t) r[i] === void 0 && (r[i] = t[i]);
  return { $$typeof: ux, type: e, key: o, ref: l, props: r, _owner: dx.current };
}
al.Fragment = cx;
al.jsx = pg;
al.jsxs = pg;
sg.exports = al;
var y = sg.exports, mg = { exports: {} }, ze = {}, gg = { exports: {} }, _g = {};
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
  function t(D, $) {
    var j = D.length;
    D.push($);
    t: for (; 0 < j; ) {
      var X = j - 1 >>> 1, tt = D[X];
      if (0 < r(tt, $)) D[X] = $, D[j] = tt, j = X;
      else break t;
    }
  }
  function n(D) {
    return D.length === 0 ? null : D[0];
  }
  function i(D) {
    if (D.length === 0) return null;
    var $ = D[0], j = D.pop();
    if (j !== $) {
      D[0] = j;
      t: for (var X = 0, tt = D.length, kt = tt >>> 1; X < kt; ) {
        var lt = 2 * (X + 1) - 1, st = D[lt], q = lt + 1, qt = D[q];
        if (0 > r(st, j)) q < tt && 0 > r(qt, st) ? (D[X] = qt, D[q] = j, X = q) : (D[X] = st, D[lt] = j, X = lt);
        else if (q < tt && 0 > r(qt, j)) D[X] = qt, D[q] = j, X = q;
        else break t;
      }
    }
    return $;
  }
  function r(D, $) {
    var j = D.sortIndex - $.sortIndex;
    return j !== 0 ? j : D.id - $.id;
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
  var c = [], d = [], p = 1, g = null, _ = 3, x = !1, S = !1, b = !1, C = typeof setTimeout == "function" ? setTimeout : null, w = typeof clearTimeout == "function" ? clearTimeout : null, k = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function P(D) {
    for (var $ = n(d); $ !== null; ) {
      if ($.callback === null) i(d);
      else if ($.startTime <= D) i(d), $.sortIndex = $.expirationTime, t(c, $);
      else break;
      $ = n(d);
    }
  }
  function T(D) {
    if (b = !1, P(D), !S) if (n(c) !== null) S = !0, J(E);
    else {
      var $ = n(d);
      $ !== null && dt(T, $.startTime - D);
    }
  }
  function E(D, $) {
    S = !1, b && (b = !1, w(I), I = -1), x = !0;
    var j = _;
    try {
      for (P($), g = n(c); g !== null && (!(g.expirationTime > $) || D && !W()); ) {
        var X = g.callback;
        if (typeof X == "function") {
          g.callback = null, _ = g.priorityLevel;
          var tt = X(g.expirationTime <= $);
          $ = e.unstable_now(), typeof tt == "function" ? g.callback = tt : g === n(c) && i(c), P($);
        } else i(c);
        g = n(c);
      }
      if (g !== null) var kt = !0;
      else {
        var lt = n(d);
        lt !== null && dt(T, lt.startTime - $), kt = !1;
      }
      return kt;
    } finally {
      g = null, _ = j, x = !1;
    }
  }
  var N = !1, A = null, I = -1, H = 5, B = -1;
  function W() {
    return !(e.unstable_now() - B < H);
  }
  function U() {
    if (A !== null) {
      var D = e.unstable_now();
      B = D;
      var $ = !0;
      try {
        $ = A(!0, D);
      } finally {
        $ ? vt() : (N = !1, A = null);
      }
    } else N = !1;
  }
  var vt;
  if (typeof k == "function") vt = function() {
    k(U);
  };
  else if (typeof MessageChannel < "u") {
    var it = new MessageChannel(), ht = it.port2;
    it.port1.onmessage = U, vt = function() {
      ht.postMessage(null);
    };
  } else vt = function() {
    C(U, 0);
  };
  function J(D) {
    A = D, N || (N = !0, vt());
  }
  function dt(D, $) {
    I = C(function() {
      D(e.unstable_now());
    }, $);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(D) {
    D.callback = null;
  }, e.unstable_continueExecution = function() {
    S || x || (S = !0, J(E));
  }, e.unstable_forceFrameRate = function(D) {
    0 > D || 125 < D ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : H = 0 < D ? Math.floor(1e3 / D) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return _;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(D) {
    switch (_) {
      case 1:
      case 2:
      case 3:
        var $ = 3;
        break;
      default:
        $ = _;
    }
    var j = _;
    _ = $;
    try {
      return D();
    } finally {
      _ = j;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(D, $) {
    switch (D) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        D = 3;
    }
    var j = _;
    _ = D;
    try {
      return $();
    } finally {
      _ = j;
    }
  }, e.unstable_scheduleCallback = function(D, $, j) {
    var X = e.unstable_now();
    switch (typeof j == "object" && j !== null ? (j = j.delay, j = typeof j == "number" && 0 < j ? X + j : X) : j = X, D) {
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
    return tt = j + tt, D = { id: p++, callback: $, priorityLevel: D, startTime: j, expirationTime: tt, sortIndex: -1 }, j > X ? (D.sortIndex = j, t(d, D), n(c) === null && D === n(d) && (b ? (w(I), I = -1) : b = !0, dt(T, j - X))) : (D.sortIndex = tt, t(c, D), S || x || (S = !0, J(E))), D;
  }, e.unstable_shouldYield = W, e.unstable_wrapCallback = function(D) {
    var $ = _;
    return function() {
      var j = _;
      _ = $;
      try {
        return D.apply(this, arguments);
      } finally {
        _ = j;
      }
    };
  };
})(_g);
gg.exports = _g;
var px = gg.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mx = G, Ee = px;
function F(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var vg = /* @__PURE__ */ new Set(), Dr = {};
function Ui(e, t) {
  Cs(e, t), Cs(e + "Capture", t);
}
function Cs(e, t) {
  for (Dr[e] = t, e = 0; e < t.length; e++) vg.add(t[e]);
}
var On = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ku = Object.prototype.hasOwnProperty, gx = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, wf = {}, bf = {};
function _x(e) {
  return Ku.call(bf, e) ? !0 : Ku.call(wf, e) ? !1 : gx.test(e) ? bf[e] = !0 : (wf[e] = !0, !1);
}
function vx(e, t, n, i) {
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
function yx(e, t, n, i) {
  if (t === null || typeof t > "u" || vx(e, t, n, i)) return !0;
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
function fe(e, t, n, i, r, o, l) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = i, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = l;
}
var ee = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ee[e] = new fe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ee[t] = new fe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ee[e] = new fe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ee[e] = new fe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ee[e] = new fe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ee[e] = new fe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ee[e] = new fe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ee[e] = new fe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ee[e] = new fe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var sh = /[\-:]([a-z])/g;
function rh(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    sh,
    rh
  );
  ee[t] = new fe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(sh, rh);
  ee[t] = new fe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(sh, rh);
  ee[t] = new fe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ee[e] = new fe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ee.xlinkHref = new fe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ee[e] = new fe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function oh(e, t, n, i) {
  var r = ee.hasOwnProperty(t) ? ee[t] : null;
  (r !== null ? r.type !== 0 : i || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (yx(t, n, r, i) && (n = null), i || r === null ? _x(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : r.mustUseProperty ? e[r.propertyName] = n === null ? r.type === 3 ? !1 : "" : n : (t = r.attributeName, i = r.attributeNamespace, n === null ? e.removeAttribute(t) : (r = r.type, n = r === 3 || r === 4 && n === !0 ? "" : "" + n, i ? e.setAttributeNS(i, t, n) : e.setAttribute(t, n))));
}
var Dn = mx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, No = Symbol.for("react.element"), as = Symbol.for("react.portal"), ls = Symbol.for("react.fragment"), ah = Symbol.for("react.strict_mode"), Xu = Symbol.for("react.profiler"), yg = Symbol.for("react.provider"), xg = Symbol.for("react.context"), lh = Symbol.for("react.forward_ref"), Gu = Symbol.for("react.suspense"), qu = Symbol.for("react.suspense_list"), uh = Symbol.for("react.memo"), Un = Symbol.for("react.lazy"), wg = Symbol.for("react.offscreen"), kf = Symbol.iterator;
function er(e) {
  return e === null || typeof e != "object" ? null : (e = kf && e[kf] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Dt = Object.assign, ou;
function pr(e) {
  if (ou === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    ou = t && t[1] || "";
  }
  return `
` + ou + e;
}
var au = !1;
function lu(e, t) {
  if (!e || au) return "";
  au = !0;
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
    au = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? pr(e) : "";
}
function xx(e) {
  switch (e.tag) {
    case 5:
      return pr(e.type);
    case 16:
      return pr("Lazy");
    case 13:
      return pr("Suspense");
    case 19:
      return pr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = lu(e.type, !1), e;
    case 11:
      return e = lu(e.type.render, !1), e;
    case 1:
      return e = lu(e.type, !0), e;
    default:
      return "";
  }
}
function Qu(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case ls:
      return "Fragment";
    case as:
      return "Portal";
    case Xu:
      return "Profiler";
    case ah:
      return "StrictMode";
    case Gu:
      return "Suspense";
    case qu:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case xg:
      return (e.displayName || "Context") + ".Consumer";
    case yg:
      return (e._context.displayName || "Context") + ".Provider";
    case lh:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case uh:
      return t = e.displayName || null, t !== null ? t : Qu(e.type) || "Memo";
    case Un:
      t = e._payload, e = e._init;
      try {
        return Qu(e(t));
      } catch {
      }
  }
  return null;
}
function wx(e) {
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
      return Qu(t);
    case 8:
      return t === ah ? "StrictMode" : "Mode";
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
function hi(e) {
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
function bg(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function bx(e) {
  var t = bg(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), i = "" + e[t];
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
function Ao(e) {
  e._valueTracker || (e._valueTracker = bx(e));
}
function kg(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), i = "";
  return e && (i = bg(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), !0) : !1;
}
function La(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ju(e, t) {
  var n = t.checked;
  return Dt({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Sf(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, i = t.checked != null ? t.checked : t.defaultChecked;
  n = hi(t.value != null ? t.value : n), e._wrapperState = { initialChecked: i, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Sg(e, t) {
  t = t.checked, t != null && oh(e, "checked", t, !1);
}
function tc(e, t) {
  Sg(e, t);
  var n = hi(t.value), i = t.type;
  if (n != null) i === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (i === "submit" || i === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? ec(e, t.type, n) : t.hasOwnProperty("defaultValue") && ec(e, t.type, hi(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Pf(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var i = t.type;
    if (!(i !== "submit" && i !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function ec(e, t, n) {
  (t !== "number" || La(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var mr = Array.isArray;
function ys(e, t, n, i) {
  if (e = e.options, t) {
    t = {};
    for (var r = 0; r < n.length; r++) t["$" + n[r]] = !0;
    for (n = 0; n < e.length; n++) r = t.hasOwnProperty("$" + e[n].value), e[n].selected !== r && (e[n].selected = r), r && i && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + hi(n), t = null, r = 0; r < e.length; r++) {
      if (e[r].value === n) {
        e[r].selected = !0, i && (e[r].defaultSelected = !0);
        return;
      }
      t !== null || e[r].disabled || (t = e[r]);
    }
    t !== null && (t.selected = !0);
  }
}
function nc(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(F(91));
  return Dt({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Mf(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(F(92));
      if (mr(n)) {
        if (1 < n.length) throw Error(F(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: hi(n) };
}
function Pg(e, t) {
  var n = hi(t.value), i = hi(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), i != null && (e.defaultValue = "" + i);
}
function Cf(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Mg(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ic(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Mg(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Io, Cg = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, i, r) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, i, r);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Io = Io || document.createElement("div"), Io.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Io.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Rr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var kr = {
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
}, kx = ["Webkit", "ms", "Moz", "O"];
Object.keys(kr).forEach(function(e) {
  kx.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), kr[t] = kr[e];
  });
});
function Lg(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || kr.hasOwnProperty(e) && kr[e] ? ("" + t).trim() : t + "px";
}
function Tg(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var i = n.indexOf("--") === 0, r = Lg(n, t[n], i);
    n === "float" && (n = "cssFloat"), i ? e.setProperty(n, r) : e[n] = r;
  }
}
var Sx = Dt({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function sc(e, t) {
  if (t) {
    if (Sx[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(F(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(F(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(F(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(F(62));
  }
}
function rc(e, t) {
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
var oc = null;
function ch(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var ac = null, xs = null, ws = null;
function Lf(e) {
  if (e = uo(e)) {
    if (typeof ac != "function") throw Error(F(280));
    var t = e.stateNode;
    t && (t = dl(t), ac(e.stateNode, e.type, t));
  }
}
function Eg(e) {
  xs ? ws ? ws.push(e) : ws = [e] : xs = e;
}
function zg() {
  if (xs) {
    var e = xs, t = ws;
    if (ws = xs = null, Lf(e), t) for (e = 0; e < t.length; e++) Lf(t[e]);
  }
}
function Og(e, t) {
  return e(t);
}
function Ng() {
}
var uu = !1;
function Ag(e, t, n) {
  if (uu) return e(t, n);
  uu = !0;
  try {
    return Og(e, t, n);
  } finally {
    uu = !1, (xs !== null || ws !== null) && (Ng(), zg());
  }
}
function jr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var i = dl(n);
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
var lc = !1;
if (On) try {
  var nr = {};
  Object.defineProperty(nr, "passive", { get: function() {
    lc = !0;
  } }), window.addEventListener("test", nr, nr), window.removeEventListener("test", nr, nr);
} catch {
  lc = !1;
}
function Px(e, t, n, i, r, o, l, u, c) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (p) {
    this.onError(p);
  }
}
var Sr = !1, Ta = null, Ea = !1, uc = null, Mx = { onError: function(e) {
  Sr = !0, Ta = e;
} };
function Cx(e, t, n, i, r, o, l, u, c) {
  Sr = !1, Ta = null, Px.apply(Mx, arguments);
}
function Lx(e, t, n, i, r, o, l, u, c) {
  if (Cx.apply(this, arguments), Sr) {
    if (Sr) {
      var d = Ta;
      Sr = !1, Ta = null;
    } else throw Error(F(198));
    Ea || (Ea = !0, uc = d);
  }
}
function $i(e) {
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
function Ig(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Tf(e) {
  if ($i(e) !== e) throw Error(F(188));
}
function Tx(e) {
  var t = e.alternate;
  if (!t) {
    if (t = $i(e), t === null) throw Error(F(188));
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
        if (o === n) return Tf(r), e;
        if (o === i) return Tf(r), t;
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
function Dg(e) {
  return e = Tx(e), e !== null ? Rg(e) : null;
}
function Rg(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Rg(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var jg = Ee.unstable_scheduleCallback, Ef = Ee.unstable_cancelCallback, Ex = Ee.unstable_shouldYield, zx = Ee.unstable_requestPaint, Bt = Ee.unstable_now, Ox = Ee.unstable_getCurrentPriorityLevel, hh = Ee.unstable_ImmediatePriority, Bg = Ee.unstable_UserBlockingPriority, za = Ee.unstable_NormalPriority, Nx = Ee.unstable_LowPriority, Fg = Ee.unstable_IdlePriority, ll = null, pn = null;
function Ax(e) {
  if (pn && typeof pn.onCommitFiberRoot == "function") try {
    pn.onCommitFiberRoot(ll, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Qe = Math.clz32 ? Math.clz32 : Rx, Ix = Math.log, Dx = Math.LN2;
function Rx(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Ix(e) / Dx | 0) | 0;
}
var Do = 64, Ro = 4194304;
function gr(e) {
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
function Oa(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var i = 0, r = e.suspendedLanes, o = e.pingedLanes, l = n & 268435455;
  if (l !== 0) {
    var u = l & ~r;
    u !== 0 ? i = gr(u) : (o &= l, o !== 0 && (i = gr(o)));
  } else l = n & ~r, l !== 0 ? i = gr(l) : o !== 0 && (i = gr(o));
  if (i === 0) return 0;
  if (t !== 0 && t !== i && !(t & r) && (r = i & -i, o = t & -t, r >= o || r === 16 && (o & 4194240) !== 0)) return t;
  if (i & 4 && (i |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= i; 0 < t; ) n = 31 - Qe(t), r = 1 << n, i |= e[n], t &= ~r;
  return i;
}
function jx(e, t) {
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
function Bx(e, t) {
  for (var n = e.suspendedLanes, i = e.pingedLanes, r = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var l = 31 - Qe(o), u = 1 << l, c = r[l];
    c === -1 ? (!(u & n) || u & i) && (r[l] = jx(u, t)) : c <= t && (e.expiredLanes |= u), o &= ~u;
  }
}
function cc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Hg() {
  var e = Do;
  return Do <<= 1, !(Do & 4194240) && (Do = 64), e;
}
function cu(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function ao(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Qe(t), e[t] = n;
}
function Fx(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var i = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var r = 31 - Qe(n), o = 1 << r;
    t[r] = 0, i[r] = -1, e[r] = -1, n &= ~o;
  }
}
function dh(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var i = 31 - Qe(n), r = 1 << i;
    r & t | e[i] & t && (e[i] |= t), n &= ~r;
  }
}
var bt = 0;
function Wg(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Vg, fh, Zg, Ug, $g, hc = !1, jo = [], ni = null, ii = null, si = null, Br = /* @__PURE__ */ new Map(), Fr = /* @__PURE__ */ new Map(), Yn = [], Hx = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function zf(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ni = null;
      break;
    case "dragenter":
    case "dragleave":
      ii = null;
      break;
    case "mouseover":
    case "mouseout":
      si = null;
      break;
    case "pointerover":
    case "pointerout":
      Br.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Fr.delete(t.pointerId);
  }
}
function ir(e, t, n, i, r, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: i, nativeEvent: o, targetContainers: [r] }, t !== null && (t = uo(t), t !== null && fh(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, r !== null && t.indexOf(r) === -1 && t.push(r), e);
}
function Wx(e, t, n, i, r) {
  switch (t) {
    case "focusin":
      return ni = ir(ni, e, t, n, i, r), !0;
    case "dragenter":
      return ii = ir(ii, e, t, n, i, r), !0;
    case "mouseover":
      return si = ir(si, e, t, n, i, r), !0;
    case "pointerover":
      var o = r.pointerId;
      return Br.set(o, ir(Br.get(o) || null, e, t, n, i, r)), !0;
    case "gotpointercapture":
      return o = r.pointerId, Fr.set(o, ir(Fr.get(o) || null, e, t, n, i, r)), !0;
  }
  return !1;
}
function Yg(e) {
  var t = Ei(e.target);
  if (t !== null) {
    var n = $i(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ig(n), t !== null) {
          e.blockedOn = t, $g(e.priority, function() {
            Zg(n);
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
function da(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = dc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var i = new n.constructor(n.type, n);
      oc = i, n.target.dispatchEvent(i), oc = null;
    } else return t = uo(n), t !== null && fh(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Of(e, t, n) {
  da(e) && n.delete(t);
}
function Vx() {
  hc = !1, ni !== null && da(ni) && (ni = null), ii !== null && da(ii) && (ii = null), si !== null && da(si) && (si = null), Br.forEach(Of), Fr.forEach(Of);
}
function sr(e, t) {
  e.blockedOn === t && (e.blockedOn = null, hc || (hc = !0, Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority, Vx)));
}
function Hr(e) {
  function t(r) {
    return sr(r, e);
  }
  if (0 < jo.length) {
    sr(jo[0], e);
    for (var n = 1; n < jo.length; n++) {
      var i = jo[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
  }
  for (ni !== null && sr(ni, e), ii !== null && sr(ii, e), si !== null && sr(si, e), Br.forEach(t), Fr.forEach(t), n = 0; n < Yn.length; n++) i = Yn[n], i.blockedOn === e && (i.blockedOn = null);
  for (; 0 < Yn.length && (n = Yn[0], n.blockedOn === null); ) Yg(n), n.blockedOn === null && Yn.shift();
}
var bs = Dn.ReactCurrentBatchConfig, Na = !0;
function Zx(e, t, n, i) {
  var r = bt, o = bs.transition;
  bs.transition = null;
  try {
    bt = 1, ph(e, t, n, i);
  } finally {
    bt = r, bs.transition = o;
  }
}
function Ux(e, t, n, i) {
  var r = bt, o = bs.transition;
  bs.transition = null;
  try {
    bt = 4, ph(e, t, n, i);
  } finally {
    bt = r, bs.transition = o;
  }
}
function ph(e, t, n, i) {
  if (Na) {
    var r = dc(e, t, n, i);
    if (r === null) xu(e, t, i, Aa, n), zf(e, i);
    else if (Wx(r, e, t, n, i)) i.stopPropagation();
    else if (zf(e, i), t & 4 && -1 < Hx.indexOf(e)) {
      for (; r !== null; ) {
        var o = uo(r);
        if (o !== null && Vg(o), o = dc(e, t, n, i), o === null && xu(e, t, i, Aa, n), o === r) break;
        r = o;
      }
      r !== null && i.stopPropagation();
    } else xu(e, t, i, null, n);
  }
}
var Aa = null;
function dc(e, t, n, i) {
  if (Aa = null, e = ch(i), e = Ei(e), e !== null) if (t = $i(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ig(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Aa = e, null;
}
function Kg(e) {
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
      switch (Ox()) {
        case hh:
          return 1;
        case Bg:
          return 4;
        case za:
        case Nx:
          return 16;
        case Fg:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Xn = null, mh = null, fa = null;
function Xg() {
  if (fa) return fa;
  var e, t = mh, n = t.length, i, r = "value" in Xn ? Xn.value : Xn.textContent, o = r.length;
  for (e = 0; e < n && t[e] === r[e]; e++) ;
  var l = n - e;
  for (i = 1; i <= l && t[n - i] === r[o - i]; i++) ;
  return fa = r.slice(e, 1 < i ? 1 - i : void 0);
}
function pa(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Bo() {
  return !0;
}
function Nf() {
  return !1;
}
function Oe(e) {
  function t(n, i, r, o, l) {
    this._reactName = n, this._targetInst = r, this.type = i, this.nativeEvent = o, this.target = l, this.currentTarget = null;
    for (var u in e) e.hasOwnProperty(u) && (n = e[u], this[u] = n ? n(o) : o[u]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Bo : Nf, this.isPropagationStopped = Nf, this;
  }
  return Dt(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Bo);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Bo);
  }, persist: function() {
  }, isPersistent: Bo }), t;
}
var Rs = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, gh = Oe(Rs), lo = Dt({}, Rs, { view: 0, detail: 0 }), $x = Oe(lo), hu, du, rr, ul = Dt({}, lo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: _h, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== rr && (rr && e.type === "mousemove" ? (hu = e.screenX - rr.screenX, du = e.screenY - rr.screenY) : du = hu = 0, rr = e), hu);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : du;
} }), Af = Oe(ul), Yx = Dt({}, ul, { dataTransfer: 0 }), Kx = Oe(Yx), Xx = Dt({}, lo, { relatedTarget: 0 }), fu = Oe(Xx), Gx = Dt({}, Rs, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), qx = Oe(Gx), Qx = Dt({}, Rs, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Jx = Oe(Qx), t1 = Dt({}, Rs, { data: 0 }), If = Oe(t1), e1 = {
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
}, n1 = {
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
}, i1 = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function s1(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = i1[e]) ? !!t[e] : !1;
}
function _h() {
  return s1;
}
var r1 = Dt({}, lo, { key: function(e) {
  if (e.key) {
    var t = e1[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = pa(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? n1[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: _h, charCode: function(e) {
  return e.type === "keypress" ? pa(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? pa(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), o1 = Oe(r1), a1 = Dt({}, ul, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Df = Oe(a1), l1 = Dt({}, lo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: _h }), u1 = Oe(l1), c1 = Dt({}, Rs, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), h1 = Oe(c1), d1 = Dt({}, ul, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), f1 = Oe(d1), p1 = [9, 13, 27, 32], vh = On && "CompositionEvent" in window, Pr = null;
On && "documentMode" in document && (Pr = document.documentMode);
var m1 = On && "TextEvent" in window && !Pr, Gg = On && (!vh || Pr && 8 < Pr && 11 >= Pr), Rf = " ", jf = !1;
function qg(e, t) {
  switch (e) {
    case "keyup":
      return p1.indexOf(t.keyCode) !== -1;
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
function Qg(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var us = !1;
function g1(e, t) {
  switch (e) {
    case "compositionend":
      return Qg(t);
    case "keypress":
      return t.which !== 32 ? null : (jf = !0, Rf);
    case "textInput":
      return e = t.data, e === Rf && jf ? null : e;
    default:
      return null;
  }
}
function _1(e, t) {
  if (us) return e === "compositionend" || !vh && qg(e, t) ? (e = Xg(), fa = mh = Xn = null, us = !1, e) : null;
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
      return Gg && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var v1 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Bf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!v1[e.type] : t === "textarea";
}
function Jg(e, t, n, i) {
  Eg(i), t = Ia(t, "onChange"), 0 < t.length && (n = new gh("onChange", "change", null, n, i), e.push({ event: n, listeners: t }));
}
var Mr = null, Wr = null;
function y1(e) {
  c_(e, 0);
}
function cl(e) {
  var t = ds(e);
  if (kg(t)) return e;
}
function x1(e, t) {
  if (e === "change") return t;
}
var t_ = !1;
if (On) {
  var pu;
  if (On) {
    var mu = "oninput" in document;
    if (!mu) {
      var Ff = document.createElement("div");
      Ff.setAttribute("oninput", "return;"), mu = typeof Ff.oninput == "function";
    }
    pu = mu;
  } else pu = !1;
  t_ = pu && (!document.documentMode || 9 < document.documentMode);
}
function Hf() {
  Mr && (Mr.detachEvent("onpropertychange", e_), Wr = Mr = null);
}
function e_(e) {
  if (e.propertyName === "value" && cl(Wr)) {
    var t = [];
    Jg(t, Wr, e, ch(e)), Ag(y1, t);
  }
}
function w1(e, t, n) {
  e === "focusin" ? (Hf(), Mr = t, Wr = n, Mr.attachEvent("onpropertychange", e_)) : e === "focusout" && Hf();
}
function b1(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return cl(Wr);
}
function k1(e, t) {
  if (e === "click") return cl(t);
}
function S1(e, t) {
  if (e === "input" || e === "change") return cl(t);
}
function P1(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var tn = typeof Object.is == "function" ? Object.is : P1;
function Vr(e, t) {
  if (tn(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), i = Object.keys(t);
  if (n.length !== i.length) return !1;
  for (i = 0; i < n.length; i++) {
    var r = n[i];
    if (!Ku.call(t, r) || !tn(e[r], t[r])) return !1;
  }
  return !0;
}
function Wf(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Vf(e, t) {
  var n = Wf(e);
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
    n = Wf(n);
  }
}
function n_(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? n_(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function i_() {
  for (var e = window, t = La(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = La(e.document);
  }
  return t;
}
function yh(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function M1(e) {
  var t = i_(), n = e.focusedElem, i = e.selectionRange;
  if (t !== n && n && n.ownerDocument && n_(n.ownerDocument.documentElement, n)) {
    if (i !== null && yh(n)) {
      if (t = i.start, e = i.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var r = n.textContent.length, o = Math.min(i.start, r);
        i = i.end === void 0 ? o : Math.min(i.end, r), !e.extend && o > i && (r = i, i = o, o = r), r = Vf(n, o);
        var l = Vf(
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
var C1 = On && "documentMode" in document && 11 >= document.documentMode, cs = null, fc = null, Cr = null, pc = !1;
function Zf(e, t, n) {
  var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  pc || cs == null || cs !== La(i) || (i = cs, "selectionStart" in i && yh(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = { anchorNode: i.anchorNode, anchorOffset: i.anchorOffset, focusNode: i.focusNode, focusOffset: i.focusOffset }), Cr && Vr(Cr, i) || (Cr = i, i = Ia(fc, "onSelect"), 0 < i.length && (t = new gh("onSelect", "select", null, t, n), e.push({ event: t, listeners: i }), t.target = cs)));
}
function Fo(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var hs = { animationend: Fo("Animation", "AnimationEnd"), animationiteration: Fo("Animation", "AnimationIteration"), animationstart: Fo("Animation", "AnimationStart"), transitionend: Fo("Transition", "TransitionEnd") }, gu = {}, s_ = {};
On && (s_ = document.createElement("div").style, "AnimationEvent" in window || (delete hs.animationend.animation, delete hs.animationiteration.animation, delete hs.animationstart.animation), "TransitionEvent" in window || delete hs.transitionend.transition);
function hl(e) {
  if (gu[e]) return gu[e];
  if (!hs[e]) return e;
  var t = hs[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in s_) return gu[e] = t[n];
  return e;
}
var r_ = hl("animationend"), o_ = hl("animationiteration"), a_ = hl("animationstart"), l_ = hl("transitionend"), u_ = /* @__PURE__ */ new Map(), Uf = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function pi(e, t) {
  u_.set(e, t), Ui(t, [e]);
}
for (var _u = 0; _u < Uf.length; _u++) {
  var vu = Uf[_u], L1 = vu.toLowerCase(), T1 = vu[0].toUpperCase() + vu.slice(1);
  pi(L1, "on" + T1);
}
pi(r_, "onAnimationEnd");
pi(o_, "onAnimationIteration");
pi(a_, "onAnimationStart");
pi("dblclick", "onDoubleClick");
pi("focusin", "onFocus");
pi("focusout", "onBlur");
pi(l_, "onTransitionEnd");
Cs("onMouseEnter", ["mouseout", "mouseover"]);
Cs("onMouseLeave", ["mouseout", "mouseover"]);
Cs("onPointerEnter", ["pointerout", "pointerover"]);
Cs("onPointerLeave", ["pointerout", "pointerover"]);
Ui("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ui("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ui("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ui("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ui("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ui("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var _r = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), E1 = new Set("cancel close invalid load scroll toggle".split(" ").concat(_r));
function $f(e, t, n) {
  var i = e.type || "unknown-event";
  e.currentTarget = n, Lx(i, t, void 0, e), e.currentTarget = null;
}
function c_(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var i = e[n], r = i.event;
    i = i.listeners;
    t: {
      var o = void 0;
      if (t) for (var l = i.length - 1; 0 <= l; l--) {
        var u = i[l], c = u.instance, d = u.currentTarget;
        if (u = u.listener, c !== o && r.isPropagationStopped()) break t;
        $f(r, u, d), o = c;
      }
      else for (l = 0; l < i.length; l++) {
        if (u = i[l], c = u.instance, d = u.currentTarget, u = u.listener, c !== o && r.isPropagationStopped()) break t;
        $f(r, u, d), o = c;
      }
    }
  }
  if (Ea) throw e = uc, Ea = !1, uc = null, e;
}
function Ct(e, t) {
  var n = t[yc];
  n === void 0 && (n = t[yc] = /* @__PURE__ */ new Set());
  var i = e + "__bubble";
  n.has(i) || (h_(t, e, 2, !1), n.add(i));
}
function yu(e, t, n) {
  var i = 0;
  t && (i |= 4), h_(n, e, i, t);
}
var Ho = "_reactListening" + Math.random().toString(36).slice(2);
function Zr(e) {
  if (!e[Ho]) {
    e[Ho] = !0, vg.forEach(function(n) {
      n !== "selectionchange" && (E1.has(n) || yu(n, !1, e), yu(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Ho] || (t[Ho] = !0, yu("selectionchange", !1, t));
  }
}
function h_(e, t, n, i) {
  switch (Kg(t)) {
    case 1:
      var r = Zx;
      break;
    case 4:
      r = Ux;
      break;
    default:
      r = ph;
  }
  n = r.bind(null, t, n, e), r = void 0, !lc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (r = !0), i ? r !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: r }) : e.addEventListener(t, n, !0) : r !== void 0 ? e.addEventListener(t, n, { passive: r }) : e.addEventListener(t, n, !1);
}
function xu(e, t, n, i, r) {
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
        if (l = Ei(u), l === null) return;
        if (c = l.tag, c === 5 || c === 6) {
          i = o = l;
          continue t;
        }
        u = u.parentNode;
      }
    }
    i = i.return;
  }
  Ag(function() {
    var d = o, p = ch(n), g = [];
    t: {
      var _ = u_.get(e);
      if (_ !== void 0) {
        var x = gh, S = e;
        switch (e) {
          case "keypress":
            if (pa(n) === 0) break t;
          case "keydown":
          case "keyup":
            x = o1;
            break;
          case "focusin":
            S = "focus", x = fu;
            break;
          case "focusout":
            S = "blur", x = fu;
            break;
          case "beforeblur":
          case "afterblur":
            x = fu;
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
            x = Af;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            x = Kx;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            x = u1;
            break;
          case r_:
          case o_:
          case a_:
            x = qx;
            break;
          case l_:
            x = h1;
            break;
          case "scroll":
            x = $x;
            break;
          case "wheel":
            x = f1;
            break;
          case "copy":
          case "cut":
          case "paste":
            x = Jx;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            x = Df;
        }
        var b = (t & 4) !== 0, C = !b && e === "scroll", w = b ? _ !== null ? _ + "Capture" : null : _;
        b = [];
        for (var k = d, P; k !== null; ) {
          P = k;
          var T = P.stateNode;
          if (P.tag === 5 && T !== null && (P = T, w !== null && (T = jr(k, w), T != null && b.push(Ur(k, T, P)))), C) break;
          k = k.return;
        }
        0 < b.length && (_ = new x(_, S, null, n, p), g.push({ event: _, listeners: b }));
      }
    }
    if (!(t & 7)) {
      t: {
        if (_ = e === "mouseover" || e === "pointerover", x = e === "mouseout" || e === "pointerout", _ && n !== oc && (S = n.relatedTarget || n.fromElement) && (Ei(S) || S[Nn])) break t;
        if ((x || _) && (_ = p.window === p ? p : (_ = p.ownerDocument) ? _.defaultView || _.parentWindow : window, x ? (S = n.relatedTarget || n.toElement, x = d, S = S ? Ei(S) : null, S !== null && (C = $i(S), S !== C || S.tag !== 5 && S.tag !== 6) && (S = null)) : (x = null, S = d), x !== S)) {
          if (b = Af, T = "onMouseLeave", w = "onMouseEnter", k = "mouse", (e === "pointerout" || e === "pointerover") && (b = Df, T = "onPointerLeave", w = "onPointerEnter", k = "pointer"), C = x == null ? _ : ds(x), P = S == null ? _ : ds(S), _ = new b(T, k + "leave", x, n, p), _.target = C, _.relatedTarget = P, T = null, Ei(p) === d && (b = new b(w, k + "enter", S, n, p), b.target = P, b.relatedTarget = C, T = b), C = T, x && S) e: {
            for (b = x, w = S, k = 0, P = b; P; P = is(P)) k++;
            for (P = 0, T = w; T; T = is(T)) P++;
            for (; 0 < k - P; ) b = is(b), k--;
            for (; 0 < P - k; ) w = is(w), P--;
            for (; k--; ) {
              if (b === w || w !== null && b === w.alternate) break e;
              b = is(b), w = is(w);
            }
            b = null;
          }
          else b = null;
          x !== null && Yf(g, _, x, b, !1), S !== null && C !== null && Yf(g, C, S, b, !0);
        }
      }
      t: {
        if (_ = d ? ds(d) : window, x = _.nodeName && _.nodeName.toLowerCase(), x === "select" || x === "input" && _.type === "file") var E = x1;
        else if (Bf(_)) if (t_) E = S1;
        else {
          E = b1;
          var N = w1;
        }
        else (x = _.nodeName) && x.toLowerCase() === "input" && (_.type === "checkbox" || _.type === "radio") && (E = k1);
        if (E && (E = E(e, d))) {
          Jg(g, E, n, p);
          break t;
        }
        N && N(e, _, d), e === "focusout" && (N = _._wrapperState) && N.controlled && _.type === "number" && ec(_, "number", _.value);
      }
      switch (N = d ? ds(d) : window, e) {
        case "focusin":
          (Bf(N) || N.contentEditable === "true") && (cs = N, fc = d, Cr = null);
          break;
        case "focusout":
          Cr = fc = cs = null;
          break;
        case "mousedown":
          pc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          pc = !1, Zf(g, n, p);
          break;
        case "selectionchange":
          if (C1) break;
        case "keydown":
        case "keyup":
          Zf(g, n, p);
      }
      var A;
      if (vh) t: {
        switch (e) {
          case "compositionstart":
            var I = "onCompositionStart";
            break t;
          case "compositionend":
            I = "onCompositionEnd";
            break t;
          case "compositionupdate":
            I = "onCompositionUpdate";
            break t;
        }
        I = void 0;
      }
      else us ? qg(e, n) && (I = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (I = "onCompositionStart");
      I && (Gg && n.locale !== "ko" && (us || I !== "onCompositionStart" ? I === "onCompositionEnd" && us && (A = Xg()) : (Xn = p, mh = "value" in Xn ? Xn.value : Xn.textContent, us = !0)), N = Ia(d, I), 0 < N.length && (I = new If(I, e, null, n, p), g.push({ event: I, listeners: N }), A ? I.data = A : (A = Qg(n), A !== null && (I.data = A)))), (A = m1 ? g1(e, n) : _1(e, n)) && (d = Ia(d, "onBeforeInput"), 0 < d.length && (p = new If("onBeforeInput", "beforeinput", null, n, p), g.push({ event: p, listeners: d }), p.data = A));
    }
    c_(g, t);
  });
}
function Ur(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ia(e, t) {
  for (var n = t + "Capture", i = []; e !== null; ) {
    var r = e, o = r.stateNode;
    r.tag === 5 && o !== null && (r = o, o = jr(e, n), o != null && i.unshift(Ur(e, o, r)), o = jr(e, t), o != null && i.push(Ur(e, o, r))), e = e.return;
  }
  return i;
}
function is(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Yf(e, t, n, i, r) {
  for (var o = t._reactName, l = []; n !== null && n !== i; ) {
    var u = n, c = u.alternate, d = u.stateNode;
    if (c !== null && c === i) break;
    u.tag === 5 && d !== null && (u = d, r ? (c = jr(n, o), c != null && l.unshift(Ur(n, c, u))) : r || (c = jr(n, o), c != null && l.push(Ur(n, c, u)))), n = n.return;
  }
  l.length !== 0 && e.push({ event: t, listeners: l });
}
var z1 = /\r\n?/g, O1 = /\u0000|\uFFFD/g;
function Kf(e) {
  return (typeof e == "string" ? e : "" + e).replace(z1, `
`).replace(O1, "");
}
function Wo(e, t, n) {
  if (t = Kf(t), Kf(e) !== t && n) throw Error(F(425));
}
function Da() {
}
var mc = null, gc = null;
function _c(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var vc = typeof setTimeout == "function" ? setTimeout : void 0, N1 = typeof clearTimeout == "function" ? clearTimeout : void 0, Xf = typeof Promise == "function" ? Promise : void 0, A1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Xf < "u" ? function(e) {
  return Xf.resolve(null).then(e).catch(I1);
} : vc;
function I1(e) {
  setTimeout(function() {
    throw e;
  });
}
function wu(e, t) {
  var n = t, i = 0;
  do {
    var r = n.nextSibling;
    if (e.removeChild(n), r && r.nodeType === 8) if (n = r.data, n === "/$") {
      if (i === 0) {
        e.removeChild(r), Hr(t);
        return;
      }
      i--;
    } else n !== "$" && n !== "$?" && n !== "$!" || i++;
    n = r;
  } while (n);
  Hr(t);
}
function ri(e) {
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
function Gf(e) {
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
var js = Math.random().toString(36).slice(2), fn = "__reactFiber$" + js, $r = "__reactProps$" + js, Nn = "__reactContainer$" + js, yc = "__reactEvents$" + js, D1 = "__reactListeners$" + js, R1 = "__reactHandles$" + js;
function Ei(e) {
  var t = e[fn];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Nn] || n[fn]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Gf(e); e !== null; ) {
        if (n = e[fn]) return n;
        e = Gf(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function uo(e) {
  return e = e[fn] || e[Nn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function ds(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(F(33));
}
function dl(e) {
  return e[$r] || null;
}
var xc = [], fs = -1;
function mi(e) {
  return { current: e };
}
function Tt(e) {
  0 > fs || (e.current = xc[fs], xc[fs] = null, fs--);
}
function Mt(e, t) {
  fs++, xc[fs] = e.current, e.current = t;
}
var di = {}, oe = mi(di), we = mi(!1), ji = di;
function Ls(e, t) {
  var n = e.type.contextTypes;
  if (!n) return di;
  var i = e.stateNode;
  if (i && i.__reactInternalMemoizedUnmaskedChildContext === t) return i.__reactInternalMemoizedMaskedChildContext;
  var r = {}, o;
  for (o in n) r[o] = t[o];
  return i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = r), r;
}
function be(e) {
  return e = e.childContextTypes, e != null;
}
function Ra() {
  Tt(we), Tt(oe);
}
function qf(e, t, n) {
  if (oe.current !== di) throw Error(F(168));
  Mt(oe, t), Mt(we, n);
}
function d_(e, t, n) {
  var i = e.stateNode;
  if (t = t.childContextTypes, typeof i.getChildContext != "function") return n;
  i = i.getChildContext();
  for (var r in i) if (!(r in t)) throw Error(F(108, wx(e) || "Unknown", r));
  return Dt({}, n, i);
}
function ja(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || di, ji = oe.current, Mt(oe, e), Mt(we, we.current), !0;
}
function Qf(e, t, n) {
  var i = e.stateNode;
  if (!i) throw Error(F(169));
  n ? (e = d_(e, t, ji), i.__reactInternalMemoizedMergedChildContext = e, Tt(we), Tt(oe), Mt(oe, e)) : Tt(we), Mt(we, n);
}
var Pn = null, fl = !1, bu = !1;
function f_(e) {
  Pn === null ? Pn = [e] : Pn.push(e);
}
function j1(e) {
  fl = !0, f_(e);
}
function gi() {
  if (!bu && Pn !== null) {
    bu = !0;
    var e = 0, t = bt;
    try {
      var n = Pn;
      for (bt = 1; e < n.length; e++) {
        var i = n[e];
        do
          i = i(!0);
        while (i !== null);
      }
      Pn = null, fl = !1;
    } catch (r) {
      throw Pn !== null && (Pn = Pn.slice(e + 1)), jg(hh, gi), r;
    } finally {
      bt = t, bu = !1;
    }
  }
  return null;
}
var ps = [], ms = 0, Ba = null, Fa = 0, je = [], Be = 0, Bi = null, Cn = 1, Ln = "";
function Mi(e, t) {
  ps[ms++] = Fa, ps[ms++] = Ba, Ba = e, Fa = t;
}
function p_(e, t, n) {
  je[Be++] = Cn, je[Be++] = Ln, je[Be++] = Bi, Bi = e;
  var i = Cn;
  e = Ln;
  var r = 32 - Qe(i) - 1;
  i &= ~(1 << r), n += 1;
  var o = 32 - Qe(t) + r;
  if (30 < o) {
    var l = r - r % 5;
    o = (i & (1 << l) - 1).toString(32), i >>= l, r -= l, Cn = 1 << 32 - Qe(t) + r | n << r | i, Ln = o + e;
  } else Cn = 1 << o | n << r | i, Ln = e;
}
function xh(e) {
  e.return !== null && (Mi(e, 1), p_(e, 1, 0));
}
function wh(e) {
  for (; e === Ba; ) Ba = ps[--ms], ps[ms] = null, Fa = ps[--ms], ps[ms] = null;
  for (; e === Bi; ) Bi = je[--Be], je[Be] = null, Ln = je[--Be], je[Be] = null, Cn = je[--Be], je[Be] = null;
}
var Te = null, Le = null, Et = !1, qe = null;
function m_(e, t) {
  var n = Fe(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Jf(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Te = e, Le = ri(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Te = e, Le = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Bi !== null ? { id: Cn, overflow: Ln } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Fe(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Te = e, Le = null, !0) : !1;
    default:
      return !1;
  }
}
function wc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function bc(e) {
  if (Et) {
    var t = Le;
    if (t) {
      var n = t;
      if (!Jf(e, t)) {
        if (wc(e)) throw Error(F(418));
        t = ri(n.nextSibling);
        var i = Te;
        t && Jf(e, t) ? m_(i, n) : (e.flags = e.flags & -4097 | 2, Et = !1, Te = e);
      }
    } else {
      if (wc(e)) throw Error(F(418));
      e.flags = e.flags & -4097 | 2, Et = !1, Te = e;
    }
  }
}
function tp(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Te = e;
}
function Vo(e) {
  if (e !== Te) return !1;
  if (!Et) return tp(e), Et = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !_c(e.type, e.memoizedProps)), t && (t = Le)) {
    if (wc(e)) throw g_(), Error(F(418));
    for (; t; ) m_(e, t), t = ri(t.nextSibling);
  }
  if (tp(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(F(317));
    t: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Le = ri(e.nextSibling);
              break t;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Le = null;
    }
  } else Le = Te ? ri(e.stateNode.nextSibling) : null;
  return !0;
}
function g_() {
  for (var e = Le; e; ) e = ri(e.nextSibling);
}
function Ts() {
  Le = Te = null, Et = !1;
}
function bh(e) {
  qe === null ? qe = [e] : qe.push(e);
}
var B1 = Dn.ReactCurrentBatchConfig;
function or(e, t, n) {
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
function Zo(e, t) {
  throw e = Object.prototype.toString.call(t), Error(F(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function ep(e) {
  var t = e._init;
  return t(e._payload);
}
function __(e) {
  function t(w, k) {
    if (e) {
      var P = w.deletions;
      P === null ? (w.deletions = [k], w.flags |= 16) : P.push(k);
    }
  }
  function n(w, k) {
    if (!e) return null;
    for (; k !== null; ) t(w, k), k = k.sibling;
    return null;
  }
  function i(w, k) {
    for (w = /* @__PURE__ */ new Map(); k !== null; ) k.key !== null ? w.set(k.key, k) : w.set(k.index, k), k = k.sibling;
    return w;
  }
  function r(w, k) {
    return w = ui(w, k), w.index = 0, w.sibling = null, w;
  }
  function o(w, k, P) {
    return w.index = P, e ? (P = w.alternate, P !== null ? (P = P.index, P < k ? (w.flags |= 2, k) : P) : (w.flags |= 2, k)) : (w.flags |= 1048576, k);
  }
  function l(w) {
    return e && w.alternate === null && (w.flags |= 2), w;
  }
  function u(w, k, P, T) {
    return k === null || k.tag !== 6 ? (k = Tu(P, w.mode, T), k.return = w, k) : (k = r(k, P), k.return = w, k);
  }
  function c(w, k, P, T) {
    var E = P.type;
    return E === ls ? p(w, k, P.props.children, T, P.key) : k !== null && (k.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Un && ep(E) === k.type) ? (T = r(k, P.props), T.ref = or(w, k, P), T.return = w, T) : (T = wa(P.type, P.key, P.props, null, w.mode, T), T.ref = or(w, k, P), T.return = w, T);
  }
  function d(w, k, P, T) {
    return k === null || k.tag !== 4 || k.stateNode.containerInfo !== P.containerInfo || k.stateNode.implementation !== P.implementation ? (k = Eu(P, w.mode, T), k.return = w, k) : (k = r(k, P.children || []), k.return = w, k);
  }
  function p(w, k, P, T, E) {
    return k === null || k.tag !== 7 ? (k = Ii(P, w.mode, T, E), k.return = w, k) : (k = r(k, P), k.return = w, k);
  }
  function g(w, k, P) {
    if (typeof k == "string" && k !== "" || typeof k == "number") return k = Tu("" + k, w.mode, P), k.return = w, k;
    if (typeof k == "object" && k !== null) {
      switch (k.$$typeof) {
        case No:
          return P = wa(k.type, k.key, k.props, null, w.mode, P), P.ref = or(w, null, k), P.return = w, P;
        case as:
          return k = Eu(k, w.mode, P), k.return = w, k;
        case Un:
          var T = k._init;
          return g(w, T(k._payload), P);
      }
      if (mr(k) || er(k)) return k = Ii(k, w.mode, P, null), k.return = w, k;
      Zo(w, k);
    }
    return null;
  }
  function _(w, k, P, T) {
    var E = k !== null ? k.key : null;
    if (typeof P == "string" && P !== "" || typeof P == "number") return E !== null ? null : u(w, k, "" + P, T);
    if (typeof P == "object" && P !== null) {
      switch (P.$$typeof) {
        case No:
          return P.key === E ? c(w, k, P, T) : null;
        case as:
          return P.key === E ? d(w, k, P, T) : null;
        case Un:
          return E = P._init, _(
            w,
            k,
            E(P._payload),
            T
          );
      }
      if (mr(P) || er(P)) return E !== null ? null : p(w, k, P, T, null);
      Zo(w, P);
    }
    return null;
  }
  function x(w, k, P, T, E) {
    if (typeof T == "string" && T !== "" || typeof T == "number") return w = w.get(P) || null, u(k, w, "" + T, E);
    if (typeof T == "object" && T !== null) {
      switch (T.$$typeof) {
        case No:
          return w = w.get(T.key === null ? P : T.key) || null, c(k, w, T, E);
        case as:
          return w = w.get(T.key === null ? P : T.key) || null, d(k, w, T, E);
        case Un:
          var N = T._init;
          return x(w, k, P, N(T._payload), E);
      }
      if (mr(T) || er(T)) return w = w.get(P) || null, p(k, w, T, E, null);
      Zo(k, T);
    }
    return null;
  }
  function S(w, k, P, T) {
    for (var E = null, N = null, A = k, I = k = 0, H = null; A !== null && I < P.length; I++) {
      A.index > I ? (H = A, A = null) : H = A.sibling;
      var B = _(w, A, P[I], T);
      if (B === null) {
        A === null && (A = H);
        break;
      }
      e && A && B.alternate === null && t(w, A), k = o(B, k, I), N === null ? E = B : N.sibling = B, N = B, A = H;
    }
    if (I === P.length) return n(w, A), Et && Mi(w, I), E;
    if (A === null) {
      for (; I < P.length; I++) A = g(w, P[I], T), A !== null && (k = o(A, k, I), N === null ? E = A : N.sibling = A, N = A);
      return Et && Mi(w, I), E;
    }
    for (A = i(w, A); I < P.length; I++) H = x(A, w, I, P[I], T), H !== null && (e && H.alternate !== null && A.delete(H.key === null ? I : H.key), k = o(H, k, I), N === null ? E = H : N.sibling = H, N = H);
    return e && A.forEach(function(W) {
      return t(w, W);
    }), Et && Mi(w, I), E;
  }
  function b(w, k, P, T) {
    var E = er(P);
    if (typeof E != "function") throw Error(F(150));
    if (P = E.call(P), P == null) throw Error(F(151));
    for (var N = E = null, A = k, I = k = 0, H = null, B = P.next(); A !== null && !B.done; I++, B = P.next()) {
      A.index > I ? (H = A, A = null) : H = A.sibling;
      var W = _(w, A, B.value, T);
      if (W === null) {
        A === null && (A = H);
        break;
      }
      e && A && W.alternate === null && t(w, A), k = o(W, k, I), N === null ? E = W : N.sibling = W, N = W, A = H;
    }
    if (B.done) return n(
      w,
      A
    ), Et && Mi(w, I), E;
    if (A === null) {
      for (; !B.done; I++, B = P.next()) B = g(w, B.value, T), B !== null && (k = o(B, k, I), N === null ? E = B : N.sibling = B, N = B);
      return Et && Mi(w, I), E;
    }
    for (A = i(w, A); !B.done; I++, B = P.next()) B = x(A, w, I, B.value, T), B !== null && (e && B.alternate !== null && A.delete(B.key === null ? I : B.key), k = o(B, k, I), N === null ? E = B : N.sibling = B, N = B);
    return e && A.forEach(function(U) {
      return t(w, U);
    }), Et && Mi(w, I), E;
  }
  function C(w, k, P, T) {
    if (typeof P == "object" && P !== null && P.type === ls && P.key === null && (P = P.props.children), typeof P == "object" && P !== null) {
      switch (P.$$typeof) {
        case No:
          t: {
            for (var E = P.key, N = k; N !== null; ) {
              if (N.key === E) {
                if (E = P.type, E === ls) {
                  if (N.tag === 7) {
                    n(w, N.sibling), k = r(N, P.props.children), k.return = w, w = k;
                    break t;
                  }
                } else if (N.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Un && ep(E) === N.type) {
                  n(w, N.sibling), k = r(N, P.props), k.ref = or(w, N, P), k.return = w, w = k;
                  break t;
                }
                n(w, N);
                break;
              } else t(w, N);
              N = N.sibling;
            }
            P.type === ls ? (k = Ii(P.props.children, w.mode, T, P.key), k.return = w, w = k) : (T = wa(P.type, P.key, P.props, null, w.mode, T), T.ref = or(w, k, P), T.return = w, w = T);
          }
          return l(w);
        case as:
          t: {
            for (N = P.key; k !== null; ) {
              if (k.key === N) if (k.tag === 4 && k.stateNode.containerInfo === P.containerInfo && k.stateNode.implementation === P.implementation) {
                n(w, k.sibling), k = r(k, P.children || []), k.return = w, w = k;
                break t;
              } else {
                n(w, k);
                break;
              }
              else t(w, k);
              k = k.sibling;
            }
            k = Eu(P, w.mode, T), k.return = w, w = k;
          }
          return l(w);
        case Un:
          return N = P._init, C(w, k, N(P._payload), T);
      }
      if (mr(P)) return S(w, k, P, T);
      if (er(P)) return b(w, k, P, T);
      Zo(w, P);
    }
    return typeof P == "string" && P !== "" || typeof P == "number" ? (P = "" + P, k !== null && k.tag === 6 ? (n(w, k.sibling), k = r(k, P), k.return = w, w = k) : (n(w, k), k = Tu(P, w.mode, T), k.return = w, w = k), l(w)) : n(w, k);
  }
  return C;
}
var Es = __(!0), v_ = __(!1), Ha = mi(null), Wa = null, gs = null, kh = null;
function Sh() {
  kh = gs = Wa = null;
}
function Ph(e) {
  var t = Ha.current;
  Tt(Ha), e._currentValue = t;
}
function kc(e, t, n) {
  for (; e !== null; ) {
    var i = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function ks(e, t) {
  Wa = e, kh = gs = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (ye = !0), e.firstContext = null);
}
function We(e) {
  var t = e._currentValue;
  if (kh !== e) if (e = { context: e, memoizedValue: t, next: null }, gs === null) {
    if (Wa === null) throw Error(F(308));
    gs = e, Wa.dependencies = { lanes: 0, firstContext: e };
  } else gs = gs.next = e;
  return t;
}
var zi = null;
function Mh(e) {
  zi === null ? zi = [e] : zi.push(e);
}
function y_(e, t, n, i) {
  var r = t.interleaved;
  return r === null ? (n.next = n, Mh(t)) : (n.next = r.next, r.next = n), t.interleaved = n, An(e, i);
}
function An(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var $n = !1;
function Ch(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function x_(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function zn(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function oi(e, t, n) {
  var i = e.updateQueue;
  if (i === null) return null;
  if (i = i.shared, _t & 2) {
    var r = i.pending;
    return r === null ? t.next = t : (t.next = r.next, r.next = t), i.pending = t, An(e, n);
  }
  return r = i.interleaved, r === null ? (t.next = t, Mh(i)) : (t.next = r.next, r.next = t), i.interleaved = t, An(e, n);
}
function ma(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, dh(e, n);
  }
}
function np(e, t) {
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
function Va(e, t, n, i) {
  var r = e.updateQueue;
  $n = !1;
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
          var S = e, b = u;
          switch (_ = t, x = n, b.tag) {
            case 1:
              if (S = b.payload, typeof S == "function") {
                g = S.call(x, g, _);
                break t;
              }
              g = S;
              break t;
            case 3:
              S.flags = S.flags & -65537 | 128;
            case 0:
              if (S = b.payload, _ = typeof S == "function" ? S.call(x, g, _) : S, _ == null) break t;
              g = Dt({}, g, _);
              break t;
            case 2:
              $n = !0;
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
    Hi |= l, e.lanes = l, e.memoizedState = g;
  }
}
function ip(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var i = e[t], r = i.callback;
    if (r !== null) {
      if (i.callback = null, i = n, typeof r != "function") throw Error(F(191, r));
      r.call(i);
    }
  }
}
var co = {}, mn = mi(co), Yr = mi(co), Kr = mi(co);
function Oi(e) {
  if (e === co) throw Error(F(174));
  return e;
}
function Lh(e, t) {
  switch (Mt(Kr, t), Mt(Yr, e), Mt(mn, co), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ic(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ic(t, e);
  }
  Tt(mn), Mt(mn, t);
}
function zs() {
  Tt(mn), Tt(Yr), Tt(Kr);
}
function w_(e) {
  Oi(Kr.current);
  var t = Oi(mn.current), n = ic(t, e.type);
  t !== n && (Mt(Yr, e), Mt(mn, n));
}
function Th(e) {
  Yr.current === e && (Tt(mn), Tt(Yr));
}
var Nt = mi(0);
function Za(e) {
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
function Eh() {
  for (var e = 0; e < ku.length; e++) ku[e]._workInProgressVersionPrimary = null;
  ku.length = 0;
}
var ga = Dn.ReactCurrentDispatcher, Su = Dn.ReactCurrentBatchConfig, Fi = 0, It = null, Zt = null, Xt = null, Ua = !1, Lr = !1, Xr = 0, F1 = 0;
function ne() {
  throw Error(F(321));
}
function zh(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!tn(e[n], t[n])) return !1;
  return !0;
}
function Oh(e, t, n, i, r, o) {
  if (Fi = o, It = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ga.current = e === null || e.memoizedState === null ? Z1 : U1, e = n(i, r), Lr) {
    o = 0;
    do {
      if (Lr = !1, Xr = 0, 25 <= o) throw Error(F(301));
      o += 1, Xt = Zt = null, t.updateQueue = null, ga.current = $1, e = n(i, r);
    } while (Lr);
  }
  if (ga.current = $a, t = Zt !== null && Zt.next !== null, Fi = 0, Xt = Zt = It = null, Ua = !1, t) throw Error(F(300));
  return e;
}
function Nh() {
  var e = Xr !== 0;
  return Xr = 0, e;
}
function hn() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return Xt === null ? It.memoizedState = Xt = e : Xt = Xt.next = e, Xt;
}
function Ve() {
  if (Zt === null) {
    var e = It.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Zt.next;
  var t = Xt === null ? It.memoizedState : Xt.next;
  if (t !== null) Xt = t, Zt = e;
  else {
    if (e === null) throw Error(F(310));
    Zt = e, e = { memoizedState: Zt.memoizedState, baseState: Zt.baseState, baseQueue: Zt.baseQueue, queue: Zt.queue, next: null }, Xt === null ? It.memoizedState = Xt = e : Xt = Xt.next = e;
  }
  return Xt;
}
function Gr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Pu(e) {
  var t = Ve(), n = t.queue;
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
      if ((Fi & p) === p) c !== null && (c = c.next = { lane: 0, action: d.action, hasEagerState: d.hasEagerState, eagerState: d.eagerState, next: null }), i = d.hasEagerState ? d.eagerState : e(i, d.action);
      else {
        var g = {
          lane: p,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null
        };
        c === null ? (u = c = g, l = i) : c = c.next = g, It.lanes |= p, Hi |= p;
      }
      d = d.next;
    } while (d !== null && d !== o);
    c === null ? l = i : c.next = u, tn(i, t.memoizedState) || (ye = !0), t.memoizedState = i, t.baseState = l, t.baseQueue = c, n.lastRenderedState = i;
  }
  if (e = n.interleaved, e !== null) {
    r = e;
    do
      o = r.lane, It.lanes |= o, Hi |= o, r = r.next;
    while (r !== e);
  } else r === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Mu(e) {
  var t = Ve(), n = t.queue;
  if (n === null) throw Error(F(311));
  n.lastRenderedReducer = e;
  var i = n.dispatch, r = n.pending, o = t.memoizedState;
  if (r !== null) {
    n.pending = null;
    var l = r = r.next;
    do
      o = e(o, l.action), l = l.next;
    while (l !== r);
    tn(o, t.memoizedState) || (ye = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, i];
}
function b_() {
}
function k_(e, t) {
  var n = It, i = Ve(), r = t(), o = !tn(i.memoizedState, r);
  if (o && (i.memoizedState = r, ye = !0), i = i.queue, Ah(M_.bind(null, n, i, e), [e]), i.getSnapshot !== t || o || Xt !== null && Xt.memoizedState.tag & 1) {
    if (n.flags |= 2048, qr(9, P_.bind(null, n, i, r, t), void 0, null), Gt === null) throw Error(F(349));
    Fi & 30 || S_(n, t, r);
  }
  return r;
}
function S_(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = It.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, It.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function P_(e, t, n, i) {
  t.value = n, t.getSnapshot = i, C_(t) && L_(e);
}
function M_(e, t, n) {
  return n(function() {
    C_(t) && L_(e);
  });
}
function C_(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !tn(e, n);
  } catch {
    return !0;
  }
}
function L_(e) {
  var t = An(e, 1);
  t !== null && Je(t, e, 1, -1);
}
function sp(e) {
  var t = hn();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Gr, lastRenderedState: e }, t.queue = e, e = e.dispatch = V1.bind(null, It, e), [t.memoizedState, e];
}
function qr(e, t, n, i) {
  return e = { tag: e, create: t, destroy: n, deps: i, next: null }, t = It.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, It.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e)), e;
}
function T_() {
  return Ve().memoizedState;
}
function _a(e, t, n, i) {
  var r = hn();
  It.flags |= e, r.memoizedState = qr(1 | t, n, void 0, i === void 0 ? null : i);
}
function pl(e, t, n, i) {
  var r = Ve();
  i = i === void 0 ? null : i;
  var o = void 0;
  if (Zt !== null) {
    var l = Zt.memoizedState;
    if (o = l.destroy, i !== null && zh(i, l.deps)) {
      r.memoizedState = qr(t, n, o, i);
      return;
    }
  }
  It.flags |= e, r.memoizedState = qr(1 | t, n, o, i);
}
function rp(e, t) {
  return _a(8390656, 8, e, t);
}
function Ah(e, t) {
  return pl(2048, 8, e, t);
}
function E_(e, t) {
  return pl(4, 2, e, t);
}
function z_(e, t) {
  return pl(4, 4, e, t);
}
function O_(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function N_(e, t, n) {
  return n = n != null ? n.concat([e]) : null, pl(4, 4, O_.bind(null, t, e), n);
}
function Ih() {
}
function A_(e, t) {
  var n = Ve();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && zh(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
}
function I_(e, t) {
  var n = Ve();
  t = t === void 0 ? null : t;
  var i = n.memoizedState;
  return i !== null && t !== null && zh(t, i[1]) ? i[0] : (e = e(), n.memoizedState = [e, t], e);
}
function D_(e, t, n) {
  return Fi & 21 ? (tn(n, t) || (n = Hg(), It.lanes |= n, Hi |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ye = !0), e.memoizedState = n);
}
function H1(e, t) {
  var n = bt;
  bt = n !== 0 && 4 > n ? n : 4, e(!0);
  var i = Su.transition;
  Su.transition = {};
  try {
    e(!1), t();
  } finally {
    bt = n, Su.transition = i;
  }
}
function R_() {
  return Ve().memoizedState;
}
function W1(e, t, n) {
  var i = li(e);
  if (n = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null }, j_(e)) B_(t, n);
  else if (n = y_(e, t, n, i), n !== null) {
    var r = he();
    Je(n, e, i, r), F_(n, t, i);
  }
}
function V1(e, t, n) {
  var i = li(e), r = { lane: i, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (j_(e)) B_(t, r);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var l = t.lastRenderedState, u = o(l, n);
      if (r.hasEagerState = !0, r.eagerState = u, tn(u, l)) {
        var c = t.interleaved;
        c === null ? (r.next = r, Mh(t)) : (r.next = c.next, c.next = r), t.interleaved = r;
        return;
      }
    } catch {
    } finally {
    }
    n = y_(e, t, r, i), n !== null && (r = he(), Je(n, e, i, r), F_(n, t, i));
  }
}
function j_(e) {
  var t = e.alternate;
  return e === It || t !== null && t === It;
}
function B_(e, t) {
  Lr = Ua = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function F_(e, t, n) {
  if (n & 4194240) {
    var i = t.lanes;
    i &= e.pendingLanes, n |= i, t.lanes = n, dh(e, n);
  }
}
var $a = { readContext: We, useCallback: ne, useContext: ne, useEffect: ne, useImperativeHandle: ne, useInsertionEffect: ne, useLayoutEffect: ne, useMemo: ne, useReducer: ne, useRef: ne, useState: ne, useDebugValue: ne, useDeferredValue: ne, useTransition: ne, useMutableSource: ne, useSyncExternalStore: ne, useId: ne, unstable_isNewReconciler: !1 }, Z1 = { readContext: We, useCallback: function(e, t) {
  return hn().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: We, useEffect: rp, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, _a(
    4194308,
    4,
    O_.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return _a(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return _a(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = hn();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var i = hn();
  return t = n !== void 0 ? n(t) : t, i.memoizedState = i.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, i.queue = e, e = e.dispatch = W1.bind(null, It, e), [i.memoizedState, e];
}, useRef: function(e) {
  var t = hn();
  return e = { current: e }, t.memoizedState = e;
}, useState: sp, useDebugValue: Ih, useDeferredValue: function(e) {
  return hn().memoizedState = e;
}, useTransition: function() {
  var e = sp(!1), t = e[0];
  return e = H1.bind(null, e[1]), hn().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var i = It, r = hn();
  if (Et) {
    if (n === void 0) throw Error(F(407));
    n = n();
  } else {
    if (n = t(), Gt === null) throw Error(F(349));
    Fi & 30 || S_(i, t, n);
  }
  r.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return r.queue = o, rp(M_.bind(
    null,
    i,
    o,
    e
  ), [e]), i.flags |= 2048, qr(9, P_.bind(null, i, o, n, t), void 0, null), n;
}, useId: function() {
  var e = hn(), t = Gt.identifierPrefix;
  if (Et) {
    var n = Ln, i = Cn;
    n = (i & ~(1 << 32 - Qe(i) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Xr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = F1++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, U1 = {
  readContext: We,
  useCallback: A_,
  useContext: We,
  useEffect: Ah,
  useImperativeHandle: N_,
  useInsertionEffect: E_,
  useLayoutEffect: z_,
  useMemo: I_,
  useReducer: Pu,
  useRef: T_,
  useState: function() {
    return Pu(Gr);
  },
  useDebugValue: Ih,
  useDeferredValue: function(e) {
    var t = Ve();
    return D_(t, Zt.memoizedState, e);
  },
  useTransition: function() {
    var e = Pu(Gr)[0], t = Ve().memoizedState;
    return [e, t];
  },
  useMutableSource: b_,
  useSyncExternalStore: k_,
  useId: R_,
  unstable_isNewReconciler: !1
}, $1 = { readContext: We, useCallback: A_, useContext: We, useEffect: Ah, useImperativeHandle: N_, useInsertionEffect: E_, useLayoutEffect: z_, useMemo: I_, useReducer: Mu, useRef: T_, useState: function() {
  return Mu(Gr);
}, useDebugValue: Ih, useDeferredValue: function(e) {
  var t = Ve();
  return Zt === null ? t.memoizedState = e : D_(t, Zt.memoizedState, e);
}, useTransition: function() {
  var e = Mu(Gr)[0], t = Ve().memoizedState;
  return [e, t];
}, useMutableSource: b_, useSyncExternalStore: k_, useId: R_, unstable_isNewReconciler: !1 };
function Xe(e, t) {
  if (e && e.defaultProps) {
    t = Dt({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Sc(e, t, n, i) {
  t = e.memoizedState, n = n(i, t), n = n == null ? t : Dt({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var ml = { isMounted: function(e) {
  return (e = e._reactInternals) ? $i(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var i = he(), r = li(e), o = zn(i, r);
  o.payload = t, n != null && (o.callback = n), t = oi(e, o, r), t !== null && (Je(t, e, r, i), ma(t, e, r));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var i = he(), r = li(e), o = zn(i, r);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = oi(e, o, r), t !== null && (Je(t, e, r, i), ma(t, e, r));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = he(), i = li(e), r = zn(n, i);
  r.tag = 2, t != null && (r.callback = t), t = oi(e, r, i), t !== null && (Je(t, e, i, n), ma(t, e, i));
} };
function op(e, t, n, i, r, o, l) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, o, l) : t.prototype && t.prototype.isPureReactComponent ? !Vr(n, i) || !Vr(r, o) : !0;
}
function H_(e, t, n) {
  var i = !1, r = di, o = t.contextType;
  return typeof o == "object" && o !== null ? o = We(o) : (r = be(t) ? ji : oe.current, i = t.contextTypes, o = (i = i != null) ? Ls(e, r) : di), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ml, e.stateNode = t, t._reactInternals = e, i && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = r, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function ap(e, t, n, i) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== e && ml.enqueueReplaceState(t, t.state, null);
}
function Pc(e, t, n, i) {
  var r = e.stateNode;
  r.props = n, r.state = e.memoizedState, r.refs = {}, Ch(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? r.context = We(o) : (o = be(t) ? ji : oe.current, r.context = Ls(e, o)), r.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Sc(e, t, o, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (t = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), t !== r.state && ml.enqueueReplaceState(r, r.state, null), Va(e, n, r, i), r.state = e.memoizedState), typeof r.componentDidMount == "function" && (e.flags |= 4194308);
}
function Os(e, t) {
  try {
    var n = "", i = t;
    do
      n += xx(i), i = i.return;
    while (i);
    var r = n;
  } catch (o) {
    r = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: r, digest: null };
}
function Cu(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Mc(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Y1 = typeof WeakMap == "function" ? WeakMap : Map;
function W_(e, t, n) {
  n = zn(-1, n), n.tag = 3, n.payload = { element: null };
  var i = t.value;
  return n.callback = function() {
    Ka || (Ka = !0, Dc = i), Mc(e, t);
  }, n;
}
function V_(e, t, n) {
  n = zn(-1, n), n.tag = 3;
  var i = e.type.getDerivedStateFromError;
  if (typeof i == "function") {
    var r = t.value;
    n.payload = function() {
      return i(r);
    }, n.callback = function() {
      Mc(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Mc(e, t), typeof i != "function" && (ai === null ? ai = /* @__PURE__ */ new Set([this]) : ai.add(this));
    var l = t.stack;
    this.componentDidCatch(t.value, { componentStack: l !== null ? l : "" });
  }), n;
}
function lp(e, t, n) {
  var i = e.pingCache;
  if (i === null) {
    i = e.pingCache = new Y1();
    var r = /* @__PURE__ */ new Set();
    i.set(t, r);
  } else r = i.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), i.set(t, r));
  r.has(n) || (r.add(n), e = aw.bind(null, e, t, n), t.then(e, e));
}
function up(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function cp(e, t, n, i, r) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = r, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = zn(-1, 1), t.tag = 2, oi(n, t, 1))), n.lanes |= 1), e);
}
var K1 = Dn.ReactCurrentOwner, ye = !1;
function ce(e, t, n, i) {
  t.child = e === null ? v_(t, null, n, i) : Es(t, e.child, n, i);
}
function hp(e, t, n, i, r) {
  n = n.render;
  var o = t.ref;
  return ks(t, r), i = Oh(e, t, n, i, o, r), n = Nh(), e !== null && !ye ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~r, In(e, t, r)) : (Et && n && xh(t), t.flags |= 1, ce(e, t, i, r), t.child);
}
function dp(e, t, n, i, r) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Vh(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Z_(e, t, o, i, r)) : (e = wa(n.type, null, i, t, t.mode, r), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & r)) {
    var l = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Vr, n(l, i) && e.ref === t.ref) return In(e, t, r);
  }
  return t.flags |= 1, e = ui(o, i), e.ref = t.ref, e.return = t, t.child = e;
}
function Z_(e, t, n, i, r) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Vr(o, i) && e.ref === t.ref) if (ye = !1, t.pendingProps = i = o, (e.lanes & r) !== 0) e.flags & 131072 && (ye = !0);
    else return t.lanes = e.lanes, In(e, t, r);
  }
  return Cc(e, t, n, i, r);
}
function U_(e, t, n) {
  var i = t.pendingProps, r = i.children, o = e !== null ? e.memoizedState : null;
  if (i.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Mt(vs, Me), Me |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Mt(vs, Me), Me |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, i = o !== null ? o.baseLanes : n, Mt(vs, Me), Me |= i;
  }
  else o !== null ? (i = o.baseLanes | n, t.memoizedState = null) : i = n, Mt(vs, Me), Me |= i;
  return ce(e, t, r, n), t.child;
}
function $_(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Cc(e, t, n, i, r) {
  var o = be(n) ? ji : oe.current;
  return o = Ls(t, o), ks(t, r), n = Oh(e, t, n, i, o, r), i = Nh(), e !== null && !ye ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~r, In(e, t, r)) : (Et && i && xh(t), t.flags |= 1, ce(e, t, n, r), t.child);
}
function fp(e, t, n, i, r) {
  if (be(n)) {
    var o = !0;
    ja(t);
  } else o = !1;
  if (ks(t, r), t.stateNode === null) va(e, t), H_(t, n, i), Pc(t, n, i, r), i = !0;
  else if (e === null) {
    var l = t.stateNode, u = t.memoizedProps;
    l.props = u;
    var c = l.context, d = n.contextType;
    typeof d == "object" && d !== null ? d = We(d) : (d = be(n) ? ji : oe.current, d = Ls(t, d));
    var p = n.getDerivedStateFromProps, g = typeof p == "function" || typeof l.getSnapshotBeforeUpdate == "function";
    g || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (u !== i || c !== d) && ap(t, l, i, d), $n = !1;
    var _ = t.memoizedState;
    l.state = _, Va(t, i, l, r), c = t.memoizedState, u !== i || _ !== c || we.current || $n ? (typeof p == "function" && (Sc(t, n, p, i), c = t.memoizedState), (u = $n || op(t, n, u, i, _, c, d)) ? (g || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), typeof l.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = c), l.props = i, l.state = c, l.context = d, i = u) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
  } else {
    l = t.stateNode, x_(e, t), u = t.memoizedProps, d = t.type === t.elementType ? u : Xe(t.type, u), l.props = d, g = t.pendingProps, _ = l.context, c = n.contextType, typeof c == "object" && c !== null ? c = We(c) : (c = be(n) ? ji : oe.current, c = Ls(t, c));
    var x = n.getDerivedStateFromProps;
    (p = typeof x == "function" || typeof l.getSnapshotBeforeUpdate == "function") || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (u !== g || _ !== c) && ap(t, l, i, c), $n = !1, _ = t.memoizedState, l.state = _, Va(t, i, l, r);
    var S = t.memoizedState;
    u !== g || _ !== S || we.current || $n ? (typeof x == "function" && (Sc(t, n, x, i), S = t.memoizedState), (d = $n || op(t, n, d, i, _, S, c) || !1) ? (p || typeof l.UNSAFE_componentWillUpdate != "function" && typeof l.componentWillUpdate != "function" || (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(i, S, c), typeof l.UNSAFE_componentWillUpdate == "function" && l.UNSAFE_componentWillUpdate(i, S, c)), typeof l.componentDidUpdate == "function" && (t.flags |= 4), typeof l.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof l.componentDidUpdate != "function" || u === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = S), l.props = i, l.state = S, l.context = c, i = d) : (typeof l.componentDidUpdate != "function" || u === e.memoizedProps && _ === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || u === e.memoizedProps && _ === e.memoizedState || (t.flags |= 1024), i = !1);
  }
  return Lc(e, t, n, i, o, r);
}
function Lc(e, t, n, i, r, o) {
  $_(e, t);
  var l = (t.flags & 128) !== 0;
  if (!i && !l) return r && Qf(t, n, !1), In(e, t, o);
  i = t.stateNode, K1.current = t;
  var u = l && typeof n.getDerivedStateFromError != "function" ? null : i.render();
  return t.flags |= 1, e !== null && l ? (t.child = Es(t, e.child, null, o), t.child = Es(t, null, u, o)) : ce(e, t, u, o), t.memoizedState = i.state, r && Qf(t, n, !0), t.child;
}
function Y_(e) {
  var t = e.stateNode;
  t.pendingContext ? qf(e, t.pendingContext, t.pendingContext !== t.context) : t.context && qf(e, t.context, !1), Lh(e, t.containerInfo);
}
function pp(e, t, n, i, r) {
  return Ts(), bh(r), t.flags |= 256, ce(e, t, n, i), t.child;
}
var Tc = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ec(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function K_(e, t, n) {
  var i = t.pendingProps, r = Nt.current, o = !1, l = (t.flags & 128) !== 0, u;
  if ((u = l) || (u = e !== null && e.memoizedState === null ? !1 : (r & 2) !== 0), u ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (r |= 1), Mt(Nt, r & 1), e === null)
    return bc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (l = i.children, e = i.fallback, o ? (i = t.mode, o = t.child, l = { mode: "hidden", children: l }, !(i & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = l) : o = vl(l, i, 0, null), e = Ii(e, i, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Ec(n), t.memoizedState = Tc, e) : Dh(t, l));
  if (r = e.memoizedState, r !== null && (u = r.dehydrated, u !== null)) return X1(e, t, l, i, u, r, n);
  if (o) {
    o = i.fallback, l = t.mode, r = e.child, u = r.sibling;
    var c = { mode: "hidden", children: i.children };
    return !(l & 1) && t.child !== r ? (i = t.child, i.childLanes = 0, i.pendingProps = c, t.deletions = null) : (i = ui(r, c), i.subtreeFlags = r.subtreeFlags & 14680064), u !== null ? o = ui(u, o) : (o = Ii(o, l, n, null), o.flags |= 2), o.return = t, i.return = t, i.sibling = o, t.child = i, i = o, o = t.child, l = e.child.memoizedState, l = l === null ? Ec(n) : { baseLanes: l.baseLanes | n, cachePool: null, transitions: l.transitions }, o.memoizedState = l, o.childLanes = e.childLanes & ~n, t.memoizedState = Tc, i;
  }
  return o = e.child, e = o.sibling, i = ui(o, { mode: "visible", children: i.children }), !(t.mode & 1) && (i.lanes = n), i.return = t, i.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = i, t.memoizedState = null, i;
}
function Dh(e, t) {
  return t = vl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Uo(e, t, n, i) {
  return i !== null && bh(i), Es(t, e.child, null, n), e = Dh(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function X1(e, t, n, i, r, o, l) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, i = Cu(Error(F(422))), Uo(e, t, l, i)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = i.fallback, r = t.mode, i = vl({ mode: "visible", children: i.children }, r, 0, null), o = Ii(o, r, l, null), o.flags |= 2, i.return = t, o.return = t, i.sibling = o, t.child = i, t.mode & 1 && Es(t, e.child, null, l), t.child.memoizedState = Ec(l), t.memoizedState = Tc, o);
  if (!(t.mode & 1)) return Uo(e, t, l, null);
  if (r.data === "$!") {
    if (i = r.nextSibling && r.nextSibling.dataset, i) var u = i.dgst;
    return i = u, o = Error(F(419)), i = Cu(o, i, void 0), Uo(e, t, l, i);
  }
  if (u = (l & e.childLanes) !== 0, ye || u) {
    if (i = Gt, i !== null) {
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
      r = r & (i.suspendedLanes | l) ? 0 : r, r !== 0 && r !== o.retryLane && (o.retryLane = r, An(e, r), Je(i, e, r, -1));
    }
    return Wh(), i = Cu(Error(F(421))), Uo(e, t, l, i);
  }
  return r.data === "$?" ? (t.flags |= 128, t.child = e.child, t = lw.bind(null, e), r._reactRetry = t, null) : (e = o.treeContext, Le = ri(r.nextSibling), Te = t, Et = !0, qe = null, e !== null && (je[Be++] = Cn, je[Be++] = Ln, je[Be++] = Bi, Cn = e.id, Ln = e.overflow, Bi = t), t = Dh(t, i.children), t.flags |= 4096, t);
}
function mp(e, t, n) {
  e.lanes |= t;
  var i = e.alternate;
  i !== null && (i.lanes |= t), kc(e.return, t, n);
}
function Lu(e, t, n, i, r) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: i, tail: n, tailMode: r } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = i, o.tail = n, o.tailMode = r);
}
function X_(e, t, n) {
  var i = t.pendingProps, r = i.revealOrder, o = i.tail;
  if (ce(e, t, i.children, n), i = Nt.current, i & 2) i = i & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) t: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && mp(e, n, t);
      else if (e.tag === 19) mp(e, n, t);
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
      for (n = t.child, r = null; n !== null; ) e = n.alternate, e !== null && Za(e) === null && (r = n), n = n.sibling;
      n = r, n === null ? (r = t.child, t.child = null) : (r = n.sibling, n.sibling = null), Lu(t, !1, r, n, o);
      break;
    case "backwards":
      for (n = null, r = t.child, t.child = null; r !== null; ) {
        if (e = r.alternate, e !== null && Za(e) === null) {
          t.child = r;
          break;
        }
        e = r.sibling, r.sibling = n, n = r, r = e;
      }
      Lu(t, !0, n, null, o);
      break;
    case "together":
      Lu(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function va(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function In(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Hi |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(F(153));
  if (t.child !== null) {
    for (e = t.child, n = ui(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = ui(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function G1(e, t, n) {
  switch (t.tag) {
    case 3:
      Y_(t), Ts();
      break;
    case 5:
      w_(t);
      break;
    case 1:
      be(t.type) && ja(t);
      break;
    case 4:
      Lh(t, t.stateNode.containerInfo);
      break;
    case 10:
      var i = t.type._context, r = t.memoizedProps.value;
      Mt(Ha, i._currentValue), i._currentValue = r;
      break;
    case 13:
      if (i = t.memoizedState, i !== null)
        return i.dehydrated !== null ? (Mt(Nt, Nt.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? K_(e, t, n) : (Mt(Nt, Nt.current & 1), e = In(e, t, n), e !== null ? e.sibling : null);
      Mt(Nt, Nt.current & 1);
      break;
    case 19:
      if (i = (n & t.childLanes) !== 0, e.flags & 128) {
        if (i) return X_(e, t, n);
        t.flags |= 128;
      }
      if (r = t.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), Mt(Nt, Nt.current), i) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, U_(e, t, n);
  }
  return In(e, t, n);
}
var G_, zc, q_, Q_;
G_ = function(e, t) {
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
zc = function() {
};
q_ = function(e, t, n, i) {
  var r = e.memoizedProps;
  if (r !== i) {
    e = t.stateNode, Oi(mn.current);
    var o = null;
    switch (n) {
      case "input":
        r = Ju(e, r), i = Ju(e, i), o = [];
        break;
      case "select":
        r = Dt({}, r, { value: void 0 }), i = Dt({}, i, { value: void 0 }), o = [];
        break;
      case "textarea":
        r = nc(e, r), i = nc(e, i), o = [];
        break;
      default:
        typeof r.onClick != "function" && typeof i.onClick == "function" && (e.onclick = Da);
    }
    sc(n, i);
    var l;
    n = null;
    for (d in r) if (!i.hasOwnProperty(d) && r.hasOwnProperty(d) && r[d] != null) if (d === "style") {
      var u = r[d];
      for (l in u) u.hasOwnProperty(l) && (n || (n = {}), n[l] = "");
    } else d !== "dangerouslySetInnerHTML" && d !== "children" && d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Dr.hasOwnProperty(d) ? o || (o = []) : (o = o || []).push(d, null));
    for (d in i) {
      var c = i[d];
      if (u = r != null ? r[d] : void 0, i.hasOwnProperty(d) && c !== u && (c != null || u != null)) if (d === "style") if (u) {
        for (l in u) !u.hasOwnProperty(l) || c && c.hasOwnProperty(l) || (n || (n = {}), n[l] = "");
        for (l in c) c.hasOwnProperty(l) && u[l] !== c[l] && (n || (n = {}), n[l] = c[l]);
      } else n || (o || (o = []), o.push(
        d,
        n
      )), n = c;
      else d === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, u = u ? u.__html : void 0, c != null && u !== c && (o = o || []).push(d, c)) : d === "children" ? typeof c != "string" && typeof c != "number" || (o = o || []).push(d, "" + c) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && (Dr.hasOwnProperty(d) ? (c != null && d === "onScroll" && Ct("scroll", e), o || u === c || (o = [])) : (o = o || []).push(d, c));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
Q_ = function(e, t, n, i) {
  n !== i && (t.flags |= 4);
};
function ar(e, t) {
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
function q1(e, t, n) {
  var i = t.pendingProps;
  switch (wh(t), t.tag) {
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
      return be(t.type) && Ra(), ie(t), null;
    case 3:
      return i = t.stateNode, zs(), Tt(we), Tt(oe), Eh(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (Vo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, qe !== null && (Bc(qe), qe = null))), zc(e, t), ie(t), null;
    case 5:
      Th(t);
      var r = Oi(Kr.current);
      if (n = t.type, e !== null && t.stateNode != null) q_(e, t, n, i, r), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!i) {
          if (t.stateNode === null) throw Error(F(166));
          return ie(t), null;
        }
        if (e = Oi(mn.current), Vo(t)) {
          i = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (i[fn] = t, i[$r] = o, e = (t.mode & 1) !== 0, n) {
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
              for (r = 0; r < _r.length; r++) Ct(_r[r], i);
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
              Sf(i, o), Ct("invalid", i);
              break;
            case "select":
              i._wrapperState = { wasMultiple: !!o.multiple }, Ct("invalid", i);
              break;
            case "textarea":
              Mf(i, o), Ct("invalid", i);
          }
          sc(n, o), r = null;
          for (var l in o) if (o.hasOwnProperty(l)) {
            var u = o[l];
            l === "children" ? typeof u == "string" ? i.textContent !== u && (o.suppressHydrationWarning !== !0 && Wo(i.textContent, u, e), r = ["children", u]) : typeof u == "number" && i.textContent !== "" + u && (o.suppressHydrationWarning !== !0 && Wo(
              i.textContent,
              u,
              e
            ), r = ["children", "" + u]) : Dr.hasOwnProperty(l) && u != null && l === "onScroll" && Ct("scroll", i);
          }
          switch (n) {
            case "input":
              Ao(i), Pf(i, o, !0);
              break;
            case "textarea":
              Ao(i), Cf(i);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (i.onclick = Da);
          }
          i = r, t.updateQueue = i, i !== null && (t.flags |= 4);
        } else {
          l = r.nodeType === 9 ? r : r.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Mg(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = l.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof i.is == "string" ? e = l.createElement(n, { is: i.is }) : (e = l.createElement(n), n === "select" && (l = e, i.multiple ? l.multiple = !0 : i.size && (l.size = i.size))) : e = l.createElementNS(e, n), e[fn] = t, e[$r] = i, G_(e, t, !1, !1), t.stateNode = e;
          t: {
            switch (l = rc(n, i), n) {
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
                for (r = 0; r < _r.length; r++) Ct(_r[r], e);
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
                Sf(e, i), r = Ju(e, i), Ct("invalid", e);
                break;
              case "option":
                r = i;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!i.multiple }, r = Dt({}, i, { value: void 0 }), Ct("invalid", e);
                break;
              case "textarea":
                Mf(e, i), r = nc(e, i), Ct("invalid", e);
                break;
              default:
                r = i;
            }
            sc(n, r), u = r;
            for (o in u) if (u.hasOwnProperty(o)) {
              var c = u[o];
              o === "style" ? Tg(e, c) : o === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && Cg(e, c)) : o === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Rr(e, c) : typeof c == "number" && Rr(e, "" + c) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Dr.hasOwnProperty(o) ? c != null && o === "onScroll" && Ct("scroll", e) : c != null && oh(e, o, c, l));
            }
            switch (n) {
              case "input":
                Ao(e), Pf(e, i, !1);
                break;
              case "textarea":
                Ao(e), Cf(e);
                break;
              case "option":
                i.value != null && e.setAttribute("value", "" + hi(i.value));
                break;
              case "select":
                e.multiple = !!i.multiple, o = i.value, o != null ? ys(e, !!i.multiple, o, !1) : i.defaultValue != null && ys(
                  e,
                  !!i.multiple,
                  i.defaultValue,
                  !0
                );
                break;
              default:
                typeof r.onClick == "function" && (e.onclick = Da);
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
      if (e && t.stateNode != null) Q_(e, t, e.memoizedProps, i);
      else {
        if (typeof i != "string" && t.stateNode === null) throw Error(F(166));
        if (n = Oi(Kr.current), Oi(mn.current), Vo(t)) {
          if (i = t.stateNode, n = t.memoizedProps, i[fn] = t, (o = i.nodeValue !== n) && (e = Te, e !== null)) switch (e.tag) {
            case 3:
              Wo(i.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Wo(i.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i), i[fn] = t, t.stateNode = i;
      }
      return ie(t), null;
    case 13:
      if (Tt(Nt), i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Et && Le !== null && t.mode & 1 && !(t.flags & 128)) g_(), Ts(), t.flags |= 98560, o = !1;
        else if (o = Vo(t), i !== null && i.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(F(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(F(317));
            o[fn] = t;
          } else Ts(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ie(t), o = !1;
        } else qe !== null && (Bc(qe), qe = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (i = i !== null, i !== (e !== null && e.memoizedState !== null) && i && (t.child.flags |= 8192, t.mode & 1 && (e === null || Nt.current & 1 ? $t === 0 && ($t = 3) : Wh())), t.updateQueue !== null && (t.flags |= 4), ie(t), null);
    case 4:
      return zs(), zc(e, t), e === null && Zr(t.stateNode.containerInfo), ie(t), null;
    case 10:
      return Ph(t.type._context), ie(t), null;
    case 17:
      return be(t.type) && Ra(), ie(t), null;
    case 19:
      if (Tt(Nt), o = t.memoizedState, o === null) return ie(t), null;
      if (i = (t.flags & 128) !== 0, l = o.rendering, l === null) if (i) ar(o, !1);
      else {
        if ($t !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (l = Za(e), l !== null) {
            for (t.flags |= 128, ar(o, !1), i = l.updateQueue, i !== null && (t.updateQueue = i, t.flags |= 4), t.subtreeFlags = 0, i = n, n = t.child; n !== null; ) o = n, e = i, o.flags &= 14680066, l = o.alternate, l === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = l.childLanes, o.lanes = l.lanes, o.child = l.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = l.memoizedProps, o.memoizedState = l.memoizedState, o.updateQueue = l.updateQueue, o.type = l.type, e = l.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Mt(Nt, Nt.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && Bt() > Ns && (t.flags |= 128, i = !0, ar(o, !1), t.lanes = 4194304);
      }
      else {
        if (!i) if (e = Za(l), e !== null) {
          if (t.flags |= 128, i = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), ar(o, !0), o.tail === null && o.tailMode === "hidden" && !l.alternate && !Et) return ie(t), null;
        } else 2 * Bt() - o.renderingStartTime > Ns && n !== 1073741824 && (t.flags |= 128, i = !0, ar(o, !1), t.lanes = 4194304);
        o.isBackwards ? (l.sibling = t.child, t.child = l) : (n = o.last, n !== null ? n.sibling = l : t.child = l, o.last = l);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Bt(), t.sibling = null, n = Nt.current, Mt(Nt, i ? n & 1 | 2 : n & 1), t) : (ie(t), null);
    case 22:
    case 23:
      return Hh(), i = t.memoizedState !== null, e !== null && e.memoizedState !== null !== i && (t.flags |= 8192), i && t.mode & 1 ? Me & 1073741824 && (ie(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ie(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(F(156, t.tag));
}
function Q1(e, t) {
  switch (wh(t), t.tag) {
    case 1:
      return be(t.type) && Ra(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return zs(), Tt(we), Tt(oe), Eh(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Th(t), null;
    case 13:
      if (Tt(Nt), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(F(340));
        Ts();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Tt(Nt), null;
    case 4:
      return zs(), null;
    case 10:
      return Ph(t.type._context), null;
    case 22:
    case 23:
      return Hh(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var $o = !1, se = !1, J1 = typeof WeakSet == "function" ? WeakSet : Set, Z = null;
function _s(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (i) {
    Rt(e, t, i);
  }
  else n.current = null;
}
function Oc(e, t, n) {
  try {
    n();
  } catch (i) {
    Rt(e, t, i);
  }
}
var gp = !1;
function tw(e, t) {
  if (mc = Na, e = i_(), yh(e)) {
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
  for (gc = { focusedElem: e, selectionRange: n }, Na = !1, Z = t; Z !== null; ) if (t = Z, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, Z = e;
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
            var b = S.memoizedProps, C = S.memoizedState, w = t.stateNode, k = w.getSnapshotBeforeUpdate(t.elementType === t.type ? b : Xe(t.type, b), C);
            w.__reactInternalSnapshotBeforeUpdate = k;
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
  return S = gp, gp = !1, S;
}
function Tr(e, t, n) {
  var i = t.updateQueue;
  if (i = i !== null ? i.lastEffect : null, i !== null) {
    var r = i = i.next;
    do {
      if ((r.tag & e) === e) {
        var o = r.destroy;
        r.destroy = void 0, o !== void 0 && Oc(t, n, o);
      }
      r = r.next;
    } while (r !== i);
  }
}
function gl(e, t) {
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
function Nc(e) {
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
function J_(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, J_(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[fn], delete t[$r], delete t[yc], delete t[D1], delete t[R1])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function tv(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function _p(e) {
  t: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || tv(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue t;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ac(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Da));
  else if (i !== 4 && (e = e.child, e !== null)) for (Ac(e, t, n), e = e.sibling; e !== null; ) Ac(e, t, n), e = e.sibling;
}
function Ic(e, t, n) {
  var i = e.tag;
  if (i === 5 || i === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (i !== 4 && (e = e.child, e !== null)) for (Ic(e, t, n), e = e.sibling; e !== null; ) Ic(e, t, n), e = e.sibling;
}
var Jt = null, Ge = !1;
function Wn(e, t, n) {
  for (n = n.child; n !== null; ) ev(e, t, n), n = n.sibling;
}
function ev(e, t, n) {
  if (pn && typeof pn.onCommitFiberUnmount == "function") try {
    pn.onCommitFiberUnmount(ll, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      se || _s(n, t);
    case 6:
      var i = Jt, r = Ge;
      Jt = null, Wn(e, t, n), Jt = i, Ge = r, Jt !== null && (Ge ? (e = Jt, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Jt.removeChild(n.stateNode));
      break;
    case 18:
      Jt !== null && (Ge ? (e = Jt, n = n.stateNode, e.nodeType === 8 ? wu(e.parentNode, n) : e.nodeType === 1 && wu(e, n), Hr(e)) : wu(Jt, n.stateNode));
      break;
    case 4:
      i = Jt, r = Ge, Jt = n.stateNode.containerInfo, Ge = !0, Wn(e, t, n), Jt = i, Ge = r;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!se && (i = n.updateQueue, i !== null && (i = i.lastEffect, i !== null))) {
        r = i = i.next;
        do {
          var o = r, l = o.destroy;
          o = o.tag, l !== void 0 && (o & 2 || o & 4) && Oc(n, t, l), r = r.next;
        } while (r !== i);
      }
      Wn(e, t, n);
      break;
    case 1:
      if (!se && (_s(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function")) try {
        i.props = n.memoizedProps, i.state = n.memoizedState, i.componentWillUnmount();
      } catch (u) {
        Rt(n, t, u);
      }
      Wn(e, t, n);
      break;
    case 21:
      Wn(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (se = (i = se) || n.memoizedState !== null, Wn(e, t, n), se = i) : Wn(e, t, n);
      break;
    default:
      Wn(e, t, n);
  }
}
function vp(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new J1()), t.forEach(function(i) {
      var r = uw.bind(null, e, i);
      n.has(i) || (n.add(i), i.then(r, r));
    });
  }
}
function Ke(e, t) {
  var n = t.deletions;
  if (n !== null) for (var i = 0; i < n.length; i++) {
    var r = n[i];
    try {
      var o = e, l = t, u = l;
      t: for (; u !== null; ) {
        switch (u.tag) {
          case 5:
            Jt = u.stateNode, Ge = !1;
            break t;
          case 3:
            Jt = u.stateNode.containerInfo, Ge = !0;
            break t;
          case 4:
            Jt = u.stateNode.containerInfo, Ge = !0;
            break t;
        }
        u = u.return;
      }
      if (Jt === null) throw Error(F(160));
      ev(o, l, r), Jt = null, Ge = !1;
      var c = r.alternate;
      c !== null && (c.return = null), r.return = null;
    } catch (d) {
      Rt(r, t, d);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) nv(t, e), t = t.sibling;
}
function nv(e, t) {
  var n = e.alternate, i = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Ke(t, e), ln(e), i & 4) {
        try {
          Tr(3, e, e.return), gl(3, e);
        } catch (b) {
          Rt(e, e.return, b);
        }
        try {
          Tr(5, e, e.return);
        } catch (b) {
          Rt(e, e.return, b);
        }
      }
      break;
    case 1:
      Ke(t, e), ln(e), i & 512 && n !== null && _s(n, n.return);
      break;
    case 5:
      if (Ke(t, e), ln(e), i & 512 && n !== null && _s(n, n.return), e.flags & 32) {
        var r = e.stateNode;
        try {
          Rr(r, "");
        } catch (b) {
          Rt(e, e.return, b);
        }
      }
      if (i & 4 && (r = e.stateNode, r != null)) {
        var o = e.memoizedProps, l = n !== null ? n.memoizedProps : o, u = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          u === "input" && o.type === "radio" && o.name != null && Sg(r, o), rc(u, l);
          var d = rc(u, o);
          for (l = 0; l < c.length; l += 2) {
            var p = c[l], g = c[l + 1];
            p === "style" ? Tg(r, g) : p === "dangerouslySetInnerHTML" ? Cg(r, g) : p === "children" ? Rr(r, g) : oh(r, p, g, d);
          }
          switch (u) {
            case "input":
              tc(r, o);
              break;
            case "textarea":
              Pg(r, o);
              break;
            case "select":
              var _ = r._wrapperState.wasMultiple;
              r._wrapperState.wasMultiple = !!o.multiple;
              var x = o.value;
              x != null ? ys(r, !!o.multiple, x, !1) : _ !== !!o.multiple && (o.defaultValue != null ? ys(
                r,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : ys(r, !!o.multiple, o.multiple ? [] : "", !1));
          }
          r[$r] = o;
        } catch (b) {
          Rt(e, e.return, b);
        }
      }
      break;
    case 6:
      if (Ke(t, e), ln(e), i & 4) {
        if (e.stateNode === null) throw Error(F(162));
        r = e.stateNode, o = e.memoizedProps;
        try {
          r.nodeValue = o;
        } catch (b) {
          Rt(e, e.return, b);
        }
      }
      break;
    case 3:
      if (Ke(t, e), ln(e), i & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Hr(t.containerInfo);
      } catch (b) {
        Rt(e, e.return, b);
      }
      break;
    case 4:
      Ke(t, e), ln(e);
      break;
    case 13:
      Ke(t, e), ln(e), r = e.child, r.flags & 8192 && (o = r.memoizedState !== null, r.stateNode.isHidden = o, !o || r.alternate !== null && r.alternate.memoizedState !== null || (Bh = Bt())), i & 4 && vp(e);
      break;
    case 22:
      if (p = n !== null && n.memoizedState !== null, e.mode & 1 ? (se = (d = se) || p, Ke(t, e), se = d) : Ke(t, e), ln(e), i & 8192) {
        if (d = e.memoizedState !== null, (e.stateNode.isHidden = d) && !p && e.mode & 1) for (Z = e, p = e.child; p !== null; ) {
          for (g = Z = p; Z !== null; ) {
            switch (_ = Z, x = _.child, _.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Tr(4, _, _.return);
                break;
              case 1:
                _s(_, _.return);
                var S = _.stateNode;
                if (typeof S.componentWillUnmount == "function") {
                  i = _, n = _.return;
                  try {
                    t = i, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount();
                  } catch (b) {
                    Rt(i, n, b);
                  }
                }
                break;
              case 5:
                _s(_, _.return);
                break;
              case 22:
                if (_.memoizedState !== null) {
                  xp(g);
                  continue;
                }
            }
            x !== null ? (x.return = _, Z = x) : xp(g);
          }
          p = p.sibling;
        }
        t: for (p = null, g = e; ; ) {
          if (g.tag === 5) {
            if (p === null) {
              p = g;
              try {
                r = g.stateNode, d ? (o = r.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (u = g.stateNode, c = g.memoizedProps.style, l = c != null && c.hasOwnProperty("display") ? c.display : null, u.style.display = Lg("display", l));
              } catch (b) {
                Rt(e, e.return, b);
              }
            }
          } else if (g.tag === 6) {
            if (p === null) try {
              g.stateNode.nodeValue = d ? "" : g.memoizedProps;
            } catch (b) {
              Rt(e, e.return, b);
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
      Ke(t, e), ln(e), i & 4 && vp(e);
      break;
    case 21:
      break;
    default:
      Ke(
        t,
        e
      ), ln(e);
  }
}
function ln(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      t: {
        for (var n = e.return; n !== null; ) {
          if (tv(n)) {
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
          i.flags & 32 && (Rr(r, ""), i.flags &= -33);
          var o = _p(e);
          Ic(e, o, r);
          break;
        case 3:
        case 4:
          var l = i.stateNode.containerInfo, u = _p(e);
          Ac(e, u, l);
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
function ew(e, t, n) {
  Z = e, iv(e);
}
function iv(e, t, n) {
  for (var i = (e.mode & 1) !== 0; Z !== null; ) {
    var r = Z, o = r.child;
    if (r.tag === 22 && i) {
      var l = r.memoizedState !== null || $o;
      if (!l) {
        var u = r.alternate, c = u !== null && u.memoizedState !== null || se;
        u = $o;
        var d = se;
        if ($o = l, (se = c) && !d) for (Z = r; Z !== null; ) l = Z, c = l.child, l.tag === 22 && l.memoizedState !== null ? wp(r) : c !== null ? (c.return = l, Z = c) : wp(r);
        for (; o !== null; ) Z = o, iv(o), o = o.sibling;
        Z = r, $o = u, se = d;
      }
      yp(e);
    } else r.subtreeFlags & 8772 && o !== null ? (o.return = r, Z = o) : yp(e);
  }
}
function yp(e) {
  for (; Z !== null; ) {
    var t = Z;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            se || gl(5, t);
            break;
          case 1:
            var i = t.stateNode;
            if (t.flags & 4 && !se) if (n === null) i.componentDidMount();
            else {
              var r = t.elementType === t.type ? n.memoizedProps : Xe(t.type, n.memoizedProps);
              i.componentDidUpdate(r, n.memoizedState, i.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && ip(t, o, i);
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
              ip(t, l, n);
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
                  g !== null && Hr(g);
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
        se || t.flags & 512 && Nc(t);
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
function xp(e) {
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
function wp(e) {
  for (; Z !== null; ) {
    var t = Z;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            gl(4, t);
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
            Nc(t);
          } catch (c) {
            Rt(t, o, c);
          }
          break;
        case 5:
          var l = t.return;
          try {
            Nc(t);
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
var nw = Math.ceil, Ya = Dn.ReactCurrentDispatcher, Rh = Dn.ReactCurrentOwner, He = Dn.ReactCurrentBatchConfig, _t = 0, Gt = null, Vt = null, te = 0, Me = 0, vs = mi(0), $t = 0, Qr = null, Hi = 0, _l = 0, jh = 0, Er = null, _e = null, Bh = 0, Ns = 1 / 0, Sn = null, Ka = !1, Dc = null, ai = null, Yo = !1, Gn = null, Xa = 0, zr = 0, Rc = null, ya = -1, xa = 0;
function he() {
  return _t & 6 ? Bt() : ya !== -1 ? ya : ya = Bt();
}
function li(e) {
  return e.mode & 1 ? _t & 2 && te !== 0 ? te & -te : B1.transition !== null ? (xa === 0 && (xa = Hg()), xa) : (e = bt, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Kg(e.type)), e) : 1;
}
function Je(e, t, n, i) {
  if (50 < zr) throw zr = 0, Rc = null, Error(F(185));
  ao(e, n, i), (!(_t & 2) || e !== Gt) && (e === Gt && (!(_t & 2) && (_l |= n), $t === 4 && Kn(e, te)), ke(e, i), n === 1 && _t === 0 && !(t.mode & 1) && (Ns = Bt() + 500, fl && gi()));
}
function ke(e, t) {
  var n = e.callbackNode;
  Bx(e, t);
  var i = Oa(e, e === Gt ? te : 0);
  if (i === 0) n !== null && Ef(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = i & -i, e.callbackPriority !== t) {
    if (n != null && Ef(n), t === 1) e.tag === 0 ? j1(bp.bind(null, e)) : f_(bp.bind(null, e)), A1(function() {
      !(_t & 6) && gi();
    }), n = null;
    else {
      switch (Wg(i)) {
        case 1:
          n = hh;
          break;
        case 4:
          n = Bg;
          break;
        case 16:
          n = za;
          break;
        case 536870912:
          n = Fg;
          break;
        default:
          n = za;
      }
      n = hv(n, sv.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function sv(e, t) {
  if (ya = -1, xa = 0, _t & 6) throw Error(F(327));
  var n = e.callbackNode;
  if (Ss() && e.callbackNode !== n) return null;
  var i = Oa(e, e === Gt ? te : 0);
  if (i === 0) return null;
  if (i & 30 || i & e.expiredLanes || t) t = Ga(e, i);
  else {
    t = i;
    var r = _t;
    _t |= 2;
    var o = ov();
    (Gt !== e || te !== t) && (Sn = null, Ns = Bt() + 500, Ai(e, t));
    do
      try {
        rw();
        break;
      } catch (u) {
        rv(e, u);
      }
    while (!0);
    Sh(), Ya.current = o, _t = r, Vt !== null ? t = 0 : (Gt = null, te = 0, t = $t);
  }
  if (t !== 0) {
    if (t === 2 && (r = cc(e), r !== 0 && (i = r, t = jc(e, r))), t === 1) throw n = Qr, Ai(e, 0), Kn(e, i), ke(e, Bt()), n;
    if (t === 6) Kn(e, i);
    else {
      if (r = e.current.alternate, !(i & 30) && !iw(r) && (t = Ga(e, i), t === 2 && (o = cc(e), o !== 0 && (i = o, t = jc(e, o))), t === 1)) throw n = Qr, Ai(e, 0), Kn(e, i), ke(e, Bt()), n;
      switch (e.finishedWork = r, e.finishedLanes = i, t) {
        case 0:
        case 1:
          throw Error(F(345));
        case 2:
          Ci(e, _e, Sn);
          break;
        case 3:
          if (Kn(e, i), (i & 130023424) === i && (t = Bh + 500 - Bt(), 10 < t)) {
            if (Oa(e, 0) !== 0) break;
            if (r = e.suspendedLanes, (r & i) !== i) {
              he(), e.pingedLanes |= e.suspendedLanes & r;
              break;
            }
            e.timeoutHandle = vc(Ci.bind(null, e, _e, Sn), t);
            break;
          }
          Ci(e, _e, Sn);
          break;
        case 4:
          if (Kn(e, i), (i & 4194240) === i) break;
          for (t = e.eventTimes, r = -1; 0 < i; ) {
            var l = 31 - Qe(i);
            o = 1 << l, l = t[l], l > r && (r = l), i &= ~o;
          }
          if (i = r, i = Bt() - i, i = (120 > i ? 120 : 480 > i ? 480 : 1080 > i ? 1080 : 1920 > i ? 1920 : 3e3 > i ? 3e3 : 4320 > i ? 4320 : 1960 * nw(i / 1960)) - i, 10 < i) {
            e.timeoutHandle = vc(Ci.bind(null, e, _e, Sn), i);
            break;
          }
          Ci(e, _e, Sn);
          break;
        case 5:
          Ci(e, _e, Sn);
          break;
        default:
          throw Error(F(329));
      }
    }
  }
  return ke(e, Bt()), e.callbackNode === n ? sv.bind(null, e) : null;
}
function jc(e, t) {
  var n = Er;
  return e.current.memoizedState.isDehydrated && (Ai(e, t).flags |= 256), e = Ga(e, t), e !== 2 && (t = _e, _e = n, t !== null && Bc(t)), e;
}
function Bc(e) {
  _e === null ? _e = e : _e.push.apply(_e, e);
}
function iw(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var i = 0; i < n.length; i++) {
        var r = n[i], o = r.getSnapshot;
        r = r.value;
        try {
          if (!tn(o(), r)) return !1;
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
  for (t &= ~jh, t &= ~_l, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Qe(t), i = 1 << n;
    e[n] = -1, t &= ~i;
  }
}
function bp(e) {
  if (_t & 6) throw Error(F(327));
  Ss();
  var t = Oa(e, 0);
  if (!(t & 1)) return ke(e, Bt()), null;
  var n = Ga(e, t);
  if (e.tag !== 0 && n === 2) {
    var i = cc(e);
    i !== 0 && (t = i, n = jc(e, i));
  }
  if (n === 1) throw n = Qr, Ai(e, 0), Kn(e, t), ke(e, Bt()), n;
  if (n === 6) throw Error(F(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ci(e, _e, Sn), ke(e, Bt()), null;
}
function Fh(e, t) {
  var n = _t;
  _t |= 1;
  try {
    return e(t);
  } finally {
    _t = n, _t === 0 && (Ns = Bt() + 500, fl && gi());
  }
}
function Wi(e) {
  Gn !== null && Gn.tag === 0 && !(_t & 6) && Ss();
  var t = _t;
  _t |= 1;
  var n = He.transition, i = bt;
  try {
    if (He.transition = null, bt = 1, e) return e();
  } finally {
    bt = i, He.transition = n, _t = t, !(_t & 6) && gi();
  }
}
function Hh() {
  Me = vs.current, Tt(vs);
}
function Ai(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, N1(n)), Vt !== null) for (n = Vt.return; n !== null; ) {
    var i = n;
    switch (wh(i), i.tag) {
      case 1:
        i = i.type.childContextTypes, i != null && Ra();
        break;
      case 3:
        zs(), Tt(we), Tt(oe), Eh();
        break;
      case 5:
        Th(i);
        break;
      case 4:
        zs();
        break;
      case 13:
        Tt(Nt);
        break;
      case 19:
        Tt(Nt);
        break;
      case 10:
        Ph(i.type._context);
        break;
      case 22:
      case 23:
        Hh();
    }
    n = n.return;
  }
  if (Gt = e, Vt = e = ui(e.current, null), te = Me = t, $t = 0, Qr = null, jh = _l = Hi = 0, _e = Er = null, zi !== null) {
    for (t = 0; t < zi.length; t++) if (n = zi[t], i = n.interleaved, i !== null) {
      n.interleaved = null;
      var r = i.next, o = n.pending;
      if (o !== null) {
        var l = o.next;
        o.next = r, i.next = l;
      }
      n.pending = i;
    }
    zi = null;
  }
  return e;
}
function rv(e, t) {
  do {
    var n = Vt;
    try {
      if (Sh(), ga.current = $a, Ua) {
        for (var i = It.memoizedState; i !== null; ) {
          var r = i.queue;
          r !== null && (r.pending = null), i = i.next;
        }
        Ua = !1;
      }
      if (Fi = 0, Xt = Zt = It = null, Lr = !1, Xr = 0, Rh.current = null, n === null || n.return === null) {
        $t = 1, Qr = t, Vt = null;
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
          var x = up(l);
          if (x !== null) {
            x.flags &= -257, cp(x, l, u, o, t), x.mode & 1 && lp(o, d, t), t = x, c = d;
            var S = t.updateQueue;
            if (S === null) {
              var b = /* @__PURE__ */ new Set();
              b.add(c), t.updateQueue = b;
            } else S.add(c);
            break t;
          } else {
            if (!(t & 1)) {
              lp(o, d, t), Wh();
              break t;
            }
            c = Error(F(426));
          }
        } else if (Et && u.mode & 1) {
          var C = up(l);
          if (C !== null) {
            !(C.flags & 65536) && (C.flags |= 256), cp(C, l, u, o, t), bh(Os(c, u));
            break t;
          }
        }
        o = c = Os(c, u), $t !== 4 && ($t = 2), Er === null ? Er = [o] : Er.push(o), o = l;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var w = W_(o, c, t);
              np(o, w);
              break t;
            case 1:
              u = c;
              var k = o.type, P = o.stateNode;
              if (!(o.flags & 128) && (typeof k.getDerivedStateFromError == "function" || P !== null && typeof P.componentDidCatch == "function" && (ai === null || !ai.has(P)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var T = V_(o, u, t);
                np(o, T);
                break t;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      lv(n);
    } catch (E) {
      t = E, Vt === n && n !== null && (Vt = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function ov() {
  var e = Ya.current;
  return Ya.current = $a, e === null ? $a : e;
}
function Wh() {
  ($t === 0 || $t === 3 || $t === 2) && ($t = 4), Gt === null || !(Hi & 268435455) && !(_l & 268435455) || Kn(Gt, te);
}
function Ga(e, t) {
  var n = _t;
  _t |= 2;
  var i = ov();
  (Gt !== e || te !== t) && (Sn = null, Ai(e, t));
  do
    try {
      sw();
      break;
    } catch (r) {
      rv(e, r);
    }
  while (!0);
  if (Sh(), _t = n, Ya.current = i, Vt !== null) throw Error(F(261));
  return Gt = null, te = 0, $t;
}
function sw() {
  for (; Vt !== null; ) av(Vt);
}
function rw() {
  for (; Vt !== null && !Ex(); ) av(Vt);
}
function av(e) {
  var t = cv(e.alternate, e, Me);
  e.memoizedProps = e.pendingProps, t === null ? lv(e) : Vt = t, Rh.current = null;
}
function lv(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Q1(n, t), n !== null) {
        n.flags &= 32767, Vt = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        $t = 6, Vt = null;
        return;
      }
    } else if (n = q1(n, t, Me), n !== null) {
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
function Ci(e, t, n) {
  var i = bt, r = He.transition;
  try {
    He.transition = null, bt = 1, ow(e, t, n, i);
  } finally {
    He.transition = r, bt = i;
  }
  return null;
}
function ow(e, t, n, i) {
  do
    Ss();
  while (Gn !== null);
  if (_t & 6) throw Error(F(327));
  n = e.finishedWork;
  var r = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(F(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (Fx(e, o), e === Gt && (Vt = Gt = null, te = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Yo || (Yo = !0, hv(za, function() {
    return Ss(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = He.transition, He.transition = null;
    var l = bt;
    bt = 1;
    var u = _t;
    _t |= 4, Rh.current = null, tw(e, n), nv(n, e), M1(gc), Na = !!mc, gc = mc = null, e.current = n, ew(n), zx(), _t = u, bt = l, He.transition = o;
  } else e.current = n;
  if (Yo && (Yo = !1, Gn = e, Xa = r), o = e.pendingLanes, o === 0 && (ai = null), Ax(n.stateNode), ke(e, Bt()), t !== null) for (i = e.onRecoverableError, n = 0; n < t.length; n++) r = t[n], i(r.value, { componentStack: r.stack, digest: r.digest });
  if (Ka) throw Ka = !1, e = Dc, Dc = null, e;
  return Xa & 1 && e.tag !== 0 && Ss(), o = e.pendingLanes, o & 1 ? e === Rc ? zr++ : (zr = 0, Rc = e) : zr = 0, gi(), null;
}
function Ss() {
  if (Gn !== null) {
    var e = Wg(Xa), t = He.transition, n = bt;
    try {
      if (He.transition = null, bt = 16 > e ? 16 : e, Gn === null) var i = !1;
      else {
        if (e = Gn, Gn = null, Xa = 0, _t & 6) throw Error(F(331));
        var r = _t;
        for (_t |= 4, Z = e.current; Z !== null; ) {
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
                      Tr(8, p, o);
                  }
                  var g = p.child;
                  if (g !== null) g.return = p, Z = g;
                  else for (; Z !== null; ) {
                    p = Z;
                    var _ = p.sibling, x = p.return;
                    if (J_(p), p === d) {
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
                var b = S.child;
                if (b !== null) {
                  S.child = null;
                  do {
                    var C = b.sibling;
                    b.sibling = null, b = C;
                  } while (b !== null);
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
                Tr(9, o, o.return);
            }
            var w = o.sibling;
            if (w !== null) {
              w.return = o.return, Z = w;
              break t;
            }
            Z = o.return;
          }
        }
        var k = e.current;
        for (Z = k; Z !== null; ) {
          l = Z;
          var P = l.child;
          if (l.subtreeFlags & 2064 && P !== null) P.return = l, Z = P;
          else t: for (l = k; Z !== null; ) {
            if (u = Z, u.flags & 2048) try {
              switch (u.tag) {
                case 0:
                case 11:
                case 15:
                  gl(9, u);
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
        if (_t = r, gi(), pn && typeof pn.onPostCommitFiberRoot == "function") try {
          pn.onPostCommitFiberRoot(ll, e);
        } catch {
        }
        i = !0;
      }
      return i;
    } finally {
      bt = n, He.transition = t;
    }
  }
  return !1;
}
function kp(e, t, n) {
  t = Os(n, t), t = W_(e, t, 1), e = oi(e, t, 1), t = he(), e !== null && (ao(e, 1, t), ke(e, t));
}
function Rt(e, t, n) {
  if (e.tag === 3) kp(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      kp(t, e, n);
      break;
    } else if (t.tag === 1) {
      var i = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (ai === null || !ai.has(i))) {
        e = Os(n, e), e = V_(t, e, 1), t = oi(t, e, 1), e = he(), t !== null && (ao(t, 1, e), ke(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function aw(e, t, n) {
  var i = e.pingCache;
  i !== null && i.delete(t), t = he(), e.pingedLanes |= e.suspendedLanes & n, Gt === e && (te & n) === n && ($t === 4 || $t === 3 && (te & 130023424) === te && 500 > Bt() - Bh ? Ai(e, 0) : jh |= n), ke(e, t);
}
function uv(e, t) {
  t === 0 && (e.mode & 1 ? (t = Ro, Ro <<= 1, !(Ro & 130023424) && (Ro = 4194304)) : t = 1);
  var n = he();
  e = An(e, t), e !== null && (ao(e, t, n), ke(e, n));
}
function lw(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), uv(e, n);
}
function uw(e, t) {
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
  i !== null && i.delete(t), uv(e, n);
}
var cv;
cv = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || we.current) ye = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return ye = !1, G1(e, t, n);
    ye = !!(e.flags & 131072);
  }
  else ye = !1, Et && t.flags & 1048576 && p_(t, Fa, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var i = t.type;
      va(e, t), e = t.pendingProps;
      var r = Ls(t, oe.current);
      ks(t, n), r = Oh(null, t, i, e, r, n);
      var o = Nh();
      return t.flags |= 1, typeof r == "object" && r !== null && typeof r.render == "function" && r.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, be(i) ? (o = !0, ja(t)) : o = !1, t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, Ch(t), r.updater = ml, t.stateNode = r, r._reactInternals = t, Pc(t, i, e, n), t = Lc(null, t, i, !0, o, n)) : (t.tag = 0, Et && o && xh(t), ce(null, t, r, n), t = t.child), t;
    case 16:
      i = t.elementType;
      t: {
        switch (va(e, t), e = t.pendingProps, r = i._init, i = r(i._payload), t.type = i, r = t.tag = hw(i), e = Xe(i, e), r) {
          case 0:
            t = Cc(null, t, i, e, n);
            break t;
          case 1:
            t = fp(null, t, i, e, n);
            break t;
          case 11:
            t = hp(null, t, i, e, n);
            break t;
          case 14:
            t = dp(null, t, i, Xe(i.type, e), n);
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
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Xe(i, r), Cc(e, t, i, r, n);
    case 1:
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Xe(i, r), fp(e, t, i, r, n);
    case 3:
      t: {
        if (Y_(t), e === null) throw Error(F(387));
        i = t.pendingProps, o = t.memoizedState, r = o.element, x_(e, t), Va(t, i, null, n);
        var l = t.memoizedState;
        if (i = l.element, o.isDehydrated) if (o = { element: i, isDehydrated: !1, cache: l.cache, pendingSuspenseBoundaries: l.pendingSuspenseBoundaries, transitions: l.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          r = Os(Error(F(423)), t), t = pp(e, t, i, n, r);
          break t;
        } else if (i !== r) {
          r = Os(Error(F(424)), t), t = pp(e, t, i, n, r);
          break t;
        } else for (Le = ri(t.stateNode.containerInfo.firstChild), Te = t, Et = !0, qe = null, n = v_(t, null, i, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Ts(), i === r) {
            t = In(e, t, n);
            break t;
          }
          ce(e, t, i, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return w_(t), e === null && bc(t), i = t.type, r = t.pendingProps, o = e !== null ? e.memoizedProps : null, l = r.children, _c(i, r) ? l = null : o !== null && _c(i, o) && (t.flags |= 32), $_(e, t), ce(e, t, l, n), t.child;
    case 6:
      return e === null && bc(t), null;
    case 13:
      return K_(e, t, n);
    case 4:
      return Lh(t, t.stateNode.containerInfo), i = t.pendingProps, e === null ? t.child = Es(t, null, i, n) : ce(e, t, i, n), t.child;
    case 11:
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Xe(i, r), hp(e, t, i, r, n);
    case 7:
      return ce(e, t, t.pendingProps, n), t.child;
    case 8:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 10:
      t: {
        if (i = t.type._context, r = t.pendingProps, o = t.memoizedProps, l = r.value, Mt(Ha, i._currentValue), i._currentValue = l, o !== null) if (tn(o.value, l)) {
          if (o.children === r.children && !we.current) {
            t = In(e, t, n);
            break t;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var u = o.dependencies;
          if (u !== null) {
            l = o.child;
            for (var c = u.firstContext; c !== null; ) {
              if (c.context === i) {
                if (o.tag === 1) {
                  c = zn(-1, n & -n), c.tag = 2;
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
        ce(e, t, r.children, n), t = t.child;
      }
      return t;
    case 9:
      return r = t.type, i = t.pendingProps.children, ks(t, n), r = We(r), i = i(r), t.flags |= 1, ce(e, t, i, n), t.child;
    case 14:
      return i = t.type, r = Xe(i, t.pendingProps), r = Xe(i.type, r), dp(e, t, i, r, n);
    case 15:
      return Z_(e, t, t.type, t.pendingProps, n);
    case 17:
      return i = t.type, r = t.pendingProps, r = t.elementType === i ? r : Xe(i, r), va(e, t), t.tag = 1, be(i) ? (e = !0, ja(t)) : e = !1, ks(t, n), H_(t, i, r), Pc(t, i, r, n), Lc(null, t, i, !0, e, n);
    case 19:
      return X_(e, t, n);
    case 22:
      return U_(e, t, n);
  }
  throw Error(F(156, t.tag));
};
function hv(e, t) {
  return jg(e, t);
}
function cw(e, t, n, i) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Fe(e, t, n, i) {
  return new cw(e, t, n, i);
}
function Vh(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function hw(e) {
  if (typeof e == "function") return Vh(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === lh) return 11;
    if (e === uh) return 14;
  }
  return 2;
}
function ui(e, t) {
  var n = e.alternate;
  return n === null ? (n = Fe(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function wa(e, t, n, i, r, o) {
  var l = 2;
  if (i = e, typeof e == "function") Vh(e) && (l = 1);
  else if (typeof e == "string") l = 5;
  else t: switch (e) {
    case ls:
      return Ii(n.children, r, o, t);
    case ah:
      l = 8, r |= 8;
      break;
    case Xu:
      return e = Fe(12, n, t, r | 2), e.elementType = Xu, e.lanes = o, e;
    case Gu:
      return e = Fe(13, n, t, r), e.elementType = Gu, e.lanes = o, e;
    case qu:
      return e = Fe(19, n, t, r), e.elementType = qu, e.lanes = o, e;
    case wg:
      return vl(n, r, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case yg:
          l = 10;
          break t;
        case xg:
          l = 9;
          break t;
        case lh:
          l = 11;
          break t;
        case uh:
          l = 14;
          break t;
        case Un:
          l = 16, i = null;
          break t;
      }
      throw Error(F(130, e == null ? e : typeof e, ""));
  }
  return t = Fe(l, n, t, r), t.elementType = e, t.type = i, t.lanes = o, t;
}
function Ii(e, t, n, i) {
  return e = Fe(7, e, i, t), e.lanes = n, e;
}
function vl(e, t, n, i) {
  return e = Fe(22, e, i, t), e.elementType = wg, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Tu(e, t, n) {
  return e = Fe(6, e, null, t), e.lanes = n, e;
}
function Eu(e, t, n) {
  return t = Fe(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function dw(e, t, n, i, r) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = cu(0), this.expirationTimes = cu(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = cu(0), this.identifierPrefix = i, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null;
}
function Zh(e, t, n, i, r, o, l, u, c) {
  return e = new dw(e, t, n, u, c), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Fe(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: i, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ch(o), e;
}
function fw(e, t, n) {
  var i = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: as, key: i == null ? null : "" + i, children: e, containerInfo: t, implementation: n };
}
function dv(e) {
  if (!e) return di;
  e = e._reactInternals;
  t: {
    if ($i(e) !== e || e.tag !== 1) throw Error(F(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break t;
        case 1:
          if (be(t.type)) {
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
    if (be(n)) return d_(e, n, t);
  }
  return t;
}
function fv(e, t, n, i, r, o, l, u, c) {
  return e = Zh(n, i, !0, e, r, o, l, u, c), e.context = dv(null), n = e.current, i = he(), r = li(n), o = zn(i, r), o.callback = t ?? null, oi(n, o, r), e.current.lanes = r, ao(e, r, i), ke(e, i), e;
}
function yl(e, t, n, i) {
  var r = t.current, o = he(), l = li(r);
  return n = dv(n), t.context === null ? t.context = n : t.pendingContext = n, t = zn(o, l), t.payload = { element: e }, i = i === void 0 ? null : i, i !== null && (t.callback = i), e = oi(r, t, l), e !== null && (Je(e, r, l, o), ma(e, r, l)), l;
}
function qa(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Sp(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Uh(e, t) {
  Sp(e, t), (e = e.alternate) && Sp(e, t);
}
function pw() {
  return null;
}
var pv = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function $h(e) {
  this._internalRoot = e;
}
xl.prototype.render = $h.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(F(409));
  yl(e, t, null, null);
};
xl.prototype.unmount = $h.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Wi(function() {
      yl(null, e, null, null);
    }), t[Nn] = null;
  }
};
function xl(e) {
  this._internalRoot = e;
}
xl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Ug();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Yn.length && t !== 0 && t < Yn[n].priority; n++) ;
    Yn.splice(n, 0, e), n === 0 && Yg(e);
  }
};
function Yh(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function wl(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Pp() {
}
function mw(e, t, n, i, r) {
  if (r) {
    if (typeof i == "function") {
      var o = i;
      i = function() {
        var d = qa(l);
        o.call(d);
      };
    }
    var l = fv(t, i, e, 0, null, !1, !1, "", Pp);
    return e._reactRootContainer = l, e[Nn] = l.current, Zr(e.nodeType === 8 ? e.parentNode : e), Wi(), l;
  }
  for (; r = e.lastChild; ) e.removeChild(r);
  if (typeof i == "function") {
    var u = i;
    i = function() {
      var d = qa(c);
      u.call(d);
    };
  }
  var c = Zh(e, 0, !1, null, null, !1, !1, "", Pp);
  return e._reactRootContainer = c, e[Nn] = c.current, Zr(e.nodeType === 8 ? e.parentNode : e), Wi(function() {
    yl(t, c, n, i);
  }), c;
}
function bl(e, t, n, i, r) {
  var o = n._reactRootContainer;
  if (o) {
    var l = o;
    if (typeof r == "function") {
      var u = r;
      r = function() {
        var c = qa(l);
        u.call(c);
      };
    }
    yl(t, l, e, r);
  } else l = mw(n, t, e, r, i);
  return qa(l);
}
Vg = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = gr(t.pendingLanes);
        n !== 0 && (dh(t, n | 1), ke(t, Bt()), !(_t & 6) && (Ns = Bt() + 500, gi()));
      }
      break;
    case 13:
      Wi(function() {
        var i = An(e, 1);
        if (i !== null) {
          var r = he();
          Je(i, e, 1, r);
        }
      }), Uh(e, 1);
  }
};
fh = function(e) {
  if (e.tag === 13) {
    var t = An(e, 134217728);
    if (t !== null) {
      var n = he();
      Je(t, e, 134217728, n);
    }
    Uh(e, 134217728);
  }
};
Zg = function(e) {
  if (e.tag === 13) {
    var t = li(e), n = An(e, t);
    if (n !== null) {
      var i = he();
      Je(n, e, t, i);
    }
    Uh(e, t);
  }
};
Ug = function() {
  return bt;
};
$g = function(e, t) {
  var n = bt;
  try {
    return bt = e, t();
  } finally {
    bt = n;
  }
};
ac = function(e, t, n) {
  switch (t) {
    case "input":
      if (tc(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var i = n[t];
          if (i !== e && i.form === e.form) {
            var r = dl(i);
            if (!r) throw Error(F(90));
            kg(i), tc(i, r);
          }
        }
      }
      break;
    case "textarea":
      Pg(e, n);
      break;
    case "select":
      t = n.value, t != null && ys(e, !!n.multiple, t, !1);
  }
};
Og = Fh;
Ng = Wi;
var gw = { usingClientEntryPoint: !1, Events: [uo, ds, dl, Eg, zg, Fh] }, lr = { findFiberByHostInstance: Ei, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, _w = { bundleType: lr.bundleType, version: lr.version, rendererPackageName: lr.rendererPackageName, rendererConfig: lr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Dn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Dg(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: lr.findFiberByHostInstance || pw, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ko = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ko.isDisabled && Ko.supportsFiber) try {
    ll = Ko.inject(_w), pn = Ko;
  } catch {
  }
}
ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gw;
ze.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Yh(t)) throw Error(F(200));
  return fw(e, t, null, n);
};
ze.createRoot = function(e, t) {
  if (!Yh(e)) throw Error(F(299));
  var n = !1, i = "", r = pv;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onRecoverableError !== void 0 && (r = t.onRecoverableError)), t = Zh(e, 1, !1, null, null, n, !1, i, r), e[Nn] = t.current, Zr(e.nodeType === 8 ? e.parentNode : e), new $h(t);
};
ze.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(F(188)) : (e = Object.keys(e).join(","), Error(F(268, e)));
  return e = Dg(t), e = e === null ? null : e.stateNode, e;
};
ze.flushSync = function(e) {
  return Wi(e);
};
ze.hydrate = function(e, t, n) {
  if (!wl(t)) throw Error(F(200));
  return bl(null, e, t, !0, n);
};
ze.hydrateRoot = function(e, t, n) {
  if (!Yh(e)) throw Error(F(405));
  var i = n != null && n.hydratedSources || null, r = !1, o = "", l = pv;
  if (n != null && (n.unstable_strictMode === !0 && (r = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), t = fv(t, null, e, 1, n ?? null, r, !1, o, l), e[Nn] = t.current, Zr(e), i) for (e = 0; e < i.length; e++) n = i[e], r = n._getVersion, r = r(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, r] : t.mutableSourceEagerHydrationData.push(
    n,
    r
  );
  return new xl(t);
};
ze.render = function(e, t, n) {
  if (!wl(t)) throw Error(F(200));
  return bl(null, e, t, !1, n);
};
ze.unmountComponentAtNode = function(e) {
  if (!wl(e)) throw Error(F(40));
  return e._reactRootContainer ? (Wi(function() {
    bl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Nn] = null;
    });
  }), !0) : !1;
};
ze.unstable_batchedUpdates = Fh;
ze.unstable_renderSubtreeIntoContainer = function(e, t, n, i) {
  if (!wl(n)) throw Error(F(200));
  if (e == null || e._reactInternals === void 0) throw Error(F(38));
  return bl(e, t, n, !1, i);
};
ze.version = "18.3.1-next-f1338f8080-20240426";
function mv() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(mv);
    } catch (e) {
      console.error(e);
    }
}
mv(), mg.exports = ze;
var vw = mg.exports, gv, Mp = vw;
gv = Mp.createRoot, Mp.hydrateRoot;
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function ho(e) {
  return e + 0.5 | 0;
}
const qn = (e, t, n) => Math.max(Math.min(e, n), t);
function vr(e) {
  return qn(ho(e * 2.55), 0, 255);
}
function ci(e) {
  return qn(ho(e * 255), 0, 255);
}
function Mn(e) {
  return qn(ho(e / 2.55) / 100, 0, 1);
}
function Cp(e) {
  return qn(ho(e * 100), 0, 100);
}
const Re = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Fc = [..."0123456789ABCDEF"], yw = (e) => Fc[e & 15], xw = (e) => Fc[(e & 240) >> 4] + Fc[e & 15], Xo = (e) => (e & 240) >> 4 === (e & 15), ww = (e) => Xo(e.r) && Xo(e.g) && Xo(e.b) && Xo(e.a);
function bw(e) {
  var t = e.length, n;
  return e[0] === "#" && (t === 4 || t === 5 ? n = {
    r: 255 & Re[e[1]] * 17,
    g: 255 & Re[e[2]] * 17,
    b: 255 & Re[e[3]] * 17,
    a: t === 5 ? Re[e[4]] * 17 : 255
  } : (t === 7 || t === 9) && (n = {
    r: Re[e[1]] << 4 | Re[e[2]],
    g: Re[e[3]] << 4 | Re[e[4]],
    b: Re[e[5]] << 4 | Re[e[6]],
    a: t === 9 ? Re[e[7]] << 4 | Re[e[8]] : 255
  })), n;
}
const kw = (e, t) => e < 255 ? t(e) : "";
function Sw(e) {
  var t = ww(e) ? yw : xw;
  return e ? "#" + t(e.r) + t(e.g) + t(e.b) + kw(e.a, t) : void 0;
}
const Pw = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function _v(e, t, n) {
  const i = t * Math.min(n, 1 - n), r = (o, l = (o + e / 30) % 12) => n - i * Math.max(Math.min(l - 3, 9 - l, 1), -1);
  return [r(0), r(8), r(4)];
}
function Mw(e, t, n) {
  const i = (r, o = (r + e / 60) % 6) => n - n * t * Math.max(Math.min(o, 4 - o, 1), 0);
  return [i(5), i(3), i(1)];
}
function Cw(e, t, n) {
  const i = _v(e, 1, 0.5);
  let r;
  for (t + n > 1 && (r = 1 / (t + n), t *= r, n *= r), r = 0; r < 3; r++)
    i[r] *= 1 - t - n, i[r] += t;
  return i;
}
function Lw(e, t, n, i, r) {
  return e === r ? (t - n) / i + (t < n ? 6 : 0) : t === r ? (n - e) / i + 2 : (e - t) / i + 4;
}
function Kh(e) {
  const n = e.r / 255, i = e.g / 255, r = e.b / 255, o = Math.max(n, i, r), l = Math.min(n, i, r), u = (o + l) / 2;
  let c, d, p;
  return o !== l && (p = o - l, d = u > 0.5 ? p / (2 - o - l) : p / (o + l), c = Lw(n, i, r, p, o), c = c * 60 + 0.5), [c | 0, d || 0, u];
}
function Xh(e, t, n, i) {
  return (Array.isArray(t) ? e(t[0], t[1], t[2]) : e(t, n, i)).map(ci);
}
function Gh(e, t, n) {
  return Xh(_v, e, t, n);
}
function Tw(e, t, n) {
  return Xh(Cw, e, t, n);
}
function Ew(e, t, n) {
  return Xh(Mw, e, t, n);
}
function vv(e) {
  return (e % 360 + 360) % 360;
}
function zw(e) {
  const t = Pw.exec(e);
  let n = 255, i;
  if (!t)
    return;
  t[5] !== i && (n = t[6] ? vr(+t[5]) : ci(+t[5]));
  const r = vv(+t[2]), o = +t[3] / 100, l = +t[4] / 100;
  return t[1] === "hwb" ? i = Tw(r, o, l) : t[1] === "hsv" ? i = Ew(r, o, l) : i = Gh(r, o, l), {
    r: i[0],
    g: i[1],
    b: i[2],
    a: n
  };
}
function Ow(e, t) {
  var n = Kh(e);
  n[0] = vv(n[0] + t), n = Gh(n), e.r = n[0], e.g = n[1], e.b = n[2];
}
function Nw(e) {
  if (!e)
    return;
  const t = Kh(e), n = t[0], i = Cp(t[1]), r = Cp(t[2]);
  return e.a < 255 ? `hsla(${n}, ${i}%, ${r}%, ${Mn(e.a)})` : `hsl(${n}, ${i}%, ${r}%)`;
}
const Lp = {
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
}, Tp = {
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
function Aw() {
  const e = {}, t = Object.keys(Tp), n = Object.keys(Lp);
  let i, r, o, l, u;
  for (i = 0; i < t.length; i++) {
    for (l = u = t[i], r = 0; r < n.length; r++)
      o = n[r], u = u.replace(o, Lp[o]);
    o = parseInt(Tp[l], 16), e[u] = [o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  return e;
}
let Go;
function Iw(e) {
  Go || (Go = Aw(), Go.transparent = [0, 0, 0, 0]);
  const t = Go[e.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const Dw = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function Rw(e) {
  const t = Dw.exec(e);
  let n = 255, i, r, o;
  if (t) {
    if (t[7] !== i) {
      const l = +t[7];
      n = t[8] ? vr(l) : qn(l * 255, 0, 255);
    }
    return i = +t[1], r = +t[3], o = +t[5], i = 255 & (t[2] ? vr(i) : qn(i, 0, 255)), r = 255 & (t[4] ? vr(r) : qn(r, 0, 255)), o = 255 & (t[6] ? vr(o) : qn(o, 0, 255)), {
      r: i,
      g: r,
      b: o,
      a: n
    };
  }
}
function jw(e) {
  return e && (e.a < 255 ? `rgba(${e.r}, ${e.g}, ${e.b}, ${Mn(e.a)})` : `rgb(${e.r}, ${e.g}, ${e.b})`);
}
const zu = (e) => e <= 31308e-7 ? e * 12.92 : Math.pow(e, 1 / 2.4) * 1.055 - 0.055, ss = (e) => e <= 0.04045 ? e / 12.92 : Math.pow((e + 0.055) / 1.055, 2.4);
function Bw(e, t, n) {
  const i = ss(Mn(e.r)), r = ss(Mn(e.g)), o = ss(Mn(e.b));
  return {
    r: ci(zu(i + n * (ss(Mn(t.r)) - i))),
    g: ci(zu(r + n * (ss(Mn(t.g)) - r))),
    b: ci(zu(o + n * (ss(Mn(t.b)) - o))),
    a: e.a + n * (t.a - e.a)
  };
}
function qo(e, t, n) {
  if (e) {
    let i = Kh(e);
    i[t] = Math.max(0, Math.min(i[t] + i[t] * n, t === 0 ? 360 : 1)), i = Gh(i), e.r = i[0], e.g = i[1], e.b = i[2];
  }
}
function yv(e, t) {
  return e && Object.assign(t || {}, e);
}
function Ep(e) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(e) ? e.length >= 3 && (t = { r: e[0], g: e[1], b: e[2], a: 255 }, e.length > 3 && (t.a = ci(e[3]))) : (t = yv(e, { r: 0, g: 0, b: 0, a: 1 }), t.a = ci(t.a)), t;
}
function Fw(e) {
  return e.charAt(0) === "r" ? Rw(e) : zw(e);
}
class Jr {
  constructor(t) {
    if (t instanceof Jr)
      return t;
    const n = typeof t;
    let i;
    n === "object" ? i = Ep(t) : n === "string" && (i = bw(t) || Iw(t) || Fw(t)), this._rgb = i, this._valid = !!i;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = yv(this._rgb);
    return t && (t.a = Mn(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Ep(t);
  }
  rgbString() {
    return this._valid ? jw(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? Sw(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? Nw(this._rgb) : void 0;
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
    return t && (this._rgb = Bw(this._rgb, t._rgb, n)), this;
  }
  clone() {
    return new Jr(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = ci(t), this;
  }
  clearer(t) {
    const n = this._rgb;
    return n.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, n = ho(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
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
    return qo(this._rgb, 2, t), this;
  }
  darken(t) {
    return qo(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return qo(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return qo(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return Ow(this._rgb, t), this;
  }
}
/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function wn() {
}
const Hw = /* @__PURE__ */ (() => {
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
function pt(e) {
  return e !== null && Object.prototype.toString.call(e) === "[object Object]";
}
function ae(e) {
  return (typeof e == "number" || e instanceof Number) && isFinite(+e);
}
function un(e, t) {
  return ae(e) ? e : t;
}
function ot(e, t) {
  return typeof e > "u" ? t : e;
}
const Ww = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 : +e / t, xv = (e, t) => typeof e == "string" && e.endsWith("%") ? parseFloat(e) / 100 * t : +e;
function Lt(e, t, n) {
  if (e && typeof e.call == "function")
    return e.apply(n, t);
}
function wt(e, t, n, i) {
  let r, o, l;
  if (Ut(e))
    for (o = e.length, r = 0; r < o; r++)
      t.call(n, e[r], r);
  else if (pt(e))
    for (l = Object.keys(e), o = l.length, r = 0; r < o; r++)
      t.call(n, e[l[r]], l[r]);
}
function Qa(e, t) {
  let n, i, r, o;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (n = 0, i = e.length; n < i; ++n)
    if (r = e[n], o = t[n], r.datasetIndex !== o.datasetIndex || r.index !== o.index)
      return !1;
  return !0;
}
function Ja(e) {
  if (Ut(e))
    return e.map(Ja);
  if (pt(e)) {
    const t = /* @__PURE__ */ Object.create(null), n = Object.keys(e), i = n.length;
    let r = 0;
    for (; r < i; ++r)
      t[n[r]] = Ja(e[n[r]]);
    return t;
  }
  return e;
}
function wv(e) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(e) === -1;
}
function Vw(e, t, n, i) {
  if (!wv(e))
    return;
  const r = t[e], o = n[e];
  pt(r) && pt(o) ? to(r, o, i) : t[e] = Ja(o);
}
function to(e, t, n) {
  const i = Ut(t) ? t : [
    t
  ], r = i.length;
  if (!pt(e))
    return e;
  n = n || {};
  const o = n.merger || Vw;
  let l;
  for (let u = 0; u < r; ++u) {
    if (l = i[u], !pt(l))
      continue;
    const c = Object.keys(l);
    for (let d = 0, p = c.length; d < p; ++d)
      o(c[d], e, l, n);
  }
  return e;
}
function Or(e, t) {
  return to(e, t, {
    merger: Zw
  });
}
function Zw(e, t, n) {
  if (!wv(e))
    return;
  const i = t[e], r = n[e];
  pt(i) && pt(r) ? Or(i, r) : Object.prototype.hasOwnProperty.call(t, e) || (t[e] = Ja(r));
}
const zp = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (e) => e,
  // default resolvers
  x: (e) => e.x,
  y: (e) => e.y
};
function Uw(e) {
  const t = e.split("."), n = [];
  let i = "";
  for (const r of t)
    i += r, i.endsWith("\\") ? i = i.slice(0, -1) + "." : (n.push(i), i = "");
  return n;
}
function $w(e) {
  const t = Uw(e);
  return (n) => {
    for (const i of t) {
      if (i === "")
        break;
      n = n && n[i];
    }
    return n;
  };
}
function Vi(e, t) {
  return (zp[t] || (zp[t] = $w(t)))(e);
}
function qh(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const eo = (e) => typeof e < "u", fi = (e) => typeof e == "function", Op = (e, t) => {
  if (e.size !== t.size)
    return !1;
  for (const n of e)
    if (!t.has(n))
      return !1;
  return !0;
};
function Yw(e) {
  return e.type === "mouseup" || e.type === "click" || e.type === "contextmenu";
}
const St = Math.PI, At = 2 * St, Kw = At + St, tl = Number.POSITIVE_INFINITY, Xw = St / 180, Yt = St / 2, ki = St / 4, Np = St * 2 / 3, bv = Math.log10, gn = Math.sign;
function Nr(e, t, n) {
  return Math.abs(e - t) < n;
}
function Ap(e) {
  const t = Math.round(e);
  e = Nr(e, t, e / 1e3) ? t : e;
  const n = Math.pow(10, Math.floor(bv(e))), i = e / n;
  return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * n;
}
function Gw(e) {
  const t = [], n = Math.sqrt(e);
  let i;
  for (i = 1; i < n; i++)
    e % i === 0 && (t.push(i), t.push(e / i));
  return n === (n | 0) && t.push(n), t.sort((r, o) => r - o).pop(), t;
}
function qw(e) {
  return typeof e == "symbol" || typeof e == "object" && e !== null && !(Symbol.toPrimitive in e || "toString" in e || "valueOf" in e);
}
function no(e) {
  return !qw(e) && !isNaN(parseFloat(e)) && isFinite(e);
}
function Qw(e, t) {
  const n = Math.round(e);
  return n - t <= e && n + t >= e;
}
function Jw(e, t, n) {
  let i, r, o;
  for (i = 0, r = e.length; i < r; i++)
    o = e[i][n], isNaN(o) || (t.min = Math.min(t.min, o), t.max = Math.max(t.max, o));
}
function Tn(e) {
  return e * (St / 180);
}
function tb(e) {
  return e * (180 / St);
}
function Ip(e) {
  if (!ae(e))
    return;
  let t = 1, n = 0;
  for (; Math.round(e * t) / t !== e; )
    t *= 10, n++;
  return n;
}
function kv(e, t) {
  const n = t.x - e.x, i = t.y - e.y, r = Math.sqrt(n * n + i * i);
  let o = Math.atan2(i, n);
  return o < -0.5 * St && (o += At), {
    angle: o,
    distance: r
  };
}
function Hc(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function eb(e, t) {
  return (e - t + Kw) % At - St;
}
function Ce(e) {
  return (e % At + At) % At;
}
function io(e, t, n, i) {
  const r = Ce(e), o = Ce(t), l = Ce(n), u = Ce(o - r), c = Ce(l - r), d = Ce(r - o), p = Ce(r - l);
  return r === o || r === l || i && o === l || u > c && d < p;
}
function re(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function nb(e) {
  return re(e, -32768, 32767);
}
function En(e, t, n, i = 1e-6) {
  return e >= Math.min(t, n) - i && e <= Math.max(t, n) + i;
}
function Qh(e, t, n) {
  n = n || ((l) => e[l] < t);
  let i = e.length - 1, r = 0, o;
  for (; i - r > 1; )
    o = r + i >> 1, n(o) ? r = o : i = o;
  return {
    lo: r,
    hi: i
  };
}
const Ni = (e, t, n, i) => Qh(e, n, i ? (r) => {
  const o = e[r][t];
  return o < n || o === n && e[r + 1][t] === n;
} : (r) => e[r][t] < n), ib = (e, t, n) => Qh(e, n, (i) => e[i][t] >= n);
function sb(e, t, n) {
  let i = 0, r = e.length;
  for (; i < r && e[i] < t; )
    i++;
  for (; r > i && e[r - 1] > n; )
    r--;
  return i > 0 || r < e.length ? e.slice(i, r) : e;
}
const Sv = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function rb(e, t) {
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
  }), Sv.forEach((n) => {
    const i = "_onData" + qh(n), r = e[n];
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
function Dp(e, t) {
  const n = e._chartjs;
  if (!n)
    return;
  const i = n.listeners, r = i.indexOf(t);
  r !== -1 && i.splice(r, 1), !(i.length > 0) && (Sv.forEach((o) => {
    delete e[o];
  }), delete e._chartjs);
}
function Pv(e) {
  const t = new Set(e);
  return t.size === e.length ? e : Array.from(t);
}
const Mv = function() {
  return typeof window > "u" ? function(e) {
    return e();
  } : window.requestAnimationFrame;
}();
function Cv(e, t) {
  let n = [], i = !1;
  return function(...r) {
    n = r, i || (i = !0, Mv.call(window, () => {
      i = !1, e.apply(t, n);
    }));
  };
}
function ob(e, t) {
  let n;
  return function(...i) {
    return t ? (clearTimeout(n), n = setTimeout(e, t, i)) : e.apply(this, i), t;
  };
}
const Lv = (e) => e === "start" ? "left" : e === "end" ? "right" : "center", Pe = (e, t, n) => e === "start" ? t : e === "end" ? n : (t + n) / 2, ab = (e, t, n, i) => e === (i ? "left" : "right") ? n : e === "center" ? (t + n) / 2 : t;
function lb(e, t, n) {
  const i = t.length;
  let r = 0, o = i;
  if (e._sorted) {
    const { iScale: l, vScale: u, _parsed: c } = e, d = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null, p = l.axis, { min: g, max: _, minDefined: x, maxDefined: S } = l.getUserBounds();
    if (x) {
      if (r = Math.min(
        // @ts-expect-error Need to type _parsed
        Ni(c, p, g).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? i : Ni(t, p, l.getPixelForValue(g)).lo
      ), d) {
        const b = c.slice(0, r + 1).reverse().findIndex((C) => !xt(C[u.axis]));
        r -= Math.max(0, b);
      }
      r = re(r, 0, i - 1);
    }
    if (S) {
      let b = Math.max(
        // @ts-expect-error Need to type _parsed
        Ni(c, l.axis, _, !0).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        n ? 0 : Ni(t, p, l.getPixelForValue(_), !0).hi + 1
      );
      if (d) {
        const C = c.slice(b - 1).findIndex((w) => !xt(w[u.axis]));
        b += Math.max(0, C);
      }
      o = re(b, r, i) - r;
    } else
      o = i - r;
  }
  return {
    start: r,
    count: o
  };
}
function ub(e) {
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
const Qo = (e) => e === 0 || e === 1, Rp = (e, t, n) => -(Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * At / n)), jp = (e, t, n) => Math.pow(2, -10 * e) * Math.sin((e - t) * At / n) + 1, Ar = {
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
  easeInOutExpo: (e) => Qo(e) ? e : e < 0.5 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  easeInCirc: (e) => e >= 1 ? e : -(Math.sqrt(1 - e * e) - 1),
  easeOutCirc: (e) => Math.sqrt(1 - (e -= 1) * e),
  easeInOutCirc: (e) => (e /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1),
  easeInElastic: (e) => Qo(e) ? e : Rp(e, 0.075, 0.3),
  easeOutElastic: (e) => Qo(e) ? e : jp(e, 0.075, 0.3),
  easeInOutElastic(e) {
    return Qo(e) ? e : e < 0.5 ? 0.5 * Rp(e * 2, 0.1125, 0.45) : 0.5 + 0.5 * jp(e * 2 - 1, 0.1125, 0.45);
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
  easeInBounce: (e) => 1 - Ar.easeOutBounce(1 - e),
  easeOutBounce(e) {
    return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  },
  easeInOutBounce: (e) => e < 0.5 ? Ar.easeInBounce(e * 2) * 0.5 : Ar.easeOutBounce(e * 2 - 1) * 0.5 + 0.5
};
function Jh(e) {
  if (e && typeof e == "object") {
    const t = e.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Bp(e) {
  return Jh(e) ? e : new Jr(e);
}
function Ou(e) {
  return Jh(e) ? e : new Jr(e).saturate(0.5).darken(0.1).hexString();
}
const cb = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], hb = [
  "color",
  "borderColor",
  "backgroundColor"
];
function db(e) {
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
      properties: hb
    },
    numbers: {
      type: "number",
      properties: cb
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
function fb(e) {
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
const Fp = /* @__PURE__ */ new Map();
function pb(e, t) {
  t = t || {};
  const n = e + JSON.stringify(t);
  let i = Fp.get(n);
  return i || (i = new Intl.NumberFormat(e, t), Fp.set(n, i)), i;
}
function td(e, t, n) {
  return pb(t, n).format(e);
}
const mb = {
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
      (d < 1e-4 || d > 1e15) && (r = "scientific"), o = gb(e, n);
    }
    const l = bv(Math.abs(o)), u = isNaN(l) ? 1 : Math.max(Math.min(-1 * Math.floor(l), 20), 0), c = {
      notation: r,
      minimumFractionDigits: u,
      maximumFractionDigits: u
    };
    return Object.assign(c, this.options.ticks.format), td(e, i, c);
  }
};
function gb(e, t) {
  let n = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(n) >= 1 && e !== Math.floor(e) && (n = e - Math.floor(e)), n;
}
var Tv = {
  formatters: mb
};
function _b(e) {
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
      callback: Tv.formatters.values,
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
const Zi = /* @__PURE__ */ Object.create(null), Wc = /* @__PURE__ */ Object.create(null);
function Ir(e, t) {
  if (!t)
    return e;
  const n = t.split(".");
  for (let i = 0, r = n.length; i < r; ++i) {
    const o = n[i];
    e = e[o] || (e[o] = /* @__PURE__ */ Object.create(null));
  }
  return e;
}
function Nu(e, t, n) {
  return typeof t == "string" ? to(Ir(e, t), n) : to(Ir(e, ""), t);
}
class vb {
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
    }, this.hover = {}, this.hoverBackgroundColor = (i, r) => Ou(r.backgroundColor), this.hoverBorderColor = (i, r) => Ou(r.borderColor), this.hoverColor = (i, r) => Ou(r.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(n);
  }
  set(t, n) {
    return Nu(this, t, n);
  }
  get(t) {
    return Ir(this, t);
  }
  describe(t, n) {
    return Nu(Wc, t, n);
  }
  override(t, n) {
    return Nu(Zi, t, n);
  }
  route(t, n, i, r) {
    const o = Ir(this, t), l = Ir(this, i), u = "_" + n;
    Object.defineProperties(o, {
      [u]: {
        value: o[n],
        writable: !0
      },
      [n]: {
        enumerable: !0,
        get() {
          const c = this[u], d = l[r];
          return pt(c) ? Object.assign({}, d, c) : ot(c, d);
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
var Ft = /* @__PURE__ */ new vb({
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
  db,
  fb,
  _b
]);
function yb(e) {
  return !e || xt(e.size) || xt(e.family) ? null : (e.style ? e.style + " " : "") + (e.weight ? e.weight + " " : "") + e.size + "px " + e.family;
}
function Hp(e, t, n, i, r) {
  let o = t[r];
  return o || (o = t[r] = e.measureText(r).width, n.push(r)), o > i && (i = o), i;
}
function Si(e, t, n) {
  const i = e.currentDevicePixelRatio, r = n !== 0 ? Math.max(n / 2, 0.5) : 0;
  return Math.round((t - r) * i) / i + r;
}
function Wp(e, t) {
  !t && !e || (t = t || e.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, e.width, e.height), t.restore());
}
function Vc(e, t, n, i) {
  Ev(e, t, n, i, null);
}
function Ev(e, t, n, i, r) {
  let o, l, u, c, d, p, g, _;
  const x = t.pointStyle, S = t.rotation, b = t.radius;
  let C = (S || 0) * Xw;
  if (x && typeof x == "object" && (o = x.toString(), o === "[object HTMLImageElement]" || o === "[object HTMLCanvasElement]")) {
    e.save(), e.translate(n, i), e.rotate(C), e.drawImage(x, -x.width / 2, -x.height / 2, x.width, x.height), e.restore();
    return;
  }
  if (!(isNaN(b) || b <= 0)) {
    switch (e.beginPath(), x) {
      default:
        r ? e.ellipse(n, i, r / 2, b, 0, 0, At) : e.arc(n, i, b, 0, At), e.closePath();
        break;
      case "triangle":
        p = r ? r / 2 : b, e.moveTo(n + Math.sin(C) * p, i - Math.cos(C) * b), C += Np, e.lineTo(n + Math.sin(C) * p, i - Math.cos(C) * b), C += Np, e.lineTo(n + Math.sin(C) * p, i - Math.cos(C) * b), e.closePath();
        break;
      case "rectRounded":
        d = b * 0.516, c = b - d, l = Math.cos(C + ki) * c, g = Math.cos(C + ki) * (r ? r / 2 - d : c), u = Math.sin(C + ki) * c, _ = Math.sin(C + ki) * (r ? r / 2 - d : c), e.arc(n - g, i - u, d, C - St, C - Yt), e.arc(n + _, i - l, d, C - Yt, C), e.arc(n + g, i + u, d, C, C + Yt), e.arc(n - _, i + l, d, C + Yt, C + St), e.closePath();
        break;
      case "rect":
        if (!S) {
          c = Math.SQRT1_2 * b, p = r ? r / 2 : c, e.rect(n - p, i - c, 2 * p, 2 * c);
          break;
        }
        C += ki;
      case "rectRot":
        g = Math.cos(C) * (r ? r / 2 : b), l = Math.cos(C) * b, u = Math.sin(C) * b, _ = Math.sin(C) * (r ? r / 2 : b), e.moveTo(n - g, i - u), e.lineTo(n + _, i - l), e.lineTo(n + g, i + u), e.lineTo(n - _, i + l), e.closePath();
        break;
      case "crossRot":
        C += ki;
      case "cross":
        g = Math.cos(C) * (r ? r / 2 : b), l = Math.cos(C) * b, u = Math.sin(C) * b, _ = Math.sin(C) * (r ? r / 2 : b), e.moveTo(n - g, i - u), e.lineTo(n + g, i + u), e.moveTo(n + _, i - l), e.lineTo(n - _, i + l);
        break;
      case "star":
        g = Math.cos(C) * (r ? r / 2 : b), l = Math.cos(C) * b, u = Math.sin(C) * b, _ = Math.sin(C) * (r ? r / 2 : b), e.moveTo(n - g, i - u), e.lineTo(n + g, i + u), e.moveTo(n + _, i - l), e.lineTo(n - _, i + l), C += ki, g = Math.cos(C) * (r ? r / 2 : b), l = Math.cos(C) * b, u = Math.sin(C) * b, _ = Math.sin(C) * (r ? r / 2 : b), e.moveTo(n - g, i - u), e.lineTo(n + g, i + u), e.moveTo(n + _, i - l), e.lineTo(n - _, i + l);
        break;
      case "line":
        l = r ? r / 2 : Math.cos(C) * b, u = Math.sin(C) * b, e.moveTo(n - l, i - u), e.lineTo(n + l, i + u);
        break;
      case "dash":
        e.moveTo(n, i), e.lineTo(n + Math.cos(C) * (r ? r / 2 : b), i + Math.sin(C) * b);
        break;
      case !1:
        e.closePath();
        break;
    }
    e.fill(), t.borderWidth > 0 && e.stroke();
  }
}
function so(e, t, n) {
  return n = n || 0.5, !t || e && e.x > t.left - n && e.x < t.right + n && e.y > t.top - n && e.y < t.bottom + n;
}
function kl(e, t) {
  e.save(), e.beginPath(), e.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), e.clip();
}
function Sl(e) {
  e.restore();
}
function xb(e, t, n, i, r) {
  if (!t)
    return e.lineTo(n.x, n.y);
  if (r === "middle") {
    const o = (t.x + n.x) / 2;
    e.lineTo(o, t.y), e.lineTo(o, n.y);
  } else r === "after" != !!i ? e.lineTo(t.x, n.y) : e.lineTo(n.x, t.y);
  e.lineTo(n.x, n.y);
}
function wb(e, t, n, i) {
  if (!t)
    return e.lineTo(n.x, n.y);
  e.bezierCurveTo(i ? t.cp1x : t.cp2x, i ? t.cp1y : t.cp2y, i ? n.cp2x : n.cp1x, i ? n.cp2y : n.cp1y, n.x, n.y);
}
function bb(e, t) {
  t.translation && e.translate(t.translation[0], t.translation[1]), xt(t.rotation) || e.rotate(t.rotation), t.color && (e.fillStyle = t.color), t.textAlign && (e.textAlign = t.textAlign), t.textBaseline && (e.textBaseline = t.textBaseline);
}
function kb(e, t, n, i, r) {
  if (r.strikethrough || r.underline) {
    const o = e.measureText(i), l = t - o.actualBoundingBoxLeft, u = t + o.actualBoundingBoxRight, c = n - o.actualBoundingBoxAscent, d = n + o.actualBoundingBoxDescent, p = r.strikethrough ? (c + d) / 2 : d;
    e.strokeStyle = e.fillStyle, e.beginPath(), e.lineWidth = r.decorationWidth || 2, e.moveTo(l, p), e.lineTo(u, p), e.stroke();
  }
}
function Sb(e, t) {
  const n = e.fillStyle;
  e.fillStyle = t.color, e.fillRect(t.left, t.top, t.width, t.height), e.fillStyle = n;
}
function el(e, t, n, i, r, o = {}) {
  const l = Ut(t) ? t : [
    t
  ], u = o.strokeWidth > 0 && o.strokeColor !== "";
  let c, d;
  for (e.save(), e.font = r.string, bb(e, o), c = 0; c < l.length; ++c)
    d = l[c], o.backdrop && Sb(e, o.backdrop), u && (o.strokeColor && (e.strokeStyle = o.strokeColor), xt(o.strokeWidth) || (e.lineWidth = o.strokeWidth), e.strokeText(d, n, i, o.maxWidth)), e.fillText(d, n, i, o.maxWidth), kb(e, n, i, d, o), i += Number(r.lineHeight);
  e.restore();
}
function nl(e, t) {
  const { x: n, y: i, w: r, h: o, radius: l } = t;
  e.arc(n + l.topLeft, i + l.topLeft, l.topLeft, 1.5 * St, St, !0), e.lineTo(n, i + o - l.bottomLeft), e.arc(n + l.bottomLeft, i + o - l.bottomLeft, l.bottomLeft, St, Yt, !0), e.lineTo(n + r - l.bottomRight, i + o), e.arc(n + r - l.bottomRight, i + o - l.bottomRight, l.bottomRight, Yt, 0, !0), e.lineTo(n + r, i + l.topRight), e.arc(n + r - l.topRight, i + l.topRight, l.topRight, 0, -Yt, !0), e.lineTo(n + l.topLeft, i);
}
const Pb = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, Mb = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function Cb(e, t) {
  const n = ("" + e).match(Pb);
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
const Lb = (e) => +e || 0;
function ed(e, t) {
  const n = {}, i = pt(t), r = i ? Object.keys(t) : t, o = pt(e) ? i ? (l) => ot(e[l], e[t[l]]) : (l) => e[l] : () => e;
  for (const l of r)
    n[l] = Lb(o(l));
  return n;
}
function zv(e) {
  return ed(e, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ps(e) {
  return ed(e, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function en(e) {
  const t = zv(e);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function xe(e, t) {
  e = e || {}, t = t || Ft.font;
  let n = ot(e.size, t.size);
  typeof n == "string" && (n = parseInt(n, 10));
  let i = ot(e.style, t.style);
  i && !("" + i).match(Mb) && (console.warn('Invalid font style specified: "' + i + '"'), i = void 0);
  const r = {
    family: ot(e.family, t.family),
    lineHeight: Cb(ot(e.lineHeight, t.lineHeight), n),
    size: n,
    style: i,
    weight: ot(e.weight, t.weight),
    string: ""
  };
  return r.string = yb(r), r;
}
function Jo(e, t, n, i) {
  let r, o, l;
  for (r = 0, o = e.length; r < o; ++r)
    if (l = e[r], l !== void 0 && l !== void 0)
      return l;
}
function Tb(e, t, n) {
  const { min: i, max: r } = e, o = xv(t, (r - i) / 2), l = (u, c) => n && u === 0 ? 0 : u + c;
  return {
    min: l(i, -Math.abs(o)),
    max: l(r, o)
  };
}
function Yi(e, t) {
  return Object.assign(Object.create(e), t);
}
function nd(e, t = [
  ""
], n, i, r = () => e[0]) {
  const o = n || e;
  typeof i > "u" && (i = Iv("_fallback", e));
  const l = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: e,
    _rootScopes: o,
    _fallback: i,
    _getTarget: r,
    override: (u) => nd([
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
      return Nv(u, c, () => Rb(c, t, e, u));
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
      return Zp(u).includes(c);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(u) {
      return Zp(u);
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
function As(e, t, n, i) {
  const r = {
    _cacheable: !1,
    _proxy: e,
    _context: t,
    _subProxy: n,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Ov(e, i),
    setContext: (o) => As(e, o, n, i),
    override: (o) => As(e.override(o), t, n, i)
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
      return Nv(o, l, () => zb(o, l, u));
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
function Ov(e, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: n = t.scriptable, _indexable: i = t.indexable, _allKeys: r = t.allKeys } = e;
  return {
    allKeys: r,
    scriptable: n,
    indexable: i,
    isScriptable: fi(n) ? n : () => n,
    isIndexable: fi(i) ? i : () => i
  };
}
const Eb = (e, t) => e ? e + qh(t) : t, id = (e, t) => pt(t) && e !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Nv(e, t, n) {
  if (Object.prototype.hasOwnProperty.call(e, t) || t === "constructor")
    return e[t];
  const i = n();
  return e[t] = i, i;
}
function zb(e, t, n) {
  const { _proxy: i, _context: r, _subProxy: o, _descriptors: l } = e;
  let u = i[t];
  return fi(u) && l.isScriptable(t) && (u = Ob(t, u, e, n)), Ut(u) && u.length && (u = Nb(t, u, e, l.isIndexable)), id(t, u) && (u = As(u, r, o && o[t], l)), u;
}
function Ob(e, t, n, i) {
  const { _proxy: r, _context: o, _subProxy: l, _stack: u } = n;
  if (u.has(e))
    throw new Error("Recursion detected: " + Array.from(u).join("->") + "->" + e);
  u.add(e);
  let c = t(o, l || i);
  return u.delete(e), id(e, c) && (c = sd(r._scopes, r, e, c)), c;
}
function Nb(e, t, n, i) {
  const { _proxy: r, _context: o, _subProxy: l, _descriptors: u } = n;
  if (typeof o.index < "u" && i(e))
    return t[o.index % t.length];
  if (pt(t[0])) {
    const c = t, d = r._scopes.filter((p) => p !== c);
    t = [];
    for (const p of c) {
      const g = sd(d, r, e, p);
      t.push(As(g, o, l && l[e], u));
    }
  }
  return t;
}
function Av(e, t, n) {
  return fi(e) ? e(t, n) : e;
}
const Ab = (e, t) => e === !0 ? t : typeof e == "string" ? Vi(t, e) : void 0;
function Ib(e, t, n, i, r) {
  for (const o of t) {
    const l = Ab(n, o);
    if (l) {
      e.add(l);
      const u = Av(l._fallback, n, r);
      if (typeof u < "u" && u !== n && u !== i)
        return u;
    } else if (l === !1 && typeof i < "u" && n !== i)
      return null;
  }
  return !1;
}
function sd(e, t, n, i) {
  const r = t._rootScopes, o = Av(t._fallback, n, i), l = [
    ...e,
    ...r
  ], u = /* @__PURE__ */ new Set();
  u.add(i);
  let c = Vp(u, l, n, o || n, i);
  return c === null || typeof o < "u" && o !== n && (c = Vp(u, l, o, c, i), c === null) ? !1 : nd(Array.from(u), [
    ""
  ], r, o, () => Db(t, n, i));
}
function Vp(e, t, n, i, r) {
  for (; n; )
    n = Ib(e, t, n, i, r);
  return n;
}
function Db(e, t, n) {
  const i = e._getTarget();
  t in i || (i[t] = {});
  const r = i[t];
  return Ut(r) && pt(n) ? n : r || {};
}
function Rb(e, t, n, i) {
  let r;
  for (const o of t)
    if (r = Iv(Eb(o, e), n), typeof r < "u")
      return id(e, r) ? sd(n, i, e, r) : r;
}
function Iv(e, t) {
  for (const n of t) {
    if (!n)
      continue;
    const i = n[e];
    if (typeof i < "u")
      return i;
  }
}
function Zp(e) {
  let t = e._keys;
  return t || (t = e._keys = jb(e._scopes)), t;
}
function jb(e) {
  const t = /* @__PURE__ */ new Set();
  for (const n of e)
    for (const i of Object.keys(n).filter((r) => !r.startsWith("_")))
      t.add(i);
  return Array.from(t);
}
const Bb = Number.EPSILON || 1e-14, Is = (e, t) => t < e.length && !e[t].skip && e[t], Dv = (e) => e === "x" ? "y" : "x";
function Fb(e, t, n, i) {
  const r = e.skip ? t : e, o = t, l = n.skip ? t : n, u = Hc(o, r), c = Hc(l, o);
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
function Hb(e, t, n) {
  const i = e.length;
  let r, o, l, u, c, d = Is(e, 0);
  for (let p = 0; p < i - 1; ++p)
    if (c = d, d = Is(e, p + 1), !(!c || !d)) {
      if (Nr(t[p], 0, Bb)) {
        n[p] = n[p + 1] = 0;
        continue;
      }
      r = n[p] / t[p], o = n[p + 1] / t[p], u = Math.pow(r, 2) + Math.pow(o, 2), !(u <= 9) && (l = 3 / Math.sqrt(u), n[p] = r * l * t[p], n[p + 1] = o * l * t[p]);
    }
}
function Wb(e, t, n = "x") {
  const i = Dv(n), r = e.length;
  let o, l, u, c = Is(e, 0);
  for (let d = 0; d < r; ++d) {
    if (l = u, u = c, c = Is(e, d + 1), !u)
      continue;
    const p = u[n], g = u[i];
    l && (o = (p - l[n]) / 3, u[`cp1${n}`] = p - o, u[`cp1${i}`] = g - o * t[d]), c && (o = (c[n] - p) / 3, u[`cp2${n}`] = p + o, u[`cp2${i}`] = g + o * t[d]);
  }
}
function Vb(e, t = "x") {
  const n = Dv(t), i = e.length, r = Array(i).fill(0), o = Array(i);
  let l, u, c, d = Is(e, 0);
  for (l = 0; l < i; ++l)
    if (u = c, c = d, d = Is(e, l + 1), !!c) {
      if (d) {
        const p = d[t] - c[t];
        r[l] = p !== 0 ? (d[n] - c[n]) / p : 0;
      }
      o[l] = u ? d ? gn(r[l - 1]) !== gn(r[l]) ? 0 : (r[l - 1] + r[l]) / 2 : r[l - 1] : r[l];
    }
  Hb(e, r, o), Wb(e, o, t);
}
function ta(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
function Zb(e, t) {
  let n, i, r, o, l, u = so(e[0], t);
  for (n = 0, i = e.length; n < i; ++n)
    l = o, o = u, u = n < i - 1 && so(e[n + 1], t), o && (r = e[n], l && (r.cp1x = ta(r.cp1x, t.left, t.right), r.cp1y = ta(r.cp1y, t.top, t.bottom)), u && (r.cp2x = ta(r.cp2x, t.left, t.right), r.cp2y = ta(r.cp2y, t.top, t.bottom)));
}
function Ub(e, t, n, i, r) {
  let o, l, u, c;
  if (t.spanGaps && (e = e.filter((d) => !d.skip)), t.cubicInterpolationMode === "monotone")
    Vb(e, r);
  else {
    let d = i ? e[e.length - 1] : e[0];
    for (o = 0, l = e.length; o < l; ++o)
      u = e[o], c = Fb(d, u, e[Math.min(o + 1, l - (i ? 0 : 1)) % l], t.tension), u.cp1x = c.previous.x, u.cp1y = c.previous.y, u.cp2x = c.next.x, u.cp2y = c.next.y, d = u;
  }
  t.capBezierPoints && Zb(e, n);
}
function rd() {
  return typeof window < "u" && typeof document < "u";
}
function od(e) {
  let t = e.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function il(e, t, n) {
  let i;
  return typeof e == "string" ? (i = parseInt(e, 10), e.indexOf("%") !== -1 && (i = i / 100 * t.parentNode[n])) : i = e, i;
}
const Pl = (e) => e.ownerDocument.defaultView.getComputedStyle(e, null);
function $b(e, t) {
  return Pl(e).getPropertyValue(t);
}
const Yb = [
  "top",
  "right",
  "bottom",
  "left"
];
function Di(e, t, n) {
  const i = {};
  n = n ? "-" + n : "";
  for (let r = 0; r < 4; r++) {
    const o = Yb[r];
    i[o] = parseFloat(e[t + "-" + o + n]) || 0;
  }
  return i.width = i.left + i.right, i.height = i.top + i.bottom, i;
}
const Kb = (e, t, n) => (e > 0 || t > 0) && (!n || !n.shadowRoot);
function Xb(e, t) {
  const n = e.touches, i = n && n.length ? n[0] : e, { offsetX: r, offsetY: o } = i;
  let l = !1, u, c;
  if (Kb(r, o, e.target))
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
function Li(e, t) {
  if ("native" in e)
    return e;
  const { canvas: n, currentDevicePixelRatio: i } = t, r = Pl(n), o = r.boxSizing === "border-box", l = Di(r, "padding"), u = Di(r, "border", "width"), { x: c, y: d, box: p } = Xb(e, n), g = l.left + (p && u.left), _ = l.top + (p && u.top);
  let { width: x, height: S } = t;
  return o && (x -= l.width + u.width, S -= l.height + u.height), {
    x: Math.round((c - g) / x * n.width / i),
    y: Math.round((d - _) / S * n.height / i)
  };
}
function Gb(e, t, n) {
  let i, r;
  if (t === void 0 || n === void 0) {
    const o = e && od(e);
    if (!o)
      t = e.clientWidth, n = e.clientHeight;
    else {
      const l = o.getBoundingClientRect(), u = Pl(o), c = Di(u, "border", "width"), d = Di(u, "padding");
      t = l.width - d.width - c.width, n = l.height - d.height - c.height, i = il(u.maxWidth, o, "clientWidth"), r = il(u.maxHeight, o, "clientHeight");
    }
  }
  return {
    width: t,
    height: n,
    maxWidth: i || tl,
    maxHeight: r || tl
  };
}
const Qn = (e) => Math.round(e * 10) / 10;
function qb(e, t, n, i) {
  const r = Pl(e), o = Di(r, "margin"), l = il(r.maxWidth, e, "clientWidth") || tl, u = il(r.maxHeight, e, "clientHeight") || tl, c = Gb(e, t, n);
  let { width: d, height: p } = c;
  if (r.boxSizing === "content-box") {
    const _ = Di(r, "border", "width"), x = Di(r, "padding");
    d -= x.width + _.width, p -= x.height + _.height;
  }
  return d = Math.max(0, d - o.width), p = Math.max(0, i ? d / i : p - o.height), d = Qn(Math.min(d, l, c.maxWidth)), p = Qn(Math.min(p, u, c.maxHeight)), d && !p && (p = Qn(d / 2)), (t !== void 0 || n !== void 0) && i && c.height && p > c.height && (p = c.height, d = Qn(Math.floor(p * i))), {
    width: d,
    height: p
  };
}
function Up(e, t, n) {
  const i = t || 1, r = Qn(e.height * i), o = Qn(e.width * i);
  e.height = Qn(e.height), e.width = Qn(e.width);
  const l = e.canvas;
  return l.style && (n || !l.style.height && !l.style.width) && (l.style.height = `${e.height}px`, l.style.width = `${e.width}px`), e.currentDevicePixelRatio !== i || l.height !== r || l.width !== o ? (e.currentDevicePixelRatio = i, l.height = r, l.width = o, e.ctx.setTransform(i, 0, 0, i, 0, 0), !0) : !1;
}
const Qb = function() {
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    };
    rd() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return e;
}();
function $p(e, t) {
  const n = $b(e, t), i = n && n.match(/^(\d+)(\.\d+)?px$/);
  return i ? +i[1] : void 0;
}
function Ti(e, t, n, i) {
  return {
    x: e.x + n * (t.x - e.x),
    y: e.y + n * (t.y - e.y)
  };
}
function Jb(e, t, n, i) {
  return {
    x: e.x + n * (t.x - e.x),
    y: i === "middle" ? n < 0.5 ? e.y : t.y : i === "after" ? n < 1 ? e.y : t.y : n > 0 ? t.y : e.y
  };
}
function tk(e, t, n, i) {
  const r = {
    x: e.cp2x,
    y: e.cp2y
  }, o = {
    x: t.cp1x,
    y: t.cp1y
  }, l = Ti(e, r, n), u = Ti(r, o, n), c = Ti(o, t, n), d = Ti(l, u, n), p = Ti(u, c, n);
  return Ti(d, p, n);
}
const ek = function(e, t) {
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
}, nk = function() {
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
function Ms(e, t, n) {
  return e ? ek(t, n) : nk();
}
function Rv(e, t) {
  let n, i;
  (t === "ltr" || t === "rtl") && (n = e.canvas.style, i = [
    n.getPropertyValue("direction"),
    n.getPropertyPriority("direction")
  ], n.setProperty("direction", t, "important"), e.prevTextDirection = i);
}
function jv(e, t) {
  t !== void 0 && (delete e.prevTextDirection, e.canvas.style.setProperty("direction", t[0], t[1]));
}
function Bv(e) {
  return e === "angle" ? {
    between: io,
    compare: eb,
    normalize: Ce
  } : {
    between: En,
    compare: (t, n) => t - n,
    normalize: (t) => t
  };
}
function Yp({ start: e, end: t, count: n, loop: i, style: r }) {
  return {
    start: e % n,
    end: t % n,
    loop: i && (t - e + 1) % n === 0,
    style: r
  };
}
function ik(e, t, n) {
  const { property: i, start: r, end: o } = n, { between: l, normalize: u } = Bv(i), c = t.length;
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
function Fv(e, t, n) {
  if (!n)
    return [
      e
    ];
  const { property: i, start: r, end: o } = n, l = t.length, { compare: u, between: c, normalize: d } = Bv(i), { start: p, end: g, loop: _, style: x } = ik(e, t, n), S = [];
  let b = !1, C = null, w, k, P;
  const T = () => c(r, P, w) && u(r, P) !== 0, E = () => u(o, w) === 0 || c(o, P, w), N = () => b || T(), A = () => !b || E();
  for (let I = p, H = p; I <= g; ++I)
    k = t[I % l], !k.skip && (w = d(k[i]), w !== P && (b = c(w, r, o), C === null && N() && (C = u(w, r) === 0 ? I : H), C !== null && A() && (S.push(Yp({
      start: C,
      end: I,
      loop: _,
      count: l,
      style: x
    })), C = null), H = I, P = w));
  return C !== null && S.push(Yp({
    start: C,
    end: g,
    loop: _,
    count: l,
    style: x
  })), S;
}
function Hv(e, t) {
  const n = [], i = e.segments;
  for (let r = 0; r < i.length; r++) {
    const o = Fv(i[r], e.points, t);
    o.length && n.push(...o);
  }
  return n;
}
function sk(e, t, n, i) {
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
function rk(e, t, n, i) {
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
function ok(e, t) {
  const n = e.points, i = e.options.spanGaps, r = n.length;
  if (!r)
    return [];
  const o = !!e._loop, { start: l, end: u } = sk(n, r, o, i);
  if (i === !0)
    return Kp(e, [
      {
        start: l,
        end: u,
        loop: o
      }
    ], n, t);
  const c = u < l ? u + r : u, d = !!e._fullLoop && l === 0 && u === r - 1;
  return Kp(e, rk(n, l, c, d), n, t);
}
function Kp(e, t, n, i) {
  return !i || !i.setContext || !n ? t : ak(e, t, n, i);
}
function ak(e, t, n, i) {
  const r = e._chart.getContext(), o = Xp(e.options), { _datasetIndex: l, options: { spanGaps: u } } = e, c = n.length, d = [];
  let p = o, g = t[0].start, _ = g;
  function x(S, b, C, w) {
    const k = u ? -1 : 1;
    if (S !== b) {
      for (S += c; n[S % c].skip; )
        S -= k;
      for (; n[b % c].skip; )
        b += k;
      S % c !== b % c && (d.push({
        start: S % c,
        end: b % c,
        loop: C,
        style: w
      }), p = w, g = b % c);
    }
  }
  for (const S of t) {
    g = u ? g : S.start;
    let b = n[g % c], C;
    for (_ = g + 1; _ <= S.end; _++) {
      const w = n[_ % c];
      C = Xp(i.setContext(Yi(r, {
        type: "segment",
        p0: b,
        p1: w,
        p0DataIndex: (_ - 1) % c,
        p1DataIndex: _ % c,
        datasetIndex: l
      }))), lk(C, p) && x(g, _ - 1, S.loop, p), b = w, p = C;
    }
    g < _ - 1 && x(g, _ - 1, S.loop, p);
  }
  return d;
}
function Xp(e) {
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
function lk(e, t) {
  if (!t)
    return !1;
  const n = [], i = function(r, o) {
    return Jh(o) ? (n.includes(o) || n.push(o), n.indexOf(o)) : o;
  };
  return JSON.stringify(e, i) !== JSON.stringify(t, i);
}
function ea(e, t, n) {
  return e.options.clip ? e[n] : t[n];
}
function uk(e, t) {
  const { xScale: n, yScale: i } = e;
  return n && i ? {
    left: ea(n, t, "left"),
    right: ea(n, t, "right"),
    top: ea(i, t, "top"),
    bottom: ea(i, t, "bottom")
  } : t;
}
function Wv(e, t) {
  const n = t._clip;
  if (n.disabled)
    return !1;
  const i = uk(t, e.chartArea);
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
class ck {
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
    this._request || (this._running = !0, this._request = Mv.call(window, () => {
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
var bn = /* @__PURE__ */ new ck();
const Gp = "transparent", hk = {
  boolean(e, t, n) {
    return n > 0.5 ? t : e;
  },
  color(e, t, n) {
    const i = Bp(e || Gp), r = i.valid && Bp(t || Gp);
    return r && r.valid ? r.mix(i, n).hexString() : t;
  },
  number(e, t, n) {
    return e + (t - e) * n;
  }
};
class dk {
  constructor(t, n, i, r) {
    const o = n[i];
    r = Jo([
      t.to,
      r,
      o,
      t.from
    ]);
    const l = Jo([
      t.from,
      o,
      r
    ]);
    this._active = !0, this._fn = t.fn || hk[t.type || typeof l], this._easing = Ar[t.easing] || Ar.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = n, this._prop = i, this._from = l, this._to = r, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, n, i) {
    if (this._active) {
      this._notify(!1);
      const r = this._target[this._prop], o = i - this._start, l = this._duration - o;
      this._start = i, this._duration = Math.floor(Math.max(l, t.duration)), this._total += o, this._loop = !!t.loop, this._to = Jo([
        t.to,
        n,
        r,
        t.from
      ]), this._from = Jo([
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
class Vv {
  constructor(t, n) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(n);
  }
  configure(t) {
    if (!pt(t))
      return;
    const n = Object.keys(Ft.animation), i = this._properties;
    Object.getOwnPropertyNames(t).forEach((r) => {
      const o = t[r];
      if (!pt(o))
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
    const i = n.options, r = pk(t, i);
    if (!r)
      return [];
    const o = this._createAnimations(r, i);
    return i.$shared && fk(t.options.$animations, i).then(() => {
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
      o[d] = g = new dk(_, t, d, p), r.push(g);
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
      return bn.add(this._chart, i), !0;
  }
}
function fk(e, t) {
  const n = [], i = Object.keys(t);
  for (let r = 0; r < i.length; r++) {
    const o = e[i[r]];
    o && o.active() && n.push(o.wait());
  }
  return Promise.all(n);
}
function pk(e, t) {
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
function qp(e, t) {
  const n = e && e.options || {}, i = n.reverse, r = n.min === void 0 ? t : 0, o = n.max === void 0 ? t : 0;
  return {
    start: i ? o : r,
    end: i ? r : o
  };
}
function mk(e, t, n) {
  if (n === !1)
    return !1;
  const i = qp(e, n), r = qp(t, n);
  return {
    top: r.end,
    right: i.end,
    bottom: r.start,
    left: i.start
  };
}
function gk(e) {
  let t, n, i, r;
  return pt(e) ? (t = e.top, n = e.right, i = e.bottom, r = e.left) : t = n = i = r = e, {
    top: t,
    right: n,
    bottom: i,
    left: r,
    disabled: e === !1
  };
}
function Zv(e, t) {
  const n = [], i = e._getSortedDatasetMetas(t);
  let r, o;
  for (r = 0, o = i.length; r < o; ++r)
    n.push(i[r].index);
  return n;
}
function Qp(e, t, n, i = {}) {
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
    d = e.values[c], ae(d) && (o || t === 0 || gn(t) === gn(d)) && (t += d);
  }
  return !p && !i.all ? 0 : t;
}
function _k(e, t) {
  const { iScale: n, vScale: i } = t, r = n.axis === "x" ? "x" : "y", o = i.axis === "x" ? "x" : "y", l = Object.keys(e), u = new Array(l.length);
  let c, d, p;
  for (c = 0, d = l.length; c < d; ++c)
    p = l[c], u[c] = {
      [r]: p,
      [o]: e[p]
    };
  return u;
}
function Au(e, t) {
  const n = e && e.options.stacked;
  return n || n === void 0 && t.stack !== void 0;
}
function vk(e, t, n) {
  return `${e.id}.${t.id}.${n.stack || n.type}`;
}
function yk(e) {
  const { min: t, max: n, minDefined: i, maxDefined: r } = e.getUserBounds();
  return {
    min: i ? t : Number.NEGATIVE_INFINITY,
    max: r ? n : Number.POSITIVE_INFINITY
  };
}
function xk(e, t, n) {
  const i = e[t] || (e[t] = {});
  return i[n] || (i[n] = {});
}
function Jp(e, t, n, i) {
  for (const r of t.getMatchingVisibleMetas(i).reverse()) {
    const o = e[r.index];
    if (n && o > 0 || !n && o < 0)
      return r.index;
  }
  return null;
}
function tm(e, t) {
  const { chart: n, _cachedMeta: i } = e, r = n._stacks || (n._stacks = {}), { iScale: o, vScale: l, index: u } = i, c = o.axis, d = l.axis, p = vk(o, l, i), g = t.length;
  let _;
  for (let x = 0; x < g; ++x) {
    const S = t[x], { [c]: b, [d]: C } = S, w = S._stacks || (S._stacks = {});
    _ = w[d] = xk(r, p, b), _[u] = C, _._top = Jp(_, l, !0, i.type), _._bottom = Jp(_, l, !1, i.type);
    const k = _._visualValues || (_._visualValues = {});
    k[u] = C;
  }
}
function Iu(e, t) {
  const n = e.scales;
  return Object.keys(n).filter((i) => n[i].axis === t).shift();
}
function wk(e, t) {
  return Yi(e, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function bk(e, t, n) {
  return Yi(e, {
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
function ur(e, t) {
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
const Du = (e) => e === "reset" || e === "none", em = (e, t) => t ? e : Object.assign({}, e), kk = (e, t, n) => e && !t.hidden && t._stacked && {
  keys: Zv(n, !0),
  values: null
};
class Ri {
  constructor(t, n) {
    this.chart = t, this._ctx = t.ctx, this.index = n, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Au(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && ur(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, n = this._cachedMeta, i = this.getDataset(), r = (g, _, x, S) => g === "x" ? _ : g === "r" ? S : x, o = n.xAxisID = ot(i.xAxisID, Iu(t, "x")), l = n.yAxisID = ot(i.yAxisID, Iu(t, "y")), u = n.rAxisID = ot(i.rAxisID, Iu(t, "r")), c = n.indexAxis, d = n.iAxisID = r(c, o, l, u), p = n.vAxisID = r(c, l, o, u);
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
    this._data && Dp(this._data, this), t._stacked && ur(t);
  }
  _dataCheck() {
    const t = this.getDataset(), n = t.data || (t.data = []), i = this._data;
    if (pt(n)) {
      const r = this._cachedMeta;
      this._data = _k(n, r);
    } else if (i !== n) {
      if (i) {
        Dp(i, this);
        const r = this._cachedMeta;
        ur(r), r._parsed = [];
      }
      n && Object.isExtensible(n) && rb(n, this), this._syncList = [], this._data = n;
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
    n._stacked = Au(n.vScale, n), n.stack !== i.stack && (r = !0, ur(n), n.stack = i.stack), this._resyncElements(t), (r || o !== n._stacked) && (tm(this, n._parsed), n._stacked = Au(n.vScale, n));
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
      Ut(r[t]) ? _ = this.parseArrayData(i, r, t, n) : pt(r[t]) ? _ = this.parseObjectData(i, r, t, n) : _ = this.parsePrimitiveData(i, r, t, n);
      const x = () => g[u] === null || d && g[u] < d[u];
      for (p = 0; p < n; ++p)
        i._parsed[p + t] = g = _[p], c && (x() && (c = !1), d = g);
      i._sorted = c;
    }
    l && tm(this, _);
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
        x: o.parse(Vi(x, u), _),
        y: l.parse(Vi(x, c), _)
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
      keys: Zv(r, !0),
      values: n._stacks[t.axis]._visualValues
    };
    return Qp(u, l, o.index, {
      mode: i
    });
  }
  updateRangeFromParsed(t, n, i, r) {
    const o = i[n.axis];
    let l = o === null ? NaN : o;
    const u = r && i._stacks[n.axis];
    r && u && (r.values = u, l = Qp(r, o, this._cachedMeta.index)), t.min = Math.min(t.min, l), t.max = Math.max(t.max, l);
  }
  getMinMax(t, n) {
    const i = this._cachedMeta, r = i._parsed, o = i._sorted && t === i.iScale, l = r.length, u = this._getOtherScale(t), c = kk(n, i, this.chart), d = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: p, max: g } = yk(u);
    let _, x;
    function S() {
      x = r[_];
      const b = x[u.axis];
      return !ae(x[t.axis]) || p > b || g < b;
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
    this.update(t || "default"), n._clip = gk(ot(this.options.clip, mk(n.xScale, n.yScale, this.getMaxOverflow())));
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
      o = l.$context || (l.$context = bk(this.getContext(), t, l)), o.parsed = this.getParsed(t), o.raw = r.data[t], o.index = o.dataIndex = t;
    } else
      o = this.$context || (this.$context = wk(this.chart.getContext(), this.index)), o.dataset = r, o.index = o.datasetIndex = this.index;
    return o.active = !!n, o.mode = i, o;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, n) {
    return this._resolveElementOptions(this.dataElementType.id, n, t);
  }
  _resolveElementOptions(t, n = "default", i) {
    const r = n === "active", o = this._cachedDataOpts, l = t + "-" + n, u = o[l], c = this.enableOptionSharing && eo(i);
    if (u)
      return em(u, c);
    const d = this.chart.config, p = d.datasetElementScopeKeys(this._type, t), g = r ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], _ = d.getOptionScopes(this.getDataset(), p), x = Object.keys(Ft.elements[t]), S = () => this.getContext(i, r, n), b = d.resolveNamedOptions(_, x, S, g);
    return b.$shared && (b.$shared = c, o[l] = Object.freeze(em(b, c))), b;
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
    const d = new Vv(r, c && c.animations);
    return c && c._cacheable && (o[l] = Object.freeze(d)), d;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, n) {
    return !n || Du(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, n) {
    const i = this.resolveDataElementOptions(t, n), r = this._sharedOptions, o = this.getSharedOptions(i), l = this.includeOptions(n, o) || o !== r;
    return this.updateSharedOptions(o, n, i), {
      sharedOptions: o,
      includeOptions: l
    };
  }
  updateElement(t, n, i, r) {
    Du(r) ? Object.assign(t, i) : this._resolveAnimations(n, r).update(t, i);
  }
  updateSharedOptions(t, n, i) {
    t && !Du(n) && this._resolveAnimations(void 0, n).update(t, i);
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
      i._stacked && ur(i, r);
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
Y(Ri, "defaults", {}), Y(Ri, "datasetElementType", null), Y(Ri, "dataElementType", null);
function Sk(e, t) {
  if (!e._cache.$bar) {
    const n = e.getMatchingVisibleMetas(t);
    let i = [];
    for (let r = 0, o = n.length; r < o; r++)
      i = i.concat(n[r].controller.getAllParsedValues(e));
    e._cache.$bar = Pv(i.sort((r, o) => r - o));
  }
  return e._cache.$bar;
}
function Pk(e) {
  const t = e.iScale, n = Sk(t, e.type);
  let i = t._length, r, o, l, u;
  const c = () => {
    l === 32767 || l === -32768 || (eo(u) && (i = Math.min(i, Math.abs(l - u) || i)), u = l);
  };
  for (r = 0, o = n.length; r < o; ++r)
    l = t.getPixelForValue(n[r]), c();
  for (u = void 0, r = 0, o = t.ticks.length; r < o; ++r)
    l = t.getPixelForTick(r), c();
  return i;
}
function Mk(e, t, n, i) {
  const r = n.barThickness;
  let o, l;
  return xt(r) ? (o = t.min * n.categoryPercentage, l = n.barPercentage) : (o = r * i, l = 1), {
    chunk: o / i,
    ratio: l,
    start: t.pixels[e] - o / 2
  };
}
function Ck(e, t, n, i) {
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
function Lk(e, t, n, i) {
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
function Uv(e, t, n, i) {
  return Ut(e) ? Lk(e, t, n, i) : t[n.axis] = n.parse(e, i), t;
}
function nm(e, t, n, i) {
  const r = e.iScale, o = e.vScale, l = r.getLabels(), u = r === o, c = [];
  let d, p, g, _;
  for (d = n, p = n + i; d < p; ++d)
    _ = t[d], g = {}, g[r.axis] = u || r.parse(l[d], d), c.push(Uv(_, g, o, d));
  return c;
}
function Ru(e) {
  return e && e.barStart !== void 0 && e.barEnd !== void 0;
}
function Tk(e, t, n) {
  return e !== 0 ? gn(e) : (t.isHorizontal() ? 1 : -1) * (t.min >= n ? 1 : -1);
}
function Ek(e) {
  let t, n, i, r, o;
  return e.horizontal ? (t = e.base > e.x, n = "left", i = "right") : (t = e.base < e.y, n = "bottom", i = "top"), t ? (r = "end", o = "start") : (r = "start", o = "end"), {
    start: n,
    end: i,
    reverse: t,
    top: r,
    bottom: o
  };
}
function zk(e, t, n, i) {
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
  const { start: l, end: u, reverse: c, top: d, bottom: p } = Ek(e);
  r === "middle" && n && (e.enableBorderRadius = !0, (n._top || 0) === i ? r = d : (n._bottom || 0) === i ? r = p : (o[im(p, l, u, c)] = !0, r = d)), o[im(r, l, u, c)] = !0, e.borderSkipped = o;
}
function im(e, t, n, i) {
  return i ? (e = Ok(e, t, n), e = sm(e, n, t)) : e = sm(e, t, n), e;
}
function Ok(e, t, n) {
  return e === t ? n : e === n ? t : e;
}
function sm(e, t, n) {
  return e === "start" ? t : e === "end" ? n : e;
}
function Nk(e, { inflateAmount: t }, n) {
  e.inflateAmount = t === "auto" ? n === 1 ? 0.33 : 0 : t;
}
class ba extends Ri {
  parsePrimitiveData(t, n, i, r) {
    return nm(t, n, i, r);
  }
  parseArrayData(t, n, i, r) {
    return nm(t, n, i, r);
  }
  parseObjectData(t, n, i, r) {
    const { iScale: o, vScale: l } = t, { xAxisKey: u = "x", yAxisKey: c = "y" } = this._parsing, d = o.axis === "x" ? u : c, p = l.axis === "x" ? u : c, g = [];
    let _, x, S, b;
    for (_ = i, x = i + r; _ < x; ++_)
      b = n[_], S = {}, S[o.axis] = o.parse(Vi(b, d), _), g.push(Uv(Vi(b, p), S, l, _));
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
    const n = this._cachedMeta, { iScale: i, vScale: r } = n, o = this.getParsed(t), l = o._custom, u = Ru(l) ? "[" + l.start + ", " + l.end + "]" : "" + r.getLabelForValue(o[r.axis]);
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
      const S = this.getParsed(x), b = o || xt(S[u.axis]) ? {
        base: c,
        head: c
      } : this._calculateBarValuePixels(x), C = this._calculateBarIndexPixels(x, p), w = (S._stacks || {})[u.axis], k = {
        horizontal: d,
        base: b.base,
        enableBorderRadius: !w || Ru(S._custom) || l === w._top || l === w._bottom,
        x: d ? b.head : C.center,
        y: d ? C.center : b.head,
        height: d ? C.size : Math.abs(b.size),
        width: d ? Math.abs(b.size) : C.size
      };
      _ && (k.options = g || this.resolveDataElementOptions(x, t[x].active ? "active" : r));
      const P = k.options || t[x].options;
      zk(k, P, w, l), Nk(k, P, p.ratio), this.updateElement(t[x], x, k, r);
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
      t[ot(this.chart.options.indexAxis === "x" ? i.xAxisID : i.yAxisID, n)] = !0;
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
      min: u || Pk(n),
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
    const { _cachedMeta: { vScale: n, _stacked: i, index: r }, options: { base: o, minBarLength: l } } = this, u = o || 0, c = this.getParsed(t), d = c._custom, p = Ru(d);
    let g = c[n.axis], _ = 0, x = i ? this.applyStack(n, c, i) : g, S, b;
    x !== g && (_ = x - g, x = g), p && (g = d.barStart, x = d.barEnd - d.barStart, g !== 0 && gn(g) !== gn(d.barEnd) && (_ = 0), _ += g);
    const C = !xt(o) && !p ? o : _;
    let w = n.getPixelForValue(C);
    if (this.chart.getDataVisibility(t) ? S = n.getPixelForValue(_ + x) : S = w, b = S - w, Math.abs(b) < l) {
      b = Tk(b, n, u) * l, g === u && (w -= b / 2);
      const k = n.getPixelForDecimal(0), P = n.getPixelForDecimal(1), T = Math.min(k, P), E = Math.max(k, P);
      w = Math.max(Math.min(w, E), T), S = w + b, i && !p && (c._stacks[n.axis]._visualValues[r] = n.getValueForPixel(S) - n.getValueForPixel(w));
    }
    if (w === n.getPixelForValue(u)) {
      const k = gn(b) * n.getLineWidthForValue(u) / 2;
      w += k, b -= k;
    }
    return {
      size: b,
      base: w,
      head: S,
      center: S + b / 2
    };
  }
  _calculateBarIndexPixels(t, n) {
    const i = n.scale, r = this.options, o = r.skipNull, l = ot(r.maxBarThickness, 1 / 0);
    let u, c;
    const d = this._getAxisCount();
    if (n.grouped) {
      const p = o ? this._getStackCount(t) : n.stackCount, g = r.barThickness === "flex" ? Ck(t, n, r, p * d) : Mk(t, n, r, p * d), _ = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, x = this._getAxis().indexOf(ot(_, this.getFirstScaleIdForIndexAxis())), S = this._getStackIndex(this.index, this._cachedMeta.stack, o ? t : void 0) + x;
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
Y(ba, "id", "bar"), Y(ba, "defaults", {
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
}), Y(ba, "overrides", {
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
function Ak(e, t, n) {
  let i = 1, r = 1, o = 0, l = 0;
  if (t < At) {
    const u = e, c = u + t, d = Math.cos(u), p = Math.sin(u), g = Math.cos(c), _ = Math.sin(c), x = (P, T, E) => io(P, u, c, !0) ? 1 : Math.max(T, T * n, E, E * n), S = (P, T, E) => io(P, u, c, !0) ? -1 : Math.min(T, T * n, E, E * n), b = x(0, d, g), C = x(Yt, p, _), w = S(St, d, g), k = S(St + Yt, p, _);
    i = (b - w) / 2, r = (C - k) / 2, o = -(b + w) / 2, l = -(C + k) / 2;
  }
  return {
    ratioX: i,
    ratioY: r,
    offsetX: o,
    offsetY: l
  };
}
class yr extends Ri {
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
      if (pt(i[t])) {
        const { key: c = "value" } = this._parsing;
        o = (d) => +Vi(i[d], c);
      }
      let l, u;
      for (l = t, u = t + n; l < u; ++l)
        r._parsed[l] = o(l);
    }
  }
  _getRotation() {
    return Tn(this.options.rotation - 90);
  }
  _getCircumference() {
    return Tn(this.options.circumference);
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
    const n = this.chart, { chartArea: i } = n, r = this._cachedMeta, o = r.data, l = this.getMaxBorderWidth() + this.getMaxOffset(o) + this.options.spacing, u = Math.max((Math.min(i.width, i.height) - l) / 2, 0), c = Math.min(Ww(this.options.cutout, u), 1), d = this._getRingWeight(this.index), { circumference: p, rotation: g } = this._getRotationExtents(), { ratioX: _, ratioY: x, offsetX: S, offsetY: b } = Ak(g, p, c), C = (i.width - l) / _, w = (i.height - l) / x, k = Math.max(Math.min(C, w) / 2, 0), P = xv(this.options.radius, k), T = Math.max(P * c, 0), E = (P - T) / this._getVisibleDatasetWeightTotal();
    this.offsetX = S * P, this.offsetY = b * P, r.total = this.calculateTotal(), this.outerRadius = P - E * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - E * d, 0), this.updateElements(o, 0, o.length, t);
  }
  _circumference(t, n) {
    const i = this.options, r = this._cachedMeta, o = this._getCircumference();
    return n && i.animation.animateRotate || !this.chart.getDataVisibility(t) || r._parsed[t] === null || r.data[t].hidden ? 0 : this.calculateCircumference(r._parsed[t] * o / At);
  }
  updateElements(t, n, i, r) {
    const o = r === "reset", l = this.chart, u = l.chartArea, d = l.options.animation, p = (u.left + u.right) / 2, g = (u.top + u.bottom) / 2, _ = o && d.animateScale, x = _ ? 0 : this.innerRadius, S = _ ? 0 : this.outerRadius, { sharedOptions: b, includeOptions: C } = this._getSharedOptions(n, r);
    let w = this._getRotation(), k;
    for (k = 0; k < n; ++k)
      w += this._circumference(k, o);
    for (k = n; k < n + i; ++k) {
      const P = this._circumference(k, o), T = t[k], E = {
        x: p + this.offsetX,
        y: g + this.offsetY,
        startAngle: w,
        endAngle: w + P,
        circumference: P,
        outerRadius: S,
        innerRadius: x
      };
      C && (E.options = b || this.resolveDataElementOptions(k, T.active ? "active" : r)), w += P, this.updateElement(T, k, E, r);
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
    const n = this._cachedMeta, i = this.chart, r = i.data.labels || [], o = td(n._parsed[t], i.options.locale);
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
    return Math.max(ot(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
Y(yr, "id", "doughnut"), Y(yr, "defaults", {
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
}), Y(yr, "descriptors", {
  _scriptable: (t) => t !== "spacing",
  _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
}), Y(yr, "overrides", {
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
class ka extends Ri {
  initialize() {
    this.enableOptionSharing = !0, this.supportsDecimation = !0, super.initialize();
  }
  update(t) {
    const n = this._cachedMeta, { dataset: i, data: r = [], _dataset: o } = n, l = this.chart._animationsDisabled;
    let { start: u, count: c } = lb(n, r, l);
    this._drawStart = u, this._drawCount = c, ub(n) && (u = 0, c = r.length), i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!o._decimated, i.points = r;
    const d = this.resolveDatasetElementOptions(t);
    this.options.showLine || (d.borderWidth = 0), d.segment = this.options.segment, this.updateElement(i, void 0, {
      animated: !l,
      options: d
    }, t), this.updateElements(r, u, c, t);
  }
  updateElements(t, n, i, r) {
    const o = r === "reset", { iScale: l, vScale: u, _stacked: c, _dataset: d } = this._cachedMeta, { sharedOptions: p, includeOptions: g } = this._getSharedOptions(n, r), _ = l.axis, x = u.axis, { spanGaps: S, segment: b } = this.options, C = no(S) ? S : Number.POSITIVE_INFINITY, w = this.chart._animationsDisabled || o || r === "none", k = n + i, P = t.length;
    let T = n > 0 && this.getParsed(n - 1);
    for (let E = 0; E < P; ++E) {
      const N = t[E], A = w ? N : {};
      if (E < n || E >= k) {
        A.skip = !0;
        continue;
      }
      const I = this.getParsed(E), H = xt(I[x]), B = A[_] = l.getPixelForValue(I[_], E), W = A[x] = o || H ? u.getBasePixel() : u.getPixelForValue(c ? this.applyStack(u, I, c) : I[x], E);
      A.skip = isNaN(B) || isNaN(W) || H, A.stop = E > 0 && Math.abs(I[_] - T[_]) > C, b && (A.parsed = I, A.raw = d.data[E]), g && (A.options = p || this.resolveDataElementOptions(E, N.active ? "active" : r)), w || this.updateElement(N, E, A, r), T = I;
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
function Pi() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class ad {
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
    Object.assign(ad.prototype, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return Pi();
  }
  parse() {
    return Pi();
  }
  format() {
    return Pi();
  }
  add() {
    return Pi();
  }
  diff() {
    return Pi();
  }
  startOf() {
    return Pi();
  }
  endOf() {
    return Pi();
  }
}
var Ik = {
  _date: ad
};
function Dk(e, t, n, i) {
  const { controller: r, data: o, _sorted: l } = e, u = r._cachedMeta.iScale, c = e.dataset && e.dataset.options ? e.dataset.options.spanGaps : null;
  if (u && t === u.axis && t !== "r" && l && o.length) {
    const d = u._reversePixels ? ib : Ni;
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
        const { vScale: g } = r._cachedMeta, { _parsed: _ } = e, x = _.slice(0, p.lo + 1).reverse().findIndex((b) => !xt(b[g.axis]));
        p.lo -= Math.max(0, x);
        const S = _.slice(p.hi).findIndex((b) => !xt(b[g.axis]));
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
function Ml(e, t, n, i, r) {
  const o = e.getSortedVisibleDatasetMetas(), l = n[t];
  for (let u = 0, c = o.length; u < c; ++u) {
    const { index: d, data: p } = o[u], { lo: g, hi: _ } = Dk(o[u], t, l, r);
    for (let x = g; x <= _; ++x) {
      const S = p[x];
      S.skip || i(S, d, x);
    }
  }
}
function Rk(e) {
  const t = e.indexOf("x") !== -1, n = e.indexOf("y") !== -1;
  return function(i, r) {
    const o = t ? Math.abs(i.x - r.x) : 0, l = n ? Math.abs(i.y - r.y) : 0;
    return Math.sqrt(Math.pow(o, 2) + Math.pow(l, 2));
  };
}
function ju(e, t, n, i, r) {
  const o = [];
  return !r && !e.isPointInArea(t) || Ml(e, n, t, function(u, c, d) {
    !r && !so(u, e.chartArea, 0) || u.inRange(t.x, t.y, i) && o.push({
      element: u,
      datasetIndex: c,
      index: d
    });
  }, !0), o;
}
function jk(e, t, n, i) {
  let r = [];
  function o(l, u, c) {
    const { startAngle: d, endAngle: p } = l.getProps([
      "startAngle",
      "endAngle"
    ], i), { angle: g } = kv(l, {
      x: t.x,
      y: t.y
    });
    io(g, d, p) && r.push({
      element: l,
      datasetIndex: u,
      index: c
    });
  }
  return Ml(e, n, t, o), r;
}
function Bk(e, t, n, i, r, o) {
  let l = [];
  const u = Rk(n);
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
  return Ml(e, n, t, d), l;
}
function Bu(e, t, n, i, r, o) {
  return !o && !e.isPointInArea(t) ? [] : n === "r" && !i ? jk(e, t, n, r) : Bk(e, t, n, i, r, o);
}
function rm(e, t, n, i, r) {
  const o = [], l = n === "x" ? "inXRange" : "inYRange";
  let u = !1;
  return Ml(e, n, t, (c, d, p) => {
    c[l] && c[l](t[n], r) && (o.push({
      element: c,
      datasetIndex: d,
      index: p
    }), u = u || c.inRange(t.x, t.y, r));
  }), i && !u ? [] : o;
}
var Fk = {
  modes: {
    index(e, t, n, i) {
      const r = Li(t, e), o = n.axis || "x", l = n.includeInvisible || !1, u = n.intersect ? ju(e, r, o, i, l) : Bu(e, r, o, !1, i, l), c = [];
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
      const r = Li(t, e), o = n.axis || "xy", l = n.includeInvisible || !1;
      let u = n.intersect ? ju(e, r, o, i, l) : Bu(e, r, o, !1, i, l);
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
      const r = Li(t, e), o = n.axis || "xy", l = n.includeInvisible || !1;
      return ju(e, r, o, i, l);
    },
    nearest(e, t, n, i) {
      const r = Li(t, e), o = n.axis || "xy", l = n.includeInvisible || !1;
      return Bu(e, r, o, n.intersect, i, l);
    },
    x(e, t, n, i) {
      const r = Li(t, e);
      return rm(e, r, "x", n.intersect, i);
    },
    y(e, t, n, i) {
      const r = Li(t, e);
      return rm(e, r, "y", n.intersect, i);
    }
  }
};
const $v = [
  "left",
  "top",
  "right",
  "bottom"
];
function cr(e, t) {
  return e.filter((n) => n.pos === t);
}
function om(e, t) {
  return e.filter((n) => $v.indexOf(n.pos) === -1 && n.box.axis === t);
}
function hr(e, t) {
  return e.sort((n, i) => {
    const r = t ? i : n, o = t ? n : i;
    return r.weight === o.weight ? r.index - o.index : r.weight - o.weight;
  });
}
function Hk(e) {
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
function Wk(e) {
  const t = {};
  for (const n of e) {
    const { stack: i, pos: r, stackWeight: o } = n;
    if (!i || !$v.includes(r))
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
function Vk(e, t) {
  const n = Wk(e), { vBoxMaxWidth: i, hBoxMaxHeight: r } = t;
  let o, l, u;
  for (o = 0, l = e.length; o < l; ++o) {
    u = e[o];
    const { fullSize: c } = u.box, d = n[u.stack], p = d && u.stackWeight / d.weight;
    u.horizontal ? (u.width = p ? p * i : c && t.availableWidth, u.height = r) : (u.width = i, u.height = p ? p * r : c && t.availableHeight);
  }
  return n;
}
function Zk(e) {
  const t = Hk(e), n = hr(t.filter((d) => d.box.fullSize), !0), i = hr(cr(t, "left"), !0), r = hr(cr(t, "right")), o = hr(cr(t, "top"), !0), l = hr(cr(t, "bottom")), u = om(t, "x"), c = om(t, "y");
  return {
    fullSize: n,
    leftAndTop: i.concat(o),
    rightAndBottom: r.concat(c).concat(l).concat(u),
    chartArea: cr(t, "chartArea"),
    vertical: i.concat(r).concat(c),
    horizontal: o.concat(l).concat(u)
  };
}
function am(e, t, n, i) {
  return Math.max(e[n], t[n]) + Math.max(e[i], t[i]);
}
function Yv(e, t) {
  e.top = Math.max(e.top, t.top), e.left = Math.max(e.left, t.left), e.bottom = Math.max(e.bottom, t.bottom), e.right = Math.max(e.right, t.right);
}
function Uk(e, t, n, i) {
  const { pos: r, box: o } = n, l = e.maxPadding;
  if (!pt(r)) {
    n.size && (e[r] -= n.size);
    const g = i[n.stack] || {
      size: 0,
      count: 1
    };
    g.size = Math.max(g.size, n.horizontal ? o.height : o.width), n.size = g.size / g.count, e[r] += n.size;
  }
  o.getPadding && Yv(l, o.getPadding());
  const u = Math.max(0, t.outerWidth - am(l, e, "left", "right")), c = Math.max(0, t.outerHeight - am(l, e, "top", "bottom")), d = u !== e.w, p = c !== e.h;
  return e.w = u, e.h = c, n.horizontal ? {
    same: d,
    other: p
  } : {
    same: p,
    other: d
  };
}
function $k(e) {
  const t = e.maxPadding;
  function n(i) {
    const r = Math.max(t[i] - e[i], 0);
    return e[i] += r, r;
  }
  e.y += n("top"), e.x += n("left"), n("right"), n("bottom");
}
function Yk(e, t) {
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
function xr(e, t, n, i) {
  const r = [];
  let o, l, u, c, d, p;
  for (o = 0, l = e.length, d = 0; o < l; ++o) {
    u = e[o], c = u.box, c.update(u.width || t.w, u.height || t.h, Yk(u.horizontal, t));
    const { same: g, other: _ } = Uk(t, n, u, i);
    d |= g && r.length, p = p || _, c.fullSize || r.push(u);
  }
  return d && xr(r, t, n, i) || p;
}
function na(e, t, n, i, r) {
  e.top = n, e.left = t, e.right = t + i, e.bottom = n + r, e.width = i, e.height = r;
}
function lm(e, t, n, i) {
  const r = n.padding;
  let { x: o, y: l } = t;
  for (const u of e) {
    const c = u.box, d = i[u.stack] || {
      placed: 0,
      weight: 1
    }, p = u.stackWeight / d.weight || 1;
    if (u.horizontal) {
      const g = t.w * p, _ = d.size || c.height;
      eo(d.start) && (l = d.start), c.fullSize ? na(c, r.left, l, n.outerWidth - r.right - r.left, _) : na(c, t.left + d.placed, l, g, _), d.start = l, d.placed += g, l = c.bottom;
    } else {
      const g = t.h * p, _ = d.size || c.width;
      eo(d.start) && (o = d.start), c.fullSize ? na(c, o, r.top, _, n.outerHeight - r.bottom - r.top) : na(c, o, t.top + d.placed, _, g), d.start = o, d.placed += g, o = c.right;
    }
  }
  t.x = o, t.y = l;
}
var Jn = {
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
    const r = en(e.options.layout.padding), o = Math.max(t - r.width, 0), l = Math.max(n - r.height, 0), u = Zk(e.boxes), c = u.vertical, d = u.horizontal;
    wt(e.boxes, (b) => {
      typeof b.beforeLayout == "function" && b.beforeLayout();
    });
    const p = c.reduce((b, C) => C.box.options && C.box.options.display === !1 ? b : b + 1, 0) || 1, g = Object.freeze({
      outerWidth: t,
      outerHeight: n,
      padding: r,
      availableWidth: o,
      availableHeight: l,
      vBoxMaxWidth: o / 2 / p,
      hBoxMaxHeight: l / 2
    }), _ = Object.assign({}, r);
    Yv(_, en(i));
    const x = Object.assign({
      maxPadding: _,
      w: o,
      h: l,
      x: r.left,
      y: r.top
    }, r), S = Vk(c.concat(d), g);
    xr(u.fullSize, x, g, S), xr(c, x, g, S), xr(d, x, g, S) && xr(c, x, g, S), $k(x), lm(u.leftAndTop, x, g, S), x.x += x.w, x.y += x.h, lm(u.rightAndBottom, x, g, S), e.chartArea = {
      left: x.left,
      top: x.top,
      right: x.left + x.w,
      bottom: x.top + x.h,
      height: x.h,
      width: x.w
    }, wt(u.chartArea, (b) => {
      const C = b.box;
      Object.assign(C, e.chartArea), C.update(x.w, x.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Kv {
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
class Kk extends Kv {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const Sa = "$chartjs", Xk = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, um = (e) => e === null || e === "";
function Gk(e, t) {
  const n = e.style, i = e.getAttribute("height"), r = e.getAttribute("width");
  if (e[Sa] = {
    initial: {
      height: i,
      width: r,
      style: {
        display: n.display,
        height: n.height,
        width: n.width
      }
    }
  }, n.display = n.display || "block", n.boxSizing = n.boxSizing || "border-box", um(r)) {
    const o = $p(e, "width");
    o !== void 0 && (e.width = o);
  }
  if (um(i))
    if (e.style.height === "")
      e.height = e.width / (t || 2);
    else {
      const o = $p(e, "height");
      o !== void 0 && (e.height = o);
    }
  return e;
}
const Xv = Qb ? {
  passive: !0
} : !1;
function qk(e, t, n) {
  e && e.addEventListener(t, n, Xv);
}
function Qk(e, t, n) {
  e && e.canvas && e.canvas.removeEventListener(t, n, Xv);
}
function Jk(e, t) {
  const n = Xk[e.type] || e.type, { x: i, y: r } = Li(e, t);
  return {
    type: n,
    chart: t,
    native: e,
    x: i !== void 0 ? i : null,
    y: r !== void 0 ? r : null
  };
}
function sl(e, t) {
  for (const n of e)
    if (n === t || n.contains(t))
      return !0;
}
function tS(e, t, n) {
  const i = e.canvas, r = new MutationObserver((o) => {
    let l = !1;
    for (const u of o)
      l = l || sl(u.addedNodes, i), l = l && !sl(u.removedNodes, i);
    l && n();
  });
  return r.observe(document, {
    childList: !0,
    subtree: !0
  }), r;
}
function eS(e, t, n) {
  const i = e.canvas, r = new MutationObserver((o) => {
    let l = !1;
    for (const u of o)
      l = l || sl(u.removedNodes, i), l = l && !sl(u.addedNodes, i);
    l && n();
  });
  return r.observe(document, {
    childList: !0,
    subtree: !0
  }), r;
}
const ro = /* @__PURE__ */ new Map();
let cm = 0;
function Gv() {
  const e = window.devicePixelRatio;
  e !== cm && (cm = e, ro.forEach((t, n) => {
    n.currentDevicePixelRatio !== e && t();
  }));
}
function nS(e, t) {
  ro.size || window.addEventListener("resize", Gv), ro.set(e, t);
}
function iS(e) {
  ro.delete(e), ro.size || window.removeEventListener("resize", Gv);
}
function sS(e, t, n) {
  const i = e.canvas, r = i && od(i);
  if (!r)
    return;
  const o = Cv((u, c) => {
    const d = r.clientWidth;
    n(u, c), d < r.clientWidth && n();
  }, window), l = new ResizeObserver((u) => {
    const c = u[0], d = c.contentRect.width, p = c.contentRect.height;
    d === 0 && p === 0 || o(d, p);
  });
  return l.observe(r), nS(e, o), l;
}
function Fu(e, t, n) {
  n && n.disconnect(), t === "resize" && iS(e);
}
function rS(e, t, n) {
  const i = e.canvas, r = Cv((o) => {
    e.ctx !== null && n(Jk(o, e));
  }, e);
  return qk(i, t, r), r;
}
class oS extends Kv {
  acquireContext(t, n) {
    const i = t && t.getContext && t.getContext("2d");
    return i && i.canvas === t ? (Gk(t, n), i) : null;
  }
  releaseContext(t) {
    const n = t.canvas;
    if (!n[Sa])
      return !1;
    const i = n[Sa].initial;
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
    }), n.width = n.width, delete n[Sa], !0;
  }
  addEventListener(t, n, i) {
    this.removeEventListener(t, n);
    const r = t.$proxies || (t.$proxies = {}), l = {
      attach: tS,
      detach: eS,
      resize: sS
    }[n] || rS;
    r[n] = l(t, n, i);
  }
  removeEventListener(t, n) {
    const i = t.$proxies || (t.$proxies = {}), r = i[n];
    if (!r)
      return;
    ({
      attach: Fu,
      detach: Fu,
      resize: Fu
    }[n] || Qk)(t, n, r), i[n] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, n, i, r) {
    return qb(t, n, i, r);
  }
  isAttached(t) {
    const n = t && od(t);
    return !!(n && n.isConnected);
  }
}
function aS(e) {
  return !rd() || typeof OffscreenCanvas < "u" && e instanceof OffscreenCanvas ? Kk : oS;
}
var ua;
let _i = (ua = class {
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
    return no(this.x) && no(this.y);
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
}, Y(ua, "defaults", {}), Y(ua, "defaultRoutes"), ua);
function lS(e, t) {
  const n = e.options.ticks, i = uS(e), r = Math.min(n.maxTicksLimit || i, i), o = n.major.enabled ? hS(t) : [], l = o.length, u = o[0], c = o[l - 1], d = [];
  if (l > r)
    return dS(t, d, o, l / r), d;
  const p = cS(o, t, r);
  if (l > 0) {
    let g, _;
    const x = l > 1 ? Math.round((c - u) / (l - 1)) : null;
    for (ia(t, d, p, xt(x) ? 0 : u - x, u), g = 0, _ = l - 1; g < _; g++)
      ia(t, d, p, o[g], o[g + 1]);
    return ia(t, d, p, c, xt(x) ? t.length : c + x), d;
  }
  return ia(t, d, p), d;
}
function uS(e) {
  const t = e.options.offset, n = e._tickSize(), i = e._length / n + (t ? 0 : 1), r = e._maxLength / n;
  return Math.floor(Math.min(i, r));
}
function cS(e, t, n) {
  const i = fS(e), r = t.length / n;
  if (!i)
    return Math.max(r, 1);
  const o = Gw(i);
  for (let l = 0, u = o.length - 1; l < u; l++) {
    const c = o[l];
    if (c > r)
      return c;
  }
  return Math.max(r, 1);
}
function hS(e) {
  const t = [];
  let n, i;
  for (n = 0, i = e.length; n < i; n++)
    e[n].major && t.push(n);
  return t;
}
function dS(e, t, n, i) {
  let r = 0, o = n[0], l;
  for (i = Math.ceil(i), l = 0; l < e.length; l++)
    l === o && (t.push(e[l]), r++, o = n[r * i]);
}
function ia(e, t, n, i, r) {
  const o = ot(i, 0), l = Math.min(ot(r, e.length), e.length);
  let u = 0, c, d, p;
  for (n = Math.ceil(n), r && (c = r - i, n = c / Math.floor(c / n)), p = o; p < 0; )
    u++, p = Math.round(o + u * n);
  for (d = Math.max(o, 0); d < l; d++)
    d === p && (t.push(e[d]), u++, p = Math.round(o + u * n));
}
function fS(e) {
  const t = e.length;
  let n, i;
  if (t < 2)
    return !1;
  for (i = e[0], n = 1; n < t; ++n)
    if (e[n] - e[n - 1] !== i)
      return !1;
  return i;
}
const pS = (e) => e === "left" ? "right" : e === "right" ? "left" : e, hm = (e, t, n) => t === "top" || t === "left" ? e[t] + n : e[t] - n, dm = (e, t) => Math.min(t || e, e);
function fm(e, t) {
  const n = [], i = e.length / t, r = e.length;
  let o = 0;
  for (; o < r; o += i)
    n.push(e[Math.floor(o)]);
  return n;
}
function mS(e, t, n) {
  const i = e.ticks.length, r = Math.min(t, i - 1), o = e._startPixel, l = e._endPixel, u = 1e-6;
  let c = e.getPixelForTick(r), d;
  if (!(n && (i === 1 ? d = Math.max(c - o, l - c) : t === 0 ? d = (e.getPixelForTick(1) - c) / 2 : d = (c - e.getPixelForTick(r - 1)) / 2, c += r < t ? d : -d, c < o - u || c > l + u)))
    return c;
}
function gS(e, t) {
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
function dr(e) {
  return e.drawTicks ? e.tickLength : 0;
}
function pm(e, t) {
  if (!e.display)
    return 0;
  const n = xe(e.font, t), i = en(e.padding);
  return (Ut(e.text) ? e.text.length : 1) * n.lineHeight + i.height;
}
function _S(e, t) {
  return Yi(e, {
    scale: t,
    type: "scale"
  });
}
function vS(e, t, n) {
  return Yi(e, {
    tick: n,
    index: t,
    type: "tick"
  });
}
function yS(e, t, n) {
  let i = Lv(e);
  return (n && t !== "right" || !n && t === "right") && (i = pS(i)), i;
}
function xS(e, t, n, i) {
  const { top: r, left: o, bottom: l, right: u, chart: c } = e, { chartArea: d, scales: p } = c;
  let g = 0, _, x, S;
  const b = l - r, C = u - o;
  if (e.isHorizontal()) {
    if (x = Pe(i, o, u), pt(n)) {
      const w = Object.keys(n)[0], k = n[w];
      S = p[w].getPixelForValue(k) + b - t;
    } else n === "center" ? S = (d.bottom + d.top) / 2 + b - t : S = hm(e, n, t);
    _ = u - o;
  } else {
    if (pt(n)) {
      const w = Object.keys(n)[0], k = n[w];
      x = p[w].getPixelForValue(k) - C + t;
    } else n === "center" ? x = (d.left + d.right) / 2 - C + t : x = hm(e, n, t);
    S = Pe(i, l, r), g = n === "left" ? -Yt : Yt;
  }
  return {
    titleX: x,
    titleY: S,
    maxWidth: _,
    rotation: g
  };
}
class Bs extends _i {
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
    return t = un(t, Number.POSITIVE_INFINITY), n = un(n, Number.NEGATIVE_INFINITY), i = un(i, Number.POSITIVE_INFINITY), r = un(r, Number.NEGATIVE_INFINITY), {
      min: un(t, i),
      max: un(n, r),
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
      min: un(n, un(i, n)),
      max: un(i, un(n, i))
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
    }, i), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + i.left + i.right : this.height + i.top + i.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Tb(this, o, r), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const c = u < this.ticks.length;
    this._convertTicksToLabels(c ? fm(this.ticks, u) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), l.display && (l.autoSkip || l.source === "auto") && (this.ticks = lS(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
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
    const t = this.options, n = t.ticks, i = dm(this.ticks.length, t.ticks.maxTicksLimit), r = n.minRotation || 0, o = n.maxRotation;
    let l = r, u, c, d;
    if (!this._isVisible() || !n.display || r >= o || i <= 1 || !this.isHorizontal()) {
      this.labelRotation = r;
      return;
    }
    const p = this._getLabelSizes(), g = p.widest.width, _ = p.highest.height, x = re(this.chart.width - g, 0, this.maxWidth);
    u = t.offset ? this.maxWidth / i : x / (i - 1), g + 6 > u && (u = x / (i - (t.offset ? 0.5 : 1)), c = this.maxHeight - dr(t.grid) - n.padding - pm(t.title, this.chart.options.font), d = Math.sqrt(g * g + _ * _), l = tb(Math.min(Math.asin(re((p.highest.height + 6) / u, -1, 1)), Math.asin(re(c / d, -1, 1)) - Math.asin(re(_ / d, -1, 1)))), l = Math.max(r, Math.min(o, l))), this.labelRotation = l;
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
      const c = pm(r, n.options.font);
      if (u ? (t.width = this.maxWidth, t.height = dr(o) + c) : (t.height = this.maxHeight, t.width = dr(o) + c), i.display && this.ticks.length) {
        const { first: d, last: p, widest: g, highest: _ } = this._getLabelSizes(), x = i.padding * 2, S = Tn(this.labelRotation), b = Math.cos(S), C = Math.sin(S);
        if (u) {
          const w = i.mirror ? 0 : C * g.width + b * _.height;
          t.height = Math.min(this.maxHeight, t.height + w + x);
        } else {
          const w = i.mirror ? 0 : b * g.width + C * _.height;
          t.width = Math.min(this.maxWidth, t.width + w + x);
        }
        this._calculatePadding(d, p, C, b);
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
      n < i.length && (i = fm(i, n)), this._labelSizes = t = this._computeLabelSizes(i, i.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, n, i) {
    const { ctx: r, _longestTextCache: o } = this, l = [], u = [], c = Math.floor(n / dm(n, i));
    let d = 0, p = 0, g, _, x, S, b, C, w, k, P, T, E;
    for (g = 0; g < n; g += c) {
      if (S = t[g].label, b = this._resolveTickFontOptions(g), r.font = C = b.string, w = o[C] = o[C] || {
        data: {},
        gc: []
      }, k = b.lineHeight, P = T = 0, !xt(S) && !Ut(S))
        P = Hp(r, w.data, w.gc, P, S), T = k;
      else if (Ut(S))
        for (_ = 0, x = S.length; _ < x; ++_)
          E = S[_], !xt(E) && !Ut(E) && (P = Hp(r, w.data, w.gc, P, E), T += k);
      l.push(P), u.push(T), d = Math.max(P, d), p = Math.max(T, p);
    }
    gS(o, n);
    const N = l.indexOf(d), A = u.indexOf(p), I = (H) => ({
      width: l[H] || 0,
      height: u[H] || 0
    });
    return {
      first: I(0),
      last: I(n - 1),
      widest: I(N),
      highest: I(A),
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
    return nb(this._alignToPixels ? Si(this.chart, n, 0) : n);
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
      return i.$context || (i.$context = vS(this.getContext(), t, i));
    }
    return this.$context || (this.$context = _S(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, n = Tn(this.labelRotation), i = Math.abs(Math.cos(n)), r = Math.abs(Math.sin(n)), o = this._getLabelSizes(), l = t.autoSkipPadding || 0, u = o ? o.widest.width + l : 0, c = o ? o.highest.height + l : 0;
    return this.isHorizontal() ? c * i > u * r ? u / i : c / r : c * r < u * i ? c / i : u / r;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const n = this.axis, i = this.chart, r = this.options, { grid: o, position: l, border: u } = r, c = o.offset, d = this.isHorizontal(), g = this.ticks.length + (c ? 1 : 0), _ = dr(o), x = [], S = u.setContext(this.getContext()), b = S.display ? S.width : 0, C = b / 2, w = function(J) {
      return Si(i, J, b);
    };
    let k, P, T, E, N, A, I, H, B, W, U, vt;
    if (l === "top")
      k = w(this.bottom), A = this.bottom - _, H = k - C, W = w(t.top) + C, vt = t.bottom;
    else if (l === "bottom")
      k = w(this.top), W = t.top, vt = w(t.bottom) - C, A = k + C, H = this.top + _;
    else if (l === "left")
      k = w(this.right), N = this.right - _, I = k - C, B = w(t.left) + C, U = t.right;
    else if (l === "right")
      k = w(this.left), B = t.left, U = w(t.right) - C, N = k + C, I = this.left + _;
    else if (n === "x") {
      if (l === "center")
        k = w((t.top + t.bottom) / 2 + 0.5);
      else if (pt(l)) {
        const J = Object.keys(l)[0], dt = l[J];
        k = w(this.chart.scales[J].getPixelForValue(dt));
      }
      W = t.top, vt = t.bottom, A = k + C, H = A + _;
    } else if (n === "y") {
      if (l === "center")
        k = w((t.left + t.right) / 2);
      else if (pt(l)) {
        const J = Object.keys(l)[0], dt = l[J];
        k = w(this.chart.scales[J].getPixelForValue(dt));
      }
      N = k - C, I = N - _, B = t.left, U = t.right;
    }
    const it = ot(r.ticks.maxTicksLimit, g), ht = Math.max(1, Math.ceil(g / it));
    for (P = 0; P < g; P += ht) {
      const J = this.getContext(P), dt = o.setContext(J), D = u.setContext(J), $ = dt.lineWidth, j = dt.color, X = D.dash || [], tt = D.dashOffset, kt = dt.tickWidth, lt = dt.tickColor, st = dt.tickBorderDash || [], q = dt.tickBorderDashOffset;
      T = mS(this, P, c), T !== void 0 && (E = Si(i, T, $), d ? N = I = B = U = E : A = H = W = vt = E, x.push({
        tx1: N,
        ty1: A,
        tx2: I,
        ty2: H,
        x1: B,
        y1: W,
        x2: U,
        y2: vt,
        width: $,
        color: j,
        borderDash: X,
        borderDashOffset: tt,
        tickWidth: kt,
        tickColor: lt,
        tickBorderDash: st,
        tickBorderDashOffset: q
      }));
    }
    return this._ticksLength = g, this._borderValue = k, x;
  }
  _computeLabelItems(t) {
    const n = this.axis, i = this.options, { position: r, ticks: o } = i, l = this.isHorizontal(), u = this.ticks, { align: c, crossAlign: d, padding: p, mirror: g } = o, _ = dr(i.grid), x = _ + p, S = g ? -p : x, b = -Tn(this.labelRotation), C = [];
    let w, k, P, T, E, N, A, I, H, B, W, U, vt = "middle";
    if (r === "top")
      N = this.bottom - S, A = this._getXAxisLabelAlignment();
    else if (r === "bottom")
      N = this.top + S, A = this._getXAxisLabelAlignment();
    else if (r === "left") {
      const ht = this._getYAxisLabelAlignment(_);
      A = ht.textAlign, E = ht.x;
    } else if (r === "right") {
      const ht = this._getYAxisLabelAlignment(_);
      A = ht.textAlign, E = ht.x;
    } else if (n === "x") {
      if (r === "center")
        N = (t.top + t.bottom) / 2 + x;
      else if (pt(r)) {
        const ht = Object.keys(r)[0], J = r[ht];
        N = this.chart.scales[ht].getPixelForValue(J) + x;
      }
      A = this._getXAxisLabelAlignment();
    } else if (n === "y") {
      if (r === "center")
        E = (t.left + t.right) / 2 - x;
      else if (pt(r)) {
        const ht = Object.keys(r)[0], J = r[ht];
        E = this.chart.scales[ht].getPixelForValue(J);
      }
      A = this._getYAxisLabelAlignment(_).textAlign;
    }
    n === "y" && (c === "start" ? vt = "top" : c === "end" && (vt = "bottom"));
    const it = this._getLabelSizes();
    for (w = 0, k = u.length; w < k; ++w) {
      P = u[w], T = P.label;
      const ht = o.setContext(this.getContext(w));
      I = this.getPixelForTick(w) + o.labelOffset, H = this._resolveTickFontOptions(w), B = H.lineHeight, W = Ut(T) ? T.length : 1;
      const J = W / 2, dt = ht.color, D = ht.textStrokeColor, $ = ht.textStrokeWidth;
      let j = A;
      l ? (E = I, A === "inner" && (w === k - 1 ? j = this.options.reverse ? "left" : "right" : w === 0 ? j = this.options.reverse ? "right" : "left" : j = "center"), r === "top" ? d === "near" || b !== 0 ? U = -W * B + B / 2 : d === "center" ? U = -it.highest.height / 2 - J * B + B : U = -it.highest.height + B / 2 : d === "near" || b !== 0 ? U = B / 2 : d === "center" ? U = it.highest.height / 2 - J * B : U = it.highest.height - W * B, g && (U *= -1), b !== 0 && !ht.showLabelBackdrop && (E += B / 2 * Math.sin(b))) : (N = I, U = (1 - W) * B / 2);
      let X;
      if (ht.showLabelBackdrop) {
        const tt = en(ht.backdropPadding), kt = it.heights[w], lt = it.widths[w];
        let st = U - tt.top, q = 0 - tt.left;
        switch (vt) {
          case "middle":
            st -= kt / 2;
            break;
          case "bottom":
            st -= kt;
            break;
        }
        switch (A) {
          case "center":
            q -= lt / 2;
            break;
          case "right":
            q -= lt;
            break;
          case "inner":
            w === k - 1 ? q -= lt : w > 0 && (q -= lt / 2);
            break;
        }
        X = {
          left: q,
          top: st,
          width: lt + tt.width,
          height: kt + tt.height,
          color: ht.backdropColor
        };
      }
      C.push({
        label: T,
        font: H,
        textOffset: U,
        options: {
          rotation: b,
          color: dt,
          strokeColor: D,
          strokeWidth: $,
          textAlign: j,
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
    if (-Tn(this.labelRotation))
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
    this.isHorizontal() ? (d = Si(t, this.left, l) - l / 2, p = Si(t, this.right, u) + u / 2, g = _ = c) : (g = Si(t, this.top, l) - l / 2, _ = Si(t, this.bottom, u) + u / 2, d = p = c), n.save(), n.lineWidth = o.width, n.strokeStyle = o.color, n.beginPath(), n.moveTo(d, g), n.lineTo(p, _), n.stroke(), n.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const i = this.ctx, r = this._computeLabelArea();
    r && kl(i, r);
    const o = this.getLabelItems(t);
    for (const l of o) {
      const u = l.options, c = l.font, d = l.label, p = l.textOffset;
      el(i, d, 0, p, c, u);
    }
    r && Sl(i);
  }
  drawTitle() {
    const { ctx: t, options: { position: n, title: i, reverse: r } } = this;
    if (!i.display)
      return;
    const o = xe(i.font), l = en(i.padding), u = i.align;
    let c = o.lineHeight / 2;
    n === "bottom" || n === "center" || pt(n) ? (c += l.bottom, Ut(i.text) && (c += o.lineHeight * (i.text.length - 1))) : c += l.top;
    const { titleX: d, titleY: p, maxWidth: g, rotation: _ } = xS(this, c, n, u);
    el(t, i.text, 0, 0, o, {
      color: i.color,
      maxWidth: g,
      rotation: _,
      textAlign: yS(u, n, r),
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
    const t = this.options, n = t.ticks && t.ticks.z || 0, i = ot(t.grid && t.grid.z, -1), r = ot(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== Bs.prototype.draw ? [
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
    return xe(n.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class sa {
  constructor(t, n, i) {
    this.type = t, this.scope = n, this.override = i, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const n = Object.getPrototypeOf(t);
    let i;
    kS(n) && (i = this.register(n));
    const r = this.items, o = t.id, l = this.scope + "." + o;
    if (!o)
      throw new Error("class does not have id: " + t);
    return o in r || (r[o] = t, wS(t, l, i), this.override && Ft.override(t.id, t.overrides)), l;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const n = this.items, i = t.id, r = this.scope;
    i in n && delete n[i], r && i in Ft[r] && (delete Ft[r][i], this.override && delete Zi[i]);
  }
}
function wS(e, t, n) {
  const i = to(/* @__PURE__ */ Object.create(null), [
    n ? Ft.get(n) : {},
    Ft.get(t),
    e.defaults
  ]);
  Ft.set(t, i), e.defaultRoutes && bS(t, e.defaultRoutes), e.descriptors && Ft.describe(t, e.descriptors);
}
function bS(e, t) {
  Object.keys(t).forEach((n) => {
    const i = n.split("."), r = i.pop(), o = [
      e
    ].concat(i).join("."), l = t[n].split("."), u = l.pop(), c = l.join(".");
    Ft.route(o, r, c, u);
  });
}
function kS(e) {
  return "id" in e && "defaults" in e;
}
class SS {
  constructor() {
    this.controllers = new sa(Ri, "datasets", !0), this.elements = new sa(_i, "elements"), this.plugins = new sa(Object, "plugins"), this.scales = new sa(Bs, "scales"), this._typedRegistries = [
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
    const r = qh(t);
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
var dn = /* @__PURE__ */ new SS();
class PS {
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
    const i = t && t.config, r = ot(i.options && i.options.plugins, {}), o = MS(i);
    return r === !1 && !n ? [] : LS(t, o, r, n);
  }
  _notifyStateChanges(t) {
    const n = this._oldCache || [], i = this._cache, r = (o, l) => o.filter((u) => !l.some((c) => u.plugin.id === c.plugin.id));
    this._notify(r(n, i), t, "stop"), this._notify(r(i, n), t, "start");
  }
}
function MS(e) {
  const t = {}, n = [], i = Object.keys(dn.plugins.items);
  for (let o = 0; o < i.length; o++)
    n.push(dn.getPlugin(i[o]));
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
function CS(e, t) {
  return !t && e === !1 ? null : e === !0 ? {} : e;
}
function LS(e, { plugins: t, localIds: n }, i, r) {
  const o = [], l = e.getContext();
  for (const u of t) {
    const c = u.id, d = CS(i[c], r);
    d !== null && o.push({
      plugin: u,
      options: TS(e.config, {
        plugin: u,
        local: n[c]
      }, d, l)
    });
  }
  return o;
}
function TS(e, { plugin: t, local: n }, i, r) {
  const o = e.pluginScopeKeys(t), l = e.getOptionScopes(i, o);
  return n && t.defaults && l.push(t.defaults), e.createResolver(l, r, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function Zc(e, t) {
  const n = Ft.datasets[e] || {};
  return ((t.datasets || {})[e] || {}).indexAxis || t.indexAxis || n.indexAxis || "x";
}
function ES(e, t) {
  let n = e;
  return e === "_index_" ? n = t : e === "_value_" && (n = t === "x" ? "y" : "x"), n;
}
function zS(e, t) {
  return e === t ? "_index_" : "_value_";
}
function mm(e) {
  if (e === "x" || e === "y" || e === "r")
    return e;
}
function OS(e) {
  if (e === "top" || e === "bottom")
    return "x";
  if (e === "left" || e === "right")
    return "y";
}
function Uc(e, ...t) {
  if (mm(e))
    return e;
  for (const n of t) {
    const i = n.axis || OS(n.position) || e.length > 1 && mm(e[0].toLowerCase());
    if (i)
      return i;
  }
  throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`);
}
function gm(e, t, n) {
  if (n[t + "AxisID"] === e)
    return {
      axis: t
    };
}
function NS(e, t) {
  if (t.data && t.data.datasets) {
    const n = t.data.datasets.filter((i) => i.xAxisID === e || i.yAxisID === e);
    if (n.length)
      return gm(e, "x", n[0]) || gm(e, "y", n[0]);
  }
  return {};
}
function AS(e, t) {
  const n = Zi[e.type] || {
    scales: {}
  }, i = t.scales || {}, r = Zc(e.type, t), o = /* @__PURE__ */ Object.create(null);
  return Object.keys(i).forEach((l) => {
    const u = i[l];
    if (!pt(u))
      return console.error(`Invalid scale configuration for scale: ${l}`);
    if (u._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${l}`);
    const c = Uc(l, u, NS(l, e), Ft.scales[u.type]), d = zS(c, r), p = n.scales || {};
    o[l] = Or(/* @__PURE__ */ Object.create(null), [
      {
        axis: c
      },
      u,
      p[c],
      p[d]
    ]);
  }), e.data.datasets.forEach((l) => {
    const u = l.type || e.type, c = l.indexAxis || Zc(u, t), p = (Zi[u] || {}).scales || {};
    Object.keys(p).forEach((g) => {
      const _ = ES(g, c), x = l[_ + "AxisID"] || _;
      o[x] = o[x] || /* @__PURE__ */ Object.create(null), Or(o[x], [
        {
          axis: _
        },
        i[x],
        p[g]
      ]);
    });
  }), Object.keys(o).forEach((l) => {
    const u = o[l];
    Or(u, [
      Ft.scales[u.type],
      Ft.scale
    ]);
  }), o;
}
function qv(e) {
  const t = e.options || (e.options = {});
  t.plugins = ot(t.plugins, {}), t.scales = AS(e, t);
}
function Qv(e) {
  return e = e || {}, e.datasets = e.datasets || [], e.labels = e.labels || [], e;
}
function IS(e) {
  return e = e || {}, e.data = Qv(e.data), qv(e), e;
}
const _m = /* @__PURE__ */ new Map(), Jv = /* @__PURE__ */ new Set();
function ra(e, t) {
  let n = _m.get(e);
  return n || (n = t(), _m.set(e, n), Jv.add(n)), n;
}
const fr = (e, t, n) => {
  const i = Vi(t, n);
  i !== void 0 && e.add(i);
};
class DS {
  constructor(t) {
    this._config = IS(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
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
    this._config.data = Qv(t);
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
    this.clearCache(), qv(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return ra(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, n) {
    return ra(`${t}.transition.${n}`, () => [
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
    return ra(`${t}-${n}`, () => [
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
    return ra(`${i}-plugin-${n}`, () => [
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
      t && (c.add(t), p.forEach((g) => fr(c, t, g))), p.forEach((g) => fr(c, r, g)), p.forEach((g) => fr(c, Zi[o] || {}, g)), p.forEach((g) => fr(c, Ft, g)), p.forEach((g) => fr(c, Wc, g));
    });
    const d = Array.from(c);
    return d.length === 0 && d.push(/* @__PURE__ */ Object.create(null)), Jv.has(n) && l.set(n, d), d;
  }
  chartOptionScopes() {
    const { options: t, type: n } = this;
    return [
      t,
      Zi[n] || {},
      Ft.datasets[n] || {},
      {
        type: n
      },
      Ft,
      Wc
    ];
  }
  resolveNamedOptions(t, n, i, r = [
    ""
  ]) {
    const o = {
      $shared: !0
    }, { resolver: l, subPrefixes: u } = vm(this._resolverCache, t, r);
    let c = l;
    if (jS(l, n)) {
      o.$shared = !1, i = fi(i) ? i() : i;
      const d = this.createResolver(t, i, u);
      c = As(l, i, d);
    }
    for (const d of n)
      o[d] = c[d];
    return o;
  }
  createResolver(t, n, i = [
    ""
  ], r) {
    const { resolver: o } = vm(this._resolverCache, t, i);
    return pt(n) ? As(o, n, void 0, r) : o;
  }
}
function vm(e, t, n) {
  let i = e.get(t);
  i || (i = /* @__PURE__ */ new Map(), e.set(t, i));
  const r = n.join();
  let o = i.get(r);
  return o || (o = {
    resolver: nd(t, n),
    subPrefixes: n.filter((u) => !u.toLowerCase().includes("hover"))
  }, i.set(r, o)), o;
}
const RS = (e) => pt(e) && Object.getOwnPropertyNames(e).some((t) => fi(e[t]));
function jS(e, t) {
  const { isScriptable: n, isIndexable: i } = Ov(e);
  for (const r of t) {
    const o = n(r), l = i(r), u = (l || o) && e[r];
    if (o && (fi(u) || RS(u)) || l && Ut(u))
      return !0;
  }
  return !1;
}
var BS = "4.5.1";
const FS = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function ym(e, t) {
  return e === "top" || e === "bottom" || FS.indexOf(e) === -1 && t === "x";
}
function xm(e, t) {
  return function(n, i) {
    return n[e] === i[e] ? n[t] - i[t] : n[e] - i[e];
  };
}
function wm(e) {
  const t = e.chart, n = t.options.animation;
  t.notifyPlugins("afterRender"), Lt(n && n.onComplete, [
    e
  ], t);
}
function HS(e) {
  const t = e.chart, n = t.options.animation;
  Lt(n && n.onProgress, [
    e
  ], t);
}
function ty(e) {
  return rd() && typeof e == "string" ? e = document.getElementById(e) : e && e.length && (e = e[0]), e && e.canvas && (e = e.canvas), e;
}
const Pa = {}, bm = (e) => {
  const t = ty(e);
  return Object.values(Pa).filter((n) => n.canvas === t).pop();
};
function WS(e, t, n) {
  const i = Object.keys(e);
  for (const r of i) {
    const o = +r;
    if (o >= t) {
      const l = e[r];
      delete e[r], (n > 0 || o > t) && (e[o + n] = l);
    }
  }
}
function VS(e, t, n, i) {
  return !n || e.type === "mouseout" ? null : i ? t : e;
}
var Zn;
let Cl = (Zn = class {
  static register(...t) {
    dn.add(...t), km();
  }
  static unregister(...t) {
    dn.remove(...t), km();
  }
  constructor(t, n) {
    const i = this.config = new DS(n), r = ty(t), o = bm(r);
    if (o)
      throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas with ID '" + o.canvas.id + "' can be reused.");
    const l = i.createResolver(i.chartOptionScopes(), this.getContext());
    this.platform = new (i.platform || aS(r))(), this.platform.updateConfig(i);
    const u = this.platform.acquireContext(r, l.aspectRatio), c = u && u.canvas, d = c && c.height, p = c && c.width;
    if (this.id = Hw(), this.ctx = u, this.canvas = c, this.width = p, this.height = d, this._options = l, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new PS(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = ob((g) => this.update(g), l.resizeDelay || 0), this._dataChanges = [], Pa[this.id] = this, !u || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    bn.listen(this, "complete", wm), bn.listen(this, "progress", HS), this._initialize(), this.attached && this.update();
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
    return dn;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Up(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return Wp(this.canvas, this.ctx), this;
  }
  stop() {
    return bn.stop(this), this;
  }
  resize(t, n) {
    bn.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: n
    } : this._resize(t, n);
  }
  _resize(t, n) {
    const i = this.options, r = this.canvas, o = i.maintainAspectRatio && this.aspectRatio, l = this.platform.getMaximumSize(r, t, n, o), u = i.devicePixelRatio || this.platform.getDevicePixelRatio(), c = this.width ? "resize" : "attach";
    this.width = l.width, this.height = l.height, this._aspectRatio = this.aspectRatio, Up(this, u, !0) && (this.notifyPlugins("resize", {
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
      const u = n[l], c = Uc(l, u), d = c === "r", p = c === "x";
      return {
        options: u,
        dposition: d ? "chartArea" : p ? "bottom" : "left",
        dtype: d ? "radialLinear" : p ? "category" : "linear"
      };
    }))), wt(o, (l) => {
      const u = l.options, c = u.id, d = Uc(c, u), p = ot(u.type, l.dtype);
      (u.position === void 0 || ym(u.position, d) !== ym(l.dposition)) && (u.position = l.dposition), r[c] = !0;
      let g = null;
      if (c in i && i[c].type === p)
        g = i[c];
      else {
        const _ = dn.getScale(p);
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
      Jn.configure(this, l, l.options), Jn.addBox(this, l);
    });
  }
  _updateMetasets() {
    const t = this._metasets, n = this.data.datasets.length, i = t.length;
    if (t.sort((r, o) => r.index - o.index), i > n) {
      for (let r = n; r < i; ++r)
        this._destroyDatasetMeta(r);
      t.splice(n, i - n);
    }
    this._sortedMetasets = t.slice(0).sort(xm("order", "index"));
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
      if (l.type && l.type !== u && (this._destroyDatasetMeta(i), l = this.getDatasetMeta(i)), l.type = u, l.indexAxis = o.indexAxis || Zc(u, this.options), l.order = o.order || 0, l.index = i, l.label = "" + o.label, l.visible = this.isDatasetVisible(i), l.controller)
        l.controller.updateIndex(i), l.controller.linkScales();
      else {
        const c = dn.getController(u), { datasetElementType: d, dataElementType: p } = Ft.datasets[u];
        Object.assign(c, {
          dataElementType: dn.getElement(p),
          datasetElementType: d && dn.getElement(d)
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
    }), this._layers.sort(xm("z", "_idx"));
    const { _active: u, _lastEvent: c } = this;
    c ? this._eventHandler(c, !0) : u.length && this._updateHoverStyles(u, u, !0), this.render();
  }
  _updateScales() {
    wt(this.scales, (t) => {
      Jn.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, n = new Set(Object.keys(this._listeners)), i = new Set(t.events);
    (!Op(n, i) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, n = this._getUniformDataChanges() || [];
    for (const { method: i, start: r, count: o } of n) {
      const l = i === "_removeElements" ? -o : o;
      WS(t, r, l);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const n = this.data.datasets.length, i = (o) => new Set(t.filter((l) => l[0] === o).map((l, u) => u + "," + l.splice(1).join(","))), r = i(0);
    for (let o = 1; o < n; o++)
      if (!Op(r, i(o)))
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
    Jn.update(this, this.width, this.height, t);
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
        this._updateDataset(n, fi(t) ? t({
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
    }) !== !1 && (bn.has(this) ? this.attached && !bn.running(this) && bn.start(this) : (this.draw(), wm({
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
    }, r = Wv(this, t);
    this.notifyPlugins("beforeDatasetDraw", i) !== !1 && (r && kl(n, r), t.controller.draw(), r && Sl(n), i.cancelable = !1, this.notifyPlugins("afterDatasetDraw", i));
  }
  isPointInArea(t) {
    return so(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, n, i, r) {
    const o = Fk.modes[n];
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
    return this.$context || (this.$context = Yi(null, {
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
    eo(n) ? (o.data[n].hidden = !i, this.update()) : (this.setDatasetVisibility(t, i), l.update(o, {
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
    for (this.stop(), bn.remove(this), t = 0, n = this.data.datasets.length; t < n; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: n } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Wp(t, n), this.platform.releaseContext(n), this.canvas = null, this.ctx = null), delete Pa[this.id], this.notifyPlugins("afterDestroy");
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
    !Qa(i, n) && (this._active = i, this._lastEvent = null, this._updateHoverStyles(i, n));
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
    const { _active: r = [], options: o } = this, l = n, u = this._getActiveElements(t, r, i, l), c = Yw(t), d = VS(t, this._lastEvent, i, c);
    i && (this._lastEvent = null, Lt(o.onHover, [
      t,
      u,
      this
    ], this), c && Lt(o.onClick, [
      t,
      u,
      this
    ], this));
    const p = !Qa(u, r);
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
}, Y(Zn, "defaults", Ft), Y(Zn, "instances", Pa), Y(Zn, "overrides", Zi), Y(Zn, "registry", dn), Y(Zn, "version", BS), Y(Zn, "getChart", bm), Zn);
function km() {
  return wt(Cl.instances, (e) => e._plugins.invalidate());
}
function ZS(e, t, n) {
  const { startAngle: i, x: r, y: o, outerRadius: l, innerRadius: u, options: c } = t, { borderWidth: d, borderJoinStyle: p } = c, g = Math.min(d / l, Ce(i - n));
  if (e.beginPath(), e.arc(r, o, l - d / 2, i + g / 2, n - g / 2), u > 0) {
    const _ = Math.min(d / u, Ce(i - n));
    e.arc(r, o, u + d / 2, n - _ / 2, i + _ / 2, !0);
  } else {
    const _ = Math.min(d / 2, l * Ce(i - n));
    if (p === "round")
      e.arc(r, o, _, n - St / 2, i + St / 2, !0);
    else if (p === "bevel") {
      const x = 2 * _ * _, S = -x * Math.cos(n + St / 2) + r, b = -x * Math.sin(n + St / 2) + o, C = x * Math.cos(i + St / 2) + r, w = x * Math.sin(i + St / 2) + o;
      e.lineTo(S, b), e.lineTo(C, w);
    }
  }
  e.closePath(), e.moveTo(0, 0), e.rect(0, 0, e.canvas.width, e.canvas.height), e.clip("evenodd");
}
function US(e, t, n) {
  const { startAngle: i, pixelMargin: r, x: o, y: l, outerRadius: u, innerRadius: c } = t;
  let d = r / u;
  e.beginPath(), e.arc(o, l, u, i - d, n + d), c > r ? (d = r / c, e.arc(o, l, c, n + d, i - d, !0)) : e.arc(o, l, r, n + Yt, i - Yt), e.closePath(), e.clip();
}
function $S(e) {
  return ed(e, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function YS(e, t, n, i) {
  const r = $S(e.options.borderRadius), o = (n - t) / 2, l = Math.min(o, i * t / 2), u = (c) => {
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
function rs(e, t, n, i) {
  return {
    x: n + e * Math.cos(t),
    y: i + e * Math.sin(t)
  };
}
function rl(e, t, n, i, r, o) {
  const { x: l, y: u, startAngle: c, pixelMargin: d, innerRadius: p } = t, g = Math.max(t.outerRadius + i + n - d, 0), _ = p > 0 ? p + i + n + d : 0;
  let x = 0;
  const S = r - c;
  if (i) {
    const ht = p > 0 ? p - i : 0, J = g > 0 ? g - i : 0, dt = (ht + J) / 2, D = dt !== 0 ? S * dt / (dt + i) : S;
    x = (S - D) / 2;
  }
  const b = Math.max(1e-3, S * g - n / St) / g, C = (S - b) / 2, w = c + C + x, k = r - C - x, { outerStart: P, outerEnd: T, innerStart: E, innerEnd: N } = YS(t, _, g, k - w), A = g - P, I = g - T, H = w + P / A, B = k - T / I, W = _ + E, U = _ + N, vt = w + E / W, it = k - N / U;
  if (e.beginPath(), o) {
    const ht = (H + B) / 2;
    if (e.arc(l, u, g, H, ht), e.arc(l, u, g, ht, B), T > 0) {
      const $ = rs(I, B, l, u);
      e.arc($.x, $.y, T, B, k + Yt);
    }
    const J = rs(U, k, l, u);
    if (e.lineTo(J.x, J.y), N > 0) {
      const $ = rs(U, it, l, u);
      e.arc($.x, $.y, N, k + Yt, it + Math.PI);
    }
    const dt = (k - N / _ + (w + E / _)) / 2;
    if (e.arc(l, u, _, k - N / _, dt, !0), e.arc(l, u, _, dt, w + E / _, !0), E > 0) {
      const $ = rs(W, vt, l, u);
      e.arc($.x, $.y, E, vt + Math.PI, w - Yt);
    }
    const D = rs(A, w, l, u);
    if (e.lineTo(D.x, D.y), P > 0) {
      const $ = rs(A, H, l, u);
      e.arc($.x, $.y, P, w - Yt, H);
    }
  } else {
    e.moveTo(l, u);
    const ht = Math.cos(H) * g + l, J = Math.sin(H) * g + u;
    e.lineTo(ht, J);
    const dt = Math.cos(B) * g + l, D = Math.sin(B) * g + u;
    e.lineTo(dt, D);
  }
  e.closePath();
}
function KS(e, t, n, i, r) {
  const { fullCircles: o, startAngle: l, circumference: u } = t;
  let c = t.endAngle;
  if (o) {
    rl(e, t, n, i, c, r);
    for (let d = 0; d < o; ++d)
      e.fill();
    isNaN(u) || (c = l + (u % At || At));
  }
  return rl(e, t, n, i, c, r), e.fill(), c;
}
function XS(e, t, n, i, r) {
  const { fullCircles: o, startAngle: l, circumference: u, options: c } = t, { borderWidth: d, borderJoinStyle: p, borderDash: g, borderDashOffset: _, borderRadius: x } = c, S = c.borderAlign === "inner";
  if (!d)
    return;
  e.setLineDash(g || []), e.lineDashOffset = _, S ? (e.lineWidth = d * 2, e.lineJoin = p || "round") : (e.lineWidth = d, e.lineJoin = p || "bevel");
  let b = t.endAngle;
  if (o) {
    rl(e, t, n, i, b, r);
    for (let C = 0; C < o; ++C)
      e.stroke();
    isNaN(u) || (b = l + (u % At || At));
  }
  S && US(e, t, b), c.selfJoin && b - l >= St && x === 0 && p !== "miter" && ZS(e, t, b), o || (rl(e, t, n, i, b, r), e.stroke());
}
class wr extends _i {
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
    ], r), { angle: l, distance: u } = kv(o, {
      x: n,
      y: i
    }), { startAngle: c, endAngle: d, innerRadius: p, outerRadius: g, circumference: _ } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], r), x = (this.options.spacing + this.options.borderWidth) / 2, S = ot(_, d - c), b = io(l, c, d) && c !== d, C = S >= At || b, w = En(u, p + x, g + x);
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
    n.fillStyle = i.backgroundColor, n.strokeStyle = i.borderColor, KS(n, this, p, l, u), XS(n, this, p, l, u), n.restore();
  }
}
Y(wr, "id", "arc"), Y(wr, "defaults", {
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
}), Y(wr, "defaultRoutes", {
  backgroundColor: "backgroundColor"
}), Y(wr, "descriptors", {
  _scriptable: !0,
  _indexable: (n) => n !== "borderDash"
});
function ey(e, t, n = t) {
  e.lineCap = ot(n.borderCapStyle, t.borderCapStyle), e.setLineDash(ot(n.borderDash, t.borderDash)), e.lineDashOffset = ot(n.borderDashOffset, t.borderDashOffset), e.lineJoin = ot(n.borderJoinStyle, t.borderJoinStyle), e.lineWidth = ot(n.borderWidth, t.borderWidth), e.strokeStyle = ot(n.borderColor, t.borderColor);
}
function GS(e, t, n) {
  e.lineTo(n.x, n.y);
}
function qS(e) {
  return e.stepped ? xb : e.tension || e.cubicInterpolationMode === "monotone" ? wb : GS;
}
function ny(e, t, n = {}) {
  const i = e.length, { start: r = 0, end: o = i - 1 } = n, { start: l, end: u } = t, c = Math.max(r, l), d = Math.min(o, u), p = r < l && o < l || r > u && o > u;
  return {
    count: i,
    start: c,
    loop: t.loop,
    ilen: d < c && !p ? i + d - c : d - c
  };
}
function QS(e, t, n, i) {
  const { points: r, options: o } = t, { count: l, start: u, loop: c, ilen: d } = ny(r, n, i), p = qS(o);
  let { move: g = !0, reverse: _ } = i || {}, x, S, b;
  for (x = 0; x <= d; ++x)
    S = r[(u + (_ ? d - x : x)) % l], !S.skip && (g ? (e.moveTo(S.x, S.y), g = !1) : p(e, b, S, _, o.stepped), b = S);
  return c && (S = r[(u + (_ ? d : 0)) % l], p(e, b, S, _, o.stepped)), !!c;
}
function JS(e, t, n, i) {
  const r = t.points, { count: o, start: l, ilen: u } = ny(r, n, i), { move: c = !0, reverse: d } = i || {};
  let p = 0, g = 0, _, x, S, b, C, w;
  const k = (T) => (l + (d ? u - T : T)) % o, P = () => {
    b !== C && (e.lineTo(p, C), e.lineTo(p, b), e.lineTo(p, w));
  };
  for (c && (x = r[k(0)], e.moveTo(x.x, x.y)), _ = 0; _ <= u; ++_) {
    if (x = r[k(_)], x.skip)
      continue;
    const T = x.x, E = x.y, N = T | 0;
    N === S ? (E < b ? b = E : E > C && (C = E), p = (g * p + T) / ++g) : (P(), e.lineTo(T, E), S = N, g = 0, b = C = E), w = E;
  }
  P();
}
function $c(e) {
  const t = e.options, n = t.borderDash && t.borderDash.length;
  return !e._decimated && !e._loop && !t.tension && t.cubicInterpolationMode !== "monotone" && !t.stepped && !n ? JS : QS;
}
function t2(e) {
  return e.stepped ? Jb : e.tension || e.cubicInterpolationMode === "monotone" ? tk : Ti;
}
function e2(e, t, n, i) {
  let r = t._path;
  r || (r = t._path = new Path2D(), t.path(r, n, i) && r.closePath()), ey(e, t.options), e.stroke(r);
}
function n2(e, t, n, i) {
  const { segments: r, options: o } = t, l = $c(t);
  for (const u of r)
    ey(e, o, u.style), e.beginPath(), l(e, t, u, {
      start: n,
      end: n + i - 1
    }) && e.closePath(), e.stroke();
}
const i2 = typeof Path2D == "function";
function s2(e, t, n, i) {
  i2 && !t.options.segment ? e2(e, t, n, i) : n2(e, t, n, i);
}
class ti extends _i {
  constructor(t) {
    super(), this.animated = !0, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = !1, this._pointsUpdated = !1, this._datasetIndex = void 0, t && Object.assign(this, t);
  }
  updateControlPoints(t, n) {
    const i = this.options;
    if ((i.tension || i.cubicInterpolationMode === "monotone") && !i.stepped && !this._pointsUpdated) {
      const r = i.spanGaps ? this._loop : this._fullLoop;
      Ub(this._points, i, t, r, n), this._pointsUpdated = !0;
    }
  }
  set points(t) {
    this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = ok(this, this.options.segment));
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
    const i = this.options, r = t[n], o = this.points, l = Hv(this, {
      property: n,
      start: r,
      end: r
    });
    if (!l.length)
      return;
    const u = [], c = t2(i);
    let d, p;
    for (d = 0, p = l.length; d < p; ++d) {
      const { start: g, end: _ } = l[d], x = o[g], S = o[_];
      if (x === S) {
        u.push(x);
        continue;
      }
      const b = Math.abs((r - x[n]) / (S[n] - x[n])), C = c(x, S, b, i.stepped);
      C[n] = t[n], u.push(C);
    }
    return u.length === 1 ? u[0] : u;
  }
  pathSegment(t, n, i) {
    return $c(this)(t, this, n, i);
  }
  path(t, n, i) {
    const r = this.segments, o = $c(this);
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
    (this.points || []).length && o.borderWidth && (t.save(), s2(t, this, i, r), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0);
  }
}
Y(ti, "id", "line"), Y(ti, "defaults", {
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
}), Y(ti, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
}), Y(ti, "descriptors", {
  _scriptable: !0,
  _indexable: (t) => t !== "borderDash" && t !== "fill"
});
function Sm(e, t, n, i) {
  const r = e.options, { [n]: o } = e.getProps([
    n
  ], i);
  return Math.abs(t - o) < r.radius + r.hitRadius;
}
class Ma extends _i {
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
    return Sm(this, n, "x", i);
  }
  inYRange(n, i) {
    return Sm(this, n, "y", i);
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
    this.skip || r.radius < 0.1 || !so(this, i, this.size(r) / 2) || (n.strokeStyle = r.borderColor, n.lineWidth = r.borderWidth, n.fillStyle = r.backgroundColor, Vc(n, r, this.x, this.y));
  }
  getRange() {
    const n = this.options || {};
    return n.radius + n.hitRadius;
  }
}
Y(Ma, "id", "point"), /**
* @type {any}
*/
Y(Ma, "defaults", {
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
Y(Ma, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function iy(e, t) {
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
function ei(e, t, n, i) {
  return e ? 0 : re(t, n, i);
}
function r2(e, t, n) {
  const i = e.options.borderWidth, r = e.borderSkipped, o = zv(i);
  return {
    t: ei(r.top, o.top, 0, n),
    r: ei(r.right, o.right, 0, t),
    b: ei(r.bottom, o.bottom, 0, n),
    l: ei(r.left, o.left, 0, t)
  };
}
function o2(e, t, n) {
  const { enableBorderRadius: i } = e.getProps([
    "enableBorderRadius"
  ]), r = e.options.borderRadius, o = Ps(r), l = Math.min(t, n), u = e.borderSkipped, c = i || pt(r);
  return {
    topLeft: ei(!c || u.top || u.left, o.topLeft, 0, l),
    topRight: ei(!c || u.top || u.right, o.topRight, 0, l),
    bottomLeft: ei(!c || u.bottom || u.left, o.bottomLeft, 0, l),
    bottomRight: ei(!c || u.bottom || u.right, o.bottomRight, 0, l)
  };
}
function a2(e) {
  const t = iy(e), n = t.right - t.left, i = t.bottom - t.top, r = r2(e, n / 2, i / 2), o = o2(e, n / 2, i / 2);
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
function Hu(e, t, n, i) {
  const r = t === null, o = n === null, u = e && !(r && o) && iy(e, i);
  return u && (r || En(t, u.left, u.right)) && (o || En(n, u.top, u.bottom));
}
function l2(e) {
  return e.topLeft || e.topRight || e.bottomLeft || e.bottomRight;
}
function u2(e, t) {
  e.rect(t.x, t.y, t.w, t.h);
}
function Wu(e, t, n = {}) {
  const i = e.x !== n.x ? -t : 0, r = e.y !== n.y ? -t : 0, o = (e.x + e.w !== n.x + n.w ? t : 0) - i, l = (e.y + e.h !== n.y + n.h ? t : 0) - r;
  return {
    x: e.x + i,
    y: e.y + r,
    w: e.w + o,
    h: e.h + l,
    radius: e.radius
  };
}
class Ca extends _i {
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: n, options: { borderColor: i, backgroundColor: r } } = this, { inner: o, outer: l } = a2(this), u = l2(l.radius) ? nl : u2;
    t.save(), (l.w !== o.w || l.h !== o.h) && (t.beginPath(), u(t, Wu(l, n, o)), t.clip(), u(t, Wu(o, -n, l)), t.fillStyle = i, t.fill("evenodd")), t.beginPath(), u(t, Wu(o, n)), t.fillStyle = r, t.fill(), t.restore();
  }
  inRange(t, n, i) {
    return Hu(this, t, n, i);
  }
  inXRange(t, n) {
    return Hu(this, t, null, n);
  }
  inYRange(t, n) {
    return Hu(this, null, t, n);
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
Y(Ca, "id", "bar"), Y(Ca, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), Y(Ca, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function c2(e, t, n) {
  const i = e.segments, r = e.points, o = t.points, l = [];
  for (const u of i) {
    let { start: c, end: d } = u;
    d = Ll(c, d, r);
    const p = Yc(n, r[c], r[d], u.loop);
    if (!t.segments) {
      l.push({
        source: u,
        target: p,
        start: r[c],
        end: r[d]
      });
      continue;
    }
    const g = Hv(t, p);
    for (const _ of g) {
      const x = Yc(n, o[_.start], o[_.end], _.loop), S = Fv(u, r, x);
      for (const b of S)
        l.push({
          source: b,
          target: _,
          start: {
            [n]: Pm(p, x, "start", Math.max)
          },
          end: {
            [n]: Pm(p, x, "end", Math.min)
          }
        });
    }
  }
  return l;
}
function Yc(e, t, n, i) {
  if (i)
    return;
  let r = t[e], o = n[e];
  return e === "angle" && (r = Ce(r), o = Ce(o)), {
    property: e,
    start: r,
    end: o
  };
}
function h2(e, t) {
  const { x: n = null, y: i = null } = e || {}, r = t.points, o = [];
  return t.segments.forEach(({ start: l, end: u }) => {
    u = Ll(l, u, r);
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
function Ll(e, t, n) {
  for (; t > e; t--) {
    const i = n[t];
    if (!isNaN(i.x) && !isNaN(i.y))
      break;
  }
  return t;
}
function Pm(e, t, n, i) {
  return e && t ? i(e[n], t[n]) : e ? e[n] : t ? t[n] : 0;
}
function sy(e, t) {
  let n = [], i = !1;
  return Ut(e) ? (i = !0, n = e) : n = h2(e, t), n.length ? new ti({
    points: n,
    options: {
      tension: 0
    },
    _loop: i,
    _fullLoop: i
  }) : null;
}
function Mm(e) {
  return e && e.fill !== !1;
}
function d2(e, t, n) {
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
function f2(e, t, n) {
  const i = _2(e);
  if (pt(i))
    return isNaN(i.value) ? !1 : i;
  let r = parseFloat(i);
  return ae(r) && Math.floor(r) === r ? p2(i[0], t, r, n) : [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(i) >= 0 && i;
}
function p2(e, t, n, i) {
  return (e === "-" || e === "+") && (n = t + n), n === t || n < 0 || n >= i ? !1 : n;
}
function m2(e, t) {
  let n = null;
  return e === "start" ? n = t.bottom : e === "end" ? n = t.top : pt(e) ? n = t.getPixelForValue(e.value) : t.getBasePixel && (n = t.getBasePixel()), n;
}
function g2(e, t, n) {
  let i;
  return e === "start" ? i = n : e === "end" ? i = t.options.reverse ? t.min : t.max : pt(e) ? i = e.value : i = t.getBaseValue(), i;
}
function _2(e) {
  const t = e.options, n = t.fill;
  let i = ot(n && n.target, n);
  return i === void 0 && (i = !!t.backgroundColor), i === !1 || i === null ? !1 : i === !0 ? "origin" : i;
}
function v2(e) {
  const { scale: t, index: n, line: i } = e, r = [], o = i.segments, l = i.points, u = y2(t, n);
  u.push(sy({
    x: null,
    y: t.bottom
  }, i));
  for (let c = 0; c < o.length; c++) {
    const d = o[c];
    for (let p = d.start; p <= d.end; p++)
      x2(r, l[p], u);
  }
  return new ti({
    points: r,
    options: {}
  });
}
function y2(e, t) {
  const n = [], i = e.getMatchingVisibleMetas("line");
  for (let r = 0; r < i.length; r++) {
    const o = i[r];
    if (o.index === t)
      break;
    o.hidden || n.unshift(o.dataset);
  }
  return n;
}
function x2(e, t, n) {
  const i = [];
  for (let r = 0; r < n.length; r++) {
    const o = n[r], { first: l, last: u, point: c } = w2(o, t, "x");
    if (!(!c || l && u)) {
      if (l)
        i.unshift(c);
      else if (e.push(c), !u)
        break;
    }
  }
  e.push(...i);
}
function w2(e, t, n) {
  const i = e.interpolate(t, n);
  if (!i)
    return {};
  const r = i[n], o = e.segments, l = e.points;
  let u = !1, c = !1;
  for (let d = 0; d < o.length; d++) {
    const p = o[d], g = l[p.start][n], _ = l[p.end][n];
    if (En(r, g, _)) {
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
class ry {
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
function b2(e) {
  const { chart: t, fill: n, line: i } = e;
  if (ae(n))
    return k2(t, n);
  if (n === "stack")
    return v2(e);
  if (n === "shape")
    return !0;
  const r = S2(e);
  return r instanceof ry ? r : sy(r, i);
}
function k2(e, t) {
  const n = e.getDatasetMeta(t);
  return n && e.isDatasetVisible(t) ? n.dataset : null;
}
function S2(e) {
  return (e.scale || {}).getPointPositionForValue ? M2(e) : P2(e);
}
function P2(e) {
  const { scale: t = {}, fill: n } = e, i = m2(n, t);
  if (ae(i)) {
    const r = t.isHorizontal();
    return {
      x: r ? i : null,
      y: r ? null : i
    };
  }
  return null;
}
function M2(e) {
  const { scale: t, fill: n } = e, i = t.options, r = t.getLabels().length, o = i.reverse ? t.max : t.min, l = g2(n, t, o), u = [];
  if (i.grid.circular) {
    const c = t.getPointPositionForValue(0, o);
    return new ry({
      x: c.x,
      y: c.y,
      radius: t.getDistanceFromCenterForValue(l)
    });
  }
  for (let c = 0; c < r; ++c)
    u.push(t.getPointPositionForValue(c, l));
  return u;
}
function Vu(e, t, n) {
  const i = b2(t), { chart: r, index: o, line: l, scale: u, axis: c } = t, d = l.options, p = d.fill, g = d.backgroundColor, { above: _ = g, below: x = g } = p || {}, S = r.getDatasetMeta(o), b = Wv(r, S);
  i && l.points.length && (kl(e, n), C2(e, {
    line: l,
    target: i,
    above: _,
    below: x,
    area: n,
    scale: u,
    axis: c,
    clip: b
  }), Sl(e));
}
function C2(e, t) {
  const { line: n, target: i, above: r, below: o, area: l, scale: u, clip: c } = t, d = n._loop ? "angle" : t.axis;
  e.save();
  let p = o;
  o !== r && (d === "x" ? (Cm(e, i, l.top), Zu(e, {
    line: n,
    target: i,
    color: r,
    scale: u,
    property: d,
    clip: c
  }), e.restore(), e.save(), Cm(e, i, l.bottom)) : d === "y" && (Lm(e, i, l.left), Zu(e, {
    line: n,
    target: i,
    color: o,
    scale: u,
    property: d,
    clip: c
  }), e.restore(), e.save(), Lm(e, i, l.right), p = r)), Zu(e, {
    line: n,
    target: i,
    color: p,
    scale: u,
    property: d,
    clip: c
  }), e.restore();
}
function Cm(e, t, n) {
  const { segments: i, points: r } = t;
  let o = !0, l = !1;
  e.beginPath();
  for (const u of i) {
    const { start: c, end: d } = u, p = r[c], g = r[Ll(c, d, r)];
    o ? (e.moveTo(p.x, p.y), o = !1) : (e.lineTo(p.x, n), e.lineTo(p.x, p.y)), l = !!t.pathSegment(e, u, {
      move: l
    }), l ? e.closePath() : e.lineTo(g.x, n);
  }
  e.lineTo(t.first().x, n), e.closePath(), e.clip();
}
function Lm(e, t, n) {
  const { segments: i, points: r } = t;
  let o = !0, l = !1;
  e.beginPath();
  for (const u of i) {
    const { start: c, end: d } = u, p = r[c], g = r[Ll(c, d, r)];
    o ? (e.moveTo(p.x, p.y), o = !1) : (e.lineTo(n, p.y), e.lineTo(p.x, p.y)), l = !!t.pathSegment(e, u, {
      move: l
    }), l ? e.closePath() : e.lineTo(n, g.y);
  }
  e.lineTo(n, t.first().y), e.closePath(), e.clip();
}
function Zu(e, t) {
  const { line: n, target: i, property: r, color: o, scale: l, clip: u } = t, c = c2(n, i, r);
  for (const { source: d, target: p, start: g, end: _ } of c) {
    const { style: { backgroundColor: x = o } = {} } = d, S = i !== !0;
    e.save(), e.fillStyle = x, L2(e, l, u, S && Yc(r, g, _)), e.beginPath();
    const b = !!n.pathSegment(e, d);
    let C;
    if (S) {
      b ? e.closePath() : Tm(e, i, _, r);
      const w = !!i.pathSegment(e, p, {
        move: b,
        reverse: !0
      });
      C = b && w, C || Tm(e, i, g, r);
    }
    e.closePath(), e.fill(C ? "evenodd" : "nonzero"), e.restore();
  }
}
function L2(e, t, n, i) {
  const r = t.chart.chartArea, { property: o, start: l, end: u } = i || {};
  if (o === "x" || o === "y") {
    let c, d, p, g;
    o === "x" ? (c = l, d = r.top, p = u, g = r.bottom) : (c = r.left, d = l, p = r.right, g = u), e.beginPath(), n && (c = Math.max(c, n.left), p = Math.min(p, n.right), d = Math.max(d, n.top), g = Math.min(g, n.bottom)), e.rect(c, d, p - c, g - d), e.clip();
  }
}
function Tm(e, t, n, i) {
  const r = t.interpolate(n, i);
  r && e.lineTo(r.x, r.y);
}
var T2 = {
  id: "filler",
  afterDatasetsUpdate(e, t, n) {
    const i = (e.data.datasets || []).length, r = [];
    let o, l, u, c;
    for (l = 0; l < i; ++l)
      o = e.getDatasetMeta(l), u = o.dataset, c = null, u && u.options && u instanceof ti && (c = {
        visible: e.isDatasetVisible(l),
        index: l,
        fill: f2(u, l, i),
        chart: e,
        axis: o.controller.options.indexAxis,
        scale: o.vScale,
        line: u
      }), o.$filler = c, r.push(c);
    for (l = 0; l < i; ++l)
      c = r[l], !(!c || c.fill === !1) && (c.fill = d2(r, l, n.propagate));
  },
  beforeDraw(e, t, n) {
    const i = n.drawTime === "beforeDraw", r = e.getSortedVisibleDatasetMetas(), o = e.chartArea;
    for (let l = r.length - 1; l >= 0; --l) {
      const u = r[l].$filler;
      u && (u.line.updateControlPoints(o, u.axis), i && u.fill && Vu(e.ctx, u, o));
    }
  },
  beforeDatasetsDraw(e, t, n) {
    if (n.drawTime !== "beforeDatasetsDraw")
      return;
    const i = e.getSortedVisibleDatasetMetas();
    for (let r = i.length - 1; r >= 0; --r) {
      const o = i[r].$filler;
      Mm(o) && Vu(e.ctx, o, e.chartArea);
    }
  },
  beforeDatasetDraw(e, t, n) {
    const i = t.meta.$filler;
    !Mm(i) || n.drawTime !== "beforeDatasetDraw" || Vu(e.ctx, i, e.chartArea);
  },
  defaults: {
    propagate: !0,
    drawTime: "beforeDatasetDraw"
  }
};
const Em = (e, t) => {
  let { boxHeight: n = t, boxWidth: i = t } = e;
  return e.usePointStyle && (n = Math.min(n, t), i = e.pointStyleWidth || Math.min(i, t)), {
    boxWidth: i,
    boxHeight: n,
    itemHeight: Math.max(t, n)
  };
}, E2 = (e, t) => e !== null && t !== null && e.datasetIndex === t.datasetIndex && e.index === t.index;
class zm extends _i {
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
    const i = t.labels, r = xe(i.font), o = r.size, l = this._computeTitleHeight(), { boxWidth: u, itemHeight: c } = Em(i, o);
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
    return this.legendItems.forEach((S, b) => {
      const C = i + n / 2 + o.measureText(S.text).width;
      (b === 0 || d[d.length - 1] + C + 2 * u > l) && (g += p, d[d.length - (b > 0 ? 0 : 1)] = 0, x += p, _++), c[b] = {
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
    let g = u, _ = 0, x = 0, S = 0, b = 0;
    return this.legendItems.forEach((C, w) => {
      const { itemWidth: k, itemHeight: P } = z2(i, n, o, C, r);
      w > 0 && x + P + 2 * u > p && (g += _ + u, d.push({
        width: _,
        height: x
      }), S += _ + u, b++, _ = x = 0), c[w] = {
        left: S,
        top: x,
        col: b,
        width: k,
        height: P
      }, _ = Math.max(_, k), x += P + u;
    }), g += _, d.push({
      width: _,
      height: x
    }), g;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: n, options: { align: i, labels: { padding: r }, rtl: o } } = this, l = Ms(o, this.left, this.width);
    if (this.isHorizontal()) {
      let u = 0, c = Pe(i, this.left + r, this.right - this.lineWidths[u]);
      for (const d of n)
        u !== d.row && (u = d.row, c = Pe(i, this.left + r, this.right - this.lineWidths[u])), d.top += this.top + t + r, d.left = l.leftForLtr(l.x(c), d.width), c += d.width + r;
    } else {
      let u = 0, c = Pe(i, this.top + t + r, this.bottom - this.columnSizes[u].height);
      for (const d of n)
        d.col !== u && (u = d.col, c = Pe(i, this.top + t + r, this.bottom - this.columnSizes[u].height)), d.top = c, d.left += this.left + r, d.left = l.leftForLtr(l.x(d.left), d.width), c += d.height + r;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      kl(t, this), this._draw(), Sl(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: n, lineWidths: i, ctx: r } = this, { align: o, labels: l } = t, u = Ft.color, c = Ms(t.rtl, this.left, this.width), d = xe(l.font), { padding: p } = l, g = d.size, _ = g / 2;
    let x;
    this.drawTitle(), r.textAlign = c.textAlign("left"), r.textBaseline = "middle", r.lineWidth = 0.5, r.font = d.string;
    const { boxWidth: S, boxHeight: b, itemHeight: C } = Em(l, g), w = function(N, A, I) {
      if (isNaN(S) || S <= 0 || isNaN(b) || b < 0)
        return;
      r.save();
      const H = ot(I.lineWidth, 1);
      if (r.fillStyle = ot(I.fillStyle, u), r.lineCap = ot(I.lineCap, "butt"), r.lineDashOffset = ot(I.lineDashOffset, 0), r.lineJoin = ot(I.lineJoin, "miter"), r.lineWidth = H, r.strokeStyle = ot(I.strokeStyle, u), r.setLineDash(ot(I.lineDash, [])), l.usePointStyle) {
        const B = {
          radius: b * Math.SQRT2 / 2,
          pointStyle: I.pointStyle,
          rotation: I.rotation,
          borderWidth: H
        }, W = c.xPlus(N, S / 2), U = A + _;
        Ev(r, B, W, U, l.pointStyleWidth && S);
      } else {
        const B = A + Math.max((g - b) / 2, 0), W = c.leftForLtr(N, S), U = Ps(I.borderRadius);
        r.beginPath(), Object.values(U).some((vt) => vt !== 0) ? nl(r, {
          x: W,
          y: B,
          w: S,
          h: b,
          radius: U
        }) : r.rect(W, B, S, b), r.fill(), H !== 0 && r.stroke();
      }
      r.restore();
    }, k = function(N, A, I) {
      el(r, I.text, N, A + C / 2, d, {
        strikethrough: I.hidden,
        textAlign: c.textAlign(I.textAlign)
      });
    }, P = this.isHorizontal(), T = this._computeTitleHeight();
    P ? x = {
      x: Pe(o, this.left + p, this.right - i[0]),
      y: this.top + p + T,
      line: 0
    } : x = {
      x: this.left + p,
      y: Pe(o, this.top + T + p, this.bottom - n[0].height),
      line: 0
    }, Rv(this.ctx, t.textDirection);
    const E = C + p;
    this.legendItems.forEach((N, A) => {
      r.strokeStyle = N.fontColor, r.fillStyle = N.fontColor;
      const I = r.measureText(N.text).width, H = c.textAlign(N.textAlign || (N.textAlign = l.textAlign)), B = S + _ + I;
      let W = x.x, U = x.y;
      c.setWidth(this.width), P ? A > 0 && W + B + p > this.right && (U = x.y += E, x.line++, W = x.x = Pe(o, this.left + p, this.right - i[x.line])) : A > 0 && U + E > this.bottom && (W = x.x = W + n[x.line].width + p, x.line++, U = x.y = Pe(o, this.top + T + p, this.bottom - n[x.line].height));
      const vt = c.x(W);
      if (w(vt, U, N), W = ab(H, W + S + _, P ? W + B : this.right, t.rtl), k(c.x(W), U, N), P)
        x.x += B + p;
      else if (typeof N.text != "string") {
        const it = d.lineHeight;
        x.y += oy(N, it) + p;
      } else
        x.y += E;
    }), jv(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, n = t.title, i = xe(n.font), r = en(n.padding);
    if (!n.display)
      return;
    const o = Ms(t.rtl, this.left, this.width), l = this.ctx, u = n.position, c = i.size / 2, d = r.top + c;
    let p, g = this.left, _ = this.width;
    if (this.isHorizontal())
      _ = Math.max(...this.lineWidths), p = this.top + d, g = Pe(t.align, g, this.right - _);
    else {
      const S = this.columnSizes.reduce((b, C) => Math.max(b, C.height), 0);
      p = d + Pe(t.align, this.top, this.bottom - S - t.labels.padding - this._computeTitleHeight());
    }
    const x = Pe(u, g, g + _);
    l.textAlign = o.textAlign(Lv(u)), l.textBaseline = "middle", l.strokeStyle = n.color, l.fillStyle = n.color, l.font = i.string, el(l, n.text, x, p, i);
  }
  _computeTitleHeight() {
    const t = this.options.title, n = xe(t.font), i = en(t.padding);
    return t.display ? n.lineHeight + i.height : 0;
  }
  _getLegendItemAt(t, n) {
    let i, r, o;
    if (En(t, this.left, this.right) && En(n, this.top, this.bottom)) {
      for (o = this.legendHitBoxes, i = 0; i < o.length; ++i)
        if (r = o[i], En(t, r.left, r.left + r.width) && En(n, r.top, r.top + r.height))
          return this.legendItems[i];
    }
    return null;
  }
  handleEvent(t) {
    const n = this.options;
    if (!A2(t.type, n))
      return;
    const i = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const r = this._hoveredItem, o = E2(r, i);
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
function z2(e, t, n, i, r) {
  const o = O2(i, e, t, n), l = N2(r, i, t.lineHeight);
  return {
    itemWidth: o,
    itemHeight: l
  };
}
function O2(e, t, n, i) {
  let r = e.text;
  return r && typeof r != "string" && (r = r.reduce((o, l) => o.length > l.length ? o : l)), t + n.size / 2 + i.measureText(r).width;
}
function N2(e, t, n) {
  let i = e;
  return typeof t.text != "string" && (i = oy(t, n)), i;
}
function oy(e, t) {
  const n = e.text ? e.text.length : 0;
  return t * n;
}
function A2(e, t) {
  return !!((e === "mousemove" || e === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (e === "click" || e === "mouseup"));
}
var I2 = {
  id: "legend",
  _element: zm,
  start(e, t, n) {
    const i = e.legend = new zm({
      ctx: e.ctx,
      options: n,
      chart: e
    });
    Jn.configure(e, i, n), Jn.addBox(e, i);
  },
  stop(e) {
    Jn.removeBox(e, e.legend), delete e.legend;
  },
  beforeUpdate(e, t, n) {
    const i = e.legend;
    Jn.configure(e, i, n), i.options = n;
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
          const d = c.controller.getStyle(n ? 0 : void 0), p = en(d.borderWidth);
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
const br = {
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
        const d = c.getCenterPoint(), p = Hc(t, d);
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
function cn(e, t) {
  return t && (Ut(t) ? Array.prototype.push.apply(e, t) : e.push(t)), e;
}
function kn(e) {
  return (typeof e == "string" || e instanceof String) && e.indexOf(`
`) > -1 ? e.split(`
`) : e;
}
function D2(e, t) {
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
function Om(e, t) {
  const n = e.chart.ctx, { body: i, footer: r, title: o } = e, { boxWidth: l, boxHeight: u } = t, c = xe(t.bodyFont), d = xe(t.titleFont), p = xe(t.footerFont), g = o.length, _ = r.length, x = i.length, S = en(t.padding);
  let b = S.height, C = 0, w = i.reduce((T, E) => T + E.before.length + E.lines.length + E.after.length, 0);
  if (w += e.beforeBody.length + e.afterBody.length, g && (b += g * d.lineHeight + (g - 1) * t.titleSpacing + t.titleMarginBottom), w) {
    const T = t.displayColors ? Math.max(u, c.lineHeight) : c.lineHeight;
    b += x * T + (w - x) * c.lineHeight + (w - 1) * t.bodySpacing;
  }
  _ && (b += t.footerMarginTop + _ * p.lineHeight + (_ - 1) * t.footerSpacing);
  let k = 0;
  const P = function(T) {
    C = Math.max(C, n.measureText(T).width + k);
  };
  return n.save(), n.font = d.string, wt(e.title, P), n.font = c.string, wt(e.beforeBody.concat(e.afterBody), P), k = t.displayColors ? l + 2 + t.boxPadding : 0, wt(i, (T) => {
    wt(T.before, P), wt(T.lines, P), wt(T.after, P);
  }), k = 0, n.font = p.string, wt(e.footer, P), n.restore(), C += S.width, {
    width: C,
    height: b
  };
}
function R2(e, t) {
  const { y: n, height: i } = t;
  return n < i / 2 ? "top" : n > e.height - i / 2 ? "bottom" : "center";
}
function j2(e, t, n, i) {
  const { x: r, width: o } = i, l = n.caretSize + n.caretPadding;
  if (e === "left" && r + o + l > t.width || e === "right" && r - o - l < 0)
    return !0;
}
function B2(e, t, n, i) {
  const { x: r, width: o } = n, { width: l, chartArea: { left: u, right: c } } = e;
  let d = "center";
  return i === "center" ? d = r <= (u + c) / 2 ? "left" : "right" : r <= o / 2 ? d = "left" : r >= l - o / 2 && (d = "right"), j2(d, e, t, n) && (d = "center"), d;
}
function Nm(e, t, n) {
  const i = n.yAlign || t.yAlign || R2(e, n);
  return {
    xAlign: n.xAlign || t.xAlign || B2(e, t, n, i),
    yAlign: i
  };
}
function F2(e, t) {
  let { x: n, width: i } = e;
  return t === "right" ? n -= i : t === "center" && (n -= i / 2), n;
}
function H2(e, t, n) {
  let { y: i, height: r } = e;
  return t === "top" ? i += n : t === "bottom" ? i -= r + n : i -= r / 2, i;
}
function Am(e, t, n, i) {
  const { caretSize: r, caretPadding: o, cornerRadius: l } = e, { xAlign: u, yAlign: c } = n, d = r + o, { topLeft: p, topRight: g, bottomLeft: _, bottomRight: x } = Ps(l);
  let S = F2(t, u);
  const b = H2(t, c, d);
  return c === "center" ? u === "left" ? S += d : u === "right" && (S -= d) : u === "left" ? S -= Math.max(p, _) + r : u === "right" && (S += Math.max(g, x) + r), {
    x: re(S, 0, i.width - t.width),
    y: re(b, 0, i.height - t.height)
  };
}
function oa(e, t, n) {
  const i = en(n.padding);
  return t === "center" ? e.x + e.width / 2 : t === "right" ? e.x + e.width - i.right : e.x + i.left;
}
function Im(e) {
  return cn([], kn(e));
}
function W2(e, t, n) {
  return Yi(e, {
    tooltip: t,
    tooltipItems: n,
    type: "tooltip"
  });
}
function Dm(e, t) {
  const n = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return n ? e.override(n) : e;
}
const ay = {
  beforeTitle: wn,
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
  afterTitle: wn,
  beforeBody: wn,
  beforeLabel: wn,
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
  afterLabel: wn,
  afterBody: wn,
  beforeFooter: wn,
  footer: wn,
  afterFooter: wn
};
function ge(e, t, n, i) {
  const r = e[t].call(n, i);
  return typeof r > "u" ? ay[t].call(n, i) : r;
}
class Kc extends _i {
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
    const n = this.chart, i = this.options.setContext(this.getContext()), r = i.enabled && n.options.animation && i.animations, o = new Vv(this.chart, r);
    return r._cacheable && (this._cachedAnimations = Object.freeze(o)), o;
  }
  getContext() {
    return this.$context || (this.$context = W2(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, n) {
    const { callbacks: i } = n, r = ge(i, "beforeTitle", this, t), o = ge(i, "title", this, t), l = ge(i, "afterTitle", this, t);
    let u = [];
    return u = cn(u, kn(r)), u = cn(u, kn(o)), u = cn(u, kn(l)), u;
  }
  getBeforeBody(t, n) {
    return Im(ge(n.callbacks, "beforeBody", this, t));
  }
  getBody(t, n) {
    const { callbacks: i } = n, r = [];
    return wt(t, (o) => {
      const l = {
        before: [],
        lines: [],
        after: []
      }, u = Dm(i, o);
      cn(l.before, kn(ge(u, "beforeLabel", this, o))), cn(l.lines, ge(u, "label", this, o)), cn(l.after, kn(ge(u, "afterLabel", this, o))), r.push(l);
    }), r;
  }
  getAfterBody(t, n) {
    return Im(ge(n.callbacks, "afterBody", this, t));
  }
  getFooter(t, n) {
    const { callbacks: i } = n, r = ge(i, "beforeFooter", this, t), o = ge(i, "footer", this, t), l = ge(i, "afterFooter", this, t);
    let u = [];
    return u = cn(u, kn(r)), u = cn(u, kn(o)), u = cn(u, kn(l)), u;
  }
  _createItems(t) {
    const n = this._active, i = this.chart.data, r = [], o = [], l = [];
    let u = [], c, d;
    for (c = 0, d = n.length; c < d; ++c)
      u.push(D2(this.chart, n[c]));
    return t.filter && (u = u.filter((p, g, _) => t.filter(p, g, _, i))), t.itemSort && (u = u.sort((p, g) => t.itemSort(p, g, i))), wt(u, (p) => {
      const g = Dm(t.callbacks, p);
      r.push(ge(g, "labelColor", this, p)), o.push(ge(g, "labelPointStyle", this, p)), l.push(ge(g, "labelTextColor", this, p));
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
      const u = br[i.position].call(this, r, this._eventPosition);
      l = this._createItems(i), this.title = this.getTitle(l, i), this.beforeBody = this.getBeforeBody(l, i), this.body = this.getBody(l, i), this.afterBody = this.getAfterBody(l, i), this.footer = this.getFooter(l, i);
      const c = this._size = Om(this, i), d = Object.assign({}, u, c), p = Nm(this.chart, i, d), g = Am(i, d, p, this.chart);
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
    const { xAlign: r, yAlign: o } = this, { caretSize: l, cornerRadius: u } = i, { topLeft: c, topRight: d, bottomLeft: p, bottomRight: g } = Ps(u), { x: _, y: x } = t, { width: S, height: b } = n;
    let C, w, k, P, T, E;
    return o === "center" ? (T = x + b / 2, r === "left" ? (C = _, w = C - l, P = T + l, E = T - l) : (C = _ + S, w = C + l, P = T - l, E = T + l), k = C) : (r === "left" ? w = _ + Math.max(c, p) + l : r === "right" ? w = _ + S - Math.max(d, g) - l : w = this.caretX, o === "top" ? (P = x, T = P - l, C = w - l, k = w + l) : (P = x + b, T = P + l, C = w + l, k = w - l), E = P), {
      x1: C,
      x2: w,
      x3: k,
      y1: P,
      y2: T,
      y3: E
    };
  }
  drawTitle(t, n, i) {
    const r = this.title, o = r.length;
    let l, u, c;
    if (o) {
      const d = Ms(i.rtl, this.x, this.width);
      for (t.x = oa(this, i.titleAlign, i), n.textAlign = d.textAlign(i.titleAlign), n.textBaseline = "middle", l = xe(i.titleFont), u = i.titleSpacing, n.fillStyle = i.titleColor, n.font = l.string, c = 0; c < o; ++c)
        n.fillText(r[c], d.x(t.x), t.y + l.lineHeight / 2), t.y += l.lineHeight + u, c + 1 === o && (t.y += i.titleMarginBottom - u);
    }
  }
  _drawColorBox(t, n, i, r, o) {
    const l = this.labelColors[i], u = this.labelPointStyles[i], { boxHeight: c, boxWidth: d } = o, p = xe(o.bodyFont), g = oa(this, "left", o), _ = r.x(g), x = c < p.lineHeight ? (p.lineHeight - c) / 2 : 0, S = n.y + x;
    if (o.usePointStyle) {
      const b = {
        radius: Math.min(d, c) / 2,
        pointStyle: u.pointStyle,
        rotation: u.rotation,
        borderWidth: 1
      }, C = r.leftForLtr(_, d) + d / 2, w = S + c / 2;
      t.strokeStyle = o.multiKeyBackground, t.fillStyle = o.multiKeyBackground, Vc(t, b, C, w), t.strokeStyle = l.borderColor, t.fillStyle = l.backgroundColor, Vc(t, b, C, w);
    } else {
      t.lineWidth = pt(l.borderWidth) ? Math.max(...Object.values(l.borderWidth)) : l.borderWidth || 1, t.strokeStyle = l.borderColor, t.setLineDash(l.borderDash || []), t.lineDashOffset = l.borderDashOffset || 0;
      const b = r.leftForLtr(_, d), C = r.leftForLtr(r.xPlus(_, 1), d - 2), w = Ps(l.borderRadius);
      Object.values(w).some((k) => k !== 0) ? (t.beginPath(), t.fillStyle = o.multiKeyBackground, nl(t, {
        x: b,
        y: S,
        w: d,
        h: c,
        radius: w
      }), t.fill(), t.stroke(), t.fillStyle = l.backgroundColor, t.beginPath(), nl(t, {
        x: C,
        y: S + 1,
        w: d - 2,
        h: c - 2,
        radius: w
      }), t.fill()) : (t.fillStyle = o.multiKeyBackground, t.fillRect(b, S, d, c), t.strokeRect(b, S, d, c), t.fillStyle = l.backgroundColor, t.fillRect(C, S + 1, d - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[i];
  }
  drawBody(t, n, i) {
    const { body: r } = this, { bodySpacing: o, bodyAlign: l, displayColors: u, boxHeight: c, boxWidth: d, boxPadding: p } = i, g = xe(i.bodyFont);
    let _ = g.lineHeight, x = 0;
    const S = Ms(i.rtl, this.x, this.width), b = function(I) {
      n.fillText(I, S.x(t.x + x), t.y + _ / 2), t.y += _ + o;
    }, C = S.textAlign(l);
    let w, k, P, T, E, N, A;
    for (n.textAlign = l, n.textBaseline = "middle", n.font = g.string, t.x = oa(this, C, i), n.fillStyle = i.bodyColor, wt(this.beforeBody, b), x = u && C !== "right" ? l === "center" ? d / 2 + p : d + 2 + p : 0, T = 0, N = r.length; T < N; ++T) {
      for (w = r[T], k = this.labelTextColors[T], n.fillStyle = k, wt(w.before, b), P = w.lines, u && P.length && (this._drawColorBox(n, t, T, S, i), _ = Math.max(g.lineHeight, c)), E = 0, A = P.length; E < A; ++E)
        b(P[E]), _ = g.lineHeight;
      wt(w.after, b);
    }
    x = 0, _ = g.lineHeight, wt(this.afterBody, b), t.y -= o;
  }
  drawFooter(t, n, i) {
    const r = this.footer, o = r.length;
    let l, u;
    if (o) {
      const c = Ms(i.rtl, this.x, this.width);
      for (t.x = oa(this, i.footerAlign, i), t.y += i.footerMarginTop, n.textAlign = c.textAlign(i.footerAlign), n.textBaseline = "middle", l = xe(i.footerFont), n.fillStyle = i.footerColor, n.font = l.string, u = 0; u < o; ++u)
        n.fillText(r[u], c.x(t.x), t.y + l.lineHeight / 2), t.y += l.lineHeight + i.footerSpacing;
    }
  }
  drawBackground(t, n, i, r) {
    const { xAlign: o, yAlign: l } = this, { x: u, y: c } = t, { width: d, height: p } = i, { topLeft: g, topRight: _, bottomLeft: x, bottomRight: S } = Ps(r.cornerRadius);
    n.fillStyle = r.backgroundColor, n.strokeStyle = r.borderColor, n.lineWidth = r.borderWidth, n.beginPath(), n.moveTo(u + g, c), l === "top" && this.drawCaret(t, n, i, r), n.lineTo(u + d - _, c), n.quadraticCurveTo(u + d, c, u + d, c + _), l === "center" && o === "right" && this.drawCaret(t, n, i, r), n.lineTo(u + d, c + p - S), n.quadraticCurveTo(u + d, c + p, u + d - S, c + p), l === "bottom" && this.drawCaret(t, n, i, r), n.lineTo(u + x, c + p), n.quadraticCurveTo(u, c + p, u, c + p - x), l === "center" && o === "left" && this.drawCaret(t, n, i, r), n.lineTo(u, c + g), n.quadraticCurveTo(u, c, u + g, c), n.closePath(), n.fill(), r.borderWidth > 0 && n.stroke();
  }
  _updateAnimationTarget(t) {
    const n = this.chart, i = this.$animations, r = i && i.x, o = i && i.y;
    if (r || o) {
      const l = br[t.position].call(this, this._active, this._eventPosition);
      if (!l)
        return;
      const u = this._size = Om(this, t), c = Object.assign({}, l, this._size), d = Nm(n, t, c), p = Am(t, c, d, n);
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
    const l = en(n.padding), u = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    n.enabled && u && (t.save(), t.globalAlpha = i, this.drawBackground(o, t, r, n), Rv(t, n.textDirection), o.y += l.top, this.drawTitle(o, t, n), this.drawBody(o, t, n), this.drawFooter(o, t, n), jv(t, n.textDirection), t.restore());
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
    }), o = !Qa(i, r), l = this._positionChanged(r, n);
    (o || l) && (this._active = r, this._eventPosition = n, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, n, i = !0) {
    if (n && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const r = this.options, o = this._active || [], l = this._getActiveElements(t, o, n, i), u = this._positionChanged(l, t), c = n || !Qa(l, o) || u;
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
    const { caretX: i, caretY: r, options: o } = this, l = br[o.position].call(this, t, n);
    return l !== !1 && (i !== l.x || r !== l.y);
  }
}
Y(Kc, "positioners", br);
var V2 = {
  id: "tooltip",
  _element: Kc,
  positioners: br,
  afterInit(e, t, n) {
    n && (e.tooltip = new Kc({
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
    callbacks: ay
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
const Z2 = (e, t, n, i) => (typeof t == "string" ? (n = e.push(t) - 1, i.unshift({
  index: n,
  label: t
})) : isNaN(t) && (n = null), n);
function U2(e, t, n, i) {
  const r = e.indexOf(t);
  if (r === -1)
    return Z2(e, t, n, i);
  const o = e.lastIndexOf(t);
  return r !== o ? n : r;
}
const $2 = (e, t) => e === null ? null : re(Math.round(e), 0, t);
function Rm(e) {
  const t = this.getLabels();
  return e >= 0 && e < t.length ? t[e] : e;
}
class Xc extends Bs {
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
    return n = isFinite(n) && i[n] === t ? n : U2(i, t, ot(n, t), this._addedLabels), $2(n, i.length - 1);
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
    return Rm.call(this, t);
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
Y(Xc, "id", "category"), Y(Xc, "defaults", {
  ticks: {
    callback: Rm
  }
});
function Y2(e, t) {
  const n = [], { bounds: r, step: o, min: l, max: u, precision: c, count: d, maxTicks: p, maxDigits: g, includeBounds: _ } = e, x = o || 1, S = p - 1, { min: b, max: C } = t, w = !xt(l), k = !xt(u), P = !xt(d), T = (C - b) / (g + 1);
  let E = Ap((C - b) / S / x) * x, N, A, I, H;
  if (E < 1e-14 && !w && !k)
    return [
      {
        value: b
      },
      {
        value: C
      }
    ];
  H = Math.ceil(C / E) - Math.floor(b / E), H > S && (E = Ap(H * E / S / x) * x), xt(c) || (N = Math.pow(10, c), E = Math.ceil(E * N) / N), r === "ticks" ? (A = Math.floor(b / E) * E, I = Math.ceil(C / E) * E) : (A = b, I = C), w && k && o && Qw((u - l) / o, E / 1e3) ? (H = Math.round(Math.min((u - l) / E, p)), E = (u - l) / H, A = l, I = u) : P ? (A = w ? l : A, I = k ? u : I, H = d - 1, E = (I - A) / H) : (H = (I - A) / E, Nr(H, Math.round(H), E / 1e3) ? H = Math.round(H) : H = Math.ceil(H));
  const B = Math.max(Ip(E), Ip(A));
  N = Math.pow(10, xt(c) ? B : c), A = Math.round(A * N) / N, I = Math.round(I * N) / N;
  let W = 0;
  for (w && (_ && A !== l ? (n.push({
    value: l
  }), A < l && W++, Nr(Math.round((A + W * E) * N) / N, l, jm(l, T, e)) && W++) : A < l && W++); W < H; ++W) {
    const U = Math.round((A + W * E) * N) / N;
    if (k && U > u)
      break;
    n.push({
      value: U
    });
  }
  return k && _ && I !== u ? n.length && Nr(n[n.length - 1].value, u, jm(u, T, e)) ? n[n.length - 1].value = u : n.push({
    value: u
  }) : (!k || I === u) && n.push({
    value: I
  }), n;
}
function jm(e, t, { horizontal: n, minRotation: i }) {
  const r = Tn(i), o = (n ? Math.sin(r) : Math.cos(r)) || 1e-3, l = 0.75 * t * ("" + e).length;
  return Math.min(t / o, l);
}
class K2 extends Bs {
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
      const c = gn(r), d = gn(o);
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
    }, o = this._range || this, l = Y2(r, o);
    return t.bounds === "ticks" && Jw(l, this, "value"), t.reverse ? (l.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), l;
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
    return td(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class Gc extends K2 {
  determineDataLimits() {
    const { min: t, max: n } = this.getMinMax(!0);
    this.min = ae(t) ? t : 0, this.max = ae(n) ? n : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), n = t ? this.width : this.height, i = Tn(this.options.ticks.minRotation), r = (t ? Math.sin(i) : Math.cos(i)) || 1e-3, o = this._resolveTickFontOptions(0);
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
    callback: Tv.formatters.numeric
  }
});
const Tl = {
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
}, ve = /* @__PURE__ */ Object.keys(Tl);
function Bm(e, t) {
  return e - t;
}
function Fm(e, t) {
  if (xt(t))
    return null;
  const n = e._adapter, { parser: i, round: r, isoWeekday: o } = e._parseOpts;
  let l = t;
  return typeof i == "function" && (l = i(l)), ae(l) || (l = typeof i == "string" ? n.parse(l, i) : n.parse(l)), l === null ? null : (r && (l = r === "week" && (no(o) || o === !0) ? n.startOf(l, "isoWeek", o) : n.startOf(l, r)), +l);
}
function Hm(e, t, n, i) {
  const r = ve.length;
  for (let o = ve.indexOf(e); o < r - 1; ++o) {
    const l = Tl[ve[o]], u = l.steps ? l.steps : Number.MAX_SAFE_INTEGER;
    if (l.common && Math.ceil((n - t) / (u * l.size)) <= i)
      return ve[o];
  }
  return ve[r - 1];
}
function X2(e, t, n, i, r) {
  for (let o = ve.length - 1; o >= ve.indexOf(n); o--) {
    const l = ve[o];
    if (Tl[l].common && e._adapter.diff(r, i, l) >= t - 1)
      return l;
  }
  return ve[n ? ve.indexOf(n) : 0];
}
function G2(e) {
  for (let t = ve.indexOf(e) + 1, n = ve.length; t < n; ++t)
    if (Tl[ve[t]].common)
      return ve[t];
}
function Wm(e, t, n) {
  if (!n)
    e[t] = !0;
  else if (n.length) {
    const { lo: i, hi: r } = Qh(n, t), o = n[i] >= t ? n[i] : n[r];
    e[o] = !0;
  }
}
function q2(e, t, n, i) {
  const r = e._adapter, o = +r.startOf(t[0].value, i), l = t[t.length - 1].value;
  let u, c;
  for (u = o; u <= l; u = +r.add(u, 1, i))
    c = n[u], c >= 0 && (t[c].major = !0);
  return t;
}
function Vm(e, t, n) {
  const i = [], r = {}, o = t.length;
  let l, u;
  for (l = 0; l < o; ++l)
    u = t[l], r[u] = l, i.push({
      value: u,
      major: !1
    });
  return o === 0 || !n ? i : q2(e, i, r, n);
}
class ol extends Bs {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, n = {}) {
    const i = t.time || (t.time = {}), r = this._adapter = new Ik._date(t.adapters.date);
    r.init(n), Or(i.displayFormats, r.formats()), this._parseOpts = {
      parser: i.parser,
      round: i.round,
      isoWeekday: i.isoWeekday
    }, super.init(t), this._normalized = n.normalized;
  }
  parse(t, n) {
    return t === void 0 ? null : Fm(this, t);
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
    const o = this.min, l = this.max, u = sb(r, o, l);
    return this._unit = n.unit || (i.autoSkip ? Hm(n.minUnit, this.min, this.max, this._getLabelCapacity(o)) : X2(this, u.length, n.minUnit, this.min, this.max)), this._majorUnit = !i.major.enabled || this._unit === "year" ? void 0 : G2(this._unit), this.initOffsets(r), t.reverse && u.reverse(), Vm(this, u, this._majorUnit);
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
    const t = this._adapter, n = this.min, i = this.max, r = this.options, o = r.time, l = o.unit || Hm(o.minUnit, n, i, this._getLabelCapacity(n)), u = ot(r.ticks.stepSize, 1), c = l === "week" ? o.isoWeekday : !1, d = no(c) || c === !0, p = {};
    let g = n, _, x;
    if (d && (g = +t.startOf(g, "isoWeek", c)), g = +t.startOf(g, d ? "day" : l), t.diff(i, n, l) > 1e5 * u)
      throw new Error(n + " and " + i + " are too far apart with stepSize of " + u + " " + l);
    const S = r.ticks.source === "data" && this.getDataTimestamps();
    for (_ = g, x = 0; _ < i; _ = +t.add(_, u, l), x++)
      Wm(p, _, S);
    return (_ === i || r.bounds === "ticks" || x === 1) && Wm(p, _, S), Object.keys(p).sort(Bm).map((b) => +b);
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
    const n = this.options.ticks, i = this.ctx.measureText(t).width, r = Tn(this.isHorizontal() ? n.maxRotation : n.minRotation), o = Math.cos(r), l = Math.sin(r), u = this._resolveTickFontOptions(0).size;
    return {
      w: i * o + u * l,
      h: i * l + u * o
    };
  }
  _getLabelCapacity(t) {
    const n = this.options.time, i = n.displayFormats, r = i[n.unit] || i.millisecond, o = this._tickFormatFunction(t, 0, Vm(this, [
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
      t.push(Fm(this, r[n]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return Pv(t.sort(Bm));
  }
}
Y(ol, "id", "time"), Y(ol, "defaults", {
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
function aa(e, t, n) {
  let i = 0, r = e.length - 1, o, l, u, c;
  n ? (t >= e[i].pos && t <= e[r].pos && ({ lo: i, hi: r } = Ni(e, "pos", t)), { pos: o, time: u } = e[i], { pos: l, time: c } = e[r]) : (t >= e[i].time && t <= e[r].time && ({ lo: i, hi: r } = Ni(e, "time", t)), { time: o, pos: u } = e[i], { time: l, pos: c } = e[r]);
  const d = l - o;
  return d ? u + (c - u) * (t - o) / d : u;
}
class Zm extends ol {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), n = this._table = this.buildLookupTable(t);
    this._minPos = aa(n, this.min), this._tableRange = aa(n, this.max) - this._minPos, super.initOffsets(t);
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
    return (aa(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const n = this._offsets, i = this.getDecimalForPixel(t) / n.factor - n.end;
    return aa(this._table, i * this._tableRange + this._minPos, !0);
  }
}
Y(Zm, "id", "timeseries"), Y(Zm, "defaults", ol.defaults);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ly = (...e) => e.filter((t, n, i) => !!t && t.trim() !== "" && i.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Q2 = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const J2 = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, i) => i ? i.toUpperCase() : n.toLowerCase()
);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Um = (e) => {
  const t = J2(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
};
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Uu = {
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
const tP = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
  return !1;
}, eP = G.createContext({}), nP = () => G.useContext(eP), iP = G.forwardRef(
  ({ color: e, size: t, strokeWidth: n, absoluteStrokeWidth: i, className: r = "", children: o, iconNode: l, ...u }, c) => {
    const {
      size: d = 24,
      strokeWidth: p = 2,
      absoluteStrokeWidth: g = !1,
      color: _ = "currentColor",
      className: x = ""
    } = nP() ?? {}, S = i ?? g ? Number(n ?? p) * 24 / Number(t ?? d) : n ?? p;
    return G.createElement(
      "svg",
      {
        ref: c,
        ...Uu,
        width: t ?? d ?? Uu.width,
        height: t ?? d ?? Uu.height,
        stroke: e ?? _,
        strokeWidth: S,
        className: ly("lucide", x, r),
        ...!o && !tP(u) && { "aria-hidden": "true" },
        ...u
      },
      [
        ...l.map(([b, C]) => G.createElement(b, C)),
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
const mt = (e, t) => {
  const n = G.forwardRef(
    ({ className: i, ...r }, o) => G.createElement(iP, {
      ref: o,
      iconNode: t,
      className: ly(
        `lucide-${Q2(Um(e))}`,
        `lucide-${e}`,
        i
      ),
      ...r
    })
  );
  return n.displayName = Um(e), n;
};
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
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
], uy = mt("activity", sP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rP = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
], oP = mt("briefcase", rP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aP = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
], cy = mt("chart-column", aP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lP = [
  [
    "path",
    {
      d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
      key: "pzmjnu"
    }
  ],
  ["path", { d: "M21.21 15.89A10 10 0 1 1 8 2.83", key: "k2fpak" }]
], uP = mt("chart-pie", lP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cP = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], $m = mt("chevron-down", cP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hP = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], Ym = mt("circle-alert", hP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dP = [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
], fP = mt("database", dP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pP = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], $u = mt("download", pP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mP = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
], hy = mt("external-link", mP);
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
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
], Km = mt("file-spreadsheet", gP);
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
], vP = mt("fish", _P);
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
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
], xP = mt("flame", yP);
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
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
], Xm = mt("funnel", wP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bP = [
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
], kP = mt("hard-drive", bP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const SP = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
], PP = mt("inbox", SP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const MP = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], CP = mt("layout-dashboard", MP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const LP = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
], qc = mt("lightbulb", LP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const TP = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], EP = mt("lock", TP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zP = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
], OP = mt("log-out", zP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const NP = [
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
], dy = mt("map-pinned", NP);
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
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
], IP = mt("map-pin", AP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const DP = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
], RP = mt("menu", DP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jP = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  [
    "path",
    {
      d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
      key: "1fd625"
    }
  ]
], BP = mt("octagon-alert", jP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const FP = [
  ["path", { d: "M16.247 7.761a6 6 0 0 1 0 8.478", key: "1fwjs5" }],
  ["path", { d: "M19.075 4.933a10 10 0 0 1 0 14.134", key: "ehdyv1" }],
  ["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134", key: "1q22gi" }],
  ["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478", key: "r2q7qm" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
], HP = mt("radio", FP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WP = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], VP = mt("refresh-cw", WP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ZP = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], UP = mt("rotate-ccw", ZP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $P = [
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
], fy = mt("satellite", $P);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const YP = [
  ["path", { d: "m13.5 8.5-5 5", key: "1cs55j" }],
  ["path", { d: "m8.5 8.5 5 5", key: "a8mexj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
], KP = mt("search-x", YP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const XP = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], GP = mt("search", XP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qP = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], py = mt("shield-check", qP);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], JP = mt("shield", QP);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tM = [
  ["path", { d: "M12 3v18", key: "108xh3" }],
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }]
], my = mt("table", tM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const eM = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
], nM = mt("trending-down", eM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const iM = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
], sM = mt("trending-up", iM);
/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rM = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], oM = mt("upload", rM);
function aM(e) {
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
function lM(e) {
  if (!e) return "-";
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : t.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}
function gy(e) {
  const t = Number(e || 0);
  return t > 80 ? "high" : t >= 50 ? "medium" : "low";
}
const uM = [
  {
    title: "Monitoring",
    items: [
      { id: "overview", label: "Overview", icon: CP },
      { id: "map", label: "Threat Map", icon: dy },
      { id: "alerts", label: "Live Alerts", icon: HP }
    ]
  },
  {
    title: "Analysis",
    items: [
      { id: "analytics", label: "Analytics", icon: cy },
      { id: "incidents", label: "Incidents", icon: my }
    ]
  },
  {
    title: "Intelligence",
    items: [
      { id: "osint", label: "OSINT Feed", icon: fy },
      { id: "reco", label: "Recommendations", icon: qc }
    ]
  }
];
function cM({ activeSection: e, onSelect: t, isOpen: n, syncStatus: i, lastSync: r }) {
  function o(u) {
    t == null || t(u);
    const c = document.getElementById(`section-${u}`);
    c && c.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  const l = !!(i != null && i.running);
  return /* @__PURE__ */ y.jsxs("aside", { className: `sidebar ${n ? "is-open" : ""}`, "aria-label": "Primary navigation", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "sidebar-head", children: [
      /* @__PURE__ */ y.jsx("div", { className: "brand-mark", "aria-hidden": "true", children: /* @__PURE__ */ y.jsx(JP, { size: 20, strokeWidth: 2 }) }),
      /* @__PURE__ */ y.jsxs("div", { className: "brand-copy", children: [
        /* @__PURE__ */ y.jsx("div", { className: "brand-title", children: "Wildlife Intelligence" }),
        /* @__PURE__ */ y.jsx("div", { className: "brand-sub", children: "Command Center" })
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("nav", { className: "sidebar-body", children: uM.map((u) => /* @__PURE__ */ y.jsxs("div", { className: "nav-group", children: [
      /* @__PURE__ */ y.jsx("div", { className: "nav-group-title", children: u.title }),
      u.items.map(({ id: c, label: d, icon: p }) => {
        const g = e === c;
        return /* @__PURE__ */ y.jsxs(
          "button",
          {
            type: "button",
            className: `nav-item ${g ? "is-active" : ""}`,
            onClick: () => o(c),
            "aria-current": g ? "page" : void 0,
            children: [
              /* @__PURE__ */ y.jsx(p, { size: 16, className: "nav-icon", strokeWidth: 2 }),
              /* @__PURE__ */ y.jsx("span", { children: d }),
              /* @__PURE__ */ y.jsx("span", { className: "nav-dot", "aria-hidden": "true" })
            ]
          },
          c
        );
      })
    ] }, u.title)) }),
    /* @__PURE__ */ y.jsx("div", { className: "sidebar-foot", children: /* @__PURE__ */ y.jsxs("div", { className: "sync-card", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "sync-row", children: [
        /* @__PURE__ */ y.jsx("span", { children: "Data sync" }),
        /* @__PURE__ */ y.jsxs("span", { className: `pulse ${l ? "" : "is-idle"}`, children: [
          /* @__PURE__ */ y.jsx("span", { className: "pulse-dot" }),
          l ? "Live" : "Idle"
        ] })
      ] }),
      /* @__PURE__ */ y.jsxs("div", { className: "sync-row", children: [
        /* @__PURE__ */ y.jsx("span", { children: "Last update" }),
        /* @__PURE__ */ y.jsx("strong", { className: "mono", children: lM(r) })
      ] })
    ] }) })
  ] });
}
function hM({
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
  }, c = !!(n != null && n.running), d = c ? "Search in progress" : "Auto search active", p = (n == null ? void 0 : n.progress) || {}, g = String((n == null ? void 0 : n.message) || "").trim(), _ = typeof p.stage == "string" && p.stage !== "-" ? p.stage : "", x = typeof p.provider == "string" && p.provider !== "-" ? p.provider : "", S = typeof p.language == "string" && p.language !== "-" ? p.language : "", b = typeof p.query == "string" && p.query !== "-" ? p.query : "", C = [x, S].filter(Boolean).join(" / "), w = [];
  _ && w.push(`stage: ${_}`), C && w.push(C), b && w.push(`q: ${b}`);
  const k = c ? w.join(" • ") || g || "Collecting live reports" : "", [P, T] = G.useState(null), E = G.useRef(null), N = G.useRef(null);
  G.useEffect(() => {
    function U(it) {
      E.current && !E.current.contains(it.target) && N.current && !N.current.contains(it.target) && T(null);
    }
    function vt(it) {
      it.key === "Escape" && T(null);
    }
    return P && (document.addEventListener("mousedown", U), document.addEventListener("keydown", vt)), () => {
      document.removeEventListener("mousedown", U), document.removeEventListener("keydown", vt);
    };
  }, [P]);
  const A = () => typeof import.meta < "u" ? "".trim().replace(/\/$/, "") : "", I = (U) => {
    r(U), T(null);
  }, H = () => {
    window.location.href = `${A()}/api/public/download-csv`, T(null);
  }, B = () => {
    window.location.href = `${A()}/api/public/download-db`, T(null);
  }, W = () => {
    T(null);
    const U = document.createElement("input");
    U.type = "file", U.accept = ".db,.sqlite,.sqlite3", U.onchange = async (vt) => {
      var J;
      const it = (J = vt.target.files) == null ? void 0 : J[0];
      if (!it || !confirm(`Restore database from "${it.name}"? This will replace all current data.`)) return;
      const ht = new FormData();
      ht.append("file", it);
      try {
        const D = await (await fetch(`${A()}/api/public/upload-db`, { method: "POST", body: ht })).json();
        D.ok ? (alert(`Database restored!

Total rows: ${D.total_rows}
Poaching articles: ${D.poaching_rows}
Predictor retrained: ${D.predictor_retrained ? "Yes" : "No"}`), window.location.reload()) : alert(`Restore failed: ${D.detail || "Unknown error"}`);
      } catch (dt) {
        alert(`Upload failed: ${dt.message}`);
      }
    }, U.click();
  };
  return /* @__PURE__ */ y.jsxs("header", { className: "topbar", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "topbar-left", children: [
      /* @__PURE__ */ y.jsx(
        "button",
        {
          type: "button",
          className: "mobile-menu",
          onClick: o,
          "aria-label": "Open navigation menu",
          children: /* @__PURE__ */ y.jsx(RP, { size: 18 })
        }
      ),
      /* @__PURE__ */ y.jsxs("div", { className: "breadcrumb", children: [
        /* @__PURE__ */ y.jsx("span", { children: "Wildlife Intelligence" }),
        /* @__PURE__ */ y.jsx("span", { className: "sep", children: "/" }),
        /* @__PURE__ */ y.jsx("strong", { children: u[e] || "Overview" })
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("div", { className: "topbar-center", children: /* @__PURE__ */ y.jsxs("div", { className: `sync-pill ${c ? "is-running" : "is-idle"}`, role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ y.jsx("span", { className: "sync-pill-dot", "aria-hidden": "true" }),
      /* @__PURE__ */ y.jsx("span", { className: "sync-pill-label", children: d }),
      k ? /* @__PURE__ */ y.jsx("span", { className: "sync-pill-meta", children: k }) : null
    ] }) }),
    /* @__PURE__ */ y.jsxs("div", { className: "topbar-right", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "dropdown", ref: E, children: [
        /* @__PURE__ */ y.jsxs(
          "button",
          {
            type: "button",
            className: "btn",
            onClick: () => T(P === "export" ? null : "export"),
            "aria-haspopup": "menu",
            "aria-expanded": P === "export",
            children: [
              /* @__PURE__ */ y.jsx($u, { size: 15 }),
              /* @__PURE__ */ y.jsx("span", { className: "btn-label", children: "Export" }),
              /* @__PURE__ */ y.jsx($m, { size: 13, className: `dropdown-caret ${P === "export" ? "is-open" : ""}` })
            ]
          }
        ),
        P === "export" && /* @__PURE__ */ y.jsxs("div", { className: "dropdown-menu", role: "menu", children: [
          /* @__PURE__ */ y.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: () => I("csv"), children: [
            /* @__PURE__ */ y.jsx($u, { size: 14 }),
            /* @__PURE__ */ y.jsx("span", { children: "Export as CSV" })
          ] }),
          /* @__PURE__ */ y.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: () => I("excel"), children: [
            /* @__PURE__ */ y.jsx(Km, { size: 14 }),
            /* @__PURE__ */ y.jsx("span", { children: "Export as Excel" })
          ] }),
          /* @__PURE__ */ y.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: () => I("excel_incidents_reports"), children: [
            /* @__PURE__ */ y.jsx(Km, { size: 14 }),
            /* @__PURE__ */ y.jsx("span", { children: "Excel (2-Sheet)" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ y.jsxs("div", { className: "dropdown", ref: N, children: [
        /* @__PURE__ */ y.jsxs(
          "button",
          {
            type: "button",
            className: "btn",
            onClick: () => T(P === "database" ? null : "database"),
            "aria-haspopup": "menu",
            "aria-expanded": P === "database",
            children: [
              /* @__PURE__ */ y.jsx(fP, { size: 15 }),
              /* @__PURE__ */ y.jsx("span", { className: "btn-label", children: "Database" }),
              /* @__PURE__ */ y.jsx($m, { size: 13, className: `dropdown-caret ${P === "database" ? "is-open" : ""}` })
            ]
          }
        ),
        P === "database" && /* @__PURE__ */ y.jsxs("div", { className: "dropdown-menu", role: "menu", children: [
          /* @__PURE__ */ y.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: H, children: [
            /* @__PURE__ */ y.jsx($u, { size: 14 }),
            /* @__PURE__ */ y.jsx("span", { children: "Download All Data (CSV)" })
          ] }),
          /* @__PURE__ */ y.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: B, children: [
            /* @__PURE__ */ y.jsx(kP, { size: 14 }),
            /* @__PURE__ */ y.jsx("span", { children: "Download Database" })
          ] }),
          /* @__PURE__ */ y.jsxs("button", { type: "button", role: "menuitem", className: "dropdown-item", onClick: W, children: [
            /* @__PURE__ */ y.jsx(oM, { size: 14 }),
            /* @__PURE__ */ y.jsx("span", { children: "Upload Database" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ y.jsx("div", { className: "topbar-divider" }),
      /* @__PURE__ */ y.jsxs(
        "button",
        {
          type: "button",
          className: "btn btn-ghost",
          onClick: i,
          disabled: t,
          "aria-label": "Refresh data",
          children: [
            /* @__PURE__ */ y.jsx(VP, { size: 15, className: t ? "spin" : "" }),
            /* @__PURE__ */ y.jsx("span", { className: "btn-label", children: "Refresh" })
          ]
        }
      ),
      /* @__PURE__ */ y.jsxs("button", { type: "button", className: "btn btn-ghost", onClick: l, "aria-label": "Logout", children: [
        /* @__PURE__ */ y.jsx(OP, { size: 15 }),
        /* @__PURE__ */ y.jsx("span", { className: "btn-label", children: "Logout" })
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("style", { children: `
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      ` })
  ] });
}
function dM(e) {
  const t = Number(e || 0);
  return Number.isFinite(t) ? t >= 1e3 ? t.toLocaleString("en-US") : t.toString() : "0";
}
function fM({ value: e }) {
  if (e == null) return null;
  const t = e >= 0, n = t ? sM : nM;
  return /* @__PURE__ */ y.jsxs("span", { className: `kpi-trend ${t ? "is-up" : "is-down"}`, children: [
    /* @__PURE__ */ y.jsx(n, { size: 12 }),
    Math.abs(e).toFixed(1),
    "%"
  ] });
}
function pM({ summary: e, loading: t }) {
  const n = (e == null ? void 0 : e.kpis) || e || {}, i = [
    {
      id: "total",
      label: "Total Incidents",
      value: n.total_incidents ?? 0,
      trend: n.trend_incidents,
      icon: BP,
      tone: "primary",
      hint: "All tracked events"
    },
    {
      id: "high",
      label: "High Risk",
      value: n.high_risk_count ?? n.high_risk ?? 0,
      trend: n.trend_high_risk,
      icon: xP,
      tone: "danger",
      hint: "Risk score above 80"
    },
    {
      id: "states",
      label: "States Affected",
      value: n.states_affected ?? n.states_active ?? 0,
      trend: n.trend_states,
      icon: IP,
      tone: "default",
      hint: "With recent activity"
    },
    {
      id: "species",
      label: "Species Impacted",
      value: n.species_impacted ?? n.species_tracked ?? 0,
      trend: n.trend_species,
      icon: vP,
      tone: "warn",
      hint: "Unique species tracked"
    }
  ];
  return t && !e ? /* @__PURE__ */ y.jsx("div", { className: "kpi-grid", "aria-busy": "true", children: Array.from({ length: 4 }).map((r, o) => /* @__PURE__ */ y.jsx("div", { className: "skel skel-kpi" }, o)) }) : /* @__PURE__ */ y.jsx("div", { className: "kpi-grid", children: i.map(({ id: r, label: o, value: l, trend: u, icon: c, tone: d, hint: p }) => /* @__PURE__ */ y.jsxs(
    "article",
    {
      className: `kpi-card ${d === "danger" ? "is-danger" : d === "primary" ? "is-primary" : d === "warn" ? "is-warn" : ""}`,
      children: [
        /* @__PURE__ */ y.jsxs("div", { className: "kpi-head", children: [
          /* @__PURE__ */ y.jsx("div", { className: "kpi-label", children: o }),
          /* @__PURE__ */ y.jsx("div", { className: "kpi-icon", children: /* @__PURE__ */ y.jsx(c, { size: 16, strokeWidth: 2 }) })
        ] }),
        /* @__PURE__ */ y.jsxs("div", { className: "kpi-body", children: [
          /* @__PURE__ */ y.jsx("div", { className: "kpi-value", children: dM(l) }),
          /* @__PURE__ */ y.jsx(fM, { value: u })
        ] }),
        /* @__PURE__ */ y.jsx("div", { className: "kpi-meta", children: p })
      ]
    },
    r
  )) });
}
var Qc = { exports: {} };
/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
(function(e, t) {
  (function(n, i) {
    i(t);
  })(U0, function(n) {
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
      var f, m, v, M;
      return M = function() {
        f = !1, m && (v.apply(h, m), m = !1);
      }, v = function() {
        f ? m = arguments : (s.apply(h, arguments), setTimeout(M, a), f = !0);
      }, v;
    }
    function p(s, a, h) {
      var f = a[1], m = a[0], v = f - m;
      return s === f && h ? s : ((s - m) % v + v) % v + m;
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
    function b(s, a) {
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
    function k(s, a) {
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
    var A = 0;
    function I(s) {
      var a = +/* @__PURE__ */ new Date(), h = Math.max(0, 16 - (a - A));
      return A = a + h, window.setTimeout(s, h);
    }
    var H = window.requestAnimationFrame || N("RequestAnimationFrame") || I, B = window.cancelAnimationFrame || N("CancelAnimationFrame") || N("CancelRequestAnimationFrame") || function(s) {
      window.clearTimeout(s);
    };
    function W(s, a, h) {
      if (h && H === I)
        s.call(a);
      else
        return H.call(window, l(s, a));
    }
    function U(s) {
      s && B.call(window, s);
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
      setOptions: b,
      getParamString: C,
      template: k,
      isArray: P,
      indexOf: T,
      emptyImageUrl: E,
      requestFn: H,
      cancelFn: B,
      requestAnimFrame: W,
      cancelAnimFrame: U
    };
    function it() {
    }
    it.extend = function(s) {
      var a = function() {
        b(this), this.initialize && this.initialize.apply(this, arguments), this.callInitHooks();
      }, h = a.__super__ = this.prototype, f = o(h);
      f.constructor = a, a.prototype = f;
      for (var m in this)
        Object.prototype.hasOwnProperty.call(this, m) && m !== "prototype" && m !== "__super__" && (a[m] = this[m]);
      return s.statics && r(a, s.statics), s.includes && (ht(s.includes), r.apply(null, [f].concat(s.includes))), r(f, s), delete f.statics, delete f.includes, f.options && (f.options = h.options ? o(h.options) : {}, r(f.options, s.options)), f._initHooks = [], f.callInitHooks = function() {
        if (!this._initHooksCalled) {
          h.callInitHooks && h.callInitHooks.call(this), this._initHooksCalled = !0;
          for (var v = 0, M = f._initHooks.length; v < M; v++)
            f._initHooks[v].call(this);
        }
      }, a;
    }, it.include = function(s) {
      var a = this.prototype.options;
      return r(this.prototype, s), s.options && (this.prototype.options = a, this.mergeOptions(s.options)), this;
    }, it.mergeOptions = function(s) {
      return r(this.prototype.options, s), this;
    }, it.addInitHook = function(s) {
      var a = Array.prototype.slice.call(arguments, 1), h = typeof s == "function" ? s : function() {
        this[s].apply(this, a);
      };
      return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(h), this;
    };
    function ht(s) {
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
          for (var m = 0, v = s.length; m < v; m++)
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
          for (var m = arguments.length === 1, v = 0, M = s.length; v < M; v++)
            m ? this._off(s[v]) : this._off(s[v], a, h);
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
        var f, m, v;
        if (this._events && (f = this._events[s], !!f)) {
          if (arguments.length === 1) {
            if (this._firingCount)
              for (m = 0, v = f.length; m < v; m++)
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
            for (var v = 0, M = m.length; v < M; v++) {
              var z = m[v], O = z.fn;
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
        var v = this._events && this._events[s];
        if (v && v.length && this._listens(s, m, h) !== !1)
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
        for (var m = 0, v = f.length; m < v; m++)
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
          for (var m = 0, v = s.length; m < v; m++)
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
    var dt = it.extend(J);
    function D(s, a, h) {
      this.x = h ? Math.round(s) : s, this.y = h ? Math.round(a) : a;
    }
    var $ = Math.trunc || function(s) {
      return s > 0 ? Math.floor(s) : Math.ceil(s);
    };
    D.prototype = {
      // @method clone(): Point
      // Returns a copy of the current point.
      clone: function() {
        return new D(this.x, this.y);
      },
      // @method add(otherPoint: Point): Point
      // Returns the result of addition of the current and the given points.
      add: function(s) {
        return this.clone()._add(j(s));
      },
      _add: function(s) {
        return this.x += s.x, this.y += s.y, this;
      },
      // @method subtract(otherPoint: Point): Point
      // Returns the result of subtraction of the given point from the current.
      subtract: function(s) {
        return this.clone()._subtract(j(s));
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
        return new D(this.x * s.x, this.y * s.y);
      },
      // @method unscaleBy(scale: Point): Point
      // Inverse of `scaleBy`. Divide each coordinate of the current point by
      // each coordinate of `scale`.
      unscaleBy: function(s) {
        return new D(this.x / s.x, this.y / s.y);
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
        s = j(s);
        var a = s.x - this.x, h = s.y - this.y;
        return Math.sqrt(a * a + h * h);
      },
      // @method equals(otherPoint: Point): Boolean
      // Returns `true` if the given point has the same coordinates.
      equals: function(s) {
        return s = j(s), s.x === this.x && s.y === this.y;
      },
      // @method contains(otherPoint: Point): Boolean
      // Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
      contains: function(s) {
        return s = j(s), Math.abs(s.x) <= Math.abs(this.x) && Math.abs(s.y) <= Math.abs(this.y);
      },
      // @method toString(): String
      // Returns a string representation of the point for debugging purposes.
      toString: function() {
        return "Point(" + _(this.x) + ", " + _(this.y) + ")";
      }
    };
    function j(s, a, h) {
      return s instanceof D ? s : P(s) ? new D(s[0], s[1]) : s == null ? s : typeof s == "object" && "x" in s && "y" in s ? new D(s.x, s.y) : new D(s, a, h);
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
        if (s instanceof D || typeof s[0] == "number" || "x" in s)
          a = h = j(s);
        else if (s = tt(s), a = s.min, h = s.max, !a || !h)
          return this;
        return !this.min && !this.max ? (this.min = a.clone(), this.max = h.clone()) : (this.min.x = Math.min(a.x, this.min.x), this.max.x = Math.max(h.x, this.max.x), this.min.y = Math.min(a.y, this.min.y), this.max.y = Math.max(h.y, this.max.y)), this;
      },
      // @method getCenter(round?: Boolean): Point
      // Returns the center point of the bounds.
      getCenter: function(s) {
        return j(
          (this.min.x + this.max.x) / 2,
          (this.min.y + this.max.y) / 2,
          s
        );
      },
      // @method getBottomLeft(): Point
      // Returns the bottom-left point of the bounds.
      getBottomLeft: function() {
        return j(this.min.x, this.max.y);
      },
      // @method getTopRight(): Point
      // Returns the top-right point of the bounds.
      getTopRight: function() {
        return j(this.max.x, this.min.y);
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
        return typeof s[0] == "number" || s instanceof D ? s = j(s) : s = tt(s), s instanceof X ? (a = s.min, h = s.max) : a = h = s, a.x >= this.min.x && h.x <= this.max.x && a.y >= this.min.y && h.y <= this.max.y;
      },
      // @method intersects(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds
      // intersect if they have at least one point in common.
      intersects: function(s) {
        s = tt(s);
        var a = this.min, h = this.max, f = s.min, m = s.max, v = m.x >= a.x && f.x <= h.x, M = m.y >= a.y && f.y <= h.y;
        return v && M;
      },
      // @method overlaps(otherBounds: Bounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds
      // overlap if their intersection is an area.
      overlaps: function(s) {
        s = tt(s);
        var a = this.min, h = this.max, f = s.min, m = s.max, v = m.x > a.x && f.x < h.x, M = m.y > a.y && f.y < h.y;
        return v && M;
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
          j(a.x - f, a.y - m),
          j(h.x + f, h.y + m)
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
    function kt(s, a) {
      if (s)
        for (var h = a ? [s, a] : s, f = 0, m = h.length; f < m; f++)
          this.extend(h[f]);
    }
    kt.prototype = {
      // @method extend(latlng: LatLng): this
      // Extend the bounds to contain the given point
      // @alternative
      // @method extend(otherBounds: LatLngBounds): this
      // Extend the bounds to contain the given bounds
      extend: function(s) {
        var a = this._southWest, h = this._northEast, f, m;
        if (s instanceof st)
          f = s, m = s;
        else if (s instanceof kt) {
          if (f = s._southWest, m = s._northEast, !f || !m)
            return this;
        } else
          return s ? this.extend(q(s) || lt(s)) : this;
        return !a && !h ? (this._southWest = new st(f.lat, f.lng), this._northEast = new st(m.lat, m.lng)) : (a.lat = Math.min(f.lat, a.lat), a.lng = Math.min(f.lng, a.lng), h.lat = Math.max(m.lat, h.lat), h.lng = Math.max(m.lng, h.lng)), this;
      },
      // @method pad(bufferRatio: Number): LatLngBounds
      // Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
      // For example, a ratio of 0.5 extends the bounds by 50% in each direction.
      // Negative values will retract the bounds.
      pad: function(s) {
        var a = this._southWest, h = this._northEast, f = Math.abs(a.lat - h.lat) * s, m = Math.abs(a.lng - h.lng) * s;
        return new kt(
          new st(a.lat - f, a.lng - m),
          new st(h.lat + f, h.lng + m)
        );
      },
      // @method getCenter(): LatLng
      // Returns the center point of the bounds.
      getCenter: function() {
        return new st(
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
        return new st(this.getNorth(), this.getWest());
      },
      // @method getSouthEast(): LatLng
      // Returns the south-east point of the bounds.
      getSouthEast: function() {
        return new st(this.getSouth(), this.getEast());
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
        typeof s[0] == "number" || s instanceof st || "lat" in s ? s = q(s) : s = lt(s);
        var a = this._southWest, h = this._northEast, f, m;
        return s instanceof kt ? (f = s.getSouthWest(), m = s.getNorthEast()) : f = m = s, f.lat >= a.lat && m.lat <= h.lat && f.lng >= a.lng && m.lng <= h.lng;
      },
      // @method intersects(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
      intersects: function(s) {
        s = lt(s);
        var a = this._southWest, h = this._northEast, f = s.getSouthWest(), m = s.getNorthEast(), v = m.lat >= a.lat && f.lat <= h.lat, M = m.lng >= a.lng && f.lng <= h.lng;
        return v && M;
      },
      // @method overlaps(otherBounds: LatLngBounds): Boolean
      // Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
      overlaps: function(s) {
        s = lt(s);
        var a = this._southWest, h = this._northEast, f = s.getSouthWest(), m = s.getNorthEast(), v = m.lat > a.lat && f.lat < h.lat, M = m.lng > a.lng && f.lng < h.lng;
        return v && M;
      },
      // @method toBBoxString(): String
      // Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
      toBBoxString: function() {
        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",");
      },
      // @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
      // Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
      equals: function(s, a) {
        return s ? (s = lt(s), this._southWest.equals(s.getSouthWest(), a) && this._northEast.equals(s.getNorthEast(), a)) : !1;
      },
      // @method isValid(): Boolean
      // Returns `true` if the bounds are properly initialized.
      isValid: function() {
        return !!(this._southWest && this._northEast);
      }
    };
    function lt(s, a) {
      return s instanceof kt ? s : new kt(s, a);
    }
    function st(s, a, h) {
      if (isNaN(s) || isNaN(a))
        throw new Error("Invalid LatLng object: (" + s + ", " + a + ")");
      this.lat = +s, this.lng = +a, h !== void 0 && (this.alt = +h);
    }
    st.prototype = {
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
        return Ze.distance(this, q(s));
      },
      // @method wrap(): LatLng
      // Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
      wrap: function() {
        return Ze.wrapLatLng(this);
      },
      // @method toBounds(sizeInMeters: Number): LatLngBounds
      // Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
      toBounds: function(s) {
        var a = 180 * s / 40075017, h = a / Math.cos(Math.PI / 180 * this.lat);
        return lt(
          [this.lat - a, this.lng - h],
          [this.lat + a, this.lng + h]
        );
      },
      clone: function() {
        return new st(this.lat, this.lng, this.alt);
      }
    };
    function q(s, a, h) {
      return s instanceof st ? s : P(s) && typeof s[0] != "object" ? s.length === 3 ? new st(s[0], s[1], s[2]) : s.length === 2 ? new st(s[0], s[1]) : null : s == null ? s : typeof s == "object" && "lat" in s ? new st(s.lat, "lng" in s ? s.lng : s.lon, s.alt) : a === void 0 ? null : new st(s, a, h);
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
        return new st(h, a, f);
      },
      // @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
      // Returns a `LatLngBounds` with the same size as the given one, ensuring
      // that its center is within the CRS's bounds.
      // Only accepts actual `L.LatLngBounds` instances, not arrays.
      wrapLatLngBounds: function(s) {
        var a = s.getCenter(), h = this.wrapLatLng(a), f = a.lat - h.lat, m = a.lng - h.lng;
        if (f === 0 && m === 0)
          return s;
        var v = s.getSouthWest(), M = s.getNorthEast(), z = new st(v.lat - f, v.lng - m), O = new st(M.lat - f, M.lng - m);
        return new kt(z, O);
      }
    }, Ze = r({}, qt, {
      wrapLng: [-180, 180],
      // Mean Earth Radius, as recommended for use by
      // the International Union of Geodesy and Geophysics,
      // see https://rosettacode.org/wiki/Haversine_formula
      R: 6371e3,
      // distance between two geographical points using spherical law of cosines approximation
      distance: function(s, a) {
        var h = Math.PI / 180, f = s.lat * h, m = a.lat * h, v = Math.sin((a.lat - s.lat) * h / 2), M = Math.sin((a.lng - s.lng) * h / 2), z = v * v + Math.cos(f) * Math.cos(m) * M * M, O = 2 * Math.atan2(Math.sqrt(z), Math.sqrt(1 - z));
        return this.R * O;
      }
    }), fo = 6378137, Fs = {
      R: fo,
      MAX_LATITUDE: 85.0511287798,
      project: function(s) {
        var a = Math.PI / 180, h = this.MAX_LATITUDE, f = Math.max(Math.min(h, s.lat), -h), m = Math.sin(f * a);
        return new D(
          this.R * s.lng * a,
          this.R * Math.log((1 + m) / (1 - m)) / 2
        );
      },
      unproject: function(s) {
        var a = 180 / Math.PI;
        return new st(
          (2 * Math.atan(Math.exp(s.y / this.R)) - Math.PI / 2) * a,
          s.x * a / this.R
        );
      },
      bounds: function() {
        var s = fo * Math.PI;
        return new X([-s, -s], [s, s]);
      }()
    };
    function Hs(s, a, h, f) {
      if (P(s)) {
        this._a = s[0], this._b = s[1], this._c = s[2], this._d = s[3];
        return;
      }
      this._a = s, this._b = a, this._c = h, this._d = f;
    }
    Hs.prototype = {
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
        return a = a || 1, new D(
          (s.x / a - this._b) / this._a,
          (s.y / a - this._d) / this._c
        );
      }
    };
    function ut(s, a, h, f) {
      return new Hs(s, a, h, f);
    }
    var nt = r({}, Ze, {
      code: "EPSG:3857",
      projection: Fs,
      transformation: function() {
        var s = 0.5 / (Math.PI * Fs.R);
        return ut(s, 0.5, -s, 0.5);
      }()
    }), at = r({}, nt, {
      code: "EPSG:900913"
    });
    function Ne(s) {
      return document.createElementNS("http://www.w3.org/2000/svg", s);
    }
    function nn(s, a) {
      var h = "", f, m, v, M, z, O;
      for (f = 0, v = s.length; f < v; f++) {
        for (z = s[f], m = 0, M = z.length; m < M; m++)
          O = z[m], h += (m ? "L" : "M") + O.x + " " + O.y;
        h += a ? K.svg ? "z" : "x" : "";
      }
      return h || "M0 0";
    }
    var Ue = document.documentElement.style, Se = "ActiveXObject" in window, Rn = Se && !document.addEventListener, jn = "msLaunchUri" in navigator && !("documentMode" in document), pe = sn("webkit"), Bn = sn("android"), dd = sn("android 2") || sn("android 3"), wy = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10), by = Bn && sn("Google") && wy < 537 && !("AudioNode" in window), El = !!window.opera, fd = !jn && sn("chrome"), pd = sn("gecko") && !pe && !El && !Se, ky = !fd && sn("safari"), md = sn("phantom"), gd = "OTransition" in Ue, Sy = navigator.platform.indexOf("Win") === 0, _d = Se && "transition" in Ue, zl = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix() && !dd, vd = "MozPerspective" in Ue, Py = !window.L_DISABLE_3D && (_d || zl || vd) && !gd && !md, Ws = typeof orientation < "u" || sn("mobile"), My = Ws && pe, Cy = Ws && zl, yd = !window.PointerEvent && window.MSPointerEvent, xd = !!(window.PointerEvent || yd), wd = "ontouchstart" in window || !!window.TouchEvent, Ly = !window.L_NO_TOUCH && (wd || xd), Ty = Ws && El, Ey = Ws && pd, zy = (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI) > 1, Oy = function() {
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
    }(), Ny = function() {
      return !!document.createElement("canvas").getContext;
    }(), Ol = !!(document.createElementNS && Ne("svg").createSVGRect), Ay = !!Ol && function() {
      var s = document.createElement("div");
      return s.innerHTML = "<svg/>", (s.firstChild && s.firstChild.namespaceURI) === "http://www.w3.org/2000/svg";
    }(), Iy = !Ol && function() {
      try {
        var s = document.createElement("div");
        s.innerHTML = '<v:shape adj="1"/>';
        var a = s.firstChild;
        return a.style.behavior = "url(#default#VML)", a && typeof a.adj == "object";
      } catch {
        return !1;
      }
    }(), Dy = navigator.platform.indexOf("Mac") === 0, Ry = navigator.platform.indexOf("Linux") === 0;
    function sn(s) {
      return navigator.userAgent.toLowerCase().indexOf(s) >= 0;
    }
    var K = {
      ie: Se,
      ielt9: Rn,
      edge: jn,
      webkit: pe,
      android: Bn,
      android23: dd,
      androidStock: by,
      opera: El,
      chrome: fd,
      gecko: pd,
      safari: ky,
      phantom: md,
      opera12: gd,
      win: Sy,
      ie3d: _d,
      webkit3d: zl,
      gecko3d: vd,
      any3d: Py,
      mobile: Ws,
      mobileWebkit: My,
      mobileWebkit3d: Cy,
      msPointer: yd,
      pointer: xd,
      touch: Ly,
      touchNative: wd,
      mobileOpera: Ty,
      mobileGecko: Ey,
      retina: zy,
      passiveEvents: Oy,
      canvas: Ny,
      svg: Ol,
      vml: Iy,
      inlineSvg: Ay,
      mac: Dy,
      linux: Ry
    }, bd = K.msPointer ? "MSPointerDown" : "pointerdown", kd = K.msPointer ? "MSPointerMove" : "pointermove", Sd = K.msPointer ? "MSPointerUp" : "pointerup", Pd = K.msPointer ? "MSPointerCancel" : "pointercancel", Nl = {
      touchstart: bd,
      touchmove: kd,
      touchend: Sd,
      touchcancel: Pd
    }, Md = {
      touchstart: Vy,
      touchmove: po,
      touchend: po,
      touchcancel: po
    }, Ki = {}, Cd = !1;
    function jy(s, a, h) {
      return a === "touchstart" && Wy(), Md[a] ? (h = Md[a].bind(this, h), s.addEventListener(Nl[a], h, !1), h) : (console.warn("wrong event specified:", a), g);
    }
    function By(s, a, h) {
      if (!Nl[a]) {
        console.warn("wrong event specified:", a);
        return;
      }
      s.removeEventListener(Nl[a], h, !1);
    }
    function Fy(s) {
      Ki[s.pointerId] = s;
    }
    function Hy(s) {
      Ki[s.pointerId] && (Ki[s.pointerId] = s);
    }
    function Ld(s) {
      delete Ki[s.pointerId];
    }
    function Wy() {
      Cd || (document.addEventListener(bd, Fy, !0), document.addEventListener(kd, Hy, !0), document.addEventListener(Sd, Ld, !0), document.addEventListener(Pd, Ld, !0), Cd = !0);
    }
    function po(s, a) {
      if (a.pointerType !== (a.MSPOINTER_TYPE_MOUSE || "mouse")) {
        a.touches = [];
        for (var h in Ki)
          a.touches.push(Ki[h]);
        a.changedTouches = [a], s(a);
      }
    }
    function Vy(s, a) {
      a.MSPOINTER_TYPE_TOUCH && a.pointerType === a.MSPOINTER_TYPE_TOUCH && Qt(a), po(s, a);
    }
    function Zy(s) {
      var a = {}, h, f;
      for (f in s)
        h = s[f], a[f] = h && h.bind ? h.bind(s) : h;
      return s = a, a.type = "dblclick", a.detail = 2, a.isTrusted = !1, a._simulated = !0, a;
    }
    var Uy = 200;
    function $y(s, a) {
      s.addEventListener("dblclick", a);
      var h = 0, f;
      function m(v) {
        if (v.detail !== 1) {
          f = v.detail;
          return;
        }
        if (!(v.pointerType === "mouse" || v.sourceCapabilities && !v.sourceCapabilities.firesTouchEvents)) {
          var M = Nd(v);
          if (!(M.some(function(O) {
            return O instanceof HTMLLabelElement && O.attributes.for;
          }) && !M.some(function(O) {
            return O instanceof HTMLInputElement || O instanceof HTMLSelectElement;
          }))) {
            var z = Date.now();
            z - h <= Uy ? (f++, f === 2 && a(Zy(v))) : f = 1, h = z;
          }
        }
      }
      return s.addEventListener("click", m), {
        dblclick: a,
        simDblclick: m
      };
    }
    function Yy(s, a) {
      s.removeEventListener("dblclick", a.dblclick), s.removeEventListener("click", a.simDblclick);
    }
    var Al = _o(
      ["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]
    ), Vs = _o(
      ["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]
    ), Td = Vs === "webkitTransition" || Vs === "OTransition" ? Vs + "End" : "transitionend";
    function Ed(s) {
      return typeof s == "string" ? document.getElementById(s) : s;
    }
    function Zs(s, a) {
      var h = s.style[a] || s.currentStyle && s.currentStyle[a];
      if ((!h || h === "auto") && document.defaultView) {
        var f = document.defaultView.getComputedStyle(s, null);
        h = f ? f[a] : null;
      }
      return h === "auto" ? null : h;
    }
    function yt(s, a, h) {
      var f = document.createElement(s);
      return f.className = a || "", h && h.appendChild(f), f;
    }
    function zt(s) {
      var a = s.parentNode;
      a && a.removeChild(s);
    }
    function mo(s) {
      for (; s.firstChild; )
        s.removeChild(s.firstChild);
    }
    function Xi(s) {
      var a = s.parentNode;
      a && a.lastChild !== s && a.appendChild(s);
    }
    function Gi(s) {
      var a = s.parentNode;
      a && a.firstChild !== s && a.insertBefore(s, a.firstChild);
    }
    function Il(s, a) {
      if (s.classList !== void 0)
        return s.classList.contains(a);
      var h = go(s);
      return h.length > 0 && new RegExp("(^|\\s)" + a + "(\\s|$)").test(h);
    }
    function rt(s, a) {
      if (s.classList !== void 0)
        for (var h = S(a), f = 0, m = h.length; f < m; f++)
          s.classList.add(h[f]);
      else if (!Il(s, a)) {
        var v = go(s);
        Dl(s, (v ? v + " " : "") + a);
      }
    }
    function jt(s, a) {
      s.classList !== void 0 ? s.classList.remove(a) : Dl(s, x((" " + go(s) + " ").replace(" " + a + " ", " ")));
    }
    function Dl(s, a) {
      s.className.baseVal === void 0 ? s.className = a : s.className.baseVal = a;
    }
    function go(s) {
      return s.correspondingElement && (s = s.correspondingElement), s.className.baseVal === void 0 ? s.className : s.className.baseVal;
    }
    function Ae(s, a) {
      "opacity" in s.style ? s.style.opacity = a : "filter" in s.style && Ky(s, a);
    }
    function Ky(s, a) {
      var h = !1, f = "DXImageTransform.Microsoft.Alpha";
      try {
        h = s.filters.item(f);
      } catch {
        if (a === 1)
          return;
      }
      a = Math.round(a * 100), h ? (h.Enabled = a !== 100, h.Opacity = a) : s.style.filter += " progid:" + f + "(opacity=" + a + ")";
    }
    function _o(s) {
      for (var a = document.documentElement.style, h = 0; h < s.length; h++)
        if (s[h] in a)
          return s[h];
      return !1;
    }
    function vi(s, a, h) {
      var f = a || new D(0, 0);
      s.style[Al] = (K.ie3d ? "translate(" + f.x + "px," + f.y + "px)" : "translate3d(" + f.x + "px," + f.y + "px,0)") + (h ? " scale(" + h + ")" : "");
    }
    function Ht(s, a) {
      s._leaflet_pos = a, K.any3d ? vi(s, a) : (s.style.left = a.x + "px", s.style.top = a.y + "px");
    }
    function yi(s) {
      return s._leaflet_pos || new D(0, 0);
    }
    var Us, $s, Rl;
    if ("onselectstart" in document)
      Us = function() {
        et(window, "selectstart", Qt);
      }, $s = function() {
        Pt(window, "selectstart", Qt);
      };
    else {
      var Ys = _o(
        ["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]
      );
      Us = function() {
        if (Ys) {
          var s = document.documentElement.style;
          Rl = s[Ys], s[Ys] = "none";
        }
      }, $s = function() {
        Ys && (document.documentElement.style[Ys] = Rl, Rl = void 0);
      };
    }
    function jl() {
      et(window, "dragstart", Qt);
    }
    function Bl() {
      Pt(window, "dragstart", Qt);
    }
    var vo, Fl;
    function Hl(s) {
      for (; s.tabIndex === -1; )
        s = s.parentNode;
      s.style && (yo(), vo = s, Fl = s.style.outlineStyle, s.style.outlineStyle = "none", et(window, "keydown", yo));
    }
    function yo() {
      vo && (vo.style.outlineStyle = Fl, vo = void 0, Fl = void 0, Pt(window, "keydown", yo));
    }
    function zd(s) {
      do
        s = s.parentNode;
      while ((!s.offsetWidth || !s.offsetHeight) && s !== document.body);
      return s;
    }
    function Wl(s) {
      var a = s.getBoundingClientRect();
      return {
        x: a.width / s.offsetWidth || 1,
        y: a.height / s.offsetHeight || 1,
        boundingClientRect: a
      };
    }
    var Xy = {
      __proto__: null,
      TRANSFORM: Al,
      TRANSITION: Vs,
      TRANSITION_END: Td,
      get: Ed,
      getStyle: Zs,
      create: yt,
      remove: zt,
      empty: mo,
      toFront: Xi,
      toBack: Gi,
      hasClass: Il,
      addClass: rt,
      removeClass: jt,
      setClass: Dl,
      getClass: go,
      setOpacity: Ae,
      testProp: _o,
      setTransform: vi,
      setPosition: Ht,
      getPosition: yi,
      get disableTextSelection() {
        return Us;
      },
      get enableTextSelection() {
        return $s;
      },
      disableImageDrag: jl,
      enableImageDrag: Bl,
      preventOutline: Hl,
      restoreOutline: yo,
      getSizedParentNode: zd,
      getScale: Wl
    };
    function et(s, a, h, f) {
      if (a && typeof a == "object")
        for (var m in a)
          Zl(s, m, a[m], h);
      else {
        a = S(a);
        for (var v = 0, M = a.length; v < M; v++)
          Zl(s, a[v], h, f);
      }
      return this;
    }
    var rn = "_leaflet_events";
    function Pt(s, a, h, f) {
      if (arguments.length === 1)
        Od(s), delete s[rn];
      else if (a && typeof a == "object")
        for (var m in a)
          Ul(s, m, a[m], h);
      else if (a = S(a), arguments.length === 2)
        Od(s, function(z) {
          return T(a, z) !== -1;
        });
      else
        for (var v = 0, M = a.length; v < M; v++)
          Ul(s, a[v], h, f);
      return this;
    }
    function Od(s, a) {
      for (var h in s[rn]) {
        var f = h.split(/\d/)[0];
        (!a || a(f)) && Ul(s, f, null, null, h);
      }
    }
    var Vl = {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      wheel: !("onwheel" in window) && "mousewheel"
    };
    function Zl(s, a, h, f) {
      var m = a + c(h) + (f ? "_" + c(f) : "");
      if (s[rn] && s[rn][m])
        return this;
      var v = function(z) {
        return h.call(f || s, z || window.event);
      }, M = v;
      !K.touchNative && K.pointer && a.indexOf("touch") === 0 ? v = jy(s, a, v) : K.touch && a === "dblclick" ? v = $y(s, v) : "addEventListener" in s ? a === "touchstart" || a === "touchmove" || a === "wheel" || a === "mousewheel" ? s.addEventListener(Vl[a] || a, v, K.passiveEvents ? { passive: !1 } : !1) : a === "mouseenter" || a === "mouseleave" ? (v = function(z) {
        z = z || window.event, Yl(s, z) && M(z);
      }, s.addEventListener(Vl[a], v, !1)) : s.addEventListener(a, M, !1) : s.attachEvent("on" + a, v), s[rn] = s[rn] || {}, s[rn][m] = v;
    }
    function Ul(s, a, h, f, m) {
      m = m || a + c(h) + (f ? "_" + c(f) : "");
      var v = s[rn] && s[rn][m];
      if (!v)
        return this;
      !K.touchNative && K.pointer && a.indexOf("touch") === 0 ? By(s, a, v) : K.touch && a === "dblclick" ? Yy(s, v) : "removeEventListener" in s ? s.removeEventListener(Vl[a] || a, v, !1) : s.detachEvent("on" + a, v), s[rn][m] = null;
    }
    function xi(s) {
      return s.stopPropagation ? s.stopPropagation() : s.originalEvent ? s.originalEvent._stopped = !0 : s.cancelBubble = !0, this;
    }
    function $l(s) {
      return Zl(s, "wheel", xi), this;
    }
    function Ks(s) {
      return et(s, "mousedown touchstart dblclick contextmenu", xi), s._leaflet_disable_click = !0, this;
    }
    function Qt(s) {
      return s.preventDefault ? s.preventDefault() : s.returnValue = !1, this;
    }
    function wi(s) {
      return Qt(s), xi(s), this;
    }
    function Nd(s) {
      if (s.composedPath)
        return s.composedPath();
      for (var a = [], h = s.target; h; )
        a.push(h), h = h.parentNode;
      return a;
    }
    function Ad(s, a) {
      if (!a)
        return new D(s.clientX, s.clientY);
      var h = Wl(a), f = h.boundingClientRect;
      return new D(
        // offset.left/top values are in page scale (like clientX/Y),
        // whereas clientLeft/Top (border width) values are the original values (before CSS scale applies).
        (s.clientX - f.left) / h.x - a.clientLeft,
        (s.clientY - f.top) / h.y - a.clientTop
      );
    }
    var Gy = K.linux && K.chrome ? window.devicePixelRatio : K.mac ? window.devicePixelRatio * 3 : window.devicePixelRatio > 0 ? 2 * window.devicePixelRatio : 1;
    function Id(s) {
      return K.edge ? s.wheelDeltaY / 2 : (
        // Don't trust window-geometry-based delta
        s.deltaY && s.deltaMode === 0 ? -s.deltaY / Gy : (
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
    function Yl(s, a) {
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
    var qy = {
      __proto__: null,
      on: et,
      off: Pt,
      stopPropagation: xi,
      disableScrollPropagation: $l,
      disableClickPropagation: Ks,
      preventDefault: Qt,
      stop: wi,
      getPropagationPath: Nd,
      getMousePosition: Ad,
      getWheelDelta: Id,
      isExternalTarget: Yl,
      addListener: et,
      removeListener: Pt
    }, Dd = dt.extend({
      // @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
      // Run an animation of a given element to a new position, optionally setting
      // duration in seconds (`0.25` by default) and easing linearity factor (3rd
      // argument of the [cubic bezier curve](https://cubic-bezier.com/#0,0,.5,1),
      // `0.5` by default).
      run: function(s, a, h, f) {
        this.stop(), this._el = s, this._inProgress = !0, this._duration = h || 0.25, this._easeOutPower = 1 / Math.max(f || 0.5, 0.2), this._startPos = yi(s), this._offset = a.subtract(this._startPos), this._startTime = +/* @__PURE__ */ new Date(), this.fire("start"), this._animate();
      },
      // @method stop()
      // Stops the animation (if currently running).
      stop: function() {
        this._inProgress && (this._step(!0), this._complete());
      },
      _animate: function() {
        this._animId = W(this._animate, this), this._step();
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
    }), gt = dt.extend({
      options: {
        // @section Map State Options
        // @option crs: CRS = L.CRS.EPSG3857
        // The [Coordinate Reference System](#crs) to use. Don't change this if you're not
        // sure what it means.
        crs: nt,
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
        a = b(this, a), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(s), this._initLayout(), this._onResize = l(this._onResize, this), this._initEvents(), a.maxBounds && this.setMaxBounds(a.maxBounds), a.zoom !== void 0 && (this._zoom = this._limitZoom(a.zoom)), a.center && a.zoom !== void 0 && this.setView(q(a.center), a.zoom, { reset: !0 }), this.callInitHooks(), this._zoomAnimated = Vs && K.any3d && !K.mobileOpera && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), et(this._proxy, Td, this._catchTransitionEnd, this)), this._addLayers(this.options.layers);
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
        var f = this.getZoomScale(a), m = this.getSize().divideBy(2), v = s instanceof D ? s : this.latLngToContainerPoint(s), M = v.subtract(m).multiplyBy(1 - 1 / f), z = this.containerPointToLatLng(m.add(M));
        return this.setView(z, a, { zoom: h });
      },
      _getBoundsCenterZoom: function(s, a) {
        a = a || {}, s = s.getBounds ? s.getBounds() : lt(s);
        var h = j(a.paddingTopLeft || a.padding || [0, 0]), f = j(a.paddingBottomRight || a.padding || [0, 0]), m = this.getBoundsZoom(s, !1, h.add(f));
        if (m = typeof a.maxZoom == "number" ? Math.min(a.maxZoom, m) : m, m === 1 / 0)
          return {
            center: s.getCenter(),
            zoom: m
          };
        var v = f.subtract(h).divideBy(2), M = this.project(s.getSouthWest(), m), z = this.project(s.getNorthEast(), m), O = this.unproject(M.add(z).divideBy(2).add(v), m);
        return {
          center: O,
          zoom: m
        };
      },
      // @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
      // Sets a map view that contains the given geographical bounds with the
      // maximum zoom level possible.
      fitBounds: function(s, a) {
        if (s = lt(s), !s.isValid())
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
        if (s = j(s).round(), a = a || {}, !s.x && !s.y)
          return this.fire("moveend");
        if (a.animate !== !0 && !this.getSize().contains(s))
          return this._resetView(this.unproject(this.project(this.getCenter()).add(s)), this.getZoom()), this;
        if (this._panAnim || (this._panAnim = new Dd(), this._panAnim.on({
          step: this._onPanTransitionStep,
          end: this._onPanTransitionEnd
        }, this)), a.noMoveStart || this.fire("movestart"), a.animate !== !1) {
          rt(this._mapPane, "leaflet-pan-anim");
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
        var f = this.project(this.getCenter()), m = this.project(s), v = this.getSize(), M = this._zoom;
        s = q(s), a = a === void 0 ? M : a;
        var z = Math.max(v.x, v.y), O = z * this.getZoomScale(M, a), R = m.distanceTo(f) || 1, V = 1.42, Q = V * V;
        function ct(Wt) {
          var zo = Wt ? -1 : 1, B0 = Wt ? O : z, F0 = O * O - z * z + zo * Q * Q * R * R, H0 = 2 * B0 * Q * R, su = F0 / H0, _f = Math.sqrt(su * su + 1) - su, W0 = _f < 1e-9 ? -18 : Math.log(_f);
          return W0;
        }
        function le(Wt) {
          return (Math.exp(Wt) - Math.exp(-Wt)) / 2;
        }
        function Kt(Wt) {
          return (Math.exp(Wt) + Math.exp(-Wt)) / 2;
        }
        function De(Wt) {
          return le(Wt) / Kt(Wt);
        }
        var me = ct(0);
        function ns(Wt) {
          return z * (Kt(me) / Kt(me + V * Wt));
        }
        function I0(Wt) {
          return z * (Kt(me) * De(me + V * Wt) - le(me)) / Q;
        }
        function D0(Wt) {
          return 1 - Math.pow(1 - Wt, 1.5);
        }
        var R0 = Date.now(), mf = (ct(1) - me) / V, j0 = h.duration ? 1e3 * h.duration : 1e3 * mf * 0.8;
        function gf() {
          var Wt = (Date.now() - R0) / j0, zo = D0(Wt) * mf;
          Wt <= 1 ? (this._flyToFrame = W(gf, this), this._move(
            this.unproject(f.add(m.subtract(f).multiplyBy(I0(zo) / R)), M),
            this.getScaleZoom(z / ns(zo), M),
            { flyTo: !0 }
          )) : this._move(s, a)._moveEnd(!0);
        }
        return this._moveStart(!0, h.noMoveStart), gf.call(this), this;
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
        return s = lt(s), this.listens("moveend", this._panInsideMaxBounds) && this.off("moveend", this._panInsideMaxBounds), s.isValid() ? (this.options.maxBounds = s, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this);
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
        var h = this.getCenter(), f = this._limitCenter(h, this._zoom, lt(s));
        return h.equals(f) || this.panTo(f, a), this._enforcingBounds = !1, this;
      },
      // @method panInside(latlng: LatLng, options?: padding options): this
      // Pans the map the minimum amount to make the `latlng` visible. Use
      // padding options to fit the display to more restricted bounds.
      // If `latlng` is already within the (optionally padded) display bounds,
      // the map will not be panned.
      panInside: function(s, a) {
        a = a || {};
        var h = j(a.paddingTopLeft || a.padding || [0, 0]), f = j(a.paddingBottomRight || a.padding || [0, 0]), m = this.project(this.getCenter()), v = this.project(s), M = this.getPixelBounds(), z = tt([M.min.add(h), M.max.subtract(f)]), O = z.getSize();
        if (!z.contains(v)) {
          this._enforcingBounds = !0;
          var R = v.subtract(z.getCenter()), V = z.extend(v).getSize().subtract(O);
          m.x += R.x < 0 ? -V.x : V.x, m.y += R.y < 0 ? -V.y : V.y, this.panTo(this.unproject(m), a), this._enforcingBounds = !1;
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
        var h = this.getSize(), f = a.divideBy(2).round(), m = h.divideBy(2).round(), v = f.subtract(m);
        return !v.x && !v.y ? this : (s.animate && s.pan ? this.panBy(v) : (s.pan && this._rawPanBy(v), this.fire("move"), s.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(l(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
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
          var a = s.coords.latitude, h = s.coords.longitude, f = new st(a, h), m = f.toBounds(s.coords.accuracy * 2), v = this._locateOptions;
          if (v.setView) {
            var M = this.getBoundsZoom(m);
            this.setView(f, v.maxZoom ? Math.min(M, v.maxZoom) : M);
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
        var h = "leaflet-pane" + (s ? " leaflet-" + s.replace("Pane", "") + "-pane" : ""), f = yt("div", h, a || this._mapPane);
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
        return new kt(a, h);
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
        s = lt(s), h = j(h || [0, 0]);
        var f = this.getZoom() || 0, m = this.getMinZoom(), v = this.getMaxZoom(), M = s.getNorthWest(), z = s.getSouthEast(), O = this.getSize().subtract(h), R = tt(this.project(z, f), this.project(M, f)).getSize(), V = K.any3d ? this.options.zoomSnap : 1, Q = O.x / R.x, ct = O.y / R.y, le = a ? Math.max(Q, ct) : Math.min(Q, ct);
        return f = this.getScaleZoom(le, f), V && (f = Math.round(f / (V / 100)) * (V / 100), f = a ? Math.ceil(f / V) * V : Math.floor(f / V) * V), Math.max(m, Math.min(v, f));
      },
      // @method getSize(): Point
      // Returns the current size of the map container (in pixels).
      getSize: function() {
        return (!this._size || this._sizeChanged) && (this._size = new D(
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
        return a = a === void 0 ? this._zoom : a, this.options.crs.pointToLatLng(j(s), a);
      },
      // @method layerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding geographical coordinate (for the current zoom level).
      layerPointToLatLng: function(s) {
        var a = j(s).add(this.getPixelOrigin());
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
        return this.options.crs.wrapLatLngBounds(lt(s));
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
        return j(s).subtract(this._getMapPanePos());
      },
      // @method layerPointToContainerPoint(point: Point): Point
      // Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
      // returns the corresponding pixel coordinate relative to the map container.
      layerPointToContainerPoint: function(s) {
        return j(s).add(this._getMapPanePos());
      },
      // @method containerPointToLatLng(point: Point): LatLng
      // Given a pixel coordinate relative to the map container, returns
      // the corresponding geographical coordinate (for the current zoom level).
      containerPointToLatLng: function(s) {
        var a = this.containerPointToLayerPoint(j(s));
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
        return Ad(s, this._container);
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
        var a = this._container = Ed(s);
        if (a) {
          if (a._leaflet_id)
            throw new Error("Map container is already initialized.");
        } else throw new Error("Map container not found.");
        et(a, "scroll", this._onScroll, this), this._containerId = c(a);
      },
      _initLayout: function() {
        var s = this._container;
        this._fadeAnimated = this.options.fadeAnimation && K.any3d, rt(s, "leaflet-container" + (K.touch ? " leaflet-touch" : "") + (K.retina ? " leaflet-retina" : "") + (K.ielt9 ? " leaflet-oldie" : "") + (K.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
        var a = Zs(s, "position");
        a !== "absolute" && a !== "relative" && a !== "fixed" && a !== "sticky" && (s.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos();
      },
      _initPanes: function() {
        var s = this._panes = {};
        this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), Ht(this._mapPane, new D(0, 0)), this.createPane("tilePane"), this.createPane("overlayPane"), this.createPane("shadowPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (rt(s.markerPane, "leaflet-zoom-hide"), rt(s.shadowPane, "leaflet-zoom-hide"));
      },
      // private methods that modify map state
      // @section Map state change events
      _resetView: function(s, a, h) {
        Ht(this._mapPane, new D(0, 0));
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
        U(this._resizeRequest), this._resizeRequest = W(
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
        for (var h = [], f, m = a === "mouseout" || a === "mouseover", v = s.target || s.srcElement, M = !1; v; ) {
          if (f = this._targets[c(v)], f && (a === "click" || a === "preclick") && this._draggableMoved(f)) {
            M = !0;
            break;
          }
          if (f && f.listens(a, !0) && (m && !Yl(v, s) || (h.push(f), m)) || v === this._container)
            break;
          v = v.parentNode;
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
          h === "mousedown" && Hl(a), this._fireDOMEvent(s, h);
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
          for (var v = [], M = 0; M < h.length; M++)
            h[M].listens(a, !0) && v.push(h[M]);
          m = v.concat(m);
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
        return yi(this._mapPane) || new D(0, 0);
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
        var f = this.project(s, a), m = this.getSize().divideBy(2), v = new X(f.subtract(m), f.add(m)), M = this._getBoundsOffset(v, h, a);
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
        ), m = f.min.subtract(s.min), v = f.max.subtract(s.max), M = this._rebound(m.x, -v.x), z = this._rebound(m.y, -v.y);
        return new D(M, z);
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
        var s = this._proxy = yt("div", "leaflet-proxy leaflet-zoom-animated");
        this._panes.mapPane.appendChild(s), this.on("zoomanim", function(a) {
          var h = Al, f = this._proxy.style[h];
          vi(this._proxy, this.project(a.center, a.zoom), this.getZoomScale(a.zoom, 1)), f === this._proxy.style[h] && this._animatingZoom && this._onZoomTransitionEnd();
        }, this), this.on("load moveend", this._animMoveEnd, this), this._on("unload", this._destroyAnimProxy, this);
      },
      _destroyAnimProxy: function() {
        zt(this._proxy), this.off("load moveend", this._animMoveEnd, this), delete this._proxy;
      },
      _animMoveEnd: function() {
        var s = this.getCenter(), a = this.getZoom();
        vi(this._proxy, this.project(s, a), this.getZoomScale(a, 1));
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
        return h.animate !== !0 && !this.getSize().contains(m) ? !1 : (W(function() {
          this._moveStart(!0, h.noMoveStart || !1)._animateZoom(s, a, !0);
        }, this), !0);
      },
      _animateZoom: function(s, a, h, f) {
        this._mapPane && (h && (this._animatingZoom = !0, this._animateToCenter = s, this._animateToZoom = a, rt(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
          center: s,
          zoom: a,
          noUpdate: f
        }), this._tempFireZoomEvent || (this._tempFireZoomEvent = this._zoom !== this._animateToZoom), this._move(this._animateToCenter, this._animateToZoom, void 0, !0), setTimeout(l(this._onZoomTransitionEnd, this), 250));
      },
      _onZoomTransitionEnd: function() {
        this._animatingZoom && (this._mapPane && jt(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom, void 0, !0), this._tempFireZoomEvent && this.fire("zoom"), delete this._tempFireZoomEvent, this.fire("move"), this._moveEnd(!0));
      }
    });
    function Qy(s, a) {
      return new gt(s, a);
    }
    var $e = it.extend({
      // @section
      // @aka Control Options
      options: {
        // @option position: String = 'topright'
        // The position of the control (one of the map corners). Possible values are `'topleft'`,
        // `'topright'`, `'bottomleft'` or `'bottomright'`
        position: "topright"
      },
      initialize: function(s) {
        b(this, s);
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
        return rt(a, "leaflet-control"), h.indexOf("bottom") !== -1 ? f.insertBefore(a, f.firstChild) : f.appendChild(a), this._map.on("unload", this.remove, this), this;
      },
      // @method remove: this
      // Removes the control from the map it is currently active on.
      remove: function() {
        return this._map ? (zt(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null, this) : this;
      },
      _refocusOnMap: function(s) {
        this._map && s && s.screenX > 0 && s.screenY > 0 && this._map.getContainer().focus();
      }
    }), Xs = function(s) {
      return new $e(s);
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
        var s = this._controlCorners = {}, a = "leaflet-", h = this._controlContainer = yt("div", a + "control-container", this._container);
        function f(m, v) {
          var M = a + m + " " + a + v;
          s[m + v] = yt("div", M, h);
        }
        f("top", "left"), f("top", "right"), f("bottom", "left"), f("bottom", "right");
      },
      _clearControlPos: function() {
        for (var s in this._controlCorners)
          zt(this._controlCorners[s]);
        zt(this._controlContainer), delete this._controlCorners, delete this._controlContainer;
      }
    });
    var Rd = $e.extend({
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
        b(this, h), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, this._preventClick = !1;
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
        return $e.prototype.addTo.call(this, s), this._expandIfNotCollapsed();
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
        rt(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
        var s = this._map.getSize().y - (this._container.offsetTop + 50);
        return s < this._section.clientHeight ? (rt(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = s + "px") : jt(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this;
      },
      // @method collapse(): this
      // Collapse the control container if expanded.
      collapse: function() {
        return jt(this._container, "leaflet-control-layers-expanded"), this;
      },
      _initLayout: function() {
        var s = "leaflet-control-layers", a = this._container = yt("div", s), h = this.options.collapsed;
        a.setAttribute("aria-haspopup", !0), Ks(a), $l(a);
        var f = this._section = yt("section", s + "-list");
        h && (this._map.on("click", this.collapse, this), et(a, {
          mouseenter: this._expandSafely,
          mouseleave: this.collapse
        }, this));
        var m = this._layersLink = yt("a", s + "-toggle", a);
        m.href = "#", m.title = "Layers", m.setAttribute("role", "button"), et(m, {
          keydown: function(v) {
            v.keyCode === 13 && this._expandSafely();
          },
          // Certain screen readers intercept the key event and instead send a click event
          click: function(v) {
            Qt(v), this._expandSafely();
          }
        }, this), h || this.expand(), this._baseLayersList = yt("div", s + "-base", f), this._separator = yt("div", s + "-separator", f), this._overlaysList = yt("div", s + "-overlays", f), a.appendChild(f);
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
        mo(this._baseLayersList), mo(this._overlaysList), this._layerControlInputs = [];
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
        var v = document.createElement("span");
        a.appendChild(v), v.appendChild(f), v.appendChild(m);
        var M = s.overlay ? this._overlaysList : this._baseLayersList;
        return M.appendChild(a), this._checkDisabledLayers(), a;
      },
      _onInputClick: function() {
        if (!this._preventClick) {
          var s = this._layerControlInputs, a, h, f = [], m = [];
          this._handlingClick = !0;
          for (var v = s.length - 1; v >= 0; v--)
            a = s[v], h = this._getLayer(a.layerId).layer, a.checked ? f.push(h) : a.checked || m.push(h);
          for (v = 0; v < m.length; v++)
            this._map.hasLayer(m[v]) && this._map.removeLayer(m[v]);
          for (v = 0; v < f.length; v++)
            this._map.hasLayer(f[v]) || this._map.addLayer(f[v]);
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
    }), Jy = function(s, a, h) {
      return new Rd(s, a, h);
    }, Kl = $e.extend({
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
        var a = "leaflet-control-zoom", h = yt("div", a + " leaflet-bar"), f = this.options;
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
        var v = yt("a", h, f);
        return v.innerHTML = s, v.href = "#", v.title = a, v.setAttribute("role", "button"), v.setAttribute("aria-label", a), Ks(v), et(v, "click", wi), et(v, "click", m, this), et(v, "click", this._refocusOnMap, this), v;
      },
      _updateDisabled: function() {
        var s = this._map, a = "leaflet-disabled";
        jt(this._zoomInButton, a), jt(this._zoomOutButton, a), this._zoomInButton.setAttribute("aria-disabled", "false"), this._zoomOutButton.setAttribute("aria-disabled", "false"), (this._disabled || s._zoom === s.getMinZoom()) && (rt(this._zoomOutButton, a), this._zoomOutButton.setAttribute("aria-disabled", "true")), (this._disabled || s._zoom === s.getMaxZoom()) && (rt(this._zoomInButton, a), this._zoomInButton.setAttribute("aria-disabled", "true"));
      }
    });
    gt.mergeOptions({
      zoomControl: !0
    }), gt.addInitHook(function() {
      this.options.zoomControl && (this.zoomControl = new Kl(), this.addControl(this.zoomControl));
    });
    var t0 = function(s) {
      return new Kl(s);
    }, jd = $e.extend({
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
        var a = "leaflet-control-scale", h = yt("div", a), f = this.options;
        return this._addScales(f, a + "-line", h), s.on(f.updateWhenIdle ? "moveend" : "move", this._update, this), s.whenReady(this._update, this), h;
      },
      onRemove: function(s) {
        s.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this);
      },
      _addScales: function(s, a, h) {
        s.metric && (this._mScale = yt("div", a, h)), s.imperial && (this._iScale = yt("div", a, h));
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
    }), e0 = function(s) {
      return new jd(s);
    }, n0 = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>', Xl = $e.extend({
      // @section
      // @aka Control.Attribution options
      options: {
        position: "bottomright",
        // @option prefix: String|false = 'Leaflet'
        // The HTML text shown before the attributions. Pass `false` to disable.
        prefix: '<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">' + (K.inlineSvg ? n0 + " " : "") + "Leaflet</a>"
      },
      initialize: function(s) {
        b(this, s), this._attributions = {};
      },
      onAdd: function(s) {
        s.attributionControl = this, this._container = yt("div", "leaflet-control-attribution"), Ks(this._container);
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
    gt.mergeOptions({
      attributionControl: !0
    }), gt.addInitHook(function() {
      this.options.attributionControl && new Xl().addTo(this);
    });
    var i0 = function(s) {
      return new Xl(s);
    };
    $e.Layers = Rd, $e.Zoom = Kl, $e.Scale = jd, $e.Attribution = Xl, Xs.layers = Jy, Xs.zoom = t0, Xs.scale = e0, Xs.attribution = i0;
    var on = it.extend({
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
    on.addTo = function(s, a) {
      return s.addHandler(a, this), this;
    };
    var s0 = { Events: J }, Bd = K.touch ? "touchstart mousedown" : "mousedown", Fn = dt.extend({
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
        b(this, f), this._element = s, this._dragStartTarget = a || s, this._preventOutline = h;
      },
      // @method enable()
      // Enables the dragging ability
      enable: function() {
        this._enabled || (et(this._dragStartTarget, Bd, this._onDown, this), this._enabled = !0);
      },
      // @method disable()
      // Disables the dragging ability
      disable: function() {
        this._enabled && (Fn._dragging === this && this.finishDrag(!0), Pt(this._dragStartTarget, Bd, this._onDown, this), this._enabled = !1, this._moved = !1);
      },
      _onDown: function(s) {
        if (this._enabled && (this._moved = !1, !Il(this._element, "leaflet-zoom-anim"))) {
          if (s.touches && s.touches.length !== 1) {
            Fn._dragging === this && this.finishDrag();
            return;
          }
          if (!(Fn._dragging || s.shiftKey || s.which !== 1 && s.button !== 1 && !s.touches) && (Fn._dragging = this, this._preventOutline && Hl(this._element), jl(), Us(), !this._moving)) {
            this.fire("down");
            var a = s.touches ? s.touches[0] : s, h = zd(this._element);
            this._startPoint = new D(a.clientX, a.clientY), this._startPos = yi(this._element), this._parentScale = Wl(h);
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
          var a = s.touches && s.touches.length === 1 ? s.touches[0] : s, h = new D(a.clientX, a.clientY)._subtract(this._startPoint);
          !h.x && !h.y || Math.abs(h.x) + Math.abs(h.y) < this.options.clickTolerance || (h.x /= this._parentScale.x, h.y /= this._parentScale.y, Qt(s), this._moved || (this.fire("dragstart"), this._moved = !0, rt(document.body, "leaflet-dragging"), this._lastTarget = s.target || s.srcElement, window.SVGElementInstance && this._lastTarget instanceof window.SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), rt(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(h), this._moving = !0, this._lastEvent = s, this._updatePosition());
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
        jt(document.body, "leaflet-dragging"), this._lastTarget && (jt(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), Pt(document, "mousemove touchmove", this._onMove, this), Pt(document, "mouseup touchend touchcancel", this._onUp, this), Bl(), $s();
        var a = this._moved && this._moving;
        this._moving = !1, Fn._dragging = !1, a && this.fire("dragend", {
          noInertia: s,
          distance: this._newPos.distanceTo(this._startPos)
        });
      }
    });
    function Fd(s, a, h) {
      var f, m = [1, 4, 2, 8], v, M, z, O, R, V, Q, ct;
      for (v = 0, V = s.length; v < V; v++)
        s[v]._code = bi(s[v], a);
      for (z = 0; z < 4; z++) {
        for (Q = m[z], f = [], v = 0, V = s.length, M = V - 1; v < V; M = v++)
          O = s[v], R = s[M], O._code & Q ? R._code & Q || (ct = xo(R, O, Q, a, h), ct._code = bi(ct, a), f.push(ct)) : (R._code & Q && (ct = xo(R, O, Q, a, h), ct._code = bi(ct, a), f.push(ct)), f.push(O));
        s = f;
      }
      return s;
    }
    function Hd(s, a) {
      var h, f, m, v, M, z, O, R, V;
      if (!s || s.length === 0)
        throw new Error("latlngs not passed");
      Ie(s) || (console.warn("latlngs are not flat! Only the first ring will be used"), s = s[0]);
      var Q = q([0, 0]), ct = lt(s), le = ct.getNorthWest().distanceTo(ct.getSouthWest()) * ct.getNorthEast().distanceTo(ct.getNorthWest());
      le < 1700 && (Q = Gl(s));
      var Kt = s.length, De = [];
      for (h = 0; h < Kt; h++) {
        var me = q(s[h]);
        De.push(a.project(q([me.lat - Q.lat, me.lng - Q.lng])));
      }
      for (z = O = R = 0, h = 0, f = Kt - 1; h < Kt; f = h++)
        m = De[h], v = De[f], M = m.y * v.x - v.y * m.x, O += (m.x + v.x) * M, R += (m.y + v.y) * M, z += M * 3;
      z === 0 ? V = De[0] : V = [O / z, R / z];
      var ns = a.unproject(j(V));
      return q([ns.lat + Q.lat, ns.lng + Q.lng]);
    }
    function Gl(s) {
      for (var a = 0, h = 0, f = 0, m = 0; m < s.length; m++) {
        var v = q(s[m]);
        a += v.lat, h += v.lng, f++;
      }
      return q([a / f, h / f]);
    }
    var r0 = {
      __proto__: null,
      clipPolygon: Fd,
      polygonCenter: Hd,
      centroid: Gl
    };
    function Wd(s, a) {
      if (!a || !s.length)
        return s.slice();
      var h = a * a;
      return s = l0(s, h), s = a0(s, h), s;
    }
    function Vd(s, a, h) {
      return Math.sqrt(Gs(s, a, h, !0));
    }
    function o0(s, a, h) {
      return Gs(s, a, h);
    }
    function a0(s, a) {
      var h = s.length, f = typeof Uint8Array < "u" ? Uint8Array : Array, m = new f(h);
      m[0] = m[h - 1] = 1, ql(s, m, a, 0, h - 1);
      var v, M = [];
      for (v = 0; v < h; v++)
        m[v] && M.push(s[v]);
      return M;
    }
    function ql(s, a, h, f, m) {
      var v = 0, M, z, O;
      for (z = f + 1; z <= m - 1; z++)
        O = Gs(s[z], s[f], s[m], !0), O > v && (M = z, v = O);
      v > h && (a[M] = 1, ql(s, a, h, f, M), ql(s, a, h, M, m));
    }
    function l0(s, a) {
      for (var h = [s[0]], f = 1, m = 0, v = s.length; f < v; f++)
        u0(s[f], s[m]) > a && (h.push(s[f]), m = f);
      return m < v - 1 && h.push(s[v - 1]), h;
    }
    var Zd;
    function Ud(s, a, h, f, m) {
      var v = f ? Zd : bi(s, h), M = bi(a, h), z, O, R;
      for (Zd = M; ; ) {
        if (!(v | M))
          return [s, a];
        if (v & M)
          return !1;
        z = v || M, O = xo(s, a, z, h, m), R = bi(O, h), z === v ? (s = O, v = R) : (a = O, M = R);
      }
    }
    function xo(s, a, h, f, m) {
      var v = a.x - s.x, M = a.y - s.y, z = f.min, O = f.max, R, V;
      return h & 8 ? (R = s.x + v * (O.y - s.y) / M, V = O.y) : h & 4 ? (R = s.x + v * (z.y - s.y) / M, V = z.y) : h & 2 ? (R = O.x, V = s.y + M * (O.x - s.x) / v) : h & 1 && (R = z.x, V = s.y + M * (z.x - s.x) / v), new D(R, V, m);
    }
    function bi(s, a) {
      var h = 0;
      return s.x < a.min.x ? h |= 1 : s.x > a.max.x && (h |= 2), s.y < a.min.y ? h |= 4 : s.y > a.max.y && (h |= 8), h;
    }
    function u0(s, a) {
      var h = a.x - s.x, f = a.y - s.y;
      return h * h + f * f;
    }
    function Gs(s, a, h, f) {
      var m = a.x, v = a.y, M = h.x - m, z = h.y - v, O = M * M + z * z, R;
      return O > 0 && (R = ((s.x - m) * M + (s.y - v) * z) / O, R > 1 ? (m = h.x, v = h.y) : R > 0 && (m += M * R, v += z * R)), M = s.x - m, z = s.y - v, f ? M * M + z * z : new D(m, v);
    }
    function Ie(s) {
      return !P(s[0]) || typeof s[0][0] != "object" && typeof s[0][0] < "u";
    }
    function $d(s) {
      return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), Ie(s);
    }
    function Yd(s, a) {
      var h, f, m, v, M, z, O, R;
      if (!s || s.length === 0)
        throw new Error("latlngs not passed");
      Ie(s) || (console.warn("latlngs are not flat! Only the first ring will be used"), s = s[0]);
      var V = q([0, 0]), Q = lt(s), ct = Q.getNorthWest().distanceTo(Q.getSouthWest()) * Q.getNorthEast().distanceTo(Q.getNorthWest());
      ct < 1700 && (V = Gl(s));
      var le = s.length, Kt = [];
      for (h = 0; h < le; h++) {
        var De = q(s[h]);
        Kt.push(a.project(q([De.lat - V.lat, De.lng - V.lng])));
      }
      for (h = 0, f = 0; h < le - 1; h++)
        f += Kt[h].distanceTo(Kt[h + 1]) / 2;
      if (f === 0)
        R = Kt[0];
      else
        for (h = 0, v = 0; h < le - 1; h++)
          if (M = Kt[h], z = Kt[h + 1], m = M.distanceTo(z), v += m, v > f) {
            O = (v - f) / m, R = [
              z.x - O * (z.x - M.x),
              z.y - O * (z.y - M.y)
            ];
            break;
          }
      var me = a.unproject(j(R));
      return q([me.lat + V.lat, me.lng + V.lng]);
    }
    var c0 = {
      __proto__: null,
      simplify: Wd,
      pointToSegmentDistance: Vd,
      closestPointOnSegment: o0,
      clipSegment: Ud,
      _getEdgeIntersection: xo,
      _getBitCode: bi,
      _sqClosestPointOnSegment: Gs,
      isFlat: Ie,
      _flat: $d,
      polylineCenter: Yd
    }, Ql = {
      project: function(s) {
        return new D(s.lng, s.lat);
      },
      unproject: function(s) {
        return new st(s.y, s.x);
      },
      bounds: new X([-180, -90], [180, 90])
    }, Jl = {
      R: 6378137,
      R_MINOR: 6356752314245179e-9,
      bounds: new X([-2003750834279e-5, -1549657073972e-5], [2003750834279e-5, 1876465623138e-5]),
      project: function(s) {
        var a = Math.PI / 180, h = this.R, f = s.lat * a, m = this.R_MINOR / h, v = Math.sqrt(1 - m * m), M = v * Math.sin(f), z = Math.tan(Math.PI / 4 - f / 2) / Math.pow((1 - M) / (1 + M), v / 2);
        return f = -h * Math.log(Math.max(z, 1e-10)), new D(s.lng * a * h, f);
      },
      unproject: function(s) {
        for (var a = 180 / Math.PI, h = this.R, f = this.R_MINOR / h, m = Math.sqrt(1 - f * f), v = Math.exp(-s.y / h), M = Math.PI / 2 - 2 * Math.atan(v), z = 0, O = 0.1, R; z < 15 && Math.abs(O) > 1e-7; z++)
          R = m * Math.sin(M), R = Math.pow((1 - R) / (1 + R), m / 2), O = Math.PI / 2 - 2 * Math.atan(v * R) - M, M += O;
        return new st(M * a, s.x * a / h);
      }
    }, h0 = {
      __proto__: null,
      LonLat: Ql,
      Mercator: Jl,
      SphericalMercator: Fs
    }, d0 = r({}, Ze, {
      code: "EPSG:3395",
      projection: Jl,
      transformation: function() {
        var s = 0.5 / (Math.PI * Jl.R);
        return ut(s, 0.5, -s, 0.5);
      }()
    }), Kd = r({}, Ze, {
      code: "EPSG:4326",
      projection: Ql,
      transformation: ut(1 / 180, 1, -1 / 180, 0.5)
    }), f0 = r({}, qt, {
      projection: Ql,
      transformation: ut(1, 0, -1, 0),
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
    qt.Earth = Ze, qt.EPSG3395 = d0, qt.EPSG3857 = nt, qt.EPSG900913 = at, qt.EPSG4326 = Kd, qt.Simple = f0;
    var Ye = dt.extend({
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
    gt.include({
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
    var qi = Ye.extend({
      initialize: function(s, a) {
        b(this, a), this._layers = {};
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
    }), p0 = function(s, a) {
      return new qi(s, a);
    }, _n = qi.extend({
      addLayer: function(s) {
        return this.hasLayer(s) ? this : (s.addEventParent(this), qi.prototype.addLayer.call(this, s), this.fire("layeradd", { layer: s }));
      },
      removeLayer: function(s) {
        return this.hasLayer(s) ? (s in this._layers && (s = this._layers[s]), s.removeEventParent(this), qi.prototype.removeLayer.call(this, s), this.fire("layerremove", { layer: s })) : this;
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
        var s = new kt();
        for (var a in this._layers) {
          var h = this._layers[a];
          s.extend(h.getBounds ? h.getBounds() : h.getLatLng());
        }
        return s;
      }
    }), m0 = function(s, a) {
      return new _n(s, a);
    }, Qi = it.extend({
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
        b(this, s);
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
        var m = j(f), v = j(a === "shadow" && h.shadowAnchor || h.iconAnchor || m && m.divideBy(2, !0));
        s.className = "leaflet-marker-" + a + " " + (h.className || ""), v && (s.style.marginLeft = -v.x + "px", s.style.marginTop = -v.y + "px"), m && (s.style.width = m.x + "px", s.style.height = m.y + "px");
      },
      _createImg: function(s, a) {
        return a = a || document.createElement("img"), a.src = s, a;
      },
      _getIconUrl: function(s) {
        return K.retina && this.options[s + "RetinaUrl"] || this.options[s + "Url"];
      }
    });
    function g0(s) {
      return new Qi(s);
    }
    var qs = Qi.extend({
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
        return typeof qs.imagePath != "string" && (qs.imagePath = this._detectIconPath()), (this.options.imagePath || qs.imagePath) + Qi.prototype._getIconUrl.call(this, s);
      },
      _stripUrl: function(s) {
        var a = function(h, f, m) {
          var v = f.exec(h);
          return v && v[m];
        };
        return s = a(s, /^url\((['"])?(.+)\1\)$/, 2), s && a(s, /^(.*)marker-icon\.png$/, 1);
      },
      _detectIconPath: function() {
        var s = yt("div", "leaflet-default-icon-path", document.body), a = Zs(s, "background-image") || Zs(s, "backgroundImage");
        if (document.body.removeChild(s), a = this._stripUrl(a), a)
          return a;
        var h = document.querySelector('link[href$="leaflet.css"]');
        return h ? h.href.substring(0, h.href.length - 11 - 1) : "";
      }
    }), Xd = on.extend({
      initialize: function(s) {
        this._marker = s;
      },
      addHooks: function() {
        var s = this._marker._icon;
        this._draggable || (this._draggable = new Fn(s, s, !0)), this._draggable.on({
          dragstart: this._onDragStart,
          predrag: this._onPreDrag,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this).enable(), rt(s, "leaflet-marker-draggable");
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
        var a = this._marker, h = a._map, f = this._marker.options.autoPanSpeed, m = this._marker.options.autoPanPadding, v = yi(a._icon), M = h.getPixelBounds(), z = h.getPixelOrigin(), O = tt(
          M.min._subtract(z).add(m),
          M.max._subtract(z).subtract(m)
        );
        if (!O.contains(v)) {
          var R = j(
            (Math.max(O.max.x, v.x) - O.max.x) / (M.max.x - O.max.x) - (Math.min(O.min.x, v.x) - O.min.x) / (M.min.x - O.min.x),
            (Math.max(O.max.y, v.y) - O.max.y) / (M.max.y - O.max.y) - (Math.min(O.min.y, v.y) - O.min.y) / (M.min.y - O.min.y)
          ).multiplyBy(f);
          h.panBy(R, { animate: !1 }), this._draggable._newPos._add(R), this._draggable._startPos._add(R), Ht(a._icon, this._draggable._newPos), this._onDrag(s), this._panRequest = W(this._adjustPan.bind(this, s));
        }
      },
      _onDragStart: function() {
        this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup && this._marker.closePopup(), this._marker.fire("movestart").fire("dragstart");
      },
      _onPreDrag: function(s) {
        this._marker.options.autoPan && (U(this._panRequest), this._panRequest = W(this._adjustPan.bind(this, s)));
      },
      _onDrag: function(s) {
        var a = this._marker, h = a._shadow, f = yi(a._icon), m = a._map.layerPointToLatLng(f);
        h && Ht(h, f), a._latlng = m, s.latlng = m, s.oldLatLng = this._oldLatLng, a.fire("move", s).fire("drag", s);
      },
      _onDragEnd: function(s) {
        U(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", s);
      }
    }), wo = Ye.extend({
      // @section
      // @aka Marker options
      options: {
        // @option icon: Icon = *
        // Icon instance to use for rendering the marker.
        // See [Icon documentation](#L.Icon) for details on how to customize the marker icon.
        // If not specified, a common instance of `L.Icon.Default` is used.
        icon: new qs(),
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
        b(this, a), this._latlng = q(s);
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
        h !== this._icon && (this._icon && this._removeIcon(), f = !0, s.title && (h.title = s.title), h.tagName === "IMG" && (h.alt = s.alt || "")), rt(h, a), s.keyboard && (h.tabIndex = "0", h.setAttribute("role", "button")), this._icon = h, s.riseOnHover && this.on({
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }), this.options.autoPanOnFocus && et(h, "focus", this._panOnFocus, this);
        var m = s.icon.createShadow(this._shadow), v = !1;
        m !== this._shadow && (this._removeShadow(), v = !0), m && (rt(m, a), m.alt = ""), this._shadow = m, s.opacity < 1 && this._updateOpacity(), f && this.getPane().appendChild(this._icon), this._initInteraction(), m && v && this.getPane(s.shadowPane).appendChild(this._shadow);
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
        if (this.options.interactive && (rt(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), Xd)) {
          var s = this.options.draggable;
          this.dragging && (s = this.dragging.enabled(), this.dragging.disable()), this.dragging = new Xd(this), s && this.dragging.enable();
        }
      },
      // @method setOpacity(opacity: Number): this
      // Changes the opacity of the marker.
      setOpacity: function(s) {
        return this.options.opacity = s, this._map && this._updateOpacity(), this;
      },
      _updateOpacity: function() {
        var s = this.options.opacity;
        this._icon && Ae(this._icon, s), this._shadow && Ae(this._shadow, s);
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
          var a = this.options.icon.options, h = a.iconSize ? j(a.iconSize) : j(0, 0), f = a.iconAnchor ? j(a.iconAnchor) : j(0, 0);
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
    function _0(s, a) {
      return new wo(s, a);
    }
    var Hn = Ye.extend({
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
        return b(this, s), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && s && Object.prototype.hasOwnProperty.call(s, "weight") && this._updateBounds()), this;
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
    }), bo = Hn.extend({
      // @section
      // @aka CircleMarker options
      options: {
        fill: !0,
        // @option radius: Number = 10
        // Radius of the circle marker, in pixels
        radius: 10
      },
      initialize: function(s, a) {
        b(this, a), this._latlng = q(s), this._radius = this.options.radius;
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
        return Hn.prototype.setStyle.call(this, s), this.setRadius(a), this;
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
    function v0(s, a) {
      return new bo(s, a);
    }
    var tu = bo.extend({
      initialize: function(s, a, h) {
        if (typeof a == "number" && (a = r({}, h, { radius: a })), b(this, a), this._latlng = q(s), isNaN(this.options.radius))
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
        return new kt(
          this._map.layerPointToLatLng(this._point.subtract(s)),
          this._map.layerPointToLatLng(this._point.add(s))
        );
      },
      setStyle: Hn.prototype.setStyle,
      _project: function() {
        var s = this._latlng.lng, a = this._latlng.lat, h = this._map, f = h.options.crs;
        if (f.distance === Ze.distance) {
          var m = Math.PI / 180, v = this._mRadius / Ze.R / m, M = h.project([a + v, s]), z = h.project([a - v, s]), O = M.add(z).divideBy(2), R = h.unproject(O).lat, V = Math.acos((Math.cos(v * m) - Math.sin(a * m) * Math.sin(R * m)) / (Math.cos(a * m) * Math.cos(R * m))) / m;
          (isNaN(V) || V === 0) && (V = v / Math.cos(Math.PI / 180 * a)), this._point = O.subtract(h.getPixelOrigin()), this._radius = isNaN(V) ? 0 : O.x - h.project([R, s - V]).x, this._radiusY = O.y - M.y;
        } else {
          var Q = f.unproject(f.project(this._latlng).subtract([this._mRadius, 0]));
          this._point = h.latLngToLayerPoint(this._latlng), this._radius = this._point.x - h.latLngToLayerPoint(Q).x;
        }
        this._updateBounds();
      }
    });
    function y0(s, a, h) {
      return new tu(s, a, h);
    }
    var vn = Hn.extend({
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
        b(this, a), this._setLatLngs(s);
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
        for (var a = 1 / 0, h = null, f = Gs, m, v, M = 0, z = this._parts.length; M < z; M++)
          for (var O = this._parts[M], R = 1, V = O.length; R < V; R++) {
            m = O[R - 1], v = O[R];
            var Q = f(s, m, v, !0);
            Q < a && (a = Q, h = f(s, m, v));
          }
        return h && (h.distance = Math.sqrt(a)), h;
      },
      // @method getCenter(): LatLng
      // Returns the center ([centroid](https://en.wikipedia.org/wiki/Centroid)) of the polyline.
      getCenter: function() {
        if (!this._map)
          throw new Error("Must add layer to map before using getCenter()");
        return Yd(this._defaultShape(), this._map.options.crs);
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
        this._bounds = new kt(), this._latlngs = this._convertLatLngs(s);
      },
      _defaultShape: function() {
        return Ie(this._latlngs) ? this._latlngs : this._latlngs[0];
      },
      // recursively convert latlngs input into actual LatLng instances; calculate bounds along the way
      _convertLatLngs: function(s) {
        for (var a = [], h = Ie(s), f = 0, m = s.length; f < m; f++)
          h ? (a[f] = q(s[f]), this._bounds.extend(a[f])) : a[f] = this._convertLatLngs(s[f]);
        return a;
      },
      _project: function() {
        var s = new X();
        this._rings = [], this._projectLatlngs(this._latlngs, this._rings, s), this._bounds.isValid() && s.isValid() && (this._rawPxBounds = s, this._updateBounds());
      },
      _updateBounds: function() {
        var s = this._clickTolerance(), a = new D(s, s);
        this._rawPxBounds && (this._pxBounds = new X([
          this._rawPxBounds.min.subtract(a),
          this._rawPxBounds.max.add(a)
        ]));
      },
      // recursively turns latlngs into a set of rings with projected coordinates
      _projectLatlngs: function(s, a, h) {
        var f = s[0] instanceof st, m = s.length, v, M;
        if (f) {
          for (M = [], v = 0; v < m; v++)
            M[v] = this._map.latLngToLayerPoint(s[v]), h.extend(M[v]);
          a.push(M);
        } else
          for (v = 0; v < m; v++)
            this._projectLatlngs(s[v], a, h);
      },
      // clip polyline by renderer bounds so that we have less to render for performance
      _clipPoints: function() {
        var s = this._renderer._bounds;
        if (this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(s))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          var a = this._parts, h, f, m, v, M, z, O;
          for (h = 0, m = 0, v = this._rings.length; h < v; h++)
            for (O = this._rings[h], f = 0, M = O.length; f < M - 1; f++)
              z = Ud(O[f], O[f + 1], s, f, !0), z && (a[m] = a[m] || [], a[m].push(z[0]), (z[1] !== O[f + 1] || f === M - 2) && (a[m].push(z[1]), m++));
        }
      },
      // simplify each clipped part of the polyline for performance
      _simplifyPoints: function() {
        for (var s = this._parts, a = this.options.smoothFactor, h = 0, f = s.length; h < f; h++)
          s[h] = Wd(s[h], a);
      },
      _update: function() {
        this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath());
      },
      _updatePath: function() {
        this._renderer._updatePoly(this);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(s, a) {
        var h, f, m, v, M, z, O = this._clickTolerance();
        if (!this._pxBounds || !this._pxBounds.contains(s))
          return !1;
        for (h = 0, v = this._parts.length; h < v; h++)
          for (z = this._parts[h], f = 0, M = z.length, m = M - 1; f < M; m = f++)
            if (!(!a && f === 0) && Vd(s, z[m], z[f]) <= O)
              return !0;
        return !1;
      }
    });
    function x0(s, a) {
      return new vn(s, a);
    }
    vn._flat = $d;
    var Ji = vn.extend({
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
        return Hd(this._defaultShape(), this._map.options.crs);
      },
      _convertLatLngs: function(s) {
        var a = vn.prototype._convertLatLngs.call(this, s), h = a.length;
        return h >= 2 && a[0] instanceof st && a[0].equals(a[h - 1]) && a.pop(), a;
      },
      _setLatLngs: function(s) {
        vn.prototype._setLatLngs.call(this, s), Ie(this._latlngs) && (this._latlngs = [this._latlngs]);
      },
      _defaultShape: function() {
        return Ie(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0];
      },
      _clipPoints: function() {
        var s = this._renderer._bounds, a = this.options.weight, h = new D(a, a);
        if (s = new X(s.min.subtract(h), s.max.add(h)), this._parts = [], !(!this._pxBounds || !this._pxBounds.intersects(s))) {
          if (this.options.noClip) {
            this._parts = this._rings;
            return;
          }
          for (var f = 0, m = this._rings.length, v; f < m; f++)
            v = Fd(this._rings[f], s, !0), v.length && this._parts.push(v);
        }
      },
      _updatePath: function() {
        this._renderer._updatePoly(this, !0);
      },
      // Needed by the `Canvas` renderer for interactivity
      _containsPoint: function(s) {
        var a = !1, h, f, m, v, M, z, O, R;
        if (!this._pxBounds || !this._pxBounds.contains(s))
          return !1;
        for (v = 0, O = this._parts.length; v < O; v++)
          for (h = this._parts[v], M = 0, R = h.length, z = R - 1; M < R; z = M++)
            f = h[M], m = h[z], f.y > s.y != m.y > s.y && s.x < (m.x - f.x) * (s.y - f.y) / (m.y - f.y) + f.x && (a = !a);
        return a || vn.prototype._containsPoint.call(this, s, !0);
      }
    });
    function w0(s, a) {
      return new Ji(s, a);
    }
    var yn = _n.extend({
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
        b(this, a), this._layers = {}, s && this.addData(s);
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
        var v = this.options;
        if (v.filter && !v.filter(s))
          return this;
        var M = ko(s, v);
        return M ? (M.feature = Mo(s), M.defaultOptions = M.options, this.resetStyle(M), v.onEachFeature && v.onEachFeature(s, M), this.addLayer(M)) : this;
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
      var h = s.type === "Feature" ? s.geometry : s, f = h ? h.coordinates : null, m = [], v = a && a.pointToLayer, M = a && a.coordsToLatLng || eu, z, O, R, V;
      if (!f && !h)
        return null;
      switch (h.type) {
        case "Point":
          return z = M(f), Gd(v, s, z, a);
        case "MultiPoint":
          for (R = 0, V = f.length; R < V; R++)
            z = M(f[R]), m.push(Gd(v, s, z, a));
          return new _n(m);
        case "LineString":
        case "MultiLineString":
          return O = So(f, h.type === "LineString" ? 0 : 1, M), new vn(O, a);
        case "Polygon":
        case "MultiPolygon":
          return O = So(f, h.type === "Polygon" ? 1 : 2, M), new Ji(O, a);
        case "GeometryCollection":
          for (R = 0, V = h.geometries.length; R < V; R++) {
            var Q = ko({
              geometry: h.geometries[R],
              type: "Feature",
              properties: s.properties
            }, a);
            Q && m.push(Q);
          }
          return new _n(m);
        case "FeatureCollection":
          for (R = 0, V = h.features.length; R < V; R++) {
            var ct = ko(h.features[R], a);
            ct && m.push(ct);
          }
          return new _n(m);
        default:
          throw new Error("Invalid GeoJSON object.");
      }
    }
    function Gd(s, a, h, f) {
      return s ? s(a, h) : new wo(h, f && f.markersInheritOptions && f);
    }
    function eu(s) {
      return new st(s[1], s[0], s[2]);
    }
    function So(s, a, h) {
      for (var f = [], m = 0, v = s.length, M; m < v; m++)
        M = a ? So(s[m], a - 1, h) : (h || eu)(s[m]), f.push(M);
      return f;
    }
    function nu(s, a) {
      return s = q(s), s.alt !== void 0 ? [_(s.lng, a), _(s.lat, a), _(s.alt, a)] : [_(s.lng, a), _(s.lat, a)];
    }
    function Po(s, a, h, f) {
      for (var m = [], v = 0, M = s.length; v < M; v++)
        m.push(a ? Po(s[v], Ie(s[v]) ? 0 : a - 1, h, f) : nu(s[v], f));
      return !a && h && m.length > 0 && m.push(m[0].slice()), m;
    }
    function ts(s, a) {
      return s.feature ? r({}, s.feature, { geometry: a }) : Mo(a);
    }
    function Mo(s) {
      return s.type === "Feature" || s.type === "FeatureCollection" ? s : {
        type: "Feature",
        properties: {},
        geometry: s
      };
    }
    var iu = {
      toGeoJSON: function(s) {
        return ts(this, {
          type: "Point",
          coordinates: nu(this.getLatLng(), s)
        });
      }
    };
    wo.include(iu), tu.include(iu), bo.include(iu), vn.include({
      toGeoJSON: function(s) {
        var a = !Ie(this._latlngs), h = Po(this._latlngs, a ? 1 : 0, !1, s);
        return ts(this, {
          type: (a ? "Multi" : "") + "LineString",
          coordinates: h
        });
      }
    }), Ji.include({
      toGeoJSON: function(s) {
        var a = !Ie(this._latlngs), h = a && !Ie(this._latlngs[0]), f = Po(this._latlngs, h ? 2 : a ? 1 : 0, !0, s);
        return a || (f = [f]), ts(this, {
          type: (h ? "Multi" : "") + "Polygon",
          coordinates: f
        });
      }
    }), qi.include({
      toMultiPoint: function(s) {
        var a = [];
        return this.eachLayer(function(h) {
          a.push(h.toGeoJSON(s).geometry.coordinates);
        }), ts(this, {
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
            var v = m.toGeoJSON(s);
            if (h)
              f.push(v.geometry);
            else {
              var M = Mo(v);
              M.type === "FeatureCollection" ? f.push.apply(f, M.features) : f.push(M);
            }
          }
        }), h ? ts(this, {
          geometries: f,
          type: "GeometryCollection"
        }) : {
          type: "FeatureCollection",
          features: f
        };
      }
    });
    function qd(s, a) {
      return new yn(s, a);
    }
    var b0 = qd, Co = Ye.extend({
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
        this._url = s, this._bounds = lt(a), b(this, h);
      },
      onAdd: function() {
        this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (rt(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset();
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
        return this._map && Xi(this._image), this;
      },
      // @method bringToBack(): this
      // Brings the layer to the bottom of all overlays.
      bringToBack: function() {
        return this._map && Gi(this._image), this;
      },
      // @method setUrl(url: String): this
      // Changes the URL of the image.
      setUrl: function(s) {
        return this._url = s, this._image && (this._image.src = s), this;
      },
      // @method setBounds(bounds: LatLngBounds): this
      // Update the bounds that this ImageOverlay covers
      setBounds: function(s) {
        return this._bounds = lt(s), this._map && this._reset(), this;
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
        var s = this._url.tagName === "IMG", a = this._image = s ? this._url : yt("img");
        if (rt(a, "leaflet-image-layer"), this._zoomAnimated && rt(a, "leaflet-zoom-animated"), this.options.className && rt(a, this.options.className), a.onselectstart = g, a.onmousemove = g, a.onload = l(this.fire, this, "load"), a.onerror = l(this._overlayOnError, this, "error"), (this.options.crossOrigin || this.options.crossOrigin === "") && (a.crossOrigin = this.options.crossOrigin === !0 ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), s) {
          this._url = a.src;
          return;
        }
        a.src = this._url, a.alt = this.options.alt;
      },
      _animateZoom: function(s) {
        var a = this._map.getZoomScale(s.zoom), h = this._map._latLngBoundsToNewLayerBounds(this._bounds, s.zoom, s.center).min;
        vi(this._image, h, a);
      },
      _reset: function() {
        var s = this._image, a = new X(
          this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
          this._map.latLngToLayerPoint(this._bounds.getSouthEast())
        ), h = a.getSize();
        Ht(s, a.min), s.style.width = h.x + "px", s.style.height = h.y + "px";
      },
      _updateOpacity: function() {
        Ae(this._image, this.options.opacity);
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
    }), k0 = function(s, a, h) {
      return new Co(s, a, h);
    }, Qd = Co.extend({
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
        var s = this._url.tagName === "VIDEO", a = this._image = s ? this._url : yt("video");
        if (rt(a, "leaflet-image-layer"), this._zoomAnimated && rt(a, "leaflet-zoom-animated"), this.options.className && rt(a, this.options.className), a.onselectstart = g, a.onmousemove = g, a.onloadeddata = l(this.fire, this, "load"), s) {
          for (var h = a.getElementsByTagName("source"), f = [], m = 0; m < h.length; m++)
            f.push(h[m].src);
          this._url = h.length > 0 ? f : [a.src];
          return;
        }
        P(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && Object.prototype.hasOwnProperty.call(a.style, "objectFit") && (a.style.objectFit = "fill"), a.autoplay = !!this.options.autoplay, a.loop = !!this.options.loop, a.muted = !!this.options.muted, a.playsInline = !!this.options.playsInline;
        for (var v = 0; v < this._url.length; v++) {
          var M = yt("source");
          M.src = this._url[v], a.appendChild(M);
        }
      }
      // @method getElement(): HTMLVideoElement
      // Returns the instance of [`HTMLVideoElement`](https://developer.mozilla.org/docs/Web/API/HTMLVideoElement)
      // used by this overlay.
    });
    function S0(s, a, h) {
      return new Qd(s, a, h);
    }
    var Jd = Co.extend({
      _initImage: function() {
        var s = this._image = this._url;
        rt(s, "leaflet-image-layer"), this._zoomAnimated && rt(s, "leaflet-zoom-animated"), this.options.className && rt(s, this.options.className), s.onselectstart = g, s.onmousemove = g;
      }
      // @method getElement(): SVGElement
      // Returns the instance of [`SVGElement`](https://developer.mozilla.org/docs/Web/API/SVGElement)
      // used by this overlay.
    });
    function P0(s, a, h) {
      return new Jd(s, a, h);
    }
    var an = Ye.extend({
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
        s && (s instanceof st || P(s)) ? (this._latlng = q(s), b(this, a)) : (b(this, s), this._source = a), this.options.content && (this._content = this.options.content);
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
        this._zoomAnimated = s._zoomAnimated, this._container || this._initLayout(), s._fadeAnimated && Ae(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), s._fadeAnimated && Ae(this._container, 1), this.bringToFront(), this.options.interactive && (rt(this._container, "leaflet-interactive"), this.addInteractiveTarget(this._container));
      },
      onRemove: function(s) {
        s._fadeAnimated ? (Ae(this._container, 0), this._removeTimeout = setTimeout(l(zt, void 0, this._container), 200)) : zt(this._container), this.options.interactive && (jt(this._container, "leaflet-interactive"), this.removeInteractiveTarget(this._container));
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
        return this._map && Xi(this._container), this;
      },
      // @method bringToBack: this
      // Brings this overlay to the back of other overlays (in the same map pane).
      bringToBack: function() {
        return this._map && Gi(this._container), this;
      },
      // prepare bound overlay to open: update latlng pos / content source (for FeatureGroup)
      _prepareOpen: function(s) {
        var a = this._source;
        if (!a._map)
          return !1;
        if (a instanceof _n) {
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
          var s = this._map.latLngToLayerPoint(this._latlng), a = j(this.options.offset), h = this._getAnchor();
          this._zoomAnimated ? Ht(this._container, s.add(h)) : a = a.add(s).add(h);
          var f = this._containerBottom = -a.y, m = this._containerLeft = -Math.round(this._containerWidth / 2) + a.x;
          this._container.style.bottom = f + "px", this._container.style.left = m + "px";
        }
      },
      _getAnchor: function() {
        return [0, 0];
      }
    });
    gt.include({
      _initOverlay: function(s, a, h, f) {
        var m = a;
        return m instanceof s || (m = new s(f).setContent(a)), h && m.setLatLng(h), m;
      }
    }), Ye.include({
      _initOverlay: function(s, a, h, f) {
        var m = h;
        return m instanceof s ? (b(m, f), m._source = this) : (m = a && !f ? a : new s(f, this), m.setContent(h)), m;
      }
    });
    var Lo = an.extend({
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
        return s = arguments.length ? s : this._source._map, !s.hasLayer(this) && s._popup && s._popup.options.autoClose && s.removeLayer(s._popup), s._popup = this, an.prototype.openOn.call(this, s);
      },
      onAdd: function(s) {
        an.prototype.onAdd.call(this, s), s.fire("popupopen", { popup: this }), this._source && (this._source.fire("popupopen", { popup: this }, !0), this._source instanceof Hn || this._source.on("preclick", xi));
      },
      onRemove: function(s) {
        an.prototype.onRemove.call(this, s), s.fire("popupclose", { popup: this }), this._source && (this._source.fire("popupclose", { popup: this }, !0), this._source instanceof Hn || this._source.off("preclick", xi));
      },
      getEvents: function() {
        var s = an.prototype.getEvents.call(this);
        return (this.options.closeOnClick !== void 0 ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (s.preclick = this.close), this.options.keepInView && (s.moveend = this._adjustPan), s;
      },
      _initLayout: function() {
        var s = "leaflet-popup", a = this._container = yt(
          "div",
          s + " " + (this.options.className || "") + " leaflet-zoom-animated"
        ), h = this._wrapper = yt("div", s + "-content-wrapper", a);
        if (this._contentNode = yt("div", s + "-content", h), Ks(a), $l(this._contentNode), et(a, "contextmenu", xi), this._tipContainer = yt("div", s + "-tip-container", a), this._tip = yt("div", s + "-tip", this._tipContainer), this.options.closeButton) {
          var f = this._closeButton = yt("a", s + "-close-button", a);
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
        var f = s.offsetHeight, m = this.options.maxHeight, v = "leaflet-popup-scrolled";
        m && f > m ? (a.height = m + "px", rt(s, v)) : jt(s, v), this._containerWidth = this._container.offsetWidth;
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
          var s = this._map, a = parseInt(Zs(this._container, "marginBottom"), 10) || 0, h = this._container.offsetHeight + a, f = this._containerWidth, m = new D(this._containerLeft, -h - this._containerBottom);
          m._add(yi(this._container));
          var v = s.layerPointToContainerPoint(m), M = j(this.options.autoPanPadding), z = j(this.options.autoPanPaddingTopLeft || M), O = j(this.options.autoPanPaddingBottomRight || M), R = s.getSize(), V = 0, Q = 0;
          v.x + f + O.x > R.x && (V = v.x + f - R.x + O.x), v.x - V - z.x < 0 && (V = v.x - z.x), v.y + h + O.y > R.y && (Q = v.y + h - R.y + O.y), v.y - Q - z.y < 0 && (Q = v.y - z.y), (V || Q) && (this.options.keepInView && (this._autopanning = !0), s.fire("autopanstart").panBy([V, Q]));
        }
      },
      _getAnchor: function() {
        return j(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0]);
      }
    }), M0 = function(s, a) {
      return new Lo(s, a);
    };
    gt.mergeOptions({
      closePopupOnClick: !0
    }), gt.include({
      // @method openPopup(popup: Popup): this
      // Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
      // @alternative
      // @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
      // Creates a popup with the specified content and options and opens it in the given point on a map.
      openPopup: function(s, a, h) {
        return this._initOverlay(Lo, s, a, h).openOn(this), this;
      },
      // @method closePopup(popup?: Popup): this
      // Closes the popup previously opened with [openPopup](#map-openpopup) (or the given one).
      closePopup: function(s) {
        return s = arguments.length ? s : this._popup, s && s.close(), this;
      }
    }), Ye.include({
      // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
      // Binds a popup to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindPopup: function(s, a) {
        return this._popup = this._initOverlay(Lo, this._popup, s, a), this._popupHandlersAdded || (this.on({
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
        return this._popup && (this instanceof _n || (this._popup._source = this), this._popup._prepareOpen(s || this._latlng) && this._popup.openOn(this._map)), this;
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
          wi(s);
          var a = s.layer || s.target;
          if (this._popup._source === a && !(a instanceof Hn)) {
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
    var To = an.extend({
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
        an.prototype.onAdd.call(this, s), this.setOpacity(this.options.opacity), s.fire("tooltipopen", { tooltip: this }), this._source && (this.addEventParent(this._source), this._source.fire("tooltipopen", { tooltip: this }, !0));
      },
      onRemove: function(s) {
        an.prototype.onRemove.call(this, s), s.fire("tooltipclose", { tooltip: this }), this._source && (this.removeEventParent(this._source), this._source.fire("tooltipclose", { tooltip: this }, !0));
      },
      getEvents: function() {
        var s = an.prototype.getEvents.call(this);
        return this.options.permanent || (s.preclick = this.close), s;
      },
      _initLayout: function() {
        var s = "leaflet-tooltip", a = s + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
        this._contentNode = this._container = yt("div", a), this._container.setAttribute("role", "tooltip"), this._container.setAttribute("id", "leaflet-tooltip-" + c(this));
      },
      _updateLayout: function() {
      },
      _adjustPan: function() {
      },
      _setPosition: function(s) {
        var a, h, f = this._map, m = this._container, v = f.latLngToContainerPoint(f.getCenter()), M = f.layerPointToContainerPoint(s), z = this.options.direction, O = m.offsetWidth, R = m.offsetHeight, V = j(this.options.offset), Q = this._getAnchor();
        z === "top" ? (a = O / 2, h = R) : z === "bottom" ? (a = O / 2, h = 0) : z === "center" ? (a = O / 2, h = R / 2) : z === "right" ? (a = 0, h = R / 2) : z === "left" ? (a = O, h = R / 2) : M.x < v.x ? (z = "right", a = 0, h = R / 2) : (z = "left", a = O + (V.x + Q.x) * 2, h = R / 2), s = s.subtract(j(a, h, !0)).add(V).add(Q), jt(m, "leaflet-tooltip-right"), jt(m, "leaflet-tooltip-left"), jt(m, "leaflet-tooltip-top"), jt(m, "leaflet-tooltip-bottom"), rt(m, "leaflet-tooltip-" + z), Ht(m, s);
      },
      _updatePosition: function() {
        var s = this._map.latLngToLayerPoint(this._latlng);
        this._setPosition(s);
      },
      setOpacity: function(s) {
        this.options.opacity = s, this._container && Ae(this._container, s);
      },
      _animateZoom: function(s) {
        var a = this._map._latLngToNewLayerPoint(this._latlng, s.zoom, s.center);
        this._setPosition(a);
      },
      _getAnchor: function() {
        return j(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0]);
      }
    }), C0 = function(s, a) {
      return new To(s, a);
    };
    gt.include({
      // @method openTooltip(tooltip: Tooltip): this
      // Opens the specified tooltip.
      // @alternative
      // @method openTooltip(content: String|HTMLElement, latlng: LatLng, options?: Tooltip options): this
      // Creates a tooltip with the specified content and options and open it.
      openTooltip: function(s, a, h) {
        return this._initOverlay(To, s, a, h).openOn(this), this;
      },
      // @method closeTooltip(tooltip: Tooltip): this
      // Closes the tooltip given as parameter.
      closeTooltip: function(s) {
        return s.close(), this;
      }
    }), Ye.include({
      // @method bindTooltip(content: String|HTMLElement|Function|Tooltip, options?: Tooltip options): this
      // Binds a tooltip to the layer with the passed `content` and sets up the
      // necessary event listeners. If a `Function` is passed it will receive
      // the layer as the first argument and should return a `String` or `HTMLElement`.
      bindTooltip: function(s, a) {
        return this._tooltip && this.isTooltipOpen() && this.unbindTooltip(), this._tooltip = this._initOverlay(To, this._tooltip, s, a), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this;
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
        return this._tooltip && (this instanceof _n || (this._tooltip._source = this), this._tooltip._prepareOpen(s) && (this._tooltip.openOn(this._map), this.getElement ? this._setAriaDescribedByOnLayer(this) : this.eachLayer && this.eachLayer(this._setAriaDescribedByOnLayer, this))), this;
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
    var tf = Qi.extend({
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
        if (h.html instanceof Element ? (mo(a), a.appendChild(h.html)) : a.innerHTML = h.html !== !1 ? h.html : "", h.bgPos) {
          var f = j(h.bgPos);
          a.style.backgroundPosition = -f.x + "px " + -f.y + "px";
        }
        return this._setIconStyles(a, "icon"), a;
      },
      createShadow: function() {
        return null;
      }
    });
    function L0(s) {
      return new tf(s);
    }
    Qi.Default = qs;
    var Qs = Ye.extend({
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
        b(this, s);
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
        return this._map && (Xi(this._container), this._setAutoZIndex(Math.max)), this;
      },
      // @method bringToBack: this
      // Brings the tile layer to the bottom of all tile layers.
      bringToBack: function() {
        return this._map && (Gi(this._container), this._setAutoZIndex(Math.min)), this;
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
        return s instanceof D ? s : new D(s, s);
      },
      _updateZIndex: function() {
        this._container && this.options.zIndex !== void 0 && this.options.zIndex !== null && (this._container.style.zIndex = this.options.zIndex);
      },
      _setAutoZIndex: function(s) {
        for (var a = this.getPane().children, h = -s(-1 / 0, 1 / 0), f = 0, m = a.length, v; f < m; f++)
          v = a[f].style.zIndex, a[f] !== this._container && v && (h = s(h, +v));
        isFinite(h) && (this.options.zIndex = h + s(-1, 1), this._updateZIndex());
      },
      _updateOpacity: function() {
        if (this._map && !K.ielt9) {
          Ae(this._container, this.options.opacity);
          var s = +/* @__PURE__ */ new Date(), a = !1, h = !1;
          for (var f in this._tiles) {
            var m = this._tiles[f];
            if (!(!m.current || !m.loaded)) {
              var v = Math.min(1, (s - m.loaded) / 200);
              Ae(m.el, v), v < 1 ? a = !0 : (m.active ? h = !0 : this._onOpaqueTile(m), m.active = !0);
            }
          }
          h && !this._noPrune && this._pruneTiles(), a && (U(this._fadeFrame), this._fadeFrame = W(this._updateOpacity, this));
        }
      },
      _onOpaqueTile: g,
      _initContainer: function() {
        this._container || (this._container = yt("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container));
      },
      _updateLevels: function() {
        var s = this._tileZoom, a = this.options.maxZoom;
        if (s !== void 0) {
          for (var h in this._levels)
            h = Number(h), this._levels[h].el.children.length || h === s ? (this._levels[h].el.style.zIndex = a - Math.abs(s - h), this._onUpdateLevel(h)) : (zt(this._levels[h].el), this._removeTilesAtZoom(h), this._onRemoveLevel(h), delete this._levels[h]);
          var f = this._levels[s], m = this._map;
          return f || (f = this._levels[s] = {}, f.el = yt("div", "leaflet-tile-container leaflet-zoom-animated", this._container), f.el.style.zIndex = a, f.origin = m.project(m.unproject(m.getPixelOrigin()), s).round(), f.zoom = s, this._setZoomTransform(f, m.getCenter(), m.getZoom()), g(f.el.offsetWidth), this._onCreateLevel(f)), this._level = f, f;
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
        var m = Math.floor(s / 2), v = Math.floor(a / 2), M = h - 1, z = new D(+m, +v);
        z.z = +M;
        var O = this._tileCoordsToKey(z), R = this._tiles[O];
        return R && R.active ? (R.retain = !0, !0) : (R && R.loaded && (R.retain = !0), M > f ? this._retainParent(m, v, M, f) : !1);
      },
      _retainChildren: function(s, a, h, f) {
        for (var m = 2 * s; m < 2 * s + 2; m++)
          for (var v = 2 * a; v < 2 * a + 2; v++) {
            var M = new D(m, v);
            M.z = h + 1;
            var z = this._tileCoordsToKey(M), O = this._tiles[z];
            if (O && O.active) {
              O.retain = !0;
              continue;
            } else O && O.loaded && (O.retain = !0);
            h + 1 < f && this._retainChildren(m, v, h + 1, f);
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
        var v = this.options.updateWhenZooming && m !== this._tileZoom;
        (!f || v) && (this._tileZoom = m, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), m !== void 0 && this._update(s), h || this._pruneTiles(), this._noPrune = !!h), this._setZoomTransforms(s, a);
      },
      _setZoomTransforms: function(s, a) {
        for (var h in this._levels)
          this._setZoomTransform(this._levels[h], s, a);
      },
      _setZoomTransform: function(s, a, h) {
        var f = this._map.getZoomScale(h, s.zoom), m = s.origin.multiplyBy(f).subtract(this._map._getNewPixelOrigin(a, h)).round();
        K.any3d ? vi(s.el, m, f) : Ht(s.el, m);
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
        var a = this._map, h = a._animatingZoom ? Math.max(a._animateToZoom, a.getZoom()) : a.getZoom(), f = a.getZoomScale(h, this._tileZoom), m = a.project(s, this._tileZoom).floor(), v = a.getSize().divideBy(f * 2);
        return new X(m.subtract(v), m.add(v));
      },
      // Private method to load tiles in the grid's active zoom level according to map bounds
      _update: function(s) {
        var a = this._map;
        if (a) {
          var h = this._clampZoom(a.getZoom());
          if (s === void 0 && (s = a.getCenter()), this._tileZoom !== void 0) {
            var f = this._getTiledPixelBounds(s), m = this._pxBoundsToTileRange(f), v = m.getCenter(), M = [], z = this.options.keepBuffer, O = new X(
              m.getBottomLeft().subtract([z, -z]),
              m.getTopRight().add([z, -z])
            );
            if (!(isFinite(m.min.x) && isFinite(m.min.y) && isFinite(m.max.x) && isFinite(m.max.y)))
              throw new Error("Attempted to load an infinite number of tiles");
            for (var R in this._tiles) {
              var V = this._tiles[R].coords;
              (V.z !== this._tileZoom || !O.contains(new D(V.x, V.y))) && (this._tiles[R].current = !1);
            }
            if (Math.abs(h - this._tileZoom) > 1) {
              this._setView(s, h);
              return;
            }
            for (var Q = m.min.y; Q <= m.max.y; Q++)
              for (var ct = m.min.x; ct <= m.max.x; ct++) {
                var le = new D(ct, Q);
                if (le.z = this._tileZoom, !!this._isValidTile(le)) {
                  var Kt = this._tiles[this._tileCoordsToKey(le)];
                  Kt ? Kt.current = !0 : M.push(le);
                }
              }
            if (M.sort(function(me, ns) {
              return me.distanceTo(v) - ns.distanceTo(v);
            }), M.length !== 0) {
              this._loading || (this._loading = !0, this.fire("loading"));
              var De = document.createDocumentFragment();
              for (ct = 0; ct < M.length; ct++)
                this._addTile(M[ct], De);
              this._level.el.appendChild(De);
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
        return lt(this.options.bounds).overlaps(f);
      },
      _keyToBounds: function(s) {
        return this._tileCoordsToBounds(this._keyToTileCoords(s));
      },
      _tileCoordsToNwSe: function(s) {
        var a = this._map, h = this.getTileSize(), f = s.scaleBy(h), m = f.add(h), v = a.unproject(f, s.z), M = a.unproject(m, s.z);
        return [v, M];
      },
      // converts tile coordinates to its geographical bounds
      _tileCoordsToBounds: function(s) {
        var a = this._tileCoordsToNwSe(s), h = new kt(a[0], a[1]);
        return this.options.noWrap || (h = this._map.wrapLatLngBounds(h)), h;
      },
      // converts tile coordinates to key for the tile cache
      _tileCoordsToKey: function(s) {
        return s.x + ":" + s.y + ":" + s.z;
      },
      // converts tile cache key to coordinates
      _keyToTileCoords: function(s) {
        var a = s.split(":"), h = new D(+a[0], +a[1]);
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
        rt(s, "leaflet-tile");
        var a = this.getTileSize();
        s.style.width = a.x + "px", s.style.height = a.y + "px", s.onselectstart = g, s.onmousemove = g, K.ielt9 && this.options.opacity < 1 && Ae(s, this.options.opacity);
      },
      _addTile: function(s, a) {
        var h = this._getTilePos(s), f = this._tileCoordsToKey(s), m = this.createTile(this._wrapCoords(s), l(this._tileReady, this, s));
        this._initTile(m), this.createTile.length < 2 && W(l(this._tileReady, this, s, null, m)), Ht(m, h), this._tiles[f] = {
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
        h = this._tiles[f], h && (h.loaded = +/* @__PURE__ */ new Date(), this._map._fadeAnimated ? (Ae(h.el, 0), U(this._fadeFrame), this._fadeFrame = W(this._updateOpacity, this)) : (h.active = !0, this._pruneTiles()), a || (rt(h.el, "leaflet-tile-loaded"), this.fire("tileload", {
          tile: h.el,
          coords: s
        })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), K.ielt9 || !this._map._fadeAnimated ? W(this._pruneTiles, this) : setTimeout(l(this._pruneTiles, this), 250)));
      },
      _getTilePos: function(s) {
        return s.scaleBy(this.getTileSize()).subtract(this._level.origin);
      },
      _wrapCoords: function(s) {
        var a = new D(
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
    function T0(s) {
      return new Qs(s);
    }
    var es = Qs.extend({
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
        this._url = s, a = b(this, a), a.detectRetina && K.retina && a.maxZoom > 0 ? (a.tileSize = Math.floor(a.tileSize / 2), a.zoomReverse ? (a.zoomOffset--, a.minZoom = Math.min(a.maxZoom, a.minZoom + 1)) : (a.zoomOffset++, a.maxZoom = Math.max(a.minZoom, a.maxZoom - 1)), a.minZoom = Math.max(0, a.minZoom)) : a.zoomReverse ? a.minZoom = Math.min(a.maxZoom, a.minZoom) : a.maxZoom = Math.max(a.minZoom, a.maxZoom), typeof a.subdomains == "string" && (a.subdomains = a.subdomains.split("")), this.on("tileunload", this._onTileRemove);
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
        return k(this._url, r(a, this.options));
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
          return a.el.setAttribute("src", E), Qs.prototype._removeTile.call(this, s);
      },
      _tileReady: function(s, a, h) {
        if (!(!this._map || h && h.getAttribute("src") === E))
          return Qs.prototype._tileReady.call(this, s, a, h);
      }
    });
    function ef(s, a) {
      return new es(s, a);
    }
    var nf = es.extend({
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
        a = b(this, a);
        var m = a.detectRetina && K.retina ? 2 : 1, v = this.getTileSize();
        h.width = v.x * m, h.height = v.y * m, this.wmsParams = h;
      },
      onAdd: function(s) {
        this._crs = this.options.crs || s.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
        var a = this._wmsVersion >= 1.3 ? "crs" : "srs";
        this.wmsParams[a] = this._crs.code, es.prototype.onAdd.call(this, s);
      },
      getTileUrl: function(s) {
        var a = this._tileCoordsToNwSe(s), h = this._crs, f = tt(h.project(a[0]), h.project(a[1])), m = f.min, v = f.max, M = (this._wmsVersion >= 1.3 && this._crs === Kd ? [m.y, m.x, v.y, v.x] : [m.x, m.y, v.x, v.y]).join(","), z = es.prototype.getTileUrl.call(this, s);
        return z + C(this.wmsParams, z, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + M;
      },
      // @method setParams(params: Object, noRedraw?: Boolean): this
      // Merges an object with the new parameters and re-requests tiles on the current screen (unless `noRedraw` was set to true).
      setParams: function(s, a) {
        return r(this.wmsParams, s), a || this.redraw(), this;
      }
    });
    function E0(s, a) {
      return new nf(s, a);
    }
    es.WMS = nf, ef.wms = E0;
    var xn = Ye.extend({
      // @section
      // @aka Renderer options
      options: {
        // @option padding: Number = 0.1
        // How much to extend the clip area around the map view (relative to its size)
        // e.g. 0.1 would be 10% of map view in each direction
        padding: 0.1
      },
      initialize: function(s) {
        b(this, s), c(this), this._layers = this._layers || {};
      },
      onAdd: function() {
        this._container || (this._initContainer(), rt(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this);
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
        var h = this._map.getZoomScale(a, this._zoom), f = this._map.getSize().multiplyBy(0.5 + this.options.padding), m = this._map.project(this._center, a), v = f.multiplyBy(-h).add(m).subtract(this._map._getNewPixelOrigin(s, a));
        K.any3d ? vi(this._container, v, h) : Ht(this._container, v);
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
    }), sf = xn.extend({
      // @section
      // @aka Canvas options
      options: {
        // @option tolerance: Number = 0
        // How much to extend the click tolerance around a path/object on the map.
        tolerance: 0
      },
      getEvents: function() {
        var s = xn.prototype.getEvents.call(this);
        return s.viewprereset = this._onViewPreReset, s;
      },
      _onViewPreReset: function() {
        this._postponeUpdatePaths = !0;
      },
      onAdd: function() {
        xn.prototype.onAdd.call(this), this._draw();
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
          xn.prototype._update.call(this);
          var s = this._bounds, a = this._container, h = s.getSize(), f = K.retina ? 2 : 1;
          Ht(a, s.min), a.width = f * h.x, a.height = f * h.y, a.style.width = h.x + "px", a.style.height = h.y + "px", K.retina && this._ctx.scale(2, 2), this._ctx.translate(-s.min.x, -s.min.y), this.fire("update");
        }
      },
      _reset: function() {
        xn.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths());
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
        this._map && (this._extendRedrawBounds(s), this._redrawRequest = this._redrawRequest || W(this._redraw, this));
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
          var h, f, m, v, M = s._parts, z = M.length, O = this._ctx;
          if (z) {
            for (O.beginPath(), h = 0; h < z; h++) {
              for (f = 0, m = M[h].length; f < m; f++)
                v = M[h][f], O[f ? "lineTo" : "moveTo"](v.x, v.y);
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
          f !== this._hoveredLayer && (this._handleMouseOut(s), f && (rt(this._container, "leaflet-interactive"), this._fireEvent([f], s, "mouseover"), this._hoveredLayer = f)), this._fireEvent(this._hoveredLayer ? [this._hoveredLayer] : !1, s), this._mouseHoverThrottled = !0, setTimeout(l(function() {
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
    function rf(s) {
      return K.canvas ? new sf(s) : null;
    }
    var Js = function() {
      try {
        return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function(s) {
          return document.createElement("<lvml:" + s + ' class="lvml">');
        };
      } catch {
      }
      return function(s) {
        return document.createElement("<" + s + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
      };
    }(), z0 = {
      _initContainer: function() {
        this._container = yt("div", "leaflet-vml-container");
      },
      _update: function() {
        this._map._animatingZoom || (xn.prototype._update.call(this), this.fire("update"));
      },
      _initPath: function(s) {
        var a = s._container = Js("shape");
        rt(a, "leaflet-vml-shape " + (this.options.className || "")), a.coordsize = "1 1", s._path = Js("path"), a.appendChild(s._path), this._updateStyle(s), this._layers[c(s)] = s;
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
        m.stroked = !!f.stroke, m.filled = !!f.fill, f.stroke ? (a || (a = s._stroke = Js("stroke")), m.appendChild(a), a.weight = f.weight + "px", a.color = f.color, a.opacity = f.opacity, f.dashArray ? a.dashStyle = P(f.dashArray) ? f.dashArray.join(" ") : f.dashArray.replace(/( *, *)/g, " ") : a.dashStyle = "", a.endcap = f.lineCap.replace("butt", "flat"), a.joinstyle = f.lineJoin) : a && (m.removeChild(a), s._stroke = null), f.fill ? (h || (h = s._fill = Js("fill")), m.appendChild(h), h.color = f.fillColor || f.color, h.opacity = f.fillOpacity) : h && (m.removeChild(h), s._fill = null);
      },
      _updateCircle: function(s) {
        var a = s._point.round(), h = Math.round(s._radius), f = Math.round(s._radiusY || h);
        this._setPath(s, s._empty() ? "M0 0" : "AL " + a.x + "," + a.y + " " + h + "," + f + " 0," + 65535 * 360);
      },
      _setPath: function(s, a) {
        s._path.v = a;
      },
      _bringToFront: function(s) {
        Xi(s._container);
      },
      _bringToBack: function(s) {
        Gi(s._container);
      }
    }, Eo = K.vml ? Js : Ne, tr = xn.extend({
      _initContainer: function() {
        this._container = Eo("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = Eo("g"), this._container.appendChild(this._rootGroup);
      },
      _destroyContainer: function() {
        zt(this._container), Pt(this._container), delete this._container, delete this._rootGroup, delete this._svgSize;
      },
      _update: function() {
        if (!(this._map._animatingZoom && this._bounds)) {
          xn.prototype._update.call(this);
          var s = this._bounds, a = s.getSize(), h = this._container;
          (!this._svgSize || !this._svgSize.equals(a)) && (this._svgSize = a, h.setAttribute("width", a.x), h.setAttribute("height", a.y)), Ht(h, s.min), h.setAttribute("viewBox", [s.min.x, s.min.y, a.x, a.y].join(" ")), this.fire("update");
        }
      },
      // methods below are called by vector layers implementations
      _initPath: function(s) {
        var a = s._path = Eo("path");
        s.options.className && rt(a, s.options.className), s.options.interactive && rt(a, "leaflet-interactive"), this._updateStyle(s), this._layers[c(s)] = s;
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
        this._setPath(s, nn(s._parts, a));
      },
      _updateCircle: function(s) {
        var a = s._point, h = Math.max(Math.round(s._radius), 1), f = Math.max(Math.round(s._radiusY), 1) || h, m = "a" + h + "," + f + " 0 1,0 ", v = s._empty() ? "M0 0" : "M" + (a.x - h) + "," + a.y + m + h * 2 + ",0 " + m + -h * 2 + ",0 ";
        this._setPath(s, v);
      },
      _setPath: function(s, a) {
        s._path.setAttribute("d", a);
      },
      // SVG does not have the concept of zIndex so we resort to changing the DOM order of elements
      _bringToFront: function(s) {
        Xi(s._path);
      },
      _bringToBack: function(s) {
        Gi(s._path);
      }
    });
    K.vml && tr.include(z0);
    function of(s) {
      return K.svg || K.vml ? new tr(s) : null;
    }
    gt.include({
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
        return this.options.preferCanvas && rf(s) || of(s);
      }
    });
    var af = Ji.extend({
      initialize: function(s, a) {
        Ji.prototype.initialize.call(this, this._boundsToLatLngs(s), a);
      },
      // @method setBounds(latLngBounds: LatLngBounds): this
      // Redraws the rectangle with the passed bounds.
      setBounds: function(s) {
        return this.setLatLngs(this._boundsToLatLngs(s));
      },
      _boundsToLatLngs: function(s) {
        return s = lt(s), [
          s.getSouthWest(),
          s.getNorthWest(),
          s.getNorthEast(),
          s.getSouthEast()
        ];
      }
    });
    function O0(s, a) {
      return new af(s, a);
    }
    tr.create = Eo, tr.pointsToPath = nn, yn.geometryToLayer = ko, yn.coordsToLatLng = eu, yn.coordsToLatLngs = So, yn.latLngToCoords = nu, yn.latLngsToCoords = Po, yn.getFeature = ts, yn.asFeature = Mo, gt.mergeOptions({
      // @option boxZoom: Boolean = true
      // Whether the map can be zoomed to a rectangular area specified by
      // dragging the mouse while pressing the shift key.
      boxZoom: !0
    });
    var lf = on.extend({
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
        this._clearDeferredResetState(), this._resetState(), Us(), jl(), this._startPoint = this._map.mouseEventToContainerPoint(s), et(document, {
          contextmenu: wi,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseMove: function(s) {
        this._moved || (this._moved = !0, this._box = yt("div", "leaflet-zoom-box", this._container), rt(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(s);
        var a = new X(this._point, this._startPoint), h = a.getSize();
        Ht(this._box, a.min), this._box.style.width = h.x + "px", this._box.style.height = h.y + "px";
      },
      _finish: function() {
        this._moved && (zt(this._box), jt(this._container, "leaflet-crosshair")), $s(), Bl(), Pt(document, {
          contextmenu: wi,
          mousemove: this._onMouseMove,
          mouseup: this._onMouseUp,
          keydown: this._onKeyDown
        }, this);
      },
      _onMouseUp: function(s) {
        if (!(s.which !== 1 && s.button !== 1) && (this._finish(), !!this._moved)) {
          this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(l(this._resetState, this), 0);
          var a = new kt(
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
    gt.addInitHook("addHandler", "boxZoom", lf), gt.mergeOptions({
      // @option doubleClickZoom: Boolean|String = true
      // Whether the map can be zoomed in by double clicking on it and
      // zoomed out by double clicking while holding shift. If passed
      // `'center'`, double-click zoom will zoom to the center of the
      //  view regardless of where the mouse was.
      doubleClickZoom: !0
    });
    var uf = on.extend({
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
    gt.addInitHook("addHandler", "doubleClickZoom", uf), gt.mergeOptions({
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
    var cf = on.extend({
      addHooks: function() {
        if (!this._draggable) {
          var s = this._map;
          this._draggable = new Fn(s._mapPane, s._container), this._draggable.on({
            dragstart: this._onDragStart,
            drag: this._onDrag,
            dragend: this._onDragEnd
          }, this), this._draggable.on("predrag", this._onPreDragLimit, this), s.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), s.on("zoomend", this._onZoomEnd, this), s.whenReady(this._onZoomEnd, this));
        }
        rt(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = [];
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
          var a = lt(this._map.options.maxBounds);
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
        var s = this._worldWidth, a = Math.round(s / 2), h = this._initialWorldOffset, f = this._draggable._newPos.x, m = (f - a + h) % s + a - h, v = (f + a + h) % s - a - h, M = Math.abs(m + h) < Math.abs(v + h) ? m : v;
        this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = M;
      },
      _onDragEnd: function(s) {
        var a = this._map, h = a.options, f = !h.inertia || s.noInertia || this._times.length < 2;
        if (a.fire("dragend", s), f)
          a.fire("moveend");
        else {
          this._prunePositions(+/* @__PURE__ */ new Date());
          var m = this._lastPos.subtract(this._positions[0]), v = (this._lastTime - this._times[0]) / 1e3, M = h.easeLinearity, z = m.multiplyBy(M / v), O = z.distanceTo([0, 0]), R = Math.min(h.inertiaMaxSpeed, O), V = z.multiplyBy(R / O), Q = R / (h.inertiaDeceleration * M), ct = V.multiplyBy(-Q / 2).round();
          !ct.x && !ct.y ? a.fire("moveend") : (ct = a._limitOffset(ct, a.options.maxBounds), W(function() {
            a.panBy(ct, {
              duration: Q,
              easeLinearity: M,
              noMoveStart: !0,
              animate: !0
            });
          }));
        }
      }
    });
    gt.addInitHook("addHandler", "dragging", cf), gt.mergeOptions({
      // @option keyboard: Boolean = true
      // Makes the map focusable and allows users to navigate the map with keyboard
      // arrows and `+`/`-` keys.
      keyboard: !0,
      // @option keyboardPanDelta: Number = 80
      // Amount of pixels to pan when pressing an arrow key.
      keyboardPanDelta: 80
    });
    var hf = on.extend({
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
              if (f = this._panKeys[a], s.shiftKey && (f = j(f).multiplyBy(3)), h.options.maxBounds && (f = h._limitOffset(j(f), h.options.maxBounds)), h.options.worldCopyJump) {
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
          wi(s);
        }
      }
    });
    gt.addInitHook("addHandler", "keyboard", hf), gt.mergeOptions({
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
    var df = on.extend({
      addHooks: function() {
        et(this._map._container, "wheel", this._onWheelScroll, this), this._delta = 0;
      },
      removeHooks: function() {
        Pt(this._map._container, "wheel", this._onWheelScroll, this);
      },
      _onWheelScroll: function(s) {
        var a = Id(s), h = this._map.options.wheelDebounceTime;
        this._delta += a, this._lastMousePos = this._map.mouseEventToContainerPoint(s), this._startTime || (this._startTime = +/* @__PURE__ */ new Date());
        var f = Math.max(h - (+/* @__PURE__ */ new Date() - this._startTime), 0);
        clearTimeout(this._timer), this._timer = setTimeout(l(this._performZoom, this), f), wi(s);
      },
      _performZoom: function() {
        var s = this._map, a = s.getZoom(), h = this._map.options.zoomSnap || 0;
        s._stop();
        var f = this._delta / (this._map.options.wheelPxPerZoomLevel * 4), m = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(f)))) / Math.LN2, v = h ? Math.ceil(m / h) * h : m, M = s._limitZoom(a + (this._delta > 0 ? v : -v)) - a;
        this._delta = 0, this._startTime = null, M && (s.options.scrollWheelZoom === "center" ? s.setZoom(a + M) : s.setZoomAround(this._lastMousePos, a + M));
      }
    });
    gt.addInitHook("addHandler", "scrollWheelZoom", df);
    var N0 = 600;
    gt.mergeOptions({
      // @section Touch interaction options
      // @option tapHold: Boolean
      // Enables simulation of `contextmenu` event, default is `true` for mobile Safari.
      tapHold: K.touchNative && K.safari && K.mobile,
      // @option tapTolerance: Number = 15
      // The max number of pixels a user can shift his finger during touch
      // for it to be considered a valid tap.
      tapTolerance: 15
    });
    var ff = on.extend({
      addHooks: function() {
        et(this._map._container, "touchstart", this._onDown, this);
      },
      removeHooks: function() {
        Pt(this._map._container, "touchstart", this._onDown, this);
      },
      _onDown: function(s) {
        if (clearTimeout(this._holdTimeout), s.touches.length === 1) {
          var a = s.touches[0];
          this._startPos = this._newPos = new D(a.clientX, a.clientY), this._holdTimeout = setTimeout(l(function() {
            this._cancel(), this._isTapValid() && (et(document, "touchend", Qt), et(document, "touchend touchcancel", this._cancelClickPrevent), this._simulateEvent("contextmenu", a));
          }, this), N0), et(document, "touchend touchcancel contextmenu", this._cancel, this), et(document, "touchmove", this._onMove, this);
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
        this._newPos = new D(a.clientX, a.clientY);
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
    gt.addInitHook("addHandler", "tapHold", ff), gt.mergeOptions({
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
    var pf = on.extend({
      addHooks: function() {
        rt(this._map._container, "leaflet-touch-zoom"), et(this._map._container, "touchstart", this._onTouchStart, this);
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
            var v = h._add(f)._divideBy(2)._subtract(this._centerPoint);
            if (m === 1 && v.x === 0 && v.y === 0)
              return;
            this._center = a.unproject(a.project(this._pinchStartLatLng, this._zoom).subtract(v), this._zoom);
          }
          this._moved || (a._moveStart(!0, !1), this._moved = !0), U(this._animRequest);
          var M = l(a._move, a, this._center, this._zoom, { pinch: !0, round: !1 }, void 0);
          this._animRequest = W(M, this, !0), Qt(s);
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
    gt.addInitHook("addHandler", "touchZoom", pf), gt.BoxZoom = lf, gt.DoubleClickZoom = uf, gt.Drag = cf, gt.Keyboard = hf, gt.ScrollWheelZoom = df, gt.TapHold = ff, gt.TouchZoom = pf, n.Bounds = X, n.Browser = K, n.CRS = qt, n.Canvas = sf, n.Circle = tu, n.CircleMarker = bo, n.Class = it, n.Control = $e, n.DivIcon = tf, n.DivOverlay = an, n.DomEvent = qy, n.DomUtil = Xy, n.Draggable = Fn, n.Evented = dt, n.FeatureGroup = _n, n.GeoJSON = yn, n.GridLayer = Qs, n.Handler = on, n.Icon = Qi, n.ImageOverlay = Co, n.LatLng = st, n.LatLngBounds = kt, n.Layer = Ye, n.LayerGroup = qi, n.LineUtil = c0, n.Map = gt, n.Marker = wo, n.Mixin = s0, n.Path = Hn, n.Point = D, n.PolyUtil = r0, n.Polygon = Ji, n.Polyline = vn, n.Popup = Lo, n.PosAnimation = Dd, n.Projection = h0, n.Rectangle = af, n.Renderer = xn, n.SVG = tr, n.SVGOverlay = Jd, n.TileLayer = es, n.Tooltip = To, n.Transformation = Hs, n.Util = vt, n.VideoOverlay = Qd, n.bind = l, n.bounds = tt, n.canvas = rf, n.circle = y0, n.circleMarker = v0, n.control = Xs, n.divIcon = L0, n.extend = r, n.featureGroup = m0, n.geoJSON = qd, n.geoJson = b0, n.gridLayer = T0, n.icon = g0, n.imageOverlay = k0, n.latLng = q, n.latLngBounds = lt, n.layerGroup = p0, n.map = Qy, n.marker = _0, n.point = j, n.polygon = w0, n.polyline = x0, n.popup = M0, n.rectangle = O0, n.setOptions = b, n.stamp = c, n.svg = of, n.svgOverlay = P0, n.tileLayer = ef, n.tooltip = C0, n.transformation = ut, n.version = i, n.videoOverlay = S0;
    var A0 = window.L;
    n.noConflict = function() {
      return window.L = A0, this;
    }, window.L = n;
  });
})(Qc, Qc.exports);
var mM = Qc.exports;
const la = /* @__PURE__ */ ig(mM), Gm = "".trim().replace(/\/$/, ""), Ot = (e) => Gm ? `${Gm}${e}` : e, ld = "wildlife_admin_token", ue = {
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
function ud(e, t = "") {
  const n = String(e || "").trim() || String(t || "").trim();
  return n ? /^https?:\/\//i.test(n) ? n : n.startsWith("//") ? `https:${n}` : n.startsWith("/") ? Ot(n) : n.startsWith("www.") ? `https://${n}` : /^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(n) ? `https://${n}` : "#" : "#";
}
async function Vn(e) {
  const t = cd(), n = t ? { Authorization: `Bearer ${t}` } : {}, i = await fetch(e, { cache: "no-store", credentials: "same-origin", headers: n });
  if (!i.ok) {
    let r = "";
    try {
      const l = await i.json();
      r = String((l == null ? void 0 : l.detail) || "").trim();
    } catch {
      r = "";
    }
    const o = new Error(r || `HTTP ${i.status}`);
    throw o.status = i.status, o;
  }
  return i.json();
}
async function qm(e, t, { includeAuth: n = !0 } = {}) {
  const i = n ? cd() : "", r = { "Content-Type": "application/json" };
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
function cd() {
  return String(localStorage.getItem(ld) || "").trim();
}
function gM(e) {
  const t = String(e || "").trim();
  t && localStorage.setItem(ld, t);
}
function _M() {
  localStorage.removeItem(ld);
}
function Qm(e) {
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
        i.current || (i.current = la.map(n.current, { zoomControl: !0, attributionControl: !0 }).setView(
          [((u = e.center) == null ? void 0 : u.lat) || 22.97, ((c = e.center) == null ? void 0 : c.lng) || 78.65],
          5
        ), la.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 12,
          attribution: "&copy; OpenStreetMap contributors"
        }).addTo(i.current), r.current = la.layerGroup().addTo(i.current));
        const d = r.current;
        if (!d) return;
        d.clearLayers(), (e.markers || []).slice(0, 600).forEach((p) => {
          if (typeof p.lat != "number" || typeof p.lng != "number") return;
          const g = gy(p.risk_score), _ = g === "high" ? "#C75050" : g === "medium" ? "#C9933D" : "#5A9E6F", x = la.circleMarker([p.lat, p.lng], {
            radius: g === "high" ? 8 : g === "medium" ? 7 : 6,
            color: _,
            fillColor: _,
            fillOpacity: 0.8,
            weight: 2
          }), S = (p.title || "Incident").replace(/</g, "&lt;"), b = ud(p.open_url, p.url).replace(/"/g, "&quot;");
          x.bindPopup(
            `<div style="min-width:240px;font-family:Inter,sans-serif">
            <b style="font-size:14px;color:#1A1917">${S}</b>
            <div style="margin-top:6px;color:#6B6966;font-size:12px">${p.state || "-"} · ${p.district || "-"}</div>
            <div style="margin-top:8px;font-size:13px;color:#1A1917">Risk <b style="color:${_}">${Number(p.risk_score || 0)}</b> · ${p.species || "—"}</div>
            <a href="${b}" target="_blank" rel="noopener" style="display:inline-block;margin-top:10px;color:#C17F59;font-weight:500">Open article →</a>
          </div>`
          ), x.addTo(d);
        });
      } catch (d) {
        console.error("Map rendering failed:", d), t == null || t("Map failed to render on this browser. Use legacy view as fallback.");
      }
  }, [e, t]);
  const o = ((l = e == null ? void 0 : e.markers) == null ? void 0 : l.length) || 0;
  return /* @__PURE__ */ y.jsxs("article", { className: "card map-card", id: "section-map", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ y.jsx(dy, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ y.jsx("h2", { children: "National Threat Map" })
      ] }),
      /* @__PURE__ */ y.jsxs("span", { className: "card-count mono", children: [
        o,
        " markers"
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("div", { className: "card-body-flush", style: { position: "relative", minHeight: 460 }, children: /* @__PURE__ */ y.jsx("div", { className: "map-surface", ref: n }) }),
    /* @__PURE__ */ y.jsxs("div", { className: "map-legend", children: [
      /* @__PURE__ */ y.jsx("span", { className: "legend-dot high", children: "High risk" }),
      /* @__PURE__ */ y.jsx("span", { className: "legend-dot medium", children: "Medium" }),
      /* @__PURE__ */ y.jsx("span", { className: "legend-dot low", children: "Low" }),
      /* @__PURE__ */ y.jsx("span", { style: { marginLeft: "auto", color: "var(--dim)" }, children: "Tap a marker for details" })
    ] })
  ] });
}
const _y = "label";
function Jm(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
function yM(e, t) {
  const n = e.options;
  n && t && Object.assign(n, t);
}
function vy(e, t) {
  e.labels = t;
}
function yy(e, t, n = _y) {
  const i = [];
  e.datasets = t.map((r) => {
    const o = e.datasets.find((l) => l[n] === r[n]);
    return !o || !r.data || i.includes(o) ? {
      ...r
    } : (i.push(o), Object.assign(o, r), o);
  });
}
function xM(e, t = _y) {
  const n = {
    labels: [],
    datasets: []
  };
  return vy(n, e.labels), yy(n, e.datasets, t), n;
}
function wM(e, t) {
  const { height: n = 150, width: i = 300, redraw: r = !1, datasetIdKey: o, type: l, data: u, options: c, plugins: d = [], fallbackContent: p, updateMode: g, ..._ } = e, x = G.useRef(null), S = G.useRef(null), b = () => {
    x.current && (S.current = new Cl(x.current, {
      type: l,
      data: xM(u, o),
      options: c && {
        ...c
      },
      plugins: d
    }), Jm(t, S.current));
  }, C = () => {
    Jm(t, null), S.current && (S.current.destroy(), S.current = null);
  };
  return G.useEffect(() => {
    !r && S.current && c && yM(S.current, c);
  }, [
    r,
    c
  ]), G.useEffect(() => {
    !r && S.current && vy(S.current.config.data, u.labels);
  }, [
    r,
    u.labels
  ]), G.useEffect(() => {
    !r && S.current && u.datasets && yy(S.current.config.data, u.datasets, o);
  }, [
    r,
    u.datasets
  ]), G.useEffect(() => {
    S.current && (r ? (C(), setTimeout(b)) : S.current.update(g));
  }, [
    r,
    c,
    u.labels,
    u.datasets,
    g
  ]), G.useEffect(() => {
    S.current && (C(), setTimeout(b));
  }, [
    l
  ]), G.useEffect(() => (b(), () => C()), []), /* @__PURE__ */ y.jsx("canvas", {
    ref: x,
    role: "img",
    height: n,
    width: i,
    ..._,
    children: p
  });
}
const bM = /* @__PURE__ */ G.forwardRef(wM);
function hd(e, t) {
  return Cl.register(t), /* @__PURE__ */ G.forwardRef((n, i) => /* @__PURE__ */ y.jsx(bM, {
    ...n,
    ref: i,
    type: e
  }));
}
const kM = /* @__PURE__ */ hd("line", ka), tg = /* @__PURE__ */ hd("bar", ba), SM = /* @__PURE__ */ hd("doughnut", yr), Jc = "#6B6966", eg = "rgba(26, 25, 23, 0.06)", xy = "#6B6966", os = {
  responsive: !0,
  maintainAspectRatio: !1,
  interaction: { mode: "index", intersect: !1 },
  plugins: {
    legend: {
      labels: {
        color: xy,
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
      ticks: { color: Jc, font: { family: "Inter, sans-serif", size: 10 } },
      grid: { color: eg, drawBorder: !1 },
      border: { display: !1 }
    },
    y: {
      ticks: { color: Jc, font: { family: "JetBrains Mono, monospace", size: 10 } },
      grid: { color: eg, drawBorder: !1 },
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
        color: xy,
        font: { family: "Inter, sans-serif", size: 11 },
        usePointStyle: !0,
        boxWidth: 8,
        padding: 10
      }
    },
    tooltip: os.plugins.tooltip
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
    ...os,
    indexAxis: "y",
    scales: {
      ...os.scales,
      y: {
        ...os.scales.y,
        ticks: { color: Jc, font: { family: "Inter, sans-serif", size: 10 } }
      }
    }
  };
  return /* @__PURE__ */ y.jsxs("div", { className: "charts-grid", id: "section-analytics", children: [
    /* @__PURE__ */ y.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ y.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ y.jsx(uy, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ y.jsx("h2", { children: "Incident Timeline" })
        ] }),
        /* @__PURE__ */ y.jsx("span", { className: "badge", children: t.granularity || "daily" })
      ] }),
      /* @__PURE__ */ y.jsx("div", { className: "card-body", children: /* @__PURE__ */ y.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ y.jsx(kM, { data: o, options: os }) }) })
    ] }),
    /* @__PURE__ */ y.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ y.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ y.jsx(cy, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ y.jsx("h2", { children: "Top States" })
        ] }),
        /* @__PURE__ */ y.jsx("span", { className: "card-count mono", children: n.length })
      ] }),
      /* @__PURE__ */ y.jsx("div", { className: "card-body", children: /* @__PURE__ */ y.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ y.jsx(tg, { data: l, options: os }) }) })
    ] }),
    /* @__PURE__ */ y.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ y.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ y.jsx(uP, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ y.jsx("h2", { children: "Species Distribution" })
        ] }),
        /* @__PURE__ */ y.jsx("span", { className: "card-count mono", children: i.length })
      ] }),
      /* @__PURE__ */ y.jsx("div", { className: "card-body", children: /* @__PURE__ */ y.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ y.jsx(SM, { data: c, options: PM }) }) })
    ] }),
    /* @__PURE__ */ y.jsxs("article", { className: "card chart-card", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "card-head", children: [
        /* @__PURE__ */ y.jsxs("div", { className: "card-head-left", children: [
          /* @__PURE__ */ y.jsx(py, { size: 16, className: "card-head-icon" }),
          /* @__PURE__ */ y.jsx("h2", { children: "Source Reliability" })
        ] }),
        /* @__PURE__ */ y.jsx("span", { className: "card-count mono", children: r.length })
      ] }),
      /* @__PURE__ */ y.jsx("div", { className: "card-body", children: /* @__PURE__ */ y.jsx("div", { className: "chart-wrap", children: /* @__PURE__ */ y.jsx(tg, { data: d, options: p }) }) })
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
  return /* @__PURE__ */ y.jsxs("article", { className: "card filters-card", id: "section-incidents", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ y.jsx(Xm, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ y.jsx("h2", { children: "Analyst Filters" }),
        o > 0 ? /* @__PURE__ */ y.jsxs("span", { className: "badge", children: [
          o,
          " active"
        ] }) : null
      ] }),
      /* @__PURE__ */ y.jsxs("button", { type: "button", className: "btn btn-ghost", onClick: u, children: [
        /* @__PURE__ */ y.jsx(UP, { size: 14 }),
        /* @__PURE__ */ y.jsx("span", { className: "btn-label", children: "Reset" })
      ] })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "filter-grid", children: [
        /* @__PURE__ */ y.jsxs("div", { className: "filter-field", style: { gridColumn: "span 2" }, children: [
          /* @__PURE__ */ y.jsx("label", { className: "filter-label", htmlFor: "f-search", children: "Search" }),
          /* @__PURE__ */ y.jsxs("div", { className: "input-with-icon", children: [
            /* @__PURE__ */ y.jsx(GP, { size: 14, className: "icon" }),
            /* @__PURE__ */ y.jsx(
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
        /* @__PURE__ */ y.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ y.jsx("label", { className: "filter-label", htmlFor: "f-species", children: "Species" }),
          /* @__PURE__ */ y.jsxs(
            "select",
            {
              id: "f-species",
              className: "select",
              value: e.species,
              onChange: (c) => l("species", c.target.value),
              children: [
                /* @__PURE__ */ y.jsx("option", { value: "", children: "All species" }),
                (t.species || []).map((c) => /* @__PURE__ */ y.jsx("option", { value: c, children: c }, c))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ y.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ y.jsx("label", { className: "filter-label", htmlFor: "f-state", children: "State" }),
          /* @__PURE__ */ y.jsxs(
            "select",
            {
              id: "f-state",
              className: "select",
              value: e.state,
              onChange: (c) => l("state", c.target.value),
              children: [
                /* @__PURE__ */ y.jsx("option", { value: "", children: "All states" }),
                (t.states || []).map((c) => /* @__PURE__ */ y.jsx("option", { value: c, children: c }, c))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ y.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ y.jsx("label", { className: "filter-label", htmlFor: "f-crime", children: "Crime type" }),
          /* @__PURE__ */ y.jsxs(
            "select",
            {
              id: "f-crime",
              className: "select",
              value: e.crime_type,
              onChange: (c) => l("crime_type", c.target.value),
              children: [
                /* @__PURE__ */ y.jsx("option", { value: "", children: "All types" }),
                (t.crime_types || []).map((c) => /* @__PURE__ */ y.jsx("option", { value: c, children: c }, c))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ y.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ y.jsx("label", { className: "filter-label", htmlFor: "f-source", children: "Source" }),
          /* @__PURE__ */ y.jsxs(
            "select",
            {
              id: "f-source",
              className: "select",
              value: e.source,
              onChange: (c) => l("source", c.target.value),
              children: [
                /* @__PURE__ */ y.jsx("option", { value: "", children: "All sources" }),
                (t.sources || []).map((c) => /* @__PURE__ */ y.jsx("option", { value: c, children: c }, c))
              ]
            }
          )
        ] }),
        /* @__PURE__ */ y.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ y.jsx("label", { className: "filter-label", htmlFor: "f-severity", children: "Severity" }),
          /* @__PURE__ */ y.jsxs(
            "select",
            {
              id: "f-severity",
              className: "select",
              value: e.severity,
              onChange: (c) => l("severity", c.target.value),
              children: [
                /* @__PURE__ */ y.jsx("option", { value: "", children: "All severity" }),
                /* @__PURE__ */ y.jsx("option", { value: "high", children: "High" }),
                /* @__PURE__ */ y.jsx("option", { value: "medium", children: "Medium" }),
                /* @__PURE__ */ y.jsx("option", { value: "low", children: "Low" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ y.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ y.jsx("label", { className: "filter-label", htmlFor: "f-from", children: "Date from" }),
          /* @__PURE__ */ y.jsx(
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
        /* @__PURE__ */ y.jsxs("div", { className: "filter-field", children: [
          /* @__PURE__ */ y.jsx("label", { className: "filter-label", htmlFor: "f-to", children: "Date to" }),
          /* @__PURE__ */ y.jsx(
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
      /* @__PURE__ */ y.jsxs("div", { className: "filter-actions", children: [
        /* @__PURE__ */ y.jsx("div", { className: "filter-actions-left", children: o > 0 ? `${o} filter${o === 1 ? "" : "s"} applied` : "No filters applied" }),
        /* @__PURE__ */ y.jsxs("div", { className: "filter-actions-right", children: [
          /* @__PURE__ */ y.jsxs("button", { type: "button", className: "btn", onClick: r, children: [
            /* @__PURE__ */ y.jsx(oP, { size: 14 }),
            /* @__PURE__ */ y.jsx("span", { children: "Briefing Pack" })
          ] }),
          /* @__PURE__ */ y.jsxs("button", { type: "button", className: "btn btn-primary", onClick: i, children: [
            /* @__PURE__ */ y.jsx(Xm, { size: 14 }),
            /* @__PURE__ */ y.jsx("span", { children: "Apply Filters" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function TM({ rows: e, loading: t }) {
  return /* @__PURE__ */ y.jsxs("article", { className: "card table-card", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ y.jsx(my, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ y.jsx("h2", { children: "Incident Intelligence" })
      ] }),
      /* @__PURE__ */ y.jsxs("span", { className: "card-count mono", children: [
        e.length,
        " rows"
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("div", { className: "card-body-flush", style: { maxHeight: "600px", overflowY: "auto" }, children: /* @__PURE__ */ y.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ y.jsxs("table", { className: "data-table", children: [
      /* @__PURE__ */ y.jsx("thead", { children: /* @__PURE__ */ y.jsxs("tr", { children: [
        /* @__PURE__ */ y.jsx("th", { children: "Date" }),
        /* @__PURE__ */ y.jsx("th", { children: "Risk" }),
        /* @__PURE__ */ y.jsx("th", { children: "Title" }),
        /* @__PURE__ */ y.jsx("th", { children: "Species" }),
        /* @__PURE__ */ y.jsx("th", { children: "State" }),
        /* @__PURE__ */ y.jsx("th", { children: "District" }),
        /* @__PURE__ */ y.jsx("th", { children: "Involved persons" }),
        /* @__PURE__ */ y.jsx("th", { children: "Crime type" }),
        /* @__PURE__ */ y.jsx("th", { children: "Source" }),
        /* @__PURE__ */ y.jsx("th", { children: "Conf." }),
        /* @__PURE__ */ y.jsx("th", { children: "Link" })
      ] }) }),
      /* @__PURE__ */ y.jsxs("tbody", { children: [
        e.map((n) => {
          const i = gy(n.risk_score);
          return /* @__PURE__ */ y.jsxs("tr", { children: [
            /* @__PURE__ */ y.jsx("td", { className: "cell-mono", children: aM(n.date) }),
            /* @__PURE__ */ y.jsx("td", { children: /* @__PURE__ */ y.jsx("span", { className: `risk-pill ${i}`, children: n.risk_score }) }),
            /* @__PURE__ */ y.jsx("td", { className: "cell-title", children: n.title }),
            /* @__PURE__ */ y.jsx("td", { className: "cell-muted", children: n.species || "—" }),
            /* @__PURE__ */ y.jsx("td", { className: "cell-muted", children: n.state || "—" }),
            /* @__PURE__ */ y.jsx("td", { className: "cell-muted", children: n.district || "—" }),
            /* @__PURE__ */ y.jsx("td", { className: "cell-muted", children: n.involved_persons || "—" }),
            /* @__PURE__ */ y.jsx("td", { className: "cell-muted", children: n.crime_type || "—" }),
            /* @__PURE__ */ y.jsx("td", { className: "cell-muted", children: n.source || "—" }),
            /* @__PURE__ */ y.jsx("td", { className: "cell-mono", children: Number(n.confidence || 0).toFixed(2) }),
            /* @__PURE__ */ y.jsx("td", { children: /* @__PURE__ */ y.jsxs(
              "a",
              {
                href: ud(n.open_url, n.url),
                target: "_blank",
                rel: "noopener noreferrer",
                className: "feed-link",
                "aria-label": "Open source article",
                children: [
                  "Open ",
                  /* @__PURE__ */ y.jsx(hy, { size: 12 })
                ]
              }
            ) })
          ] }, n.id);
        }),
        !e.length && !t ? /* @__PURE__ */ y.jsx("tr", { children: /* @__PURE__ */ y.jsxs("td", { colSpan: 11, className: "empty-cell", children: [
          /* @__PURE__ */ y.jsx("div", { className: "empty-cell-icon", children: /* @__PURE__ */ y.jsx(KP, { size: 20 }) }),
          "No incidents match the current filters."
        ] }) }) : null
      ] })
    ] }) }) })
  ] });
}
function EM({ items: e }) {
  return /* @__PURE__ */ y.jsxs("article", { className: "card", id: "section-osint", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ y.jsx(fy, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ y.jsx("h2", { children: "OSINT Signal Feed" })
      ] }),
      /* @__PURE__ */ y.jsxs("span", { className: "card-count mono", children: [
        e.length,
        " signals"
      ] })
    ] }),
    /* @__PURE__ */ y.jsx("div", { className: "card-body-flush", children: e.length === 0 ? /* @__PURE__ */ y.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ y.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ y.jsx(PP, { size: 20 }) }),
      /* @__PURE__ */ y.jsx("div", { children: "No OSINT signals yet" })
    ] }) : /* @__PURE__ */ y.jsx("div", { className: "feed", children: e.slice(0, 16).map((t) => {
      const n = Number(t.signal_strength || 0);
      return /* @__PURE__ */ y.jsxs("div", { className: "feed-row", children: [
        /* @__PURE__ */ y.jsxs("div", { className: "feed-row-head", children: [
          /* @__PURE__ */ y.jsx("div", { className: "feed-title", children: t.title }),
          /* @__PURE__ */ y.jsx("span", { className: "badge mono", children: n.toFixed(2) })
        ] }),
        /* @__PURE__ */ y.jsxs("div", { className: "feed-meta", children: [
          /* @__PURE__ */ y.jsx("span", { children: t.source_type || "source" }),
          /* @__PURE__ */ y.jsx("span", { className: "dot" }),
          /* @__PURE__ */ y.jsx("span", { children: "Signal strength" })
        ] }),
        /* @__PURE__ */ y.jsxs(
          "a",
          {
            href: ud(t.open_url, t.url),
            target: "_blank",
            rel: "noopener noreferrer",
            className: "feed-link",
            children: [
              "Open source ",
              /* @__PURE__ */ y.jsx(hy, { size: 12 })
            ]
          }
        )
      ] }, t.id);
    }) }) })
  ] });
}
function zM({ items: e }) {
  return /* @__PURE__ */ y.jsxs("article", { className: "card", id: "section-reco", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "card-head", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "card-head-left", children: [
        /* @__PURE__ */ y.jsx(qc, { size: 16, className: "card-head-icon" }),
        /* @__PURE__ */ y.jsx("h2", { children: "Top Recommendations" })
      ] }),
      /* @__PURE__ */ y.jsx("span", { className: "card-count mono", children: e.length })
    ] }),
    /* @__PURE__ */ y.jsx("div", { className: "card-body-flush", children: e.length === 0 ? /* @__PURE__ */ y.jsxs("div", { className: "empty-state", children: [
      /* @__PURE__ */ y.jsx("div", { className: "empty-state-icon", children: /* @__PURE__ */ y.jsx(qc, { size: 20 }) }),
      /* @__PURE__ */ y.jsx("div", { children: "No recommendations generated yet" })
    ] }) : /* @__PURE__ */ y.jsx("div", { className: "feed", children: e.map(([t, n]) => /* @__PURE__ */ y.jsxs("div", { className: "reco-row", children: [
      /* @__PURE__ */ y.jsx("span", { children: t }),
      /* @__PURE__ */ y.jsx("span", { className: "reco-count", children: n })
    ] }, t)) }) })
  ] });
}
Cl.register(Xc, Gc, Ma, ti, wr, Ca, V2, I2, T2);
const OM = 15e3, NM = {
  q: "",
  species: "",
  state: "",
  date_from: "",
  date_to: "",
  crime_type: "",
  severity: "",
  source: ""
}, ng = !1;
(/* @__PURE__ */ new Date()).toISOString();
function AM() {
  const [e, t] = G.useState(!0), [n, i] = G.useState(""), [r, o] = G.useState(!1), [l, u] = G.useState(() => cd()), [c, d] = G.useState(""), [p, g] = G.useState(!1), [_, x] = G.useState({ username: "", password: "" }), [S, b] = G.useState(null), [C, w] = G.useState(null), [k, P] = G.useState(null), [T, E] = G.useState([]), [N, A] = G.useState([]), [I, H] = G.useState([]), [B, W] = G.useState(null), [U, vt] = G.useState([]), [it, ht] = G.useState(NM), [J, dt] = G.useState("overview"), [D, $] = G.useState(!1), j = G.useCallback((ut = "Please log in to continue.") => {
    _M(), u(""), d(ut), i(""), o(!1), t(!1);
  }, []), X = G.useCallback(async () => {
    if (!l || ng) return;
    o(!0);
    const ut = await Promise.allSettled([
      Vn(ue.summary),
      Vn(ue.chart),
      Vn(ue.map),
      Vn(ue.alerts),
      Vn(ue.reports),
      Vn(ue.osint),
      Vn(ue.syncStatus)
    ]);
    if (ut.some(
      (pe) => {
        var Bn;
        return pe.status === "rejected" && Number((Bn = pe.reason) == null ? void 0 : Bn.status) === 401;
      }
    )) {
      j("Session expired. Please sign in again.");
      return;
    }
    const [at, Ne, nn, Ue, Se, Rn, jn] = ut;
    at.status === "fulfilled" && b(at.value), Ne.status === "fulfilled" && w(Ne.value), nn.status === "fulfilled" && P(nn.value), Ue.status === "fulfilled" && E(Array.isArray(Ue.value) ? Ue.value : []), Se.status === "fulfilled" && H(Array.isArray(Se.value) ? Se.value : []), Rn.status === "fulfilled" && A(Array.isArray(Rn.value) ? Rn.value : []), jn.status === "fulfilled" && W(jn.value), ut.every((pe) => pe.status === "rejected") ? i("Unable to load dashboard data right now.") : i(""), t(!1), o(!1);
  }, [l, j]), tt = G.useCallback(async () => {
    if (!l || ng) return;
    const ut = Qm({ ...it, min_confidence: 0, limit: 120 });
    try {
      const nt = await Vn(`${ue.filterNews}?${ut}`);
      vt(Array.isArray(nt.items) ? nt.items : []);
    } catch (nt) {
      Number(nt == null ? void 0 : nt.status) === 401 && j("Session expired. Please sign in again.");
    }
  }, [l, it, j]);
  G.useEffect(() => {
    if (!l) {
      t(!1);
      return;
    }
    t(!0), X(), tt().catch(() => {
    });
    const ut = window.setInterval(() => {
      X(), tt().catch(() => {
      });
    }, OM);
    return () => window.clearInterval(ut);
  }, [l, X, tt]), G.useEffect(() => {
    const ut = ["overview", "map", "alerts", "analytics", "incidents", "osint", "reco"], nt = [];
    return ut.forEach((at) => {
      const Ne = document.getElementById(`section-${at}`);
      if (!Ne) return;
      const nn = new IntersectionObserver(
        (Ue) => {
          Ue.forEach((Se) => {
            Se.isIntersecting && dt(at);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      nn.observe(Ne), nt.push(nn);
    }), () => nt.forEach((at) => at.disconnect());
  }, [e]);
  const kt = G.useMemo(() => {
    const ut = /* @__PURE__ */ new Map();
    return I.forEach((nt) => {
      const at = (nt.recommendation || "").trim();
      at && ut.set(at, (ut.get(at) || 0) + 1);
    }), [...ut.entries()].sort((nt, at) => at[1] - nt[1]).slice(0, 8);
  }, [I]), lt = (C == null ? void 0 : C.filters) || { states: [], species: [], crime_types: [], sources: [] }, st = (S == null ? void 0 : S.last_sync_time) || (B == null ? void 0 : B.finished_at), q = G.useCallback((ut, { last: nt = !1 } = {}) => {
    const at = ut || {}, Ne = typeof at.stage == "string" && at.stage !== "-" ? at.stage : "", nn = typeof at.provider == "string" && at.provider !== "-" ? at.provider : "", Ue = typeof at.language == "string" && at.language !== "-" ? at.language : "", Se = typeof at.query == "string" && at.query !== "-" ? at.query : "", Rn = Number.isFinite(Number(at.scanned)) ? Number(at.scanned) : null, jn = Number.isFinite(Number(at.kept)) ? Number(at.kept) : null, pe = [];
    Ne && pe.push(`stage: ${nt ? `last ${Ne}` : Ne}`);
    const Bn = [nn, Ue].filter(Boolean).join(" / ");
    return Bn && pe.push(`source: ${Bn}`), Se && pe.push(`query: ${Se}`), Rn !== null && jn !== null && pe.push(`scanned ${Rn}, kept ${jn}`), pe.join(" • ");
  }, []), qt = G.useMemo(() => B != null && B.running ? q(B == null ? void 0 : B.progress, { last: !1 }) : "", [B, q]);
  function Ze(ut) {
    if (!l) return;
    const nt = Qm({ ...it, min_confidence: 0, admin_token: l }), at = ut === "pdf" ? ue.exportPdf : ut === "excel" ? ue.exportExcel : ut === "excel_incidents_reports" ? ue.exportExcelIncidentsReports : ut === "briefing" ? ue.exportBriefing : ue.exportCsv;
    window.location.href = nt ? `${at}?${nt}` : at;
  }
  async function fo(ut) {
    ut.preventDefault(), g(!0), d("");
    try {
      const nt = await qm(
        ue.adminLogin,
        { username: _.username.trim(), password: _.password },
        { includeAuth: !1 }
      ), at = String((nt == null ? void 0 : nt.access_token) || "").trim();
      if (!at) {
        d("Login failed. Missing access token.");
        return;
      }
      gM(at), u(at), x({ username: "", password: "" }), t(!0);
    } catch (nt) {
      Number(nt == null ? void 0 : nt.status) === 401 ? d("Invalid username or password.") : Number(nt == null ? void 0 : nt.status) === 429 ? d("Too many login attempts. Try again in a minute.") : d(String((nt == null ? void 0 : nt.message) || "Unable to login right now."));
    } finally {
      g(!1);
    }
  }
  async function Fs() {
    try {
      await qm(ue.adminLogout, {}, { includeAuth: !0 });
    } catch {
    }
    j("Signed out.");
  }
  function Hs(ut) {
    dt(ut), $(!1);
  }
  return l ? /* @__PURE__ */ y.jsxs("div", { className: "app", children: [
    /* @__PURE__ */ y.jsx(
      cM,
      {
        activeSection: J,
        onSelect: Hs,
        isOpen: D,
        syncStatus: B,
        lastSync: st
      }
    ),
    /* @__PURE__ */ y.jsx(
      "div",
      {
        className: `scrim ${D ? "is-visible" : ""}`,
        onClick: () => $(!1),
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ y.jsxs("div", { className: "main", children: [
      /* @__PURE__ */ y.jsx(
        hM,
        {
          activeSection: J,
          busy: r,
          syncStatus: B,
          onRefresh: X,
          onExport: Ze,
          onToggleMenu: () => $((ut) => !ut),
          onLogout: Fs
        }
      ),
      /* @__PURE__ */ y.jsxs("div", { className: "content", children: [
        n ? /* @__PURE__ */ y.jsxs("div", { className: "status error", role: "alert", children: [
          /* @__PURE__ */ y.jsx(Ym, { size: 16 }),
          /* @__PURE__ */ y.jsx("span", { children: n })
        ] }) : null,
        B != null && B.running ? /* @__PURE__ */ y.jsxs("div", { className: "status info", role: "status", children: [
          /* @__PURE__ */ y.jsx(uy, { size: 16 }),
          /* @__PURE__ */ y.jsxs("span", { children: [
            B.message || "Search in progress...",
            qt ? ` - ${qt}` : ""
          ] })
        ] }) : null,
        /* @__PURE__ */ y.jsxs("section", { className: "dashboard-section", id: "section-overview", children: [
          /* @__PURE__ */ y.jsx("div", { className: "section-header", children: /* @__PURE__ */ y.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ y.jsx("span", { className: "section-number", children: "01" }),
            /* @__PURE__ */ y.jsxs("div", { children: [
              /* @__PURE__ */ y.jsx("h2", { children: "National Overview" }),
              /* @__PURE__ */ y.jsx("p", { children: "Real-time wildlife threat monitoring across India" })
            ] })
          ] }) }),
          /* @__PURE__ */ y.jsx(pM, { summary: S, loading: e })
        ] }),
        /* @__PURE__ */ y.jsxs("section", { className: "dashboard-section", id: "section-map", children: [
          /* @__PURE__ */ y.jsx("div", { className: "section-header", children: /* @__PURE__ */ y.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ y.jsx("span", { className: "section-number", children: "02" }),
            /* @__PURE__ */ y.jsxs("div", { children: [
              /* @__PURE__ */ y.jsx("h2", { children: "Operations Center" }),
              /* @__PURE__ */ y.jsx("p", { children: "Geographic incident mapping" })
            ] })
          ] }) }),
          /* @__PURE__ */ y.jsx(vM, { mapData: k, onMapError: i })
        ] }),
        /* @__PURE__ */ y.jsxs("section", { className: "dashboard-section", id: "section-analytics", children: [
          /* @__PURE__ */ y.jsx("div", { className: "section-header", children: /* @__PURE__ */ y.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ y.jsx("span", { className: "section-number", children: "03" }),
            /* @__PURE__ */ y.jsxs("div", { children: [
              /* @__PURE__ */ y.jsx("h2", { children: "Intelligence Analytics" }),
              /* @__PURE__ */ y.jsx("p", { children: "Trends, distributions, and source reliability metrics" })
            ] })
          ] }) }),
          /* @__PURE__ */ y.jsx(MM, { chartData: C })
        ] }),
        /* @__PURE__ */ y.jsxs("section", { className: "dashboard-section", id: "section-incidents", children: [
          /* @__PURE__ */ y.jsx("div", { className: "section-header", children: /* @__PURE__ */ y.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ y.jsx("span", { className: "section-number", children: "04" }),
            /* @__PURE__ */ y.jsxs("div", { children: [
              /* @__PURE__ */ y.jsx("h2", { children: "Incident Database" }),
              /* @__PURE__ */ y.jsx("p", { children: "Search and filter wildlife crime reports" })
            ] })
          ] }) }),
          /* @__PURE__ */ y.jsx(
            LM,
            {
              filters: it,
              filterOptions: lt,
              onChange: ht,
              onApply: () => tt(),
              onBriefing: () => Ze("briefing")
            }
          ),
          /* @__PURE__ */ y.jsx(TM, { rows: U, loading: e })
        ] }),
        /* @__PURE__ */ y.jsxs("section", { className: "dashboard-section", id: "section-osint", children: [
          /* @__PURE__ */ y.jsx("div", { className: "section-header", children: /* @__PURE__ */ y.jsxs("div", { className: "section-header-content", children: [
            /* @__PURE__ */ y.jsx("span", { className: "section-number", children: "05" }),
            /* @__PURE__ */ y.jsxs("div", { children: [
              /* @__PURE__ */ y.jsx("h2", { children: "Intelligence Feed" }),
              /* @__PURE__ */ y.jsx("p", { children: "External sources and strategic recommendations" })
            ] })
          ] }) }),
          /* @__PURE__ */ y.jsxs("div", { className: "bottom-grid", children: [
            /* @__PURE__ */ y.jsx(EM, { items: N }),
            /* @__PURE__ */ y.jsx(zM, { items: kt })
          ] })
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ y.jsx("div", { className: "auth-shell", children: /* @__PURE__ */ y.jsxs("article", { className: "card auth-card", children: [
    /* @__PURE__ */ y.jsx("div", { className: "card-head", children: /* @__PURE__ */ y.jsxs("div", { className: "card-head-left", children: [
      /* @__PURE__ */ y.jsx(py, { size: 16, className: "card-head-icon" }),
      /* @__PURE__ */ y.jsx("h2", { children: "Authorized Access" })
    ] }) }),
    /* @__PURE__ */ y.jsxs("div", { className: "card-body auth-card-body", children: [
      /* @__PURE__ */ y.jsxs("div", { className: "auth-brand", children: [
        /* @__PURE__ */ y.jsx("h1", { children: "Wildlife Crime Intelligence Center" }),
        /* @__PURE__ */ y.jsx("p", { children: "Sign in with authorized credentials to continue." })
      ] }),
      /* @__PURE__ */ y.jsxs("form", { className: "auth-form", onSubmit: fo, children: [
        /* @__PURE__ */ y.jsxs("label", { className: "auth-field", children: [
          /* @__PURE__ */ y.jsx("span", { children: "Username" }),
          /* @__PURE__ */ y.jsx(
            "input",
            {
              value: _.username,
              onChange: (ut) => x((nt) => ({ ...nt, username: ut.target.value })),
              autoComplete: "username",
              required: !0
            }
          )
        ] }),
        /* @__PURE__ */ y.jsxs("label", { className: "auth-field", children: [
          /* @__PURE__ */ y.jsx("span", { children: "Password" }),
          /* @__PURE__ */ y.jsx(
            "input",
            {
              type: "password",
              value: _.password,
              onChange: (ut) => x((nt) => ({ ...nt, password: ut.target.value })),
              autoComplete: "current-password",
              required: !0
            }
          )
        ] }),
        c ? /* @__PURE__ */ y.jsxs("div", { className: "status error auth-status", role: "alert", children: [
          /* @__PURE__ */ y.jsx(Ym, { size: 16 }),
          /* @__PURE__ */ y.jsx("span", { children: c })
        ] }) : null,
        /* @__PURE__ */ y.jsxs("button", { className: "btn btn-primary auth-submit", type: "submit", disabled: p, children: [
          /* @__PURE__ */ y.jsx(EP, { size: 14 }),
          p ? "Signing in..." : "Sign in"
        ] })
      ] })
    ] })
  ] }) });
}
class IM extends ax.Component {
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
    return this.state.hasError ? /* @__PURE__ */ y.jsxs("div", { style: { padding: "24px", color: "#e8edff", fontFamily: "Inter, sans-serif" }, children: [
      /* @__PURE__ */ y.jsx("h2", { style: { marginTop: 0 }, children: "Dashboard failed to load" }),
      /* @__PURE__ */ y.jsx("p", { style: { opacity: 0.9 }, children: this.state.message || "Unexpected client error." }),
      /* @__PURE__ */ y.jsxs("p", { style: { opacity: 0.8 }, children: [
        "Open ",
        /* @__PURE__ */ y.jsx("a", { href: "/legacy?legacy=1", style: { color: "#9ec2ff" }, children: "legacy dashboard" }),
        " while this is being fixed."
      ] })
    ] }) : this.props.children;
  }
}
const Yu = document.getElementById("root");
if (Yu) {
  window.addEventListener("error", (e) => {
    console.error("Window error:", e.error || e.message);
  }), window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled promise rejection:", e.reason);
  });
  try {
    window.__WILDLIFE_DASHBOARD_BOOTED__ = !0, gv(Yu).render(
      /* @__PURE__ */ y.jsx(IM, { children: /* @__PURE__ */ y.jsx(AM, {}) })
    );
  } catch (e) {
    console.error("Fatal dashboard bootstrap error:", e), Yu.innerHTML = `
      <div style="padding:24px;color:#e8edff;font-family:Inter,sans-serif">
        <h2 style="margin-top:0">Dashboard failed to initialize</h2>
        <p>${e instanceof Error ? e.message : "Unknown bootstrap error"}</p>
        <p><a href="/legacy?legacy=1" style="color:#9ec2ff">Open legacy dashboard</a></p>
      </div>
    `;
  }
}
