const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #height', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; height: 1000px; width: 1200px; margin: 50px; padding: 25px; border: 1px solid grey;"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the height of the first node', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('div')
                    .height()
            ),
            1050
        );
    });

    it('returns the inner height of the first node', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('div')
                    .height(DOM.INNER)
            ),
            1000
        );
    });

    it('returns the outer height of the first node', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('div')
                    .height(DOM.OUTER)
            ),
            1052
        );
    });

    it('returns the outer height of the first node with margin', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('div')
                    .height(DOM.OUTER_MARGIN)
            ),
            1152
        );
    });

    it('returns the height of the first node (hidden)', async function() {
        assert.equal(
            await exec(_ => {
                document.body.style.display = 'none';
                return dom.queryMutable('div')
                    .height();
            }),
            1050
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('#invalid')
                    .height()
            ),
            undefined
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable(document)
                    .height()
            ),
            1152
        );
    });

    it('works with Window nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable(window)
                    .height()
            ),
            600
        );
    });

});