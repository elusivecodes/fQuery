const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#appendTo', function() {

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
                dom.appendTo(
                    'a',
                    'div'
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

    it('clones all copies except last', async function() {
        assert.equal(
            await exec(_ => {
                const element1 = document.querySelector('#parent1 > .test1');
                dom.appendTo(
                    'a',
                    'div'
                );
                const element2 = document.querySelector('#parent2 > .test1');
                return element1.isSameNode(element2);
            }),
            true
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.appendTo(
                    document.querySelector('.test1'),
                    'div'
                );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<a href="#" class="test2">Test</a>' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '</div>' +
            '<div id="parent2">' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '</div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.appendTo(
                    document.querySelectorAll('a'),
                    'div'
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

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.appendTo(
                    document.getElementById('parent1').children,
                    'div'
                );
                return document.body.innerHTML;
            }),
            '<div id="parent1">' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<span></span>' +
            '</div>' +
            '<div id="parent2">' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
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
                dom.appendTo(
                    'a',
                    fragment
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
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>'
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const span = document.createElement('span');
                shadow.appendChild(span);
                dom.appendTo(
                    'a',
                    shadow
                );
                return shadow.innerHTML;
            }),
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>'
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                const myDoc = new Document();
                dom.appendTo(
                    myDoc.createElement('html'),
                    myDoc
                );
                return myDoc.childNodes.length;
            }),
            1
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.appendTo(
                    [
                        document.querySelector('.test1'),
                        document.querySelector('.test2'),
                        document.querySelector('.test3'),
                        document.querySelector('.test4')
                    ],
                    'div'
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

    it('works with HTMLElement other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.appendTo(
                    'a',
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
                dom.appendTo(
                    'a',
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
                dom.appendTo(
                    'a',
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
                    '<div><span></span></div>'
                );
                dom.appendTo(
                    fragment,
                    'div'
                );
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

    it('works with array other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.appendTo(
                    'a',
                    [
                        document.getElementById('parent1'),
                        document.getElementById('parent2')
                    ]
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

    it('works with HTML other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.appendTo(
                    '<div><span></span></div>',
                    'div'
                );
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

});