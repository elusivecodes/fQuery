import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #isSame', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node is identical to any other node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .isSame('#div2, #div4'),
            ),
            true,
        );
    });

    it('returns false if no nodes are identical to any other node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .isSame('span'),
            ),
            false,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                return $(fragment)
                    .isSame([fragment]);
            }),
            true,
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                return $(shadow)
                    .isSame([shadow]);
            }),
            true,
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .isSame(
                        document.getElementById('div2'),
                    ),
            ),
            true,
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .isSame(
                        document.querySelectorAll('#div2, #div4'),
                    ),
            ),
            true,
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .isSame(
                        document.body.children,
                    ),
            ),
            true,
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                return $([fragment])
                    .isSame(fragment);
            }),
            true,
        );
    });

    it('works with ShadowRoot other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                return $([shadow])
                    .isSame(shadow);
            }),
            true,
        );
    });

    it('works with array other nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .isSame([
                        document.querySelector('#div2'),
                        document.querySelector('#div4'),
                    ]),
            ),
            true,
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('#div2, #div4');
                return $('div')
                    .isSame(query);
            }),
            true,
        );
    });
});
