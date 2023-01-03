import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #hasFragment', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<template id="template1">' +
                'Test 1' +
                '</template>' +
                '<template id="template2">' +
                'Test 2' +
                '</template>' +
                '<div id="div1"></div>' +
                '<div id="div2"></div>';
        });
    });

    it('returns true if any node has a document fragment', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('template')
                    .hasFragment(),
            ),
            true,
        );
    });

    it('returns false if no nodes have a document fragment', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .hasFragment(),
            ),
            false,
        );
    });
});
