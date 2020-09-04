const assert = require('assert').strict;
const { exec, setStyle } = require('../../../setup');

describe('QuerySetImmutable #withCSSAnimation', function() {

    beforeEach(async function() {
        await setStyle(
            '.test { animation: spin 4s linear infinite; }' +
            '@keyframes spin { 100% { transform: rotate(360deg); } }'
        );
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes with CSS animations', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.query('div')
                    .withCSSAnimation()
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
        assert.equal(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.withCSSAnimation();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

});