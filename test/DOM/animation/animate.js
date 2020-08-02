const assert = require('assert').strict;
const { exec } = require('../../setup');
const { easeIn, easeInOut, easeOut, linear, testAnimation, testNoAnimation, waitFor } = require('../../helpers');

describe('#animate', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>';
        });
    });

    it('adds an animation to each node', async function() {
        await exec(_ => {
            dom.animate(
                '.animate',
                _ => { },
                {
                    debug: true
                }
            );
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeInOut);
            await testAnimation('#test4', easeInOut);
        }).then(waitFor(150)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('adds an animation to each node with duration', async function() {
        await exec(_ => {
            dom.animate(
                '.animate',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('adds an animation to each node (linear)', async function() {
        await exec(_ => {
            dom.animate(
                '.animate',
                _ => { },
                {
                    duration: 100,
                    type: 'linear',
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', linear, 100);
            await testAnimation('#test4', linear, 100);
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('adds an animation to each node (ease-in)', async function() {
        await exec(_ => {
            dom.animate(
                '.animate',
                _ => { },
                {
                    duration: 100,
                    type: 'ease-in',
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeIn, 100);
            await testAnimation('#test4', easeIn, 100);
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('adds an animation to each node (ease-out)', async function() {
        await exec(_ => {
            dom.animate(
                '.animate',
                _ => { },
                {
                    duration: 100,
                    type: 'ease-out',
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeOut, 100);
            await testAnimation('#test4', easeOut, 100);
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('adds an animation to each node (infinite)', async function() {
        await exec(_ => {
            dom.animate(
                '.animate',
                _ => { },
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
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
        });
    });

    it('resolves when the animation is completed', async function() {
        await exec(async _ => {
            await dom.animate(
                '.animate',
                _ => { },
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
        });
    });

    it('throws when the animation is stopped', async function() {
        assert.equal(
            await exec(async _ => {
                try {
                    const animation = dom.animate(
                        '.animate',
                        _ => { },
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
            dom.animate(
                document.getElementById('test2'),
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testAnimation('#test2', easeInOut, 100);
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('works with NodeList nodes', async function() {
        await exec(_ => {
            dom.animate(
                document.querySelectorAll('.animate'),
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('works with HTMLCollection nodes', async function() {
        await exec(_ => {
            dom.animate(
                document.body.children,
                _ => { },
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
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('works with array nodes', async function() {
        await exec(_ => {
            dom.animate(
                [
                    document.getElementById('test2'),
                    document.getElementById('test4')
                ],
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

});