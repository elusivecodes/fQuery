const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #fragment', function() {

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
                const query = dom.queryMutable('template');
                const fragment = query.fragment();
                return fragment.length === 1 && fragment.get(0) instanceof DocumentFragment;
            }),
            true
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('template');
                return query === query.fragment();
            }),
            true
        );
    });

});