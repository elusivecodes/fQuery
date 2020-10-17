const assert = require('assert');
const { exec } = require('../../../setup');

describe('#shadow', function() {

    beforeEach(async function() {
        await exec(_ => {
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
            await exec(_ => {
                const shadow = dom.shadow('div');
                return shadow instanceof ShadowRoot;
            }),
            true
        );
    });

    it('returns null for closed shadow roots', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.shadow('#div2')
            ),
            null
        );
    });

    it('returns null for nodes without a shadow root', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.shadow('#div3')
            ),
            null
        );
    });

    it('returns undefined for empty nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.shadow('#invalid')
            ),
            undefined
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const shadow = dom.shadow(
                    document.getElementById('div1')
                );
                return shadow instanceof ShadowRoot;
            }),
            true
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const shadow = dom.shadow(
                    document.querySelectorAll('div')
                );
                return shadow instanceof ShadowRoot;
            }),
            true
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const shadow = dom.shadow(
                    document.body.children
                );
                return shadow instanceof ShadowRoot;
            }),
            true
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const shadow = dom.shadow([
                    document.getElementById('div1'),
                    document.getElementById('div2')
                ]);
                return shadow instanceof ShadowRoot;
            }),
            true
        );
    });

});