import { expect } from '@playwright/test';
import {
    getActiveAnimationData,
    getActiveAnimationDataList,
    getAnimationData,
    getAnimationStyle,
} from '../utils/animation.js';

/**
 * Round a number to two decimal places as a number.
 * @param {number|string} value The value.
 * @return {number} The rounded value.
 */
function roundToTwo(value) {
    return parseFloat(Number(value).toFixed(2));
}

/**
 * Expect animation progress from captured data.
 * @param {object} data The animation snapshot.
 * @param {function} callback The easing callback.
 * @param {number} [duration=200] The animation duration.
 * @param {boolean} [infinite=false] Whether the animation is infinite.
 */
export function expectAnimationData(data, callback, duration = 200, infinite = false) {
    expect(parseFloat(data.progress)).toBe(
        callback(
            data.start,
            data.time,
            duration,
            infinite,
        ),
    );
}

/**
 * Expect animation progress on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {function} callback The easing callback.
 * @param {number} [duration=200] The animation duration.
 * @param {boolean} [infinite=false] Whether the animation is infinite.
 * @return {Promise<object>} The animation snapshot.
 */
export async function expectAnimation(page, selector, callback, duration = 200, infinite = false) {
    const data = await getAnimationData(page, selector);

    expectAnimationData(data, callback, duration, infinite);

    return data;
}

/**
 * Expect no animation data on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @return {Promise<void>} The promise.
 */
export async function expectNoAnimation(page, selector) {
    const data = await getAnimationData(page, selector);

    expect(data).toEqual({
        progress: undefined,
        start: undefined,
        time: undefined,
    });
}

/**
 * Expect no animated style on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {string} [style='transform'] The style.
 * @param {?string} [translateStyle=null] The translation style.
 * @return {Promise<void>} The promise.
 */
export async function expectNoStyle(page, selector, style = 'transform', translateStyle = null) {
    const data = await getAnimationStyle(page, selector, style, translateStyle);
    const expected = {
        progress: undefined,
        [style]: '',
    };

    if (translateStyle) {
        expected[translateStyle] = '';
    }

    expect(data).toEqual(expected);
}

/**
 * Expect fade-in opacity on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @return {Promise<object>} The animation snapshot.
 */
export async function expectFadeIn(page, selector) {
    const data = await getAnimationStyle(page, selector, 'opacity');

    if (data.progress !== undefined && data.opacity !== '') {
        expect(data.opacity).toBe(`${roundToTwo(data.progress)}`);
    }

    return data;
}

/**
 * Expect fade-out opacity on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @return {Promise<object>} The animation snapshot.
 */
export async function expectFadeOut(page, selector) {
    const data = await getAnimationStyle(page, selector, 'opacity');

    if (data.progress !== undefined && data.opacity !== '') {
        expect(Number(data.opacity)).toBeCloseTo(roundToTwo(1 - Number(data.progress)), 2);
    }

    return data;
}

/**
 * Expect translate-based animation styles from captured data.
 * @param {object} data The animation snapshot.
 * @param {object} [options={}] The animation options.
 * @param {'in'|'out'} [options.mode='in'] The animation direction.
 * @param {string|null} [options.translate='Y'] The translation axis.
 * @param {number} [options.inverse=1] Whether to invert the direction.
 * @param {string} [options.style='transform'] The style attribute.
 */
export function expectTranslateAnimationData(data, {
    mode = 'in',
    translate = 'Y',
    inverse = 1,
    style = 'transform',
} = {}) {
    const amount = mode === 'in' ?
        roundToTwo((100 - (100 * Number(data.progress))) * inverse) :
        roundToTwo((100 * Number(data.progress)) * inverse);

    expect(data[style]).toBe(
        translate ?
            `translate${translate}(${amount}px)` :
            `${amount}px`,
    );
}

/**
 * Expect a translate-based animation on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {object} [options={}] The animation options.
 * @param {'in'|'out'} [options.mode='in'] The animation direction.
 * @param {string|null} [options.translate='Y'] The translation axis.
 * @param {number} [options.inverse=1] Whether to invert the direction.
 * @param {string} [options.style='transform'] The style attribute.
 * @return {Promise<object>} The animation snapshot.
 */
