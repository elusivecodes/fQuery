const assert = require('assert');
const { exec } = require('../../../setup');

describe('#createFragment', function() {

    it('creates a new document fragment', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.createFragment() instanceof DocumentFragment
            ),
            true
        );
    });

});