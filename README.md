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
<script src='http://code.jquery.com/jquery-<version>[.min].js'></script>
```

or local copy:

```html
<script src='/path/to/jquery-<version>[.min].js'></script>
```

Installation
------------
Include script in the *head* of your document using the following line:

```html
<script src='/path/to/jquery.keyframes[.min].js'></script>
```

Vendor Prefixing
----------------
[Prefix Free](http://leaverou.github.io/prefixfree/) is used on the generated css to automatically add vendor prefixes. This means you should avoid adding any vendor prefixes to your defined css.
For convenience, it is bundled into the minified version.

Usage
-------------

**Detecting CSS animation support**

```javascript
var supportedFlag = $.keyframe.isSupported();
```

**Adding a new animation sequence (keyframe)**

```javascript
$.keyframe.define([{
    name: 'trapdoor-sequence',
    '0%': {'height': '70px'},
    '30%': {'height': '10px'},
    '60%': {'height': '30px'},
    '100%': {'height': '10px'}
}]);
```

**Adding a single frame style**

```javascript
$.keyframe.define({
    name: 'ball-roll',
    from: {
        'transform': 'rotate(0deg)' //Note that 'transform' will be autoprefixed for you
    },
    to: {
        'transform': 'rotate(360deg)' //Note that 'transform' will be autoprefixed for you
    }
});
```

**Adding multiple frame styles**

```javascript
$.keyframe.define([{
	name: 'roll-clockwise',
	'0%': {
	    'margin-left' : '0px',
	    'background-color' : 'red',
	    'transform' : 'rotate(0deg)'
	},
	'100%': {
	    'margin-left' : '600px',
	    'transform' : 'rotate(360deg)'
	}
    },{
	name: 'roll-anti-clockwise',
	'0%': {
	    'margin-left' : '0px',
	    'background-color' : 'red',
	    'transform' : 'rotate(0deg)'
	},
	'100%': {
	    'margin-left' : '600px',
	    'transform' : 'rotate(-360deg)'
	}
    }
]);
```

**Adding styles and properties in array fashion**

*Gives resemblance to CSS styling definitions*

```javascript
var shake_start = {'transform': 'translate(0px)'};
var shake_odd1 = {'transform': 'translate(-10px, -10px)'};
var shake_even1 = {'transform': 'translate(10px, 10px)'};
var shake_odd2 = {'transform': 'translate(10px, -10px)'};
var shake_even2 = {'transform': 'translate(-10px, 10px)'};

$.keyframe.define([{
	name: 'crazy',
	'0%': shake_start,
	'10%': shake_odd2,
	'20%': shake_even1,
	'30%': shake_odd2,
	'40%': shake_even2,
	'50%': shake_odd2,
	'60%': shake_even1,
	'70%': shake_odd1,
	'80%': shake_even2,
	'90%': shake_odd1
    }
]);
```

*Please note, you can add as many properties to the array as you want to*

**Playing an animation**

```javascript
$(selector).playKeyframe({
    name: 'trapdoor-sequence', // name of the keyframe you want to bind to the selected element
    duration: 1000, // [optional, default: 0, in ms] how long you want it to last in milliseconds
    timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
    delay: 0, //[optional, default: 0, in ms]  how long you want to wait before the animation starts in milliseconds, default value is 0
    repeat: 'infinite', //[optional, default:1]  how many times you want the animation to repeat, default value is 1
    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow, default value is normal
    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
    complete: function(){} //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
});
```

**Playing an animation (shorthand)**

```javascript
$(selector).playKeyframe(
    'trapdoor-sequence 1000 linear 0 infinite normal forwards',
    complete
);
```	

**Reset the animation**

```javascript
$(selector).resetKeyframe(callback);
```

**Freeze keyframe animation and kill callbacks**

```javascript
$(selector).pauseKeyframe();
```

**Resume keyframe animation**

```javascript
$(selector).resumeKeyframe();
```

Who is using jQuery.Keyframes?
------------------------------

Metrize Premium HTML5 Template: https://www.youtube.com/watch?v=f-BK_QYSzVE
Hipster Gallery: http://labs.bebensiganteng.com/html5/hipstergallery/#thumbnails/0
