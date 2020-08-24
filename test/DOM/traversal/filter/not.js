const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#not', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" data-filter="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" data-filter="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes not matching a filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.not('div', '[data-filter="test"]')
                    .map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.not(
                    document.getElementById('div2'),
                    '[data-filter="test"]'
                ).map(node => node.id)
            ),
            [
                'div2'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.not(
                    document.querySelectorAll('div'),
                    '[data-filter="test"]'
                ).map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.not(
                    document.body.children,
                    '[data-filter="test"]'
                ).map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.not(fragment, '[data-filter="test"]')
                    .map(node => node.id);
            }),
            [
                'fragment'
            ]
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return dom.not(shadow, '[data-filter="test"]')
                    .map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.not([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4')
                ], '[data-filter="test"]').map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.not(
                    'div',
                    node => node.dataset.filter === 'test'
                ).map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.not(
                    'div',
                    document.getElementById('div1')
                ).map(node => node.id)
            ),
            [
                'div2',
                'div3',
                'div4'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.not(
                    'div',
                    document.querySelectorAll('[data-filter="test"]')
                ).map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.not(
                    'div',
                    document.body.children
                )
            ),
            []
        );
    });

    it('works with DocumentFragment filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.not(fragment, fragment);
            }),
            []
        );
    });

    it('works with ShadowRoot filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return dom.not(shadow, shadow);
            }),
            []
        );
    });

    it('works with array filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.not('div', [
                    document.getElementById('div1'),
                    document.getElementById('div3')
                ]).map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

});