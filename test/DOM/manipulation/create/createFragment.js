import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#createFragment', function() {
    it('creates a new document fragment', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.createFragment() instanceof DocumentFragment,
            ),
            true,
        );
    });
});
