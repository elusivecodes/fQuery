import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #hasAttribute', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node has a specified attribute', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .hasAttribute('class'),
            ),
            true,
        );
    });

    it('returns false if no nodes have a specified attribute', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div:not(.test)')
                    .hasAttribute('class'),
            ),
            false,
        );
    });
});
