const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #width', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; height: 1000px; width: 1200px; margin: 50px; padding: 25px; border: 1px solid grey;"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the width of the first node', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div')
                    .width()
            ),
            1250
        );
    });

    it('returns the inner width of the first node', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div')
                    .width(DOM.INNER)
            ),
            1200
        );
    });

    it('returns the outer width of the first node', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div')
                    .width(DOM.OUTER)
            ),
            1252
        );
    });

    it('returns the outer width of the first node with margin', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div')
                    .width(DOM.OUTER_MARGIN)
            ),
            1352
        );
    });

    it('returns the width of the first node (hidden)', async function() {
        assert.equal(
            await exec(_ => {
                document.body.style.display = 'none';
                return dom.query('div')
                    .width();
            }),
            1250
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('#invalid')
                    .width()
            ),
            undefined
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query(document)
                    .width()
            ),
            800
        );
    });

    it('works with Window nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query(window)
                    .width()
            ),
            800
        );
    });

});