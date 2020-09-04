const assert = require('assert').strict;
const { exec } = require('../../setup');
const { easeInOut, testAnimation, testNoAnimation, waitFor } = require('../../helpers');

describe('QuerySetImmutable #stop', function() {

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
                dom.query('.animate')
                    .stop();
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
                dom.query('.animate')
                    .stop(false);
                return document.body.innerHTML;
            });
            await testNoAnimation('#test1');
            await testNoAnimation('#test3');
            await testAnimation('#test2', easeInOut, 100);
            await testAnimation('#test4', easeInOut, 100);
        }).then(waitFor(25)).then(async _ => {
            const html = await exec(_ => document.body.innerHTML);
            assert.equal(
                html,
                testHtml
            );
        });
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('.animate');
                return query === query.stop();
            }),
            true
        );
    });

});