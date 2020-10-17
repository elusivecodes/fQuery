const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #offsetParent', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent1">' +
                '<div id="child1" style="position: relative;">' +
                '<span id="span1">' +
                '<a id="a1"></a>' +
                '</span>' +
                '</div>' +
                '</div>' +
                '<div id="parent2">' +
                '<div id="child2" style="position: relative;">' +
                '<span id="span2">' +
                '<a id="a2"></a>' +
                '</span>' +
                '</div>' +
                '</div>';
        });
    });

    it('returns the offset parent of the first node', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('a')
                    .offsetParent()
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('a');
                const query2 = query1.offsetParent();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

});