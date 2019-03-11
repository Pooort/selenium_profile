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
    var f;
    a = a.replace(/\\/g, "/");
    var g = goog.dependencies_;
    d && "boolean" !== typeof d || (d = d ? {module:"goog"} : {});
    for (var h = 0; f = b[h]; h++) {
      g.nameToPath[f] = a, g.loadFlags[a] = d;
    }
    for (d = 0; b = c[d]; d++) {
      a in g.requires || (g.requires[a] = {}), g.requires[a][b] = !0;
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
    if (!(a in f.written || a in f.visited)) {
      f.visited[a] = !0;
      if (a in f.requires) {
        for (var g in f.requires[a]) {
          if (!goog.isProvided_(g)) {
            if (g in f.nameToPath) {
              b(f.nameToPath[g]);
            } else {
              throw Error("Undefined nameToPath for " + g);
            }
          }
        }
      }
      a in d || (d[a] = !0, c.push(a));
    }
  }
  var c = [], d = {}, f = goog.dependencies_;
  b(a);
  for (var g = 0; g < c.length; g++) {
    a = c[g], goog.dependencies_.written[a] = !0;
  }
  var h = goog.moduleLoaderState_;
  goog.moduleLoaderState_ = null;
  for (g = 0; g < c.length; g++) {
    if (a = c[g]) {
      var k = f.loadFlags[a] || {}, m = goog.needsTranspile_(k.lang || "es3");
      "goog" == k.module || m ? goog.importProcessedScript_(goog.basePath + a, "goog" == k.module, m) : goog.importScript_(goog.basePath + a);
    } else {
      throw goog.moduleLoaderState_ = h, Error("Undefined script input");
    }
  }
  goog.moduleLoaderState_ = h;
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
    var f = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_, g = goog.loadFileSync_(a);
    if (null == g) {
      throw Error('Load of "' + a + '" failed');
    }
    c && (g = goog.transpile_.call(goog.global, g, a));
    g = b ? goog.wrapModule_(a, g) : g + ("\n//# sourceURL=" + a);
    goog.IS_OLD_IE_ && goog.oldIeWaiting_ ? (goog.dependencies_.deferred[d] = g, goog.queuedModules_.push(d)) : f(a, g);
  }
};
goog.transpile_ = function(a, b) {
  var c = goog.global.$jscomp;
  c || (goog.global.$jscomp = c = {});
  var d = c.transpile;
  if (!d) {
    var f = goog.basePath + goog.TRANSPILER, g = goog.loadFileSync_(f);
    if (g) {
      eval(g + "\n//# sourceURL=" + f);
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
  a.base = function(a, c, g) {
    for (var d = Array(arguments.length - 2), f = 2; f < arguments.length; f++) {
      d[f - 2] = arguments[f];
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
    for (var f = Array(arguments.length - 1), g = 1; g < arguments.length; g++) {
      f[g - 1] = arguments[g];
    }
    return d.superClass_.constructor.apply(a, f);
  }
  f = Array(arguments.length - 2);
  for (g = 2; g < arguments.length; g++) {
    f[g - 2] = arguments[g];
  }
  for (var g = !1, h = a.constructor; h; h = h.superClass_ && h.superClass_.constructor) {
    if (h.prototype[b] === d) {
      g = !0;
    } else {
      if (g) {
        return h.prototype[b].apply(a, f);
      }
    }
  }
  if (a[b] === d) {
    return a.constructor.prototype[b].apply(a, f);
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
    } catch (h) {
      return !1;
    }
  }
  var c = {es3:!1}, d = !1, f = goog.global.navigator && goog.global.navigator.userAgent ? goog.global.navigator.userAgent : "";
  a("es5", function() {
    return b("[1,].length==1");
  });
  a("es6", function() {
    var a = f.match(/Edge\/(\d+)(\.\d)*/i);
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
    for (var f in c) {
      this.additionalFields.push(f), this[f] = c[f];
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
    for (var d = a.stack.replace(/\s*$/, "").split("\n"), f = d.shift(); f; f = d.shift()) {
      var g = f.match(/(.*):(\d+):(\d+)$/);
      if (g) {
        f = g[1];
        var h = Number(g[2]);
        var k = Number(g[3]);
      } else {
        g = f.match(/(.*):(\d+)$/), f = g[1], h = Number(g[2]);
      }
      (g = f.match(/^([\w./<$]+)?(?:\(.*\))?@(.+)?$/)) ? b.push({methodName:g[1], fileName:g[2], lineNumber:h, columnNumber:k}) : b.push({methodName:f, fileName:"?", lineNumber:"?", columnNumber:"?"});
    }
  }
  if (a.additionalFields && a.additionalFields.length) {
    for (b = 0; b < a.additionalFields.length; ++b) {
      c[a.additionalFields[b]] = a[a.additionalFields[b]];
    }
  }
  return c;
};
var bot = {};
try {
  bot.window_ = window;
} catch (a) {
  bot.window_ = goog.global;
}
bot.getWindow = function() {
  return bot.window_;
};
bot.setWindow = function(a) {
  bot.window_ = a;
};
bot.getDocument = function() {
  return bot.window_.document;
};
bot.ErrorCode = {SUCCESS:0, NO_SUCH_ELEMENT:7, NO_SUCH_FRAME:8, UNKNOWN_COMMAND:9, UNSUPPORTED_OPERATION:9, STALE_ELEMENT_REFERENCE:10, ELEMENT_NOT_VISIBLE:11, INVALID_ELEMENT_STATE:12, UNKNOWN_ERROR:13, ELEMENT_NOT_SELECTABLE:15, JAVASCRIPT_ERROR:17, XPATH_LOOKUP_ERROR:19, TIMEOUT:21, NO_SUCH_WINDOW:23, INVALID_COOKIE_DOMAIN:24, UNABLE_TO_SET_COOKIE:25, UNEXPECTED_ALERT_OPEN:26, NO_SUCH_ALERT:27, SCRIPT_TIMEOUT:28, INVALID_ELEMENT_COORDINATES:29, IME_NOT_AVAILABLE:30, IME_ENGINE_ACTIVATION_FAILED:31, 
INVALID_SELECTOR_ERROR:32, SESSION_NOT_CREATED:33, MOVE_TARGET_OUT_OF_BOUNDS:34, SQL_DATABASE_ERROR:35, INVALID_XPATH_SELECTOR:51, INVALID_XPATH_SELECTOR_RETURN_TYPE:52, INVALID_ARGUMENT:61, METHOD_NOT_ALLOWED:405};
bot.Error = function(a, b) {
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
};
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
  var f = c, g = this, h = function() {
    var c = a();
    0 <= f && !c ? (f -= 100, g.setTimeout(h, 100)) : 0 >= f ? d() : b(c);
  };
  h();
};
fxdriver.Timer.prototype.cancel = function() {
  this.timer && this.timer.cancel();
};
fxdriver.prefs = {};
fxdriver.prefs.PREFS_ = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
fxdriver.prefs.getCharPref = function(a, b) {
  (a = fxdriver.prefs.PREFS_.prefHasUserValue(a) && fxdriver.prefs.PREFS_.getCharPref(a)) || (a = b);
  return a;
};
fxdriver.prefs.setCharPref = function(a, b) {
  fxdriver.prefs.PREFS_.setCharPref(a, b);
};
fxdriver.prefs.getBoolPref = function(a, b) {
  (a = fxdriver.prefs.PREFS_.prefHasUserValue(a) && fxdriver.prefs.PREFS_.getBoolPref(a)) || (a = b);
  return a;
};
fxdriver.prefs.setBoolPref = function(a, b) {
  fxdriver.prefs.PREFS_.setBoolPref(a, b);
};
goog.color = {};
goog.color.names = {aliceblue:"#f0f8ff", antiquewhite:"#faebd7", aqua:"#00ffff", aquamarine:"#7fffd4", azure:"#f0ffff", beige:"#f5f5dc", bisque:"#ffe4c4", black:"#000000", blanchedalmond:"#ffebcd", blue:"#0000ff", blueviolet:"#8a2be2", brown:"#a52a2a", burlywood:"#deb887", cadetblue:"#5f9ea0", chartreuse:"#7fff00", chocolate:"#d2691e", coral:"#ff7f50", cornflowerblue:"#6495ed", cornsilk:"#fff8dc", crimson:"#dc143c", cyan:"#00ffff", darkblue:"#00008b", darkcyan:"#008b8b", darkgoldenrod:"#b8860b", 
darkgray:"#a9a9a9", darkgreen:"#006400", darkgrey:"#a9a9a9", darkkhaki:"#bdb76b", darkmagenta:"#8b008b", darkolivegreen:"#556b2f", darkorange:"#ff8c00", darkorchid:"#9932cc", darkred:"#8b0000", darksalmon:"#e9967a", darkseagreen:"#8fbc8f", darkslateblue:"#483d8b", darkslategray:"#2f4f4f", darkslategrey:"#2f4f4f", darkturquoise:"#00ced1", darkviolet:"#9400d3", deeppink:"#ff1493", deepskyblue:"#00bfff", dimgray:"#696969", dimgrey:"#696969", dodgerblue:"#1e90ff", firebrick:"#b22222", floralwhite:"#fffaf0", 
forestgreen:"#228b22", fuchsia:"#ff00ff", gainsboro:"#dcdcdc", ghostwhite:"#f8f8ff", gold:"#ffd700", goldenrod:"#daa520", gray:"#808080", green:"#008000", greenyellow:"#adff2f", grey:"#808080", honeydew:"#f0fff0", hotpink:"#ff69b4", indianred:"#cd5c5c", indigo:"#4b0082", ivory:"#fffff0", khaki:"#f0e68c", lavender:"#e6e6fa", lavenderblush:"#fff0f5", lawngreen:"#7cfc00", lemonchiffon:"#fffacd", lightblue:"#add8e6", lightcoral:"#f08080", lightcyan:"#e0ffff", lightgoldenrodyellow:"#fafad2", lightgray:"#d3d3d3", 
lightgreen:"#90ee90", lightgrey:"#d3d3d3", lightpink:"#ffb6c1", lightsalmon:"#ffa07a", lightseagreen:"#20b2aa", lightskyblue:"#87cefa", lightslategray:"#778899", lightslategrey:"#778899", lightsteelblue:"#b0c4de", lightyellow:"#ffffe0", lime:"#00ff00", limegreen:"#32cd32", linen:"#faf0e6", magenta:"#ff00ff", maroon:"#800000", mediumaquamarine:"#66cdaa", mediumblue:"#0000cd", mediumorchid:"#ba55d3", mediumpurple:"#9370db", mediumseagreen:"#3cb371", mediumslateblue:"#7b68ee", mediumspringgreen:"#00fa9a", 
mediumturquoise:"#48d1cc", mediumvioletred:"#c71585", midnightblue:"#191970", mintcream:"#f5fffa", mistyrose:"#ffe4e1", moccasin:"#ffe4b5", navajowhite:"#ffdead", navy:"#000080", oldlace:"#fdf5e6", olive:"#808000", olivedrab:"#6b8e23", orange:"#ffa500", orangered:"#ff4500", orchid:"#da70d6", palegoldenrod:"#eee8aa", palegreen:"#98fb98", paleturquoise:"#afeeee", palevioletred:"#db7093", papayawhip:"#ffefd5", peachpuff:"#ffdab9", peru:"#cd853f", pink:"#ffc0cb", plum:"#dda0dd", powderblue:"#b0e0e6", 
purple:"#800080", red:"#ff0000", rosybrown:"#bc8f8f", royalblue:"#4169e1", saddlebrown:"#8b4513", salmon:"#fa8072", sandybrown:"#f4a460", seagreen:"#2e8b57", seashell:"#fff5ee", sienna:"#a0522d", silver:"#c0c0c0", skyblue:"#87ceeb", slateblue:"#6a5acd", slategray:"#708090", slategrey:"#708090", snow:"#fffafa", springgreen:"#00ff7f", steelblue:"#4682b4", tan:"#d2b48c", teal:"#008080", thistle:"#d8bfd8", tomato:"#ff6347", turquoise:"#40e0d0", violet:"#ee82ee", wheat:"#f5deb3", white:"#ffffff", whitesmoke:"#f5f5f5", 
yellow:"#ffff00", yellowgreen:"#9acd32"};
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
goog.debug.LogRecord = function(a, b, c, d, f) {
  this.reset(a, b, c, d, f);
};
goog.debug.LogRecord.prototype.sequenceNumber_ = 0;
goog.debug.LogRecord.prototype.exception_ = null;
goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS = !0;
goog.debug.LogRecord.nextSequenceNumber_ = 0;
goog.debug.LogRecord.prototype.reset = function(a, b, c, d, f) {
  goog.debug.LogRecord.ENABLE_SEQUENCE_NUMBERS && (this.sequenceNumber_ = "number" == typeof f ? f : goog.debug.LogRecord.nextSequenceNumber_++);
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
goog.debug.RelativeTimeProvider = function() {
  this.relativeTimeStart_ = goog.now();
};
goog.debug.RelativeTimeProvider.defaultInstance_ = new goog.debug.RelativeTimeProvider;
goog.debug.RelativeTimeProvider.prototype.set = function(a) {
  this.relativeTimeStart_ = a;
};
goog.debug.RelativeTimeProvider.prototype.reset = function() {
  this.set(goog.now());
};
goog.debug.RelativeTimeProvider.prototype.get = function() {
  return this.relativeTimeStart_;
};
goog.debug.RelativeTimeProvider.getDefaultInstance = function() {
  return goog.debug.RelativeTimeProvider.defaultInstance_;
};
goog.disposable = {};
goog.disposable.IDisposable = function() {
};
goog.disposable.IDisposable.prototype.dispose = goog.abstractMethod;
goog.disposable.IDisposable.prototype.isDisposed = goog.abstractMethod;
goog.dom = {};
goog.dom.HtmlElement = function() {
};
goog.dom.InputType = {BUTTON:"button", CHECKBOX:"checkbox", COLOR:"color", DATE:"date", DATETIME:"datetime", DATETIME_LOCAL:"datetime-local", EMAIL:"email", FILE:"file", HIDDEN:"hidden", IMAGE:"image", MENU:"menu", MONTH:"month", NUMBER:"number", PASSWORD:"password", RADIO:"radio", RANGE:"range", RESET:"reset", SEARCH:"search", SELECT_MULTIPLE:"select-multiple", SELECT_ONE:"select-one", SUBMIT:"submit", TEL:"tel", TEXT:"text", TEXTAREA:"textarea", TIME:"time", URL:"url", WEEK:"week"};
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.events = {};
goog.events.EventId = function(a) {
  this.id = a;
};
goog.events.EventId.prototype.toString = function() {
  return this.id;
};
goog.fs = {};
goog.fs.url = {};
goog.fs.url.createObjectUrl = function(a) {
  return goog.fs.url.getUrlObject_().createObjectURL(a);
};
goog.fs.url.revokeObjectUrl = function(a) {
  goog.fs.url.getUrlObject_().revokeObjectURL(a);
};
goog.fs.url.getUrlObject_ = function() {
  var a = goog.fs.url.findUrlObject_();
  if (null != a) {
    return a;
  }
  throw Error("This browser doesn't seem to support blob URLs");
};
goog.fs.url.findUrlObject_ = function() {
  return goog.isDef(goog.global.URL) && goog.isDef(goog.global.URL.createObjectURL) ? goog.global.URL : goog.isDef(goog.global.webkitURL) && goog.isDef(goog.global.webkitURL.createObjectURL) ? goog.global.webkitURL : goog.isDef(goog.global.createObjectURL) ? goog.global : null;
};
goog.fs.url.browserSupportsObjectUrls = function() {
  return null != goog.fs.url.findUrlObject_();
};
goog.functions = {};
goog.functions.constant = function(a) {
  return function() {
    return a;
  };
};
goog.functions.FALSE = goog.functions.constant(!1);
goog.functions.TRUE = goog.functions.constant(!0);
goog.functions.NULL = goog.functions.constant(null);
goog.functions.identity = function(a, b) {
  return a;
};
goog.functions.error = function(a) {
  return function() {
    throw Error(a);
  };
};
goog.functions.fail = function(a) {
  return function() {
    throw a;
  };
};
goog.functions.lock = function(a, b) {
  b = b || 0;
  return function() {
    return a.apply(this, Array.prototype.slice.call(arguments, 0, b));
  };
};
goog.functions.nth = function(a) {
  return function() {
    return arguments[a];
  };
};
goog.functions.partialRight = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.push.apply(b, c);
    return a.apply(this, b);
  };
};
goog.functions.withReturnValue = function(a, b) {
  return goog.functions.sequence(a, goog.functions.constant(b));
};
goog.functions.equalTo = function(a, b) {
  return function(c) {
    return b ? a == c : a === c;
  };
};
goog.functions.compose = function(a, b) {
  var c = arguments, d = c.length;
  return function() {
    var a;
    d && (a = c[d - 1].apply(this, arguments));
    for (var b = d - 2; 0 <= b; b--) {
      a = c[b].call(this, a);
    }
    return a;
  };
};
goog.functions.sequence = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for (var a, f = 0; f < c; f++) {
      a = b[f].apply(this, arguments);
    }
    return a;
  };
};
goog.functions.and = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for (var a = 0; a < c; a++) {
      if (!b[a].apply(this, arguments)) {
        return !1;
      }
    }
    return !0;
  };
};
goog.functions.or = function(a) {
  var b = arguments, c = b.length;
  return function() {
    for (var a = 0; a < c; a++) {
      if (b[a].apply(this, arguments)) {
        return !0;
      }
    }
    return !1;
  };
};
goog.functions.not = function(a) {
  return function() {
    return !a.apply(this, arguments);
  };
};
goog.functions.create = function(a, b) {
  var c = function() {
  };
  c.prototype = a.prototype;
  c = new c;
  a.apply(c, Array.prototype.slice.call(arguments, 1));
  return c;
};
goog.functions.CACHE_RETURN_VALUE = !0;
goog.functions.cacheReturnValue = function(a) {
  var b = !1, c;
  return function() {
    if (!goog.functions.CACHE_RETURN_VALUE) {
      return a();
    }
    b || (c = a(), b = !0);
    return c;
  };
};
goog.functions.once = function(a) {
  var b = a;
  return function() {
    if (b) {
      var a = b;
      b = null;
      a();
    }
  };
};
goog.functions.debounce = function(a, b, c) {
  var d = 0;
  return function(f) {
    goog.global.clearTimeout(d);
    var g = arguments;
    d = goog.global.setTimeout(function() {
      a.apply(c, g);
    }, b);
  };
};
goog.functions.throttle = function(a, b, c) {
  var d = 0, f = !1, g = [], h = function() {
    d = 0;
    f && (f = !1, k());
  }, k = function() {
    d = goog.global.setTimeout(h, b);
    a.apply(c, g);
  };
  return function(a) {
    g = arguments;
    d ? f = !0 : k();
  };
};
goog.functions.rateLimit = function(a, b, c) {
  var d = 0, f = function() {
    d = 0;
  };
  return function(g) {
    d || (d = goog.global.setTimeout(f, b), a.apply(c, arguments));
  };
};
goog.i18n = {};
goog.i18n.bidi = {};
goog.i18n.bidi.FORCE_RTL = !1;
goog.i18n.bidi.IS_RTL = goog.i18n.bidi.FORCE_RTL || ("ar" == goog.LOCALE.substring(0, 2).toLowerCase() || "fa" == goog.LOCALE.substring(0, 2).toLowerCase() || "he" == goog.LOCALE.substring(0, 2).toLowerCase() || "iw" == goog.LOCALE.substring(0, 2).toLowerCase() || "ps" == goog.LOCALE.substring(0, 2).toLowerCase() || "sd" == goog.LOCALE.substring(0, 2).toLowerCase() || "ug" == goog.LOCALE.substring(0, 2).toLowerCase() || "ur" == goog.LOCALE.substring(0, 2).toLowerCase() || "yi" == goog.LOCALE.substring(0, 
2).toLowerCase()) && (2 == goog.LOCALE.length || "-" == goog.LOCALE.substring(2, 3) || "_" == goog.LOCALE.substring(2, 3)) || 3 <= goog.LOCALE.length && "ckb" == goog.LOCALE.substring(0, 3).toLowerCase() && (3 == goog.LOCALE.length || "-" == goog.LOCALE.substring(3, 4) || "_" == goog.LOCALE.substring(3, 4));
goog.i18n.bidi.Format = {LRE:"\u202a", RLE:"\u202b", PDF:"\u202c", LRM:"\u200e", RLM:"\u200f"};
goog.i18n.bidi.Dir = {LTR:1, RTL:-1, NEUTRAL:0};
goog.i18n.bidi.RIGHT = "right";
goog.i18n.bidi.LEFT = "left";
goog.i18n.bidi.I18N_RIGHT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.LEFT : goog.i18n.bidi.RIGHT;
goog.i18n.bidi.I18N_LEFT = goog.i18n.bidi.IS_RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT;
goog.i18n.bidi.toDir = function(a, b) {
  return "number" == typeof a ? 0 < a ? goog.i18n.bidi.Dir.LTR : 0 > a ? goog.i18n.bidi.Dir.RTL : b ? null : goog.i18n.bidi.Dir.NEUTRAL : null == a ? null : a ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
};
goog.i18n.bidi.ltrChars_ = "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0800-\u1fff\u200e\u2c00-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";
goog.i18n.bidi.rtlChars_ = "\u0591-\u06ef\u06fa-\u07ff\u200f\ufb1d-\ufdff\ufe70-\ufefc";
goog.i18n.bidi.htmlSkipReg_ = /<[^>]*>|&[^;]+;/g;
goog.i18n.bidi.stripHtmlIfNeeded_ = function(a, b) {
  return b ? a.replace(goog.i18n.bidi.htmlSkipReg_, "") : a;
};
goog.i18n.bidi.rtlCharReg_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.ltrCharReg_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.hasAnyRtl = function(a, b) {
  return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.hasRtlChar = goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr = function(a, b) {
  return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.ltrRe_ = new RegExp("^[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlRe_ = new RegExp("^[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.isRtlChar = function(a) {
  return goog.i18n.bidi.rtlRe_.test(a);
};
goog.i18n.bidi.isLtrChar = function(a) {
  return goog.i18n.bidi.ltrRe_.test(a);
};
goog.i18n.bidi.isNeutralChar = function(a) {
  return !goog.i18n.bidi.isLtrChar(a) && !goog.i18n.bidi.isRtlChar(a);
};
goog.i18n.bidi.ltrDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.rtlChars_ + "]*[" + goog.i18n.bidi.ltrChars_ + "]");
goog.i18n.bidi.rtlDirCheckRe_ = new RegExp("^[^" + goog.i18n.bidi.ltrChars_ + "]*[" + goog.i18n.bidi.rtlChars_ + "]");
goog.i18n.bidi.startsWithRtl = function(a, b) {
  return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isRtlText = goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr = function(a, b) {
  return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isLtrText = goog.i18n.bidi.startsWithLtr;
goog.i18n.bidi.isRequiredLtrRe_ = /^http:\/\/.*/;
goog.i18n.bidi.isNeutralText = function(a, b) {
  a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b);
  return goog.i18n.bidi.isRequiredLtrRe_.test(a) || !goog.i18n.bidi.hasAnyLtr(a) && !goog.i18n.bidi.hasAnyRtl(a);
};
goog.i18n.bidi.ltrExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.ltrChars_ + "][^" + goog.i18n.bidi.rtlChars_ + "]*$");
goog.i18n.bidi.rtlExitDirCheckRe_ = new RegExp("[" + goog.i18n.bidi.rtlChars_ + "][^" + goog.i18n.bidi.ltrChars_ + "]*$");
goog.i18n.bidi.endsWithLtr = function(a, b) {
  return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isLtrExitText = goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl = function(a, b) {
  return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a, b));
};
goog.i18n.bidi.isRtlExitText = goog.i18n.bidi.endsWithRtl;
goog.i18n.bidi.rtlLocalesRe_ = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
goog.i18n.bidi.isRtlLanguage = function(a) {
  return goog.i18n.bidi.rtlLocalesRe_.test(a);
};
goog.i18n.bidi.bracketGuardTextRe_ = /(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
goog.i18n.bidi.guardBracketInText = function(a, b) {
  b = (void 0 === b ? goog.i18n.bidi.hasAnyRtl(a) : b) ? goog.i18n.bidi.Format.RLM : goog.i18n.bidi.Format.LRM;
  return a.replace(goog.i18n.bidi.bracketGuardTextRe_, b + "$&" + b);
};
goog.i18n.bidi.enforceRtlInHtml = function(a) {
  return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=rtl") : "\n<span dir=rtl>" + a + "</span>";
};
goog.i18n.bidi.enforceRtlInText = function(a) {
  return goog.i18n.bidi.Format.RLE + a + goog.i18n.bidi.Format.PDF;
};
goog.i18n.bidi.enforceLtrInHtml = function(a) {
  return "<" == a.charAt(0) ? a.replace(/<\w+/, "$& dir=ltr") : "\n<span dir=ltr>" + a + "</span>";
};
goog.i18n.bidi.enforceLtrInText = function(a) {
  return goog.i18n.bidi.Format.LRE + a + goog.i18n.bidi.Format.PDF;
};
goog.i18n.bidi.dimensionsRe_ = /:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;
goog.i18n.bidi.leftRe_ = /left/gi;
goog.i18n.bidi.rightRe_ = /right/gi;
goog.i18n.bidi.tempRe_ = /%%%%/g;
goog.i18n.bidi.mirrorCSS = function(a) {
  return a.replace(goog.i18n.bidi.dimensionsRe_, ":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_, "%%%%").replace(goog.i18n.bidi.rightRe_, goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_, goog.i18n.bidi.RIGHT);
};
goog.i18n.bidi.doubleQuoteSubstituteRe_ = /([\u0591-\u05f2])"/g;
goog.i18n.bidi.singleQuoteSubstituteRe_ = /([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote = function(a) {
  return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_, "$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_, "$1\u05f3");
};
goog.i18n.bidi.wordSeparatorRe_ = /\s+/;
goog.i18n.bidi.hasNumeralsRe_ = /[\d\u06f0-\u06f9]/;
goog.i18n.bidi.rtlDetectionThreshold_ = 0.40;
goog.i18n.bidi.estimateDirection = function(a, b) {
  var c = 0, d = 0, f = !1;
  a = goog.i18n.bidi.stripHtmlIfNeeded_(a, b).split(goog.i18n.bidi.wordSeparatorRe_);
  for (b = 0; b < a.length; b++) {
    var g = a[b];
    goog.i18n.bidi.startsWithRtl(g) ? (c++, d++) : goog.i18n.bidi.isRequiredLtrRe_.test(g) ? f = !0 : goog.i18n.bidi.hasAnyLtr(g) ? d++ : goog.i18n.bidi.hasNumeralsRe_.test(g) && (f = !0);
  }
  return 0 == d ? f ? goog.i18n.bidi.Dir.LTR : goog.i18n.bidi.Dir.NEUTRAL : c / d > goog.i18n.bidi.rtlDetectionThreshold_ ? goog.i18n.bidi.Dir.RTL : goog.i18n.bidi.Dir.LTR;
};
goog.i18n.bidi.detectRtlDirectionality = function(a, b) {
  return goog.i18n.bidi.estimateDirection(a, b) == goog.i18n.bidi.Dir.RTL;
};
goog.i18n.bidi.setElementDirAndAlign = function(a, b) {
  a && (b = goog.i18n.bidi.toDir(b)) && (a.style.textAlign = b == goog.i18n.bidi.Dir.RTL ? goog.i18n.bidi.RIGHT : goog.i18n.bidi.LEFT, a.dir = b == goog.i18n.bidi.Dir.RTL ? "rtl" : "ltr");
};
goog.i18n.bidi.setElementDirByTextDirectionality = function(a, b) {
  switch(goog.i18n.bidi.estimateDirection(b)) {
    case goog.i18n.bidi.Dir.LTR:
      a.dir = "ltr";
      break;
    case goog.i18n.bidi.Dir.RTL:
      a.dir = "rtl";
      break;
    default:
      a.removeAttribute("dir");
  }
};
goog.i18n.bidi.DirectionalString = function() {
};
goog.math = {};
goog.math.IRect = function() {
};
goog.math.Size = function(a, b) {
  this.width = a;
  this.height = b;
};
goog.math.Size.equals = function(a, b) {
  return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1;
};
goog.math.Size.prototype.clone = function() {
  return new goog.math.Size(this.width, this.height);
};
goog.DEBUG && (goog.math.Size.prototype.toString = function() {
  return "(" + this.width + " x " + this.height + ")";
});
goog.math.Size.prototype.getLongest = function() {
  return Math.max(this.width, this.height);
};
goog.math.Size.prototype.getShortest = function() {
  return Math.min(this.width, this.height);
};
goog.math.Size.prototype.area = function() {
  return this.width * this.height;
};
goog.math.Size.prototype.perimeter = function() {
  return 2 * (this.width + this.height);
};
goog.math.Size.prototype.aspectRatio = function() {
  return this.width / this.height;
};
goog.math.Size.prototype.isEmpty = function() {
  return !this.area();
};
goog.math.Size.prototype.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};
goog.math.Size.prototype.fitsInside = function(a) {
  return this.width <= a.width && this.height <= a.height;
};
goog.math.Size.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};
goog.math.Size.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};
goog.math.Size.prototype.scale = function(a, b) {
  b = goog.isNumber(b) ? b : a;
  this.width *= a;
  this.height *= b;
  return this;
};
goog.math.Size.prototype.scaleToCover = function(a) {
  a = this.aspectRatio() <= a.aspectRatio() ? a.width / this.width : a.height / this.height;
  return this.scale(a);
};
goog.math.Size.prototype.scaleToFit = function(a) {
  a = this.aspectRatio() > a.aspectRatio() ? a.width / this.width : a.height / this.height;
  return this.scale(a);
};
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
  var d = {}, f;
  for (f in a) {
    b.call(c, a[f], f, a) && (d[f] = a[f]);
  }
  return d;
};
goog.object.map = function(a, b, c) {
  var d = {}, f;
  for (f in a) {
    d[f] = b.call(c, a[f], f, a);
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
  for (var c, d, f = 1; f < arguments.length; f++) {
    d = arguments[f];
    for (c in d) {
      a[c] = d[c];
    }
    for (var g = 0; g < goog.object.PROTOTYPE_FIELDS_.length; g++) {
      c = goog.object.PROTOTYPE_FIELDS_[g], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
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
    for (var f = Object.getOwnPropertyNames(a), g = 0; g < f.length; g++) {
      d[f[g]] = !0;
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
  for (var c = a.split("%s"), d = "", f = Array.prototype.slice.call(arguments, 1); f.length && 1 < c.length;) {
    d += c.shift() + f.shift();
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
  for (var d = a.toLowerCase().match(c), f = b.toLowerCase().match(c), g = Math.min(d.length, f.length), h = 0; h < g; h++) {
    c = d[h];
    var k = f[h];
    if (c != k) {
      return a = parseInt(c, 10), !isNaN(a) && (b = parseInt(k, 10), !isNaN(b) && a - b) ? a - b : c < k ? -1 : 1;
    }
  }
  return d.length != f.length ? d.length - f.length : a < b ? -1 : 1;
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
    var f = c[a];
    if (f) {
      return f;
    }
    "#" == b.charAt(0) && (b = Number("0" + b.substr(1)), isNaN(b) || (f = String.fromCharCode(b)));
    f || (d.innerHTML = a + " ", f = d.firstChild.nodeValue.slice(0, -1));
    return c[a] = f;
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
    var f = 1 == c ? b : b.charAt(d);
    if (a.charAt(0) == f && a.charAt(a.length - 1) == f) {
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
    var f = a.length - d;
    a = a.substring(0, b - d) + "..." + a.substring(f);
  } else {
    a.length > b && (d = Math.floor(b / 2), f = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(f));
  }
  c && (a = goog.string.htmlEscape(a));
  return a;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\", "<":"<"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = String(a);
  for (var b = ['"'], c = 0; c < a.length; c++) {
    var d = a.charAt(c), f = d.charCodeAt(0);
    b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < f && 127 > f ? d : goog.string.escapeChar(d));
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
  for (var d = Math.max(a.length, b.length), f = 0; 0 == c && f < d; f++) {
    var g = a[f] || "", h = b[f] || "";
    do {
      g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
      h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
      if (0 == g[0].length && 0 == h[0].length) {
        break;
      }
      var c = 0 == g[1].length ? 0 : parseInt(g[1], 10), k = 0 == h[1].length ? 0 : parseInt(h[1], 10), c = goog.string.compareElements_(c, k) || goog.string.compareElements_(0 == g[2].length, 0 == h[2].length) || goog.string.compareElements_(g[2], h[2]), g = g[3], h = h[3];
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
  return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function(a, b, f) {
    return b + f.toUpperCase();
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
      var f = a.lastIndexOf(b[d]);
      f > c && (c = f);
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
  for (var f = 0; f < b.length + 1; f++) {
    c[f] = f;
  }
  for (f = 0; f < a.length; f++) {
    d[0] = f + 1;
    for (var g = 0; g < b.length; g++) {
      d[g + 1] = Math.min(d[g] + 1, c[g + 1] + 1, c[g] + Number(a[f] != b[g]));
    }
    for (g = 0; g < c.length; g++) {
      c[g] = d[g];
    }
  }
  return d[b.length];
};
goog.string.TypedString = function() {
};
goog.structs = {};
goog.structs.Collection = function() {
};
var webdriver = {Key:{NULL:"\ue000", CANCEL:"\ue001", HELP:"\ue002", BACK_SPACE:"\ue003", TAB:"\ue004", CLEAR:"\ue005", RETURN:"\ue006", ENTER:"\ue007", SHIFT:"\ue008", CONTROL:"\ue009", ALT:"\ue00a", PAUSE:"\ue00b", ESCAPE:"\ue00c", SPACE:"\ue00d", PAGE_UP:"\ue00e", PAGE_DOWN:"\ue00f", END:"\ue010", HOME:"\ue011", ARROW_LEFT:"\ue012", LEFT:"\ue012", ARROW_UP:"\ue013", UP:"\ue013", ARROW_RIGHT:"\ue014", RIGHT:"\ue014", ARROW_DOWN:"\ue015", DOWN:"\ue015", INSERT:"\ue016", DELETE:"\ue017", SEMICOLON:"\ue018", 
EQUALS:"\ue019", NUMPAD0:"\ue01a", NUMPAD1:"\ue01b", NUMPAD2:"\ue01c", NUMPAD3:"\ue01d", NUMPAD4:"\ue01e", NUMPAD5:"\ue01f", NUMPAD6:"\ue020", NUMPAD7:"\ue021", NUMPAD8:"\ue022", NUMPAD9:"\ue023", MULTIPLY:"\ue024", ADD:"\ue025", SEPARATOR:"\ue026", SUBTRACT:"\ue027", DECIMAL:"\ue028", DIVIDE:"\ue029", F1:"\ue031", F2:"\ue032", F3:"\ue033", F4:"\ue034", F5:"\ue035", F6:"\ue036", F7:"\ue037", F8:"\ue038", F9:"\ue039", F10:"\ue03a", F11:"\ue03b", F12:"\ue03c", COMMAND:"\ue03d", META:"\ue03d"}};
/*

 The MIT License

 Copyright (c) 2007 Cybozu Labs, Inc.
 Copyright (c) 2012 Google Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to
 deal in the Software without restriction, including without limitation the
 rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 sell copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 IN THE SOFTWARE.
*/
var wgxpath = {Context:function(a, b, c) {
  this.node_ = a;
  this.position_ = b || 1;
  this.last_ = c || 1;
}};
wgxpath.Context.prototype.getNode = function() {
  return this.node_;
};
wgxpath.Context.prototype.getPosition = function() {
  return this.position_;
};
wgxpath.Context.prototype.getLast = function() {
  return this.last_;
};
wgxpath.DataType = {VOID:0, NUMBER:1, BOOLEAN:2, STRING:3, NODESET:4};
wgxpath.Lexer = function(a) {
  this.tokens_ = a;
  this.index_ = 0;
};
wgxpath.Lexer.tokenize = function(a) {
  a = a.match(wgxpath.Lexer.TOKEN_);
  for (var b = 0; b < a.length; b++) {
    wgxpath.Lexer.LEADING_WHITESPACE_.test(a[b]) && a.splice(b, 1);
  }
  return new wgxpath.Lexer(a);
};
wgxpath.Lexer.TOKEN_ = /\$?(?:(?![0-9-\.])(?:\*|[\w-\.]+):)?(?![0-9-\.])(?:\*|[\w-\.]+)|\/\/|\.\.|::|\d+(?:\.\d*)?|\.\d+|"[^"]*"|'[^']*'|[!<>]=|\s+|./g;
wgxpath.Lexer.LEADING_WHITESPACE_ = /^\s/;
wgxpath.Lexer.prototype.peek = function(a) {
  return this.tokens_[this.index_ + (a || 0)];
};
wgxpath.Lexer.prototype.next = function() {
  return this.tokens_[this.index_++];
};
wgxpath.Lexer.prototype.back = function() {
  this.index_--;
};
wgxpath.Lexer.prototype.empty = function() {
  return this.tokens_.length <= this.index_;
};
wgxpath.NodeTest = function() {
};
wgxpath.NodeTest.prototype.matches = goog.abstractMethod;
wgxpath.NodeTest.prototype.getName = goog.abstractMethod;
wgxpath.NodeTest.prototype.toString = goog.abstractMethod;
fxdriver.files = {};
fxdriver.files.createTempFile = function(a, b) {
  a = a || "";
  b = b || "";
  for (var c = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile), d = !0, f; d;) {
    d = a + Math.round(Math.random() * (new Date).getTime()) + b, f = c.clone(), f.append(d), d = f.exists();
  }
  f.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 438);
  return new fxdriver.files.File(f);
};
fxdriver.files.getFile = function(a) {
  if (a) {
    return new fxdriver.files.File(fxdriver.files.getLocalFile_(a));
  }
};
fxdriver.files.getLocalFile_ = function(a) {
  var b = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsILocalFile);
  b.initWithPath(a);
  b.exists() || b.createUnique(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 438);
  return b;
};
fxdriver.files.File = function(a) {
  this.nsIFile_ = a;
};
fxdriver.files.APPEND_MODE_ = 18;
fxdriver.files.READ_MODE_ = 1;
fxdriver.files.File.prototype.append = function(a) {
  var b = Components.classes["@mozilla.org/network/file-output-stream;1"].createInstance(Components.interfaces.nsIFileOutputStream);
  try {
    b.init(this.nsIFile_, fxdriver.files.APPEND_MODE_, 438, 0);
  } catch (d) {
    throw new WebDriverError(bot.ErrorCode.UNKNOWN_ERROR, d);
  }
  var c = Components.classes["@mozilla.org/intl/converter-output-stream;1"].createInstance(Components.interfaces.nsIConverterOutputStream);
  c.init(b, "UTF-8", 0, 0);
  c.writeString(a);
  c.close();
  b.close();
};
fxdriver.files.File.prototype.read = function() {
  var a = Components.classes["@mozilla.org/network/file-input-stream;1"].createInstance(Components.interfaces.nsIFileInputStream);
  a.init(this.nsIFile_, fxdriver.files.READ_MODE_, 438, 0);
  var b = Components.classes["@mozilla.org/intl/converter-input-stream;1"].createInstance(Components.interfaces.nsIConverterInputStream);
  b.init(a, "UTF-8", 1024, 0);
  for (var c = "", d = {}; 0 != b.readString(4096, d);) {
    c += d.value;
  }
  b.close();
  a.close();
  return c;
};
fxdriver.files.File.prototype.resetBuffer = function() {
  var a = this.nsIFile_.path;
  this.nsIFile_.remove(!0);
  this.nsIFile_ = fxdriver.files.getLocalFile_(a);
};
fxdriver.files.File.prototype.getFilePath = function() {
  return this.nsIFile_.path;
};
goog.Disposable = function() {
  goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.INCLUDE_STACK_ON_CREATION && (this.creationStack = Error().stack), goog.Disposable.instances_[goog.getUid(this)] = this);
  this.disposed_ = this.disposed_;
  this.onDisposeCallbacks_ = this.onDisposeCallbacks_;
};
goog.Disposable.MonitoringMode = {OFF:0, PERMANENT:1, INTERACTIVE:2};
goog.Disposable.MONITORING_MODE = 0;
goog.Disposable.INCLUDE_STACK_ON_CREATION = !0;
goog.Disposable.instances_ = {};
goog.Disposable.getUndisposedObjects = function() {
  var a = [], b;
  for (b in goog.Disposable.instances_) {
    goog.Disposable.instances_.hasOwnProperty(b) && a.push(goog.Disposable.instances_[Number(b)]);
  }
  return a;
};
goog.Disposable.clearUndisposedObjects = function() {
  goog.Disposable.instances_ = {};
};
goog.Disposable.prototype.disposed_ = !1;
goog.Disposable.prototype.isDisposed = function() {
  return this.disposed_;
};
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed;
goog.Disposable.prototype.dispose = function() {
  if (!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
    var a = goog.getUid(this);
    if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(a)) {
      throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
    }
    delete goog.Disposable.instances_[a];
  }
};
goog.Disposable.prototype.registerDisposable = function(a) {
  this.addOnDisposeCallback(goog.partial(goog.dispose, a));
};
goog.Disposable.prototype.addOnDisposeCallback = function(a, b) {
  this.disposed_ ? goog.isDef(b) ? a.call(b) : a() : (this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []), this.onDisposeCallbacks_.push(goog.isDef(b) ? goog.bind(a, b) : a));
};
goog.Disposable.prototype.disposeInternal = function() {
  if (this.onDisposeCallbacks_) {
    for (; this.onDisposeCallbacks_.length;) {
      this.onDisposeCallbacks_.shift()();
    }
  }
};
goog.Disposable.isDisposed = function(a) {
  return a && "function" == typeof a.isDisposed ? a.isDisposed() : !1;
};
goog.dispose = function(a) {
  a && "function" == typeof a.dispose && a.dispose();
};
goog.disposeAll = function(a) {
  for (var b = 0, c = arguments.length; b < c; ++b) {
    var d = arguments[b];
    goog.isArrayLike(d) ? goog.disposeAll.apply(null, d) : goog.dispose(d);
  }
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
  var f = "Assertion failed";
  if (c) {
    f += ": " + c;
    var g = d;
  } else {
    a && (f += ": " + a, g = b);
  }
  a = new goog.asserts.AssertionError("" + f, g || []);
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
goog.dom.TagName = function(a) {
  this.tagName_ = a;
};
goog.dom.TagName.prototype.toString = function() {
  return this.tagName_;
};
goog.dom.TagName.A = new goog.dom.TagName("A");
goog.dom.TagName.ABBR = new goog.dom.TagName("ABBR");
goog.dom.TagName.ACRONYM = new goog.dom.TagName("ACRONYM");
goog.dom.TagName.ADDRESS = new goog.dom.TagName("ADDRESS");
goog.dom.TagName.APPLET = new goog.dom.TagName("APPLET");
goog.dom.TagName.AREA = new goog.dom.TagName("AREA");
goog.dom.TagName.ARTICLE = new goog.dom.TagName("ARTICLE");
goog.dom.TagName.ASIDE = new goog.dom.TagName("ASIDE");
goog.dom.TagName.AUDIO = new goog.dom.TagName("AUDIO");
goog.dom.TagName.B = new goog.dom.TagName("B");
goog.dom.TagName.BASE = new goog.dom.TagName("BASE");
goog.dom.TagName.BASEFONT = new goog.dom.TagName("BASEFONT");
goog.dom.TagName.BDI = new goog.dom.TagName("BDI");
goog.dom.TagName.BDO = new goog.dom.TagName("BDO");
goog.dom.TagName.BIG = new goog.dom.TagName("BIG");
goog.dom.TagName.BLOCKQUOTE = new goog.dom.TagName("BLOCKQUOTE");
goog.dom.TagName.BODY = new goog.dom.TagName("BODY");
goog.dom.TagName.BR = new goog.dom.TagName("BR");
goog.dom.TagName.BUTTON = new goog.dom.TagName("BUTTON");
goog.dom.TagName.CANVAS = new goog.dom.TagName("CANVAS");
goog.dom.TagName.CAPTION = new goog.dom.TagName("CAPTION");
goog.dom.TagName.CENTER = new goog.dom.TagName("CENTER");
goog.dom.TagName.CITE = new goog.dom.TagName("CITE");
goog.dom.TagName.CODE = new goog.dom.TagName("CODE");
goog.dom.TagName.COL = new goog.dom.TagName("COL");
goog.dom.TagName.COLGROUP = new goog.dom.TagName("COLGROUP");
goog.dom.TagName.COMMAND = new goog.dom.TagName("COMMAND");
goog.dom.TagName.DATA = new goog.dom.TagName("DATA");
goog.dom.TagName.DATALIST = new goog.dom.TagName("DATALIST");
goog.dom.TagName.DD = new goog.dom.TagName("DD");
goog.dom.TagName.DEL = new goog.dom.TagName("DEL");
goog.dom.TagName.DETAILS = new goog.dom.TagName("DETAILS");
goog.dom.TagName.DFN = new goog.dom.TagName("DFN");
goog.dom.TagName.DIALOG = new goog.dom.TagName("DIALOG");
goog.dom.TagName.DIR = new goog.dom.TagName("DIR");
goog.dom.TagName.DIV = new goog.dom.TagName("DIV");
goog.dom.TagName.DL = new goog.dom.TagName("DL");
goog.dom.TagName.DT = new goog.dom.TagName("DT");
goog.dom.TagName.EM = new goog.dom.TagName("EM");
goog.dom.TagName.EMBED = new goog.dom.TagName("EMBED");
goog.dom.TagName.FIELDSET = new goog.dom.TagName("FIELDSET");
goog.dom.TagName.FIGCAPTION = new goog.dom.TagName("FIGCAPTION");
goog.dom.TagName.FIGURE = new goog.dom.TagName("FIGURE");
goog.dom.TagName.FONT = new goog.dom.TagName("FONT");
goog.dom.TagName.FOOTER = new goog.dom.TagName("FOOTER");
goog.dom.TagName.FORM = new goog.dom.TagName("FORM");
goog.dom.TagName.FRAME = new goog.dom.TagName("FRAME");
goog.dom.TagName.FRAMESET = new goog.dom.TagName("FRAMESET");
goog.dom.TagName.H1 = new goog.dom.TagName("H1");
goog.dom.TagName.H2 = new goog.dom.TagName("H2");
goog.dom.TagName.H3 = new goog.dom.TagName("H3");
goog.dom.TagName.H4 = new goog.dom.TagName("H4");
goog.dom.TagName.H5 = new goog.dom.TagName("H5");
goog.dom.TagName.H6 = new goog.dom.TagName("H6");
goog.dom.TagName.HEAD = new goog.dom.TagName("HEAD");
goog.dom.TagName.HEADER = new goog.dom.TagName("HEADER");
goog.dom.TagName.HGROUP = new goog.dom.TagName("HGROUP");
goog.dom.TagName.HR = new goog.dom.TagName("HR");
goog.dom.TagName.HTML = new goog.dom.TagName("HTML");
goog.dom.TagName.I = new goog.dom.TagName("I");
goog.dom.TagName.IFRAME = new goog.dom.TagName("IFRAME");
goog.dom.TagName.IMG = new goog.dom.TagName("IMG");
goog.dom.TagName.INPUT = new goog.dom.TagName("INPUT");
goog.dom.TagName.INS = new goog.dom.TagName("INS");
goog.dom.TagName.ISINDEX = new goog.dom.TagName("ISINDEX");
goog.dom.TagName.KBD = new goog.dom.TagName("KBD");
goog.dom.TagName.KEYGEN = new goog.dom.TagName("KEYGEN");
goog.dom.TagName.LABEL = new goog.dom.TagName("LABEL");
goog.dom.TagName.LEGEND = new goog.dom.TagName("LEGEND");
goog.dom.TagName.LI = new goog.dom.TagName("LI");
goog.dom.TagName.LINK = new goog.dom.TagName("LINK");
goog.dom.TagName.MAP = new goog.dom.TagName("MAP");
goog.dom.TagName.MARK = new goog.dom.TagName("MARK");
goog.dom.TagName.MATH = new goog.dom.TagName("MATH");
goog.dom.TagName.MENU = new goog.dom.TagName("MENU");
goog.dom.TagName.META = new goog.dom.TagName("META");
goog.dom.TagName.METER = new goog.dom.TagName("METER");
goog.dom.TagName.NAV = new goog.dom.TagName("NAV");
goog.dom.TagName.NOFRAMES = new goog.dom.TagName("NOFRAMES");
goog.dom.TagName.NOSCRIPT = new goog.dom.TagName("NOSCRIPT");
goog.dom.TagName.OBJECT = new goog.dom.TagName("OBJECT");
goog.dom.TagName.OL = new goog.dom.TagName("OL");
goog.dom.TagName.OPTGROUP = new goog.dom.TagName("OPTGROUP");
goog.dom.TagName.OPTION = new goog.dom.TagName("OPTION");
goog.dom.TagName.OUTPUT = new goog.dom.TagName("OUTPUT");
goog.dom.TagName.P = new goog.dom.TagName("P");
goog.dom.TagName.PARAM = new goog.dom.TagName("PARAM");
goog.dom.TagName.PRE = new goog.dom.TagName("PRE");
goog.dom.TagName.PROGRESS = new goog.dom.TagName("PROGRESS");
goog.dom.TagName.Q = new goog.dom.TagName("Q");
goog.dom.TagName.RP = new goog.dom.TagName("RP");
goog.dom.TagName.RT = new goog.dom.TagName("RT");
goog.dom.TagName.RUBY = new goog.dom.TagName("RUBY");
goog.dom.TagName.S = new goog.dom.TagName("S");
goog.dom.TagName.SAMP = new goog.dom.TagName("SAMP");
goog.dom.TagName.SCRIPT = new goog.dom.TagName("SCRIPT");
goog.dom.TagName.SECTION = new goog.dom.TagName("SECTION");
goog.dom.TagName.SELECT = new goog.dom.TagName("SELECT");
goog.dom.TagName.SMALL = new goog.dom.TagName("SMALL");
goog.dom.TagName.SOURCE = new goog.dom.TagName("SOURCE");
goog.dom.TagName.SPAN = new goog.dom.TagName("SPAN");
goog.dom.TagName.STRIKE = new goog.dom.TagName("STRIKE");
goog.dom.TagName.STRONG = new goog.dom.TagName("STRONG");
goog.dom.TagName.STYLE = new goog.dom.TagName("STYLE");
goog.dom.TagName.SUB = new goog.dom.TagName("SUB");
goog.dom.TagName.SUMMARY = new goog.dom.TagName("SUMMARY");
goog.dom.TagName.SUP = new goog.dom.TagName("SUP");
goog.dom.TagName.SVG = new goog.dom.TagName("SVG");
goog.dom.TagName.TABLE = new goog.dom.TagName("TABLE");
goog.dom.TagName.TBODY = new goog.dom.TagName("TBODY");
goog.dom.TagName.TD = new goog.dom.TagName("TD");
goog.dom.TagName.TEMPLATE = new goog.dom.TagName("TEMPLATE");
goog.dom.TagName.TEXTAREA = new goog.dom.TagName("TEXTAREA");
goog.dom.TagName.TFOOT = new goog.dom.TagName("TFOOT");
goog.dom.TagName.TH = new goog.dom.TagName("TH");
goog.dom.TagName.THEAD = new goog.dom.TagName("THEAD");
goog.dom.TagName.TIME = new goog.dom.TagName("TIME");
goog.dom.TagName.TITLE = new goog.dom.TagName("TITLE");
goog.dom.TagName.TR = new goog.dom.TagName("TR");
goog.dom.TagName.TRACK = new goog.dom.TagName("TRACK");
goog.dom.TagName.TT = new goog.dom.TagName("TT");
goog.dom.TagName.U = new goog.dom.TagName("U");
goog.dom.TagName.UL = new goog.dom.TagName("UL");
goog.dom.TagName.VAR = new goog.dom.TagName("VAR");
goog.dom.TagName.VIDEO = new goog.dom.TagName("VIDEO");
goog.dom.TagName.WBR = new goog.dom.TagName("WBR");
goog.dom.tags = {};
goog.dom.tags.VOID_TAGS_ = {area:!0, base:!0, br:!0, col:!0, command:!0, embed:!0, hr:!0, img:!0, input:!0, keygen:!0, link:!0, meta:!0, param:!0, source:!0, track:!0, wbr:!0};
goog.dom.tags.isVoidTag = function(a) {
  return !0 === goog.dom.tags.VOID_TAGS_[a];
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
wgxpath.KindTest = function(a, b) {
  this.typeName_ = a;
  this.literal_ = goog.isDef(b) ? b : null;
  this.type_ = null;
  switch(a) {
    case "comment":
      this.type_ = goog.dom.NodeType.COMMENT;
      break;
    case "text":
      this.type_ = goog.dom.NodeType.TEXT;
      break;
    case "processing-instruction":
      this.type_ = goog.dom.NodeType.PROCESSING_INSTRUCTION;
      break;
    case "node":
      break;
    default:
      throw Error("Unexpected argument");
  }
};
wgxpath.KindTest.isValidType = function(a) {
  return "comment" == a || "text" == a || "processing-instruction" == a || "node" == a;
};
wgxpath.KindTest.prototype.matches = function(a) {
  return goog.isNull(this.type_) || this.type_ == a.nodeType;
};
wgxpath.KindTest.prototype.getType = function() {
  return this.type_;
};
wgxpath.KindTest.prototype.getName = function() {
  return this.typeName_;
};
wgxpath.KindTest.prototype.toString = function() {
  var a = "Kind Test: " + this.typeName_;
  goog.isNull(this.literal_) || (a += wgxpath.Expr.indent(this.literal_));
  return a;
};
wgxpath.NameTest = function(a, b) {
  this.name_ = a.toLowerCase();
  a = this.name_ == wgxpath.NameTest.WILDCARD ? wgxpath.NameTest.WILDCARD : wgxpath.NameTest.HTML_NAMESPACE_URI_;
  this.namespaceUri_ = b ? b.toLowerCase() : a;
};
wgxpath.NameTest.HTML_NAMESPACE_URI_ = "http://www.w3.org/1999/xhtml";
wgxpath.NameTest.WILDCARD = "*";
wgxpath.NameTest.prototype.matches = function(a) {
  var b = a.nodeType;
  if (b != goog.dom.NodeType.ELEMENT && b != goog.dom.NodeType.ATTRIBUTE) {
    return !1;
  }
  b = goog.isDef(a.localName) ? a.localName : a.nodeName;
  if (this.name_ != wgxpath.NameTest.WILDCARD && this.name_ != b.toLowerCase()) {
    return !1;
  }
  if (this.namespaceUri_ == wgxpath.NameTest.WILDCARD) {
    return !0;
  }
  a = a.namespaceURI ? a.namespaceURI.toLowerCase() : wgxpath.NameTest.HTML_NAMESPACE_URI_;
  return this.namespaceUri_ == a;
};
wgxpath.NameTest.prototype.getName = function() {
  return this.name_;
};
wgxpath.NameTest.prototype.getNamespaceUri = function() {
  return this.namespaceUri_;
};
wgxpath.NameTest.prototype.toString = function() {
  return "Name Test: " + (this.namespaceUri_ == wgxpath.NameTest.HTML_NAMESPACE_URI_ ? "" : this.namespaceUri_ + ":") + this.name_;
};
wgxpath.nsResolver = {};
wgxpath.nsResolver.getResolver = function(a) {
  switch(a.nodeType) {
    case goog.dom.NodeType.ELEMENT:
      return goog.partial(wgxpath.nsResolver.resolveForElement_, a);
    case goog.dom.NodeType.DOCUMENT:
      return wgxpath.nsResolver.getResolver(a.documentElement);
    case goog.dom.NodeType.DOCUMENT_FRAGMENT:
    case goog.dom.NodeType.DOCUMENT_TYPE:
    case goog.dom.NodeType.ENTITY:
    case goog.dom.NodeType.NOTATION:
      return wgxpath.nsResolver.nullResolver_;
    default:
      return a.parentNode ? wgxpath.nsResolver.getResolver(a.parentNode) : wgxpath.nsResolver.nullResolver_;
  }
};
wgxpath.nsResolver.nullResolver_ = function(a) {
  return null;
};
wgxpath.nsResolver.HTML_NAMESPACE_URI_ = "http://www.w3.org/1999/xhtml";
wgxpath.nsResolver.resolveForElement_ = function(a, b) {
  if (a.prefix == b) {
    return a.namespaceURI || wgxpath.nsResolver.HTML_NAMESPACE_URI_;
  }
  var c = a.getAttributeNode("xmlns:" + b);
  return c && c.specified ? c.value || null : a.parentNode && a.parentNode.nodeType != goog.dom.NodeType.DOCUMENT ? wgxpath.nsResolver.resolveForElement_(a.parentNode, b) : null;
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
  for (var d = a.length, f = goog.isString(a) ? a.split("") : a, g = 0; g < d; g++) {
    g in f && b.call(c, f[g], g, a);
  }
};
goog.array.forEachRight = function(a, b, c) {
  for (var d = a.length, f = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; --d) {
    d in f && b.call(c, f[d], d, a);
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.filter.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, f = [], g = 0, h = goog.isString(a) ? a.split("") : a, k = 0; k < d; k++) {
    if (k in h) {
      var m = h[k];
      b.call(c, m, k, a) && (f[g++] = m);
    }
  }
  return f;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.map.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, f = Array(d), g = goog.isString(a) ? a.split("") : a, h = 0; h < d; h++) {
    h in g && (f[h] = b.call(c, g[h], h, a));
  }
  return f;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  d && (b = goog.bind(b, d));
  return Array.prototype.reduce.call(a, b, c);
} : function(a, b, c, d) {
  var f = c;
  goog.array.forEach(a, function(c, h) {
    f = b.call(d, f, c, h, a);
  });
  return f;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  goog.asserts.assert(null != b);
  d && (b = goog.bind(b, d));
  return Array.prototype.reduceRight.call(a, b, c);
} : function(a, b, c, d) {
  var f = c;
  goog.array.forEachRight(a, function(c, h) {
    f = b.call(d, f, c, h, a);
  });
  return f;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.some.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, f = goog.isString(a) ? a.split("") : a, g = 0; g < d; g++) {
    if (g in f && b.call(c, f[g], g, a)) {
      return !0;
    }
  }
  return !1;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return Array.prototype.every.call(a, b, c);
} : function(a, b, c) {
  for (var d = a.length, f = goog.isString(a) ? a.split("") : a, g = 0; g < d; g++) {
    if (g in f && !b.call(c, f[g], g, a)) {
      return !1;
    }
  }
  return !0;
};
goog.array.count = function(a, b, c) {
  var d = 0;
  goog.array.forEach(a, function(a, g, h) {
    b.call(c, a, g, h) && ++d;
  }, c);
  return d;
};
goog.array.find = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
};
goog.array.findIndex = function(a, b, c) {
  for (var d = a.length, f = goog.isString(a) ? a.split("") : a, g = 0; g < d; g++) {
    if (g in f && b.call(c, f[g], g, a)) {
      return g;
    }
  }
  return -1;
};
goog.array.findRight = function(a, b, c) {
  b = goog.array.findIndexRight(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b];
};
goog.array.findIndexRight = function(a, b, c) {
  for (var d = a.length, f = goog.isString(a) ? a.split("") : a, d = d - 1; 0 <= d; d--) {
    if (d in f && b.call(c, f[d], d, a)) {
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
  goog.array.forEachRight(a, function(f, g) {
    b.call(c, f, g, a) && goog.array.removeAt(a, g) && d++;
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
      var f = a.length || 0, g = d.length || 0;
      a.length = f + g;
      for (var h = 0; h < g; h++) {
        a[f + h] = d[h];
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
  for (var d = {}, f = 0, g = 0; g < a.length;) {
    var h = a[g++], k = c(h);
    Object.prototype.hasOwnProperty.call(d, k) || (d[k] = !0, b[f++] = h);
  }
  b.length = f;
};
goog.array.binarySearch = function(a, b, c) {
  return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b);
};
goog.array.binarySelect = function(a, b, c) {
  return goog.array.binarySearch_(a, b, !0, void 0, c);
};
goog.array.binarySearch_ = function(a, b, c, d, f) {
  for (var g = 0, h = a.length, k; g < h;) {
    var m = g + h >> 1;
    var p = c ? b.call(f, a[m], m, a) : b(d, a[m]);
    0 < p ? g = m + 1 : (h = m, k = !p);
  }
  return k ? g : ~g;
};
goog.array.sort = function(a, b) {
  a.sort(b || goog.array.defaultCompare);
};
goog.array.stableSort = function(a, b) {
  for (var c = Array(a.length), d = 0; d < a.length; d++) {
    c[d] = {index:d, value:a[d]};
  }
  var f = b || goog.array.defaultCompare;
  goog.array.sort(c, function(a, b) {
    return f(a.value, b.value) || a.index - b.index;
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
    var f = b(a[d - 1], a[d]);
    if (0 < f || 0 == f && c) {
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
  for (var f = 0; f < d; f++) {
    if (!c(a[f], b[f])) {
      return !1;
    }
  }
  return !0;
};
goog.array.compare3 = function(a, b, c) {
  c = c || goog.array.defaultCompare;
  for (var d = Math.min(a.length, b.length), f = 0; f < d; f++) {
    var g = c(a[f], b[f]);
    if (0 != g) {
      return g;
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
  for (var d = {}, f = 0; f < a.length; f++) {
    var g = a[f], h = b.call(c, g, f, a);
    goog.isDef(h) && (d[h] || (d[h] = [])).push(g);
  }
  return d;
};
goog.array.toObject = function(a, b, c) {
  var d = {};
  goog.array.forEach(a, function(f, g) {
    d[b.call(c, f, g, a)] = f;
  });
  return d;
};
goog.array.range = function(a, b, c) {
  var d = [], f = 0, g = a;
  c = c || 1;
  void 0 !== b && (f = a, g = b);
  if (0 > c * (g - f)) {
    return [];
  }
  if (0 < c) {
    for (a = f; a < g; a += c) {
      d.push(a);
    }
  } else {
    for (a = f; a > g; a += c) {
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
      for (var f = 0; f < d.length; f += 8192) {
        for (var g = goog.array.slice(d, f, f + 8192), g = goog.array.flatten.apply(null, g), h = 0; h < g.length; h++) {
          b.push(g[h]);
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
    for (var f = [], g = 0; g < arguments.length; g++) {
      f.push(arguments[g][d]);
    }
    b.push(f);
  }
  return b;
};
goog.array.shuffle = function(a, b) {
  b = b || Math.random;
  for (var c = a.length - 1; 0 < c; c--) {
    var d = Math.floor(b() * (c + 1)), f = a[c];
    a[c] = a[d];
    a[d] = f;
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
goog.events.Event = function(a, b) {
  this.type = a instanceof goog.events.EventId ? String(a) : a;
  this.currentTarget = this.target = b;
  this.defaultPrevented = this.propagationStopped_ = !1;
  this.returnValue_ = !0;
};
goog.events.Event.prototype.stopPropagation = function() {
  this.propagationStopped_ = !0;
};
goog.events.Event.prototype.preventDefault = function() {
  this.defaultPrevented = !0;
  this.returnValue_ = !1;
};
goog.events.Event.stopPropagation = function(a) {
  a.stopPropagation();
};
goog.events.Event.preventDefault = function(a) {
  a.preventDefault();
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
goog.string.Const = function() {
  this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = "";
  this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_;
};
goog.string.Const.prototype.implementsGoogStringTypedString = !0;
goog.string.Const.prototype.getTypedStringValue = function() {
  return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
};
goog.string.Const.prototype.toString = function() {
  return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}";
};
goog.string.Const.unwrap = function(a) {
  if (a instanceof goog.string.Const && a.constructor === goog.string.Const && a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_) {
    return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
  }
  goog.asserts.fail("expected object of type Const, got '" + a + "'");
  return "type_error:Const";
};
goog.string.Const.from = function(a) {
  return goog.string.Const.create__googStringSecurityPrivate_(a);
};
goog.string.Const.TYPE_MARKER_ = {};
goog.string.Const.create__googStringSecurityPrivate_ = function(a) {
  var b = new goog.string.Const;
  b.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = a;
  return b;
};
goog.string.Const.EMPTY = goog.string.Const.from("");
bot.color = {};
bot.color.standardizeColor = function(a, b) {
  return goog.array.contains(bot.color.COLOR_PROPERTIES_, a) ? (a = bot.color.maybeParseRgbaColor_(b) || bot.color.maybeParseRgbColor_(b) || bot.color.maybeConvertHexOrColorName_(b)) ? "rgba(" + a.join(", ") + ")" : b : b;
};
bot.color.COLOR_PROPERTIES_ = "backgroundColor borderTopColor borderRightColor borderBottomColor borderLeftColor color outlineColor".split(" ");
bot.color.HEX_TRIPLET_RE_ = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/;
bot.color.maybeConvertHexOrColorName_ = function(a) {
  a = a.toLowerCase();
  var b = goog.color.names[a.toLowerCase()];
  if (!b && (b = "#" == a.charAt(0) ? a : "#" + a, 4 == b.length && (b = b.replace(bot.color.HEX_TRIPLET_RE_, "#$1$1$2$2$3$3")), !bot.color.VALID_HEX_COLOR_RE_.test(b))) {
    return null;
  }
  a = parseInt(b.substr(1, 2), 16);
  var c = parseInt(b.substr(3, 2), 16), b = parseInt(b.substr(5, 2), 16);
  return [a, c, b, 1];
};
bot.color.VALID_HEX_COLOR_RE_ = /^#(?:[0-9a-f]{3}){1,2}$/i;
bot.color.RGBA_COLOR_RE_ = /^(?:rgba)?\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3}),\s?(0|1|0\.\d*)\)$/i;
bot.color.maybeParseRgbaColor_ = function(a) {
  var b = a.match(bot.color.RGBA_COLOR_RE_);
  if (b) {
    a = Number(b[1]);
    var c = Number(b[2]), d = Number(b[3]), b = Number(b[4]);
    if (0 <= a && 255 >= a && 0 <= c && 255 >= c && 0 <= d && 255 >= d && 0 <= b && 1 >= b) {
      return [a, c, d, b];
    }
  }
  return null;
};
bot.color.RGB_COLOR_RE_ = /^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i;
bot.color.maybeParseRgbColor_ = function(a) {
  var b = a.match(bot.color.RGB_COLOR_RE_);
  if (b) {
    a = Number(b[1]);
    var c = Number(b[2]), b = Number(b[3]);
    if (0 <= a && 255 >= a && 0 <= c && 255 >= c && 0 <= b && 255 >= b) {
      return [a, c, b, 1];
    }
  }
  return null;
};
bot.locators = {};
bot.locators.tagName = {};
bot.locators.tagName.single = function(a, b) {
  if ("" === a) {
    throw new bot.Error(bot.ErrorCode.INVALID_SELECTOR_ERROR, 'Unable to locate an element with the tagName ""');
  }
  return b.getElementsByTagName(a)[0] || null;
};
bot.locators.tagName.many = function(a, b) {
  if ("" === a) {
    throw new bot.Error(bot.ErrorCode.INVALID_SELECTOR_ERROR, 'Unable to locate an element with the tagName ""');
  }
  return b.getElementsByTagName(a);
};
goog.html = {};
goog.html.SafeScript = function() {
  this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = "";
  this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.SafeScript.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeScript.fromConstant = function(a) {
  a = goog.string.Const.unwrap(a);
  return 0 === a.length ? goog.html.SafeScript.EMPTY : goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeScript.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeScriptWrappedValue_;
};
goog.DEBUG && (goog.html.SafeScript.prototype.toString = function() {
  return "SafeScript{" + this.privateDoNotAccessOrElseSafeScriptWrappedValue_ + "}";
});
goog.html.SafeScript.unwrap = function(a) {
  if (a instanceof goog.html.SafeScript && a.constructor === goog.html.SafeScript && a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeScriptWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeScript, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeScript";
};
goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse = function(a) {
  return (new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(a);
};
goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
  this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = a;
  return this;
};
goog.html.SafeScript.EMPTY = goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");
goog.html.SafeStyle = function() {
  this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = "";
  this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.SafeStyle.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyle.fromConstant = function(a) {
  a = goog.string.Const.unwrap(a);
  if (0 === a.length) {
    return goog.html.SafeStyle.EMPTY;
  }
  goog.html.SafeStyle.checkStyle_(a);
  goog.asserts.assert(goog.string.endsWith(a, ";"), "Last character of style string is not ';': " + a);
  goog.asserts.assert(goog.string.contains(a, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + a);
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeStyle.checkStyle_ = function(a) {
  goog.asserts.assert(!/[<>]/.test(a), "Forbidden characters in style string: " + a);
};
goog.html.SafeStyle.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeStyleWrappedValue_;
};
goog.DEBUG && (goog.html.SafeStyle.prototype.toString = function() {
  return "SafeStyle{" + this.privateDoNotAccessOrElseSafeStyleWrappedValue_ + "}";
});
goog.html.SafeStyle.unwrap = function(a) {
  if (a instanceof goog.html.SafeStyle && a.constructor === goog.html.SafeStyle && a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeStyle, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeStyle";
};
goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse = function(a) {
  return (new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(a);
};
goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
  this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = a;
  return this;
};
goog.html.SafeStyle.EMPTY = goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
goog.html.SafeStyle.INNOCUOUS_STRING = "zClosurez";
goog.html.SafeStyle.create = function(a) {
  var b = "", c;
  for (c in a) {
    if (!/^[-_a-zA-Z0-9]+$/.test(c)) {
      throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
    }
    var d = a[c];
    null != d && (d instanceof goog.string.Const ? (d = goog.string.Const.unwrap(d), goog.asserts.assert(!/[{;}]/.test(d), "Value does not allow [{;}].")) : goog.html.SafeStyle.VALUE_RE_.test(d) ? goog.html.SafeStyle.hasBalancedQuotes_(d) || (goog.asserts.fail("String value requires balanced quotes, got: " + d), d = goog.html.SafeStyle.INNOCUOUS_STRING) : (goog.asserts.fail("String value allows only [-,.\"'%_!# a-zA-Z0-9], rgb() and rgba(), got: " + d), d = goog.html.SafeStyle.INNOCUOUS_STRING), 
    b += c + ":" + d + ";");
  }
  if (!b) {
    return goog.html.SafeStyle.EMPTY;
  }
  goog.html.SafeStyle.checkStyle_(b);
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.SafeStyle.hasBalancedQuotes_ = function(a) {
  for (var b = !0, c = !0, d = 0; d < a.length; d++) {
    var f = a.charAt(d);
    "'" == f && c ? b = !b : '"' == f && b && (c = !c);
  }
  return b && c;
};
goog.html.SafeStyle.VALUE_RE_ = /^([-,."'%_!# a-zA-Z0-9]+|(?:rgb|hsl)a?\([0-9.%, ]+\))$/;
goog.html.SafeStyle.concat = function(a) {
  var b = "", c = function(a) {
    goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyle.unwrap(a);
  };
  goog.array.forEach(arguments, c);
  return b ? goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b) : goog.html.SafeStyle.EMPTY;
};
goog.html.SafeStyleSheet = function() {
  this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = "";
  this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeStyleSheet.concat = function(a) {
  var b = "", c = function(a) {
    goog.isArray(a) ? goog.array.forEach(a, c) : b += goog.html.SafeStyleSheet.unwrap(a);
  };
  goog.array.forEach(arguments, c);
  return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.SafeStyleSheet.fromConstant = function(a) {
  a = goog.string.Const.unwrap(a);
  if (0 === a.length) {
    return goog.html.SafeStyleSheet.EMPTY;
  }
  goog.asserts.assert(!goog.string.contains(a, "<"), "Forbidden '<' character in style sheet string: " + a);
  return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeStyleSheet.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
};
goog.DEBUG && (goog.html.SafeStyleSheet.prototype.toString = function() {
  return "SafeStyleSheet{" + this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ + "}";
});
goog.html.SafeStyleSheet.unwrap = function(a) {
  if (a instanceof goog.html.SafeStyleSheet && a.constructor === goog.html.SafeStyleSheet && a.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeStyleSheet, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeStyleSheet";
};
goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse = function(a) {
  return (new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(a);
};
goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a) {
  this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = a;
  return this;
};
goog.html.SafeStyleSheet.EMPTY = goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");
goog.html.TrustedResourceUrl = function() {
  this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = "";
  this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
};
goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.TrustedResourceUrl.prototype.getDirection = function() {
  return goog.i18n.bidi.Dir.LTR;
};
goog.DEBUG && (goog.html.TrustedResourceUrl.prototype.toString = function() {
  return "TrustedResourceUrl{" + this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "}";
});
goog.html.TrustedResourceUrl.unwrap = function(a) {
  if (a instanceof goog.html.TrustedResourceUrl && a.constructor === goog.html.TrustedResourceUrl && a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
  }
  goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:TrustedResourceUrl";
};
goog.html.TrustedResourceUrl.format = function(a, b) {
  var c = goog.string.Const.unwrap(a);
  if (!goog.html.TrustedResourceUrl.BASE_URL_.test(c)) {
    throw Error("Invalid TrustedResourceUrl format: " + c);
  }
  a = c.replace(goog.html.TrustedResourceUrl.FORMAT_MARKER_, function(a, f) {
    if (!Object.prototype.hasOwnProperty.call(b, f)) {
      throw Error('Found marker, "' + f + '", in format string, "' + c + '", but no valid label mapping found in args: ' + JSON.stringify(b));
    }
    a = b[f];
    return a instanceof goog.string.Const ? goog.string.Const.unwrap(a) : encodeURIComponent(String(a));
  });
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.TrustedResourceUrl.FORMAT_MARKER_ = /%{(\w+)}/g;
goog.html.TrustedResourceUrl.BASE_URL_ = /^(?:https:)?\/\/[0-9a-z.:[\]-]+\/|^\/[^\/\\]|^about:blank(#|$)/i;
goog.html.TrustedResourceUrl.fromConstant = function(a) {
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a));
};
goog.html.TrustedResourceUrl.fromConstants = function(a) {
  for (var b = "", c = 0; c < a.length; c++) {
    b += goog.string.Const.unwrap(a[c]);
  }
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function(a) {
  var b = new goog.html.TrustedResourceUrl;
  b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = a;
  return b;
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
goog.math.randomInt = function(a) {
  return Math.floor(Math.random() * a);
};
goog.math.uniformRandom = function(a, b) {
  return a + Math.random() * (b - a);
};
goog.math.clamp = function(a, b, c) {
  return Math.min(Math.max(a, b), c);
};
goog.math.modulo = function(a, b) {
  a %= b;
  return 0 > a * b ? a + b : a;
};
goog.math.lerp = function(a, b, c) {
  return a + c * (b - a);
};
goog.math.nearlyEquals = function(a, b, c) {
  return Math.abs(a - b) <= (c || 0.000001);
};
goog.math.standardAngle = function(a) {
  return goog.math.modulo(a, 360);
};
goog.math.standardAngleInRadians = function(a) {
  return goog.math.modulo(a, 2 * Math.PI);
};
goog.math.toRadians = function(a) {
  return a * Math.PI / 180;
};
goog.math.toDegrees = function(a) {
  return 180 * a / Math.PI;
};
goog.math.angleDx = function(a, b) {
  return b * Math.cos(goog.math.toRadians(a));
};
goog.math.angleDy = function(a, b) {
  return b * Math.sin(goog.math.toRadians(a));
};
goog.math.angle = function(a, b, c, d) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)));
};
goog.math.angleDifference = function(a, b) {
  a = goog.math.standardAngle(b) - goog.math.standardAngle(a);
  180 < a ? a -= 360 : -180 >= a && (a = 360 + a);
  return a;
};
goog.math.sign = function(a) {
  return 0 < a ? 1 : 0 > a ? -1 : a;
};
goog.math.longestCommonSubsequence = function(a, b, c, d) {
  c = c || function(a, b) {
    return a == b;
  };
  d = d || function(b, c) {
    return a[b];
  };
  for (var f = a.length, g = b.length, h = [], k = 0; k < f + 1; k++) {
    h[k] = [], h[k][0] = 0;
  }
  for (var m = 0; m < g + 1; m++) {
    h[0][m] = 0;
  }
  for (k = 1; k <= f; k++) {
    for (m = 1; m <= g; m++) {
      c(a[k - 1], b[m - 1]) ? h[k][m] = h[k - 1][m - 1] + 1 : h[k][m] = Math.max(h[k - 1][m], h[k][m - 1]);
    }
  }
  for (var p = [], k = f, m = g; 0 < k && 0 < m;) {
    c(a[k - 1], b[m - 1]) ? (p.unshift(d(k - 1, m - 1)), k--, m--) : h[k - 1][m] > h[k][m - 1] ? k-- : m--;
  }
  return p;
};
goog.math.sum = function(a) {
  return goog.array.reduce(arguments, function(a, c) {
    return a + c;
  }, 0);
};
goog.math.average = function(a) {
  return goog.math.sum.apply(null, arguments) / arguments.length;
};
goog.math.sampleVariance = function(a) {
  var b = arguments.length;
  if (2 > b) {
    return 0;
  }
  var c = goog.math.average.apply(null, arguments);
  return goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
    return Math.pow(a - c, 2);
  })) / (b - 1);
};
goog.math.standardDeviation = function(a) {
  return Math.sqrt(goog.math.sampleVariance.apply(null, arguments));
};
goog.math.isInt = function(a) {
  return isFinite(a) && 0 == a % 1;
};
goog.math.isFiniteNumber = function(a) {
  return isFinite(a);
};
goog.math.isNegativeZero = function(a) {
  return 0 == a && 0 > 1 / a;
};
goog.math.log10Floor = function(a) {
  if (0 < a) {
    var b = Math.round(Math.log(a) * Math.LOG10E);
    return b - (parseFloat("1e" + b) > a ? 1 : 0);
  }
  return 0 == a ? -Infinity : NaN;
};
goog.math.safeFloor = function(a, b) {
  goog.asserts.assert(!goog.isDef(b) || 0 < b);
  return Math.floor(a + (b || 2e-15));
};
goog.math.safeCeil = function(a, b) {
  goog.asserts.assert(!goog.isDef(b) || 0 < b);
  return Math.ceil(a - (b || 2e-15));
};
goog.structs.getCount = function(a) {
  return a.getCount && "function" == typeof a.getCount ? a.getCount() : goog.isArrayLike(a) || goog.isString(a) ? a.length : goog.object.getCount(a);
};
goog.structs.getValues = function(a) {
  if (a.getValues && "function" == typeof a.getValues) {
    return a.getValues();
  }
  if (goog.isString(a)) {
    return a.split("");
  }
  if (goog.isArrayLike(a)) {
    for (var b = [], c = a.length, d = 0; d < c; d++) {
      b.push(a[d]);
    }
    return b;
  }
  return goog.object.getValues(a);
};
goog.structs.getKeys = function(a) {
  if (a.getKeys && "function" == typeof a.getKeys) {
    return a.getKeys();
  }
  if (!a.getValues || "function" != typeof a.getValues) {
    if (goog.isArrayLike(a) || goog.isString(a)) {
      var b = [];
      a = a.length;
      for (var c = 0; c < a; c++) {
        b.push(c);
      }
      return b;
    }
    return goog.object.getKeys(a);
  }
};
goog.structs.contains = function(a, b) {
  return a.contains && "function" == typeof a.contains ? a.contains(b) : a.containsValue && "function" == typeof a.containsValue ? a.containsValue(b) : goog.isArrayLike(a) || goog.isString(a) ? goog.array.contains(a, b) : goog.object.containsValue(a, b);
};
goog.structs.isEmpty = function(a) {
  return a.isEmpty && "function" == typeof a.isEmpty ? a.isEmpty() : goog.isArrayLike(a) || goog.isString(a) ? goog.array.isEmpty(a) : goog.object.isEmpty(a);
};
goog.structs.clear = function(a) {
  a.clear && "function" == typeof a.clear ? a.clear() : goog.isArrayLike(a) ? goog.array.clear(a) : goog.object.clear(a);
};
goog.structs.forEach = function(a, b, c) {
  if (a.forEach && "function" == typeof a.forEach) {
    a.forEach(b, c);
  } else {
    if (goog.isArrayLike(a) || goog.isString(a)) {
      goog.array.forEach(a, b, c);
    } else {
      for (var d = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length, h = 0; h < g; h++) {
        b.call(c, f[h], d && d[h], a);
      }
    }
  }
};
goog.structs.filter = function(a, b, c) {
  if ("function" == typeof a.filter) {
    return a.filter(b, c);
  }
  if (goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.filter(a, b, c);
  }
  var d = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length;
  if (d) {
    var h = {};
    for (var k = 0; k < g; k++) {
      b.call(c, f[k], d[k], a) && (h[d[k]] = f[k]);
    }
  } else {
    for (h = [], k = 0; k < g; k++) {
      b.call(c, f[k], void 0, a) && h.push(f[k]);
    }
  }
  return h;
};
goog.structs.map = function(a, b, c) {
  if ("function" == typeof a.map) {
    return a.map(b, c);
  }
  if (goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.map(a, b, c);
  }
  var d = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length;
  if (d) {
    var h = {};
    for (var k = 0; k < g; k++) {
      h[d[k]] = b.call(c, f[k], d[k], a);
    }
  } else {
    for (h = [], k = 0; k < g; k++) {
      h[k] = b.call(c, f[k], void 0, a);
    }
  }
  return h;
};
goog.structs.some = function(a, b, c) {
  if ("function" == typeof a.some) {
    return a.some(b, c);
  }
  if (goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.some(a, b, c);
  }
  for (var d = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length, h = 0; h < g; h++) {
    if (b.call(c, f[h], d && d[h], a)) {
      return !0;
    }
  }
  return !1;
};
goog.structs.every = function(a, b, c) {
  if ("function" == typeof a.every) {
    return a.every(b, c);
  }
  if (goog.isArrayLike(a) || goog.isString(a)) {
    return goog.array.every(a, b, c);
  }
  for (var d = goog.structs.getKeys(a), f = goog.structs.getValues(a), g = f.length, h = 0; h < g; h++) {
    if (!b.call(c, f[h], d && d[h], a)) {
      return !1;
    }
  }
  return !0;
};
goog.html.SafeUrl = function() {
  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
  this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
};
goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeUrl.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
};
goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeUrl.prototype.getDirection = function() {
  return goog.i18n.bidi.Dir.LTR;
};
goog.DEBUG && (goog.html.SafeUrl.prototype.toString = function() {
  return "SafeUrl{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}";
});
goog.html.SafeUrl.unwrap = function(a) {
  if (a instanceof goog.html.SafeUrl && a.constructor === goog.html.SafeUrl && a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeUrl, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeUrl";
};
goog.html.SafeUrl.fromConstant = function(a) {
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a));
};
goog.html.SAFE_MIME_TYPE_PATTERN_ = /^(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm))$/i;
goog.html.SafeUrl.fromBlob = function(a) {
  a = goog.html.SAFE_MIME_TYPE_PATTERN_.test(a.type) ? goog.fs.url.createObjectUrl(a) : goog.html.SafeUrl.INNOCUOUS_STRING;
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.DATA_URL_PATTERN_ = /^data:([^;,]*);base64,[a-z0-9+\/]+=*$/i;
goog.html.SafeUrl.fromDataUrl = function(a) {
  var b = a.match(goog.html.DATA_URL_PATTERN_), b = b && goog.html.SAFE_MIME_TYPE_PATTERN_.test(b[1]);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b ? a : goog.html.SafeUrl.INNOCUOUS_STRING);
};
goog.html.SafeUrl.fromTelUrl = function(a) {
  goog.string.caseInsensitiveStartsWith(a, "tel:") || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeUrl.fromTrustedResourceUrl = function(a) {
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.TrustedResourceUrl.unwrap(a));
};
goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
goog.html.SafeUrl.sanitize = function(a) {
  if (a instanceof goog.html.SafeUrl) {
    return a;
  }
  a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
  goog.html.SAFE_URL_PATTERN_.test(a) || (a = goog.html.SafeUrl.INNOCUOUS_STRING);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function(a) {
  var b = new goog.html.SafeUrl;
  b.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
  return b;
};
goog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : {message:"StopIteration", stack:""};
goog.iter.Iterator = function() {
};
goog.iter.Iterator.prototype.next = function() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function(a) {
  return this;
};
goog.iter.toIterator = function(a) {
  if (a instanceof goog.iter.Iterator) {
    return a;
  }
  if ("function" == typeof a.__iterator__) {
    return a.__iterator__(!1);
  }
  if (goog.isArrayLike(a)) {
    var b = 0, c = new goog.iter.Iterator;
    c.next = function() {
      for (;;) {
        if (b >= a.length) {
          throw goog.iter.StopIteration;
        }
        if (b in a) {
          return a[b++];
        }
        b++;
      }
    };
    return c;
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function(a, b, c) {
  if (goog.isArrayLike(a)) {
    try {
      goog.array.forEach(a, b, c);
    } catch (d) {
      if (d !== goog.iter.StopIteration) {
        throw d;
      }
    }
  } else {
    a = goog.iter.toIterator(a);
    try {
      for (;;) {
        b.call(c, a.next(), void 0, a);
      }
    } catch (d) {
      if (d !== goog.iter.StopIteration) {
        throw d;
      }
    }
  }
};
goog.iter.filter = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  a.next = function() {
    for (;;) {
      var a = d.next();
      if (b.call(c, a, void 0, d)) {
        return a;
      }
    }
  };
  return a;
};
goog.iter.filterFalse = function(a, b, c) {
  return goog.iter.filter(a, goog.functions.not(b), c);
};
goog.iter.range = function(a, b, c) {
  var d = 0, f = a, g = c || 1;
  1 < arguments.length && (d = a, f = b);
  if (0 == g) {
    throw Error("Range step argument must not be zero");
  }
  var h = new goog.iter.Iterator;
  h.next = function() {
    if (0 < g && d >= f || 0 > g && d <= f) {
      throw goog.iter.StopIteration;
    }
    var a = d;
    d += g;
    return a;
  };
  return h;
};
goog.iter.join = function(a, b) {
  return goog.iter.toArray(a).join(b);
};
goog.iter.map = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  a.next = function() {
    var a = d.next();
    return b.call(c, a, void 0, d);
  };
  return a;
};
goog.iter.reduce = function(a, b, c, d) {
  var f = c;
  goog.iter.forEach(a, function(a) {
    f = b.call(d, f, a);
  });
  return f;
};
goog.iter.some = function(a, b, c) {
  a = goog.iter.toIterator(a);
  try {
    for (;;) {
      if (b.call(c, a.next(), void 0, a)) {
        return !0;
      }
    }
  } catch (d) {
    if (d !== goog.iter.StopIteration) {
      throw d;
    }
  }
  return !1;
};
goog.iter.every = function(a, b, c) {
  a = goog.iter.toIterator(a);
  try {
    for (;;) {
      if (!b.call(c, a.next(), void 0, a)) {
        return !1;
      }
    }
  } catch (d) {
    if (d !== goog.iter.StopIteration) {
      throw d;
    }
  }
  return !0;
};
goog.iter.chain = function(a) {
  return goog.iter.chainFromIterable(arguments);
};
goog.iter.chainFromIterable = function(a) {
  var b = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  var c = null;
  a.next = function() {
    for (;;) {
      if (null == c) {
        var a = b.next();
        c = goog.iter.toIterator(a);
      }
      try {
        return c.next();
      } catch (f) {
        if (f !== goog.iter.StopIteration) {
          throw f;
        }
        c = null;
      }
    }
  };
  return a;
};
goog.iter.dropWhile = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  var f = !0;
  a.next = function() {
    for (;;) {
      var a = d.next();
      if (!f || !b.call(c, a, void 0, d)) {
        return f = !1, a;
      }
    }
  };
  return a;
};
goog.iter.takeWhile = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  a.next = function() {
    var a = d.next();
    if (b.call(c, a, void 0, d)) {
      return a;
    }
    throw goog.iter.StopIteration;
  };
  return a;
};
goog.iter.toArray = function(a) {
  if (goog.isArrayLike(a)) {
    return goog.array.toArray(a);
  }
  a = goog.iter.toIterator(a);
  var b = [];
  goog.iter.forEach(a, function(a) {
    b.push(a);
  });
  return b;
};
goog.iter.equals = function(a, b, c) {
  a = goog.iter.zipLongest({}, a, b);
  var d = c || goog.array.defaultCompareEquality;
  return goog.iter.every(a, function(a) {
    return d(a[0], a[1]);
  });
};
goog.iter.nextOrValue = function(a, b) {
  try {
    return goog.iter.toIterator(a).next();
  } catch (c) {
    if (c != goog.iter.StopIteration) {
      throw c;
    }
    return b;
  }
};
goog.iter.product = function(a) {
  if (goog.array.some(arguments, function(a) {
    return !a.length;
  }) || !arguments.length) {
    return new goog.iter.Iterator;
  }
  var b = new goog.iter.Iterator, c = arguments, d = goog.array.repeat(0, c.length);
  b.next = function() {
    if (d) {
      for (var a = goog.array.map(d, function(a, b) {
        return c[b][a];
      }), b = d.length - 1; 0 <= b; b--) {
        goog.asserts.assert(d);
        if (d[b] < c[b].length - 1) {
          d[b]++;
          break;
        }
        if (0 == b) {
          d = null;
          break;
        }
        d[b] = 0;
      }
      return a;
    }
    throw goog.iter.StopIteration;
  };
  return b;
};
goog.iter.cycle = function(a) {
  var b = goog.iter.toIterator(a), c = [], d = 0;
  a = new goog.iter.Iterator;
  var f = !1;
  a.next = function() {
    var a = null;
    if (!f) {
      try {
        return a = b.next(), c.push(a), a;
      } catch (h) {
        if (h != goog.iter.StopIteration || goog.array.isEmpty(c)) {
          throw h;
        }
        f = !0;
      }
    }
    a = c[d];
    d = (d + 1) % c.length;
    return a;
  };
  return a;
};
goog.iter.count = function(a, b) {
  var c = a || 0, d = goog.isDef(b) ? b : 1;
  a = new goog.iter.Iterator;
  a.next = function() {
    var a = c;
    c += d;
    return a;
  };
  return a;
};
goog.iter.repeat = function(a) {
  var b = new goog.iter.Iterator;
  b.next = goog.functions.constant(a);
  return b;
};
goog.iter.accumulate = function(a) {
  var b = goog.iter.toIterator(a), c = 0;
  a = new goog.iter.Iterator;
  a.next = function() {
    return c += b.next();
  };
  return a;
};
goog.iter.zip = function(a) {
  var b = arguments, c = new goog.iter.Iterator;
  if (0 < b.length) {
    var d = goog.array.map(b, goog.iter.toIterator);
    c.next = function() {
      return goog.array.map(d, function(a) {
        return a.next();
      });
    };
  }
  return c;
};
goog.iter.zipLongest = function(a, b) {
  var c = goog.array.slice(arguments, 1), d = new goog.iter.Iterator;
  if (0 < c.length) {
    var f = goog.array.map(c, goog.iter.toIterator);
    d.next = function() {
      var b = !1, c = goog.array.map(f, function(c) {
        try {
          var d = c.next();
          b = !0;
        } catch (p) {
          if (p !== goog.iter.StopIteration) {
            throw p;
          }
          d = a;
        }
        return d;
      });
      if (!b) {
        throw goog.iter.StopIteration;
      }
      return c;
    };
  }
  return d;
};
goog.iter.compress = function(a, b) {
  var c = goog.iter.toIterator(b);
  return goog.iter.filter(a, function() {
    return !!c.next();
  });
};
goog.iter.GroupByIterator_ = function(a, b) {
  this.iterator = goog.iter.toIterator(a);
  this.keyFunc = b || goog.functions.identity;
};
goog.inherits(goog.iter.GroupByIterator_, goog.iter.Iterator);
goog.iter.GroupByIterator_.prototype.next = function() {
  for (; this.currentKey == this.targetKey;) {
    this.currentValue = this.iterator.next(), this.currentKey = this.keyFunc(this.currentValue);
  }
  this.targetKey = this.currentKey;
  return [this.currentKey, this.groupItems_(this.targetKey)];
};
goog.iter.GroupByIterator_.prototype.groupItems_ = function(a) {
  for (var b = []; this.currentKey == a;) {
    b.push(this.currentValue);
    try {
      this.currentValue = this.iterator.next();
    } catch (c) {
      if (c !== goog.iter.StopIteration) {
        throw c;
      }
      break;
    }
    this.currentKey = this.keyFunc(this.currentValue);
  }
  return b;
};
goog.iter.groupBy = function(a, b) {
  return new goog.iter.GroupByIterator_(a, b);
};
goog.iter.starMap = function(a, b, c) {
  var d = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  a.next = function() {
    var a = goog.iter.toArray(d.next());
    return b.apply(c, goog.array.concat(a, void 0, d));
  };
  return a;
};
goog.iter.tee = function(a, b) {
  var c = goog.iter.toIterator(a);
  a = goog.isNumber(b) ? b : 2;
  var d = goog.array.map(goog.array.range(a), function() {
    return [];
  }), f = function() {
    var a = c.next();
    goog.array.forEach(d, function(b) {
      b.push(a);
    });
  };
  return goog.array.map(d, function(a) {
    var b = new goog.iter.Iterator;
    b.next = function() {
      goog.array.isEmpty(a) && f();
      goog.asserts.assert(!goog.array.isEmpty(a));
      return a.shift();
    };
    return b;
  });
};
goog.iter.enumerate = function(a, b) {
  return goog.iter.zip(goog.iter.count(b), a);
};
goog.iter.limit = function(a, b) {
  goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
  var c = goog.iter.toIterator(a);
  a = new goog.iter.Iterator;
  var d = b;
  a.next = function() {
    if (0 < d--) {
      return c.next();
    }
    throw goog.iter.StopIteration;
  };
  return a;
};
goog.iter.consume = function(a, b) {
  goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
  for (a = goog.iter.toIterator(a); 0 < b--;) {
    goog.iter.nextOrValue(a, null);
  }
  return a;
};
goog.iter.slice = function(a, b, c) {
  goog.asserts.assert(goog.math.isInt(b) && 0 <= b);
  a = goog.iter.consume(a, b);
  goog.isNumber(c) && (goog.asserts.assert(goog.math.isInt(c) && c >= b), a = goog.iter.limit(a, c - b));
  return a;
};
goog.iter.hasDuplicates_ = function(a) {
  var b = [];
  goog.array.removeDuplicates(a, b);
  return a.length != b.length;
};
goog.iter.permutations = function(a, b) {
  a = goog.iter.toArray(a);
  b = goog.isNumber(b) ? b : a.length;
  b = goog.array.repeat(a, b);
  b = goog.iter.product.apply(void 0, b);
  return goog.iter.filter(b, function(a) {
    return !goog.iter.hasDuplicates_(a);
  });
};
goog.iter.combinations = function(a, b) {
  function c(a) {
    return d[a];
  }
  var d = goog.iter.toArray(a);
  a = goog.iter.range(d.length);
  b = goog.iter.permutations(a, b);
  var f = goog.iter.filter(b, function(a) {
    return goog.array.isSorted(a);
  });
  b = new goog.iter.Iterator;
  b.next = function() {
    return goog.array.map(f.next(), c);
  };
  return b;
};
goog.iter.combinationsWithReplacement = function(a, b) {
  function c(a) {
    return d[a];
  }
  var d = goog.iter.toArray(a);
  a = goog.array.range(d.length);
  b = goog.array.repeat(a, b);
  b = goog.iter.product.apply(void 0, b);
  var f = goog.iter.filter(b, function(a) {
    return goog.array.isSorted(a);
  });
  b = new goog.iter.Iterator;
  b.next = function() {
    return goog.array.map(f.next(), c);
  };
  return b;
};
goog.math.Coordinate = function(a, b) {
  this.x = goog.isDef(a) ? a : 0;
  this.y = goog.isDef(b) ? b : 0;
};
goog.math.Coordinate.prototype.clone = function() {
  return new goog.math.Coordinate(this.x, this.y);
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
  return "(" + this.x + ", " + this.y + ")";
});
goog.math.Coordinate.prototype.equals = function(a) {
  return a instanceof goog.math.Coordinate && goog.math.Coordinate.equals(this, a);
};
goog.math.Coordinate.equals = function(a, b) {
  return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1;
};
goog.math.Coordinate.distance = function(a, b) {
  var c = a.x - b.x;
  a = a.y - b.y;
  return Math.sqrt(c * c + a * a);
};
goog.math.Coordinate.magnitude = function(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
};
goog.math.Coordinate.azimuth = function(a) {
  return goog.math.angle(0, 0, a.x, a.y);
};
goog.math.Coordinate.squaredDistance = function(a, b) {
  var c = a.x - b.x;
  a = a.y - b.y;
  return c * c + a * a;
};
goog.math.Coordinate.difference = function(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y);
};
goog.math.Coordinate.sum = function(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y);
};
goog.math.Coordinate.prototype.ceil = function() {
  this.x = Math.ceil(this.x);
  this.y = Math.ceil(this.y);
  return this;
};
goog.math.Coordinate.prototype.floor = function() {
  this.x = Math.floor(this.x);
  this.y = Math.floor(this.y);
  return this;
};
goog.math.Coordinate.prototype.round = function() {
  this.x = Math.round(this.x);
  this.y = Math.round(this.y);
  return this;
};
goog.math.Coordinate.prototype.translate = function(a, b) {
  a instanceof goog.math.Coordinate ? (this.x += a.x, this.y += a.y) : (this.x += Number(a), goog.isNumber(b) && (this.y += b));
  return this;
};
goog.math.Coordinate.prototype.scale = function(a, b) {
  b = goog.isNumber(b) ? b : a;
  this.x *= a;
  this.y *= b;
  return this;
};
goog.math.Coordinate.prototype.rotateRadians = function(a, b) {
  b = b || new goog.math.Coordinate(0, 0);
  var c = this.x, d = this.y, f = Math.cos(a);
  a = Math.sin(a);
  this.x = (c - b.x) * f - (d - b.y) * a + b.x;
  this.y = (c - b.x) * a + (d - b.y) * f + b.y;
};
goog.math.Coordinate.prototype.rotateDegrees = function(a, b) {
  this.rotateRadians(goog.math.toRadians(a), b);
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
  var d = c.onerror, f = !!b;
  goog.userAgent.WEBKIT && !goog.userAgent.isVersionOrHigher("535.3") && (f = !f);
  c.onerror = function(b, c, k, m, p) {
    d && d(b, c, k, m, p);
    a({message:b, fileName:c, line:k, col:m, error:p});
    return f;
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
      var f = d + " = ";
      try {
        f += a[d];
      } catch (g) {
        f += "*** " + g + " ***";
      }
      c.push(f);
    }
  }
  return c.join("\n");
};
goog.debug.deepExpose = function(a, b) {
  var c = [], d = [], f = {}, g = function(a, k) {
    var h = k + "  ";
    try {
      if (goog.isDef(a)) {
        if (goog.isNull(a)) {
          c.push("NULL");
        } else {
          if (goog.isString(a)) {
            c.push('"' + a.replace(/\n/g, "\n" + k) + '"');
          } else {
            if (goog.isFunction(a)) {
              c.push(String(a).replace(/\n/g, "\n" + k));
            } else {
              if (goog.isObject(a)) {
                goog.hasUid(a) || d.push(a);
                var p = goog.getUid(a);
                if (f[p]) {
                  c.push("*** reference loop detected (id=" + p + ") ***");
                } else {
                  f[p] = !0;
                  c.push("{");
                  for (var r in a) {
                    if (b || !goog.isFunction(a[r])) {
                      c.push("\n"), c.push(h), c.push(r + " = "), g(a[r], h);
                    }
                  }
                  c.push("\n" + k + "}");
                  delete f[p];
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
    } catch (l) {
      c.push("*** " + l + " ***");
    }
  };
  g(a, "");
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
  } catch (g) {
    d = "Not available", c = !0;
  }
  try {
    var f = a.fileName || a.filename || a.sourceURL || goog.global.$googDebugFname || b;
  } catch (g) {
    f = "Not available", c = !0;
  }
  return !c && a.lineNumber && a.fileName && a.stack && a.message && a.name ? a : {message:a.message || "Not available", name:a.name || "UnknownError", lineNumber:d, fileName:f, stack:a.stack || "Not available"};
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
    } catch (f) {
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
      for (var d = a.arguments, f = 0; d && f < d.length; f++) {
        0 < f && c.push(", ");
        var g = d[f];
        switch(typeof g) {
          case "object":
            g = g ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            g = String(g);
            break;
          case "boolean":
            g = g ? "true" : "false";
            break;
          case "function":
            g = (g = goog.debug.getFunctionName(g)) ? g : "[fn]";
            break;
          default:
            g = typeof g;
        }
        40 < g.length && (g = g.substr(0, 40) + "...");
        c.push(g);
      }
      b.push(a);
      c.push(")\n");
      try {
        c.push(goog.debug.getStacktraceHelper_(a.caller, b));
      } catch (h) {
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
goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentModeOrHigher(9) || goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9.1"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), CAN_USE_PARENT_ELEMENT_PROPERTY:goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT, 
INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE, LEGACY_IE_RANGES:goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)};
goog.dom.selection = {};
goog.dom.selection.setStart = function(a, b) {
  if (goog.dom.selection.useSelectionProperties_(a)) {
    a.selectionStart = b;
  } else {
    if (goog.dom.selection.isLegacyIe_()) {
      var c = goog.dom.selection.getRangeIe_(a), d = c[0];
      d.inRange(c[1]) && (b = goog.dom.selection.canonicalizePositionIe_(a, b), d.collapse(!0), d.move("character", b), d.select());
    }
  }
};
goog.dom.selection.getStart = function(a) {
  return goog.dom.selection.getEndPoints_(a, !0)[0];
};
goog.dom.selection.getEndPointsTextareaIe_ = function(a, b, c) {
  b = b.duplicate();
  for (var d = a.text, f = d, g = b.text, h = g, k = !1; !k;) {
    0 == a.compareEndPoints("StartToEnd", a) ? k = !0 : (a.moveEnd("character", -1), a.text == d ? f += "\r\n" : k = !0);
  }
  if (c) {
    return [f.length, -1];
  }
  for (a = !1; !a;) {
    0 == b.compareEndPoints("StartToEnd", b) ? a = !0 : (b.moveEnd("character", -1), b.text == g ? h += "\r\n" : a = !0);
  }
  return [f.length, f.length + h.length];
};
goog.dom.selection.getEndPoints = function(a) {
  return goog.dom.selection.getEndPoints_(a, !1);
};
goog.dom.selection.getEndPoints_ = function(a, b) {
  var c = 0, d = 0;
  if (goog.dom.selection.useSelectionProperties_(a)) {
    c = a.selectionStart, d = b ? -1 : a.selectionEnd;
  } else {
    if (goog.dom.selection.isLegacyIe_()) {
      var f = goog.dom.selection.getRangeIe_(a), g = f[0], f = f[1];
      if (g.inRange(f)) {
        g.setEndPoint("EndToStart", f);
        if (a.type == goog.dom.InputType.TEXTAREA) {
          return goog.dom.selection.getEndPointsTextareaIe_(g, f, b);
        }
        c = g.text.length;
        d = b ? -1 : g.text.length + f.text.length;
      }
    }
  }
  return [c, d];
};
goog.dom.selection.setEnd = function(a, b) {
  if (goog.dom.selection.useSelectionProperties_(a)) {
    a.selectionEnd = b;
  } else {
    if (goog.dom.selection.isLegacyIe_()) {
      var c = goog.dom.selection.getRangeIe_(a), d = c[1];
      c[0].inRange(d) && (b = goog.dom.selection.canonicalizePositionIe_(a, b), a = goog.dom.selection.canonicalizePositionIe_(a, goog.dom.selection.getStart(a)), d.collapse(!0), d.moveEnd("character", b - a), d.select());
    }
  }
};
goog.dom.selection.getEnd = function(a) {
  return goog.dom.selection.getEndPoints_(a, !1)[1];
};
goog.dom.selection.setCursorPosition = function(a, b) {
  goog.dom.selection.useSelectionProperties_(a) ? (a.selectionStart = b, a.selectionEnd = b) : goog.dom.selection.isLegacyIe_() && (b = goog.dom.selection.canonicalizePositionIe_(a, b), a = a.createTextRange(), a.collapse(!0), a.move("character", b), a.select());
};
goog.dom.selection.setText = function(a, b) {
  if (goog.dom.selection.useSelectionProperties_(a)) {
    var c = a.value, d = a.selectionStart, f = c.substr(0, d), c = c.substr(a.selectionEnd);
    a.value = f + b + c;
    a.selectionStart = d;
    a.selectionEnd = d + b.length;
  } else {
    if (goog.dom.selection.isLegacyIe_()) {
      d = goog.dom.selection.getRangeIe_(a), a = d[1], d[0].inRange(a) && (d = a.duplicate(), a.text = b, a.setEndPoint("StartToStart", d), a.select());
    } else {
      throw Error("Cannot set the selection end");
    }
  }
};
goog.dom.selection.getText = function(a) {
  if (goog.dom.selection.useSelectionProperties_(a)) {
    return a.value.substring(a.selectionStart, a.selectionEnd);
  }
  if (goog.dom.selection.isLegacyIe_()) {
    var b = goog.dom.selection.getRangeIe_(a), c = b[1];
    return b[0].inRange(c) ? a.type == goog.dom.InputType.TEXTAREA ? goog.dom.selection.getSelectionRangeText_(c) : c.text : "";
  }
  throw Error("Cannot get the selection text");
};
goog.dom.selection.getSelectionRangeText_ = function(a) {
  a = a.duplicate();
  for (var b = a.text, c = b, d = !1; !d;) {
    0 == a.compareEndPoints("StartToEnd", a) ? d = !0 : (a.moveEnd("character", -1), a.text == b ? c += "\r\n" : d = !0);
  }
  return c;
};
goog.dom.selection.getRangeIe_ = function(a) {
  var b = a.ownerDocument || a.document, c = b.selection.createRange();
  a.type == goog.dom.InputType.TEXTAREA ? (b = b.body.createTextRange(), b.moveToElementText(a)) : b = a.createTextRange();
  return [b, c];
};
goog.dom.selection.canonicalizePositionIe_ = function(a, b) {
  a.type == goog.dom.InputType.TEXTAREA && (a = a.value.substring(0, b), b = goog.string.canonicalizeNewlines(a).length);
  return b;
};
goog.dom.selection.useSelectionProperties_ = function(a) {
  try {
    return "number" == typeof a.selectionStart;
  } catch (b) {
    return !1;
  }
};
goog.dom.selection.isLegacyIe_ = function() {
  return goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9");
};
goog.dom.vendor = {};
goog.dom.vendor.getVendorJsPrefix = function() {
  return goog.userAgent.WEBKIT ? "Webkit" : goog.userAgent.GECKO ? "Moz" : goog.userAgent.IE ? "ms" : goog.userAgent.OPERA ? "O" : null;
};
goog.dom.vendor.getVendorPrefix = function() {
  return goog.userAgent.WEBKIT ? "-webkit" : goog.userAgent.GECKO ? "-moz" : goog.userAgent.IE ? "-ms" : goog.userAgent.OPERA ? "-o" : null;
};
goog.dom.vendor.getPrefixedPropertyName = function(a, b) {
  if (b && a in b) {
    return a;
  }
  var c = goog.dom.vendor.getVendorJsPrefix();
  return c ? (c = c.toLowerCase(), a = c + goog.string.toTitleCase(a), !goog.isDef(b) || a in b ? a : null) : null;
};
goog.dom.vendor.getPrefixedEventType = function(a) {
  return ((goog.dom.vendor.getVendorJsPrefix() || "") + a).toLowerCase();
};
goog.events.BrowserFeature = {HAS_W3C_BUTTON:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), HAS_W3C_EVENT_SUPPORT:!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9), SET_KEY_CODE_TO_PREVENT_DEFAULT:goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), HAS_NAVIGATOR_ONLINE_PROPERTY:!goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("528"), HAS_HTML5_NETWORK_EVENT_SUPPORT:goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9b") || goog.userAgent.IE && 
goog.userAgent.isVersionOrHigher("8") || goog.userAgent.OPERA && goog.userAgent.isVersionOrHigher("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("528"), HTML5_NETWORK_EVENTS_FIRE_ON_BODY:goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("8") || goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"), TOUCH_ENABLED:"ontouchstart" in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!goog.global.navigator || 
!goog.global.navigator.msMaxTouchPoints)};
goog.events.getVendorPrefixedName_ = function(a) {
  return goog.userAgent.WEBKIT ? "webkit" + a : goog.userAgent.OPERA ? "o" + a.toLowerCase() : a.toLowerCase();
};
goog.events.EventType = {CLICK:"click", RIGHTCLICK:"rightclick", DBLCLICK:"dblclick", MOUSEDOWN:"mousedown", MOUSEUP:"mouseup", MOUSEOVER:"mouseover", MOUSEOUT:"mouseout", MOUSEMOVE:"mousemove", MOUSEENTER:"mouseenter", MOUSELEAVE:"mouseleave", SELECTIONCHANGE:"selectionchange", SELECTSTART:"selectstart", WHEEL:"wheel", KEYPRESS:"keypress", KEYDOWN:"keydown", KEYUP:"keyup", BLUR:"blur", FOCUS:"focus", DEACTIVATE:"deactivate", FOCUSIN:goog.userAgent.IE ? "focusin" : "DOMFocusIn", FOCUSOUT:goog.userAgent.IE ? 
"focusout" : "DOMFocusOut", CHANGE:"change", RESET:"reset", SELECT:"select", SUBMIT:"submit", INPUT:"input", PROPERTYCHANGE:"propertychange", DRAGSTART:"dragstart", DRAG:"drag", DRAGENTER:"dragenter", DRAGOVER:"dragover", DRAGLEAVE:"dragleave", DROP:"drop", DRAGEND:"dragend", TOUCHSTART:"touchstart", TOUCHMOVE:"touchmove", TOUCHEND:"touchend", TOUCHCANCEL:"touchcancel", BEFOREUNLOAD:"beforeunload", CONSOLEMESSAGE:"consolemessage", CONTEXTMENU:"contextmenu", DEVICEMOTION:"devicemotion", DEVICEORIENTATION:"deviceorientation", 
DOMCONTENTLOADED:"DOMContentLoaded", ERROR:"error", HELP:"help", LOAD:"load", LOSECAPTURE:"losecapture", ORIENTATIONCHANGE:"orientationchange", READYSTATECHANGE:"readystatechange", RESIZE:"resize", SCROLL:"scroll", UNLOAD:"unload", CANPLAY:"canplay", CANPLAYTHROUGH:"canplaythrough", DURATIONCHANGE:"durationchange", EMPTIED:"emptied", ENDED:"ended", LOADEDDATA:"loadeddata", LOADEDMETADATA:"loadedmetadata", PAUSE:"pause", PLAY:"play", PLAYING:"playing", RATECHANGE:"ratechange", SEEKED:"seeked", SEEKING:"seeking", 
STALLED:"stalled", SUSPEND:"suspend", TIMEUPDATE:"timeupdate", VOLUMECHANGE:"volumechange", WAITING:"waiting", SOURCEOPEN:"sourceopen", SOURCEENDED:"sourceended", SOURCECLOSED:"sourceclosed", ABORT:"abort", UPDATE:"update", UPDATESTART:"updatestart", UPDATEEND:"updateend", HASHCHANGE:"hashchange", PAGEHIDE:"pagehide", PAGESHOW:"pageshow", POPSTATE:"popstate", COPY:"copy", PASTE:"paste", CUT:"cut", BEFORECOPY:"beforecopy", BEFORECUT:"beforecut", BEFOREPASTE:"beforepaste", ONLINE:"online", OFFLINE:"offline", 
MESSAGE:"message", CONNECT:"connect", INSTALL:"install", ACTIVATE:"activate", FETCH:"fetch", FOREIGNFETCH:"foreignfetch", MESSAGEERROR:"messageerror", STATECHANGE:"statechange", UPDATEFOUND:"updatefound", CONTROLLERCHANGE:"controllerchange", ANIMATIONSTART:goog.events.getVendorPrefixedName_("AnimationStart"), ANIMATIONEND:goog.events.getVendorPrefixedName_("AnimationEnd"), ANIMATIONITERATION:goog.events.getVendorPrefixedName_("AnimationIteration"), TRANSITIONEND:goog.events.getVendorPrefixedName_("TransitionEnd"), 
POINTERDOWN:"pointerdown", POINTERUP:"pointerup", POINTERCANCEL:"pointercancel", POINTERMOVE:"pointermove", POINTEROVER:"pointerover", POINTEROUT:"pointerout", POINTERENTER:"pointerenter", POINTERLEAVE:"pointerleave", GOTPOINTERCAPTURE:"gotpointercapture", LOSTPOINTERCAPTURE:"lostpointercapture", MSGESTURECHANGE:"MSGestureChange", MSGESTUREEND:"MSGestureEnd", MSGESTUREHOLD:"MSGestureHold", MSGESTURESTART:"MSGestureStart", MSGESTURETAP:"MSGestureTap", MSGOTPOINTERCAPTURE:"MSGotPointerCapture", MSINERTIASTART:"MSInertiaStart", 
MSLOSTPOINTERCAPTURE:"MSLostPointerCapture", MSPOINTERCANCEL:"MSPointerCancel", MSPOINTERDOWN:"MSPointerDown", MSPOINTERENTER:"MSPointerEnter", MSPOINTERHOVER:"MSPointerHover", MSPOINTERLEAVE:"MSPointerLeave", MSPOINTERMOVE:"MSPointerMove", MSPOINTEROUT:"MSPointerOut", MSPOINTEROVER:"MSPointerOver", MSPOINTERUP:"MSPointerUp", TEXT:"text", TEXTINPUT:goog.userAgent.IE ? "textinput" : "textInput", COMPOSITIONSTART:"compositionstart", COMPOSITIONUPDATE:"compositionupdate", COMPOSITIONEND:"compositionend", 
BEFOREINPUT:"beforeinput", EXIT:"exit", LOADABORT:"loadabort", LOADCOMMIT:"loadcommit", LOADREDIRECT:"loadredirect", LOADSTART:"loadstart", LOADSTOP:"loadstop", RESPONSIVE:"responsive", SIZECHANGED:"sizechanged", UNRESPONSIVE:"unresponsive", VISIBILITYCHANGE:"visibilitychange", STORAGE:"storage", DOMSUBTREEMODIFIED:"DOMSubtreeModified", DOMNODEINSERTED:"DOMNodeInserted", DOMNODEREMOVED:"DOMNodeRemoved", DOMNODEREMOVEDFROMDOCUMENT:"DOMNodeRemovedFromDocument", DOMNODEINSERTEDINTODOCUMENT:"DOMNodeInsertedIntoDocument", 
DOMATTRMODIFIED:"DOMAttrModified", DOMCHARACTERDATAMODIFIED:"DOMCharacterDataModified", BEFOREPRINT:"beforeprint", AFTERPRINT:"afterprint"};
goog.html.SafeHtml = function() {
  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = "";
  this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;
  this.dir_ = null;
};
goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString = !0;
goog.html.SafeHtml.prototype.getDirection = function() {
  return this.dir_;
};
goog.html.SafeHtml.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeHtml.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
};
goog.DEBUG && (goog.html.SafeHtml.prototype.toString = function() {
  return "SafeHtml{" + this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ + "}";
});
goog.html.SafeHtml.unwrap = function(a) {
  if (a instanceof goog.html.SafeHtml && a.constructor === goog.html.SafeHtml && a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ === goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_) {
    return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeHtml, got '" + a + "' of type " + goog.typeOf(a));
  return "type_error:SafeHtml";
};
goog.html.SafeHtml.htmlEscape = function(a) {
  if (a instanceof goog.html.SafeHtml) {
    return a;
  }
  var b = null;
  a.implementsGoogI18nBidiDirectionalString && (b = a.getDirection());
  a = a.implementsGoogStringTypedString ? a.getTypedStringValue() : String(a);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.htmlEscape(a), b);
};
goog.html.SafeHtml.htmlEscapePreservingNewlines = function(a) {
  if (a instanceof goog.html.SafeHtml) {
    return a;
  }
  a = goog.html.SafeHtml.htmlEscape(a);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.newLineToBr(goog.html.SafeHtml.unwrap(a)), a.getDirection());
};
goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces = function(a) {
  if (a instanceof goog.html.SafeHtml) {
    return a;
  }
  a = goog.html.SafeHtml.htmlEscape(a);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.whitespaceEscape(goog.html.SafeHtml.unwrap(a)), a.getDirection());
};
goog.html.SafeHtml.from = goog.html.SafeHtml.htmlEscape;
goog.html.SafeHtml.VALID_NAMES_IN_TAG_ = /^[a-zA-Z0-9-]+$/;
goog.html.SafeHtml.URL_ATTRIBUTES_ = {action:!0, cite:!0, data:!0, formaction:!0, href:!0, manifest:!0, poster:!0, src:!0};
goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_ = {APPLET:!0, BASE:!0, EMBED:!0, IFRAME:!0, LINK:!0, MATH:!0, META:!0, OBJECT:!0, SCRIPT:!0, STYLE:!0, SVG:!0, TEMPLATE:!0};
goog.html.SafeHtml.create = function(a, b, c) {
  goog.html.SafeHtml.verifyTagName(String(a));
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(String(a), b, c);
};
goog.html.SafeHtml.verifyTagName = function(a) {
  if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a)) {
    throw Error("Invalid tag name <" + a + ">.");
  }
  if (a.toUpperCase() in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_) {
    throw Error("Tag name <" + a + "> is not allowed for SafeHtml.");
  }
};
goog.html.SafeHtml.createIframe = function(a, b, c, d) {
  a && goog.html.TrustedResourceUrl.unwrap(a);
  var f = {};
  f.src = a || null;
  f.srcdoc = b && goog.html.SafeHtml.unwrap(b);
  a = goog.html.SafeHtml.combineAttributes(f, {sandbox:""}, c);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d);
};
goog.html.SafeHtml.createSandboxIframe = function(a, b, c, d) {
  if (!goog.html.SafeHtml.canUseSandboxIframe()) {
    throw Error("The browser does not support sandboxed iframes.");
  }
  var f = {};
  f.src = a ? goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a)) : null;
  f.srcdoc = b || null;
  f.sandbox = "";
  a = goog.html.SafeHtml.combineAttributes(f, {}, c);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", a, d);
};
goog.html.SafeHtml.canUseSandboxIframe = function() {
  return goog.global.HTMLIFrameElement && "sandbox" in goog.global.HTMLIFrameElement.prototype;
};
goog.html.SafeHtml.createScriptSrc = function(a, b) {
  goog.html.TrustedResourceUrl.unwrap(a);
  a = goog.html.SafeHtml.combineAttributes({src:a}, {}, b);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", a);
};
goog.html.SafeHtml.createScript = function(a, b) {
  for (var c in b) {
    var d = c.toLowerCase();
    if ("language" == d || "src" == d || "text" == d || "type" == d) {
      throw Error('Cannot set "' + d + '" attribute');
    }
  }
  c = "";
  a = goog.array.concat(a);
  for (d = 0; d < a.length; d++) {
    c += goog.html.SafeScript.unwrap(a[d]);
  }
  a = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, goog.i18n.bidi.Dir.NEUTRAL);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", b, a);
};
goog.html.SafeHtml.createStyle = function(a, b) {
  b = goog.html.SafeHtml.combineAttributes({type:"text/css"}, {}, b);
  var c = "";
  a = goog.array.concat(a);
  for (var d = 0; d < a.length; d++) {
    c += goog.html.SafeStyleSheet.unwrap(a[d]);
  }
  a = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, goog.i18n.bidi.Dir.NEUTRAL);
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", b, a);
};
goog.html.SafeHtml.createMetaRefresh = function(a, b) {
  a = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a));
  (goog.labs.userAgent.browser.isIE() || goog.labs.userAgent.browser.isEdge()) && goog.string.contains(a, ";") && (a = "'" + a.replace(/'/g, "%27") + "'");
  return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", {"http-equiv":"refresh", content:(b || 0) + "; url=" + a});
};
goog.html.SafeHtml.getAttrNameAndValue_ = function(a, b, c) {
  if (c instanceof goog.string.Const) {
    c = goog.string.Const.unwrap(c);
  } else {
    if ("style" == b.toLowerCase()) {
      c = goog.html.SafeHtml.getStyleValue_(c);
    } else {
      if (/^on/i.test(b)) {
        throw Error('Attribute "' + b + '" requires goog.string.Const value, "' + c + '" given.');
      }
      if (b.toLowerCase() in goog.html.SafeHtml.URL_ATTRIBUTES_) {
        if (c instanceof goog.html.TrustedResourceUrl) {
          c = goog.html.TrustedResourceUrl.unwrap(c);
        } else {
          if (c instanceof goog.html.SafeUrl) {
            c = goog.html.SafeUrl.unwrap(c);
          } else {
            if (goog.isString(c)) {
              c = goog.html.SafeUrl.sanitize(c).getTypedStringValue();
            } else {
              throw Error('Attribute "' + b + '" on tag "' + a + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + c + '" given.');
            }
          }
        }
      }
    }
  }
  c.implementsGoogStringTypedString && (c = c.getTypedStringValue());
  goog.asserts.assert(goog.isString(c) || goog.isNumber(c), "String or number value expected, got " + typeof c + " with value: " + c);
  return b + '="' + goog.string.htmlEscape(String(c)) + '"';
};
goog.html.SafeHtml.getStyleValue_ = function(a) {
  if (!goog.isObject(a)) {
    throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof a + " given: " + a);
  }
  a instanceof goog.html.SafeStyle || (a = goog.html.SafeStyle.create(a));
  return goog.html.SafeStyle.unwrap(a);
};
goog.html.SafeHtml.createWithDir = function(a, b, c, d) {
  b = goog.html.SafeHtml.create(b, c, d);
  b.dir_ = a;
  return b;
};
goog.html.SafeHtml.concat = function(a) {
  var b = goog.i18n.bidi.Dir.NEUTRAL, c = "", d = function(a) {
    goog.isArray(a) ? goog.array.forEach(a, d) : (a = goog.html.SafeHtml.htmlEscape(a), c += goog.html.SafeHtml.unwrap(a), a = a.getDirection(), b == goog.i18n.bidi.Dir.NEUTRAL ? b = a : a != goog.i18n.bidi.Dir.NEUTRAL && b != a && (b = null));
  };
  goog.array.forEach(arguments, d);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c, b);
};
goog.html.SafeHtml.concatWithDir = function(a, b) {
  var c = goog.html.SafeHtml.concat(goog.array.slice(arguments, 1));
  c.dir_ = a;
  return c;
};
goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_ = {};
goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse = function(a, b) {
  return (new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(a, b);
};
goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_ = function(a, b) {
  this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = a;
  this.dir_ = b;
  return this;
};
goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse = function(a, b, c) {
  var d = null;
  var f = "<" + a + goog.html.SafeHtml.stringifyAttributes(a, b);
  goog.isDefAndNotNull(c) ? goog.isArray(c) || (c = [c]) : c = [];
  goog.dom.tags.isVoidTag(a.toLowerCase()) ? (goog.asserts.assert(!c.length, "Void tag <" + a + "> does not allow content."), f += ">") : (d = goog.html.SafeHtml.concat(c), f += ">" + goog.html.SafeHtml.unwrap(d) + "</" + a + ">", d = d.getDirection());
  (a = b && b.dir) && (d = /^(ltr|rtl|auto)$/i.test(a) ? goog.i18n.bidi.Dir.NEUTRAL : null);
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(f, d);
};
goog.html.SafeHtml.stringifyAttributes = function(a, b) {
  var c = "";
  if (b) {
    for (var d in b) {
      if (!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(d)) {
        throw Error('Invalid attribute name "' + d + '".');
      }
      var f = b[d];
      goog.isDefAndNotNull(f) && (c += " " + goog.html.SafeHtml.getAttrNameAndValue_(a, d, f));
    }
  }
  return c;
};
goog.html.SafeHtml.combineAttributes = function(a, b, c) {
  var d = {}, f;
  for (f in a) {
    goog.asserts.assert(f.toLowerCase() == f, "Must be lower case"), d[f] = a[f];
  }
  for (f in b) {
    goog.asserts.assert(f.toLowerCase() == f, "Must be lower case"), d[f] = b[f];
  }
  for (f in c) {
    var g = f.toLowerCase();
    if (g in a) {
      throw Error('Cannot override "' + g + '" attribute, got "' + f + '" with value "' + c[f] + '"');
    }
    g in b && delete d[g];
    d[f] = c[f];
  }
  return d;
};
goog.html.SafeHtml.DOCTYPE_HTML = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeHtml.EMPTY = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("", goog.i18n.bidi.Dir.NEUTRAL);
goog.html.SafeHtml.BR = goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>", goog.i18n.bidi.Dir.NEUTRAL);
goog.math.Box = function(a, b, c, d) {
  this.top = a;
  this.right = b;
  this.bottom = c;
  this.left = d;
};
goog.math.Box.boundingBox = function(a) {
  for (var b = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), c = 1; c < arguments.length; c++) {
    b.expandToIncludeCoordinate(arguments[c]);
  }
  return b;
};
goog.math.Box.prototype.getWidth = function() {
  return this.right - this.left;
};
goog.math.Box.prototype.getHeight = function() {
  return this.bottom - this.top;
};
goog.math.Box.prototype.clone = function() {
  return new goog.math.Box(this.top, this.right, this.bottom, this.left);
};
goog.DEBUG && (goog.math.Box.prototype.toString = function() {
  return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)";
});
goog.math.Box.prototype.contains = function(a) {
  return goog.math.Box.contains(this, a);
};
goog.math.Box.prototype.expand = function(a, b, c, d) {
  goog.isObject(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += Number(b), this.bottom += Number(c), this.left -= Number(d));
  return this;
};
goog.math.Box.prototype.expandToInclude = function(a) {
  this.left = Math.min(this.left, a.left);
  this.top = Math.min(this.top, a.top);
  this.right = Math.max(this.right, a.right);
  this.bottom = Math.max(this.bottom, a.bottom);
};
goog.math.Box.prototype.expandToIncludeCoordinate = function(a) {
  this.top = Math.min(this.top, a.y);
  this.right = Math.max(this.right, a.x);
  this.bottom = Math.max(this.bottom, a.y);
  this.left = Math.min(this.left, a.x);
};
goog.math.Box.equals = function(a, b) {
  return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1;
};
goog.math.Box.contains = function(a, b) {
  return a && b ? b instanceof goog.math.Box ? b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom : b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom : !1;
};
goog.math.Box.relativePositionX = function(a, b) {
  return b.x < a.left ? b.x - a.left : b.x > a.right ? b.x - a.right : 0;
};
goog.math.Box.relativePositionY = function(a, b) {
  return b.y < a.top ? b.y - a.top : b.y > a.bottom ? b.y - a.bottom : 0;
};
goog.math.Box.distance = function(a, b) {
  var c = goog.math.Box.relativePositionX(a, b);
  a = goog.math.Box.relativePositionY(a, b);
  return Math.sqrt(c * c + a * a);
};
goog.math.Box.intersects = function(a, b) {
  return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom;
};
goog.math.Box.intersectsWithPadding = function(a, b, c) {
  return a.left <= b.right + c && b.left <= a.right + c && a.top <= b.bottom + c && b.top <= a.bottom + c;
};
goog.math.Box.prototype.ceil = function() {
  this.top = Math.ceil(this.top);
  this.right = Math.ceil(this.right);
  this.bottom = Math.ceil(this.bottom);
  this.left = Math.ceil(this.left);
  return this;
};
goog.math.Box.prototype.floor = function() {
  this.top = Math.floor(this.top);
  this.right = Math.floor(this.right);
  this.bottom = Math.floor(this.bottom);
  this.left = Math.floor(this.left);
  return this;
};
goog.math.Box.prototype.round = function() {
  this.top = Math.round(this.top);
  this.right = Math.round(this.right);
  this.bottom = Math.round(this.bottom);
  this.left = Math.round(this.left);
  return this;
};
goog.math.Box.prototype.translate = function(a, b) {
  a instanceof goog.math.Coordinate ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (goog.asserts.assertNumber(a), this.left += a, this.right += a, goog.isNumber(b) && (this.top += b, this.bottom += b));
  return this;
};
goog.math.Box.prototype.scale = function(a, b) {
  b = goog.isNumber(b) ? b : a;
  this.left *= a;
  this.right *= a;
  this.top *= b;
  this.bottom *= b;
  return this;
};
goog.math.Vec2 = function(a, b) {
  this.x = a;
  this.y = b;
};
goog.inherits(goog.math.Vec2, goog.math.Coordinate);
goog.math.Vec2.randomUnit = function() {
  var a = Math.random() * Math.PI * 2;
  return new goog.math.Vec2(Math.cos(a), Math.sin(a));
};
goog.math.Vec2.random = function() {
  var a = Math.sqrt(Math.random()), b = Math.random() * Math.PI * 2;
  return new goog.math.Vec2(Math.cos(b) * a, Math.sin(b) * a);
};
goog.math.Vec2.fromCoordinate = function(a) {
  return new goog.math.Vec2(a.x, a.y);
};
goog.math.Vec2.prototype.clone = function() {
  return new goog.math.Vec2(this.x, this.y);
};
goog.math.Vec2.prototype.magnitude = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
goog.math.Vec2.prototype.squaredMagnitude = function() {
  return this.x * this.x + this.y * this.y;
};
goog.math.Vec2.prototype.scale = goog.math.Coordinate.prototype.scale;
goog.math.Vec2.prototype.invert = function() {
  this.x = -this.x;
  this.y = -this.y;
  return this;
};
goog.math.Vec2.prototype.normalize = function() {
  return this.scale(1 / this.magnitude());
};
goog.math.Vec2.prototype.add = function(a) {
  this.x += a.x;
  this.y += a.y;
  return this;
};
goog.math.Vec2.prototype.subtract = function(a) {
  this.x -= a.x;
  this.y -= a.y;
  return this;
};
goog.math.Vec2.prototype.rotate = function(a) {
  var b = Math.cos(a);
  a = Math.sin(a);
  var c = this.y * b + this.x * a;
  this.x = this.x * b - this.y * a;
  this.y = c;
  return this;
};
goog.math.Vec2.rotateAroundPoint = function(a, b, c) {
  return a.clone().subtract(b).rotate(c).add(b);
};
goog.math.Vec2.prototype.equals = function(a) {
  return this == a ? !0 : a instanceof goog.math.Vec2 && !!a && this.x == a.x && this.y == a.y;
};
goog.math.Vec2.distance = goog.math.Coordinate.distance;
goog.math.Vec2.squaredDistance = goog.math.Coordinate.squaredDistance;
goog.math.Vec2.equals = goog.math.Coordinate.equals;
goog.math.Vec2.sum = function(a, b) {
  return new goog.math.Vec2(a.x + b.x, a.y + b.y);
};
goog.math.Vec2.difference = function(a, b) {
  return new goog.math.Vec2(a.x - b.x, a.y - b.y);
};
goog.math.Vec2.dot = function(a, b) {
  return a.x * b.x + a.y * b.y;
};
goog.math.Vec2.determinant = function(a, b) {
  return a.x * b.y - a.y * b.x;
};
goog.math.Vec2.lerp = function(a, b, c) {
  return new goog.math.Vec2(goog.math.lerp(a.x, b.x, c), goog.math.lerp(a.y, b.y, c));
};
goog.structs.Map = function(a, b) {
  this.map_ = {};
  this.keys_ = [];
  this.version_ = this.count_ = 0;
  var c = arguments.length;
  if (1 < c) {
    if (c % 2) {
      throw Error("Uneven number of arguments");
    }
    for (var d = 0; d < c; d += 2) {
      this.set(arguments[d], arguments[d + 1]);
    }
  } else {
    a && this.addAll(a);
  }
};
goog.structs.Map.prototype.getCount = function() {
  return this.count_;
};
goog.structs.Map.prototype.getValues = function() {
  this.cleanupKeysArray_();
  for (var a = [], b = 0; b < this.keys_.length; b++) {
    a.push(this.map_[this.keys_[b]]);
  }
  return a;
};
goog.structs.Map.prototype.getKeys = function() {
  this.cleanupKeysArray_();
  return this.keys_.concat();
};
goog.structs.Map.prototype.containsKey = function(a) {
  return goog.structs.Map.hasKey_(this.map_, a);
};
goog.structs.Map.prototype.containsValue = function(a) {
  for (var b = 0; b < this.keys_.length; b++) {
    var c = this.keys_[b];
    if (goog.structs.Map.hasKey_(this.map_, c) && this.map_[c] == a) {
      return !0;
    }
  }
  return !1;
};
goog.structs.Map.prototype.equals = function(a, b) {
  if (this === a) {
    return !0;
  }
  if (this.count_ != a.getCount()) {
    return !1;
  }
  b = b || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for (var c, d = 0; c = this.keys_[d]; d++) {
    if (!b(this.get(c), a.get(c))) {
      return !1;
    }
  }
  return !0;
};
goog.structs.Map.defaultEquals = function(a, b) {
  return a === b;
};
goog.structs.Map.prototype.isEmpty = function() {
  return 0 == this.count_;
};
goog.structs.Map.prototype.clear = function() {
  this.map_ = {};
  this.version_ = this.count_ = this.keys_.length = 0;
};
goog.structs.Map.prototype.remove = function(a) {
  return goog.structs.Map.hasKey_(this.map_, a) ? (delete this.map_[a], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1;
};
goog.structs.Map.prototype.cleanupKeysArray_ = function() {
  var a, b;
  if (this.count_ != this.keys_.length) {
    for (a = b = 0; b < this.keys_.length;) {
      var c = this.keys_[b];
      goog.structs.Map.hasKey_(this.map_, c) && (this.keys_[a++] = c);
      b++;
    }
    this.keys_.length = a;
  }
  if (this.count_ != this.keys_.length) {
    var d = {};
    for (a = b = 0; b < this.keys_.length;) {
      c = this.keys_[b], goog.structs.Map.hasKey_(d, c) || (this.keys_[a++] = c, d[c] = 1), b++;
    }
    this.keys_.length = a;
  }
};
goog.structs.Map.prototype.get = function(a, b) {
  return goog.structs.Map.hasKey_(this.map_, a) ? this.map_[a] : b;
};
goog.structs.Map.prototype.set = function(a, b) {
  goog.structs.Map.hasKey_(this.map_, a) || (this.count_++, this.keys_.push(a), this.version_++);
  this.map_[a] = b;
};
goog.structs.Map.prototype.addAll = function(a) {
  if (a instanceof goog.structs.Map) {
    var b = a.getKeys();
    a = a.getValues();
  } else {
    b = goog.object.getKeys(a), a = goog.object.getValues(a);
  }
  for (var c = 0; c < b.length; c++) {
    this.set(b[c], a[c]);
  }
};
goog.structs.Map.prototype.forEach = function(a, b) {
  for (var c = this.getKeys(), d = 0; d < c.length; d++) {
    var f = c[d], g = this.get(f);
    a.call(b, g, f, this);
  }
};
goog.structs.Map.prototype.clone = function() {
  return new goog.structs.Map(this);
};
goog.structs.Map.prototype.transpose = function() {
  for (var a = new goog.structs.Map, b = 0; b < this.keys_.length; b++) {
    var c = this.keys_[b];
    a.set(this.map_[c], c);
  }
  return a;
};
goog.structs.Map.prototype.toObject = function() {
  this.cleanupKeysArray_();
  for (var a = {}, b = 0; b < this.keys_.length; b++) {
    var c = this.keys_[b];
    a[c] = this.map_[c];
  }
  return a;
};
goog.structs.Map.prototype.getKeyIterator = function() {
  return this.__iterator__(!0);
};
goog.structs.Map.prototype.getValueIterator = function() {
  return this.__iterator__(!1);
};
goog.structs.Map.prototype.__iterator__ = function(a) {
  this.cleanupKeysArray_();
  var b = 0, c = this.version_, d = this, f = new goog.iter.Iterator;
  f.next = function() {
    if (c != d.version_) {
      throw Error("The map has changed since the iterator was created");
    }
    if (b >= d.keys_.length) {
      throw goog.iter.StopIteration;
    }
    var f = d.keys_[b++];
    return a ? f : d.map_[f];
  };
  return f;
};
goog.structs.Map.hasKey_ = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
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
wgxpath.userAgent = {};
wgxpath.userAgent.IE_DOC_PRE_9 = goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9);
wgxpath.userAgent.IE_DOC_PRE_8 = goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8);
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
goog.dom.safe = {};
goog.dom.safe.InsertAdjacentHtmlPosition = {AFTERBEGIN:"afterbegin", AFTEREND:"afterend", BEFOREBEGIN:"beforebegin", BEFOREEND:"beforeend"};
goog.dom.safe.insertAdjacentHtml = function(a, b, c) {
  a.insertAdjacentHTML(b, goog.html.SafeHtml.unwrap(c));
};
goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_ = {MATH:!0, SCRIPT:!0, STYLE:!0, SVG:!0, TEMPLATE:!0};
goog.dom.safe.setInnerHtml = function(a, b) {
  if (goog.asserts.ENABLE_ASSERTS) {
    var c = a.tagName.toUpperCase();
    if (goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_[c]) {
      throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + a.tagName + ".");
    }
  }
  a.innerHTML = goog.html.SafeHtml.unwrap(b);
};
goog.dom.safe.setOuterHtml = function(a, b) {
  a.outerHTML = goog.html.SafeHtml.unwrap(b);
};
goog.dom.safe.setStyle = function(a, b) {
  a.style.cssText = goog.html.SafeStyle.unwrap(b);
};
goog.dom.safe.documentWrite = function(a, b) {
  a.write(goog.html.SafeHtml.unwrap(b));
};
goog.dom.safe.setAnchorHref = function(a, b) {
  goog.dom.safe.assertIsHTMLAnchorElement_(a);
  b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
  a.href = goog.html.SafeUrl.unwrap(b);
};
goog.dom.safe.setImageSrc = function(a, b) {
  goog.dom.safe.assertIsHTMLImageElement_(a);
  b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
  a.src = goog.html.SafeUrl.unwrap(b);
};
goog.dom.safe.setEmbedSrc = function(a, b) {
  goog.dom.safe.assertIsHTMLEmbedElement_(a);
  a.src = goog.html.TrustedResourceUrl.unwrap(b);
};
goog.dom.safe.setFrameSrc = function(a, b) {
  goog.dom.safe.assertIsHTMLFrameElement_(a);
  a.src = goog.html.TrustedResourceUrl.unwrap(b);
};
goog.dom.safe.setIframeSrc = function(a, b) {
  goog.dom.safe.assertIsHTMLIFrameElement_(a);
  a.src = goog.html.TrustedResourceUrl.unwrap(b);
};
goog.dom.safe.setIframeSrcdoc = function(a, b) {
  goog.dom.safe.assertIsHTMLIFrameElement_(a);
  a.srcdoc = goog.html.SafeHtml.unwrap(b);
};
goog.dom.safe.setLinkHrefAndRel = function(a, b, c) {
  goog.dom.safe.assertIsHTMLLinkElement_(a);
  a.rel = c;
  goog.string.caseInsensitiveContains(c, "stylesheet") ? (goog.asserts.assert(b instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'), a.href = goog.html.TrustedResourceUrl.unwrap(b)) : a.href = b instanceof goog.html.TrustedResourceUrl ? goog.html.TrustedResourceUrl.unwrap(b) : b instanceof goog.html.SafeUrl ? goog.html.SafeUrl.unwrap(b) : goog.html.SafeUrl.sanitize(b).getTypedStringValue();
};
goog.dom.safe.setObjectData = function(a, b) {
  goog.dom.safe.assertIsHTMLObjectElement_(a);
  a.data = goog.html.TrustedResourceUrl.unwrap(b);
};
goog.dom.safe.setScriptSrc = function(a, b) {
  goog.dom.safe.assertIsHTMLScriptElement_(a);
  a.src = goog.html.TrustedResourceUrl.unwrap(b);
};
goog.dom.safe.setScriptContent = function(a, b) {
  goog.dom.safe.assertIsHTMLScriptElement_(a);
  a.text = goog.html.SafeScript.unwrap(b);
};
goog.dom.safe.setLocationHref = function(a, b) {
  goog.dom.safe.assertIsLocation_(a);
  b = b instanceof goog.html.SafeUrl ? b : goog.html.SafeUrl.sanitize(b);
  a.href = goog.html.SafeUrl.unwrap(b);
};
goog.dom.safe.openInWindow = function(a, b, c, d, f) {
  a = a instanceof goog.html.SafeUrl ? a : goog.html.SafeUrl.sanitize(a);
  return (b || window).open(goog.html.SafeUrl.unwrap(a), c ? goog.string.Const.unwrap(c) : "", d, f);
};
goog.dom.safe.assertIsLocation_ = function(a) {
  goog.asserts.ENABLE_ASSERTS && "undefined" != typeof Location && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof Location || !(a instanceof Element)), "Argument is not a Location (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
  return a;
};
goog.dom.safe.assertIsHTMLAnchorElement_ = function(a) {
  goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLAnchorElement && "undefined" != typeof Location && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLAnchorElement || !(a instanceof Location || a instanceof Element)), "Argument is not a HTMLAnchorElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
  return a;
};
goog.dom.safe.assertIsHTMLLinkElement_ = function(a) {
  goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLLinkElement && "undefined" != typeof Location && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLLinkElement || !(a instanceof Location || a instanceof Element)), "Argument is not a HTMLLinkElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
  return a;
};
goog.dom.safe.assertIsHTMLImageElement_ = function(a) {
  goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLImageElement && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLImageElement || !(a instanceof Element)), "Argument is not a HTMLImageElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
  return a;
};
goog.dom.safe.assertIsHTMLEmbedElement_ = function(a) {
  goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLEmbedElement && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLEmbedElement || !(a instanceof Element)), "Argument is not a HTMLEmbedElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
  return a;
};
goog.dom.safe.assertIsHTMLFrameElement_ = function(a) {
  goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLFrameElement && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLFrameElement || !(a instanceof Element)), "Argument is not a HTMLFrameElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
  return a;
};
goog.dom.safe.assertIsHTMLIFrameElement_ = function(a) {
  goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLIFrameElement && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLIFrameElement || !(a instanceof Element)), "Argument is not a HTMLIFrameElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
  return a;
};
goog.dom.safe.assertIsHTMLObjectElement_ = function(a) {
  goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLObjectElement && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLObjectElement || !(a instanceof Element)), "Argument is not a HTMLObjectElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
  return a;
};
goog.dom.safe.assertIsHTMLScriptElement_ = function(a) {
  goog.asserts.ENABLE_ASSERTS && "undefined" != typeof HTMLScriptElement && "undefined" != typeof Element && goog.asserts.assert(a && (a instanceof HTMLScriptElement || !(a instanceof Element)), "Argument is not a HTMLScriptElement (or a non-Element mock); got: %s", goog.dom.safe.debugStringForType_(a));
  return a;
};
goog.dom.safe.debugStringForType_ = function(a) {
  return goog.isObject(a) ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : void 0 === a ? "undefined" : null === a ? "null" : typeof a;
};
goog.events.BrowserEvent = function(a, b) {
  goog.events.Event.call(this, a ? a.type : "");
  this.relatedTarget = this.currentTarget = this.target = null;
  this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
  this.key = "";
  this.charCode = this.keyCode = 0;
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
  this.state = null;
  this.platformModifierKey = !1;
  this.event_ = null;
  a && this.init(a, b);
};
goog.inherits(goog.events.BrowserEvent, goog.events.Event);
goog.events.BrowserEvent.MouseButton = {LEFT:0, MIDDLE:1, RIGHT:2};
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2];
goog.events.BrowserEvent.prototype.init = function(a, b) {
  var c = this.type = a.type, d = a.changedTouches ? a.changedTouches[0] : null;
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  (b = a.relatedTarget) ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(b, "nodeName") || (b = null)) : c == goog.events.EventType.MOUSEOVER ? b = a.fromElement : c == goog.events.EventType.MOUSEOUT && (b = a.toElement);
  this.relatedTarget = b;
  goog.isNull(d) ? (this.offsetX = goog.userAgent.WEBKIT || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY = goog.userAgent.WEBKIT || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = 
  d.screenX || 0, this.screenY = d.screenY || 0);
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.key = a.key || "";
  this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.platformModifierKey = goog.userAgent.MAC ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.event_ = a;
  a.defaultPrevented && this.preventDefault();
};
goog.events.BrowserEvent.prototype.isButton = function(a) {
  return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == a : "click" == this.type ? a == goog.events.BrowserEvent.MouseButton.LEFT : !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[a]);
};
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
  return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey);
};
goog.events.BrowserEvent.prototype.stopPropagation = function() {
  goog.events.BrowserEvent.superClass_.stopPropagation.call(this);
  this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0;
};
goog.events.BrowserEvent.prototype.preventDefault = function() {
  goog.events.BrowserEvent.superClass_.preventDefault.call(this);
  var a = this.event_;
  if (a.preventDefault) {
    a.preventDefault();
  } else {
    if (a.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) {
      try {
        if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1;
        }
      } catch (b) {
      }
    }
  }
};
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
  return this.event_;
};
goog.html.legacyconversions = {};
goog.html.legacyconversions.safeHtmlFromString = function(a) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(a, null);
};
goog.html.legacyconversions.safeStyleFromString = function(a) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.legacyconversions.safeStyleSheetFromString = function(a) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.legacyconversions.safeUrlFromString = function(a) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.legacyconversions.trustedResourceUrlFromString = function(a) {
  goog.html.legacyconversions.reportCallback_();
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a);
};
goog.html.legacyconversions.reportCallback_ = goog.nullFunction;
goog.html.legacyconversions.setReportCallback = function(a) {
  goog.html.legacyconversions.reportCallback_ = a;
};
goog.html.uncheckedconversions = {};
goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function(a, b, c) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(b, c || null);
};
goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b);
};
goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function(a, b) {
  goog.asserts.assertString(goog.string.Const.unwrap(a), "must provide justification");
  goog.asserts.assert(!goog.string.isEmptyOrWhitespace(goog.string.Const.unwrap(a)), "must provide non-empty justification");
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b);
};
goog.math.Rect = function(a, b, c, d) {
  this.left = a;
  this.top = b;
  this.width = c;
  this.height = d;
};
goog.math.Rect.prototype.clone = function() {
  return new goog.math.Rect(this.left, this.top, this.width, this.height);
};
goog.math.Rect.prototype.toBox = function() {
  return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left);
};
goog.math.Rect.createFromPositionAndSize = function(a, b) {
  return new goog.math.Rect(a.x, a.y, b.width, b.height);
};
goog.math.Rect.createFromBox = function(a) {
  return new goog.math.Rect(a.left, a.top, a.right - a.left, a.bottom - a.top);
};
goog.DEBUG && (goog.math.Rect.prototype.toString = function() {
  return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)";
});
goog.math.Rect.equals = function(a, b) {
  return a == b ? !0 : a && b ? a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height : !1;
};
goog.math.Rect.prototype.intersection = function(a) {
  var b = Math.max(this.left, a.left), c = Math.min(this.left + this.width, a.left + a.width);
  if (b <= c) {
    var d = Math.max(this.top, a.top);
    a = Math.min(this.top + this.height, a.top + a.height);
    if (d <= a) {
      return this.left = b, this.top = d, this.width = c - b, this.height = a - d, !0;
    }
  }
  return !1;
};
goog.math.Rect.intersection = function(a, b) {
  var c = Math.max(a.left, b.left), d = Math.min(a.left + a.width, b.left + b.width);
  if (c <= d) {
    var f = Math.max(a.top, b.top);
    a = Math.min(a.top + a.height, b.top + b.height);
    if (f <= a) {
      return new goog.math.Rect(c, f, d - c, a - f);
    }
  }
  return null;
};
goog.math.Rect.intersects = function(a, b) {
  return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height;
};
goog.math.Rect.prototype.intersects = function(a) {
  return goog.math.Rect.intersects(this, a);
};
goog.math.Rect.difference = function(a, b) {
  var c = goog.math.Rect.intersection(a, b);
  if (!c || !c.height || !c.width) {
    return [a.clone()];
  }
  var c = [], d = a.top, f = a.height, g = a.left + a.width, h = a.top + a.height, k = b.left + b.width, m = b.top + b.height;
  b.top > a.top && (c.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top)), d = b.top, f -= b.top - a.top);
  m < h && (c.push(new goog.math.Rect(a.left, m, a.width, h - m)), f = m - d);
  b.left > a.left && c.push(new goog.math.Rect(a.left, d, b.left - a.left, f));
  k < g && c.push(new goog.math.Rect(k, d, g - k, f));
  return c;
};
goog.math.Rect.prototype.difference = function(a) {
  return goog.math.Rect.difference(this, a);
};
goog.math.Rect.prototype.boundingRect = function(a) {
  var b = Math.max(this.left + this.width, a.left + a.width), c = Math.max(this.top + this.height, a.top + a.height);
  this.left = Math.min(this.left, a.left);
  this.top = Math.min(this.top, a.top);
  this.width = b - this.left;
  this.height = c - this.top;
};
goog.math.Rect.boundingRect = function(a, b) {
  if (!a || !b) {
    return null;
  }
  a = new goog.math.Rect(a.left, a.top, a.width, a.height);
  a.boundingRect(b);
  return a;
};
goog.math.Rect.prototype.contains = function(a) {
  return a instanceof goog.math.Coordinate ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height;
};
goog.math.Rect.prototype.squaredDistance = function(a) {
  var b = a.x < this.left ? this.left - a.x : Math.max(a.x - (this.left + this.width), 0);
  a = a.y < this.top ? this.top - a.y : Math.max(a.y - (this.top + this.height), 0);
  return b * b + a * a;
};
goog.math.Rect.prototype.distance = function(a) {
  return Math.sqrt(this.squaredDistance(a));
};
goog.math.Rect.prototype.getSize = function() {
  return new goog.math.Size(this.width, this.height);
};
goog.math.Rect.prototype.getTopLeft = function() {
  return new goog.math.Coordinate(this.left, this.top);
};
goog.math.Rect.prototype.getCenter = function() {
  return new goog.math.Coordinate(this.left + this.width / 2, this.top + this.height / 2);
};
goog.math.Rect.prototype.getBottomRight = function() {
  return new goog.math.Coordinate(this.left + this.width, this.top + this.height);
};
goog.math.Rect.prototype.ceil = function() {
  this.left = Math.ceil(this.left);
  this.top = Math.ceil(this.top);
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this;
};
goog.math.Rect.prototype.floor = function() {
  this.left = Math.floor(this.left);
  this.top = Math.floor(this.top);
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this;
};
goog.math.Rect.prototype.round = function() {
  this.left = Math.round(this.left);
  this.top = Math.round(this.top);
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this;
};
goog.math.Rect.prototype.translate = function(a, b) {
  a instanceof goog.math.Coordinate ? (this.left += a.x, this.top += a.y) : (this.left += goog.asserts.assertNumber(a), goog.isNumber(b) && (this.top += b));
  return this;
};
goog.math.Rect.prototype.scale = function(a, b) {
  b = goog.isNumber(b) ? b : a;
  this.left *= a;
  this.width *= a;
  this.top *= b;
  this.height *= b;
  return this;
};
goog.structs.Set = function(a) {
  this.map_ = new goog.structs.Map;
  a && this.addAll(a);
};
goog.structs.Set.getKey_ = function(a) {
  var b = typeof a;
  return "object" == b && a || "function" == b ? "o" + goog.getUid(a) : b.substr(0, 1) + a;
};
goog.structs.Set.prototype.getCount = function() {
  return this.map_.getCount();
};
goog.structs.Set.prototype.add = function(a) {
  this.map_.set(goog.structs.Set.getKey_(a), a);
};
goog.structs.Set.prototype.addAll = function(a) {
  a = goog.structs.getValues(a);
  for (var b = a.length, c = 0; c < b; c++) {
    this.add(a[c]);
  }
};
goog.structs.Set.prototype.removeAll = function(a) {
  a = goog.structs.getValues(a);
  for (var b = a.length, c = 0; c < b; c++) {
    this.remove(a[c]);
  }
};
goog.structs.Set.prototype.remove = function(a) {
  return this.map_.remove(goog.structs.Set.getKey_(a));
};
goog.structs.Set.prototype.clear = function() {
  this.map_.clear();
};
goog.structs.Set.prototype.isEmpty = function() {
  return this.map_.isEmpty();
};
goog.structs.Set.prototype.contains = function(a) {
  return this.map_.containsKey(goog.structs.Set.getKey_(a));
};
goog.structs.Set.prototype.containsAll = function(a) {
  return goog.structs.every(a, this.contains, this);
};
goog.structs.Set.prototype.intersection = function(a) {
  var b = new goog.structs.Set;
  a = goog.structs.getValues(a);
  for (var c = 0; c < a.length; c++) {
    var d = a[c];
    this.contains(d) && b.add(d);
  }
  return b;
};
goog.structs.Set.prototype.difference = function(a) {
  var b = this.clone();
  b.removeAll(a);
  return b;
};
goog.structs.Set.prototype.getValues = function() {
  return this.map_.getValues();
};
goog.structs.Set.prototype.clone = function() {
  return new goog.structs.Set(this);
};
goog.structs.Set.prototype.equals = function(a) {
  return this.getCount() == goog.structs.getCount(a) && this.isSubsetOf(a);
};
goog.structs.Set.prototype.isSubsetOf = function(a) {
  var b = goog.structs.getCount(a);
  if (this.getCount() > b) {
    return !1;
  }
  !(a instanceof goog.structs.Set) && 5 < b && (a = new goog.structs.Set(a));
  return goog.structs.every(this, function(b) {
    return goog.structs.contains(a, b);
  });
};
goog.structs.Set.prototype.__iterator__ = function(a) {
  return this.map_.__iterator__(!1);
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
wgxpath.IEAttrWrapper = function(a, b, c, d, f) {
  this.node_ = a;
  this.nodeName = c;
  this.nodeValue = d;
  this.nodeType = goog.dom.NodeType.ATTRIBUTE;
  this.ownerElement = b;
  this.parentSourceIndex_ = f;
  this.parentNode = b;
};
wgxpath.IEAttrWrapper.forAttrOf = function(a, b, c) {
  var d = wgxpath.userAgent.IE_DOC_PRE_8 && "href" == b.nodeName ? a.getAttribute(b.nodeName, 2) : b.nodeValue;
  return new wgxpath.IEAttrWrapper(b, a, b.nodeName, d, c);
};
wgxpath.IEAttrWrapper.forStyleOf = function(a, b) {
  return new wgxpath.IEAttrWrapper(a.style, a, "style", a.style.cssText, b);
};
wgxpath.IEAttrWrapper.prototype.getParentSourceIndex = function() {
  return this.parentSourceIndex_;
};
wgxpath.IEAttrWrapper.prototype.getNode = function() {
  return this.node_;
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
  } catch (g) {
    return !1;
  }
  var b = a.classes, a = a.interfaces, c = b["@mozilla.org/xpcom/version-comparator;1"].getService(a.nsIVersionComparator), b = b["@mozilla.org/xre/app-info;1"].getService(a.nsIXULAppInfo), d = b.platformVersion, f = b.version;
  bot.userAgent.FIREFOX_EXTENSION_IS_ENGINE_VERSION_ = function(a) {
    return 0 <= c.compare(d, "" + a);
  };
  bot.userAgent.FIREFOX_EXTENSION_IS_PRODUCT_VERSION_ = function(a) {
    return 0 <= c.compare(f, "" + a);
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
goog.debug.Formatter = function(a) {
  this.prefix_ = a || "";
  this.startTimeProvider_ = goog.debug.RelativeTimeProvider.getDefaultInstance();
};
goog.debug.Formatter.prototype.appendNewline = !0;
goog.debug.Formatter.prototype.showAbsoluteTime = !0;
goog.debug.Formatter.prototype.showRelativeTime = !0;
goog.debug.Formatter.prototype.showLoggerName = !0;
goog.debug.Formatter.prototype.showExceptionText = !1;
goog.debug.Formatter.prototype.showSeverityLevel = !1;
goog.debug.Formatter.prototype.formatRecord = goog.abstractMethod;
goog.debug.Formatter.prototype.formatRecordAsHtml = goog.abstractMethod;
goog.debug.Formatter.prototype.setStartTimeProvider = function(a) {
  this.startTimeProvider_ = a;
};
goog.debug.Formatter.prototype.getStartTimeProvider = function() {
  return this.startTimeProvider_;
};
goog.debug.Formatter.prototype.resetRelativeTimeStart = function() {
  this.startTimeProvider_.reset();
};
goog.debug.Formatter.getDateTimeStamp_ = function(a) {
  a = new Date(a.getMillis());
  return goog.debug.Formatter.getTwoDigitString_(a.getFullYear() - 2000) + goog.debug.Formatter.getTwoDigitString_(a.getMonth() + 1) + goog.debug.Formatter.getTwoDigitString_(a.getDate()) + " " + goog.debug.Formatter.getTwoDigitString_(a.getHours()) + ":" + goog.debug.Formatter.getTwoDigitString_(a.getMinutes()) + ":" + goog.debug.Formatter.getTwoDigitString_(a.getSeconds()) + "." + goog.debug.Formatter.getTwoDigitString_(Math.floor(a.getMilliseconds() / 10));
};
goog.debug.Formatter.getTwoDigitString_ = function(a) {
  return 10 > a ? "0" + a : String(a);
};
goog.debug.Formatter.getRelativeTime_ = function(a, b) {
  a = (a.getMillis() - b) / 1000;
  b = a.toFixed(3);
  var c = 0;
  if (1 > a) {
    c = 2;
  } else {
    for (; 100 > a;) {
      c++, a *= 10;
    }
  }
  for (; 0 < c--;) {
    b = " " + b;
  }
  return b;
};
goog.debug.HtmlFormatter = function(a) {
  goog.debug.Formatter.call(this, a);
};
goog.inherits(goog.debug.HtmlFormatter, goog.debug.Formatter);
goog.debug.HtmlFormatter.exposeException = function(a, b) {
  a = goog.debug.HtmlFormatter.exposeExceptionAsHtml(a, b);
  return goog.html.SafeHtml.unwrap(a);
};
goog.debug.HtmlFormatter.exposeExceptionAsHtml = function(a, b) {
  try {
    var c = goog.debug.normalizeErrorObject(a), d = goog.debug.HtmlFormatter.createViewSourceUrl_(c.fileName);
    return goog.html.SafeHtml.concat(goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("Message: " + c.message + "\nUrl: "), goog.html.SafeHtml.create("a", {href:d, target:"_new"}, c.fileName), goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("\nLine: " + c.lineNumber + "\n\nBrowser stack:\n" + c.stack + "-> [end]\n\nJS stack traversal:\n" + goog.debug.getStacktrace(b) + "-> "));
  } catch (f) {
    return goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces("Exception trying to expose exception! You win, we lose. " + f);
  }
};
goog.debug.HtmlFormatter.createViewSourceUrl_ = function(a) {
  goog.isDefAndNotNull(a) || (a = "");
  if (!/^https?:\/\//i.test(a)) {
    return goog.html.SafeUrl.fromConstant(goog.string.Const.from("sanitizedviewsrc"));
  }
  a = goog.html.SafeUrl.sanitize(a);
  return goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("view-source scheme plus HTTP/HTTPS URL"), "view-source:" + goog.html.SafeUrl.unwrap(a));
};
goog.debug.HtmlFormatter.prototype.showExceptionText = !0;
goog.debug.HtmlFormatter.prototype.formatRecord = function(a) {
  return a ? this.formatRecordAsHtml(a).getTypedStringValue() : "";
};
goog.debug.HtmlFormatter.prototype.formatRecordAsHtml = function(a) {
  if (!a) {
    return goog.html.SafeHtml.EMPTY;
  }
  switch(a.getLevel().value) {
    case goog.debug.Logger.Level.SHOUT.value:
      var b = "dbg-sh";
      break;
    case goog.debug.Logger.Level.SEVERE.value:
      b = "dbg-sev";
      break;
    case goog.debug.Logger.Level.WARNING.value:
      b = "dbg-w";
      break;
    case goog.debug.Logger.Level.INFO.value:
      b = "dbg-i";
      break;
    default:
      b = "dbg-f";
  }
  var c = [];
  c.push(this.prefix_, " ");
  this.showAbsoluteTime && c.push("[", goog.debug.Formatter.getDateTimeStamp_(a), "] ");
  this.showRelativeTime && c.push("[", goog.debug.Formatter.getRelativeTime_(a, this.startTimeProvider_.get()), "s] ");
  this.showLoggerName && c.push("[", a.getLoggerName(), "] ");
  this.showSeverityLevel && c.push("[", a.getLevel().name, "] ");
  var c = goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces(c.join("")), d = goog.html.SafeHtml.EMPTY;
  this.showExceptionText && a.getException() && (d = goog.html.SafeHtml.concat(goog.html.SafeHtml.BR, goog.debug.HtmlFormatter.exposeExceptionAsHtml(a.getException())));
  a = goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces(a.getMessage());
  b = goog.html.SafeHtml.create("span", {"class":b}, goog.html.SafeHtml.concat(a, d));
  return this.appendNewline ? goog.html.SafeHtml.concat(c, b, goog.html.SafeHtml.BR) : goog.html.SafeHtml.concat(c, b);
};
goog.debug.TextFormatter = function(a) {
  goog.debug.Formatter.call(this, a);
};
goog.inherits(goog.debug.TextFormatter, goog.debug.Formatter);
goog.debug.TextFormatter.prototype.formatRecord = function(a) {
  var b = [];
  b.push(this.prefix_, " ");
  this.showAbsoluteTime && b.push("[", goog.debug.Formatter.getDateTimeStamp_(a), "] ");
  this.showRelativeTime && b.push("[", goog.debug.Formatter.getRelativeTime_(a, this.startTimeProvider_.get()), "s] ");
  this.showLoggerName && b.push("[", a.getLoggerName(), "] ");
  this.showSeverityLevel && b.push("[", a.getLevel().name, "] ");
  b.push(a.getMessage());
  this.showExceptionText && (a = a.getException()) && b.push("\n", a instanceof Error ? a.message : a.toString());
  this.appendNewline && b.push("\n");
  return b.join("");
};
goog.debug.TextFormatter.prototype.formatRecordAsHtml = function(a) {
  return goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces(goog.debug.TextFormatter.prototype.formatRecord(a));
};
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.getDomHelper = function(a) {
  return a ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper);
};
goog.dom.getDocument = function() {
  return document;
};
goog.dom.getElement = function(a) {
  return goog.dom.getElementHelper_(document, a);
};
goog.dom.getElementHelper_ = function(a, b) {
  return goog.isString(b) ? a.getElementById(b) : b;
};
goog.dom.getRequiredElement = function(a) {
  return goog.dom.getRequiredElementHelper_(document, a);
};
goog.dom.getRequiredElementHelper_ = function(a, b) {
  goog.asserts.assertString(b);
  a = goog.dom.getElementHelper_(a, b);
  return a = goog.asserts.assertElement(a, "No element found with id: " + b);
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagName = function(a, b) {
  return (b || document).getElementsByTagName(String(a));
};
goog.dom.getElementsByTagNameAndClass = function(a, b, c) {
  return goog.dom.getElementsByTagNameAndClass_(document, a, b, c);
};
goog.dom.getElementsByClass = function(a, b) {
  var c = b || document;
  return goog.dom.canUseQuerySelector_(c) ? c.querySelectorAll("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b);
};
goog.dom.getElementByClass = function(a, b) {
  var c = b || document;
  return (c.getElementsByClassName ? c.getElementsByClassName(a)[0] : goog.dom.canUseQuerySelector_(c) ? c.querySelector("." + a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)[0]) || null;
};
goog.dom.getRequiredElementByClass = function(a, b) {
  b = goog.dom.getElementByClass(a, b);
  return goog.asserts.assert(b, "No element found with className: " + a);
};
goog.dom.canUseQuerySelector_ = function(a) {
  return !(!a.querySelectorAll || !a.querySelector);
};
goog.dom.getElementsByTagNameAndClass_ = function(a, b, c, d) {
  a = d || a;
  var f = b && "*" != b ? String(b).toUpperCase() : "";
  if (goog.dom.canUseQuerySelector_(a) && (f || c)) {
    return a.querySelectorAll(f + (c ? "." + c : ""));
  }
  if (c && a.getElementsByClassName) {
    d = a.getElementsByClassName(c);
    if (f) {
      a = {};
      for (var g = b = 0, h; h = d[g]; g++) {
        f == h.nodeName && (a[b++] = h);
      }
      a.length = b;
      return a;
    }
    return d;
  }
  d = a.getElementsByTagName(f || "*");
  if (c) {
    a = {};
    for (g = b = 0; h = d[g]; g++) {
      f = h.className, "function" == typeof f.split && goog.array.contains(f.split(/\s+/), c) && (a[b++] = h);
    }
    a.length = b;
    return a;
  }
  return d;
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(a, b) {
  goog.object.forEach(b, function(b, d) {
    b && b.implementsGoogStringTypedString && (b = b.getTypedStringValue());
    "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : goog.dom.DIRECT_ATTRIBUTE_MAP_.hasOwnProperty(d) ? a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], b) : goog.string.startsWith(d, "aria-") || goog.string.startsWith(d, "data-") ? a.setAttribute(d, b) : a[d] = b;
  });
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", nonce:"nonce", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
goog.dom.getViewportSize = function(a) {
  return goog.dom.getViewportSize_(a || window);
};
goog.dom.getViewportSize_ = function(a) {
  a = a.document;
  a = goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body;
  return new goog.math.Size(a.clientWidth, a.clientHeight);
};
goog.dom.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(window);
};
goog.dom.getDocumentHeightForWindow = function(a) {
  return goog.dom.getDocumentHeight_(a);
};
goog.dom.getDocumentHeight_ = function(a) {
  var b = a.document, c = 0;
  if (b) {
    var c = b.body, d = b.documentElement;
    if (!d || !c) {
      return 0;
    }
    a = goog.dom.getViewportSize_(a).height;
    if (goog.dom.isCss1CompatMode_(b) && d.scrollHeight) {
      c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight;
    } else {
      var b = d.scrollHeight, f = d.offsetHeight;
      d.clientHeight != f && (b = c.scrollHeight, f = c.offsetHeight);
      c = b > a ? b > f ? b : f : b < f ? b : f;
    }
  }
  return c;
};
goog.dom.getPageScroll = function(a) {
  return goog.dom.getDomHelper((a || goog.global || window).document).getDocumentScroll();
};
goog.dom.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(document);
};
goog.dom.getDocumentScroll_ = function(a) {
  var b = goog.dom.getDocumentScrollElement_(a);
  a = goog.dom.getWindow_(a);
  return goog.userAgent.IE && goog.userAgent.isVersionOrHigher("10") && a.pageYOffset != b.scrollTop ? new goog.math.Coordinate(b.scrollLeft, b.scrollTop) : new goog.math.Coordinate(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop);
};
goog.dom.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(document);
};
goog.dom.getDocumentScrollElement_ = function(a) {
  return a.scrollingElement ? a.scrollingElement : !goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body || a.documentElement;
};
goog.dom.getWindow = function(a) {
  return a ? goog.dom.getWindow_(a) : window;
};
goog.dom.getWindow_ = function(a) {
  return a.parentWindow || a.defaultView;
};
goog.dom.createDom = function(a, b, c) {
  return goog.dom.createDom_(document, arguments);
};
goog.dom.createDom_ = function(a, b) {
  var c = String(b[0]), d = b[1];
  if (!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
    c = ["<", c];
    d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
    if (d.type) {
      c.push(' type="', goog.string.htmlEscape(d.type), '"');
      var f = {};
      goog.object.extend(f, d);
      delete f.type;
      d = f;
    }
    c.push(">");
    c = c.join("");
  }
  c = a.createElement(c);
  d && (goog.isString(d) ? c.className = d : goog.isArray(d) ? c.className = d.join(" ") : goog.dom.setProperties(c, d));
  2 < b.length && goog.dom.append_(a, c, b, 2);
  return c;
};
goog.dom.append_ = function(a, b, c, d) {
  function f(c) {
    c && b.appendChild(goog.isString(c) ? a.createTextNode(c) : c);
  }
  for (; d < c.length; d++) {
    var g = c[d];
    goog.isArrayLike(g) && !goog.dom.isNodeLike(g) ? goog.array.forEach(goog.dom.isNodeList(g) ? goog.array.toArray(g) : g, f) : f(g);
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(a) {
  return goog.dom.createElement_(document, a);
};
goog.dom.createElement_ = function(a, b) {
  return a.createElement(String(b));
};
goog.dom.createTextNode = function(a) {
  return document.createTextNode(String(a));
};
goog.dom.createTable = function(a, b, c) {
  return goog.dom.createTable_(document, a, b, !!c);
};
goog.dom.createTable_ = function(a, b, c, d) {
  for (var f = goog.dom.createElement_(a, "TABLE"), g = f.appendChild(goog.dom.createElement_(a, "TBODY")), h = 0; h < b; h++) {
    for (var k = goog.dom.createElement_(a, "TR"), m = 0; m < c; m++) {
      var p = goog.dom.createElement_(a, "TD");
      d && goog.dom.setTextContent(p, goog.string.Unicode.NBSP);
      k.appendChild(p);
    }
    g.appendChild(k);
  }
  return f;
};
goog.dom.constHtmlToNode = function(a) {
  var b = goog.array.map(arguments, goog.string.Const.unwrap), b = goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Constant HTML string, that gets turned into a Node later, so it will be automatically balanced."), b.join(""));
  return goog.dom.safeHtmlToNode(b);
};
goog.dom.safeHtmlToNode = function(a) {
  return goog.dom.safeHtmlToNode_(document, a);
};
goog.dom.safeHtmlToNode_ = function(a, b) {
  var c = goog.dom.createElement_(a, "DIV");
  goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (goog.dom.safe.setInnerHtml(c, goog.html.SafeHtml.concat(goog.html.SafeHtml.BR, b)), c.removeChild(c.firstChild)) : goog.dom.safe.setInnerHtml(c, b);
  return goog.dom.childrenToNode_(a, c);
};
goog.dom.childrenToNode_ = function(a, b) {
  if (1 == b.childNodes.length) {
    return b.removeChild(b.firstChild);
  }
  for (a = a.createDocumentFragment(); b.firstChild;) {
    a.appendChild(b.firstChild);
  }
  return a;
};
goog.dom.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(document);
};
goog.dom.isCss1CompatMode_ = function(a) {
  return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == a.compatMode;
};
goog.dom.canHaveChildren = function(a) {
  if (a.nodeType != goog.dom.NodeType.ELEMENT) {
    return !1;
  }
  switch(a.tagName) {
    case "APPLET":
    case "AREA":
    case "BASE":
    case "BR":
    case "COL":
    case "COMMAND":
    case "EMBED":
    case "FRAME":
    case "HR":
    case "IMG":
    case "INPUT":
    case "IFRAME":
    case "ISINDEX":
    case "KEYGEN":
    case "LINK":
    case "NOFRAMES":
    case "NOSCRIPT":
    case "META":
    case "OBJECT":
    case "PARAM":
    case "SCRIPT":
    case "SOURCE":
    case "STYLE":
    case "TRACK":
    case "WBR":
      return !1;
  }
  return !0;
};
goog.dom.appendChild = function(a, b) {
  a.appendChild(b);
};
goog.dom.append = function(a, b) {
  goog.dom.append_(goog.dom.getOwnerDocument(a), a, arguments, 1);
};
goog.dom.removeChildren = function(a) {
  for (var b; b = a.firstChild;) {
    a.removeChild(b);
  }
};
goog.dom.insertSiblingBefore = function(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b);
};
goog.dom.insertSiblingAfter = function(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b.nextSibling);
};
goog.dom.insertChildAt = function(a, b, c) {
  a.insertBefore(b, a.childNodes[c] || null);
};
goog.dom.removeNode = function(a) {
  return a && a.parentNode ? a.parentNode.removeChild(a) : null;
};
goog.dom.replaceNode = function(a, b) {
  var c = b.parentNode;
  c && c.replaceChild(a, b);
};
goog.dom.flattenElement = function(a) {
  var b, c = a.parentNode;
  if (c && c.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if (a.removeNode) {
      return a.removeNode(!1);
    }
    for (; b = a.firstChild;) {
      c.insertBefore(b, a);
    }
    return goog.dom.removeNode(a);
  }
};
goog.dom.getChildren = function(a) {
  return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != a.children ? a.children : goog.array.filter(a.childNodes, function(a) {
    return a.nodeType == goog.dom.NodeType.ELEMENT;
  });
};
goog.dom.getFirstElementChild = function(a) {
  return goog.isDef(a.firstElementChild) ? a.firstElementChild : goog.dom.getNextElementNode_(a.firstChild, !0);
};
goog.dom.getLastElementChild = function(a) {
  return goog.isDef(a.lastElementChild) ? a.lastElementChild : goog.dom.getNextElementNode_(a.lastChild, !1);
};
goog.dom.getNextElementSibling = function(a) {
  return goog.isDef(a.nextElementSibling) ? a.nextElementSibling : goog.dom.getNextElementNode_(a.nextSibling, !0);
};
goog.dom.getPreviousElementSibling = function(a) {
  return goog.isDef(a.previousElementSibling) ? a.previousElementSibling : goog.dom.getNextElementNode_(a.previousSibling, !1);
};
goog.dom.getNextElementNode_ = function(a, b) {
  for (; a && a.nodeType != goog.dom.NodeType.ELEMENT;) {
    a = b ? a.nextSibling : a.previousSibling;
  }
  return a;
};
goog.dom.getNextNode = function(a) {
  if (!a) {
    return null;
  }
  if (a.firstChild) {
    return a.firstChild;
  }
  for (; a && !a.nextSibling;) {
    a = a.parentNode;
  }
  return a ? a.nextSibling : null;
};
goog.dom.getPreviousNode = function(a) {
  if (!a) {
    return null;
  }
  if (!a.previousSibling) {
    return a.parentNode;
  }
  for (a = a.previousSibling; a && a.lastChild;) {
    a = a.lastChild;
  }
  return a;
};
goog.dom.isNodeLike = function(a) {
  return goog.isObject(a) && 0 < a.nodeType;
};
goog.dom.isElement = function(a) {
  return goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT;
};
goog.dom.isWindow = function(a) {
  return goog.isObject(a) && a.window == a;
};
goog.dom.getParentElement = function(a) {
  var b;
  if (goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY && !(goog.userAgent.IE && goog.userAgent.isVersionOrHigher("9") && !goog.userAgent.isVersionOrHigher("10") && goog.global.SVGElement && a instanceof goog.global.SVGElement) && (b = a.parentElement)) {
    return b;
  }
  b = a.parentNode;
  return goog.dom.isElement(b) ? b : null;
};
goog.dom.contains = function(a, b) {
  if (!a || !b) {
    return !1;
  }
  if (a.contains && b.nodeType == goog.dom.NodeType.ELEMENT) {
    return a == b || a.contains(b);
  }
  if ("undefined" != typeof a.compareDocumentPosition) {
    return a == b || !!(a.compareDocumentPosition(b) & 16);
  }
  for (; b && a != b;) {
    b = b.parentNode;
  }
  return b == a;
};
goog.dom.compareNodeOrder = function(a, b) {
  if (a == b) {
    return 0;
  }
  if (a.compareDocumentPosition) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1;
  }
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    if (a.nodeType == goog.dom.NodeType.DOCUMENT) {
      return -1;
    }
    if (b.nodeType == goog.dom.NodeType.DOCUMENT) {
      return 1;
    }
  }
  if ("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
    var c = a.nodeType == goog.dom.NodeType.ELEMENT, d = b.nodeType == goog.dom.NodeType.ELEMENT;
    if (c && d) {
      return a.sourceIndex - b.sourceIndex;
    }
    var f = a.parentNode, g = b.parentNode;
    return f == g ? goog.dom.compareSiblingOrder_(a, b) : !c && goog.dom.contains(f, b) ? -1 * goog.dom.compareParentsDescendantNodeIe_(a, b) : !d && goog.dom.contains(g, a) ? goog.dom.compareParentsDescendantNodeIe_(b, a) : (c ? a.sourceIndex : f.sourceIndex) - (d ? b.sourceIndex : g.sourceIndex);
  }
  d = goog.dom.getOwnerDocument(a);
  c = d.createRange();
  c.selectNode(a);
  c.collapse(!0);
  a = d.createRange();
  a.selectNode(b);
  a.collapse(!0);
  return c.compareBoundaryPoints(goog.global.Range.START_TO_END, a);
};
goog.dom.compareParentsDescendantNodeIe_ = function(a, b) {
  var c = a.parentNode;
  if (c == b) {
    return -1;
  }
  for (; b.parentNode != c;) {
    b = b.parentNode;
  }
  return goog.dom.compareSiblingOrder_(b, a);
};
goog.dom.compareSiblingOrder_ = function(a, b) {
  for (; b = b.previousSibling;) {
    if (b == a) {
      return -1;
    }
  }
  return 1;
};
goog.dom.findCommonAncestor = function(a) {
  var b, c = arguments.length;
  if (!c) {
    return null;
  }
  if (1 == c) {
    return arguments[0];
  }
  var d = [], f = Infinity;
  for (b = 0; b < c; b++) {
    for (var g = [], h = arguments[b]; h;) {
      g.unshift(h), h = h.parentNode;
    }
    d.push(g);
    f = Math.min(f, g.length);
  }
  g = null;
  for (b = 0; b < f; b++) {
    for (var h = d[0][b], k = 1; k < c; k++) {
      if (h != d[k][b]) {
        return g;
      }
    }
    g = h;
  }
  return g;
};
goog.dom.getOwnerDocument = function(a) {
  goog.asserts.assert(a, "Node cannot be null or undefined.");
  return a.nodeType == goog.dom.NodeType.DOCUMENT ? a : a.ownerDocument || a.document;
};
goog.dom.getFrameContentDocument = function(a) {
  return a.contentDocument || a.contentWindow.document;
};
goog.dom.getFrameContentWindow = function(a) {
  try {
    return a.contentWindow || (a.contentDocument ? goog.dom.getWindow(a.contentDocument) : null);
  } catch (b) {
  }
  return null;
};
goog.dom.setTextContent = function(a, b) {
  goog.asserts.assert(null != a, "goog.dom.setTextContent expects a non-null value for node");
  if ("textContent" in a) {
    a.textContent = b;
  } else {
    if (a.nodeType == goog.dom.NodeType.TEXT) {
      a.data = b;
    } else {
      if (a.firstChild && a.firstChild.nodeType == goog.dom.NodeType.TEXT) {
        for (; a.lastChild != a.firstChild;) {
          a.removeChild(a.lastChild);
        }
        a.firstChild.data = b;
      } else {
        goog.dom.removeChildren(a);
        var c = goog.dom.getOwnerDocument(a);
        a.appendChild(c.createTextNode(String(b)));
      }
    }
  }
};
goog.dom.getOuterHtml = function(a) {
  goog.asserts.assert(null !== a, "goog.dom.getOuterHtml expects a non-null value for element");
  if ("outerHTML" in a) {
    return a.outerHTML;
  }
  var b = goog.dom.getOwnerDocument(a), b = goog.dom.createElement_(b, "DIV");
  b.appendChild(a.cloneNode(!0));
  return b.innerHTML;
};
goog.dom.findNode = function(a, b) {
  var c = [];
  return goog.dom.findNodes_(a, b, c, !0) ? c[0] : void 0;
};
goog.dom.findNodes = function(a, b) {
  var c = [];
  goog.dom.findNodes_(a, b, c, !1);
  return c;
};
goog.dom.findNodes_ = function(a, b, c, d) {
  if (null != a) {
    for (a = a.firstChild; a;) {
      if (b(a) && (c.push(a), d) || goog.dom.findNodes_(a, b, c, d)) {
        return !0;
      }
      a = a.nextSibling;
    }
  }
  return !1;
};
goog.dom.TAGS_TO_IGNORE_ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1};
goog.dom.PREDEFINED_TAG_VALUES_ = {IMG:" ", BR:"\n"};
goog.dom.isFocusableTabIndex = function(a) {
  return goog.dom.hasSpecifiedTabIndex_(a) && goog.dom.isTabIndexFocusable_(a);
};
goog.dom.setFocusableTabIndex = function(a, b) {
  b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"));
};
goog.dom.isFocusable = function(a) {
  var b;
  return (b = goog.dom.nativelySupportsFocus_(a) ? !a.disabled && (!goog.dom.hasSpecifiedTabIndex_(a) || goog.dom.isTabIndexFocusable_(a)) : goog.dom.isFocusableTabIndex(a)) && goog.userAgent.IE ? goog.dom.hasNonZeroBoundingRect_(a) : b;
};
goog.dom.hasSpecifiedTabIndex_ = function(a) {
  return goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9") ? (a = a.getAttributeNode("tabindex"), goog.isDefAndNotNull(a) && a.specified) : a.hasAttribute("tabindex");
};
goog.dom.isTabIndexFocusable_ = function(a) {
  a = a.tabIndex;
  return goog.isNumber(a) && 0 <= a && 32768 > a;
};
goog.dom.nativelySupportsFocus_ = function(a) {
  return "A" == a.tagName || "INPUT" == a.tagName || "TEXTAREA" == a.tagName || "SELECT" == a.tagName || "BUTTON" == a.tagName;
};
goog.dom.hasNonZeroBoundingRect_ = function(a) {
  a = !goog.isFunction(a.getBoundingClientRect) || goog.userAgent.IE && null == a.parentElement ? {height:a.offsetHeight, width:a.offsetWidth} : a.getBoundingClientRect();
  return goog.isDefAndNotNull(a) && 0 < a.height && 0 < a.width;
};
goog.dom.getTextContent = function(a) {
  if (goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && null !== a && "innerText" in a) {
    a = goog.string.canonicalizeNewlines(a.innerText);
  } else {
    var b = [];
    goog.dom.getTextContent_(a, b, !0);
    a = b.join("");
  }
  a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  a = a.replace(/\u200B/g, "");
  goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (a = a.replace(/ +/g, " "));
  " " != a && (a = a.replace(/^\s*/, ""));
  return a;
};
goog.dom.getRawTextContent = function(a) {
  var b = [];
  goog.dom.getTextContent_(a, b, !1);
  return b.join("");
};
goog.dom.getTextContent_ = function(a, b, c) {
  if (!(a.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
    if (a.nodeType == goog.dom.NodeType.TEXT) {
      c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
    } else {
      if (a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName]);
      } else {
        for (a = a.firstChild; a;) {
          goog.dom.getTextContent_(a, b, c), a = a.nextSibling;
        }
      }
    }
  }
};
goog.dom.getNodeTextLength = function(a) {
  return goog.dom.getTextContent(a).length;
};
goog.dom.getNodeTextOffset = function(a, b) {
  b = b || goog.dom.getOwnerDocument(a).body;
  for (var c = []; a && a != b;) {
    for (var d = a; d = d.previousSibling;) {
      c.unshift(goog.dom.getTextContent(d));
    }
    a = a.parentNode;
  }
  return goog.string.trimLeft(c.join("")).replace(/ +/g, " ").length;
};
goog.dom.getNodeAtOffset = function(a, b, c) {
  a = [a];
  for (var d = 0, f = null; 0 < a.length && d < b;) {
    if (f = a.pop(), !(f.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
      if (f.nodeType == goog.dom.NodeType.TEXT) {
        var g = f.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "), d = d + g.length;
      } else {
        if (f.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
          d += goog.dom.PREDEFINED_TAG_VALUES_[f.nodeName].length;
        } else {
          for (g = f.childNodes.length - 1; 0 <= g; g--) {
            a.push(f.childNodes[g]);
          }
        }
      }
    }
  }
  goog.isObject(c) && (c.remainder = f ? f.nodeValue.length + b - d - 1 : 0, c.node = f);
  return f;
};
goog.dom.isNodeList = function(a) {
  if (a && "number" == typeof a.length) {
    if (goog.isObject(a)) {
      return "function" == typeof a.item || "string" == typeof a.item;
    }
    if (goog.isFunction(a)) {
      return "function" == typeof a.item;
    }
  }
  return !1;
};
goog.dom.getAncestorByTagNameAndClass = function(a, b, c, d) {
  if (!b && !c) {
    return null;
  }
  var f = b ? String(b).toUpperCase() : null;
  return goog.dom.getAncestor(a, function(a) {
    return (!f || a.nodeName == f) && (!c || goog.isString(a.className) && goog.array.contains(a.className.split(/\s+/), c));
  }, !0, d);
};
goog.dom.getAncestorByClass = function(a, b, c) {
  return goog.dom.getAncestorByTagNameAndClass(a, null, b, c);
};
goog.dom.getAncestor = function(a, b, c, d) {
  a && !c && (a = a.parentNode);
  for (c = 0; a && (null == d || c <= d);) {
    goog.asserts.assert("parentNode" != a.name);
    if (b(a)) {
      return a;
    }
    a = a.parentNode;
    c++;
  }
  return null;
};
goog.dom.getActiveElement = function(a) {
  try {
    return a && a.activeElement;
  } catch (b) {
  }
  return null;
};
goog.dom.getPixelRatio = function() {
  var a = goog.dom.getWindow();
  return goog.isDef(a.devicePixelRatio) ? a.devicePixelRatio : a.matchMedia ? goog.dom.matchesPixelRatio_(3) || goog.dom.matchesPixelRatio_(2) || goog.dom.matchesPixelRatio_(1.5) || goog.dom.matchesPixelRatio_(1) || .75 : 1;
};
goog.dom.matchesPixelRatio_ = function(a) {
  return goog.dom.getWindow().matchMedia("(min-resolution: " + a + "dppx),(min--moz-device-pixel-ratio: " + a + "),(min-resolution: " + 96 * a + "dpi)").matches ? a : 0;
};
goog.dom.getCanvasContext2D = function(a) {
  return a.getContext("2d");
};
goog.dom.DomHelper = function(a) {
  this.document_ = a || goog.global.document || document;
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(a) {
  this.document_ = a;
};
goog.dom.DomHelper.prototype.getDocument = function() {
  return this.document_;
};
goog.dom.DomHelper.prototype.getElement = function(a) {
  return goog.dom.getElementHelper_(this.document_, a);
};
goog.dom.DomHelper.prototype.getRequiredElement = function(a) {
  return goog.dom.getRequiredElementHelper_(this.document_, a);
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagName = function(a, b) {
  return (b || this.document_).getElementsByTagName(String(a));
};
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(a, b, c) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, a, b, c);
};
goog.dom.DomHelper.prototype.getElementsByClass = function(a, b) {
  return goog.dom.getElementsByClass(a, b || this.document_);
};
goog.dom.DomHelper.prototype.getElementByClass = function(a, b) {
  return goog.dom.getElementByClass(a, b || this.document_);
};
goog.dom.DomHelper.prototype.getRequiredElementByClass = function(a, b) {
  return goog.dom.getRequiredElementByClass(a, b || this.document_);
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(a) {
  return goog.dom.getViewportSize(a || this.getWindow());
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(this.getWindow());
};
goog.dom.DomHelper.prototype.createDom = function(a, b, c) {
  return goog.dom.createDom_(this.document_, arguments);
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(a) {
  return goog.dom.createElement_(this.document_, a);
};
goog.dom.DomHelper.prototype.createTextNode = function(a) {
  return this.document_.createTextNode(String(a));
};
goog.dom.DomHelper.prototype.createTable = function(a, b, c) {
  return goog.dom.createTable_(this.document_, a, b, !!c);
};
goog.dom.DomHelper.prototype.safeHtmlToNode = function(a) {
  return goog.dom.safeHtmlToNode_(this.document_, a);
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(this.document_);
};
goog.dom.DomHelper.prototype.getWindow = function() {
  return goog.dom.getWindow_(this.document_);
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(this.document_);
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(this.document_);
};
goog.dom.DomHelper.prototype.getActiveElement = function(a) {
  return goog.dom.getActiveElement(a || this.document_);
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.isFocusable = goog.dom.isFocusable;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.dom.DomHelper.prototype.getCanvasContext2D = goog.dom.getCanvasContext2D;
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
webdriver.logging = {};
var module$contents$webdriver$logging_LogManager = goog.debug.LogManager, module$contents$webdriver$logging_LogRecord = goog.debug.LogRecord, module$contents$webdriver$logging_Logger = goog.debug.Logger, module$contents$webdriver$logging_Objects = goog.object, module$contents$webdriver$logging_padNumber = goog.string.padNumber;
webdriver.logging.LogRecord = module$contents$webdriver$logging_LogRecord;
webdriver.logging.Logger = module$contents$webdriver$logging_Logger;
webdriver.logging.Level = module$contents$webdriver$logging_Logger.Level;
module$contents$webdriver$logging_Logger.Level.DEBUG = new module$contents$webdriver$logging_Logger.Level("DEBUG", module$contents$webdriver$logging_Logger.Level.CONFIG.value);
function module$contents$webdriver$logging_getLogger(a) {
  return module$contents$webdriver$logging_LogManager.getLogger(a || module$contents$webdriver$logging_Logger.ROOT_LOGGER_NAME);
}
webdriver.logging.getLogger = module$contents$webdriver$logging_getLogger;
function module$contents$webdriver$logging_consoleHandler(a) {
  if ("undefined" !== typeof console && console) {
    var b = new Date(a.getMillis()), b = "[" + b.getUTCFullYear() + "-" + module$contents$webdriver$logging_padNumber(b.getUTCMonth() + 1, 2) + "-" + module$contents$webdriver$logging_padNumber(b.getUTCDate(), 2) + "T" + module$contents$webdriver$logging_padNumber(b.getUTCHours(), 2) + ":" + module$contents$webdriver$logging_padNumber(b.getUTCMinutes(), 2) + ":" + module$contents$webdriver$logging_padNumber(b.getUTCSeconds(), 2) + "Z][" + a.getLevel().name + "][" + a.getLoggerName() + "] " + a.getMessage();
    a = a.getLevel().value;
    a >= module$contents$webdriver$logging_Logger.Level.SEVERE.value ? console.error(b) : a >= module$contents$webdriver$logging_Logger.Level.WARNING.value ? console.warn(b) : console.log(b);
  }
}
webdriver.logging.addConsoleHandler = function(a) {
  (a || module$contents$webdriver$logging_getLogger()).addHandler(module$contents$webdriver$logging_consoleHandler);
};
webdriver.logging.installConsoleHandler = function() {
  webdriver.logging.addConsoleHandler();
};
webdriver.logging.removeConsoleHandler = function(a) {
  (a || module$contents$webdriver$logging_getLogger()).removeHandler(module$contents$webdriver$logging_consoleHandler);
};
function module$contents$webdriver$logging_getLevel(a) {
  return "DEBUG" === a || module$contents$webdriver$logging_Logger.Level.DEBUG.value === a ? module$contents$webdriver$logging_Logger.Level.DEBUG : goog.isString(a) ? module$contents$webdriver$logging_Logger.Level.getPredefinedLevel(a) || module$contents$webdriver$logging_Logger.Level.ALL : module$contents$webdriver$logging_Logger.Level.getPredefinedLevelByValue(a) || module$contents$webdriver$logging_Logger.Level.ALL;
}
webdriver.logging.getLevel = module$contents$webdriver$logging_getLevel;
function module$contents$webdriver$logging_normalizeLevel(a) {
  return a.value <= module$contents$webdriver$logging_Logger.Level.ALL.value ? module$contents$webdriver$logging_Logger.Level.ALL : a.value === module$contents$webdriver$logging_Logger.Level.OFF.value ? module$contents$webdriver$logging_Logger.Level.OFF : a.value < module$contents$webdriver$logging_Logger.Level.INFO.value ? module$contents$webdriver$logging_Logger.Level.DEBUG : a.value < module$contents$webdriver$logging_Logger.Level.WARNING.value ? module$contents$webdriver$logging_Logger.Level.INFO : 
  a.value < module$contents$webdriver$logging_Logger.Level.SEVERE.value ? module$contents$webdriver$logging_Logger.Level.WARNING : module$contents$webdriver$logging_Logger.Level.SEVERE;
}
var module$contents$webdriver$logging_Type = {BROWSER:"browser", CLIENT:"client", DRIVER:"driver", PERFORMANCE:"performance", SERVER:"server"};
webdriver.logging.Type = module$contents$webdriver$logging_Type;
var module$contents$webdriver$logging_Preferences = function() {
  this.prefs_ = {};
};
module$contents$webdriver$logging_Preferences.prototype.setLevel = function(a, b) {
  this.prefs_[a] = module$contents$webdriver$logging_normalizeLevel(b);
};
module$contents$webdriver$logging_Preferences.prototype.toJSON = function() {
  var a = {}, b;
  for (b in this.prefs_) {
    this.prefs_.hasOwnProperty(b) && (a[b] = this.prefs_[b].name);
  }
  return a;
};
webdriver.logging.Preferences = module$contents$webdriver$logging_Preferences;
var module$contents$webdriver$logging_Entry = function(a, b, c, d) {
  this.level = goog.isString(a) ? module$contents$webdriver$logging_getLevel(a) : a;
  this.message = b;
  this.timestamp = goog.isNumber(c) ? c : goog.now();
  this.type = d || "";
};
module$contents$webdriver$logging_Entry.fromClosureLogRecord = function(a, b) {
  return new module$contents$webdriver$logging_Entry(module$contents$webdriver$logging_normalizeLevel(a.getLevel()), "[" + a.getLoggerName() + "] " + a.getMessage(), a.getMillis(), b);
};
module$contents$webdriver$logging_Entry.prototype.toJSON = function() {
  return {level:this.level.name, message:this.message, timestamp:this.timestamp, type:this.type};
};
webdriver.logging.Entry = module$contents$webdriver$logging_Entry;
wgxpath.Node = {};
wgxpath.Node.equal = function(a, b) {
  return a == b || a instanceof wgxpath.IEAttrWrapper && b instanceof wgxpath.IEAttrWrapper && a.getNode() == b.getNode();
};
wgxpath.Node.getValueAsString = function(a) {
  var b = null, c = a.nodeType;
  c == goog.dom.NodeType.ELEMENT && (b = a.textContent, b = void 0 == b || null == b ? a.innerText : b, b = void 0 == b || null == b ? "" : b);
  if ("string" != typeof b) {
    if (wgxpath.userAgent.IE_DOC_PRE_9 && "title" == a.nodeName.toLowerCase() && c == goog.dom.NodeType.ELEMENT) {
      b = a.text;
    } else {
      if (c == goog.dom.NodeType.DOCUMENT || c == goog.dom.NodeType.ELEMENT) {
        a = c == goog.dom.NodeType.DOCUMENT ? a.documentElement : a.firstChild;
        for (var c = 0, d = [], b = ""; a;) {
          do {
            a.nodeType != goog.dom.NodeType.ELEMENT && (b += a.nodeValue), wgxpath.userAgent.IE_DOC_PRE_9 && "title" == a.nodeName.toLowerCase() && (b += a.text), d[c++] = a;
          } while (a = a.firstChild);
          for (; c && !(a = d[--c].nextSibling);) {
          }
        }
      } else {
        b = a.nodeValue;
      }
    }
  }
  return "" + b;
};
wgxpath.Node.getValueAsNumber = function(a) {
  return +wgxpath.Node.getValueAsString(a);
};
wgxpath.Node.getValueAsBool = function(a) {
  return !!wgxpath.Node.getValueAsString(a);
};
wgxpath.Node.attrMatches = function(a, b, c) {
  if (goog.isNull(b)) {
    return !0;
  }
  try {
    if (!a.getAttribute) {
      return !1;
    }
  } catch (d) {
    return !1;
  }
  wgxpath.userAgent.IE_DOC_PRE_8 && "class" == b && (b = "className");
  return null == c ? !!a.getAttribute(b) : a.getAttribute(b, 2) == c;
};
wgxpath.Node.getDescendantNodes = function(a, b, c, d, f) {
  f = f || new wgxpath.NodeSet;
  var g = wgxpath.userAgent.IE_DOC_PRE_9 ? wgxpath.Node.getDescendantNodesIEPre9_ : wgxpath.Node.getDescendantNodesGeneric_;
  c = goog.isString(c) ? c : null;
  d = goog.isString(d) ? d : null;
  return g.call(null, a, b, c, d, f);
};
wgxpath.Node.getDescendantNodesIEPre9_ = function(a, b, c, d, f) {
  if (wgxpath.Node.doesNeedSpecialHandlingIEPre9_(a, c)) {
    var g = b.all;
    if (!g) {
      return f;
    }
    var h = wgxpath.Node.getNameFromTestIEPre9_(a);
    if ("*" != h && (g = b.getElementsByTagName(h), !g)) {
      return f;
    }
    if (c) {
      var k = [];
      for (a = 0; b = g[a++];) {
        wgxpath.Node.attrMatches(b, c, d) && k.push(b);
      }
      g = k;
    }
    for (a = 0; b = g[a++];) {
      "*" == h && "!" == b.tagName || f.add(b);
    }
    return f;
  }
  wgxpath.Node.doRecursiveAttrMatch_(a, b, c, d, f);
  return f;
};
wgxpath.Node.getDescendantNodesGeneric_ = function(a, b, c, d, f) {
  b.getElementsByName && d && "name" == c && !goog.userAgent.IE ? (b = b.getElementsByName(d), goog.array.forEach(b, function(b) {
    a.matches(b) && f.add(b);
  })) : b.getElementsByClassName && d && "class" == c ? (b = b.getElementsByClassName(d), goog.array.forEach(b, function(b) {
    b.className == d && a.matches(b) && f.add(b);
  })) : a instanceof wgxpath.KindTest ? wgxpath.Node.doRecursiveAttrMatch_(a, b, c, d, f) : b.getElementsByTagName && (b = b.getElementsByTagName(a.getName()), goog.array.forEach(b, function(a) {
    wgxpath.Node.attrMatches(a, c, d) && f.add(a);
  }));
  return f;
};
wgxpath.Node.getChildNodes = function(a, b, c, d, f) {
  f = f || new wgxpath.NodeSet;
  var g = wgxpath.userAgent.IE_DOC_PRE_9 ? wgxpath.Node.getChildNodesIEPre9_ : wgxpath.Node.getChildNodesGeneric_;
  c = goog.isString(c) ? c : null;
  d = goog.isString(d) ? d : null;
  return g.call(null, a, b, c, d, f);
};
wgxpath.Node.getChildNodesIEPre9_ = function(a, b, c, d, f) {
  var g;
  if (wgxpath.Node.doesNeedSpecialHandlingIEPre9_(a, c) && (g = b.childNodes)) {
    var h = wgxpath.Node.getNameFromTestIEPre9_(a);
    if ("*" != h && (g = goog.array.filter(g, function(a) {
      return a.tagName && a.tagName.toLowerCase() == h;
    }), !g)) {
      return f;
    }
    c && (g = goog.array.filter(g, function(a) {
      return wgxpath.Node.attrMatches(a, c, d);
    }));
    goog.array.forEach(g, function(a) {
      "*" == h && ("!" == a.tagName || "*" == h && a.nodeType != goog.dom.NodeType.ELEMENT) || f.add(a);
    });
    return f;
  }
  return wgxpath.Node.getChildNodesGeneric_(a, b, c, d, f);
};
wgxpath.Node.getChildNodesGeneric_ = function(a, b, c, d, f) {
  for (b = b.firstChild; b; b = b.nextSibling) {
    wgxpath.Node.attrMatches(b, c, d) && a.matches(b) && f.add(b);
  }
  return f;
};
wgxpath.Node.doRecursiveAttrMatch_ = function(a, b, c, d, f) {
  for (b = b.firstChild; b; b = b.nextSibling) {
    wgxpath.Node.attrMatches(b, c, d) && a.matches(b) && f.add(b), wgxpath.Node.doRecursiveAttrMatch_(a, b, c, d, f);
  }
};
wgxpath.Node.doesNeedSpecialHandlingIEPre9_ = function(a, b) {
  return a instanceof wgxpath.NameTest || a.getType() == goog.dom.NodeType.COMMENT || !!b && goog.isNull(a.getType());
};
wgxpath.Node.getNameFromTestIEPre9_ = function(a) {
  if (a instanceof wgxpath.KindTest) {
    if (a.getType() == goog.dom.NodeType.COMMENT) {
      return "!";
    }
    if (goog.isNull(a.getType())) {
      return "*";
    }
  }
  return a.getName();
};
bot.dom = {};
bot.dom.core = {};
bot.dom.core.getAttribute = function(a, b) {
  b = b.toLowerCase();
  return "style" == b ? bot.dom.core.standardizeStyleAttribute_(a.style.cssText) : bot.userAgent.IE_DOC_PRE8 && "value" == b && bot.dom.core.isElement(a, "INPUT") ? a.value : bot.userAgent.IE_DOC_PRE9 && !0 === a[b] ? String(a.getAttribute(b)) : (a = a.getAttributeNode(b)) && a.specified ? a.value : null;
};
bot.dom.core.SPLIT_STYLE_ATTRIBUTE_ON_SEMICOLONS_REGEXP_ = /[;]+(?=(?:(?:[^"]*"){2})*[^"]*$)(?=(?:(?:[^']*'){2})*[^']*$)(?=(?:[^()]*\([^()]*\))*[^()]*$)/;
bot.dom.core.standardizeStyleAttribute_ = function(a) {
  a = a.split(bot.dom.core.SPLIT_STYLE_ATTRIBUTE_ON_SEMICOLONS_REGEXP_);
  var b = [];
  goog.array.forEach(a, function(a) {
    var c = a.indexOf(":");
    0 < c && (a = [a.slice(0, c), a.slice(c + 1)], 2 == a.length && b.push(a[0].toLowerCase(), ":", a[1], ";"));
  });
  b = b.join("");
  return b = ";" == b.charAt(b.length - 1) ? b : b + ";";
};
bot.dom.core.getProperty = function(a, b) {
  return bot.userAgent.IE_DOC_PRE8 && "value" == b && bot.dom.core.isElement(a, "OPTION") && goog.isNull(bot.dom.core.getAttribute(a, "value")) ? goog.dom.getRawTextContent(a) : a[b];
};
bot.dom.core.isElement = function(a, b) {
  b && "string" !== typeof b && (b = b.toString());
  return !!a && a.nodeType == goog.dom.NodeType.ELEMENT && (!b || a.tagName.toUpperCase() == b);
};
bot.dom.core.isSelectable = function(a) {
  return bot.dom.core.isElement(a, "OPTION") ? !0 : bot.dom.core.isElement(a, "INPUT") ? (a = a.type.toLowerCase(), "checkbox" == a || "radio" == a) : !1;
};
bot.dom.core.isSelected = function(a) {
  if (!bot.dom.core.isSelectable(a)) {
    throw new bot.Error(bot.ErrorCode.ELEMENT_NOT_SELECTABLE, "Element is not selectable");
  }
  var b = "selected", c = a.type && a.type.toLowerCase();
  if ("checkbox" == c || "radio" == c) {
    b = "checked";
  }
  return !!bot.dom.core.getProperty(a, b);
};
bot.html5 = {};
bot.html5.API = {APPCACHE:"appcache", BROWSER_CONNECTION:"browser_connection", DATABASE:"database", GEOLOCATION:"location", LOCAL_STORAGE:"local_storage", SESSION_STORAGE:"session_storage", VIDEO:"video", AUDIO:"audio", CANVAS:"canvas"};
bot.html5.IS_IE8_OR_EARLIER_ = goog.userAgent.IE && !bot.userAgent.isEngineVersion(9);
bot.html5.IS_SAFARI4_OR_EARLIER_ = goog.userAgent.product.SAFARI && !bot.userAgent.isProductVersion(5);
bot.html5.IS_ANDROID_FROYO_OR_EARLIER_ = goog.userAgent.product.ANDROID && !bot.userAgent.isProductVersion(2.3);
bot.html5.IS_SAFARI_WINDOWS_ = goog.userAgent.WINDOWS && goog.userAgent.product.SAFARI && bot.userAgent.isProductVersion(4) && !bot.userAgent.isProductVersion(6);
bot.html5.isSupported = function(a, b) {
  b = b || bot.getWindow();
  switch(a) {
    case bot.html5.API.APPCACHE:
      return bot.html5.IS_IE8_OR_EARLIER_ ? !1 : goog.isDefAndNotNull(b.applicationCache);
    case bot.html5.API.BROWSER_CONNECTION:
      return goog.isDefAndNotNull(b.navigator) && goog.isDefAndNotNull(b.navigator.onLine);
    case bot.html5.API.DATABASE:
      return bot.html5.IS_SAFARI4_OR_EARLIER_ || bot.html5.IS_ANDROID_FROYO_OR_EARLIER_ ? !1 : goog.isDefAndNotNull(b.openDatabase);
    case bot.html5.API.GEOLOCATION:
      return bot.html5.IS_SAFARI_WINDOWS_ ? !1 : goog.isDefAndNotNull(b.navigator) && goog.isDefAndNotNull(b.navigator.geolocation);
    case bot.html5.API.LOCAL_STORAGE:
      return bot.html5.IS_IE8_OR_EARLIER_ ? !1 : goog.isDefAndNotNull(b.localStorage);
    case bot.html5.API.SESSION_STORAGE:
      return bot.html5.IS_IE8_OR_EARLIER_ ? !1 : goog.isDefAndNotNull(b.sessionStorage) && goog.isDefAndNotNull(b.sessionStorage.clear);
    default:
      throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Unsupported API identifier provided as parameter");
  }
};
bot.locators.className = {};
bot.locators.className.canUseQuerySelector_ = function(a) {
  return !(!a.querySelectorAll || !a.querySelector);
};
bot.locators.className.single = function(a, b) {
  if (!a) {
    throw new bot.Error(bot.ErrorCode.INVALID_SELECTOR_ERROR, "No class name specified");
  }
  a = goog.string.trim(a);
  if (-1 !== a.indexOf(" ")) {
    throw new bot.Error(bot.ErrorCode.INVALID_SELECTOR_ERROR, "Compound class names not permitted");
  }
  if (bot.locators.className.canUseQuerySelector_(b)) {
    try {
      return b.querySelector("." + a.replace(/\./g, "\\.")) || null;
    } catch (c) {
      throw new bot.Error(bot.ErrorCode.INVALID_SELECTOR_ERROR, "An invalid or illegal class name was specified");
    }
  }
  a = goog.dom.getDomHelper(b).getElementsByTagNameAndClass("*", a, b);
  return a.length ? a[0] : null;
};
bot.locators.className.many = function(a, b) {
  if (!a) {
    throw new bot.Error(bot.ErrorCode.INVALID_SELECTOR_ERROR, "No class name specified");
  }
  a = goog.string.trim(a);
  if (-1 !== a.indexOf(" ")) {
    throw new bot.Error(bot.ErrorCode.INVALID_SELECTOR_ERROR, "Compound class names not permitted");
  }
  if (bot.locators.className.canUseQuerySelector_(b)) {
    try {
      return b.querySelectorAll("." + a.replace(/\./g, "\\."));
    } catch (c) {
      throw new bot.Error(bot.ErrorCode.INVALID_SELECTOR_ERROR, "An invalid or illegal class name was specified");
    }
  }
  return goog.dom.getDomHelper(b).getElementsByTagNameAndClass("*", a, b);
};
bot.locators.css = {};
bot.locators.css.single = function(a, b) {
  if (!goog.isFunction(b.querySelector) && goog.userAgent.IE && bot.userAgent.isEngineVersion(8) && !goog.isObject(b.querySelector)) {
    throw Error("CSS selection is not supported");
  }
  if (!a) {
    throw new bot.Error(bot.ErrorCode.INVALID_SELECTOR_ERROR, "No selector specified");
  }
  a = goog.string.trim(a);
  try {
    var c = b.querySelector(a);
  } catch (d) {
    throw new bot.Error(bot.ErrorCode.INVALID_SELECTOR_ERROR, "An invalid or illegal selector was specified");
  }
  return c && c.nodeType == goog.dom.NodeType.ELEMENT ? c : null;
};
bot.locators.css.many = function(a, b) {
  if (!goog.isFunction(b.querySelectorAll) && goog.userAgent.IE && bot.userAgent.isEngineVersion(8) && !goog.isObject(b.querySelector)) {
    throw Error("CSS selection is not supported");
  }
  if (!a) {
    throw new bot.Error(bot.ErrorCode.INVALID_SELECTOR_ERROR, "No selector specified");
  }
  a = goog.string.trim(a);
  try {
    return b.querySelectorAll(a);
  } catch (c) {
    throw new bot.Error(bot.ErrorCode.INVALID_SELECTOR_ERROR, "An invalid or illegal selector was specified");
  }
};
fxdriver.logging = {};
fxdriver.logging.LogType = {BROWSER:"browser", DRIVER:"driver", PROFILER:"profiler"};
fxdriver.logging.getLogger = function(a) {
  fxdriver.logging.initialize_();
  return goog.log.getLogger(a);
};
fxdriver.logging.log = function(a, b, c) {
  fxdriver.logging.initialize_();
  "string" != typeof c && (c = JSON.stringify(c));
  var d = fxdriver.logging.getLogFile_(a);
  a = new module$contents$webdriver$logging_Entry(b.name, c, goog.now(), a);
  a = JSON.stringify(a);
  a = a.replace(/\n/g, " ");
  d.append(a + "\n");
};
fxdriver.logging.getLog = function(a) {
  fxdriver.logging.initialize_();
  return fxdriver.logging.shouldIgnoreLogType_(a) ? [] : fxdriver.logging.filterLogEntries_(a, fxdriver.logging.getLogFromFile_(a));
};
fxdriver.logging.getAvailableLogTypes = function() {
  var a = [];
  goog.object.forEach(fxdriver.logging.LogType, function(b) {
    fxdriver.logging.shouldIgnoreLogType_(b) || a.push(b);
  });
  return a;
};
fxdriver.logging.configure = function(a, b) {
  fxdriver.logging.initialize_();
  goog.isString(a) && (a = JSON.parse(a));
  goog.object.forEach(a, function(a, b) {
    a == webdriver.logging.Level.OFF.name ? fxdriver.logging.ignoreLogType_(b) : fxdriver.logging.setLogLevel_(b, a);
  });
  b || fxdriver.logging.ignoreLogType_(fxdriver.logging.LogType.PROFILER);
};
fxdriver.logging.initialized_ = !1;
fxdriver.logging.initialize_ = function() {
  if (!fxdriver.logging.initialized_) {
    fxdriver.logging.initialized_ = !0;
    var a = goog.log.getLogger("");
    fxdriver.logging.addClosureToDriverFileLogger_(a);
    fxdriver.logging.addClosureToConsoleLogger_(a);
    fxdriver.logging.addClosureToFileLogger_(a);
    fxdriver.logging.hasConsoleListenerBeenRegistered_() || (fxdriver.logging.setConsoleListenerToRegistered_(), fxdriver.logging.addConsoleToFileLogger_());
  }
};
fxdriver.logging.addConsoleToFileLogger_ = function() {
  var a = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService), b = new fxdriver.logging.ConsoleToLogEntryFormatter, c = fxdriver.logging.getLogFile_(fxdriver.logging.LogType.BROWSER), d = {}, d = a.getMessageArray(d, {}) || d.value || [];
  goog.array.forEach(d, function(a) {
    c.append(b.formatConsoleEntry(a));
  });
  var f = new fxdriver.logging.ConsoleToLogEntryFilter, d = {observe:function(a) {
    f.excludeConsoleEntry(a) || c.append(b.formatConsoleEntry(a));
  }};
  d.QueryInterface = fxdriver.moz.queryInterface(d, [Components.interfaces.nsIConsoleListener]);
  a.registerListener(d);
};
fxdriver.logging.addClosureToConsoleLogger_ = function(a) {
  var b = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
  goog.log.addHandler(a, function(a) {
    var c = [];
    c.push("[WEBDRIVER] ");
    c.push("[", a.getLevel().name, "] ");
    c.push("[", a.getLoggerName(), "] ");
    c.push(a.getMessage(), "\n");
    a.getException() && c.push(a.getException().message, "\n");
    b.logStringMessage(c.join(""));
  });
};
fxdriver.logging.addClosureToFileLogger_ = function(a) {
  var b = fxdriver.prefs.getCharPref(fxdriver.logging.getPrefNameLogFile_(), void 0);
  if (b) {
    var c = new goog.debug.TextFormatter("webdriver");
    if ("/dev/stdout" == b) {
      goog.log.addHandler(a, function(a) {
        dump(c.formatRecord(a));
      });
    } else {
      var d = fxdriver.files.getFile(b);
      goog.log.addHandler(a, function(a) {
        d.append(c.formatRecord(a));
      });
    }
  }
};
fxdriver.logging.addClosureToDriverFileLogger_ = function(a) {
  var b = fxdriver.logging.getLogFile_(fxdriver.logging.LogType.DRIVER);
  goog.log.addHandler(a, function(a) {
    a = module$contents$webdriver$logging_Entry.fromClosureLogRecord(a);
    b.append(JSON.stringify(a).replace(/\n/g, " ") + "\n");
  });
};
fxdriver.logging.filterLogEntries_ = function(a, b) {
  var c = fxdriver.logging.getLogLevel_(a);
  return goog.array.filter(b, function(a) {
    return a.level.value >= c.value;
  });
};
fxdriver.logging.ConsoleToLogEntryFilter = function() {
};
fxdriver.logging.ConsoleToLogEntryFilter.prototype.excludeConsoleEntry = function(a) {
  a = fxdriver.logging.getConsoleEntryMessage_(a);
  return goog.string.startsWith(a, "[WEBDRIVER] ");
};
fxdriver.logging.ConsoleToLogEntryFormatter = function() {
};
fxdriver.logging.ConsoleToLogEntryFormatter.prototype.formatConsoleEntry = function(a) {
  a = new module$contents$webdriver$logging_Entry(fxdriver.logging.getConsoleEntryLogLevel_(a), fxdriver.logging.getConsoleEntryMessage_(a));
  return JSON.stringify(a).replace(/\n/g, " ") + "\n";
};
fxdriver.logging.getConsoleEntryMessage_ = function(a) {
  try {
    return a.QueryInterface(Components.interfaces.nsIScriptError), a.errorMessage;
  } catch (b) {
  }
  try {
    return a.QueryInterface(Components.interfaces.nsIConsoleMessage), a.message + "\n";
  } catch (b) {
  }
  return "" + a;
};
fxdriver.logging.getConsoleEntryLogLevel_ = function(a) {
  try {
    a.QueryInterface(Components.interfaces.nsIScriptError);
    if (a.flags & a.exceptionFlag) {
      return webdriver.logging.Level.SEVERE;
    }
    if (a.flags & a.warningFlag) {
      return webdriver.logging.Level.WARNING;
    }
  } catch (b) {
  }
  return webdriver.logging.Level.INFO;
};
fxdriver.logging.createNewLogFile_ = function(a) {
  var b = fxdriver.files.createTempFile(a + "_log", ".txt");
  fxdriver.prefs.setCharPref(fxdriver.logging.getPrefNameLogFile_(a), b.getFilePath());
  return b;
};
fxdriver.logging.getLogFile_ = function(a) {
  var b = fxdriver.prefs.getCharPref(fxdriver.logging.getPrefNameLogFile_(a), void 0);
  (b = fxdriver.files.getFile(b)) || (b = fxdriver.logging.createNewLogFile_(a));
  return b;
};
fxdriver.logging.getLogFromFile_ = function(a) {
  a = fxdriver.logging.getLogFile_(a);
  var b = a.read().trim().split("\n").join(",\n"), b = JSON.parse("[" + b + "]");
  a.resetBuffer();
  goog.array.forEach(b, function(a) {
    a.level = module$contents$webdriver$logging_getLevel(a.level);
  });
  return b;
};
fxdriver.logging.setLogLevel_ = function(a, b) {
  fxdriver.prefs.setCharPref(fxdriver.logging.getPrefNameLogLevel_(a), b);
};
fxdriver.logging.getLogLevel_ = function(a) {
  a = fxdriver.prefs.getCharPref(fxdriver.logging.getPrefNameLogLevel_(a), "INFO");
  return module$contents$webdriver$logging_getLevel(a);
};
fxdriver.logging.getPrefNameLogLevel_ = function(a) {
  return "webdriver.log." + a + ".level";
};
fxdriver.logging.getPrefNameLogFile_ = function(a) {
  return a ? "webdriver.log." + a + ".file" : "webdriver.log.file";
};
fxdriver.logging.hasConsoleListenerBeenRegistered_ = function() {
  return fxdriver.prefs.getBoolPref(fxdriver.logging.prefNameInitialized_, !1);
};
fxdriver.logging.setConsoleListenerToRegistered_ = function() {
  fxdriver.prefs.setBoolPref(fxdriver.logging.prefNameInitialized_, !0);
};
fxdriver.logging.prefNameInitialized_ = "webdriver.log.init";
fxdriver.logging.ignoreLogType_ = function(a) {
  fxdriver.prefs.setBoolPref(fxdriver.logging.getPrefNameLogIgnore_(a), !0);
};
fxdriver.logging.shouldIgnoreLogType_ = function(a) {
  return fxdriver.prefs.getBoolPref(fxdriver.logging.getPrefNameLogIgnore_(a), !1);
};
fxdriver.logging.getPrefNameLogIgnore_ = function(a) {
  return "webdriver.log." + a + ".ignore";
};
fxdriver.logging.dumpObject = function(a) {
  var b = "=============\n", c = [], b = b + "Supported interfaces: ";
  goog.object.forEach(Components.interfaces, function(c) {
    try {
      a.QueryInterface(Components.interfaces[c]), b += c + ", ";
    } catch (g) {
    }
  });
  b += "\n------------\n";
  try {
    fxdriver.logging.dumpProperties_(a, c);
  } catch (f) {
  }
  c.sort();
  for (var d in c) {
    b += c[d] + "\n";
  }
  b += "=============\n\n\n";
  goog.log.info(fxdriver.logging.driverLogger_, b);
};
fxdriver.logging.dumpProperties_ = function(a, b) {
  goog.object.forEach(a, function(a, d) {
    var c = "\t" + d + ": ";
    b.push("function" === typeof a ? c + " function()" : c + d);
  });
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
goog.style = {};
goog.style.setStyle = function(a, b, c) {
  if (goog.isString(b)) {
    goog.style.setStyle_(a, c, b);
  } else {
    for (var d in b) {
      goog.style.setStyle_(a, b[d], d);
    }
  }
};
goog.style.setStyle_ = function(a, b, c) {
  (c = goog.style.getVendorJsStyleName_(a, c)) && (a.style[c] = b);
};
goog.style.styleNameCache_ = {};
goog.style.getVendorJsStyleName_ = function(a, b) {
  var c = goog.style.styleNameCache_[b];
  if (!c) {
    var d = goog.string.toCamelCase(b), c = d;
    void 0 === a.style[d] && (d = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(d), void 0 !== a.style[d] && (c = d));
    goog.style.styleNameCache_[b] = c;
  }
  return c;
};
goog.style.getVendorStyleName_ = function(a, b) {
  var c = goog.string.toCamelCase(b);
  return void 0 === a.style[c] && (c = goog.dom.vendor.getVendorJsPrefix() + goog.string.toTitleCase(c), void 0 !== a.style[c]) ? goog.dom.vendor.getVendorPrefix() + "-" + b : b;
};
goog.style.getStyle = function(a, b) {
  var c = a.style[goog.string.toCamelCase(b)];
  return "undefined" !== typeof c ? c : a.style[goog.style.getVendorJsStyleName_(a, b)] || "";
};
goog.style.getComputedStyle = function(a, b) {
  var c = goog.dom.getOwnerDocument(a);
  return c.defaultView && c.defaultView.getComputedStyle && (a = c.defaultView.getComputedStyle(a, null)) ? a[b] || a.getPropertyValue(b) || "" : "";
};
goog.style.getCascadedStyle = function(a, b) {
  return a.currentStyle ? a.currentStyle[b] : null;
};
goog.style.getStyle_ = function(a, b) {
  return goog.style.getComputedStyle(a, b) || goog.style.getCascadedStyle(a, b) || a.style && a.style[b];
};
goog.style.getComputedBoxSizing = function(a) {
  return goog.style.getStyle_(a, "boxSizing") || goog.style.getStyle_(a, "MozBoxSizing") || goog.style.getStyle_(a, "WebkitBoxSizing") || null;
};
goog.style.getComputedPosition = function(a) {
  return goog.style.getStyle_(a, "position");
};
goog.style.getBackgroundColor = function(a) {
  return goog.style.getStyle_(a, "backgroundColor");
};
goog.style.getComputedOverflowX = function(a) {
  return goog.style.getStyle_(a, "overflowX");
};
goog.style.getComputedOverflowY = function(a) {
  return goog.style.getStyle_(a, "overflowY");
};
goog.style.getComputedZIndex = function(a) {
  return goog.style.getStyle_(a, "zIndex");
};
goog.style.getComputedTextAlign = function(a) {
  return goog.style.getStyle_(a, "textAlign");
};
goog.style.getComputedCursor = function(a) {
  return goog.style.getStyle_(a, "cursor");
};
goog.style.getComputedTransform = function(a) {
  var b = goog.style.getVendorStyleName_(a, "transform");
  return goog.style.getStyle_(a, b) || goog.style.getStyle_(a, "transform");
};
goog.style.setPosition = function(a, b, c) {
  if (b instanceof goog.math.Coordinate) {
    var d = b.x;
    b = b.y;
  } else {
    d = b, b = c;
  }
  a.style.left = goog.style.getPixelStyleValue_(d, !1);
  a.style.top = goog.style.getPixelStyleValue_(b, !1);
};
goog.style.getPosition = function(a) {
  return new goog.math.Coordinate(a.offsetLeft, a.offsetTop);
};
goog.style.getClientViewportElement = function(a) {
  a = a ? goog.dom.getOwnerDocument(a) : goog.dom.getDocument();
  return !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || goog.dom.getDomHelper(a).isCss1CompatMode() ? a.documentElement : a.body;
};
goog.style.getViewportPageOffset = function(a) {
  var b = a.body;
  a = a.documentElement;
  return new goog.math.Coordinate(b.scrollLeft || a.scrollLeft, b.scrollTop || a.scrollTop);
};
goog.style.getBoundingClientRect_ = function(a) {
  try {
    var b = a.getBoundingClientRect();
  } catch (c) {
    return {left:0, top:0, right:0, bottom:0};
  }
  goog.userAgent.IE && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
  return b;
};
goog.style.getOffsetParent = function(a) {
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(8)) {
    return goog.asserts.assert(a && "offsetParent" in a), a.offsetParent;
  }
  var b = goog.dom.getOwnerDocument(a), c = goog.style.getStyle_(a, "position"), d = "fixed" == c || "absolute" == c;
  for (a = a.parentNode; a && a != b; a = a.parentNode) {
    if (a.nodeType == goog.dom.NodeType.DOCUMENT_FRAGMENT && a.host && (a = a.host), c = goog.style.getStyle_(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) {
      return a;
    }
  }
  return null;
};
goog.style.getVisibleRectForElement = function(a) {
  for (var b = new goog.math.Box(0, Infinity, Infinity, 0), c = goog.dom.getDomHelper(a), d = c.getDocument().body, f = c.getDocument().documentElement, g = c.getDocumentScrollElement(); a = goog.style.getOffsetParent(a);) {
    if (!(goog.userAgent.IE && 0 == a.clientWidth || goog.userAgent.WEBKIT && 0 == a.clientHeight && a == d) && a != d && a != f && "visible" != goog.style.getStyle_(a, "overflow")) {
      var h = goog.style.getPageOffset(a), k = goog.style.getClientLeftTop(a);
      h.x += k.x;
      h.y += k.y;
      b.top = Math.max(b.top, h.y);
      b.right = Math.min(b.right, h.x + a.clientWidth);
      b.bottom = Math.min(b.bottom, h.y + a.clientHeight);
      b.left = Math.max(b.left, h.x);
    }
  }
  d = g.scrollLeft;
  g = g.scrollTop;
  b.left = Math.max(b.left, d);
  b.top = Math.max(b.top, g);
  c = c.getViewportSize();
  b.right = Math.min(b.right, d + c.width);
  b.bottom = Math.min(b.bottom, g + c.height);
  return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null;
};
goog.style.getContainerOffsetToScrollInto = function(a, b, c) {
  var d = b || goog.dom.getDocumentScrollElement();
  var f = goog.style.getPageOffset(a);
  var g = goog.style.getPageOffset(d), h = goog.style.getBorderBox(d);
  d == goog.dom.getDocumentScrollElement() ? (b = f.x - d.scrollLeft, f = f.y - d.scrollTop, goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(10) && (b += h.left, f += h.top)) : (b = f.x - g.x - h.left, f = f.y - g.y - h.top);
  h = goog.style.getSizeWithDisplay_(a);
  a = d.clientWidth - h.width;
  h = d.clientHeight - h.height;
  g = d.scrollLeft;
  d = d.scrollTop;
  c ? (g += b - a / 2, d += f - h / 2) : (g += Math.min(b, Math.max(b - a, 0)), d += Math.min(f, Math.max(f - h, 0)));
  return new goog.math.Coordinate(g, d);
};
goog.style.scrollIntoContainerView = function(a, b, c) {
  b = b || goog.dom.getDocumentScrollElement();
  a = goog.style.getContainerOffsetToScrollInto(a, b, c);
  b.scrollLeft = a.x;
  b.scrollTop = a.y;
};
goog.style.getClientLeftTop = function(a) {
  return new goog.math.Coordinate(a.clientLeft, a.clientTop);
};
goog.style.getPageOffset = function(a) {
  var b = goog.dom.getOwnerDocument(a);
  goog.asserts.assertObject(a, "Parameter is required");
  var c = new goog.math.Coordinate(0, 0), d = goog.style.getClientViewportElement(b);
  if (a == d) {
    return c;
  }
  a = goog.style.getBoundingClientRect_(a);
  b = goog.dom.getDomHelper(b).getDocumentScroll();
  c.x = a.left + b.x;
  c.y = a.top + b.y;
  return c;
};
goog.style.getPageOffsetLeft = function(a) {
  return goog.style.getPageOffset(a).x;
};
goog.style.getPageOffsetTop = function(a) {
  return goog.style.getPageOffset(a).y;
};
goog.style.getFramedPageOffset = function(a, b) {
  var c = new goog.math.Coordinate(0, 0), d = goog.dom.getWindow(goog.dom.getOwnerDocument(a));
  if (!goog.reflect.canAccessProperty(d, "parent")) {
    return c;
  }
  do {
    var f = d == b ? goog.style.getPageOffset(a) : goog.style.getClientPositionForElement_(goog.asserts.assert(a));
    c.x += f.x;
    c.y += f.y;
  } while (d && d != b && d != d.parent && (a = d.frameElement) && (d = d.parent));
  return c;
};
goog.style.translateRectForAnotherFrame = function(a, b, c) {
  if (b.getDocument() != c.getDocument()) {
    var d = b.getDocument().body;
    c = goog.style.getFramedPageOffset(d, c.getWindow());
    c = goog.math.Coordinate.difference(c, goog.style.getPageOffset(d));
    !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9) || b.isCss1CompatMode() || (c = goog.math.Coordinate.difference(c, b.getDocumentScroll()));
    a.left += c.x;
    a.top += c.y;
  }
};
goog.style.getRelativePosition = function(a, b) {
  a = goog.style.getClientPosition(a);
  b = goog.style.getClientPosition(b);
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y);
};
goog.style.getClientPositionForElement_ = function(a) {
  a = goog.style.getBoundingClientRect_(a);
  return new goog.math.Coordinate(a.left, a.top);
};
goog.style.getClientPosition = function(a) {
  goog.asserts.assert(a);
  if (a.nodeType == goog.dom.NodeType.ELEMENT) {
    return goog.style.getClientPositionForElement_(a);
  }
  a = a.changedTouches ? a.changedTouches[0] : a;
  return new goog.math.Coordinate(a.clientX, a.clientY);
};
goog.style.setPageOffset = function(a, b, c) {
  var d = goog.style.getPageOffset(a);
  b instanceof goog.math.Coordinate && (c = b.y, b = b.x);
  b = goog.asserts.assertNumber(b) - d.x;
  goog.style.setPosition(a, a.offsetLeft + b, a.offsetTop + (Number(c) - d.y));
};
goog.style.setSize = function(a, b, c) {
  if (b instanceof goog.math.Size) {
    c = b.height, b = b.width;
  } else {
    if (void 0 == c) {
      throw Error("missing height argument");
    }
  }
  goog.style.setWidth(a, b);
  goog.style.setHeight(a, c);
};
goog.style.getPixelStyleValue_ = function(a, b) {
  "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
  return a;
};
goog.style.setHeight = function(a, b) {
  a.style.height = goog.style.getPixelStyleValue_(b, !0);
};
goog.style.setWidth = function(a, b) {
  a.style.width = goog.style.getPixelStyleValue_(b, !0);
};
goog.style.getSize = function(a) {
  return goog.style.evaluateWithTemporaryDisplay_(goog.style.getSizeWithDisplay_, a);
};
goog.style.evaluateWithTemporaryDisplay_ = function(a, b) {
  if ("none" != goog.style.getStyle_(b, "display")) {
    return a(b);
  }
  var c = b.style, d = c.display, f = c.visibility, g = c.position;
  c.visibility = "hidden";
  c.position = "absolute";
  c.display = "inline";
  a = a(b);
  c.display = d;
  c.position = g;
  c.visibility = f;
  return a;
};
goog.style.getSizeWithDisplay_ = function(a) {
  var b = a.offsetWidth, c = a.offsetHeight, d = goog.userAgent.WEBKIT && !b && !c;
  return goog.isDef(b) && !d || !a.getBoundingClientRect ? new goog.math.Size(b, c) : (a = goog.style.getBoundingClientRect_(a), new goog.math.Size(a.right - a.left, a.bottom - a.top));
};
goog.style.getTransformedSize = function(a) {
  if (!a.getBoundingClientRect) {
    return null;
  }
  a = goog.style.evaluateWithTemporaryDisplay_(goog.style.getBoundingClientRect_, a);
  return new goog.math.Size(a.right - a.left, a.bottom - a.top);
};
goog.style.getBounds = function(a) {
  var b = goog.style.getPageOffset(a);
  a = goog.style.getSize(a);
  return new goog.math.Rect(b.x, b.y, a.width, a.height);
};
goog.style.toCamelCase = function(a) {
  return goog.string.toCamelCase(String(a));
};
goog.style.toSelectorCase = function(a) {
  return goog.string.toSelectorCase(a);
};
goog.style.getOpacity = function(a) {
  goog.asserts.assert(a);
  var b = a.style;
  a = "";
  "opacity" in b ? a = b.opacity : "MozOpacity" in b ? a = b.MozOpacity : "filter" in b && (b = b.filter.match(/alpha\(opacity=([\d.]+)\)/)) && (a = String(b[1] / 100));
  return "" == a ? a : Number(a);
};
goog.style.setOpacity = function(a, b) {
  goog.asserts.assert(a);
  a = a.style;
  "opacity" in a ? a.opacity = b : "MozOpacity" in a ? a.MozOpacity = b : "filter" in a && (a.filter = "" === b ? "" : "alpha(opacity=" + 100 * Number(b) + ")");
};
goog.style.setTransparentBackgroundImage = function(a, b) {
  a = a.style;
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? a.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '", sizingMethod="crop")' : (a.backgroundImage = "url(" + b + ")", a.backgroundPosition = "top left", a.backgroundRepeat = "no-repeat");
};
goog.style.clearTransparentBackgroundImage = function(a) {
  a = a.style;
  "filter" in a ? a.filter = "" : a.backgroundImage = "none";
};
goog.style.showElement = function(a, b) {
  goog.style.setElementShown(a, b);
};
goog.style.setElementShown = function(a, b) {
  a.style.display = b ? "" : "none";
};
goog.style.isElementShown = function(a) {
  return "none" != a.style.display;
};
goog.style.installStyles = function(a, b) {
  return goog.style.installSafeStyleSheet(goog.html.legacyconversions.safeStyleSheetFromString(a), b);
};
goog.style.installSafeStyleSheet = function(a, b) {
  b = goog.dom.getDomHelper(b);
  var c = b.getDocument();
  if (goog.userAgent.IE && c.createStyleSheet) {
    var d = c.createStyleSheet();
    goog.style.setSafeStyleSheet(d, a);
  } else {
    c = b.getElementsByTagNameAndClass("HEAD")[0], c || (d = b.getElementsByTagNameAndClass("BODY")[0], c = b.createDom("HEAD"), d.parentNode.insertBefore(c, d)), d = b.createDom("STYLE"), goog.style.setSafeStyleSheet(d, a), b.appendChild(c, d);
  }
  return d;
};
goog.style.uninstallStyles = function(a) {
  goog.dom.removeNode(a.ownerNode || a.owningElement || a);
};
goog.style.setStyles = function(a, b) {
  goog.style.setSafeStyleSheet(a, goog.html.legacyconversions.safeStyleSheetFromString(b));
};
goog.style.setSafeStyleSheet = function(a, b) {
  b = goog.html.SafeStyleSheet.unwrap(b);
  goog.userAgent.IE && goog.isDef(a.cssText) ? a.cssText = b : a.innerHTML = b;
};
goog.style.setPreWrap = function(a) {
  a = a.style;
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.whiteSpace = "pre", a.wordWrap = "break-word") : a.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap";
};
goog.style.setInlineBlock = function(a) {
  a = a.style;
  a.position = "relative";
  goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("8") ? (a.zoom = "1", a.display = "inline") : a.display = "inline-block";
};
goog.style.isRightToLeft = function(a) {
  return "rtl" == goog.style.getStyle_(a, "direction");
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT || goog.userAgent.EDGE ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function(a) {
  return goog.style.unselectableStyle_ ? "none" == a.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == a.getAttribute("unselectable") : !1;
};
goog.style.setUnselectable = function(a, b, c) {
  c = c ? null : a.getElementsByTagName("*");
  var d = goog.style.unselectableStyle_;
  if (d) {
    if (b = b ? "none" : "", a.style && (a.style[d] = b), c) {
      a = 0;
      for (var f; f = c[a]; a++) {
        f.style && (f.style[d] = b);
      }
    }
  } else {
    if (goog.userAgent.IE || goog.userAgent.OPERA) {
      if (b = b ? "on" : "", a.setAttribute("unselectable", b), c) {
        for (a = 0; f = c[a]; a++) {
          f.setAttribute("unselectable", b);
        }
      }
    }
  }
};
goog.style.getBorderBoxSize = function(a) {
  return new goog.math.Size(a.offsetWidth, a.offsetHeight);
};
goog.style.setBorderBoxSize = function(a, b) {
  var c = goog.dom.getOwnerDocument(a), d = goog.dom.getDomHelper(c).isCss1CompatMode();
  !goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8") ? goog.style.setBoxSizingSize_(a, b, "border-box") : (c = a.style, d ? (d = goog.style.getPaddingBox(a), a = goog.style.getBorderBox(a), c.pixelWidth = b.width - a.left - d.left - d.right - a.right, c.pixelHeight = b.height - a.top - d.top - d.bottom - a.bottom) : (c.pixelWidth = b.width, c.pixelHeight = b.height));
};
goog.style.getContentBoxSize = function(a) {
  var b = goog.dom.getOwnerDocument(a), c = goog.userAgent.IE && a.currentStyle;
  if (c && goog.dom.getDomHelper(b).isCss1CompatMode() && "auto" != c.width && "auto" != c.height && !c.boxSizing) {
    return b = goog.style.getIePixelValue_(a, c.width, "width", "pixelWidth"), a = goog.style.getIePixelValue_(a, c.height, "height", "pixelHeight"), new goog.math.Size(b, a);
  }
  c = goog.style.getBorderBoxSize(a);
  b = goog.style.getPaddingBox(a);
  a = goog.style.getBorderBox(a);
  return new goog.math.Size(c.width - a.left - b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom);
};
goog.style.setContentBoxSize = function(a, b) {
  var c = goog.dom.getOwnerDocument(a), d = goog.dom.getDomHelper(c).isCss1CompatMode();
  !goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10") || d && goog.userAgent.isVersionOrHigher("8") ? goog.style.setBoxSizingSize_(a, b, "content-box") : (c = a.style, d ? (c.pixelWidth = b.width, c.pixelHeight = b.height) : (d = goog.style.getPaddingBox(a), a = goog.style.getBorderBox(a), c.pixelWidth = b.width + a.left + d.left + d.right + a.right, c.pixelHeight = b.height + a.top + d.top + d.bottom + a.bottom));
};
goog.style.setBoxSizingSize_ = function(a, b, c) {
  a = a.style;
  goog.userAgent.GECKO ? a.MozBoxSizing = c : goog.userAgent.WEBKIT ? a.WebkitBoxSizing = c : a.boxSizing = c;
  a.width = Math.max(b.width, 0) + "px";
  a.height = Math.max(b.height, 0) + "px";
};
goog.style.getIePixelValue_ = function(a, b, c, d) {
  if (/^\d+px?$/.test(b)) {
    return parseInt(b, 10);
  }
  var f = a.style[c], g = a.runtimeStyle[c];
  a.runtimeStyle[c] = a.currentStyle[c];
  a.style[c] = b;
  b = a.style[d];
  a.style[c] = f;
  a.runtimeStyle[c] = g;
  return +b;
};
goog.style.getIePixelDistance_ = function(a, b) {
  return (b = goog.style.getCascadedStyle(a, b)) ? goog.style.getIePixelValue_(a, b, "left", "pixelLeft") : 0;
};
goog.style.getBox_ = function(a, b) {
  if (goog.userAgent.IE) {
    var c = goog.style.getIePixelDistance_(a, b + "Left");
    var d = goog.style.getIePixelDistance_(a, b + "Right");
    var f = goog.style.getIePixelDistance_(a, b + "Top");
    a = goog.style.getIePixelDistance_(a, b + "Bottom");
    return new goog.math.Box(f, d, a, c);
  }
  c = goog.style.getComputedStyle(a, b + "Left");
  d = goog.style.getComputedStyle(a, b + "Right");
  f = goog.style.getComputedStyle(a, b + "Top");
  a = goog.style.getComputedStyle(a, b + "Bottom");
  return new goog.math.Box(parseFloat(f), parseFloat(d), parseFloat(a), parseFloat(c));
};
goog.style.getPaddingBox = function(a) {
  return goog.style.getBox_(a, "padding");
};
goog.style.getMarginBox = function(a) {
  return goog.style.getBox_(a, "margin");
};
goog.style.ieBorderWidthKeywords_ = {thin:2, medium:4, thick:6};
goog.style.getIePixelBorder_ = function(a, b) {
  if ("none" == goog.style.getCascadedStyle(a, b + "Style")) {
    return 0;
  }
  b = goog.style.getCascadedStyle(a, b + "Width");
  return b in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[b] : goog.style.getIePixelValue_(a, b, "left", "pixelLeft");
};
goog.style.getBorderBox = function(a) {
  if (goog.userAgent.IE && !goog.userAgent.isDocumentModeOrHigher(9)) {
    var b = goog.style.getIePixelBorder_(a, "borderLeft");
    var c = goog.style.getIePixelBorder_(a, "borderRight");
    var d = goog.style.getIePixelBorder_(a, "borderTop");
    a = goog.style.getIePixelBorder_(a, "borderBottom");
    return new goog.math.Box(d, c, a, b);
  }
  b = goog.style.getComputedStyle(a, "borderLeftWidth");
  c = goog.style.getComputedStyle(a, "borderRightWidth");
  d = goog.style.getComputedStyle(a, "borderTopWidth");
  a = goog.style.getComputedStyle(a, "borderBottomWidth");
  return new goog.math.Box(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b));
};
goog.style.getFontFamily = function(a) {
  var b = goog.dom.getOwnerDocument(a), c = "";
  if (b.body.createTextRange && goog.dom.contains(b, a)) {
    b = b.body.createTextRange();
    b.moveToElementText(a);
    try {
      c = b.queryCommandValue("FontName");
    } catch (d) {
      c = "";
    }
  }
  c || (c = goog.style.getStyle_(a, "fontFamily"));
  a = c.split(",");
  1 < a.length && (c = a[0]);
  return goog.string.stripQuotes(c, "\"'");
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function(a) {
  return (a = a.match(goog.style.lengthUnitRegex_)) && a[0] || null;
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {cm:1, "in":1, mm:1, pc:1, pt:1};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {em:1, ex:1};
goog.style.getFontSize = function(a) {
  var b = goog.style.getStyle_(a, "fontSize"), c = goog.style.getLengthUnits(b);
  if (b && "px" == c) {
    return parseInt(b, 10);
  }
  if (goog.userAgent.IE) {
    if (String(c) in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) {
      return goog.style.getIePixelValue_(a, b, "left", "pixelLeft");
    }
    if (a.parentNode && a.parentNode.nodeType == goog.dom.NodeType.ELEMENT && String(c) in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) {
      return a = a.parentNode, c = goog.style.getStyle_(a, "fontSize"), goog.style.getIePixelValue_(a, b == c ? "1em" : b, "left", "pixelLeft");
    }
  }
  c = goog.dom.createDom("SPAN", {style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});
  goog.dom.appendChild(a, c);
  b = c.offsetHeight;
  goog.dom.removeNode(c);
  return b;
};
goog.style.parseStyleAttribute = function(a) {
  var b = {};
  goog.array.forEach(a.split(/\s*;\s*/), function(a) {
    var c = a.match(/\s*([\w-]+)\s*\:(.+)/);
    c && (a = c[1], c = goog.string.trim(c[2]), b[goog.string.toCamelCase(a.toLowerCase())] = c);
  });
  return b;
};
goog.style.toStyleAttribute = function(a) {
  var b = [];
  goog.object.forEach(a, function(a, d) {
    b.push(goog.string.toSelectorCase(d), ":", a, ";");
  });
  return b.join("");
};
goog.style.setFloat = function(a, b) {
  a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = b;
};
goog.style.getFloat = function(a) {
  return a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || "";
};
goog.style.getScrollbarWidth = function(a) {
  var b = goog.dom.createElement("DIV");
  a && (b.className = a);
  b.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
  a = goog.dom.createElement("DIV");
  goog.style.setSize(a, "200px", "200px");
  b.appendChild(a);
  goog.dom.appendChild(goog.dom.getDocument().body, b);
  a = b.offsetWidth - b.clientWidth;
  goog.dom.removeNode(b);
  return a;
};
goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation = function(a) {
  a = goog.style.getComputedTransform(a);
  return a ? (a = a.match(goog.style.MATRIX_TRANSLATION_REGEX_)) ? new goog.math.Coordinate(parseFloat(a[1]), parseFloat(a[2])) : new goog.math.Coordinate(0, 0) : new goog.math.Coordinate(0, 0);
};
wgxpath.NodeSet = function() {
  this.last_ = this.first_ = null;
  this.length_ = 0;
};
wgxpath.NodeSet.Entry_ = function(a) {
  this.node = a;
  this.next = this.prev = null;
};
wgxpath.NodeSet.merge = function(a, b) {
  if (!a.first_) {
    return b;
  }
  if (!b.first_) {
    return a;
  }
  var c = a.first_;
  b = b.first_;
  for (var d = null, f, g = 0; c && b;) {
    wgxpath.Node.equal(c.node, b.node) ? (f = c, c = c.next, b = b.next) : 0 < goog.dom.compareNodeOrder(c.node, b.node) ? (f = b, b = b.next) : (f = c, c = c.next), (f.prev = d) ? d.next = f : a.first_ = f, d = f, g++;
  }
  for (f = c || b; f;) {
    f.prev = d, d = d.next = f, g++, f = f.next;
  }
  a.last_ = d;
  a.length_ = g;
  return a;
};
wgxpath.NodeSet.prototype.unshift = function(a) {
  a = new wgxpath.NodeSet.Entry_(a);
  a.next = this.first_;
  this.last_ ? this.first_.prev = a : this.first_ = this.last_ = a;
  this.first_ = a;
  this.length_++;
};
wgxpath.NodeSet.prototype.add = function(a) {
  a = new wgxpath.NodeSet.Entry_(a);
  a.prev = this.last_;
  this.first_ ? this.last_.next = a : this.first_ = this.last_ = a;
  this.last_ = a;
  this.length_++;
};
wgxpath.NodeSet.prototype.getFirst = function() {
  var a = this.first_;
  return a ? a.node : null;
};
wgxpath.NodeSet.prototype.getLength = function() {
  return this.length_;
};
wgxpath.NodeSet.prototype.string = function() {
  var a = this.getFirst();
  return a ? wgxpath.Node.getValueAsString(a) : "";
};
wgxpath.NodeSet.prototype.number = function() {
  return +this.string();
};
wgxpath.NodeSet.prototype.iterator = function(a) {
  return new wgxpath.NodeSet.Iterator(this, !!a);
};
wgxpath.NodeSet.Iterator = function(a, b) {
  this.nodeset_ = a;
  this.current_ = (this.reverse_ = b) ? a.last_ : a.first_;
  this.lastReturned_ = null;
};
wgxpath.NodeSet.Iterator.prototype.next = function() {
  var a = this.current_;
  if (null == a) {
    return null;
  }
  var b = this.lastReturned_ = a;
  this.current_ = this.reverse_ ? a.prev : a.next;
  return b.node;
};
wgxpath.NodeSet.Iterator.prototype.remove = function() {
  var a = this.nodeset_, b = this.lastReturned_;
  if (!b) {
    throw Error("Next must be called at least once before remove.");
  }
  var c = b.prev, b = b.next;
  c ? c.next = b : a.first_ = b;
  b ? b.prev = c : a.last_ = c;
  a.length_--;
  this.lastReturned_ = null;
};
fxdriver.io = {};
fxdriver.io.isLoadExpected = function(a, b) {
  if (!b) {
    return !0;
  }
  var c = fxdriver.moz.getService("@mozilla.org/network/io-service;1", "nsIIOService");
  a = c.newURI(a, "", null);
  b = c.newURI(b, "", a);
  c = !0;
  if ("javascript" == b.scheme) {
    return !1;
  }
  a && b && a.prePath == b.prePath && a.filePath == b.filePath && (c = -1 == b.path.indexOf("#"));
  return c;
};
var STATE_STOP = Components.interfaces.nsIWebProgressListener.STATE_STOP;
function DoNothing(a, b, c) {
  this.browser = a;
  this.onComplete = b;
  this.win = c;
  this.active = !0;
}
DoNothing.prototype.onLocationChange = function() {
  return 0;
};
DoNothing.prototype.onProgressChange = function() {
  return 0;
};
DoNothing.prototype.onStateChange = function() {
  return 0;
};
DoNothing.prototype.onStatusChange = function() {
  return 0;
};
DoNothing.prototype.onSecurityChange = function() {
  return 0;
};
DoNothing.prototype.onLinkIconAvailable = function() {
  return 0;
};
DoNothing.prototype.QueryInterface = function(a) {
  if (a.equals(Components.interfaces.nsIWebProgressListener) || a.equals(Components.interfaces.nsISupportsWeakReference) || a.equals(Components.interfaces.nsISupports)) {
    return this;
  }
  throw Components.results.NS_NOINTERFACE;
};
function PatientListener(a, b, c) {
  this.browser = a;
  this.onComplete = b;
  this.win = c;
  this.active = !0;
}
PatientListener.LOG_ = fxdriver.logging.getLogger("fxdriver.PatientListener");
PatientListener.prototype = new DoNothing;
PatientListener.prototype.onStateChange = function(a, b, c) {
  if (!this.active) {
    return 0;
  }
  c & STATE_STOP && (goog.log.info(PatientListener.LOG_, "request status is " + b.status), b.URI && (this.active = !1, bot.userAgent.isProductVersion("4") && WebLoadingListener.removeListener(this.browser, this), this.onComplete()));
  return 0;
};
function ImpatientListener(a, b, c) {
  this.browser = a;
  this.browserProgress = a.webProgress;
  this.active = !0;
  this.onComplete = b;
  this.win = c || null;
}
ImpatientListener.LOG_ = fxdriver.logging.getLogger("fxdriver.ImpatientListener");
ImpatientListener.prototype = new PatientListener;
ImpatientListener.prototype.onProgressChange = function(a) {
  if (!this.active || !this.win || this.win.closed) {
    return 0;
  }
  a = this.win.document && this.win.document.readyState;
  var b = this.win.document.location;
  goog.log.info(ImpatientListener.LOG_, "readyState is " + a);
  "complete" != a && "interactive" != a || "about:blank" == b || (this.active = !1, bot.userAgent.isProductVersion("4") && WebLoadingListener.removeListener(this.browser, this), this.onComplete(!1, !0));
  return 0;
};
var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
function buildHandler(a, b, c) {
  var d = Utils.getPageLoadStrategy();
  if ("normal" == d) {
    return new PatientListener(a, b, c);
  }
  if ("unstable" == d || "eager" == d) {
    return new ImpatientListener(a, b, c);
  }
  var f = fxdriver.logging.getLogger("fxdriver.WebLoadingListener");
  goog.log.warning(f, "Unsupported page loading strategy: " + d);
  return new PatientListener(a, b, c);
}
var loadingListenerTimer, WebLoadingListener = function(a, b, c, d) {
  if ("none" == Utils.getPageLoadStrategy()) {
    b(!1, !0);
  } else {
    loadingListenerTimer = new fxdriver.Timer;
    var f = function(a, c) {
      loadingListenerTimer.cancel();
      b(a, c);
    };
    this.handler = buildHandler(a, f, d);
    a.addProgressListener(this.handler);
    -1 == c && (c = 18E5);
    var g = this.handler;
    loadingListenerTimer.setTimeout(function() {
      a.removeProgressListener && a.removeProgressListener(g);
      f(!0);
    }, c);
  }
};
WebLoadingListener.removeListener = function(a, b) {
  a.removeProgressListener && b.handler && a.removeProgressListener(b.handler);
};
bot.appcache = {};
bot.appcache.getStatus = function(a) {
  a = a || bot.getWindow();
  if (bot.html5.isSupported(bot.html5.API.APPCACHE, a)) {
    return a.applicationCache.status;
  }
  throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Undefined application cache");
};
bot.events = {};
bot.events.SUPPORTS_TOUCH_EVENTS = !(goog.userAgent.IE && !bot.userAgent.isEngineVersion(10));
bot.events.BROKEN_TOUCH_API_ = function() {
  return goog.userAgent.product.ANDROID ? !bot.userAgent.isProductVersion(4) : !bot.userAgent.IOS;
}();
bot.events.SUPPORTS_MSPOINTER_EVENTS = goog.userAgent.IE && bot.getWindow().navigator.msPointerEnabled;
bot.events.EventFactory_ = function(a, b, c) {
  this.type_ = a;
  this.bubbles_ = b;
  this.cancelable_ = c;
};
bot.events.EventFactory_.prototype.create = function(a, b) {
  a = goog.dom.getOwnerDocument(a);
  bot.userAgent.IE_DOC_PRE9 && a.createEventObject ? a = a.createEventObject() : (a = a.createEvent("HTMLEvents"), a.initEvent(this.type_, this.bubbles_, this.cancelable_));
  return a;
};
bot.events.EventFactory_.prototype.toString = function() {
  return this.type_;
};
bot.events.MouseEventFactory_ = function(a, b, c) {
  bot.events.EventFactory_.call(this, a, b, c);
};
goog.inherits(bot.events.MouseEventFactory_, bot.events.EventFactory_);
bot.events.MouseEventFactory_.prototype.create = function(a, b) {
  if (!goog.userAgent.GECKO && this == bot.events.EventType.MOUSEPIXELSCROLL) {
    throw new bot.Error(bot.ErrorCode.UNSUPPORTED_OPERATION, "Browser does not support a mouse pixel scroll event.");
  }
  var c = goog.dom.getOwnerDocument(a);
  if (bot.userAgent.IE_DOC_PRE9) {
    var d = c.createEventObject();
    d.altKey = b.altKey;
    d.ctrlKey = b.ctrlKey;
    d.metaKey = b.metaKey;
    d.shiftKey = b.shiftKey;
    d.button = b.button;
    d.clientX = b.clientX;
    d.clientY = b.clientY;
    c = function(a, b) {
      Object.defineProperty(d, a, {get:function() {
        return b;
      }});
    };
    if (this == bot.events.EventType.MOUSEOUT || this == bot.events.EventType.MOUSEOVER) {
      if (Object.defineProperty) {
        var f = this == bot.events.EventType.MOUSEOUT;
        c("fromElement", f ? a : b.relatedTarget);
        c("toElement", f ? b.relatedTarget : a);
      } else {
        d.relatedTarget = b.relatedTarget;
      }
    }
    this == bot.events.EventType.MOUSEWHEEL && (Object.defineProperty ? c("wheelDelta", b.wheelDelta) : d.detail = b.wheelDelta);
  } else {
    f = goog.dom.getWindow(c);
    d = c.createEvent("MouseEvents");
    var g = 1;
    this == bot.events.EventType.MOUSEWHEEL && (goog.userAgent.GECKO || (d.wheelDelta = b.wheelDelta), goog.userAgent.GECKO && (g = b.wheelDelta / -40));
    goog.userAgent.GECKO && this == bot.events.EventType.MOUSEPIXELSCROLL && (g = b.wheelDelta);
    d.initMouseEvent(this.type_, this.bubbles_, this.cancelable_, f, g, b.clientX, b.clientY, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget);
    if (goog.userAgent.IE && 0 === d.pageX && 0 === d.pageY && Object.defineProperty) {
      a = goog.dom.getDomHelper(a).getDocumentScrollElement();
      var c = goog.style.getClientViewportElement(c), h = b.clientX + a.scrollLeft - c.clientLeft, k = b.clientY + a.scrollTop - c.clientTop;
      Object.defineProperty(d, "pageX", {get:function() {
        return h;
      }});
      Object.defineProperty(d, "pageY", {get:function() {
        return k;
      }});
    }
  }
  return d;
};
bot.events.KeyboardEventFactory_ = function(a, b, c) {
  bot.events.EventFactory_.call(this, a, b, c);
};
goog.inherits(bot.events.KeyboardEventFactory_, bot.events.EventFactory_);
bot.events.KeyboardEventFactory_.prototype.create = function(a, b) {
  var c = goog.dom.getOwnerDocument(a);
  if (goog.userAgent.GECKO) {
    a = goog.dom.getWindow(c);
    var d = b.charCode ? 0 : b.keyCode, c = c.createEvent("KeyboardEvent");
    c.initKeyEvent(this.type_, this.bubbles_, this.cancelable_, a, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, d, b.charCode);
    this.type_ == bot.events.EventType.KEYPRESS && b.preventDefault && c.preventDefault();
  } else {
    if (bot.userAgent.IE_DOC_PRE9 ? c = c.createEventObject() : (c = c.createEvent("Events"), c.initEvent(this.type_, this.bubbles_, this.cancelable_)), c.altKey = b.altKey, c.ctrlKey = b.ctrlKey, c.metaKey = b.metaKey, c.shiftKey = b.shiftKey, c.keyCode = b.charCode || b.keyCode, goog.userAgent.WEBKIT || goog.userAgent.EDGE) {
      c.charCode = this == bot.events.EventType.KEYPRESS ? c.keyCode : 0;
    }
  }
  return c;
};
bot.events.TouchEventStrategy_ = {MOUSE_EVENTS:1, INIT_TOUCH_EVENT:2, TOUCH_EVENT_CTOR:3};
bot.events.TouchEventFactory_ = function(a, b, c) {
  bot.events.EventFactory_.call(this, a, b, c);
};
goog.inherits(bot.events.TouchEventFactory_, bot.events.EventFactory_);
bot.events.TouchEventFactory_.prototype.create = function(a, b) {
  function c(b) {
    b = goog.array.map(b, function(b) {
      return h.createTouch(k, a, b.identifier, b.pageX, b.pageY, b.screenX, b.screenY);
    });
    return h.createTouchList.apply(h, b);
  }
  function d(b) {
    var c = goog.array.map(b, function(b) {
      return {identifier:b.identifier, screenX:b.screenX, screenY:b.screenY, clientX:b.clientX, clientY:b.clientY, pageX:b.pageX, pageY:b.pageY, target:a};
    });
    c.item = function(a) {
      return c[a];
    };
    return c;
  }
  function f(b) {
    return goog.array.map(b, function(b) {
      return new Touch({identifier:b.identifier, screenX:b.screenX, screenY:b.screenY, clientX:b.clientX, clientY:b.clientY, pageX:b.pageX, pageY:b.pageY, target:a});
    });
  }
  function g(a, b) {
    switch(a) {
      case bot.events.TouchEventStrategy_.MOUSE_EVENTS:
        return d(b);
      case bot.events.TouchEventStrategy_.INIT_TOUCH_EVENT:
        return c(b);
      case bot.events.TouchEventStrategy_.TOUCH_EVENT_CTOR:
        return f(b);
    }
    return null;
  }
  if (!bot.events.SUPPORTS_TOUCH_EVENTS) {
    throw new bot.Error(bot.ErrorCode.UNSUPPORTED_OPERATION, "Browser does not support firing touch events.");
  }
  var h = goog.dom.getOwnerDocument(a), k = goog.dom.getWindow(h);
  if (bot.events.BROKEN_TOUCH_API_) {
    var m = bot.events.TouchEventStrategy_.MOUSE_EVENTS;
  } else {
    if (TouchEvent.prototype.initTouchEvent) {
      m = bot.events.TouchEventStrategy_.INIT_TOUCH_EVENT;
    } else {
      if (TouchEvent && 0 < TouchEvent.length) {
        m = bot.events.TouchEventStrategy_.TOUCH_EVENT_CTOR;
      } else {
        throw new bot.Error(bot.ErrorCode.UNSUPPORTED_OPERATION, "Not able to create touch events in this browser");
      }
    }
  }
  var p = g(m, b.changedTouches), r = b.touches == b.changedTouches ? p : g(m, b.touches), l = b.targetTouches == b.changedTouches ? p : g(m, b.targetTouches);
  if (m == bot.events.TouchEventStrategy_.MOUSE_EVENTS) {
    m = h.createEvent("MouseEvents"), m.initMouseEvent(this.type_, this.bubbles_, this.cancelable_, k, 1, 0, 0, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, 0, b.relatedTarget), m.touches = r, m.targetTouches = l, m.changedTouches = p, m.scale = b.scale, m.rotation = b.rotation;
  } else {
    if (m == bot.events.TouchEventStrategy_.INIT_TOUCH_EVENT) {
      m = h.createEvent("TouchEvent"), 0 == m.initTouchEvent.length ? m.initTouchEvent(r, l, p, this.type_, k, 0, 0, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey) : m.initTouchEvent(this.type_, this.bubbles_, this.cancelable_, k, 1, 0, 0, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, r, l, p, b.scale, b.rotation), m.relatedTarget = b.relatedTarget;
    } else {
      if (m == bot.events.TouchEventStrategy_.TOUCH_EVENT_CTOR) {
        m = new TouchEvent(this.type_, {touches:r, targetTouches:l, changedTouches:p, bubbles:this.bubbles_, cancelable:this.cancelable_, ctrlKey:b.ctrlKey, shiftKey:b.shiftKey, altKey:b.altKey, metaKey:b.metaKey});
      } else {
        throw new bot.Error(bot.ErrorCode.UNSUPPORTED_OPERATION, "Illegal TouchEventStrategy_ value (this is a bug)");
      }
    }
  }
  return m;
};
bot.events.MSGestureEventFactory_ = function(a, b, c) {
  bot.events.EventFactory_.call(this, a, b, c);
};
goog.inherits(bot.events.MSGestureEventFactory_, bot.events.EventFactory_);
bot.events.MSGestureEventFactory_.prototype.create = function(a, b) {
  if (!bot.events.SUPPORTS_MSPOINTER_EVENTS) {
    throw new bot.Error(bot.ErrorCode.UNSUPPORTED_OPERATION, "Browser does not support MSGesture events.");
  }
  var c = goog.dom.getOwnerDocument(a);
  a = goog.dom.getWindow(c);
  var c = c.createEvent("MSGestureEvent"), d = (new Date).getTime();
  c.initGestureEvent(this.type_, this.bubbles_, this.cancelable_, a, 1, 0, 0, b.clientX, b.clientY, 0, 0, b.translationX, b.translationY, b.scale, b.expansion, b.rotation, b.velocityX, b.velocityY, b.velocityExpansion, b.velocityAngular, d, b.relatedTarget);
  return c;
};
bot.events.MSPointerEventFactory_ = function(a, b, c) {
  bot.events.EventFactory_.call(this, a, b, c);
};
goog.inherits(bot.events.MSPointerEventFactory_, bot.events.EventFactory_);
bot.events.MSPointerEventFactory_.prototype.create = function(a, b) {
  if (!bot.events.SUPPORTS_MSPOINTER_EVENTS) {
    throw new bot.Error(bot.ErrorCode.UNSUPPORTED_OPERATION, "Browser does not support MSPointer events.");
  }
  var c = goog.dom.getOwnerDocument(a);
  a = goog.dom.getWindow(c);
  c = c.createEvent("MSPointerEvent");
  c.initPointerEvent(this.type_, this.bubbles_, this.cancelable_, a, 0, 0, 0, b.clientX, b.clientY, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, b.relatedTarget, 0, 0, b.width, b.height, b.pressure, b.rotation, b.tiltX, b.tiltY, b.pointerId, b.pointerType, 0, b.isPrimary);
  return c;
};
bot.events.EventType = {BLUR:new bot.events.EventFactory_("blur", !1, !1), CHANGE:new bot.events.EventFactory_("change", !0, !1), FOCUS:new bot.events.EventFactory_("focus", !1, !1), FOCUSIN:new bot.events.EventFactory_("focusin", !0, !1), FOCUSOUT:new bot.events.EventFactory_("focusout", !0, !1), INPUT:new bot.events.EventFactory_("input", !0, !1), ORIENTATIONCHANGE:new bot.events.EventFactory_("orientationchange", !1, !1), PROPERTYCHANGE:new bot.events.EventFactory_("propertychange", !1, !1), SELECT:new bot.events.EventFactory_("select", 
!0, !1), SUBMIT:new bot.events.EventFactory_("submit", !0, !0), TEXTINPUT:new bot.events.EventFactory_("textInput", !0, !0), CLICK:new bot.events.MouseEventFactory_("click", !0, !0), CONTEXTMENU:new bot.events.MouseEventFactory_("contextmenu", !0, !0), DBLCLICK:new bot.events.MouseEventFactory_("dblclick", !0, !0), MOUSEDOWN:new bot.events.MouseEventFactory_("mousedown", !0, !0), MOUSEMOVE:new bot.events.MouseEventFactory_("mousemove", !0, !1), MOUSEOUT:new bot.events.MouseEventFactory_("mouseout", 
!0, !0), MOUSEOVER:new bot.events.MouseEventFactory_("mouseover", !0, !0), MOUSEUP:new bot.events.MouseEventFactory_("mouseup", !0, !0), MOUSEWHEEL:new bot.events.MouseEventFactory_(goog.userAgent.GECKO ? "DOMMouseScroll" : "mousewheel", !0, !0), MOUSEPIXELSCROLL:new bot.events.MouseEventFactory_("MozMousePixelScroll", !0, !0), KEYDOWN:new bot.events.KeyboardEventFactory_("keydown", !0, !0), KEYPRESS:new bot.events.KeyboardEventFactory_("keypress", !0, !0), KEYUP:new bot.events.KeyboardEventFactory_("keyup", 
!0, !0), TOUCHEND:new bot.events.TouchEventFactory_("touchend", !0, !0), TOUCHMOVE:new bot.events.TouchEventFactory_("touchmove", !0, !0), TOUCHSTART:new bot.events.TouchEventFactory_("touchstart", !0, !0), MSGESTURECHANGE:new bot.events.MSGestureEventFactory_("MSGestureChange", !0, !0), MSGESTUREEND:new bot.events.MSGestureEventFactory_("MSGestureEnd", !0, !0), MSGESTUREHOLD:new bot.events.MSGestureEventFactory_("MSGestureHold", !0, !0), MSGESTURESTART:new bot.events.MSGestureEventFactory_("MSGestureStart", 
!0, !0), MSGESTURETAP:new bot.events.MSGestureEventFactory_("MSGestureTap", !0, !0), MSINERTIASTART:new bot.events.MSGestureEventFactory_("MSInertiaStart", !0, !0), MSGOTPOINTERCAPTURE:new bot.events.MSPointerEventFactory_("MSGotPointerCapture", !0, !1), MSLOSTPOINTERCAPTURE:new bot.events.MSPointerEventFactory_("MSLostPointerCapture", !0, !1), MSPOINTERCANCEL:new bot.events.MSPointerEventFactory_("MSPointerCancel", !0, !0), MSPOINTERDOWN:new bot.events.MSPointerEventFactory_("MSPointerDown", !0, 
!0), MSPOINTERMOVE:new bot.events.MSPointerEventFactory_("MSPointerMove", !0, !0), MSPOINTEROVER:new bot.events.MSPointerEventFactory_("MSPointerOver", !0, !0), MSPOINTEROUT:new bot.events.MSPointerEventFactory_("MSPointerOut", !0, !0), MSPOINTERUP:new bot.events.MSPointerEventFactory_("MSPointerUp", !0, !0)};
bot.events.fire = function(a, b, c) {
  c = b.create(a, c);
  "isTrusted" in c || (c.isTrusted = !1);
  return bot.userAgent.IE_DOC_PRE9 && a.fireEvent ? a.fireEvent("on" + b.type_, c) : a.dispatchEvent(c);
};
bot.events.isSynthetic = function(a) {
  a = a.getBrowserEvent ? a.getBrowserEvent() : a;
  return "isTrusted" in a ? !a.isTrusted : !1;
};
fxdriver.profiler = {};
fxdriver.profiler.log = function(a) {
  fxdriver.logging.log(fxdriver.logging.LogType.PROFILER, webdriver.logging.Level.INFO, a);
};
fxdriver.proxy = {};
fxdriver.proxy.ProxyConfig = {};
fxdriver.proxy.LOG_ = fxdriver.logging.getLogger("fxdriver.proxy");
fxdriver.proxy.splitHostPort_ = function(a) {
  var b = a.lastIndexOf(":");
  if (0 > b || a.indexOf(":") != b && !a.includes("[")) {
    return {host:a, port:null};
  }
  var c = a.slice(0, b);
  c.startsWith("[") && c.endsWith("]") && (c = c.slice(1, -1));
  a = a.slice(b + 1);
  return {host:c, port:parseInt(a, 10)};
};
fxdriver.proxy.setProxyPreference_ = function(a, b, c) {
  if (c) {
    c = fxdriver.proxy.splitHostPort_(c);
    var d = c.port;
    a.setCharPref("network.proxy." + b, c.host);
    null != d && a.setIntPref("network.proxy." + b + "_port", d);
  }
};
fxdriver.proxy.directConfig_ = function(a, b) {
  goog.log.info(fxdriver.proxy.LOG_, "Using a direct connection to the network");
  a.setIntPref("network.proxy.type", fxdriver.proxy.TYPES_.DIRECT.value);
};
fxdriver.proxy.pacConfig_ = function(a, b) {
  goog.log.info(fxdriver.proxy.LOG_, "Using a PAC file to connect to the network: " + b.proxyAutoconfigUrl);
  a.setIntPref("network.proxy.type", fxdriver.proxy.TYPES_.PAC.value);
  b = fxdriver.moz.getService("@mozilla.org/docshell/urifixup;1", "nsIURIFixup").createFixupURI(b.proxyAutoconfigUrl, 0).spec;
  a.setCharPref("network.proxy.autoconfig_url", b);
};
fxdriver.proxy.manualProxyConfig_ = function(a, b) {
  goog.log.info(fxdriver.proxy.LOG_, "Using manual network config");
  a.setIntPref("network.proxy.type", fxdriver.proxy.TYPES_.MANUAL.value);
  fxdriver.proxy.setProxyPreference_(a, "ftp", b.ftpProxy);
  fxdriver.proxy.setProxyPreference_(a, "http", b.httpProxy);
  fxdriver.proxy.setProxyPreference_(a, "ssl", b.sslProxy);
  fxdriver.proxy.setProxyPreference_(a, "socks", b.socksProxy);
  b.noProxy ? a.setCharPref("network.proxy.no_proxies_on", b.noProxy) : a.setCharPref("network.proxy.no_proxies_on", "");
};
fxdriver.proxy.autodetectConfig_ = function(a, b) {
  goog.log.info(fxdriver.proxy.LOG_, "Autodetecting proxy to use");
  a.setIntPref("network.proxy.type", fxdriver.proxy.TYPES_.AUTODETECT.value);
};
fxdriver.proxy.systemConfig_ = function(a, b) {
  goog.log.info(fxdriver.proxy.LOG_, "Using system proxy to connect to the network");
  a.setIntPref("network.proxy.type", fxdriver.proxy.TYPES_.SYSTEM.value);
};
fxdriver.proxy.TYPES_ = {DIRECT:{value:0, config:fxdriver.proxy.directConfig_}, MANUAL:{value:1, config:fxdriver.proxy.manualProxyConfig_}, PAC:{value:2, config:fxdriver.proxy.pacConfig_}, AUTODETECT:{value:4, config:fxdriver.proxy.autodetectConfig_}, SYSTEM:{value:5, config:fxdriver.proxy.systemConfig_}};
fxdriver.proxy.configure_ = function(a) {
  if (a) {
    goog.isString(a) && (a = JSON.parse(a));
    var b = fxdriver.proxy.TYPES_[(a.proxyType || "").toUpperCase()];
    if (b) {
      var c = fxdriver.moz.getService("@mozilla.org/preferences-service;1", "nsIPrefBranch");
      b.config(c, a);
    } else {
      goog.log.info(fxdriver.proxy.LOG_, "Using Firefox default for network connection");
    }
  }
};
fxdriver.proxy.configure = function(a) {
  try {
    fxdriver.proxy.configure_(a);
  } catch (b) {
    goog.log.info(fxdriver.proxy.LOG_, "Unable to configure proxy", b);
  }
};
fxdriver.screenshot = {};
fxdriver.screenshot.grab = function(a) {
  var b = a.document, c = b.documentElement;
  if (!c) {
    throw Error("Page is not loaded yet, try later");
  }
  var d = b.getElementById("fxdriver-screenshot-canvas");
  null == d && (d = b.createElement("canvas"), d.id = "fxdriver-screenshot-canvas", d.style.display = "none", c.appendChild(d));
  var f = c.scrollWidth;
  b.body && b.body.scrollWidth > f && (f = b.body.scrollWidth);
  c = c.scrollHeight;
  b.body && b.body.scrollHeight > c && (c = b.body.scrollHeight);
  32767 <= f && (f = 32766);
  32767 <= c && (c = 32766);
  d.width = f;
  d.height = c;
  try {
    var g = d.getContext("2d");
  } catch (h) {
    throw Error("Unable to get context - " + h);
  }
  try {
    g.drawWindow(a, 0, 0, f, c, "rgb(255,255,255)");
  } catch (h) {
    throw Error("Unable to draw window - " + h);
  }
  return d;
};
fxdriver.screenshot.toBase64 = function(a) {
  try {
    var b = a.toDataURL("image/png");
  } catch (c) {
    throw Error("Unable to load canvas into base64 string - " + c);
  }
  a = b.indexOf("base64,");
  if (-1 == a) {
    throw Error("Invalid base64 data: " + b);
  }
  try {
    return b.substring(a + 7);
  } catch (c) {
    throw Error("Unable to get data from base64 string - " + c);
  }
};
fxdriver.screenshot.save = function(a, b) {
  var c = a.toDataURL("image/png");
  a = CC["@mozilla.org/network/io-service;1"].getService(CI.nsIIOService);
  c = a.newURI(c, "UTF-8", null);
  c = a.newChannelFromURI(c);
  a = CC["@mozilla.org/file/local;1"].createInstance(CI.nsILocalFile);
  a.initWithPath(b);
  c = c.open();
  b = CC["@mozilla.org/binaryinputstream;1"].createInstance(CI.nsIBinaryInputStream);
  b.setInputStream(c);
  c = CC["@mozilla.org/network/safe-file-output-stream;1"].createInstance(CI.nsIFileOutputStream);
  c.init(a, -1, -1, null);
  a = b.available();
  b = b.readBytes(a);
  c.write(b, a);
  c instanceof CI.nsISafeOutputStream ? c.finish() : c.close();
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
var wdSession = function() {
  this.wrappedJSObject = this;
};
wdSession.LOG_ = fxdriver.logging.getLogger("fxdriver.wdSession");
wdSession.CLASS_ID = Components.ID("{e193dc71-5b1d-4fea-b4c2-ec71f4557f0f}");
wdSession.CLASS_NAME = "wdSession";
wdSession.CONTRACT_ID = "@googlecode.com/webdriver/wdsession;1";
wdSession.prototype.id_ = null;
wdSession.prototype.chromeWindow_ = null;
wdSession.prototype.window_ = null;
wdSession.prototype.frame_ = null;
wdSession.prototype.inputSpeed_ = 1;
wdSession.prototype.implicitWait_ = 0;
wdSession.prototype.pageLoadTimeout_ = -1;
wdSession.prototype.waitForPageLoad_ = !0;
wdSession.prototype.mousePosition_ = {x:0, y:0, viewPortXOffset:0, viewPortYOffset:0, initialized:!1, pressed:!1};
wdSession.prototype.scriptTimeout_ = 0;
wdSession.prototype.elementScrollBehavior = 0;
wdSession.prototype.QueryInterface = function(a) {
  if (a.equals(Components.interfaces.nsISupports)) {
    return this;
  }
  throw Components.results.NS_ERROR_NO_INTERFACE;
};
wdSession.prototype.getId = function() {
  return this.id_;
};
wdSession.prototype.setId = function(a) {
  this.id_ = a;
};
wdSession.prototype.getBrowser = function() {
  return this.chromeWindow_.getBrowser();
};
wdSession.prototype.getChromeWindow = function() {
  return this.chromeWindow_;
};
wdSession.prototype.getWindow = function() {
  try {
    if (this.frame_) {
      var a = this.frame_.get();
      if (a) {
        var b = a.contentWindow;
      }
    }
  } catch (c) {
    goog.log.error(wdSession.LOG_, "Failed to get frame contentWindow", c);
  }
  if (!b) {
    try {
      this.window_ && (b = this.window_.get());
    } catch (c) {
      goog.log.error(wdSession.LOG_, "Failed to get window", c);
    }
  }
  b && b.document || (goog.log.error(wdSession.LOG_, "Lost DOM in window " + b), b = this.chromeWindow_.getBrowser().contentWindow, this.setWindow(b));
  return b;
};
wdSession.prototype.getTopWindow = function() {
  return this.getWindow().top;
};
wdSession.prototype.getDocument = function() {
  return this.getWindow().document;
};
wdSession.prototype.getTopDocument = function() {
  return this.getTopWindow().document;
};
wdSession.prototype.setChromeWindow = function(a) {
  this.chromeWindow_ = a;
  this.setWindow(a.getBrowser().contentWindow);
};
wdSession.prototype.setWindow = function(a) {
  this.frame_ = null;
  this.window_ = Components.utils.getWeakReference(a);
  var b = this;
  a.addEventListener("unload", function(c) {
    a == a.top && (b.window_ = null);
  }, !0);
};
wdSession.prototype.setFrame = function(a) {
  this.frame_ = Components.utils.getWeakReference(a);
};
wdSession.prototype.getInputSpeed = function() {
  return this.inputSpeed_;
};
wdSession.prototype.setInputSpeed = function(a) {
  this.inputSpeed_ = a;
};
wdSession.prototype.getImplicitWait = function() {
  return this.implicitWait_;
};
wdSession.prototype.setImplicitWait = function(a) {
  this.implicitWait_ = Math.max(a, 0);
};
wdSession.prototype.getPageLoadTimeout = function() {
  return this.pageLoadTimeout_;
};
wdSession.prototype.setPageLoadTimeout = function(a) {
  this.pageLoadTimeout_ = a;
};
wdSession.prototype.getWaitForPageLoad = function() {
  return this.waitForPageLoad_;
};
wdSession.prototype.setWaitForPageLoad = function(a) {
  this.waitForPageLoad_ = a;
  goog.log.info(wdSession.LOG_, "setWaitForPageLoad " + a);
};
wdSession.prototype.getScriptTimeout = function() {
  return this.scriptTimeout_;
};
wdSession.prototype.setScriptTimeout = function(a) {
  this.scriptTimeout_ = Math.max(a, 0);
};
wdSession.prototype.getMousePosition = function() {
  var a = {}, b;
  for (b in this.mousePosition_) {
    a[b] = this.mousePosition_[b];
  }
  return a;
};
wdSession.prototype.setMousePosition = function(a, b) {
  this.mousePosition_.x = a;
  this.mousePosition_.y = b;
  this.mousePosition_.initialized = !0;
};
wdSession.prototype.isMousePressed = function() {
  return this.mousePosition_.pressed;
};
wdSession.prototype.setMousePressed = function(a) {
  this.mousePosition_.pressed = a;
};
wdSession.prototype.setMouseViewportOffset = function(a, b) {
  this.mousePosition_.viewPortXOffset = a;
  this.mousePosition_.viewPortYOffset = b;
};
wdSession.quitBrowser = function(a) {
  wdSession.quitTimer = new fxdriver.Timer;
  wdSession.quitTimer.setTimeout(function(a) {
    Components.classes["@mozilla.org/toolkit/app-startup;1"].getService(Components.interfaces.nsIAppStartup).quit(Components.interfaces.nsIAppStartup.eForceQuit);
  }, a);
  return wdSession.quitTimer;
};
function wdSessionFactory() {
}
wdSessionFactory.prototype.createInstance = function(a, b) {
  if (null != a) {
    throw Components.results.NS_ERROR_NO_AGGREGATION;
  }
  return (new wdSession).QueryInterface(b);
};
function wdSessionModule() {
}
wdSessionModule.prototype.hasRegistered_ = !1;
wdSessionModule.prototype.registerSelf = function(a, b, c, d) {
  if (this.hasRegistered_) {
    throw Components.results.NS_ERROR_FACTORY_REGISTER_AGAIN;
  }
  a.QueryInterface(Components.interfaces.nsIComponentRegistrar).registerFactoryLocation(wdSession.CLASS_ID, wdSession.CLASS_NAME, wdSession.CONTRACT_ID, b, c, d);
  this.hasRegistered_ = !0;
};
wdSessionModule.prototype.unregisterSelf = function(a, b) {
  a.QueryInterface(Components.interfaces.nsIComponentRegistrar).unregisterFactoryLocation(wdSession.CLASS_ID, b);
};
wdSessionModule.prototype.getClassObject = function(a, b, c) {
  if (!c.equals(Components.interfaces.nsIFactory)) {
    throw Components.results.NS_ERROR_NOT_IMPLEMENTED;
  }
  if (!b.equals(wdSession.CLASS_ID)) {
    throw Components.results.NS_ERROR_NO_INTERFACE;
  }
  return new wdSessionFactory;
};
wdSessionModule.prototype.canUnload = function() {
  return !0;
};
NSGetModule = function() {
  return new wdSessionModule;
};
wdSession.prototype.classID = wdSession.CLASS_ID;
fxdriver.moz.load("resource://gre/modules/XPCOMUtils.jsm");
XPCOMUtils.generateNSGetFactory && (NSGetFactory = XPCOMUtils.generateNSGetFactory([wdSession]));
webdriver.atoms = {};
webdriver.atoms.element = {};
webdriver.atoms.element.attribute = {};
var module$contents$webdriver$atoms$element$attribute_PROPERTY_ALIASES = {"class":"className", readonly:"readOnly"}, module$contents$webdriver$atoms$element$attribute_BOOLEAN_PROPERTIES = "allowfullscreen allowpaymentrequest allowusermedia async autofocus autoplay checked compact complete controls declare default defaultchecked defaultselected defer disabled ended formnovalidate hidden indeterminate iscontenteditable ismap itemscope loop multiple muted nohref nomodule noresize noshade novalidate nowrap open paused playsinline pubdate readonly required reversed scoped seamless seeking selected truespeed typemustmatch willvalidate".split(" ");
webdriver.atoms.element.attribute.get = function(a, b) {
  var c = b.toLowerCase();
  if ("style" == c) {
    return (b = a.style) && !goog.isString(b) && (b = b.cssText), b;
  }
  if (("selected" == c || "checked" == c) && bot.dom.core.isSelectable(a)) {
    return bot.dom.core.isSelected(a) ? "true" : null;
  }
  var d = bot.dom.core.isElement(a, "A");
  if (bot.dom.core.isElement(a, "IMG") && "src" == c || d && "href" == c) {
    return (b = bot.dom.core.getAttribute(a, c)) && (b = bot.dom.core.getProperty(a, c)), b;
  }
  if ("spellcheck" == c) {
    b = bot.dom.core.getAttribute(a, c);
    if (!goog.isNull(b)) {
      if ("false" == b.toLowerCase()) {
        return "false";
      }
      if ("true" == b.toLowerCase()) {
        return "true";
      }
    }
    return bot.dom.core.getProperty(a, c) + "";
  }
  d = module$contents$webdriver$atoms$element$attribute_PROPERTY_ALIASES[b] || b;
  if (goog.array.contains(module$contents$webdriver$atoms$element$attribute_BOOLEAN_PROPERTIES, c)) {
    return (b = !goog.isNull(bot.dom.core.getAttribute(a, b)) || bot.dom.core.getProperty(a, d)) ? "true" : null;
  }
  try {
    var f = bot.dom.core.getProperty(a, d);
  } catch (g) {
  }
  b = !goog.isDefAndNotNull(f) || goog.isObject(f) ? bot.dom.core.getAttribute(a, b) : f;
  return goog.isDefAndNotNull(b) ? b.toString() : null;
};
wgxpath.Expr = function(a) {
  this.dataType_ = a;
  this.needContextNode_ = this.needContextPosition_ = !1;
  this.quickAttr_ = null;
};
wgxpath.Expr.indent = function(a) {
  return "\n  " + a.toString().split("\n").join("\n  ");
};
wgxpath.Expr.prototype.evaluate = goog.abstractMethod;
wgxpath.Expr.prototype.toString = goog.abstractMethod;
wgxpath.Expr.prototype.getDataType = function() {
  return this.dataType_;
};
wgxpath.Expr.prototype.doesNeedContextPosition = function() {
  return this.needContextPosition_;
};
wgxpath.Expr.prototype.setNeedContextPosition = function(a) {
  this.needContextPosition_ = a;
};
wgxpath.Expr.prototype.doesNeedContextNode = function() {
  return this.needContextNode_;
};
wgxpath.Expr.prototype.setNeedContextNode = function(a) {
  this.needContextNode_ = a;
};
wgxpath.Expr.prototype.getQuickAttr = function() {
  return this.quickAttr_;
};
wgxpath.Expr.prototype.setQuickAttr = function(a) {
  this.quickAttr_ = a;
};
wgxpath.Expr.prototype.asNumber = function(a) {
  a = this.evaluate(a);
  return a instanceof wgxpath.NodeSet ? a.number() : +a;
};
wgxpath.Expr.prototype.asString = function(a) {
  a = this.evaluate(a);
  return a instanceof wgxpath.NodeSet ? a.string() : "" + a;
};
wgxpath.Expr.prototype.asBool = function(a) {
  a = this.evaluate(a);
  return a instanceof wgxpath.NodeSet ? !!a.getLength() : !!a;
};
bot.window = {};
bot.window.HISTORY_LENGTH_INCLUDES_NEW_PAGE_ = !goog.userAgent.IE;
bot.window.HISTORY_LENGTH_INCLUDES_FORWARD_PAGES_ = !goog.userAgent.WEBKIT || bot.userAgent.isEngineVersion("533");
bot.window.Orientation = {PORTRAIT:"portrait-primary", PORTRAIT_SECONDARY:"portrait-secondary", LANDSCAPE:"landscape-primary", LANDSCAPE_SECONDARY:"landscape-secondary"};
bot.window.getOrientationDegrees_ = function() {
  var a;
  return function(b) {
    a || (a = {}, goog.userAgent.MOBILE ? (a[bot.window.Orientation.PORTRAIT] = 0, a[bot.window.Orientation.LANDSCAPE] = 90, a[bot.window.Orientation.LANDSCAPE_SECONDARY] = -90, goog.userAgent.product.IPAD && (a[bot.window.Orientation.PORTRAIT_SECONDARY] = 180)) : goog.userAgent.product.ANDROID && (a[bot.window.Orientation.PORTRAIT] = -90, a[bot.window.Orientation.LANDSCAPE] = 0, a[bot.window.Orientation.PORTRAIT_SECONDARY] = 90, a[bot.window.Orientation.LANDSCAPE_SECONDARY] = 180));
    return a[b];
  };
}();
bot.window.back = function(a) {
  var b = bot.window.HISTORY_LENGTH_INCLUDES_NEW_PAGE_ ? bot.getWindow().history.length - 1 : bot.getWindow().history.length;
  a = bot.window.checkNumPages_(b, a);
  bot.getWindow().history.go(-a);
};
bot.window.forward = function(a) {
  var b = bot.window.HISTORY_LENGTH_INCLUDES_FORWARD_PAGES_ ? bot.getWindow().history.length - 1 : null;
  a = bot.window.checkNumPages_(b, a);
  bot.getWindow().history.go(a);
};
bot.window.checkNumPages_ = function(a, b) {
  b = goog.isDef(b) ? b : 1;
  if (0 >= b) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "number of pages must be positive");
  }
  if (null !== a && b > a) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "number of pages must be less than the length of the browser history");
  }
  return b;
};
bot.window.getInteractableSize = function(a) {
  var b = (a || bot.getWindow()).document;
  a = b.documentElement;
  var c = b.body;
  if (!c) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "No BODY element present");
  }
  b = [a.clientHeight, a.scrollHeight, a.offsetHeight, c.scrollHeight, c.offsetHeight];
  a = Math.max.apply(null, [a.clientWidth, a.scrollWidth, a.offsetWidth, c.scrollWidth, c.offsetWidth]);
  b = Math.max.apply(null, b);
  return new goog.math.Size(a, b);
};
bot.window.getFrame_ = function(a) {
  try {
    return a.frameElement;
  } catch (b) {
    return null;
  }
};
bot.window.getSize = function(a) {
  a = a || bot.getWindow();
  var b = bot.window.getFrame_(a);
  if (bot.userAgent.ANDROID_PRE_ICECREAMSANDWICH) {
    return b ? (a = goog.style.getBorderBox(b), new goog.math.Size(b.clientWidth - a.left - a.right, b.clientHeight)) : new goog.math.Size(320, 240);
  }
  if (b) {
    return new goog.math.Size(b.clientWidth, b.clientHeight);
  }
  var b = a.document.documentElement, c = a.document.body;
  return new goog.math.Size(a.outerWidth || b && b.clientWidth || c && c.clientWidth || 0, a.outerHeight || b && b.clientHeight || c && c.clientHeight || 0);
};
bot.window.setSize = function(a, b) {
  b = b || bot.getWindow();
  var c = bot.window.getFrame_(b);
  c ? (c.style.minHeight = "0px", c.style.minWidth = "0px", c.width = a.width + "px", c.style.width = a.width + "px", c.height = a.height + "px", c.style.height = a.height + "px") : b.resizeTo(a.width, a.height);
};
bot.window.getScroll = function(a) {
  a = a || bot.getWindow();
  return (new goog.dom.DomHelper(a.document)).getDocumentScroll();
};
bot.window.setScroll = function(a, b) {
  (b || bot.getWindow()).scrollTo(a.x, a.y);
};
bot.window.getPosition = function(a) {
  var b = a || bot.getWindow();
  goog.userAgent.IE ? (a = b.screenLeft, b = b.screenTop) : (a = b.screenX, b = b.screenY);
  return new goog.math.Coordinate(a, b);
};
bot.window.setPosition = function(a, b) {
  (b || bot.getWindow()).moveTo(a.x, a.y);
};
bot.window.scrollIntoView = function(a, b) {
  function c(a, b, c) {
    return a < b ? a : a >= b + c ? a - c + 1 : b;
  }
  b = b || bot.getWindow();
  var d = goog.dom.getViewportSize(b), f = bot.window.getScroll(b);
  a = new goog.math.Coordinate(c(a.x, f.x, d.width), c(a.y, f.y, d.height));
  goog.math.Coordinate.equals(a, f) || bot.window.setScroll(a, b);
  if (!goog.math.Coordinate.equals(a, bot.window.getScroll(b))) {
    throw new bot.Error(bot.ErrorCode.MOVE_TARGET_OUT_OF_BOUNDS, "The target scroll location " + a + " is not on the page.");
  }
};
bot.window.getCurrentOrientationDegrees_ = function() {
  var a = bot.getWindow();
  goog.isDef(a.orientation) || (a.orientation = 0);
  return a.orientation;
};
bot.window.changeOrientation = function(a) {
  var b = bot.getWindow(), c = bot.window.getCurrentOrientationDegrees_(), d = bot.window.getOrientationDegrees_(a);
  if (c != d && goog.isDef(d)) {
    if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
      var f = Object.getOwnPropertyDescriptor(b, "orientation");
      f && f.configurable && Object.defineProperty(b, "orientation", {configurable:!0, get:function() {
        return d;
      }});
    }
    bot.events.fire(b, bot.events.EventType.ORIENTATIONCHANGE);
    0 != Math.abs(c - d) % 180 && (c = bot.window.getSize(), b = c.getShortest(), c = c.getLongest(), a == bot.window.Orientation.PORTRAIT || a == bot.window.Orientation.PORTRAIT_SECONDARY ? bot.window.setSize(new goog.math.Size(b, c)) : bot.window.setSize(new goog.math.Size(c, b)));
  }
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
  fxdriver.modals.isModalPresent(function(f) {
    var g = "Unexpected modal dialog (text: " + d + ")";
    if (f) {
      try {
        c ? fxdriver.modals.acceptAlert(b) : fxdriver.modals.dismissAlert(b);
      } catch (h) {
        g += " The alert could not be closed. The browser may be in a wildly inconsistent state, and the alert may still be open. This is not good. If you can reliably reproduce this, please report a new issue at https://github.com/SeleniumHQ/selenium/issues with reproduction steps. Exception message: " + h;
      }
    } else {
      g += " The alert disappeared before it could be closed.";
    }
    a.sendError(new WebDriverError(bot.ErrorCode.UNEXPECTED_ALERT_OPEN, g, {alert:{text:d}}));
  }, 2000);
};
wgxpath.BinaryExpr = function(a, b, c) {
  wgxpath.Expr.call(this, a.dataType_);
  this.op_ = a;
  this.left_ = b;
  this.right_ = c;
  this.setNeedContextPosition(b.doesNeedContextPosition() || c.doesNeedContextPosition());
  this.setNeedContextNode(b.doesNeedContextNode() || c.doesNeedContextNode());
  this.op_ == wgxpath.BinaryExpr.Op.EQUAL && (c.doesNeedContextNode() || c.doesNeedContextPosition() || c.getDataType() == wgxpath.DataType.NODESET || c.getDataType() == wgxpath.DataType.VOID || !b.getQuickAttr() ? b.doesNeedContextNode() || b.doesNeedContextPosition() || b.getDataType() == wgxpath.DataType.NODESET || b.getDataType() == wgxpath.DataType.VOID || !c.getQuickAttr() || this.setQuickAttr({name:c.getQuickAttr().name, valueExpr:b}) : this.setQuickAttr({name:b.getQuickAttr().name, valueExpr:c}));
};
goog.inherits(wgxpath.BinaryExpr, wgxpath.Expr);
wgxpath.BinaryExpr.compare_ = function(a, b, c, d, f) {
  b = b.evaluate(d);
  c = c.evaluate(d);
  var g;
  if (b instanceof wgxpath.NodeSet && c instanceof wgxpath.NodeSet) {
    b = b.iterator();
    for (d = b.next(); d; d = b.next()) {
      for (f = c.iterator(), g = f.next(); g; g = f.next()) {
        if (a(wgxpath.Node.getValueAsString(d), wgxpath.Node.getValueAsString(g))) {
          return !0;
        }
      }
    }
    return !1;
  }
  if (b instanceof wgxpath.NodeSet || c instanceof wgxpath.NodeSet) {
    b instanceof wgxpath.NodeSet ? (f = b, d = c) : (f = c, d = b);
    g = f.iterator();
    for (var h = typeof d, k = g.next(); k; k = g.next()) {
      switch(h) {
        case "number":
          k = wgxpath.Node.getValueAsNumber(k);
          break;
        case "boolean":
          k = wgxpath.Node.getValueAsBool(k);
          break;
        case "string":
          k = wgxpath.Node.getValueAsString(k);
          break;
        default:
          throw Error("Illegal primitive type for comparison.");
      }
      if (f == b && a(k, d) || f == c && a(d, k)) {
        return !0;
      }
    }
    return !1;
  }
  return f ? "boolean" == typeof b || "boolean" == typeof c ? a(!!b, !!c) : "number" == typeof b || "number" == typeof c ? a(+b, +c) : a(b, c) : a(+b, +c);
};
wgxpath.BinaryExpr.prototype.evaluate = function(a) {
  return this.op_.evaluate_(this.left_, this.right_, a);
};
wgxpath.BinaryExpr.prototype.toString = function() {
  var a = "Binary Expression: " + this.op_, a = a + wgxpath.Expr.indent(this.left_);
  return a += wgxpath.Expr.indent(this.right_);
};
wgxpath.BinaryExpr.Op_ = function(a, b, c, d) {
  this.opString_ = a;
  this.precedence_ = b;
  this.dataType_ = c;
  this.evaluate_ = d;
};
wgxpath.BinaryExpr.Op_.prototype.getPrecedence = function() {
  return this.precedence_;
};
wgxpath.BinaryExpr.Op_.prototype.toString = function() {
  return this.opString_;
};
wgxpath.BinaryExpr.stringToOpMap_ = {};
wgxpath.BinaryExpr.createOp_ = function(a, b, c, d) {
  if (wgxpath.BinaryExpr.stringToOpMap_.hasOwnProperty(a)) {
    throw Error("Binary operator already created: " + a);
  }
  a = new wgxpath.BinaryExpr.Op_(a, b, c, d);
  return wgxpath.BinaryExpr.stringToOpMap_[a.toString()] = a;
};
wgxpath.BinaryExpr.getOp = function(a) {
  return wgxpath.BinaryExpr.stringToOpMap_[a] || null;
};
wgxpath.BinaryExpr.Op = {DIV:wgxpath.BinaryExpr.createOp_("div", 6, wgxpath.DataType.NUMBER, function(a, b, c) {
  return a.asNumber(c) / b.asNumber(c);
}), MOD:wgxpath.BinaryExpr.createOp_("mod", 6, wgxpath.DataType.NUMBER, function(a, b, c) {
  return a.asNumber(c) % b.asNumber(c);
}), MULT:wgxpath.BinaryExpr.createOp_("*", 6, wgxpath.DataType.NUMBER, function(a, b, c) {
  return a.asNumber(c) * b.asNumber(c);
}), PLUS:wgxpath.BinaryExpr.createOp_("+", 5, wgxpath.DataType.NUMBER, function(a, b, c) {
  return a.asNumber(c) + b.asNumber(c);
}), MINUS:wgxpath.BinaryExpr.createOp_("-", 5, wgxpath.DataType.NUMBER, function(a, b, c) {
  return a.asNumber(c) - b.asNumber(c);
}), LESSTHAN:wgxpath.BinaryExpr.createOp_("<", 4, wgxpath.DataType.BOOLEAN, function(a, b, c) {
  return wgxpath.BinaryExpr.compare_(function(a, b) {
    return a < b;
  }, a, b, c);
}), GREATERTHAN:wgxpath.BinaryExpr.createOp_(">", 4, wgxpath.DataType.BOOLEAN, function(a, b, c) {
  return wgxpath.BinaryExpr.compare_(function(a, b) {
    return a > b;
  }, a, b, c);
}), LESSTHAN_EQUAL:wgxpath.BinaryExpr.createOp_("<=", 4, wgxpath.DataType.BOOLEAN, function(a, b, c) {
  return wgxpath.BinaryExpr.compare_(function(a, b) {
    return a <= b;
  }, a, b, c);
}), GREATERTHAN_EQUAL:wgxpath.BinaryExpr.createOp_(">=", 4, wgxpath.DataType.BOOLEAN, function(a, b, c) {
  return wgxpath.BinaryExpr.compare_(function(a, b) {
    return a >= b;
  }, a, b, c);
}), EQUAL:wgxpath.BinaryExpr.createOp_("=", 3, wgxpath.DataType.BOOLEAN, function(a, b, c) {
  return wgxpath.BinaryExpr.compare_(function(a, b) {
    return a == b;
  }, a, b, c, !0);
}), NOT_EQUAL:wgxpath.BinaryExpr.createOp_("!=", 3, wgxpath.DataType.BOOLEAN, function(a, b, c) {
  return wgxpath.BinaryExpr.compare_(function(a, b) {
    return a != b;
  }, a, b, c, !0);
}), AND:wgxpath.BinaryExpr.createOp_("and", 2, wgxpath.DataType.BOOLEAN, function(a, b, c) {
  return a.asBool(c) && b.asBool(c);
}), OR:wgxpath.BinaryExpr.createOp_("or", 1, wgxpath.DataType.BOOLEAN, function(a, b, c) {
  return a.asBool(c) || b.asBool(c);
})};
wgxpath.FilterExpr = function(a, b) {
  if (b.getLength() && a.getDataType() != wgxpath.DataType.NODESET) {
    throw Error("Primary expression must evaluate to nodeset if filter has predicate(s).");
  }
  wgxpath.Expr.call(this, a.getDataType());
  this.primary_ = a;
  this.predicates_ = b;
  this.setNeedContextPosition(a.doesNeedContextPosition());
  this.setNeedContextNode(a.doesNeedContextNode());
};
goog.inherits(wgxpath.FilterExpr, wgxpath.Expr);
wgxpath.FilterExpr.prototype.evaluate = function(a) {
  a = this.primary_.evaluate(a);
  return this.predicates_.evaluatePredicates(a);
};
wgxpath.FilterExpr.prototype.toString = function() {
  var a = "Filter:" + wgxpath.Expr.indent(this.primary_);
  return a += wgxpath.Expr.indent(this.predicates_);
};
wgxpath.FunctionCall = function(a, b) {
  if (b.length < a.minArgs_) {
    throw Error("Function " + a.name_ + " expects at least" + a.minArgs_ + " arguments, " + b.length + " given");
  }
  if (!goog.isNull(a.maxArgs_) && b.length > a.maxArgs_) {
    throw Error("Function " + a.name_ + " expects at most " + a.maxArgs_ + " arguments, " + b.length + " given");
  }
  a.nodesetsRequired_ && goog.array.forEach(b, function(b, d) {
    if (b.getDataType() != wgxpath.DataType.NODESET) {
      throw Error("Argument " + d + " to function " + a.name_ + " is not of type Nodeset: " + b);
    }
  });
  wgxpath.Expr.call(this, a.dataType_);
  this.func_ = a;
  this.args_ = b;
  this.setNeedContextPosition(a.needContextPosition_ || goog.array.some(b, function(a) {
    return a.doesNeedContextPosition();
  }));
  this.setNeedContextNode(a.needContextNodeWithoutArgs_ && !b.length || a.needContextNodeWithArgs_ && !!b.length || goog.array.some(b, function(a) {
    return a.doesNeedContextNode();
  }));
};
goog.inherits(wgxpath.FunctionCall, wgxpath.Expr);
wgxpath.FunctionCall.prototype.evaluate = function(a) {
  return this.func_.evaluate_.apply(null, goog.array.concat(a, this.args_));
};
wgxpath.FunctionCall.prototype.toString = function() {
  var a = "Function: " + this.func_;
  if (this.args_.length) {
    var b = goog.array.reduce(this.args_, function(a, b) {
      return a + wgxpath.Expr.indent(b);
    }, "Arguments:"), a = a + wgxpath.Expr.indent(b);
  }
  return a;
};
wgxpath.FunctionCall.Func_ = function(a, b, c, d, f, g, h, k, m) {
  this.name_ = a;
  this.dataType_ = b;
  this.needContextPosition_ = c;
  this.needContextNodeWithoutArgs_ = d;
  this.needContextNodeWithArgs_ = f;
  this.evaluate_ = g;
  this.minArgs_ = h;
  this.maxArgs_ = goog.isDef(k) ? k : h;
  this.nodesetsRequired_ = !!m;
};
wgxpath.FunctionCall.Func_.prototype.toString = function() {
  return this.name_;
};
wgxpath.FunctionCall.nameToFuncMap_ = {};
wgxpath.FunctionCall.createFunc_ = function(a, b, c, d, f, g, h, k, m) {
  if (wgxpath.FunctionCall.nameToFuncMap_.hasOwnProperty(a)) {
    throw Error("Function already created: " + a + ".");
  }
  b = new wgxpath.FunctionCall.Func_(a, b, c, d, f, g, h, k, m);
  return wgxpath.FunctionCall.nameToFuncMap_[a] = b;
};
wgxpath.FunctionCall.getFunc = function(a) {
  return wgxpath.FunctionCall.nameToFuncMap_[a] || null;
};
wgxpath.FunctionCall.Func = {BOOLEAN:wgxpath.FunctionCall.createFunc_("boolean", wgxpath.DataType.BOOLEAN, !1, !1, !1, function(a, b) {
  return b.asBool(a);
}, 1), CEILING:wgxpath.FunctionCall.createFunc_("ceiling", wgxpath.DataType.NUMBER, !1, !1, !1, function(a, b) {
  return Math.ceil(b.asNumber(a));
}, 1), CONCAT:wgxpath.FunctionCall.createFunc_("concat", wgxpath.DataType.STRING, !1, !1, !1, function(a, b) {
  var c = goog.array.slice(arguments, 1);
  return goog.array.reduce(c, function(b, c) {
    return b + c.asString(a);
  }, "");
}, 2, null), CONTAINS:wgxpath.FunctionCall.createFunc_("contains", wgxpath.DataType.BOOLEAN, !1, !1, !1, function(a, b, c) {
  return goog.string.contains(b.asString(a), c.asString(a));
}, 2), COUNT:wgxpath.FunctionCall.createFunc_("count", wgxpath.DataType.NUMBER, !1, !1, !1, function(a, b) {
  return b.evaluate(a).getLength();
}, 1, 1, !0), FALSE:wgxpath.FunctionCall.createFunc_("false", wgxpath.DataType.BOOLEAN, !1, !1, !1, function(a) {
  return !1;
}, 0), FLOOR:wgxpath.FunctionCall.createFunc_("floor", wgxpath.DataType.NUMBER, !1, !1, !1, function(a, b) {
  return Math.floor(b.asNumber(a));
}, 1), ID:wgxpath.FunctionCall.createFunc_("id", wgxpath.DataType.NODESET, !1, !1, !1, function(a, b) {
  function c(a) {
    if (wgxpath.userAgent.IE_DOC_PRE_9) {
      var b = f.all[a];
      if (b) {
        if (b.nodeType && a == b.id) {
          return b;
        }
        if (b.length) {
          return goog.array.find(b, function(b) {
            return a == b.id;
          });
        }
      }
      return null;
    }
    return f.getElementById(a);
  }
  var d = a.getNode(), f = d.nodeType == goog.dom.NodeType.DOCUMENT ? d : d.ownerDocument;
  a = b.asString(a).split(/\s+/);
  var g = [];
  goog.array.forEach(a, function(a) {
    (a = c(a)) && !goog.array.contains(g, a) && g.push(a);
  });
  g.sort(goog.dom.compareNodeOrder);
  var h = new wgxpath.NodeSet;
  goog.array.forEach(g, function(a) {
    h.add(a);
  });
  return h;
}, 1), LANG:wgxpath.FunctionCall.createFunc_("lang", wgxpath.DataType.BOOLEAN, !1, !1, !1, function(a, b) {
  return !1;
}, 1), LAST:wgxpath.FunctionCall.createFunc_("last", wgxpath.DataType.NUMBER, !0, !1, !1, function(a) {
  if (1 != arguments.length) {
    throw Error("Function last expects ()");
  }
  return a.getLast();
}, 0), LOCAL_NAME:wgxpath.FunctionCall.createFunc_("local-name", wgxpath.DataType.STRING, !1, !0, !1, function(a, b) {
  return (a = b ? b.evaluate(a).getFirst() : a.getNode()) ? a.localName || a.nodeName.toLowerCase() : "";
}, 0, 1, !0), NAME:wgxpath.FunctionCall.createFunc_("name", wgxpath.DataType.STRING, !1, !0, !1, function(a, b) {
  return (a = b ? b.evaluate(a).getFirst() : a.getNode()) ? a.nodeName.toLowerCase() : "";
}, 0, 1, !0), NAMESPACE_URI:wgxpath.FunctionCall.createFunc_("namespace-uri", wgxpath.DataType.STRING, !0, !1, !1, function(a, b) {
  return "";
}, 0, 1, !0), NORMALIZE_SPACE:wgxpath.FunctionCall.createFunc_("normalize-space", wgxpath.DataType.STRING, !1, !0, !1, function(a, b) {
  a = b ? b.asString(a) : wgxpath.Node.getValueAsString(a.getNode());
  return goog.string.collapseWhitespace(a);
}, 0, 1), NOT:wgxpath.FunctionCall.createFunc_("not", wgxpath.DataType.BOOLEAN, !1, !1, !1, function(a, b) {
  return !b.asBool(a);
}, 1), NUMBER:wgxpath.FunctionCall.createFunc_("number", wgxpath.DataType.NUMBER, !1, !0, !1, function(a, b) {
  return b ? b.asNumber(a) : wgxpath.Node.getValueAsNumber(a.getNode());
}, 0, 1), POSITION:wgxpath.FunctionCall.createFunc_("position", wgxpath.DataType.NUMBER, !0, !1, !1, function(a) {
  return a.getPosition();
}, 0), ROUND:wgxpath.FunctionCall.createFunc_("round", wgxpath.DataType.NUMBER, !1, !1, !1, function(a, b) {
  return Math.round(b.asNumber(a));
}, 1), STARTS_WITH:wgxpath.FunctionCall.createFunc_("starts-with", wgxpath.DataType.BOOLEAN, !1, !1, !1, function(a, b, c) {
  return goog.string.startsWith(b.asString(a), c.asString(a));
}, 2), STRING:wgxpath.FunctionCall.createFunc_("string", wgxpath.DataType.STRING, !1, !0, !1, function(a, b) {
  return b ? b.asString(a) : wgxpath.Node.getValueAsString(a.getNode());
}, 0, 1), STRING_LENGTH:wgxpath.FunctionCall.createFunc_("string-length", wgxpath.DataType.NUMBER, !1, !0, !1, function(a, b) {
  return (b ? b.asString(a) : wgxpath.Node.getValueAsString(a.getNode())).length;
}, 0, 1), SUBSTRING:wgxpath.FunctionCall.createFunc_("substring", wgxpath.DataType.STRING, !1, !1, !1, function(a, b, c, d) {
  c = c.asNumber(a);
  if (isNaN(c) || Infinity == c || -Infinity == c) {
    return "";
  }
  d = d ? d.asNumber(a) : Infinity;
  if (isNaN(d) || -Infinity === d) {
    return "";
  }
  c = Math.round(c) - 1;
  var f = Math.max(c, 0);
  a = b.asString(a);
  return Infinity == d ? a.substring(f) : a.substring(f, c + Math.round(d));
}, 2, 3), SUBSTRING_AFTER:wgxpath.FunctionCall.createFunc_("substring-after", wgxpath.DataType.STRING, !1, !1, !1, function(a, b, c) {
  b = b.asString(a);
  a = c.asString(a);
  c = b.indexOf(a);
  return -1 == c ? "" : b.substring(c + a.length);
}, 2), SUBSTRING_BEFORE:wgxpath.FunctionCall.createFunc_("substring-before", wgxpath.DataType.STRING, !1, !1, !1, function(a, b, c) {
  b = b.asString(a);
  a = c.asString(a);
  a = b.indexOf(a);
  return -1 == a ? "" : b.substring(0, a);
}, 2), SUM:wgxpath.FunctionCall.createFunc_("sum", wgxpath.DataType.NUMBER, !1, !1, !1, function(a, b) {
  a = b.evaluate(a).iterator();
  b = 0;
  for (var c = a.next(); c; c = a.next()) {
    b += wgxpath.Node.getValueAsNumber(c);
  }
  return b;
}, 1, 1, !0), TRANSLATE:wgxpath.FunctionCall.createFunc_("translate", wgxpath.DataType.STRING, !1, !1, !1, function(a, b, c, d) {
  b = b.asString(a);
  c = c.asString(a);
  var f = d.asString(a);
  d = {};
  for (var g = 0; g < c.length; g++) {
    a = c.charAt(g), a in d || (d[a] = f.charAt(g));
  }
  c = "";
  for (g = 0; g < b.length; g++) {
    a = b.charAt(g), c += a in d ? d[a] : a;
  }
  return c;
}, 3), TRUE:wgxpath.FunctionCall.createFunc_("true", wgxpath.DataType.BOOLEAN, !1, !1, !1, function(a) {
  return !0;
}, 0)};
wgxpath.Literal = function(a) {
  wgxpath.Expr.call(this, wgxpath.DataType.STRING);
  this.text_ = a.substring(1, a.length - 1);
};
goog.inherits(wgxpath.Literal, wgxpath.Expr);
wgxpath.Literal.prototype.evaluate = function(a) {
  return this.text_;
};
wgxpath.Literal.prototype.toString = function() {
  return "Literal: " + this.text_;
};
wgxpath.Number = function(a) {
  wgxpath.Expr.call(this, wgxpath.DataType.NUMBER);
  this.value_ = a;
};
goog.inherits(wgxpath.Number, wgxpath.Expr);
wgxpath.Number.prototype.evaluate = function(a) {
  return this.value_;
};
wgxpath.Number.prototype.toString = function() {
  return "Number: " + this.value_;
};
wgxpath.PathExpr = function(a, b) {
  wgxpath.Expr.call(this, a.getDataType());
  this.filter_ = a;
  this.steps_ = b;
  this.setNeedContextPosition(a.doesNeedContextPosition());
  this.setNeedContextNode(a.doesNeedContextNode());
  1 == this.steps_.length && (a = this.steps_[0], a.doesIncludeDescendants() || a.getAxis() != wgxpath.Step.Axis.ATTRIBUTE || (a = a.getTest(), "*" != a.getName() && this.setQuickAttr({name:a.getName(), valueExpr:null})));
};
goog.inherits(wgxpath.PathExpr, wgxpath.Expr);
wgxpath.PathExpr.RootHelperExpr = function() {
  wgxpath.Expr.call(this, wgxpath.DataType.NODESET);
};
goog.inherits(wgxpath.PathExpr.RootHelperExpr, wgxpath.Expr);
wgxpath.PathExpr.RootHelperExpr.prototype.evaluate = function(a) {
  var b = new wgxpath.NodeSet;
  a = a.getNode();
  a.nodeType == goog.dom.NodeType.DOCUMENT ? b.add(a) : b.add(a.ownerDocument);
  return b;
};
wgxpath.PathExpr.RootHelperExpr.prototype.toString = function() {
  return "Root Helper Expression";
};
wgxpath.PathExpr.ContextHelperExpr = function() {
  wgxpath.Expr.call(this, wgxpath.DataType.NODESET);
};
goog.inherits(wgxpath.PathExpr.ContextHelperExpr, wgxpath.Expr);
wgxpath.PathExpr.ContextHelperExpr.prototype.evaluate = function(a) {
  var b = new wgxpath.NodeSet;
  b.add(a.getNode());
  return b;
};
wgxpath.PathExpr.ContextHelperExpr.prototype.toString = function() {
  return "Context Helper Expression";
};
wgxpath.PathExpr.isValidOp = function(a) {
  return "/" == a || "//" == a;
};
wgxpath.PathExpr.prototype.evaluate = function(a) {
  var b = this.filter_.evaluate(a);
  if (!(b instanceof wgxpath.NodeSet)) {
    throw Error("Filter expression must evaluate to nodeset.");
  }
  a = this.steps_;
  for (var c = 0, d = a.length; c < d && b.getLength(); c++) {
    var f = a[c], g = f.getAxis().isReverse(), g = b.iterator(g);
    if (f.doesNeedContextPosition() || f.getAxis() != wgxpath.Step.Axis.FOLLOWING) {
      if (f.doesNeedContextPosition() || f.getAxis() != wgxpath.Step.Axis.PRECEDING) {
        var h = g.next();
        for (b = f.evaluate(new wgxpath.Context(h)); null != (h = g.next());) {
          h = f.evaluate(new wgxpath.Context(h)), b = wgxpath.NodeSet.merge(b, h);
        }
      } else {
        h = g.next(), b = f.evaluate(new wgxpath.Context(h));
      }
    } else {
      for (h = g.next(); (b = g.next()) && (!h.contains || h.contains(b)) && b.compareDocumentPosition(h) & 8; h = b) {
      }
      b = f.evaluate(new wgxpath.Context(h));
    }
  }
  return b;
};
wgxpath.PathExpr.prototype.toString = function() {
  var a = "Path Expression:" + wgxpath.Expr.indent(this.filter_);
  if (this.steps_.length) {
    var b = goog.array.reduce(this.steps_, function(a, b) {
      return a + wgxpath.Expr.indent(b);
    }, "Steps:");
    a += wgxpath.Expr.indent(b);
  }
  return a;
};
wgxpath.Predicates = function(a, b) {
  this.predicates_ = a;
  this.reverse_ = !!b;
};
wgxpath.Predicates.prototype.evaluatePredicates = function(a, b) {
  for (b = b || 0; b < this.predicates_.length; b++) {
    for (var c = this.predicates_[b], d = a.iterator(), f = a.getLength(), g, h = 0; g = d.next(); h++) {
      var k = this.reverse_ ? f - h : h + 1;
      g = c.evaluate(new wgxpath.Context(g, k, f));
      if ("number" == typeof g) {
        k = k == g;
      } else {
        if ("string" == typeof g || "boolean" == typeof g) {
          k = !!g;
        } else {
          if (g instanceof wgxpath.NodeSet) {
            k = 0 < g.getLength();
          } else {
            throw Error("Predicate.evaluate returned an unexpected type.");
          }
        }
      }
      k || d.remove();
    }
  }
  return a;
};
wgxpath.Predicates.prototype.getQuickAttr = function() {
  return 0 < this.predicates_.length ? this.predicates_[0].getQuickAttr() : null;
};
wgxpath.Predicates.prototype.doesNeedContextPosition = function() {
  for (var a = 0; a < this.predicates_.length; a++) {
    var b = this.predicates_[a];
    if (b.doesNeedContextPosition() || b.getDataType() == wgxpath.DataType.NUMBER || b.getDataType() == wgxpath.DataType.VOID) {
      return !0;
    }
  }
  return !1;
};
wgxpath.Predicates.prototype.getLength = function() {
  return this.predicates_.length;
};
wgxpath.Predicates.prototype.getPredicates = function() {
  return this.predicates_;
};
wgxpath.Predicates.prototype.toString = function() {
  return goog.array.reduce(this.predicates_, function(a, b) {
    return a + wgxpath.Expr.indent(b);
  }, "Predicates:");
};
wgxpath.UnaryExpr = function(a) {
  wgxpath.Expr.call(this, wgxpath.DataType.NUMBER);
  this.expr_ = a;
  this.setNeedContextPosition(a.doesNeedContextPosition());
  this.setNeedContextNode(a.doesNeedContextNode());
};
goog.inherits(wgxpath.UnaryExpr, wgxpath.Expr);
wgxpath.UnaryExpr.prototype.evaluate = function(a) {
  return -this.expr_.asNumber(a);
};
wgxpath.UnaryExpr.prototype.toString = function() {
  return "Unary Expression: -" + wgxpath.Expr.indent(this.expr_);
};
wgxpath.UnionExpr = function(a) {
  wgxpath.Expr.call(this, wgxpath.DataType.NODESET);
  this.paths_ = a;
  this.setNeedContextPosition(goog.array.some(this.paths_, function(a) {
    return a.doesNeedContextPosition();
  }));
  this.setNeedContextNode(goog.array.some(this.paths_, function(a) {
    return a.doesNeedContextNode();
  }));
};
goog.inherits(wgxpath.UnionExpr, wgxpath.Expr);
wgxpath.UnionExpr.prototype.evaluate = function(a) {
  var b = new wgxpath.NodeSet;
  goog.array.forEach(this.paths_, function(c) {
    c = c.evaluate(a);
    if (!(c instanceof wgxpath.NodeSet)) {
      throw Error("Path expression must evaluate to NodeSet.");
    }
    b = wgxpath.NodeSet.merge(b, c);
  });
  return b;
};
wgxpath.UnionExpr.prototype.toString = function() {
  return goog.array.reduce(this.paths_, function(a, b) {
    return a + wgxpath.Expr.indent(b);
  }, "Union Expression:");
};
var wdSessionStoreService = function() {
  this.wrappedJSObject = this;
  this.sessions_ = {};
};
wdSessionStoreService.LOG_ = fxdriver.logging.getLogger("fxdriver.wdSessionStoreService");
wdSessionStoreService.CLASS_ID = Components.ID("{b54195d3-841e-47df-b709-edf1bc4c7166}");
wdSessionStoreService.CLASS_NAME = "wdSessionStoreService";
wdSessionStoreService.CONTRACT_ID = "@googlecode.com/webdriver/wdsessionstoreservice;1";
wdSessionStoreService.prototype.QueryInterface = function(a) {
  if (a.equals(Components.interfaces.nsISupports)) {
    return this;
  }
  throw Components.results.NS_ERROR_NO_INTERFACE;
};
wdSessionStoreService.prototype.createSession = function(a, b, c, d) {
  var f = Components.classes["@mozilla.org/uuid-generator;1"].getService(Components.interfaces.nsIUUIDGenerator).generateUUID().toString(), f = f.substring(1, f.length - 1), g = Components.classes["@googlecode.com/webdriver/wdsession;1"].createInstance(Components.interfaces.nsISupports);
  g.wrappedJSObject.setId(f);
  fxdriver.logging.configure(this.extractCapabilitySetting_("loggingPrefs", b, c), this.extractCapabilitySetting_("webdriver.logging.profiler.enabled", b, c));
  fxdriver.proxy.configure(this.extractCapabilitySetting_("proxy", b, c));
  fxdriver.modals.configure(this.extractCapabilitySetting_("unexpectedAlertBehaviour", b, c));
  this.configure_(a, b, c, d);
  return this.sessions_[f] = g;
};
wdSessionStoreService.prototype.extractCapabilitySetting_ = function(a, b, c) {
  b = b[a];
  c && void 0 !== c[a] && (b = c[a]);
  return b;
};
wdSessionStoreService.READ_ONLY_CAPABILITIES_ = {javascriptEnabled:!0, takesScreenshot:!0, handlesAlerts:!0, cssSelectorsEnabled:!0, rotatable:!1};
wdSessionStoreService.CAPABILITY_PREFERENCE_MAPPING = {webStorageEnabled:"dom.storage.enabled", applicationCacheEnabled:"browser.cache.offline.enable", databaseEnabled:"dom.indexedDB.enabled", elementScrollBehavior:"webdriver.elementScrollBehavior", overlappingCheckDisabled:"webdriver.overlappingCheckDisabled", locationContextEnabled:"geo.enabled", browserConnectionEnabled:"dom.network.enabled", acceptSslCerts:"webdriver_accept_untrusted_certs", pageLoadingStrategy:"webdriver.load.strategy", pageLoadStrategy:"webdriver.load.strategy"};
wdSessionStoreService.prototype.configure_ = function(a, b, c, d) {
  goog.log.info(wdSessionStoreService.LOG_, "Setting preferences based on required capabilities");
  this.configureCapabilities_(b, d);
  c && (goog.object.forEach(c, function(b, c) {
    goog.isBoolean(b) && c in wdSessionStoreService.READ_ONLY_CAPABILITIES_ && b != wdSessionStoreService.READ_ONLY_CAPABILITIES_[c] && (b = "Required capability " + c + " cannot be set to " + b, goog.log.info(wdSessionStoreService.LOG_, b), a.sendError(new WebDriverError(bot.ErrorCode.SESSION_NOT_CREATED, b)), wdSession.quitBrowser(0));
  }), this.configureCapabilities_(c, d));
};
wdSessionStoreService.prototype.configureCapabilities_ = function(a, b) {
  var c = fxdriver.moz.getService("@mozilla.org/preferences-service;1", "nsIPrefBranch");
  goog.object.forEach(a, function(a, b) {
    if (b in wdSessionStoreService.CAPABILITY_PREFERENCE_MAPPING) {
      var d = wdSessionStoreService.CAPABILITY_PREFERENCE_MAPPING[b];
      goog.log.info(wdSessionStoreService.LOG_, "Setting capability " + b + " (" + d + ") to " + a);
      goog.isBoolean(a) ? c.setBoolPref(d, a) : c.setCharPref(d, a);
    }
  });
};
wdSessionStoreService.prototype.deleteSession = function(a) {
  a in this.sessions_ && delete this.sessions_[a];
};
wdSessionStoreService.prototype.getSession = function(a) {
  if (a in this.sessions_) {
    return this.sessions_[a];
  }
  throw Components.results.NS_ERROR_NOT_AVAILABLE;
};
wdSessionStoreService.prototype.getSessions = function() {
  var a = [], b;
  for (b in this.sessions_) {
    a.push(b);
  }
  return a;
};
function wdSessionStoreServiceFactory() {
}
wdSessionStoreServiceFactory.prototype.instance_ = null;
wdSessionStoreServiceFactory.prototype.createInstance = function(a, b) {
  if (null != a) {
    throw Components.results.NS_ERROR_NO_AGGREGATION;
  }
  this.instance_ || (this.instance_ = new wdSessionStoreService);
  return this.instance_.QueryInterface(b);
};
function wdSessionStoreServiceModule() {
}
wdSessionStoreServiceModule.prototype.hasRegistered_ = !1;
wdSessionStoreServiceModule.prototype.registerSelf = function(a, b, c, d) {
  if (this.hasRegistered_) {
    throw Components.results.NS_ERROR_FACTORY_REGISTER_AGAIN;
  }
  a.QueryInterface(Components.interfaces.nsIComponentRegistrar).registerFactoryLocation(wdSessionStoreService.CLASS_ID, wdSessionStoreService.CLASS_NAME, wdSessionStoreService.CONTRACT_ID, b, c, d);
  this.hasRegistered_ = !0;
};
wdSessionStoreServiceModule.prototype.unregisterSelf = function(a, b) {
  a.QueryInterface(Components.interfaces.nsIComponentRegistrar).unregisterFactoryLocation(wdSessionStoreService.CLASS_ID, b);
};
wdSessionStoreServiceModule.prototype.getClassObject = function(a, b, c) {
  if (!c.equals(Components.interfaces.nsIFactory)) {
    throw Components.results.NS_ERROR_NOT_IMPLEMENTED;
  }
  if (!b.equals(wdSessionStoreService.CLASS_ID)) {
    throw Components.results.NS_ERROR_NO_INTERFACE;
  }
  return new wdSessionStoreServiceFactory;
};
wdSessionStoreServiceModule.prototype.canUnload = function() {
  return !0;
};
NSGetModule = function() {
  return new wdSessionStoreServiceModule;
};
wdSessionStoreService.prototype.classID = wdSessionStoreService.CLASS_ID;
fxdriver.moz.load("resource://gre/modules/XPCOMUtils.jsm");
XPCOMUtils.generateNSGetFactory && (NSGetFactory = XPCOMUtils.generateNSGetFactory([wdSessionStoreService]));
wgxpath.Step = function(a, b, c, d) {
  wgxpath.Expr.call(this, wgxpath.DataType.NODESET);
  this.axis_ = a;
  this.test_ = b;
  this.predicates_ = c || new wgxpath.Predicates([]);
  this.descendants_ = !!d;
  b = this.predicates_.getQuickAttr();
  a.supportsQuickAttr_ && b && (a = b.name, a = wgxpath.userAgent.IE_DOC_PRE_9 ? a.toLowerCase() : a, this.setQuickAttr({name:a, valueExpr:b.valueExpr}));
  this.setNeedContextPosition(this.predicates_.doesNeedContextPosition());
};
goog.inherits(wgxpath.Step, wgxpath.Expr);
wgxpath.Step.prototype.evaluate = function(a) {
  var b = a.getNode(), c = this.getQuickAttr(), d = null, f = null, g = 0;
  c && (d = c.name, f = c.valueExpr ? c.valueExpr.asString(a) : null, g = 1);
  if (this.descendants_) {
    if (this.doesNeedContextPosition() || this.axis_ != wgxpath.Step.Axis.CHILD) {
      if (b = (new wgxpath.Step(wgxpath.Step.Axis.DESCENDANT_OR_SELF, new wgxpath.KindTest("node"))).evaluate(a).iterator(), c = b.next()) {
        for (a = this.evaluate_(c, d, f, g); null != (c = b.next());) {
          a = wgxpath.NodeSet.merge(a, this.evaluate_(c, d, f, g));
        }
      } else {
        a = new wgxpath.NodeSet;
      }
    } else {
      a = wgxpath.Node.getDescendantNodes(this.test_, b, d, f), a = this.predicates_.evaluatePredicates(a, g);
    }
  } else {
    a = this.evaluate_(a.getNode(), d, f, g);
  }
  return a;
};
wgxpath.Step.prototype.evaluate_ = function(a, b, c, d) {
  a = this.axis_.func_(this.test_, a, b, c);
  return a = this.predicates_.evaluatePredicates(a, d);
};
wgxpath.Step.prototype.doesIncludeDescendants = function() {
  return this.descendants_;
};
wgxpath.Step.prototype.getAxis = function() {
  return this.axis_;
};
wgxpath.Step.prototype.getTest = function() {
  return this.test_;
};
wgxpath.Step.prototype.toString = function() {
  var a = "Step:" + wgxpath.Expr.indent("Operator: " + (this.descendants_ ? "//" : "/"));
  this.axis_.name_ && (a += wgxpath.Expr.indent("Axis: " + this.axis_));
  a += wgxpath.Expr.indent(this.test_);
  if (this.predicates_.getLength()) {
    var b = goog.array.reduce(this.predicates_.getPredicates(), function(a, b) {
      return a + wgxpath.Expr.indent(b);
    }, "Predicates:");
    a += wgxpath.Expr.indent(b);
  }
  return a;
};
wgxpath.Step.Axis_ = function(a, b, c, d) {
  this.name_ = a;
  this.func_ = b;
  this.reverse_ = c;
  this.supportsQuickAttr_ = d;
};
wgxpath.Step.Axis_.prototype.isReverse = function() {
  return this.reverse_;
};
wgxpath.Step.Axis_.prototype.toString = function() {
  return this.name_;
};
wgxpath.Step.nameToAxisMap_ = {};
wgxpath.Step.createAxis_ = function(a, b, c, d) {
  if (wgxpath.Step.nameToAxisMap_.hasOwnProperty(a)) {
    throw Error("Axis already created: " + a);
  }
  b = new wgxpath.Step.Axis_(a, b, c, !!d);
  return wgxpath.Step.nameToAxisMap_[a] = b;
};
wgxpath.Step.getAxis = function(a) {
  return wgxpath.Step.nameToAxisMap_[a] || null;
};
wgxpath.Step.Axis = {ANCESTOR:wgxpath.Step.createAxis_("ancestor", function(a, b) {
  for (var c = new wgxpath.NodeSet; b = b.parentNode;) {
    a.matches(b) && c.unshift(b);
  }
  return c;
}, !0), ANCESTOR_OR_SELF:wgxpath.Step.createAxis_("ancestor-or-self", function(a, b) {
  var c = new wgxpath.NodeSet;
  do {
    a.matches(b) && c.unshift(b);
  } while (b = b.parentNode);
  return c;
}, !0), ATTRIBUTE:wgxpath.Step.createAxis_("attribute", function(a, b) {
  var c = new wgxpath.NodeSet, d = a.getName();
  if ("style" == d && wgxpath.userAgent.IE_DOC_PRE_9 && b.style) {
    return c.add(wgxpath.IEAttrWrapper.forStyleOf(b, b.sourceIndex)), c;
  }
  var f = b.attributes;
  if (f) {
    if (a instanceof wgxpath.KindTest && goog.isNull(a.getType()) || "*" == d) {
      for (var d = b.sourceIndex, g = 0; a = f[g]; g++) {
        wgxpath.userAgent.IE_DOC_PRE_9 ? a.nodeValue && c.add(wgxpath.IEAttrWrapper.forAttrOf(b, a, d)) : c.add(a);
      }
    } else {
      (a = f.getNamedItem(d)) && (wgxpath.userAgent.IE_DOC_PRE_9 ? a.nodeValue && c.add(wgxpath.IEAttrWrapper.forAttrOf(b, a, b.sourceIndex)) : c.add(a));
    }
  }
  return c;
}, !1), CHILD:wgxpath.Step.createAxis_("child", wgxpath.Node.getChildNodes, !1, !0), DESCENDANT:wgxpath.Step.createAxis_("descendant", wgxpath.Node.getDescendantNodes, !1, !0), DESCENDANT_OR_SELF:wgxpath.Step.createAxis_("descendant-or-self", function(a, b, c, d) {
  var f = new wgxpath.NodeSet;
  wgxpath.Node.attrMatches(b, c, d) && a.matches(b) && f.add(b);
  return wgxpath.Node.getDescendantNodes(a, b, c, d, f);
}, !1, !0), FOLLOWING:wgxpath.Step.createAxis_("following", function(a, b, c, d) {
  var f = new wgxpath.NodeSet;
  do {
    for (var g = b; g = g.nextSibling;) {
      wgxpath.Node.attrMatches(g, c, d) && a.matches(g) && f.add(g), f = wgxpath.Node.getDescendantNodes(a, g, c, d, f);
    }
  } while (b = b.parentNode);
  return f;
}, !1, !0), FOLLOWING_SIBLING:wgxpath.Step.createAxis_("following-sibling", function(a, b) {
  for (var c = new wgxpath.NodeSet; b = b.nextSibling;) {
    a.matches(b) && c.add(b);
  }
  return c;
}, !1), NAMESPACE:wgxpath.Step.createAxis_("namespace", function(a, b) {
  return new wgxpath.NodeSet;
}, !1), PARENT:wgxpath.Step.createAxis_("parent", function(a, b) {
  var c = new wgxpath.NodeSet;
  if (b.nodeType == goog.dom.NodeType.DOCUMENT) {
    return c;
  }
  if (b.nodeType == goog.dom.NodeType.ATTRIBUTE) {
    return c.add(b.ownerElement), c;
  }
  b = b.parentNode;
  a.matches(b) && c.add(b);
  return c;
}, !1), PRECEDING:wgxpath.Step.createAxis_("preceding", function(a, b, c, d) {
  var f = new wgxpath.NodeSet, g = [];
  do {
    g.unshift(b);
  } while (b = b.parentNode);
  for (var h = 1, k = g.length; h < k; h++) {
    var m = [];
    for (b = g[h]; b = b.previousSibling;) {
      m.unshift(b);
    }
    for (var p = 0, r = m.length; p < r; p++) {
      b = m[p], wgxpath.Node.attrMatches(b, c, d) && a.matches(b) && f.add(b), f = wgxpath.Node.getDescendantNodes(a, b, c, d, f);
    }
  }
  return f;
}, !0, !0), PRECEDING_SIBLING:wgxpath.Step.createAxis_("preceding-sibling", function(a, b) {
  for (var c = new wgxpath.NodeSet; b = b.previousSibling;) {
    a.matches(b) && c.unshift(b);
  }
  return c;
}, !0), SELF:wgxpath.Step.createAxis_("self", function(a, b) {
  var c = new wgxpath.NodeSet;
  a.matches(b) && c.add(b);
  return c;
}, !1)};
wgxpath.Parser = function(a, b) {
  this.lexer_ = a;
  this.nsResolver_ = b;
};
wgxpath.Parser.prototype.parseExpr = function() {
  for (var a, b = [];;) {
    this.checkNotEmpty_("Missing right hand side of binary expression.");
    a = this.parseUnaryExpr_();
    var c = this.lexer_.next();
    if (!c) {
      break;
    }
    var d = (c = wgxpath.BinaryExpr.getOp(c)) && c.getPrecedence();
    if (!d) {
      this.lexer_.back();
      break;
    }
    for (; b.length && d <= b[b.length - 1].getPrecedence();) {
      a = new wgxpath.BinaryExpr(b.pop(), b.pop(), a);
    }
    b.push(a, c);
  }
  for (; b.length;) {
    a = new wgxpath.BinaryExpr(b.pop(), b.pop(), a);
  }
  return a;
};
wgxpath.Parser.prototype.checkNotEmpty_ = function(a) {
  if (this.lexer_.empty()) {
    throw Error(a);
  }
};
wgxpath.Parser.prototype.checkNextEquals_ = function(a) {
  var b = this.lexer_.next();
  if (b != a) {
    throw Error("Bad token, expected: " + a + " got: " + b);
  }
};
wgxpath.Parser.prototype.checkNextNotEquals_ = function(a) {
  var b = this.lexer_.next();
  if (b != a) {
    throw Error("Bad token: " + b);
  }
};
wgxpath.Parser.prototype.parseFilterExpr_ = function() {
  var a = this.lexer_.peek();
  var b = a.charAt(0);
  switch(b) {
    case "$":
      throw Error("Variable reference not allowed in HTML XPath");
    case "(":
      this.lexer_.next();
      a = this.parseExpr();
      this.checkNotEmpty_('unclosed "("');
      this.checkNextEquals_(")");
      break;
    case '"':
    case "'":
      a = this.parseLiteral_();
      break;
    default:
      if (isNaN(+a)) {
        if (!wgxpath.KindTest.isValidType(a) && /(?![0-9])[\w]/.test(b) && "(" == this.lexer_.peek(1)) {
          a = this.parseFunctionCall_();
        } else {
          return null;
        }
      } else {
        a = this.parseNumber_();
      }
  }
  if ("[" != this.lexer_.peek()) {
    return a;
  }
  b = new wgxpath.Predicates(this.parsePredicates_());
  return new wgxpath.FilterExpr(a, b);
};
wgxpath.Parser.prototype.parseFunctionCall_ = function() {
  var a = this.lexer_.next(), a = wgxpath.FunctionCall.getFunc(a);
  this.lexer_.next();
  for (var b = []; ")" != this.lexer_.peek();) {
    this.checkNotEmpty_("Missing function argument list.");
    b.push(this.parseExpr());
    if ("," != this.lexer_.peek()) {
      break;
    }
    this.lexer_.next();
  }
  this.checkNotEmpty_("Unclosed function argument list.");
  this.checkNextNotEquals_(")");
  return new wgxpath.FunctionCall(a, b);
};
wgxpath.Parser.prototype.parseKindTest_ = function() {
  var a = this.lexer_.next();
  if (!wgxpath.KindTest.isValidType(a)) {
    throw Error("Invalid type name: " + a);
  }
  this.checkNextEquals_("(");
  this.checkNotEmpty_("Bad nodetype");
  var b = this.lexer_.peek().charAt(0), c = null;
  if ('"' == b || "'" == b) {
    c = this.parseLiteral_();
  }
  this.checkNotEmpty_("Bad nodetype");
  this.checkNextNotEquals_(")");
  return new wgxpath.KindTest(a, c);
};
wgxpath.Parser.prototype.parseLiteral_ = function() {
  var a = this.lexer_.next();
  if (2 > a.length) {
    throw Error("Unclosed literal string");
  }
  return new wgxpath.Literal(a);
};
wgxpath.Parser.prototype.parseNameTest_ = function() {
  var a = this.lexer_.next(), b = a.indexOf(":");
  if (-1 == b) {
    return new wgxpath.NameTest(a);
  }
  var c = a.substring(0, b);
  if (c == wgxpath.NameTest.WILDCARD) {
    var d = wgxpath.NameTest.WILDCARD;
  } else {
    if (d = this.nsResolver_(c), !d) {
      throw Error("Namespace prefix not declared: " + c);
    }
  }
  a = a.substr(b + 1);
  return new wgxpath.NameTest(a, d);
};
wgxpath.Parser.prototype.parseNumber_ = function() {
  return new wgxpath.Number(+this.lexer_.next());
};
wgxpath.Parser.prototype.parsePathExpr_ = function() {
  var a = [];
  if (wgxpath.PathExpr.isValidOp(this.lexer_.peek())) {
    var b = this.lexer_.next();
    var c = this.lexer_.peek();
    if ("/" == b && (this.lexer_.empty() || "." != c && ".." != c && "@" != c && "*" != c && !/(?![0-9])[\w]/.test(c))) {
      return new wgxpath.PathExpr.RootHelperExpr;
    }
    c = new wgxpath.PathExpr.RootHelperExpr;
    this.checkNotEmpty_("Missing next location step.");
    b = this.parseStep_(b);
    a.push(b);
  } else {
    if (b = this.parseFilterExpr_()) {
      if (wgxpath.PathExpr.isValidOp(this.lexer_.peek())) {
        c = b;
      } else {
        return b;
      }
    } else {
      b = this.parseStep_("/"), c = new wgxpath.PathExpr.ContextHelperExpr, a.push(b);
    }
  }
  for (; wgxpath.PathExpr.isValidOp(this.lexer_.peek());) {
    b = this.lexer_.next(), this.checkNotEmpty_("Missing next location step."), b = this.parseStep_(b), a.push(b);
  }
  return new wgxpath.PathExpr(c, a);
};
wgxpath.Parser.prototype.parseStep_ = function(a) {
  if ("/" != a && "//" != a) {
    throw Error('Step op should be "/" or "//"');
  }
  if ("." == this.lexer_.peek()) {
    var b = new wgxpath.Step(wgxpath.Step.Axis.SELF, new wgxpath.KindTest("node"));
    this.lexer_.next();
    return b;
  }
  if (".." == this.lexer_.peek()) {
    return b = new wgxpath.Step(wgxpath.Step.Axis.PARENT, new wgxpath.KindTest("node")), this.lexer_.next(), b;
  }
  if ("@" == this.lexer_.peek()) {
    var c = wgxpath.Step.Axis.ATTRIBUTE;
    this.lexer_.next();
    this.checkNotEmpty_("Missing attribute name");
  } else {
    if ("::" == this.lexer_.peek(1)) {
      if (!/(?![0-9])[\w]/.test(this.lexer_.peek().charAt(0))) {
        throw Error("Bad token: " + this.lexer_.next());
      }
      var d = this.lexer_.next();
      c = wgxpath.Step.getAxis(d);
      if (!c) {
        throw Error("No axis with name: " + d);
      }
      this.lexer_.next();
      this.checkNotEmpty_("Missing node name");
    } else {
      c = wgxpath.Step.Axis.CHILD;
    }
  }
  d = this.lexer_.peek();
  if (/(?![0-9])[\w\*]/.test(d.charAt(0))) {
    if ("(" == this.lexer_.peek(1)) {
      if (!wgxpath.KindTest.isValidType(d)) {
        throw Error("Invalid node type: " + d);
      }
      d = this.parseKindTest_();
    } else {
      d = this.parseNameTest_();
    }
  } else {
    throw Error("Bad token: " + this.lexer_.next());
  }
  var f = new wgxpath.Predicates(this.parsePredicates_(), c.isReverse());
  return b || new wgxpath.Step(c, d, f, "//" == a);
};
wgxpath.Parser.prototype.parsePredicates_ = function() {
  for (var a = []; "[" == this.lexer_.peek();) {
    this.lexer_.next();
    this.checkNotEmpty_("Missing predicate expression.");
    var b = this.parseExpr();
    a.push(b);
    this.checkNotEmpty_("Unclosed predicate expression.");
    this.checkNextEquals_("]");
  }
  return a;
};
wgxpath.Parser.prototype.parseUnaryExpr_ = function() {
  return "-" == this.lexer_.peek() ? (this.lexer_.next(), new wgxpath.UnaryExpr(this.parseUnaryExpr_())) : this.parseUnionExpr_();
};
wgxpath.Parser.prototype.parseUnionExpr_ = function() {
  var a = this.parsePathExpr_();
  if ("|" != this.lexer_.peek()) {
    return a;
  }
  for (a = [a]; "|" == this.lexer_.next();) {
    this.checkNotEmpty_("Missing next union location path."), a.push(this.parsePathExpr_());
  }
  this.lexer_.back();
  return new wgxpath.UnionExpr(a);
};
wgxpath.XPathResultType = {ANY_TYPE:0, NUMBER_TYPE:1, STRING_TYPE:2, BOOLEAN_TYPE:3, UNORDERED_NODE_ITERATOR_TYPE:4, ORDERED_NODE_ITERATOR_TYPE:5, UNORDERED_NODE_SNAPSHOT_TYPE:6, ORDERED_NODE_SNAPSHOT_TYPE:7, ANY_UNORDERED_NODE_TYPE:8, FIRST_ORDERED_NODE_TYPE:9};
wgxpath.XPathExpression_ = function(a, b) {
  if (!a.length) {
    throw Error("Empty XPath expression.");
  }
  a = wgxpath.Lexer.tokenize(a);
  if (a.empty()) {
    throw Error("Invalid XPath expression.");
  }
  b ? goog.isFunction(b) || (b = goog.bind(b.lookupNamespaceURI, b)) : b = function(a) {
    return null;
  };
  var c = (new wgxpath.Parser(a, b)).parseExpr();
  if (!a.empty()) {
    throw Error("Bad token: " + a.next());
  }
  this.evaluate = function(a, b) {
    a = c.evaluate(new wgxpath.Context(a));
    return new wgxpath.XPathResult_(a, b);
  };
};
wgxpath.XPathResult_ = function(a, b) {
  if (b == wgxpath.XPathResultType.ANY_TYPE) {
    if (a instanceof wgxpath.NodeSet) {
      b = wgxpath.XPathResultType.UNORDERED_NODE_ITERATOR_TYPE;
    } else {
      if ("string" == typeof a) {
        b = wgxpath.XPathResultType.STRING_TYPE;
      } else {
        if ("number" == typeof a) {
          b = wgxpath.XPathResultType.NUMBER_TYPE;
        } else {
          if ("boolean" == typeof a) {
            b = wgxpath.XPathResultType.BOOLEAN_TYPE;
          } else {
            throw Error("Unexpected evaluation result.");
          }
        }
      }
    }
  }
  if (b != wgxpath.XPathResultType.STRING_TYPE && b != wgxpath.XPathResultType.NUMBER_TYPE && b != wgxpath.XPathResultType.BOOLEAN_TYPE && !(a instanceof wgxpath.NodeSet)) {
    throw Error("value could not be converted to the specified type");
  }
  this.resultType = b;
  switch(b) {
    case wgxpath.XPathResultType.STRING_TYPE:
      this.stringValue = a instanceof wgxpath.NodeSet ? a.string() : "" + a;
      break;
    case wgxpath.XPathResultType.NUMBER_TYPE:
      this.numberValue = a instanceof wgxpath.NodeSet ? a.number() : +a;
      break;
    case wgxpath.XPathResultType.BOOLEAN_TYPE:
      this.booleanValue = a instanceof wgxpath.NodeSet ? 0 < a.getLength() : !!a;
      break;
    case wgxpath.XPathResultType.UNORDERED_NODE_ITERATOR_TYPE:
    case wgxpath.XPathResultType.ORDERED_NODE_ITERATOR_TYPE:
    case wgxpath.XPathResultType.UNORDERED_NODE_SNAPSHOT_TYPE:
    case wgxpath.XPathResultType.ORDERED_NODE_SNAPSHOT_TYPE:
      var c = a.iterator();
      var d = [];
      for (var f = c.next(); f; f = c.next()) {
        d.push(f instanceof wgxpath.IEAttrWrapper ? f.getNode() : f);
      }
      this.snapshotLength = a.getLength();
      this.invalidIteratorState = !1;
      break;
    case wgxpath.XPathResultType.ANY_UNORDERED_NODE_TYPE:
    case wgxpath.XPathResultType.FIRST_ORDERED_NODE_TYPE:
      a = a.getFirst();
      this.singleNodeValue = a instanceof wgxpath.IEAttrWrapper ? a.getNode() : a;
      break;
    default:
      throw Error("Unknown XPathResult type.");
  }
  var g = 0;
  this.iterateNext = function() {
    if (b != wgxpath.XPathResultType.UNORDERED_NODE_ITERATOR_TYPE && b != wgxpath.XPathResultType.ORDERED_NODE_ITERATOR_TYPE) {
      throw Error("iterateNext called with wrong result type");
    }
    return g >= d.length ? null : d[g++];
  };
  this.snapshotItem = function(a) {
    if (b != wgxpath.XPathResultType.UNORDERED_NODE_SNAPSHOT_TYPE && b != wgxpath.XPathResultType.ORDERED_NODE_SNAPSHOT_TYPE) {
      throw Error("snapshotItem called with wrong result type");
    }
    return a >= d.length || 0 > a ? null : d[a];
  };
};
wgxpath.XPathResult_.ANY_TYPE = wgxpath.XPathResultType.ANY_TYPE;
wgxpath.XPathResult_.NUMBER_TYPE = wgxpath.XPathResultType.NUMBER_TYPE;
wgxpath.XPathResult_.STRING_TYPE = wgxpath.XPathResultType.STRING_TYPE;
wgxpath.XPathResult_.BOOLEAN_TYPE = wgxpath.XPathResultType.BOOLEAN_TYPE;
wgxpath.XPathResult_.UNORDERED_NODE_ITERATOR_TYPE = wgxpath.XPathResultType.UNORDERED_NODE_ITERATOR_TYPE;
wgxpath.XPathResult_.ORDERED_NODE_ITERATOR_TYPE = wgxpath.XPathResultType.ORDERED_NODE_ITERATOR_TYPE;
wgxpath.XPathResult_.UNORDERED_NODE_SNAPSHOT_TYPE = wgxpath.XPathResultType.UNORDERED_NODE_SNAPSHOT_TYPE;
wgxpath.XPathResult_.ORDERED_NODE_SNAPSHOT_TYPE = wgxpath.XPathResultType.ORDERED_NODE_SNAPSHOT_TYPE;
wgxpath.XPathResult_.ANY_UNORDERED_NODE_TYPE = wgxpath.XPathResultType.ANY_UNORDERED_NODE_TYPE;
wgxpath.XPathResult_.FIRST_ORDERED_NODE_TYPE = wgxpath.XPathResultType.FIRST_ORDERED_NODE_TYPE;
wgxpath.XPathNSResolver_ = function(a) {
  this.lookupNamespaceURI = wgxpath.nsResolver.getResolver(a);
};
wgxpath.install = function(a, b) {
  a = a || goog.global;
  var c = a.Document && a.Document.prototype || a.document;
  if (!c.evaluate || b) {
    a.XPathResult = wgxpath.XPathResult_, c.evaluate = function(a, b, c, h, k) {
      return (new wgxpath.XPathExpression_(a, c)).evaluate(b, h);
    }, c.createExpression = function(a, b) {
      return new wgxpath.XPathExpression_(a, b);
    }, c.createNSResolver = function(a) {
      return new wgxpath.XPathNSResolver_(a);
    };
  }
};
goog.exportSymbol("wgxpath.install", wgxpath.install);
bot.locators.xpath = {};
bot.locators.XPathResult_ = {ORDERED_NODE_SNAPSHOT_TYPE:7, FIRST_ORDERED_NODE_TYPE:9};
bot.locators.xpath.DEFAULT_RESOLVER_ = function() {
  var a = {svg:"http://www.w3.org/2000/svg"};
  return function(b) {
    return a[b] || null;
  };
}();
bot.locators.xpath.evaluate_ = function(a, b, c) {
  var d = goog.dom.getOwnerDocument(a);
  if (!d.documentElement) {
    return null;
  }
  (goog.userAgent.IE || goog.userAgent.product.ANDROID) && wgxpath.install(goog.dom.getWindow(d));
  try {
    var f = d.createNSResolver ? d.createNSResolver(d.documentElement) : bot.locators.xpath.DEFAULT_RESOLVER_;
    if (goog.userAgent.IE && !goog.userAgent.isVersionOrHigher(7)) {
      return d.evaluate.call(d, b, a, f, c, null);
    }
    if (!goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9)) {
      for (var g = {}, h = d.getElementsByTagName("*"), k = 0; k < h.length; ++k) {
        var m = h[k], p = m.namespaceURI;
        if (p && !g[p]) {
          var r = m.lookupPrefix(p);
          if (!r) {
            var l = p.match(".*/(\\w+)/?$"), r = l ? l[1] : "xhtml";
          }
          g[p] = r;
        }
      }
      var t = {}, q;
      for (q in g) {
        t[g[q]] = q;
      }
      f = function(a) {
        return t[a] || null;
      };
    }
    try {
      return d.evaluate(b, a, f, c, null);
    } catch (n) {
      if ("TypeError" === n.name) {
        return f = d.createNSResolver ? d.createNSResolver(d.documentElement) : bot.locators.xpath.DEFAULT_RESOLVER_, d.evaluate(b, a, f, c, null);
      }
      throw n;
    }
  } catch (n) {
    if (!goog.userAgent.GECKO || "NS_ERROR_ILLEGAL_VALUE" != n.name) {
      throw new bot.Error(bot.ErrorCode.INVALID_SELECTOR_ERROR, "Unable to locate an element with the xpath expression " + b + " because of the following error:\n" + n);
    }
  }
};
bot.locators.xpath.checkElement_ = function(a, b) {
  if (!a || a.nodeType != goog.dom.NodeType.ELEMENT) {
    throw new bot.Error(bot.ErrorCode.INVALID_SELECTOR_ERROR, 'The result of the xpath expression "' + b + '" is: ' + a + ". It should be an element.");
  }
};
bot.locators.xpath.single = function(a, b) {
  var c = function() {
    var c = bot.locators.xpath.evaluate_(b, a, bot.locators.XPathResult_.FIRST_ORDERED_NODE_TYPE);
    return c ? c.singleNodeValue || null : b.selectSingleNode ? (c = goog.dom.getOwnerDocument(b), c.setProperty && c.setProperty("SelectionLanguage", "XPath"), b.selectSingleNode(a)) : null;
  }();
  goog.isNull(c) || bot.locators.xpath.checkElement_(c, a);
  return c;
};
bot.locators.xpath.many = function(a, b) {
  var c = function() {
    var c = bot.locators.xpath.evaluate_(b, a, bot.locators.XPathResult_.ORDERED_NODE_SNAPSHOT_TYPE);
    if (c) {
      for (var f = c.snapshotLength, g = [], h = 0; h < f; ++h) {
        g.push(c.snapshotItem(h));
      }
      return g;
    }
    return b.selectNodes ? (c = goog.dom.getOwnerDocument(b), c.setProperty && c.setProperty("SelectionLanguage", "XPath"), b.selectNodes(a)) : [];
  }();
  goog.array.forEach(c, function(b) {
    bot.locators.xpath.checkElement_(b, a);
  });
  return c;
};
bot.dom.IS_SHADOW_DOM_ENABLED = "function" === typeof ShadowRoot;
bot.dom.getActiveElement = function(a) {
  a = goog.dom.getActiveElement(goog.dom.getOwnerDocument(a));
  return goog.userAgent.IE && a && "undefined" === typeof a.nodeType ? null : a;
};
bot.dom.isElement = bot.dom.core.isElement;
bot.dom.isInteractable = function(a) {
  return bot.dom.isShown(a, !0) && bot.dom.isEnabled(a) && !bot.dom.hasPointerEventsDisabled_(a);
};
bot.dom.hasPointerEventsDisabled_ = function(a) {
  return goog.userAgent.IE || goog.userAgent.GECKO && !bot.userAgent.isEngineVersion("1.9.2") ? !1 : "none" == bot.dom.getEffectiveStyle(a, "pointer-events");
};
bot.dom.isSelectable = bot.dom.core.isSelectable;
bot.dom.isSelected = bot.dom.core.isSelected;
bot.dom.FOCUSABLE_FORM_FIELDS_ = "A AREA BUTTON INPUT LABEL SELECT TEXTAREA".split(" ");
bot.dom.isFocusable = function(a) {
  return goog.array.some(bot.dom.FOCUSABLE_FORM_FIELDS_, function(b) {
    return bot.dom.core.isElement(a, b);
  }) || null != bot.dom.core.getAttribute(a, "tabindex") && 0 <= Number(bot.dom.core.getProperty(a, "tabIndex")) || bot.dom.isEditable(a);
};
bot.dom.getProperty = bot.dom.core.getProperty;
bot.dom.getAttribute = bot.dom.core.getAttribute;
bot.dom.DISABLED_ATTRIBUTE_SUPPORTED_ = "BUTTON INPUT OPTGROUP OPTION SELECT TEXTAREA".split(" ");
bot.dom.isEnabled = function(a) {
  return goog.array.some(bot.dom.DISABLED_ATTRIBUTE_SUPPORTED_, function(b) {
    return bot.dom.core.isElement(a, b);
  }) ? bot.dom.core.getProperty(a, "disabled") ? !1 : a.parentNode && a.parentNode.nodeType == goog.dom.NodeType.ELEMENT && bot.dom.core.isElement(a, "OPTGROUP") || bot.dom.core.isElement(a, "OPTION") ? bot.dom.isEnabled(a.parentNode) : !goog.dom.getAncestor(a, function(a) {
    var b = a.parentNode;
    if (b && bot.dom.core.isElement(b, "FIELDSET") && bot.dom.core.getProperty(b, "disabled")) {
      if (!bot.dom.core.isElement(a, "LEGEND")) {
        return !0;
      }
      for (; a = goog.dom.getPreviousElementSibling(a);) {
        if (bot.dom.core.isElement(a, "LEGEND")) {
          return !0;
        }
      }
    }
    return !1;
  }, !0) : !0;
};
bot.dom.TEXTUAL_INPUT_TYPES_ = "text search tel url email password number".split(" ");
bot.dom.isTextual = function(a) {
  return bot.dom.core.isElement(a, "TEXTAREA") ? !0 : bot.dom.core.isElement(a, "INPUT") ? (a = a.type.toLowerCase(), goog.array.contains(bot.dom.TEXTUAL_INPUT_TYPES_, a)) : bot.dom.isContentEditable(a) ? !0 : !1;
};
bot.dom.isFileInput = function(a) {
  return bot.dom.core.isElement(a, "INPUT") ? "file" == a.type.toLowerCase() : !1;
};
bot.dom.isInputType = function(a, b) {
  return bot.dom.core.isElement(a, "INPUT") ? a.type.toLowerCase() == b : !1;
};
bot.dom.isContentEditable = function(a) {
  function b(a) {
    return "inherit" == a.contentEditable ? (a = bot.dom.getParentElement(a)) ? b(a) : !1 : "true" == a.contentEditable;
  }
  return goog.isDef(a.contentEditable) ? !goog.userAgent.IE && goog.isDef(a.isContentEditable) ? a.isContentEditable : b(a) : !1;
};
bot.dom.isEditable = function(a) {
  return (bot.dom.isTextual(a) || bot.dom.isFileInput(a) || bot.dom.isInputType(a, "range") || bot.dom.isInputType(a, "date") || bot.dom.isInputType(a, "month") || bot.dom.isInputType(a, "week") || bot.dom.isInputType(a, "time") || bot.dom.isInputType(a, "datetime-local") || bot.dom.isInputType(a, "color")) && !bot.dom.core.getProperty(a, "readOnly");
};
bot.dom.getParentElement = function(a) {
  for (a = a.parentNode; a && a.nodeType != goog.dom.NodeType.ELEMENT && a.nodeType != goog.dom.NodeType.DOCUMENT && a.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT;) {
    a = a.parentNode;
  }
  return bot.dom.core.isElement(a) ? a : null;
};
bot.dom.getInlineStyle = function(a, b) {
  return goog.style.getStyle(a, b);
};
bot.dom.getEffectiveStyle = function(a, b) {
  b = goog.string.toCamelCase(b);
  if ("float" == b || "cssFloat" == b || "styleFloat" == b) {
    b = bot.userAgent.IE_DOC_PRE9 ? "styleFloat" : "cssFloat";
  }
  a = goog.style.getComputedStyle(a, b) || bot.dom.getCascadedStyle_(a, b);
  return null === a ? null : bot.color.standardizeColor(b, a);
};
bot.dom.getCascadedStyle_ = function(a, b) {
  var c = a.currentStyle || a.style, d = c[b];
  !goog.isDef(d) && goog.isFunction(c.getPropertyValue) && (d = c.getPropertyValue(b));
  return "inherit" != d ? goog.isDef(d) ? d : null : (a = bot.dom.getParentElement(a)) ? bot.dom.getCascadedStyle_(a, b) : null;
};
bot.dom.isShown_ = function(a, b, c) {
  function d(a) {
    var b = bot.dom.getClientRect(a);
    return 0 < b.height && 0 < b.width ? !0 : bot.dom.core.isElement(a, "PATH") && (0 < b.height || 0 < b.width) ? (a = bot.dom.getEffectiveStyle(a, "stroke-width"), !!a && 0 < parseInt(a, 10)) : "hidden" != bot.dom.getEffectiveStyle(a, "overflow") && goog.array.some(a.childNodes, function(a) {
      return a.nodeType == goog.dom.NodeType.TEXT || bot.dom.core.isElement(a) && d(a);
    });
  }
  function f(a) {
    return bot.dom.getOverflowState(a) == bot.dom.OverflowState.HIDDEN && goog.array.every(a.childNodes, function(a) {
      return !bot.dom.core.isElement(a) || f(a) || !d(a);
    });
  }
  if (!bot.dom.core.isElement(a)) {
    throw Error("Argument to isShown must be of type Element");
  }
  if (bot.dom.core.isElement(a, "BODY")) {
    return !0;
  }
  if (bot.dom.core.isElement(a, "OPTION") || bot.dom.core.isElement(a, "OPTGROUP")) {
    return a = goog.dom.getAncestor(a, function(a) {
      return bot.dom.core.isElement(a, "SELECT");
    }), !!a && bot.dom.isShown_(a, !0, c);
  }
  var g = bot.dom.maybeFindImageMap_(a);
  if (g) {
    return !!g.image && 0 < g.rect.width && 0 < g.rect.height && bot.dom.isShown_(g.image, b, c);
  }
  if (bot.dom.core.isElement(a, "INPUT") && "hidden" == a.type.toLowerCase() || bot.dom.core.isElement(a, "NOSCRIPT")) {
    return !1;
  }
  g = bot.dom.getEffectiveStyle(a, "visibility");
  return "collapse" != g && "hidden" != g && c(a) && (b || 0 != bot.dom.getOpacity(a)) && d(a) ? !f(a) : !1;
};
bot.dom.isShown = function(a, b) {
  function c(a) {
    if (bot.dom.core.isElement(a) && "none" == bot.dom.getEffectiveStyle(a, "display")) {
      return !1;
    }
    a = bot.dom.getParentNodeInComposedDom(a);
    if (bot.dom.IS_SHADOW_DOM_ENABLED && a instanceof ShadowRoot) {
      if (a.host.shadowRoot !== a) {
        return !1;
      }
      a = a.host;
    }
    return !a || a.nodeType != goog.dom.NodeType.DOCUMENT && a.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT ? a && c(a) : !0;
  }
  return bot.dom.isShown_(a, !!b, c);
};
bot.dom.OverflowState = {NONE:"none", HIDDEN:"hidden", SCROLL:"scroll"};
bot.dom.getOverflowState = function(a, b) {
  function c(a) {
    function b(a) {
      if (a == h) {
        return !0;
      }
      var b = bot.dom.getEffectiveStyle(a, "display");
      return goog.string.startsWith(b, "inline") || "absolute" == c && "static" == bot.dom.getEffectiveStyle(a, "position") ? !1 : !0;
    }
    var c = bot.dom.getEffectiveStyle(a, "position");
    if ("fixed" == c) {
      return p = !0, a == h ? null : h;
    }
    for (a = bot.dom.getParentElement(a); a && !b(a);) {
      a = bot.dom.getParentElement(a);
    }
    return a;
  }
  function d(a) {
    var b = a;
    if ("visible" == m) {
      if (a == h && k) {
        b = k;
      } else {
        if (a == k) {
          return {x:"visible", y:"visible"};
        }
      }
    }
    b = {x:bot.dom.getEffectiveStyle(b, "overflow-x"), y:bot.dom.getEffectiveStyle(b, "overflow-y")};
    a == h && (b.x = "visible" == b.x ? "auto" : b.x, b.y = "visible" == b.y ? "auto" : b.y);
    return b;
  }
  function f(a) {
    return a == h ? (new goog.dom.DomHelper(g)).getDocumentScroll() : new goog.math.Coordinate(a.scrollLeft, a.scrollTop);
  }
  b = bot.dom.getClientRegion(a, b);
  var g = goog.dom.getOwnerDocument(a), h = g.documentElement, k = g.body, m = bot.dom.getEffectiveStyle(h, "overflow"), p;
  for (a = c(a); a; a = c(a)) {
    var r = d(a);
    if ("visible" != r.x || "visible" != r.y) {
      var l = bot.dom.getClientRect(a);
      if (0 == l.width || 0 == l.height) {
        return bot.dom.OverflowState.HIDDEN;
      }
      var t = b.right < l.left, q = b.bottom < l.top;
      if (t && "hidden" == r.x || q && "hidden" == r.y) {
        return bot.dom.OverflowState.HIDDEN;
      }
      if (t && "visible" != r.x || q && "visible" != r.y) {
        t = f(a);
        q = b.bottom < l.top - t.y;
        if (b.right < l.left - t.x && "visible" != r.x || q && "visible" != r.x) {
          return bot.dom.OverflowState.HIDDEN;
        }
        b = bot.dom.getOverflowState(a);
        return b == bot.dom.OverflowState.HIDDEN ? bot.dom.OverflowState.HIDDEN : bot.dom.OverflowState.SCROLL;
      }
      t = b.left >= l.left + l.width;
      l = b.top >= l.top + l.height;
      if (t && "hidden" == r.x || l && "hidden" == r.y) {
        return bot.dom.OverflowState.HIDDEN;
      }
      if (t && "visible" != r.x || l && "visible" != r.y) {
        if (p && (r = f(a), b.left >= h.scrollWidth - r.x || b.right >= h.scrollHeight - r.y)) {
          return bot.dom.OverflowState.HIDDEN;
        }
        b = bot.dom.getOverflowState(a);
        return b == bot.dom.OverflowState.HIDDEN ? bot.dom.OverflowState.HIDDEN : bot.dom.OverflowState.SCROLL;
      }
    }
  }
  return bot.dom.OverflowState.NONE;
};
bot.dom.CSS_TRANSFORM_MATRIX_REGEX_ = /matrix\(([\d\.\-]+), ([\d\.\-]+), ([\d\.\-]+), ([\d\.\-]+), ([\d\.\-]+)(?:px)?, ([\d\.\-]+)(?:px)?\)/;
bot.dom.getClientRect = function(a) {
  var b = bot.dom.maybeFindImageMap_(a);
  if (b) {
    return b.rect;
  }
  if (bot.dom.core.isElement(a, "HTML")) {
    return a = goog.dom.getOwnerDocument(a), a = goog.dom.getViewportSize(goog.dom.getWindow(a)), new goog.math.Rect(0, 0, a.width, a.height);
  }
  try {
    var c = a.getBoundingClientRect();
  } catch (d) {
    return new goog.math.Rect(0, 0, 0, 0);
  }
  b = new goog.math.Rect(c.left, c.top, c.right - c.left, c.bottom - c.top);
  goog.userAgent.IE && a.ownerDocument.body && (a = goog.dom.getOwnerDocument(a), b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
  return b;
};
bot.dom.maybeFindImageMap_ = function(a) {
  var b = bot.dom.core.isElement(a, "MAP");
  if (!b && !bot.dom.core.isElement(a, "AREA")) {
    return null;
  }
  var c = b ? a : bot.dom.core.isElement(a.parentNode, "MAP") ? a.parentNode : null, d = null, f = null;
  c && c.name && (d = goog.dom.getOwnerDocument(c), d = bot.locators.xpath.single('/descendant::*[@usemap = "#' + c.name + '"]', d)) && (f = bot.dom.getClientRect(d), b || "default" == a.shape.toLowerCase() || (a = bot.dom.getAreaRelativeRect_(a), b = Math.min(Math.max(a.left, 0), f.width), c = Math.min(Math.max(a.top, 0), f.height), f = new goog.math.Rect(b + f.left, c + f.top, Math.min(a.width, f.width - b), Math.min(a.height, f.height - c))));
  return {image:d, rect:f || new goog.math.Rect(0, 0, 0, 0)};
};
bot.dom.getAreaRelativeRect_ = function(a) {
  var b = a.shape.toLowerCase();
  a = a.coords.split(",");
  if ("rect" == b && 4 == a.length) {
    var b = a[0], c = a[1];
    return new goog.math.Rect(b, c, a[2] - b, a[3] - c);
  }
  if ("circle" == b && 3 == a.length) {
    return b = a[2], new goog.math.Rect(a[0] - b, a[1] - b, 2 * b, 2 * b);
  }
  if ("poly" == b && 2 < a.length) {
    for (var b = a[0], c = a[1], d = b, f = c, g = 2; g + 1 < a.length; g += 2) {
      b = Math.min(b, a[g]), d = Math.max(d, a[g]), c = Math.min(c, a[g + 1]), f = Math.max(f, a[g + 1]);
    }
    return new goog.math.Rect(b, c, d - b, f - c);
  }
  return new goog.math.Rect(0, 0, 0, 0);
};
bot.dom.getClientRegion = function(a, b) {
  a = bot.dom.getClientRect(a).toBox();
  b && (b = b instanceof goog.math.Rect ? b : new goog.math.Rect(b.x, b.y, 1, 1), a.left = goog.math.clamp(a.left + b.left, a.left, a.right), a.top = goog.math.clamp(a.top + b.top, a.top, a.bottom), a.right = goog.math.clamp(a.left + b.width, a.left, a.right), a.bottom = goog.math.clamp(a.top + b.height, a.top, a.bottom));
  return a;
};
bot.dom.trimExcludingNonBreakingSpaceCharacters_ = function(a) {
  return a.replace(/^[^\S\xa0]+|[^\S\xa0]+$/g, "");
};
bot.dom.concatenateCleanedLines_ = function(a) {
  a = goog.array.map(a, bot.dom.trimExcludingNonBreakingSpaceCharacters_);
  a = a.join("\n");
  return bot.dom.trimExcludingNonBreakingSpaceCharacters_(a).replace(/\xa0/g, " ");
};
bot.dom.getVisibleText = function(a) {
  var b = [];
  bot.dom.IS_SHADOW_DOM_ENABLED ? bot.dom.appendVisibleTextLinesFromElementInComposedDom_(a, b) : bot.dom.appendVisibleTextLinesFromElement_(a, b);
  return bot.dom.concatenateCleanedLines_(b);
};
bot.dom.appendVisibleTextLinesFromElementCommon_ = function(a, b, c, d) {
  if (bot.dom.core.isElement(a, "BR")) {
    b.push("");
  } else {
    var f = bot.dom.core.isElement(a, "TD"), g = bot.dom.getEffectiveStyle(a, "display"), h = !f && !goog.array.contains(bot.dom.INLINE_DISPLAY_BOXES_, g), k = goog.dom.getPreviousElementSibling(a), k = k ? bot.dom.getEffectiveStyle(k, "display") : "", m = bot.dom.getEffectiveStyle(a, "float") || bot.dom.getEffectiveStyle(a, "cssFloat") || bot.dom.getEffectiveStyle(a, "styleFloat");
    !h || "run-in" == k && "none" == m || goog.string.isEmptyOrWhitespace(goog.array.peek(b) || "") || b.push("");
    var p = c(a), r = null, l = null;
    p && (r = bot.dom.getEffectiveStyle(a, "white-space"), l = bot.dom.getEffectiveStyle(a, "text-transform"));
    goog.array.forEach(a.childNodes, function(a) {
      d(a, b, p, r, l);
    });
    a = goog.array.peek(b) || "";
    !f && "table-cell" != g || !a || goog.string.endsWith(a, " ") || (b[b.length - 1] += " ");
    h && "run-in" != g && !goog.string.isEmptyOrWhitespace(a) && b.push("");
  }
};
bot.dom.appendVisibleTextLinesFromElement_ = function(a, b) {
  bot.dom.appendVisibleTextLinesFromElementCommon_(a, b, bot.dom.isShown, function(a, b, f, g, h) {
    a.nodeType == goog.dom.NodeType.TEXT && f ? bot.dom.appendVisibleTextLinesFromTextNode_(a, b, g, h) : bot.dom.core.isElement(a) && bot.dom.appendVisibleTextLinesFromElement_(a, b);
  });
};
bot.dom.INLINE_DISPLAY_BOXES_ = "inline inline-block inline-table none table-cell table-column table-column-group".split(" ");
bot.dom.appendVisibleTextLinesFromTextNode_ = function(a, b, c, d) {
  a = a.nodeValue.replace(/[\u200b\u200e\u200f]/g, "");
  a = goog.string.canonicalizeNewlines(a);
  if ("normal" == c || "nowrap" == c) {
    a = a.replace(/\n/g, " ");
  }
  a = "pre" == c || "pre-wrap" == c ? a.replace(/[ \f\t\v\u2028\u2029]/g, "\u00a0") : a.replace(/[\ \f\t\v\u2028\u2029]+/g, " ");
  "capitalize" == d ? a = a.replace(/(^|\s)(\S)/g, function(a, b, c) {
    return b + c.toUpperCase();
  }) : "uppercase" == d ? a = a.toUpperCase() : "lowercase" == d && (a = a.toLowerCase());
  c = b.pop() || "";
  goog.string.endsWith(c, " ") && goog.string.startsWith(a, " ") && (a = a.substr(1));
  b.push(c + a);
};
bot.dom.getOpacity = function(a) {
  if (bot.userAgent.IE_DOC_PRE9) {
    if ("relative" == bot.dom.getEffectiveStyle(a, "position")) {
      return 1;
    }
    a = bot.dom.getEffectiveStyle(a, "filter");
    return (a = a.match(/^alpha\(opacity=(\d*)\)/) || a.match(/^progid:DXImageTransform.Microsoft.Alpha\(Opacity=(\d*)\)/)) ? Number(a[1]) / 100 : 1;
  }
  return bot.dom.getOpacityNonIE_(a);
};
bot.dom.getOpacityNonIE_ = function(a) {
  var b = 1, c = bot.dom.getEffectiveStyle(a, "opacity");
  c && (b = Number(c));
  (a = bot.dom.getParentElement(a)) && (b *= bot.dom.getOpacityNonIE_(a));
  return b;
};
bot.dom.getParentNodeInComposedDom = function(a) {
  var b = a.parentNode;
  return b && b.shadowRoot && void 0 !== a.assignedSlot ? a.assignedSlot ? a.assignedSlot.parentNode : null : a.getDestinationInsertionPoints && (a = a.getDestinationInsertionPoints(), 0 < a.length) ? a[a.length - 1] : b;
};
bot.dom.appendVisibleTextLinesFromNodeInComposedDom_ = function(a, b, c, d, f) {
  var g;
  if (a.nodeType == goog.dom.NodeType.TEXT && c) {
    bot.dom.appendVisibleTextLinesFromTextNode_(a, b, d, f);
  } else {
    if (bot.dom.core.isElement(a)) {
      if (bot.dom.core.isElement(a, "CONTENT") || bot.dom.core.isElement(a, "SLOT")) {
        for (g = a; g.parentNode;) {
          g = g.parentNode;
        }
        g instanceof ShadowRoot ? (a = bot.dom.core.isElement(a, "CONTENT") ? a.getDistributedNodes() : a.assignedNodes(), goog.array.forEach(a, function(a) {
          bot.dom.appendVisibleTextLinesFromNodeInComposedDom_(a, b, c, d, f);
        })) : bot.dom.appendVisibleTextLinesFromElementInComposedDom_(a, b);
      } else {
        if (bot.dom.core.isElement(a, "SHADOW")) {
          for (g = a; g.parentNode;) {
            g = g.parentNode;
          }
          if (g instanceof ShadowRoot && (a = g)) {
            for (a = a.olderShadowRoot; a;) {
              goog.array.forEach(a.childNodes, function(a) {
                bot.dom.appendVisibleTextLinesFromNodeInComposedDom_(a, b, c, d, f);
              }), a = a.olderShadowRoot;
            }
          }
        } else {
          bot.dom.appendVisibleTextLinesFromElementInComposedDom_(a, b);
        }
      }
    }
  }
};
bot.dom.isNodeDistributedIntoShadowDom = function(a) {
  var b = null;
  a.nodeType == goog.dom.NodeType.ELEMENT ? b = a : a.nodeType == goog.dom.NodeType.TEXT && (b = a);
  return null != b && (null != b.assignedSlot || b.getDestinationInsertionPoints && 0 < b.getDestinationInsertionPoints().length);
};
bot.dom.appendVisibleTextLinesFromElementInComposedDom_ = function(a, b) {
  a.shadowRoot && goog.array.forEach(a.shadowRoot.childNodes, function(a) {
    bot.dom.appendVisibleTextLinesFromNodeInComposedDom_(a, b, !0, null, null);
  });
  bot.dom.appendVisibleTextLinesFromElementCommon_(a, b, bot.dom.isShown, function(a, b, f, g, h) {
    bot.dom.isNodeDistributedIntoShadowDom(a) || bot.dom.appendVisibleTextLinesFromNodeInComposedDom_(a, b, f, g, h);
  });
};
var Utils = {};
Utils.LOG_ = fxdriver.logging.getLogger("fxdriver.Utils");
Utils.newInstance = function(a, b) {
  var c = Components.classes[a];
  if (c) {
    var d = Components.interfaces[b];
    try {
      return c.createInstance(d);
    } catch (f) {
      throw goog.log.warning(Utils.LOG_, "Cannot create: " + a + " from " + b, f), f;
    }
  } else {
    goog.log.warning(Utils.LOG_, "Unable to find class: " + a);
  }
};
Utils.getServer = function() {
  return Utils.newInstance("@googlecode.com/webdriver/fxdriver;1", "nsISupports").wrappedJSObject;
};
Utils.getActiveElement = function(a) {
  var b = goog.dom.getWindow(a);
  a.activeElement ? b = a.activeElement : (b = b.top.activeElement) && a != b.ownerDocument && (b = null);
  b || (b = Utils.getMainDocumentElement(a));
  return b;
};
Utils.addToKnownElements = function(a) {
  var b = {};
  Components.utils["import"]("resource://fxdriver/modules/web-element-cache.js", b);
  return b.put(a);
};
Utils.getElementAt = function(a, b) {
  var c = {};
  Components.utils["import"]("resource://fxdriver/modules/web-element-cache.js", c);
  return c.get(a, b);
};
Utils.isAttachedToDom = function(a) {
  function b(a) {
    return bot.userAgent.isProductVersion(4) ? a ? new XPCNativeWrapper(a) : null : a;
  }
  var c = b(a.ownerDocument.documentElement);
  for (a = b(a); a && a != c;) {
    a = b(a.parentNode);
  }
  return a == c;
};
Utils.shiftCount = 0;
Utils.getNativeComponent = function(a, b) {
  try {
    return Components.classes[a].createInstance().QueryInterface(b);
  } catch (c) {
  }
};
Utils.getPageLoadStrategy = function() {
  var a = fxdriver.moz.getService("@mozilla.org/preferences-service;1", "nsIPrefBranch");
  return a.prefHasUserValue("webdriver.load.strategy") ? a.getCharPref("webdriver.load.strategy") : "normal";
};
Utils.initWebLoadingListener = function(a, b) {
  var c = a.session.getBrowser(), d = c.contentWindow;
  b = b || d;
  a.session.setWaitForPageLoad(!0);
  new WebLoadingListener(c, function(b, d) {
    a.session.setWindow(c.contentWindow);
    d && a.session.setWaitForPageLoad(!1);
    b ? (a.session.setWaitForPageLoad(!1), a.sendError(new WebDriverError(bot.ErrorCode.TIMEOUT, "Timed out waiting for page load."))) : a.send();
  }, a.session.getPageLoadTimeout(), b);
};
Utils.type = function(a, b, c, d, f, g) {
  a.getDocument();
  c = c.replace(/[\b]/g, "\ue003").replace(/\t/g, "\ue004").replace(/(\r\n|\n|\r)/g, "\ue006");
  goog.log.info(Utils.LOG_, "Doing sendKeys...");
  var h = d = !1, k = !1, m = !1;
  g && (d = g.isControlPressed(), h = g.isShiftPressed(), k = g.isAltPressed(), m = g.isMetaPressed());
  Utils.shiftCount = 0;
  for (var p = c.toUpperCase(), r = 0; r < c.length; r++) {
    var l = c.charAt(r);
    if ("\ue000" == l) {
      d && (l = Components.interfaces.nsIDOMKeyEvent.DOM_VK_CONTROL, Utils.keyEvent(a, b, "keyup", l, 0, d = !1, h, k, m)), h && (l = Components.interfaces.nsIDOMKeyEvent.DOM_VK_SHIFT, Utils.keyEvent(a, b, "keyup", l, 0, d, h = !1, k, m)), k && (l = Components.interfaces.nsIDOMKeyEvent.DOM_VK_ALT, Utils.keyEvent(a, b, "keyup", l, 0, d, h, k = !1, m)), m && (l = Components.interfaces.nsIDOMKeyEvent.DOM_VK_META, Utils.keyEvent(a, b, "keyup", l, 0, d, h, k, m = !1));
    } else {
      var t = "", q = 0;
      if ("\ue001" == l) {
        var n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_CANCEL;
      } else {
        "\ue002" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_HELP : "\ue003" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_BACK_SPACE : "\ue004" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_TAB : "\ue005" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_CLEAR : "\ue006" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_RETURN : "\ue007" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_RETURN : "\ue008" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_SHIFT, 
        t = (h = !h) ? "keydown" : "keyup") : "\ue009" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_CONTROL, t = (d = !d) ? "keydown" : "keyup") : "\ue00a" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_ALT, t = (k = !k) ? "keydown" : "keyup") : "\ue03d" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_META, t = (m = !m) ? "keydown" : "keyup") : "\ue00b" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_PAUSE : "\ue00c" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_ESCAPE : 
        "\ue00d" == l ? n = q = 32 : "\ue00e" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_PAGE_UP : "\ue00f" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_PAGE_DOWN : "\ue010" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_END : "\ue011" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_HOME : "\ue012" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_LEFT : "\ue013" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_UP : "\ue014" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_RIGHT : 
        "\ue015" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_DOWN : "\ue016" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_INSERT : "\ue017" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_DELETE : "\ue018" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_SEMICOLON, q = 59) : "\ue019" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_EQUALS, q = 61) : "\ue01a" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_NUMPAD0, q = 48) : "\ue01b" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_NUMPAD1, 
        q = 49) : "\ue01c" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_NUMPAD2, q = 50) : "\ue01d" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_NUMPAD3, q = 51) : "\ue01e" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_NUMPAD4, q = 52) : "\ue01f" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_NUMPAD5, q = 53) : "\ue020" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_NUMPAD6, q = 54) : "\ue021" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_NUMPAD7, 
        q = 55) : "\ue022" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_NUMPAD8, q = 56) : "\ue023" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_NUMPAD9, q = 57) : "\ue024" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_MULTIPLY, q = 42) : "\ue025" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_ADD, q = 43) : "\ue026" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_SEPARATOR, q = 44) : "\ue027" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_SUBTRACT, 
        q = 45) : "\ue028" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_DECIMAL, q = 46) : "\ue029" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_DIVIDE, q = 47) : "\ue031" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_F1 : "\ue032" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_F2 : "\ue033" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_F3 : "\ue034" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_F4 : "\ue035" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_F5 : 
        "\ue036" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_F6 : "\ue037" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_F7 : "\ue038" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_F8 : "\ue039" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_F9 : "\ue03a" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_F10 : "\ue03b" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_F11 : "\ue03c" == l ? n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_F12 : "," == 
        l || "<" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_COMMA, q = l.charCodeAt(0)) : "." == l || ">" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_PERIOD, q = l.charCodeAt(0)) : "/" == l || "?" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_SLASH, q = c.charCodeAt(r)) : "`" == l || "~" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_BACK_QUOTE, q = l.charCodeAt(0)) : "{" == l || "[" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_OPEN_BRACKET, 
        q = l.charCodeAt(0)) : "\\" == l || "|" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_BACK_SLASH, q = l.charCodeAt(0)) : "}" == l || "]" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_CLOSE_BRACKET, q = l.charCodeAt(0)) : "'" == l || '"' == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_QUOTE, q = l.charCodeAt(0)) : "^" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_CIRCUMFLEX, q = l.charCodeAt(0)) : "!" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_EXCLAMATION, 
        q = l.charCodeAt(0)) : "#" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_HASH, q = l.charCodeAt(0)) : "$" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_DOLLAR, q = l.charCodeAt(0)) : "%" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_PERCENT, q = l.charCodeAt(0)) : "&" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_AMPERSAND, q = l.charCodeAt(0)) : "_" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_UNDERSCORE, q = l.charCodeAt(0)) : "-" == l ? 
        (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_HYPHEN_MINUS, q = l.charCodeAt(0)) : "(" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_OPEN_BRACKET, q = l.charCodeAt(0)) : ")" == l ? (n = Components.interfaces.nsIDOMKeyEvent.DOM_VK_CLOSE_BRACKET, q = l.charCodeAt(0)) : (n = p.charCodeAt(r), q = c.charCodeAt(r));
      }
      if (t) {
        Utils.keyEvent(a, b, t, n, 0, d, h, k, m);
      } else {
        t = !1;
        q && (t = /[A-Z\!\$\^\*\(\)\+\{\}\:\?\|~@#%&_"<>]/.test(l));
        t && !h && (l = Components.interfaces.nsIDOMKeyEvent.DOM_VK_SHIFT, Utils.keyEvent(a, b, "keydown", l, 0, d, !0, k, m), Utils.shiftCount += 1);
        l = n;
        if (32 <= q && 127 > q && (l = 0, !t && h && 32 < q)) {
          if (97 <= q && 122 >= q) {
            q = q + 65 - 97;
          } else {
            var u = String.fromCharCode(q).replace(/([\[\\\.])/g, "\\$1"), u = "`1234567890-=[]\\;',./".search(u);
            0 <= u && (q = '~!@#$%^&*()_+{}|:"<>?'.charCodeAt(u));
          }
        }
        Utils.keyEvent(a, b, "keydown", n, 0, d, t || h, k, m) && Utils.keyEvent(a, b, "keypress", l, q, d, t || h, k, m);
        Utils.keyEvent(a, b, "keyup", n, 0, d, t || h, k, m);
        t && !h && (l = Components.interfaces.nsIDOMKeyEvent.DOM_VK_SHIFT, Utils.keyEvent(a, b, "keyup", l, 0, d, !1, k, m));
      }
    }
  }
  d && f && (l = Components.interfaces.nsIDOMKeyEvent.DOM_VK_CONTROL, Utils.keyEvent(a, b, "keyup", l, 0, d = !1, h, k, m));
  h && f && (l = Components.interfaces.nsIDOMKeyEvent.DOM_VK_SHIFT, Utils.keyEvent(a, b, "keyup", l, 0, d, h = !1, k, m));
  k && f && (l = Components.interfaces.nsIDOMKeyEvent.DOM_VK_ALT, Utils.keyEvent(a, b, "keyup", l, 0, d, h, k = !1, m));
  m && f && (l = Components.interfaces.nsIDOMKeyEvent.DOM_VK_META, Utils.keyEvent(a, b, "keyup", l, 0, d, h, k, m = !1));
  g && (g.setControlPressed(d), g.setShiftPressed(h), g.setAltPressed(k), g.setMetaPressed(m));
};
Utils.keyEvent = function(a, b, c, d, f, g, h, k, m) {
  a.getDocument();
  if (!goog.dom.getAncestor(b, function(a) {
    return a === b.ownerDocument.documentElement;
  }, !0)) {
    return !1;
  }
  a = a.getChromeWindow().QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIDOMWindowUtils);
  var p = 0;
  g && (p += a.MODIFIER_CONTROL);
  k && (p += a.MODIFIER_ALT);
  h && (p += a.MODIFIER_SHIFT);
  m && (p += a.MODIFIER_META);
  return a.sendKeyEvent(c, d, f, p, 0);
};
Utils.fireHtmlEvent = function(a, b) {
  var c = a.ownerDocument.createEvent("HTMLEvents");
  c.initEvent(b, !0, !0);
  return a.dispatchEvent(c);
};
Utils.getLocation = function(a, b) {
  a = a.wrappedJSObject ? a.wrappedJSObject : a;
  var c = void 0;
  if (b && 1 < a.getClientRects().length) {
    for (b = 0; b < a.getClientRects().length; b++) {
      var d = a.getClientRects()[b];
      if (0 != d.width && 0 != d.height) {
        c = d;
        break;
      }
    }
  }
  c || (c = bot.dom.getClientRect(a));
  return {x:c.left, y:c.top, width:c.width, height:c.height};
};
Utils.getLocationRelativeToWindowHandle = function(a, b) {
  b = Utils.getLocation(a, b);
  if (bot.userAgent.isProductVersion(3.6)) {
    var c = a.ownerDocument.defaultView, d = c.top;
    a = a.ownerDocument.defaultView.mozInnerScreenY - d.mozInnerScreenY;
    b.x += c.mozInnerScreenX - d.mozInnerScreenX;
    b.y += a;
  }
  return b;
};
Utils.getBrowserSpecificOffset = function(a) {
  var b = 0, c = 0;
  bot.userAgent.isProductVersion(4) && (a = a.getBoundingClientRect(), c += a.top, b += a.left, goog.log.info(Utils.LOG_, "Browser-specific offset (X,Y): " + b + ", " + c));
  return {x:b, y:c};
};
Utils.scrollIntoView = function(a, b, c) {
  Utils.isInView(a, c) || a.scrollIntoView(b);
  bot.dom.getOverflowState(a, c) != bot.dom.OverflowState.NONE && a.scrollIntoView && a.scrollIntoView(b);
  return bot.action.scrollIntoView(a, c);
};
Utils.isInView = function(a, b) {
  var c = Utils.getLocation(a, "A" == a.tagName);
  b = b || new goog.math.Coordinate(0, 0);
  c.x += b.x;
  c.y += b.y;
  b = goog.dom.getWindow(goog.dom.getOwnerDocument(a));
  for (a = b.frameElement; a; a = b.frameElement) {
    b = Utils.getLocation(a);
    if (c.x < b.x || c.x > b.x + b.width || c.y < b.y || c.y > b.y + b.height) {
      return !1;
    }
    b = goog.dom.getWindow(goog.dom.getOwnerDocument(a));
  }
  a = goog.dom.getViewportSize(b);
  return 0 > c.x || c.x > a.width || 0 > c.y || c.y > a.height ? !1 : !0;
};
Utils.getLocationOnceScrolledIntoView = function(a, b, c) {
  Utils.scrollIntoView(a, b);
  return Utils.getLocationRelativeToWindowHandle(a, c);
};
Utils.getClickablePoint = function(a) {
  var b;
  a = a.wrappedJSObject ? a.wrappedJSObject : a;
  var c = bot.dom.getClientRect(a), d = goog.array.filter(a.getClientRects(), function(a) {
    return 0 != a.width && 0 != a.height;
  }), f = function(a, b, d) {
    return {x:d.left - c.left + a, y:d.top - c.top + b};
  }, g = function(b) {
    return goog.array.find([{x:Math.floor(b.width / 2), y:Math.floor(b.height / 2)}, {x:Math.floor(b.width / 2), y:0}, {x:0, y:Math.floor(b.height / 2)}, {x:b.width - 2, y:Math.floor(b.height / 2)}, {x:Math.floor(b.width / 2), y:b.height - 2}, {x:0, y:0}, {x:b.width - 1, y:0}, {x:0, y:b.height - 1}, {x:b.width - 1, y:b.height - 1}], function(c) {
      a: {
        var d = b.left + c.x;
        c = b.top + c.y;
        for (var f = a; f.parentNode;) {
          f = f.parentNode;
        }
        d = f.elementFromPoint(d, c);
        if (null === d || a == d) {
          d = !0;
        } else {
          for (c = d.parentNode; c;) {
            if (c == a) {
              d = !0;
              break a;
            }
            c = c.parentNode;
          }
          for (c = a.parentNode; c;) {
            if (c == d) {
              d = !0;
              break a;
            }
            c = c.parentNode;
          }
          d = void 0;
        }
      }
      return d;
    });
  };
  if (1 < d.length) {
    goog.log.warning(Utils.LOG_, "Multirect element ", d.length);
    for (var h = 0; h < d.length; h++) {
      if (b = g(d[h])) {
        return goog.log.warning(Utils.LOG_, "Found clickable point in rect " + d[h]), f(b.x, b.y, d[h]);
      }
    }
  }
  return (b = g(c)) ? b : {x:Math.floor(c.width / 2), y:Math.floor(c.height / 2)};
};
Utils.unwrapParameters = function(a, b) {
  switch(typeof a) {
    case "number":
    case "string":
    case "boolean":
      return a;
    case "object":
      if (null == a) {
        return null;
      }
      if ("number" !== typeof a.length || a.propertyIsEnumerable("length")) {
        if ("string" === typeof a.ELEMENT) {
          return a = Utils.getElementAt(a.ELEMENT, b), a = a.wrappedJSObject ? a.wrappedJSObject : a;
        }
        var c = {};
        for (d in a) {
          c[d] = Utils.unwrapParameters(a[d], b);
        }
        return c;
      }
      for (c = []; a && 0 < a.length;) {
        var d = a.shift();
        c.push(Utils.unwrapParameters(d, b));
      }
      return c;
  }
};
Utils.wrapResult = function(a, b) {
  var c = function(a, b, g) {
    a = fxdriver.moz.unwrap(a);
    switch(typeof a) {
      case "string":
      case "number":
      case "boolean":
        return a;
      case "function":
        return a.toString();
      case "undefined":
        return null;
      case "object":
        if (null == a) {
          return null;
        }
        if (0 <= g.indexOf(a)) {
          throw new bot.Error(bot.ErrorCode.JAVASCRIPT_ERROR, "Recursive object cannot be transferred");
        }
        if (1 == a.nodeType && a.tagName) {
          return {ELEMENT:Utils.addToKnownElements(a)};
        }
        if ("function" === typeof a.getMonth) {
          return a.toJSON();
        }
        g.push(a);
        if ("number" === typeof a.length && !a.propertyIsEnumerable("length")) {
          var d = [];
          for (var f = 0; f < a.length; f++) {
            d.push(c(a[f], b, g));
          }
          return d;
        }
        if (9 == a.nodeType) {
          return c(a.documentElement, b, g);
        }
        try {
          var m = a.QueryInterface(CI.nsIDOMNodeList);
        } catch (p) {
        }
        if (m) {
          d = [];
          for (f = 0; f < m.length; f++) {
            d.push(c(a.item(f), b, g));
          }
          return d;
        }
        try {
          if (null != Object.getPrototypeOf(a) && goog.string.endsWith(Object.getPrototypeOf(a).toString(), "Error")) {
            try {
              return fxdriver.error.toJSON(a);
            } catch (p) {
              return goog.log.info(Utils.LOG_, "Error", p), a.toString();
            }
          }
        } catch (p) {
          goog.log.info(Utils.LOG_, "Error", p);
        }
        m = {};
        for (d in a) {
          m[d] = c(a[d], b, g);
        }
        return m;
      default:
        return a;
    }
  };
  return c(a, b, []);
};
Utils.loadUrl = function(a) {
  goog.log.info(Utils.LOG_, "Loading: " + a);
  var b = fxdriver.moz.getService("@mozilla.org/network/io-service;1", "nsIIOService").newChannel(a, null, null).open(), c = Components.classes["@mozilla.org/scriptableinputstream;1"].createInstance(Components.interfaces.nsIScriptableInputStream);
  c.init(b);
  var d = Utils.newInstance("@mozilla.org/intl/scriptableunicodeconverter", "nsIScriptableUnicodeConverter");
  d.charset = "UTF-8";
  for (var f = "", g = c.read(4096); g; g = c.read(4096)) {
    f += d.ConvertToUnicode(g);
  }
  c.close();
  b.close();
  goog.log.info(Utils.LOG_, "Done reading: " + a);
  return f;
};
Utils.installWindowCloseListener = function(a) {
  var b = a.session.getBrowser(), c = goog.bind(a.send, a);
  a.send = function() {
    f.unregisterNotification(d);
    c();
  };
  var d = {observe:function(c, d, f) {
    "domwindowclosed" == d && b.contentWindow == c.content && (goog.log.info(Utils.LOG_, "Window was closed."), a.send());
  }}, f = fxdriver.moz.getService("@mozilla.org/embedcomp/window-watcher;1", "nsIWindowWatcher");
  f.registerNotification(d);
};
Utils.installClickListener = function(a, b) {
  var c = a.session.getBrowser(), d = a.session.getWindow(), f = new b(c, function(b) {
    goog.log.info(Utils.LOG_, "New page loading.");
    try {
      var f = d.closed;
    } catch (m) {
      f = !0;
    }
    f && (goog.log.info(Utils.LOG_, "Detected page load in top window; changing session focus from frame to new top window."), a.session.setWindow(c.contentWindow));
    b && a.sendError(new WebDriverError(bot.ErrorCode.TIMEOUT, "Timed out waiting for page load."));
    a.send();
  }, a.session.getPageLoadTimeout(), d), g = c.contentWindow;
  g.closed ? (goog.log.info(Utils.LOG_, "Content window closed."), a.send()) : g.setTimeout(function() {
    c.webProgress.isLoadingDocument || (b.removeListener(c, f), goog.log.info(Utils.LOG_, "Not loading document anymore."), a.send());
  }, 50);
};
Utils.getPageUnloadedIndicator = function(a) {
  var b = {wasUnloaded:!1}, c = function() {
    b.wasUnloaded = !0;
  };
  b.callback = c;
  Utils.getMainDocumentElement(a.ownerDocument).addEventListener("unload", c, !1);
  a.ownerDocument.defaultView.addEventListener("pagehide", c, !1);
  return b;
};
Utils.removePageUnloadEventListener = function(a, b) {
  if (b.callback && a.ownerDocument) {
    var c = Utils.getMainDocumentElement(a.ownerDocument);
    c && c.removeEventListener("unload", b.callback, !1);
    a.ownerDocument.defaultView && a.ownerDocument.defaultView.removeEventListener("pagehide", b.callback, !1);
  }
};
Utils.convertNSIArrayToNative = function(a) {
  var b = [];
  if (null == a) {
    return b;
  }
  b.length = a.length;
  a = a.enumerate();
  for (var c = 0; a.hasMoreElements();) {
    var d = Components.interfaces, d = a.getNext().QueryInterface(d.nsISupportsCString);
    b[c] = d.toString();
    c += 1;
  }
  return b;
};
Utils.isSVG = function(a) {
  return a.documentElement && "svg" == a.documentElement.nodeName;
};
Utils.getMainDocumentElement = function(a) {
  try {
    return Utils.isSVG(a) ? a.documentElement : a.body;
  } catch (b) {
    if (b instanceof TypeError) {
      return null;
    }
    throw b;
  }
};
bot.locators.id = {};
bot.locators.id.canUseQuerySelector_ = function(a, b) {
  return !(!a.querySelectorAll || !a.querySelector) && !/^\d.*/.test(b);
};
bot.locators.id.single = function(a, b) {
  var c = goog.dom.getDomHelper(b), d = c.getElement(a);
  if (!d) {
    return null;
  }
  if (bot.dom.core.getAttribute(d, "id") == a && b != d && goog.dom.contains(b, d)) {
    return d;
  }
  c = c.getElementsByTagNameAndClass("*");
  return goog.array.find(c, function(c) {
    return bot.dom.core.getAttribute(c, "id") == a && b != c && goog.dom.contains(b, c);
  });
};
bot.locators.id.many = function(a, b) {
  if (!a) {
    return [];
  }
  if (bot.locators.id.canUseQuerySelector_(b, a)) {
    try {
      return b.querySelectorAll("#" + bot.locators.id.cssEscape_(a));
    } catch (c) {
      return [];
    }
  }
  b = goog.dom.getDomHelper(b).getElementsByTagNameAndClass("*", null, b);
  return goog.array.filter(b, function(b) {
    return bot.dom.core.getAttribute(b, "id") == a;
  });
};
bot.locators.id.cssEscape_ = function(a) {
  return a.replace(/([\s'"\\#.:;,!?+<>=~*^$|%&@`{}\-\/\[\]\(\)])/g, "\\$1");
};
bot.locators.linkText = {};
bot.locators.partialLinkText = {};
bot.locators.linkText.single_ = function(a, b, c) {
  try {
    var d = bot.locators.css.many("a", b);
  } catch (f) {
    d = goog.dom.getDomHelper(b).getElementsByTagNameAndClass("A", null, b);
  }
  return goog.array.find(d, function(b) {
    b = bot.dom.getVisibleText(b);
    b = b.replace(/^[\s]+|[\s]+$/g, "");
    return c && -1 != b.indexOf(a) || b == a;
  });
};
bot.locators.linkText.many_ = function(a, b, c) {
  try {
    var d = bot.locators.css.many("a", b);
  } catch (f) {
    d = goog.dom.getDomHelper(b).getElementsByTagNameAndClass("A", null, b);
  }
  return goog.array.filter(d, function(b) {
    b = bot.dom.getVisibleText(b);
    b = b.replace(/^[\s]+|[\s]+$/g, "");
    return c && -1 != b.indexOf(a) || b == a;
  });
};
bot.locators.linkText.single = function(a, b) {
  return bot.locators.linkText.single_(a, b, !1);
};
bot.locators.linkText.many = function(a, b) {
  return bot.locators.linkText.many_(a, b, !1);
};
bot.locators.partialLinkText.single = function(a, b) {
  return bot.locators.linkText.single_(a, b, !0);
};
bot.locators.partialLinkText.many = function(a, b) {
  return bot.locators.linkText.many_(a, b, !0);
};
bot.locators.name = {};
bot.locators.name.single = function(a, b) {
  b = goog.dom.getDomHelper(b).getElementsByTagNameAndClass("*", null, b);
  return goog.array.find(b, function(b) {
    return bot.dom.core.getAttribute(b, "name") == a;
  });
};
bot.locators.name.many = function(a, b) {
  b = goog.dom.getDomHelper(b).getElementsByTagNameAndClass("*", null, b);
  return goog.array.filter(b, function(b) {
    return bot.dom.core.getAttribute(b, "name") == a;
  });
};
bot.locators.STRATEGIES_ = {className:bot.locators.className, "class name":bot.locators.className, css:bot.locators.css, "css selector":bot.locators.css, id:bot.locators.id, linkText:bot.locators.linkText, "link text":bot.locators.linkText, name:bot.locators.name, partialLinkText:bot.locators.partialLinkText, "partial link text":bot.locators.partialLinkText, tagName:bot.locators.tagName, "tag name":bot.locators.tagName, xpath:bot.locators.xpath};
bot.locators.add = function(a, b) {
  bot.locators.STRATEGIES_[a] = b;
};
bot.locators.getOnlyKey = function(a) {
  for (var b in a) {
    if (a.hasOwnProperty(b)) {
      return b;
    }
  }
  return null;
};
bot.locators.findElement = function(a, b) {
  var c = bot.locators.getOnlyKey(a);
  if (c) {
    var d = bot.locators.STRATEGIES_[c];
    if (d && goog.isFunction(d.single)) {
      return b = b || bot.getDocument(), d.single(a[c], b);
    }
  }
  throw Error("Unsupported locator strategy: " + c);
};
bot.locators.findElements = function(a, b) {
  var c = bot.locators.getOnlyKey(a);
  if (c) {
    var d = bot.locators.STRATEGIES_[c];
    if (d && goog.isFunction(d.many)) {
      return b = b || bot.getDocument(), d.many(a[c], b);
    }
  }
  throw Error("Unsupported locator strategy: " + c);
};
fxdriver.events = {};
fxdriver.events.buildCoordinates = function(a, b) {
  b = a.element ? Utils.getElementAt(a.element, b) : null;
  var c = "xoffset" in a ? a.xoffset : null;
  a = "yoffset" in a ? a.yoffset : null;
  goog.isNull(c) && b && (a = goog.style.getSize(b), c = a.width / 2, a = a.height / 2);
  return {x:c, y:a, auxiliary:b, QueryInterface:fxdriver.moz.queryInterface(this, [CI.nsISupports, CI.wdICoordinate])};
};
fxdriver.preconditions = {};
fxdriver.preconditions.visible = function(a, b) {
  a = Utils.getElementAt(b.id, a);
  if (bot.dom.core.isElement(a, "INPUT") && (b = a.getAttribute("type")) && "file" == b.toLowerCase()) {
    return;
  }
  if (!bot.dom.isShown(a, !0)) {
    return new WebDriverError(bot.ErrorCode.ELEMENT_NOT_VISIBLE, "Element is not currently visible and so may not be interacted with");
  }
};
fxdriver.preconditions.enabled = function(a, b) {
  a = Utils.getElementAt(b.id, a);
  if (!bot.dom.isEnabled(a)) {
    return new WebDriverError(bot.ErrorCode.INVALID_ELEMENT_STATE, "Element is disabled and so may not be used for actions");
  }
};
fxdriver.preconditions.writable = function(a, b) {
  if (Utils.getElementAt(b.id, a).readOnly) {
    return new WebDriverError(bot.ErrorCode.INVALID_ELEMENT_STATE, "Element is read-only and so may not be used for actions");
  }
};
fxdriver.preconditions.noAlertPresent = function(a) {
  if (a.modalOpen) {
    return new WebDriverError(bot.ErrorCode.UNEXPECTED_ALERT_OPEN, "A modal dialog, such as an alert, is open.");
  }
};
fxdriver.preconditions.alertPresent = function(a) {
  if (!a.modalOpen) {
    return new WebDriverError(bot.ErrorCode.NO_SUCH_ALERT, "A modal dialog, such as an alert, is not open.");
  }
};
bot.Device = function(a, b) {
  this.element_ = bot.getDocument().documentElement;
  this.select_ = null;
  var c = bot.dom.getActiveElement(this.element_);
  c && this.setElement(c);
  this.modifiersState = a || new bot.Device.ModifiersState;
  this.eventEmitter = b || new bot.Device.EventEmitter;
};
bot.Device.prototype.getElement = function() {
  return this.element_;
};
bot.Device.prototype.setElement = function(a) {
  this.element_ = a;
  bot.dom.core.isElement(a, "OPTION") ? this.select_ = goog.dom.getAncestor(a, function(a) {
    return bot.dom.core.isElement(a, "SELECT");
  }) : this.select_ = null;
};
bot.Device.prototype.fireHtmlEvent = function(a) {
  return this.eventEmitter.fireHtmlEvent(this.element_, a);
};
bot.Device.prototype.fireKeyboardEvent = function(a, b) {
  return this.eventEmitter.fireKeyboardEvent(this.element_, a, b);
};
bot.Device.prototype.fireMouseEvent = function(a, b, c, d, f, g, h, k) {
  if (!g && !bot.dom.isInteractable(this.element_)) {
    return !1;
  }
  if (d && bot.events.EventType.MOUSEOVER != a && bot.events.EventType.MOUSEOUT != a) {
    throw new bot.Error(bot.ErrorCode.INVALID_ELEMENT_STATE, "Event type does not allow related target: " + a);
  }
  b = {clientX:b.x, clientY:b.y, button:c, altKey:this.modifiersState.isAltPressed(), ctrlKey:this.modifiersState.isControlPressed(), shiftKey:this.modifiersState.isShiftPressed(), metaKey:this.modifiersState.isMetaPressed(), wheelDelta:f || 0, relatedTarget:d || null, count:k || 1};
  h = h || bot.Device.MOUSE_MS_POINTER_ID;
  c = this.element_;
  a != bot.events.EventType.CLICK && a != bot.events.EventType.MOUSEDOWN && h in bot.Device.pointerElementMap_ ? c = bot.Device.pointerElementMap_[h] : this.select_ && (c = this.getTargetOfOptionMouseEvent_(a));
  return c ? this.eventEmitter.fireMouseEvent(c, a, b) : !0;
};
bot.Device.prototype.fireTouchEvent = function(a, b, c, d, f) {
  function g(b, c) {
    b = {identifier:b, screenX:c.x, screenY:c.y, clientX:c.x, clientY:c.y, pageX:c.x + k.x, pageY:c.y + k.y};
    h.changedTouches.push(b);
    if (a == bot.events.EventType.TOUCHSTART || a == bot.events.EventType.TOUCHMOVE) {
      h.touches.push(b), h.targetTouches.push(b);
    }
  }
  var h = {touches:[], targetTouches:[], changedTouches:[], altKey:this.modifiersState.isAltPressed(), ctrlKey:this.modifiersState.isControlPressed(), shiftKey:this.modifiersState.isShiftPressed(), metaKey:this.modifiersState.isMetaPressed(), relatedTarget:null, scale:0, rotation:0}, k = goog.dom.getDomHelper(this.element_).getDocumentScroll();
  g(b, c);
  goog.isDef(d) && g(d, f);
  return this.eventEmitter.fireTouchEvent(this.element_, a, h);
};
bot.Device.prototype.fireMSPointerEvent = function(a, b, c, d, f, g, h, k) {
  if (!k && !bot.dom.isInteractable(this.element_)) {
    return !1;
  }
  if (h && bot.events.EventType.MSPOINTEROVER != a && bot.events.EventType.MSPOINTEROUT != a) {
    throw new bot.Error(bot.ErrorCode.INVALID_ELEMENT_STATE, "Event type does not allow related target: " + a);
  }
  b = {clientX:b.x, clientY:b.y, button:c, altKey:!1, ctrlKey:!1, shiftKey:!1, metaKey:!1, relatedTarget:h || null, width:0, height:0, pressure:0, rotation:0, pointerId:d, tiltX:0, tiltY:0, pointerType:f, isPrimary:g};
  c = this.select_ ? this.getTargetOfOptionMouseEvent_(a) : this.element_;
  bot.Device.pointerElementMap_[d] && (c = bot.Device.pointerElementMap_[d]);
  d = goog.dom.getWindow(goog.dom.getOwnerDocument(this.element_));
  if (d && a == bot.events.EventType.MSPOINTERDOWN) {
    var m = d.Element.prototype.msSetPointerCapture;
    d.Element.prototype.msSetPointerCapture = function(a) {
      bot.Device.pointerElementMap_[a] = this;
    };
  }
  a = c ? this.eventEmitter.fireMSPointerEvent(c, a, b) : !0;
  m && (d.Element.prototype.msSetPointerCapture = m);
  return a;
};
bot.Device.prototype.getTargetOfOptionMouseEvent_ = function(a) {
  if (goog.userAgent.IE) {
    switch(a) {
      case bot.events.EventType.MOUSEOVER:
      case bot.events.EventType.MSPOINTEROVER:
        return null;
      case bot.events.EventType.CONTEXTMENU:
      case bot.events.EventType.MOUSEMOVE:
      case bot.events.EventType.MSPOINTERMOVE:
        return this.select_.multiple ? this.select_ : null;
      default:
        return this.select_;
    }
  }
  if (goog.userAgent.WEBKIT) {
    switch(a) {
      case bot.events.EventType.CLICK:
      case bot.events.EventType.MOUSEUP:
        return this.select_.multiple ? this.element_ : this.select_;
      default:
        return this.select_.multiple ? this.element_ : null;
    }
  }
  return this.element_;
};
bot.Device.prototype.clickElement = function(a, b, c, d) {
  if (c || bot.dom.isInteractable(this.element_)) {
    var f = null, g = null;
    if (!bot.Device.ALWAYS_FOLLOWS_LINKS_ON_CLICK_) {
      for (var h = this.element_; h; h = h.parentNode) {
        if (bot.dom.core.isElement(h, "A")) {
          f = h;
          break;
        } else {
          if (bot.Device.isFormSubmitElement(h)) {
            g = h;
            break;
          }
        }
      }
    }
    var k = (h = !this.select_ && bot.dom.core.isSelectable(this.element_)) && bot.dom.core.isSelected(this.element_);
    goog.userAgent.IE && g ? g.click() : this.fireMouseEvent(bot.events.EventType.CLICK, a, b, null, 0, c, d) && (f && bot.Device.shouldFollowHref_(f) ? bot.Device.followHref_(f) : h && this.toggleRadioButtonOrCheckbox_(k));
  }
};
bot.Device.prototype.focusOnElement = function() {
  var a = goog.dom.getAncestor(this.element_, function(a) {
    return !!a && bot.dom.core.isElement(a) && bot.dom.isFocusable(a);
  }, !0), a = a || this.element_, b = bot.dom.getActiveElement(a);
  if (a == b) {
    return !1;
  }
  if (b && (goog.isFunction(b.blur) || goog.userAgent.IE && goog.isObject(b.blur))) {
    if (!bot.dom.core.isElement(b, "BODY")) {
      try {
        b.blur();
      } catch (c) {
        if (!goog.userAgent.IE || "Unspecified error." != c.message) {
          throw c;
        }
      }
    }
    goog.userAgent.IE && !bot.userAgent.isEngineVersion(8) && goog.dom.getWindow(goog.dom.getOwnerDocument(a)).focus();
  }
  return goog.isFunction(a.focus) || goog.userAgent.IE && goog.isObject(a.focus) ? (a.focus(), !0) : !1;
};
bot.Device.ALWAYS_FOLLOWS_LINKS_ON_CLICK_ = goog.userAgent.WEBKIT || bot.userAgent.FIREFOX_EXTENSION && bot.userAgent.isProductVersion(3.6);
bot.Device.isFormSubmitElement = function(a) {
  if (bot.dom.core.isElement(a, "INPUT")) {
    var b = a.type.toLowerCase();
    if ("submit" == b || "image" == b) {
      return !0;
    }
  }
  return bot.dom.core.isElement(a, "BUTTON") && (b = a.type.toLowerCase(), "submit" == b) ? !0 : !1;
};
bot.Device.shouldFollowHref_ = function(a) {
  if (bot.Device.ALWAYS_FOLLOWS_LINKS_ON_CLICK_ || !a.href) {
    return !1;
  }
  if (!bot.userAgent.FIREFOX_EXTENSION && !bot.userAgent.WEBEXTENSION) {
    return !0;
  }
  if (a.target || 0 == a.href.toLowerCase().indexOf("javascript")) {
    return !1;
  }
  var b = goog.dom.getWindow(goog.dom.getOwnerDocument(a)), c = b.location.href;
  a = bot.Device.resolveUrl_(b.location, a.href);
  return c.split("#")[0] !== a.split("#")[0];
};
bot.Device.followHref_ = function(a) {
  var b = a.href, c = goog.dom.getWindow(goog.dom.getOwnerDocument(a));
  goog.userAgent.IE && !bot.userAgent.isEngineVersion(8) && (b = bot.Device.resolveUrl_(c.location, b));
  a.target ? c.open(b, a.target) : c.location.href = b;
};
bot.Device.prototype.maybeToggleOption = function() {
  if (this.select_ && bot.dom.isInteractable(this.element_)) {
    var a = this.select_, b = bot.dom.core.isSelected(this.element_);
    if (!b || a.multiple) {
      this.element_.selected = !b, (!goog.userAgent.WEBKIT || !a.multiple || goog.userAgent.product.CHROME && bot.userAgent.isProductVersion(28) || goog.userAgent.product.ANDROID && bot.userAgent.isProductVersion(4)) && bot.events.fire(a, bot.events.EventType.CHANGE);
    }
  }
};
bot.Device.prototype.toggleRadioButtonOrCheckbox_ = function(a) {
  goog.userAgent.GECKO || goog.userAgent.WEBKIT || a && "radio" == this.element_.type.toLowerCase() || (this.element_.checked = !a);
};
bot.Device.findAncestorForm = function(a) {
  return goog.dom.getAncestor(a, bot.Device.isForm_, !0);
};
bot.Device.isForm_ = function(a) {
  return bot.dom.core.isElement(a, "FORM");
};
bot.Device.prototype.submitForm = function(a) {
  if (!bot.Device.isForm_(a)) {
    throw new bot.Error(bot.ErrorCode.INVALID_ELEMENT_STATE, "Element is not a form, so could not submit.");
  }
  if (bot.events.fire(a, bot.events.EventType.SUBMIT)) {
    if (bot.dom.core.isElement(a.submit)) {
      if (!goog.userAgent.IE || bot.userAgent.isEngineVersion(8)) {
        a.constructor.prototype.submit.call(a);
      } else {
        var b = bot.locators.findElements({id:"submit"}, a), c = bot.locators.findElements({name:"submit"}, a);
        goog.array.forEach(b, function(a) {
          a.removeAttribute("id");
        });
        goog.array.forEach(c, function(a) {
          a.removeAttribute("name");
        });
        a = a.submit;
        goog.array.forEach(b, function(a) {
          a.setAttribute("id", "submit");
        });
        goog.array.forEach(c, function(a) {
          a.setAttribute("name", "submit");
        });
        a();
      }
    } else {
      a.submit();
    }
  }
};
bot.Device.URL_REGEXP_ = /^([^:/?#.]+:)?(?:\/\/([^/]*))?([^?#]+)?(\?[^#]*)?(#.*)?$/;
bot.Device.resolveUrl_ = function(a, b) {
  var c = b.match(bot.Device.URL_REGEXP_);
  if (!c) {
    return "";
  }
  b = c[1] || "";
  var d = c[2] || "", f = c[3] || "", g = c[4] || "", c = c[5] || "";
  if (!b && (b = a.protocol, !d)) {
    if (d = a.host, !f) {
      f = a.pathname, g = g || a.search;
    } else {
      if ("/" != f.charAt(0)) {
        var h = a.pathname.lastIndexOf("/");
        -1 != h && (f = a.pathname.substr(0, h + 1) + f);
      }
    }
  }
  return b + "//" + d + f + g + c;
};
bot.Device.ModifiersState = function() {
  this.pressedModifiers_ = 0;
};
bot.Device.Modifier = {SHIFT:1, CONTROL:2, ALT:4, META:8};
bot.Device.ModifiersState.prototype.isPressed = function(a) {
  return 0 != (this.pressedModifiers_ & a);
};
bot.Device.ModifiersState.prototype.setPressed = function(a, b) {
  this.pressedModifiers_ = b ? this.pressedModifiers_ | a : this.pressedModifiers_ & ~a;
};
bot.Device.ModifiersState.prototype.isShiftPressed = function() {
  return this.isPressed(bot.Device.Modifier.SHIFT);
};
bot.Device.ModifiersState.prototype.isControlPressed = function() {
  return this.isPressed(bot.Device.Modifier.CONTROL);
};
bot.Device.ModifiersState.prototype.isAltPressed = function() {
  return this.isPressed(bot.Device.Modifier.ALT);
};
bot.Device.ModifiersState.prototype.isMetaPressed = function() {
  return this.isPressed(bot.Device.Modifier.META);
};
bot.Device.MOUSE_MS_POINTER_ID = 1;
bot.Device.pointerElementMap_ = {};
bot.Device.getPointerElement = function(a) {
  return bot.Device.pointerElementMap_[a];
};
bot.Device.clearPointerMap = function() {
  bot.Device.pointerElementMap_ = {};
};
bot.Device.EventEmitter = function() {
};
bot.Device.EventEmitter.prototype.fireHtmlEvent = function(a, b) {
  return bot.events.fire(a, b);
};
bot.Device.EventEmitter.prototype.fireKeyboardEvent = function(a, b, c) {
  return bot.events.fire(a, b, c);
};
bot.Device.EventEmitter.prototype.fireMouseEvent = function(a, b, c) {
  return bot.events.fire(a, b, c);
};
bot.Device.EventEmitter.prototype.fireTouchEvent = function(a, b, c) {
  return bot.events.fire(a, b, c);
};
bot.Device.EventEmitter.prototype.fireMSPointerEvent = function(a, b, c) {
  return bot.events.fire(a, b, c);
};
bot.frame = {};
bot.frame.defaultContent = function() {
  return bot.getWindow().top;
};
bot.frame.activeElement = function() {
  return document.activeElement || document.body;
};
bot.frame.parentFrame = function(a) {
  return (a || bot.getWindow()).parent;
};
bot.frame.getFrameWindow = function(a) {
  if (bot.frame.isFrame_(a)) {
    return goog.dom.getFrameContentWindow(a);
  }
  throw new bot.Error(bot.ErrorCode.NO_SUCH_FRAME, "The given element isn't a frame or an iframe.");
};
bot.frame.isFrame_ = function(a) {
  return bot.dom.core.isElement(a, "FRAME") || bot.dom.core.isElement(a, "IFRAME");
};
bot.frame.findFrameByNameOrId = function(a, b) {
  for (var c = b || bot.getWindow(), d = c.frames.length, f = 0; f < d; f++) {
    var g = c.frames[f];
    b = g.frameElement || g;
    if (b.name == a) {
      return g.document ? g : goog.dom.getFrameContentWindow(g);
    }
  }
  a = bot.locators.findElements({id:a}, c.document);
  for (f = 0; f < a.length; f++) {
    if ((b = a[f]) && bot.frame.isFrame_(b)) {
      return goog.dom.getFrameContentWindow(b);
    }
  }
  return null;
};
bot.frame.findFrameByIndex = function(a, b) {
  return (b || bot.getWindow()).frames[a] || null;
};
bot.frame.getFrameIndex = function(a, b) {
  try {
    var c = a.contentWindow;
  } catch (d) {
    return null;
  }
  if (!bot.frame.isFrame_(a)) {
    return null;
  }
  a = b || bot.getWindow();
  for (b = 0; b < a.frames.length; b++) {
    if (c == a.frames[b]) {
      return b;
    }
  }
  return null;
};
var FirefoxDriver = function(a, b, c) {
  this.server = a;
  this.window = b;
  this.pageLoadStrategy = c || "normal";
  this.alertTimeout = 2000;
  this.currentY = this.currentX = 0;
  FirefoxDriver.prototype.dismissAlert.preconditions = [function() {
    fxdriver.preconditions.alertPresent(this);
  }];
  FirefoxDriver.prototype.acceptAlert.preconditions = [function() {
    fxdriver.preconditions.alertPresent(this);
  }];
  FirefoxDriver.prototype.getAlertText.preconditions = [function() {
    fxdriver.preconditions.alertPresent(this);
  }];
  FirefoxDriver.prototype.setAlertValue.preconditions = [function() {
    fxdriver.preconditions.alertPresent(this);
  }];
  FirefoxDriver.listenerScript = Utils.loadUrl("resource://fxdriver/evaluate.js");
  this.jsTimer = new fxdriver.Timer;
  this.mouse = Utils.newInstance("@googlecode.com/webdriver/syntheticmouse;1", "wdIMouse");
  this.modifierKeysState = Utils.newInstance("@googlecode.com/webdriver/modifierkeys;1", "wdIModifierKeys");
  this.mouse.initialize(this.modifierKeysState);
};
FirefoxDriver.LOG_ = fxdriver.logging.getLogger("fxdriver.FirefoxDriver");
FirefoxDriver.prototype.__defineGetter__("id", function() {
  this.id_ || (this.id_ = this.server.getNextId());
  return this.id_;
});
FirefoxDriver.prototype.getCurrentWindowHandle = function(a) {
  a.value = this.id;
  a.send();
};
FirefoxDriver.prototype.getCurrentUrl = function(a) {
  a.value = "" + a.session.getBrowser().contentWindow.location;
  a.send();
};
FirefoxDriver.prototype.get = function(a, b) {
  b = b.url;
  var c = a.session.getWindow().location;
  try {
    var d = fxdriver.io.isLoadExpected(c, b);
  } catch (f) {
    if (goog.log.warning(FirefoxDriver.LOG_, f), c = f.QueryInterface ? f.QueryInterface(Components.interfaces.nsIException) : f, "NS_ERROR_MALFORMED_URI" == c.name) {
      goog.log.warning(FirefoxDriver.LOG_, c.name);
      a.sendError(new WebDriverError(bot.ErrorCode.UNKNOWN_ERROR, "Target URL " + b + " is not well-formed."));
      return;
    }
  }
  d && Utils.initWebLoadingListener(a, a.session.getWindow());
  a.session.getBrowser().loadURI(b);
  d || (goog.log.info(FirefoxDriver.LOG_, "No load event expected"), a.send());
};
FirefoxDriver.prototype.close = function(a) {
  for (var b = fxdriver.moz.getService("@mozilla.org/appshell/window-mediator;1", "nsIWindowMediator"), c = fxdriver.moz.getService("@mozilla.org/toolkit/app-startup;1", "nsIAppStartup"), d = Components.interfaces.nsIAppStartup.eForceQuit, f = 0, b = b.getEnumerator("navigator:browser"); b.hasMoreElements();) {
    f += 1, b.getNext();
  }
  try {
    a.session.getBrowser().contentWindow.close();
  } catch (g) {
    goog.log.warning(FirefoxDriver.LOG_, "Error closing window", g);
  }
  1 == f ? (a.send(), FirefoxDriver.nstimer = new fxdriver.Timer, FirefoxDriver.nstimer.setTimeout(function(a) {
    c.quit(d);
  }, 500)) : a.send();
};
function cloneInto(a, b) {
  return bot.userAgent.isProductVersion(33) ? Components.utils.cloneInto(a, b, {wrapReflectors:!0}) : a;
}
function injectAndExecuteScript(a, b, c, d) {
  var f = a.session.getDocument(), g = fxdriver.moz.unwrap(f), h = b.script, k = Utils.unwrapParameters(b.args, f);
  if (f.designMode && "on" == f.designMode.toLowerCase()) {
    if (c) {
      a.sendError("Document designMode is enabled; advanced operations, like asynchronous script execution, are not supported. For more information, see https://developer.mozilla.org/en/rich-text_editing_in_mozilla#Internet_Explorer_Differences");
      return;
    }
    goog.log.info(FirefoxDriver.LOG_, "Window in design mode, falling back to sandbox: " + f.designMode);
    var m = a.session.getWindow(), m = m.wrappedJSObject, p = new Components.utils.Sandbox(m);
    p.window = m;
    p.document = f.wrappedJSObject ? f.wrappedJSObject : f;
    p.navigator = m.navigator;
    try {
      p.__webdriverParams = cloneInto(k, p);
      var r = Components.utils.evalInSandbox("with(window) { var __webdriverFunc = function(){" + b.script + "};  __webdriverFunc.apply(null, __webdriverParams); }", p);
      a.value = Utils.wrapResult(r, f);
      a.send();
      return;
    } catch (u) {
      throw new WebDriverError(bot.ErrorCode.JAVASCRIPT_ERROR, u);
    }
  }
  var l = this, t = function() {
    l.modalOpen || a.sendError(new WebDriverError(bot.ErrorCode.JAVASCRIPT_ERROR, "waiting for evaluate.js load failed"));
  }, q = function() {
    return g.__webdriver_evaluate && !!g.__webdriver_evaluate.attached;
  }, n = function() {
    k.forEach(function(a) {
      if ("object" === goog.typeOf(a)) {
        var b = {};
        Object.keys(a).forEach(function(a) {
          b[a] = "rw";
        });
        Object.defineProperty(a, "__exposedProps__", {enumerable:!1, configurable:!1, writable:!0, value:b});
      }
    });
    g.__webdriver_evaluate.args = cloneInto(k, g.__webdriver_evaluate);
    g.__webdriver_evaluate.async = c;
    g.__webdriver_evaluate.script = h;
    g.__webdriver_evaluate.timeout = a.session.getScriptTimeout();
    var b = function(c) {
      f.removeEventListener("webdriver-evaluate-response", b, !0);
      if (!l.modalOpen) {
        c = g.__webdriver_evaluate.result;
        try {
          a.value = Utils.wrapResult(c, f);
        } catch (v) {
          a.sendError(new WebDriverError(bot.ErrorCode.JAVASCRIPT_ERROR, v));
        }
        a.status = g.__webdriver_evaluate.code;
        bot.userAgent.isProductVersion(23) || delete g.__webdriver_evaluate;
        a.send();
      }
    };
    f.addEventListener("webdriver-evaluate-response", b, !0);
    var d = f.createEvent("Events");
    d.initEvent("webdriver-evaluate", !1, !0);
    f.dispatchEvent(d);
  };
  d.runWhenTrue(function() {
    return !!Utils.getMainDocumentElement(f);
  }, function() {
    if (!f.__webdriver_evaluate || !f.__webdriver_evaluate.attached) {
      var a = Utils.getMainDocumentElement(f), b = Utils.isSVG(f) ? f.createElementNS("http://www.w3.org/2000/svg", "script") : f.createElement("script");
      b.setAttribute("type", "text/javascript");
      b.textContent = FirefoxDriver.listenerScript;
      a.appendChild(b);
      a.removeChild(b);
    }
    d.runWhenTrue(q, n, 10000, t);
  }, 10000, function() {
    l.modalOpen || a.sendError(new WebDriverError(bot.ErrorCode.JAVASCRIPT_ERROR, "waiting for doc.body failed"));
  });
}
FirefoxDriver.prototype.executeScript = function(a, b) {
  injectAndExecuteScript(a, b, !1, this.jsTimer);
};
FirefoxDriver.prototype.executeAsyncScript = function(a, b) {
  injectAndExecuteScript(a, b, !0, this.jsTimer);
};
FirefoxDriver.prototype.getTitle = function(a) {
  a.value = a.session.getBrowser().contentTitle;
  a.send();
};
FirefoxDriver.prototype.getPageSource = function(a) {
  var b = a.session.getWindow(), c = b.document.documentElement;
  c ? "text/plain" == b.document.contentType ? (a.value = b.document.documentElement.textContent, a.send()) : (c.removeAttribute("webdriver"), c.removeAttribute("command"), c.removeAttribute("response"), a.value = (new b.XMLSerializer).serializeToString(b.document), a.send(), c.setAttribute("webdriver", "true")) : (a.value = "", a.send());
};
FirefoxDriver.annotateInvalidSelectorError_ = function(a, b) {
  if (b.code == bot.ErrorCode.INVALID_SELECTOR_ERROR) {
    return new WebDriverError(bot.ErrorCode.INVALID_SELECTOR_ERROR, "The given selector " + a + " is either invalid or does not result in a WebElement. The following error occurred:\n" + b);
  }
  try {
    var c = b.QueryInterface(Components.interfaces.nsIException);
    goog.log.info(FirefoxDriver.LOG_, "Converted the exception: " + c.name);
    if ("NS_ERROR_DOM_SYNTAX_ERR" == c.name) {
      return new WebDriverError(bot.ErrorCode.INVALID_SELECTOR_ERROR, "The given selector " + a + " is either invalid or does not result in a WebElement. The following error occurred:\n" + b);
    }
  } catch (d) {
  }
  return b;
};
FirefoxDriver.prototype.findElementInternal_ = function(a, b, c, d, f) {
  f = goog.isNumber(f) ? f : goog.now();
  var g = a.session.getDocument();
  try {
    var h = goog.isString(d) ? Utils.getElementAt(d, g) : g, g = {};
    g[b] = c;
    var k = bot.locators.findElement(g, h);
    if (k) {
      var m = Utils.addToKnownElements(k);
      a.value = {ELEMENT:m, "element-6066-11e4-a52e-4f735466cecf":m};
      return a.send();
    }
    var p = a.session.getImplicitWait();
    if (0 == p || goog.now() - f > p) {
      return a.sendError(new WebDriverError(bot.ErrorCode.NO_SUCH_ELEMENT, "Unable to locate element: " + JSON.stringify({method:b, selector:c})));
    }
    var r = goog.bind(this.findElementInternal_, this, a, b, c, d, f);
    this.jsTimer.setTimeout(r, 100);
  } catch (l) {
    l = FirefoxDriver.annotateInvalidSelectorError_(c, l), a.sendError(l);
  }
};
FirefoxDriver.prototype.findElement = function(a, b) {
  this.findElementInternal_(a, b.using, b.value);
};
FirefoxDriver.prototype.findChildElement = function(a, b) {
  this.findElementInternal_(a, b.using, b.value, b.id);
};
FirefoxDriver.prototype.findElementsInternal_ = function(a, b, c, d, f) {
  f = goog.isNumber(f) ? f : goog.now();
  var g = a.session.getDocument();
  try {
    var h = goog.isString(d) ? Utils.getElementAt(d, g) : g, g = {};
    g[b] = c;
    for (var k = bot.locators.findElements(g, h), h = [], g = 0; g < k.length; g++) {
      var m = Utils.addToKnownElements(k[g]);
      h.push({ELEMENT:m, "element-6066-11e4-a52e-4f735466cecf":m});
    }
    var p = a.session.getImplicitWait();
    if (p && !k.length && goog.now() - f <= p) {
      var r = goog.bind(this.findElementsInternal_, this, a, b, c, d, f);
      this.jsTimer.setTimeout(r, 10);
    } else {
      a.value = h, a.send();
    }
  } catch (l) {
    l = FirefoxDriver.annotateInvalidSelectorError_(c, l), a.sendError(l);
  }
};
FirefoxDriver.prototype.findElements = function(a, b) {
  this.findElementsInternal_(a, b.using, b.value);
};
FirefoxDriver.prototype.findChildElements = function(a, b) {
  this.findElementsInternal_(a, b.using, b.value, b.id);
};
FirefoxDriver.prototype.switchToFrame = function(a, b) {
  var c = fxdriver.moz.unwrapXpcOnly(a.session.getWindow()), d = !goog.isDef(b.id) || goog.isNull(b.id);
  c && !c.closed || d || a.sendError(new WebDriverError(bot.ErrorCode.NO_SUCH_FRAME, "Current window is closed"));
  var f = null;
  if (d) {
    goog.log.info(FirefoxDriver.LOG_, "Switching to default content (topmost frame)"), f = a.session.getBrowser().contentWindow;
  } else {
    if (goog.isString(b.id)) {
      goog.log.info(FirefoxDriver.LOG_, "Switching to frame with name or ID: " + b.id), f = bot.frame.findFrameByNameOrId(b.id, c);
    } else {
      if (goog.isNumber(b.id)) {
        goog.log.info(FirefoxDriver.LOG_, "Switching to frame by index: " + b.id), f = bot.frame.findFrameByIndex(b.id, c);
      } else {
        if (goog.isObject(b.id) && "ELEMENT" in b.id || "element-6066-11e4-a52e-4f735466cecf" in b.id) {
          d = b.id["element-6066-11e4-a52e-4f735466cecf"] ? b.id["element-6066-11e4-a52e-4f735466cecf"] : b.id.ELEMENT;
          goog.log.info(FirefoxDriver.LOG_, "Switching to frame by element: " + d);
          c = Utils.getElementAt(d, c.document);
          c = fxdriver.moz.unwrapFor4(c);
          if (!/^i?frame$/i.test(c.tagName)) {
            throw new WebDriverError(bot.ErrorCode.NO_SUCH_FRAME, "Element is not a frame element: " + c.tagName);
          }
          f = c.contentWindow;
        }
      }
    }
  }
  if (f) {
    f.frameElement ? (a.session.setWindow(f), a.session.setFrame(f.frameElement)) : a.session.setWindow(f), a.send();
  } else {
    throw new WebDriverError(bot.ErrorCode.NO_SUCH_FRAME, "Unable to locate frame: " + b.id);
  }
};
FirefoxDriver.prototype.switchToParentFrame = function(a) {
  var b = a.session.getWindow().parent;
  a.session.setWindow(b);
  a.session.setFrame(b.frameElement);
  a.send();
};
FirefoxDriver.prototype.getActiveElement = function(a) {
  var b = Utils.getActiveElement(a.session.getDocument()), b = Utils.addToKnownElements(b);
  a.value = {ELEMENT:b, "element-6066-11e4-a52e-4f735466cecf":b};
  a.send();
};
FirefoxDriver.prototype.goBack = function(a) {
  var b = a.session.getBrowser();
  b.canGoBack && b.goBack();
  a.send();
};
FirefoxDriver.prototype.goForward = function(a) {
  var b = a.session.getBrowser();
  b.canGoForward && b.goForward();
  a.send();
};
FirefoxDriver.prototype.refresh = function(a) {
  var b = a.session.getBrowser();
  Utils.initWebLoadingListener(a, b.contentWindow);
  b.contentWindow.location.reload(!0);
};
FirefoxDriver.prototype.addCookie = function(a, b) {
  b = b.cookie;
  var c = !1;
  if (!b.expiry) {
    var c = !0, d = new Date;
    d.setYear(2030);
    b.expiry = d.getTime() / 1000;
  }
  if (b.domain) {
    if (d = a.session.getWindow().location.host, -1 == d.indexOf(b.domain) && -1 == ".".concat(d).indexOf(b.domain)) {
      throw new WebDriverError(bot.ErrorCode.INVALID_COOKIE_DOMAIN, "You may only set cookies for the current domain");
    }
  } else {
    d = a.session.getWindow().location, b.domain = d.hostname;
  }
  b.domain.match(/:\d+$/) && (b.domain = b.domain.replace(/:\d+$/, ""));
  d = a.session.getDocument();
  if (!d || !d.contentType.match(/html/i)) {
    throw new WebDriverError(bot.ErrorCode.UNABLE_TO_SET_COOKIE, "You may only set cookies on html documents");
  }
  fxdriver.moz.getService("@mozilla.org/cookiemanager;1", "nsICookieManager2").add(b.domain, b.path, b.name, b.value, b.secure, b.httpOnly, c, b.expiry);
  a.send();
};
function getVisibleCookies(a) {
  var b = [], c = a.pathname;
  c || (c = "/");
  for (var d = fxdriver.moz.getService("@mozilla.org/cookiemanager;1", "nsICookieManager2").getCookiesFromHost(a.hostname); d.hasMoreElements();) {
    var f = d.getNext().QueryInterface(Components.interfaces.nsICookie2), g = a.hostname;
    do {
      if ((f.host == "." + g || f.host == g) && -1 != c.indexOf(f.path)) {
        b.push(f);
        break;
      }
      g = g.replace(/^.*?\./, "");
    } while (-1 != g.indexOf("."));
  }
  return b;
}
FirefoxDriver.prototype.getCookies = function(a) {
  for (var b = [], c = getVisibleCookies(a.session.getWindow().location), d = 0; d < c.length; d++) {
    var f = c[d], g = f.expires;
    0 == g ? g = null : 1 == g && (g = 0);
    b.push({name:f.name, value:f.value, path:f.path, domain:f.host, secure:f.isSecure, httpOnly:f.isHttpOnly, expiry:g});
  }
  a.value = b;
  a.send();
};
FirefoxDriver.prototype.deleteCookie = function(a, b) {
  b = b.name;
  for (var c = fxdriver.moz.getService("@mozilla.org/cookiemanager;1", "nsICookieManager"), d = getVisibleCookies(a.session.getWindow().location), f = 0; f < d.length; f++) {
    var g = d[f];
    g.name == b && c.remove(g.host, g.name, g.path, !1);
  }
  a.send();
};
FirefoxDriver.prototype.deleteAllCookies = function(a) {
  for (var b = fxdriver.moz.getService("@mozilla.org/cookiemanager;1", "nsICookieManager"), c = getVisibleCookies(a.session.getWindow().location), d = 0; d < c.length; d++) {
    var f = c[d];
    b.remove(f.host, f.name, f.path, !1);
  }
  a.send();
};
FirefoxDriver.prototype.setTimeout = function(a, b) {
  switch(b.type) {
    case "implicit":
      a.session.setImplicitWait(b.ms);
      break;
    case "page load":
      a.session.setPageLoadTimeout(b.ms);
      break;
    case "script":
      a.session.setScriptTimeout(b.ms);
      break;
    default:
      throw new WebDriverError(bot.ErrorCode.INVALID_ARGUMENT, "Unrecognised timeout type: " + b.type);
  }
  a.send();
};
FirefoxDriver.prototype.implicitlyWait = function(a, b) {
  a.session.setImplicitWait(b.ms);
  a.send();
};
FirefoxDriver.prototype.setScriptTimeout = function(a, b) {
  a.session.setScriptTimeout(b.ms);
  a.send();
};
FirefoxDriver.prototype.saveScreenshot = function(a, b) {
  var c = a.session.getBrowser().contentWindow;
  try {
    var d = fxdriver.screenshot.grab(c);
    try {
      fxdriver.screenshot.save(d, b);
    } catch (f) {
      throw new WebDriverError(bot.ErrorCode.UNKNOWN_ERROR, "Could not save screenshot to " + b + " - " + f);
    }
  } catch (f) {
    throw new WebDriverError(bot.ErrorCode.UNKNOWN_ERROR, "Could not take screenshot of current page - " + f);
  }
  a.send();
};
FirefoxDriver.prototype.screenshot = function(a) {
  var b = a.session.getBrowser().contentWindow;
  try {
    var c = fxdriver.screenshot.grab(b);
  } catch (d) {
    throw new WebDriverError(bot.ErrorCode.UNKNOWN_ERROR, "Could not take screenshot of current page - " + d);
  }
  try {
    a.value = fxdriver.screenshot.toBase64(c);
  } catch (d) {
    throw new WebDriverError(bot.ErrorCode.UNKNOWN_ERROR, "Could not convert screenshot to base64 - " + d);
  }
  a.send();
};
FirefoxDriver.prototype.dismissAlert = function(a) {
  var b = this;
  fxdriver.modals.isModalPresent(function(c) {
    c ? fxdriver.modals.dismissAlert(b) : (a.status = bot.ErrorCode.NO_SUCH_ALERT, a.value = {message:"No alert is present"});
    a.send();
  }, this.alertTimeout);
};
FirefoxDriver.prototype.acceptAlert = function(a) {
  var b = this;
  fxdriver.modals.isModalPresent(function(c) {
    c ? fxdriver.modals.acceptAlert(b) : (a.status = bot.ErrorCode.NO_SUCH_ALERT, a.value = {message:"No alert is present"});
    a.send();
  }, this.alertTimeout);
};
FirefoxDriver.prototype.getAlertText = function(a) {
  var b = this;
  fxdriver.modals.isModalPresent(function(c) {
    c ? a.value = fxdriver.modals.getText(b) : (a.status = bot.ErrorCode.NO_SUCH_ALERT, a.value = {message:"No alert is present"});
    a.send();
  }, this.alertTimeout);
};
FirefoxDriver.prototype.setAlertValue = function(a, b) {
  fxdriver.modals.isModalPresent(function(c) {
    c ? fxdriver.modals.setValue(b.text) : (a.status = bot.ErrorCode.NO_SUCH_ALERT, a.value = {message:"No alert is present"});
    a.send();
  }, this.alertTimeout);
};
FirefoxDriver.prototype.imeGetAvailableEngines = function(a) {
  throw new WebDriverError(bot.ErrorCode.IME_NOT_AVAILABLE, "IME not available on the host: " + e);
};
FirefoxDriver.prototype.imeGetActiveEngine = function(a) {
  throw new WebDriverError(bot.ErrorCode.IME_NOT_AVAILABLE, "IME not available on the host: " + e);
};
FirefoxDriver.prototype.imeIsActivated = function(a) {
  throw new WebDriverError(bot.ErrorCode.IME_NOT_AVAILABLE, "IME not available on the host: " + e);
};
FirefoxDriver.prototype.imeDeactivate = function(a) {
  throw new WebDriverError(bot.ErrorCode.IME_NOT_AVAILABLE, "IME not available on the host: " + e);
};
FirefoxDriver.prototype.imeActivateEngine = function(a, b) {
  throw new WebDriverError(bot.ErrorCode.IME_NOT_AVAILABLE, "IME not available on the host: " + e);
};
FirefoxDriver.prototype.getAppCacheStatus = function(a, b) {
  a.value = bot.appcache.getStatus(a.session.getBrowser().contentWindow);
  a.send();
};
function getElementFromLocation(a, b) {
  var c = Math.round(a.x), d = Math.round(a.y);
  a.initialized ? (a = b.elementFromPoint(c, d), goog.log.info(FirefoxDriver.LOG_, "Element from (" + c + "," + d + ") :" + a)) : (goog.log.info(FirefoxDriver.LOG_, "Mouse coordinates were not set - using body"), a = b.getElementsByTagName("body")[0]);
  return fxdriver.moz.unwrap(a);
}
FirefoxDriver.prototype.sendResponseFromSyntheticMouse_ = function(a, b) {
  a.code != bot.ErrorCode.OK ? b.sendError(new WebDriverError(a.code, a.message)) : (b.status = a.status, b.value = {message:a.message}, b.send());
};
FirefoxDriver.prototype.mouseMoveTo = function(a, b) {
  var c = a.session.getDocument();
  b = fxdriver.events.buildCoordinates(b, c);
  if (b.auxiliary) {
    var d = new goog.math.Coordinate(b.x, b.y);
    if (!bot.action.scrollIntoView(b.auxiliary, d) && !Utils.isSVG(b.auxiliary.ownerDocument) && !bot.dom.core.isElement(b.auxiliary, "OPTION")) {
      a.sendError(new WebDriverError(bot.ErrorCode.MOVE_TARGET_OUT_OF_BOUNDS, "Offset within element cannot be scrolled into view: " + d + ": " + b.auxiliary));
      return;
    }
  }
  c = b.auxiliary || c;
  goog.log.info(FirefoxDriver.LOG_, "Calling move with: " + b.x + ", " + b.y + ", " + c);
  c = this.mouse.move(c, b.x, b.y);
  this.sendResponseFromSyntheticMouse_(c, a);
};
FirefoxDriver.prototype.mouseButtonDown = function(a, b) {
  var c = a.session.getDocument();
  b = fxdriver.events.buildCoordinates(b, c);
  goog.log.info(FirefoxDriver.LOG_, "Calling down with: " + b.x + ", " + b.y + ", " + b.auxiliary);
  b = this.mouse.down(b);
  this.sendResponseFromSyntheticMouse_(b, a);
};
FirefoxDriver.prototype.mouseButtonUp = function(a, b) {
  var c = a.session.getDocument();
  b = fxdriver.events.buildCoordinates(b, c);
  goog.log.info(FirefoxDriver.LOG_, "Calling up with: " + b.x + ", " + b.y + ", " + b.auxiliary);
  b = this.mouse.up(b);
  this.sendResponseFromSyntheticMouse_(b, a);
};
FirefoxDriver.prototype.mouseClick = function(a, b) {
  Utils.installWindowCloseListener(a);
  Utils.installClickListener(a, WebLoadingListener);
  b = 2 == b.button ? this.mouse.contextClick(null) : this.mouse.click(null);
  this.sendResponseFromSyntheticMouse_(b, a);
};
FirefoxDriver.prototype.mouseDoubleClick = function(a, b) {
  Utils.installWindowCloseListener(a);
  Utils.installClickListener(a, WebLoadingListener);
  b = this.mouse.doubleClick(null);
  this.sendResponseFromSyntheticMouse_(b, a);
};
FirefoxDriver.prototype.sendKeysToActiveElement = function(a, b) {
  Utils.installWindowCloseListener(a);
  var c = Utils.getActiveElement(a.session.getDocument());
  c && "body" == c.tagName.toLowerCase() && c.ownerDocument.defaultView.frameElement && (c.ownerDocument.defaultView.focus(), c = c.ownerDocument.getElementsByTagName("html")[0]);
  Utils.type(a.session, c, b.value.join(""), this.jsTimer, !1, this.modifierKeysState);
  a.send();
};
FirefoxDriver.prototype.getWindowSize = function(a, b) {
  this.assertTargetsCurrentWindow_(b);
  b = bot.window.getSize(a.session.getWindow().top);
  a.value = {width:b.width, height:b.height};
  a.send();
};
FirefoxDriver.prototype.setWindowSize = function(a, b) {
  this.assertTargetsCurrentWindow_(b);
  b = new goog.math.Size(b.width, b.height);
  var c = a.session.getWindow().top;
  bot.window.setSize(b, c);
  a.send();
};
FirefoxDriver.prototype.getWindowPosition = function(a, b) {
  this.assertTargetsCurrentWindow_(b);
  b = bot.window.getPosition(a.session.getWindow().top);
  a.value = {x:b.x, y:b.y};
  a.send();
};
FirefoxDriver.prototype.setWindowPosition = function(a, b) {
  this.assertTargetsCurrentWindow_(b);
  b = new goog.math.Coordinate(b.x, b.y);
  var c = a.session.getWindow().top;
  bot.window.setPosition(b, c);
  a.send();
};
FirefoxDriver.prototype.maximizeWindow = function(a, b) {
  this.assertTargetsCurrentWindow_(b);
  b = a.session.getWindow();
  this.getChromeWindowFromDocumentWindow(b).maximize();
  a.send();
};
FirefoxDriver.prototype.getChromeWindowFromDocumentWindow = function(a) {
  for (var b = fxdriver.moz.getService("@mozilla.org/appshell/window-mediator;1", "nsIWindowMediator").getEnumerator("navigator:browser"); b.hasMoreElements();) {
    var c = b.getNext();
    if (c.gBrowser.contentWindow == a.top) {
      return c;
    }
  }
};
FirefoxDriver.prototype.assertTargetsCurrentWindow_ = function(a) {
  if ("current" != a.windowHandle) {
    throw new WebDriverError(bot.ErrorCode.UNSUPPORTED_OPERATION, "Window operations are only supported for the currently focused window.");
  }
};
bot.Keyboard = function(a) {
  bot.Device.call(this);
  this.editable_ = bot.dom.isEditable(this.getElement());
  this.currentPos_ = 0;
  this.pressed_ = new goog.structs.Set;
  a && (goog.array.forEach(a.pressed, function(a) {
    this.setKeyPressed_(a, !0);
  }, this), this.currentPos_ = a.currentPos || 0);
};
goog.inherits(bot.Keyboard, bot.Device);
bot.Keyboard.CHAR_TO_KEY_ = {};
bot.Keyboard.newKey_ = function(a, b, c) {
  goog.isObject(a) && (a = goog.userAgent.GECKO ? a.gecko : a.ieWebkit);
  a = new bot.Keyboard.Key(a, b, c);
  !b || b in bot.Keyboard.CHAR_TO_KEY_ && !c || (bot.Keyboard.CHAR_TO_KEY_[b] = {key:a, shift:!1}, c && (bot.Keyboard.CHAR_TO_KEY_[c] = {key:a, shift:!0}));
  return a;
};
bot.Keyboard.Key = function(a, b, c) {
  this.code = a;
  this.character = b || null;
  this.shiftChar = c || this.character;
};
bot.Keyboard.Keys = {BACKSPACE:bot.Keyboard.newKey_(8), TAB:bot.Keyboard.newKey_(9), ENTER:bot.Keyboard.newKey_(13), SHIFT:bot.Keyboard.newKey_(16), CONTROL:bot.Keyboard.newKey_(17), ALT:bot.Keyboard.newKey_(18), PAUSE:bot.Keyboard.newKey_(19), CAPS_LOCK:bot.Keyboard.newKey_(20), ESC:bot.Keyboard.newKey_(27), SPACE:bot.Keyboard.newKey_(32, " "), PAGE_UP:bot.Keyboard.newKey_(33), PAGE_DOWN:bot.Keyboard.newKey_(34), END:bot.Keyboard.newKey_(35), HOME:bot.Keyboard.newKey_(36), LEFT:bot.Keyboard.newKey_(37), 
UP:bot.Keyboard.newKey_(38), RIGHT:bot.Keyboard.newKey_(39), DOWN:bot.Keyboard.newKey_(40), PRINT_SCREEN:bot.Keyboard.newKey_(44), INSERT:bot.Keyboard.newKey_(45), DELETE:bot.Keyboard.newKey_(46), ZERO:bot.Keyboard.newKey_(48, "0", ")"), ONE:bot.Keyboard.newKey_(49, "1", "!"), TWO:bot.Keyboard.newKey_(50, "2", "@"), THREE:bot.Keyboard.newKey_(51, "3", "#"), FOUR:bot.Keyboard.newKey_(52, "4", "$"), FIVE:bot.Keyboard.newKey_(53, "5", "%"), SIX:bot.Keyboard.newKey_(54, "6", "^"), SEVEN:bot.Keyboard.newKey_(55, 
"7", "&"), EIGHT:bot.Keyboard.newKey_(56, "8", "*"), NINE:bot.Keyboard.newKey_(57, "9", "("), A:bot.Keyboard.newKey_(65, "a", "A"), B:bot.Keyboard.newKey_(66, "b", "B"), C:bot.Keyboard.newKey_(67, "c", "C"), D:bot.Keyboard.newKey_(68, "d", "D"), E:bot.Keyboard.newKey_(69, "e", "E"), F:bot.Keyboard.newKey_(70, "f", "F"), G:bot.Keyboard.newKey_(71, "g", "G"), H:bot.Keyboard.newKey_(72, "h", "H"), I:bot.Keyboard.newKey_(73, "i", "I"), J:bot.Keyboard.newKey_(74, "j", "J"), K:bot.Keyboard.newKey_(75, 
"k", "K"), L:bot.Keyboard.newKey_(76, "l", "L"), M:bot.Keyboard.newKey_(77, "m", "M"), N:bot.Keyboard.newKey_(78, "n", "N"), O:bot.Keyboard.newKey_(79, "o", "O"), P:bot.Keyboard.newKey_(80, "p", "P"), Q:bot.Keyboard.newKey_(81, "q", "Q"), R:bot.Keyboard.newKey_(82, "r", "R"), S:bot.Keyboard.newKey_(83, "s", "S"), T:bot.Keyboard.newKey_(84, "t", "T"), U:bot.Keyboard.newKey_(85, "u", "U"), V:bot.Keyboard.newKey_(86, "v", "V"), W:bot.Keyboard.newKey_(87, "w", "W"), X:bot.Keyboard.newKey_(88, "x", "X"), 
Y:bot.Keyboard.newKey_(89, "y", "Y"), Z:bot.Keyboard.newKey_(90, "z", "Z"), META:bot.Keyboard.newKey_(goog.userAgent.WINDOWS ? {gecko:91, ieWebkit:91} : goog.userAgent.MAC ? {gecko:224, ieWebkit:91} : {gecko:0, ieWebkit:91}), META_RIGHT:bot.Keyboard.newKey_(goog.userAgent.WINDOWS ? {gecko:92, ieWebkit:92} : goog.userAgent.MAC ? {gecko:224, ieWebkit:93} : {gecko:0, ieWebkit:92}), CONTEXT_MENU:bot.Keyboard.newKey_(goog.userAgent.WINDOWS ? {gecko:93, ieWebkit:93} : goog.userAgent.MAC ? {gecko:0, ieWebkit:0} : 
{gecko:93, ieWebkit:null}), NUM_ZERO:bot.Keyboard.newKey_({gecko:96, ieWebkit:96}, "0"), NUM_ONE:bot.Keyboard.newKey_({gecko:97, ieWebkit:97}, "1"), NUM_TWO:bot.Keyboard.newKey_({gecko:98, ieWebkit:98}, "2"), NUM_THREE:bot.Keyboard.newKey_({gecko:99, ieWebkit:99}, "3"), NUM_FOUR:bot.Keyboard.newKey_({gecko:100, ieWebkit:100}, "4"), NUM_FIVE:bot.Keyboard.newKey_({gecko:101, ieWebkit:101}, "5"), NUM_SIX:bot.Keyboard.newKey_({gecko:102, ieWebkit:102}, "6"), NUM_SEVEN:bot.Keyboard.newKey_({gecko:103, 
ieWebkit:103}, "7"), NUM_EIGHT:bot.Keyboard.newKey_({gecko:104, ieWebkit:104}, "8"), NUM_NINE:bot.Keyboard.newKey_({gecko:105, ieWebkit:105}, "9"), NUM_MULTIPLY:bot.Keyboard.newKey_({gecko:106, ieWebkit:106}, "*"), NUM_PLUS:bot.Keyboard.newKey_({gecko:107, ieWebkit:107}, "+"), NUM_MINUS:bot.Keyboard.newKey_({gecko:109, ieWebkit:109}, "-"), NUM_PERIOD:bot.Keyboard.newKey_({gecko:110, ieWebkit:110}, "."), NUM_DIVISION:bot.Keyboard.newKey_({gecko:111, ieWebkit:111}, "/"), NUM_LOCK:bot.Keyboard.newKey_(144), 
F1:bot.Keyboard.newKey_(112), F2:bot.Keyboard.newKey_(113), F3:bot.Keyboard.newKey_(114), F4:bot.Keyboard.newKey_(115), F5:bot.Keyboard.newKey_(116), F6:bot.Keyboard.newKey_(117), F7:bot.Keyboard.newKey_(118), F8:bot.Keyboard.newKey_(119), F9:bot.Keyboard.newKey_(120), F10:bot.Keyboard.newKey_(121), F11:bot.Keyboard.newKey_(122), F12:bot.Keyboard.newKey_(123), EQUALS:bot.Keyboard.newKey_({gecko:107, ieWebkit:187}, "=", "+"), SEPARATOR:bot.Keyboard.newKey_(108, ","), HYPHEN:bot.Keyboard.newKey_({gecko:109, 
ieWebkit:189}, "-", "_"), COMMA:bot.Keyboard.newKey_(188, ",", "<"), PERIOD:bot.Keyboard.newKey_(190, ".", ">"), SLASH:bot.Keyboard.newKey_(191, "/", "?"), BACKTICK:bot.Keyboard.newKey_(192, "`", "~"), OPEN_BRACKET:bot.Keyboard.newKey_(219, "[", "{"), BACKSLASH:bot.Keyboard.newKey_(220, "\\", "|"), CLOSE_BRACKET:bot.Keyboard.newKey_(221, "]", "}"), SEMICOLON:bot.Keyboard.newKey_({gecko:59, ieWebkit:186}, ";", ":"), APOSTROPHE:bot.Keyboard.newKey_(222, "'", '"')};
bot.Keyboard.Key.fromChar = function(a) {
  if (1 != a.length) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Argument not a single character: " + a);
  }
  var b = bot.Keyboard.CHAR_TO_KEY_[a];
  if (!b) {
    var b = a.toUpperCase(), c = b.charCodeAt(0), b = bot.Keyboard.newKey_(c, a.toLowerCase(), b), b = {key:b, shift:a != b.character};
  }
  return b;
};
bot.Keyboard.MODIFIERS = [bot.Keyboard.Keys.ALT, bot.Keyboard.Keys.CONTROL, bot.Keyboard.Keys.META, bot.Keyboard.Keys.SHIFT];
bot.Keyboard.MODIFIER_TO_KEY_MAP_ = function() {
  var a = new goog.structs.Map;
  a.set(bot.Device.Modifier.SHIFT, bot.Keyboard.Keys.SHIFT);
  a.set(bot.Device.Modifier.CONTROL, bot.Keyboard.Keys.CONTROL);
  a.set(bot.Device.Modifier.ALT, bot.Keyboard.Keys.ALT);
  a.set(bot.Device.Modifier.META, bot.Keyboard.Keys.META);
  return a;
}();
bot.Keyboard.KEY_TO_MODIFIER_ = function(a) {
  var b = new goog.structs.Map;
  goog.array.forEach(a.getKeys(), function(c) {
    b.set(a.get(c).code, c);
  });
  return b;
}(bot.Keyboard.MODIFIER_TO_KEY_MAP_);
bot.Keyboard.prototype.setKeyPressed_ = function(a, b) {
  if (goog.array.contains(bot.Keyboard.MODIFIERS, a)) {
    var c = bot.Keyboard.KEY_TO_MODIFIER_.get(a.code);
    this.modifiersState.setPressed(c, b);
  }
  b ? this.pressed_.add(a) : this.pressed_.remove(a);
};
bot.Keyboard.NEW_LINE_ = goog.userAgent.IE ? "\r\n" : "\n";
bot.Keyboard.prototype.isPressed = function(a) {
  return this.pressed_.contains(a);
};
bot.Keyboard.prototype.pressKey = function(a) {
  if (goog.array.contains(bot.Keyboard.MODIFIERS, a) && this.isPressed(a)) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Cannot press a modifier key that is already pressed.");
  }
  var b = !goog.isNull(a.code) && this.fireKeyEvent_(bot.events.EventType.KEYDOWN, a);
  !b && !goog.userAgent.GECKO || this.requiresKeyPress_(a) && !this.fireKeyEvent_(bot.events.EventType.KEYPRESS, a, !b) || !b || (this.maybeSubmitForm_(a), this.editable_ && this.maybeEditText_(a));
  this.setKeyPressed_(a, !0);
};
bot.Keyboard.prototype.requiresKeyPress_ = function(a) {
  if (a.character || a == bot.Keyboard.Keys.ENTER) {
    return !0;
  }
  if (goog.userAgent.WEBKIT || goog.userAgent.EDGE) {
    return !1;
  }
  if (goog.userAgent.IE) {
    return a == bot.Keyboard.Keys.ESC;
  }
  switch(a) {
    case bot.Keyboard.Keys.SHIFT:
    case bot.Keyboard.Keys.CONTROL:
    case bot.Keyboard.Keys.ALT:
      return !1;
    case bot.Keyboard.Keys.META:
    case bot.Keyboard.Keys.META_RIGHT:
    case bot.Keyboard.Keys.CONTEXT_MENU:
      return goog.userAgent.GECKO;
    default:
      return !0;
  }
};
bot.Keyboard.prototype.maybeSubmitForm_ = function(a) {
  if (a == bot.Keyboard.Keys.ENTER && !goog.userAgent.GECKO && bot.dom.core.isElement(this.getElement(), "INPUT") && (a = bot.Device.findAncestorForm(this.getElement()))) {
    var b = a.getElementsByTagName("input");
    (goog.array.some(b, function(a) {
      return bot.Device.isFormSubmitElement(a);
    }) || 1 == b.length || goog.userAgent.WEBKIT && !bot.userAgent.isEngineVersion(534)) && this.submitForm(a);
  }
};
bot.Keyboard.prototype.maybeEditText_ = function(a) {
  if (a.character) {
    this.updateOnCharacter_(a);
  } else {
    switch(a) {
      case bot.Keyboard.Keys.ENTER:
        this.updateOnEnter_();
        break;
      case bot.Keyboard.Keys.BACKSPACE:
      case bot.Keyboard.Keys.DELETE:
        this.updateOnBackspaceOrDelete_(a);
        break;
      case bot.Keyboard.Keys.LEFT:
      case bot.Keyboard.Keys.RIGHT:
        this.updateOnLeftOrRight_(a);
        break;
      case bot.Keyboard.Keys.HOME:
      case bot.Keyboard.Keys.END:
        this.updateOnHomeOrEnd_(a);
    }
  }
};
bot.Keyboard.prototype.releaseKey = function(a) {
  if (!this.isPressed(a)) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Cannot release a key that is not pressed. (" + a.code + ")");
  }
  goog.isNull(a.code) || this.fireKeyEvent_(bot.events.EventType.KEYUP, a);
  this.setKeyPressed_(a, !1);
};
bot.Keyboard.prototype.getChar_ = function(a) {
  if (!a.character) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "not a character key");
  }
  return this.isPressed(bot.Keyboard.Keys.SHIFT) ? a.shiftChar : a.character;
};
bot.Keyboard.KEYPRESS_EDITS_TEXT_ = goog.userAgent.GECKO && !bot.userAgent.isEngineVersion(12);
bot.Keyboard.prototype.updateOnCharacter_ = function(a) {
  if (!bot.Keyboard.KEYPRESS_EDITS_TEXT_) {
    a = this.getChar_(a);
    var b = goog.dom.selection.getStart(this.getElement()) + 1;
    bot.Keyboard.supportsSelection(this.getElement()) ? (goog.dom.selection.setText(this.getElement(), a), goog.dom.selection.setStart(this.getElement(), b)) : this.getElement().value += a;
    goog.userAgent.WEBKIT && this.fireHtmlEvent(bot.events.EventType.TEXTINPUT);
    bot.userAgent.IE_DOC_PRE9 || this.fireHtmlEvent(bot.events.EventType.INPUT);
    this.updateCurrentPos_(b);
  }
};
bot.Keyboard.prototype.updateOnEnter_ = function() {
  if (!bot.Keyboard.KEYPRESS_EDITS_TEXT_ && (goog.userAgent.WEBKIT && this.fireHtmlEvent(bot.events.EventType.TEXTINPUT), bot.dom.core.isElement(this.getElement(), "TEXTAREA"))) {
    var a = goog.dom.selection.getStart(this.getElement()) + bot.Keyboard.NEW_LINE_.length;
    bot.Keyboard.supportsSelection(this.getElement()) ? (goog.dom.selection.setText(this.getElement(), bot.Keyboard.NEW_LINE_), goog.dom.selection.setStart(this.getElement(), a)) : this.getElement().value += bot.Keyboard.NEW_LINE_;
    goog.userAgent.IE || this.fireHtmlEvent(bot.events.EventType.INPUT);
    this.updateCurrentPos_(a);
  }
};
bot.Keyboard.prototype.updateOnBackspaceOrDelete_ = function(a) {
  if (!bot.Keyboard.KEYPRESS_EDITS_TEXT_) {
    bot.Keyboard.checkCanUpdateSelection_(this.getElement());
    var b = goog.dom.selection.getEndPoints(this.getElement());
    b[0] == b[1] && (a == bot.Keyboard.Keys.BACKSPACE ? (goog.dom.selection.setStart(this.getElement(), b[1] - 1), goog.dom.selection.setEnd(this.getElement(), b[1])) : goog.dom.selection.setEnd(this.getElement(), b[1] + 1));
    b = goog.dom.selection.getEndPoints(this.getElement());
    b = !(b[0] == this.getElement().value.length || 0 == b[1]);
    goog.dom.selection.setText(this.getElement(), "");
    (!goog.userAgent.IE && b || goog.userAgent.GECKO && a == bot.Keyboard.Keys.BACKSPACE) && this.fireHtmlEvent(bot.events.EventType.INPUT);
    b = goog.dom.selection.getEndPoints(this.getElement());
    this.updateCurrentPos_(b[1]);
  }
};
bot.Keyboard.prototype.updateOnLeftOrRight_ = function(a) {
  bot.Keyboard.checkCanUpdateSelection_(this.getElement());
  var b = this.getElement(), c = goog.dom.selection.getStart(b), d = goog.dom.selection.getEnd(b), f = 0, g = 0;
  a == bot.Keyboard.Keys.LEFT ? this.isPressed(bot.Keyboard.Keys.SHIFT) ? this.currentPos_ == c ? (f = Math.max(c - 1, 0), g = d, a = f) : (f = c, a = g = d - 1) : a = c == d ? Math.max(c - 1, 0) : c : this.isPressed(bot.Keyboard.Keys.SHIFT) ? this.currentPos_ == d ? (f = c, a = g = Math.min(d + 1, b.value.length)) : (f = c + 1, g = d, a = f) : a = c == d ? Math.min(d + 1, b.value.length) : d;
  this.isPressed(bot.Keyboard.Keys.SHIFT) ? (goog.dom.selection.setStart(b, f), goog.dom.selection.setEnd(b, g)) : goog.dom.selection.setCursorPosition(b, a);
  this.updateCurrentPos_(a);
};
bot.Keyboard.prototype.updateOnHomeOrEnd_ = function(a) {
  bot.Keyboard.checkCanUpdateSelection_(this.getElement());
  var b = this.getElement(), c = goog.dom.selection.getStart(b), d = goog.dom.selection.getEnd(b);
  a == bot.Keyboard.Keys.HOME ? (this.isPressed(bot.Keyboard.Keys.SHIFT) ? (goog.dom.selection.setStart(b, 0), goog.dom.selection.setEnd(b, this.currentPos_ == c ? d : c)) : goog.dom.selection.setCursorPosition(b, 0), this.updateCurrentPos_(0)) : (this.isPressed(bot.Keyboard.Keys.SHIFT) ? (this.currentPos_ == c && goog.dom.selection.setStart(b, d), goog.dom.selection.setEnd(b, b.value.length)) : goog.dom.selection.setCursorPosition(b, b.value.length), this.updateCurrentPos_(b.value.length));
};
bot.Keyboard.checkCanUpdateSelection_ = function(a) {
  try {
    if ("number" == typeof a.selectionStart) {
      return;
    }
  } catch (b) {
    if (-1 != b.message.indexOf("does not support selection.")) {
      throw Error(b.message + " (For more information, see https://code.google.com/p/chromium/issues/detail?id=330456)");
    }
    throw b;
  }
  throw Error("Element does not support selection");
};
bot.Keyboard.supportsSelection = function(a) {
  try {
    bot.Keyboard.checkCanUpdateSelection_(a);
  } catch (b) {
    return !1;
  }
  return !0;
};
bot.Keyboard.prototype.updateCurrentPos_ = function(a) {
  this.currentPos_ = a;
};
bot.Keyboard.prototype.fireKeyEvent_ = function(a, b, c) {
  if (goog.isNull(b.code)) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Key must have a keycode to be fired.");
  }
  b = {altKey:this.isPressed(bot.Keyboard.Keys.ALT), ctrlKey:this.isPressed(bot.Keyboard.Keys.CONTROL), metaKey:this.isPressed(bot.Keyboard.Keys.META), shiftKey:this.isPressed(bot.Keyboard.Keys.SHIFT), keyCode:b.code, charCode:b.character && a == bot.events.EventType.KEYPRESS ? this.getChar_(b).charCodeAt(0) : 0, preventDefault:!!c};
  return this.fireKeyboardEvent(a, b);
};
bot.Keyboard.prototype.moveCursor = function(a) {
  this.setElement(a);
  this.editable_ = bot.dom.isEditable(a);
  var b = this.focusOnElement();
  this.editable_ && b && (goog.dom.selection.setCursorPosition(a, a.value.length), this.updateCurrentPos_(a.value.length));
};
bot.Keyboard.prototype.getState = function() {
  return {pressed:this.pressed_.getValues(), currentPos:this.currentPos_};
};
bot.Keyboard.prototype.getModifiersState = function() {
  return this.modifiersState;
};
bot.Mouse = function(a, b, c) {
  bot.Device.call(this, b, c);
  this.elementPressed_ = this.buttonPressed_ = null;
  this.clientXY_ = new goog.math.Coordinate(0, 0);
  this.hasEverInteracted_ = this.nextClickIsDoubleClick_ = !1;
  if (a) {
    goog.isNumber(a.buttonPressed) && (this.buttonPressed_ = a.buttonPressed);
    try {
      bot.dom.core.isElement(a.elementPressed) && (this.elementPressed_ = a.elementPressed);
    } catch (d) {
      this.buttonPressed_ = null;
    }
    this.clientXY_ = new goog.math.Coordinate(a.clientXY.x, a.clientXY.y);
    this.nextClickIsDoubleClick_ = !!a.nextClickIsDoubleClick;
    this.hasEverInteracted_ = !!a.hasEverInteracted;
    try {
      a.element && bot.dom.core.isElement(a.element) && this.setElement(a.element);
    } catch (d) {
      this.buttonPressed_ = null;
    }
  }
};
goog.inherits(bot.Mouse, bot.Device);
bot.Mouse.Button = {LEFT:0, MIDDLE:1, RIGHT:2};
bot.Mouse.NO_BUTTON_VALUE_INDEX_ = 3;
bot.Mouse.MOUSE_BUTTON_VALUE_MAP_ = function() {
  var a = {};
  bot.userAgent.IE_DOC_PRE9 ? (a[bot.events.EventType.CLICK] = [0, 0, 0, null], a[bot.events.EventType.CONTEXTMENU] = [null, null, 0, null], a[bot.events.EventType.MOUSEUP] = [1, 4, 2, null], a[bot.events.EventType.MOUSEOUT] = [0, 0, 0, 0], a[bot.events.EventType.MOUSEMOVE] = [1, 4, 2, 0]) : goog.userAgent.WEBKIT || bot.userAgent.IE_DOC_9 ? (a[bot.events.EventType.CLICK] = [0, 1, 2, null], a[bot.events.EventType.CONTEXTMENU] = [null, null, 2, null], a[bot.events.EventType.MOUSEUP] = [0, 1, 2, null], 
  a[bot.events.EventType.MOUSEOUT] = [0, 1, 2, 0], a[bot.events.EventType.MOUSEMOVE] = [0, 1, 2, 0]) : (a[bot.events.EventType.CLICK] = [0, 1, 2, null], a[bot.events.EventType.CONTEXTMENU] = [null, null, 2, null], a[bot.events.EventType.MOUSEUP] = [0, 1, 2, null], a[bot.events.EventType.MOUSEOUT] = [0, 0, 0, 0], a[bot.events.EventType.MOUSEMOVE] = [0, 0, 0, 0]);
  bot.userAgent.IE_DOC_10 && (a[bot.events.EventType.MSPOINTERDOWN] = a[bot.events.EventType.MOUSEUP], a[bot.events.EventType.MSPOINTERUP] = a[bot.events.EventType.MOUSEUP], a[bot.events.EventType.MSPOINTERMOVE] = [-1, -1, -1, -1], a[bot.events.EventType.MSPOINTEROUT] = a[bot.events.EventType.MSPOINTERMOVE], a[bot.events.EventType.MSPOINTEROVER] = a[bot.events.EventType.MSPOINTERMOVE]);
  a[bot.events.EventType.DBLCLICK] = a[bot.events.EventType.CLICK];
  a[bot.events.EventType.MOUSEDOWN] = a[bot.events.EventType.MOUSEUP];
  a[bot.events.EventType.MOUSEOVER] = a[bot.events.EventType.MOUSEOUT];
  return a;
}();
bot.Mouse.MOUSE_EVENT_MAP_ = function() {
  var a = {};
  a[bot.events.EventType.MOUSEDOWN] = bot.events.EventType.MSPOINTERDOWN;
  a[bot.events.EventType.MOUSEMOVE] = bot.events.EventType.MSPOINTERMOVE;
  a[bot.events.EventType.MOUSEOUT] = bot.events.EventType.MSPOINTEROUT;
  a[bot.events.EventType.MOUSEOVER] = bot.events.EventType.MSPOINTEROVER;
  a[bot.events.EventType.MOUSEUP] = bot.events.EventType.MSPOINTERUP;
  return a;
}();
bot.Mouse.prototype.fireMousedown_ = function(a) {
  var b = goog.userAgent.GECKO && !bot.userAgent.isProductVersion(4);
  if ((goog.userAgent.WEBKIT || b) && (bot.dom.core.isElement(this.getElement(), "OPTION") || bot.dom.core.isElement(this.getElement(), "SELECT"))) {
    return !0;
  }
  var c;
  (b = goog.userAgent.GECKO || goog.userAgent.IE) && (c = bot.dom.getActiveElement(this.getElement()));
  return (a = this.fireMouseEvent_(bot.events.EventType.MOUSEDOWN, null, null, !1, a)) && b && c != bot.dom.getActiveElement(this.getElement()) ? !1 : a;
};
bot.Mouse.prototype.pressButton = function(a, b) {
  if (!goog.isNull(this.buttonPressed_)) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Cannot press more than one button or an already pressed button.");
  }
  this.buttonPressed_ = a;
  this.elementPressed_ = this.getElement();
  this.fireMousedown_(b) && (bot.userAgent.IE_DOC_10 && this.buttonPressed_ == bot.Mouse.Button.LEFT && bot.dom.core.isElement(this.elementPressed_, "OPTION") && this.fireMSPointerEvent(bot.events.EventType.MSGOTPOINTERCAPTURE, this.clientXY_, 0, bot.Device.MOUSE_MS_POINTER_ID, MSPointerEvent.MSPOINTER_TYPE_MOUSE, !0), this.focusOnElement());
};
bot.Mouse.prototype.releaseButton = function(a, b) {
  if (goog.isNull(this.buttonPressed_)) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Cannot release a button when no button is pressed.");
  }
  this.maybeToggleOption();
  var c = bot.dom.isInteractable(this.getElement());
  this.fireMouseEvent_(bot.events.EventType.MOUSEUP, null, null, a, b);
  try {
    this.buttonPressed_ == bot.Mouse.Button.LEFT && this.getElement() == this.elementPressed_ ? (bot.userAgent.WINDOWS_PHONE && bot.dom.core.isElement(this.elementPressed_, "OPTION") || this.clickElement(this.clientXY_, this.getButtonValue_(bot.events.EventType.CLICK), c), this.maybeDoubleClickElement_(), bot.userAgent.IE_DOC_10 && this.buttonPressed_ == bot.Mouse.Button.LEFT && bot.dom.core.isElement(this.elementPressed_, "OPTION") && this.fireMSPointerEvent(bot.events.EventType.MSLOSTPOINTERCAPTURE, 
    new goog.math.Coordinate(0, 0), 0, bot.Device.MOUSE_MS_POINTER_ID, MSPointerEvent.MSPOINTER_TYPE_MOUSE, !1)) : this.buttonPressed_ == bot.Mouse.Button.RIGHT && this.fireMouseEvent_(bot.events.EventType.CONTEXTMENU);
  } catch (d) {
  }
  bot.Device.clearPointerMap();
  this.elementPressed_ = this.buttonPressed_ = null;
};
bot.Mouse.prototype.maybeDoubleClickElement_ = function() {
  this.nextClickIsDoubleClick_ && this.fireMouseEvent_(bot.events.EventType.DBLCLICK);
  this.nextClickIsDoubleClick_ = !this.nextClickIsDoubleClick_;
};
bot.Mouse.prototype.move = function(a, b) {
  var c = bot.dom.isInteractable(a), d = bot.dom.getClientRect(a);
  this.clientXY_.x = b.x + d.left;
  this.clientXY_.y = b.y + d.top;
  b = this.getElement();
  if (a != b) {
    try {
      goog.dom.getWindow(goog.dom.getOwnerDocument(b)).closed && (b = null);
    } catch (f) {
      b = null;
    }
    b && (d = b === bot.getDocument().documentElement || b === bot.getDocument().body, b = !this.hasEverInteracted_ && d ? null : b, this.fireMouseEvent_(bot.events.EventType.MOUSEOUT, a));
    this.setElement(a);
    goog.userAgent.IE || this.fireMouseEvent_(bot.events.EventType.MOUSEOVER, b, null, c);
  }
  this.fireMouseEvent_(bot.events.EventType.MOUSEMOVE, null, null, c);
  goog.userAgent.IE && a != b && this.fireMouseEvent_(bot.events.EventType.MOUSEOVER, b, null, c);
  this.nextClickIsDoubleClick_ = !1;
};
bot.Mouse.prototype.scroll = function(a) {
  if (0 == a) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Must scroll a non-zero number of ticks.");
  }
  for (var b = 0 < a ? -120 : 120, c = 0 < a ? 57 : -57, d = 0; d < Math.abs(a); d++) {
    this.fireMouseEvent_(bot.events.EventType.MOUSEWHEEL, null, b), goog.userAgent.GECKO && this.fireMouseEvent_(bot.events.EventType.MOUSEPIXELSCROLL, null, c);
  }
};
bot.Mouse.prototype.fireMouseEvent_ = function(a, b, c, d, f) {
  this.hasEverInteracted_ = !0;
  if (bot.userAgent.IE_DOC_10) {
    var g = bot.Mouse.MOUSE_EVENT_MAP_[a];
    if (g && !this.fireMSPointerEvent(g, this.clientXY_, this.getButtonValue_(g), bot.Device.MOUSE_MS_POINTER_ID, MSPointerEvent.MSPOINTER_TYPE_MOUSE, !0, b, d)) {
      return !1;
    }
  }
  return this.fireMouseEvent(a, this.clientXY_, this.getButtonValue_(a), b, c, d, null, f);
};
bot.Mouse.prototype.getButtonValue_ = function(a) {
  if (!(a in bot.Mouse.MOUSE_BUTTON_VALUE_MAP_)) {
    return 0;
  }
  var b = goog.isNull(this.buttonPressed_) ? bot.Mouse.NO_BUTTON_VALUE_INDEX_ : this.buttonPressed_;
  a = bot.Mouse.MOUSE_BUTTON_VALUE_MAP_[a][b];
  if (goog.isNull(a)) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Event does not permit the specified mouse button.");
  }
  return a;
};
bot.Mouse.prototype.getState = function() {
  return {buttonPressed:this.buttonPressed_, elementPressed:this.elementPressed_, clientXY:{x:this.clientXY_.x, y:this.clientXY_.y}, nextClickIsDoubleClick:this.nextClickIsDoubleClick_, hasEverInteracted:this.hasEverInteracted_, element:this.getElement()};
};
bot.Touchscreen = function() {
  bot.Device.call(this);
  this.clientXY_ = new goog.math.Coordinate(0, 0);
  this.clientXY2_ = new goog.math.Coordinate(0, 0);
};
goog.inherits(bot.Touchscreen, bot.Device);
bot.Touchscreen.prototype.fireMouseEventsOnRelease_ = !0;
bot.Touchscreen.prototype.cancelled_ = !1;
bot.Touchscreen.prototype.touchIdentifier_ = 0;
bot.Touchscreen.prototype.touchIdentifier2_ = 0;
bot.Touchscreen.prototype.touchCounter_ = 2;
bot.Touchscreen.prototype.press = function(a) {
  if (this.isPressed()) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Cannot press touchscreen when already pressed.");
  }
  this.touchIdentifier_ = this.touchCounter_++;
  a && (this.touchIdentifier2_ = this.touchCounter_++);
  bot.userAgent.IE_DOC_10 ? (this.fireMouseEventsOnRelease_ = !0, this.firePointerEvents_(bot.Touchscreen.fireSinglePressPointer_)) : this.fireMouseEventsOnRelease_ = this.fireTouchEvent_(bot.events.EventType.TOUCHSTART);
};
bot.Touchscreen.prototype.release = function() {
  if (!this.isPressed()) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Cannot release touchscreen when not already pressed.");
  }
  bot.userAgent.IE_DOC_10 ? this.cancelled_ || this.firePointerEvents_(bot.Touchscreen.fireSingleReleasePointer_) : this.fireTouchReleaseEvents_();
  bot.Device.clearPointerMap();
  this.touchIdentifier2_ = this.touchIdentifier_ = 0;
  this.cancelled_ = !1;
};
bot.Touchscreen.prototype.move = function(a, b, c) {
  var d = this.getElement();
  this.isPressed() && !bot.userAgent.IE_DOC_10 || this.setElement(a);
  var f = bot.dom.getClientRect(a);
  this.clientXY_.x = b.x + f.left;
  this.clientXY_.y = b.y + f.top;
  goog.isDef(c) && (this.clientXY2_.x = c.x + f.left, this.clientXY2_.y = c.y + f.top);
  this.isPressed() && (bot.userAgent.IE_DOC_10 ? this.cancelled_ || (a != d && (this.fireMouseEventsOnRelease_ = !1), bot.Touchscreen.hasMsTouchActionsEnabled_(a) ? this.firePointerEvents_(bot.Touchscreen.fireSingleMovePointer_) : (this.fireMSPointerEvent(bot.events.EventType.MSPOINTEROUT, b, -1, this.touchIdentifier_, MSPointerEvent.MSPOINTER_TYPE_TOUCH, !0), this.fireMouseEvent(bot.events.EventType.MOUSEOUT, b, 0), this.fireMSPointerEvent(bot.events.EventType.MSPOINTERCANCEL, b, 0, this.touchIdentifier_, 
  MSPointerEvent.MSPOINTER_TYPE_TOUCH, !0), this.cancelled_ = !0, bot.Device.clearPointerMap())) : (this.fireMouseEventsOnRelease_ = !1, this.fireTouchEvent_(bot.events.EventType.TOUCHMOVE)));
};
bot.Touchscreen.prototype.isPressed = function() {
  return !!this.touchIdentifier_;
};
bot.Touchscreen.prototype.fireTouchEvent_ = function(a) {
  if (!this.isPressed()) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Should never fire event when touchscreen is not pressed.");
  }
  if (this.touchIdentifier2_) {
    var b = this.touchIdentifier2_;
    var c = this.clientXY2_;
  }
  return this.fireTouchEvent(a, this.touchIdentifier_, this.clientXY_, b, c);
};
bot.Touchscreen.prototype.fireTouchReleaseEvents_ = function() {
  var a = this.fireTouchEvent_(bot.events.EventType.TOUCHEND);
  this.fireMouseEventsOnRelease_ && (a || !bot.userAgent.IOS && !goog.userAgent.product.CHROME) && (this.fireMouseEvent(bot.events.EventType.MOUSEMOVE, this.clientXY_, 0), this.fireMouseEvent(bot.events.EventType.MOUSEDOWN, this.clientXY_, 0) && this.focusOnElement(), this.maybeToggleOption(), a = bot.dom.isInteractable(this.getElement()), this.fireMouseEvent(bot.events.EventType.MOUSEUP, this.clientXY_, 0), bot.userAgent.WINDOWS_PHONE && bot.dom.core.isElement(this.getElement(), "OPTION") || this.clickElement(this.clientXY_, 
  0, a));
};
bot.Touchscreen.prototype.firePointerEvents_ = function(a) {
  a(this, this.getElement(), this.clientXY_, this.touchIdentifier_, !0);
  this.touchIdentifier2_ && bot.Touchscreen.hasMsTouchActionsEnabled_(this.getElement()) && a(this, this.getElement(), this.clientXY2_, this.touchIdentifier2_, !1);
};
bot.Touchscreen.fireSinglePressPointer_ = function(a, b, c, d, f) {
  a.fireMouseEvent(bot.events.EventType.MOUSEMOVE, c, 0);
  a.fireMSPointerEvent(bot.events.EventType.MSPOINTEROVER, c, 0, d, MSPointerEvent.MSPOINTER_TYPE_TOUCH, f);
  a.fireMouseEvent(bot.events.EventType.MOUSEOVER, c, 0);
  a.fireMSPointerEvent(bot.events.EventType.MSPOINTERDOWN, c, 0, d, MSPointerEvent.MSPOINTER_TYPE_TOUCH, f);
  a.fireMouseEvent(bot.events.EventType.MOUSEDOWN, c, 0) && (bot.dom.core.isSelectable(b) && a.fireMSPointerEvent(bot.events.EventType.MSGOTPOINTERCAPTURE, c, 0, d, MSPointerEvent.MSPOINTER_TYPE_TOUCH, f), a.focusOnElement());
};
bot.Touchscreen.fireSingleReleasePointer_ = function(a, b, c, d, f) {
  a.fireMSPointerEvent(bot.events.EventType.MSPOINTERUP, c, 0, d, MSPointerEvent.MSPOINTER_TYPE_TOUCH, f);
  var g = bot.dom.isInteractable(a.getElement());
  a.fireMouseEvent(bot.events.EventType.MOUSEUP, c, 0, null, 0, !1, d);
  a.fireMouseEventsOnRelease_ && (a.maybeToggleOption(), bot.userAgent.WINDOWS_PHONE && bot.dom.core.isElement(b, "OPTION") || a.clickElement(a.clientXY_, 0, g, d));
  bot.dom.core.isSelectable(b) && a.fireMSPointerEvent(bot.events.EventType.MSLOSTPOINTERCAPTURE, new goog.math.Coordinate(0, 0), 0, d, MSPointerEvent.MSPOINTER_TYPE_TOUCH, !1);
  a.fireMSPointerEvent(bot.events.EventType.MSPOINTEROUT, c, -1, d, MSPointerEvent.MSPOINTER_TYPE_TOUCH, f);
  a.fireMouseEvent(bot.events.EventType.MOUSEOUT, c, 0, null, 0, !1, d);
};
bot.Touchscreen.fireSingleMovePointer_ = function(a, b, c, d, f) {
  a.fireMSPointerEvent(bot.events.EventType.MSPOINTERMOVE, c, -1, d, MSPointerEvent.MSPOINTER_TYPE_TOUCH, f);
  a.fireMouseEvent(bot.events.EventType.MOUSEMOVE, c, 0, null, 0, !1, d);
};
bot.Touchscreen.hasMsTouchActionsEnabled_ = function(a) {
  if (!bot.userAgent.IE_DOC_10) {
    throw Error("hasMsTouchActionsEnable should only be called from IE 10");
  }
  if ("none" == bot.dom.getEffectiveStyle(a, "ms-touch-action")) {
    return !0;
  }
  a = bot.dom.getParentElement(a);
  return !!a && bot.Touchscreen.hasMsTouchActionsEnabled_(a);
};
bot.action = {};
bot.action.checkShown_ = function(a) {
  if (!bot.dom.isShown(a, !0)) {
    throw new bot.Error(bot.ErrorCode.ELEMENT_NOT_VISIBLE, "Element is not currently visible and may not be manipulated");
  }
};
bot.action.checkInteractable_ = function(a) {
  if (!bot.dom.isInteractable(a)) {
    throw new bot.Error(bot.ErrorCode.INVALID_ELEMENT_STATE, "Element is not currently interactable and may not be manipulated");
  }
};
bot.action.clear = function(a) {
  bot.action.checkInteractable_(a);
  if (!bot.dom.isEditable(a)) {
    throw new bot.Error(bot.ErrorCode.INVALID_ELEMENT_STATE, "Element must be user-editable in order to clear it.");
  }
  if (a.value) {
    bot.action.LegacyDevice_.focusOnElement(a);
    if (goog.userAgent.IE && bot.dom.isInputType(a, "range")) {
      var b = a.min ? a.min : 0, c = a.max ? a.max : 100;
      a.value = c < b ? b : b + (c - b) / 2;
    } else {
      a.value = "";
    }
    bot.events.fire(a, bot.events.EventType.CHANGE);
    bot.events.fire(a, bot.events.EventType.BLUR);
    if (b = bot.getDocument().body) {
      bot.action.LegacyDevice_.focusOnElement(b);
    } else {
      throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Cannot unfocus element after clearing.");
    }
  } else {
    bot.dom.core.isElement(a, "INPUT") && a.getAttribute("type") && "number" == a.getAttribute("type").toLowerCase() && (bot.action.LegacyDevice_.focusOnElement(a), a.value = "");
  }
  bot.dom.isContentEditable(a) && (bot.action.LegacyDevice_.focusOnElement(a), a.innerHTML = " ");
};
bot.action.focusOnElement = function(a) {
  bot.action.checkInteractable_(a);
  bot.action.LegacyDevice_.focusOnElement(a);
};
bot.action.type = function(a, b, c, d) {
  function f(a) {
    goog.isString(a) ? goog.array.forEach(a.split(""), function(a) {
      a = bot.Keyboard.Key.fromChar(a);
      var b = g.isPressed(bot.Keyboard.Keys.SHIFT);
      a.shift && !b && g.pressKey(bot.Keyboard.Keys.SHIFT);
      g.pressKey(a.key);
      g.releaseKey(a.key);
      a.shift && !b && g.releaseKey(bot.Keyboard.Keys.SHIFT);
    }) : goog.array.contains(bot.Keyboard.MODIFIERS, a) ? g.isPressed(a) ? g.releaseKey(a) : g.pressKey(a) : (g.pressKey(a), g.releaseKey(a));
  }
  a != bot.dom.getActiveElement(a) && (bot.action.checkInteractable_(a), bot.action.scrollIntoView(a));
  var g = c || new bot.Keyboard;
  g.moveCursor(a);
  if ((!goog.userAgent.product.SAFARI || goog.userAgent.MOBILE) && goog.userAgent.WEBKIT && "date" == a.type) {
    c = goog.isArray(b) ? b = b.join("") : b;
    var h = /\d{4}-\d{2}-\d{2}/;
    if (c.match(h)) {
      goog.userAgent.MOBILE && goog.userAgent.product.SAFARI && (bot.events.fire(a, bot.events.EventType.TOUCHSTART), bot.events.fire(a, bot.events.EventType.TOUCHEND));
      bot.events.fire(a, bot.events.EventType.FOCUS);
      a.value = c.match(h)[0];
      bot.events.fire(a, bot.events.EventType.CHANGE);
      bot.events.fire(a, bot.events.EventType.BLUR);
      return;
    }
  }
  goog.isArray(b) ? goog.array.forEach(b, f) : f(b);
  d || goog.array.forEach(bot.Keyboard.MODIFIERS, function(a) {
    g.isPressed(a) && g.releaseKey(a);
  });
};
bot.action.submit = function(a) {
  var b = bot.action.LegacyDevice_.findAncestorForm(a);
  if (!b) {
    throw new bot.Error(bot.ErrorCode.NO_SUCH_ELEMENT, "Element was not in a form, so could not submit.");
  }
  bot.action.LegacyDevice_.submitForm(a, b);
};
bot.action.moveMouse = function(a, b, c) {
  b = bot.action.prepareToInteractWith_(a, b);
  (c || new bot.Mouse).move(a, b);
};
bot.action.click = function(a, b, c, d) {
  b = bot.action.prepareToInteractWith_(a, b);
  c = c || new bot.Mouse;
  c.move(a, b);
  c.pressButton(bot.Mouse.Button.LEFT);
  c.releaseButton(d);
};
bot.action.rightClick = function(a, b, c) {
  b = bot.action.prepareToInteractWith_(a, b);
  c = c || new bot.Mouse;
  c.move(a, b);
  c.pressButton(bot.Mouse.Button.RIGHT);
  c.releaseButton();
};
bot.action.doubleClick = function(a, b, c) {
  b = bot.action.prepareToInteractWith_(a, b);
  c = c || new bot.Mouse;
  c.move(a, b);
  c.pressButton(bot.Mouse.Button.LEFT);
  c.releaseButton();
  c.pressButton(bot.Mouse.Button.LEFT);
  c.releaseButton();
};
bot.action.doubleClick2 = function(a, b, c) {
  b = bot.action.prepareToInteractWith_(a, b);
  c = c || new bot.Mouse;
  c.move(a, b);
  c.pressButton(bot.Mouse.Button.LEFT, 2);
  c.releaseButton(!0, 2);
};
bot.action.scrollMouse = function(a, b, c, d) {
  c = bot.action.prepareToInteractWith_(a, c);
  d = d || new bot.Mouse;
  d.move(a, c);
  d.scroll(b);
};
bot.action.drag = function(a, b, c, d, f, g) {
  f = bot.action.prepareToInteractWith_(a, f);
  var h = bot.dom.getClientRect(a);
  g = g || new bot.Mouse;
  g.move(a, f);
  g.pressButton(bot.Mouse.Button.LEFT);
  d = goog.isDef(d) ? d : 2;
  if (1 > d) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "There must be at least one step as part of a drag.");
  }
  for (var k = 1; k <= d; k++) {
    var m = Math.floor(k * b / d), p = Math.floor(k * c / d), r = bot.dom.getClientRect(a), m = new goog.math.Coordinate(f.x + h.left + m - r.left, f.y + h.top + p - r.top);
    g.move(a, m);
  }
  g.releaseButton();
};
bot.action.tap = function(a, b, c) {
  b = bot.action.prepareToInteractWith_(a, b);
  c = c || new bot.Touchscreen;
  c.move(a, b);
  c.press();
  c.release();
};
bot.action.swipe = function(a, b, c, d, f, g) {
  f = bot.action.prepareToInteractWith_(a, f);
  g = g || new bot.Touchscreen;
  var h = bot.dom.getClientRect(a);
  g.move(a, f);
  g.press();
  d = goog.isDef(d) ? d : 2;
  if (1 > d) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "There must be at least one step as part of a swipe.");
  }
  for (var k = 1; k <= d; k++) {
    var m = Math.floor(k * b / d), p = Math.floor(k * c / d), r = bot.dom.getClientRect(a), m = new goog.math.Coordinate(f.x + h.left + m - r.left, f.y + h.top + p - r.top);
    g.move(a, m);
  }
  g.release();
};
bot.action.pinch = function(a, b, c, d) {
  if (0 == b) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Cannot pinch by a distance of zero.");
  }
  var f = b / 2;
  bot.action.multiTouchAction_(a, function(a) {
    if (0 > b) {
      var c = a.magnitude();
      a.scale(c ? (c + b) / c : 0);
    }
  }, function(a) {
    var b = a.magnitude();
    a.scale(b ? (b - f) / b : 0);
  }, c, d);
};
bot.action.rotate = function(a, b, c, d) {
  if (0 == b) {
    throw new bot.Error(bot.ErrorCode.UNKNOWN_ERROR, "Cannot rotate by an angle of zero.");
  }
  var f = b / 180 * Math.PI / 2;
  bot.action.multiTouchAction_(a, function(a) {
    a.scale(0.5);
  }, function(a) {
    a.rotate(f);
  }, c, d);
};
bot.action.multiTouchAction_ = function(a, b, c, d, f) {
  d = bot.action.prepareToInteractWith_(a, d);
  var g = bot.action.getInteractableSize(a), g = new goog.math.Vec2(Math.min(d.x, g.width - d.x), Math.min(d.y, g.height - d.y));
  f = f || new bot.Touchscreen;
  b(g);
  b = goog.math.Vec2.sum(d, g);
  var h = goog.math.Vec2.difference(d, g);
  f.move(a, b, h);
  f.press(!0);
  b = bot.dom.getClientRect(a);
  c(g);
  var h = goog.math.Vec2.sum(d, g), k = goog.math.Vec2.difference(d, g);
  f.move(a, h, k);
  h = bot.dom.getClientRect(a);
  b = goog.math.Vec2.difference(new goog.math.Vec2(h.left, h.top), new goog.math.Vec2(b.left, b.top));
  c(g);
  c = goog.math.Vec2.sum(d, g).subtract(b);
  d = goog.math.Vec2.difference(d, g).subtract(b);
  f.move(a, c, d);
  f.release();
};
bot.action.prepareToInteractWith_ = function(a, b) {
  bot.action.checkShown_(a);
  bot.action.scrollIntoView(a, b || void 0);
  if (b) {
    return goog.math.Vec2.fromCoordinate(b);
  }
  a = bot.action.getInteractableSize(a);
  return new goog.math.Vec2(a.width / 2, a.height / 2);
};
bot.action.getInteractableSize = function(a) {
  var b = goog.style.getSize(a);
  return 0 < b.width && 0 < b.height || !a.offsetParent ? b : bot.action.getInteractableSize(a.offsetParent);
};
bot.action.LegacyDevice_ = function() {
  bot.Device.call(this);
};
goog.inherits(bot.action.LegacyDevice_, bot.Device);
goog.addSingletonGetter(bot.action.LegacyDevice_);
bot.action.LegacyDevice_.focusOnElement = function(a) {
  var b = bot.action.LegacyDevice_.getInstance();
  b.setElement(a);
  return b.focusOnElement();
};
bot.action.LegacyDevice_.submitForm = function(a, b) {
  var c = bot.action.LegacyDevice_.getInstance();
  c.setElement(a);
  c.submitForm(b);
};
bot.action.LegacyDevice_.findAncestorForm = function(a) {
  return bot.Device.findAncestorForm(a);
};
bot.action.scrollIntoView = function(a, b) {
  var c = bot.dom.getOverflowState(a, b);
  if (c != bot.dom.OverflowState.SCROLL) {
    return c == bot.dom.OverflowState.NONE;
  }
  if (a.scrollIntoView && (a.scrollIntoView(), bot.dom.OverflowState.NONE == bot.dom.getOverflowState(a, b))) {
    return !0;
  }
  for (var c = bot.dom.getClientRegion(a, b), d = bot.dom.getParentElement(a); d; d = bot.dom.getParentElement(d)) {
    var f = d, g = bot.dom.getClientRect(f), h = goog.style.getBorderBox(f), k = c.left - g.left - h.left, g = c.top - g.top - h.top, h = f.clientHeight + c.top - c.bottom;
    f.scrollLeft += Math.min(k, Math.max(k - (f.clientWidth + c.left - c.right), 0));
    f.scrollTop += Math.min(g, Math.max(g - h, 0));
  }
  return bot.dom.OverflowState.NONE == bot.dom.getOverflowState(a, b);
};
webdriver.atoms.element.isSelected = function(a) {
  return bot.dom.core.isSelectable(a) ? bot.dom.core.isSelected(a) : !1;
};
webdriver.atoms.element.getAttribute = webdriver.atoms.element.attribute.get;
webdriver.atoms.element.getLocation = function(a) {
  return bot.dom.isShown(a) ? goog.style.getBounds(a) : null;
};
webdriver.atoms.element.getLocationInView = function(a, b) {
  bot.action.scrollIntoView(a, b);
  a = bot.dom.getClientRegion(a, b);
  return new goog.math.Coordinate(a.left, a.top);
};
webdriver.atoms.element.isInHead_ = function(a) {
  for (; a;) {
    if (a.tagName && "head" == a.tagName.toLowerCase()) {
      return !0;
    }
    try {
      a = a.parentNode;
    } catch (b) {
      break;
    }
  }
  return !1;
};
webdriver.atoms.element.getText = function(a) {
  return bot.dom.getVisibleText(a);
};
webdriver.atoms.element.type = function(a, b, c, d) {
  function f() {
    return {persist:g, keys:[]};
  }
  var g = !!d, h = [], k = f();
  h.push(k);
  goog.array.forEach(b, function(a) {
    goog.array.forEach(a.split(""), function(a) {
      if ("\ue000" <= a && "\ue03d" >= a) {
        var b = webdriver.atoms.element.type.JSON_TO_KEY_MAP_[a];
        if (null === b) {
          h.push(k = f()), g && (k.persist = !1, h.push(k = f()));
        } else {
          if (goog.isDef(b)) {
            k.keys.push(b);
          } else {
            throw Error("Unsupported WebDriver key: \\u" + a.charCodeAt(0).toString(16));
          }
        }
      } else {
        switch(a) {
          case "\n":
            k.keys.push(bot.Keyboard.Keys.ENTER);
            break;
          case "\t":
            k.keys.push(bot.Keyboard.Keys.TAB);
            break;
          case "\b":
            k.keys.push(bot.Keyboard.Keys.BACKSPACE);
            break;
          default:
            k.keys.push(a);
        }
      }
    });
  });
  goog.array.forEach(h, function(b) {
    bot.action.type(a, b.keys, c, b.persist);
  });
};
webdriver.atoms.element.type.JSON_TO_KEY_MAP_ = {};
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.NULL] = null;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.BACK_SPACE] = bot.Keyboard.Keys.BACKSPACE;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.TAB] = bot.Keyboard.Keys.TAB;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.RETURN] = bot.Keyboard.Keys.ENTER;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.ENTER] = bot.Keyboard.Keys.ENTER;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.SHIFT] = bot.Keyboard.Keys.SHIFT;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.CONTROL] = bot.Keyboard.Keys.CONTROL;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.ALT] = bot.Keyboard.Keys.ALT;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.PAUSE] = bot.Keyboard.Keys.PAUSE;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.ESCAPE] = bot.Keyboard.Keys.ESC;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.SPACE] = bot.Keyboard.Keys.SPACE;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.PAGE_UP] = bot.Keyboard.Keys.PAGE_UP;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.PAGE_DOWN] = bot.Keyboard.Keys.PAGE_DOWN;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.END] = bot.Keyboard.Keys.END;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.HOME] = bot.Keyboard.Keys.HOME;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.LEFT] = bot.Keyboard.Keys.LEFT;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.UP] = bot.Keyboard.Keys.UP;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.RIGHT] = bot.Keyboard.Keys.RIGHT;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.DOWN] = bot.Keyboard.Keys.DOWN;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.INSERT] = bot.Keyboard.Keys.INSERT;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.DELETE] = bot.Keyboard.Keys.DELETE;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.SEMICOLON] = bot.Keyboard.Keys.SEMICOLON;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.EQUALS] = bot.Keyboard.Keys.EQUALS;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.NUMPAD0] = bot.Keyboard.Keys.NUM_ZERO;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.NUMPAD1] = bot.Keyboard.Keys.NUM_ONE;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.NUMPAD2] = bot.Keyboard.Keys.NUM_TWO;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.NUMPAD3] = bot.Keyboard.Keys.NUM_THREE;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.NUMPAD4] = bot.Keyboard.Keys.NUM_FOUR;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.NUMPAD5] = bot.Keyboard.Keys.NUM_FIVE;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.NUMPAD6] = bot.Keyboard.Keys.NUM_SIX;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.NUMPAD7] = bot.Keyboard.Keys.NUM_SEVEN;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.NUMPAD8] = bot.Keyboard.Keys.NUM_EIGHT;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.NUMPAD9] = bot.Keyboard.Keys.NUM_NINE;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.MULTIPLY] = bot.Keyboard.Keys.NUM_MULTIPLY;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.ADD] = bot.Keyboard.Keys.NUM_PLUS;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.SUBTRACT] = bot.Keyboard.Keys.NUM_MINUS;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.DECIMAL] = bot.Keyboard.Keys.NUM_PERIOD;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.DIVIDE] = bot.Keyboard.Keys.NUM_DIVISION;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.SEPARATOR] = bot.Keyboard.Keys.SEPARATOR;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.F1] = bot.Keyboard.Keys.F1;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.F2] = bot.Keyboard.Keys.F2;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.F3] = bot.Keyboard.Keys.F3;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.F4] = bot.Keyboard.Keys.F4;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.F5] = bot.Keyboard.Keys.F5;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.F6] = bot.Keyboard.Keys.F6;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.F7] = bot.Keyboard.Keys.F7;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.F8] = bot.Keyboard.Keys.F8;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.F9] = bot.Keyboard.Keys.F9;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.F10] = bot.Keyboard.Keys.F10;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.F11] = bot.Keyboard.Keys.F11;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.F12] = bot.Keyboard.Keys.F12;
webdriver.atoms.element.type.JSON_TO_KEY_MAP_[webdriver.Key.META] = bot.Keyboard.Keys.META;
var WebElement = {};
WebElement.LOG_ = fxdriver.logging.getLogger("fxdriver.WebElement");
WebElement.elementEquals = function(a, b) {
  try {
    var c = Utils.getElementAt(b.id, a.session.getDocument()), d = Utils.getElementAt(b.other, a.session.getDocument());
    a.value = c == d;
  } catch (f) {
    if (f.code && f.code == bot.ErrorCode.STALE_ELEMENT_REFERENCE) {
      a.value = !1;
    } else {
      throw f;
    }
  }
  a.send();
};
WebElement.clickElement = function(a, b) {
  b = Utils.getElementAt(b.id, a.session.getDocument());
  if (bot.dom.core.isElement(b, "INPUT")) {
    var c = b.getAttribute("type");
    if (c && "file" == c.toLowerCase()) {
      a.status = bot.ErrorCode.INVALID_ARGUMENT;
      a.send();
      return;
    }
  }
  var c = fxdriver.moz.unwrapFor4(b), d = Utils.getClickablePoint(c);
  Utils.scrollIntoView(c, 0 == a.session.elementScrollBehavior, new goog.math.Coordinate(d.x, d.y));
  Utils.installWindowCloseListener(a);
  Utils.installClickListener(a, WebLoadingListener);
  c = this.mouse.move(b, d.x, d.y);
  c.status != bot.ErrorCode.SUCCESS ? (a.status = c.status, a.value = c.message, a.send()) : (c = this.mouse.click(b), a.status = c.status, a.value = c.message);
};
WebElement.clickElement.preconditions = [fxdriver.preconditions.visible];
WebElement.getElementText = function(a, b) {
  b = Utils.getElementAt(b.id, a.session.getDocument());
  a.value = webdriver.atoms.element.getText(b);
  a.send();
};
WebElement.sendKeysToElement = function(a, b) {
  var c = Utils.getElementAt(b.id, a.session.getDocument()), d = a.session.getBrowser().ownerDocument.commandDispatcher, d = (d = d.focusedElement && goog.dom.getOwnerDocument(d.focusedElement)) ? new XPCNativeWrapper(d) : null, f = !0, g = Utils.getActiveElement(a.session.getDocument()), h = goog.dom.getOwnerDocument(g);
  g != c || d != new XPCNativeWrapper(h) ? (goog.log.info(WebElement.LOG_, "Need to switch focus"), f = !1, g.blur(), c.focus(), c.ownerDocument.defaultView.focus()) : goog.log.info(WebElement.LOG_, "No need to switch focus");
  var k = c;
  "body" == c.tagName.toLowerCase() && c.ownerDocument.defaultView.frameElement && (c.ownerDocument.defaultView.focus(), k = c.ownerDocument.getElementsByTagName("html")[0]);
  if (bot.dom.core.isElement(c, "INPUT") && (d = c.getAttribute("type")) && "file" == d.toLowerCase()) {
    c.value = b.value.join("");
    Utils.fireHtmlEvent(c, "change");
    a.send();
    return;
  }
  var m = this;
  this.jsTimer.setTimeout(function() {
    if (!f && bot.dom.isEditable(c)) {
      var d = c.value ? c.value.length : goog.dom.getTextContent(c).length;
      if (bot.dom.isContentEditable(c) && d) {
        var g = c;
        c.lastElementChild && (g = c.lastElementChild);
        goog.log.info(WebElement.LOG_, "ContentEditable " + c + " " + d);
        var h = c.ownerDocument || c.document, d = h.createRange();
        d.selectNodeContents(g);
        d.collapse(!1);
        g = h.getSelection();
        g.removeAllRanges();
        g.addRange(d);
      } else {
        goog.dom.selection.setCursorPosition(c, d);
      }
    }
    try {
      Utils.type(a.session, k, b.value.join(""), m.jsTimer, !0), a.send();
    } catch (t) {
      a.sendError(t);
    }
  }, 0);
};
WebElement.sendKeysToElement.preconditions = [fxdriver.preconditions.visible, fxdriver.preconditions.enabled];
WebElement.clearElement = function(a, b) {
  b = Utils.getElementAt(b.id, a.session.getDocument());
  bot.setWindow(a.session.getWindow());
  try {
    bot.action.clear(b), a.send();
  } catch (c) {
    if (b = c.code) {
      a.sendError(new WebDriverError(b, c.message));
    } else {
      throw c;
    }
  }
};
WebElement.clearElement.preconditions = [fxdriver.preconditions.visible, fxdriver.preconditions.enabled, fxdriver.preconditions.writable];
WebElement.getElementTagName = function(a, b) {
  b = Utils.getElementAt(b.id, a.session.getDocument());
  a.value = b.tagName.toLowerCase();
  a.send();
};
WebElement.getElementAttribute = function(a, b) {
  var c = fxdriver.moz.unwrap(Utils.getElementAt(b.id, a.session.getDocument()));
  a.value = webdriver.atoms.element.attribute.get(c, b.name);
  a.send();
};
WebElement.isElementEnabled = function(a, b) {
  b = Utils.getElementAt(b.id, a.session.getDocument());
  a.value = bot.dom.isEnabled(b);
  a.send();
};
WebElement.submitElement = function(a, b) {
  if (b = Utils.getElementAt(b.id, a.session.getDocument())) {
    for (; null != b.parentNode && "form" != b.tagName.toLowerCase();) {
      b = b.parentNode;
    }
    if (b.tagName && "form" == b.tagName.toLowerCase()) {
      var c = a.session.getWindow().location;
      Utils.fireHtmlEvent(b, "submit") && fxdriver.io.isLoadExpected(c, b.action) ? (new WebLoadingListener(a.session.getBrowser(), function(b) {
        b ? a.sendError(new WebDriverError(bot.ErrorCode.TIMEOUT, "Timed out waiting for page load.")) : a.send();
      }, a.session.getPageLoadTimeout(), a.session.getWindow()), b.submit()) : a.send();
      return;
    }
    throw new WebDriverError(bot.ErrorCode.NO_SUCH_ELEMENT, "Element was not in a form so couldn't submit");
  }
  a.send();
};
WebElement.isElementSelected = function(a, b) {
  b = Utils.getElementAt(b.id, a.session.getDocument());
  var c = !1;
  try {
    c = b.QueryInterface(Components.interfaces.nsIDOMHTMLOptionElement).selected;
  } catch (f) {
  }
  try {
    var d = b.QueryInterface(Components.interfaces.nsIDOMHTMLInputElement);
    if ("checkbox" == d.type || "radio" == d.type) {
      c = d.checked;
    }
  } catch (f) {
  }
  a.value = c;
  a.send();
};
WebElement.isElementDisplayed = function(a, b) {
  b = Utils.getElementAt(b.id, a.session.getDocument());
  a.value = bot.dom.isShown(b);
  a.send();
};
WebElement.getElementRect = function(a, b) {
  var c = Utils.getElementAt(b.id, a.session.getDocument());
  b = a.session.getWindow();
  c = Utils.getLocation(c);
  a.value = {x:Math.round(c.x + b.pageXOffset), y:Math.round(c.y + b.pageYOffset), width:Math.round(c.width), height:Math.round(c.height)};
  a.send();
};
WebElement.getElementValueOfCssProperty = function(a, b) {
  var c = Utils.getElementAt(b.id, a.session.getDocument());
  a.value = bot.dom.getEffectiveStyle(c, b.propertyName);
  a.send();
};
WebElement.getElementLocationOnceScrolledIntoView = function(a, b) {
  b = Utils.getElementAt(b.id, a.session.getDocument());
  Utils.getMainDocumentElement(b.ownerDocument).focus();
  b = Utils.getLocationOnceScrolledIntoView(b, 0 == a.session.elementScrollBehavior);
  a.value = {x:Math.round(b.x), y:Math.round(b.y)};
  a.send();
};
fxdriver.CommandResponse = function(a, b) {
  this.statusBarLabel_ = null;
  this.responseHandler_ = b;
  this.json_ = {name:a ? a.name : "Unknown command", sessionId:a.sessionId, status:bot.ErrorCode.SUCCESS, value:""};
  goog.isObject(this.json_.sessionId) && (this.json_.sessionId = this.json_.sessionId.value);
  this.session = null;
};
fxdriver.CommandResponse.prototype = {startCommand:function(a) {
  if (this.statusBarLabel_ = a.document.getElementById("fxdriver-label")) {
    this.statusBarLabel_.style.color = "red";
  }
}, send:function() {
  this.responseSent_ || (this.statusBarLabel_ && (this.statusBarLabel_.style.color = "black"), this.responseHandler_.handleResponse(JSON.stringify(this.json_)), this.responseSent_ = !0);
}, sendError:function(a) {
  this.status = a.isWebDriverError ? a.code : bot.ErrorCode.UNKNOWN_ERROR;
  this.value = fxdriver.error.toJSON(a);
  this.send();
}, set name(a) {
  this.json_.name = a;
}, get name() {
  return this.json_.name;
}, get sessionId() {
  return this.json_.sessionId;
}, set sessionId(a) {
  this.json_.sessionId = a;
}, set status(a) {
  this.json_.status = a;
}, get status() {
  return this.json_.status;
}, set value(a) {
  this.json_.value = a;
}, get value() {
  return this.json_.value;
}};
var DelayedCommand = function(a, b, c, d) {
  this.driver_ = a;
  this.command_ = b;
  this.response_ = c;
  this.onBlank_ = !1;
  this.sleepDelay_ = d || DelayedCommand.DEFAULT_SLEEP_DELAY;
  a = c.session.getWindow();
  try {
    this.loadGroup_ = !a || a.closed ? {isPending:function() {
      return !1;
    }} : a.QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsIWebNavigation).QueryInterface(Components.interfaces.nsIInterfaceRequestor).getInterface(Components.interfaces.nsILoadGroup);
  } catch (f) {
    throw c.sendError(f), f;
  }
};
DelayedCommand.DEFAULT_SLEEP_DELAY = 100;
DelayedCommand.LOG_ = fxdriver.logging.getLogger("fxdriver.DelayedCommand");
DelayedCommand.prototype.execute = function(a) {
  this.response_.session.getWaitForPageLoad() && !this.yieldedForBackgroundExecution_ && (this.yieldedForBackgroundExecution_ = !0, fxdriver.profiler.log({event:"YIELD_TO_PAGE_LOAD", startorend:"start"}));
  var b = this;
  this.driver_.window.setTimeout(function() {
    b.executeInternal_();
  }, a);
};
DelayedCommand.prototype.shouldDelayExecutionForPendingRequest_ = function() {
  if (!this.response_.session.getWaitForPageLoad()) {
    return !1;
  }
  if (this.loadGroup_.isPending()) {
    for (var a = !1, b = 0, c = this.loadGroup_.requests; c.hasMoreElements();) {
      var d = null, f = c.getNext();
      try {
        d = f.QueryInterface(Components.interfaces.nsIRequest);
      } catch (g) {
        goog.log.info(DelayedCommand.LOG_, "Ignoring non-nsIRequest: " + f);
        continue;
      }
      f = !1;
      try {
        f = d.isPending();
      } catch (g) {
        return !0;
      }
      if (f && (b += 1, a = a || "about:document-onload-blocker" == d.name, 1 < b)) {
        return !0;
      }
    }
    if (b && !a) {
      return goog.log.info(DelayedCommand.LOG_, "Ignoring pending about:document-onload-blocker request"), !0;
    }
  }
  fxdriver.profiler.log({event:"YIELD_TO_PAGE_LOAD", startorend:"end"});
  return !1;
};
DelayedCommand.prototype.checkPreconditions_ = function(a, b, c) {
  if (a) {
    for (var d, f = a.length, g = 0; g < f; g++) {
      if (d = a[g](b.session.getDocument(), c)) {
        throw d;
      }
    }
  }
};
DelayedCommand.prototype.executeInternal_ = function() {
  if (this.shouldDelayExecutionForPendingRequest_()) {
    return this.execute(this.sleepDelay_);
  }
  if ("about:blank" != this.driver_.window.location || this.onBlank_) {
    try {
      this.response_.name = this.command_.name;
      var a = this.driver_.response_ = this.response_;
      DelayedCommand.execTimer = new fxdriver.Timer;
      var b = (new Date).getTime() + this.response_.session.getImplicitWait(), c = this.command_.name, d = this.driver_[c] || WebElement[c], f = this.command_.parameters, g = goog.bind(d, this.driver_, this.response_, f), h = goog.bind(this.checkPreconditions_, this, d.preconditions, this.response_, f), k = function() {
        try {
          h(), g();
        } catch (m) {
          (new Date).getTime() < b ? DelayedCommand.execTimer.setTimeout(k, 100) : (m.isWebDriverError || goog.log.error(DelayedCommand.LOG_, "Exception caught by driver: " + c + "(" + f + ")", m), a.sendError(m));
        }
      };
      k();
    } catch (m) {
      m.isWebDriverError || goog.log.error(DelayedCommand.LOG_, "Exception caught by driver: " + this.command_.name + "(" + this.command_.parameters + ")", m), this.response_.sendError(m);
    }
  } else {
    return this.onBlank_ = !0, this.execute(this.sleepDelay_);
  }
};
var nsCommandProcessor = function() {
  this.wrappedJSObject = this;
  this.wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
};
nsCommandProcessor.LOG_ = fxdriver.logging.getLogger("fxdriver.nsCommandProcessor");
nsCommandProcessor.prototype.flags = Components.interfaces.nsIClassInfo.DOM_OBJECT;
nsCommandProcessor.prototype.implementationLanguage = Components.interfaces.nsIProgrammingLanguage.JAVASCRIPT;
nsCommandProcessor.prototype.execute = function(a, b) {
  try {
    var c = JSON.parse(a);
  } catch (f) {
    a = JSON.stringify({status:bot.ErrorCode.UNKNOWN_ERROR, value:'Error parsing command: "' + a + '"'});
    b.handleResponse(a);
    return;
  }
  a = new fxdriver.CommandResponse(c, b);
  if ("newSession" == c.name || "quit" == c.name || "getStatus" == c.name || "getWindowHandles" == c.name) {
    goog.log.info(nsCommandProcessor.LOG_, "Received command: " + c.name);
    try {
      this[c.name](a, c.parameters);
    } catch (f) {
      a.sendError(f);
    }
  } else {
    if (b = c.sessionId) {
      try {
        a.session = Components.classes["@googlecode.com/webdriver/wdsessionstoreservice;1"].getService(Components.interfaces.nsISupports).wrappedJSObject.getSession(b).wrappedJSObject;
      } catch (f) {
        a.sendError(new WebDriverError(bot.ErrorCode.UNKNOWN_ERROR, "Session not found: " + b));
        return;
      }
      goog.log.info(nsCommandProcessor.LOG_, "Received command: " + c.name);
      if ("getSessionCapabilities" == c.name || "switchToWindow" == c.name || "getLog" == c.name || "getAvailableLogTypes" == c.name) {
        return this[c.name](a, c.parameters);
      }
      var d = a.session.getChromeWindow();
      if (b = d.fxdriver) {
        try {
          if (!d.getBrowser().contentWindow) {
            a.sendError(new WebDriverError(bot.ErrorCode.NO_SUCH_WINDOW, "Window not found. The browser window may have been closed."));
            return;
          }
        } catch (f) {
          a.sendError(new WebDriverError(bot.ErrorCode.NO_SUCH_WINDOW, "Window not found. The browser window may have been closed."));
          return;
        }
        if (b.modalOpen && "getAlertText" != c.name && "setAlertValue" != c.name && "acceptAlert" != c.name && "dismissAlert" != c.name) {
          switch(c = b.modalOpen, fxdriver.modals.getUnexpectedAlertBehaviour()) {
            case "accept":
              fxdriver.modals.closeUnhandledAlert(a, b, !0);
              break;
            case "ignore":
              a.sendError(new WebDriverError(bot.ErrorCode.UNEXPECTED_ALERT_OPEN, "Modal dialog present", {alert:{text:c}}));
              break;
            default:
              fxdriver.modals.closeUnhandledAlert(a, b, !1);
          }
        } else {
          "function" != typeof b[c.name] && "function" != typeof WebElement[c.name] ? (a.sendError(new WebDriverError(bot.ErrorCode.UNKNOWN_COMMAND, "Unrecognised command: " + c.name)), goog.log.error(nsCommandProcessor.LOG_, "Unknown command: " + c.name)) : ("get" != c.name && "refresh" != c.name || a.session.setWaitForPageLoad(!1), a.startCommand(d), (new DelayedCommand(b, c, a)).execute(0));
        }
      } else {
        a.sendError(new WebDriverError(bot.ErrorCode.UNKNOWN_ERROR, "Session [" + a.session.getId() + "] has no driver. The browser window may have been closed."));
      }
    } else {
      a.sendError(new WebDriverError(bot.ErrorCode.UNKNOWN_ERROR, "No session ID specified"));
    }
  }
};
nsCommandProcessor.prototype.switchToWindow = function(a, b, c) {
  var d = b.name;
  if (!this.searchWindows_("navigator:browser", function(b) {
    if (!b.closed && b.top && b.top.fxdriver && b.content && b.content.name == d || b.top && b.top.fxdriver && b.top.fxdriver.id == d) {
      return b.focus(), b.top.fxdriver ? (a.session.setChromeWindow(b.top), a.value = a.session.getId(), a.send()) : a.sendError(new WebDriverError(bot.ErrorCode.UNKNOWN_ERROR, "No driver found attached to top window!")), !0;
    }
  })) {
    var f = c || 0;
    if (3 < f) {
      a.sendError(new WebDriverError(bot.ErrorCode.NO_SUCH_WINDOW, 'Unable to locate window "' + d + '"'));
    } else {
      var g = this;
      this.wm.getMostRecentWindow("navigator:browser").setTimeout(function() {
        g.switchToWindow(a, b, f + 1);
      }, 500);
    }
  }
};
nsCommandProcessor.prototype.getWindowHandles = function(a) {
  var b = [];
  this.searchWindows_("navigator:browser", function(a) {
    a.top && a.top.fxdriver && b.push(a.top.fxdriver.id);
  });
  a.value = b;
  a.send();
};
nsCommandProcessor.prototype.getLog = function(a, b) {
  b = fxdriver.logging.getLog(b.type);
  goog.array.forEach(b, function(a) {
    a.level = a.level.name;
  });
  a.value = b;
  a.send();
};
nsCommandProcessor.prototype.getAvailableLogTypes = function(a, b) {
  a.value = fxdriver.logging.getAvailableLogTypes();
  a.send();
};
nsCommandProcessor.prototype.searchWindows_ = function(a, b) {
  for (a = this.wm.getEnumerator(a); a.hasMoreElements();) {
    var c = a.getNext();
    if (b(c)) {
      return !0;
    }
  }
  return !1;
};
nsCommandProcessor.prototype.getStatus = function(a) {
  var b = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime), c = Components.classes["@googlecode.com/webdriver/wdsessionstoreservice;1"].getService(Components.interfaces.nsISupports).wrappedJSObject.getSessions();
  if (goog.array.isEmpty(c)) {
    var d = !0;
    c = "No currently active sessions";
  } else {
    d = !1, c = "Currently active sessions: " + c;
  }
  try {
    var f = (b.XPCOMABI || "unknown").split("-")[0];
  } catch (g) {
    f = "unknown";
  }
  a.value = {ready:d, message:c, os:{arch:f, name:b.OS, version:"unknown"}, build:{revision:"unknown", time:"unknown", version:"unknown"}};
  a.send();
};
nsCommandProcessor.prototype.newSession = function(a, b) {
  var c = this.wm.getMostRecentWindow("navigator:browser"), d = c.fxdriver;
  if (d) {
    var f = Components.classes["@googlecode.com/webdriver/wdsessionstoreservice;1"].getService(Components.interfaces.nsISupports), g = b.desiredCapabilities;
    b = f.wrappedJSObject.createSession(a, g, b.requiredCapabilities, d);
    b = b.wrappedJSObject;
    b.setChromeWindow(c);
    "elementScrollBehavior" in g && (b.elementScrollBehavior = g.elementScrollBehavior);
    a.session = b;
    a.sessionId = b.getId();
    goog.log.info(nsCommandProcessor.LOG_, "Created a new session with id: " + b.getId());
    this.getSessionCapabilities(a);
  } else {
    a.sendError(new WebDriverError(bot.ErrorCode.UNKNOWN_ERROR, "No drivers associated with the window")), a.send();
  }
};
nsCommandProcessor.prototype.getSessionCapabilities = function(a) {
  var b = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULAppInfo), c = Components.classes["@mozilla.org/xre/app-info;1"].getService(Components.interfaces.nsIXULRuntime);
  a.value = {cssSelectorsEnabled:!0, browserName:"firefox", handlesAlerts:!0, javascriptEnabled:!0, nativeEvents:!1, platform:"WINNT" == c.OS ? "WINDOWS" : c.OS, rotatable:!1, takesScreenshot:!0, version:b.version};
  var b = fxdriver.moz.getService("@mozilla.org/preferences-service;1", "nsIPrefService"), d;
  for (d in wdSessionStoreService.CAPABILITY_PREFERENCE_MAPPING) {
    c = wdSessionStoreService.CAPABILITY_PREFERENCE_MAPPING[d];
    try {
      a.value[d] = b.getBoolPref(c);
    } catch (f) {
      try {
        a.value[d] = b.getIntPref(c);
      } catch (g) {
        try {
          a.value[d] = b.getCharPref(c);
        } catch (h) {
        }
      }
    }
  }
  a.send();
};
nsCommandProcessor.prototype.quit = function(a) {
  a.send();
  wdSession.quitBrowser(500);
};
nsCommandProcessor.prototype.getInterfaces = function(a) {
  var b = [Components.interfaces.nsICommandProcessor, Components.interfaces.nsISupports];
  a.value = b.length;
  return b;
};
nsCommandProcessor.prototype.QueryInterface = function(a) {
  if (!a.equals(Components.interfaces.nsICommandProcessor) && !a.equals(Components.interfaces.nsISupports)) {
    throw Components.results.NS_ERROR_NO_INTERFACE;
  }
  return this;
};
nsCommandProcessor.CLASS_ID = Components.ID("{692e5117-a4a2-4b00-99f7-0685285b4db5}");
nsCommandProcessor.CLASS_NAME = "Firefox WebDriver CommandProcessor";
nsCommandProcessor.CONTRACT_ID = "@googlecode.com/webdriver/command-processor;1";
nsCommandProcessor.Factory = {instance_:null, createInstance:function(a, b) {
  if (null != a) {
    throw Components.results.NS_ERROR_NO_AGGREGATION;
  }
  this.instance_ || (this.instance_ = new nsCommandProcessor);
  return this.instance_.QueryInterface(b);
}};
nsCommandProcessor.Module = {firstTime_:!0, registerSelf:function(a, b, c, d) {
  if (this.firstTime_) {
    throw this.firstTime_ = !1, Components.results.NS_ERROR_FACTORY_REGISTER_AGAIN;
  }
  a.QueryInterface(Components.interfaces.nsIComponentRegistrar).registerFactoryLocation(nsCommandProcessor.CLASS_ID, nsCommandProcessor.CLASS_NAME, nsCommandProcessor.CONTRACT_ID, b, c, d);
}, unregisterSelf:function(a, b) {
  a.QueryInterface(Components.interfaces.nsIComponentRegistrar).unregisterFactoryLocation(nsCommandProcessor.CLASS_ID, b);
}, getClassObject:function(a, b, c) {
  if (!c.equals(Components.interfaces.nsIFactory)) {
    throw Components.results.NS_ERROR_NOT_IMPLEMENTED;
  }
  if (!b.equals(nsCommandProcessor.CLASS_ID)) {
    throw Components.results.NS_ERROR_NO_INTERFACE;
  }
  return nsCommandProcessor.Factory;
}, canUnload:function() {
  return !0;
}};
NSGetModule = function() {
  return nsCommandProcessor.Module;
};
nsCommandProcessor.prototype.classID = nsCommandProcessor.CLASS_ID;
fxdriver.moz.load("resource://gre/modules/XPCOMUtils.jsm");
XPCOMUtils.generateNSGetFactory && (NSGetFactory = XPCOMUtils.generateNSGetFactory([nsCommandProcessor]));

