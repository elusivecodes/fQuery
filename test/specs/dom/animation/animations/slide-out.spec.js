import { expect, test } from '@playwright/test';
import { advanceClock, resetPage, resumeClock, setupClock } from '../../../../setup/browser.js';
import { expectAnimation, expectAnimationProgress, expectNoAnimation, expectNoStyle, expectSlideOut, expectStyle } from '../../../../support/assertions/animation.js';
import { easeInOut } from '../../../../support/utils/animation.js';

test.beforeEach(async ({ page }) => {
    await setupClock(page);
    await resetPage(page);
});

test.describe('#slideOut', () => {
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
            $.slideOut('.animate', {
                debug: true,
            });
        });
        await advanceClock(page, 100);
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'translateY(50px)' });
        await expectStyle(page, '#test4', { transform: 'translateY(50px)' });
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
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

    test('adds a slide-out animation to each node with duration', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                duration: 100,
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'translateY(50px)' });
        await expectStyle(page, '#test4', { transform: 'translateY(50px)' });
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

    test('adds a slide-out animation to each node (top)', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                direction: 'top',
                duration: 100,
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'translateY(-50px)' });
        await expectStyle(page, '#test4', { transform: 'translateY(-50px)' });
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

    test('adds a slide-out animation to each node (right)', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                direction: 'right',
                duration: 100,
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'translateX(50px)' });
        await expectStyle(page, '#test4', { transform: 'translateX(50px)' });
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

    test('adds a slide-out animation to each node (bottom)', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                direction: 'bottom',
                duration: 100,
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'translateY(50px)' });
        await expectStyle(page, '#test4', { transform: 'translateY(50px)' });
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

    test('adds a slide-out animation to each node (left)', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                direction: 'left',
                duration: 100,
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'translateX(-50px)' });
        await expectStyle(page, '#test4', { transform: 'translateX(-50px)' });
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

    test('adds a slide-out animation to each node (direction callback)', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                direction: (_) => 'top',
                duration: 100,
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'translateY(-50px)' });
        await expectStyle(page, '#test4', { transform: 'translateY(-50px)' });
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

    test('adds a slide-out animation to each node without gpu', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                duration: 100,
                useGpu: false,
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { marginTop: '50px' });
        await expectStyle(page, '#test4', { marginTop: '50px' });
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

    test('adds a slide-out animation to each node without gpu (top)', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                direction: 'top',
                duration: 100,
                useGpu: false,
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { marginTop: '-50px' });
        await expectStyle(page, '#test4', { marginTop: '-50px' });
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

    test('adds a slide-out animation to each node without gpu (right)', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                direction: 'right',
                duration: 100,
                useGpu: false,
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { marginLeft: '50px' });
        await expectStyle(page, '#test4', { marginLeft: '50px' });
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

    test('adds a slide-out animation to each node without gpu (bottom)', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                direction: 'bottom',
                duration: 100,
                useGpu: false,
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { marginTop: '50px' });
        await expectStyle(page, '#test4', { marginTop: '50px' });
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

    test('adds a slide-out animation to each node without gpu (left)', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                direction: 'left',
                duration: 100,
                useGpu: false,
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { marginLeft: '-50px' });
        await expectStyle(page, '#test4', { marginLeft: '-50px' });
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

    test('adds a slide-out animation to each node (linear)', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                duration: 100,
                type: 'linear',
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'translateY(50px)' });
        await expectStyle(page, '#test4', { transform: 'translateY(50px)' });
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

    test('adds a slide-out animation to each node (ease-in)', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                duration: 100,
                type: 'ease-in',
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.25);
        await expectAnimationProgress(page, '#test4', 0.25);
        await expectStyle(page, '#test2', { transform: 'translateY(25px)' });
        await expectStyle(page, '#test4', { transform: 'translateY(25px)' });
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

    test('adds a slide-out animation to each node (ease-out)', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                duration: 100,
                type: 'ease-out',
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.7071067812);
        await expectAnimationProgress(page, '#test4', 0.7071067812);
        await expectStyle(page, '#test2', { transform: 'translateY(70.71px)' });
        await expectStyle(page, '#test4', { transform: 'translateY(70.71px)' });
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

    test('adds a slide-out animation to each node (infinite)', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut('.animate', {
                duration: 100,
                type: 'linear',
                infinite: true,
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'translateY(50px)' });
        await expectStyle(page, '#test4', { transform: 'translateY(50px)' });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0);
        await expectAnimationProgress(page, '#test4', 0);
        await expectStyle(page, '#test2', { transform: 'translateY(0px)' });
        await expectStyle(page, '#test4', { transform: 'translateY(0px)' });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'translateY(50px)' });
        await expectStyle(page, '#test4', { transform: 'translateY(50px)' });
    });

    test('can be stopped', async ({ page }) => {
        await resumeClock(page);
        await page.evaluate(async (_) => {
            const animation = $.slideOut('.animate', {
                duration: 100,
                debug: true,
            });
            await new Promise((resolve) => {
                setTimeout(
                    (_) => {
                        animation.stop();
                        resolve();
                    },
                    50,
                );
            });
        }).then(async (_) => {
            await expectNoAnimation(page, '#test1');
            await expectNoAnimation(page, '#test2');
            await expectNoAnimation(page, '#test3');
            await expectNoAnimation(page, '#test4');
        });
    });

    test('can be stopped (without finishing)', async ({ page }) => {
        await resumeClock(page);
        await page.evaluate(async (_) => {
            const animation = $.slideOut('.animate', {
                duration: 100,
                debug: true,
            });
            await new Promise((resolve) => {
                setTimeout(
                    (_) => {
                        animation.stop({ finish: false });
                        resolve();
                    },
                    50,
                );
            });
        }).then(async (_) => {
            await expectNoAnimation(page, '#test1');
            await expectNoAnimation(page, '#test3');
            await expectNoStyle(page, '#test1');
            await expectNoStyle(page, '#test3');
            await expectAnimation(page, '#test2', easeInOut, 100);
            await expectAnimation(page, '#test4', easeInOut, 100);
            await expectSlideOut(page, '#test2');
            await expectSlideOut(page, '#test4');
        });
        await advanceClock(page, 100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSlideOut(page, '#test2');
        await expectSlideOut(page, '#test4');
    });

    test('resolves when the animation is stopped', async ({ page }) => {
        await resumeClock(page);
        await page.evaluate(async (_) => {
            const animation = $.slideOut('.animate', {
                duration: 100,
                debug: true,
            });
            $.stop();
            await animation;
        }).then(async (_) => {
            await expectNoAnimation(page, '#test1');
            await expectNoAnimation(page, '#test2');
            await expectNoAnimation(page, '#test3');
            await expectNoAnimation(page, '#test4');
        });
    });

    test('throws when the animation is stopped (without finishing)', async ({ page }) => {
        await resumeClock(page);
        expect(await page.evaluate(async (_) => {
            try {
                const animation = $.slideOut('.animate', {
                    duration: 100,
                    debug: true,
                });
                animation.stop({ finish: false });
                await animation;
                return false;
            } catch {
                return true;
            }
        })).toBe(true);
    });

    test('does not stop all animations', async ({ page }) => {
        await resumeClock(page);
        await page.evaluate(async (_) => {
            const animation = $.slideOut('.animate', {
                duration: 100,
            });
            $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
            await new Promise((resolve) => {
                setTimeout(
                    (_) => {
                        animation.stop();
                        resolve();
                    },
                    50,
                );
            });
        }).then(async (_) => {
            await expectNoAnimation(page, '#test1');
            await expectNoAnimation(page, '#test3');
            await expectAnimation(page, '#test2', easeInOut, 100);
            await expectAnimation(page, '#test4', easeInOut, 100);
        });
    });

    test('resolves when the animation is completed', async ({ page }) => {
        await resumeClock(page);
        await page.evaluate(async (_) => {
            await $.slideOut('.animate', {
                duration: 100,
                debug: true,
            });
        }).then(async (_) => {
            await expectNoAnimation(page, '#test1');
            await expectNoAnimation(page, '#test2');
            await expectNoAnimation(page, '#test3');
            await expectNoAnimation(page, '#test4');
            await expectNoStyle(page, '#test1');
            await expectNoStyle(page, '#test2');
            await expectNoStyle(page, '#test3');
            await expectNoStyle(page, '#test4');
        });
    });

    test('throws when all animations are stopped (without finishing)', async ({ page }) => {
        await resumeClock(page);
        expect(await page.evaluate(async (_) => {
            try {
                const animation = $.slideOut('.animate', {
                    duration: 1000,
                    debug: true,
                });
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
            $.slideOut(
                document.getElementById('test2'),
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
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectStyle(page, '#test2', { transform: 'translateY(50px)' });
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

    test('works with NodeList nodes', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut(
                document.querySelectorAll('.animate'),
                {
                    duration: 100,
                    debug: true,
                },
            );
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'translateY(50px)' });
        await expectStyle(page, '#test4', { transform: 'translateY(50px)' });
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

    test('works with HTMLCollection nodes', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut(
                document.body.children,
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
        await expectStyle(page, '#test1', { transform: 'translateY(50px)' });
        await expectStyle(page, '#test2', { transform: 'translateY(50px)' });
        await expectStyle(page, '#test3', { transform: 'translateY(50px)' });
        await expectStyle(page, '#test4', { transform: 'translateY(50px)' });
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

    test('works with array nodes', async ({ page }) => {
        await page.evaluate((_) => {
            $.slideOut([
                document.getElementById('test2'),
                document.getElementById('test4'),
            ], {
                duration: 100,
                debug: true,
            });
        });
        await advanceClock(page, 50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimationProgress(page, '#test2', 0.5);
        await expectAnimationProgress(page, '#test4', 0.5);
        await expectStyle(page, '#test2', { transform: 'translateY(50px)' });
        await expectStyle(page, '#test4', { transform: 'translateY(50px)' });
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
});
