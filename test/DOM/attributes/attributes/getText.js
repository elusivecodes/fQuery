import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#getText', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="test1"><span>Test</span></div>' +
                '<div id="test2"></div>';
        });
    });

    it('returns the text contents of the first node', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getText('div'),
            ),
            'Test',
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getText('#invalid'),
            ),
            undefined,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getText(
                    document.getElementById('test1'),
                ),
            ),
            'Test',
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getText(
                    document.querySelectorAll('div'),
                ),
            ),
            'Test',
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getText(
                    document.body.children,
                ),
            ),
            'Test',
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.getText([
                    document.getElementById('test1'),
                    document.getElementById('test2'),
                ]),
            ),
            'Test',
        );
    });
});
