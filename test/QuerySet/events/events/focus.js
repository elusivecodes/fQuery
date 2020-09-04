const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #focus', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<input type="text" id="test1">' +
                '<input type="text" id="test2">';
        });
    });

    it('triggers a focus event on the first node', async function() {
        assert.equal(
            await exec(_ => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('focus', _ => { result = true; });
                dom.queryMutable('input')
                    .focus();
                return result;
            }),
            true
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.focus();
            }),
            true
        );
    });

});