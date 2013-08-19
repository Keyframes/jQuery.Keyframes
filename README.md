jQuery-Keyframes
===========

jQuery.Keyframes is forked from [@krazyjakee](https://github.com/krazyjakee/)'s [jQuery-Keyframes](https://github.com/krazyjakee/jQuery-Keyframes/)

jQuery.Keyframes like [jQuery-Keyframes](https://github.com/krazyjakee/jQuery-Keyframes/) generates and plays CSS3 keyframes quickly and easily allowing you to concentrate on the content of your project whilst cutting down code.

jQuery.Keyframes introduces
+ some changes in the API 
+ $.keyframe.isSupported() to detect CSS animation support
+ 10% smaller minified version (2.256 kb vs 2.453 kb)
+ support for keyframe redefinition: if you redifine an existing keyframe, running animation will reflect those changes

Example Usage
-------------
```javascript

// Get browser style prefix
$.keyframe.browserCode();

// Detecting CSS animation support
$.keyframe.isSupported();

// Adding a new animation sequence (keyframe)
$.fn.addKeyframe([{
	name: "trapdoor-sequence",
	"0%": "height:70px",
	"30%": "height:10px",
	"60%": "height:30px",
	"100%": "height:10px"
}]);

// Adding browser a single frame style
$.keyframe.define({
	name: "ball-roll",
	from: $.keyframe.browserCode()+"transform:rotate(0deg)",
	to: $.keyframe.browserCode()+"transform:rotate(360deg)",
});

// Adding browser specific frame styles
$.keyframe.define([{
	name: "ball-roll",
	from: $.keyframe.browserCode()+"transform:rotate(0deg)",
	to: $.keyframe.browserCode()+"transform:rotate(360deg)",
	},
	{
	name: "half-rotation",
	"from": $.keyframe.browserCode()+"transform:rotate(0deg)",
	"to": $.keyframe.browserCode()+"transform:rotate(180deg)",
	}
]);


// Playing an animation
$(selector).playKeyframe({
		name: 'trapdoor-sequence', // name of the keyframe you want to bind to the selected element
		duration: 1000, // [optional, default: 0, in ms] how long you want it to last in milliseconds
		timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
		delay: 0, //[optional, default: 0, in ms]  how long you want to wait before the animation starts in milliseconds, default value is 0
		repeat: 'infinite', //[optional, default:1]  how many times you want the animation to repeat, default value is 1
		direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow, default value is normal
		fillMode: 'forwards' //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
		complete: function(){} //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
	},
);
	
// Reset the animation
$(selector).resetKeyframe(callback);

// Freeze keyframe animation and kill callbacks
$(selector).pauseKeyframe();

// Resume keyframe animation
$(selector).resumeKeyframe();

// Get the current running keyframe animation name applied to an element. If false, no animation is running.
var framename = $(selector).data('keyframe');
```
