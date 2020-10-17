const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #nearestTo', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '<div id="test2" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>';
            window.scrollTo(1000, 1000);
        });
    });

    it('returns the nearest node to a position', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .nearestTo(1000, 1000)
                    .get()
                    .map(node => node.id)
            ),
            [
                'test2'
            ]
        );
    });

    it('returns the nearest node to a position with offset', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .nearestTo(1000, 1000, true)
                    .get()
                    .map(node => node.id)
            ),
            [
                'test1'
            ]
        );
    });

    it('returns an empty QuerySet for empty nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('#invalid')
                    .nearestTo(1000, 1000)
                    .get()
            ),
            []
        );
    });

    it('returns a new QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.queryMutable('div');
                const query2 = query1.nearestTo(1000, 1000);
                return query2 instanceof QuerySet && query1 !== query2;
            }),
            true
        );
    });

});