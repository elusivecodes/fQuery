const assert = require('assert');
const { exec, setStyle } = require('../../../setup');

describe('QuerySetImmutable #fixed', function() {

    beforeEach(async function() {
        await setStyle('.test { position: fixed; }');
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1">' +
                '<span id="span1"></span>' +
                '</div>' +
                '<div id="div2" class="test">' +
                '<span id="span2"></span>' +
                '</div>' +
                '<div id="div3">' +
                '<span id="span3"></span>' +
                '</div>' +
                '<div id="div4" class="test">' +
                '<span id="span4"></span>' +
                '</div>';
        });
    });

    it('returns fixed nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('div')
                    .fixed()
                    .get()
                    .map(node => node.id)
            ),
            [
                'div2',
                'div4'
            ]
        );
    });

    it('returns descendents of fixed nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('span')
                    .fixed()
                    .get()
                    .map(node => node.id)
            ),
            [
                'span2',
                'span4'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.fixed();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

});