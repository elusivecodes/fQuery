const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #rect', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 100px; margin: 1050px; padding: 50px;"></div>' +
                '<div id="test2"></div>';
            window.scrollTo(1000, 1000);
        });
    });

    it('returns the bounding rectangle of the first node', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('div')
                    .rect()
                    .toJSON()
            ),
            {
                x: 600,
                y: 50,
                width: 200,
                height: 200,
                top: 50,
                right: 800,
                bottom: 250,
                left: 600
            }
        );
    });

    it('returns the bounding rectangle of the first node with offset', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('div')
                    .rect(true)
                    .toJSON()
            ),
            {
                x: 1058,
                y: 1050,
                width: 200,
                height: 200,
                top: 1050,
                right: 1258,
                bottom: 1250,
                left: 1058
            }
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('#invalid')
                    .rect()
            ),
            undefined
        );
    });

});