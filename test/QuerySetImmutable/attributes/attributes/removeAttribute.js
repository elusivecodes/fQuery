const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #removeAttribute', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<input type="text" id="test1" disabled>' +
                '<input type="number" id="test2" disabled>';
        });
    });

    it('removes an attribute for all nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.query('input')
                    .removeAttribute('disabled');
                return document.body.innerHTML;
            }),
            '<input type="text" id="test1">' +
            '<input type="number" id="test2">'
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.query('input');
                return query === query.removeAttribute('disabled');
            }),
            true
        );
    });

});