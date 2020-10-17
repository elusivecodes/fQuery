const assert = require('assert');
const { exec, setStyle } = require('../../../setup');

describe('QuerySetImmutable #withCSSTransition', function() {

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
                dom.query('div')
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

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.withCSSTransition();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

});