const assert = require('assert');
const { exec } = require('../../setup');
const { waitFor } = require('../../helpers');

describe('QuerySetImmutable #clearQueue', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>';
        });
    });

    it('clears the queue for each node', async function() {
        await exec(_ => {
            dom.queue('.queue', node => {
                node.dataset.test = 'Test'
            });
            dom.query('.queue')
                .clearQueue();
        }).then(waitFor(100)).then(async _ => {
            assert.strictEqual(
                await exec(_ => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>'
            );
        });
    });

    it('clears future queued items', async function() {
        await exec(_ => {
            dom.queue('.queue', _ =>
                new Promise(resolve =>
                    setTimeout(resolve, 100)
                )
            );
            dom.queue('.queue', node => {
                node.dataset.test = 'Test'
            });
        }).then(waitFor(50)).then(async _ => {
            await exec(_ => {
                dom.query('.queue')
                    .clearQueue();
            });
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
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>'
            );
        });
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.query('.queue');
                return query === query.clearQueue();
            }),
            true
        );
    });

});