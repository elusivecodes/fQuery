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

    it('reduces the nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('div')
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

    it('reduces the node at an index', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .get(1).id,
            ),
            'div2',
        );
    });
});
