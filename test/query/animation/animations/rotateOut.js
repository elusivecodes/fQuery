import assert from 'node:assert/strict';
import { easeIn, easeInOut, easeOut, getAnimationStyle, linear, testAnimation, testNoAnimation, testNoStyle, waitFor } from './../../../helpers.js';
import { exec, setStyle } from './../../../setup.js';

/**
 * Calculate the rotate out amount.
 * @param {number} progress The animation progress.
 * @param {number} inverse Whether to invert the rotation.
 * @return {number} The rotate out amount.
 */
const rotateOut = (progress, inverse) => {
    const amount = ((progress * 90) * inverse).toFixed(2);
    return parseFloat(amount);
};

/**
 * Test the rotate out.
 * @param {string} selector The selector.
 * @param {number} [x=0] The amount to rotate on the X-axis.
 * @param {number} [y=1] The amount to rotate on the Y-axis.
 * @param {number} [z=0] The amount to rotate on the Z-axis.
 * @param {number} inverse Whether to invert the rotation.
 */
const testRotateOut = async (selector, x = 0, y = 1, z = 0, inverse = 1) => {
    const data = await getAnimationStyle(selector, 'transform');

    const amount = rotateOut(data.progress, inverse);
    assert.strictEqual(data.transform, `rotate3d(${x}, ${y}, ${z}, ${amount}deg)`);
};

describe('QuerySet #rotateOut', function() {
    beforeEach(async function() {
        await setStyle('div { width: 100px; height: 100px; }');
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>';
        });
    });

    it('adds a rotate-out animation to each node', async function() {
        await exec((_) => {
            $('.animate')
                .rotateOut({
                    debug: true,
                });
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut);
            await testAnimation('#test4', easeInOut);
            await testRotateOut('#test2');
            await testRotateOut('#test4');
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

    it('adds a rotate-out animation to each node with duration', async function() {
        await exec((_) => {
            $('.animate')
                .rotateOut({
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
            await testRotateOut('#test2');
            await testRotateOut('#test4');
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

    it('adds a rotate-out animation to each node (X)', async function() {
        await exec((_) => {
            $('.animate')
                .rotateOut({
                    x: 1,
                    y: 0,
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
            await testRotateOut('#test2', 1, 0);
            await testRotateOut('#test4', 1, 0);
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

    it('adds a rotate-out animation to each node (Y)', async function() {
        await exec((_) => {
            $('.animate')
                .rotateOut({
                    x: 0,
                    y: 1,
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
            await testRotateOut('#test2');
            await testRotateOut('#test4');
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

    it('adds a rotate-out animation to each node (Y)', async function() {
        await exec((_) => {
            $('.animate')
                .rotateOut({
                    y: 1,
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
            await testRotateOut('#test2');
            await testRotateOut('#test4');
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

    it('adds a rotate-out animation to each node (Z)', async function() {
        await exec((_) => {
            $('.animate')
                .rotateOut({
                    y: 0,
                    z: 1,
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
            await testRotateOut('#test2', 0, 0, 1);
            await testRotateOut('#test4', 0, 0, 1);
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

    it('adds a rotate-out animation to each node (X,Y,Z)', async function() {
        await exec((_) => {
            $('.animate')
                .rotateOut({
                    x: 1,
                    y: 1,
                    z: 1,
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
            await testRotateOut('#test2', 1, 1, 1);
            await testRotateOut('#test4', 1, 1, 1);
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

    it('adds a rotate-out animation to each node (inverse)', async function() {
        await exec((_) => {
            $('.animate')
                .rotateOut({
                    inverse: 1,
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
            await testRotateOut('#test2', 0, 1, 0, -1);
            await testRotateOut('#test4', 0, 1, 0, -1);
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

    it('adds a rotate-out animation to each node (linear)', async function() {
        await exec((_) => {
            $('.animate')
                .rotateOut({
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
            await testRotateOut('#test2');
            await testRotateOut('#test4');
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

    it('adds a rotate-out animation to each node (ease-in)', async function() {
        await exec((_) => {
            $('.animate')
                .rotateOut({
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
            await testRotateOut('#test2');
            await testRotateOut('#test4');
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

    it('adds a rotate-out animation to each node (ease-out)', async function() {
        await exec((_) => {
            $('.animate')
                .rotateOut({
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
            await testRotateOut('#test2');
            await testRotateOut('#test4');
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

    it('adds a rotate-out animation to each node (infinite)', async function() {
        await exec((_) => {
            $('.animate')
                .rotateOut({
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
            await testRotateOut('#test2');
            await testRotateOut('#test4');
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testRotateOut('#test2');
            await testRotateOut('#test4');
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testRotateOut('#test2');
            await testRotateOut('#test4');
        });
    });

    it('adds the animation to the queue', async function() {
        await exec((_) => {
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
        }).then(waitFor(50)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>',
            );
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testRotateOut('#test2');
            await testRotateOut('#test4');
        });
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('.animate');
                return query === query.rotateOut(
                    {
                        debug: true,
                    },
                );
            }),
            true,
        );
    });
});
