import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#withClass', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes with a specified class', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.withClass('div', 'test')
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
                $.withClass(
                    document.getElementById('div1'),
                    'test',
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
                $.withClass(
                    document.querySelectorAll('div'),
                    'test',
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
                $.withClass(
                    document.body.children,
                    'test',
                ).map((node) => node.id),
            ),
            [
                'div1',
                'div3',
            ],
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.withClass([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4'),
                ], 'test').map((node) => node.id),
            ),
            [
                'div1',
                'div3',
            ],
        );
    });
});
