const assert = require('assert');
const { exec } = require('../../../setup');

describe('QuerySetImmutable #getStyle', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 100px;"></div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns an object with all style values for the first node', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.query('div')
                    .getStyle()
            ),
            {
                display: 'block',
                width: '100px',
                height: '100px'
            }
        );
    });

    it('returns a style value for the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('div')
                    .getStyle('display')
            ),
            'block'
        );
    });

    it('returns an empty string for an undefined style', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('div')
                    .getStyle('visibility')
            ),
            ''
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('#invalid')
                    .getStyle('display')
            ),
            undefined
        );
    });

});