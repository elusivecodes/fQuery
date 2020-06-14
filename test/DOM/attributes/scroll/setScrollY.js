const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#setScrollY', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 1px; height: 100px; overflow: scroll;">' +
                '<div style="display: block; width: 1px; height: 1000px;"></div>' +
                '</div>' +
                '<div id="test2" style="display: block; width: 1px; height: 100px; overflow: scroll;">' +
                '<div style="display: block; width: 1px; height: 1000px;"></div>' +
                '</div>';
        });
    });

    it('sets the scroll Y position for all nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setScrollY(
                    'div',
                    100,
                );
                return [
                    document.getElementById('test1').scrollTop,
                    document.getElementById('test2').scrollTop
                ];
            }),
            [
                100,
                100
            ]
        );
    });

    it('works with HTMLElement nodes', async function() {
        assert.equal(
            await exec(_ => {
                const element = document.getElementById('test1');
                dom.setScrollY(
                    element,
                    100,
                );
                return element.scrollTop;
            }),
            100
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setScrollY(
                    document.querySelectorAll('div'),
                    100
                );
                return [
                    document.getElementById('test1').scrollTop,
                    document.getElementById('test2').scrollTop
                ];
            }),
            [
                100,
                100
            ]
        );
    });

    it('works with HTMLCollection nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setScrollY(
                    document.body.children,
                    100
                );
                return [
                    document.getElementById('test1').scrollTop,
                    document.getElementById('test2').scrollTop
                ];
            }),
            [
                100,
                100
            ]
        );
    });

    it('works with Document nodes', async function() {
        assert.equal(
            await exec(_ => {
                document.body.innerHTML = '<div style="display: block; width: 1000px; height: 1000px;"></div>';
                dom.setScrollY(
                    document,
                    100
                );
                return document.scrollingElement.scrollTop;
            }),
            100
        );
    });

    it('works with Window nodes', async function() {
        assert.equal(
            await exec(_ => {
                document.body.innerHTML = '<div style="display: block; width: 1000px; height: 1000px;"></div>';
                dom.setScrollY(
                    window,
                    100
                );
                return window.scrollY;
            }),
            100
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.setScrollY(
                    [
                        element1,
                        element2
                    ],
                    100
                );
                return [
                    element1.scrollTop,
                    element2.scrollTop
                ];
            }),
            [
                100,
                100
            ]
        );
    });

});