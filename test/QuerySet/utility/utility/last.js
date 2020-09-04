const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #last', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('reduces the nodes to the last', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .last()
                    .get()
                    .map(node => node.id)
            ),
            [
                'div4'
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.deepEqual(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.last();
            }),
            true
        );
    });

});