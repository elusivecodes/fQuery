const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #withChildren', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1">' +
                '<span></span>' +
                '</div>' +
                '<div id="div2"></div>' +
                '<div id="div3">' +
                '<span></span>' +
                '</div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes with children', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .withChildren()
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
                const query2 = query1.withChildren();
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
                    .withChildren()
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
                    .withChildren()
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
                    .withChildren()
                    .get()
                    .map(node => node.id)
            ),
            [
                'document'
            ]
        );
    });

});