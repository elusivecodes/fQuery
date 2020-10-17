const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #filterOne', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2" data-filter="test"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4" data-filter="test"></div>';
        });
    });

    it('returns filtered nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .filterOne('[data-filter="test"]')
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
                return query === query.filterOne('[data-filter="test"]');
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
                    .filterOne()
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
                    .filterOne()
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
                    .filterOne(node => node.dataset.filter === 'test')
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
                    .filterOne(
                        document.getElementById('div2')
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
                    .filterOne(
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
                    .filterOne(
                        document.body.children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('works with DocumentFragment filter', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.queryMutable([fragment])
                    .filterOne(fragment)
                    .get()
                    .map(node => node.id);
            }),
            [
                'fragment'
            ]
        );
    });

    it('works with ShadowRoot filter', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return dom.queryMutable([shadow])
                    .filterOne(shadow)
                    .get()
                    .map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .filterOne([
                        document.getElementById('div2'),
                        document.getElementById('div4')
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
                    .filterOne(query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'div2'
            ]
        );
    });

});