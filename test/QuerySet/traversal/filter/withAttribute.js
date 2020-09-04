const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #withAttribute', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" title="Test 1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" title="Test 2"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes with a specified attribute', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .withAttribute('title')
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
                return query === query.withAttribute('title');
            }),
            true
        );
    });

});