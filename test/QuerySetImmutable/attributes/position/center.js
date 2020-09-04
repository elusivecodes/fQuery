const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #center', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '<div id="test2"></div>';
            window.scrollTo(1000, 1000);
        });
    });

    it('returns the center position of the first node', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .center()
            ),
            {
                x: 700,
                y: 150
            }
        );
    });

    it('returns the center position of the first node with offset', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .center(true)
            ),
            {
                x: 1158,
                y: 1150
            }
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('#invalid')
                    .center()
            ),
            undefined
        );
    });

});