const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #map', function() {

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
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('div')
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

    it('returns a new QuerySet', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query1 = dom.queryMutable('div');
                const query2 = query1.map(node => node.firstChild);
                return query2 instanceof QuerySet && query1 !== query2;
            }),
            true
        );
    });

});