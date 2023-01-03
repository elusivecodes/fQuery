import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#fragment', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<template id="template1">' +
                '</template>' +
                '<template id="template2">' +
                '</template>' +
                '<div id="div1"></div>';
        });
    });

    it('returns the document fragment of the first node', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = $.fragment('template');
                return fragment instanceof DocumentFragment;
            }),
            true,
        );
    });

    it('returns undefined for nodes without a fragment', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.fragment('#div1'),
            ),
            undefined,
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.fragment('#invalid'),
            ),
            undefined,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = $.fragment(
                    document.getElementById('template1'),
                );
                return fragment instanceof DocumentFragment;
            }),
            true,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = $.fragment(
                    document.querySelectorAll('template'),
                );
                return fragment instanceof DocumentFragment;
            }),
            true,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = $.fragment(
                    document.body.children,
                );
                return fragment instanceof DocumentFragment;
            }),
            true,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const fragment = $.fragment([
                    document.getElementById('template1'),
                    document.getElementById('template2'),
                ]);
                return fragment instanceof DocumentFragment;
            }),
            true,
        );
    });
});
