import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#hasChildren', function() {
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
                $.hasChildren('div'),
            ),
            true,
        );
    });

    it('returns false if no nodes have children', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasChildren('div:not(.test)'),
            ),
            false,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasChildren(
                    document.getElementById('div1'),
                ),
            ),
            true,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasChildren(
                    document.querySelectorAll('div'),
                ),
            ),
            true,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasChildren(
                    document.body.children,
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
                return $.hasChildren(fragment);
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
                return $.hasChildren(shadow);
            }),
            true,
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasChildren(document),
            ),
            true,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasChildren([
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
