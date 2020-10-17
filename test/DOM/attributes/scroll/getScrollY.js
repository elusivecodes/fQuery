const assert = require('assert');
const { exec } = require('../../../setup');

describe('#getScrollY', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; height: 100px; overflow-y: scroll;">' +
                '<div style="display: block; width: 1px; height: 1000px;"></div>' +
                '</div>' +
                '<div id="test2"></div>';
            document.getElementById('test1').scrollTop = 100;
        });
    });

    it('returns the scroll Y position of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getScrollY('div')
            ),
            100
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getScrollY('#invalid')
            ),
            undefined
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getScrollY(
                    document.getElementById('test1')
                )
            ),
            100
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getScrollY(
                    document.querySelectorAll('div')
                )
            ),
            100
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getScrollY(
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
                document.scrollingElement.scrollTop = 100;
                return dom.getScrollY(document);
            }),
            100
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                document.body.innerHTML = '<div style="block; width: 1000px; height: 1000px;"></div>';
                window.scrollTo(0, 100);
                return dom.getScrollY(window);
            }),
            100
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.getScrollY([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ])
            ),
            100
        );
    });

});