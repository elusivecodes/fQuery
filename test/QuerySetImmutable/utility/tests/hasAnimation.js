const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #hasAnimation', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
            dom.fadeIn(
                '.test'
            );
        });
    });

    it('returns true if any node has an animation', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('div')
                    .hasAnimation()
            ),
            true
        );
    });

    it('returns false if no nodes have an animation', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('div:not(.test)')
                    .hasAnimation()
            ),
            false
        );
    });

});