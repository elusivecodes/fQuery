const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #withClass', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes with a specified class', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .withClass('test')
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
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.withClass('test');
            }),
            true
        );
    });

});