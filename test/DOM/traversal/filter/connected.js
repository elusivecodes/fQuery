import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#connected', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>';
        });
    });

    it('returns nodes connected to the DOM', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.connected('div')
                    .map((node) => node.id),
            ),
            [
                'div1',
                'div2',
            ],
        );
    });

    it('filters out nodes not connected to the DOM', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.connected(
                    document.createElement('div'),
                ),
            ),
            [],
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.connected(
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
                $.connected(
                    document.querySelectorAll('div'),
                ).map((node) => node.id),
            ),
            [
                'div1',
                'div2',
            ],
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.connected(
                    document.body.children,
                ).map((node) => node.id),
            ),
            [
                'div1',
                'div2',
            ],
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const fragment = document.createDocumentFragment();
                return $.connected(fragment);
            }),
            [],
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const div = document.getElementById('div1');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return $.connected(shadow)
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
                $.connected([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                ]).map((node) => node.id),
            ),
            [
                'div1',
                'div2',
            ],
        );
    });
});
