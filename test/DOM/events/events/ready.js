const assert = require('assert');
const { exec } = require('../../../setup');

describe('#ready', function() {

    it('executes a callback when ready', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result;
                dom.ready(_ => {
                    result = true;
                });
                return result;
            }),
            true
        );
    });

});