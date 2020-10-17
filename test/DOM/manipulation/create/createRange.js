const assert = require('assert');
const { exec } = require('../../../setup');

describe('#createRange', function() {

    it('creates a new range', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.createRange() instanceof Range
            ),
            true
        );
    });

});