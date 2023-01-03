import assert from 'node:assert/strict';
import { exec } from './setup.js';

/**
 * Calculate the ease-in progress.
 * @param {number} start The start time.
 * @param {number} time The current time.
 * @param {number} [duration=200] The animation duration.
 * @param {Boolean} [infinite] Whether the animation is infinite.
 * @return {number} The ease-in progress.
 */
export function easeIn(start, time, duration = 200, infinite = false) {
    const progress = linear(start, time, duration, infinite);

    return progress ** 2;
};

/**
 * Calculate the ease-in-out progress.
 * @param {number} start The start time.
 * @param {number} time The current time.
 * @param {number} [duration=200] The animation duration.
 * @param {Boolean} [infinite] Whether the animation is infinite.
 * @return {number} The ease-in-out progress.
 */
export function easeInOut(start, time, duration = 200, infinite = false) {
    const progress = linear(start, time, duration, infinite);

    if (progress < 0.5) {
        return progress ** 2 * 2;
    }

    return 1 - ((1 - progress) ** 2 * 2);
};

/**
 * Calculate the ease-out progress.
 * @param {number} start The start time.
 * @param {number} time The current time.
 * @param {number} [duration=200] The animation duration.
 * @param {Boolean} [infinite] Whether the animation is infinite.
 * @return {number} The ease-out progress.
 */
export function easeOut(start, time, duration = 200, infinite = false) {
    const progress = linear(start, time, duration, infinite);

    return Math.sqrt(progress);
};

/**
 * Get the animation data.
 * @param {string} selector The selector.
 * @return {object} The animation data.
 */
export async function getAnimationData(selector) {
    return await exec((selector) => {
        const div = document.querySelector(selector);
        return {
            start: div.dataset.animationStart,
            time: div.dataset.animationTime,
            progress: div.dataset.animationProgress,
        };
    }, selector);
};

/**
 * Get the animation style data.
 * @param {string} selector The selector.
 * @param {string} style The style.
 * @param {string} [translateStyle] The translation style.
 * @return {object} The animation style data.
 */
export async function getAnimationStyle(selector, style, translateStyle = null) {
    return await exec((data) => {
        const div = document.querySelector(data.selector);
        const result = {
            progress: div.dataset.animationProgress,
            [data.style]: div.style[data.style],
        };
        if (data.translateStyle) {
            result[data.translateStyle] = div.style[data.translateStyle];
        }
        return result;
    }, { selector, style, translateStyle });
};

/**
 * Calculate the linear progress.
 * @param {number} start The start time.
 * @param {number} time The current time.
 * @param {number} [duration=200] The animation duration.
 * @param {Boolean} [infinite] Whether the animation is infinite.
 * @return {number} The linear progress.
 */
export function linear(start, time, duration = 200, infinite = false) {
    const progress = (time - start) / duration;

    if (infinite) {
        return progress % 1;
    }

    return Math.min(progress, 1);
};

/**
 * Test the animation.
 * @param {string} selector The selector.
 * @param {function} [callback] The test callback.
 * @param {number} [duration=200] The animation duration.
 * @param {Boolean} [infinite] Whether the animation is infinite.
 */
export async function testAnimation(selector, callback, duration = 200, infinite = false) {
    const data = await getAnimationData(selector);

    assert.strictEqual(
        parseFloat(data.progress),
        callback(
            data.start,
            data.time,
            duration,
            infinite,
        ),
    );
};

/**
 * Test for no animation.
 * @param {string} selector The selector.
 */
export async function testNoAnimation(selector) {
    const data = await getAnimationData(selector);

    assert.deepStrictEqual(
        data,
        {},
    );
};

/**
 * Test for no style.
 * @param {string} selector The selector.
 * @param {string} [style=transform] The style.
 * @param {string} [translateStyle] The translation style.
 */
export async function testNoStyle(selector, style = 'transform', translateStyle = null) {
    const data = await getAnimationStyle(selector, style, translateStyle);

    const expected = {
        [style]: '',
    };

    if (translateStyle) {
        expected[translateStyle] = '';
    }

    assert.deepStrictEqual(
        data,
        expected,
    );
};

/**
 * Resolve a Promise after a number of milliseconds.
 * @param {number} ms The number of milliseconds.
 * @return {Promise} The promise.
 */
export function waitFor(ms) {
    return (_) => new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};
