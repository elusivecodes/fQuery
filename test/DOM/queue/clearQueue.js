import assert from 'node:assert/strict';
import { waitFor } from './../../helpers.js';
import { exec } from './../../setup.js';

describe('#clearQueue', function() {
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
            $.clearQueue('.queue');
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
                $.clearQueue('.queue');
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
            $.queue('.queue', (_) =>
                new Promise((resolve) =>
                    setTimeout(resolve, 100),
                ),
            );
            $.queue('.queue', (_) =>
                new Promise((resolve) =>
                    setTimeout(resolve, 100),
                ),
            { queueName: 'test' },
            );
            $.queue('.queue', (node) => {
                node.dataset.test1 = 'Test';
            });
            $.queue('.queue', (node) => {
                node.dataset.test2 = 'Test';
            }, { queueName: 'test' });
        }).then(waitFor(50)).then(async (_) => {
            await exec((_) => {
                $.clearQueue('.queue', { queueName: 'test' });
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
            $.queue('.queue', (_) =>
                new Promise((resolve) =>
                    setTimeout(resolve, 100),
                ),
            );
            $.queue('.queue', (_) =>
                new Promise((resolve) =>
                    setTimeout(resolve, 100),
                ),
            'test',
            );
            $.queue('.queue', (node) => {
                node.dataset.test1 = 'Test';
            });
            $.queue('.queue', (node) => {
                node.dataset.test2 = 'Test';
            }, 'test');
        }).then(waitFor(50)).then(async (_) => {
            await exec((_) => {
                $.clearQueue('.queue', false);
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

    it('works with HTMLElement nodes', async function() {
        await exec((_) => {
            $.queue('.queue', (node) => {
                node.dataset.test = 'Test';
            });
            $.clearQueue(
                document.getElementById('test2'),
            );
        }).then(waitFor(100)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue" data-test="Test"></div>',
            );
        });
    });

    it('works with NodeList nodes', async function() {
        await exec((_) => {
            $.queue('.queue', (node) => {
                node.dataset.test = 'Test';
            });
            $.clearQueue(
                document.querySelectorAll('.queue'),
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

    it('works with HTMLCollection nodes', async function() {
        await exec((_) => {
            $.queue('.queue', (node) => {
                node.dataset.test = 'Test';
            });
            $.clearQueue(
                document.body.children,
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

    it('works with array nodes', async function() {
        await exec((_) => {
            $.queue('.queue', (node) => {
                node.dataset.test = 'Test';
            });
            $.clearQueue([
                document.getElementById('test2'),
                document.getElementById('test4'),
            ]);
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
});
