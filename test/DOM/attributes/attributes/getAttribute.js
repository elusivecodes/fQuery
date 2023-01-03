import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#getAttribute', function() {
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
                $.getAttribute('input'),
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
                $.getAttribute('input', 'type'),
            ),
            'text',
        );
    });

    it('returns null for an undefined property', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getAttribute('input', 'disabled'),
            ),
            null,
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getAttribute('#invalid', 'type'),
            ),
            undefined,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getAttribute(
                    document.getElementById('test1'),
                    'type',
                ),
            ),
            'text',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getAttribute(
                    document.querySelectorAll('input'),
                    'type',
                ),
            ),
            'text',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getAttribute(
                    document.body.children,
                    'type',
                ),
            ),
            'text',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getAttribute([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ], 'type'),
            ),
            'text',
        );
    });
});
