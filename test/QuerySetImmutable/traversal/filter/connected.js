const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #connected', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>';
        });
    });

    it('returns nodes connected to the DOM', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .connected()
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1',
                'div2'
            ]
        );
    });

    it('filters out nodes not connected to the DOM', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query(
                    document.createElement('div')
                ).connected().get()
            ),
            []
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.equal(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.connected();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                return dom.query(fragment)
                    .connected()
                    .get();
            }),
            []
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const div = document.getElementById('div1');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return dom.query(shadow)
                    .connected()
                    .get()
                    .map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

});