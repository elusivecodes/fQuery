const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #percentY', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '<div id="test2"></div>';
            window.scrollTo(1000, 1000);
        });
    });

    it('returns the percent of a position along the Y-axis for the first node', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('div')
                    .percentY(150)
            ),
            50
        );
    });

    it('returns the percent of a position along the Y-axis for the first node with offset', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('div')
                    .percentY(1150, true)
            ),
            50
        );
    });

    it('clamps the returned value between 0 and 100', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return [
                    query.percentY(0),
                    query.percentY(2000)
                ];
            }),
            [
                0,
                100
            ]
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.queryMutable('#invalid')
                    .percentY(150)
            ),
            undefined
        );
    });

});