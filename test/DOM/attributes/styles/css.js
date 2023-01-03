import assert from 'node:assert/strict';
import { exec, setStyle } from './../../../setup.js';

describe('#css', function() {
    beforeEach(async function() {
        await setStyle('.test { display: block; width: 50vw; }');
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1" class="test"></div>' +
                '<div id="test2" class="test"></div>';
        });
    });

    it('returns an object with all computed styles for the first node', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const css = $.css('.test');
                return {
                    display: css.display,
                    width: css.width,
                };
            }),
            {
                display: 'block',
                width: '400px',
            },
        );
    });

    it('returns a computed style for the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.css('.test', 'width'),
            ),
            '400px',
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.css('#invalid', 'width'),
            ),
            undefined,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.css(
                    document.getElementById('test1'),
                    'width',
                ),
            ),
            '400px',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.css(
                    document.querySelectorAll('.test'),
                    'width',
                ),
            ),
            '400px',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.css(
                    document.body.children,
                    'width',
                ),
            ),
            '400px',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.css([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ], 'width'),
            ),
            '400px',
        );
    });
});
