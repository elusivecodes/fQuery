import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#tagName', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<span id="span1"></span>' +
                '<span id="span2"></span>';
        });
    });

    it('returns the tag name of the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.tagName('div'),
            ),
            'div',
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.tagName(
                    document.getElementById('span1'),
                ),
            ),
            'span',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.tagName(
                    document.querySelectorAll('div'),
                ),
            ),
            'div',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.tagName(
                    document.body.children,
                ),
            ),
            'div',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.tagName([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('span1'),
                    document.getElementById('span2'),
                ]),
            ),
            'div',
        );
    });
});
