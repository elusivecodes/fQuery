import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#same', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes identical to other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.same('div', '#div2, #div4')
                    .map((node) => node.id),
            ),
            [
                'div2',
                'div4',
            ],
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.same(
                    document.getElementById('div2'),
                    '#div2, #div4',
                ).map((node) => node.id),
            ),
            [
                'div2',
            ],
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.same(
                    document.querySelectorAll('div'),
                    '#div2, #div4',
                ).map((node) => node.id),
            ),
            [
                'div2',
                'div4',
            ],
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.same(
                    document.body.children,
                    '#div2, #div4',
                ).map((node) => node.id),
            ),
            [
                'div2',
                'div4',
            ],
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return $.same(
                    fragment,
                    [
                        fragment,
                    ],
                ).map((node) => node.id);
            }),
            [
                'fragment',
            ],
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return $.same(shadow, shadow)
                    .map((node) => node.id);
            }),
            [
                'shadow',
            ],
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.same([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4'),
                ], '#div2, #div4').map((node) => node.id),
            ),
            [
                'div2',
                'div4',
            ],
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.same(
                    'div',
                    document.getElementById('div2'),
                ).map((node) => node.id),
            ),
            [
                'div2',
            ],
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.same(
                    'div',
                    document.querySelectorAll('#div2, #div4'),
                ).map((node) => node.id),
            ),
            [
                'div2',
                'div4',
            ],
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.same(
                    'div',
                    document.body.children,
                ).map((node) => node.id),
            ),
            [
                'div1',
                'div2',
                'div3',
                'div4',
            ],
        );
    });

    it('works with DocumentFragment other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return $.same(
                    [
                        fragment,
                    ],
                    fragment,
                ).map((node) => node.id);
            }),
            [
                'fragment',
            ],
        );
    });

    it('works with ShadowRoot other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return $.same(
                    [
                        document.querySelector('#div1'),
                        shadow,
                    ],
                    shadow,
                ).map((node) => node.id);
            }),
            [
                'shadow',
            ],
        );
    });

    it('works with array other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.same('div', [
                    document.querySelector('#div2'),
                    document.querySelector('#div4'),
                ]).map((node) => node.id),
            ),
            [
                'div2',
                'div4',
            ],
        );
    });
});
