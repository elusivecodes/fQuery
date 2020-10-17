const assert = require('assert');
const { exec } = require('../../../setup');

describe('#attachShadow', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML = '<div id="test"></div>';
        });
    });

    it('attaches a shadow root to the first node', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const shadow = dom.attachShadow('#test');
                return [
                    shadow instanceof ShadowRoot,
                    document.getElementById('test').shadowRoot instanceof ShadowRoot
                ];
            }),
            [
                true,
                true
            ]
        );
    });

    it('attaches a closed shadow root to the first node', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const shadow = dom.attachShadow('#test', false);
                return [
                    shadow instanceof ShadowRoot,
                    document.getElementById('test').shadowRoot
                ];
            }),
            [
                true,
                null
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const element = document.getElementById('test');
                dom.attachShadow(element);
                return element.shadowRoot instanceof ShadowRoot;
            }),
            true
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.attachShadow(
                    document.querySelectorAll('div')
                );
                return document.getElementById('test').shadowRoot instanceof ShadowRoot;
            }),
            true
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                dom.attachShadow(
                    document.body.children
                );
                return document.getElementById('test').shadowRoot instanceof ShadowRoot;
            }),
            true
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const element = document.getElementById('test');
                dom.attachShadow([element]);
                return element.shadowRoot instanceof ShadowRoot;
            }),
            true
        );
    });

});