const assert = require('assert').strict;
const { exec, setStyle } = require('../../../setup');
const { easeIn, easeInOut, easeOut, getAnimationStyle, linear, testAnimation, testNoAnimation, testNoStyle, waitFor } = require('../../../helpers');

const squeezeOut = progress => {
    const amount = (100 - (100 * progress)).toFixed(2);
    return parseFloat(amount);
};

const squeezeOutOffset = amount => {
    const offsetAmount = (100 - amount).toFixed(2);
    return parseFloat(offsetAmount);
};

const testSqueezeOut = async (selector, style = 'height', translate = false, translateStyle = 'transform') => {
    const data = await getAnimationStyle(selector, style, translateStyle);

    const amount = squeezeOut(data.progress);
    assert.equal(data[style], `${amount}px`);

    if (translate === false) {
        assert.equal(data[translateStyle], '');
    } else {
        const translateAmount = squeezeOutOffset(amount);
        assert.equal(
            data[translateStyle],
            translate ?
                `translate${translate}(${translateAmount}px)` :
                `${translateAmount}px`
        );
    }
};

describe('QuerySetImmutable #squeezeOut', function() {

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

    it('adds a squeeze-out animation to each node', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
                    debug: true
                });
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut);
            await testAnimation('#test4', easeInOut);
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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

    it('adds a squeeze-out animation to each node with duration', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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

    it('adds a squeeze-out animation to each node (top)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2', 'height', 'Y');
            await testSqueezeOut('#test4', 'height', 'Y');
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

    it('adds a squeeze-out animation to each node (right)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2', 'width');
            await testSqueezeOut('#test4', 'width');
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

    it('adds a squeeze-out animation to each node (bottom)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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

    it('adds a squeeze-out animation to each node (left)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2', 'width', 'X');
            await testSqueezeOut('#test4', 'width', 'X');
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

    it('adds a squeeze-out animation to each node (direction callback)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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

    it('adds a squeeze-out animation to each node without gpu', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2', 'height');
            await testSqueezeOut('#test4', 'height');
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

    it('adds a squeeze-out animation to each node without gpu (top)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2', 'height', null, 'marginTop');
            await testSqueezeOut('#test4', 'height', null, 'marginTop');
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

    it('adds a squeeze-out animation to each node without gpu (right)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2', 'width', false, 'marginLeft');
            await testSqueezeOut('#test4', 'width', false, 'marginLeft');
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

    it('adds a squeeze-out animation to each node without gpu (bottom)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2', 'height', false, 'marginTop');
            await testSqueezeOut('#test4', 'height', false, 'marginTop');
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

    it('adds a squeeze-out animation to each node without gpu (left)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2', 'width', null, 'marginLeft');
            await testSqueezeOut('#test4', 'width', null, 'marginLeft');
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

    it('adds a squeeze-out animation to each node (linear)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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

    it('adds a squeeze-out animation to each node (ease-in)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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

    it('adds a squeeze-out animation to each node (ease-out)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
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

    it('adds a squeeze-out animation to each node (infinite)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .squeezeOut({
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
        }).then(waitFor(50)).then(async _ => {
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
        await exec(_ => {
            dom.query('.animate')
                .queue(_ =>
                    new Promise(resolve =>
                        setTimeout(resolve, 100)
                    )
                );
            dom.query('.animate')
                .squeezeOut(
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
            await testSqueezeOut('#test2');
            await testSqueezeOut('#test4');
        });
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('.animate');
                return query === query.squeezeOut(
                    {
                        debug: true
                    }
                );
            }),
            true
        );
    });

});