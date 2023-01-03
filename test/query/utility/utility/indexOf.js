import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #indexOf', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2" class="test"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4" class="test"></div>';
        });
    });

    it('returns the index of the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .indexOf(),
            ),
            0,
        );
    });

    it('returns the index of the first node matching a filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .indexOf('.test'),
            ),
            1,
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                return $(fragment)
                    .indexOf();
            }),
            0,
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                return $(shadow)
                    .indexOf();
            }),
            0,
        );
    });

    it('works with function filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .indexOf((node) => node.id === 'div2'),
            ),
            1,
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .indexOf(
                        document.getElementById('div2'),
                    ),
            ),
            1,
        );
    });

    it('works with NodeList filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .indexOf(
                        document.querySelectorAll('.test'),
                    ),
            ),
            1,
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .indexOf(
                        document.body.children,
                    ),
            ),
            0,
        );
    });

    it('works with DocumentFragment filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                return $([
                    document.getElementById('div2'),
                    document.getElementById('div4'),
                    fragment,
                ]).indexOf(fragment);
            }),
            2,
        );
    });

    it('works with ShadowRoot filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                return $([
                    document.getElementById('div2'),
                    document.getElementById('div4'),
                    shadow,
                ]).indexOf(shadow);
            }),
            2,
        );
    });

    it('works with array filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .indexOf([
                        document.getElementById('div2'),
                        document.getElementById('div4'),
                    ]),
            ),
            1,
        );
    });

    it('works with QuerySet filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('.test');
                return $('div')
                    .indexOf(query);
            }),
            1,
        );
    });
});
