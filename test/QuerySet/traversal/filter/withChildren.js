const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #withChildren', function() {

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
                dom.queryMutable('div')
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

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.withChildren();
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
                return dom.queryMutable(fragment)
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
                return dom.queryMutable(shadow)
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
                dom.queryMutable(document)
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