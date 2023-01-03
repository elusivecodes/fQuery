import assert from 'node:assert/strict';
import { exec } from './../../../setup.js';

describe('#attachShadow', function() {
    beforeEach(async function() {
        await exec((_) => {
            document.body.innerHTML = '<div id="test"></div>';
        });
    });

    it('attaches a shadow root to the first node', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const shadow = $.attachShadow('#test');
                return [
                    shadow instanceof ShadowRoot,
                    document.getElementById('test').shadowRoot instanceof ShadowRoot,
                ];
            }),
            [
                true,
                true,
            ],
        );
    });

    it('attaches a closed shadow root to the first node', async function() {
        assert.deepStrictEqual(
            await exec((_) => {
                const shadow = $.attachShadow('#test', { open: false });
                return [
                    shadow instanceof ShadowRoot,
                    document.getElementById('test').shadowRoot,
                ];
            }),
            [
                true,
                null,
            ],
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const element = document.getElementById('test');
                $.attachShadow(element);
                return element.shadowRoot instanceof ShadowRoot;
            }),
            true,
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.attachShadow(
                    document.querySelectorAll('div'),
                );
                return document.getElementById('test').shadowRoot instanceof ShadowRoot;
            }),
            true,
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                $.attachShadow(
                    document.body.children,
                );
                return document.getElementById('test').shadowRoot instanceof ShadowRoot;
            }),
            true,
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec((_) => {
                const element = document.getElementById('test');
                $.attachShadow([element]);
                return element.shadowRoot instanceof ShadowRoot;
            }),
            true,
        );
    });
});
