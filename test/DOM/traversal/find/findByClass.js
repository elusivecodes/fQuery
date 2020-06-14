const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#findByClass', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<div id="child1">' +
                '<span id="span1" class="test"></span>' +
                '<span id="span2"></span>' +
                '</div>' +
                '<div id="child2">' +
                '<span id="span3" class="test"></span>' +
                '<span id="span4"></span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div id="child3">' +
                '<span id="span5" class="test"></span>' +
                '<span id="span6"></span>' +
                '</div>' +
                '<div id="child3">' +
                '<span id="span7" class="test"></span>' +
                '<span id="span8"></span>' +
                '</div>' +
                '</div>';
        });
    });

    it('finds elements by class name', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.findByClass(
                    'test'
                ).map(node => node.id);
            }),
            [
                'span1',
                'span3',
                'span5',
                'span7'
            ]
        );
    });

    it('returns an empty array for non-matching class', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.findByClass(
                    'invalid'
                ).map(node => node.id);
            }),
            []
        );
    });

    it('returns an empty array for empty nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.findByClass(
                    'test',
                    '#invalid'
                ).map(node => node.id);
            }),
            []
        );
    });

    it('works with query selector nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.findByClass(
                    'test',
                    '#parent1'
                ).map(node => node.id);
            }),
            [
                'span1',
                'span3'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.findByClass(
                    'test',
                    document.getElementById('parent1')
                ).map(node => node.id);
            }),
            [
                'span1',
                'span3'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.findByClass(
                    'test',
                    document.querySelectorAll('#parent1')
                ).map(node => node.id);
            }),
            [
                'span1',
                'span3'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.findByClass(
                    'test',
                    document.getElementById('parent1').children
                ).map(node => node.id);
            }),
            [
                'span1',
                'span3'
            ]
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>'
                );
                return dom.findByClass(
                    'test',
                    fragment
                ).map(node => node.id);
            }),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>'
                );
                shadow.appendChild(fragment);
                return dom.findByClass(
                    'test',
                    shadow
                ).map(node => node.id);
            }),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with Document nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const parser = new DOMParser();
                const myDoc = parser.parseFromString(
                    '<html>' +
                    '<head>' +
                    '</head>' +
                    '<body>' +
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>' +
                    '</body>' +
                    '</html>',
                    'text/html'
                );
                return dom.findByClass(
                    'test',
                    myDoc
                ).map(node => node.id);
            }),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.findByClass(
                    'test',
                    [
                        document.getElementById('child1'),
                        document.getElementById('child2')
                    ]
                ).map(node => node.id);
            }),
            [
                'span1',
                'span3'
            ]
        );
    });

});