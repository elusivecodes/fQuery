const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #same', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes identical to other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .same('#div2, #div4')
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
                const query2 = query1.same('#div2, #div4');
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
                    .same([fragment])
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
                    .same([shadow])
                    .get()
                    .map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .equal(
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

    it('works with NodeList other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .equal(
                        document.querySelectorAll('#div2, #div4')
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

    it('works with HTMLCollection other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .equal(
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

    it('works with DocumentFragment other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return dom.query([fragment])
                    .equal(fragment)
                    .get()
                    .map(node => node.id);
            }),
            [
                'fragment'
            ]
        );
    });

    it('works with ShadowRoot other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return dom.query([shadow])
                    .equal(shadow)
                    .get()
                    .map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with array other nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .equal([
                        document.querySelector('#div2'),
                        document.querySelector('#div4')
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

    it('works with QuerySet other nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.query('#div2, #div4');
                return dom.query('div')
                    .same(query)
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