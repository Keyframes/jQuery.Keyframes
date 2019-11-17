(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _core = _interopRequireDefault(require("@keyframes/core"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
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
    define: _core["default"].define
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

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
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
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var add_px_to_style_1 = __importDefault(require("add-px-to-style"));

var hyphenate_style_name_1 = __importDefault(require("hyphenate-style-name"));

var wait = function wait() {
  return new Promise(function (accept) {
    requestAnimationFrame(function () {
      accept();
    });
  });
};

var isBrowser = typeof window !== 'undefined';
var keyframesSheet;

if (isBrowser) {
  var styleElem = document.createElement('style');
  styleElem.setAttribute('id', 'keyframesjs-stylesheet');
  document.head.appendChild(styleElem);
  keyframesSheet = styleElem.sheet;
}

var voidFunction = function voidFunction() {};

var objToCss = function objToCss(obj) {
  if (!Object.keys(obj).length) {
    return '';
  }

  var result = '';

  for (var key in obj) {
    result += hyphenate_style_name_1["default"](key) + ":" + add_px_to_style_1["default"](key, obj[key]) + ";";
  }

  return result;
};

var Keyframes = function () {
  function Keyframes(elem) {
    this.queueStore = [];
    this.callbacks = {
      onStart: voidFunction,
      onBeforeStart: voidFunction,
      onIteration: voidFunction,
      onEnd: voidFunction
    };
    this.animationendListener = voidFunction;
    this.animationiterationListener = voidFunction;
    this.mountedElement = elem;
  }

  Keyframes.isSupported = function () {
    return document.body.style.animationName !== undefined;
  };

  Keyframes.prototype.reset = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.removeEvents();
            this.mountedElement.style.animationPlayState = 'running';
            this.mountedElement.style.animation = 'none';
            return [4, wait()];

          case 1:
            _a.sent();

            return [2, this];
        }
      });
    });
  };

  Keyframes.prototype.pause = function () {
    this.mountedElement.style.animationPlayState = 'paused';
    return this;
  };

  Keyframes.prototype.resume = function () {
    this.mountedElement.style.animationPlayState = 'running';
    return this;
  };

  Keyframes.prototype.play = function (animationOptions, callbacks) {
    var _this = this;

    if (this.mountedElement.style.animationName === this.getAnimationName(animationOptions)) {
      requestAnimationFrame(function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4, this.reset()];

              case 1:
                _a.sent();

                this.play(animationOptions, callbacks);
                return [2];
            }
          });
        });
      });
      return this;
    }

    var _a = callbacks || {},
        _b = _a.onBeforeStart,
        onBeforeStart = _b === void 0 ? null : _b,
        _c = _a.onStart,
        onStart = _c === void 0 ? null : _c,
        _d = _a.onIteration,
        onIteration = _d === void 0 ? null : _d,
        _e = _a.onEnd,
        onEnd = _e === void 0 ? null : _e;

    var animationcss = Keyframes.playCSS(animationOptions);

    var addEvent = function addEvent(type, eventCallback) {
      var listenerName = type + "Listener";

      _this.mountedElement.removeEventListener(type, _this[listenerName]);

      _this[listenerName] = eventCallback;

      _this.mountedElement.addEventListener(type, _this[listenerName]);
    };

    if (onBeforeStart) {
      onBeforeStart();
    }

    this.mountedElement.style.animationPlayState = 'running';
    this.mountedElement.style.animation = animationcss;

    if (onIteration) {
      addEvent('animationiteration', onIteration);
    }

    if (onEnd) {
      addEvent('animationend', onEnd);
    }

    if (onStart) {
      requestAnimationFrame(onStart);
    }

    return this;
  };

  Keyframes.prototype.removeEvents = function () {
    this.mountedElement.removeEventListener('animationiteration', this.animationiterationListener);
    this.mountedElement.removeEventListener('animationend', this.animationendListener);
    return this;
  };

  Keyframes.prototype.playNext = function () {
    var _this = this;

    var animationOption = this.queueStore.pop();

    if (animationOption) {
      this.play(animationOption, {
        onEnd: function onEnd() {
          return _this.playNext();
        },
        onIteration: this.callbacks.onIteration
      });
    } else if (this.callbacks.onEnd) {
      this.callbacks.onEnd();
    }
  };

  Keyframes.prototype.updateCallbacks = function (callbacks) {
    if (callbacks) {
      this.callbacks = __assign(__assign({}, this.callbacks), callbacks);
    }
  };

  Keyframes.prototype.queue = function (animationOptions, callbacks) {
    var currentQueueLength = this.queueStore.length;
    this.updateCallbacks(callbacks);

    if (animationOptions.constructor === Array) {
      this.queueStore = animationOptions.reverse().concat(this.queueStore);
    } else {
      this.queueStore.unshift(animationOptions);
    }

    if (!currentQueueLength) {
      if (this.callbacks.onBeforeStart) {
        this.callbacks.onBeforeStart();
      }

      this.playNext();

      if (this.callbacks.onStart) {
        requestAnimationFrame(this.callbacks.onStart);
      }
    }

    return this;
  };

  Keyframes.prototype.resetQueue = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, wait()];

          case 1:
            _a.sent();

            this.removeEvents();
            this.queueStore = [];
            return [4, this.reset()];

          case 2:
            _a.sent();

            return [2, this];
        }
      });
    });
  };

  Keyframes.prototype.chain = function (animationOptions, callbacks) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4, this.resetQueue()];

          case 1:
            _a.sent();

            this.queue(animationOptions, callbacks);
            return [2, this];
        }
      });
    });
  };

  Keyframes.prototype.getAnimationName = function (animationObject) {
    switch (animationObject.constructor) {
      case Array:
        {
          return animationObject.map(this.getAnimationName).join(', ');
        }

      case String:
        {
          return animationObject.split(' ')[0];
        }

      default:
        {
          return animationObject.name;
        }
    }
  };

  Keyframes.playCSS = function (animationOptions) {
    var animObjToStr = function animObjToStr(obj) {
      var newObj = __assign({
        duration: '0s',
        timingFunction: 'ease',
        delay: '0s',
        iterationCount: 1,
        direction: 'normal',
        fillMode: 'forwards'
      }, obj);

      return [newObj.name, newObj.duration, newObj.timingFunction, newObj.delay, newObj.iterationCount, newObj.direction, newObj.fillMode].join(' ');
    };

    if (animationOptions.constructor === Array) {
      var animationOptionArray = animationOptions;
      var animationOptionsStrings = [];

      for (var i = 0; i < animationOptionArray.length; i += 1) {
        animationOptionsStrings.push(animationOptionArray[i].constructor === String ? animationOptionArray[i] : animObjToStr(animationOptionArray[i]));
      }

      return animationOptionsStrings.join(', ');
    }

    if (animationOptions.constructor === String) {
      return animationOptions;
    }

    return animObjToStr(animationOptions);
  };

  Keyframes.generateCSS = function (frameData) {
    var css = "@keyframes " + frameData.name + " {";

    for (var key in frameData) {
      if (key !== 'name' && key !== 'media' && key !== 'complete') {
        var cssRuleObject = objToCss(frameData[key]);
        css += key + " {" + cssRuleObject + "}";
      }
    }

    css += '}';

    if (frameData.media) {
      css = "@media " + frameData.media + "{" + css + "}";
    }

    return css;
  };

  Keyframes.generate = function (frameData) {
    var css = this.generateCSS(frameData);
    var oldFrameIndex = Keyframes.rules.indexOf(frameData.name);

    if (oldFrameIndex > -1) {
      Keyframes.sheet.deleteRule(oldFrameIndex);
      Keyframes.rules.splice(oldFrameIndex, 1);
    }

    var ruleIndex = (Keyframes.sheet.cssRules || Keyframes.sheet.rules).length;
    Keyframes.sheet.insertRule(css, ruleIndex);
    Keyframes.rules[ruleIndex] = frameData.name;
  };

  Keyframes.define = function (frameOptions) {
    if (frameOptions.length) {
      for (var i = 0; i < frameOptions.length; i += 1) {
        this.generate(frameOptions[i]);
      }
    } else {
      this.generate(frameOptions);
    }
  };

  Keyframes.defineCSS = function (frameOptions) {
    if (frameOptions.length) {
      var css = '';

      for (var i = 0; i < frameOptions.length; i += 1) {
        css += this.generateCSS(frameOptions[i]);
      }

      return css;
    }

    return this.generateCSS(frameOptions);
  };

  Keyframes.plugin = function (pluginFunc) {
    if (pluginFunc.constructor === Array) {
      for (var i = 0; i < pluginFunc.length; i += 1) {
        pluginFunc[i](this);
      }
    } else {
      pluginFunc(this);
    }
  };

  Keyframes.sheet = keyframesSheet;
  Keyframes.rules = [];
  return Keyframes;
}();

if (isBrowser) {
  window.Keyframes = Keyframes;
}

exports["default"] = Keyframes;

},{"add-px-to-style":3,"hyphenate-style-name":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
