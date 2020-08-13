const assert = require('assert').strict;
const { exec } = require('../../setup');

describe('#parseXML', function() {

    it('parses an XML string', async function() {
        assert.equal(
            await exec(_ => {
                const myDoc = DOM.parseXML(
                    '<?xml version="1.0" encoding="UTF-8" ?>' +
                    '<container>' +
                    '<content>' +
                    '</content>' +
                    '</container>'
                );
                return myDoc.documentElement.outerHTML;
            }),
            '<container>' +
            '<content/>' +
            '</container>'
        )
    });

});