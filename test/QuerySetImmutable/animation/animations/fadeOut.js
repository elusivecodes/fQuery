const assert = require('assert').strict;
const { exec } = require('../../../setup');
const { easeIn, easeInOut, easeOut, getAnimationStyle, linear, testAnimation, testNoAnimation, testNoStyle, waitFor } = require('../../../helpers');

const fadeOut = progress => {
    const amount = (1 - progress).toFixed(2);
    return parseFloat(amount);
};

const testFadeOut = async selector => {
    const data = await getAnimationStyle(selector, 'opacity');

    const amount = fadeOut(data.progress);
    assert.equal(data.opacity, `${amount}`);
};

describe('QuerySetImmutable #fadeOut', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>';
        });
    });

    it('adds a fade-out animation to each node', async function() {
        await exec(_ => {
            dom.query('.animate')
                .fadeOut({
                    debug: true
                });
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut);
            await testAnimation('#test4', easeInOut);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
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

    it('adds a fade-out animation to each node with duration', async function() {
        await exec(_ => {
            dom.query('.animate')
                .fadeOut({
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
            await testFadeOut('#test2');
            await testFadeOut('#test4');
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

    it('adds a fade-out animation to each node (linear)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .fadeOut({
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
            await testFadeOut('#test2');
            await testFadeOut('#test4');
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

    it('adds a fade-out animation to each node (ease-in)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .fadeOut({
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
            await testFadeOut('#test2');
            await testFadeOut('#test4');
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

    it('adds a fade-out animation to each node (ease-out)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .fadeOut({
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
            await testFadeOut('#test2');
            await testFadeOut('#test4');
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

    it('adds a fade-out animation to each node (infinite)', async function() {
        await exec(_ => {
            dom.query('.animate')
                .fadeOut({
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
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testFadeOut('#test2');
            await testFadeOut('#test4');
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
                .fadeOut(
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
            await testFadeOut('#test2');
            await testFadeOut('#test4');
        });
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('.animate');
                return query === query.fadeOut(
                    {
                        debug: true
                    }
                );
            }),
            true
        );
    });

});