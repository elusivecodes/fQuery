const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySet #withAnimation', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
            dom.fadeIn(
                '#div1'
            );
            dom.fadeIn(
                '#div3'
            );
        });
    });

    it('returns nodes with animations', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .withAnimation()
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
                return query === query.withAnimation();
            }),
            true
        );
    });

});