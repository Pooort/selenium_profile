var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(a, b, c) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
  }
  if (b instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
  }
  return a + "";
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value);
};
$jscomp.getGlobal = function(a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, d) {
  if (b) {
    c = $jscomp.global;
    a = a.split(".");
    for (d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e];
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && $jscomp.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
  }
};
$jscomp.polyfill("String.prototype.repeat", function(a) {
  return a ? a : function(a) {
    var b = $jscomp.checkStringArgs(this, null, "repeat");
    if (0 > a || 1342177279 < a) {
      throw new RangeError("Invalid count value");
    }
    a |= 0;
    for (var d = ""; a;) {
      if (a & 1 && (d += b), a >>>= 1) {
        b += b;
      }
    }
    return d;
  };
}, "es6-impl", "es3");
$jscomp.findInternal = function(a, b, c) {
  a instanceof String && (a = String(a));
  for (var d = a.length, e = 0; e < d; e++) {
    var f = a[e];
    if (b.call(c, f, e, a)) {
      return {i:e, v:f};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.polyfill("Array.prototype.findIndex", function(a) {
  return a ? a : function(a, c) {
    return $jscomp.findInternal(this, a, c).i;
  };
}, "es6-impl", "es3");
$jscomp.polyfill("Array.prototype.find", function(a) {
  return a ? a : function(a, c) {
    return $jscomp.findInternal(this, a, c).v;
  };
}, "es6-impl", "es3");
var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.isDef = function(a) {
  return void 0 !== a;
};
goog.isString = function(a) {
  return "string" == typeof a;
};
goog.isBoolean = function(a) {
  return "boolean" == typeof a;
};
goog.isNumber = function(a) {
  return "number" == typeof a;
};
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  a[0] in c || !c.execScript || c.execScript("var " + a[0]);
  for (var d; a.length && (d = a.shift());) {
    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {};
  }
};
goog.define = function(a, b) {
  COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && void 0 === goog.global.CLOSURE_UNCOMPILED_DEFINES.nodeType && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, a) ? b = goog.global.CLOSURE_UNCOMPILED_DEFINES[a] : goog.global.CLOSURE_DEFINES && void 0 === goog.global.CLOSURE_DEFINES.nodeType && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, a) && (b = goog.global.CLOSURE_DEFINES[a]));
  goog.exportPath_(a, b);
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(a) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.provide can not be used within a goog.module.");
  }
  if (!COMPILED && goog.isProvided_(a)) {
    throw Error('Namespace "' + a + '" already declared.');
  }
  goog.constructNamespace_(a);
};
goog.constructNamespace_ = function(a, b) {
  if (!COMPILED) {
    delete goog.implicitNamespaces_[a];
    for (var c = a; (c = c.substring(0, c.lastIndexOf("."))) && !goog.getObjectByName(c);) {
      goog.implicitNamespaces_[c] = !0;
    }
  }
  goog.exportPath_(a, b);
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(a) {
  if (!goog.isString(a) || !a || -1 == a.search(goog.VALID_MODULE_RE_)) {
    throw Error("Invalid module identifier");
  }
  if (!goog.isInModuleLoader_()) {
    throw Error("Module " + a + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
  }
  if (goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module may only be called once per module.");
  }
  goog.moduleLoaderState_.moduleName = a;
  if (!COMPILED) {
    if (goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
  }
};
goog.module.get = function(a) {
  return goog.module.getInternal_(a);
};
goog.module.getInternal_ = function(a) {
  if (!COMPILED) {
    if (a in goog.loadedModules_) {
      return goog.loadedModules_[a];
    }
    if (!goog.implicitNamespaces_[a]) {
      return a = goog.getObjectByName(a), null != a ? a : null;
    }
  }
  return null;
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return null != goog.moduleLoaderState_;
};
goog.module.declareLegacyNamespace = function() {
  if (!COMPILED && !goog.isInModuleLoader_()) {
    throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
  }
  if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
  }
  goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.setTestOnly = function(a) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
  }
};
goog.forwardDeclare = function(a) {
};
COMPILED || (goog.isProvided_ = function(a) {
  return a in goog.loadedModules_ || !goog.implicitNamespaces_[a] && goog.isDefAndNotNull(goog.getObjectByName(a));
}, goog.implicitNamespaces_ = {"goog.module":!0});
goog.getObjectByName = function(a, b) {
  a = a.split(".");
  b = b || goog.global;
  for (var c; c = a.shift();) {
    if (goog.isDefAndNotNull(b[c])) {
      b = b[c];
    } else {
      return null;
    }
  }
  return b;
};
goog.globalize = function(a, b) {
  b = b || goog.global;
  for (var c in a) {
    b[c] = a[c];
  }
};
goog.addDependency = function(a, b, c, d) {
  if (goog.DEPENDENCIES_ENABLED) {
    var e;
    a = a.replace(/\\/g, "/");
    var f = goog.dependencies_;
    d && "boolean" !== typeof d || (d = d ? {module:"goog"} : {});
    for (var g = 0; e = b[g]; g++) {
      f.nameToPath[e] = a, f.loadFlags[a] = d;
    }
    for (d = 0; b = c[d]; d++) {
      a in f.requires || (f.requires[a] = {}), f.requires[a][b] = !0;
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(a) {
  goog.global.console && goog.global.console.error(a);
};
goog.require = function(a) {
  if (!COMPILED) {
    goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(a);
    if (goog.isProvided_(a)) {
      if (goog.isInModuleLoader_()) {
        return goog.module.getInternal_(a);
      }
    } else {
      if (goog.ENABLE_DEBUG_LOADER) {
        var b = goog.getPathFromDeps_(a);
        if (b) {
          goog.writeScripts_(b);
        } else {
          throw a = "goog.require could not find: " + a, goog.logToConsole_(a), Error(a);
        }
      }
    }
    return null;
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.instance_ = void 0;
  a.getInstance = function() {
    if (a.instance_) {
      return a.instance_;
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return a.instance_ = new a;
  };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.TRANSPILE = "detect";
goog.TRANSPILER = "transpile.js";
goog.DEPENDENCIES_ENABLED && (goog.dependencies_ = {loadFlags:{}, nameToPath:{}, requires:{}, visited:{}, written:{}, deferred:{}}, goog.inHtmlDocument_ = function() {
  var a = goog.global.document;
  return null != a && "write" in a;
}, goog.findBasePath_ = function() {
  if (goog.isDef(goog.global.CLOSURE_BASE_PATH) && goog.isString(goog.global.CLOSURE_BASE_PATH)) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH;
  } else {
    if (goog.inHtmlDocument_()) {
      var a = goog.global.document;
      var b = a.currentScript;
      a = b ? [b] : a.getElementsByTagName("SCRIPT");
      for (b = a.length - 1; 0 <= b; --b) {
        var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length : d;
        if ("base.js" == c.substr(d - 7, 7)) {
          goog.basePath = c.substr(0, d - 7);
          break;
        }
      }
    }
  }
}, goog.importScript_ = function(a, b) {
  (goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(a, b) && (goog.dependencies_.written[a] = !0);
}, goog.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), goog.oldIeWaiting_ = !1, goog.importProcessedScript_ = function(a, b, c) {
  goog.importScript_("", 'goog.retrieveAndExec_("' + a + '", ' + b + ", " + c + ");");
}, goog.queuedModules_ = [], goog.wrapModule_ = function(a, b) {
  return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(b + "\n//# sourceURL=" + a + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + b + "\n;return exports});\n//# sourceURL=" + a + "\n";
}, goog.loadQueuedModules_ = function() {
  var a = goog.queuedModules_.length;
  if (0 < a) {
    var b = goog.queuedModules_;
    goog.queuedModules_ = [];
    for (var c = 0; c < a; c++) {
      goog.maybeProcessDeferredPath_(b[c]);
    }
  }
  goog.oldIeWaiting_ = !1;
}, goog.maybeProcessDeferredDep_ = function(a) {
  goog.isDeferredModule_(a) && goog.allDepsAreAvailable_(a) && (a = goog.getPathFromDeps_(a), goog.maybeProcessDeferredPath_(goog.basePath + a));
}, goog.isDeferredModule_ = function(a) {
  var b = (a = goog.getPathFromDeps_(a)) && goog.dependencies_.loadFlags[a] || {}, c = b.lang || "es3";
  return a && ("goog" == b.module || goog.needsTranspile_(c)) ? goog.basePath + a in goog.dependencies_.deferred : !1;
}, goog.allDepsAreAvailable_ = function(a) {
  if ((a = goog.getPathFromDeps_(a)) && a in goog.dependencies_.requires) {
    for (var b in goog.dependencies_.requires[a]) {
      if (!goog.isProvided_(b) && !goog.isDeferredModule_(b)) {
        return !1;
      }
    }
  }
  return !0;
}, goog.maybeProcessDeferredPath_ = function(a) {
  if (a in goog.dependencies_.deferred) {
    var b = goog.dependencies_.deferred[a];
    delete goog.dependencies_.deferred[a];
    goog.globalEval(b);
  }
}, goog.loadModuleFromUrl = function(a) {
  goog.retrieveAndExec_(a, !0, !1);
}, goog.writeScriptSrcNode_ = function(a) {
  goog.global.document.write('<script type="text/javascript" src="' + a + '">\x3c/script>');
}, goog.appendScriptSrcNode_ = function(a) {
  var b = goog.global.document, c = b.createElement("script");
  c.type = "text/javascript";
  c.src = a;
  c.defer = !1;
  c.async = !1;
  b.head.appendChild(c);
}, goog.writeScriptTag_ = function(a, b) {
  if (goog.inHtmlDocument_()) {
    var c = goog.global.document;
    if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == c.readyState) {
      if (/\bdeps.js$/.test(a)) {
        return !1;
      }
      throw Error('Cannot write "' + a + '" after document load');
    }
    void 0 === b ? goog.IS_OLD_IE_ ? (goog.oldIeWaiting_ = !0, b = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ", c.write('<script type="text/javascript" src="' + a + '"' + b + ">\x3c/script>")) : goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(a) : goog.writeScriptSrcNode_(a) : c.write('<script type="text/javascript">' + goog.protectScriptTag_(b) + "\x3c/script>");
    return !0;
  }
  return !1;
}, goog.protectScriptTag_ = function(a) {
  return a.replace(/<\/(SCRIPT)/ig, "\\x3c/$1");
}, goog.needsTranspile_ = function(a) {
  if ("always" == goog.TRANSPILE) {
    return !0;
  }
  if ("never" == goog.TRANSPILE) {
    return !1;
  }
  goog.requiresTranspilation_ || (goog.requiresTranspilation_ = goog.createRequiresTranspilation_());
  if (a in goog.requiresTranspilation_) {
    return goog.requiresTranspilation_[a];
  }
  throw Error("Unknown language mode: " + a);
}, goog.requiresTranspilation_ = null, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function(a, b) {
  "complete" == a.readyState && goog.lastNonModuleScriptIndex_ == b && goog.loadQueuedModules_();
  return !0;
}, goog.writeScripts_ = function(a) {
  function b(a) {
    if (!(a in e.written || a in e.visited)) {
      e.visited[a] = !0;
      if (a in e.requires) {
        for (var f in e.requires[a]) {
          if (!goog.isProvided_(f)) {
            if (f in e.nameToPath) {
              b(e.nameToPath[f]);
            } else {
              throw Error("Undefined nameToPath for " + f);
            }
          }
        }
      }
      a in d || (d[a] = !0, c.push(a));
    }
  }
  var c = [], d = {}, e = goog.dependencies_;
  b(a);
  for (var f = 0; f < c.length; f++) {
    a = c[f], goog.dependencies_.written[a] = !0;
  }
  var g = goog.moduleLoaderState_;
  goog.moduleLoaderState_ = null;
  for (f = 0; f < c.length; f++) {
    if (a = c[f]) {
      var h = e.loadFlags[a] || {}, k = goog.needsTranspile_(h.lang || "es3");
      "goog" == h.module || k ? goog.importProcessedScript_(goog.basePath + a, "goog" == h.module, k) : goog.importScript_(goog.basePath + a);
    } else {
      throw goog.moduleLoaderState_ = g, Error("Undefined script input");
    }
  }
  goog.moduleLoaderState_ = g;
}, goog.getPathFromDeps_ = function(a) {
  return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null;
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.hasBadLetScoping = null;
goog.useSafari10Workaround = function() {
  if (null == goog.hasBadLetScoping) {
    try {
      var a = !eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";');
    } catch (b) {
      a = !1;
    }
    goog.hasBadLetScoping = a;
  }
  return goog.hasBadLetScoping;
};
goog.workaroundSafari10EvalBug = function(a) {
  return "(function(){" + a + "\n;})();\n";
};
goog.loadModule = function(a) {
  var b = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {moduleName:void 0, declareLegacyNamespace:!1};
    if (goog.isFunction(a)) {
      var c = a.call(void 0, {});
    } else {
      if (goog.isString(a)) {
        goog.useSafari10Workaround() && (a = goog.workaroundSafari10EvalBug(a)), c = goog.loadModuleFromSource_.call(void 0, a);
      } else {
        throw Error("Invalid module definition");
      }
    }
    var d = goog.moduleLoaderState_.moduleName;
    if (!goog.isString(d) || !d) {
      throw Error('Invalid module name "' + d + '"');
    }
    goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d, c) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof c && null != c && Object.seal(c);
    goog.loadedModules_[d] = c;
  } finally {
    goog.moduleLoaderState_ = b;
  }
};
goog.loadModuleFromSource_ = function(a) {
  eval(a);
  return {};
};
goog.normalizePath_ = function(a) {
  a = a.split("/");
  for (var b = 0; b < a.length;) {
    "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
  }
  return a.join("/");
};
goog.loadFileSync_ = function(a) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
    return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
  }
  try {
    var b = new goog.global.XMLHttpRequest;
    b.open("get", a, !1);
    b.send();
    return 0 == b.status || 200 == b.status ? b.responseText : null;
  } catch (c) {
    return null;
  }
};
goog.retrieveAndExec_ = function(a, b, c) {
  if (!COMPILED) {
    var d = a;
    a = goog.normalizePath_(a);
    var e = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_, f = goog.loadFileSync_(a);
    if (null == f) {
      throw Error('Load of "' + a + '" failed');
    }
    c && (f = goog.transpile_.call(goog.global, f, a));
    f = b ? goog.wrapModule_(a, f) : f + ("\n//# sourceURL=" + a);
    goog.IS_OLD_IE_ && goog.oldIeWaiting_ ? (goog.dependencies_.deferred[d] = f, goog.queuedModules_.push(d)) : e(a, f);
  }
};
goog.transpile_ = function(a, b) {
  var c = goog.global.$jscomp;
  c || (goog.global.$jscomp = c = {});
  var d = c.transpile;
  if (!d) {
    var e = goog.basePath + goog.TRANSPILER, f = goog.loadFileSync_(e);
    if (f) {
      eval(f + "\n//# sourceURL=" + e);
      if (goog.global.$gwtExport && goog.global.$gwtExport.$jscomp && !goog.global.$gwtExport.$jscomp.transpile) {
        throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: ' + JSON.stringify(goog.global.$gwtExport));
      }
      goog.global.$jscomp.transpile = goog.global.$gwtExport.$jscomp.transpile;
      c = goog.global.$jscomp;
      d = c.transpile;
    }
  }
  d || (d = c.transpile = function(a, b) {
    goog.logToConsole_(b + " requires transpilation but no transpiler was found.");
    return a;
  });
  return d(a, b);
};
goog.typeOf = function(a) {
  var b = typeof a;
  if ("object" == b) {
    if (a) {
      if (a instanceof Array) {
        return "array";
      }
      if (a instanceof Object) {
        return b;
      }
      var c = Object.prototype.toString.call(a);
      if ("[object Window]" == c) {
        return "object";
      }
      if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return "array";
      }
      if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return "function";
      }
    } else {
      return "null";
    }
  } else {
    if ("function" == b && "undefined" == typeof a.call) {
      return "object";
    }
  }
  return b;
};
goog.isNull = function(a) {
  return null === a;
};
goog.isDefAndNotNull = function(a) {
  return null != a;
};
goog.isArray = function(a) {
  return "array" == goog.typeOf(a);
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return "array" == b || "object" == b && "number" == typeof a.length;
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear;
};
goog.isFunction = function(a) {
  return "function" == goog.typeOf(a);
};
goog.isObject = function(a) {
  var b = typeof a;
  return "object" == b && null != a || "function" == b;
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(a) {
  return !!a[goog.UID_PROPERTY_];
};
goog.removeUid = function(a) {
  null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_];
  } catch (b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if ("object" == b || "array" == b) {
    if (a.clone) {
      return a.clone();
    }
    var b = "array" == b ? [] : {}, c;
    for (c in a) {
      b[c] = goog.cloneObject(a[c]);
    }
    return b;
  }
  return a;
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments);
};
goog.bindJs_ = function(a, b, c) {
  if (!a) {
    throw Error();
  }
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c);
    };
  }
  return function() {
    return a.apply(b, arguments);
  };
};
goog.bind = function(a, b, c) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments);
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = c.slice();
    b.push.apply(b, arguments);
    return a.apply(this, b);
  };
};
goog.mixin = function(a, b) {
  for (var c in b) {
    a[c] = b[c];
  }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
  return +new Date;
};
goog.globalEval = function(a) {
  if (goog.global.execScript) {
    goog.global.execScript(a, "JavaScript");
  } else {
    if (goog.global.eval) {
      if (null == goog.evalWorksForGlobals_) {
        if (goog.global.eval("var _evalTest_ = 1;"), "undefined" != typeof goog.global._evalTest_) {
          try {
            delete goog.global._evalTest_;
          } catch (d) {
          }
          goog.evalWorksForGlobals_ = !0;
        } else {
          goog.evalWorksForGlobals_ = !1;
        }
      }
      if (goog.evalWorksForGlobals_) {
        goog.global.eval(a);
      } else {
        var b = goog.global.document, c = b.createElement("SCRIPT");
        c.type = "text/javascript";
        c.defer = !1;
        c.appendChild(b.createTextNode(a));
        b.body.appendChild(c);
        b.body.removeChild(c);
      }
    } else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
  if ("." == String(a).charAt(0)) {
    throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + a);
  }
  var c = function(a) {
    return goog.cssNameMapping_[a] || a;
  }, d = function(a) {
    a = a.split("-");
    for (var b = [], d = 0; d < a.length; d++) {
      b.push(c(a[d]));
    }
    return b.join("-");
  }, d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
    return a;
  };
  a = b ? a + "-" + d(b) : d(a);
  return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(a) : a;
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b;
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
  b && (a = a.replace(/\{\$([^}]+)}/g, function(a, d) {
    return null != b && d in b ? b[d] : a;
  }));
  return a;
};
goog.getMsgWithFallback = function(a, b) {
  return a;
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c);
};
goog.exportProperty = function(a, b, c) {
  a[b] = c;
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a;
  a.base = function(a, c, f) {
    for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) {
      d[e - 2] = arguments[e];
    }
    return b.prototype[c].apply(a, d);
  };
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d) {
    throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  }
  if (d.superClass_) {
    for (var e = Array(arguments.length - 1), f = 1; f < arguments.length; f++) {
      e[f - 1] = arguments[f];
    }
    return d.superClass_.constructor.apply(a, e);
  }
  e = Array(arguments.length - 2);
  for (f = 2; f < arguments.length; f++) {
    e[f - 2] = arguments[f];
  }
  for (var f = !1, g = a.constructor; g; g = g.superClass_ && g.superClass_.constructor) {
    if (g.prototype[b] === d) {
      f = !0;
    } else {
      if (f) {
        return g.prototype[b].apply(a, e);
      }
    }
  }
  if (a[b] === d) {
    return a.constructor.prototype[b].apply(a, e);
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.scope is not supported within a goog.module.");
  }
  a.call(goog.global);
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(a, b) {
  var c = b.constructor, d = b.statics;
  c && c != Object.prototype.constructor || (c = function() {
    throw Error("cannot instantiate an interface (no constructor defined).");
  });
  c = goog.defineClass.createSealingConstructor_(c, a);
  a && goog.inherits(c, a);
  delete b.constructor;
  delete b.statics;
  goog.defineClass.applyProperties_(c.prototype, b);
  null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
  return c;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(a, b) {
  if (!goog.defineClass.SEAL_CLASS_INSTANCES) {
    return a;
  }
  var c = !goog.defineClass.isUnsealable_(b), d = function() {
    var b = a.apply(this, arguments) || this;
    b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
    this.constructor === d && c && Object.seal instanceof Function && Object.seal(b);
    return b;
  };
  return d;
};
goog.defineClass.isUnsealable_ = function(a) {
  return a && a.prototype && a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_];
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(a, b) {
  for (var c in b) {
    Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  }
  for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++) {
    c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d], Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  }
};
goog.tagUnsealableClass = function(a) {
  !COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0);
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
goog.createRequiresTranspilation_ = function() {
  function a(a, b) {
    d ? c[a] = !0 : b() ? c[a] = !1 : d = c[a] = !0;
  }
  function b(a) {
    try {
      return !!eval(a);
    } catch (g) {
      return !1;
    }
  }
  var c = {es3:!1}, d = !1, e = goog.global.navigator && goog.global.navigator.userAgent ? goog.global.navigator.userAgent : "";
  a("es5", function() {
    return b("[1,].length==1");
  });
  a("es6", function() {
    var a = e.match(/Edge\/(\d+)(\.\d)*/i);
    return a && 15 > Number(a[1]) ? !1 : b('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()');
  });
  a("es6-impl", function() {
    return !0;
  });
  a("es7", function() {
    return b("2 ** 2 == 4");
  });
  a("es8", function() {
    return b("async () => 1, true");
  });
  return c;
};
var fxdriver = {error:{}}, WebDriverError = function(a, b, c) {
  if (b instanceof Error) {
    var d = b.message;
    b = b.stack;
  } else {
    d = b.toString(), b = Error(d).stack.split("\n"), b.shift(), b = b.join("\n");
  }
  this.additionalFields = [];
  if (c) {
    for (var e in c) {
      this.additionalFields.push(e), this[e] = c[e];
    }
  }
  this.code = a;
  this.message = d;
  this.stack = b;
  this.isWebDriverError = !0;
};
fxdriver.error.toJSON = function(a) {
  var b = [], c = {message:a.message ? a.message : a.toString(), stackTrace:b};
  if (a.stack) {
    for (var d = a.stack.replace(/\s*$/, "").split("\n"), e = d.shift(); e; e = d.shift()) {
      var f = e.match(/(.*):(\d+):(\d+)$/);
      if (f) {
        e = f[1];
        var g = Number(f[2]);
        var h = Number(f[3]);
      } else {
        f = e.match(/(.*):(\d+)$/), e = f[1], g = Number(f[2]);
      }
      (f = e.match(/^([\w./<$]+)?(?:\(.*\))?@(.+)?$/)) ? b.push({methodName:f[1], fileName:f[2], lineNumber:g, columnNumber:h}) : b.push({methodName:e, fileName:"?", lineNumber:"?", columnNumber:"?"});
    }
  }
  if (a.additionalFields && a.additionalFields.length) {
    for (b = 0; b < a.additionalFields.length; ++b) {
      c[a.additionalFields[b]] = a[a.additionalFields[b]];
    }
  }
  return c;
};
var bot = {ErrorCode:{SUCCESS:0, NO_SUCH_ELEMENT:7, NO_SUCH_FRAME:8, UNKNOWN_COMMAND:9, UNSUPPORTED_OPERATION:9, STALE_ELEMENT_REFERENCE:10, ELEMENT_NOT_VISIBLE:11, INVALID_ELEMENT_STATE:12, UNKNOWN_ERROR:13, ELEMENT_NOT_SELECTABLE:15, JAVASCRIPT_ERROR:17, XPATH_LOOKUP_ERROR:19, TIMEOUT:21, NO_SUCH_WINDOW:23, INVALID_COOKIE_DOMAIN:24, UNABLE_TO_SET_COOKIE:25, UNEXPECTED_ALERT_OPEN:26, NO_SUCH_ALERT:27, SCRIPT_TIMEOUT:28, INVALID_ELEMENT_COORDINATES:29, IME_NOT_AVAILABLE:30, IME_ENGINE_ACTIVATION_FAILED:31, 
INVALID_SELECTOR_ERROR:32, SESSION_NOT_CREATED:33, MOVE_TARGET_OUT_OF_BOUNDS:34, SQL_DATABASE_ERROR:35, INVALID_XPATH_SELECTOR:51, INVALID_XPATH_SELECTOR_RETURN_TYPE:52, INVALID_ARGUMENT:61, METHOD_NOT_ALLOWED:405}, Error:function(a, b) {
  this.code = a;
  this.state = bot.Error.CODE_TO_STATE_[a] || bot.Error.State.UNKNOWN_ERROR;
  this.message = b || "";
  a = this.state.replace(/((?:^|\s+)[a-z])/g, function(a) {
    return a.toUpperCase().replace(/^[\s\xa0]+/g, "");
  });
  b = a.length - 5;
  if (0 > b || a.indexOf("Error", b) != b) {
    a += "Error";
  }
  this.name = a;
  a = Error(this.message);
  a.name = this.name;
  this.stack = a.stack || "";
}};
goog.inherits(bot.Error, Error);
bot.Error.State = {ELEMENT_NOT_SELECTABLE:"element not selectable", ELEMENT_NOT_VISIBLE:"element not visible", INVALID_ARGUMENT:"invalid argument", INVALID_COOKIE_DOMAIN:"invalid cookie domain", INVALID_ELEMENT_COORDINATES:"invalid element coordinates", INVALID_ELEMENT_STATE:"invalid element state", INVALID_SELECTOR:"invalid selector", INVALID_SESSION_ID:"invalid session id", JAVASCRIPT_ERROR:"javascript error", MOVE_TARGET_OUT_OF_BOUNDS:"move target out of bounds", NO_SUCH_ALERT:"no such alert", 
NO_SUCH_ELEMENT:"no such element", NO_SUCH_FRAME:"no such frame", NO_SUCH_WINDOW:"no such window", SCRIPT_TIMEOUT:"script timeout", SESSION_NOT_CREATED:"session not created", STALE_ELEMENT_REFERENCE:"stale element reference", TIMEOUT:"timeout", UNABLE_TO_SET_COOKIE:"unable to set cookie", UNEXPECTED_ALERT_OPEN:"unexpected alert open", UNKNOWN_COMMAND:"unknown command", UNKNOWN_ERROR:"unknown error", UNKNOWN_METHOD:"unknown method", UNSUPPORTED_OPERATION:"unsupported operation"};
bot.Error.CODE_TO_STATE_ = {};
bot.Error.CODE_TO_STATE_[bot.ErrorCode.ELEMENT_NOT_SELECTABLE] = bot.Error.State.ELEMENT_NOT_SELECTABLE;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.ELEMENT_NOT_VISIBLE] = bot.Error.State.ELEMENT_NOT_VISIBLE;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.IME_ENGINE_ACTIVATION_FAILED] = bot.Error.State.UNKNOWN_ERROR;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.IME_NOT_AVAILABLE] = bot.Error.State.UNKNOWN_ERROR;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.INVALID_COOKIE_DOMAIN] = bot.Error.State.INVALID_COOKIE_DOMAIN;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.INVALID_ELEMENT_COORDINATES] = bot.Error.State.INVALID_ELEMENT_COORDINATES;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.INVALID_ELEMENT_STATE] = bot.Error.State.INVALID_ELEMENT_STATE;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.INVALID_SELECTOR_ERROR] = bot.Error.State.INVALID_SELECTOR;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.INVALID_XPATH_SELECTOR] = bot.Error.State.INVALID_SELECTOR;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.INVALID_XPATH_SELECTOR_RETURN_TYPE] = bot.Error.State.INVALID_SELECTOR;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.JAVASCRIPT_ERROR] = bot.Error.State.JAVASCRIPT_ERROR;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.METHOD_NOT_ALLOWED] = bot.Error.State.UNSUPPORTED_OPERATION;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.MOVE_TARGET_OUT_OF_BOUNDS] = bot.Error.State.MOVE_TARGET_OUT_OF_BOUNDS;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.NO_SUCH_ALERT] = bot.Error.State.NO_SUCH_ALERT;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.NO_SUCH_ELEMENT] = bot.Error.State.NO_SUCH_ELEMENT;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.NO_SUCH_FRAME] = bot.Error.State.NO_SUCH_FRAME;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.NO_SUCH_WINDOW] = bot.Error.State.NO_SUCH_WINDOW;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.SCRIPT_TIMEOUT] = bot.Error.State.SCRIPT_TIMEOUT;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.SESSION_NOT_CREATED] = bot.Error.State.SESSION_NOT_CREATED;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.STALE_ELEMENT_REFERENCE] = bot.Error.State.STALE_ELEMENT_REFERENCE;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.TIMEOUT] = bot.Error.State.TIMEOUT;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.UNABLE_TO_SET_COOKIE] = bot.Error.State.UNABLE_TO_SET_COOKIE;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.UNEXPECTED_ALERT_OPEN] = bot.Error.State.UNEXPECTED_ALERT_OPEN;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.UNKNOWN_ERROR] = bot.Error.State.UNKNOWN_ERROR;
bot.Error.CODE_TO_STATE_[bot.ErrorCode.UNSUPPORTED_OPERATION] = bot.Error.State.UNKNOWN_COMMAND;
bot.Error.prototype.isAutomationError = !0;
goog.DEBUG && (bot.Error.prototype.toString = function() {
  return this.name + ": " + this.message;
});
fxdriver.Timer = function() {
  this.timer = null;
};
fxdriver.Timer.prototype.setTimeout = function(a, b) {
  var c = Components.interfaces;
  b = b || 10;
  this.timer = Components.classes["@mozilla.org/timer;1"].createInstance(c.nsITimer);
  this.timer.initWithCallback({notify:function() {
    a.apply(null);
  }}, b, c.nsITimer.TYPE_ONE_SHOT);
};
fxdriver.Timer.prototype.runWhenTrue = function(a, b, c, d) {
  var e = c, f = this, g = function() {
    var c = a();
    0 <= e && !c ? (e -= 100, f.setTimeout(g, 100)) : 0 >= e ? d() : b(c);
  };
  g();
};
fxdriver.Timer.prototype.cancel = function() {
  this.timer && this.timer.cancel();
};
goog.debug = {};
goog.debug.Error = function(a) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, goog.debug.Error);
  } else {
    var b = Error().stack;
    b && (this.stack = b);
  }
  a && (this.message = String(a));
  this.reportErrorToServer = !0;
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.debug.LogRecord = function(a, b, c, d, e) {
  this.reset(a, b, c, d, e);
};
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(a, b, c, d, e) {
  goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof e ? e : goog.debug.LogRecord.nextSequenceNumber_++);
  this.time_ = d || goog.now();
  this.level_ = a;
  this.msg_ = b;
  this.loggerName_ = c;
  delete this.exception_;
};
goog.debug.LogRecord.prototype.getLoggerName = function() {
  return this.loggerName_;
};
goog.debug.LogRecord.prototype.getException = function() {
  return this.exception_;
};
goog.debug.LogRecord.prototype.setException = function(a) {
  this.exception_ = a;
};
goog.debug.LogRecord.prototype.setLoggerName = function(a) {
  this.loggerName_ = a;
};
goog.debug.LogRecord.prototype.getLevel = function() {
  return this.level_;
};
goog.debug.LogRecord.prototype.setLevel = function(a) {
  this.level_ = a;
};
goog.debug.LogRecord.prototype.getMessage = function() {
  return this.msg_;
};
goog.debug.LogRecord.prototype.setMessage = function(a) {
  this.msg_ = a;
};
goog.debug.LogRecord.prototype.getMillis = function() {
  return this.time_;
};
goog.debug.LogRecord.prototype.setMillis = function(a) {
  this.time_ = a;
};
goog.debug.LogRecord.prototype.getSequenceNumber = function() {
  return this.sequenceNumber_;
};
goog.dom = {};
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.object = {};
goog.object.is = function(a, b) {
  return a === b ? 0 !== a || 1 / a === 1 / b : a !== a && b !== b;
};
goog.object.forEach = function(a, b, c) {
  for (var d in a) {
    b.call(c, a[d], d, a);
  }
};
goog.object.filter = function(a, b, c) {
  var d = {}, e;
  for (e in a) {
    b.call(c, a[e], e, a) && (d[e] = a[e]);
  }
  return d;
};
goog.object.map = function(a, b, c) {
  var d = {}, e;
  for (e in a) {
    d[e] = b.call(c, a[e], e, a);
  }
  return d;
};
goog.object.some = function(a, b, c) {
  for (var d in a) {
    if (b.call(c, a[d], d, a)) {
      return !0;
    }
  }
  return !1;
};
goog.object.every = function(a, b, c) {
  for (var d in a) {
    if (!b.call(c, a[d], d, a)) {
      return !1;
    }
  }
  return !0;
};
goog.object.getCount = function(a) {
  var b = 0, c;
  for (c in a) {
    b++;
  }
  return b;
};
goog.object.getAnyKey = function(a) {
  for (var b in a) {
    return b;
  }
};
goog.object.getAnyValue = function(a) {
  for (var b in a) {
    return a[b];
  }
};
goog.object.contains = function(a, b) {
  return goog.object.containsValue(a, b);
};
goog.object.getValues = function(a) {
  var b = [], c = 0, d;
  for (d in a) {
    b[c++] = a[d];
  }
  return b;
};
goog.object.getKeys = function(a) {
  var b = [], c = 0, d;
  for (d in a) {
    b[c++] = d;
  }
  return b;
};
goog.object.getValueByKeys = function(a, b) {
  for (var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1; c < d.length && (a = a[d[c]], goog.isDef(a)); c++) {
  }
  return a;
};
goog.object.containsKey = function(a, b) {
  return null !== a && b in a;
};
goog.object.containsValue = function(a, b) {
  for (var c in a) {
    if (a[c] == b) {
      return !0;
    }
  }
  return !1;
};
goog.object.findKey = function(a, b, c) {
  for (var d in a) {
    if (b.call(c, a[d], d, a)) {
      return d;
    }
  }
};
goog.object.findValue = function(a, b, c) {
  return (b = goog.object.findKey(a, b, c)) && a[b];
};
goog.object.isEmpty = function(a) {
  for (var b in a) {
    return !1;
  }
  return !0;
};
goog.object.clear = function(a) {
  for (var b in a) {
    delete a[b];
  }
};
goog.object.remove = function(a, b) {
  var c;
  (c = b in a) && delete a[b];
  return c;
};
goog.object.add = function(a, b, c) {
  if (null !== a && b in a) {
    throw Error('The object already contains the key "' + b + '"');
  }
  goog.object.set(a, b, c);
};
goog.object.get = function(a, b, c) {
  return null !== a && b in a ? a[b] : c;
};
goog.object.set = function(a, b, c) {
  a[b] = c;
};
goog.object.setIfUndefined = function(a, b, c) {
  return b in a ? a[b] : a[b] = c;
};
goog.object.setWithReturnValueIfNotSet = function(a, b, c) {
  if (b in a) {
    return a[b];
  }
  c = c();
  return a[b] = c;
};
goog.object.equals = function(a, b) {
  for (var c in a) {
    if (!(c in b) || a[c] !== b[c]) {
      return !1;
    }
  }
  for (c in b) {
    if (!(c in a)) {
      return !1;
    }
  }
  return !0;
};
goog.object.clone = function(a) {
  var b = {}, c;
  for (c in a) {
    b[c] = a[c];
  }
  return b;
};
goog.object.unsafeClone = function(a) {
  var b = goog.typeOf(a);
  if ("object" == b || "array" == b) {
    if (goog.isFunction(a.clone)) {
      return a.clone();
    }
    var b = "array" == b ? [] : {}, c;
    for (c in a) {
      b[c] = goog.object.unsafeClone(a[c]);
    }
    return b;
  }
  return a;
};
goog.object.transpose = function(a) {
  var b = {}, c;
  for (c in a) {
    b[a[c]] = c;
  }
  return b;
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
  for (var c, d, e = 1; e < arguments.length; e++) {
    d = arguments[e];
    for (c in d) {
      a[c] = d[c];
    }
    for (var f = 0; f < goog.object.PROTOTYPE_FIELDS_.length; f++) {
      c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
};
goog.object.create = function(a) {
  var b = arguments.length;
  if (1 == b && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0]);
  }
  if (b % 2) {
    throw Error("Uneven number of arguments");
  }
  for (var c = {}, d = 0; d < b; d += 2) {
    c[arguments[d]] = arguments[d + 1];
  }
  return c;
};
goog.object.createSet = function(a) {
  var b = arguments.length;
  if (1 == b && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0]);
  }
  for (var c = {}, d = 0; d < b; d++) {
    c[arguments[d]] = !0;
  }
  return c;
};
goog.object.createImmutableView = function(a) {
  var b = a;
  Object.isFrozen && !Object.isFrozen(a) && (b = Object.create(a), Object.freeze(b));
  return b;
};
goog.object.isImmutableView = function(a) {
  return !!Object.isFrozen && Object.isFrozen(a);
};
goog.object.getAllPropertyNames = function(a, b, c) {
  if (!a) {
    return [];
  }
  if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
    return goog.object.getKeys(a);
  }
  for (var d = {}; a && (a !== Object.prototype || b) && (a !== Function.prototype || c);) {
    for (var e = Object.getOwnPropertyNames(a), f = 0; f < e.length; f++) {
      d[e[f]] = !0;
    }
    a = Object.getPrototypeOf(a);
  }
  return goog.object.getKeys(d);
};
goog.reflect = {};
goog.reflect.object = function(a, b) {
  return b;
};
goog.reflect.objectProperty = function(a, b) {
  return a;
};
goog.reflect.sinkValue = function(a) {
  goog.reflect.sinkValue[" "](a);
  return a;
};
goog.reflect.sinkValue[" "] = goog.nullFunction;
goog.reflect.canAccessProperty = function(a, b) {
  try {
    return goog.reflect.sinkValue(a[b]), !0;
  } catch (c) {
  }
  return !1;
};
goog.reflect.cache = function(a, b, c, d) {
  d = d ? d(b) : b;
  return Object.prototype.hasOwnProperty.call(a, d) ? a[d] : a[d] = c(b);
};
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
  return 0 == a.lastIndexOf(b, 0);
};
goog.string.endsWith = function(a, b) {
  var c = a.length - b.length;
  return 0 <= c && a.indexOf(b, c) == c;
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length));
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length));
};
goog.string.caseInsensitiveEquals = function(a, b) {
  return a.toLowerCase() == b.toLowerCase();
};
goog.string.subs = function(a, b) {
  for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) {
    d += c.shift() + e.shift();
  }
  return d + c.join("%s");
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = function(a) {
  return /^[\s\xa0]*$/.test(a);
};
goog.string.isEmptyString = function(a) {
  return 0 == a.length;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(a) {
  return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(a) {
  return !/[^\t\n\r ]/.test(a);
};
goog.string.isAlpha = function(a) {
  return !/[^a-zA-Z]/.test(a);
};
goog.string.isNumeric = function(a) {
  return !/[^0-9]/.test(a);
};
goog.string.isAlphaNumeric = function(a) {
  return !/[^a-zA-Z0-9]/.test(a);
};
goog.string.isSpace = function(a) {
  return " " == a;
};
goog.string.isUnicodeChar = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a;
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(a) {
  return a.trim();
} : function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function(a, b) {
  a = String(a).toLowerCase();
  b = String(b).toLowerCase();
  return a < b ? -1 : a == b ? 0 : 1;
};
goog.string.numberAwareCompare_ = function(a, b, c) {
  if (a == b) {
    return 0;
  }
  if (!a) {
    return -1;
  }
  if (!b) {
    return 1;
  }
  for (var d = a.toLowerCase().match(c), e = b.toLowerCase().match(c), f = Math.min(d.length, e.length), g = 0; g < f; g++) {
    c = d[g];
    var h = e[g];
    if (c != h) {
      return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(h, 10), !isNaN(b) && a - b) ? a - b : c < h ? -1 : 1;
    }
  }
  return d.length != e.length ? d.length - e.length : a < b ? -1 : 1;
};
goog.string.intAwareCompare = function(a, b) {
  return goog.string.numberAwareCompare_(a, b, /\d+|\D+/g);
};
goog.string.floatAwareCompare = function(a, b) {
  return goog.string.numberAwareCompare_(a, b, /\d+|\.\d+|\D+/g);
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function(a) {
  return encodeURIComponent(String(a));
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "));
};
goog.string.newLineToBr = function(a, b) {
  return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>");
};
goog.string.htmlEscape = function(a, b) {
  if (b) {
    a = a.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (a = a.replace(goog.string.E_RE_, "&#101;"));
  } else {
    if (!goog.string.ALL_RE_.test(a)) {
      return a;
    }
    -1 != a.indexOf("&") && (a = a.replace(goog.string.AMP_RE_, "&amp;"));
    -1 != a.indexOf("<") && (a = a.replace(goog.string.LT_RE_, "&lt;"));
    -1 != a.indexOf(">") && (a = a.replace(goog.string.GT_RE_, "&gt;"));
    -1 != a.indexOf('"') && (a = a.replace(goog.string.QUOT_RE_, "&quot;"));
    -1 != a.indexOf("'") && (a = a.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;"));
    -1 != a.indexOf("\x00") && (a = a.replace(goog.string.NULL_RE_, "&#0;"));
    goog.string.DETECT_DOUBLE_ESCAPING && -1 != a.indexOf("e") && (a = a.replace(goog.string.E_RE_, "&#101;"));
  }
  return a;
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a;
};
goog.string.unescapeEntitiesWithDocument = function(a, b) {
  return goog.string.contains(a, "&") ? goog.string.unescapeEntitiesUsingDom_(a, b) : a;
};
goog.string.unescapeEntitiesUsingDom_ = function(a, b) {
  var c = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'};
  var d = b ? b.createElement("div") : goog.global.document.createElement("div");
  return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, b) {
    var e = c[a];
    if (e) {
      return e;
    }
    "#" == b.charAt(0) && (b = Number("0" + b.substr(1)), isNaN(b) || (e = String.fromCharCode(b)));
    e || (d.innerHTML = a + " ", e = d.firstChild.nodeValue.slice(0, -1));
    return c[a] = e;
  });
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return '"';
      default:
        return "#" != c.charAt(0) || (c = Number("0" + c.substr(1)), isNaN(c)) ? a : String.fromCharCode(c);
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
  return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b);
};
goog.string.preserveSpaces = function(a) {
  return a.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function(a, b) {
  for (var c = b.length, d = 0; d < c; d++) {
    var e = 1 == c ? b : b.charAt(d);
    if (a.charAt(0) == e && a.charAt(a.length - 1) == e) {
      return a.substring(1, a.length - 1);
    }
  }
  return a;
};
goog.string.truncate = function(a, b, c) {
  c && (a = goog.string.unescapeEntities(a));
  a.length > b && (a = a.substring(0, b - 3) + "...");
  c && (a = goog.string.htmlEscape(a));
  return a;
};
goog.string.truncateMiddle = function(a, b, c, d) {
  c && (a = goog.string.unescapeEntities(a));
  if (d && a.length > b) {
    d > b && (d = b);
    var e = a.length - d;
    a = a.substring(0, b - d) + "..." + a.substring(e);
  } else {
    a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e));
  }
  c && (a = goog.string.htmlEscape(a));
  return a;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\", "<":"<"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = String(a);
  for (var b = ['"'], c = 0; c < a.length; c++) {
    var d = a.charAt(c), e = d.charCodeAt(0);
    b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d));
  }
  b.push('"');
  return b.join("");
};
goog.string.escapeString = function(a) {
  for (var b = [], c = 0; c < a.length; c++) {
    b[c] = goog.string.escapeChar(a.charAt(c));
  }
  return b.join("");
};
goog.string.escapeChar = function(a) {
  if (a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a];
  }
  if (a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a];
  }
  var b = a.charCodeAt(0);
  if (31 < b && 127 > b) {
    var c = a;
  } else {
    if (256 > b) {
      if (c = "\\x", 16 > b || 256 < b) {
        c += "0";
      }
    } else {
      c = "\\u", 4096 > b && (c += "0");
    }
    c += b.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[a] = c;
};
goog.string.contains = function(a, b) {
  return -1 != a.indexOf(b);
};
goog.string.caseInsensitiveContains = function(a, b) {
  return goog.string.contains(a.toLowerCase(), b.toLowerCase());
};
goog.string.countOf = function(a, b) {
  return a && b ? a.split(b).length - 1 : 0;
};
goog.string.removeAt = function(a, b, c) {
  var d = a;
  0 <= b && b < a.length && 0 < c && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
  return d;
};
goog.string.remove = function(a, b) {
  return a.replace(b, "");
};
goog.string.removeAll = function(a, b) {
  b = new RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(b, "");
};
goog.string.replaceAll = function(a, b, c) {
  b = new RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(b, c.replace(/\$/g, "$$$$"));
};
goog.string.regExpEscape = function(a) {
  return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = String.prototype.repeat ? function(a, b) {
  return a.repeat(b);
} : function(a, b) {
  return Array(b + 1).join(a);
};
goog.string.padNumber = function(a, b, c) {
  a = goog.isDef(c) ? a.toFixed(c) : String(a);
  c = a.indexOf(".");
  -1 == c && (c = a.length);
  return goog.string.repeat("0", Math.max(0, b - c)) + a;
};
goog.string.makeSafe = function(a) {
  return null == a ? "" : String(a);
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function(a, b) {
  var c = 0;
  a = goog.string.trim(String(a)).split(".");
  b = goog.string.trim(String(b)).split(".");
  for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
    var f = a[e] || "", g = b[e] || "";
    do {
      f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
      g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
      if (0 == f[0].length && 0 == g[0].length) {
        break;
      }
      var c = 0 == f[1].length ? 0 : parseInt(f[1], 10), h = 0 == g[1].length ? 0 : parseInt(g[1], 10), c = goog.string.compareElements_(c, h) || goog.string.compareElements_(0 == f[2].length, 0 == g[2].length) || goog.string.compareElements_(f[2], g[2]), f = f[3], g = g[3];
    } while (0 == c);
  }
  return c;
};
goog.string.compareElements_ = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
};
goog.string.hashCode = function(a) {
  for (var b = 0, c = 0; c < a.length; ++c) {
    b = 31 * b + a.charCodeAt(c) >>> 0;
  }
  return b;
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function(a) {
  var b = Number(a);
  return 0 == b && goog.string.isEmptyOrWhitespace(a) ? NaN : b;
};
goog.string.isLowerCamelCase = function(a) {
  return /^[a-z]+([A-Z][a-z]*)*$/.test(a);
};
goog.string.isUpperCamelCase = function(a) {
  return /^([A-Z][a-z]*)+$/.test(a);
};
goog.string.toCamelCase = function(a) {
  return String(a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase();
  });
};
goog.string.toSelectorCase = function(a) {
  return String(a).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function(a, b) {
  b = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
  return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function(a, b, e) {
    return b + e.toUpperCase();
  });
};
goog.string.capitalize = function(a) {
  return String(a.charAt(0)).toUpperCase() + String(a.substr(1)).toLowerCase();
};
goog.string.parseInt = function(a) {
  isFinite(a) && (a = String(a));
  return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN;
};
goog.string.splitLimit = function(a, b, c) {
  a = a.split(b);
  for (var d = []; 0 < c && a.length;) {
    d.push(a.shift()), c--;
  }
  a.length && d.push(a.join(b));
  return d;
};
goog.string.lastComponent = function(a, b) {
  if (b) {
    "string" == typeof b && (b = [b]);
  } else {
    return a;
  }
  for (var c = -1, d = 0; d < b.length; d++) {
    if ("" != b[d]) {
      var e = a.lastIndexOf(b[d]);
      e > c && (c = e);
    }
  }
  return -1 == c ? a : a.slice(c + 1);
};
goog.string.editDistance = function(a, b) {
  var c = [], d = [];
  if (a == b) {
    return 0;
  }
  if (!a.length || !b.length) {
    return Math.max(a.length, b.length);
  }
  for (var e = 0; e < b.length + 1; e++) {
    c[e] = e;
  }
  for (e = 0; e < a.length; e++) {
    d[0] = e + 1;
    for (var f = 0; f < b.length; f++) {
      d[f + 1] = Math.min(d[f] + 1, c[f + 1] + 1, c[f] + Number(a[e] != b[f]));
    }
    for (f = 0; f < c.length; f++) {
      c[f] = d[f];
    }
  }
  return d[b.length];
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
  b.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, b));
  b.shift();
  this.messagePattern = a;
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(a) {
  throw a;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
  var e = "Assertion failed";
  if (c) {
    e += ": " + c;
    var f = d;
  } else {
    a && (e += ": " + a, f = b);
  }
  a = new goog.asserts.AssertionError("" + e, f || []);
  goog.asserts.errorHandler_(a);
};
goog.asserts.setErrorHandler = function(a) {
  goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = a);
};
goog.asserts.assert = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.fail = function(a, b) {
  goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)));
};
goog.asserts.assertNumber = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertString = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertFunction = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertObject = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertArray = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertBoolean = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertElement = function(a, b, c) {
  !goog.asserts.ENABLE_ASSERTS || goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a;
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
  !goog.asserts.ENABLE_ASSERTS || a instanceof b || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [goog.asserts.getType_(b), goog.asserts.getType_(a)], c, Array.prototype.slice.call(arguments, 3));
  return a;
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
  for (var a in Object.prototype) {
    goog.asserts.fail(a + " should not be enumerable in Object.prototype.");
  }
};
goog.asserts.getType_ = function(a) {
  return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a;
};
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
  var a = goog.labs.userAgent.util.getNavigator_();
  return a && (a = a.userAgent) ? a : "";
};
goog.labs.userAgent.util.getNavigator_ = function() {
  return goog.global.navigator;
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function(a) {
  goog.labs.userAgent.util.userAgent_ = a || goog.labs.userAgent.util.getNativeUserAgentString_();
};
goog.labs.userAgent.util.getUserAgent = function() {
  return goog.labs.userAgent.util.userAgent_;
};
goog.labs.userAgent.util.matchUserAgent = function(a) {
  var b = goog.labs.userAgent.util.getUserAgent();
  return goog.string.contains(b, a);
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(a) {
  var b = goog.labs.userAgent.util.getUserAgent();
  return goog.string.caseInsensitiveContains(b, a);
};
goog.labs.userAgent.util.extractVersionTuples = function(a) {
  for (var b = /(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g, c = [], d; d = b.exec(a);) {
    c.push([d[1], d[2], d[3] || void 0]);
  }
  return c;
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function(a) {
  return a[a.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.indexOf.call(a, b, c);
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if (goog.isString(a)) {
    return goog.isString(b) && 1 == b.length ? a.indexOf(b, c) : -1;
  }
  for (; c < a.length; c++) {
    if (c in a && a[c] === b) {
      return c;
    }
  }
  return -1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.lastIndexOf.call(a, b, null == c ? a.length - 1 : c);
} : function(a, b, c) {
  c = null == c ? a.length - 1 : c;
  0 > c && (c = Math.max(0, a.length + c));
  if (goog.isString(a)) {
    return goog.isString(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
  }
  for (; 0 <= c; c--) {
    if (c in a && a[c] === b) {
      return c;
    }
  }
  return -1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  Array.prototype.forEach.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) {
    f in e && b.call(c, e[f], f, a);
  }
};
goog.array.forEachRight = function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; --d) {
    d in e && b.call(c, e[d], d, a);
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.filter.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0; h < d; h++) {
    if (h in g) {
      var k = g[h];
      b.call(c, k, h, a) && (e[f++] = k);
    }
  }
  return e;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.map.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0; g < d; g++) {
    g in f && (e[g] = b.call(c, f[g], g, a));
  }
  return e;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  d && (b = goog.bind(b, d));
  return Array.prototype.reduce.call(a, b, c);
} : function(a, b, c, d) {
  var e = c;
  goog.array.forEach(a, function(c, g) {
    e = b.call(d, e, c, g, a);
  });
  return e;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  goog.asserts.assert(null != b);
  d && (b = goog.bind(b, d));
  return Array.prototype.reduceRight.call(a, b, c);
} : function(a, b, c, d) {
  var e = c;
  goog.array.forEachRight(a, function(c, g) {
    e = b.call(d, e, c, g, a);
  });
  return e;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.some.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) {
    if (f in e && b.call(c, e[f], f, a)) {
      return !0;
    }
  }
  return !1;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.every.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) {
    if (f in e && !b.call(c, e[f], f, a)) {
      return !1;
    }
  }
  return !0;
};
goog.array.count = function(a, b, c) {
  var d = 0;
  goog.array.forEach(a, function(a, f, g) {
    b.call(c, a, f, g) && ++d;
  }, c);
  return d;
};
goog.array.find = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
};
goog.array.findIndex = function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0; f < d; f++) {
    if (f in e && b.call(c, e[f], f, a)) {
      return f;
    }
  }
  return -1;
};
goog.array.findRight = function(a, b, c) {
  b = goog.array.findIndexRight(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
};
goog.array.findIndexRight = function(a, b, c) {
  for (var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; d--) {
    if (d in e && b.call(c, e[d], d, a)) {
      return d;
    }
  }
  return -1;
};
goog.array.contains = function(a, b) {
  return 0 <= goog.array.indexOf(a, b);
};
goog.array.isEmpty = function(a) {
  return 0 == a.length;
};
goog.array.clear = function(a) {
  if (!goog.isArray(a)) {
    for (var b = a.length - 1; 0 <= b; b--) {
      delete a[b];
    }
  }
  a.length = 0;
};
goog.array.insert = function(a, b) {
  goog.array.contains(a, b) || a.push(b);
};
goog.array.insertAt = function(a, b, c) {
  goog.array.splice(a, c, 0, b);
};
goog.array.insertArrayAt = function(a, b, c) {
  goog.partial(goog.array.splice, a, c, 0).apply(null, b);
};
goog.array.insertBefore = function(a, b, c) {
  var d;
  2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d);
};
goog.array.remove = function(a, b) {
  b = goog.array.indexOf(a, b);
  var c;
  (c = 0 <= b) && goog.array.removeAt(a, b);
  return c;
};
goog.array.removeLast = function(a, b) {
  b = goog.array.lastIndexOf(a, b);
  return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1;
};
goog.array.removeAt = function(a, b) {
  goog.asserts.assert(null != a.length);
  return 1 == Array.prototype.splice.call(a, b, 1).length;
};
goog.array.removeIf = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1;
};
goog.array.removeAllIf = function(a, b, c) {
  var d = 0;
  goog.array.forEachRight(a, function(e, f) {
    b.call(c, e, f, a) && goog.array.removeAt(a, f) && d++;
  });
  return d;
};
goog.array.concat = function(a) {
  return Array.prototype.concat.apply([], arguments);
};
goog.array.join = function(a) {
  return Array.prototype.concat.apply([], arguments);
};
goog.array.toArray = function(a) {
  var b = a.length;
  if (0 < b) {
    for (var c = Array(b), d = 0; d < b; d++) {
      c[d] = a[d];
    }
    return c;
  }
  return [];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (goog.isArrayLike(d)) {
      var e = a.length || 0, f = d.length || 0;
      a.length = e + f;
      for (var g = 0; g < f; g++) {
        a[e + g] = d[g];
      }
    } else {
      a.push(d);
    }
  }
};
goog.array.splice = function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.splice.apply(a, goog.array.slice(arguments, 1));
};
goog.array.slice = function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c);
};
goog.array.removeDuplicates = function(a, b, c) {
  b = b || a;
  var d = function(a) {
    return goog.isObject(a) ? "o" + goog.getUid(a) : (typeof a).charAt(0) + a;
  };
  c = c || d;
  for (var d = {}, e = 0, f = 0; f < a.length;) {
    var g = a[f++], h = c(g);
    Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, b[e++] = g);
  }
  b.length = e;
};
goog.array.binarySearch = function(a, b, c) {
  return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b);
};
goog.array.binarySelect = function(a, b, c) {
  return goog.array.binarySearch_(a, b, !0, void 0, c);
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
  for (var f = 0, g = a.length, h; f < g;) {
    var k = f + g >> 1;
    var l = c ? b.call(e, a[k], k, a) : b(d, a[k]);
    0 < l ? f = k + 1 : (g = k, h = !l);
  }
  return h ? f : ~f;
};
goog.array.sort = function(a, b) {
  a.sort(b || goog.array.defaultCompare);
};
goog.array.stableSort = function(a, b) {
  for (var c = Array(a.length), d = 0; d < a.length; d++) {
    c[d] = {index:d, value:a[d]};
  }
  var e = b || goog.array.defaultCompare;
  goog.array.sort(c, function(a, b) {
    return e(a.value, b.value) || a.index - b.index;
  });
  for (d = 0; d < a.length; d++) {
    a[d] = c[d].value;
  }
};
goog.array.sortByKey = function(a, b, c) {
  var d = c || goog.array.defaultCompare;
  goog.array.sort(a, function(a, c) {
    return d(b(a), b(c));
  });
};
goog.array.sortObjectsByKey = function(a, b, c) {
  goog.array.sortByKey(a, function(a) {
    return a[b];
  }, c);
};
goog.array.isSorted = function(a, b, c) {
  b = b || goog.array.defaultCompare;
  for (var d = 1; d < a.length; d++) {
    var e = b(a[d - 1], a[d]);
    if (0 < e || 0 == e && c) {
      return !1;
    }
  }
  return !0;
};
goog.array.equals = function(a, b, c) {
  if (!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
    return !1;
  }
  var d = a.length;
  c = c || goog.array.defaultCompareEquality;
  for (var e = 0; e < d; e++) {
    if (!c(a[e], b[e])) {
      return !1;
    }
  }
  return !0;
};
goog.array.compare3 = function(a, b, c) {
  c = c || goog.array.defaultCompare;
  for (var d = Math.min(a.length, b.length), e = 0; e < d; e++) {
    var f = c(a[e], b[e]);
    if (0 != f) {
      return f;
    }
  }
  return goog.array.defaultCompare(a.length, b.length);
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
};
goog.array.inverseDefaultCompare = function(a, b) {
  return -goog.array.defaultCompare(a, b);
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b;
};
goog.array.binaryInsert = function(a, b, c) {
  c = goog.array.binarySearch(a, b, c);
  return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1;
};
goog.array.binaryRemove = function(a, b, c) {
  b = goog.array.binarySearch(a, b, c);
  return 0 <= b ? goog.array.removeAt(a, b) : !1;
};
goog.array.bucket = function(a, b, c) {
  for (var d = {}, e = 0; e < a.length; e++) {
    var f = a[e], g = b.call(c, f, e, a);
    goog.isDef(g) && (d[g] || (d[g] = [])).push(f);
  }
  return d;
};
goog.array.toObject = function(a, b, c) {
  var d = {};
  goog.array.forEach(a, function(e, f) {
    d[b.call(c, e, f, a)] = e;
  });
  return d;
};
goog.array.range = function(a, b, c) {
  var d = [], e = 0, f = a;
  c = c || 1;
  void 0 !== b && (e = a, f = b);
  if (0 > c * (f - e)) {
    return [];
  }
  if (0 < c) {
    for (a = e; a < f; a += c) {
      d.push(a);
    }
  } else {
    for (a = e; a > f; a += c) {
      d.push(a);
    }
  }
  return d;
};
goog.array.repeat = function(a, b) {
  for (var c = [], d = 0; d < b; d++) {
    c[d] = a;
  }
  return c;
};
goog.array.flatten = function(a) {
  for (var b = [], c = 0; c < arguments.length; c++) {
    var d = arguments[c];
    if (goog.isArray(d)) {
      for (var e = 0; e < d.length; e += 8192) {
        for (var f = goog.array.slice(d, e, e + 8192), f = goog.array.flatten.apply(null, f), g = 0; g < f.length; g++) {
          b.push(f[g]);
        }
      }
    } else {
      b.push(d);
    }
  }
  return b;
};
goog.array.rotate = function(a, b) {
  goog.asserts.assert(null != a.length);
  a.length && (b %= a.length, 0 < b ? Array.prototype.unshift.apply(a, a.splice(-b, b)) : 0 > b && Array.prototype.push.apply(a, a.splice(0, -b)));
  return a;
};
goog.array.moveItem = function(a, b, c) {
  goog.asserts.assert(0 <= b && b < a.length);
  goog.asserts.assert(0 <= c && c < a.length);
  b = Array.prototype.splice.call(a, b, 1);
  Array.prototype.splice.call(a, c, 0, b[0]);
};
goog.array.zip = function(a) {
  if (!arguments.length) {
    return [];
  }
  for (var b = [], c = arguments[0].length, d = 1; d < arguments.length; d++) {
    arguments[d].length < c && (c = arguments[d].length);
  }
  for (d = 0; d < c; d++) {
    for (var e = [], f = 0; f < arguments.length; f++) {
      e.push(arguments[f][d]);
    }
    b.push(e);
  }
  return b;
};
goog.array.shuffle = function(a, b) {
  b = b || Math.random;
  for (var c = a.length - 1; 0 < c; c--) {
    var d = Math.floor(b() * (c + 1)), e = a[c];
    a[c] = a[d];
    a[d] = e;
  }
};
goog.array.copyByIndex = function(a, b) {
  var c = [];
  goog.array.forEach(b, function(b) {
    c.push(a[b]);
  });
  return c;
};
goog.array.concatMap = function(a, b, c) {
  return goog.array.concat.apply([], goog.array.map(a, b, c));
};
goog.debug.LogBuffer = function() {
  goog.asserts.assert(goog.debug.LogBuffer.isBufferingEnabled(), "Cannot use goog.debug.LogBuffer without defining goog.debug.LogBuffer.CAPACITY.");
  this.clear();
};
goog.debug.LogBuffer.getInstance = function() {
  goog.debug.LogBuffer.instance_ || (goog.debug.LogBuffer.instance_ = new goog.debug.LogBuffer);
  return goog.debug.LogBuffer.instance_;
};
goog.debug.LogBuffer.CAPACITY = 0;
goog.debug.LogBuffer.prototype.addRecord = function(a, b, c) {
  var d = (this.curIndex_ + 1) % goog.debug.LogBuffer.CAPACITY;
  this.curIndex_ = d;
  if (this.isFull_) {
    return d = this.buffer_[d], d.reset(a, b, c), d;
  }
  this.isFull_ = d == goog.debug.LogBuffer.CAPACITY - 1;
  return this.buffer_[d] = new goog.debug.LogRecord(a, b, c);
};
goog.debug.LogBuffer.isBufferingEnabled = function() {
  return 0 < goog.debug.LogBuffer.CAPACITY;
};
goog.debug.LogBuffer.prototype.clear = function() {
  this.buffer_ = Array(goog.debug.LogBuffer.CAPACITY);
  this.curIndex_ = -1;
  this.isFull_ = !1;
};
goog.debug.LogBuffer.prototype.forEachRecord = function(a) {
  var b = this.buffer_;
  if (b[0]) {
    var c = this.curIndex_, d = this.isFull_ ? c : -1;
    do {
      d = (d + 1) % goog.debug.LogBuffer.CAPACITY, a(b[d]);
    } while (d != c);
  }
};
goog.labs.userAgent.platform = {};
goog.labs.userAgent.platform.isAndroid = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android");
};
goog.labs.userAgent.platform.isIpod = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPod");
};
goog.labs.userAgent.platform.isIphone = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIpad = function() {
  return goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIos = function() {
  return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod();
};
goog.labs.userAgent.platform.isMacintosh = function() {
  return goog.labs.userAgent.util.matchUserAgent("Macintosh");
};
goog.labs.userAgent.platform.isLinux = function() {
  return goog.labs.userAgent.util.matchUserAgent("Linux");
};
goog.labs.userAgent.platform.isWindows = function() {
  return goog.labs.userAgent.util.matchUserAgent("Windows");
};
goog.labs.userAgent.platform.isChromeOS = function() {
  return goog.labs.userAgent.util.matchUserAgent("CrOS");
};
goog.labs.userAgent.platform.getVersion = function() {
  var a = goog.labs.userAgent.util.getUserAgent();
  var b = "";
  goog.labs.userAgent.platform.isWindows() ? (b = /Windows (?:NT|Phone) ([0-9.]+)/, b = (a = b.exec(a)) ? a[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (b = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, b = (a = b.exec(a)) && a[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (b = /Mac OS X ([0-9_.]+)/, b = (a = b.exec(a)) ? a[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (b = /Android\s+([^\);]+)(\)|;)/, b = (a = b.exec(a)) && a[1]) : goog.labs.userAgent.platform.isChromeOS() && 
  (b = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, b = (a = b.exec(a)) && a[1]);
  return b || "";
};
goog.labs.userAgent.platform.isVersionOrHigher = function(a) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), a);
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Opera");
};
goog.labs.userAgent.browser.matchIE_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.browser.matchEdge_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.browser.matchFirefox_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Firefox");
};
goog.labs.userAgent.browser.matchSafari_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"));
};
goog.labs.userAgent.browser.matchCoast_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Coast");
};
goog.labs.userAgent.browser.matchIosWebview_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit");
};
goog.labs.userAgent.browser.matchChrome_ = function() {
  return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchEdge_();
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
  return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk());
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
  return goog.labs.userAgent.util.matchUserAgent("Silk");
};
goog.labs.userAgent.browser.getVersion = function() {
  function a(a) {
    a = goog.array.find(a, d);
    return c[a] || "";
  }
  var b = goog.labs.userAgent.util.getUserAgent();
  if (goog.labs.userAgent.browser.isIE()) {
    return goog.labs.userAgent.browser.getIEVersion_(b);
  }
  var b = goog.labs.userAgent.util.extractVersionTuples(b), c = {};
  goog.array.forEach(b, function(a) {
    c[a[0]] = a[1];
  });
  var d = goog.partial(goog.object.containsKey, c);
  return goog.labs.userAgent.browser.isOpera() ? a(["Version", "Opera"]) : goog.labs.userAgent.browser.isEdge() ? a(["Edge"]) : goog.labs.userAgent.browser.isChrome() ? a(["Chrome", "CriOS"]) : (b = b[2]) && b[1] || "";
};
goog.labs.userAgent.browser.isVersionOrHigher = function(a) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), a);
};
goog.labs.userAgent.browser.getIEVersion_ = function(a) {
  var b = /rv: *([\d\.]*)/.exec(a);
  if (b && b[1]) {
    return b[1];
  }
  var b = "", c = /MSIE +([\d\.]+)/.exec(a);
  if (c && c[1]) {
    if (a = /Trident\/(\d.\d)/.exec(a), "7.0" == c[1]) {
      if (a && a[1]) {
        switch(a[1]) {
          case "4.0":
            b = "8.0";
            break;
          case "5.0":
            b = "9.0";
            break;
          case "6.0":
            b = "10.0";
            break;
          case "7.0":
            b = "11.0";
        }
      } else {
        b = "7.0";
      }
    } else {
      b = c[1];
    }
  }
  return b;
};
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function() {
  return goog.labs.userAgent.util.matchUserAgent("Presto");
};
goog.labs.userAgent.engine.isTrident = function() {
  return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.engine.isEdge = function() {
  return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.engine.isWebKit = function() {
  return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.isGecko = function() {
  return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.getVersion = function() {
  var a = goog.labs.userAgent.util.getUserAgent();
  if (a) {
    var a = goog.labs.userAgent.util.extractVersionTuples(a), b = goog.labs.userAgent.engine.getEngineTuple_(a);
    if (b) {
      return "Gecko" == b[0] ? goog.labs.userAgent.engine.getVersionForKey_(a, "Firefox") : b[1];
    }
    var a = a[0], c;
    if (a && (c = a[2]) && (c = /Trident\/([^\s;]+)/.exec(c))) {
      return c[1];
    }
  }
  return "";
};
goog.labs.userAgent.engine.getEngineTuple_ = function(a) {
  if (!goog.labs.userAgent.engine.isEdge()) {
    return a[1];
  }
  for (var b = 0; b < a.length; b++) {
    var c = a[b];
    if ("Edge" == c[0]) {
      return c;
    }
  }
};
goog.labs.userAgent.engine.isVersionOrHigher = function(a) {
  return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), a);
};
goog.labs.userAgent.engine.getVersionForKey_ = function(a, b) {
  return (a = goog.array.find(a, function(a) {
    return b == a[0];
  })) && a[1] || "";
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_EDGE = !1;
goog.userAgent.ASSUME_GECKO = !0;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.labs.userAgent.util.getUserAgent();
};
goog.userAgent.getNavigator = function() {
  return goog.global.navigator || null;
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function() {
  return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var a = goog.userAgent.getNavigator();
  return a && a.platform || "";
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.ASSUME_IPOD = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_ = function() {
  return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS();
};
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.isX11_ = function() {
  var a = goog.userAgent.getNavigator();
  return !!a && goog.string.contains(a.appVersion || "", "X11");
};
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.IPOD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIpod();
goog.userAgent.IOS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD || goog.userAgent.ASSUME_IPOD : goog.labs.userAgent.platform.isIos();
goog.userAgent.determineVersion_ = function() {
  var a = "", b = goog.userAgent.getVersionRegexResult_();
  b && (a = b ? b[1] : "");
  return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), null != b && b > parseFloat(a)) ? String(b) : a;
};
goog.userAgent.getVersionRegexResult_ = function() {
  var a = goog.userAgent.getUserAgentString();
  if (goog.userAgent.GECKO) {
    return /rv\:([^\);]+)(\)|;)/.exec(a);
  }
  if (goog.userAgent.EDGE) {
    return /Edge\/([\d\.]+)/.exec(a);
  }
  if (goog.userAgent.IE) {
    return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
  }
  if (goog.userAgent.WEBKIT) {
    return /WebKit\/(\S+)/.exec(a);
  }
  if (goog.userAgent.OPERA) {
    return /(?:Version)[ \/]?(\S+)/.exec(a);
  }
};
goog.userAgent.getDocumentMode_ = function() {
  var a = goog.global.document;
  return a ? a.documentMode : void 0;
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
  return goog.string.compareVersions(a, b);
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function(a) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_, a, function() {
    return 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a);
  });
};
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function(a) {
  return Number(goog.userAgent.DOCUMENT_MODE) >= a;
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
goog.userAgent.DOCUMENT_MODE = function() {
  var a = goog.global.document, b = goog.userAgent.getDocumentMode_();
  if (a && goog.userAgent.IE) {
    return b || ("CSS1Compat" == a.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5);
  }
}();
goog.debug.LOGGING_ENABLED = goog.DEBUG;
goog.debug.FORCE_SLOPPY_STACKS = !1;
goog.debug.catchErrors = function(a, b, c) {
  c = c || goog.global;
  var d = c.onerror, e = !!b;
  goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher("535.3") && (e = !e);
  c.onerror = function(b, c, h, k, l) {
    d && d(b, c, h, k, l);
    a({message:b, fileName:c, line:h, col:k, error:l});
    return e;
  };
};
goog.debug.expose = function(a, b) {
  if ("undefined" == typeof a) {
    return "undefined";
  }
  if (null == a) {
    return "NULL";
  }
  var c = [], d;
  for (d in a) {
    if (b || !goog.isFunction(a[d])) {
      var e = d + " = ";
      try {
        e += a[d];
      } catch (f) {
        e += "*** " + f + " ***";
      }
      c.push(e);
    }
  }
  return c.join("\n");
};
goog.debug.deepExpose = function(a, b) {
  var c = [], d = [], e = {}, f = function(a, h) {
    var g = h + "  ";
    try {
      if (goog.isDef(a)) {
        if (goog.isNull(a)) {
          c.push("NULL");
        } else {
          if (goog.isString(a)) {
            c.push('"' + a.replace(/\n/g, "\n" + h) + '"');
          } else {
            if (goog.isFunction(a)) {
              c.push(String(a).replace(/\n/g, "\n" + h));
            } else {
              if (goog.isObject(a)) {
                goog.hasUid(a) || d.push(a);
                var l = goog.getUid(a);
                if (e[l]) {
                  c.push("*** reference loop detected (id=" + l + ") ***");
                } else {
                  e[l] = !0;
                  c.push("{");
                  for (var m in a) {
                    if (b || !goog.isFunction(a[m])) {
                      c.push("\n"), c.push(g), c.push(m + " = "), f(a[m], g);
                    }
                  }
                  c.push("\n" + h + "}");
                  delete e[l];
                }
              } else {
                c.push(a);
              }
            }
          }
        }
      } else {
        c.push("undefined");
      }
    } catch (n) {
      c.push("*** " + n + " ***");
    }
  };
  f(a, "");
  for (a = 0; a < d.length; a++) {
    goog.removeUid(d[a]);
  }
  return c.join("");
};
goog.debug.exposeArray = function(a) {
  for (var b = [], c = 0; c < a.length; c++) {
    goog.isArray(a[c]) ? b.push(goog.debug.exposeArray(a[c])) : b.push(a[c]);
  }
  return "[ " + b.join(", ") + " ]";
};
goog.debug.normalizeErrorObject = function(a) {
  var b = goog.getObjectByName("window.location.href");
  if (goog.isString(a)) {
    return {message:a, name:"Unknown error", lineNumber:"Not available", fileName:b, stack:"Not available"};
  }
  var c = !1;
  try {
    var d = a.lineNumber || a.line || "Not available";
  } catch (f) {
    d = "Not available", c = !0;
  }
  try {
    var e = a.fileName || a.filename || a.sourceURL || goog.global.$googDebugFname || b;
  } catch (f) {
    e = "Not available", c = !0;
  }
  return !c && a.lineNumber && a.fileName && a.stack && a.message && a.name ? a : {message:a.message || "Not available", name:a.name || "UnknownError", lineNumber:d, fileName:e, stack:a.stack || "Not available"};
};
goog.debug.enhanceError = function(a, b) {
  a instanceof Error || (a = Error(a), Error.captureStackTrace && Error.captureStackTrace(a, goog.debug.enhanceError));
  a.stack || (a.stack = goog.debug.getStacktrace(goog.debug.enhanceError));
  if (b) {
    for (var c = 0; a["message" + c];) {
      ++c;
    }
    a["message" + c] = String(b);
  }
  return a;
};
goog.debug.getStacktraceSimple = function(a) {
  if (!goog.debug.FORCE_SLOPPY_STACKS) {
    var b = goog.debug.getNativeStackTrace_(goog.debug.getStacktraceSimple);
    if (b) {
      return b;
    }
  }
  for (var b = [], c = arguments.callee.caller, d = 0; c && (!a || d < a);) {
    b.push(goog.debug.getFunctionName(c));
    b.push("()\n");
    try {
      c = c.caller;
    } catch (e) {
      b.push("[exception trying to get caller]\n");
      break;
    }
    d++;
    if (d >= goog.debug.MAX_STACK_DEPTH) {
      b.push("[...long stack...]");
      break;
    }
  }
  a && d >= a ? b.push("[...reached max depth limit...]") : b.push("[end]");
  return b.join("");
};
goog.debug.MAX_STACK_DEPTH = 50;
goog.debug.getNativeStackTrace_ = function(a) {
  var b = Error();
  if (Error.captureStackTrace) {
    return Error.captureStackTrace(b, a), String(b.stack);
  }
  try {
    throw b;
  } catch (c) {
    b = c;
  }
  return (a = b.stack) ? String(a) : null;
};
goog.debug.getStacktrace = function(a) {
  var b;
  goog.debug.FORCE_SLOPPY_STACKS || (b = goog.debug.getNativeStackTrace_(a || goog.debug.getStacktrace));
  b || (b = goog.debug.getStacktraceHelper_(a || arguments.callee.caller, []));
  return b;
};
goog.debug.getStacktraceHelper_ = function(a, b) {
  var c = [];
  if (goog.array.contains(b, a)) {
    c.push("[...circular reference...]");
  } else {
    if (a && b.length < goog.debug.MAX_STACK_DEPTH) {
      c.push(goog.debug.getFunctionName(a) + "(");
      for (var d = a.arguments, e = 0; d && e < d.length; e++) {
        0 < e && c.push(", ");
        var f = d[e];
        switch(typeof f) {
          case "object":
            f = f ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            f = String(f);
            break;
          case "boolean":
            f = f ? "true" : "false";
            break;
          case "function":
            f = (f = goog.debug.getFunctionName(f)) ? f : "[fn]";
            break;
          default:
            f = typeof f;
        }
        40 < f.length && (f = f.substr(0, 40) + "...");
        c.push(f);
      }
      b.push(a);
      c.push(")\n");
      try {
        c.push(goog.debug.getStacktraceHelper_(a.caller, b));
      } catch (g) {
        c.push("[exception trying to get caller]\n");
      }
    } else {
      a ? c.push("[...long stack...]") : c.push("[end]");
    }
  }
  return c.join("");
};
goog.debug.setFunctionResolver = function(a) {
  goog.debug.fnNameResolver_ = a;
};
goog.debug.getFunctionName = function(a) {
  if (goog.debug.fnNameCache_[a]) {
    return goog.debug.fnNameCache_[a];
  }
  if (goog.debug.fnNameResolver_) {
    var b = goog.debug.fnNameResolver_(a);
    if (b) {
      return goog.debug.fnNameCache_[a] = b;
    }
  }
  a = String(a);
  goog.debug.fnNameCache_[a] || (b = /function ([^\(]+)/.exec(a), goog.debug.fnNameCache_[a] = b ? b[1] : "[Anonymous]");
  return goog.debug.fnNameCache_[a];
};
goog.debug.makeWhitespaceVisible = function(a) {
  return a.replace(/ /g, "[_]").replace(/\f/g, "[f]").replace(/\n/g, "[n]\n").replace(/\r/g, "[r]").replace(/\t/g, "[t]");
};
goog.debug.runtimeType = function(a) {
  return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a;
};
goog.debug.fnNameCache_ = {};
goog.userAgent.product = {};
goog.userAgent.product.ASSUME_FIREFOX = !1;
goog.userAgent.product.ASSUME_IPHONE = !1;
goog.userAgent.product.ASSUME_IPAD = !1;
goog.userAgent.product.ASSUME_ANDROID = !1;
goog.userAgent.product.ASSUME_CHROME = !1;
goog.userAgent.product.ASSUME_SAFARI = !1;
goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
goog.userAgent.product.OPERA = goog.userAgent.OPERA;
goog.userAgent.product.IE = goog.userAgent.IE;
goog.userAgent.product.EDGE = goog.userAgent.EDGE;
goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.labs.userAgent.browser.isFirefox();
goog.userAgent.product.isIphoneOrIpod_ = function() {
  return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpod();
};
goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.isIphoneOrIpod_();
goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.labs.userAgent.browser.isAndroidBrowser();
goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.labs.userAgent.browser.isChrome();
goog.userAgent.product.isSafariDesktop_ = function() {
  return goog.labs.userAgent.browser.isSafari() && !goog.labs.userAgent.platform.isIos();
};
goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.isSafariDesktop_();
goog.debug.Logger = function(a) {
  this.name_ = a;
  this.handlers_ = this.children_ = this.level_ = this.parent_ = null;
};
goog.debug.Logger.ROOT_LOGGER_NAME = "";
goog.debug.Logger.ENABLE_HIERARCHY = !0;
goog.debug.Logger.ENABLE_HIERARCHY || (goog.debug.Logger.rootHandlers_ = []);
goog.debug.Logger.Level = function(a, b) {
  this.name = a;
  this.value = b;
};
goog.debug.Logger.Level.prototype.toString = function() {
  return this.name;
};
goog.debug.Logger.Level.OFF = new goog.debug.Logger.Level("OFF", Infinity);
goog.debug.Logger.Level.SHOUT = new goog.debug.Logger.Level("SHOUT", 1200);
goog.debug.Logger.Level.SEVERE = new goog.debug.Logger.Level("SEVERE", 1000);
goog.debug.Logger.Level.WARNING = new goog.debug.Logger.Level("WARNING", 900);
goog.debug.Logger.Level.INFO = new goog.debug.Logger.Level("INFO", 800);
goog.debug.Logger.Level.CONFIG = new goog.debug.Logger.Level("CONFIG", 700);
goog.debug.Logger.Level.FINE = new goog.debug.Logger.Level("FINE", 500);
goog.debug.Logger.Level.FINER = new goog.debug.Logger.Level("FINER", 400);
goog.debug.Logger.Level.FINEST = new goog.debug.Logger.Level("FINEST", 300);
goog.debug.Logger.Level.ALL = new goog.debug.Logger.Level("ALL", 0);
goog.debug.Logger.Level.PREDEFINED_LEVELS = [goog.debug.Logger.Level.OFF, goog.debug.Logger.Level.SHOUT, goog.debug.Logger.Level.SEVERE, goog.debug.Logger.Level.WARNING, goog.debug.Logger.Level.INFO, goog.debug.Logger.Level.CONFIG, goog.debug.Logger.Level.FINE, goog.debug.Logger.Level.FINER, goog.debug.Logger.Level.FINEST, goog.debug.Logger.Level.ALL];
goog.debug.Logger.Level.predefinedLevelsCache_ = null;
goog.debug.Logger.Level.createPredefinedLevelsCache_ = function() {
  goog.debug.Logger.Level.predefinedLevelsCache_ = {};
  for (var a = 0, b; b = goog.debug.Logger.Level.PREDEFINED_LEVELS[a]; a++) {
    goog.debug.Logger.Level.predefinedLevelsCache_[b.value] = b, goog.debug.Logger.Level.predefinedLevelsCache_[b.name] = b;
  }
};
goog.debug.Logger.Level.getPredefinedLevel = function(a) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  return goog.debug.Logger.Level.predefinedLevelsCache_[a] || null;
};
goog.debug.Logger.Level.getPredefinedLevelByValue = function(a) {
  goog.debug.Logger.Level.predefinedLevelsCache_ || goog.debug.Logger.Level.createPredefinedLevelsCache_();
  if (a in goog.debug.Logger.Level.predefinedLevelsCache_) {
    return goog.debug.Logger.Level.predefinedLevelsCache_[a];
  }
  for (var b = 0; b < goog.debug.Logger.Level.PREDEFINED_LEVELS.length; ++b) {
    var c = goog.debug.Logger.Level.PREDEFINED_LEVELS[b];
    if (c.value <= a) {
      return c;
    }
  }
  return null;
};
goog.debug.Logger.getLogger = function(a) {
  return goog.debug.LogManager.getLogger(a);
};
goog.debug.Logger.logToProfilers = function(a) {
  goog.global.console && (goog.global.console.timeStamp ? goog.global.console.timeStamp(a) : goog.global.console.markTimeline && goog.global.console.markTimeline(a));
  goog.global.msWriteProfilerMark && goog.global.msWriteProfilerMark(a);
};
goog.debug.Logger.prototype.getName = function() {
  return this.name_;
};
goog.debug.Logger.prototype.addHandler = function(a) {
  goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? (this.handlers_ || (this.handlers_ = []), this.handlers_.push(a)) : (goog.asserts.assert(!this.name_, "Cannot call addHandler on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootHandlers_.push(a)));
};
goog.debug.Logger.prototype.removeHandler = function(a) {
  if (goog.debug.LOGGING_ENABLED) {
    var b = goog.debug.Logger.ENABLE_HIERARCHY ? this.handlers_ : goog.debug.Logger.rootHandlers_;
    return !!b && goog.array.remove(b, a);
  }
  return !1;
};
goog.debug.Logger.prototype.getParent = function() {
  return this.parent_;
};
goog.debug.Logger.prototype.getChildren = function() {
  this.children_ || (this.children_ = {});
  return this.children_;
};
goog.debug.Logger.prototype.setLevel = function(a) {
  goog.debug.LOGGING_ENABLED && (goog.debug.Logger.ENABLE_HIERARCHY ? this.level_ = a : (goog.asserts.assert(!this.name_, "Cannot call setLevel() on a non-root logger when goog.debug.Logger.ENABLE_HIERARCHY is false."), goog.debug.Logger.rootLevel_ = a));
};
goog.debug.Logger.prototype.getLevel = function() {
  return goog.debug.LOGGING_ENABLED ? this.level_ : goog.debug.Logger.Level.OFF;
};
goog.debug.Logger.prototype.getEffectiveLevel = function() {
  if (!goog.debug.LOGGING_ENABLED) {
    return goog.debug.Logger.Level.OFF;
  }
  if (!goog.debug.Logger.ENABLE_HIERARCHY) {
    return goog.debug.Logger.rootLevel_;
  }
  if (this.level_) {
    return this.level_;
  }
  if (this.parent_) {
    return this.parent_.getEffectiveLevel();
  }
  goog.asserts.fail("Root logger has no level set.");
  return null;
};
goog.debug.Logger.prototype.isLoggable = function(a) {
  return goog.debug.LOGGING_ENABLED && a.value >= this.getEffectiveLevel().value;
};
goog.debug.Logger.prototype.log = function(a, b, c) {
  goog.debug.LOGGING_ENABLED && this.isLoggable(a) && (goog.isFunction(b) && (b = b()), this.doLogRecord_(this.getLogRecord(a, b, c)));
};
goog.debug.Logger.prototype.getLogRecord = function(a, b, c) {
  a = goog.debug.LogBuffer.isBufferingEnabled() ? goog.debug.LogBuffer.getInstance().addRecord(a, b, this.name_) : new goog.debug.LogRecord(a, String(b), this.name_);
  c && a.setException(c);
  return a;
};
goog.debug.Logger.prototype.shout = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SHOUT, a, b);
};
goog.debug.Logger.prototype.severe = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.SEVERE, a, b);
};
goog.debug.Logger.prototype.warning = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.WARNING, a, b);
};
goog.debug.Logger.prototype.info = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.INFO, a, b);
};
goog.debug.Logger.prototype.config = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.CONFIG, a, b);
};
goog.debug.Logger.prototype.fine = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINE, a, b);
};
goog.debug.Logger.prototype.finer = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINER, a, b);
};
goog.debug.Logger.prototype.finest = function(a, b) {
  goog.debug.LOGGING_ENABLED && this.log(goog.debug.Logger.Level.FINEST, a, b);
};
goog.debug.Logger.prototype.logRecord = function(a) {
  goog.debug.LOGGING_ENABLED && this.isLoggable(a.getLevel()) && this.doLogRecord_(a);
};
goog.debug.Logger.prototype.doLogRecord_ = function(a) {
  goog.debug.Logger.logToProfilers("log:" + a.getMessage());
  if (goog.debug.Logger.ENABLE_HIERARCHY) {
    for (var b = this; b;) {
      b.callPublish_(a), b = b.getParent();
    }
  } else {
    for (var b = 0, c; c = goog.debug.Logger.rootHandlers_[b++];) {
      c(a);
    }
  }
};
goog.debug.Logger.prototype.callPublish_ = function(a) {
  if (this.handlers_) {
    for (var b = 0, c; c = this.handlers_[b]; b++) {
      c(a);
    }
  }
};
goog.debug.Logger.prototype.setParent_ = function(a) {
  this.parent_ = a;
};
goog.debug.Logger.prototype.addChild_ = function(a, b) {
  this.getChildren()[a] = b;
};
goog.debug.LogManager = {};
goog.debug.LogManager.loggers_ = {};
goog.debug.LogManager.rootLogger_ = null;
goog.debug.LogManager.initialize = function() {
  goog.debug.LogManager.rootLogger_ || (goog.debug.LogManager.rootLogger_ = new goog.debug.Logger(goog.debug.Logger.ROOT_LOGGER_NAME), goog.debug.LogManager.loggers_[goog.debug.Logger.ROOT_LOGGER_NAME] = goog.debug.LogManager.rootLogger_, goog.debug.LogManager.rootLogger_.setLevel(goog.debug.Logger.Level.CONFIG));
};
goog.debug.LogManager.getLoggers = function() {
  return goog.debug.LogManager.loggers_;
};
goog.debug.LogManager.getRoot = function() {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.rootLogger_;
};
goog.debug.LogManager.getLogger = function(a) {
  goog.debug.LogManager.initialize();
  return goog.debug.LogManager.loggers_[a] || goog.debug.LogManager.createLogger_(a);
};
goog.debug.LogManager.createFunctionForCatchErrors = function(a) {
  return function(b) {
    (a || goog.debug.LogManager.getRoot()).severe("Error: " + b.message + " (" + b.fileName + " @ Line: " + b.line + ")");
  };
};
goog.debug.LogManager.createLogger_ = function(a) {
  var b = new goog.debug.Logger(a);
  if (goog.debug.Logger.ENABLE_HIERARCHY) {
    var c = a.lastIndexOf("."), d = a.substr(0, c), c = a.substr(c + 1), d = goog.debug.LogManager.getLogger(d);
    d.addChild_(c, b);
    b.setParent_(d);
  }
  return goog.debug.LogManager.loggers_[a] = b;
};
goog.userAgent.product.determineVersion_ = function() {
  if (goog.userAgent.product.FIREFOX) {
    return goog.userAgent.product.getFirstRegExpGroup_(/Firefox\/([0-9.]+)/);
  }
  if (goog.userAgent.product.IE || goog.userAgent.product.EDGE || goog.userAgent.product.OPERA) {
    return goog.userAgent.VERSION;
  }
  if (goog.userAgent.product.CHROME) {
    return goog.labs.userAgent.platform.isIos() ? goog.userAgent.product.getFirstRegExpGroup_(/CriOS\/([0-9.]+)/) : goog.userAgent.product.getFirstRegExpGroup_(/Chrome\/([0-9.]+)/);
  }
  if (goog.userAgent.product.SAFARI && !goog.labs.userAgent.platform.isIos()) {
    return goog.userAgent.product.getFirstRegExpGroup_(/Version\/([0-9.]+)/);
  }
  if (goog.userAgent.product.IPHONE || goog.userAgent.product.IPAD) {
    var a = goog.userAgent.product.execRegExp_(/Version\/(\S+).*Mobile\/(\S+)/);
    if (a) {
      return a[1] + "." + a[2];
    }
  } else {
    if (goog.userAgent.product.ANDROID) {
      return (a = goog.userAgent.product.getFirstRegExpGroup_(/Android\s+([0-9.]+)/)) ? a : goog.userAgent.product.getFirstRegExpGroup_(/Version\/([0-9.]+)/);
    }
  }
  return "";
};
goog.userAgent.product.getFirstRegExpGroup_ = function(a) {
  return (a = goog.userAgent.product.execRegExp_(a)) ? a[1] : "";
};
goog.userAgent.product.execRegExp_ = function(a) {
  return a.exec(goog.userAgent.getUserAgentString());
};
goog.userAgent.product.VERSION = goog.userAgent.product.determineVersion_();
goog.userAgent.product.isVersion = function(a) {
  return 0 <= goog.string.compareVersions(goog.userAgent.product.VERSION, a);
};
bot.userAgent = {};
bot.userAgent.isEngineVersion = function(a) {
  return bot.userAgent.FIREFOX_EXTENSION ? bot.userAgent.FIREFOX_EXTENSION_IS_ENGINE_VERSION_(a) : goog.userAgent.IE ? 0 <= goog.string.compareVersions(goog.userAgent.DOCUMENT_MODE, a) : goog.userAgent.isVersionOrHigher(a);
};
bot.userAgent.isProductVersion = function(a) {
  return bot.userAgent.FIREFOX_EXTENSION ? bot.userAgent.FIREFOX_EXTENSION_IS_PRODUCT_VERSION_(a) : goog.userAgent.product.ANDROID ? 0 <= goog.string.compareVersions(bot.userAgent.ANDROID_VERSION_, a) : goog.userAgent.product.isVersion(a);
};
bot.userAgent.FIREFOX_EXTENSION = function() {
  if (!goog.userAgent.GECKO) {
    return !1;
  }
  var a = goog.global.Components;
  if (!a) {
    return !1;
  }
  try {
    if (!a.classes) {
      return !1;
    }
  } catch (f) {
    return !1;
  }
  var b = a.classes, a = a.interfaces, c = b["@mozilla.org/xpcom/version-comparator;1"].getService(a.nsIVersionComparator), b = b["@mozilla.org/xre/app-info;1"].getService(a.nsIXULAppInfo), d = b.platformVersion, e = b.version;
  bot.userAgent.FIREFOX_EXTENSION_IS_ENGINE_VERSION_ = function(a) {
    return 0 <= c.compare(d, "" + a);
  };
  bot.userAgent.FIREFOX_EXTENSION_IS_PRODUCT_VERSION_ = function(a) {
    return 0 <= c.compare(e, "" + a);
  };
  return !0;
}();
bot.userAgent.WEBEXTENSION = function() {
  try {
    return !!(goog.global.chrome || goog.global.browser).extension;
  } catch (a) {
    return !1;
  }
}();
bot.userAgent.IOS = goog.userAgent.product.IPAD || goog.userAgent.product.IPHONE;
bot.userAgent.MOBILE = bot.userAgent.IOS || goog.userAgent.product.ANDROID;
bot.userAgent.ANDROID_VERSION_ = function() {
  if (goog.userAgent.product.ANDROID) {
    var a = goog.userAgent.getUserAgentString();
    return (a = /Android\s+([0-9\.]+)/.exec(a)) ? a[1] : "0";
  }
  return "0";
}();
bot.userAgent.IE_DOC_PRE8 = goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8);
bot.userAgent.IE_DOC_9 = goog.userAgent.isDocumentModeOrHigher(9);
bot.userAgent.IE_DOC_PRE9 = goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9);
bot.userAgent.IE_DOC_10 = goog.userAgent.isDocumentModeOrHigher(10);
bot.userAgent.IE_DOC_PRE10 = goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(10);
bot.userAgent.ANDROID_PRE_GINGERBREAD = goog.userAgent.product.ANDROID && !bot.userAgent.isProductVersion(2.3);
bot.userAgent.ANDROID_PRE_ICECREAMSANDWICH = goog.userAgent.product.ANDROID && !bot.userAgent.isProductVersion(4);
bot.userAgent.SAFARI_6 = goog.userAgent.product.SAFARI && bot.userAgent.isProductVersion(6);
bot.userAgent.WINDOWS_PHONE = goog.userAgent.IE && -1 != goog.userAgent.getUserAgentString().indexOf("IEMobile");
goog.log = {};
goog.log.ENABLED = goog.debug.LOGGING_ENABLED;
goog.log.ROOT_LOGGER_NAME = goog.debug.Logger.ROOT_LOGGER_NAME;
goog.log.Logger = goog.debug.Logger;
goog.log.Level = goog.debug.Logger.Level;
goog.log.LogRecord = goog.debug.LogRecord;
goog.log.getLogger = function(a, b) {
  return goog.log.ENABLED ? (a = goog.debug.LogManager.getLogger(a), b && a && a.setLevel(b), a) : null;
};
goog.log.addHandler = function(a, b) {
  goog.log.ENABLED && a && a.addHandler(b);
};
goog.log.removeHandler = function(a, b) {
  return goog.log.ENABLED && a ? a.removeHandler(b) : !1;
};
goog.log.log = function(a, b, c, d) {
  goog.log.ENABLED && a && a.log(b, c, d);
};
goog.log.error = function(a, b, c) {
  goog.log.ENABLED && a && a.severe(b, c);
};
goog.log.warning = function(a, b, c) {
  goog.log.ENABLED && a && a.warning(b, c);
};
goog.log.info = function(a, b, c) {
  goog.log.ENABLED && a && a.info(b, c);
};
goog.log.fine = function(a, b, c) {
  goog.log.ENABLED && a && a.fine(b, c);
};
fxdriver.moz = {};
var CC = Components.classes, CI = Components.interfaces, CR = Components.results, CU = Components.utils;
fxdriver.moz.load = function(a) {
  Components.utils["import"]("resource://gre/modules/XPCOMUtils.jsm");
};
fxdriver.moz.getService = function(a, b) {
  var c = CC[a];
  if (void 0 == c) {
    throw Error("Cannot create component " + a);
  }
  return c.getService(CI[b]);
};
fxdriver.moz.queryInterface = function(a, b) {
  return function(c) {
    if (!c) {
      return CR.NS_ERROR_NO_INTERFACE;
    }
    if (c.equals(CI.nsISupports) || goog.array.reduce(b, function(a, b) {
      return b ? a || b.equals(c) : a;
    }, !1)) {
      return a;
    }
    throw CR.NS_ERROR_NO_INTERFACE;
  };
};
fxdriver.moz.unwrap = function(a) {
  if (!goog.isDefAndNotNull(a) || a.__fxdriver_unwrapped) {
    return a;
  }
  if (a.wrappedJSObject) {
    return fxdriver.moz.markUnwrapped_(a.wrappedJSObject), a.wrappedJSObject;
  }
  try {
    if (a == XPCNativeWrapper(a)) {
      var b = XPCNativeWrapper.unwrap(a), b = b ? b : a;
      fxdriver.moz.markUnwrapped_(b);
      return b;
    }
  } catch (c) {
  }
  return a;
};
fxdriver.moz.markUnwrapped_ = function(a) {
  Object.defineProperty(a, "__fxdriver_unwrapped", {enumerable:!1, configurable:!0, writable:!0, value:!0});
};
fxdriver.moz.unwrapXpcOnly = function(a) {
  if (XPCNativeWrapper && "unwrap" in XPCNativeWrapper) {
    try {
      return XPCNativeWrapper.unwrap(a);
    } catch (b) {
      goog.log.warning(goog.log.getLogger("fxdriver.moz"), "Unwrap From XPC only failed", b);
    }
  }
  return a;
};
fxdriver.moz.unwrapFor4 = function(a) {
  return bot.userAgent.isProductVersion(4) ? fxdriver.moz.unwrap(a) : a;
};
fxdriver.utils = {};
fxdriver.moz.queryInterface = function(a, b) {
  return function(c) {
    if (!c) {
      return CR.NS_ERROR_NO_INTERFACE;
    }
    if (c.equals(CI.nsISupports) || goog.array.reduce(b, function(a, b) {
      return b ? a || b.equals(c) : a;
    }, !1)) {
      return a;
    }
    throw CR.NS_ERROR_NO_INTERFACE;
  };
};
fxdriver.utils.windowMediator = function() {
  var a = CC["@mozilla.org/appshell/window-mediator;1"];
  if (!a) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_COMMAND);
  }
  return a.getService(CI.nsIWindowMediator);
};
fxdriver.utils.getChromeWindow = function(a) {
  return a.QueryInterface(CI.nsIInterfaceRequestor).getInterface(CI.nsIWebNavigation).QueryInterface(CI.nsIDocShellTreeItem).rootTreeItem.QueryInterface(CI.nsIInterfaceRequestor).getInterface(CI.nsIDOMWindow).QueryInterface(CI.nsIDOMChromeWindow);
};
fxdriver.utils.getUniqueId = function() {
  fxdriver.utils._generator || (fxdriver.utils._generator = fxdriver.moz.getService("@mozilla.org/uuid-generator;1", "nsIUUIDGenerator"));
  return fxdriver.utils._generator.generateUUID().toString();
};
fxdriver.utils.newCoordinates = function(a, b, c) {
  return {QueryInterface:function(a) {
    if (a.equals(Components.interfaces.wdICoordinate) || a.equals(Components.interfaces.nsISupports)) {
      return this;
    }
    throw Components.results.NS_NOINTERFACE;
  }, auxiliary:a, x:b, y:c};
};
fxdriver.modals = {};
fxdriver.modals.LOG_ = goog.log.getLogger("fxdriver.modals");
fxdriver.modals.isModalPresent = function(a, b) {
  fxdriver.modaltimer = new fxdriver.Timer;
  fxdriver.modaltimer.runWhenTrue(function() {
    var a = fxdriver.modals.find_();
    return a && a.document && a.document.getElementsByTagName("dialog")[0];
  }, function() {
    a(!0);
  }, b, function() {
    a(!1);
  });
};
fxdriver.modals.acceptAlert = function(a) {
  var b = fxdriver.modals.find_();
  fxdriver.modals.findButton_(b, "accept").click();
  fxdriver.modals.clearFlag_(a);
};
fxdriver.modals.dismissAlert = function(a) {
  var b = fxdriver.modals.find_(), c = fxdriver.modals.findButton_(b, "cancel");
  c || (goog.log.info(fxdriver.modals.LOG_, "No cancel button Falling back to the accept button"), c = fxdriver.modals.findButton_(b, "accept"));
  c.click();
  fxdriver.modals.clearFlag_(a);
};
fxdriver.modals.getText = function(a) {
  return a.modalOpen;
};
fxdriver.modals.setValue = function(a) {
  var b = fxdriver.modals.find_().document.getElementById("loginTextbox");
  try {
    var c = !1;
    if (c = bot.userAgent.isProductVersion(8) ? 0 != b.clientHeight : -1 < b.selectionStart) {
      b.value = a;
      return;
    }
  } catch (d) {
  }
  throw new WebDriverError(bot.ErrorCode.ELEMENT_NOT_VISIBLE, "Alert did not have a text box");
};
fxdriver.modals.find_ = function() {
  var a = fxdriver.utils.windowMediator().getMostRecentWindow(""), a = fxdriver.moz.unwrap(a);
  return a.QueryInterface(CI.nsIInterfaceRequestor).getInterface(CI.nsIWebNavigation).QueryInterface(CI.nsIDocShellTreeItem).treeOwner.QueryInterface(CI.nsIInterfaceRequestor).getInterface(CI.nsIWebBrowserChrome).isWindowModal() ? a : null;
};
fxdriver.modals.findButton_ = function(a, b) {
  return a.document.getElementsByTagName("dialog")[0].getButton(b);
};
fxdriver.modals.setFlag = function(a, b) {
  a.modalOpen = b;
};
fxdriver.modals.clearFlag_ = function(a) {
  fxdriver.modals.setFlag(a, !1);
};
fxdriver.modals.findAssociatedDriver_ = function(a) {
  CC["@mozilla.org/embedcomp/window-watcher;1"].getService(CI.nsIWindowWatcher);
  for (var b = CC["@mozilla.org/appshell/window-mediator;1"].getService(CI.nsIWindowMediator).getEnumerator("navigator:browser"); b.hasMoreElements();) {
    var c = b.getNext().QueryInterface(CI.nsIDOMWindow);
    if (c.content == a || c.content.top == a.top) {
      return c.fxdriver;
    }
  }
  goog.log.info(fxdriver.modals.LOG_, "Unable to find the associated driver");
};
fxdriver.modals.signalOpenModal = function(a, b) {
  goog.log.info(fxdriver.modals.LOG_, "signalOpenModal");
  if ((a = fxdriver.modals.findAssociatedDriver_(a)) && a.response_) {
    fxdriver.modals.setFlag(a, b);
    var c = a.response_;
    "executeAsyncScript" != c.name || c.responseSent_ ? (c.value = b, c.send()) : fxdriver.modals.closeUnhandledAlert(c, a, !1);
  }
};
fxdriver.modals.asAcceptableAlertValue = function(a) {
  return "accept" == a || "ignore" == a ? a : "dismiss";
};
fxdriver.modals.configure = function(a) {
  var b = fxdriver.moz.getService("@mozilla.org/preferences-service;1", "nsIPrefBranch");
  a = fxdriver.modals.asAcceptableAlertValue(a);
  b.setCharPref("webdriver_unexpected_alert_behaviour", a);
};
fxdriver.modals.getUnexpectedAlertBehaviour = function() {
  var a = fxdriver.moz.getService("@mozilla.org/preferences-service;1", "nsIPrefBranch");
  if (!a.prefHasUserValue("webdriver_unexpected_alert_behaviour")) {
    return "dismiss";
  }
  a = a.getCharPref("webdriver_unexpected_alert_behaviour");
  return fxdriver.modals.asAcceptableAlertValue(a);
};
fxdriver.modals.closeUnhandledAlert = function(a, b, c) {
  var d = b.modalOpen;
  fxdriver.modals.isModalPresent(function(e) {
    var f = "Unexpected modal dialog (text: " + d + ")";
    if (e) {
      try {
        c ? fxdriver.modals.acceptAlert(b) : fxdriver.modals.dismissAlert(b);
      } catch (g) {
        f += " The alert could not be closed. The browser may be in a wildly inconsistent state, and the alert may still be open. This is not good. If you can reliably reproduce this, please report a new issue at https://github.com/SeleniumHQ/selenium/issues with reproduction steps. Exception message: " + g;
      }
    } else {
      f += " The alert disappeared before it could be closed.";
    }
    a.sendError(new WebDriverError(bot.ErrorCode.UNEXPECTED_ALERT_OPEN, f, {alert:{text:d}}));
  }, 2000);
};
var EXCLUDED_NAMES = "QueryInterface alert alertCheck confirm confirmCheck confirmEx getPrompt prompt promptPassword promptUsernameAndPassword select".split(" ");
function addInterfaces(a, b, c) {
  goog.array.forEach(c, function(c) {
    try {
      var d = b.QueryInterface(c), f;
      for (f in d) {
        goog.array.contains(EXCLUDED_NAMES, f.toString()) || (a[f] = d[f]);
      }
    } catch (g) {
    }
  });
}
function ObservingAlert(a, b) {
  this.parentWindow_ = a;
  a = [CI.nsIPrompt, CI.nsIAuthPrompt, CI.nsIAuthPrompt2, CI.nsIWritablePropertyBag2];
  addInterfaces(this, b, a);
  this.delegate_ = b;
  this.QueryInterface = fxdriver.moz.queryInterface(this, a);
}
ObservingAlert.prototype.alert = function(a, b) {
  fxdriver.modals.signalOpenModal(this.parentWindow_, b);
  this.delegate_.alert(a, b);
};
ObservingAlert.prototype.alertCheck = function(a, b, c, d) {
  fxdriver.modals.signalOpenModal(this.parentWindow_, b);
  this.delegate_.alertCheck(a, b, c, d);
};
ObservingAlert.prototype.confirm = function(a, b) {
  fxdriver.modals.signalOpenModal(this.parentWindow_, b);
  return this.delegate_.confirm(a, b);
};
ObservingAlert.prototype.confirmCheck = function(a, b, c, d) {
  fxdriver.modals.signalOpenModal(this.parentWindow_, b);
  return this.delegate_.confirmCheck(a, b, c, d);
};
ObservingAlert.prototype.confirmEx = function(a, b, c, d, e, f, g, h) {
  fxdriver.modals.signalOpenModal(this.parentWindow_, b);
  return this.delegate_.confirmEx(a, b, c, d, e, f, g, h);
};
ObservingAlert.prototype.prompt = function(a, b, c, d, e) {
  fxdriver.modals.signalOpenModal(this.parentWindow_, b);
  return this.delegate_.prompt(a, b, c, d, e);
};
ObservingAlert.prototype.promptPassword = function(a, b, c, d, e) {
  fxdriver.modals.signalOpenModal(this.parentWindow_, b);
  return this.delegate_.promptPassword(a, b, c, d, e);
};
ObservingAlert.prototype.promptUsernameAndPassword = function(a, b, c, d, e, f) {
  fxdriver.modals.signalOpenModal(this.parentWindow_, b);
  return this.delegate_.promptUsernameAndPassword(a, b, c, d, e, f);
};
ObservingAlert.prototype.select = function(a, b, c, d, e) {
  fxdriver.modals.signalOpenModal(this.parentWindow_, b);
  return this.delegate_.select(a, b, c, d, e);
};
function DrivenPromptService() {
  goog.log.info(DrivenPromptService.LOG_, "Spoofing prompt service");
  var a = function(a, b) {
    for (var c = 0; c < b.length; c++) {
      var d = Components.classesByID[b[c]];
      if (d && (d = d.getService())) {
        try {
          var g = d.QueryInterface(a);
          goog.log.info(DrivenPromptService.LOG_, "Found implementation at: " + b[c]);
          return g;
        } catch (h) {
        }
      }
    }
    return null;
  }, b = a(CI.nsIPromptService2, ["{7ad1b327-6dfa-46ec-9234-f2a620ea7e00}", "{A2112D6A-0E28-421f-B46A-25C0B308CBD0}"]), a = a(CI.nsIPromptFactory, ["{1c978d25-b37f-43a8-a2d6-0c7a239ead87}"]);
  b || goog.log.info(DrivenPromptService.LOG_, "Unable to locate original prompt service");
  a || goog.log.info(DrivenPromptService.LOG_, "Unable to locate original prompter");
  this.delegate_ = a ? a : b;
  addInterfaces(this, this.delegate_, [CI.nsIPromptFactory, CI.nsIPromptService, CI.nsIPromptService2]);
  this.QueryInterface = fxdriver.moz.queryInterface(this, [CI.nsIPromptFactory, CI.nsIPromptService, CI.nsIPromptService2]);
  goog.log.info(DrivenPromptService.LOG_, "Finished initializing spoofed prompt service");
}
DrivenPromptService.LOG_ = goog.log.getLogger("fxdriver.DrivenPromptService");
DrivenPromptService.prototype = {BUTTON_POS_0:1, BUTTON_POS_1:256, BUTTON_POS_2:65536, BUTTON_TITLE_OK:1, BUTTON_TITLE_CANCEL:2, BUTTON_TITLE_YES:3, BUTTON_TITLE_NO:4, BUTTON_TITLE_SAVE:5, BUTTON_TITLE_DONT_SAVE:6, BUTTON_TITLE_REVERT:7, BUTTON_TITLE_IS_STRING:127, BUTTON_POS_0_DEFAULT:0, BUTTON_POS_1_DEFAULT:16777216, BUTTON_POS_2_DEFAULT:33554432, BUTTON_DELAY_ENABLE:67108864, STD_OK_CANCEL_BUTTONS:this.BUTTON_TITLE_OK * this.BUTTON_POS_0 + this.BUTTON_TITLE_CANCEL * this.BUTTON_POS_1, STD_YES_NO_BUTTONS:this.BUTTON_TITLE_YES * 
this.BUTTON_POS_0 + this.BUTTON_TITLE_NO * this.BUTTON_POS_1};
DrivenPromptService.prototype.alert = function(a, b, c) {
  fxdriver.modals.signalOpenModal(a, c);
  return this.delegate_.QueryInterface(CI.nsIPromptService2).alert(a, b, c);
};
DrivenPromptService.prototype.alertCheck = function(a, b, c, d, e) {
  fxdriver.modals.signalOpenModal(a, c);
  return this.delegate_.QueryInterface(CI.nsIPromptService2).alertCheck(a, b, c, d, e);
};
DrivenPromptService.prototype.confirm = function(a, b, c) {
  fxdriver.modals.signalOpenModal(a, c);
  return this.delegate_.QueryInterface(CI.nsIPromptService2).confirm(a, b, c);
};
DrivenPromptService.prototype.confirmCheck = function(a, b, c, d, e) {
  fxdriver.modals.signalOpenModal(a, c);
  return this.delegate_.QueryInterface(CI.nsIPromptService2).confirmCheck(a, b, c, d, e);
};
DrivenPromptService.prototype.confirmEx = function(a, b, c, d, e, f, g, h, k) {
  fxdriver.modals.signalOpenModal(a, c);
  return this.delegate_.QueryInterface(CI.nsIPromptService2).confirmEx(a, b, c, d, e, f, g, h, k);
};
DrivenPromptService.prototype.prompt = function(a, b, c, d, e, f) {
  fxdriver.modals.signalOpenModal(a, c);
  return this.delegate_.QueryInterface(CI.nsIPromptService2).prompt(a, b, c, d, e, f);
};
DrivenPromptService.prototype.promptUsernameAndPassword = function(a, b, c, d, e, f, g) {
  return this.delegate_.QueryInterface(CI.nsIPromptService2).promptUsernameAndPassword(a, b, c, d, e, f, g);
};
DrivenPromptService.prototype.promptPassword = function(a, b, c, d, e, f) {
  return this.delegate_.QueryInterface(CI.nsIPromptService2).promptPassword(a, b, c, d, e, f);
};
DrivenPromptService.prototype.select = function(a, b, c, d, e, f) {
  return this.delegate_.QueryInterface(CI.nsIPromptService2).select(a, b, c, d, e, f);
};
DrivenPromptService.prototype.promptAuth = function(a, b, c, d, e, f) {
  fxdriver.modals.signalOpenModal(a, "");
  return this.delegate_.QueryInterface(CI.nsIPromptService2).promptAuth(a, b, c, d, e, f);
};
DrivenPromptService.prototype.asyncPromptAuth = function(a, b, c, d, e, f, g, h) {
  fxdriver.modals.signalOpenModal(a, "");
  return this.delegate_.QueryInterface(CI.nsIPromptService2).asyncPromptAuth(a, b, c, d, e, f, g, h);
};
DrivenPromptService.prototype.getPrompt = function(a, b) {
  b = this.delegate_.QueryInterface(CI.nsIPromptFactory).getPrompt(a, b);
  return new ObservingAlert(a, b);
};
DrivenPromptService.prototype.observe = function(a, b, c) {
  return this.delegate_.observe(a, b, c);
};
var PROMPT_SERVICE_CONTRACT_ID = "@mozilla.org/embedcomp/prompt-service;1", PROMPTER_CONTRACT_ID = "@mozilla.org/prompter;1", DRIVEN_PROMPT_SERVICE_CLASS_ID = Components.ID("{e26dbdcd-d3ba-4ded-88c3-6cb07ee3e9e0}"), service = void 0, PromptServiceSpoofFactory = {createInstance:function(a, b) {
  if (null != a) {
    throw Components.results.NS_ERROR_NO_AGGREGATION;
  }
  void 0 == service && (service = new DrivenPromptService);
  return service;
}};
function PromptServiceSpoofModule() {
  this.firstTime_ = !0;
}
PromptServiceSpoofModule.prototype.registerSelf = function(a, b, c, d) {
  if (this.firstTime_) {
    throw this.firstTime_ = !1, Components.results.NS_ERROR_FACTORY_REGISTER_AGAIN;
  }
  a = a.QueryInterface(CI.nsIComponentRegistrar);
  a.registerFactoryLocation(DRIVEN_PROMPT_SERVICE_CLASS_ID, "Driven prompt service", PROMPT_SERVICE_CONTRACT_ID, b, c, d);
  a.registerFactoryLocation(DRIVEN_PROMPT_SERVICE_CLASS_ID, "Driven prompter service", PROMPTER_CONTRACT_ID, b, c, d);
};
PromptServiceSpoofModule.prototype.unregisterSelf = function(a, b, c) {
  goog.log.info(goog.log.getLogger("fxdriver.PromptServiceSpoofModule"), "Unregistering");
  a.QueryInterface(CI.nsIComponentRegistrar);
  a.unregisterFactoryLocation(DRIVEN_PROMPT_SERVICE_CLASS_ID, b);
};
PromptServiceSpoofModule.prototype.getClassObject = function(a, b, c) {
  if (!c.equals(Components.interfaces.nsIFactory)) {
    throw Components.results.NS_ERROR_NOT_IMPLEMENTED;
  }
  if (b.equals(DRIVEN_PROMPT_SERVICE_CLASS_ID)) {
    return PromptServiceSpoofFactory;
  }
  throw Components.results.NS_ERROR_NO_INTERFACE;
};
PromptServiceSpoofModule.prototype.canUnload = function(a) {
  return !0;
};
NSGetModule = function(a, b) {
  return new PromptServiceSpoofModule;
};
DrivenPromptService.prototype.classID = DRIVEN_PROMPT_SERVICE_CLASS_ID;
fxdriver.moz.load("resource://gre/modules/XPCOMUtils.jsm");
XPCOMUtils.generateNSGetFactory && (NSGetFactory = XPCOMUtils.generateNSGetFactory([DrivenPromptService]));

