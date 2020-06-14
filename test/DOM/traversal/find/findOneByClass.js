const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#findOneByClass', function() {

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
                '<div id="child4">' +
                '<span id="span7" class="test"></span>' +
                '<span id="span8"></span>' +
                '</div>' +
                '</div>';
        });
    });

    it('finds elements by class name', async function() {
        assert.equal(
            await exec(_ => {
                return dom.findOneByClass(
                    'test'
                ).id;
            }),
            'span1'
        );
    });

    it('returns null for non-matching class', async function() {
        assert.equal(
            await exec(_ => {
                return dom.findOneByClass(
                    'invalid'
                );
            }),
            null
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.findOneByClass(
                    'test',
                    '#invalid'
                );
            }),
            undefined
        );
    });

    it('works with query selector nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.findOneByClass(
                    'test',
                    '#parent2'
                ).id;
            }),
            'span5'
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.findOneByClass(
                    'test',
                    document.getElementById('parent2')
                ).id;
            }),
            'span5'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.findOneByClass(
                    'test',
                    document.querySelectorAll('#parent2')
                ).id;
            }),
            'span5'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.findOneByClass(
                    'test',
                    document.getElementById('parent2').children
                ).id;
            }),
            'span5'
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1" class="test"></div>' +
                    '<div id="div2"></div>' +
                    '<div id="div3" class="test"></div>' +
                    '<div id="div4"></div>'
                );
                return dom.findOneByClass(
                    'test',
                    fragment
                ).id;
            }),
            'div1'
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
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
                return dom.findOneByClass(
                    'test',
                    shadow
                ).id;
            }),
            'div1'
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
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
                return dom.findOneByClass(
                    'test',
                    myDoc
                ).id;
            }),
            'div1'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ => {
                return dom.findOneByClass(
                    'test',
                    [
                        document.getElementById('child3'),
                        document.getElementById('child4')
                    ]
                ).id;
            }),
            'span5'
        );
    });

});