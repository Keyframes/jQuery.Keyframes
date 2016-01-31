(function(win, doc, $) {
    var animationSupport = false,
        animationString  = 'animation',
        vendorPrefix     = prefix = '',
        domPrefixes      = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'],
        //match ie 10 & 11 exclusively
        ie1011           = (win.matchMedia && win.matchMedia('all and (-ms-high-contrast: none), (-ms-high-contrast: active)').matches),
        $win             = $(win),
        head             = doc.getElementsByTagName('head')[0]
    
    
    // $.fn.load is deprecated, https://api.jquery.com/load-event/, use '.on' instead
    $win.on('load', function(){
        var style = doc.body.style;
        if( style.animationName !== undefined ) { animationSupport = true; }

        if( animationSupport === false ) {
            for( var i = 0; i < domPrefixes.length; i++ ) {
                if( style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                    prefix = domPrefixes[ i ];
                    animationString = prefix + 'Animation';
                    vendorPrefix = '-' + prefix.toLowerCase() + '-';
                    animationSupport = true;
                    break;
                }
            }
        }
    });
    var
    //update style tags with data-media attr
    ie1011iterateStyles = function(){
        $.each( $('[data-media]'), function(index,elem){
            $el = $(elem);
            if( win.matchMedia($el.attr('data-media')).matches ){
                $el.html($el.data('keyframedata'));//set keyframe that should apply according to media query
            } else {
                $el.data('keyframedata', $el.html() );
                $el.html('');//take back keyframe that should not apply according to media query
            }
        });
    },
    
    // debounce timeout
    dbnTout,
    // debounce ie1011iterateStyles function
    ie1011iterateStylesProxy = function(){
        win.clearTimeout(dbnTout);
        dbnTout = win.setTimeout( ie1011iterateStyles, 34 );// wait approx two frames
    },

    $createKeyframeStyleTag = function(id, css, ie1011Media) {
        if($.keyframe.debug){ win.console.log(id + " " + css); }
        
        // issue #53
        if(ie1011 && ie1011Media){
            var $style = $('<style></style>').attr({
                "class":       "keyframe-style",
                id:            id,
                type:          "text/css",
                'data-media' : ie1011Media
            });
            
            if(win.matchMedia(ie1011Media).matches){
                $style.html(css);
            } else {
                $style.data('keyframedata', css);
            }
            
            $win.on('resize',            ie1011iterateStylesProxy)
                .on('orientationchange', ie1011iterateStylesProxy);
            
            return $style.appendTo(head);
        }
        
        return $("<style>" + css + "</style>").attr({
            "class": "keyframe-style",
            id: id,
            type: "text/css"
        }).appendTo(head);
    };

    $.keyframe = {
        debug: false,
        getVendorPrefix: function() {
            return vendorPrefix;
        },
        isSupported: function() {
            return animationSupport;
        },
        generate: function(frameData) {
            var frameName = frameData.name || "";
            var css = "@" + vendorPrefix + "keyframes " + frameName + " {";

            for (var key in frameData) {
                if (key !== "name" && key !== "media" && key !== "complete") {
                    css += key + " {";

                    for (var property in frameData[key]) {
                        css += property + ":" + frameData[key][property] + ";";
                    }

                    css += "}";
                }
            }
            if(win.PrefixFree)
                css = win.PrefixFree.prefixCSS(css + "}");
            else 
                css += "}";
            
            // issue #53: if it's is responsive @keyframe, but NOT ie 10/11
            if(frameData.media && !ie1011 ){
                css = "@media " + frameData.media + "{" + css + "}";
            }

            var $frameStyle = $("style#" + frameData.name);

            if ($frameStyle.length > 0) {
                $frameStyle.html(css);
                // this needs HUGE optimization, maybe to add specific class to animation targets, so
                // we can retrieve them easely with .classname selector
                var $elems = $("*").filter(function() {
                    return this.style[animationString + "Name"] === frameName;
                });

                $elems.each(function() {
                    var $el = $(this);
                    var options = $el.data("keyframeOptions");
                    $el.resetKeyframe(function() {
                        $el.playKeyframe(options);
                    });
                });
            } else {
                // issue #53. pass frameData.media as third argument to @keyframe style tag creation mechanism...
                if(ie1011 && frameData.media ){
                    $createKeyframeStyleTag(frameName, css, frameData.media);
                } else {
                    $createKeyframeStyleTag(frameName, css);
                }
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
        }
    };

    var animationPlayState = "animation-play-state";
    var playStateRunning = "running";

    $.fn.resetKeyframe = function(callback) {
        var $el = $(this).css(vendorPrefix + animationPlayState, playStateRunning).css(vendorPrefix + "animation", "none");

        if (callback) {
            win.setTimeout(callback, 1);
        }
    };

    $.fn.pauseKeyframe = function() {
        $(this).css(vendorPrefix + animationPlayState, "paused");
    };

    $.fn.resumeKeyframe = function() {
        $(this).css(vendorPrefix + animationPlayState, playStateRunning);
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

        if($.isArray(frameOptions)){
            var frameOptionsStrings = [];
            for(var i = 0; i < frameOptions.length; i++){
                if (typeof frameOptions[i] === 'string') {
                    frameOptionsStrings.push(frameOptions[i]);
                }else{
                    frameOptionsStrings.push(animObjToStr(frameOptions[i]));
                }
            }
            animationcss = frameOptionsStrings.join(", ");
        }else if (typeof frameOptions === 'string') {
            animationcss = frameOptions;
        }else{
            animationcss = animObjToStr(frameOptions);
        }

        var animationkey = vendorPrefix + "animation";
        var pfx = ["webkit", "moz", "MS", "o", ""];

        if(!callback && frameOptions.complete){
            callback = frameOptions.complete;
        }

        var _prefixEvent = function(element, type, callback) {
            for(var i = 0; i < pfx.length; i++){
                if (!pfx[i]) {
                    type = type.toLowerCase();
                }
                var evt = pfx[i] + type;
                element.off(evt).on(evt, callback);
            }
        };

        this.each(function() {
            var $el = $(this).addClass("boostKeyframe").css(vendorPrefix + animationPlayState, playStateRunning).css(animationkey, animationcss).data("keyframeOptions", frameOptions);
            if($.keyframe.debug){
                console.group();
                if(vendorPrefix){ console.log("Vendor Prefix: " + vendorPrefix); }
                console.log("Style Applied: " + animationcss);
                var testCss = $el.css(animationkey);
                console.log("Rendered Style: " + (testCss ? testCss : $el[0].style.animation));
                console.groupEnd();
            }
            if (callback) {
                _prefixEvent($el, 'AnimationIteration', callback);
                _prefixEvent($el, 'AnimationEnd', callback);
            }
        });
        return this;
    };


    $createKeyframeStyleTag("boost-keyframe", " .boostKeyframe{" + vendorPrefix + "transform:scale3d(1,1,1);}");

})(window,document,jQuery);
