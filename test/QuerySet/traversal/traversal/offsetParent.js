const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #offsetParent', function() {

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
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .offsetParent()
                    .get()
                    .map(node => node.id)
            ),
            [
                'child1'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('a');
                return query === query.offsetParent();
            }),
            true
        );
    });

});