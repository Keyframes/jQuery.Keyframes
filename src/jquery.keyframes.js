/* global $ */

(() => {
    const animationPlayState = 'animation-play-state';
    const playStateRunning = 'running';

    const $createKeyframeStyleTag = (id, css) => $(`<style>${css}</style>`).attr({
        class: 'keyframe-style',
        id,
        type: 'text/css',
    }).appendTo('head');

    $.keyframe = {
        isSupported() {
            return document.body.style.animationName !== undefined;
        },
        generate(frameData) {
            const frameName = frameData.name || '';
            let css = `@keyframes ${frameName} {`;
            for (const key in frameData) {
                if (key !== 'name' && key !== 'media' && key !== 'complete') {
                    css += `${key} {`;

                    for (const property in frameData[key]) {
                        css += `${property}:${frameData[key][property]};`;
                    }

                    css += '}';
                }
            }

            if (frameData.media) {
                css = `@media ${frameData.media}{${css}}`;
            }

            const $frameStyle = $(`style#${frameData.name}`);

            if ($frameStyle.length > 0) {
                $frameStyle.html(css);

                const $elems = $('*').filter(() => this.style.animationName === frameName);

                $elems.each(() => {
                    const $el = $(this);
                    const options = $el.data('keyframeOptions');
                    $el.resetKeyframe(() => {
                        $el.playKeyframe(options);
                    });
                });
            } else {
                $createKeyframeStyleTag(frameName, css);
            }
        },
        define(frameData) {
            if (frameData.length) {
                for (let i = 0; i < frameData.length; i += 1) {
                    const frame = frameData[i];
                    this.generate(frame);
                }
            } else {
                this.generate(frameData);
            }
        },
    };

    $.fn.resetKeyframe = function (callback) {
        $(this).css(animationPlayState, playStateRunning).css('animation', 'none');

        if (callback) {
            setTimeout(callback, 1);
        }
    };

    $.fn.pauseKeyframe = function () {
        $(this).css(animationPlayState, 'paused');
    };

    $.fn.resumeKeyframe = function () {
        $(this).css(animationPlayState, playStateRunning);
    };

    $.fn.playKeyframe = function (frameOptions, callback) {
        const animObjToStr = function (obj) {
            const newObj = $.extend({
                duration: '0s',
                timingFunction: 'ease',
                delay: '0s',
                iterationCount: 1,
                direction: 'normal',
                fillMode: 'forwards',
            }, obj);

            return [
                newObj.name,
                newObj.duration,
                newObj.timingFunction,
                newObj.delay,
                newObj.iterationCount,
                newObj.direction,
                newObj.fillMode,
            ].join(' ');
        };

        let animationcss = '';

        if ($.isArray(frameOptions)) {
            const frameOptionsStrings = [];
            for (let i = 0; i < frameOptions.length; i += 1) {
                frameOptionsStrings.push(typeof frameOptions[i] === 'string' ?
                    frameOptions[i] :
                    animObjToStr(frameOptions[i]));
            }
            animationcss = frameOptionsStrings.join(', ');
        } else if (typeof frameOptions === 'string') {
            animationcss = frameOptions;
        } else {
            animationcss = animObjToStr(frameOptions);
        }

        const addEvent = (element, type, eventCallback) => {
            element.off(type).on(type.toLowerCase(), eventCallback || frameOptions.complete);
        };

        this.each(function () {
            const $el = $(this).addClass('boostKeyframe')
                .css({
                    animationPlayState: playStateRunning,
                    animation: animationcss,
                })
                .data('keyframeOptions', frameOptions);

            addEvent($el, 'AnimationIteration', callback);
            addEvent($el, 'AnimationEnd', callback);
        });

        return this;
    };

    $createKeyframeStyleTag('boost-keyframe', ' .boostKeyframe{transform:scale3d(1,1,1);}');
})();
