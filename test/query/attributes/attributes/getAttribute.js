import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #getAttribute', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<input type="text" id="test1" required>' +
                '<input type="number" id="test2">';
        });
    });

    it('returns an object with all attributes for the first node', async function() {
        assert.deepStrictEqual(
            await exec((_) =>
                $('input')
                    .getAttribute(),
            ),
            {
                type: 'text',
                id: 'test1',
                required: '',
            },
        );
    });

    it('returns an attribute value for the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('input')
                    .getAttribute('type'),
            ),
            'text',
        );
    });

    it('returns null for an undefined property', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('input')
                    .getAttribute('disabled'),
            ),
            null,
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('#invalid')
                    .getAttribute('type'),
            ),
            undefined,
        );
    });
});
