const assert = require('assert');
const { exec } = require('../../setup');
const { easeInOut, testAnimation, testNoAnimation, waitFor } = require('../../helpers');

describe('#stop', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="animate"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="animate"></div>';
        });
    });

    it('stops animations on all nodes', async function() {
        await exec(_ => {
            dom.animate(
                '.animate',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(25)).then(async _ => {
            await exec(_ => {
                dom.stop('.animate');
            });
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('stops animations on all nodes (without finishing)', async function() {
        let testHtml;
        await exec(_ => {
            dom.animate(
                '.animate',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(25)).then(async _ => {
            testHtml = await exec(_ => {
                dom.stop('.animate', false);
                return document.body.innerHTML;
            });
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
        }).then(waitFor(25)).then(async _ => {
            const html = await exec(_ => document.body.innerHTML);
            assert.strictEqual(
                html,
                testHtml
            );
        });
    });

    it('works with HTMLElement nodes', async function() {
        await exec(_ => {
            dom.animate(
                '.animate',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(25)).then(async _ => {
            await exec(_ => {
                dom.stop(
                    document.getElementById('test2')
                );
            });
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testAnimation('#test4', easeInOut, 100);
        });
    });

    it('works with NodeList nodes', async function() {
        await exec(_ => {
            dom.animate(
                '.animate',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(25)).then(async _ => {
            await exec(_ => {
                dom.stop(
                    document.querySelectorAll('.animate')
                );
            });
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('works with HTMLCollection nodes', async function() {
        await exec(_ => {
            dom.animate(
                '.animate',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(25)).then(async _ => {
            await exec(_ => {
                dom.stop(
                    document.body.children
                );
            });
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

    it('works with array nodes', async function() {
        await exec(_ => {
            dom.animate(
                '.animate',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
        }).then(waitFor(25)).then(async _ => {
            await exec(_ => {
                dom.stop([
                    document.getElementById('test2'),
                    document.getElementById('test4')
                ]);
            });
            await testNoAnimation('#test1');
            await testNoAnimation('#test2');
            await testNoAnimation('#test3');
            await testNoAnimation('#test4');
        });
    });

});