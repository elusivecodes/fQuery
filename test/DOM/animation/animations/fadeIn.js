import assert from 'node:assert/strict';
import { easeIn, easeInOut, easeOut, getAnimationStyle, linear, testAnimation, testNoAnimation, testNoStyle, waitFor } from './../../../helpers.js';
import { exec } from './../../../setup.js';

/**
 * Calculate the fade in amount.
 * @param {number} progress The animation progress.
 * @return {number} The fade in amount.
 */
function fadeIn(progress) {
    const amount = parseFloat(progress).toFixed(2);
    return parseFloat(amount);
};

/**
 * Test the fade in.
 * @param {string} selector The selector.
 */
async function testFadeIn(selector) {
    const data = await getAnimationStyle(selector, 'opacity');

    const amount = fadeIn(data.progress);
    assert.strictEqual(data.opacity, `${amount}`);
};

describe('#fadeIn', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>';
        });
    });

    it('adds a fade-in animation to each node', async function() {
        await exec((_) => {
            $.fadeIn('.animate', {
                debug: true,
            });
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut);
            await testAnimation('#test4', easeInOut);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        }).then(waitFor(150)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('adds a fade-in animation to each node with duration', async function() {
        await exec((_) => {
            $.fadeIn('.animate', {
                duration: 100,
                debug: true,
            });
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('adds a fade-in animation to each node (linear)', async function() {
        await exec((_) => {
            $.fadeIn('.animate', {
                duration: 100,
                type: 'linear',
                debug: true,
            });
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100);
            await testAnimation('#test4', linear, 100);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('adds a fade-in animation to each node (ease-in)', async function() {
        await exec((_) => {
            $.fadeIn('.animate', {
                duration: 100,
                type: 'ease-in',
                debug: true,
            });
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeIn, 100);
            await testAnimation('#test4', easeIn, 100);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('adds a fade-in animation to each node (ease-out)', async function() {
        await exec((_) => {
            $.fadeIn('.animate', {
                duration: 100,
                type: 'ease-out',
                debug: true,
            });
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeOut, 100);
            await testAnimation('#test4', easeOut, 100);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('adds a fade-in animation to each node (infinite)', async function() {
        await exec((_) => {
            $.fadeIn('.animate', {
                duration: 100,
                type: 'linear',
                infinite: true,
                debug: true,
            });
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        });
    });

    it('can be stopped', async function() {
        await exec(async (_) => {
            const animation = $.fadeIn('.animate', {
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
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('can be stopped (without finishing)', async function() {
        await exec(async (_) => {
            const animation = $.fadeIn('.animate', {
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
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        });
    });

    it('resolves when the animation is stopped', async function() {
        await exec(async (_) => {
            const animation = $.fadeIn('.animate', {
                duration: 100,
                debug: true,
            });
            $.stop();
            await animation;
        }).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('throws when the animation is stopped (without finishing)', async function() {
        assert.strictEqual(
            await exec(async (_) => {
                try {
                    const animation = $.fadeIn('.animate', {
                        duration: 100,
                        debug: true,
                    });
                    animation.stop({ finish: false });
                    await animation;
                    return false;
                } catch (e) {
                    return true;
                }
            }),
            true,
        );
    });

    it('does not stop all animations', async function() {
        await exec(async (_) => {
            const animation = $.fadeIn('.animate', {
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
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
        });
    });

    it('resolves when the animation is completed', async function() {
        await exec(async (_) => {
            await $.fadeIn('.animate', {
                duration: 100,
                debug: true,
            });
        }).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('throws when all animations are stopped (without finishing)', async function() {
        assert.strictEqual(
            await exec(async (_) => {
                try {
                    const animation = $.fadeIn('.animate', {
                        duration: 1000,
                        debug: true,
                    });
                    $.stop('.animate', { finish: false });
                    await animation;
                    return false;
                } catch (e) {
                    return true;
                }
            }),
            true,
        );
    });

    it('works with HTMLElement nodes', async function() {
        await exec((_) => {
            $.fadeIn(
                document.getElementById('test2'),
                {
                    duration: 100,
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
            await testAnimation('#test2', easeInOut, 100);
            await testFadeIn('#test2');
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('works with NodeList nodes', async function() {
        await exec((_) => {
            $.fadeIn(
                document.querySelectorAll('.animate'),
                {
                    duration: 100,
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('works with HTMLCollection nodes', async function() {
        await exec((_) => {
            $.fadeIn(
                document.body.children,
                {
                    duration: 100,
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await testAnimation('#test1', easeInOut, 100);
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test3', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testFadeIn('#test1');
            await testFadeIn('#test2');
            await testFadeIn('#test3');
            await testFadeIn('#test4');
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });

    it('works with array nodes', async function() {
        await exec((_) => {
            $.fadeIn([
                document.getElementById('test2'),
                document.getElementById('test4'),
            ], {
                duration: 100,
                debug: true,
            });
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test2');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
        });
    });
});
