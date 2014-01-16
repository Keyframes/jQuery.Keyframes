jQuery.Keyframes
===========
jQuery.Keyframes generates and plays CSS3 keyframes quickly and easily allowing you to concentrate on the content of your project whilst cutting down code.

Overview
--------
With the rise of CSS3 and HTML5, we see more and more usage of fancy features like transformations, translations, rotations and scaling.
jQuery has a very nice built in *$(selector).animate()* function which allows for easy setup of these animations.
However, jQuery's animate() does not support multiple keyframes. jQuery.Keyframes helps you accomplish just that.

Requirements
------------
In order for jQuery.Keyframes to work the jQuery library needs to be linked either through CDN:

```html
<script src="http://code.jquery.com/jquery-<version>[.min].js"></script>
```

or local copy:

```html
<script src="/path/to/jquery-<version>[.min].js"></script>
```

Installation
------------
Include script in the *head* of your document using the following line:

```html
<script src="/path/to/jquery.keyframes[.min].js"></script>
```

Usage
-------------

Get browser style prefix

```javascript
var browserCode = $.keyframe.vendorPrefix();
```

Detecting CSS animation support

```javascript
var supportedFlag = $.keyframe.isSupported();
```

Adding a new animation sequence (keyframe)

```javascript
$.keyframe.define([{
    name: "trapdoor-sequence",
    "0%": "height:70px",
    "30%": "height:10px",
    "60%": "height:30px",
    "100%": "height:10px"
}]);
```

Adding a single frame style

```javascript
var bcode = $.keyframe.vendorPrefix();
$.keyframe.define({
    name: "ball-roll",
    from: bcode + "transform:rotate(0deg)",
    to: bcode + "transform:rotate(360deg)"
});
```

Adding multiple frame styles

```javascript
var bcode = $.keyframe.vendorPrefix();
$.keyframe.define([{
    name: "ball-roll",
    from: bcode + "transform:rotate(0deg)",
    to: bcode + "transform:rotate(360deg)"
    },
    {
    name: "half-rotation",
    from: bcode + "transform:rotate(0deg)",
    to: bcode + "transform:rotate(180deg)"
    }
]);
```

Playing an animation

```javascript
$(selector).playKeyframe({
    name: 'trapdoor-sequence', // name of the keyframe you want to bind to the selected element
    duration: 1000, // [optional, default: 0, in ms] how long you want it to last in milliseconds
    timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
    delay: 0, //[optional, default: 0, in ms]  how long you want to wait before the animation starts in milliseconds, default value is 0
    repeat: 'infinite', //[optional, default:1]  how many times you want the animation to repeat, default value is 1
    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow, default value is normal
    fillMode: 'forwards' //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
    complete: function(){} //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
});
```

Playing an animation (shorthand)

```javascript
$(selector).playKeyframe(
    'trapdoor-sequence 1000 linear 0 infinite normal forwards',
    complete
);
```	

Reset the animation

```javascript
$(selector).resetKeyframe(callback);
```

Freeze keyframe animation and kill callbacks

```javascript
$(selector).pauseKeyframe();
```

Resume keyframe animation

```javascript
$(selector).resumeKeyframe();
```
