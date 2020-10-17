const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #connected', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>';
        });
    });

    it('returns nodes connected to the DOM', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('div')
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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable(
                    document.createElement('div')
                ).connected().get()
            ),
            []
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.connected();
            }),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                return dom.queryMutable(fragment)
                    .connected()
                    .get();
            }),
            []
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const div = document.getElementById('div1');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return dom.queryMutable(shadow)
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