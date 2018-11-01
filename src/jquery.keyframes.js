/* global $ */
import Keyframes from '@keyframes/core';

(($) => {
    const doForEach = ($el, cb) => {
        $el.each((_, elem) => {
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
        generateCSS: Keyframes.generateCSS,
        define: Keyframes.define,
    };

    $.fn.resetKeyframe = function (cb) {
        const $this = this;
        doForEach($this, kf => kf.reset(cb));
    };

    $.fn.pauseKeyframe = function () {
        const $this = this;
        doForEach($this, kf => kf.pause());
    };

    $.fn.resumeKeyframe = function () {
        const $this = this;
        doForEach($this, kf => kf.resume());
    };

    $.fn.playKeyframe = function (frameOptions, callback) {
        const $this = this;
        doForEach($this, kf => kf.play(frameOptions, callback));
    };
})(jQuery);
