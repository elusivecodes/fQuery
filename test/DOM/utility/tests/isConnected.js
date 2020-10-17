const assert = require('assert');
const { exec } = require('../../../setup');

describe('#isConnected', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns true if any node is connected to the DOM', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.isConnected('div')
            ),
            true
        );
    });

    it('returns false if no nodes are connected to the DOM', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.isConnected(
                    document.createElement('div')
                )
            ),
            false
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.isConnected(
                    document.getElementById('div1')
                )
            ),
            true
        );
    });

    it('works with NodeList nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.isConnected(
                    document.querySelectorAll('div')
                )
            ),
            true
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.isConnected(
                    document.body.children
                )
            ),
            true
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                return dom.isConnected(fragment);
            }),
            false
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.strictEqual(
            await exec(_ => {
                const div = document.getElementById('div1');
                const shadow = div.attachShadow({ mode: 'open' });
                return dom.isConnected(shadow);
            }),
            true
        );
    });

    it('works with array nodes', async function() {
        assert.strictEqual(
            await exec(_ =>
                dom.isConnected([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4')
                ])
            ),
            true
        );
    });

});