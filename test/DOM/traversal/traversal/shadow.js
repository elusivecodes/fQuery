import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#shadow', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>';
            document.getElementById('div1').attachShadow({ mode: 'open' });
            document.getElementById('div2').attachShadow({ mode: 'closed' });
        });
    });

    it('returns the shadow root of the first node', async function() {
        assert.strictEqual(
            await exec((_) => {
                const shadow = $.shadow('div');
                return shadow instanceof ShadowRoot;
            }),
            true,
        );
    });

    it('returns null for closed shadow roots', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.shadow('#div2'),
            ),
            null,
        );
    });

    it('returns null for nodes without a shadow root', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.shadow('#div3'),
            ),
            null,
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec((_) =>
                $.shadow('#invalid'),
            ),
            undefined,
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const shadow = $.shadow(
                    document.getElementById('div1'),
                );
                return shadow instanceof ShadowRoot;
            }),
            true,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const shadow = $.shadow(
                    document.querySelectorAll('div'),
                );
                return shadow instanceof ShadowRoot;
            }),
            true,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const shadow = $.shadow(
                    document.body.children,
                );
                return shadow instanceof ShadowRoot;
            }),
            true,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const shadow = $.shadow([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                ]);
                return shadow instanceof ShadowRoot;
            }),
            true,
        );
    });
});
