const assert = require('assert');
const { exec } = require('../../../setup');

describe('#findOneById', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<div id="child1">' +
                '<span id="test" data-id="span1"></span>' +
                '<span data-id="span2"></span>' +
                '</div>' +
                '<div id="child2">' +
                '<span id="test" data-id="span3"></span>' +
                '<span data-id="span4"></span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div id="child3">' +
                '<span id="test" data-id="span5"></span>' +
                '<span data-id="span6"></span>' +
                '</div>' +
                '<div id="child4">' +
                '<span id="test" data-id="span7"></span>' +
                '<span data-id="span8"></span>' +
                '</div>' +
                '</div>';
        });
    });

    it('finds elements by ID', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneById('test').dataset.id
            ),
            'span1'
        );
    });

    it('returns null for non-matching id', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneById('invalid')
            ),
            null
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneById('test', '#invalid')
            ),
            undefined
        );
    });

    it('works with query selector nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneById('test', '#parent2').dataset.id
            ),
            'span5'
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneById(
                    'test',
                    document.getElementById('parent2')
                ).dataset.id
            ),
            'span5'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneById(
                    'test',
                    document.querySelectorAll('#parent2')
                ).dataset.id
            ),
            'span5'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneById(
                    'test',
                    document.getElementById('parent2').children
                ).dataset.id
            ),
            'span5'
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="test" data-id="div1"></div>' +
                    '<div data-id="div2"></div>' +
                    '<div id="test" data-id="div3"></div>' +
                    '<div data-id="div4"></div>'
                );
                return dom.findOneById('test', fragment).dataset.id;
            }),
            'div1'
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="test" data-id="div1"></div>' +
                    '<div data-id="div2"></div>' +
                    '<div id="test" data-id="div3"></div>' +
                    '<div data-id="div4"></div>'
                );
                shadow.appendChild(fragment);
                return dom.findOneById('test', shadow).dataset.id;
            }),
            'div1'
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
                    '<div id="test" data-id="div1"></div>' +
                    '<div data-id="div2"></div>' +
                    '<div id="test" data-id="div3"></div>' +
                    '<div data-id="div4"></div>' +
                    '</body>' +
                    '</html>',
                    'text/html'
                );
                return dom.findOneById('test', myDoc).dataset.id;
            }),
            'div1'
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.findOneById('test', [
                    document.getElementById('child3'),
                    document.getElementById('child4')
                ]).dataset.id
            ),
            'span5'
        );
    });

});