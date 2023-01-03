import assert from 'node:assert/strict';
import { testNoAnimation, waitFor } from './../../../helpers.js';
import { exec } from './../../../setup.js';

describe('#setHTML', function() {
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
                $.setHTML('div', '<span>Test 2</span>');
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
                $.setHTML('div', '<span>Test 2</span>');
                document.body.appendChild(node);
                $.triggerEvent(node, 'click');
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
                $.setHTML('div', '<span>Test 2</span>');
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
                $.setHTML('div', '<span>Test 2</span>');
                document.body.appendChild(node);
            });
            await testNoAnimation('#inner');
        });
    });

    it('removes queue recursively', async function() {
        await exec((_) => {
            $.queue('#inner', (_) =>
                new Promise((resolve) =>
                    setTimeout(resolve, 100),
                ),
            );
            $.queue('#inner', (node) => {
                node.dataset.test = 'Test';
            });
        }).then(waitFor(50)).then(async (_) => {
            await exec((_) => {
                const node = document.getElementById('inner');
                $.setHTML('div', '<span>Test 2</span>');
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
                $.setHTML('div', '<span>Test 2</span>');
                return result;
            }),
            1,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setHTML(
                    document.getElementById('test1'),
                    '<span>Test 2</span>',
                );
                return document.body.innerHTML;
            }),
            '<div id="test1"><span>Test 2</span></div>' +
            '<div id="test2"></div>',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setHTML(
                    document.querySelectorAll('div'),
                    '<span>Test 2</span>',
                );
                return document.body.innerHTML;
            }),
            '<div id="test1"><span>Test 2</span></div>' +
            '<div id="test2"><span>Test 2</span></div>',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setHTML(
                    document.body.children,
                    '<span>Test 2</span>',
                );
                return document.body.innerHTML;
            }),
            '<div id="test1"><span>Test 2</span></div>' +
            '<div id="test2"><span>Test 2</span></div>',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.setHTML([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ], '<span>Test 2</span>');
                return document.body.innerHTML;
            }),
            '<div id="test1"><span>Test 2</span></div>' +
            '<div id="test2"><span>Test 2</span></div>',
        );
    });
});
