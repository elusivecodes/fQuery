import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #hasAnimation', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
            $.fadeIn(
                '.test',
            );
        });
    });

    it('returns true if any node has an animation', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .hasAnimation(),
            ),
            true,
        );
    });

    it('returns false if no nodes have an animation', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div:not(.test)')
                    .hasAnimation(),
            ),
            false,
        );
    });
});
