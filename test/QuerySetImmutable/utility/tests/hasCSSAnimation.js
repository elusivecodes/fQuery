const assert = require('assert').strict;
const { exec, setStyle } = require('../../../setup');

describe('QuerySetImmutable #hasCSSAnimation', function() {

    beforeEach(async function() {
        await setStyle(
            '.test { animation: spin 4s linear infinite; }' +
            '@keyframes spin { 100% { transform: rotate(360deg); } }'
        );
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node has a CSS animation', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div')
                    .hasCSSAnimation()
            ),
            true
        );
    });

    it('returns false if no nodes have a CSS animation', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div:not(.test)')
                    .hasCSSAnimation()
            ),
            false
        );
    });

});