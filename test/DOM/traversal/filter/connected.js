const assert = require('assert');
const { exec } = require('../../../setup');

describe('#connected', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>';
        });
    });

    it('returns nodes connected to the DOM', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.connected('div')
                    .map(node => node.id)
            ),
            [
                'div1',
                'div2'
            ]
        );
    });

    it('filters out nodes not connected to the DOM', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.connected(
                    document.createElement('div')
                )
            ),
            []
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.connected(
                    document.getElementById('div1')
                ).map(node => node.id)
            ),
            [
                'div1'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.connected(
                    document.querySelectorAll('div')
                ).map(node => node.id)
            ),
            [
                'div1',
                'div2'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.connected(
                    document.body.children
                ).map(node => node.id)
            ),
            [
                'div1',
                'div2'
            ]
        );
    });

    it('works with DocumentFragment nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const fragment = document.createDocumentFragment();
                return dom.connected(fragment);
            }),
            []
        );
    });

    it('works with ShadowRoot nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ => {
                const div = document.getElementById('div1');
                const shadow = div.attachShadow({ mode: 'open' });
                shadow.id = 'shadow';
                return dom.connected(shadow)
                    .map(node => node.id);
            }),
            [
                'shadow'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.connected([
                    document.getElementById('div1'),
                    document.getElementById('div2')
                ]).map(node => node.id)
            ),
            [
                'div1',
                'div2'
            ]
        );
    });

});