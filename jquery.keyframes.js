(function() {
    var $createKeyframeStyleTag, animationPlayState, playStateRunning,
        animationSupport = false,
        animationString = 'animation',
        vendorPrefix = prefix = '',
        domPrefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'];

    $(window).load(function(){
        var body = document.body;
        if( body.style.animationName !== undefined ) { animationSupport = true; }

        if( animationSupport === false ) {
            for( var i = 0; i < domPrefixes.length; i++ ) {
                if( body.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                    prefix = domPrefixes[ i ];
                    animationString = prefix + 'Animation';
                    vendorPrefix = '-' + prefix.toLowerCase() + '-';
                    animationSupport = true;
                    break;
                }
            }
        }
    });


    $createKeyframeStyleTag = function(params) {
        return $("<style>").attr({
            class: "keyframe-style",
            id: params.id,
            type: "text/css"
        }).appendTo("head");
    };

    $.keyframe = {
        getVendorPrefix: function() {
            return vendorPrefix;
        },
        isSupported: function() {
            return animationSupport;
        },
        generate: function(frameData) {
            var $elems, $frameStyle, css, frameName, property, key;
            frameName = frameData.name || "";
            css = "@" + vendorPrefix + "keyframes " + frameName + " {";

            for (key in frameData) {
                if (key !== "name") {
                    css += key + " {";

                    for (property in frameData[key]) {
                        css += property + ":" + frameData[key][property] + ";";
                    }

                    css += "}";
                }
            }

            css = PrefixFree.prefixCSS(css + "}");

            $frameStyle = $("style#" + frameData.name);

            if ($frameStyle.length > 0) {
                $frameStyle.html(css);

                $elems = $("*").filter(function() {
                    this.style["" + animationString + "Name"] === frameName;
                });

                $elems.each(function() {
                    var $el, options;
                    $el = $(this);
                    options = $el.data("keyframeOptions");
                    $el.resetKeyframe(function() {
                        $el.playKeyframe(options);
                    });
                });
            } else {
                $createKeyframeStyleTag({
                    id: frameName
                }).append(css);
            }
        },
        define: function(frameData) {
            if (frameData.length) {
                for (var i = 0; i < frameData.length; i++) {
                    var frame = frameData[i];
                    this.generate(frame);
                }
            } else {
                return this.generate(frameData);
            }
        }
    };

    animationPlayState = "animation-play-state";
    playStateRunning = "running";

    $.fn.resetKeyframe = function(callback) {
        var $el = $(this).css(vendorPrefix + animationPlayState, playStateRunning).css(vendorPrefix + "animation", "none");

        if (callback) {
            setTimeout(callback, 1);
        }
    };

    $.fn.pauseKeyframe = function() {
        var $el = $(this).css(vendorPrefix + animationPlayState, "paused");
    };

    $.fn.resumeKeyframe = function() {
        return $(this).css(vendorPrefix + animationPlayState, playStateRunning);
    };

    $.fn.playKeyframe = function(frameOptions, callback) {
        var animationcss, animationkey, delay, duration, pfx, repeat;

        if (typeof frameOptions === 'string') {
            var frameOptSplit = frameOptions.trim().split(' ');
            frameOptions = {
                name: frameOptSplit[0],
                duration: parseInt(frameOptSplit[1]),
                timingFunction: frameOptSplit[2],
                delay: parseInt(frameOptSplit[3]),
                repeat: frameOptSplit[4],
                direction: frameOptSplit[5],
                fillMode: frameOptSplit[6],
                complete: callback
            }
        }

        frameOptions = $.extend({
            duration: 0,
            timingFunction: "ease",
            delay: 0,
            repeat: 1,
            direction: "normal",
            fillMode: "forwards",
            complete: callback
        }, frameOptions);

        duration = frameOptions.duration;
        delay = frameOptions.delay;
        repeat = frameOptions.repeat;
        animationcss = "" + frameOptions.name + " " + duration + "ms " + frameOptions.timingFunction + " " + delay + "ms " + repeat + " " + frameOptions.direction + " " + frameOptions.fillMode;
        callback = frameOptions.complete;
        animationkey = vendorPrefix + "animation";
        pfx = ["webkit", "moz", "MS", "o", ""];

        var _prefixEvent = function(element, type, callback) {
            var evt, p, _results;
            p = 0;
            _results = [];
            while (p < pfx.length) {
                if (!pfx[p]) {
                    type = type.toLowerCase();
                }
                evt = pfx[p] + type;
                element.off(evt).on(evt, callback);
                _results.push(p++);
            }
            _results;
        };

        this.each(function() {
            var $el = $(this).addClass("boostKeyframe").css(vendorPrefix + animationPlayState, playStateRunning).css(animationkey, animationcss).data("keyframeOptions", frameOptions);

            if (callback) {
                _prefixEvent($el, 'AnimationIteration', callback);
                _prefixEvent($el, 'AnimationEnd', callback);
            }
        });
        return this;
    };

    $createKeyframeStyleTag({
        id: "boost-keyframe"
    }).append(" .boostKeyframe{" + vendorPrefix + "transform:scale3d(1,1,1);}");

}).call(this);