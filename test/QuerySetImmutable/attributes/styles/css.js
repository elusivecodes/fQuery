const assert = require('assert');
const { exec, setStyle } = require('../../../setup');

describe('QuerySetImmutable #css', function() {

    beforeEach(async function() {
        await setStyle('.test { display: block; width: 50vw; }');
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" class="test"></div>' +
                '<div id="test2" class="test"></div>';
        });
    });

    it('returns an object with all computed styles for the first node', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const css = dom.query('.test')
                    .css();
                return {
                    display: css.display,
                    width: css.width
                }
            }),
            {
                display: 'block',
                width: '400px'
            }
        );
    });

    it('returns a computed style for the first node', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('.test')
                    .css('width')
            ),
            '400px'
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.query('#invalid')
                    .css('width')
            ),
            undefined
        );
    });

});