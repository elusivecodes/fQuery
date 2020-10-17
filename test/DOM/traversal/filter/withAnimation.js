const assert = require('assert');
const { exec } = require('../../../setup');

describe('#withAnimation', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
            dom.fadeIn(
                '#div1'
            );
            dom.fadeIn(
                '#div3'
            );
        });
    });

    it('returns nodes with animations', async function() {
        assert.deepStrictEqual(
            await exec(_ =>
                dom.withAnimation('div')
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
                dom.withAnimation(
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
                dom.withAnimation(
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
                dom.withAnimation(
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
                dom.withAnimation([
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