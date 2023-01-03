import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #setScrollY', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 1px; height: 100px; overflow: scroll;">' +
                '<div style="display: block; width: 1px; height: 1000px;"></div>' +
                '</div>' +
                '<div id="test2" style="display: block; width: 1px; height: 100px; overflow: scroll;">' +
                '<div style="display: block; width: 1px; height: 1000px;"></div>' +
                '</div>';
        });
    });

    it('sets the scroll Y position for all nodes', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                $('div')
                    .setScrollY(100);
                return [
                    document.getElementById('test1').scrollTop,
                    document.getElementById('test2').scrollTop,
                ];
            }),
            [
                100,
                100,
            ],
        );
    });

    it('returns the QuerySet', async function() {
        assert.strictEqual(
            await exec((_) => {
                const query = $('div');
                return query === query.setScrollY(100);
            }),
            true,
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                document.body.innerHTML = '<div style="display: block; width: 1000px; height: 1000px;"></div>';
                $(document)
                    .setScrollY(100);
                return document.scrollingElement.scrollTop;
            }),
            100,
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                document.body.innerHTML = '<div style="display: block; width: 1000px; height: 1000px;"></div>';
                $(window)
                    .setScrollY(100);
                return window.scrollY;
            }),
            100,
        );
    });
});
