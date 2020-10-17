const assert = require('assert');
const { exec } = require('../../../setup');

describe('#getScrollX', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; overflow-x: scroll;">' +
                '<div style="display: block; width: 1000px; height: 1px;"></div>' +
                '</div>' +
                '<div id="test2"></div>';
            document.getElementById('test1').scrollLeft = 100;
        });
    });

    it('returns the scroll X position of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getScrollX('div')
            ),
            100
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getScrollX('#invalid')
            ),
            undefined
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getScrollX(
                    document.getElementById('test1')
                )
            ),
            100
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getScrollX(
                    document.querySelectorAll('div')
                )
            ),
            100
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getScrollX(
                    document.body.children
                )
            ),
            100
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                document.body.innerHTML = '<div style="block; width: 1000px; height: 1000px;"></div>';
                document.scrollingElement.scrollLeft = 100;
                return dom.getScrollX(document);
            }),
            100
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                document.body.innerHTML = '<div style="block; width: 1000px; height: 1000px;"></div>';
                window.scrollTo(100, 0);
                return dom.getScrollX(window);
            }),
            100
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getScrollX([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ])
            ),
            100
        );
    });

});