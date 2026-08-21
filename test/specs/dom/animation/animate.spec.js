import { expect, test } from '@playwright/test';
import { advanceClock, resetPage, setupClock } from '../../../setup/browser.js';
import { expectAnimationProgress, expectNoAnimation } from '../../../support/assertions/animation.js';

test.beforeEach(async ({ page }) => {
    await setupClock(page);
    await resetPage(page);
});

test.describe('#animate', () => {
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
            $.animate(
                '.animate',
                (_) => { },
                {
                    debug: true,
                },
            );
        });
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await advanceClock(page, 150);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('adds an animation to each node with duration', async ({ page }) => {
        await page.evaluate((_) => {
            $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('adds an animation to each node (linear)', async ({ page }) => {
        await page.evaluate((_) => {
            $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    type: 'linear',
                    debug: true,
                },
            );
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('adds an animation to each node (ease-in)', async ({ page }) => {
        await page.evaluate((_) => {
            $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    type: 'ease-in',
                    debug: true,
                },
            );
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.25);
        await expectAnimationProgress(page, '#test4', 0.25);
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('adds an animation to each node (ease-out)', async ({ page }) => {
        await page.evaluate((_) => {
            $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    type: 'ease-out',
                    debug: true,
                },
            );
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.7071067812);
        await expectAnimationProgress(page, '#test4', 0.7071067812);
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('adds an animation to each node (infinite)', async ({ page }) => {
        await page.evaluate((_) => {
            $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    type: 'linear',
                    infinite: true,
                    debug: true,
                },
            );
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0);
        await expectAnimationProgress(page, '#test4', 0);
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
    });

    test('can be stopped', async ({ page }) => {
        const animationHandle = await page.evaluateHandle((_) => {
            const animation = $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );

            return { animation };
        });
        await advanceClock(page, 50);
        await animationHandle.evaluate(({ animation }) => {
            animation.stop();
        });
        await animationHandle.dispose();
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('can be stopped (without finishing)', async ({ page }) => {
        const animationHandle = await page.evaluateHandle((_) => {
            const animation = $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );

            animation.catch((_) => { });

            return { animation };
        });
        await advanceClock(page, 50);
        await animationHandle.evaluate(({ animation }) => {
            animation.stop({ finish: false });
        });
        await animationHandle.dispose();
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
    });

    test('resolves when the animation is stopped', async ({ page }) => {
        await page.evaluate(async (_) => {
            const animation = $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
            animation.stop();
            await animation;
        });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('throws when the animation is stopped (without finishing)', async ({ page }) => {
        expect(await page.evaluate(async (_) => {
            try {
                const animation = $.animate(
                    '.animate',
                    (_) => { },
                    {
                        duration: 1000,
                        debug: true,
                    },
                );
                animation.stop({ finish: false });
                await animation;
                return false;
            } catch {
                return true;
            }
        })).toBe(true);
    });

    test('does not stop all animations', async ({ page }) => {
        const animationHandle = await page.evaluateHandle((_) => {
            const animation = $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                },
            );
            $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );

            return { animation };
        });
        await advanceClock(page, 50);
        await animationHandle.evaluate(({ animation }) => {
            animation.stop();
        });
        await animationHandle.dispose();
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
    });

    test('resolves when the animation is completed', async ({ page }) => {
        const animationHandle = await page.evaluateHandle((_) => ({
            animation: $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            ),
        }));
        await advanceClock(page, 100);
        await animationHandle.evaluate(async ({ animation }) => {
            await animation;
        });
        await animationHandle.dispose();
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('throws when all animations are stopped (without finishing)', async ({ page }) => {
        expect(await page.evaluate(async (_) => {
            try {
                const animation = $.animate(
                    '.animate',
                    (_) => { },
                    {
                        duration: 1000,
                        debug: true,
                    },
                );
                $.stop('.animate', { finish: false });
                await animation;
                return false;
            } catch {
                return true;
            }
        })).toBe(true);
    });

    test('works with HTMLElement nodes', async ({ page }) => {
        await page.evaluate((_) => {
            $.animate(
                document.getElementById('test2'),
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectAnimationProgress(page, '#test2', 0.5);
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('works with NodeList nodes', async ({ page }) => {
        await page.evaluate((_) => {
            $.animate(
                document.querySelectorAll('.animate'),
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('works with HTMLCollection nodes', async ({ page }) => {
        await page.evaluate((_) => {
            $.animate(
                document.body.children,
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        });
        await advanceClock(page, 50);
        await expectAnimationProgress(page, '#test1', 0.5);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test3', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });

    test('works with array nodes', async ({ page }) => {
        await page.evaluate((_) => {
            $.animate(
                [
                    document.getElementById('test2'),
                    document.getElementById('test4'),
                ],
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test2');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
    });
});
