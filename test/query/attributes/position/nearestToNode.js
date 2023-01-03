import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #nearestToNode', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="fromParent">' +
                '<div id="test1" data-toggle="from" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '<div id="test2" data-toggle="from" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '</div>' +
                '<div id="toParent">' +
                '<div id="test3" data-toggle="to"></div>' +
                '<div id="test4" data-toggle="to"></div>' +
                '</div>';
            window.scrollTo(1000, 1000);
        });
    });

    it('returns the nearest node to another node', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('[data-toggle="from"]')
                    .nearestToNode('[data-toggle="to"]')
                    .get()
                    .map((node) => node.id),
            ),
            [
                'test2',
            ],
        );
    });

    it('returns an empty QuerySet for empty nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('#invalid')
                    .nearestToNode('[data-toggle="to"]')
                    .get(),
            ),
            [],
        );
    });

    it('returns an empty QuerySet for empty other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('[data-toggle="from"]')
                    .nearestToNode('#invalid')
                    .get(),
            ),
            [],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('div');
                const query2 = query1.nearestToNode('[data-toggle="to"]');
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });

    it('works with HTMLElement other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('[data-toggle="from"]')
                    .nearestToNode(
                        document.getElementById('test3'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'test2',
            ],
        );
    });

    it('works with NodeList other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('[data-toggle="from"]')
                    .nearestToNode(
                        document.querySelectorAll('[data-toggle="to"]'),
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'test2',
            ],
        );
    });

    it('works with HTMLCollection other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('[data-toggle="from"]')
                    .nearestToNode(
                        document.getElementById('toParent').children,
                    )
                    .get()
                    .map((node) => node.id),
            ),
            [
                'test2',
            ],
        );
    });

    it('works with array other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('[data-toggle="from"]')
                    .nearestToNode([
                        document.getElementById('test3'),
                        document.getElementById('test4'),
                    ])
                    .get()
                    .map((node) => node.id),
            ),
            [
                'test2',
            ],
        );
    });

    it('works with QuerySet other nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query = $('[data-toggle="to"]');
                return $('[data-toggle="from"]')
                    .nearestToNode(query)
                    .get()
                    .map((node) => node.id);
            }),
            [
                'test2',
            ],
        );
    });
});
