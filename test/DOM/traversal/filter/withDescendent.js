const assert = require('assert');
const { exec } = require('../../../setup');

describe('#withDescendent', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1">' +
                '<span id="span1">' +
                '<a id="a1"></a>' +
                '</span>' +
                '</div>' +
                '<div id="div2"></div>' +
                '<div id="div3">' +
                '<span id="span2">' +
                '<a id="a2"></a>' +
                '</span>' +
                '</div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes with a descendent matching a filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withDescendent('div', 'a')
                    .map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withDescendent(
                    document.getElementById('div1'),
                    'a'
                ).map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withDescendent(
                    document.querySelectorAll('div'),
                    'a'
                ).map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withDescendent(
                    document.body.children,
                    'a'
                ).map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div></div>'
                );
                fragment.id = 'fragment';
                return dom.withDescendent(fragment, 'div')
                    .map(node => node.id);
            }),
            [
                'fragment'
            ]
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div></div>'
                );
                shadow.appendChild(fragment);
                shadow.id = 'shadow';
                return dom.withDescendent(shadow, 'div')
                    .map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withDescendent(document, 'div')
                    .map(node => node.id)
            ),
            [
                'document'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withDescendent([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4')
                ], 'a').map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withDescendent(
                    'div',
                    node => node.id === 'a1'
                ).map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withDescendent(
                    'div',
                    document.getElementById('a1')
                ).map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withDescendent(
                    'div',
                    document.querySelectorAll('a')
                ).map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withDescendent(
                    'div',
                    document.getElementById('span1').children
                ).map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withDescendent('div', [
                    document.getElementById('a1'),
                    document.getElementById('a2')
                ]).map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

});