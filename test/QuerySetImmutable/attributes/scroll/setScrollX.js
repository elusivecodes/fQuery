const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #setScrollX', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 1px; overflow: scroll;">' +
                '<div style="display: block; width: 1000px; height: 1px;"></div>' +
                '</div>' +
                '<div id="test2" style="display: block; width: 100px; height: 1px; overflow: scroll;">' +
                '<div style="display: block; width: 1000px; height: 1px;"></div>' +
                '</div>';
        });
    });

    it('sets the scroll X position for all nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.query('div')
                    .setScrollX(100);
                return [
                    document.getElementById('test1').scrollLeft,
                    document.getElementById('test2').scrollLeft
                ];
            }),
            [
                100,
                100
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.equal(
            await exec(_ => {
                const query = dom.query('div');
                return query === query.setScrollX(100);
            }),
            true
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                document.body.innerHTML = '<div style="display: block; width: 1000px; height: 1000px;"></div>';
                dom.query(document)
                    .setScrollX(100);
                return document.scrollingElement.scrollLeft;
            }),
            100
        );
    });

    it('works with Window nodes', async function() {
        assert.equal(
            await exec(_ => {
                document.body.innerHTML = '<div style="display: block; width: 1000px; height: 1000px;"></div>';
                dom.query(window)
                    .setScrollX(100);
                return window.scrollX;
            }),
            100
        );
    });

});