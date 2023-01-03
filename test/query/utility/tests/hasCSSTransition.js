import assert from 'node:assert/strict';
import { exec, setStyle } from './../../../setup.js';

describe('QuerySet #hasCSSTransition', function() {
    beforeEach(async function() {
        await setStyle('.test { transition: opacity 1s; }');
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node has a CSS transition', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .hasCSSTransition(),
            ),
            true,
        );
    });

    it('returns false if no nodes have a CSS transition', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div:not(.test)')
                    .hasCSSTransition(),
            ),
            false,
        );
    });
});
