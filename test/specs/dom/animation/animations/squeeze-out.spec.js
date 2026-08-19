import { expect, test } from '@playwright/test';
import { resetPage } from '../../../../setup/browser.js';
import { expectAnimationData, expectSqueezeOutData, expectSqueezeOutPair, expectAnimation, expectNoAnimation, expectNoStyle, expectSqueezeOut } from '../../../../support/assertions/animation.js';
import { easeIn, easeInOut, easeOut, getActiveAnimationData, linear, waitForActiveAnimationStyles } from '../../../../support/utils/animation.js';

test.beforeEach(async ({ page }) => {
    await resetPage(page);
});

test.describe('#squeezeOut', () => {
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
            $.squeezeOut('.animate', {
                debug: true,
            });
        });
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        const test2Data = await getActiveAnimationData(page, '#test2', 'height', 'transform');
        const test4Data = await getActiveAnimationData(page, '#test4', 'height', 'transform');
        expectAnimationData(test2Data, easeInOut);
        expectAnimationData(test4Data, easeInOut);
        expectSqueezeOutData(test2Data);
        expectSqueezeOutData(test4Data);
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

    test('adds a squeeze-out animation to each node with duration', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
                duration: 100,
                debug: true,
            });
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        const test2Data = await getActiveAnimationData(page, '#test2', 'height', 'transform');
        const test4Data = await getActiveAnimationData(page, '#test4', 'height', 'transform');
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
        expectSqueezeOutData(test2Data);
        expectSqueezeOutData(test4Data);
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

    test('adds a squeeze-out animation to each node (top)', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
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
        const test2Data = await getActiveAnimationData(page, '#test2', 'height', 'transform');
        const test4Data = await getActiveAnimationData(page, '#test4', 'height', 'transform');
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
        expectSqueezeOutData(test2Data, 'height', 'Y');
        expectSqueezeOutData(test4Data, 'height', 'Y');
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

    test('adds a squeeze-out animation to each node (right)', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
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
        const test2Data = await getActiveAnimationData(page, '#test2', 'width', 'transform');
        const test4Data = await getActiveAnimationData(page, '#test4', 'width', 'transform');
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
        expectSqueezeOutData(test2Data, 'width');
        expectSqueezeOutData(test4Data, 'width');
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

    test('adds a squeeze-out animation to each node (bottom)', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
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
        const test2Data = await getActiveAnimationData(page, '#test2', 'height', 'transform');
        const test4Data = await getActiveAnimationData(page, '#test4', 'height', 'transform');
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
        expectSqueezeOutData(test2Data);
        expectSqueezeOutData(test4Data);
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

    test('adds a squeeze-out animation to each node (left)', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
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
        const test2Data = await getActiveAnimationData(page, '#test2', 'width', 'transform');
        const test4Data = await getActiveAnimationData(page, '#test4', 'width', 'transform');
        expectAnimationData(test2Data, easeInOut, 100);
        expectAnimationData(test4Data, easeInOut, 100);
        expectSqueezeOutData(test2Data, 'width', 'X');
        expectSqueezeOutData(test4Data, 'width', 'X');
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

    test('adds a squeeze-out animation to each node (direction callback)', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
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
        await expectSqueezeOutPair(page, easeInOut, {
            duration: 100,
        });
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

    test('adds a squeeze-out animation to each node without gpu', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
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
        await expectSqueezeOutPair(page, easeInOut, {
            duration: 100,
        });
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

    test('adds a squeeze-out animation to each node without gpu (top)', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
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
        await expectSqueezeOutPair(page, easeInOut, {
            duration: 100,
            translate: null,
            translateStyle: 'marginTop',
        });
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

    test('adds a squeeze-out animation to each node without gpu (right)', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
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
        await expectSqueezeOutPair(page, easeInOut, {
            duration: 100,
            style: 'width',
            translateStyle: 'marginLeft',
        });
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

    test('adds a squeeze-out animation to each node without gpu (bottom)', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
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
        await expectSqueezeOutPair(page, easeInOut, {
            duration: 100,
            translateStyle: 'marginTop',
        });
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

    test('adds a squeeze-out animation to each node without gpu (left)', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
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
        await expectSqueezeOutPair(page, easeInOut, {
            duration: 100,
            style: 'width',
            translate: null,
            translateStyle: 'marginLeft',
        });
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

    test('adds a squeeze-out animation to each node (linear)', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
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
        await expectSqueezeOutPair(page, linear, {
            duration: 100,
        });
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

    test('adds a squeeze-out animation to each node (ease-in)', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
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
        await expectSqueezeOutPair(page, easeIn, {
            duration: 100,
        });
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

    test('adds a squeeze-out animation to each node (ease-out)', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
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
        await expectSqueezeOutPair(page, easeOut, {
            duration: 100,
        });
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

    test('adds a squeeze-out animation to each node (infinite)', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut('.animate', {
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
        await expectSqueezeOutPair(page, linear, {
            duration: 100,
            infinite: true,
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectSqueezeOutPair(page, linear, {
            duration: 100,
            infinite: true,
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectSqueezeOutPair(page, linear, {
            duration: 100,
            infinite: true,
        });
    });

    test('can be stopped', async ({ page }) => {
        await page.evaluate(async (_) => {
            const animation = $.squeezeOut('.animate', {
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
        await page.evaluate(async (_) => {
            const animation = $.squeezeOut('.animate', {
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
            await expectSqueezeOut(page, '#test2');
            await expectSqueezeOut(page, '#test4');
        });
        await page.waitForTimeout(100);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSqueezeOut(page, '#test2');
        await expectSqueezeOut(page, '#test4');
    });

    test('resolves when the animation is stopped', async ({ page }) => {
        await page.evaluate(async (_) => {
            const animation = $.squeezeOut('.animate', {
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
        expect(await page.evaluate(async (_) => {
            try {
                const animation = $.squeezeOut('.animate', {
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
        await page.evaluate(async (_) => {
            const animation = $.squeezeOut('.animate', {
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
        await page.evaluate(async (_) => {
            await $.squeezeOut('.animate', {
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

    test('throws when all animation are stopped (without finishing)', async ({ page }) => {
        expect(await page.evaluate(async (_) => {
            try {
                const animation = $.squeezeOut('.animate', {
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
            $.squeezeOut(
                document.getElementById('test2'),
                {
                    duration: 100,
                    debug: true,
                },
            );
        });
        await page.waitForTimeout(50);
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoAnimation(page, '#test4');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectNoStyle(page, '#test4');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectSqueezeOut(page, '#test2');
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

    test('works with NodeList nodes', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut(
                document.querySelectorAll('.animate'),
                {
                    duration: 100,
                    debug: true,
                },
            );
        });
        await waitForActiveAnimationStyles(page, [
            '#test2',
            '#test4',
        ], 'height');
        await expectNoAnimation(page, '#test1');
        await expectNoAnimation(page, '#test3');
        await expectNoStyle(page, '#test1');
        await expectNoStyle(page, '#test3');
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSqueezeOut(page, '#test2');
        await expectSqueezeOut(page, '#test4');
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

    test('works with HTMLCollection nodes', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut(
                document.body.children,
                {
                    duration: 100,
                    debug: true,
                },
            );
        });
        await waitForActiveAnimationStyles(page, [
            '#test1',
            '#test2',
            '#test3',
            '#test4',
        ], 'height');
        await expectAnimation(page, '#test1', easeInOut, 100);
        await expectAnimation(page, '#test2', easeInOut, 100);
        await expectAnimation(page, '#test3', easeInOut, 100);
        await expectAnimation(page, '#test4', easeInOut, 100);
        await expectSqueezeOut(page, '#test1');
        await expectSqueezeOut(page, '#test2');
        await expectSqueezeOut(page, '#test3');
        await expectSqueezeOut(page, '#test4');
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

    test('works with array nodes', async ({ page }) => {
        await page.evaluate((_) => {
            $.squeezeOut([
                document.getElementById('test2'),
                document.getElementById('test4'),
            ], {
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
        await expectSqueezeOut(page, '#test2');
        await expectSqueezeOut(page, '#test4');
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
});
