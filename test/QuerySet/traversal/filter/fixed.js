const assert = require('assert').strict;
const { exec, setStyle } = require('../../../setup');

describe('QuerySet #fixed', function() {

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
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('div')
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
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('span')
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

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.fixed();
            }),
            true
        );
    });

});