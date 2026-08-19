import { expect } from '@playwright/test';

/**
 * Calculate the linear progress.
 * @param {number} start The start time.
 * @param {number} time The current time.
 * @param {number} [duration=200] The animation duration.
 * @param {boolean} [infinite=false] Whether the animation is infinite.
 * @return {number} The linear progress.
 */
export function linear(start, time, duration = 200, infinite = false) {
    const progress = (time - start) / duration;

    if (infinite) {
        return progress % 1;
    }

    return Math.min(progress, 1);
}

/**
 * Calculate the ease-in progress.
 * @param {number} start The start time.
 * @param {number} time The current time.
 * @param {number} [duration=200] The animation duration.
 * @param {boolean} [infinite=false] Whether the animation is infinite.
 * @return {number} The ease-in progress.
 */
export function easeIn(start, time, duration = 200, infinite = false) {
    const progress = linear(start, time, duration, infinite);

    return progress ** 2;
}

/**
 * Calculate the ease-in-out progress.
 * @param {number} start The start time.
 * @param {number} time The current time.
 * @param {number} [duration=200] The animation duration.
 * @param {boolean} [infinite=false] Whether the animation is infinite.
 * @return {number} The ease-in-out progress.
 */
export function easeInOut(start, time, duration = 200, infinite = false) {
    const progress = linear(start, time, duration, infinite);

    if (progress < 0.5) {
        return progress ** 2 * 2;
    }

    return 1 - ((1 - progress) ** 2 * 2);
}

/**
 * Calculate the ease-out progress.
 * @param {number} start The start time.
 * @param {number} time The current time.
 * @param {number} [duration=200] The animation duration.
 * @param {boolean} [infinite=false] Whether the animation is infinite.
 * @return {number} The ease-out progress.
 */
export function easeOut(start, time, duration = 200, infinite = false) {
    const progress = linear(start, time, duration, infinite);

    return Math.sqrt(progress);
}

/**
 * Get the animation data.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @return {Promise<object>} The animation data.
 */
export async function getAnimationData(page, selector) {
    return await page.evaluate((target) => {
        const div = document.querySelector(target);

        return {
            progress: div?.dataset.animationProgress,
            start: div?.dataset.animationStart,
            time: div?.dataset.animationTime,
        };
    }, selector);
}

/**
 * Get the animation style data.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {string} style The style.
 * @param {?string} [translateStyle=null] The translation style.
 * @return {Promise<object>} The animation style data.
 */
export async function getAnimationStyle(page, selector, style, translateStyle = null) {
    return await page.evaluate((data) => {
        const div = document.querySelector(data.selector);
        const result = {
            progress: div?.dataset.animationProgress,
            [data.style]: div?.style[data.style] ?? '',
        };

        if (data.translateStyle) {
            result[data.translateStyle] = div?.style[data.translateStyle] ?? '';
        }

        return result;
    }, {
        selector,
        style,
        translateStyle,
    });
}

/**
 * Wait until an animated style is active, then return the style snapshot.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {string} [style='transform'] The style.
 * @param {?string} [translateStyle=null] The translation style.
 * @return {Promise<object>} The active style snapshot.
 */
export async function getActiveAnimationStyle(page, selector, style = 'transform', translateStyle = null) {
    let data;

    await expect.poll(async () => {
        data = await getAnimationStyle(page, selector, style, translateStyle);

        return data.progress !== undefined && data[style] !== '';
    }).toBe(true);

    return data;
}

/**
 * Wait until an animated style is active on each selector.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string[]} selectors The selectors to wait for.
 * @param {string} [style='transform'] The style.
 * @return {Promise<void>} The promise.
 */
export async function waitForActiveAnimationStyles(page, selectors, style = 'transform') {
    for (const selector of selectors) {
        await expect.poll(async () => {
            const data = await getAnimationStyle(page, selector, style);

            return data.progress !== undefined && data[style] !== '';
        }).toBe(true);
    }
}

/**
 * Get active animation data from a single animation frame.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {string} [style='transform'] The animated style.
 * @param {?string} [translateStyle=null] The translation style.
 * @return {Promise<object>} The animation data.
 */
export async function getActiveAnimationData(page, selector, style = 'transform', translateStyle = null) {
    let data;

    await expect.poll(async () => {
        data = await page.evaluate((input) => {
            const div = document.querySelector(input.selector);
            const result = {
                progress: div?.dataset.animationProgress,
                start: div?.dataset.animationStart,
                time: div?.dataset.animationTime,
                [input.style]: div?.style[input.style] ?? '',
            };

            if (input.translateStyle) {
                result[input.translateStyle] = div?.style[input.translateStyle] ?? '';
            }

            return result;
        }, {
            selector,
            style,
            translateStyle,
        });

        return data.progress !== undefined && data[style] !== '';
    }).toBe(true);

    return data;
}

/**
 * Get active animation data for multiple selectors from the same snapshot.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string[]} selectors The selectors.
 * @param {string} [style='transform'] The animated style.
 * @param {?string} [translateStyle=null] The translation style.
 * @return {Promise<object[]>} The animation snapshots.
 */
export async function getActiveAnimationDataList(page, selectors, style = 'transform', translateStyle = null) {
    let dataList;

    await expect.poll(async () => {
        dataList = await page.evaluate((input) => {
            return input.selectors.map((selector) => {
                const div = document.querySelector(selector);
                const result = {
                    progress: div?.dataset.animationProgress,
                    start: div?.dataset.animationStart,
                    time: div?.dataset.animationTime,
                    [input.style]: div?.style[input.style] ?? '',
                };

                if (input.translateStyle) {
                    result[input.translateStyle] = div?.style[input.translateStyle] ?? '';
                }

                return result;
            });
        }, {
            selectors,
            style,
            translateStyle,
        });

        return dataList.every((data) => data.progress !== undefined && data[style] !== '');
    }).toBe(true);

    return dataList;
}
