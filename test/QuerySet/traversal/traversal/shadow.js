const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #shadow', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>';
            document.getElementById('div1').attachShadow({ mode: 'open' });
            document.getElementById('div2').attachShadow({ mode: 'closed' });
        });
    });

    it('returns the shadow root of the first node', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('div');
                const shadow = query.shadow();
                return shadow.length === 1 && shadow.get(0) instanceof ShadowRoot;
            }),
            true
        );
    });

    it('returns an empty QuerySet for closed shadow roots', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('#div2');
                const shadow = query.shadow();
                return shadow.length === 0;
            }),
            true
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.shadow();
            }),
            true
        );
    });

});