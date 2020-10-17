const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #getHTML', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1"><span>Test</span></div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the HTML contents of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .getHTML()
            ),
            '<span>Test</span>'
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.queryMutable('#invalid')
                    .getHTML()
            ),
            undefined
        );
    });

});