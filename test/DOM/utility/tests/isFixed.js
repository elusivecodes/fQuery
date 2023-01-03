import assert from 'node:assert/strict';
import { exec, setStyle } from './../../../setup.js';

describe('#isFixed', function() {
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
                $.isFixed('div'),
            ),
            true,
        );
    });

    it('returns false if no nodes are fixed', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isFixed('div:not(.test)'),
            ),
            false,
        );
    });

    it('returns true if any node is a descendent of a fixed node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isFixed('span'),
            ),
            true,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isFixed(
                    document.getElementById('div2'),
                ),
            ),
            true,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isFixed(
                    document.querySelectorAll('div'),
                ),
            ),
            true,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isFixed(
                    document.body.children,
                ),
            ),
            true,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.isFixed([
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
