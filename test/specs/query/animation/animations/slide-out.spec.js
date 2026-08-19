import { expect, test } from '@playwright/test';
import { resetPage } from '../../../../setup/browser.js';
import { expectAnimation, expectNoAnimation, expectNoStyle, expectSlideOut } from '../../../../support/assertions/animation.js';
import { easeIn, easeInOut, easeOut, linear } from '../../../../support/utils/animation.js';

test.beforeEach(async ({ page }) => {
    await resetPage(page);
});

test.describe('QuerySet #slideOut', () => {
    test.beforeEach(async ({ page }) => {
        await page.addStyleTag({ content: 'div { width: 100px; height: 100px; }' });
        await page.evaluate((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>';
        });
    });

    test('adds a slide-out animation to each node', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    debug: true,
                });
        });
        await page.waitForTimeout(100);
        await expectAnimation(page, '#test2', easeInOut);
        await expectAnimation(page, '#test4', easeInOut);
        await expectSlideOut(page, '#test2');
        await expectSlideOut(page, '#test4');
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await page.waitForTimeout(150);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node with duration', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    duration: 100,
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSlideOut(page, '#test2');
        await expectSlideOut(page, '#test4');
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node (top)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    direction: 'top',
                    duration: 100,
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSlideOut(page, '#test2', 'Y', -1);
        await expectSlideOut(page, '#test4', 'Y', -1);
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node (right)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    direction: 'right',
                    duration: 100,
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSlideOut(page, '#test2', 'X');
        await expectSlideOut(page, '#test4', 'X');
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node (bottom)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    direction: 'bottom',
                    duration: 100,
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSlideOut(page, '#test2');
        await expectSlideOut(page, '#test4');
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node (left)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    direction: 'left',
                    duration: 100,
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSlideOut(page, '#test2', 'X', -1);
        await expectSlideOut(page, '#test4', 'X', -1);
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node (direction callback)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    direction: (_) => 'top',
                    duration: 100,
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSlideOut(page, '#test2', 'Y', -1);
        await expectSlideOut(page, '#test4', 'Y', -1);
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node without gpu', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSlideOut(page, '#test2', null, 1, 'marginTop');
        await expectSlideOut(page, '#test4', null, 1, 'marginTop');
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node without gpu (top)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    direction: 'top',
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSlideOut(page, '#test2', null, -1, 'marginTop');
        await expectSlideOut(page, '#test4', null, -1, 'marginTop');
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node without gpu (right)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    direction: 'right',
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSlideOut(page, '#test2', null, 1, 'marginLeft');
        await expectSlideOut(page, '#test4', null, 1, 'marginLeft');
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node without gpu (bottom)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    direction: 'bottom',
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSlideOut(page, '#test2', null, 1, 'marginTop');
        await expectSlideOut(page, '#test4', null, 1, 'marginTop');
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node without gpu (left)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    direction: 'left',
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSlideOut(page, '#test2', null, -1, 'marginLeft');
        await expectSlideOut(page, '#test4', null, -1, 'marginLeft');
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node (linear)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    duration: 100,
                    type: 'linear',
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', linear, 100);
        await expectAnimation(page, '#test4', linear, 100);
        await expectSlideOut(page, '#test2');
        await expectSlideOut(page, '#test4');
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node (ease-in)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    duration: 100,
                    type: 'ease-in',
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeIn, 100);
        await expectAnimation(page, '#test4', easeIn, 100);
        await expectSlideOut(page, '#test2');
        await expectSlideOut(page, '#test4');
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node (ease-out)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    duration: 100,
                    type: 'ease-out',
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeOut, 100);
        await expectAnimation(page, '#test4', easeOut, 100);
        await expectSlideOut(page, '#test2');
        await expectSlideOut(page, '#test4');
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a slide-out animation to each node (infinite)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .slideOut({
                    duration: 100,
                    type: 'linear',
                    infinite: true,
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', linear, 100, true);
        await expectAnimation(page, '#test4', linear, 100, true);
        await expectSlideOut(page, '#test2');
        await expectSlideOut(page, '#test4');
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', linear, 100, true);
        await expectAnimation(page, '#test4', linear, 100, true);
        await expectSlideOut(page, '#test2');
        await expectSlideOut(page, '#test4');
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', linear, 100, true);
        await expectAnimation(page, '#test4', linear, 100, true);
        await expectSlideOut(page, '#test2');
        await expectSlideOut(page, '#test4');
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
                .slideOut(
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
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSlideOut(page, '#test2');
        await expectSlideOut(page, '#test4');
    });

    test('returns the QuerySet', async ({ page }) => {
        expect(await page.evaluate((_) => {
            const query = $('.animate');
            return query === query.slideOut(
                {
                    debug: true,
                },
            );
        })).toBe(true);
    });
});
