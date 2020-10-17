const assert = require('assert');
const { exec } = require('../../setup');

describe('#parseHTML', function() {

    it('parses a HTML string', async function() {
        assert.strictEqual(
            await exec(_ => {
                const myDoc = DOM.parseHTML(
                    '<html>' +
                    '<head></head>' +
                    '<body>' +
                    '<div></div>' +
                    '</body>' +
                    '</html>'
                );
                return myDoc.documentElement.outerHTML;
            }),
            '<html>' +
            '<head></head>' +
            '<body>' +
            '<div></div>' +
            '</body>' +
            '</html>'
        )
    });

});