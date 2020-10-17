const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #map', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div>' +
                '<span id="span1"></span>' +
                '</div>' +
                '<div>' +
                '<span id="span2"></span>' +
                '</div>';
        });
    });

    it('executes a callback on each node in the set, and creates a new set from the results', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('div')
                    .map(node => node.firstChild)
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1',
                'span2'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.map(node => node.firstChild);
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

});