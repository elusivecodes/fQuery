import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#createComment', function() {
    it('creates a new comment node', async function() {
        assert.strictEqual(
            await exec((_) => {
                const comment = $.createComment('Test');
                document.body.appendChild(comment);
                return document.body.innerHTML;
            }),
            '<!--Test-->',
        );
    });
});
