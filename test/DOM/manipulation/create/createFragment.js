const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#createFragment', function() {

    it('creates a new document fragment', async function() {
        assert.equal(
            await exec(_ => {
                return dom.createFragment() instanceof DocumentFragment;
            }),
            true
        );
    });

});