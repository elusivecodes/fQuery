import assert from 'node:assert/strict';
import { exec, setStyle } from './../../../setup.js';

describe('#isVisible', function() {
    beforeEach(async function() {
        await setStyle('.test { display: none; }');
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1">' +
                '<span></span>' +
                '</div>' +
                '<div id="div2" class="test">' +
                '<span></span>' +
                '</div>' +
                '<div id="div3">' +
                '<span></span>' +
                '</div>' +
                '<div id="div4" class="test">' +
                '<span></span>' +
                '</div>';
        });
    });

    it('returns true if any node is visible', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isVisible('div'),
            ),
            true,
        );
    });

    it('returns false if no nodes are visible', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isVisible('.test'),
            ),
            false,
        );
    });

    it('returns true if any node is a descendent of a visible node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isVisible('span'),
            ),
            true,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isVisible(
                    document.getElementById('div1'),
                ),
            ),
            true,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isVisible(
                    document.querySelectorAll('div'),
                ),
            ),
            true,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isVisible(
                    document.body.children,
                ),
            ),
            true,
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isVisible(document),
            ),
            true,
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isVisible(window),
            ),
            true,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isVisible([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4'),
                ]),
            ),
            true,
        );
    });
});
