import assert from 'node:assert/strict';
import { waitFor } from './../../helpers.js';
import { exec } from './../../setup.js';

describe('QuerySet #delay', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"></div>' +
                '<div id="test2" class="queue"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue"></div>';
        });
    });

    it('delays execution of the next queued item', async function() {
        await exec((_) => {
            $('.queue')
                .delay(100);
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

    it('works with named queue', async function() {
        await exec((_) => {
            $('.queue')
                .delay(100, { queueName: 'test' });
            $('.queue')
                .queue((node) => {
                    node.dataset.test1 = 'Test';
                });
            $('.queue')
                .queue((node) => {
                    node.dataset.test2 = 'Test';
                }, { queueName: 'test' });
        }).then(waitFor(50)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<div id="test1"></div>' +
                '<div id="test2" class="queue" data-test1="Test"></div>' +
                '<div id="test3"></div>' +
                '<div id="test4" class="queue" data-test1="Test"></div>',
            );
        });
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('.queue');
                return query === query.delay((_) => { });
            }),
            true,
        );
    });
});
