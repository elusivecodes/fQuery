import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#filterOne', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2" data-filter="test"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4" data-filter="test"></div>';
        });
    });

    it('returns the first node matching a filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.filterOne('div', '[data-filter="test"]').id,
            ),
            'div2',
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.filterOne(
                    document.getElementById('div2'),
                    '[data-filter="test"]',
                ).id,
            ),
            'div2',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.filterOne(
                    document.querySelectorAll('div'),
                    '[data-filter="test"]',
                ).id,
            ),
            'div2',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.filterOne(
                    document.body.children,
                    '[data-filter="test"]',
                ).id,
            ),
            'div2',
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return $.filterOne(fragment).id;
            }),
            'fragment',
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return $.filterOne(shadow).id;
            }),
            'shadow',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.filterOne([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4'),
                ], '[data-filter="test"]').id,
            ),
            'div2',
        );
    });

    it('works with function filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.filterOne(
                    'div',
                    (node) => node.dataset.filter === 'test',
                ).id,
            ),
            'div2',
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.filterOne(
                    'div',
                    document.getElementById('div2'),
                ).id,
            ),
            'div2',
        );
    });

    it('works with NodeList filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.filterOne(
                    'div',
                    document.querySelectorAll('[data-filter="test"]'),
                ).id,
            ),
            'div2',
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.filterOne(
                    'div',
                    document.body.children,
                ).id,
            ),
            'div1',
        );
    });

    it('works with DocumentFragment filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return $.filterOne(
                    [
                        fragment,
                    ],
                    fragment,
                ).id;
            }),
            'fragment',
        );
    });

    it('works with ShadowRoot filter', async function() {
        assert.strictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return $.filterOne(
                    [
                        shadow,
                    ],
                    shadow,
                ).id;
            }),
            'shadow',
        );
    });

    it('works with array filter', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.filterOne('div', [
                    document.getElementById('div2'),
                    document.getElementById('div4'),
                ]).id,
            ),
            'div2',
        );
    });
});
