const assert = require('assert');
const { exec, setStyle } = require('../../../setup');

describe('QuerySetImmutable #isVisible', function() {

    beforeEach(async function() {
        await setStyle('.test { display: none; }');
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1">' +
                '<span></span>' +
                '</div>' +
                '<div id="div2" class="test">' +
                '<span></span>' +
                '</div>' +
                '<div id="div3">' +
                '<span></span>' +
                '</div>' +
                '<div id="div4" class="test">' +
                '<span></span>' +
                '</div>';
        });
    });

    it('returns true if any node is visible', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('div')
                    .isVisible()
            ),
            true
        );
    });

    it('returns false if no nodes are visible', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('.test')
                    .isVisible()
            ),
            false
        );
    });

    it('returns true if any node is a descendent of a visible node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('span')
                    .isVisible()
            ),
            true
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query(document)
                    .isVisible()
            ),
            true
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query(window)
                    .isVisible()
            ),
            true
        );
    });

});