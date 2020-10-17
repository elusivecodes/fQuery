const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #blur', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<input type="text" id="test1">' +
                '<input type="text" id="test2">';
        });
    });

    it('triggers a blur event on the first node', async function() {
        assert.strictEqual(
            await exec(_ => {
                let result;
                const element = document.getElementById('test1');
                element.addEventListener('blur', _ => { result = true; });
                element.focus();
                dom.query('input')
                    .blur();
                return result;
            }),
            true
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                document.getElementById('test1').focus();
                const query = dom.query('input');
                return query === query.blur();
            }),
            true
        );
    });

});