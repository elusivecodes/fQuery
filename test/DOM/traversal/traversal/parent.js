import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#parent', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<div id="child1">' +
                '<span id="span1">' +
                '<a id="a1"></a>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div id="child2">' +
                '<span id="span2">' +
                '<a id="a2"></a>' +
                '</span>' +
                '</div>' +
                '</div>';
        });
    });

    it('returns the parents of each node', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.parent('a')
                    .map((node) => node.id),
            ),
            [
                'span1',
                'span2',
            ],
        );
    });

    it('returns the parents of each node matching a filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.parent('a', '#span2')
                    .map((node) => node.id),
            ),
            [
                'span2',
            ],
        );
    });

    it('returns an empty array for empty nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.parent('#invalid'),
            ),
            [],
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.parent(
                    document.getElementById('a2'),
                    '#span2',
                ).map((node) => node.id),
            ),
            [
                'span2',
            ],
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.parent(
                    document.querySelectorAll('a'),
                    '#span2',
                ).map((node) => node.id),
            ),
            [
                'span2',
            ],
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.parent(
                    document.getElementById('span2').children,
                    '#span2',
                ).map((node) => node.id),
            ),
            [
                'span2',
            ],
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.parent([
                    document.getElementById('a1'),
                    document.getElementById('a2'),
                ], '#span2',
                ).map((node) => node.id),
            ),
            [
                'span2',
            ],
        );
    });

    it('works with function filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.parent(
                    'a',
                    (node) => node.id === 'span2',
                ).map((node) => node.id),
            ),
            [
                'span2',
            ],
        );
    });

    it('works with HTMLElement filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.parent(
                    'a',
                    document.getElementById('span2'),
                ).map((node) => node.id),
            ),
            [
                'span2',
            ],
        );
    });

    it('works with NodeList filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.parent(
                    'a',
                    document.querySelectorAll('#span2'),
                ).map((node) => node.id),
            ),
            [
                'span2',
            ],
        );
    });

    it('works with HTMLCollection filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.parent(
                    'a',
                    document.getElementById('child2').children,
                ).map((node) => node.id),
            ),
            [
                'span2',
            ],
        );
    });

    it('works with array filter', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $.parent('a', [
                    document.getElementById('span2'),
                ]).map((node) => node.id),
            ),
            [
                'span2',
            ],
        );
    });
});
