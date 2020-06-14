const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#createComment', function() {

    it('creates a new comment node', async function() {
        assert.equal(
            await exec(_ => {
                const comment = dom.createComment('Test');
                document.body.appendChild(comment);
                return document.body.innerHTML;
            }),
            '<!--Test-->'
        );
    });

});