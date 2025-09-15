(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _core = _interopRequireDefault(require("@keyframes/core"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
(function ($) {
  var doForEach = function doForEach($el, cb) {
    $el.each(function (_, elem) {
      if (elem.Keyframes) {
        cb(elem.Keyframes);
      } else {
        elem.Keyframes = new _core["default"](elem);
        cb(elem.Keyframes);
      }
    });
  };
  $.keyframe = {
    isSupported: _core["default"].isSupported,
    generate: _core["default"].generate,
    generateCSS: _core["default"].generateCSS,
    define: function define(obj) {
      return _core["default"].define(obj);
    }
  };
  $.fn.resetKeyframe = function (cb) {
    var $this = this;
    doForEach($this, function (kf) {
      return kf.reset().then(cb);
    });
  };
  $.fn.pauseKeyframe = function () {
    var $this = this;
    doForEach($this, function (kf) {
      return kf.pause();
    });
  };
  $.fn.resumeKeyframe = function () {
    var $this = this;
    doForEach($this, function (kf) {
      return kf.resume();
    });
  };
  $.fn.playKeyframe = function (frameOptions, callbacks) {
    var $this = this;
    var cb = callbacks;
    if (frameOptions.complete) {
      callbacks = frameOptions.complete;
    }
    if (typeof callbacks === 'function') {
      cb = {
        onIteration: callbacks,
        onEnd: callbacks
      };
    }
    doForEach($this, function (kf) {
      return kf.play(frameOptions, cb);
    });
  };
})(jQuery);

},{"@keyframes/core":2}],2:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var keyframesSheet,
  styleElem,
  __assign = void 0 && (void 0).__assign || function () {
    return (__assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) for (var p in s = arguments[i]) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
      return t;
    }).apply(this, arguments);
  },
  __createBinding = void 0 && (void 0).__createBinding || (Object.create ? function (o, m, k, k2) {
    void 0 === k2 && (k2 = k);
    var desc = Object.getOwnPropertyDescriptor(m, k);
    desc && ("get" in desc ? m.__esModule : !desc.writable && !desc.configurable) || (desc = {
      enumerable: !0,
      get: function get() {
        return m[k];
      }
    }), Object.defineProperty(o, k2, desc);
  } : function (o, m, k, k2) {
    o[k2 = void 0 === k2 ? k : k2] = m[k];
  }),
  __exportStar = void 0 && (void 0).__exportStar || function (m, exports) {
    for (var p in m) "default" === p || Object.prototype.hasOwnProperty.call(exports, p) || __createBinding(exports, m, p);
  },
  __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P = P || Promise)(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        var value;
        result.done ? resolve(result.value) : ((value = result.value) instanceof P ? value : new P(function (resolve) {
          resolve(value);
        })).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  },
  __generator = void 0 && (void 0).__generator || function (thisArg, body) {
    var f,
      y,
      t,
      _ = {
        label: 0,
        sent: function sent() {
          if (1 & t[0]) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      g = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), "function" == typeof Symbol && (g[Symbol.iterator] = function () {
      return this;
    }), g;
    function verb(n) {
      return function (v) {
        var op = [n, v];
        if (f) throw new TypeError("Generator is already executing.");
        for (; _ = g && op[g = 0] ? 0 : _;) try {
          if (f = 1, y && (t = 2 & op[0] ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          switch (y = 0, (op = t ? [2 & op[0], t.value] : op)[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              return _.label++, {
                value: op[1],
                done: !1
              };
            case 5:
              _.label++, y = op[1], op = [0];
              continue;
            case 7:
              op = _.ops.pop(), _.trys.pop();
              continue;
            default:
              if (!(t = 0 < (t = _.trys).length && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
                _ = 0;
                continue;
              }
              if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) _.label = op[1];else if (6 === op[0] && _.label < t[1]) _.label = t[1], t = op;else {
                if (!(t && _.label < t[2])) {
                  t[2] && _.ops.pop(), _.trys.pop();
                  continue;
                }
                _.label = t[2], _.ops.push(op);
              }
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e], y = 0;
        } finally {
          f = t = 0;
        }
        if (5 & op[0]) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: !0
        };
      };
    }
  },
  __read = void 0 && (void 0).__read || function (o, n) {
    var m = "function" == typeof Symbol && o[Symbol.iterator];
    if (!m) return o;
    var r,
      e,
      i = m.call(o),
      ar = [];
    try {
      for (; (void 0 === n || 0 < n--) && !(r = i.next()).done;) ar.push(r.value);
    } catch (error) {
      e = {
        error: error
      };
    } finally {
      try {
        r && !r.done && (m = i["return"]) && m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  },
  __spreadArray = void 0 && (void 0).__spreadArray || function (to, from, pack) {
    if (pack || 2 === arguments.length) for (var ar, i = 0, l = from.length; i < l; i++) !ar && i in from || ((ar = ar || Array.prototype.slice.call(from, 0, i))[i] = from[i]);
    return to.concat(ar || Array.prototype.slice.call(from));
  },
  __importDefault = void 0 && (void 0).__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
      "default": mod
    };
  },
  add_px_to_style_1 = (Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.isBrowser = void 0, __importDefault(require("add-px-to-style"))),
  hyphenate_style_name_1 = __importDefault(require("hyphenate-style-name")),
  wait = function wait() {
    return new Promise(function (accept) {
      requestAnimationFrame(function () {
        accept();
      });
    });
  },
  clone = (exports.isBrowser = "undefined" != typeof window, exports.isBrowser && ((styleElem = document.createElement("style")).setAttribute("id", "keyframesjs-stylesheet"), document.head.appendChild(styleElem), keyframesSheet = styleElem.sheet), function (input) {
    return Array.isArray(input) ? __spreadArray([], __read(input), !1) : "object" == _typeof(input) ? __assign({}, input) : input.toString();
  }),
  voidFunction = function voidFunction() {},
  defaultCallbacks = {
    onStart: voidFunction,
    onBeforeStart: voidFunction,
    onIteration: voidFunction,
    onEnd: voidFunction,
    onQueueComplete: voidFunction,
    onCancel: voidFunction
  },
  objToCss = function objToCss(obj) {
    if (!Object.keys(obj).length) return "";
    var key,
      result = "";
    for (key in obj) result += "".concat((0, hyphenate_style_name_1["default"])(key), ":").concat((0, add_px_to_style_1["default"])(key, obj[key]), ";");
    return result;
  },
  Keyframes = function () {
    function Keyframes(elem, debug) {
      void 0 === debug && (debug = !1), this.playing = !1, this.previousCancel = voidFunction, this.debug = !1, this.queueStore = [], this.callbacks = defaultCallbacks, this.animationstartListener = voidFunction, this.animationendListener = voidFunction, this.animationiterationListener = voidFunction, this.animationcancelListener = voidFunction, this.mountedElement = elem, this.frozenStyles = [], this.debug = debug;
    }
    return Keyframes.isSupported = function () {
      return void 0 !== document.body.style.animationName;
    }, Keyframes.prototype.freeze = function () {
      var computedStyle_1,
        _this = this,
        ruleCache = Keyframes.ruleCache[this.mountedElement.style.animationName];
      ruleCache && (computedStyle_1 = __assign({}, getComputedStyle(this.mountedElement)), ruleCache.forEach(function (rule) {
        _this.mountedElement.style[rule] = computedStyle_1[rule];
      }), this.frozenStyles = __spreadArray([], __read(new Set(this.frozenStyles.concat(ruleCache))), !1));
    }, Keyframes.prototype.unfreeze = function () {
      var _this = this;
      this.frozenStyles.length && (this.frozenStyles.forEach(function (rule) {
        _this.mountedElement.style[rule] = "";
      }), this.frozenStyles = []);
    }, Keyframes.prototype.reset = function () {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return this.log("reset"), this.playing = !1, this.removeEvents(), this.mountedElement.style.animationPlayState = "running", this.mountedElement.style.animation = "none", [4, wait()];
            case 1:
              return _a.sent(), [2, this];
          }
        });
      });
    }, Keyframes.prototype.pause = function () {
      return this.mountedElement.style.animationPlayState = "paused", this;
    }, Keyframes.prototype.resume = function () {
      return this.mountedElement.style.animationPlayState = "running", this;
    }, Keyframes.prototype.play = function (animationOptions, callbacks) {
      var animationCount,
        _this = this,
        _a = (this.log("play", animationOptions), callbacks || {}),
        _b = _a.onBeforeStart,
        _b = void 0 === _b ? null : _b,
        _c = _a.onStart,
        onStart = void 0 === _c ? null : _c,
        _c = _a.onIteration,
        onIteration = void 0 === _c ? null : _c,
        _c = _a.onEnd,
        onEnd = void 0 === _c ? null : _c,
        _c = _a.onCancel,
        _a = void 0 === _c ? null : _c;
      return !0 === this.playing && (this.log("cancelled"), this.previousCancel) && (this.queueStore = [], this.previousCancel()), _a && (this.previousCancel = _a), this.mountedElement.style.animationName === this.getAnimationName(animationOptions) ? (this.freeze(), requestAnimationFrame(function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4, this.reset()];
              case 1:
                return _a.sent(), this.play(animationOptions, callbacks), this.unfreeze(), [2];
            }
          });
        });
      })) : (this.playing = !0, animationCount = Array.isArray(animationOptions) ? animationOptions.length : 1, _c = Keyframes.playCSS(animationOptions), _a = function _a(type, eventCallback) {
        var listenerName = "".concat(type, "Listener");
        _this.mountedElement.removeEventListener(type, _this[listenerName]), _this[listenerName] = eventCallback, _this.mountedElement.addEventListener(type, _this[listenerName]);
      }, this.log("onBeforeStart"), _b && _b(), this.mountedElement.style.animationPlayState = "running", this.mountedElement.style.animation = _c, _a("animationiteration", function (e) {
        _this.log("animationiteration", e), onIteration && onIteration(e);
      }), _a("animationend", function (e) {
        --animationCount || (_this.log("ended", e), _this.playing = !1, onEnd && !animationCount && onEnd(e));
      }), _a("animationstart", function (e) {
        _this.log("onStart", e), onStart && onStart(e);
      })), this;
    }, Keyframes.prototype.playNext = function () {
      var _this = this,
        animationOption = this.queueStore[this.queueStore.length - 1];
      animationOption ? this.log("playNext", animationOption) : this.log("Queue Complete"), animationOption ? this.play(animationOption, {
        onEnd: function onEnd(e) {
          _this.queueStore.pop(), _this.callbacks.onEnd && _this.callbacks.onEnd(e), _this.playNext();
        },
        onCancel: this.callbacks.onCancel,
        onIteration: this.callbacks.onIteration
      }) : this.callbacks.onQueueComplete && this.callbacks.onQueueComplete();
    }, Keyframes.prototype.removeEvents = function () {
      return this.log("events cleared"), this.mountedElement.removeEventListener("animationiteration", this.animationiterationListener), this.mountedElement.removeEventListener("animationend", this.animationendListener), this.mountedElement.removeEventListener("animationstart", this.animationstartListener), this;
    }, Keyframes.prototype.updateCallbacks = function (callbacks) {
      callbacks && (this.callbacks = __assign(__assign({}, this.callbacks), callbacks));
    }, Keyframes.prototype.queue = function (animationOptions, callbacks) {
      var _this = this,
        currentQueueLength = this.queueStore.length,
        callbacks = (this.updateCallbacks(__assign(__assign({}, defaultCallbacks), callbacks)), clone(animationOptions));
      return Array.isArray(callbacks) ? this.queueStore = callbacks.reverse().concat(this.queueStore) : this.queueStore.unshift(callbacks), this.log("queued", animationOptions, currentQueueLength), currentQueueLength ? this.playing || this.playNext() : requestAnimationFrame(function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4, this.reset()];
              case 1:
                return _a.sent(), this.playNext(), [2];
            }
          });
        });
      }), this;
    }, Keyframes.prototype.chain = function (animationOptions, callbacks) {
      return this.queue(animationOptions, callbacks), this;
    }, Keyframes.prototype.resetQueue = function () {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return this.log("resetQueue"), [4, wait()];
            case 1:
              return _a.sent(), this.removeEvents(), this.queueStore = [], [4, this.reset()];
            case 2:
              return _a.sent(), [2, this];
          }
        });
      });
    }, Keyframes.prototype.loop = function (animationOptions_1) {
      return __awaiter(this, arguments, void 0, function (animationOptions, callbacks) {
        var _populateQueue,
          _this = this;
        return void 0 === callbacks && (callbacks = {}), __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return this.log("loop", animationOptions), [4, this.resetQueue()];
            case 1:
              return _a.sent(), (_populateQueue = function populateQueue() {
                _this.queue(animationOptions, __assign(__assign({}, callbacks), {
                  onQueueComplete: function onQueueComplete() {
                    return _populateQueue();
                  }
                }));
              })(), [2, this];
          }
        });
      });
    }, Keyframes.prototype.getAnimationName = function (animationObject) {
      var _this = this;
      return Array.isArray(animationObject) ? animationObject.map(function (o) {
        return _this.getAnimationName(o);
      }).join(", ") : "string" == typeof animationObject ? animationObject.split(" ")[0] : animationObject.name;
    }, Keyframes.playCSS = function (animationOptions) {
      function animObjToStr(obj) {
        return [(obj = __assign({
          duration: "0s",
          timingFunction: "ease",
          delay: "0s",
          iterationCount: 1,
          direction: "normal",
          fillMode: "forwards"
        }, obj)).name, obj.duration, obj.timingFunction, obj.delay, obj.iterationCount, obj.direction, obj.fillMode].join(" ");
      }
      if (Array.isArray(animationOptions)) {
        for (var animationOptionsStrings = [], i = 0; i < animationOptions.length; i += 1) {
          var option = animationOptions[i];
          animationOptionsStrings.push("string" == typeof option ? option : animObjToStr(option));
        }
        return animationOptionsStrings.join(", ");
      }
      return "string" == typeof animationOptions ? animationOptions : animObjToStr(animationOptions);
    }, Keyframes.generateCSS = function (frameData) {
      var key,
        cssRuleObject,
        css = "@keyframes ".concat(frameData.name, " {");
      for (key in frameData) "name" !== key && "media" !== key && "complete" !== key && (cssRuleObject = objToCss(frameData[key]), css += "".concat(key, " {").concat(cssRuleObject, "}"));
      return css += "}", css = frameData.media ? "@media ".concat(frameData.media, "{").concat(css, "}") : css;
    }, Keyframes.generate = function (frameData) {
      this.addToRuleCache(frameData);
      var css = this.generateCSS(frameData),
        oldFrameIndex = Keyframes.rules.indexOf(frameData.name),
        oldFrameIndex = (-1 < oldFrameIndex && (Keyframes.sheet.deleteRule(oldFrameIndex), Keyframes.rules.splice(oldFrameIndex, 1)), (Keyframes.sheet.cssRules || Keyframes.sheet.rules).length);
      Keyframes.sheet.insertRule(css, oldFrameIndex), Keyframes.rules[oldFrameIndex] = frameData.name;
    }, Keyframes.define = function (frameOptions) {
      if (Array.isArray(frameOptions)) for (var i = 0; i < frameOptions.length; i += 1) this.generate(frameOptions[i]);else this.generate(frameOptions);
    }, Keyframes.defineCSS = function (frameOptions) {
      if (Array.isArray(frameOptions)) {
        for (var css = "", i = 0; i < frameOptions.length; i += 1) css += this.generateCSS(frameOptions[i]);
        return css;
      }
      return this.generateCSS(frameOptions);
    }, Keyframes.addToRuleCache = function (frameData) {
      var rules;
      this.ruleCache[frameData.name] || (rules = Object.values(frameData).filter(function (v) {
        return "object" == _typeof(v);
      }).map(function (v) {
        return Object.keys(v);
      }).flat(), this.ruleCache[frameData.name] = __spreadArray([], __read(new Set(rules)), !1));
    }, Keyframes.prototype.log = function (msg) {
      for (var _i = 1; _i < arguments.length; _i++) _i - 1, 0;
      this.debug;
    }, Keyframes.sheet = keyframesSheet, Keyframes.rules = [], Keyframes.ruleCache = {}, Keyframes.clearRules = function () {
      for (Keyframes.rules = []; Keyframes.sheet.cssRules.length;) Keyframes.sheet.deleteRule(0);
    }, Keyframes;
  }();
