const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #getScrollY', function() {

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
        assert.equal(
            await exec(_ =>
                dom.query('div')
                    .getScrollY()
            ),
            100
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('#invalid')
                    .getScrollY()
            ),
            undefined
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                document.body.innerHTML = '<div style="block; width: 1000px; height: 1000px;"></div>';
                document.scrollingElement.scrollTop = 100;
                return dom.query(document)
                    .getScrollY();
            }),
            100
        );
    });

    it('works with Window nodes', async function() {
        assert.equal(
            await exec(_ => {
                document.body.innerHTML = '<div style="block; width: 1000px; height: 1000px;"></div>';
                window.scrollTo(0, 100);
                return dom.query(window)
                    .getScrollY();
            }),
            100
        );
    });

});