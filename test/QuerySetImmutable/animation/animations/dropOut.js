const assert = require('assert').strict;
const { exec, setStyle } = require('../../../setup');
const { easeIn, easeInOut, easeOut, getAnimationStyle, linear, testAnimation, testNoAnimation, testNoStyle, waitFor } = require('../../../helpers');

const dropOut = (progress, inverse) => {
    const amount = (100 * progress * inverse).toFixed(2);
    return parseFloat(amount);
};

const testDropOut = async (selector, translate = 'Y', inverse = 1, style = 'transform') => {
    const data = await getAnimationStyle(selector, style);

    const amount = dropOut(data.progress, inverse);
    assert.equal(
        data[style],
        translate ?
            `translate${translate}(${amount}px)` :
            `${amount}px`
    );
};

describe('QuerySetImmutable #dropOut', function() {

    beforeEach(async function() {
        await setStyle('div { width: 100px; height: 100px; }');
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>';
        });
    });

    it('adds a drop-out animation to each node', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    debug: true
                });
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut);
            await testAnimation('#test4', easeInOut);
            await testDropOut('#test2', 'Y', -1);
            await testDropOut('#test4', 'Y', -1);
        }).then(waitFor(150)).then(async _ => {
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

    it('adds a drop-out animation to each node with duration', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    duration: 100,
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testDropOut('#test2', 'Y', -1);
            await testDropOut('#test4', 'Y', -1);
        }).then(waitFor(100)).then(async _ => {
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

    it('adds a drop-out animation to each node (top)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    direction: 'top',
                    duration: 100,
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testDropOut('#test2', 'Y', -1);
            await testDropOut('#test4', 'Y', -1);
        }).then(waitFor(100)).then(async _ => {
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

    it('adds a drop-out animation to each node (right)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    direction: 'right',
                    duration: 100,
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testDropOut('#test2', 'X');
            await testDropOut('#test4', 'X');
        }).then(waitFor(100)).then(async _ => {
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

    it('adds a drop-out animation to each node (bottom)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    direction: 'bottom',
                    duration: 100,
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testDropOut('#test2');
            await testDropOut('#test4');
        }).then(waitFor(100)).then(async _ => {
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

    it('adds a drop-out animation to each node (left)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    direction: 'left',
                    duration: 100,
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testDropOut('#test2', 'X', -1);
            await testDropOut('#test4', 'X', -1);
        }).then(waitFor(100)).then(async _ => {
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

    it('adds a drop-out animation to each node (direction callback)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    direction: _ => 'bottom',
                    duration: 100,
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testDropOut('#test2');
            await testDropOut('#test4');
        }).then(waitFor(100)).then(async _ => {
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

    it('adds a drop-out animation to each node without gpu', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    duration: 100,
                    useGpu: false,
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testDropOut('#test2', null, -1, 'marginTop');
            await testDropOut('#test4', null, -1, 'marginTop');
        }).then(waitFor(100)).then(async _ => {
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

    it('adds a drop-out animation to each node without gpu (top)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    direction: 'top',
                    duration: 100,
                    useGpu: false,
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testDropOut('#test2', null, -1, 'marginTop');
            await testDropOut('#test4', null, -1, 'marginTop');
        }).then(waitFor(100)).then(async _ => {
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

    it('adds a drop-out animation to each node without gpu (right)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    direction: 'right',
                    duration: 100,
                    useGpu: false,
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testDropOut('#test2', null, 1, 'marginLeft');
            await testDropOut('#test4', null, 1, 'marginLeft');
        }).then(waitFor(100)).then(async _ => {
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

    it('adds a drop-out animation to each node without gpu (bottom)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    direction: 'bottom',
                    duration: 100,
                    useGpu: false,
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testDropOut('#test2', null, 1, 'marginTop');
            await testDropOut('#test4', null, 1, 'marginTop');
        }).then(waitFor(100)).then(async _ => {
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

    it('adds a drop-out animation to each node without gpu (left)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    direction: 'left',
                    duration: 100,
                    useGpu: false,
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testDropOut('#test2', null, -1, 'marginLeft');
            await testDropOut('#test4', null, -1, 'marginLeft');
        }).then(waitFor(100)).then(async _ => {
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

    it('adds a drop-out animation to each node (linear)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    duration: 100,
                    type: 'linear',
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100);
            await testAnimation('#test4', linear, 100);
            await testDropOut('#test2', 'Y', -1);
            await testDropOut('#test4', 'Y', -1);
        }).then(waitFor(100)).then(async _ => {
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

    it('adds a drop-out animation to each node (ease-in)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    duration: 100,
                    type: 'ease-in',
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeIn, 100);
            await testAnimation('#test4', easeIn, 100);
            await testDropOut('#test2', 'Y', -1);
            await testDropOut('#test4', 'Y', -1);
        }).then(waitFor(100)).then(async _ => {
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

    it('adds a drop-out animation to each node (ease-out)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    duration: 100,
                    type: 'ease-out',
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeOut, 100);
            await testAnimation('#test4', easeOut, 100);
            await testDropOut('#test2', 'Y', -1);
            await testDropOut('#test4', 'Y', -1);
        }).then(waitFor(100)).then(async _ => {
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

    it('adds a drop-out animation to each node (infinite)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .dropOut({
                    duration: 100,
                    type: 'linear',
                    infinite: true,
                    debug: true
                });
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testDropOut('#test2', 'Y', -1);
            await testDropOut('#test4', 'Y', -1);
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testDropOut('#test2', 'Y', -1);
            await testDropOut('#test4', 'Y', -1);
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testDropOut('#test2', 'Y', -1);
            await testDropOut('#test4', 'Y', -1);
        });
    });

    it('adds the animation to the queue', async function() {
        await exec(_ => {
            dom.query('.animate')
                .queue(_ =>
                    new Promise(resolve =>
                        setTimeout(resolve, 100)
                    )
                );
            dom.query('.animate')
                .dropOut(
                    {
                        duration: 100,
                        debug: true
                    }
                );
        }).then(waitFor(50)).then(async _ => {
            assert.equal(
                await exec(_ => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>'
            );
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testDropOut('#test2', 'Y', -1);
            await testDropOut('#test4', 'Y', -1);
        });
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('.animate');
                return query === query.dropOut(
                    {
                        debug: true
                    }
                );
            }),
            true
        );
    });

});