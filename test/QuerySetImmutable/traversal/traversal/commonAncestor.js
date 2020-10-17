const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #commonAncestor', function() {

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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('a')
                    .commonAncestor()
                    .get()
                    .map(node => node.id)
            ),
            [
                'child'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('a');
                const query2 = query1.commonAncestor();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

});