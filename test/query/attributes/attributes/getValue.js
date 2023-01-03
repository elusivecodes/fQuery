import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #getValue', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<input type="text" id="test1" value="Test 1">' +
                '<input type="number" id="test2">' +
                '<textarea id="test3">Test 2</textarea>' +
                '<select id="test4"><option value="1">1</option><option value="2" selected>2</option></select>' +
                '<select id="test5"><option value="3">3</option><option value="4" selected>4</option></select>';
        });
    });

    it('returns the input value of the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('input')
                    .getValue(),
            ),
            'Test 1',
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('#invalid')
                    .getValue(),
            ),
            undefined,
        );
    });

    it('works with textarea input nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('textarea')
                    .getValue(),
            ),
            'Test 2',
        );
    });

    it('works with select input nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('select')
                    .getValue(),
            ),
            '2',
        );
    });
});
