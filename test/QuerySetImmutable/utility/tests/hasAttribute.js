const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #hasAttribute', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node has a specified attribute', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div')
                    .hasAttribute('class')
            ),
            true
        );
    });

    it('returns false if no nodes have a specified attribute', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div:not(.test)')
                    .hasAttribute('class')
            ),
            false
        );
    });

});