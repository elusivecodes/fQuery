const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#sort', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="div1"></div>' +
                '<div id="div2"></div>' +
                '<div id="div3"></div>' +
                '<div id="div4"></div>';
        });
    });

    it('returns nodes sorted by the order they appear in the DOM', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.sort(
                    'div'
                ).map(node => node.id);
            }),
            [
                'div1',
                'div2',
                'div3',
                'div4'
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.sort(
                    document.getElementById('div2')
                ).map(node => node.id);
            }),
            [
                'div2'
            ]
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.sort(
                    document.querySelectorAll('div')
                ).map(node => node.id);
            }),
            [
                'div1',
                'div2',
                'div3',
                'div4'
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.sort(
                    document.body.children
                ).map(node => node.id);
            }),
            [
                'div1',
                'div2',
                'div3',
                'div4'
            ]
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                return dom.sort(
                    [
                        document.getElementById('div3'),
                        document.getElementById('div4'),
                        document.getElementById('div2'),
                        document.getElementById('div1')
                    ]
                ).map(node => node.id);
            }),
            [
                'div1',
                'div2',
                'div3',
                'div4'
            ]
        );
    });

    it('works with DocumentFragment');
    it('works with ShadowRoot');

});