const assert = require('assert');
const { exec, setStyle } = require('../../../setup');

describe('QuerySet #withCSSTransition', function() {

    beforeEach(async function() {
        await setStyle('.test { transition: opacity 1s; }');
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes with CSS transitions', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.queryMutable('div')
                    .withCSSTransition()
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
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.withCSSTransition();
            }),
            true
        );
    });

});