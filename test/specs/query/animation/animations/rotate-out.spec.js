import { expect, test } from '@playwright/test';
import { advanceClock, resetPage, setupClock } from '../../../../setup/browser.js';
import { expectAnimationProgress, expectNoAnimation, expectNoStyle, expectStyle } from '../../../../support/assertions/animation.js';

test.beforeEach(async ({ page }) => {
    await setupClock(page);
    await resetPage(page);
});

test.describe('QuerySet #rotateOut', () => {
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

    test('adds a rotate-out animation to each node', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .rotateOut({
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
        await expectStyle(page, '#test2', { transform: 'rotate3d(0, 1, 0, 45deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(0, 1, 0, 45deg)' });
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

    test('adds a rotate-out animation to each node with duration', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .rotateOut({
                    duration: 100,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'rotate3d(0, 1, 0, 45deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(0, 1, 0, 45deg)' });
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

    test('adds a rotate-out animation to each node (X)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .rotateOut({
                    x: 1,
                    y: 0,
                    duration: 100,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'rotate3d(1, 0, 0, 45deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(1, 0, 0, 45deg)' });
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

    test('adds a rotate-out animation to each node (default Y)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .rotateOut({
                    x: 0,
                    y: 1,
                    duration: 100,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'rotate3d(0, 1, 0, 45deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(0, 1, 0, 45deg)' });
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

    test('adds a rotate-out animation to each node (Y)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .rotateOut({
                    y: 1,
                    duration: 100,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'rotate3d(0, 1, 0, 45deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(0, 1, 0, 45deg)' });
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

    test('adds a rotate-out animation to each node (Z)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .rotateOut({
                    y: 0,
                    z: 1,
                    duration: 100,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'rotate3d(0, 0, 1, 45deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(0, 0, 1, 45deg)' });
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

    test('adds a rotate-out animation to each node (X,Y,Z)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .rotateOut({
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 100,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'rotate3d(1, 1, 1, 45deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(1, 1, 1, 45deg)' });
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

    test('adds a rotate-out animation to each node (inverse)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .rotateOut({
                    inverse: 1,
                    duration: 100,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'rotate3d(0, 1, 0, -45deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(0, 1, 0, -45deg)' });
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

    test('adds a rotate-out animation to each node (linear)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .rotateOut({
                    duration: 100,
                    type: 'linear',
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'rotate3d(0, 1, 0, 45deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(0, 1, 0, 45deg)' });
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

    test('adds a rotate-out animation to each node (ease-in)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .rotateOut({
                    duration: 100,
                    type: 'ease-in',
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.25);
        await expectAnimationProgress(page, '#test4', 0.25);
        await expectStyle(page, '#test2', { transform: 'rotate3d(0, 1, 0, 22.5deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(0, 1, 0, 22.5deg)' });
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

    test('adds a rotate-out animation to each node (ease-out)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .rotateOut({
                    duration: 100,
                    type: 'ease-out',
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.7071067812);
        await expectAnimationProgress(page, '#test4', 0.7071067812);
        await expectStyle(page, '#test2', { transform: 'rotate3d(0, 1, 0, 63.64deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(0, 1, 0, 63.64deg)' });
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

    test('adds a rotate-out animation to each node (infinite)', async ({ page }) => {
        await page.evaluate((_) => {
            $('.animate')
                .rotateOut({
                    duration: 100,
                    type: 'linear',
                    infinite: true,
                    debug: true,
                });
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'rotate3d(0, 1, 0, 45deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(0, 1, 0, 45deg)' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0);
        await expectAnimationProgress(page, '#test4', 0);
        await expectStyle(page, '#test2', { transform: 'rotate3d(0, 1, 0, 0deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(0, 1, 0, 0deg)' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'rotate3d(0, 1, 0, 45deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(0, 1, 0, 45deg)' });
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
                .rotateOut(
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
        await expectStyle(page, '#test2', { transform: 'rotate3d(0, 1, 0, 45deg)' });
        await expectStyle(page, '#test4', { transform: 'rotate3d(0, 1, 0, 45deg)' });
    });

    test('returns the QuerySet', async ({ page }) => {
        expect(await page.evaluate((_) => {
            const query = $('.animate');
            return query === query.rotateOut(
                {
                    debug: true,
                },
            );
        })).toBe(true);
    });
});
