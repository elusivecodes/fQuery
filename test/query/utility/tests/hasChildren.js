import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #hasChildren', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1" class="test">' +
                '<span></span>' +
                '</div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test">' +
                '<span></span>' +
                '</div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node has children', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .hasChildren(),
            ),
            true,
        );
    });

    it('returns false if no nodes have children', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div:not(.test)')
                    .hasChildren(),
            ),
            false,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div></div>',
                );
                return $(fragment)
                    .hasChildren();
            }),
            true,
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div></div>',
                );
                shadow.appendChild(fragment);
                return $(shadow)
                    .hasChildren();
            }),
            true,
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $(document)
                    .hasChildren(),
            ),
            true,
        );
    });
});
