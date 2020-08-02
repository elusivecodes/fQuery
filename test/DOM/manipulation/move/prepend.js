const assert = require('assert').strict;
const { exec } = require('../../../setup');
const { easeInOut, testAnimation, testNoAnimation, waitFor } = require('../../../helpers');

describe('#prepend', function() {

    beforeEach(async function() {
        await exec(_ => {
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
        assert.equal(
            await exec(_ => {
                dom.prepend(
                    'div',
                    'a'
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
            '</div>'
        );
    });

    it('preserves events for other nodes', async function() {
        assert.equal(
            await exec(_ => {
                let result = 0;
                dom.addEvent(
                    'a',
                    'click',
                    _ => { result++; }
                );
                dom.prepend(
                    'div',
                    'a'
                );
                dom.triggerEvent(
                    'a',
                    'click'
                );
                return result;
            }),
            8
        );
    });

    it('preserves data for other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setData(
                    'a',
                    'test',
                    'Test'
                );
                dom.append(
                    'div',
                    'a'
                );
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

    it('preserves animations for other nodes', async function() {
        await exec(_ => {
            dom.animate(
                'a',
                _ => { },
                {
                    duration: 100,
                    debug: true
                }
            );
            dom.prepend(
                'div',
                'a'
            );
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

    it('does not clone for the last other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const nodes = [...document.querySelectorAll('a')];
                dom.prepend(
                    'div',
                    'a'
                );
                const newNodes = [...document.querySelectorAll('a')].slice(4);
                return nodes.every((node, i) => node.isSameNode(newNodes[i]));
            }),
            true
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.prepend(
                    document.getElementById('parent1'),
                    'a'
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
            '<span></span>' +
            '</div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.prepend(
                    document.querySelectorAll('div'),
                    'a'
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
            '</div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.prepend(
                    document.body.children,
                    'a'
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
            '</div>'
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<span></span>'
                );
                dom.prepend(
                    fragment,
                    'a'
                );
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
            '<span></span>'
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const span = document.createElement('span');
                shadow.appendChild(span);
                dom.prepend(
                    shadow,
                    'a'
                );
                return shadow.innerHTML;
            }),
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<span></span>'
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                const myDoc = new Document();
                dom.prepend(
                    myDoc,
                    myDoc.createElement('html')
                );
                return myDoc.childNodes.length;
            }),
            1
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.prepend(
                    [
                        document.getElementById('parent1'),
                        document.getElementById('parent2')
                    ],
                    'a'
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
            '</div>'
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.prepend(
                    'div',
                    document.querySelector('.test1')
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
            '</div>'
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.prepend(
                    'div',
                    document.querySelectorAll('a')
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
            '</div>'
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.prepend(
                    'div',
                    document.getElementById('parent1').children
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
            '</div>'
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                dom.prepend(
                    'div',
                    fragment
                );
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
            '</div>'
        );
    });

    it('works with array other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.prepend(
                    'div',
                    [
                        document.querySelector('.test1'),
                        document.querySelector('.test2'),
                        document.querySelector('.test3'),
                        document.querySelector('.test4')
                    ]
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
            '</div>'
        );
    });

    it('works with HTML other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.prepend(
                    'div',
                    '<div><span></span></div>'
                );
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
            '</div>'
        );
    });

});