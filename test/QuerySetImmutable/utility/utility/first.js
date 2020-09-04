const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #first', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('reduces the nodes to the first', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .first()
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.first();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

});