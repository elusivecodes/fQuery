import assert from 'node:assert/strict';
import { exec, setStyle } from './../../../setup.js';

describe('#hasCSSTransition', function() {
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
                $.hasCSSTransition('div'),
            ),
            true,
        );
    });

    it('returns false if no nodes have a CSS transition', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasCSSTransition('div:not(.test)'),
            ),
            false,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasCSSTransition(
                    document.getElementById('div1'),
                ),
            ),
            true,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasCSSTransition(
                    document.querySelectorAll('div'),
                ),
            ),
            true,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasCSSTransition(
                    document.body.children,
                ),
            ),
            true,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasCSSTransition([
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
