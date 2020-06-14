const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#createText', function() {

    it('creates a new text node', async function() {
        assert.equal(
            await exec(_ => {
                const text = dom.createText('Test');
                document.body.appendChild(text);
                return document.body.innerHTML;
            }),
            'Test'
        );
    });

});