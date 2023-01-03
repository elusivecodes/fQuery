import assert from 'node:assert/strict';
import { waitFor } from './../../helpers.js';
import { exec } from './../../setup.js';

describe('QuerySet #clearQueue', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>';
        });
    });

    it('clears the queue for each node', async function() {
        await exec((_) => {
            $.queue('.queue', (node) => {
                node.dataset.test = 'Test';
            });
            $('.queue')
                .clearQueue();
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

    it('clears future queued items', async function() {
        await exec((_) => {
            $.queue('.queue', (_) =>
                new Promise((resolve) =>
                    setTimeout(resolve, 100),
                ),
            );
            $.queue('.queue', (node) => {
                node.dataset.test = 'Test';
            });
        }).then(waitFor(50)).then(async (_) => {
            await exec((_) => {
                $('.queue')
                    .clearQueue();
            });
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

    it('clears named queue', async function() {
        await exec((_) => {
            $('.queue')
                .queue((_) =>
                    new Promise((resolve) =>
                        setTimeout(resolve, 100),
                    ),
                );
            $('.queue')
                .queue((_) =>
                    new Promise((resolve) =>
                        setTimeout(resolve, 100),
                    ),
                { queueName: 'test' },
                );
            $('.queue')
                .queue((node) => {
                    node.dataset.test1 = 'Test';
                });
            $('.queue')
                .queue((node) => {
                    node.dataset.test2 = 'Test';
                }, { queueName: 'test' });
        }).then(waitFor(50)).then(async (_) => {
            await exec((_) => {
                $('.queue')
                    .clearQueue({ queueName: 'test' });
            });
        }).then(waitFor(100)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue" data-test1="Test"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue" data-test1="Test"></div>',
            );
        });
    });

    it('clears all queues', async function() {
        await exec((_) => {
            $('.queue')
                .queue((_) =>
                    new Promise((resolve) =>
                        setTimeout(resolve, 100),
                    ),
                );
            $('.queue')
                .queue((_) =>
                    new Promise((resolve) =>
                        setTimeout(resolve, 100),
                    ),
                'test',
                );
            $('.queue')
                .queue((node) => {
                    node.dataset.test1 = 'Test';
                });
            $('.queue')
                .queue((node) => {
                    node.dataset.test2 = 'Test';
                }, 'test');
        }).then(waitFor(50)).then(async (_) => {
            await exec((_) => {
                $('.queue')
                    .clearQueue(false);
            });
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

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('.queue');
                return query === query.clearQueue();
            }),
            true,
        );
    });
});
