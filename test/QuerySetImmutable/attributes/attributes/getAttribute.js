const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #getAttribute', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<input type="text" id="test1" required>' +
                '<input type="number" id="test2">';
        });
    });

    it('returns an object with all attributes for the first node', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('input')
                    .getAttribute()
            ),
            {
                type: 'text',
                id: 'test1',
                required: ''
            }
        );
    });

    it('returns an attribute value for the first node', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('input')
                    .getAttribute('type')
            ),
            'text'
        );
    });

    it('returns null for an undefined property', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('input')
                    .getAttribute('disabled')
            ),
            null
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('#invalid')
                    .getAttribute('type')
            ),
            undefined
        );
    });

});