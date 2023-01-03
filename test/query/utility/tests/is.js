import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #is', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node matches a filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .is('.test'),
            ),
            true,
        );
    });

    it('returns false if no nodes match a filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div:not(.test)')
                    .is('.test'),
            ),
            false,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                return $(fragment)
                    .is();
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
                    .is();
            }),
            true,
        );
    });

    it('works with function filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .is((node) => node.classList.contains('test')),
            ),
            true,
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .is(
                        document.getElementById('div1'),
                    ),
            ),
            true,
        );
    });

    it('works with NodeList filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .is(
                        document.querySelectorAll('div'),
                    ),
            ),
            true,
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .is(
                        document.body.children,
                    ),
            ),
            true,
        );
    });

    it('works with DocumentFragment filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                return $([fragment])
                    .is(fragment);
            }),
            true,
        );
    });

    it('works with ShadowRoot filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                return $([shadow])
                    .is(shadow);
            }),
            true,
        );
    });

    it('works with array filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .is([
                        document.getElementById('div1'),
                        document.getElementById('div2'),
                        document.getElementById('div3'),
                        document.getElementById('div4'),
                    ]),
            ),
            true,
        );
    });

    it('works with QuerySet filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('div');
                return $('div')
                    .is(query);
            }),
            true,
        );
    });
});
