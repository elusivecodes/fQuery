const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #tagName', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<span id="span1"></span>' +
                '<span id="span2"></span>';
        });
    });

    it('returns the tag name of the first node', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div')
                    .tagName()
            ),
            'div'
        );
    });

});