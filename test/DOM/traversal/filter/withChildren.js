import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#withChildren', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1">' +
                '<span></span>' +
                '</div>' +
                '<div id="div2"></div>' +
                '<div id="div3">' +
                '<span></span>' +
                '</div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes with children', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.withChildren('div')
                    .map((node) => node.id),
            ),
            [
                'div1',
                'div3',
            ],
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.withChildren(
                    document.getElementById('div1'),
                ).map((node) => node.id),
            ),
            [
                'div1',
            ],
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.withChildren(
                    document.querySelectorAll('div'),
                ).map((node) => node.id),
            ),
            [
                'div1',
                'div3',
            ],
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.withChildren(
                    document.body.children,
                ).map((node) => node.id),
            ),
            [
                'div1',
                'div3',
            ],
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div></div>',
                );
                fragment.id = 'fragment';
                return $.withChildren(fragment)
                    .map((node) => node.id);
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
                const range = document.createRange();
                const fragment = range.createContextualFragment(
                    '<div></div>',
                );
                shadow.appendChild(fragment);
                shadow.id = 'shadow';
                return $.withChildren(shadow)
                    .map((node) => node.id);
            }),
            [
                'shadow',
            ],
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.withChildren(document)
                    .map((node) => node.id),
            ),
            [
                'document',
            ],
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.withChildren([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4'),
                ]).map((node) => node.id),
            ),
            [
                'div1',
                'div3',
            ],
        );
    });
});
