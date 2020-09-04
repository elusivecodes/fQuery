const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #commonAncestor', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="parent">' +
                '<div id="child">' +
                '<span id="span1">' +
                '<a id="a1"></a>' +
                '</span>' +
                '<span id="span2">' +
                '<a id="a2"></a>' +
                '</span>' +
                '</div>' +
                '</div>';
        });
    });

    it('returns the closest common ancestor of all nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('a')
                    .commonAncestor()
                    .get()
                    .map(node => node.id)
            ),
            [
                'child'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('a');
                return query === query.commonAncestor();
            }),
            true
        );
    });

});