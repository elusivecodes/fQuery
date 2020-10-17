const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #notOne', function() {

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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .notOne('[data-filter="test"]')
                    .get()
                    .map(node => node.id)
            ),
            [
                'div2'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.notOne('[data-filter="test"]');
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.queryMutable(fragment)
                    .notOne('[data-filter="test"]')
                    .get()
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
                shadow.id = 'shadow';
                return dom.queryMutable(shadow)
                    .notOne('[data-filter="test"]')
                    .get()
                    .map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .notOne(node => node.dataset.filter === 'test')
                    .get()
                    .map(node => node.id)
            ),
            [
                'div2'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .notOne(
                        document.getElementById('div1')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'div2'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .notOne(
                        document.querySelectorAll('[data-filter="test"]')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'div2'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .notOne(
                        document.body.children
                    )
                    .get()
                    .map(node => node.id)
            ),
            []
        );
    });

    it('works with DocumentFragment filter', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.queryMutable([fragment])
                    .notOne(fragment)
                    .get();
            }),
            []
        );
    });

    it('works with ShadowRoot filter', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return dom.queryMutable([shadow])
                    .notOne(shadow)
                    .get();
            }),
            []
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .notOne([
                        document.getElementById('div1'),
                        document.getElementById('div3')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'div2'
            ]
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const query = dom.queryMutable('[data-filter="test"]');
                return dom.queryMutable('div')
                    .notOne(query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'div2'
            ]
        );
    });

});