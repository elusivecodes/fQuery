import assert from 'node:assert/strict';
import { testNoAnimation, waitFor } from './../../../helpers.js';
import { exec } from './../../../setup.js';

describe('QuerySet #setHTML', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1">' +
                '<div><span id="inner">Test 1</span></div>' +
                '</div>' +
                '<div id="test2"></div>';
        });
    });

    it('sets the HTML contents for all nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .setHTML('<span>Test 2</span>');
                return document.body.innerHTML;
            }),
            '<div id="test1"><span>Test 2</span></div>' +
            '<div id="test2"><span>Test 2</span></div>',
        );
    });

    it('removes events recursively', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const node = document.getElementById('inner');
                $.addEvent(node, 'click', (_) => {
                    result++;
                });
                $('div')
                    .setHTML('<span>Test 2</span>');
                document.body.appendChild(node);
                $.triggerEvent(
                    node,
                    'click',
                );
                return result;
            }),
            0,
        );
    });

    it('removes data recursively', async function() {
        assert.strictEqual; (
            await exec((_) => {
                const node = document.getElementById('inner');
                $.setData(node, 'test', 'Test');
                $('div')
                    .setHTML('<span>Test 2</span>');
                document.body.appendChild(node);
                return $.getData(node, 'test');
            }),
            null
        );
    });

    it('removes animations recursively', async function() {
        await exec((_) => {
            $.animate(
                '#inner',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await exec((_) => {
                const node = document.getElementById('inner');
                $('div')
                    .setHTML('<span>Test 2</span>');
                document.body.appendChild(node);
            });
            await testNoAnimation('#inner');
        });
    });

    it('removes queue recursively', async function() {
        await exec((_) => {
            $.queue('#inner', (_) => {
                return new Promise((resolve) =>
                    setTimeout(resolve, 100),
                );
            });
            $.queue('#inner', (node) => {
                node.dataset.test = 'Test';
            });
        }).then(waitFor(50)).then(async (_) => {
            await exec((_) => {
                const node = document.getElementById('inner');
                $('div')
                    .setHTML('<span>Test 2</span>');
                document.body.appendChild(node);
            });
        }).then(waitFor(100)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<div id="test1"><span>Test 2</span></div>' +
                '<div id="test2"><span>Test 2</span></div>' +
                '<span id="inner">Test 1</span>',
            );
        });
    });

    it('triggers a remove event recursively', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                $.addEvent('#inner', 'remove', (_) => {
                    result++;
                });
                $('div')
                    .setHTML('<span>Test 2</span>');
                return result;
            }),
            1,
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('div');
                return query === query.setHTML('<span>Test 2</span>');
            }),
            true,
        );
    });
});
