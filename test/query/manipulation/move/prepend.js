import assert from 'node:assert/strict';
import { easeInOut, testAnimation, testNoAnimation, waitFor } from './../../../helpers.js';
import { exec } from './../../../setup.js';

describe('QuerySet #prepend', function() {
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

    it('prepends each other node to each node', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .prepend('a');
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<span></span>' +
            '</div>' +
            '<div id="parent2">' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<span></span>' +
            '</div>',
        );
    });

    it('preserves events for other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result = 0;
                $.addEvent('a', 'click', (_) => {
                    result++;
                });
                $('div')
                    .prepend('a');
                $.triggerEvent('a', 'click');
                return result;
            }),
            8,
        );
    });

    it('preserves data for other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $.setData('a', 'test', 'Test');
                $('div')
                    .prepend('a');
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

    it('preserves animations for other nodes', async function() {
        await exec((_) => {
            $.animate(
                'a',
                (_) => { },
                {
                    duration: 100,
                    debug: true,
                },
            );
            $('div')
                .prepend('a');
        }).then(waitFor(50)).then(async (_) => {
            await testAnimation('#parent1 > a:nth-of-type(1)', easeInOut, 100);
            await testAnimation('#parent1 > a:nth-of-type(2)', easeInOut, 100);
            await testAnimation('#parent1 > a:nth-of-type(3)', easeInOut, 100);
            await testAnimation('#parent1 > a:nth-of-type(4)', easeInOut, 100);
            await testAnimation('#parent2 > a:nth-of-type(1)', easeInOut, 100);
            await testAnimation('#parent2 > a:nth-of-type(2)', easeInOut, 100);
            await testAnimation('#parent2 > a:nth-of-type(3)', easeInOut, 100);
            await testAnimation('#parent2 > a:nth-of-type(4)', easeInOut, 100);
        }).then(waitFor(100)).then(async (_) => {
            await testNoAnimation('#parent1 > a:nth-of-type(1)');
            await testNoAnimation('#parent1 > a:nth-of-type(2)');
            await testNoAnimation('#parent1 > a:nth-of-type(3)');
            await testNoAnimation('#parent1 > a:nth-of-type(4)');
            await testNoAnimation('#parent2 > a:nth-of-type(1)');
            await testNoAnimation('#parent2 > a:nth-of-type(2)');
            await testNoAnimation('#parent2 > a:nth-of-type(3)');
            await testNoAnimation('#parent2 > a:nth-of-type(4)');
        });
    });

    it('does not clone for the last other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const nodes = [...document.querySelectorAll('a')];
                $('div')
                    .prepend('a');
                const newNodes = [...document.querySelectorAll('a')].slice(4);
                return nodes.every((node, i) => node.isSameNode(newNodes[i]));
            }),
            true,
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('div');
                return query === query.prepend('a');
            }),
            true,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<span></span>',
                );
                $(fragment)
                    .prepend('a');
                document.body.appendChild(fragment);
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<span></span>',
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const span = document.createElement('span');
                shadow.appendChild(span);
                $(shadow)
                    .prepend('a');
                return shadow.innerHTML;
            }),
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<span></span>',
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const myDoc = new Document();
                $(myDoc)
                    .prepend(
                        myDoc.createElement('html'),
                    );
                return myDoc.childNodes.length;
            }),
            1,
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .prepend(
                        document.querySelector('.test1'),
                    );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<a href="#" class="test1">Test</a>' +
            '<span></span>' +
            '<a href="#" class="test2">Test</a>' +
            '</div>' +
            '<div id="parent2">' +
            '<a href="#" class="test1">Test</a>' +
            '<span></span>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>',
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .prepend(
                        document.querySelectorAll('a'),
                    );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<span></span>' +
            '</div>' +
            '<div id="parent2">' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<span></span>' +
            '</div>',
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .prepend(
                        document.getElementById('parent1').children,
                    );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '</div>' +
            '<div id="parent2">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<span></span>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>',
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>',
                );
                $('div')
                    .prepend(fragment);
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<div><span></span></div>' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '</div>' +
            '<div id="parent2">' +
            '<div><span></span></div>' +
            '<span></span>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>',
        );
    });

    it('works with array other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .prepend([
                        document.querySelector('.test1'),
                        document.querySelector('.test2'),
                        document.querySelector('.test3'),
                        document.querySelector('.test4'),
                    ]);
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<span></span>' +
            '</div>' +
            '<div id="parent2">' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<span></span>' +
            '</div>',
        );
    });

    it('works with HTML other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $('div')
                    .prepend('<div><span></span></div>');
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<div><span></span></div>' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '</div>' +
            '<div id="parent2">' +
            '<div><span></span></div>' +
            '<span></span>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>',
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('a');
                $('div')
                    .prepend(query);
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<span></span>' +
            '</div>' +
            '<div id="parent2">' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<span></span>' +
            '</div>',
        );
    });
});
