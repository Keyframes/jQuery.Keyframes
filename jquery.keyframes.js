(function() {

    $.keyframe = {

        count: 0,

        isSupported: function() {
            return document.body.style.animationName !== undefined;
        },

        generate: function(frameData) {
            $.keyframe.count++;

            var frameName, frameId = "keyframe_" + $.keyframe.count;
            if(frameData.name){
                frameName = frameData.name;
                frameId = "keyframe_" + frameName;
            }

            var css = "@keyframes " + frameName + " {";

            for (var key in frameData) {
                if (key !== "name" && key !== "media" && key !== "complete") {
                    css += key + " {";

                    for (var property in frameData[key]) {
                        css += property + ":" + frameData[key][property] + ";";
                    }

                    css += "}";
                }
            }

            css += "}";

            if(frameData.media){
                css = "@media " + frameData.media + "{" + css + "}";
            }

            var $frameStyle = $("style#" + frameId);

            if ($frameStyle.length > 0) {
                $frameStyle.append(css);

                var $elems = $("[style]").filter(function() {
                    return this.style["animationName"] === frameName;
                });

                $elems.each(function() {
                    var $el = $(this);
                    var options = $el.data("keyframeOptions");
                    $el.resetKeyframe(function() {
                        $el.playKeyframe(options);
                    });
                });
            } else {
                $("<style>" + css + "</style>").attr({
                    "class": "keyframe-style",
                    id: frameId,
                    type: "text/css"
                }).appendTo("head");
            }
        },

        define: function(frameData) {
            if (frameData.length) {
                for (var i = 0; i < frameData.length; i++) {
                    var frame = frameData[i];
                    this.generate(frame);
                }
            } else {
                this.generate(frameData);
            }
        },

        setPlayState: function($elem, running){
            return $elem.css("animation-play-state", (running ? 'running' : 'paused'))
        }
    };

    $.fn.resetKeyframe = function(callback) {
        if (callback) {
            setTimeout(callback, 0);
        }
        return $.keyframe.setPlayState($(this), true).css("animation", "none");
    };

    $.fn.pauseKeyframe = function() {
        $.keyframe.setPlayState($(this), false);
    };

    $.fn.resumeKeyframe = function() {
        $.keyframe.setPlayState($(this), true);
    };

    $.fn.playKeyframe = function(frameOptions, callback) {
        
        var animObjToStr = function(obj){
            obj = $.extend({
                duration: '0s',
                timingFunction: "ease",
                delay: '0s',
                iterationCount: 1,
                direction: "normal",
                fillMode: "forwards"
            }, obj);
            return [obj.name, obj.duration, obj.timingFunction, obj.delay, obj.iterationCount, obj.direction, obj.fillMode].join(" ");
        };

        var animationcss = "";

        if($.type(frameOptions) == "array"){
            var frameOptionsStrings = [];
            for(var i = 0; i < frameOptions.length; i++){
                if ($.type(frameOptions[i]) == 'string') {
                    frameOptionsStrings.push(frameOptions[i]);
                }else{
                    frameOptionsStrings.push(animObjToStr(frameOptions[i]));
                }
            }
            animationcss = frameOptionsStrings.join(", ");
        }else if ($.type(frameOptions) == 'string') {
            animationcss = frameOptions;
        }else{
            animationcss = animObjToStr(frameOptions);
        }

        if(!callback && frameOptions.complete){
            callback = frameOptions.complete;
        }

        this.each(function() {
            var $el = $(this).resetKeyframe().css('animation', animationcss).data("keyframeOptions", frameOptions);
            if (callback) {
                $el.off('AnimationIteration AnimationEnd').on('AnimationIteration AnimationEnd', callback);
            }
        });
        return this;
    };

}).call(this);
