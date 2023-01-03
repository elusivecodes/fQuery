import assert from 'node:assert/strict';
import { waitFor } from './../../helpers.js';
import { exec } from './../../setup.js';

describe('QuerySet #queue', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>';
        });
    });

    it('queues a callback for each node', async function() {
        await exec((_) => {
            $('.queue')
                .queue((node) => {
                    node.dataset.test = 'Test';
                });
        }).then(waitFor(100)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue" data-test="Test"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue" data-test="Test"></div>',
            );
        });
    });

    it('does not execute the callback immediately', async function() {
        await exec((_) => {
            $('.queue')
                .queue((node) => {
                    node.dataset.test = 'Test';
                });
        });
        assert.strictEqual(
            await exec((_) => document.body.innerHTML),
            '<div id="test1"></div>' +
            '<div id="test2" class="queue"></div>' +
            '<div id="test3"></div>' +
            '<div id="test4" class="queue"></div>',
        );
    });

    it('only executes callbacks after the previous item is resolved', async function() {
        await exec((_) => {
            $('.queue')
                .queue((_) =>
                    new Promise((resolve) =>
                        setTimeout(resolve, 100),
                    ),
                );
            $('.queue')
                .queue((node) => {
                    node.dataset.test = 'Test';
                });
        }).then(waitFor(50)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>',
            );
        }).then(waitFor(100)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue" data-test="Test"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue" data-test="Test"></div>',
            );
        });
    });

    it('does not continue the queue if an item is rejected', async function() {
        await exec((_) => {
            $('.queue')
                .queue((_) =>
                    new Promise((_, reject) =>
                        setTimeout(reject, 100),
                    ),
                );
            $('.queue')
                .queue((node) => {
                    node.dataset.test = 'Test';
                });
        }).then(waitFor(50)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>',
            );
        }).then(waitFor(100)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>',
            );
        });
    });

    it('processes multiple queues simultaneously', async function() {
        await exec((_) => {
            $('.queue')
                .queue((node) => {
                    node.dataset.test1 = 'Test';
                });
            $('.queue')
                .queue((_) =>
                    new Promise((resolve) =>
                        setTimeout(resolve, 100),
                    ),
                );
            $('.queue')
                .queue((node) => {
                    node.dataset.test2 = 'Test';
                }, { queueName: 'test' });
            $('.queue')
                .queue((_) =>
                    new Promise((resolve) =>
                        setTimeout(resolve, 100),
                    ),
                { queueName: 'test' },
                );
        }).then(waitFor(50)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue" data-test1="Test" data-test2="Test"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue" data-test1="Test" data-test2="Test"></div>',
            );
        });
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('.queue');
                return query === query.queue((_) => { });
            }),
            true,
        );
    });
});
