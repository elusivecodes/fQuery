import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #index', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2" class="test"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4" class="test"></div>';
        });
    });

    it('returns the index of the first node relative to the parent', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('.test')
                    .index(),
            ),
            1,
        );
    });
});
