import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#hasDataset', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1" data-text="Test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" data-text="Test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node has a specified attribute', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDataset('div', 'text'),
            ),
            true,
        );
    });

    it('returns false if no nodes have a specified attribute', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDataset('div:not([data-text])', 'text'),
            ),
            false,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDataset(
                    document.getElementById('div1'),
                    'text',
                ),
            ),
            true,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDataset(
                    document.querySelectorAll('div'),
                    'text',
                ),
            ),
            true,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDataset(
                    document.body.children,
                    'text',
                ),
            ),
            true,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.hasDataset([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4'),
                ], 'text'),
            ),
            true,
        );
    });
});
