/* global $ */
import Keyframes from '@keyframes/core';

(() => {
    const doForEach = ($el, cb) => {
        $el.each((index, elem) => {
            if (elem.Keyframes) {
                cb(elem.Keyframes);
            } else {
                elem.Keyframes = new Keyframes(elem);
                cb(elem.Keyframes);
            }
        });
    };

    $.keyframe = {
        isSupported: Keyframes.isSupported,
        generate: Keyframes.generate,
        define: Keyframes.define,
    };

    $.fn.resetKeyframe = (cb) => {
        doForEach(this, kf => kf.reset(cb));
    };

    $.fn.pauseKeyframe = () => {
        doForEach(this, kf => kf.pause());
    };

    $.fn.resumeKeyframe = () => {
        doForEach(this, kf => kf.resume());
    };

    $.fn.playKeyframe = (frameOptions, callback) => {
        doForEach(this, kf => kf.play(frameOptions, callback));
    };
})();
