const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #attachShadow', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML = '<div id="test"></div>';
        });
    });

    it('attaches a shadow root to the first node', async function() {
        assert.deepEqual(
            await exec(_ => {
                const shadow = dom.queryMutable('#test')
                    .attachShadow()
                    .get(0);
                return [
                    shadow instanceof ShadowRoot,
                    document.getElementById('test').shadowRoot instanceof ShadowRoot
                ];
            }),
            [
                true,
                true
            ]
        );
    });

    it('attaches a closed shadow root to the first node', async function() {
        assert.deepEqual(
            await exec(_ => {
                const shadow = dom.queryMutable('#test')
                    .attachShadow(false)
                    .get(0);
                return [
                    shadow instanceof ShadowRoot,
                    document.getElementById('test').shadowRoot
                ];
            }),
            [
                true,
                null
            ]
        );
    });

    it('returns a new QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query1 = dom.queryMutable('#test');
                const query2 = query1.attachShadow();
                return query2 instanceof QuerySet && query1 !== query2;
            }),
            true
        );
    });

});