import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #last', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('reduces the nodes to the last', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .last()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div4',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const query1 = $('div');
                const query2 = query1.last();
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });
});
