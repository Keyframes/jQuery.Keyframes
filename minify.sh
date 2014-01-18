#!/usr/bin/env sh

echo "jQuery.Keyframes: Minifying javascript files."
MINIFIER_URL="http://javascript-minifier.com/raw"

KEYFRAMES_FILE="jquery.keyframes"
KEYFRAMES=$(cat $KEYFRAMES_FILE.js)

echo "jQuery.Keyframes: $KEYFRAMES_FILE.js [MINIFYING]."
curl -X POST -s --data-urlencode "input=$KEYFRAMES" $MINIFIER_URL > $KEYFRAMES_FILE.min.js
echo "jQuery.Keyframes: $KEYFRAMES_FILE.min.js [DONE]."

ANIMATION_FILE="example/advanced/js/animation"
ADVANCED_ANIMATION=$(cat $ANIMATION_FILE.js)

echo "jQuery.Keyframes: $ANIMATION_FILE.js [MINIFYING]."
curl -X POST -s --data-urlencode "input=$ADVANCED_ANIMATION" $MINIFIER_URL > $ANIMATION_FILE.min.js
echo "jQuery.Keyframes: $ANIMATION_FILE.min.js [DONE]."
echo "jQuery.Keyframes: Done."
