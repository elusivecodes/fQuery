const assert = require('assert');
const { exec } = require('../../../setup');
const { easeIn, easeInOut, easeOut, getAnimationStyle, linear, testAnimation, testNoAnimation, testNoStyle, waitFor } = require('../../../helpers');

const fadeIn = progress => {
    const amount = parseFloat(progress).toFixed(2);
    return parseFloat(amount);
};

const testFadeIn = async selector => {
    const data = await getAnimationStyle(selector, 'opacity');

    const amount = fadeIn(data.progress);
    assert.strictEqual(data.opacity, `${amount}`);
};

describe('QuerySet #fadeIn', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>';
        });
    });

    it('adds a fade-in animation to each node', async function() {
        await exec(_ => {
            dom.queryMutable('.animate')
                .fadeIn({
                    debug: true
                });
        }).then(waitFor(100)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', easeInOut);
            await testAnimation('#test4', easeInOut);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
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

    it('adds a fade-in animation to each node with duration', async function() {
        await exec(_ => {
            dom.queryMutable('.animate')
                .fadeIn({
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
            await testFadeIn('#test2');
            await testFadeIn('#test4');
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

    it('adds a fade-in animation to each node (linear)', async function() {
        await exec(_ => {
            dom.queryMutable('.animate')
                .fadeIn({
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
            await testFadeIn('#test2');
            await testFadeIn('#test4');
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

    it('adds a fade-in animation to each node (ease-in)', async function() {
        await exec(_ => {
            dom.queryMutable('.animate')
                .fadeIn({
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
            await testFadeIn('#test2');
            await testFadeIn('#test4');
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

    it('adds a fade-in animation to each node (ease-out)', async function() {
        await exec(_ => {
            dom.queryMutable('.animate')
                .fadeIn({
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
            await testFadeIn('#test2');
            await testFadeIn('#test4');
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

    it('adds a fade-in animation to each node (infinite)', async function() {
        await exec(_ => {
            dom.queryMutable('.animate')
                .fadeIn({
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
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        }).then(waitFor(50)).then(async _ => {
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testNoStyle('#test1');
            await testNoStyle('#test3');
            await testAnimation('#test2', linear, 100, true);
            await testAnimation('#test4', linear, 100, true);
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        });
    });

    it('adds the animation to the queue', async function() {
        await exec(_ => {
            dom.queryMutable('.animate')
                .queue(_ =>
                    new Promise(resolve =>
                        setTimeout(resolve, 100)
                    )
                );
            dom.queryMutable('.animate')
                .fadeIn(
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
            await testFadeIn('#test2');
            await testFadeIn('#test4');
        });
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('.animate');
                return query === query.fadeIn(
                    {
                        debug: true
                    }
                );
            }),
            true
        );
    });

});