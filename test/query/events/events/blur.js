import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #blur', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<input type="text" id="test1">' +
                '<input type="text" id="test2">';
        });
    });

    it('triggers a blur event on the first node', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('blur', (_) => {
                    result = true;
                });
                element.focus();
                $('input')
                    .blur();
                return result;
            }),
            true,
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                document.getElementById('test1').focus();
                const query = $('input');
                return query === query.blur();
            }),
            true,
        );
    });
});
