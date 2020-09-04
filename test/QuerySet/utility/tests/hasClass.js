const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #hasClass', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node has a specified class', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('div')
                    .hasClass('test')
            ),
            true
        );
    });

    it('returns false if no nodes have a specified class', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('div:not(.test)')
                    .hasClass('test')
            ),
            false
        );
    });

});