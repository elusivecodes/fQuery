import assert from 'node:assert/strict';
import { easeIn, easeInOut, easeOut, linear, testAnimation, testNoAnimation, waitFor } from './../../helpers.js';
import { exec } from './../../setup.js';

describe('#animate', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>';
        });
    });

    it('adds an animation to each node', async function() {
        await exec((_) => {
            $.animate(
                '.animate',
                (_) => { },
                {
                    debug: true,
                },
            );
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeInOut);
            await testAnimation('#test4', easeInOut);
        }).then(waitFor(150)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('adds an animation to each node with duration', async function() {
        await exec((_) => {
            $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('adds an animation to each node (linear)', async function() {
        await exec((_) => {
            $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    type: 'linear',
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', linear, 100);
            await testAnimation('#test4', linear, 100);
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('adds an animation to each node (ease-in)', async function() {
        await exec((_) => {
            $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    type: 'ease-in',
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeIn, 100);
            await testAnimation('#test4', easeIn, 100);
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('adds an animation to each node (ease-out)', async function() {
        await exec((_) => {
            $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    type: 'ease-out',
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeOut, 100);
            await testAnimation('#test4', easeOut, 100);
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('adds an animation to each node (infinite)', async function() {
        await exec((_) => {
            $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    type: 'linear',
                    infinite: true,
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
        });
    });

    it('can be stopped', async function() {
        await exec(async (_) => {
            const animation = $.animate(
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
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('can be stopped (without finishing)', async function() {
        await exec(async (_) => {
            const animation = $.animate(
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
                        animation.stop({ finish: false });
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
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
        });
    });

    it('resolves when the animation is stopped', async function() {
        await exec(async (_) => {
            const animation = $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
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
                    const animation = $.animate(
                        '.animate',
                        (_) => { },
                        {
                            duration: 1000,
                            debug: true,
                        },
                    );
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
            const animation = $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                },
            );
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
            await $.animate(
                '.animate',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        }).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('throws when all animations are stopped (without finishing)', async function() {
        assert.strictEqual(
            await exec(async (_) => {
                try {
                    const animation = $.animate(
                        '.animate',
                        (_) => { },
                        {
                            duration: 1000,
                            debug: true,
                        },
                    );
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
            $.animate(
                document.getElementById('test2'),
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
            await testAnimation('#test2', easeInOut, 100);
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('works with NodeList nodes', async function() {
        await exec((_) => {
            $.animate(
                document.querySelectorAll('.animate'),
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('works with HTMLCollection nodes', async function() {
        await exec((_) => {
            $.animate(
                document.body.children,
                (_) => { },
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
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('works with array nodes', async function() {
        await exec((_) => {
            $.animate(
                [
                    document.getElementById('test2'),
                    document.getElementById('test4'),
                ],
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });
});
