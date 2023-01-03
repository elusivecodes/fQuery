import assert from 'node:assert/strict';
import { exec, setStyle } from './../../../setup.js';

describe('QuerySet #hasCSSAnimation', function() {
    beforeEach(async function() {
        await setStyle(
            '.test { animation: spin 4s linear infinite; }' +
            '@keyframes spin { 100% { transform: rotate(360deg); } }',
        );
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node has a CSS animation', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .hasCSSAnimation(),
            ),
            true,
        );
    });

    it('returns false if no nodes have a CSS animation', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div:not(.test)')
                    .hasCSSAnimation(),
            ),
            false,
        );
    });
});
