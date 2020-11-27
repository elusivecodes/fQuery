const assert = require('assert');
const { exec } = require('../../setup');
const { waitFor } = require('../../helpers');

describe('QuerySet #queue', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>';
        });
    });

    it('queues a callback for each node', async function() {
        await exec(_ => {
            dom.queryMutable('.queue')
                .queue(node => {
                    node.dataset.test = 'Test'
                });
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

    it('does not execute the callback immediately', async function() {
        await exec(_ => {
            dom.queryMutable('.queue')
                .queue(node => {
                    node.dataset.test = 'Test'
                });
        });
        assert.strictEqual(
            await exec(_ => document.body.innerHTML),
            '<div id="test1"></div>' +
            '<div id="test2" class="queue"></div>' +
            '<div id="test3"></div>' +
            '<div id="test4" class="queue"></div>'
        );
    });

    it('only executes callbacks after the previous item is resolved', async function() {
        await exec(_ => {
            dom.queryMutable('.queue')
                .queue(node =>
                    new Promise(resolve =>
                        setTimeout(resolve, 100)
                    )
                );
            dom.queryMutable('.queue')
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

    it('does not continue the queue if an item is rejected', async function() {
        await exec(_ => {
            dom.queryMutable('.queue')
                .queue(node =>
                    new Promise((_, reject) =>
                        setTimeout(reject, 100)
                    )
                );
            dom.queryMutable('.queue')
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
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>'
            );
        });
    });

    it('processes multiple queues simultaneously', async function() {
        await exec(_ => {
            dom.queryMutable('.queue')
                .queue(node => {
                    node.dataset.test1 = 'Test'
                });
            dom.queryMutable('.queue')
                .queue(node =>
                    new Promise(resolve =>
                        setTimeout(resolve, 100)
                    )
                );
            dom.queryMutable('.queue')
                .queue(node => {
                    node.dataset.test2 = 'Test'
                }, 'test');
            dom.queryMutable('.queue')
                .queue(node =>
                    new Promise(resolve =>
                        setTimeout(resolve, 100)
                    ),
                    'test'
                );
        }).then(waitFor(50)).then(async _ => {
            assert.strictEqual(
                await exec(_ => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue" data-test1="Test" data-test2="Test"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue" data-test1="Test" data-test2="Test"></div>'
            );
        });
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('.queue');
                return query === query.queue(_ => { });
            }),
            true
        );
    });

});