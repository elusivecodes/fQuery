import assert from 'node:assert/strict';
import { exec, setStyle } from './../../../setup.js';

describe('QuerySet #isFixed', function() {
    beforeEach(async function() {
        await setStyle('.test { position: fixed; }');
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1">' +
                '<span id="span1"></span>' +
                '</div>' +
                '<div id="div2" class="test">' +
                '<span id="span2"></span>' +
                '</div>' +
                '<div id="div3">' +
                '<span id="span3"></span>' +
                '</div>' +
                '<div id="div4" class="test">' +
                '<span id="span4"></span>' +
                '</div>';
        });
    });

    it('returns true if any node is fixed', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .isFixed(),
            ),
            true,
        );
    });

    it('returns false if no nodes are fixed', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div:not(.test)')
                    .isFixed(),
            ),
            false,
        );
    });

    it('returns true if any node is a descendent of a fixed node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('span')
                    .isFixed(),
            ),
            true,
        );
    });
});