export async function expectTranslateAnimation(page, selector, {
    mode = 'in',
    translate = 'Y',
    inverse = 1,
    style = 'transform',
} = {}) {
    const data = await getActiveAnimationData(page, selector, style);

    expectTranslateAnimationData(data, {
        mode,
        translate,
        inverse,
        style,
    });

    return data;
}

/**
 * Expect a slide-in animation on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {?string} [translate='Y'] The translation axis.
 * @param {number} [inverse=1] Whether to invert the direction.
 * @param {string} [style='transform'] The style attribute.
 * @return {Promise<object>} The animation snapshot.
 */
export async function expectSlideIn(page, selector, translate = 'Y', inverse = 1, style = 'transform') {
    return await expectTranslateAnimation(page, selector, {
        mode: 'in',
        translate,
        inverse,
        style,
    });
}

/**
 * Expect a slide-out animation on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {?string} [translate='Y'] The translation axis.
 * @param {number} [inverse=1] Whether to invert the direction.
 * @param {string} [style='transform'] The style attribute.
 * @return {Promise<object>} The animation snapshot.
 */
export async function expectSlideOut(page, selector, translate = 'Y', inverse = 1, style = 'transform') {
    return await expectTranslateAnimation(page, selector, {
        mode: 'out',
        translate,
        inverse,
        style,
    });
}

/**
 * Expect a drop-in animation on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {?string} [translate='Y'] The translation axis.
 * @param {number} [inverse=1] Whether to invert the direction.
 * @param {string} [style='transform'] The style attribute.
 * @return {Promise<object>} The animation snapshot.
 */
export async function expectDropIn(page, selector, translate = 'Y', inverse = 1, style = 'transform') {
    return await expectTranslateAnimation(page, selector, {
        mode: 'in',
        translate,
        inverse,
        style,
    });
}

/**
 * Expect a drop-out animation on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {?string} [translate='Y'] The translation axis.
 * @param {number} [inverse=1] Whether to invert the direction.
 * @param {string} [style='transform'] The style attribute.
 * @return {Promise<object>} The animation snapshot.
 */
export async function expectDropOut(page, selector, translate = 'Y', inverse = 1, style = 'transform') {
    return await expectTranslateAnimation(page, selector, {
        mode: 'out',
        translate,
        inverse,
        style,
    });
}

/**
 * Expect translate-based animation styles for a selector list.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {function} callback The easing callback.
 * @param {object} [options={}] The animation options.
 * @param {string[]} [options.selectors=['#test2', '#test4']] The selectors.
 * @param {'in'|'out'} [options.mode='in'] The animation direction.
 * @param {string|null} [options.translate='Y'] The translation axis.
 * @param {number} [options.inverse=1] Whether to invert the direction.
 * @param {string} [options.style='transform'] The style attribute.
 * @param {number} [options.duration=200] The animation duration.
 * @param {boolean} [options.infinite=false] Whether the animation is infinite.
 * @return {Promise<object[]>} The animation snapshots.
 */
export async function expectTranslateAnimationPair(page, callback, {
    selectors = ['#test2', '#test4'],
    mode = 'in',
    translate = 'Y',
    inverse = 1,
    style = 'transform',
    duration = 200,
    infinite = false,
} = {}) {
    const dataList = await getActiveAnimationDataList(page, selectors, style);

    for (const data of dataList) {
        expectTranslateAnimationData(data, {
            mode,
            translate,
            inverse,
            style,
        });
        expectAnimationData(data, callback, duration, infinite);
    }

    return dataList;
}

/**
 * Expect the standard drop-in pair to be animating.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {function} callback The easing callback.
 * @param {object} [options={}] The animation options.
 * @param {string[]} [options.selectors=['#test2', '#test4']] The selectors.
 * @param {string|null} [options.translate='Y'] The translation axis.
 * @param {number} [options.inverse=-1] Whether to invert the direction.
 * @param {string} [options.style='transform'] The style attribute.
 * @param {number} [options.duration=200] The animation duration.
 * @param {boolean} [options.infinite=false] Whether the animation is infinite.
 * @return {Promise<object[]>} The animation snapshots.
 */
export async function expectDropInPair(page, callback, {
    selectors = ['#test2', '#test4'],
    translate = 'Y',
    inverse = -1,
    style = 'transform',
    duration = 200,
    infinite = false,
} = {}) {
    return await expectTranslateAnimationPair(page, callback, {
        selectors,
        mode: 'in',
        translate,
        inverse,
        style,
        duration,
        infinite,
    });
}

