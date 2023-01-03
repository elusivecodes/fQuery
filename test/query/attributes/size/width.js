import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('QuerySet #width', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; height: 1000px; width: 1200px; margin: 50px; padding: 25px; border: 1px solid grey; overflow-x: scroll">' +
                '<div style="display: block; height: 1px; width: 2500px;"></div>' +
                '</div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the width of the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .width(),
            ),
            1250,
        );
    });

    it('returns the content box width of the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .width({ boxSize: $.CONTENT_BOX }),
            ),
            1200,
        );
    });

    it('returns the border box width of the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .width({ boxSize: $.BORDER_BOX }),
            ),
            1252,
        );
    });

    it('returns the margin box width of the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .width({ boxSize: $.MARGIN_BOX }),
            ),
            1352,
        );
    });

    it('returns the scroll box width of the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('div')
                    .width({ boxSize: $.SCROLL_BOX }),
            ),
            2550,
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $('#invalid')
                    .width(),
            ),
            undefined,
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $(document)
                    .width(),
            ),
            800,
        );
    });

    it('works with Window nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $(window)
                    .width(),
            ),
            800,
        );
    });
});
