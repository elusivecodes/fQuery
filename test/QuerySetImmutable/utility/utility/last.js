const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #last', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('reduces the nodes to the last', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .last()
                    .get()
                    .map(node => node.id)
            ),
            [
                'div4'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.last();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

});