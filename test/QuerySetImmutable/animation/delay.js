const assert = require('assert');
const { exec } = require('../../setup');
const { waitFor } = require('../../helpers');

describe('QuerySet #delay', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>';
        });
    });

    it('delays execution of the next queued item', async function() {
        await exec(_ => {
            dom.query('.queue')
                .delay(100);
            dom.query('.queue')
                .queue(node => {
                    node.dataset.test = 'Test'
                });
        }).then(waitFor(50)).then(async _ => {
            assert.strictEqual(
                await exec(_ => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>'
            );
        }).then(waitFor(100)).then(async _ => {
            assert.strictEqual(
                await exec(_ => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue" data-test="Test"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue" data-test="Test"></div>'
            );
        });
    });

    it('works with named queue', async function() {
        await exec(_ => {
            dom.query('.queue')
                .delay(100, 'test');
            dom.query('.queue')
                .queue(node => {
                    node.dataset.test1 = 'Test'
                });
            dom.query('.queue')
                .queue(node => {
                    node.dataset.test2 = 'Test'
                }, 'test');
        }).then(waitFor(50)).then(async _ => {
            assert.strictEqual(
                await exec(_ => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue" data-test1="Test"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue" data-test1="Test"></div>'
            );
        });
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.query('.queue');
                return query === query.delay(_ => { });
            }),
            true
        );
    });

});