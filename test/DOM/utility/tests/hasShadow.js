const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#hasShadow', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
            document.getElementById('div1').attachShadow({ mode: 'open' });
            document.getElementById('div3').attachShadow({ mode: 'closed' });
        });
    });

    it('returns true if any node has a shadow root', async function() {
        assert.equal(
            await exec(_ =>
                dom.hasShadow('div')
            ),
            true
        );
    });

    it('returns false if no nodes have a shadow root', async function() {
        assert.equal(
            await exec(_ =>
                dom.hasShadow('div:not(.test)')
            ),
            false
        );
    });

    it('returns false for closed shadow roots', async function() {
        assert.equal(
            await exec(_ =>
                dom.hasShadow('#div3')
            ),
            false
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.hasShadow(
                    document.getElementById('div1')
                )
            ),
            true
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.hasShadow(
                    document.querySelectorAll('div')
                )
            ),
            true
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.hasShadow(
                    document.body.children
                )
            ),
            true
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.hasShadow([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4')
                ])
            ),
            true
        );
    });

});