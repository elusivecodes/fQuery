import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet Iterator', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('allows iteration of nodes in the set', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const results = [];
                const query = $('div');
                for (const node of query) {
                    results.push(node.id);
                }
                return results;
            }),
            [
                'div1',
                'div2',
                'div3',
                'div4',
            ],
        );
    });
});
