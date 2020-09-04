const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #withDescendent', function() {

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
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .withDescendent('a')
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('returns nodes with a descendent matching a custom selector filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .withDescendent('> span > a')
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.equal(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.withDescendent('a');
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div></div>'
                );
                fragment.id = 'fragment';
                return dom.query(fragment)
                    .withDescendent('div')
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
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div></div>'
                );
                shadow.appendChild(fragment);
                shadow.id = 'shadow';
                return dom.query(shadow)
                    .withDescendent('div')
                    .get()
                    .map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with Document nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query(document)
                    .withDescendent('div')
                    .get()
                    .map(node => node.id)
            ),
            [
                'document'
            ]
        );
    });

    it('works with function filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .withDescendent(node => node.id === 'a1')
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .withDescendent(
                        document.getElementById('a1')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .withDescendent(
                        document.querySelectorAll('a')
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .withDescendent(
                        document.getElementById('span1').children
                    )
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('works with array filter', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .withDescendent([
                        document.getElementById('a1'),
                        document.getElementById('a2')
                    ])
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with QuerySet filter', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.query('a');
                return dom.query('div')
                    .withDescendent(query)
                    .get()
                    .map(node => node.id);
            }),
            [
                'div1',
                'div3'
            ]
        );
    });

});