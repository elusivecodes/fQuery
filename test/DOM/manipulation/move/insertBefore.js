const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#insertBefore', function() {

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

    it('inserts each node before each other node', async function() {
        assert.equal(
            await exec(_ => {
                dom.insertBefore(
                    'a',
                    'div'
                );
                return document.body.innerHTML;
            }),
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>'
        );
    });

    it('clones all copies except last', async function() {
        assert.equal(
            await exec(_ => {
                const element1 = document.querySelector('#parent1 > .test1');
                dom.insertBefore(
                    'a',
                    'div'
                );
                const element2 = document.querySelector('#parent1 ~ .test1');
                return element1.isSameNode(element2);
            }),
            true
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.insertBefore(
                    document.querySelector('.test1'),
                    'div'
                );
                return document.body.innerHTML;
            }),
            '<a href="#" class="test1">Test</a>' +
            '<div id="parent1">' +
            '<span></span>' +
            '<a href="#" class="test2">Test</a>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.insertBefore(
                    document.querySelectorAll('a'),
                    'div'
                );
                return document.body.innerHTML;
            }),
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.insertBefore(
                    document.getElementById('parent1').children,
                    'div'
                );
                return document.body.innerHTML;
            }),
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<div id="parent1">' +
            '</div>' +
            '<span></span>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '</div>'
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div><span></span></div>'
                );
                dom.insertBefore(
                    fragment,
                    'div'
                );
                return document.body.innerHTML;
            }),
            '<div><span></span></div>' +
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
            '</div>'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.insertBefore(
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
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>'
        );
    });

    it('works with HTML nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.insertBefore(
                    '<div><span></span></div>',
                    'div'
                );
                return document.body.innerHTML;
            }),
            '<div><span></span></div>' +
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
            '</div>'
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.insertBefore(
                    'a',
                    document.getElementById('parent1')
                );
                return document.body.innerHTML;
            }),
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>'
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.insertBefore(
                    'a',
                    document.querySelectorAll('div')
                );
                return document.body.innerHTML;
            }),
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>'
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.insertBefore(
                    'a',
                    document.body.children
                );
                return document.body.innerHTML;
            }),
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>'
        );
    });

    it('works with array other nodes', async function() {
        assert.equal(
            await exec(_ => {
                dom.insertBefore(
                    'a',
                    [
                        document.getElementById('parent1'),
                        document.getElementById('parent2')
                    ]
                );
                return document.body.innerHTML;
            }),
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent1">' +
            '<span></span>' +
            '</div>' +
            '<a href="#" class="test1">Test</a>' +
            '<a href="#" class="test2">Test</a>' +
            '<a href="#" class="test3">Test</a>' +
            '<a href="#" class="test4">Test</a>' +
            '<div id="parent2">' +
            '<span></span>' +
            '</div>'
        );
    });

});