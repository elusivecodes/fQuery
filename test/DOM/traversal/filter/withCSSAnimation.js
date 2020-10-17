const assert = require('assert');
const { exec, setStyle } = require('../../../setup');

describe('#withCSSAnimation', function() {

    beforeEach(async function() {
        await setStyle(
            '.test { animation: spin 4s linear infinite; }' +
            '@keyframes spin { 100% { transform: rotate(360deg); } }'
        );
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes with CSS animations', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withCSSAnimation('div')
                    .map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withCSSAnimation(
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
                dom.withCSSAnimation(
                    document.querySelectorAll('div')
                ).map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withCSSAnimation(
                    document.body.children
                ).map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withCSSAnimation([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4')
                ]).map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

});