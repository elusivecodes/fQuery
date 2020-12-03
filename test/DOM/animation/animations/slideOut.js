const assert = require('assert');
const { exec, setStyle } = require('../../../setup');
const { easeIn, easeInOut, easeOut, getAnimationStyle, linear, testAnimation, testNoAnimation, testNoStyle, waitFor } = require('../../../helpers');

const slideOut = (progress, inverse) => {
    const amount = (100 * progress * inverse).toFixed(2);
    return parseFloat(amount);
};

const testSlideOut = async (selector, translate = 'Y', inverse = 1, style = 'transform') => {
    const data = await getAnimationStyle(selector, style);

    const amount = slideOut(data.progress, inverse);
    assert.strictEqual(
        data[style],
        translate ?
            `translate${translate}(${amount}px)` :
            `${amount}px`
    );
};

describe('#slideOut', function() {

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

    it('adds a slide-out animation to each node', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
                debug: true
            });
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut);
            await testAnimation('#test4', easeInOut);
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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

    it('adds a slide-out animation to each node with duration', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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

    it('adds a slide-out animation to each node (top)', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
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
            await testSlideOut('#test2', 'Y', -1);
            await testSlideOut('#test4', 'Y', -1);
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

    it('adds a slide-out animation to each node (right)', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
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
            await testSlideOut('#test2', 'X');
            await testSlideOut('#test4', 'X');
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

    it('adds a slide-out animation to each node (bottom)', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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

    it('adds a slide-out animation to each node (left)', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
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
            await testSlideOut('#test2', 'X', -1);
            await testSlideOut('#test4', 'X', -1);
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

    it('adds a slide-out animation to each node (direction callback)', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
                direction: _ => 'top',
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
            await testSlideOut('#test2', 'Y', -1);
            await testSlideOut('#test4', 'Y', -1);
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

    it('adds a slide-out animation to each node without gpu', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
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
            await testSlideOut('#test2', null, 1, 'marginTop');
            await testSlideOut('#test4', null, 1, 'marginTop');
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

    it('adds a slide-out animation to each node without gpu (top)', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
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
            await testSlideOut('#test2', null, -1, 'marginTop');
            await testSlideOut('#test4', null, -1, 'marginTop');
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

    it('adds a slide-out animation to each node without gpu (right)', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
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
            await testSlideOut('#test2', null, 1, 'marginLeft');
            await testSlideOut('#test4', null, 1, 'marginLeft');
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

    it('adds a slide-out animation to each node without gpu (bottom)', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
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
            await testSlideOut('#test2', null, 1, 'marginTop');
            await testSlideOut('#test4', null, 1, 'marginTop');
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

    it('adds a slide-out animation to each node without gpu (left)', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
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
            await testSlideOut('#test2', null, -1, 'marginLeft');
            await testSlideOut('#test4', null, -1, 'marginLeft');
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

    it('adds a slide-out animation to each node (linear)', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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

    it('adds a slide-out animation to each node (ease-in)', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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

    it('adds a slide-out animation to each node (ease-out)', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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

    it('adds a slide-out animation to each node (infinite)', async function() {
        await exec(_ => {
            dom.slideOut('.animate', {
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testSlideOut('#test2');
            await testSlideOut('#test4');
        }).then(waitFor(50)).then(async _ => {
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

    it('can be stopped', async function() {
        await exec(async _ => {
            const animation = dom.slideOut('.animate', {
                duration: 100,
                debug: true
            });
            await new Promise(resolve => {
                setTimeout(
                    _ => {
                        animation.stop();
                        resolve();
                    },
                    50
                );
            });
        }).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('can be stopped (without finishing)', async function() {
        await exec(async _ => {
            const animation = dom.slideOut('.animate', {
                duration: 100,
                debug: true
            });
            await new Promise(resolve => {
                setTimeout(
                    _ => {
                        animation.stop(false);
                        resolve();
                    },
                    50
                );
            });
        }).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
            await testSlideOut('#test2');
            await testSlideOut('#test4');
        }).then(waitFor(100)).then(async _ => {
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

    it('resolves when the animation is stopped', async function() {
        await exec(async _ => {
            const animation = dom.slideOut('.animate', {
                duration: 100,
                debug: true
            });
            dom.stop();
            await animation;
        }).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('throws when the animation is stopped (without finishing)', async function() {
        assert.strictEqual(
            await exec(async _ => {
                try {
                    const animation = dom.slideOut('.animate', {
                        duration: 100,
                        debug: true
                    });
                    animation.stop(false);
                    await animation;
                    return false;
                } catch (e) {
                    return true;
                }
            }),
            true
        );
    });

    it('does not stop all animations', async function() {
        await exec(async _ => {
            const animation = dom.slideOut('.animate', {
                duration: 100
            });
            dom.animate(
                '.animate',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
            await new Promise(resolve => {
                setTimeout(
                    _ => {
                        animation.stop();
                        resolve();
                    },
                    50
                );
            });
        }).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
        });
    });

    it('resolves when the animation is completed', async function() {
        await exec(async _ => {
            await dom.slideOut('.animate', {
                duration: 100,
                debug: true
            });
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

    it('throws when all animations are stopped (without finishing)', async function() {
        assert.strictEqual(
            await exec(async _ => {
                try {
                    const animation = dom.slideOut('.animate', {
                        duration: 1000,
                        debug: true
                    });
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
            dom.slideOut(
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
            await testSlideOut('#test2');
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
            dom.slideOut(
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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
            dom.slideOut(
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
            await testSlideOut('#test1');
            await testSlideOut('#test2');
            await testSlideOut('#test3');
            await testSlideOut('#test4');
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
            dom.slideOut([
                document.getElementById('test2'),
                document.getElementById('test4')
            ], {
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
            await testSlideOut('#test2');
            await testSlideOut('#test4');
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