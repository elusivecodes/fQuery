const assert = require('assert').strict;
const { exec, setStyle } = require('../../../setup');

describe('#css', function() {

    beforeEach(async function() {
        await setStyle('.test { display: block; width: 50vw; }');
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" class="test"></div>' +
                '<div id="test2" class="test"></div>';
        });
    });

    it('returns an object with all computed styles for the first node', async function() {
        assert.deepEqual(
            await exec(_ => {
                const css = dom.css('.test');
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
        assert.equal(
            await exec(_ =>
                dom.css('.test', 'width')
            ),
            '400px'
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.css('#invalid', 'width')
            ),
            undefined
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.css(
                    document.getElementById('test1'),
                    'width'
                )
            ),
            '400px'
        );
    });

    it('works with NodeList nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.css(
                    document.querySelectorAll('.test'),
                    'width'
                )
            ),
            '400px'
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.css(
                    document.body.children,
                    'width'
                )
            ),
            '400px'
        );
    });

    it('works with array nodes', async function() {
        assert.equal(
            await exec(_ =>
                dom.css([
                    document.getElementById('test1'),
                    document.getElementById('test2')
                ], 'width')
            ),
            '400px'
        );
    });

});