const assert = require('assert').strict;
const { exec } = require('../../../setup');

describe('#setScrollX', function() {

    beforeEach(async function() {
        await exec(_ => {
            document.body.innerHTML =
                '<div id="test1" style="display: block; width: 100px; height: 1px; overflow: scroll;">' +
                '<div style="display: block; width: 1000px; height: 1px;"></div>' +
                '</div>' +
                '<div id="test2" style="display: block; width: 100px; height: 1px; overflow: scroll;">' +
                '<div style="display: block; width: 1000px; height: 1px;"></div>' +
                '</div>';
        });
    });

    it('sets the scroll X position for all nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setScrollX(
                    'div',
                    100,
                );
                return [
                    document.getElementById('test1').scrollLeft,
                    document.getElementById('test2').scrollLeft
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
                dom.setScrollX(
                    element,
                    100,
                );
                return element.scrollLeft;
            }),
            100
        );
    });

    it('works with NodeList nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                dom.setScrollX(
                    document.querySelectorAll('div'),
                    100
                );
                return [
                    document.getElementById('test1').scrollLeft,
                    document.getElementById('test2').scrollLeft
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
                dom.setScrollX(
                    document.body.children,
                    100
                );
                return [
                    document.getElementById('test1').scrollLeft,
                    document.getElementById('test2').scrollLeft
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
                dom.setScrollX(
                    document,
                    100
                );
                return document.scrollingElement.scrollLeft;
            }),
            100
        );
    });

    it('works with Window nodes', async function() {
        assert.equal(
            await exec(_ => {
                document.body.innerHTML = '<div style="display: block; width: 1000px; height: 1000px;"></div>';
                dom.setScrollX(
                    window,
                    100
                );
                return window.scrollX;
            }),
            100
        );
    });

    it('works with array nodes', async function() {
        assert.deepEqual(
            await exec(_ => {
                const element1 = document.getElementById('test1');
                const element2 = document.getElementById('test2');
                dom.setScrollX(
                    [
                        element1,
                        element2
                    ],
                    100
                );
                return [
                    element1.scrollLeft,
                    element2.scrollLeft
                ];
            }),
            [
                100,
                100
            ]
        );
    });

});