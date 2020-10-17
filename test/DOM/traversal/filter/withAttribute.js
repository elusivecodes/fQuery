const assert = require('assert');
const { exec } = require('../../../setup');

describe('#withAttribute', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" title="Test 1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" title="Test 2"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes with a specified attribute', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withAttribute('div', 'title')
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
                dom.withAttribute(
                    document.getElementById('div1'),
                    'title'
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
                dom.withAttribute(
                    document.querySelectorAll('div'),
                    'title'
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
                dom.withAttribute(
                    document.body.children,
                    'title'
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
                dom.withAttribute([
                    document.getElementById('div1'),
                    document.getElementById('div2'),
                    document.getElementById('div3'),
                    document.getElementById('div4')
                ], 'title').map(node => node.id)
            ),
            [
                'div1',
                'div3'
            ]
        );
    });

});