exports.isBrowser && (window.Keyframes = Keyframes), __exportStar(require("./pathfinder"), exports), __exportStar(require("./spritesheet"), exports), exports["default"] = Keyframes;

},{"./pathfinder":3,"./spritesheet":4,"add-px-to-style":5,"hyphenate-style-name":6}],3:[function(require,module,exports){
"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circlePath = exports.bezierPath = void 0;
var keyframes_1 = require("./keyframes");
function getCirclePoint(radians, radius, center) {
  return {
    x: center.x + radius * Math.cos(radians),
    y: center.y + radius * Math.sin(radians)
  };
}
var coord = function coord(x, y) {
  if (x === void 0) {
    x = 0;
  }
  if (y === void 0) {
    y = 0;
  }
  return {
    x: x,
    y: y
  };
};
var B1 = function B1(t) {
  return t * t * t;
};
var B2 = function B2(t) {
  return 3 * t * t * (1 - t);
};
var B3 = function B3(t) {
  return 3 * t * (1 - t) * (1 - t);
};
var B4 = function B4(t) {
  return (1 - t) * (1 - t) * (1 - t);
};
var getBezier = function getBezier(percent, C1, C2, C3, C4) {
  var pos = coord();
  pos.x = C1.x * B1(percent) + C2.x * B2(percent) + C3.x * B3(percent) + C4.x * B4(percent);
  pos.y = C1.y * B1(percent) + C2.y * B2(percent) + C3.y * B3(percent) + C4.y * B4(percent);
  return pos;
};
var bezierPath = function bezierPath(keyframeOptions, p1, p2, p3, p4) {
  var opts = __assign({
    bezierSteps: 100,
    transform: ""
  }, keyframeOptions);
  if (p4 == null) {
    p4 = p1;
  }
  var vector1 = coord(p1[0], p1[1]);
  var vector2 = coord(p2[0], p2[1]);
  var vector3 = coord(p3[0], p3[1]);
  var vector4 = coord(p4[0], p4[1]);
  var points = {};
  var step = 1 / opts.bezierSteps;
  for (var i = 0; i <= 1.01; i += step) {
    var newPosition = getBezier(i, vector1, vector4, vector3, vector2);
    points["".concat(100 - Math.round(i * 100), "%")] = {
      transform: "translate(".concat(newPosition.x, "px,").concat(newPosition.y, "px) ").concat(opts.transform)
    };
  }
  return Object.assign({}, keyframeOptions, points);
};
exports.bezierPath = bezierPath;
var circlePath = function circlePath(keyframeOptions, center, radius) {
  var opts = __assign({
    circleSteps: 100,
    transform: ""
  }, keyframeOptions);
  var points = {};
  var newCenter = coord(center[0], center[1]);
  var pieandahalf = 1.5 * Math.PI;
  var notmuchpie = Math.PI / 180;
  var stepPercentage = 100 / opts.circleSteps;
  var stepDegree = 360 / opts.circleSteps;
  for (var i = 0; i <= opts.circleSteps; i += 1) {
    var degree = stepDegree * i;
    var radians = pieandahalf + degree * notmuchpie;
    var newpos = getCirclePoint(radians, radius, newCenter);
    points["".concat(Math.round(stepPercentage * i), "%")] = {
      transform: "translate(".concat(newpos.x, "px,").concat(newpos.y, "px) ").concat(opts.transform)
    };
  }
  for (var step in keyframeOptions) {
    var rules = keyframeOptions[step];
    for (var newstep in points) {
      var newrules = points[newstep];
      if (step === newstep) {
        if (newrules.transform && rules.transform) {
          points[newstep].transform = "".concat(newrules.transform, " ").concat(rules.transform);
          break;
        }
      }
    }
  }
  return Object.assign({}, keyframeOptions, points);
};
exports.circlePath = circlePath;
if (keyframes_1.isBrowser) {
  var _window = window;
  if (_window.Keyframes) {
    _window.Keyframes.bezierPath = exports.bezierPath;
    _window.Keyframes.circlePath = exports.circlePath;
  }
}

},{"./keyframes":2}],4:[function(require,module,exports){
"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playSpriteSheet = exports.spriteSheet = void 0;
var keyframes_1 = require("./keyframes");
var spriteSheet = function spriteSheet(_a) {
  var _b = _a.rows,
    rows = _b === void 0 ? 1 : _b,
    _c = _a.cols,
    cols = _c === void 0 ? 1 : _c,
    _d = _a.width,
    width = _d === void 0 ? 0 : _d,
    _e = _a.height,
    height = _e === void 0 ? 0 : _e,
    rest = __rest(_a, ["rows", "cols", "width", "height"]);
  var defaults = {
    offsetX: 0,
    offsetY: 0,
    count: rows * cols,
    spriteWidth: width / cols,
    spriteHeight: height / rows,
    loop: true
  };
  var opts = __assign(__assign(__assign({}, defaults), {
    rows: rows,
    cols: cols,
    width: width,
    height: height
  }), rest);
  var spriteStep = 100 / opts.count;
  var spriteFrames = {};
  var x = opts.offsetX;
  var y = opts.offsetY;
  for (var i = 0; i < opts.count; i += 1) {
    spriteFrames["".concat(Math.round(spriteStep * i), "%")] = {
      backgroundPosition: "-".concat(x, "px -").concat(y, "px")
    };
    if (x >= opts.width - opts.spriteWidth) {
      y += opts.spriteHeight;
    } else {
      x += opts.spriteWidth;
    }
  }
  return Object.assign({}, {
    name: opts.name
  }, spriteFrames);
};
exports.spriteSheet = spriteSheet;
var playSpriteSheet = function playSpriteSheet(name, time, loops) {
  if (loops === void 0) {
    loops = 'infinite';
  }
  if (typeof loops === 'number' && loops < 0) {
    loops = 'infinite';
  }
  return "".concat(name, " ").concat(time, " steps(1) ").concat(loops);
};
exports.playSpriteSheet = playSpriteSheet;
if (keyframes_1.isBrowser) {
  var _window = window;
  if (_window.Keyframes) {
    _window.Keyframes.spriteSheet = exports.spriteSheet;
    _window.Keyframes.playSpriteSheet = exports.playSpriteSheet;
  }
}

},{"./keyframes":2}],5:[function(require,module,exports){
"use strict";

/* The following list is defined in React's core */
var IS_UNITLESS = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};
module.exports = function (name, value) {
  if (typeof value === 'number' && !IS_UNITLESS[name]) {
    return value + 'px';
  } else {
    return value;
  }
};

},{}],6:[function(require,module,exports){
'use strict';

/* eslint-disable no-var, prefer-template */
var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};
function toHyphenLower(match) {
  return '-' + match.toLowerCase();
}
function hyphenateStyleName(name) {
  if (cache.hasOwnProperty(name)) {
    return cache[name];
  }
  var hName = name.replace(uppercasePattern, toHyphenLower);
  return cache[name] = msPattern.test(hName) ? '-' + hName : hName;
}
module.exports = hyphenateStyleName;

},{}]},{},[1]);
