import { expect, test } from '@playwright/test';
import { advanceClock, resetPage, setupClock } from '../../../../setup/browser.js';
import { expectAnimationProgress, expectNoAnimation, expectNoStyle, expectStyle } from '../../../../support/assertions/animation.js';

test.beforeEach(async ({ page }) => {
    await setupClock(page);
    await resetPage(page);
});

test.describe('QuerySet #squeezeOut', () => {
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

    test('adds a squeeze-out animation to each node', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    debug: true,
                });
        });
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '50px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '50px' });
        await advanceClock(page, 150);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node with duration', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    duration: 100,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '50px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '50px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node (top)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'top',
                    duration: 100,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '50px', transform: 'translateY(50px)' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '50px', transform: 'translateY(50px)' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node (right)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'right',
                    duration: 100,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', width: '50px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', width: '50px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node (bottom)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'bottom',
                    duration: 100,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '50px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '50px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node (left)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'left',
                    duration: 100,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', width: '50px', transform: 'translateX(50px)' });
        await expectStyle(page, '#test4', { overflow: 'hidden', width: '50px', transform: 'translateX(50px)' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node (direction callback)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    direction: (_) => 'bottom',
                    duration: 100,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '50px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '50px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node without gpu', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '50px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '50px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node without gpu (top)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'top',
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '50px', marginTop: '50px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '50px', marginTop: '50px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node without gpu (right)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'right',
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', width: '50px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', width: '50px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node without gpu (bottom)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'bottom',
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '50px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '50px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node without gpu (left)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'left',
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', width: '50px', marginLeft: '50px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', width: '50px', marginLeft: '50px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node (linear)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    duration: 100,
                    type: 'linear',
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '50px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '50px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node (ease-in)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    duration: 100,
                    type: 'ease-in',
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.25);
        await expectAnimationProgress(page, '#test4', 0.25);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '75px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '75px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node (ease-out)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    duration: 100,
                    type: 'ease-out',
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.7071067812);
        await expectAnimationProgress(page, '#test4', 0.7071067812);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '29.29px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '29.29px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test2');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
    });

    test('adds a squeeze-out animation to each node (infinite)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .squeezeOut({
                    duration: 100,
                    type: 'linear',
                    infinite: true,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '50px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '50px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0);
        await expectAnimationProgress(page, '#test4', 0);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '100px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '100px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '50px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '50px' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
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
                .squeezeOut(
                    {
                        duration: 100,
                        debug: true,
                    },
                );
        });
        await advanceClock(page, 50);
        expect(await page.evaluate((_) => document.body.innerHTML)).toBe('<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>');
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { overflow: 'hidden', height: '50px' });
        await expectStyle(page, '#test4', { overflow: 'hidden', height: '50px' });
    });

    test('returns the QuerySet', async ({ page }) => {
        expect(await page.evaluate((_) => {
            const query = $('.animate');
            return query === query.squeezeOut(
                {
                    debug: true,
                },
            );
        })).toBe(true);
    });
});
