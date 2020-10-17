const assert = require('assert');
const { exec, setStyle } = require('../../../setup');

describe('QuerySetImmutable #visible', function() {

    beforeEach(async function() {
        await setStyle('.test { display: none; }');
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

    it('returns visible nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('div')
                    .visible()
                    .get()
                    .map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('returns descendents of visible nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('span')
                    .visible()
                    .get()
                    .map(node => node.id)
            ),
            [
                'span1',
                'span3'
            ]
        );
    });

    it('returns a new QuerySetImmutable', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query1 = dom.query('div');
                const query2 = query1.visible();
                return query2 instanceof QuerySetImmutable && query1 !== query2;
            }),
            true
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query(document)
                    .visible()
                    .get()
                    .map(node => node.id)
            ),
            [
                'document'
            ]
        );
    });

    it('works with Window nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query(window)
                    .visible()
                    .get()
                    .map(node => node.id)
            ),
            [
                'window'
            ]
        );
    });

});