const assert = require('assert').strict;
const { exec, setStyle } = require('../../../setup');

describe('#isVisible', function() {

    beforeEach(async function() {
        await setStyle('.test { display: none; }');
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2" class="test"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4" class="test"></div>';
        });
    });

    it('returns true if any node is visible', async function() {
        assert.equal(
            await exec(_ =>
                dom.isVisible('div')
            ),
            true
        );
    });

    it('returns false if no nodes are visible', async function() {
        assert.equal(
            await exec(_ =>
                dom.isVisible('.test')
            ),
            false
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.isVisible(
                    document.getElementById('div1')
                )
            ),
            true
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.isVisible(
                    document.querySelectorAll('div')
                )
            ),
            true
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.isVisible(
                    document.body.children
                )
            ),
            true
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.isVisible(document)
            ),
            true
        );
    });

    it('works with Window nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.isVisible(window)
            ),
            true
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.isVisible([
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