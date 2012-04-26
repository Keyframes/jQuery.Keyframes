var keyframesjs = {
	
	init: function(){
		$('head').append('<style id="keyframes-style" type="text/css"></style>');
	},
	
	frameCollection: [],
	
	browserDetect: function() {
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
    
	add: function(frameName, frameData){
		this.frameCollection[frameName] = {data: frameData, running: false, timer: false};
		this.generate();
	},
	
	generate: function(){
		$('#keyframes-style').html('');
		var browserType = this.browserDetect();
		
		for(var frameName in this.frameCollection){
			var css = '@'+browserType+'keyframes '+frameName+'{';
			
			for(var frameData in this.frameCollection[frameName].data){
				
				css += frameData + '{';
				var fd = this.frameCollection[frameName].data;
				css += fd[frameData] + '}';
			}
			
			css += '}\n';
				
			$('#keyframes-style').append(css);
		}
	},
	
	play: function(elem, options, callback){
		var duration = options.duration;
		var delay = options.delay;
		options.duration = options.duration + 'ms';
		options.delay = options.delay + 'ms';
		
		var animationcss = '';
		$.each(options, function(index,opt){
			animationcss += opt + ' ';
		});
		animationcss = animationcss.trim();
		
		var animationkey = this.browserDetect() + 'animation';
		
		if(options.repeat != 'infinite'){
			if(callback){
				keyframesjs.frameCollection[options.name].timer = setTimeout(callback, (duration + delay) * options.repeat);
			}
			setTimeout(function(){ keyframesjs.frameCollection[options.name].running = false; }, (duration + delay) * options.repeat);
		}
		
		this.frameCollection[options.name].running = true;
		$(elem).css(animationkey, animationcss);
	},
	
	reset: function(elem){
		var animationkey = this.browserDetect() + 'animation';
		$(elem).css(animationkey, 'none');
	}
}

window.load = keyframesjs.init();