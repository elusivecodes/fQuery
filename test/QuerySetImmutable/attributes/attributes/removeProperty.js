const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #removeProperty', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<input type="checkbox" id="test1">' +
                '<input type="checkbox" id="test2">';
            document.getElementById('test1').test = 'Test 1';
            document.getElementById('test2').test = 'Test 2';
        });
    });

    it('removes a property for all nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.query('input')
                    .removeProperty('test');
                return [
                    document.getElementById('test1').test,
                    document.getElementById('test2').test
                ];
            }),
            [
                null,
                null
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('input');
                return query === query.removeProperty('test');
            }),
            true
        );
    });

});