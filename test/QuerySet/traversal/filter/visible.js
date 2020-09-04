const assert = require('assert').strict;
const { exec, setStyle } = require('../../../setup');

describe('QuerySet #visible', function() {

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
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('div')
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
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable('span')
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

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.visible();
            }),
            true
        );
    });

    it('works with Document nodes', async function() {
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable(document)
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
        assert.deepEqual(
            await exec(_ =>
                dom.queryMutable(window)
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