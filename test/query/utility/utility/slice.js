import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #slice', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('reduces the nodes to a subset of indexes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .slice(1, 3)
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div2',
                'div3',
            ],
        );
    });

    it('reduces the nodes to a subset of indexes (without end)', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .slice(1)
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div2',
                'div3',
                'div4',
            ],
        );
    });

    it('reduces the nodes to a subset of indexes (without start)', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .slice()
                    .get()
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

    it('returns a new QuerySet', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query1 = $('div');
                const query2 = query1.slice();
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });
});
