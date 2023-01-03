import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #fragment', function() {
    beforeEach(async function() {
        await exec((_) => {
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
            await exec((_) => {
                const query = $('template');
                const fragment = query.fragment();
                return fragment.length === 1 && fragment.get(0) instanceof DocumentFragment;
            }),
            true,
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('template');
                const query2 = query1.fragment();
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });
});
