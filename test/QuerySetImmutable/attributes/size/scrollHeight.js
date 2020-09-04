const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #scrollHeight', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; height: 100px; overflow-y: scroll;">' +
                '<div style="display: block; width: 1px; height: 1000px;"></div>' +
                '</div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the scroll height of the first node', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('div')
                    .scrollHeight()
            ),
            1000
        );
    });

    it('returns the scroll height of the first node (hidden)', async function() {
        assert.equal(
            await exec(_ => {
                document.body.style.display = 'none';
                return dom.query('div')
                    .scrollHeight();
            }),
            1000
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.query('#invalid')
                    .scrollHeight()
            ),
            undefined
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                document.body.innerHTML = '<div style="block; width: 1000px; height: 1000px;"></div>';
                return dom.query(document)
                    .scrollHeight();
            }),
            1016
        );
    });

});