/**
 * Expect the standard drop-out pair to be animating.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {function} callback The easing callback.
 * @param {object} [options={}] The animation options.
 * @param {string[]} [options.selectors=['#test2', '#test4']] The selectors.
 * @param {string|null} [options.translate='Y'] The translation axis.
 * @param {number} [options.inverse=-1] Whether to invert the direction.
 * @param {string} [options.style='transform'] The style attribute.
 * @param {number} [options.duration=200] The animation duration.
 * @param {boolean} [options.infinite=false] Whether the animation is infinite.
 * @return {Promise<object[]>} The animation snapshots.
 */
export async function expectDropOutPair(page, callback, {
    selectors = ['#test2', '#test4'],
    translate = 'Y',
    inverse = -1,
    style = 'transform',
    duration = 200,
    infinite = false,
} = {}) {
    return await expectTranslateAnimationPair(page, callback, {
        selectors,
        mode: 'out',
        translate,
        inverse,
        style,
        duration,
        infinite,
    });
}

/**
 * Expect rotate animation styles from captured data.
 * @param {object} data The animation snapshot.
 * @param {object} [options={}] The animation options.
 * @param {'in'|'out'} [options.mode='in'] The animation direction.
 * @param {number} [options.x=0] The rotate3d X value.
 * @param {number} [options.y=1] The rotate3d Y value.
 * @param {number} [options.z=0] The rotate3d Z value.
 * @param {number} [options.inverse=1] Whether to invert the direction.
 */
export function expectRotateAnimationData(data, {
    mode = 'in',
    x = 0,
    y = 1,
    z = 0,
    inverse = 1,
} = {}) {
    const amount = mode === 'in' ?
        roundToTwo((90 - (Number(data.progress) * 90)) * inverse) :
        roundToTwo((Number(data.progress) * 90) * inverse);

    expect(data.transform).toBe(`rotate3d(${x}, ${y}, ${z}, ${amount}deg)`);
}

/**
 * Expect a rotate animation on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {object} [options={}] The animation options.
 * @param {'in'|'out'} [options.mode='in'] The animation direction.
 * @param {number} [options.x=0] The rotate3d X value.
 * @param {number} [options.y=1] The rotate3d Y value.
 * @param {number} [options.z=0] The rotate3d Z value.
 * @param {number} [options.inverse=1] Whether to invert the direction.
 * @return {Promise<object>} The animation snapshot.
 */
export async function expectRotateAnimation(page, selector, {
    mode = 'in',
    x = 0,
    y = 1,
    z = 0,
    inverse = 1,
} = {}) {
    const data = await getActiveAnimationData(page, selector, 'transform');

    expectRotateAnimationData(data, {
        mode,
        x,
        y,
        z,
        inverse,
    });

    return data;
}

/**
 * Expect a rotate-in animation on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {number} [x=0] The rotate3d X value.
 * @param {number} [y=1] The rotate3d Y value.
 * @param {number} [z=0] The rotate3d Z value.
 * @param {number} [inverse=1] Whether to invert the direction.
 * @return {Promise<object>} The animation snapshot.
 */
export async function expectRotateIn(page, selector, x = 0, y = 1, z = 0, inverse = 1) {
    return await expectRotateAnimation(page, selector, {
        mode: 'in',
        x,
        y,
        z,
        inverse,
    });
}

/**
 * Expect a rotate-out animation on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {number} [x=0] The rotate3d X value.
 * @param {number} [y=1] The rotate3d Y value.
 * @param {number} [z=0] The rotate3d Z value.
 * @param {number} [inverse=1] Whether to invert the direction.
 * @return {Promise<object>} The animation snapshot.
 */
export async function expectRotateOut(page, selector, x = 0, y = 1, z = 0, inverse = 1) {
    return await expectRotateAnimation(page, selector, {
        mode: 'out',
        x,
        y,
        z,
        inverse,
    });
}

