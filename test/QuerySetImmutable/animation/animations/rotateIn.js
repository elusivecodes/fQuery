const assert = require('assert');
const { exec, setStyle } = require('../../../setup');
const { easeIn, easeInOut, easeOut, getAnimationStyle, linear, testAnimation, testNoAnimation, testNoStyle, waitFor } = require('../../../helpers');

const rotateIn = (progress, inverse) => {
    const amount = ((90 - (progress * 90)) * inverse).toFixed(2);
    return parseFloat(amount);
};

const testRotateIn = async (selector, x = 0, y = 1, z = 0, inverse = 1) => {
    const data = await getAnimationStyle(selector, 'transform');

    const amount = rotateIn(data.progress, inverse);
    assert.strictEqual(data.transform, `rotate3d(${x}, ${y}, ${z}, ${amount}deg)`);
};

describe('QuerySetImmutable #rotateIn', function() {

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

    it('adds a rotate-in animation to each node', async function() {
        await exec(_ => {
            dom.query('.animate')
                .rotateIn({
                    debug: true
                });
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut);
            await testAnimation('#test4', easeInOut);
            await testRotateIn('#test2');
            await testRotateIn('#test4');
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

    it('adds a rotate-in animation to each node with duration', async function() {
        await exec(_ => {
            dom.query('.animate')
                .rotateIn({
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
            await testRotateIn('#test2');
            await testRotateIn('#test4');
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

    it('adds a rotate-in animation to each node (X)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .rotateIn({
                    x: 1,
                    y: 0,
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
            await testRotateIn('#test2', 1, 0);
            await testRotateIn('#test4', 1, 0);
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

    it('adds a rotate-in animation to each node (Y)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .rotateIn({
                    y: 1,
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
            await testRotateIn('#test2');
            await testRotateIn('#test4');
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

    it('adds a rotate-in animation to each node (Z)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .rotateIn({
                    y: 0,
                    z: 1,
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
            await testRotateIn('#test2', 0, 0, 1);
            await testRotateIn('#test4', 0, 0, 1);
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

    it('adds a rotate-in animation to each node (X,Y,Z)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .rotateIn({
                    x: 1,
                    y: 1,
                    z: 1,
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
            await testRotateIn('#test2', 1, 1, 1);
            await testRotateIn('#test4', 1, 1, 1);
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

    it('adds a rotate-in animation to each node (inverse)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .rotateIn({
                    inverse: 1,
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
            await testRotateIn('#test2', 0, 1, 0, -1);
            await testRotateIn('#test4', 0, 1, 0, -1);
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

    it('adds a rotate-in animation to each node (linear)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .rotateIn({
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
            await testRotateIn('#test2');
            await testRotateIn('#test4');
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

    it('adds a rotate-in animation to each node (ease-in)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .rotateIn({
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
            await testRotateIn('#test2');
            await testRotateIn('#test4');
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

    it('adds a rotate-in animation to each node (ease-out)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .rotateIn({
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
            await testRotateIn('#test2');
            await testRotateIn('#test4');
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

    it('adds a rotate-in animation to each node (infinite)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .rotateIn({
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
            await testRotateIn('#test2');
            await testRotateIn('#test4');
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testRotateIn('#test2');
            await testRotateIn('#test4');
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testRotateIn('#test2');
            await testRotateIn('#test4');
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
                .rotateIn(
                    {
                        duration: 100,
                        debug: true
                    }
                );
        }).then(waitFor(50)).then(async _ => {
            assert.strictEqual(
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
            await testRotateIn('#test2');
            await testRotateIn('#test4');
        });
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.query('.animate');
                return query === query.rotateIn(
                    {
                        debug: true
                    }
                );
            }),
            true
        );
    });

});