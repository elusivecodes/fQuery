const assert = require('assert').strict;
const { exec, setStyle } = require('../../../setup');

describe('#withCSSTransition', function() {

    beforeEach(async function() {
        await setStyle('.test { transition: opacity 1s; }');
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1" class="test"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3" class="test"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes with CSS transitions', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.withCSSTransition(
                    'div'
                ).map(node => node.id);
            }),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.withCSSTransition(
                    document.getElementById('div1')
                ).map(node => node.id);
            }),
            [
                'div1'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.withCSSTransition(
                    document.querySelectorAll('div')
                ).map(node => node.id);
            }),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.withCSSTransition(
                    document.body.children
                ).map(node => node.id);
            }),
            [
                'div1',
                'div3'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.withCSSTransition(
                    [
                        document.getElementById('div1'),
                        document.getElementById('div2'),
                        document.getElementById('div3'),
                        document.getElementById('div4')
                    ]
                ).map(node => node.id);
            }),
            [
                'div1',
                'div3'
            ]
        );
    });

});