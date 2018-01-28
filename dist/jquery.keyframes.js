/* global $ */
var animationPlayState = 'animation-play-state';
var playStateRunning = 'running';

var $createKeyframeStyleTag = function $createKeyframeStyleTag(id, css) {
  return $("<style>".concat(css, "</style>")).attr({
    class: 'keyframe-style',
    id: id,
    type: 'text/css'
  }).appendTo('head');
};

$.keyframe = {
  isSupported: function isSupported() {
    return document.body.style.animationName !== undefined;
  },
  generate: function generate(frameData) {
    var _this = this;

    var frameName = frameData.name || '';
    var css = "@keyframes ".concat(frameName, " {");

    for (var key in frameData) {
      if (key !== 'name' && key !== 'media' && key !== 'complete') {
        css += "".concat(key, " {");

        for (var property in frameData[key]) {
          css += "".concat(property, ":").concat(frameData[key][property], ";");
        }

        css += '}';
      }
    }

    if (frameData.media) {
      css = "@media ".concat(frameData.media, "{").concat(css, "}");
    }

    var $frameStyle = $("style#".concat(frameData.name));

    if ($frameStyle.length > 0) {
      $frameStyle.html(css);
      var $elems = $('*').filter(function () {
        return _this.style.animationName === frameName;
      });
      $elems.each(function () {
        var $el = $(_this);
        var options = $el.data('keyframeOptions');
        $el.resetKeyframe(function () {
          $el.playKeyframe(options);
        });
      });
    } else {
      $createKeyframeStyleTag(frameName, css);
    }
  },
  define: function define(frameData) {
    if (frameData.length) {
      for (var i = 0; i < frameData.length; i += 1) {
        var frame = frameData[i];
        this.generate(frame);
      }
    } else {
      this.generate(frameData);
    }
  }
};

$.fn.resetKeyframe = function (callback) {
  $(this).css(animationPlayState, playStateRunning).css('animation', 'none');

  if (callback) {
    setTimeout(callback, 1);
  }
};

$.fn.pauseKeyframe = function () {
  $(this).css(animationPlayState, 'paused');
};

$.fn.resumeKeyframe = function () {
  $(this).css(animationPlayState, playStateRunning);
};

$.fn.playKeyframe = function (frameOptions, callback) {
  var animObjToStr = function animObjToStr(obj) {
    var newObj = $.extend({
      duration: '0s',
      timingFunction: 'ease',
      delay: '0s',
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'forwards'
    }, obj);
    return [newObj.name, newObj.duration, newObj.timingFunction, newObj.delay, newObj.iterationCount, newObj.direction, newObj.fillMode].join(' ');
  };

  var animationcss = '';

  if ($.isArray(frameOptions)) {
    var frameOptionsStrings = [];

    for (var i = 0; i < frameOptions.length; i += 1) {
      frameOptionsStrings.push(typeof frameOptions[i] === 'string' ? frameOptions[i] : animObjToStr(frameOptions[i]));
    }

    animationcss = frameOptionsStrings.join(', ');
  } else if (typeof frameOptions === 'string') {
    animationcss = frameOptions;
  } else {
    animationcss = animObjToStr(frameOptions);
  }

  var addEvent = function addEvent(element, type, eventCallback) {
    element.off(type).on(type.toLowerCase(), eventCallback || frameOptions.complete);
  };

  this.each(function () {
    var $el = $(this).addClass('boostKeyframe').css({
      animationPlayState: playStateRunning,
      animation: animationcss
    }).data('keyframeOptions', frameOptions);
    addEvent($el, 'AnimationIteration', callback);
    addEvent($el, 'AnimationEnd', callback);
  });
  return this;
};

$createKeyframeStyleTag('boost-keyframe', ' .boostKeyframe{transform:scale3d(1,1,1);}');