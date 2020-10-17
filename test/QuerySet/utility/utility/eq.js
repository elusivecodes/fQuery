const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #each', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('reduces the nodes to the specified index', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .eq(1)
                    .get()
                    .map(node => node.id)
            ),
            [
                'div2'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.eq(1);
            }),
            true
        );
    });

});