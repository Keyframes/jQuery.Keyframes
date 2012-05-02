jQuery-Keyframes
===========

jQuery-Keyframes generates and plays CSS3 keyframes quickly and easily allowing you to concentrate on the content of your project whilst cutting down code.

Example Usage
-------------
```javascript

// Get browser style prefix
$.keyframe.browserCode();

// Adding a new animation sequence (keyframe)
$.fn.addKeyframe([{
	name: "trapdoor-sequence",
	"0%": "height:70px",
	"30%": "height:10px",
	"60%": "height:30px",
	"100%": "height:10px"
}]);

// Adding browser specific frame styles
$.fn.addKeyframe([{
	name: "ball-roll",
	"0%": $.keyframe.browserCode()+"transform:rotate(0deg)",
	"100%": $.keyframe.browserCode()+"transform:rotate(360deg)",
}]);

// Playing an animation
$(selector).playKeyframe({
		name: 'trapdoor-sequence', // name of the keyframe you want to bind to the selected element
		duration: 1000, // how long you want it to last in milliseconds
		timingFunction: 'linear', // specifies the speed curve of the animation
		delay: 0, // how long you want to wait before the animation starts in milliseconds
		repeat: 'infinite', // how many times you want the animation to repeat
		direction: 'normal', // which direction you want the frames to flow
		fillMode: 'forwards' // how to apply the styles outside the animation time
	},
	callback // Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
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
