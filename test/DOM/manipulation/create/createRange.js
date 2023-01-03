import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#createRange', function() {
    it('creates a new range', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.createRange() instanceof Range,
            ),
            true,
        );
    });
});
