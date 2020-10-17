const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #not', function() {

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
                dom.query('div')
                    .not('[data-filter="test"]')
                    .get()
                    .map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.not('[data-filter="test"]');
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.query(fragment)
                    .not('[data-filter="test"]')
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
                return dom.query(shadow)
                    .not('[data-filter="test"]')
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
                dom.query('div')
                    .not(node => node.dataset.filter === 'test')
                    .get()
                    .map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('div')
                    .not(
                        document.getElementById('div1')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'div2',
                'div3',
                'div4'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('div')
                    .not(
                        document.querySelectorAll('[data-filter="test"]')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('div')
                    .not(
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
                return dom.query([fragment])
                    .not(fragment)
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
                return dom.query([shadow])
                    .not(shadow)
                    .get();
            }),
            []
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('div')
                    .not([
                        document.getElementById('div1'),
                        document.getElementById('div3')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const query = dom.query('[data-filter="test"]');
                return dom.query('div')
                    .not(query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'div2',
                'div4'
            ]
        );
    });

});