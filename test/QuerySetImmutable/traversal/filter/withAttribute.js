const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #withAttribute', function() {

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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('div')
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

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.withAttribute('title');
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

});