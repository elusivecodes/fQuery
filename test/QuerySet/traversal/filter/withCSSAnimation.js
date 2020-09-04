const assert = require('assert').strict;
const { exec, setStyle } = require('../../../setup');

describe('QuerySet #withCSSAnimation', function() {

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
                dom.queryMutable('div')
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

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.withCSSAnimation();
            }),
            true
        );
    });

});