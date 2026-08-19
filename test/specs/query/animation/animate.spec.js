import { expect, test } from '@playwright/test';
import { resetPage } from '../../../setup/browser.js';
import { expectAnimation, expectNoAnimation } from '../../../support/assertions/animation.js';
import { easeIn, easeInOut, easeOut, linear } from '../../../support/utils/animation.js';

test.beforeEach(async ({ page }) => {
    await resetPage(page);
});

test.describe('QuerySet #animate', () => {
    test.beforeEach(async ({ page }) => {
        await page.evaluate((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>';
        });
    });

    test('adds an animation to each node', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .animate(
                    (_) => { },
                    {
                        debug: true,
                    },
                );
        });
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut);
        await expectAnimation(page, '#test4', easeInOut);
        await page.waitForTimeout(150);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('adds an animation to each node with duration', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .animate(
                    (_) => { },
                    {
                        duration: 100,
                        debug: true,
                    },
                );
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('adds an animation to each node (linear)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .animate(
                    (_) => { },
                    {
                        duration: 100,
                        type: 'linear',
                        debug: true,
                    },
                );
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimation(page, '#test2', linear, 100);
        await expectAnimation(page, '#test4', linear, 100);
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('adds an animation to each node (ease-in)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .animate(
                    (_) => { },
                    {
                        duration: 100,
                        type: 'ease-in',
                        debug: true,
                    },
                );
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimation(page, '#test2', easeIn, 100);
        await expectAnimation(page, '#test4', easeIn, 100);
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('adds an animation to each node (ease-out)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .animate(
                    (_) => { },
                    {
                        duration: 100,
                        type: 'ease-out',
                        debug: true,
                    },
                );
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimation(page, '#test2', easeOut, 100);
        await expectAnimation(page, '#test4', easeOut, 100);
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('adds an animation to each node (infinite)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .animate(
                    (_) => { },
                    {
                        duration: 100,
                        type: 'linear',
                        infinite: true,
                        debug: true,
                    },
                );
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimation(page, '#test2', linear, 100, true);
        await expectAnimation(page, '#test4', linear, 100, true);
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimation(page, '#test2', linear, 100, true);
        await expectAnimation(page, '#test4', linear, 100, true);
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimation(page, '#test2', linear, 100, true);
        await expectAnimation(page, '#test4', linear, 100, true);
    });

    test('adds the animation to the queue', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .queue((_) =>
                    new Promise((resolve) =>
                        setTimeout(resolve, 100),
                    ),
                );
            $('.animate')
                .animate(
                    (_) => { },
                    {
                        duration: 100,
                        debug: true,
                    },
                );
        });
        await page.waitForTimeout(50);
        expect(await page.evaluate((_) => document.body.innerHTML)).toBe('<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>');
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
    });

    test('returns the QuerySet', async ({ page }) => {
        expect(await page.evaluate((_) => {
            const query = $('.animate');
            return query === query.animate(
                (_) => { },
                {
                    debug: true,
                },
            );
        })).toBe(true);
    });
});
