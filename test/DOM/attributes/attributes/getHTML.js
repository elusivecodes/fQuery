import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#getHTML', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"><span>Test</span></div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the HTML contents of the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getHTML('div'),
            ),
            '<span>Test</span>',
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getHTML('#invalid'),
            ),
            undefined,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getHTML(
                    document.getElementById('test1'),
                ),
            ),
            '<span>Test</span>',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getHTML(
                    document.querySelectorAll('div'),
                ),
            ),
            '<span>Test</span>',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getHTML(
                    document.body.children,
                ),
            ),
            '<span>Test</span>',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getHTML([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ]),
            ),
            '<span>Test</span>',
        );
    });
});
