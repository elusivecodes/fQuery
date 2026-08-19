import { expect, test } from '@playwright/test';
import { resetPage } from '../../../../setup/browser.js';
import { expectAnimationData, expectDropIn, expectNoAnimation, expectNoStyle, expectTranslateAnimationData } from '../../../../support/assertions/animation.js';
import { easeIn, easeInOut, easeOut, linear } from '../../../../support/utils/animation.js';

test.beforeEach(async ({ page }) => {
    await resetPage(page);
});

test.describe('QuerySet #dropIn', () => {
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

    test('adds a drop-in animation to each node', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
                    debug: true,
                });
        });
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        const test2Data = await expectDropIn(page, '#test2', 'Y', -1);
        const test4Data = await expectDropIn(page, '#test4', 'Y', -1);
        expectAnimationData(test2Data, easeInOut);
        expectAnimationData(test4Data, easeInOut);
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

    test('adds a drop-in animation to each node with duration', async ({ page }) => {
        let animatedNodes;

        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
                    duration: 100,
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expect.poll(async () => {
            animatedNodes = await page.evaluate((selectors) => {
                return selectors.map((selector) => {
                    const div = document.querySelector(selector);

                    return {
                        progress: div?.dataset.animationProgress,
                        start: div?.dataset.animationStart,
                        time: div?.dataset.animationTime,
                        transform: div?.style.transform ?? '',
                    };
                });
            }, ['#test2', '#test4']);

            return animatedNodes.every((data) => data.progress !== undefined && data.transform !== '');
        }).toBe(true);
        const [test2Data, test4Data] = animatedNodes;

        expectTranslateAnimationData(test2Data, {
            mode: 'in',
            translate: 'Y',
            inverse: -1,
        });
        expectTranslateAnimationData(test4Data, {
            mode: 'in',
            translate: 'Y',
            inverse: -1,
        });
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
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

    test('adds a drop-in animation to each node (top)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
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
        const test2Data = await expectDropIn(page, '#test2', 'Y', -1);
        const test4Data = await expectDropIn(page, '#test4', 'Y', -1);
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
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

    test('adds a drop-in animation to each node (right)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
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
        const test2Data = await expectDropIn(page, '#test2', 'X');
        const test4Data = await expectDropIn(page, '#test4', 'X');
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
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

    test('adds a drop-in animation to each node (bottom)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
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
        const test2Data = await expectDropIn(page, '#test2');
        const test4Data = await expectDropIn(page, '#test4');
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
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

    test('adds a drop-in animation to each node (left)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
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
        const test2Data = await expectDropIn(page, '#test2', 'X', -1);
        const test4Data = await expectDropIn(page, '#test4', 'X', -1);
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
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

    test('adds a drop-in animation to each node (direction callback)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
                    direction: (_) => 'bottom',
                    duration: 100,
                    debug: true,
                });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        const test2Data = await expectDropIn(page, '#test2');
        const test4Data = await expectDropIn(page, '#test4');
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
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

    test('adds a drop-in animation to each node without gpu', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
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
        const test2Data = await expectDropIn(page, '#test2', null, -1, 'marginTop');
        const test4Data = await expectDropIn(page, '#test4', null, -1, 'marginTop');
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
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

    test('adds a drop-in animation to each node without gpu (top)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
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
        const test2Data = await expectDropIn(page, '#test2', null, -1, 'marginTop');
        const test4Data = await expectDropIn(page, '#test4', null, -1, 'marginTop');
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
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

    test('adds a drop-in animation to each node without gpu (right)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
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
        const test2Data = await expectDropIn(page, '#test2', null, 1, 'marginLeft');
        const test4Data = await expectDropIn(page, '#test4', null, 1, 'marginLeft');
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
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

    test('adds a drop-in animation to each node without gpu (bottom)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
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
        const test2Data = await expectDropIn(page, '#test2', null, 1, 'marginTop');
        const test4Data = await expectDropIn(page, '#test4', null, 1, 'marginTop');
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
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

    test('adds a drop-in animation to each node without gpu (left)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
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
        const test2Data = await expectDropIn(page, '#test2', null, -1, 'marginLeft');
        const test4Data = await expectDropIn(page, '#test4', null, -1, 'marginLeft');
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
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

    test('adds a drop-in animation to each node (linear)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
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
        const test2Data = await expectDropIn(page, '#test2', 'Y', -1);
        const test4Data = await expectDropIn(page, '#test4', 'Y', -1);
        expectAnimationData(test2Data, linear, 100);
        expectAnimationData(test4Data, linear, 100);
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

    test('adds a drop-in animation to each node (ease-in)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
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
        const test2Data = await expectDropIn(page, '#test2', 'Y', -1);
        const test4Data = await expectDropIn(page, '#test4', 'Y', -1);
        expectAnimationData(test2Data, easeIn, 100);
        expectAnimationData(test4Data, easeIn, 100);
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

    test('adds a drop-in animation to each node (ease-out)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
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
        const test2Data = await expectDropIn(page, '#test2', 'Y', -1);
        const test4Data = await expectDropIn(page, '#test4', 'Y', -1);
        expectAnimationData(test2Data, easeOut, 100);
        expectAnimationData(test4Data, easeOut, 100);
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

    test('adds a drop-in animation to each node (infinite)', async ({ page }) => {
        let test2Data;
        let test4Data;

        await page.evaluate((_) => {
            $('.animate')
                .dropIn({
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
        test2Data = await expectDropIn(page, '#test2', 'Y', -1);
        test4Data = await expectDropIn(page, '#test4', 'Y', -1);
        expectAnimationData(test2Data, linear, 100, true);
        expectAnimationData(test4Data, linear, 100, true);
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        test2Data = await expectDropIn(page, '#test2', 'Y', -1);
        test4Data = await expectDropIn(page, '#test4', 'Y', -1);
        expectAnimationData(test2Data, linear, 100, true);
        expectAnimationData(test4Data, linear, 100, true);
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        test2Data = await expectDropIn(page, '#test2', 'Y', -1);
        test4Data = await expectDropIn(page, '#test4', 'Y', -1);
        expectAnimationData(test2Data, linear, 100, true);
        expectAnimationData(test4Data, linear, 100, true);
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
                .dropIn(
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
        const test2Data = await expectDropIn(page, '#test2', 'Y', -1);
        const test4Data = await expectDropIn(page, '#test4', 'Y', -1);
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
    });

    test('returns the QuerySet', async ({ page }) => {
        expect(await page.evaluate((_) => {
            const query = $('.animate');
            return query === query.dropIn(
                {
                    debug: true,
                },
            );
        })).toBe(true);
    });
});
