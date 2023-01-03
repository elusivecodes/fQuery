import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#hasClass', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node has a specified class', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasClass('div', 'test'),
            ),
            true,
        );
    });

    it('returns false if no nodes have a specified class', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasClass('div:not(.test)', 'test'),
            ),
            false,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasClass(
                    document.getElementById('div1'),
                    'test',
                ),
            ),
            true,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasClass(
                    document.querySelectorAll('div'),
                    'test',
                ),
            ),
            true,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasClass(
                    document.body.children,
                    'test',
                ),
            ),
            true,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasClass([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4'),
                ], 'test'),
            ),
            true,
        );
    });
});
