const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('QuerySetImmutable #isConnected', function() {

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
        assert.equal(
            await exec(_ =>
                dom.query('div')
                    .isConnected()
            ),
            true
        );
    });

    it('returns false if no nodes are connected to the DOM', async function() {
        assert.equal(
            await exec(_ =>
                dom.query(
                    document.createElement('div')
                ).isConnected()
            ),
            false
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.equal(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                return dom.query(fragment)
                    .isConnected();
            }),
            false
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.equal(
            await exec(_ => {
                const div = document.getElementById('div1');
                const shadow = div.attachShadow({ mode: 'open' });
                return dom.query(shadow)
                    .isConnected();
            }),
            true
        );
    });

});