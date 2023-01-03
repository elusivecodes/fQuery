import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#ready', function() {
    it('executes a callback when ready', async function() {
        assert.strictEqual(
            await exec((_) => {
                let result;
                $.ready((_) => {
                    result = true;
                });
                return result;
            }),
            true,
        );
    });
});
