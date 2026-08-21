import { expect } from '@playwright/test';

/**
 * Expect animation progress on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {number} progress The expected progress.
 * @returns {Promise<void>} The promise.
 */
export async function expectAnimationProgress(page, selector, progress) {
    const actual = await page.locator(selector).evaluate((node) =>
        node.dataset.animationProgress,
    );

    expect(actual).toBeDefined();
    expect(actual).not.toBe('');
    expect(Number(actual)).toBeCloseTo(progress, 10);
}

/**
 * Expect no animation data on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @returns {Promise<void>} The promise.
 */
export async function expectNoAnimation(page, selector) {
    const actual = await page.locator(selector).evaluate((node) => ({
        progress: node.dataset.animationProgress,
        start: node.dataset.animationStart,
        time: node.dataset.animationTime,
    }));

    expect(actual).toEqual({
        progress: undefined,
        start: undefined,
        time: undefined,
    });
}

/**
 * Expect inline styles on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @param {Record<string, string>} styles The expected styles.
 * @returns {Promise<void>} The promise.
 */
export async function expectStyle(page, selector, styles) {
    const properties = Object.keys(styles);
    const actual = await page.locator(selector).evaluate((node, properties) => {
        return Object.fromEntries(
            properties.map((property) => [property, node.style[property]]),
        );
    }, properties);

    expect(actual).toEqual(styles);
}

/**
 * Expect no animation progress or inline transform on the matched node.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {string} selector The selector.
 * @returns {Promise<void>} The promise.
 */
export async function expectNoStyle(page, selector) {
    const actual = await page.locator(selector).evaluate((node) => ({
        progress: node.dataset.animationProgress,
        transform: node.style.transform,
    }));

    expect(actual).toEqual({
        progress: undefined,
        transform: '',
    });
}
