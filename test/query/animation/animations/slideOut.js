import assert from 'node:assert/strict';
import { easeIn, easeInOut, easeOut, getAnimationStyle, linear, testAnimation, testNoAnimation, testNoStyle, waitFor } from './../../../helpers.js';
import { exec, setStyle } from './../../../setup.js';

/**
 * Calculate the slide out amount.
 * @param {number} progress The animation progress.
 * @param {number} inverse Whether to invert the slide.
 * @return {number} The slide out amount.
 */
const slideOut = (progress, inverse) => {
    const amount = (100 * progress * inverse).toFixed(2);
    return parseFloat(amount);
};

/**
 * Test the slide out.
 * @param {string} selector The selector.
 * @param {string} [translate=Y] The translation axis.
 * @param {number} [inverse=1] Whether to invert the slide.
 * @param {string} [style=transform] The style attribute.
 */
const testSlideOut = async (selector, translate = 'Y', inverse = 1, style = 'transform') => {
    const data = await getAnimationStyle(selector, style);

    const amount = slideOut(data.progress, inverse);
    assert.strictEqual(
        data[style],
        translate ?
            `translate${translate}(${amount}px)` :
            `${amount}px`,
    );
};

describe('QuerySet #slideOut', function() {
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

    it('adds a slide-out animation to each node', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
                    debug: true,
                });
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut);
            await testAnimation('#test4', easeInOut);
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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

    it('adds a slide-out animation to each node with duration', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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

    it('adds a slide-out animation to each node (top)', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
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
            await testSlideOut('#test2', 'Y', -1);
            await testSlideOut('#test4', 'Y', -1);
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

    it('adds a slide-out animation to each node (right)', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
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
            await testSlideOut('#test2', 'X');
            await testSlideOut('#test4', 'X');
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

    it('adds a slide-out animation to each node (bottom)', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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

    it('adds a slide-out animation to each node (left)', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
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
            await testSlideOut('#test2', 'X', -1);
            await testSlideOut('#test4', 'X', -1);
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

    it('adds a slide-out animation to each node (direction callback)', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
                    direction: (_) => 'top',
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
            await testSlideOut('#test2', 'Y', -1);
            await testSlideOut('#test4', 'Y', -1);
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

    it('adds a slide-out animation to each node without gpu', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
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
            await testSlideOut('#test2', null, 1, 'marginTop');
            await testSlideOut('#test4', null, 1, 'marginTop');
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

    it('adds a slide-out animation to each node without gpu (top)', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
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
            await testSlideOut('#test2', null, -1, 'marginTop');
            await testSlideOut('#test4', null, -1, 'marginTop');
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

    it('adds a slide-out animation to each node without gpu (right)', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
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
            await testSlideOut('#test2', null, 1, 'marginLeft');
            await testSlideOut('#test4', null, 1, 'marginLeft');
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

    it('adds a slide-out animation to each node without gpu (bottom)', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
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
            await testSlideOut('#test2', null, 1, 'marginTop');
            await testSlideOut('#test4', null, 1, 'marginTop');
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

    it('adds a slide-out animation to each node without gpu (left)', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
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
            await testSlideOut('#test2', null, -1, 'marginLeft');
            await testSlideOut('#test4', null, -1, 'marginLeft');
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

    it('adds a slide-out animation to each node (linear)', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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

    it('adds a slide-out animation to each node (ease-in)', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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

    it('adds a slide-out animation to each node (ease-out)', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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

    it('adds a slide-out animation to each node (infinite)', async function() {
        await exec((_) => {
            $('.animate')
                .slideOut({
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testSlideOut('#test2');
            await testSlideOut('#test4');
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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
                .slideOut(
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
        });
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('.animate');
                return query === query.slideOut(
                    {
                        debug: true,
                    },
                );
            }),
            true,
        );
    });
});
