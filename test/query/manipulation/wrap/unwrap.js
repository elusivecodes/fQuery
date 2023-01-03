import assert from 'node:assert/strict';
import { testNoAnimation, waitFor } from './../../../helpers.js';
import { exec } from './../../../setup.js';

describe('QuerySet #unwrap', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '</div>';
        });
    });

    it('unwraps each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('a')
                    .unwrap();
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>',
        );
    });

    it('unwraps each node with filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('a')
                    .unwrap('#parent1');
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>',
        );
    });

    it('removes events', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                const nodes = document.querySelectorAll('div');
                $.addEvent('div', 'click', (_) => {
                    result++;
                });
                $('a')
                    .unwrap();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                $.triggerEvent('div', 'click');
                return result;
            }),
            0,
        );
    });

    it('removes data', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const nodes = document.querySelectorAll('div');
                $.setData('div', 'test', 'Test');
                $('a')
                    .unwrap();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
                return [...nodes]
                    .map((node) =>
                        $.getData(node, 'test'),
                    );
            }),
            [
                null,
                null,
            ],
        );
    });

    it('removes animations', async function() {
        await exec((_) => {
            $.animate(
                'div',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
        }).then(waitFor(50)).then(async (_) => {
            await exec((_) => {
                const nodes = document.querySelectorAll('div');
                $('a')
                    .unwrap();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
            await testNoAnimation('#parent1');
            await testNoAnimation('#parent2');
        });
    });

    it('removes queue', async function() {
        await exec((_) => {
            $.queue('div', (_) =>
                new Promise((resolve) =>
                    setTimeout(resolve, 100),
                ),
            );
            $.queue('div', (node) => {
                node.dataset.test = 'Test';
            });
        }).then(waitFor(50)).then(async (_) => {
            await exec((_) => {
                const nodes = document.querySelectorAll('div');
                $('a')
                    .unwrap();
                for (const node of nodes) {
                    document.body.appendChild(node);
                }
            });
        }).then(waitFor(100)).then(async (_) => {
            assert.strictEqual(
                await exec((_) => document.body.innerHTML),
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>' +
                '<a href="#" id="test3">Test</a>' +
                '<a href="#" id="test4">Test</a>' +
                '<div id="parent1">' +
                '</div>' +
                '<div id="parent2">' +
                '</div>',
            );
        });
    });

    it('triggers a remove event', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                $.addEvent('div', 'remove', (_) => {
                    result++;
                });
                $('a')
                    .unwrap();
                return result;
            }),
            2,
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('a');
                return query === query.unwrap();
            }),
            true,
        );
    });

    it('works with function filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('a')
                    .unwrap(
                        (node) => node.id === 'parent1',
                    );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>',
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('a')
                    .unwrap(
                        document.getElementById('parent1'),
                    );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>',
        );
    });

    it('works with NodeList filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('a')
                    .unwrap(
                        document.querySelectorAll('#parent1'),
                    );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>',
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('a')
                    .unwrap(
                        document.body.children,
                    );
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>',
        );
    });

    it('works with array filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('a')
                    .unwrap([
                        document.getElementById('parent1'),
                    ]);
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>',
        );
    });

    it('works with QuerySet filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('#parent1');
                $('a')
                    .unwrap(query);
                return document.body.innerHTML;
            }),
            '<a href="#" id="test1">Test</a>' +
            '<a href="#" id="test2">Test</a>' +
            '<div id="parent2">' +
            '<a href="#" id="test3">Test</a>' +
            '<a href="#" id="test4">Test</a>' +
            '</div>',
        );
    });
});
