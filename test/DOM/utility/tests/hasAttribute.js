const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#hasAttribute', function() {

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
                dom.hasAttribute('div', 'class')
            ),
            true
        );
    });

    it('returns false if no nodes have a specified attribute', async function() {
        assert.equal(
            await exec(_ =>
                dom.hasAttribute('div:not(.test)', 'class')
            ),
            false
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.hasAttribute(
                    document.getElementById('div1'),
                    'class'
                )
            ),
            true
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.hasAttribute(
                    document.querySelectorAll('div'),
                    'class'
                )
            ),
            true
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.hasAttribute(
                    document.body.children,
                    'class'
                )
            ),
            true
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.hasAttribute([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4')
                ], 'class')
            ),
            true
        );
    });

});