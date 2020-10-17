const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySet #setScroll', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 100px; overflow: scroll;">' +
                '<div style="display: block; width: 1000px; height: 1000px;"></div>' +
                '</div>' +
                '<div id="test2" style="display: block; width: 100px; height: 100px; overflow: scroll;">' +
                '<div style="display: block; width: 1000px; height: 1000px;"></div>' +
                '</div>';
        });
    });

    it('sets the scroll position for all nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.queryMutable('div')
                    .setScroll(100, 50);
                return [
                    [
                        element1.scrollLeft,
                        element1.scrollTop
                    ],
                    [
                        element2.scrollLeft,
                        element2.scrollTop
                    ]
                ];
            }),
            [
                [100, 50],
                [100, 50]
            ]
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec(_ => {
                const query = dom.queryMutable('div');
                return query === query.setScroll(100, 50);
            }),
            true
        );
    });

    it('works with Document nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                document.body.innerHTML = '<div style="display: block; width: 1000px; height: 1000px;"></div>';
                dom.queryMutable(document)
                    .setScroll(100, 50);
                return [
                    document.scrollingElement.scrollLeft,
                    document.scrollingElement.scrollTop
                ];
            }),
            [100, 50]
        );
    });

    it('works with Window nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                document.body.innerHTML = '<div style="display: block; width: 1000px; height: 1000px;"></div>';
                dom.queryMutable(window)
                    .setScroll(100, 50);
                return [
                    window.scrollX,
                    window.scrollY
                ];
            }),
            [100, 50]
        );
    });

});