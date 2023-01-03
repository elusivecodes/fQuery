import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#sort', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes sorted by the order they appear in the DOM', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.sort('div')
                    .map((node) => node.id),
            ),
            [
                'div1',
                'div2',
                'div3',
                'div4',
            ],
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.sort(
                    document.getElementById('div2'),
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
                $.sort(
                    document.querySelectorAll('div'),
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

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.sort(
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

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                fragment.id = 'fragment';
                return $.sort(fragment)
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
                shadow.id = 'shadow';
                return $.sort(shadow)
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
                $.sort(document)
                    .map((node) => node.id),
            ),
            [
                'document',
            ],
        );
    });

    it('works with Window nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.sort(window)
                    .map((node) => node.id),
            ),
            [
                'window',
            ],
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const template = document.createElement('template');
                const fragment = template.content;
                fragment.id = 'fragment';
                const div = document.createElement('div');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                document.body.insertBefore(template, document.body.firstChild);
                document.body.insertBefore(div, document.body.firstChild);
                return $.sort([
                    fragment,
                    document.getElementById('div3'),
                    document.getElementById('div4'),
                    document.getElementById('div2'),
                    document.getElementById('div1'),
                    shadow,
                    document,
                    window,
                ]).map((node) => node.id);
            }),
            [
                'fragment',
                'shadow',
                'div1',
                'div2',
                'div3',
                'div4',
                'document',
                'window',
            ],
        );
    });
});
