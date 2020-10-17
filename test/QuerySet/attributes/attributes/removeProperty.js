const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #removeProperty', function() {

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
        assert.deepStrictEqual(
            await exec(_ => {
                dom.queryMutable('input')
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
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('input');
                return query === query.removeProperty('test');
            }),
            true
        );
    });

});