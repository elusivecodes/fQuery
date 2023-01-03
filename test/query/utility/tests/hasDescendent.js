import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #hasDescendent', function() {
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
                $('div')
                    .hasDescendent('a'),
            ),
            true,
        );
    });

    it('returns false if no nodes have a descendent matching a filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div:not(.test)')
                    .hasDescendent('a'),
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
                    .hasDescendent('div');
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
                    .hasDescendent('div');
            }),
            true,
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $(document)
                    .hasDescendent('div'),
            ),
            true,
        );
    });

    it('works with function filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .hasDescendent((node) => node.id === 'a1'),
            ),
            true,
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .hasDescendent(
                        document.getElementById('a1'),
                    ),
            ),
            true,
        );
    });

    it('works with NodeList filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .hasDescendent(
                        document.querySelectorAll('a'),
                    ),
            ),
            true,
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .hasDescendent(
                        document.getElementById('span1').children,
                    ),
            ),
            true,
        );
    });

    it('works with array filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .hasDescendent([
                        document.getElementById('a1'),
                        document.getElementById('a2'),
                    ]),
            ),
            true,
        );
    });

    it('works with QuerySet filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('a');
                return $('div')
                    .hasDescendent(query);
            }),
            true,
        );
    });
});
