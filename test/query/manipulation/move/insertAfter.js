import assert from 'node:assert/strict';
import { easeInOut, testAnimation, testNoAnimation, waitFor } from './../../../helpers.js';
import { exec } from './../../../setup.js';

describe('QuerySet #insertAfter', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<span></span>' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '</div>' +
                '<div id="parent2">' +
                '<span></span>' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '</div>';
        });
    });

    it('inserts each node after each other node', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('a')
                    .insertAfter('div');
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>',
        );
    });

    it('preserves events for nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                $.addEvent('a', 'click', (_) => {
                    result++;
                });
                $('a')
                    .insertAfter('div');
                $.triggerEvent('a', 'click');
                return result;
            }),
            8,
        );
    });

    it('preserves data for nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.setData('a', 'test', 'Test');
                $('a')
                    .insertAfter('div');
                return [...document.querySelectorAll('a')]
                    .map((node) =>
                        $.getData(node, 'test'),
                    );
            }),
            [
                'Test',
                'Test',
                'Test',
                'Test',
                'Test',
                'Test',
                'Test',
                'Test',
            ],
        );
    });

    it('preserves animations for nodes', async function() {
        await exec((_) => {
            $.animate(
                'a',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
            $('a')
                .insertAfter('div');
        }).then(waitFor(50)).then(async (_) => {
            await testAnimation('body > a:nth-of-type(1)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(2)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(3)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(4)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(5)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(6)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(7)', easeInOut, 100);
            await testAnimation('body > a:nth-of-type(8)', easeInOut, 100);
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('body > a:nth-of-type(1)');
            await testNoAnimation('body > a:nth-of-type(2)');
            await testNoAnimation('body > a:nth-of-type(3)');
            await testNoAnimation('body > a:nth-of-type(4)');
            await testNoAnimation('body > a:nth-of-type(5)');
            await testNoAnimation('body > a:nth-of-type(6)');
            await testNoAnimation('body > a:nth-of-type(7)');
            await testNoAnimation('body > a:nth-of-type(8)');
        });
    });

    it('does not clone for the last nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const nodes = [...document.querySelectorAll('a')];
                $('a')
                    .insertAfter('div');
                const newNodes = [...document.querySelectorAll('a')].slice(4);
                return nodes.every((node, i) => node.isSameNode(newNodes[i]));
            }),
            true,
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('a');
                return query === query.insertAfter('div');
            }),
            true,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>',
                );
                $(fragment)
                    .insertAfter('div');
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '</div>' +
            '<div><span></span></div>' +
            '<div id="parent2">' +
            '<span></span>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>' +
            '<div><span></span></div>',
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('a')
                    .insertAfter(
                        document.getElementById('parent1'),
                    );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>',
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('a')
                    .insertAfter(
                        document.querySelectorAll('div'),
                    );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>',
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('a')
                    .insertAfter(
                        document.body.children,
                    );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>',
        );
    });

    it('works with array other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('a')
                    .insertAfter([
                        document.getElementById('parent1'),
                        document.getElementById('parent2'),
                    ]);
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>',
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('div');
                $('a')
                    .insertAfter(query);
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>',
        );
    });
});
