const assert = require('assert');
const { exec } = require('../../../setup');

describe('#parseHTML', function() {

    it('returns an array of nodes parsed from a HTML string', async function() {
        assert.strictEqual(
            await exec(_ => {
                const nodes = dom.parseHTML(
                    '<div id="div1">' +
                    '<span id="span1"></span>' +
                    '</div>' +
                    '<div id="div2">' +
                    '<span id="span2"></span>' +
                    '</div>'
                );

                for (const node of nodes) {
                    document.body.appendChild(node);
                }

                return document.body.innerHTML;

            }),
            '<div id="div1">' +
            '<span id="span1"></span>' +
            '</div>' +
            '<div id="div2">' +
            '<span id="span2"></span>' +
            '</div>'
        );
    });

});