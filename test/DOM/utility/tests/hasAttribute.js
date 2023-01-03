import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#hasAttribute', function() {
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
                $.hasAttribute('div', 'class'),
            ),
            true,
        );
    });

    it('returns false if no nodes have a specified attribute', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasAttribute('div:not(.test)', 'class'),
            ),
            false,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasAttribute(
                    document.getElementById('div1'),
                    'class',
                ),
            ),
            true,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasAttribute(
                    document.querySelectorAll('div'),
                    'class',
                ),
            ),
            true,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasAttribute(
                    document.body.children,
                    'class',
                ),
            ),
            true,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasAttribute([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4'),
                ], 'class'),
            ),
            true,
        );
    });
});
