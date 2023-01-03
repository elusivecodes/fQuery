import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #each', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('reduces the nodes to the specified index', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .eq(1)
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div2',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query1 = $('div');
                const query2 = query1.eq(1);
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });
});
