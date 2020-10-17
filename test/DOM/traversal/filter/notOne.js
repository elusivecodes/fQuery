const assert = require('assert');
const { exec } = require('../../../setup');

describe('#notOne', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" data-filter="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" data-filter="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns the first node not matching a filter', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.notOne('div', '[data-filter="test"]').id
            ),
            'div2'
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.notOne(
                    document.getElementById('div2'),
                    '[data-filter="test"]'
                ).id
            ),
            'div2'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.notOne(
                    document.querySelectorAll('div'),
                    '[data-filter="test"]'
                ).id
            ),
            'div2'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.notOne(
                    document.body.children,
                    '[data-filter="test"]'
                ).id
            ),
            'div2'
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.notOne(fragment, '[data-filter="test"]').id;
            }),
            'fragment'
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return dom.notOne(shadow, '[data-filter="test"]').id;
            }),
            'shadow'
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.notOne([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4')
                ], '[data-filter="test"]').id
            ),
            'div2'
        );
    });

    it('works with function filter', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.notOne(
                    'div',
                    node => node.dataset.filter === 'test'
                ).id
            ),
            'div2'
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.notOne(
                    'div',
                    document.getElementById('div1')
                ).id
            ),
            'div2'
        );
    });

    it('works with NodeList filter', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.notOne(
                    'div',
                    document.querySelectorAll('[data-filter="test"]')
                ).id
            ),
            'div2'
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.notOne(
                    'div',
                    document.body.children
                )
            ),
            null
        );
    });

    it('works with DocumentFragment filter', async function() {
        assert.strictEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.notOne(
                    [
                        fragment
                    ],
                    fragment,
                );
            }),
            null
        );
    });

    it('works with ShadowRoot filter', async function() {
        assert.strictEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return dom.notOne(
                    [
                        shadow
                    ],
                    shadow
                );
            }),
            null
        );
    });

    it('works with array filter', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.notOne('div', [
                    document.getElementById('div1'),
                    document.getElementById('div3')
                ]).id
            ),
            'div2'
        );
    });

});