(function($) {

$.frameCollection = [];
$.keyframe = {
    
    browserCode: function() {
        var ua = navigator.userAgent;
        if(ua.indexOf('Opera') != -1){
            return '-o-';
        }else if(ua.indexOf('MSIE') != -1){
            return '-ms-';
        }else if(ua.indexOf('WebKit') != -1){
            return '-webkit-';
        }else if(navigator.product == 'Gecko'){
            return '-moz-';
        }else{
            return '';
        }
    },
    
    generate: function(){
        $('#keyframes-style').html('');
        var browserType = this.browserCode();
        
        for(var frameName in $.frameCollection){
            var css = '@'+browserType+'keyframes '+frameName+'{';
            
            for(var frameData in $.frameCollection[frameName].data){
                if(frameData != 'name'){
                    css += frameData + '{';
                    var fd = $.frameCollection[frameName].data;
                    css += fd[frameData] + '}';
                }
            }
            
            css += '}\n';
                
            $('#keyframes-style').append(css);
        }
        $('#keyframes-style').append(' .boostKeyframe{transform:scale3d(1,1,1);}');
    }
};

$.fn.resetKeyframe = function(callback){
    $(this).css($.keyframe.browserCode() + 'animation-play-state','running');
    var animationkey = $.keyframe.browserCode() + 'animation';
    $(this).css(animationkey, 'none');
    $(this).data('keyframe',false);
    clearInterval($(this).data('keyframeTimer'));
    clearTimeout($(this).data('keyframeTimer'));
    if(callback){
        setTimeout(callback,1);
    }
};

$.fn.pauseKeyframe = function(){
    $(this).css($.keyframe.browserCode() + 'animation-play-state','paused');
    clearInterval($(this).data('keyframeTimer'));
    clearTimeout($(this).data('keyframeTimer'));
};

$.fn.resumeKeyframe = function(){
    $(this).css($.keyframe.browserCode() + 'animation-play-state','running');
};

$.fn.addKeyframe = function(frameData){
    $.each(frameData, function(index, data){
        var kfname = data.name;
        data.name = '';
        $.frameCollection[kfname] = {data: data};
    });
    $.keyframe.generate();
};

$.fn.playKeyframe = function(frameOptions, callback){
    
    if(typeof frameOptions == 'string'){
        frameOptions = frameOptions.trim();
        frameOptSplit = frameOptions.split(' ');
        var name = frameOptSplit[0];
        var duration = parseInt(frameOptSplit[1]);
        var delay = parseInt(frameOptSplit[3]);
        var repeat = parseInt(frameOptSplit[4]);
        frameOptSplit[1] += 'ms';
        frameOptSplit[3] += 'ms';
        
        var animationcss = frameOptSplit.join(' ');
    }else{
        var defaultsOptions = {
            delay: 0,
            repeat: 1,
            direction: 'normal',
            fillMode: 'forwards'
        };
        var frameOptions = $.extend({}, defaultsOptions, frameOptions);

        var name = frameOptions.name;
        var duration = frameOptions.duration;
        var delay = frameOptions.delay;
        var repeat = frameOptions.repeat;
        frameOptions.duration = frameOptions.duration + 'ms';
        frameOptions.delay = frameOptions.delay + 'ms';
        
        var animationcss = '';
        $.each(frameOptions, function(index,opt){
            animationcss += opt + ' ';
        });
        animationcss = animationcss.trim();
    }
    
    var animationkey = $.keyframe.browserCode() + 'animation';
    
    var _this = this;
    if(repeat != 'infinite'){
        if(callback != null){
            $(this).data('keyframeTimer', setTimeout(callback, (duration + delay) * repeat));
        }
        setTimeout(function(){ $(_this).data('keyframe',false); }, (duration + delay) * repeat);
    }else{
        if(callback != null){
            $(_this).data('keyframeTimer', setTimeout(function(){ callback(); $(_this).data('keyframeTimer', setInterval(callback, duration)); }, duration + delay));
        }
    }
    
    $(this).css($.keyframe.browserCode() + 'animation-play-state','running');
    $(this).data('keyframe',name);
    $(this).css(animationkey, animationcss);
};

$('head').append('<style id="keyframes-style" type="text/css"></style>');

})( jQuery );