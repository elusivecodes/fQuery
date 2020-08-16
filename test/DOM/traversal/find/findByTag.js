const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#findByTag', function() {

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
        assert.deepEqual(
            await exec(_ =>
                dom.findByTag('span')
                    .map(node => node.id)
            ),
            [
                'span1',
                'span2',
                'span3',
                'span4',
                'span5',
                'span6',
                'span7',
                'span8'
            ]
        );
    });

    it('returns an empty array for non-matching tag', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.findByTag('invalid')
            ),
            []
        );
    });

    it('returns an empty array for empty nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.findByTag('test', '#invalid')
            ),
            []
        );
    });

    it('works with query selector nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.findByTag('span', '#parent1')
                    .map(node => node.id)
            ),
            [
                'span1',
                'span2',
                'span3',
                'span4'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.findByTag(
                    'span',
                    document.getElementById('parent1')
                ).map(node => node.id)
            ),
            [
                'span1',
                'span2',
                'span3',
                'span4'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.findByTag(
                    'span',
                    document.querySelectorAll('#parent1')
                ).map(node => node.id)
            ),
            [
                'span1',
                'span2',
                'span3',
                'span4'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.findByTag(
                    'span',
                    document.getElementById('parent1').children
                ).map(node => node.id)
            ),
            [
                'span1',
                'span2',
                'span3',
                'span4'
            ]
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<span id="span1"></span>' +
                    '<span id="span2"></span>'
                );
                return dom.findByTag('span', fragment)
                    .map(node => node.id);
            }),
            [
                'span1',
                'span2'
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
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<span id="span1"></span>' +
                    '<span id="span2"></span>'
                );
                shadow.appendChild(fragment);
                return dom.findByTag('span', shadow)
                    .map(node => node.id);
            }),
            [
                'span1',
                'span2'
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
                    '<div id="div1"></div>' +
                    '<div id="div2"></div>' +
                    '<span id="span1"></span>' +
                    '<span id="span2"></span>' +
                    '</body>' +
                    '</html>',
                    'text/html'
                );
                return dom.findByTag('span', myDoc)
                    .map(node => node.id);
            }),
            [
                'span1',
                'span2'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.findByTag('span', [
                    document.getElementById('child1'),
                    document.getElementById('child2')
                ]).map(node => node.id)
            ),
            [
                'span1',
                'span2',
                'span3',
                'span4'
            ]
        );
    });

});