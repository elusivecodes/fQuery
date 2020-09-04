const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #isEqual', function() {

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
                '</div>' +
                '<div id="parent2">' +
                '<a data-id="a1"></a>' +
                '<a data-id="a2"></a>' +
                '<a data-id="a3"></a>' +
                '</div>';
        });
    });

    it('returns true if any node is equal to any other node', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('#parent1 span')
                    .isEqual('#parent2 span')
            ),
            true
        );
    });

    it('returns false if no nodes are equal to any other node', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('#parent1 span')
                    .isEqual('#parent3 a')
            ),
            false
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const fragment1 = document.createDocumentFragment();
                const fragment2 = document.createDocumentFragment();
                return dom.query(fragment1)
                    .isEqual([fragment2]);
            }),
            true
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div1 = document.createElement('div');
                const div2 = document.createElement('div');
                const shadow1 = div1.attachShadow({ mode: 'open' });
                const shadow2 = div2.attachShadow({ mode: 'closed' });
                return dom.query(shadow1)
                    .isEqual([shadow2]);
            }),
            true
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('#parent1 span')
                    .isEqual(
                        document.querySelector('#parent2 > [data-id="span2"]')
                    )
            ),
            true
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('#parent1 span')
                    .isEqual(
                        document.querySelectorAll('#parent2 > span')
                    )
            ),
            true
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('#parent1 span')
                    .isEqual(
                        document.getElementById('parent2').children
                    )
            ),
            true
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const fragment1 = document.createDocumentFragment();
                const fragment2 = document.createDocumentFragment();
                return dom.query([fragment1])
                    .isEqual(fragment2);
            }),
            true
        );
    });

    it('works with ShadowRoot other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div1 = document.createElement('div');
                const div2 = document.createElement('div');
                const shadow1 = div1.attachShadow({ mode: 'open' });
                const shadow2 = div2.attachShadow({ mode: 'closed' });
                return dom.query([shadow1])
                    .isEqual(shadow2);
            }),
            true
        );
    });

    it('works with array other nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('#parent1 span')
                    .isEqual([
                        document.querySelector('#parent2 > [data-id="span2"]'),
                        document.querySelector('#parent2 > [data-id="span3"]')
                    ])
            ),
            true
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('#parent2 > span');
                return dom.query('#parent1 span')
                    .isEqual(query)
            }),
            true
        );
    });

});