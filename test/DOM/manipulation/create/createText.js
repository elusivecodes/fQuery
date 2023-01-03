import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#createText', function() {
    it('creates a new text node', async function() {
        assert.strictEqual(
            await exec((_) => {
                const text = $.createText('Test');
                document.body.appendChild(text);
                return document.body.innerHTML;
            }),
            'Test',
        );
    });
});
