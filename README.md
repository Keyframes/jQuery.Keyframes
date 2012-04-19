KeyframesJS
===========

KeyframesJS generates and plays CSS3 keyframes quickly and easily allowing you to concentrate on the content of your project whilst cutting down code.
KeyframesJS requires the latest jQuery.

Example Usage
-------------
```javascript
// Adding a new animation sequence (keyframe)
keyframesjs.add("trapdoor-sequence", {
	"0%": "height:70px",
	"30%": "height:10px",
	"60%": "height:30px",
	"100%": "height:10px"
});

// Playing an animation
keyframesjs.play('.trapdoor #trapdoor', {
		name: 'trapdoor-sequence', // name of the keyframe you want to bind to the selected element
		duration: 1000, // how long you want it to last in milliseconds
		timingFunction: 'linear', // specifies the speed curve of the animation
		delay: 0, // how long you want to wait before the animation starts in milliseconds
		repeat: 'infinite', // how many times you want the animation to repeat
		direction: 'normal', // which direction you want the frames to flow
		fillMode: 'forwards' // how to apply the styles outside the animation time
	},
	callback // Function fired after the first cycle is complete.
);

// Adding browser specific frame styles
keyframesjs.add("ball-roll", {
	"0%": keyframesjs.browserDetect()+"transform:rotate(0deg)",
	"100%": keyframesjs.browserDetect()+"transform:rotate(360deg)",
});
```
