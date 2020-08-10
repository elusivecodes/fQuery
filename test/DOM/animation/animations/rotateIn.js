const assert = require('assert').strict;
const { exec, setStyle } = require('../../../setup');
const { easeIn, easeInOut, easeOut, getAnimationStyle, linear, testAnimation, testNoAnimation, testNoStyle, waitFor } = require('../../../helpers');

const rotateIn = (progress, inverse) => {
    const amount = ((90 - (progress * 90)) * inverse).toFixed(2);
    return parseFloat(amount);
};

const testRotateIn = async (selector, x = 0, y = 1, z = 0, inverse = 1) => {
    const data = await getAnimationStyle(selector, 'transform');

    const amount = rotateIn(data.progress, inverse);
    assert.equal(
        data.transform,
        `rotate3d(${x}, ${y}, ${z}, ${amount}deg)`
    );
};

describe('#rotateIn', function() {

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
            dom.rotateIn(
                '.animate',
                {
                    debug: true
                }
            );
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
            dom.rotateIn(
                '.animate',
                {
                    duration: 100,
                    debug: true
                }
            );
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
            dom.rotateIn(
                '.animate',
                {
                    x: 1,
                    y: 0,
                    duration: 100,
                    debug: true
                }
            );
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
            dom.rotateIn(
                '.animate',
                {
                    y: 1,
                    duration: 100,
                    debug: true
                }
            );
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
            dom.rotateIn(
                '.animate',
                {
                    y: 0,
                    z: 1,
                    duration: 100,
                    debug: true
                }
            );
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
            dom.rotateIn(
                '.animate',
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 100,
                    debug: true
                }
            );
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
            dom.rotateIn(
                '.animate',
                {
                    inverse: 1,
                    duration: 100,
                    debug: true
                }
            );
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
            dom.rotateIn(
                '.animate',
                {
                    duration: 100,
                    type: 'linear',
                    debug: true
                }
            );
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
            dom.rotateIn(
                '.animate',
                {
                    duration: 100,
                    type: 'ease-in',
                    debug: true
                }
            );
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
            dom.rotateIn(
                '.animate',
                {
                    duration: 100,
                    type: 'ease-out',
                    debug: true
                }
            );
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
            dom.rotateIn(
                '.animate',
                {
                    duration: 100,
                    type: 'linear',
                    infinite: true,
                    debug: true
                }
            );
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

    it('resolves when the animation is completed', async function() {
        await exec(async _ => {
            await dom.rotateIn(
                '.animate',
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(async _ => {
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

    it('throws when the animation is stopped', async function() {
        assert.equal(
            await exec(async _ => {
                try {
                    const animation = dom.rotateIn(
                        '.animate',
                        {
                            duration: 1000,
                            debug: true
                        }
                    );
                    dom.stop('.animate', false);
                    await animation;
                    return false;
                } catch (e) {
                    return true;
                }
            }),
            true
        );
    });

    it('works with HTMLElement nodes', async function() {
        await exec(_ => {
            dom.rotateIn(
                document.getElementById('test2'),
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testNoStyle('#test4');
            await testAnimation('#test2', easeInOut, 100);
            await testRotateIn('#test2');
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

    it('works with NodeList nodes', async function() {
        await exec(_ => {
            dom.rotateIn(
                document.querySelectorAll('.animate'),
                {
                    duration: 100,
                    debug: true
                }
            );
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

    it('works with HTMLCollection nodes', async function() {
        await exec(_ => {
            dom.rotateIn(
                document.body.children,
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await testAnimation('#test1', easeInOut, 100);
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test3', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testRotateIn('#test1');
            await testRotateIn('#test2');
            await testRotateIn('#test3');
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

    it('works with array nodes', async function() {
        await exec(_ => {
            dom.rotateIn(
                [
                    document.getElementById('test2'),
                    document.getElementById('test4')
                ],
                {
                    duration: 100,
                    debug: true
                }
            );
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

});