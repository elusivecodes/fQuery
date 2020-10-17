const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #withProperty', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
            document.getElementById('div1').test = 'Test 1';
            document.getElementById('div3').test = 'Test 2';
        });
    });

    it('returns nodes with a specified property', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .withProperty('test')
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.withProperty('test');
            }),
            true
        );
    });

});