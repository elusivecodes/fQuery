const assert = require('assert').strict;
const { exec } = require('./setup');

const easeIn = (start, now, duration = 200, infinite = false) => {
    const progress = linear(start, now, duration, infinite);

    return progress ** 2;
};

const easeInOut = (start, now, duration = 200, infinite = false) => {
    const progress = linear(start, now, duration, infinite);

    if (progress < 0.5) {
        return progress ** 2 * 2;
    }

    return 1 - ((1 - progress) ** 2 * 2);
};

const easeOut = (start, now, duration = 200, infinite = false) => {
    const progress = linear(start, now, duration, infinite);

    return Math.sqrt(progress);
};

const getAnimationData = async selector => {
    return await exec(selector => {
        const div = document.querySelector(selector);
        return {
            start: div.dataset.animationStart,
            now: div.dataset.animationNow,
            progress: div.dataset.animationProgress
        }
    }, selector);
};

const getAnimationStyle = async (selector, style, translateStyle = null) => {
    return await exec(data => {
        const div = document.querySelector(data.selector);
        const result = {
            progress: div.dataset.animationProgress,
            [data.style]: div.style[data.style]
        };
        if (data.translateStyle) {
            result[data.translateStyle] = div.style[data.translateStyle];
        }
        return result;
    }, { selector, style, translateStyle });
};

const linear = (start, now, duration = 200, infinite = false) => {
    const progress = (now - start) / duration;

    if (infinite) {
        return progress % 1;
    }

    return Math.min(progress, 1);
};

const testAnimation = async (selector, test, duration = 200, infinite = false) => {
    const data = await getAnimationData(selector);

    assert.equal(
        parseFloat(data.progress),
        test(
            data.start,
            data.now,
            duration,
            infinite
        )
    );
};

const testNoAnimation = async selector => {
    const data = await getAnimationData(selector);

    assert.deepEqual(
        data,
        {}
    );
};

const testNoStyle = async (selector, style = 'transform', translateStyle = null) => {
    const data = await getAnimationStyle(selector, style, translateStyle);

    const expected = {
        [style]: ''
    };

    if (translateStyle) {
        expected[translateStyle] = '';
    }

    assert.deepEqual(
        data,
        expected
    );
};

const waitFor = ms => {
    return _ => new Promise(resolve => {
        setTimeout(
            resolve,
            ms
        );
    });
};

module.exports = {
    easeIn,
    easeInOut,
    easeOut,
    getAnimationData,
    getAnimationStyle,
    linear,
    testAnimation,
    testNoAnimation,
    testNoStyle,
    waitFor
};