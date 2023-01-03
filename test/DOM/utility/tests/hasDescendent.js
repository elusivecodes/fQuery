import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#hasDescendent', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1" class="test">' +
                '<span id="span1">' +
                '<a id="a1"></a>' +
                '</span>' +
                '</div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test">' +
                '<span id="span2">' +
                '<a id="a2"></a>' +
                '</span>' +
                '</div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node has a descendent matching a filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDescendent('div', 'a'),
            ),
            true,
        );
    });

    it('returns false if no nodes have a descendent matching a filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDescendent('div:not(.test)', 'a'),
            ),
            false,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDescendent(
                    document.getElementById('div1'),
                    'a',
                ),
            ),
            true,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDescendent(
                    document.body.children,
                    'a',
                ),
            ),
            true,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDescendent(
                    document.querySelectorAll('div'),
                    'a',
                ),
            ),
            true,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div></div>',
                );
                return $.hasDescendent(fragment, 'div');
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
                return $.hasDescendent(shadow, 'div');
            }),
            true,
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDescendent(document, 'div'),
            ),
            true,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDescendent([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4'),
                ], 'a'),
            ),
            true,
        );
    });

    it('works with function filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDescendent(
                    'div',
                    (node) => node.id === 'a1',
                ),
            ),
            true,
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDescendent(
                    'div',
                    document.getElementById('a1'),
                ),
            ),
            true,
        );
    });

    it('works with NodeList filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDescendent(
                    'div',
                    document.querySelectorAll('a'),
                ),
            ),
            true,
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDescendent(
                    'div',
                    document.getElementById('span1').children,
                ),
            ),
            true,
        );
    });

    it('works with array filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDescendent('div', [
                    document.getElementById('a1'),
                    document.getElementById('a2'),
                ]),
            ),
            true,
        );
    });
});
