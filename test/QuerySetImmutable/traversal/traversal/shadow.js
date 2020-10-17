const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #shadow', function() {

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
        assert.strictEqual(
            await exec(_ => {
                const query = dom.query('div');
                const shadow = query.shadow();
                return shadow.length === 1 && shadow.get(0) instanceof ShadowRoot;
            }),
            true
        );
    });

    it('returns an empty QuerySet for closed shadow roots', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.query('#div2');
                const shadow = query.shadow();
                return shadow.length === 0;
            }),
            true
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.shadow();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

});