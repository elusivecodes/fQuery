const assert = require('assert');
const { exec } = require('../../../setup');

describe('#width', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; height: 1000px; width: 1200px; margin: 50px; padding: 25px; border: 1px solid grey;"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the width of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.width('div')
            ),
            1250
        );
    });

    it('returns the inner width of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.width('div', DOM.INNER)
            ),
            1200
        );
    });

    it('returns the outer width of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.width('div', DOM.OUTER)
            ),
            1252
        );
    });

    it('returns the outer width of the first node with margin', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.width('div', DOM.OUTER_MARGIN)
            ),
            1352
        );
    });

    it('returns the width of the first node (hidden)', async function() {
        assert.strictEqual(
            await exec(_ => {
                document.body.style.display = 'none';
                return dom.width('div');
            }),
            1250
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.width('#invalid')
            ),
            undefined
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.width(
                    document.getElementById('test1')
                )
            ),
            1250
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.width(
                    document.querySelectorAll('div')
                )
            ),
            1250
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.width(
                    document.body.children
                )
            ),
            1250
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.width(document)
            ),
            800
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.width(window)
            ),
            800
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.width([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ])
            ),
            1250
        );
    });

});