/**
 * Expect squeeze animation styles from captured data.
 * @param {object} data The animation snapshot.
 * @param {object} [options={}] The animation options.
 * @param {'in'|'out'} [options.mode='in'] The animation direction.
 * @param {string} [options.style='height'] The animated style.
 * @param {string|boolean|null} [options.translate=false] The translation axis.
 * @param {string} [options.translateStyle='transform'] The translation style.
 */
export function expectSqueezeAnimationData(data, {
    mode = 'in',
    style = 'height',
    translate = false,
    translateStyle = 'transform',
} = {}) {
    const amount = mode === 'in' ?
        roundToTwo(100 * Number(data.progress)) :
        roundToTwo(100 - (100 * Number(data.progress)));

    expect(data[style]).toBe(`${amount}px`);

    if (translate === false) {
        expect(data[translateStyle]).toBe('');
        return;
    }

    const translateAmount = roundToTwo(100 - amount);

    expect(data[translateStyle]).toBe(
        translate ?
            `translate${translate}(${translateAmount}px)` :
            `${translateAmount}px`,
    );
}

/**
 * Expect a squeeze animation on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {object} [options={}] The animation options.
 * @param {'in'|'out'} [options.mode='in'] The animation direction.
 * @param {string} [options.style='height'] The animated style.
 * @param {string|boolean|null} [options.translate=false] The translation axis.
 * @param {string} [options.translateStyle='transform'] The translation style.
 * @return {Promise<object>} The animation snapshot.
 */
export async function expectSqueezeAnimation(page, selector, {
    mode = 'in',
    style = 'height',
    translate = false,
    translateStyle = 'transform',
} = {}) {
    const data = await getActiveAnimationData(page, selector, style, translateStyle);

    expectSqueezeAnimationData(data, {
        mode,
        style,
        translate,
        translateStyle,
    });

    return data;
}

/**
 * Expect a squeeze-in animation on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {string} [style='height'] The animated style.
 * @param {string|boolean|null} [translate=false] The translation axis.
 * @param {string} [translateStyle='transform'] The translation style.
 * @return {Promise<object>} The animation snapshot.
 */
export async function expectSqueezeIn(page, selector, style = 'height', translate = false, translateStyle = 'transform') {
    return await expectSqueezeAnimation(page, selector, {
        mode: 'in',
        style,
        translate,
        translateStyle,
    });
}

/**
 * Expect a squeeze-out animation on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {string} [style='height'] The animated style.
 * @param {string|boolean|null} [translate=false] The translation axis.
 * @param {string} [translateStyle='transform'] The translation style.
 * @return {Promise<object>} The animation snapshot.
 */
export async function expectSqueezeOut(page, selector, style = 'height', translate = false, translateStyle = 'transform') {
    return await expectSqueezeAnimation(page, selector, {
        mode: 'out',
        style,
        translate,
        translateStyle,
    });
}

/**
 * Expect squeeze-out styles from captured data.
 * @param {object} data The animation snapshot.
 * @param {string} [style='height'] The animated style.
 * @param {string|boolean|null} [translate=false] The translation axis.
 * @param {string} [translateStyle='transform'] The translation style.
 */
export function expectSqueezeOutData(data, style = 'height', translate = false, translateStyle = 'transform') {
    expectSqueezeAnimationData(data, {
        mode: 'out',
        style,
        translate,
        translateStyle,
    });
}

/**
 * Expect squeeze-out progress and styles for the standard animated pair.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {function} callback The easing callback.
 * @param {object} [options={}] The assertion options.
 * @param {string[]} [options.selectors=['#test2', '#test4']] The selectors.
 * @param {number} [options.duration=200] The animation duration.
 * @param {boolean} [options.infinite=false] Whether the animation is infinite.
 * @param {string} [options.style='height'] The animated style.
 * @param {string|boolean|null} [options.translate=false] The translation axis.
 * @param {string} [options.translateStyle='transform'] The translation style.
 * @return {Promise<void>} The promise.
 */
export async function expectSqueezeOutPair(page, callback, {
    selectors = ['#test2', '#test4'],
    duration = 200,
    infinite = false,
    style = 'height',
    translate = false,
    translateStyle = 'transform',
} = {}) {
    const dataList = await getActiveAnimationDataList(page, selectors, style, translateStyle);

    for (const data of dataList) {
        expectAnimationData(data, callback, duration, infinite);
        expectSqueezeOutData(data, style, translate, translateStyle);
    }
}
