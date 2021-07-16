const assert = require('assert');
const { exec } = require('../../../setup');

describe('#height', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; height: 1000px; width: 1200px; margin: 50px; padding: 25px; border: 1px solid grey; overflow-y: scroll;">' +
                '<div style="display: block; width: 1px; height: 2500px;"></div>' +
                '</div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the height of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.height('div')
            ),
            1050
        );
    });

    it('returns the content box height of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.height('div', DOM.CONTENT_BOX)
            ),
            1000
        );
    });

    it('returns the border box height of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.height('div', DOM.BORDER_BOX)
            ),
            1052
        );
    });

    it('returns the margin box height of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.height('div', DOM.MARGIN_BOX)
            ),
            1152
        );
    });

    it('returns the scroll box height of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.height('div', DOM.SCROLL_BOX)
            ),
            2550
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.height('#invalid')
            ),
            undefined
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.height(
                    document.getElementById('test1')
                )
            ),
            1050
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.height(
                    document.querySelectorAll('div')
                )
            ),
            1050
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.height(
                    document.body.children
                )
            ),
            1050
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.height(document)
            ),
            1152
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.height(window)
            ),
            600
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.height([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ])
            ),
            1050
        );
    });

});