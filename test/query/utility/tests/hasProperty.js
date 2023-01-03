import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #hasProperty', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
            document.getElementById('div1').test = 'Test 1';
            document.getElementById('div3').test = 'Test 2';
        });
    });

    it('returns true if any node has a specified property', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .hasProperty('test'),
            ),
            true,
        );
    });

    it('returns false if no nodes have a specified property', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div:not(.test)')
                    .hasProperty('test'),
            ),
            false,
        );
    });
});
