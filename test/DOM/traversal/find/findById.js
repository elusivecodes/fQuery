const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#findById', function() {

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
        assert.deepEqual(
            await exec(_ =>
                dom.findById('test')
                    .map(node => node.dataset.id)
            ),
            [
                'span1',
                'span3',
                'span5',
                'span7'
            ]
        );
    });

    it('returns an empty array for non-matching id', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.findById('invalid')
            ),
            []
        );
    });

    it('returns an empty array for empty nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.findById('test', '#invalid')
            ),
            []
        );
    });

    it('works with query selector nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.findById('test', '#parent1')
                    .map(node => node.dataset.id)
            ),
            [
                'span1',
                'span3'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.findById(
                    'test',
                    document.getElementById('parent1')
                ).map(node => node.dataset.id)
            ),
            [
                'span1',
                'span3'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.findById(
                    'test',
                    document.querySelectorAll('#parent1')
                ).map(node => node.dataset.id)
            ),
            [
                'span1',
                'span3'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.findById(
                    'test',
                    document.getElementById('parent1').children
                ).map(node => node.dataset.id)
            ),
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
                    '<div id="test" data-id="div1"></div>' +
                    '<div data-id="div2"></div>' +
                    '<div id="test" data-id="div3"></div>' +
                    '<div data-id="div4"></div>'
                );
                return dom.findById('test', fragment)
                    .map(node => node.dataset.id);
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
                    '<div id="test" data-id="div1"></div>' +
                    '<div data-id="div2"></div>' +
                    '<div id="test" data-id="div3"></div>' +
                    '<div data-id="div4"></div>'
                );
                shadow.appendChild(fragment);
                return dom.findById('test', shadow)
                    .map(node => node.dataset.id);
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
                    '<div id="test" data-id="div1"></div>' +
                    '<div data-id="div2"></div>' +
                    '<div id="test" data-id="div3"></div>' +
                    '<div data-id="div4"></div>' +
                    '</body>' +
                    '</html>',
                    'text/html'
                );
                return dom.findById('test', myDoc)
                    .map(node => node.dataset.id);
            }),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.findById('test', [
                    document.getElementById('child1'),
                    document.getElementById('child2')
                ]).map(node => node.dataset.id)
            ),
            [
                'span1',
                'span3'
            ]
        );
    });

});