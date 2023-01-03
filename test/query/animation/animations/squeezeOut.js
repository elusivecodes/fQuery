import assert from 'node:assert/strict';
import { easeIn, easeInOut, easeOut, getAnimationStyle, linear, testAnimation, testNoAnimation, testNoStyle, waitFor } from './../../../helpers.js';
import { exec, setStyle } from './../../../setup.js';

/**
 * Calculate the squeeze out amount.
 * @param {number} progress The animation progress.
 * @return {number} The squeeze out amount.
 */
const squeezeOut = (progress) => {
    const amount = (100 - (100 * progress)).toFixed(2);
    return parseFloat(amount);
};

/**
 * Calculate the squeeze out offset amount.
 * @param {number} amount The squeeze out amount.
 * @return {number} The squeeze out offset amount.
 */
const squeezeOutOffset = (amount) => {
    const offsetAmount = (100 - amount).toFixed(2);
    return parseFloat(offsetAmount);
};

/**
 * Test the squeeze out.
 * @param {string} selector The selector.
 * @param {string} [style=height] The axis style.
 * @param {string|Boolean} [translate] The translation axis.
 * @param {string} [translateStyle=transform] The translation style.
 */
const testSqueezeOut = async (selector, style = 'height', translate = false, translateStyle = 'transform') => {
    const data = await getAnimationStyle(selector, style, translateStyle);

    const amount = squeezeOut(data.progress);
    assert.strictEqual(data[style], `${amount}px`);

    if (translate === false) {
        assert.strictEqual(data[translateStyle], '');
    } else {
        const translateAmount = squeezeOutOffset(amount);
        assert.strictEqual(
            data[translateStyle],
            translate ?
                `translate${translate}(${translateAmount}px)` :
                `${translateAmount}px`,
        );
    }
};

describe('QuerySet #squeezeOut', function() {
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

    it('adds a squeeze-out animation to each node', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
                    debug: true,
                });
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut);
            await testAnimation('#test4', easeInOut);
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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

    it('adds a squeeze-out animation to each node with duration', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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

    it('adds a squeeze-out animation to each node (top)', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'top',
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
            await testSqueezeOut('#test2', 'height', 'Y');
            await testSqueezeOut('#test4', 'height', 'Y');
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

    it('adds a squeeze-out animation to each node (right)', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'right',
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
            await testSqueezeOut('#test2', 'width');
            await testSqueezeOut('#test4', 'width');
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

    it('adds a squeeze-out animation to each node (bottom)', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'bottom',
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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

    it('adds a squeeze-out animation to each node (left)', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'left',
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
            await testSqueezeOut('#test2', 'width', 'X');
            await testSqueezeOut('#test4', 'width', 'X');
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

    it('adds a squeeze-out animation to each node (direction callback)', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
                    direction: (_) => 'bottom',
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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

    it('adds a squeeze-out animation to each node without gpu', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testSqueezeOut('#test2', 'height');
            await testSqueezeOut('#test4', 'height');
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

    it('adds a squeeze-out animation to each node without gpu (top)', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'top',
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testSqueezeOut('#test2', 'height', null, 'marginTop');
            await testSqueezeOut('#test4', 'height', null, 'marginTop');
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

    it('adds a squeeze-out animation to each node without gpu (right)', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'right',
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testSqueezeOut('#test2', 'width', false, 'marginLeft');
            await testSqueezeOut('#test4', 'width', false, 'marginLeft');
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

    it('adds a squeeze-out animation to each node without gpu (bottom)', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'bottom',
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testSqueezeOut('#test2', 'height', false, 'marginTop');
            await testSqueezeOut('#test4', 'height', false, 'marginTop');
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

    it('adds a squeeze-out animation to each node without gpu (left)', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
                    direction: 'left',
                    duration: 100,
                    useGpu: false,
                    debug: true,
                });
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testSqueezeOut('#test2', 'width', null, 'marginLeft');
            await testSqueezeOut('#test4', 'width', null, 'marginLeft');
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

    it('adds a squeeze-out animation to each node (linear)', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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

    it('adds a squeeze-out animation to each node (ease-in)', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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

    it('adds a squeeze-out animation to each node (ease-out)', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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

    it('adds a squeeze-out animation to each node (infinite)', async function() {
        await exec((_) => {
            $('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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
                .squeezeOut(
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
        });
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('.animate');
                return query === query.squeezeOut(
                    {
                        debug: true,
                    },
                );
            }),
            true,
        );
    });
});
