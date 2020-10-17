const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #equal', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<span data-id="span1"></span>' +
                '<span data-id="span2"></span>' +
                '<span data-id="span3"></span>' +
                '</div>' +
                '<div id="parent2">' +
                '<span data-id="span2"></span>' +
                '<span data-id="span3"></span>' +
                '<span data-id="span4"></span>' +
                '</div>';
        });
    });

    it('returns nodes equal to other nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('#parent1 span')
                    .equal('#parent2 span')
                    .get()
                    .map(node => node.dataset.id)
            ),
            [
                'span2',
                'span3'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('#parent1 span');
                const query2 = query1.equal('#parent2 span');
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const fragment1 = document.createDocumentFragment();
                const fragment2 = document.createDocumentFragment();
                fragment1.id = 'fragment';
                return dom.query(fragment1)
                    .equal([fragment2])
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
                const div1 = document.createElement('div');
                const div2 = document.createElement('div');
                const shadow1 = div1.attachShadow({ mode: 'open' });
                const shadow2 = div2.attachShadow({ mode: 'closed' });
                shadow1.id = 'shadow';
                return dom.query(shadow1)
                    .equal([shadow2])
                    .get()
                    .map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('#parent1 span')
                    .equal(
                        document.querySelector('#parent2 > [data-id="span2"]')
                    ).get().map(node => node.dataset.id)
            ),
            [
                'span2'
            ]
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('#parent1 span')
                    .equal(
                        document.querySelectorAll('#parent2 > span')
                    ).get().map(node => node.dataset.id)
            ),
            [
                'span2',
                'span3'
            ]
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('#parent1 span')
                    .equal(
                        document.getElementById('parent2').children
                    ).get().map(node => node.dataset.id)
            ),
            [
                'span2',
                'span3'
            ]
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const fragment1 = document.createDocumentFragment();
                const fragment2 = document.createDocumentFragment();
                fragment1.id = 'fragment';
                return dom.query([fragment1])
                    .equal(fragment2)
                    .get()
                    .map(node => node.id);
            }),
            [
                'fragment'
            ]
        );
    });

    it('works with ShadowRoot other nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const div1 = document.createElement('div');
                const div2 = document.createElement('div');
                const shadow1 = div1.attachShadow({ mode: 'open' });
                const shadow2 = div2.attachShadow({ mode: 'closed' });
                shadow1.id = 'shadow';
                return dom.query([shadow1])
                    .equal(shadow2)
                    .get()
                    .map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with array other nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('#parent1 span')
                    .equal([
                        document.querySelector('#parent2 > [data-id="span2"]'),
                        document.querySelector('#parent2 > [data-id="span3"]')
                    ]).get().map(node => node.dataset.id)
            ),
            [
                'span2',
                'span3'
            ]
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const query = dom.query('#parent2 > [data-id="span2"]');
                return dom.query('#parent1 span')
                    .equal(query)
                    .get()
                    .map(node => node.dataset.id);
            }),
            [
                'span2'
            ]
        );
    });

});