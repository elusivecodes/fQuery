const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #click', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<a href="#" id="test1">Test</a>' +
                '<a href="#" id="test2">Test</a>';
        });
    });

    it('triggers a click event on the first node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('click', _ => { result = true; });
                dom.queryMutable('a')
                    .click();
                return result;
            }),
            true
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('a');
                return query === query.click();
            }),
            true
        );
    });

});