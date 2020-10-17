const assert = require('assert');
const { exec } = require('../../../setup');

describe('#findOneByTag', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<div id="child1">' +
                '<span id="span1"></span>' +
                '<span id="span2"></span>' +
                '</div>' +
                '<div id="child2">' +
                '<span id="span3"></span>' +
                '<span id="span4"></span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div id="child3">' +
                '<span id="span5"></span>' +
                '<span id="span6"></span>' +
                '</div>' +
                '<div id="child4">' +
                '<span id="span7"></span>' +
                '<span id="span8"></span>' +
                '</div>' +
                '</div>';
        });
    });

    it('finds elements by tag name', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneByTag('span').id
            ),
            'span1'
        );
    });

    it('returns null for non-matching tag', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneByTag('invalid')
            ),
            null
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneByTag('span', '#invalid')
            ),
            undefined
        );
    });

    it('works with query selector nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneByTag('span', '#parent2').id
            ),
            'span5'
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneByTag(
                    'span',
                    document.getElementById('parent2')
                ).id
            ),
            'span5'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneByTag(
                    'span',
                    document.querySelectorAll('#parent2')
                ).id
            ),
            'span5'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneByTag(
                    'span',
                    document.getElementById('parent2').children
                ).id
            ),
            'span5'
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<span id="span1"></span>' +
                    '<span id="span2"></span>'
                );
                return dom.findOneByTag('span', fragment).id;
            }),
            'span1'
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<span id="span1"></span>' +
                    '<span id="span2"></span>'
                );
                shadow.appendChild(fragment);
                return dom.findOneByTag('span', shadow).id;
            }),
            'span1'
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const parser = new DOMParser();
                const myDoc = parser.parseFromString(
                    '<html>' +
                    '<head>' +
                    '</head>' +
                    '<body>' +
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<span id="span1"></span>' +
                    '<span id="span2"></span>' +
                    '</body>' +
                    '</html>',
                    'text/html'
                );
                return dom.findOneByTag('span', myDoc).id;
            }),
            'span1'
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneByTag('span', [
                    document.getElementById('child3'),
                    document.getElementById('child4')
                ]).id
            ),
            'span5'
        );
    });

});