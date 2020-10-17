const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #scrollWidth', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; overflow-x: scroll;">' +
                '<div style="display: block; width: 1000px; height: 1px;"></div>' +
                '</div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the scroll width of the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('div')
                    .scrollWidth()
            ),
            1000
        );
    });

    it('returns the scroll width of the first node (hidden)', async function() {
        assert.strictEqual(
            await exec(_ => {
                document.body.style.display = 'none';
                return dom.query('div')
                    .scrollWidth();
            }),
            1000
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('#invalid')
                    .scrollWidth()
            ),
            undefined
        );
    });

    it('works with Document nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                document.body.innerHTML = '<div style="block; width: 1000px; height: 1000px;"></div>';
                return dom.query(document)
                    .scrollWidth();
            }),
            1008
        );
    });

});