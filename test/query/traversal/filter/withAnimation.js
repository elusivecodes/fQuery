import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #withAnimation', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
            $.fadeIn(
                '#div1',
            );
            $.fadeIn(
                '#div3',
            );
        });
    });

    it('returns nodes with animations', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
                    .withAnimation()
                    .get()
                    .map((node) => node.id),
            ),
            [
                'div1',
                'div3',
            ],
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query1 = $('div');
                const query2 = query1.withAnimation();
                return query2.constructor.name === 'QuerySet' && query1 !== query2;
            }),
            true,
        );
    });
});
