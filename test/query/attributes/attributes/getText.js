import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #getText', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"><span>Test</span></div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the text contents of the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .getText(),
            ),
            'Test',
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('#invalid')
                    .getText(),
            ),
            undefined,
        );
    });
});
