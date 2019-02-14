jQuery.Keyframes
===========

[![npm version](https://img.shields.io/npm/v/jquerykeyframes.svg?style=flat-square)](https://www.npmjs.org/package/jquerykeyframes)

This library is a wrapper around [Keyframes.js](https://github.com/Keyframes/Keyframes), a vanilla js library that allows dynamic generation of CSS keyframes with callback events and other niceness.

Overview
--------
CSS3 introduced fancy features like transformations, translations, rotations and scaling.
jQuery has a very nice built in *$(selector).animate()* function which allows for easy setup of these animations.
However, jQuery's animate() does not support multiple keyframes. jQuery.Keyframes helps you accomplish just that.

Requirements
------------

```html
<script src='http://code.jquery.com/jquery-3.3.1.slim.min.js'></script>
```

Installation
------------
Include script in your document using the following line:

```html
<script src='/path/to/jquery.keyframes[.min].js'></script>
```

Be sure to define and play animations only after the page has loaded using `window.onload`.

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
        'transform': 'rotate(0deg)'
    },
    to: {
        'transform': 'rotate(360deg)'
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
	'75.3%': shake_odd1,
	'80.45%': shake_even2,
	'91.6%': shake_odd1
    }
]);
```

*Please note, you can add as many properties to the array as you want to*

**Responsive animations**
```javascript
$.keyframe.define([{
    name: 'roll-clockwise',
    media: 'screen and (max-width: 700px)',
    from: {
        'margin-left' : '0px'
    },
    to: {
        'margin-left' : '600px'
    }
    }
]);
```

**Playing an animation**

The css3 animation methods available are better documented here: http://www.w3schools.com/css/css3_animations.asp

```javascript
$(selector).playKeyframe({
    name: 'trapdoor-sequence', // name of the keyframe you want to bind to the selected element
    duration: '1s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
    timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
    delay: '0s', //[optional, default: 0s]  how long you want to wait before the animation starts
    iterationCount: 'infinite', //[optional, default:1]  how many times you want the animation to repeat
    direction: 'normal', //[optional, default: 'normal']  which direction you want the frames to flow
    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
    complete: function(){} //[optional] Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
});
```

**Playing an animation (shorthand)**

```javascript
$(selector).playKeyframe(
    'trapdoor-sequence 1s linear 0s infinite normal forwards',
    complete
);
```

**Playing multiple animations**

```javascript
$(selector).playKeyframe([
    'trapdoor-sequence 1s linear 0s infinite',
    {
      name: 'ball-roll',
      duration: "3s",
      timingFunction: 'ease',
      iterationCount: 1
    }
], complete);
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

* Hipster Gallery: http://labs.bebensiganteng.com/html5/hipstergallery/#thumbnails/0
* Ronneby Wordpress Theme: https://themeforest.net/item/ronneby-highperformance-wordpress-theme/11776839?s_rank=1
* Brooklyn Wordpress Theme: https://themeforest.net/item/brooklyn-responsive-multipurpose-wordpress-theme/6221179
* Contrive Wordpress Theme: https://themeforest.net/item/contrive-building-construction-html5-template/14535825
* DFD-Native Wordpress Theme: https://themeforest.net/item/native-powerful-startup-development-tool/19200310
* Sunday Wordpress Theme: http://themes.dfd.name/sunday/promo/

Plugins!
--------
See other plugins that allow for spritesheets & more complex movement paths: https://github.com/Keyframes

- [Keyframes.Pathfinder](https://github.com/Keyframes/Keyframes.Pathfinder): A plugin for jQuery.Keyframes that generates complex movement paths
- [Keyframes.Spritesheet](https://github.com/Keyframes/Keyframes.Spritesheet): Keyframes.Spritesheet easily generates css3 keyframes for elements using animated spritesheets.

Changelog
---------
**1.0.0**
* Moved to use [keyframes.js](https://github.com/Keyframes/Keyframes) as a base
**0.1.0**
* Remove all vendor prefix functionality (if you need this stick with 0.0.9)
* Remove debug output
* Source code now in ES6
* Remove advanced example
* Add jQuery 3.x to example
* Add linting
**0.0.9**
* Add debug output
