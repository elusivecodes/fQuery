const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #withClass', function() {

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
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('div')
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

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.withClass('test');
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

});