const assert = require('assert');
const { exec } = require('../../../setup');

describe('#createComment', function() {

    it('creates a new comment node', async function() {
        assert.strictEqual(
            await exec(_ => {
                const comment = dom.createComment('Test');
                document.body.appendChild(comment);
                return document.body.innerHTML;
            }),
            '<!--Test-->'
        );
    });

});