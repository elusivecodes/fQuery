const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #filter', function() {

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
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .filter('[data-filter="test"]')
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
        assert.equal(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.filter('[data-filter="test"]');
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.query(fragment)
                    .filter()
                    .get()
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
                return dom.query(shadow)
                    .filter()
                    .get()
                    .map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .filter(node => node.dataset.filter === 'test')
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
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .filter(
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
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .filter(
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
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .filter(
                        document.body.children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1',
                'div2',
                'div3',
                'div4'
            ]
        );
    });

    it('works with DocumentFragment filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.query([fragment])
                    .filter(fragment)
                    .get()
                    .map(node => node.id);
            }),
            [
                'fragment'
            ]
        );
    });

    it('works with ShadowRoot filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return dom.query([shadow])
                    .filter(shadow)
                    .get()
                    .map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .filter([
                        document.getElementById('div2'),
                        document.getElementById('div4')
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
        assert.deepEqual(
            await exec(_ => {
                const query = dom.query('[data-filter="test"]');
                return dom.query('div')
                    .filter(query)
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