import { expect } from '@playwright/test';

/**
 * @typedef {object} AnimationStateExpectation
 * @property {string[]} selectors The selectors.
 * @property {number|null} progress The expected progress, or `null` if no animation data should exist.
 * @property {Record<string, string>} [styles] The expected inline styles.
 */

/**
 * Expects animation state on the matched nodes.
 * @param {import('@playwright/test').Page} page The Playwright page.
 * @param {AnimationStateExpectation[]} expectations The expected animation states.
 * @returns {Promise<void>} The promise.
 */
export async function expectAnimationState(page, expectations) {
    const expectedStates = expectations.flatMap((expectation) =>
        expectation.selectors.map((selector) => ({
            selector,
            progress: expectation.progress,
            styles: expectation.styles,
        })),
    );
    const requests = expectedStates.map(({ selector, styles }) => ({
        selector,
        properties: styles ? Object.keys(styles) : [],
    }));
    const actualStates = await page.evaluate((requests) => {
        return requests.map(({ selector, properties }) => {
            const nodes = document.querySelectorAll(selector);
            const node = nodes.item(0);

            return {
                matches: nodes.length,
                animation: node ? {
                    progress: node.dataset.animationProgress,
                    start: node.dataset.animationStart,
                    time: node.dataset.animationTime,
                } : null,
                styles: node ? Object.fromEntries(
                    properties.map((property) => [property, node.style[property]]),
                ) : null,
            };
        });
    }, requests);

    for (const [index, expected] of expectedStates.entries()) {
        const actual = actualStates[index];
        const message = `Animation state for ${expected.selector}`;

        expect(actual.matches, `${message}: selector match count`).toBe(1);

        if (expected.progress === null) {
            expect(actual.animation, message).toEqual({
                progress: undefined,
                start: undefined,
                time: undefined,
            });
        } else {
            expect(actual.animation.progress, message).toBeDefined();
            expect(actual.animation.progress, message).not.toBe('');
            expect(Number(actual.animation.progress), message).toBeCloseTo(expected.progress, 10);
            expect(actual.animation.start, message).toBeDefined();
            expect(actual.animation.start, message).not.toBe('');
            expect(actual.animation.time, message).toBeDefined();
            expect(actual.animation.time, message).not.toBe('');
        }

        if (expected.styles) {
            expect(actual.styles, message).toEqual(expected.styles);
        }
    }
}

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
