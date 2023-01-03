import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #click', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>';
        });
    });

    it('triggers a click event on the first node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('click', (_) => {
                    result = true;
                });
                $('a')
                    .click();
                return result;
            }),
            true,
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('a');
                return query === query.click();
            }),
            true,
        );
    });
});
