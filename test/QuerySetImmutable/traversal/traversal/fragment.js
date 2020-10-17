const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #fragment', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<template id="template1">' +
                '</template>' +
                '<template id="template2">' +
                '</template>' +
                '<div id="div1"></div>';
        });
    });

    it('returns the document fragment of the first node', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.query('template');
                const fragment = query.fragment();
                return fragment.length === 1 && fragment.get(0) instanceof DocumentFragment;
            }),
            true
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('template');
                const query2 = query1.fragment();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

});