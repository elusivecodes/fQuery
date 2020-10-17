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

    it('executes a callback on each node in the set', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const results = [];
                dom.queryMutable('div')
                    .each(node => {
                        results.push(node.id);
                    })
                return results;
            }),
            [
                'div1',
                'div2',
                'div3',
                'div4'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.each(_ => { });
            }),
            true
        );
    });

});