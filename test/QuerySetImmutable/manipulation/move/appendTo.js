const assert = require('assert').strict;
const { exec } = require('../../../setup');
const { easeInOut, testAnimation, testNoAnimation, waitFor } = require('../../../helpers');

describe('QuerySetImmutable #appendTo', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<a href="#" class="test1">Test</a>' +
                '<a href="#" class="test2">Test</a>' +
                '<span></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<a href="#" class="test3">Test</a>' +
                '<a href="#" class="test4">Test</a>' +
                '<span></span>' +
                '</div>';
        });
    });

    it('appends each node to each other node', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('a')
                    .appendTo('div');
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>' +
            '<div id="parent2">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>'
        );
    });

    it('preserves events for nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent('a', 'click', _ => {
                    result++;
                });
                dom.query('a')
                    .appendTo('div');
                dom.triggerEvent('a', 'click');
                return result;
            }),
            8
        );
    });

    it('preserves data for nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData('a', 'test', 'Test');
                dom.query('a')
                    .appendTo('div');
                return [...document.querySelectorAll('a')]
                    .map(node =>
                        dom.getData(node, 'test')
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
                'Test'
            ]
        );
    });

    it('preserves animations for nodes', async function() {
        await exec(_ => {
            dom.animate(
                'a',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
            dom.query('a')
                .appendTo('div');
        }).then(waitFor(50)).then(async _ => {
            await testAnimation('#parent1 > a:nth-of-type(1)', easeInOut, 100);
            await testAnimation('#parent1 > a:nth-of-type(2)', easeInOut, 100);
            await testAnimation('#parent1 > a:nth-of-type(3)', easeInOut, 100);
            await testAnimation('#parent1 > a:nth-of-type(4)', easeInOut, 100);
            await testAnimation('#parent2 > a:nth-of-type(1)', easeInOut, 100);
            await testAnimation('#parent2 > a:nth-of-type(2)', easeInOut, 100);
            await testAnimation('#parent2 > a:nth-of-type(3)', easeInOut, 100);
            await testAnimation('#parent2 > a:nth-of-type(4)', easeInOut, 100);
        }).then(waitFor(100)).then(async _ => {
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

    it('does not clone for the last nodes', async function() {
        assert.equal(
            await exec(_ => {
                const nodes = [...document.querySelectorAll('a')];
                dom.query('a')
                    .appendTo('div');
                const newNodes = [...document.querySelectorAll('a')].slice(4);
                return nodes.every((node, i) => node.isSameNode(newNodes[i]));
            }),
            true
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('a');
                return query === query.appendTo('div');
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                dom.query(fragment)
                    .appendTo('div');
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<span></span>' +
            '<div><span></span></div>' +
            '</div>' +
            '<div id="parent2">' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<span></span>' +
            '<div><span></span></div>' +
            '</div>'
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('a')
                    .appendTo(
                        document.getElementById('parent1')
                    );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>'
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('a')
                    .appendTo(
                        document.querySelectorAll('div')
                    );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>' +
            '<div id="parent2">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('a')
                    .appendTo(
                        document.body.children
                    );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>' +
            '<div id="parent2">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<span></span>'
                );
                dom.query('a')
                    .appendTo(fragment);
                document.body.appendChild(fragment);
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>'
        );
    });

    it('works with ShadowRoot other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const span = document.createElement('span');
                shadow.appendChild(span);
                dom.query('a')
                    .appendTo(shadow);
                return shadow.innerHTML;
            }),
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>'
        );
    });

    it('works with Document other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const myDoc = new Document();
                dom.query(
                    myDoc.createElement('html')
                ).appendTo(myDoc);
                return myDoc.childNodes.length;
            }),
            1
        );
    });

    it('works with array other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.query('a')
                    .appendTo([
                        document.getElementById('parent1'),
                        document.getElementById('parent2')
                    ]);
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>' +
            '<div id="parent2">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('div');
                dom.query('a')
                    .appendTo(query);
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>' +
            '<div id="parent2">' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>'
        );
    });

});